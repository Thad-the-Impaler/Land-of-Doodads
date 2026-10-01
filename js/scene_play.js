/* ------------------------------------------------------------------
   Land of Doodads - gameplay
   Flappy rules with room to manoeuvre: gravity plus a fixed impulse
   that only fires on a fresh key press, and left/right nudging inside
   the moving screen. The level never ends, it just gets meaner.
------------------------------------------------------------------ */
'use strict';

var PlayScene = (function () {

  /* The level's art module (js/coop.js, js/garden.js, ...) and the two
     numbers that define its playfield. Bound in enter(), because a second
     level can have a different ceiling and floor - these used to be read
     off the Coop once at load, which quietly made the Coop the only level
     this scene could ever run. FX is its neutral effect palette: PlayScene
     never reads a level's own pigment names. */
  var art = null, FX = null;
  var CEIL = 0, FLOOR = 0;

  /* Whether the ceiling ENDS THE RUN or merely stops the doodad. The
     Backyard's rafters are solid but survivable; every Living Room level
     publishes CEIL_KILLS and in there the lid is the floor upside down.
     Bound off the art in enter(), like CEIL and FLOOR, so the rule is a
     field on the level and never a check on its name - and so the five
     Backyard levels come out bit for bit the same, because !!undefined is
     false. `ceilHit` is set by updatePlayer and spent by collide(): a flag
     rather than a second test, so float error in CEIL + hr - hr can never
     lose a death the player has already seen happen. */
  var CEIL_KILLS = false;
  var ceilHit = false;

  var GRAVITY   = 1180;
  var FLAP      = -338;
  var MAX_FALL  = 545;
  var MOVE_SPD  = 116;
  var MOVE_ACC  = 880;
  var X_MIN     = 32, X_MAX = 304, X_START = 116;
  var BODY_R    = 13;          /* drawn body radius */
  var HIT_R     = 11;          /* forgiving hitbox  */

  /* one spicy egg buys this much heat: the coop runs faster and every
     plank is worth double. flying through an ordinary egg while it lasts
     cooks the egg instead of ending the run - without that the reward
     would just be a harder way to die. */
  /* The succulent: a rare pot on the ground that buys one mistake back.
     Its colours are the plant's, not the room's, so a life reads the same
     whichever level ever grows one. */
  var LIVES_MAX  = 2;
  var SAVE_GRACE = 1.7;        /* invulnerable seconds after a save         */
  var SAVE_AHEAD = 82, SAVE_BEHIND = 56;   /* px of world cleared around it  */
  var BOON_BONUS = 3;          /* points instead, when the pot is full       */
  var LIFE_LEAF  = '#5fae9a', LIFE_PALE = '#93d8bd', LIFE_TIP = '#e08a9a';

  /* Gerald's HUNGER. Power-ups inside his reach come to him; hazards do
     not, because a magnet that drags danger into you is a curse rather
     than a gift. The reach is per-doodad data (`pull`), not a check on
     his name, so the next ability can be another field rather than
     another branch. */
  var PULL_MIN = 34, PULL_MAX = 330;   /* px/sec at the rim, and up close */
  var PULL_EAT = 26;                   /* inside this he is mid-swallow   */

  var SPICY_TIME  = 6.5;
  var SPICY_SPEED = 1.55;
  var SPICY_MULT  = 2;

  /* The gold can: the only thing in the game that is worth points for being
     CAUGHT rather than flown past. Flat, like the succulent's consolation
     bonus - the heat doubles what you thread, not what you are handed. */
  var GOLD_BONUS = 5;

  /* The lime, on its own axis: size. No speed, no multiplier, no smashing
     through anything - the whole of the effect is a smaller doodad, which
     buys timing room instead of taking the danger away. Its colours live
     here for the same reason the succulent's do (LIFE_LEAF above): a lime
     reads the same on any level that ever grows one, and a level's neutral
     effect palette has no green in it at all.
     SOUR_SHRINK 0.62 takes the hitbox from 22px across to 14 and the drawn
     body from 13 to 8; in the tightest gap a level allows that roughly
     doubles the room to time a flap in. 0.55 to 0.70 is the useful range.
     Those figures are for a standard doodad; one with a `size` of its own
     starts below them and the lime takes the same fraction off whatever he
     is - see shrink(). */
  var SOUR_TIME   = 7.0;
  var SOUR_SHRINK = 0.62;
  var SOUR_HI = '#d6ff7a', SOUR_MID = '#8fd44a', SOUR_DARK = '#3f7a2a';
  /* the same two greens again, as gradient stops want them. FX carries its
     glow colours in this form for the same reason: a radial gradient needs
     the components, a fillRect needs the hex, and neither converts cheaply
     in a draw loop. */
  var SOUR_GLOW = '214,255,122', SOUR_GLOW_EDGE = '143,212,74';

  var state = 'ready';         /* ready | play | dying | dead | entry | paused */
  var t = 0, runTime = 0;
  var scroll = 0, speed = 0;
  var obstacles = [], particles = [], dust = [];
  var spawnCursor = 0, lastGapY = 0;
  var score = 0;
  var board = [];              /* the high score table as it stood when the run began */
  var rank = -1;               /* where this run lands on the table, -1 if it misses */
  var entryPending = false;    /* a qualifying run waiting for its initials */
  var initials = ['A', 'A', 'A'], cursor = 0;
  var savedRow = -1;           /* row just written to the table, for highlighting */
  var pbNew = false;           /* beat this doodad's own best on this level */
  var target = null, passedName = '', passedTimer = 0;
  var flash = 0, deadTimer = 0, scorePop = 0;
  var menuIndex = 0;
  var dropArmed = false;        /* the rafters have started shedding */
  var warnLines = null;        /* whose heads-up is on screen, from art.WARN */
  var dropTimer = 0, hazardWarn = 0, spicyGap = 0, goldGap = 0, sourGap = 0;
  var spicy = 0;               /* seconds of heat left */
  var heat = 0;                /* the same thing eased, for the visuals */
  var spicyFlash = 0, spicyBanner = 0;
  var sour = 0;                /* seconds of lime left */
  var shrivel = 0;             /* the same thing eased - and the ONE number
                                  both the hitbox and the drawn body read */
  var sourFlash = 0, sourBanner = 0;
  /* Which row each gauge is standing in, 80 or 92. There are two rows
     because the Whiteboard is the first bay that sheds both drops, and
     the row is a FIXED PROPERTY of a running power-up rather than
     something recomputed off the other one every frame - see grabSpicy. */
  var spicySlot = 80, sourSlot = 80;
  var streaks = [];            /* speed lines, only drawn while hot */
  var unlocked = [];           /* doodads this run has earned */
  var unlockBanner = 0;
  var wonLevels = [];          /* levels this run has opened up */
  var lives = 0;               /* spare lives in hand */
  var invuln = 0;              /* grace after a save, in seconds */
  var saveFlash = 0, saveBanner = 0;
  var lifePop = 0, boonBanner = 0, boonGap = 0, boonBonus = false;
  /* What the level calls its spare life, and what it comes apart into. Three
     of the five are not succulents at all - a pomegranate off a branch, a
     heart of scrap on a pallet - and announcing those as SUCCULENT names a
     plant from a different level. The Garden's own defaults sit here. */
  var boonName = 'SUCCULENT';
  var spikeArmed = false;
  /* The third armed slot, beside spikeArmed and dropArmed: a level may name
     a score at which it starts doing something WORSE than it has been doing
     (tune.lateScore), and `late` is how the makers find out. No maker may
     make a hazard more lethal than the ones before it without a warning;
     run.late is the licence, and art.WARN.late is the warning. A level
     without the key never sees either. */
  var late = false;
  /* How far along the run is, rebuilt once a frame and handed to every
     maker as its trailing argument. It is the ONLY way an art module learns
     this: a module may cache `scroll` in drawBackdrop to phase an animation,
     the way the Deck keys its misters off the world, but never to decide how
     hard to be. The five Backyard makers declare fewer parameters and ignore
     it entirely.

     `scroll` is in here for a reason worth writing down. A module that
     caches the scroll in drawBackdrop has cached it during RENDER, which is
     a frame behind anything that reads it from update - and the makers run
     in update. The Mantle shipped that mistake and it was not cosmetic:
     collision tested a laser against the previous frame's phase, so for
     1.1% of tested frames the beam you could be killed by and the beam
     drawn on the screen were on opposite sides of the lethal window. A
     maker that needs to know where the world is reads it HERE, from the
     live value, in the same pass that spawned it. */
  var run = { score: 0, time: 0, late: false, scroll: 0 };
  /* ob.stun: a hazard that punishes without killing.
     ringing  seconds of buzz left, topped up the way the heat is
     stunTime  what the current ringing started at, so the pulses decay
     ringAmp   how hard, in pixels, capped at 12 by stun()
     buzzTimer countdown to the next pulse - see the BUZZ note in update() */
  var ringing = 0, stunTime = 0, ringAmp = 0, buzzTimer = 0;
  var stunBanner = 0, stunSay = '', stunSub = '', stunFlash = 0;
  var BUZZ = 0.36;
  /* the last time a drop came off the floor, so a carpet of popcorn all
     landing in the same frame is one tick and not fifteen */
  var bopAt = -1;
  var hungry = 0;              /* things his hunger has hold of this frame */
  var nearestPull = 0;         /* how close the closest of them is, 0..1   */
  var planksUp = 0;            /* planks spawned, for the one he hides on  */
  var flickCool = 0;           /* seconds until the tail is back under him */
  /* What the mid-flight banner is currently shouting about, and what is
     waiting behind it. A score can open a level AND a doodad on the very
     same plank - THE GARDEN and BILLY both sit at 25 - and reading the
     accumulated lists meant the level won and the doodad was never
     announced at all, even runs later. Each unlock takes its turn. */
  var BANNER_TIME = 3.2;
  var bannerQueue = [];
  var pottedLives = 0;         /* how many lives in hand came from a pot   */
  var spentPotted = false;     /* and whether the one just spent was one   */
  var nervePop = 0;            /* the shout for a plank taken close        */
  var nerveX = 0, nerveY = 0, nerveGain = 1;
  var goldPop = 0;             /* and the one for a gold can caught        */
  var goldX = 0, goldY = 0;
  /* and what the level calls it. A can, a gear, a quarter and a marshmallow
     are all the same +5, and shouting GOLD over a coin somebody just caught
     names a metal nobody saw. The art says so with ob.name; the Backyard's
     three levels say nothing and get the word they always had. */
  var goldName = 'GOLD';
  var watchY0 = 0, watchY1 = 0, watchA = 0;   /* the gap she can see coming */
  var trotting = 0;            /* seconds of floor under a doodad that can */
  var tune, level, roomRef, doodad;
  var readyPulse = 0;
  var prePause = 'play';

  var MENU = [
    { label: 'RETRY', act: function () { start(); } },
    { label: 'DOODADS', act: function () { Game.go(CharSelectScene, {}); } },
    { label: 'LEVELS', act: function () { Game.go(LevelSelectScene, { focus: 'level' }); } },
    { label: 'TITLE', act: function () { Game.go(TitleScene, {}); } }
  ];

  var player = { x: X_START, y: 0, vy: 0, vx: 0, angle: 0, flapTimer: 0, spin: 0 };

  /* The rectangles the panels drew, refilled inside drawFg and handed to
     Input by Game.render. A RUN itself never publishes any: a tap anywhere is
     a flap, and the two movement pads and the pause button belong to Input's
     own table. These are the boards on the panels that interrupt a run - the
     pause panel, the results rows, the initials board - which is exactly
     where a tap used to fire whatever the invisible cursor was sitting on. */
  var hot = [];

  /* ----------------------------------------------------------- init */

  function enter() {
    roomRef = Game.room();
    level = Game.level();
    art = level.art;
    FX = art.FX;
    CEIL = art.CEIL;
    FLOOR = art.FLOOR;
    CEIL_KILLS = !!art.CEIL_KILLS;
    tune = level.tune;
    doodad = Game.doodad();
    prePause = 'play';
    start();
  }

  /* never leave the keyboard stuck in typing mode */
  function exit() { Input.setTextMode(false); }

  function start() {
    state = 'ready';
    Input.setTouchMode('play');
    t = 0; runTime = 0;
    scroll = 0;
    speed = tune.speedStart;
    obstacles.length = 0; particles.length = 0;
    score = 0; flash = 0; deadTimer = 0; scorePop = 0;
    board = Scores.table(roomRef, level).slice();
    rank = -1; entryPending = false; savedRow = -1; pbNew = false;
    dropArmed = false; dropTimer = 0; hazardWarn = 0; warnLines = null;
    spicyGap = 0; goldGap = 0; sourGap = 0;
    spicy = 0; heat = 0; spicyFlash = 0; spicyBanner = 0;
    sour = 0; shrivel = 0; sourFlash = 0; sourBanner = 0;
    spicySlot = 80; sourSlot = 80;
    unlocked.length = 0; unlockBanner = 0; wonLevels.length = 0;
    /* Lives never carry between runs: start() is what RETRY calls, so a
       lucky run would otherwise hand every retry after it a free save.
       A doodad that brings its own spare starts with it every time -
       that is the ability, not a carry-over. */
    lives = doodad.lives || 0; invuln = 0; saveFlash = 0; saveBanner = 0;
    pottedLives = 0; spentPotted = false;
    planksUp = 0; flickCool = 0;
    bannerQueue.length = 0;
    lifePop = 0; boonBanner = 0; boonGap = 0; boonBonus = false; spikeArmed = false;
    boonName = 'SUCCULENT';
    goldName = 'GOLD';
    ceilHit = false;
    late = false;
    run = { score: 0, time: 0, late: false, scroll: 0 };
    ringing = 0; stunTime = 0; ringAmp = 0; buzzTimer = 0;
    stunBanner = 0; stunSay = ''; stunSub = ''; stunFlash = 0;
    bopAt = -1;
    hungry = 0; nearestPull = 0;
    nervePop = 0; goldPop = 0; trotting = 0;
    watchY0 = watchY1 = watchA = 0;
    target = nextTarget(); passedTimer = 0;
    Input.setTextMode(false);
    menuIndex = 0;
    readyPulse = 0;
    spawnCursor = VW + 90;
    lastGapY = (CEIL + FLOOR) / 2 - tune.gapStart / 2;

    player.x = X_START;
    player.y = (CEIL + FLOOR) / 2;
    player.vy = 0; player.vx = 0; player.angle = 0; player.flapTimer = 0; player.spin = 0;

    dust.length = 0;
    for (var i = 0; i < 26; i++) {
      dust.push({ x: rand(0, VW), y: rand(CEIL, FLOOR), vy: rand(-6, 2), phase: rand(0, TAU),
                  bright: chance(0.25) });
    }

    streaks.length = 0;
    for (var k = 0; k < 14; k++) streaks.push(freshStreak(rand(0, VW)));
  }

  function freshStreak(x) {
    return { x: x, y: rand(CEIL + 4, FLOOR - 4), len: randInt(7, 26),
             spd: rand(1.4, 2.6), bright: chance(0.3) };
  }

  /* Spikes - nails in the Coop, mint in the Garden. A level that leaves
     spikeScore out has them from the first pillar, the way the Coop always
     has; one that sets it gets its own heads-up when they arrive. */
  function spikesReady() {
    if (tune.spikeScore === undefined) return true;
    if (score < tune.spikeScore) return false;
    if (!spikeArmed) {
      spikeArmed = true;
      var w = art.WARN && art.WARN.spike;
      if (w && hazardWarn <= 0) { warnLines = w; hazardWarn = 2.4; Audio3.play('warn'); }
    }
    return true;
  }

  /* ---------------------------------------------------- generation */

  function difficulty() {
    var e = runTime;
    return {
      speed: Math.min(tune.speedMax, tune.speedStart + tune.speedRamp * e),
      gap: Math.max(tune.gapMin, tune.gapStart - tune.gapRamp * e),
      spacing: Math.max(tune.spacingMin, tune.spacingStart - tune.spacingRamp * e),
      spikes: Math.min(tune.spikeChanceMax, tune.spikeChance + e * 0.006),
      dropEvery: tune.dropEvery === undefined ? 0
              : Math.max(tune.dropEveryMin, tune.dropEvery - tune.dropEveryRamp * e)
    };
  }

  /* ---------------------------------------------------------- the eggs

     Past a set score the rafters start shedding eggs. One tips off up
     ahead, falls the whole height of the coop and bursts in the hay, so
     it sweeps down through the flight path rather than sitting in it.
     They are spawned inside the right hand edge, not off screen, so the
     player actually sees one come loose - the straw puff and the spot
     it casts on the bedding are the warning.
     Roughly one in fourteen is a spicy egg, which is the opposite of
     a hazard.                                                         */

  function spawnDrops(dt, d) {
    if (tune.dropScore === undefined) return;

    if (!dropArmed) {
      if (score < tune.dropScore) return;
      dropArmed = true;
      warnLines = art.WARN && art.WARN.drop;
      hazardWarn = warnLines ? 2.4 : 0;
      dropTimer = 1.2;
      Audio3.play('warn');
      return;
    }

    dropTimer -= dt;
    if (dropTimer > 0) return;
    dropTimer = d.dropEvery * rand(0.78, 1.28);

    /* never two spicy eggs close together, however the dice fall */
    if (spicyGap > 0) spicyGap--;
    var spicy = spicyGap <= 0 && chance(tune.spicyChance);
    if (spicy) spicyGap = 4;

    /* The gold can and the lime ride the same spawner, and are spaced the
       same hardcoded way. A drop is exactly ONE of plain, spicy, gold or
       sour: the heat wins the roll because it is the one every level that
       sheds anything already has, so adding a can can never cost a level
       the power-up it was tuned around. */
    if (goldGap > 0) goldGap--;
    var gold = !spicy && goldGap <= 0 && chance(tune.goldChance || 0);
    if (gold) goldGap = 4;
    if (sourGap > 0) sourGap--;
    var lime = !spicy && !gold && sourGap <= 0 && chance(tune.sourChance || 0);
    if (lime) sourGap = 4;

    var x = VW - rand(tune.dropAheadMin, tune.dropAheadMax);
    var fall = rand(tune.dropFallMin, tune.dropFallMax);
    /* anything that is there to be CAUGHT drifts down slower, so it has a
       chance of being taken rather than merely dodged */
    var ob = art.makeDrop(x, spicy, (spicy || gold || lime) ? fall * 0.78 : fall, run);
    /* Set after the maker returns, the way a plank's `meet` is: makeDrop
       keeps the signature it has, and a level that grows neither of these
       never learns they exist. `spicy` still goes IN because the art sizes
       the drop by it; these two only change how it is painted. */
    if (gold) ob.gold = true;
    /* An art module may roll its own gold - the three newest levels do,
       because the sprite has to know it is drawing a gear and not a beam.
       The engine must not then also make it sour: collide() takes gold
       first, so the lime would be swallowed with no banner, no gauge and
       no shrink, and the player would be owed an effect they never got. */
    if (lime && !ob.gold) ob.sour = true;
    admit(ob);

    for (var i = 0; i < 4; i++) {
      particles.push({ x: x + rand(-4, 4), y: CEIL + rand(0, 3),
                       vx: rand(-20, 20) - speed * 0.3, vy: rand(-4, 18),
                       life: rand(0.2, 0.45), g: 90,
                       col: chance(0.5) ? FX.puffHi : FX.puff });
    }
    Audio3.play(spicy ? 'sizzle' : 'crack');
  }

  /* an egg that made it all the way down */
  function landDrop(ob) {
    ob.broken = art.SPLAT_TIME;
    ob.y = FLOOR;
    splatter(ob.x, FLOOR - 1, ob.spicy, 9);
    Audio3.play(ob.spicy ? 'fizzle' : 'splat');
  }

  /* an ordinary egg flown straight through while the run is hot */
  function smashDrop(ob) {
    splatter(ob.x, ob.y, true, 14);
    Screen.shake(1.6, 0.14);
    Audio3.play('splat');
  }

  /* `spiced` rather than `hot`: `hot` is this scene's target list */
  function splatter(x, y, spiced, n) {
    for (var i = 0; i < n; i++) {
      particles.push({ x: x + rand(-3, 3), y: y + rand(-3, 3),
                       vx: rand(-64, 64) - speed * 0.12, vy: rand(-120, -20),
                       life: rand(0.3, 0.8), g: 380,
                       col: spiced ? (chance(0.5) ? FX.hotMid : FX.hot)
                                   : (chance(0.45) ? FX.splatHi : FX.splat) });
    }
  }

  /* ---------------------------------------------------------- hunger */

  /* Where a boon is anchored before anything has moved it. The art module
     says so by putting `y` on what makeBoon returns - a pomegranate hangs
     off the ceiling - and a level that says nothing grows it out of the
     floor at the height the Garden's pot puts its rosette. */
  function boonY(ob) { return ob.y === undefined ? FLOOR - 12 : ob.y; }

  /* the point a power-up is grabbed by - for the succulent that is the
     plant, which is offset from the pot it was growing in */
  function grabX(ob) { return ob.type === 'boon' ? ob.x + ob.dx : ob.x; }
  function grabY(ob) { return ob.type === 'boon' ? boonY(ob) + ob.dy : ob.y; }

  function nudge(ob, mx, my) {
    if (ob.type === 'boon') { ob.dx += mx; ob.dy += my; }
    else { ob.x += mx; ob.y += my; }
  }

  /* how far Gerald's reach actually extends, for the ring he draws */
  function pullReach() { return doodad && doodad.pull ? doodad.pull : 0; }

  /* The one place the game says which falling things are gifts. Gerald's
     hunger and Saddam's tail read it in opposite directions, so a new kind
     of catchable drop goes in here once and both abilities learn about it
     together: he pulls it in, and the tail leaves it alone. */
  function isPowerUp(ob) {
    if (ob.type === 'boon') return !ob.taken;
    return ob.type === 'drop' && (ob.spicy || ob.gold || ob.sour) && !ob.broken;
  }

  function updateHunger(dt) {
    hungry = 0; nearestPull = 0;
    var R = doodad.pull;
    if (!R) return;
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (!isPowerUp(ob)) continue;
      var dx = player.x - grabX(ob), dy = player.y - grabY(ob);
      var d = Math.sqrt(dx * dx + dy * dy);
      if (d > R || d < 0.0001) continue;
      hungry++;
      var k = 1 - d / R;
      if (k > nearestPull) nearestPull = k;
      /* it comes faster the closer it gets, so the last stretch snaps */
      var sp = (PULL_MIN + k * k * (PULL_MAX - PULL_MIN)) * dt;
      if (sp > d) sp = d;
      nudge(ob, (dx / d) * sp, (dy / d) * sp);
      /* a falling tomato must stop falling once he has hold of it, or
         gravity and the hunger spend the whole time arguing */
      if (ob.type === 'drop') ob.vy *= 0.72;
      /* the thread of motes between him and it */
      if (chance(dt * 26)) {
        var f = rand(0.15, 0.85);
        particles.push({ x: grabX(ob) + dx * f, y: grabY(ob) + dy * f,
                         vx: (dx / d) * 40, vy: (dy / d) * 40,
                         life: rand(0.12, 0.3), g: 0,
                         col: chance(0.5) ? doodad.accentLight : '#f3cc84' });
      }
    }
  }

  /* ------------------------------------------------------------- nerve

     How close the doodad came to an edge of the gap, measured every frame
     it is inside a plank's width. The smallest clearance of the whole pass
     is what counts, so one brave frame is enough - and it is kept on the
     plank rather than in a variable of its own, because the spacing
     tightens far enough that two planks can straddle the doodad at once.

     A pass that gets INSIDE the plank is not a skim, it is a pass-through.
     It is reachable: hurt() returns false for the grace after a save, so
     collide() waves the doodad straight through a plank, and the next one
     arrives well inside those 1.7 seconds because save() only clears the
     world out to SAVE_AHEAD. Treating that as a clearance of zero would
     score it as the tightest thread possible - the exact opposite of what
     the ability is paid for - so one overlapping frame disqualifies the
     plank for the whole pass. */

  var NO_NERVE = -1;

  function updateNerve() {
    if (!doodad.nerve) return;
    /* the clearance is what the real hitbox missed by, so it has to be the
       real hitbox: a shrivelled doodad genuinely does thread closer */
    var hr = hitR();
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'pillar' || ob.scored) continue;
      if (player.x + hr < ob.x || player.x - hr > ob.x + ob.w) continue;
      var over  = (player.y - hr) - ob.gapY;
      var under = (ob.gapY + ob.gapH) - (player.y + hr);
      if (ob.skim === NO_NERVE) continue;          /* already disqualified */
      var c = Math.min(over, under);
      if (c < 0) { ob.skim = NO_NERVE; continue; }
      if (ob.skim === undefined || c < ob.skim) { ob.skim = c; ob.skimTop = over < under; }
    }
  }

  /* the sparks off the plank she just shaved, on the side she shaved it */
  function takeNerve(ob, gain) {
    nerveGain = gain;
    nervePop = 0.5;
    nerveX = clamp(player.x, 30, VW - 30);
    nerveY = Math.max(CEIL + 6, player.y - 20);
    Audio3.play('nerve');
    var edge = ob.skimTop ? ob.gapY : ob.gapY + ob.gapH;
    for (var i = 0; i < 12; i++) {
      particles.push({ x: player.x + rand(-6, 10), y: edge + rand(-1, 1),
                       vx: rand(-40, 30) - speed * 0.2, vy: rand(-40, 40),
                       life: rand(0.18, 0.5), g: 60,
                       col: chance(0.5) ? doodad.accentLight : '#fff3d0' });
    }
  }

  /* ------------------------------------------------------------- the meet

     One doodad is not bought at all. He is behind a plank, with just enough
     of himself showing to be noticed, and the only way in is to fly close
     enough to touch him - which means hugging the bottom edge of a gap that
     would kill you nine pixels lower. The reward for looking, and for
     nerve. */

  var MEET_R = 9;              /* his touchable bulge, above the cap    */
  var MEET_RISE = 14;          /* how much of him clears the cap - over
                                  half, so his eyes are on the near side
                                  of the cut and he reads as something
                                  looking back rather than a lump        */
  var MEET_BODY = 13;          /* drawn at a STANDARD flying doodad's size,
                                  deliberately not scaled by the hider's own
                                  `size`: MEET_R and MEET_RISE are tuned
                                  around a 13px body, and nobody small hides
                                  today. If one ever does, retune the three
                                  numbers together rather than scaling this
                                  one.                                   */

  /* where he is peeking from: the middle of the plank, just over the top
     of its lower half */
  function meetX(ob) { return ob.x + ob.w / 2; }
  function meetY(ob) { return ob.gapY + ob.gapH; }
  /* the middle of the part of him that is actually showing */
  function meetCy(ob) { return meetY(ob) - MEET_RISE / 2; }

  function updateMeet() {
    /* his bulge is his own size; a shrivelled doodad has to get closer to
       touch him, which is the same bargain the planks strike */
    var reach = MEET_R + hitR();
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'pillar' || !ob.meet || ob.met) continue;
      var dx = player.x - meetX(ob), dy = player.y - meetCy(ob);
      if (dx * dx + dy * dy > reach * reach) continue;
      takeMeet(ob);
      return;
    }
  }

  function takeMeet(ob) {
    var who = Doodads.noteMeet(ob.meet);
    ob.met = true;
    if (!who) return;                       /* already known; just the flinch */
    unlocked.push(who);
    announce('doodad', who);
    Audio3.play('unlock');
    Screen.shake(3, 0.35);
    for (var k = 0; k < 30; k++) {
      var a = rand(0, TAU), sp = rand(40, 170);
      particles.push({ x: meetX(ob), y: meetCy(ob),
                       vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
                       life: rand(0.5, 1.2), g: -50,
                       col: chance(0.45) ? UI.C.gold : (chance(0.5) ? who.accentLight : who.accent) });
    }
  }

  /* Drawn on the smooth layer with the sprites, but clipped to the air
     ABOVE the plank's lower cap - which is what makes him read as standing
     behind the stake rather than floating in front of it. The plank itself
     is painted on the room layer underneath and simply shows through. */
  function drawMeet(ctx) {
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'pillar' || !ob.meet || ob.met) continue;
      var cut = meetY(ob);
      if (cut <= CEIL || ob.x > VW + 40 || ob.x + ob.w < -40) continue;
      /* Always the neutral frame. A flap frame was flipped in here to make
         him twitch, but his two frames are pixel-identical above the cut
         except for the very tip of his tail, whose join to his body is
         below it - so the only thing that moved was a 3x3 scrap of red
         floating clear of him, which reads as a glitch rather than as
         something alive. He holds still, which is what a hider does. */
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, CEIL, VW, cut - CEIL);
      ctx.clip();
      Doodads.draw(ctx, ob.meet.id, meetX(ob), cut + MEET_BODY - MEET_RISE,
                   MEET_BODY, 0, false);
      ctx.restore();
    }
  }

  /* ---------------------------------------------------------- watchful

     What she can see that nobody else can: the gap of the plank still off
     the right of the screen, and the column anything falling is coming
     down. Both are drawn as thin lines on the room layer, under the
     doodad, so they read as sight rather than as scenery. */

  var WATCH_LINE = '#cfe9dd', WATCH_HI = '#f2fff8';

  /* the nearest plank that has not reached the screen yet */
  function nextOffscreen() {
    var best = null;
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'pillar' || ob.x <= VW - 2) continue;
      if (!best || ob.x < best.x) best = ob;
    }
    return best;
  }

  /* The marker brightens as the plank closes on the edge, and eases out
     rather than blinking off in the stretch where the furthest plank is
     already on screen and there is nothing left to foresee. */
  function updateWatch(dt) {
    if (!doodad.watch) return;
    var p = nextOffscreen(), want = 0;
    if (p) {
      watchY0 = p.gapY;
      watchY1 = p.gapY + p.gapH;
      want = 0.35 + 0.55 * clamp(1 - (p.x - VW) / 120, 0, 1);
    }
    watchA = damp(watchA, want, 0.0009, dt);
  }

  /* The drops worth a line: the ones still ahead of her, nearest first,
     and never more than a handful. A guide on something already behind
     her is no use, and a level in the middle of a downpour would
     otherwise curtain off the room it is meant to be showing. */
  var WATCH_MAX = 4;

  function watchList() {
    var out = [];
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'drop' || ob.broken > 0) continue;
      /* Pepper's line marks where the sky WILL land. A drop that has already
         touched the floor and is still live - a kernel rolling about in the
         bottom of the room - has landed, so there is nothing left to
         foresee, and a line drawn to it is a line drawn to the floor. The
         art sets ob.landed; the engine only reads it. */
      if (ob.landed) continue;
      if (ob.x < player.x - 24) continue;
      out.push(ob);
    }
    out.sort(function (a, b) { return a.x - b.x; });
    return out.length > WATCH_MAX ? out.slice(0, WATCH_MAX) : out;
  }

  function drawWatch(ctx) {
    var ga = ctx.globalAlpha, i, y;

    /* where the sky is going to land */
    var coming = watchList();
    for (i = 0; i < coming.length; i++) {
      var ob = coming[i];
      var x = Math.round(ob.x);
      ctx.globalAlpha = ga * 0.4;
      ctx.fillStyle = WATCH_LINE;
      /* stepped up from the ground, not down from the drop: anchoring the
         dots to something that moves re-phases them every frame and the
         whole line crawls, which is the same trap as dithering anything
         that moves */
      var stop = Math.round(ob.y) + 7;
      for (y = FLOOR - 4; y > stop; y -= 4) ctx.fillRect(x, y, 1, 2);
      ctx.globalAlpha = ga * 0.75;
      /* the foot of the line says what is coming down it, so she can tell a
         thing to catch from a thing to dodge before it is close enough to
         make out */
      ctx.fillStyle = ob.spicy ? FX.hotHi
                    : (ob.gold ? UI.C.gold : (ob.sour ? SOUR_HI : WATCH_HI));
      ctx.fillRect(x - 3, FLOOR - 2, 7, 1);
      ctx.fillRect(x - 3, FLOOR - 4, 1, 2);
      ctx.fillRect(x + 3, FLOOR - 4, 1, 2);
    }

    /* and the gap after this one, held against the right edge */
    if (watchA > 0.03 && watchY1 > watchY0) {
      var ex = VW - 4;
      var top = Math.round(watchY0), bot = Math.round(watchY1);
      ctx.globalAlpha = ga * watchA;
      ctx.fillStyle = WATCH_LINE;
      for (y = top + 3; y < bot - 3; y += 4) ctx.fillRect(ex, y, 1, 2);
      ctx.fillStyle = WATCH_HI;
      ctx.fillRect(ex - 3, top, 5, 1);
      ctx.fillRect(ex - 3, bot - 1, 5, 1);
      ctx.fillRect(ex - 3, top, 1, 3);
      ctx.fillRect(ex - 3, bot - 3, 1, 3);
    }
    ctx.globalAlpha = ga;
  }

  /* ----------------------------------------------------------- the flick

     Gerald's hunger drags power-ups in; the crawfish's tail knocks hazards
     out. Same shape, opposite sign, and deliberately blind to power-ups:
     batting the hot pepper away would be a curse dressed as a gift. The two
     abilities share isPowerUp() and read it in opposite directions, which
     is the whole of the symmetry. */

  function updateFlick() {
    var f = doodad.flick;
    if (!f || flickCool > 0) return;
    var R = f.reach;
    for (var i = obstacles.length - 1; i >= 0; i--) {
      var ob = obstacles[i];
      if (ob.type !== 'drop' || ob.broken || isPowerUp(ob)) continue;
      var dx = player.x - ob.x, dy = player.y - ob.y;
      if (dx * dx + dy * dy > R * R) continue;
      lash(ob);
      smashDrop(ob);
      obstacles.splice(i, 1);
      /* one flick takes one thing, and then the tail has to come back:
         two arriving together is exactly the moment he should not get
         both, so stop looking rather than clearing the sky */
      flickCool = f.cool;
      return;
    }
  }

  /* the tail back under him. Quiet, but it has to be visible somewhere or
     the first drop that sails through reads as the ability being broken
     rather than spent. */
  function flickReady() {
    Audio3.play('ready');
    for (var i = 0; i < 5; i++) {
      particles.push({ x: player.x - 9 + rand(-2, 2), y: player.y + rand(-4, 6),
                       vx: rand(-40, -8), vy: rand(-26, 10),
                       life: rand(0.16, 0.36), g: 30,
                       col: chance(0.5) ? doodad.accentLight : '#fff3d0' });
    }
  }

  /* the flick of the tail, thrown at what it just knocked down */
  function lash(ob) {
    var a = Math.atan2(ob.y - player.y, ob.x - player.x);
    for (var i = 0; i < 9; i++) {
      var sp = rand(50, 150);
      particles.push({ x: player.x + Math.cos(a) * 8, y: player.y + Math.sin(a) * 8,
                       vx: Math.cos(a + rand(-0.4, 0.4)) * sp,
                       vy: Math.sin(a + rand(-0.4, 0.4)) * sp,
                       life: rand(0.12, 0.3), g: 40,
                       col: chance(0.5) ? doodad.accentLight : '#fff3d0' });
    }
  }

  /* ----------------------------------------------------- the succulent */

  function takeBoon(ob) {
    ob.taken = true;
    boonName = ob.name || 'SUCCULENT';
    boonBanner = 1.4;
    lifePop = 0.45;
    if (lives >= LIVES_MAX) {
      /* The pot is full. Flying through a glowing pickup and having nothing
         happen reads as a bug, and the player had no way to know they were
         at the cap in the instant they committed to the dive. */
      boonBonus = true;
      score += BOON_BONUS;
      scorePop = 0.36;
      checkUnlocks();
    } else {
      boonBonus = false;
      lives++;
      pottedLives++;
    }
    Audio3.play('life');
    /* at the plant, not at the thing it grew out of: once Gerald has lifted
       a rosette clear of its pot the burst belongs where he took it, and a
       fruit hanging off the ceiling is nowhere near the floor at all */
    for (var i = 0; i < 26; i++) {
      var a = rand(0, TAU), sp = rand(30, 140);
      particles.push({ x: grabX(ob), y: grabY(ob), vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 50,
                       life: rand(0.4, 1.0), g: -60,
                       col: ob.burst ? ob.burst[randInt(0, ob.burst.length - 1)]
                          : (chance(0.4) ? LIFE_PALE : (chance(0.5) ? LIFE_LEAF : LIFE_TIP)) });
    }
    checkBoonUnlocks();
  }

  /* Some doodads are bought with succulents rather than with a score, so
     taking one is its own unlock moment. It is banked even when the pot
     was already full and the plant paid out points instead: the player
     still went and got it, and a cap they could not see is no reason to
     lose the credit. The extra-life shout stands down when this lands -
     the two captions share the middle of the screen, and a doodad coming
     out of its stall is the bigger news. */
  function checkBoonUnlocks() {
    var won = Doodads.noteBoon();
    if (!won.length || Doodads.masterKey()) return;
    for (var i = 0; i < won.length; i++) { unlocked.push(won[i]); announce('doodad', won[i]); }
    boonBanner = 0;
    Audio3.play('unlock');
    Screen.shake(2.5, 0.3);
    for (var k = 0; k < 30; k++) {
      var a = rand(0, TAU), sp = rand(40, 170);
      particles.push({ x: player.x, y: player.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
                       life: rand(0.5, 1.2), g: -50,
                       col: chance(0.45) ? UI.C.gold : (chance(0.5) ? won[0].accentLight : '#fff3d0') });
    }
  }

  /* ---------------------------------------------------------- the gold

     Five planks in one can, and nothing else changes - no heat, no size, no
     spare life. It is the reward for going and getting something, which is
     why the shout lands where it was caught rather than in the middle of
     the screen: that slot already belongs to SPICY!, SAVED!, EXTRA LIFE,
     the unlock queue and the hazard warning, and a can can be taken in the
     middle of any of them. */
  function takeGold(ob) {
    score += GOLD_BONUS;
    scorePop = 0.42;
    goldPop = 0.6;
    /* THE CLAMP IS THE CAPTION'S OWN HALF WIDTH, not a flat 30. It was
       30, which is the right number for a six letter name and wrong for
       anything longer: the Couch had to shorten MARSHMALLOW to MALLOW
       for it, and the Mantle's CAPYBARA hit it next - 'CAPYBARA +5'
       measures 65, so a capybara caught at the left edge drew its C
       from x -2.5 and lost half the glyph. Measuring the string is the
       fix that holds for every level after this one as well: a bay may
       call its bonus whatever the thing in the photograph actually is
       and the shout stays on screen. The +2 is the drop shadow, and the
       lower bound keeps a caption wider than the screen centred rather
       than inverting the clamp. */
    var goldHalf = Math.min(VW / 2,
                            Math.ceil(Font.measure((ob.name || 'GOLD') + ' +' + GOLD_BONUS, 1) / 2) + 2);
    goldX = clamp(ob.x, goldHalf, VW - goldHalf);
    goldY = Math.max(CEIL + 6, ob.y - 14);
    goldName = ob.name || 'GOLD';
    Audio3.play('scoreHot');
    for (var i = 0; i < 20; i++) {
      var a = rand(0, TAU), sp = rand(30, 150);
      particles.push({ x: ob.x, y: ob.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
                       life: rand(0.35, 0.95), g: -50,
                       col: chance(0.45) ? UI.C.gold
                          : (chance(0.5) ? '#fff3d0' : UI.C.goldDark) });
    }
    /* +5 steps clean over things. Both of these ask what the jump CROSSED
       rather than what it landed on, so a can is allowed to open a level and
       overtake a name on the table in the same instant. */
    checkPassed();
    checkUnlocks();
  }

  /* A hit that might not be fatal. Returns true when collide() should stop
     looking - either the run ended, or the world just changed underneath it
     and the rects it is still holding are stale. */
  function hurt(cause) {
    if (invuln > 0) return false;
    if (lives > 0) { save(cause); return true; }
    die(cause);
    return true;
  }

  /* One mistake bought back. The doodad is deliberately NOT moved out of
     trouble - putting it somewhere else can always put it somewhere worse.
     The trouble is taken out of the world instead. The run never leaves the
     'play' state, so pause, the results screen and the score submission all
     need to know nothing about any of this. */
  function save(cause) {
    lives--;
    /* Spend the ones out of a pot first, and remember which kind went, so
       the caption can say so. A doodad that brings its own spare can be
       holding one of each at once, and "ONE SUCCULENT SPENT" over a life
       she walked in with is a small lie the screen does not need to tell. */
    spentPotted = pottedLives > 0;
    if (spentPotted) pottedLives--;
    invuln = SAVE_GRACE;
    saveFlash = 0.13;
    saveBanner = 1.5;
    lifePop = 0.45;
    Audio3.play('save');
    Screen.shake(5, 0.4);

    for (var i = obstacles.length - 1; i >= 0; i--) {
      var ob = obstacles[i];
      if (ob.type === 'litter' || ob.type === 'boon') continue;
      if (ob.type === 'drop' && ob.broken > 0) continue;
      if (ob.x + (ob.w || 40) < player.x - SAVE_BEHIND) continue;
      if (ob.x > player.x + SAVE_AHEAD) continue;
      if (ob.type === 'drop') splatter(ob.x, ob.y, !!ob.spicy, 8);
      else clearBurst(ob.x + (ob.w || 20) / 2);
      obstacles.splice(i, 1);
    }

    /* A save on the floor has to get off it, or it lands again next frame.
       The full-size radius on purpose: this is a lift clear of trouble and
       not a collision test, so a shrivelled doodad has no reason to be
       given the smaller, meaner one. */
    if (cause === 'ground') {
      player.y = Math.min(player.y, FLOOR - HIT_R - 14);
      player.vy = -250;
    }
    /* And a save on the ceiling has to get off THAT, for the same reason.
       50 is one flap (48) plus two: the thumb that just put the doodad into
       the moulding is already flapping again, and flap() SETS vy rather than
       adding to it, so a downward shove would be erased by that reflex
       before it moved anything. Dropped by a flap's worth it cannot be. The
       column underneath has just been cleared by SAVE_BEHIND/SAVE_AHEAD, so
       there is nothing down there to be dropped onto. Full-size HIT_R for
       the reason the ground branch gives: this is a lift clear of trouble
       and not a collision test. */
    if (cause === 'ceiling') {
      player.y = Math.max(player.y, CEIL + HIT_R + 50);
      player.vy = 0;
    }
    for (var k = 0; k < 22; k++) {
      var a = rand(0, TAU), sp = rand(40, 150);
      particles.push({ x: player.x, y: player.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
                       life: rand(0.4, 1.0), g: -40,
                       col: chance(0.45) ? LIFE_PALE : LIFE_LEAF });
    }
  }

  /* what is left of an obstacle the succulent took out of the way */
  function clearBurst(x) {
    for (var i = 0; i < 10; i++) {
      particles.push({ x: x + rand(-10, 10), y: rand(CEIL, FLOOR),
                       vx: rand(-70, 70), vy: rand(-90, -10),
                       life: rand(0.3, 0.8), g: 300,
                       col: chance(0.5) ? FX.ground : FX.groundHi });
    }
  }

  /* --------------------------------------------------------- the ring

     A hazard that costs you nothing and ruins everything. An obstacle - any
     obstacle that is not a drop and not a boon - may carry

       ob.stun = { time: seconds, amp: px, say: 'HEADING', sub: 'second line' }

     and flying into it shakes the screen instead of ending the run. Nothing
     about lives, score or state changes; the doodad, gravity, the flap and
     the hitbox are all exactly as they were. What it takes is the player's
     ability to read the next three seconds of the level, which in a game
     where the whole skill is reading the next three seconds is plenty.

     The heat's top-up rule, because it is the right rule for anything that
     can arrive twice: a second one extends rather than restarting, the
     total is bounded, and a chain of them always ends. */
  function stun(ob) {
    ringing = ringing > 0 ? Math.min(ob.stun.time * 1.6, ringing + ob.stun.time * 0.6)
                          : ob.stun.time;
    ringAmp = Math.min(ob.stun.amp, 12);
    stunTime = ob.stun.time;
    buzzTimer = 0;
    stunBanner = 1.1;
    /* ONE TENANT FOR THE SLOT AT 112/138, AND THE NEWEST NEWS WINS.
       SPICY!, SOUR! and this all shout in the same two rows for the same
       1.1 seconds, and until the Living Room no level could shed two of
       them: the Whiteboard sheds both drops and the Desk is the first bay
       with a stun, so two captions landed on top of each other and read
       as mush. A banner is 1.1s of NEWS, and two pieces of news inside
       one second mean the player wants the later one - the gauges go on
       showing that both power-ups are still running, which is the part
       that is a state rather than an announcement. */
    spicyBanner = 0; sourBanner = 0;
    stunSay = ob.stun.say || 'OOF!';
    stunSub = ob.stun.sub || '';
    stunFlash = 0.08;
    Audio3.play('ring');
    /* the thing coming apart where it was touched. `ob.y === undefined` is
       a pillar-or-spike-shaped obstacle, which has no centre height of its
       own, so the burst goes where the doodad is instead. */
    for (var i = 0; i < 12; i++) {
      particles.push({ x: ob.x + ob.w / 2, y: ob.y === undefined ? player.y : ob.y,
                       vx: rand(-70, 70), vy: rand(-60, -10),
                       life: rand(0.2, 0.5), g: 200,
                       col: chance(0.5) ? FX.splatHi : FX.splat });
    }
  }

  /* --------------------------------------------------------- the heat */

  function grabSpicy(ob) {
    /* a second one part way through tops the heat up rather than
       restarting it, so a lucky pair is worth chasing */
    var wasHot = spicy > 0;
    spicy = spicy > 0 ? Math.min(SPICY_TIME * 1.6, spicy + SPICY_TIME * 0.6) : SPICY_TIME;
    spicyFlash = 0.14;
    spicyBanner = 1.1;
    /* the banner slot has one tenant - see stun() */
    sourBanner = 0; stunBanner = 0;
    /* A GAUGE TAKES ITS ROW WHEN IT IS CAUGHT AND KEEPS IT UNTIL IT DIES.
       Both gauges used to work out their y every frame from whether the
       OTHER one was live, so on the Whiteboard the lime and its caption
       jumped 12px the moment the heat faded - a bar that moves while it
       is counting down reads as a glitch, not as a layout. The row is
       decided once, here, from what is on screen at the moment of the
       catch: take 80 unless the lime already has it, in which case drop
       to 92. A top-up does not re-decide, because the bar is already
       somewhere and the player is already watching it there.
       The test is `sour > 0` rather than the eased `shrivel`, which is
       what the drawing side reads: shrivel is a frame behind, and two
       drops taken in the SAME frame would otherwise both claim 80 and
       stay there for the whole seven seconds. */
    if (!wasHot) spicySlot = (sour > 0 && sourSlot === 80) ? 92 : 80;
    Screen.shake(4.5, 0.4);
    Audio3.play('spicy');
    for (var i = 0; i < 26; i++) {
      var a = rand(0, TAU), sp = rand(30, 150);
      particles.push({ x: ob.x, y: ob.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 30,
                       life: rand(0.35, 0.95), g: -70,
                       col: chance(0.4) ? FX.hotHi
                          : (chance(0.5) ? FX.hotMid : FX.hot) });
    }
  }

  /* the wake of embers the doodad leaves while it is lit up */
  function emberTrail(dt) {
    if (spicy <= 0 || !chance(dt * 46)) return;
    particles.push({ x: player.x - 7 + rand(-3, 3), y: player.y + rand(-6, 6),
                     vx: rand(-30, -8) - speed * 0.35, vy: rand(-26, -4),
                     life: rand(0.25, 0.6), g: -40,
                     col: chance(0.45) ? FX.hotHi
                        : (chance(0.5) ? FX.hotMid : FX.hot) });
  }

  /* --------------------------------------------------------- the lime */

  function grabSour(ob) {
    /* a pair tops the lime up rather than restarting it, as the heat does */
    var wasSmall = sour > 0;
    sour = sour > 0 ? Math.min(SOUR_TIME * 1.6, sour + SOUR_TIME * 0.6) : SOUR_TIME;
    sourFlash = 0.14;
    sourBanner = 1.1;
    /* the banner slot has one tenant - see stun() */
    spicyBanner = 0; stunBanner = 0;
    /* grabSpicy's mirror image, off the heat instead of off the lime */
    if (!wasSmall) sourSlot = (spicy > 0 && spicySlot === 80) ? 92 : 80;
    /* smaller and longer than a hit's shake. Screen.shake decays over its
       own time, so this reads as the whole room buzzing rather than as
       something having gone wrong - which is the point of a sour face. */
    Screen.shake(2.5, 0.55);
    Audio3.play('fizzle');
    for (var i = 0; i < 26; i++) {
      var a = rand(0, TAU), sp = rand(30, 150);
      particles.push({ x: ob.x, y: ob.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 30,
                       life: rand(0.35, 0.95), g: -70,
                       col: chance(0.4) ? SOUR_HI : (chance(0.5) ? SOUR_MID : SOUR_DARK) });
    }
    checkLimeUnlocks();
  }

  /* checkBoonUnlocks' twin: one doodad is bought with limes rather than
     with succulents or a score, so a lime caught is a lime counted, and
     the SOUR! shout stands down for the same reason the extra-life one
     does - the two captions share the middle of the screen and a stall
     coming open is the bigger news. The lime itself still lands: the
     timer, the shrink and the gauge were set before this ran. */
  function checkLimeUnlocks() {
    var won = Doodads.noteLime();
    if (!won.length || Doodads.masterKey()) return;
    for (var i = 0; i < won.length; i++) { unlocked.push(won[i]); announce('doodad', won[i]); }
    sourBanner = 0;
    Audio3.play('unlock');
    Screen.shake(2.5, 0.3);
    for (var k = 0; k < 30; k++) {
      var a = rand(0, TAU), sp = rand(40, 170);
      particles.push({ x: player.x, y: player.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
                       life: rand(0.5, 1.2), g: -50,
                       col: chance(0.45) ? UI.C.gold : (chance(0.5) ? won[0].accentLight : '#fff3d0') });
    }
  }

  /* emberTrail's twin, and deliberately the other way up: the heat trails
     embers back behind the doodad, the lime fizzes up off it, so at a glance
     the two are never the same power-up even when both are running. */
  function sourTrail(dt) {
    if (sour <= 0 || !chance(dt * 46)) return;
    particles.push({ x: player.x + rand(-7, 7), y: player.y + rand(-5, 5),
                     vx: rand(-16, 4) - speed * 0.15, vy: rand(-46, -18),
                     life: rand(0.25, 0.6), g: -30,
                     col: chance(0.45) ? SOUR_HI
                        : (chance(0.5) ? SOUR_MID : SOUR_DARK) });
  }

  function updateStreaks(dt) {
    if (heat < 0.02) return;
    for (var i = 0; i < streaks.length; i++) {
      var s = streaks[i];
      s.x -= speed * s.spd * dt;
      if (s.x + s.len < 0) streaks[i] = freshStreak(VW + rand(0, 60));
    }
  }

  /* Everything enters the world through here, and enters it with a clock on
     it. Both spawners run AFTER moveObstacles in the play branch, so a brand
     new obstacle is drawn once before its first tick - and an art module
     that phases an animation off `ob.age` would read undefined on exactly
     that frame. Setting it at birth means a maker never has to remember to,
     and `ob.age` is a number every time anything is allowed to look. */
  function admit(ob) {
    if (ob.age === undefined) ob.age = 0;
    obstacles.push(ob);
    return ob;
  }

  function spawnAhead() {
    var d = difficulty();
    while (spawnCursor < VW + 120) {
      var gapH = Math.round(d.gap);
      /* keep a decent length of plank at both ends so they never spawn as
         stubs hanging off the rafters */
      var top = CEIL + 34;
      var bottom = FLOOR - 34 - gapH;
      var gapY = clamp(lastGapY + rand(-tune.gapDrift, tune.gapDrift), top, bottom);
      lastGapY = gapY;
      var plank = art.makePillar(spawnCursor, gapY, gapH, run);
      /* Somebody is hiding behind one particular plank. The level says
         which one, the roster says who, and neither has to know about the
         other - so a second level could hide a second doodad by adding one
         number, and the doodad is found even on a run that never scores. */
      if (tune.meetAt && ++planksUp === tune.meetAt) {
        var who = Doodads.meetable();
        if (who) plank.meet = who;
      }
      admit(plank);

      /* hazards in the space between two pillars */
      var mid = spawnCursor + d.spacing * 0.5;
      if (spikesReady() && chance(d.spikes)) {
        var onCeiling = chance(0.42);
        /* how long a spike grows is the level's business: the Coop's nails
           are short and stubby, the Garden's mint runs away with itself */
        var lo = onCeiling ? (tune.spikeCeilMin || 13) : (tune.spikeFloorMin || 15);
        var hi = onCeiling ? (tune.spikeCeilMax || 21) : (tune.spikeFloorMax || 27);
        admit(art.makeSpikes(mid + rand(-14, 14), onCeiling ? 'ceil' : 'floor',
                             randInt(3, 6), randInt(lo, hi), run));
      }
      if (chance(0.55)) admit(art.makeLitter(mid + rand(-40, 40), run));

      /* the succulent: rare, never twice in quick succession, and only on
         a level whose art actually grows one */
      if (boonGap > 0) boonGap--;
      else if (art.makeBoon && tune.boonChance && chance(tune.boonChance)) {
        admit(art.makeBoon(mid + rand(-30, 30), run));
        boonGap = tune.boonGap || 5;
      }

      spawnCursor += d.spacing;
    }
  }

  /* -------------------------------------------------------- physics

     The three numbers a doodad's flight is made of, each run through its
     own `light` scale if it has one. Everything that moves the player asks
     for them rather than reading the constants, so a doodad that weighs
     less than the others is data and not a special case. */

  function grav()    { return doodad.light ? GRAVITY * doodad.light.gravity : GRAVITY; }
  function maxFall() { return doodad.light ? MAX_FALL * doodad.light.fall : MAX_FALL; }
  function flapV()   { return doodad.light ? FLAP * doodad.light.flap : FLAP; }

  /* And the size the doodad is right now, for the same reason: a lime makes
     it smaller, so everything that measures the doodad asks rather than
     reading the constant. Both accessors run off the SAME eased `shrivel`,
     updated once a frame before anything is drawn, so the box and the body
     shrink and regrow together and the hitbox can never lie about what the
     player can see. With shrivel 0 they return the constants exactly -
     times the doodad's own `size`, which is 1 for everyone who does not
     say otherwise. A doodad that is small is the base the lime multiplies,
     not an exception to it: 0.7 of a doodad with a lime in him is 0.43 of
     one, which is the point of him. */
  function shrink()  { return (doodad && doodad.size ? doodad.size : 1) * (1 - shrivel * (1 - SOUR_SHRINK)); }
  function hitR()    { return HIT_R * shrink(); }
  function bodyR()   { return BODY_R * shrink(); }

  function flap() {
    player.vy = flapV();
    player.flapTimer = 0.22;
    player.angle = -0.36;
    Audio3.play('flap');
    for (var i = 0; i < 3; i++) {
      particles.push({ x: player.x - 6 + rand(-3, 3), y: player.y + rand(2, 8),
                       vx: rand(-40, -14) - speed * 0.2, vy: rand(-6, 22),
                       life: rand(0.18, 0.4), col: FX.puff, g: 60 });
    }
  }

  function updatePlayer(dt) {
    /* horizontal nudging */
    var want = 0;
    if (Input.down('left')) want -= 1;
    if (Input.down('right')) want += 1;
    player.vx = approach(player.vx, want * MOVE_SPD, MOVE_ACC * dt);
    player.x = clamp(player.x + player.vx * dt, X_MIN, X_MAX);
    if ((player.x <= X_MIN && player.vx < 0) || (player.x >= X_MAX && player.vx > 0)) player.vx = 0;

    /* gravity, integrated so a flap always reaches the same height */
    var g = grav();
    player.y += player.vy * dt + 0.5 * g * dt * dt;
    player.vy = Math.min(player.vy + g * dt, maxFall());
    player.flapTimer -= dt;

    var br = bodyR();

    /* The lid. In the Backyard the rafters are solid but survivable; in the
       Living Room they end the run, and the two paths share exactly one
       thing - the doodad is stopped either way.

       The WALL is still here under CEIL_KILLS even though the death is in
       collide(), because during a save's grace hurt() returns false, and a
       doodad flapping under a ceiling with nothing holding it in would
       simply leave through the top of the screen. It stops at the HITBOX
       radius rather than the drawn one: the floor kills at the hitbox, and
       the two edges of the room have no business using different numbers -
       so both use the forgiving one. */
    var hr = hitR();
    if (CEIL_KILLS) {
      ceilHit = player.y - hr < CEIL;
      if (ceilHit) {
        player.y = CEIL + hr;
        if (player.vy < 0) player.vy = 0;
      }
    } else if (player.y - br < CEIL) {
      player.y = CEIL + br;
      if (player.vy < 0) player.vy *= -0.18;
    }

    /* and for a doodad that can trot, so is the bedding. Done here rather
       than in collide() so the floor simply stops him the way the rafters
       do: by the time collide() looks he is already standing on it, and
       its ground check cannot fire. Planks and floor spikes still can.
       Both of these stand him at the radius he is DRAWN at: stood at the
       constant while shrivelled he would hover a clear five pixels above
       the bedding, with his feet in mid air. */
    if (doodad.trot && player.y + br > FLOOR) {
      var landed = trotting <= 0;
      player.y = FLOOR - br;
      if (player.vy > 0) {
        if (landed && player.vy > 140) { Audio3.play('thud'); Screen.shake(1.8, 0.12); }
        player.vy = 0;
      }
      trotting += dt;
      /* he is heavy and the bedding knows it */
      if (chance(dt * (landed ? 40 : 16))) {
        particles.push({ x: player.x + rand(-6, 2), y: FLOOR - 1,
                         vx: rand(-70, -20) - speed * 0.25, vy: rand(-48, -8),
                         life: rand(0.2, 0.5), g: 260,
                         col: chance(0.5) ? FX.ground : FX.groundHi });
      }
    } else if (trotting > 0) {
      trotting = 0;
    }

    /* tilt follows the arc - except with his feet down, where it is a stand */
    var target = player.vy < 0 ? -0.36 : clamp(player.vy / maxFall() * 1.25, -0.36, 1.05);
    if (trotting > 0) target = 0.06;
    player.angle = damp(player.angle, target, 0.0008, dt);
  }

  function die(cause) {
    if (state !== 'play' || invuln > 0) return;
    state = 'dying';
    spicy = 0;                 /* the run is over; let the coop cool off */
    flash = 0.09;
    /* Which way the body goes. Everything else in the game throws the
       doodad UP and lets it tumble back down; a head-bump cannot, because
       there is nowhere up to go - so it drops instead, and falls the whole
       height of the room to land(). Positive, not zero: a doodad that
       merely stops dead under the moulding reads as the game freezing. */
    player.vy = cause === 'ceiling' ? 60 : (cause === 'ground' ? -95 : -170);
    player.spin = rand(3.2, 5.4) * (chance(0.5) ? -1 : 1);
    Audio3.play('hit');
    Screen.shake(5, 0.4);
    for (var i = 0; i < 14; i++) {
      particles.push({ x: player.x + rand(-8, 8), y: player.y + rand(-8, 8),
                       vx: rand(-70, 40), vy: rand(-90, 20), life: rand(0.4, 1),
                       col: chance(0.5) ? doodad.accent : doodad.accentLight, g: 320 });
    }
    if (cause === 'drop') splatter(player.x, player.y, false, 10);
  }

  function land() {
    state = 'dead';
    Input.setTouchMode('menu');
    deadTimer = 0;
    player.y = FLOOR - bodyR();
    Audio3.play('thud');
    Screen.shake(3, 0.3);
    for (var i = 0; i < 16; i++) {
      particles.push({ x: player.x + rand(-10, 10), y: FLOOR - 2,
                       vx: rand(-60, 60), vy: rand(-110, -30), life: rand(0.4, 1.1),
                       col: chance(0.5) ? FX.ground : FX.groundHi, g: 420 });
    }
    pbNew = Scores.recordRun(roomRef, level, doodad.id, score);
    rank = Scores.rankFor(roomRef, level, score);
    entryPending = rank >= 0;
    if (entryPending) { initials = Scores.lastInitials().split(''); cursor = 0; }
  }

  /* ------------------------------------------------------- unlocking

     Doodads open up at a score, and the moment is worth having: the run
     is still going, so it lands mid-flight rather than being read off a
     results screen. Banked here rather than at the end of the run - you
     reached it, whatever happens next. A doubled score can step straight
     over a threshold, so this asks what the jump crossed, not what it
     landed on.                                                        */
  /* `opened` is a list of { kind, it } now, because a score can open a
     whole ROOM as well as a bay - 20 in the Construction Zone is the price
     of the Living Room - and rooms come first in the list so the bigger
     news is announced first. The results screen's own list stays what it
     always was: levels only, because 'LEVEL UNLOCKED' at the end of a run
     is a line about a card you can go and press. */
  function checkUnlocks() {
    var opened = Levels.noteScore(roomRef, level, score);
    for (var n = 0; n < opened.length; n++) {
      if (opened[n].kind === 'level' && wonLevels.indexOf(opened[n].it) < 0) {
        wonLevels.push(opened[n].it);
      }
    }
    if (opened.length && !Doodads.masterKey()) {
      for (var z = 0; z < opened.length; z++) announce(opened[z].kind, opened[z].it);
      Audio3.play('unlock');
      Screen.shake(2.5, 0.3);
      for (var q = 0; q < 26; q++) {
        var ang = rand(0, TAU), spd = rand(40, 160);
        particles.push({ x: player.x, y: player.y, vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd - 40,
                         life: rand(0.5, 1.2), g: -50,
                         col: chance(0.5) ? UI.C.gold : '#fff3d0' });
      }
    }
    var won = Doodads.noteScore(score);
    /* The score is still banked above either way - it is the honest
       record, and it is what the roster falls back on if the passkey is
       ever switched off. But there is nothing to announce when the
       passkey has already opened everything. */
    if (!won.length || Doodads.masterKey()) return;
    for (var i = 0; i < won.length; i++) { unlocked.push(won[i]); announce('doodad', won[i]); }
    Audio3.play('unlock');
    Screen.shake(2.5, 0.3);
    for (var k = 0; k < 30; k++) {
      var a = rand(0, TAU), sp = rand(40, 170);
      particles.push({ x: player.x, y: player.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
                       life: rand(0.5, 1.2), g: -50,
                       col: chance(0.45) ? UI.C.gold : (chance(0.5) ? won[0].accentLight : '#fff3d0') });
    }
  }

  /* --------------------------------------------------- score chasing */

  /* the lowest score on the table that this run has not yet beaten */
  function nextTarget() {
    for (var i = board.length - 1; i >= 0; i--) if (board[i].score >= score) return board[i];
    return null;
  }

  function checkPassed() {
    var next = nextTarget();
    if (target && next !== target) {
      passedName = target.name;
      passedTimer = 1.4;
      Audio3.play('chirp');
    }
    target = next;
  }

  /* ----------------------------------------------------- name entry */

  var CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789 ';

  function beginEntry() {
    entryPending = false;
    state = 'entry';
    Input.setTextMode(true);
    /* the touch mode stays 'menu' - no pads, no rest zone. The controls are
       the plates and pads this screen draws for itself, so a tap that lands
       on none of them does nothing rather than saving a name nobody chose. */
    Audio3.play(rank === 0 ? 'start' : 'select');
  }

  function updateEntry() {
    /* the tapped column becomes the cursor's column FIRST, so the ▲ and ▼
       a finger just pressed - which arrive below as nav('up')/nav('down'),
       exactly as the arrow keys do - act on the letter they sit under */
    var tg = Input.tapped();
    if (tg && tg.i !== undefined) cursor = tg.i;
    var keys = Input.typed();
    if (keys.length) {
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] === '\b') { cursor = Math.max(0, cursor - 1); Audio3.play('back'); }
        else { initials[cursor] = keys[i]; cursor = Math.min(2, cursor + 1); Audio3.play('move'); }
      }
      return;
    }
    var at = CHARSET.indexOf(initials[cursor]);
    if (at < 0) at = 0;
    if (Input.nav('up')) { initials[cursor] = CHARSET.charAt((at + 1) % CHARSET.length); Audio3.play('move'); }
    if (Input.nav('down')) { initials[cursor] = CHARSET.charAt((at + CHARSET.length - 1) % CHARSET.length); Audio3.play('move'); }
    if (Input.nav('left') && cursor > 0) { cursor--; Audio3.play('move'); }
    if (Input.nav('right') && cursor < 2) { cursor++; Audio3.play('move'); }
    /* escape saves too - a high score is never thrown away by accident */
    if (Input.hit('confirm') || Input.hit('back')) finishEntry();
  }

  function finishEntry() {
    var name = initials.join('');
    if (!name.trim()) name = 'AAA';
    savedRow = Scores.submit(roomRef, level, name, score, doodad.id);
    Input.setTextMode(false);
    Input.setTouchMode('menu');
    state = 'dead';
    menuIndex = 0;
    Audio3.play('select');
  }

  /* walked backwards, because catching or cooking an egg takes it out
     of the list mid-loop */
  function collide() {
    var rects = [];
    var hr = hitR();
    for (var i = obstacles.length - 1; i >= 0; i--) {
      var ob = obstacles[i];
      if (ob.type === 'litter') continue;
      if (ob.type === 'drop' && ob.broken > 0) continue;
      if (ob.x > player.x + 46 || ob.x + (ob.w || 40) < player.x - 46) continue;
      rects.length = 0;
      art.rectsFor(ob, rects);
      var hit = false;
      for (var k = 0; k < rects.length && !hit; k++) {
        var r = rects[k];
        hit = circleHitsRect(player.x, player.y, hr, r[0], r[1], r[2], r[3]);
      }
      if (!hit) continue;
      if (ob.type === 'boon') { takeBoon(ob); obstacles.splice(i, 1); continue; }
      if (ob.type !== 'drop') {
        /* A hazard that only RINGS. It is read before hurt(), so a level
           can have both kinds of obstacle in the air at once and the engine
           never has to ask which level it is; the grace after a save covers
           this one too, and during it the thing is left standing, because a
           hazard you cannot be hurt by is a hazard you have not met yet.
           Outside the grace it is consumed on contact - one icon, one ring. */
        if (ob.stun) {
          if (invuln > 0) continue;
          stun(ob);
          obstacles.splice(i, 1);
          continue;
        }
        if (hurt('obstacle')) return;
        continue;
      }
      /* Every gift is taken before the heat gets a chance to smash through,
         or a hot run would destroy the very can and lime it is flying into -
         the reward for a good run turned into a way of losing one. */
      if (ob.spicy) { grabSpicy(ob); obstacles.splice(i, 1); continue; }
      if (ob.gold)  { takeGold(ob);  obstacles.splice(i, 1); continue; }
      if (ob.sour)  { grabSour(ob);  obstacles.splice(i, 1); continue; }
      if (spicy > 0) { smashDrop(ob); obstacles.splice(i, 1); continue; }
      if (hurt('drop')) return;
    }
    if (player.y + hr >= FLOOR) hurt('ground');
    /* and the other edge of the room, in the rooms that have one. The flag
       was set by updatePlayer this same frame; it is spent here so that a
       head-bump is one death and not one per frame spent held against the
       moulding. */
    if (ceilHit) { ceilHit = false; hurt('ceiling'); }
  }

  /* --------------------------------------------------------- update */

  function update(dt) {
    t += dt;

    if (state === 'paused') {
      if (Game.locked()) return;
      /* the only other thing on the panel. Read before the resume lines
         below, because QUIT carries no action of its own and the paused
         mode's rest zone would otherwise resume out from under it. */
      var tg = Input.tapped();
      if (tg && tg.id === 'quit') {
        Audio3.play('back');
        Game.go(LevelSelectScene, { focus: 'level' });
        return;
      }
      if (Input.hit('pause') || Input.hit('confirm')) {
        state = prePause;
        Input.setTouchMode('play');
        Audio3.play('pause');
      }
      if (Input.hit('back')) { Audio3.play('back'); Game.go(LevelSelectScene, { focus: 'level' }); }
      return;
    }

    if (flash > 0) flash -= dt;
    if (spicyFlash > 0) spicyFlash -= dt;
    if (spicyBanner > 0) spicyBanner -= dt;
    if (sourFlash > 0) sourFlash -= dt;
    if (sourBanner > 0) sourBanner -= dt;
    if (stunFlash > 0) stunFlash -= dt;
    if (stunBanner > 0) stunBanner -= dt;
    if (hazardWarn > 0) hazardWarn -= dt;
    if (unlockBanner > 0) {
      unlockBanner -= dt;
      if (unlockBanner <= 0) {
        bannerQueue.shift();
        if (bannerQueue.length) unlockBanner = BANNER_TIME;
      }
    }
    if (invuln > 0) invuln -= dt;
    if (saveFlash > 0) saveFlash -= dt;
    if (saveBanner > 0) saveBanner -= dt;
    if (boonBanner > 0) boonBanner -= dt;
    if (lifePop > 0) lifePop -= dt;
    if (nervePop > 0) nervePop -= dt;
    if (goldPop > 0) goldPop -= dt;
    if (flickCool > 0) {
      flickCool -= dt;
      if (flickCool <= 0) { flickCool = 0; if (state === 'play') flickReady(); }
    }
    /* the heat eases in and out, so nothing about it snaps on or off */
    heat = damp(heat, spicy > 0 ? 1 : 0, 0.0004, dt);
    /* and so does the shrivel - which is also the hitbox, so this has to
       happen before collide() and before anything is drawn */
    shrivel = damp(shrivel, sour > 0 ? 1 : 0, 0.0004, dt);
    updateParticles(dt);
    updateDust(dt);
    updateStreaks(dt);

    if (state === 'ready') {
      readyPulse += dt;
      scroll += speed * 0.34 * dt;
      player.y = (CEIL + FLOOR) / 2 + Math.sin(readyPulse * 2.6) * 7;
      player.angle = Math.sin(readyPulse * 2.6) * 0.06;
      player.flapTimer = Math.sin(readyPulse * 2.6) > 0.55 ? 0.1 : 0;
      if (!Game.locked()) {
        if (Input.hit('up')) {
          state = 'play'; player.vy = 0; flap();
          /* The one hazard in the game that is not spawned and therefore
             cannot arm: the room itself. It is said on the first flap of
             every run rather than once ever, because it is the rule that
             ends runs and a player coming back after a week has forgotten
             it. No 'warn' tone - the attention is already on the screen, the
             doodad has just left the ground, and a chime over GET READY
             ending reads as something having gone wrong. 2.4s is over well
             before the first plank arrives, which is about 3.8s at
             speedStart. */
          if (CEIL_KILLS && art.WARN && art.WARN.ceil && hazardWarn <= 0) {
            warnLines = art.WARN.ceil;
            hazardWarn = 2.4;
          }
        }
        if (Input.hit('back')) { Audio3.play('back'); Game.go(CharSelectScene, {}); }
        if (Input.hit('pause')) {
          prePause = 'ready'; state = 'paused';
          Input.setTouchMode('paused');
          Audio3.play('pause');
        }
      }
      return;
    }

    if (state === 'play') {
      if (!Game.locked()) {
        if (Input.hit('pause')) {
          prePause = 'play'; state = 'paused';
          /* the run's rule - a tap anywhere flaps - is exactly wrong on a
             pause panel, so paused is its own mode where a tap anywhere
             resumes instead */
          Input.setTouchMode('paused');
          Audio3.play('pause');
          return;
        }
        if (Input.hit('up')) flap();
      }
      runTime += dt;
      var d = difficulty();
      if (spicy > 0) {
        spicy -= dt;
        if (spicy <= 0) { spicy = 0; Audio3.play('cooldown'); }
      }
      if (sour > 0) {
        sour -= dt;
        if (sour <= 0) { sour = 0; Audio3.play('cooldown'); }
      }
      /* The buzz, as a train of short pulses rather than one long shake.
         Screen.shake's amplitude decays as amount * shakeTime / 0.35, so a
         single 1.1-second call STARTS at three times its own amount and
         reads as something breaking; a pulse every 0.36s with a shakeTime
         of 0.36 reads as a vibration motor, which is the thing being
         imitated. Three of them over 1.1s, decaying with what is left of
         the ring: 8, 6 then 4px for an amp of 8.
         And they never swallow each other, although shake() keeps only the
         bigger amount: Screen.updateShake runs at js/game.js:85 and
         scene.update at :110, so by the time the next pulse is asked for
         the last one has already expired and zeroed shakeAmount. */
      if (ringing > 0) {
        ringing -= dt;
        buzzTimer -= dt;
        if (buzzTimer <= 0) {
          buzzTimer = BUZZ;
          Screen.shake(ringAmp * (0.35 / BUZZ) *
                       clamp(0.5 + 0.5 * ringing / stunTime, 0, 1), BUZZ);
        }
      }
      speed = d.speed * (spicy > 0 ? SPICY_SPEED : 1);
      scroll += speed * dt;
      spawnCursor -= speed * dt;
      moveObstacles(dt, speed);
      /* The late phase, armed once and never disarmed. It is read AFTER
         moveObstacles, because that is what banks the plank that just
         crossed the threshold, and BEFORE `run` is built, so the very first
         maker call of the phase already knows. */
      if (!late && tune.lateScore !== undefined && score >= tune.lateScore) {
        late = true;
        var wl = art.WARN && art.WARN.late;
        if (wl && hazardWarn <= 0) { warnLines = wl; hazardWarn = 2.4; Audio3.play('warn'); }
      }
      run = { score: score, time: runTime, late: late, scroll: scroll };
      spawnAhead();
      spawnDrops(dt, d);
      updatePlayer(dt);
      updateHunger(dt);
      updateNerve();
      updateWatch(dt);
      updateFlick();
      updateMeet();
      collide();
      emberTrail(dt);
      sourTrail(dt);
      if (scorePop > 0) scorePop -= dt;
      if (passedTimer > 0) passedTimer -= dt;
      return;
    }

    if (state === 'dying') {
      player.vy = Math.min(player.vy + grav() * dt, maxFall());
      player.y += player.vy * dt;
      player.x -= 24 * dt;
      player.angle += player.spin * dt;
      if (player.y + bodyR() >= FLOOR) land();
      return;
    }

    if (state === 'entry') {
      deadTimer += dt;
      if (!Game.locked()) updateEntry();
      return;
    }

    if (state === 'dead') {
      deadTimer += dt;
      if (deadTimer < 0.45 || Game.locked()) return;
      if (entryPending) { if (deadTimer > 0.7) beginEntry(); return; }
      /* The rows ARE the buttons now. Tapping the word TITLE used to fire
         confirm on whatever the marker happened to be on - usually RETRY -
         so a player could press exactly what they wanted and reliably get
         something else. The row carries a:'confirm', so this only has to
         move the cursor onto it before the confirm line below reads it. */
      var tg = Input.tapped();
      if (tg && tg.id === 'row') menuIndex = tg.i;
      if (Input.nav('up')) { menuIndex = (menuIndex + MENU.length - 1) % MENU.length; Audio3.play('move'); }
      if (Input.nav('down')) { menuIndex = (menuIndex + 1) % MENU.length; Audio3.play('move'); }
      if (Input.hit('confirm')) { Audio3.play('select'); MENU[menuIndex].act(); }
      if (Input.hit('back')) { Audio3.play('back'); Game.go(LevelSelectScene, { focus: 'level' }); }
    }
  }

  function moveObstacles(dt, spd) {
    for (var i = obstacles.length - 1; i >= 0; i--) {
      var ob = obstacles[i];
      /* The one clock an art module may read: seconds since this obstacle
         came into the world (admit() starts it). Per-obstacle rather than
         shared, so a deck of misters is never all in phase, and advanced
         only here - which means pause, dying and the results screen freeze
         every animation along with everything else, and a jet can never be
         waited out behind the scrim. The `|| 0` is for anything that
         reached the list without passing through admit(). */
      ob.age = (ob.age || 0) + dt;
      ob.x -= spd * dt;
      if (ob.type === 'drop') {
        if (ob.broken > 0) {
          ob.broken -= dt;
          if (ob.broken <= 0) { obstacles.splice(i, 1); continue; }
        } else if (art.stepDrop) {
          /* The level moves its own drop. Everything a falling thing does
             in the Backyard is four lines - gravity, position, spin, and
             splat on the ground - and the Couch's popcorn does not splat
             on the ground, it bounces off it. So the level may take the
             four lines over, for ONE drop at a time: the one it is handed.
             It may READ the other obstacles (and ask rectsFor for a
             pillar's boxes) but never splice or write them. The loop walks
             backwards and scrolls each obstacle as it reaches it, so a
             pillar at a lower index is at most one frame - 6px at the worst
             dt the game allows - stale to a drop testing against it; the
             Deck accepted exactly that staleness for its mister clock.
             Returning true lands the drop, which is the ordinary splat. */
          if (art.stepDrop(ob, dt, obstacles)) landDrop(ob);
          /* A flag the level sets when its drop has just come off something.
             The SOUND stays in the engine, because no art module calls
             Audio3 - and it is rate limited, because a dozen kernels can
             land in the same frame and a dozen ticks at once is a crack. */
          if (ob.bounced) {
            ob.bounced = false;
            for (var b = 0; b < 2; b++) {
              particles.push({ x: ob.x, y: ob.y + 3,
                               vx: rand(-50, 50) - speed * 0.1, vy: rand(-50, -20),
                               life: rand(0.15, 0.3), g: 300,
                               col: chance(0.5) ? FX.ground : FX.groundHi });
            }
            if (t - bopAt > 0.09) { bopAt = t; Audio3.play('bop'); }
          }
        } else {
          ob.vy += art.DROP_GRAV * dt;
          ob.y += ob.vy * dt;
          ob.spin += ob.spinRate * dt;
          if (ob.y >= FLOOR - 4) landDrop(ob);
        }
      }
      if (ob.type === 'pillar' && !ob.scored && ob.x + ob.w < player.x) {
        ob.scored = true;
        var base = spicy > 0 ? SPICY_MULT : 1;
        /* a plank threaded close is worth two of itself, and the heat still
           doubles on top of that - nerve and spicy stack, which is exactly
           the run you want to be having */
        var tight = doodad.nerve && ob.skim !== undefined &&
                    ob.skim >= 0 && ob.skim <= doodad.nerve;
        score += tight ? base * 2 : base;
        scorePop = (spicy > 0 || tight) ? 0.42 : 0.32;
        Audio3.play(spicy > 0 ? 'scoreHot' : 'score');
        if (tight) takeNerve(ob, base);
        checkPassed();
        checkUnlocks();
      }
      if (ob.x + (ob.w || 40) < -70) obstacles.splice(i, 1);
    }
  }

  function updateParticles(dt) {
    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.life -= dt;
      p.vy += (p.g || 0) * dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life <= 0 || p.y > VH) particles.splice(i, 1);
    }
  }

  function updateDust(dt) {
    var drift = (state === 'play' || state === 'ready') ? speed * 0.35 : 0;
    for (var i = 0; i < dust.length; i++) {
      var p = dust[i];
      p.x -= drift * dt;
      p.y += p.vy * dt + Math.sin(t * 1.6 + p.phase) * 5 * dt;
      if (p.x < -2) { p.x = VW + 2; p.y = rand(CEIL, FLOOR); }
      if (p.y < CEIL) p.y = FLOOR - 3;
      if (p.y > FLOOR) p.y = CEIL + 3;
    }
  }

  /* -------------------------------------------------------- drawing */

  function drawBg(ctx) {
    art.drawBackdrop(ctx, scroll);
    art.drawCeiling(ctx, scroll);

    var i, ty;
    for (i = 0; i < obstacles.length; i++) {
      ty = obstacles[i].type;
      if (ty === 'pillar' || ty === 'spike') art.drawObstacle(ctx, obstacles[i]);
    }
    /* eggs fall down the front of the coop, in front of the planks */
    for (i = 0; i < obstacles.length; i++) {
      if (obstacles[i].type === 'drop' && !obstacles[i].broken) art.drawDrop(ctx, obstacles[i]);
    }

    art.drawFloor(ctx, scroll);

    /* and everything that belongs on the bedding goes on top of it */
    for (i = 0; i < obstacles.length; i++) {
      ty = obstacles[i].type;
      if (ty === 'litter' || ty === 'boon') art.drawObstacle(ctx, obstacles[i]);
      else if (ty === 'drop') {
        if (obstacles[i].broken > 0) art.drawDropSplat(ctx, obstacles[i]);
        else art.drawDropSpot(ctx, obstacles[i]);
      }
    }

    for (var d = 0; d < dust.length; d++) {
      var p = dust[d];
      ctx.fillStyle = p.bright ? FX.motesHi : FX.motes;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), 1, 1);
    }
    for (var j = 0; j < particles.length; j++) {
      var q = particles[j];
      ctx.fillStyle = q.col;
      ctx.fillRect(Math.round(q.x), Math.round(q.y), 1, 1);
    }

    /* only while she is flying: the sight lines go out with her */
    if (doodad.watch && state === 'play') drawWatch(ctx);

    if (heat > 0.02) drawHeat(ctx);
    if (shrivel > 0.02) drawSourAura(ctx);
  }

  /* The lime, in the room: a green light closing in on the doodad, and
     nothing else. No speed lines and no wash over the level, because size
     is the whole of this power-up - and the radius shrinks along with the
     shrivel, so it reads as the doodad being squeezed rather than as a
     second flavour of heat. Drawn behind the sprite for the same reason
     the glow is: light in the room, not a filter over the picture. */
  function drawSourAura(ctx) {
    if (state !== 'play' && state !== 'dying') return;
    var pulse = 0.75 + 0.25 * Math.sin(t * 12);
    var r = 30 - shrivel * 9 + pulse * 4;
    var g = ctx.createRadialGradient(player.x, player.y, 1, player.x, player.y, r);
    g.addColorStop(0, 'rgba(' + SOUR_GLOW + ',' + (0.26 * shrivel).toFixed(3) + ')');
    g.addColorStop(0.55, 'rgba(' + SOUR_GLOW_EDGE + ',' + (0.14 * shrivel).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(' + SOUR_GLOW_EDGE + ',0)');
    ctx.fillStyle = g;
    ctx.fillRect(player.x - r, player.y - r, r * 2, r * 2);
  }

  /* everything the room does while the run is hot: speed lines tearing
     past, a paprika wash over the coop, and a glow around the doodad.
     Drawn on the pixel layer behind the doodad, so it reads as light in
     the room rather than a filter over the picture. */
  function drawHeat(ctx) {
    var pulse = 0.75 + 0.25 * Math.sin(t * 9);
    var a = ctx.globalAlpha;
    for (var i = 0; i < streaks.length; i++) {
      var s = streaks[i];
      ctx.globalAlpha = a * heat * (s.bright ? 0.7 : 0.4);
      ctx.fillStyle = s.bright ? FX.hotHi : FX.hotMid;
      ctx.fillRect(Math.round(s.x), Math.round(s.y), s.len, 1);
    }
    ctx.globalAlpha = a;

    Tint.rect(ctx, 0, CEIL, VW, FLOOR - CEIL, FX.heat, heat * 2.4);
    Tint.rect(ctx, 0, CEIL, 54, FLOOR - CEIL, FX.heatEdge, heat * 3 * pulse);
    Tint.rect(ctx, VW - 54, CEIL, 54, FLOOR - CEIL, FX.heatEdge, heat * 3 * pulse);

    if (state === 'play') {
      var r = 34 + pulse * 6;
      var g = ctx.createRadialGradient(player.x, player.y, 2, player.x, player.y, r);
      g.addColorStop(0, 'rgba(' + FX.glowCore + ',' + (0.30 * heat).toFixed(3) + ')');
      g.addColorStop(0.5, 'rgba(' + FX.glowEdge + ',' + (0.16 * heat).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(' + FX.glowEdge + ',0)');
      ctx.fillStyle = g;
      ctx.fillRect(player.x - r, player.y - r, r * 2, r * 2);
    }
  }

  function drawChars(ctx) {
    /* whoever is hiding goes first, so the player passes in front of him */
    drawMeet(ctx);
    /* blink through the grace period, faster as it runs out */
    if (invuln > 0 && Math.floor(invuln * (invuln < 0.6 ? 22 : 12)) % 2 === 0) return;
    /* mouth open while his hunger has hold of something, and only if he
       actually has that frame - Doodads.draw falls back on its own */
    var frame = player.flapTimer > 0;
    if (hungry > 0 && nearestPull > 0.12) frame = 'eat';
    /* a slight throb while it is lit up, as though the heat is getting to it */
    var o = null;
    if (heat > 0.02) {
      var th = 1 + heat * 0.05 * Math.sin(t * 16);
      o = { squashX: 1 / th, squashY: th };
    }
    /* and a faster, shallower one while shrivelled: the heat is a throb, the
       lime is a buzz, and both can be running at once */
    if (shrivel > 0.02) {
      var sh = 1 + shrivel * 0.04 * Math.sin(t * 23);
      if (o) { o.squashX /= sh; o.squashY *= sh; }
      else o = { squashX: 1 / sh, squashY: sh };
    }
    /* the drawn size IS the current size - the sprite sits on the smooth
       layer, so any radius costs the same */
    Doodads.draw(ctx, doodad.id, player.x, player.y, bodyR(), player.angle, frame, o);
  }

  function drawFg(ctx) {
    hot.length = 0;
    if (flash > 0) { ctx.fillStyle = '#f7e6c0'; ctx.fillRect(0, 0, VW, VH); }
    if (saveFlash > 0) {
      /* a wash, not a white-out: the run carries straight on and the player
         has to keep seeing the pillar they just got let off */
      var sa = ctx.globalAlpha;
      ctx.globalAlpha = sa * clamp(saveFlash / 0.13, 0, 1) * 0.42;
      ctx.fillStyle = '#c9f0dd';
      ctx.fillRect(0, 0, VW, VH);
      ctx.globalAlpha = sa;
      /* and a brighter rim, so it still lands as an event */
      var rim = clamp(saveFlash / 0.13, 0, 1);
      Tint.rect(ctx, 0, 0, VW, 6, '#c9f0dd', rim * 12);
      Tint.rect(ctx, 0, VH - 6, VW, 6, '#c9f0dd', rim * 12);
      Tint.rect(ctx, 0, 0, 6, VH, '#c9f0dd', rim * 12);
      Tint.rect(ctx, VW - 6, 0, 6, VH, '#c9f0dd', rim * 12);
    }
    if (spicyFlash > 0) {
      var fa = ctx.globalAlpha;
      ctx.globalAlpha = fa * clamp(spicyFlash / 0.14, 0, 1);
      ctx.fillStyle = '#ffd08a';
      ctx.fillRect(0, 0, VW, VH);
      ctx.globalAlpha = fa;
    }
    if (sourFlash > 0) {
      var qa = ctx.globalAlpha;
      ctx.globalAlpha = qa * clamp(sourFlash / 0.14, 0, 1);
      ctx.fillStyle = SOUR_HI;
      ctx.fillRect(0, 0, VW, VH);
      ctx.globalAlpha = qa;
    }
    if (stunFlash > 0) {
      /* shorter and paler than the other three: this is a jolt, not an
         event, and the run is carrying straight on underneath it */
      var ra = ctx.globalAlpha;
      ctx.globalAlpha = ra * clamp(stunFlash / 0.08, 0, 1) * 0.6;
      ctx.fillStyle = '#ffe9e4';
      ctx.fillRect(0, 0, VW, VH);
      ctx.globalAlpha = ra;
    }

    /* score */
    if (state !== 'dead') {
      /* `spiced`, not `hot`: `hot` is this scene's target list and `var` is
         function-scoped, so a local of that name in here would hide it */
      var spiced = spicy > 0;
      var s = scorePop > 0 ? 4 : 3;
      UI.heading(ctx, String(score), VW / 2, 34 - (scorePop > 0 ? 3 : 0), s, {
        colour: spiced ? (scorePop > 0 ? '#ffe9bd' : '#ffb45c')
                       : (scorePop > 0 ? '#fff3d0' : UI.C.ink),
        outline: spiced ? '#5c1a08' : UI.C.shadow,
        wave: spiced ? t * 9 : undefined, waveAmp: 1
      });
      drawChase(ctx, 34 + s * 7 + 4);
      drawLives(ctx);
      drawSpicy(ctx);
      drawSour(ctx);
      if (stunBanner > 0) drawStun(ctx);
      if (nervePop > 0) drawNerve(ctx);
      if (goldPop > 0) drawGold(ctx);
      if (boonBanner > 0 || saveBanner > 0) drawSaveBanner(ctx);
      if (unlockBanner > 0) drawUnlockBanner(ctx);
      else if (hazardWarn > 0) drawHazardWarning(ctx);
    }

    if (state === 'ready') drawReady(ctx);
    if (state === 'paused') drawPause(ctx);
    if ((state === 'dead' || state === 'entry') && deadTimer > 0.28) drawGameOver(ctx);
  }

  /* The spare lives, as little succulents in the top left corner - clear of
     the score (centred, y 31..62), the chase line and the SPICY gauge. */
  function drawLives(ctx) {
    if (lives <= 0 && lifePop <= 0) return;
    for (var i = 0; i < lives; i++) {
      var x = 9 + i * 13, y = 9;
      var pop = (lifePop > 0 && i === lives - 1) ? Math.round(Math.sin(lifePop / 0.45 * Math.PI) * 2) : 0;
      y -= pop;
      ctx.fillStyle = UI.C.shadow;
      ctx.fillRect(x - 1, y + 1, 10, 9);
      ctx.fillStyle = LIFE_LEAF;
      ctx.fillRect(x + 1, y + 3, 6, 3); ctx.fillRect(x + 2, y + 2, 4, 1);
      ctx.fillStyle = LIFE_PALE;
      ctx.fillRect(x + 3, y + 1, 2, 2); ctx.fillRect(x + 2, y + 3, 2, 1);
      ctx.fillStyle = LIFE_TIP;
      ctx.fillRect(x, y + 4, 1, 1); ctx.fillRect(x + 7, y + 4, 1, 1);
      ctx.fillStyle = '#b76a44';
      ctx.fillRect(x + 1, y + 6, 6, 3);
      ctx.fillStyle = '#d99a6a';
      ctx.fillRect(x + 1, y + 6, 6, 1);
      ctx.fillStyle = UI.C.shadow;
      ctx.fillRect(x + 1, y + 9, 6, 1);
    }
  }

  /* the shout for a plank taken close enough to count, thrown where she
     took it rather than into the middle of the screen */
  function drawNerve(ctx) {
    if (state === 'entry') return;
    var k = clamp(nervePop / 0.5, 0, 1);
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * (k > 0.6 ? 1 : k / 0.6);
    UI.text(ctx, 'NERVE +' + nerveGain, nerveX, nerveY - (1 - k) * 15,
            { align: 'center', colour: doodad.accentLight, shadow: UI.C.shadow });
    ctx.globalAlpha = ga;
  }

  /* and the shout for a can caught, thrown the same way and for the same
     reason: where it happened, not into the contested middle of the screen */
  function drawGold(ctx) {
    if (state === 'entry') return;
    var k = clamp(goldPop / 0.6, 0, 1);
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * (k > 0.6 ? 1 : k / 0.6);
    /* the level's own word for it, in the score's gold either way: the
       colour is what says "+5", the word is only what says what it was */
    UI.text(ctx, (goldName || 'GOLD') + ' +' + GOLD_BONUS, goldX, goldY - (1 - k) * 15,
            { align: 'center', colour: UI.C.gold, shadow: UI.C.shadow });
    ctx.globalAlpha = ga;
  }

  /* the shout when a succulent is taken, and when one is spent */
  function drawSaveBanner(ctx) {
    if (state === 'entry') return;
    var ga = ctx.globalAlpha;
    if (saveBanner > 0) {
      ctx.globalAlpha = ga * clamp(saveBanner / 0.6, 0, 1);
      UI.heading(ctx, 'SAVED!', VW / 2, 112 - (1.5 - saveBanner) * 9, 3,
                 { colour: LIFE_PALE, outline: '#123a30', wave: t * 11, waveAmp: 1.4 });
      UI.text(ctx, spentPotted ? 'ONE ' + boonName + ' SPENT' : 'ONE LIFE SPENT',
              VW / 2, 140 - (1.5 - saveBanner) * 9,
              { align: 'center', colour: LIFE_LEAF, shadow: UI.C.shadow });
    } else if (boonBanner > 0) {
      ctx.globalAlpha = ga * clamp(boonBanner / 0.6, 0, 1);
      UI.heading(ctx, boonBonus ? '+' + BOON_BONUS : 'EXTRA LIFE', VW / 2,
                 112 - (1.4 - boonBanner) * 9, boonBonus ? 3 : 2,
                 { colour: LIFE_PALE, outline: '#123a30' });
      UI.text(ctx, boonBonus ? 'NO ROOM FOR IT' : boonName, VW / 2,
              136 - (1.4 - boonBanner) * 9,
              { align: 'center', colour: LIFE_LEAF, shadow: UI.C.shadow });
    }
    ctx.globalAlpha = ga;
  }

  /* the heat gauge under the score, and the shout when one is caught */
  function drawSpicy(ctx) {
    if (state === 'entry') return;
    if (spicyBanner > 0) {
      var a = ctx.globalAlpha;
      /* it rises as it fades, but never far enough to reach the gauge.
         it thins out early too: this is the point in a run where the
         coop speeds up, and a solid caption would hide the next plank */
      var lift = (1.1 - spicyBanner) * 11;
      ctx.globalAlpha = a * clamp(spicyBanner / 0.6, 0, 1);
      UI.heading(ctx, 'SPICY!', VW / 2, 112 - lift, 3,
                 { colour: '#ffb45c', outline: '#5c1a08', wave: t * 11, waveAmp: 1.4 });
      UI.text(ctx, 'DOUBLE POINTS', VW / 2, 138 - lift,
              { align: 'center', colour: '#ff8a3c', shadow: UI.C.shadow });
      ctx.globalAlpha = a;
    }

    if (heat < 0.02) return;
    /* the last stretch blinks, so running out is never a surprise */
    if (spicy > 0 && spicy < 1.8 && Math.floor(t * 8) % 2 === 0) return;
    /* The lime may be up too, and it no longer changes a word of this: the
       caption stands beside its own bar now, so each power-up names itself
       on its own row and neither has to know the other is there. */
    drawGauge(ctx, clamp(spicy / SPICY_TIME, 0, 1), heat, SPICY_GAUGE,
              'SPICY  X' + SPICY_MULT, spicySlot);
  }

  /* The gauge body, shared by the heat and the lime: panel, three fill rows,
     a bright tip and a label beside it. `y` defaults to 80, which is the
     slot both used to share - and the old comment here said that a level
     wanting the pair at once should give the second one y 92 rather than
     stand it down. THE WHITEBOARD grows both, so there are two rows now
     and each caller passes its own: spicySlot and sourSlot, claimed at
     the moment of the catch and held until the power-up dies. A row
     worked out per frame from what else was live meant a bar that moved
     while it was counting down. */
  var SPICY_GAUGE = { panel: '#2a1008', edge: '#6b2a12', base: '#c8452a',
                      mid: '#f0722c', top: '#ffd08a', label: '#ff8a3c' };
  var SOUR_GAUGE  = { panel: '#10240a', edge: '#2d5c1c', base: '#3f7a2a',
                      mid: '#6fb838', top: '#d6ff7a', label: '#8fd44a' };

  function drawGauge(ctx, k, alpha, cols, label, y) {
    var w = 104, x = Math.round((VW - w) / 2);
    if (y === undefined) y = 80;
    var fill = Math.max(0, Math.round((w - 2) * k));
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * clamp(alpha, 0, 1);
    UI.panel(ctx, x - 1, y - 1, w + 2, 8, { fill: cols.panel, edge: cols.edge });
    ctx.fillStyle = cols.base; ctx.fillRect(x + 1, y + 1, fill, 4);
    ctx.fillStyle = cols.mid;  ctx.fillRect(x + 1, y + 1, fill, 3);
    ctx.fillStyle = cols.top;  ctx.fillRect(x + 1, y + 1, fill, 1);
    ctx.fillStyle = '#fff3d0'; ctx.fillRect(x + 1, y + 1, Math.min(fill, 2), 4);
    /* THE CAPTION STANDS BESIDE ITS BAR, NOT UNDER IT, BECAUSE UNDER IT IS
       NOT FREE. Two things wanted the rows beneath the gauges. A caption at
       y + 11 is 7 rows tall, so two stacked bars could not both carry one -
       the upper caption landed exactly where the lower panel goes - and
       the pair worked around that by sharing a single line written by the
       LOWER bar. But the lower bar has no clear air under it either:
       SPICY!, SOUR! and RING RING! all shout at 112 and rise 11 rows as
       they fade, and a scale-3 heading with a 3px outline and a 3px wave
       owns rows 94..133 for the whole 1.1 seconds it is up. The pair's one
       caption sat at 103..109, dead inside it, and was mush exactly when
       the player looked at it; even the single bar's caption at 91 was
       grazed by the outline.
       Beside the bar nothing is contested. The panel is 104 wide and
       centred, so x 0..186 at gauge height is empty on every level and in
       every HUD state - the lives are at y 9, the score and the chase line
       stop at 73. Right-aligned at the panel's edge and on the bar's own
       rows, which means each bar names itself, two of them read as two
       labelled rows, there is no order to get wrong, and a caption never
       moves while its power-up is counting down. */
    if (label) {
      UI.text(ctx, label, x - 5, y,
              { align: 'right', colour: cols.label, shadow: UI.C.shadow });
    }
    ctx.globalAlpha = ga;
  }

  /* the lime's gauge and shout, the heat's twin in every respect but one:
     it says what it took away rather than what it gave */
  function drawSour(ctx) {
    if (state === 'entry') return;
    if (sourBanner > 0) {
      var a = ctx.globalAlpha;
      var lift = (1.1 - sourBanner) * 11;
      ctx.globalAlpha = a * clamp(sourBanner / 0.6, 0, 1);
      UI.heading(ctx, 'SOUR!', VW / 2, 112 - lift, 3,
                 { colour: SOUR_HI, outline: SOUR_DARK, wave: t * 11, waveAmp: 1.4 });
      UI.text(ctx, 'SMALLER HITBOX', VW / 2, 138 - lift,
              { align: 'center', colour: SOUR_MID, shadow: UI.C.shadow });
      ctx.globalAlpha = a;
    }

    if (shrivel < 0.02) return;
    if (sour > 0 && sour < 1.8 && Math.floor(t * 8) % 2 === 0) return;
    /* It no longer stands down for the heat, it takes the other row: a
       level that sheds both - the Whiteboard does - wants to be able to
       see both running out. The row was `both ? 92 : 80`, worked out
       afresh every frame, so the bar and its caption jumped 12px the
       instant the heat's alpha fell under 0.02 and left the lime looking
       like a glitch. It now stands wherever it was standing when it was
       caught, and only grabSour moves it. */
    drawGauge(ctx, clamp(sour / SOUR_TIME, 0, 1), shrivel, SOUR_GAUGE,
              'SOUR  SMALL', sourSlot);
  }

  /* The shout when something rings: the SPICY slot, with the same lift and
     the same fade, because it is the same kind of news - a thing just
     happened to you in the middle of the screen. The level supplies both
     lines, so RING RING! here and whatever the next one of these is
     elsewhere, and the engine never has to know which level it is in. */
  function drawStun(ctx) {
    if (state === 'entry') return;
    var lift = (1.1 - stunBanner) * 11;
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * clamp(stunBanner / 0.6, 0, 1);
    /* the wave is faster and shallower than SPICY!'s - it is a rattle,
       not a flourish */
    UI.heading(ctx, stunSay, VW / 2, 112 - lift, 3,
               { colour: '#ffe9e4', outline: '#5a1e1e', wave: t * 14, waveAmp: 1.6 });
    UI.text(ctx, stunSub, VW / 2, 138 - lift,
            { align: 'center', colour: '#ffb3a7', shadow: UI.C.shadow });
    ctx.globalAlpha = a;
  }

  /* something just came unlocked, mid-flight */
  function drawUnlockBanner(ctx) {
    if (state === 'entry') return;
    var head = bannerQueue[0];
    if (!head) return;
    var lvl = head.kind === 'level' ? head.it : null;
    var d = head.kind === 'doodad' ? head.it : null;
    var rm = head.kind === 'room' ? head.it : null;
    var a = clamp(unlockBanner / 0.6, 0, 1);
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * a;
    if (rm) {
      /* A whole room, which is the biggest thing a score has ever opened -
         and it happens MID-RUN, which is where it belongs: the plank that
         paid for it is the one that just went past. Game.selection is
         deliberately not touched, so RETRY still retries the bay being
         played and the player goes and finds the new room themselves. */
      UI.heading(ctx, 'ROOM UNLOCKED', VW / 2, 96, 2, { colour: UI.C.gold, outline: UI.C.shadow });
      UI.heading(ctx, rm.name, VW / 2, 116, 3,
                 { colour: UI.C.ink, outline: UI.C.shadow, wave: t * 8, waveAmp: 1.2 });
      UI.text(ctx, 'OPEN ON THE LEVEL SELECT', VW / 2, 142,
              { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
    } else if (lvl) {
      UI.heading(ctx, 'LEVEL UNLOCKED', VW / 2, 96, 2, { colour: UI.C.gold, outline: UI.C.shadow });
      UI.heading(ctx, lvl.name, VW / 2, 116, 3,
                 { colour: UI.C.ink, outline: UI.C.shadow, wave: t * 8, waveAmp: 1.2 });
      UI.text(ctx, 'OPEN ON THE LEVEL SELECT', VW / 2, 142,
              { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
    } else {
      UI.heading(ctx, 'DOODAD UNLOCKED', VW / 2, 96, 2, { colour: UI.C.gold, outline: UI.C.shadow });
      UI.heading(ctx, d.name, VW / 2, 116, 3,
                 { colour: d.accentLight, outline: UI.C.shadow, wave: t * 8, waveAmp: 1.2 });
      UI.text(ctx, 'WAITING IN THE COOP', VW / 2, 142,
              { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
    }
    ctx.globalAlpha = ga;
  }

  /* Put an unlock in the queue. It waits its turn rather than shoving the
     one on screen aside, so two landing together are both seen. */
  function announce(kind, it) {
    bannerQueue.push({ kind: kind, it: it });
    if (unlockBanner <= 0) unlockBanner = BANNER_TIME;
  }

  /* the one-off heads up when the rafters start letting go */
  function drawHazardWarning(ctx) {
    if (state === 'entry' || spicyBanner > 0 || sourBanner > 0 || stunBanner > 0) return;
    if (Math.floor(hazardWarn * 6) % 2) return;
    var w = warnLines;
    if (!w) return;
    UI.heading(ctx, w[0], VW / 2, 104, 2, { colour: UI.C.ink, outline: UI.C.shadow });
    UI.text(ctx, w[1], VW / 2, 124, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
  }

  /* The line under the score: who you are chasing on the table.

     Every line here carries a shadow. Without one the dim grey of NEXT
     sits on whatever the level's wall happens to be, and in a LIGHT room -
     a whiteboard, a plaster ceiling - it disappears entirely. The score
     above it has had an outline since the first level for the same reason;
     this is general, not the Whiteboard's special case. */
  function drawChase(ctx, y) {
    if (state === 'dead' || state === 'entry') return;
    if (passedTimer > 0) {
      if (Math.floor(passedTimer * 8) % 2 || passedTimer < 1.0) {
        /* no triangle: one lives in a pad and means "move this way" */
        UI.text(ctx, 'PASSED ' + passedName, VW / 2, y,
                { align: 'center', colour: UI.C.gold, shadow: UI.C.shadow });
      }
      return;
    }
    if (target) {
      UI.text(ctx, 'NEXT  ' + target.name + ' ' + target.score, VW / 2, y,
              { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
    } else if (board.length && score > 0) {
      UI.text(ctx, '\u2605 HIGH SCORE \u2605', VW / 2, y,
              { align: 'center', colour: UI.C.gold, shadow: UI.C.shadow });
    }
  }

  function drawReady(ctx) {
    var y = 168;
    UI.heading(ctx, 'GET READY', VW / 2, 74, 2, { colour: UI.C.gold });
    /* every doodad has one now, and every one of them is passive - so this
       is a reminder of what you are flying with, not a control to learn */
    UI.text(ctx, '\u2605 ' + doodad.ability, VW / 2, 156,
            { align: 'center', colour: doodad.accentLight, spacing: 2 });
    UI.panel(ctx, VW / 2 - 92, y, 184, 44, { fill: UI.C.darker, dither: 13, edge: UI.C.inkFaint });
    var rows = [
      ['FLY',   UI.forInput('SPACE / UP / W', 'SPACE / CLICK',  'TAP ANYWHERE')],
      ['MOVE',  UI.forInput('◀ ▶ / A D',      '◀ ▶ / THE PADS', '◀ ▶ PADS')],
      ['PAUSE', UI.forInput('P',              'P / II',         'II TOP RIGHT')]
    ];
    for (var i = 0; i < rows.length; i++) {
      UI.text(ctx, rows[i][1], VW / 2 - 84, y + 7 + i * 11, { colour: UI.C.ink });
      UI.text(ctx, rows[i][0], VW / 2 + 84, y + 7 + i * 11, { align: 'right', colour: UI.C.inkDim });
    }
    UI.hint(ctx, UI.forInput('PRESS UP TO FLY', 'CLICK OR PRESS UP TO FLY', 'TAP TO FLY'), 132, t);
  }

  function drawPause(ctx) {
    UI.scrim(ctx, 13);
    var w = 214, h = 122, x = (VW - w) / 2, y = (VH - h) / 2 - 4;
    UI.board(ctx, x, y, w, h, { highlight: UI.C.gold });
    UI.text(ctx, 'PAUSED', VW / 2, y + 9, { align: 'center', scale: 2, colour: UI.C.ink, shadow: UI.C.shadow });
    UI.rule(ctx, x + 12, y + 28, w - 24, UI.C.boardLo);

    /* On a phone the panel is two boards and nothing else. It used to be a
       list of key hints for keys the phone does not have, ending in "TAP II
       TO RESUME" - written across the middle of the screen, with the II
       outside the panel it was talking about. A tap anywhere resumes (the
       paused mode's rest zone), and RESUME is lit to say so; QUIT is the
       only other thing there is, which is also the way out of GET READY. */
    if (UI.touch()) {
      /* The panel itself, first and therefore underneath both boards: a tap
         that lands on the wood between them, or below QUIT, hits this and
         does nothing. Without it the paused mode's tap-anywhere-resumes rule
         reached inside the panel too, so a thumb that missed QUIT by a few
         pixels resumed the run instead - and a run resumed by accident is a
         doodad already falling. Outside the panel the rule still holds, which
         is what makes the big obvious gesture work. */
      hot.push({ x: x, y: y, w: w, h: h, id: 'panel' });
      UI.button(ctx, hot, x + 16, y + 38, w - 32, 32,
                { id: 'resume', a: 'confirm', label: 'RESUME', lit: true });
      UI.button(ctx, hot, x + 16, y + 76, w - 32, 32,
                { id: 'quit', label: 'QUIT TO LEVELS' });
      return;
    }

    /* a finger has no keys, so touch replaces the list; a cursor has the
       whole keyboard beside it, so it shares each line instead */
    var rows = UI.forInput([
      ['FLY', 'SPACE / UP / W'],
      ['MOVE', '◀ ▶  /  A  D'],
      ['PAUSE', 'P'],
      ['SOUND', 'M'],
      ['FULLSCREEN', 'F'],
      ['QUIT TO LEVELS', 'ESC']
    ], [
      ['FLY', 'SPACE / CLICK'],
      ['MOVE', '◀ ▶ / THE PADS'],
      ['PAUSE', 'P / II'],
      ['SOUND', 'M'],
      ['FULLSCREEN', 'F'],
      ['QUIT TO LEVELS', 'ESC']
    ], null);   /* touch never gets this far - it left with two boards above */
    for (var i = 0; i < rows.length; i++) {
      var ry = y + 36 + i * 11;
      UI.text(ctx, rows[i][0], x + 16, ry, { colour: UI.C.ink, shadow: UI.C.shadow });
      UI.text(ctx, rows[i][1], x + w - 16, ry, { align: 'right', colour: '#e8c98a', shadow: UI.C.shadow });
    }
    /* a click anywhere resumes too: the paused mode's rest zone is confirm,
       and the mouse runs through the very same zones a finger does */
    UI.hint(ctx, UI.forInput('PRESS P TO RESUME', 'CLICK ANYWHERE TO RESUME', ''),
            y + h + 8, t);
  }

  /* results (or initials entry) on the left, the table on the right */
  function drawGameOver(ctx) {
    UI.scrim(ctx, 11);
    /* The board grew from 156 tall to 210 so that four menu rows can be 30
       tall each - 42 CSS px on a phone - rather than the rows shrinking to
       fit a board sized for a list you only ever read. */
    var lx = 66, lw = 156, rx = 230, rw = 184, y = 30, h = 210;
    var entering = state === 'entry' || entryPending;
    var headline = rank === 0 ? 'HIGH SCORE!' : (rank > 0 ? 'RANKED ' + Scores.ordinal(rank) : 'GAME OVER');
    var flashing = rank === 0 && Math.floor(t * 4) % 2;

    UI.board(ctx, lx, y, lw, h, { highlight: rank >= 0 ? UI.C.gold : null });
    UI.text(ctx, headline, lx + lw / 2, y + 9, {
      align: 'center', scale: 2, colour: rank >= 0 && !flashing ? UI.C.gold : UI.C.ink, shadow: UI.C.shadow
    });
    UI.rule(ctx, lx + 10, y + 28, lw - 20, UI.C.boardLo);
    UI.text(ctx, 'SCORE', lx + 14, y + 38, { colour: UI.C.ink, shadow: UI.C.shadow });
    UI.text(ctx, String(score), lx + lw - 14, y + 36, { align: 'right', scale: 2, colour: UI.C.ink, shadow: UI.C.shadow });

    if (entering) drawEntry(ctx, lx, lw, y);
    else drawResultsMenu(ctx, lx, lw, y);

    drawBoard(ctx, rx, y, rw, h, entering);
  }

  function drawResultsMenu(ctx, lx, lw, y) {
    /* the HI line went: the table sitting beside this board already has the
       best score in it, on its own top row, in gold */
    if (unlocked.length) {
      var won = unlocked[unlocked.length - 1];
      UI.text(ctx, won.name + ' UNLOCKED!', lx + lw / 2, y + 54,
              { align: 'center', colour: Math.floor(t * 3) % 2 ? won.accentLight : UI.C.gold,
                shadow: UI.C.shadow });
    } else if (pbNew && score > 0) {
      UI.text(ctx, 'NEW ' + doodad.name + ' BEST!', lx + lw / 2, y + 54,
              { align: 'center', colour: doodad.accentLight, shadow: UI.C.shadow });
    }
    UI.rule(ctx, lx + 10, y + 66, lw - 20, UI.C.boardLo);

    /* Four boards, with the one you almost certainly want lit. This was the
       worst thing in the game: a vertical list navigated by two horizontal
       pads in the far corner, with the words themselves inert - so tapping
       TITLE started another run. */
    for (var i = 0; i < MENU.length; i++) {
      var my = y + 72 + i * 34;
      UI.button(ctx, hot, lx + 10, my, lw - 20, 30,
                { id: 'row', i: i, a: 'confirm', label: MENU[i].label, lit: i === menuIndex });
      /* the marker beside the chosen row, for the keyboard that moves it.
         A phone presses the row and needs nothing pointing at it. */
      if (i === menuIndex && !UI.touch()) UI.marker(ctx, lx + 2, my + 15, t);
    }
  }

  /* Three letters, each with its own pair of pads, and one SAVE board.

     This used to be a row of five identical pads in the bottom left corner -
     left, right, up, down and SAVE - driving three letters at the other end
     of the screen, with the letters themselves inert. The obvious thing to
     press did nothing at all. Now the column you want is the column you
     touch, the arrows sit directly above and below the letter they change,
     and the initials arrive pre-filled with the last name saved, so most of
     the time SAVE is the only thing anyone has to press. */
  function drawEntry(ctx, lx, lw, y) {
    var cx = lx + lw / 2;
    UI.text(ctx, 'ENTER YOUR INITIALS', cx, y + 54, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });

    for (var i = 0; i < 3; i++) {
      var c = cx + (i - 1) * 36, x = c - 17;
      var active = i === cursor;
      UI.button(ctx, hot, x, y + 66, 34, 26, { id: 'up', i: i, a: 'up', label: '\u25B2', scale: 1 });
      /* the letter plate. Tapping it only moves the cursor here - a letter
         is not a verb, and nothing on this screen may lose a score. */
      UI.panel(ctx, x, y + 96, 34, 36, {
        fill: UI.C.darker, edge: active ? UI.C.gold : UI.C.inkFaint
      });
      hot.push({ x: x, y: y + 96, w: 34, h: 36, id: 'slot', i: i });
      UI.text(ctx, initials[i] === ' ' ? '_' : initials[i], c - 8, y + 103, {
        scale: 3, colour: active ? UI.C.gold : UI.C.ink, shadow: UI.C.shadow
      });
      ctx.fillStyle = active ? UI.C.gold : UI.C.boardLo;
      ctx.fillRect(x + 3, y + 128, 28, 2);
      UI.button(ctx, hot, x, y + 136, 34, 26, { id: 'down', i: i, a: 'down', label: '\u25BC', scale: 1 });
    }

    UI.button(ctx, hot, lx + 10, y + 172, lw - 20, 32,
              { id: 'save', a: 'confirm', label: 'SAVE', lit: true });

    /* a keyboard still has to be told it can just type; a phone is looking
       straight at every control it has */
    var line = UI.forInput('TYPE, OR \u25B2 \u25BC \u25C0 \u25B6    ENTER SAVES', 'TYPE, OR CLICK    ENTER SAVES', '');
    if (line) UI.text(ctx, line, cx, y + 218, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
  }

  /* the top ten, with this run slotted in live while initials are typed */
  function drawBoard(ctx, x, y, w, h, entering) {
    UI.panel(ctx, x, y, w, h, { fill: '#1b120a', edge: UI.C.inkFaint, corner: UI.C.gold });
    UI.text(ctx, 'HIGH SCORES', x + w / 2, y + 7, { align: 'center', colour: UI.C.gold, shadow: UI.C.shadow });
    UI.text(ctx, level.name, x + w / 2, y + 17, { align: 'center', colour: UI.C.inkFaint });

    var rows = entering ? Scores.table(roomRef, level).slice() : Scores.table(roomRef, level);
    var mark = entering ? rank : savedRow;
    if (entering) {
      rows.splice(rank, 0, { name: initials.join(''), score: score, doodad: doodad.id });
      if (rows.length > Scores.SIZE) rows.length = Scores.SIZE;
    }

    /* 16px rows rather than 12: the board beside this one grew to fit four
       pressable menu rows, so there is the height here to spend */
    for (var i = 0; i < Scores.SIZE; i++) {
      var ry = y + 32 + i * 16;
      var e = rows[i];
      var mine = i === mark && mark >= 0;
      if (mine && (entering || deadTimer < 4 ? Math.floor(t * 5) % 2 === 0 : true)) {
        ctx.fillStyle = '#4a3017';
        ctx.fillRect(x + 3, ry - 3, w - 6, 14);
      }
      var ink = mine ? UI.C.gold : (e ? Scores.rankColour(i) : UI.C.inkFaint);
      UI.text(ctx, Scores.ordinal(i), x + 8, ry, { colour: e ? Scores.rankColour(i) : UI.C.inkFaint });
      if (!e) {
        UI.text(ctx, '- - -', x + 40, ry, { colour: UI.C.inkFaint });
        continue;
      }
      UI.text(ctx, e.name.replace(/ /g, '_'), x + 40, ry, { colour: ink });
      var dd = e.doodad && Doodads.get(e.doodad);
      UI.text(ctx, dd ? dd.name : '?', x + 68, ry, { colour: dd ? dd.accentLight : UI.C.inkFaint });
      UI.text(ctx, String(e.score), x + w - 8, ry, { align: 'right', colour: ink });
    }
  }

  return {
    enter: enter, exit: exit, update: update, drawBg: drawBg, drawChars: drawChars, drawFg: drawFg,
    targets: function () { return hot; },
    /* a window into the run, for tuning and for testing */
    inspect: function () { return { state: state, player: player, obstacles: obstacles,
                                    score: score, runTime: runTime, rank: rank,
                                    spicy: spicy, heat: heat, dropArmed: dropArmed,
                                    ceilKills: CEIL_KILLS, ringing: ringing,
                                    late: late,
                                    sour: sour, shrivel: shrivel, hitR: hitR(),
                                    bodyR: bodyR(),
                                    unlocked: unlocked.map(function (d) { return d.id; }),
                                    wonLevels: wonLevels.map(function (l) { return l.id; }),
                                    lives: lives, invuln: invuln,
                                    pottedLives: pottedLives, spentPotted: spentPotted,
                                    planksUp: planksUp, flickCool: flickCool,
                                    flick: doodad && doodad.flick ? doodad.flick.reach : 0,
                                    banners: bannerQueue.map(function (b) { return b.kind + ':' + (b.it.id || b.it.name); }),
                                    meetOn: obstacles.filter(function (o) { return o.meet && !o.met; }).length,
                                    boonsTaken: Doodads.boonsTaken(),
                                    limesTaken: Doodads.limesTaken(),
                                    size: doodad && doodad.size ? doodad.size : 1,
                                    hungry: hungry, pull: doodad ? doodad.pull : 0,
                                    trotting: trotting, watchA: watchA,
                                    nervePop: nervePop, nerveGain: nerveGain,
                                    goldPop: goldPop,
                                    ability: doodad ? doodad.ability : null,
                                    difficulty: tune ? difficulty() : null }; }
  };
})();
