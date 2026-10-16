/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM / THE TABLE  (3-1)

   Afternoon. You are flying ALONG THE WALNUT DINING TABLE at plate
   height, between towers of white dishes, with the kitchen beyond it:
   the steel French-door fridge with the photographs all over its left
   door, three glass-front uppers with the good plates behind them, the
   range hood's curved glass canopy over the island, two plantation
   shutters lit from outside, and the doorway with the coats in it.
   Drawn from Table ref 1, 2 and 3 in Assets/Concept - ref 2 is the
   shot (the table running away from the camera toward the island),
   ref 1 adds the pendants, the photo wall and the doorway, and ref 3
   adds the table's leaf seams, its white apron, the island stools and
   a squeeze bottle of sauce standing on the island, which is where the
   hazard came from.

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
   shaker doors, a white island, white chairs, white shutters. Painted
   at its own value the room would hand every column a background it
   could not separate from, which is the fault the Couch spent four
   passes getting out of. So the far wall and the island are taken down
   into a warm grey (see bakeKitchen's STEP BACK and bakeIsland's), the
   gloom under the island's overhang is darker still, and nothing behind
   the lane comes out over 210 - not even the slits of daylight in the
   shutters. The dishes are the whitest thing on the screen by design,
   and they are cool where the kitchen is warm: a stack stands 57 values
   clear of the lane behind it (the Couch's rule is 55).

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
  var bakeShade = DiningRoom.bakeShade, ease = DiningRoom.ease, rgba = DiningRoom.rgba;

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

    /* the kitchen beyond: the house's cabinets, and these */
    chairPaint:     '#c9c1ae',   /* a white chair two steps back: a warm grey, lum 194 */
    cabinetLine:    '#b7ae9a',   /* the hairline between two doors       */
    glassDark:      '#6e6a63',   /* inside a glass-front cabinet         */
    quartz:         '#ebe8e0',   quartzVein: '#cfcbc2',
    hoodGlass:      '#dde2df',   hoodGlassEdge: '#b4bcb9',
    tileA:          '#c3c0b7',   tileB: '#d2cfc6',   tileC: '#aeaba2',
    doorDark:       '#3a3531',   coat: '#2b2826',    coatLit: '#4a4440',
    photoA:         '#6b7f8c',   photoB: '#8c7b6b',  photoC: '#9aa37c',  photoD: '#c9c1b3',
    photoDark:      '#4a4440',   /* the people in the photographs        */
    note:           '#e6d55c',   pinkPaper: '#d98fb5', purple: '#7a4e9a',
    enamelRed:      '#b3382c',   enamelHi: '#d4594a',  enamelDeep: '#7d2219',
    lemon:          '#e8d54a',   canBlue: '#5f8fc4',
    linen:          '#d9cdb4',   linenLit: '#e8dfca', linenShade: '#b8ab90',
    shadeCool:      '#4e4640',   /* the gloom under the island's overhang, and every contact shadow */
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

  /* ------------------------------------------------------- geometry

     The bay by screen row, Table ref 2's proportions:

        0..23    the dining-room ceiling (the house's, and it kills)
        24..149  THE KITCHEN WALL, parallax 0.22: pantry, fridge, the
                 uppers, the hood, the shutters, the counter and all
                 the clutter on it, the doorway, the photo wall
        150..241 THE ISLAND, parallax 0.55: its quartz edge, its white
                 panels, the X-back chairs and the black stools
        241      the dark row over the table's lit rim: the kill edge
        242..269 THE TABLE: walnut, a leaf seam, a linen placemat, the
                 rounded front edge and the white apron under it

     One dinner plate is 32px across, a 27cm plate at about 1.2px per
     cm, and everything standing on the table is drawn at that scale. */
  var LID_W = 240;
  var KIT_W = 720, KIT_H = 126, KIT_PAR = 0.22;
  var ISL_Y = 150, ISL_W = 480, ISL_H = 92, ISL_PAR = 0.55;
  var TAB_W = 384, TAB_H = VH - FLOOR;

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

  /* ========================================================= THE LID

     The dining-room ceiling directly over the table, Table ref 1's top
     edge: plaster, two amber crackle-glass pendants, a recessed can and
     the register. SAME PIGMENTS AND SAME FOUR HARD ROWS as the Living
     Room's band, because it is the same ceiling one wall over and a kill
     edge that changed colour between rooms would be a rule the player
     has to learn twice. It is its own tile rather than a call to
     bakeCeiling only because two pendants hang over a dining table where
     the Living Room hangs one per 240. Nothing solid comes below row 17;
     the light that does is the pool drawCeiling lays under each lamp. */
  var LAMPS = [60, 180];
  var SHADE = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [1, 5], [2, 3]];
  var SHADE_Y = 10;                 /* so the last row of glass lands on 17 */

  function bakeLid() {
    var t = makeCanvas(LID_W, CEIL), c = t.ctx;
    var r = mulberry32(3101), x, y, i, k;

    /* the plaster, with the house's 1-in-40 tooth */
    rect(c, 0, 0, LID_W, 19, H.plasterMid);
    for (y = 0; y < 19; y++) {
      for (x = 0; x < LID_W; x++) {
        if (r() > 0.025) continue;
        dot(c, x, y, r() < 0.5 ? H.plasterDim : H.plasterLit);
      }
    }
    /* lifted over each lamp in two flat steps, darker between them and
       at the tile's ends (which are the midpoints once it is laid end to
       end) - the room's own grammar, at this bay's spacing */
    for (k = 0; k < LAMPS.length; k++) {
      Tint.rect(c, LAMPS[k] - 30, 0, 60, 19, H.plasterLit, 3);
      Tint.rect(c, LAMPS[k] - 15, 0, 30, 19, H.plasterLit, 3);
    }
    Tint.rect(c, 106, 0, 28, 19, H.plasterDim, 5);
    Tint.rect(c, 0, 0, 14, 19, H.plasterDim, 5);
    Tint.rect(c, LID_W - 14, 0, 14, 19, H.plasterDim, 5);

    /* the register, the house's 12x6 with three slots */
    rect(c, 8, 6, 12, 6, H.vent);
    rect(c, 9, 7, 10, 1, H.ventSlot); rect(c, 9, 9, 10, 1, H.ventSlot); rect(c, 9, 11, 10, 1, H.ventSlot);

    /* the recessed can between the two pendants, Table ref 1: a ring
       seen at a glancing angle with the bulb's white in it. No pool: a
       can in daylight throws nothing you can see. */
    rect(c, 117, 4, 7, 2, H.vent);
    rect(c, 118, 5, 5, 1, H.lampCore);

    /* the two pendants: canopy and rod first, so the shade's outline
       cuts the stem where they meet; ring on the sides and top only, so
       nothing lands on row 18 */
    for (k = 0; k < LAMPS.length; k++) {
      var LX = LAMPS[k], SX = LX - 3;
      rect(c, LX - 2, 1, 5, 2, H.lampRod);
      rect(c, LX, 3, 1, 7, H.lampRod);
      c.fillStyle = H.outline;
      c.fillRect(SX + SHADE[0][0], SHADE_Y - 1, SHADE[0][1], 1);
      for (i = 0; i < SHADE.length; i++) {
        c.fillRect(SX + SHADE[i][0] - 1, SHADE_Y + i, 1, 1);
        c.fillRect(SX + SHADE[i][0] + SHADE[i][1], SHADE_Y + i, 1, 1);
      }
      rowsFill(c, SHADE, SX, SHADE_Y, H.lampGlass);
      for (i = 0; i < 4; i++) {
        var ri = 1 + Math.floor(r() * (SHADE.length - 2));
        dot(c, SX + SHADE[ri][0] + Math.floor(r() * SHADE[ri][1]), SHADE_Y + ri, H.lampCrackle);
      }
      rect(c, LX - 1, SHADE_Y + 2, 2, 3, H.lampCore);
      var last = SHADE[SHADE.length - 1];
      rect(c, SX + last[0], SHADE_Y + SHADE.length - 1, last[1], 1, H.lampDark);
    }

    /* the moulding: the house's four hard rows and the outline on the
       kill line, verbatim */
    rect(c, 0, 19, LID_W, 1, H.crown);
    rect(c, 0, 20, LID_W, 1, H.plasterLit);
    rect(c, 0, 21, LID_W, 1, H.crownShade);
    rect(c, 0, 22, LID_W, 2, H.outline);
    return t;
  }

  /* The pool under one pendant: the Living Room's half-ellipse, at 0.12
     where the room's is 0.22 - the lamps are on, and it is the middle
     of the afternoon. */
  var POOL_W = 96, POOL_H = 36, POOL_A = 0.12;

  function bakePool() {
    var t = makeCanvas(POOL_W, POOL_H), c = t.ctx;
    for (var y = 0; y < POOL_H; y++) {
      for (var x = 0; x < POOL_W; x++) {
        var dx = (x + 0.5 - POOL_W / 2) / (POOL_W / 2), dy = (y + 0.5) / POOL_H;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1) continue;
        c.fillStyle = rgba(H.lampGlow, POOL_A * (1 - ease(d)));
        c.fillRect(x, y, 1, 1);
      }
    }
    return t;
  }

  /* ===================================================== THE KITCHEN

     Layer A: the far wall, 720x126 at parallax 0.22, drawn at CEIL.
     720 so the fridge and the hood come round only every 3270px of
     world - twenty to thirty seconds. Laid out left to right in Table
     ref 2's order (ref 1 for the glass doors, the doorway and the photo
     wall). Tile rows are LOCAL here: screen = local + 24.

        0..59     two tall pantry doors, upper and lower
        60..123   the over-fridge cabinet and THE FRIDGE
        124..133  wall
        134..177  window B, the small shutter, the monstera in front
        178..309  three GLASS-FRONT uppers, dishes inside; under them
                  the espresso machine and the pressure cooker
        310..401  window A, the big double shutter; THE HOOD hangs in
                  front of its left edge with the ZZ plant under it,
                  then the red Dutch oven and the folding dish rack
        402..489  two shaker uppers
        490..559  wall over the end of the counter
        560..603  the doorway, the coats, the shoe pile
        604..719  the photo wall and the white console under it

     (The plan put the hood at 266..323 between the uppers; ref 2 hangs
     it in front of the window's left edge over the ZZ plant, and that
     order - glass doors, hood and plant, window with the Dutch oven and
     the dish rack - is what makes the frame read as this kitchen.) */

  /* a white shaker door: a 3px frame, a recessed panel with its shade
     along the top and left inner edge, and the hairline where it meets
     the next door */
  function shaker(c, x, y, w, h) {
    rect(c, x, y, w, h, H.cabinetLit);
    rect(c, x + 3, y + 3, w - 6, h - 6, H.cabinet);
    rect(c, x + 3, y + 3, w - 6, 1, H.cabinetShade);
    rect(c, x + 3, y + 3, 1, h - 6, H.cabinetShade);
    rect(c, x + w - 1, y, 1, h, P.cabinetLine);
    rect(c, x, y + h - 1, w, 1, P.cabinetLine);
  }
  /* bar pulls, brushed steel: the lit face and its shadow */
  function pullV(c, x, y, len) {
    rect(c, x, y, 1, len, H.steelLit); rect(c, x + 1, y, 1, len, H.steelShade);
  }
  function pullH(c, x, y, len) {
    rect(c, x, y, len, 1, H.steelLit); rect(c, x, y + 1, len, 1, H.steelShade);
  }

  /* a little stack of plates the size they are at the far wall */
  function farStack(c, x, y, w, n) {
    for (var i = 0; i < n; i++) {
      rect(c, x, y - 2 * i - 2, w, 1, P.porcelain);
      rect(c, x, y - 2 * i - 1, w, 1, P.rimShade);
    }
  }

  /* A GLASS-FRONT UPPER, Table ref 1 and 2: the good dishes behind
     glass, which are the pillars' own kind - the one place in the
     backdrop a plate is allowed, and it is small, behind a pane and two
     values down. Two shelves, things on all three levels, one vertical
     glare down the glass (never diagonal: a diagonal stripe on a pane
     reads as a crack at this size). */
  function glassDoor(c, x, y, w, h, seed) {
    rect(c, x, y, w, h, H.cabinetLit);
    rect(c, x + 3, y + 3, w - 6, h - 6, P.glassDark);
    var r = mulberry32(seed), i, k;
    var floors = [y + 26, y + 50, y + h - 4];
    for (i = 0; i < floors.length; i++) {
      var fy = floors[i];
      if (i < 2) {
        rect(c, x + 3, fy, w - 6, 1, H.cabinetLit);
        rect(c, x + 3, fy + 1, w - 6, 1, H.cabinetShade);
      }
      /* what is on this shelf: a stack of plates, a stack of bowls, a
         glass - shuffled per door */
      var at = x + 5;
      for (k = 0; k < 3 && at < x + w - 9; k++) {
        var kind = Math.floor(r() * 3);
        if (kind === 0) { farStack(c, at, fy, 9, 2 + Math.floor(r() * 2)); at += 11; }
        else if (kind === 1) {
          rect(c, at, fy - 4, 7, 1, P.porcelain); rect(c, at + 1, fy - 3, 5, 2, P.porcelain);
          rect(c, at + 1, fy - 1, 5, 1, P.rimShade); at += 9;
        } else {
          rect(c, at, fy - 5, 1, 5, H.steelLit); rect(c, at + 3, fy - 5, 1, 5, H.steelLit);
          rect(c, at, fy - 1, 4, 1, H.steelLit); at += 6;
        }
      }
    }
    /* the glare, broken at each shelf */
    rect(c, x + 6, y + 5, 1, 20, H.cabinetLit);
    rect(c, x + 6, y + 29, 1, 19, H.cabinetLit);
    rect(c, x + 6, y + 53, 1, h - 59, H.cabinetLit);
    rect(c, x + w - 1, y, 1, h, P.cabinetLine);
    rect(c, x, y + h - 1, w, 1, P.cabinetLine);
  }

  /* ONE PLANTATION SHUTTER PANEL, the recipe both windows share: stiles
     5 wide, a top rail of 6, louvres on a 6px pitch with ONE row of
     daylight per louvre - lit nose, face, face, shade, the slit of sky,
     the dark under it - and the tilt rod down the middle with a staple
     into every slat. That rod is what makes it a plantation shutter and
     not a venetian blind, the Couch's lesson. The daylight row is the
     brightest pixel behind the lane, and it is one row in six. */
  function shutterPanel(c, x, y, w, h) {
    var ly, fx = x + 5, fw = w - 10;
    rect(c, x, y, w, h, H.cabinetLit);
    rect(c, x + 4, y + 6, 1, h - 12, H.cabinetShade);
    rect(c, x + w - 5, y + 6, 1, h - 12, H.cabinetShade);
    rect(c, x + 5, y + 5, fw, 1, H.cabinetShade);
    for (ly = y + 6; ly + 6 <= y + h - 6; ly += 6) {
      rect(c, fx, ly, fw, 1, H.cabinetLit);
      rect(c, fx, ly + 1, fw, 2, H.cabinet);
      rect(c, fx, ly + 3, fw, 1, H.cabinetShade);
      rect(c, fx, ly + 4, fw, 1, H.daylight);
      rect(c, fx, ly + 5, fw, 1, H.cabinetDeep);
    }
    rect(c, fx, ly, fw, 1, H.cabinetShade);
    var rx = x + Math.floor(w / 2) - 1;
    rect(c, rx, y + 6, 3, ly - y - 6, H.cabinet);
    rect(c, rx, y + 6, 1, ly - y - 6, H.cabinetLit);
    rect(c, rx + 2, y + 6, 1, ly - y - 6, H.cabinetShade);
    for (var s = y + 6; s + 6 <= ly; s += 6) rect(c, rx, s + 2, 3, 1, H.cabinetDeep);
    rect(c, x, y, 1, h, H.cabinetDeep);
    rect(c, x + w - 1, y, 1, h, H.cabinetDeep);
  }

  /* a window: the casing, the panels, the sill */
  function shutterWindow(c, x, y, w, h, panels) {
    rect(c, x - 2, y - 2, w + 4, h + 2, H.cabinetLit);
    rect(c, x - 2, y - 2, w + 4, 1, H.cabinetShade);
    var pw = Math.floor(w / panels);
    for (var i = 0; i < panels; i++) shutterPanel(c, x + i * pw, y, pw, h);
    rect(c, x - 3, y + h, w + 6, 1, H.cabinetLit);
    rect(c, x - 3, y + h + 1, w + 6, 1, H.cabinet);
    rect(c, x - 3, y + h + 2, w + 6, 1, H.cabinetShade);
    rect(c, x - 3, y + h + 3, w + 6, 1, H.cabinetDeep);
  }

  /* THE RANGE HOOD, Table ref 1 and 2: a brushed-steel chimney up into
     the ceiling, and a curved glass canopy seen nearly edge-on, which at
     this distance is a shallow pale arc with a darker lip, over a steel
     body with the lamp in it. Centred on cx. */
  function rangeHood(c, cx) {
    rect(c, cx - 6, 0, 12, 30, H.steel);
    rect(c, cx - 6, 0, 2, 30, H.steelLit);
    rect(c, cx + 4, 0, 2, 30, H.steelShade);
    rect(c, cx - 6, 12, 12, 1, H.steelDeep);
    /* the grille near the top of the chimney, ref 1 */
    for (var i = 0; i < 3; i++) rect(c, cx - 3, 3 + i * 2, 6, 1, H.steelDeep);
    /* the steel body under the glass */
    rect(c, cx - 12, 32, 24, 9, H.steel);
    rect(c, cx - 12, 32, 24, 1, H.steelLit);
    rect(c, cx - 12, 39, 24, 2, H.steelShade);
    rect(c, cx - 1, 40, 3, 1, H.lampCore);
    /* the glass canopy: three rows of arc and its edge */
    rect(c, cx - 28, 30, 56, 1, P.hoodGlass);
    rect(c, cx - 34, 31, 68, 1, P.hoodGlass);
    rect(c, cx - 36, 32, 72, 1, P.hoodGlass);
    rect(c, cx - 36, 33, 72, 1, P.hoodGlassEdge);
    dot(c, cx - 36, 32, H.cabinetLit); dot(c, cx + 35, 32, H.cabinetLit);
    rect(c, cx - 20, 30, 10, 1, H.cabinetLit);
  }

  /* THE FRIDGE, Table ref 2 and 3, and the close crop of it: a steel
     French-door fridge with a freezer drawer, the long handles either
     side of the seam, and the left door covered in photographs - the
     single thing in this kitchen nobody else's kitchen has. */
  function fridge(c) {
    var X = 60, Y = 8, W = 64, Hh = 118, i, gx, gy;
    rect(c, X, Y, W, Hh, H.steel);
    /* brushed: sparse vertical streaks, seeded */
    var r = mulberry32(3209);
    for (i = 0; i < 40; i++) {
      var sx = X + 2 + Math.floor(r() * (W - 4)), sy = Y + 2 + Math.floor(r() * (Hh - 8));
      rect(c, sx, sy, 1, 3 + Math.floor(r() * 8), r() < 0.5 ? H.steelLit : H.steelShade);
    }
    rect(c, X, Y, 1, Hh, H.steelLit);
    rect(c, X, Y, W, 1, H.steelLit);
    rect(c, X + W - 1, Y, 1, Hh, H.steelShade);
    /* the doors' seam and the freezer drawer */
    rect(c, X + 32, Y, 1, 78, H.steelDeep);
    rect(c, X, Y + 78, W, 1, H.steelDeep);
    rect(c, X, Y + 79, W, 1, H.steelLit);
    pullH(c, X + 12, Y + 81, 40);
    rect(c, X + 12, Y + 83, 40, 1, H.steelDeep);
    /* the two long handles either side of the seam */
    rect(c, X + 27, Y + 30, 2, 26, H.steelLit); rect(c, X + 29, Y + 30, 1, 26, H.steelDeep);
    rect(c, X + 36, Y + 30, 2, 26, H.steelLit); rect(c, X + 38, Y + 30, 1, 26, H.steelDeep);
    rect(c, X, Y + Hh - 1, W, 1, H.steelDeep);

    /* THE COLLAGE on the left door: photographs on a loose grid, each
       with its white border showing as one bright top edge, a darker
       figure in most of them, a yellow note, and the pink-and-purple
       paper low on the door (ref 3, and the crop) */
    var cols = [P.photoA, P.photoB, P.photoC, P.photoD];
    var n = 0;
    for (gy = 0; gy < 9; gy++) {
      for (gx = 0; gx < 4; gx++) {
        var h = hash(gx * 31 + gy * 977 + 3);
        if ((h & 7) === 0) continue;               /* a gap in the collage */
        if (gy > 6 && gx > 1) continue;            /* it thins out low on the door */
        var px = X + 4 + gx * 6 + ((h >>> 4) % 3) - 1;
        var py = Y + 6 + gy * 6 + ((h >>> 7) % 3) - 1;
        var pw = (h >>> 10) & 1 ? 5 : 4, ph = (h >>> 11) & 1 ? 5 : 4;
        rect(c, px, py, pw, ph, cols[n % 4]);
        rect(c, px, py, pw, 1, H.cabinetLit);
        if ((h >>> 13) % 3) dot(c, px + 1 + ((h >>> 15) & 1), py + 2, P.photoDark);
        n++;
      }
    }
    rect(c, X + 20, Y + 38, 4, 5, P.note);
    rect(c, X + 20, Y + 38, 4, 1, H.daylight);
    /* the pink-and-purple paper, two triangles on it */
    rect(c, X + 10, Y + 58, 7, 8, P.pinkPaper);
    rect(c, X + 10, Y + 58, 7, 1, H.cabinetLit);
    rect(c, X + 11, Y + 60, 2, 1, P.purple); dot(c, X + 11, Y + 61, P.purple);
    rect(c, X + 14, Y + 62, 2, 1, P.purple); dot(c, X + 15, Y + 63, P.purple);
    /* the right door: a white sheet, a black magnet, a note, a row of
       coloured magnet dots */
    rect(c, X + 40, Y + 12, 7, 9, H.cabinetLit);
    dot(c, X + 43, Y + 15, H.steelShade);
    rect(c, X + 50, Y + 32, 3, 3, H.iron);
    rect(c, X + 44, Y + 48, 3, 2, P.note);
    dot(c, X + 40, Y + 63, P.enamelRed); dot(c, X + 45, Y + 64, P.canBlue);
    dot(c, X + 50, Y + 62, P.note); dot(c, X + 54, Y + 65, P.photoC);
  }

  /* THE COUNTER RUN, x 124..559 under the uppers: the grey glass mosaic
     in running bond (ref 2, ref 3), the quartz top, and the lower doors
     in the counter's own shade (mostly hidden by the island) */
  function counterRun(c) {
    var X0 = 124, X1 = 560, x, y, k = 0;
    for (y = 84; y < 112; y += 3) {
      var off = ((y - 84) / 3) % 2 ? 3 : 0;
      rect(c, X0, y, X1 - X0, 3, H.tileShade);
      for (x = X0 - 6 + off; x < X1; x += 6) {
        var h = hash(x * 13 + y * 7919 + 11);
        var col = (h % 3) === 0 ? P.tileA : ((h % 3) === 1 ? P.tileB : P.tileC);
        var bx = Math.max(X0, x), bw = Math.min(X1, x + 5) - bx;
        if (bw > 0) rect(c, bx, y, bw, 2, col);
        if ((h >>> 5) % 9 === 0 && bw > 1) dot(c, bx, y, H.cabinetLit);   /* glass catching the window */
        k++;
      }
    }
    rect(c, X0, 112, X1 - X0, 1, H.cabinetLit);
    rect(c, X0, 113, X1 - X0, 3, P.quartz);
    for (x = X0 + 4; x < X1 - 8; x += 18) {
      var hv = hash(x * 31 + 7);
      rect(c, x + (hv % 7), 113 + (hv >>> 3) % 3, 3 + (hv >>> 6) % 5, 1, P.quartzVein);
    }
    rect(c, X0, 116, X1 - X0, 1, H.cabinetShade);
    rect(c, X0, 117, X1 - X0, 1, H.outline);
    rect(c, X0, 118, X1 - X0, 8, H.cabinetShade);
    for (x = X0 + 44; x < X1; x += 44) rect(c, x, 118, 1, 8, H.cabinetDeep);
  }

  /* a leaf: a 7x4 oval with two notches cut from its lower edge - the
     monstera's splits - and a lit tick on it */
  function bigLeaf(c, x, y, flip) {
    rowsFill(c, [[2, 5], [1, 7], [0, 9], [0, 9], [1, 7], [3, 3]], x, y, H.leaf);
    /* the splits, cut in from the lower edge, and the midrib */
    dot(c, x + 2, y + 4, H.leafDeep); dot(c, x + 6, y + 4, H.leafDeep);
    dot(c, x + 1, y + 3, H.leafDeep); dot(c, x + 7, y + 3, H.leafDeep);
    rect(c, x + 2, y + 2, 5, 1, H.leafDeep);
    rect(c, x + (flip ? 5 : 2), y + 1, 2, 1, H.leafLit);
  }

  /* EVERYTHING ON THE COUNTER, in ref 2's order and ref 2's colours.
     The counter top is local row 112, so everything stands on 111. */
  function clutter(c) {
    var i, k;
    /* a glass of water on the left, daylight inside it */
    rect(c, 136, 104, 1, 8, H.steelLit); rect(c, 141, 104, 1, 8, H.steelLit);
    rect(c, 136, 111, 6, 1, H.steelLit); rect(c, 137, 107, 4, 4, H.daylight);
    Tint.rect(c, 137, 107, 4, 4, H.steel, 6);

    /* THE MONSTERA (ref 2, left, in front of the small window): a black
       pot, stems leaning out every way, and big split leaves - ref 2 has
       it bushy, and a plant with five leaves on sticks reads as dead */
    rect(c, 148, 103, 12, 9, H.iron); rect(c, 148, 103, 12, 1, H.ironLit);
    var stems = [[151, 136, 64], [152, 142, 52], [153, 146, 76], [154, 156, 46], [155, 164, 58],
                 [156, 170, 72], [157, 176, 84], [153, 138, 88]];
    for (i = 0; i < stems.length; i++) line(c, stems[i][0], 102, stems[i][1], stems[i][2], H.leafDeep);
    var leaves = [[131, 61, 0], [137, 49, 0], [141, 73, 0], [151, 43, 1], [160, 55, 1], [166, 69, 1],
                  [172, 81, 1], [133, 85, 0], [146, 92, 0], [162, 95, 1], [156, 30, 0]];
    for (i = 0; i < leaves.length; i++) bigLeaf(c, leaves[i][0], leaves[i][1], !!leaves[i][2]);
    line(c, 155, 102, 157, 34, H.leafDeep);

    /* the ESPRESSO MACHINE, chrome (ref 2 left of centre) */
    var ex = 190;
    rect(c, ex, 94, 22, 18, H.steelLit);
    rect(c, ex + 19, 94, 3, 18, H.steelShade);
    rect(c, ex, 111, 22, 1, H.steelShade);
    rect(c, ex, 94, 22, 1, H.cabinetLit);
    rect(c, ex + 7, 100, 8, 4, H.iron);
    rect(c, ex - 3, 103, 7, 2, H.iron);
    rect(c, ex + 2, 110, 18, 1, H.steelShade);
    rect(c, ex + 15, 97, 2, 2, H.iron);
    rect(c, ex + 9, 106, 4, 4, H.cabinetLit);          /* a cup under the group head */

    /* the PRESSURE COOKER, black with a steel rim */
    var px = 218;
    rect(c, px, 98, 16, 14, H.iron);
    rect(c, px + 1, 98, 14, 1, H.steelLit);
    rect(c, px + 5, 96, 6, 2, H.iron);
    rect(c, px + 6, 103, 4, 3, H.steelShade);
    rect(c, px - 2, 101, 2, 2, H.iron); rect(c, px + 16, 101, 2, 2, H.iron);

    /* a canister and a mug by the cooker, so the run under the glass
       doors is as busy as the photograph */
    rect(c, 240, 102, 6, 10, H.cabinetLit); rect(c, 240, 102, 6, 1, H.steelLit);
    rect(c, 249, 106, 5, 6, P.canBlue); rect(c, 254, 107, 2, 3, P.canBlue);

    /* THE ZZ PLANT in its black pot on the wooden stand, under the hood
       (ref 2 centre), with the two lemons at its foot */
    var zx = 320;
    rect(c, zx - 8, 100, 2, 12, H.walnutLit); rect(c, zx + 7, 100, 2, 12, H.walnutLit);
    rect(c, zx - 8, 104, 17, 1, H.walnutLit);
    rect(c, zx - 7, 92, 15, 12, H.iron);
    rect(c, zx - 7, 92, 15, 1, H.steelLit);
    for (i = 0; i < 7; i++) {
      var tx = zx - 12 + i * 4, ty = 40 + ((i * 5) % 17);
      line(c, zx - 3 + i, 91, tx, ty, H.leafDeep);
      /* leaves every 5px along the stem, alternating sides */
      for (k = 0; k < 9; k++) {
        var f = (k + 1) / 10;
        var lx = Math.round(zx - 3 + i + (tx - (zx - 3 + i)) * f), ly = Math.round(91 + (ty - 91) * f);
        if (ly > 88) continue;
        var side = (k + i) % 2 ? 1 : -3;
        rect(c, lx + side, ly, 3, 2, H.leaf);
        if (side > 0) dot(c, lx + side + 1, ly, H.leafLit);
      }
    }
    rect(c, zx - 13, 109, 3, 3, P.lemon); rect(c, zx + 11, 109, 3, 3, P.lemon);
    dot(c, zx - 13, 109, H.daylight);

    /* the RED DUTCH OVEN (ref 2, by the window) */
    var dx = 344;
    rect(c, dx, 102, 20, 10, P.enamelRed);
    rect(c, dx, 102, 20, 1, P.enamelHi);
    rect(c, dx - 1, 103, 22, 1, P.enamelHi);
    rect(c, dx, 104, 1, 7, P.enamelHi);
    rect(c, dx + 17, 104, 3, 8, P.enamelDeep);
    rect(c, dx + 8, 100, 4, 2, H.iron);
    rect(c, dx - 3, 105, 3, 2, P.enamelRed); rect(c, dx + 20, 105, 3, 2, P.enamelDeep);

    /* THE FOLDING DISH RACK, bamboo, with a pot lid propped in it */
    var rx = 376;
    line(c, rx, 111, rx + 20, 97, H.walnutLit, 2);
    line(c, rx, 97, rx + 20, 111, H.walnutLit, 2);
    for (i = 0; i < 4; i++) rect(c, rx + 3 + i * 4, 100 + (i % 2) * 6, 1, 4, H.walnutHi);
    rowsFill(c, [[3, 4], [1, 8], [0, 10], [0, 10], [0, 10]], rx + 6, 92, H.steelLit);
    rect(c, rx + 8, 91, 6, 1, H.steelShade);

    /* the green soap, the blue can with its label, a second glass */
    rect(c, 402, 102, 4, 10, H.leaf); rect(c, 403, 100, 2, 2, H.leafDeep); dot(c, 402, 103, H.leafLit);
    rect(c, 409, 104, 4, 8, P.canBlue); rect(c, 409, 106, 4, 2, H.cabinetLit);
    rect(c, 470, 104, 1, 8, H.steelLit); rect(c, 475, 104, 1, 8, H.steelLit);
    rect(c, 470, 111, 6, 1, H.steelLit);
  }

  /* THE DOORWAY with the coats on the rail and the shoes under them
     (ref 1, ref 2 right), the oak floor of the hall showing through */
  function doorway(c) {
    var X = 560, Y = 8, W = 44, Hh = 118, i;
    rect(c, X - 3, Y - 3, W + 6, Hh + 3, H.cabinetLit);
    rect(c, X - 3, Y - 3, 1, Hh + 3, H.cabinetShade);
    rect(c, X, Y, W, Hh, P.doorDark);
    rect(c, X, Y + 100, W, 18, H.oakMid);
    rect(c, X, Y + 108, W, 1, H.oakSeam);
    Tint.rect(c, X, Y + 100, W, 18, P.doorDark, 7);
    rect(c, X + 6, Y + 22, W - 12, 1, H.iron);
    var coatX = [X + 6, X + 17, X + 29];
    for (i = 0; i < 3; i++) {
      var cw = 10 + (i % 2) * 2, ch = 58 + i * 4;
      rowsFill(c, [[3, cw - 6], [1, cw - 2], [0, cw]], coatX[i], Y + 23, P.coat);
      rect(c, coatX[i], Y + 26, cw, ch - 3, P.coat);
      rect(c, coatX[i] + 1, Y + 24, cw - 2, 1, P.coatLit);
      rect(c, coatX[i] + 3 + i, Y + 28, 1, ch - 10, P.coatLit);
    }
    rect(c, X + 6, Y + 113, 5, 2, H.iron);
    rect(c, X + 14, Y + 114, 5, 2, P.enamelRed);
    rect(c, X + 24, Y + 113, 5, 2, H.walnutLit);
  }

  /* THE PHOTO WALL (ref 1, right): dozens of photographs, yellow notes
     and a framed certificate over a white console */
  function photoWall(c) {
    var X0 = 604, X1 = 720, gx, gy, i;
    var cols = [P.photoA, P.photoB, P.photoC, P.photoD];
    /* THE COLLAGE, ref 1's right wall: not photographs scattered about
       (the first cut, which read as a wall with something on it) but a
       DENSE block of them edge to edge, 5px cells with a hairline of wall
       between, its edge ragged where the last ones were stuck up, a few
       hung landscape across two cells. */
    for (gy = 0; gy < 15; gy++) {
      for (gx = 0; gx < 19; gx++) {
        var h = hash(gx * 131 + gy * 7919 + 4111);
        var dx = (gx - 9) / 9.5, dy = (gy - 7) / 7.5;
        if (dx * dx + dy * dy > 1.05 + ((h >>> 3) % 5) * 0.06) continue;
        if ((h & 15) === 0) continue;
        var px = X0 + 8 + gx * 5, py = 14 + gy * 5;
        var w = ((h >>> 9) % 7 === 0 && gx < 18) ? 9 : 4;
        rect(c, px, py, w, 4, cols[(h >>> 5) & 3]);
        rect(c, px, py, w, 1, H.cabinetLit);
        if ((h >>> 12) % 3) dot(c, px + 1 + ((h >>> 14) & 1), py + 2, P.photoDark);
        if ((h >>> 16) % 4 === 0) dot(c, px + 2, py + 1, H.daylight);
      }
    }
    /* the certificate in its frame, and the yellow notes stuck over the
       photographs */
    rect(c, X0 + 40, 30, 12, 9, H.cabinetLit);
    rect(c, X0 + 40, 30, 12, 1, H.cabinetShade); rect(c, X0 + 40, 38, 12, 1, H.cabinetShade);
    rect(c, X0 + 43, 32, 6, 1, H.steelShade); rect(c, X0 + 43, 34, 5, 1, H.steelShade);
    rect(c, X0 + 48, 35, 2, 2, P.enamelRed);
    rect(c, X0 + 18, 50, 4, 5, P.note); rect(c, X0 + 72, 24, 4, 5, P.note);
    rect(c, X0 + 86, 62, 4, 5, P.note); rect(c, X0 + 30, 72, 4, 4, P.note);
    for (i = 0; i < 4; i++) dot(c, [X0 + 19, X0 + 73, X0 + 87, X0 + 31][i], [50, 24, 62, 72][i], H.daylight);
    /* the console: white top, its shade, its front */
    rect(c, X0, 100, X1 - X0, 5, H.paint);
    rect(c, X0, 105, X1 - X0, 1, H.paintShade);
    rect(c, X0, 106, X1 - X0, 20, H.paintDeep);
    rect(c, X0 + 20, 110, 30, 1, H.paintShade);
    rect(c, X0 + 66, 110, 30, 1, H.paintShade);
    /* and what is on it: a lamp base, a basket, a stack of books */
    rect(c, X0 + 10, 92, 6, 8, H.paintShade); rect(c, X0 + 8, 86, 10, 6, H.cabinetLit);
    rect(c, X0 + 40, 95, 16, 5, H.walnutLit); rect(c, X0 + 40, 95, 16, 1, H.walnutHi);
    rect(c, X0 + 80, 96, 14, 2, P.canBlue); rect(c, X0 + 81, 98, 12, 2, P.enamelRed);
  }

  function bakeKitchen() {
    var t = makeCanvas(KIT_W, KIT_H), c = t.ctx, i;
    rect(c, 0, 0, KIT_W, KIT_H, H.wall);

    counterRun(c);

    /* the uppers: three glass fronts, two shakers, the crown trim */
    glassDoor(c, 178, 8, 44, 77, 3301);
    glassDoor(c, 222, 8, 44, 77, 3302);
    glassDoor(c, 266, 8, 44, 77, 3303);
    shaker(c, 402, 8, 44, 77); pullV(c, 442, 70, 9);
    shaker(c, 446, 8, 44, 77); pullV(c, 449, 70, 9);
    pullV(c, 218, 70, 9); pullV(c, 225, 70, 9); pullV(c, 306, 70, 9);
    rect(c, 176, 5, 136, 3, H.cabinetLit); rect(c, 176, 7, 136, 1, H.cabinetShade);
    rect(c, 400, 5, 92, 3, H.cabinetLit); rect(c, 400, 7, 92, 1, H.cabinetShade);

    /* the two windows */
    shutterWindow(c, 136, 22, 40, 56, 1);
    shutterWindow(c, 312, 16, 88, 82, 2);

    /* the pantry: two doors, upper and lower, their pulls meeting at the
       join the way ref 1's tall cabinets do */
    for (i = 0; i < 2; i++) {
      shaker(c, i * 30, 0, 30, 62);
      shaker(c, i * 30, 62, 30, 64);
      pullV(c, i ? 33 : 25, 50, 10);
      pullV(c, i ? 33 : 25, 66, 10);
    }
    /* the over-fridge cabinet and the fridge */
    shaker(c, 60, 0, 64, 8);
    pullH(c, 88, 3, 8);
    fridge(c);
    rect(c, 124, 0, 2, KIT_H, H.wallShade);           /* the fridge's shadow on the wall */

    clutter(c);
    rangeHood(c, 320);
    doorway(c);
    photoWall(c);

    /* THE STEP BACK. Every surface in this kitchen is white or cream and
       every hazard in the lane is whiter, so the far wall comes down
       six sixteenths toward P.distance - the wall's own shade, in shade -
       which keeps it a warm cream-grey rather than a dirty one. It was
       two sixteenths toward the wall, and measured that way the tile's
       mean was 163 and a dish stack (mean 204 with its rims and its ring)
       stood only 34 above the lane, where the Couch's rule is 55. Now:
       the tile's mean is 150.5, no pixel of it is over 210 - not even the
       daylight slits - and the lane (rows 69..197, averaged over twelve
       scrolls with the island and the light sheet in) is 146.6, so the
       stacks stand 57 clear of it. */
    Tint.rect(c, 0, 0, KIT_W, KIT_H, P.distance, 6);
    return t;
  }

  /* ====================================================== THE ISLAND

     Layer B, 480x92 at parallax 0.55, drawn at screen 150: the island's
     quartz edge and its seating side - plain shaker panels with no
     hardware, which is what ref 3 shows - with the X-back chairs and
     the black stools pulled up to it, alternating the way ref 3 has
     them. Opaque from its top row down, so the kitchen above never has
     to paint the far lower cabinets. Its bottom row is screen 241: the
     dark row directly over the walnut's lit rim, the floor's kill edge,
     flat so the 0.55 parallax never shows against the table. */

  /* THE X-BACK CHAIR (ref 1, 2, 3: the white Ingolf), 42x76. Its body is
     chairPaint, a warm grey: a white chair two steps back under the
     island's overhang is not white, and the whites above 220 belong to
     the dishes. */
  function bakeChair() {
    var W = 42, Hh = 76, t = makeCanvas(W, Hh), c = t.ctx, i;
    var paint = P.chairPaint, lit = H.paint, shade = H.paintDeep;
    /* the top rail, corners cut */
    rect(c, 3, 0, 36, 1, lit);
    rect(c, 2, 1, 38, 2, paint);
    rect(c, 2, 3, 38, 1, shade);
    /* the two uprights */
    rect(c, 2, 4, 3, 37, paint); rect(c, 37, 4, 3, 37, paint);
    rect(c, 2, 4, 1, 37, lit); rect(c, 39, 4, 1, 37, shade);
    /* THE X, two 2px rails, a shade pixel under every step */
    for (i = 0; i <= 36; i++) {
      var fy = 4 + i, ax = 4 + Math.round(i * 31 / 36), bx = 36 - Math.round(i * 31 / 36);
      rect(c, ax, fy, 2, 1, paint); dot(c, ax, fy + 1, shade);
      rect(c, bx, fy, 2, 1, paint); dot(c, bx + 1, fy + 1, shade);
    }
    dot(c, 20, 21, lit); dot(c, 21, 21, lit);
    /* the seat, seen a hair from above */
    rect(c, 1, 41, 40, 1, lit);
    rect(c, 1, 42, 40, 3, paint);
    rect(c, 1, 45, 40, 1, shade);
    /* four legs tapering 3 -> 2, the back pair a row shorter */
    for (i = 46; i < 76; i++) {
      var w = i < 61 ? 3 : 2;
      rect(c, 2, i, w, 1, paint); rect(c, 37 + (3 - w), i, w, 1, paint);
      dot(c, 2 + w - 1, i, shade); dot(c, 39, i, shade);
      if (i < 75) { rect(c, 7, i, 2, 1, shade); rect(c, 33, i, 2, 1, shade); }
    }
    return ringUnder(t);
  }

  /* THE STOOL (ref 3, black metal with a wood seat), 26x58: a round
     seat seen edge-on, a post, a footring and a splayed base */
  function bakeStool() {
    var W = 26, Hh = 58, t = makeCanvas(W, Hh), c = t.ctx;
    rect(c, 2, 0, 22, 1, H.walnutLit);
    rect(c, 1, 1, 24, 2, H.walnut);
    rect(c, 0, 1, 1, 1, H.walnut); rect(c, 25, 1, 1, 1, H.walnut);
    rect(c, 1, 3, 24, 1, H.walnutDeep);
    rect(c, 3, 4, 20, 1, H.iron);
    rect(c, 11, 5, 4, 41, H.iron);
    rect(c, 11, 5, 1, 41, H.ironLit);
    rect(c, 5, 28, 16, 1, H.ironLit);
    rect(c, 5, 29, 16, 1, H.iron);
    line(c, 11, 46, 1, 57, H.iron, 2);
    line(c, 14, 46, 24, 57, H.iron, 2);
    line(c, 12, 46, 7, 56, H.ironLit);
    line(c, 13, 46, 18, 56, H.ironLit);
    return ringUnder(t);
  }

  function bakeIsland() {
    var t = makeCanvas(ISL_W, ISL_H), c = t.ctx, i;
    rect(c, 0, 0, ISL_W, ISL_H, H.cabinet);
    /* the quartz edge, with a vein or two in it */
    rect(c, 0, 0, ISL_W, 1, H.cabinetLit);
    rect(c, 0, 1, ISL_W, 2, P.quartz);
    rect(c, 0, 3, ISL_W, 1, H.cabinetShade);
    for (i = 0; i < 9; i++) {
      var hv = hash(i * 131 + 17);
      rect(c, (hv % ISL_W), 1 + ((hv >>> 9) & 1), 4 + (hv >>> 11) % 9, 1, P.quartzVein);
    }
    /* the seating side, ref 3: a deep rail under the counter, then twelve
       tall raised panels, each with its lit top-left bevel and its shaded
       bottom-right one - the island is BACKLIT (the windows are behind
       it), so the bevels are what give its face any shape at all */
    shaker(c, 0, 4, ISL_W, 11);
    for (i = 0; i < 12; i++) {
      var px = i * 40;
      shaker(c, px, 15, 40, 64);
      rect(c, px + 5, 20, 30, 1, H.cabinetLit);
      rect(c, px + 5, 20, 1, 53, H.cabinetLit);
      rect(c, px + 6, 72, 29, 1, H.cabinetShade);
      rect(c, px + 34, 21, 1, 52, H.cabinetShade);
    }
    /* the shade the counter's overhang throws on its own face */
    var sh = bakeShade(H.cabinetDeep, 0.40, 12, false);
    c.drawImage(sh.canvas, 0, 0, ISL_W, 12, 0, 4, ISL_W, 12);
    /* the toe-kick, the oak floor between island and table, the dark */
    rect(c, 0, 79, ISL_W, 8, H.cabinetDeep);
    rect(c, 0, 87, ISL_W, 3, H.oakMid);
    rect(c, 0, 88, ISL_W, 1, H.oakSeam);
    rect(c, 133, 87, 1, 3, H.oakSeam); rect(c, 371, 87, 1, 3, H.oakSeam);

    /* the step back on the island, DEEPER than the far wall's although
       it is nearer, because its face is turned away from the windows: in
       ref 2 the island's panels are the greyest white in the kitchen.
       Nine sixteenths puts the panels at a mean of 148 and, with the
       gloom of the light sheet over them, the lower island at 135 -
       which is the band the lower stacks and the bottles stand in. */
    Tint.rect(c, 0, 0, ISL_W, 87, P.distance, 9);

    /* the seats, in front of the island, each throwing a strip of shadow
       down its right onto the panels */
    var seats = [[70, 0], [190, 1], [300, 0], [420, 1]];
    for (i = 0; i < seats.length; i++) {
      var s = seats[i][1] ? T.stool : T.chair;
      var top = seats[i][1] ? 29 : 11;
      var sx = seats[i][0] - Math.floor(s.w / 2);
      Tint.rect(c, sx + s.w, top + 4, 4, 87 - top - 4, H.void, 4);
      c.drawImage(s.canvas, sx, top);
    }
    /* and the seats are stepped back with the island they stand at -
       painted after its tint, they would be the brightest thing behind
       the lane, so they get the same wash over their own pixels only */
    var keep = c.globalCompositeOperation;
    for (i = 0; i < seats.length; i++) {
      var s2 = seats[i][1] ? T.stool : T.chair, top2 = seats[i][1] ? 29 : 11;
      var sx2 = seats[i][0] - Math.floor(s2.w / 2);
      var tmp = makeCanvas(s2.w, s2.h);
      tmp.ctx.drawImage(s2.canvas, 0, 0);
      tmp.ctx.globalCompositeOperation = 'source-atop';
      Tint.rect(tmp.ctx, 0, 0, s2.w, s2.h, P.distance, 6);
      c.drawImage(tmp.canvas, sx2, top2);
    }
    c.globalCompositeOperation = keep;
    rect(c, 0, 90, ISL_W, 1, P.shadeCool);
    rect(c, 0, 91, ISL_W, 1, H.outline);
    return t;
  }

  /* WHAT IS ON THE ISLAND, ref 3: it is never clear. A layer of its own,
     480x16, drawn at screen 136 at the island's parallax so its things
     stand ON the quartz edge: a wooden bowl of lemons and oranges, a glass
     carafe and two glasses, the post, a little succulent in a white pot,
     the kitchen roll on its stand. Stepped back with the island. (Not the
     ketchup bottle ref 3 has standing there: a hazard's twin in the
     backdrop is a hazard the player stops to read.) */
  function bakeIslandTop() {
    var t = makeCanvas(ISL_W, 16), c = t.ctx, i;
    /* the fruit bowl */
    var orange = '#e08a2c', orangeHi = '#f2ab52';
    rect(c, 32, 11, 18, 4, H.walnutLit); rect(c, 33, 11, 16, 1, H.walnutHi);
    rect(c, 34, 14, 14, 1, H.walnutDeep);
    var fruit = [[34, 8, 0], [38, 7, 1], [42, 8, 0], [46, 8, 1], [40, 4, 0], [36, 5, 1]];
    for (i = 0; i < fruit.length; i++) {
      var fc = fruit[i][2] ? orange : P.lemon, fh = fruit[i][2] ? orangeHi : H.daylight;
      rowsFill(c, [[1, 2], [0, 4], [0, 4], [1, 2]], fruit[i][0], fruit[i][1], fc);
      dot(c, fruit[i][0] + 1, fruit[i][1] + 1, fh);
    }
    /* the carafe and the glasses */
    rect(c, 150, 3, 1, 12, H.steelLit); rect(c, 156, 3, 1, 12, H.steelLit);
    rect(c, 151, 1, 5, 2, H.steelLit); rect(c, 150, 14, 7, 1, H.steelLit);
    rect(c, 151, 7, 5, 7, H.daylight); Tint.rect(c, 151, 7, 5, 7, H.steel, 6);
    rect(c, 161, 9, 1, 6, H.steelLit); rect(c, 165, 9, 1, 6, H.steelLit); rect(c, 161, 14, 5, 1, H.steelLit);
    rect(c, 169, 10, 1, 5, H.steelLit); rect(c, 173, 10, 1, 5, H.steelLit); rect(c, 169, 14, 5, 1, H.steelLit);
    /* the post, and a pen on it */
    rect(c, 262, 13, 14, 2, H.cabinetLit); rect(c, 263, 12, 12, 1, P.linen);
    rect(c, 264, 11, 11, 1, P.canBlue); rect(c, 266, 10, 8, 1, H.daylight);
    rect(c, 268, 9, 7, 1, H.iron);
    /* the succulent */
    rect(c, 380, 10, 7, 5, H.paint); rect(c, 380, 10, 7, 1, H.paintShade);
    rowsFill(c, [[2, 3], [0, 7], [1, 5]], 380, 7, H.leaf);
    dot(c, 383, 7, H.leafLit); dot(c, 381, 8, H.leafLit);
    /* the kitchen roll on its stand */
    rect(c, 449, 0, 1, 15, H.iron);
    rect(c, 445, 3, 9, 11, H.daylight); rect(c, 445, 3, 1, 11, H.paint);
    rect(c, 452, 3, 2, 11, H.paintShade); rect(c, 445, 6, 9, 1, H.paintShade);
    rect(c, 443, 14, 13, 1, H.iron);
    /* stepped back with the island they stand on, their own pixels only */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, ISL_W, 16, P.distance, 6);
    c.globalCompositeOperation = 'source-over';
    return ringUnderSoft(t);
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

  /* ======================================================= THE LIGHT

     One baked 480x270 alpha sheet, the last call in drawBackdrop. Not
     LivingRoom.drawLight: that pass is the night, and this is three in
     the afternoon. Three ramps, every one eased, so none has an edge:
       - the ceiling's bounce, warm, gone by row 64
       - THE GLOOM UNDER THE ISLAND'S OVERHANG, from row 186 to 0.30 of
         P.shadeCool at FLOOR - it sinks the lower panels, the chair legs
         and the toe-kick, which is what lets the lower stacks, the
         bottles and the yogurt separate; none of it on the table, which
         is the lit thing. (The plan's 0.18 from 198 measured as a band
         you could not see against panels this pale.)
       - the two side columns, 56 each */
  function bakeLight() {
    var t = makeCanvas(VW, VH), c = t.ctx, y, x, k;
    for (y = CEIL; y < CEIL + 40; y++) {
      k = 1 - ease((y - CEIL) / 40);
      c.fillStyle = rgba(H.daylight, 0.07 * k);
      c.fillRect(0, y, VW, 1);
    }
    for (y = 186; y < FLOOR; y++) {
      k = ease((y - 186) / (FLOOR - 186));
      c.fillStyle = rgba(P.shadeCool, 0.30 * k);
      c.fillRect(0, y, VW, 1);
    }
    for (x = 0; x < 56; x++) {
      k = 1 - ease(x / 56);
      c.fillStyle = rgba(P.shadeCool, 0.14 * k);
      c.fillRect(x, CEIL, 1, FLOOR - CEIL);
      c.fillRect(VW - 1 - x, CEIL, 1, FLOOR - CEIL);
    }
    return t;
  }

  /* ======================================================= THE TABLE

     The floor band: the walnut seen along its length, Table ref 2 and 3,
     384x28 at parallax 1.0. Row 0 is the far rim catching the window -
     the lit side of the kill edge, under the island's dark row - then
     the top with its grain, a LEAF SEAM every 192 (ref 3: the extension
     leaf's joint, the next leaf's lip lit), one oatmeal linen placemat
     (ref 1, 2) with its corner lifting, and the near edge: the rounded
     arris, the edge face, and the WHITE APRON under it (ref 3). */
  function bakeTable() {
    var t = makeCanvas(TAB_W, TAB_H), c = t.ctx;
    var r = mulberry32(3141), i, k;
    rect(c, 0, 0, TAB_W, 1, H.walnutHi);
    rect(c, 0, 1, TAB_W, 1, H.walnutLit);
    rect(c, 0, 2, TAB_W, 17, H.walnut);
    /* grain: long runs along the board with ONE step allowed (paintOak's
       rule - a run that steps twice is a scratch) */
    for (i = 0; i < 64; i++) {
      var gx = Math.floor(r() * TAB_W), gy = 2 + Math.floor(r() * 17);
      var len = 8 + Math.floor(r() * 33), step = Math.floor(r() * len);
      var dy = r() < 0.5 ? 0 : (r() < 0.5 ? -1 : 1);
      var col = r() < 0.55 ? H.walnutLit : H.walnutDeep;
      for (k = 0; k < len; k++) {
        var py = gy + (k >= step ? dy : 0);
        if (py >= 2 && py <= 18) dot(c, (gx + k) % TAB_W, py, col);
      }
    }
    /* the sheen off the window, ref 2: a soft lighter band across the
       far third of the top */
    Tint.rect(c, 0, 2, TAB_W, 5, H.walnutHi, 3);
    rect(c, 300, 9, 5, 3, H.walnutDeep); rect(c, 301, 10, 3, 1, H.walnut);
    /* the leaf seams */
    for (k = 0; k < TAB_W; k += 192) {
      rect(c, k, 0, 1, 19, H.walnutDeep);
      rect(c, k + 1, 0, 1, 19, H.walnutHi);
    }
    /* THE PLACEMAT, oatmeal linen: lit along its top and left, shaded
       along its bottom and right, a sparse weave, the far corner lifting */
    var mx = 84, my = 5, mw = 64, mh = 9;
    rect(c, mx, my, mw, mh, P.linen);
    rect(c, mx, my, mw, 1, P.linenLit); rect(c, mx, my, 1, mh, P.linenLit);
    rect(c, mx, my + mh - 1, mw, 1, P.linenShade); rect(c, mx + mw - 1, my, 1, mh, P.linenShade);
    for (i = 1; i < mh - 1; i++) {
      for (k = 1 + (i % 3); k < mw - 1; k += 3) if (hash(i * 211 + k * 17) % 3 === 0) dot(c, mx + k, my + i, P.linenShade);
    }
    rect(c, mx + mw - 4, my, 4, 1, H.walnut); rect(c, mx + mw - 2, my + 1, 2, 1, H.walnut);
    dot(c, mx + mw - 5, my, P.linenLit); dot(c, mx + mw - 3, my + 1, P.linenLit);
    rect(c, mx + 1, my + mh, mw - 1, 1, H.walnutDeep);
    /* the near edge, and the white apron under it */
    rect(c, 0, 19, TAB_W, 1, H.walnutDeep);
    rect(c, 0, 20, TAB_W, 1, H.walnutHi);
    rect(c, 0, 21, TAB_W, 2, H.walnutDeep);
    rect(c, 0, 23, TAB_W, 1, H.outline);
    rect(c, 0, 24, TAB_W, 1, H.paintShade);
    rect(c, 0, 25, TAB_W, 3, H.paint);
    rect(c, 96, 24, 1, 4, H.paintDeep); rect(c, 288, 24, 1, 4, H.paintDeep);
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
    LivingRoom.build();               /* the menu gloom and the crown shade live there */
    T.lid = bakeLid();
    T.pool = bakePool();
    T.chair = bakeChair();
    T.stool = bakeStool();
    T.kitchen = bakeKitchen();
    T.island = bakeIsland();
    T.islandTop = bakeIslandTop();
    T.light = bakeLight();
    T.table = bakeTable();
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

  /* THREE LAYERS AND THE AFTERNOON, back to front: the kitchen wall at
     0.22, because it is across the room and barely moves; the island at
     0.55 with what is standing on it, because the chairs are pulled up
     to it a table's length away; and the light sheet. The fill under
     them is a safety net - the two tiles cover every row from CEIL to
     FLOOR between them. */
  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = H.wall;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.kitchen.canvas, scroll * KIT_PAR, CEIL);
    tileX(ctx, T.island.canvas, scroll * ISL_PAR, ISL_Y);
    tileX(ctx, T.islandTop.canvas, scroll * ISL_PAR, ISL_Y - 14);
    ctx.drawImage(T.light.canvas, 0, 0);
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.lid.canvas, scroll, 0);
    var off = wrap(scroll, LID_W);
    for (var k = 0; k < LAMPS.length; k++) {
      for (var x = LAMPS[k] - off - LID_W; x < VW + LID_W; x += LID_W) {
        if (x < -POOL_W || x > VW + POOL_W) continue;
        blitBelowCeil(ctx, T.pool.canvas, Math.round(x) - POOL_W / 2, 18);
      }
    }
    ctx.drawImage(LivingRoom.tiles.crownShade.canvas, 0, CEIL);
  }

  /* No foreground lip: nothing is nearer than the apron, and a near
     chair back would stand in the lane. */
  function drawFloor(ctx, scroll) {
    tileX(ctx, T.table.canvas, scroll, FLOOR);
  }

  /* The calm version, for the porch's Dining Room row: the room with
     nothing on the table. No stacks, no bottles, no silverware - the
     porch bakes this once at a frozen scroll, and a hazard in a title
     picture is a hazard that never moves. */
  function drawMenuBackdrop(ctx, scroll) {
    ctx.fillStyle = H.wall;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.kitchen.canvas, scroll * 0.6 * KIT_PAR, CEIL);
    tileX(ctx, T.island.canvas, scroll * 0.6 * ISL_PAR, ISL_Y);
    tileX(ctx, T.islandTop.canvas, scroll * 0.6 * ISL_PAR, ISL_Y - 14);
    ctx.drawImage(T.light.canvas, 0, 0);
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
    Tint.rect(ctx, bx - 12, FLOOR - 1, 24, 2, P.shadeCool, 8);
    rect(ctx, bx - 10, FLOOR - 1, 2, 1, P.honey);
    rect(ctx, bx + 9, FLOOR - 1, 2, 1, P.honeyDeep);
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
     clipped. It is the level in one picture and in the level's own
     proportions: the lid, the kitchen (the fridge with its magnets, the
     glass door, the hood, the shutter), the island with an X-back chair,
     the walnut, two dish stacks sliding by with a gap, a fork coming
     down, and the bottle squirting - the one red thing on a white and
     walnut card. */
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
    var lidY = y + Math.round(h * 0.09);
    var wallY = y + Math.round(h * 0.50);
    var tableY = y + Math.round(h * 0.85);

    /* 1. the lid, a pendant sliding across it */
    rect(ctx, x, y, w, lidY - y, H.plasterMid);
    rect(ctx, x + Math.round(w * 0.35), y, Math.round(w * 0.3), lidY - y - 4, H.plasterLit);
    rect(ctx, x, lidY - 4, w, 1, H.crown);
    rect(ctx, x, lidY - 3, w, 1, H.plasterLit);
    rect(ctx, x, lidY - 2, w, 1, H.crownShade);
    rect(ctx, x, lidY - 1, w, 1, H.outline);
    var lx = x + Math.round(wrap(w * 0.6 - s * 0.5, w + 10)) - 5;
    rect(ctx, lx + 2, y, 1, 2, H.lampRod);
    rect(ctx, lx, y + 2, 5, 3, H.lampGlass);
    dot(ctx, lx + 2, y + 3, H.lampCore);

    /* 2. the kitchen wall */
    rect(ctx, x, lidY, w, wallY - lidY, H.wall);
    var upTop = lidY + 2, upBot = y + Math.round(h * 0.30);
    var dw = Math.max(8, Math.round(w * 0.22));
    var fx0 = x + Math.round(w * 0.2);
    for (k = 0, i = fx0; i < x + w; i += dw, k++) {
      rect(ctx, i, upTop, dw - 1, upBot - upTop, H.cabinetLit);
      rect(ctx, i + 1, upTop + 1, dw - 3, upBot - upTop - 2, k === 1 ? P.glassDark : H.cabinet);
      if (k === 1) { rect(ctx, i + 2, upTop + 4, 2, 1, P.porcelain); rect(ctx, i + 5, upTop + 8, 2, 1, P.porcelain); }
      rect(ctx, i + dw - 3, upBot - 5, 1, 3, H.steelLit);
    }
    /* the shutter right of the hood */
    var shX = x + Math.round(w * 0.6), shW = Math.round(w * 0.24);
    var shTop = upTop + 3, shBot = y + Math.round(h * 0.38);
    rect(ctx, shX - 1, shTop - 1, shW + 2, shBot - shTop + 2, H.cabinetLit);
    for (i = shTop; i < shBot; i += 3) {
      rect(ctx, shX, i, shW, 1, H.cabinet);
      rect(ctx, shX, i + 1, shW, 1, H.cabinetShade);
      rect(ctx, shX, i + 2, shW, 1, H.daylight);
    }
    rect(ctx, shX + Math.round(shW / 2), shTop, 1, shBot - shTop, H.cabinetShade);
    /* the backsplash and the counter line */
    var ctrY = shBot;
    for (i = upBot; i < ctrY; i += 2) {
      for (k = (i / 2) % 2 ? 0 : 2; k < w; k += 4) rect(ctx, x + k, i, 3, 1, (k + i) % 3 ? P.tileA : P.tileB);
    }
    rect(ctx, x, ctrY, w, 1, H.cabinetLit);
    rect(ctx, x, ctrY + 1, w, 1, P.quartz);
    rect(ctx, x, ctrY + 2, w, 1, H.cabinetShade);
    rect(ctx, x, ctrY + 3, w, wallY - ctrY - 3, H.cabinetShade);
    /* the hood */
    var hx = x + Math.round(w * 0.48);
    rect(ctx, hx - 1, lidY, 3, Math.round(h * 0.2) - (lidY - y), H.steel);
    var cw = Math.round(w * 0.2), cy0 = y + Math.round(h * 0.2);
    rect(ctx, hx - Math.round(cw / 2), cy0, cw, 2, P.hoodGlass);
    rect(ctx, hx - Math.round(cw / 2), cy0 + 2, cw, 1, P.hoodGlassEdge);
    /* THE FRIDGE down the left, its seam, its handles and its magnets -
       the fridge is what says THIS kitchen on a card */
    var frW = Math.round(w * 0.2);
    rect(ctx, x, lidY + 2, frW, wallY - lidY - 2, H.steel);
    rect(ctx, x, lidY + 2, 1, wallY - lidY - 2, H.steelLit);
    rect(ctx, x + Math.round(frW / 2), lidY + 2, 1, Math.round((wallY - lidY) * 0.7), H.steelDeep);
    rect(ctx, x + Math.round(frW / 2) - 2, lidY + 12, 1, 6, H.steelLit);
    rect(ctx, x + Math.round(frW / 2) + 2, lidY + 12, 1, 6, H.steelLit);
    var mags = [P.photoA, P.photoB, P.photoC, P.photoD, P.note, P.photoA, P.photoC];
    for (i = 0; i < mags.length; i++) {
      rect(ctx, x + 2 + (i % 3) * 2, lidY + 5 + Math.floor(i / 3) * 4 + (i % 2), 2, 2, mags[i]);
    }
    rect(ctx, x + 2, lidY + 18, 2, 3, P.pinkPaper);
    Tint.rect(ctx, x, lidY, w, wallY - lidY, P.distance, 6);

    /* 3. the island and one X-back chair in front of it */
    rect(ctx, x, wallY, w, 1, H.cabinetLit);
    rect(ctx, x, wallY + 1, w, 1, P.quartz);
    rect(ctx, x, wallY + 2, w, tableY - wallY - 2, H.cabinet);
    var pw2 = Math.max(10, Math.round(w * 0.3));
    for (i = x; i < x + w; i += pw2) {
      rect(ctx, i, wallY + 2, 1, tableY - wallY - 4, P.cabinetLine);
      rect(ctx, i + 2, wallY + 4, pw2 - 4, 1, H.cabinetShade);
    }
    rect(ctx, x, tableY - 3, w, 3, H.cabinetDeep);
    var chx = x + Math.round(w * 0.6), chy = wallY + 5, chh = tableY - chy - 3;
    rect(ctx, chx - 1, chy - 1, 14, 4, P.outline);
    rect(ctx, chx, chy, 12, 2, P.chairPaint);
    for (i = 0; i < 9; i++) {
      dot(ctx, chx + 1 + i, chy + 2 + i, P.chairPaint);
      dot(ctx, chx + 10 - i, chy + 2 + i, P.chairPaint);
    }
    rect(ctx, chx, chy + 2, 2, 10, P.chairPaint); rect(ctx, chx + 10, chy + 2, 2, 10, P.chairPaint);
    rect(ctx, chx - 1, chy + 11, 14, 3, P.outline);
    rect(ctx, chx, chy + 12, 12, 1, P.chairPaint);
    rect(ctx, chx, chy + 13, 2, chh - 13, P.chairPaint); rect(ctx, chx + 10, chy + 13, 2, chh - 13, P.chairPaint);
    Tint.rect(ctx, x, wallY, w, tableY - wallY, P.distance, 7);
    Tint.rect(ctx, x, wallY + Math.round((tableY - wallY) / 2), w, Math.round((tableY - wallY) / 2), P.shadeCool, 3);

    /* 4. THE TABLE: the lit far rim, the walnut, a placemat, the edge,
       the white apron */
    rect(ctx, x, tableY, w, 1, H.walnutHi);
    rect(ctx, x, tableY + 1, w, 1, H.walnutLit);
    rect(ctx, x, tableY + 2, w, y + h - tableY - 2, H.walnut);
    for (i = 0; i < 4; i++) {
      var gx = x + Math.round(wrap(i * 31 - s, w + 12)) - 6;
      rect(ctx, gx, tableY + 3 + (i % 3), 6, 1, i % 2 ? H.walnutLit : H.walnutDeep);
    }
    var seamX = x + Math.round(wrap(w * 0.7 - s, w + 20)) - 10;
    rect(ctx, seamX, tableY, 1, y + h - tableY - 5, H.walnutDeep);
    var matX = x + Math.round(wrap(w * 0.3 - s, w + 40)) - 20;
    rect(ctx, matX, tableY + 3, Math.round(w * 0.26), 3, P.linen);
    rect(ctx, matX, tableY + 3, Math.round(w * 0.26), 1, P.linenLit);
    rect(ctx, x, y + h - 6, w, 1, H.walnutDeep);
    rect(ctx, x, y + h - 5, w, 1, H.walnutHi);
    rect(ctx, x, y + h - 4, w, 1, H.outline);
    rect(ctx, x, y + h - 3, w, 1, H.paintShade);
    rect(ctx, x, y + h - 2, w, 2, H.paint);

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

    /* 9. THE LIGHT: this bay's afternoon, not the night's wash */
    Tint.rect(ctx, x, y, w, Math.round(h * 0.4), H.daylight, 1);
    var vig = Math.max(4, Math.round(w * 0.09));
    Tint.rect(ctx, x, y, vig, h, P.shadeCool, 3);
    Tint.rect(ctx, x + w - vig, y, vig, h, P.shadeCool, 3);
    Tint.rect(ctx, x, y, w, h, H.daylight, 1);
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
  function makeDrop(x, spicy, fall, run) {
    var gold = false;
    if (!spicy) {
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
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld,
    rectsFor: rectsFor,
    /* for the headless checks: the clock and the jet, read-only */
    bottlePhase: bottlePhase, jetSamples: jetSamples, jetHeadTail: jetHeadTail
  };
})();
