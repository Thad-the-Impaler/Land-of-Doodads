/* ------------------------------------------------------------------
   Land of Doodads - THE KITCHEN / THE CABINETS   (4-4)

   Behind the glass doors. You are flying along INSIDE the TOP TIER of
   the house's glass-front uppers - the cabinet's top board overhead,
   the top glass shelf with its green edge underfoot, the cream back
   panel straight ahead, the doors open behind the camera. The clean
   things back from the dishwasher have been put away in stacks along
   this shelf, and the stacks are the planks of this bay.

   ONE CAMERA, square to the back panel: flat, side-on, depth by
   parallax only and never by scale (the owner's rule since the Fridge).
   Back to front:
     the back panel, its cleat and its light         0.80
     his things on the shelf, the side panels, the
     right unit's walls - one sheet                  1.00
     the lane: the stacks, the glasses, the doodad   1.00
     the cabinet's top board (the lid) and the
     shelf's edge underfoot                          1.00
     the tier below, seen through the glass shelf    0.80
   Everything that stands is at 1.0 with the things on it, so nothing
   upright ever slides past what stands beside it.

   THE WHOLE RUN, in its real order, 780 px a lap: CABINET A (the coffee
   gear: the ROK lever press with the tamper in front of it, the cold
   brew carafe, the French press, the Chemex and its bowl, the dried
   eucalyptus lying across the shelf), the partition, CABINET B (the
   glassware on the slate mat - nine stemless glasses, one of them big,
   the white dish in front, the bottle, the jar, the cut decanter), B's
   end panel, then THE RIGHT CORNER UNIT with his wooden robot alone on
   its board - the one breath in the lap - and its side panel against
   A's again. The left corner unit (empty, as photographed), the door
   casing and the wall are left out: they were a blank stretch. Every
   thing is its own bake (refs 2..17, zoom2/) at the bay's one scale,
   4.25 px a centimetre, the lane's stacks and the scenery alike: a mug
   is 8 cm, 34 px, the column; the white dish 10 cm, 42, the cap. The
   tier is 28 cm clear, 119 px at this scale, and the lane is 218: the
   bay's one honest fiction, the Counter's exactly. The pickups stay
   near the house's pickup size (the TV's lesson).

   THE LIGHT. There is no light in the box - the bright disc in two of
   the photographs is a ceiling can reflected in the door glass - so the
   room's cans light it through the open doors: the cream panel darkest
   under the cleat and brightest down by the shelf, his things in the
   scenery band (114..210), never pure white, never outlined. THE RINGS
   are where they really are: on the tier below, under the glass shelf,
   a few soft part-arcs of light just above the band's own tone in loose
   clusters, the pothos stems hanging under the robot's unit.

   GLASS IS DRAWN AS GLASS. Clear glass against a cream panel is the
   panel seen through a cool green-grey tint - darker than the panel,
   never whiter. A glass in the lane is a green-grey body (136) inside a
   crisp dark edge line, a white line at every rim with the rim's dark
   under it, a white streak down its near side, its thick base deeper.
   Everything that ACTS is far off the backdrop: the glass 136 with its
   62 edges and white rims, the hanging black mugs 35, the caps white
   enamel or the white dish, the falling glasses the same dark glass,
   the black tumbler 35, and every gift glows.

   THE STACKS. Standing on the shelf, mouth up: the ribbed tumblers of
   refs 7 and 15, or the TULIP glasses of B's middle tier (refs 3, 15;
   8 cm at the flared rim, so the column is true), nested, capped with
   the small white dish. Hanging from the board above, mouth down: the
   matte black mugs of ref 6, capped with the white enamel LOVE YOU mug
   or the navy Fly.io mug. A nested stack is a column of rim bands of
   one width, which is what makes it drawable inside the Coop's 34 px
   box; the cap is always a different, wider thing.

   THE LET-GO - the bay's own hazard: A HANGING STACK LETS GO. Up ahead a
   stack of mugs rocks on the board and chinks, glass dust sifting off
   the lid where it is letting go; then the whole column drops through
   its own gap and lands rim-down on the white dish of the standing
   stack below. From then on ITS GAP HAS MOVED: right under the lethal
   lid. The climb to it, made on the first chink, is the play. WHERE a
   stack lets go is rolled per stack - anywhere from the floor its speed
   and gap allow up to x 460, three in ten from the near end - and it
   ROCKS AS LONG AS THE DISTANCE ALLOWS, 0.40..0.90 s, two to four
   chinks, so every block still lands with its column at 212 or beyond.
   It lets go WHILE HE IS HOT too, on a floor stated in time (the
   shortest rock 0.35, the landing floor 190, no doubles). See THE
   LET-GO for the clock and the arithmetic.

   GLASSES FALL from up by the top board and break where they land: the
   straight can glasses of refs 3 and 7, and the matte black tumbler
   from behind the Verve (ref 6), tumbling through sixteen baked frames
   each, their boxes cut from the frames themselves. The gifts come down
   steady: the Verve tumbler (the heat), the pineapple glass with the
   sunglasses (sour), the orange origami fox off the corner shelf (spin)
   FLUTTERING through five tilts, a fox the whole way down, the gold-wood
   robot (a crow's +5) SWAYING feet-down, and the glow-in-the-dark Smiski
   (a spare life, jade as every spare life is).

   MEASURED, headless, at the tune in js/levels.js, forty-eight seeded
   one-minute runs a line (three blocks of sixteen), lives turned into
   saves, the shared harness's stock autopilot unless it says otherwise:
     hits a minute       12.0 (11.8, 12.0, 12.3 by block) - the Fridge
                         10.8, the TV 13.75. A pilot that reacts 100 ms
                         late and flaps at most every 0.15 s: 16.5
                         (16.8, 16.3, 16.6).
     the let-go          armed 7.0 a minute early and 18.7 from the late
                         score, with 3.4 doubles a minute from 24 and
                         none while hot (54 held); armed at x 331..460,
                         398 on the average, 25% from the near end; the
                         rock 0.40..0.90 s cold, 0.35..0.76 hot, 0.66 on
                         the average, 3.0 chinks a let-go; 13.8 landings
                         a minute, the column at x 214 or more cold and
                         193 or more hot, the falling block never within
                         62 px of his front; the lid gap 96 px on the
                         average and 87 at the least; the next stack
                         always placed from the gap before the let-go
                         (660 of 660)
     while hot           armed 0.38 a hot second from the late score
                         (95 in 248 s), 0.08 before it (the late pilot's
                         25 s of early heat); deaths at a landed stack
                         0.028 a hot second against 0.038 a cold one
     what it kills       the stock pilot 2.3 a minute at a landed stack,
                         nearly all at the lid, which is 22% of its
                         deaths; the late pilot 2.4 a minute, mostly on
                         the block it climbs too late for - neither
                         pilot ever touched a rocking or a falling block
     the glasses         42 born a minute (52 late), 7 within 22 px of
                         the doodad, 4.9 contacts; Pepper's ! on 81% of
                         those that come within 22 px of her (93% cold:
                         in the heat a glass is his to smash, not hers
                         to call)
     the gifts           the Verve every 25..33 s on the bay's own odds
                         (and the engine's streak help on top for a
                         pilot that keeps catching it), the pineapple
                         glass every 33, the fox every 45, the Smiski
                         once in about 45 stacks, the robot 1.4 a minute
                         on a crow's run
     the doodads         all eighteen, four seeds of 45 s each: no error,
                         no NaN, no string on a plank; Buster's tape
                         takes a landed block back up to the lid
     the cost            about 120 drawImage calls and 0.83 million
                         pixels a frame, every layer

   Same discipline as every other level file: every pixel is generated
   and baked once in build() into tiles (the covers' small shelf rows
   once per card size, the first time it is drawn), anything laid over
   something that scrolls is a flat Tint or a baked sheet (there is no
   Dither in this file), nothing turns by ctx.rotate - the glasses
   tumble and the gifts sway through frames rasterised at bake time from
   shape tables (the Table's silverware method) - and no draw rolls a
   die.
------------------------------------------------------------------ */
'use strict';

