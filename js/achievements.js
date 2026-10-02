/* ------------------------------------------------------------------
   Land of Doodads - achievements

   Eleven plates, and the table below is the whole of them. A row says
   what it is called, how the player is told to earn it, the number that
   finishes it, and ONE way of counting: either a `tally` key the game
   bumps as it is played, or a `probe` that reads a total the save
   already keeps. Nothing anywhere branches on an achievement id. A
   twelfth achievement is a twelfth row - the same discipline as the five
   obstacle type strings and the doodads' passive ability fields, where a
   new one is a new value rather than a new `if`.

   THERE IS ONE PLACE AN ACHIEVEMENT CAN BE EARNED: check(). note() and
   noteRun() bump a counter and then call it; init() calls it once at
   boot. A plate therefore cannot be handed out twice, and the silent
   bank an existing save needs is not a special case at all - it is
   check() running before anybody is watching, leaving FRESH behind so
   the title screen can say how much gold arrived while it was away.

   WHAT THE SAVE HOLDS - two new keys, nothing existing touched or
   migrated, so erasing a score table (X on the High Scores screen) takes
   no plate away, for the same reason it takes no doodad away:
     'achv'    { v: 1, got: { <id>: <timestamp> }, fresh: [ <id> ] }
     'achv.n'  { <tallyKey>: <number> }
   Both are read ONCE into module scope and written when they change.
   check() is called from gameplay and from draw loops - the title's NEW
   tab and the achievements screen's eleven bars are drawn every frame -
   and localStorage is not free. This is the shape js/doodads.js already
   uses for 'reached', 'succulents' and 'limes'.

   TALLY KEYS ARE FLAT. 'spicy.construction' is one string key inside
   'achv.n' and not a nested object: note('spicy', level) bumps 'spicy'
   AND 'spicy.' + level.id, so a level-specific plate is a different
   STRING in the table below rather than an `if (level.id === 'desk')`
   somewhere in PlayScene. That is why BURN WITH THE FLAMES OF VICTORY
   costs this file one line and the engine nothing.

   THE MASTER PASSKEY GRANTS NOTHING. IMP11 opens every doodad, level and
   room, so Doodads.isUnlocked() and Levels.roomOpen() both say yes to a
   player who has done none of it. An achievement is a record of what was
   DONE, so POULTRY CATCHER counts Doodads.meets() - the price actually
   paid - and VOYAGER resolves a room's gate itself through
   Levels.reachedOn() instead of asking whether the door is open.
   Secrecy is the one thing allowed to follow the passkey: somebody
   holding it has already been shown the Living Room, so there is nothing
   left to withhold from them.
------------------------------------------------------------------ */
'use strict';

