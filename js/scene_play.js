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

  /* Pepper's DASH. She throws herself forward - which is INTO the oncoming
     obstacles, since the world comes at her from the right - and anything
     falling that she meets is knocked out of the air. Pillars and spikes
     are not: meeting one sooner is what the move costs. */
  var PULL_EAT = 26;                   /* inside this he is mid-swallow   */

  var SPICY_TIME  = 6.5;
  var SPICY_SPEED = 1.55;
  var SPICY_MULT  = 2;

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
  var dropTimer = 0, hazardWarn = 0, spicyGap = 0;
  var spicy = 0;               /* seconds of heat left */
  var heat = 0;                /* the same thing eased, for the visuals */
  var spicyFlash = 0, spicyBanner = 0;
  var streaks = [];            /* speed lines, only drawn while hot */
  var unlocked = [];           /* doodads this run has earned */
  var unlockBanner = 0;
  var wonLevels = [];          /* levels this run has opened up */
  var lives = 0;               /* spare lives in hand */
  var invuln = 0;              /* grace after a save, in seconds */
  var saveFlash = 0, saveBanner = 0;
  var lifePop = 0, boonBanner = 0, boonGap = 0, boonBonus = false;
  var spikeArmed = false;
  var dashLeft = 0, dashCool = 0, dashT = 0, dashWasCool = false;
  var hungry = 0;              /* things his hunger has hold of this frame */
  var nearestPull = 0;         /* how close the closest of them is, 0..1   */
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

  /* ----------------------------------------------------------- init */

  function enter() {
    roomRef = Game.room();
    level = Game.level();
    art = level.art;
    FX = art.FX;
    CEIL = art.CEIL;
    FLOOR = art.FLOOR;
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
    dropArmed = false; dropTimer = 0; hazardWarn = 0; spicyGap = 0; warnLines = null;
    spicy = 0; heat = 0; spicyFlash = 0; spicyBanner = 0;
    unlocked.length = 0; unlockBanner = 0; wonLevels.length = 0;
    /* lives never carry between runs: start() is what RETRY calls, so a
       lucky run would otherwise hand every retry after it a free save */
    lives = 0; invuln = 0; saveFlash = 0; saveBanner = 0;
    lifePop = 0; boonBanner = 0; boonGap = 0; boonBonus = false; spikeArmed = false;
    hungry = 0; nearestPull = 0;
    dashLeft = 0; dashCool = 0; dashT = 0; dashWasCool = false;
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

    var x = VW - rand(tune.dropAheadMin, tune.dropAheadMax);
    var fall = rand(tune.dropFallMin, tune.dropFallMax);
    /* the spicy one drifts down slower, to give it a chance of being
       caught rather than merely dodged */
    obstacles.push(art.makeDrop(x, spicy, spicy ? fall * 0.78 : fall));

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

  function splatter(x, y, hot, n) {
    for (var i = 0; i < n; i++) {
      particles.push({ x: x + rand(-3, 3), y: y + rand(-3, 3),
                       vx: rand(-64, 64) - speed * 0.12, vy: rand(-120, -20),
                       life: rand(0.3, 0.8), g: 380,
                       col: hot ? (chance(0.5) ? FX.hotMid : FX.hot)
                                : (chance(0.45) ? FX.splatHi : FX.splat) });
    }
  }

  /* ------------------------------------------------------------ dash */

  function startDash() {
    dashLeft = doodad.dash.time;
    dashT = 0;
    Audio3.play('dash');
    Screen.shake(2.2, 0.16);
    for (var i = 0; i < 18; i++) {
      particles.push({ x: player.x - 7 + rand(-4, 4), y: player.y + rand(-9, 9),
                       vx: rand(-170, -70) - speed * 0.2, vy: rand(-26, 26),
                       life: rand(0.14, 0.38), g: 0,
                       col: chance(0.5) ? doodad.accentLight : FX.motesHi });
    }
  }

  function updateDash(dt) {
    if (dashLeft > 0) {
      dashLeft -= dt;
      dashT += dt;
      /* a wake behind her for as long as it lasts */
      if (chance(dt * 60)) {
        particles.push({ x: player.x - 9 + rand(-3, 3), y: player.y + rand(-7, 7),
                         vx: rand(-200, -110) - speed * 0.3, vy: rand(-14, 14),
                         life: rand(0.1, 0.28), g: 0,
                         col: chance(0.45) ? doodad.accentLight : doodad.accent });
      }
      if (dashLeft <= 0) { dashLeft = 0; dashCool = doodad.dash.cool; dashWasCool = true; }
    } else if (dashCool > 0) {
      dashCool -= dt;
      if (dashCool <= 0) { dashCool = 0; if (dashWasCool) { Audio3.play('ready'); dashWasCool = false; } }
    }
  }

  /* ---------------------------------------------------------- hunger */

  /* the point a power-up is grabbed by - for the succulent that is the
     plant, which is offset from the pot it was growing in */
  function grabX(ob) { return ob.type === 'boon' ? ob.x + ob.dx : ob.x; }
  function grabY(ob) { return ob.type === 'boon' ? FLOOR - 12 + ob.dy : ob.y; }

  function nudge(ob, mx, my) {
    if (ob.type === 'boon') { ob.dx += mx; ob.dy += my; }
    else { ob.x += mx; ob.y += my; }
  }

  /* how far Gerald's reach actually extends, for the ring he draws */
  function pullReach() { return doodad && doodad.pull ? doodad.pull : 0; }

  function isPowerUp(ob) {
    if (ob.type === 'boon') return !ob.taken;
    return ob.type === 'drop' && ob.spicy && !ob.broken;
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

  /* ----------------------------------------------------- the succulent */

  function takeBoon(ob) {
    ob.taken = true;
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
    }
    Audio3.play('life');
    for (var i = 0; i < 26; i++) {
      var a = rand(0, TAU), sp = rand(30, 140);
      particles.push({ x: ob.x, y: FLOOR - 12, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 50,
                       life: rand(0.4, 1.0), g: -60,
                       col: chance(0.4) ? LIFE_PALE : (chance(0.5) ? LIFE_LEAF : LIFE_TIP) });
    }
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

    /* a save on the floor has to get off it, or it lands again next frame */
    if (cause === 'ground') {
      player.y = Math.min(player.y, FLOOR - HIT_R - 14);
      player.vy = -250;
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

  /* --------------------------------------------------------- the heat */

  function grabSpicy(ob) {
    /* a second one part way through tops the heat up rather than
       restarting it, so a lucky pair is worth chasing */
    spicy = spicy > 0 ? Math.min(SPICY_TIME * 1.6, spicy + SPICY_TIME * 0.6) : SPICY_TIME;
    spicyFlash = 0.14;
    spicyBanner = 1.1;
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

  function updateStreaks(dt) {
    if (heat < 0.02) return;
    for (var i = 0; i < streaks.length; i++) {
      var s = streaks[i];
      s.x -= speed * s.spd * dt;
      if (s.x + s.len < 0) streaks[i] = freshStreak(VW + rand(0, 60));
    }
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
      obstacles.push(art.makePillar(spawnCursor, gapY, gapH));

      /* hazards in the space between two pillars */
      var mid = spawnCursor + d.spacing * 0.5;
      if (spikesReady() && chance(d.spikes)) {
        var onCeiling = chance(0.42);
        /* how long a spike grows is the level's business: the Coop's nails
           are short and stubby, the Garden's mint runs away with itself */
        var lo = onCeiling ? (tune.spikeCeilMin || 13) : (tune.spikeFloorMin || 15);
        var hi = onCeiling ? (tune.spikeCeilMax || 21) : (tune.spikeFloorMax || 27);
        obstacles.push(art.makeSpikes(mid + rand(-14, 14), onCeiling ? 'ceil' : 'floor',
                                      randInt(3, 6), randInt(lo, hi)));
      }
      if (chance(0.55)) obstacles.push(art.makeLitter(mid + rand(-40, 40)));

      /* the succulent: rare, never twice in quick succession, and only on
         a level whose art actually grows one */
      if (boonGap > 0) boonGap--;
      else if (art.makeBoon && tune.boonChance && chance(tune.boonChance)) {
        obstacles.push(art.makeBoon(mid + rand(-30, 30)));
        boonGap = tune.boonGap || 5;
      }

      spawnCursor += d.spacing;
    }
  }

  /* -------------------------------------------------------- physics */

  function flap() {
    player.vy = FLAP;
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
    /* horizontal nudging - unless the dash has the wheel */
    if (dashLeft > 0) {
      player.vx = doodad.dash.speed;
    } else {
      var want = 0;
      if (Input.down('left')) want -= 1;
      if (Input.down('right')) want += 1;
      player.vx = approach(player.vx, want * MOVE_SPD, MOVE_ACC * dt);
    }
    player.x = clamp(player.x + player.vx * dt, X_MIN, X_MAX);
    if ((player.x <= X_MIN && player.vx < 0) || (player.x >= X_MAX && player.vx > 0)) player.vx = 0;

    /* gravity, integrated so a flap always reaches the same height */
    player.y += player.vy * dt + 0.5 * GRAVITY * dt * dt;
    player.vy = Math.min(player.vy + GRAVITY * dt, MAX_FALL);
    player.flapTimer -= dt;

    /* the rafters are solid but survivable */
    if (player.y - BODY_R < CEIL) {
      player.y = CEIL + BODY_R;
      if (player.vy < 0) player.vy *= -0.18;
    }

    /* tilt follows the arc */
    var target = player.vy < 0 ? -0.36 : clamp(player.vy / MAX_FALL * 1.25, -0.36, 1.05);
    player.angle = damp(player.angle, target, 0.0008, dt);
  }

  function die(cause) {
    if (state !== 'play' || invuln > 0) return;
    state = 'dying';
    spicy = 0;                 /* the run is over; let the coop cool off */
    flash = 0.09;
    player.vy = cause === 'ground' ? -95 : -170;
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
    player.y = FLOOR - BODY_R;
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
  function checkUnlocks() {
    var opened = Levels.noteScore(roomRef, level, score);
    for (var n = 0; n < opened.length; n++) {
      if (wonLevels.indexOf(opened[n]) < 0) wonLevels.push(opened[n]);
    }
    if (opened.length && !Doodads.masterKey()) {
      unlockBanner = 3.2;
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
    for (var i = 0; i < won.length; i++) unlocked.push(won[i]);
    unlockBanner = 3.2;
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
    Input.setTouchMode('text');
    Audio3.play(rank === 0 ? 'start' : 'select');
  }

  function updateEntry() {
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
        hit = circleHitsRect(player.x, player.y, HIT_R, r[0], r[1], r[2], r[3]);
      }
      if (!hit) continue;
      if (ob.type === 'boon') { takeBoon(ob); obstacles.splice(i, 1); continue; }
      if (ob.type !== 'drop') { if (hurt('obstacle')) return; continue; }
      if (ob.spicy) { grabSpicy(ob); obstacles.splice(i, 1); continue; }
      /* spicy cooks a drop; a dash simply knocks it out of the air */
      if (spicy > 0 || dashLeft > 0) { smashDrop(ob); obstacles.splice(i, 1); continue; }
      if (hurt('drop')) return;
    }
    if (player.y + HIT_R >= FLOOR) hurt('ground');
  }

  /* --------------------------------------------------------- update */

  function update(dt) {
    t += dt;

    if (state === 'paused') {
      if (Game.locked()) return;
      if (Input.hit('pause') || Input.hit('confirm')) { state = prePause; Audio3.play('pause'); }
      if (Input.hit('back')) { Audio3.play('back'); Game.go(LevelSelectScene, { focus: 'level' }); }
      return;
    }

    if (flash > 0) flash -= dt;
    if (spicyFlash > 0) spicyFlash -= dt;
    if (spicyBanner > 0) spicyBanner -= dt;
    if (hazardWarn > 0) hazardWarn -= dt;
    if (unlockBanner > 0) unlockBanner -= dt;
    if (invuln > 0) invuln -= dt;
    if (saveFlash > 0) saveFlash -= dt;
    if (saveBanner > 0) saveBanner -= dt;
    if (boonBanner > 0) boonBanner -= dt;
    if (lifePop > 0) lifePop -= dt;
    /* the heat eases in and out, so nothing about it snaps on or off */
    heat = damp(heat, spicy > 0 ? 1 : 0, 0.0004, dt);
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
        if (Input.hit('up')) { state = 'play'; player.vy = 0; flap(); }
        if (Input.hit('back')) { Audio3.play('back'); Game.go(CharSelectScene, {}); }
        if (Input.hit('pause')) { prePause = 'ready'; state = 'paused'; Audio3.play('pause'); }
      }
      return;
    }

    if (state === 'play') {
      if (!Game.locked()) {
        if (Input.hit('pause')) { prePause = 'play'; state = 'paused'; Audio3.play('pause'); return; }
        if (Input.hit('up')) flap();
        if (doodad.dash && dashLeft <= 0 && dashCool <= 0 && Input.doubleTap('right')) startDash();
      }
      runTime += dt;
      var d = difficulty();
      if (spicy > 0) {
        spicy -= dt;
        if (spicy <= 0) { spicy = 0; Audio3.play('cooldown'); }
      }
      speed = d.speed * (spicy > 0 ? SPICY_SPEED : 1);
      scroll += speed * dt;
      spawnCursor -= speed * dt;
      moveObstacles(dt, speed);
      spawnAhead();
      spawnDrops(dt, d);
      updateDash(dt);
      updatePlayer(dt);
      updateHunger(dt);
      collide();
      emberTrail(dt);
      if (scorePop > 0) scorePop -= dt;
      if (passedTimer > 0) passedTimer -= dt;
      return;
    }

    if (state === 'dying') {
      player.vy = Math.min(player.vy + GRAVITY * dt, MAX_FALL);
      player.y += player.vy * dt;
      player.x -= 24 * dt;
      player.angle += player.spin * dt;
      if (player.y + BODY_R >= FLOOR) land();
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
      if (Input.nav('up')) { menuIndex = (menuIndex + MENU.length - 1) % MENU.length; Audio3.play('move'); }
      if (Input.nav('down')) { menuIndex = (menuIndex + 1) % MENU.length; Audio3.play('move'); }
      if (Input.hit('confirm')) { Audio3.play('select'); MENU[menuIndex].act(); }
      if (Input.hit('back')) { Audio3.play('back'); Game.go(LevelSelectScene, { focus: 'level' }); }
    }
  }

  function moveObstacles(dt, spd) {
    for (var i = obstacles.length - 1; i >= 0; i--) {
      var ob = obstacles[i];
      ob.x -= spd * dt;
      if (ob.type === 'drop') {
        if (ob.broken > 0) {
          ob.broken -= dt;
          if (ob.broken <= 0) { obstacles.splice(i, 1); continue; }
        } else {
          ob.vy += art.DROP_GRAV * dt;
          ob.y += ob.vy * dt;
          ob.spin += ob.spinRate * dt;
          if (ob.y >= FLOOR - 4) landDrop(ob);
        }
      }
      if (ob.type === 'pillar' && !ob.scored && ob.x + ob.w < player.x) {
        ob.scored = true;
        score += spicy > 0 ? SPICY_MULT : 1;
        scorePop = spicy > 0 ? 0.42 : 0.32;
        Audio3.play(spicy > 0 ? 'scoreHot' : 'score');
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

    if (heat > 0.02) drawHeat(ctx);
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
    /* blink through the grace period, faster as it runs out */
    if (invuln > 0 && Math.floor(invuln * (invuln < 0.6 ? 22 : 12)) % 2 === 0) return;
    /* mouth open while his hunger has hold of something, and only if he
       actually has that frame - Doodads.draw falls back on its own */
    var frame = player.flapTimer > 0;
    /* the dash has no sprite of its own - she just beats her wings hard */
    if (dashLeft > 0) frame = Math.floor(dashT * 30) % 2 === 0;
    if (hungry > 0 && nearestPull > 0.12) frame = 'eat';
    /* a slight throb while it is lit up, as though the heat is getting to it */
    var o = null;
    if (heat > 0.02) {
      var th = 1 + heat * 0.05 * Math.sin(t * 16);
      o = { squashX: 1 / th, squashY: th };
    }
    Doodads.draw(ctx, doodad.id, player.x, player.y, BODY_R, player.angle, frame, o);
  }

  function drawFg(ctx) {
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

    /* score */
    if (state !== 'dead') {
      var hot = spicy > 0;
      var s = scorePop > 0 ? 4 : 3;
      UI.heading(ctx, String(score), VW / 2, 34 - (scorePop > 0 ? 3 : 0), s, {
        colour: hot ? (scorePop > 0 ? '#ffe9bd' : '#ffb45c')
                    : (scorePop > 0 ? '#fff3d0' : UI.C.ink),
        outline: hot ? '#5c1a08' : UI.C.shadow,
        wave: hot ? t * 9 : undefined, waveAmp: 1
      });
      drawChase(ctx, 34 + s * 7 + 4);
      drawLives(ctx);
      drawDashGauge(ctx);
      drawSpicy(ctx);
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

  /* Whether the dash is back yet, top left under the lives. A cooldown
     you cannot see is just an ability that randomly refuses. */
  function drawDashGauge(ctx) {
    if (!doodad.dash) return;
    var x = 9, y = lives > 0 ? 22 : 9, w = 30;
    var ready = dashCool <= 0 && dashLeft <= 0;
    var k = dashLeft > 0 ? 1 : (dashCool > 0 ? 1 - dashCool / doodad.dash.cool : 1);

    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x - 1, y - 1, w + 2, 7);
    ctx.fillStyle = UI.C.darker;
    ctx.fillRect(x, y, w, 5);
    var fw = Math.max(0, Math.round(w * clamp(k, 0, 1)));
    if (fw > 0) {
      /* Pepper's accent is a dark green, so a gauge painted in it vanishes
         into the HUD. Ready reads bright; cooling reads as her own colour
         filling back up. */
      ctx.fillStyle = ready ? doodad.accentLight : doodad.accent;
      ctx.fillRect(x, y, fw, 5);
      ctx.fillStyle = ready ? '#e8f4ec' : doodad.accentLight;
      ctx.fillRect(x, y, fw, 2);
    }
    ctx.fillStyle = ready ? doodad.accentLight : UI.C.inkFaint;
    ctx.fillRect(x, y, 1, 5);
    /* when it is back, a chevron pulses on the end of the bar */
    if (ready) {
      var bob = Math.round((Math.sin(t * 5) + 1) * 0.5);
      UI.chevron(ctx, x + w + 4 + bob, y + 2, 1, 3, doodad.accentLight);
    }
  }

  /* the shout when a succulent is taken, and when one is spent */
  function drawSaveBanner(ctx) {
    if (state === 'entry') return;
    var ga = ctx.globalAlpha;
    if (saveBanner > 0) {
      ctx.globalAlpha = ga * clamp(saveBanner / 0.6, 0, 1);
      UI.heading(ctx, 'SAVED!', VW / 2, 112 - (1.5 - saveBanner) * 9, 3,
                 { colour: LIFE_PALE, outline: '#123a30', wave: t * 11, waveAmp: 1.4 });
      UI.text(ctx, 'ONE SUCCULENT SPENT', VW / 2, 140 - (1.5 - saveBanner) * 9,
              { align: 'center', colour: LIFE_LEAF, shadow: UI.C.shadow });
    } else if (boonBanner > 0) {
      ctx.globalAlpha = ga * clamp(boonBanner / 0.6, 0, 1);
      UI.heading(ctx, boonBonus ? '+' + BOON_BONUS : 'EXTRA LIFE', VW / 2,
                 112 - (1.4 - boonBanner) * 9, boonBonus ? 3 : 2,
                 { colour: LIFE_PALE, outline: '#123a30' });
      UI.text(ctx, boonBonus ? 'POT ALREADY FULL' : 'SUCCULENT', VW / 2,
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

    var w = 104, x = Math.round((VW - w) / 2), y = 80;
    var k = clamp(spicy / SPICY_TIME, 0, 1);
    var fill = Math.max(0, Math.round((w - 2) * k));
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * clamp(heat, 0, 1);
    UI.panel(ctx, x - 1, y - 1, w + 2, 8, { fill: '#2a1008', edge: '#6b2a12' });
    ctx.fillStyle = '#c8452a'; ctx.fillRect(x + 1, y + 1, fill, 4);
    ctx.fillStyle = '#f0722c'; ctx.fillRect(x + 1, y + 1, fill, 3);
    ctx.fillStyle = '#ffd08a'; ctx.fillRect(x + 1, y + 1, fill, 1);
    ctx.fillStyle = '#fff3d0'; ctx.fillRect(x + 1, y + 1, Math.min(fill, 2), 4);
    UI.text(ctx, 'SPICY  X' + SPICY_MULT, VW / 2, y + 11,
            { align: 'center', colour: '#ff8a3c', shadow: UI.C.shadow });
    ctx.globalAlpha = ga;
  }

  /* a doodad just came unlocked, mid-flight */
  function drawUnlockBanner(ctx) {
    if (state === 'entry') return;
    var lvl = wonLevels[wonLevels.length - 1];
    var d = unlocked[unlocked.length - 1];
    if (!lvl && !d) return;
    var a = clamp(unlockBanner / 0.6, 0, 1);
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * a;
    if (lvl) {
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

  /* the one-off heads up when the rafters start letting go */
  function drawHazardWarning(ctx) {
    if (state === 'entry' || spicyBanner > 0) return;
    if (Math.floor(hazardWarn * 6) % 2) return;
    var w = warnLines;
    if (!w) return;
    UI.heading(ctx, w[0], VW / 2, 104, 2, { colour: UI.C.ink, outline: UI.C.shadow });
    UI.text(ctx, w[1], VW / 2, 124, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
  }

  /* the line under the score: who you are chasing on the table */
  function drawChase(ctx, y) {
    if (state === 'dead' || state === 'entry') return;
    if (passedTimer > 0) {
      if (Math.floor(passedTimer * 8) % 2 || passedTimer < 1.0) {
        UI.text(ctx, '\u25B2 PASSED ' + passedName, VW / 2, y, { align: 'center', colour: UI.C.gold });
      }
      return;
    }
    if (target) {
      UI.text(ctx, 'NEXT  ' + target.name + ' ' + target.score, VW / 2, y,
              { align: 'center', colour: UI.C.inkDim });
    } else if (board.length && score > 0) {
      UI.text(ctx, '\u2605 HIGH SCORE \u2605', VW / 2, y, { align: 'center', colour: UI.C.gold });
    }
  }

  function drawReady(ctx) {
    var y = 168;
    UI.heading(ctx, 'GET READY', VW / 2, 74, 2, { colour: UI.C.gold });
    UI.panel(ctx, VW / 2 - 92, y, 184, 44, { fill: UI.C.darker, dither: 13, edge: UI.C.inkFaint });
    var touch = Input.usingTouch();
    UI.text(ctx, touch ? 'TAP THE SCREEN' : 'SPACE / UP / W', VW / 2 - 84, y + 7, { colour: UI.C.ink });
    UI.text(ctx, 'FLY', VW / 2 + 84, y + 7, { align: 'right', colour: UI.C.inkDim });
    UI.text(ctx, touch ? 'THE ◀ ▶ PADS' : '◀ ▶ / A D', VW / 2 - 84, y + 18, { colour: UI.C.ink });
    UI.text(ctx, 'MOVE', VW / 2 + 84, y + 18, { align: 'right', colour: UI.C.inkDim });
    UI.text(ctx, touch ? 'II TOP RIGHT' : 'P', VW / 2 - 84, y + 29, { colour: UI.C.ink });
    UI.text(ctx, 'PAUSE', VW / 2 + 84, y + 29, { align: 'right', colour: UI.C.inkDim });
    UI.hint(ctx, touch ? 'TAP TO FLY' : 'PRESS UP TO FLY', 132, t);
    /* a chevron bouncing above the doodad */
    UI.chevronV(ctx, player.x, player.y - 26 + Math.round(Math.sin(t * 6) * 2), -1, 4, UI.C.gold);
  }

  function drawPause(ctx) {
    UI.scrim(ctx, 13);
    var w = 214, h = 122, x = (VW - w) / 2, y = (VH - h) / 2 - 4;
    UI.board(ctx, x, y, w, h, { highlight: UI.C.gold });
    UI.text(ctx, 'PAUSED', VW / 2, y + 9, { align: 'center', scale: 2, colour: UI.C.ink, shadow: UI.C.shadow });
    UI.rule(ctx, x + 12, y + 28, w - 24, UI.C.boardLo);

    var rows = Input.usingTouch() ? [
      ['FLY', 'TAP THE SCREEN'],
      ['MOVE', 'THE ◀ ▶ PADS'],
      ['PAUSE', 'II TOP RIGHT'],
      ['RESUME', 'TAP II AGAIN']
    ] : [
      ['FLY', 'SPACE / UP / W'],
      ['MOVE', '◀ ▶  /  A  D'],
      ['PAUSE', 'P'],
      ['SOUND', 'M'],
      ['FULLSCREEN', 'F'],
      ['QUIT TO LEVELS', 'ESC']
    ];
    for (var i = 0; i < rows.length; i++) {
      var ry = y + 36 + i * 11;
      UI.text(ctx, rows[i][0], x + 16, ry, { colour: UI.C.ink, shadow: UI.C.shadow });
      UI.text(ctx, rows[i][1], x + w - 16, ry, { align: 'right', colour: '#e8c98a', shadow: UI.C.shadow });
    }
    UI.hint(ctx, Input.usingTouch() ? 'TAP II TO RESUME' : 'PRESS P TO RESUME', y + h + 8, t);
  }

  /* results (or initials entry) on the left, the table on the right */
  function drawGameOver(ctx) {
    UI.scrim(ctx, 11);
    var lx = 66, lw = 156, rx = 230, rw = 184, y = 46, h = 156;
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
    var hi = board.length ? Math.max(board[0].score, score) : score;
    UI.text(ctx, 'HI', lx + 14, y + 50, { colour: UI.C.inkDim, shadow: UI.C.shadow });
    UI.text(ctx, String(savedRow === 0 ? score : hi), lx + lw - 14, y + 50,
            { align: 'right', colour: UI.C.inkDim, shadow: UI.C.shadow });
    if (unlocked.length) {
      var won = unlocked[unlocked.length - 1];
      UI.text(ctx, won.name + ' UNLOCKED!', lx + lw / 2, y + 63,
              { align: 'center', colour: Math.floor(t * 3) % 2 ? won.accentLight : UI.C.gold,
                shadow: UI.C.shadow });
    } else if (pbNew && score > 0) {
      UI.text(ctx, 'NEW ' + doodad.name + ' BEST!', lx + lw / 2, y + 63,
              { align: 'center', colour: doodad.accentLight, shadow: UI.C.shadow });
    }
    UI.rule(ctx, lx + 10, y + 78, lw - 20, UI.C.boardLo);

    for (var i = 0; i < MENU.length; i++) {
      var my = y + 90 + i * 15;
      var sel = i === menuIndex;
      UI.text(ctx, MENU[i].label, lx + lw / 2 + 4, my, {
        align: 'center', colour: sel ? UI.C.gold : UI.C.ink, shadow: UI.C.shadow
      });
      if (sel) UI.marker(ctx, lx + lw / 2 - Font.measure(MENU[i].label, 1) / 2 - 10, my + 3, t);
    }
  }

  function drawEntry(ctx, lx, lw, y) {
    var cx = lx + lw / 2;
    UI.text(ctx, 'ENTER YOUR INITIALS', cx, y + 62, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });

    var slot = 22, gw = Font.GW * 3, sx = Math.round(cx - slot - gw / 2), ly = y + 86;
    for (var i = 0; i < 3; i++) {
      var x = sx + i * slot;
      var active = i === cursor;
      UI.text(ctx, initials[i] === ' ' ? '_' : initials[i], x, ly, {
        scale: 3, colour: active ? UI.C.gold : UI.C.ink, shadow: UI.C.shadow
      });
      ctx.fillStyle = active ? UI.C.gold : UI.C.boardLo;
      ctx.fillRect(x - 1, ly + 24, gw + 2, 2);
      if (active) {
        var bob = Math.round(Math.sin(t * 7));
        UI.chevronV(ctx, x + gw / 2, ly - 6 - bob, -1, 3, UI.C.gold);
        UI.chevronV(ctx, x + gw / 2, ly + 31 + bob, 1, 3, UI.C.gold);
      }
    }
    UI.text(ctx, Input.usingTouch() ? 'USE THE PADS BELOW' : 'TYPE, OR \u25B2\u25BC \u25C0\u25B6',
            cx, y + 124, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
    UI.text(ctx, Input.usingTouch() ? 'THEN SAVE' : 'ENTER TO SAVE',
            cx, y + 139, { align: 'center', colour: UI.C.gold, shadow: UI.C.shadow });
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

    for (var i = 0; i < Scores.SIZE; i++) {
      var ry = y + 30 + i * 12;
      var e = rows[i];
      var hot = i === mark && mark >= 0;
      if (hot && (entering || deadTimer < 4 ? Math.floor(t * 5) % 2 === 0 : true)) {
        ctx.fillStyle = '#4a3017';
        ctx.fillRect(x + 3, ry - 2, w - 6, 11);
      }
      var ink = hot ? UI.C.gold : (e ? Scores.rankColour(i) : UI.C.inkFaint);
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
    /* a window into the run, for tuning and for testing */
    inspect: function () { return { state: state, player: player, obstacles: obstacles,
                                    score: score, runTime: runTime, rank: rank,
                                    spicy: spicy, heat: heat, dropArmed: dropArmed,
                                    unlocked: unlocked.map(function (d) { return d.id; }),
                                    wonLevels: wonLevels.map(function (l) { return l.id; }),
                                    lives: lives, invuln: invuln,
                                    hungry: hungry, pull: doodad ? doodad.pull : 0,
                                    dashLeft: dashLeft, dashCool: dashCool,
                                    difficulty: tune ? difficulty() : null }; }
  };
})();
