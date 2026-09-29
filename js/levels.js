/* ------------------------------------------------------------------
   Land of Doodads - rooms and levels
   Locked placeholders stand in for what has not been built yet, so the
   carousels read the way they will once there is more to pick from: two
   rooms either side of the BACKYARD, and one bay to the left of THE COOP.
   The five built levels run in the order they are earned in, each one
   gated on the one before it.
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
    unlock: { room: 'backyard', level: 'coop', score: 20 },
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

  /* THE DECK sits between the Garden's pace and the Canopy's. Its second
     hazard is the only one in the game that switches itself off: a mister
     is lethal for about a quarter of its cycle, so it can reach further
     than the mint does and still be fair. */
  var DECK = {
    id: 'deck',
    name: 'THE DECK',
    code: '1-3',
    unlock: { room: 'backyard', level: 'garden', score: 20 },
    blurb: ['PATIO HEATERS AND MISTERS.', 'IT CANNOT PICK A SEASON.'],
    art: Deck,
    tune: {
      /* 111 and 176 are not arbitrary: js/deck.js keys the mister clock to
         250px of scroll and says in its own comment that this is 2.3
         seconds at speedStart and 1.4 at speedMax. Move these and that
         comment stops being true. */
      speedStart: 111, speedMax: 176, speedRamp: 0.83,
      gapStart: 103, gapMin: 78, gapRamp: 0.31,
      spacingStart: 227, spacingMin: 184, spacingRamp: 0.44,
      gapDrift: 56,
      /* the misters come on a shade earlier than the mint does */
      spikeScore: 14,
      spikeChance: 0.31, spikeChanceMax: 0.65,
      /* A mister's length INCLUDES its plumbing - the level takes 10px off
         a ceiling head and 14 off a floor one to get the jet - so these
         are the Garden's mint lengths with the riser added back on, and
         the water reaches about as far as the mint ever did. */
      spikeCeilMin: 24, spikeCeilMax: 38,
      spikeFloorMin: 30, spikeFloorMax: 46,
      /* apples from 7, the same as the tomatoes; the golden one is the
         level's own business and deliberately not a key here */
      dropScore: 7,
      dropEvery: 2.4, dropEveryMin: 1.05, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 30,
      spicyChance: 0.085,
      /* the same potted succulent the Garden grows, and just as rare */
      boonChance: 0.030, boonGap: 10
    }
  };

  var CANOPY = {
    id: 'canopy',
    name: 'THE CANOPY',
    code: '1-4',
    unlock: { room: 'backyard', level: 'deck', score: 20 },
    blurb: ['UP A TREE THAT GROWS APPLES.', 'AND ORANGES. AND LIMES.'],
    art: Canopy,
    /* straight from the numbers js/canopy.js asks for in its own header */
    tune: {
      speedStart: 114, speedMax: 178, speedRamp: 0.84,
      gapStart: 102, gapMin: 78, gapRamp: 0.31,
      spacingStart: 226, spacingMin: 184, spacingRamp: 0.44,
      gapDrift: 58,
      /* nobody pruned up here, so the twigs are in from early on */
      spikeScore: 12, spikeChance: 0.32, spikeChanceMax: 0.66,
      spikeCeilMin: 18, spikeCeilMax: 32,
      spikeFloorMin: 20, spikeFloorMax: 36,
      dropScore: 6,
      dropEvery: 2.3, dropEveryMin: 1.0, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 30,
      /* The power-up here is a LIME, and a lime is not a hot pepper wearing
         green: it is the sour one. It shrinks the doodad instead of doubling
         the score, and this level has no spicy at all - which is why there
         is no spicyChance here and why the engine's sour path exists. */
      sourChance: 0.09,
      /* and the spare life is a split pomegranate off the ceiling */
      boonChance: 0.032, boonGap: 10
    }
  };

  var CONSTRUCTION = {
    id: 'construction',
    name: 'THE CONSTRUCTION ZONE',
    code: '1-5',
    unlock: { room: 'backyard', level: 'canopy', score: 20 },
    blurb: ['THREE YEARS OF DECK MATERIALS.', 'THE SAWS ARE STILL PLUGGED IN.'],
    art: Construction,
    tune: {
      /* The last level leads on density rather than on raw speed, and the
         speed is pinned from below anyway: js/construction.js gears the
         blades to the world at one turn per 70px and states the result as
         1.6 turns a second at speedStart and 2.5 at speedMax, which is
         exactly 112 and 175. What makes this the hardest bay is that the
         gaps are the tightest, the bays the closest together, the saws
         never switch off and the lumber is heavy (DROP_GRAV 44). */
      speedStart: 112, speedMax: 175, speedRamp: 0.86,
      /* gapMin holds at 78 like the two levels before it. A flap lifts the
         doodad 48px and the hitbox is 22 across, so 78 leaves 8px to time
         it in; taking that lower is not difficulty, it is a coin toss. */
      gapStart: 100, gapMin: 78, gapRamp: 0.32,
      spacingStart: 224, spacingMin: 180, spacingRamp: 0.46,
      gapDrift: 60,
      /* Somebody left the saws running, and they never stop. This is the
         level's signature, so it leads on saws the way the Garden leads on
         mint: they start at 6 rather than 10, half the bays have one from
         the off, and by the end nine in ten do. One gap can still only hold
         a single blade - that limit is the engine's, and it is what keeps
         "nearly every bay" from meaning "a wall" - so the ceiling of 0.90
         is a saw you almost always have to fly around rather than a
         corridor that closes. */
      spikeScore: 6,
      spikeChance: 0.50, spikeChanceMax: 0.90,
      /* A blade shows at most 2R-3 of itself past the line and the level
         clamps to that, so anything past about 21 is a wasted roll. These
         ask for most of a blade and let the clamp have the rest. */
      spikeCeilMin: 14, spikeCeilMax: 20,
      spikeFloorMin: 16, spikeFloorMax: 21,
      /* the lid starts letting go earlier here than anywhere else */
      dropScore: 5,
      dropEvery: 2.2, dropEveryMin: 1.0, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 30,
      /* the butane can is the heat. The golden gear rides the very same
         spawner and is worth points rather than time, so the can sits at
         the Deck's rate rather than climbing again - between them this bay
         sheds more power-ups than any other. */
      spicyChance: 0.08,
      /* the heart of junk: a spare life, a little less rare than the
         pomegranate because everything else here is worse */
      boonChance: 0.034, boonGap: 10
    }
  };

  var LOCKED_LEVEL = { id: 'locked', name: '? ? ?', code: '', locked: true,
                       blurb: ['SOMETHING IS BEING BUILT', 'OUT HERE. NOT YET.'] };

  var ROOMS = [
    { id: 'locked-a', name: '? ? ?', locked: true, levels: [LOCKED_LEVEL, LOCKED_LEVEL, LOCKED_LEVEL] },
    /* startLevel is THE COOP, not the middle of the row: the carousel
       defaults to the middle of whatever it is given, which with five bays
       would open the room on a level nobody has earned yet. The Backyard
       has no locked placeholder any more - these five are the room. */
    { id: 'backyard', name: 'BACKYARD', locked: false,
      levels: [COOP, GARDEN, DECK, CANOPY, CONSTRUCTION], startLevel: 0 },
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

  /* What a locked-but-earnable level costs, for the level select card.
     The levels are a chain now - the Canopy is bought with a score in the
     Deck, which is itself bought with a score in the Garden - so `name` is
     regularly a level the player has not opened either. That still reads:
     the card says SCORE 25 IN THE DECK, and THE DECK is the card directly
     to its left saying what IT costs. `have` is 0 until the level in
     question has been played, which is the honest answer to "how close am
     I", and reachedOn writes no score table to find it out. */
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
    deck: DECK,
    canopy: CANOPY,
    construction: CONSTRUCTION,
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
