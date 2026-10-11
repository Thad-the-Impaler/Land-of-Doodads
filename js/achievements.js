/* ------------------------------------------------------------------
   Land of Doodads - achievements

   Twelve plates, and the table below is the whole of them. A row says
   what it is called, how the player is told to earn it, the number that
   finishes it, and ONE way of counting: either a `tally` key the game
   bumps as it is played, or a `probe` that reads a total the save
   already keeps. Nothing anywhere branches on an achievement id. A
   thirteenth achievement is a thirteenth row - the same discipline as the five
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
     'achv'    { v: 1, since: <timestamp>, got: { <id>: <day> },
                 fresh: [ <id> ] }
     'achv.n'  { <tallyKey>: <number> }
   Both are read ONCE into module scope and written when they change, the
   shape js/doodads.js already uses for 'reached', 'succulents' and 'limes'
   and for the same reason: localStorage is not free. `since` is the day
   counting began, because seven of the twelve count things nothing in
   the save was ever counting and the screen has to be able to say so. A `day`
   of 0 means banked out of history, day unknown - see init().

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

  /* EVERY NUMBER IN A ROW IS WRITTEN ONCE. HATCHLING and PULLET already
     built their how-line out of the constant their bar finishes at, for the
     reason above; the other nine typed the number twice, once in the
     sentence and once in `need`, so changing TOLERANCE to 25 would have
     printed 'COLLECT 20 SPICY DROPS   0 / 25' with nothing to catch it. */
  var DOODADS = 3, ROOMS = 1, SPICY = 20, BOONS = 20, GOLD = 5,
      CANS = 5, RINGS = 3, COASTERS = 3, CAPYS = 3, KINGS = 1;

  /* Display order, which is also the order the screen pages through: the
     four that any player can see coming, the four collections, then the
     four Living Room plates last so a shut door's '? ? ?' rows sit
     together at the end of page two - the way a shut room's three
     placeholder cards sit together on the level select. Twelve rows is
     two full pages of six, so the King's row filled page two rather than
     opening a third.

     `icon` is the badge id and is the achievement id for all twelve. It
     is still its own field because the badge sheet and the roster are two
     different things that happen to agree today, and a plate that wanted
     to borrow another's art should not have to be renamed to do it. */
  var LIST = [
    {
      id: 'hatchling',
      name: 'HATCHLING',
      how: 'PASS ' + HOUSE + ', THE HOUSE HIGH SCORE',
      need: HOUSE + 1,
      /* A SCORE, NOT A COLLECTION. The right column prints 'have / need' for
         everything that is counted up, which on this row read '12 / 13'
         under a sentence saying 12 - two numbers for one target, on the one
         screen whose whole job is to agree with itself. The screen prints
         'BEST 12' for a row that says this, and the bar still carries the
         fraction, which is where a fraction belongs. */
      best: true,
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
      best: true,
      probe: function () { return Doodads.bestReached(); },
      icon: 'pullet'
    },
    {
      id: 'poultry',
      name: 'POULTRY CATCHER',
      /* EARN, not UNLOCK. The passkey UNLOCKS all eight at a stroke, and
         this row counts the ones whose price was actually paid - so with
         IMP11 typed the character select showed eight open stalls while
         this said 1 / 3 under the one verb the passkey satisfies. The
         counting is right and stays; the word was wrong. An achievement is
         a record of what was DONE, and EARN is that word. */
      how: 'EARN ' + DOODADS + ' NEW DOODADS',
      need: DOODADS,
      probe: function () { return doodadsBought(); },
      icon: 'poultry'
    },
    {
      id: 'voyager',
      name: 'VOYAGER',
      /* and the same word here, for the same reason: the passkey opens the
         Living Room's door on the level select while this row reads 0 / 1 */
      how: 'EARN A NEW ROOM',
      need: ROOMS,
      probe: function () { return roomsEarned(); },
      icon: 'voyager'
    },
    {
      id: 'tolerance',
      name: 'TOLERANCE',
      how: 'COLLECT ' + SPICY + ' SPICY DROPS',
      need: SPICY,
      /* every level's hot drop, whatever that level calls it: the deviled
         egg, the pepper, the butane can, the mint, the hot popcorn - and
         the Fort's red pellet, which is a drop with `spicy` on it and is
         counted by the same note() as all of them */
      tally: 'spicy',
      icon: 'tolerance'
    },
    {
      id: 'survivor',
      name: 'THE SURVIVOR MAN',
      how: 'COLLECT ' + BOONS + ' SUCCULENTS',
      need: BOONS,
      /* the EXISTING count - the one Inari's nine succulents are bought
         with - so a player who already has twenty earns this the moment
         the game next boots, which is the whole point of a probe */
      probe: function () { return Doodads.boonsTaken(); },
      icon: 'survivor'
    },
    {
      id: 'infinity',
      name: 'INFINITY POOL',
      how: 'COLLECT ' + GOLD + ' BONUS DROPS',
      need: GOLD,
      /* the +5 drop, which each level names for itself - the quarter, the
         mallow, the capybara, the canopy's golden apple, the Order's gold
         shot and the King's crowns (the Fort pays all of those through the
         engine's own takeGold, so they count here without a line of
         their own) */
      tally: 'gold',
      icon: 'infinity'
    },
    {
      id: 'butane',
      name: 'BURN WITH THE FLAMES OF VICTORY',
      how: 'COLLECT ' + CANS + ' BUTANE CANS',
      need: CANS,
      /* the Construction Zone's hot drop and nothing else. One string,
         because note() wrote 'spicy.construction' for free. */
      tally: 'spicy.construction',
      icon: 'butane'
    },
    {
      id: 'mosquitos',
      name: 'MOSQUITOS',
      how: 'SURVIVE ' + RINGS + ' NOTIFICATIONS IN ONE RUN',
      need: RINGS,
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
      how: 'COLLECT ' + COASTERS + ' COASTERS',
      need: COASTERS,
      /* every boon on the Couch is a coaster - the map one and the yarn
         one - so the level's id is the whole of the condition */
      tally: 'boon.couch',
      room: 'livingroom',
      icon: 'wood'
    },
    {
      id: 'capy',
      name: "DON'T WORRY, BE CAPY",
      how: 'COLLECT ' + CAPYS + ' CAPYBARAS',
      need: CAPYS,
      /* and every gold drop on the Mantle is a capybara */
      tally: 'gold.mantle',
      room: 'livingroom',
      icon: 'capy'
    },
    {
      id: 'king',
      name: 'LONG LIVE THE KING',
      how: 'TOPPLE THE KING CUPMAN',
      need: KINGS,
      /* A DEED, counted as a tally. The King's third bop writes 'king' into
         the run's ledger, the engine drains it into note('king', level) -
         never naming the level - and note() bumps 'king' and 'king.fort'.
         The suffixed key is the condition, the way BURN WITH THE FLAMES OF
         VICTORY reads 'spicy.construction': only the Fort has a King today,
         so 'king' alone would work, and would quietly become a different
         plate the day a second bay crowned one. He appears once a run, so
         one is the honest number. The name is 18 characters, well inside
         the 31 the row's NEW tab and the banner at scale 2 allow. */
      tally: 'king.fort',
      room: 'livingroom',
      icon: 'king'
    }
  ];

  var BY_ID = {};
  LIST.forEach(function (a) { BY_ID[a.id] = a; });

  /* ------------------------------------------------------------- state

     All three are null until load() has run, which is how ensure() can
     tell "not read yet" from "read, and empty". */

  var got = null;                     /* id -> the day it was banked      */
  var fresh = null;                   /* earned but not yet seen on a row  */
  var n = null;                       /* the flat tally table              */
  /* Ids in `fresh` that this build has never heard of. They are held aside
     rather than dropped for the same reason `got` keeps unknown plates: the
     game travels as one html file, and an older copy opened at the same
     origin must not quietly delete what a newer one wrote. Nothing draws
     them - freshCount and isFresh read `fresh` alone - and writeGot puts
     them back. */
  var freshUnknown = [];
  /* The day counting began: the first boot that ever evaluated the roster.
     Seven of the twelve count things nothing in the save was ever counting,
     so they start at zero on a save that has been played for weeks, and the
     screen has to be able to say so. 0 means a save that has not been
     through init() yet. */
  var since = 0;
  /* load() changed something the save does not hold yet, so init() has to
     write even on a boot that banks nothing new */
  var migrated = false;

  function load() {
    got = {}; fresh = []; n = {}; freshUnknown = []; since = 0; migrated = false;

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
          /* and inside the range Date can represent. A finite number
             above 8.64e15 is JSON-legal, survives a round trip, and makes
             new Date(ts) an Invalid Date whose getFullYear() is NaN - so
             the row's date column printed NAN-NAN-NAN. Anything outside
             becomes a 0, which when() and the screen already render as
             '- - -': banked, day unknown. */
          var ts = rawGot[id];
          if (typeof ts === 'number' && isFinite(ts) && ts >= 0 && ts <= 8.64e15) got[id] = ts;
          else if (typeof ts === 'number') got[id] = 0;
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
          if (typeof fid !== 'string') continue;
          if (!BY_ID.hasOwnProperty(fid)) {
            /* a plate from a later build: kept, not drawn, written back */
            if (freshUnknown.indexOf(fid) < 0) freshUnknown.push(fid);
            continue;
          }
          if (!got.hasOwnProperty(fid) || fresh.indexOf(fid) >= 0) continue;
          fresh.push(fid);
        }
      }
      if (typeof stored.since === 'number' && isFinite(stored.since) &&
          stored.since > 0 && stored.since <= 8.64e15) since = stored.since;
      /* stored.v is deliberately not branched on: there is one version,
         and it is written so that the day there is a second one there is
         something to branch on rather than a shape to guess at. */
    }

    migrateFirstPass();

    var rawN = Save.get('achv.n', null);
    if (rawN && typeof rawN === 'object') {
      for (var key in rawN) {
        if (!rawN.hasOwnProperty(key)) continue;
        var v = rawN[key];
        /* Counts, so: numbers only, whole, and a zero or a negative is
           simply left out - a missing key already reads as 0 everywhere,
           and a 1.5 would paint '1.5 / 5' on a progress row. */
        /* and inside what `| 0` can hold. have() reads n[key] | 0, which
           is ToInt32: a tally of 3e9 came back as -1294967296, printed as
           the row's count, and the next pickup wrote the negative number
           back. The ceiling belongs where the save is read, once, not at
           every use. */
        if (typeof v === 'number' && isFinite(v) && v > 0 && v <= 0x7fffffff) n[key] = Math.floor(v);
      }
    }
  }

  /* A SAVE THE FIRST RELEASE OF THIS FILE ALREADY BANKED.

     That release had no `since` and stamped every retroactive plate with
     the day of the boot that found it - so a player who had been playing
     for weeks got five plates dated the morning they refreshed, and the
     screen printed EARNED above that date as though the runs had happened
     that morning. The build after it banks those with no day at all, which
     the screen draws as '- - -' and the line under the panel explains. But
     that only ever runs ONCE per save, and for anybody who had already
     refreshed, it had already run: check() skips a plate that is in `got`,
     so the honest dashes were only ever going to reach a save that had
     never seen the feature. Which was every save I tested and no save that
     existed.

     So the dates are repaired here instead. The giveaway is exact rather
     than a guess: that release took ONE Date.now() for a whole check()
     pass, so every plate banked by the retroactive pass carries the
     identical timestamp, and it is the earliest one in the save. Two or
     more plates sharing the save's earliest stamp were banked together
     before the player had done anything, which is the retroactive pass and
     nothing else - a later pass that banks two at once is still later. The
     earliest stamp is also the honest answer to when counting began.

     One plate alone on the earliest stamp is left exactly as it is. It
     could have been the only thing the save could prove, or it could have
     been earned in play on that boot, and there is no way to tell them
     apart - so it keeps its date and `since` still moves back to it. */
  function migrateFirstPass() {
    if (since > 0) return;
    var id, min = 0, shared = 0;
    for (id in got) {
      if (!got.hasOwnProperty(id) || !got[id]) continue;
      if (!min || got[id] < min) min = got[id];
    }
    if (!min) return;
    for (id in got) if (got.hasOwnProperty(id) && got[id] === min) shared++;
    since = min;
    if (shared > 1) {
      for (id in got) if (got.hasOwnProperty(id) && got[id] === min) got[id] = 0;
    }
    migrated = true;
  }

  /* Nothing should reach this module before Game.init() calls init(), but
     the title screen asks freshCount() every frame it draws and a throw
     in a draw loop is a black screen. So the first touch loads instead of
     failing. It is only ever the READ that happens early; earning still
     has the single path through check(). */
  function ensure() { if (n === null) load(); }

  function writeGot() {
    Save.set('achv', { v: 1, since: since, got: got,
                       fresh: freshUnknown.length ? fresh.concat(freshUnknown) : fresh });
  }
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
     passkey would otherwise pay out on. Neither looks a room or a doodad up
     for itself any more: this file had private roomById and levelById that
     shadowed two of the same names in js/levels.js, and its levelById had
     grown an extra guard the original did not have, so the two copies would
     have answered differently the first time a room was written without a
     `levels` array. The honest room gate now lives in js/levels.js beside
     the generous one, which is where the two can be read together. */

  /* POULTRY CATCHER. The doodads that cost something and have been paid
     for: Doodads.priced() is what says a doodad has a price at all (the
     three free ones answer false), and Doodads.meets() is isUnlocked()
     without the passkey line. TEN of the thirteen carry a price today -
     three scores, nine succulents, three limes, four that are found, done or
     caught, and one count of a bay's +5 - and an eleventh would count here
     the day it is written, without this function naming any of them.

     priced(), not requirement(), which is what this asked first: the
     question is "does this one cost anything", and requirement() answers it
     by BUILDING the price plate - an object and two strings per priced
     doodad, five objects and a dozen strings a call, every one thrown away
     unread. This runs once per point scored. */
  function doodadsBought() {
    var list = Doodads.list, best = Doodads.bestReached(), out = 0;
    for (var i = 0; i < list.length; i++) {
      if (Doodads.priced(list[i]) && Doodads.meets(list[i], best)) out++;
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
      if (Levels.gateMet(r)) out++;
    }
    return out;
  }

  /* ------------------------------------------------- the one evaluation

     Walk the twelve, compare have against need, bank what is newly done
     and hand it back. Everything that can earn an achievement comes
     through here, so the banner, the sound and the particles can all live
     at the ONE call site in PlayScene that reads the return value.

     WHERE IT IS CALLED FROM, because the comment here used to say "once
     per frame from the screens that draw bars" and no screen has ever
     called it: PlayScene calls it once per point from checkUnlocks, after
     every pickup through note(), after every ring through noteRun() and
     once when SADDAM is found, and TitleScene calls it once in enter().
     Nothing in a draw loop. The per-frame reader on the achievements screen
     is progress(), which is why that is the one with the cheap probe.

     Cheap anyway: twelve rows, and a row already banked is skipped BEFORE
     have() is asked, so the only probes that ever run are the ones still
     outstanding - bestReached and boonsTaken off cached save values,
     doodadsBought over eight doodads and roomsEarned over three rooms.

     `stamp` is the day to record. init() passes 0 on purpose - see there. */
  function check(stamp) {
    ensure();
    var out = [];
    var now = stamp === undefined ? Date.now() : stamp;
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
  function noteRun(key, v, key2) {
    if (typeof v !== 'number' || !isFinite(v)) return [];
    ensure();
    var moved = bumpRun(key, v);
    if (bumpRun(key2, v)) moved = true;
    if (!moved) return [];
    writeTallies();
    return check();
  }

  /* one key of a run statistic, high-water. Split out because noteRun takes
     TWO - the plain 'run.stun' and the level's 'run.stun.desk' - the way
     note() bumps both, and writing the save and re-evaluating the roster
     once between them rather than once each is the whole point: a run that
     took three rings was doing six localStorage writes and six full passes
     where three of each would do. */
  function bumpRun(key, v) {
    if (!key || v <= (n[key] | 0)) return false;
    n[key] = Math.min(Math.floor(v), 0x7fffffff);
    return true;
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
    /* NO DATE ON A PLATE THAT CAME OUT OF HISTORY. check(0) stores a zero
       where the day goes, and when() and the screen already render that as
       '- - -'. The alternative, which is what shipped, was to stamp the
       five retroactive plates with the day of this boot - and the screen
       prints EARNED above that, which says a run from three weeks ago
       happened this morning. A dash says what is true: the save could prove
       it was done and could not say when.

       It also makes the asymmetry legible, which is the real complaint.
       Five rows say EARNED over a dash because they were read out of the
       save, and seven have bars that start at zero because nothing was
       counting them before today - and the line under the panel says when
       today was. */
    var first = since === 0;
    if (first) since = Date.now();
    check(0);
    /* `since` and any repaired dates have to survive a boot that earns
       nothing, and check() only writes when it banks something */
    if (first || migrated) writeGot();
  }

  /* The secrecy gate, and the only thing in this file that is allowed to
     follow the passkey. Four of the twelve name a Living Room bay - the
     Desk's notification, the Couch's coasters, the Mantle's capybaras,
     the Fort's King -
     and while that door is shut they must give away nothing: no name, no
     how-line, no badge. The screen draws them as '? ? ?' with a padlock,
     exactly the way the level select draws a shut room's three cards. */
  function visible(a) {
    var e = resolve(a);
    if (!e) return false;
    if (!e.room) return true;
    return Levels.roomOpen(Levels.roomById(e.room));
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
     EARNED 13 / 12. */
  /* HOW MANY PLATES CAME OUT OF HISTORY RATHER THAN OUT OF PLAY. A plate
     with no day is one the save could prove and could not date; a plate
     dated before counting began is the same thing on a save whose repair
     above could not be certain enough to zero it. The screen asks so that
     it only explains the dash when there is a dash to explain. */
  function retroCount() {
    ensure();
    var c = 0;
    for (var i = 0; i < LIST.length; i++) {
      var id = LIST[i].id;
      if (!got.hasOwnProperty(id)) continue;
      if (!got[id] || (since && got[id] < since)) c++;
    }
    return c;
  }

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

  /* One row, or a LIST of them. The list is what the achievements screen
     actually hands over on the way out - every row it put on screen - and
     it used to call this once per row, each call writing the whole 'achv'
     key again. The owner's own first boot is the worst case and is not
     hypothetical: five plates banked out of history, all five FRESH, all
     five on page one, five JSON.stringify and five synchronous writes in
     the single frame of a scene swap. One write now.

     Written only when something actually changed, because most visits
     clear nothing. */
  function markSeen(a) {
    ensure();
    var list = (a === undefined || a === null) ? fresh.slice()
             : (Array.isArray(a) ? a : [a]);
    var moved = false;
    for (var i = 0; i < list.length; i++) {
      var e = resolve(list[i]);
      if (!e) continue;
      var at = fresh.indexOf(e.id);
      if (at < 0) continue;
      fresh.splice(at, 1);
      moved = true;
    }
    if (moved) writeGot();
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
    /* the day counting began, 0 on a save that has not booted this build */
    since: function () { ensure(); return since; },
    retroCount: retroCount,
    get: function (id) { return BY_ID.hasOwnProperty(id) ? BY_ID[id] : null; },
    total: function () { return LIST.length; },
    earned: earned, earnedCount: earnedCount,
    visible: visible, progress: progress,
    note: note, noteRun: noteRun, check: check,
    freshCount: freshCount, isFresh: isFresh, markSeen: markSeen,
    when: when
  };
})();
