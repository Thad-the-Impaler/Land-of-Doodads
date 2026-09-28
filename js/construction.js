/* ------------------------------------------------------------------
   Land of Doodads - BACKYARD / THE CONSTRUCTION ZONE
   The side yard where the materials for a deck have been waiting three
   years: sunlit pink-beige stucco with a hard shade line, leaning
   plywood, a fan of 2x4s against a weathered fence, speckled concrete,
   an air conditioner, a blue bucket and somebody's saws still plugged
   in. Drawn from the photographs in Assets/Concept.

   Same discipline as js/coop.js and js/garden.js: every pixel is
   generated here and baked into tiles once, and ANY shade laid over
   something that scrolls is a flat Tint, never a Dither. The Bayer grid
   is anchored in user space, so a dithered rect that moves re-phases
   against the pattern and the pixels boil. There is no call to Dither.rect
   anywhere in this file, and the buzzsaws spin by swapping baked frames
   rather than by ctx.rotate, for the same reason.

   This is the first level whose wall is a MID tone. The Coop reads
   because pale planks stand against a dark room, the Garden because pale
   bamboo stands against dark foliage; a stack of lumber against sunlit
   stucco has neither trick available, so the pillars are separated from
   the yard by a black outline, two black steel packing straps and a hard
   4px cast shadow instead.
------------------------------------------------------------------ */
'use strict';

