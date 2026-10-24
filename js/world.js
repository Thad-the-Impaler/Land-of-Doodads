/* ------------------------------------------------------------------
   Land of Doodads - everyone's high scores
   The tables in js/scores.js live in this browser and nowhere else.
   This is the other board: every run that made anybody's table, kept
   by a small server (server/worker.js) so that a run on one side of
   the world is measured against a run on the other. Arcade style - the
   same initials can hold the whole top ten if they earned it.

   NOTHING HERE MAY EVER HOLD THE GAME UP. Every call is fire and
   forget, a draw loop only reads what has already come back, and a
   browser with no connection - the single file opened on a plane -
   says OFFLINE on the one screen that asks, and sends its bests the
   next time it can.
------------------------------------------------------------------ */
'use strict';

var World = (function () {

  /* server/worker.js, as deployed. The `thad-37e` is this Cloudflare
     account's workers.dev name: rename it in the dashboard and this line
     has to follow, or every board goes OFFLINE. */
  var SERVER = 'https://land-of-doodads-scores.thad-37e.workers.dev';
  var STALE = 60;          /* seconds a board is good for before it is asked again */
  var RETRY = 10;          /* ...and how soon a board that failed tries again */
  var TIMEOUT = 8000;

  var boards = {};         /* 'room.level' -> what came back for that level */
  var sending = {};        /* 'room.level' -> the send that is out, if one is */

  function key(room, level) { return room.id + '.' + level.id; }

  /* Made once per browser: random, never shown to anyone, and the only
     thing that lets the server tell this player's row from everybody
     else's. Held in memory as well, so a browser that will not save still
     sends the same one for as long as the page is open. */
  var me = null;
  function player() {
    if (me) return me;
    var id = Save.get('world.player', null);
    if (typeof id !== 'string' || !/^[a-z0-9]{16,32}$/.test(id)) {
      var bytes = new Uint8Array(20);
      try { crypto.getRandomValues(bytes); }
      catch (e) { for (var j = 0; j < bytes.length; j++) bytes[j] = Math.floor(Math.random() * 256); }
      id = '';
      for (var i = 0; i < bytes.length; i++) id += (bytes[i] % 36).toString(36);
      Save.set('world.player', id);
    }
    me = id;
    return me;
  }

  /* What this browser is running on, for the DEVICE column - and every run
     it sends was flown here, since a table never leaves its browser. Asked
     of the browser rather than of the pointer, because a laptop with a
     touch screen is still a computer. An iPad asks for the desktop site and
     calls itself a Mac, so a "Mac" with a touch screen is a tablet; the
     server cannot see that, which is why the game says it. */
  function device() {
    var ua = navigator.userAgent || '', touches = navigator.maxTouchPoints || 0;
    if (/iPad|Tablet|Kindle|Silk|PlayBook/i.test(ua) || (/Macintosh/.test(ua) && touches > 1) ||
        (/Android/i.test(ua) && !/Mobile/i.test(ua))) return 'tablet';
    if (/iPhone|iPod|Android|Mobile|Windows Phone|BlackBerry/i.test(ua) ||
        (navigator.userAgentData && navigator.userAgentData.mobile)) return 'phone';
    return 'computer';
  }

  /* One request, and one answer: the parsed reply, or null for anything
     that did not come back - no connection, a timeout, a page that is not
     JSON. The POST goes as plain text, which is what a string body is by
     default; that keeps it a "simple" request, and a simple request does
     not cost a second one asking permission first. */
  function request(method, path, body, done) {
    if (typeof fetch !== 'function') { done(null); return; }
    var ctl = typeof AbortController === 'function' ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctl) ctl.abort(); }, TIMEOUT);
    var opts = { method: method, cache: 'no-store' };
    if (ctl) opts.signal = ctl.signal;
    if (body) opts.body = JSON.stringify(body);
    fetch(SERVER + path, opts)
      .then(function (r) {
        return r.json().then(function (j) { return { ok: r.ok, status: r.status, body: j }; });
      })
      .then(function (res) { clearTimeout(timer); done(res); },
            function () { clearTimeout(timer); done(null); });
  }

  /* the server is trusted no further than the save file is */
  function clean(rows) {
    var out = [];
    for (var i = 0; i < rows.length && out.length < Scores.SIZE; i++) {
      var r = rows[i];
      if (!r || typeof r.name !== 'string' || typeof r.score !== 'number') continue;
      out.push({ name: r.name.slice(0, 3), score: r.score | 0,
                 doodad: typeof r.doodad === 'string' ? r.doodad : null,
                 country: /^[A-Z]{2}$/.test(r.country) ? r.country : '',
                 device: /^(phone|tablet|computer)$/.test(r.device) ? r.device : '',
                 me: r.me === true });
    }
    return out;
  }

  /* ---------------------------------------------------------- the board

     Asked for from a draw loop, so it never waits: it hands back whatever
     it has - 'loading' the first time, 'ok' once the server has answered,
     'offline' when it could not - and, if what it has is old, asks again
     in the background. A board that has been shown once is never blanked
     by a later failure; it is better to show a minute-old top ten than a
     sign saying the internet is down. */
  function board(room, level) {
    var k = key(room, level), b = boards[k];
    if (!b) b = boards[k] = { status: 'loading', rows: [], total: 0, you: null, at: -1e9, busy: false };
    var age = Date.now() / 1000 - b.at;
    if (!b.busy && age > (b.status === 'offline' ? RETRY : STALE)) {
      b.busy = true;
      b.at = Date.now() / 1000;
      request('GET', '/top?level=' + encodeURIComponent(k) + '&player=' + player(), null, function (res) {
        b.busy = false;
        if (!res || !res.ok || !res.body || !Array.isArray(res.body.rows)) {
          if (b.status !== 'ok') b.status = 'offline';
          return;
        }
        b.rows = clean(res.body.rows);
        b.total = res.body.total | 0;
        var y = res.body.you;
        b.you = y && typeof y.rank === 'number' ? { rank: y.rank | 0, score: y.score | 0 } : null;
        b.status = 'ok';
      });
    }
    return b;
  }

  /* --------------------------------------------------------- sending

     Everyone's board is arcade style, so what goes up is this browser's
     own table: every run on it the server has not had yet, oldest first.
     Nothing else needs to. Every run on this table is on everyone's board
     too, so a run this table turns away is beaten ten times over there.
     The first time a save older than the board goes online, its whole
     table goes up with it.

     A run is known by the moment it was saved to the table - its `when` -
     which is also how the server tells one run sent twice from two runs.
     'world.upto.<level>' holds the newest `when` the server has taken. */
  function uptoKey(k) { return 'world.upto.' + k; }
  function pbKey(k) { return 'world.pb.' + k; }

  /* the level's best in this browser - the best any doodad has flown it -
     read off the personal bests js/scores.js already keeps */
  function localBest(room, level) {
    var best = 0, who = null;
    Doodads.list.forEach(function (d) {
      var pb = Scores.personalBest(room, level, d.id);
      if (pb > best) { best = pb; who = d.id; }
    });
    return { score: best, doodad: who };
  }

  /* What this level owes the server. The server takes a batch whole or
     not at all, so anything it would refuse - a name from an old save that
     is not three letters, a score past its ceiling - is left out here
     rather than sinking the rest of the table with it. */
  function owed(room, level) {
    var k = key(room, level);
    var upto = +Save.get(uptoKey(k), 0) || 0;
    var table = Scores.table(room, level);
    var out = [];
    table.forEach(function (e) {
      /* the doodads' own starting entries are saved at 0 and never go up */
      if (!(e.when > upto) || !/^\d{1,20}$/.test(String(e.when))) return;
      var name = String(e.name || '').toUpperCase();
      if (!/^[A-Z0-9 ]{3}$/.test(name) || !(e.score >= 1 && e.score <= 100000)) return;
      out.push({ when: e.when, run: String(e.when), name: name, score: e.score,
                 doodad: /^[a-z0-9-]{1,24}$/.test(e.doodad) ? e.doodad : '' });
    });
    out.sort(function (a, b) { return a.when - b.when; });

    /* A best that is no longer on the table - reset off it with X - still
       counts. It goes as the one run called 'pb', which the server only
       ever moves up. */
    var lb = localBest(room, level);
    var onTable = table.some(function (e) { return e.score >= lb.score; });
    if (lb.score > 0 && lb.score <= 100000 && !onTable && lb.score > (Save.get(pbKey(k), 0) | 0)) {
      var initials = Scores.lastInitials();
      out.push({ when: 0, run: 'pb', score: lb.score, doodad: lb.doodad, pb: true,
                 name: /^[A-Z0-9 ]{3}$/.test(initials) ? initials : 'AAA' });
    }
    return out;
  }

  /* Send whatever this level owes, and hand back an object that fills
     itself in as the answer arrives:
       { status: 'sending' | 'ok' | 'offline' | 'refused', rank }
     `run` is the run that has just been saved to the table - { when, time }
     - and the note is about that run: null when it is not among what was
     sent. Its time in the air goes with it, which the server holds its
     score up against. */
  function sync(room, level, run) {
    var k = key(room, level);
    /* one send per level at a time; a run saved while one is out is picked
       up when that one comes back */
    if (sending[k]) { sending[k].again = run || sending[k].again || true; return null; }
    var runs = owed(room, level);
    if (!runs.length) return null;

    var mine = -1;
    var body = { level: k, player: player(), device: device(), runs: runs.map(function (r, i) {
      var o = { run: r.run, name: r.name, doodad: r.doodad, score: r.score };
      if (run && r.when === run.when) {
        mine = i;
        if (typeof run.time === 'number') o.time = Math.round(run.time * 10) / 10;
      }
      return o;
    }) };
    var note = mine >= 0 ? { status: 'sending', rank: 0 } : null;
    var job = sending[k] = { again: null };

    request('POST', '/runs', body, function (res) {
      delete sending[k];
      var taken = function () {
        var newest = +Save.get(uptoKey(k), 0) || 0;
        runs.forEach(function (r) {
          if (r.when > newest) newest = r.when;
          if (r.pb) Save.set(pbKey(k), r.score);
        });
        Save.set(uptoKey(k), newest);
      };
      if (res && res.ok && res.body && Array.isArray(res.body.ranks)) {
        taken();
        if (note) { note.status = 'ok'; note.rank = res.body.ranks[mine] | 0; }
        if (boards[k]) boards[k].at = -1e9;      /* the board has changed under it */
      } else if (res && (res.status === 400 || res.status === 422)) {
        /* turned down, and asking again would only be turned down again */
        taken();
        if (note) note.status = 'refused';
      } else if (note) {
        note.status = 'offline';                  /* kept; it goes next time */
      }
      if (job.again) sync(room, level, job.again === true ? null : job.again);
    });
    return note;
  }

  /* Every level's backlog, a few at a time rather than all at once - a
     save from before this file existed can owe the server a dozen. Shown
     levels only: a room that has not been opened has no bests to send,
     and its ids are not the server's business yet. */
  function syncAll() {
    var list = Levels.shown(), i = 0;
    (function next() {
      if (i >= list.length) return;
      var e = list[i++];
      sync(e.room, e.level, null);
      setTimeout(next, 400);
    })();
  }

  /* 4881 -> '4,881', for the "4,881 PLAYERS" line */
  function count(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return { board: board, sync: sync, syncAll: syncAll, count: count, player: player };
})();
