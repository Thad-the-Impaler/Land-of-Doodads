/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM / THE TABLE  (3-1)

   Afternoon. You are flying ACROSS THE WALNUT DINING TABLE with your
   chin on it: the lens is five centimetres over the wood, so the walnut
   fills the bottom 40% of the screen, polished, the windows reflected in
   it, running away to its far edge just under the middle of the frame.
   Two white chair backs peek over that edge; behind them the island's
   quartz line with its clutter and the ZZ plant; behind that the kitchen
   - the steel fridge with the photographs all over it, three glass-front
   uppers, the range hood's glass canopy and its chimney rising to the
   ceiling, the big plantation shutters, the doorway with the coats - and
   over all of it the ceiling plane with its cans, taking the top quarter.
   The room's floor is never in frame. Drawn from Table ref 4, the
   owner's own photograph of exactly this view, with the details from
   Table ref 1, 2 and 3: the leaf seams, the fridge's photographs, the
   photo wall (the bar stools are on the island's far side, out of this
   shot). And ref 3 has a squeeze bottle of sauce standing on the
   island, which is where the hazard came from.

   THE OWNER PICKED THE TWO BIG THINGS HIMSELF, after a first cut of
   this room was thrown out, and this file does not re-decide them:
     - the PILLARS are stacks of white dishes, standing on the walnut
       and hanging from the lid (the same stack upside down, mugs mouth
       down). Plates, side plates, saucers, bowls and a mug, jogged a
       pixel either way because nobody stacks a dishwasher's worth
       straight, capped with a platter across the mouth of the gap.
     - the bay's own HAZARD is the squeeze bottle - "clear Heinz
       ketchup bottles and not the cylinder ones you would find in a
       diner". A clear plastic bottle with the glass bottle's shoulders,
       a white flip-top, a blank keystone label and the red visible
       through it, standing on the table between two stacks. Nobody is
       holding it. Every so often it leans, flips its own cap open,
       squeezes, and throws an arc of ketchup over the bay in front of
       it. See THE BOTTLE, below, for why it is always escapable.

   AND THE REST IS THE LEVEL THE OWNER WROTE DOWN: silverware falls off
   the lid; the lid AND the tabletop end the run (the Living Room's rule,
   one room over); a brownie with the heat round it is the spicy drop; a
   folded paper crane fluttering down is the +5; a YOGURT VOLCANO - a
   mound of white yogurt with honey poured into its crater and hemp seeds
   over it - is the spare life. No sour.

   WHY THE KITCHEN IS STEPPED BACK SO FAR. Everything the player has to
   ACT on in here is white: the stacks, the platters, the bottles' caps,
   the yogurt. And the kitchen in the photographs is white too - white
   shaker doors, a white island, white chairs, white shutters. Painted at
   its own value the room would hand every column a background it could
   not separate from, which is the fault the Couch spent four passes
   getting out of. So the far wall and the fixtures come six sixteenths
   down toward a cool grey, the island three, the chairs are painted in
   the room's shade, and nothing behind the lane comes out over 210 - not
   even the slits of daylight in the shutters. Measured over sixteen
   scrolls with no stacks in: the ceiling 164, the wall 148, the island
   and the chairs 132, the far walnut 126, the near walnut 116, the band
   99, the lane as a whole 138 - so porcelain (238) stands 66 clear of the
   chair backs, 74 of the ceiling the hanging stacks cross, and a hundred
   and more clear of the walnut the standing ones are on. The dishes are
   the whitest thing on the screen by design.

   Same discipline as every other level file: every pixel is generated
   and baked once in build(), anything laid over something that scrolls
   is a flat Tint or a baked alpha sheet - there is no Dither.rect in
   this file - and nothing turns by ctx.rotate: the silverware tumbles
   through sixteen baked frames.
------------------------------------------------------------------ */
'use strict';

