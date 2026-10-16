/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM / THE CEILING   (3-4)

   Evening, the pendants on, and you are flying along the underside of
   the dining-room ceiling. Drawn from Ceiling ref 1-5 in Assets/Concept:
   the warm plaster, the black canopy discs and rods, the crackle-glass
   pendants, the cool recessed cans, the air register with its two banks
   of louvres (Celing ref 4), the smoke detector (ref 5p), the angled
   drywall soffits (ref 1, 2) and the skylight well with the dusk in it
   (ref 3) - and from Pole ref, the silver telescoping pole with the grey
   collar and the grey plastic J-hook that somebody keeps poking at it.

   THE ROOM HAS FOLDED. The lid (rows 0..23) is the plaster seen from
   right under it, ending in the Living Room's four hard crown rows and
   an outline on the kill line. The bottom (rows 242..269) is THE SAME
   TILE UPSIDE DOWN - the owner's pick - with its pendants hanging UP out
   of it, which is the one sign in the frame that says what has happened.
   Both are lethal. Between them is the same ceiling FURTHER AWAY: the
   plaster plane seen along the room at ceiling height (Ceiling ref
   5j/5p), running off to the far wall with its pendants, cans and
   skylights receding at three depths and three speeds, and under the
   fold its mirror running off to the same wall - two ceilings converging
   on a soft horizon between rows 132 and 133. See `the field`.

   CREAM IS SOLID AND SOLID KILLS. This is cream on cream - a plaster
   ceiling with drywall soffits hanging off it - and the only answer that
   reads at 180px/s is to keep every cream thing in the bay lethal and
   every lethal thing cream: the lid, the bottom and the soffit columns.
   The field behind them is the same plaster a long way off, dim and
   cooling toward the horizon, so nothing cream ever has to separate from
   more cream: measured in a run, the soffit face is 217 and the field
   beside it 122 on average and 162 at its brightest (a near lamp's
   pool). The lint is GREY and ringed, the gifts glow, the pole is cold
   metal with an outline (198 against a field of 107..118).

   THE POLE is the bay's invented hazard and it lives in the engine's
   spike slot. Everything it does is a function of ITS OWN SCREEN X (the
   Mantle's remotePhase rule): it rises on the right, stands up and taps
   the ceiling in the middle, and is pulled back down as it slides
   towards the doodad - so the same pole is always doing the same thing
   at the same place on the screen, and the box and the picture are one
   frame's answer. STAY LEFT. IT COMES DOWN. See poleE for the numbers,
   which were measured in a real run and not only reasoned about.

   Same discipline as every other level file: every pixel is generated
   and baked once in build(), and ANY shade laid over something that
   scrolls is a flat Tint or a baked alpha sheet, never a Dither. There is
   no call to Dither.rect anywhere in this file.
------------------------------------------------------------------ */
'use strict';

var Ceiling = (function () {

  /* the house (H) and the Living Room (L). The plaster, the crown and the
     crackle glass are the LIVING ROOM'S values, read through the Dining
     Room's table: it is the same ceiling (the Living Room's band was
     drawn off these very photographs), and two creams for one ceiling
     would be the first thing anybody walking between the rooms noticed. */
  var H = DiningRoom.P;
  var L = LivingRoom.P;
  var CEIL = DiningRoom.CEIL, FLOOR = DiningRoom.FLOOR;
  var wrap = DiningRoom.wrap, hash = DiningRoom.hash;
  var ease = DiningRoom.ease, rgba = DiningRoom.rgba;
  var rowsFill = DiningRoom.rowsFill;

  /* The bay's own pigments. PlayScene never reads this table. */
  var P = {
    /* the ceiling: the house's values, which are the Living Room's */
    plasterLit: H.plasterLit, plasterMid: H.plasterMid, plasterDim: H.plasterDim,
    plasterShade: H.plasterShade,
    crown: H.crown, crownShade: H.crownShade, vent: H.vent, ventSlot: H.ventSlot,
    lampCore: H.lampCore, lampGlass: H.lampGlass, lampCrackle: H.lampCrackle,
    lampDark: H.lampDark, lampRod: H.lampRod, lampGlow: H.lampGlow,
    /* the canopy disc's rim catches the lamp under it (Ceiling ref 1) */
    canopyRim: H.ironLit,

    /* the recessed cans and the smoke detector (Ceiling ref 2, 5p): the
       one cool white on the ceiling, which is what the photographs show -
       the cans are daylight LEDs under warm pendants */
    canLight: '#eef3ff', canRim: '#c9ced6', canGlow: '#dfe8ff',
    detector: '#e9e6df', detectorLed: '#e0402a',

    /* THE FIELD: THE SAME CEILING, FURTHER AWAY. Looking along the room at
       ceiling height (Ceiling ref 5j/5p), the plaster plane runs away from
       you to the far wall: warm where the lamps are near, cooler and dimmer
       as it goes. Every value here sits at least 100 of luminance under the
       soffit face (217) and 30 under the lid's own plaster (148) - the
       field is AIR, and in this bay air is dim and solid is cream. */
    planeNear: '#806f5d',   /* lum ~114, just under the lid             */
    planeMid:  '#6e665d',   /* ~103                                     */
    planeFar:  '#5d5a5a',   /* ~91, where the ceiling meets the far wall */
    /* the far wall's strip at the fold is the far ceiling's own value,
       a shade warmer, and blended in over four rows each side: the first
       cut of it was 10 darker with a crown line on top, and it read as a
       dark ledge across the middle of the screen */
    farWall:   '#625c57',   /* ~93                                      */
    /* the pendants down the room, dimmer with distance (air, not lamps
       you could touch): glass, filament, rod */
    glassMid: '#d9b24a', glassFar: '#a88a46', coreMid: '#f6e4ad', coreFar: '#c9b178',
    rodFar: '#2e2720',
    /* the cans down the room */
    canMid: '#aeb3bd', canFar: '#8f949c', canCoreMid: '#dde3ef',
    /* the angled soffit planes and the skylight coffers seen down the
       room (Ceiling ref 1, 3): the same lavender drywall as the columns'
       lit return, taken down 80 to 100 - far architecture, not a wall */
    lavFar: '#6f6c78', lavFarLit: '#7c7988', lavFarDeep: '#625f6e', lavFarEdge: '#55536a',
    wellFar: '#6d6b7e', skyFar: '#2b3e66', skyFarDeep: '#22314f',

    /* THE SOFFITS - the only cream in the field, so the only thing in it
       that kills (Ceiling ref 1, 2): a warm cream FACE (lum ~216) meeting a
       pale lavender-white RETURN (~221) at a crisp arris (~247) - the two
       planes of ref 1 and 2, warm-lit and cool-lit, the one thing in those
       photographs that says "angled drywall" */
    soffitLit: '#f0e7d4', soffitFace: '#e2d8c3', soffitShade: '#bdb09b',
    soffitDeep: '#8e8370', soffitTooth: '#d6cbb6', soffitCorner: '#d2c6ae',
    arris: '#fbf7ee',
    lavLit: '#dcdbe9', lavMid: '#c8c6d8', lavShade: '#aaa8be', lavDeep: '#86849c',
    lavTooth: '#cfcedf',
    /* the register's painted grille (Celing ref 4): a step under the face */
    regFace: '#cec4b0', regShade: '#b2a690',
    /* the skylight well (Ceiling ref 3): lavender-grey drywall going up
       to a white frame, and the dusk in the glass */
    wellWall: '#c4c2cc', wellShade: '#9c9aa8', wellMid: '#b0aebb', wellLit: '#d6d4de',
    skyFrame: '#eceef2',
    sky: H.dusk, skyDeep: H.duskDeep, skyLow: '#43619c', skyGleam: '#8fa8d8', star: '#c9d3ef',

    /* lint and dust: grey, cooler than anything else in a warm room */
    lint: '#b9b6b0', lintHi: '#d8d5cf', lintShade: '#8e8a84', lintDeep: '#6b6660',
    lintRing: '#45403b', hair: '#3a3530',

    /* the spicy feather */
    hot: '#f0922e', hotHi: '#ffc45a', hotDeep: '#c9641c', quillHot: '#7a3a10',
    /* the spin feather: the engine's purple exactly, so the gift and the
       aura it gives you agree */
    whirl: '#b061f0', whirlHi: '#e6b3ff', whirlDeep: '#5a2a8c', quillWhirl: '#3a1a5c',

    /* the noodles */
    noodle: '#f2d98a', noodleHi: '#fff1bd', noodleShade: '#c9a95a', noodleDeep: '#8f6f30',

    /* THE POLE (Pole ref): brushed aluminium, a grey plastic collar, a
       grey plastic hook. Cold against a warm room on purpose. */
    poleLit: '#eef0f2', poleMid: '#c3c7cb', poleShade: '#8a9095',
    collar: '#a4a8ab', collarLit: '#c6c9cc', collarDeep: '#6d7174',
    hook: '#b9bdc0', hookLit: '#dcdfe1', hookShade: '#7f8488',
    hole: '#2b2420',

    /* a life glows the same in every level */
    lifeJade: '#5fae9a', lifePale: '#93d8bd',

    outline: H.outline, void: H.void, nightShade: L.nightShade
  };

  /* the neutral effect palette PlayScene paints its particles from. The
     air is the Living Room's lamp-lit pair - this is an evening bay. */
  var FX = {
    motes: LivingRoom.AIR.motes, motesHi: LivingRoom.AIR.motesHi,
    /* plaster dust: what a tuft lets go of, what the hook knocks loose */
    puff: '#e8dcc4', puffHi: '#f7f0dd',
    /* lint fluff off the bottom band */
    ground: '#8f8a80', groundHi: '#c2bdb2',
    splat: '#c9c6c0', splatHi: '#e6e3dc',
    hot: '#f0922e', hotMid: '#ffb347', hotHi: '#ffe08a', heat: '#f0922e', heatEdge: '#b84d12',
    glowCore: '255,224,138', glowEdge: '240,146,46'
  };

  /* the generic cover's thirteen colours: the FIELD is dusk, the beams are
     the soffits, the ground is the folded plaster */
  var PREVIEW = {
    back: P.planeNear, backAlt: P.planeMid, seam: P.farWall,
    beam: P.soffitFace, beamDark: P.soffitShade, beamLight: P.soffitLit,
    ground: P.plasterMid, groundDark: P.crownShade, groundHi: P.plasterLit,
    spike: P.poleMid, spikeHi: P.poleLit, air: P.lampGlow, gloom: P.void
  };

  /* the thing, then the promise. STAY LEFT is the rule with no exceptions
     (see poleE), and IT COMES DOWN is why it works. */
  var WARN = {
    drop:  ['▼ LINT ▼', 'NOBODY DUSTS UP HERE'],
    spike: ['▲ THE POLE ▲', 'STAY LEFT. IT COMES DOWN.'],
    ceil:  ['▲ CEILING BOTH WAYS ▲', 'EITHER ONE ENDS THE RUN']
  };

  var BOON_NAME = 'NOODLES';
  var END_MIN = DiningRoom.END_MIN;
  var CEIL_KILLS = true;

  /* LINT LETS GO, IT IS NOT DROPPED. 90 px/s/s against a terminal of 58
     reaches terminal in 0.64s, so a tuft drops away from the plaster and
     settles into a drift rather than falling. See stepDrop. */
  var DROP_GRAV = 90;
  var SPLAT_TIME = 1.4;

  var T = {};

  /* ------------------------------------------------------- geometry

     One 480 tile carries TWO pendants 240 apart - the Living Room's
     beat, so the pools never meet - with the halves made different by
     the register and the smoke detector. The field is 109 rows above the
     fold and 109 below it, and the lower one is the upper one flipped:
     mirror(y) = 265 - y sends the kill line at 23 to the kill line at
     242 and the horizon between 132 and 133 to itself. */
  var TILE_W = 480;
  var LAMP_XS = [96, 336];
  var CAN_XS = [216, 456];
  var REG_X = 152, DET_X = 297;
  var FIELD_H = 109;
  var FOLD_Y = 133;
  function mirror(y) { return 265 - y; }

  /* ------------------------------------------------------- helpers */

  /* sparse single-pixel tooth: plaster that is one flat colour is the one
     thing plaster must not look like */
  function tooth(c, x0, y0, w, h, r, odds, lo, hi) {
    for (var y = y0; y < y0 + h; y++) {
      for (var x = x0; x < x0 + w; x++) {
        if (r() > odds) continue;
        c.fillStyle = r() < 0.5 ? lo : hi;
        c.fillRect(x, y, 1, 1);
      }
    }
  }

  /* a baked tile, flipped top for bottom, ONCE at boot - never per frame */
  function flipV(src) {
    var t = makeCanvas(src.w, src.h), c = t.ctx;
    c.save(); c.translate(0, src.h); c.scale(1, -1); c.drawImage(src.canvas, 0, 0); c.restore();
    return t;
  }
  function flipH(src) {
    var t = makeCanvas(src.w, src.h), c = t.ctx;
    c.save(); c.translate(src.w, 0); c.scale(-1, 1); c.drawImage(src.canvas, 0, 0); c.restore();
    return t;
  }

  /* a character grid painted into a sheet and a white mask beside it */
  function paintGrid(t, m, grid, ox, oy, ink) {
    var r, k, ch;
    for (r = 0; r < grid.length; r++) {
      for (k = 0; k < grid[r].length; k++) {
        ch = grid[r].charAt(k);
        if (ch === '.') continue;
        t.ctx.fillStyle = ink[ch];
        t.ctx.fillRect(ox + k, oy + r, 1, 1);
        m.ctx.fillStyle = '#ffffff';
        m.ctx.fillRect(ox + k, oy + r, 1, 1);
      }
    }
  }

  /* the 1px ring laid UNDER a shape, so it follows every notch it has */
  function ringUnder(t, m) {
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.drawImage(DiningRoom.ringOf(m, t.w, t.h).canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-over';
  }

  /* blitBelowCeil's twin for the folded bottom: a light pool hanging UP
     out of the bottom band is cropped to rows < FLOOR, so the two outline
     rows on the kill line stay as dark under a lamp as between two */
  function blitAboveFloor(ctx, tile, x, y) {
    var cut = y + tile.height - FLOOR;
    if (cut <= 0) { ctx.drawImage(tile, x, y); return; }
    if (cut >= tile.height) return;
    ctx.drawImage(tile, 0, 0, tile.width, tile.height - cut, x, y, tile.width, tile.height - cut);
  }

  /* ------------------------------------------------------- the lid

     T.lid, 480x24. Rows 0..18 plaster with the fixtures, 19..23 the
     Living Room's exact five crown rows, never drawn over. */

  /* the crackle-glass shade, bigger than the Living Room's 7: this is the
     closest anyone ever gets to it. Nine rows, the last on 17, nothing
     solid on 18 - the room's rule. */
  var SHADE9 = [[3, 3], [2, 5], [1, 7], [0, 9], [0, 9], [0, 9], [1, 7], [1, 7], [2, 5]];

  /* the flat steps of light baked into the plaster: two under each
     pendant (72 then 36 wide), one cooler one under each can, and a dim
     between the two halves of the tile. Flat steps baked into a tile that
     scrolls as one piece - the Living Room's method - cost nothing and
     cannot boil. */
  function liftPools(c, y, h) {
    var i;
    Tint.rect(c, 150, y, 40, h, H.plasterDim, 5);
    Tint.rect(c, 390, y, 40, h, H.plasterDim, 5);
    for (i = 0; i < 2; i++) {
      Tint.rect(c, LAMP_XS[i] - 36, y, 72, h, H.plasterLit, 4);
      Tint.rect(c, LAMP_XS[i] - 18, y, 36, h, H.plasterLit, 5);
      /* the cans' cool lift is ONE step at 2/16, not the brief's two at 4
         and 5: cool white over warm plaster at 9/16 read at scale 2 as two
         pale-blue columns standing in the band */
      Tint.rect(c, CAN_XS[i] - 12, y, 24, h, P.canGlow, 2);
    }
  }

  /* one pendant (Ceiling ref 1, 2): the black canopy disc seen edge on with
     its lit rim, the rod, and the glass. The rod goes on BEFORE the glass
     so the shade's ring cuts it off where they meet. */
  function lidPendant(c, lx, r) {
    var i, ri, ox = lx - 4, oy = 9;
    c.fillStyle = H.lampRod;
    c.fillRect(lx - 4, 1, 9, 2);            /* the canopy disc          */
    c.fillRect(lx - 2, 3, 5, 1);            /* its neck                 */
    c.fillRect(lx, 4, 1, 5);                /* the rod, rows 4..8       */
    c.fillStyle = P.canopyRim;
    c.fillRect(lx - 3, 2, 7, 1);            /* the rim catching the lamp */
    /* the ring, sides and top only: a ring under row 17 would put a pixel
       on 18, one row nearer the kill line than anything solid may reach */
    c.fillStyle = H.outline;
    c.fillRect(ox + SHADE9[0][0], oy - 1, SHADE9[0][1], 1);
    for (i = 0; i < SHADE9.length; i++) {
      c.fillRect(ox + SHADE9[i][0] - 1, oy + i, 1, 1);
      c.fillRect(ox + SHADE9[i][0] + SHADE9[i][1], oy + i, 1, 1);
    }
    rowsFill(c, SHADE9, ox, oy, H.lampGlass);
    /* seven crackle flecks, seeded, so the lamp is the same every frame */
    c.fillStyle = H.lampCrackle;
    for (i = 0; i < 7; i++) {
      ri = 1 + Math.floor(r() * 7);
      c.fillRect(ox + SHADE9[ri][0] + Math.floor(r() * SHADE9[ri][1]), oy + ri, 1, 1);
    }
    c.fillStyle = H.lampCore;
    c.fillRect(lx - 1, 11, 3, 3);
    c.fillStyle = H.lampDark;
    c.fillRect(ox + SHADE9[8][0], oy + 8, SHADE9[8][1], 1);
  }

  /* a recessed can seen at a grazing angle: a flat ellipse of trim with the
     cool LED in it, and a halo of the same cool light on the plaster */
  function lidCan(c, cx) {
    c.fillStyle = P.canGlow;
    c.fillRect(cx - 4, 4, 9, 1); c.fillRect(cx - 4, 9, 9, 1);
    rowsFill(c, [[2, 7], [0, 11], [0, 11], [2, 7]], cx - 5, 5, P.canRim);
    c.fillStyle = P.canLight;
    c.fillRect(cx - 3, 6, 7, 2);
  }

  /* the air register (Celing ref 4): a white-framed grille flush with the
     plaster, two banks of louvres split down the middle as the photograph
     has them */
  function lidRegister(c) {
    var x = REG_X, y = 4;
    c.fillStyle = H.vent;       c.fillRect(x, y, 16, 9);
    c.fillStyle = H.plasterLit; c.fillRect(x, y, 16, 1); c.fillRect(x, y, 1, 9);
    c.fillStyle = H.plasterShade; c.fillRect(x + 1, y + 8, 15, 1); c.fillRect(x + 15, y + 1, 1, 8);
    c.fillStyle = H.ventSlot;
    c.fillRect(x + 2, y + 2, 12, 1); c.fillRect(x + 2, y + 4, 12, 1); c.fillRect(x + 2, y + 6, 12, 1);
    c.fillStyle = H.vent;       c.fillRect(x + 7, y + 1, 1, 7);
  }

  /* the smoke detector (Ceiling ref 5p): a small white disc and its LED */
  function lidDetector(c) {
    c.fillStyle = H.plasterShade;
    c.fillRect(DET_X, 8, 7, 1);
    c.fillStyle = P.detector;
    c.fillRect(DET_X + 1, 5, 5, 1);
    c.fillRect(DET_X, 6, 7, 2);
    c.fillRect(DET_X + 1, 8, 5, 1);
    c.fillStyle = P.detectorLed;
    c.fillRect(DET_X + 5, 7, 1, 1);
  }

  function bakeLid() {
    var t = makeCanvas(TILE_W, CEIL), c = t.ctx, r = mulberry32(3404), i;
    c.fillStyle = H.plasterMid;
    c.fillRect(0, 0, TILE_W, 19);
    /* 1-in-40, the room's density: any denser reads as noise */
    tooth(c, 0, 0, TILE_W, 19, r, 0.025, H.plasterDim, H.plasterLit);
    liftPools(c, 0, 19);
    lidRegister(c);
    lidDetector(c);
    for (i = 0; i < 2; i++) { lidCan(c, CAN_XS[i]); lidPendant(c, LAMP_XS[i], r); }
    /* THE MOULDING: four hard rows and then the outline on the kill line,
       the Living Room's exactly. They are the boundary, and the boundary is
       the level's one promise. */
    c.fillStyle = H.crown;      c.fillRect(0, 19, TILE_W, 1);
    c.fillStyle = H.plasterLit; c.fillRect(0, 20, TILE_W, 1);
    c.fillStyle = H.crownShade; c.fillRect(0, 21, TILE_W, 1);
    c.fillStyle = H.outline;    c.fillRect(0, 22, TILE_W, 2);
    return t;
  }

  /* THE MIRRORED CEILING, 480x28: the lid flipped so its row 23 lands on
     242 - the kill line is the same two outline rows, the crown runs under
     them and the pendants hang UP out of the plaster - and then four more
     rows of the same plaster, the same tooth and the same pools, because
     the band is 28 deep where the lid is 24. */
  function bakeBottom() {
    var t = makeCanvas(TILE_W, VH - FLOOR), c = t.ctx;
    c.save(); c.translate(0, CEIL); c.scale(1, -1); c.drawImage(T.lid.canvas, 0, 0); c.restore();
    c.fillStyle = H.plasterMid;
    c.fillRect(0, CEIL, TILE_W, VH - FLOOR - CEIL);
    tooth(c, 0, CEIL, TILE_W, VH - FLOOR - CEIL, mulberry32(3405), 0.025, H.plasterDim, H.plasterLit);
    liftPools(c, CEIL, VH - FLOOR - CEIL);
    return t;
  }

  /* ------------------------------------------------------- the field

     TWO CEILINGS CONVERGING ON A HORIZON. The owner picked the mirrored
     ceiling, "as if the room had folded", and all six Ceiling photographs
     are about one thing: the plaster plane, with the amber crackle-glass
     pendants on their black rods, the recessed cans, the angled soffit
     planes and the skylight's dusk. So the field is that plane, seen the
     way ref 5j and 5p see it - looking along the room at ceiling height,
     the underside of the ceiling running away from you to the far wall -
     and under the fold, the same plane upside down, running away to the
     same far wall. (The first cut of this field was the far KITCHEN wall,
     cabinets and hood and a plant, mirrored; at scale 2 it read as a
     kitchen with a dark line across it. It is gone.)

     THE PERSPECTIVE IS ONE NUMBER. A thing on the ceiling at depth z is
     drawn at y = HORIZON - K/z and slides past at a parallax that goes as
     1/z, so its row and its speed are tied: y = HORIZON - 222 * parallax.
     The lid's own lamps are overhead (parallax 1.0, off this scale
     entirely); the field carries three depths, each a baked 109-row tile
     with its own width so they never repeat together:
       NEAR  0.45   canopies on row 33, glass 11 wide, the big warm pools
       MID   0.25   canopies on row 77, glass 7 wide
       FAR   0.12   canopies on row 106, a 3x4 glint on a 3-row rod
     and everything on a layer is scaled by its parallax - the pendant's
     drop, the glass, the pool, the can - so the room recedes and does not
     merely shrink. The ceiling meets the far wall on row 124; the wall's
     strip runs 125..140 across the fold, and that is the horizon: a soft
     band at most, never a hard line a player could read as a ledge.

     The plane itself is a STATIC gradient: a flat surface sliding
     sideways looks exactly like itself, and a static sheet cannot boil.
     What moves is what is ON it, at its own depth's speed - including a
     sparse tooth baked into each layer's own rows, so the plaster has a
     surface that travels with the lamps hung from it. */
  var HORIZON = 132.5;
  var WALL_TOP = 125;
  var LAYER_PX = [0.12, 0.25, 0.45];
  var LAYER_W  = [240, 360, 480];

  /* a hex pigment mixed toward another, for the static gradient */
  function mixHex(a, b, k) {
    var x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16);
    var r = Math.round((x >> 16 & 255) + ((y >> 16 & 255) - (x >> 16 & 255)) * k);
    var g = Math.round((x >> 8 & 255) + ((y >> 8 & 255) - (x >> 8 & 255)) * k);
    var bl = Math.round((x & 255) + ((y & 255) - (x & 255)) * k);
    return 'rgb(' + r + ',' + g + ',' + bl + ')';
  }

  function rgbHex(rgb) {
    var m = rgb.match(/\d+/g);
    return '#' + ((1 << 24) + (+m[0] << 16) + (+m[1] << 8) + (+m[2])).toString(16).slice(1);
  }

  /* T.plane, VW x 218, drawn at 24: both ceilings and the far wall */
  function bakePlane() {
    var t = makeCanvas(VW, FIELD_H * 2), c = t.ctx, y, sy, k, col;
    for (y = 0; y < FIELD_H; y++) {
      sy = CEIL + y;
      k = (sy - CEIL) / (WALL_TOP - CEIL);
      col = k < 0.5 ? mixHex(P.planeNear, P.planeMid, ease(k * 2))
                    : mixHex(P.planeMid, P.planeFar, ease(Math.min(1, (k - 0.5) * 2)));
      /* and the far wall, blended in over the four rows either side of
         where the ceiling meets it */
      var wk = ease((sy - (WALL_TOP - 4)) / 8);
      if (wk > 0) col = mixHex(col.charAt(0) === '#' ? col : rgbHex(col), P.farWall, wk);
      c.fillStyle = col;
      c.fillRect(0, y, VW, 1);
      c.fillRect(0, FIELD_H * 2 - 1 - y, VW, 1);
    }
    return t;
  }

  /* a soft flattened ellipse of light on the plaster, per pixel */
  function poolOn(c, cx, cy, rx, ry, colour, peak) {
    for (var y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      for (var x = Math.floor(cx - rx); x <= Math.ceil(cx + rx); x++) {
        var dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1 || y < 0 || y >= FIELD_H) continue;
        c.fillStyle = rgba(colour, peak * (1 - ease(d)));
        c.fillRect(x, y, 1, 1);
      }
    }
  }

  /* the three glasses, by depth: near is the house's big shade, mid the
     Living Room's 7, far a glint */
  var SHADE11 = [[4, 3], [2, 7], [1, 9], [0, 11], [0, 11], [0, 11], [0, 11], [0, 11],
                 [1, 9], [1, 9], [2, 7], [2, 7], [3, 5], [4, 3]];
  var SHADE7 = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [1, 5], [2, 3]];
  var SHADE3 = [[1, 1], [0, 3], [0, 3], [1, 1]];

  /* one pendant hung from the plane at depth s (0 near, 1 mid, 2 far):
     its pool on the plaster round the canopy, the light in the air round
     the glass, the canopy disc, the rod, the glass */
  function fieldPendant(c, x, cy, s, r) {
    var shade = [SHADE11, SHADE7, SHADE3][s], rod = [13, 7, 3][s];
    var gw = shade[3][1], gx = x - (gw >> 1), gy = cy + 1 + rod, i, ri;
    poolOn(c, x + 0.5, cy + 1, [40, 24, 12][s], [10, 6, 3][s], H.lampGlow, [0.22, 0.17, 0.12][s]);
    /* the light in the air round the glass, kept low on the far two: a
       lamp down the room is a lamp, and a glowing dot the size of a
       feather sat too close to the spicy one at scale 1 */
    poolOn(c, x + 0.5, gy + shade.length / 2, [20, 10, 5][s], [20, 10, 5][s], H.lampGlow, [0.13, 0.07, 0.04][s]);
    c.fillStyle = s === 2 ? P.rodFar : H.lampRod;
    if (s === 0) { c.fillRect(x - 3, cy, 7, 1); c.fillRect(x - 2, cy + 1, 5, 1); }
    else if (s === 1) c.fillRect(x - 1, cy, 3, 1);
    else c.fillRect(x - 1, cy, 2, 1);
    c.fillRect(x, cy + 1, 1, rod);
    if (s === 0) { c.fillStyle = P.canopyRim; c.fillRect(x - 2, cy, 5, 1); }
    if (s < 2) {
      var g = makeCanvas(gw + 2, shade.length + 2), m = makeCanvas(gw + 2, shade.length + 2);
      rowsFill(g.ctx, shade, 1, 1, s === 0 ? H.lampGlass : P.glassMid);
      rowsFill(m.ctx, shade, 1, 1, '#ffffff');
      g.ctx.fillStyle = H.lampCrackle;
      for (i = 0; i < (s === 0 ? 12 : 3); i++) {
        ri = 1 + Math.floor(r() * (shade.length - 2));
        g.ctx.fillRect(1 + shade[ri][0] + Math.floor(r() * shade[ri][1]), 1 + ri, 1, 1);
      }
      g.ctx.fillStyle = s === 0 ? H.lampCore : P.coreMid;
      if (s === 0) g.ctx.fillRect(5, 5, 3, 4); else g.ctx.fillRect(4, 3, 1, 2);
      g.ctx.fillStyle = H.lampDark;
      g.ctx.fillRect(1 + shade[shade.length - 1][0], shade.length, shade[shade.length - 1][1], 1);
      ringUnder(g, m);
      c.drawImage(g.canvas, gx - 1, gy - 1);
    } else {
      rowsFill(c, SHADE3, gx, gy, P.glassFar);
      c.fillStyle = P.coreFar; c.fillRect(x, gy + 1, 1, 1);
    }
  }

  /* a recessed can on the plane, a flatter oval the further it is */
  function fieldCan(c, x, y, s) {
    poolOn(c, x + 0.5, y + 1, [14, 8, 4][s], [4, 2, 1.5][s], P.canGlow, [0.10, 0.08, 0.06][s]);
    if (s === 0) {
      rowsFill(c, [[2, 5], [0, 9], [2, 5]], x - 4, y, P.canMid);
      c.fillStyle = P.canCoreMid; c.fillRect(x - 2, y + 1, 5, 1);
    } else if (s === 1) {
      rowsFill(c, [[1, 3], [0, 5]], x - 2, y, P.canFar);
      c.fillStyle = P.canMid; c.fillRect(x - 1, y + 1, 3, 1);
    } else {
      c.fillStyle = P.canFar; c.fillRect(x - 1, y, 3, 1);
    }
  }

  /* A SKYLIGHT COFFER seen down the room (Ceiling ref 1, 3): an opening
     IN the plane, not a thing on it. The angled drywall surround is a soft
     lavender tint laid on the plaster - no edge of its own, because in ref
     1 the only crisp line is where the angled planes meet the opening -
     and the opening is a trapezoid, wider at its near (upper) edge, with
     that crisp edge all round. Through it: the dusk glass at the top, the
     well's far wall, cool-lit, under it. The first cut outlined the
     surround as well and it read as a tray floating in the room. */
  function fieldCoffer(c, cx, y0, w, h) {
    var j, hw, sky = Math.ceil(h * 0.55);
    poolOn(c, cx + 0.5, y0 + h / 2, w * 1.5, h * 1.2, P.lavFarLit, 0.24);
    for (j = 0; j < h; j++) {
      hw = Math.round(w - (w * 0.22) * j / Math.max(1, h - 1));
      c.fillStyle = j === 0 ? P.skyFarDeep : (j < sky ? P.skyFar : P.wellFar);
      c.fillRect(cx - hw, y0 + j, hw * 2, 1);
      c.fillStyle = P.lavFarEdge;
      c.fillRect(cx - hw - 1, y0 + j, 1, 1); c.fillRect(cx + hw, y0 + j, 1, 1);
    }
    c.fillStyle = P.lavFarEdge;
    c.fillRect(cx - w - 1, y0 - 1, w * 2 + 2, 1);
    /* a glint on the glass */
    c.fillStyle = P.skyGleam;
    c.fillRect(cx + Math.round(w * 0.3), y0 + 1, 2, 1);
  }

  /* A FAR SOFFIT: a bulkhead hanging off the plane near the far wall -
     its face toward you, the crisp arris, its underside running away, and
     angled ends (Ceiling ref 1's diagonal) */
  function fieldSoffit(c, x0, y0, w) {
    var j, inset;
    var rows = [P.lavFarDeep, P.lavFar, P.lavFarLit, P.lavFarDeep];
    for (j = 0; j < rows.length; j++) {
      inset = j < 2 ? 0 : j - 1;
      c.fillStyle = rows[j];
      c.fillRect(x0 + inset, y0 + j, w - inset * 2, 1);
      c.fillStyle = P.lavFarEdge;
      c.fillRect(x0 + inset - 1, y0 + j, 1, 1); c.fillRect(x0 + w - inset, y0 + j, 1, 1);
    }
  }

  /* the rest of the ceiling's furniture down the room, foreshortened: the
     register of Celing ref 4 (two banks of louvres, flattened to a
     sliver) and the smoke detector of ref 5p (a white oval) - dimmed by
     depth, never brighter than the plane's own lamps */
  function fieldRegister(c, x, y, s) {
    var w = s === 0 ? 14 : 8, h = s === 0 ? 4 : 2;
    c.fillStyle = s === 0 ? '#8a7f70' : '#77706a'; c.fillRect(x, y, w, h);
    c.fillStyle = s === 0 ? '#5a5048' : '#5c5650';
    c.fillRect(x + 1, y + 1, w - 2, 1);
    if (s === 0) { c.fillRect(x + 1, y + 2, w - 2, 1); c.fillStyle = '#8a7f70'; c.fillRect(x + 6, y + 1, 1, 2); }
  }
  function fieldDetector(c, x, y, s) {
    c.fillStyle = s === 0 ? '#bdb8ae' : '#9a958d';
    if (s === 0) { c.fillRect(x - 2, y, 5, 1); c.fillRect(x - 3, y + 1, 7, 1); c.fillStyle = '#9a6050'; c.fillRect(x + 2, y + 1, 1, 1); }
    else c.fillRect(x - 1, y, 3, 1);
  }

  /* sparse plaster tooth in a layer's own rows, as soft alpha specks */
  function fieldTooth(c, w, y0, y1, n, r) {
    for (var i = 0; i < n; i++) {
      c.fillStyle = r() < 0.5 ? 'rgba(255,236,200,0.08)' : 'rgba(20,14,8,0.09)';
      c.fillRect(Math.floor(r() * w), y0 + Math.floor(r() * (y1 - y0)), 1, 1);
    }
  }

  /* THE THREE LAYERS. Tile rows are screen rows - 24. */
  function bakeLayer(s) {
    var w = LAYER_W[s], t = makeCanvas(w, FIELD_H), c = t.ctx, r = mulberry32(3430 + s);
    if (s === 2) {
      /* NEAR, 480 at 0.45: two big pendants, two cans, a register, the
         detector, one coffer */
      fieldTooth(c, w, 0, 34, 260, r);
      fieldCoffer(c, 250, 4, 26, 8);
      fieldCan(c, 30, 12, 0); fieldCan(c, 420, 11, 0);
      fieldRegister(c, 60, 15, 0); fieldDetector(c, 310, 13, 0);
      fieldPendant(c, 140, 9, 0, r); fieldPendant(c, 362, 9, 0, r);
    } else if (s === 1) {
      /* MID, 360 at 0.25: two pendants, two cans, a register, a
         detector, one coffer */
      fieldTooth(c, w, 34, 66, 150, r);
      fieldCoffer(c, 196, 48, 15, 5);
      fieldCan(c, 120, 55, 1); fieldCan(c, 290, 54, 1);
      fieldRegister(c, 330, 57, 1); fieldDetector(c, 160, 56, 1);
      fieldPendant(c, 60, 53, 1, r); fieldPendant(c, 250, 53, 1, r);
    } else {
      /* FAR, 240 at 0.12: two glints, a can, a soffit bulkhead near the
         far wall */
      fieldTooth(c, w, 66, 98, 70, r);
      fieldSoffit(c, 156, 90, 48);
      fieldCan(c, 104, 84, 2);
      fieldPendant(c, 40, 82, 2, r); fieldPendant(c, 196, 81, 2, r);
    }
    return t;
  }

  /* ------------------------------------------------------- the light

     T.light, 480x270, one blit, the last call of drawBackdrop. Per-row
     and per-column rgba fills, smoothstepped, nothing else:
       warm off the lid, 0.11 at 24 to nothing at 80, and its mirror
       THE FOLD GLOOM: void, 0.16 at the horizon, nothing at 100 and 165
         - the far end of the room, where the lamps do not reach. Lighter
         than it was (0.26 over 92..173), because the plane now darkens
         toward the far wall on its own and the two together made a
         band dark enough to read as a ledge across the screen
       the two side columns, the Living Room's 64px */
  function bakeLight() {
    var t = makeCanvas(VW, VH), c = t.ctx, y, x, k;
    for (y = CEIL; y < CEIL + 56; y++) {
      k = 1 - ease((y - CEIL) / 56);
      c.fillStyle = rgba(H.lampGlow, 0.11 * k);
      c.fillRect(0, y, VW, 1);
      c.fillRect(0, mirror(y), VW, 1);
    }
    for (y = 100; y <= 165; y++) {
      k = ease(1 - Math.abs(y - HORIZON) / 33);
      c.fillStyle = rgba(H.void, 0.16 * k);
      c.fillRect(0, y, VW, 1);
    }
    for (x = 0; x < 64; x++) {
      k = 1 - ease(x / 64);
      c.fillStyle = rgba(H.void, 0.22 * k);
      c.fillRect(x, CEIL, 1, FLOOR - CEIL);
      c.fillRect(VW - 1 - x, CEIL, 1, FLOOR - CEIL);
    }
    return t;
  }

  /* the can's pool: bakePool's half-ellipse, narrower, shallower, cooler */
  function bakeCanPool() {
    var W = 56, HH = 20, t = makeCanvas(W, HH), c = t.ctx, x, y;
    for (y = 0; y < HH; y++) {
      for (x = 0; x < W; x++) {
        var dx = (x + 0.5 - W / 2) / (W / 2), dy = (y + 0.5) / HH;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1) continue;
        c.fillStyle = rgba(P.canGlow, 0.14 * (1 - ease(d)));
        c.fillRect(x, y, 1, 1);
      }
    }
    return t;
  }

  /* ------------------------------------------------------- the soffits

     A column is a block of drywall hanging off the ceiling (upper) or
     standing up out of the folded ceiling (lower): the soffits of Ceiling
     ref 1, 2 and 5j, with the skylight well of ref 3 and the register of
     ref 4 cut into the rarer two.

     TWO PLANES AND THE EDGE BETWEEN THEM. What makes the soffits in those
     photographs soffits is not that they are cream: it is that each one is
     two big planes meeting at a crisp edge, one warm-lit by the pendants
     and one lit pale lavender-white by the skylight, with nothing soft
     between them. The first cut of these columns was a cream face with a
     5px shade strip down the right, and the lead's word for it was a plain
     cream rectangle. So, left to right:
        0       the outline
        1       the face's own lit left arris
        2..20   THE FACE, warm cream (lum 216), tape joint and tooth
        21      the face darkening into the corner (196)
        22      THE ARRIS, the crisp edge where the planes meet (247)
        23..25  THE RETURN, the angled plane, pale lavender-white (221)
        26..29  ... turning away from the light (200)
        30..31  ... and further (170)
        32      its far edge (133)
        33      the outline
     and at the gap end the cap is the soffit's bevelled lower edge, with
     the arris stepping diagonally down across it - see bakeCap. */
  var SOFF_W = 34, SOFF_H = 48;
  var ARRIS_X = 22;

  function bakeSoffit(v) {
    var t = makeCanvas(SOFF_W, SOFF_H), c = t.ctx, r = mulberry32(3410 + v), i;
    function col(x, w, colour) { c.fillStyle = colour; c.fillRect(x, 0, w, SOFF_H); }
    col(0, 1, P.outline);
    col(1, 1, P.soffitLit);
    col(2, 19, P.soffitFace);
    col(21, 1, P.soffitCorner);
    col(ARRIS_X, 1, P.arris);
    col(23, 3, P.lavLit);
    col(26, 4, P.lavMid);
    col(30, 2, P.lavShade);
    col(32, 1, P.lavDeep);
    col(33, 1, P.outline);
    /* tooth on both planes, in each plane's own pigment */
    for (i = 0; i < 20; i++) {
      c.fillStyle = P.soffitTooth;
      c.fillRect(2 + Math.floor(r() * 19), Math.floor(r() * SOFF_H), 1, 1);
    }
    for (i = 0; i < 8; i++) {
      c.fillStyle = P.lavTooth;
      c.fillRect(24 + Math.floor(r() * 6), Math.floor(r() * SOFF_H), 1, 1);
    }
    /* the drywall tape joint (ref 1 shows one), across both planes: a dark
       line with the lit lip under it, the house joint - and the arris runs
       through it unbroken, because the corner bead is one piece */
    c.fillStyle = P.soffitShade; c.fillRect(2, 40, 19, 1);
    c.fillStyle = P.soffitLit;   c.fillRect(2, 41, 19, 1);
    c.fillStyle = P.lavShade;    c.fillRect(23, 40, 9, 1);
    c.fillStyle = P.lavLit;      c.fillRect(23, 41, 7, 1);
    return t;
  }

  /* THE SKYLIGHT WELL (Ceiling ref 3), ONE PER COLUMN, and a SUBSTANTIAL
     one: it takes the whole warm face - 20 of its 21 columns - for up to
     84 rows, the well's four walls cool-lit going in to a white frame, and
     inside the frame twelve columns of dusk, deepening upward, with a
     reflection and a star or two in it. The lead's note on the cut before
     this: the sky must be a real part of the column, not a slit. The walls
     are lit by the sky itself, so they are all cool: the one facing the
     lamps (right) palest, the top one, facing down and away, darkest.
     Baked lazily once per height, because the gap decides the height. */
  var WELL_W = 20, WELL_MAX = 84, WELL_MIN = 20, WELL_X = 1, WELL_PAD = 5;
  var wellCache = {};

  function bakeWell(h) {
    var t = makeCanvas(WELL_W, h), c = t.ctx, j, y, a, b, r = mulberry32(3460 + h);
    var IH = 3, IV = clamp(Math.round((h - 2) * 0.10), 3, 6);
    var gx0 = 1 + IH, gx1 = WELL_W - 2 - IH;          /* the frame's columns */
    var gy0 = 1 + IV, gy1 = h - 2 - IV;               /* and its rows        */
    c.fillStyle = P.soffitDeep; c.fillRect(0, 0, WELL_W, h);
    c.fillStyle = P.wellMid;    c.fillRect(1, 1, IH, h - 2);
    c.fillStyle = P.wellLit;    c.fillRect(WELL_W - 1 - IH, 1, IH, h - 2);
    for (j = 0; j < IV; j++) {
      a = 1 + Math.round(j * IH / IV); b = WELL_W - 1 - Math.round(j * IH / IV);
      c.fillStyle = P.wellShade; c.fillRect(a, 1 + j, b - a, 1);
      c.fillStyle = P.wellWall;  c.fillRect(a, h - 2 - j, b - a, 1);
    }
    /* the frame, and the dusk: deep at the top, the evening's last light
       low in the glass */
    c.fillStyle = P.skyFrame; c.fillRect(gx0, gy0, gx1 - gx0 + 1, gy1 - gy0 + 1);
    var gh = gy1 - gy0 - 1;
    for (y = 0; y < gh; y++) {
      var k = y / Math.max(1, gh - 1);
      c.fillStyle = k < 0.22 ? P.skyDeep : (k < 0.78 ? P.sky : P.skyLow);
      c.fillRect(gx0 + 1, gy0 + 1 + y, gx1 - gx0 - 1, 1);
    }
    /* a reflection across the glass: the thing that says GLASS, not HOLE */
    c.fillStyle = P.skyGleam;
    for (y = 0; y < 5 && gy0 + 4 + y < gy1 - 1; y++) c.fillRect(gx1 - 2 - y, gy0 + 4 + y, 1, 1);
    /* and a star or two, one per 30 rows of sky */
    c.fillStyle = P.star;
    for (j = 0; j < Math.max(1, Math.floor(gh / 30)); j++) {
      c.fillRect(gx0 + 2 + Math.floor(r() * (gx1 - gx0 - 4)), gy0 + 3 + Math.floor(r() * Math.max(1, gh - 6)), 1, 1);
    }
    return t;
  }

  function wellFor(h, up) {
    var key = (up ? 'u' : 'd') + h;
    if (!wellCache[key]) wellCache[key] = up ? flipV(bakeWell(h)) : bakeWell(h);
    return wellCache[key];
  }

  /* THE AIR REGISTER (Celing ref 4), the third kind of column: a
     painted steel grille set into the warm face, its frame catching the
     lamp along the top and left, and two banks of slanted louvres -
     exactly the two banks the photograph has. Cut once, at the lid end,
     like the well. 18x12. */
  var REG_W = 18, REG_H = 12, REG_X_OFF = 2, REG_PAD = 8;

  function bakeRegister(up) {
    var t = makeCanvas(REG_W, REG_H), c = t.ctx, b, j, k;
    c.fillStyle = P.regFace;    c.fillRect(0, 0, REG_W, REG_H);
    c.fillStyle = P.soffitLit;  c.fillRect(0, 0, REG_W, 1); c.fillRect(0, 0, 1, REG_H);
    c.fillStyle = P.soffitDeep; c.fillRect(0, REG_H - 1, REG_W, 1); c.fillRect(REG_W - 1, 0, 1, REG_H);
    c.fillStyle = P.regShade;   c.fillRect(1, REG_H - 2, REG_W - 2, 1); c.fillRect(REG_W - 2, 1, 1, REG_H - 2);
    for (b = 0; b < 2; b++) {
      for (j = 0; j < 6; j++) {
        for (k = 0; k < 3; k++) {
          c.fillStyle = P.ventSlot;
          c.fillRect(3 + j * 2 + k, 2 + b * 4 + (2 - k), 1, 1);
        }
      }
    }
    c.fillStyle = P.soffitDeep; c.fillRect(8, 1, 2, 1); c.fillRect(8, REG_H - 2, 2, 1);
    return up ? flipV(t) : t;
  }

  /* THE CAP: THE SOFFIT'S BEVELLED LOWER EDGE, 42x9 at x-4, every pixel
     inside the box the cap has always had. Read top to bottom: the outline
     where it meets the column; three rows of LIP, the face's warm cream on
     the left and the return's lavender on the right; a bright ARRIS row
     where the lip turns under; three rows of the UNDERSIDE, the plane you
     see from below, cool and lit by the room's lamps; the outline. The
     corner arris that runs down the column carries on across the lip and
     the underside as a DIAGONAL, a pixel right per row - the mitre where
     the face, the return and the underside all meet, which is the crisp
     diagonal of ref 1 and 2 - and the bottom corners are chamfered three,
     two and one, so the lip has the bevel's silhouette and not a bar's.
     The lower column's cap is this one upside down. */
  function bakeCap() {
    var W = 42, HH = 9, t = makeCanvas(W, HH), c = t.ctx, i, k, ax;
    var AX = ARRIS_X + 4;                 /* the column's arris, in cap columns */
    c.fillStyle = P.outline; c.fillRect(0, 0, W, HH);
    for (i = 1; i <= 7; i++) {
      ax = AX + (i - 1);                  /* the diagonal: one right per row */
      var warm, cool;
      if (i <= 3) { warm = i === 1 ? P.soffitLit : P.soffitFace; cool = i === 1 ? P.lavLit : P.lavMid; }
      else if (i === 4) { warm = P.arris; cool = P.lavLit; }
      else { warm = [P.lavLit, P.lavMid, P.lavShade][i - 5]; cool = [P.lavMid, P.lavShade, P.lavDeep][i - 5]; }
      c.fillStyle = warm; c.fillRect(1, i, ax - 1, 1);
      c.fillStyle = cool; c.fillRect(ax + 1, i, W - 2 - ax, 1);
      c.fillStyle = P.arris; c.fillRect(ax, i, 1, 1);
    }
    /* the lip's own left arris, and a tick of tooth so it is not ruled */
    c.fillStyle = P.arris; c.fillRect(1, 1, 1, 3);
    c.fillStyle = P.soffitTooth; c.fillRect(9, 2, 2, 1); c.fillRect(19, 3, 2, 1);
    /* the chamfered bottom corners, and the top two clipped a pixel */
    var CUT = [3, 2, 1];
    for (k = 0; k < CUT.length; k++) {
      c.clearRect(k, HH - CUT[k], 1, CUT[k]);
      c.clearRect(W - 1 - k, HH - CUT[k], 1, CUT[k]);
      c.fillStyle = P.outline;
      c.fillRect(k, HH - 1 - CUT[k], 1, 1); c.fillRect(W - 1 - k, HH - 1 - CUT[k], 1, 1);
    }
    c.clearRect(0, 0, 1, 1); c.clearRect(W - 1, 0, 1, 1);
    return t;
  }

  /* ------------------------------------------------------- lint

     Three shapes, all grey, each baked on an ODD square sheet so quarter
     turns land pixel on pixel (the Couch's popcorn method).

     THEY ARE BUILT FROM LUMPS, NOT DRAWN FROM GRIDS. The brief's three
     grids came out on screen as grey pebbles - a solid blob in a black
     ring is a stone at any size - and the thing that says FLUFF at nine
     pixels is a silhouette that goes in and out every two pixels, each
     lump catching its own light, and a hair or two sticking out of it.
     So each shape is a handful of overlapping discs ([cx, cy, r] on the
     sheet); a pixel belongs to whichever disc it is deepest inside and
     takes its tone from where it sits in THAT disc (lit up and left,
     shaded down and right), so every lump reads as its own tuft.

     The ring is lintRing and not the outline: a soft dark that still
     holds the grey off the wall (lum ~70 against a field of ~128), but
     that does not cut the shape out with a knife. And the hairs go on
     AFTER the ring, unringed - a hair, not a spike. */
  var LINT_LUMPS = [
    /* TUFT, on 11: a loose curl */
    [[3.9, 5.3, 2.0], [6.1, 4.3, 1.9], [7.6, 6.1, 1.7], [5.3, 6.9, 1.9], [2.9, 7.3, 1.2]],
    /* DUST BUNNY, on 13 */
    [[5.0, 5.4, 2.6], [7.9, 5.0, 2.5], [6.4, 7.7, 2.6], [3.7, 7.7, 1.9], [9.3, 7.5, 1.9],
     [6.6, 3.7, 1.6]],
    /* CLUMP, on 15: a wad off the top of a cabinet */
    [[5.2, 6.4, 2.4], [8.0, 5.6, 2.6], [10.5, 6.9, 2.2], [4.0, 8.7, 2.0], [7.0, 8.9, 2.6],
     [10.0, 9.2, 2.0], [7.4, 3.9, 1.5]]
  ];
  var LINT_HAIRS = [
    [[7, 3], [8, 2], [9, 2]],
    [[2, 9], [1, 10], [10, 3], [11, 2], [12, 2], [5, 6], [6, 6], [7, 7]],
    [[3, 5], [2, 4], [1, 4], [11, 11], [12, 11], [13, 12], [8, 7], [9, 7]]
  ];
  var LINT_SHEET = [11, 13, 15];
  var LINT_BOX = [];       /* [cx, cy, w, h] about the sheet centre, filled in by build */
  var LINT_W = [];

  function bakeLintSet(s) {
    var S = LINT_SHEET[s], base = makeCanvas(S, S), m = makeCanvas(S, S);
    var lumps = LINT_LUMPS[s], x, y, i, f, t, set;
    var x0 = S, y0 = S, x1 = -1, y1 = -1;
    for (y = 0; y < S; y++) {
      for (x = 0; x < S; x++) {
        var best = -1, bi = -1;
        for (i = 0; i < lumps.length; i++) {
          var dx = x + 0.5 - lumps[i][0], dy = y + 0.5 - lumps[i][1];
          var marg = lumps[i][2] - Math.sqrt(dx * dx + dy * dy);
          if (marg > best) { best = marg; bi = i; }
        }
        if (best < 0) continue;
        var L0 = lumps[bi];
        var k = ((x + 0.5 - L0[0]) * 0.62 + (y + 0.5 - L0[1]) * 0.78) / L0[2];
        base.ctx.fillStyle = k < -0.42 ? P.lintHi : (k > 0.72 ? P.lintDeep : (k > 0.32 ? P.lintShade : P.lint));
        base.ctx.fillRect(x, y, 1, 1);
        m.ctx.fillStyle = '#ffffff';
        m.ctx.fillRect(x, y, 1, 1);
        x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
      }
    }
    /* the ring, recoloured soft */
    var ring = DiningRoom.ringOf(m, S, S);
    ring.ctx.globalCompositeOperation = 'source-in';
    ring.ctx.fillStyle = P.lintRing;
    ring.ctx.fillRect(0, 0, S, S);
    base.ctx.globalCompositeOperation = 'destination-over';
    base.ctx.drawImage(ring.canvas, 0, 0);
    base.ctx.globalCompositeOperation = 'source-over';
    base.ctx.fillStyle = P.hair;
    for (i = 0; i < LINT_HAIRS[s].length; i++) base.ctx.fillRect(LINT_HAIRS[s][i][0], LINT_HAIRS[s][i][1], 1, 1);
    /* the box: the lumps' own extent, a pixel in all round - dodging is
       meant to be fair - about the sheet's centre */
    LINT_BOX[s] = [(x0 + x1 + 1) / 2 - S / 2, (y0 + y1 + 1) / 2 - S / 2,
                   Math.max(3, x1 - x0 - 1), Math.max(3, y1 - y0 - 1)];
    LINT_W[s] = x1 - x0 + 3;
    set = [base];
    for (f = 1; f < 4; f++) {
      t = makeCanvas(S, S);
      t.ctx.translate(S / 2, S / 2);
      t.ctx.rotate(f * Math.PI / 2);
      t.ctx.translate(-S / 2, -S / 2);
      t.ctx.drawImage(base.canvas, 0, 0);
      set.push(t);
    }
    return set;
  }

  /* ------------------------------------------------------- feathers

     9x15, one grid, two inks, three lean frames. Q quill, B barb, L barb
     light, D barb deep. The first grid was a symmetrical leaf and read as
     a leaf (and, in purple, as a gem). What says FEATHER at this size is
     a quill that CURVES, a vane wider on one side than the other, two
     splits in it where the barbs have come apart, and a little down at
     the foot of the quill. The lean is a shear about the quill's middle
     row - rows 0..4 one pixel over, 5..9 still, 10..14 one back - so the
     feather rocks about its own centre instead of sliding; the other lean
     is the same sheet mirrored. */
  var FEATHER = [
    '......LL.',
    '.....LBB.',
    '....LBQB.',
    '...LBBQB.',
    '...BBQBB.',
    '..LBBQBD.',
    '..BB.QB..',
    '.BBBBQBD.',
    '.LBBQBBD.',
    '.BB.QBD..',
    '..BBQBD..',
    '.BBDQD...',
    '..D.Q.D..',
    '....Q....',
    '...Q.....'
  ];
  var FEATHER_SW = 15, FEATHER_SH = 17;

  function bakeFeather(kind, lean) {
    var t = makeCanvas(FEATHER_SW, FEATHER_SH), m = makeCanvas(FEATHER_SW, FEATHER_SH);
    var ink = kind === 0 ? { Q: P.quillHot, B: P.hot, L: P.hotHi, D: P.hotDeep }
                         : { Q: P.quillWhirl, B: P.whirl, L: P.whirlHi, D: P.whirlDeep };
    for (var r = 0; r < FEATHER.length; r++) {
      var sh = lean ? 1 - Math.floor(r / 5) : 0;
      paintGrid(t, m, [FEATHER[r]], 2 + sh, 1 + r, ink);
    }
    ringUnder(t, m);
    return t;
  }

  /* ------------------------------------------------------- noodles

     The patch is the flattened tangle pressed against the underside of
     the plaster, 19x7, drawn with its top row on 24 directly under the
     outline - so its ring is sides and bottom only, never on 23. */
  var PATCH = [[2, 15], [1, 17], [0, 19], [0, 19], [1, 17], [4, 11], [7, 5]];

  function bakePatch() {
    var t = makeCanvas(21, 8), m = makeCanvas(21, 8), c = t.ctx, r = mulberry32(3420), i;
    rowsFill(c, PATCH, 1, 0, P.noodle);
    rowsFill(m.ctx, PATCH, 1, 0, '#ffffff');
    /* the strands crossing, as three little shade arcs */
    c.fillStyle = P.noodleShade;
    c.fillRect(4, 2, 1, 1); c.fillRect(5, 1, 2, 1); c.fillRect(7, 2, 1, 1);
    c.fillRect(10, 3, 1, 1); c.fillRect(11, 2, 2, 1); c.fillRect(13, 3, 1, 1);
    c.fillRect(7, 4, 1, 1); c.fillRect(8, 5, 2, 1); c.fillRect(10, 4, 1, 1);
    c.fillStyle = P.noodleHi;
    for (i = 0; i < 6; i++) {
      var ri = Math.floor(r() * 5);
      c.fillRect(1 + PATCH[ri][0] + 1 + Math.floor(r() * (PATCH[ri][1] - 2)), ri, 1, 1);
    }
    ringUnder(t, m);
    return t;
  }

  /* ------------------------------------------------------- the pole

     THE HOOK (Pole ref), 10x10, the grey plastic J opening LEFT - toward
     the doodad, which is the whole of its character: it is looking. The
     photograph's opens the other way; this one is turned to face you. */
  var HOOK = [
    '...XXXXX..',
    '.XXXXXXXXX',
    'XXXX..XXXX',
    'XXX...XXXX',
    'XX....XXXX',
    'XX....XXXX',
    '.X....XXXX',
    '......XXXX',
    '......XXXX',
    '......XXXX'
  ];

  /* drawn at (sx-8, top-1): grid column 0 lands on sx-7, so the shank
     (columns 6..9) sits square on the inner tube's metal, sx-1..sx+2 */
  function bakeHook() {
    var t = makeCanvas(12, 12), m = makeCanvas(12, 12), c = t.ctx;
    paintGrid(t, m, HOOK, 1, 1, { X: P.hook });
    c.fillStyle = P.hookLit;
    c.fillRect(4, 1, 5, 1);                         /* the crown of the arch  */
    c.fillRect(2, 2, 3, 1);
    c.fillRect(8, 4, 1, 7);                         /* the shank's lit face   */
    c.fillStyle = P.hookShade;
    c.fillRect(10, 3, 1, 8);                        /* the shank's far side   */
    c.fillRect(4, 3, 2, 1); c.fillRect(7, 3, 1, 1); /* under the arch         */
    c.fillRect(1, 4, 1, 3);                         /* the tip's outer edge   */
    c.fillRect(2, 7, 1, 1);                         /* and its end            */
    ringUnder(t, m);
    return t;
  }

  /* plaster dust knocked off at a contact: four frames, tight to wide */
  function bakePuffs() {
    var PUFF = [
      [[5, 0, 1], [7, 0, 0], [6, 1, 1]],
      [[3, 1, 0], [5, 0, 1], [8, 1, 1], [9, 0, 0], [6, 2, 0]],
      [[2, 2, 0], [4, 3, 1], [7, 3, 0], [10, 2, 0], [1, 4, 0], [11, 4, 1]],
      [[0, 5, 0], [4, 6, 0], [9, 6, 0], [12, 5, 0]]
    ];
    var out = [], f, i;
    for (f = 0; f < PUFF.length; f++) {
      var t = makeCanvas(13, 8), c = t.ctx;
      for (i = 0; i < PUFF[f].length; i++) {
        var p = PUFF[f][i];
        c.fillStyle = p[2] ? FX.puffHi : (f >= 2 ? FX.ground : FX.puff);
        c.fillRect(p[0], p[1], 1, 1);
      }
      out.push(t);
    }
    return out;
  }

  /* ------------------------------------------------------- build */

  function build() {
    /* the Living Room first: the pendant pool and the crown's shadow are
       its, and it guards itself */
    LivingRoom.build();
    T.lid = bakeLid();
    T.bottom = bakeBottom();
    T.plane = bakePlane();
    T.layer = [bakeLayer(0), bakeLayer(1), bakeLayer(2)];
    T.layerUp = [flipV(T.layer[0]), flipV(T.layer[1]), flipV(T.layer[2])];
    T.light = bakeLight();
    T.pool = LivingRoom.tiles.pool;
    T.poolUp = flipV(T.pool);
    T.canPool = bakeCanPool();
    T.canPoolUp = flipV(T.canPool);
    T.crownShadeUp = DiningRoom.bakeShade(H.crownShade, 0.31, 10, true);

    T.soffit = [bakeSoffit(0), bakeSoffit(1)];
    T.soffitUp = [flipV(T.soffit[0]), flipV(T.soffit[1])];
    T.register = [bakeRegister(false), bakeRegister(true)];
    T.capDown = bakeCap();
    T.capUp = flipV(T.capDown);

    T.lint = [bakeLintSet(0), bakeLintSet(1), bakeLintSet(2)];
    var hotLean = bakeFeather(0, true), whirlLean = bakeFeather(1, true);
    /* [upright, leaning right, leaning left] */
    T.feather = [[bakeFeather(0, false), hotLean, flipH(hotLean)],
                 [bakeFeather(1, false), whirlLean, flipH(whirlLean)]];
    T.patch = bakePatch();
    T.hook = bakeHook();
    T.puff = bakePuffs();
  }

  /* ------------------------------------------------------- drawing */

  /* the pools under every lamp on screen, both bands, riding the lid's
     scroll because a pool that stayed put while its lamp slid past would
     read as a stain on the screen */
  function drawPools(ctx, scroll) {
    var off = wrap(scroll, TILE_W), k, i, x;
    for (k = -1; k <= 1; k++) {
      for (i = 0; i < 2; i++) {
        x = Math.round(LAMP_XS[i] - off + k * TILE_W);
        if (x > -60 && x < VW + 60) {
          DiningRoom.blitBelowCeil(ctx, T.pool.canvas, x - 48, 18);
          blitAboveFloor(ctx, T.poolUp.canvas, x - 48, mirror(18) - 35);
        }
        x = Math.round(CAN_XS[i] - off + k * TILE_W);
        if (x > -40 && x < VW + 40) {
          DiningRoom.blitBelowCeil(ctx, T.canPool.canvas, x - 28, 18);
          blitAboveFloor(ctx, T.canPoolUp.canvas, x - 28, mirror(18) - 19);
        }
      }
    }
  }

  /* the two ceilings and the far wall, the three depths of lamps far to
     near and each one's mirror, the pools of the lid's own lamps, the
     light, and the shadow the mirrored crown throws up into the room -
     here rather than in drawFloor so it falls on the plane and not on the
     columns, exactly as the lid's crownShade does at the top */
  function drawField(ctx, scroll, slow) {
    ctx.drawImage(T.plane.canvas, 0, CEIL);
    for (var i = 0; i < 3; i++) {
      if (slow && i === 2) continue;
      tileX(ctx, T.layer[i].canvas, scroll * LAYER_PX[i] * (slow || 1), CEIL);
      tileX(ctx, T.layerUp[i].canvas, scroll * LAYER_PX[i] * (slow || 1), FOLD_Y);
    }
  }

  function drawBackdrop(ctx, scroll) {
    drawField(ctx, scroll, 0);
    drawPools(ctx, scroll);
    ctx.drawImage(T.light.canvas, 0, 0);
    ctx.drawImage(T.crownShadeUp.canvas, 0, FLOOR - 10);
  }

  /* a calm version for the menus: the two ceilings with only their far
     and middle lamps, drifting at half speed, the light, the two bands. No
     near lamps, no columns, no pole - somewhere quiet for the boards. */
  function drawMenuBackdrop(ctx, scroll) {
    drawField(ctx, scroll, 0.5);
    drawPools(ctx, scroll * 0.6);
    ctx.drawImage(T.light.canvas, 0, 0);
    ctx.drawImage(T.crownShadeUp.canvas, 0, FLOOR - 10);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.lid.canvas, scroll, 0);
    ctx.drawImage(LivingRoom.tiles.crownShade.canvas, 0, CEIL);
  }

  function drawFloor(ctx, scroll) {
    tileX(ctx, T.bottom.canvas, scroll, FLOOR);
  }

  /* ------------------------------------------------------- pillars */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), v = ob.variant || 0;
    var topH = ob.gapY - CEIL, botY = ob.gapY + ob.gapH, botH = FLOOR - botY;
    if (topH > 0) DiningRoom.drawColumn(ctx, T.soffit[v & 1].canvas, x, CEIL, SOFF_W, topH);
    if (botH > 0) DiningRoom.drawColumn(ctx, T.soffitUp[v & 1].canvas, x, botY, SOFF_W, botH);
    if (v === 1) {
      /* the well, at the lid end of each column (the mirrored one at the
         bottom end of its own) - see bakeWell */
      var wh = Math.min(WELL_MAX, topH - 9 - 2 * WELL_PAD);
      if (wh >= WELL_MIN) ctx.drawImage(wellFor(wh, false).canvas, x + WELL_X, CEIL + WELL_PAD);
      wh = Math.min(WELL_MAX, botH - 9 - 2 * WELL_PAD);
      if (wh >= WELL_MIN) ctx.drawImage(wellFor(wh, true).canvas, x + WELL_X, FLOOR - WELL_PAD - wh);
    } else if (v === 2) {
      /* the register, likewise, where the column is long enough to hold it */
      if (topH - 9 >= REG_H + 2 * REG_PAD) ctx.drawImage(T.register[0].canvas, x + REG_X_OFF, CEIL + REG_PAD);
      if (botH - 9 >= REG_H + 2 * REG_PAD) ctx.drawImage(T.register[1].canvas, x + REG_X_OFF, FLOOR - REG_PAD - REG_H);
    }
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* the hard cast shadow on the far wall: with a dusk field this is the
       second half of what holds a cream column off it */
    if (topH > 9) Tint.rect(ctx, x + SOFF_W, CEIL, 4, topH - 9, P.void, 6);
    if (botH > 9) Tint.rect(ctx, x + SOFF_W, botY + 9, 4, botH - 9, P.void, 6);
  }

  /* ------------------------------------------------------- the pole

     THE EXTENSION CURVE, E (0..1) against the pole's own screen x:

       sx > 440          0         still under the band
       440 .. 350        RISING    smoothstep, so it arrives gently -
                                   "curiously"
       350 .. 250        UP        hook on the plaster, prodding: two taps
                                   and a search along the ceiling
       250 .. 80         RETREATING linear, a pole being pulled down does
                                   not ease
       sx <= 80          0         gone

     THE RETREAT RUNS ALL THE WAY TO 80 AND THAT IS THE POINT. The first
     cut had it gone by 190, which put every lethal pixel it ever made 54px
     right of the doodad's usual column (x 56..176): scenery, which the
     owner did not ask for ("If hit, it ends the run"). Now a doodad at
     X_START 116 (right edge 127) first meets it at sx ~133 with E ~0.31,
     the hook at row ~174 - the lower part of the lane is shut as it passes
     and the hook is still sinking; one pushed forward to 176 meets it two
     thirds up; and one hanging at the far left (x <= ~60, right edge 71)
     never meets it at all, because it is gone at 80. STAY LEFT. IT COMES
     DOWN. That is literally true and it is the guaranteed escape.

     Speed changes the TIME only: every position above is the same at
     either speed, because E is a function of sx. At 118 / 180 px/s the
     rise takes 0.76 / 0.50s, the stand 0.85 / 0.56s and the retreat 1.44
     / 0.94s.

     MEASURED, not reasoned: autopiloted runs with spare lives, every lost
     life put down to the box the doodad was in on the frame it was hurt.
       - the stock autopilot, flying at X_START and blind to the pole, with
         the pole forced from the first pillar at 0.4 a bay: 62 poles, 49
         met, 1 life lost to a pole in 400s. At the shipping tune over
         900s: 179 poles, 125 met, 1 life lost.
       - a pilot that keeps above the hook where it will meet it: none.
       - a pilot that holds LEFT whenever a pole is up ahead: met 0 of 63.
       - a pole-blind doodad sitting forward at x 176: met 42, the hook
         two thirds up (E 0.65), 19 lives lost in 400s.
     So it is harmless to a doodad that stays left, a real threat to one
     that has gone forward after a feather, and far under the one death in
     40s that would be unfair. And `deflect`: a spinning doodad held in the
     raised stretch bounced off a pole 23-27 times in 38s and never lost a
     life to one while the spin ran. */
  var POLE_IN = 440, POLE_UP = 350, POLE_OUT = 250, POLE_GONE = 80;
  var POLE_RISE = FLOOR - CEIL;       /* 218: the hook's top travels the playfield */
  var POLE_U = 118;                   /* the inner tube's length fully out        */
  /* where the hook meets the plaster: the arrival, then two taps */
  var CONTACTS = [350, 310, 274];

  /* the hook dips three rows and comes back, twice, after the arrival */
  function poleTap(sx) {
    var d = 326 - sx, e = 290 - sx;
    if (d >= 0 && d <= 16) return 3 * Math.sin(Math.PI * d / 16);
    if (e >= 0 && e <= 16) return 3 * Math.sin(Math.PI * e / 16);
    return 0;
  }

  function poleE(sx) {
    if (sx > POLE_IN || sx <= POLE_GONE) return 0;
    if (sx > POLE_UP) return ease((POLE_IN - sx) / (POLE_IN - POLE_UP));
    if (sx > POLE_OUT) return 1 - poleTap(sx) / POLE_RISE;
    return (sx - POLE_GONE) / (POLE_OUT - POLE_GONE);
  }

  /* the search along the ceiling while it is up: +3 at 325, back through
     0 at 300, -3 at 275, 0 at 250 */
  function poleLean(sx) {
    if (sx > POLE_UP || sx <= POLE_OUT) return 0;
    return Math.round(3 * Math.sin(TAU * (POLE_UP - sx) / 100));
  }

  /* everything the draw and the boxes need, from one number. `sx` is the
     pole's axis and it is ROUNDED here, once, so the picture and the box
     are the same frame's answer to the pixel. */
  function poleGeom(ob) {
    var sx = Math.round(ob.x) + 9, E = poleE(sx);
    if (E <= 0) return null;
    var top = FLOOR - Math.round(POLE_RISE * E);
    var U = Math.round(POLE_U * E);
    return { sx: sx, E: E, top: top, U: U, lean: poleLean(sx),
             collarY: top + 14 + U, lowY: top + 20 + U };
  }

  /* the inner tube is sheared in three: the segment by the ferrule takes
     the whole lean, the one by the collar a third of it */
  function segOff(lean, k) { return Math.round(lean * (3 - k) / 3); }

  function pushClip(out, x, y, w, h) {
    if (y >= FLOOR) return;
    if (y + h > FLOOR) h = FLOOR - y;
    if (h > 0 && w > 0) out.push([x, y, w, h]);
  }

  /* THE POLE'S PROPORTIONS are Pole ref's and not the brief's first
     figures: the outer tube carries six pixels of metal, the inner four,
     the collar is ten wide and the hook's shank sits on the inner tube.
     At the brief's four and two it was a wire beside a 34px column - it
     read, but not instantly, and the photograph's pole is a chunky thing.
     Every box is the METAL only; the outline is forgiven, as it is on
     every column in the game. */
  function poleBoxes(ob, out) {
    var g = poleGeom(ob);
    if (!g) return out;
    var sx = g.sx, k, y0, y1;
    pushClip(out, sx - 6 + g.lean, g.top, 9, 10);             /* the hook    */
    pushClip(out, sx - 2 + g.lean, g.top + 10, 6, 4);         /* the ferrule */
    for (k = 0; k < 3; k++) {                                 /* inner tube  */
      y0 = g.top + 14 + Math.floor(k * g.U / 3);
      y1 = g.top + 14 + Math.floor((k + 1) * g.U / 3);
      if (y1 > y0) pushClip(out, sx - 1 + segOff(g.lean, k), y0, 4, y1 - y0);
    }
    pushClip(out, sx - 3, g.collarY, 8, 6);                   /* the collar  */
    pushClip(out, sx - 2, g.lowY, 6, FLOOR - g.lowY);         /* outer tube  */
    return out;
  }

  /* one row-run of a tube: a list of pigments, left to right */
  function tubeRun(ctx, x, y, h, cols) {
    for (var i = 0; i < cols.length; i++) { ctx.fillStyle = cols[i]; ctx.fillRect(x + i, y, 1, h); }
  }
  /* the two tubes, left to right: the outer one's highlight sits a pixel
     left of centre, the way brushed aluminium takes a lamp above and to
     the left */
  var OUTER = [P.outline, P.poleMid, P.poleLit, P.poleLit, P.poleMid, P.poleMid, P.poleShade, P.outline];
  var INNER = [P.outline, P.poleLit, P.poleMid, P.poleMid, P.poleShade, P.outline];

  function drawPole(ctx, ob) {
    var g = poleGeom(ob);
    if (!g) return;
    var sx = g.sx, lean = g.lean, top = g.top, k, y, y0, y1, i;

    /* a narrow shadow on the far wall behind the tubes */
    if (g.collarY < FLOOR) Tint.rect(ctx, sx + 5, g.collarY + 1, 2, FLOOR - g.collarY - 1, P.void, 5);

    /* THE OUTER TUBE, up out of the folded ceiling - and the drilled holes
       of Pole ref every 40 rows down from the collar, which travel up with
       it, so the eye can see it extending and not just being uncovered */
    if (g.lowY < FLOOR) {
      tubeRun(ctx, sx - 3, g.lowY, FLOOR - g.lowY, OUTER);
      for (y = g.lowY + 12; y < FLOOR - 3; y += 40) {
        ctx.fillStyle = P.collarDeep; ctx.fillRect(sx, y, 2, 2);
        ctx.fillStyle = P.poleLit;    ctx.fillRect(sx, y + 2, 2, 1);
      }
    }

    /* THE INNER TUBE, thinner, sheared in three by the lean */
    for (k = 0; k < 3; k++) {
      y0 = top + 14 + Math.floor(k * g.U / 3);
      y1 = top + 14 + Math.floor((k + 1) * g.U / 3);
      if (y1 <= y0 || y0 >= FLOOR) continue;
      tubeRun(ctx, sx - 2 + segOff(lean, k), y0, y1 - y0, INNER);
    }
    /* its lock holes, one every 32 rows */
    for (y = top + 24; y < g.collarY - 3 && y < FLOOR; y += 32) {
      k = Math.min(2, Math.floor((y - top - 14) * 3 / Math.max(1, g.U)));
      ctx.fillStyle = P.collarDeep;
      ctx.fillRect(sx + segOff(lean, k), y, 1, 2);
    }

    /* THE COLLAR, the grey plastic sleeve where the two tubes meet */
    if (g.collarY < FLOOR) {
      var cx = sx - 4, cy = g.collarY;
      ctx.fillStyle = P.outline;    ctx.fillRect(cx, cy, 10, 6);
      ctx.fillStyle = P.collarLit;  ctx.fillRect(cx + 1, cy + 1, 8, 1);
      ctx.fillStyle = P.collar;     ctx.fillRect(cx + 1, cy + 2, 8, 2);
      ctx.fillStyle = P.collarDeep; ctx.fillRect(cx + 1, cy + 4, 8, 1); ctx.fillRect(cx + 7, cy + 2, 2, 2);
    }

    /* THE FERRULE, the hook's plastic socket on the tube's end */
    var fx = sx - 3 + lean, fy = top + 10;
    if (fy < FLOOR) {
      ctx.fillStyle = P.outline;    ctx.fillRect(fx, fy, 8, 4);
      ctx.fillStyle = P.collarLit;  ctx.fillRect(fx + 1, fy, 6, 1);
      ctx.fillStyle = P.collar;     ctx.fillRect(fx + 1, fy + 1, 6, 2);
      ctx.fillStyle = P.collarDeep; ctx.fillRect(fx + 1, fy + 3, 6, 1);
    }

    /* THE HOOK */
    ctx.drawImage(T.hook.canvas, sx - 8 + lean, top - 1);

    /* plaster dust at each contact, keyed to sx: deterministic, pause-safe,
       on screen for 40px of travel (0.22..0.34s) */
    for (i = 0; i < CONTACTS.length; i++) {
      var d = CONTACTS[i] - sx;
      if (d >= 0 && d < 40) ctx.drawImage(T.puff[Math.floor(d / 10)].canvas, sx - 6 + lean, CEIL);
    }
  }

  /* THE POLE GOES THROUGH THE FOLDED CEILING. Drawn in the overlay, over
     the bottom band: the outer tube carries on down through the moulding
     into a dark hole in the plaster, with a lit lip under it. It reads
     only ob.x, which holds still whenever the run is not stepping, so it
     is right on every frame the scene draws - GET READY, pause, the
     tumble and the results. */
  function drawOverlay(ctx, obstacles) {
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'spike' || ob.kind !== 'pole') continue;
      var sx = Math.round(ob.x) + 9;
      if (poleE(sx) <= 0) continue;
      ctx.fillStyle = P.hole;       ctx.fillRect(sx - 5, FLOOR + 6, 12, 2);
      ctx.fillStyle = P.plasterLit; ctx.fillRect(sx - 5, FLOOR + 8, 12, 1);
      tubeRun(ctx, sx - 3, FLOOR, 7, OUTER);
    }
  }

  /* THE TOCK. The engine plays roles and the art names them, so the room
     counts how many of its three contacts each pole has passed - in the
     ledger, per run, never in module state - and asks for one tock each
     time that number goes up. */
  function stepWorld(dt, obstacles, run) {
    var lg = run.ledger;
    var taps = lg.poleTaps || (lg.poleTaps = {});
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'spike' || ob.kind !== 'pole') continue;
      var sx = Math.round(ob.x) + 9, n = 0;
      for (var k = 0; k < CONTACTS.length; k++) if (sx <= CONTACTS[k]) n++;
      if (n > (taps[ob.id] || 0)) { taps[ob.id] = n; lg.cry = 'tock'; }
    }
  }

  /* ------------------------------------------------------- drops

     Everything that draws, steps or boxes a drop reads ob.spicy and
     ob.whirl LIVE, because the engine sets ob.whirl after makeDrop has
     returned. Gold and sour are never rolled here; if one ever arrived it
     would be painted as the hot feather, which at least reads as a gift. */
  function kindOf(ob) {
    if (ob.spicy) return 'hot';
    if (ob.whirl) return 'whirl';
    if (ob.gold || ob.sour) return 'hot';
    return 'lint';
  }

  function lintFrame(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 4) % 4; }

  /* FEATHERS: 70 px/s mean descent, an 18px sway on a 1.4s period, a
     bob at twice that. Why 70 and not slower: spawn x is 330..460, so at
     speedMax 180 a feather crosses the doodad's column (116) after 1.2 to
     1.9s, at y 107..158 - and at speedStart at 151..228. The first cut of
     this number was 44, and at speedMax every feather crossed the column
     still above the flight lane. */
  var FEATHER_VY = 70, FEATHER_AMP = 18, FEATHER_W = 4.49, FEATHER_BOB = 14;

  /* LINT: a 58 px/s terminal, a 16 px/s wander on a 3.9s period, a quarter
     turn every 1.3..2.6s - slow and fluffy, never a tumble. A tuft born at
     460 meets the doodad's column at about y 135 at speedMax and 193 at
     speedStart; one born at 330, at about 88 and 129. The lint sweeps the
     whole lane across the speed range. */
  var LINT_VT = 58, LINT_SWAY = 16, LINT_WR = 1.6;

  function featherFrame(ob) {
    var c = Math.cos(ob.age * FEATHER_W + ob.phase);
    return c > 0.4 ? 1 : (c < -0.4 ? 2 : 0);
  }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y), kind = kindOf(ob), i, k, a, pulse;
    if (kind === 'lint') {
      var half = LINT_SHEET[ob.shape] >> 1;
      DiningRoom.blitBelowCeil(ctx, T.lint[ob.shape][lintFrame(ob)].canvas, x - half, y - half);
      return;
    }
    var age = ob.age || 0;
    if (kind === 'hot') {
      pulse = 0.72 + 0.28 * Math.sin(age * 5.2);
      DiningRoom.glow(ctx, x, y, Math.round(16 + pulse * 6),
                      'rgba(255,224,138,' + (0.50 * pulse).toFixed(3) + ')',
                      'rgba(240,146,46,' + (0.24 * pulse).toFixed(3) + ')',
                      'rgba(184,77,18,0)');
      /* the shimmer: three heat sparks rising off it, the Couch's cheddar */
      for (i = 0; i < 3; i++) {
        k = wrap(age * 0.7 + i * 0.41, 1);
        var fy = y - 8 - Math.round(k * 7);
        if (fy < CEIL) continue;
        ctx.fillStyle = i % 2 ? P.hotHi : P.hot;
        ctx.fillRect(x - 4 + Math.round(Math.sin(age * 2 + i) * 4), fy, 1, 1);
      }
      DiningRoom.blitBelowCeil(ctx, T.feather[0][featherFrame(ob)].canvas, x - 7, y - 8);
      return;
    }
    pulse = 0.72 + 0.28 * Math.sin(age * 5.2);
    DiningRoom.glow(ctx, x, y, Math.round(15 + pulse * 5),
                    'rgba(214,160,255,' + (0.46 * pulse).toFixed(3) + ')',
                    'rgba(150,80,220,' + (0.22 * pulse).toFixed(3) + ')',
                    'rgba(90,42,140,0)');
    DiningRoom.blitBelowCeil(ctx, T.feather[1][featherFrame(ob)].canvas, x - 7, y - 8);
    /* two sparkles orbiting it: the hint of spin, and the one thing that
       says this gift is not the hot one */
    for (i = 0; i < 2; i++) {
      a = age * 6.0 + i * Math.PI;
      var sy = y + Math.round(Math.sin(a) * 5);
      if (sy < CEIL) continue;
      ctx.fillStyle = i ? P.whirl : P.whirlHi;
      ctx.fillRect(x + Math.round(Math.cos(a) * 8), sy, 1, 1);
    }
  }

  /* the spot on the moulding: small and dark when it is about to land,
     wide and faint when it has only just let go of the lid */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var far = clamp((FLOOR - 4 - ob.y) / (FLOOR - CEIL), 0, 1);
    var w = 5 + Math.round(6 * far), kind = kindOf(ob);
    var col = kind === 'lint' ? P.void : (kind === 'hot' ? P.hot : P.whirl);
    var a = 8 - Math.round(5 * far), sx = Math.round(ob.x - w / 2);
    /* two rows, the upper one a pixel shorter each end: a soft oval of
       shadow on the moulding rather than a dark block notched into it */
    Tint.rect(ctx, sx + 1, FLOOR + 3, w - 2, 1, col, a);
    Tint.rect(ctx, sx, FLOOR + 4, w, 1, col, a);
  }

  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x), y = FLOOR + 2, kind = kindOf(ob);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);
    if (kind === 'lint') {
      /* a smear of fluff settled into the upturned crown */
      ctx.fillStyle = P.lint;      ctx.fillRect(x - 4, y, 9, 2);
      ctx.fillStyle = P.lintHi;    ctx.fillRect(x - 2, y, 4, 1);
      ctx.fillStyle = P.lintShade; ctx.fillRect(x - 5, y + 1, 1, 1); ctx.fillRect(x + 5, y + 1, 1, 1);
    } else {
      /* the feather lying in it, quill trailing */
      ctx.fillStyle = kind === 'hot' ? P.hot : P.whirl;          ctx.fillRect(x - 4, y, 9, 2);
      ctx.fillStyle = kind === 'hot' ? P.hotHi : P.whirlHi;      ctx.fillRect(x - 3, y, 5, 1);
      ctx.fillStyle = kind === 'hot' ? P.quillHot : P.quillWhirl; ctx.fillRect(x + 5, y + 1, 3, 1);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------------- the boon

     NOODLES, stuck to the plaster and hanging into the room - the
     Canopy's pomegranate grammar, a gift that hangs off the lid. The patch
     stays on the ceiling whatever happens; the strands stretch from it to
     wherever Gerald's hunger has the bundle (ob.dx/ob.dy), so a lifted
     bundle stretches rather than tears.

     FIVE STRANDS, wavy, 1px of noodle between 1px of outline. The first
     cut hung three straight 2px strands off the patch and read as a
     tassel - or a jellyfish. Noodles are thin and they are never
     straight: each strand wiggles a pixel either way down its length on
     its own phase, sways on ob.age, and leans with Gerald's pull. The
     outlines all go down first and the noodle on top, so where two
     strands cross they cross as noodles and not as a dark knot. */
  var STRANDS = [[-6, 12], [-3, 18], [0, 22], [3, 16], [6, 10]];

  function strandX(ob, i, r, len, age) {
    var sway = (1.6 * Math.sin(age * 1.7 + ob.phase + i * 1.1) + ob.dx) * r / len;
    return Math.round(STRANDS[i][0] + Math.sin(r * 0.55 + i * 1.7) * 1.1 + sway);
  }

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var x = Math.round(ob.x), age = ob.age || 0, i, r, len, px, py;
    var gx = Math.round(ob.x + ob.dx), gy = Math.round(ob.y + ob.dy);
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + age * 2.6);
    DiningRoom.glow(ctx, gx, gy, Math.round(15 + pulse * 4),
                    'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')',
                    'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')',
                    'rgba(47,107,98,0)');
    var top = CEIL + 5, prev, lo, run;
    /* pass 1, the outlines. Each row runs from where the row above left
       off, so a strand Gerald has dragged well over to one side stretches
       as a line and does not break up into dots. */
    ctx.fillStyle = P.outline;
    for (i = 0; i < STRANDS.length; i++) {
      len = STRANDS[i][1];
      prev = null;
      for (r = 0; r <= len; r++) {
        px = x + strandX(ob, i, r, len, age);
        py = top + r + Math.round(ob.dy * r / len);
        lo = prev === null ? px : Math.min(prev, px); run = prev === null ? 1 : Math.abs(px - prev) + 1;
        ctx.fillRect(lo - 1, py, run + 2, 1);
        prev = px;
      }
      ctx.fillRect(px - 1, py + 1, 3, 1);
    }
    /* pass 2, the noodle, catching the light every fourth row, and the
       little curl at each end */
    for (i = 0; i < STRANDS.length; i++) {
      len = STRANDS[i][1];
      prev = null;
      for (r = 0; r <= len; r++) {
        px = x + strandX(ob, i, r, len, age);
        py = top + r + Math.round(ob.dy * r / len);
        lo = prev === null ? px : Math.min(prev, px); run = prev === null ? 1 : Math.abs(px - prev) + 1;
        ctx.fillStyle = ((r + i) % 4 === 0) ? P.noodleHi : (((r + i) % 4 === 2) ? P.noodleShade : P.noodle);
        ctx.fillRect(lo, py, run, 1);
        prev = px;
      }
      ctx.fillStyle = P.noodleShade;
      ctx.fillRect(px + (i & 1 ? 1 : -1), py, 1, 1);
    }
    /* the tangle pressed against the plaster, over the strands' roots */
    ctx.drawImage(T.patch.canvas, x - 10, CEIL);
    if (ob.dy > 1 || Math.abs(ob.dx) > 1) {
      /* a drip of broth off the longest strand as it is pulled */
      var kk = wrap(age * 0.5, 1);
      ctx.fillStyle = P.noodleShade;
      ctx.fillRect(x + strandX(ob, 2, 22, 22, age), top + 24 + Math.round(ob.dy) + Math.round(kk * 6), 1, 1);
    }
    for (i = 0; i < 2; i++) {
      var k = wrap(ob.phase * 0.22 + age * 0.3 + i * 0.5, 1);
      ctx.fillStyle = i ? P.noodleHi : P.lifePale;
      ctx.fillRect(gx - 7 + i * 13, gy + 6 - Math.round(k * 9), 1, 1);
    }
  }

  /* ------------------------------------------------------- litter

     Dust on the upturned moulding: a drift, a hair, a cobweb. Harmless,
     no box, drawn on the bottom band's crown rows (244..247) and never on
     the two outline rows of the kill line. */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), i, h;
    if (ob.kind === 0) {
      rowsFill(ctx, [[2, 10], [1, 12], [0, 14]], x, FLOOR + 2, P.lint);
      ctx.fillStyle = P.lintShade; ctx.fillRect(x, FLOOR + 4, 14, 1);
      for (i = 0; i < 6; i++) {
        h = hash(ob.seed + i * 977);
        ctx.fillStyle = i < 3 ? P.lintShade : P.lintHi;
        ctx.fillRect(x + 2 + (h >>> 3) % 10, FLOOR + 2 + (h >>> 11) % 2, 1, 1);
      }
    } else if (ob.kind === 1) {
      var yy = FLOOR + 3;
      ctx.fillStyle = P.hair;
      for (i = 0; i < 9; i++) {
        h = hash(ob.seed + i * 131);
        if ((h & 7) === 0) yy = clamp(yy + ((h & 8) ? 1 : -1), FLOOR + 2, FLOOR + 5);
        ctx.fillRect(x + 3 + i, yy, 1, 1);
      }
    } else {
      ctx.fillStyle = P.lintHi;
      for (i = 0; i < 5; i++) {
        for (var k = 0; k <= i + 2 && k < 7; k += 2) ctx.fillRect(x + 4 + k + (i & 1), FLOOR + 4 + i - 2, 1, 1);
      }
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawPole(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ------------------------------------------------------- the cover

     118x114 on the big card, 82x94 on the side ones; the caller has
     clipped. The level in one picture: the lid and its mirror with the
     pendants hanging both ways, the dusk field and its fold, two soffit
     columns sliding past, a tuft of lint, the hot feather zigzagging, the
     noodles, and the pole coming up to have a look. */
  function miniPendant(ctx, px, gy, up) {
    /* gy = the glass's first row (down) or last row (up) */
    var d = up ? -1 : 1, i;
    ctx.fillStyle = P.lampRod;
    ctx.fillRect(px - 1, gy - 2 * d, 3, 1);
    ctx.fillStyle = P.outline;
    for (i = 0; i < 4; i++) ctx.fillRect(px - 3, gy + i * d, 7, 1);
    ctx.fillRect(px - 2, gy - d, 5, 1);
    ctx.fillStyle = P.lampGlass;
    for (i = 0; i < 4; i++) ctx.fillRect(px - 2 + (i === 3 ? 1 : 0), gy + i * d, i === 3 ? 3 : 5, 1);
    ctx.fillStyle = P.lampCore;    ctx.fillRect(px, gy + d, 1, 1);
    ctx.fillStyle = P.lampCrackle; ctx.fillRect(px + 1, gy + 2 * d, 1, 1);
  }

  /* one soffit column inside a cover: the column's own five faces at a
     tenth of the width, the lip at the gap end, and - on the skylight
     kind - the well as a little framed window at the lid end, the way the
     level cuts it, and NOT as a stripe */
  function miniSoffit(ctx, x, y, h, sky, up) {
    if (h <= 0) return;
    /* the column's two planes at a third of the width: outline, warm face,
       the arris, the lavender return, outline */
    ctx.fillStyle = P.outline;     ctx.fillRect(x, y, 11, h);
    ctx.fillStyle = P.soffitLit;   ctx.fillRect(x + 1, y, 1, h);
    ctx.fillStyle = P.soffitFace;  ctx.fillRect(x + 2, y, 4, h);
    ctx.fillStyle = P.arris;       ctx.fillRect(x + 6, y, 1, h);
    ctx.fillStyle = P.lavLit;      ctx.fillRect(x + 7, y, 1, h);
    ctx.fillStyle = P.lavMid;      ctx.fillRect(x + 8, y, 1, h);
    ctx.fillStyle = P.lavShade;    ctx.fillRect(x + 9, y, 1, h);
    if (sky && h >= 14) {
      /* the well: a framed patch of dusk filling the face */
      var wh = Math.min(h - 6, 18), wy = up ? y + h - 3 - wh : y + 3;
      ctx.fillStyle = P.soffitDeep; ctx.fillRect(x + 1, wy, 6, wh);
      ctx.fillStyle = P.wellLit;    ctx.fillRect(x + 2, wy + 1, 4, wh - 2);
      ctx.fillStyle = P.sky;        ctx.fillRect(x + 3, wy + 2, 2, wh - 4);
      ctx.fillStyle = P.skyDeep;    ctx.fillRect(x + 3, up ? wy + wh - 4 : wy + 2, 2, 2);
    }
    /* the bevelled lip at the gap end, the arris stepping across it */
    var cy = up ? y : y + h - 3;
    ctx.fillStyle = P.outline;     ctx.fillRect(x - 2, cy, 15, 3);
    ctx.fillStyle = P.soffitFace;  ctx.fillRect(x - 1, cy + 1, 8, 1);
    ctx.fillStyle = P.lavLit;      ctx.fillRect(x + 7, cy + 1, 5, 1);
    ctx.fillStyle = P.arris;       ctx.fillRect(x + 7, cy + 1, 1, 1);
    ctx.fillStyle = up ? P.lavShade : P.lavLit; ctx.fillRect(x - 1, up ? cy : cy + 2, 13, 1);
    Tint.rect(ctx, x + 11, y, 2, h, P.void, 5);
  }

  /* one pendant down the room inside a cover, at depth d (0 nearer, 1
     further): a rod and a glint, hanging (or, under the fold, standing) */
  function miniDepthLamp(ctx, px, cy, d, up) {
    var dir = up ? -1 : 1, rod = d ? 2 : 4, i;
    ctx.fillStyle = d ? P.rodFar : P.lampRod;
    for (i = 0; i < rod; i++) ctx.fillRect(px, cy + i * dir, 1, 1);
    var gy = cy + rod * dir;
    Tint.rect(ctx, px - 4 + d * 2, up ? gy - 6 + d * 3 : gy, 9 - d * 4, 7 - d * 3, P.lampGlow, 3);
    ctx.fillStyle = d ? P.glassFar : P.glassMid;
    if (d) ctx.fillRect(px, up ? gy - 1 : gy, 1, 2);
    else { ctx.fillRect(px - 1, up ? gy - 2 : gy, 3, 3); ctx.fillStyle = P.coreMid; ctx.fillRect(px, up ? gy - 1 : gy + 1, 1, 1); }
  }

  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22, i, k;
    var band = Math.round(h * 0.10);
    var lidY = y + band, botY = y + h - band, midY = y + Math.round(h / 2);
    var span = botY - lidY;

    /* 1. THE FIELD, as the level has it: the two ceilings running away to
       the fold, warm under the lids and dimmer toward the far wall, with
       lamps hanging at two depths - bigger and higher near, a glint low
       and far - and each one's mirror standing up from the other side */
    var half = midY - lidY;
    for (i = 0; i <= half; i++) {
      var kk = i / Math.max(1, half);
      ctx.fillStyle = kk < 0.5 ? mixHex(P.planeNear, P.planeMid, ease(kk * 2))
                               : mixHex(P.planeMid, P.farWall, ease((kk - 0.5) * 2));
      ctx.fillRect(x, lidY + i, w, 1);
      ctx.fillRect(x, botY - 1 - i, w, 1);
    }
    var drift = s * 0.25;
    for (i = 0; i < 3; i++) {
      var lx0 = x + Math.round(wrap(i * 44 + 10 - drift * 0.55, w + 20)) - 10;
      miniDepthLamp(ctx, lx0, lidY + Math.round(half * 0.30), 0, false);
      miniDepthLamp(ctx, lx0, botY - 1 - Math.round(half * 0.30), 0, true);
      var lx1 = x + Math.round(wrap(i * 29 + 24 - drift * 0.27, w + 10)) - 5;
      miniDepthLamp(ctx, lx1, lidY + Math.round(half * 0.72), 1, false);
      miniDepthLamp(ctx, lx1, botY - 1 - Math.round(half * 0.72), 1, true);
    }
    /* a skylight opening down the room, and its mirror */
    var sx0 = x + Math.round(wrap(70 - drift * 0.4, w + 30)) - 15;
    ctx.fillStyle = P.lavFarEdge; ctx.fillRect(sx0 - 1, lidY + Math.round(half * 0.5) - 1, 14, 4);
    ctx.fillStyle = P.sky;        ctx.fillRect(sx0, lidY + Math.round(half * 0.5), 12, 2);
    ctx.fillStyle = P.lavFarEdge; ctx.fillRect(sx0 - 1, botY - Math.round(half * 0.5) - 2, 14, 4);
    ctx.fillStyle = P.sky;        ctx.fillRect(sx0, botY - Math.round(half * 0.5) - 1, 12, 2);
    Tint.rect(ctx, x, midY - Math.round(h * 0.12), w, Math.round(h * 0.24), P.void, 2);

    /* 2. the lid, and the same rows reversed for the bottom */
    ctx.fillStyle = P.plasterMid; ctx.fillRect(x, y, w, band - 4); ctx.fillRect(x, botY + 4, w, y + h - botY - 4);
    var LID = [P.crown, P.plasterLit, P.crownShade, P.outline];
    for (i = 0; i < 4; i++) {
      ctx.fillStyle = LID[i];
      ctx.fillRect(x, lidY - 4 + i, w, 1);
      ctx.fillRect(x, botY + 3 - i, w, 1);
    }
    for (i = 0; i < 2; i++) {
      var px = x + Math.round(w * (i ? 0.75 : 0.25));
      Tint.rect(ctx, px - 14, y, 28, band - 4, P.plasterLit, 4);
      Tint.rect(ctx, px - 14, botY + 4, 28, y + h - botY - 4, P.plasterLit, 4);
      Tint.rect(ctx, px - 12, lidY, 24, 8, P.lampGlow, 3);
      Tint.rect(ctx, px - 12, botY - 8, 24, 8, P.lampGlow, 3);
      miniPendant(ctx, px, lidY - 9, false);
      miniPendant(ctx, px, botY + 8, true);
    }

    /* 3. soffit columns sliding past */
    var period = big ? 46 : 38;
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - wrap(s + i * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.34);
      var gapY = Math.round(lidY + 4 + ((i * 19) % Math.max(1, span - gapH - 10)));
      miniSoffit(ctx, ox, lidY, gapY - lidY, i === 1, false);
      miniSoffit(ctx, ox, gapY + gapH, botY - gapY - gapH, i === 1, true);
    }

    /* 4. a tuft of lint on its way down, lumpy and softly ringed, and its
       spot on the moulding */
    var lx = x + Math.round(w * 0.42 + 4 * Math.sin(t * 1.6));
    var ly = lidY + Math.round((s * 0.8) % Math.max(1, span - 6));
    ctx.fillStyle = P.lintRing;
    ctx.fillRect(lx - 1, ly, 6, 3); ctx.fillRect(lx, ly - 1, 4, 5); ctx.fillRect(lx + 2, ly - 2, 2, 1);
    ctx.fillStyle = P.lint;   ctx.fillRect(lx, ly, 4, 3); ctx.fillRect(lx + 2, ly - 1, 2, 1);
    ctx.fillStyle = P.lintHi; ctx.fillRect(lx, ly, 2, 1); ctx.fillRect(lx + 2, ly - 1, 1, 1);
    ctx.fillStyle = P.lintShade; ctx.fillRect(lx + 1, ly + 2, 3, 1);
    Tint.rect(ctx, lx - 1, botY + 1, 6, 1, P.void, 6);

    /* 5. the hot feather zigzagging down - the one warm thing in the
       field apart from the lamps, glowing, quill and all */
    var fx = x + Math.round(w * 0.62 + 6 * Math.sin(t * 4.5));
    var fy = lidY + 2 + Math.round((s * 1.2) % Math.max(1, span - 10));
    Tint.rect(ctx, fx - 3, fy - 2, 9, 10, P.hotHi, 4);
    Tint.rect(ctx, fx - 1, fy, 5, 6, P.hotHi, 3);
    ctx.fillStyle = P.outline;  ctx.fillRect(fx, fy - 1, 3, 6); ctx.fillRect(fx - 1, fy, 5, 4);
    ctx.fillStyle = P.hot;      ctx.fillRect(fx, fy, 3, 4); ctx.fillRect(fx + 1, fy - 1, 2, 1);
    ctx.fillStyle = P.hotHi;    ctx.fillRect(fx + 1, fy - 1, 1, 2);
    ctx.fillStyle = P.quillHot; ctx.fillRect(fx + 1, fy + 1, 1, 3); ctx.fillRect(fx + 1, fy + 4, 1, 2);

    /* 6. the noodles under the lid */
    var nx = x + Math.round(w * 0.50);
    Tint.rect(ctx, nx - 3, lidY + 1, 11, 11, P.lifePale, 3);
    ctx.fillStyle = P.outline; ctx.fillRect(nx - 1, lidY, 9, 3);
    ctx.fillStyle = P.noodle;  ctx.fillRect(nx, lidY, 7, 2);
    var NL = [5, 8, 6];
    for (i = 0; i < 3; i++) {
      var sw = Math.round(Math.sin(t * 1.7 + i));
      for (k = 0; k < NL[i]; k++) {
        ctx.fillStyle = (k % 3 === 1) ? P.noodleShade : P.noodle;
        ctx.fillRect(nx + 1 + i * 2 + (k > NL[i] / 2 ? sw : 0) + ((k >> 1) & 1), lidY + 2 + k, 1, 1);
      }
    }

    /* 7. THE POLE, coming up for a look. It rides with the columns,
       half a period behind the third, and it is driven by its own place
       on the card exactly as the level drives it by its screen x: up out
       of the bottom on the right, standing in the middle, pulled down as
       it comes left, gone before the doodad's column. The outer tube with
       its lit side, the collar, the thinner tube, and the J. */
    var pax = Math.round(x + w + 10 - wrap(s + 2.5 * period, period * 3));
    var pu = (pax - x) / w, E;
    if (pu > 0.96 || pu < 0.16) E = 0;
    else if (pu > 0.74) E = ease((0.96 - pu) / 0.22);
    else if (pu > 0.52) E = 1;
    else E = (pu - 0.16) / 0.36;
    var pt = botY - Math.round(E * (botY - lidY));
    if (E > 0.04) {
      var tubeTop = pt + 5, cly = tubeTop + Math.round((botY - tubeTop) * 0.45);
      ctx.fillStyle = P.outline;   ctx.fillRect(pax - 2, cly, 5, botY - cly);
      ctx.fillStyle = P.poleLit;   ctx.fillRect(pax - 1, cly, 1, botY - cly);
      ctx.fillStyle = P.poleMid;   ctx.fillRect(pax, cly, 2, botY - cly);
      if (cly > tubeTop) {
        ctx.fillStyle = P.outline; ctx.fillRect(pax - 1, tubeTop, 4, cly - tubeTop);
        ctx.fillStyle = P.poleLit; ctx.fillRect(pax, tubeTop, 1, cly - tubeTop);
        ctx.fillStyle = P.poleShade; ctx.fillRect(pax + 1, tubeTop, 1, cly - tubeTop);
      }
      ctx.fillStyle = P.outline; ctx.fillRect(pax - 3, cly - 1, 7, 3);
      ctx.fillStyle = P.collar;  ctx.fillRect(pax - 2, cly, 5, 1);
      /* the J, opening left */
      ctx.fillStyle = P.outline; ctx.fillRect(pax - 5, pt - 1, 8, 4); ctx.fillRect(pax - 5, pt + 2, 3, 3); ctx.fillRect(pax - 1, pt + 2, 4, 4);
      ctx.fillStyle = P.hook;    ctx.fillRect(pax - 3, pt, 4, 1); ctx.fillRect(pax - 4, pt + 1, 2, 3); ctx.fillRect(pax, pt + 1, 2, 4);
      ctx.fillStyle = P.hookLit; ctx.fillRect(pax - 3, pt, 3, 1);
      if (E > 0.97) {
        ctx.fillStyle = FX.puffHi;
        ctx.fillRect(pax - 3, lidY, 1, 1); ctx.fillRect(pax + 2, lidY + 1, 1, 1); ctx.fillRect(pax - 1, lidY + 2, 1, 1);
      }
    }

    /* 8. the doodad flying it, haloed */
    var dx = Math.round(x + w * 0.3);
    var dy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, dx - sz, dy - sz, sz * 2, sz * 2, P.void, 5);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx + sz / 2 - 2, dy - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(dx + sz / 2, dy, 2, 1);

    /* 9. the room's light, in miniature: warmth off both bands, the two
       side columns of dark - and no wash over the whole card, which made
       the first cut of it a beige the level never is */
    Tint.rect(ctx, x, lidY, w, Math.round(span * 0.18), P.lampGlow, 1);
    Tint.rect(ctx, x, botY - Math.round(span * 0.18), w, Math.round(span * 0.18), P.lampGlow, 1);
    var vig = Math.max(4, Math.round(w * 0.09));
    Tint.rect(ctx, x, y, vig, h, P.void, 4);
    Tint.rect(ctx, x + w - vig, y, vig, h, P.void, 4);
  }

  /* ------------------------------------------------------- generation */

  /* 0 = plain soffit, 1 = skylight well, 2 = air register: 45 / 35 / 20.
     The brief had two kinds at 6 to 4; the register is Celing ref 4's,
     and a third face on the columns is what keeps a bay made of one cream
     from repeating itself every other column. The plain one stays the
     commonest, because it is the soffit in every photograph. */
  function makePillar(x, gapY, gapH, run) {
    var r = Math.random();
    return { type: 'pillar', x: x, w: SOFF_W,
             gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: r < 0.45 ? 0 : (r < 0.80 ? 1 : 2), scored: false };
  }

  /* THE POLE, in the spike slot. `side` is ignored (it always comes up out
     of the bottom, so diveSpans sees it) and so are count and maxLen (the
     contract names them; a pole has one size). x is the LEFT edge of
     everything it ever does - every box lies in [sx-9, sx+7] - and w the
     full width, which is the one rule a spike owes the engine. */
  function makeSpikes(x, side, count, maxLen, run) {
    var lg = run && run.ledger ? run.ledger : {};
    lg.poleN = (lg.poleN || 0) + 1;
    return { type: 'spike', kind: 'pole', side: 'floor', x: Math.round(x) - 9, w: 16,
             id: lg.poleN, deflect: true, spikes: [] };
  }

  /* lint, in three shapes 4/4/2. ob.w and ob.landCry are reset on every
     step off kindOf, because whether this is a feather is not known until
     the engine has had its say */
  function makeDrop(x, spicy, fall, run) {
    var r = Math.random();
    return { type: 'drop', x: x, y: CEIL + 5, vy: fall, spicy: !!spicy, broken: 0,
             w: spicy ? 11 : 9, shape: r < 0.4 ? 0 : (r < 0.8 ? 1 : 2),
             spin: rand(0, TAU), spinRate: rand(0.6, 1.2) * (chance(0.5) ? -1 : 1),
             phase: rand(0, TAU), landCry: spicy ? 'pat' : '' };
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 16, kind: randInt(0, 2), seed: randInt(1, 100000) };
  }

  /* the grab point is the middle of the hanging bundle, 20 rows under the
     lid - the Canopy's precedent for a gift that hangs off the ceiling */
  function makeBoon(x, run) {
    return { type: 'boon', x: x, y: CEIL + 20, w: 16, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0, name: BOON_NAME,
             burst: [P.noodleHi, P.noodle, P.noodleShade, P.lifePale, P.lifeJade] };
  }

  /* ------------------------------------------------------- stepDrop */
  function stepDrop(ob, dt) {
    var kind = kindOf(ob);
    if (kind === 'lint') {
      ob.w = LINT_W[ob.shape];
      ob.landCry = '';
      ob.vy = Math.min(LINT_VT, ob.vy + DROP_GRAV * dt);
      ob.y += ob.vy * dt;
      ob.x += LINT_SWAY * Math.sin(ob.age * LINT_WR + ob.phase) * dt;
      ob.spin += ob.spinRate * dt;
    } else {
      ob.w = 11;
      ob.landCry = 'pat';
      var a = ob.age * FEATHER_W + ob.phase;
      ob.x += FEATHER_AMP * FEATHER_W * Math.cos(a) * dt;
      ob.y += (FEATHER_VY + FEATHER_BOB * Math.sin(2 * a)) * dt;
    }
    return ob.y >= FLOOR - 4;
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one. The soffits
     are the Coop's four boxes verbatim; the pole is boxed part by part,
     never wider than the metal; lint a pixel inside its art, because
     dodging is meant to be fair; the feathers generously, because
     catching is meant to be easy. */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
    } else if (ob.type === 'spike') {
      poleBoxes(ob, out);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      if (kindOf(ob) !== 'lint') { out.push([ob.x - 5, ob.y - 7, 10, 14]); return out; }
      /* the lump box turned with the sprite: a quarter turn about the
         sheet's centre takes (cx, cy) to (-cy, cx) and swaps w and h */
      var bx = LINT_BOX[ob.shape], f = lintFrame(ob), cx = bx[0], cy = bx[1], tmp, q;
      for (q = 0; q < f; q++) { tmp = cx; cx = -cy; cy = tmp; }
      var bw = (f & 1) ? bx[3] : bx[2], bh = (f & 1) ? bx[2] : bx[3];
      var half = LINT_SHEET[ob.shape] >> 1;
      out.push([ob.x - half + LINT_SHEET[ob.shape] / 2 + cx - bw / 2,
                ob.y - half + LINT_SHEET[ob.shape] / 2 + cy - bh / 2, bw, bh]);
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 8, ob.y + ob.dy - 10, 16, 22]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME, CEIL_KILLS: CEIL_KILLS,
    BOON_NAMES: [BOON_NAME],
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor, drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld, drawOverlay: drawOverlay,
    rectsFor: rectsFor,
    /* published for a headless test: the pole's extension at a screen x */
    poleE: poleE
  };
})();