var Cabinets = (function () {

  /* the house: the kitchen's pigments and its utilities */
  var K = Kitchen.P;
  var CEIL = Kitchen.CEIL, FLOOR = Kitchen.FLOOR;
  var wrap = Kitchen.wrap, hash = Kitchen.hash;
  var ease = Kitchen.ease, rgba = Kitchen.rgba;
  var glow = Kitchen.glow, blitBelowCeil = Kitchen.blitBelowCeil;

  /* The bay's own pigments. PlayScene never reads this table. */
  var P = {
    /* THE BOX (luminance 0.299R + 0.587G + 0.114B, as BRIEF2 counts it).
       The back panel, his cabinets' warm off-white, lit by the room's
       cans through the open doors: darkest under the cleat, brightest by
       the shelf. No light in the box - the bright disc in refs 1 and 13
       is a ceiling can in the door glass. */
    panelTop:     '#a8a092',   /* 160, under the cleat */
    panelLit:     '#cec6b6',   /* 199, by the shelf */
    cleat:        '#a39b8c',   /* 156: the hanging rail along the top of the back */
    cleatLit:     '#b5ad9d',   /* 174 */
    cleatShade:   '#8f8778',   /* 136 */
    board:        '#e6e0d2',   /* 224: the cabinet's top board, and the corner units' */
    boardLit:     '#f4efe4',   /* 239 */
    boardShade:   '#c7c0b1',   /* 192 */
    unitWall:     '#c9c1b0',   /* 193: the open corner units face the room */
    unitWallShade:'#b5ad9d',   /* 174 */
    panelMid:     '#b9b1a2',   /* 178: the tier below, under the glass */
    panelMidLo:   '#aaa293',   /* 163 */
    ring:         '#f8f4ea',   /* 244: the caustics under the shelf - light, the one thing of it */
    ringGlow:     '#fbf8f1',
    ringShade:    '#9a9284',
    /* THE SCENERY SUB-PALETTE: everything standing on the shelf behind the
       lane lives in 118..210 - no pure white, no black, no 1 px outline -
       so the stacks' 62 edges and 255 rims, the mugs' 36 and the gifts'
       glow always ring against it */
    scSteelLit:   '#d2d3cf',   /* 210 */
    scSteel:      '#b3b5b1',   /* 180 */
    scSteelMid:   '#9a9d99',   /* 156 */
    scSteelShade: '#7f8381',   /* 130 */
    scSteelDeep:  '#767a78',   /* 121 */
    scGlass:      '#aab4ae',   /* 176 (clear glass is drawn as the panel through this tint) */
    scGlassTint:  '#8d9c95',   /* 151 */
    scGlassHi:    '#ced4cf',   /* 210 */
    scGlassShade: '#8f9a94',   /* 150 */
    scGlassDeep:  '#8a9690',   /* 146 */
    scGlassEdge:  '#7b857f',   /* 129 */
    scSlate:      '#7a7d80',   /* 124 */
    scSlateLit:   '#8e9194',   /* 144 */
    scWhite:      '#d3d1cb',   /* 209 */
    scWhiteShade: '#b9b6ae',   /* 182 */
    scBlack:      '#777779',   /* 119 */
    scBlackLit:   '#8d8d90',   /* 141 */
    scWood:       '#c4a070',   /* 165 */
    scWoodLit:    '#d3b98c',   /* 188 */
    scWoodDeep:   '#8c7352',   /* 119 */
    scLeather:    '#8a6d4c',   /* 114: the Chemex's tie, and nothing else */
    scEuc:        '#a9ada5',   /* 171 */
    scEucLit:     '#c0c3bb',   /* 193 */
    scEucDeep:    '#7f8479',   /* 129 */
    scCactus:     '#8fb28a',   /* 163 */
    scYellow:     '#d9c470',   /* 193 */
    scFlamingo:   '#d9a0ab',   /* 178 */
    scFlamingoLeg:'#c98a70',   /* 154 */
    scCharm:      '#767a7c',   /* 121 */
    scStem:       '#86a06a',   /* 146: the pothos, under the right unit */
    scLeaf:       '#95ad7a',   /* 160 */
    scLeafLit:    '#b2c494',   /* 185 */
    scLeafDeep:   '#73875d',   /* 124 */
    /* THE GLASS SHELVES' green edge, the house's float glass seen end on */
    edgeLit:      '#bfe3d3',
    edge:         '#7fbfa6',
    edgeMid:      '#4f9880',
    edgeDeep:     '#2f6b58',
    arris:        '#1f2a26',   /* lum 40: the dark line under the lid - the kill line */
    shelfLine:    '#f2f7f4',   /* lum 245: the top of the shelf underfoot - the kill row */
    gEdge0:       '#a8d9c4',
    gEdge1:       '#66ad92',
    gEdge2:       '#3f8369',
    gEdge3:       '#27584a',
    under:        '#5e5749',
    /* CLEAR GLASS against a cream panel is the panel seen through a cool
       green-grey tint: DARKER and cooler than the panel, never whiter
       (refs 3, 4, 7). What says glass is around it - a white line at
       every rim, a white streak or two down it, a crisp dark line at
       each edge, ribs as thin light and dark lines, and the thick base
       a deeper green-grey. */
    glass:        '#7c8c86',   /* lum 136, the body */
    glassHi:      '#ffffff',   /* the glints and the rims */
    glassLite:    '#c3d2cb',   /* lum 205: a light rib, a fainter streak */
    glassShade:   '#5f716a',   /* lum 108: a dark rib, the far side */
    glassDeep:    '#4b5d56',   /* lum 88: the thick base */
    glassEdge:    '#33433d',   /* lum 62: the edge line */
    /* the pineapple glass is a GIFT and keeps the old pale glass under
       its glow: a hazard in here is dark glass, a gift bright */
    giftGlass:    '#e9efec',
    giftShade:    '#c3cdc8',
    giftEdge:     '#9aa6a0',
    outline:      '#3a3a38',
    /* THE WHITE DISH (ref 4), the standing stacks' cap */
    dish:         '#f3f0e9',
    dishHi:       '#ffffff',
    dishShade:    '#cdc8bd',
    /* THE MATTE BLACK MUGS (ref 6, 17) */
    mug:          '#242326',   /* lum 35 */
    mugLit:       '#4a494d',
    mugDeep:      '#141316',
    mugRim:       '#5a595d',
    mugLine:      '#55544f',   /* a black mug's ring is a hair LIGHTER, so it still rings */
    /* THE FLY.IO MUG's navy */
    navy:         '#1d2a44',
    navyLit:      '#34456a',
    navyDeep:     '#111a2d',
    navyRim:      '#4c5d84',
    navyLine:     '#5b6a8c',
    /* THE LOVE YOU ENAMEL MUG */
    enamel:       '#f4f1ea',
    enamelShade:  '#d9d4c8',
    enamelRim:    '#1b1b1b',
    ink:          '#2b2a28',
    /* the pineapple glass's leaves */
    cactus:       '#6fae6a',
    cactusDeep:   '#4a8446',
    /* THE PINEAPPLE GLASS (sour) */
    pine:         '#f2c94c',
    pineDot:      '#d9a92c',
    /* THE VERVE TUMBLER (the heat) */
    verve:        '#f0692e',
    verveHi:      '#ffb07a',
    verveDeep:    '#c24a18',
    /* THE ORIGAMI FOX (spin): orange paper, three facets and an ink eye */
    foxLit:       '#f6a05a',   /* 178 */
    fox:          '#e8782c',   /* 145 */
    foxDeep:      '#b4521a',   /* 105 */
    foxEye:       '#2f3a5a',   /*  58 */
    /* THE WOOD ROBOT (a crow's +5): his beech Cubebot in GOLD WOOD, the
       wood pushed to the Island's gold pan - P.gold sits between rb and
       rbLit - with the joints' slots the darkest lines on it */
    rb:           '#d9ab58',   /* 175 */
    rbLit:        '#f0cf7e',   /* 208 */
    rbDeep:       '#a3762e',   /* 123 */
    rbJoint:      '#5c3d18',   /*  66 */
    rbEye:        '#3a2a14',   /*  44 */
    gold:         '#f2cf6a',
    goldHi:       '#fff3c4',
    goldDeep:     '#c9a23f',
    /* THE SMISKI (the spare life), glow in the dark */
    smiski:       '#cfe8a8',
    smiskiLit:    '#eaf7d0',
    smiskiEye:    '#6c7a5a',
    smiskiLine:   '#7f9a62',
    /* a spare life glows the same jade in every level */
    lifeJade:     '#5fae9a',
    lifePale:     '#93d8bd',
    void:         K.void
  };

  /* The neutral effect palette the engine paints its particles from. */
  var FX = {
    motes: Kitchen.AIR.motes, motesHi: Kitchen.AIR.motesHi,
    /* glass dust off the lid when a glass lets go */
    puff: '#e8ebe6', puffHi: '#ffffff',
    /* chips of the green shelf edge, for the bops */
    ground: '#a8d9c4', groundHi: '#ffffff',
    /* shards: every drop carries its own pair anyway */
    splat: '#cfd8d3', splatHi: '#ffffff',
    hot: '#f0922e', hotMid: '#ffb347', hotHi: '#ffe08a', heat: '#f0922e', heatEdge: '#b84d12',
    glowCore: '255,224,138', glowEdge: '240,146,46'
  };

  /* The heads-ups, two short lines each, at most 26 characters. The
     glasses come at 4 (the engine's), the let-go at 6 (the art's, on the
     first one), and from the late score the art says so itself on the
     first late let-go - there is deliberately NO `late` key, so the
     engine stays quiet at lateScore and the sentence comes with the
     thing it is about. The first double gets its own. No spike line:
     there are no spikes in here. */
  var WARN = {
    drop:   ['▼ GLASSES ▼',          'THEY BREAK WHERE THEY LAND'],
    ceil:   ['▲ THE CABINET TOP ▲',  'IT ENDS THE RUN'],
    letgo:  ['▼ A STACK LETS GO ▼',  'THE GAP GOES UP TO THE LID'],
    anyNow: ['▼ ANY STACK NOW ▼',    'TALL ONES TOO, AND SOONER'],
    twice:  ['▼ TWO IN A ROW ▼',     'BOTH GAPS GO UP TO THE LID']
  };

  /* the thirteen colours a generic cover would use; this bay paints its
     own, but the table stays honest */
  var PREVIEW = {
    back: P.panelLit, backAlt: P.panelTop, seam: P.cleatShade,
    beam: P.glass, beamDark: P.outline, beamLight: P.glassHi,
    ground: P.shelfLine, groundDark: P.edgeDeep, groundHi: P.gEdge0,
    spike: P.mug, spikeHi: P.enamel, air: K.underLight, gloom: P.under
  };

  var END_MIN = Kitchen.END_MIN;
  var CEIL_KILLS = Kitchen.CEIL_KILLS;
  var BOON_NAME = 'SMISKI';
  var GOLD_NAME = 'ROBOT';

  /* --------------------------------------------------------- the space

     THE TOP TIER, and the run of his uppers behind it: one lap is cabinet
     A, the partition, cabinet B, B's end panel, the right corner unit with
     the robot alone on its board - the one breath in the lap - and that
     unit's side panel meeting A's left side panel, then A again. The loop
     is the bay's fiction (the Fridge's shelf is endless too); the empty
     left corner unit, the door casing and the window wall were a 40%
     stretch of nothing and are left out of it. u is the lap at 1.0 (780);
     the back layer is at 0.80 and its tile 624 = 0.8 x 780, in phase with
     the lap. */
  var PX_CM = 4.25;
  var LAP = 780, BACK_LAP = 624;
  var PAR_PANEL = 0.80;
  var LANE_H = FLOOR - CEIL;                  /* 218 */
  var EDGE_H = 7;                             /* rows 242..248: the shelf's edge, at 1.0 */
  var STRIP_Y = FLOOR + EDGE_H;               /* 249: the tier below, at 0.80 */
  var STRIP_H = VH - STRIP_Y;                 /* 21 */
  var SEC = { aL: [0, 8], A: [8, 314], part: [314, 330], B: [330, 636],
              bR: [636, 644], rUnit: [644, 772], uR: [772, 780] };
  var A0 = SEC.A[0], B0 = SEC.B[0], R0 = SEC.rUnit[0];
  /* the panel's light, rows: darkest under the cleat, brightest down by
     the shelf, where the room's cans reach in through the open doors */
  var PANEL_ROW0 = 38;

  /* =================================================== THE LET-GO

     A HANGING STACK LETS GO. Its clock lives in the pillar's own plain
     numbers - lg (0 cold, 1 rocking, 2 falling, 3 landed), lt (seconds
     in the state), ly and lv (the falling block's top row and its
     speed), lh (the hanging stack's whole height, cap and all), lq and
     lhL (the landed block's height now and once its mugs have nested),
     lgX (where it is armed, rolled at birth) and lgRock (how long it
     rocks, chosen at arming) - so the draw, the boxes, Pepper's copies
     and Buster's tape all read the same fields and cannot disagree.
     stepWorld advances it; Buster's tape rewinds every one of them, so a
     block on the dish goes back up to the lid and the gap back down
     where it was.

     WHERE IT GOES IS ROLLED, PER STACK, AT BIRTH. A stack's trigger lgX
     is anywhere from its own floor up to TRIG_HI 460 (the column's left
     20 px on screen): the floor is the x from which, at the room's speed
     at its birth and with its own gap, the shortest rock and the fall
     still land the block with its column at LAND_MIN or beyond -
         xMin = LAND_MIN + speed x (ROCK_MIN + sqrt(2 gapH / FALL_G))
     309..315 at the start, 362..371 at speedMax. Three stacks in ten
     roll from the NEAR end, the NEAR_W 24 px over the floor - a stack
     that has been on screen most of a second lets go - and the rest
     anywhere past it, uniform, so the far ones still rock as they come
     in. (The far roll starts past the near end, so three in ten is three
     in ten measured: the brief's one range would have put 0.45 of the
     armings there.)

     HOW LONG IT ROCKS IS AS LONG AS THE DISTANCE ALLOWS. At arming,
         lgRock = clamp((x - LAND_MIN) / speed - fall, ROCK_MIN, ROCK_MAX)
     so a far trigger rocks long and lazy (0.87 s from 460 at speedMax),
     a near one short and sharp (0.40), and every one lands with its
     column at LAND_MIN or beyond. A chink every CHINK_EVERY 0.22 s from
     the first, two to four of them; the rock's two pixels go to three
     in its last fifth of a second, the separation from the lid grows
     over its last quarter, the crack of light and the dust run the whole
     rock. His cue never changes: the first chink, the first jerk.

     ARMING, once per pillar, on the first frame its column reaches lgX,
     with the bay's own dice, if all of: the run is at LETGO_AT or more;
     it is not a meet plank; he is not in a save's grace (a stack that
     reaches its trigger in the grace may still go as the grace ends, if
     the shortest rock can still land it behind the floor); the gate is
     open - at least GATE pillars since the last let-go (two early, one
     late), counted by the pillars' birth order, which nothing rewinds;
     EARLY, the hanging stack is at most EARLY_MAX_H tall; the shortest
     rock still fits (at the room's speed NOW - if the heat came since
     its birth it may not, and then it is let be); and the roll comes up,
     LETGO_P[early, late, from 24]. From DOUBLE_AT the pillar straight
     after a let-go may roll DOUBLE_P to go too - two lid gaps in a row,
     each on its own trigger - but never a third, and never while hot.
     The gate does not reset on a failed roll.

     WHILE HE IS HOT it lets go too, on a floor stated in time: the
     shortest rock ROCK_MIN_HOT 0.35, the landing floor LAND_MIN_HOT 190
     - 0.22 s in front of him at the heat's 288 px/s, 59 px clear of his
     front - and no doubles. The stacks already on screen when the heat
     comes re-roll their triggers inside the hot range (or are let be if
     they are already inside its floor), so the heat's first second can
     still have one.

     ROCKING: the column and its cap rock side to side; from the second
     chink the stack comes AWAY FROM THE SHELF - a pixel of panel between
     the lid and the topmost mug's foot, three by the time it drops - and
     THE BOX MOVES WITH THE PICTURE (rectsFor reads the same lt). Over it
     a crack of light runs along the board's underside, flashing at the
     end; glass dust sifts off the lid either side of the column. Judged
     at 1x, the size it is on his phone. Nothing in the rock can touch
     him: the stack is 180+ px away.

     FALLING: the block drops from three pixels under the lid at FALL_G
     and lands when its foot reaches the dish (0.40 s for a gap of 82,
     0.46 for 104), lethal all the way down and boxed all the way down.

     LANDED: a clang and a small shake, eight glints off the dish, and
     the gap is moved - gapY to the lid - so everything that reads a
     plank's gap (the engine, Alpha's aura, the harness's pilot) sees the
     new one at once. Then THE MUGS NEST (below), and the gap grows by
     what the block gives up. The engine's own lastGapY is not touched,
     so the NEXT pillar is placed from the gap it would have been placed
     from anyway.

     THE CLOCK RUNS ON DISTANCE, NOT ON TIME. Every step of it is the
     px the column moved that frame over its speed at arming, so a rock
     of lgRock seconds is lgRock x that speed in px of travel whatever the
     room does after: if the heat comes mid-rock the let-go goes 1.55x
     with it, and if it ends mid-rock the let-go slows with the room -
     either way the block lands where it was promised to.

     THE ARITHMETIC, at speedMax 186 and the doodad's front at 127 (x 116
     plus the hitbox's 11), a flap lifting 48 px:
       chink to his arrival: (lgX - 127) / 186 = 1.26 s from the floor
         362, 1.79 s from 460. The climb to the lid gap - two flaps
         early (the stack at most 84 tall), up to three late (102) - is
         done 0.66..1.19 s before he gets there if it is made on the
         chink; from the late score it must be, and the banner says so.
       landing to his arrival: (212 - 127) / 186 = 0.46 s, always: the
         floor is the floor, and every let-go lands at it or beyond.
       hot at speedMax (288): the floor 407..422, chink to arrival
         0.97..1.16 s over 0.76..0.99 of rock and fall; landing to
         arrival 0.22 s. Harder, by readable means.
       the falling block is never near him: its cap edge is 81 px clear
         of his front at the closest cold, 59 hot.
       the lid gap: its top IS the kill line. He may fly with his centre
         in 35..(24 + gapH - 11). Unnested that is a 60 px band at gap 82,
         the same as any gap's - but a gap at the lid has to be HELD all
         the way in, under a lid with no cap to show where it is, and a
         pilot that hovers at 60% of the gap's depth died at 54% of all
         landings with no nesting. With the mugs nesting the lid gap is
         96 px on the average (87 the least), and that pilot dies at one
         in five: harder than a gap, not a trap.
     The stacked rules are an intersection and are measured as one (the
     Fort's lesson): see MEASURED in the header. */
  var LETGO_AT = 6, DOUBLE_AT = 24;
  var LETGO_P = [0.30, 0.75, 0.85];            /* early, late, from DOUBLE_AT */
  var DOUBLE_P = 0.60;
  var GATE = [2, 1];                           /* pillars between let-gos, early and late */
  var EARLY_MAX_H = 84;
  /* the trigger's range and the rock's length (see above) */
  var TRIG_HI = 460;
  var ROCK_MIN = 0.40, ROCK_MIN_HOT = 0.35, ROCK_MAX = 0.90;
  var CHINK_EVERY = 0.22, CHINK_QUIET = 0.1;  /* no chink in the last 0.1 s: the clink is next */
  var NEAR_P = 0.30, NEAR_W = 24;
  var ROCK_LAST = 0.2;
  var ROCK_W = 22, ROCK_A = 2, ROCK_A_LAST = 3;
  var FALL_G = 1000;
  var GLINT_T = 0.55, GLINTS = 8;
  /* THE MUGS NEST WHEN THEY LAND. They are conical (ref 6), and hanging
     they are stacked rim on foot; the block hits the dish and each one
     slides down over the foot of the one under it - the feet vanish up
     inside, a mug every NEST_PITCH instead of every 14 - over SQUASH_T,
     the block's top (and its box) coming down as it goes. The lid gap
     is the old gap plus what the block gave up: a pixel a mug, 1 for the
     shortest stack, 5 for an early one at its tallest, 6 for the tallest
     late one - so the higher the climb, the more room at the top of it.
     It is a small number with a large effect: see THE ARITHMETIC. A
     pitch of 12 (two a mug) made the let-go nearly harmless to the stock
     pilot; none at all made the lid a trap. */
  var NEST_PITCH = 13, SQUASH_T = 0.09;
  var DUST = 10, DUST_LIFE = 0.6;
  /* and it comes away from the shelf: a pixel of panel shows between the
     lid and the mugs from the second chink, three by the time it drops */
  var SEP_LAST = 0.25, SEP_MAX = 3;
  /* the check that it never falls near him: a falling block's cap edge
     inside this many px of his front is counted (and has never been) */
  var NEAR_FRONT = 40;
  /* THE LANDING FLOOR, cold and hot: whatever else says yes, a stack's
     block lands with its column at x LAND_MIN or more - 85 px and 0.46 s
     in front of him at speedMax - or LAND_MIN_HOT while he is hot. (Floors
     of 190 and 170 cold were measured too: they did not make the let-go
     kill a late-reacting pilot more - it still makes the climb - and only
     moved its deaths to the next stack, so 212 stays.) */
  var LAND_MIN = 212, LAND_MIN_HOT = 190;

  /* =================================================== THE GLASSES */

  /* A glass or a tumbler is heavy and quick (the Table's silverware, the
     Counter's knives: ceramic and glass are dense). Born at the lid,
     120..230 px in from the right (the tune's dropAhead), at 300 a
     glass crosses his column in the air at speedMax. The gifts drift
     down slower so they can be caught. */
  var DROP_GRAV = 190;
  var SPLAT_TIME = 1.5;
  var GIFT_GRAV = { verve: 170, pine: 170, origami: 150, robot: 150 };
  var CAN_SHARE = 0.62;
  /* where each kind's centre is when its foot meets the shelf */
  var LAND_OFF = { can: 6, tumbler: 7, verve: 9, pine: 7, origami: 7, robot: 9 };

  var T = {};                                  /* baked tiles and sprites */

  /* --------------------------------------------------------- helpers */

  function rect(c, x, y, w, h, col) {
    if (w <= 0 || h <= 0) return;
    c.fillStyle = col; c.fillRect(x, y, w, h);
  }
  function dot(c, x, y, col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }

  /* a colour as [r, g, b]: a '#rrggbb' or an 'rgb(r, g, b)' (what mix()
     and css() hand back), so mixes can be chained */
  function hexRGB(hex) {
    if (hex.charAt(0) !== '#') {
      var m = hex.match(/[\d.]+/g);
      return [+m[0], +m[1], +m[2]];
    }
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  function mixRGB(a, b, k) {
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
  }
  function css(c) {
    return 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')';
  }
  function mix(a, b, k) { return css(mixRGB(hexRGB(a), hexRGB(b), k)); }

  /* a sheet painted pixel by pixel: fn returns [r, g, b] or null */
  function pixelSheet(w, h, fn) {
    var t = makeCanvas(w, h), img = t.ctx.createImageData(w, h), d = img.data;
    var x, y, p, i = 0;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        p = fn(x, y);
        if (p) {
          d[i] = Math.round(clamp(p[0], 0, 255));
          d[i + 1] = Math.round(clamp(p[1], 0, 255));
          d[i + 2] = Math.round(clamp(p[2], 0, 255));
          d[i + 3] = p.length > 3 ? Math.round(clamp(p[3], 0, 1) * 255) : 255;
        }
        i += 4;
      }
    }
    t.ctx.putImageData(img, 0, 0);
    return t;
  }

  /* The 1 px outline laid UNDER everything painted on a sprite so far,
     in a colour of our choosing: the house's dark warm grey round glass
     and wood, and a hair LIGHTER than the body round anything black, so
     a black mug still rings against the panel. Notches keep their
     insides (the Table's ringUnder). */
  function ringUnder(t, col) {
    var ring = makeCanvas(t.w, t.h), c = ring.ctx;
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) { c.drawImage(t.canvas, d[0], d[1]); });
    c.globalCompositeOperation = 'source-in';
    c.fillStyle = col || P.outline;
    c.fillRect(0, 0, t.w, t.h);
    c.globalCompositeOperation = 'source-over';
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }

  /* lay a colour over the PAINTED pixels of a sheet only */
  function tintAtop(t, col, a) {
    t.ctx.globalCompositeOperation = 'source-atop';
    t.ctx.fillStyle = rgba(col, a);
    t.ctx.fillRect(0, 0, t.w, t.h);
    t.ctx.globalCompositeOperation = 'source-over';
  }

  /* a small sprite as a grid of characters, one to the pixel */
  function paintGrid(c, rows, x, y, pal) {
    for (var j = 0; j < rows.length; j++) {
      for (var i = 0; i < rows[j].length; i++) {
        var col = pal[rows[j].charAt(i)];
        if (col) dot(c, x + i, y + j, col);
      }
    }
  }

  /* a sheet turned a quarter, by copying pixels (so nothing is resampled) */
  function quarterTurn(src) {
    var t = makeCanvas(src.h, src.w);
    var a = src.ctx.getImageData(0, 0, src.w, src.h), b = t.ctx.createImageData(src.h, src.w);
    for (var y = 0; y < src.h; y++) {
      for (var x = 0; x < src.w; x++) {
        var si = (y * src.w + x) * 4, di = ((x) * src.h + (src.h - 1 - y)) * 4;
        b.data[di] = a.data[si]; b.data[di + 1] = a.data[si + 1];
        b.data[di + 2] = a.data[si + 2]; b.data[di + 3] = a.data[si + 3];
      }
    }
    t.ctx.putImageData(b, 0, 0);
    return t;
  }

  /* A STANDING STACK IS TILED FROM ITS CAP DOWNWARD, A HANGING ONE FROM
     ITS CAP UPWARD, so the glass at the mouth of the gap is always whole
     and the cut is always at a kill edge (the Fridge's columnDown and
     columnUp). `off` starts the tile a whole element in, so two stacks
     of the same glasses are not the same tower. */
  function columnDown(ctx, tile, x, y, h, off) {
    var th = tile.height, w = tile.width, drawn = 0, start = off || 0, slice;
    while (drawn < h) {
      slice = Math.min(th - start, h - drawn);
      ctx.drawImage(tile, 0, start, w, slice, x, y + drawn, w, slice);
      drawn += slice; start = 0;
    }
  }
  function columnUp(ctx, tile, x, y, h, off) {
    var th = tile.height, w = tile.width, drawn = 0, end = th - (off || 0), slice;
    while (drawn < h) {
      slice = Math.min(end, h - drawn);
      ctx.drawImage(tile, 0, end - slice, w, slice, x, y + h - drawn - slice, w, slice);
      drawn += slice; end = th;
    }
  }

  /* ======================================================= THE ROOM

     THE TOP TIER OF HIS UPPERS, and the run of them behind the lane
     (BRIEF2): the camera is inside the top tier, flat and side-on, the
     cabinet's top board overhead, the top glass shelf underfoot, and as
     the run goes by it passes everything that is really up there, in its
     real order, at the bay's one scale (4.25 px a cm):
       CABINET A, the coffee gear (refs 5, 14): the tamper, the ROK lever
         press, the French press, the cold brew carafe with its steel
         filter, the Chemex with its wood collar and leather tie, the
         round glass bowl, the dried eucalyptus lying across them;
       CABINET B, the glassware (refs 4, 15): the slate mat with nine
         stemless glasses on it (one big, one tall), the small white dish,
         the bottle with its charm, the white jar with the black lid, the
         cut-glass decanter;
       THE RIGHT CORNER UNIT, the wooden robot alone on its board (refs
         10, 12) - the one breath in the lap;
       and the unit's side against A's left side panel, where the lap
         loops back to A: the bay's one fiction of place, as the Fridge's
         endless shelf is.

     THREE LAYERS AND TWO STRIPS:
       L0 THE BACK, 0.80, a 624 tile (0.8 x the 780 lap): the cabinets'
          back panel with the hanging cleat along the top and the panel's
          light - only what runs uniformly behind the whole lap.
       THE STRUCTURE, 1.00, drawn first into L1's sheet: the side panels
          with their pin holes and top hinges, the partition's hairline,
          the corner unit's wall and side, the cleat's screws, the clips -
          at the things' own speed, so nothing slides across a wall.
       L1 THE SHELF ROW, 1.00, one 780 sheet: his things, standing on the
          same shelf as the stacks, so at the stacks' speed. Harmless, no
          boxes, and drawn from the SCENERY sub-palette only (118..210, no
          white, no black, no outline), so everything in the lane rings
          against it.
       THE LID, 1.00: the face frame's top rail, the top board edge on,
          and its dark underside - the kill line.
       THE GROUND, the shelf's edge at 1.00 (glass under the cabinets, the
          units' cream boards under the units), and under it at 0.80 THE
          TIER BELOW, where the caustic rings really are (refs 3, 7: the
          light through the glasses on this shelf, thrown on the middle
          tier's panel right under it) and where the pothos climbs.

     Every scrolling layer is tiled from a lap left of the screen to past
     its right edge, at its own parallax, so nothing pops in (the
     Fridge's 50 px lesson). */

  /* the panel's colour on a screen row, and CLEAR GLASS in front of it:
     the panel seen through a cool green-grey tint, so glass scenery is
     darker and cooler than what is behind it and its fill follows the
     panel's light down its height - never a white silhouette */
  var PTOP = hexRGB(P.panelTop), PLIT = hexRGB(P.panelLit), GTINT = hexRGB(P.scGlassTint);
  function panelRGB(row) {
    return mixRGB(PTOP, PLIT, ease(clamp((row - PANEL_ROW0) / (FLOOR - 1 - PANEL_ROW0), 0, 1)));
  }
  function glassAt(row, k) { return css(mixRGB(panelRGB(row), GTINT, k === undefined ? 0.42 : k)); }

  /* ------------------------------------------------- L0, THE BACK

     624 x 218 at 0.80: the cabinets' back panel as it runs behind the
     whole lap - the hanging cleat along its top in the top board's
     shadow, the cleat's own shadow line, then the panel's light, one
     gradient from under the cleat to the shelf. Nothing on it that
     belongs to one section: what does (the side panels, the corner unit's
     wall, the screws, the clips, the hinges) stands at 1.00 with the
     things it holds, in THE STRUCTURE below - so a thing on the shelf
     never slides across a wall it stands beside. */
  function bakeBack() {
    var W = BACK_LAP, H = LANE_H, t = makeCanvas(W, H), c = t.ctx, y;
    for (y = 0; y < H; y++) {
      var row = CEIL + y, col;
      if (row === 24) col = P.cleatLit;
      else if (row < 37) col = P.cleat;
      else if (row === 37) col = P.cleatShade;
      else if (row === 38) col = mix(P.cleatShade, P.panelTop, 0.5);
      else col = css(panelRGB(row));
      rect(c, 0, y, W, 1, col);
    }
    return t;
  }

  /* a side panel's strip: the cabinets' cream, a shade line at each side,
     the column of shelf-pin holes, the top cup hinge's plate */
  function sidePanel(c, x0, w, y0, H, hinge) {
    var y;
    rect(c, x0, y0, w, H, K.cabinet);
    rect(c, x0, y0, 1, H, K.cabinetShade);
    rect(c, x0 + w - 1, y0, 1, H, K.cabinetShade);
    for (y = 44; y <= 230; y += 14) {
      if (y - CEIL + 1 < H) rect(c, x0 + (w >> 1) - 1, y0 + y - CEIL, 2, 2, P.cleatShade);
    }
    if (hinge) {
      var hx = x0 + ((w - 6) >> 1), hy = y0 + 30 - CEIL;
      rect(c, hx, hy, 6, 12, P.scSteel);
      rect(c, hx, hy, 6, 1, P.scSteelLit);
      rect(c, hx, hy, 1, 12, P.scSteelLit);
      rect(c, hx + 5, hy + 1, 1, 11, P.scSteelShade);
      rect(c, hx + 1, hy + 11, 5, 1, P.scSteelShade);
      dot(c, hx + 2, hy + 3, P.scSteelDeep); dot(c, hx + 3, hy + 8, P.scSteelDeep);
    }
  }

  /* THE STRUCTURE, at 1.00, drawn first into the shelf row's sheet: the
     right corner unit's wall (open to the room, a shade brighter, its own
     board's shade along the top) and its side meeting A's left side panel
     at the lap's seam, the partition (A's right and B's left back to back,
     the hairline between them, a hinge on each), B's end panel; on the
     cabinets' backs the cleat's screws (two in
     A's, at a third and two thirds; one in B's, at the middle - refs 5,
     4) and the clear shelf clips at the glass shelf's rear corners. */
  function bakeStructure(c) {
    var H = LANE_H, y;
    var x0 = SEC.rUnit[0], w = SEC.rUnit[1] - x0;
    for (y = 0; y < H; y++) {
      var a = y < 10 ? 0.35 * (1 - y / 10) : 0;
      rect(c, x0, y, w, 1, mix(P.unitWall, P.unitWallShade, a));
    }
    rect(c, x0 + w - 3, 0, 3, H, P.unitWallShade);
    /* the unit's own side, against A's left side panel at the lap's seam */
    rect(c, SEC.uR[0], 0, 8, H, K.cabinet);
    rect(c, SEC.uR[0], 0, 1, H, K.cabinetShade); rect(c, SEC.uR[0] + 7, 0, 1, H, K.cabinetDeep);
    sidePanel(c, SEC.aL[0], 8, 0, H, true);
    sidePanel(c, SEC.part[0], 7, 0, H, true);
    sidePanel(c, SEC.part[0] + 9, 7, 0, H, true);
    rect(c, SEC.part[0] + 7, 0, 2, H, K.cabinetShade);
    rect(c, SEC.part[0] + 8, 0, 1, H, K.cabinetDeep);
    sidePanel(c, SEC.bR[0], 8, 0, H, true);
    [SEC.A[0] + 102, SEC.A[0] + 204, SEC.B[0] + 153].forEach(function (sx) {
      rect(c, sx, 30 - CEIL, 2, 2, P.scSteelShade);
      dot(c, sx, 30 - CEIL, P.scSteelLit);
    });
    [SEC.A[0] + 1, SEC.A[1] - 4, SEC.B[0] + 1, SEC.B[1] - 4].forEach(function (cx) {
      rect(c, cx, H - 6, 3, 5, P.scGlassShade);
      rect(c, cx, H - 6, 3, 1, P.scGlassHi);
    });
  }
  /* --------------------------------- THE TIER BELOW, under the glass

     624 x 21 at 0.80, rows 249..269: the middle tier's back panel in the
     shelf's shade, and on it THE CAUSTIC RINGS - soft part-arcs of light,
     brightest at the bottom of the lower curve, a faint glow inside, a
     little over the panel's own tone - loosely gathered under where the
     glass things stand on this shelf (A's clear vessels, B's glasses, the
     bottle and the decanter: v = 0.8 u of them). Light on a far panel
     stays on the panel, so they are at the panel's 0.80; whole, never cut
     by the screen's edge. Over it at 1.00 the
     tier's structure (bakeUnderStructure): the units' cream middle
     compartments in their boards' shade, the side panels running on
     down, and under the right unit the pothos's
     stems climbing toward the board (ref 11), the bay's only green. */
  /* where the glass things stand, at the panel's 0.80 (v = 0.8 u):
     A's clear vessels, B's glasses, the bottle and the decanter */
  var RING_CLUSTERS = [[128, 223, 4], [277, 420, 5], [418, 507, 3]];

  function bakeUnderShelf() {
    var W = BACK_LAP, H = STRIP_H, r = mulberry32(4404), i, j, tries;
    var MID = hexRGB(P.panelMid), LO = hexRGB(P.panelMidLo), GLOW = hexRGB(P.ringGlow);
    var rings = [];
    for (j = 0; j < RING_CLUSTERS.length; j++) {
      var cl = RING_CLUSTERS[j], got = 0;
      for (tries = 0; got < cl[2] && tries < 800; tries++) {
        var a = 9 + r() * 7, b = 2.4 + r() * 1.6;
        var cx = cl[0] + a + r() * (cl[1] - cl[0] - 2 * a), cy = b + 2 + r() * (H - 2 * b - 4.5);
        var ok = true;
        for (i = 0; i < rings.length && ok; i++) {
          var q = rings[i], dx = (cx - q.x) / (a + q.a), dy = (cy - q.y) / (b + q.b);
          /* loose: no two touching, so they read as light, not a chain */
          if (dx * dx + dy * dy < 1.3) ok = false;
        }
        if (!ok) continue;
        rings.push({ x: cx, y: cy, a: a, b: b, al: 0.30 + r() * 0.16, top: r() < 0.4 ? 0.10 : 0 });
        got++;
      }
    }
    var t = pixelSheet(W, H, function (x, yy) {
      var c = mixRGB(MID, LO, yy / (H - 1));
      for (var m = 0; m < rings.length; m++) {
        var R = rings[m];
        var ex = (x + 0.5 - R.x) / R.a, ey = (yy + 0.5 - R.y) / R.b, e2 = ex * ex + ey * ey;
        if (e2 < 1) c = mixRGB(c, GLOW, 0.09 * (1 - e2) * (0.5 + 0.5 * clamp(ey + 0.5, 0, 1)));
      }
      return c;
    });
    /* each ring a part-arc of light: brightest at the bottom of its lower
       curve where the glass's foot focuses it, fading up its sides, the
       upper curve gone or barely there - light, a little over the panel's
       own tone, never a white loop */
    var c = t.ctx, k;
    for (i = 0; i < rings.length; i++) {
      var Rg = rings[i], seen = {}, steps = Math.ceil(TAU * Rg.a * 3);
      for (k = 0; k < steps; k++) {
        var th = k / steps * TAU, sn = Math.sin(th);
        var px = Math.floor(Rg.x + Rg.a * Math.cos(th)), py = Math.floor(Rg.y + Rg.b * sn);
        if (seen[px + ',' + py]) continue;
        seen[px + ',' + py] = 1;
        var al = sn > -0.15 ? Rg.al * (0.25 + 0.75 * clamp(sn, 0, 1)) : Rg.top;
        if (al <= 0.02) continue;
        c.fillStyle = rgba(P.ring, al);
        c.fillRect(px, py, 1, 1);
      }
    }
    T.ringCount = rings.length;
    return t;
  }

  function bakeUnderStructure() {
    var H = STRIP_H, t = makeCanvas(LAP, H), c = t.ctx, y;
    for (y = 0; y < H; y++) {
      var col = y < 2 ? P.under : mix(P.unitWall, P.under, 0.25 * clamp(1 - (y - 2) / 7, 0, 1));
      rect(c, SEC.rUnit[0], y, SEC.rUnit[1] - SEC.rUnit[0], 1, col);
    }
    rect(c, SEC.rUnit[1] - 3, 2, 3, H - 2, P.unitWallShade);
    [[SEC.aL[0], 8], [SEC.part[0], 7], [SEC.part[0] + 9, 7], [SEC.bR[0], 8], [SEC.uR[0], 8]].forEach(function (sp) {
      rect(c, sp[0], 0, sp[1], H, K.cabinet);
      rect(c, sp[0], 0, 1, H, K.cabinetShade); rect(c, sp[0] + sp[1] - 1, 0, 1, H, K.cabinetShade);
    });
    rect(c, SEC.part[0] + 7, 0, 2, H, K.cabinetShade);
    rect(c, SEC.part[0] + 8, 0, 1, H, K.cabinetDeep);
    /* THE POTHOS climbing toward the right unit's board */
    [[R0 + 90, 0.18], [R0 + 109, 0.30]].forEach(function (st, n) {
      for (y = H - 1; y >= 3; y--) {
        var sx = Math.round(st[0] + (H - 1 - y) * st[1]);
        dot(c, sx, y, P.scStem);
        if ((y + n * 3) % 6 === 2 && y < H - 2) {
          var side = ((y >> 1) + n) % 2 ? 1 : -6;
          heartLeaf(c, sx + side, y - 3);
        }
      }
    });
    return t;
  }
  function heartLeaf(c, x, y) {
    rect(c, x + 1, y, 1, 1, P.scLeafLit); rect(c, x + 4, y, 1, 1, P.scLeafLit);
    rect(c, x, y + 1, 6, 1, P.scLeafLit);
    rect(c, x, y + 2, 6, 1, P.scLeaf);
    rect(c, x + 1, y + 3, 4, 1, P.scLeaf);
    rect(c, x + 2, y + 4, 2, 1, P.scLeafDeep);
    rect(c, x + 2, y + 1, 1, 3, P.scLeafDeep);
  }

  /* --------------------------------------------- THE LID, THE GROUND */

  /* THE LID, 780 x 24 at 1.00, rows 0..23: what is over the top tier -
       0..13   the face frame's top rail, cream, lit along its top, its
               lower arris in shade
       14..22  THE TOP BOARD edge on, lit along its front, shaded under
       23      its dark underside edge: THE KILL LINE, the Fridge's
               lidArris rule (a dark line under the pale)
     with the board's edge grain flecked along row 22, a lap's worth, so
     the lid visibly travels. */
  function bakeLid() {
    var t = makeCanvas(LAP, CEIL), c = t.ctx, r = mulberry32(4402), i;
    rect(c, 0, 0, LAP, 14, K.cabinet);
    rect(c, 0, 0, LAP, 1, K.cabinetLit);
    rect(c, 0, 13, LAP, 1, K.cabinetShade);
    rect(c, 0, 14, LAP, 1, P.boardLit);
    rect(c, 0, 15, LAP, 7, P.board);
    rect(c, 0, 22, LAP, 1, P.boardShade);
    rect(c, 0, 23, LAP, 1, P.arris);
    for (i = 0; i < 30; i++) {
      var x = Math.floor(r() * LAP), len = 1 + Math.floor(r() * 3);
      rect(c, x, 22, Math.min(len, LAP - x), 1, K.cabinetDeep);
    }
    return t;
  }

  /* THE SHELF'S EDGE, 780 x 7 at 1.00, rows 242..248. Under the cabinets
     the top glass shelf, continuous through A and B: its top seen edge
     on (THE KILL ROW, the brightest line on the screen), the green edge,
     its shadow; the bubbles in the float glass, so it travels. Under the
     units and the seam, their cream boards - the kill row bright there
     too - meeting the glass's end in a hard cut. */
  function bakeGroundEdge() {
    var t = makeCanvas(LAP, EDGE_H), c = t.ctx, r = mulberry32(4403), i;
    var G0 = SEC.aL[0], G1 = SEC.rUnit[0];
    rect(c, 0, 0, LAP, 1, P.boardLit);
    rect(c, 0, 1, LAP, 5, P.board);
    rect(c, 0, 6, LAP, 1, P.boardShade);
    rect(c, G0, 0, G1 - G0, 1, P.shelfLine);
    rect(c, G0, 1, G1 - G0, 1, P.gEdge0);
    rect(c, G0, 2, G1 - G0, 1, P.gEdge1);
    rect(c, G0, 3, G1 - G0, 1, P.gEdge2);
    rect(c, G0, 4, G1 - G0, 1, P.gEdge3);
    rect(c, G0, 5, G1 - G0, 2, P.under);
    rect(c, LAP - 1, 1, 1, 6, P.under); rect(c, G1, 1, 1, 6, P.under);
    for (i = 0; i < 44; i++) {
      var x = G0 + Math.floor(r() * (G1 - G0 - 3)), len = 1 + Math.floor(r() * 3);
      rect(c, x, 1 + (r() < 0.6 ? 0 : 1), len, 1, r() < 0.5 ? '#ffffff' : mix(P.gEdge0, '#ffffff', 0.5));
      if (r() < 0.3) dot(c, x + 1, 3, P.gEdge1);
    }
    return t;
  }

  /* ------------------------------------------- L1, HIS THINGS

     Each thing is its own bake, at the bay's scale from the photographs
     (BRIEF2 section 1, appendix B), placed on the sheet at its lap
     position u and its top row, with its foot on the shelf (row 241) or
     on the slate (row 237). Materials, inside the scenery band:
       CHROME AND POLISHED STEEL as hard vertical bands of light and dark
         side by side - what makes chrome chrome at any size;
       CLEAR GLASS as the panel through the tint, a darker edge line and
         a light streak where the room's light catches it, the thick base
         deeper;
       the Chemex's pale WOOD with its grain and its LEATHER tie, the
         decanter's FACETS as a cut lattice of light and shade lines.
     Each carries a 2 px shadow down its right side, the stacks' own. */
  var SL = P.scSteelLit, SS0 = P.scSteel, SM = P.scSteelMid, SSH = P.scSteelShade, SD = P.scSteelDeep;

  /* fill a w x h block column by column from a pattern across it */
  function bands(c, x0, y0, w, h, pat) {
    for (var i = 0; i < w; i++) rect(c, x0 + i, y0, 1, h, pat[Math.min(pat.length - 1, Math.floor(i * pat.length / w))]);
  }

  /* a polished arm along a path: lit on the side toward the upper left,
     deep on the other, round at both ends */
  function steelPath(c, W, H, pts, r) {
    for (var y = 0; y < H; y++) {
      for (var x = 0; x < W; x++) {
        var best = 1e9, bs = 0, px = x + 0.5, py = y + 0.5;
        for (var k = 0; k + 1 < pts.length; k++) {
          var ax = pts[k][0], ay = pts[k][1], bx = pts[k + 1][0], by = pts[k + 1][1];
          var dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
          var tt = clamp(((px - ax) * dx + (py - ay) * dy) / L2, 0, 1);
          var qx = ax + tt * dx, qy = ay + tt * dy, d = Math.sqrt((px - qx) * (px - qx) + (py - qy) * (py - qy));
          if (d < best) {
            best = d;
            var L = Math.sqrt(L2), nx = -dy / L, ny = dx / L;
            /* the side toward the upper left is the lit one */
            if (nx + ny > 0) { nx = -nx; ny = -ny; }
            bs = ((px - qx) * nx + (py - qy) * ny) / r;
          }
        }
        if (best > r) continue;
        dot(c, x, y, bs > 0.45 ? SL : (bs > 0.05 ? SS0 : (bs > -0.5 ? SM : SD)));
      }
    }
  }

  /* a clear vessel: prof[j] = [left inset, right inset] for each row j
     from y0; its fill the panel through the glass on its screen row */
  function clearBody(c, top, x0, w, y0, prof, o) {
    o = o || {};
    for (var j = 0; j < prof.length; j++) {
      var L = prof[j][0], R = prof[j][1];
      if (L < 0) continue;
      var xa = x0 + L, xb = x0 + w - 1 - R, row = top + y0 + j;
      var kk = o.k === undefined ? 0.32 : o.k;
      var base = hexRGB(glassAt(row, kk)), HI = hexRGB(P.scGlassHi), DEEP = hexRGB(glassAt(row, kk + 0.25));
      for (var x = xa; x <= xb; x++) {
        /* round glass: the near third catches a soft band of the room's
           light, the far third is the glass's thickness seen at a slant */
        var tt = (x - xa) / Math.max(1, xb - xa), col = base;
        if (tt > 0.12 && tt < 0.34) col = mixRGB(base, HI, 0.18);
        else if (tt > 0.78) col = mixRGB(base, DEEP, 0.6);
        dot(c, x, y0 + j, css(col));
      }
      if (xb - xa > 4) dot(c, xa + 1, y0 + j, css(mixRGB(base, HI, 0.5)));
      dot(c, xa, y0 + j, P.scGlassEdge); dot(c, xb, y0 + j, P.scGlassEdge);
    }
  }

  function piece(w, h, top, u, paint) {
    var t = makeCanvas(w, h);
    paint(t.ctx, top);
    t.u = u; t.top = top;
    return t;
  }

  /* THE ROK LEVER ESPRESSO PRESS (ref 5; zoom2/A_top_espresso.jpg), side
     on as it stands: the crowned drum at the top right with its window
     and the grille behind it, the pivot, the front lever sweeping down
     and left in a swan's neck to its handle over the tamper, the back
     lever in shade behind it, the piston's chrome column, the frame
     column at the right, the portafilter's cup and black handle on the
     base plate. An open frame: the panel shows through it. 72 x 123. */
  function bakeRok() {
    return piece(72, 123, 119, A0 + 44, function (c, top) {
      /* the back lever, in shade */
      var back = makeCanvas(72, 123);
      steelPath(back.ctx, 72, 123, [[40, 42], [27, 53], [21, 70], [18, 88], [17, 111]], 2.2);
      tintAtop(back, P.scSteelDeep, 0.45);
      c.drawImage(back.canvas, 0, 0);
      /* the frame column at the right */
      bands(c, 63, 23, 7, 90, [SL, SS0, SS0, SM, SSH, SD, SD]);
      /* the piston's column, and the bar across to the frame */
      bands(c, 37, 32, 10, 67, [SD, SL, SL, SS0, SS0, SM, SM, SSH, SSH, SD]);
      rect(c, 37, 32, 10, 1, SL);
      rect(c, 44, 44, 25, 1, SL); rect(c, 44, 45, 25, 2, SS0); rect(c, 44, 47, 25, 1, SD);
      /* the dark mechanism under the drum, round the pivot */
      rect(c, 38, 25, 26, 19, SD);
      rect(c, 38, 25, 26, 1, SSH);
      rect(c, 38, 25, 2, 19, SM);
      rect(c, 48, 30, 10, 10, SSH); rect(c, 48, 30, 10, 1, SM);
      /* the drum: its crown, its window with the grille behind, its band */
      rect(c, 38, 0, 30, 1, SL);
      rect(c, 36, 1, 34, 1, SS0);
      bands(c, 35, 2, 36, 3, [SD, SL, SL, SS0, SS0, SM, SL, SS0, SM, SSH, SD]);
      for (var y = 5; y < 20; y++) rect(c, 35, y, 36, 1, glassAt(top + y, 0.55));
      for (var gx = 39; gx < 68; gx += 5) rect(c, gx, 7, 1, 11, SSH);
      rect(c, 37, 6, 1, 13, SL);
      rect(c, 35, 5, 1, 15, SM); rect(c, 70, 5, 1, 15, SD);
      bands(c, 35, 20, 36, 4, [SM, SL, SS0, SS0, SM, SM, SSH, SD]);
      rect(c, 35, 24, 36, 1, SD);
      /* the front lever, the swan's neck */
      var arm = makeCanvas(72, 123);
      steelPath(arm.ctx, 72, 123, [[64, 25], [46, 29], [31, 38], [19, 49], [11, 62], [6, 73], [5, 78]], 3.0);
      c.drawImage(arm.canvas, 0, 0);
      /* the pivot's boss */
      rect(c, 55, 24, 5, 5, SS0); rect(c, 55, 24, 5, 1, SL); rect(c, 55, 24, 1, 5, SL);
      dot(c, 57, 26, SD); rect(c, 59, 25, 1, 4, SSH);
      /* the portafilter's cup on the base, and its black handle */
      rect(c, 19, 96, 22, 2, SM); rect(c, 20, 96, 9, 1, SL);
      for (y = 98; y < 111; y++) {
        var ins = Math.round(Math.max(0, y - 104) * 0.6);
        rect(c, 18 + ins, y, 23 - 2 * ins, 1, y < 100 ? SSH : SD);
      }
      rect(c, 21, 99, 2, 9, SM);
      rect(c, 41, 106, 19, 6, P.scBlack); rect(c, 41, 106, 19, 1, P.scBlackLit);
      /* the base plate, its left end rounded */
      rect(c, 11, 113, 60, 1, SL);
      rect(c, 9, 114, 63, 7, SS0);
      bands(c, 9, 115, 63, 5, [SM, SL, SS0, SS0, SM, SS0, SL, SS0, SM, SSH]);
      rect(c, 10, 121, 61, 2, SD);
    });
  }

  /* THE TAMPER, chrome, a knob, a waisted stem and a wide foot, in front
     of the press's lever (ref 5). 25 x 34. */
  function bakeTamper() {
    return piece(25, 34, 208, A0 + 34, function (c) {
      var PAT = [SD, SM, SL, SL, SS0, SS0, SM, SM, SSH, SD];
      bands(c, 3, 0, 19, 1, PAT); bands(c, 1, 1, 23, 6, PAT); bands(c, 3, 7, 19, 1, PAT);
      rect(c, 3, 1, 19, 1, SL);
      for (var y = 8; y < 26; y++) {
        var w = (y > 12 && y < 21) ? 9 : 11;
        bands(c, 12 - (w >> 1), y, w, 1, PAT);
      }
      bands(c, 1, 26, 23, 1, PAT); bands(c, 0, 27, 25, 6, PAT); bands(c, 1, 33, 23, 1, PAT);
      rect(c, 1, 27, 23, 1, SL);
    });
  }

  /* THE COLD BREW CARAFE (ref 5; zoom2/A_top_coldbrew.jpg): a tapered
     clear carafe, narrow at the shoulder and wide at the foot, its flat
     steel lid and the black rubber band under it, the perforated steel
     filter tube standing in it nearly to the foot, seen through the
     glass, and its glass loop handle on its LEFT - the loop the French
     press stands in front of. 49 x 102. */
  function bakeColdBrew() {
    return piece(49, 102, 140, A0 + 152, function (c, top) {
      var cx = 28, y, prof = [];
      for (y = 10; y < 102; y++) {
        var hw = Math.round(15 + 5 * (y - 10) / 91);
        prof.push([cx - hw, 49 - 1 - (cx + hw - 1)]);
      }
      clearBody(c, top, 0, 49, 10, prof);
      /* the filter inside, through the glass */
      var FP = [SM, SL, SL, SS0, SS0, SS0, SL, SS0, SS0, SM, SS0, SS0, SM, SM, SS0, SM, SM, SSH];
      for (y = 11; y < 93; y++) {
        for (var x = 0; x < 21; x++) {
          var col = FP[Math.floor(x * FP.length / 21)];
          if (y % 2 && x > 2 && x < 19) col = mix(col, SSH, 0.22);
          dot(c, 18 + x, y, mix(col, P.scGlassTint, 0.10));
        }
      }
      rect(c, 18, 90, 21, 3, mix(SM, P.scGlassTint, 0.2));
      /* the glass again over it: the streak, the far side, the thick base */
      rect(c, cx - 13, 14, 1, 40, P.scGlassHi);
      for (y = 96; y < 102; y++) {
        var hw2 = Math.round(15 + 5 * (y - 10) / 91);
        rect(c, cx - hw2 + 1, y, 2 * hw2 - 2, 1, y === 96 ? P.scGlassHi : P.scGlassDeep);
      }
      /* the lid and the black band */
      rect(c, 13, 0, 30, 1, SL);
      bands(c, 13, 1, 30, 5, [SM, SL, SL, SS0, SS0, SM, SM, SSH, SD]);
      rect(c, 13, 6, 30, 2, SD);
      rect(c, 14, 8, 28, 3, P.scBlack); rect(c, 14, 8, 28, 1, P.scBlackLit);
      /* the handle, a loop of glass out to the left */
      var hp = [[13, 16], [6, 18], [2, 26], [1, 38], [3, 50], [8, 60], [13, 63]];
      for (var k = 0; k + 1 < hp.length; k++) {
        var a = hp[k], b = hp[k + 1], n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]));
        for (var s = 0; s <= n; s++) {
          var hx = Math.round(a[0] + (b[0] - a[0]) * s / n), hy = Math.round(a[1] + (b[1] - a[1]) * s / n);
          dot(c, hx, hy, P.scGlassEdge); dot(c, hx + 1, hy, P.scGlassHi);
        }
      }
    });
  }

  /* THE FRENCH PRESS (ref 5; zoom2/A_top_frenchpress.jpg): a polished
     steel cylinder - the room's light in hard vertical bands down it -
     its domed lid with the plunger's rod and flat knob rising out of it,
     the pouring lip at its top right, the foot ring. 49 x 117. */
  var FRENCH = [SD, SSH, SM, SL, SL, SL, SS0, SS0, SM, SSH, SSH, SM, SS0, SL, SL, SS0, SM, SM, SS0, SS0, SS0,
                SM, SM, SSH, SM, SS0, SS0, SM, SM, SSH, SSH, SM, SS0, SM, SSH, SSH, SD, SSH, SM, SSH, SD, SD];
  function bakeFrenchPress() {
    return piece(49, 117, 125, A0 + 112, function (c) {
      bands(c, 0, 25, 42, 89, FRENCH);
      rect(c, 0, 114, 42, 1, SSH); rect(c, 0, 115, 42, 2, SD);
      /* the dome of the lid and its rim */
      bands(c, 4, 19, 34, 1, FRENCH); bands(c, 2, 20, 38, 1, FRENCH);
      bands(c, 0, 21, 42, 3, FRENCH);
      rect(c, 4, 19, 34, 1, SL); rect(c, 0, 21, 42, 1, SL);
      rect(c, 0, 24, 42, 1, SD);
      /* the lip */
      rect(c, 42, 21, 5, 2, SS0); rect(c, 42, 21, 5, 1, SL); rect(c, 42, 23, 3, 2, SM); dot(c, 47, 22, SSH);
      /* the rod and the knob */
      rect(c, 20, 3, 2, 16, SS0); rect(c, 20, 3, 1, 16, SL);
      rect(c, 15, 0, 12, 1, SL); rect(c, 15, 1, 12, 1, SS0); rect(c, 15, 2, 12, 1, SSH);
    });
  }

  /* THE CHEMEX (ref 5; zoom2/A_top_chemex_bowl.jpg): the clear hourglass
     flask - a wide funnel above, the rim's spout at the left, the pour
     channel down its right side - and at its waist the pale WOOD collar,
     pinched in the middle, its grain and the gap at the front, the brown
     LEATHER tie round it with its knot and tails at the left. Its lower
     bulb stands behind the bowl. 60 x 101 (from row 141: the spout). */
  function bakeChemex() {
    return piece(60, 101, 141, A0 + 202, function (c, top) {
      var cx = 30, y, prof = [];
      /* rows 144..170 the funnel, 170..191 the waist in its collar, 191..241
         the lower bulb (behind the bowl) */
      for (y = 3; y < 101; y++) {
        var j = y - 3, hw;
        if (j <= 26) hw = 25 - 13 * j / 26;
        else if (j <= 47) hw = 12;
        else if (j <= 84) hw = 12 + 18 * Math.pow((j - 47) / 37, 0.7);
        else hw = 30 - 10 * Math.pow((j - 84) / 13, 2);
        hw = Math.round(hw);
        prof.push([cx - hw, 60 - (cx + hw)]);
      }
      clearBody(c, top, 0, 60, 3, prof);
      /* the rim, seen as the edge of a funnel: a lit line and its far
         edge under it; the spout lifting it at the left */
      rect(c, 6, 3, 48, 1, P.scGlassHi);
      rect(c, 7, 4, 46, 1, P.scGlassEdge);
      rect(c, 5, 1, 8, 1, P.scGlassHi); rect(c, 5, 2, 2, 2, P.scGlassHi); rect(c, 6, 2, 6, 1, P.scGlassEdge);
      /* the pour channel down the funnel's right side */
      rect(c, cx + 5, 5, 1, 24, P.scGlassHi); rect(c, cx + 7, 5, 1, 24, P.scGlassEdge);
      /* the streak down the funnel's left shoulder */
      for (y = 6; y < 26; y++) dot(c, Math.round(8 + (y - 6) * 0.48), y, P.scGlassHi);
      /* THE WOOD COLLAR, rows 29..50 of the piece (170..191) */
      for (y = 29; y < 51; y++) {
        var k2 = (y - 29) / 21, hwc = Math.round(18 - 3 * Math.sin(Math.PI * k2));
        for (var x = cx - hwc; x < cx + hwc; x++) {
          var col = P.scWood;
          if (hash(x * 7 + 3) % 5 === 0) col = mix(P.scWood, P.scWoodDeep, 0.35);
          if (x < cx - hwc + 6) col = mix(col, P.scWoodLit, 0.6);
          if (x > cx + hwc - 4) col = mix(col, P.scWoodDeep, 0.45);
          dot(c, x, y, col);
        }
        dot(c, cx - hwc, y, P.scWoodDeep); dot(c, cx + hwc - 1, y, P.scWoodDeep);
        /* the gap between the two halves, the glass showing in it */
        rect(c, cx + 5, y, 2, 1, glassAt(top + y));
      }
      rect(c, cx - 18, 29, 36, 1, P.scWoodLit);
      rect(c, cx - 18, 50, 36, 1, P.scWoodDeep);
      /* THE LEATHER TIE, its knot and its tails */
      rect(c, cx - 15, 39, 30, 2, P.scLeather);
      rect(c, cx - 17, 38, 3, 3, P.scLeather);
      for (y = 41; y < 49; y++) dot(c, cx - 17 - ((y - 41) >> 2), y, P.scLeather);
      dot(c, cx - 20, 47, P.scLeather);
    });
  }

  /* THE ROUND GLASS BOWL in front of the Chemex's foot: a clear sphere
     cut flat at the foot, open at the top - its mouth an ellipse of lit
     and dark rim - the eucalyptus standing in it. 55 x 51. */
  function bakeBowl() {
    return piece(55, 51, 191, A0 + 216, function (c, top) {
      var cx = 27.5, y, prof = [];
      for (y = 2; y < 51; y++) {
        var hw = y >= 48 ? 20 : Math.min(27, Math.sqrt(Math.max(0, 27.5 * 27.5 - Math.pow(y - 25, 2))));
        if (y < 6) hw = Math.min(hw, 20 + (y - 2));
        hw = Math.round(hw);
        prof.push([Math.round(cx - hw), Math.round(55 - (cx + hw))]);
      }
      clearBody(c, top, 0, 55, 2, prof);
      /* the mouth */
      for (var x = 8; x < 47; x++) {
        var e = Math.sqrt(Math.max(0, 1 - Math.pow((x + 0.5 - cx) / 19.5, 2)));
        dot(c, x, Math.round(3 - 2 * e), P.scGlassHi);
        dot(c, x, Math.round(3 + 2 * e), P.scGlassEdge);
      }
      for (y = 9; y < 30; y++) dot(c, Math.round(7 + (y - 9) * -0.12 + 2), y, P.scGlassHi);
      rect(c, 9, 49, 37, 2, P.scGlassDeep);
      rect(c, 12, 48, 31, 1, P.scGlassHi);
    });
  }

  /* THE DRIED EUCALYPTUS (zoom2/A_top_eucalyptus.jpg): silver-dollar
     leaves, round and grey-green, paired along three stems that leave
     the bowl's mouth and lie across the shelf - three to the left over the
     Chemex's foot toward the cold brew, one out to the right. It lies ON
     the shelf; it does not hang into the tier below (the first build's
     did: a phantom, gone). 145 x 32. */
  var EUC_STEMS = [
    [[89, 7], [64, 11], [38, 18], [12, 26], [2, 29]],
    [[89, 9], [60, 18], [32, 25], [10, 31]],
    [[88, 6], [70, 6], [50, 9], [30, 12]],
    [[91, 7], [108, 6], [126, 4], [143, 3]]
  ];
  function bakeEucalyptus() {
    return piece(145, 32, 210, A0 + 152, function (c) {
      for (var s = 0; s < EUC_STEMS.length; s++) {
        var pts = EUC_STEMS[s], dist = 0, nextLeaf = 3;
        for (var k = 0; k + 1 < pts.length; k++) {
          var a = pts[k], b = pts[k + 1];
          var n = Math.max(Math.abs(b[0] - a[0]), Math.abs(b[1] - a[1]));
          for (var j = 0; j <= n; j++) {
            var x = Math.round(a[0] + (b[0] - a[0]) * j / n), y = Math.round(a[1] + (b[1] - a[1]) * j / n);
            dot(c, x, y, P.scEucDeep);
            dist++;
            if (dist >= nextLeaf) {
              /* round leaves on alternate sides, every 7 px, each its own
                 grey, the way the dried silver dollar holds them */
              nextLeaf += 7;
              var hh = hash(s * 131 + dist * 17), up = Math.floor(dist / 7) % 2 === 0;
              eucLeaf(c, x - 3 + (hh % 3) - 1, up ? y - 6 : y + 1, (hh >>> 4) % 3, (hh >>> 6) % 2);
            }
          }
        }
      }
    });
  }
  function eucLeaf(c, x, y, tone, small) {
    var lit = [P.scEucLit, P.scEuc, mix(P.scEucLit, P.scEuc, 0.5)][tone];
    var body = [P.scEuc, mix(P.scEuc, P.scEucDeep, 0.35), P.scEuc][tone];
    if (small) {
      rect(c, x + 1, y + 1, 3, 1, lit); rect(c, x, y + 2, 5, 1, body); rect(c, x + 1, y + 3, 3, 1, body);
      dot(c, x + 4, y + 3, P.scEucDeep);
      return;
    }
    rect(c, x + 1, y, 4, 1, lit);
    rect(c, x, y + 1, 6, 1, lit);
    rect(c, x, y + 2, 6, 1, body);
    rect(c, x + 1, y + 3, 4, 1, body);
    dot(c, x + 5, y + 2, P.scEucDeep);
    dot(c, x + 2, y + 4, P.scEucDeep);
  }

  /* CABINET B ---------------------------------------------------------- */

  /* THE SLATE MAT the glasses stand on: a black slate board, its top
     edge catching the light. 179 x 4. */
  function bakeSlate() {
    return piece(179, 4, 238, B0 + 16, function (c) {
      rect(c, 0, 0, 179, 1, P.scSlateLit);
      rect(c, 0, 1, 179, 3, P.scSlate);
      rect(c, 0, 1, 1, 3, mix(P.scSlate, P.scSlateLit, 0.5));
      for (var i = 0; i < 9; i++) dot(c, 8 + hash(i * 31 + 4) % 160, 1 + hash(i * 17 + 2) % 3, P.scSlateLit);
    });
  }

  /* A STEMLESS GLASS (ref 4; zoom2/B_top_wineglasses.jpg): a rounded
     bowl, its rim a little narrower than its widest, drawing in to a flat
     base; the rim lit, a streak at the left, the thick base deeper. The
     prints are opaque on the glass - a saguaro, a yellow oval, a
     flamingo; the pineapple glass stands here PLAIN, because the
     pineapple is the sour gift's. w x h on the slate (row 237). */
  function stemless(w, h, u, print) {
    return piece(w, h, 238 - h, u, function (c, top) {
      /* the rim a little in, the belly full from a fifth of the way down
         to two thirds, then rounding in to the base (BRIEF2's 17 / 21 / 13
         for a small one), every turn eased so it reads as a curve */
      var prof = [], y, rimIn = Math.round(w * 0.1), baseIn = Math.round(w * 0.19);
      var wide0 = h * 0.2, wide1 = h * 0.62;
      for (y = 0; y < h; y++) {
        var ins = y < wide0 ? rimIn * Math.pow(1 - y / wide0, 1.6)
                : (y <= wide1 ? 0 : baseIn * Math.pow((y - wide1) / (h - 1 - wide1), 1.6));
        prof.push([Math.round(ins), Math.round(ins)]);
      }
      clearBody(c, top, 0, w, 0, prof);
      rect(c, rimIn + 2, 0, w - 2 * rimIn - 4, 1, P.scGlassEdge);
      dot(c, rimIn + 1, 1, P.scGlassHi); dot(c, w - rimIn - 2, 1, P.scGlassHi);
      rect(c, rimIn + 2, 2, w - 2 * rimIn - 4, 1, P.scGlassHi);
      rect(c, 3, 5, 1, Math.round(h * 0.34), P.scGlassHi);
      rect(c, 4, 6, 1, Math.round(h * 0.18), P.scGlassHi);
      rect(c, w - 5, 7, 1, Math.round(h * 0.12), P.scGlassHi);
      rect(c, baseIn, h - 2, w - 2 * baseIn, 2, P.scGlassDeep);
      var mx = (w >> 1), my = Math.round(h * 0.42);
      if (print === 'cactus') {
        rect(c, mx, my - 3, 1, 8, P.scCactus);
        rect(c, mx - 2, my - 1, 1, 3, P.scCactus); dot(c, mx - 1, my + 1, P.scCactus);
        rect(c, mx + 2, my - 2, 1, 3, P.scCactus); dot(c, mx + 1, my, P.scCactus);
      } else if (print === 'yellow') {
        rect(c, mx - 1, my - 2, 3, 6, P.scYellow); rect(c, mx - 2, my - 1, 5, 4, P.scYellow);
      } else if (print === 'flamingo') {
        dot(c, mx, my - 3, P.scFlamingo); dot(c, mx + 1, my - 2, P.scFlamingo);
        dot(c, mx, my - 1, P.scFlamingo); rect(c, mx - 1, my, 3, 2, P.scFlamingo);
        rect(c, mx, my + 2, 1, 3, P.scFlamingoLeg);
      }
    });
  }

  /* THE SMALL WHITE DISH, glazed, flared, on the mat in front of the big
     glass - the same dish that caps every standing stack, here single,
     dim and still. 36 x 15. */
  function bakeDishScenery() {
    return piece(36, 15, 223, B0 + 132, function (c) {
      rect(c, 0, 0, 36, 1, P.scWhite);
      rect(c, 1, 1, 34, 1, P.scWhiteShade);
      for (var y = 2; y < 15; y++) {
        var ins = 1 + Math.round((y - 2) * 4 / 12);
        rect(c, ins, y, 36 - 2 * ins, 1, y > 9 ? P.scWhiteShade : P.scWhite);
        dot(c, 36 - ins - 1, y, P.scWhiteShade);
      }
      rect(c, 6, 14, 24, 1, mix(P.scWhiteShade, P.scSlate, 0.3));
    });
  }

  /* THE BOTTLE (ref 4): a squat clear apothecary bottle, round shoulders,
     a long neck and a lipped mouth, the little black metal charm of
     three figures hung on its neck. 38 x 98. */
  function bakeBottle() {
    return piece(38, 98, 144, B0 + 193, function (c, top) {
      var y, prof = [];
      for (y = 0; y < 98; y++) {
        var hw;
        if (y < 5) hw = 8;
        else if (y < 28) hw = 6;
        else if (y < 36) hw = 6 + Math.round(13 * Math.sqrt((y - 27) / 9));
        else hw = 19;
        prof.push([19 - hw, 19 - hw]);
      }
      clearBody(c, top, 0, 38, 0, prof);
      rect(c, 12, 0, 14, 1, P.scGlassHi); rect(c, 11, 4, 16, 1, P.scGlassEdge);
      rect(c, 15, 6, 1, 20, P.scGlassHi);
      rect(c, 4, 40, 1, 50, P.scGlassHi);
      rect(c, 2, 94, 34, 1, P.scGlassHi); rect(c, 1, 95, 36, 3, P.scGlassDeep);
      /* the charm */
      rect(c, 21, 31, 7, 5, P.scCharm); rect(c, 22, 30, 5, 1, P.scCharm);
      dot(c, 22, 36, P.scCharm); dot(c, 24, 36, P.scCharm); dot(c, 26, 36, P.scCharm);
      dot(c, 23, 32, P.scBlackLit); dot(c, 25, 32, P.scBlackLit);
    });
  }

  /* THE JAR (ref 4): white ceramic, straight-sided, its matte black lid
     a third of it; in front of the bottle's right half. 35 x 38. */
  function bakeJar() {
    return piece(35, 38, 204, B0 + 214, function (c) {
      rect(c, 0, 0, 35, 13, P.scBlack);
      rect(c, 0, 0, 35, 1, P.scBlackLit);
      rect(c, 0, 1, 2, 12, P.scBlackLit);
      rect(c, 29, 1, 6, 12, mix(P.scBlack, P.scSteelDeep, 0.4));
      rect(c, 0, 13, 35, 25, P.scWhite);
      rect(c, 0, 13, 35, 1, P.scWhiteShade);
      rect(c, 30, 14, 5, 24, P.scWhiteShade);
      rect(c, 1, 37, 33, 1, P.scWhiteShade);
    });
  }

  /* THE DECANTER (ref 4; zoom2/B_top_dish_bottle_jar_decanter.jpg): cut
     glass, square - thick walls, a fan of cuts radiating up from the
     middle of the body, a diamond lattice below, the shoulder drawing in
     to a short neck with its ring, the square faceted stopper. Against B's
     right side panel. 55 x 119. */
  function bakeDecanter() {
    return piece(55, 119, 123, B0 + 249, function (c, top) {
      var y, x, prof = [];
      for (y = 0; y < 119; y++) {
        var L;
        if (y < 14) L = 12;
        else if (y < 27) L = 20;
        else if (y < 41) L = 15;
        else if (y < 47) L = Math.round(15 - 15 * (y - 40) / 6);
        else L = 0;
        prof.push([L, L]);
      }
      clearBody(c, top, 0, 55, 0, prof, { k: 0.38 });
      /* the stopper's facets */
      for (y = 1; y < 13; y++) for (x = 13; x < 42; x++) {
        if ((x + y) % 4 === 0) dot(c, x, y, P.scGlassHi);
        else if ((x - y + 40) % 4 === 0) dot(c, x, y, P.scGlassShade);
      }
      rect(c, 12, 13, 31, 1, P.scGlassEdge);
      /* the neck ring */
      rect(c, 15, 27, 25, 1, P.scGlassHi); rect(c, 15, 28, 25, 1, P.scGlassEdge);
      /* the thick walls of the body */
      rect(c, 1, 47, 2, 72, P.scGlassShade); rect(c, 52, 47, 2, 72, P.scGlassShade);
      rect(c, 3, 48, 1, 70, P.scGlassHi);
      /* the fan cuts, rows 49..75, from the middle of the body's foot */
      for (var f = 0; f < 6; f++) {
        var ang = Math.PI * (0.18 + f * 0.128);
        for (var s = 0; s < 30; s++) {
          var fx = Math.round(27 + Math.cos(ang) * s * 1.2), fy = Math.round(76 - Math.sin(ang) * s);
          if (fy < 49 || fx < 4 || fx > 50) break;
          dot(c, fx, fy, P.scGlassHi);
        }
      }
      /* the diamond lattice, rows 77..115 */
      for (y = 77; y < 116; y++) for (x = 4; x < 51; x++) {
        if ((x + y) % 8 === 0) dot(c, x, y, P.scGlassHi);
        else if ((x - y + 120) % 8 === 0) dot(c, x, y, P.scGlassShade);
      }
      rect(c, 1, 116, 53, 3, P.scGlassDeep);
    });
  }

  /* THE RIGHT CORNER UNIT --------------------------------------------- */

  /* THE WOOD ROBOT (zoom2/Rcorner_top_robot_ref10/12.jpg), alone on the
     unit's board: a Cubebot - a square head wider than tall with two
     drilled eyes and its darker crown block, a torso of two blocks with
     the waist slot, arms of two blocks bent up at the elbow, legs bent
     at the knee, a dark slot at every joint. Beech, still, unlit: the
     scenery robot; the gold one that falls is a crow's token of it.
     55 x 60. */
  var ROBOT_STILL = [
    [14, 0, 28, 7, 'deep'], [14, 0, 28, 1, 'base'],
    [14, 7, 28, 14, 'base'], [16, 9, 24, 10, 'lit'], [39, 7, 3, 14, 'deep'],
    [22, 12, 2, 2, 'eye'], [32, 12, 2, 2, 'eye'],
    [24, 21, 8, 2, 'deep'],
    [16, 23, 24, 10, 'base'], [16, 23, 24, 2, 'lit'], [37, 25, 3, 8, 'deep'],
    [16, 33, 24, 1, 'deep'],
    [16, 34, 24, 9, 'base'], [16, 34, 24, 1, 'lit'], [37, 35, 3, 8, 'deep'],
    [4, 24, 12, 7, 'base'], [4, 24, 12, 2, 'lit'], [4, 31, 12, 1, 'deep'],
    [2, 5, 8, 19, 'base'], [2, 5, 8, 2, 'lit'], [8, 7, 2, 17, 'deep'], [2, 14, 8, 1, 'deep'],
    [40, 24, 12, 7, 'base'], [40, 24, 12, 2, 'lit'], [40, 31, 12, 1, 'deep'],
    [45, 5, 8, 19, 'base'], [45, 5, 8, 2, 'lit'], [51, 7, 2, 17, 'deep'], [45, 14, 8, 1, 'deep'],
    [18, 43, 9, 8, 'base'], [18, 43, 9, 1, 'lit'], [25, 44, 2, 7, 'deep'],
    [29, 43, 9, 8, 'base'], [29, 43, 9, 1, 'lit'], [36, 44, 2, 7, 'deep'],
    [16, 51, 11, 1, 'deep'], [29, 51, 11, 1, 'deep'],
    [16, 52, 11, 8, 'base'], [16, 52, 11, 1, 'lit'], [25, 53, 2, 7, 'deep'],
    [29, 52, 11, 8, 'base'], [29, 52, 11, 1, 'lit'], [38, 53, 2, 7, 'deep'],
    [16, 59, 11, 1, 'deep'], [29, 59, 11, 1, 'deep']
  ];
  function bakeRobotStill() {
    return piece(55, 60, 182, R0 + 43, function (c) {
      var PAL = { base: P.scWood, lit: P.scWoodLit, deep: P.scWoodDeep, eye: P.scWoodDeep };
      for (var i = 0; i < ROBOT_STILL.length; i++) {
        var q = ROBOT_STILL[i];
        rect(c, q[0], q[1], q[2], q[3], PAL[q[4]]);
      }
      /* the end grain on the blocks' faces */
      for (i = 0; i < 14; i++) {
        var h = hash(i * 977 + 11);
        dot(c, 4 + h % 46, 8 + (h >>> 8) % 50, mix(P.scWood, P.scWoodDeep, 0.3));
      }
    });
  }

  /* THE SHELF ROW, 780 x 218: every thing in the painter's order of the
     photographs (back things first), each with its 2 px shadow on the
     panel down its right side, the stacks' own direction */
  /* each thing's shadow first, every one of them, then the things: a
     shadow falls on the panel, never across another thing */
  function shadowOn(sheet, p) {
    var sh = makeCanvas(p.w, p.h);
    sh.ctx.drawImage(p.canvas, 0, 0);
    sh.ctx.globalCompositeOperation = 'source-in';
    sh.ctx.fillStyle = P.void; sh.ctx.fillRect(0, 0, p.w, p.h);
    sheet.globalAlpha = 2 / 16;
    sheet.drawImage(sh.canvas, p.u + 2, p.top - CEIL);
    sheet.globalAlpha = 1;
  }
  function placeOn(sheet, p) { sheet.drawImage(p.canvas, p.u, p.top - CEIL); }

  function bakeShelfRow() {
    var t = makeCanvas(LAP, LANE_H), c = t.ctx;
    var things = makeCanvas(LAP, LANE_H), S = {};
    bakeStructure(c);
    S.rok = bakeRok(); S.tamper = bakeTamper(); S.coldBrew = bakeColdBrew();
    S.frenchPress = bakeFrenchPress(); S.chemex = bakeChemex(); S.bowl = bakeBowl();
    S.eucalyptus = bakeEucalyptus();
    S.slate = bakeSlate();
    S.glassTall = stemless(21, 43, B0 + 45, '');
    S.glassBack = [stemless(21, 34, B0 + 82, ''), stemless(21, 34, B0 + 119, ''), stemless(21, 34, B0 + 157, '')];
    S.glassFront = [stemless(21, 34, B0 + 24, ''), stemless(21, 34, B0 + 65, 'cactus'),
                    stemless(21, 34, B0 + 100, 'yellow'), stemless(21, 34, B0 + 174, 'flamingo')];
    S.glassBig = stemless(36, 51, B0 + 139, '');
    S.dish = bakeDishScenery(); S.bottle = bakeBottle(); S.jar = bakeJar(); S.decanter = bakeDecanter();
    S.robotStill = bakeRobotStill();
    /* in the painter's order of the photographs - CABINET A: the press,
       the tamper in front of its lever, the carafe, the French press in
       front of the carafe's handle, the Chemex, the bowl in front of its
       foot, the eucalyptus lying across; CABINET B: the mat, the back
       rank, the front rank and the big glass, the dish in front, the
       bottle, the jar in front of it, the decanter; THE RIGHT UNIT: the
       robot */
    var order = [S.rok, S.tamper, S.coldBrew, S.frenchPress, S.chemex, S.bowl, S.eucalyptus,
                 S.slate, S.glassTall].concat(S.glassBack,
                 [S.glassFront[0], S.glassFront[1], S.glassFront[2], S.glassBig, S.glassFront[3],
                  S.dish, S.bottle, S.jar, S.decanter, S.robotStill]);
    order.forEach(function (p) { shadowOn(c, p); });
    order.forEach(function (p) { placeOn(c, p); });
    /* the things alone, for the coverage count */
    [S.rok, S.tamper, S.coldBrew, S.frenchPress, S.chemex, S.bowl, S.eucalyptus, S.slate, S.glassTall]
      .concat(S.glassBack, S.glassFront, [S.glassBig, S.dish, S.bottle, S.jar, S.decanter, S.robotStill])
      .forEach(function (p) { things.ctx.drawImage(p.canvas, p.u, p.top - CEIL); });
    t.pieces = S;
    t.things = things;
    return t;
  }

  /* ===================================================== THE STACKS

     STANDING, MOUTH UP, tiled top-down from under the dish: NESTED GLASS,
     one inside another, so each glass shows as a band - its rim, then its
     body down to the rim of the next. Glass is drawn as glass in this
     bay (see P): the panel seen through a green-grey tint, darker than
     the panel (136 against 165..200), and what gives the column its hard
     edge at 1x is round it - a white line at every rim with the rim's
     own dark under it, a white streak down each glass, and a crisp dark
     line at each side. Never a flat pale band: that read as a plate.

     THE RIBBED TUMBLERS (refs 7, 15), a glass every 12 px: the ribs as
     thin alternating light and dark lines, the thick base of the glass
     nested in it showing through as a deeper band above the next rim,
     a white streak on the near side and a fainter one on the far. Three
     glasses to the tile, the middle one's streak the longest. 34 x 36. */
  var RIB_ROWS = ['B', 'B', 'L', 'S', 'B', 'L', 'S', 'B', 'D', 'D'];
  function bakeRibbed() {
    var t = makeCanvas(34, 36), c = t.ctx, g, r, y;
    var COL = { B: P.glass, L: P.glassLite, S: P.glassShade, D: P.glassDeep };
    for (g = 0; g < 3; g++) {
      var y0 = g * 12;
      /* the rim: a white line, the glass's own thickness dark under it */
      dot(c, 0, y0, P.glassEdge); dot(c, 33, y0, P.glassEdge);
      rect(c, 1, y0, 32, 1, P.glassHi);
      dot(c, 0, y0 + 1, P.glassEdge); dot(c, 33, y0 + 1, P.glassEdge);
      dot(c, 1, y0 + 1, P.glassDeep); dot(c, 32, y0 + 1, P.glassDeep);
      rect(c, 2, y0 + 1, 30, 1, P.glassShade);
      for (r = 2; r < 12; r++) {
        y = y0 + r;
        var col = COL[RIB_ROWS[r - 2]];
        dot(c, 0, y, P.glassEdge); dot(c, 33, y, P.glassEdge);
        dot(c, 1, y, P.glassDeep); dot(c, 32, y, P.glassDeep);
        rect(c, 2, y, 30, 1, col);
        /* the far side a shade deeper */
        if (col === P.glass) rect(c, 27, y, 4, 1, mix(P.glass, P.glassShade, 0.5));
      }
      /* the streaks: a white one near the light, a fainter one far */
      var sl = g === 1 ? 9 : 7;
      rect(c, 5, y0 + 2, 1, sl, P.glassHi);
      rect(c, 6, y0 + 3, 1, sl - 3, P.glassLite);
      rect(c, 26, y0 + 3, 1, 5, P.glassLite);
    }
    return t;
  }

  /* THE TULIP GLASSES (refs 3, 15: B's middle tier, 8 cm at the flared
     rim, 5 at the base, 10 tall - they nest), a glass every 12 px: each
     rim the column's full 34 with a white line, the lip turning in under
     it and the band narrowing to 30, its own dark edge line following it
     in (so the box's corners give back two pixels, as the Fridge's tubs
     do); the thick base of the glass nested inside showing through as a
     deeper band over the next rim, its lit edge under it; a white streak
     near the light and a glint far. No prints on any stack: the tulips
     are nowhere in the run behind, and the little prints are the row's
     and the gift's. Three glasses to the tile, 34 x 36. */
  function bakeTulip() {
    var t = makeCanvas(34, 36), c = t.ctx, g, r;
    for (g = 0; g < 3; g++) {
      var y0 = g * 12;
      /* the rim, the flare: 34 wide */
      dot(c, 0, y0, P.glassEdge); dot(c, 33, y0, P.glassEdge);
      rect(c, 1, y0, 32, 1, P.glassHi);
      /* the lip turning in: 32 */
      dot(c, 1, y0 + 1, P.glassEdge); dot(c, 32, y0 + 1, P.glassEdge);
      dot(c, 2, y0 + 1, P.glassDeep); dot(c, 31, y0 + 1, P.glassDeep);
      rect(c, 3, y0 + 1, 28, 1, P.glassShade);
      /* the band: 30 */
      for (r = 2; r < 12; r++) {
        var y = y0 + r;
        dot(c, 2, y, P.glassEdge); dot(c, 31, y, P.glassEdge);
        dot(c, 3, y, P.glassDeep); dot(c, 30, y, P.glassDeep);
        var fill = r >= 9 && r <= 10 ? P.glassDeep : (r === 11 ? P.glassShade : P.glass);
        rect(c, 4, y, 26, 1, fill);
        if (fill === P.glass) rect(c, 24, y, 5, 1, mix(P.glass, P.glassShade, 0.5));
      }
      /* the nested base's lit edge, the streak, the far glint */
      rect(c, 6, y0 + 9, 22, 1, mix(P.glassDeep, P.glassLite, 0.45));
      rect(c, 5, y0 + 3, 1, 6, P.glassHi);
      rect(c, 6, y0 + 4, 1, 4, P.glassLite);
      rect(c, 27, y0 + 3, 1, 2, P.glassHi);
    }
    return t;
  }

  /* HANGING, MOUTH DOWN, tiled UP from the cap: THE MATTE BLACK MUGS
     (refs 6, 17), a mug every 14 px. Each mug, top down: its foot (the
     base, now on top), its body flaring to the rim the way those conical
     mugs do, the rim line - and the handle, turned to face us, a loop on
     the body of every second mug. On a black mug the ring is a hair
     LIGHTER than the body (mugLine) so it still rings against the panel.
     Four mugs to the tile, 34 x 56. The navy one is ref 6's Fly.io mug
     colour, for the one stack in five that is all of those. */
  function bakeMugs(pal, pitch, nested) {
    var t = makeCanvas(34, pitch * 4), c = t.ctx, m, r;
    var b0 = nested ? 0 : 2, last = pitch - 1;
    for (m = 0; m < 4; m++) {
      var y0 = m * pitch;
      if (!nested) {
        /* the foot */
        rect(c, 5, y0, 24, 1, pal.line);
        rect(c, 5, y0 + 1, 24, 1, pal.deep);
        dot(c, 4, y0 + 1, pal.line); dot(c, 29, y0 + 1, pal.line);
        rect(c, 7, y0, 10, 1, pal.rim);
      }
      /* the body, flaring to the rim - nested, only its wide lower part
         shows, the rest gone up inside the mug above */
      for (r = b0; r < last; r++) {
        var k = (r - b0) / Math.max(1, last - 1 - b0);
        var ins = Math.round((nested ? 2 : 3) * (1 - k)), L = ins, R = 33 - ins, y = y0 + r;
        dot(c, L, y, pal.line); dot(c, R, y, pal.line);
        rect(c, L + 1, y, R - L - 1, 1, pal.body);
        rect(c, L + 5, y, 2, 1, pal.lit);
        rect(c, R - 4, y, 3, 1, pal.deep);
      }
      if (nested) rect(c, 3, y0, 28, 1, pal.deep);
      /* the rim, the widest line of the mug */
      rect(c, 0, y0 + last, 34, 1, pal.rim);
      /* the handle, every second mug, turned three quarters to us: a
         loop on the right of the body */
      if (m % 2 === 1) {
        var h0 = y0 + (nested ? 1 : 4), hh = nested ? 6 : 7;
        rect(c, 23, h0, 4, 1, pal.lit);
        rect(c, 27, h0 + 1, 1, hh - 2, pal.lit);
        rect(c, 23, h0 + hh - 1, 4, 1, pal.rim);
        rect(c, 24, h0 + 1, 3, hh - 2, pal.deep);
      }
    }
    return t;
  }
  function mugPal(navy) {
    return navy ? { body: P.navy, lit: P.navyLit, deep: P.navyDeep, rim: P.navyRim, line: P.navyLine }
                : { body: P.mug, lit: P.mugLit, deep: P.mugDeep, rim: P.mugRim, line: P.mugLine };
  }

  /* the top of a falling or landed block: the topmost mug's foot, drawn
     over the cut the lid made, 34 x 5 */
  function bakeMugFoot(pal) {
    var t = makeCanvas(34, 5), c = t.ctx;
    rect(c, 5, 0, 24, 1, pal.line);
    rect(c, 7, 0, 10, 1, pal.rim);
    rect(c, 5, 1, 24, 1, pal.deep);
    dot(c, 4, 1, pal.line); dot(c, 29, 1, pal.line);
    for (var r = 2; r < 5; r++) {
      dot(c, 3, r, pal.line); dot(c, 30, r, pal.line);
      rect(c, 4, r, 26, 1, pal.body);
      rect(c, 8, r, 2, 1, pal.lit);
      rect(c, 26, r, 3, 1, pal.deep);
    }
    return t;
  }

  /* THE STANDING CAP, 42 x 9: THE WHITE DISH (ref 4, the small square
     dish), set on the stack to keep the dust off - its rim flaring over
     its body, lit along the top, the whitest thing on the screen with the
     shelf line, by design. Row 0 is the mouth of the gap. */
  function bakeDish() {
    var t = makeCanvas(42, 9), c = t.ctx;
    rect(c, 1, 0, 40, 1, P.outline);
    dot(c, 0, 1, P.outline); dot(c, 41, 1, P.outline);
    rect(c, 1, 1, 40, 1, P.dishHi);
    dot(c, 0, 2, P.outline); dot(c, 41, 2, P.outline);
    rect(c, 1, 2, 40, 1, P.dish);
    dot(c, 1, 3, P.outline); dot(c, 40, 3, P.outline);
    rect(c, 2, 3, 38, 1, P.dish);
    for (var y = 4; y < 7; y++) {
      dot(c, 2, y, P.outline); dot(c, 39, y, P.outline);
      rect(c, 3, y, 36, 1, P.dish);
      rect(c, 33, y, 6, 1, P.dishShade);
      dot(c, 3, y, P.dishHi);
    }
    rect(c, 35, 2, 5, 2, P.dishShade);
    dot(c, 3, 7, P.outline); dot(c, 38, 7, P.outline);
    rect(c, 4, 7, 34, 1, P.dishShade);
    rect(c, 4, 8, 34, 1, P.outline);
    return t;
  }

  /* THE HANGING CAPS, 42 x 9, mouth DOWN (row 8 is the gap's top edge),
     and the 34 x 5 band of the same mug's body above each, which takes
     the place of the column's lowest black band: the cap mug is 14 tall
     like every mug, its body flaring out to the wide rim.
     CAP A, THE LOVE YOU ENAMEL MUG (ref 6, 17): white enamel, the black
     rim of a camping mug, a word's worth of ink, the handle turned to us.
     CAP B, THE FLY.IO MUG: navy, its light rim, and the white logo -
     the little balloon in a rounded square - on the band. */
  function bakeHangCap(navy) {
    var t = makeCanvas(42, 9), c = t.ctx, y;
    var body = navy ? P.navy : P.enamel, shade = navy ? P.navyDeep : P.enamelShade;
    var lit = navy ? P.navyLit : '#ffffff', line = navy ? P.navyLine : P.outline;
    var rimA = navy ? P.navyRim : P.enamelRim, rimB = navy ? P.navyLit : P.enamelRim;
    var ROWS = [[3, 38], [2, 39], [1, 40], [1, 40], [1, 40], [1, 40], [1, 40]];
    for (y = 0; y < 7; y++) {
      var L = ROWS[y][0], R = ROWS[y][1];
      dot(c, L - 1, y, line); dot(c, R + 1, y, line);
      rect(c, L, y, R - L + 1, 1, y === 6 ? shade : body);
      if (y < 6) { rect(c, L, y, 2, 1, lit); rect(c, R - 4, y, 5, 1, shade); }
    }
    rect(c, 0, 7, 42, 1, rimA);
    rect(c, 1, 8, 40, 1, rimB);
    if (!navy) {
      /* LOVE YOU DAD, a line of ink near the rim */
      for (var x = 22; x < 34; x += 2) dot(c, x, 4, P.ink);
      dot(c, 27, 4, P.enamel);
      /* the handle, a loop of the enamel's shade */
      rect(c, 9, 1, 4, 1, shade); rect(c, 8, 2, 1, 3, shade); rect(c, 13, 2, 1, 3, shade);
      rect(c, 9, 5, 4, 1, shade);
    }
    return t;
  }
  function bakeHangBand(navy) {
    var t = makeCanvas(34, 5), c = t.ctx;
    var body = navy ? P.navy : P.enamel, shade = navy ? P.navyDeep : P.enamelShade;
    var lit = navy ? P.navyLit : '#ffffff', line = navy ? P.navyLine : P.outline;
    for (var y = 0; y < 5; y++) {
      var L = y < 2 ? 1 : 0, R = 33 - L;
      dot(c, L, y, line); dot(c, R, y, line);
      rect(c, L + 1, y, R - L - 1, 1, body);
      rect(c, L + 1, y, 2, 1, lit);
      rect(c, R - 5, y, 5, 1, shade);
    }
    rect(c, 2, 0, 30, 1, navy ? P.navyLine : P.enamelShade);
    if (navy) {
      /* the Fly.io mark: a white rounded square with the balloon in it */
      rect(c, 14, 0, 6, 5, '#f4f6fa');
      dot(c, 14, 0, P.navy); dot(c, 19, 0, P.navy); dot(c, 14, 4, P.navy); dot(c, 19, 4, P.navy);
      rect(c, 16, 1, 2, 2, P.navy);
      dot(c, 17, 3, P.navyLit);
    } else {
      /* the handle's top on the band */
      rect(c, 8, 3, 1, 2, shade); rect(c, 13, 3, 1, 2, shade); rect(c, 9, 2, 4, 1, shade);
    }
    return t;
  }

  /* ======================================================= THE DROPS

     Every turning thing is a SHAPE TABLE - rects [x, y, w, h, key] and
     polygons {poly, key} in the sprite's own pixels about its centre -
     rasterised at bake time through sixteen exact steps of a turn: each
     pixel of the frame is turned back into the sprite's frame and asked
     which shape it lands in, the last listed winning. Then the ring is
     laid under it. Nothing is ctx.rotate'd.

     AND THE BOX IS CUT FROM THE FRAME: the body (not the ring) is read
     in 3 x 3 cells, a cell is lethal where five of its nine pixels are
     glass, and each row of lethal cells is one box. So the boxes ARE the
     picture, a pixel and a half in from the ring - the Coop's egg's
     mercy - at every angle the glass is drawn at. */
  function inShape(s, x, y) {
    if (s.poly) {
      var p = s.poly, inside = false;
      for (var i = 0, j = p.length - 1; i < p.length; j = i++) {
        if (((p[i][1] > y) !== (p[j][1] > y)) &&
            (x < (p[j][0] - p[i][0]) * (y - p[i][1]) / (p[j][1] - p[i][1]) + p[i][0])) inside = !inside;
      }
      return inside;
    }
    return x >= s[0] && x < s[0] + s[2] && y >= s[1] && y < s[1] + s[3];
  }
  function keyOf(s) { return s.poly ? s.key : s[4]; }

  function bakeTurned(shape, N, frame, pal, ringCol, cell) {
    return bakeTurnedAt(shape, N, frame * TAU / 16, pal, ringCol, cell);
  }
  /* the same, at any angle (the gifts' five tilts) */
  function bakeTurnedAt(shape, N, th, pal, ringCol, cell) {
    var t = makeCanvas(N, N), c = t.ctx, C = N / 2;
    var cs = Math.cos(th), sn = Math.sin(th);
    var body = new Uint8Array(N * N), x, y, k;
    for (y = 1; y < N - 1; y++) {
      for (x = 1; x < N - 1; x++) {
        var u = x + 0.5 - C, v = y + 0.5 - C;
        var lx = cs * u + sn * v, ly = -sn * u + cs * v;
        for (k = shape.length - 1; k >= 0; k--) {
          if (inShape(shape[k], lx, ly)) {
            dot(c, x, y, pal[keyOf(shape[k])]);
            body[y * N + x] = 1;
            break;
          }
        }
      }
    }
    ringUnder(t, ringCol);
    if (cell) t.box = cutBoxes(body, N, cell);
    return t;
  }

  /* the body read in cells of `cell` px; each row of lethal cells merged
     into one box, relative to the sprite's centre */
  function cutBoxes(body, N, cell) {
    var out = [], C = N / 2, cx, cy, i, j;
    var nc = Math.floor(N / cell);
    for (cy = 0; cy < nc; cy++) {
      var run0 = -1;
      for (cx = 0; cx <= nc; cx++) {
        var on = false;
        if (cx < nc) {
          var n = 0;
          for (j = 0; j < cell; j++) for (i = 0; i < cell; i++) n += body[(cy * cell + j) * N + cx * cell + i];
          on = n * 9 >= 5 * cell * cell;
        }
        if (on && run0 < 0) run0 = cx;
        if (!on && run0 >= 0) {
          out.push([run0 * cell - C, cy * cell - C, (cx - run0) * cell, cell]);
          run0 = -1;
        }
      }
    }
    return out;
  }

  /* THE CAN GLASS (refs 3, 7): a straight glass the shape of a can, its
     shoulder taking it in a pixel at the top - dark glass on the cream
     like the stacks: a white rim, the rim's dark under it, a crisp dark
     wall each side, a white streak and a fainter one, the thick base a
     deeper green-grey with its own lit edge. 10 x 16 of glass, 12 x 18
     with the ring. (The silhouette is the first build's to the pixel,
     so the boxes cut from it are too.) */
  var CAN = [
    [-4, -8, 8, 1, 'hi'],
    [-5, -7, 10, 15, 'edge'],
    [-4, -7, 8, 1, 'shade'],
    [-4, -6, 8, 11, 'glass'],
    [1, -6, 3, 11, 'mid'],
    [-4, 5, 8, 2, 'deep'],
    [-3, 5, 5, 1, 'lite'],
    [-3, -6, 1, 9, 'hi'],
    [2, -5, 1, 4, 'lite']
  ];
  /* THE BLACK TUMBLER (ref 6, the tall one behind the Verve): matte
     black, a lit stripe, the rim. 8 x 20, 10 x 22 with its light ring. */
  var TUMBLER = [
    [-4, -10, 8, 20, 'mug'],
    [-4, -10, 8, 1, 'rim'],
    [-3, -9, 2, 17, 'lit'],
    [1, -9, 3, 19, 'deep'],
    [-4, 8, 8, 2, 'deep']
  ];
  /* THE ORIGAMI FOX (zoom2 Rcorner_bot_toys, refs 10, 11, 16), the spin:
     the classic folded fox, every surface a flat facet meeting another
     at a straight fold - a creased wedge of a body, a tall folded tail
     behind it, a kite of a head with its snout forward and down, two
     tall pointed ears, an ink dot of an eye. The facets' three tones ARE
     the creases at this size. 16 x 14, centred on (8, 7) of the sprite,
     back to front (the later entry wins). */
  var FOX = [
    { poly: [[-6, 6], [3, 6], [-3, -1]], key: 'deep' },             /* body, lower facet */
    { poly: [[-3, -1], [4, 0], [3, 6]], key: 'base' },              /* body, upper facet */
    { poly: [[-5.5, 6], [-6, -4], [-3, 6]], key: 'base' },          /* tail, far facet */
    { poly: [[-8, 6], [-6, -4], [-5.5, 6]], key: 'lit' },           /* tail, near facet */
    { poly: [[0, -3], [5, -5], [4, -2], [3, 2]], key: 'base' },     /* head, far cheek */
    { poly: [[5, -5], [7, 1], [3, 2], [4, -2]], key: 'lit' },       /* head, near cheek: the snout */
    { poly: [[0, -3], [1, -7], [3, -3]], key: 'lit' },              /* left ear */
    { poly: [[3, -3], [5, -7], [6, -4.5]], key: 'base' },           /* right ear */
    [4, -2, 1, 1, 'eye']
  ];
  /* THE WOOD ROBOT (zoom2 Rcorner_top_robot_ref10/12), a crow's +5: his
     Cubebot - a square head with two drilled eyes, a torso of two
     blocks, arms of two blocks bent UP at the elbow, legs of two blocks,
     and a dark slot at every joint where the elastic runs. Top faces
     lit, right sides deep. 14 x 18, centred on (7, 9) of the sprite. */
  var ROBOT = [
    [-4, -9, 8, 6, 'rb'], [-4, -9, 8, 1, 'lit'], [3, -8, 1, 5, 'deep'],          /* head */
    [-2, -7, 1, 1, 'eye'], [1, -7, 1, 1, 'eye'], [-3, -9, 1, 1, 'glint'],
    [-1, -3, 2, 1, 'joint'],                                                     /* neck slot */
    [-3, -2, 6, 6, 'rb'], [-3, -2, 6, 1, 'lit'], [2, -1, 1, 5, 'deep'],          /* torso */
    [-3, 1, 6, 1, 'joint'],                                                      /* waist slot */
    [-6, -2, 3, 2, 'rb'], [-6, -2, 3, 1, 'lit'], [-6, 0, 1, 1, 'joint'],         /* left arm */
    [-7, -7, 2, 7, 'rb'], [-7, -7, 2, 1, 'deep'], [-6, -6, 1, 6, 'lit'],
    [3, -2, 3, 2, 'rb'], [3, -2, 3, 1, 'lit'], [5, 0, 1, 1, 'joint'],            /* right arm */
    [5, -7, 2, 7, 'rb'], [5, -7, 2, 1, 'deep'], [6, -6, 1, 6, 'deep'],
    [-3, 4, 2, 2, 'rb'], [-3, 6, 2, 1, 'joint'], [-3, 7, 2, 2, 'rb'], [-3, 8, 2, 1, 'deep'],  /* legs */
    [1, 4, 2, 2, 'rb'], [1, 6, 2, 1, 'joint'], [1, 7, 2, 2, 'rb'], [1, 8, 2, 1, 'deep']
  ];
  /* they come down steady, not tumbling (the hazards tumble; the gifts
     fall slower, as every bay's do): the fox flutters through five tilts
     of -16..16 degrees with a 3 px sideways sway at the same phase, a
     full sway every 1.6 s, a fox the whole way down; the robot sways
     feet-down through -12..12 degrees, every 2 s, a heavier thing, no
     drift - a robot being lowered on a string. (Twenty degrees, the
     brief's, broke its one-pixel slots and eyes into a jumble at 14 x 18;
     at twelve every frame keeps its head, eyes, slots, arms and legs.) */
  var FOX_TILT = 16, FOX_SWAY = 2.5 * TAU / 4, FOX_DRIFT = 3;
  var ROBOT_TILT = 12, ROBOT_SWAY = 2 * TAU / 4;

  /* THE VERVE TUMBLER (ref 6, 17), the heat: the tall white tumbler with
     the orange flaming urn of VERVE COFFEE on it. 10 x 18. */
  var VERVE = [
    '.oooooooo.',
    'owwweeeeso',
    'oweeeeeeso',
    'oweeeeeeso',
    'oweTeTeTso',
    'oweTVTVTso',
    'oweVVVVVso',
    'owTVVVVVso',
    'oweVVVVeso',
    'owevVVveso',
    'owUVVVVUso',
    'oweUVVUeso',
    'oweeVVeeso',
    'owevVVveso',
    'oweeeeeeso',
    'oweeeeeeso',
    'osssssssso',
    '.oooooooo.'
  ];
  /* THE PINEAPPLE GLASS (ref 4, far left), sour: a stemless wine glass
     printed with a yellow pineapple in black sunglasses. 12 x 14. */
  var PINE = [
    '..oooooooo..',
    '.oHHHHHHHHo.',
    '.oGgglllgGo.',
    'oGggglLgggGo',
    'oGgggyyyggGo',
    'oGggkkkkggGo',
    'oGgHykyyggGo',
    'oGgHyYyYggGo',
    'oGgHyyYyggGo',
    'oGgggyyyggGo',
    '.oGgggggggo.',
    '.oGsssssGGo.',
    '..oGGGGGGo..',
    '...oooooo...'
  ];
  /* THE SMISKI (refs 10, 11, 12), the spare life: the little pale
     green glow-in-the-dark figure, its big round head, two dots for
     eyes, sitting on the shelf. 10 x 16. */
  var SMISKI = [
    '..oooooo..',
    '.oLLhhhho.',
    'oLLhhhhhho',
    'oLhhhhhhho',
    'ohhEhhEhso',
    'ohhhhhhhso',
    '.ohhhhhso.',
    '..ohhhso..',
    '.oLhhhhso.',
    'oLhhhhhhso',
    'ohhhhhhhso',
    '.ohhhhhso.',
    '.ohhhhhso.',
    '.ohhoohso.',
    '.ohso.hso.',
    '.ooo..oo..'
  ];

  function bakeGrid(rows, pal) {
    var t = makeCanvas(rows[0].length, rows.length);
    paintGrid(t.ctx, rows, 0, 0, pal);
    return t;
  }

  /* THE SHARDS a glass leaves on the shelf: six slivers of 2..3 px, the
     corners catching the light, 26 x 6, lying on the shelf's top - the
     can glass's in its own dark tint with white corners */
  var SHARDS = [[1, 4, 3, 1], [5, 2, 2, 2], [9, 4, 3, 1], [13, 1, 2, 3], [17, 3, 3, 2], [22, 4, 3, 1]];
  function bakeShards(body, hi) {
    var t = makeCanvas(26, 6), c = t.ctx;
    for (var i = 0; i < SHARDS.length; i++) {
      var s = SHARDS[i];
      rect(c, s[0], s[1], s[2], s[3], body);
      dot(c, s[0], s[1], hi);
    }
    dot(c, 8, 5, hi); dot(c, 20, 5, body);
    return ringUnder(t, P.outline);
  }

  /* ======================================================== LITTER

     Harmless, on the shelf's top, no box, all LOW and all SMALL - at
     this bay's one scale a plate is 90 px and a slate tray 128, a slab
     on the floor (the owner's word for one, once), so the litter is what
     a shelf of things back from the dishwasher really has on it: a fallen
     leaf or two of the dried eucalyptus that lies on this shelf once a
     lap; the ring of water a glass's foot left on the glass (the foot
     rings of ref 6 and 7); and a few beads of water. Nothing in it is a
     glass, a mug or a dish: nothing harmless in here is a twin of a
     thing that can kill (BRIEF2's plate, can glass and tumbler on their
     sides were weighed and left out: a true plate is 90 px and the other
     two are the falling hazards lying down). */
  function bakeLitter() {
    var a = makeCanvas(14, 4), c = a.ctx;
    rect(c, 1, 2, 4, 2, P.scEucLit); dot(c, 1, 3, P.scEucDeep); rect(c, 5, 3, 3, 1, P.scEucDeep);
    rect(c, 8, 1, 4, 2, P.scEuc); dot(c, 11, 2, P.scEucDeep); dot(c, 9, 1, P.scEucLit);
    ringUnder(a, mix(P.outline, P.scEucDeep, 0.4));
    var b = makeCanvas(28, 3);
    c = b.ctx;
    c.fillStyle = rgba(P.glassHi, 0.8); c.fillRect(6, 0, 16, 1);
    c.fillStyle = rgba(P.glassHi, 0.55); c.fillRect(2, 1, 4, 1); c.fillRect(22, 1, 4, 1);
    c.fillStyle = rgba(P.glassLite, 0.6); c.fillRect(5, 2, 18, 1);
    var d = makeCanvas(12, 3);
    c = d.ctx;
    dot(c, 1, 2, P.glassHi); dot(c, 2, 2, P.glassLite);
    dot(c, 6, 1, P.glassHi); rect(c, 6, 2, 2, 1, P.glassLite);
    dot(c, 10, 2, P.glassHi);
    return [a, b, d];
  }

  /* ========================================================= BUILD */

  function build() {
    T.back = bakeBack();
    T.under = bakeUnderShelf();
    T.underStruct = bakeUnderStructure();
    T.shelfRow = bakeShelfRow();
    T.lid = bakeLid();
    T.groundEdge = bakeGroundEdge();
    /* his things by name, for the review's tiles and the Stands */
    var SP = T.shelfRow.pieces;
    T.rok = SP.rok; T.frenchPress = SP.frenchPress; T.coldBrew = SP.coldBrew; T.chemex = SP.chemex;
    T.bowl = SP.bowl; T.eucalyptus = SP.eucalyptus; T.tamper = SP.tamper; T.slate = SP.slate;
    T.glassSmall = SP.glassFront[1]; T.glassBig = SP.glassBig; T.dishScenery = SP.dish;
    T.bottle = SP.bottle; T.jar = SP.jar; T.decanter = SP.decanter; T.robotScenery = SP.robotStill;
    /* the lid and the two grounds, a window of each for the tiles */
    T.lidTile = clipOf(T.lid, 0, 0, 120, CEIL);
    T.groundGlass = clipOf(T.groundEdge, 200, 0, 120, EDGE_H);
    T.groundBoard = clipOf(T.groundEdge, 600, 0, 120, EDGE_H);

    T.stand = [bakeRibbed(), bakeTulip()];
    T.standPitch = [12, 12];
    T.mugs = [bakeMugs(mugPal(false), 14, false), bakeMugs(mugPal(true), 14, false)];
    T.mugsNested = [bakeMugs(mugPal(false), NEST_PITCH, true), bakeMugs(mugPal(true), NEST_PITCH, true)];
    T.mugFoot = [bakeMugFoot(mugPal(false)), bakeMugFoot(mugPal(true))];
    T.dish = bakeDish();
    T.capLove = bakeHangCap(false);
    T.capFly = bakeHangCap(true);
    T.bandLove = bakeHangBand(false);
    T.bandFly = bakeHangBand(true);

    var GPAL = { hi: P.glassHi, edge: P.glassEdge, glass: P.glass, shade: P.glassShade,
                 mid: mix(P.glass, P.glassShade, 0.5), deep: P.glassDeep, lite: P.glassLite };
    var MPAL = { mug: P.mug, rim: P.mugRim, lit: P.mugLit, deep: P.mugDeep };
    var FPAL = { base: P.fox, lit: P.foxLit, deep: P.foxDeep, eye: P.foxEye };
    var RPAL = { rb: P.rb, lit: P.rbLit, deep: P.rbDeep, joint: P.rbJoint, eye: P.rbEye, glint: P.goldHi };
    T.can = []; T.tumbler = []; T.fox = []; T.robot = [];
    for (var f = 0; f < 16; f++) {
      T.can.push(bakeTurned(CAN, 24, f, GPAL, P.outline, 3));
      T.tumbler.push(bakeTurned(TUMBLER, 26, f, MPAL, P.mugLine, 3));
    }
    /* the gifts' five tilts each, upright in the middle (frame 2) */
    for (f = 0; f < 5; f++) {
      var tilt = (f - 2) / 2;
      T.fox.push(bakeTurnedAt(FOX, 22, tilt * FOX_TILT * TAU / 360, FPAL, P.outline));
      T.robot.push(bakeTurnedAt(ROBOT, 24, tilt * ROBOT_TILT * TAU / 360, RPAL, P.outline));
    }
    T.verve = bakeGrid(VERVE, { o: P.outline, w: '#ffffff', e: P.enamel, s: P.enamelShade,
                                T: P.verveHi, V: P.verve, v: P.verveDeep, U: P.verve });
    T.verveLying = quarterTurn(T.verve);
    T.pineapple = bakeGrid(PINE, { o: P.outline, H: P.glassHi, G: P.giftEdge, g: P.giftGlass, s: P.giftShade,
                                   l: P.cactus, L: P.cactusDeep, y: P.pine, Y: P.pineDot, k: P.outline });
    T.smiski = bakeGrid(SMISKI, { o: P.smiskiLine, L: P.smiskiLit, h: P.smiski, s: mix(P.smiski, P.smiskiLine, 0.45),
                                  E: P.smiskiEye });
    T.shardsGlass = bakeShards(P.glass, P.glassHi);
    T.shardsPine = bakeShards(P.pine, P.giftGlass);
    T.shardsBlack = bakeShards(P.mug, P.mugLit);
    T.litter = bakeLitter();

    /* names for the Stands' seat: one canvas each */
    T.canGlass = T.can[0];
    T.blackTumbler = T.tumbler[0];
    /* the two gifts standing still, for the Stands' shelf */
    T.foxStill = T.fox[2];
    T.robotStill = T.robot[2];
    T.origamiFox = T.foxStill;
    T.woodRobot = T.robotStill;
  }

  function clipOf(src, x, y, w, h) {
    var t = makeCanvas(w, h);
    t.ctx.drawImage(src.canvas, x, y, w, h, 0, 0, w, h);
    return t;
  }

  /* ======================================================= DRAWING */

  /* THE ROOM, back to front: the back at 0.80 (its 624 tile), his things
     on the shelf at 1.00 (the 780 sheet). tileX lays each from left of the
     screen to past its right edge at its own parallax: nothing pops in. */
  function drawRoom(ctx, scroll) {
    tileX(ctx, T.back.canvas, scroll * PAR_PANEL, CEIL);
    tileX(ctx, T.shelfRow.canvas, scroll, CEIL);
  }
  function drawBackdrop(ctx, scroll) { drawRoom(ctx, scroll); }
  function drawCeiling(ctx, scroll) { tileX(ctx, T.lid.canvas, scroll, 0); }
  /* the tier below at 0.80, then the shelf's edge over it at 1.00 */
  function drawFloor(ctx, scroll) {
    tileX(ctx, T.under.canvas, scroll * PAR_PANEL, STRIP_Y);
    tileX(ctx, T.underStruct.canvas, scroll, STRIP_Y);
    tileX(ctx, T.groundEdge.canvas, scroll, FLOOR);
  }

  /* THE CALM CABINET, for any menu pointed at it: the room as it is in
     play - the whole run at the play parallaxes - the lid and the ground,
     and one standing stack of ribbed tumblers and one hanging stack of
     mugs riding along on the shelves, still: nothing lets go in a menu. */
  var MENU_STANDS = [[150, 132], [470, 120]];
  function drawMenuBackdrop(ctx, scroll) {
    drawRoom(ctx, scroll);
    for (var i = 0; i < MENU_STANDS.length; i++) {
      var sx = Math.round(wrap(MENU_STANDS[i][0] - scroll, 640) - 80), gy = MENU_STANDS[i][1];
      if (sx < -50 || sx > VW + 10) continue;
      drawStanding(ctx, sx, gy + 84, 0, 0);
      drawHanging(ctx, { lg: 0, lt: 0, hang: 0, capDown: i, offH: 14 }, sx, gy);
    }
    drawCeiling(ctx, scroll);
    drawFloor(ctx, scroll);
  }

  /* ------------------------------------------------------- the stacks */

  /* the standing half from its cap down: the white dish at capY, the
     nested glasses under it to the shelf, the hard shadow on the panel */
  function drawStanding(ctx, x, capY, v, off) {
    var colY = capY + 9;
    Tint.rect(ctx, x + 38, capY, 3, 9, P.void, 5);
    if (FLOOR > colY) {
      /* the shadow from the column's own edge: the tulips' band is 30 */
      Tint.rect(ctx, x + (v === 1 ? 32 : 34), colY, 3, FLOOR - colY, P.void, 5);
      columnDown(ctx, T.stand[v].canvas, x, colY, FLOOR - colY, off);
    }
    ctx.drawImage(T.dish.canvas, x - 4, capY);
  }

  /* the hanging half, its cap's top at gapY - 9: the mugs up to the lid,
     the cap mug's band, the cap */
  function drawHanging(ctx, ob, x, gapY, sep) {
    sep = sep || 0;
    var topEnd = gapY - 9 + sep, bandY = topEnd - 5, top = CEIL + sep, h = bandY - top;
    var navy = ob.hang === 1, fly = ob.capDown === 1;
    if (topEnd > top) Tint.rect(ctx, x + 34, top, 3, topEnd - top, P.void, 5);
    Tint.rect(ctx, x + 38, topEnd, 3, 9, P.void, 5);
    if (h > 0) columnUp(ctx, T.mugs[navy ? 1 : 0].canvas, x, top, h, ob.offH);
    if (sep > 0) ctx.drawImage(T.mugFoot[navy ? 1 : 0].canvas, x, top);
    ctx.drawImage((fly ? T.bandFly : T.bandLove).canvas, x, bandY);
    ctx.drawImage((fly ? T.capFly : T.capLove).canvas, x - 4, topEnd);
  }

  /* a block of mugs anywhere: its top row at y, lh tall (cap included),
     the foot drawn over the cut */
  function drawBlock(ctx, ob, x, y, lh, nested) {
    var navy = ob.hang === 1, fly = ob.capDown === 1;
    var topEnd = y + lh - 9, bandY = topEnd - 5, h = bandY - y;
    Tint.rect(ctx, x + 34, y, 3, topEnd - y, P.void, 5);
    Tint.rect(ctx, x + 38, topEnd, 3, 9, P.void, 5);
    if (h > 0) {
      if (nested) columnUp(ctx, T.mugsNested[navy ? 1 : 0].canvas, x, y, h, ob.offH / 14 * NEST_PITCH);
      else columnUp(ctx, T.mugs[navy ? 1 : 0].canvas, x, y, h, ob.offH);
    }
    ctx.drawImage(T.mugFoot[navy ? 1 : 0].canvas, x, y);
    ctx.drawImage((fly ? T.bandFly : T.bandLove).canvas, x, bandY);
    ctx.drawImage((fly ? T.capFly : T.capLove).canvas, x - 4, topEnd);
  }

  /* how far the rocking stack is over this instant: the same number for
     the picture and the box */
  function rockOf(ob) { return ob.lgRock > 0 ? ob.lgRock : ROCK_MIN; }
  function rockDx(ob) {
    var a = ob.lt > rockOf(ob) - ROCK_LAST ? ROCK_A_LAST : ROCK_A;
    return Math.round(a * Math.sin(ob.lt * ROCK_W));
  }
  function rockSep(ob) {
    if (ob.lt < CHINK_EVERY) return 0;
    var k = (ob.lt - (rockOf(ob) - SEP_LAST)) / SEP_LAST;
    return k <= 0 ? 1 : Math.min(SEP_MAX, 1 + Math.floor(k * SEP_MAX));
  }

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), lg = ob.lg | 0;
    if (lg === 3) { drawLanded(ctx, ob, x); return; }
    drawStanding(ctx, x, ob.gapY + ob.gapH, ob.variant, ob.offS);
    if (lg === 2) { drawBlock(ctx, ob, x, Math.round(ob.ly), ob.lh); return; }
    if (lg === 1) {
      var dx = rockDx(ob);
      drawHanging(ctx, ob, x + dx, ob.gapY, rockSep(ob));
      drawLetting(ctx, ob, x + dx);
      return;
    }
    drawHanging(ctx, ob, x, ob.gapY);
  }

  /* THE TELL ON THE LID, while it rocks: the arris over the stack goes
     white where the glass is letting go of it, flashing in the last
     fifth of a second, a lit glow on the green edge above, and glass
     dust sifting down either side of the column off the lid - each speck
     born on the clock, falling and fading, its place off the pillar's
     seed, so a frame drawn twice is the same frame. Particles beside the
     box, never in it, and nothing here kills: the lid kills already. */
  function drawLetting(ctx, ob, x) {
    var rock = rockOf(ob);
    var flash = ob.lt > rock - ROCK_LAST && (Math.floor(ob.lt * 18) & 1);
    /* the crack of light along the lid: the board's underside over the
       stack, a little wider than it, flashing at the end */
    rect(ctx, x - 3, 21, 40, 1, flash ? P.glassHi : P.boardLit);
    rect(ctx, x - 2, 22, 38, 2, flash ? P.boardLit : P.glassHi);
    dot(ctx, x - 4, 22, P.glassHi); dot(ctx, x + 37, 22, P.glassHi);
    /* the glass dust, either side of the column */
    var a = ctx.globalAlpha;
    for (var i = 0; i < DUST; i++) {
      var h = hash(ob.seed * 13 + i * 7919);
      var born = (i / DUST) * (rock - 0.1), age = ob.lt - born;
      if (age < 0 || age > DUST_LIFE) continue;
      var side = i % 2 ? 1 : 0;
      var sx = side ? x + 35 + (h % 5) : x - 2 - (h % 5);
      var sy = CEIL + 1 + Math.round(age * 24 + age * age * 300);
      if (sy >= FLOOR) continue;
      ctx.globalAlpha = a * (1 - (age / DUST_LIFE) * (age / DUST_LIFE));
      rect(ctx, sx, sy, 2, 1, P.glassHi);
      dot(ctx, sx + ((h >>> 8) & 1), sy + 1, P.glassEdge);
    }
    ctx.globalAlpha = a;
  }

  /* A LANDED PILLAR: the glasses, the dish, and the mugs standing on it
     rim-down - their foot is the new mouth of the gap - with the glints
     off the dish for the first half second */
  function drawLanded(ctx, ob, x) {
    var m = ob.gapY + ob.gapH, lh = ob.lq;
    drawStanding(ctx, x, m + lh, ob.variant, ob.offS);
    /* THE MUG STANDS ON THE DISH, two things: the mug's shadow across
       the dish's lit top, under the mug's own dark rim, so a white mug
       on a white dish never reads as one white thing with a stripe */
    Tint.rect(ctx, x - 3, m + lh + 1, 40, 3, P.void, 7);
    drawBlock(ctx, ob, x, m, lh, true);
    if (ob.lt < GLINT_T) {
      var k = ob.lt / GLINT_T, a = ctx.globalAlpha, y0 = m + lh;
      ctx.globalAlpha = a * (1 - k * k);
      for (var i = 0; i < GLINTS; i++) {
        var h = hash(ob.seed * 7 + i * 104729);
        var left = i % 2 === 0, vx = (30 + h % 70) * (left ? -1 : 1), vy = 70 + (h >>> 7) % 90;
        var gx = Math.round(x + (left ? -3 : 37) + vx * ob.lt), gy = Math.round(y0 - vy * ob.lt + 420 * ob.lt * ob.lt);
        if (gy >= FLOOR) continue;
        dot(ctx, gx, gy, i % 3 ? P.glassHi : P.enamel);
        if (i % 4 === 1) { dot(ctx, gx + 1, gy, P.glassShade); }
      }
      ctx.globalAlpha = a;
    }
  }

  /* ------------------------------------------------------- the drops

     Everything that draws or collides a drop reads ob.gold, ob.spicy,
     ob.sour and ob.whirl LIVE - the engine sets sour and whirl after
     makeDrop returns. */
  function kindOf(ob) {
    if (ob.gold) return 'robot';
    if (ob.spicy) return 'verve';
    if (ob.sour) return 'pine';
    if (ob.whirl) return 'origami';
    return ob.kind === 1 ? 'tumbler' : 'can';
  }
  function frameOf(ob) { return Math.floor(wrap(ob.spin || 0, TAU) / TAU * 16) % 16; }
  /* a gift's tilt frame (0..4, upright 2) and the fox's sideways sway,
     both off its phase: the same numbers for the picture and the box */
  function tiltOf(ob) { return 2 + Math.round(2 * Math.sin(ob.spin || 0)); }
  function driftOf(ob) { return Math.round(FOX_DRIFT * Math.sin(ob.spin || 0)); }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y), kind = kindOf(ob), age = ob.age || 0, i, k, f;
    if (kind === 'can' || kind === 'tumbler') {
      f = (kind === 'can' ? T.can : T.tumbler)[frameOf(ob)];
      blitBelowCeil(ctx, f.canvas, x - f.w / 2, y - f.h / 2);
      return;
    }
    if (kind === 'verve') {
      /* it wears the heat as the kimchi and the brownie do, and wobbles */
      var pulse = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(16 + pulse * 6),
           'rgba(' + FX.glowCore + ',' + (0.50 * pulse).toFixed(3) + ')',
           'rgba(' + FX.glowEdge + ',' + (0.24 * pulse).toFixed(3) + ')', 'rgba(184,77,18,0)');
      for (i = 0; i < 3; i++) {
        k = wrap(age * 0.7 + i * 0.41, 1);
        var fy = y - 11 - Math.round(k * 7);
        if (fy >= CEIL) dot(ctx, x - 4 + Math.round(Math.sin(age * 2 + i) * 4), fy, i % 2 ? FX.hotHi : FX.hot);
      }
      var wob = Math.round(Math.sin(age * 9) * 0.6);
      blitBelowCeil(ctx, T.verve.canvas, x - 5 + wob, y - 9);
      return;
    }
    if (kind === 'pine') {
      var lp = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(14 + lp * 4),
           'rgba(242,214,110,' + (0.42 * lp).toFixed(3) + ')',
           'rgba(150,200,90,' + (0.20 * lp).toFixed(3) + ')', 'rgba(60,120,40,0)');
      blitBelowCeil(ctx, T.pineapple.canvas, x - 6, y - 7);
      return;
    }
    if (kind === 'origami') {
      /* THE SPIN: the house's purple light, the fox fluttering down in it */
      var sp = 0.72 + 0.28 * Math.sin(age * 3.1), fx = x + driftOf(ob);
      glow(ctx, fx, y, Math.round(16 + sp * 5),
           'rgba(230,179,255,' + (0.46 * sp).toFixed(3) + ')',
           'rgba(176,97,240,' + (0.22 * sp).toFixed(3) + ')', 'rgba(90,42,140,0)');
      f = T.fox[tiltOf(ob)];
      blitBelowCeil(ctx, f.canvas, fx - f.w / 2, y - f.h / 2);
      return;
    }
    /* THE ROBOT: the gold glow and two sparkles, the gold wood swaying in it */
    var gp = 0.72 + 0.28 * Math.sin(age * 2.6);
    glow(ctx, x, y, Math.round(14 + gp * 4),
         'rgba(242,207,106,' + (0.45 * gp).toFixed(3) + ')',
         'rgba(224,176,74,' + (0.20 * gp).toFixed(3) + ')', 'rgba(224,176,74,0)');
    for (i = 0; i < 2; i++) {
      k = wrap(age * 0.9 + i * 0.5, 1);
      var sy = y - 9 - Math.round(k * 6);
      if (sy >= CEIL) dot(ctx, x - 6 + i * 12, sy, i ? P.goldHi : P.gold);
    }
    f = T.robot[tiltOf(ob)];
    blitBelowCeil(ctx, f.canvas, x - f.w / 2, y - f.h / 2);
  }

  /* THE SPOT on the shelf under whatever is coming down: wide and faint
     while it is up by the lid, tight and dark as it arrives; in a gift's
     own colour, so the spot tells the kind before the thing is in sight
     (the Island's rule). On the shelf's top, outside everything. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1), kind = kindOf(ob);
    var gift = kind !== 'can' && kind !== 'tumbler';
    var w = (gift ? 15 : 13) - Math.round(6 * k);
    var col = kind === 'verve' ? P.verveDeep : kind === 'pine' ? P.pineDot
            : kind === 'origami' ? '#5a2a8c' : kind === 'robot' ? P.goldDeep : P.under;
    var sx = Math.round(ob.x - w / 2);
    Tint.rect(ctx, sx, FLOOR - 1, w, 2, col, 6 + Math.round(10 * k));
    if (gift && k > 0.35) {
      var a = ctx.globalAlpha;
      ctx.globalAlpha = a * 0.7 * k;
      rect(ctx, sx + 2, FLOOR - 1, w - 4, 1, K.underLight);
      ctx.globalAlpha = a;
    }
  }

  /* WHAT IS LEFT, on the shelf: a glass in shards, the tumbler in black
     ones, the pineapple glass in shards with its yellow; the Verve on its
     side; the fox and the robot sitting where they came down, upright.
     Faded over the last
     half second rather than blinking out. */
  function drawDropSplat(ctx, ob) {
    var x = Math.round(ob.x), kind = kindOf(ob), a = ctx.globalAlpha, f;
    ctx.globalAlpha = a * clamp(ob.broken / 0.5, 0, 1);
    if (kind === 'can') ctx.drawImage(T.shardsGlass.canvas, x - 13, FLOOR - 4);
    else if (kind === 'tumbler') ctx.drawImage(T.shardsBlack.canvas, x - 13, FLOOR - 4);
    else if (kind === 'pine') ctx.drawImage(T.shardsPine.canvas, x - 13, FLOOR - 4);
    else if (kind === 'verve') {
      Tint.rect(ctx, x - 9, FLOOR, 18, 1, P.void, 6);
      ctx.drawImage(T.verveLying.canvas, x - 9, FLOOR - 9);
    } else {
      f = kind === 'origami' ? T.foxStill : T.robotStill;
      Tint.rect(ctx, x - 7, FLOOR, 14, 1, P.void, 6);
      ctx.drawImage(f.canvas, x - f.w / 2, FLOOR - LAND_OFF[kind] - f.h / 2);
    }
    ctx.globalAlpha = a;
  }

  /* --------------------------------------------------- the spare life */
  function boonBob(ob) { return Math.sin((ob.age || 0) * 2 + ob.phase) > 0.35 ? -1 : 0; }

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var i;
    if (!ob.held) Tint.rect(ctx, Math.round(ob.x) - 8, FLOOR - 1, 16, 2, P.void, 7);
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 8 + ob.dy) + boonBob(ob);
    /* THE GLOW SAYS SPARE LIFE: the jade every spare life wears, and the
       Smiski glows in the dark anyway */
    var pulse = 0.8 + 0.2 * Math.sin(ob.phase + (ob.age || 0) * 2.6);
    var r = Math.round(20 + pulse * 6);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.72 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, Math.max(CEIL, y - r), r * 2, y + r - Math.max(CEIL, y - r));
    ctx.drawImage(T.smiski.canvas, x - 5, y - 8);
    for (i = 0; i < 3; i++) {
      var k = wrap(ob.phase * 0.22 + (ob.age || 0) * 0.3 + i * 0.34, 1);
      dot(ctx, x - 6 + i * 6, y - 11 - Math.round(k * 10), i === 1 ? P.smiskiLit : P.lifePale);
    }
  }

  function drawLitter(ctx, ob) {
    var t = T.litter[ob.kind] || T.litter[0];
    ctx.drawImage(t.canvas, Math.round(ob.x) - (t.w >> 1), FLOOR - t.h + (ob.kind === 1 ? 1 : 0));
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
    /* a spike is never armed in here and draws nothing */
  }

  /* ======================================================= THE COVER

     118 x 114 on the big card, 82 x 94 on the side ones, 72 x 44 in the
     stands' TV; the caller has clipped. The top tier straight on at the
     bay's own row fractions: the lid band (11%) - the cream rail, the top
     board, the dark arris - the panel with the cleat along its top and
     its fall of light, HIS THINGS standing on the shelf behind the stacks
     and going by with them (the big card: the ROK press, the French press
     and the Chemex at their own spacing in A; the small ones: the French
     press and the decanter), the shelf line and its green edge at 89%,
     the tier below with three soft rings of light under the glass. Two
     stacks half a loop apart, the loop running from off the right edge
     to off the left (the Fridge's cover loop): ribbed tumblers under a
     black mug stack, tulip glasses under a navy one. A can glass
     tumbling down the left third with its spot. AND THE LET-GO, on the
     first stack every time round: the rock as it passes two thirds of
     the card, the lid's edge white, the block falling onto the dish, the
     glints, and the gap standing at the lid until the loop carries it
     off. The card is a window on the scene: the things are at the
     lane's scale on it, box-filtered down from their own bakes. */
  var COVER_THINGS = [['rok', 'frenchPress', 'chemex'], ['frenchPress', 'decanter']];
  T.cover = {};
  /* a bake shrunk by area: each pixel the average of what it covers,
     opaque where at least half of it is covered, so the edges stay hard */
  function shrink(src, dw, dh) {
    var sw = src.w, sh = src.h, d = src.ctx.getImageData(0, 0, sw, sh).data;
    var kx = sw / dw, ky = sh / dh;
    return pixelSheet(dw, dh, function (x, y) {
      var x0 = x * kx, x1 = x0 + kx, y0 = y * ky, y1 = y0 + ky, r = 0, g = 0, b = 0, a = 0, area = 0;
      for (var yy = Math.floor(y0); yy < Math.ceil(y1); yy++) {
        var wy = Math.min(y1, yy + 1) - Math.max(y0, yy);
        for (var xx = Math.floor(x0); xx < Math.ceil(x1); xx++) {
          var wx = Math.min(x1, xx + 1) - Math.max(x0, xx), w = wx * wy, i = (yy * sw + xx) * 4;
          var al = d[i + 3] / 255 * w;
          r += d[i] * al; g += d[i + 1] * al; b += d[i + 2] * al; a += al; area += w;
        }
      }
      return a >= area * 0.5 ? [r / a, g / a, b / a] : null;
    });
  }
  /* the card's shelf row, one loop long, baked the first time a card of
     that size is drawn: the things at the lane's scale, their feet on
     the shelf, each with its 1 px shadow down its right side */
  function coverRow(lane, loop, big) {
    var key = (big ? 'b' : 's') + lane + '_' + loop;
    if (T.cover[key]) return T.cover[key];
    var k = lane / LANE_H, t = makeCanvas(loop, lane), c = t.ctx;
    var names = COVER_THINGS[big ? 0 : 1], u0 = T[names[0]].u;
    for (var i = 0; i < names.length; i++) {
      var src = T[names[i]], dw = Math.max(1, Math.round(src.w * k)), dh = Math.max(1, Math.round(src.h * k));
      var sm = shrink(src, dw, dh);
      var at = big ? Math.round((src.u - u0) * k) + 4 : Math.round(i * loop / 2) + 6;
      var top = lane - Math.round((FLOOR - src.top) * k);
      var sh = makeCanvas(dw, dh);
      sh.ctx.drawImage(sm.canvas, 0, 0);
      sh.ctx.globalCompositeOperation = 'source-in';
      sh.ctx.fillStyle = P.void; sh.ctx.fillRect(0, 0, dw, dh);
      c.globalAlpha = 2 / 16; c.drawImage(sh.canvas, at + 1, top); c.globalAlpha = 1;
      c.drawImage(sm.canvas, at, top);
    }
    T.cover[key] = t;
    return t;
  }

  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22, i, k;
    var lidH = Math.max(3, Math.round(h * 0.11));
    var shelfY = y + Math.round(h * 0.89);
    var top = y + lidH, lane = shelfY - top, kk = lane / LANE_H;
    var sw = Math.max(6, Math.round(34 * kk)), loop = w + sw + 14;
    /* the panel: the cleat along its top, the light falling down it */
    for (i = top; i < shelfY; i++) rect(ctx, x, i, w, 1, mix(P.panelTop, P.panelLit, (i - top) / Math.max(1, lane)));
    var cleatH = Math.max(1, Math.round(14 * kk));
    rect(ctx, x, top, w, cleatH, P.cleat);
    rect(ctx, x, top + cleatH - 1, w, 1, P.cleatShade);
    /* his things on the shelf, at 1.0 with the stacks */
    var row = coverRow(lane, loop, big), off = wrap(s, loop);
    for (var tx = x - off; tx < x + w; tx += loop) ctx.drawImage(row.canvas, Math.round(tx), top);
    /* the shelf underfoot: its kill row, the green edge, then the tier
       below and three soft rings of light under the glass */
    rect(ctx, x, shelfY, w, y + h - shelfY, P.panelMid);
    rect(ctx, x, shelfY, w, 1, P.shelfLine);
    if (shelfY + 3 < y + h) { rect(ctx, x, shelfY + 1, w, 1, P.gEdge0); rect(ctx, x, shelfY + 2, w, 1, P.gEdge2); }
    if (shelfY + 4 < y + h) rect(ctx, x, shelfY + 3, w, 1, P.under);
    var bandY = shelfY + 4, bandH = y + h - bandY;
    if (bandH >= 4) {
      var RINGS = [[0.18, 0.40, 7], [0.52, 0.62, 5], [0.80, 0.35, 6]];
      for (i = 0; i < RINGS.length; i++) {
        var rx = x + Math.round(wrap(RINGS[i][0] * w - s * PAR_PANEL, w + 16)) - 8;
        var ry = bandY + Math.round(RINGS[i][1] * (bandH - 2)), ra = big ? RINGS[i][2] : RINGS[i][2] - 1;
        Tint.rect(ctx, rx - ra + 1, ry - 1, ra * 2 - 2, 2, P.ringGlow, 3);
        Tint.rect(ctx, rx - ra + 2, ry + 1, ra * 2 - 4, 1, P.ring, 6);
        Tint.rect(ctx, rx - ra, ry, 1, 1, P.ring, 4); Tint.rect(ctx, rx + ra - 1, ry, 1, 1, P.ring, 4);
      }
    }
    /* the lid: the cream rail, the top board, the dark arris */
    rect(ctx, x, y, w, lidH, K.cabinet);
    rect(ctx, x, y, w, 1, K.cabinetLit);
    var boardH = Math.max(2, Math.round(lidH * 0.4));
    rect(ctx, x, y + lidH - boardH - 1, w, 1, K.cabinetShade);
    rect(ctx, x, y + lidH - boardH, w, 1, P.boardLit);
    rect(ctx, x, y + lidH - boardH + 1, w, boardH - 2, P.board);
    rect(ctx, x, y + lidH - 1, w, 1, P.arris);

    /* the two stacks */
    var gapH = Math.round(lane * 0.40);
    for (i = 0; i < 2; i++) {
      var p = wrap(s + i * loop / 2, loop);
      var sx0 = Math.round(x + w + 10 - p);
      if (sx0 < x - sw - 4 || sx0 > x + w + 2) continue;
      var gapY = top + Math.round(lane * (i ? 0.30 : 0.36));
      /* the let-go, on stack 0, on its own place along the loop */
      var lgP = w + 10 - w * 0.66, rockEnd = lgP + 0.55 * 22, fallEnd = rockEnd + 0.40 * 22;
      var landed = i === 0 && p >= fallEnd, falling = i === 0 && p >= rockEnd && !landed;
      var rocking = i === 0 && p >= lgP && p < rockEnd;
      var hH = gapY - top;
      var dish = gapY + gapH;
      if (landed) {
        stacklet(ctx, sx0, dish + 1, shelfY - dish - 1, sw, false, i);
        mugBlock(ctx, sx0, dish - hH, hH, sw, i);
        if (p < fallEnd + 10) {
          for (k = 0; k < 4; k++) dot(ctx, sx0 - 2 + k * (sw + 4) / 3 + Math.round((p - fallEnd) * (k < 2 ? -0.3 : 0.3)),
                                   dish - 2 - Math.round((p - fallEnd) * 0.4), P.glassHi);
        }
      } else if (falling) {
        stacklet(ctx, sx0, dish, shelfY - dish, sw, false, i);
        var fk = (p - rockEnd) / (fallEnd - rockEnd);
        mugBlock(ctx, sx0, top + Math.round(gapH * fk * fk), hH, sw, i);
      } else {
        var dx = rocking ? Math.round(1.4 * Math.sin((p - lgP) * 1.1)) : 0;
        stacklet(ctx, sx0, dish, shelfY - dish, sw, false, i);
        mugBlock(ctx, sx0 + dx, top + (rocking && p - lgP > 4 ? 1 : 0), hH, sw, i);
        if (rocking) {
          var fl = Math.floor(p) & 1;
          rect(ctx, sx0 + dx - 2, top - 1, sw + 4, 1, fl ? P.glassHi : P.boardLit);
          if (p - lgP > 4) rect(ctx, sx0 + dx, top, sw, 1, P.glassHi);
        }
      }
    }

    /* a can glass on a 2.6 s loop, and its spot */
    var ek = wrap(t / 2.6, 1), ey = top + Math.round(ek * (lane - 6)), ex = x + Math.round(w * 0.30);
    var sp = Math.max(2, Math.round(5 - ek * 3));
    Tint.rect(ctx, ex - sp, shelfY - 1, sp * 2 + 1, 2, P.void, 6 + Math.round(8 * ek));
    /* at the card's scale, a glass is a few pixels: upright and on its
       side by turns as it tumbles */
    if (Math.floor(t * 5) & 1) {
      rect(ctx, ex - 3, ey - 2, 7, 5, P.glassEdge);
      rect(ctx, ex - 2, ey - 1, 5, 3, P.glass);
      rect(ctx, ex - 2, ey - 1, 1, 3, P.glassHi);
    } else {
      rect(ctx, ex - 2, ey - 3, 5, 7, P.glassEdge);
      rect(ctx, ex - 1, ey - 2, 3, 5, P.glass);
      rect(ctx, ex - 1, ey - 2, 3, 1, P.glassHi);
    }

    /* the doodad, the Couch's block */
    var ddx = Math.round(x + w * 0.2), ddy = Math.round(y + h * 0.52 + Math.sin(t * 3.1) * (h * 0.12));
    var sz = big ? 8 : 6;
    rect(ctx, ddx - sz / 2 - 1, ddy - sz / 2 - 1, sz + 2, sz + 2, P.outline);
    rect(ctx, ddx - sz / 2, ddy - sz / 2, sz, sz, '#c9873c');
    rect(ctx, ddx - sz / 2, ddy - sz / 2, sz - 2, 1, '#eab873');
    dot(ctx, ddx + sz / 2 - 2, ddy - 1, P.outline);
    rect(ctx, ddx + sz / 2, ddy, 2, 1, '#f3cc84');
  }

  /* one standing stack on a cover: pale glass bands with dark joints and
     the white dish on top */
  function stacklet(ctx, x, y, h, w, hang, v) {
    if (h <= 0) return;
    rect(ctx, x, y, w, h, P.glassEdge);
    rect(ctx, x + 1, y, w - 2, h, P.glass);
    rect(ctx, x + w - 3, y, 2, h, P.glassShade);
    var step = v ? 5 : 4;
    for (var cy = 3; cy < h; cy += step) rect(ctx, x + 1, y + cy, w - 2, 1, P.glassHi);
    rect(ctx, x + 2, y + 3, 1, h - 3, P.glassLite);
    rect(ctx, x - 2, y, w + 4, 3, P.outline);
    rect(ctx, x - 1, y + 1, w + 2, 1, P.dish);
  }
  /* and a block of mugs, top at y, h tall, the cap mug at its foot */
  function mugBlock(ctx, x, y, h, w, v) {
    if (h <= 0) return;
    rect(ctx, x, y, w, h, v ? P.navy : P.mug);
    for (var cy = h - 7; cy > 0; cy -= 5) rect(ctx, x, y + cy, w, 1, v ? P.navyRim : P.mugRim);
    rect(ctx, x + 2, y, 1, h - 3, v ? P.navyLit : P.mugLit);
    rect(ctx, x - 2, y + h - 3, w + 4, 3, P.outline);
    rect(ctx, x - 1, y + h - 3, w + 2, 2, v ? P.navyLit : P.enamel);
  }

  /* ==================================================== GENERATION */

  /* ribbed tumblers 55 in 100, tulip glasses the rest; four hanging
     stacks in five are the black mugs and one the Fly.io navy; the cap
     the LOVE YOU mug a shade more often than the Fly.io one - and never
     the navy mug under a navy stack, where it would vanish. Every field
     is a number or a boolean from birth, so Buster's tape has all of
     them; `n` is its place in the run's order, which is what the let-go
     gate counts by (nothing that rewinds), and lgX its trigger, rolled
     here at the room's speed now (see THE LET-GO). */
  function makePillar(x, gapY, gapH, run) {
    var L = run && run.ledger;
    var n = L ? (L.pn = (L.pn || 0) + 1) : 0;
    var v = chance(0.55) ? 0 : 1, hang = chance(0.8) ? 0 : 1;
    var hot = !!(run && run.hot), sp = run && run.speed > 0 ? run.speed : 120;
    var lo = trigFloor(Math.round(gapH), sp, hot);
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: v, hang: hang, capDown: hang ? 0 : (chance(0.55) ? 0 : 1),
             offS: randInt(0, 2) * 12, offH: randInt(0, 3) * 14,
             seed: randInt(1, 1000000), n: n,
             lg: 0, lt: 0, ly: 0, lv: 0, lh: 0, lq: 0, lhL: 0, lgSpd: 0,
             lgX: rollTrig(lo, TRIG_HI), lgLo: lo, lgRock: 0, lgPx: 0,
             lgTried: false, lgDbl: false, lgHot: false,
             scored: false };
  }

  /* NO SPIKES IN HERE (the tune's shut gate, spikeScore 1e9). The
     contract's maker answers anyway, with nothing that draws or kills. */
  function makeSpikes(x, side, count, maxLen, run) {
    return { type: 'spike', x: Math.round(x), side: 'floor', w: 1, spikes: [] };
  }

  /* ONE MAKER FOR THE GLASSES, THE VERVE AND THE ROBOT (the pineapple
     and the fox are the engine's, set after this returns, and dressed on
     their first step). `want` is Crow's: 'gold' makes the robot on
     request, 'plain' anything but, and neither touches a die of the
     bay's own - there is no gold of this bay's own to touch. */
  function makeDrop(x, spicy, fall, run, want) {
    var gold = want === 'gold';
    var kind = chance(CAN_SHARE) ? 0 : 1;
    var ob = { type: 'drop', x: x, y: CEIL + 2, vy: fall, spicy: !!spicy, gold: gold, broken: 0,
               kind: kind, w: kind ? 10 : 12, spin: rand(0, TAU),
               spinRate: rand(3.2, 5.6) * (chance(0.5) ? -1 : 1),
               landCry: 'crush', burst: kind ? [P.mugLit, P.mug] : [P.glassHi, P.glassEdge],
               splat: SPLAT_TIME, dressed: false };
    if (spicy) dress(ob, 'verve');
    if (gold) { ob.name = GOLD_NAME; dress(ob, 'robot'); }
    return ob;
  }

  /* a gift's own size, voice and burst, set once - the engine makes a
     glass sour or a spin after makeDrop returns, so those two are dressed
     on their first step. New arrays, never an edit of the old one: a
     copy of this drop (Pepper's) shares the old one. */
  function dress(ob, kind) {
    ob.dressed = true;
    if (kind === 'verve') { ob.w = 12; ob.landCry = 'clink'; ob.burst = [P.verveHi, P.verve]; ob.splat = 1.2; }
    else if (kind === 'pine') { ob.w = 12; ob.landCry = 'clink'; ob.burst = [P.glassHi, P.pine]; ob.splat = 1.4; }
    else if (kind === 'origami') {
      ob.w = 16; ob.landCry = 'pat'; ob.burst = [P.foxLit, P.fox]; ob.splat = 1.2;
      ob.spinRate = FOX_SWAY;
    } else if (kind === 'robot') {
      ob.w = 14; ob.landCry = 'tock'; ob.burst = [P.rbLit, P.rb]; ob.splat = 1.2;
      ob.spinRate = ROBOT_SWAY;
    }
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 16, kind: randInt(0, 2) };
  }

  /* THE SMISKI, sitting on the shelf; it breathes a pixel on its own
     phase, by the age both the draw and the box read */
  function makeBoon(x, run) {
    return { type: 'boon', x: x, y: FLOOR - 16, w: 12, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0, name: BOON_NAME,
             burst: [P.smiskiLit, P.smiski, P.lifePale, P.lifeJade] };
  }

  /* ======================================================= PHYSICS

     stepDrop owns every drop. CLONE-SAFE for Pepper: it rolls no dice,
     writes only the drop it is handed, replaces rather than edits the
     one array hanging off it, and keeps nothing anywhere else.
       A GLASS or THE TUMBLER falls at DROP_GRAV, tumbling.
       THE VERVE and THE PINEAPPLE GLASS at 170 - the pineapple swaying
         three pixels either way at 3 rad/s, a real sway, so its box goes
         where its picture goes.
       THE FOX and THE ROBOT at 150, swaying (their phase is `spin`). */
  function stepDrop(ob, dt, obstacles, run) {
    var kind = kindOf(ob);
    if (kind === 'can' || kind === 'tumbler') {
      ob.vy += (KNOB.dropGrav || DROP_GRAV) * dt;
      ob.spin += ob.spinRate * dt;
    } else {
      if (!ob.dressed || (kind === 'pine' && ob.landCry !== 'clink') ||
          (kind === 'origami' && ob.landCry !== 'pat')) dress(ob, kind);
      ob.vy += GIFT_GRAV[kind] * dt;
      if (kind === 'pine') ob.x += Math.cos((ob.age || 0) * 3) * 9 * dt;
      if (kind === 'origami' || kind === 'robot') ob.spin += ob.spinRate * dt;
    }
    ob.y += ob.vy * dt;
    return ob.y >= FLOOR - LAND_OFF[kind];
  }

  /* ================================================= THE LET-GO, RUN

     The running count, read-only, for the headless checks: reset when a
     fresh ledger is seen (a new run, or a RETRY). */
  var tally = {};
  function resetTally() {
    tally.armedEarly = 0; tally.armedLate = 0; tally.armedDeep = 0; tally.doubles = 0;
    tally.letGo = 0; tally.landed = 0; tally.fellNear = 0; tally.minFallGap = 1e9; tally.minLandX = 1e9;
    tally.heldGrace = 0; tally.skipMeet = 0; tally.tooTall = 0; tally.rolled = 0;
    tally.earlyT = 0; tally.lateT = 0; tally.deepT = 0; tally.passedLanded = 0;
    tally.tooClose = 0; tally.badLand = 0; tally.lidGapSum = 0; tally.lidGapN = 0; tally.lidGapMin = 1e9;
    /* the spontaneity: where each was armed, how long it rocked */
    tally.armXSum = 0; tally.armXMin = 1e9; tally.armXMax = 0; tally.armWithinNear = 0;
    tally.armXFloorMin = 1e9;
    tally.rockSum = 0; tally.rockMin = 1e9; tally.rockMax = 0; tally.rockMinHot = 1e9; tally.rockMaxHot = 0;
    tally.chinks = 0;
    /* the heat: armed and landed in it, the least landing x, the doubles
       it refused, the stacks it re-rolled */
    tally.armedHot = 0; tally.landedHot = 0; tally.hotMinLandX = 1e9; tally.hotDblHeld = 0; tally.hotReroll = 0;
    tally.armedOnRun = 0; tally.hotT = 0; tally.hotEarlyT = 0; tally.hotLateT = 0;
    tally.armedHotEarly = 0; tally.armedHotLate = 0; tally.dblHot = 0;
  }
  resetTally();
  /* a test hook for the review sheets: arm the next stack that is on the
     screen and not yet let go, whatever the dice and the gates say */
  var forceNext = false;
  /* and the knobs a headless sweep may turn (empty in play) */
  var KNOB = {};
  function force() { forceNext = true; }

  function arm(ob, run, L, phase, dbl) {
    var hot = !!run.hot;
    ob.lg = 1; ob.lt = 0; ob.ly = CEIL; ob.lv = 0;
    ob.lh = ob.gapY - CEIL;
    ob.lgSpd = Math.max(40, run.speed || 0);
    ob.lgPx = ob.x;
    ob.lgDbl = !!dbl;
    ob.lgHot = hot;
    ob.lgRock = clamp(rockFor(ob, run), rockMin(hot), ROCK_MAX);
    tally.armXSum += ob.x; tally.armedOnRun++;
    if (ob.x < tally.armXMin) tally.armXMin = ob.x;
    if (ob.x > tally.armXMax) tally.armXMax = ob.x;
    if (ob.lgLo < tally.armXFloorMin) tally.armXFloorMin = ob.lgLo;
    if (ob.lgX <= ob.lgLo + NEAR_W) tally.armWithinNear++;
    tally.rockSum += ob.lgRock; tally.chinks++;
    if (hot) {
      tally.armedHot++;
      if (phase > 0) tally.armedHotLate++; else tally.armedHotEarly++;
      if (dbl) tally.dblHot++;
      if (ob.lgRock < tally.rockMinHot) tally.rockMinHot = ob.lgRock;
      if (ob.lgRock > tally.rockMaxHot) tally.rockMaxHot = ob.lgRock;
    } else {
      if (ob.lgRock < tally.rockMin) tally.rockMin = ob.lgRock;
      if (ob.lgRock > tally.rockMax) tally.rockMax = ob.lgRock;
    }
    L.lgLast = ob.n; L.lgWasDouble = !!dbl;
    L.cry = 'chink';
    if (!L.lgWarned) { L.lgWarned = true; L.warn = 'letgo'; }
    else if (phase > 0 && !L.lgLateWarned) { L.lgLateWarned = true; L.warn = 'anyNow'; }
    if (dbl && !L.lgDblWarned) { L.lgDblWarned = true; L.lgLateWarned = true; L.warn = 'twice'; }
    if (phase === 0) tally.armedEarly++; else if (phase === 1) tally.armedLate++; else tally.armedDeep++;
    if (dbl) tally.doubles++;
  }

  /* the first frame a pillar's column reaches its trigger: one roll */
  function tryArm(ob, run, L) {
    var score = run.score || 0, late = !!run.late, hot = !!run.hot;
    if (run.grace && score >= LETGO_AT && rockFor(ob, run) >= rockMin(hot)) return;
    ob.lgTried = true;
    if (score < LETGO_AT) return;
    if (ob.meet) { tally.skipMeet++; return; }
    if (run.grace) { tally.heldGrace++; return; }
    var phase = score >= DOUBLE_AT ? 2 : (late ? 1 : 0);
    var between = ob.n - L.lgLast - 1, p = 0, dbl = false;
    if (between >= (KNOB.gate || GATE)[late ? 1 : 0]) p = LETGO_P[phase];
    else if (score >= DOUBLE_AT && between === 0 && !L.lgWasDouble) {
      if (hot) { tally.hotDblHeld++; return; }
      p = KNOB.dblP || DOUBLE_P; dbl = true;
    }
    if (!p) return;
    if (!late && ob.gapY - CEIL > (KNOB.earlyMaxH || EARLY_MAX_H)) { tally.tooTall++; return; }
    if (rockFor(ob, run) < rockMin(hot)) { tally.tooClose++; return; }
    if (KNOB.tallBias && late) p *= 0.6 + 0.8 * clamp((ob.gapY - CEIL - 34) / 68, 0, 1);
    tally.rolled++;
    if (!chance(p)) return;
    arm(ob, run, L, phase, dbl);
  }

  /* THE FLOOR AND THE ROCK, cold or hot. fallT: the block's fall for a
     gap, plus the frame on which the landing is seen (the stepped clock
     lands a frame late at worst). trigFloor: the least x a stack may be armed at for the shortest
     rock and the fall to land it at the floor. rockFor: the rock the
     distance allows now, at the room's speed now. rollTrig: three in ten
     from the near end, the rest past it to TRIG_HI. */
  function fallT(gapH) { return Math.sqrt(2 * gapH / FALL_G) + 1 / 60; }
  function rockMin(hot) { return hot ? (KNOB.rockMinHot || ROCK_MIN_HOT) : ROCK_MIN; }
  function landMin(hot) { return hot ? (KNOB.landMinHot || LAND_MIN_HOT) : (KNOB.landMin || LAND_MIN); }
  function trigFloor(gapH, sp, hot) {
    return Math.ceil(landMin(hot) + sp * (rockMin(hot) + fallT(gapH)));
  }
  function rockFor(ob, run) {
    var sp = Math.max(40, run.speed || 0);
    return (ob.x - landMin(!!run.hot)) / sp - fallT(ob.gapH);
  }
  function rollTrig(lo, hi) {
    if (lo >= hi) return hi;
    if (chance(NEAR_P)) return randInt(lo, Math.min(hi, lo + NEAR_W));
    return lo + NEAR_W + 1 <= hi ? randInt(lo + NEAR_W + 1, hi) : randInt(lo, hi);
  }

  /* one step of a let-go under way, on the distance clock: the distance
     the column really moved since the last step (lgPx, its x then) over
     its speed at arming - measured, not taken from the room's speed,
     which is a frame stale when the heat comes or goes */
  function stepLetGo(ob, dt, run, L) {
    var moved = ob.lgPx - ob.x;
    ob.lgPx = ob.x;
    var dtL = clamp(moved / (ob.lgSpd || 1), 0, 3 * dt);
    if (ob.lg === 1) {
      var t0 = ob.lt, rock = rockOf(ob);
      ob.lt += dtL;
      /* a chink every CHINK_EVERY of the rock, none in its last 0.1 s */
      if (Math.floor(ob.lt / CHINK_EVERY) > Math.floor(t0 / CHINK_EVERY) && ob.lt < rock - CHINK_QUIET) {
        if (!L.cry) L.cry = 'chink';
        tally.chinks++;
      }
      if (ob.lt >= rock) {
        /* the part of this frame past the rock's end is already falling,
           so the rock is exactly as long as it was promised */
        var over = ob.lt - rock;
        ob.lg = 2; ob.lt = 0; ob.ly = CEIL + SEP_MAX + 0.5 * FALL_G * over * over; ob.lv = FALL_G * over;
        ob.lh = ob.gapY - CEIL;
        if (!L.cry) L.cry = 'clink';
        tally.letGo++;
      }
      return;
    }
    if (ob.lg === 2) {
      ob.lv += FALL_G * dtL;
      ob.ly += ob.lv * dtL;
      var gap = ob.x - 4 - ((run.px || 116) + (run.hr || 11));
      if (gap < tally.minFallGap) tally.minFallGap = gap;
      if (gap < NEAR_FRONT && !ob.lgNear) { ob.lgNear = true; tally.fellNear++; }
      var dish = ob.gapY + ob.gapH;
      if (ob.ly + ob.lh >= dish) land(ob, L, dish);
      return;
    }
    if (ob.lg === 3) {
      if (ob.lt < 1) ob.lt += dt;
      /* the nesting: the block's top comes down, the gap grows by as
         much (and Alpha's note of the gap with it) */
      if (ob.lq > ob.lhL) {
        var want = Math.max(ob.lhL, Math.round(ob.lh - (ob.lh - ob.lhL) * ob.lt / SQUASH_T));
        var d = ob.lq - want;
        if (d > 0) {
          ob.lq = want; ob.gapH += d;
          if (ob.auraK !== undefined) ob.gb0 += d;
          if (ob.lq === ob.lhL) { tally.lidGapSum += ob.gapH; tally.lidGapN++; if (ob.gapH < tally.lidGapMin) tally.lidGapMin = ob.gapH; }
        }
      }
    }
  }

  /* THE GAP MOVES: the block's foot on the dish, the new mouth its top,
     the gap from the lid down to it. If Alpha's aura took hold of this
     pillar while the block was in the air, its notes are moved with the
     gap (the top can give nothing now: it is the lid). */
  function land(ob, L, dish) {
    ob.ly = dish - ob.lh;
    var mouth = dish - ob.lh;
    if (ob.auraK !== undefined) {
      ob.gb0 = ob.gb0 - ob.lh;
      ob.gy0 = CEIL;
      ob.pushUp = 0;
    }
    ob.gapH = mouth - CEIL;
    ob.gapY = CEIL;
    ob.lg = 3; ob.lt = 0;
    ob.lq = ob.lh;
    var np = KNOB.nestPitch || NEST_PITCH;
    ob.lhL = ob.lh - Math.round(Math.max(0, ob.lh - 14) * (14 - np) / 14);
    L.cry = 'clang'; L.shake = 2;
    tally.landed++;
    if (ob.lgHot) { tally.landedHot++; if (ob.x < tally.hotMinLandX) tally.hotMinLandX = ob.x; }
    else if (ob.x < tally.minLandX) tally.minLandX = ob.x;
    if (ob.gapH < 80) tally.badLand++;
  }

  /* THE ROOM'S OWN STEP: every pillar's let-go, once a frame. It never
     splices; it writes only pillars' own numbers and the ledger. */
  function stepWorld(dt, obstacles, run) {
    var L = run.ledger, i, ob;
    if (!L) return;
    if (!L.lgInit) {
      L.lgInit = true; L.lgLast = -99; L.lgWasDouble = false;
      L.lgWarned = false; L.lgLateWarned = false; L.lgDblWarned = false;
      resetTally();
    }
    var score = run.score || 0;
    if (run.hot) {
      tally.hotT += dt;
      if (run.late || score >= DOUBLE_AT) tally.hotLateT += dt; else if (score >= LETGO_AT) tally.hotEarlyT += dt;
    }
    if (score >= DOUBLE_AT) tally.deepT += dt;
    else if (run.late) tally.lateT += dt;
    else if (score >= LETGO_AT) tally.earlyT += dt;
    /* THE HEAT COMES: every stack on screen not yet tried re-rolls its
       trigger inside the hot range, or is let be if it is already
       inside the hot floor (it will be refused there as too close) */
    var hot = !!run.hot;
    if (hot && !L.hotWas) {
      var sp = Math.max(40, run.speed || 0);
      for (i = 0; i < obstacles.length; i++) {
        ob = obstacles[i];
        if (ob.type !== 'pillar' || ob.lgTried || ob.lg > 0) continue;
        var lo = trigFloor(ob.gapH, sp, true);
        if (ob.x > lo) { ob.lgLo = lo; ob.lgX = rollTrig(lo, Math.min(TRIG_HI, Math.floor(ob.x))); tally.hotReroll++; }
      }
    }
    L.hotWas = hot;
    for (i = 0; i < obstacles.length; i++) {
      ob = obstacles[i];
      if (ob.type !== 'pillar') continue;
      if (ob.lg > 0) stepLetGo(ob, dt, run, L);
      else if (forceNext && !ob.meet && ob.x < VW - 40 && ob.x > 300) {
        forceNext = false; ob.lgTried = true;
        arm(ob, run, L, run.late ? 1 : 0, false);
      } else if (!ob.lgTried && ob.x <= (ob.lgX || TRIG_HI)) tryArm(ob, run, L);
      if (ob.scored && ob.lg === 3 && !ob.lgPassed) { ob.lgPassed = true; tally.passedLanded++; }
    }
  }

  /* ===================================================== THE BOXES

     Every lethal pixel has a box and nothing harmless has one. */
  function rectsFor(ob, out) {
    var i, b;
    if (ob.type === 'pillar') {
      if (ob.lg === 3) {
        /* LANDED: the mugs standing on the dish (no 42 wings at the top:
           there is no wide thing there, only the foot), the cap mug's
           rim on the dish, the dish, the glasses */
        var m = ob.gapY + ob.gapH;
        out.push([ob.x, m, 34, ob.lq - 9]);
        out.push([ob.x - 4, m + ob.lq - 9, 42, 9]);
        out.push([ob.x - 4, m + ob.lq, 42, 9]);
        var cy = m + ob.lq + 9;
        if (FLOOR - cy > 0) out.push([ob.x, cy, 34, FLOOR - cy]);
        return out;
      }
      if (ob.lg === 2) {
        /* FALLING: the whole block, where it is drawn */
        var ly = Math.round(ob.ly);
        out.push([ob.x, ly, 34, ob.lh - 9]);
        out.push([ob.x - 4, ly + ob.lh - 9, 42, 9]);
      } else {
        /* the Coop's two upper boxes - ROCKING WITH THE STACK */
        var dx = ob.lg === 1 ? rockDx(ob) : 0, sp = ob.lg === 1 ? rockSep(ob) : 0;
        var topH = ob.gapY - 9 - CEIL;
        if (topH > 0) out.push([ob.x + dx, CEIL + sp, 34, topH]);
        out.push([ob.x + dx - 4, ob.gapY - 9 + sp, 42, 9]);
      }
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, 42, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, 34, botH]);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      var kind = kindOf(ob), x = Math.round(ob.x), y = Math.round(ob.y);
      if (kind === 'can' || kind === 'tumbler') {
        /* the frame's own cells, cut from the picture */
        var bx = (kind === 'can' ? T.can : T.tumbler)[frameOf(ob)].box;
        for (i = 0; i < bx.length; i++) { b = bx[i]; out.push([x + b[0], y + b[1], b[2], b[3]]); }
      } else if (kind === 'verve') out.push([x - 5, y - 9, 10, 18]);
      else if (kind === 'pine') out.push([x - 6, y - 7, 12, 14]);
      else if (kind === 'origami') out.push([x + driftOf(ob) - 8, y - 7, 16, 14]);
      else out.push([x - 7, y - 9, 14, 18]);
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 5, FLOOR - 16 + ob.dy + boonBob(ob), 10, 16]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME, CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor, drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop, GOLD_GIFT: true,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld,
    rectsFor: rectsFor,
    /* for the headless checks, read-only: the let-go's running count,
       the review sheets' hook, and the constants the owner may turn */
    tally: tally, force: force, KNOB: KNOB,
    /* the room's layers one at a time, for the backdrop checks */
    layers: { back: function (ctx, s) { tileX(ctx, T.back.canvas, s * PAR_PANEL, CEIL); },
              row: function (ctx, s) { tileX(ctx, T.shelfRow.canvas, s, CEIL); },
              floor: function (ctx, s) { drawFloor(ctx, s); }, lid: function (ctx, s) { drawCeiling(ctx, s); } },
    SEC: SEC, LAP: LAP, BACK_LAP: BACK_LAP,
    LETGO_AT: LETGO_AT, DOUBLE_AT: DOUBLE_AT, LETGO_P: LETGO_P, DOUBLE_P: DOUBLE_P,
    EARLY_MAX_H: EARLY_MAX_H, TRIG_HI: TRIG_HI, ROCK_MIN: ROCK_MIN, ROCK_MIN_HOT: ROCK_MIN_HOT,
    ROCK_MAX: ROCK_MAX, CHINK_EVERY: CHINK_EVERY, LAND_MIN: LAND_MIN, LAND_MIN_HOT: LAND_MIN_HOT,
    NEAR_P: NEAR_P, NEAR_W: NEAR_W
  };
})();
