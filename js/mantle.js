/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE MANTLE
   The view from the mantle shelf, looking up at a switched-off
   flatscreen that fills the whole wall. The room is in the glass -
   the sectional, the floor, two pendants, nothing in it brighter than
   a smudge - and under the bottom bezel there is a band of stacked
   ledger stone, cream and tan and grey-green and rust, sitting on a
   shelf of black painted wood. Drawn from Assets/Concept/Mantle ref
   1-4: the soundbar, the bright green pad on its tan stand, the white
   one beside it, the leaning game cases, the coiled HDMI lead, the
   dust and the scratches on the paint, and the little yellow capybara
   that is worth five points.

   WHAT THE LEVEL IS ABOUT. Remotes. Somebody is sitting on them, and
   they fire. A remote's signal is a BEAM: straight, thin, bright, and
   always in the same place in its cycle, because the cycle is keyed to
   SCROLL and not to a clock - the Deck's lesson, in red. 300px of
   scroll is one period, which is 2.63 seconds at speedStart and 1.70
   at speedMax, and a remote enters at x 480 and reaches the doodad at
   x 116 after 364px, so 1.21 periods go past before you arrive at one.
   You always see a full cycle first. That is the whole reason this bay
   can afford spikeChanceMax 0.68: a hazard you can READ is a hazard
   you can have a lot of.

   Then the GAME CONTROLLERS wake up. Past tune.lateScore their beams
   do not stand still - they lean, on their own ob.age, and they fire
   when they feel like it. That is the first unpredictable hazard in
   the room, so it arrives with art.WARN.late and the maker learns
   about it from run.late. Nothing in this game may get more lethal
   without that pair. What makes a wandering beam fair rather than
   cheap is that the AIM LINE IS ALWAYS DRAWN: a dotted blue walk along
   exactly the angle the beam will take, there the entire time the pad
   is idle, so the thing you have to read is never hidden.

   AND THE CEILING KILLS. Every solid thing hung off the top of this
   screen is drawn knowing that touching it ends the run - which is why
   the ceiling remotes hang in a clip that is only 10px deep, why the
   spare life stands on the shelf and never off the moulding, and why
   the beam that comes DOWN is the shorter of the two.

   Same discipline as js/deck.js and js/construction.js: every pixel in
   here is generated and baked once, and ANY shade laid over something
   that scrolls is a flat Tint or a baked sheet, never a Dither. The
   Bayer grid is anchored in user space, so a dithered rect that moves
   re-phases against the pattern and the pixels boil. There is no call
   to Dither.rect anywhere in this file, and the dead pixels tumble by
   swapping eight baked frames rather than by ctx.rotate, for the same
   reason.

   AND NO WASH IN HERE IS FLAT. This was the one file in the room that
   kept its flat full-width Tint.rects after the lighting pass was
   rebuilt, and they measured exactly what the pass had measured before
   it: three ruled lines across the television at 16, 8 and 8 of
   luminance, a lit rectangle with a visible corner where the floor
   lamp was meant to be, and a ten row shadow stripe above the shelf
   that stepped 11.6 in one row. A flat Tint of 5/16 over ten rows is a
   cliff of thirty on a bright surface and about eight on a dark one; a
   baked strip of the same depth is three a row. Every full-width shade
   in this bay now goes through wash(), pool() or
   LivingRoom.bakeShade, and the only hard edges left belong to things
   - a bezel, a plank seam, the arris of a shelf - which are allowed
   them, because an object has an edge and light does not.

   READABILITY. This is the darkest wall in the game. A black pillar on
   a near-black screen would be invisible, so the pillars are the STONE
   - the one pale mass in the bay - and the only black on them is the
   little mantle shelf capping each one at the mouth of the gap. The
   bright arris of that cap always faces INTO the gap: it is the edge
   that kills, and it is the one edge the eye must find in a hurry.
------------------------------------------------------------------ */
'use strict';

