/* ------------------------------------------------------------------
   Land of Doodads - THE KITCHEN, the room itself
   Five bays in the same house, through the doorway from the Dining
   Room: across the top of the island, along the back counter under
   the uppers, inside the fridge, along the top shelf of the glass-front
   cabinets, and - the room's finale - inside the dishwasher, running.
   THE ISLAND, THE COUNTER, THE FRIDGE, THE CABINETS and THE DISHWASHER
   each paint their own scene; what lives here is only what the five of
   them must agree on.

   IT IS THE KITCHEN THE TABLE LOOKS AT. THE TABLE's backdrop (js/table.js)
   is this room seen from the dining room: the island's quartz with the
   ZZ plant on it, the white shaker uppers with their glass fronts, the
   range hood's glass canopy, the plantation shutters and the steel of the
   fridge. A cabinet that is one cream there and another here is two
   kitchens, so the house's cabinets, steel, wall and shutters are the
   Dining Room's own values, read off its table rather than retyped, and
   the plaster, the crown and the cans are the Living Room's through it.

   What is NEW here is what the Table only ever saw from across the room
   and so never had to publish: the quartz up close (a warm white with
   soft grey veining, Island ref 4 and Counter ref 9), the backsplash (an
   iridescent linear mosaic of pearl glass, marble and brushed silver in
   strips, Counter ref 7 and 10), the nickel bar pulls, the black glass
   of the cooktop and the air fryer, the red enamel of the Dutch oven,
   and the light under the uppers.

   THE LID KILLS IN ALL FIVE (the owner's "lethal ceilings on all"), so
   it is ONE field here, the Living Room's way, and every bay publishes
   Kitchen.CEIL_KILLS rather than a literal. What the lid IS differs - the
   house's plaster over the island, the underside of the uppers over the
   counter, the ribbed liner of the fridge, the cabinet's top board, the
   dishwasher's upper rack - and each bay says so in its own WARN.ceil.

   THE TIME OF DAY. The island and the counter were photographed after
   dark under the cans and the island pendants, with the shutters black
   between their louvres; the fridge lights itself, the cabinets take
   the room's cans through their open doors, and in the shut dishwasher
   the only light is the camera's own. So the room is
   evening throughout, a little later than the Bar, and each bay lights
   itself for its own corner of it.

   Same discipline as every other level file: everything is generated
   and baked once at boot, and any shade laid over something that
   scrolls is a flat Tint or a baked alpha sheet, never a Dither.
------------------------------------------------------------------ */
'use strict';