var Table = (function () {

  /* the house: the Dining Room's shared pigments and the helpers it
     republishes from the Living Room */
  var H = DiningRoom.P;
  var CEIL = DiningRoom.CEIL, FLOOR = DiningRoom.FLOOR;
  var wrap = DiningRoom.wrap, hash = DiningRoom.hash, rowsFill = DiningRoom.rowsFill;
  var ringOf = DiningRoom.ringOf, glow = DiningRoom.glow, blitBelowCeil = DiningRoom.blitBelowCeil;
  var ease = DiningRoom.ease, rgba = DiningRoom.rgba;

  /* The bay's own pigments. PlayScene never reads this table. */
  var P = {
    /* THE DISHES - the hazard's uniform. Nothing that merely stands
       there wears these four, and they are COOL: a white plate in
       window light goes blue-grey in its shadows where the kitchen's
       painted wood goes tan, so the stacks separate from the cabinets
       by hue as well as by value. */
    porcelain:      '#f3efe6',   /* a plate's face                       lum 238 */
    porcelainHi:    '#ffffff',   /* the rim catching the window          */
    porcelainShade: '#dcdfe3',   /* a plate's underside, cool            */
    rimShade:       '#a9b0bb',   /* the dark between two plates          lum 176 */
    rimDeep:        '#7d8793',   /* under a bowl's foot ring             */
    glaze:          '#e6eef2',   /* the blue-white inside a bowl or mug  */

    /* THE ROOM, seen from on the walnut (Table ref 4): the house's
       cabinets, and these */
    ceilingTop:     '#b9b5ac',   /* the plaster 3.3 m off, top of the frame   */
    ceilingFar:     '#d6d2c8',   /* the plaster by the wall, the windows' bounce */
    canTrim:        '#a8a49c',   /* a can's trim ring, the register's face    */
    wallDay:        '#b2afa6',   /* the kitchen's grey wall, ref 4            */
    wallShade2:     '#a9a59c',
    hallWall:       '#a29e96',   hallDark: '#5a554f',
    hallDoor:       '#c4c0b6',   hallDoorPanel: '#b3aea4',
    coatGrey:       '#9a9893',   coatGreyLit: '#b5b3ae',
    slit:           '#e2d6c6',   /* the afternoon between two louvres         */
    glassDeep:      '#5a5650',   glassShelf: '#8e8a82', glassGlare: '#a19d95',
    hoodGlassClear: 'rgba(221,226,223,0.45)',
    islandFrame:    '#948f84',   /* the island's shaker in its own shadow:     */
    islandFace:     '#857f75',   /* ref 4 has its base the darkest band over   */
    islandDeep:     '#6e6a62',   /* the walnut, which is what the chairs stand out against */
    jugClear:       '#cfd5d8',   orange: '#e08a2c',
    fridgeSteel:    '#8b9092',
    chairShade:     '#b4ab9a',   /* a white chair in the room's shade, lum 172 */
    chairPaint:     '#c9c1ae',   /* ... and where the light catches it, 194   */
    chairHi:        '#d8d1c0',   /* the rail's top arris, the window behind it */
    chairDim:       '#a59c8b',   /* the rail's face turning under            */
    /* THE WALNUT AS REF 4 SEES IT: from five centimetres up, a polished
       top mirrors the grey room, so the wood comes out a muted mauve-brown
       - measured off the photograph at this resolution, 128..135 under
       the chair backs and 97..106 at the bottom of the frame - and not
       the house walnut's orange, which is the colour of the edge and the
       grain only */
    walnutEdge:     '#58433a',
    walnutSheen:    '#b08f76',   /* the window, reflected in the far walnut   */
    walnutGlow:     '#a2836c',
    walnutHi2:      '#9a7a64',
    walnutMid:      '#8f705c',
    walnutLit2:     '#836350',
    walnutBody:     '#7a5c48',   /* the near walnut, out of the light         */
    walnutGrainLit: '#9d7d66',   walnutGrainDeep: '#5e4536',
    distanceCool:   '#69696a',   /* the step back on the far kitchen: ref 4's
                                    whites are cool, so the wall leans grey */
    cabinetLine:    '#b7ae9a',   /* the hairline between two doors            */
    glassDark:      '#6e6a63',   /* inside a glass-front cabinet              */
    quartz:         '#ebe8e0',   quartzVein: '#cfcbc2',
    hoodGlass:      '#dde2df',   hoodGlassEdge: '#b4bcb9',
    tileA:          '#c3c0b7',   tileB: '#d2cfc6',   tileC: '#aeaba2',
    coat:           '#2b2826',   coatLit: '#4a4440',
    photoA:         '#6b7f8c',   photoB: '#8c7b6b',  photoC: '#9aa37c',  photoD: '#c9c1b3',
    photoDark:      '#4a4440',   /* the people in the photographs        */
    note:           '#e6d55c',   pinkPaper: '#d98fb5', purple: '#7a4e9a',
    enamelRed:      '#b3382c',   enamelHi: '#d4594a',  enamelDeep: '#7d2219',
    lemon:          '#e8d54a',   canBlue: '#5f8fc4',
    linen:          '#d9cdb4',   linenLit: '#e8dfca', linenShade: '#b8ab90',
    shadeCool:      '#4e4640',   /* the overhang's shade, the lens's side falloff, every contact shadow */
    distance:       '#6f685d',   /* what the kitchen is stepped back toward: its own shade, in the shade */

    /* THE SILVERWARE */
    steel:          '#c9cdd1',   steelHi: '#f2f4f5', steelDark: '#8d9399', steelDeep: '#5f666c',

    /* THE BROWNIE, off Brownie ref: a paper-thin glossy top crackled
       all over, and a dark fudgy crumb under it */
    crumb:          '#4a2a1c',   crumbDark: '#2e1810', crust: '#6b3d26', crustHi: '#8e5a3a',
    gloss:          '#b98a63',

    /* THE CRANE - folded from gold paper, the game's +5 colour */
    craneGold:      '#f2cf6a',   craneDeep: '#c9a23f', craneHi: '#fff3c4',

    /* THE YOGURT VOLCANO */
    yogurt:         '#f7f4ee',   yogurtShade: '#dcd8d0', yogurtDeep: '#bfbab2', yogurtHi: '#ffffff',
    honey:          '#d8962a',   honeyHi: '#f6cf6a',   honeyDeep: '#a86a16',
    seedPale:       '#d9d0a0',   seedGreen: '#8f9e52', seedDark: '#5e4f30',

    /* THE BOTTLES */
    ketchup:        '#c21f1a',   ketchupHi: '#ee5a48', ketchupDeep: '#8c1410',
    mustard:        '#e2b62f',   mustardHi: '#f6dc6a', mustardDeep: '#a78116',
    plastic:        '#e9dcd8',   /* the clear bottle above the fill line: pale, a little pink from the sauce */
    plasticHi:      '#ffffff',
    plasticShade:   '#b9aaa6',   /* the far wall of the empty plastic    */
    plasticClear:   'rgba(238,230,226,0.40)',   /* the empty plastic itself: see-through */
    plasticRing:    'rgba(238,230,226,0.75)',   /* the thread ring on the neck           */
    cap:            '#f4f2ee',   capShade: '#c9c5bf',
    label:          '#f1ebdd',   labelEdge: '#c2b9a5',

    /* an extra life glows the same jade in every level, or the colour
       teaches the player nothing: PlayScene's LIFE_LEAF and LIFE_PALE */
    lifeJade:       '#5fae9a',   lifePale: '#93d8bd',

    outline: H.outline, void: H.void
  };

  /* the neutral effect colours PlayScene paints its particles from */
  var FX = {
    motes: DiningRoom.AIR.motes, motesHi: DiningRoom.AIR.motesHi,
    /* plaster dust when a fork lets go of the lid */
    puff: '#d8c9a4', puffHi: '#efe3c4',
    /* walnut, for the bop particles */
    ground: '#4b3120', groundHi: '#8c6340',
    /* steel glints: the default landing (every drop here carries its own burst anyway) */
    splat: '#c9cdd1', splatHi: '#f2f4f5',
    hot: '#f0922e', hotMid: '#ffb347', hotHi: '#ffe08a', heat: '#f0922e', heatEdge: '#b84d12',
    glowCore: '255,224,138', glowEdge: '240,146,46'
  };

  /* the heads-up when a hazard arms: the thing, then the excuse. The
     lid is the Living Room's own ceiling, one wall over - the same
     plaster, the same crown, the same four hard rows - so it says the
     same two lines the Desk and the Couch say. */
  var WARN = {
    drop:  ['▼ SILVERWARE ▼', 'IT LANDS WHERE YOU FLY'],
    spike: ['▲ KETCHUP ▲', 'NOBODY IS SQUEEZING THEM'],
    ceil:  LivingRoom.WARN_CEIL
  };

  /* the thirteen colours a generic cover would use; this bay paints its
     own (drawPreview), but the table stays honest */
  var PREVIEW = {
    back: H.cabinet, backAlt: H.cabinetLit, seam: P.cabinetLine,
    beam: P.porcelain, beamDark: P.rimShade, beamLight: P.porcelainHi,
    ground: H.walnut, groundDark: H.walnutDeep, groundHi: H.walnutHi,
    spike: P.ketchup, spikeHi: P.ketchupHi, air: H.daylight, gloom: P.shadeCool
  };

  var END_MIN = DiningRoom.END_MIN;
  var CEIL_KILLS = true;

  /* STEEL IS HEAVY. 213px of fall at 300 takes 1.08..1.18s against a
     kernel's 1.6 and a book's 2.5, and a fork that floated would read as
     a feather. It also puts every fork down in front of the doodad:
     spawned at x 280..376 (the tune's dropAhead 104..200), it lands at
     x 146..242 at speedStart and 76..172 at speedMax - which is what
     the spot it casts on the table is for. stepDrop owns every drop in
     this bay, so the engine never reads this number; it is published
     because the contract publishes it. */
  var DROP_GRAV = 300;

  /* how long a fork lies on the walnut: long enough to scroll off at
     speedStart from x 200. The brownie and the crane carry their own. */
  var SPLAT_TIME = 2.4;

  /* THE CRANE IS THE ART'S ROLL, not the tune's, for the Couch's reason:
     a +5 the module did not roll gets a fork's sprite and a fork's fall,
     and the player dodges five points. One drop in twenty, never two
     inside six drops of each other - one every 30..45s, the quarter's
     rarity. goldGap is module state the way the Couch keeps its own. */
  var GOLD_CHANCE = 0.05, GOLD_GAP = 6;
  var goldGap = 0;

  var BOON_NAME = 'YOGURT VOLCANO';
  var GOLD_NAME = 'CRANE';          /* 5 of the +5 shout's 7 characters */

  var T = {};                       /* baked tiles and sprites */

  /* --------------------------------------------------------- the camera

     THE VIEW IS TABLE REF 4, and the owner's verdict on the first cut of
     this bay is why. That cut was painted from a lens half a metre over
     the walnut: an island and its chairs stood ON a walnut band, which
     made the table read as the floor of the room - and THE FLOOR next
     door, painted from the same height one storey down, came out as the
     same picture with a different skirting. Ref 4 puts the lens ON the
     table, five centimetres up, and from there the walnut fills the
     bottom 40% of the frame and everything standing beyond it is
     compressed into a few rows over its far edge. The Table and the Floor
     are now two cameras in ONE room (one set of heights and distances,
     the same numbers js/floor.js quotes), so the same chairs, island,
     fridge and hood appear in each where their height and distance put
     them, and the room's floor is never in this frame at all.

     A pinhole, level:   row(H, D) = 151 - 262 (H - 80) / D
                         width(w, D) = 262 w / D
     H is the height above the room's oak and D the distance from the
     lens, both in cm; the lens is at 80 (the walnut top is 75); 262 px is
     the photograph's own vertical field, kept, so every object lands on
     the row fraction it has in ref 4. Read off it: the walnut's far edge
     (75 cm, 1 m off) is row 164; the island's counter (91, 2.05 m) 137;
     the chair backs' top rail (82..90, 1.18 m) 129..147; the fridge's top
     (180, 2.87 m) 60; the hood's glass canopy (165..178, 3.46 m) 77..87;
     the back wall's uppers (155..265, 5.6 m) 65..116 and the ceiling
     (270) from 3.3 m at row 0 to the crown over the wall at row 62. The
     oak at a metre would be row 360 - off the bottom of the screen.

     PARALLAX BY DEPTH, the one law both bays use: p = min(1, (45/D)^0.75).
     Truly it is D_near / D with D_near about 9 cm, which freezes anything
     past a metre into a painting; this keeps the order, keeps the house's
     usual range, and makes anything nearer than 45 cm the play plane.
        the back wall and the ceiling   D 560      0.15   L0
        the fridge and the hood         D 287..346 0.22   L1
        the island                      D 205      0.32   L2
        the chair backs                 D 118      0.46   L3
        the far walnut, three strips    D 100..44  0.62 / 0.78 / 0.92
        the near walnut and the band    D < 44     1.0
     Every strip boundary sits on a plain row, so it never shows. */
  var WALL_W = 720, WALL_H = 140, WALL_PAR = 0.15;       /* L0 at y 0  */
  var FIX_PAR = 0.22;                                     /* L1, 720x140 at y 0 */
  var ISL_W = 720, ISL_Y = 68, ISL_H = 97, ISL_PAR = 0.32;   /* L2: rows 68..164 */
  var CHR_W = 720, CHR_Y = 129, CHR_H = 36, CHR_PAR = 0.46;  /* L3: rows 129..164 */
  var EDGE_Y = 164;                                       /* the walnut's far edge */
  var STRIPS = [[164, 6, 0.62], [170, 6, 0.78], [176, 5, 0.92]];
  var NEAR_Y = 181, TAB_W = 384;                          /* rows 181..241, then the band */
  var CROWN_Y = 62, UPPER_Y = 65, UPPER_B = 116, NOSE_Y = 137;

  /* --------------------------------------------------------- helpers */

  function rect(c, x, y, w, h, col) {
    if (w <= 0 || h <= 0) return;
    c.fillStyle = col; c.fillRect(x, y, w, h);
  }
  function dot(c, x, y, col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }

  /* a 1px line between two points, Bresenham, for stems and rails */
  function line(c, x0, y0, x1, y1, col, thick) {
    var dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
    var sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, err = dx + dy, e2;
    c.fillStyle = col;
    for (;;) {
      c.fillRect(x0, y0, thick || 1, 1);
      if (x0 === x1 && y0 === y1) break;
      e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  /* The house's 1px outline, laid UNDER everything painted on a sprite
     canvas so far. ringOf smears the shape a pixel each way and keeps
     what the smear added, so notches - a mug's handle, a fork's tines -
     keep their insides. */
  function ringUnder(t) {
    var ring = ringOf(t, t.w, t.h);
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
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

  /* a pigment between two others, for the per-row ramps baked into the
     ceiling and the walnut: flat colour row by row, never a dither */
  function mix(a, b, k) {
    var na = parseInt(a.slice(1), 16), nb = parseInt(b.slice(1), 16);
    var r = Math.round((na >> 16 & 255) + ((nb >> 16 & 255) - (na >> 16 & 255)) * k);
    var g = Math.round((na >> 8 & 255) + ((nb >> 8 & 255) - (na >> 8 & 255)) * k);
    var bl = Math.round((na & 255) + ((nb & 255) - (na & 255)) * k);
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  }

  /* REGISTER ON REF 4. Each layer is laid out in the photograph's own
     coordinates and then rolled sideways, so that at scroll 0 - the
     menu, the porch's row, the first frame of a run - every layer stands
     where ref 4 has it, framed 60px in from each side (the photograph is
     360 game pixels wide at this lens and the screen 480). */
  function roll(t, dx) {
    var o = makeCanvas(t.w, t.h);
    o.ctx.drawImage(t.canvas, dx, 0);
    o.ctx.drawImage(t.canvas, dx - t.w, 0);
    return o;
  }

  /* lay a tint over the PAINTED pixels of a layer only - the step back on
     a layer that is transparent where the layers behind it show */
  function tintAtop(t, col, strength) {
    t.ctx.globalCompositeOperation = 'source-atop';
    Tint.rect(t.ctx, 0, 0, t.w, t.h, col, strength);
    t.ctx.globalCompositeOperation = 'source-over';
  }

  /* ===================================================== THE FAR WALL

     L0: the ceiling and the kitchen's back wall, 720x140 at 0.15, drawn
     at y 0. Ref 4 is 360 game pixels wide at this lens, so the tile is
     the photograph twice over - its first half the photograph itself,
     the second half the rest of the room (ref 1's photo wall, the plain
     uppers, the second window) - and the fridge and the hood, on L1,
     come round only every 4800px of world, 27..43 seconds. */

  /* a white shaker door at the far wall's scale: a 2px frame, the panel
     recessed, its shade along the top and left, a hairline to the next */
  function farDoor(c, x, y, w, h, glass) {
    rect(c, x, y, w, h, H.cabinetLit);
    rect(c, x + 2, y + 2, w - 4, h - 4, glass ? P.glassDark : H.cabinet);
    rect(c, x + 2, y + 2, w - 4, 1, glass ? P.glassDeep : H.cabinetShade);
    rect(c, x + 2, y + 2, 1, h - 4, glass ? P.glassDeep : H.cabinetShade);
    rect(c, x + w - 1, y, 1, h, P.cabinetLine);
    rect(c, x, y + h - 1, w, 1, P.cabinetLine);
  }

  /* a glass-front upper: the good dishes on two glass shelves, a cup
     hung inside, one vertical glare (never diagonal: a diagonal stripe on
     a pane reads as a crack) and the bar pull - Table ref 4 and ref 1 */
  function farGlass(c, x, y, w, h, seed, pullRight) {
    farDoor(c, x, y, w, h, true);
    var r = mulberry32(seed), i, s;
    var shelves = [y + Math.round(h * 0.38), y + Math.round(h * 0.70), y + h - 3];
    for (i = 0; i < shelves.length; i++) {
      s = shelves[i];
      if (i < 2) rect(c, x + 2, s, w - 4, 1, P.glassShelf);
      var at = x + 3 + Math.floor(r() * 2);
      while (at < x + w - 6) {
        var k = Math.floor(r() * 3);
        if (k === 0) { rect(c, at, s - 2, 5, 1, P.porcelain); rect(c, at, s - 1, 5, 1, P.rimShade); at += 7; }
        else if (k === 1) { rect(c, at, s - 3, 4, 1, P.porcelain); rect(c, at, s - 2, 4, 2, P.porcelainShade); at += 6; }
        else { rect(c, at, s - 3, 1, 3, H.steelLit); rect(c, at + 2, s - 3, 1, 3, H.steelLit); at += 5; }
      }
    }
    rect(c, x + 4, y + 4, 1, h - 8, P.glassGlare);
    rect(c, pullRight ? x + w - 4 : x + 2, y + h - 14, 1, 7, H.steelLit);
  }

  /* ONE PLANTATION SHUTTER PANEL at the far wall's scale (ref 4: the big
     window is four of them): stiles and rails 2px, louvres on a 3px
     pitch - the lit nose, the face, and the slit of afternoon between -
     and the tilt rod down the middle, which is what makes it a shutter
     and not a blind. */
  function farShutter(c, x, y, w, h) {
    rect(c, x, y, w, h, H.cabinetLit);
    var ly;
    for (ly = y + 3; ly + 3 <= y + h - 3; ly += 3) {
      rect(c, x + 2, ly, w - 4, 1, H.cabinetLit);
      rect(c, x + 2, ly + 1, w - 4, 1, H.cabinet);
      rect(c, x + 2, ly + 2, w - 4, 1, P.slit);
    }
    var mid = y + Math.round(h * 0.52);
    rect(c, x + 1, mid, w - 2, 2, H.cabinetLit);
    rect(c, x + 1, mid + 2, w - 2, 1, H.cabinetShade);
    var rx = x + Math.floor(w / 2);
    rect(c, rx, y + 3, 1, h - 6, H.cabinetShade);
    rect(c, x, y, 1, h, H.cabinetShade);
    rect(c, x + w - 1, y, 1, h, H.cabinetShade);
  }
  function farWindow(c, x, y, panels, pw, h) {
    var w = panels * pw;
    rect(c, x - 3, y - 3, w + 6, h + 3, H.cabinetLit);
    rect(c, x - 3, y - 3, w + 6, 1, H.cabinetShade);
    for (var i = 0; i < panels; i++) farShutter(c, x + i * pw, y, pw, h);
  }

  /* the grey glass mosaic in running bond, Table ref 2 and 4 */
  function farSplash(c, x0, x1, y0, y1) {
    rect(c, x0, y0, x1 - x0, y1 - y0, H.tileShade);
    for (var y = y0; y < y1; y += 2) {
      var off = ((y - y0) / 2) % 2 ? 2 : 0;
      for (var x = x0 - 4 + off; x < x1; x += 4) {
        var h = hash(x * 13 + y * 7919 + 11);
        var bx = Math.max(x0, x), bw = Math.min(x1, x + 3) - bx;
        if (bw > 0) rect(c, bx, y, bw, 1, (h % 3) === 0 ? P.tileA : ((h % 3) === 1 ? P.tileB : P.tileC));
      }
    }
  }

  /* a split leaf of the monstera, at the far wall's scale */
  function farLeaf(c, x, y, flip) {
    rowsFill(c, [[1, 4], [0, 6], [0, 6], [1, 4]], x, y, H.leaf);
    dot(c, x + (flip ? 1 : 4), y + 3, H.leafDeep);
    dot(c, x + 2, y + 3, H.leafDeep);
    dot(c, x + (flip ? 3 : 1), y + 1, H.leafLit);
  }

  /* a recessed can in the ceiling: the white disc, its grey trim, and a
     soft halo baked in round it - inside the tile it never moves, so a
     baked falloff is allowed. Nearer cans (lower rows are farther) are
     bigger: 7x2 at row 12, 5x2 at row 40, 3x1 by the wall. */
  function ceilingCan(c, x, y, size) {
    var hr = size * 3 + 4, i, j;
    for (j = -hr; j <= hr; j++) {
      for (i = -hr * 2; i <= hr * 2; i++) {
        var d = Math.sqrt((i / 2) * (i / 2) + j * j) / hr;
        if (d >= 1) continue;
        c.fillStyle = rgba(H.daylight, 0.60 * (1 - ease(d)));
        c.fillRect(x + i, y + j, 1, 1);
      }
    }
    /* the disc seen at a glancing angle: wide, shallow, its trim ring
       darker on the far side */
    var w = size * 4, hh = size > 2 ? 3 : (size > 1 ? 2 : 1);
    rowsFill(c, hh > 2 ? [[1, w + 2], [0, w + 4], [1, w + 2]] : [[0, w + 4], [0, w + 4]], x - Math.floor(w / 2) - 2, y - 1, P.canTrim);
    rect(c, x - Math.floor(w / 2), y, w, Math.max(1, hh - 1), H.lampCore);
    if (hh > 2) rect(c, x - Math.floor(w / 2) + 1, y + 1, w - 2, 1, H.daylight);
  }

  function bakeWall() {
    var t = makeCanvas(WALL_W, WALL_H), c = t.ctx, x, y, i;

    /* 1. THE CEILING PLANE, rows 0..61: the plaster 3.3 m off at the top
       of the frame, a step darker, easing to the plaster by the wall that
       the windows' bounce lights - ref 4 is darker at the top (129) than
       by the wall (144) */
    for (y = 0; y < CROWN_Y; y++) rect(c, 0, y, WALL_W, 1, mix(P.ceilingTop, P.ceilingFar, ease(y / (CROWN_Y - 1))));
    /* faint tooth, so a big plane is plaster and not a gradient */
    var r = mulberry32(4201);
    for (i = 0; i < 260; i++) {
      x = Math.floor(r() * WALL_W); y = Math.floor(r() * (CROWN_Y - 1));
      dot(c, x, y, rgba(r() < 0.5 ? P.ceilingTop : H.daylight, 0.35));
    }

    /* 2. THE BACK WALL from the crown down; under the island's counter
       line (137) nothing of it is ever seen */
    rect(c, 0, CROWN_Y, WALL_W, WALL_H - CROWN_Y, P.wallDay);

    /* the hall, right of the doorway in ref 4: the ceiling runs on past
       the kitchen's wall, so its crown is lower (farther) - row 74 */
    for (y = CROWN_Y; y < 74; y++) rect(c, 291, y, 69, 1, mix(P.ceilingFar, P.ceilingTop, (y - CROWN_Y) / 24));
    rect(c, 291, 74, 69, 1, H.cabinetLit); rect(c, 291, 75, 69, 1, H.cabinet);
    rect(c, 291, 76, 69, 1, H.cabinetShade);
    rect(c, 291, 77, 69, WALL_H - 77, P.hallWall);

    /* the crown over the kitchen's walls */
    rect(c, 0, CROWN_Y, 291, 1, H.cabinetLit); rect(c, 360, CROWN_Y, 360, 1, H.cabinetLit);
    rect(c, 0, CROWN_Y + 1, 291, 1, H.cabinet); rect(c, 360, CROWN_Y + 1, 360, 1, H.cabinet);
    rect(c, 0, CROWN_Y + 2, 291, 1, H.cabinetShade); rect(c, 360, CROWN_Y + 2, 360, 1, H.cabinetShade);
    rect(c, 290, CROWN_Y, 1, WALL_H - CROWN_Y, P.wallShade2);       /* the corner into the hall */

    /* 3. THE SPLASH under every upper and beside the windows; the
       windows and the uppers are laid over it */
    farSplash(c, 38, 290, UPPER_B, NOSE_Y + 3);
    farSplash(c, 440, 680, UPPER_B, NOSE_Y + 3);

    /* ---- the first half: ref 4 itself ---- */
    /* the pantry, two tall doors (they continue the second half's pair) */
    farDoor(c, 0, UPPER_Y, 19, 40); farDoor(c, 19, UPPER_Y, 19, 40);
    farDoor(c, 0, UPPER_Y + 40, 19, WALL_H - UPPER_Y - 40); farDoor(c, 19, UPPER_Y + 40, 19, WALL_H - UPPER_Y - 40);
    rect(c, 16, UPPER_Y + 32, 1, 6, H.steelLit); rect(c, 21, UPPER_Y + 32, 1, 6, H.steelLit);
    rect(c, 16, UPPER_Y + 43, 1, 6, H.steelLit); rect(c, 21, UPPER_Y + 43, 1, 6, H.steelLit);
    /* WINDOW B, the small one in the corner, the monstera's leaves over
       its sill (ref 4 left, ref 2) */
    farWindow(c, 57, 84, 2, 21, 54);
    var leaves = [[56, 102, 0], [64, 106, 1], [72, 101, 0], [78, 111, 1], [60, 116, 0], [70, 119, 1], [84, 122, 0], [52, 125, 1]];
    for (i = 0; i < leaves.length; i++) {
      line(c, 68, 136, leaves[i][0] + 3, leaves[i][1] + 3, H.leafDeep);
    }
    for (i = 0; i < leaves.length; i++) farLeaf(c, leaves[i][0], leaves[i][1], !!leaves[i][2]);
    /* the open corner shelves beside the glass uppers */
    for (i = 0; i < 3; i++) { rect(c, 99, 74 + i * 14, 5, 1, H.cabinetLit); rect(c, 99, 75 + i * 14, 5, 1, H.cabinetShade); }
    /* THE THREE GLASS-FRONT UPPERS over the island's run */
    farGlass(c, 105, UPPER_Y, 22, UPPER_B - UPPER_Y, 4301, true);
    farGlass(c, 127, UPPER_Y, 22, UPPER_B - UPPER_Y, 4302, false);
    farGlass(c, 149, UPPER_Y, 22, UPPER_B - UPPER_Y, 4303, true);
    /* on the back counter under them, just their tops over the island:
       the espresso machine, the kettle, a canister */
    rect(c, 108, 126, 14, 12, H.steelLit); rect(c, 119, 126, 3, 12, H.steelShade);
    rect(c, 112, 130, 6, 3, H.iron); rect(c, 108, 126, 14, 1, H.cabinetLit);
    rect(c, 132, 128, 9, 10, H.iron); rect(c, 133, 128, 7, 1, H.ironLit); rect(c, 135, 126, 3, 2, H.iron);
    rect(c, 150, 129, 5, 9, H.cabinetLit); rect(c, 150, 129, 5, 1, H.steelLit);
    /* WINDOW A, the big shutters: four panels (ref 4) */
    farWindow(c, 183, 85, 4, 22, 52);
    /* THE SINK'S TAP, on the back counter under the window where ref 4
       and Ceiling ref 6 have it - at the back wall's depth, so it is
       small: a gooseneck 2.5 cm thick and 35 cm tall at 5.6 m is a
       1px stem whose top lands on row 130, and everything under row 137
       (the sink, the counter, the tap's foot) is behind the island's
       quartz. Steel against the white louvres, a step darker than them. */
    rect(c, 238, 131, 1, 7, H.steelShade);
    rect(c, 238, 130, 4, 1, H.steelShade);
    dot(c, 239, 130, H.steelLit);
    rect(c, 241, 131, 1, 2, H.steelShade);
    /* the wall past it: the splash, and the dark wine bottle and the
       little shelf on it (ref 4 right of the window) */
    rect(c, 279, 112, 3, 26, H.iron); rect(c, 280, 109, 1, 3, H.iron); dot(c, 279, 113, H.ironLit);
    rect(c, 274, 110, 10, 1, H.walnutLit);
    /* THE DOORWAY into the hall: its casing, the dark hall, the white
       door at the end of it, and the coats on their rail */
    rect(c, 299, 90, 46, WALL_H - 90, H.cabinetLit);
    rect(c, 301, 92, 42, WALL_H - 92, P.hallDark);
    rect(c, 309, 98, 22, WALL_H - 98, P.hallDoor);
    rect(c, 309, 98, 22, 1, H.cabinetShade);
    rect(c, 312, 102, 7, 14, P.hallDoorPanel); rect(c, 321, 102, 7, 14, P.hallDoorPanel);
    rect(c, 312, 120, 7, 17, P.hallDoorPanel); rect(c, 321, 120, 7, 17, P.hallDoorPanel);
    rect(c, 309, 98, 1, WALL_H - 98, P.hallDark);
    /* the coat rail on the hall's wall, and the coats */
    rect(c, 346, 104, 30, 9, H.cabinetLit);
    rect(c, 348, 110, 26, 1, H.iron);
    var coats = [[348, 9, 'coat'], [356, 8, 'coatGrey'], [364, 10, 'coat'], [372, 7, 'coat']];
    for (i = 0; i < coats.length; i++) {
      var cx = coats[i][0], cw = coats[i][1], cc = P[coats[i][2]];
      rowsFill(c, [[2, cw - 4], [1, cw - 2], [0, cw]], cx, 111, cc);
      rect(c, cx, 114, cw, WALL_H - 114, cc);
      rect(c, cx + 2, 115, 1, WALL_H - 116, coats[i][2] === 'coat' ? P.coatLit : P.coatGreyLit);
    }

    /* ---- the second half: the rest of the room ---- */
    /* the photo wall, ref 1's - a dense block, a hairline of wall between */
    var cols = [P.photoA, P.photoB, P.photoC, P.photoD];
    for (y = 0; y < 9; y++) {
      for (x = 0; x < 13; x++) {
        var hh = hash(x * 131 + y * 7919 + 977);
        var dx = (x - 6) / 6.5, dy = (y - 4) / 4.6;
        if (dx * dx + dy * dy > 1.05 + ((hh >>> 3) % 5) * 0.05 || (hh & 15) === 0) continue;
        rect(c, 388 + x * 4, 80 + y * 4, 3, 3, cols[(hh >>> 5) & 3]);
        dot(c, 388 + x * 4, 80 + y * 4, H.cabinetLit);
      }
    }
    rect(c, 405, 92, 6, 4, H.cabinetLit); rect(c, 395, 100, 3, 3, P.note); rect(c, 424, 86, 3, 3, P.note);
    /* four plain uppers, and the back counter's things under them */
    for (i = 0; i < 4; i++) {
      farDoor(c, 455 + i * 22, UPPER_Y, 22, UPPER_B - UPPER_Y, false);
      rect(c, i % 2 ? 457 + i * 22 : 473 + i * 22, UPPER_B - 14, 1, 7, H.steelLit);
    }
    rect(c, 462, 129, 12, 9, H.steelLit); rect(c, 462, 129, 12, 1, H.cabinetLit);
    rect(c, 471, 129, 3, 9, H.steelShade); rect(c, 465, 131, 6, 1, H.iron);
    rect(c, 500, 131, 14, 7, H.walnutLit); rect(c, 501, 130, 12, 1, H.walnutHi);
    rect(c, 503, 128, 3, 3, P.lemon); rect(c, 507, 127, 3, 3, P.orange);
    /* the second small shutter */
    farWindow(c, 552, 84, 2, 21, 54);
    /* the wall to the pantry, a framed print on it */
    rect(c, 618, 86, 18, 22, H.walnutDeep); rect(c, 620, 88, 14, 18, P.photoD);
    rect(c, 622, 96, 10, 8, P.photoC);
    /* the pantry's other pair, meeting the first half's across the seam */
    farDoor(c, 682, UPPER_Y, 19, 40); farDoor(c, 701, UPPER_Y, 19, 40);
    farDoor(c, 682, UPPER_Y + 40, 19, WALL_H - UPPER_Y - 40); farDoor(c, 701, UPPER_Y + 40, 19, WALL_H - UPPER_Y - 40);
    rect(c, 698, UPPER_Y + 32, 1, 6, H.steelLit); rect(c, 703, UPPER_Y + 32, 1, 6, H.steelLit);
    rect(c, 698, UPPER_Y + 43, 1, 6, H.steelLit); rect(c, 703, UPPER_Y + 43, 1, 6, H.steelLit);

    /* 4. THE CANS AND THE REGISTER, over everything else up there: six
       cans per 720 at the rows their distance puts them on (ref 4: two
       near ones high in the frame, the rest stepping back to the wall) */
    var cans = [[114, 12, 4], [247, 13, 4], [40, 42, 2], [160, 50, 2], [233, 58, 1],
                [470, 12, 4], [598, 44, 2], [664, 57, 1], [380, 30, 3]];
    for (i = 0; i < cans.length; i++) ceilingCan(c, cans[i][0], cans[i][1], cans[i][2]);
    /* the register, ref 4 right of the hood: a grille with its slots */
    rect(c, 296, 47, 20, 6, P.canTrim);
    rect(c, 297, 48, 18, 4, H.vent);
    for (i = 0; i < 8; i++) rect(c, 298 + i * 2, 48, 1, 4, H.ventSlot);

    /* THE STEP BACK, as before and for the same reason: everything the
       player has to act on in here is white, so the room behind the lane
       comes down six sixteenths toward P.distance - its own shade, in
       shade - and stays a warm cream-grey rather than a dirty one. */
    Tint.rect(c, 0, 0, WALL_W, WALL_H, P.distanceCool, 6);
    return roll(t, 60);
  }

  /* ===================================================== THE FIXTURES

     L1: the fridge and the range hood, 720x140 at 0.22, transparent
     except the two of them. They are nearer than the wall (2.9 and 3.5 m
     against 5.6) and slide across it, which is what tells the eye the
     kitchen has depth. The hood's chimney goes up through the lid's rows
     to the top of the screen, and that is wanted: it says the ceiling
     plane goes on past the kill line. */

  /* THE FRIDGE, ref 4 left (the photographs on it: ref 2 and the close
     crop): steel, French doors, the long handles either side of the seam,
     82px wide - 90 cm at 2.87 m - its top at row 60 and its freezer
     drawer hidden under the island's counter line */
  function bakeFridgeAt(c, X) {
    var Y = 60, W = 82, Hh = WALL_H - 60, i, gx, gy;
    /* in shadow on its side wall, ref 4 has it the darkest big thing in
       the kitchen - the brushed steel a step under the house's */
    rect(c, X, Y, W, Hh, P.fridgeSteel);
    var r = mulberry32(4401);
    for (i = 0; i < 46; i++) {
      var sx = X + 2 + Math.floor(r() * (W - 4)), sy = Y + 2 + Math.floor(r() * (Hh - 8));
      rect(c, sx, sy, 1, 3 + Math.floor(r() * 9), r() < 0.5 ? H.steelLit : H.steelShade);
    }
    rect(c, X, Y, W, 1, H.steelLit); rect(c, X, Y, 2, Hh, H.steelLit);
    rect(c, X + W - 2, Y, 2, Hh, H.steelShade);
    rect(c, X + 41, Y, 1, Hh, H.steelDeep);
    /* the handles, rows 96..133 */
    rect(c, X + 36, 96, 2, 38, H.steelLit); rect(c, X + 38, 96, 1, 38, H.steelDeep);
    rect(c, X + 44, 96, 2, 38, H.steelLit); rect(c, X + 46, 96, 1, 38, H.steelDeep);
    rect(c, X + 36, 95, 3, 1, H.steelDeep); rect(c, X + 44, 95, 3, 1, H.steelDeep);
    /* THE COLLAGE down the left door, the note, the pink-and-purple paper */
    var cols = [P.photoA, P.photoB, P.photoC, P.photoD];
    var n = 0;
    for (gy = 0; gy < 9; gy++) {
      for (gx = 0; gx < 5; gx++) {
        var h = hash(gx * 37 + gy * 911 + 7);
        if ((h & 7) === 0 || (gy > 6 && gx > 2)) continue;
        var px = X + 4 + gx * 6 + ((h >>> 4) % 3) - 1, py = Y + 8 + gy * 6 + ((h >>> 7) % 3) - 1;
        var pw = (h >>> 10) & 1 ? 5 : 4, ph = (h >>> 11) & 1 ? 5 : 4;
        rect(c, px, py, pw, ph, cols[n % 4]);
        rect(c, px, py, pw, 1, H.cabinetLit);
        if ((h >>> 13) % 3) dot(c, px + 1 + ((h >>> 15) & 1), py + 2, P.photoDark);
        n++;
      }
    }
    rect(c, X + 30, Y + 30, 4, 5, P.note); rect(c, X + 30, Y + 30, 4, 1, H.daylight);
    rect(c, X + 12, Y + 64, 8, 9, P.pinkPaper); rect(c, X + 12, Y + 64, 8, 1, H.cabinetLit);
    rect(c, X + 13, Y + 66, 2, 1, P.purple); dot(c, X + 13, Y + 67, P.purple);
    rect(c, X + 16, Y + 69, 2, 1, P.purple); dot(c, X + 17, Y + 70, P.purple);
    /* the right door: the sheet of paper, the round magnet, the dots */
    rect(c, X + 52, Y + 10, 9, 11, H.cabinetLit); dot(c, X + 56, Y + 14, H.steelShade);
    rect(c, X + 66, Y + 28, 4, 4, H.iron); dot(c, X + 66, Y + 28, H.ironLit);
    rect(c, X + 58, Y + 44, 4, 3, P.note);
    dot(c, X + 52, Y + 58, P.enamelRed); dot(c, X + 60, Y + 60, P.canBlue); dot(c, X + 68, Y + 57, P.photoC);
  }

  /* THE HOOD, ref 4 centre: the brushed-steel chimney from the ceiling
     with its grille at the top, the curved glass canopy seen nearly
     edge-on - a lens of pale glass with its rims catching the light -
     and the steel body under it with the lamp. 22 and 72px wide: the
     plan's 19 and 68 (25 and 90 cm at 3.46 m) measured narrower than the
     photograph, which has them 25 and 77 at this lens. */
  function bakeHoodAt(c, cx) {
    var i;
    rect(c, cx - 11, 7, 22, 72, H.steel);
    rect(c, cx - 11, 7, 2, 72, H.steelLit);
    rect(c, cx + 9, 7, 2, 72, H.steelShade);
    rect(c, cx - 11, 7, 22, 1, H.steelDeep);
    for (i = 0; i < 4; i++) rect(c, cx - 6, 10 + i * 2, 12, 1, H.steelDeep);
    rect(c, cx - 11, 34, 22, 1, H.steelShade);
    /* the steel body under the glass, and its lamp */
    rect(c, cx - 15, 80, 30, 10, H.steel);
    rect(c, cx - 15, 80, 30, 1, H.steelLit);
    rect(c, cx - 15, 88, 30, 2, H.steelShade);
    rect(c, cx - 2, 89, 4, 1, H.lampCore);
    /* THE CANOPY: for every column, the glass between an arched top and
       an arched bottom, translucent, its two rims lit */
    for (i = -36; i <= 36; i++) {
      var u = i / 36, top = Math.round(77 + 5 * u * u), bot = Math.round(84 + 4 * u * u);
      rect(c, cx + i, top + 1, 1, Math.max(0, bot - top - 1), P.hoodGlassClear);
      dot(c, cx + i, top, P.hoodGlass);
      dot(c, cx + i, bot, P.hoodGlassEdge);
    }
    rect(c, cx - 26, 79, 8, 1, H.cabinetLit);
    dot(c, cx + 30, 82, H.cabinetLit); dot(c, cx + 31, 83, H.cabinetLit);
  }

  function bakeFixtures() {
    var t = makeCanvas(WALL_W, WALL_H);
    /* ref 4's fridge is cut by the photograph's left edge and its hood is
       over the island's middle: 60px in, those are tile x 6 and 237 */
    bakeFridgeAt(t.ctx, 6);
    bakeHoodAt(t.ctx, 237);
    tintAtop(t, P.distanceCool, 6);
    return t;
  }

  /* ====================================================== THE ISLAND

     L2: the island, 720x97 at 0.32, drawn at y 68 (rows 68..164). Seen
     from five centimetres over the table its counter is ELEVEN cm above
     the lens, two metres off: a white quartz nose at 137..139 - the one
     continuous horizontal line in the lane - the shaker base under it in
     the room's shade down to the walnut's far edge, and on top the
     clutter, which ref 4 has plenty of. Transparent above the clutter.
     An island with no end: the far side of this table faces its run. */
  function bakeIsland() {
    var t = makeCanvas(ISL_W, ISL_H), c = t.ctx, i, x;
    var base = NOSE_Y - ISL_Y;                /* local row of the nose, 69 */
    /* the base, dining side: shaker doors 57px (45 cm at 2.05 m) in the
       island's own shadow, no hardware - ref 4 reads them grey */
    rect(c, 0, base + 3, ISL_W, ISL_H - base - 3, P.islandFrame);
    for (x = 0; x < ISL_W; x += 57) {
      rect(c, x + 3, base + 6, 51, ISL_H - base - 6, P.islandFace);
      rect(c, x + 3, base + 6, 51, 1, P.islandDeep);
      rect(c, x + 3, base + 6, 1, ISL_H - base - 6, P.islandDeep);
      rect(c, x + 56, base + 3, 1, ISL_H - base - 3, P.islandDeep);
    }
    /* the shade the counter's overhang throws on its own face */
    for (i = 0; i < 5; i++) {
      c.fillStyle = rgba(P.shadeCool, 0.30 * (1 - i / 5));
      c.fillRect(0, base + 3 + i, ISL_W, 1);
    }
    /* THE QUARTZ NOSE */
    rect(c, 0, base, ISL_W, 1, P.quartz);
    rect(c, 0, base + 1, ISL_W, 1, P.quartzVein);
    rect(c, 0, base + 2, ISL_W, 1, H.cabinetShade);
    for (i = 0; i < 14; i++) {
      var hv = hash(i * 211 + 31);
      rect(c, hv % ISL_W, base + (hv >>> 9) % 2, 3 + (hv >>> 11) % 8, 1, P.quartzVein);
    }

    /* THE CLUTTER, standing on the counter (local row 68 is its last row
       of air): ref 4's, seven things per 720 and never two tall ones
       within 60px of each other. NOT the sink's tap: that is on the BACK
       counter under the big window (ref 4, Ceiling ref 6), and drawn here
       it rose out of the island - see bakeWall. */
    var s = base - 1;
    var g = makeCanvas(ISL_W, ISL_H), q = g.ctx;
    /* the big water jug */
    rect(q, 30, s - 37, 13, 38, P.jugClear);
    rect(q, 30, s - 37, 1, 38, H.daylight); rect(q, 42, s - 37, 1, 38, H.steelShade);
    rect(q, 33, s - 41, 7, 4, P.jugClear); rect(q, 34, s - 43, 5, 2, P.canBlue);
    rect(q, 30, s - 22, 13, 5, H.cabinetLit); rect(q, 30, s - 21, 13, 2, P.canBlue);
    /* a steel pepper mill */
    rect(q, 92, s - 19, 5, 20, H.steelLit); rect(q, 95, s - 19, 2, 20, H.steelShade);
    rect(q, 93, s - 21, 3, 2, H.steel);
    /* THE ZZ PLANT on its wooden stand in the black pot (ref 4's middle):
       the stand's legs and rail, the pot, the stems fanning up, the waxy
       leaves along them */
    var zx = 178;
    rect(q, zx - 11, s - 14, 2, 15, H.walnutHi); rect(q, zx + 9, s - 14, 2, 15, H.walnutHi);
    rect(q, zx - 11, s - 8, 22, 2, H.walnutHi); rect(q, zx - 11, s - 15, 22, 2, H.walnutLit);
    rect(q, zx - 8, s - 37, 16, 23, H.iron); rect(q, zx - 8, s - 37, 16, 1, H.ironLit);
    rect(q, zx - 7, s - 36, 1, 21, H.ironLit);
    var stems = [[-26, -64], [-16, -66], [-6, -68], [4, -67], [14, -64], [24, -60], [-22, -50], [20, -48]];
    for (i = 0; i < stems.length; i++) {
      var tx = zx + stems[i][0], ty = s + stems[i][1];
      line(q, zx - 3 + Math.round(i * 6 / stems.length), s - 37, tx, ty, H.leafDeep);
      for (var k = 1; k < 8; k++) {
        var f = k / 8;
        var lx = Math.round(zx - 3 + (tx - zx + 3) * f), ly = Math.round(s - 37 + (ty - s + 37) * f);
        var side = (k + i) % 2 ? 1 : -4;
        rowsFill(q, [[1, 2], [0, 4], [1, 2]], lx + side, ly - 1, H.leaf);
        dot(q, lx + side + 1, ly - 1, H.leafLit);
      }
    }
    /* the lemon at its foot */
    rowsFill(q, [[2, 5], [0, 9], [0, 9], [0, 9], [1, 7], [2, 5]], 206, s - 5, P.lemon);
    rect(q, 208, s - 5, 3, 1, H.daylight);
    /* the red Dutch oven */
    rect(q, 250, s - 17, 38, 18, P.enamelRed);
    rect(q, 249, s - 15, 40, 2, P.enamelHi); rect(q, 250, s - 17, 38, 1, P.enamelHi);
    rect(q, 250, s - 13, 2, 13, P.enamelHi); rect(q, 282, s - 13, 6, 14, P.enamelDeep);
    rect(q, 265, s - 20, 8, 3, H.iron); rect(q, 244, s - 11, 6, 3, P.enamelRed); rect(q, 288, s - 11, 6, 3, P.enamelDeep);
    /* the wicker basket */
    rect(q, 380, s - 25, 51, 26, H.walnutHi);
    for (i = 0; i < 26; i += 3) rect(q, 380, s - 25 + i, 51, 1, H.walnutLit);
    for (x = 382; x < 431; x += 4) rect(q, x, s - 25, 1, 26, H.walnut);
    rect(q, 380, s - 26, 51, 1, H.walnutLit);
    /* two white tubs with blue lids */
    rect(q, 470, s - 11, 9, 12, H.cabinetLit); rect(q, 470, s - 12, 9, 2, P.canBlue);
    rect(q, 481, s - 9, 8, 10, H.cabinetLit); rect(q, 481, s - 10, 8, 2, P.canBlue);
    rect(q, 471, s - 6, 7, 2, P.canBlue);
    /* a dark bottle */
    rect(q, 530, s - 22, 5, 23, H.iron); rect(q, 531, s - 28, 3, 6, H.iron); dot(q, 531, s - 20, H.ironLit);
    ringUnderSoft(g);
    c.drawImage(g.canvas, 0, 0);

    /* the island steps back by half the wall's amount: it is nearer */
    tintAtop(t, P.distance, 3);
    return roll(t, 60);
  }

  /* ================================================== THE CHAIR BACKS

     L3: the far-side chairs, pushed in, 720x36 at 0.46, drawn at y 129.
     Their seats are under the table's far edge; what shows over it is the
     back - ref 4's white X-back (the Ingolf of ref 1): a deep top rail
     with rounded ends (82..90 cm, 1.18 m off: rows 129..147), the two
     stiles below it, and the X's upper arms running in toward the middle,
     where they cross under the edge. 93px wide, three per 720.

     THEY ARE A WARM GREY, NOT WHITE: a white chair in the room's shade,
     seen against a lit kitchen, is a full stop darker than the uppers in
     ref 4 - and the whites belong to the dishes. chairShade is the body;
     chairPaint only on the rail's top arris and the left stile's lit edge;
     the rail's underside paintDeep; a soft outline. */
  function chairBack(c, x) {
    var W = 93, i, u, SW = 5;
    /* THE TOP RAIL IS CURVED IN PLAN - it wraps toward whoever sits in
       the chair, so from behind its ends run away from the lens, and from
       a lens a hand under the rail anything farther away sits nearer the
       horizon: the rail's ends droop two rows below its middle. That
       droop is the whole difference between a chair back and the end of
       a bench at this size. 18 rows deep, its ends rounded, one flat face
       (a board seen from behind, not a seat), lit by a single row along
       its top where the window behind catches it, darkening into its
       underside. */
    var ROUND = [4, 2, 1, 1];
    for (u = 0; u < W; u++) {
      var k = Math.abs((u + 0.5 - W / 2) / (W / 2));
      var droop = k > 0.8 ? 2 : (k > 0.55 ? 1 : 0);
      var ins = u < ROUND.length ? ROUND[u] : (u >= W - ROUND.length ? ROUND[W - 1 - u] : 0);
      var top = droop + ins, bot = droop + 17 - ins;
      rect(c, x + u, top, 1, bot - top + 1, P.chairShade);
      dot(c, x + u, top, P.chairHi);
      dot(c, x + u, bot, P.chairDim);
    }
    rect(c, x + 1, 6, 1, 11, P.chairPaint);
    /* the stiles, lit on the left, from under the rail's drooped ends */
    rect(c, x + 2, 19, SW, CHR_H - 19, P.chairShade);
    rect(c, x + W - 2 - SW, 19, SW, CHR_H - 19, P.chairShade);
    rect(c, x + 2, 19, 1, CHR_H - 19, P.chairPaint);
    rect(c, x + W - 2 - SW, 19, 1, CHR_H - 19, P.chairPaint);
    /* THE X's upper arms, 3px, from under the rail's ends toward the
       middle; they cross below the walnut's edge */
    for (i = 0; i < CHR_H - 19; i++) {
      var ax = Math.round(7 + i * 0.95);
      rect(c, x + ax, 19 + i, 3, 1, P.chairShade);
      rect(c, x + W - ax - 3, 19 + i, 3, 1, P.chairShade);
      dot(c, x + ax, 19 + i, P.chairPaint);
      dot(c, x + W - ax - 3, 19 + i, P.chairPaint);
    }
  }

  function bakeChairs() {
    var t = makeCanvas(CHR_W, CHR_H);
    /* ref 4's two, 60px in: x 115 and 365 at scroll 0 */
    chairBack(t.ctx, 115); chairBack(t.ctx, 365); chairBack(t.ctx, 600);
    /* the full house ring, not the far layers' soft one: at 1.2 m the
       chairs are the nearest thing behind the lane, and the ring is what
       stops a pale rail running into the island's quartz behind it */
    return ringUnder(t);
  }

  /* ======================================================= THE WALNUT

     From the far edge (row 164, a metre off) to the bottom of the screen
     the walnut is ONE surface, and it is lit by the room, not by the lamp
     over it: ref 4 (and the t4_walnut crop) has the windows' reflection
     on the FAR walnut - the brightest wood is right under the chair backs
     - fading toward you, the near walnut darker and soft, the shutters
     reflected as soft vertical bands across the middle, and a hard
     horizontal streak where the cans catch the polish. One colour per
     row, computed once from row 164 to 269 and sliced into the strips and
     tiles, so no boundary between them can show. */
  /* the profile is ref 4's, row by row at this resolution: the edge in
     the chairs' shadow (97), up to the reflection's peak (135) a dozen
     rows below it, and down again to 104 at the kill row and 97 at the
     bottom of the frame */
  var WALNUT_KEYS = [
    [164, 'walnutEdge'],    /* the far edge: the arris and the chairs' shadow */
    [165, 'walnutMid'],
    [170, 'walnutHi2'],
    [177, 'walnutGlow'],    /* the window, reflected: the brightest wood     */
    [187, 'walnutGlow'],
    [199, 'walnutHi2'],
    [214, 'walnutLit2'],
    [241, 'walnutBody']
  ];
  function walnutColour(y) {
    if (y === FLOOR) return H.walnutDeep;            /* THE KILL ROW              */
    if (y === FLOOR + 1) return P.walnutSheen;       /* the cans' streak, hard    */
    if (y > FLOOR + 1 && y <= FLOOR + 4) return mix(P.walnutLit2, P.walnutBody, (y - FLOOR - 1) / 4);
    if (y > FLOOR) return P.walnutBody;
    for (var i = 0; i < WALNUT_KEYS.length - 1; i++) {
      var a = WALNUT_KEYS[i], b = WALNUT_KEYS[i + 1];
      if (y >= a[0] && y < b[0]) {
        var ca = P[a[1]] || H[a[1]], cb = P[b[1]] || H[b[1]];
        return i === 0 ? ca : mix(ca, cb, ease((y - a[0]) / (b[0] - a[0])));
      }
    }
    return P.walnutBody;
  }

  /* S1..S3, the far walnut, at 0.62, 0.78 and 0.92. The only marks in
     them are sparse 1px grain runs along the board, a shade off their
     row: never a vertical mark and never a crumb, because a crumb at
     three parallaxes is three crumbs. */
  function bakeStrip(y0, h, seed) {
    var t = makeCanvas(VW, h), c = t.ctx, y, i;
    for (y = 0; y < h; y++) rect(c, 0, y, VW, 1, walnutColour(y0 + y));
    var r = mulberry32(seed);
    for (i = 0; i < 26; i++) {
      y = Math.floor(r() * h);
      if (y0 + y === EDGE_Y) continue;
      var x = Math.floor(r() * VW), len = 3 + Math.floor(r() * 7);
      c.fillStyle = rgba(r() < 0.5 ? P.walnutSheen : P.walnutGrainDeep, 0.35);
      c.fillRect(x, y, len, 1);
    }
    return t;
  }

  /* S4 AND THE BAND, painted as ONE 384x89 canvas (rows 181..269) and
     cut in two at the kill row, so the grain, the seams and the
     reflections run through it without a join; both scroll at 1.0, so
     they stay registered. */
  function bakeNearWalnut() {
    var Hh = VH - NEAR_Y, t = makeCanvas(TAB_W, Hh), c = t.ctx, x, y, i, k;
    var r = mulberry32(3141);
    for (y = 0; y < Hh; y++) rect(c, 0, y, TAB_W, 1, walnutColour(NEAR_Y + y));

    /* THE SHUTTERS' REFLECTION: six soft vertical bands per 384, bright
       at the top of the near walnut and fading toward you - most gone by
       row 215, the two under the big window's middle running on down to
       the band (ref 4's long streaks), each soft across its width. A
       baked alpha ramp, never a dither, and kept off the kill row and
       its streak so the edge stays the edge. */
    var bands = [[20, 10, 212, 0.26], [70, 22, 236, 0.30], [150, 26, 269, 0.36],
                 [214, 9, 212, 0.24], [262, 18, 250, 0.32], [334, 12, 222, 0.24]];
    for (i = 0; i < bands.length; i++) {
      var end = bands[i][2] - NEAR_Y;
      for (x = 0; x < bands[i][1]; x++) {
        var across = 1 - Math.abs((x + 0.5) / bands[i][1] * 2 - 1);
        for (y = 0; y < end; y++) {
          if (NEAR_Y + y === FLOOR || NEAR_Y + y === FLOOR + 1) continue;
          var down = 1 - ease(y / end);
          c.fillStyle = rgba(P.walnutSheen, bands[i][3] * ease(across) * down);
          c.fillRect(bands[i][0] + x, y, 1, 1);
        }
      }
    }

    /* the big grain, paintOak's rule (one step allowed per run), thin in
       the reflection and full from row 200 down */
    for (i = 0; i < 100; i++) {
      var gy = Math.floor(r() * Hh), gx = Math.floor(r() * TAB_W);
      if (NEAR_Y + gy < 200 && r() < 0.6) continue;
      if (NEAR_Y + gy === FLOOR || NEAR_Y + gy === FLOOR + 1) continue;
      var len = 8 + Math.floor(r() * 33), step = Math.floor(r() * len);
      var dy = r() < 0.5 ? 0 : (r() < 0.5 ? -1 : 1);
      /* soft: this is a polished top seen low, and the grain shows as a
         figure under the finish, not as cuts in it */
      var col = r() < 0.5 ? rgba(P.walnutGrainLit, 0.45) : rgba(P.walnutGrainDeep, 0.32);
      for (k = 0; k < len; k++) {
        var py = gy + (k >= step ? dy : 0);
        if (py < 0 || py >= Hh || NEAR_Y + py === FLOOR || NEAR_Y + py === FLOOR + 1) continue;
        c.fillStyle = col;
        c.fillRect((gx + k) % TAB_W, py, 1, 1);
      }
    }

    /* THE LEAF SEAMS (ref 3, and ref 4's crossing lines), every 192:
       vertical, from the bottom of the screen up to row 200, then fading
       into the reflection. In truth a seam across the table runs to the
       vanishing point, and a line that converges cannot tile, so the
       pixel language keeps it straight and lets the light wash it out. */
    for (k = 96; k < TAB_W; k += 192) {
      for (y = 0; y < Hh; y++) {
        var row = NEAR_Y + y;
        if (row === FLOOR || row === FLOOR + 1) continue;
        var a = 0.4 * (row >= 222 ? 1 : clamp((row - 205) / 17, 0, 1));
        if (a <= 0) continue;
        c.fillStyle = rgba(P.walnutGrainDeep, 0.7 * a); c.fillRect(k, y, 1, 1);
        c.fillStyle = rgba(P.walnutSheen, 0.35 * a); c.fillRect(k + 1, y, 1, 1);
      }
    }

    /* crumbs (ref 4 has them all over the near half): 1-2px specks,
       about one per 40px, rows 200..269 */
    for (i = 0; i < 20; i++) {
      var cy = 200 - NEAR_Y + Math.floor(r() * (VH - 200));
      if (NEAR_Y + cy === FLOOR || NEAR_Y + cy === FLOOR + 1) cy += 3;
      var cx = Math.floor(r() * TAB_W), pick = r();
      dot(c, cx, cy, pick < 0.4 ? P.crust : (pick < 0.8 ? P.crumbDark : P.walnutSheen));
      if (r() < 0.35) dot(c, cx + 1, cy, P.crumbDark);
    }

    /* the near blur of ref 4: the last six rows a shade down */
    Tint.rect(c, 0, Hh - 6, TAB_W, 6, P.walnutGrainDeep, 2);

    /* split at the kill row */
    var cut = FLOOR - NEAR_Y;
    var near = makeCanvas(TAB_W, cut), band = makeCanvas(TAB_W, Hh - cut);
    near.ctx.drawImage(t.canvas, 0, 0);
    band.ctx.drawImage(t.canvas, 0, -cut);
    return { near: near, band: band };
  }

  /* ======================================================= THE LIGHT

     The room lights itself in this bay - the ceiling's ramp, the wall's
     step back, the walnut's reflection are all baked into their layers -
     so the sheet is only the two side columns, the lens's own falloff,
     56px each side at 0.12 of the cool shade. */
  function bakeLight() {
    var t = makeCanvas(VW, VH), c = t.ctx, x, k;
    for (x = 0; x < 56; x++) {
      k = 1 - ease(x / 56);
      c.fillStyle = rgba(P.shadeCool, 0.12 * k);
      c.fillRect(x, 0, 1, VH);
      c.fillRect(VW - 1 - x, 0, 1, VH);
    }
    return t;
  }

  /* the far layers' outline: the house ring at half strength, because a
     full-black ring round a carafe two steps back is a cartoon */
  function ringUnderSoft(t) {
    var ring = ringOf(t, t.w, t.h);
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.globalAlpha = 0.45;
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalAlpha = 1;
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ====================================================== THE DISHES

     A pillar is a 34px column of white dishes. Three 34x84 tiles, read
     BOTTOM TO TOP, each tiled to whatever height the gap leaves.

     WHY NOT LivingRoom.drawColumn. It cuts the short slice at the far end
     of the column, but the CUT EDGE lands at the junction with the last
     full tile - half a cushion mid-column, which a cushion forgives and a
     mug does not. These two cut at the CAP end, where nine rows of
     platter hide it. Both need the tile to WRAP - row 83 has to be a
     plausible neighbour of row 0 - and every list below starts at the
     bottom with a plate and ends at the top with one, so a plate always
     sits on a plate at the join. */
  function drawColumnUp(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + h - drawn - slice, w, slice);
      drawn += slice;
    }
  }
  function drawColumnDown(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, 0, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* THE ELEMENTS, painted into a 34-wide tile at `y` (their top row),
     each jogged `jx` pixels. Widths leave a pixel inside the tile either
     side even when jogged, so the ring always lands. Lit from the upper
     left like everything in the game: the left end of a rim catches the
     window and the right end turns away cool. */
  function elPlate(c, y, x0, w) {
    rect(c, x0 + 2, y, w - 4, 1, P.porcelainHi);
    rect(c, x0, y, 2, 1, P.porcelain); rect(c, x0 + w - 2, y, 2, 1, P.porcelain);
    rect(c, x0, y + 1, w, 1, P.porcelain);
    dot(c, x0, y + 1, P.porcelainHi);
    rect(c, x0 + w - 4, y + 1, 4, 1, P.porcelainShade);
    rect(c, x0, y + 2, w, 1, P.porcelainShade);
    rect(c, x0 + 1, y + 3, w - 2, 1, P.rimShade);
  }
  function elSaucer(c, y, x0, w) {
    rect(c, x0 + 2, y, w - 4, 1, P.porcelainHi);
    rect(c, x0, y, 2, 1, P.porcelain); rect(c, x0 + w - 2, y, 2, 1, P.porcelain);
    rect(c, x0, y + 1, w, 1, P.porcelain);
    rect(c, x0 + w - 3, y + 1, 3, 1, P.porcelainShade);
    rect(c, x0 + 1, y + 2, w - 2, 1, P.rimShade);
  }
  var BOWL_W = [30, 30, 28, 26, 24, 22, 20, 18, 16, 14];
  function elBowl(c, y, jx) {
    for (var i = 0; i < 10; i++) {
      var w = BOWL_W[i], x0 = 17 - w / 2 + jx;
      var col = i === 0 ? P.porcelainHi : (i === 1 ? P.glaze : (i === 8 ? P.rimShade : (i === 9 ? P.rimDeep : P.porcelain)));
      rect(c, x0, y + i, w, 1, col);
      if (i >= 2 && i <= 7) {
        dot(c, x0, y + i, P.porcelainHi);
        rect(c, x0 + w - 3, y + i, 3, 1, P.porcelainShade);
      }
    }
    /* the band painted round the bowl's belly - most of the house's
       bowls have one, and it is what tells a bowl from a mug at a glance */
    rect(c, 17 - 13 + jx, y + 4, 26, 1, P.glaze);
  }
  /* a mug on its saucer, 14 rows; the handle on the right with its hole
     left open for the ring to find */
  function elMug(c, y, jx) {
    var x0 = 6 + jx;
    rect(c, x0, y, 18, 1, P.porcelainHi);
    rect(c, x0, y + 1, 18, 1, P.glaze);
    rect(c, x0, y + 2, 18, 8, P.porcelain);
    rect(c, x0, y + 2, 1, 8, P.porcelainHi);
    rect(c, x0 + 15, y + 2, 3, 8, P.porcelainShade);
    rect(c, x0 + 1, y + 10, 16, 1, P.rimShade);
    rect(c, x0 + 18, y + 2, 3, 1, P.porcelain);
    rect(c, x0 + 21, y + 3, 2, 5, P.porcelain);
    rect(c, x0 + 22, y + 3, 1, 5, P.porcelainShade);
    rect(c, x0 + 18, y + 8, 3, 1, P.porcelainShade);
    elSaucer(c, y + 11, 4 + jx, 26);
  }

  /* the three towers, BOTTOM to TOP. P plate, S side plate, C saucer,
     B bowl, M mug on its saucer. V0 is mostly plates, V1 bowls and a
     mug, V2 a bit of everything; each sums to 84 rows. */
  var STACKS = [
    'PPPPPPPPPSSSSSCCBPPP',
    'PBBBMBBPPPP',
    'PPPPPBSSSMPPPBCC'
  ];
  var EL_H = { P: 4, S: 4, C: 3, B: 10, M: 14 };

  function bakeStack(v) {
    var t = makeCanvas(34, 84), c = t.ctx, list = STACKS[v], y = 84, i;
    for (i = 0; i < list.length; i++) {
      var k = list.charAt(i);
      y -= EL_H[k];
      /* nobody stacks a dishwasher's worth straight: a pixel either way,
         off a hash so the tower is the same tower every frame. The base
         never moves - it is standing on the table. */
      var jx = i === 0 ? 0 : (hash(v * 97 + i * 13 + 5) % 3) - 1;
      if (k === 'P') elPlate(c, y, 2 + jx, 30);
      else if (k === 'S') elPlate(c, y, 5 + jx, 24);
      else if (k === 'C') elSaucer(c, y, 4 + jx, 26);
      else if (k === 'B') elBowl(c, y, jx);
      else if (k === 'M') elMug(c, y, jx);
    }
    return ringUnder(t);
  }

  /* the same tower upside down, for the stacks that hang from the lid */
  function flipV(tile) {
    var t = makeCanvas(tile.w, tile.h);
    t.ctx.translate(0, tile.h);
    t.ctx.scale(1, -1);
    t.ctx.drawImage(tile.canvas, 0, 0);
    t.ctx.setTransform(1, 0, 0, 1, 0, 0);
    return t;
  }

  /* THE CAP: a platter across the mouth of the gap, 42x9, the Coop's
     geometry. Rows top to bottom for the standing column's cap: the
     outline, the rim catching the window, the face, the WELL (the
     platter's glazed dish seen from a hair above), the rim's underside,
     the foot ring, the outline. The hanging cap is the same rows in the
     opposite order - the platter seen from below, foot ring first. */
  var CAP_ROWS = [
    [4, 34, 'outline'], [3, 36, 'porcelainHi'], [2, 38, 'porcelain'], [1, 40, 'porcelain'],
    [1, 40, 'porcelain'], [1, 40, 'porcelainShade'], [2, 38, 'porcelainShade'], [3, 36, 'rimShade'],
    [4, 34, 'outline']
  ];
  function bakeCap(down) {
    var t = makeCanvas(42, 9), c = t.ctx, i;
    for (i = 0; i < 9; i++) {
      var row = CAP_ROWS[down ? 8 - i : i];
      rect(c, row[0], i, row[1], 1, P[row[2]]);
    }
    var wy = down ? [5, 4] : [3, 4];
    rect(c, 10, wy[0], 22, 1, P.glaze);
    rect(c, 12, wy[1], 18, 1, P.glaze);
    dot(c, 5, down ? 6 : 2, P.porcelainHi);
    dot(c, 36, down ? 6 : 2, P.porcelainHi);
    rect(c, 36, down ? 3 : 5, 4, 1, P.rimShade);
    return ringUnder(t);
  }

  /* ================================================= THE SILVERWARE

     A fork, a knife and a spoon, 16 tumble frames each, rasterised at
     bake time rather than hand-plotted: a piece is a width PROFILE along
     its length, turned by exact 22.5-degree steps and plotted pixel by
     pixel into a 29x29 canvas about (14,14). The light stays put while
     the piece turns: an edge facing up-left is steelHi, one facing
     down-right steelDark, so the glint slides round the piece the way it
     does on a real fork tumbling past a window. */
  var CUT_L = [24, 26, 23];

  /* the spans of offset across the piece at distance s along it, as
     [lo, hi] pairs. o is perpendicular to the length. */
  function cutSpans(kind, s, out) {
    out.length = 0;
    if (kind === 0) {                     /* FORK, 24 */
      if (s < 1) out.push(0, 0);
      else if (s < 14) out.push(-1, 0);
      else if (s < 16) out.push(-1, 1);
      else if (s < 17) out.push(-2, 2);
      /* THE TINES, with the middle gap left open - that one dark gap
         is what says fork at this size */
      else out.push(-2, -1, 1, 2);
    } else if (kind === 1) {              /* KNIFE, 26 */
      if (s < 1) out.push(0, 0);
      else if (s < 22) out.push(-1, 1);
      else if (s < 25) out.push(-1, 0);
      else out.push(0, 0);
    } else {                              /* SPOON, 23 */
      if (s < 15) out.push(-1, 0);
      else if (s < 17) out.push(-1, 1);
      else if (s < 22) out.push(-2, 2);
      else out.push(-1, 1);
    }
  }

  var CUT_TONES = [null, 'steel', 'steelDark', 'steelHi', 'steelDeep'];

  function bakeCutlery(kind, frame) {
    var N = 29, C = 14, L = CUT_L[kind];
    var t = makeCanvas(N, N), c = t.ctx;
    var th = frame * TAU / 16, cs = Math.cos(th), sn = Math.sin(th);
    var grid = [], sp = [], s, o, k, i;
    for (i = 0; i < N * N; i++) grid.push(0);
    /* which way the +o edge faces, against a light from the upper left */
    var lp = 0.7071 * (sn - cs);
    var plus = lp > 0.3 ? 3 : (lp < -0.3 ? 2 : 1);
    var minus = lp < -0.3 ? 3 : (lp > 0.3 ? 2 : 1);
    for (s = 0; s <= L; s += 0.25) {
      cutSpans(kind, s, sp);
      var omin = sp[0], omax = sp[sp.length - 1];
      for (k = 0; k < sp.length; k += 2) {
        for (o = sp[k]; o <= sp[k + 1] + 0.001; o += 0.5) {
          var tone = 1;
          if (omax > omin) {
            if (o >= omax - 0.01) tone = plus;
            else if (o <= omin + 0.01) tone = minus;
          }
          /* the knife: a darker handle and the bolster's line */
          if (kind === 1 && s < 13) tone = tone === 3 ? 1 : (tone === 1 ? 2 : 4);
          if (kind === 1 && s >= 13 && s < 14) tone = 4;
          /* the spoon's bowl: the concave well */
          if (kind === 2 && s >= 17 && s < 21 && o >= -0.5 && o <= 1) tone = 2;
          var px = Math.round(C + cs * (s - L / 2) - sn * o);
          var py = Math.round(C + sn * (s - L / 2) + cs * o);
          if (px < 1 || py < 1 || px > N - 2 || py > N - 2) continue;
          var idx = py * N + px;
          /* highlights win, then the darks, then the plain steel */
          var rank = [0, 1, 2, 4, 3][tone];
          if (rank > [0, 1, 2, 4, 3][grid[idx]]) grid[idx] = tone;
        }
      }
    }
    for (i = 0; i < N * N; i++) if (grid[i]) dot(c, i % N, Math.floor(i / N), P[CUT_TONES[grid[i]]]);
    return ringUnder(t);
  }

  /* ===================================================== THE BROWNIE

     Brownie ref: a square cut from the pan, the paper-thin top glossy
     and crackled all over and a shade lighter than the dark fudgy crumb
     under it, seen from a hair above. 14x11 with the ring, the art 12x9
     at (1,1): three rows of top (the far edge lit, then the crackle),
     the lip of crust overhanging the cut face, five rows of crumb with
     its pits, the base in its own shadow. Three frames that differ ONLY
     in where the gloss sits on the crackle - the window catching the top
     as it turns - and the heat round it does the rest. */
  var BROWNIE_TOP = [
    ['.llllllllll.', 'lcgcllcgclcd', 'cllcgllcclgd'],
    ['.llllllllll.', 'lclcgllcclcd', 'cgllclgccllg'],
    ['.llllllllll.', 'lcllclgcglcd', 'cllgllcclcld']
  ];
  var BROWNIE_CUT = ['dccccccccccd', 'mmmmmmmmmmmd', 'mmdmmmhmmdmd', 'mmmmdmmmmmmd', 'mhmmmmmdmmmd', 'dddddddddddd'];
  function bakeBrownie(f) {
    var t = makeCanvas(14, 11);
    paintGrid(t.ctx, BROWNIE_TOP[f].concat(BROWNIE_CUT), 1, 1,
              { l: P.crustHi, c: P.crust, g: P.gloss, m: P.crumb, d: P.crumbDark, h: P.crust });
    return ringUnder(t);
  }

  /* ======================================================= THE CRANE

     A folded paper crane in profile, flying LEFT, in gold paper - the
     game's +5. The origami crane's side view is a particular shape and
     two cuts of this sprite missed it: the body is a triangle hanging
     DOWN to a point (the keel), the neck and the tail are long thin
     points that leave the LOWER body and rise outward at forty-odd
     degrees - a wide V - with the head folded down at the tip of the
     neck, and the wings stand up out of the middle as one tall pointed
     plane, lit down the leading edge and shaded down the trailing one.
     Drawn with neck and tail rising off the top of the body instead, it
     read as a teapot; drawn level with the wing, as a crown. Three wing
     frames, up, level (edge-on) and down, beating three times a second;
     the body is on the same rows in all three. 23x17 with the ring, the
     art 21x15 at (1,1), the body's middle on canvas (12, 9). */
  var CRANE_LOWER = [
    '.......GGGGGGGGG.....',
    '........DGGGGGD......',
    '.........DGGGD.......',
    '..........DGD........',
    '...........D.........'
  ];
  var CRANE = [
    [ /* wings up */
      '..........H..........',
      '.........HGD.........',
      '........HGGD.........',
      '.DG.....HGGGD.......G',
      '...G...HGGGGD......G.',
      '....G..HGGGGGD....G..',
      '.....GHGGGGGGD...G...',
      '......GGGGGGGGD.G....'
    ].concat(CRANE_LOWER),
    [ /* wings level, edge-on */
      '.....................',
      '.....................',
      '.....................',
      '.DG.................G',
      '...G...............G.',
      '....G.............G..',
      '.....G...HHHHH...G...',
      '......GGGGGGGGGDG....'
    ].concat(CRANE_LOWER),
    [ /* wings down, in front of the keel */
      '.....................',
      '.....................',
      '.....................',
      '.DG.................G',
      '...G...............G.',
      '....G.............G..',
      '.....G...........G...',
      '......GHHHHHHHHHG....',
      '.......GGGGGGGGG.....',
      '.......HGGGGGGGD.....',
      '........HGGGGGD......',
      '........HGGGGD.......',
      '.........HGGD........',
      '.........HD..........',
      '..........D..........'
    ]
  ];
  function bakeCrane(f) {
    var t = makeCanvas(23, 17);
    paintGrid(t.ctx, CRANE[f], 1, 1, { G: P.craneGold, D: P.craneDeep, H: P.craneHi });
    return ringUnder(t);
  }

  /* ================================================ THE YOGURT VOLCANO

     NOT the rough ref's shape - that was shapes standing in for an idea,
     and its owner said so. The real thing: a mound of white yogurt
     pushed up into a volcano, a crater at the top brimming with honey,
     the honey running over the lip and down the slopes in three tongues,
     beading at the foot of two of them, and hemp seeds sprinkled over
     the lot. It stands straight on the walnut - no saucer, because a
     white saucer would put the hazard's uniform under the gift - and it
     is told apart from the dishes by SHAPE (a soft flaring mound, never a
     ladder of rims), by the honey (the only amber on the table) and by
     the jade glow every spare life wears.

     The slopes are CONCAVE - narrow and steep at the crater, flaring out
     into a wide skirt at the table - because a straight-sided mound is a
     trapezoid, and the first cut was one. 26x16 with the ring, the art
     24x14 at (1,1). */
  var VOLCANO_W = [10, 10, 12, 12, 12, 14, 14, 16, 16, 18, 20, 22, 24, 24];
  var VOLCANO_PAINT = [
    /* the crater: the far rim lit, the pool glossy on its left and deep
       at its near edge */
    [8, 0, 4, 'yogurtHi'], [7, 1, 1, 'yogurtHi'],
    [8, 1, 8, 'honey'], [9, 1, 3, 'honeyHi'],
    [7, 2, 10, 'honey'], [8, 2, 1, 'honeyHi'], [14, 2, 3, 'honeyDeep'],
    /* THE THREE TONGUES over the near lip and down the slopes, two
       pixels wide where they leave the pool, and the beads at their feet */
    [7, 3, 2, 'honey'], [7, 4, 2, 'honey'], [7, 4, 1, 'honeyHi'], [6, 5, 2, 'honey'], [6, 5, 1, 'honeyHi'],
    [6, 6, 1, 'honey'], [5, 7, 1, 'honey'], [5, 8, 1, 'honey'], [4, 9, 2, 'honeyDeep'], [4, 10, 1, 'yogurtDeep'],
    [15, 3, 2, 'honey'], [15, 4, 2, 'honey'], [16, 5, 1, 'honey'], [16, 6, 2, 'honey'], [17, 7, 1, 'honey'],
    [17, 8, 1, 'honey'], [18, 9, 1, 'honey'], [18, 10, 1, 'honey'], [18, 11, 2, 'honeyDeep'], [19, 12, 1, 'yogurtDeep'],
    [11, 3, 2, 'honey'], [11, 3, 1, 'honeyHi'], [11, 4, 2, 'honey'], [11, 5, 1, 'honey'], [11, 6, 1, 'honeyDeep'],
    /* the swirl the spoon left in it */
    [8, 9, 2, 'yogurtShade'], [10, 10, 3, 'yogurtShade'],
    /* hemp seeds: pale, green and dark, on the slopes and one on the pool */
    [4, 11, 1, 'seedPale'], [13, 9, 1, 'seedPale'], [20, 12, 1, 'seedPale'], [10, 1, 1, 'seedPale'],
    [8, 11, 1, 'seedGreen'], [14, 6, 1, 'seedGreen'], [21, 11, 1, 'seedGreen'], [13, 12, 1, 'seedGreen'],
    [16, 10, 1, 'seedDark'], [2, 12, 1, 'seedDark'], [9, 7, 1, 'seedDark']
  ];
  function bakeVolcano() {
    var t = makeCanvas(26, 16), c = t.ctx, i;
    for (i = 0; i < 14; i++) {
      var w = VOLCANO_W[i], x0 = 1 + (24 - w) / 2, y = 1 + i;
      rect(c, x0, y, w, 1, i === 13 ? P.yogurtShade : P.yogurt);
      if (i >= 1 && i <= 12) rect(c, x0 + w - (i > 8 ? 3 : 2), y, i > 8 ? 3 : 2, 1, P.yogurtShade);
      if (i >= 2 && i <= 11) dot(c, x0, y, P.yogurtHi);
      if (i >= 9) dot(c, x0 + w - 1, y, P.yogurtDeep);
    }
    rect(c, 1, 14, 2, 1, P.yogurtDeep); rect(c, 23, 14, 2, 1, P.yogurtDeep);
    for (i = 0; i < VOLCANO_PAINT.length; i++) {
      var q = VOLCANO_PAINT[i];
      rect(c, 1 + q[0], 1 + q[1], q[2], 1, P[q[3]]);
    }
    return ringUnder(t);
  }

  /* ====================================================== THE BOTTLE

     THE BAY'S OWN HAZARD, and the owner's pick in his own words: "clear
     Heinz ketchup bottles and not the cylinder ones you would find in a
     diner". Table ref 3 has one standing on the island, which is where
     this came from. So: the clear plastic upright bottle that wears the
     glass bottle's silhouette - a white flip-top cap, a short neck, the
     shoulders flaring out, a waisted grip, a wider foot - with the red
     showing through the plastic, a lighter band of empty plastic above
     the sauce, the specular down its left side, and a pale keystone
     label with NOTHING written on it. Mostly ketchup; one in five is
     mustard in the same bottle.

     11 wide and 29 tall, a 32oz bottle at the dishes' 1.2px per cm,
     with the art origin at (2,4) of a 17x34 canvas so a leaning bottle
     and an open lid both fit inside the ring. Art row 28 stands on
     FLOOR-1. Nothing is rotated: a lean shifts rows. */
  var BOTTLE = [[3, 5], [2, 7], [2, 7], [3, 5], [3, 5], [2, 7], [1, 9], [0, 11], [0, 11], [0, 11]];
  (function () {
    for (var i = 10; i <= 24; i++) BOTTLE.push([1, 9]);
    BOTTLE.push([0, 11], [0, 11], [0, 11], [1, 9]);
  })();
  /* THE KEYSTONE, art rows 13..18, as [offset into the body, width]:
     wide across the top and stepping in to a narrower foot, with a
     column of red either side of it, so it reads as a label ON the sauce
     and not as a white band across the bottle */
  var KEYSTONE = [[1, 7], [1, 7], [1, 7], [2, 5], [2, 5], [2, 5]];
  var KEY_ROW = 13;
  var BOT_OX = 2, BOT_OY = 4, BOT_W = 17, BOT_H = 34;
  var BOT_TOP = FLOOR - 29;         /* the screen row of art row 0 */

  /* FIVE FRAMES. F0 upright, cap shut. F1 leaning a pixel. F2 leaning
     two, the flip-top OPEN and the sauce surging up into the shoulder -
     the telegraph. F3 SQUEEZED: the waist pinched in on both sides and
     the sauce right up the neck, while the stream runs. F4 relaxing, cap
     still open. Nobody's hand is drawn: the bottle squeezes itself,
     which is the joke and the WARN line. */
  function bottleRows(frame) {
    var rows = [];
    for (var r = 0; r < 29; r++) {
      var x0 = BOTTLE[r][0], w = BOTTLE[r][1], sh = 0;
      if (frame === 3 && r >= 11 && r <= 23) { x0 += 1; w -= 2; }
      if (frame === 1) sh = r <= 12 ? 1 : 0;
      else if (frame >= 2) sh = r <= 6 ? 2 : (r <= 14 ? 1 : 0);
      rows.push([x0 + sh, w]);
    }
    return rows;
  }

  /* THE PLASTIC IS CLEAR, and that is drawn by not drawing it: above the
     fill line the bottle is a pale wash at a third of an alpha over
     whatever is behind it, with an opaque specular down the left and the
     far wall's shade down the right. Which is why this sprite rings its
     MASK and not itself - the house ring is laid under the art, and under
     a see-through pixel it would show through as a dark smudge. */
  function bakeBottle(kind, fill, frame) {
    var t = makeCanvas(BOT_W, BOT_H), c = t.ctx, m = makeCanvas(BOT_W, BOT_H), r;
    var sauce = kind ? P.mustard : P.ketchup;
    var sauceHi = kind ? P.mustardHi : P.ketchupHi;
    var sauceDeep = kind ? P.mustardDeep : P.ketchupDeep;
    var rows = bottleRows(frame);
    /* the fill line: the engine's cluster count 3..6, spent on how full
       the bottle is (art rows 10, 9, 8, 7) - and pushed up under
       pressure while it is open and squeezed */
    var fillRow = 10 - fill;
    if (frame === 2) fillRow = Math.min(fillRow, 6);
    if (frame === 3) fillRow = 3;
    for (r = 0; r < 29; r++) {
      var x = BOT_OX + rows[r][0], y = BOT_OY + r, w = rows[r][1];
      rect(m.ctx, x, y, w, 1, '#ffffff');
      if (r <= 2) {
        /* the cap: white, its underside and its right side in shade */
        rect(c, x, y, w, 1, r === 2 ? P.capShade : P.cap);
        if (r < 2) dot(c, x + w - 1, y, P.capShade);
        if (r === 0) dot(c, x + 1, y, P.plasticHi);
        continue;
      }
      if (r < fillRow) {
        rect(c, x, y, w, 1, P.plasticClear);
        dot(c, x, y, P.plasticHi);
        dot(c, x + w - 1, y, P.plasticShade);
        if (r === 3) rect(c, x, y, w, 1, P.plasticRing);        /* the neck's thread ring */
      } else {
        rect(c, x, y, w, 1, sauce);
        dot(c, x, y, P.plasticHi);
        if (w > 5) dot(c, x + 1, y, sauceHi);
        dot(c, x + w - 1, y, sauceDeep);
        if (r === fillRow) rect(c, x + 1, y, w - 2, 1, sauceHi);
      }
      if (r === 28) rect(c, x + 1, y, w - 2, 1, sauceDeep);
    }
    /* the shoulder's second highlight, where the plastic curves */
    for (r = 7; r <= 9; r++) dot(c, BOT_OX + rows[r][0] + 2, BOT_OY + r, P.plasticHi);
    /* THE LABEL, a blank keystone - a pale panel and its edge, and not
       one letter on it */
    for (r = KEY_ROW; r < KEY_ROW + KEYSTONE.length; r++) {
      var k = KEYSTONE[r - KEY_ROW], lx = BOT_OX + rows[r][0] + k[0], lw = k[1];
      if (frame === 3) { lx = Math.max(lx, BOT_OX + rows[r][0] + 1); lw = Math.min(lw, rows[r][1] - 2); }
      rect(c, lx, BOT_OY + r, lw, 1, P.label);
      dot(c, lx + lw - 1, BOT_OY + r, P.labelEdge);
      if (r === KEY_ROW || r === KEY_ROW + KEYSTONE.length - 1) rect(c, lx, BOT_OY + r, lw, 1, P.labelEdge);
    }
    /* THE OPEN FLIP-TOP: the lid stands up behind the spout - on the
       left, because it squirts to the right - and the spout is open */
    if (frame >= 2) {
      var cx0 = BOT_OX + rows[0][0];
      c.clearRect(cx0, BOT_OY, 5, 1);
      rect(c, cx0, BOT_OY, 3, 1, P.cap);
      rect(c, cx0 + 3, BOT_OY, 2, 1, P.capShade);
      rect(c, cx0 + 3, BOT_OY - 1, 2, 1, P.cap);
      rect(c, cx0 - 1, BOT_OY - 3, 2, 3, P.cap);
      dot(c, cx0, BOT_OY - 3, P.capShade);
      dot(c, cx0, BOT_OY - 1, P.capShade);
      rect(m.ctx, cx0 + 3, BOT_OY - 1, 2, 1, '#ffffff');
      rect(m.ctx, cx0 - 1, BOT_OY - 3, 2, 3, '#ffffff');
    }
    var ring = ringOf(m, BOT_W, BOT_H);
    ring.ctx.globalCompositeOperation = 'destination-out';
    ring.ctx.drawImage(m.canvas, 0, 0);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(ring.canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* the solid boxes of a frame, in art coordinates: the cap and neck,
     the shoulder, the body - each the exact span of its rows, so the box
     is the picture */
  function bottleBoxes(frame) {
    var rows = bottleRows(frame), out = [];
    var segs = [[0, 4], [5, 9], [10, 28]];
    for (var s = 0; s < segs.length; s++) {
      var lo = 99, hi = -99;
      for (var r = segs[s][0]; r <= segs[s][1]; r++) {
        lo = Math.min(lo, rows[r][0]);
        hi = Math.max(hi, rows[r][0] + rows[r][1]);
      }
      var top = segs[s][0];
      if (s === 0 && frame >= 2) { lo = Math.min(lo, rows[0][0] - 1); top = -3; }
      out.push([lo, top, hi - lo, segs[s][1] - top + 1]);
    }
    return out;
  }

  /* ------------------------------------------------- the squeeze clock

     A bottle's state is keyed to ob.x, the Mantle's grammar: PERIOD px
     of scroll per lap, phase = wrap(seed - x, PERIOD). Never off the
     scroll (the render-vs-collide skew the Mantle measured and fixed),
     and never off ob.age - a thing on a clock in seconds goes off at a
     different place on the screen every time, and one keyed to x always
     goes off at the same place in front of you. 320px is 1.84..2.86s.

       p            frame   what the player sees                    lethal?
       0.00 - 0.46  F0      standing there                           no
       0.46 - 0.50  F0      it starts to RATTLE                      no
       0.50 - 0.53  F1      rattling, and leaning right a pixel      no
       0.53 - 0.56  F1      THE AIM: a dotted line of sauce runs out
                            along the exact arc it is about to take  no
       0.56 - 0.62  F2      the FLIP-TOP CLICKS OPEN (a 'tock'), the
                            sauce surges up the shoulder, a bead
                            swells on the spout, two spits fly out
                            along the first of the arc; the aim
                            stands blinking                          no
       0.62 - 0.69  F3      SQUEEZED - 'squirt' - and the head runs
                            out along the arc
       0.69 - 0.76  F3      the whole ribbon, spout to table; the
                            splash, and a puddle on the walnut
       0.76 - 0.82  F4      the tail leaves the spout and lands
       0.82 - 0.88  F4      cap open, nothing in the air             no
       0.88 - 1.00  F1/F0   straightens up                           no

     LETHAL 0.64..0.80, and only along the DRAWN ribbon: two hundredths
     after the first sauce is painted and two before the last of it
     leaves. At the clamped dt of 1/30 and speedMax 174 a frame is 5.8px
     = 0.018 of a lap, so a box never exists on a frame where no sauce is
     drawn - and checked headless over 9,624 frames (four apexes, three
     sub-pixel offsets, both sauces, p in steps of 0.0025): some 82,000
     jet boxes, every pixel of every one of them on painted sauce, and
     none outside 0.64..0.80. 0.16 x 320 = 51px of scroll lethal per lap (the
     Mantle's beam is 63 of 300); half of every lap the bottle does
     nothing at all. The warning starts 0.18 of a lap ahead of the sauce,
     58px, 0.33..0.52s, and the bottle has always gone off once already
     on the right of the screen before it reaches you (it enters at x
     480 and the doodad flies at 116, 364px of scroll, more than a lap). */
  var PERIOD = 320;
  var P_SHAKE = 0.46, P_LEAN = 0.50, P_AIM = 0.53, P_OPEN = 0.56, P_FIRE = 0.62, P_FULL = 0.69;
  var P_CUT = 0.76, P_DRY = 0.82, P_SHUT = 0.88, P_REST = 0.94;
  var P_LIVE0 = 0.64, P_LIVE1 = 0.80;

  function bottlePhase(ob) { return wrap(ob.seed - ob.x, PERIOD) / PERIOD; }

  function bottleFrame(p) {
    if (p < P_LEAN) return 0;
    if (p < P_OPEN) return 1;
    if (p < P_FIRE) return 2;
    if (p < P_CUT) return 3;
    if (p < P_SHUT) return 4;
    if (p < P_REST) return 1;
    return 0;
  }

  /* the rattle before it goes: a pixel either way every 3px of scroll,
     so it is keyed to x like everything else and holds still on pause */
  function bottleShake(p) {
    if (p < P_SHAKE || p >= P_FIRE) return 0;
    return Math.floor(p * PERIOD / 3) & 1;
  }

  /* THE JET. A ballistic arc from the open spout to the table: x runs
     linearly with u over the bottle's reach R, and y is the parabola
     through the spout at u 0, the table at u 1, with its apex A px over
     the spout. y(u) = NOZ_Y - k u + (k + DROP) u^2 has its top at
     u = k / 2(k + DROP), A px up, when k = 2A + 2 sqrt(A^2 + A DROP). */
  var NOZ_X = 8;                    /* the spout, two pixels of lean in */
  var NOZ_Y = FLOOR - 31;           /* just above the open spout        */
  var JET_DROP = (FLOOR - 2) - NOZ_Y;

  /* the jet's samples as flat [x, y, u, ...], one per new pixel along
     the arc. Shared by drawing and by rectsFor, from the same ob.x, so
     every box is a pixel the ribbon was painted on. */
  var JS = [];
  function jetSamples(ob, u0, u1) {
    JS.length = 0;
    if (u1 < u0) return 0;
    var u = u0, lx = 1e9, ly = 1e9, k = ob.kc, R = ob.reach;
    for (var guard = 0; guard < 2000; guard++) {
      var x = Math.round(ob.x + NOZ_X + R * u);
      var y = Math.round(NOZ_Y - k * u + (k + JET_DROP) * u * u);
      if (x !== lx || y !== ly) { JS.push(x, y, u); lx = x; ly = y; }
      if (u >= u1) break;
      var dy = -k + 2 * (k + JET_DROP) * u;
      u = Math.min(u1, u + 0.6 / Math.sqrt(R * R + dy * dy));
    }
    return JS.length / 3;
  }
  function jetHeadTail(p) {
    return [clamp((p - P_FIRE) / (P_FULL - P_FIRE), 0, 1), clamp((p - P_CUT) / (P_DRY - P_CUT), 0, 1)];
  }

  /* ========================================================== BUILD */

  function build() {
    LivingRoom.build();               /* the menu gloom and the lid's pools live there */
    /* the lid: the house's ceiling band, the Desk's call exactly */
    T.ceiling = LivingRoom.bakeCeiling(null);
    T.wall = bakeWall();
    T.fixtures = bakeFixtures();
    T.island = bakeIsland();
    T.chairs = bakeChairs();
    T.strip = [];
    for (var si = 0; si < STRIPS.length; si++) T.strip.push(bakeStrip(STRIPS[si][0], STRIPS[si][1], 3301 + si));
    var nw = bakeNearWalnut();
    T.near = nw.near;
    T.band = nw.band;
    T.light = bakeLight();
    T.stand = [bakeStack(0), bakeStack(1), bakeStack(2)];
    T.hang = [flipV(T.stand[0]), flipV(T.stand[1]), flipV(T.stand[2])];
    T.capUp = bakeCap(false);
    T.capDown = bakeCap(true);
    T.cutlery = [];
    for (var k = 0; k < 3; k++) {
      T.cutlery.push([]);
      for (var f = 0; f < 16; f++) T.cutlery[k].push(bakeCutlery(k, f));
    }
    T.brownie = [bakeBrownie(0), bakeBrownie(1), bakeBrownie(2)];
    T.crane = [bakeCrane(0), bakeCrane(1), bakeCrane(2)];
    T.volcano = bakeVolcano();
    T.bottle = [];
    for (var kind = 0; kind < 2; kind++) {
      T.bottle.push([]);
      for (var fill = 0; fill < 4; fill++) {
        T.bottle[kind].push([]);
        for (var fr = 0; fr < 5; fr++) T.bottle[kind][fill].push(bakeBottle(kind, fill, fr));
      }
    }
    T.bottleBox = [];
    for (fr = 0; fr < 5; fr++) T.bottleBox.push(bottleBoxes(fr));
  }

  /* ======================================================== DRAWING */

  /* BACK TO FRONT, nearest last, each at its distance's parallax: the
     wall and the ceiling (0.15), the fridge and the hood (0.22), the
     island (0.32), the chair backs (0.46), the three far strips of walnut
     (0.62, 0.78, 0.92), the near walnut with the stacks (1.0), and the
     lens's side falloff. The fill is a safety net: the layers cover every
     row between them. */
  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = P.ceilingFar;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * WALL_PAR, 0);
    tileX(ctx, T.fixtures.canvas, scroll * FIX_PAR, 0);
    tileX(ctx, T.island.canvas, scroll * ISL_PAR, ISL_Y);
    tileX(ctx, T.chairs.canvas, scroll * CHR_PAR, CHR_Y);
    for (var i = 0; i < STRIPS.length; i++) tileX(ctx, T.strip[i].canvas, scroll * STRIPS[i][2], STRIPS[i][0]);
    tileX(ctx, T.near.canvas, scroll, NEAR_Y);
    ctx.drawImage(T.light.canvas, 0, 0);
  }

  /* THE LID IS THE HOUSE'S CEILING BAND, the Desk's and the Couch's own:
     LivingRoom.bakeCeiling's plaster, crackle-glass pendant and register
     over the four hard crown rows, with each pendant's pool of light and
     the crown's shade strip laid into the room under it by
     LivingRoom.drawCeiling. It was two outline rows at 22..23 over the far
     ceiling plane - true to the lens, and the owner's word for it was
     "lazy": the kill line that ends a run is the one thing in the bay
     that has to read as a solid object at a glance, and the Living Room
     settled what that object looks like in this house. Table ref 1 has
     those same amber pendants hanging over this very table.
     The far ceiling plane with its cans goes on behind it from row 24
     down, so the room still recedes under the band. T.ceiling is baked
     once in build(), after LivingRoom.build(), which bakes the pools and
     the shade strip drawCeiling uses. */
  function drawCeiling(ctx, scroll) { LivingRoom.drawCeiling(ctx, scroll, T.ceiling); }

  /* The band: the near walnut under the kill row, cut from the same
     painting as the rows above it. No foreground lip - the lens is on the
     table, and nothing is nearer than the wood. */
  function drawFloor(ctx, scroll) {
    tileX(ctx, T.band.canvas, scroll, FLOOR);
  }

  /* The calm version, for the porch's Dining Room row: the room and the
     bare table, at six tenths of the scroll, the house's menu gloom over
     the lower half so the ui has something to sit on. No stacks, no
     bottles, no silverware - the porch bakes this once at a frozen
     scroll, and a hazard in a title picture is a hazard that never moves. */
  function drawMenuBackdrop(ctx, scroll) {
    drawBackdrop(ctx, scroll * 0.6);
    ctx.drawImage(LivingRoom.tiles.menuShade.canvas, 0, VH - 120);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  /* ------------------------------------------------------- the stacks */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), v = ob.variant;
    var topH = ob.gapY - CEIL, botY = ob.gapY + ob.gapH, botH = FLOOR - botY;
    /* the hard cast shadow on the kitchen behind, the Couch's strip */
    if (topH > 0) Tint.rect(ctx, x + 34, CEIL, 4, topH, H.void, 6);
    if (botH > 0) Tint.rect(ctx, x + 34, botY, 4, botH, H.void, 6);
    if (topH > 0) drawColumnDown(ctx, T.hang[v].canvas, x, CEIL, 34, topH);
    if (botH > 0) drawColumnUp(ctx, T.stand[v].canvas, x, botY, 34, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
  }

  /* ------------------------------------------------------- the bottle */

  function drawBottle(ctx, ob) {
    var p = bottlePhase(ob), f = bottleFrame(p), sx = bottleShake(p);
    var bx = Math.round(ob.x) + sx, i, n, a;
    var sauce = ob.kind ? P.mustard : P.ketchup;
    var sauceHi = ob.kind ? P.mustardHi : P.ketchupHi;
    var sauceDeep = ob.kind ? P.mustardDeep : P.ketchupDeep;
    var ht = jetHeadTail(p), uH = ht[0], uT = ht[1];
    var landX = Math.round(ob.x + NOZ_X + ob.reach);

    /* THE AIM, the Mantle's dots: from the moment the bottle leans, a
       dotted line of sauce-coloured specks runs out along the exact arc
       the jet is about to take, nearest the spout first, and stands
       there blinking until the sauce follows it. It is the one piece of
       the telegraph that says WHERE as well as WHEN, and it is drawn on
       the arc the boxes will be on, so it cannot lie. */
    if (p >= P_AIM && p < P_FIRE) {
      var reachU = clamp((p - P_AIM) / 0.05, 0, 1);
      var blink = Math.floor(p * PERIOD / 4) & 1;
      n = jetSamples(ob, 0.04, reachU);
      a = ctx.globalAlpha;
      ctx.globalAlpha = a * (blink ? 0.75 : 0.45);
      for (i = 0; i < n; i += 7) rect(ctx, JS[i * 3], JS[i * 3 + 1], 2, 2, sauce);
      ctx.globalAlpha = a;
    }

    /* the splash as the head hits the table (the puddle itself is a
       thing of its own on the walnut - see stepWorld) */
    if (p >= P_FULL && p < P_FULL + 0.05) {
      var sp = (p - P_FULL) / 0.05, up = Math.sin(sp * Math.PI);
      dot(ctx, landX - 3 - Math.round(sp * 5), FLOOR - 2 - Math.round(up * 5), sauce);
      dot(ctx, landX + 3 + Math.round(sp * 6), FLOOR - 2 - Math.round(up * 6), sauceHi);
      dot(ctx, landX + 1 + Math.round(sp * 2), FLOOR - 3 - Math.round(up * 9), sauce);
      dot(ctx, landX - 1 - Math.round(sp * 2), FLOOR - 3 - Math.round(up * 7), sauceDeep);
    }

    /* the bottle and its contact shadow */
    Tint.rect(ctx, bx - 2, FLOOR - 2, 15, 2, P.shadeCool, 8);
    ctx.drawImage(T.bottle[ob.kind][ob.fill][f].canvas, bx - BOT_OX, BOT_TOP - BOT_OY);

    /* the telegraph's last beat: a bead swelling on the open spout, and
       two spits of sauce flying out along the start of the arc */
    if (p >= P_OPEN && p < P_FIRE) {
      var sw = (p - P_OPEN) / (P_FIRE - P_OPEN);
      var nx = bx + NOZ_X, ny = BOT_TOP - 2;
      rect(ctx, nx, ny - (sw > 0.5 ? 1 : 0), sw > 0.5 ? 2 : 1, sw > 0.5 ? 2 : 1, sauce);
      if (sw > 0.45) {
        var su = (sw - 0.45) / 0.55 * 0.16;
        n = jetSamples(ob, su * 0.6, su);
        if (n > 0) {
          rect(ctx, JS[(n - 1) * 3], JS[(n - 1) * 3 + 1], 2, 2, sauce);
          dot(ctx, JS[0], JS[1], sauceHi);
        }
      }
    }

    if (p < P_FIRE || p >= P_DRY) return;

    /* THE RIBBON: three passes over the same samples - the dark
       underside, the body, and the gloss along its top, broken into runs
       that travel down the stream as it flows (keyed to the phase, so
       they hold still on pause). A pixel fatter for the first eighth of
       the arc, where it leaves the spout under pressure. A 4px ribbon of
       sauce with no halo and no glow: hazards never glow. */
    n = jetSamples(ob, uT, uH);
    var fat;
    for (i = 0; i < n; i++) {
      fat = JS[i * 3 + 2] < 0.12 ? 1 : 0;
      rect(ctx, JS[i * 3] - 1, JS[i * 3 + 1], 3 + fat, 3, sauceDeep);
    }
    for (i = 0; i < n; i++) {
      fat = JS[i * 3 + 2] < 0.12 ? 1 : 0;
      rect(ctx, JS[i * 3] - 1, JS[i * 3 + 1] - 1, 3 + fat, 3, sauce);
    }
    var flow = Math.floor(p * PERIOD * 2.5);
    for (i = 0; i < n; i++) {
      if (wrap(i - flow, 11) < 7) dot(ctx, JS[i * 3] - 1, JS[i * 3 + 1] - 1, sauceHi);
    }
    /* the head, while it is still running out: a fat blob, the spray in
       front of it */
    if (uH < 1 && n > 0) {
      var hx = JS[(n - 1) * 3], hy = JS[(n - 1) * 3 + 1];
      rect(ctx, hx - 1, hy - 2, 4, 4, sauce);
      dot(ctx, hx, hy - 2, sauceHi);
      dot(ctx, hx + 4, hy - 2, sauceHi);
      dot(ctx, hx + 5, hy + 1, sauce);
    }
    /* the tail, once it has left the spout: a blob too, and the last
       bead hanging off the spout behind it */
    if (uT > 0 && n > 0) {
      rect(ctx, JS[0] - 1, JS[1] - 1, 3, 4, sauce);
      rect(ctx, bx + NOZ_X, BOT_TOP - 2, 1, 2, sauce);
    }
    /* DRIPS hanging off the underside of the ribbon - drawn, never boxed */
    var drips = [0.34, 0.6, 0.8];
    for (i = 0; i < drips.length; i++) {
      var du = drips[i];
      if (du <= uT || du >= uH) continue;
      var since = p - (P_FIRE + du * (P_FULL - P_FIRE));
      var dl = Math.min(5, 1 + Math.floor(since * 140));
      var dx = Math.round(ob.x + NOZ_X + ob.reach * du);
      var dy = Math.round(NOZ_Y - ob.kc * du + (ob.kc + JET_DROP) * du * du) + 2;
      dl = Math.min(dl, FLOOR - 3 - dy);
      if (dl <= 0) continue;
      rect(ctx, dx, dy, 1, dl, sauce);
      rect(ctx, dx, dy + dl, 2, 1, sauceDeep);
    }
  }

  /* ----------------------------------------------------- the falling */

  /* Everything that draws or collides a drop reads ob.gold, ob.spicy,
     ob.sour and ob.whirl LIVE - the engine may set the last two after
     makeDrop returns. Neither is tuned here; if one ever arrived it is
     painted as the brownie, which at least reads as a thing to catch. */
  function kindOf(ob) {
    if (ob.gold) return 'crane';
    if (ob.spicy || ob.sour || ob.whirl) return 'brownie';
    return 'cutlery';
  }
  function cutFrame(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 16) % 16; }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y), i, k;
    var kind = kindOf(ob);
    if (kind === 'cutlery') {
      blitBelowCeil(ctx, T.cutlery[ob.kind][cutFrame(ob)].canvas, x - 14, y - 14);
      return;
    }
    var age = ob.age || 0;
    if (kind === 'crane') {
      var cp = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(15 + cp * 5),
           'rgba(243,204,132,' + (0.44 * cp).toFixed(3) + ')',
           'rgba(224,176,74,' + (0.20 * cp).toFixed(3) + ')',
           'rgba(224,176,74,0)');
      for (i = 0; i < 2; i++) {
        k = wrap(age * 0.9 + i * 0.5, 1);
        var sy = y - 8 - Math.round(k * 6);
        if (sy >= CEIL) dot(ctx, x - 4 + i * 9, sy, i ? P.craneHi : '#f3cc84');
      }
      var wf = [0, 1, 2, 1][Math.floor(age * 12) % 4];
      blitBelowCeil(ctx, T.crane[wf].canvas, x - 12, y - 9);
      return;
    }
    /* THE BROWNIE, wearing the game's heat: the Couch's cheddar glow and
       its three sparks coming off the top. The glow says heat; the
       brownie under it is the only thing that says Dining Room. */
    var pulse = 0.72 + 0.28 * Math.sin(age * 2.6);
    glow(ctx, x, y, Math.round(16 + pulse * 6),
         'rgba(255,224,138,' + (0.50 * pulse).toFixed(3) + ')',
         'rgba(240,146,46,' + (0.24 * pulse).toFixed(3) + ')',
         'rgba(184,77,18,0)');
    for (i = 0; i < 3; i++) {
      k = wrap(age * 0.7 + i * 0.41, 1);
      var fy = y - 8 - Math.round(k * 7);
      if (fy < CEIL) continue;
      dot(ctx, x - 4 + Math.round(Math.sin(age * 2 + i) * 4), fy, i % 2 ? FX.hotHi : FX.hot);
    }
    blitBelowCeil(ctx, T.brownie[Math.floor(age * 5) % 3].canvas, x - 7, y - 5);
  }

  /* The spot a falling thing casts on the table: wide and faint while it
     is up by the lid, tight and dark as it arrives - and in its own
     colour, so the spot tells the kind before the thing is in sight. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var high = (FLOOR - 4) - ob.y;
    var far = clamp(high / (FLOOR - 4 - CEIL), 0, 1);
    var w = 5 + Math.round(9 * far);
    var kind = kindOf(ob);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 2,
              kind === 'crane' ? P.craneDeep : (kind === 'brownie' ? P.crumbDark : P.shadeCool),
              14 - Math.round(9 * far));
  }

  /* What has landed, lying on the walnut in front of the kill line. A
     fork rings once and lies still: the settle frame for the first
     0.14s is the whole of its bounce. Everything fades over its last
     quarter second rather than blinking out. */
  function drawDropSplat(ctx, ob) {
    var x = Math.round(ob.x), kind = kindOf(ob);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * clamp(ob.broken / 0.25, 0, 1);
    if (kind === 'cutlery') {
      var settle = ob.broken > (ob.splat || SPLAT_TIME) - 0.14;
      Tint.rect(ctx, x - 11, FLOOR + 5, 22, 2, P.shadeCool, 8);
      ctx.drawImage(T.cutlery[ob.kind][settle ? 15 : (ob.flip ? 8 : 0)].canvas, x - 14, FLOOR + 4 - 14);
    } else if (kind === 'crane') {
      Tint.rect(ctx, x - 9, FLOOR + 2, 18, 2, P.shadeCool, 8);
      ctx.drawImage(T.crane[1].canvas, x - 12, FLOOR - 12);
    } else {
      Tint.rect(ctx, x - 7, FLOOR + 4, 14, 2, P.shadeCool, 8);
      ctx.drawImage(T.brownie[0].canvas, x - 7, FLOOR - 6);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------- the spare life */

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var i;
    /* the dent and the honey that ran off onto the table stay where it
       was put, even while Gerald is reeling it in */
    var bx = Math.round(ob.x);
    /* not under a crow's talons (ob.held, Crow's ORDNANCE): the gift has left its shadow and its honey */
    if (!ob.held) {
      Tint.rect(ctx, bx - 12, FLOOR - 1, 24, 2, P.shadeCool, 8);
      rect(ctx, bx - 10, FLOOR - 1, 2, 1, P.honey);
      rect(ctx, bx + 9, FLOOR - 1, 2, 1, P.honeyDeep);
    }
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 8 + ob.dy);
    /* THE GLOW SAYS SPARE LIFE: the coasters' exact jade. No bob - yogurt
       on a table holds still, and the pulse carries the gift. */
    /* Stronger than the Living Room's coasters wear it (0.34 / 0.14 at
       the core and the shoulder): that jade was set against a room at
       night, and against a kitchen in the afternoon it measured as a faint
       tint round a white mound. Same colours, same pulse, half again the
       alpha and four pixels more reach. */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + (ob.age || 0) * 2.6);
    var r = Math.round(20 + pulse * 4);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.58 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.24 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.drawImage(T.volcano.canvas, x - 13, y - 7);
    for (i = 0; i < 3; i++) {
      var k = wrap(ob.phase * 0.22 + (ob.age || 0) * 0.3 + i * 0.34, 1);
      dot(ctx, x - 8 + i * 8, y - 10 - Math.round(k * 11), i === 1 ? P.porcelainHi : P.lifePale);
    }
  }

  /* ------------------------------------------------------- the litter

     Under the kill line, on the walnut, never boxed: brownie crumbs, a
     folded napkin corner, hemp seeds off a volcano, a smear of ketchup. */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2, i, h;
    if (ob.kind === 0) {
      for (i = 0; i < 6; i++) {
        h = hash(ob.seed + i * 977);
        dot(ctx, x + (h >>> 3) % 18, y + 1 + (h >>> 11) % 4, (h & 1) ? P.crust : P.crumbDark);
      }
    } else if (ob.kind === 1) {
      var ws = [10, 8, 6, 4];
      for (i = 0; i < 4; i++) {
        rect(ctx, x, y + i, ws[i], 1, i ? P.linen : P.linenLit);
        dot(ctx, x + ws[i] - 1, y + i, P.linenShade);
      }
      Tint.rect(ctx, x + 1, y + 4, 8, 1, H.walnutDeep, 8);
    } else if (ob.kind === 2) {
      var sc = [P.seedPale, P.seedPale, P.seedGreen, P.seedPale, P.seedDark];
      for (i = 0; i < 5; i++) {
        h = hash(ob.seed + i * 613);
        dot(ctx, x + (h >>> 3) % 14, y + 1 + (h >>> 11) % 3, sc[i]);
      }
    } else if (ob.kind === 4) {
      /* a bottle's shot, spreading on the walnut over its first tenth of
         a second: a splat with a lit edge and a few flecks round it */
      var g = clamp((ob.age || 0) / 0.1, 0, 1), cx = x + 8;
      var sc2 = ob.sauce ? P.mustard : P.ketchup, sh2 = ob.sauce ? P.mustardHi : P.ketchupHi;
      var sd2 = ob.sauce ? P.mustardDeep : P.ketchupDeep;
      var w0 = Math.round(5 + 7 * g), w1 = Math.round(7 + 9 * g), w2 = Math.round(4 + 6 * g);
      rect(ctx, cx - Math.floor(w0 / 2), FLOOR + 1, w0, 1, sc2);
      rect(ctx, cx - Math.floor(w1 / 2), FLOOR + 2, w1, 1, sc2);
      rect(ctx, cx - Math.floor(w2 / 2) + 1, FLOOR + 3, w2, 1, sd2);
      rect(ctx, cx - Math.floor(w0 / 2) + 1, FLOOR + 1, Math.max(1, w0 - 5), 1, sh2);
      if (g >= 1) {
        h = hash(ob.seed);
        dot(ctx, cx - 9 - (h % 3), FLOOR + 2 + ((h >>> 3) & 1), sc2);
        dot(ctx, cx + 9 + ((h >>> 5) % 3), FLOOR + 1 + ((h >>> 7) & 1), sd2);
        dot(ctx, cx + 5, FLOOR + 4, sc2);
      }
    } else {
      rect(ctx, x + 4, y + 2, 7, 1, P.ketchupDeep);
      dot(ctx, x + 6, y + 2, P.ketchup);
      dot(ctx, x, y + 3, P.ketchupDeep); dot(ctx, x + 14, y + 1, P.ketchupDeep);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawBottle(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ======================================================= THE COVER

     118x114 on the big card, 82x94 on the side ones; the caller has
     clipped. A live miniature of THIS view, at the bay's own row
     fractions: the ceiling plane over the top quarter with its cans and
     the kill line through it, the wall with its glass uppers, shutters
     and doorway, the fridge and the hood drifting in front of it, the
     island's quartz line with the plant on it, two chair backs over the
     walnut's far edge, and the walnut taking the bottom 40% - the dish
     stacks standing on it and hanging over it, a fork coming down and the
     bottle going off between two stacks, the one red thing on the card.
     Each layer slides at its own parallax, as in the level. */
  function dishlet(ctx, x, y, h, up) {
    if (h <= 0) return;
    rect(ctx, x, y, 10, h, P.outline);
    for (var cy = 0; cy < h; cy += 3) {
      var side = Math.floor(cy / 3) % 4 === 3 ? 1 : 0;
      rect(ctx, x + 1 + side, y + cy, 8 - side * 2, 1, P.porcelainHi);
      rect(ctx, x + 1 + side, y + cy + 1, 8 - side * 2, 1, P.porcelain);
      rect(ctx, x + 1 + side, y + cy + 2, 8 - side * 2, 1, P.rimShade);
    }
    var by = up ? y : y + h - 3;
    rect(ctx, x - 2, by, 14, 3, P.outline);
    rect(ctx, x - 1, by + (up ? 0 : 1), 12, 1, P.porcelainHi);
    rect(ctx, x - 1, by + (up ? 1 : 0), 12, 1, P.porcelainShade);
    Tint.rect(ctx, x + 10, y, 2, h, H.void, 4);
  }

  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22, i, k, a;
    /* the bay's own rows as fractions of the card: the kill line 23/270,
       the crown over the wall 62, the island's nose 137, the walnut's far
       edge 164, the kill row 242 */
    var killY = y + Math.round(h * 0.085);
    var crownY = y + Math.round(h * 0.23);
    var noseY = y + Math.round(h * 0.507);
    var edgeY = y + Math.round(h * 0.607);
    var tableY = y + Math.round(h * 0.896);
    var lidY = killY + 2;             /* the top of the lane on the card */

    /* 1. THE CEILING PLANE, darker at the top of the card, and its cans
       drifting at the far wall's pace */
    for (i = y; i < crownY; i++) rect(ctx, x, i, w, 1, mix(P.ceilingTop, P.ceilingFar, (i - y) / Math.max(1, crownY - y)));
    for (k = 0; k < 3; k++) {
      var cx0 = x + Math.round(wrap(k * 47 + 20 - s * 0.15, w + 20)) - 10;
      var cy0 = y + [3, 9, 15][k] * h / 114;
      Tint.rect(ctx, cx0 - 5, Math.round(cy0) - 2, 11, 5, H.daylight, 6);
      rect(ctx, cx0 - (2 - k % 2), Math.round(cy0), 4 - (k % 2) * 2, 1, H.lampCore);
    }

    /* 2. THE WALL: the crown, the glass uppers, the big shutters, the
       splash, the doorway - all at 0.15 */
    rect(ctx, x, crownY, w, noseY - crownY, P.wallDay);
    rect(ctx, x, crownY, w, 1, H.cabinetLit);
    var upB = y + Math.round(h * 0.43);
    for (k = -1; k < 2; k++) {
      var gx0 = x + Math.round(wrap(w * 0.18 - s * 0.15 + k * w * 0.9, w * 1.8)) - Math.round(w * 0.45);
      for (i = 0; i < 3; i++) {
        rect(ctx, gx0 + i * 7, crownY + 1, 7, upB - crownY - 1, H.cabinetLit);
        rect(ctx, gx0 + i * 7 + 1, crownY + 2, 5, upB - crownY - 3, P.glassDark);
        dot(ctx, gx0 + i * 7 + 2, crownY + 5, P.porcelain);
        rect(ctx, gx0 + i * 7 + 2, crownY + 9, 3, 1, P.porcelain);
      }
      var sx0 = gx0 + 27, sw = Math.round(w * 0.24);
      var shT = y + Math.round(h * 0.31);
      rect(ctx, sx0 - 1, shT - 1, sw + 2, noseY - shT + 1, H.cabinetLit);
      for (i = shT; i < noseY; i += 2) {
        rect(ctx, sx0, i, sw, 1, H.cabinet);
        rect(ctx, sx0, i + 1, sw, 1, P.slit);
      }
      rect(ctx, sx0 + Math.round(sw / 2), shT, 1, noseY - shT, H.cabinetShade);
      var dx0 = sx0 + sw + 12;
      rect(ctx, dx0 - 1, y + Math.round(h * 0.34), 12, noseY - y - Math.round(h * 0.34), H.cabinetLit);
      rect(ctx, dx0, y + Math.round(h * 0.35), 10, noseY - y - Math.round(h * 0.35), P.hallDark);
      rect(ctx, dx0 + 3, y + Math.round(h * 0.37), 5, noseY - y - Math.round(h * 0.37), P.hallDoor);
    }
    for (i = upB; i < noseY; i += 2) {
      for (k = (i / 2) % 2 ? 0 : 2; k < w; k += 4) if (((k + i) % 7) !== 3) dot(ctx, x + k, i, P.tileB);
    }
    Tint.rect(ctx, x, y, w, noseY - y, P.distanceCool, 6);

    /* 3. THE FRIDGE and THE HOOD, at 0.22 */
    var fx = x + Math.round(wrap(w * 0.04 - s * 0.22, w * 1.6)) - Math.round(w * 0.3);
    var frW = Math.round(w * 0.2), frT = y + Math.round(h * 0.22);
    rect(ctx, fx, frT, frW, noseY - frT, P.fridgeSteel);
    rect(ctx, fx, frT, 1, noseY - frT, H.steelLit);
    rect(ctx, fx + Math.round(frW / 2), frT, 1, noseY - frT, H.steelDeep);
    rect(ctx, fx + Math.round(frW / 2) - 2, frT + 9, 1, 8, H.steelLit);
    rect(ctx, fx + Math.round(frW / 2) + 2, frT + 9, 1, 8, H.steelLit);
    var mags = [P.photoA, P.photoB, P.photoC, P.photoD, P.note, P.photoA, P.photoC, P.pinkPaper];
    for (i = 0; i < mags.length; i++) rect(ctx, fx + 2 + (i % 3) * 2, frT + 3 + Math.floor(i / 3) * 4 + (i % 2), 2, 2, mags[i]);
    var hx = x + Math.round(wrap(w * 0.55 - s * 0.22, w * 1.6)) - Math.round(w * 0.3);
    var canT = y + Math.round(h * 0.285);
    rect(ctx, hx - 2, y, 5, canT - y, H.steel);
    rect(ctx, hx - 2, y, 1, canT - y, H.steelLit);
    rect(ctx, hx - 1, y + 3, 3, 2, H.steelDeep);
    rect(ctx, hx - 9, canT, 19, 1, P.hoodGlass);
    rect(ctx, hx - 10, canT + 1, 21, 1, P.hoodGlassEdge);
    rect(ctx, hx - 3, canT + 1, 7, 2, H.steel);
    Tint.rect(ctx, fx, frT, frW, noseY - frT, P.distanceCool, 5);
    Tint.rect(ctx, hx - 10, y, 21, canT - y + 3, P.distanceCool, 5);

    /* 4. THE ISLAND at 0.32: the ZZ plant and the red pot on it, the
       quartz nose, the base in its own shade */
    var zx = x + Math.round(wrap(w * 0.55 - s * 0.32, w * 1.4)) - Math.round(w * 0.2);
    rect(ctx, zx - 3, noseY - 9, 6, 6, H.iron);
    rect(ctx, zx - 4, noseY - 3, 1, 3, H.walnutHi); rect(ctx, zx + 3, noseY - 3, 1, 3, H.walnutHi);
    for (i = 0; i < 9; i++) {
      var la = (i - 4) * 0.3;
      dot(ctx, zx + Math.round(Math.sin(la) * (4 + (i % 3) * 2)), noseY - 11 - Math.round(Math.cos(la) * (3 + (i % 3) * 2)), i % 2 ? H.leaf : H.leafDeep);
    }
    rect(ctx, zx + 10, noseY - 4, 9, 4, P.enamelRed); rect(ctx, zx + 10, noseY - 4, 9, 1, P.enamelHi);
    rect(ctx, x, noseY, w, 1, P.quartz);
    rect(ctx, x, noseY + 1, w, 1, H.cabinetShade);
    rect(ctx, x, noseY + 2, w, edgeY - noseY - 2, P.islandFace);
    var pw2 = Math.max(10, Math.round(w * 0.14));
    for (i = x - Math.round(wrap(s * 0.32, pw2)); i < x + w; i += pw2) rect(ctx, i, noseY + 2, 1, edgeY - noseY - 2, P.islandDeep);

    /* 5. THE CHAIR BACKS at 0.46, peeking over the walnut's far edge */
    var chW = Math.round(w * 0.2), railT = y + Math.round(h * 0.478), railB = y + Math.round(h * 0.545);
    for (k = 0; k < 2; k++) {
      var chx = x + Math.round(wrap(w * 0.15 + k * w * 0.55 - s * 0.46, w * 1.1)) - Math.round(w * 0.05);
      rect(ctx, chx, railT - 1, chW, railB - railT + 2, P.outline);
      rect(ctx, chx + 1, railT, chW - 2, railB - railT, P.chairShade);
      rect(ctx, chx + 2, railT, chW - 4, 1, P.chairHi);
      rect(ctx, chx, railB + 1, 3, edgeY - railB - 1, P.outline);
      rect(ctx, chx + chW - 3, railB + 1, 3, edgeY - railB - 1, P.outline);
      rect(ctx, chx + 1, railB + 1, 1, edgeY - railB - 1, P.chairShade);
      rect(ctx, chx + chW - 2, railB + 1, 1, edgeY - railB - 1, P.chairShade);
      for (i = 0; i < edgeY - railB - 1; i++) {
        dot(ctx, chx + 3 + i, railB + 1 + i, P.chairShade);
        dot(ctx, chx + chW - 4 - i, railB + 1 + i, P.chairShade);
      }
    }

    /* 6. THE WALNUT, its own profile scaled into the card: the dark edge,
       the window's reflection a few rows down, the long darker run toward
       you, one streak of reflection, the kill row and its lit arris */
    for (i = edgeY; i < y + h; i++) {
      var row = 164 + Math.round((i - edgeY) / Math.max(1, (y + h) - edgeY) * 105);
      rect(ctx, x, i, w, 1, walnutColour(row));
    }
    var stx = x + Math.round(wrap(w * 0.4 - s, w + 20)) - 10;
    Tint.rect(ctx, stx, edgeY + 3, 6, tableY - edgeY - 3, P.walnutSheen, 5);
    for (i = 0; i < 5; i++) {
      var gx = x + Math.round(wrap(i * 29 - s, w + 12)) - 6;
      rect(ctx, gx, edgeY + 8 + (i * 5) % (tableY - edgeY - 10), 6, 1, P.walnutGrainLit);
    }
    rect(ctx, x, tableY, w, 1, H.walnutDeep);
    rect(ctx, x, tableY + 1, w, 1, P.walnutSheen);

    /* 5. two dish stacks with a gap, sliding past, and THE BOTTLE in the
       bay behind the middle one - it slides with them, the way it stands
       between two stacks in the level, and like the level's it goes off
       at the same place on the card every time it comes round */
    var period = big ? 46 : 38, span = tableY - lidY;
    for (i = 0; i < 3; i++) {
      var trip = wrap(s + i * period, period * 3);
      var ox = Math.round(x + w + 10 - trip);
      if (ox < x - 40 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.34);
      var gapY = Math.round(lidY + 4 + ((i * 19) % Math.max(1, span - gapH - 10)));
      dishlet(ctx, ox, lidY, gapY - lidY, false);
      dishlet(ctx, ox, gapY + gapH, tableY - gapY - gapH, true);
      if (i !== 1) continue;
      var bx = ox + 16, by = tableY - 12;
      var q = trip / (period * 3);
      var fire = clamp((q - 0.42) / 0.12, 0, 1), done = clamp((q - 0.62) / 0.10, 0, 1);
      var lean = q > 0.36 && q < 0.70 ? 1 : 0;
      /* the arc, a continuous ribbon of 2x2 sauce, then the puddle */
      var reach = period - 22, ah = h * 0.2;
      if (fire > 0 && done < 1) {
        for (k = 0; k <= 24; k++) {
          var u = k / 24;
          if (u > fire || u < done) continue;
          var ax = Math.round(bx + 4 + u * reach), ay = Math.round(by - 2 - 4 * ah * u * (1 - u) + 12 * u * u);
          rect(ctx, ax, ay, 2, 2, P.ketchup);
          if (k % 3 === 0) dot(ctx, ax, ay, P.ketchupHi);
        }
      }
      if (fire >= 1) rect(ctx, Math.round(bx + 2 + reach), tableY - 1, 5, 1, P.ketchup);
      /* the bottle: a clear top, the red, a pale keystone, the white cap */
      rect(ctx, bx - 1, by - 2, 7, 15, P.outline);
      rect(ctx, bx, by + 3, 5, 9, P.ketchup);
      rect(ctx, bx, by + 3, 1, 9, P.plasticHi);
      rect(ctx, bx + 4, by + 3, 1, 9, P.ketchupDeep);
      rect(ctx, bx + 1, by + 6, 3, 3, P.label);
      rect(ctx, bx + lean, by, 5 - lean, 3, P.plastic);
      rect(ctx, bx + 1 + lean, by - 1, 3, 1, P.cap);
      rect(ctx, bx + 1 + lean, by - 2, 3, 1, fire > 0 && done < 1 ? P.ketchup : P.cap);
    }

    /* 6. a fork tumbling down */
    var fkx = x + Math.round(w * 0.72);
    var fky = lidY + 6 + Math.round(wrap(s * 1.6, tableY - lidY - 12));
    if (Math.floor(t * 6) % 2) {
      rect(ctx, fkx - 3, fky, 7, 1, P.steel); dot(ctx, fkx + 3, fky, P.steelHi);
      dot(ctx, fkx + 3, fky - 1, P.steelHi);
    } else {
      for (i = 0; i < 5; i++) dot(ctx, fkx - 2 + i, fky - 2 + i, i < 2 ? P.steelHi : P.steel);
    }
    Tint.rect(ctx, fkx - 3, tableY + 1, 7, 1, P.shadeCool, 4);

    /* 7. THE LID, the house's ceiling band in miniature - the level's
       LivingRoom band since the owner called the bare kill line lazy, so
       the card says the same thing the bay does: plaster down to the
       crown, two crackle-glass pendants sliding with the lid at the
       planks' own pace with their pools of light spilling under the
       crown, then crown, crown shade and the outline on the kill line */
    rect(ctx, x, y, w, killY - 2 - y, H.plasterMid);
    var pp = Math.round(w * 0.55);
    for (k = -1; k < 3; k++) {
      var px0 = x + Math.round(wrap(w * 0.3 - s, pp)) + k * pp;
      if (px0 < x - 12 || px0 > x + w + 12) continue;
      Tint.rect(ctx, px0 - 9, y, 19, killY - 2 - y, H.plasterLit, 7);
      Tint.rect(ctx, px0 - 9, lidY, 19, 4, H.lampGlow, 3);
      Tint.rect(ctx, px0 - 5, lidY, 11, 3, H.lampGlow, 4);
      rect(ctx, px0, y, 1, 3, H.lampRod);
      rect(ctx, px0 - 1, y + 3, 3, 3, H.outline);
      rect(ctx, px0 - 1, y + 3, 3, 2, H.lampGlass);
      dot(ctx, px0, y + 4, H.lampCore);
    }
    rect(ctx, x, killY - 2, w, 1, H.crown);
    rect(ctx, x, killY - 1, w, 1, H.crownShade);
    rect(ctx, x, killY, w, 2, H.outline);

    /* 8. the doodad flying it, the Couch's block */
    var ddx = Math.round(x + w * 0.3);
    var ddy = Math.round(y + h * 0.45 + Math.sin(t * 3.1) * (h * 0.14));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, ddx - sz, ddy - sz, sz * 2, sz * 2, H.void, 5);
    rect(ctx, ddx - sz / 2 - 1, ddy - sz / 2 - 1, sz + 2, sz + 2, P.outline);
    rect(ctx, ddx - sz / 2, ddy - sz / 2, sz, sz, '#c9873c');
    rect(ctx, ddx - sz / 2, ddy - sz / 2, sz - 2, 1, '#eab873');
    dot(ctx, ddx + sz / 2 - 2, ddy - 1, P.outline);
    rect(ctx, ddx + sz / 2, ddy, 2, 1, '#f3cc84');

    /* 9. THE LIGHT, the bay's own: only the lens's two side columns */
    var vig = Math.max(4, Math.round(w * 0.09));
    Tint.rect(ctx, x, y, vig, h, P.shadeCool, 2);
    Tint.rect(ctx, x + w - vig, y, vig, h, P.shadeCool, 2);
  }

  /* ===================================================== GENERATION */

  /* Plates 4 in 10, bowls-and-a-mug 3, the mixed one 3. The maker also
     writes down where this bay's plank is, and how far it is from the
     last one, in the run's ledger - makeSpikes and makeBoon for the same
     bay are called straight after it, and the bottle has to know where
     the next stack will stand. */
  function makePillar(x, gapY, gapH, run) {
    var v = Math.random();
    var ob = { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
               variant: v < 0.4 ? 0 : (v < 0.7 ? 1 : 2), scored: false };
    if (run && run.ledger) {
      var L = run.ledger;
      if (L.plank) L.spacing = x - L.plank.x;
      L.plank = ob;
    }
    return ob;
  }

  /* A SQUEEZE BOTTLE, always standing on the table whatever side the
     engine rolled (it hands 'ceil' 42% of the time, and the tune gives
     both sides the same length range so a roll is a roll). `maxLen` is
     the jet's apex: 0.8..1.0 of it, so the tune's 40..60 is a 32..60px
     arc. `count` (3..6) is spent on how full the bottle is.

     x is the bottle's left edge AND the obstacle's; w reaches past where
     the jet lands, so every box the jet ever makes is inside x..x+w -
     collide() culls on those and save() clears on them.

     THE REACH IS 1.5 x THE APEX, and it is cut short if it would land in
     the next stack. The engine stands a bottle at mid +-14, and at
     spacingMin 184 a bottle at mid+14 with a 90px reach would put the
     tail of its arc and its puddle INSIDE the next tower's lower column.
     So: the next plank is the one the ledger just wrote down plus the
     spacing between the last two, and the arc lands at least 8px short
     of its platter. Never under 40.

     WHY IT SQUIRTS RIGHT, away from the doodad coming at it: squirting
     left would put the high middle of the arc 24..66px past the last
     stack's edge, where a doodad leaving the lowest gap has a fifth of a
     second to climb 56px, which one flap cannot do. Squirting right puts
     it 73..119px past, 0.42..0.68s at speedMax - two flaps, with time in
     hand - and the escape is always UP: the worst apex is 107px under the
     lid.

     AND WHAT IT DOES IN A REAL RUN, counted rather than assumed (sixteen
     seeded 40s runs at this tune, autopiloted, thirty spare lives):
     6.2 bottles a run, 7.8 squirts on screen, 0.69 of them live within
     40px of the doodad and 0.19 within 20px, for a pilot that flies each
     gap at the driver's 62% depth - and no deaths to a jet. A pilot that
     sinks to 70% of each gap meets 0.62 / 0.31 of them and dies to the
     jet three times in sixteen runs. It is a hazard that punishes flying
     LOW, from below, in a bay whose other hazard comes down from above. */
  function makeSpikes(x, side, count, maxLen, run) {
    var A = Math.round(rand(maxLen * 0.8, maxLen));
    var bx = Math.round(x);
    var R = Math.round(1.5 * A);
    var L = run && run.ledger;
    if (L && L.plank) {
      var next = L.plank.x + (L.spacing > 0 ? L.spacing : 184);
      var room = Math.floor(next - 4 - 8 - (bx + NOZ_X));
      if (R > room) R = Math.max(40, room);
    }
    var ob = { type: 'spike', side: 'floor', x: bx, w: Math.max(15, NOZ_X + R + 8),
               apex: A, reach: R, kc: 2 * A + 2 * Math.sqrt(A * A + A * JET_DROP),
               kind: chance(0.8) ? 0 : 1, fill: clamp(count - 3, 0, 3),
               seed: rand(0, PERIOD), lastP: 0,
               spikes: [] };                /* named by the contract; a bottle is not made of spikes */
    if (L) L.bottle = { x: bx, w: ob.w, plank: L.plank };
    return ob;
  }

  /* ONE MAKER FOR SILVERWARE, THE BROWNIE AND THE CRANE. The engine says
     spicy; the crane is rolled here so the sprite knows what it is. */
  /* `want`, Crow's ORDNANCE (js/scene_play.js): 'gold' makes the +5 on
     request and 'plain' makes anything but, and NEITHER touches the gold
     dice or the gap - a gift handed to a crow must not move this bay's own
     rhythm. Any other value is the ordinary roll, exactly as before. */
  function makeDrop(x, spicy, fall, run, want) {
    var gold = want === 'gold';
    if (!spicy && !gold && want !== 'plain') {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var ob = { type: 'drop', x: x, y: CEIL + 5, vy: fall, spicy: !!spicy, gold: gold, broken: 0,
               w: 24, kind: randInt(0, 2), spin: rand(0, TAU),
               /* a dropped fork turns once or twice on the way down: at 16
                  frames 5..9 rad/s is 13..23 silhouette changes a second,
                  a tumble and not a flicker */
               spinRate: rand(5, 9) * (chance(0.5) ? -1 : 1), flip: chance(0.5),
               landCry: 'clink', burst: [P.steelHi, P.steel], splat: SPLAT_TIME };
    if (spicy) { ob.w = 14; ob.landCry = 'pat'; ob.burst = [P.crustHi, P.crumb]; ob.splat = 1.6; }
    if (gold) {
      ob.w = 18; ob.name = GOLD_NAME; ob.t = 0; ob.dir = chance(0.5) ? 1 : -1;
      ob.landCry = ''; ob.burst = [P.craneHi, P.craneGold]; ob.splat = 1.2;
    }
    return ob;
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 18, kind: randInt(0, 3), seed: randInt(1, 100000) };
  }

  /* THE YOGURT VOLCANO, standing on the walnut. If this bay has a bottle
     and the volcano would stand in its arc or against its side, it moves
     to the bottle's LEFT - the jet goes right, and a gift under a live
     jet is a gift that kills whoever dives for it. 16px left of a bottle
     at mid-14 still clears the last stack's platter by 12. */
  function makeBoon(x, run) {
    var L = run && run.ledger;
    if (L && L.bottle && L.bottle.plank === L.plank) {
      var b = L.bottle;
      if (x + 13 > b.x - 2 && x - 13 < b.x + b.w) x = b.x - 16;
    }
    return { type: 'boon', x: x, y: FLOOR - 8, w: 24, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0, name: BOON_NAME,
             burst: [P.yogurt, P.honeyHi, P.lifePale, P.lifeJade] };
  }

  /* --------------------------------------------------------- physics

     stepDrop owns every drop; the engine's default never runs here.
       - THE CRANE flutters down like a leaf: vy 38..86 about 62 on a
         1.37s beat, swaying 14px either way on the same beat, the way a
         folded paper bird falls - 213px takes about 3.4s, so it crosses
         the doodad's column at y 90..170 and is caught with one
         deliberate move, or is gone off the left before it lands.
       - THE BROWNIE is cake, not steel: g 170, 1.45..1.55s down.
       - SILVERWARE falls at DROP_GRAV and tumbles. */
  function stepDrop(ob, dt, obstacles, run) {
    if (ob.gold) {
      ob.t = (ob.t || 0) + dt;
      ob.vy = 62 + 24 * Math.sin(ob.t * 4.6);
      ob.y += ob.vy * dt;
      ob.x += (ob.dir || 1) * 64 * Math.cos(ob.t * 4.6) * dt;
    } else if (ob.spicy || ob.sour || ob.whirl) {
      ob.vy += 170 * dt;
      ob.y += ob.vy * dt;
    } else {
      ob.vy += DROP_GRAV * dt;
      ob.y += ob.vy * dt;
      ob.spin += ob.spinRate * dt;
    }
    return ob.y >= FLOOR - 4;
  }

  /* The room's own step: the squirt's cry, once, on the frame a bottle
     on (or just off) the screen goes off. One ledger slot, so two
     bottles on one frame make one noise. ob.lastP lives on the bottle,
     which is per-run by nature. */
  function stepWorld(dt, obstacles, run) {
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'spike') continue;
      var p = bottlePhase(ob), seen = ob.x > -40 && ob.x < VW + 20;
      /* THE FLIP-TOP CLICKING OPEN, the telegraph's sound - but only for a
         bottle whose jet can still reach the doodad (its far end is not yet
         behind him). One clicking every lap from the left edge of the
         screen, where it is already harmless, is a noise that means
         nothing, and a sound that means nothing teaches the player to stop
         listening to the one that does. Then the squirt itself. */
      if (ob.lastP < P_OPEN && p >= P_OPEN && p < P_FIRE && seen &&
          ob.x + ob.w > (run.px || 0) - 12) run.ledger.cry = 'tock';
      if (ob.lastP < P_FIRE && p >= P_FIRE && p < P_FULL && seen) run.ledger.cry = 'squirt';
      /* THE PUDDLE. The jet lands on the walnut, and the walnut is the
         floor band, which is painted AFTER every spike - so a puddle the
         bottle drew itself would be buried. It is born instead as a piece
         of litter where the head comes down, drawn on the table with the
         crumbs and the napkins, never boxed, and left there: the table
         collects the bottles' shots as the room goes by. */
      if (ob.lastP < P_FULL && p >= P_FULL && p < P_CUT && ob.x < VW + 200 && run.born) {
        run.born.push({ type: 'litter', x: Math.round(ob.x + NOZ_X + ob.reach) - 8, w: 16,
                        kind: 4, sauce: ob.kind, seed: randInt(1, 100000) });
      }
      ob.lastP = p;
    }
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one. */
  function rectsFor(ob, out) {
    var i;
    if (ob.type === 'pillar') {
      /* the Coop's four boxes verbatim: a side plate or a mug handle
         gives back a few pixels inside the 34 the box keeps, and a graze
         on a mug is forgiven, not punished */
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, 34, topH]);
      out.push([ob.x - 4, ob.gapY - 9, 42, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, 42, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, 34, botH]);
    } else if (ob.type === 'spike') {
      /* the bottle itself is solid in every frame, box by its own rows */
      var p = bottlePhase(ob), f = bottleFrame(p), sx = bottleShake(p), bb = T.bottleBox[f];
      var bx = Math.round(ob.x) + sx;
      for (i = 0; i < bb.length; i++) out.push([bx + bb[i][0], BOT_TOP + bb[i][1], bb[i][2], bb[i][3]]);
      /* THE JET, only inside 0.64..0.80 and only on the DRAWN ribbon: a
         3x3 box on every second pixel the ribbon was painted on, from
         three hundredths behind the head to three ahead of the tail. The
         ribbon is drawn a pixel fatter all round than it kills (the
         Coop's egg pixel of mercy), and the head blob and the drips are
         drawn and never boxed. */
      if (p >= P_LIVE0 && p <= P_LIVE1) {
        var ht = jetHeadTail(p);
        var n = jetSamples(ob, ht[1], ht[0]);
        for (i = 0; i < n; i += 2) {
          var u = JS[i * 3 + 2];
          if (u < ht[1] + 0.03 || u > ht[0] - 0.03) continue;
          out.push([JS[i * 3] - 1, JS[i * 3 + 1] - 1, 3, 3]);
        }
      }
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      var kind = kindOf(ob);
      if (kind === 'crane') out.push([ob.x - 9, ob.y - 6, 18, 12]);
      else if (kind === 'brownie') out.push([ob.x - 6, ob.y - 5, 12, 10]);
      else {
        /* FIVE SMALL SQUARES ALONG THE PIECE at the frame's own angle,
           never the frame's bounding box - a diagonal fork's AABB would
           kill in its empty corners. The frame is quantised exactly as
           it is drawn, so the boxes ARE the picture. */
        var th = cutFrame(ob) * TAU / 16, c = Math.cos(th), s = Math.sin(th);
        var half = CUT_L[ob.kind] / 2 - 2;
        for (i = -2; i <= 2; i++) {
          out.push([ob.x + c * half * i / 2 - 1.5, ob.y + s * half * i / 2 - 1.5, 3, 3]);
        }
      }
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 12, FLOOR - 15 + ob.dy, 24, 15]);
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
    /* for the headless checks: the clock and the jet, read-only */
    bottlePhase: bottlePhase, jetSamples: jetSamples, jetHeadTail: jetHeadTail
  };
})();
