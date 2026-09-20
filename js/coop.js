/* ------------------------------------------------------------------
   Land of Doodads - BACKYARD / THE COOP
   A giant DIY chicken coop: slat walls with daylight leaking through,
   chicken wire panels, rafters overhead and a floor of hay + bedding.
   Every pixel here is generated in code and baked into tiles once, so
   the parallax layers cost a handful of drawImage calls per frame.
   All shading here uses flat tints, not dither patterns: everything in
   this file scrolls, and a scrolling dither flickers.
------------------------------------------------------------------ */
'use strict';

var Coop = (function () {

  var P = {
    void:       '#1a120c',
    wallShadow: '#241910',
    haze:       '#2c2015',
    wallDark:   '#2f2116',
    wallMid:    '#3a2a1c',
    wallLight:  '#453120',
    wallWarm:   '#503a26',
    slatGap:    '#c79a56',
    daylight:   '#ffd98f',
    daylightHi: '#fff3cf',
    beamDark:   '#4e3722',
    beamMid:    '#7d5430',
    beamLight:  '#9d6c3d',
    beamHi:     '#c08a52',
    outline:    '#20150c',
    wireDark:   '#3a4149',
    wireLight:  '#525a62',
    wireHi:     '#6d767e',
    hayDark:    '#8a6a28',
    hayMid:     '#c29a37',
    hayLight:   '#e0bb56',
    hayPale:    '#f6e0a0',
    beddingDark:'#5b4520',
    nailDark:   '#565d66',
    nailMid:    '#949ca5',
    nailLight:  '#d5dce2',
    rust:       '#a2613a',
    plankDark:  '#5c3d20',
    plankMid:   '#96663a',
    plankLight: '#b5804a',
    plankHi:    '#d6a663',
    plankEdge:  '#1d1208',
    dust:       '#f2ddb0',
    featherA:   '#e8d6ac',
    featherB:   '#b79a68',
    eggShell:   '#f4e4c8',
    eggShellHi: '#fffaf0',
    eggShade:   '#d3bd99',
    eggShadow:  '#a88f6a',
    eggFleck:   '#c7ab82',
    white:      '#f7f0e0',
    yolk:       '#e8a72c',
    yolkHi:     '#f6cf5e',
    paprika:    '#f0722c',
    devilDark:  '#8c2f18',
    devilMid:   '#c8452a',
    devilHi:    '#ffb45c',
    ember:      '#ff9a3c',
    emberHi:    '#ffd88a'
  };

  var CEIL = 24;          /* rafters occupy 0 .. CEIL          */
  var FLOOR = 242;        /* hay surface: playfield ends here  */

  var DROP_GRAV = 34;      /* eggs pick up speed on the way down */
  var END_MIN = 34;       /* shortest plank stub allowed at either end */
  var SPLAT_TIME = 1.7;   /* how long the mess stays in the hay */

  /* The neutral effect colours every level publishes. PlayScene paints its
     particles, its dust and the spicy wash out of THIS table and never out
     of P - it has no business knowing that this level files its pigments
     under names like `hayLight` and `yolkHi`, which no other level has.
     These values are exactly what PlayScene used to reach in and take, so
     the Coop comes out of the change pixel for pixel the same. */
  var FX = {
    motes:    '#f2ddb0',   motesHi:  '#fff3cf',
    puff:     '#f2ddb0',   puffHi:   '#e0bb56',
    ground:   '#e0bb56',   groundHi: '#f6e0a0',
    splat:    '#f4e4c8',   splatHi:  '#f6cf5e',
    hot:      '#f0722c',   hotMid:   '#ff9a3c',  hotHi: '#ffd88a',
    heat:     '#f0722c',   heatEdge: '#c8452a',
    glowCore: '255,216,138', glowEdge: '240,114,44'
  };

  /* the one-off heads up when a hazard arms; null for a hazard that has none */
  var WARN = {
    drop:  ['\u25BC EGGS \u25BC', 'MIND THE RAFTERS'],
    spike: null
  };

  /* the ten colours js/scene_levelselect.js paints its preview window with */
  var PREVIEW = {
    back: P.wallDark, backAlt: P.wallMid, seam: P.wallShadow,
    beam: P.beamMid, beamDark: P.beamDark, beamLight: P.beamLight,
    ground: P.hayMid, groundDark: P.hayDark, groundHi: P.hayPale,
    spike: P.nailMid, spikeHi: P.nailLight, air: P.daylight, gloom: P.void
  };

  var T = {};             /* baked tiles */

  /* ---------------------------------------------------------- tiles */

  function bakeWall() {
    var W = 192, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(1337);

    c.fillStyle = P.wallDark;
    c.fillRect(0, 0, W, H);

    /* vertical slats of slightly different tones */
    var shades = [P.wallDark, P.wallMid, P.wallLight, P.wallWarm];
    var gaps = [];
    var x = 0;
    while (x < W) {
      var w = 9 + Math.floor(r() * 8);
      if (x + w > W) w = W - x;
      var shade = shades[Math.floor(r() * shades.length)];
      c.fillStyle = shade;
      c.fillRect(x, 0, w, H);
      /* seam between slats */
      c.fillStyle = P.wallShadow;
      c.fillRect(x, 0, 1, H);
      /* a few slats have daylight leaking through the seam - brightest
         where it enters, gone before it reaches the bedding */
      if (r() < 0.2) {
        c.fillStyle = P.slatGap;
        c.fillRect(x, 0, 1, Math.round(H * 0.26));
        Tint.rect(c, x, Math.round(H * 0.26), 1, Math.round(H * 0.2), P.slatGap, 8);
        Tint.rect(c, x, Math.round(H * 0.46), 1, Math.round(H * 0.18), P.slatGap, 3);
        gaps.push(x);
      }
      /* knots and nail heads */
      var knots = Math.floor(r() * 3);
      for (var k = 0; k < knots; k++) {
        var ky = 10 + Math.floor(r() * (H - 20));
        c.fillStyle = P.wallShadow;
        c.fillRect(x + 2 + Math.floor(r() * Math.max(1, w - 5)), ky, 2, 2);
      }
      for (var n = 0; n < 2; n++) {
        var ny = 26 + Math.floor(r() * (H - 60));
        c.fillStyle = P.beamDark;
        c.fillRect(x + 2 + Math.floor(r() * Math.max(1, w - 4)), ny, 1, 1);
      }
      x += w;
    }

    /* grime creeping up from the bedding, and soot under the rafters */
    Tint.rect(c, 0, H - 76, W, 76, P.wallShadow, 5);
    Tint.rect(c, 0, H - 38, W, 38, P.wallShadow, 8);
    Tint.rect(c, 0, 0, W, 30, P.wallShadow, 7);

    /* shafts of daylight falling from the brightest seams */
    for (var g = 0; g < gaps.length; g++) {
      if (g % 3) continue;
      shaft(c, gaps[g], H);
    }
    return t;
  }

  /* a slanted beam of dusty light: a soft outer band and a brighter
     core, stepping down in five bands on its way to the hay */
  function shaft(c, gx, H) {
    var slant = 40, len = H;
    for (var y = 0; y < len; y++) {
      var k = y / len;
      var fade = Math.ceil((1 - k) * 5) / 5;
      if (fade <= 0) continue;
      var sx = gx + k * slant;
      var outer = 9 + k * 20;
      var core = 4 + k * 6;
      var dOuter = Math.round(fade * fade * 3);
      var dCore = Math.round(fade * fade * 5);
      if (dOuter > 0) Tint.rect(c, Math.round(sx), y, Math.round(outer), 1, P.daylight, dOuter);
      if (dCore > 0) Tint.rect(c, Math.round(sx + (outer - core) / 2), y, Math.round(core), 1,
                                 P.daylightHi, dCore);
    }
  }

  /* diamond chicken wire, 12px cell, deliberately sparse so it reads as
     mesh in the distance instead of hatching */
  function bakeWire() {
    var N = 12;
    var t = makeCanvas(N, N), c = t.ctx;
    for (var i = 0; i < N; i++) {
      c.fillStyle = (i % 3 === 2) ? P.wireLight : P.wireDark;
      c.fillRect(i, i, 1, 1);
      c.fillStyle = (i % 3 === 1) ? P.wireLight : P.wireDark;
      c.fillRect(N - 1 - i, i, 1, 1);
    }
    c.fillStyle = P.wireHi;
    c.fillRect(0, 0, 1, 1);
    c.fillRect(N / 2, N / 2, 1, 1);
    return t;
  }

  /* structural framing that sits in front of the wall */
  function bakeFrame() {
    var W = 248, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var wire = T.wire.canvas;

    /* one stapled wire panel per bay, with plain wall either side */
    var panelTop = 40, panelBot = 146, panelX = 26, panelW = 116;
    c.save();
    c.beginPath(); c.rect(panelX, panelTop, panelW, panelBot - panelTop); c.clip();
    for (var y = panelTop; y < panelBot; y += wire.height) {
      for (var x = panelX; x < panelX + panelW; x += wire.width) c.drawImage(wire, x, y);
    }
    c.restore();
    /* the batten the wire is stapled to */
    c.fillStyle = P.beamDark;
    c.fillRect(panelX, panelTop - 2, panelW, 2);
    c.fillRect(panelX, panelBot, panelW, 2);
    c.fillRect(panelX - 2, panelTop - 2, 2, panelBot - panelTop + 4);
    c.fillRect(panelX + panelW, panelTop - 2, 2, panelBot - panelTop + 4);
    c.fillStyle = P.outline;
    c.fillRect(panelX - 2, panelTop - 3, panelW + 4, 1);
    c.fillRect(panelX - 2, panelBot + 2, panelW + 4, 1);

    /* vertical stud */
    postV(c, 0, 0, 13, H);
    /* horizontal rails top and bottom of the wire panel */
    postH(c, 0, 150, W, 11);
    postH(c, 0, 24, W, 10);
    /* diagonal brace in the lower half */
    c.save();
    c.translate(18, 244);
    c.rotate(-0.70);
    postH(c, 0, 0, 108, 8);
    c.restore();

    /* the whole structural layer sits behind the action: darken only the
       timber itself (source-atop), leaving the gaps transparent */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 7);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  function postV(c, x, y, w, h) {
    c.fillStyle = P.beamMid; c.fillRect(x, y, w, h);
    c.fillStyle = P.beamLight; c.fillRect(x + 1, y, 2, h);
    c.fillStyle = P.beamDark; c.fillRect(x + w - 3, y, 3, h);
    c.fillStyle = P.outline; c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
    for (var i = y + 6; i < y + h; i += 29) {
      c.fillStyle = P.beamDark; c.fillRect(x + 1, i, w - 2, 1);
    }
  }

  function postH(c, x, y, w, h) {
    c.fillStyle = P.beamMid; c.fillRect(x, y, w, h);
    c.fillStyle = P.beamLight; c.fillRect(x, y + 1, w, 2);
    c.fillStyle = P.beamDark; c.fillRect(x, y + h - 2, w, 2);
    c.fillStyle = P.outline; c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
    for (var i = x + 8; i < x + w; i += 34) {
      c.fillStyle = P.beamDark; c.fillRect(i, y + 1, 1, h - 2);
    }
  }

  /* hanging props: a bare bulb, a feed sack, a bucket */
  function bakeProps() {
    var W = 340, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;

    /* bare bulb on a cord */
    c.fillStyle = P.outline; c.fillRect(46, 0, 1, 40);
    c.fillStyle = P.nailDark; c.fillRect(43, 40, 7, 5);
    c.fillStyle = P.daylight; c.fillRect(42, 45, 9, 8);
    c.fillStyle = P.daylightHi; c.fillRect(44, 46, 4, 5);
    Tint.rect(c, 34, 38, 25, 26, P.daylight, 2);

    /* feed sack hanging from a rope */
    c.fillStyle = P.outline; c.fillRect(186, 0, 1, 26);
    c.fillStyle = P.hayDark; c.fillRect(176, 26, 22, 30);
    c.fillStyle = P.hayMid; c.fillRect(177, 28, 19, 12);
    c.fillStyle = P.beddingDark; c.fillRect(176, 52, 22, 4);
    c.fillStyle = P.outline; c.fillRect(176, 26, 22, 1); c.fillRect(176, 55, 22, 1);
    c.fillRect(175, 26, 1, 30); c.fillRect(198, 26, 1, 30);
    c.fillStyle = P.hayPale; c.fillRect(181, 34, 11, 1); c.fillRect(183, 37, 7, 1);

    /* bucket on a nail */
    c.fillStyle = P.nailDark; c.fillRect(288, 70, 2, 3);
    c.fillStyle = P.wireDark; c.fillRect(280, 73, 19, 16);
    c.fillStyle = P.wireLight; c.fillRect(281, 74, 3, 14);
    c.fillStyle = P.outline; c.fillRect(280, 73, 19, 1); c.fillRect(280, 88, 19, 1);
    c.fillRect(279, 73, 1, 16); c.fillRect(299, 73, 1, 16);
    return t;
  }

  /* rafters + wire across the top of the screen */
  function bakeCeiling() {
    var W = 96, H = CEIL;
    var t = makeCanvas(W, H), c = t.ctx;
    c.fillStyle = P.void; c.fillRect(0, 0, W, H);
    /* boards */
    for (var y = 0; y < H - 8; y += 5) {
      c.fillStyle = (y / 5) % 2 ? P.wallMid : P.wallDark;
      c.fillRect(0, y, W, 5);
      c.fillStyle = P.void; c.fillRect(0, y + 4, W, 1);
    }
    /* wire strip under the boards */
    for (var x = 0; x < W; x += T.wire.w) c.drawImage(T.wire.canvas, x, H - 15);
    /* the rafter beam itself */
    postH(c, 0, H - 9, W, 9);
    /* cross beams every other tile */
    c.fillStyle = P.beamDark; c.fillRect(70, 0, 9, H - 9);
    c.fillStyle = P.beamMid; c.fillRect(71, 0, 6, H - 9);
    c.fillStyle = P.outline; c.fillRect(70, 0, 1, H - 9); c.fillRect(78, 0, 1, H - 9);
    /* straw wisps caught in the rafters */
    var r = mulberry32(77);
    for (var i = 0; i < 10; i++) {
      var sx = Math.floor(r() * W), sl = 2 + Math.floor(r() * 4);
      c.fillStyle = r() < 0.5 ? P.hayDark : P.hayMid;
      c.fillRect(sx, H - 1 - sl, 1, sl);
    }
    return t;
  }

  /* hay + bedding floor */
  function bakeFloor() {
    var W = 128, H = VH - FLOOR;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(4242);

    c.fillStyle = P.hayMid; c.fillRect(0, 0, W, H);
    Tint.rect(c, 0, 0, W, H, P.hayDark, 6);
    Tint.rect(c, 0, H - 12, W, 12, P.beddingDark, 9);

    /* loose straws lying in the bedding */
    for (var i = 0; i < 150; i++) {
      var x = Math.floor(r() * W), y = 2 + Math.floor(r() * (H - 3));
      var len = 3 + Math.floor(r() * 7);
      var up = r() < 0.5 ? -1 : 0;
      var col = r() < 0.4 ? P.hayPale : (r() < 0.6 ? P.hayLight : P.hayDark);
      c.fillStyle = col;
      for (var k = 0; k < len; k++) c.fillRect(x + k, y + (up ? Math.floor(k / 3) * up : 0), 1, 1);
    }
    /* ragged top edge: wisps poking up out of the surface */
    for (var j = 0; j < W; j++) {
      var h = r() < 0.5 ? 1 : (r() < 0.8 ? 2 : 3);
      c.fillStyle = P.hayLight;
      c.fillRect(j, -h + 1, 1, h);
    }
    for (var s = 0; s < 40; s++) {
      var sx = Math.floor(r() * W);
      var sh = 2 + Math.floor(r() * 4);
      c.fillStyle = r() < 0.5 ? P.hayPale : P.hayLight;
      c.fillRect(sx, -sh, 1, sh);
      if (r() < 0.5) c.fillRect(sx + 1, -sh + 1, 1, 1);
    }
    /* the lip line that catches the light */
    c.fillStyle = P.hayPale; c.fillRect(0, 0, W, 1);
    c.fillStyle = P.hayLight; c.fillRect(0, 1, W, 1);
    return t;
  }

  /* wooden plank obstacle body, tiled vertically */
  function bakePlank(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(900 + variant * 31);

    c.fillStyle = P.plankMid; c.fillRect(0, 0, W, H);
    c.fillStyle = P.plankLight; c.fillRect(2, 0, 5, H);
    c.fillStyle = P.plankHi; c.fillRect(3, 0, 2, H);
    c.fillStyle = P.plankDark; c.fillRect(W - 8, 0, 6, H);
    c.fillStyle = P.plankEdge; c.fillRect(0, 0, 2, H); c.fillRect(W - 2, 0, 2, H);

    /* board joints */
    for (var y = 0; y < H; y += 21) {
      c.fillStyle = P.plankEdge; c.fillRect(2, y, W - 4, 1);
      c.fillStyle = P.plankHi; c.fillRect(2, y + 1, W - 4, 1);
      /* nails at each joint */
      c.fillStyle = P.nailLight; c.fillRect(7, y + 4, 2, 2); c.fillRect(W - 10, y + 4, 2, 2);
      c.fillStyle = P.nailDark; c.fillRect(7, y + 5, 2, 1); c.fillRect(W - 10, y + 5, 2, 1);
    }
    /* grain */
    for (var i = 0; i < 26; i++) {
      var gx = 3 + Math.floor(r() * (W - 8));
      var gy = Math.floor(r() * H);
      var gl = 3 + Math.floor(r() * 9);
      c.fillStyle = r() < 0.5 ? P.plankDark : P.plankHi;
      c.fillRect(gx, gy, 1, gl);
    }
    /* knots */
    for (var k = 0; k < 2; k++) {
      var kx = 7 + Math.floor(r() * (W - 16)), ky = Math.floor(r() * H);
      c.fillStyle = P.plankDark; c.fillRect(kx, ky, 4, 3);
      c.fillStyle = P.plankEdge; c.fillRect(kx + 1, ky + 1, 2, 1);
    }
    /* variant 1 gets a chicken wire patch */
    if (variant === 1) {
      for (var wy = 4; wy < H - 4; wy += T.wire.h) c.drawImage(T.wire.canvas, 9, wy);
    }
    return t;
  }

  /* ------------------------------------------------------------- eggs
     An egg is seven pixels across, so it is plotted row by row from a
     little shape table rather than drawn with shapes. Both kinds are
     baked once like the rest of the room: they only ever move and rock,
     they never change shape.
     The deviled egg is the halved, piped, paprika-dusted one - wider
     than it is tall, so it never reads as an ordinary egg at a glance. */

  var EGG_ROWS   = [[2, 3], [1, 5], [1, 5], [0, 7], [0, 7], [0, 7], [0, 7], [1, 5], [2, 3]];
  var DEVIL_ROWS = [[2, 5], [1, 7], [0, 9], [0, 9], [0, 9], [1, 7], [2, 5]];

  function rowsFill(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0], y + i, rows[i][1], 1);
  }

  /* the same shape, fattened by a pixel all round, for the outline */
  function rowsOutline(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0] - 1, y + i, rows[i][1] + 2, 1);
    c.fillRect(x + rows[0][0], y - 1, rows[0][1], 1);
    var last = rows[rows.length - 1];
    c.fillRect(x + last[0], y + rows.length, last[1], 1);
  }

  function bakeEgg() {
    var t = makeCanvas(9, 11), c = t.ctx;
    rowsOutline(c, EGG_ROWS, 1, 1, P.outline);
    rowsFill(c, EGG_ROWS, 1, 1, P.eggShell);
    /* lit from the seams in the wall: highlight up the left shoulder,
       the right side rolling away into shade */
    c.fillStyle = P.eggShellHi;
    c.fillRect(3, 1, 2, 1); c.fillRect(2, 2, 2, 1); c.fillRect(2, 3, 1, 1); c.fillRect(1, 4, 1, 2);
    c.fillStyle = P.eggShade;
    c.fillRect(6, 4, 2, 1); c.fillRect(6, 5, 2, 1); c.fillRect(6, 6, 2, 1);
    c.fillRect(5, 7, 3, 1); c.fillRect(4, 8, 3, 1);
    c.fillStyle = P.eggShadow;
    c.fillRect(3, 9, 3, 1); c.fillRect(6, 8, 1, 1);
    /* freckles, so two eggs side by side do not read as one shape */
    c.fillStyle = P.eggFleck;
    c.fillRect(4, 3, 1, 1); c.fillRect(3, 6, 1, 1); c.fillRect(5, 5, 1, 1);
    return t;
  }

  function bakeDeviled() {
    var t = makeCanvas(11, 9), c = t.ctx;
    rowsOutline(c, DEVIL_ROWS, 1, 1, P.outline);
    rowsFill(c, DEVIL_ROWS, 1, 1, P.white);
    c.fillStyle = P.eggShellHi;
    c.fillRect(3, 1, 2, 1); c.fillRect(2, 2, 2, 1); c.fillRect(1, 3, 1, 2);
    c.fillStyle = P.eggShade;
    c.fillRect(8, 4, 1, 2); c.fillRect(7, 6, 2, 1); c.fillRect(5, 7, 2, 1);
    /* the filling, piped in and dusted */
    c.fillStyle = P.paprika;
    c.fillRect(4, 2, 3, 1); c.fillRect(3, 3, 5, 1); c.fillRect(3, 4, 5, 1);
    c.fillRect(3, 5, 5, 1); c.fillRect(4, 6, 3, 1);
    c.fillStyle = P.devilHi;
    c.fillRect(4, 2, 1, 1); c.fillRect(4, 3, 2, 1);
    c.fillStyle = P.devilDark;
    c.fillRect(6, 4, 1, 1); c.fillRect(4, 5, 1, 1); c.fillRect(7, 3, 1, 1);
    return t;
  }

  function build() {
    T.wire = bakeWire();
    T.wall = bakeWall();
    T.frame = bakeFrame();
    T.props = bakeProps();
    T.ceiling = bakeCeiling();
    T.floor = bakeFloor();
    T.plank = [bakePlank(0), bakePlank(1)];
    T.egg = bakeEgg();
    T.deviled = bakeDeviled();
  }

  /* ------------------------------------------------------- drawing */

  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = P.wallDark;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * 0.14, 0);
    tileX(ctx, T.props.canvas, scroll * 0.34, 0);
    tileX(ctx, T.frame.canvas, scroll * 0.52, 0);
    /* everything behind the action sits a step back in the gloom */
    Tint.rect(ctx, 0, 0, VW, VH, P.wallShadow, 7);
    /* dusty air: warm near the rafters, gloomy down in the bedding */
    Tint.rect(ctx, 0, CEIL, VW, 46, P.daylight, 1);
    Tint.rect(ctx, 0, FLOOR - 80, VW, 80, P.haze, 4);
    Tint.rect(ctx, 0, FLOOR - 40, VW, 40, P.wallShadow, 5);
    /* a soft vignette keeps the eye in the middle of the screen */
    Tint.rect(ctx, 0, CEIL, 46, FLOOR - CEIL, P.void, 4);
    Tint.rect(ctx, VW - 46, CEIL, 46, FLOOR - CEIL, P.void, 4);
  }

  /* a calm version of the room for the menus to sit on top of: the same
     timber and hay, without the busy structure that would fight the ui */
  function drawMenuBackdrop(ctx, scroll) {
    if (!T.menuWall) T.menuWall = bakeMenuWall();
    ctx.fillStyle = P.wallShadow;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.menuWall.canvas, scroll * 0.3, 0);
    Tint.rect(ctx, 0, CEIL, VW, 30, P.wallMid, 4);
    Tint.rect(ctx, 0, VH - 130, VW, 130, P.void, 3);
    Tint.rect(ctx, 0, VH - 70, VW, 70, P.void, 3);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  function bakeMenuWall() {
    var W = 160, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2024);
    c.fillStyle = P.wallDark;
    c.fillRect(0, 0, W, H);
    var x = 0;
    while (x < W) {
      var w = 12 + Math.floor(r() * 9);
      if (x + w > W) w = W - x;
      c.fillStyle = r() < 0.5 ? P.wallDark : P.wallShadow;
      c.fillRect(x, 0, w, H);
      c.fillStyle = P.void;
      c.fillRect(x, 0, 1, H);
      if (r() < 0.3) {
        c.fillStyle = P.wallMid;
        c.fillRect(x + 1, 0, 1, H);
      }
      x += w;
    }
    /* a few straws caught in the timber */
    for (var i = 0; i < 18; i++) {
      c.fillStyle = r() < 0.5 ? P.hayDark : P.hayMid;
      c.fillRect(Math.floor(r() * W), Math.floor(r() * H), 1 + Math.floor(r() * 3), 1);
    }
    Tint.rect(c, 0, 0, W, H, P.void, 2);
    return t;
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.ceiling.canvas, scroll, 0);
    /* shadow cast down from the rafters */
    Tint.rect(ctx, 0, CEIL, VW, 11, P.wallShadow, 7);
    Tint.rect(ctx, 0, CEIL, VW, 5, P.void, 8);
  }

  function drawFloor(ctx, scroll) {
    /* shadow the hay throws upward */
    Tint.rect(ctx, 0, FLOOR - 10, VW, 10, P.wallShadow, 7);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
  }

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.plank[ob.variant].canvas;
    var w = tile.width;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (topH > 0) drawBeam(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) drawBeam(ctx, tile, x, botY, w, botH);
    if (topH > 0) drawCap(ctx, x, ob.gapY - 9, w, false);
    if (botH > 0) drawCap(ctx, x, botY, w, true);
    /* hard shadow cast onto the wall behind */
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH : 0, P.void, 7);
    Tint.rect(ctx, x + w, botY, 4, botH > 0 ? botH : 0, P.void, 7);
  }

  /* tile the plank texture into a column of arbitrary height */
  function drawBeam(ctx, tile, x, y, w, h) {
    var th = tile.height;
    var drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* the chunky end cap at the mouth of the gap */
  function drawCap(ctx, x, y, w, pointingDown) {
    var cx = x - 4, cw = w + 8, ch = 9;
    ctx.fillStyle = P.plankMid; ctx.fillRect(cx, y, cw, ch);
    ctx.fillStyle = P.plankLight; ctx.fillRect(cx, y + (pointingDown ? 1 : ch - 4), cw, 2);
    ctx.fillStyle = P.plankHi; ctx.fillRect(cx + 1, y + (pointingDown ? 1 : ch - 3), cw - 2, 1);
    ctx.fillStyle = P.plankDark; ctx.fillRect(cx, y + (pointingDown ? ch - 3 : 0), cw, 3);
    ctx.fillStyle = P.plankEdge;
    ctx.fillRect(cx, y, cw, 1); ctx.fillRect(cx, y + ch - 1, cw, 1);
    ctx.fillRect(cx, y, 1, ch); ctx.fillRect(cx + cw - 1, y, 1, ch);
    /* two nail heads holding the cap on */
    ctx.fillStyle = P.nailLight;
    ctx.fillRect(cx + 4, y + 4, 2, 2); ctx.fillRect(cx + cw - 6, y + 4, 2, 2);
    ctx.fillStyle = P.nailDark;
    ctx.fillRect(cx + 4, y + 5, 2, 1); ctx.fillRect(cx + cw - 6, y + 5, 2, 1);
  }

  function drawSpikeCluster(ctx, ob) {
    var x = Math.round(ob.x);
    var down = ob.side === 'ceil';
    var baseY = down ? CEIL : FLOOR;

    /* the board the nails were driven through */
    var bw = ob.w + 6;
    ctx.fillStyle = P.beamDark; ctx.fillRect(x - 3, down ? baseY - 1 : baseY - 4, bw, 5);
    ctx.fillStyle = P.beamMid; ctx.fillRect(x - 3, down ? baseY : baseY - 3, bw, 2);
    ctx.fillStyle = P.outline;
    ctx.fillRect(x - 3, down ? baseY + 4 : baseY - 5, bw, 1);
    ctx.fillRect(x - 4, down ? baseY - 1 : baseY - 4, 1, 5);
    ctx.fillRect(x - 3 + bw, down ? baseY - 1 : baseY - 4, 1, 5);

    for (var i = 0; i < ob.spikes.length; i++) {
      var n = ob.spikes[i];
      drawNail(ctx, x + n.dx, baseY, n.len, down, n.bend, n.rusty);
    }
  }

  /* a single bent nail, drawn one pixel row at a time */
  function drawNail(ctx, x, baseY, len, down, bend, rusty) {
    var dir = down ? 1 : -1;
    for (var i = 0; i < len; i++) {
      var k = i / len;
      var off = Math.round(Math.sin(k * 2.4 + bend) * (k * 2.6));
      var y = baseY + dir * i;
      ctx.fillStyle = (rusty && i > len * 0.4) ? P.rust : P.nailMid;
      ctx.fillRect(x + off, y, 2, 1);
      ctx.fillStyle = P.nailLight;
      ctx.fillRect(x + off, y, 1, 1);
      if (i === len - 1) {
        /* the head */
        ctx.fillStyle = P.nailLight;
        ctx.fillRect(x + off - 1, y + dir, 4, 1);
        ctx.fillStyle = P.nailDark;
        ctx.fillRect(x + off - 1, y + dir * 2, 4, 1);
      }
    }
    /* shadow at the root */
    ctx.fillStyle = P.outline;
    ctx.fillRect(x, baseY - (down ? 1 : 0), 2, 1);
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawSpikeCluster(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* an egg on its way down. it rocks as it falls, which is a one pixel
     shuffle either side - there is no room in seven pixels for more. */
  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x + Math.sin(ob.spin) * 1.2);
    var y = Math.round(ob.y);
    if (!ob.spicy) { ctx.drawImage(T.egg.canvas, x - 4, y - 5); return; }

    /* the hot one announces itself from across the coop */
    var pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
    var r = Math.round(13 + pulse * 5);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(255,216,138,' + (0.44 * pulse).toFixed(3) + ')');
    g.addColorStop(0.55, 'rgba(240,114,44,' + (0.20 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(200,69,42,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    /* sparks shaken loose on the way down */
    for (var i = 0; i < 3; i++) {
      var k = (ob.spin * 0.7 + i * 0.41) % 1;
      ctx.fillStyle = i % 2 ? P.emberHi : P.ember;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4),
                   y - 6 - Math.round(k * 7), 1, 1);
    }
    ctx.drawImage(T.deviled.canvas, x - 5, y - 4);
  }

  /* the spot on the bedding an egg is heading for: it tightens and
     darkens as the egg drops, so the landing is never a surprise */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(11 - k * 5);
    /* the hay is busy enough that a faint spot simply disappears into it */
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3,
              ob.spicy ? P.ember : P.void, 6 + k * 9);
  }

  /* what is left once one lands: yolk on the bedding, soaking away */
  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x), y = FLOOR + 1;
    var spread = Math.round(6 + (1 - k) * 3);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);
    ctx.fillStyle = ob.spicy ? P.devilMid : P.white;
    ctx.fillRect(x - spread, y + 1, spread * 2, 2);
    ctx.fillStyle = ob.spicy ? P.paprika : P.yolk;
    ctx.fillRect(x - 2, y, 5, 2);
    ctx.fillStyle = ob.spicy ? P.devilHi : P.yolkHi;
    ctx.fillRect(x - 1, y, 2, 1);
    ctx.fillStyle = ob.spicy ? P.devilDark : P.eggShell;
    ctx.fillRect(x - spread - 2, y + 2, 2, 1);
    ctx.fillRect(x + spread, y + 1, 2, 1);
    ctx.globalAlpha = a;
  }

  /* harmless floor dressing so the hay is not an empty stripe */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2;
    if (ob.kind === 0) {              /* scattered feed */
      ctx.fillStyle = P.hayPale;
      for (var i = 0; i < ob.seed.length; i++) ctx.fillRect(x + ob.seed[i][0], y + ob.seed[i][1], 1, 1);
    } else if (ob.kind === 1) {       /* a dropped feather */
      ctx.fillStyle = P.featherB; ctx.fillRect(x, y + 3, 9, 2);
      ctx.fillStyle = P.featherA; ctx.fillRect(x + 1, y + 2, 7, 1);
      ctx.fillStyle = P.outline; ctx.fillRect(x + 8, y + 4, 3, 1);
    } else {                          /* a little mound of bedding */
      ctx.fillStyle = P.hayLight; ctx.fillRect(x, y + 2, 14, 3);
      ctx.fillStyle = P.hayPale; ctx.fillRect(x + 3, y + 1, 8, 1);
      ctx.fillStyle = P.hayDark; ctx.fillRect(x, y + 5, 14, 1);
    }
  }

  /* ---------------------------------------------------- generation */

  function makePillar(x, gapY, gapH) {
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.3) ? 1 : 0, scored: false };
  }

  function makeSpikes(x, side, count, maxLen) {
    var spikes = [];
    var dx = 0;
    for (var i = 0; i < count; i++) {
      var len = Math.round(rand(maxLen * 0.55, maxLen));
      spikes.push({ dx: dx, len: len, bend: rand(0, TAU), rusty: chance(0.45) });
      dx += randInt(4, 7);
    }
    return { type: 'spike', x: x, side: side, spikes: spikes, w: dx + 2 };
  }

  /* An egg tipped off the rafters. Unlike the planks, x and y are its
     CENTRE, because it falls and rocks rather than sitting on a grid.
     `fall` is its starting speed downward; gravity does the rest. */
  function makeDrop(x, spicy, fall) {
    return { type: 'drop', x: x, y: CEIL + 5, w: spicy ? 9 : 7,
             vy: fall, spicy: !!spicy, broken: 0,
             spin: rand(0, TAU), spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1) };
  }

  function makeLitter(x) {
    var kind = randInt(0, 2);
    var seed = [];
    if (kind === 0) for (var i = 0; i < 14; i++) seed.push([randInt(0, 16), randInt(0, 5)]);
    return { type: 'litter', x: x, kind: kind, seed: seed, w: 16 };
  }

  /* collision rectangles in screen space */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      /* the plain egg's box is a shade tighter than its art and the
         deviled one's a shade wider: dodging is meant to be fair and
         catching is meant to be generous */
      if (ob.spicy) out.push([ob.x - 5, ob.y - 4, 10, 8]);
      else out.push([ob.x - 3, ob.y - 4, 6, 9]);
    } else if (ob.type === 'spike') {
      for (var i = 0; i < ob.spikes.length; i++) {
        var n = ob.spikes[i];
        if (ob.side === 'ceil') out.push([ob.x + n.dx, CEIL, 2, n.len]);
        else out.push([ob.x + n.dx, FLOOR - n.len, 2, n.len]);
      }
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle, drawNail: drawNail,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    postV: postV, postH: postH,
    makePillar: makePillar, makeSpikes: makeSpikes, makeLitter: makeLitter,
    makeDrop: makeDrop,
    rectsFor: rectsFor
  };
})();
