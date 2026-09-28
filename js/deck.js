/* ------------------------------------------------------------------
   Land of Doodads - BACKYARD / THE DECK
   A wooden deck with faded, chipped brick-red paint. Behind it a
   weathered tan 2x6 railing on grey posts, then a dark chocolate
   board fence with grey trunks standing against it, then a mass of
   green canopy. On the boards: big dark wicker chairs, a wicker side
   table with a green glass top, a stainless fire pit, a chevron rug,
   split logs. An apple tree hangs overhead. Two bronze patio heaters
   are the pillars; two black riser tubes with brass nozzles are the
   misters, and they come on a timer.

   Same discipline as js/coop.js and js/garden.js: every pixel is
   generated in code and baked into a tile once, and any shade laid
   over something that scrolls is a flat Tint, never a Dither, or it
   boils as it moves. There is not one Dither.rect in this file.

   READABILITY: in the photograph the heaters are near-black bronze and
   the fence and chairs behind them are near-black brown, so a faithful
   pillar would vanish - the Garden's lesson exactly. The housing is
   therefore lifted to a LIT bronze (the photograph's real colour
   survives as its shadow band) and the top column is the heater's
   SILVER mesh emitter, so top halves read against green canopy and
   bottom halves read against dark wicker. The chairs are deliberately
   the darkest mass in the level: they are the dark wall the pillars
   stand against.
------------------------------------------------------------------ */
'use strict';