var Kitchen = (function () {

  /* The house's pigments. A bay keeps its OWN P for its own furniture and
     reads these for the things more than one photograph has in it. By
     convention a bay aliases this table as `K` (the kitchen), so `K.quartz`
     is visibly the room's and `P.pot` is visibly the bay's. */
  var D = DiningRoom.P;
  var P = {
    /* the ceiling - the house's plaster and crown, and its cans */
    plasterLit:   D.plasterLit,
    plasterMid:   D.plasterMid,
    plasterDim:   D.plasterDim,
    plasterShade: D.plasterShade,
    crown:        D.crown,
    crownShade:   D.crownShade,
    vent:         D.vent,
    ventSlot:     D.ventSlot,

    /* the amber glass pendants over the island (Island ref 5), which are
       the Dining Room's crackle-glass lamps - the same fixture, one room on */
    lampCore:     D.lampCore,
    lampGlass:    D.lampGlass,
    lampCrackle:  D.lampCrackle,
    lampDark:     D.lampDark,
    lampRod:      D.lampRod,
    lampGlow:     D.lampGlow,

    /* the white shaker cabinets, the cream wall and the steel - exactly the
       Table's kitchen, because it is the Table's kitchen */
    cabinet:      D.cabinet,
    cabinetLit:   D.cabinetLit,
    cabinetShade: D.cabinetShade,
    cabinetDeep:  D.cabinetDeep,
    cabinetLine:  '#b7ae9a',     /* the hairline between two doors (the Table's) */
    wall:         D.wall,
    wallShade:    D.wallShade,
    steel:        D.steel,
    steelLit:     D.steelLit,
    steelShade:   D.steelShade,
    steelDeep:    D.steelDeep,
    leaf:         D.leaf,
    leafLit:      D.leafLit,
    leafDeep:     D.leafDeep,

    /* inside a glass-front upper at night: the mugs and glasses on their
       glass shelves, dim behind the reflection */
    glassDark:    '#4f4a43',
    glassShelf:   '#8e8a82',
    glassGlare:   '#b9b4aa',

    /* THE BAR PULLS - brushed nickel, long, on every door and drawer */
    pull:         '#b5b2aa',
    pullLit:      '#e4e1d9',
    pullShade:    '#7b7871',

    /* THE QUARTZ, the island's and the counter's: a warm white with soft
       grey veins that branch and fade, a little cooler where the veins
       gather. One stone for both bays. */
    quartzHi:     '#fcfbf7',
    quartz:       '#f0ede7',
    quartzMid:    '#e2ded6',
    quartzShade:  '#cdc8be',
    quartzDeep:   '#a8a39a',
    vein:         '#9fa3a7',
    veinPale:     '#cdcfcf',
    veinDeep:     '#767c82',

    /* THE BACKSPLASH: a linear mosaic of long thin strips, pearl glass
       that throws the light back, white marble, and brushed silver
       textured tiles, with a grey grout between. Read in rows. */
    splashPearl:  '#e9e3d6',
    splashMarble: '#d8d5cd',
    splashGlass:  '#c3c4be',
    splashSilver: '#a6a8a6',
    splashWarm:   '#cdbfa6',     /* the iridescent strips catching the under-cabinet light */
    splashGrout:  '#8d8a83',
    splashGlint:  '#fffaee',

    /* THE PLANTATION SHUTTERS, white, and the night between the louvres */
    shutter:      '#ebe5d6',
    shutterShade: '#c8c0ad',
    shutterDeep:  '#9f9785',
    shutterNight: '#26272d',

    /* BLACK GLASS - the cooktop, the air fryer's lid, the microwave's door.
       Not a black: a very dark warm grey that holds a reflection. */
    blackGlass:   '#1e1d1f',
    blackGlassLit:'#3b3a3f',
    blackGlassHi: '#77767d',
    blackGlassDeep:'#0e0e0f',

    /* THE RED ENAMEL of the Dutch oven (Island ref 1-6): a cast-iron pot
       glazed scarlet that darkens to oxblood at its foot */
    enamelHi:     '#e2544a',
    enamel:       '#c0322a',
    enamelMid:    '#9c2520',
    enamelDeep:   '#6a1714',

    /* the warm strip of light under the uppers, on the splash and the stone */
    underLight:   '#fff1cf',

    outline:      D.outline,
    void:         D.void
  };

  /* The playfield, for all five bays: the house's numbers. Fifteen bays of
     muscle memory say where the lid and the ground are. */
  var CEIL = DiningRoom.CEIL;
  var FLOOR = DiningRoom.FLOOR;

  /* the room's one rule, as data - see the header */
  var CEIL_KILLS = true;

  /* the shortest plank stub allowed at either end, the Coop's number */
  var END_MIN = DiningRoom.END_MIN;

  /* The dust in the air: the island's and the counter's is lamp-lit, the
     Living Room's warm pair; the fridge hands PlayScene its own frost. */
  var AIR = { motes: LivingRoom.AIR.motes, motesHi: LivingRoom.AIR.motesHi };

  /* ====================================================== THE MARBLE

     The stone's own figure, for every bay that stands on it (Island ref
     4 and 6, Counter ref 1-9): a white field with a soft grey cloud in
     it, crossed by THIN, CRISP, DARK veins that zigzag - short straight
     runs with a sharp kink between them, the way a crack runs - and
     branch, plus one or two BOLD veins: a ribbon of grey smoke with dark
     crackle along both its edges and through it. The first painting
     (long faint level streaks) read as scuffed lino; this is what the
     owner's counter looks like.

     The figure is laid out FLAT, on the stone as if seen from overhead,
     then each point is put on the screen through the foreshortening the
     sheet is given: `aTop` and `aBot` are how many rows one flat pixel of
     depth takes at the sheet's top and bottom rows. The pinhole truth
     for a lens a few centimetres off the stone is ten times flatter than
     this at the far edge, and at that it is all level streaks again - so
     this is the picture of the stone, foreshortened enough to lie down
     and no further. Every line is rasterised on the SCREEN, so a vein is
     always one pixel wide whatever its depth, and the far rows carry it
     weaker (`far`), the way the eye loses a hairline at a distance.

     Paints the whole W x H canvas: base(y) is the row's colour (a hex),
     plain(y) true keeps a row clear of figure (a kill row, a lit edge).
     It wraps across x, so a tile has no seam. */
  function hexRGB(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }

  function paintMarble(c, W, H, o) {
    var r = mulberry32(o.seed), x, y, i;
    var line = new Float32Array(W * H), haze = new Float32Array(W * H);
    var a0 = o.aTop, k = (o.aBot - o.aTop) / H;
    function rowOf(v) { return Math.abs(k) < 1e-6 ? v * a0 : (a0 * Math.exp(v * k) - a0) / k; }
    var V = Math.abs(k) < 1e-6 ? H / a0 : Math.log(o.aBot / a0) / k;

    function put(buf, px, py, a) {
      px = ((Math.round(px) % W) + W) % W; py = Math.round(py);
      if (py < 0 || py >= H) return;
      i = py * W + px;
      if (a > buf[i]) buf[i] = a;
    }
    /* a straight run between two flat points, drawn on the screen */
    function seg(u0, v0, u1, v1, a) {
      var x0 = u0, y0 = rowOf(v0), x1 = u1, y1 = rowOf(v1);
      var n = Math.max(1, Math.ceil(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))));
      for (var s = 0; s <= n; s++) put(line, x0 + (x1 - x0) * s / n, y0 + (y1 - y0) * s / n, a);
    }

    /* A THIN VEIN: a heading that drifts slowly, and runs of 3..12 that
       each kink off it by up to forty degrees either way; it fades in and
       out along its length, and now and then a branch peels away at a
       sharp angle and runs a third as far. */
    function crackle(u, v, head, len, a, depth) {
      var gone = 0;
      while (gone < len) {
        var L = 3 + r() * 9;
        head += (r() - 0.5) * 0.35;
        var ang = head + (r() - 0.5) * 1.4;
        var u1 = u + Math.cos(ang) * L, v1 = v + Math.sin(ang) * L;
        var swell = Math.sin(Math.PI * Math.min(1, (gone + L / 2) / len));
        seg(u, v, u1, v1, a * (0.35 + 0.65 * swell) * (0.75 + 0.25 * r()));
        if (depth < 2 && r() < 0.16) {
          crackle(u1, v1, head + (r() < 0.5 ? 1 : -1) * (0.7 + r() * 0.8),
                  len * (0.18 + r() * 0.22), a * 0.8, depth + 1);
        }
        u = u1; v = v1; gone += L;
        if (v < -24 || v > V + 24) break;
      }
    }

    /* A BOLD VEIN: a ribbon whose middle wanders gently and whose width
       swells and pinches, smoke inside it, a crackle down each edge */
    function bold(u, v, head, len, w0) {
      var eL = null, eR = null;
      for (var s = 0; s < len; s++) {
        head += (r() - 0.5) * 0.08;
        u += Math.cos(head); v += Math.sin(head);
        var w = w0 * (0.55 + 0.45 * Math.sin(s * 0.045 + w0) * Math.sin(s * 0.017 + 1.3) + 0.25 * r());
        var nx = -Math.sin(head), ny = Math.cos(head);
        for (var q = -w; q <= w; q += 0.5) {
          var mot = 0.75 + 0.25 * Math.sin(u * 0.31 + q) * Math.sin(v * 0.23 - q * 0.7);
          var fall = 1 - Math.pow(Math.abs(q) / (w + 0.01), 2);
          var hu = u + nx * q, hv = v + ny * q;
          put(haze, hu, rowOf(hv), 0.6 * fall * mot);
        }
        if (s % 4 === 0) {
          var jl = (r() - 0.5) * 2.2, jr = (r() - 0.5) * 2.2;
          var L2 = [u - nx * (w + jl), v - ny * (w + jl)], R2 = [u + nx * (w + jr), v + ny * (w + jr)];
          if (eL && r() > 0.12) seg(eL[0], eL[1], L2[0], L2[1], 0.62 + 0.3 * r());
          if (eR && r() > 0.2) seg(eR[0], eR[1], R2[0], R2[1], 0.5 + 0.3 * r());
          eL = L2; eR = R2;
        }
        if (r() < 0.012) crackle(u, v, head + (r() - 0.5) * 1.2, 14 + r() * 26, 0.85, 1);
      }
    }

    /* soft clouds first, so the figure is not printed on paper */
    for (var n = 0; n < (o.clouds || 10); n++) {
      var cu = r() * W, cv = r() * V, cw = 14 + r() * 30, chh = 5 + r() * 12;
      for (var dv = -chh; dv <= chh; dv += 0.5) {
        for (var du = -cw; du <= cw; du += 1) {
          var d = (du / cw) * (du / cw) + (dv / chh) * (dv / chh);
          if (d < 1) put(haze, cu + du, rowOf(cv + dv), 0.16 * (1 - d));
        }
      }
    }
    for (n = 0; n < (o.bold || 0); n++) {
      var bh = (r() < 0.5 ? 1 : -1) * (0.35 + r() * 0.6) + (r() < 0.5 ? 0 : Math.PI);
      bold(r() * W, Math.sin(bh) > 0 ? -6 : V + 6, Math.sin(bh) > 0 ? bh : -bh, V * 1.6 + 40, (o.boldW || 3.5) * (1 + r()));
    }
    for (n = 0; n < (o.veins || 12); n++) {
      crackle(r() * W, r() * V, (r() - 0.5) * 2.4 + (r() < 0.5 ? 0 : Math.PI), 40 + r() * 140, 0.75 + 0.25 * r(), 0);
    }

    /* the smoke a vein carries either side of it: the line, spread two
       pixels across and one up and down, at a third */
    var soft = new Float32Array(W * H);
    for (y = 0; y < H; y++) {
      for (x = 0; x < W; x++) {
        var m = 0;
        for (var oy = -1; oy <= 1; oy++) {
          var yy = y + oy;
          if (yy < 0 || yy >= H) continue;
          for (var ox = -2; ox <= 2; ox++) m = Math.max(m, line[yy * W + ((x + ox + W) % W)] * (1 - 0.3 * Math.abs(ox) - 0.3 * Math.abs(oy)));
        }
        soft[y * W + x] = Math.max(haze[y * W + x], m * 0.34);
      }
    }

    var img = c.createImageData(W, H), d8 = img.data;
    var HZ = hexRGB(o.haze || P.veinPale), LN = hexRGB(o.ink || P.veinDeep), LT = hexRGB(o.inkLight || P.vein);
    for (y = 0; y < H; y++) {
      var B = hexRGB(o.base(y)), clear = o.plain && o.plain(y);
      var f = (o.far === undefined ? 0.5 : o.far) + (1 - (o.far === undefined ? 0.5 : o.far)) * (y / Math.max(1, H - 1));
      for (x = 0; x < W; x++) {
        i = y * W + x;
        var cr = B[0], cg = B[1], cb = B[2];
        if (!clear) {
          var h = Math.min(1, soft[i]) * f, l = Math.min(1, line[i]) * f;
          cr += (HZ[0] - cr) * h; cg += (HZ[1] - cg) * h; cb += (HZ[2] - cb) * h;
          if (l > 0.02) {
            var ink = l > 0.6 ? LN : LT;
            var kk = Math.min(1, l * 1.05);
            cr += (ink[0] - cr) * kk; cg += (ink[1] - cg) * kk; cb += (ink[2] - cb) * kk;
          }
        }
        d8[i * 4] = Math.round(cr); d8[i * 4 + 1] = Math.round(cg); d8[i * 4 + 2] = Math.round(cb); d8[i * 4 + 3] = 255;
      }
    }
    c.putImageData(img, 0, 0);
  }

  return {
    P: P, CEIL: CEIL, FLOOR: FLOOR, CEIL_KILLS: CEIL_KILLS, END_MIN: END_MIN, AIR: AIR,
    paintMarble: paintMarble,
    /* The house's utilities, published again under this room's name so a
       Kitchen bay never has to reach across two halls for a positive
       modulo - and so the house cannot grow two of them. */
    wrap: DiningRoom.wrap, hash: DiningRoom.hash,
    rowsFill: DiningRoom.rowsFill, rowsOutline: DiningRoom.rowsOutline,
    drawColumn: DiningRoom.drawColumn, glow: DiningRoom.glow,
    blitBelowCeil: DiningRoom.blitBelowCeil, ringOf: DiningRoom.ringOf,
    bakeShade: DiningRoom.bakeShade, ease: DiningRoom.ease, rgba: DiningRoom.rgba,
    paintOak: DiningRoom.paintOak, bakeCeiling: DiningRoom.bakeCeiling
  };
})();
