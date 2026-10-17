/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM / THE FLOOR (3-2)

   Afternoon, and you are four centimetres off the white-oak boards,
   under the dining table, looking out across to the island - FLOOR REF
   6, the owner's own photograph of exactly this view. Its details come
   from the older references: Floor ref 1 (the stools, their foot rings
   and chrome glide, the knot in the near board, the sneakers), Floor 2
   (the cathedral grain, the far wall's glass uppers and the pothos),
   Floor ref 3 (the pedestal's splayed foot, the seat undersides with
   their brackets), Floor ref 4 (the white tapered chair leg and its
   glide, the apron, the shuttered window), Floor ref 5 (the X-back chair,
   the fridge's photographs) and the Floor mop ref.

   THE BACKGROUND WAS REBUILT FROM ONE ROOM MODEL that THE TABLE is cut
   from too (see THE CAMERA): the first cut of both bays was painted from
   a lens half a metre up, and the owner's verdict was that they were the
   same picture with a different skirting - "the Table feels like the
   floor of the room, but then there's the actual floor". With the lens on
   the boards the floor fills the bottom 45% of the screen, everything
   standing more than half a metre off is compressed toward the horizon
   at row 146, and each thing stands on the floor at its own depth:

     the far wall + fridge   0.15  a sliver of bright ceiling, the crown,
                                   the tops of the uppers and the hood
                                   over the island; the whole back wall
                                   and the fridge only in the island's gap
     the island              0.30  quartz nose and honey ply high up at
                                   37..60, the shaded shaker base, the dark
                                   toe-kick at 140..150, two stools tucked
                                   under it, its two end panels, and the
                                   gap past them with the sneakers
     a far chair             0.48  one white X-back chair per 720, pushed
                                   in at the far side: its seat from below,
                                   four tapered legs, the X over the seat
     the floor               true  ONE OAK FLOOR from the toe-kicks to the
                             persp.  bottom of the screen, its boards running
                                   into the room and fanning out from the
                                   vanishing point, under a static light:
                                   the window's sheen far off, the table's
                                   shade near (see THE FLOOR)
     the near board          1.00  the band, the actual ground: the same
                                   boards, a shade lighter, under the kill
                                   line's dark seam and lit arris
   and over the lot one baked daylight sheet: the table's shade overhead,
   the window's warmth on the right, a dim corner on the left for the mop
   to park in. Light comes from the LEFT and from the sunlit far floor, so
   lit faces are left faces and cast shadows fall right.

   THE LID IS THE TABLE'S UNDERSIDE AND IT DOES NOT KILL: the last of its
   walnut-stained ply, then the far apron's white face with its screw
   heads and a zinc bracket at each leaf joint, at the far chair's
   parallax; one outline row and then a dark soft row, which is the
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

     CONTRAST, on the rebuilt room (mean luminance, the menu backdrop at
     six scrolls). Behind the chair legs (rows 24..125) 141..148 against a
     white leg body of 211 - sixty clear, with the outline and the 4px
     cast shadow on top; the ceiling sliver 154..160, the honey overhang
     133..139, the shaded island 142..152. Behind the stools (140..241)
     162..164 against a black leg of 44; the toe-kick, the one dark stripe
     a stool leg crosses, 119..146. The floor runs from 185..191 in the
     window's sheen to 140..143 where the crumbs land, which puts every
     crumb fifty and more over it; the near board, the actual ground, is
     156..159, a step brighter, under a dark seam and a lit arris. The
     leaves read by hue (green and russet on honey) and by their ring,
     glow and twinkle. In motion every floor row is its last frame's self
     moved a whole number of pixels (99.5% of row-frames exactly; the rest
     are seams turning as they slide out from the vanishing point).

     THE TUNE. The bay first measured a tenth of the Couch's hits (0.19 a
     40 s run against 2.06): the drift parks a doodad that does not fight
     it on the wall at x 57, and the Couch's spawn window (dropAhead
     12..112) put every crumb down 80-200px in front of that - the wall
     was the safest place in the room, the opposite of the owner's
     "forcing them to repeatedly move forward". The airborne pull (AIR_A,
     below) bends the rain back toward the wall; the window is the lever,
     and levels.js now spawns at 50..200 (2.69 against the Couch's 2.06 on
     the harness, 1.31x; the lead's own run, 2.3 against 2.5). Per 40 s run:
     crumbs about 55, most eaten by the mop; droplets 5.7 (they splat on
     the boards, burst on a seat, go into the mop, or are caught); leaves
     1.25, three in five eaten by the mop if nobody dives for them; the
     idle lurch 4-5 times in 38 s. None of it moved when the background
     was rebuilt: every make, step and box is untouched.

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

    /* THE ISLAND, SEEN FROM THE FLOOR (Floor ref 6). Its white shaker base
       is what a white chair leg is read against for most of the leg's
       length, and it stands in the shade of its own overhang, so it is
       painted a step under the photograph's cream: the recessed field
       (isleField, 150), the frames (isleFrame, 174), their lit arrises
       (isleLit, 202), the dark joints (isleDeep). The toe-kick is the one
       dark stripe a black stool leg crosses (toeKick, 100). The old
       doorShade/doorFrame/doorLit trio is kept for the cover's island. */
    isleField:    '#9e9582',
    isleFrame:    '#b8af9a',
    isleLit:      '#d2cab7',
    isleDeep:     '#7d7563',
    toeKick:      '#6b645a',
    doorShade:    '#a9a08b',
    doorFrame:    '#cdc5b1',
    doorLit:      '#e4ddcc',

    /* THE ISLAND'S OVERHANG IS HONEY PLY UNDER A WHITE QUARTZ NOSE - from
       below that is all Floor ref 6 shows of the counter: the nose, the
       ply's edge, and its underside foreshortened over the 40 cm overhang,
       a half-step darker (plyUnder) and darker still where it meets the
       cabinet face. The walnut is the TABLE's, and it is the lid. */
    plyLit:       '#dcb983',
    ply:          '#c9a46a',
    plyShade:     '#a07e4c',
    plyUnder:     '#ad8a58',

    /* THE FAR KITCHEN, in the island's gap and over its overhang: the
       ceiling sliver (the house plaster under the afternoon, capped well
       under a white leg: ceilDay 211, its bounce row by the crown 222),
       the subway grout, the hood's glass canopy */
    /* the far chair's white paint in the table's shade - a full step
       under the house paint's shade, so the whole chair (seat, rails, four
       thin legs) sits back behind the pillars' lit white */
    chairBody:    '#b9b19d',
    /* THE LIGHT ON THE FLOOR (see THE FLOOR): the window's sheen by the
       toe-kicks and the open floor it eases into - Floor ref 6's honey, a
       value or so lighter (floorNear and bandFace colour the cover) */
    floorSheen:   '#dcc5a1',
    floorMid:     '#c3aa86',
    floorNear:    '#8e7b64',
    bandFace:     '#dcc7a2',
    /* the boards themselves, top-down, before the light: honey oak, a
       warmer board now and then, the grain, the satin lip at each seam */
    oakFloor:     '#d6bf99',
    oakFloorWarm: '#c8ab80',
    oakFloorGrain: '#7d6246',
    oakFloorLip:  '#ecdcbc',
    oakFloorSeam: '#7a624a',
    /* the far walls, the greige of Table ref 4, and the haze the gap's
       six metres lay over everything in it */
    farWall:      '#b8ae9a',
    farHaze:      '#7f7868',
    ceilDay:      '#d6d2c4',
    ceilBright:   '#e4e0d2',
    grout:        '#c3bdb0',
    hoodGlass:    '#a6b5b5',
    hoodGlassLit: '#d6e2e0',

    /* THE CRUMBS - five kinds, one physics. Every body is held at least
       fifty values clear of the floor it lands on (the boards under the
       table's shade measure 140..143 across FLOOR-6..FLOOR-1 on the
       harness): bread 228, rice 229, cracker 200, cereal 198, cookie 192. The brief's cereal (175) and cookie (168) were being
       read by their outline alone against that board, so both were lifted
       a value, hue kept. */
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

  /* ======================================================== THE CAMERA

     ONE ROOM, TWO LENSES. The Table and the Floor are cut from one model
     of this room (the planner's table_floor_room brief), so a chair, the
     island and the fridge stand at the same heights in both bays and only
     the lens moves. This bay's lens is FOUR CENTIMETRES OFF THE OAK, under
     the dining table, 14 cm in from its near apron, looking level across
     to the island - Floor ref 6, the owner's own photograph of the view he
     wants. A pinhole with the photograph's vertical field:

         row(H, D) = Y_H - FOC * (H - EYE) / D      width(w, D) = FOC * w / D

     H the height above the boards and D the depth from the lens, both in
     cm; EYE 4, Y_H 146 (the horizon row - it puts the island's toe-kick,
     H 0 at D 250, on row 150 and a far chair's seat (45) and feet at
     D 117 on 54 and 155, exactly where Floor ref 6 has them), FOC 262.
     Every row below is quoted off this, so anything can be re-derived.

     The depths (cm): the far apron of the table 136; the far chair's front
     legs 100 and its back 154; the island's
     overhang edge 210, its base 250, its toe-kick 257, the stools tucked
     under it 230; the fridge 323; the hood 382; the back wall 596.

     PARALLAX is one law for both bays, p(D) = min(1, (45 / D)^0.75):
     monotonic in depth, which is the thing the eye checks, and it puts
     anything nearer than 45 cm on the play plane:
         far wall + fridge + hood  0.15     the island + stools  0.30
         the lid + the far chair   0.48     the near board      1.00
     The floor between them is one oak floor in true perspective (THE
     FLOOR), and every layer carries its own furniture's feet and contact
     shadows; the feet stand where the floor is the window's bright haze,
     so each thing slides over the floor at its own depth and never off it.
     (The pedestal's splayed foot was here at 0.65 for one cut; on its own
     it read as a random slab in the middle of the floor, and the whole
     pedestal - a white post from the boards to the table - would be one
     more white pillar in a bay whose pillars are white legs, so it is
     gone. The pedestal stands under the lens.) */
  var Y_H = 146, EYE = 4, FOC = 262;

  /* ========================================================= THE LID

     The table's underside, seen from four centimetres off the floor 1.2 to
     1.4 m away: the last of the walnut-stained ply (rows 0..14, with its
     figure), the far apron's white face (15..21, a screw head every 60, a
     zinc bracket at each leaf joint - Floor ref 3 and ref 4), and the
     bounce pair - ONE outline row then a walnut row, never the room's
     double black: that pair is the kill line, and this lid only stops you.
     240 wide, at the far chair's parallax (0.48): the apron is 1.36 m off
     and moves like the chair beside it, not like the boards under you.
     The pedestal's top block has gone - the pedestal is under the lens. */
  var LID_W = 240, LID_P = 0.48;

  function bakeLid() {
    var t = makeCanvas(LID_W, CEIL), c = t.ctx;
    var r = mulberry32(3207), i, x;

    fill(c, H.walnutDeep, 0, 0, LID_W, 15);
    /* the ply's figure, foreshortened: long thin runs, denser toward the
       apron where the underside is seen more edge-on */
    for (i = 0; i < 18; i++) {
      var ry = Math.floor(Math.pow(r(), 0.6) * 14);
      runW(c, H.walnut, r() * LID_W, ry, 10 + Math.floor(r() * 26), LID_W);
    }
    for (i = 0; i < 6; i++) runW(c, H.walnutLit, r() * LID_W, 6 + Math.floor(r() * 8), 4 + Math.floor(r() * 7), LID_W);
    /* the shadow the apron throws back along the underside */
    shadeRows(c, H.void, 0, 9, LID_W, 6, 0.30, false);

    /* THE APRON (Floor ref 4): white paint, its top arris catching the
       light off the boards, the lower two rows turning away */
    fill(c, H.outline, 0, 14, LID_W, 1);
    fill(c, P.paintHi, 0, 15, LID_W, 1);
    fill(c, H.paint, 0, 16, LID_W, 4);
    fill(c, H.paintShade, 0, 20, LID_W, 2);
    fill(c, H.outline, 0, 22, LID_W, 1);
    fill(c, H.walnutDeep, 0, 23, LID_W, 1);
    for (x = 23; x < LID_W; x += 60) {
      fill(c, H.steel, x, 17, 2, 2);
      fill(c, H.steelShade, x + 1, 17, 1, 2);
      fill(c, H.steelShade, x, 18, 2, 1);
    }
    /* the leaf joint and its zinc L-bracket (Floor ref 3) */
    fill(c, H.paintDeep, 150, 15, 1, 7);
    fill(c, H.outline, 143, 8, 11, 6);
    fill(c, H.steelLit, 144, 9, 9, 4);
    fill(c, H.steel, 150, 9, 3, 4);
    fill(c, H.steelShade, 144, 12, 9, 1);
    fill(c, H.steelDeep, 146, 10, 1, 1);
    fill(c, H.steelDeep, 150, 11, 1, 1);
    for (i = 0; i < 6; i++) runW(c, H.paintShade, r() * LID_W, 16 + Math.floor(r() * 4), 2 + Math.floor(r() * 3), LID_W);
    return t;
  }

  /* ========================================================= THE FAR WALL

     720 x 127, screen rows 24..150, at 0.15. Opaque. ALONG THE ISLAND ALL
     OF IT THAT SHOWS IS ROWS 24..36: a sliver of bright daylit ceiling with
     its cans (the ceiling at 2.7 m only enters this frame past 5.7 m -
     Floor ref 6's top edge), the crown, the tops of the uppers, and the
     range hood over the island. The rest shows through the island's gap.

     AT ITS REAL SIZE, AND WITH ITS REAL COUNT OF DOORS. At 5.96 m a metre
     of wall is 44 px, so the kitchen's back wall in Table ref 4 is about
     300 px of this tile, and the first cut packed sixteen metres of
     cabinet doors into it - the owner counted, and he was right. Left to
     right as Table ref 4 and Ceiling ref 6 have it: the tall pantry (two
     tall doors), the FRIDGE standing in front of the wall (Floor ref 6,
     its photographs from Table ref 2), window B, three glass uppers and a
     plain one with the hood's chimney in front of them, window A (the
     big shutters), one more upper, the back counter's base run under all
     of it (four doors, a sink pair and a drawer stack), the doorway to the
     hall with the coats on their hooks; and then the living side of the
     room the rest of the way round - plain wall, its skirting, the cork
     board of photographs (Table ref 1) and a tall plant on the floor - so
     the kitchen comes round once every 4800 px of world, 27 to 43
     seconds, and is never wallpaper.

     The rows, off the camera (D 596 for the wall): the ceiling 24..28, the
     crown 29..31, the uppers 31..79, the windows 49..97, the splash
     80..107, the counter 108, the base cabinets 110..142, the toe-kick and
     the skirting 143..147. The fridge (D 323) 73 px wide, rows 24..149,
     its handles 36..68, the freezer line 92. The hood (D 382): a 17 px
     chimney to row 27, a 62 px glass canopy 27..36. */
  var FAR_W = 720, FAR_H = 127, FAR_Y = 24, FAR_P = 0.15;

  function bakeFar() {
    var t = makeCanvas(FAR_W, FAR_H), c = t.ctx;
    var r = mulberry32(4411), i, k, x, y;
    function Y(sy) { return sy - FAR_Y; }
    var UP_T = Y(31), UP_B = Y(80), CTR = Y(108), BASE_B = Y(143), FL = Y(148);
    var K0 = 113, K1 = 315;            /* the back counter's run */

    fill(c, P.farWall, 0, 0, FAR_W, FAR_H);

    /* -- THE CEILING SLIVER: the house's plaster under the afternoon,
       capped (a white chair leg crosses it), with two recessed cans - one
       over the kitchen, one over the living side - each with a soft halo */
    fill(c, P.ceilDay, 0, 0, FAR_W, Y(29));
    fill(c, P.ceilBright, 0, Y(28), FAR_W, 1);
    [205, 560].forEach(function (cn) {
      for (y = 0; y < Y(29); y++) {
        for (x = cn - 9; x < cn + 13; x++) {
          var hd = Math.sqrt(Math.pow((x - cn - 2) / 10, 2) + Math.pow((y - Y(26)) / 4, 2));
          if (hd < 1) { c.fillStyle = rgba('#fffbea', 0.45 * (1 - ease(hd))); c.fillRect(x, y, 1, 1); }
        }
      }
      fill(c, H.plasterShade, cn - 1, Y(26), 6, 2);
      fill(c, H.lampCore, cn, Y(26), 4, 1);
      fill(c, '#fff3cf', cn, Y(27), 4, 1);
    });

    /* -- THE CROWN round the whole room */
    fill(c, H.cabinetLit, 0, Y(29), FAR_W, 1);
    fill(c, H.cabinet, 0, Y(30), FAR_W, 1);
    fill(c, H.cabinetShade, 0, Y(31), FAR_W, 1);

    /* -- THE SPLASH behind the back counter, the counter, its base run */
    for (y = UP_B; y < CTR; y++) {
      var course = Math.floor((y - UP_B) / 3), ry = (y - UP_B) % 3;
      for (x = K0; x < K1; x++) {
        var bx = x + ((course & 1) ? 2 : 0);
        c.fillStyle = (ry === 2 || bx % 5 === 4) ? P.grout : H.tile;
        c.fillRect(x, y, 1, 1);
      }
    }
    shadeRows(c, H.void, K0, UP_B, K1 - K0, 3, 0.22, true);
    fill(c, H.cabinetLit, K0, CTR, K1 - K0, 1);
    fill(c, H.cabinetShade, K0, CTR + 1, K1 - K0, 1);
    /* the base run, 25 px a unit (55 cm): door door, the sink pair under
       window A, door door, the drawer stack */
    var UNITS = ['d', 'd', 'd', 'd', 's', 'd', 'd', 'k'];
    for (i = 0; i < UNITS.length; i++) {
      x = K0 + 2 + i * 25;
      fill(c, H.cabinetDeep, x, CTR + 2, 1, BASE_B - CTR - 2);
      fill(c, H.cabinet, x + 1, CTR + 2, 24, BASE_B - CTR - 2);
      fill(c, H.cabinetLit, x + 1, CTR + 2, 1, BASE_B - CTR - 2);
      if (UNITS[i] === 'k') {
        for (k = 0; k < 3; k++) {
          fill(c, H.cabinetShade, x + 3, CTR + 4 + k * 11, 20, 8);
          fill(c, H.cabinetDeep, x + 1, CTR + 13 + k * 11, 24, 1);
          fill(c, H.steelShade, x + 10, CTR + 7 + k * 11, 6, 1);
        }
      } else {
        fill(c, H.cabinetShade, x + 3, CTR + 4, 20, 6);              /* a drawer front */
        fill(c, H.cabinetDeep, x + 1, CTR + 11, 24, 1);
        fill(c, H.cabinetShade, x + 3, CTR + 14, 20, BASE_B - CTR - 17);
        fill(c, H.steelShade, x + 11, CTR + 6, 4, 1);
        fill(c, H.steelShade, (i % 2) ? x + 3 : x + 21, CTR + 18, 1, 5);
      }
    }
    shadeRows(c, H.void, K0, CTR + 2, K1 - K0, 4, 0.22, true);
    /* the toe-kick under the kitchen, the skirting round the rest */
    fill(c, H.cabinetDeep, 0, BASE_B, K1, FL - BASE_B);
    fill(c, H.cabinetLit, K1, Y(144), FAR_W - K1, 1);
    fill(c, H.cabinet, K1, Y(145), FAR_W - K1, 2);
    fill(c, H.outline, 0, FL - 1, FAR_W, 1);

    /* -- THE PANTRY at the left: two tall doors to the crown */
    for (i = 0; i < 2; i++) {
      x = i * 20;
      fill(c, H.cabinetDeep, x, UP_T, 1, BASE_B - UP_T);
      fill(c, H.cabinet, x + 1, UP_T, 19, BASE_B - UP_T);
      fill(c, H.cabinetLit, x + 1, UP_T, 1, BASE_B - UP_T);
      fill(c, H.cabinetShade, x + 4, UP_T + 4, 13, Y(84) - UP_T - 6);
      fill(c, H.cabinetShade, x + 4, Y(86), 13, BASE_B - Y(86) - 4);
      fill(c, H.cabinetDeep, x + 4, UP_T + 4, 13, 1);
      fill(c, H.steelShade, i ? x + 3 : x + 16, Y(70), 1, 12);
    }

    /* -- THE UPPERS: three glass and one plain over the hood's stretch,
       one plain past window A - 20 px (45 cm) a door */
    function upper(x0, glass) {
      fill(c, H.cabinetDeep, x0, UP_T, 1, UP_B - UP_T);
      fill(c, H.cabinet, x0 + 1, UP_T, 19, UP_B - UP_T);
      fill(c, H.cabinetLit, x0 + 1, UP_T, 1, UP_B - UP_T);
      fill(c, glass ? H.tileShade : H.cabinetShade, x0 + 3, UP_T + 3, 15, UP_B - UP_T - 6);
      if (glass) {
        fill(c, H.cabinetLit, x0 + 3, UP_T + 16, 15, 1);
        fill(c, H.cabinetLit, x0 + 3, UP_T + 31, 15, 1);
        fill(c, H.paint, x0 + 5, UP_T + 13, 4, 3);
        fill(c, H.paint, x0 + 12, UP_T + 28, 3, 3);
        fill(c, H.paint, x0 + 6, UP_T + 41, 6, 2);
        fill(c, H.steelLit, x0 + 4, UP_T + 8, 1, 3);
        fill(c, H.steelLit, x0 + 5, UP_T + 6, 1, 2);
      }
      fill(c, H.cabinetDeep, x0 + 3, UP_T + 3, 15, 1);
      fill(c, H.cabinetLit, x0 + 17, UP_T + 4, 1, UP_B - UP_T - 7);
      fill(c, H.steelShade, x0 + (glass ? 16 : 4), UP_B - 9, 1, 4);
    }
    upper(153, true); upper(173, true); upper(193, true); upper(213, false);
    upper(295, false);
    fill(c, H.outline, 153, UP_B - 1, 80, 1);
    fill(c, H.outline, 295, UP_B - 1, 20, 1);

    /* -- THE TWO WINDOWS with their shutters (Table ref 4, Floor ref 4):
       a white frame, louvres open to the afternoon, a tilt rod, a sill -
       and the light each throws on the wall round it */
    function shutters(wx, ww) {
      var wy = Y(49), wh = Y(97) - Y(49);
      for (y = Math.max(0, wy - 30); y < CTR; y++) {
        for (x = wx - 40; x < wx + ww + 40; x++) {
          var bdx = (x - (wx + ww / 2)) / (ww / 2 + 40), bdy = (y - (wy + wh - 8)) / 44;
          var bd = Math.sqrt(bdx * bdx + bdy * bdy);
          if (bd >= 1) continue;
          c.fillStyle = rgba('#fff4dc', 0.16 * (1 - ease(bd)));
          c.fillRect(x, y, 1, 1);
        }
      }
      fill(c, H.outline, wx - 1, wy - 1, ww + 2, wh + 2);
      fill(c, H.paint, wx, wy, ww, wh);
      for (k = 0; k * 4 < wh - 6; k++) {
        y = wy + 3 + k * 4;
        fill(c, H.paintShade, wx + 3, y, ww - 6, 1);
        fill(c, H.daylight, wx + 3, y + 1, ww - 6, 2);
        fill(c, H.paint, wx + 3, y + 3, ww - 6, 1);
      }
      fill(c, H.paintShade, wx + Math.round(ww / 2) - 1, wy + 3, 2, wh - 6);
      fill(c, P.paintHi, wx - 2, wy + wh + 1, ww + 4, 1);
      fill(c, H.outline, wx - 2, wy + wh + 2, ww + 4, 1);
    }
    shutters(116, 34);
    shutters(236, 56);

    /* -- the back counter's things: the monstera under window B (Table ref
       4), the coffee maker and kettle, a rack by the sink */
    [[-9, -24, 9], [-2, -30, 10], [6, -26, 9], [12, -20, 8], [-12, -15, 8], [3, -18, 8]].forEach(function (lf) {
      var lx = 133 + lf[0], ly = CTR + lf[1], lw = lf[2];
      fill(c, H.leafDeep, lx - 1, ly, lw + 2, 6);
      fill(c, H.leaf, lx, ly, lw, 5);
      fill(c, H.leafLit, lx, ly, Math.ceil(lw / 2), 2);
      fill(c, H.leafDeep, lx + Math.floor(lw / 2), ly + 1, 1, 4);
    });
    fill(c, H.outline, 128, CTR - 8, 11, 8);
    fill(c, H.cabinetLit, 129, CTR - 7, 9, 7);
    fill(c, H.outline, 182, CTR - 9, 10, 9);
    fill(c, H.steelDeep, 183, CTR - 8, 8, 8);
    fill(c, H.steel, 183, CTR - 8, 8, 1);
    fill(c, P.hotSauce, 189, CTR - 6, 1, 1);
    fill(c, H.outline, 195, CTR - 5, 7, 5);
    fill(c, H.steel, 196, CTR - 4, 5, 4);
    fill(c, H.steelLit, 196, CTR - 4, 1, 3);
    fill(c, H.walnutLit, 275, CTR - 6, 10, 1);
    fill(c, H.walnutLit, 277, CTR - 9, 1, 4); fill(c, H.walnutLit, 282, CTR - 9, 1, 4);

    /* -- THE DOORWAY to the hall: a white casing, the dim hall, the coats
       on their hooks (Table ref 4, right) */
    var DX = 330, DW = 40, DT = Y(58);
    fill(c, H.outline, DX - 3, DT - 3, DW + 6, FL - DT + 2);
    fill(c, H.cabinetLit, DX - 2, DT - 2, DW + 4, FL - DT);
    fill(c, '#57514a', DX, DT, DW, FL - DT - 1);
    fill(c, '#6b645a', DX, DT, DW, 4);
    fill(c, H.cabinetShade, DX + DW - 2, DT, 2, FL - DT - 1);
    [[DX + 6, '#2c2a2e', 12, 34], [DX + 15, '#3d4552', 11, 30], [DX + 24, '#5a4e45', 10, 26]].forEach(function (co) {
      fill(c, H.outline, co[0] - 1, DT + 8, co[2] + 2, co[3] + 1);
      fill(c, co[1], co[0], DT + 9, co[2], co[3]);
      fill(c, '#77706a', co[0] + 1, DT + 9, 2, co[3] - 4);
    });
    fill(c, H.steelShade, DX + 4, DT + 7, DW - 8, 1);

    /* -- THE LIVING SIDE: wall the rest of the way round, the cork board
       of photographs (Table ref 1), the shuttered window over there (Floor
       ref 4, top right), a tall plant standing on the floor */
    var CB = 396;
    shutters(510, 62);                     /* the living side's window (Floor ref 4) */
    fill(c, H.outline, CB - 1, Y(58), 66, Y(102) - Y(58) + 2);
    fill(c, '#b8956a', CB, Y(59), 64, Y(102) - Y(59));
    for (i = 0; i < 22; i++) {
      var px0 = CB + 2 + Math.floor(r() * 56), py0 = Y(60) + Math.floor(r() * 34);
      var pc = [P.photoWhite, P.magnetYellow, P.photoSkin, P.magnetBlue, P.photoDark, P.magnetPink][i % 6];
      fill(c, pc, px0, py0, 5 + (i % 3), 4 + (i % 2) * 2);
    }
    var PLX = 640;
    fill(c, H.outline, PLX - 9, Y(128), 19, Y(147) - Y(128));
    fill(c, H.cabinetLit, PLX - 8, Y(129), 17, Y(146) - Y(129));
    fill(c, H.cabinetShade, PLX + 4, Y(129), 5, Y(146) - Y(129));
    for (i = 0; i < 16; i++) {
      var la = -1.4 + (i / 15) * 2.8, ll = 14 + (i % 4) * 5;
      var lx2 = PLX + Math.round(Math.sin(la) * ll), ly2 = Y(128) - Math.round(Math.cos(la) * ll) - 4;
      fill(c, H.leafDeep, lx2 - 3, ly2, 8, 4);
      fill(c, (i % 3) ? H.leaf : H.leafLit, lx2 - 2, ly2, 6, 3);
    }
    for (i = 0; i < 4; i++) fill(c, H.leafDeep, PLX - 3 + i * 2, Y(112), 1, 16);

    /* -- THE HOOD over the island: the steel chimney down from the
       ceiling, the top of its curved glass canopy, in front of the uppers */
    var HX = 200;
    fill(c, H.outline, HX - 9, 0, 19, Y(28));
    fill(c, H.steel, HX - 8, 0, 17, Y(28));
    fill(c, H.steelLit, HX - 8, 0, 3, Y(28));
    fill(c, H.steelShade, HX + 6, 0, 3, Y(28));
    for (y = Y(27); y <= Y(36); y++) {
      var gw = Math.round(22 + 9 * Math.sqrt((y - Y(27)) / 9));
      fill(c, H.outline, HX - gw - 1, y, gw * 2 + 2, 1);
      fill(c, P.hoodGlass, HX - gw, y, gw * 2, 1);
      fill(c, P.hoodGlassLit, HX - gw, y, 3, 1);
    }
    fill(c, H.steelLit, HX - 22, Y(27), 44, 1);

    /* -- THE FRIDGE (Floor ref 6), steel, French doors over the freezer
       drawer, standing in front of the pantry's end on the floor */
    var FX = 40, FW = 73, FT = 0, FB = Y(150);
    fill(c, H.outline, FX - 1, FT, FW + 2, FB - FT);
    fill(c, H.steel, FX, FT, FW, FB - FT - 1);
    for (i = 0; i < 16; i++) {
      fill(c, r() < 0.5 ? H.steelLit : H.steelShade, FX + 2 + Math.floor(r() * (FW - 26)),
           FT + 2 + Math.floor(r() * (FB - FT - 8)), 6 + Math.floor(r() * 18), 1);
    }
    fill(c, H.steelLit, FX, FT, 2, FB - FT - 1);
    fill(c, H.steelShade, FX + FW - 2, FT, 2, FB - FT - 1);
    fill(c, H.steelDeep, FX + 36, FT, 1, Y(92) - FT);
    fill(c, H.steelDeep, FX, Y(92), FW, 1);
    fill(c, H.steelLit, FX, Y(93), FW, 1);
    [FX + 31, FX + 39].forEach(function (hx) {
      fill(c, H.outline, hx - 1, Y(36), 5, Y(68) - Y(36));
      fill(c, H.steelLit, hx, Y(36), 3, Y(68) - Y(36));
      fill(c, H.steelShade, hx + 2, Y(36), 1, Y(68) - Y(36));
    });
    fill(c, H.outline, FX + 20, Y(99), 34, 4);
    fill(c, H.steelLit, FX + 21, Y(100), 32, 2);
    fill(c, H.steelDeep, FX, Y(144), FW, FB - Y(144) - 1);
    var PH = [[3, 30, 7, 9, P.photoWhite, P.photoDark], [11, 28, 8, 6, P.photoWhite, P.photoSkin],
              [21, 32, 6, 8, P.photoWhite, P.photoGrass], [4, 42, 6, 7, P.photoWhite, P.photoSkin],
              [12, 38, 9, 10, P.photoWhite, null], [23, 44, 6, 6, P.magnetYellow, null],
              [5, 52, 8, 6, P.photoWhite, P.photoDark], [15, 51, 6, 8, P.photoWhite, P.photoSkin],
              [24, 54, 5, 5, P.magnetPink, null], [7, 62, 6, 6, P.photoWhite, P.photoGrass],
              [45, 30, 6, 7, P.photoWhite, P.photoSkin], [54, 34, 5, 5, P.magnetBlue, null]];
    for (i = 0; i < PH.length; i++) {
      var p = PH[i];
      fill(c, p[4], FX + p[0], Y(p[1]), p[2], p[3]);
      if (p[5]) fill(c, p[5], FX + p[0] + 1, Y(p[1]) + 1, p[2] - 2, p[3] - 2);
      fill(c, H.steelShade, FX + p[0] + 1, Y(p[1]) + p[3], p[2], 1);
    }
    for (k = 0; k < 3; k++) {
      fill(c, P.magnetGreen, FX + 13, Y(39) + 2 + k, 3 - k, 1);
      fill(c, P.magnetPink, FX + 16 + k, Y(39) + 5 + k, 4 - k, 1);
    }
    fill(c, rgba(H.void, 0.18), FX + FW + 1, FT, 4, FB - FT);

    /* -- AND THE STEP BACK: the far kitchen is in the sun, but nothing
       behind the lane may outshine a white leg, so the crown and the
       uppers' tops over the island sit a quarter under their own colours,
       and what only the gap shows a step further: it is six metres off */
    Tint.rect(c, 0, Y(29), FAR_W, Y(37) - Y(29), H.wallShade, 4);
    Tint.rect(c, 0, Y(37), FAR_W, FAR_H - Y(37), P.farHaze, 5);
    return t;
  }

  /* ========================================================= THE ISLAND

     720 x 116, screen rows 37..152, at 0.30 - the island seen from the
     floor (Floor ref 6, the f6_mid crop): high up, the white quartz nose
     (37..39) on its honey ply edge (39..44), the ply's underside
     foreshortened over the 40 cm overhang (44..60); under it the white
     shaker base in the overhang's shade (60..139) and the dark recessed
     toe-kick (140..149). Two black stools are tucked under the overhang,
     standing on the floor at row 150 (Floor ref 1/6: walnut seat at 76,
     foot ring at 125, splayed legs, one with the chrome glide).

     ITS REAL LENGTH AND ITS REAL DOORS. At 2.5 m a 45 cm door is 47 px,
     and Table ref 4 and ref 1 show the island's dining face as four doors
     and a drawer stack between two plain end panels - 247 px of a 720 px
     tile, so some of it is always on screen, as in Floor ref 6. The rest
     of the tile is the GAP past its ends, transparent but for the
     sneakers kicked off on the floor, where the back wall, the fridge and
     the hall show; at 0.30 the island comes round every 2400 px of world.
     The floor under all of it is THE FLOOR (below); this tile carries only
     the island's own contact shadow and the stools' and shoes'. */
  var ISL_W = 720, ISL_H = 116, ISL_Y = 37, ISL_P = 0.30;
  var IX0 = 100, IX1 = 347;          /* the island, end panel to end panel */

  function bakeIsland() {
    var t = makeCanvas(ISL_W, ISL_H), c = t.ctx;
    var r = mulberry32(5521), i, k, x, y;
    function Y(sy) { return sy - ISL_Y; }
    var OX0 = IX0 - 4, OX1 = IX1 + 4;       /* the counter overhangs its ends a little */

    /* -- THE OVERHANG: the quartz nose, the ply edge, the underside */
    fill(c, H.outline, OX0, Y(37), OX1 - OX0, 1);
    fill(c, H.cabinetLit, OX0, Y(38), OX1 - OX0, 1);
    fill(c, H.cabinetShade, OX0, Y(39), OX1 - OX0, 1);
    fill(c, P.plyLit, OX0, Y(40), OX1 - OX0, 1);
    fill(c, P.ply, OX0, Y(41), OX1 - OX0, 3);
    fill(c, P.plyShade, OX0, Y(44), OX1 - OX0, 1);
    fill(c, H.outline, OX0 - 1, Y(37), 1, Y(45) - Y(37));
    fill(c, H.outline, OX1, Y(37), 1, Y(45) - Y(37));
    fill(c, P.plyUnder, IX0, Y(45), IX1 - IX0, Y(60) - Y(45));
    for (i = 0; i < 26; i++) {
      var gy = Y(45) + Math.floor(Math.pow(r(), 0.7) * (Y(60) - Y(45)));
      var gx = IX0 + Math.floor(r() * (IX1 - IX0 - 20));
      fill(c, r() < 0.45 ? P.plyLit : P.plyShade, gx, gy, Math.min(IX1 - gx, 8 + Math.floor(r() * 26)), 1);
    }
    for (i = 0; i < 10; i++) {
      var gx2 = OX0 + Math.floor(r() * (OX1 - OX0 - 16));
      fill(c, P.plyLit, gx2, Y(41) + Math.floor(r() * 3), 6 + Math.floor(r() * 10), 1);
    }
    shadeRows(c, H.void, IX0, Y(45), IX1 - IX0, Y(60) - Y(45), 0.20, false);
    fill(c, H.cabinetDeep, IX0, Y(60), IX1 - IX0, 1);

    /* -- THE BASE: four shaker doors in two pairs, then the drawer stack */
    var BT = Y(61), BB = Y(140);
    var KIND = ['d', 'd', 'd', 'd', 's'];
    for (i = 0; i < KIND.length; i++) {
      var x0 = IX0 + 6 + i * 47;
      fill(c, P.isleDeep, x0, BT, 1, BB - BT);
      fill(c, P.isleFrame, x0 + 1, BT, 46, BB - BT);
      fill(c, P.isleLit, x0 + 1, BT, 1, BB - BT);
      if (KIND[i] === 's') {
        for (k = 0; k < 3; k++) {
          var dy0 = BT + 2 + k * 26, dh = 24;
          fill(c, P.isleField, x0 + 4, dy0 + 3, 40, dh - 6);
          fill(c, P.isleDeep, x0 + 4, dy0 + 3, 40, 1);
          fill(c, P.isleDeep, x0 + 4, dy0 + 3, 1, dh - 6);
          fill(c, P.isleLit, x0 + 43, dy0 + 4, 1, dh - 7);
          fill(c, P.isleLit, x0 + 5, dy0 + dh - 4, 38, 1);
          fill(c, P.isleDeep, x0 + 1, dy0 + dh, 46, 1);
          fill(c, H.outline, x0 + 16, dy0 + 10, 15, 3);
          fill(c, H.steelLit, x0 + 17, dy0 + 11, 13, 1);
        }
      } else {
        var fx = x0 + 6, fw = 36, fy = BT + 6, fh = BB - BT - 12;
        fill(c, P.isleField, fx, fy, fw, fh);
        fill(c, P.isleDeep, fx, fy, fw, 1);
        fill(c, P.isleDeep, fx, fy, 1, fh);
        fill(c, P.isleLit, fx + fw - 1, fy + 1, 1, fh - 1);
        fill(c, P.isleLit, fx + 1, fy + fh - 1, fw - 1, 1);
        var px = (i % 2 === 0) ? x0 + 43 : x0 + 3;          /* pulls where a pair meets */
        fill(c, H.outline, px - 1, BT + 14, 3, 9);
        fill(c, H.steelLit, px, BT + 15, 1, 7);
      }
    }
    shadeRows(c, H.walnutDeep, IX0 + 6, BT, IX1 - IX0 - 12, 16, 0.30, true);

    /* -- THE TOE-KICK, recessed and dark, between the end panels */
    fill(c, P.toeKick, IX0 + 6, BB, IX1 - IX0 - 12, Y(149) - BB);
    fill(c, P.isleDeep, IX0 + 6, BB, IX1 - IX0 - 12, 1);
    /* -- THE TWO END PANELS: plain white sides down to the floor */
    [IX0, IX1 - 6].forEach(function (ex) {
      fill(c, H.outline, ex, Y(45), 6, Y(149) - Y(45));
      fill(c, P.isleFrame, ex + 1, Y(45), 4, Y(149) - Y(45));
      fill(c, P.isleLit, ex + 1, Y(45), 1, Y(149) - Y(45));
    });
    fill(c, H.outline, IX0, Y(149), IX1 - IX0, 1);
    /* its contact shadow on the floor */
    fill(c, rgba(H.void, 0.30), IX0 - 2, Y(150), IX1 - IX0 + 4, 1);
    fill(c, rgba(H.void, 0.14), IX0 - 4, Y(151), IX1 - IX0 + 8, 1);

    /* -- TWO STOOLS tucked under the overhang (Floor ref 1, 6): a walnut
       seat 40 wide, the black frame and the threaded spindle under it,
       four splayed legs to the floor, the foot ring. The far pair of legs
       first, in the dark; the near pair over the ring. */
    function stool(cx, glide) {
      var ST = Y(76), HUB = Y(83), RING = Y(125), FT = Y(150);
      legLine(c, P.ironDeep, cx - 3, HUB, cx - 13, FT - 3, 2);
      legLine(c, P.ironDeep, cx + 2, HUB, cx + 12, FT - 3, 2);
      fill(c, P.ironDeep, cx - 15, RING - 1, 30, 1);
      fill(c, P.ironDeep, cx - 17, RING, 2, 1);
      fill(c, P.ironDeep, cx + 15, RING, 2, 1);
      fill(c, H.outline, cx - 2, HUB, 4, Y(108) - HUB);
      for (y = HUB; y < Y(108); y++) fill(c, (y & 1) ? H.iron : H.ironLit, cx - 1, y, 2, 1);
      legLine(c, H.outline, cx - 6, HUB, cx - 23, FT - 1, 4);
      legLine(c, H.outline, cx + 3, HUB, cx + 20, FT - 1, 4);
      legLine(c, H.iron, cx - 5, HUB, cx - 22, FT - 1, 2);
      legLine(c, H.iron, cx + 4, HUB, cx + 21, FT - 1, 2);
      legLine(c, '#5e5955', cx - 5, HUB, cx - 22, FT - 1, 1);
      fill(c, H.outline, cx - 19, RING, 38, 3);
      fill(c, H.ironLit, cx - 18, RING + 1, 36, 1);
      fill(c, H.outline, cx - 10, Y(80), 20, 4);
      fill(c, H.iron, cx - 9, Y(81), 18, 2);
      fill(c, H.outline, cx - 21, ST - 1, 42, 6);
      fill(c, H.walnutLit, cx - 20, ST, 40, 1);
      fill(c, H.walnut, cx - 20, ST + 1, 40, 2);
      fill(c, H.walnutDeep, cx - 19, ST + 3, 38, 1);
      fill(c, H.walnutHi, cx - 18, ST, 7, 2);
      fill(c, H.outline, cx - 25, FT - 1, 6, 2);
      fill(c, H.outline, cx + 18, FT - 1, 6, 2);
      if (glide) { fill(c, H.steelLit, cx + 19, FT - 4, 2, 3); fill(c, H.steelShade, cx + 20, FT - 4, 1, 3); }
      fill(c, rgba(H.void, 0.24), cx - 26, FT, 52, 1);
    }
    stool(IX0 + 66, false);
    stool(IX0 + 180, true);

    /* -- THE SNEAKERS in the gap, kicked off on the floor (Floor ref 1) */
    var SHOE = [
      '.UUU..............',
      'UUUUUl............',
      'LUUUUUUl..........',
      'LUUUUUUUUUl.......',
      'LUUUUUUUUUUUUUUU..',
      'WWWWWWWWWWWWWWWWWW',
      '.KKKKKKKKKKKKKKKK.'
    ];
    var SOLE = [
      '...UUUUUUU......',
      '.WWWWWWWWWWWWW..',
      'WWKWWKWWKWWKWWW.',
      '.WWWWWWWWWWWWWW.',
      '..WWWWWWWWWWWW..'
    ];
    var SHOE_INK = { U: P.sneaker, L: P.sneakerLit, l: P.sneakerSole, W: P.sneakerSole, K: P.sneakerDark };
    c.drawImage(bakeGrid(SHOE, SHOE_INK, 20, 9).canvas, 420, Y(142));
    c.drawImage(bakeGrid(SOLE, SHOE_INK, 18, 7).canvas, 440, Y(144));
    fill(c, rgba(H.void, 0.22), 419, Y(150), 40, 1);
    return t;
  }

  /* ====================================================== THE FAR CHAIR

     720 x 137, screen rows 24..160, at 0.48: one white X-back chair
     (Floor ref 6 left, ref 5) pushed in at the far side of the table, seen
     from four centimetres off the floor. Its front legs are 1.0 m off and
     its back 1.54 m, so it is drawn by the camera: the seat's front edge
     and rail 110 wide at rows 39..57, the honey underside with its maker's
     label narrowing to the rear rail (73 wide, rows 74..87) with the oval
     dowel pockets and the zinc bracket of Floor ref 6's top-right corner,
     four tapered legs - front 13 px to their glides on row 156, rear 9 px
     to row 153 - and over the seat's front edge the X-back's two stiles and
     the bottom of the X rising into the table's shadow.

     IT IS NOT A PILLAR and must not read as one: a whole chair, seat and
     rails and four thin legs, one per 720, in the table's shade (the house
     paint's shade, not its lit white), its feet on the floor at rows 153
     and 156 with their contact shadows in its own tile, so they slide
     over the floor with it and never off it. */
  var CHR_W = 720, CHR_H = 134, CHR_Y = 24, CHR_P = 0.48;

  function bakeChairFar() {
    var t = makeCanvas(CHR_W, CHR_H), c = t.ctx;
    var r = mulberry32(5809), i, y, k;
    function Y(sy) { return sy - CHR_Y; }

    var CX = 575;                    /* the chair's centre in the tile */
    /* contact shadows under its four feet */
    [[CX - 52, Y(156)], [CX + 44, Y(156)], [CX - 37, Y(153)], [CX + 30, Y(153)]].forEach(function (f) {
      fill(c, rgba(H.void, 0.22), f[0] - 2, f[1], 12, 1);
    });

    /* a leg, tapering from w0 at row y0 to w1 at the foot row y1, its left
       edge from x0 to x1, lit on its left face */
    function leg(x0, x1, y0, y1, w0, w1, body, lit, deep) {
      for (var yy = y0; yy < y1; yy++) {
        var k2 = (yy - y0) / Math.max(1, y1 - y0);
        var xx = Math.round(x0 + (x1 - x0) * k2), ww = Math.round(w0 + (w1 - w0) * k2);
        fill(c, H.outline, xx - 1, yy, ww + 2, 1);
        fill(c, body, xx, yy, ww, 1);
        fill(c, lit, xx, yy, Math.max(1, Math.round(ww * 0.3)), 1);
        fill(c, deep, xx + ww - 1, yy, 1, 1);
      }
      fill(c, H.outline, x1 - 1, y1, w1 + 2, 1);
      fill(c, P.glide, x1, y1 - 1, w1, 1);
    }
    /* the rear legs, further and a shade darker */
    leg(CX - 36, CX - 37, Y(87), Y(153), 9, 6, P.chairBody, H.paintShade, H.paintDeep);
    leg(CX + 27, CX + 30, Y(87), Y(153), 9, 6, P.chairBody, H.paintShade, H.paintDeep);

    /* the stiles and the bottom of the X, over the seat's front edge */
    fill(c, H.outline, CX - 38, 0, 9, Y(40));
    fill(c, P.chairBody, CX - 37, 0, 7, Y(40));
    fill(c, H.paintShade, CX - 37, 0, 2, Y(40));
    fill(c, H.outline, CX + 29, 0, 9, Y(40));
    fill(c, P.chairBody, CX + 30, 0, 7, Y(40));
    fill(c, H.paintShade, CX + 30, 0, 2, Y(40));
    /* THE X: two solid painted slats (Floor ref 6, left), each about as
       wide as a leg's foot, running from the top of one stile (behind the
       lid, at screen row 13) to the foot of the other (behind the seat, at
       row 61) and crossing at row 37 - so from this low eye what shows is
       the crossing and the two upper arms opening toward the lid. Lit on
       their left faces like the legs, the second laid over the first where
       they lap. The first cut drew them four pixels wide on a 2.4px step,
       and with a body the value of the doors behind them only their
       outlines showed: a wire net. */
    function slat(x0, dir) {
      for (var yy = 0; yy <= Y(40); yy++) {
        var cx2 = Math.round(x0 + dir * (yy - Y(13)) * (68 / 48));
        fill(c, H.outline, cx2 - 6, yy, 13, 1);
        fill(c, P.chairBody, cx2 - 5, yy, 11, 1);
        fill(c, H.paintShade, cx2 - 5, yy, 2, 1);
        fill(c, H.paintDeep, cx2 + 4, yy, 2, 1);
      }
    }
    slat(CX - 34, 1);
    slat(CX + 34, -1);

    /* the seat's underside: the honey board between the rails, narrowing
       from the front rail to the rear one, the maker's label, the side
       rails' inner faces in the white paint */
    for (y = Y(57); y < Y(87); y++) {
      var kk = (y - Y(57)) / (Y(74) - Y(57));
      if (kk > 1) kk = 1;
      var half = Math.round(55 - 18 * kk);
      fill(c, H.outline, CX - half - 1, y, half * 2 + 2, 1);
      if (y < Y(74)) {
        fill(c, P.plyUnder, CX - half + 5, y, half * 2 - 10, 1);
        fill(c, P.chairBody, CX - half, y, 5, 1);
        fill(c, H.paintDeep, CX + half - 5, y, 5, 1);
      } else {
        /* the rear rail's inner face */
        fill(c, P.chairBody, CX - half, y, half * 2, 1);
      }
    }
    shadeRows(c, H.void, CX - 50, Y(57), 100, 6, 0.25, true);
    fill(c, P.photoWhite, CX + 8, Y(62), 9, 4);                     /* the label */
    fill(c, P.photoDark, CX + 10, Y(63), 5, 1);
    fill(c, P.photoDark, CX + 9, Y(64), 3, 1);
    fill(c, H.paintDeep, CX - 37, Y(74), 74, 1);
    fill(c, H.outline, CX - 37, Y(87), 74, 1);
    /* the dowel pockets in the rear rail and the corner bracket */
    [CX - 22, CX + 12].forEach(function (dx) {
      fill(c, P.plyShade, dx, Y(79), 10, 4);
      fill(c, H.walnutDeep, dx + 1, Y(80), 8, 2);
      fill(c, H.steelShade, dx + 6, Y(80), 2, 2);
    });
    fill(c, H.outline, CX + 23, Y(75), 7, 6);
    fill(c, H.steelLit, CX + 24, Y(76), 5, 4);
    fill(c, H.steelDeep, CX + 26, Y(78), 1, 1);

    /* the front legs, nearest, over the underside's corners */
    leg(CX - 55, CX - 54, Y(57), Y(156), 13, 9, P.chairBody, H.paintShade, H.paintDeep);
    leg(CX + 42, CX + 45, Y(57), Y(156), 13, 9, P.chairBody, H.paintShade, H.paintDeep);

    /* the seat's front edge and front rail: the rounded nosing catching
       the light, the rail's face, its underside dark */
    fill(c, H.outline, CX - 56, Y(39), 112, Y(57) - Y(39) + 1);
    fill(c, H.paintShade, CX - 55, Y(40), 110, 2);
    fill(c, P.chairBody, CX - 55, Y(42), 110, 3);
    fill(c, H.paintDeep, CX - 55, Y(45), 110, 1);
    fill(c, H.outline, CX - 55, Y(46), 110, 1);
    fill(c, P.chairBody, CX - 53, Y(47), 106, Y(56) - Y(47));
    fill(c, H.paintShade, CX - 53, Y(47), 106, 1);
    fill(c, H.paintDeep, CX - 53, Y(55), 106, 1);
    fill(c, H.paint, CX - 55, Y(40), 30, 1);
    for (i = 0; i < 4; i++) fill(c, H.paintDeep, CX - 40 + Math.floor(r() * 80), Y(49) + Math.floor(r() * 5), 2 + Math.floor(r() * 3), 1);
    return t;
  }

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


  /* ========================================================== THE FLOOR

     ONE FLOOR, ITS BOARDS RUNNING INTO THE ROOM (Floor ref 6). The lens
     looks along the boards, so their seams are lines that fan out from the
     vanishing point toward you - narrow and crowded by the island, a
     third of the screen wide at your feet - and the grain runs with them.
     Two cuts got this wrong in opposite directions: boards seen side-on in
     strips that stepped back like layers, then a smooth plane with no
     wood in it at all. This is the photograph: one continuous oak floor,
     in perspective, from the toe-kicks to the bottom of the screen.

     HOW IT IS DRAWN. A top-down oak floor is baked once as a texture -
     boards 14 cm wide running along the depth, each with its cathedral
     grain, an end joint somewhere along it, the odd knot - and every
     screen row from 154 down samples it at that row's depth: the row's
     width in centimetres is 480 * D / FOC, centred on the vanishing point
     at x 240. One drawImage per row. The texture is baked at four
     densities (2, 4, 8 and 16 texels a centimetre) and each row reads the
     one that puts one to two screen pixels on a texel, so nothing is ever
     minified into noise and nothing magnified into blocks: the far rows
     are soft and quiet (their grain is baked faint), the near rows carry
     the grain at full strength.

     HOW IT MOVES, AND WHY NOT BY THE PARALLAX LAW. A fan of seams stays a
     fan only if every row slides by the SAME distance in centimetres -
     the lens moving sideways over the floor - which on screen is T * FOC
     / D pixels: fast near, slow far, and zero at the horizon. Any other
     per-row speed shears the fan, and the shear grows with the run: slide
     each row at the law's own p(D) and by a minute in the seams near the
     island have wound round into hatching, and the rows nearer than 45 cm
     (the law's p is 1 for all of them) swing their vanishing point off the
     side of the screen. So the boards move in true perspective, tied to
     the play plane: the lens moves T = scroll * D_PLAY / FOC cm, where
     D_PLAY is the kill row's depth (10.9 cm), so row 242 slides at exactly
     the pillars' speed and every row above it proportionally slower -
     row 200 at 0.56, row 170 at 0.25. Each row's shift is rounded to whole
     pixels, so a row only ever translates and never re-samples: nothing
     boils.

     WHERE THE FURNITURE STANDS. The island, its stools and the far chair
     keep the room model's parallax (0.30, 0.48), and their feet stand on
     rows 150..156, which is the far floor in the window's sheen: there
     the static light below washes the boards out completely (by 1.5 m a
     board is seven pixels and the photograph shows it as a bright haze),
     so a foot never visibly skates over a seam. The boards come up out of
     the sheen from row 158 and are full strength by 176.

     THE LIGHT is a static sheet over the boards, because light belongs to
     the room and not to the wood: the sheen by the toe-kicks easing into
     the table's shade toward you. THE ACTUAL GROUND - the band, 242..269,
     the same boards on the same mapping, wider still - lies under a
     lighter shade than the floor just beyond it, and between them at 242
     a hard dark seam with the board's lit arris under it: the one
     horizontal line in the floor, and the kill line. */
  function hexRGB(h) { var n = parseInt(h.slice(1), 16); return [n >> 16 & 255, n >> 8 & 255, n & 255]; }
  function mixRGB(a, b, k) { return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k]; }
  function css(c3) { return 'rgb(' + Math.round(c3[0]) + ',' + Math.round(c3[1]) + ',' + Math.round(c3[2]) + ')'; }

  var VPX = 240;                                  /* the vanishing point's column */
  var D_PLAY = FOC * EYE / (FLOOR - Y_H);         /* 10.9 cm: the kill row's depth */
  var BOARD_CM = 14, PERIOD_CM = 112;             /* eight boards, then it repeats */
  var OAK_R0 = 154;                               /* the first row with boards in it */
  function depthAt(r) { return FOC * EYE / (r + 0.5 - Y_H); }

  /* the four densities and the rows that read each: one to two screen
     pixels a texel. `g` is how strong the grain is baked at that density
     (quiet far off), `ss` the supersampling a coarse level needs so a 2mm
     seam averages into its texel instead of flickering in and out */
  var LODS = [
    { k: 2,  r0: OAK_R0, r1: 162, g: 0.18, s: 0.55, ss: 3 },
    { k: 4,  r0: 162, r1: 178, g: 0.40, s: 0.85, ss: 2 },
    { k: 8,  r0: 178, r1: 210, g: 0.80, s: 1.00, ss: 1 },
    { k: 16, r0: 210, r1: VH,  g: 1.00, s: 1.00, ss: 1 }
  ];

  /* The oak at a point of the floor, x across the room and z away from
     the lens, in cm: [r, g, b]. */
  var OAK_A = null, OAK_B, OAK_GR, OAK_SM, OAK_LIP, OAK_KN, OAK_KR;
  function oakAt(x, z, L) {
    x = wrap(x, PERIOD_CM);
    var b = Math.floor(x / BOARD_CM), u = x - b * BOARD_CM;
    var hb = hash(b * 7919 + 13);
    /* one end joint per board somewhere in view, staggered */
    var zj = 16 + (hb % 101), seg = z < zj ? 0 : 1;
    var hs = hash(b * 131 + seg * 977 + 5);
    var col = mixRGB(OAK_A, OAK_B, ((hs >>> 3) % 100) / 160);
    /* the cathedral: contour lines of the distance from the board's
       heart, pushed out round a flame somewhere along it, wobbling gently */
    var uc = 4.5 + ((hs >>> 9) % 50) / 10;
    var zf = 10 + ((hs >>> 15) % 140), zl = 18 + ((hs >>> 21) % 30);
    var F = Math.abs(u - uc) - 3.2 * Math.exp(-((z - zf) / zl) * ((z - zf) / zl)) + 0.35 * Math.sin(z * 0.06 + b * 1.7);
    /* lines 1.3 cm apart, each its own strength and some missing, so it
       is grain and not corrugation */
    var gn = Math.floor(F / 1.3), fr = F / 1.3 - gn;
    var gs = (hash(gn * 31 + b * 977 + seg * 7) % 100) / 100;
    if (gs > 0.3 && fr < 0.17) col = mixRGB(col, OAK_GR, L.g * gs * (1 - fr / 0.17));
    /* the odd knot (Floor ref 1), one board in three */
    if (hs % 3 === 0) {
      var kx = (u - (3 + (hs >>> 5) % 8)) / 0.9, kz = (z - (12 + (hs >>> 11) % 110)) / 1.6;
      var kd = Math.sqrt(kx * kx + kz * kz);
      if (kd < 1) col = mixRGB(col, OAK_KN, L.g);
      else if (kd < 1.5) col = mixRGB(col, OAK_KR, L.g * 0.7);
    }
    /* the end joint, across the board. (The long seams between boards
       are NOT in the texture: drawn row by row from a texture a line that
       runs steeply across the rows breaks into dashes, so drawSeams lays
       them as lines - see there.) */
    if (Math.abs(z - zj) < 0.18 && u > 0.3 && u < BOARD_CM - 0.3) col = mixRGB(col, OAK_SM, L.s * 0.8);
    if (Math.abs(z - zj - 0.3) < 0.12 && u > 0.3 && u < BOARD_CM - 0.3) col = mixRGB(col, OAK_LIP, L.s * 0.5);
    return col;
  }

  function bakeOakLevel(L) {
    var dmax = depthAt(L.r0), dmin = depthAt(L.r1 - 1);
    var win = Math.ceil(VW * dmax / FOC * L.k) + 2;
    var W = PERIOD_CM * L.k + win, Hh = Math.ceil((dmax - dmin) * L.k) + 2;
    var t = makeCanvas(W, Hh), img = t.ctx.createImageData(W, Hh), d = img.data;
    var i, j, a, b2, n = L.ss * L.ss;
    for (j = 0; j < Hh; j++) {
      for (i = 0; i < W; i++) {
        var sr = 0, sg = 0, sb = 0;
        for (a = 0; a < L.ss; a++) {
          for (b2 = 0; b2 < L.ss; b2++) {
            var c3 = oakAt((i + (a + 0.5) / L.ss) / L.k, dmin + (j + (b2 + 0.5) / L.ss) / L.k, L);
            sr += c3[0]; sg += c3[1]; sb += c3[2];
          }
        }
        var o = (j * W + i) * 4;
        d[o] = sr / n; d[o + 1] = sg / n; d[o + 2] = sb / n; d[o + 3] = 255;
      }
    }
    t.ctx.putImageData(img, 0, 0);
    return { t: t, k: L.k, r0: L.r0, r1: L.r1, dmin: dmin };
  }

  function bakeOak() {
    OAK_A = hexRGB(P.oakFloor); OAK_B = hexRGB(P.oakFloorWarm); OAK_GR = hexRGB(P.oakFloorGrain);
    OAK_SM = hexRGB(P.oakSeam); OAK_LIP = hexRGB(P.oakFloorLip);
    OAK_KN = hexRGB(P.oakKnot); OAK_KR = hexRGB(P.oakKnotRing);
    return LODS.map(bakeOakLevel);
  }

  /* the boards, rows r0..r1-1, for this scroll: one drawImage a row, each
     row's shift rounded to whole pixels so it only ever translates */
  function drawOak(ctx, scroll, r0, r1) {
    var tcm = scroll * D_PLAY / FOC, li = 0, L, r;
    for (r = r0; r < r1; r++) {
      while (li < T.oak.length - 1 && r >= T.oak[li].r1) li++;
      L = T.oak[li];
      var D = depthAt(r), cmPx = D / FOC;
      var shift = Math.round(tcm / cmPx);
      var u0 = wrap(((shift - VPX) * cmPx) * L.k, PERIOD_CM * L.k);
      var v = Math.max(0, Math.floor((D - L.dmin) * L.k));
      ctx.drawImage(L.t.canvas, u0, v, VW * cmPx * L.k, 1, 0, r, VW, 1);
    }
  }

  /* THE SEAMS between the boards, as lines: for each board edge in view,
     row by row, the run from where it crosses this row to where it
     crosses the next, so a seam is one unbroken staircase however steeply
     it runs - and on exactly the whole-pixel shift drawOak gave the row,
     so it sits on its boards. Its width is the seam's 2.5 mm at the row's
     scale (a pixel far off, six at your feet), with the satin lip of the
     next board on its right where the window catches it. */
  var SEAM_CM = 0.25;
  function drawSeams(ctx, scroll, r0, r1) {
    var tcm = scroll * D_PLAY / FOC, r, k;
    function shiftAt(rr) { return Math.round(tcm * (rr + 0.5 - Y_H) / EYE); }
    for (r = r0; r < r1; r++) {
      var pc = (r + 0.5 - Y_H) / EYE, pc2 = (r + 1.5 - Y_H) / EYE;
      var sh = shiftAt(r);
      var w = Math.min(2, Math.max(1, Math.round(SEAM_CM * pc)));
      var k0 = Math.floor((sh - VPX - 8) / pc / BOARD_CM), k1 = Math.ceil((sh + VW - VPX + 8) / pc / BOARD_CM);
      for (k = k0; k <= k1; k++) {
        var xa = VPX - sh + k * BOARD_CM * pc;
        var xb = r + 1 < r1 ? xa + (k * BOARD_CM - tcm) * (pc2 - pc) : xa;
        var lo = Math.round(Math.min(xa, xb)), hi = Math.round(Math.max(xa, xb));
        if (hi + w < 0 || lo > VW) continue;
        ctx.fillStyle = P.oakFloorSeam;
        ctx.fillRect(lo, r, hi - lo + w, 1);
        ctx.fillStyle = P.oakFloorLip;
        ctx.fillRect(hi + w, r, 1, 1);
      }
    }
  }

  /* THE LIGHT ON THE FLOOR, static, rows 148..241: the window's sheen by
     the toe-kicks - opaque to row 157, so the furniture's feet stand on
     the bright haze the far boards become - lifting off by 176, and the
     table's shade gathering toward the lens */
  var FL_Y = 148;
  function bakeFloorLight() {
    var Hh = FLOOR - FL_Y, t = makeCanvas(VW, Hh), c = t.ctx, y;
    var S0 = hexRGB(P.floorSheen), S1 = hexRGB(P.floorMid);
    for (y = 0; y < Hh; y++) {
      var sy = y + FL_Y;
      var sc = mixRGB(S0, S1, ease((sy - FL_Y) / 28));
      var sa = sy <= 157 ? 1 : 1 - ease((sy - 157) / 19);
      if (sa > 0) { c.fillStyle = 'rgba(' + Math.round(sc[0]) + ',' + Math.round(sc[1]) + ',' + Math.round(sc[2]) + ',' + sa.toFixed(3) + ')'; c.fillRect(0, y, VW, 1); }
      var sh = 0.34 * ease((sy - 168) / (FLOOR - 1 - 168));
      if (sh > 0) { c.fillStyle = rgba(H.walnutDeep, sh); c.fillRect(0, y, VW, 1); }
    }
    return t;
  }

  /* the band's light: a lighter shade than the floor just beyond it (the
     value step at the kill line), the seam and the lit arris across 242
     and 243, and the bottom of the frame falling off a touch */
  function drawBandLight(ctx) {
    ctx.fillStyle = rgba(H.walnutDeep, 0.20);
    ctx.fillRect(0, FLOOR + 2, VW, VH - FLOOR - 2);
    ctx.fillStyle = rgba(P.oakShade, 0.12);
    ctx.fillRect(0, VH - 6, VW, 6);
    ctx.fillStyle = P.oakSeam; ctx.fillRect(0, FLOOR, VW, 1);
    ctx.fillStyle = P.oakSun;  ctx.fillRect(0, FLOOR + 1, VW, 1);
  }

  /* ================================================ THE DAYLIGHT SHEET

     480 x 270, baked once, blitted last in drawBackdrop. Three smoothstep
     ramps and nothing with an edge:
       1. the TABLE'S SHADE OVERHEAD, rows 24..80 - over the bright ceiling
          sliver and the overhang it shades; it is also what keeps a white
          chair leg's seat block legible against the bright kitchen
       2. the WINDOW'S WARMTH on the right third
       3. the DIM CORNER on the left, where the mop parks
     The shade on the floor is baked into the floor sheet itself, row by
     row, where it belongs. */
  var SHADE_TOP = 0.26, SHADE_TO = 80;

  function bakeDaylight() {
    var t = makeCanvas(VW, VH), c = t.ctx, x, y, k;
    for (y = CEIL; y < SHADE_TO; y++) {
      k = 1 - ease((y - CEIL) / (SHADE_TO - CEIL));
      fill(c, rgba(H.walnutDeep, SHADE_TOP * k), 0, y, VW, 1);
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
    T.chair = bakeChairFar();
    T.oak = bakeOak();
    T.floorLight = bakeFloorLight();
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

  /* THE ROOM, back to front: the far wall (0.15), the oak floor in true
     perspective with its seams and its static light (see THE FLOOR), the
     island (0.30) and the far chair (0.48) standing on it, and the
     daylight. The flat fill is a safety
     net. NOT LivingRoom.drawLight: that is night. */
  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = H.wall;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.far.canvas, scroll * FAR_P, FAR_Y);
    drawOak(ctx, scroll, OAK_R0, FLOOR);
    drawSeams(ctx, scroll, OAK_R0, FLOOR);
    ctx.drawImage(T.floorLight.canvas, 0, FL_Y);
    tileX(ctx, T.island.canvas, scroll * ISL_P, ISL_Y);
    tileX(ctx, T.chair.canvas, scroll * CHR_P, CHR_Y);
    ctx.drawImage(T.daylight.canvas, 0, 0);
  }

  /* the calm room for a menu to sit on: the furniture without the
     hazards - no legs, crumbs, leaves or mop */
  function drawMenuBackdrop(ctx, scroll) {
    drawBackdrop(ctx, scroll);
    drawCeiling(ctx, scroll);
    drawFloor(ctx, scroll);
  }

  /* the table's underside and far apron, at the far chair's parallax */
  function drawCeiling(ctx, scroll) { tileX(ctx, T.lid.canvas, scroll * LID_P, 0); }

  /* the near board, the actual ground. No foreground lip: the near
     chairs' feet ARE the pillars. */
  function drawFloor(ctx, scroll) {
    drawOak(ctx, scroll, FLOOR, VH);
    drawSeams(ctx, scroll, FLOOR, VH);
    drawBandLight(ctx);
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
     already clipped. A live miniature of the bay in its own proportions,
     which are Floor ref 6's: the table's underside and its white apron
     across the top tenth, a sliver of bright kitchen under it, the island's
     honey overhang high up at 0.14, its shaded white doors, the dark
     toe-kick at 0.56 with a stool standing on the floor in front of it
     and the fridge showing in the gap where the island ends, the oak
     floor with its boards fanning out toward you from the window's sheen
     into the table's shade, and the near board under its seam - then,
     sliding past, white chair legs from the lid and black stool legs from the near seam, crumbs hopping on it, a
     hot sauce droplet bending back toward THE MOP at the left edge. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22, i, k, xx, yy;
    function Y(f) { return y + Math.round(h * f); }
    function R(col, rx, ry, rw, rh) { if (rw > 0 && rh > 0) { ctx.fillStyle = col; ctx.fillRect(rx, ry, rw, rh); } }
    var lidB = Y(0.09), noseY = Y(0.14), ovB = Y(0.22), kickY = Y(0.52), floorY = Y(0.56);
    var seamY = Y(0.896);
    var gapX = x + Math.round(w * 0.72), gapW = Math.round(w * 0.2);

    /* the sliver of kitchen over the overhang: bright ceiling, a can, the
       crown, the tops of the uppers, the hood's glass */
    R(P.ceilDay, x, lidB, w, noseY - lidB);
    R(H.lampCore, x + Math.round(w * 0.3), lidB + 1, 2, 1);
    R(H.cabinetLit, x, noseY - 3, w, 1);
    for (xx = x; xx < x + w; xx += 6) R(H.cabinetShade, xx + 1, noseY - 2, 4, 2);
    var hx = x + Math.round(w * 0.55);
    R(H.steel, hx - 2, lidB, 4, noseY - lidB - 2);
    R(P.hoodGlass, hx - 7, noseY - 3, 14, 3);

    /* the gap where the island ends: the fridge and the far base run */
    R(H.cabinet, gapX, noseY, gapW, floorY - noseY);
    R(H.tile, gapX, noseY + Math.round((floorY - noseY) * 0.35), gapW, Math.round((floorY - noseY) * 0.2));
    for (xx = gapX; xx < gapX + gapW; xx += 5) R(H.cabinetShade, xx + 1, noseY + Math.round((floorY - noseY) * 0.6), 3, Math.round((floorY - noseY) * 0.3));
    var fx = gapX + Math.round(gapW * 0.45), fw = Math.max(8, Math.round(gapW * 0.5));
    R(H.outline, fx - 1, lidB, fw + 2, floorY - lidB);
    R(H.steel, fx, lidB, fw, floorY - lidB - 1);
    R(H.steelLit, fx, lidB, 1, floorY - lidB - 1);
    R(H.steelDeep, fx + Math.round(fw / 2), lidB, 1, Math.round((floorY - lidB) * 0.6));
    R(P.magnetPink, fx + 1, lidB + 3, 2, 2);
    R(P.photoWhite, fx + 3, lidB + 6, 2, 3);
    R(P.magnetYellow, fx + 1, lidB + 9, 2, 2);

    /* THE ISLAND: quartz nose, honey ply, its underside, the shaded doors */
    var runW2 = gapX - x;
    R(H.outline, x, noseY, runW2, 1);
    R(H.cabinetLit, x, noseY + 1, runW2, 1);
    R(P.ply, x, noseY + 2, runW2, 2);
    R(P.plyUnder, x, noseY + 4, runW2, ovB - noseY - 4);
    R(P.plyShade, x, ovB - 1, runW2, 1);
    R(P.isleFrame, x, ovB, runW2, kickY - ovB);
    /* four doors and the drawer stack, at the level's width */
    var dw = Math.max(10, Math.round((runW2 - 2) / 5));
    for (k = 0; k < 5; k++) {
      xx = x + k * dw;
      R(P.isleDeep, xx, ovB, 1, kickY - ovB);
      if (k === 4) {
        for (i = 0; i < 3; i++) {
          R(P.isleField, xx + 2, ovB + 2 + i * Math.round((kickY - ovB) / 3), dw - 4, Math.round((kickY - ovB) / 3) - 3);
          R(H.steelLit, xx + Math.round(dw / 2) - 2, ovB + 4 + i * Math.round((kickY - ovB) / 3), 4, 1);
        }
      } else {
        R(P.isleField, xx + 2, ovB + 2, dw - 4, kickY - ovB - 4);
        R(P.isleLit, xx + dw - 3, ovB + 3, 1, kickY - ovB - 6);
      }
    }
    Tint.rect(ctx, x, ovB, runW2, 3, H.walnutDeep, 4);
    R(P.toeKick, x, kickY, runW2, floorY - kickY - 1);
    R(H.outline, x, floorY - 1, runW2, 1);
    R(P.isleFrame, gapX - 2, noseY, 2, floorY - noseY);
    /* one stool at the island, on the boards */
    var sx = x + Math.round(w * 0.3);
    R(H.walnut, sx - 5, Y(0.27), 11, 2);
    R(H.walnutLit, sx - 5, Y(0.27), 11, 1);
    for (yy = Y(0.29); yy < floorY; yy++) {
      var sp = Math.round((yy - Y(0.29)) / (floorY - Y(0.29)) * 5);
      R(H.iron, sx - 1 - sp, yy, 1, 1); R(H.iron, sx + 1 + sp, yy, 1, 1);
    }
    R(H.iron, sx, Y(0.29), 1, Y(0.38) - Y(0.29));
    R(H.ironLit, sx - 5, Y(0.465), 11, 1);

    /* the floor: ONE oak floor, its boards running into the room and
       their seams fanning out from the vanishing point, sliding as the
       level's do (fast near, slow far); the window's sheen by the
       toe-kick, the table's shade toward you; and the near board, the
       ground, a shade lighter under its dark seam and lit arris */
    var hY = Y(0.54), cx2 = x + Math.round(w / 2), bw = w * 0.5;
    var off = wrap(s * 0.5, bw), bot = y + h;
    R(P.oakFloor, x, floorY, w, bot - floorY);
    for (yy = floorY; yy < bot; yy++) {
      var sc = (yy + 0.5 - hY) / (bot - hY), sc2 = (yy + 1.5 - hY) / (bot - hY);
      for (k = -6; k <= 6; k++) {
        var xa = cx2 + (k * bw - off) * sc, xb = cx2 + (k * bw - off) * sc2;
        var lo = Math.round(Math.min(xa, xb)), hi = Math.round(Math.max(xa, xb));
        if (hi < x - 2 || lo > x + w + 2) continue;
        R(P.oakFloorSeam, lo, yy, hi - lo + 1, 1);
        R(P.oakFloorLip, hi + 1, yy, 1, 1);
      }
    }
    var SHN = hexRGB(P.floorSheen);
    for (yy = floorY; yy < seamY; yy++) {
      var sa = 1 - ease((yy - floorY) / Math.max(1, (seamY - floorY) * 0.35));
      if (sa > 0) R('rgba(' + Math.round(SHN[0]) + ',' + Math.round(SHN[1]) + ',' + Math.round(SHN[2]) + ',' + sa.toFixed(3) + ')', x, yy, w, 1);
      R(rgba(H.walnutDeep, 0.34 * ease((yy - floorY) / Math.max(1, seamY - floorY))), x, yy, w, 1);
    }
    R(rgba(H.walnutDeep, 0.20), x, seamY + 2, w, bot - seamY - 2);
    R(P.oakSeam, x, seamY, w, 1);
    R(P.oakSun, x, seamY + 1, w, 1);

    /* the lid: the table's underside, its white apron, the bounce pair */
    R(H.walnutDeep, x, y, w, lidB - y);
    R(H.walnut, x + Math.round(w * 0.2), y + 2, Math.round(w * 0.3), 1);
    R(P.paintHi, x, lidB - 6, w, 1);
    R(H.paint, x, lidB - 5, w, 2);
    R(H.paintShade, x, lidB - 3, w, 1);
    R(H.outline, x, lidB - 2, w, 1);
    R(H.walnutDeep, x, lidB - 1, w, 1);

    /* THE LEGS, sliding past: a white chair leg from the lid, a black
       stool leg from the near seam, with the gap between them */
    var period = big ? 46 : 38;
    var span = seamY - lidB;
    var gapH = Math.round(span * 0.34);
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - wrap(s + i * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapY = Math.round(lidB + 6 + ((i * 19) % Math.max(1, span - gapH - 14)));
      Tint.rect(ctx, ox + 10, lidB, 2, gapY - lidB, H.void, 6);
      R(H.outline, ox, lidB, 10, gapY - lidB);
      R(P.paintHi, ox + 1, lidB, 2, gapY - lidB - 2);
      R(H.paint, ox + 3, lidB, 3, gapY - lidB - 2);
      R(P.paintHi, ox + 6, lidB, 1, gapY - lidB - 2);
      R('#ddd5c3', ox + 7, lidB, 2, gapY - lidB - 2);
      R(H.outline, ox - 2, lidB, 14, 4);
      R(H.paint, ox - 1, lidB, 12, 3);
      R(P.glide, ox + 1, gapY - 2, 8, 2);
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
      var ry = seamY - Math.round(h * 0.11);
      if (ry > by + 5) {
        R(H.outline, ox - 3, ry - 1, 16, 3);
        R(H.ironLit, ox - 2, ry, 14, 1);
      }
    }

    /* THE CRUMBS hopping on the near seam, drawn toward the mop */
    var band = Math.round(h * 0.2);
    for (i = 0; i < 3; i++) {
      var kx = x + Math.round(wrap(w - s * 1.3 + i * 37, w + 8)) - 4;
      if (kx < x + Math.round(w * 0.2) || kx > x + w - 4) continue;
      var apex = Math.round(band * (0.5 + i * 0.2));
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

    /* THE MOP at the left edge: its body leaning back off the card, the
       handle going up, the head on the near seam with the roller turning */
    var mw = Math.max(16, Math.round(w * 0.24)), hy1 = seamY + 2, hy0 = hy1 - Math.round(h * 0.12);
    var bw = Math.max(8, Math.round(w * 0.12)), bTop = Y(0.36);
    for (yy = bTop; yy < hy0; yy++) {
      var lean = Math.floor((hy0 - yy) / 8);
      var bx0 = x - 2 - lean;
      var inTank = yy > bTop + (hy0 - bTop) * 0.45;
      R(H.outline, bx0 - 1, yy, bw + 2, 1);
      R(inTank ? P.mopTank : P.mopWhite, bx0, yy, bw, 1);
      if (inTank && yy > hy0 - (hy0 - bTop) * 0.25) R(P.mopWater, bx0 + 1, yy, bw - 2, 1);
      if (!inTank && (yy - bTop) % 9 < 2) R(P.mopGreen, bx0, yy, bw, 1);
    }
    for (yy = lidB; yy < bTop; yy++) {
      var hx2 = x + Math.round(bw / 2) - 4 - Math.floor((hy0 - yy) / 8);
      R(H.outline, hx2 - 1, yy, 4, 1);
      R(P.mopWhite, hx2, yy, 2, 1);
    }
    R(H.outline, x, hy0, mw + 1, hy1 - hy0 + 1);
    R(P.mopWhite, x, hy0 + 1, mw, 2);
    R(P.mopGreen, x, hy0 + 3, mw, 2);
    R(P.mopGreyDeep, x, hy0 + 5, mw, hy1 - hy0 - 7);
    R(P.mopTank, x, hy0 + 6, mw - 1, hy1 - hy0 - 9);
    var sh2 = Math.floor(t * 10) % 3;
    for (k = 0; k < mw; k += 5) {
      for (i = 0; i < hy1 - hy0 - 9; i++) R(P.rollerStripe, x + k + i + sh2, hy0 + 6 + i, 2, 1);
    }
    R(P.mopWhite, x + mw - 4, hy0 + 1, 4, hy1 - hy0 - 3);
    R(P.mopGreen, x, hy1 - 2, mw, 1);
    for (i = 0; i < 3; i++) {
      var dx2 = wrap(w * 0.4 - s * 1.1 + i * w * 0.13, w * 0.4);
      R(P.oakSun, x + mw + 1 + Math.round(dx2), hy0 + 4 + i * 3, 2, 1);
    }

    /* the doodad flying it, with a halo so it never goes missing */
    var dx = Math.round(x + w * 0.42);
    var dy = Math.round(y + h * 0.45 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, dx - sz, dy - sz, sz * 2, sz * 2, H.void, 5);
    R(H.outline, dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    R('#c9873c', dx - sz / 2, dy - sz / 2, sz, sz);
    R('#eab873', dx - sz / 2, dy - sz / 2, sz - 2, 1);
    R(H.outline, dx + sz / 2 - 2, dy - 1, 1, 1);
    R('#f3cc84', dx + sz / 2, dy, 2, 1);

    /* the daylight: the table's shade over the top, the window's warmth
       on the right */
    Tint.rect(ctx, x, lidB, w, ovB - lidB, H.walnutDeep, 3);
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