var Achievements = (function () {

  /* 12, read off the HOUSE table rather than typed. A fresh score table
     is seeded with the doodads' own scores - PEP 12, COO 7, GER 2 - so
     "the default high score" is the top of that seed, and HATCHLING is
     the run that passes it. A literal 13 here would quietly become a lie
     the day somebody gives Pepper a better house run. */
  var HOUSE = Scores.houseTop();

  /* The owner's second rung. It is a number in exactly one place because
     the plate and the target have to agree: you PASS 25, so the bar
     finishes at 26 and the how-line says 25. Two literals would one day
     disagree with each other. */
  var PULLET = 25;

  /* Display order, which is also the order the screen pages through: the
     four that any player can see coming, the four collections, then the
     three Living Room plates last so a shut door's '? ? ?' rows sit
     together at the end of page two - the way a shut room's three
     placeholder cards sit together on the level select.

     `icon` is the badge id and is the achievement id for all eleven. It
     is still its own field because the badge sheet and the roster are two
     different things that happen to agree today, and a plate that wanted
     to borrow another's art should not have to be renamed to do it. */
  var LIST = [
    {
      id: 'hatchling',
      name: 'HATCHLING',
      how: 'PASS ' + HOUSE + ', THE HOUSE HIGH SCORE',
      need: HOUSE + 1,
      /* the honest "best anywhere, with anyone", which is its own save key
         in js/doodads.js and survives an erased table */
      probe: function () { return Doodads.bestReached(); },
      icon: 'hatchling'
    },
    {
      id: 'pullet',
      name: 'PULLET',
      how: 'PASS ' + PULLET + ' ON ANY LEVEL',
      need: PULLET + 1,
      probe: function () { return Doodads.bestReached(); },
      icon: 'pullet'
    },
    {
      id: 'poultry',
      name: 'POULTRY CATCHER',
      how: 'UNLOCK 3 NEW DOODADS',
      need: 3,
      probe: function () { return doodadsBought(); },
      icon: 'poultry'
    },
    {
      id: 'voyager',
      name: 'VOYAGER',
      how: 'UNLOCK A NEW ROOM',
      need: 1,
      probe: function () { return roomsEarned(); },
      icon: 'voyager'
    },
    {
      id: 'tolerance',
      name: 'TOLERANCE',
      how: 'COLLECT 20 SPICY DROPS',
      need: 20,
      /* every level's hot drop, whatever that level calls it: the deviled
         egg, the pepper, the butane can, the mint, the hot popcorn */
      tally: 'spicy',
      icon: 'tolerance'
    },
    {
      id: 'survivor',
      name: 'THE SURVIVOR MAN',
      how: 'COLLECT 20 SUCCULENTS',
      need: 20,
      /* the EXISTING count - the one Inari's nine succulents are bought
         with - so a player who already has twenty earns this the moment
         the game next boots, which is the whole point of a probe */
      probe: function () { return Doodads.boonsTaken(); },
      icon: 'survivor'
    },
    {
      id: 'infinity',
      name: 'INFINITY POOL',
      how: 'COLLECT 5 BONUS DROPS',
      need: 5,
      /* the +5 drop, which each level names for itself - the quarter, the
         mallow, the capybara, the canopy's golden apple */
      tally: 'gold',
      icon: 'infinity'
    },
    {
      id: 'butane',
      name: 'BURN WITH THE FLAMES OF VICTORY',
      how: 'COLLECT 5 BUTANE CANS',
      need: 5,
      /* the Construction Zone's hot drop and nothing else. One string,
         because note() wrote 'spicy.construction' for free. */
      tally: 'spicy.construction',
      icon: 'butane'
    },
    {
      id: 'mosquitos',
      name: 'MOSQUITOS',
      how: 'SURVIVE 3 NOTIFICATIONS IN ONE RUN',
      need: 3,
      /* A high-water mark within a single run, not a lifetime total:
         PlayScene counts the rings it has taken this run and hands the
         count over after each one, and noteRun keeps the largest ever
         seen. The key is 'run.stun' + '.' + the level's id, written by
         PlayScene's own double write, so "survive three rings on the
         Whiteboard" would be one more row here and no engine change.

         On THE DESK the stunning hazard is the notification: it rings you
         and the icon is consumed, and it never spends a life. So three of
         them in one run means rung three times and still flying. */
      tally: 'run.stun.desk',
      room: 'livingroom',
      icon: 'mosquitos'
    },
    {
      id: 'wood',
      name: 'DO YOU RESPECT WOOD?',
      how: 'COLLECT 3 COASTERS',
      need: 3,
      /* every boon on the Couch is a coaster - the map one and the yarn
         one - so the level's id is the whole of the condition */
      tally: 'boon.couch',
      room: 'livingroom',
      icon: 'wood'
    },
    {
      id: 'capy',
      name: "DON'T WORRY, BE CAPY",
      how: 'COLLECT 3 CAPYBARAS',
      need: 3,
      /* and every gold drop on the Mantle is a capybara */
      tally: 'gold.mantle',
      room: 'livingroom',
      icon: 'capy'
    }
  ];

  var BY_ID = {};
  LIST.forEach(function (a) { BY_ID[a.id] = a; });

  /* ------------------------------------------------------------- state

     All three are null until load() has run, which is how ensure() can
     tell "not read yet" from "read, and empty". */

  var got = null;                     /* id -> the timestamp it was earned */
  var fresh = null;                   /* earned but not yet seen on a row  */
  var n = null;                       /* the flat tally table              */

  function load() {
    got = {}; fresh = []; n = {};

    var stored = Save.get('achv', null);
    if (stored && typeof stored === 'object') {
      var rawGot = stored.got;
      if (rawGot && typeof rawGot === 'object') {
        for (var id in rawGot) {
          if (!rawGot.hasOwnProperty(id)) continue;
          /* Only numbers, because a timestamp is what `got` means and a
             truthy string would read as earned while when() returned
             nonsense. Ids this build has never heard of are KEPT: the
             game travels as one html file, and a save written by a later
             copy must not lose a plate just because an older copy opened
             it. earnedCount() counts roster ids, so they cost nothing. */
          if (typeof rawGot[id] === 'number') got[id] = rawGot[id];
        }
      }
      var rawFresh = stored.fresh;
      if (Array.isArray(rawFresh)) {
        for (var f = 0; f < rawFresh.length; f++) {
          var fid = rawFresh[f];
          /* A NEW tag is drawn against a row, so a fresh id has to BE a
             row and has to be earned - otherwise a stale save could paint
             gold on something nobody has done. Duplicates are dropped
             here rather than guarded against in freshCount(). */
          /* hasOwnProperty, not truthiness: `got` and BY_ID are plain
             objects, so a save carrying fresh: ['toString'] would find a
             function on the prototype of each, pass both tests, and hang a
             permanent `1 NEW` on a board with no row behind it. Asking who
             OWNS the key is the same question badges.js's has() asks. */
          if (typeof fid !== 'string' || !BY_ID.hasOwnProperty(fid)) continue;
          if (!got.hasOwnProperty(fid) || fresh.indexOf(fid) >= 0) continue;
          fresh.push(fid);
        }
      }
      /* stored.v is deliberately not branched on: there is one version,
         and it is written so that the day there is a second one there is
         something to branch on rather than a shape to guess at. */
    }

    var rawN = Save.get('achv.n', null);
    if (rawN && typeof rawN === 'object') {
      for (var key in rawN) {
        if (!rawN.hasOwnProperty(key)) continue;
        var v = rawN[key];
        /* Counts, so: numbers only, whole, and a zero or a negative is
           simply left out - a missing key already reads as 0 everywhere,
           and a 1.5 would paint '1.5 / 5' on a progress row. */
        if (typeof v === 'number' && isFinite(v) && v > 0) n[key] = Math.floor(v);
      }
    }
  }

  /* Nothing should reach this module before Game.init() calls init(), but
     the title screen asks freshCount() every frame it draws and a throw
     in a draw loop is a black screen. So the first touch loads instead of
     failing. It is only ever the READ that happens early; earning still
     has the single path through check(). */
  function ensure() { if (n === null) load(); }

  function writeGot() { Save.set('achv', { v: 1, got: got, fresh: fresh }); }
  function writeTallies() { Save.set('achv.n', n); }

  /* ------------------------------------------------------ what counts

     An entry or an id, in, and the roster entry or null out. Every public
     call goes through this so that a caller holding only an id - the
     achievements screen's `seenNow` list, a saved banner - never has to
     look the row up itself. */
  function resolve(a) {
    if (typeof a === 'string') return BY_ID.hasOwnProperty(a) ? BY_ID[a] : null;
    if (a && a.id && BY_ID.hasOwnProperty(a.id)) return BY_ID[a.id];
    return null;
  }

  /* The ONE question every row is asked: how many do you have. A tally
     key that has never been bumped is 0, which is also what a row with
     neither tally nor probe would report - so a malformed row never
     completes itself, it just sits at zero. */
  function have(a) {
    if (a.probe) return a.probe();
    return n[a.tally] | 0;
  }

  /* ------------------------------------------------------- the probes

     The two that have to be computed rather than counted, and the two the
     passkey would otherwise pay out on. */

  function roomById(id) {
    var rooms = Levels.rooms;
    for (var i = 0; i < rooms.length; i++) if (rooms[i].id === id) return rooms[i];
    return null;
  }

  function levelById(room, id) {
    if (!room || !room.levels) return null;
    for (var i = 0; i < room.levels.length; i++) if (room.levels[i].id === id) return room.levels[i];
    return null;
  }

  /* Has this room's own price been paid? The same question
     Levels.roomOpen() asks, MINUS the passkey line - which is the entire
     reason it is asked again here instead of being borrowed.

     It differs from roomOpen() on one other point: an unlock naming a room
     or level that cannot be resolved returns FALSE here, where roomOpen
     returns true. roomOpen is being generous about a door - better open
     than permanently shut on a typo - and a plate has to be the other way
     round, because a typo must not hand out an achievement nobody earned.

     reachedOn() writes its key the first time it is asked, which is safe
     for every gate that exists: a room's gate is always a level in a room
     the player has already been shown, because otherwise the room could
     never be earned. A gate pointing INTO a secret room would leak that
     room's key into the save, the way js/levels.js is careful about
     elsewhere - so if one is ever written, it is this call that has to
     learn to hold back. */
  function gateMet(room) {
    var u = room.unlock;
    if (!u) return true;
    var gr = roomById(u.room);
    var gl = levelById(gr, u.level);
    if (!gr || !gl) return false;
    return Levels.reachedOn(gr, gl) >= u.score;
  }

  /* POULTRY CATCHER. The doodads that cost something and have been paid
     for: Doodads.requirement() is what says a doodad has a price at all
     (the three free ones answer null), and Doodads.meets() is
     isUnlocked() without the passkey line. Five doodads carry a price
     today - a score, a score, nine succulents, three limes and being
     found - and a sixth would count here the day it is written, without
     this function naming any of them. */
  function doodadsBought() {
    var list = Doodads.list, out = 0;
    for (var i = 0; i < list.length; i++) {
      if (Doodads.requirement(list[i]) && Doodads.meets(list[i])) out++;
    }
    return out;
  }

  /* VOYAGER. Rooms that were there to be EARNED and have been: `locked`
     means never built, no `unlock` means it was always open (the
     Backyard, which is where you start and so is not a voyage). Today
     that is the Living Room alone, and the count rather than a flag is
     what makes a second gated room a free upgrade - need stays 1, and a
     later plate for "open every room" is one more row. */
  function roomsEarned() {
    var rooms = Levels.rooms, out = 0;
    for (var i = 0; i < rooms.length; i++) {
      var r = rooms[i];
      if (r.locked || !r.unlock) continue;
      if (gateMet(r)) out++;
    }
    return out;
  }

  /* ------------------------------------------------- the one evaluation

     Walk the eleven, compare have against need, bank what is newly done
     and hand it back. Everything that can earn an achievement comes
     through here, so the banner, the sound and the particles can all live
     at the ONE call site in PlayScene that reads the return value.

     Cheap on purpose: eleven rows, two of which read cached save values
     and two of which walk nine levels' cached scores. It is called after
     every pickup and once per frame from the screens that draw bars. */
  function check() {
    ensure();
    var out = [];
    var now = Date.now();
    for (var i = 0; i < LIST.length; i++) {
      var a = LIST[i];
      /* "has this been banked" is whether the key is THERE, which is not
         the same question as whether its timestamp is truthy. A save whose
         timestamp has been zeroed - edited, or written by something that
         did not have a clock - would otherwise read as unearned and the
         badge would be banked again, with a new date and a fresh banner,
         every time the game booted. */
      if (got.hasOwnProperty(a.id)) continue;
      if (have(a) < a.need) continue;
      got[a.id] = now;
      /* FRESH is how a silent bank gets told about later: init() throws
         the return away, and the gold NEW tag is all that is left of the
         moment. The screen clears it when the row has actually been
         looked at, not when it was earned. */
      fresh.push(a.id);
      out.push(a);
    }
    if (out.length) writeGot();
    return out;
  }

  /* One gameplay event. 'spicy' | 'gold' | 'boon' | 'sour', and the level
     it happened on or null. Bumps the lifetime key and the level's own
     key, and those are two FLAT strings in one object - 'gold' and
     'gold.mantle' - never a nested table, so a roster row can name
     either without the caller knowing which rows exist. */
  function note(event, level) {
    if (!event) return [];
    ensure();
    bump(event);
    if (level && level.id) bump(event + '.' + level.id);
    writeTallies();
    return check();
  }

  function bump(key) { n[key] = (n[key] | 0) + 1; }

  /* A per-run statistic: the largest value ever seen in a single run,
     which is a different thing from a total and cannot be accumulated.
     The caller counts within its run and hands the running count over
     after each event, so three rings in one run beats three rings across
     three runs - and nothing has to be reset here when a run ends,
     because the run that is counting owns its own counter. */
  function noteRun(key, v) {
    if (!key || typeof v !== 'number' || !isFinite(v)) return [];
    ensure();
    if (v <= (n[key] | 0)) return [];
    n[key] = Math.floor(v);
    writeTallies();
    return check();
  }

  /* ------------------------------------------------------------- public

     init() is the retroactive pass: read the save and evaluate once, with
     nothing listening. A player who already has twenty succulents, three
     bought doodads, a best over the house score or the Living Room open
     walks into several earned plates on this boot, silently, each flagged
     FRESH so the title screen can put a count on the board. The date
     recorded is the day of that boot, which is the only honest answer the
     save can give - the game never wrote down when any of it happened. */
  function init() {
    load();
    check();
  }

  /* The secrecy gate, and the only thing in this file that is allowed to
     follow the passkey. Three of the eleven name a Living Room bay - the
     Desk's notification, the Couch's coasters, the Mantle's capybaras -
     and while that door is shut they must give away nothing: no name, no
     how-line, no badge. The screen draws them as '? ? ?' with a padlock,
     exactly the way the level select draws a shut room's three cards. */
  function visible(a) {
    var e = resolve(a);
    if (!e) return false;
    if (!e.room) return true;
    return Levels.roomOpen(roomById(e.room));
  }

  /* have clamped to need, so a bar can never overrun its frame: somebody
     with forty succulents is 20 / 20, not 40 / 20 and 240px of a 120px
     plate. The unclamped count is nobody's business outside this file. */
  function progress(a) {
    ensure();
    var e = resolve(a);
    if (!e) return { have: 0, need: 1, done: false };
    var h = have(e);
    return { have: Math.min(h, e.need), need: e.need, done: h >= e.need };
  }

  function earned(a) {
    ensure();
    var e = resolve(a);
    return !!e && got.hasOwnProperty(e.id);
  }

  /* Roster ids only. A save that has travelled through a later build may
     hold plates this one does not know, and counting them would print
     EARNED 12 / 11. */
  function earnedCount() {
    ensure();
    var c = 0;
    for (var i = 0; i < LIST.length; i++) if (got.hasOwnProperty(LIST[i].id)) c++;
    return c;
  }

  function isFresh(a) {
    ensure();
    var e = resolve(a);
    return !!(e && fresh.indexOf(e.id) >= 0);
  }

  /* A cached array's length, safe to read every frame - the title screen
     does exactly that to decide whether to hang its NEW tab. */
  function freshCount() {
    ensure();
    return fresh.length;
  }

  /* One row, or - called with nothing - every row. Written only when
     something actually changed, because this is called from a scene's
     exit() for each row that was displayed and most visits clear none. */
  function markSeen(a) {
    ensure();
    if (a === undefined || a === null) {
      if (!fresh.length) return;
      fresh.length = 0;
      writeGot();
      return;
    }
    var e = resolve(a);
    if (!e) return;
    var at = fresh.indexOf(e.id);
    if (at < 0) return;
    fresh.splice(at, 1);
    writeGot();
  }

  /* The day it was banked, or 0 for a plate that is earned but carries no
     date - which is what the screen prints '- - -' for. That state is not
     hypothetical now that earned() asks who owns the key rather than
     whether the number is truthy: a save can hold a zero and still be a
     save that did the thing. */
  function when(a) {
    ensure();
    var e = resolve(a);
    return (e && typeof got[e.id] === 'number') ? got[e.id] : 0;
  }

  return {
    list: LIST,
    init: init,
    get: function (id) { return BY_ID[id] || null; },
    total: function () { return LIST.length; },
    earned: earned, earnedCount: earnedCount,
    visible: visible, progress: progress,
    note: note, noteRun: noteRun, check: check,
    freshCount: freshCount, isFresh: isFresh, markSeen: markSeen,
    when: when
  };
})();