var Deck = (function () {

  var P = {
    /* air and far trees */
    skyPeek:     '#e9e2c4',   /* flecks of white sky through the canopy */
    sunHaze:     '#efe3b8',   /* warm air under the boughs, and the dapple */
    leafDeep:    '#1c2f18',   /* darkest of the tree mass; the base fill */
    leafDark:    '#284a22',   /* shaded leaf clumps */
    leafMid:     '#3f7030',   /* the body of the canopy */
    leafLight:   '#6f9a3c',   /* lit leaves, and the puff when an apple lets go */
    leafPale:    '#a9cf62',   /* sun-struck leaf tips */
    leafDry:     '#b98a3c',   /* the dead brown leaves hanging in the mass */
    bough:       '#4a3018',   /* the apple branch along the ceiling */
    boughHi:     '#7a5a34',   /* its lit top edge */

    /* the fence and what stands against it */
    trunkDark:   '#4e463c',
    trunkMid:    '#746a5c',
    trunkHi:     '#9c917f',
    fenceDark:   '#3b2515',   /* the darkest fence board */
    fenceMid:    '#4d3220',   /* the usual board */
    fenceLight:  '#5e3f27',   /* a sun-caught board, and the cap rail */
    fenceSeam:   '#241509',   /* between boards; also the overall shade tint */
    bulb:        '#ffd98a',   /* the string lights along the fence top */

    /* the railing */
    railTop:     '#dcb07e',   /* sunlit top face of the 2x6 */
    railMid:     '#bf8656',   /* its front face */
    railDark:    '#8c5a36',   /* its underside and grain */
    postLight:   '#c4b8a0',   /* weathered grey post, lit edge */
    postMid:     '#a39683',
    postDark:    '#6f6353',
    tankLight:   '#d5d7d2',   /* propane tanks behind the rail */
    tankMid:     '#b0b3ae',
    tankDark:    '#7c807c',

    /* the furniture - the darkest mass in the level, on purpose */
    wickerDark:  '#2c1f16',
    wickerMid:   '#4a3626',
    wickerLight: '#6b4f36',
    wickerHi:    '#8a6a4a',
    cushion:     '#3a3532',
    cushionHi:   '#57514c',
    glassTop:    '#5f8a72',   /* the green glass on the side table */
    glassHi:     '#9cc4a8',
    steelDark:   '#5e625e',   /* fire pit shadow side; the emitter's shadow */
    steelMid:    '#9a9d9a',
    steelLight:  '#c9ccc8',   /* stainless lit band; the reflector dish */
    steelHi:     '#eef0ec',
    ash:         '#3a3634',
    rugDark:     '#454a4c',
    rugLight:    '#8d9396',
    rugFringe:   '#b9bdbd',

    /* the deck itself */
    deckRed:     '#a8422f',   /* the paint where it is still on */
    deckRedDark: '#7a2a1c',   /* board underside, grain, damp boards */
    deckRedHi:   '#c9614a',   /* the lit lip of each board, clinging flakes */
    deckBare:    '#c4a97e',   /* bare wood in a chip; also the log ends */
    deckBareDk:  '#8f7452',   /* the shadow inside a chip; log bodies */
    deckGap:     '#2a1610',

    /* the heaters (pillars) */
    bronzeDark:  '#5a3618',   /* the shadow band - the photograph's real colour */
    bronzeMid:   '#8f5c34',   /* housing body, lifted so it reads */
    bronzeLight: '#b57a48',   /* housing lit band; the lid */
    bronzeHi:    '#d9a06a',   /* specular stripe, seam highlights */
    brass:       '#c9a04a',   /* mister nozzles, knobs, valves */
    brassHi:     '#f0d78a',
    hoseBlack:   '#16130f',   /* mister tubes, the gas hose, the supply line */
    hoseHi:      '#3a3630',   /* the lit edge of black rubber */
    label:       '#ece6d8',   /* the housing's warning sticker */
    labelRed:    '#c43a2a',

    /* the mist */
    mist:        '#d8ecef',   /* the jet body */
    mistHi:      '#f6fdff',   /* the core, the priming bead, droplets */
    mistEdge:    '#9cc4cc',   /* the cone's outer columns and the drifting tail */

    /* apples */
    appleDark:   '#5b7f22',
    appleMid:    '#9cbd3e',   /* the yellow-green apple */
    appleHi:     '#c6dc66',
    appleShine:  '#eef7b8',
    appleFlesh:  '#e6e9a8',   /* what a landed apple turns into */
    appleRed:    '#c8382e',   /* the few red ones in the tree */
    appleRedHi:  '#e8705a',
    stem:        '#5a3a1c',
    cinDark:     '#6e2a10',   /* the cinnamon apple's shadow side */
    cinMid:      '#b5532a',   /* cinnamon-dusted skin */
    cinHi:       '#dd8a4a',
    sugar:       '#ffe2b0',   /* sugar sparkle on the cinnamon apple */
    goldDark:    '#a86a10',   /* the golden apple */
    goldMid:     '#e8b52a',
    goldHi:      '#ffe27a',
    goldShine:   '#fff8d0',

    /* the succulent - IDENTICAL to the Garden's, because PlayScene draws
       the HUD life and the save burst in exactly these pigments, so the
       thing sitting on the deck has to be that thing */
    sucDark:     '#2f6b62',
    sucMid:      '#5fae9a',
    sucHi:       '#93d8bd',
    sucTip:      '#e08a9a',
    potDark:     '#7a4430',
    potMid:      '#b76a44',
    potHi:       '#d99a6a',
    potSoil:     '#3a2a18',
    potSoilLt:   '#5a4530',

    /* structure */
    outline:     '#170f0a',
    void:        '#0f0c08'
  };

  var CEIL = 24;
  var FLOOR = 242;
  var END_MIN = 34;        /* shortest heater stub allowed at either end */
  var DROP_GRAV = 34;      /* apples pick up speed like tomatoes */
  var SPLAT_TIME = 1.7;

  /* THE MISTER CLOCK, in pixels of scroll rather than seconds.
     Keyed to distance on purpose: a jet that is on for N px of scroll
     blocks the same fraction of the approach at any speed (including
     spicy's 1.55x), it freezes when the game pauses or the run dies
     because scroll stops, and it cycles slowly on the GET READY screen
     (scroll runs at 0.34 there) so the player watches a full cycle
     before flying into one. 250px is 2.3s at speedStart, 1.4s at
     speedMax - the misters get twitchier as the run does. */
  var MIST_PERIOD = 250;

  /* one green apple in ~33 is golden. It lives here rather than in tune
     because it is the level's look, not its difficulty curve. */
  var GOLD_CHANCE = 0.02;  /* extremely rare, as asked */

  /* the neutral effect colours PlayScene paints out of - see js/coop.js.
     It has no business knowing this level files its pigments under names
     like `deckRedHi` and `mistEdge`, which no other level has. */
  var FX = {
    motes:    '#efe3b8',   motesHi:  '#fff6d6',   /* sun-dapple dust in the air */
    puff:     '#6f9a3c',   puffHi:   '#a9cf62',   /* leaves shaken loose when an apple lets go */
    ground:   '#a8422f',   groundHi: '#d8c39a',   /* red paint chips and pale splinters */
    splat:    '#c9d67a',   splatHi:  '#eef7b8',   /* apple flesh bursting on the boards */
    hot:      '#c8501e',   hotMid:   '#e8843a',  hotHi: '#ffd27a',
    heat:     '#c8501e',   heatEdge: '#7a2410',
    glowCore: '255,210,122', glowEdge: '200,80,30'
  };

  /* the one-off heads up when a hazard arms */
  var WARN = {
    drop:  ['▼ APPLES ▼', 'NOT FAR FROM THE TREE'],
    spike: ['▲ MISTERS ▲', 'ON A TIMER. NOT YOURS.']
  };

  /* the thirteen colours js/scene_levelselect.js paints its generic
     preview window with. The Deck paints its own cover below, but the
     contract publishes these and a future caller may want them. */
  var PREVIEW = {
    back: P.fenceMid, backAlt: P.fenceLight, seam: P.fenceSeam,
    beam: P.bronzeMid, beamDark: P.bronzeDark, beamLight: P.bronzeHi,
    ground: P.deckRed, groundDark: P.deckRedDark, groundHi: P.deckBare,
    spike: P.mist, spikeHi: P.mistHi, air: P.sunHaze, gloom: P.void
  };

  var T = {};              /* baked tiles */

  /* The mister clock's reading, cached by drawBackdrop once a frame.
     collide() runs before drawBg, so rectsFor is one frame stale: under
     3px of scroll at top speed, well inside the windows below. */
  var mistScroll = 0;

  /* ------------------------------------------------------- utilities */

  /* a positive modulo, for scrolling things backwards in the preview */
  function wrap(v, m) { return ((v % m) + m) % m; }

  /* an integer hash: the mister's droplets shimmer off this rather than
     off Math.random, so a paused frame redrawn twice looks the same */
  function hash(n) {
    n = (n ^ 61) ^ (n >>> 16);
    n = n + (n << 3);
    n = n ^ (n >>> 4);
    n = Math.imul(n, 0x27d4eb2d);
    n = n ^ (n >>> 15);
    return n >>> 0;
  }

  /* a single 5x3 leaf, pointing left or right (the Garden's helper - the
     canopy and the boughs are made of a great many of these). `dir` picks
     which end carries the dark tip. */
  function leaf(c, x, y, colour, dir) {
    c.fillStyle = colour;
    c.fillRect(x, y + 1, 5, 1);
    c.fillRect(x + 1, y, 3, 1);
    c.fillRect(x + 1, y + 2, 3, 1);
    c.fillStyle = P.leafDark;
    c.fillRect(x + (dir > 0 ? 4 : 0), y + 1, 1, 1);
  }

  /* -------------------------------------------------- the canopy tile

     The tree mass behind everything. Leaves are 7x4 blobs rather than
     single pixels: a canopy of one-pixel speckle read as static, and the
     blobs give the mass a grain that survives being scrolled at 0.10. */

  function clump(c, x, y, col) {
    var rows = [[1, 5], [0, 7], [0, 7], [1, 5]];
    c.fillStyle = col;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0], y + i, rows[i][1], 1);
    /* a shadow row underneath, so clumps stack instead of merging */
    c.fillStyle = P.leafDeep;
    c.fillRect(x, y + 4, 7, 1);
  }

  /* the light falls off with depth, so the top of the canopy is lit and
     the bottom of it is the dark the pillars' emitters read against */
  function clumpTone(y, v) {
    if (y < 50) return v < 0.20 ? P.leafLight : (v < 0.65 ? P.leafMid : P.leafDark);
    if (y < 100) return v < 0.10 ? P.leafLight : (v < 0.50 ? P.leafMid : P.leafDark);
    return v < 0.25 ? P.leafMid : P.leafDark;
  }

  function bakeCanopy() {
    var W = 256, H = 150;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(1103);

    c.fillStyle = P.leafDeep;
    c.fillRect(0, 0, W, H);

    /* white sky through the gaps, top rows only and left of centre -
       the sun is in the upper left of both photographs */
    for (var s = 0; s < 14; s++) {
      c.fillStyle = P.skyPeek;
      c.fillRect(Math.floor(r() * 180), Math.floor(r() * 28), 2, 1);
    }

    for (var i = 0; i < 260; i++) {
      var x = Math.floor(r() * (W + 8)) - 4;
      var y = Math.floor(r() * (H - 4));
      clump(c, x, y, clumpTone(y, r()));
    }

    /* sun hits on the outermost leaves */
    for (var k = 0; k < 14; k++) {
      c.fillStyle = P.leafPale;
      c.fillRect(Math.floor(r() * W), 10 + Math.floor(r() * 50), 3, 2);
    }
    /* the dead brown leaves that are always hanging in a tree like this */
    for (var d = 0; d < 10; d++) {
      c.fillStyle = P.leafDry;
      c.fillRect(Math.floor(r() * W), Math.floor(r() * (H - 2)), 3, 2);
    }
    return t;
  }

  /* --------------------------------------------------- the fence tile

     Transparent above the cap rail, so the canopy shows through it. The
     trunks are baked into this layer rather than their own: they stand
     ON the fence in the photograph, and one layer is one drawImage. */

  function trunk(c, x, w, top) {
    c.fillStyle = P.trunkMid;  c.fillRect(x, top, w, 242 - top);
    c.fillStyle = P.trunkHi;   c.fillRect(x, top, 2, 242 - top);
    c.fillStyle = P.trunkDark; c.fillRect(x + w - 3, top, 3, 242 - top);
    c.fillStyle = P.outline;
    c.fillRect(x - 1, top, 1, 242 - top);
    c.fillRect(x + w, top, 1, 242 - top);
    /* bark: short dark dashes, never a full ring, or it reads as bamboo */
    for (var y = top + 4; y < 242; y += 9) {
      c.fillStyle = P.trunkDark;
      c.fillRect(x + 2 + ((y / 9) % 2 ? 1 : 3), y, 1, 3);
    }
    /* one branch leaning up and left, into the canopy */
    for (var b = 0; b < 18; b++) {
      c.fillStyle = b > 12 ? P.trunkDark : P.trunkMid;
      c.fillRect(x - b, top + 14 - Math.round(b * 0.55), 2, 2);
    }
  }

  function bakeFence() {
    var W = 208, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(3131);
    var tones = [P.fenceDark, P.fenceMid, P.fenceMid, P.fenceLight];

    /* vertical boards, from the cap rail down to the deck */
    var x = 0;
    while (x < W) {
      var bw = 9 + Math.floor(r() * 5);
      if (x + bw > W) bw = W - x;
      c.fillStyle = tones[Math.floor(r() * tones.length)];
      c.fillRect(x, 111, bw, 242 - 111);
      c.fillStyle = P.fenceSeam;
      c.fillRect(x, 111, 1, 242 - 111);
      if (r() < 0.3) { c.fillStyle = P.fenceLight; c.fillRect(x + 1, 111, 1, 242 - 111); }
      var knots = Math.floor(r() * 3);
      for (var k = 0; k < knots; k++) {
        c.fillStyle = P.fenceSeam;
        c.fillRect(x + 2 + Math.floor(r() * Math.max(1, bw - 5)), 120 + Math.floor(r() * 110), 2, 2);
      }
      /* the two nails every board in the photograph is held on with */
      c.fillStyle = P.bronzeDark;
      c.fillRect(x + (bw >> 1), 140, 1, 1);
      c.fillRect(x + (bw >> 1), 200, 1, 1);
      x += bw;
    }

    /* the cap rail the boards stop under */
    c.fillStyle = P.fenceLight; c.fillRect(0, 108, W, 3);
    c.fillStyle = P.fenceSeam;  c.fillRect(0, 111, W, 1);

    /* the string of tiny lights, sagging 4px between hooks */
    for (var i = 0; i < 18; i++) {
      var bx = 6 + i * 11;
      var by = 114 + Math.round(Math.sin((i % 6) / 5 * Math.PI) * 4);
      Tint.rect(c, bx - 1, by - 1, 3, 3, P.sunHaze, 3);
      c.fillStyle = P.bulb;
      c.fillRect(bx, by, 1, 1);
    }

    trunk(c, 44, 12, 56);
    trunk(c, 156, 9, 72);

    /* dapple, and the shade that lives under the rail and behind the
       chairs. source-atop so the transparent sky above the fence stays
       transparent - a flat Tint over the whole tile would fill it in. */
    c.globalCompositeOperation = 'source-atop';
    for (var d = 0; d < 5; d++) {
      Tint.rect(c, Math.floor(r() * (W - 12)), 115 + Math.floor(r() * 65), 12, 8, P.sunHaze, 4);
    }
    Tint.rect(c, 0, 190, W, 52, P.void, 5);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ---------------------------------------------------- the rail tile */

  function propaneTank(c, x, y) {
    c.fillStyle = P.outline;   c.fillRect(x - 1, y - 1, 18, 24);
    c.fillStyle = P.tankMid;   c.fillRect(x, y, 16, 22);
    c.fillStyle = P.tankLight; c.fillRect(x + 2, y, 3, 22);
    c.fillStyle = P.tankDark;  c.fillRect(x + 11, y, 3, 22);
    c.fillStyle = P.tankDark;  c.fillRect(x + 4, y - 2, 8, 3);   /* the collar */
    c.fillStyle = P.brass;     c.fillRect(x + 7, y - 4, 2, 2);   /* the valve */
    c.fillStyle = P.tankDark;  c.fillRect(x, y + 6, 16, 1);      /* the weld ring */
  }

  function post(c, x, w) {
    c.fillStyle = P.outline;   c.fillRect(x, 155, 1, 87); c.fillRect(x + w - 1, 155, 1, 87);
    c.fillStyle = P.postMid;   c.fillRect(x + 1, 155, w - 2, 87);
    c.fillStyle = P.postLight; c.fillRect(x + 1, 155, 2, 87);
    c.fillStyle = P.postDark;  c.fillRect(x + 5, 155, 2, 87);
    c.fillStyle = P.railDark;  c.fillRect(x + 1, 156, w - 2, 1);  /* the rail's shadow */
    c.fillStyle = P.postDark;
    c.fillRect(x + 3, 174, 1, 4);
    c.fillRect(x + 4, 208, 1, 4);
  }

  function bakeRail() {
    var W = 192, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2020);

    /* the tanks go down first: they stand BEHIND the rail */
    propaneTank(c, 52, 220);
    propaneTank(c, 70, 220);

    /* the 2x6 top rail: sunlit top face, tan front face, dark underside */
    c.fillStyle = P.outline; c.fillRect(0, 148, W, 1);
    c.fillStyle = P.railTop; c.fillRect(0, 149, W, 2);
    c.fillStyle = P.railMid; c.fillRect(0, 151, W, 3);
    c.fillStyle = P.railDark; c.fillRect(0, 154, W, 1);
    c.fillStyle = P.outline; c.fillRect(0, 155, W, 1);
    for (var g = 0; g < 24; g++) {
      c.fillStyle = P.railDark;
      c.fillRect(Math.floor(r() * W), 151 + Math.floor(r() * 3), 4 + Math.floor(r() * 6), 1);
    }

    [24, 120].forEach(function (px) {
      post(c, px, 8);
      /* a fleck of sun on the rail beside each post */
      c.fillStyle = P.railTop;
      c.fillRect(px + 9, 151, 3, 1);
    });
    return t;
  }

  /* ----------------------------------------------- the furniture tile

     The chairs are the darkest mass in the level and the whole reason
     the heaters had to be lifted to a lit bronze. Everything here is
     baked, so the weave can be as fussy as it likes: the tile moves as
     a unit, which is the only reason a pattern this fine is allowed. */

  function weave(c, x, y, w, h) {
    c.fillStyle = P.wickerMid;
    c.fillRect(x, y, w, h);
    for (var row = 0; row < h; row++) {
      if (row % 2 === 0) {
        /* the over-strands, stepped so the weave never lines up into stripes */
        var off = (row / 2) % 5;
        for (var dx = -off; dx < w; dx += 5) {
          var sx = x + Math.max(0, dx);
          var sw = Math.min(3 + Math.min(0, dx), x + w - sx);
          if (sw <= 0) continue;
          c.fillStyle = P.wickerLight;
          c.fillRect(sx, y + row, sw, 1);
          if (wrap(dx + row, 9) === 0) {
            c.fillStyle = P.wickerHi;
            c.fillRect(sx, y + row, 1, 1);
          }
        }
      } else {
        c.fillStyle = P.wickerDark;
        for (var ox = 0; ox < w; ox += 3) c.fillRect(x + ox, y + row, 1, 1);
      }
    }
    c.fillStyle = P.outline;
    c.fillRect(x, y, w, 1); c.fillRect(x, y + h - 1, w, 1);
    c.fillRect(x, y, 1, h); c.fillRect(x + w - 1, y, 1, h);
  }

  /* `back` lowers everything by a few pixels, which is how the second
     chair sits a little further into the picture without a second recipe */
  function chair(c, x, feet, back) {
    var d = back || 0;

    weave(c, x + 16, feet - 100 + d, 60, 58 - d);          /* the back */

    [x, x + 76].forEach(function (ax) {                    /* the square flat arms */
      weave(c, ax, feet - 76 + d, 16, 48 - d);
      c.fillStyle = P.wickerHi;
      c.fillRect(ax + 1, feet - 76 + d, 14, 2);            /* the arm's top face */
    });

    c.fillStyle = P.cushion;                                /* the back cushion */
    c.fillRect(x + 20, feet - 78 + d, 52, 30);
    c.fillStyle = P.cushionHi;
    c.fillRect(x + 20, feet - 78 + d, 52, 1);
    c.fillRect(x + 45, feet - 77 + d, 1, 28);              /* the seam down its middle */

    c.fillStyle = P.cushion;                                /* the seat cushion */
    c.fillRect(x + 16, feet - 42 + d, 60, 12);
    c.fillStyle = P.cushionHi;
    c.fillRect(x + 16, feet - 42 + d, 60, 1);

    [x + 2, x + 86].forEach(function (lx) {                 /* the legs */
      c.fillStyle = P.outline;    c.fillRect(lx - 1, feet - 28, 6, 28);
      c.fillStyle = P.wickerDark; c.fillRect(lx, feet - 28, 4, 28);
    });

    /* the dark line under each arm, which is what tells you the arm is
       a slab in front of the seat rather than part of the weave */
    c.fillStyle = P.wickerDark;
    c.fillRect(x + 16, feet - 76 + d, 1, 48 - d);
    c.fillRect(x + 75, feet - 76 + d, 1, 48 - d);
  }

  function sideTable(c, x) {
    weave(c, x, 207, 36, 34);
    c.fillStyle = P.glassTop; c.fillRect(x - 1, 205, 38, 4);
    c.fillStyle = P.glassHi;  c.fillRect(x + 1, 205, 30, 1);
    c.fillStyle = P.outline;
    c.fillRect(x - 1, 204, 38, 1); c.fillRect(x - 1, 209, 38, 1);
    c.fillRect(x - 2, 205, 1, 4);  c.fillRect(x + 37, 205, 1, 4);
  }

  function firePit(c, x) {
    var y = 205;
    c.fillStyle = P.outline;    c.fillRect(x - 1, y - 1, 42, 38);
    c.fillStyle = P.steelMid;   c.fillRect(x, y, 40, 36);
    c.fillStyle = P.steelLight; c.fillRect(x + 4, y, 5, 36);
    c.fillStyle = P.steelDark;  c.fillRect(x + 30, y, 6, 36);
    /* the mouth, and the ash sitting in it */
    c.fillStyle = P.steelDark;  c.fillRect(x, y, 40, 4);
    c.fillStyle = P.ash;        c.fillRect(x + 5, y + 1, 30, 2);
    /* the rim below the mouth, which is where the stainless catches light.
       The brief put it on the mouth's own top row, where the dark mouth
       drawn afterwards buried it. */
    c.fillStyle = P.steelHi;    c.fillRect(x + 1, y + 4, 38, 1);
    c.fillStyle = P.steelDark;  c.fillRect(x, y + 7, 40, 1);
    /* the Solo stove's ring of holes round the bottom */
    c.fillStyle = P.ash;
    for (var i = 0; i < 10; i++) c.fillRect(x + 2 + i * 4, y + 31, 1, 1);
  }

  function logPile(c, x) {
    [[x, 236], [x + 18, 236], [x + 9, 231]].forEach(function (p) {
      c.fillStyle = P.deckBareDk; c.fillRect(p[0], p[1], 16, 5);
      c.fillStyle = P.fenceDark;  c.fillRect(p[0], p[1], 16, 1);   /* bark along the top */
      c.fillStyle = P.fenceDark;  c.fillRect(p[0] + 11, p[1], 6, 6);
      c.fillStyle = P.deckBare;   c.fillRect(p[0] + 12, p[1] + 1, 4, 4);  /* the end grain */
    });
  }

  function bakeFurniture() {
    var W = 400, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2626);

    chair(c, 24, 241, 0);
    chair(c, 268, 241, 4);
    sideTable(c, 160);
    firePit(c, 206);
    logPile(c, 352);

    /* both photographs are all dappled light, and then the whole layer
       steps back one notch so the heaters stay in front of it */
    c.globalCompositeOperation = 'source-atop';
    for (var d = 0; d < 6; d++) {
      Tint.rect(c, Math.floor(r() * (W - 14)), 150 + Math.floor(r() * 80), 14, 8, P.sunHaze, 5);
    }
    Tint.rect(c, 0, 0, W, H, P.void, 3);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* -------------------------------------------------- the boughs tile

     The ceiling: apple branches with fruit hanging off them, and the
     black supply line the ceiling misters are plumbed into. The bottom
     rows are deliberately ragged so the ceiling never reads as a ruled
     edge across the screen. */

  function bakeBoughs() {
    var W = 192, H = CEIL;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(4410);

    c.fillStyle = P.leafDeep;
    c.fillRect(0, 0, W, H);
    for (var i = 0; i < 110; i++) {
      var v = r();
      var col = v < 0.45 ? P.leafDark : (v < 0.80 ? P.leafMid : (v < 0.95 ? P.leafLight : P.leafPale));
      leaf(c, Math.floor(r() * W), Math.floor(r() * 20), col, v < 0.5 ? 1 : -1);
    }

    /* the bough itself, wobbling a pixel either way so it is a branch
       and not a beam */
    for (var x = 0; x < W; x++) {
      var wob = Math.round(Math.sin(x * 0.05));
      c.fillStyle = P.bough;   c.fillRect(x, 13 + wob, 1, 3);
      c.fillStyle = P.boughHi; c.fillRect(x, 13 + wob, 1, 1);
    }
    [40, 130].forEach(function (tx) {
      c.fillStyle = P.bough;
      c.fillRect(tx, 15, 1, 6);
    });

    /* the mister supply line runs the length of the ceiling, and the
       ceiling misters hang off its brass tees - which is why they belong */
    c.fillStyle = P.hoseBlack;
    c.fillRect(0, 21, W, 1);

    /* five apples hanging off the bough's underside; one of them is red */
    [18, 58, 96, 132, 170].forEach(function (ax) {
      var red = ax === 132;
      c.fillStyle = P.outline;
      c.fillRect(ax, 22, 5, 1);
      c.fillRect(ax - 1, 18, 1, 3); c.fillRect(ax + 5, 18, 1, 3);
      c.fillStyle = P.stem;      c.fillRect(ax + 2, 16, 1, 1);
      c.fillStyle = red ? P.appleRed : P.appleMid;   c.fillRect(ax, 17, 5, 5);
      c.fillStyle = red ? P.appleRedHi : P.appleHi;  c.fillRect(ax + 1, 17, 2, 1);
      c.fillStyle = red ? P.cinDark : P.appleDark;   c.fillRect(ax + 3, 21, 2, 1);
    });

    [64, 160].forEach(function (tx) {
      c.fillStyle = P.brass;
      c.fillRect(tx, 20, 2, 2);
    });

    /* leaf tips poking below the line, so the ceiling's edge is broken up */
    for (var k = 0; k < 18; k++) {
      c.fillStyle = r() < 0.5 ? P.leafMid : P.leafLight;
      c.fillRect(Math.floor(r() * W), 21, 1, 1 + Math.floor(r() * 3));
    }
    return t;
  }

  /* --------------------------------------------------- the floor tile

     Four boards running left-right along the scroll, and the level's
     signature: the paint coming off in chips. Every chip is bare wood
     with a shadow on one side and a lifted lip of red on the other, so
     the deck reads as painted-and-failing rather than as two colours. */

  function chipPaint(c, x, y, w, h) {
    c.fillStyle = P.deckBare;   c.fillRect(x, y, w, h);
    c.fillStyle = P.deckBareDk; c.fillRect(x, y + h - 1, w, 1); c.fillRect(x + w - 1, y, 1, h);
    c.fillStyle = P.deckRedDark; c.fillRect(x, y, 1, h);
  }

  /* the grey chevron rug. The chevrons are a 0..6..0 triangle read off
     x, which is a pattern baked into the tile - not a Dither, so it
     travels with the boards instead of boiling against them. */
  function rug(c, x0, w) {
    c.fillStyle = P.rugDark;
    c.fillRect(x0, 1, w, 27);
    for (var x = 0; x < w; x++) {
      var v = Math.abs((x % 12) - 6);
      c.fillStyle = P.rugLight;
      for (var r = 0; r < 4; r++) c.fillRect(x0 + x, 1 + r * 7 + (v >> 1), 1, 3);
    }
    c.fillStyle = P.rugFringe;
    for (var y = 1; y < 27; y += 2) { c.fillRect(x0, y, 1, 1); c.fillRect(x0 + w - 1, y, 1, 1); }
    c.fillStyle = P.rugDark;
    c.fillRect(x0, 27, w, 1);
  }

  function bakeDeck() {
    var W = 224, H = VH - FLOOR;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2718);

    for (var b = 0; b < 4; b++) {
      var y = b * 7;
      c.fillStyle = P.deckRed;     c.fillRect(0, y, W, 7);
      c.fillStyle = P.deckRedHi;   c.fillRect(0, y, W, 1);
      c.fillStyle = P.deckRedDark; c.fillRect(0, y + 6, W, 1);
    }
    c.fillStyle = P.deckGap;
    [6, 13, 20].forEach(function (gy) { c.fillRect(0, gy, W, 1); });
    /* staggered end joints, the way a real deck's boards are laid */
    c.fillRect(96, 0, 1, 7);  c.fillRect(96, 14, 1, 7);
    c.fillRect(170, 7, 1, 7); c.fillRect(170, 21, 1, 7);

    for (var g = 0; g < 30; g++) {
      c.fillStyle = P.deckRedDark;
      c.fillRect(Math.floor(r() * W), 1 + Math.floor(r() * 26), 3 + Math.floor(r() * 6), 1);
    }

    for (var k = 0; k < 16; k++) {
      var cw = 3 + Math.floor(r() * 8);
      var chh = 1 + Math.floor(r() * 3);
      var cx = Math.floor(r() * (W - cw));
      var cy = 1 + Math.floor(r() * (H - chh - 2));
      chipPaint(c, cx, cy, cw, chh);
      /* a quarter of them still have a flake of paint clinging on */
      if (k < 4) { c.fillStyle = P.deckRedHi; c.fillRect(cx + 1, cy, 1, 1); }
    }

    /* the rug starts at row 1, which leaves row 0 as deckRedHi across the
       whole tile so the deck's lit lip line is never broken */
    rug(c, 128, 80);
    return t;
  }

  /* ---------------------------------------------- the heater columns

     The bottom column is the heater's bronze tank housing; the top one
     is its silver mesh burner emitter. Two materials, one against the
     dark furniture and one against the green canopy, which is the only
     way a pillar this tall reads over its whole length. */

  function bakeHousing(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(700 + variant * 53);

    c.fillStyle = P.bronzeMid;   c.fillRect(0, 0, W, H);
    c.fillStyle = P.bronzeLight; c.fillRect(2, 0, 5, H);
    c.fillStyle = P.bronzeHi;    c.fillRect(3, 0, 2, H);
    c.fillStyle = P.bronzeDark;  c.fillRect(25, 0, 7, H);
    c.fillStyle = P.outline;     c.fillRect(0, 0, 2, H); c.fillRect(32, 0, 2, H);

    /* the panel seams the housing is rolled from */
    for (var y = 0; y < H; y += 21) {
      c.fillStyle = P.bronzeDark; c.fillRect(2, y, 30, 1);
      c.fillStyle = P.bronzeHi;   c.fillRect(2, y + 1, 30, 1);
    }
    /* the row of vent slots */
    for (var i = 0; i < 6; i++) {
      c.fillStyle = P.outline;
      c.fillRect(6 + i * 4, 52, 2, 1);
    }
    /* hammered bronze: specks, half lit and half in shadow */
    for (var k = 0; k < 20; k++) {
      c.fillStyle = k % 2 ? P.bronzeHi : P.bronzeDark;
      c.fillRect(6 + Math.floor(r() * 19), Math.floor(r() * H), 1, 1);
    }
    if (variant === 1) {
      /* the warning sticker nobody ever peels off */
      c.fillStyle = P.label;    c.fillRect(12, 28, 10, 7);
      c.fillStyle = P.labelRed; c.fillRect(12, 28, 10, 2);
      c.fillStyle = P.outline;  c.fillRect(13, 32, 6, 1); c.fillRect(13, 34, 6, 1);
    }
    return t;
  }

  function bakeEmitter() {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(811);

    c.fillStyle = P.steelMid;   c.fillRect(0, 0, W, H);
    c.fillStyle = P.steelLight; c.fillRect(2, 0, 4, H);
    c.fillStyle = P.steelHi;    c.fillRect(3, 0, 1, H);
    c.fillStyle = P.steelDark;  c.fillRect(26, 0, 6, H);
    c.fillStyle = P.outline;    c.fillRect(0, 0, 2, H); c.fillRect(32, 0, 2, H);

    /* the burner mesh: dots on a 3px grid, every other row shifted, which
       is what makes it a mesh rather than a dotted grid */
    for (var y = 0; y < H; y++) {
      if (y % 3) continue;
      var off = (y / 3) % 2;
      c.fillStyle = P.steelDark;
      for (var x = 2 + off; x < 32; x += 3) c.fillRect(x, y, 1, 1);
    }
    /* the mesh catches the light down the lit band only */
    c.fillStyle = P.steelHi;
    for (var ly = 0; ly < H; ly += 6) c.fillRect(4, ly, 1, 1);
    /* weld spatter, so the mesh is not perfectly regular */
    for (var k = 0; k < 14; k++) {
      c.fillStyle = k % 2 ? P.steelHi : P.steelDark;
      c.fillRect(6 + Math.floor(r() * 19), Math.floor(r() * H), 1, 1);
    }
    /* two rings: they make it a cylinder of mesh rather than a grey slab */
    [0, 32].forEach(function (ry) {
      c.fillStyle = P.steelLight; c.fillRect(2, ry, 30, 2);
      c.fillStyle = P.outline;    c.fillRect(2, ry + 2, 30, 1);
    });
    return t;
  }

  /* --------------------------------------------------------- the fruit */

  var APPLE_ROWS = [[2, 5], [1, 7], [0, 9], [0, 9], [0, 9], [0, 9], [1, 7], [2, 5]];

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

  /* the green apple: the hazard. The leaf is what says apple rather than
     tomato, and it is the only reason an 11px ball reads as fruit. */
  function bakeApple() {
    var t = makeCanvas(11, 11), c = t.ctx;
    rowsOutline(c, APPLE_ROWS, 1, 2, P.outline);
    rowsFill(c, APPLE_ROWS, 1, 2, P.appleMid);
    c.fillStyle = P.appleHi;
    c.fillRect(2, 3, 5, 1); c.fillRect(2, 4, 3, 2); c.fillRect(2, 6, 2, 1);
    c.fillStyle = P.appleShine;
    c.fillRect(3, 3, 3, 1); c.fillRect(2, 4, 2, 1);
    c.fillStyle = P.appleDark;
    c.fillRect(7, 5, 2, 1); c.fillRect(7, 6, 2, 1);
    c.fillRect(6, 7, 2, 1); c.fillRect(5, 8, 2, 1);
    c.fillStyle = P.outline;   c.fillRect(5, 2, 1, 1);            /* the dimple */
    c.fillStyle = P.stem;      c.fillRect(5, 0, 1, 2);
    c.fillStyle = P.appleDark; c.fillRect(6, 1, 2, 1);            /* the leaf */
    c.fillStyle = P.appleHi;   c.fillRect(7, 1, 1, 1);
    return t;
  }

  /* the cinnamon apple: the hot power-up, dusted with sugar */
  function bakeCinnamon() {
    var t = makeCanvas(11, 12), c = t.ctx;
    rowsOutline(c, APPLE_ROWS, 1, 3, P.outline);
    rowsFill(c, APPLE_ROWS, 1, 3, P.cinMid);
    c.fillStyle = P.cinHi;
    c.fillRect(2, 4, 4, 1); c.fillRect(2, 5, 2, 2);
    c.fillStyle = P.cinDark;
    c.fillRect(7, 6, 2, 1); c.fillRect(7, 7, 2, 1);
    c.fillRect(6, 8, 2, 1); c.fillRect(5, 9, 2, 1);
    c.fillStyle = P.sugar;
    [[3, 5], [6, 4], [8, 6], [4, 8], [7, 9], [2, 7], [5, 6]].forEach(function (p) {
      c.fillRect(p[0], p[1], 1, 1);
    });
    c.fillStyle = P.stem;    c.fillRect(5, 1, 1, 2);
    c.fillStyle = P.brass;   c.fillRect(6, 2, 3, 1);              /* the cinnamon stick */
    c.fillStyle = P.brassHi; c.fillRect(6, 2, 1, 1);
    return t;
  }

  /* the golden apple: +5, and it falls twice as fast as the rest */
  function bakeGolden() {
    var t = makeCanvas(11, 11), c = t.ctx;
    rowsOutline(c, APPLE_ROWS, 1, 2, P.outline);
    rowsFill(c, APPLE_ROWS, 1, 2, P.goldMid);
    c.fillStyle = P.goldHi;
    c.fillRect(2, 3, 5, 1); c.fillRect(2, 4, 3, 2); c.fillRect(2, 6, 2, 1);
    c.fillStyle = P.goldShine;
    c.fillRect(3, 3, 3, 1); c.fillRect(2, 4, 1, 1);
    c.fillStyle = P.goldDark;
    c.fillRect(7, 5, 2, 1); c.fillRect(7, 6, 2, 1);
    c.fillRect(6, 7, 2, 1); c.fillRect(5, 8, 2, 1);
    c.fillStyle = P.goldDark; c.fillRect(5, 0, 1, 2);
    c.fillStyle = P.goldHi;   c.fillRect(6, 1, 2, 1);
    return t;
  }

  /* -------------------------------------------------- the windfall

     What is already lying on the boards, and the one fruit in this level
     that is NOT a thing to fly into. Three tells say "live apple" here -
     a round symmetric silhouette, a shine on the upper-left shoulder and
     a closed outline ring - and the windfall is built to have none of
     them: wider than it is tall, flat-bottomed, widest at the base, with
     its top shoulder off-centre so it slumps to one side, and no ring at
     all bar the contact shadow. That missing ring is most of what reads
     as debris. Its pigments are the apple's SHADE and the level's own
     dead-leaf tan going to a bruise, never appleHi or appleShine, and
     the stalk lies flat, because an apple on the ground is on its side.

     Baked once, drawn as one drawImage: it scrolls with the deck and
     there is nothing per-frame in it to boil. */

  var WINDFALL = [
    /* "gone soft": green on the left, tan through the middle, bruised
       boughHi on the lower right where it hit - it browns to the colour
       of its own tree's wood. The single M at (1,1) is the last patch of
       skin that has not turned. */
    ['..AAA...',
     '.MAAATT.',
     'AAATTTBS',
     'AATTBBB.',
     '.OOOOOOO'],
    /* "something got to it": the right shoulder is gone in a step, taken
       from above, and the cut face is drying out - fresh flesh at the
       top, brown at the bottom where it has been open longest. */
    ['..AA....',
     '.AAAFF..',
     'AAATFOC.',
     'AATTKKK.',
     '.OOOOOOO']
  ];

  var WINDFALL_INK = {
    A: P.appleDark,    /* the body: the apple's shadow colour, not its face */
    M: P.appleMid,     /* one pixel of unbruised skin, and never more */
    T: P.leafDry,      /* the skin browning off */
    B: P.boughHi,      /* the bruise on the side it landed on */
    S: P.stem,         /* the stalk, flat out of the side, no leaf */
    F: P.appleFlesh,   /* the bite: fresh flesh at the top of the cut */
    C: P.deckBare,     /* the same flesh, browning */
    K: P.deckBareDk,   /* the same flesh, gone brown */
    O: P.outline       /* the contact shadow row, and one pip */
  };

  function bakeWindfall(rows) {
    var t = makeCanvas(8, 5), c = t.ctx;
    for (var y = 0; y < rows.length; y++) {
      for (var x = 0; x < rows[y].length; x++) {
        var ink = WINDFALL_INK[rows[y].charAt(x)];
        if (!ink) continue;
        c.fillStyle = ink;
        c.fillRect(x, y, 1, 1);
      }
    }
    return t;
  }

  /* ------------------------------------------------- the succulent

     The Garden's pot and rosette, unchanged, sharing one 20x20
     coordinate space: drawing both at the same origin reassembles the
     picture, and Gerald's hunger can lift the rosette out and leave the
     pot standing. PlayScene draws the HUD life and the save burst in
     these exact pigments, so it has to be this plant and not another. */

  function bakePot() {
    var t = makeCanvas(20, 20), c = t.ctx;
    c.fillStyle = P.outline; c.fillRect(4, 11, 12, 9);
    c.fillStyle = P.potMid;  c.fillRect(5, 12, 10, 7);
    c.fillStyle = P.potHi;   c.fillRect(5, 12, 10, 2);
    c.fillStyle = P.potDark; c.fillRect(5, 17, 10, 2);
    c.fillStyle = P.outline; c.fillRect(4, 11, 12, 1); c.fillRect(6, 19, 8, 1);
    c.fillStyle = P.potHi;   c.fillRect(6, 12, 8, 1);
    c.fillStyle = P.potSoil; c.fillRect(6, 13, 8, 1);
    /* the one deck detail: a saucer, because a pot on painted boards has
       one or it stains them */
    c.fillStyle = P.outline; c.fillRect(3, 18, 1, 1); c.fillRect(16, 18, 1, 1);
    c.fillStyle = P.potHi;   c.fillRect(4, 18, 12, 1);
    c.fillStyle = P.outline; c.fillRect(3, 19, 14, 1);
    return t;
  }

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

  /* ------------------------------------------------------------ build */

  function build() {
    T.canopy    = bakeCanopy();       /* 256x150 tree mass              0.10 */
    T.fence     = bakeFence();        /* 208xVH  boards, lights, trunks 0.22 */
    T.rail      = bakeRail();         /* 192xVH  tanks, 2x6, posts      0.42 */
    T.furniture = bakeFurniture();    /* 400xVH  chairs, table, pit     0.60 */
    T.boughs    = bakeBoughs();       /* 192x24  the apple bough     ceiling */
    T.deck      = bakeDeck();         /* 224x28  boards, chips, rug     floor */
    T.housing   = [bakeHousing(0), bakeHousing(1)];
    T.emitter   = bakeEmitter();
  }

  function buildSprites() {
    T.apple    = bakeApple();
    T.cinnamon = bakeCinnamon();
    T.golden   = bakeGolden();
    T.windfall = [bakeWindfall(WINDFALL[0]), bakeWindfall(WINDFALL[1])];
    T.pot      = bakePot();
    T.rosette  = bakeRosette();
  }

  /* ---------------------------------------------------------- drawing */

  function drawBackdrop(ctx, scroll) {
    /* the misters' clock, read once a frame. See MIST_PERIOD. */
    mistScroll = scroll;

    ctx.fillStyle = P.leafDeep;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.canopy.canvas, scroll * 0.10, 0);
    tileX(ctx, T.fence.canvas, scroll * 0.22, 0);
    tileX(ctx, T.rail.canvas, scroll * 0.42, 0);
    tileX(ctx, T.furniture.canvas, scroll * 0.60, 0);
    /* the warm shade the whole yard sits in, brighter up under the boughs */
    Tint.rect(ctx, 0, 0, VW, VH, P.fenceSeam, 3);
    Tint.rect(ctx, 0, CEIL, VW, 60, P.sunHaze, 2);
    Tint.rect(ctx, 0, FLOOR - 70, VW, 70, P.void, 4);
    Tint.rect(ctx, 0, CEIL, 46, FLOOR - CEIL, P.void, 4);
    Tint.rect(ctx, VW - 46, CEIL, 46, FLOOR - CEIL, P.void, 4);
  }

  /* A calm room for the UI to sit in front of - the Coop's reasoning.
     No rail and no furniture: a menu does not need a fire pit in it. */
  function drawMenuBackdrop(ctx, scroll) {
    ctx.fillStyle = P.leafDeep;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.canopy.canvas, scroll * 0.2, 0);
    tileX(ctx, T.fence.canvas, scroll * 0.3, 0);
    Tint.rect(ctx, 0, 0, VW, VH, P.fenceSeam, 6);
    Tint.rect(ctx, 0, VH - 120, VW, 120, P.void, 4);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.boughs.canvas, scroll, 0);
    Tint.rect(ctx, 0, CEIL, VW, 12, P.void, 7);
    Tint.rect(ctx, 0, CEIL, VW, 5, P.void, 5);
  }

  function drawFloor(ctx, scroll) {
    Tint.rect(ctx, 0, FLOOR - 10, VW, 10, P.void, 6);
    tileX(ctx, T.deck.canvas, scroll, FLOOR);
  }

  /* ---------------------------------------------------------- pillar */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var w = ob.w;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (botH > 0) drawColumn(ctx, T.housing[ob.variant].canvas, x, botY, w, botH);
    if (topH > 0) drawColumn(ctx, T.emitter.canvas, x, CEIL, w, topH);
    drawFittings(ctx, ob, x);
    if (topH > 0) drawDish(ctx, x, ob.gapY - 9, w);
    if (botH > 0) drawLid(ctx, x, botY, w);
    /* the hard shadow it throws on whatever is behind it */
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH : 0, P.void, 7);
    Tint.rect(ctx, x + w, botY, 4, botH > 0 ? botH : 0, P.void, 7);
  }

  /* tile a 64px section into a column of arbitrary height (the Coop's
     slice loop): the partial slice comes off the BOTTOM of the tile, so
     a seam never lands at the mouth of the gap */
  function drawColumn(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* the wide stainless reflector dish, facing down into the gap */
  function drawDish(ctx, x, y, w) {
    var cx = x - 4, cw = w + 8, ch = 9;
    ctx.fillStyle = P.steelLight; ctx.fillRect(cx, y, cw, ch);
    ctx.fillStyle = P.steelHi;    ctx.fillRect(cx, y + 1, cw, 2);
    ctx.fillStyle = P.steelDark;  ctx.fillRect(cx, y + 6, cw, 3);
    ctx.fillStyle = P.outline;
    ctx.fillRect(cx, y, cw, 1); ctx.fillRect(cx, y + ch - 1, cw, 1);
    ctx.fillRect(cx, y, 1, ch); ctx.fillRect(cx + cw - 1, y, 1, ch);
    ctx.fillStyle = P.bronzeDark; ctx.fillRect(cx + 18, y + 7, 6, 2);   /* the hub */
    ctx.fillStyle = P.steelHi;
    ctx.fillRect(cx + 5, y + 1, 1, 1);
    ctx.fillRect(cx + 20, y + 1, 1, 1);
    ctx.fillRect(cx + 33, y + 1, 1, 1);
  }

  /* the flared bronze lid on top of the tank housing */
  function drawLid(ctx, x, y, w) {
    var cx = x - 4, cw = w + 8, ch = 9;
    ctx.fillStyle = P.bronzeLight; ctx.fillRect(cx, y, cw, ch);
    ctx.fillStyle = P.bronzeHi;    ctx.fillRect(cx, y + 1, cw, 2);
    ctx.fillStyle = P.bronzeDark;  ctx.fillRect(cx, y + 6, cw, 3);
    ctx.fillStyle = P.outline;
    ctx.fillRect(cx, y, cw, 1); ctx.fillRect(cx, y + ch - 1, cw, 1);
    ctx.fillRect(cx, y, 1, ch); ctx.fillRect(cx + cw - 1, y, 1, ch);
    ctx.fillStyle = P.brass;   ctx.fillRect(cx + 19, y + 1, 4, 2);     /* the pole socket */
    ctx.fillStyle = P.brassHi; ctx.fillRect(cx + 19, y + 1, 1, 1);
  }

  /* --------------------------------------------------- the fittings

     The Garden's thorns, in metal: knobs, gas hoses and mesh brackets
     sticking off the sides of a heater. They reach at most 5px, so they
     widen the column and never reach into the gap - the cap already
     spans x-4 to x+w+4. */

  /* The two CAP-LESS segments a fitting may live on. The Garden hands
     its draw the cap-inclusive height and its rects the cap-less one,
     which lets a thorn's box sit up to 9px off its pixels; both sides of
     this level ask THIS function instead, so they cannot disagree. */
  function pillarSegs(ob) {
    var botY = ob.gapY + ob.gapH;
    return [{ y: CEIL, h: ob.gapY - 9 - CEIL },
            { y: botY + 9, h: FLOOR - (botY + 9) }];
  }

  /* one fitting's box, or null if there is no room for it. Both
     drawFittings and rectsFor go through here. */
  function fittingBox(ob, f) {
    var segs = pillarSegs(ob);
    var seg = f.k < 0.5 ? segs[0] : segs[1];
    if (seg.h <= 14) return null;
    if (f.kind === 1 && seg.h <= 24) return null;       /* a hose needs 8px of height */
    var reach = f.kind === 0 ? 4 : (f.kind === 1 ? 5 : 3);
    var high = f.kind === 1 ? 8 : 3;
    var ty = seg.y + Math.round(f.k * (seg.h - 10)) + 4;
    if (f.kind === 1) ty = Math.min(ty, seg.y + seg.h - 1 - 8);
    return [f.side ? ob.x + ob.w : ob.x - reach, ty, reach, high];
  }

  function drawFittings(ctx, ob) {
    var x = Math.round(ob.x);
    for (var i = 0; i < ob.fittings.length; i++) {
      var f = ob.fittings[i];
      var box = fittingBox(ob, f);
      if (!box) continue;
      /* the box's own x, rounded the way the column is, so the pixels and
         the rect are the same thing to within the rounding */
      var bx = f.side ? x + ob.w : x - box[2];
      var ty = box[1];
      if (f.kind === 0) {
        /* A KNOB. The 1px outline ring sits outside the box on purpose:
           the dark edge of a fitting is drawn, not lethal, exactly as the
           Coop's egg art overhangs its own hitbox. */
        ctx.fillStyle = P.outline;    ctx.fillRect(bx - 1, ty - 1, 6, 5);
        ctx.fillStyle = P.brass;      ctx.fillRect(bx, ty, 4, 3);
        ctx.fillStyle = P.brassHi;    ctx.fillRect(bx, ty, 1, 1);
        ctx.fillStyle = P.bronzeDark; ctx.fillRect(bx, ty + 2, 4, 1);
      } else if (f.kind === 1) {
        /* A GAS HOSE, looping out of the housing and back into it */
        var colX = f.side ? bx + 3 : bx;
        var faceX = f.side ? bx : bx + 3;
        ctx.fillStyle = P.hoseBlack;
        ctx.fillRect(colX, ty + 1, 2, 6);
        ctx.fillRect(bx, ty, 5, 1);
        ctx.fillRect(bx, ty + 7, 5, 1);
        ctx.fillStyle = P.hoseHi; ctx.fillRect(colX, ty + 1, 1, 3);
        ctx.fillStyle = P.brass;
        ctx.fillRect(faceX, ty, 2, 2);
        ctx.fillRect(faceX, ty + 6, 2, 2);
      } else {
        /* A BRACKET: a clip holding the burner mesh on */
        ctx.fillStyle = P.outline;    ctx.fillRect(bx - 1, ty - 1, 5, 5);
        ctx.fillStyle = P.steelLight; ctx.fillRect(bx, ty, 3, 3);
        ctx.fillStyle = P.steelHi;    ctx.fillRect(bx, ty, 1, 1);
        ctx.fillStyle = P.steelDark;  ctx.fillRect(bx, ty + 2, 3, 1);
      }
    }
  }

  /* ------------------------------------------------------- the misters

     A mister is a 'spike' that is only lethal for part of its cycle. The
     windows below are the whole hazard:

       IDLE  0.00 - 0.58   the tube, a damp patch, nothing else
       PRIME 0.58 - 0.64   a bead swells on the nozzle and it spits twice
       SPRAY 0.64 - 0.92   the jet is drawn
       LETHAL 0.66 - 0.91  strictly INSIDE the spray, so the box never
                           exists where no mist is drawn, and there is a
                           third of a second of arming cue first - collide()
                           has no memory, and a jet that comes on with the
                           doodad already inside it is an unwarned death
       TAIL  0.92 - 1.00   the jet detaches and drifts off, harmless

     A mister enters at x=480 and reaches the doodad at x~116: 364px of
     scroll, 1.45 periods, so the player always watches at least one full
     cycle before arriving at one.                                      */

  function mistPhase(ob) {
    return wrap(mistScroll + ob.seed, MIST_PERIOD) / MIST_PERIOD;
  }

  function drawMisters(ctx, ob) {
    var p = mistPhase(ob);
    var onCeil = ob.side === 'ceil';
    var x = Math.round(ob.x);
    for (var i = 0; i < ob.spikes.length; i++) {
      drawHead(ctx, ob, x + ob.spikes[i].dx, ob.spikes[i].len, onCeil, p);
    }
  }

  function drawHead(ctx, ob, hx, len, onCeil, p) {
    var base = onCeil ? CEIL + 10 : FLOOR - 14;    /* the nozzle's mouth */
    var dir = onCeil ? 1 : -1;
    var J = (onCeil ? len - 10 : len - 14);        /* how far the jet reaches */
    drawRiser(ctx, hx, base, onCeil, p);
    if (J < 2 || p < 0.58) return;

    var a = ctx.globalAlpha;
    if (p < 0.64) drawPrime(ctx, hx, base, dir, (p - 0.58) / 0.06);
    else if (p < 0.92) drawSpray(ctx, ob, hx, base, dir, J, (p - 0.64) / 0.28);
    else drawTail(ctx, hx, base, dir, J, (p - 0.92) / 0.08);
    ctx.globalAlpha = a;
  }

  /* the tube and nozzle, always drawn, whatever the cycle is doing */
  function drawRiser(ctx, hx, base, onCeil, p) {
    if (onCeil) {
      ctx.fillStyle = P.hoseBlack; ctx.fillRect(hx, CEIL, 2, 10);
      ctx.fillStyle = P.hoseHi;    ctx.fillRect(hx, CEIL, 1, 7);
      ctx.fillStyle = P.hoseBlack; ctx.fillRect(hx - 2, CEIL, 6, 2);      /* the saddle */
      ctx.fillStyle = P.brass;     ctx.fillRect(hx - 1, base - 2, 4, 3);
      ctx.fillStyle = P.brassHi;   ctx.fillRect(hx - 1, base - 2, 1, 1);
      /* one bead hanging off it between cycles, so an idle ceiling head
         still reads as plumbing rather than as a nail */
      if (p > 0.3 && p < 0.58) { ctx.fillStyle = P.mistHi; ctx.fillRect(hx + 1, base + 2, 1, 1); }
      return;
    }
    /* The boards are damp where it stands. This has to sit ABOVE the
       floor line: PlayScene draws every 'spike' before it draws the
       floor, so a stain painted at FLOOR+1 would be buried under the
       deck tile and nobody would ever see it. */
    Tint.rect(ctx, hx - 5, FLOOR - 4, 12, 4, P.deckRedDark, 7);
    ctx.fillStyle = P.hoseBlack; ctx.fillRect(hx, FLOOR - 14, 2, 14);
    ctx.fillStyle = P.hoseHi;    ctx.fillRect(hx, FLOOR - 14, 1, 10);
    ctx.fillStyle = P.hoseBlack; ctx.fillRect(hx - 2, FLOOR - 2, 6, 2);   /* the stake collar */
    ctx.fillStyle = P.brass;     ctx.fillRect(hx - 1, base - 3, 4, 3);
    ctx.fillStyle = P.brassHi;   ctx.fillRect(hx - 1, base - 3, 1, 1);
    ctx.fillStyle = P.outline;
    ctx.fillRect(hx, base, 2, 1);
    ctx.fillRect(hx, FLOOR - 1, 2, 1);
  }

  /* the tell: a bead swelling on the mouth, and two spits of water */
  function drawPrime(ctx, hx, base, dir, q) {
    var sz = 1 + Math.round(q * 2);
    ctx.fillStyle = P.mistHi;
    ctx.fillRect(hx + 1 - (sz >> 1), base - (sz >> 1), sz, sz);
    ctx.fillStyle = P.mist;
    ctx.fillRect(hx + 1, base + dir * (2 + Math.round(q * 6)), 1, 1);
    ctx.fillRect(hx + 1, base + dir * (4 + Math.round(q * 10)), 1, 1);
  }

  /* One row of the cone, `i` pixels along the jet. Three passes, drawn
     as 2px bands so there are no gaps: the faint outer cone, the body,
     and a bright core over the first half. All flat rects and one
     globalAlpha - never a Dither, because the whole thing moves. */
  function drawSpray(ctx, ob, hx, base, dir, J, s) {
    /* Full length in the first 7% of the spray window, which lands at
       p = 0.6596 - just BEFORE the box arms at 0.66. The brief said 8%,
       which finishes at 0.6624: for one frame the top few pixels of the
       box would have been lethal with no mist drawn in them yet. */
    var grow = Math.min(1, s / 0.07);
    var jl = Math.round(J * grow);
    var i, k, cw, y;

    ctx.globalAlpha = 0.82;
    for (i = 0; i < jl; i += 2) {
      k = i / J;
      cw = 3 + Math.round(k * 8);                /* 3px at the mouth, 11 at the tip */
      y = dir < 0 ? base - i - 1 : base + i;
      ctx.fillStyle = P.mistEdge;
      ctx.fillRect(hx + 1 - (cw >> 1), y, cw, 2);
      if (cw - 2 >= 1) {
        ctx.fillStyle = P.mist;
        ctx.fillRect(hx + 1 - ((cw - 2) >> 1), y, cw - 2, 2);
      }
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = P.mistHi;
    for (i = 0; i < jl && i < J * 0.45; i += 2) {
      y = dir < 0 ? base - i - 1 : base + i;
      ctx.fillRect(hx + 1, y, 1, 2);
    }

    /* the billow at the working end, wandering a couple of pixels */
    var tip = base + dir * jl;
    var sway = Math.round(Math.sin((mistScroll + ob.seed) * 0.15) * 2);
    ctx.fillStyle = P.mist;
    ctx.fillRect(hx - 1 + sway, tip, 5, 3);
    ctx.fillRect(hx - 2 + sway, tip + dir * 2, 4, 2);
    ctx.fillRect(hx + 4 + sway, tip + dir * 1, 3, 2);
    ctx.fillStyle = P.mistHi;
    ctx.fillRect(hx + 1 + sway, tip, 1, 1);
    ctx.fillRect(hx + sway, tip + dir * 2, 1, 1);
    ctx.fillRect(hx + 5 + sway, tip + dir, 1, 1);

    /* six droplets, re-hashed every 5px of scroll - about 22Hz at speed.
       A shimmer of single pixels is a particle effect, not a pattern
       sliding under the picture, which is the only kind of fine detail
       allowed on something that moves. */
    var tick = Math.floor((mistScroll + ob.seed) / 5);
    for (var d = 0; d < 6; d++) {
      var n = hash(d * 73 + tick);
      var along = Math.round(jl * (0.4 + ((n >>> 8) % 60) / 100));   /* the far 60% */
      var cwd = 3 + Math.round(Math.min(1, along / J) * 8);
      ctx.fillStyle = (d % 2 === 0) ? P.mistHi : P.mistEdge;
      ctx.fillRect(hx + 1 + (n % cwd) - (cwd >> 1), base + dir * along, 1, 1);
    }
  }

  /* the valve has shut: the top of the cone detaches and drifts on while
     what is left of it falls back toward the nozzle */
  function drawTail(ctx, hx, base, dir, J, r) {
    var shift = Math.round(6 * r);
    ctx.globalAlpha = 0.8 * (1 - r);
    for (var i = Math.round(J * 0.6); i < J; i += 2) {
      var k = i / J;
      var cw = 3 + Math.round(k * 8);
      var y = base + dir * (i + shift) - (dir < 0 ? 1 : 0);
      ctx.fillStyle = P.mistEdge;
      ctx.fillRect(hx + 1 - (cw >> 1), y, cw, 2);
      if (cw - 2 >= 1) {
        ctx.fillStyle = P.mist;
        ctx.fillRect(hx + 1 - ((cw - 2) >> 1), y, cw - 2, 2);
      }
    }
    var tip = base + dir * J;
    ctx.fillStyle = P.mist;
    for (var d = 0; d < 4; d++) {
      ctx.fillRect(hx + 1 + (d % 2 ? 1 : -1),
                   Math.round(tip - dir * r * J * 0.8) + d, 1, 1);
    }
  }

  /* --------------------------------------------------- falling fruit */

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x + Math.sin(ob.spin) * 1.2);
    var y = Math.round(ob.y);
    var pulse, r, g, i, k;

    if (ob.gold) {
      /* it falls twice as fast as anything else here, so it gets a comet
         tail: the player has to read where it is GOING, not where it is */
      pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
      r = Math.round(12 + pulse * 3);
      g = ctx.createRadialGradient(x, y, 1, x, y, r);
      g.addColorStop(0, 'rgba(255,226,122,' + (0.40 * pulse).toFixed(3) + ')');
      g.addColorStop(0.55, 'rgba(232,181,42,' + (0.18 * pulse).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(168,106,16,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
      var a = ctx.globalAlpha;
      for (i = 0; i < 4; i++) {
        ctx.globalAlpha = a * (i === 3 ? 0.4 : 1);
        ctx.fillStyle = i % 2 ? P.goldShine : P.goldHi;
        ctx.fillRect(x + Math.round(Math.sin(ob.spin * 2 + i) * 2), y - 7 - i * 4, 1, 1);
      }
      ctx.globalAlpha = a;
      ctx.drawImage(T.golden.canvas, x - 5, y - 5);
      return;
    }

    if (!ob.spicy) { ctx.drawImage(T.apple.canvas, x - 5, y - 5); return; }

    /* the cinnamon one announces itself from across the yard */
    pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
    r = Math.round(14 + pulse * 5);
    g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(255,210,122,' + (0.46 * pulse).toFixed(3) + ')');
    g.addColorStop(0.55, 'rgba(200,80,30,' + (0.22 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(122,36,16,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    for (i = 0; i < 3; i++) {
      k = (ob.spin * 0.7 + i * 0.41) % 1;
      ctx.fillStyle = i % 2 ? P.sugar : P.cinHi;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), y - 8 - Math.round(k * 7), 1, 1);
    }
    ctx.drawImage(T.cinnamon.canvas, x - 5, y - 6);
  }

  /* the spot on the boards an apple is heading for: it tightens and
     darkens as it drops, so the landing is never a surprise */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(11 - k * 5);
    /* the golden one's is the brightest of the three - a +5 the player
       never saw coming is a +5 they never had a chance at */
    var col = ob.gold ? P.goldHi : (ob.spicy ? P.cinHi : P.void);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3, col,
              (ob.gold ? 8 : 6) + k * (ob.gold ? 10 : 9));
  }

  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x), y = FLOOR + 1;
    var spread = Math.round(7 + (1 - k) * 3);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);

    if (ob.gold) {
      /* a missed golden apple is mourned: it keeps glowing for a moment */
      var g = ctx.createRadialGradient(x, y, 1, x, y, 10);
      g.addColorStop(0, 'rgba(255,226,122,' + (0.22 * (1 - k)).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(168,106,16,0)');
      ctx.fillStyle = g;
      ctx.fillRect(x - 10, y - 10, 20, 20);
      ctx.fillStyle = P.goldDark;  ctx.fillRect(x - spread, y + 1, spread * 2, 2);
      ctx.fillStyle = P.goldMid;   ctx.fillRect(x - 3, y, 7, 2);
      ctx.fillStyle = P.goldShine; ctx.fillRect(x - 1, y, 2, 1);
      ctx.fillStyle = P.goldHi;
      ctx.fillRect(x - spread - 2, y + 2, 2, 1);
      ctx.fillRect(x + spread, y + 1, 2, 1);
    } else if (ob.spicy) {
      ctx.fillStyle = P.cinDark; ctx.fillRect(x - spread, y + 1, spread * 2, 2);
      ctx.fillStyle = P.cinMid;  ctx.fillRect(x - 3, y, 7, 2);
      ctx.fillStyle = P.sugar;   ctx.fillRect(x - 1, y, 2, 1);
      ctx.fillStyle = P.cinHi;
      ctx.fillRect(x - spread - 2, y + 2, 2, 1);
      ctx.fillRect(x + spread, y + 1, 2, 1);
    } else {
      ctx.fillStyle = P.appleFlesh; ctx.fillRect(x - spread, y + 1, spread * 2, 2);
      ctx.fillStyle = P.appleMid;   ctx.fillRect(x - 3, y, 7, 2);    /* the skin curling up */
      ctx.fillStyle = P.appleShine; ctx.fillRect(x - 1, y, 2, 1);
      ctx.fillStyle = P.appleDark;
      ctx.fillRect(x - spread - 2, y + 2, 2, 1);
      ctx.fillRect(x + spread, y + 1, 2, 1);
    }
    ctx.globalAlpha = a;
  }

  /* -------------------------------------------------------- the boon */

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var px = Math.round(ob.x);
    var rx = Math.round(ob.x + ob.dx), ry = Math.round(FLOOR + ob.dy);
    var lifted = ob.dy < -1 || ob.dx > 1 || ob.dx < -1;

    /* the pot and its saucer stay where somebody put them */
    ctx.drawImage(T.pot.canvas, px - 10, FLOOR - 19);

    /* a calm jade glow that travels with the PLANT, not the pot. Nothing
       else on this deck shines green, which is the whole point of it. */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase);
    var r = Math.round(15 + pulse * 4);
    var g = ctx.createRadialGradient(rx, ry - 8, 1, rx, ry - 8, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(rx - r, ry - 8 - r, r * 2, r * 2);

    /* soil shaking off the roots once Gerald has it out of the pot */
    if (lifted) {
      for (var d = 0; d < 3; d++) {
        var kk = (ob.phase * 0.5 + d * 0.33) % 1;
        ctx.fillStyle = d % 2 ? P.potSoilLt : P.potSoil;
        ctx.fillRect(rx - 2 + d * 2, ry - 4 + Math.round(kk * 6), 1, 1);
      }
    }
    ctx.drawImage(T.rosette.canvas, rx - 10, ry - 19);

    for (var i = 0; i < 2; i++) {
      var k = (ob.phase * 0.22 + i * 0.5) % 1;
      ctx.fillStyle = i ? P.sucHi : P.mistHi;
      ctx.fillRect(rx - 4 + i * 7, ry - 20 - Math.round(k * 9), 1, 1);
    }
  }

  /* ---------------------------------------------- ground dressing */

  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2;
    if (ob.kind === 0) {                  /* paint chips and splinters */
      for (var i = 0; i < ob.seed.length; i++) {
        ctx.fillStyle = i % 3 ? P.deckBare : P.deckBareDk;
        ctx.fillRect(x + ob.seed[i][0], y + ob.seed[i][1], 2, 1);
      }
    } else if (ob.kind === 1) {
      /* Windfall, and drawn dull on purpose. It used to be the bough's
         apple shrunk a pixel - round, shining, ringed in outline, stem
         up - which is the drop sprite's silhouette sitting on the floor,
         so the player read it as fruit rendered in the wrong place and
         went for it. See bakeWindfall for what replaced it. */
      for (var a = 0; a < 2; a++) {
        var ax = x + a * 10;
        ctx.drawImage(T.windfall[ob.flip ? 1 - a : a].canvas, ax, FLOOR + 2);
        /* The body sits on the first board and its shadow row lands on
           FLOOR+6, which is the deck tile's first deckGap seam: shadow
           and seam become one line. Then the boards' own shade pools
           over its base, so it lies IN the deck rather than on the
           paint. A flat Tint, never a Dither - this scrolls. */
        Tint.rect(ctx, ax - 1, FLOOR + 4, 9, 3, P.void, 4);
      }
    } else {                              /* a split log off the pile */
      ctx.fillStyle = P.deckBareDk; ctx.fillRect(x, y + 1, 16, 5);
      ctx.fillStyle = P.fenceDark;  ctx.fillRect(x, y + 1, 16, 1);
      ctx.fillStyle = P.fenceDark;  ctx.fillRect(x + 11, y + 1, 6, 6);
      ctx.fillStyle = P.deckBare;   ctx.fillRect(x + 12, y + 2, 4, 4);
      ctx.fillStyle = P.outline;    ctx.fillRect(x, y + 6, 11, 1);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawMisters(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ------------------------------------------------- the cover art

     The little window on the level select. The generic cover is the
     Coop's shapes recoloured, which reads as neither level, so the Deck
     paints its own: canopy, fence, rail, a chair going past, red boards
     with the paint off them, bronze heaters, and a mister blinking on
     and off so the card says what the level does. The caller has
     already clipped to the box, so nothing here saves or restores. */

  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var deck = y + h - Math.round(h * 0.16);
    var railY = y + Math.round(h * 0.60);
    var fenceTop = y + Math.round(h * 0.34);
    var i, n, px;

    /* 1. the canopy: a hash-jittered field of blocks. The tone has to come
       off BOTH coordinates - a single running counter hashed once per
       block hands every row the same sequence shifted by a constant, and
       the canopy came out as diagonal stripes of leaf. */
    ctx.fillStyle = P.leafDeep;
    ctx.fillRect(x, y, w, h);
    for (var ly = y; ly < fenceTop; ly += 3) {
      for (var lx = x; lx < x + w; lx += 4) {
        n = (Math.imul(lx - x, 1103515245) ^ Math.imul(ly - y, 19349663)) >>> 0;
        var v = (n >>> 16) % 100;
        ctx.fillStyle = (v < 15 && ly < y + (fenceTop - y) * 0.4) ? P.leafLight
                      : (v < 55 ? P.leafMid : P.leafDark);
        ctx.fillRect(lx, ly, 4, 3);
      }
    }
    ctx.fillStyle = P.skyPeek;
    for (i = 0; i < 4; i++) ctx.fillRect(x + 4 + i * 9, y + 1 + (i % 3) * 2, 2, 1);

    /* 2. the fence, with two trunks drifting across it */
    ctx.fillStyle = P.fenceMid;   ctx.fillRect(x, fenceTop, w, deck - fenceTop);
    ctx.fillStyle = P.fenceLight; ctx.fillRect(x, fenceTop, w, 2);
    ctx.fillStyle = P.fenceSeam;
    var seamOff = Math.round(s * 0.22) % 6;
    for (i = -seamOff; i < w; i += 6) {
      if (i < 0) continue;
      ctx.fillRect(x + i, fenceTop + 2, 1, deck - fenceTop - 2);
    }
    [30, 80].forEach(function (t0) {
      var tx = x + wrap(t0 - s * 0.22, w + 10);
      ctx.fillStyle = P.trunkMid; ctx.fillRect(tx, fenceTop - 8, 5, deck - fenceTop + 8);
      ctx.fillStyle = P.trunkHi;  ctx.fillRect(tx, fenceTop - 8, 1, deck - fenceTop + 8);
      ctx.fillStyle = P.trunkDark; ctx.fillRect(tx + 4, fenceTop - 8, 1, deck - fenceTop + 8);
    });

    /* 3. the rail and its posts. The posts are a step darker here than
       they are in the room: on a 118px card three lit tan posts fought
       the bronze heaters for the eye and the card read as scaffolding.
       This is the level's own readability rule - lift the pillar, sink
       whatever stands behind it - applied to the cover. */
    for (i = 0; i < 4; i++) {
      px = x + wrap(i * 40 - s * 0.42, w + 8);
      ctx.fillStyle = P.postDark; ctx.fillRect(px, railY + 3, 4, deck - railY - 3);
      ctx.fillStyle = P.postMid;  ctx.fillRect(px, railY + 3, 1, deck - railY - 3);
    }
    ctx.fillStyle = P.railMid; ctx.fillRect(x, railY, w, 3);
    ctx.fillStyle = P.railTop; ctx.fillRect(x, railY, w, 1);
    ctx.fillStyle = P.outline; ctx.fillRect(x, railY + 3, w, 1);

    /* 4. one chair going by, and the fire pit beside it */
    var cx = x + wrap(w * 0.55 - s * 0.6, w + 40) - 20;
    ctx.fillStyle = P.wickerMid; ctx.fillRect(cx + 5, deck - 44, 30, 28);
    ctx.fillStyle = P.wickerLight;
    for (i = 0; i < 28; i += 3) ctx.fillRect(cx + 5, deck - 44 + i, 30, 1);
    ctx.fillStyle = P.wickerMid;
    ctx.fillRect(cx, deck - 30, 6, 16); ctx.fillRect(cx + 34, deck - 30, 6, 16);
    ctx.fillStyle = P.wickerHi;
    ctx.fillRect(cx, deck - 30, 6, 1); ctx.fillRect(cx + 34, deck - 30, 6, 1);
    ctx.fillStyle = P.cushion;    ctx.fillRect(cx + 8, deck - 20, 24, 5);
    ctx.fillStyle = P.wickerDark; ctx.fillRect(cx + 2, deck - 8, 2, 8); ctx.fillRect(cx + 36, deck - 8, 2, 8);
    /* the outline follows the chair's actual silhouette. A single bar the
       full 40px wide floated over open fence either side of the back, and
       read as a scratch across the card. */
    ctx.fillStyle = P.outline;
    ctx.fillRect(cx + 5, deck - 45, 30, 1);
    ctx.fillRect(cx, deck - 31, 6, 1); ctx.fillRect(cx + 34, deck - 31, 6, 1);
    ctx.fillStyle = P.steelMid;   ctx.fillRect(cx + 46, deck - 10, 12, 10);
    ctx.fillStyle = P.steelLight; ctx.fillRect(cx + 48, deck - 10, 2, 10);
    ctx.fillStyle = P.ash;
    for (i = 0; i < 3; i++) ctx.fillRect(cx + 48 + i * 4, deck - 3, 1, 1);

    /* 5. the boards, with the paint coming off them */
    ctx.fillStyle = P.deckRed;   ctx.fillRect(x, deck, w, y + h - deck);
    ctx.fillStyle = P.deckGap;
    for (i = 4; i < y + h - deck; i += 4) ctx.fillRect(x, deck + i, w, 1);
    ctx.fillStyle = P.deckRedHi; ctx.fillRect(x, deck, w, 1);
    for (i = 0; i < 6; i++) {
      ctx.fillStyle = P.deckBare;
      ctx.fillRect(x + wrap(i * 17 + Math.round(s), w), deck + 1 + (i % 3), 2 + (i % 3), 1);
    }

    /* 6. three heaters: silver mesh above the gap, bronze tank below */
    var period = big ? 46 : 38;
    var firstOx = 0;
    for (var k = 0; k < 3; k++) {
      var ox = Math.round(x + w + 10 - ((s + k * period) % (period * 3)));
      if (k === 0) firstOx = ox;
      if (ox < x - 12 || ox > x + w + 2) continue;
      var span = deck - (y + 6);
      var gapH = Math.round(span * 0.36);
      /* The three gaps are spread over thirds of the room rather than
         taken off a modulus. `(k * 19) % room` gave the big card 8/27/46
         and the small card 18/20/22 - on the small one all three gaps
         sat in the same band, so the card read as scaffolding instead of
         as three heaters with somewhere to fly between them. */
      var room = Math.max(1, span - gapH - 26);
      var gapY = Math.round(y + 18 + (k * room) / 3);
      pvEmitter(ctx, ox, y, gapY - y);
      pvHousing(ctx, ox, gapY + gapH, deck - gapY - gapH);
      ctx.fillStyle = P.steelLight; ctx.fillRect(ox - 2, gapY - 3, 13, 3);
      ctx.fillStyle = P.steelDark;  ctx.fillRect(ox - 2, gapY - 1, 13, 1);
      ctx.fillStyle = P.bronzeLight; ctx.fillRect(ox - 2, gapY + gapH, 13, 3);
      ctx.fillStyle = P.bronzeDark;  ctx.fillRect(ox - 2, gapY + gapH + 2, 13, 1);
    }

    /* 7. a mister on the boards, blinking its own cycle */
    var mx = firstOx + Math.round(period / 2);
    if (mx > x && mx < x + w - 4) {
      ctx.fillStyle = P.hoseBlack; ctx.fillRect(mx, deck - 5, 1, 5);
      ctx.fillStyle = P.brass;     ctx.fillRect(mx - 1, deck - 7, 2, 2);
      if ((t % 2.4) > 1.5) {
        ctx.fillStyle = P.mistEdge; ctx.fillRect(mx - 1, deck - 25, 3, 18);
        ctx.fillStyle = P.mist;     ctx.fillRect(mx, deck - 19, 1, 12);
        ctx.fillStyle = P.mistHi;   ctx.fillRect(mx - 1, deck - 27, 3, 2);
        ctx.fillRect(mx + 2, deck - 22, 1, 1); ctx.fillRect(mx - 2, deck - 16, 1, 1);
      }
    }

    /* 8. an apple on its way down; every third one is golden */
    var ay = y + 6 + ((s * 1.6) % (deck - y - 10));
    var golden = Math.floor((s * 1.6) / (deck - y - 10)) % 3 === 0;
    px = x + Math.round(w * 0.72);
    ctx.fillStyle = golden ? P.goldMid : P.appleMid;
    ctx.fillRect(px, Math.round(ay), 3, 3);
    ctx.fillStyle = golden ? P.goldHi : P.appleHi;
    ctx.fillRect(px, Math.round(ay), 1, 1);
    ctx.fillStyle = P.stem;
    ctx.fillRect(px + 1, Math.round(ay) - 1, 1, 1);

    /* 9. the doodad flying it, with a halo so it does not sink into the
       fence the way it sank into the Garden's stucco */
    var bx = Math.round(x + w * 0.3);
    var byy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, bx - sz, byy - sz, sz * 2, sz * 2, P.fenceSeam, 5);
    ctx.fillStyle = P.outline; ctx.fillRect(bx - sz / 2 - 1, byy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c'; ctx.fillRect(bx - sz / 2, byy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873'; ctx.fillRect(bx - sz / 2, byy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline; ctx.fillRect(bx + sz / 2 - 2, byy - 1, 1, 1);
    ctx.fillStyle = '#f3cc84'; ctx.fillRect(bx + sz / 2, byy, 2, 1);

    /* 10. the yard's warm air over the lot of it */
    Tint.rect(ctx, x, y, w, h, P.sunHaze, 1);
  }

  /* one little emitter column inside a cover */
  function pvEmitter(ctx, x, y, h) {
    if (h <= 0) return;
    ctx.fillStyle = P.steelMid;   ctx.fillRect(x, y, 9, h);
    ctx.fillStyle = P.steelLight; ctx.fillRect(x + 1, y, 2, h);
    ctx.fillStyle = P.steelDark;  ctx.fillRect(x + 6, y, 2, h);
    ctx.fillStyle = P.outline;    ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 8, y, 1, h);
    ctx.fillStyle = P.steelDark;
    for (var my = y + 2; my < y + h; my += 3) ctx.fillRect(x + 3 + ((my / 3) % 2), my, 1, 1);
  }

  /* and one little tank housing */
  function pvHousing(ctx, x, y, h) {
    if (h <= 0) return;
    ctx.fillStyle = P.bronzeMid;  ctx.fillRect(x, y, 9, h);
    ctx.fillStyle = P.bronzeHi;   ctx.fillRect(x + 1, y, 2, h);
    ctx.fillStyle = P.bronzeDark; ctx.fillRect(x + 6, y, 2, h);
    ctx.fillStyle = P.outline;    ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 8, y, 1, h);
    ctx.fillStyle = P.bronzeDark;
    for (var sy = y + 6; sy < y + h; sy += 13) ctx.fillRect(x + 1, sy, 7, 1);
  }

  /* ---------------------------------------------------- generation */

  function makePillar(x, gapY, gapH) {
    /* three fittings. k under a half lands on the emitter, and only a
       bracket belongs there; above it lands on the housing, where a knob
       or a gas hose does. */
    var fittings = [];
    for (var i = 0; i < 3; i++) {
      var k = rand(0.08, 0.92);
      fittings.push({ k: k, side: chance(0.5),
                      kind: k < 0.5 ? 2 : (chance(0.5) ? 0 : 1) });
    }
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.4) ? 1 : 0, fittings: fittings, scored: false };
  }

  /* A mister line. The engine hands over count 3..6 and a reach; three or
     four nozzles is one head, five or six is two, which is a fifty-fifty
     split and keeps the cluster to 30px across. Both heads share one
     seed: they are plumbed into the same line, so they fire together. */
  function makeSpikes(x, side, count, maxLen) {
    var heads = count >= 5 ? 2 : 1;
    var spikes = [];
    for (var i = 0; i < heads; i++) {
      spikes.push({ dx: i * 22, len: Math.round(rand(maxLen * 0.7, maxLen)) });
    }
    return { type: 'spike', x: x, side: side, spikes: spikes,
             w: 22 * (heads - 1) + 8, seed: rand(0, 250),
             /* the engine's per-obstacle clock. The misters key off scroll
                instead, on purpose - see MIST_PERIOD - but the field is
                here so the obstacle carries one clock like every other. */
             age: 0 };
  }

  /* An apple off the bough. x and y are its CENTRE, because it falls and
     rocks rather than sitting on a grid; `fall` is its starting speed
     downward and DROP_GRAV does the rest.
     The golden one launches at twice the speed plus 72, which takes its
     trip from ~3.1s to ~1.6s: it SWEEPS through the flight path instead
     of sitting in it, so catching one is nerve rather than a chase. */
  function makeDrop(x, spicy, fall) {
    var gold = !spicy && chance(GOLD_CHANCE);
    return { type: 'drop', x: x, y: CEIL + 5, w: spicy ? 8 : 9,
             vy: gold ? fall * 2 + 72 : fall,
             spicy: !!spicy, gold: gold, broken: 0,
             spin: rand(0, TAU), spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1) };
  }

  /* The potted succulent, standing on the boards. No `y`: the engine
     defaults a boon's grab point to FLOOR - 12, which is where this
     20x20 layout puts the rosette's centre. dx/dy is where the plant has
     got to relative to its pot - Gerald's hunger moves it. */
  function makeBoon(x) {
    return { type: 'boon', x: x, w: 20, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0 };
  }

  function makeLitter(x) {
    var kind = randInt(0, 2), seed = [];
    if (kind === 0) for (var i = 0; i < 12; i++) seed.push([randInt(0, 16), randInt(0, 5)]);
    /* which of the two windfall apples lies on the left. Only kind 1
       reads it, and it is the whole of the pair's variety. */
    return { type: 'litter', x: x, kind: kind, seed: seed, flip: chance(0.5), w: 18 };
  }

  /* -------------------------------------------- collision rectangles */

  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
      /* the fittings widen the column where they stick out */
      for (var i = 0; i < ob.fittings.length; i++) {
        var box = fittingBox(ob, ob.fittings[i]);
        if (box) out.push(box);
      }

    } else if (ob.type === 'spike') {
      /* A MISTER IS ONLY LETHAL WHILE IT IS SPRAYING. The window is
         strictly inside the drawn spray (0.64-0.92), so there is never a
         box where no mist is painted, and the 0.58-0.66 arming cue is
         always harmless. Off, it returns nothing at all.
         The outermost mistEdge columns of the cone flare a couple of
         pixels past this 7px box at the very tip: that fringe is
         drifting spray and deliberately does not kill, the same pixel of
         mercy the Coop's egg box gives. */
      var p = mistPhase(ob);
      if (p < 0.66 || p > 0.91) return out;
      for (var k = 0; k < ob.spikes.length; k++) {
        var hd = ob.spikes[k];
        if (ob.side === 'ceil') out.push([ob.x + hd.dx - 2, CEIL + 10, 7, hd.len - 10]);
        else out.push([ob.x + hd.dx - 2, FLOOR - hd.len, 7, hd.len - 14]);
      }

    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      /* the two you catch get generous boxes and the one that kills you
         gets a tight one: dodging is meant to be fair, catching easy */
      if (ob.gold) out.push([ob.x - 5, ob.y - 5, 10, 10]);
      else if (ob.spicy) out.push([ob.x - 5, ob.y - 6, 10, 12]);
      else out.push([ob.x - 4, ob.y - 4, 8, 9]);

    } else if (ob.type === 'boon') {
      /* the plant is what you collect, so the box travels with it */
      if (!ob.taken) out.push([ob.x + ob.dx - 9, FLOOR + ob.dy - 19, 18, 19]);
    }
    return out;
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
