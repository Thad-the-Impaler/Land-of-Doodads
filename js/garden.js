/* ------------------------------------------------------------------
   Land of Doodads - BACKYARD / THE GARDEN
   A raised bed against a sunlit stucco wall: white vinyl boards, dense
   pepper and tomato foliage, a wire cage, dark mulch and a drip line,
   drawn from the photograph in Assets/Concept.

   Same discipline as js/coop.js - every pixel here is generated in code
   and baked into tiles once, and any shade laid over something that
   scrolls is a flat Tint, never a Dither, or it boils as it moves.

   The pillars are pale bamboo on purpose. The Coop reads because light
   planks stand against a dark wall; a garden of mid-green stakes against
   mid-green leaves had no such separation, and the level was unreadable
   until the stakes became the brightest thing in it.
------------------------------------------------------------------ */
'use strict';

var Garden = (function () {

  var P = {
    sunHaze:    '#e8d79a',
    skyPale:    '#f7ecc8',

    wallLit:    '#c9ad82',
    wallMid:    '#b0906a',
    wallDark:   '#8d7152',
    wallShadow: '#6d573f',

    boardHi:    '#f2efe2',
    board:      '#dcd8c6',
    boardLo:    '#b3ae9b',
    boardEdge:  '#7d7868',

    leafDark:   '#1d3a1c',
    leafMid:    '#2f5a29',
    leafLight:  '#4d8636',
    leafHi:     '#79b84a',
    leafPale:   '#a8d86a',

    bambooLit:  '#e8d79b',
    bambooMid:  '#c9a961',
    bambooDark: '#94773a',
    bambooNode: '#6d5526',

    stalkDark:  '#2a4520',
    stalkMid:   '#456f2c',
    stalkHi:    '#6d9a3f',
    cageWire:   '#3f7a44',
    cageHi:     '#6fb06a',

    /* deeper than the pepper, and it always wears a green calyx */
    tomDark:    '#8e1f16',
    tomMid:     '#c3321f',
    tomHi:      '#e05a34',
    tomShine:   '#ffb38a',

    /* hotter and oranger than the tomato, and it glows */
    hotDark:    '#8c1208',
    hotMid:     '#ff4a1a',
    hotHi:      '#ff8a3c',
    hotGlow:    '#ffc861',

    mintDark:   '#2d6b4a',
    mintMid:    '#46a06a',
    mintHi:     '#7fd097',
    mintPale:   '#c3ecc9',

    /* a cool jade rosette with pink tips - nothing else here is blue-green */
    sucDark:    '#2f6b62',
    sucMid:     '#5fae9a',
    sucHi:      '#93d8bd',
    sucTip:     '#e08a9a',
    berryDark:  '#8d1f2c',
    berryMid:   '#d6394a',
    berryHi:    '#f0727f',
    bloomPale:  '#f4efe0',
    bloomGold:  '#e8c45a',
    tubDark:    '#6f6f64',
    tubMid:     '#9c9c8e',
    tubHi:      '#c2c2b2',

    potDark:    '#7a4430',
    potMid:     '#b76a44',
    potHi:      '#d99a6a',

    soilDark:   '#22190f',
    soilMid:    '#35281a',
    soilLight:  '#4a3823',
    chipLight:  '#6b5334',
    chipPale:   '#8a6d46',

    dripLine:   '#1c1c1e',
    paver:      '#c3bca4',
    outline:    '#161c10',
    dust:       '#e8e2bc',
    void:       '#140f09'
  };

  var CEIL = 24;
  var FLOOR = 242;
  var DROP_GRAV = 34;     /* tomatoes pick up speed on the way down */
  var SPLAT_TIME = 1.7;
  var END_MIN = 34;       /* shortest pillar stub allowed at either end */

  /* the neutral effect colours PlayScene paints out of - see js/coop.js */
  var FX = {
    motes:    '#e8e2bc',   motesHi:  '#f7ecc8',
    puff:     '#c3bca4',   puffHi:   '#e8d79a',
    ground:   '#6b5334',   groundHi: '#8a6d46',
    splat:    '#c3321f',   splatHi:  '#ffb38a',
    hot:      '#ff4a1a',   hotMid:   '#ff8a3c',  hotHi: '#ffc861',
    heat:     '#ff4a1a',   heatEdge: '#8c1208',
    glowCore: '255,200,97', glowEdge: '255,74,26'
  };

  var WARN = {
    drop:  ['\u25BC TOMATOES \u25BC', 'THEY COME OFF THE VINE'],
    spike: ['\u25B2 MINT \u25B2', 'IT IS IN EVERYTHING NOW']
  };

  /* the ten colours js/scene_levelselect.js paints its preview window with */
  var PREVIEW = {
    back: P.wallMid, backAlt: P.wallLit, seam: P.wallShadow,
    beam: P.bambooMid, beamDark: P.bambooNode, beamLight: P.bambooLit,
    ground: P.soilMid, groundDark: P.soilDark, groundHi: P.board,
    spike: P.mintMid, spikeHi: P.mintPale, air: P.sunHaze, gloom: P.void
  };

  var T = {};

  /* ---------------------------------------------------------- tiles */

  /* the stucco back wall: fine speckle, a weep screed line, and the
     bottom of a window frame up in the corner of the bay */
  function bakeWall() {
    var W = 208, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(5150);

    c.fillStyle = P.wallMid;
    c.fillRect(0, 0, W, H);
    /* sun falls from the upper left, so the wall lightens as it rises */
    for (var y = 0; y < H; y++) {
      var k = y / H;
      if (k < 0.55) Tint.rect(c, 0, y, W, 1, P.wallLit, Math.round((0.55 - k) * 9));
      else Tint.rect(c, 0, y, W, 1, P.wallShadow, Math.round((k - 0.55) * 10));
    }
    /* stucco tooth */
    for (var i = 0; i < 2600; i++) {
      var x = Math.floor(r() * W), yy = Math.floor(r() * H);
      var v = r();
      c.fillStyle = v < 0.45 ? P.wallDark : (v < 0.8 ? P.wallLit : P.wallShadow);
      c.fillRect(x, yy, 1, 1);
    }
    /* the white weep screed the stucco stops at */
    c.fillStyle = P.boardLo;  c.fillRect(0, 150, W, 3);
    c.fillStyle = P.boardHi;  c.fillRect(0, 150, W, 1);
    c.fillStyle = P.wallShadow; c.fillRect(0, 153, W, 2);

    /* a window sill high on the wall, once per tile */
    c.fillStyle = P.board;     c.fillRect(24, 16, 96, 7);
    c.fillStyle = P.boardHi;   c.fillRect(24, 16, 96, 2);
    c.fillStyle = P.boardEdge; c.fillRect(24, 22, 96, 1);
    c.fillStyle = P.wallShadow; c.fillRect(24, 23, 96, 4);
    c.fillStyle = P.void;      c.fillRect(30, 0, 84, 16);
    c.fillStyle = '#3d5b54';   c.fillRect(32, 0, 80, 15);
    c.fillStyle = '#54786d';   c.fillRect(33, 1, 36, 13);
    return t;
  }

  /* ------------------------------------------------------------ plants

     Actual crops, not green blobs. Each one is a stalk with leaves growing
     off it on a real schedule and its own food hanging on it, so the bed
     reads as a bed somebody planted rather than as shrubbery. Drawn back
     to front: the far row is smaller, darker and fruitless, the near row
     carries the tomatoes, peppers, berries and flowers.                 */

  /* one leafy stem: the skeleton every tall crop is built on */
  function stem(c, x, baseY, h, lean, dark, mid, light, spacing, r) {
    var pts = [];
    for (var i = 0; i < h; i++) {
      var sx = x + Math.round(Math.sin(i * 0.06 + lean) * (i * 0.10));
      c.fillStyle = i > h * 0.7 ? light : mid;
      c.fillRect(sx, baseY - i, 2, 1);
      c.fillStyle = dark;
      c.fillRect(sx + 2, baseY - i, 1, 1);
      pts.push([sx, baseY - i]);
    }
    /* leaves in alternating pairs, smaller toward the growing tip */
    for (var k = 4; k < h - 2; k += spacing) {
      var pt = pts[k];
      var up = 1 - k / h;
      var size = 1 + Math.round(up * 1.6);
      sprig(c, pt[0] - 1, pt[1], -1, size, r() < 0.45 ? light : mid, dark);
      if (k + Math.floor(spacing / 2) < h - 2) {
        var pt2 = pts[Math.min(pts.length - 1, k + Math.floor(spacing / 2))];
        sprig(c, pt2[0] + 2, pt2[1], 1, size, r() < 0.45 ? light : mid, dark);
      }
    }
    return pts;
  }

  /* A leaflet cluster off a stem. These carry the bed's whole sense of
     mass, so they are blades with width, not one-pixel wires - the first
     version read as a hedge of sticks with the wall showing through. */
  function sprig(c, x, y, dir, size, colour, dark) {
    var len = 5 + size * 3;
    for (var i = 0; i < len; i++) {
      var yy = y - Math.round(i * 0.4);
      var k = i / len;
      var th = 1 + Math.round(Math.sin(k * Math.PI) * (1.6 + size));
      c.fillStyle = colour;
      c.fillRect(x + dir * i - (dir < 0 ? 1 : 0), yy - (th >> 1), 1, th);
      if (i % 3 === 0) {
        c.fillStyle = dark;
        c.fillRect(x + dir * i - (dir < 0 ? 1 : 0), yy + (th >> 1), 1, 1);
      }
    }
    c.fillStyle = dark;
    c.fillRect(x + dir * (len - 1) - (dir < 0 ? 1 : 0), y - Math.round((len - 1) * 0.4), 1, 1);
  }

  /* an overlapping mass of leaves filling the bottom of a row, so no bare
     wall shows between the stems */
  function understory(c, W, baseY, depth, r, dark, mid, light) {
    for (var i = 0; i < W / 3 + 8; i++) {
      var x = Math.floor(r() * (W + 12)) - 6;
      var y = baseY - Math.floor(r() * depth);
      var v = r();
      var col = v < 0.42 ? dark : (v < 0.78 ? mid : light);
      var w = 4 + Math.floor(r() * 5);
      var h = 2 + Math.floor(r() * 2);
      c.fillStyle = col;
      c.fillRect(x, y, w, h);
      c.fillRect(x + 1, y - 1, w - 2, 1);
      c.fillStyle = dark;
      c.fillRect(x, y + h, w, 1);
    }
  }

  /* --- the crops --- */

  function tomatoPlant(c, x, baseY, h, r, fruiting) {
    stem(c, x, baseY, h, r() * 2, P.stalkDark, P.stalkMid, P.stalkHi, 7, r);
    if (!fruiting) return;
    var n = 2 + Math.floor(r() * 3);
    for (var i = 0; i < n; i++) {
      var fy = baseY - 8 - Math.floor(r() * (h - 16));
      var fx = x + (r() < 0.5 ? -5 : 4) + Math.floor(r() * 3);
      c.fillStyle = P.stalkDark; c.fillRect(fx + 1, fy - 2, 1, 2);
      c.fillStyle = P.tomMid;  c.fillRect(fx, fy, 4, 4); c.fillRect(fx + 1, fy - 1, 2, 1);
      c.fillStyle = P.tomHi;   c.fillRect(fx, fy, 2, 1);
      c.fillStyle = P.tomShine; c.fillRect(fx, fy, 1, 1);
      c.fillStyle = P.tomDark; c.fillRect(fx + 3, fy + 2, 1, 2);
      c.fillStyle = P.stalkMid; c.fillRect(fx + 1, fy - 1, 2, 1);
    }
  }

  function pepperPlant(c, x, baseY, h, r, fruiting) {
    stem(c, x, baseY, h, r() * 2, P.leafDark, P.leafMid, P.leafLight, 5, r);
    if (!fruiting) return;
    var n = 2 + Math.floor(r() * 3);
    for (var i = 0; i < n; i++) {
      var fy = baseY - 6 - Math.floor(r() * (h - 12));
      var fx = x + (r() < 0.5 ? -4 : 3);
      var hot = r() < 0.5;
      c.fillStyle = P.stalkMid; c.fillRect(fx + 1, fy - 1, 1, 1);
      for (var k = 0; k < 5; k++) {
        c.fillStyle = hot ? (k < 2 ? P.hotHi : P.hotMid) : (k < 2 ? P.tomHi : P.tomMid);
        c.fillRect(fx + Math.round(Math.sin(k * 0.5) * 1), fy + k, k > 3 ? 1 : 2, 1);
      }
      c.fillStyle = hot ? P.hotDark : P.tomDark;
      c.fillRect(fx, fy + 4, 1, 1);
    }
  }

  function strawberryPlant(c, x, baseY, r, fruiting) {
    /* low and wide: three lobed leaves on short stalks */
    for (var i = 0; i < 5; i++) {
      var lx = x + (i - 2) * 4 + Math.floor(r() * 2);
      var ly = baseY - 3 - Math.floor(r() * 5);
      c.fillStyle = P.leafDark; c.fillRect(lx, ly, 1, baseY - ly);
      c.fillStyle = i % 2 ? P.leafLight : P.leafMid;
      c.fillRect(lx - 2, ly - 2, 5, 2); c.fillRect(lx - 1, ly - 3, 3, 1);
      c.fillStyle = P.leafDark; c.fillRect(lx - 2, ly, 5, 1);
    }
    if (!fruiting) return;
    for (var k = 0; k < 2; k++) {
      var bx = x - 3 + k * 6, by = baseY - 3;
      c.fillStyle = P.berryMid; c.fillRect(bx, by, 3, 3); c.fillRect(bx, by + 3, 2, 1);
      c.fillStyle = P.berryHi;  c.fillRect(bx, by, 1, 1);
      c.fillStyle = P.bloomPale; c.fillRect(bx + 2, by + 1, 1, 1);
      c.fillStyle = P.stalkMid; c.fillRect(bx + 1, by - 1, 1, 1);
    }
    /* a white flower or two */
    if (r() < 0.6) {
      var wx = x + 4, wy = baseY - 9;
      c.fillStyle = P.bloomPale; c.fillRect(wx - 1, wy, 3, 3);
      c.fillStyle = P.bloomGold; c.fillRect(wx, wy + 1, 1, 1);
    }
  }

  function herbPlant(c, x, baseY, h, r) {
    /* basil / mint / cilantro: tight upright stems, paired round leaves */
    for (var i = 0; i < 3; i++) {
      var sx = x + (i - 1) * 3;
      var sh = h - Math.abs(i - 1) * 4;
      for (var y = 0; y < sh; y++) {
        c.fillStyle = y > sh * 0.6 ? P.mintHi : P.mintMid;
        c.fillRect(sx, baseY - y, 1, 1);
      }
      for (var k = 3; k < sh; k += 4) {
        c.fillStyle = k > sh * 0.6 ? P.mintHi : P.mintMid;
        c.fillRect(sx - 2, baseY - k, 2, 1);
        c.fillRect(sx + 1, baseY - k, 2, 1);
        c.fillStyle = P.mintDark;
        c.fillRect(sx - 2, baseY - k + 1, 1, 1);
        c.fillRect(sx + 2, baseY - k + 1, 1, 1);
      }
    }
  }

  function potatoPlant(c, x, baseY, h, r) {
    stem(c, x, baseY, h, r() * 2, P.leafDark, P.leafMid, P.leafLight, 4, r);
    if (r() < 0.7) {
      var fx = x + (r() < 0.5 ? -4 : 3), fy = baseY - h + 4;
      c.fillStyle = P.bloomPale; c.fillRect(fx, fy, 3, 2); c.fillRect(fx + 1, fy - 1, 1, 1);
      c.fillStyle = P.bloomGold; c.fillRect(fx + 1, fy, 1, 1);
    }
  }

  /* One row of the bed. `near` rows are taller, brighter and carry food.
     The understory goes down first and the crops stand in it, which is
     what stops a row reading as a picket fence of stems. */
  function plantRow(c, W, baseY, near, seed) {
    var r = mulberry32(seed);
    understory(c, W, baseY, near ? 30 : 20, r,
               P.leafDark, P.leafMid, near ? P.leafLight : P.leafMid);
    var x = -8;
    while (x < W + 12) {
      var kind = Math.floor(r() * 5);
      var h = (near ? 54 : 34) + Math.floor(r() * (near ? 34 : 18));
      /* one in five bolts well above the rest, and the row's footing
         wanders - without this the crop tops line up into a flat band
         with a hard horizontal edge across the whole screen */
      if (r() < 0.2) h = Math.round(h * (1.4 + r() * 0.5));
      baseY += Math.round((r() - 0.5) * 5);
      if (kind === 0) tomatoPlant(c, x, baseY, h, r, near);
      else if (kind === 1) pepperPlant(c, x, baseY, h - 8, r, near);
      else if (kind === 2) strawberryPlant(c, x, baseY, r, near);
      else if (kind === 3) herbPlant(c, x, baseY, Math.round(h * 0.5), r);
      else potatoPlant(c, x, baseY, h - 14, r);
      x += 6 + Math.floor(r() * 7);
    }
  }

  /* the far row: smaller, no fruit, sunk into shade */
  function bakeBackPlants() {
    var W = 164, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    plantRow(c, W, 208, false, 909);
    plantRow(c, W, 188, false, 4242);
    plantRow(c, W, 168, false, 7781);
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 8);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* the near row: full height, fruiting, catching the sun */
  function bakeFrontPlants() {
    var W = 188, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    plantRow(c, W, 236, true, 1337);
    plantRow(c, W, 214, true, 2024);
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 3);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* the white vinyl boards the bed is framed with, and the grey tubs -
     the two things that make the photograph read as a built garden */
  function bakeBed() {
    var W = 236, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;

    /* a grey tub with a tomato cage leg in it */
    var tx = 150, ty = 14;
    c.fillStyle = P.outline; c.fillRect(tx - 1, ty - 1, 40, 42);
    c.fillStyle = P.tubMid;  c.fillRect(tx, ty, 38, 40);
    c.fillStyle = P.tubHi;   c.fillRect(tx + 2, ty + 2, 5, 36);
    c.fillStyle = P.tubDark; c.fillRect(tx + 30, ty + 2, 6, 36);
    c.fillStyle = P.tubHi;   c.fillRect(tx, ty, 38, 3);
    c.fillStyle = P.outline; c.fillRect(tx, ty + 3, 38, 1);
    for (var b = 0; b < 3; b++) { c.fillStyle = P.tubDark; c.fillRect(tx + 2, ty + 12 + b * 10, 34, 1); }

    /* the white raised-bed board running the length of the tile */
    c.fillStyle = P.boardEdge; c.fillRect(0, 40, W, 24);
    c.fillStyle = P.board;     c.fillRect(0, 41, W, 22);
    c.fillStyle = P.boardHi;   c.fillRect(0, 41, W, 4);
    c.fillStyle = P.boardLo;   c.fillRect(0, 57, W, 4);
    c.fillStyle = P.boardEdge; c.fillRect(0, 40, W, 1);
    /* the capped posts the boards slot into */
    for (var px = 18; px < W; px += 74) {
      c.fillStyle = P.boardEdge; c.fillRect(px - 1, 34, 12, 30);
      c.fillStyle = P.board;     c.fillRect(px, 35, 10, 29);
      c.fillStyle = P.boardHi;   c.fillRect(px, 35, 10, 3);
      c.fillStyle = P.boardLo;   c.fillRect(px + 7, 38, 3, 26);
    }
    return t;
  }

  /* a single 5x3 leaf, pointing left or right */
  function leaf(c, x, y, colour, dir) {
    c.fillStyle = colour;
    c.fillRect(x, y + 1, 5, 1);
    c.fillRect(x + (dir > 0 ? 1 : 1), y, 3, 1);
    c.fillRect(x + (dir > 0 ? 1 : 1), y + 2, 3, 1);
    c.fillStyle = P.leafDark;
    c.fillRect(x + (dir > 0 ? 4 : 0), y + 1, 1, 1);
  }

  /* wire tomato cages and stakes, the structural layer */
  function bakeCage() {
    var W = 232, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;

    /* ONE cage per tile, and short. Two full-height cages per tile turned
       the whole screen into a grid that fought the pillars for attention. */
    [34].forEach(function (cx) {
      var top = 84, bot = 198, w = 58;
      var x0 = cx, x1 = cx + w;
      [0, 0.42, 0.84].forEach(function (k) {
        var hy = Math.round(top + k * (bot - top));
        var bulge = Math.round(4 + k * 5);
        hoop(c, x0 - bulge, hy, w + bulge * 2);
      });
      [x0, Math.round(x0 + w / 2), x1].forEach(function (ux) {
        c.fillStyle = P.cageWire; c.fillRect(ux, top, 2, bot - top);
        c.fillStyle = P.cageHi;   c.fillRect(ux, top, 1, bot - top);
        c.fillStyle = P.outline;  c.fillRect(ux + 2, top, 1, bot - top);
        /* the leg pushed into the soil */
        c.fillStyle = P.cageWire; c.fillRect(ux, bot, 2, 18);
      });
    });

    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 10);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  function hoop(c, x, y, w) {
    c.fillStyle = P.cageWire;
    c.fillRect(x, y, w, 2);
    c.fillStyle = P.cageHi;
    c.fillRect(x + 2, y, w - 4, 1);
    c.fillStyle = P.outline;
    c.fillRect(x, y + 2, w, 1);
  }

  /* Vines spilling out of the canopy. In the photograph the tomatoes hang
     down into frame from above; without them the top third of the level is
     a flat sheet of stucco. */
  function bakeVines() {
    var W = 196, H = 132;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(6161);
    var x = 4;
    while (x < W) {
      var len = 18 + Math.floor(r() * 74);
      var sway = r() * TAU;
      for (var i = 0; i < len; i++) {
        var vx = x + Math.round(Math.sin(i * 0.07 + sway) * 5);
        c.fillStyle = i > len * 0.7 ? P.stalkHi : P.stalkMid;
        c.fillRect(vx, i, 1, 1);
        c.fillStyle = P.leafDark;
        c.fillRect(vx + 1, i, 1, 1);
        if (i > 3 && i % 7 === 0) {
          var dir = (i % 14 === 0) ? 1 : -1;
          sprig(c, vx + (dir > 0 ? 2 : -1), i, dir, 0,
                r() < 0.5 ? P.leafMid : P.leafLight, P.leafDark);
        }
      }
      /* a tomato or two hanging on the longer ones */
      if (len > 44 && r() < 0.7) {
        var fy = Math.floor(len * (0.55 + r() * 0.3));
        var fx = x + Math.round(Math.sin(fy * 0.07 + sway) * 5) - 1;
        c.fillStyle = P.tomMid;  c.fillRect(fx, fy, 4, 4);
        c.fillStyle = P.tomHi;   c.fillRect(fx, fy, 2, 1);
        c.fillStyle = P.tomDark; c.fillRect(fx + 3, fy + 2, 1, 2);
        c.fillStyle = P.stalkMid; c.fillRect(fx + 1, fy - 1, 2, 1);
      }
      x += 9 + Math.floor(r() * 16);
    }
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 4);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* the leaf canopy overhead, the Garden's answer to the rafters */
  function bakeCanopy() {
    var W = 112, H = CEIL;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(4410);
    c.fillStyle = P.void; c.fillRect(0, 0, W, H);
    c.fillStyle = P.leafDark; c.fillRect(0, 0, W, H - 4);
    /* a mass of leaves hanging down, lighter where the sun gets through */
    for (var i = 0; i < 90; i++) {
      var x = Math.floor(r() * W), y = Math.floor(r() * (H - 2));
      var v = r();
      leaf(c, x, y, v < 0.5 ? P.leafMid : (v < 0.82 ? P.leafLight : P.leafHi), v < 0.5 ? 1 : -1);
    }
    /* a stem running along the underside */
    c.fillStyle = P.stalkMid; c.fillRect(0, H - 6, W, 2);
    c.fillStyle = P.stalkHi;  c.fillRect(0, H - 6, W, 1);
    c.fillStyle = P.outline;  c.fillRect(0, H - 4, W, 1);
    /* tips poking below the stem */
    for (var k = 0; k < 16; k++) {
      var tx = Math.floor(r() * W);
      c.fillStyle = r() < 0.5 ? P.leafMid : P.leafLight;
      c.fillRect(tx, H - 4, 1, 1 + Math.floor(r() * 3));
    }
    return t;
  }

  /* mulch, wood chips, the white board lip and the drip line */
  function bakeFloor() {
    var W = 144, H = VH - FLOOR;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2718);

    c.fillStyle = P.soilMid; c.fillRect(0, 0, W, H);
    Tint.rect(c, 0, 0, W, H, P.soilDark, 5);
    Tint.rect(c, 0, H - 10, W, 10, P.soilDark, 7);

    /* bark chips */
    for (var i = 0; i < 120; i++) {
      var x = Math.floor(r() * W), y = 2 + Math.floor(r() * (H - 4));
      var len = 2 + Math.floor(r() * 6);
      var v = r();
      c.fillStyle = v < 0.45 ? P.soilLight : (v < 0.8 ? P.chipLight : P.chipPale);
      c.fillRect(x, y, len, 1);
      if (v > 0.85) { c.fillStyle = P.soilDark; c.fillRect(x, y + 1, len, 1); }
    }
    /* the white vinyl board the bed is framed with */
    c.fillStyle = P.board;     c.fillRect(0, 0, W, 4);
    c.fillStyle = P.boardHi;   c.fillRect(0, 0, W, 2);
    c.fillStyle = P.boardLo;   c.fillRect(0, 3, W, 1);
    c.fillStyle = P.boardEdge; c.fillRect(0, 4, W, 1);
    for (var s = 0; s < W; s += 48) { c.fillStyle = P.boardEdge; c.fillRect(s, 0, 1, 4); }
    /* the drip line snaking along just behind the lip */
    for (var dx = 0; dx < W; dx++) {
      var dy = 8 + Math.round(Math.sin(dx * 0.13) * 2);
      c.fillStyle = P.dripLine; c.fillRect(dx, dy, 1, 2);
      if (dx % 37 === 0) { c.fillStyle = P.chipPale; c.fillRect(dx, dy - 1, 2, 1); }
    }
    return t;
  }

  /* a trellis pillar: two stakes, cross ties, vine and thorns */
  function bakePillar(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(700 + variant * 53);

    /* Bamboo stakes. The Coop works because pale planks sit against a dark
       wall; the Garden needs the same trick, so the pillars are the
       LIGHTEST thing here and the foliage behind them is the darkest. */
    c.fillStyle = P.leafDark; c.fillRect(0, 0, W, H);
    [2, 19].forEach(function (sx) {
      c.fillStyle = P.bambooMid;  c.fillRect(sx, 0, 13, H);
      c.fillStyle = P.bambooLit;  c.fillRect(sx + 2, 0, 4, H);
      c.fillStyle = P.bambooDark; c.fillRect(sx + 10, 0, 3, H);
      c.fillStyle = P.outline;    c.fillRect(sx, 0, 1, H); c.fillRect(sx + 12, 0, 1, H);
      /* the nodes every bamboo cane has */
      for (var ny = (sx === 2 ? 5 : 13); ny < H; ny += 21) {
        c.fillStyle = P.bambooNode; c.fillRect(sx, ny, 13, 2);
        c.fillStyle = P.bambooLit;  c.fillRect(sx + 1, ny + 2, 11, 1);
      }
    });
    /* twine lashing the pair together */
    for (var y = 8; y < H; y += 22) {
      c.fillStyle = P.bambooNode; c.fillRect(1, y, W - 2, 2);
      c.fillStyle = P.chipPale;   c.fillRect(1, y, W - 2, 1);
    }
    /* vine winding up the front, with leaves */
    for (var vy = 0; vy < H; vy++) {
      var vx = 17 + Math.round(Math.sin(vy * 0.21 + variant) * 8);
      c.fillStyle = P.stalkHi; c.fillRect(vx, vy, 2, 1);
      if (vy % 9 === 0) leaf(c, vx - 4, vy, r() < 0.5 ? P.leafLight : P.leafHi, r() < 0.5 ? 1 : -1);
    }
    if (variant === 1) {
      /* a couple of fruit hanging on the vine */
      for (var f = 0; f < 2; f++) {
        var fy = 12 + f * 28;
        c.fillStyle = P.tomMid; c.fillRect(13, fy, 5, 4);
        c.fillStyle = P.tomHi;  c.fillRect(14, fy, 2, 1);
        c.fillStyle = P.stalkDark; c.fillRect(15, fy - 1, 1, 1);
      }
    }
    return t;
  }

  function build() {
    T.wall = bakeWall();
    T.backPlants = bakeBackPlants();
    T.frontPlants = bakeFrontPlants();
    T.bed = bakeBed();
    T.cage = bakeCage();
    T.vines = bakeVines();
    T.canopy = bakeCanopy();
    T.floor = bakeFloor();
    T.pillar = [bakePillar(0), bakePillar(1)];
  }

  /* ------------------------------------------------------- drawing */

  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = P.wallMid;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * 0.14, 0);
    tileX(ctx, T.backPlants.canvas, scroll * 0.26, 0);
    tileX(ctx, T.cage.canvas, scroll * 0.38, 0);
    tileX(ctx, T.vines.canvas, scroll * 0.44, CEIL);
    tileX(ctx, T.frontPlants.canvas, scroll * 0.5, 0);
    tileX(ctx, T.bed.canvas, scroll * 0.62, FLOOR - 58);
    /* warm air, brighter up where the sun clears the canopy */
    Tint.rect(ctx, 0, 0, VW, VH, P.wallShadow, 4);
    Tint.rect(ctx, 0, CEIL, VW, 54, P.sunHaze, 2);
    Tint.rect(ctx, 0, FLOOR - 70, VW, 70, P.void, 4);
    Tint.rect(ctx, 0, CEIL, 46, FLOOR - CEIL, P.void, 4);
    Tint.rect(ctx, VW - 46, CEIL, 46, FLOOR - CEIL, P.void, 4);
  }

  function drawMenuBackdrop(ctx, scroll) {
    ctx.fillStyle = P.wallMid; ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * 0.3, 0);
    Tint.rect(ctx, 0, 0, VW, VH, P.wallShadow, 6);
    Tint.rect(ctx, 0, VH - 120, VW, 120, P.void, 4);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.canopy.canvas, scroll, 0);
    Tint.rect(ctx, 0, CEIL, VW, 12, P.void, 7);
    Tint.rect(ctx, 0, CEIL, VW, 5, P.void, 5);
  }

  function drawFloor(ctx, scroll) {
    Tint.rect(ctx, 0, FLOOR - 10, VW, 10, P.void, 6);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
  }

  /* --------------------------------------------------------- pillar */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.pillar[ob.variant].canvas;
    var w = tile.width;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (topH > 0) drawColumn(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) drawColumn(ctx, tile, x, botY, w, botH);
    /* the thorny vines that stick out of the sides */
    drawThorns(ctx, ob, x, CEIL, topH, w);
    drawThorns(ctx, ob, x, botY, botH, w);
    if (topH > 0) drawCap(ctx, x, ob.gapY - 9, w, false);
    if (botH > 0) drawCap(ctx, x, botY, w, true);
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH : 0, P.void, 7);
    Tint.rect(ctx, x + w, botY, 4, botH > 0 ? botH : 0, P.void, 7);
  }

  function drawColumn(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* Short thorny vines off the left and right faces. They reach 5px out,
     which widens the column without ever reaching into the gap. */
  function drawThorns(ctx, ob, x, y, h, w) {
    if (h <= 14) return;
    for (var i = 0; i < ob.thorns.length; i++) {
      var th = ob.thorns[i];
      var ty = y + Math.round(th.k * (h - 10)) + 5;
      var dir = th.side ? 1 : -1;
      var bx = th.side ? x + w - 1 : x;
      for (var s = 0; s < th.len; s++) {
        var yy = ty + Math.round(Math.sin(s * 0.9 + th.bend) * 1.2);
        ctx.fillStyle = s > th.len - 2 ? P.outline : P.stalkDark;
        ctx.fillRect(bx + dir * s, yy, 1, 2);
        ctx.fillStyle = P.stalkHi;
        ctx.fillRect(bx + dir * s, yy, 1, 1);
      }
      /* the barb on the end, pale so it reads as sharp */
      ctx.fillStyle = P.outline;
      ctx.fillRect(bx + dir * th.len, ty - 2, 1, 3);
      ctx.fillStyle = P.leafPale;
      ctx.fillRect(bx + dir * th.len, ty - 1, 1, 1);
    }
  }

  function drawCap(ctx, x, y, w, pointingDown) {
    var cx = x - 4, cw = w + 8, ch = 9;
    ctx.fillStyle = P.bambooMid;  ctx.fillRect(cx, y, cw, ch);
    ctx.fillStyle = P.bambooLit;  ctx.fillRect(cx, y + (pointingDown ? 1 : ch - 4), cw, 2);
    ctx.fillStyle = P.bambooDark; ctx.fillRect(cx, y + (pointingDown ? ch - 3 : 0), cw, 3);
    ctx.fillStyle = P.outline;
    ctx.fillRect(cx, y, cw, 1); ctx.fillRect(cx, y + ch - 1, cw, 1);
    ctx.fillRect(cx, y, 1, ch); ctx.fillRect(cx + cw - 1, y, 1, ch);
    /* a leaf cluster bursting out of the mouth */
    leaf(ctx, cx + 3, y + 3, P.leafHi, 1);
    leaf(ctx, cx + cw - 8, y + 3, P.leafLight, -1);
  }

  /* ------------------------------------------------- mint sprouts */

  function drawSprouts(ctx, ob) {
    var x = Math.round(ob.x);
    var down = ob.side === 'ceil';
    var baseY = down ? CEIL : FLOOR;
    for (var i = 0; i < ob.spikes.length; i++) {
      var n = ob.spikes[i];
      drawSprout(ctx, x + n.dx, baseY, n.len, down, n.bend);
    }
  }

  function drawSprout(ctx, x, baseY, len, down, bend) {
    var dir = down ? 1 : -1;
    for (var i = 0; i < len; i++) {
      var k = i / len;
      var off = Math.round(Math.sin(k * 2.2 + bend) * (k * 2.2));
      var y = baseY + dir * i;
      ctx.fillStyle = i > len * 0.5 ? P.mintMid : P.mintDark;
      ctx.fillRect(x + off, y, 2, 1);
      ctx.fillStyle = P.mintHi;
      ctx.fillRect(x + off, y, 1, 1);
      /* paired leaves every few pixels, the way mint grows */
      if (i > 2 && i % 4 === 0) {
        ctx.fillStyle = P.mintMid;
        ctx.fillRect(x + off - 2, y, 2, 1);
        ctx.fillRect(x + off + 2, y, 2, 1);
        ctx.fillStyle = P.mintHi;
        ctx.fillRect(x + off - 2, y + dir, 1, 1);
        ctx.fillRect(x + off + 3, y + dir, 1, 1);
      }
      if (i === len - 1) {
        ctx.fillStyle = P.mintPale;
        ctx.fillRect(x + off - 1, y + dir, 4, 1);
        ctx.fillStyle = P.mintHi;
        ctx.fillRect(x + off, y + dir * 2, 2, 1);
      }
    }
  }

  /* ------------------------------------------ tomatoes and peppers */

  var TOM_ROWS   = [[2, 5], [1, 7], [0, 9], [0, 9], [0, 9], [1, 7], [2, 5]];
  var PEP_ROWS   = [[3, 3], [2, 4], [1, 5], [1, 5], [0, 5], [0, 4], [1, 3], [2, 2], [3, 2]];

  function rowsFill(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0], y + i, rows[i][1], 1);
  }

  function rowsOutline(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0] - 1, y + i, rows[i][1] + 2, 1);
    c.fillRect(x + rows[0][0], y - 1, rows[0][1], 1);
    var last = rows[rows.length - 1];
    c.fillRect(x + last[0], y + rows.length, last[1], 1);
  }

  function bakeTomato() {
    var t = makeCanvas(11, 11), c = t.ctx;
    rowsOutline(c, TOM_ROWS, 1, 2, P.outline);
    rowsFill(c, TOM_ROWS, 1, 2, P.tomMid);
    c.fillStyle = P.tomHi;
    c.fillRect(2, 3, 5, 1); c.fillRect(2, 4, 3, 2); c.fillRect(2, 6, 2, 1);
    c.fillStyle = P.tomShine; c.fillRect(3, 3, 3, 1); c.fillRect(2, 4, 2, 1);
    c.fillStyle = P.tomDark;
    c.fillRect(7, 5, 2, 1); c.fillRect(7, 6, 2, 1); c.fillRect(6, 7, 2, 1);
    /* the green calyx: the one thing a pepper never has */
    c.fillStyle = P.stalkMid;
    c.fillRect(4, 1, 3, 1); c.fillRect(3, 2, 2, 1); c.fillRect(6, 2, 2, 1);
    c.fillStyle = P.stalkHi; c.fillRect(5, 0, 1, 2);
    return t;
  }

  function bakePepper() {
    var t = makeCanvas(9, 13), c = t.ctx;
    rowsOutline(c, PEP_ROWS, 1, 2, P.outline);
    rowsFill(c, PEP_ROWS, 1, 2, P.hotMid);
    c.fillStyle = P.hotHi;
    c.fillRect(3, 4, 2, 1); c.fillRect(2, 5, 2, 1); c.fillRect(2, 6, 1, 2);
    c.fillStyle = P.hotDark;
    c.fillRect(5, 7, 1, 2); c.fillRect(4, 9, 1, 1);
    c.fillStyle = P.stalkMid; c.fillRect(4, 1, 2, 2);
    c.fillStyle = P.stalkHi;  c.fillRect(4, 0, 1, 2);
    return t;
  }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x + Math.sin(ob.spin) * 1.2);
    var y = Math.round(ob.y);
    if (!ob.spicy) { ctx.drawImage(T.tomato.canvas, x - 5, y - 5); return; }
    var pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
    var r = Math.round(14 + pulse * 5);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(255,200,97,' + (0.46 * pulse).toFixed(3) + ')');
    g.addColorStop(0.55, 'rgba(255,74,26,' + (0.22 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(140,18,8,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    for (var i = 0; i < 3; i++) {
      var k = (ob.spin * 0.7 + i * 0.41) % 1;
      ctx.fillStyle = i % 2 ? P.hotGlow : P.hotHi;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), y - 8 - Math.round(k * 7), 1, 1);
    }
    ctx.drawImage(T.pepper.canvas, x - 4, y - 6);
  }

  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(11 - k * 5);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3,
              ob.spicy ? P.hotHi : P.void, 6 + k * 9);
  }

  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x), y = FLOOR + 1;
    var spread = Math.round(7 + (1 - k) * 3);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);
    ctx.fillStyle = ob.spicy ? P.hotDark : P.tomDark;
    ctx.fillRect(x - spread, y + 1, spread * 2, 2);
    ctx.fillStyle = ob.spicy ? P.hotMid : P.tomMid;
    ctx.fillRect(x - 3, y, 7, 2);
    ctx.fillStyle = ob.spicy ? P.hotGlow : P.tomShine;
    ctx.fillRect(x - 1, y, 2, 1);
    ctx.fillStyle = ob.spicy ? P.hotHi : P.tomHi;
    ctx.fillRect(x - spread - 2, y + 2, 2, 1);
    ctx.fillRect(x + spread, y + 1, 2, 1);
    ctx.globalAlpha = a;
  }

  /* ----------------------------------------------- the succulent */

  /* The pot and the plant are baked separately and share one 20x20
     coordinate space, so drawing both at the same origin reassembles the
     original picture exactly - but Gerald's hunger can lift the rosette
     out and leave the pot standing on the soil. */
  function bakePot() {
    var t = makeCanvas(20, 20), c = t.ctx;
    c.fillStyle = P.outline;  c.fillRect(4, 11, 12, 9);
    c.fillStyle = P.potMid;   c.fillRect(5, 12, 10, 7);
    c.fillStyle = P.potHi;    c.fillRect(5, 12, 10, 2);
    c.fillStyle = P.potDark;  c.fillRect(5, 17, 10, 2);
    c.fillStyle = P.outline;  c.fillRect(4, 11, 12, 1); c.fillRect(6, 19, 8, 1);
    c.fillStyle = P.potHi;    c.fillRect(6, 12, 8, 1);
    c.fillStyle = P.soilDark; c.fillRect(6, 13, 8, 1);
    return t;
  }

  /* a jade rosette: three rings of fat leaves, pink at the tips */
  function bakeRosette() {
    var t = makeCanvas(20, 20), c = t.ctx;
    var rings = [
      { y: 10, xs: [[3, 4], [13, 4]], col: P.sucDark },
      { y: 8,  xs: [[4, 4], [12, 4], [8, 4]], col: P.sucMid },
      { y: 6,  xs: [[6, 3], [11, 3]], col: P.sucMid },
      { y: 4,  xs: [[8, 4]], col: P.sucHi }
    ];
    rings.forEach(function (ring) {
      ring.xs.forEach(function (p) {
        c.fillStyle = P.outline; c.fillRect(p[0] - 1, ring.y - 1, p[1] + 2, 4);
        c.fillStyle = ring.col;  c.fillRect(p[0], ring.y, p[1], 2);
        c.fillStyle = P.sucHi;   c.fillRect(p[0], ring.y, 1, 1);
        c.fillStyle = P.sucTip;  c.fillRect(p[0] + p[1] - 1, ring.y, 1, 1);
      });
    });
    c.fillStyle = P.sucHi;  c.fillRect(9, 4, 2, 2);
    c.fillStyle = P.sucTip; c.fillRect(9, 3, 2, 1);
    return t;
  }

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var px = Math.round(ob.x), py = FLOOR;
    var rx = Math.round(ob.x + ob.dx), ry = Math.round(FLOOR + ob.dy);
    var lifted = ob.dy < -1 || ob.dx > 1 || ob.dx < -1;

    /* the pot stays where it was planted */
    ctx.drawImage(T.pot.canvas, px - 10, py - 19);

    /* a calm green glow - nothing else on the ground shines - and it
       travels with the plant, not the pot */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase);
    var r = Math.round(15 + pulse * 4);
    var g = ctx.createRadialGradient(rx, ry - 8, 1, rx, ry - 8, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(rx - r, ry - 8 - r, r * 2, r * 2);

    /* soil trailing off the roots once it is out of the pot */
    if (lifted) {
      for (var d = 0; d < 3; d++) {
        var kk = (ob.phase * 0.5 + d * 0.33) % 1;
        ctx.fillStyle = d % 2 ? P.soilLight : P.chipLight;
        ctx.fillRect(rx - 2 + d * 2, ry - 4 + Math.round(kk * 6), 1, 1);
      }
    }
    ctx.drawImage(T.rosette.canvas, rx - 10, ry - 19);

    for (var i = 0; i < 2; i++) {
      var k = (ob.phase * 0.22 + i * 0.5) % 1;
      ctx.fillStyle = i ? P.sucHi : P.mintPale;
      ctx.fillRect(rx - 4 + i * 7, ry - 20 - Math.round(k * 9), 1, 1);
    }
  }

  /* ---------------------------------------------- ground dressing */

  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2;
    if (ob.kind === 0) {
      for (var i = 0; i < ob.seed.length; i++) {
        ctx.fillStyle = i % 3 ? P.chipPale : P.chipLight;
        ctx.fillRect(x + ob.seed[i][0], y + ob.seed[i][1], 2, 1);
      }
    } else if (ob.kind === 1) {
      leaf(ctx, x, y + 2, P.leafLight, 1);
      leaf(ctx, x + 6, y + 4, P.leafDark, -1);
    } else {
      ctx.fillStyle = P.paver;   ctx.fillRect(x, y + 1, 16, 5);
      ctx.fillStyle = '#d8d2bc'; ctx.fillRect(x + 1, y + 1, 14, 1);
      ctx.fillStyle = P.outline; ctx.fillRect(x, y + 6, 16, 1);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawSprouts(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ------------------------------------------------- the cover art

     The little window on the level select. It was painting the Coop's
     shapes in the Garden's colours, which read as neither level. This
     draws the Garden's own: stucco, a bed of fruiting crops, bamboo
     trellises with a gap, the white board and the mulch. The caller has
     already clipped to the box, so nothing here clips or restores. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var soil = y + h - Math.round(h * 0.17);
    var canopy = y + Math.round(h * 0.09);

    /* stucco, lighter at the top where the sun is */
    ctx.fillStyle = P.wallMid; ctx.fillRect(x, y, w, h);
    Tint.rect(ctx, x, y, w, Math.round(h * 0.5), P.wallLit, 4);
    Tint.rect(ctx, x, y + h - 40, w, 40, P.wallShadow, 4);

    /* the canopy across the top, with a couple of vines hanging in */
    ctx.fillStyle = P.leafDark; ctx.fillRect(x, y, w, canopy - y);
    ctx.fillStyle = P.leafMid;  ctx.fillRect(x, canopy - 2, w, 2);
    for (var v = 0; v < 4; v++) {
      var vx = Math.round(x + ((v * 29 - s * 0.5) % (w + 14)) - 7);
      if (vx < x - 2 || vx > x + w) continue;
      var vlen = 8 + (v % 3) * 7;
      ctx.fillStyle = P.stalkMid;
      ctx.fillRect(vx, canopy, 1, vlen);
      ctx.fillStyle = P.leafLight;
      ctx.fillRect(vx - 1, canopy + vlen - 4, 3, 2);
    }

    /* The bed: three bands of crop mass with fruit in it. The heights come
       off a cheap hash rather than a modulus - a plain `i % 9` marched up
       and down in a sawtooth and the band read as a picket fence. */
    for (var band = 0; band < 3; band++) {
      var by = soil - 4 - band * Math.round(h * 0.13);
      var depth = Math.round(h * 0.24) - band * 2;
      var tone = band === 0 ? P.leafMid : (band === 1 ? P.leafMid : P.leafDark);
      var lit  = band === 0 ? P.leafLight : P.leafMid;
      for (var i = 0; i < w / 2 + 2; i++) {
        var px = x + ((i * 5 + band * 4) % (w + 4)) - 2;
        var n = (i * 1103515245 + band * 12345) >>> 0;
        var jitter = (n >>> 16) % 17;
        var ph = 5 + jitter + band * 3;
        ctx.fillStyle = tone;
        ctx.fillRect(px, by - ph, 3, ph + depth);
        if (jitter > 9) {
          ctx.fillStyle = lit;
          ctx.fillRect(px - 2, by - ph - 2, 6, 3);
          ctx.fillRect(px - 1, by - ph - 4, 4, 2);
        }
        if (jitter % 5 === 0) {
          ctx.fillStyle = (jitter % 3) ? P.tomMid : P.hotMid;
          ctx.fillRect(px, by - Math.round(ph * 0.55), 2, 2);
          ctx.fillStyle = P.tomHi;
          ctx.fillRect(px, by - Math.round(ph * 0.55), 1, 1);
        }
      }
    }

    /* two bamboo trellises with a gap you could fly through */
    var period = big ? 46 : 38;
    for (var k = 0; k < 3; k++) {
      var ox = Math.round(x + w + 10 - ((s + k * period) % (period * 3)));
      if (ox < x - 12 || ox > x + w + 2) continue;
      var span = soil - canopy;
      var gapH = Math.round(span * 0.36);
      var gapY = Math.round(canopy + 4 + ((k * 19) % Math.max(1, span - gapH - 10)));
      stake(ctx, ox, canopy, gapY - canopy);
      stake(ctx, ox, gapY + gapH, soil - gapY - gapH);
    }

    /* the white board and the mulch in front of everything */
    ctx.fillStyle = P.board;     ctx.fillRect(x, soil - 4, w, 4);
    ctx.fillStyle = P.boardHi;   ctx.fillRect(x, soil - 4, w, 1);
    ctx.fillStyle = P.boardEdge; ctx.fillRect(x, soil - 1, w, 1);
    ctx.fillStyle = P.soilMid;   ctx.fillRect(x, soil, w, y + h - soil);
    Tint.rect(ctx, x, soil, w, y + h - soil, P.soilDark, 6);
    for (var ch = 0; ch < w / 4; ch++) {
      var cx2 = x + ((ch * 11 + Math.round(s)) % w);
      ctx.fillStyle = ch % 3 ? P.chipLight : P.chipPale;
      ctx.fillRect(cx2, soil + 2 + (ch % 3), 3, 1);
    }

    /* a falling tomato, and the doodad flying it */
    var ty2 = y + 6 + ((s * 1.6) % (soil - y - 10));
    ctx.fillStyle = P.tomMid;  ctx.fillRect(x + Math.round(w * 0.72), Math.round(ty2), 3, 3);
    ctx.fillStyle = P.stalkHi; ctx.fillRect(x + Math.round(w * 0.72) + 1, Math.round(ty2) - 1, 1, 1);

    var bx = Math.round(x + w * 0.3);
    var byy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    /* a halo of wall-shadow, so it does not disappear into the stucco */
    Tint.rect(ctx, bx - sz, byy - sz, sz * 2, sz * 2, P.wallShadow, 5);
    ctx.fillStyle = P.outline;  ctx.fillRect(bx - sz / 2 - 1, byy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(bx - sz / 2, byy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(bx - sz / 2, byy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(bx + sz / 2 - 2, byy - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(bx + sz / 2, byy, 2, 1);

    Tint.rect(ctx, x, y, w, h, P.sunHaze, 1);
  }

  /* one little bamboo column inside a cover */
  function stake(ctx, x, y, h) {
    if (h <= 0) return;
    ctx.fillStyle = P.bambooMid;  ctx.fillRect(x, y, 9, h);
    ctx.fillStyle = P.bambooLit;  ctx.fillRect(x + 1, y, 3, h);
    ctx.fillStyle = P.bambooDark; ctx.fillRect(x + 7, y, 2, h);
    ctx.fillStyle = P.outline;    ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 8, y, 1, h);
    for (var ny = y + 5; ny < y + h; ny += 13) {
      ctx.fillStyle = P.bambooNode; ctx.fillRect(x, ny, 9, 1);
    }
  }

  /* ---------------------------------------------------- generation */

  function makePillar(x, gapY, gapH) {
    var thorns = [];
    for (var i = 0; i < 4; i++) {
      thorns.push({ k: rand(0.08, 0.92), side: chance(0.5),
                    len: randInt(3, 5), bend: rand(0, TAU) });
    }
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.35) ? 1 : 0, thorns: thorns, scored: false };
  }

  function makeSpikes(x, side, count, maxLen) {
    var spikes = [], dx = 0;
    for (var i = 0; i < count; i++) {
      var len = Math.round(rand(maxLen * 0.55, maxLen));
      spikes.push({ dx: dx, len: len, bend: rand(0, TAU) });
      dx += randInt(5, 8);
    }
    return { type: 'spike', x: x, side: side, spikes: spikes, w: dx + 2 };
  }

  function makeDrop(x, spicy, fall) {
    return { type: 'drop', x: x, y: CEIL + 5, w: spicy ? 8 : 9,
             vy: fall, spicy: !!spicy, broken: 0,
             spin: rand(0, TAU), spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1) };
  }

  function makeBoon(x) {
    /* dx/dy is where the rosette has got to relative to its pot; Gerald's
       hunger moves it, and it is zero for every other doodad */
    return { type: 'boon', x: x, w: 20, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0 };
  }

  function makeLitter(x) {
    var kind = randInt(0, 2), seed = [];
    if (kind === 0) for (var i = 0; i < 12; i++) seed.push([randInt(0, 18), randInt(0, 5)]);
    return { type: 'litter', x: x, kind: kind, seed: seed, w: 18 };
  }

  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
      /* the thorns widen the column where they stick out */
      for (var i = 0; i < ob.thorns.length; i++) {
        var th = ob.thorns[i];
        var seg = th.k < 0.5 ? { y: CEIL, h: topH } : { y: botY + 9, h: botH };
        if (seg.h <= 14) continue;
        var ty = seg.y + Math.round(th.k * (seg.h - 10)) + 4;
        if (th.side) out.push([ob.x + ob.w, ty, th.len, 3]);
        else out.push([ob.x - th.len, ty, th.len, 3]);
      }
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      if (ob.spicy) out.push([ob.x - 5, ob.y - 6, 10, 12]);
      else out.push([ob.x - 4, ob.y - 4, 8, 9]);
    } else if (ob.type === 'boon') {
      /* the plant is what you collect, so the box travels with it */
      if (!ob.taken) out.push([ob.x + ob.dx - 9, FLOOR + ob.dy - 19, 18, 19]);
    } else if (ob.type === 'spike') {
      for (var k = 0; k < ob.spikes.length; k++) {
        var n = ob.spikes[k];
        if (ob.side === 'ceil') out.push([ob.x + n.dx, CEIL, 2, n.len]);
        else out.push([ob.x + n.dx, FLOOR - n.len, 2, n.len]);
      }
    }
    return out;
  }

  function buildSprites() {
    T.tomato = bakeTomato();
    T.pepper = bakePepper();
    T.pot = bakePot();
    T.rosette = bakeRosette();
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    build: function () { build(); buildSprites(); },
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
