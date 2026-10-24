/* ------------------------------------------------------------------
   Land of Doodads - everyone's high scores
   The tables in js/scores.js live in this browser and nowhere else.
   This is the other board: every player's best on every level, kept
   by a small server (server/worker.js) so that a run on one side of
   the world is measured against a run on the other.

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

     What gets sent for a level is its best in THIS browser - the best any
     doodad has flown it, read off the personal bests js/scores.js already
     keeps - whenever that is better than what the server was last told.
     So there is one rule for a run that has just ended and for a save
     that is older than the server: the first time a browser that already
     holds a 40 on the Coop goes online, the 40 goes up with it. */
  function localBest(room, level) {
    var best = 0, who = null;
    Doodads.list.forEach(function (d) {
      var pb = Scores.personalBest(room, level, d.id);
      if (pb > best) { best = pb; who = d.id; }
    });
    return { score: best, doodad: who };
  }

  function sentKey(k) { return 'world.sent.' + k; }

  /* Send the level's best if the server has not got it, and hand back an
     object that fills itself in as the answer arrives:
       { status: 'sending' | 'ok' | 'offline' | 'refused', rank, total }
     or null when there was nothing new to send. `run` is the run that has
     just ended - { name, score, time } - and is what lends the send its
     initials and, when the run IS the best being sent, its time in the air,
     which the server holds the score up against. */
  function sync(room, level, run) {
    var k = key(room, level);
    var lb = localBest(room, level);
    var sent = Save.get(sentKey(k), 0) | 0;
    if (!lb.doodad || lb.score <= sent) return null;
    /* one send per level at a time; a better run that lands while one is
       out is picked up when that one comes back */
    if (sending[k]) { sending[k].again = run || sending[k].again || true; return sending[k].note; }

    var body = { level: k, player: player(), name: (run && run.name) || Scores.lastInitials(),
                 doodad: lb.doodad, score: lb.score };
    if (run && run.score === lb.score && typeof run.time === 'number') {
      body.time = Math.round(run.time * 10) / 10;
    }
    var note = { status: 'sending', rank: 0, total: 0, score: lb.score };
    var job = sending[k] = { note: note, again: null };

    request('POST', '/score', body, function (res) {
      delete sending[k];
      if (res && res.ok && res.body && typeof res.body.rank === 'number') {
        Save.set(sentKey(k), Math.max(lb.score, res.body.best | 0));
        note.status = 'ok';
        note.rank = res.body.rank | 0;
        note.total = Math.max(res.body.total | 0, note.rank);
        if (boards[k]) boards[k].at = -1e9;      /* the board has changed under it */
      } else if (res && (res.status === 400 || res.status === 422)) {
        /* turned down, and asking again would only be turned down again */
        Save.set(sentKey(k), lb.score);
        note.status = 'refused';
      } else {
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

  /* 4881 -> '4,881', for the "312TH OF 4,881" lines */
  function count(n) {
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return { board: board, sync: sync, syncAll: syncAll, count: count, player: player };
})();