var Construction = (function () {

  var P = {
    /* stucco wall: pink-beige, sun on top, shade below */
    stuccoSun:   '#e6cfae',
    stuccoLit:   '#d6bb98',
    stuccoMid:   '#c2a686',
    stuccoDark:  '#a48a6e',
    stuccoShade: '#82694f',

    /* concrete and gravel */
    concHi:      '#cdc8bc',
    concLit:     '#aba59a',
    concMid:     '#8f8a80',
    concDark:    '#6f6a62',
    gravel:      '#57524b',

    /* plywood: pale warm faces, swirling grain, dark plies on a cut edge */
    plyPale:     '#f3deb0',
    plyLit:      '#e6c993',
    plyMid:      '#d2ad71',
    plyGrain:    '#b88c51',
    plyDark:     '#8f6a38',
    plyEdge:     '#5c4224',

    /* cut lumber, 2x4s */
    lumHi:       '#f4d9a8',
    lumMid:      '#dcb377',
    lumDark:     '#ad8149',
    lumEnd:      '#c99a5e',
    lumShadow:   '#73502c',

    /* fence boards, weathered orange-tan */
    fenceLit:    '#c99659',
    fenceMid:    '#a97a41',
    fenceDark:   '#7e5729',
    fenceSeam:   '#4b3319',

    /* the charcoal board, grey totes and black metal */
    slateHi:     '#5a5e63',
    slate:       '#3b3e42',
    slateDark:   '#25272a',
    steelBlack:  '#1e2023',
    steelMid:    '#4b5057',
    steelHi:     '#787e87',

    /* nails and blades */
    nailDark:    '#565d66',
    nailMid:     '#9aa2ab',
    nailLight:   '#dde3e8',
    rust:        '#a2613a',
    bladeEdge:   '#c3cad1',
    bladeHi:     '#f2f6f9',

    /* yellow crate lids and hazard tape */
    crateDark:   '#a97e12',
    crateMid:    '#e9ba22',
    crateHi:     '#ffd94d',

    /* the blue bucket */
    bucketDark:  '#173d7c',
    bucketMid:   '#2359b9',
    bucketHi:    '#5289e3',

    /* the air conditioner */
    acDark:      '#5b6064',
    acMid:       '#80868b',
    acHi:        '#a7adb2',

    /* the orange extension cord */
    cord:        '#f07c2c',
    cordHi:      '#ffb372',

    /* the butane can - this level's spicy drop */
    canDark:     '#8b1d15',
    canMid:      '#d9362b',
    canHi:       '#f47058',
    canLabel:    '#f5f2e9',
    canCap:      '#1c1c1e',
    flame:       '#ff9a3c',
    flameHi:     '#ffd88a',

    /* the golden gear. These match UI.C.gold / UI.C.goldDark on purpose,
       so a +5 in the world reads as the same gold as the score that it
       pays into. */
    goldDark:    '#9c7233',
    goldMid:     '#e0b04a',
    goldHi:      '#f3cc84',
    goldShine:   '#fff6d4',

    /* The heart of junk. lifeJade/lifePale are PlayScene's LIFE_LEAF and
       LIFE_PALE: an extra life must glow the same colour in every level or
       the colour teaches the player nothing. lifeJade is written out again
       as rgba in drawBoon's gradient, which cannot take a hex - it is here
       so the pigment is named in one place. */
    copper:      '#c8783b',
    copperHi:    '#f1aa6b',
    lifeJade:    '#5fae9a',
    lifePale:    '#93d8bd',

    /* air and shadow */
    sunHaze:     '#ffe9b8',
    sawdust:     '#f1e2b8',
    shade:       '#3a2c22',
    outline:     '#1a1410',
    void:        '#120e0a'
  };

  var CEIL = 24;
  var FLOOR = 242;
  var END_MIN = 34;       /* shortest pillar stub allowed at either end */
  var DROP_GRAV = 44;     /* a 2x4 is heavier than a tomato - the Garden's 34 reads as floating */
  var SPLAT_TIME = 1.9;   /* lumber lies about a little longer than yolk does */

  /* A blade's spin comes off the WORLD, not off a clock: SAW_TURN radians
     per pixel of scroll is one full turn per 70px, so 1.6 turns a second
     at speedStart and 2.5 at speedMax. Geared this way the saws stop dead
     when the run stops - pause, death, GET READY - they wind up with the
     heat, and drawObstacle never needs a dt or a timer of its own. */
  var SAW_TURN = 0.09;
  var SAW_FRAMES = 6;     /* 6 frames 7.5 degrees apart cover one tooth */
  var TOOTH = TAU / 8;    /* an 8-tooth blade repeats every 45 degrees */
  /* 4 frames 11.25 degrees apart. Frames 0 and 2 are the two crisp cogs -
     teeth on the axes, then teeth between them - and 1 and 3 are the
     in-betweens that give the spin a direction. At 3 frames the single
     15 degree in-between sits at no clean angle at all and boils. */
  var GEAR_FRAMES = 4;

  /* the 15 neutral effect colours PlayScene paints its particles, its
     dust and the spicy wash out of. It never reads P. */
  var FX = {
    motes:    '#f1e2b8',   motesHi:  '#fff6d4',
    puff:     '#e6c993',   puffHi:   '#f1e2b8',
    ground:   '#8f8a80',   groundHi: '#cdc8bc',
    splat:    '#ad8149',   splatHi:  '#f4d9a8',
    hot:      '#ff5a1f',   hotMid:   '#ff9a3c',  hotHi: '#ffd88a',
    heat:     '#ff5a1f',   heatEdge: '#8b1d15',
    glowCore: '255,216,138', glowEdge: '255,90,31'
  };

  /* the one-off heads up when a hazard arms: the thing, then the excuse */
  var WARN = {
    drop:  ['▼ LUMBER ▼', 'NOBODY STACKED IT RIGHT'],
    spike: ['▲ BUZZSAWS ▲', 'SOMEBODY LEFT THEM RUNNING']
  };

  /* the thirteen colours the generic level-select window would use. This
     level paints its own cover below, but the table stays honest. */
  var PREVIEW = {
    back: P.stuccoMid, backAlt: P.stuccoLit, seam: P.stuccoShade,
    beam: P.lumMid, beamDark: P.lumShadow, beamLight: P.lumHi,
    ground: P.concMid, groundDark: P.concDark, groundHi: P.concHi,
    spike: P.nailMid, spikeHi: P.nailLight, air: P.sunHaze, gloom: P.void
  };

  /* the caption PlayScene puts on an extra life picked up here */
  var BOON_NAME = 'HEART OF JUNK';

  /* the golden gear: rare, fast, and rolled HERE rather than in the tune so
     the art knows it is drawing a gear and gives it a gear's width, fall and
     shadow. GOLD_GAP keeps two from arriving on top of each other. */
  var GOLD_CHANCE = 0.04, GOLD_GAP = 6;
  var goldGap = 0;

  var T = {};             /* baked tiles and sprites */

  /* positive modulo: every phase in this file comes off a coordinate that
     goes negative as the world scrolls left, and a bare % would flip the
     sign half the time */
  function mod(v, m) { return ((v % m) + m) % m; }

  /* shortest signed distance between two angles */
  function angDiff(a, b) {
    var d = mod(a - b + Math.PI, TAU) - Math.PI;
    return d;
  }

  /* ---------------------------------------------------------- tiles */

  /* The back wall, one tile wide enough to carry two different bays: the
     stucco the junction box is screwed to, the post they meet at, and the
     weathered fence with the black frame leaning on it. Both bays stand
     on one continuous concrete footing, because in the photograph they
     do - it is the line that ties the whole yard together. */
  function bakeWall() {
    var W = 336, H = VH, BAY = 222, POST = 228;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(5150);
    var i, x, y, v;

    /* --- the stucco bay --- */
    c.fillStyle = P.stuccoMid;
    c.fillRect(0, 0, BAY, H);
    /* the sun is on the upper half of the wall and the lower half is in
       shade, so every row gets its own flat tint */
    for (y = 0; y < 209; y++) {
      var k = y / H;
      if (k < 0.52) Tint.rect(c, 0, y, BAY, 1, P.stuccoSun, Math.round((0.52 - k) * 10));
      else Tint.rect(c, 0, y, BAY, 1, P.stuccoShade, Math.round((k - 0.52) * 8));
    }
    /* The shade line itself is HARD - three steps and then nothing. It is
       the edge of the neighbour's roof, not a gradient, and the
       photograph makes a feature of how abrupt it is. */
    Tint.rect(c, 0, 118, BAY, 2, P.stuccoShade, 2);
    Tint.rect(c, 0, 120, BAY, 2, P.stuccoShade, 3);
    Tint.rect(c, 0, 122, BAY, 87, P.stuccoShade, 4);
    /* stucco tooth: the speckle that stops the bay reading as flat paint */
    for (i = 0; i < 3000; i++) {
      x = Math.floor(r() * BAY); y = Math.floor(r() * 209);
      v = r();
      c.fillStyle = v < 0.45 ? P.stuccoDark : (v < 0.8 ? P.stuccoLit : P.stuccoShade);
      c.fillRect(x, y, 1, 1);
    }
    /* the grey junction box and the black cable hanging off it */
    c.fillStyle = P.outline;  c.fillRect(149, 95, 11, 9);
    c.fillStyle = P.steelMid; c.fillRect(150, 96, 9, 7);
    c.fillStyle = P.steelHi;  c.fillRect(150, 96, 9, 1);
    for (y = 103; y < 160; y++) {
      c.fillStyle = P.steelBlack;
      c.fillRect(154 + Math.round(Math.sin((y - 103) * 0.1) * 2), y, 1, 1);
    }
    c.fillStyle = P.steelBlack; c.fillRect(152, 128, 5, 7);
    c.fillStyle = P.nailLight;  c.fillRect(154, 131, 1, 1);
    /* the weep screed the stucco stops at, its dark underside landing on
       the footing below */
    c.fillStyle = P.concHi;      c.fillRect(0, 209, BAY, 1);
    c.fillStyle = P.concLit;     c.fillRect(0, 210, BAY, 2);
    c.fillStyle = P.stuccoShade; c.fillRect(0, 212, BAY, 1);

    /* --- the footing, under both bays --- */
    c.fillStyle = P.stuccoShade; c.fillRect(0, 213, W, 1);
    c.fillStyle = P.concHi;      c.fillRect(0, 214, W, 2);
    c.fillStyle = P.concLit;     c.fillRect(0, 216, W, 12);
    c.fillStyle = P.concDark;    c.fillRect(0, 228, W, 1);
    c.fillStyle = P.concMid;     c.fillRect(0, 229, W, H - 229);
    for (i = 0; i < 160; i++) {
      x = Math.floor(r() * W); y = 214 + Math.floor(r() * (H - 216));
      c.fillStyle = r() < 0.5 ? P.concHi : P.concDark;
      c.fillRect(x, y, 1, 1);
    }

    /* --- the post the two bays meet at --- */
    c.fillStyle = P.fenceDark; c.fillRect(BAY, 0, 6, 213);
    c.fillStyle = P.fenceLit;  c.fillRect(BAY, 0, 1, 213);
    c.fillStyle = P.fenceSeam; c.fillRect(BAY + 5, 0, 1, 213);

    /* --- the fence bay --- */
    var tones = [P.fenceMid, P.fenceMid, P.fenceLit, P.fenceDark];
    x = POST;
    while (x < W) {
      var bw = 8 + Math.floor(r() * 5);
      if (x + bw > W) bw = W - x;
      c.fillStyle = tones[Math.floor(r() * tones.length)];
      c.fillRect(x, 0, bw, 196);
      c.fillStyle = P.fenceSeam; c.fillRect(x, 0, 1, 196);
      var lines = 2 + Math.floor(r() * 2);
      for (i = 0; i < lines; i++) {
        c.fillStyle = P.fenceDark;
        c.fillRect(x + 1 + Math.floor(r() * Math.max(1, bw - 2)),
                   Math.floor(r() * 150), 1, 12 + Math.floor(r() * 29));
      }
      if (r() < 0.3) {
        c.fillStyle = P.fenceSeam;
        c.fillRect(x + 2 + Math.floor(r() * Math.max(1, bw - 4)),
                   30 + Math.floor(r() * 140), 2, 2);
      }
      x += bw;
    }
    /* the bottom rail, and the shadow between it and the footing - the
       boards stop at the rail, so without this there is a hole */
    c.fillStyle = P.fenceMid;  c.fillRect(POST, 196, W - POST, 8);
    c.fillStyle = P.fenceLit;  c.fillRect(POST, 196, W - POST, 1);
    c.fillStyle = P.outline;   c.fillRect(POST, 203, W - POST, 1);
    c.fillStyle = P.fenceDark; c.fillRect(POST, 204, W - POST, 9);
    Tint.rect(c, POST, 204, W - POST, 9, P.void, 6);

    /* the black metal frame standing against the fence. It stops dead at
       the tile edge instead of wrapping onto the next tile's stucco. */
    c.fillStyle = P.steelBlack; c.fillRect(300, 60, 3, 153);
    c.fillStyle = P.steelHi;    c.fillRect(300, 60, 1, 153);
    c.fillStyle = P.steelBlack; c.fillRect(300, 150, W - 300, 3);
    return t;
  }

  /* one moulded plastic lid stood on its edge against a tote, drawn a row
     at a time so it can lean: `shear` is how far its top is pushed off
     its foot */
  function toteLid(c, baseX, baseY, w, h, shear, lit) {
    var body = lit ? P.crateMid : P.crateDark;
    var edge = lit ? P.crateHi : P.crateMid;
    var step = Math.max(1, Math.round(h / 3));
    for (var i = 0; i < h; i++) {
      var y = baseY - i;
      var off = Math.round(i / h * shear);
      c.fillStyle = P.outline;   c.fillRect(baseX + off - 1, y, w + 2, 1);
      c.fillStyle = body;        c.fillRect(baseX + off, y, w, 1);
      c.fillStyle = edge;        c.fillRect(baseX + off, y, lit ? 2 : 4, 1);
      c.fillStyle = P.crateDark; c.fillRect(baseX + off + w - 3, y, 3, 1);
      /* the moulded grid pressed into the plastic: three lines each way */
      if (i % step === 1) { c.fillStyle = P.crateDark; c.fillRect(baseX + off, y, w, 1); }
      c.fillStyle = P.crateDark;
      c.fillRect(baseX + off + Math.round(w * 0.25), y, 1, 1);
      c.fillRect(baseX + off + Math.round(w * 0.5), y, 1, 1);
      c.fillRect(baseX + off + Math.round(w * 0.75), y, 1, 1);
    }
    c.fillStyle = P.crateHi;
    c.fillRect(baseX + Math.round(shear), baseY - h, w, 1);
  }

  /* The yard clutter standing on the footing: the air conditioner, two
     grey totes with the yellow lids leaning on them, a plank across the
     lids and the blue bucket. Mostly transparent, so the wall shows
     between the props. */
  function bakeProps() {
    var W = 400, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var i;

    /* the air conditioner */
    c.fillStyle = P.outline; c.fillRect(19, 157, 68, 88);
    c.fillStyle = P.acMid;   c.fillRect(20, 158, 66, 86);
    c.fillStyle = P.acHi;    c.fillRect(20, 158, 66, 5);
    /* the fan grille, seen edge on */
    c.fillStyle = P.acDark;  c.fillRect(31, 160, 44, 3);
    for (i = 0; i < 44; i += 3) { c.fillStyle = P.acHi; c.fillRect(31 + i, 160, 1, 3); }
    /* louvres: the side of the case is nothing but these */
    for (i = 176; i <= 236; i += 3) { c.fillStyle = P.acDark; c.fillRect(24, i, 39, 1); }
    c.fillStyle = P.canLabel; c.fillRect(32, 168, 14, 5);
    c.fillStyle = P.canMid;   c.fillRect(35, 170, 8, 1);
    c.fillStyle = P.acDark;   c.fillRect(20, 240, 66, 4);
    c.fillStyle = P.acDark;   c.fillRect(80, 158, 6, 86);

    /* two grey totes */
    [100, 134].forEach(function (tx) {
      c.fillStyle = P.outline;   c.fillRect(tx - 1, 217, 32, 26);
      c.fillStyle = P.slate;     c.fillRect(tx, 218, 30, 24);
      c.fillStyle = P.slateHi;   c.fillRect(tx, 218, 30, 2);
      c.fillStyle = P.slateDark; c.fillRect(tx + 25, 220, 5, 22);
      c.fillStyle = P.slateDark;
      c.fillRect(tx + 2, 226, 26, 1); c.fillRect(tx + 2, 233, 26, 1);
    });
    /* the yellow lids leaning on them, one each way */
    toteLid(c, 108, 218, 22, 30, 6, true);
    toteLid(c, 128, 218, 22, 30, -5, false);
    /* and a plank laid across the pair */
    c.fillStyle = P.outline; c.fillRect(96, 211, 70, 8);
    c.fillStyle = P.lumMid;  c.fillRect(96, 212, 70, 6);
    c.fillStyle = P.lumHi;   c.fillRect(96, 212, 70, 1);
    c.fillStyle = P.lumEnd;  c.fillRect(96, 212, 2, 6); c.fillRect(164, 212, 2, 6);

    /* the blue bucket, tapering from a 22px rim to an 18px foot */
    for (i = 0; i < 27; i++) {
      var by = 216 + i;
      var bw = 22 - Math.round(i / 26 * 4);
      var bx = 172 + Math.round(i / 26 * 2);
      c.fillStyle = P.outline;    c.fillRect(bx - 1, by, bw + 2, 1);
      c.fillStyle = P.bucketMid;  c.fillRect(bx, by, bw, 1);
      c.fillStyle = P.bucketHi;   c.fillRect(bx, by, 3, 1);
      c.fillStyle = P.bucketDark; c.fillRect(bx + bw - 4, by, 4, 1);
    }
    c.fillStyle = P.outline;  c.fillRect(171, 216, 24, 1);
    c.fillStyle = P.bucketHi; c.fillRect(172, 217, 22, 1);
    c.fillStyle = P.canLabel; c.fillRect(178, 225, 8, 5);
    /* the wire handle, hooked over the rim */
    for (i = 0; i < 22; i++) {
      c.fillStyle = P.steelHi;
      c.fillRect(172 + i, 216 - 3 - Math.round(Math.sin(i / 21 * Math.PI) * 2), 1, 1);
    }

    /* the whole prop layer is a step further back in the yard: darken the
       props themselves and leave the gaps between them clear */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 5);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ------------------------------------------------------------ plywood

     The signature of the place. A sheet is a parallelogram drawn one row
     at a time - the right four pixels of every row are the cut edge seen
     edge-on, and those four alternating plies are the whole reason
     plywood reads as plywood rather than as a tan rectangle. */
  function sheet(c, baseX, baseY, w, h, shear, faceLit, faceShade) {
    var PLIES = [P.plyPale, P.plyGrain, P.plyPale, P.plyDark];
    for (var i = 0; i < h; i++) {
      var y = baseY - i;
      var x = baseX + Math.round(i / h * shear);
      c.fillStyle = i > h * 0.66 ? faceLit : faceShade;
      c.fillRect(x, y, w, 1);
      for (var k = 0; k < 4; k++) {
        c.fillStyle = PLIES[k];
        c.fillRect(x + w - 4 + k, y, 1, 1);
      }
      c.fillStyle = P.plyEdge;
      c.fillRect(x - 1, y, 1, 1); c.fillRect(x + w, y, 1, 1);
      /* the sun catches the top of a leaning sheet */
      if (i > h - 60) Tint.rect(c, x, y, w - 4, 1, P.plyPale, 4);
    }
    c.fillStyle = P.plyEdge;
    c.fillRect(baseX + Math.round(shear) - 1, baseY - h, w + 2, 1);
    c.fillRect(baseX - 1, baseY + 1, w + 2, 1);
  }

  /* The cathedral grain plywood is named for: nested ovals, plotted two
     pixels per row - the left rim and the right rim. A stroked arc would
     antialias into mush on a nearest-neighbour layer. */
  function cathedral(c, cx, cy, rx, ry, rings) {
    c.fillStyle = P.plyGrain;
    for (var i = 0; i < rings; i++) {
      var Rx = rx + i * 6, Ry = ry + i * 16;
      for (var dy = -Ry; dy <= Ry; dy++) {
        var hw = Math.round(Rx * Math.sqrt(Math.max(0, 1 - (dy / Ry) * (dy / Ry))));
        c.fillRect(cx - hw, cy + dy, 1, 1);
        c.fillRect(cx + hw, cy + dy, 1, 1);
      }
    }
  }

  /* the charcoal board leaned in front of the sheets: the same shear, no
     plies - its cut edge is dark the whole way through */
  function darkBoard(c, baseX, baseY, w, h, shear) {
    for (var i = 0; i < h; i++) {
      var y = baseY - i;
      var x = baseX + Math.round(i / h * shear);
      c.fillStyle = P.slate;     c.fillRect(x, y, w, 1);
      c.fillStyle = P.slateHi;   c.fillRect(x, y, 1, 1);
      c.fillStyle = P.slateDark; c.fillRect(x + w - 3, y, 3, 1);
      c.fillStyle = P.outline;   c.fillRect(x - 1, y, 1, 1); c.fillRect(x + w, y, 1, 1);
    }
    c.fillStyle = P.outline;
    c.fillRect(baseX + Math.round(shear) - 1, baseY - h, w + 2, 1);
    c.fillRect(baseX - 1, baseY + 1, w + 2, 1);
  }

  function bakePlywood() {
    var W = 288, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(3140);
    var i, g;

    /* Sheet A's contact shadow on the stucco goes down FIRST, so the sheet
       lands on top of its own shadow. It hugs the left edge and steps down
       with the lean; only the outer half of the band ever shows. */
    for (i = 0; i < 168; i++) {
      var sy = 242 - i;
      Tint.rect(c, 40 + Math.round(i / 168 * 14) - 4, sy + 4, 8, 1, P.shade, 6);
    }
    sheet(c, 40, 242, 98, 168, 14, P.plyLit, P.plyLit);
    /* the grain goes on source-atop, so an oval that runs off the edge of
       the sheet does not leave grain hanging in mid air */
    c.globalCompositeOperation = 'source-atop';
    cathedral(c, 78, 130, 14, 40, 3);
    cathedral(c, 108, 196, 10, 28, 2);
    for (i = 0; i < 14; i++) {
      var gx = 6 + Math.floor(r() * 84);
      var gi = Math.floor(r() * 140);
      var gl = 20 + Math.floor(r() * 41);
      c.fillStyle = P.plyGrain;
      for (g = 0; g < gl; g++) {
        var ii = gi + g;
        if (ii >= 168) break;
        c.fillRect(40 + Math.round(ii / 168 * 14) + gx, 242 - ii, 1, 1);
      }
    }
    c.globalCompositeOperation = 'source-over';

    /* the second sheet, shorter, with its lower two thirds in shade */
    sheet(c, 176, 242, 74, 142, 10, P.plyLit, P.plyMid);
    c.globalCompositeOperation = 'source-atop';
    cathedral(c, 212, 170, 12, 34, 3);
    c.globalCompositeOperation = 'source-over';
    darkBoard(c, 196, 242, 40, 114, 6);

    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 3);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ------------------------------------------------------------- lumber

     The nearest scenery layer: the flat stack on the footing and the fan
     of 2x4s stood on end against the fence, which is the shape the
     photograph is really about. */
  function plank(c, baseX, baseY, w, h, shear, r) {
    var i;
    for (i = 0; i < h; i++) {
      var y = baseY - i;
      var x = baseX + Math.round(i / h * shear);
      c.fillStyle = P.lumMid;    c.fillRect(x, y, w, 1);
      c.fillStyle = P.lumHi;     c.fillRect(x, y, 2, 1);
      c.fillStyle = P.lumDark;   c.fillRect(x + w - 2, y, 2, 1);
      c.fillStyle = P.lumShadow; c.fillRect(x - 1, y, 1, 1); c.fillRect(x + w, y, 1, 1);
    }
    /* you are looking slightly down on it, so the sawn end shows */
    var tx = baseX + Math.round(shear);
    c.fillStyle = P.lumEnd;    c.fillRect(tx, baseY - h, w, 2);
    c.fillStyle = P.lumHi;     c.fillRect(tx, baseY - h - 1, w, 1);
    c.fillStyle = P.lumShadow; c.fillRect(tx - 1, baseY - h - 1, 1, 2);
    c.fillRect(tx + w, baseY - h - 1, 1, 2);
    /* somebody has had these out of a pallet before */
    var holes = 1 + Math.floor(r() * 2);
    for (i = 0; i < holes; i++) {
      var hi = Math.floor(r() * (h - 8)) + 4;
      c.fillStyle = P.nailDark;
      c.fillRect(baseX + Math.round(hi / h * shear) + 2 + Math.floor(r() * Math.max(1, w - 4)),
                 baseY - hi, 1, 1);
    }
  }

  function bakeLumber() {
    var W = 232, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(8080);
    var course, i;

    /* the flat stack first: the fan stands in front of it */
    for (course = 0; course < 3; course++) {
      var y = 224 + course * 6;
      c.fillStyle = course % 2 ? P.lumDark : P.lumMid;
      c.fillRect(112, y, 78, 6);
      c.fillStyle = P.lumShadow; c.fillRect(112, y + 5, 78, 1);
      [112, 184].forEach(function (ex) {
        c.fillStyle = P.lumEnd;  c.fillRect(ex, y, 6, 6);
        c.fillStyle = P.plyDark;
        c.fillRect(ex + 1, y + 1, 1, 4); c.fillRect(ex + 1, y + 4, 4, 1);
      });
    }
    c.fillStyle = P.outline; c.fillRect(112, 242, 78, 1);

    /* the fan: six 2x4s of six lengths leaning further right each time */
    var bx = [120, 130, 141, 150, 162, 171];
    var bw = [7, 8, 6, 8, 7, 9];
    var bh = [118, 136, 96, 148, 110, 128];
    var bs = [-6, -3, 2, 5, 9, 12];
    for (i = 0; i < 6; i++) plank(c, bx[i], 242, bw[i], bh[i], bs[i], r);

    /* the black metal frame, again, nearer and taller */
    c.fillStyle = P.steelBlack; c.fillRect(200, 120, 4, 124);
    c.fillStyle = P.steelHi;    c.fillRect(200, 120, 1, 124);
    c.fillStyle = P.steelBlack; c.fillRect(200, 150, W - 200, 4);

    /* barely dimmed: this layer is nearly in the action */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 2);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* --------------------------------------------------- ceiling and floor

     The lid is a plywood sheet laid over the yard on a black steel angle,
     with the extension cord slung along it. The eye needs the cord: it is
     the one warm line up there, and it says which way the yard runs. */
  function bakeCeiling() {
    var W = 128, H = CEIL;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(1290);
    var i, x;

    c.fillStyle = P.plyMid; c.fillRect(0, 0, W, 13);
    for (i = 0; i < 16; i++) {
      c.fillStyle = P.plyGrain;
      c.fillRect(Math.floor(r() * W), 1 + Math.floor(r() * 12),
                 8 + Math.floor(r() * 23), 1);
    }
    /* where two sheets meet, and a couple of knots */
    c.fillStyle = P.plyEdge; c.fillRect(64, 0, 1, 14);
    c.fillStyle = P.plyDark; c.fillRect(22, 4, 3, 2); c.fillRect(92, 8, 3, 2);
    c.fillStyle = P.plyEdge; c.fillRect(0, 13, W, 1);
    /* the angle iron */
    c.fillStyle = P.steelBlack; c.fillRect(0, 14, W, 7);
    c.fillStyle = P.steelMid;   c.fillRect(0, 14, W, 1);
    c.fillStyle = P.steelHi;    c.fillRect(0, 15, W, 1);
    [12, 76].forEach(function (bx) {
      c.fillStyle = P.nailLight; c.fillRect(bx, 16, 2, 2);
      c.fillStyle = P.nailDark;  c.fillRect(bx, 18, 2, 1);
    });
    /* the shadow gap under the angle */
    c.fillStyle = P.void; c.fillRect(0, 21, W, 3);
    /* the orange cord, sagging, with the light on the flat of the sag */
    for (x = 20; x < 108; x++) {
      var cy = 17 + Math.round(Math.sin((x - 20) / 88 * Math.PI) * 6);
      c.fillStyle = P.cord; c.fillRect(x, cy, 1, 1);
      if (x >= 58 && x <= 70) { c.fillStyle = P.cordHi; c.fillRect(x, cy - 1, 1, 1); }
    }
    c.fillStyle = P.steelBlack; c.fillRect(108, 21, 2, 3);
    /* sawdust caught on the angle's lip */
    for (i = 0; i < 8; i++) {
      c.fillStyle = P.sawdust; c.fillRect(Math.floor(r() * W), 13, 1, 1);
    }
    return t;
  }

  /* the concrete slab: white aggregate, a control joint, a gravel edge at
     the bottom of the screen and a run of cord lying on it */
  function bakeFloor() {
    var W = 160, H = VH - FLOOR;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2718);
    var i;

    c.fillStyle = P.concMid; c.fillRect(0, 0, W, H);
    Tint.rect(c, 0, 0, W, H, P.concDark, 4);
    Tint.rect(c, 0, 18, W, 10, P.gravel, 8);
    /* the aggregate: the white stones are what make it read as concrete */
    for (i = 0; i < 200; i++) {
      var x = Math.floor(r() * W), y = 2 + Math.floor(r() * 16);
      var v = r();
      c.fillStyle = v < 0.4 ? P.concHi : (v < 0.75 ? P.concDark : P.concLit);
      c.fillRect(x, y, (i % 5 === 0) ? 2 : 1, 1);
    }
    /* a control joint, at the tile seam so it wraps cleanly */
    c.fillStyle = P.concDark; c.fillRect(0, 0, 2, 19);
    c.fillStyle = P.concHi;   c.fillRect(2, 0, 1, 19);
    /* the lip that catches the light */
    c.fillStyle = P.concHi;  c.fillRect(0, 0, W, 1);
    c.fillStyle = P.concLit; c.fillRect(0, 1, W, 1);
    /* the gravel strip along the very bottom */
    for (i = 0; i < 90; i++) {
      var px = Math.floor(r() * W), py = 18 + Math.floor(r() * 10);
      var vv = r();
      c.fillStyle = vv < 0.5 ? P.gravel : (vv < 0.8 ? P.concDark : P.concLit);
      c.fillRect(px, py, vv < 0.3 ? 2 : 1, 1);
    }
    /* sawdust drifts, and the cord trailing away across the slab */
    c.fillStyle = P.sawdust; c.fillRect(40, 2, 12, 2); c.fillRect(118, 4, 7, 1);
    for (i = 60; i < 110; i++) {
      c.fillStyle = P.cord;
      c.fillRect(i, (i >= 78 && i <= 90) ? 5 : 6, 1, 1);
    }
    c.fillStyle = P.cordHi; c.fillRect(84, 4, 1, 1);
    return t;
  }

  /* ---------------------------------------------------------- pillar

     A bundle of stacked cut lumber, banded with black steel packing
     straps: a pile seen from the side, not a milled beam. What sells it is
     that every third course is stacked crosswise, so you see the ENDS of
     those pieces. */
  function plainCourse(c, x, y, charcoal) {
    if (charcoal) {
      c.fillStyle = P.slate;     c.fillRect(x, y, 34, 6);
      c.fillStyle = P.slateHi;   c.fillRect(x, y, 34, 1);
      c.fillStyle = P.slateDark; c.fillRect(x, y + 5, 34, 1);
      c.fillStyle = P.lumShadow; c.fillRect(x, y + 6, 34, 1);
      return;
    }
    c.fillStyle = P.lumHi;     c.fillRect(x, y, 34, 1);        /* the lit arris */
    c.fillStyle = P.lumMid;    c.fillRect(x, y + 1, 34, 4);
    c.fillStyle = P.lumDark;   c.fillRect(x, y + 5, 34, 1);
    c.fillStyle = P.lumShadow; c.fillRect(x, y + 6, 34, 1);    /* the gap to the next piece */
  }

  function crossCourse(c, x, y) {
    for (var i = 0; i < 4; i++) {
      var ex = x + 1 + i * 8;
      c.fillStyle = P.lumEnd;    c.fillRect(ex, y, 8, 6);
      /* two growth-ring arcs, drawn as an L - at 8x6 that is all the ring
         you can honestly show */
      c.fillStyle = P.plyDark;
      c.fillRect(ex + 2, y + 1, 1, 4); c.fillRect(ex + 2, y + 4, 4, 1);
      c.fillStyle = P.lumShadow;  c.fillRect(ex + 7, y, 1, 6);
    }
    c.fillStyle = P.lumShadow; c.fillRect(x, y + 6, 34, 1);
  }

  function bakePillar(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(700 + variant * 53);
    var i, course;

    /* the seams show through wherever a course is nudged sideways */
    c.fillStyle = P.lumShadow; c.fillRect(0, 0, W, H);

    for (course = 0; course < 9; course++) {
      var y = course * 7;
      var jx = Math.floor(r() * 3) - 1;   /* nobody stacked it straight */
      if (course % 3 === 2) crossCourse(c, jx, y);
      else plainCourse(c, jx, y, variant === 1 && course === 4);
    }
    c.fillStyle = P.lumShadow; c.fillRect(0, 63, W, 1);

    /* short grain ticks, and a knot or two, inside the plain courses */
    for (i = 0; i < 20; i++) {
      var gc = Math.floor(r() * 9);
      if (gc % 3 === 2) gc = (gc + 1) % 9;
      var gy = gc * 7 + 1 + Math.floor(r() * 4);
      c.fillStyle = r() < 0.5 ? P.lumDark : P.lumHi;
      c.fillRect(2 + Math.floor(r() * 26), gy, 4 + Math.floor(r() * 9), 1);
    }
    for (i = 0; i < 2; i++) {
      var kx = 4 + Math.floor(r() * 24), ky = Math.floor(r() * (H - 3));
      c.fillStyle = P.plyDark; c.fillRect(kx, ky, 3, 2);
      c.fillStyle = P.outline; c.fillRect(kx + 1, ky, 1, 1);
    }

    /* Variant 1 also wears a band of hazard tape. It is baked, so the
       diagonals are free - a diagonal drawn live would crawl. */
    if (variant === 1) {
      for (var ty = 46; ty < 51; ty++) {
        for (var tx = 0; tx < W; tx++) {
          c.fillStyle = ((tx + ty) % 6) < 2 ? P.steelBlack : P.crateMid;
          c.fillRect(tx, ty, 1, 1);
        }
      }
    }

    /* the steel packing straps holding the bundle together */
    [7, 26].forEach(function (sx) {
      c.fillStyle = P.steelBlack; c.fillRect(sx, 0, 2, H);
      for (var hy = 2; hy < H; hy += 9) {
        c.fillStyle = P.steelHi; c.fillRect(sx, hy, 1, 1);
      }
    });
    c.fillStyle = P.nailMid;   c.fillRect(6, 30, 4, 3);
    c.fillStyle = P.nailLight; c.fillRect(7, 31, 1, 1);

    /* and the hard edge that lifts a lumber-coloured pillar off a
       lumber-coloured yard */
    c.fillStyle = P.outline;
    c.fillRect(0, 0, 1, H); c.fillRect(W - 1, 0, 1, H);
    return t;
  }

  /* The mouth of the gap: a plywood offcut seen edge-on, so the cut edge
     shows its plies. `down` is the cap on the bottom of the top column -
     its face points down into the gap. */
  function bakeCap(down) {
    var W = 42, H = 9;
    var t = makeCanvas(W, H), c = t.ctx;
    var rows = [P.outline, P.plyPale, P.plyLit,
                P.plyPale, P.plyGrain, P.plyPale, P.plyGrain, P.plyDark,
                P.outline];
    var i;
    for (i = 0; i < H; i++) {
      c.fillStyle = rows[down ? H - 1 - i : i];
      c.fillRect(0, i, W, 1);
    }
    c.fillStyle = P.plyDark; c.fillRect(1, 0, 1, H); c.fillRect(W - 2, 0, 1, H);
    c.fillStyle = P.outline; c.fillRect(0, 0, 1, H); c.fillRect(W - 1, 0, 1, H);
    /* the two screws holding the offcut on, on the lit face */
    var sy = down ? H - 3 : 1;
    [5, 35].forEach(function (sx) {
      c.fillStyle = P.nailLight; c.fillRect(sx, sy, 2, 2);
      c.fillStyle = P.nailDark;  c.fillRect(sx, down ? sy - 1 : sy + 2, 2, 1);
    });
    return t;
  }

  /* --------------------------------------------------------- the blades

     The buzzsaw's rasteriser. It walks every pixel of a square, asks
     edge(p) how far the metal reaches at that tooth phase and
     paint(r, p, a) what colour the pixel is, then rings the whole shape
     in outline. Nothing rotates a canvas: a frame is a fresh raster at a
     new angle, so a spinning blade on the nearest-neighbour layer never
     resamples and never shimmers.

     The golden gear used to be cut from this too and is not any more -
     see bakeGear for why an edge(p) can only ever make a flower. */
  function rasterDisc(R, off, edge, paint, ringIt) {
    var S = R * 2 + 1;
    var t = makeCanvas(S, S), c = t.ctx;
    var mid = R + 0.5;
    var inside = new Array(S * S), cols = new Array(S * S);
    var px, py, i;

    for (py = 0; py < S; py++) {
      for (px = 0; px < S; px++) {
        var dx = px + 0.5 - mid, dy = py + 0.5 - mid;
        var r = Math.sqrt(dx * dx + dy * dy);
        var a = Math.atan2(dy, dx) + off;
        var p = mod(a / TOOTH, 1);
        i = py * S + px;
        if (r <= edge(p)) { inside[i] = true; cols[i] = paint(r, p, a); }
        else { inside[i] = false; cols[i] = null; }
      }
    }
    /* Any metal pixel with air beside it becomes outline, which is what
       keeps a 19px blade from dissolving into the slab behind it. Anything
       with teeth only a pixel or two long says no: the ring would eat the
       teeth and leave a handful of loose pixels. */
    function ins(x, y) { return x >= 0 && y >= 0 && x < S && y < S && inside[y * S + x]; }
    if (ringIt !== false) {
      for (py = 0; py < S; py++) {
        for (px = 0; px < S; px++) {
          i = py * S + px;
          if (!inside[i]) continue;
          if (!ins(px - 1, py) || !ins(px + 1, py) || !ins(px, py - 1) || !ins(px, py + 1)) {
            cols[i] = P.outline;
          }
        }
      }
    }
    for (py = 0; py < S; py++) {
      for (px = 0; px < S; px++) {
        var col = cols[py * S + px];
        if (!col) continue;
        c.fillStyle = col;
        c.fillRect(px, py, 1, 1);
      }
    }
    return t;
  }

  /* one frame of a circular saw blade: eight hooked teeth, an arbor hole,
     a washer and four gullet lines so the BODY reads as turning too - with
     only the teeth moving, a spinning blade looks like a still blade with
     a flickering rim */
  function bakeBlade(R, f) {
    var off = f * (TOOTH / SAW_FRAMES);
    /* The arbor scales with the blade. Fixed radii sized for the 25px
       blade turn the 19px one into a washer: its disc would be a pixel
       and a half wide between the hub and the teeth, and a saw whose
       body you cannot see does not read as a saw. */
    var hub = Math.max(1.4, R * 0.18);
    var washer = Math.max(2.6, R * 0.30);
    return rasterDisc(R, off,
      function (p) { return R - 3 + 3 * (1 - p); },
      function (r, p, a) {
        if (r < hub) return P.outline;
        if (r < washer) return P.steelMid;
        if (r < R - 3.5) {
          for (var k = 0; k < 4; k++) {
            if (r > washer + 1 && r < R - 4 &&
                Math.abs(angDiff(a, k * Math.PI / 2)) < 0.7 / r) return P.nailDark;
          }
          return P.nailMid;
        }
        return p < 0.14 ? P.bladeHi : P.bladeEdge;
      });
  }

  function bakeBladeSet(R) {
    var out = [];
    for (var f = 0; f < SAW_FRAMES; f++) out.push(bakeBlade(R, f));
    return out;
  }

  /* --------------------------------------------------------- the gear

     This sprite used to read as a sunflower, and it read as one because
     of rasterDisc rather than in spite of it. That rasteriser answers a
     single question per pixel - how far does the metal reach at THIS
     angle - so every tooth it can cut is an angular wedge. A wedge two
     pixels long at an eleven pixel rim is 1.4px wide at its root and 2px
     at its tip: a lobe. Eight pale lobes round a dark middle is a
     sunflower however the pigments are named, and the old bake put a
     solid 3x3 black square in the centre, which finished the seed head.

     A gear is the other shape. Its teeth have PARALLEL flanks, its body
     is a plain disc, and there is a hole through the middle you can see
     the wall through. So the gear gets its own eleven pixel raster, in
     two passes, and rasterDisc and the buzzsaw are left exactly as they
     were. Two passes because the shading has to ask what is NEXT to a
     pixel, which a paint(r, p, a) callback is never told. */
  var GEAR_R    = 5;      /* 11x11 body; 13x13 once the halo is round it */
  var GEAR_ROOT = 3.5;    /* the solid hub disc - between the on-grid radii
                             3.16 and 3.6, so it lands as 3/5/7/7/7/5/3 */
  var GEAR_TIP  = 5.7;    /* how far a tooth reaches along its own axis */
  var GEAR_HALF = 1.05;   /* half a tooth's width. Not 1.0: cos(3*PI/2) is
                             not quite zero, and at exactly 1.0 some axis
                             teeth came out 3px wide and some 2px. The
                             tangents that occur on a pixel grid are 0,
                             +-0.707, +-1 and +-1.414, so 1.05 has margin
                             on both sides and every tooth is the same. */
  var GEAR_BORE = 1.6;    /* the bore - between the on-grid radii 1.41 and
                             2, so it lands as a 3x3 ring */

  function bakeGear(f) {
    var S = GEAR_R * 2 + 1, off = f * (TOOTH / GEAR_FRAMES);
    var inside = new Array(S * S), bore = new Array(S * S);
    var px, py, i, k, dx, dy;

    /* pass one: metal or air. A pixel is metal if it is inside the hub
       disc or inside any one of the eight teeth, and a tooth is a
       straight strip GEAR_HALF wide laid along its own axis rather than
       a wedge. On the axes that strip lands as a 3x2 block, on the
       diagonals as a 2x2, and the gullet between two teeth stays one
       clean pixel of air the halo can fill. */
    for (py = 0; py < S; py++) {
      for (px = 0; px < S; px++) {
        dx = px - GEAR_R; dy = py - GEAR_R;
        var r = Math.sqrt(dx * dx + dy * dy);
        var hit = r <= GEAR_ROOT;
        for (k = 0; k < 8 && !hit; k++) {
          var ang = off + k * TOOTH;
          var nx = Math.cos(ang), ny = Math.sin(ang);
          var proj = dx * nx + dy * ny;      /* along the tooth   */
          var tang = dy * nx - dx * ny;      /* across the tooth  */
          hit = proj >= GEAR_ROOT - 1 && proj <= GEAR_TIP + 1e-9 &&
                Math.abs(tang) <= GEAR_HALF + 1e-9;
        }
        i = py * S + px;
        inside[i] = hit;
        bore[i] = r < GEAR_BORE;
      }
    }

    function metal(x, y) {
      if (x < 0 || y < 0 || x >= S || y >= S) return false;
      var j = y * S + x;
      return inside[j] && !bore[j];
    }

    /* pass two: light. The sun in this level comes from the top left, so
       a face with air above it or to its left takes the highlight and a
       face with air below or to its right takes the shadow. The BORE
       counts as air, and that is the whole trick - the metal above the
       hole goes dark and the metal below it goes pale, which is how a
       drilled hole looks and how a painted dot never does. */
    var t = makeCanvas(S, S), c = t.ctx;
    for (py = 0; py < S; py++) {
      for (px = 0; px < S; px++) {
        i = py * S + px;
        if (!inside[i]) continue;
        dx = px - GEAR_R; dy = py - GEAR_R;
        if (bore[i]) {
          /* the pixel at dead centre is left EMPTY, so the stucco and
             the gear's own glow show through the hole. At 3x on screen
             that one hole is what says cog and not coin. */
          if (dx === 0 && dy === 0) continue;
          c.fillStyle = P.outline;
        } else {
          var sh = (metal(px, py - 1) ? 0 : 1) + (metal(px - 1, py) ? 0 : 1) -
                   (metal(px, py + 1) ? 0 : 1) - (metal(px + 1, py) ? 0 : 1);
          c.fillStyle = sh > 0 ? P.goldHi : (sh < 0 ? P.goldDark : P.goldMid);
          /* one specular pixel on the hub's top-left shoulder, where it
             has always been */
          if (dx === -2 && dy === -2) c.fillStyle = P.goldShine;
        }
        c.fillRect(px, py, 1, 1);
      }
    }

    /* a pixel of margin all round for the halo, so the teeth keep their
       edge against sunlit stucco without losing a pixel to it */
    var g = makeCanvas(13, 13), gc = g.ctx;
    var body = makeCanvas(13, 13);
    body.ctx.drawImage(t.canvas, 1, 1);
    gc.drawImage(ringOf(body, 13, 13).canvas, 0, 0);
    gc.drawImage(body.canvas, 0, 0);
    /* the halo smears one pixel each way, so the bore ring closed the
       hole back up behind the body. Re-open it. */
    gc.clearRect(6, 6, 1, 1);
    return g;
  }

  /* ---------------------------------------------------- falling lumber

     Two beams, the same piece of wood seen two ways round. The horizontal
     one is a long low thing to duck under or hop over; the vertical one is
     a narrow thing to sidestep. That is the opposite dodge from the same
     hazard, and in the data the only difference between them is `dir`. */
  function bakeBeam(dir) {
    var horiz = dir === 'h';
    var t = makeCanvas(horiz ? 26 : 6, horiz ? 6 : 26), c = t.ctx;
    var L = 26, i;
    /* the five tones across the thickness of the piece */
    var band = [P.outline, P.lumHi, P.lumMid, P.lumMid, P.lumDark, P.outline];
    for (i = 0; i < 6; i++) {
      c.fillStyle = band[i];
      if (horiz) c.fillRect(0, i, L, 1);
      else c.fillRect(i, 0, 1, L);
    }
    /* the sawn ends */
    for (i = 0; i < 2; i++) {
      c.fillStyle = P.outline;
      if (horiz) c.fillRect(i * (L - 1), 0, 1, 6);
      else c.fillRect(0, i * (L - 1), 6, 1);
      c.fillStyle = P.lumEnd;
      if (horiz) c.fillRect(i ? L - 3 : 1, 1, 2, 4);
      else c.fillRect(1, i ? L - 3 : 1, 4, 2);
    }
    c.fillStyle = P.nailDark;
    if (horiz) { c.fillRect(8, 2, 1, 1); c.fillRect(18, 3, 1, 1); }
    else { c.fillRect(2, 8, 1, 1); c.fillRect(3, 18, 1, 1); }
    c.fillStyle = P.lumDark;
    if (horiz) { c.fillRect(6, 3, 5, 1); c.fillRect(15, 3, 5, 1); }
    else { c.fillRect(3, 6, 1, 5); c.fillRect(3, 15, 1, 5); }
    return t;
  }

  /* the butane can: this level's spicy drop, and the only red in the yard */
  function bakeCan() {
    var t = makeCanvas(9, 13), c = t.ctx;
    c.fillStyle = P.outline;  c.fillRect(0, 0, 9, 13);
    c.fillStyle = P.canMid;   c.fillRect(1, 3, 7, 9);
    c.fillStyle = P.canHi;    c.fillRect(1, 3, 2, 9);
    c.fillStyle = P.canDark;  c.fillRect(7, 3, 1, 9); c.fillRect(1, 11, 7, 1);
    c.fillStyle = P.canLabel; c.fillRect(2, 6, 5, 3);
    c.fillStyle = P.canDark;  c.fillRect(3, 7, 3, 1);
    c.fillStyle = P.canCap;   c.fillRect(2, 1, 5, 2);
    c.fillStyle = P.nailLight; c.fillRect(4, 0, 1, 1);
    return t;
  }

  /* ------------------------------------------------------ heart of junk

     The extra life. Scrap tied into a heart with bent copper wire, sitting
     on a scrap of pallet. The pallet and the heart are baked separately in
     one shared 22x28 coordinate space, so drawing both at the same origin
     reassembles the picture - and Gerald's hunger can lift the heart off
     the pallet and leave the pallet on the slab. */
  var HEART_ROWS = [
    [[2, 4], [11, 4]],
    [[1, 6], [10, 6]],
    [[0, 17]], [[0, 17]], [[0, 17]],
    [[1, 15]], [[2, 13]], [[3, 11]], [[4, 9]], [[5, 7]], [[6, 5]], [[7, 3]], [[8, 1]]
  ];

  function heartFill(c, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < HEART_ROWS.length; i++) {
      var spans = HEART_ROWS[i];
      for (var k = 0; k < spans.length; k++) {
        c.fillRect(x + spans[k][0], y + i, spans[k][1], 1);
      }
    }
  }

  /* The 1px halo round a shape, built by smearing it one pixel each way
     and keeping only what the smear added. A heart has two lobes and a
     notch between them, so fattening the shape row by row the way the
     Garden outlines a tomato would paint the notch shut; a gear has teeth
     two pixels long, which an inside-out outline would eat. Both get the
     ring laid UNDERNEATH them instead. */
  function ringOf(mask, w, h) {
    var ring = makeCanvas(w, h), c = ring.ctx;
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) {
      c.drawImage(mask.canvas, d[0], d[1]);
    });
    c.globalCompositeOperation = 'source-in';
    c.fillStyle = P.outline;
    c.fillRect(0, 0, w, h);
    c.globalCompositeOperation = 'source-over';
    return ring;
  }

  function bakePallet() {
    var t = makeCanvas(22, 8), c = t.ctx;
    c.fillStyle = P.lumMid;    c.fillRect(0, 0, 22, 2);
    c.fillStyle = P.lumHi;     c.fillRect(0, 0, 22, 1);
    c.fillStyle = P.lumShadow; c.fillRect(0, 2, 22, 1);
    c.fillStyle = P.lumMid;    c.fillRect(0, 3, 22, 2);
    c.fillStyle = P.lumShadow; c.fillRect(0, 5, 22, 1);
    [1, 9, 17].forEach(function (bx) {
      c.fillStyle = P.lumDark; c.fillRect(bx, 6, 4, 2);
    });
    c.fillStyle = P.outline;
    c.fillRect(0, 0, 22, 1); c.fillRect(0, 7, 22, 1);
    c.fillRect(0, 0, 1, 8); c.fillRect(21, 0, 1, 8);
    return t;
  }

  function bakeHeart() {
    var t = makeCanvas(22, 20), c = t.ctx;
    var OX = 2, OY = 3, i, k;

    /* the base junk the rest is tied on top of */
    heartFill(c, OX, OY, P.lumDark);
    /* the scrap, painted as plain rects and then cut to the heart:
       masking is the only way a yellow lid fragment can keep a straight
       edge inside a curved silhouette */
    c.fillStyle = P.crateMid;  c.fillRect(OX + 2, OY + 1, 5, 4); c.fillRect(OX + 10, OY + 1, 5, 4);
    c.fillStyle = P.crateHi;   c.fillRect(OX + 3, OY + 1, 1, 1); c.fillRect(OX + 11, OY + 1, 1, 1);
    c.fillStyle = P.bucketMid; c.fillRect(OX + 3, OY + 5, 4, 4);
    c.fillStyle = P.bucketHi;  c.fillRect(OX + 3, OY + 5, 1, 1);
    c.fillStyle = P.slate;     c.fillRect(OX + 12, OY + 4, 3, 5);
    c.fillStyle = P.slateHi;   c.fillRect(OX + 12, OY + 4, 3, 1);
    c.fillStyle = P.nailLight; c.fillRect(OX + 7, OY + 5, 3, 3);
    c.fillStyle = P.outline;   c.fillRect(OX + 8, OY + 6, 1, 1);
    c.fillStyle = P.nailMid;   c.fillRect(OX + 8, OY + 8, 1, 4); c.fillRect(OX + 9, OY + 8, 1, 3);

    var mask = makeCanvas(22, 20);
    heartFill(mask.ctx, OX, OY, '#ffffff');
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(mask.canvas, 0, 0);
    /* the outline goes UNDERNEATH what is left, which is why the mask
       cutting it away does not matter */
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(ringOf(mask, 22, 20).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';

    /* the bent copper wire it is all tied with: the first and last pixel
       of every row of the shape, lit on the lobes where the sun is */
    for (i = 0; i < HEART_ROWS.length; i++) {
      var spans = HEART_ROWS[i];
      for (k = 0; k < spans.length; k++) {
        c.fillStyle = i < 3 ? P.copperHi : P.copper;
        c.fillRect(OX + spans[k][0], OY + i, 1, 1);
        c.fillRect(OX + spans[k][0] + spans[k][1] - 1, OY + i, 1, 1);
      }
    }
    c.fillStyle = P.copperHi; c.fillRect(OX + 8, OY + 12, 1, 1);
    return t;
  }

  /* The room first, then the hazards, then the sprites. Nothing here
     depends on an earlier tile except the two blade sets, which share one
     rasteriser. */
  function build() {
    T.wall    = bakeWall();
    T.props   = bakeProps();
    T.plywood = bakePlywood();
    T.lumber  = bakeLumber();
    T.ceiling = bakeCeiling();
    T.floor   = bakeFloor();
    T.pillar  = [bakePillar(0), bakePillar(1)];
    T.capDown = bakeCap(true);
    T.capUp   = bakeCap(false);
    T.blade   = { 9: bakeBladeSet(9), 12: bakeBladeSet(12) };
  }

  function buildSprites() {
    T.beamH  = bakeBeam('h');
    T.beamV  = bakeBeam('v');
    T.can    = bakeCan();
    T.gear   = [];                                   /* 13x13 with its halo */
    for (var gf = 0; gf < GEAR_FRAMES; gf++) T.gear.push(bakeGear(gf));
    T.pallet = bakePallet();
    T.heart  = bakeHeart();
  }

  /* -------------------------------------------------------- drawing */

  /* Five baked layers and six flat washes, and that is the whole room.
     The washes are the only live shading in here, and every one of them is
     a Tint - the layers underneath them all scroll. */
  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = P.stuccoMid;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * 0.14, 0);
    tileX(ctx, T.props.canvas, scroll * 0.30, 0);
    tileX(ctx, T.plywood.canvas, scroll * 0.42, 0);
    tileX(ctx, T.lumber.canvas, scroll * 0.58, 0);
    /* everything behind the action stands back a step */
    Tint.rect(ctx, 0, 0, VW, VH, P.stuccoShade, 3);
    /* warm air under the lid, and the slab's own gloom down low */
    Tint.rect(ctx, 0, CEIL, VW, 60, P.sunHaze, 2);
    Tint.rect(ctx, 0, FLOOR - 70, VW, 70, P.void, 4);
    /* a vignette keeps the eye in the middle of the screen */
    Tint.rect(ctx, 0, CEIL, 46, FLOOR - CEIL, P.void, 4);
    Tint.rect(ctx, VW - 46, CEIL, 46, FLOOR - CEIL, P.void, 4);
  }

  /* a calmer version of the yard for the menus to sit on: the wall, the
     lid and the slab, without the clutter that would fight the ui */
  function drawMenuBackdrop(ctx, scroll) {
    ctx.fillStyle = P.stuccoMid;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * 0.3, 0);
    Tint.rect(ctx, 0, 0, VW, VH, P.stuccoShade, 5);
    Tint.rect(ctx, 0, VH - 120, VW, 120, P.void, 4);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.ceiling.canvas, scroll, 0);
    /* the shadow the lid throws down into the yard */
    Tint.rect(ctx, 0, CEIL, VW, 11, P.void, 6);
    Tint.rect(ctx, 0, CEIL, VW, 4, P.void, 5);
  }

  function drawFloor(ctx, scroll) {
    Tint.rect(ctx, 0, FLOOR - 10, VW, 10, P.void, 5);
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
    /* The nails, before the caps go on. The segment handed over here MUST
       be the one rectsFor boxes - the column PROPER, inset by the 9px cap -
       not the drawn column. Handing over the drawn column put the lethal
       box up to 9px off the metal on the lower half, so the player died to
       empty air below a nail and flew through the nail itself. */
    drawNails(ctx, ob, x, CEIL, ob.gapY - 9 - CEIL, w, true);
    drawNails(ctx, ob, x, botY + 9, FLOOR - (botY + 9), w, false);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* the hard cast shadow on the wall behind: with a mid-tone wall this
       is half of what separates the pillar from the yard */
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH : 0, P.void, 7);
    Tint.rect(ctx, x + w, botY, 4, botH > 0 ? botH : 0, P.void, 7);
  }

  /* tile the lumber stack into a column of any height */
  function drawColumn(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* Nails left in the sides of the pieces, the Garden's thorns' job. They
     reach 5px out at the very most, which widens the column without ever
     reaching into the gap. A segment shorter than 14px gets none: there is
     nowhere to put one that is not already the cap. */
  /* `top` says which half of the plank this is, because a nail belongs to
     exactly one of them. Painting every nail on both columns put a lethal-
     looking nail on the column that has no box for it, and the +5 here
     against rectsFor's +4 left the box a pixel above the metal. */
  function drawNails(ctx, ob, x, y, h, w, top) {
    if (h <= 14) return;
    for (var i = 0; i < ob.nails.length; i++) {
      var n = ob.nails[i];
      if ((n.k < 0.5) !== top) continue;
      var ty = y + Math.round(n.k * (h - 10)) + 4;
      var dir = n.side ? 1 : -1;
      var bx = n.side ? x + w - 1 : x;
      for (var s = 0; s < n.len; s++) {
        /* a bent one droops over its last two pixels */
        var yy = ty + (n.bent && s > n.len - 3 ? 1 : 0);
        ctx.fillStyle = (n.rusty && s > n.len / 2) ? P.rust : P.nailMid;
        ctx.fillRect(bx + dir * s, yy, 1, 1);
        if (s === 0) { ctx.fillStyle = P.nailLight; ctx.fillRect(bx, yy, 1, 1); }
      }
      /* the head on the end, pale so it reads as something to avoid */
      var hy = ty + (n.bent ? 1 : 0);
      ctx.fillStyle = P.nailLight; ctx.fillRect(bx + dir * n.len, hy - 1, 1, 3);
      ctx.fillStyle = P.nailDark;  ctx.fillRect(bx + dir * n.len, hy + 2, 1, 1);
      /* and where it went in */
      ctx.fillStyle = P.outline; ctx.fillRect(bx, ty, 1, 1);
    }
  }

  /* ------------------------------------------------------- buzzsaws

     Circular blades sticking up out of slots in the slab and down out of
     the lid, turning the whole time. There is no armed-and-idle phase:
     the rotation IS the warning, and rectsFor never changes, so a blade
     cannot switch on with the doodad already inside it.

     The frame comes out of ob.x, so the blade rolls along the slab like a
     wheel - the world travels left, so the top of a floor blade travels
     left too and climbs at the doodad. */
  function bladeFrame(ob, n, onCeiling) {
    var angle = (onCeiling ? ob.x : -ob.x) * SAW_TURN + n.phase;
    var f = Math.floor(mod(angle, TOOTH) / TOOTH * SAW_FRAMES) % SAW_FRAMES;
    return T.blade[n.R][f].canvas;
  }

  function drawSaws(ctx, ob) {
    var x = Math.round(ob.x);
    var onCeiling = ob.side === 'ceil';
    for (var i = 0; i < ob.spikes.length; i++) {
      var n = ob.spikes[i];
      var S = n.R * 2 + 1;
      var cx = x + n.dx + n.R;
      var frame = bladeFrame(ob, n, onCeiling);
      /* cropped by source rect, so the buried half of the blade stays in
         its slot without a clip and without painting over the lid */
      if (onCeiling) ctx.drawImage(frame, 0, S - n.len, S, n.len, cx - n.R, CEIL, S, n.len);
      else ctx.drawImage(frame, 0, 0, S, n.len, cx - n.R, FLOOR - n.len, S, n.len);
      /* the brackets the arbor runs through - safe to touch, and they are
         what stops a blade reading as a saucer floating in the air */
      var by = onCeiling ? CEIL : FLOOR - 4;
      [cx - n.R - 3, cx + n.R - 3].forEach(function (sx) {
        ctx.fillStyle = P.steelBlack; ctx.fillRect(sx, by, 6, 4);
        ctx.fillStyle = P.steelHi;    ctx.fillRect(sx, onCeiling ? by + 3 : by, 6, 1);
        ctx.fillStyle = P.nailLight;  ctx.fillRect(sx + 2, by + 1, 1, 1);
      });
      /* sawdust coming off the cut, phased off the same scroll */
      for (var k = 0; k < 2; k++) {
        var kk = mod(ob.x * 0.02 + k * 0.5, 1);
        var dy = n.len + 2 + Math.round(kk * 6);
        ctx.fillStyle = k ? P.sawdust : P.plyPale;
        ctx.fillRect(cx - n.R + Math.round(kk * n.R * 2),
                     onCeiling ? CEIL + dy : FLOOR - dy, 1, 1);
      }
    }
  }

  /* ----------------------------------------------- the falling things

     A drop is cropped to y >= CEIL as it is drawn, so a beam comes DOWN
     THROUGH the lid rather than appearing on top of it. */
  function blitBelowCeil(ctx, tile, x, y) {
    var cut = CEIL - y;
    if (cut <= 0) { ctx.drawImage(tile, x, y); return; }
    if (cut >= tile.height) return;
    ctx.drawImage(tile, 0, cut, tile.width, tile.height - cut,
                  x, y + cut, tile.width, tile.height - cut);
  }

  /* the halo a power-up wears, clipped off at the lid for the same reason */
  function glow(ctx, x, y, r, core, mid, edge, pulse) {
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, core);
    g.addColorStop(0.55, mid);
    g.addColorStop(1, edge);
    ctx.fillStyle = g;
    var top = Math.max(CEIL, y - r);
    ctx.fillRect(x - r, top, r * 2, y + r - top);
  }

  function drawDrop(ctx, ob) {
    var sway = Math.round(Math.sin(ob.spin) * 1.2);
    var x = Math.round(ob.x), y = Math.round(ob.y);
    var i, k;

    if (ob.spicy) {
      var cp = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
      glow(ctx, x + sway, y, Math.round(14 + cp * 5),
           'rgba(255,216,138,' + (0.46 * cp).toFixed(3) + ')',
           'rgba(255,90,31,' + (0.22 * cp).toFixed(3) + ')',
           'rgba(139,29,21,0)');
      for (i = 0; i < 3; i++) {
        k = mod(ob.spin * 0.7 + i * 0.41, 1);
        var fy = y - 8 - Math.round(k * 7);
        if (fy < CEIL) continue;
        ctx.fillStyle = i % 2 ? P.flameHi : P.flame;
        ctx.fillRect(x + sway - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), fy, 1, 1);
      }
      blitBelowCeil(ctx, T.can.canvas, x + sway - 4, y - 6);
      return;
    }

    if (ob.gold) {
      /* it falls fast and it is worth five, so it trails ABOVE itself */
      var gp = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
      glow(ctx, x + sway, y, Math.round(12 + gp * 3),
           'rgba(243,204,132,' + (0.32 * gp).toFixed(3) + ')',
           'rgba(224,176,74,' + (0.14 * gp).toFixed(3) + ')',
           'rgba(156,114,51,0)');
      for (i = 0; i < 2; i++) {
        k = mod(ob.spin * 0.9 + i * 0.5, 1);
        var ty = y - 7 - Math.round(k * 6);
        if (ty < CEIL) continue;
        ctx.fillStyle = P.goldHi;
        ctx.fillRect(x + sway - 2 + i * 4, ty, 1, 1);
      }
      var gf = Math.floor(mod(ob.spin, TOOTH) / TOOTH * GEAR_FRAMES) % GEAR_FRAMES;
      blitBelowCeil(ctx, T.gear[gf].canvas, x + sway - 6, y - 6);
      return;
    }

    /* the beams. Two sawdust motes hang above either one - the Garden's
       pepper-spark formula, which is cheap and never repeats visibly. */
    for (i = 0; i < 2; i++) {
      k = mod(ob.spin * 0.7 + i * 0.41, 1);
      var my = y - 8 - Math.round(k * 7);
      if (my < CEIL) continue;
      ctx.fillStyle = i ? P.plyPale : P.sawdust;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), my, 1, 1);
    }
    if (ob.dir === 'h') {
      /* a shivering horizontal beam looks wrong, so this one sways in y */
      blitBelowCeil(ctx, T.beamH.canvas, x - 13, y - 3 + sway);
    } else {
      blitBelowCeil(ctx, T.beamV.canvas, x + sway - 3, y - 13);
    }
  }

  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    /* a beam on its side casts a beam-long shadow; everything else a spot */
    var w = ob.dir === 'h' ? Math.round(24 - k * 6) : Math.round(11 - k * 5);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3,
              ob.gold ? P.goldHi : (ob.spicy ? P.flame : P.void), 6 + k * 9);
  }

  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);

    if (ob.spicy) {
      /* the can went off: a scorch on the slab, still guttering */
      ctx.fillStyle = P.canCap; ctx.fillRect(x - 7, FLOOR + 2, 14, 2);
      ctx.fillStyle = P.canMid; ctx.fillRect(x - 3, FLOOR + 1, 6, 2);
      var lift = Math.floor(ob.broken * 9) % 2;
      ctx.fillStyle = P.flame;   ctx.fillRect(x - 2, FLOOR - lift, 1, 1);
      ctx.fillStyle = P.flameHi; ctx.fillRect(x, FLOOR - 1 - lift, 1, 1);
      ctx.fillStyle = P.flame;   ctx.fillRect(x + 3, FLOOR - lift, 1, 1);
    } else if (ob.gold) {
      /* a gear nobody caught, lying flat and dulling */
      ctx.fillStyle = P.goldMid;  ctx.fillRect(x - 5, FLOOR + 1, 11, 2);
      ctx.fillStyle = P.goldHi;   ctx.fillRect(x - 5, FLOOR + 1, 11, 1);
      ctx.fillStyle = P.goldDark; ctx.fillRect(x - 5, FLOOR + 1, 1, 2);
      ctx.fillRect(x + 5, FLOOR + 1, 1, 2);
    } else {
      /* either beam has toppled, so both lie flat */
      var spread = Math.round(7 + (1 - k) * 3);
      ctx.drawImage(T.beamH.canvas, x - 13, FLOOR + 1);
      ctx.fillStyle = P.lumHi;  ctx.fillRect(x - spread - 2, FLOOR + 3, 2, 1);
      ctx.fillStyle = P.lumDark; ctx.fillRect(x + spread, FLOOR + 2, 2, 1);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------- heart of junk */

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var px = Math.round(ob.x);
    var rx = Math.round(ob.x + ob.dx), ry = Math.round(FLOOR + ob.dy);
    var lifted = ob.dy < -1 || ob.dx > 1 || ob.dx < -1;
    var i;

    /* the pallet stays on the slab wherever the heart gets to */
    ctx.drawImage(T.pallet.canvas, px - 11, FLOOR - 8);

    /* the succulent's exact glow: a life is a life, in any level */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase);
    var r = Math.round(15 + pulse * 4);
    var g = ctx.createRadialGradient(rx, ry - 17, 1, rx, ry - 17, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(rx - r, ry - 17 - r, r * 2, r * 2);

    /* once it is off the pallet the loosely tied bits fall out of it */
    if (lifted) {
      for (i = 0; i < 3; i++) {
        var kk = mod(ob.phase * 0.5 + i * 0.33, 1);
        var by = ry - 14 + Math.round(kk * 7);
        ctx.fillStyle = i === 0 ? P.nailMid : (i === 1 ? P.nailLight : P.crateMid);
        ctx.fillRect(rx - 3 + i * 3, by, 1, i === 0 ? 2 : 1);
      }
    }
    ctx.drawImage(T.heart.canvas, rx - 11, ry - 27);

    for (i = 0; i < 2; i++) {
      var k = mod(ob.phase * 0.22 + i * 0.5, 1);
      ctx.fillStyle = i ? P.goldShine : P.lifePale;
      ctx.fillRect(rx - 4 + i * 7, ry - 28 - Math.round(k * 9), 1, 1);
    }
  }

  /* ---------------------------------------------- ground dressing */

  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2;
    if (ob.kind === 0) {              /* screws somebody dropped */
      for (var i = 0; i < ob.seed.length; i++) {
        ctx.fillStyle = P.nailMid;
        ctx.fillRect(x + ob.seed[i][0], y + ob.seed[i][1], 1, 2);
        ctx.fillStyle = P.nailLight;
        ctx.fillRect(x + ob.seed[i][0], y + ob.seed[i][1], 1, 1);
      }
    } else if (ob.kind === 1) {        /* an offcut lying flat */
      ctx.fillStyle = P.lumMid;  ctx.fillRect(x, y + 1, 14, 4);
      ctx.fillStyle = P.lumHi;   ctx.fillRect(x, y + 1, 14, 1);
      ctx.fillStyle = P.lumEnd;  ctx.fillRect(x, y + 1, 2, 4); ctx.fillRect(x + 12, y + 1, 2, 4);
      ctx.fillStyle = P.outline; ctx.fillRect(x, y + 5, 14, 1);
    } else {                           /* a drift of sawdust */
      ctx.fillStyle = P.concDark; ctx.fillRect(x, y + 4, 12, 1);
      ctx.fillStyle = P.sawdust;  ctx.fillRect(x, y + 2, 12, 2);
      ctx.fillStyle = P.plyLit;   ctx.fillRect(x + 2, y + 1, 8, 1);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawSaws(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ------------------------------------------------- the cover art

     The little live window on the level select: 118x114 on the big card,
     82x94 on the side ones. The generic cover is the Coop's shapes, which
     read as neither level, so this paints the yard's own - stucco with its
     shade line, the lid and its cord, leaning plywood, two stacks of
     lumber with a gap, a saw sliding past and the speckled slab. The
     caller has already clipped to the box, so nothing here clips or
     restores. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var slab = y + h - Math.round(h * 0.15);
    var lidY = y + Math.round(h * 0.08);
    var i, u, nx;

    /* 1. the stucco, sun above and shade below a hard line */
    ctx.fillStyle = P.stuccoMid; ctx.fillRect(x, y, w, h);
    Tint.rect(ctx, x, y, w, Math.round(h * 0.5), P.stuccoSun, 4);
    Tint.rect(ctx, x, y + h - 40, w, 40, P.stuccoShade, 4);
    Tint.rect(ctx, x, y + Math.round(h * 0.45), w, h, P.stuccoShade, 2);

    /* 2. the plywood lid, on its steel angle, with the cord slung along it */
    ctx.fillStyle = P.plyMid;    ctx.fillRect(x, y, w, lidY - y);
    ctx.fillStyle = P.plyGrain;  ctx.fillRect(x, y + Math.round((lidY - y) * 0.6), w, 1);
    ctx.fillStyle = P.steelBlack; ctx.fillRect(x, lidY, w, 2);
    for (i = 10; i < w - 10; i++) {
      u = (i - 10) / Math.max(1, w - 20);
      var cy = lidY + 2 + Math.round(Math.sin(u * Math.PI) * 5);
      ctx.fillStyle = P.cord; ctx.fillRect(x + i, cy, 1, 1);
      if (Math.abs(u - 0.5) < 0.04) { ctx.fillStyle = P.cordHi; ctx.fillRect(x + i, cy - 1, 1, 1); }
    }

    /* 2b. stucco tooth. Without it the cover is a flat tan field, and a
       flat field is exactly what a stucco wall must not look like. */
    for (i = 0; i < w * 2; i++) {
      var n = (i * 1103515245 + 12345) >>> 0;
      ctx.fillStyle = (n & 3) ? P.stuccoDark : P.stuccoLit;
      ctx.fillRect(x + (n >>> 9) % w, lidY + 2 + (n >>> 17) % Math.max(1, slab - lidY - 2), 1, 1);
    }

    /* 3. a leaning sheet with a charcoal board in front, drifting slowly.
       Two of them a period apart, so one is always in frame - one sheet
       alone leaves the cover bare for half of its cycle. */
    var sw = Math.round(w * 0.3);
    /* the period is shorter than the window, so one sheet is entering as
       the last one leaves and the wall is never bare */
    var period3 = Math.round(w * 0.8);
    var stop = y + Math.round(h * 0.25);
    var bw = Math.round(w * 0.12), btop = y + Math.round(h * 0.4);
    for (var c3 = 0; c3 < 3; c3++) {
      var sx = Math.round(x + w - mod(s * 0.3, period3)) - c3 * period3;
      if (sx > x + w || sx + sw + 8 < x) continue;
      for (i = 0; slab - i > stop; i++) {
        var off = Math.round(i / Math.max(1, slab - stop) * 6);
        ctx.fillStyle = P.plyLit;  ctx.fillRect(sx + off, slab - i, sw, 1);
        ctx.fillStyle = P.plyMid;  ctx.fillRect(sx + off + sw - 2, slab - i, 2, 1);
        ctx.fillStyle = P.plyEdge; ctx.fillRect(sx + off - 1, slab - i, 1, 1);
        ctx.fillRect(sx + off + sw, slab - i, 1, 1);
      }
      cathedral(ctx, sx + Math.round(sw / 2), slab - Math.round(h * 0.35),
                Math.round(w * 0.06), Math.round(h * 0.16), 1);
      ctx.fillStyle = P.slate;   ctx.fillRect(sx + 4, btop, bw, slab - btop);
      ctx.fillStyle = P.slateHi; ctx.fillRect(sx + 4, btop, 1, slab - btop);
    }

    /* 4. two stacks of lumber with a gap you could fly through */
    var period = big ? 46 : 38;
    var span = slab - lidY;
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - mod(s + i * period, period * 3));
      if (ox < x - 12 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.36);
      var gapY = Math.round(lidY + 4 + ((i * 19) % Math.max(1, span - gapH - 10)));
      stack(ctx, ox, lidY, gapY - lidY);
      stack(ctx, ox, gapY + gapH, slab - gapY - gapH);
    }

    /* 5. the slab, with its white aggregate crawling past */
    ctx.fillStyle = P.concLit; ctx.fillRect(x, slab - 3, w, 3);
    ctx.fillStyle = P.concMid; ctx.fillRect(x, slab, w, y + h - slab);
    Tint.rect(ctx, x, slab, w, y + h - slab, P.concDark, 6);
    ctx.fillStyle = P.concHi;  ctx.fillRect(x, slab, w, 1);
    for (i = 0; i < w / 4; i++) {
      var cx2 = x + ((i * 11 + Math.round(s)) % w);
      ctx.fillStyle = i % 3 ? P.concHi : P.concDark;
      ctx.fillRect(cx2, slab + 2 + (i % 3), 2, 1);
    }

    /* 6. a floor buzzsaw sliding past, its teeth swapping as it turns. It
       goes on AFTER the slab: painted before it, the curb strip buries
       three of the four rows that were meant to show. */
    nx = Math.round(x + w - mod(s + 31, w + 30));
    var half = [[3, 3], [1, 7], [0, 9], [0, 9]];
    var flip = Math.floor(s / 3) % 2;
    for (i = 0; i < half.length; i++) {
      ctx.fillStyle = P.nailMid;
      ctx.fillRect(nx + half[i][0], slab - 4 + i, half[i][1], 1);
    }
    ctx.fillStyle = flip ? P.bladeEdge : P.nailMid; ctx.fillRect(nx + 3, slab - 4, 1, 1);
    ctx.fillStyle = flip ? P.nailMid : P.bladeEdge; ctx.fillRect(nx + 5, slab - 4, 1, 1);
    ctx.fillStyle = P.steelBlack; ctx.fillRect(nx - 2, slab, 13, 2);

    /* 7. a beam coming down */
    var ty = y + 8 + mod(s * 1.6, slab - y - 14);
    ctx.fillStyle = P.lumMid; ctx.fillRect(x + Math.round(w * 0.72), Math.round(ty), 3, 9);
    ctx.fillStyle = P.lumHi;  ctx.fillRect(x + Math.round(w * 0.72), Math.round(ty), 1, 1);

    /* 8. the doodad flying it, with a halo so it does not vanish into the
       stucco the way a tan bird against a tan wall would */
    var dx = Math.round(x + w * 0.3);
    var dy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, dx - sz, dy - sz, sz * 2, sz * 2, P.stuccoShade, 5);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx + sz / 2 - 2, dy - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(dx + sz / 2, dy, 2, 1);

    /* 9. and the warm air over the whole yard */
    Tint.rect(ctx, x, y, w, h, P.sunHaze, 1);
  }

  /* one little lumber stack inside a cover */
  function stack(ctx, x, y, h) {
    if (h <= 0) return;
    ctx.fillStyle = P.lumMid;  ctx.fillRect(x, y, 9, h);
    ctx.fillStyle = P.lumHi;   ctx.fillRect(x + 1, y, 1, h);
    ctx.fillStyle = P.lumDark; ctx.fillRect(x + 7, y, 1, h);
    for (var sy = y + 5; sy < y + h; sy += 5) {
      ctx.fillStyle = P.lumShadow; ctx.fillRect(x, sy, 9, 1);
    }
    ctx.fillStyle = P.steelBlack; ctx.fillRect(x + 3, y, 1, h);
    ctx.fillStyle = P.outline;
    ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 8, y, 1, h);
  }

  /* ---------------------------------------------------- generation */

  function makePillar(x, gapY, gapH) {
    var nails = [];
    for (var i = 0; i < 4; i++) {
      nails.push({ k: rand(0.08, 0.92), side: chance(0.5), len: randInt(3, 5),
                   bent: chance(0.4), rusty: chance(0.4) });
    }
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.35) ? 1 : 0, nails: nails, scored: false };
  }

  /* One blade, or a pair when the engine asks for a big cluster. `count`
     and `maxLen` arrive from tune.spikeChance/spikeCeilMin..Max the same
     way the Coop's nails and the Garden's mint do; here count buys another
     blade rather than another spike, because one blade is 19 to 25px wide
     and six of them would wall the slab off. `len` is how much of the
     diameter shows past the line, capped so a blade never leaves its slot
     entirely - a floating disc has nothing holding it up. */
  function makeSpikes(x, side, count, maxLen) {
    var blades = count >= 5 ? 2 : 1;
    var spikes = [], dx = 0, i;
    for (i = 0; i < blades; i++) {
      var R = chance(0.5) ? 9 : 12;
      var len = clamp(Math.round(rand(maxLen * 0.7, maxLen)), 10, 2 * R - 3);
      spikes.push({ dx: dx, R: R, len: len, phase: rand(0, TAU) });
      dx += 2 * R + randInt(10, 18);
    }
    var last = spikes[spikes.length - 1];
    return { type: 'spike', x: x, side: side, spikes: spikes,
             w: last.dx + last.R * 2 + 2 };
  }

  /* Something off the lid. x and y are its CENTRE, because it falls and
     rocks rather than sitting on a grid.

     Four kinds, one type string: a beam lying down, a beam on end, the
     butane can and the golden gear. `gold` arrives as the fourth argument
     if the engine has already rolled it, and everything that draws or
     collides a gear reads ob.gold rather than the argument - so an engine
     that instead sets the flag after this returns, the way it sets
     plank.meet, gets a gear too. */
  /* The gear's odds live here rather than in the tune, because the ART is
     what has to know: a gear it does not know about keeps a beam's width,
     a beam's fall speed and - worst - a beam's long ground shadow, so the
     player reads an incoming 2x4 and dodges a coin. */
  function makeDrop(x, spicy, fall) {
    var gold = false;
    if (!spicy) {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var ob = { type: 'drop', x: x, y: CEIL + 5, vy: fall,
               spicy: !!spicy, gold: gold, broken: 0,
               spin: rand(0, TAU), spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1),
               w: 13 };
    if (ob.spicy) ob.w = 5;
    else if (ob.gold) {
      /* the gear is the one thing here that is FAST: about 1.5s from the
         lid to the slab against a beam's 2.7s, so catching one is a
         decision and not a formality */
      ob.w = 6;
      ob.vy = fall * 2.2 + 70;
    } else if (chance(0.5)) { ob.dir = 'v'; ob.w = 3; }
    else ob.dir = 'h';
    return ob;
  }

  /* the heart sits on the slab like the Garden's pot, so it publishes no
     `y` and the engine's default grab point is right */
  /* `y` is where it is GRABBED: the engine puts a boon on the floor unless
     the object says otherwise, and this one sits up on its pallet. `name`
     and `burst` are the caption and the particle colours - a heart of scrap
     does not come apart into jade rosette leaves. */
  function makeBoon(x) {
    return { type: 'boon', x: x, y: FLOOR - 17, w: 22, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0,
             name: BOON_NAME,
             burst: [P.copperHi, P.copper, P.lifePale, P.lifeJade] };
  }

  function makeLitter(x) {
    var kind = randInt(0, 2), seed = [];
    if (kind === 0) for (var i = 0; i < 10; i++) seed.push([randInt(0, 16), randInt(0, 4)]);
    return { type: 'litter', x: x, kind: kind, seed: seed, w: 18 };
  }

  /* Collision rectangles in screen space. Every lethal pixel has a box and
     nothing harmless has one: the bracket stubs, the slots, the pallet and
     all the litter are safe to touch. */
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
      /* the nails widen the column by exactly what sticks out, a pixel
         more generously than the art, the way the Garden's thorns do */
      for (i = 0; i < ob.nails.length; i++) {
        var n = ob.nails[i];
        var seg = n.k < 0.5 ? { y: CEIL, h: topH } : { y: botY + 9, h: botH };
        if (seg.h <= 14) continue;
        var ty = seg.y + Math.round(n.k * (seg.h - 10)) + 4;
        if (n.side) out.push([ob.x + ob.w, ty, n.len, 3]);
        else out.push([ob.x - n.len, ty, n.len, 3]);
      }
    } else if (ob.type === 'spike') {
      /* A blade is lethal the whole time any of it shows - the spin is the
         tell, not a timer, so these never change. Two boxes per blade, a
         fat band and a narrower crown, so a round thing is not collided as
         a square, and both sit 2px inside the teeth: a graze on a tooth
         tip is forgiven. */
      var x = Math.round(ob.x);
      for (i = 0; i < ob.spikes.length; i++) {
        var b = ob.spikes[i];
        var cx = x + b.dx + b.R;
        if (ob.side === 'ceil') {
          out.push([cx - b.R + 2, CEIL, b.R * 2 - 3, b.len - 4]);
          out.push([cx - b.R + 6, CEIL + b.len - 4, b.R * 2 - 11, 4]);
        } else {
          out.push([cx - b.R + 2, FLOOR - b.len + 4, b.R * 2 - 3, b.len - 4]);
          out.push([cx - b.R + 6, FLOOR - b.len, b.R * 2 - 11, 4]);
        }
      }
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      /* the two power-ups get generous boxes because catching them is
         meant to be easy; the beams get boxes a pixel tighter than their
         art because dodging them is meant to be fair */
      if (ob.spicy) out.push([ob.x - 5, ob.y - 7, 10, 14]);
      else if (ob.gold) out.push([ob.x - 6, ob.y - 6, 12, 12]);
      else if (ob.dir === 'v') out.push([ob.x - 2, ob.y - 12, 5, 24]);
      else out.push([ob.x - 12, ob.y - 2, 24, 5]);
    } else if (ob.type === 'boon') {
      /* the heart is what you collect, so the box travels with it and the
         pallet it was sitting on has none */
      if (!ob.taken) out.push([ob.x + ob.dx - 9, FLOOR + ob.dy - 27, 18, 19]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    BOON_NAME: BOON_NAME,
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
