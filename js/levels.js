/* ------------------------------------------------------------------
   Land of Doodads - rooms and levels

   Ten built bays in two rooms, run in the order they are earned in,
   each one gated on the one before it: the BACKYARD's five, and then
   the LIVING ROOM's five.

   ONE locked placeholder is left, and it stands to the RIGHT of the
   last real room. The one that used to sit to the LEFT of the Backyard
   has retired: it was there to say "there will be more of these", which
   two rooms now say for themselves, and nothing can stand to the left of
   1-1 once the row is a sequence rather than a shelf. The right-hand
   placeholder stays as the promise of the Bar and the Table, and because
   the carousel wants a stop past the last thing you can play.

   A ROOM can now be gated on a score, exactly the way a level is and
   resolved by the same reachedOn(): `unlock: { room, level, score }`.
   `locked` still means NEVER BUILT and is only on the placeholder.
   The difference matters, and it is the whole of the Living Room's
   secrecy: a level behind a shut door shows NOTHING - not its name, not
   its cover, not its price - because Levels.levelsOf() does not hand the
   carousel the real bays at all until the room is open.
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

  /* ================================================== THE LIVING ROOM

     Indoors, after dark, and the first room where the CEILING KILLS. That
     is one rule for five bays and it is published by js/livingroom.js as
     LivingRoom.CEIL_KILLS, which every one of the five art modules exports
     as its own CEIL_KILLS - so the engine reads a boolean off the level and
     never asks which level it is.

     What that rule costs, in numbers: gapMin holds at 80 to 82 rather than
     falling to the Backyard's 78. A flap lifts the doodad 48px and the
     hitbox is 22 across, so 78 leaves 8px to time a flap in - which is the
     tightest the game goes, and it was tuned for a room where overshooting
     upward merely bounced. Here overshooting upward ends the run, so the
     two or four pixels back are the room's entry fee, paid once, and the
     difficulty is spent on the hazards instead. */

  var DESK = {
    id: 'desk',
    name: 'THE DESK',
    code: '2-1',
    /* NO `unlock` of its own, deliberately. The room's gate IS this bay's
       price - 20 in the Construction Zone opens the door and the first bay
       behind it together - and two fields that both have to say "20 in the
       Construction Zone" would one day not. */
    blurb: ['THREE SCREENS, FOUR DRAWERS.', 'SOMETHING IS ALWAYS RINGING.'],
    art: Desk,
    tune: {
      /* the room's first bay opens at about the Garden's pace: the ceiling
         is the new thing to learn and it does not need company */
      speedStart: 110, speedMax: 172, speedRamp: 0.82,
      gapStart: 108, gapMin: 82, gapRamp: 0.30,
      spacingStart: 230, spacingMin: 186, spacingRamp: 0.43,
      gapDrift: 50,
      /* The app icons. They are spikes, because a spike is a thing fixed to
         an edge of the room that you fly past - and these pop out of the
         monitors, which is exactly that. They carry ob.stun rather than
         killing: see the ring in js/scene_play.js. */
      spikeScore: 10,
      spikeChance: 0.26, spikeChanceMax: 0.58,
      spikeCeilMin: 14, spikeCeilMax: 22,
      spikeFloorMin: 14, spikeFloorMax: 22,
      /* books off the shelves from 7, and one in twelve or so is a breath
         mint - the minty-spicy drop, which is the heat under another name */
      dropScore: 7,
      dropEvery: 2.5, dropEveryMin: 1.15, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 30,
      spicyChance: 0.08,
      /* the coffee cup: a spare life, as rare as the Deck's succulent. The
         quarter is worth +5 and is the ART's own roll, not a tune key, for
         the reason js/construction.js gives about its gear: a coin that the
         art does not know about gets a book's width and a book's shadow. */
      boonChance: 0.030, boonGap: 10
    }
  };

  var COUCH = {
    id: 'couch',
    name: 'THE COUCH',
    code: '2-2',
    unlock: { room: 'livingroom', level: 'desk', score: 20 },
    blurb: ['SOMEBODY MADE POPCORN.', 'NOBODY SWEPT UP.'],
    art: Couch,
    tune: {
      speedStart: 112, speedMax: 174, speedRamp: 0.83,
      gapStart: 106, gapMin: 82, gapRamp: 0.31,
      spacingStart: 228, spacingMin: 184, spacingRamp: 0.44,
      gapDrift: 52,
      /* The spikes are the quiet hazard here, because the popcorn is the
         loud one. 0.52 at the ceiling against the Desk's 0.58: the bottom
         of this room fills up on its own and does not need help. */
      spikeScore: 12,
      spikeChance: 0.24, spikeChanceMax: 0.52,
      spikeCeilMin: 14, spikeCeilMax: 22,
      spikeFloorMin: 16, spikeFloorMax: 24,
      /* THE POPCORN. The kernels do not splat - js/couch.js takes the
         drop's motion over with art.stepDrop and bounces them off the
         cushions, the floor, the pillars and each other. Which is why
         dropScore is 4: the level's signature has to start early enough
         to BE the level, the way the Construction Zone's saws start at 6.
         dropFallMax is 24 rather than 30 so a kernel arrives with
         something left to bounce with.

         WHY THESE NUMBERS AND NOT THE BACKYARD'S. The owner asked for
         popcorn "collecting at the bottom of the screen, bouncing off the
         floor, pillars, and each other", and the first tune delivered
         none of the three: measured on a 38s run, 2.09 kernels on screen
         and 0.72 of them landed, and over 300 simulated seconds exactly
         three kernel-on-kernel contacts totalling 0.05s. No carpet, and
         the bounce the request names by name was never once seen.

         THE SPAWN WINDOW IS THE FIX, NOT THE RATE. At the Backyard's
         dropAhead 104..200 a kernel is born at x 280..376, lands at x
         6..102 at speedMax and is culled at -77 half a second to a second
         later - so NO rate builds a carpet, it only puts more kernels in
         the AIR, and the air is where they kill: a kernel from 280 crosses
         the doodad's own column at y 60..90, which is head height for
         anything flying properly. 12..112 puts them down at x 80..180 at
         speedMax and 180..280 at speedStart, a full second AHEAD of the
         doodad, so each one hops for 1.5 to 3.2 seconds where the player
         is looking instead of 0.5 to 2.5 under their feet, and nothing
         crosses the lane at the player's x above about y 150.

         Then the rate, on top of that window: 0.9 down to 0.40 at 0.04 a
         second, so the floor arrives 12.5s into a run, about a second
         after the kernels arm at score 4. 0.40 rather than 0.25 or 0.32 -
         at 0.32 a non-dodging test doodad died at 16, 17 and 24 seconds
         against 18..38 at the old tune, with five kernels in the air at
         once, which is a different level and not a harsher one. Measured
         at 0.40 over two 38s runs: 5.7 on screen, 2.7 landed, 7.4 and 3.5
         in the last ten seconds, peaks of 11 and 7, and 86 kernel-kernel
         contacts a run totalling 1.4s. Harsh, which is what was asked
         for; the landed carpet is in front of the player, a kernel's box
         is 6x6 and the re-launch apex is fixed, so it is learnable. */
      dropScore: 4,
      dropEvery: 0.9, dropEveryMin: 0.40, dropEveryRamp: 0.04,
      dropAheadMin: 12, dropAheadMax: 112,
      dropFallMin: 4, dropFallMax: 24,
      /* Hot cheddar popcorn is the heat; the marshmallow is the art's own
         +5, like the quarter next door. 0.045 against the Desk's 0.075
         because the roll is per drop and the drops now come twice as
         often: one cheddar every ~9 seconds, which is where it was, and
         it is the escape hatch from the carpet because hot kernels smash
         on contact. The marshmallow's own gap is js/couch.js's. */
      spicyChance: 0.045,
      /* THE COASTERS ARE COMMONER THAN ANY OTHER SPARE LIFE, on purpose.
         A boon stands on the floor band, and on this level the floor band
         is the popcorn carpet: a coaster at FLOOR-9 is a dive through a
         crowd of hopping kernels, and a fair share of those dives fail.
         The engine's spacing is boonGap plus a geometric wait of
         1/boonChance planks, so the other Living Room bays run 10 + 1/0.030
         .. 1/0.034 = 39 to 43 planks between spare lives and the Backyard
         39 to 46. 0.045 puts this one at 10 + 22 = 32 planks, a fifth
         closer than the next commonest in the game - which, with maybe a
         third of them unreachable behind the kernels, lands the ones a
         player actually gets about where every other bay's are. boonGap
         stays at 10 so two can never arrive together. */
      boonChance: 0.045, boonGap: 10,
      /* Somebody is bouncing in the popcorn, somewhere between the fifth
         pillow and the twentieth. Which doodad that is remains the roster's
         business, the same as it is in the Garden - this only says where to
         look - but unlike the Garden's stake, WHICH pillow is rolled fresh
         every run, and that is what meetSpan is: the first one he may be at
         plus how many more the dice may add.

         WHY A WINDOW HERE AND A FIXED PLANK THERE. The Garden's hiding
         place is the same dive every run, so one number is honest. This
         floor is not: the kernels arm at dropScore 4 and the carpet above
         does not thicken until about 12.5 seconds in. At speedStart 112 and
         spacing 228 the fifth pillow is roughly 10 seconds out and the
         twentieth roughly 38, so an early draw is a dive onto nearly bare
         cushion and a late one is a dive into the full carpet. Pinning it to
         one pillow would have handed every player the same run of the two,
         and 5..20 is the honest spread between them - the easy end still
         asks for the dive, the hard end is the one worth telling somebody
         about. 20 and not higher because a run that long is not a given on
         this bay, and a hiding place nobody reaches is not a hiding place. */
      meetAt: 5, meetSpan: 15
    }
  };

  var MANTLE = {
    id: 'mantle',
    name: 'THE MANTLE',
    code: '2-3',
    unlock: { room: 'livingroom', level: 'couch', score: 20 },
    blurb: ['BLACK PAINT AND A BIG SCREEN.', 'THE REMOTES ARE STILL AIMING.'],
    art: Mantle,
    tune: {
      speedStart: 114, speedMax: 176, speedRamp: 0.84,
      gapStart: 104, gapMin: 80, gapRamp: 0.31,
      spacingStart: 226, spacingMin: 182, spacingRamp: 0.45,
      gapDrift: 54,
      /* The signal lasers. They lead the level the way the Garden leads on
         mint - in from 8, and by the end two bays in three have one -
         because they are slow, predictable and meant to be read rather
         than reacted to. Their reach is a spike length, so these are the
         Deck's numbers: a beam that can cross half the gap and switch off
         is fair in a way a beam that merely sits there is not.

         THE NUMBERS WERE WRONG AND THE OWNER SAW IT: "extend the range of
         the lasers so they have more of an effect on the player". The old
         16/26 and 18/28 were the shortest spikes in the game and the
         measurement says why they could not matter. spawnAhead keeps every
         gap inside CEIL+34 .. FLOOR-34, so with HIT_R 11 a doodad crossing
         a bay has its CENTRE somewhere in y 69..197 - a band 128px tall,
         and nowhere else. js/mantle.js adds the remote's own body back on
         (10 at the ceiling, 14 on the shelf) and draws the reach at
         rand(0.7*maxLen, maxLen). At the old tune the longest floor beam
         was 14+28 = 42, tip at y 200, lethal to a centre at 189 or below:
         8px of the 128, 6% of the band. The MEDIAN beam tipped out at 208
         and 52 - outside the band at both ends - so the typical remote was
         geometrically incapable of touching a doodad flying through any
         gap. It was a 25px stub with a thread of red on it.

         At 32/48 and 40/56: the longest floor beam is 14+56 = 70, tip 172,
         lethal from 161 down - 36px, 28% of the band; the median is 55,
         tip 187, 16%. The longest ceiling beam is 10+48 = 58, tip 82,
         lethal to 93 - 24px, 19%; the median 44, tip 68, 8%. The SHORTEST
         beam this tune can make (0.7*40+14 = 42) is the old tune's
         longest.

         WHAT IS LEFT TO FLY THROUGH. spawnAhead admits ONE makeSpikes per
         bay on ONE side, and Mantle.makeSpikes puts both heads of a pair on
         the side it was handed, so a ceiling beam and a floor beam never
         share a bay and the 90px of daylight the two longest would leave is
         hypothetical. The real worst case is one longest floor beam after
         the lowest gap: a centre at 197 has to be at 161 by the beam column
         about 100px (0.57s) later, a 36px climb inside one 48px flap; and
         the longest ceiling beam after the highest gap asks for a 24px
         drop, which gravity 1180 gives in 0.2s. It stays readable because
         the beam is keyed to ob.x - the same beam every frame - it is
         lethal for only 63px of every 300px of scroll, and the LED arms at
         0.50 with aim dots at 0.58 before it bites at 0.64. */
      spikeScore: 8,
      spikeChance: 0.34, spikeChanceMax: 0.68,
      spikeCeilMin: 32, spikeCeilMax: 48,
      spikeFloorMin: 40, spikeFloorMax: 56,
      /* RGB pixels off the screen from 6 */
      dropScore: 6,
      dropEvery: 2.3, dropEveryMin: 1.05, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 30,
      /* The owner asked for a sour and a bonus drop here and left the
         choice open. SOUR, and no spicy at all - the Canopy's shape. The
         reason is the lasers: this bay's hazard is a thin line that is
         either on you or not, so the power-up worth having is the one that
         makes the doodad SMALLER, and the one worth not having is the one
         that makes the room 1.55x faster while a beam is sweeping it. The
         +5 is the art's own roll again. */
      sourChance: 0.085,
      /* the spare life is a battery off the shelf */
      boonChance: 0.032, boonGap: 10,
      /* The controllers. Everything above this score is a remote: slow,
         straight, predictable. From here the game pads join in and their
         beams DRIFT, which is the first unpredictable hazard in the room -
         so it gets its own heads-up, art.WARN.late, and the makers learn
         about it through run.late. Nothing may get more lethal without
         that pair. 18 is late enough to be most of a good run in. */
      lateScore: 18
    }
  };

  var WHITEBOARD = {
    id: 'whiteboard',
    name: 'THE WHITEBOARD',
    code: '2-4',
    unlock: { room: 'livingroom', level: 'mantle', score: 20 },
    blurb: ['NOTHING ON IT WAS EVER ERASED.', 'THE MAGNETS HOLD IT ALL DOWN.'],
    art: Whiteboard,
    tune: {
      /* the fastest thing in the game alongside the Canopy's ceiling of
         178 - and the Fort after it, which matches this rather than
         passing it, because it leads on its shooters and not on speed */
      speedStart: 116, speedMax: 178, speedRamp: 0.86,
      gapStart: 102, gapMin: 80, gapRamp: 0.32,
      spacingStart: 224, spacingMin: 180, spacingRamp: 0.46,
      gapDrift: 56,
      /* the dry-erase lines, and there are a great many of them: 0.76 is
         second only to the Construction Zone's saws */
      spikeScore: 7,
      spikeChance: 0.40, spikeChanceMax: 0.76,
      spikeCeilMin: 16, spikeCeilMax: 26,
      spikeFloorMin: 18, spikeFloorMax: 28,
      /* the magnets, spinning flat, from 5 */
      dropScore: 5,
      dropEvery: 2.1, dropEveryMin: 0.98, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 30,
      /* THE FIRST LEVEL THAT SHEDS BOTH. Every power-up in the game is
         drawn on this board in marker - the pepper, the lime, the
         succulent and the golden apple - so it is the first bay where the
         heat and the sour can both be running, and drawGauge in
         js/scene_play.js grew a `y` for it: the lime's gauge moves to 92
         rather than standing down. Each is a shade rarer than it would be
         alone, because two power-ups at the same rate is twice as many
         power-ups. It is no longer the only one: the Fort after it sheds
         both as well, though not off its ceiling - its heat and its sour
         are pellets out of a Cupman's gun - so this is still the only
         bay whose LID drops them. */
      spicyChance: 0.07,
      sourChance: 0.07,
      /* and the drawn succulent, the least rare spare life in the game,
         because everything else here is worse */
      boonChance: 0.034, boonGap: 10,
      /* the markers come off the tray and start drawing */
      lateScore: 16,
      /* THERE IS A HOLE IN THIS BAY'S FLOOR, and this only says when it may
         open and for how long you are down there. warpAt is the first plank
         it may follow and warpSpan the spread above it, exactly as meetAt
         and meetSpan name a hiding place; warpStay is how many planks the
         stay lasts. The roll is start()'s, once per run, in js/scene_play.js
         beside the meet's - and it only happens while Doodads.chaseable
         says somebody is still behind this bay. Once he is caught the roll
         comes back 0 and the floor is a floor again. WHAT is down there is
         the roster's business and the art's, not this level's: nothing here
         names it, the same way meetAt never names who is hiding. */
      warpAt: 10, warpSpan: 10, warpStay: 10
    }
  };

  var FORT = {
    id: 'fort',
    name: 'THE FORT',
    code: '2-5',
    unlock: { room: 'livingroom', level: 'whiteboard', score: 20 },
    blurb: ['THE ROOM IS ALL CARDBOARD NOW.', 'THE CUPMEN HAVE TOY GUNS.'],
    art: Fort,
    tune: {
      /* The Whiteboard's speed, exactly, and on purpose: this bay leads on
         its shooters and not on its pace, the Construction Zone's argument
         again. Passing 178 would make it the fastest thing in the game AND
         the only one that shoots back, which is two difficulties stacked
         where one was asked for. 116 + 0.86 a second reaches 178 at 72s. */
      speedStart: 116, speedMax: 178, speedRamp: 0.86,
      /* 82, the room's entry fee, and two more than the Whiteboard's 80: a
         shooter standing on the rug is the squeeze in this bay, and a gap
         that is also the narrowest in the room would be a second squeeze
         on top of it. 104 down at 0.30 holds 82 from 73s. */
      gapStart: 104, gapMin: 82, gapRamp: 0.30,
      /* The widest planks in the game at the close: 190 against the Coop's
         188 and the Whiteboard's 180. A Cupman patrols the rug BETWEEN two
         planks, his window is 2 x (reach + 14) = 88 wide and sits 14px
         right of the bay's centre so Teef never surfaces into him (the
         reasoning is js/cupmen.js's, "Teef's surfacing rule"), and at 190
         that leaves 36px of rug between his right-hand reach and the next
         cap. Any tighter and the patrol would be standing in a plank. */
      spacingStart: 232, spacingMin: 190, spacingRamp: 0.40,
      gapDrift: 54,
      /* NO SPIKES, for good. Round one stood tripod light stands on the
         rug and hung ribbon pull-tabs off the roof from 8, and the owner
         took them out: "we already get our floor obstacles with the
         cupmen". A Cupman on nearly every rug IS this bay's floor hazard,
         and a tripod was only ever a Cupman that did not get that bay.
         The engine has no "none" for spikes - a level that leaves
         spikeScore out has them from the first pillar, the Coop's default -
         so the gate is shut instead: spikesReady() is false while pace <
         spikeScore, and no run reaches a billion, so they never arm,
         art.WARN.spike never shows and the dice are never thrown. Both
         chances are 0 as well, so lowering the gate alone turns nothing
         back on. The spike length keys went with them: the engine defaults
         any that are missing, and nothing here would be drawn. js/fort.js
         keeps a harmless makeSpikes stub because the engine still names
         art.makeSpikes. */
      spikeScore: 1e9,
      spikeChance: 0, spikeChanceMax: 0,
      /* THE BISCUITS: the black foam connectors working loose from the
         roof panels, from 5. RARER THAN ANY OTHER BAY'S DROPS, because the
         owner asked for exactly that - "less common than the other dropping
         obstacles, because of the other, harder obstacle of the level". 3.4
         falling to 1.7 at 0.03 a second against the Coop's 2.6/1.15, the
         Whiteboard's 2.1/0.98 and the Couch's 0.9/0.40: 1.6x rarer than the
         Whiteboard at the start and 1.7x at the floor, which is reached at
         57s rather than 37s. The engine's own jitter (x0.78..1.28) is
         unchanged, so the first twenty seconds see five to seven. They
         also STOP while the King Cupman holds the floor (the owner's round
         two: "stop coming down when the King Cupman is present"), which is
         no key here: js/cupmen.js raises run.ledger.holdDrops when he is
         summoned and lowers it when he falls, and the engine's drop
         spawner returns early while it is up. They resume, on these same
         numbers, once he is down. */
      dropScore: 5,
      dropEvery: 3.4, dropEveryMin: 1.7, dropEveryRamp: 0.03,
      dropAheadMin: 104, dropAheadMax: 200,
      dropFallMin: 4, dropFallMax: 26,
      /* NO spicyChance, goldChance or sourChance, and that absence is the
         decision. A biscuit is always a plain lethal puck; every gift in
         this bay is a PELLET out of a Cupman's gun - the Crimsons' red
         heat, the Greens' sour, the Golden Order's +5 coin and the King's
         crowns (js/cupmen.js). These three keys drive the CEILING spawner,
         so leaving them out is how the lid is told to shed nothing but
         hazards. */
      /* THE AMMO BAG (Ammo Bag ref): a canvas tote heaped with the plain
         Cupmen's yellow pellets, the owner's swap for round one's sloth
         plushie. The room's usual rate: 10 + 1/0.032 = 41 planks between
         spare lives. A bag on the rug takes that bay from a Cupman, so
         with foes on nearly every bay it is the one rug a Cupman is sure
         not to be standing on. */
      boonChance: 0.032, boonGap: 10,
      /* THE CUPMEN, from 12, which is the owner's number: "they appear after
         the player reaches 12 pillars", and it stands: round two asked for
         more of them ("almost every pillar"), which is js/cupmen.js's dice
         per bay, not an earlier start. foeScore is an engine key - the
         engine rolls art.makeFoe once per bay from here and shows
         art.WARN.foe once, the way spikeScore gates a level's spikes and
         art.WARN.spike - and like every key here it is a number the engine
         reads without asking which level it is. A level without it never
         meets a foe. The Crimsons and the Greens come first. */
      foeScore: 12,
      /* The Silver Sentinels and the Golden Order, from 20 - the owner's
         round-two number ("Silver Sentinels/Golden Order to 20"), one on
         from round one's 19 - on the engine's existing late pair:
         art.WARN.late and run.late. Nothing may get more lethal without
         that pair. Eight pillars of Crimsons and Greens first, then ten of
         the full guard before the King.

         The King Cupman's 30 (round two's, up from 25) is deliberately NOT
         here, though he waits for run.late and so can never beat this 20.
         A maker is never handed tune, so a threshold only the art reads
         lives in the art, the way the quarter's roll lives in js/desk.js:
         it is Cupmen.tune.kingAt, and Cupmen.tune is left mutable so a
         headless test can call him at 0. */
      lateScore: 20
    }
  };

  var LOCKED_LEVEL = { id: 'locked', name: '? ? ?', code: '', locked: true,
                       blurb: ['SOMETHING IS BEING BUILT', 'OUT HERE. NOT YET.'] };

  /* What a shut room hands the carousel instead of its own bays. THREE of
     them, not four: the number of cards behind a door must not be readable
     off the front of it, and three is what every placeholder has always
     shown. Frozen once, because it is handed out on every frame the level
     select draws. */
  var LOCKED_THREE = [LOCKED_LEVEL, LOCKED_LEVEL, LOCKED_LEVEL];

  var BACKYARD = {
    id: 'backyard', name: 'BACKYARD', locked: false,
    levels: [COOP, GARDEN, DECK, CANOPY, CONSTRUCTION],
    /* startLevel is THE COOP, not the middle of the row: the carousel
       defaults to the middle of whatever it is given, which with five bays
       would open the room on a level nobody has earned yet. */
    startLevel: 0
  };

  var LIVINGROOM = {
    id: 'livingroom', name: 'LIVING ROOM',
    /* A room earned, not built-later: the same shape a level's gate has,
       resolved by the same reachedOn(). THE DESK carries no gate of its own
       because this IS its price - the room and its first bay open on one
       plank, and two fields that have to agree would one day not. */
    unlock: { room: 'backyard', level: 'construction', score: 20 },
    levels: [DESK, COUCH, MANTLE, WHITEBOARD, FORT],
    /* opens on THE DESK, as the Backyard opens on THE COOP */
    startLevel: 0
  };

  var ROOMS = [
    BACKYARD,
    LIVINGROOM,
    { id: 'locked-b', name: '? ? ?', locked: true, levels: LOCKED_THREE }
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

  /* Bank a run's score, and report everything it just opened.

     Asks what the jump CROSSED, not what it landed on: the spicy power-up
     scores +2 and the gold +5, either of which can step straight over a
     threshold.

     Returns a list of { kind: 'room' | 'level', it: object }, ROOMS FIRST.
     A score can open a room and a bay in the same instant - 20 in the
     Construction Zone opens the Living Room, and THE DESK comes with it -
     and the room is the bigger news, so it goes to the front of the banner
     queue. The shape is tagged rather than two lists because PlayScene's
     queue already carries ('level', lv) and ('doodad', d) pairs and knew
     how to announce a third kind the moment there was one. */
  function noteScore(room, level, score) {
    var before = reachedOn(room, level);
    if (score <= before) return [];
    var k = reachedKey(room, level);
    reachedCache[k] = score;
    Save.set(k, score);
    var out = [], seen = [];
    /* the rooms this score just unlocked */
    ROOMS.forEach(function (r) {
      var u = r.unlock;
      if (!u || u.room !== room.id || u.level !== level.id) return;
      if (u.score > before && u.score <= score) out.push({ kind: 'room', it: r });
    });
    /* then the bays, exactly as before */
    ROOMS.forEach(function (r) {
      r.levels.forEach(function (lv) {
        var u = lv.unlock;
        if (!u || u.room !== room.id || u.level !== level.id) return;
        if (u.score > before && u.score <= score && seen.indexOf(lv) < 0) {
          seen.push(lv);
          out.push({ kind: 'level', it: lv });
        }
      });
    });
    return out;
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

  /* which room a level belongs to. Private: nothing outside needs it, and
     every caller that thinks it does wants levelsOf() or roomOpen(). */
  function roomOf(level) {
    for (var i = 0; i < ROOMS.length; i++) {
      if (ROOMS[i].levels.indexOf(level) >= 0) return ROOMS[i];
    }
    return null;
  }

  /* ------------------------------------------------------------- rooms

     A room has the same two states a level has, and the same two fields
     say which: `locked` is NEVER BUILT - the one remaining placeholder -
     and `unlock` is built but not yet earned. One field, one source of
     truth: a room with an unlock it has not met is SECRET, and secret
     means the player can deduce nothing at all from the level select.

     IMP11 opens it along with everything else, because a passkey that
     opened every doodad and every level but left a room shut would be a
     passkey with an exception nobody could guess. */
  function roomOpen(room) {
    if (!room || room.locked) return false;
    if (!room.unlock) return true;
    if (Doodads.masterKey()) return true;
    return gateMet(room);
  }

  /* HAS THIS ROOM'S OWN PRICE ACTUALLY BEEN PAID? roomOpen() minus the
     passkey line, the way Doodads.meets() is isUnlocked() minus it, and for
     the same caller: VOYAGER is a record of a door the player opened, and
     IMP11 opens every door without anybody flying anywhere.

     It lives here rather than in js/achievements.js, which had its own copy
     along with private roomById and levelById of its own that shadowed
     these two - and whose levelById had quietly grown an extra guard, so
     the copies would have answered differently the first time a room was
     written without a `levels` array. One gate, one place, next to the
     generous version so the two can be read together.

     It differs from roomOpen on one more point, deliberately: an unlock
     naming a room or a level that cannot be resolved is FALSE here where
     roomOpen returns true. roomOpen is being generous about a door - better
     open than permanently shut on a typo - and a badge has to be the other
     way round, because a typo must not hand out something nobody earned. */
  function gateMet(room) {
    if (!room || !room.unlock) return !!room && !room.locked;
    var r = roomById(room.unlock.room);
    var lv = levelById(r, room.unlock.level);
    if (!r || !lv) return false;
    return reachedOn(r, lv) >= room.unlock.score;
  }

  /* What the level select may SHOW of a room. An open room hands over its
     real bays; a shut one hands over three placeholders, which is the whole
     of the secrecy - drawCard is never passed a Living Room level while the
     door is shut, so it cannot draw a cover, a name, a code, a high score
     or a price even by accident. */
  function levelsOf(room) {
    return roomOpen(room) ? room.levels : LOCKED_THREE;
  }

  /* `locked` means never built. `unlock` means built but not yet earned.
     And a bay in a shut room is shut whatever its own field says - THE DESK
     has no `unlock` of its own precisely because the room carries it. */
  function isUnlocked(level) {
    if (!level || level.locked) return false;
    var rm = roomOf(level);
    if (rm && !roomOpen(rm)) return false;
    if (!level.unlock) return true;
    if (Doodads.masterKey()) return true;
    var r = roomById(level.unlock.room);
    var lv = levelById(r, level.unlock.level);
    if (!r || !lv) return true;
    return reachedOn(r, lv) >= level.unlock.score;
  }

  /* IS THIS LEVEL SOMEBODY'S KEY?

     A shut room says nothing about itself, so the one clue in the game
     lives on the thing you have to beat rather than on the door: THE
     CONSTRUCTION ZONE's own card says SCORE 20 HERE / OPENS ? ? ?, and
     `? ? ?` is the same glyph as the plate to the right of the Backyard.
     That is the one connection the player is allowed to make, and it
     vanishes the frame the room opens.

     Returns the first room still shut whose gate names this level, as
     { score, have, room }, or null. */
  function keyFor(level) {
    if (!level) return null;
    var rm = roomOf(level);
    if (!rm) return null;
    for (var i = 0; i < ROOMS.length; i++) {
      var r = ROOMS[i], u = r.unlock;
      if (!u || u.room !== rm.id || u.level !== level.id) continue;
      if (roomOpen(r)) continue;
      return { score: u.score, have: reachedOn(rm, level), room: r };
    }
    return null;
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

  function playable() {
    var out = [];
    ROOMS.forEach(function (room, ri) {
      if (room.locked) return;
      room.levels.forEach(function (lv, li) {
        if (!lv.locked) out.push({ room: room, level: lv, roomIndex: ri, levelIndex: li });
      });
    });
    return out;
  }

  function shown() {
    return playable().filter(function (e) { return roomOpen(e.room); });
  }

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
    /* the BACKYARD, which is now the first room in the list rather than
       the middle one: the left-hand placeholder has gone */
    startRoom: 0,
    coop: COOP,
    garden: GARDEN,
    deck: DECK,
    canopy: CANOPY,
    construction: CONSTRUCTION,
    livingroom: LIVINGROOM,
    desk: DESK,
    couch: COUCH,
    mantle: MANTLE,
    whiteboard: WHITEBOARD,
    fort: FORT,
    reachedOn: reachedOn, noteScore: noteScore,
    roomOpen: roomOpen, gateMet: gateMet, roomById: roomById,
    levelsOf: levelsOf, keyFor: keyFor,
    isUnlocked: isUnlocked, requirement: requirement, refresh: refresh,
    buildArt: buildArt,
    /* Every level that is BUILT, in menu order - deliberately not filtered
       by whether it has been earned. Doodads.bestReached() seeds itself by
       walking this list, and gating it on isUnlocked would send it back
       through Doodads for the passkey and loop. Callers that want only the
       earned ones filter with Levels.isUnlocked themselves. */
    playable: playable,
    /* Every level the player is allowed to KNOW ABOUT: playable() minus
       the bays behind a shut door. The High Scores screen pages through
       this rather than through playable(), for two reasons - a table for a
       level nobody has heard of is a spoiler, and Scores.table() WRITES a
       table the first time it is read, so merely paging past THE DESK
       would materialise 'scores.livingroom.desk' in the save file and the
       secret would be sitting in localStorage. */
    shown: shown
  };
})();
