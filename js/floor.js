/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM / THE FLOOR (3-2)

   Afternoon, and you are a hand's breadth off the white-oak boards,
   flying along UNDER THE DINING TABLE toward the kitchen. Drawn from
   Floor ref 1-5 and the Floor mop ref in Assets/Concept: ref 1 is the
   board-level view itself (the stools, their foot rings, the chrome
   glide, the knot in the near board, the fridge and the sneakers), ref 2
   the big cathedral grain and the far wall (glass uppers, the pothos, the
   coffee maker), ref 3 the pedestal's splayed foot and the seat
   undersides with their brackets and screws, ref 4 the white tapered
   chair leg with its dark glide, the apron and the shuttered window, and
   ref 5 the X-back chair, the fridge with its photographs and the island
   overhang.

   THE LAYERS, back to front, each at its own parallax:
     the far kitchen wall   0.18  uppers (two of them glass), the hood,
                                  the shuttered window, the tile splash,
                                  the far counter with the plant and the
                                  coffee maker, the far base cabinets
     the island             0.42  its overhang over shadowed shaker doors
                                  and drawer stacks, two whole stools, the
                                  fridge with its magnets, then a gap of
                                  wall with a pair of kicked-off sneakers
     three far boards       0.55 / 0.72 / 0.86 - sunlit kitchen floor
                                  running into the table's shade
     the near board         1.00  the floor band: the kill line, the lit
                                  arris, the cathedral grain and the knot
     the foreground         1.35  the pedestal's foot and a chair foot
   and over the lot one baked daylight sheet: the table's shade overhead
   and on the boards, the window's warmth on the right, a dim corner on
   the left for the mop to park in. Light comes from the LEFT - the
   dining-room windows - so every lit face here is a left face and every
   cast shadow falls right, the Couch's "over the doodad's left shoulder".

   THE LID IS THE TABLE'S UNDERSIDE AND IT DOES NOT KILL. The walnut ply,
   the pedestal's top block, two zinc brackets and the white apron with
   its screw heads; one outline row and then a dark soft row, which is the
   deliberate difference between a lid that bounces and a lid that kills.

   THE PILLARS ARE THE CHAIRS AND THE STOOLS (the owner's call). White
   tapered chair legs hang from their seat corners overhead, each ending
   in its dark glide pad; black steel stool legs stand on the boards, each
   with its walnut seat at the mouth of the gap and its foot ring at one
   fixed height, one in four on Floor ref 1's chrome adjustable foot. Both
   are SQUARE legs seen corner-on - a lit face, a crisp corner, a shaded
   face - because the first cut banded them like tubes and the black ones
   read as bins. Nothing else in the bay is leg-shaped at pillar scale:
   the two stools in the backdrop are a third the size and stand at the
   island.

   THE SIGNATURE IS THE CRUMBS, and they are the Couch's popcorn - the
   same stepDrop, the same hitPillar and hitKernel, the same numbers to
   the pixel (see HOP_MAX for the deal). Five kinds, one physics: bread,
   cracker, cereal O, cookie with its chip, puffed rice. Among them fall
   two liquid gifts that do NOT bounce - a hot sauce droplet (the heat)
   and a lime juice droplet (the lime) - and green and dry leaves lie on
   the boards as the spare life.

   AND FROM PACE 10, THE MOP. A green-and-white wet-dry vacuum-mop (the
   Floor mop ref, drawn with no brand and no word on it anywhere) rolls in
   at the left edge and stays. It is a WALL the doodad bumps and is never
   hurt by (it has no box at all), a very slow and weak draft the doodad
   leans against (ledger.drift, 12 px/s), and a mouth that pulls the
   crumbs, the droplets and the leaves left, harder, and drinks whatever
   reaches it. Its tank fills with what it eats. It never gets stronger:
   the owner asked for "a very slow and weak pull backwards", and that is
   all it is. See THE MOP.

   MEASURED, on the private harness: an autopilot that flaps for the gap
   and never steers sideways, 40 spare lives so a run never ends, a hit
   counted every time one is spent, 16 seeds a line.

     CONTRAST (mean luminance, the Couch's method). The flight lane, no
     furniture in it: 159..162. Behind the chair legs (rows 24..125)
     154..158, against a white leg body of 211 - fifty-five clear, with the
     outline and the 4px cast shadow on top. Behind the stools (140..241)
     162..165, against a black leg of 44 - a hundred and twenty clear.
     Every crumb fifty-four or more over the board it lands on (see P).

     THE REAL TUNE, 40 s a run. The Couch: 2.06 hits a run, every one a
     falling kernel. THE FLOOR as tuned: 0.19 - a tenth of it. Crumbs
     55 a run, 43 of them eaten by the mop (8 left off the edge before it
     came); droplets 5.7 a run (2.3 splat on the boards, 1.6 burst on a
     seat, 1.3 into the mop, the autopilot caught 0.1 - it never goes for
     them); leaves 1.25 a run, 0.75 eaten by the mop; the doodad on the
     wall 19% of the run (34% with the mop armed from the start); the idle
     lurch 4-5 times in 38 s.

     WHY THE FLOOR CAME OUT EASIER, AND IT IS THE SPAWN WINDOW. The brief's
     forecast (1.2-1.4x the Couch) assumed a doodad at X_START. The drift
     does what it says - it parks a doodad that does not fight it on the
     wall at x 57 - and the Couch's window (dropAhead 12..112) puts every
     crumb down 80-200px in front of that. Without the mop at all the bay
     measured 0.38 against the Couch's 1.56 (the slower drop rate), and
     with it the wall was the safest place in the room: the opposite of
     the owner's "forcing them to repeatedly move forward". The airborne
     pull (AIR_A, below) is the owner's own sentence and bends the rain
     back toward the wall; on its own it moved the number from no hits in
     8 runs to 0.44 (armed from 1, 38 s), because a fall is only so long.
     The window is the lever: dropAhead 45..190 measured 1.75 on the real
     tune (0.85x) and 50..200 measured 2.69 (1.31x) - the brief's band -
     with the autopilot now catching one to three droplets in ten that the
     draft brings to it. That is the lead's tune to set; the art is built
     for either.

   Same discipline as every bay: everything is generated and baked once,
   any shade over something that moves is a flat Tint or a baked alpha
   sheet, and there is no Dither anywhere in this file.
------------------------------------------------------------------ */
'use strict';

var Floor = (function () {

  var CEIL = DiningRoom.CEIL, FLOOR = DiningRoom.FLOOR;
  var H = DiningRoom.P;                       /* the house's pigments */
  var wrap = DiningRoom.wrap, hash = DiningRoom.hash;
  var ringOf = DiningRoom.ringOf, ease = DiningRoom.ease, rgba = DiningRoom.rgba;
  var glow = DiningRoom.glow, blitBelowCeil = DiningRoom.blitBelowCeil;
  var drawColumn = DiningRoom.drawColumn;

  /* The bay's own pigments. PlayScene never reads this table. */
  var P = {
    /* THE OAK IN DAYLIGHT (Floor ref 1, 2, 5). The house's oak is the
       Living Room's, measured under four pendants at night; these are the
       same boards with the shutters open - each the Living Room value
       lifted about two values, same hue. */
    oakSun:       '#efe6d2',   /* the lit arris of a board, the rake catching it (230) */
    oakDay:       '#d8cdb4',   /* a board's face                               (205) */
    oakDayWarm:   '#cdbf9f',   /* every other board, a shade warmer             (190) */
    oakGrain:     '#a89777',   /* grain ticks and arcs                          (153) */
    oakGrainDeep: '#7e6c52',   /* the darker rings of the near board's cathedral (110) */
    oakSeam:      '#5f4e3c',   /* seams and end joints, and THE KILL LINE         (82) */
    oakKnot:      '#4b3b2d',   /* the knot (Floor ref 1)                          (62) */
    oakKnotRing:  '#8a7358',
    oakShade:     H.oakShade,  /* the bottom rows of the frame */

    /* THE CHAIRS' PAINT: the house's paint plus a lit face */
    paintHi:      '#f8f4ea',   /* the lit left face of a leg, the apron's arris (243) */
    glide:        '#3a3a3c',   /* the dark glide pad under a chair leg (Floor ref 4) */
    glideLit:     '#6a6a6c',

    /* THE STOOLS' BLACK STEEL: H.iron body, H.ironLit lit band, and the
       dark side of a round tube */
    ironDeep:     '#121010',

    /* THE ISLAND'S DOORS, IN THE OVERHANG'S SHADOW. Floor ref 1 shows them
       a full grey-cream under the countertop, and they are what a white
       chair leg is read against for half the screen's height. The brief's
       #b9b09c field in the house's cabinet frames measured a lane of 177
       behind a leg of 211 - thirty-four apart, a third of what the Couch's
       cushions have - so the whole island is a step down: the frames in
       shade (doorFrame), their lit arrises the house's cabinet white
       (doorLit), and the recessed field a value under that. */
    doorShade:    '#a9a08b',
    doorFrame:    '#cdc5b1',
    doorLit:      '#e4ddcc',

    /* THE ISLAND'S OVERHANG IS PLYWOOD, NOT WALNUT. The brief wrote it
       walnut; Floor ref 1 and ref 5 both show the underside of the island
       top as pale honey-coloured ply under a white stone lip, lit by the
       window, and the walnut is the TABLE's (it is the lid). Two walnuts
       a hundred pixels apart would have been one table read twice. */
    plyLit:       '#d2ad7e',
    ply:          '#b98f5f',
    plyShade:     '#906b44',

    /* THE CRUMBS - five kinds, one physics. Every body is held at least
       thirty values clear of the board it lands on (strip 3 under the
       table's shade measures 139 across FLOOR-6..FLOOR-3, grain and all,
       on the harness): bread 228, rice 229, cracker 200, cereal 198,
       cookie 192 - fifty-four and up. The brief's cereal (175) and cookie
       (168) were being read by their outline alone against the bare face
       of that board, so both were lifted a value, hue kept. */
    bread:        '#f0e4c8', breadHi: '#fbf5e4', breadShade: '#cdb990',
    crust:        '#b47c3f', crustDeep: '#7e5024',
    cracker:      '#e4c67c', crackerHi: '#f3dea3', crackerToast: '#b68a3c',
    cereal:       '#eec36f', cerealHi: '#fbe0a0', cerealShade: '#c08e44',
    cookie:       '#e8bb7c', cookieHi: '#f6d6a2', cookieShade: '#a8763c',
    chip:         '#4a2a1a', chipHi: '#7a4a30',
    rice:         '#efe5cd', riceHi: '#fbf6ea', riceShade: '#c9bc9c',

    /* THE TWO DROPLETS, and the two that never fall here but would be
       drawn as droplets if a tune ever sent one (see isLiquid) */
    hotSauce:     '#d8321c', hotSauceHi: '#ff8a5a', hotSauceDeep: '#8f1a0e', hotSheen: '#ffd9c8',
    lime:         '#b6e04e', limeHi: '#e4ff9a', limeDeep: '#5f9226', limeSheen: '#f4ffe0',
    whirl:        '#b061f0', whirlHi: '#e6b3ff', whirlDeep: '#5a2a8c', whirlSheen: '#f6e8ff',
    honey:        '#e8b04a', honeyHi: '#ffe08a', honeyDeep: '#a8701e', honeySheen: '#fff4d0',

    /* THE LEAVES - a green one off the pothos, a dry one blown in. The dry
       one is a dark russet and not the brief's tan: tan (148) sat inside
       the board's own range and vanished into it; at 113 it reads dark on
       light, as the green one (108) does. */
    leafVein:     '#a8cf7c',
    leafDry:      '#a8642a', leafDryLit: '#d08c3c', leafDryDeep: '#6e3e16', stem: '#5a3a1e',
    lifeJade:     '#5fae9a', lifePale: '#93d8bd',   /* every spare life glows these */

    /* THE MOP (Floor mop ref): green, white, grey, a clear tank, a brush
       roller behind a clear window */
    mopGreen:     '#7cc32e', mopGreenLit: '#a9e45a', mopGreenDeep: '#3f7a16',
    mopWhite:     '#f1f1ec', mopWhiteShade: '#c8cbc5',
    mopGrey:      '#7d8285', mopGreyDeep: '#45494c',
    mopTank:      '#b8c6cc', mopTankLit: '#e2ecf0',
    mopWater:     '#8d7c5f', mopWaterLit: '#b3a382',   /* dirty water, and its surface */
    roller:       '#d9d9d5', rollerStripe: '#8d9296', rollerDeep: '#5a5e61',
    cable:        '#1b1b1d',

    /* the fridge's magnets and photographs, and the sneakers */
    photoWhite:   '#f4f2ec', magnetPink: '#e86ea0', magnetGreen: '#5fb86a',
    magnetYellow: '#f2d35b', magnetBlue: '#78b8e0', photoSkin: '#e8c3a0',
    photoGrass:   '#8fb87a', photoDark: '#4a4440',
    sneaker:      '#5c5f62', sneakerLit: '#8a8d8f', sneakerSole: '#e9e9e4', sneakerDark: '#2a2a2c',

    outline:      H.outline, void: H.void
  };

  /* the neutral effect palette PlayScene paints from. Afternoon dust;
     what comes off the apron when a crumb lets go is crumb-coloured;
     what comes off the boards when one lands - or goes into the mop - is
     pale oak dust; the default splat is hot sauce (crumbs never land,
     droplets carry their own burst pair) */
  var FX = {
    motes: DiningRoom.AIR.motes, motesHi: DiningRoom.AIR.motesHi,
    puff: '#e8dcbf', puffHi: '#f6efe0',
    ground: '#b9ac90', groundHi: '#e6dcc4',
    splat: '#d8321c', splatHi: '#ff8a5a',
    hot: '#d8321c', hotMid: '#ff6a3c', hotHi: '#ffd27a',
    heat: '#e0461c', heatEdge: '#8f1a0e',
    glowCore: '255,214,160', glowEdge: '216,50,28'
  };

  /* the heads-up when a hazard arms. No `ceil`: the lid bounces. No
     `spike`: there are none. No `late`: the mop never gets stronger. */
  var WARN = {
    drop: ['▼ CRUMBS ▼', 'THEY BOUNCE. YOU WILL NOT.'],
    foe:  ['◀ THE MOP ◀', 'IT WANTS EVERYTHING BACK']
  };

  /* the thirteen colours a generic cover would be painted from. This bay
     paints its own, but the table stays honest: a generic card painted
     out of it comes out shaded cream doors and daylit oak */
  var PREVIEW = {
    back: P.doorShade, backAlt: H.cabinet, seam: H.cabinetDeep,
    beam: H.paint, beamDark: H.paintShade, beamLight: P.paintHi,
    ground: P.oakDay, groundDark: P.oakSeam, groundHi: P.oakSun,
    spike: P.cereal, spikeHi: P.cerealHi, air: H.daylight, gloom: H.void
  };

  /* the spare life's two names. Both fit the EXTRA LIFE caption, which
     is centred on the screen and not bound by the +5 clamp. */
  var GREEN_NAME = 'GREEN LEAF', DRY_NAME = 'DRY LEAF';
  /* dealt turn and turn about, like the Couch's coasters: a coin toss
     would show one player four dry leaves running. The first of a boot
     is the coin. */
  var nextDry = chance(0.5);

  var T = {};                 /* baked tiles and sprites */

  /* ------------------------------------------------------ the physics

     THE CRUMBS ARE THE COUCH'S POPCORN, NUMBER FOR NUMBER. The playfield
     is the same 24..242, gapMin is the same 82 and the spawn window the
     same 12..112, so every number the Couch solved holds here to the
     pixel and nothing below is re-solved:

       DROP_GRAV 150   the lightest gravity at which every crumb is still
                       on screen when it lands at top speed
       HOP 20..46      re-launched to a FIXED apex of its own, +-15%, so
                       nothing ever comes to rest and one look tells you
                       its rhythm. 46 is the one solved number: a crumb
                       launched at 46 x 1.15 tops its box out at
                       FLOOR-60, and a doodad flying the middle of the
                       lowest gap (gapMin 82, lower lip FLOOR-34) has its
                       hitbox bottom at FLOOR-64. Fly the middle of the
                       gap and the crumbs cannot reach you.
       VX_MAX 56       how far a crumb wanders sideways on its own
       KERNEL_R 3.5    collided as the lump it looks like

     What the mop adds is additive and horizontal: a pull, and a dip into
     its mouth in the last 30px. It never touches the apex at the
     doodad's column. */
  var DROP_GRAV = 150;
  var HOP_MIN = 20, HOP_MAX = 46, HOP_VARY = 0.15;
  var VX_MAX = 56;
  var KERNEL_R = 3.5, PAIR_D = 7;

  /* THE DROPLETS fall lighter than a crumb and do not bounce: 1.95s from
     the apron to the boards against a crumb's 1.67, so a gift stays
     catchable a little longer (and the engine has already handed every
     gift 0.78 of the fall speed). They splat - on the boards, or on a leg
     they strike on the way down. */
  var LIQ_GRAV = 110;
  var SPLAT_TIME = 1.4;

  /* ------------------------------------------------------- THE MOP

     WHERE IT PARKS. MOP_FACE is the screen x of the head's front, and of
     ledger.wall: with the hitbox radius of 11 the doodad's centre stops at
     57, which overrules X_MIN 32. The head is 64 wide, so 46px of it are
     on screen and the window shows about 40px of roller.

     THE ARRIVAL. From MOP_FROM to MOP_FACE in MOP_ROLL seconds on an
     ease-out: fast off the edge, settling over the last 20px, with the
     roller spinning at 18 frames a second and the suction (M.on) building
     as it comes. The engine's foe warning is on screen for 2.4s of it.

     THE PULL, and it is the owner's "very slow and weak pull backwards"
     held in one number. DRIFT 12 px/s against the doodad's own 116 is a
     tenth of the thumb: hands off, from X_START 116 to the wall at 57
     takes 4.9 s; one 0.2 s tap of RIGHT buys about 21 px, which is 1.8 s of
     not drifting. It is a thing you tap against every couple of seconds,
     not a thing you fight - and it never grows.

     EVERYTHING ELSE IS PULLED HARDER, which is the other half of the
     owner's sentence. Within PULL_REACH of the mouth a crumb accelerates
     left at PULL_A x s^2 (s = 1 at the mouth, 0 at the edge of the reach)
     up to SUCK_VMAX of its own on top of the room's scroll: at x 250 that
     is 22 px/s^2, at x 200 52, at x 100 148 - gentle where it lands, and
     winning inside two hops near the mouth. The droplets take 1.3x of it
     (they are falling anyway, so it only bends them), and a leaf on the
     boards slides at up to LEAF_SLIDE. The last DIP_W px bend an airborne
     crumb DOWN into the window, so the carpet goes into the mouth and not
     over it.

     AND WHAT IS STILL FALLING IS DRAWN BACK TOO - the owner's "pulls,
     stronger, on the falling crumbs and power-ups, which are drawn
     backward towards the mop and the player". The brief pulled only on
     the s^2 curve above, which is nothing at all out where a crumb falls
     (x 250..470), and measured on the harness that made the wall the
     SAFEST place in the bay: the drift parked the autopilot at x 57, every
     falling crumb came down 100-200px in front of it, and it lost no life
     at all in 8 x 38 s where the Couch's lost 13, every one of them to a
     falling kernel. Parked against the mop is meant to be the place you
     are pushed OUT of. So until a crumb or a droplet first touches the
     boards it is pulled across the whole screen - AIR_A, from 35% at the
     far edge of AIR_REACH to all of it at the mouth - and the rain bends
     back toward the mouth and through the column a doodad on the wall is
     sitting in. Hopping, it goes back onto the s^2 curve. Nothing about
     the apex changes; nothing about the doodad's own drift changes. See
     the header for the measured result.

     IT IS NEVER LETHAL. It is a litter object to the engine, which is the
     one obstacle type collide() never tests, and rectsFor returns nothing
     for it. The owner's word was a wall, and a wall is what it is. */
  var MOP_FACE = 46, MOP_FROM = -70, MOP_ROLL = 2.2;
  var DRIFT = 12;
  var PULL_REACH = 300, PULL_A = 220, SUCK_VMAX = 110;
  var LIQ_PULL = 1.0;
  var AIR_A = 140, AIR_REACH = 440;
  var DIP_W = 30, DIP_A = 300;
  var LEAF_SLIDE = 70;
  /* how many things it has to eat to fill its tank: a full tank at 80
     is about 50 seconds of an ordinary run's crumbs */
  var FILL_N = 80;
  /* THE IDLE LURCH. Every 4 to 7 seconds parked, the head strains forward
     3px over 0.4s and settles - the motor catching - and ledger.wall goes
     with it, so a doodad resting on the face is nudged 3px along. It is
     too slow to trip the engine's bounce (that wants 40 px/s into the
     wall; this is 24 at its quickest) and it is never more than 3px. */
  var LURCH_PX = 3, LURCH_T = 0.4;

  /* ---------------------------------------------------- bake helpers */

  function fill(c, col, x, y, w, h) { c.fillStyle = col; c.fillRect(x, y, w, h); }

  /* a one-row run that wraps round a tile W wide, so seeded grain never
     stops dead at a tile seam */
  function runW(c, col, x, y, len, W) {
    x = wrap(Math.round(x), W);
    c.fillStyle = col;
    var a = Math.min(len, W - x);
    c.fillRect(x, y, a, 1);
    if (len > a) c.fillRect(0, y, len - a, 1);
  }
  function dotW(c, col, x, y, W) { c.fillStyle = col; c.fillRect(wrap(Math.round(x), W), y, 1, 1); }

  /* a smooth per-row alpha strip laid into a tile - the room's bakeShade,
     but at an x and a width, because these shadows belong to one cabinet
     run and not to the whole screen. `down` puts the dark row at the top. */
  function shadeRows(c, col, x, y, w, rows, peak, down) {
    for (var i = 0; i < rows; i++) {
      var k = 1 - ease((i + 0.5) / rows);
      c.fillStyle = rgba(col, peak * k);
      c.fillRect(x, down ? y + i : y + rows - 1 - i, w, 1);
    }
  }

  /* plot a character grid through an ink table at (ox, oy); '.' is empty */
  function plot(c, grid, ink, ox, oy) {
    for (var r = 0; r < grid.length; r++) {
      for (var k = 0; k < grid[r].length; k++) {
        var ch = grid[r].charAt(k);
        if (ch === '.' || !ink[ch]) continue;
        c.fillStyle = ink[ch];
        c.fillRect(ox + k, oy + r, 1, 1);
      }
    }
  }
  function plotMask(c, grid, ox, oy) {
    c.fillStyle = '#ffffff';
    for (var r = 0; r < grid.length; r++) {
      for (var k = 0; k < grid[r].length; k++) {
        if (grid[r].charAt(k) !== '.') c.fillRect(ox + k, oy + r, 1, 1);
      }
    }
  }
  /* a grid baked into a w x h canvas at (1,1) with the 1px ring UNDER it
     - the Couch's bakePop, which is what lets the ring follow every notch */
  function bakeGrid(grid, ink, w, h) {
    var t = makeCanvas(w, h), m = makeCanvas(w, h);
    plot(t.ctx, grid, ink, 1, 1);
    plotMask(m.ctx, grid, 1, 1);
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.drawImage(ringOf(m, w, h).canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }
  /* four exact quarter turns of a 9x9 sprite about (4.5, 4.5): on an odd
     grid a square turn lands every pixel on a pixel, so nothing resamples */
  function quarterTurns(base) {
    var out = [base], f, t;
    for (f = 1; f < 4; f++) {
      t = makeCanvas(9, 9);
      t.ctx.translate(4.5, 4.5);
      t.ctx.rotate(f * Math.PI / 2);
      t.ctx.translate(-4.5, -4.5);
      t.ctx.drawImage(base.canvas, 0, 0);
      out.push(t);
    }
    return out;
  }
  /* a 2px leg from (x1,y1) down to (x2,y2), one row at a time */
  function legLine(c, col, x1, y1, x2, y2, wd) {
    for (var y = y1; y <= y2; y++) {
      var x = Math.round(x1 + (x2 - x1) * (y - y1) / Math.max(1, y2 - y1));
      fill(c, col, x, y, wd || 2, 1);
    }
  }

  /* ========================================================= THE LID

     The underside of the walnut table, 240 wide (one pedestal block and
     two brackets per tile, so the pedestal comes round every 240px and
     never two at once), parallax 1.0: it is right above you.

     Floor ref 3 and 4: the dark ply of the underside with its figure, the
     white-painted pedestal block bolted under the middle, zinc L-brackets
     at the corners, and along the bottom the white apron rail with a
     screw head every 60px. ONE outline row under the apron and then a
     walnut row, never the room's double black: that pair is the kill
     line, and this lid only stops you. */
  var LID_W = 240;

  function bakeLid() {
    var t = makeCanvas(LID_W, CEIL), c = t.ctx;
    var r = mulberry32(3207), i, x;

    fill(c, H.walnutDeep, 0, 0, LID_W, 12);
    /* the ply's figure: long, thin, sparse - one sheet of veneer */
    for (i = 0; i < 14; i++) {
      runW(c, H.walnut, r() * LID_W, 2 + Math.floor(r() * 10), 10 + Math.floor(r() * 21), LID_W);
    }
    for (i = 0; i < 5; i++) {
      runW(c, H.walnutLit, r() * LID_W, 3 + Math.floor(r() * 8), 4 + Math.floor(r() * 7), LID_W);
    }

    /* THE PEDESTAL'S TOP BLOCK (Floor ref 3): the white column's head,
       screwed up into the underside. Lit on its left face. */
    var PX = 98, PW = 44;
    fill(c, H.paint, PX, 2, PW, 8);
    fill(c, P.paintHi, PX + 1, 2, 3, 8);
    fill(c, H.paintShade, PX + PW - 5, 2, 4, 8);
    fill(c, H.paintShade, PX, 10, PW, 1);
    fill(c, H.paintDeep, PX, 11, PW, 1);
    fill(c, H.outline, PX, 2, 1, 10);
    fill(c, H.outline, PX + PW - 1, 2, 1, 10);
    fill(c, H.steelShade, PX + 6, 6, 2, 2);
    fill(c, H.steelShade, PX + 36, 6, 2, 2);
    fill(c, H.steelLit, PX + 6, 6, 1, 1);
    fill(c, H.steelLit, PX + 36, 6, 1, 1);

    /* two zinc L-brackets (Floor ref 3), with their bolts */
    [40, 190].forEach(function (bx) {
      fill(c, H.outline, bx - 1, 6, 11, 6);
      fill(c, H.steelLit, bx, 7, 9, 4);
      fill(c, H.steelShade, bx, 11, 9, 1);
      fill(c, H.steel, bx + 6, 7, 3, 4);
      fill(c, H.steelDeep, bx + 2, 8, 1, 1);
      fill(c, H.steelDeep, bx + 6, 10, 1, 1);
    });

    /* THE APRON (Floor ref 4): a white-painted rail with an arris lit
       from the window, a rounded under-edge and the hard line below it */
    fill(c, H.outline, 0, 12, LID_W, 1);
    fill(c, P.paintHi, 0, 13, LID_W, 1);
    fill(c, H.paint, 0, 14, LID_W, 5);
    fill(c, H.paintShade, 0, 19, LID_W, 1);
    fill(c, H.paintDeep, 0, 20, LID_W, 2);
    fill(c, H.outline, 0, 22, LID_W, 1);
    fill(c, H.walnutDeep, 0, 23, LID_W, 1);
    /* a screw head every 60px, 23 into the tile so none sits on a seam */
    for (x = 23; x < LID_W; x += 60) {
      fill(c, H.steel, x, 16, 2, 2);
      fill(c, H.steelShade, x + 1, 16, 1, 2);
      fill(c, H.steelShade, x, 17, 2, 1);
    }
    /* and the scuffs a rail gets from knees: short and pale grey, the
       chalky wear on every white thing in Floor ref 3 */
    for (i = 0; i < 6; i++) {
      runW(c, H.paintShade, r() * LID_W, 14 + Math.floor(r() * 5), 2 + Math.floor(r() * 3), LID_W);
    }
    return t;
  }

  /* ================================================ THE FAR KITCHEN WALL

     480 x 164, screen rows 24..187, parallax 0.18 - the far side of the
     kitchen, which barely moves (Floor 2, Floor ref 4). Small-featured,
     because it is far: no pulls on the uppers, no hinges, nothing a 1px
     dot would have to carry.

     Across the tile, left to right: three white uppers, a GLASS one, the
     HOOD over the range with the tile splash running up behind it, a
     second glass upper, the SHUTTERED WINDOW (the bay's light source, and
     the brightest thing in the layer) in a bay of plain wall, and one
     more upper. Under them the splash, the far counter with the pothos,
     the coffee maker and the kettle, and the far base cabinets - which
     only ever show in the gap between one island and the next. */
  var FAR_W = 480, FAR_H = 164, FAR_Y = CEIL;

  function bakeFar() {
    var t = makeCanvas(FAR_W, FAR_H), c = t.ctx;
    var r = mulberry32(4411), i, k, x, y;
    var UP_H = 36;                    /* the uppers: tile rows 0..35 */
    var SPL = 37, CTR = 60;           /* splash 37..59, the counter 60..64 */

    fill(c, H.wall, 0, 0, FAR_W, FAR_H);
    /* the grout, a pale grey and not the white it is up close: a white
       grid at this pitch is a net thrown over the wall */
    var GROUT = '#cbc5b7';

    /* -- THE SPLASH, laid first so the hood and the window sit on it:
       Floor 2's grey subway tile, 6x3 with a 1px grout, half-bond, the odd
       tile a shade darker by hash. It was 4x2 at first, and at that pitch
       half the wall was grout and it read as a net thrown over it. */
    function splash(x0, x1, y0, y1) {
      for (y = y0; y < y1; y++) {
        var course = Math.floor((y - SPL) / 4), ry = wrap(y - SPL, 4);
        for (x = x0; x < x1; x++) {
          var bx = x + ((course & 1) ? 3 : 0);
          var col;
          if (ry === 3 || (bx % 7) === 6) col = GROUT;
          else col = (hash(Math.floor(bx / 7) * 131 + course * 977) % 6 === 0) ? H.tileShade : H.tile;
          c.fillStyle = col;
          c.fillRect(x, y, 1, 1);
        }
      }
    }
    splash(0, FAR_W, SPL, CTR);
    /* and up behind the hood, where there are no cabinets */
    splash(192, 288, 0, SPL);

    /* -- THE UPPERS. 48 wide, a 4px frame lit on its left stile, a
       recessed field with the shaker bevel: dark under the top rail and
       inside the left stile, lit inside the right stile and on the bottom
       rail. Two are glass (Floor 2), with two shelves of white dishes
       behind the glints. */
    function upper(x0, glass) {
      var w = 48;
      fill(c, H.cabinetDeep, x0, 0, 1, UP_H);
      fill(c, H.cabinet, x0 + 1, 0, w - 1, UP_H);
      fill(c, H.cabinetLit, x0 + 1, 0, 1, UP_H);
      var fx = x0 + 5, fy = 3, fw = w - 9, fh = UP_H - 7;
      if (glass) {
        fill(c, H.tileShade, fx, fy, fw, fh);
        /* two glass shelves and the dishes standing on them */
        for (k = 0; k < 2; k++) {
          var sy = fy + 10 + k * 10;
          fill(c, H.cabinetLit, fx, sy, fw, 1);
          for (x = fx + 2; x < fx + fw - 4;) {
            var kind = Math.floor(r() * 3);
            if (kind === 0) {               /* a stack of plates */
              fill(c, H.paint, x, sy - 3, 7, 3);
              fill(c, H.paintShade, x, sy - 2, 7, 1);
              x += 9;
            } else if (kind === 1) {        /* a mug */
              fill(c, H.paint, x, sy - 3, 3, 3);
              fill(c, H.paintShade, x + 2, sy - 3, 1, 3);
              x += 5;
            } else {                        /* a glass */
              fill(c, H.steelLit, x, sy - 4, 2, 4);
              x += 4;
            }
          }
        }
        /* two glints across the glass, top left, where the window catches it */
        for (k = 0; k < 2; k++) {
          for (i = 0; i < 7 - k * 2; i++) fill(c, H.steelLit, fx + 3 + k * 4 + i, fy + 7 - i, 1, 1);
        }
      } else {
        fill(c, H.cabinetShade, fx, fy, fw, fh);
      }
      fill(c, H.cabinetDeep, fx, fy, fw, 1);
      fill(c, H.cabinetDeep, fx, fy, 1, fh);
      fill(c, H.cabinetLit, fx + fw - 1, fy + 1, 1, fh - 1);
      fill(c, H.cabinetLit, fx + 1, fy + fh - 1, fw - 1, 1);
    }
    upper(0, false); upper(48, false); upper(96, false);
    upper(144, true);
    upper(288, true);
    upper(432, false);
    /* the run's bottom edge, under every upper but not across the hood
       bay or the window bay, where there are none */
    fill(c, H.outline, 0, UP_H, 192, 1);
    fill(c, H.outline, 288, UP_H, 48, 1);
    fill(c, H.outline, 432, UP_H, 48, 1);
    fill(c, H.outline, 191, 0, 1, UP_H);
    fill(c, H.outline, 288, 0, 1, UP_H);
    fill(c, H.outline, 335, 0, 1, UP_H);
    fill(c, H.outline, 432, 0, 1, UP_H);
    /* the shadow the uppers throw on the splash under them */
    shadeRows(c, H.void, 0, SPL, 192, 4, 0.22, true);
    shadeRows(c, H.void, 288, SPL, 48, 4, 0.22, true);
    shadeRows(c, H.void, 432, SPL, 48, 4, 0.22, true);

    /* -- THE HOOD over the range: a steel chimney up into the lid and a
       wedge canopy under it, lit down its left edge. */
    var HX = 240;
    fill(c, H.outline, HX - 14, 0, 28, 12);
    fill(c, H.steel, HX - 13, 0, 26, 12);
    fill(c, H.steelLit, HX - 13, 0, 3, 12);
    fill(c, H.steelShade, HX + 9, 0, 4, 12);
    for (y = 12; y <= 33; y++) {
      var hw = Math.round(25 + 10 * (y - 12) / 21);
      fill(c, H.outline, HX - hw - 1, y, hw * 2 + 2, 1);
      fill(c, H.steel, HX - hw, y, hw * 2, 1);
      fill(c, H.steelLit, HX - hw, y, 3, 1);
      fill(c, H.steelShade, HX + hw - 4, y, 4, 1);
    }
    fill(c, H.outline, HX - 26, 11, 52, 1);
    fill(c, H.steelLit, HX - 25, 12, 50, 2);
    fill(c, H.steelDeep, HX - 35, 31, 70, 2);
    fill(c, H.outline, HX - 36, 33, 72, 1);
    /* its little lamp, lit, and the shadow it throws on the splash */
    fill(c, H.daylight, HX - 18, 33, 6, 1);
    fill(c, H.daylight, HX + 12, 33, 6, 1);
    shadeRows(c, H.void, HX - 34, 34, 68, 3, 0.18, true);

    /* -- THE WINDOW, in a bay of plain wall (Floor ref 4, top right): a
       white frame and seven open louvres with the daylight between them,
       a tilt rod down the middle, and a sill. */
    fill(c, H.wall, 336, 0, 96, SPL);
    var WX = 360, WY = 6, WW = 56, WH = 48;
    fill(c, H.outline, WX - 1, WY - 1, WW + 2, WH + 2);
    fill(c, H.paint, WX, WY, WW, WH);
    fill(c, P.paintHi, WX, WY, 1, WH);
    var ix = WX + 3, iy = WY + 3, iw = WW - 6;
    fill(c, H.paintShade, ix - 1, iy - 1, iw + 2, 1);
    fill(c, P.paintHi, ix + iw, iy - 1, 1, WH - 5);
    for (k = 0; k < 7; k++) {
      y = iy + k * 6;
      fill(c, H.paint, ix, y, iw, 1);
      fill(c, H.paintShade, ix, y + 1, iw, 1);
      fill(c, H.daylight, ix, y + 2, iw, 3);
      fill(c, H.paintDeep, ix, y + 5, iw, 1);
    }
    /* a frond of the garden through the slats, broken by them the way a
       thing behind a blind is (the Couch's palm, by day) */
    for (k = 0; k < 4; k++) {
      var fx0 = ix + 4 + Math.floor(r() * (iw - 16));
      var fy0 = iy + 2 + Math.floor(r() * 7) * 6;
      for (i = 0; i < 9; i++) {
        var py = fy0 + Math.round(i / 4) * 6;
        if (py >= iy + 42 || ((py - iy) % 6) < 2 || ((py - iy) % 6) > 4) continue;
        fill(c, '#c9d9a8', fx0 + i, py, 1, 1);
      }
    }
    fill(c, H.paintShade, ix + 24, iy, 2, 42);
    fill(c, P.paintHi, ix + 24, iy, 1, 42);
    /* the sill */
    fill(c, H.outline, WX - 4, WY + WH, WW + 8, 1);
    fill(c, P.paintHi, WX - 3, WY + WH + 1, WW + 6, 1);
    fill(c, H.paint, WX - 3, WY + WH + 2, WW + 6, 1);
    fill(c, H.outline, WX - 4, WY + WH + 3, WW + 8, 1);
    shadeRows(c, H.void, WX - 3, WY + WH + 4, WW + 6, 2, 0.16, true);
    /* THE WINDOW'S BLOOM: the afternoon pouring through the louvres lights
       the wall, the splash and the counter round it - a soft warm disc,
       baked per pixel as alpha so it has no edge, strongest at the sill */
    for (y = 0; y < CTR + 5; y++) {
      for (x = WX - 70; x < WX + WW + 70; x++) {
        var bdx = (x - (WX + WW / 2)) / 78, bdy = (y - (WY + WH - 6)) / 46;
        var bd = Math.sqrt(bdx * bdx + bdy * bdy);
        if (bd >= 1) continue;
        c.fillStyle = rgba('#fff4dc', 0.20 * (1 - ease(bd)));
        c.fillRect(x, y, 1, 1);
      }
    }

    /* -- THE FAR COUNTER (a white quartz top), and what stands on it */
    fill(c, H.cabinetLit, 0, CTR, FAR_W, 1);
    fill(c, H.cabinet, 0, CTR + 1, FAR_W, 2);
    fill(c, H.cabinetShade, 0, CTR + 3, FAR_W, 1);
    fill(c, H.outline, 0, CTR + 4, FAR_W, 1);

    /* the pothos in its white pot (Floor 2), heart leaves fanned up and
       two runners trailing over the lip */
    var PX0 = 114;
    fill(c, H.outline, PX0 - 1, CTR - 9, 14, 9);
    fill(c, H.cabinetLit, PX0, CTR - 8, 12, 8);
    fill(c, H.cabinetShade, PX0 + 9, CTR - 8, 3, 8);
    fill(c, H.cabinet, PX0, CTR - 8, 12, 1);
    var LEAVES = [[-4, -13], [1, -17], [6, -19], [11, -16], [15, -12], [-1, -21], [9, -23]];
    for (i = 0; i < LEAVES.length; i++) {
      var lx = PX0 + LEAVES[i][0], ly = CTR + LEAVES[i][1];
      fill(c, H.leafDeep, lx, ly, 5, 3);
      fill(c, H.leaf, lx + 1, ly - 1, 4, 3);
      fill(c, H.leafLit, lx + 1, ly - 1, 2, 2);
      fill(c, H.leafDeep, lx + 2, ly + 2, 1, 1);
    }
    for (i = 0; i < 2; i++) {
      var sx = PX0 + (i ? 12 : -1);
      for (k = 0; k < 9; k++) fill(c, H.leafDeep, sx + (i ? Math.round(k / 3) : -Math.round(k / 3)), CTR - 4 + k, 1, 1);
      fill(c, H.leaf, sx + (i ? 2 : -4), CTR + 1, 3, 2);
      fill(c, H.leafLit, sx + (i ? 3 : -5), CTR + 5, 3, 2);
    }

    /* the coffee maker and the kettle (Floor 2) */
    var CX = 300;
    fill(c, H.outline, CX - 1, CTR - 13, 16, 13);
    fill(c, H.steelDeep, CX, CTR - 12, 14, 12);
    fill(c, H.steel, CX, CTR - 12, 14, 2);
    fill(c, H.steelLit, CX, CTR - 12, 2, 12);
    fill(c, H.outline, CX + 4, CTR - 8, 6, 4);       /* the brew recess */
    fill(c, H.paint, CX + 5, CTR - 4, 3, 3);          /* the cup in it */
    fill(c, P.hotSauce, CX + 11, CTR - 9, 1, 1);      /* the red light */
    var KX = 318;
    var KET = [[2, 4], [1, 6], [0, 8], [0, 8], [0, 8], [0, 8], [1, 6]];
    for (i = 0; i < KET.length; i++) {
      fill(c, H.outline, KX + KET[i][0] - 1, CTR - 7 + i, KET[i][1] + 2, 1);
    }
    fill(c, H.outline, KX + 3, CTR - 9, 2, 2);
    for (i = 0; i < KET.length; i++) {
      fill(c, H.steel, KX + KET[i][0], CTR - 7 + i, KET[i][1], 1);
      fill(c, H.steelLit, KX + KET[i][0], CTR - 7 + i, 2, 1);
    }
    fill(c, H.steelDeep, KX + 8, CTR - 5, 2, 1);      /* the spout */
    /* a paper-towel roll on its stand, far left, and a bowl of lemons by
       the window - the clutter of a kitchen that is used */
    fill(c, H.outline, 21, CTR - 11, 8, 11);
    fill(c, H.daylight, 22, CTR - 10, 6, 10);
    fill(c, H.cabinetShade, 26, CTR - 10, 2, 10);
    fill(c, H.steelShade, 24, CTR - 12, 2, 2);
    fill(c, H.outline, 437, CTR - 5, 14, 5);
    fill(c, H.cabinetLit, 438, CTR - 4, 12, 3);
    fill(c, H.cabinetShade, 439, CTR - 2, 10, 1);
    fill(c, '#e8cf4a', 439, CTR - 7, 3, 3); fill(c, '#e8cf4a', 443, CTR - 8, 3, 3);
    fill(c, '#e8cf4a', 446, CTR - 6, 3, 2); fill(c, '#fff0a0', 440, CTR - 7, 1, 1);

    /* -- THE FAR BASE CABINETS: a drawer over a door, 48 wide, in the
       counter's shadow. Only the gap between islands ever shows them. */
    var BT = CTR + 5, BB = 156;
    for (x = 0; x < FAR_W; x += 48) {
      fill(c, H.cabinetDeep, x, BT, 1, BB - BT);
      fill(c, H.cabinet, x + 1, BT, 47, BB - BT);
      fill(c, H.cabinetLit, x + 1, BT, 1, BB - BT);
      fill(c, H.cabinetShade, x + 4, BT + 3, 41, 7);       /* the drawer */
      fill(c, H.cabinetDeep, x + 1, BT + 12, 47, 1);
      fill(c, H.cabinetShade, x + 4, BT + 16, 41, BB - BT - 20);   /* the door */
      fill(c, H.cabinetDeep, x + 4, BT + 16, 41, 1);
      fill(c, H.cabinetDeep, x + 4, BT + 16, 1, BB - BT - 20);
      fill(c, H.cabinetLit, x + 4, BB - 5, 41, 1);
      fill(c, H.steelShade, x + 22, BT + 6, 5, 1);         /* the drawer pull */
      fill(c, H.steelShade, x + 40, BT + 30, 1, 6);        /* the door pull   */
    }
    shadeRows(c, H.void, 0, BT, FAR_W, 8, 0.24, true);
    fill(c, H.outline, 0, BB, FAR_W, 1);
    fill(c, H.cabinetDeep, 0, BB + 1, FAR_W, FAR_H - BB - 1);
    return t;
  }

  /* ======================================================== THE ISLAND

     720 x 132, screen rows 56..187, parallax 0.42 (Floor ref 1, 5, 4).
     Transparent wherever nothing is listed, so the far wall shows above
     the overhang and through the gap.

     Across the 720: [door][door][drawers][door][door][drawers][door]
     [door] - 60 each, x 0..479 - then the FRIDGE 480..575, then a GAP of
     144 with the sneakers in it. Two whole stools stand at the doors.

     The overhang's shadow and the cream doors are what a white chair leg
     is read against for most of the screen's height, so the doors are
     the photograph's shadowed grey-cream (P.doorShade), not the white
     they are in the sun. */
  var ISL_W = 720, ISL_H = 132, ISL_Y = 56;

  function bakeIsland() {
    var t = makeCanvas(ISL_W, ISL_H), c = t.ctx;
    var r = mulberry32(5521), i, k, x, y;
    function Y(sy) { return sy - ISL_Y; }
    var RUN = 480;

    /* -- THE OVERHANG, seen from below: the white stone lip, then the
       honey ply of its underside lit by the window (Floor ref 1, 5) */
    fill(c, H.outline, 0, Y(96), RUN, 1);
    fill(c, H.cabinetLit, 0, Y(97), RUN, 1);
    fill(c, H.cabinetShade, 0, Y(98), RUN, 1);
    fill(c, P.plyLit, 0, Y(99), RUN, 2);
    fill(c, P.ply, 0, Y(101), RUN, 5);
    fill(c, P.plyShade, 0, Y(106), RUN, 2);
    fill(c, H.outline, 0, Y(108), RUN, 1);
    /* the ply's grain, long and pale */
    for (i = 0; i < 40; i++) {
      fill(c, r() < 0.5 ? P.plyLit : P.plyShade, Math.floor(r() * (RUN - 30)), Y(100) + Math.floor(r() * 6),
           8 + Math.floor(r() * 22), 1);
    }

    /* -- THE DOORS AND THE DRAWERS */
    var DT = Y(109), DB = Y(180);         /* 53 .. 124 */
    for (i = 0; i < 8; i++) {
      var x0 = i * 60;
      fill(c, H.cabinetDeep, x0, DT, 2, DB - DT);
      if (i === 2 || i === 5) {
        /* a drawer stack (Floor ref 4): three drawers, a horizontal pull */
        for (k = 0; k < 3; k++) {
          var dy0 = DT + k * 24, dh = 22;
          fill(c, P.doorFrame, x0 + 2, dy0, 56, dh);
          fill(c, P.doorLit, x0 + 2, dy0, 56, 1);
          fill(c, P.doorLit, x0 + 2, dy0, 1, dh);
          fill(c, P.doorShade, x0 + 5, dy0 + 3, 50, dh - 6);
          fill(c, H.cabinetDeep, x0 + 5, dy0 + 3, 50, 1);
          fill(c, H.cabinetDeep, x0 + 5, dy0 + 3, 1, dh - 6);
          fill(c, P.doorLit, x0 + 54, dy0 + 4, 1, dh - 7);
          fill(c, P.doorLit, x0 + 6, dy0 + dh - 4, 49, 1);
          fill(c, H.cabinetDeep, x0 + 2, dy0 + dh, 56, 2);
          fill(c, H.outline, x0 + 21, dy0 + 9, 18, 4);
          fill(c, H.steelLit, x0 + 22, dy0 + 10, 16, 2);
          fill(c, H.steelShade, x0 + 22, dy0 + 11, 16, 1);
        }
      } else {
        /* a shaker door: 6px stiles and rails, the bevel lit from the left */
        fill(c, P.doorFrame, x0 + 2, DT, 56, DB - DT);
        fill(c, P.doorLit, x0 + 2, DT, 56, 1);
        fill(c, P.doorLit, x0 + 2, DT, 1, DB - DT);
        var fx = x0 + 8, fy = DT + 6, fw = 44, fh = DB - DT - 12;
        fill(c, P.doorShade, fx, fy, fw, fh);
        fill(c, H.cabinetDeep, fx, fy, fw, 1);
        fill(c, H.cabinetDeep, fx, fy, 1, fh);
        fill(c, P.doorLit, fx + fw - 1, fy + 1, 1, fh - 1);
        fill(c, P.doorLit, fx + 1, fy + fh - 1, fw - 1, 1);
        /* the pull, on the stile where the pair meets */
        var leftOfPair = (i === 0 || i === 3 || i === 6);
        var px = leftOfPair ? x0 + 53 : x0 + 4;
        fill(c, H.outline, px - 1, Y(117), 5, 16);
        fill(c, H.steelLit, px, Y(118), 3, 14);
        fill(c, H.steelShade, px + 2, Y(118), 1, 14);
        fill(c, H.steelShade, px, Y(118), 3, 1);
        fill(c, H.steelShade, px, Y(131), 3, 1);
      }
    }
    /* the overhang's shadow down the doors: a strip, never a flat Tint */
    shadeRows(c, H.void, 0, DT, RUN, 16, 0.24, true);
    /* the toe kick */
    fill(c, H.outline, 0, DB, RUN, 1);
    fill(c, H.cabinetDeep, 0, DB + 1, RUN, ISL_H - DB - 1);

    /* -- THE POTHOS trailing off the island top (Floor 2): the runner the
       leaves on the floor came off */
    var VX = 300;
    for (y = Y(96); y <= Y(124); y++) {
      fill(c, H.leafDeep, VX + Math.round(Math.sin((y - Y(96)) / 5) * 1.5), y, 1, 1);
    }
    [[Y(103), -6], [Y(112), 2], [Y(119), -5]].forEach(function (lf) {
      var lx = VX + lf[1], ly = lf[0];
      var HEART = [[1, 2], [0, 7], [0, 7], [1, 5], [2, 3], [3, 1]];
      for (k = 0; k < HEART.length; k++) {
        fill(c, H.outline, lx + HEART[k][0] - 1, ly + k, HEART[k][1] + 2, 1);
      }
      fill(c, H.outline, lx + 4, ly - 1, 2, 1);
      fill(c, H.outline, lx + 3, ly + HEART.length, 1, 1);
      for (k = 0; k < HEART.length; k++) {
        fill(c, H.leaf, lx + HEART[k][0], ly + k, HEART[k][1], 1);
        fill(c, H.leafLit, lx + HEART[k][0], ly + k, Math.ceil(HEART[k][1] / 2), 1);
      }
      fill(c, P.leafVein, lx + 3, ly + 1, 1, 3);
    });

    /* -- THE FRIDGE (Floor ref 5): French doors over a freezer drawer,
       brushed steel lit on its left, the two tall handles, the base
       grille - and its photographs and magnets */
    var FX0 = 480, FW = 96;
    fill(c, H.outline, FX0, 0, FW, ISL_H);
    fill(c, H.steel, FX0 + 1, 1, FW - 2, ISL_H - 2);
    for (i = 0; i < 24; i++) {
      fill(c, r() < 0.5 ? H.steelLit : H.steelShade, FX0 + 3 + Math.floor(r() * (FW - 36)),
           4 + Math.floor(r() * (ISL_H - 12)), 8 + Math.floor(r() * 23), 1);
    }
    fill(c, H.steelLit, FX0 + 1, 1, FW - 2, 2);
    fill(c, H.steelLit, FX0 + 1, 1, 2, ISL_H - 2);
    fill(c, H.steelShade, FX0 + FW - 3, 1, 2, ISL_H - 2);
    fill(c, H.steelDeep, FX0 + 48, 2, 1, Y(150) - 2);              /* the doors' seam */
    fill(c, H.steelDeep, FX0 + 1, Y(150), FW - 2, 1);              /* the freezer's   */
    fill(c, H.steelLit, FX0 + 1, Y(151), FW - 2, 1);
    [FX0 + 40, FX0 + 52].forEach(function (hx) {
      fill(c, H.steelDeep, hx, Y(84), 4, 2);
      fill(c, H.steelDeep, hx, Y(146), 4, 2);
      fill(c, H.outline, hx - 1, Y(86), 6, 60);
      fill(c, H.steelLit, hx, Y(86), 4, 60);
      fill(c, H.steelShade, hx + 3, Y(86), 1, 60);
    });
    fill(c, H.outline, FX0 + 27, Y(157), 42, 5);
    fill(c, H.steelLit, FX0 + 28, Y(158), 40, 3);
    fill(c, H.steelShade, FX0 + 28, Y(160), 40, 1);
    fill(c, H.steelDeep, FX0 + 1, Y(182), FW - 2, 5);
    for (x = FX0 + 4; x < FX0 + FW - 4; x += 3) fill(c, H.outline, x, Y(183), 1, 3);

    /* the photographs, the triangle card and the magnets, clustered on the
       left door the way Floor ref 5's are (and a couple on the right).
       [x, y, w, h, border, inside, top-half] */
    var PH = [
      [486, 62, 9, 11, P.photoWhite, null, null],        /* the triangle card */
      [497, 60, 6, 7, P.photoWhite, P.photoSkin, null],
      [505, 64, 7, 5, P.photoWhite, P.photoGrass, P.magnetBlue],
      [489, 75, 6, 6, P.magnetYellow, null, null],
      [497, 70, 7, 8, P.photoWhite, P.photoDark, null],
      [507, 72, 5, 6, P.photoWhite, P.photoSkin, null],
      [486, 84, 6, 7, P.photoWhite, P.photoDark, null],
      [494, 82, 8, 6, P.photoWhite, P.photoGrass, P.magnetBlue],
      [504, 81, 6, 7, P.photoWhite, P.photoSkin, null],
      [490, 93, 7, 6, P.photoWhite, P.photoDark, null],
      [500, 92, 5, 5, P.magnetPink, null, null],
      [534, 66, 6, 7, P.photoWhite, P.photoSkin, null],
      [544, 63, 7, 5, P.photoWhite, P.photoGrass, P.magnetBlue]
    ];
    for (i = 0; i < PH.length; i++) {
      var p = PH[i], px0 = p[0], py0 = Y(p[1]);
      fill(c, p[4], px0, py0, p[2], p[3]);
      if (p[5]) fill(c, p[5], px0 + 1, py0 + 1, p[2] - 2, p[3] - 2);
      if (p[6]) fill(c, p[6], px0 + 1, py0 + 1, p[2] - 2, Math.floor((p[3] - 2) / 2));
      fill(c, H.steelShade, px0 + 1, py0 + p[3], p[2], 1);       /* its shadow */
    }
    /* the triangle card's two triangles (Floor ref 5) */
    var TC = [[486, 62]];
    for (k = 0; k < 3; k++) {
      fill(c, P.magnetGreen, TC[0][0] + 1, Y(TC[0][1]) + 2 + k, 3 - k, 1);
      fill(c, P.magnetPink, TC[0][0] + 4 + k, Y(TC[0][1]) + 6 + k, 4 - k, 1);
    }
    fill(c, P.magnetPink, 512, Y(90), 3, 3);
    fill(c, P.magnetYellow, 540, Y(76), 3, 3);

    /* -- TWO STOOLS at the island (Floor ref 1): a walnut disc seat, a
       chrome column, the hub, four splayed legs, the foot ring */
    function stool(cx, glide) {
      var sy = Y(134);
      /* the far pair of legs first, in the dark */
      legLine(c, P.ironDeep, cx - 2, Y(149), cx - 7, Y(184));
      legLine(c, P.ironDeep, cx + 1, Y(149), cx + 6, Y(184));
      /* the ring's far half */
      fill(c, P.ironDeep, cx - 14, Y(168), 28, 1);
      /* the near pair */
      legLine(c, H.outline, cx - 4, Y(149), cx - 16, Y(186), 3);
      legLine(c, H.outline, cx + 2, Y(149), cx + 14, Y(186), 3);
      legLine(c, H.iron, cx - 4, Y(149), cx - 16, Y(186));
      legLine(c, H.iron, cx + 3, Y(149), cx + 15, Y(186));
      legLine(c, H.ironLit, cx - 4, Y(149), cx - 16, Y(186), 1);
      /* the column and the hub */
      fill(c, H.outline, cx - 2, Y(140), 5, 8);
      fill(c, H.steelLit, cx - 1, Y(140), 2, 7);
      fill(c, H.steelShade, cx + 1, Y(140), 1, 7);
      fill(c, H.outline, cx - 6, Y(145), 12, 5);
      fill(c, H.iron, cx - 5, Y(146), 10, 3);
      fill(c, H.ironLit, cx - 5, Y(146), 10, 1);
      /* the seat, a dark walnut disc edge-on (Floor ref 1) */
      fill(c, H.outline, cx - 15, sy - 1, 30, 8);
      fill(c, H.outline, cx - 16, sy, 32, 6);
      fill(c, H.walnutHi, cx - 14, sy, 28, 1);
      fill(c, H.walnut, cx - 15, sy + 1, 30, 4);
      fill(c, H.walnutDeep, cx - 14, sy + 5, 28, 1);
      fill(c, H.walnutLit, cx - 13, sy + 1, 8, 2);  /* the window on the seat's edge */
      /* the near half of the foot ring */
      fill(c, H.outline, cx - 17, Y(169), 34, 4);
      fill(c, H.ironLit, cx - 16, Y(170), 32, 1);
      fill(c, H.iron, cx - 16, Y(171), 32, 1);
      /* the feet */
      fill(c, P.ironDeep, cx - 18, Y(186), 4, 2);
      fill(c, P.ironDeep, cx + 13, Y(186), 4, 2);
      if (glide) {
        /* Floor ref 1's adjustable chrome foot, on the right near leg */
        fill(c, H.steelLit, cx + 14, Y(184), 2, 3);
        fill(c, H.steelShade, cx + 15, Y(184), 1, 3);
      }
    }
    stool(150, false);
    stool(400, true);

    /* -- THE SNEAKERS, kicked off by the fridge (Floor ref 1's shoes,
       without the person): one standing, one rolled onto its side */
    var SHOE = [
      '.UUU..................',
      'UUUUUl................',
      'LUUUUUUl..............',
      'LUUUUUUUUl............',
      'LUUUUUUUUUUUl.........',
      'LUUUUUUUUUUUUUUUU.....',
      'LUUUUUUUUUUUUUUUUUUUU.',
      'WWWWWWWWWWWWWWWWWWWWWW',
      '.KKKKKKKKKKKKKKKKKKKK.'
    ];
    var SOLE = [
      '....UUUUUUUUU.......',
      '..UUUUUUUUUUUUUU....',
      '.WWWWWWWWWWWWWWWWW..',
      'WWKWWKWWKWWKWWKWWWW.',
      'WWWWWWWWWWWWWWWWWWWW',
      '.WWKWWKWWKWWKWWKWWW.',
      '..WWWWWWWWWWWWWWWW..'
    ];
    var SHOE_INK = { U: P.sneaker, L: P.sneakerLit, l: P.sneakerSole, W: P.sneakerSole, K: P.sneakerDark };
    var s1 = bakeGrid(SHOE, SHOE_INK, 24, 11), s2 = bakeGrid(SOLE, SHOE_INK, 22, 9);
    c.drawImage(s1.canvas, 592, Y(177));
    c.drawImage(s2.canvas, 617, Y(179));

    /* -- every stool and shoe sits in a soft contact shadow on the floor
       it is standing on (the bottom two rows of this tile) */
    [[132, 36], [382, 36], [594, 46]].forEach(function (s) {
      fill(c, rgba(H.void, 0.18), s[0], ISL_H - 2, s[1], 2);
    });
    return t;
  }

  /* ============================================== THE FAR FLOOR STRIPS

     The boards run left-right, along the flight, so a strip boundary is a
     board seam, and a nearer strip sliding faster than a farther one
     reads as perspective rather than as three conveyors. The far boards
     are compressed and in the sun; the near two come under the table,
     and the daylight sheet lays the shade over them - so all three are
     baked in the same daylit pigments and the shade is continuous across
     their seams. (Floor ref 1 and 2.)

       STRIP 1  rows 188..209, 0.55   sunlit kitchen floor, 4-row boards
       STRIP 2  rows 210..225, 0.72   two 8-row boards, the shadow's edge
       STRIP 3  rows 226..241, 0.86   one board in the table's shade - the
                                      one every crumb lands on (FLOOR-4
                                      is 238, its row 12) */
  /* GRAIN AS CONTOURS. Oak's figure is the growth rings cut through at a
     shallow angle, so the honest way to draw it is as the level lines of
     a field: F(x, y) = y, plus a slow wave along the board, minus a
     "flame" wherever the saw went through a bump in the log. A pixel is
     grain where F crosses a multiple of S between it and its neighbour
     above or to the left. Far from a flame that gives straight parallel
     grain S rows apart; at a flame the field folds back on itself and the
     level lines close into nested pointed arches - the CATHEDRAL of Floor
     2, which is exactly what those arches are in real wood. The flame's
     `back` and `front` are how far its influence reaches either way, so a
     long back and a short front makes the point face right, and `d`
     against `sy` decides whether the innermost rings close into loops
     (d > 1.17 sy) or only bow.

     Wrapped in x, so every tile is seamless; seeded by hash, so a tile is
     the same tile every boot; a fifth of the lines and a few pixels of
     each skipped, because grain is broken, not ruled. Every third line is
     the darker grain. */
  function grain(c, W, y0, y1, S, flames, waves, seed, light, deep) {
    function F(x, y) {
      var v = y, k, fl, dx, rx, u;
      for (k = 0; k < waves.length; k++) v += waves[k][0] * Math.sin(TAU * (x * waves[k][1] / W + waves[k][2]));
      for (k = 0; k < flames.length; k++) {
        fl = flames[k];
        dx = wrap(x - fl.cx + W / 2, W) - W / 2;
        rx = dx < 0 ? Math.exp(-(dx / fl.back) * (dx / fl.back)) : Math.exp(-(dx / fl.front) * (dx / fl.front));
        u = (y - fl.cy) / fl.sy;
        v -= fl.d * Math.exp(-u * u) * rx;
      }
      return v;
    }
    var above = [], x, y, b, left;
    for (x = 0; x < W; x++) above.push(Math.floor(F(x, y0 - 1) / S));
    for (y = y0; y < y1; y++) {
      left = Math.floor(F(-1, y) / S);
      for (x = 0; x < W; x++) {
        b = Math.floor(F(x, y) / S);
        if (b !== above[x] || b !== left) {
          var line = Math.max(b, above[x], left);
          var hl = hash(line * 7919 + seed);
          if (hl % 6 !== 0 && hash(x * 131 + y * 7919 + seed) % 23 !== 0) {
            c.fillStyle = (hl >>> 4) % 3 === 0 ? deep : light;
            c.fillRect(x, y, 1, 1);
          }
        }
        above[x] = b;
        left = b;
      }
    }
  }

  /* the far boards' quieter pigments: at this distance a seam is a soft
     line and the grain is a texture, not a drawing - full-strength seams
     every four rows read as brick paving */
  var FAR_SEAM = '#b0a184', FAR_GRAIN = '#c3b698';

  function bakeStrip1() {
    var W = 192, Hh = 22, t = makeCanvas(W, Hh), c = t.ctx;
    var r = mulberry32(6101), b, i, y0, face;
    for (b = 0; b * 4 < Hh; b++) {
      y0 = b * 4;
      face = Math.min(3, Hh - y0);
      fill(c, (b % 2) ? P.oakDayWarm : P.oakDay, 0, y0, W, face);
      for (i = 0; i < 5; i++) runW(c, FAR_GRAIN, r() * W, y0 + Math.floor(r() * face), 4 + Math.floor(r() * 10), W);
      /* one end joint per board per tile, staggered */
      var jx = Math.floor(r() * W);
      for (i = 0; i < face; i++) dotW(c, FAR_SEAM, jx, y0 + i, W);
      if (y0 + face < Hh) fill(c, FAR_SEAM, 0, y0 + face, W, 1);
    }
    /* the island's shadow on the floor in front of it */
    shadeRows(c, H.void, 0, 0, W, 8, 0.28, true);
    return t;
  }

  function bakeStrip2() {
    var W = 192, Hh = 16, t = makeCanvas(W, Hh), c = t.ctx;
    var r = mulberry32(6202), b, i, y0;
    for (b = 0; b < 2; b++) {
      y0 = b * 8;
      fill(c, b ? P.oakDayWarm : P.oakDay, 0, y0 + 1, W, 6);
    }
    grain(c, W, 1, 15, 2.6, [], [[0.8, 1, 0.2], [0.5, 3, 0.7]], 6202, FAR_GRAIN, P.oakGrain);
    for (b = 0; b < 2; b++) {
      y0 = b * 8;
      fill(c, P.oakSun, 0, y0, W, 1);                     /* the satin lip  */
      fill(c, '#8e7d62', 0, y0 + 7, W, 1);                /* the seam       */
      var jx = 20 + Math.floor(r() * 150) + b * 60;
      fill(c, '#8e7d62', wrap(jx, W), y0 + 1, 1, 6);
      fill(c, P.oakSun, wrap(jx + 1, W), y0 + 1, 1, 6);
    }
    /* one small knot per tile, softly */
    var kx = 30 + Math.floor(r() * 120);
    fill(c, P.oakGrain, kx - 1, 10, 6, 3);
    fill(c, P.oakKnotRing, kx, 11, 4, 1);
    return t;
  }

  function bakeStrip3() {
    var W = 288, Hh = 16, t = makeCanvas(W, Hh), c = t.ctx;
    fill(c, P.oakDay, 0, 1, W, 13);
    fill(c, P.oakDayWarm, 0, 14, W, 2);
    /* two compressed cathedrals - the near board's figure seen further off */
    grain(c, W, 1, Hh, 3,
          [{ cx: 90, cy: 8, sy: 3.2, d: 6, back: 90, front: 18 },
           { cx: 235, cy: 7, sy: 3, d: 5, back: 70, front: 16 }],
          [[0.9, 1, 0.6]], 6303, P.oakGrain, P.oakGrainDeep);
    fill(c, P.oakSun, 0, 0, W, 1);
    var jx = 170;
    fill(c, P.oakSeam, jx, 1, 1, 15);
    fill(c, P.oakSun, jx + 1, 1, 1, 15);
    return t;
  }

  /* ==================================================== THE NEAR BOARD

     The floor band, 480 x 28 at FLOOR, parallax 1.0: the nearest board,
     in the table's shade, with the raking light just catching its edge.

       row 0     THE SEAM - the kill line. Hard, dark, one row, the whole
                 way across.
       row 1     the lit ARRIS - the rake skims the top edge of the near
                 board even in the shade, and it is the legible line every
                 crumb's spot and every puddle is laid on
       2..27     the face, with Floor 2's CATHEDRAL GRAIN - nested pointed
                 arches of grain running along the board, two flames a
                 tile - and Floor ref 1's KNOT sitting in the heart of one
                 of them, and one end joint

     The face is laid in oakDay and then the table's shade goes over it as
     one flat Tint (it scrolls, so it may not be a Dither), and then the
     arris is re-laid so the shade does not take it. */
  function bakeBoard() {
    var W = 480, Hh = VH - FLOOR, t = makeCanvas(W, Hh), c = t.ctx;
    var r = mulberry32(7414), i, k, n, dy;

    fill(c, P.oakDay, 0, 2, W, Hh - 2);
    /* THE CATHEDRALS, as contours (see grain): two flames a tile, a long
       one pointing right at x 150 and a rounder one with the knot in its
       heart at x 400, and long straight grain flowing between them */
    grain(c, W, 2, Hh, 3.2,
          [{ cx: 160, cy: 13, sy: 5.5, d: 12, back: 150, front: 30 },
           { cx: 405, cy: 17, sy: 4.5, d: 10, back: 110, front: 26 }],
          [[1.6, 1, 0.1], [0.7, 3, 0.55]], 7414, P.oakGrain, P.oakGrainDeep);
    /* a few long pale flecks - the medullary ray of white oak catching the
       rake, the satin shine on the boards in Floor 2 */
    for (i = 0; i < 10; i++) runW(c, P.oakSun, r() * W, 4 + Math.floor(r() * 22), 3 + Math.floor(r() * 6), W);

    /* THE KNOT (Floor ref 1), at the heart of the second flame: an oval of
       dark heartwood with a paler ring, and the innermost grain wrapped
       round it rather than through it */
    var KX = 396, KY = 13;
    var KNOT = [[2, 7], [0, 11], [0, 11], [0, 11], [1, 9], [3, 5]];
    for (i = 0; i < KNOT.length; i++) fill(c, P.oakKnotRing, KX + KNOT[i][0] - 1, KY + i - 1, KNOT[i][1] + 2, 1);
    fill(c, P.oakKnotRing, KX + 2, KY + KNOT.length - 1, 7, 1);
    for (i = 0; i < KNOT.length; i++) fill(c, P.oakKnot, KX + KNOT[i][0], KY + i, KNOT[i][1], 1);
    fill(c, P.oakGrainDeep, KX + 3, KY + 1, 4, 1);
    fill(c, P.oakSeam, KX + 4, KY + 2, 3, 2);

    /* one end joint (Floor ref 1's dark line between two boards) */
    var JX = 318;
    fill(c, P.oakSeam, JX, 2, 1, Hh - 2);
    fill(c, P.oakSun, JX + 1, 2, 1, Hh - 2);

    /* the table's shade over the face, the seam, then the arris re-laid
       over the shade so the rake still catches it */
    Tint.rect(c, 0, 2, W, Hh - 2, H.walnutDeep, 5);
    fill(c, P.oakSeam, 0, 0, W, 1);
    fill(c, P.oakSun, 0, 1, W, 1);
    /* and the bottom of the frame falls off a touch */
    Tint.rect(c, 0, Hh - 6, W, 6, P.oakShade, 2);
    return t;
  }

  /* ===================================================== THE FOREGROUND

     960 x 14 at row 256, parallax 1.35: two things nearer than anything,
     and nothing else. It never climbs above 256, so it hides nothing that
     matters - spots and splats are rows 243..245, litter 244..250.

     THE PEDESTAL FOOT (Floor ref 3): the long white splayed foot with its
     chamfered nose, and its shadow on the board to the right. A CHAIR
     FOOT (Floor ref 4): the bottom of a near leg with its dark glide. */
  function bakeFore() {
    var W = 960, Hh = 14, t = makeCanvas(W, Hh), c = t.ctx;
    var i, k;
    /* the pedestal foot: x 120..269, the nose at the right end */
    var X0 = 120, X1 = 270;
    var NOSE_T = [6, 4, 2], NOSE_B = [2, 4, 6];
    for (i = 0; i < Hh; i++) {
      var inset = i < 3 ? NOSE_T[i] : (i > 10 ? NOSE_B[i - 11] : 0);
      var col = i === 0 ? P.paintHi : (i < 10 ? H.paint : (i < 12 ? H.paintShade : (i === 12 ? H.paintDeep : H.outline)));
      /* its shadow first, to the right, on the board */
      fill(c, rgba(H.void, 0.25), X1 - inset, i + 2 < Hh ? i + 2 : i, 5, 1);
      fill(c, col, X0, i, X1 - X0 - inset, 1);
      fill(c, H.outline, X1 - inset, i, 1, 1);
      fill(c, H.outline, X0, i, 1, 1);
    }
    fill(c, H.outline, X0, 0, X1 - X0 - 6, 1);
    fill(c, P.paintHi, X0 + 1, 1, X1 - X0 - 9, 1);
    fill(c, P.paintHi, X0 + 1, 1, 2, 9);
    /* two grey scuffs near the nose */
    fill(c, H.paintDeep, X1 - 22, 5, 3, 1);
    fill(c, H.paintDeep, X1 - 13, 8, 3, 1);
    fill(c, H.paintShade, X0 + 40, 6, 4, 1);

    /* a near chair foot: x 640..661, the bottom of a leg with its glide */
    var CX = 640, CW = 22;
    fill(c, rgba(H.void, 0.25), CX + CW, 4, 3, Hh - 4);
    fill(c, H.outline, CX, 2, CW, Hh - 2);
    fill(c, H.paint, CX + 1, 2, CW - 2, Hh - 5);
    fill(c, P.paintHi, CX + 1, 2, 3, Hh - 5);
    fill(c, H.paintShade, CX + CW - 4, 2, 3, Hh - 5);
    fill(c, P.glideLit, CX + 2, Hh - 3, CW - 4, 1);
    fill(c, P.glide, CX + 2, Hh - 2, CW - 4, 1);
    for (k = 0; k < 2; k++) fill(c, H.outline, CX + k * (CW - 1), Hh - 3, 1, 3);
    return t;
  }

  /* ================================================ THE DAYLIGHT SHEET

     480 x 270, baked once, blitted last in drawBackdrop. Four smoothstep
     ramps and nothing with an edge (a lamp's - or a window's - falloff has
     no edge; the room module's lesson):

       1. the TABLE'S SHADE OVERHEAD, rows 24..72: under a table it is
          dusky up top, and it is also what keeps a white chair leg's seat
          block legible against the far uppers
       2. the TABLE'S SHADE ON THE BOARDS, 196..241: the sunlit kitchen
          floor runs into shade as it comes under the table, and the
          crumbs land in it - pale crumbs on shaded boards, which is the
          Couch's crease arithmetic done with daylight
       3. the WINDOW'S WARMTH on the right third, the kitchen window
       4. the DIM CORNER on the left, where the mop parks */
  /* the table's shade overhead: 0.34 at the apron fading to nothing at
     row 92, just over the island's top. The brief had 0.26 to row 72; on
     screen that left the far uppers at 190 behind a white leg's 211, and
     a leg hanging into the top of the bay is where the eye has least to
     separate it by. */
  var SHADE_TOP = 0.34, SHADE_TO = 92;

  function bakeDaylight() {
    var t = makeCanvas(VW, VH), c = t.ctx, x, y, k;
    for (y = CEIL; y < SHADE_TO; y++) {
      k = 1 - ease((y - CEIL) / (SHADE_TO - CEIL));
      fill(c, rgba(H.walnutDeep, SHADE_TOP * k), 0, y, VW, 1);
    }
    for (y = 196; y < FLOOR; y++) {
      k = ease((y - 196) / (FLOOR - 1 - 196));
      fill(c, rgba(H.walnutDeep, 0.30 * k), 0, y, VW, 1);
    }
    for (x = 300; x < VW; x++) {
      k = ease((x - 300) / (VW - 1 - 300));
      fill(c, rgba('#ffe9b8', 0.10 * k), x, CEIL, 1, FLOOR - CEIL);
    }
    for (x = 0; x < 80; x++) {
      k = 1 - ease(x / 80);
      fill(c, rgba(H.void, 0.12 * k), x, CEIL, 1, FLOOR - CEIL);
    }
    return t;
  }

  /* ============================================================ PILLARS

     The upper and lower halves are two different pieces of furniture - a
     chair and a stool - so they roll their variants independently.

     THE UPPER HALF, a white tapered chair leg hanging from its seat
     (Floor ref 4, 5): the seat corner it is bolted to (with a zinc bracket
     and two screws on its underside - Floor ref 3), the leg, and the foot
     narrowing to its dark glide pad at the mouth of the gap. Painted wood,
     no grain, a lit left face and a shaded right one. One in three wear a
     few grey scuffs and the STUB of the X-back chair's stretcher (Floor
     ref 5) - forgiven art, outside every box.

     THE LOWER HALF, a black steel stool leg (Floor ref 1, 5): the stool's
     dark walnut seat at the mouth of the gap with the plate the leg bolts
     to, the square leg, the FOOT RING at one fixed height off the boards so
     a row of stools reads as a row of stools, and its rubber foot - or,
     one in four, Floor ref 1's chrome adjustable foot and glide. (The
     brief's chrome gas-lift post as a whole column read as a steel bin,
     and a black hub cap on a black tube as a lidded one; the seat and the
     chrome FOOT are the two things in the photograph that say stool.) */
  var LEG_H = 80;          /* the leg tiles are 80 tall so the brush marks do not stack */

  function bakeSeatBlock() {
    var W = 42, Hh = 8, t = makeCanvas(W, Hh), c = t.ctx;
    fill(c, H.outline, 0, 0, W, Hh);
    fill(c, P.paintHi, 1, 1, W - 2, 1);
    fill(c, H.paint, 1, 2, W - 2, 4);
    fill(c, H.paintShade, 1, 6, W - 2, 1);
    fill(c, P.paintHi, 1, 2, 2, 4);
    fill(c, H.paintShade, W - 4, 2, 3, 4);
    /* the bracket and two screws on its underside */
    fill(c, H.steelLit, 6, 4, 7, 3);
    fill(c, H.steelShade, 6, 6, 7, 1);
    fill(c, H.steelDeep, 7, 5, 1, 1);
    fill(c, H.steelDeep, 11, 5, 1, 1);
    fill(c, H.steel, 20, 3, 2, 2);
    fill(c, H.steelShade, 21, 4, 1, 1);
    fill(c, H.steel, 32, 3, 2, 2);
    fill(c, H.steelShade, 33, 4, 1, 1);
    /* the corners of the seat taken in a pixel, so it is a block of wood
       and not a plate */
    c.clearRect(0, Hh - 1, 1, 1);
    c.clearRect(W - 1, Hh - 1, 1, 1);
    return t;
  }

  /* A SQUARE LEG SEEN CORNER-ON, which is what both pieces of furniture
     have (Floor ref 4's chair leg, Floor ref 1's stool legs): the outline,
     a lit arris, the lit left face, the near corner catching the light as
     one crisp line, the shaded right face, a darker strip at its far edge,
     the outline. A round band-lit-band-shade read made the black ones into
     bins and the white ones into posts; two faces and a corner make them
     legs. `inset` takes a pixel off each side for the foot's taper. */
  var INK_WHITE = { hi: P.paintHi, face: H.paint, corner: P.paintHi, shade: '#ddd5c3', deep: H.paintShade, edge: H.outline };
  var INK_BLACK = { hi: H.ironLit, face: '#37322f', corner: '#6e6863', shade: H.iron, deep: P.ironDeep, edge: H.outline };
  var INK_CHROME = { hi: '#ffffff', face: H.steelLit, corner: '#ffffff', shade: H.steel, deep: H.steelShade, edge: H.outline };

  function squareLeg(c, y, inset, h, ink) {
    var w = 34 - inset * 2, x0 = inset;
    var lit = Math.round((w - 2) * 0.55);
    fill(c, ink.edge, x0, y, 1, h);
    fill(c, ink.edge, x0 + w - 1, y, 1, h);
    fill(c, ink.hi, x0 + 1, y, 2, h);
    fill(c, ink.face, x0 + 3, y, lit - 2, h);
    fill(c, ink.corner, x0 + 1 + lit, y, 1, h);
    fill(c, ink.shade, x0 + 2 + lit, y, w - 5 - lit, h);
    fill(c, ink.deep, x0 + w - 3, y, 2, h);
  }

  function bakeLegUp() {
    var t = makeCanvas(34, LEG_H), c = t.ctx, r = mulberry32(8101), i;
    squareLeg(c, 0, 0, LEG_H, INK_WHITE);
    /* brush marks along the grain of the paint, the faint streaks every
       white thing in Floor ref 4 has: vertical, sparse, one step down */
    for (i = 0; i < 8; i++) {
      var bx = 4 + Math.floor(r() * 14), by = Math.floor(r() * (LEG_H - 8));
      fill(c, '#ddd5c3', bx, by, 1, 3 + Math.floor(r() * 6));
    }
    for (i = 0; i < 4; i++) {
      fill(c, H.paintShade, 21 + Math.floor(r() * 8), Math.floor(r() * (LEG_H - 6)), 1, 2 + Math.floor(r() * 4));
    }
    return t;
  }

  /* THE FOOT: the leg narrowing to its glide. Every row is at least 28
     wide, so the 28-wide box at x+3 is inside the art on every row. The
     scuffed variant carries 12 rows of leg above it with the wear on. */
  function bakeFootUp(scuffed) {
    var extra = scuffed ? 12 : 0, Hh = 9 + extra;
    var t = makeCanvas(34, Hh), c = t.ctx, i;
    if (extra) {
      squareLeg(c, 0, 0, extra, INK_WHITE);
      fill(c, H.paintDeep, 9, 3, 2, 1);
      fill(c, H.paintDeep, 15, 7, 3, 1);
      fill(c, H.paintDeep, 7, 9, 3, 1);
      fill(c, H.paintDeep, 24, 2, 2, 1);
    }
    var INSET = [0, 1, 1, 2, 2, 3];
    for (i = 0; i < 6; i++) squareLeg(c, extra + i, INSET[i], 1, INK_WHITE);
    /* the glide pad, 28 wide */
    fill(c, H.outline, 3, extra + 6, 1, 2);
    fill(c, H.outline, 30, extra + 6, 1, 2);
    fill(c, P.glideLit, 4, extra + 6, 26, 1);
    fill(c, P.glide, 4, extra + 7, 26, 1);
    fill(c, H.outline, 3, extra + 8, 28, 1);
    return t;
  }

  /* the X-back chair's stretcher, sticking out to the right of a leg */
  function bakeStub() {
    var t = makeCanvas(12, 6), c = t.ctx;
    fill(c, H.outline, 0, 0, 12, 6);
    fill(c, P.paintHi, 0, 1, 11, 1);
    fill(c, H.paint, 0, 2, 11, 2);
    fill(c, H.paintShade, 0, 4, 11, 1);
    c.clearRect(11, 0, 1, 1);
    c.clearRect(11, 5, 1, 1);
    return t;
  }

  /* the black steel leg, with a few scratches of bare steel in its coat */
  function bakeLegLow() {
    var t = makeCanvas(34, LEG_H), c = t.ctx, r = mulberry32(8202), i;
    squareLeg(c, 0, 0, LEG_H, INK_BLACK);
    for (i = 0; i < 5; i++) {
      fill(c, H.ironLit, 5 + Math.floor(r() * 12), Math.floor(r() * (LEG_H - 6)), 1, 2 + Math.floor(r() * 4));
    }
    for (i = 0; i < 3; i++) {
      fill(c, '#2e2a27', 22 + Math.floor(r() * 7), Math.floor(r() * (LEG_H - 6)), 1, 3 + Math.floor(r() * 4));
    }
    return t;
  }

  /* THE CHROME ADJUSTABLE FOOT of Floor ref 1 - the leg's last few inches
     are a bright steel sleeve under a black collar, ending in a chrome
     glide. One stool leg in four (variant 1). 34 x 16, drawn on top of
     the leg at FLOOR-20. */
  function bakeSleeve() {
    var t = makeCanvas(34, 16), c = t.ctx;
    squareLeg(c, 3, 0, 13, INK_CHROME);
    fill(c, H.outline, 0, 0, 34, 3);
    fill(c, H.ironLit, 1, 1, 32, 1);
    fill(c, '#6e6863', 2, 1, 6, 1);
    fill(c, H.steelDeep, 1, 3, 32, 1);          /* the collar's shadow on the chrome */
    fill(c, H.steelDeep, 20, 6, 1, 6);          /* the adjusting slot */
    return t;
  }

  /* THE STOOL'S SEAT at the mouth of the gap (Floor ref 1): a dark walnut
     disc seen edge-on and a shade from above - its lit far rim, its top,
     its front edge - with the black plate the legs bolt to under it. It
     is the Couch's cap box exactly, 42 x 9 at x-4, and its corners are
     taken in so it is a disc and not a shelf. */
  function bakeSeat() {
    var W = 42, Hh = 9, t = makeCanvas(W, Hh), c = t.ctx, k;
    var ROWS = [H.outline, H.walnutHi, H.walnutLit, H.walnut, H.walnut, H.walnutDeep, H.outline];
    for (k = 0; k < ROWS.length; k++) fill(c, ROWS[k], 0, k, W, 1);
    fill(c, H.walnutHi, 2, 2, 6, 2);              /* the window on its left shoulder */
    fill(c, H.walnutLit, 14, 1, 16, 1);
    fill(c, H.walnutDeep, 30, 3, 9, 1);           /* a grain line on its edge */
    fill(c, H.walnutLit, 9, 4, 7, 1);
    /* the black plate the legs bolt to, and the leg entering under it */
    fill(c, H.outline, 5, 7, 32, 1);
    fill(c, H.iron, 6, 7, 30, 1);
    fill(c, H.steelLit, 19, 7, 3, 1);
    fill(c, H.outline, 4, 8, 34, 1);
    fill(c, '#37322f', 5, 8, 18, 1);
    fill(c, H.iron, 23, 8, 14, 1);
    var CUT = [3, 1];
    for (k = 0; k < CUT.length; k++) {
      c.clearRect(k, 0, 1, CUT[k]);
      c.clearRect(k, 7 - CUT[k], 1, CUT[k]);
      c.clearRect(W - 1 - k, 0, 1, CUT[k]);
      c.clearRect(W - 1 - k, 7 - CUT[k], 1, CUT[k]);
      fill(c, H.outline, k, CUT[k], 1, 1);
      fill(c, H.outline, k, 6 - CUT[k], 1, 1);
      fill(c, H.outline, W - 1 - k, CUT[k], 1, 1);
      fill(c, H.outline, W - 1 - k, 6 - CUT[k], 1, 1);
    }
    c.clearRect(0, 7, 4, 2);
    c.clearRect(38, 7, 4, 2);
    return t;
  }

  /* THE FOOT RING, the stool's signature in every photograph, as two
     halves so the leg can stand between them: the far arc drawn first,
     behind the leg, and the near tube after, sagging a pixel in the
     middle because it is a ring seen from a little above. 56 x 8, drawn at
     (x-11, FLOOR-38). It has NO BOX: 11px of forgiven art either side of a
     column that already has its own - the Garden's rule. */
  var RING_W = 56, RING_DX = -11, RING_DY = -31;
  function bakeRing(front) {
    var t = makeCanvas(RING_W, 8), c = t.ctx, i;
    if (!front) {
      fill(c, P.ironDeep, 9, 0, 38, 1);
      fill(c, P.ironDeep, 4, 1, 5, 1);
      fill(c, P.ironDeep, 47, 1, 5, 1);
      fill(c, P.ironDeep, 1, 2, 3, 1);
      fill(c, P.ironDeep, 52, 2, 3, 1);
    } else {
      for (i = 0; i < RING_W; i++) {
        var sag = (i < 7 || i > RING_W - 8) ? 0 : 1;
        var end = (i === 0 || i === RING_W - 1);
        fill(c, H.outline, i, 2 + sag, 1, end ? 3 : 4);
        if (end) continue;
        fill(c, i < 14 ? '#6e6863' : H.ironLit, i, 3 + sag, 1, 1);
        fill(c, H.iron, i, 4 + sag, 1, 1);
      }
    }
    return t;
  }

  function bakeFootLow(chrome) {
    var t = makeCanvas(36, 4), c = t.ctx;
    fill(c, H.outline, 0, 0, 1, 4);
    fill(c, H.outline, 35, 0, 1, 4);
    if (!chrome) {
      fill(c, H.ironLit, 1, 0, 34, 1);
      fill(c, P.ironDeep, 1, 1, 34, 2);
    } else {
      fill(c, H.steelLit, 1, 0, 34, 1);
      fill(c, H.steel, 1, 1, 34, 1);
      fill(c, H.steelShade, 1, 2, 34, 1);
    }
    fill(c, H.outline, 0, 3, 36, 1);
    return t;
  }

  /* ============================================================ SPRITES

     All small sprites are plotted from character grids into a canvas at
     (1,1), masked, with ringOf UNDER them (the Couch's bakePop), and the
     crumbs get four exact quarter-turn frames about (4.5, 4.5). Each
     crumb has TWO silhouettes so the carpet is not a row of stamps. */

  /* BREAD: a torn crumb with crust down one side; B is a crust end */
  var BREAD = [
    ['..BHB..',
     '.BBBBB.',
     'BBBBBBC',
     'BBBSBBC',
     '.BSBBC.',
     '..BBC..'],
    ['.CCDC..',
     'CBBBBC.',
     'CBHBBBC',
     '.BBBSBC',
     '.BBSBB.',
     '..BB...']
  ];
  /* CRACKER: a flat shard toasted at one edge, with its docker holes */
  var CRACKER = [
    ['..KKK..',
     '.KLKoK.',
     'KKKKKKT',
     '.KoKKTT',
     '...KT..'],
    ['KKKKK..',
     'KLKoKK.',
     'KoKKKKT',
     'KKKKoKT',
     '.KKTTT.']
  ];
  /* CEREAL O: a ring with a see-through middle; ringOf darkens the inside
     edge, which is what an O looks like at seven pixels. B is bitten. */
  var CEREAL = [
    ['..OOO..',
     '.PP.OO.',
     'OP...OQ',
     'O.....Q',
     'OO...QQ',
     '.OO.QQ.',
     '..OQQ..'],
    ['..OOO..',
     '.PP.OO.',
     'OP...OQ',
     'O.....Q',
     'OO...Q.',
     '.OO....']
  ];
  /* COOKIE: a chunk with ONE chocolate chip, and the chip is the tell */
  var COOKIE = [
    ['..CCC..',
     '.CHCCC.',
     'CCCXYCC',
     'CCCXXCS',
     'CSCCCSS',
     '.CCSSS.',
     '..SS...'],
    ['.CCCC..',
     'CHCCCCW',
     'CCCCCCC',
     'CCXYCSS',
     '.CXXSS.',
     '..SSS..']
  ];
  /* PUFFED RICE: the smallest, bumpy */
  var RICE = [
    ['.RRHR.',
     'RHRRRR',
     'RRRRSR',
     'RSRRS.',
     '.RSS..'],
    ['..RRR.',
     '.RHRRR',
     'RRRRSR',
     '.RSRS.',
     '..RS..']
  ];
  var CRUMB_GRIDS = [BREAD, CRACKER, CEREAL, COOKIE, RICE];
  var CRUMB_INK = [
    { B: P.bread, H: P.breadHi, S: P.breadShade, C: P.crust, D: P.crustDeep },
    { K: P.cracker, L: P.crackerHi, T: P.crackerToast, o: P.crackerToast },
    { O: P.cereal, P: P.cerealHi, Q: P.cerealShade },
    { C: P.cookie, H: P.cookieHi, S: P.cookieShade, X: P.chip, Y: P.chipHi, W: P.breadHi },
    { R: P.rice, H: P.riceHi, S: P.riceShade }
  ];
  /* what each kind bursts into when a hot doodad goes through it */
  var CRUMB_BURST = [
    [P.breadHi, P.crust], [P.crackerHi, P.cracker], [P.cerealHi, P.cereal],
    [P.cookieHi, P.chip], [P.riceHi, P.riceShade]
  ];
  /* bread 30%, cracker 20%, cereal O 20%, cookie 15%, puffed rice 15% */
  var KIND_ODDS = [0.30, 0.20, 0.20, 0.15, 0.15];
  /* cracker and puffed rice are flat, so their box is a row shorter */
  var KIND_FLAT = [false, true, false, false, true];

  /* THE DROPLETS: a teardrop with its tail up, two wobble frames */
  var DROP_GRID = [
    ['...D....',
     '...D....',
     '..DDD...',
     '.SSDDD..',
     '.SSDDDE.',
     '.hDDDDE.',
     '.DDDDEE.',
     '.DDDEE..',
     '..DEE...',
     '...E....'],
    ['........',
     '...D....',
     '..DDD...',
     '.SSDDD..',
     '.SSDDDE.',
     'hDDDDDEE',
     '.DDDDEE.',
     '.DDEEE..',
     '..EEE...',
     '........']
  ];
  /* hot sauce, lime, and - never sent here, but drawn rather than lost if
     a tune ever did - a purple spin drop and a honey +5 */
  var LIQ = [
    { D: P.hotSauce, E: P.hotSauceDeep, S: P.hotSheen, h: P.hotSauceHi, hi: P.hotSauceHi, deep: P.hotSauceDeep,
      core: '255,214,160', mid: '216,50,28', edge: '143,26,14', ca: 0.50, ma: 0.24 },
    { D: P.lime, E: P.limeDeep, S: P.limeSheen, h: P.limeHi, hi: P.limeHi, deep: P.limeDeep,
      core: '228,255,154', mid: '120,190,60', edge: '95,146,38', ca: 0.48, ma: 0.22 },
    { D: P.whirl, E: P.whirlDeep, S: P.whirlSheen, h: P.whirlHi, hi: P.whirlHi, deep: P.whirlDeep,
      core: '214,160,255', mid: '150,80,220', edge: '90,42,140', ca: 0.50, ma: 0.24 },
    { D: P.honey, E: P.honeyDeep, S: P.honeySheen, h: P.honeyHi, hi: P.honeyHi, deep: P.honeyDeep,
      core: '255,236,170', mid: '232,176,74', edge: '168,112,30', ca: 0.48, ma: 0.22 }
  ];

  /* THE LEAVES, 16 x 8 lying on the boards, with an empty top row so a
     lifted tip has somewhere to go. G body, L lit, V vein, D deep, S stem.
     THE GREEN ONE is a pothos heart off the plant on the island (Floor 2):
     two lobes at the stem's notch, the midrib running out to a point.
     THE DRY ONE is a curled brown leaf blown in from the garden, its edge
     rolled over (the lit band across its middle is the curl). Two pixels
     wider than the brief's 14 - at 14 the green one read as a blob on the
     boards at speed, and the spare life is the one thing on the floor a
     player has to find. */
  var LEAF_GREEN = [
    '................',
    '...LLL..........',
    '..LLLLLLGGG.....',
    '.LLLLLLLGGGGGG..',
    'SSLLLVVVVVVVVGGG',
    '.LLLLLLGGGGGGDD.',
    '..LLLLGGGGGDD...',
    '...DDDDGGDD.....',
    '.....DDDD.......'
  ];
  var LEAF_DRY = [
    '................',
    '......LLLL......',
    '...LLLLDDLLL....',
    '..GGGDDGGGGLL...',
    'SSGGGGGDGGGGGLL.',
    '..GGGGGGDDGGGGG.',
    '...DDGGGGGDDGG..',
    '.....DDDDGGGD...',
    '.......DDDD.....'
  ];
  var LEAF_INK = [
    { G: H.leaf, L: H.leafLit, V: P.leafVein, D: H.leafDeep, S: P.stem },
    { G: P.leafDry, L: P.leafDryLit, V: P.leafDryLit, D: P.leafDryDeep, S: P.stem }
  ];

  /* a block of columns lifted a row - the leaf's tip or stem end coming up */
  function liftCols(grid, c0, c1) {
    var out = [], r, k, row;
    for (r = 0; r < grid.length; r++) {
      row = '';
      for (k = 0; k < grid[r].length; k++) {
        if (k >= c0 && k <= c1) row += (r + 1 < grid.length) ? grid[r + 1].charAt(k) : '.';
        else row += grid[r].charAt(k);
      }
      out.push(row);
    }
    return out;
  }
  /* rocked on its edge: the same leaf squeezed to ten columns */
  function squeeze(grid, w) {
    var out = [], r, j, row, src = grid[0].length;
    for (r = 0; r < grid.length; r++) {
      row = '';
      for (j = 0; j < w; j++) row += grid[r].charAt(Math.round(j * (src - 1) / (w - 1)));
      out.push(row);
    }
    return out;
  }
  function bakeLeaf(grid, ink) {
    var frames = [grid, liftCols(grid, 10, 15), squeeze(grid, 11), liftCols(grid, 0, 5)];
    return frames.map(function (g) { return bakeGrid(g, ink, g[0].length + 2, g.length + 2); });
  }

  /* ============================================================ THE MOP

     Three baked sheets, drawn in drawOverlay so it stands in front of
     everything that falls and hops: the crumbs go INTO it. Nothing is
     written on it - green trim, white body, grey mechanicals, a clear tank
     of dirty water and a striped brush roller behind a clear window, the
     Floor mop ref's machine with its brand left off. */

  /* THE HEAD, 64 x 34, its FACE (the right edge) at M.face and its wheels
     on the boards. Rows: a white top seen nearly edge-on, the green trim
     band, the window with the roller in it, a green squeegee lip and the
     grey base, then the wheels. The right end is the white end cap of
     the reference, rounded. `frame` shifts the roller's stripes 0/2/4px -
     the spin. */
  var HEAD_W = 64, HEAD_H = 34;

  function bakeMopHead(frame) {
    var t = makeCanvas(HEAD_W, HEAD_H), c = t.ctx, x, y;
    var CAP = 52;                         /* the end cap starts here */
    var INS_T = [4, 2, 1, 0], INS_B = [0, 1, 2, 4];
    function ins(yy) { return yy < 4 ? INS_T[yy] : (yy > 27 ? INS_B[yy - 28] : 0); }
    function rowCol(yy) {
      if (yy === 1) return P.mopWhite;
      if (yy <= 3) return P.mopWhiteShade;
      if (yy === 4) return P.mopGreenLit;
      if (yy <= 7) return P.mopGreen;
      if (yy === 8) return P.mopGreenDeep;
      if (yy === 9 || yy === 27) return P.mopGreyDeep;
      if (yy <= 26) return P.mopTank;
      if (yy === 28) return P.mopGreen;
      if (yy === 29) return P.mopGreenDeep;
      return P.mopGreyDeep;
    }
    for (y = 0; y < 32; y++) {
      var e = HEAD_W - ins(y);
      fill(c, H.outline, 0, y, e, 1);
      if (y > 0 && y < 31) fill(c, rowCol(y), 0, y, e - 1, 1);
    }
    /* THE ROLLER, along the window: a lit top, the striped drum and its
       dark underside, with the clear gap above and below it */
    fill(c, P.roller, 0, 12, CAP - 1, 3);
    fill(c, P.roller, 0, 15, CAP - 1, 7);
    fill(c, P.rollerDeep, 0, 22, CAP - 1, 3);
    for (y = 12; y <= 24; y++) {
      for (x = -12; x < CAP; x += 6) {
        var sx = x + (y - 12) + frame * 2;
        for (var k = 0; k < 2; k++) {
          var xx = wrap(sx + k, 54);
          if (xx < CAP - 1) fill(c, y >= 22 ? H.outline : P.rollerStripe, xx, y, 1, 1);
        }
      }
    }
    /* glints on the window, top left of the part on screen */
    for (x = 0; x < 5; x++) fill(c, P.mopTankLit, 22 + x, 15 - x, 1, 1);
    for (x = 0; x < 3; x++) fill(c, P.mopTankLit, 27 + x, 13 - x, 1, 1);
    fill(c, P.mopTankLit, 0, 10, CAP - 1, 1);
    /* THE END CAP, white and rounded, with the green band carried round it */
    for (y = 1; y < 31; y++) {
      var ee = HEAD_W - ins(y) - 1;
      if (ee <= CAP) continue;
      var cc = y <= 3 ? P.mopWhite : (y <= 8 ? (y === 4 ? P.mopGreenLit : (y === 8 ? P.mopGreenDeep : P.mopGreen))
             : (y <= 25 ? P.mopWhite : (y <= 27 ? P.mopWhiteShade : (y === 28 ? P.mopGreen : (y === 29 ? P.mopGreenDeep : P.mopGreyDeep)))));
      fill(c, cc, CAP, y, ee - CAP, 1);
    }
    fill(c, P.mopGreyDeep, CAP - 1, 9, 1, 19);          /* the seam between window and cap */
    fill(c, P.mopWhiteShade, HEAD_W - 4, 10, 3, 15);    /* the cap turning away */
    fill(c, P.mopGreen, CAP + 2, 13, 5, 9);             /* the green side badge - no word on it */
    fill(c, P.mopGreenLit, CAP + 2, 13, 5, 1);
    fill(c, P.mopGreenDeep, CAP + 2, 21, 5, 1);
    /* THE WHEELS */
    fill(c, H.outline, 7, 31, 8, 3);
    fill(c, P.cable, 8, 32, 6, 2);
    fill(c, H.outline, 49, 31, 8, 3);
    fill(c, P.cable, 50, 32, 6, 2);
    fill(c, P.mopGrey, 52, 32, 2, 1);
    return t;
  }

  /* THE BODY, upright behind the head and leaning BACK toward the left
     edge - a pixel per ten rows, the reference's lean, which is shallow
     enough that the handle carries on up the left edge of the screen all
     the way to the table and the machine reads as the size it is. 116
     rows tall (screen 96..211 when parked); local x 0..33 at the bottom
     row, every row above shifted left by its lean. From the top: the
     handle's start, the motor housing with its green band, vent and power
     ring, the clear tank of dirty water (drawn live - it fills), and the
     grey neck the body pivots on. Its bottom-right corner is 4px short of
     the head's face, so it never reaches the doodad, who stops 11px in
     front of the face. */
  var BODY_H = 116, LEAN_K = 10, LEAN = Math.floor((BODY_H - 1) / LEAN_K), BODY_W = 34 + LEAN;
  function leanAt(row) { return LEAN - Math.floor((BODY_H - 1 - row) / LEAN_K); }
  var TANK_T = 54, TANK_B = 100;          /* the tank's rows in the body */

  function bakeMopBody() {
    var t = makeCanvas(BODY_W, BODY_H), c = t.ctx, y;
    /* a row of the body: x and w in the body's own columns, lean applied */
    function row(col, x, yy, w) { fill(c, col, leanAt(yy) + x, yy, w, 1); }
    function box(col, x, y0, w, h) { for (var yy = y0; yy < y0 + h; yy++) row(col, x, yy, w); }

    /* THE NECK, the pivot the body stands on: grey, tapering upward */
    for (y = 100; y < BODY_H; y++) {
      var nw = 14 + Math.round(6 * (y - 100) / 15), nx = 17 - Math.round(nw / 2);
      row(H.outline, nx - 1, y, nw + 2);
      row(P.mopGrey, nx, y, nw);
      row(P.mopWhiteShade, nx, y, 2);
    }
    row(P.mopGreyDeep, 9, 112, 18);

    /* THE TANK: clear, framed in dark grey. The water is drawn live. */
    box(P.mopGreyDeep, 1, TANK_T, 33, TANK_B - TANK_T);
    box(P.mopTank, 2, TANK_T + 1, 31, TANK_B - TANK_T - 2);
    box(P.mopTankLit, 2, TANK_T + 1, 2, TANK_B - TANK_T - 2);
    box(P.mopTankLit, 6, TANK_T + 2, 1, 10);
    box(P.mopGreen, 26, TANK_T, 6, 4);           /* the release button */
    box(P.mopGreenLit, 26, TANK_T, 6, 1);
    box(H.outline, 0, TANK_T, 1, TANK_B - TANK_T);
    box(H.outline, 34, TANK_T, 1, TANK_B - TANK_T);

    /* THE MOTOR HOUSING: white, a green band, a grey vent, the power ring */
    var HT = 4, HB = TANK_T;
    for (y = HT; y < HB; y++) {
      var ii = y - HT < 4 ? [4, 2, 1, 0][y - HT] : 0;
      row(H.outline, 3 + ii, y, 30 - ii * 2);
      row(P.mopWhite, 4 + ii, y, 28 - ii * 2);
      row(P.mopWhiteShade, 28 - ii, y, 4);
    }
    row(H.outline, 7, HT - 1, 22);
    box(P.mopGreen, 4, 40, 28, 6);
    box(P.mopGreenLit, 4, 40, 28, 1);
    box(P.mopGreenDeep, 4, 45, 28, 1);
    box(P.mopGrey, 8, 14, 16, 14);
    for (y = 0; y < 5; y++) box(P.mopGreyDeep, 10, 16 + y * 3, 12, 1);
    box(P.mopGreenLit, 22, 8, 4, 4);
    box(P.mopWhite, 23, 9, 2, 2);
    box(P.mopWhiteShade, 4, HB - 2, 28, 2);

    /* THE HANDLE leaving the housing's top: a white tube, shaded right */
    for (y = 0; y < HT; y++) {
      row(H.outline, 10, y, 7);
      row(P.mopWhite, 11, y, 3);
      row(P.mopWhiteShade, 14, y, 2);
    }
    return t;
  }

  /* THE DRAFT in front of the mouth: per-column alpha, 0.12 at the mouth to
     nothing 128px out. A faint pale wedge and nothing more. */
  function bakeDraft() {
    var t = makeCanvas(128, 30), c = t.ctx;
    for (var x = 0; x < 128; x++) {
      var k = 1 - ease(x / 127);
      var top = Math.round(14 * (x / 127));     /* it narrows toward the mouth's height */
      fill(c, rgba(P.mopTankLit, 0.12 * k), x, top, 1, 30 - top);
    }
    return t;
  }

  /* ============================================================== build */

  function build() {
    /* the Living Room's oak, which the house shares - a harmless guard */
    LivingRoom.build();
    T.lid = bakeLid();
    T.far = bakeFar();
    T.island = bakeIsland();
    T.s1 = bakeStrip1();
    T.s2 = bakeStrip2();
    T.s3 = bakeStrip3();
    T.board = bakeBoard();
    T.fore = bakeFore();
    T.daylight = bakeDaylight();

    T.seatBlock = bakeSeatBlock();
    T.legUp = bakeLegUp();
    T.footUp = [bakeFootUp(false), bakeFootUp(true)];
    T.stub = bakeStub();
    T.legLow = bakeLegLow();
    T.sleeve = bakeSleeve();
    T.seat = bakeSeat();
    T.ringBack = bakeRing(false);
    T.ringFront = bakeRing(true);
    T.footLow = [bakeFootLow(false), bakeFootLow(true)];

    var k, s;
    T.crumb = [];
    for (k = 0; k < CRUMB_GRIDS.length; k++) {
      T.crumb.push([]);
      for (s = 0; s < 2; s++) T.crumb[k].push(quarterTurns(bakeGrid(CRUMB_GRIDS[k][s], CRUMB_INK[k], 9, 9)));
    }
    T.drop = LIQ.map(function (ink) {
      return [bakeGrid(DROP_GRID[0], ink, 10, 12), bakeGrid(DROP_GRID[1], ink, 10, 12)];
    });
    T.leaf = [bakeLeaf(LEAF_GREEN, LEAF_INK[0]), bakeLeaf(LEAF_DRY, LEAF_INK[1])];

    T.mopHead = [bakeMopHead(0), bakeMopHead(1), bakeMopHead(2)];
    T.mopBody = bakeMopBody();
    T.draft = bakeDraft();
  }

  /* ============================================================ drawing */

  /* SEVEN LAYERS AND THE DAYLIGHT, back to front. The flat fill is a
     safety net; the far wall and the strips cover every row from CEIL to
     FLOOR between them. NOT LivingRoom.drawLight: that is night. */
  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = H.wall;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.far.canvas, scroll * 0.18, FAR_Y);
    tileX(ctx, T.island.canvas, scroll * 0.42, ISL_Y);
    tileX(ctx, T.s1.canvas, scroll * 0.55, 188);
    tileX(ctx, T.s2.canvas, scroll * 0.72, 210);
    tileX(ctx, T.s3.canvas, scroll * 0.86, 226);
    ctx.drawImage(T.daylight.canvas, 0, 0);
  }

  /* the calm room for a menu to sit on: the furniture without the
     hazards - no legs, crumbs, leaves or mop, and no foreground */
  function drawMenuBackdrop(ctx, scroll) {
    drawBackdrop(ctx, scroll);
    tileX(ctx, T.lid.canvas, scroll, 0);
    tileX(ctx, T.board.canvas, scroll, FLOOR);
  }

  function drawCeiling(ctx, scroll) { tileX(ctx, T.lid.canvas, scroll, 0); }

  function drawFloor(ctx, scroll) {
    tileX(ctx, T.board.canvas, scroll, FLOOR);
    tileX(ctx, T.fore.canvas, scroll * 1.35, 256);
  }

  /* --------------------------------------------------------- pillars */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var gapY = ob.gapY, botY = ob.gapY + ob.gapH;

    /* THE CHAIR LEG, from the seat corner down to the glide */
    var foot = T.footUp[ob.up];
    var footY = gapY - foot.h;
    Tint.rect(ctx, x + 34, CEIL + 8, 4, gapY - 9 - CEIL - 8, H.void, 6);
    if (footY > CEIL + 8) drawColumn(ctx, T.legUp.canvas, x, CEIL + 8, 34, footY - CEIL - 8);
    ctx.drawImage(T.seatBlock.canvas, x - 4, CEIL);
    ctx.drawImage(foot.canvas, x, footY);
    if (ob.up === 1 && gapY - CEIL >= 48) ctx.drawImage(T.stub.canvas, x + 33, gapY - 31);

    /* THE STOOL LEG, from the seat down to its foot on the boards. The
       ring is drawn only when the leg shows at least two rows of tube
       above it; the lowest gaps put the seat where the ring would be, and
       a stool whose ring is hidden behind its own seat is still a stool. */
    var legTop = botY + 9, ring = legTop <= FLOOR + RING_DY - 2;
    /* the chrome foot only on a leg with at least 28 rows of black above
       it: on a short stool the sleeve was half the leg and it read as a tin */
    var chrome = ob.low === 1 && legTop <= FLOOR - 48;
    Tint.rect(ctx, x - 6, FLOOR - 2, 46, 2, H.void, 7);
    Tint.rect(ctx, x + 34, botY + 4, 4, FLOOR - botY - 4, H.void, 6);
    if (ring) ctx.drawImage(T.ringBack.canvas, x + RING_DX, FLOOR + RING_DY);
    if (FLOOR - 4 > legTop) drawColumn(ctx, T.legLow.canvas, x, legTop, 34, FLOOR - 4 - legTop);
    if (chrome) ctx.drawImage(T.sleeve.canvas, x, FLOOR - 20);
    ctx.drawImage(T.seat.canvas, x - 4, botY);
    if (ring) ctx.drawImage(T.ringFront.canvas, x + RING_DX, FLOOR + RING_DY);
    ctx.drawImage(T.footLow[chrome ? 1 : 0].canvas, x - 1, FLOOR - 4);
  }

  /* ---------------------------------------------------------- drops

     ONE TEST DECIDES WHAT A DROP IS, read live every time and never
     stored: the engine sets ob.sour (and would set ob.gold or ob.whirl)
     AFTER makeDrop returns, the Canopy's rule. */
  function isLiquid(ob) { return !!(ob.spicy || ob.sour || ob.gold || ob.whirl); }
  function liqOf(ob) { return ob.sour ? 1 : (ob.whirl ? 2 : (ob.gold && !ob.spicy ? 3 : 0)); }

  function popFrame(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 4) % 4; }

  function drawDrop(ctx, ob) {
    if (ob.gone) return;
    var x = Math.round(ob.x), y = Math.round(ob.y), k;
    if (!isLiquid(ob)) {
      blitBelowCeil(ctx, T.crumb[ob.kind][ob.shape][popFrame(ob)].canvas, x - 4, y - 4);
      return;
    }
    /* A DROPLET: the gift's glow (hazards never glow), two drips trailing
       above it, and the teardrop swaying a pixel or two as it wobbles
       down - the sway is the drawing's alone, the box is straight */
    var L = LIQ[liqOf(ob)], age = ob.age || 0;
    var pulse = 0.72 + 0.28 * Math.sin(age * 4);
    glow(ctx, x, y, Math.round(15 + pulse * 5),
         'rgba(' + L.core + ',' + (L.ca * pulse).toFixed(3) + ')',
         'rgba(' + L.mid + ',' + (L.ma * pulse).toFixed(3) + ')',
         'rgba(' + L.edge + ',0)');
    var sway = Math.round(Math.sin(age * 5) * 2);
    for (k = 0; k < 2; k++) {
      var dy = y - 9 - k * 4 - Math.round(wrap(age * 6 + k * 0.5, 2));
      if (dy < CEIL) continue;
      ctx.fillStyle = k ? L.hi : L.D;
      ctx.fillRect(x - Math.round(sway / 2), dy, 1, 1);
    }
    blitBelowCeil(ctx, T.drop[liqOf(ob)][Math.floor(age / 0.12) % 2].canvas, x - 5 + sway, y - 6);
  }

  /* THE SPOT IS TIED TO HEIGHT, the Couch's: small and dark when the thing
     is about to land, wide and faint at the top of a hop, wider and
     fainter still when it is just out of the apron. It lands on the lit
     arris, which is why that row is lit. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0 || ob.gone) return;
    var high = (FLOOR - 4) - ob.y;
    var near = clamp(high / HOP_MAX, 0, 1);
    var far = clamp(high / (FLOOR - CEIL), 0, 1);
    var w = 5 + Math.round(6 * far);
    var col = isLiquid(ob) ? LIQ[liqOf(ob)].deep : H.void;
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3, col, 15 - Math.round(9 * near));
  }

  /* A DROPLET'S REMAINS. On the boards a little puddle with a lit rim and
     two satellites; on a leg, a drip that runs down it while it lasts.
     Faded in over a tenth of a second and out over the last 0.3. */
  function drawDropSplat(ctx, ob) {
    if (!isLiquid(ob)) return;
    var L = LIQ[liqOf(ob)];
    var age = SPLAT_TIME - ob.broken;
    var a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * Math.min(1, age / 0.1) * Math.min(1, ob.broken / 0.3);
    var x = Math.round(ob.x), y;
    if (!ob.pop) {
      y = FLOOR + 1;
      fill(ctx, L.hi, x - 4, y, 9, 1);
      fill(ctx, L.D, x - 5, y + 1, 11, 1);
      fill(ctx, L.deep, x - 4, y + 2, 9, 1);
      fill(ctx, L.D, x - 7, y + 1, 1, 1);
      fill(ctx, L.D, x + 7, y + 1, 1, 1);
    } else {
      y = Math.round(ob.y);
      var run = 2 + Math.round(clamp(age / 0.8, 0, 1) * 4);
      fill(ctx, L.D, x - 2, y - 1, 5, 3);
      fill(ctx, L.hi, x - 2, y - 1, 2, 1);
      fill(ctx, L.D, x, y + 2, 1, run);
      fill(ctx, L.deep, x, y + 2 + run, 1, 1);
    }
    ctx.globalAlpha = a0;
  }

  /* ----------------------------------------------------------- leaves */

  function drawBoon(ctx, ob) {
    if (ob.taken || ob.gone) return;
    var gx = Math.round(ob.x + ob.dx), dy = Math.round(ob.dy);
    var age = ob.age || 0, i;
    /* the life glow, the Couch's gradient exactly: a life is a life */
    var gy = FLOOR - 9 + dy;
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + age * 2.6);
    var rr = Math.round(15 + pulse * 4);
    var g = ctx.createRadialGradient(gx, gy, 1, gx, gy, rr);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(gx - rr, gy - rr, rr * 2, rr * 2);
    /* the leaf, lying on the boards: breathing at rest, skittering when
       the mop's draft has it */
    if (dy > -2) Tint.rect(ctx, gx - 8, FLOOR - 1, 16, 2, P.oakSeam, 8);
    var f = ob.slide > 0.5 ? Math.floor(ob.skit || 0) % 4 : Math.floor((ob.phase + age) / 0.6) % 2;
    var spr = T.leaf[ob.dry ? 1 : 0][f];
    ctx.drawImage(spr.canvas, gx - Math.round(spr.w / 2), FLOOR - spr.h + dy);
    for (i = 0; i < 2; i++) {
      var k = wrap(ob.phase * 0.22 + age * 0.3 + i * 0.5, 1);
      ctx.fillStyle = i ? P.riceHi : P.lifePale;
      ctx.fillRect(gx - 5 + i * 9, gy - 8 - Math.round(k * 9), 1, 1);
    }
    /* AND A TWINKLE. The jade glow is the Couch's to the decimal - a life is
       a life in every level - but the Couch lays it on grey microfibre and
       this lays it on pale oak in daylight, where a 0.34 jade wash is
       nearly nothing. So the leaf also catches the light: once every 1.4s
       a four-point glint opens and closes on it, somewhere along its upper
       edge (seeded by the cycle, so it never jitters inside one). */
    var tw = ob.phase * 0.3 + age / 1.4, cyc = Math.floor(tw), kk = tw - cyc;
    if (kk < 0.22) {
      var hh = hash(cyc * 31 + Math.round(ob.phase * 1000));
      var sx = gx - 5 + (hh % 10), sy = FLOOR - 10 + dy - ((hh >>> 4) % 3);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(sx, sy, 1, 1);
      if (kk > 0.05 && kk < 0.17) {
        ctx.fillStyle = P.lifePale;
        ctx.fillRect(sx - 1, sy, 1, 1); ctx.fillRect(sx + 1, sy, 1, 1);
        ctx.fillRect(sx, sy - 1, 1, 1); ctx.fillRect(sx, sy + 1, 1, 1);
        if (kk > 0.09 && kk < 0.13) {
          ctx.fillRect(sx - 2, sy, 1, 1); ctx.fillRect(sx + 2, sy, 1, 1);
          ctx.fillRect(sx, sy - 2, 1, 1);
        }
      }
    }
  }

  /* ----------------------------------------------------------- litter

     On the floor band, below the kill line, so none of it owes anybody a
     warning. Crumb specks ONE pixel each - the Couch's rule: a 2px crumb on
     the floor would be a hazard to identify, and the answer is always
     nothing - a felt glide pad fallen off a chair, a green twist-tie. */
  function drawLitter(ctx, ob) {
    if (ob.foe) return;
    var x = Math.round(ob.x), y = FLOOR + 2, i;
    if (ob.kind <= 1) {
      var SPECK = [P.breadShade, P.crackerToast, P.cerealShade];
      for (i = 0; i < 7; i++) {
        var h = hash(ob.seed + i * 977);
        ctx.fillStyle = SPECK[h % 3];
        ctx.fillRect(x + (h >>> 3) % 18, y + 1 + (h >>> 11) % 5, 1, 1);
      }
    } else if (ob.kind === 2) {
      fill(ctx, P.glide, x + 6, y + 1, 5, 2);
      fill(ctx, P.glideLit, x + 6, y + 1, 1, 1);
    } else {
      fill(ctx, H.leafLit, x + 4, y + 2, 9, 1);
      fill(ctx, H.leafDeep, x + 8, y + 1, 1, 2);
      fill(ctx, H.leafLit, x + 7, y + 3, 3, 1);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ----------------------------------------------------------- THE MOP

     Drawn from run.ledger.mop and nothing else, phased off M.t alone - which
     only stepFoe advances - so on GET READY, pause, the tumble and the
     results screen the mop holds perfectly still, roller and all. */
  function drawOverlay(ctx, obstacles, run) {
    var M = run && run.ledger && run.ledger.mop;
    if (!M) return;
    var face = Math.round(M.face), i, y;

    /* the draft and the air going into the mouth, under the head's nose */
    ctx.drawImage(T.draft.canvas, face, FLOOR - 30);
    if (M.on > 0) {
      ctx.fillStyle = 'rgba(239,230,210,' + (0.55 * M.on).toFixed(3) + ')';
      for (i = 0; i < M.streaks.length; i++) {
        var s = M.streaks[i];
        ctx.fillRect(Math.round(s.x), Math.round(s.y), s.len, 1);
      }
    }

    /* THE BODY, leaning back off the left of the screen */
    var bx = face - 38 - LEAN, by = FLOOR - 146;
    ctx.drawImage(T.mopBody.canvas, bx, by);
    /* the water in the tank, from the bottom up to its level, sloshing */
    var level = 8 + Math.round(30 * M.fill);
    var slosh = Math.floor(M.t / 0.3) % 2;
    for (y = TANK_B - 2; y > TANK_B - 2 - level; y--) {
      ctx.fillStyle = P.mopWater;
      ctx.fillRect(bx + leanAt(y) + 2, by + y, 31, 1);
    }
    var sy = by + TANK_B - 2 - level;
    for (i = 0; i < 31; i++) {
      var ly = sy + ((i >= 6 && i <= 12) ? (slosh ? 1 : -1) : ((i >= 20 && i <= 26) ? (slosh ? -1 : 1) : 0));
      var lr = Math.round(ly - by);
      if (lr < TANK_T + 1) continue;
      ctx.fillStyle = P.mopWaterLit;
      ctx.fillRect(bx + leanAt(lr) + 2 + i, ly, 1, 1);
    }
    /* what it ate, floating */
    var specks = M.fill > 0.7 ? 6 : (M.fill > 0.3 ? 3 : 0);
    for (i = 0; i < specks; i++) {
      var h = hash(i * 7919 + 31);
      var srow = TANK_B - 3 - (h % Math.max(1, level - 2));
      ctx.fillStyle = (h >>> 5) & 1 ? P.breadShade : P.cookieShade;
      ctx.fillRect(bx + leanAt(srow) + 4 + ((h >>> 9) % 26), by + srow, 1, 1);
    }
    /* the tank's glint over the water */
    ctx.fillStyle = P.mopTankLit;
    for (y = TANK_T + 2; y < TANK_B - 2; y += 1) {
      if (y > TANK_T + 14 && y < TANK_B - 12) continue;
      ctx.fillRect(bx + leanAt(y) + 5, by + y, 1, 1);
    }

    /* the handle, on up the left edge at the same lean into the table's
       shadow, with the green grip band of the reference partway up and
       the black cord clipped along its back */
    for (y = by - 1; y >= CEIL; y--) {
      var hx = bx + leanAt(0) + 10 - Math.floor((by - y) / LEAN_K);
      if (hx + 7 < 0) break;
      var grip = y >= 44 && y < 62;
      ctx.fillStyle = H.outline;     ctx.fillRect(hx, y, 7, 1);
      ctx.fillStyle = grip ? P.mopGreen : P.mopWhite;         ctx.fillRect(hx + 1, y, 3, 1);
      ctx.fillStyle = grip ? P.mopGreenDeep : P.mopWhiteShade; ctx.fillRect(hx + 4, y, 2, 1);
      if (grip) { ctx.fillStyle = P.mopGreenLit; ctx.fillRect(hx + 1, y, 1, 1); }
      ctx.fillStyle = P.cable;       ctx.fillRect(hx - 2, y, 2, 1);
      if ((y & 15) === 0) { ctx.fillStyle = P.mopGrey; ctx.fillRect(hx - 2, y, 3, 2); }
    }

    /* its contact shadow, then THE HEAD in front of the neck */
    Tint.rect(ctx, face - 60, FLOOR + 2, 62, 3, H.void, 6);
    var fr = M.parked ? Math.floor(M.t * 10) % 3 : Math.floor(M.t * 18) % 3;
    ctx.drawImage(T.mopHead[fr].canvas, face - HEAD_W, FLOOR - 30);
  }

  /* ---------------------------------------------------- the cover art

     118x114 on the big card, 82x94 on the side ones; the caller has
     already clipped. A live miniature in the level's own proportions:
     the table's underside across the top, the kitchen beyond (glass
     uppers, the hood, the shuttered window, the far counter), the island
     with its stool and the fridge with its magnets, the daylit floor
     running into the table's shade - then, sliding past, white chair legs
     from the lid and black stool legs from the boards, crumbs hopping on
     the near seam, a hot sauce droplet on its way down, and THE MOP at the
     left edge drinking the carpet. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22, i, k, xx, yy;
    function Y(f) { return y + Math.round(h * f); }
    function R(col, rx, ry, rw, rh) { if (rw > 0 && rh > 0) { ctx.fillStyle = col; ctx.fillRect(rx, ry, rw, rh); } }
    var lidB = Y(0.07), farB = Y(0.26), ovB = Y(0.29), islB = Y(0.48), kickB = Y(0.51);
    var far2 = Y(0.62), seamY = Y(0.80);

    /* the far wall: uppers, splash, counter */
    R(H.wall, x, lidB, w, farB - lidB);
    var upB = lidB + Math.round((farB - lidB) * 0.42);
    var pitch = Math.max(8, Math.round(w * 0.12));
    for (xx = x; xx < x + w; xx += pitch) {
      R(H.cabinet, xx, lidB, pitch, upB - lidB);
      R(((xx - x) / pitch) % 4 === 2 ? H.tileShade : H.cabinetShade, xx + 2, lidB + 1, pitch - 4, upB - lidB - 3);
      R(H.cabinetDeep, xx, lidB, 1, upB - lidB);
    }
    R(H.outline, x, upB, w, 1);
    /* the subway splash: flat tile, a grout line every third row and a
       half-bonded joint every six pixels */
    R(H.tile, x, upB + 1, w, farB - 3 - upB);
    for (yy = upB + 3; yy < farB - 2; yy += 3) R('#cbc5b7', x, yy, w, 1);
    for (yy = upB + 1; yy < farB - 2; yy += 3) {
      for (xx = x + (((yy - upB) / 3 | 0) % 2) * 3; xx < x + w; xx += 6) R('#cbc5b7', xx, yy, 1, 2);
    }
    /* the hood, and the window over the sink */
    var hx = x + Math.round(w * 0.36);
    R(H.outline, hx - 1, lidB, 8, upB - lidB + 4);
    R(H.steel, hx, lidB, 6, upB - lidB + 3);
    R(H.outline, hx - 7, upB + 2, 20, 4);
    R(H.steel, hx - 6, upB + 2, 18, 3);
    R(H.steelLit, hx - 6, upB + 2, 18, 1);
    var wx = x + Math.round(w * 0.78), ww = Math.max(6, Math.round(w * 0.12)), wh = Math.max(5, Math.round(h * 0.1));
    R(H.outline, wx - 1, lidB + 2, ww + 2, wh + 2);
    R(H.daylight, wx, lidB + 3, ww, wh);
    for (k = 0; k < 3; k++) R(H.paint, wx, lidB + 4 + k * Math.max(2, Math.floor(wh / 3)), ww, 1);
    /* the far counter, the plant and the coffee maker on it */
    R(H.cabinetLit, x, farB - 2, w, 1);
    R(H.cabinetShade, x, farB - 1, w, 1);
    var px0 = x + Math.round(w * 0.14);
    R(H.cabinetLit, px0, farB - 5, 4, 3);
    R(H.leaf, px0 - 1, farB - 8, 6, 3);
    R(H.leafLit, px0, farB - 9, 3, 2);
    R(H.steelDeep, x + Math.round(w * 0.58), farB - 6, 4, 4);

    /* the overhang: the white lip and the honey ply */
    R(H.outline, x, farB, w, 1);
    R(H.cabinetLit, x, farB + 1, w, 1);
    R(P.ply, x, farB + 2, w, ovB - farB - 2);
    R(P.plyLit, x, farB + 2, w, 1);
    R(H.outline, x, ovB, w, 1);

    /* the island's doors in its shade, with the fridge standing at the end */
    R(P.doorFrame, x, ovB + 1, w, islB - ovB - 1);
    var dw = Math.max(10, Math.round(w * 0.2));
    for (xx = x; xx < x + w; xx += dw) {
      R(H.cabinetDeep, xx, ovB + 1, 1, islB - ovB - 1);
      R(P.doorShade, xx + 3, ovB + 3, dw - 6, islB - ovB - 6);
      R(P.doorLit, xx + 3, islB - 3, dw - 6, 1);
      R(H.steelLit, xx + dw - 3, ovB + 5, 1, 5);
    }
    Tint.rect(ctx, x, ovB + 1, w, 3, H.void, 3);
    var fx = x + Math.round(w * 0.62), fw = Math.round(w * 0.22), fTop = y + Math.round(h * 0.14);
    R(H.outline, fx - 1, fTop - 1, fw + 2, islB - fTop + 1);
    R(H.steel, fx, fTop, fw, islB - fTop);
    R(H.steelLit, fx, fTop, 1, islB - fTop);
    R(H.steelDeep, fx + Math.round(fw / 2), fTop + 1, 1, Math.round((islB - fTop) * 0.62));
    R(H.steelLit, fx + Math.round(fw / 2) - 2, fTop + 4, 1, Math.round((islB - fTop) * 0.4));
    R(H.steelLit, fx + Math.round(fw / 2) + 2, fTop + 4, 1, Math.round((islB - fTop) * 0.4));
    R(P.magnetPink, fx + 2, fTop + 3, 2, 2);
    R(P.magnetYellow, fx + 5, fTop + 6, 2, 2);
    R(P.magnetBlue, fx + 2, fTop + 8, 2, 2);
    R(P.photoWhite, fx + 5, fTop + 2, 2, 3);
    /* one small stool at the island */
    var sx = x + Math.round(w * 0.3);
    R(H.walnut, sx - 4, islB - 9, 9, 2);
    R(H.iron, sx - 3, islB - 7, 1, 7); R(H.iron, sx + 3, islB - 7, 1, 7);
    R(H.iron, sx, islB - 7, 1, 7);
    R(H.ironLit, sx - 4, islB - 3, 9, 1);

    /* the toe kick, then the floor running from the sun into the shade */
    R(H.outline, x, islB, w, 1);
    R(H.cabinetDeep, x, islB + 1, w, kickB - islB - 1);
    for (yy = kickB; yy < far2; yy++) {
      R(((yy - kickB) % 3 === 2) ? FAR_SEAM : (((yy - kickB) / 3 | 0) % 2 ? P.oakDayWarm : P.oakDay), x, yy, w, 1);
    }
    for (yy = far2; yy < seamY; yy++) {
      R((yy - far2) % 5 === 0 ? P.oakSun : ((yy - far2) % 5 === 4 ? P.oakSeam : P.oakDay), x, yy, w, 1);
    }
    for (k = 0; k < 6; k++) R(P.oakGrain, x + ((k * 37 + 11) % Math.max(1, w - 10)), far2 + 2 + (k % 3) * 5, 6 + (k % 3) * 2, 1);
    Tint.rect(ctx, x, far2, w, seamY - far2, H.walnutDeep, 4);
    R(P.oakSeam, x, seamY, w, 1);
    R(P.oakSun, x, seamY + 1, w, 1);
    R(P.oakDay, x, seamY + 2, w, y + h - seamY - 2);
    /* three nested cathedral arcs and the knot at their heart, and a few
       straight runs of grain either side */
    for (k = 0; k < 3; k++) {
      var aw = Math.round(w * (0.62 - k * 0.14)), ax = x + Math.round(w * (0.04 + k * 0.1));
      for (i = 0; i < aw; i++) {
        R(k ? P.oakGrain : P.oakGrainDeep, ax + i, seamY + 5 + k * 3 - Math.round((3 - k) * Math.sin(Math.PI * i / aw)), 1, 1);
      }
    }
    for (k = 0; k < 4; k++) R(P.oakGrain, x + Math.round(w * (0.55 + (k % 2) * 0.2)), seamY + 4 + k * 3, 6 + k * 2, 1);
    R(P.oakKnotRing, x + Math.round(w * 0.55) - 1, seamY + 7, 7, 4);
    R(P.oakKnot, x + Math.round(w * 0.55), seamY + 8, 5, 2);
    Tint.rect(ctx, x, seamY + 2, w, y + h - seamY - 2, H.walnutDeep, 5);

    /* the lid: the table's underside and its white apron */
    R(H.walnutDeep, x, y, w, lidB - y);
    R(P.paintHi, x, y + 2, w, 1);
    R(H.paint, x, y + 3, w, Math.max(1, lidB - y - 6));
    R(H.paintShade, x, lidB - 3, w, 1);
    R(H.outline, x, lidB - 2, w, 1);

    /* THE LEGS, sliding past: a white chair leg from the lid, a black stool
       leg from the boards, with the gap between them */
    var period = big ? 46 : 38;
    var span = seamY - lidB;
    var gapH = Math.round(span * 0.34);
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - wrap(s + i * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapY = Math.round(lidB + 6 + ((i * 19) % Math.max(1, span - gapH - 14)));
      /* the chair leg */
      Tint.rect(ctx, ox + 10, lidB, 2, gapY - lidB, H.void, 6);
      R(H.outline, ox, lidB, 10, gapY - lidB);
      R(P.paintHi, ox + 1, lidB, 2, gapY - lidB - 2);
      R(H.paint, ox + 3, lidB, 3, gapY - lidB - 2);
      R(P.paintHi, ox + 6, lidB, 1, gapY - lidB - 2);
      R('#ddd5c3', ox + 7, lidB, 2, gapY - lidB - 2);
      R(H.outline, ox - 2, lidB, 14, 4);
      R(H.paint, ox - 1, lidB, 12, 3);
      R(P.glide, ox + 1, gapY - 2, 8, 2);
      /* the stool leg, its seat and its ring */
      var by = gapY + gapH;
      Tint.rect(ctx, ox + 10, by, 2, seamY - by, H.void, 6);
      R(H.outline, ox, by, 10, seamY - by);
      R(H.ironLit, ox + 1, by, 1, seamY - by);
      R('#37322f', ox + 2, by, 3, seamY - by);
      R('#6e6863', ox + 5, by, 1, seamY - by);
      R(H.iron, ox + 6, by, 3, seamY - by);
      R(H.outline, ox - 2, by - 1, 14, 4);
      R(H.walnutHi, ox - 1, by, 12, 1);
      R(H.walnut, ox - 1, by + 1, 12, 1);
      var ry = y + Math.round(h * 0.76);
      if (ry > by + 5) {
        R(H.outline, ox - 3, ry - 1, 16, 3);
        R(H.ironLit, ox - 2, ry, 14, 1);
      }
    }

    /* THE CRUMBS hopping on the near seam - drawn faster toward the mop
       than the room slides, because the mop has them - each with its spot */
    var band = seamY - farB;
    for (i = 0; i < 3; i++) {
      var kx = x + Math.round(wrap(w - s * 1.3 + i * 37, w + 8)) - 4;
      if (kx < x + Math.round(w * 0.2) || kx > x + w - 4) continue;
      var apex = Math.round(band * (0.18 + i * 0.07));
      var rise = Math.abs(Math.sin(t * (2.6 - i * 0.4) + i * 1.3));
      var ky = Math.round(seamY - 4 - rise * apex);
      Tint.rect(ctx, kx - 1, seamY + 1, 5, 1, H.void, 15 - Math.round(rise * 9));
      R(H.outline, kx - 1, ky, 5, 3); R(H.outline, kx, ky - 1, 3, 5);
      if (i === 0) { R(P.bread, kx, ky, 3, 3); R(P.breadHi, kx, ky, 1, 1); R(P.crust, kx + 2, ky + 1, 1, 2); }
      else if (i === 1) { R(P.cereal, kx, ky, 3, 3); R(P.cerealShade, kx + 1, ky + 1, 1, 1); }
      else { R(P.cookie, kx, ky, 3, 3); R(P.chip, kx + 1, ky + 1, 1, 1); }
    }
    /* the hot sauce on its way down, bending back toward the mop */
    var fall = wrap(s * 1.5, seamY - lidB - 6);
    var hotX = x + Math.round(w * 0.78 - fall * 0.35), hotY = lidB + Math.round(fall);
    Tint.rect(ctx, hotX - 3, hotY - 3, 9, 9, P.hotSauceHi, 4);
    R(P.hotSauce, hotX, hotY, 3, 4);
    R(P.hotSauce, hotX + 1, hotY - 1, 1, 1);
    R(P.hotSheen, hotX, hotY + 1, 1, 1);
    R(P.hotSauceDeep, hotX + 2, hotY + 3, 1, 1);

    /* THE MOP at the left edge: its body leaning back off the card with the
       handle going up, and the head on the boards with the roller turning */
    var mw = Math.max(16, Math.round(w * 0.24)), hy0 = Y(0.68), hy1 = Y(0.84);
    var bw = Math.max(8, Math.round(w * 0.12)), bTop = Y(0.30);
    for (yy = bTop; yy < hy0; yy++) {
      var lean = Math.floor((hy0 - yy) / 8);
      var bx0 = x + bw - 2 - bw - lean;
      var inTank = yy > bTop + (hy0 - bTop) * 0.45;
      R(H.outline, bx0 - 1, yy, bw + 2, 1);
      R(inTank ? P.mopTank : P.mopWhite, bx0, yy, bw, 1);
      if (inTank && yy > hy0 - (hy0 - bTop) * 0.25) R(P.mopWater, bx0 + 1, yy, bw - 2, 1);
      if (!inTank && (yy - bTop) % 9 < 2) R(P.mopGreen, bx0, yy, bw, 1);
    }
    for (yy = y; yy < bTop; yy++) {
      var hx2 = x + Math.round(bw / 2) - 2 - Math.floor((hy0 - yy) / 8);
      R(H.outline, hx2 - 1, yy, 4, 1);
      R(P.mopWhite, hx2, yy, 2, 1);
    }
    R(H.outline, x, hy0, mw + 1, hy1 - hy0 + 1);
    R(P.mopWhite, x, hy0 + 1, mw, 2);
    R(P.mopGreen, x, hy0 + 3, mw, 2);
    R(P.mopGreyDeep, x, hy0 + 5, mw, hy1 - hy0 - 7);
    R(P.mopTank, x, hy0 + 6, mw - 1, hy1 - hy0 - 9);
    var sh = Math.floor(t * 10) % 3;
    for (k = 0; k < mw; k += 5) {
      for (i = 0; i < hy1 - hy0 - 9; i++) R(P.rollerStripe, x + k + i + sh, hy0 + 6 + i, 2, 1);
    }
    R(P.mopWhite, x + mw - 4, hy0 + 1, 4, hy1 - hy0 - 3);
    R(P.mopGreen, x, hy1 - 2, mw, 1);
    R(P.cable, x + mw - 7, hy1, 4, 2);
    /* and the air going into it */
    for (i = 0; i < 3; i++) {
      var dx2 = wrap(w * 0.4 - s * 1.1 + i * w * 0.13, w * 0.4);
      R(P.oakSun, x + mw + 1 + Math.round(dx2), hy0 + 4 + i * 3, 2, 1);
    }

    /* the doodad flying it, with a halo so it never goes missing */
    var dx = Math.round(x + w * 0.42);
    var dy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, dx - sz, dy - sz, sz * 2, sz * 2, H.void, 5);
    R(H.outline, dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    R('#c9873c', dx - sz / 2, dy - sz / 2, sz, sz);
    R('#eab873', dx - sz / 2, dy - sz / 2, sz - 2, 1);
    R(H.outline, dx + sz / 2 - 2, dy - 1, 1, 1);
    R('#f3cc84', dx + sz / 2, dy, 2, 1);

    /* the daylight: the table's shade at the top, the window's warmth on
       the right */
    Tint.rect(ctx, x, lidB, w, Y(0.20) - lidB, H.walnutDeep, 3);
    Tint.rect(ctx, x + Math.round(w * 0.66), lidB, w - Math.round(w * 0.66), seamY - lidB, '#ffe9b8', 1);
  }

  /* ======================================================== generation */

  /* the upper and lower halves roll their own variants: 1 in 3 chair legs
     scuffed with a stretcher stub, 28 in 100 stool legs the chrome post */
  function makePillar(x, gapY, gapH, run) {
    return { type: 'pillar', x: x, w: 34,
             gapY: Math.round(gapY), gapH: Math.round(gapH), scored: false,
             up: chance(0.7) ? 0 : 1, low: chance(0.72) ? 0 : 1 };
  }

  /* NO SPIKES (the owner's call). The tune's spikeScore is out of reach,
     and if the engine ever asked anyway this is the Fort's stub: nothing,
     already gone. */
  function makeSpikes(x, side, count, maxLen, run) {
    return { type: 'spike', x: Math.round(x), side: side, len: 0, w: 0, gone: true };
  }

  function rollKind() {
    var v = Math.random(), a = 0;
    for (var i = 0; i < KIND_ODDS.length; i++) { a += KIND_ODDS[i]; if (v < a) return i; }
    return 0;
  }

  /* ONE MAKER FOR EVERY DROP. It builds the crumb fields and the liquid
     fields both, because the engine decides whether this is the lime
     after it returns: isLiquid() reads the flags live, and stepDrop
     re-points the burst on a droplet's first frame. */
  function makeDrop(x, spicy, fall, run) {
    var kind = rollKind();
    return {
      type: 'drop', x: x, y: CEIL + 5, vy: fall, vx: 0,
      spicy: !!spicy, gold: false, broken: 0,
      w: 7, kind: kind, shape: randInt(0, 1),
      spin: rand(0, TAU), spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1),
      hop: rand(HOP_MIN, HOP_MAX), landed: false,
      burst: spicy ? [P.hotSauceHi, P.hotSauce] : CRUMB_BURST[kind],
      splat: SPLAT_TIME, landCry: 'pat'
    };
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 18, kind: randInt(0, 3), seed: randInt(1, 100000) };
  }

  /* THE LEAF. y is where it is GRABBED, the middle of its glow; the leaf
     itself lies on the boards under it. */
  function makeBoon(x, run) {
    var dry = nextDry;
    nextDry = !dry;
    return { type: 'boon', x: x, y: FLOOR - 9, w: 16, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0, dry: dry, slide: 0, skit: 0,
             name: dry ? DRY_NAME : GREEN_NAME,
             burst: dry ? [P.leafDryLit, P.leafDry, P.leafDryDeep, P.lifePale, P.lifeJade]
                        : [H.leafLit, H.leaf, P.leafVein, P.lifePale, P.lifeJade] };
  }

  /* ------------------------------------------------------- THE MOP: makeFoe

     Called once a bay from tune.foeScore. The first call builds the mop
     in the ledger and hands the engine its carrier; every call after says
     no. The carrier is a LITTER object - litter is never collided, and the
     owner's mop is never lethal - that `keep`s through a spare life, with
     w 400 so the engine's cull (x + w < -70) never reaches it, and with its
     x re-pinned to the mop's face every frame by stepFoe: the mop holds
     station on the SCREEN while the world slides under it. */
  function freshStreak(M, anywhere) {
    var x = M.face + rand(40, 170);
    return { x: anywhere ? x : M.face + rand(120, 170), y: FLOOR - rand(2, 28),
             len: randInt(3, 7), v: 90 + Math.max(0, 246 - x) * 0.6 };
  }

  function makeFoe(mid, spacing, run) {
    var L = run && run.ledger;
    if (!L || L.mop) return null;
    var M = { face: MOP_FROM, t: 0, on: 0, parked: false, ate: 0, fill: 0,
              lurchIn: rand(4, 7), lurch: 0, streaks: [] };
    for (var i = 0; i < 12; i++) M.streaks.push(freshStreak(M, true));
    L.mop = M;
    L.cry = 'whirr';
    return { type: 'litter', foe: true, keep: true, mop: true, x: MOP_FROM, w: 400 };
  }

  /* THE MOP'S CLOCK, once a frame: the roll-in or the idle lurch, the
     suction's ramp, the doodad's drift and wall, the streaks. */
  function stepFoe(ob, dt, obstacles, run) {
    var L = run.ledger, M = L.mop, i;
    if (!M) return;
    M.t += dt;
    if (!M.parked) {
      var k = clamp(M.t / MOP_ROLL, 0, 1);
      M.face = MOP_FROM + (MOP_FACE - MOP_FROM) * easeOutCubic(k);
      M.on = ease(k);
      if (k >= 1) { M.parked = true; M.face = MOP_FACE; M.on = 1; L.cry = 'thud'; L.shake = 2; }
    } else if (M.lurch > 0) {
      M.lurch += dt;
      if (M.lurch >= LURCH_T) { M.lurch = 0; M.lurchIn = rand(4, 7); }
      M.face = MOP_FACE + (M.lurch > 0 ? LURCH_PX * Math.sin(Math.PI * M.lurch / LURCH_T) : 0);
    } else {
      M.lurchIn -= dt;
      if (M.lurchIn <= 0) M.lurch = 0.0001;
      M.face = MOP_FACE;
    }
    ob.x = M.face;
    L.drift = DRIFT * M.on;
    L.wall = M.face >= 8 ? M.face : 0;
    for (i = 0; i < M.streaks.length; i++) {
      var s = M.streaks[i];
      s.x -= s.v * dt * M.on;
      if (s.x < M.face + 2) M.streaks[i] = freshStreak(M, false);
    }
  }

  /* ---------------------------------------------------------- stepDrop

     The Couch's contract, word for word: move the one drop you are handed,
     READ the list, never splice it or write anything else in it; return
     true to land; ob.bounced for the engine's tick and two puffs; ob.gone
     to retire it. Crumbs never land. Droplets land, or pop on a leg. */
  var vxLo = -VX_MAX;          /* this frame's floor on a crumb's own vx */

  function stepDrop(ob, dt, obstacles, run) {
    var M = run && run.ledger ? run.ledger.mop : null;
    var on = M ? M.on : 0;
    if (isLiquid(ob)) return stepLiquid(ob, dt, obstacles, M, on);
    var i, p;
    vxLo = on > 0 ? -SUCK_VMAX : -VX_MAX;

    ob.vy += DROP_GRAV * dt;
    ob.y += ob.vy * dt;
    ob.x += ob.vx * dt;
    ob.spin += ob.spinRate * (ob.landed ? 0.4 : 1) * dt;

    /* THE MOP'S PULL - across the room while it is still falling, on the
       s^2 curve once it is hopping - and the dip into its mouth */
    if (on > 0) {
      if (ob.landed) suck(ob, dt, M, on);
      else pullAir(ob, dt, M, on);
      if (ob.y < FLOOR - 5 && ob.x < M.face + DIP_W) {
        ob.vy += DIP_A * (1 - (ob.x - M.face) / DIP_W) * on * dt;
      }
    }

    for (i = 0; i < obstacles.length; i++) {
      p = obstacles[i];
      if (p.type === 'pillar') {
        if (ob.x < p.x - 60 || ob.x > p.x + p.w + 60) continue;
        hitPillar(ob, p);
      } else if (p !== ob && p.type === 'drop' && p.broken <= 0 && !p.gone && !isLiquid(p)) {
        hitKernel(ob, p);
      }
    }

    /* the lid. A crumb only gets up here off a seat; the lid is soft, but a
       crumb may not leave through it */
    if (ob.y < CEIL + 4) {
      ob.y = CEIL + 4;
      ob.vy = Math.abs(ob.vy) * 0.3;
    }

    /* THE BOARDS: a re-launch to this crumb's own apex, the Couch's */
    if (ob.y >= FLOOR - 4) {
      ob.y = FLOOR - 4;
      ob.landed = true;
      ob.vy = -Math.sqrt(2 * DROP_GRAV * ob.hop * rand(1 - HOP_VARY, 1 + HOP_VARY));
      ob.vx = clamp(ob.vx * 0.75 + rand(-24, 24), vxLo, VX_MAX);
      ob.bounced = true;
    }

    /* THE MOUTH, last, so a crumb that lands on the frame it reaches the
       mouth still throws its puff at the mouth */
    if (M && ob.x <= M.face + 3) {
      if (ob.y >= FLOOR - 34) swallow(ob, M);
      else if (ob.x < M.face - 30) ob.gone = true;      /* gone behind the body */
    }
    return false;
  }

  /* a pull toward the mouth, k the strength (the suction's ramp, 1.3x for
     a droplet) */
  function suck(ob, dt, M, k) {
    var s = clamp(1 - (ob.x - M.face) / PULL_REACH, 0, 1);
    if (s <= 0) return;
    ob.vx -= PULL_A * s * s * k * dt;
    if (ob.vx < -SUCK_VMAX) ob.vx = -SUCK_VMAX;
  }

  /* the pull on a thing still falling: AIR_A x (0.35 at the far edge of the
     reach .. 1 at the mouth), up to the same SUCK_VMAX */
  function pullAir(ob, dt, M, k) {
    var s = clamp(1 - (ob.x - M.face) / AIR_REACH, 0, 1);
    ob.vx -= AIR_A * (0.35 + 0.65 * s) * k * dt;
    if (ob.vx < -SUCK_VMAX) ob.vx = -SUCK_VMAX;
  }

  function swallow(ob, M) {
    ob.gone = true;
    ob.bounced = true;
    M.ate++;
    M.fill = Math.min(1, M.ate / FILL_N);
  }

  /* THE DROPLET: falls, is drawn back toward the mouth, and splats - on the
     boards, or on the top of a stool seat it comes down on. Against the
     side of a leg it does not burst: it is stopped, and runs down the
     face (a droplet the draft has pulled into a leg would otherwise be a
     gift lost more often than not - measured at 31 in 45 with every
     contact a burst). One born inside a column falls through it, which is
     what every drop in the game does. */
  var legBoxes = [];
  function stepLiquid(ob, dt, obstacles, M, on) {
    if (!ob.wet) {
      ob.wet = true;
      ob.w = 8;
      ob.vx = 0;
      var L = LIQ[liqOf(ob)];
      ob.burst = [L.hi, L.D];
    }
    var y0 = ob.y;
    ob.vy += LIQ_GRAV * dt;
    ob.y += ob.vy * dt;
    ob.x += ob.vx * dt;
    if (on > 0) pullAir(ob, dt, M, on * LIQ_PULL);
    for (var i = 0; i < obstacles.length; i++) {
      var p = obstacles[i];
      if (p.type !== 'pillar' || ob.x < p.x - 60 || ob.x > p.x + p.w + 60) continue;
      legBoxes.length = 0;
      rectsFor(p, legBoxes);
      for (var k = 0; k < legBoxes.length; k++) {
        var b = legBoxes[k];
        if (ob.x + 4 <= b[0] || ob.x - 4 >= b[0] + b[2] || ob.y + 5 <= b[1] || ob.y - 5 >= b[1] + b[3]) continue;
        if (y0 + 5 <= b[1] + 0.5) {
          /* down onto the top of it: it bursts there - unless it only
             caught the rim, when it runs off the edge it is nearest (one
             that has run down the side of a chair leg arrives exactly on
             the rim of the seat below, and bursting every one of those
             spent half the bay's gifts on the furniture) */
          if (ob.x >= b[0] + 4 && ob.x <= b[0] + b[2] - 4) {
            ob.y = b[1] - 1;          /* the splat sits ON the seat's top row */
            ob.pop = true;
            return true;
          }
          ob.x = ob.x < b[0] + b[2] / 2 ? b[0] - 5 : b[0] + b[2] + 5;
          ob.vx = 0;
          continue;
        }
        if (ob.x > b[0] && ob.x < b[0] + b[2] && ob.y > b[1] && ob.y < b[1] + b[3]) continue;
        /* the side of a leg: stopped against the face, and down it */
        ob.x = ob.x < b[0] + b[2] / 2 ? b[0] - 4 : b[0] + b[2] + 4;
        ob.vx = 0;
      }
    }
    if (M && ob.x <= M.face + 3 && ob.y >= FLOOR - 34) { swallow(ob, M); return false; }
    if (ob.y >= FLOOR - 4) { ob.y = FLOOR - 4; return true; }
    return false;
  }

  /* A crumb against one pillar, through this module's own rectsFor so the
     thing it bounces off and the thing the doodad dies on are the same
     boxes by construction - the Couch's hitPillar verbatim. */
  var pillarBoxes = [];
  function hitPillar(ob, p) {
    var i;
    pillarBoxes.length = 0;
    rectsFor(p, pillarBoxes);
    for (i = 0; i < pillarBoxes.length; i++) {
      var b = pillarBoxes[i];
      var cx = clamp(ob.x, b[0], b[0] + b[2]);
      var cy = clamp(ob.y, b[1], b[1] + b[3]);
      var dx = ob.x - cx, dy = ob.y - cy;
      var d2 = dx * dx + dy * dy;
      if (d2 < 0.25 || d2 >= KERNEL_R * KERNEL_R) continue;
      var d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
      ob.x += nx * (KERNEL_R - d);
      ob.y += ny * (KERNEL_R - d);
      if (Math.abs(nx) > Math.abs(ny)) {
        ob.vx = nx * Math.max(Math.abs(ob.vx) * 0.55, 18);
        ob.vy *= 0.9;
      } else if (ny < 0) {
        /* the top of a seat: never settle in the gap - roll off the nearer end */
        ob.vy = -Math.abs(ob.vy) * 0.25;
        ob.vx = (ob.x >= b[0] + b[2] / 2 ? 1 : -1) * rand(30, 50);
        ob.bounced = true;
      } else {
        ob.vy = Math.abs(ob.vy) * 0.55;
      }
      return;
    }
  }

  /* crumb against crumb: the Couch's one-sided equal-mass impulse */
  function hitKernel(ob, o2) {
    var dx = ob.x - o2.x, dy = ob.y - o2.y;
    var d2 = dx * dx + dy * dy;
    if (d2 >= PAIR_D * PAIR_D || d2 < 0.0001) return;
    var d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
    ob.x += nx * (PAIR_D - d) * 0.5;
    ob.y += ny * (PAIR_D - d) * 0.5;
    var rv = (ob.vx - o2.vx) * nx + (ob.vy - o2.vy) * ny;
    if (rv >= 0) return;
    ob.vx -= 0.925 * rv * nx;
    ob.vy -= 0.925 * rv * ny;
    ob.vx = clamp(ob.vx, vxLo, VX_MAX);
  }

  /* ----------------------------------------------------------- stepBoon

     A leaf does nothing but breathe, until the mop's draft has it. Then it
     slides toward the mouth - `ob.x`, the world position, never ob.dx,
     which is Gerald's - skittering through its four frames, and the mouth
     takes it with a puff and a pat. */
  function stepBoon(ob, dt, obstacles, run) {
    if (ob.taken || ob.gone) return;
    var M = run && run.ledger ? run.ledger.mop : null;
    ob.slide = 0;
    if (!M || !(M.on > 0)) return;
    var gx = ob.x + ob.dx;
    var s = clamp(1 - (gx - M.face) / PULL_REACH, 0, 1);
    var slide = LEAF_SLIDE * s * s * M.on;
    ob.x -= slide * dt;
    ob.slide = slide;
    ob.skit = (ob.skit || 0) + slide / 6 * dt;
    if (ob.x + ob.dx <= M.face + 6) {
      ob.gone = true;
      ob.bounced = true;
      run.ledger.cry = 'pat';
      M.ate++;
      M.fill = Math.min(1, M.ate / FILL_N);
    }
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one. The mop has
     none at all. A crumb is collided as the lump it is; a droplet a pixel
     wider than it is drawn, because catching is meant to be easy. */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      /* the seat block, the leg, and the foot - 28 wide at x+3, inside the
         taper and the glide on every row */
      out.push([ob.x - 4, CEIL, 42, 8]);
      if (ob.gapY - 9 > CEIL + 8) out.push([ob.x, CEIL + 8, 34, ob.gapY - 9 - CEIL - 8]);
      out.push([ob.x + 3, ob.gapY - 9, 28, 9]);
      /* the seat, and the stool leg down to the boards */
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, 42, 9]);
      if (FLOOR - botY - 9 > 0) out.push([ob.x, botY + 9, 34, FLOOR - botY - 9]);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0 || ob.gone) return out;
      if (isLiquid(ob)) out.push([ob.x - 4, ob.y - 5, 8, 10]);
      else if (KIND_FLAT[ob.kind]) out.push([ob.x - 3, ob.y - 2, 6, 5]);
      else out.push([ob.x - 3, ob.y - 3, 6, 6]);
    } else if (ob.type === 'boon') {
      if (!ob.taken && !ob.gone) out.push([ob.x + ob.dx - 8, FLOOR - 16 + ob.dy, 16, 12]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: DiningRoom.END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    CEIL_KILLS: false,
    BOON_NAMES: [GREEN_NAME, DRY_NAME],
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview, drawOverlay: drawOverlay,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon, makeFoe: makeFoe,
    stepDrop: stepDrop, stepBoon: stepBoon, stepFoe: stepFoe,
    rectsFor: rectsFor
  };
})();
