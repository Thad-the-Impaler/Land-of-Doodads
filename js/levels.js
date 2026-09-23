/* ------------------------------------------------------------------
   Land of Doodads - rooms and levels
   Locked placeholders sit either side of the real entries so the
   carousels read the way they will once there is more to pick from.
------------------------------------------------------------------ */
'use strict';

var Levels = (function () {

  var COOP = {
    id: 'coop',
    name: 'THE COOP',
    code: '1-1',
    locked: false,
    blurb: ['A DIY CHICKEN COOP THE SIZE', 'OF A BARN. MIND THE NAILS.'],
    art: Coop,
    /* tuning for the endless run */
    tune: {
      /* a flap lifts the doodad 48px and the hitbox is 22px across, so the
         room to time a flap in is gap - 22 - 48. at the old gapMin of 70
         that came to nothing at all: the flap had to land on the right
         pixel. these leave some slack at both ends of the run. */
      speedStart: 104, speedMax: 168, speedRamp: 0.8,     /* px/sec, +per second */
      gapStart: 106, gapMin: 80, gapRamp: 0.30,           /* px,     -per second */
      spacingStart: 232, spacingMin: 188, spacingRamp: 0.42,
      gapDrift: 52,                                       /* max shift between gaps */
      spikeChance: 0.28, spikeChanceMax: 0.62,
      /* Falling hazards - eggs here, tomatoes in the Garden - start once
         the score reaches dropScore, then arrive every dropEvery seconds
         or so, closing up as the run goes on. A level that leaves
         dropScore out never sheds any. spicyChance is how often one is
         the hot kind that grants the spicy power-up. */
      dropScore: 8,
      dropEvery: 2.6, dropEveryMin: 1.15, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,               /* px in from the right edge */
      dropFallMin: 4, dropFallMax: 30,                    /* speed leaving the rafter  */
      spicyChance: 0.07
    }
  };

  var GARDEN = {
    id: 'garden',
    name: 'THE GARDEN',
    code: '1-2',
    /* earned, not built-later: see `unlock` and Levels.isUnlocked */
    unlock: { room: 'backyard', level: 'coop', score: 25 },
    blurb: ['IT WAS NEAT ROWS, ONCE.', 'THE MINT HAD OTHER IDEAS.'],
    art: Garden,
    tune: {
      speedStart: 110, speedMax: 174, speedRamp: 0.82,
      gapStart: 104, gapMin: 78, gapRamp: 0.31,
      spacingStart: 228, spacingMin: 184, spacingRamp: 0.44,
      gapDrift: 54,
      /* the mint does not come up until the bed is well under way, and
         when it does it runs - it is mint */
      spikeScore: 15,
      spikeChance: 0.30, spikeChanceMax: 0.64,
      spikeCeilMin: 22, spikeCeilMax: 38,
      spikeFloorMin: 26, spikeFloorMax: 46,
      /* tomatoes from 7, and roughly one in twelve is a hot pepper */
      dropScore: 7,
      dropEvery: 2.5, dropEveryMin: 1.1, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 30,
      spicyChance: 0.08,
      /* the succulent: genuinely rare, and never twice in quick succession */
      boonChance: 0.028, boonGap: 10,
        /* Somebody is hiding behind the tenth stake. Which doodad is the
           roster's business, not this level's - PlayScene asks
           Doodads.meetable() - so this only says where to look. */
        meetAt: 10
    }
  };

  var LOCKED_LEVEL = { id: 'locked', name: '? ? ?', code: '', locked: true,
                       blurb: ['SOMETHING IS BEING BUILT', 'OUT HERE. NOT YET.'] };

  var ROOMS = [
    { id: 'locked-a', name: '? ? ?', locked: true, levels: [LOCKED_LEVEL, LOCKED_LEVEL, LOCKED_LEVEL] },
    { id: 'backyard', name: 'BACKYARD', locked: false,
      levels: [LOCKED_LEVEL, COOP, GARDEN], startLevel: 1 },
    { id: 'locked-b', name: '? ? ?', locked: true, levels: [LOCKED_LEVEL, LOCKED_LEVEL, LOCKED_LEVEL] }
  ];

  /* ------------------------------------------------------------ unlocks

     A level opens on the score the player reached ON ANOTHER LEVEL, which
     is a different question from the doodads' "best anywhere", so it needs
     its own number per room+level.

     It is banked in its own save key rather than read back out of the score
     tables, for three reasons. A fresh table is seeded with the doodads'
     house scores (PEP 12), which would hand a new save 12 of the 30 for
     free. Scores.erase() - X on the High Scores screen - rewrites a table
     back to those house scores, and losing a level you had earned would be
     indefensible. And Scores.table() WRITES a table the first time it is
     read, so merely asking whether the Garden is open would quietly
     materialise a score table for a level nobody can reach yet.

     Personal bests are the player's own runs and survive an erase, so they
     are what an existing save is seeded from, once.                     */

  var reachedCache = {};

  function reachedKey(room, level) { return 'reached.' + room.id + '.' + level.id; }

  function reachedOn(room, level) {
    var k = reachedKey(room, level);
    if (reachedCache[k] !== undefined) return reachedCache[k];
    var v = Save.get(k, null);
    if (typeof v !== 'number') {
      v = 0;
      Doodads.list.forEach(function (d) {
        var pb = Scores.personalBest(room, level, d.id);
        if (pb > v) v = pb;
      });
      Save.set(k, v);
    }
    reachedCache[k] = v;
    return v;
  }

  /* bank a run's score, and report any level it just opened. asks what the
     jump CROSSED, not what it landed on: the spicy power-up scores +2 and
     can step straight over the threshold. */
  function noteScore(room, level, score) {
    var before = reachedOn(room, level);
    if (score <= before) return [];
    var k = reachedKey(room, level);
    reachedCache[k] = score;
    Save.set(k, score);
    var won = [];
    ROOMS.forEach(function (r) {
      r.levels.forEach(function (lv) {
        var u = lv.unlock;
        if (!u || u.room !== room.id || u.level !== level.id) return;
        if (u.score > before && u.score <= score && won.indexOf(lv) < 0) won.push(lv);
      });
    });
    return won;
  }

  function roomById(id) {
    for (var i = 0; i < ROOMS.length; i++) if (ROOMS[i].id === id) return ROOMS[i];
    return null;
  }
  function levelById(room, id) {
    if (!room) return null;
    for (var i = 0; i < room.levels.length; i++) if (room.levels[i].id === id) return room.levels[i];
    return null;
  }

  /* `locked` means never built. `unlock` means built but not yet earned. */
  function isUnlocked(level) {
    if (!level || level.locked) return false;
    if (!level.unlock) return true;
    if (Doodads.masterKey()) return true;
    var r = roomById(level.unlock.room);
    var lv = levelById(r, level.unlock.level);
    if (!r || !lv) return true;
    return reachedOn(r, lv) >= level.unlock.score;
  }

  /* what a locked-but-earnable level costs, for the level select card */
  function requirement(level) {
    if (!level || !level.unlock) return null;
    var r = roomById(level.unlock.room);
    var lv = levelById(r, level.unlock.level);
    return { score: level.unlock.score, level: lv,
             have: (r && lv) ? reachedOn(r, lv) : 0,
             name: lv ? lv.name : '? ? ?' };
  }

  function refresh() { reachedCache = {}; }

  /* bake every built level's tiles once at boot */
  function buildArt() {
    var done = [];
    ROOMS.forEach(function (room) {
      room.levels.forEach(function (lv) {
        if (!lv.art || done.indexOf(lv.art) >= 0) return;
        done.push(lv.art);
        lv.art.build();
      });
    });
  }

  return {
    rooms: ROOMS,
    startRoom: 1,
    coop: COOP,
    garden: GARDEN,
    reachedOn: reachedOn, noteScore: noteScore,
    isUnlocked: isUnlocked, requirement: requirement, refresh: refresh,
    buildArt: buildArt,
    /* Every level that is BUILT, in menu order - deliberately not filtered
       by whether it has been earned. Doodads.bestReached() seeds itself by
       walking this list, and gating it on isUnlocked would send it back
       through Doodads for the passkey and loop. Callers that want only the
       earned ones filter with Levels.isUnlocked themselves. */
    playable: function () {
      var out = [];
      ROOMS.forEach(function (room, ri) {
        if (room.locked) return;
        room.levels.forEach(function (lv, li) {
          if (!lv.locked) out.push({ room: room, level: lv, roomIndex: ri, levelIndex: li });
        });
      });
      return out;
    }
  };
})();