var Mantle = (function () {

  /* the room's geometry and the room's pigments, aliased the way every
     Living Room bay aliases them: R is the house, P is this wall */
  var CEIL = LivingRoom.CEIL;
  var FLOOR = LivingRoom.FLOOR;
  var R = LivingRoom.P;

  var P = {
    /* ---- the glass, and the room dimly in it ---------------------
       Nothing in the reflection may approach the STONE. That is the
       rule, and it used to be written as "nothing in the reflection is
       allowed to be bright", which is a stricter thing and the wrong
       one: it bought a lane that measured 24 to 68 from end to end,
       half the range of the next flattest level in the game, and a
       player crossing ten seconds of it had nothing to track. The
       pillars read because they are the one PALE MASS in the bay, and
       they keep reading as long as nothing in the glass comes near
       them. Inside that ceiling the reflection is allowed its own
       range, and Mantle ref 1 says what is in it: a grey sectional with
       cream pillows, a walnut coffee table with a plant and a lit glass
       on it, a round pouffe, two pendants and a lamplit oak floor with
       real tonal spread. */
    screenDeep:   '#0f1013',
    screenMid:    '#16181c',
    screenLo:     '#1e2024',
    reflCeil:     '#2c2823',
    reflWall:     '#232326',
    reflCouch:    '#34363a',
    reflCushion:  '#3f4146',
    reflPillow:   '#7d7668',   /* ref 3's cream pillows, two tones down */
    reflThrow:    '#4c463e',
    reflFloor:    '#3a332b',
    reflFloorWarm:'#413830',   /* every other board, a shade warmer     */
    reflFloorHi:  '#4a4238',
    reflFloorLit: '#7b6a52',   /* the boards directly under a pendant   */
    reflSeam:     '#2c2621',   /* a plank joint, four luminance down    */
    reflGlint:    '#a8946f',   /* satin oak throwing a pendant back     */
    reflTable:    '#241f1a',   /* the walnut table, ref 1 centre        */
    reflTableTop: '#3b3128',
    reflPlant:    '#39422f',
    reflGlass:    '#7e6c4e',
    reflPouffe:   '#45423c',
    reflPouffeLo: '#2b2926',
    reflLamp:     '#6b4a1e',
    reflLampHi:   '#9a6c2a',
    reflSpark:    '#55585f',

    /* the bezel along the bottom of the panel, and its badge */
    bezelDark:    '#1c1d20',
    bezel:        '#2e2f33',
    bezelHi:      '#4e5056',
    tvLogo:       '#8a8d94',

    /* ---- the ledger stone ---------------------------------------
       Straight off Mantle ref 2, which is almost a colour chart: thin
       flat pieces in cream, white, grey-green, grey, tan and slate,
       with one amber-rust streak running through every few courses.
       Six tones, weighted, is what keeps a wall of stone from reading
       as a brick texture. */
    stoneLit:       '#e7e1d6',
    stoneWhite:     '#d2cbbf',
    stoneCream:     '#bcb09b',
    stoneGreyGreen: '#8b9080',
    stoneGrey:      '#8d877c',
    stoneTan:       '#a4855a',
    stoneRust:      '#9a6436',
    stoneDark:      '#5f5346',
    stoneJoint:     '#3d352c',

    /* ---- the black painted wood ---------------------------------
       The shelf. Satin black, lit along its top arris, scuffed and
       dusty on the flat, and falling away into almost nothing on the
       face - ref 1 is mostly a photograph of this dust. */
    mantleGloss:   '#7a746a',
    mantleTop:     '#2a2724',
    mantleScuff:   '#4a443a',
    mantleScratch: '#8f8a80',
    mantleFace:    '#1a1715',
    mantleBevel:   '#35312c',
    mantleDeep:    '#0f0d0b',

    /* ---- the remotes --------------------------------------------- */
    remoteBody:   '#26262a',
    remoteLit:    '#4a4a50',
    remoteDark:   '#131315',
    remoteKey:    '#dcd8d0',
    remoteKeyLo:  '#9a978f',
    remoteRed:    '#d83a2a',
    led:          '#ff3a3a',
    ledOff:       '#5a1c1c',
    caddy:        '#5c5852',
    caddyLit:     '#7e7a72',

    /* the infrared signal, which is of course invisible, and which
       this level draws anyway because a hazard you cannot see is not
       a hazard, it is an accident */
    laserCore:    '#fff2ee',
    laser:        '#ff3030',
    laserEdge:    '#b02020',
    laserHalo:    '#5a1414',
    aim:          '#7a2a2a',
    aimHot:       '#ff7a6a',

    /* ---- the controllers ----------------------------------------- */
    ctrlBody:     '#2a2a2e',
    ctrlLit:      '#4a4a52',
    ctrlDark:     '#121214',
    ctrlStick:    '#3c3c44',
    ctrlRing:     '#eef0f4',
    ctrlRingBlue: '#5ab0ff',
    standTan:     '#c9a76a',
    standLo:      '#8f7142',

    /* and their beam, blue so that one glance says which kind of
       thing is firing at you */
    btCore:       '#eaf6ff',
    bt:           '#3f8dff',
    btEdge:       '#2452c8',
    btHalo:       '#14285e',
    btAim:        '#2a3f78',
    btAimHot:     '#7fb8ff',

    /* ---- the things standing on the shelf ------------------------ */
    soundbar:     '#26262a',
    soundbarLit:  '#3c3c40',
    mesh:         '#17171a',
    xboxGreen:    '#5ad04a',
    xboxGreenHi:  '#8de87a',
    xboxGreenLo:  '#2f7f2c',
    ctrlWhite:    '#e4e2de',
    ctrlWhiteLo:  '#9c9a96',
    caseGreen:    '#2d6b3a',
    caseBlue:     '#2a4a8a',
    caseWhite:    '#e8e6e2',
    cable:        '#0e0e10',
    cableHi:      '#2e2e32',

    /* ---- the falling things -------------------------------------- */
    pxRed:        '#ff2a2a',
    pxRedHi:      '#ff8a7a',
    pxRedLo:      '#a01818',
    pxGreen:      '#2aff3a',
    pxGreenHi:    '#9aff9a',
    pxGreenLo:    '#149a24',
    pxBlue:       '#2a5aff',
    pxBlueHi:     '#8aa8ff',
    pxBlueLo:     '#1830a0',
    pxWhite:      '#f4f4ff',
    pxOutline:    '#08080a',

    /* the VOL- key: the power-up. Green because the engine paints
       everything sour lime green, and because the Samsung remote in
       ref 2 has exactly one green key on it. */
    keyGreen:     '#5ec94a',
    keyGreenHi:   '#a6f08a',
    keyGreenLo:   '#2f7a2a',
    keyGlyph:     '#f2f6ee',

    /* the capybara off the end of the shelf - ref 2 and ref 3 */
    capyGold:     '#e6c04a',
    capyHi:       '#f6e08a',
    capyLo:       '#a8832a',
    capyInk:      '#1a1410',

    /* the spare life: a fresh AA out of the battery drawer. lifeJade
       and lifePale are PlayScene's LIFE_LEAF and LIFE_PALE - an extra
       life glows the same colour in every level in the game, or the
       colour teaches the player nothing. */
    battCopper:    '#c58a3a',
    battCopperHi:  '#e8b060',
    battSilver:    '#d8d8d4',
    battSilverHi:  '#f2f2ee',
    battSilverLo:  '#9c9c98',
    battBlack:     '#26262a',
    battMark:      '#2b2b2b',
    lifeJade:      '#5fae9a',
    lifePale:      '#93d8bd',

    /* air and shadow */
    lampWarm:     '#e8c98a',
    dust:         '#d9c9a6',
    outline:      '#0c0c0e',
    void:         '#08080a'
  };

  var END_MIN = LivingRoom.END_MIN;
  var CEIL_KILLS = LivingRoom.CEIL_KILLS;

  /* A dead pixel weighs nothing at all. 36 is the lightest thing that
     falls anywhere in the game - lighter than an apple's 34 only in
     that it also SPINS faster, so the flutter reads as weightless. */
  var DROP_GRAV = 36;
  var SPLAT_TIME = 1.5;

  /* The fifteen neutral effect colours PlayScene paints its particles,
     its dust and its washes out of. It never reads P. The puff is
     deliberately a cold blue-white: it fires when something comes off
     the top of the screen, and what comes off the top of this screen
     is SCREEN STATIC. */
  var FX = {
    motes:    LivingRoom.AIR.motes,  motesHi: LivingRoom.AIR.motesHi,
    puff:     '#9ab0d8',   puffHi:   '#dde8ff',
    ground:   '#4a443a',   groundHi: '#8a847a',
    splat:    '#ff4040',   splatHi:  '#f4f4ff',
    /* nothing in this bay is ever hot - there is no spicyChance in the
       tune - but the table is published complete, because a level that
       publishes eleven of fifteen keys is a level that throws on the
       day somebody adds a pepper to it */
    hot:      '#ff3030',   hotMid:   '#ff7a5a',  hotHi: '#ffd0c0',
    heat:     '#ff3030',   heatEdge: '#7a1818',
    glowCore: '255,208,192', glowEdge: '255,48,48'
  };

  /* the one-off heads up when a hazard arms: the thing, then the
     excuse. `ceil` is the room's, word for word, in all four bays. */
  var WARN = {
    drop:  ['▼ DEAD PIXELS ▼', 'THE PICTURE IS COMING APART'],
    spike: ['▲ REMOTES ▲', 'SOMEBODY IS SITTING ON THEM'],
    late:  ['▲ CONTROLLERS ▲', 'THESE ONES WANDER'],
    ceil:  LivingRoom.WARN_CEIL
  };

  /* the thirteen colours the generic level-select window would use.
     This bay paints its own cover below; the table stays honest. */
  var PREVIEW = {
    back: P.screenMid, backAlt: P.screenLo, seam: P.screenDeep,
    beam: P.stoneCream, beamDark: P.stoneDark, beamLight: P.stoneWhite,
    ground: P.mantleFace, groundDark: P.mantleDeep, groundHi: P.mantleGloss,
    spike: P.laser, spikeHi: P.laserCore, air: P.lampWarm, gloom: P.void
  };

  /* The captions PlayScene puts on the two things worth catching.
     CAPYBARA is eight letters and 'CAPYBARA +5' measures 65px, which is
     five past the 60px the Couch's comment fixes as the budget: the +5
     shout used to be clamped to x 30 flat, so the leading C drew from
     -2.5 and lost half of itself at the left edge. The engine clamps on
     the caption's own measured width now (js/scene_play.js, takeGold),
     so the name can be the animal rather than an abbreviation of it -
     and the Couch does not have to shorten the next one either. */
  var BOON_NAME = 'FRESH BATTERY';
  var GOLD_NAME = 'CAPYBARA';

  /* The +5 is rolled HERE and not in the tune, the way the three newest
     Backyard levels roll theirs: the art has to know it is drawing a
     capybara rather than a dead pixel, because a capybara is wider,
     falls three times as fast and wears a halo, and a drop whose maker
     does not know what it is gets a dead pixel's silhouette on a +5. */
  var GOLD_CHANCE = 0.035, GOLD_GAP = 6;
  var goldGap = 0;

  /* ------------------------------------------------------- the clock

     THE REMOTES' PERIOD, IN PIXELS OF WORLD rather than seconds, for
     the reasons js/deck.js gives for its misters: a beam that is on for
     N px blocks the same fraction of the approach at any speed, it
     freezes when the game pauses or the run dies because nothing moves
     then either, and the hazard gets twitchier exactly as fast as the
     run does. The Deck's fourth reason - that it cycles slowly on the
     GET READY screen - was never true here and is not true there
     either: start() empties the obstacle list and nothing spawns until
     the first flap, so there is no remote on screen to watch. What
     buys the player a whole cycle is the 364px of approach below.

     The period is measured off the remote's OWN x and not off the
     shared scroll, which is the same number at a constant offset and is
     the only one of the two that collide and drawBg agree about. See
     remotePhase.

     300px is 2.63 seconds at this level's speedStart of 114 and 1.70
     at its speedMax of 176. Those two numbers are in js/levels.js with
     a comment saying so; move them and this comment stops being true. */
  var BEAM_PERIOD = 300;

  /* The score the controllers key off. It is tune.lateScore, written
     out again here because a maker cannot read the tune - the engine
     hands over run.late and nothing else - and the roll below has to
     start at zero on the very point the WARN goes up. If lateScore
     moves in js/levels.js, this moves with it. */
  var LATE_SCORE = 18;

  /* How much of a remote is REMOTE. A spike's `len` is its whole reach
     into the room, plumbing included, exactly as a mister's is; take
     the body off it and what is left is the signal. The ceiling one
     hangs 10px in its clip, the floor one stands 14px on the shelf. */
  var BODY_CEIL = 10;
  var BODY_FLOOR = 14;

  /* A controller is 15px tall and its beam leaves the Xbox button two
     pixels down from the top of the pad. */
  var CTRL_BODY = 13;

  /* Half the window a controller's beam may be found in. ob.x is set
     this far LEFT of the emitter and ob.w is twice it, so every box
     the thing ever produces is inside [ob.x, ob.x + ob.w] - collide()
     culls on those two numbers and save() clears on them, and a box
     outside them is a box that is never tested and never cleared. */
  var CTRL_HALF = 38;

  /* A controller's beam is longer than a remote's, and on purpose. The
     tune hands over 18..28px of floor reach; a 27 degree lean on 20px
     of beam moves the tip six pixels, which is less than a hitbox and
     not worth putting a banner up for. 1.6x puts the reach at 20..45
     and the tip's travel at 9 to 21 - about a doodad wide, which is a
     wander you have to actually read. */
  var CTRL_STRETCH = 1.6;

  /* The two numbers the lean itself is made of. 0.30 + 0.18 radians is
     27.5 degrees off vertical at the very worst, and the two rates sum
     to at most 0.684 rad/s - 39 degrees a second - so the tip of the
     longest beam this bay makes sits at most 21px off upright and
     travels at most 30px a second, which is a doodad's width in two
     thirds of a second. Readable. Not chaseable. */
  var CTRL_SWING_A = 0.30, CTRL_RATE_A = 0.9;
  var CTRL_SWING_B = 0.18, CTRL_RATE_B = 2.3;

  var T = {};            /* every baked tile and sprite in the bay */

  /* The scroll, read once a frame by drawBackdrop. It is DRAWING ONLY -
     the walking band inside a beam and the pulse on a charging pad,
     both of which want every remote on screen in step with every other
     one and neither of which has a collision box. It used to carry the
     remotes' phase as well, and that was a bug worth a frame of death:
     collide runs before drawBg, so anything that reads this during a
     collision test is reading where the world was LAST frame. See
     remotePhase for what it reads instead and why. Nothing in here that
     kills may read this variable. */
  var scrollNow = 0;

  /* the room's helpers, by their short names, so the code in here
     reads the way the Backyard's does */
  var wrap = LivingRoom.wrap;
  var hash = LivingRoom.hash;
  var rowsFill = LivingRoom.rowsFill;
  /* The room's smoothstep and its per-row colour. They are published for
     exactly this: four bays each writing their own ramp is four chances
     to put an edge back, and this bay is the one that proved it. */
  var ease = LivingRoom.ease;
  var rgba = LivingRoom.rgba;

  /* A full-width wash laid row by row instead of as one flat Tint.
     `rows` is the run, `peak` the alpha at the end the shade is thrown
     from, and `fromTop` says which end that is. It is
     LivingRoom.bakeShade with the TILE's width rather than the screen's,
     so a shade may live inside a baked layer instead of over one -
     which is what the washes in the glass needed and what they did not
     have. Over near-black glass a ramp of 30 rows moves no row by more
     than one. */
  function wash(c, w, y0, rows, colour, peak, fromTop) {
    for (var i = 0; i < rows; i++) {
      var k = fromTop ? 1 - (i + 0.5) / rows : (i + 0.5) / rows;
      c.fillStyle = rgba(colour, peak * k);
      c.fillRect(0, y0 + i, w, 1);
    }
  }

  /* A baked ellipse of light, centred on cx,cy. The room bakes its
     pendant pools exactly this way and for exactly the same reason: a
     RECTANGLE of light has a corner, and a corner is a thing a player
     stops to read as if it were a wall. Everything that lights anything
     in this bay - the two lamps in the glass, the pools they throw on
     the reflected boards, the floor lamp off the right of the frame -
     is one of these, baked once and blitted. */
  function pool(c, cx, cy, rx, ry, colour, peak) {
    for (var y = -ry; y <= ry; y++) {
      for (var x = -rx; x <= rx; x++) {
        var dx = x / rx, dy = y / ry;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1) continue;
        c.fillStyle = rgba(colour, peak * (1 - ease(d)));
        c.fillRect(cx + x, cy + y, 1, 1);
      }
    }
  }

  /* The stone, weighted. Three parts white, three cream, two each of
     grey-green, grey and tan, one slate: count the pieces in Mantle
     ref 2 and that is roughly the mix. Rust is NOT in here - it is one
     streak per tile, placed on purpose, because in the photograph
     there is exactly one amber piece in any given armful. */
  var STONES = [
    P.stoneWhite, P.stoneWhite, P.stoneWhite,
    P.stoneCream, P.stoneCream, P.stoneCream,
    P.stoneGreyGreen, P.stoneGreyGreen,
    P.stoneGrey, P.stoneGrey,
    P.stoneTan, P.stoneTan,
    P.stoneDark
  ];

  /* ---------------------------------------------------------- tiles */

  /* One course of ledger stone laid left to right across `w` pixels: a
     run of flat pieces `lo` to `hi` long with a 1px joint between
     them, each lit along its top arris and dark along its bottom.
     Both the band behind the shelf and the pillars are made of this,
     because in the photograph they are the same stone - the wall wraps
     round the pilasters and keeps going.

     The run STARTS left of x0 by a random amount, which is the whole
     of what stops three courses from breaking joint in line and the
     wall from reading as brick. */
  function course(c, r, x0, y, w, hgt, lo, hi, bottom) {
    var x = x0 - Math.floor(r() * (hi - lo + 1));
    while (x < x0 + w) {
      var len = lo + Math.floor(r() * (hi - lo + 1));
      var col = STONES[Math.floor(r() * STONES.length)];
      var px = Math.max(x0, x);
      var pw = Math.min(x + len, x0 + w) - px;
      if (pw > 0) {
        c.fillStyle = col;        c.fillRect(px, y, pw, hgt);
        c.fillStyle = P.stoneLit; c.fillRect(px, y, pw, 1);
        c.fillStyle = bottom;     c.fillRect(px, y + hgt - 1, pw, 1);
      }
      /* the joint between this piece and the next */
      if (x + len >= x0 && x + len < x0 + w) {
        c.fillStyle = P.stoneJoint;
        c.fillRect(x + len, y, 1, hgt);
      }
      x += len + 1;
    }
  }

  /* the flecks that keep a flat piece of stone from reading as paint:
     single pixels of SOME OTHER piece's colour, scattered over the
     band. A stone is a slice through a rock, not a swatch. */
  function fleck(c, r, x0, y0, w, h, n) {
    for (var i = 0; i < n; i++) {
      c.fillStyle = STONES[Math.floor(r() * STONES.length)];
      c.fillRect(x0 + Math.floor(r() * w), y0 + Math.floor(r() * h), 1, 1);
    }
  }

  /* ------------------------------------------------------ the screen

     The furthest layer, and the biggest: a full 480x270 of switched-off
     glass with the room standing in it. It scrolls at 0.08, which is
     almost not at all, because a reflection belongs to the ROOM and not
     to the wall - the picture should drift behind the stone rather than
     travel with it.

     Everything in here is a block of flat colour with a SHAPE. There is
     no detail in a reflection on a dark panel - the moment you draw a
     cushion seam in here the panel stops being glass and becomes a
     window - but there is tone, and there used to be none: the lane
     measured 24 to 68 end to end, 43 of range against the next flattest
     level's 76, and a player had nothing to read between the pillars.
     Ref 1 is the answer and it is right there in the photograph. A
     sectional with cream pillows. A walnut coffee table with a plant on
     it and a glass catching a lamp. A round pouffe. Lit oak boards with
     seams and specular streaks. None of it goes anywhere near the
     stone, which is the only thing that would cost anything.

     EVERY FULL-WIDTH SHADE IN HERE IS A RAMP. They were flat Tints, and
     on the darkest field in the game they drew three ruled lines across
     the television at 16, 8 and 8 of luminance in a single row - the
     exact symptom the room's whole lighting pass was rebuilt to kill,
     reproduced inside a tile. See wash() and pool(). */
  function bakeScreen() {
    var W = VW, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(6120);
    var i, x, y, sx, seg;

    /* the glass. screenMid over screenDeep, with the panel a shade
       deeper at the very top and the very bottom - a sheet this big is
       never evenly dark, and the unevenness is what says sheet. Both
       deepenings are ramps, so neither has a rim. */
    c.fillStyle = P.screenDeep; c.fillRect(0, 0, W, H);
    c.fillStyle = P.screenMid;  c.fillRect(0, CEIL, W, 220 - CEIL);
    wash(c, W, CEIL, 26, P.screenLo, 0.25, true);
    wash(c, W, 196, 24, P.screenLo, 0.1875, false);

    /* 1. the room's own ceiling, reflected, stepping away from you. It
       was three flat bands, on the reasoning that "a gradient down
       thirty rows of near-black is thirty nearly-identical tints bought
       at thirty times the price" - which is true of a tint painted every
       frame and simply false of one painted once into a tile at boot.
       The bands measured 6.2 and 11.7 in a single row. The ramp costs
       thirty fillRects, once, and measures under one. */
    c.fillStyle = P.reflCeil;
    c.fillRect(0, CEIL + 3, W, 31);
    wash(c, W, CEIL + 4, 30, P.screenDeep, 0.375, false);

    /* 2. the wall behind the sofa, and the sectional against it. The
       couch is one 170x58 block with three cushions sitting on it and a
       knit throw over the near arm - the same furniture the Couch bay
       is built out of, seen from across the room and two tones flatter.
       THE PILLOWS ARE CREAM. Ref 3 is unambiguous about it and the
       first pass had them at reflCushion, eleven luminance off the sofa
       they sit on, which in a dark panel is nothing at all. */
    c.fillStyle = P.reflWall;
    c.fillRect(0, 58, W, 92);
    /* the wall is darker where it meets the ceiling, over three rows, so
       the junction is a shaded corner and not an 11-step */
    wash(c, W, 58, 3, P.screenDeep, 0.45, true);
    /* plaster tooth, one pixel in a hundred and twenty. It is worth
       almost nothing on its own and it is the difference between a wall
       and a fill; the room's own bakeCeiling speckles its plaster for
       the same reason. One in thirty was the first try and at this
       brightness it read as dirt on the glass rather than as a wall
       across the room. */
    for (y = 62; y < 150; y++) {
      for (x = 0; x < W; x++) {
        if (r() > 0.008) continue;
        c.fillStyle = r() < 0.5 ? P.screenLo : P.reflCeil;
        c.fillRect(x, y, 1, 1);
      }
    }

    /* one framed print over the sofa and a second further along. A wall
       with nothing on it is a wall nobody put anything on, and these are
       the only landmarks in the upper half of the lane: HORIZONTAL, and
       deliberately so - the one shape this bay may not invent anywhere
       near the flight path is a pale vertical mass, because that is what
       a pillar is. */
    [[150, 68, 62, 20], [336, 72, 44, 15]].forEach(function (fr) {
      c.fillStyle = P.reflSeam;   c.fillRect(fr[0], fr[1], fr[2], fr[3]);
      c.fillStyle = P.reflCushion;
      c.fillRect(fr[0] + 2, fr[1] + 2, fr[2] - 4, fr[3] - 4);
      c.fillStyle = P.reflPillow; c.fillRect(fr[0] + 2, fr[1] + 2, fr[2] - 4, 1);
    });

    c.fillStyle = P.reflCouch;   c.fillRect(120, 92, 170, 58);
    c.fillStyle = P.reflPillow;
    c.fillRect(126, 96, 34, 14);
    c.fillRect(180, 96, 34, 14);
    c.fillRect(234, 96, 34, 14);
    /* and their shaded under-halves, so three pale rectangles read as
       three cushions leaning back rather than as three windows */
    c.fillStyle = P.reflCushion;
    c.fillRect(126, 106, 34, 4);
    c.fillRect(180, 106, 34, 4);
    c.fillRect(234, 106, 34, 4);
    c.fillStyle = P.reflThrow;   c.fillRect(276, 94, 20, 9);   /* the throw */
    c.fillStyle = P.reflCouch;   c.fillRect(276, 101, 20, 2);
    /* the arm nearest you stands a little proud, and the feet are in
       shadow. Two notches is all it takes: a block with four square
       corners reads as a panel on the glass rather than as a sofa in a
       room, which was exactly what the first pass of this looked like. */
    c.fillStyle = P.reflCushion; c.fillRect(120, 88, 16, 62);
    c.fillStyle = P.screenLo;    c.fillRect(136, 140, 148, 10);
    c.fillStyle = P.reflWall;    c.fillRect(284, 92, 6, 48);

    /* the far end of the sectional, where it turns the corner */
    c.fillStyle = P.reflCouch;   c.fillRect(400, 106, 56, 44);
    c.fillStyle = P.reflPillow;  c.fillRect(406, 110, 30, 9);
    c.fillStyle = P.reflCushion; c.fillRect(406, 119, 30, 3);
    c.fillStyle = P.screenLo;    c.fillRect(406, 142, 44, 8);

    /* 3. THE FLOOR, which is where the lane stops being empty.

       It runs all the way down into the bezel now - it used to stop four
       rows short at 216 and leave an 11-step across the panel where it
       ended - and it carries nearly all of the reflection's tonal range,
       because in Mantle ref 1 that is exactly what it carries: lit oak
       boards going away from you, two pools of pendant light on them,
       and a hard little specular wherever a satin board throws a lamp
       back. Seven boards, each one deeper than the last so the floor
       recedes; alternate boards a shade warmer, which is what the room's
       own paintOak does and for the same reason - a floor painted in one
       colour reads as a field and not as boards.

       THE LIGHT GOES ON BEFORE THE DETAIL. A pool laid over a finished
       floor flattens everything under it by (1 - alpha); laid under the
       seams, the lips and the speculars it lights the boards and leaves
       the marks at full strength, which is the whole point of putting
       them there. */
    var BOARD = [7, 8, 9, 10, 11, 12, 13];
    c.fillStyle = P.reflFloor;   c.fillRect(0, 150, W, 70);
    y = 150;
    for (i = 0; i < BOARD.length; i++) {
      if (i % 2) { c.fillStyle = P.reflFloorWarm; c.fillRect(0, y, W, BOARD[i]); }
      y += BOARD[i];
    }
    c.fillStyle = P.reflFloorHi; c.fillRect(0, 150, W, 1);

    /* The two pendants sit at 120 and 360 - 240 apart, the room's own
       pendant spacing, and both a whole pool-radius inside the tile.
       They were at 70 and 330, which put a 104px pool over the tile's
       own seam: tileX lays this 480 wide, so anything that reaches past
       an edge arrives back at the other one with a step in it. */
    pool(c, 120, 184, 112, 44, P.reflFloorLit, 0.80);
    pool(c, 360, 184, 112, 44, P.reflFloorLit, 0.80);

    /* The joints, in BROKEN runs: the dark seam and, just below it, the
       lit lip, because a satin board catches the light on the edge
       NEAREST you. Broken is not decoration - a full-width 1px seam
       every nine rows would be seven ruled lines across the picture and
       seven dead-flat steps for the next person measuring this file to
       explain. Each run covers about a third of the width, so the median
       column never moves and the eye still gets boards. */
    y = 150;
    for (i = 0; i < BOARD.length; i++) {
      y += BOARD[i];
      if (y >= 219) break;
      sx = Math.floor(r() * 70);
      while (sx < W) {
        seg = 16 + Math.floor(r() * 34);
        seg = Math.min(seg, W - sx);
        c.fillStyle = P.reflSeam;    c.fillRect(sx, y, seg, 1);
        /* the lip is the glint's colour where a pendant is standing on
           it and the plain highlight everywhere else */
        c.fillStyle = (Math.abs(sx + seg / 2 - 120) < 84 || Math.abs(sx + seg / 2 - 360) < 84)
                      ? P.reflGlint : P.reflFloorHi;
        c.fillRect(sx, y + 1, seg, 1);
        sx += seg + 30 + Math.floor(r() * 54);
      }
    }

    /* And the grain along the faces. This is the answer to the
       measurement that said the Mantle's lane was the emptiest surface
       in the game - strong marks over 0.57% of the flight band against
       the Deck's 8.00% - and it is the honest answer, because a lamplit
       satin floor seen in a sheet of glass is made of exactly this and
       nothing else.

       EVERY RUN LIES ALONG A BOARD. The first pass scattered them at
       random rows and lengths over the whole band and the floor stopped
       being a floor: at this density a short mark at an arbitrary height
       reads as rubble, and a long one on a board's own row reads as
       grain. Each board gets its runs on two or three of its own rows,
       nowhere near its joint, and the ones standing in a pendant's pool
       take the glint while the rest take the plain highlight - which is
       also what decides where the eye goes. */
    y = 151;
    for (i = 0; i < BOARD.length; i++) {
      var rows = Math.max(1, BOARD[i] - 4);
      for (var g = 0; g < 16; g++) {
        if (g % 3) x = (g % 2 ? 360 : 120) + Math.floor(r() * 190) - 95;
        else x = Math.floor(r() * W);
        var gy = y + 1 + Math.floor(r() * rows);
        if (gy > 217) continue;
        c.fillStyle = (Math.abs(x - 120) < 96 || Math.abs(x - 360) < 96)
                      ? P.reflGlint : P.reflFloorHi;
        c.fillRect(x, gy, 6 + Math.floor(r() * 21), 1);
      }
      y += BOARD[i];
    }

    /* the last eight rows fall away into the bottom of the panel: the
       boards nearest you are below the television and out of the
       reflection altogether, and a ramp is how they leave rather than
       the 29-step the floor used to end on */
    wash(c, W, 212, 8, P.screenDeep, 0.55, false);

    /* 4. what stands on the reflected boards: the walnut coffee table
       out of ref 1 with its slatted front, a plant and a lit glass on
       top of it, and the round pouffe beside it. Both are DARKER than
       the floor they stand on, which is how the floor stays the
       brightest field in the reflection and the stone stays the
       brightest field in the bay. Their shadows are three rows of
       reflSeam under them - a shadow under a thing, not a wash across
       the screen, which is the whole distinction this file now keeps. */
    c.fillStyle = P.reflSeam;     c.fillRect(148, 178, 104, 3);
    c.fillStyle = P.reflTable;    c.fillRect(150, 158, 98, 16);
    c.fillStyle = P.reflTableTop; c.fillRect(150, 157, 98, 1);
    c.fillStyle = P.reflFloor;    c.fillRect(156, 164, 86, 2);
    c.fillRect(156, 169, 86, 2);
    c.fillStyle = P.reflTable;
    c.fillRect(152, 174, 4, 6); c.fillRect(242, 174, 4, 6);
    c.fillStyle = P.reflPlant;    c.fillRect(168, 150, 11, 7);
    c.fillRect(171, 147, 5, 3);
    c.fillStyle = P.reflGlass;    c.fillRect(196, 152, 6, 5);
    c.fillStyle = P.reflGlint;    c.fillRect(197, 152, 2, 1);

    /* the pouffe is ROUND, which costs eight rows of a shape table and
       is the whole difference between a pouffe and a crate */
    var POUF = [[8, 32], [4, 40], [2, 44], [1, 46], [0, 48], [0, 48],
                [0, 48], [1, 46], [1, 46], [2, 44], [3, 42], [5, 38], [8, 32]];
    c.fillStyle = P.reflSeam;     c.fillRect(302, 181, 44, 3);
    for (i = 0; i < POUF.length; i++) {
      c.fillStyle = i < 2 ? P.reflPouffe : P.reflPouffeLo;
      c.fillRect(300 + POUF[i][0], 158 + i * 2, POUF[i][1], 2);
    }

    /* 5. two pendants hanging in the glass. In a picture this dark the
       eye still needs somewhere to land, and a lamp is the honest place
       for it - but only JUST. The shade is reflLamp with a three pixel
       core of reflLampHi in it, not the other way round: drawn the
       other way round these read as two lamps hanging in front of the
       television, which is a thing the player would try to fly past.

       THE GLOW ROUND THEM IS A BAKED POOL. It was two full-width flat
       Tints at y 70 plus a 19x25 flat Tint per lamp, carried over from
       a time when the room's lighting pass really did stop dead at that
       row; bakeLight has ramped CEIL..CEIL+64 with a smoothstep since
       the pass was rebuilt, so the compensation was for a bug that no
       longer exists and all it did was put the bug back - three ruled
       lines across the picture at 70, 80 and 88, every column stepping
       by the identical amount. A lamp throws an ellipse. This is one. */
    var SHADE = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [2, 3]];
    [120, 360].forEach(function (px) {
      pool(c, px, CEIL + 34, 46, 40, P.lampWarm, 0.10);
      c.fillStyle = P.reflLamp;
      c.fillRect(px, CEIL + 4, 1, 26);
      /* the room's own shade shape, so the thing in the glass is
         recognisably the thing hanging over the player's head - and
         tapered rather than square, because a 7x11 rectangle in a dark
         panel reads as a box somebody left hanging in the air */
      rowsFill(c, SHADE, px - 3, CEIL + 30, P.reflLamp);
      c.fillStyle = P.reflLampHi; c.fillRect(px - 1, CEIL + 32, 3, 3);
    });

    /* 6. fourteen specks of something catching the light in the upper
       half of the panel: dust on the glass, the one thing in the whole
       layer that is not a reflection of anything */
    for (i = 0; i < 14; i++) {
      x = Math.floor(r() * W);
      y = CEIL + Math.floor(r() * 110);
      c.fillStyle = P.reflSpark;
      c.fillRect(x, y, 1, 1);
    }

    /* and then the whole picture takes a step back into the glass */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 3);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* -------------------------------------------------------- the wall

     Transparent except for its bottom 23 rows: the panel's lower bezel,
     and under it the band of ledger stone the television is hung on.
     Everything above is screen, and the screen is the layer behind.

     The TV's TOP bezel is deliberately not drawn anywhere. The screen
     fills the wall; what sits on the picture's top row is the crown
     moulding's own shadow, which the room paints in drawCeiling. A
     level that drew a top bezel as well would be telling the player the
     television ends somewhere, and it does not. */
  function bakeWall() {
    var W = 240, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2204);
    var y;

    /* the bezel: three hard rows, a lit one in the middle, and the
       maker's badge tab once per tile */
    c.fillStyle = P.bezelDark; c.fillRect(0, FLOOR - 22, W, 1);
    c.fillStyle = P.bezel;     c.fillRect(0, FLOOR - 21, W, 2);
    c.fillStyle = P.bezelHi;   c.fillRect(0, FLOOR - 21, W, 1);
    c.fillStyle = P.tvLogo;    c.fillRect(112, FLOOR - 21, 14, 2);

    /* three courses of stone, 6px each, sitting on a joint row that is
       the shadow where the stone meets the shelf */
    for (y = 0; y < 3; y++) {
      course(c, r, 0, FLOOR - 19 + y * 6, W, 6, 14, 44, P.stoneJoint);
    }
    c.fillStyle = P.stoneJoint; c.fillRect(0, FLOOR - 1, W, 1);

    /* the one amber piece. There is exactly one in any armful of this
       stone, and leaving it out makes the whole band read as grey. */
    c.fillStyle = P.stoneRust;
    c.fillRect(64, FLOOR - 13, 30, 6);
    c.fillStyle = P.stoneLit;   c.fillRect(64, FLOOR - 13, 30, 1);
    c.fillStyle = P.stoneJoint; c.fillRect(64, FLOOR - 8, 30, 1);

    fleck(c, r, 0, FLOOR - 19, W, 18, 60);

    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 2);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ------------------------------------------------------- the props

     What is actually on the shelf, standing on FLOOR and scrolling at
     0.60 - nearly in the action. Soundbar, the bright green pad on its
     tan stand, the white one beside it, three game cases leaning on
     each other and a coil of HDMI, all of it off Mantle ref 1 and 4.

     THE GREEN PAD IS SCENERY, and it is scenery HERE and nowhere else.
     A game controller in this bay is a thing that shoots at you, so the
     one that does not has to be unmistakably furniture: it is small, it
     is dimmed with the rest of the layer, it never leaves the backdrop,
     and the ones that fire are black on tan stands and stand fifteen
     pixels tall with a white ring burning on them. */
  function bakeProps() {
    var W = 400, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var i;

    /* the soundbar: 118 long, 12 deep, a mesh grille on a 3px grid */
    c.fillStyle = P.soundbar;    c.fillRect(40, FLOOR - 12, 118, 12);
    c.fillStyle = P.soundbarLit; c.fillRect(40, FLOOR - 12, 118, 1);
    for (i = 0; i < 118; i += 3) {
      c.fillStyle = P.mesh;
      c.fillRect(40 + i, FLOOR - 9, 1, 1);
      c.fillRect(41 + i, FLOOR - 6, 1, 1);
      c.fillRect(40 + i, FLOOR - 3, 1, 1);
    }
    c.fillStyle = P.ctrlWhiteLo; c.fillRect(126, FLOOR - 10, 8, 1);
    c.fillStyle = P.outline;     c.fillRect(40, FLOOR - 1, 118, 1);

    /* the two pads on their stands */
    pad(c, 190, P.xboxGreen, P.xboxGreenHi, P.xboxGreenLo);
    pad(c, 232, P.ctrlWhite, '#ffffff', P.ctrlWhiteLo);

    /* three cases leaning against each other, spines out */
    [[290, P.caseGreen], [303, P.caseBlue], [316, P.caseWhite]].forEach(function (k) {
      c.fillStyle = P.outline; c.fillRect(k[0] - 1, FLOOR - 15, 14, 15);
      c.fillStyle = k[1];      c.fillRect(k[0], FLOOR - 14, 12, 14);
      c.fillStyle = P.outline; c.fillRect(k[0] + 1, FLOOR - 11, 10, 1);
      c.fillRect(k[0] + 1, FLOOR - 4, 10, 1);
    });

    /* and a lead somebody coiled once and never put away */
    for (i = 0; i < 14; i++) {
      var a = i / 14 * TAU;
      c.fillStyle = P.cable;
      c.fillRect(340 + 7 + Math.round(Math.cos(a) * 7),
                 FLOOR - 3 + Math.round(Math.sin(a) * 3), 1, 1);
    }
    c.fillStyle = P.cableHi; c.fillRect(347, FLOOR - 6, 1, 1);

    /* the whole layer is a step further into the room than the shelf
       the doodad is flying over */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 4);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* one pad lying in its stand: 16x9 of body on 14x6 of moulded wood */
  function pad(c, x, body, hi, lo) {
    c.fillStyle = P.standTan; c.fillRect(x, FLOOR - 6, 14, 6);
    c.fillStyle = P.standLo;  c.fillRect(x, FLOOR - 3, 14, 3);
    c.fillStyle = P.outline;  c.fillRect(x, FLOOR - 1, 14, 1);
    c.fillStyle = body;       c.fillRect(x - 1, FLOOR - 15, 16, 9);
    c.fillStyle = hi;         c.fillRect(x - 1, FLOOR - 15, 16, 1);
    c.fillStyle = lo;         c.fillRect(x - 1, FLOOR - 7, 16, 1);
    c.fillStyle = P.ctrlStick;
    c.fillRect(x + 1, FLOOR - 13, 3, 3);
    c.fillRect(x + 8, FLOOR - 11, 3, 3);
    c.fillStyle = P.ctrlRing; c.fillRect(x + 6, FLOOR - 14, 1, 1);
  }

  /* -------------------------------------------------------- the shelf

     The floor band, and it is the black painted mantle: the lit arris
     along the top, a flat of satin black with the dust and scratches
     off ref 1 lying in it, the front arris, the bevel, and then the
     face falling away into almost nothing. 28 rows, which is exactly
     VH - FLOOR, so the band is the whole of what is below the line. */
  function bakeFloor() {
    var W = 128, H = VH - FLOOR;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(9090);
    var i;

    c.fillStyle = P.mantleGloss; c.fillRect(0, 0, W, 1);
    c.fillStyle = P.mantleTop;   c.fillRect(0, 1, W, 6);

    /* The dust. Twenty-four little dashes and three bright scratches is
       the exact census of ref 1: the top of this shelf is almost never
       wiped, and what the photograph is really a photograph of is the
       way satin black holds every mark anybody has ever left on it. */
    for (i = 0; i < 24; i++) {
      c.fillStyle = P.mantleScuff;
      c.fillRect(Math.floor(r() * W), 1 + Math.floor(r() * 6),
                 1 + Math.floor(r() * 3), 1);
    }
    for (i = 0; i < 3; i++) {
      c.fillStyle = P.mantleScratch;
      c.fillRect(Math.floor(r() * W), 2 + Math.floor(r() * 4), 1, 1);
    }

    c.fillStyle = P.mantleDeep;  c.fillRect(0, 7, W, 1);
    c.fillStyle = P.mantleBevel; c.fillRect(0, 8, W, 1);
    c.fillStyle = P.mantleFace;  c.fillRect(0, 9, W, H - 9);
    c.fillStyle = P.mantleDeep;  c.fillRect(0, 24, W, H - 24);
    return t;
  }

  /* ------------------------------------------------------ the pillar

     A pilaster of the same stacked stone as the wall, running from the
     ceiling or the floor to the mouth of the gap, with a little black
     mantle shelf capping it. The photographs have exactly this: the
     stone wraps round the fireplace breast and the shelf is mitred
     round it.

     THE STONE IS THE PILLAR because the stone is the one pale thing in
     the bay. A black pilaster on a black panel would be a hole in the
     screen, and the player would be reading the gap by where the stone
     is NOT - which works right up to the moment a beam is drawn across
     it in a colour that is also not black. */
  function bakeColumn(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(3300 + variant * 97);
    var y;

    c.fillStyle = P.stoneJoint;
    c.fillRect(0, 0, W, H);

    /* nine courses of 7: six rows of stone, one of joint. The pieces
       are 11 to 34 long, which across 34px of pillar is one, two or
       three to a course - the same three-to-a-course rhythm the wall
       has, seen through a narrower window. */
    for (y = 0; y < H; y += 7) {
      course(c, r, 0, y, W, 6, 11, 34, P.stoneDark);
    }

    fleck(c, r, 0, 0, W, H, 30);

    if (variant) {
      /* the rust piece, and the corner somebody has knocked a chip off.
         Two pixels of damage is as much as a 34px column can carry
         without the eye reading it as a sprite rather than as stone. */
      c.fillStyle = P.stoneRust;  c.fillRect(2, 28, 26, 6);
      c.fillStyle = P.stoneLit;   c.fillRect(2, 28, 26, 1);
      c.fillStyle = P.stoneDark;  c.fillRect(2, 33, 26, 1);
      c.fillStyle = P.stoneJoint; c.fillRect(1, 45, 2, 2);
    }

    /* the hard edges. A pale column on a near-black wall does not need
       a cast shadow to separate it - it needs its own edge not to
       dissolve into the glass. */
    c.fillStyle = P.outline;
    c.fillRect(0, 0, 1, H);
    c.fillRect(W - 1, 0, 1, H);
    return t;
  }

  /* The mouth of the gap: a mitred return of the black mantle shelf,
     42 wide and 9 deep, exactly as wide as every cap in the game.

     `down` is the one that hangs off the top column, so its face points
     DOWN into the gap - which is why its bright arris is on its bottom
     row and the up-facing one's is on its top. The arris always faces
     into the gap because the arris is the edge that kills, and on a
     screen this dark it is the only part of the pillar you can find in
     a hurry. */
  function bakeCap(down) {
    var W = 42, H = 9;
    var t = makeCanvas(W, H), c = t.ctx;
    var i;
    /* the shelf, read from the lit arris inwards */
    var rows = [P.mantleGloss, P.mantleTop, P.mantleTop, P.mantleDeep,
                P.mantleFace, P.mantleFace, P.mantleFace, P.mantleFace,
                P.mantleFace];
    for (i = 0; i < H; i++) {
      c.fillStyle = rows[down ? H - 1 - i : i];
      c.fillRect(0, i, W, 1);
    }
    if (down) {
      /* the bevel under the lip reads the other way up */
      c.fillStyle = P.mantleBevel; c.fillRect(0, 5, W, 1);
    } else {
      c.fillStyle = P.mantleBevel; c.fillRect(0, 3, W, 1);
      c.fillStyle = P.mantleDeep;  c.fillRect(0, 4, W, 1);
    }
    /* a scratch or two on the flat, so the cap is the same wood as the
       shelf the whole bay stands on */
    c.fillStyle = P.mantleScuff;
    c.fillRect(9, down ? H - 3 : 2, 3, 1);
    c.fillRect(28, down ? H - 2 : 1, 2, 1);
    c.fillStyle = P.outline;
    c.fillRect(0, 0, W, 1); c.fillRect(0, H - 1, W, 1);
    c.fillRect(0, 0, 1, H); c.fillRect(W - 1, 0, 1, H);
    return t;
  }

  /* --------------------------------------------------- the dead pixel

     Eight frames of a subpixel triplet flipping about its own vertical
     axis. The widths are [9,8,6,3,1,3,6,8] - a cosine sampled eight
     times - and the stripes stay VERTICAL the whole way round, because
     a pixel is not a coin: it is a red, a green and a blue stripe side
     by side, and what rotating it does is squash those stripes, not
     tilt them. Frames 0-3 are the front, R|G|B; frame 4 is the edge-on
     single white column; frames 5-7 are the back, B|G|R.

     Eight baked frames rather than ctx.rotate, for the reason every
     spinning thing in this game is baked: a rotated canvas resamples,
     and a resampled sprite on the nearest-neighbour layer shimmers. */
  var PIX_W = [9, 8, 6, 3, 1, 3, 6, 8];
  var PIX_STRIPES = [
    [3, 3, 3], [3, 2, 3], [2, 2, 2], [1, 1, 1],
    null,
    [1, 1, 1], [2, 2, 2], [3, 2, 3]
  ];
  var PIX_FRONT = [
    [P.pxRed, P.pxRedHi, P.pxRedLo],
    [P.pxGreen, P.pxGreenHi, P.pxGreenLo],
    [P.pxBlue, P.pxBlueHi, P.pxBlueLo]
  ];
  var PIX_H = 9;              /* the sprite is nine rows tall */

  function bakePixel(f) {
    var S = 11;
    var t = makeCanvas(S, S), c = t.ctx;
    var w = PIX_W[f];
    var sx = Math.floor((S - w) / 2), sy = 1;
    var i, k, cols, x;

    /* the 1px ring, underneath. A dead pixel is the brightest thing in
       this bay and it is falling at you through a dark room; without
       the ring the red stripe bleeds into the stone band and the green
       one disappears into nothing at all. */
    c.fillStyle = P.pxOutline;
    c.fillRect(sx - 1, sy - 1, w + 2, PIX_H + 2);

    if (f === 4) {
      /* edge on: one white column, because at this angle what is left
         of a subpixel triplet is the glass it is printed on */
      c.fillStyle = P.pxWhite;
      c.fillRect(sx, sy, 1, PIX_H);
      return t;
    }

    var widths = PIX_STRIPES[f];
    /* frames 5-7 are the back of the pixel, so the order reverses */
    var order = f < 4 ? [0, 1, 2] : [2, 1, 0];
    x = sx;
    for (i = 0; i < 3; i++) {
      cols = PIX_FRONT[order[i]];
      k = widths[i];
      c.fillStyle = cols[0]; c.fillRect(x, sy, k, PIX_H);
      c.fillStyle = cols[1]; c.fillRect(x, sy, k, 1);
      c.fillStyle = cols[2]; c.fillRect(x, sy + PIX_H - 1, k, 1);
      x += k;
    }
    return t;
  }

  /* ------------------------------------------------------ the VOL- key

     The sour drop: a volume-down key popped off the Samsung remote in
     Mantle ref 2. Green because the engine paints EVERYTHING sour lime
     green - the gauge, the shout, the aura round the shrunken doodad -
     and a power-up that is not the colour of the thing it buys teaches
     the player nothing. The joke is the other half of it: the key that
     turns you down, on a level where being turned down is how you get
     through a beam. */
  var KEY_ROWS = [[1, 7], [0, 9], [0, 9], [0, 9], [0, 9], [0, 9], [1, 7]];

  function bakeKey() {
    var t = makeCanvas(11, 9), c = t.ctx;
    LivingRoom.rowsOutline(c, KEY_ROWS, 1, 1, P.outline);
    rowsFill(c, KEY_ROWS, 1, 1, P.keyGreen);
    /* a moulded key is lit on the shoulder nearest the lamp and dark on
       the two faces away from it */
    c.fillStyle = P.keyGreenHi;
    c.fillRect(2, 1, 7, 1); c.fillRect(1, 2, 1, 4);
    c.fillStyle = P.keyGreenLo;
    c.fillRect(9, 2, 1, 4); c.fillRect(2, 7, 7, 1);
    c.fillStyle = P.keyGlyph; c.fillRect(4, 4, 3, 1);
    return t;
  }

  /* -------------------------------------------------------- the +5

     The capybara. It is a real object: a little yellow resin loaf
     sitting on the shelf in Mantle ref 2 and again in ref 3, and it is
     the only warm-coloured thing in the whole photograph that is not
     stone. Eleven by eight of gold with one ink pixel for an eye. */
  var CAPY_ROWS = [
    [2, 7], [1, 9], [0, 11], [0, 11], [0, 11], [0, 11], [1, 9], [1, 9]
  ];

  function bakeCapy() {
    var t = makeCanvas(13, 10), c = t.ctx;
    LivingRoom.rowsOutline(c, CAPY_ROWS, 1, 1, P.outline);
    rowsFill(c, CAPY_ROWS, 1, 1, P.capyGold);
    /* the ridge along its back, and the shadow under its belly */
    c.fillStyle = P.capyHi;
    c.fillRect(3, 1, 7, 1); c.fillRect(2, 2, 9, 1);
    c.fillStyle = P.capyLo;
    c.fillRect(2, 8, 9, 1); c.fillRect(2, 7, 2, 1);
    /* the face. Three pixels, and it is unmistakable. */
    c.fillStyle = P.capyInk;
    c.fillRect(9, 3, 1, 1);           /* the eye   */
    c.fillRect(11, 4, 1, 1);          /* the nose  */
    c.fillRect(4, 1, 1, 1);           /* the ear   */
    return t;
  }

  /* ----------------------------------------------------- the spare life

     A fresh AA standing on its own battery cover. The cover stays on
     the shelf where it was put; the cell is what you collect, so the
     cell is what Gerald's hunger drags away and the cell is what the
     box travels with.

     It stands on the FLOOR and never off the ceiling. A boon hung 7px
     under a lid that ends the run is not a small deliberate anything -
     it is a dare, and the Canopy could afford to hang a pomegranate
     because the Canopy's rafters only bounce. */
  function bakeDoor() {
    var t = makeCanvas(12, 3), c = t.ctx;
    c.fillStyle = P.battBlack;   c.fillRect(0, 0, 12, 3);
    c.fillStyle = P.mantleBevel; c.fillRect(0, 0, 12, 1);
    c.fillStyle = P.outline;     c.fillRect(0, 2, 12, 1);
    return t;
  }

  function bakeBattery() {
    var t = makeCanvas(7, 16), c = t.ctx;
    /* the positive cap, with the nub on top */
    c.fillStyle = P.battCopper;   c.fillRect(0, 1, 7, 3);
    c.fillStyle = P.battCopperHi; c.fillRect(2, 0, 3, 1);
    c.fillRect(0, 1, 1, 3);
    /* the silver upper body with the plus pressed into it */
    c.fillStyle = P.battSilver;   c.fillRect(0, 4, 7, 7);
    c.fillStyle = P.battSilverHi; c.fillRect(0, 4, 1, 7);
    c.fillStyle = P.battSilverLo; c.fillRect(6, 4, 1, 7);
    c.fillStyle = P.battMark;
    c.fillRect(3, 6, 1, 3); c.fillRect(2, 7, 3, 1);
    /* and the black foot */
    c.fillStyle = P.battBlack;    c.fillRect(0, 11, 7, 5);
    c.fillStyle = P.battSilverLo; c.fillRect(0, 11, 7, 1);
    c.fillStyle = P.outline;
    c.fillRect(0, 0, 1, 1); c.fillRect(6, 0, 1, 1);
    c.fillRect(0, 15, 7, 1);
    return t;
  }

  /* ------------------------------------------------------- the lamp

     THE FLOOR LAMP, baked. In Mantle ref 4 it stands to the RIGHT of
     the fireplace with a bare bulb in a glass shade, and it is the whole
     reason anything over there is visible at all - so the warmth comes
     in from the upper right and nowhere else.

     It used to be two nested flat Tint.rects painted live, and they
     measured exactly what a rect of light always measures: column 310
     stepped +8.0, column 360 stepped +8.0, column 460 stepped -13.1 and
     row 144 stepped -7.8 with no variance at all across 135 columns.
     A player flying the right-hand third saw a LIT RECTANGLE WITH A
     CORNER, which is the fault the room's whole lighting pass was torn
     out and rebuilt to remove, surviving in the one bay that had not
     adopted the rebuild.

     The bulb is above the moulding and out of frame, so the ellipse is
     centred on the top right corner of the playfield and only its lower
     left quadrant is ever drawn. That puts its brightest row ON the
     kill line - which is where the room's own warm ramp starts, and for
     the same reason - and runs it out to nothing 176px to the left and
     140 rows down, so there is no edge anywhere inside the frame. The
     peak is 2/16, the strength the two rects had where they overlapped,
     so the corner is exactly as warm as it was. */
  var LAMP_W = 176, LAMP_H = 140, LAMP_A = 0.125;

  function bakeLampWash() {
    var t = makeCanvas(LAMP_W, LAMP_H), c = t.ctx;
    pool(c, LAMP_W, 0, LAMP_W, LAMP_H, P.lampWarm, LAMP_A);
    return t;
  }

  /* The room first, then the bay, then the sprites. Nothing here
     depends on an earlier tile; LivingRoom.build() guards itself, so
     the four bays calling it at boot cut the oak once. */
  function build() {
    LivingRoom.build();
    T.ceiling = LivingRoom.bakeCeiling(null);
    T.screen  = bakeScreen();
    T.wall    = bakeWall();
    T.props   = bakeProps();
    T.floor   = bakeFloor();
    T.lampWash = bakeLampWash();
    /* The dark the stone throws down into the shelf where the two meet.
       It was Tint.rect(ctx, 0, FLOOR - 10, VW, 10, P.void, 5) - the
       same flat ten-row void band the brief condemned at FLOOR-40 - and
       it measured a median step of -11.6 across the full 480px width.
       The Couch replaced the identical construct with a baked strip and
       the Whiteboard did the same with its tray; this is the third one,
       and it is twelve rows rather than ten so that the deepest row is
       the same darkness while no row moves more than 6.9 on the palest
       stone in the band. Measured on a flat field of stoneLit, the flat
       Tint moved 68.1 in one row and this moves 6.9 in its worst. Its
       deepest row lands on FLOOR - 1, so the strip ENDS where the oak
       begins and there is no rim anywhere inside the lane. */
    T.shelfShade = LivingRoom.bakeShade(P.void, 0.3125, 12, true);
    T.column  = [bakeColumn(0), bakeColumn(1)];
    T.capDown = bakeCap(true);
    T.capUp   = bakeCap(false);
    T.pixel   = [];
    for (var f = 0; f < 8; f++) T.pixel.push(bakePixel(f));
    T.key     = bakeKey();
    T.capy    = bakeCapy();
    T.door    = bakeDoor();
    T.battery = bakeBattery();
  }

  /* -------------------------------------------------------- drawing */

  /* Three baked layers, one baked lamp, one flat step back and the
     room's own lighting pass. The lamp is a SHEET - see bakeLampWash -
     and the step back is the one flat Tint left in the function,
     which it is allowed to be because it covers the entire frame edge
     to edge and so has no edge inside it to be found. */
  function drawBackdrop(ctx, scroll) {
    /* the beam banding's clock, read once a frame. Nothing that COLLIDES
       reads this any more: see remotePhase. */
    scrollNow = scroll;

    ctx.fillStyle = P.screenDeep;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.screen.canvas, scroll * 0.08, 0);
    tileX(ctx, T.wall.canvas, scroll * 0.22, 0);
    tileX(ctx, T.props.canvas, scroll * 0.60, 0);

    /* the floor lamp, off the top right corner of the frame */
    ctx.drawImage(T.lampWash.canvas, VW - LAMP_W, CEIL);
    /* and the whole wall stands back a step behind the action */
    Tint.rect(ctx, 0, 0, VW, VH, P.void, 3);

    /* the room's lighting pass, last, the same one sheet in all four
       bays. No bay paints a vignette or a gloom of its own. */
    LivingRoom.drawLight(ctx);
  }

  function drawMenuBackdrop(ctx, scroll) {
    LivingRoom.drawMenuBackdrop(ctx, scroll);
  }

  function drawCeiling(ctx, scroll) {
    LivingRoom.drawCeiling(ctx, scroll, T.ceiling);
  }

  function drawFloor(ctx, scroll) {
    /* the dark the shelf throws up into the stone where the two meet -
       a baked strip, not the flat ten-row void band it was. See where
       T.shelfShade is baked for what that band measured. */
    ctx.drawImage(T.shelfShade.canvas, 0, FLOOR - 12);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
  }

  /* --------------------------------------------------------- pillar */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.column[ob.variant].canvas;
    var w = tile.width;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (topH > 0) LivingRoom.drawColumn(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) LivingRoom.drawColumn(ctx, tile, x, botY, w, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* the hard shadow the pilaster throws on the glass behind it. On a
       panel this dark it buys very little, and what it buys is the
       stone reading as something standing IN FRONT of the television
       rather than as something printed on it. */
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH : 0, P.void, 7);
    Tint.rect(ctx, x + w, botY, 4, botH > 0 ? botH : 0, P.void, 7);
  }

  /* -------------------------------------------------------- the remote

     A remote is a 'spike' that is only lethal for part of its cycle,
     and the cycle is one lap of BEAM_PERIOD pixels of scroll:

       IDLE   0.00 - 0.50   the remote, and a dead LED
       ARM    0.50 - 0.62   the LED blinks twice, and from 0.58 a line
                            of aim dots appears along the full reach
       BEAM   0.62 - 0.86   the beam is drawn, snapping to full length
                            in the first 0.02
       LETHAL 0.64 - 0.85   strictly INSIDE the drawn beam, so there is
                            never a box where no light is painted, and
                            there is a fifth of a period of arming cue
                            before it - collide() has no memory, and a
                            beam that comes on with the doodad already
                            inside it is an unwarned death
       FADE   0.86 - 0.92   the core goes out and the edge thins

     63px of scroll lethal, 237 clear. Half of every lap is the remote
     sitting there doing nothing at all, which is what makes a hazard
     this common survivable.                                         */

  /* THE PHASE IS KEYED OFF ob.x AND NOT OFF THE SCROLL, and the
     difference is a death.

     It read the module's scrollNow, which drawBackdrop caches DURING
     RENDER - and Game.step runs scene.update, and therefore collide and
     therefore rectsFor, before Game.render runs drawBg. So on frame N
     the boxes came off phase(scroll N-1) while the player was shown
     phase(scroll N). The lethal window is 0.64..0.85 and the beam is
     drawn at full brightness to 0.86, a mercy margin of 0.01 of phase
     at the top end, which is 3px of scroll; one frame at speedMax 176
     and the clamped dt of 1/30 is up to 5.9px, so the margin was
     overrun and a beam that had visually gone out stayed lethal for a
     frame. Measured before the fix: on 11 of 621 collision-tested
     frames the boxes collide used did not match the frame that was
     drawn. The player cannot see what killed them, which is the one
     rule a hard level may not break.

     moveObstacles does `ob.x -= spd * dt` with the same spd and the
     same dt that PlayScene uses for `scroll += speed * dt`, so ob.x
     falls by exactly what the scroll rises by and -ob.x IS the scroll,
     offset by a constant per obstacle. The constant is what ob.seed
     already was - a uniform roll over one whole period - so the phase
     is the same phase, running at the same rate, keyed to where the
     remote IS rather than to where the world was last time anybody
     looked. And ob.x is advanced by moveObstacles BEFORE collide runs
     and is not touched again until the next frame, so the box and the
     light are now the same frame's answer, the way the controller's
     ob.age already was.

     js/deck.js has the same trap in mistPhase and gets away with it on
     a wider mercy margin; the period is still stated in PIXELS and the
     hazard is still predictable from where you are rather than when,
     which is the whole of what BEAM_PERIOD was for. */
  function remotePhase(ob) {
    return wrap(ob.seed - ob.x, BEAM_PERIOD) / BEAM_PERIOD;
  }

  /* is the little red light on? Twice during the arm, and then for the
     whole of the shot: a remote that goes dark while it is firing
     would be telling the player the opposite of the truth. */
  function ledLit(p) {
    if (p >= 0.50 && p < 0.54) return true;
    if (p >= 0.58 && p < 0.92) return true;
    return false;
  }

  function drawRemotes(ctx, ob) {
    var p = remotePhase(ob);
    var onCeil = ob.side === 'ceil';
    var x = Math.round(ob.x);
    for (var i = 0; i < ob.spikes.length; i++) {
      drawRemote(ctx, x + ob.spikes[i].dx + 5, ob.spikes[i].len, onCeil, p);
    }
  }

  /* `hx` is the beam's own column, which is also the middle of the
     remote: the signal comes out of the top of the thing, so the art
     and the box are built outwards from one number. */
  function drawRemote(ctx, hx, len, onCeil, p) {
    var lit = ledLit(p);
    var base = onCeil ? CEIL + BODY_CEIL : FLOOR - BODY_FLOOR;
    var dir = onCeil ? 1 : -1;
    var J = len - (onCeil ? BODY_CEIL : BODY_FLOOR);

    if (onCeil) drawCeilRemote(ctx, hx, lit);
    else drawFloorRemote(ctx, hx, lit);
    if (J < 2) return;

    if (p >= 0.58 && p < 0.62) {
      /* the aim. Two beats: dull for the first, hot for the last 0.02
         of a period, which at speedStart is a fifth of a second of
         "this one, now". */
      drawAim(ctx, hx, base, dir, J, p < 0.60 ? P.aim : P.aimHot);
      return;
    }
    if (p < 0.62 || p >= 0.92) return;

    var grow = Math.min(1, (p - 0.62) / 0.02);
    var fade = p > 0.86 ? (p - 0.86) / 0.06 : 0;
    drawBeam(ctx, hx, base, dir, Math.round(J * grow), fade);
  }

  /* the dotted line the beam is about to take: 1px every 3, the whole
     length of the reach, so what is being aimed at is the thing you
     are looking at and not a surprise */
  function drawAim(ctx, hx, base, dir, J, colour) {
    ctx.fillStyle = colour;
    for (var i = 2; i < J; i += 3) {
      ctx.fillRect(hx, base + dir * i, 1, 1);
    }
  }

  /* The beam itself: five pixels across, drawn in 2-row bands.

       halo | edge | CORE | edge | halo

     The two halo columns go down at 0.45 alpha in one pass each, the
     core in one pass, and only the shaft in the middle is banded -
     every third band takes the brighter laser instead of laserEdge and
     the banding WALKS outward with the scroll, so the thing reads as a
     signal travelling rather than as a bar of red paint stuck to the
     screen. The lethal column is the middle three. */
  function drawBeam(ctx, hx, base, dir, jl, fade) {
    var a = ctx.globalAlpha;
    var top = dir > 0 ? base : base - jl;
    var k, y, hgt;

    if (jl <= 0) return;

    if (fade > 0) {
      /* the shot is over: what is left is one thin column going out */
      ctx.globalAlpha = a * (1 - fade);
      ctx.fillStyle = P.laserEdge;
      ctx.fillRect(hx, top, 1, jl);
      ctx.globalAlpha = a;
      return;
    }

    ctx.globalAlpha = a * 0.45;
    ctx.fillStyle = P.laserHalo;
    ctx.fillRect(hx - 2, top, 1, jl);
    ctx.fillRect(hx + 2, top, 1, jl);
    ctx.globalAlpha = a;

    /* one band every 4px of scroll, walking away from the emitter */
    var tick = Math.floor(scrollNow * 0.25);
    for (k = 0; k < jl; k += 2) {
      hgt = Math.min(2, jl - k);
      y = dir > 0 ? base + k : base - k - hgt;
      ctx.fillStyle = wrap((k >> 1) - tick, 3) === 0 ? P.laser : P.laserEdge;
      ctx.fillRect(hx - 1, y, 3, hgt);
    }
    ctx.fillStyle = P.laserCore;
    ctx.fillRect(hx, top, 1, jl);
    /* and the bead of light at the mouth it is coming out of */
    ctx.fillRect(hx, base + (dir > 0 ? 0 : -1), 1, 1);
  }

  /* The remote standing on the shelf: 7 wide, 14 tall, leaning its
     foot a pixel back the way everything on that shelf in ref 2 does.
     The LEAN IS IN THE FOOT and not the head, so the LED - and the
     column of light that comes out of it - stays exactly over hx. */
  function drawFloorRemote(ctx, hx, lit) {
    var i, y, lx;
    for (i = 0; i < BODY_FLOOR; i++) {
      y = FLOOR - 1 - i;
      lx = hx - 3 - (i < 7 ? 1 : 0);
      /* A 1px outline down both sides. The stone band this stands in
         front of is the palest field in the bay, and without the dark
         edge a fourteen pixel lethal post is a pale thing on a pale
         thing. Everything in here that kills gets its own edge. */
      ctx.fillStyle = P.outline;    ctx.fillRect(lx - 1, y, 9, 1);
      ctx.fillStyle = P.remoteBody; ctx.fillRect(lx, y, 7, 1);
      ctx.fillStyle = P.remoteLit;  ctx.fillRect(lx, y, 1, 1);
      ctx.fillStyle = P.remoteDark; ctx.fillRect(lx + 6, y, 1, 1);
    }
    /* Four keys down the face and the red one at the bottom, which is
       every remote anybody has ever owned. Two pixels wide rather than
       three, and only the top row pale: eight rows of #dcd8d0 up a 14px
       body turned the thing into a pale ladder and lost the silhouette. */
    for (i = 0; i < 4; i++) {
      y = FLOOR - 5 - i * 2;
      ctx.fillStyle = P.remoteKey;   ctx.fillRect(hx - 1, y, 2, 1);
      ctx.fillStyle = P.remoteKeyLo; ctx.fillRect(hx - 1, y + 1, 2, 1);
    }
    ctx.fillStyle = P.remoteRed; ctx.fillRect(hx - 1, FLOOR - 3, 2, 1);
    /* the emitter window in the nose, and the light in it */
    ctx.fillStyle = P.outline;    ctx.fillRect(hx - 4, FLOOR - BODY_FLOOR - 1, 9, 1);
    ctx.fillStyle = P.remoteDark; ctx.fillRect(hx - 2, FLOOR - BODY_FLOOR, 5, 1);
    ctx.fillStyle = lit ? P.led : P.ledOff;
    ctx.fillRect(hx, FLOOR - BODY_FLOOR, 1, 1);
  }

  /* The ceiling one hangs nose-down out of a sprung clip screwed under
     the moulding. It reaches 10px into the room and no further: the
     lid kills, and the only thing in this bay allowed to hang any
     closer to the player than a lethal ceiling already is, is light.

     The clip is 11 across and the lethal box is 7. The two outer
     pixels each side are drawn and not lethal - the same pixel of
     mercy the Deck gives the dark edge of a fitting. */
  function drawCeilRemote(ctx, hx, lit) {
    ctx.fillStyle = P.caddy;      ctx.fillRect(hx - 5, CEIL, 11, 6);
    ctx.fillStyle = P.caddyLit;   ctx.fillRect(hx - 5, CEIL, 11, 1);
    ctx.fillStyle = P.outline;    ctx.fillRect(hx - 5, CEIL + 5, 11, 1);
    ctx.fillRect(hx - 6, CEIL, 1, 6); ctx.fillRect(hx + 6, CEIL, 1, 6);
    ctx.fillStyle = P.outline;    ctx.fillRect(hx - 4, CEIL + 4, 9, 6);
    ctx.fillStyle = P.remoteBody; ctx.fillRect(hx - 3, CEIL + 4, 7, 6);
    ctx.fillStyle = P.remoteLit;  ctx.fillRect(hx - 3, CEIL + 4, 1, 6);
    ctx.fillStyle = P.remoteDark; ctx.fillRect(hx + 3, CEIL + 4, 1, 6);
    ctx.fillStyle = P.remoteKey;  ctx.fillRect(hx - 2, CEIL + 6, 3, 1);
    ctx.fillStyle = P.remoteRed;  ctx.fillRect(hx - 2, CEIL + 8, 2, 1);
    ctx.fillStyle = lit ? P.led : P.ledOff;
    ctx.fillRect(hx, CEIL + BODY_CEIL - 1, 1, 1);
  }

  /* ---------------------------------------------------- the controller

     The late hazard. A black pad sitting in a tan stand, firing a blue
     beam that LEANS - and that is the only thing in the room that does
     not stand still.

     THE ANGLE is two sine waves of different periods summed, which is
     the cheapest way to get a wander that never settles into a rhythm
     the player can count: 0.30 radians at 0.9 rad/s plus 0.18 at 2.3.
     Worst case 27.5 degrees off vertical and 39 degrees a second.

     THE CYCLE is its own: 2.2 to 3.4 seconds, drawn out of a hash of
     the seed and the cycle number, so no two pads on screen fire
     together and the same pad does not fire on a beat. It runs off
     ob.age, which moveObstacles advances once a frame BEFORE collide()
     is called - so what rectsFor computes and what drawObstacle draws
     come off the same number and cannot part company.

     WHAT MAKES IT FAIR is the aim line. It is drawn the entire time
     the pad is idle, a dotted blue walk along exactly the angle the
     beam will take. 0.45 seconds of arming is 50 to 80px of world, and
     a flap lifts 48px in 0.28s: a doodad standing on that line when
     the white ring starts flashing blue can always get off it.      */

  function ctrlEx(ob) { return Math.round(ob.x + ob.ex); }

  function ctrlAngle(ob) {
    return CTRL_SWING_A * Math.sin(CTRL_RATE_A * ob.age + ob.h1) +
           CTRL_SWING_B * Math.sin(CTRL_RATE_B * ob.age + ob.h2);
  }

  /* Where in its own cycle this pad is. Cycle lengths are summed from
     the start of the obstacle's life until the sum passes its age; an
     obstacle crosses the screen in about six seconds, so this loop
     runs two or three times, and the bound is there for the day
     somebody leaves one parked in a debugger. */
  function ctrlCycle(ob) {
    var sum = 0, C = 0, i;
    for (i = 0; i < 64; i++) {
      C = 2.2 + 0.15 * (hash(ob.seed * 7 + i) % 9);
      if (sum + C > ob.age) break;
      sum += C;
    }
    return { t: ob.age - sum, C: C };
  }

  function drawController(ctx, ob) {
    var ex = ctrlEx(ob);
    var base = FLOOR - CTRL_BODY;
    var th = ctrlAngle(ob);
    var cy = ctrlCycle(ob);
    var N = ob.len - CTRL_BODY;
    var armed = cy.t >= cy.C - 1.0 && cy.t < cy.C - 0.55;
    var firing = cy.t >= cy.C - 0.55 && cy.t < cy.C - 0.05;
    var fading = cy.t >= cy.C - 0.05;

    drawPadAndStand(ctx, ex, armed);

    if (firing || fading) {
      drawBtBeam(ctx, ex, base, th, N,
                 fading ? clamp((cy.t - (cy.C - 0.05)) / 0.05, 0, 1) : 0);
    } else {
      drawBtAim(ctx, ex, base, th, N, armed);
    }
  }

  /* 14x9 of pad on 14x6 of moulded stand, fifteen pixels in all. Ref 4
     has three of these in a row and the stands are the one warm thing
     in the photograph that is not stone, which is why they stayed tan. */
  function drawPadAndStand(ctx, ex, armed) {
    ctx.fillStyle = P.standTan; ctx.fillRect(ex - 7, FLOOR - 6, 14, 6);
    ctx.fillStyle = P.standLo;  ctx.fillRect(ex - 7, FLOOR - 3, 14, 3);
    ctx.fillStyle = P.outline;  ctx.fillRect(ex - 7, FLOOR - 1, 14, 1);

    ctx.fillStyle = P.ctrlBody; ctx.fillRect(ex - 7, FLOOR - 15, 14, 9);
    /* A BLACK PAD ON A BLACK SHELF has to be given its own edge or the
       fifteen pixels of it that kill you are invisible. The top and the
       two shoulders take ctrlLit, the underside ctrlDark - which is the
       same trick the Deck plays to lift a bronze heater off a bronze
       fence, and it is not optional on a lethal body. */
    ctx.fillStyle = P.ctrlLit;
    ctx.fillRect(ex - 7, FLOOR - 15, 14, 1);
    ctx.fillRect(ex - 7, FLOOR - 15, 1, 6);
    ctx.fillRect(ex + 6, FLOOR - 15, 1, 6);
    ctx.fillStyle = P.ctrlDark; ctx.fillRect(ex - 7, FLOOR - 7, 14, 1);
    /* the two grips, which are what makes a 14px blob read as a pad */
    ctx.fillStyle = P.ctrlDark;
    ctx.fillRect(ex - 7, FLOOR - 9, 2, 3);
    ctx.fillRect(ex + 5, FLOOR - 9, 2, 3);
    ctx.fillStyle = P.ctrlStick;
    ctx.fillRect(ex - 5, FLOOR - 12, 3, 3);
    ctx.fillRect(ex + 2, FLOOR - 11, 3, 3);
    /* The Xbox button: a 3x3 ring with a dark middle, because a filled
       square at this size reads as a sticker and a ring reads as a
       button. White while it is thinking about it; flashing blue at 8Hz
       for the 0.45 seconds before it shoots, which is the whole of the
       warning and so is the loudest thing on the shelf. */
    var hot = armed && Math.floor(stepClock() * 16) % 2;
    if (armed) Tint.rect(ctx, ex - 3, FLOOR - 17, 7, 7, P.ctrlRingBlue, hot ? 5 : 2);
    ctx.fillStyle = hot ? P.ctrlRingBlue : P.ctrlRing;
    ctx.fillRect(ex - 1, FLOOR - 15, 3, 3);
    ctx.fillStyle = P.ctrlDark;
    ctx.fillRect(ex, FLOOR - 14, 1, 1);
  }

  /* The pulse's clock. ob.age would do, but every pad on screen would
     then flash on its own phase and a row of them would look like a
     fault; off the scroll they flash together, which is what a shelf
     of charging controllers actually does. */
  function stepClock() { return scrollNow / 60; }

  /* walk the beam's line one pixel at a time. `step` is handed each
     plotted point, which is how the drawn line and the lethal boxes
     are guaranteed to be the same line. */
  function walkBeam(ex, base, th, N, every, step) {
    var sn = Math.sin(th), cs = Math.cos(th);
    for (var i = every; i <= N; i += every) {
      var px = Math.round(ex + sn * i);
      var py = Math.round(base - cs * i);
      if (py < CEIL) return;
      step(px, py, i);
    }
  }

  function drawBtAim(ctx, ex, base, th, N, armed) {
    ctx.fillStyle = armed ? P.btAimHot : P.btAim;
    walkBeam(ex, base, th, N, 3, function (px, py) {
      ctx.fillRect(px, py, 1, 1);
    });
  }

  function drawBtBeam(ctx, ex, base, th, N, fade) {
    var a = ctx.globalAlpha;
    if (fade > 0) {
      ctx.globalAlpha = a * (1 - fade);
      ctx.fillStyle = P.btEdge;
      walkBeam(ex, base, th, N, 1, function (px, py) {
        ctx.fillRect(px, py, 1, 1);
      });
      ctx.globalAlpha = a;
      return;
    }
    /* the halo first, under everything, at the alpha a halo gets */
    ctx.globalAlpha = a * 0.4;
    ctx.fillStyle = P.btHalo;
    walkBeam(ex, base, th, N, 1, function (px, py) {
      ctx.fillRect(px - 2, py, 1, 1);
      ctx.fillRect(px + 2, py, 1, 1);
    });
    ctx.globalAlpha = a;
    ctx.fillStyle = P.bt;
    walkBeam(ex, base, th, N, 1, function (px, py) {
      ctx.fillRect(px - 1, py, 1, 1);
      ctx.fillRect(px + 1, py, 1, 1);
    });
    ctx.fillStyle = P.btCore;
    walkBeam(ex, base, th, N, 1, function (px, py) {
      ctx.fillRect(px, py, 1, 1);
    });
    ctx.fillStyle = P.btCore;
    ctx.fillRect(ex, base, 1, 1);
  }

  /* ---------------------------------------------- the falling things

     Dispatch is OFF THE FLAGS and never off anything the maker stored:
     the engine sets ob.gold and ob.sour AFTER makeDrop has returned, so
     a kind written down at birth is a kind that is already wrong by the
     time anything draws it. The Canopy learned this one the hard way.

     ob.spicy cannot happen here - this bay publishes no spicyChance -
     but it is folded in with the sour anyway, because a level that
     throws on a key it did not expect is worse than a level that paints
     a volume key when it meant to paint a pepper. */
  function kindOf(ob) {
    if (ob.gold) return 'capy';
    if (ob.sour || ob.spicy) return 'key';
    return 'pixel';
  }

  function drawDrop(ctx, ob) {
    var kind = kindOf(ob);
    var x = Math.round(ob.x), y = Math.round(ob.y);
    var i, k, pulse;

    if (kind === 'pixel') {
      /* the frame comes off ob.spin, which is this drop's own clock -
         so a paused frame drawn twice is the same frame, and a dead
         pixel flips two or three times on the way down */
      var f = Math.floor(wrap(ob.spin, TAU) / TAU * 8) % 8;
      LivingRoom.blitBelowCeil(ctx, T.pixel[f].canvas, x - 5, y - 5);
      return;
    }

    if (kind === 'capy') {
      /* it falls three times as fast as anything else in the bay, so
         the trail is ABOVE it: what has to be read is where it is
         GOING, not where it is */
      pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
      LivingRoom.glow(ctx, x, y, Math.round(12 + pulse * 4),
                      'rgba(255,226,122,' + (0.40 * pulse).toFixed(3) + ')',
                      'rgba(230,192,74,' + (0.18 * pulse).toFixed(3) + ')',
                      'rgba(168,131,42,0)');
      for (i = 0; i < 2; i++) {
        k = wrap(ob.spin * 0.9 + i * 0.5, 1);
        var ty = y - 8 - Math.round(k * 7);
        if (ty < CEIL) continue;
        ctx.fillStyle = i ? P.capyHi : P.capyGold;
        ctx.fillRect(x - 2 + i * 4, ty, 1, 1);
      }
      LivingRoom.blitBelowCeil(ctx, T.capy.canvas, x - 6, y - 5);
      return;
    }

    /* the VOL- key, in the engine's own sour pigments - 214,255,122 and
       143,212,74 are PlayScene's SOUR_GLOW and SOUR_GLOW_EDGE, so the
       drop is literally the colour of the aura it buys */
    pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
    LivingRoom.glow(ctx, x, y, Math.round(13 + pulse * 5),
                    'rgba(214,255,122,' + (0.44 * pulse).toFixed(3) + ')',
                    'rgba(143,212,74,' + (0.20 * pulse).toFixed(3) + ')',
                    'rgba(95,143,34,0)');
    for (i = 0; i < 2; i++) {
      k = wrap(ob.spin * 0.7 + i * 0.41, 1);
      var sy = y - 8 - Math.round(k * 7);
      if (sy < CEIL) continue;
      ctx.fillStyle = i ? P.keyGreenHi : P.keyGlyph;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), sy, 1, 1);
    }
    LivingRoom.blitBelowCeil(ctx, T.key.canvas, x - 5, y - 5);
  }

  /* the spot on the shelf a falling thing is heading for: it tightens
     and darkens as it comes, so a landing is never a surprise. A dead
     pixel gets its three colours in the spot as well - three pixels of
     red, green and blue on the black paint, which is the only place
     in the bay where the shelf has any colour on it at all. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(11 - k * 5);
    var kind = kindOf(ob);
    var col = kind === 'capy' ? P.capyHi : (kind === 'key' ? P.keyGreen : P.void);
    var x = Math.round(ob.x);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3, col,
              (kind === 'capy' ? 8 : 6) + k * (kind === 'capy' ? 10 : 9));
    if (kind !== 'pixel') return;
    ctx.fillStyle = P.pxRed;   ctx.fillRect(x - 2, FLOOR + 1, 1, 1);
    ctx.fillStyle = P.pxGreen; ctx.fillRect(x, FLOOR + 1, 1, 1);
    ctx.fillStyle = P.pxBlue;  ctx.fillRect(x + 2, FLOOR + 1, 1, 1);
  }

  /* seven subpixels scattered where the thing burst, flickering on and
     off the way a failing panel does */
  var SPLAT_SPREAD = [[-6, 1], [-3, 2], [-1, 1], [1, 2], [3, 1], [5, 2], [7, 1]];

  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x);
    var a = ctx.globalAlpha;
    var kind = kindOf(ob);
    var i;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);

    if (kind === 'capy') {
      /* a +5 nobody caught is mourned, the way the Deck mourns a golden
         apple: it keeps glowing for the first 0.4 of the splat */
      if (k > 0.6) {
        var g = ctx.createRadialGradient(x, FLOOR, 1, x, FLOOR, 10);
        g.addColorStop(0, 'rgba(255,226,122,' + (0.22 * (k - 0.6) / 0.4).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(168,131,42,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - 10, FLOOR - 10, 20, 20);
      }
      /* lying on its side on the shelf */
      ctx.fillStyle = P.capyLo;   ctx.fillRect(x - 6, FLOOR + 1, 12, 3);
      ctx.fillStyle = P.capyGold; ctx.fillRect(x - 5, FLOOR + 1, 10, 2);
      ctx.fillStyle = P.capyHi;   ctx.fillRect(x - 5, FLOOR + 1, 10, 1);
      ctx.fillStyle = P.capyInk;  ctx.fillRect(x + 4, FLOOR + 2, 1, 1);
      ctx.globalAlpha = a;
      return;
    }

    if (kind === 'key') {
      /* the key face up on the paint, the green gone out of it */
      ctx.fillStyle = P.keyGreenLo; ctx.fillRect(x - 5, FLOOR + 1, 10, 3);
      ctx.fillStyle = P.keyGreen;   ctx.fillRect(x - 4, FLOOR + 1, 8, 2);
      ctx.fillStyle = P.keyGlyph;   ctx.fillRect(x - 1, FLOOR + 2, 3, 1);
      ctx.globalAlpha = a;
      return;
    }

    /* and the dead pixel, come apart into its three colours */
    var on = Math.floor(ob.broken * 12) % 2;
    for (i = 0; i < SPLAT_SPREAD.length; i++) {
      if ((i % 2) === on) continue;
      ctx.fillStyle = i % 3 === 0 ? P.pxRed : (i % 3 === 1 ? P.pxGreen : P.pxBlue);
      ctx.fillRect(x + SPLAT_SPREAD[i][0], FLOOR + SPLAT_SPREAD[i][1], 1, 1);
    }
    ctx.fillStyle = P.pxWhite;
    ctx.fillRect(x + SPLAT_SPREAD[3][0], FLOOR + SPLAT_SPREAD[3][1], 1, 1);
    ctx.globalAlpha = a;
  }

  /* --------------------------------------------------------- the boon

     The cover stays where somebody left it; the cell is what you take.
     Gerald's hunger moves dx/dy, and only the battery travels with it -
     the same split the Garden's pot and rosette have, and the reason
     drawBoon takes two origins. */
  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    /* ob.x is this boon's LEFT EDGE and not its middle - the Living Room's
       convention, and the reason for it is the box rule: collide() culls
       and save() clears on [ob.x, ob.x + ob.w], so a boon whose x was its
       centre would hand out a box starting six pixels to the left of
       anything either of them ever looks at. */
    var px = Math.round(ob.x);
    var rx = Math.round(ob.x + ob.dx), ry = Math.round(FLOOR + ob.dy);
    var cx = rx + 5;                 /* the middle of the cell itself */
    var lifted = ob.dy < -1 || ob.dx > 1 || ob.dx < -1;
    var i, k;

    ctx.drawImage(T.door.canvas, px, FLOOR - 3);

    /* the jade an extra life glows in, in every level in this game */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + ob.age * 2.2);
    LivingRoom.glow(ctx, cx, ry - 11, Math.round(15 + pulse * 4),
                    'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')',
                    'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')',
                    'rgba(47,107,98,0)');

    ctx.drawImage(T.battery.canvas, rx + 2, ry - 19);

    /* once it is up off the cover the terminals start to spark */
    if (lifted) {
      for (i = 0; i < 2; i++) {
        k = wrap(ob.phase * 0.5 + i * 0.5, 1);
        ctx.fillStyle = i ? P.battCopperHi : P.battSilverHi;
        ctx.fillRect(cx - 2 + i * 4, ry - 21 - Math.round(k * 5), 1, 1);
      }
    }
    for (i = 0; i < 2; i++) {
      k = wrap(ob.phase * 0.22 + i * 0.5, 1);
      ctx.fillStyle = i ? P.lifePale : P.battSilverHi;
      ctx.fillRect(cx - 4 + i * 7, ry - 20 - Math.round(k * 9), 1, 1);
    }
  }

  /* ------------------------------------------------- ground dressing

     Four things somebody left on the shelf. None of them has a box -
     they are the furniture of the place, and the AA lying on its side
     is there on purpose: it is the spare life's silhouette, seen once
     or twice as scenery long before the glowing one turns up, so the
     thing is already familiar when it starts being worth something. */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2;
    var i;
    if (ob.kind === 0) {
      /* dust, and a fly that has been there since the spring */
      for (i = 0; i < ob.seed.length; i++) {
        ctx.fillStyle = i % 4 ? P.mantleScuff : P.dust;
        ctx.fillRect(x + ob.seed[i][0], y + ob.seed[i][1], 1, 1);
      }
      ctx.fillStyle = P.mantleScuff; ctx.fillRect(x + 11, y + 2, 3, 2);
      ctx.fillStyle = P.mantleScratch; ctx.fillRect(x + 12, y + 2, 1, 1);
    } else if (ob.kind === 1) {
      ctx.fillStyle = P.battSilver;   ctx.fillRect(x, y + 2, 7, 3);
      ctx.fillStyle = P.battSilverHi; ctx.fillRect(x, y + 2, 7, 1);
      ctx.fillStyle = P.battCopper;   ctx.fillRect(x + 6, y + 2, 1, 3);
      ctx.fillStyle = P.outline;      ctx.fillRect(x, y + 5, 7, 1);
    } else if (ob.kind === 2) {
      /* a cable tie, curled where it was cut off a lead */
      ctx.fillStyle = P.cable;
      for (i = 0; i < 12; i++) {
        ctx.fillRect(x + i, y + 3 + Math.round(Math.sin(i * 0.5) * 1.4), 1, 1);
      }
      ctx.fillStyle = P.cableHi; ctx.fillRect(x + 2, y + 2, 1, 1);
    } else {
      /* a loose AAA, the one nobody can ever find a use for */
      ctx.fillStyle = P.battBlack;    ctx.fillRect(x, y + 3, 6, 2);
      ctx.fillStyle = P.battSilverLo; ctx.fillRect(x, y + 3, 6, 1);
      ctx.fillStyle = P.battCopper;   ctx.fillRect(x + 5, y + 3, 1, 2);
      ctx.fillStyle = P.outline;      ctx.fillRect(x, y + 5, 6, 1);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') {
      if (ob.kind === 'ctrl') drawController(ctx, ob);
      else drawRemotes(ctx, ob);
    } else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') {
      if (ob.broken > 0) drawDropSplat(ctx, ob);
      else drawDrop(ctx, ob);
    }
  }

  /* ------------------------------------------------------ the cover art

     The little live window on the level select: 118x114 on the big card,
     82x94 on the side ones. The generic cover is the Coop's shapes
     recoloured, which reads as neither level, so this paints the bay's
     own and nothing else: a dark panel with the room low in it, the
     stone band, the black shelf, two stone pilasters with shelf caps
     sliding past, a remote firing, and a dead pixel coming apart on the
     way down. The caller has already clipped to the box, so nothing
     here clips, saves or restores. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var shelfY = y + h - Math.round(h * 0.17);   /* the black mantle   */
    var lidY = y + Math.round(h * 0.09);         /* the crown moulding */
    var stoneY = shelfY - 13;                    /* three 4px courses  */
    var i;

    /* 1. The glass, and almost nothing in it. Two thirds of this card
       is a switched-off television, which is the single truest thing
       about the level: the eye should go to the stone and the red line
       and find nothing anywhere else. */
    ctx.fillStyle = P.screenMid; ctx.fillRect(x, y, w, h);
    Tint.rect(ctx, x, y, w, Math.round(h * 0.40), P.screenDeep, 7);

    /* the room low down in it: the sofa's slab, the line where the
       floor starts, and one amber pendant. Three shapes, no detail -
       any more and the panel stops being glass and becomes a window. */
    var rf = y + Math.round(h * 0.58);
    ctx.fillStyle = P.reflWall;    ctx.fillRect(x, rf - 14, w, 14);
    ctx.fillStyle = P.reflCouch;   ctx.fillRect(x + 5, rf - 12, Math.round(w * 0.52), 12);
    ctx.fillStyle = P.reflCushion; ctx.fillRect(x + 8, rf - 10, Math.round(w * 0.22), 5);
    ctx.fillStyle = P.reflFloor;   ctx.fillRect(x, rf, w, stoneY - rf - 2);
    ctx.fillStyle = P.reflFloorHi; ctx.fillRect(x, rf, w, 1);
    /* the room's own night, which in the bay itself is two of the four
       ramps LivingRoom bakes into its light sheet - it was five flat
       Tints once and the whole room was rebuilt to stop it being. Two
       flat steps is the right answer HERE and nowhere else: this card
       is 118px wide, it is never flown through, and nobody has ever
       read a ruled line on a thumbnail. Without them the reflected
       floor is the brightest field on the card and the stone band under
       it has nothing to stand off. */
    Tint.rect(ctx, x, rf - 6, w, stoneY - rf + 6, P.void, 5);
    Tint.rect(ctx, x, rf + 6, w, stoneY - rf - 6, P.void, 4);

    var lx = x + Math.round(w * 0.72);
    Tint.rect(ctx, lx - 6, y + Math.round(h * 0.18), 13, 18, P.lampWarm, 2);
    ctx.fillStyle = P.reflLamp;   ctx.fillRect(lx - 2, y + Math.round(h * 0.24), 5, 6);
    ctx.fillStyle = P.reflLampHi; ctx.fillRect(lx - 1, y + Math.round(h * 0.26), 3, 2);

    /* 2. the panel's bottom bezel, and the stone band under it */
    ctx.fillStyle = P.bezelDark; ctx.fillRect(x, stoneY - 2, w, 2);
    ctx.fillStyle = P.bezelHi;   ctx.fillRect(x, stoneY - 2, w, 1);
    for (var crs = 0; crs < 3; crs++) {
      var cy = stoneY + crs * 4;
      var step = 11 + crs * 3;
      for (i = -1; i <= Math.ceil(w / step); i++) {
        var sx = x + Math.round(wrap(i * step - s * 0.18 + crs * 5, w + step * 2)) - step;
        var px0 = Math.max(x, sx), pw = Math.min(sx + step - 1, x + w) - px0;
        if (pw <= 0) continue;
        ctx.fillStyle = STONES[wrap(i + crs * 5, STONES.length)];
        ctx.fillRect(px0, cy, pw, 3);
        ctx.fillStyle = P.stoneLit;   ctx.fillRect(px0, cy, pw, 1);
        ctx.fillStyle = P.stoneJoint; ctx.fillRect(px0, cy + 3, pw, 1);
      }
    }

    /* 3. the shelf the whole bay stands on, with its lit arris */
    ctx.fillStyle = P.mantleGloss; ctx.fillRect(x, shelfY, w, 1);
    ctx.fillStyle = P.mantleTop;   ctx.fillRect(x, shelfY + 1, w, 2);
    ctx.fillStyle = P.mantleDeep;  ctx.fillRect(x, shelfY + 3, w, 1);
    ctx.fillStyle = P.mantleFace;  ctx.fillRect(x, shelfY + 4, w, y + h - shelfY - 4);
    ctx.fillStyle = P.mantleScuff;
    ctx.fillRect(x + wrap(Math.round(s) * 3, w), shelfY + 2, 2, 1);
    ctx.fillRect(x + wrap(Math.round(s) * 3 + 37, w), shelfY + 1, 1, 1);

    /* 4. two pilasters with their black caps going past. The gaps walk
       in thirds of the room rather than off a modulus - the Deck's
       lesson: `(i * 19) % room` put all three in the same band on the
       narrow card and it read as scaffolding. */
    var period = big ? 46 : 38;
    var span = shelfY - lidY;
    var firstOx = 0;
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - wrap(s + i * period, period * 3));
      if (i === 0) firstOx = ox;
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.34);
      var room = Math.max(1, span - gapH - 18);
      var gapY = Math.round(lidY + 8 + (i * room) / 3);
      pvColumn(ctx, ox, lidY + 2, gapY - lidY - 2, false);
      pvColumn(ctx, ox, gapY + gapH, shelfY - gapY - gapH, true);
    }

    /* 5. A remote standing on the shelf between two pilasters - which
       is where the spawner actually puts them - blinking its cue and
       then firing. On for 0.7 of every 2.6 seconds, which is a shade
       more generous than the real 0.21 of a period: a card that is
       dark for five sixths of its cycle does not say what the level is. */
    var mx = firstOx + Math.round(period / 2);
    if (mx > x + 3 && mx < x + w - 5) {
      var ph = t % 2.6;
      var shot = ph > 1.9;
      var arming = !shot && ph > 1.4;
      var blen = Math.min(Math.round(span * 0.38), shelfY - lidY - 6);
      ctx.fillStyle = P.remoteBody; ctx.fillRect(mx - 2, shelfY - 10, 5, 10);
      ctx.fillStyle = P.remoteLit;  ctx.fillRect(mx - 2, shelfY - 10, 1, 10);
      ctx.fillStyle = P.remoteKey;  ctx.fillRect(mx - 1, shelfY - 7, 3, 1);
      ctx.fillRect(mx - 1, shelfY - 5, 3, 1);
      ctx.fillStyle = P.remoteRed;  ctx.fillRect(mx - 1, shelfY - 3, 2, 1);
      if (shot) {
        var by = shelfY - 11 - blen;
        Tint.rect(ctx, mx - 2, by, 1, blen, P.laserHalo, 8);
        Tint.rect(ctx, mx + 2, by, 1, blen, P.laserHalo, 8);
        ctx.fillStyle = P.laserEdge; ctx.fillRect(mx - 1, by, 3, blen);
        ctx.fillStyle = P.laser;
        for (i = wrap(Math.floor(s), 4); i < blen; i += 4) ctx.fillRect(mx - 1, by + i, 3, 2);
        ctx.fillStyle = P.laserCore; ctx.fillRect(mx, by, 1, blen);
      } else if (arming) {
        ctx.fillStyle = Math.floor(t * 8) % 2 ? P.aimHot : P.aim;
        for (i = 3; i < blen; i += 3) ctx.fillRect(mx, shelfY - 11 - i, 1, 1);
      }
      ctx.fillStyle = (shot || (arming && Math.floor(t * 8) % 2)) ? P.led : P.ledOff;
      ctx.fillRect(mx, shelfY - 11, 1, 1);
    }

    /* 6. a dead pixel tumbling down the right third, stepping through
       the same eight widths the real one does */
    var pf = Math.floor(s / 4) % 8;
    var pw2 = Math.max(1, Math.round(PIX_W[pf] * 0.5));
    var pxx = x + Math.round(w * 0.80);
    var pyy = Math.round(lidY + 4 + wrap(s * 1.5, stoneY - lidY - 10));
    ctx.fillStyle = P.pxOutline;
    ctx.fillRect(pxx - Math.floor(pw2 / 2) - 1, pyy - 1, pw2 + 2, 7);
    if (pw2 <= 1) {
      ctx.fillStyle = P.pxWhite; ctx.fillRect(pxx, pyy, 1, 5);
    } else {
      var third = Math.max(1, Math.round(pw2 / 3));
      var o0 = pxx - Math.floor(pw2 / 2);
      ctx.fillStyle = pf < 4 ? P.pxRed : P.pxBlue;   ctx.fillRect(o0, pyy, third, 5);
      ctx.fillStyle = P.pxGreen;                     ctx.fillRect(o0 + third, pyy, third, 5);
      ctx.fillStyle = pf < 4 ? P.pxBlue : P.pxRed;   ctx.fillRect(o0 + third * 2, pyy, pw2 - third * 2, 5);
    }

    /* 7. The doodad flying it, and NO halo behind it. Every other cover
       in the game puts a square of its own air behind the bird, because
       a tan doodad on sunlit stucco or on a brown fence disappears. On
       a switched-off television it is the brightest thing on the card
       already, and the tint only ever read as a box it was sitting in. */
    var dx = Math.round(x + w * 0.3);
    var dy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    ctx.fillStyle = P.outline;  ctx.fillRect(dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx + sz / 2 - 2, dy - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(dx + sz / 2, dy, 2, 1);

    /* 8. and the crown moulding's hard line across the top, which in
       this room is the thing that ends runs */
    ctx.fillStyle = R.plasterMid; ctx.fillRect(x, y, w, lidY - y);
    ctx.fillStyle = R.crown;      ctx.fillRect(x, lidY - 3, w, 1);
    ctx.fillStyle = R.plasterLit; ctx.fillRect(x, lidY - 2, w, 1);
    ctx.fillStyle = R.crownShade; ctx.fillRect(x, lidY - 1, w, 1);
    ctx.fillStyle = R.outline;    ctx.fillRect(x, lidY, w, 1);
    Tint.rect(ctx, x, lidY + 1, w, 4, R.crownShade, 5);
    Tint.rect(ctx, x, y, w, h, P.lampWarm, 1);
  }

  /* One little stone pilaster inside a cover. `capTop` says the black
     shelf goes on its upper end - the arris always faces the gap, here
     as in the room. The courses take their colour off a hash of their
     own position rather than off a counter: a three-colour cycle up a
     12px column is a ladder, and the first pass of this card was four
     white ladders sliding past. */
  function pvColumn(ctx, x, y, h, capTop) {
    if (h <= 0) return;
    var i, n, hgt;
    for (i = 0; i < h; i += 4) {
      n = (Math.imul(i + 11, 2654435761) ^ Math.imul(x + 3, 40503)) >>> 0;
      hgt = Math.min(3, h - i);
      ctx.fillStyle = STONES[(n >>> 13) % STONES.length];
      ctx.fillRect(x, y + i, 12, hgt);
      ctx.fillStyle = P.stoneLit;   ctx.fillRect(x, y + i, 12, 1);
      if (i + 3 < h) { ctx.fillStyle = P.stoneJoint; ctx.fillRect(x, y + i + 3, 12, 1); }
      /* one course in three is two pieces rather than one */
      if ((n >>> 3) % 3 === 0) {
        ctx.fillStyle = P.stoneJoint;
        ctx.fillRect(x + 3 + ((n >>> 7) % 6), y + i, 1, hgt);
      }
    }
    ctx.fillStyle = P.outline; ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 11, y, 1, h);
    var cy = capTop ? y : y + h - 5;
    ctx.fillStyle = P.mantleFace;  ctx.fillRect(x - 2, cy, 16, 5);
    ctx.fillStyle = P.mantleTop;   ctx.fillRect(x - 2, capTop ? cy + 1 : cy + 3, 16, 1);
    ctx.fillStyle = P.mantleGloss; ctx.fillRect(x - 2, capTop ? cy : cy + 4, 16, 1);
    ctx.fillStyle = P.outline;     ctx.fillRect(x - 2, capTop ? cy + 4 : cy, 16, 1);
  }

  /* ------------------------------------------------------- generation */

  function makePillar(x, gapY, gapH, run) {
    return { type: 'pillar', x: x, w: 34,
             gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.38) ? 1 : 0, scored: false };
  }

  /* A signal, or a pair of them - or, late on and on the floor only, a
     game controller.

     `run.late` is the ONE thing a maker is allowed to know about how
     far along the run is, and the licence for a hazard that is harder
     than the ones before it. The roll climbs from nothing at the score
     the WARN goes up to one floor spike in two at ten points past it:
     the remotes never stop coming, the pads merely start joining in.

     THE LENGTH. The tune's spikeCeilMin..Max and spikeFloorMin..Max
     are the reach of the SIGNAL; the remote itself is added back on
     top, because `len` is a spike's whole reach into the room and the
     body is part of what is in the way. That puts a floor remote at 26
     to 42px of obstruction and a ceiling one at 21 to 36 - within a
     pixel or two of the Deck's misters, which is the right calibration
     for a hazard that is thin: a 3px beam has to reach about as far as
     an 11px jet to ask the same question. */
  function makeSpikes(x, side, count, maxLen, run) {
    if (side === 'floor' && run && run.late &&
        chance(clamp((run.score - LATE_SCORE) * 0.05, 0, 0.5))) {
      return makeController(x, maxLen);
    }

    /* three or four nozzles' worth is one remote, five or six is two of
       them 30px apart - the Deck's fifty-fifty split, which keeps a
       cluster under 41px and never walls the shelf off */
    var heads = count >= 5 ? 2 : 1;
    var body = side === 'ceil' ? BODY_CEIL : BODY_FLOOR;
    var spikes = [], i;
    for (i = 0; i < heads; i++) {
      spikes.push({ dx: i * 30,
                    len: body + Math.max(8, Math.round(rand(maxLen * 0.7, maxLen))) });
    }
    /* ONE seed for both: they are the same person's hand on the same
       cushion, so they fire together. x is the LEFT edge of everything
       this obstacle can collide with and w its full width - collide()
       culls on those two numbers and save() clears on them, so the
       first remote's clip starts at x and not three pixels left of it. */
    return { type: 'spike', kind: 'remote', x: x, side: side,
             spikes: spikes, w: 30 * (heads - 1) + 11,
             seed: rand(0, BEAM_PERIOD), age: 0 };
  }

  /* The pad. `x` is where the engine wanted the hazard, so that is
     where the EMITTER goes and the obstacle's own left edge is set
     CTRL_HALF to the left of it: ob.x..ob.x+ob.w is the window the
     beam can be found anywhere inside, and every box this thing ever
     produces is inside it, whatever the lean is doing. */
  function makeController(x, maxLen) {
    var reach = Math.max(12, Math.round(rand(maxLen * 0.7, maxLen) * CTRL_STRETCH));
    var seed = randInt(1, 1000000);
    return { type: 'spike', kind: 'ctrl', side: 'floor',
             x: x - CTRL_HALF, ex: CTRL_HALF, w: CTRL_HALF * 2,
             len: CTRL_BODY + reach,
             seed: seed,
             /* the two phases the lean is built on, hashed once at
                birth so the wander is the same wander every frame */
             h1: (hash(seed) % 1000) / 1000 * TAU,
             h2: (hash(seed * 3 + 11) % 1000) / 1000 * TAU,
             age: 0 };
  }

  /* Something off the top row of the picture. x and y are its CENTRE,
     because it falls and flips rather than sitting on a grid.

     Three kinds, one type string: a dead pixel, the VOL- key and the
     capybara. Only the capybara is decided here - the engine rolls the
     sour itself and sets ob.sour after this returns, which is why
     nothing below writes down what kind of thing it is making. */
  function makeDrop(x, spicy, fall, run) {
    var gold = false;
    if (goldGap > 0) goldGap--;
    else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }

    var ob = { type: 'drop', x: x, y: CEIL + 5, w: 9, vy: fall,
               spicy: !!spicy, gold: gold, broken: 0,
               spin: rand(0, TAU),
               /* faster than fruit, so a pixel flips two or three times
                  on the way down and the eight frames are seen as a
                  rotation rather than as a flicker */
               spinRate: rand(4.5, 8) * (chance(0.5) ? -1 : 1) };
    if (gold) {
      /* it comes down in about a second and a half against a pixel's
         four, so catching one is nerve and not a formality */
      ob.w = 11;
      ob.vy = fall * 2.2 + 70;
      ob.name = GOLD_NAME;
    }
    return ob;
  }

  function makeLitter(x, run) {
    var kind = randInt(0, 3), seed = [], i;
    if (kind === 0) for (i = 0; i < 11; i++) seed.push([randInt(0, 16), randInt(0, 4)]);
    return { type: 'litter', x: x, w: 18, kind: kind, seed: seed };
  }

  /* The spare life. `x` is the LEFT edge of the battery cover and `y` is
     the height it is GRABBED at - the middle of the cell, because the
     cell is the thing - and dx/dy is where Gerald has dragged it to
     relative to the cover it was standing on. */
  function makeBoon(x, run) {
    return { type: 'boon', x: x, y: FLOOR - 11, w: 12, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0,
             name: BOON_NAME,
             burst: [P.battCopperHi, P.lifePale, P.lifeJade, P.battSilverHi] };
  }

  /* ----------------------------------------------- collision rectangles

     Every lethal pixel has a box and nothing harmless has one: the
     soundbar, the cases, the scenery pad, the battery cover and all the
     litter are furniture, and the clip's outer pixels and a beam's halo
     are drawn and forgiven. */
  function rectsFor(ob, out) {
    var i;

    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
      return out;
    }

    if (ob.type === 'spike') {
      if (ob.kind === 'ctrl') return ctrlRects(ob, out);
      return remoteRects(ob, out);
    }

    if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      var kind = kindOf(ob);
      if (kind === 'capy') { out.push([ob.x - 6, ob.y - 5, 12, 10]); return out; }
      if (kind === 'key')  { out.push([ob.x - 5, ob.y - 5, 10, 10]); return out; }
      /* THE LETHAL WIDTH IS THE DRAWN WIDTH. A dead pixel seen edge on
         is one pixel across and it would be a cheat to kill with nine,
         so the box is the frame's own width - floored at 3, because a
         1px box on a thing moving 6px a frame is a hazard that simply
         passes through you. */
      var f = Math.floor(wrap(ob.spin, TAU) / TAU * 8) % 8;
      var bw = Math.max(3, PIX_W[f]);
      out.push([ob.x - Math.floor(bw / 2), ob.y - 4, bw, PIX_H]);
      return out;
    }

    if (ob.type === 'boon') {
      /* the cell is what you collect, so the box travels with it and
         the cover it was standing on has none. 10 of the cover's 12
         pixels, which is two of generosity either side of a 7px cell -
         a thing you are meant to catch gets a kind box. */
      if (!ob.taken) out.push([ob.x + ob.dx + 1, FLOOR + ob.dy - 19, 10, 16]);
    }
    return out;
  }

  /* A remote always has a box for its BODY - a seven pixel lump of
     plastic under a lethal ceiling is not a harmless riser, and one
     standing on the shelf is a kerb you can clip - and a box for its
     beam only inside 0.64..0.85, which is strictly inside the 0.62..0.86
     the beam is drawn in. The halo either side is drawn and does not
     kill: the same pixel of mercy the Coop's egg box gives. */
  function remoteRects(ob, out) {
    var p = remotePhase(ob);
    var hot = p >= 0.64 && p <= 0.85;
    var onCeil = ob.side === 'ceil';
    var i, s, hx, J;
    for (i = 0; i < ob.spikes.length; i++) {
      s = ob.spikes[i];
      hx = ob.x + s.dx + 5;
      if (onCeil) out.push([hx - 3, CEIL, 7, BODY_CEIL]);
      else out.push([hx - 3, FLOOR - BODY_FLOOR, 7, BODY_FLOOR]);
      if (!hot) continue;
      J = s.len - (onCeil ? BODY_CEIL : BODY_FLOOR);
      if (J < 2) continue;
      if (onCeil) out.push([hx - 1, CEIL + BODY_CEIL, 3, J]);
      else out.push([hx - 1, FLOOR - BODY_FLOOR - J, 3, J]);
    }
    return out;
  }

  /* The pad is always a box. Its beam, while it is lethal, is a 3x3 at
     every fourth plotted point along the SAME line drawBtBeam walks -
     which is how a diagonal gets collided honestly without a rotated
     rect, and why walkBeam exists rather than two copies of the same
     trigonometry. Both come off the same ob.age: moveObstacles
     advances it before collide() runs, and drawBg runs after that, so
     the box and the light are the same frame's answer. */
  function ctrlRects(ob, out) {
    var ex = ctrlEx(ob);
    var base = FLOOR - CTRL_BODY;
    var cy = ctrlCycle(ob);
    out.push([ex - 7, FLOOR - 15, 14, 15]);
    if (cy.t < cy.C - 0.53 || cy.t > cy.C - 0.07) return out;
    walkBeam(ex, base, ctrlAngle(ob), ob.len - CTRL_BODY, 4, function (px, py) {
      out.push([px - 1, py - 1, 3, 3]);
    });
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon,
    rectsFor: rectsFor
  };
})();
