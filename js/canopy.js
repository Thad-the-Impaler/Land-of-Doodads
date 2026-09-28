/* ------------------------------------------------------------------
   Land of Doodads - BACKYARD / THE CANOPY
   INSIDE a fruit tree, not under one. The frame is packed with crown -
   a pale far wall of leaf with daylight picking through it in chinks, a
   tangle of twigs at every angle in front of that, big hazed boughs
   forking past, and dark sunlit foliage crowding the top and bottom
   edges. Apples and oranges let go of their stems, and a split
   pomegranate swings from the ceiling.

   Same discipline as js/coop.js and js/garden.js - every pixel is
   generated in code and baked into tiles once, and any shade laid over
   something that scrolls is a flat Tint, never a Dither, or it boils as
   it moves.

   THE ONE IDEA THAT MAKES IT READ. The Garden works because PALE pillars
   stand against DARK foliage. This level is that trick inverted: the
   backdrop is bright sky, sunlit leaf and hazed grey wood, so the
   PILLARS are the darkest thing on the screen - near-black-brown trunk
   sections, the silhouetted trunk from the photograph. Everything here
   serves that:
     - every background bough is pushed toward the sky with a haze tint
       and is never within 20 degrees of vertical;
     - a pillar's body is barkDark, which is darker than a hazed bough's
       deepest pixel, and a pillar is always vertical;
     - the middle band of the screen (y 80-190) is the LIGHTEST band, not
       the emptiest. It is filled with hazed pale leaf and lit air held
       above a LUMINANCE FLOOR: nothing baked into the far or mid layers
       may come out darker than about 110 there, where a pillar's body is
       61. The dark saturated near foliage is confined to the top ~60px
       and bottom ~45px, so the value structure reads dark / bright
       tunnel / dark with near-black trunks crossing the bright part.
       That is what lets the level be full of tree and still be playable.

   THE POWER-UP IS THE LIME, and it is the engine's `spicy` flag wearing
   this level's colours. FX.hot / hotMid / hotHi / heat / heatEdge /
   glowCore / glowEdge are all lime greens here, so the wash, the embers,
   the speed streaks and the doodad's halo come out acid green with no
   engine change at all. WARN.power names it, for an engine that reads
   the caption out of WARN rather than hard-coding 'SPICY!'.

   SUGGESTED WIRING (somebody else does this - see the RULES; it is
   written down here so it does not have to be guessed):
     index.html  - after js/garden.js, before js/levels.js
     js/levels.js -
       var CANOPY = {
         id: 'canopy', name: 'THE CANOPY', code: '1-4',
         unlock: { room: 'backyard', level: 'garden', score: 30 },
         blurb: ['UP A TREE THAT GROWS APPLES.', 'AND ORANGES. AND LIMES.'],
         art: Canopy,
         tune: {
           speedStart: 114, speedMax: 178, speedRamp: 0.84,
           gapStart: 102, gapMin: 78, gapRamp: 0.31,
           spacingStart: 226, spacingMin: 184, spacingRamp: 0.44,
           gapDrift: 58,
           spikeScore: 12, spikeChance: 0.32, spikeChanceMax: 0.66,
           spikeCeilMin: 18, spikeCeilMax: 32,
           spikeFloorMin: 20, spikeFloorMax: 36,
           dropScore: 6,
           dropEvery: 2.3, dropEveryMin: 1.0, dropEveryRamp: 0.03,
           dropAheadMin: 104, dropAheadMax: 200,
           dropFallMin: 4, dropFallMax: 30,
           spicyChance: 0.09,
           boonChance: 0.032, boonGap: 10
         }
       };
     The golden apple is deliberately NOT a tune key: makeDrop(x, spicy,
     fall) is the engine's whole interface to the fruit, so GOLD_CHANCE
     and GOLD_GAP live down there with DROP_GRAV as this level's own
     physical constants.
------------------------------------------------------------------ */
'use strict';

var Canopy = (function () {

  var P = {
    /* SKY - we are looking UP, so the top of the frame is the zenith
       and therefore the deeper blue */
    skyDeep:    '#3d8de6',
    skyMid:     '#6cb4f6',
    skyPale:    '#a8d4fb',   /* sky low in frame, AND the haze tint on far layers */
    skyWhite:   '#d9edff',   /* chinks of light through the leaf mass */
    sunGlare:   '#fff5cc',   /* the blaze top-left, the ray shafts, warm air */

    /* BARK - grey-brown with lichen, lit from the upper left */
    barkDeep:   '#2a211b',   /* deepest crevice, and the shade edge of everything wooden */
    barkDark:   '#493a2f',   /* THE BODY OF A PILLAR: the darkest wood on screen */
    barkMid:    '#6d5b4b',   /* body of a background bough; the LIT face of a pillar */
    barkLit:    '#93806b',
    barkPale:   '#b3a58f',   /* the bleached crest of the floor bough */
    lichenGrey: '#a8ad9d',
    lichenPale: '#d4d7c8',
    knotDark:   '#120e0a',
    woodCut:    '#d8b98b',   /* heartwood at a sawn stub end - what makes it read as pruned */
    outline:    '#1a1611',

    /* TWIGS - thin dead wood */
    twigDark:   '#4c4137',
    twigMid:    '#7a6d5f',
    twigLit:    '#a99b89',
    twigFar:    '#8fa2b4',   /* far twigs, already half sky */

    /* LEAVES - five greens, a haze green and a dead one */
    leafDeep:   '#1c4619',   /* underside and deep shade; this level's shading green */
    leafShade:  '#2f6a24',
    leafMid:    '#4d982c',
    leafHi:     '#7bc53a',
    leafSun:    '#a8df4c',   /* backlit: the sun coming THROUGH a leaf */
    leafPale:   '#dbf07e',   /* the brightest rim pixel of a backlit leaf */
    leafFar:    '#8fc386',
    leafWall:   '#67a85f',   /* the far wall's mid green, so the crown is not flat leafFar */
    leafHaze:   '#bfe0a4',   /* the palest far leaf, one step short of sky; chink edges */
    leafDry:    '#c9a044',   /* a yellowing leaf; the photograph is full of them */
    stem:       '#5d7a2d',
    stemLit:    '#8ba548',
    moss:       '#5f8c3c',

    /* FRUIT */
    appleDeep:  '#6c9326',
    appleMid:   '#a2c93f',   /* a WARM yellow-green, duller than the lime on purpose */
    appleLit:   '#cfe86c',
    appleShine: '#f2ffc4',
    appleFlesh: '#f1eeb9',
    orangeDeep: '#b4540e',
    orangeMid:  '#f0891c',
    orangeLit:  '#ffb544',
    orangeShine:'#ffe2a2',
    juice:      '#ffc447',
    limeDeep:   '#3d9a1c',
    limeMid:    '#7be83a',   /* THE POWER-UP: nothing else here is this saturated */
    limeHi:     '#c8ff88',
    limeGlow:   '#f0ffc8',
    goldDeep:   '#b07a10',
    goldMid:    '#f1c231',
    goldLit:    '#ffe57c',
    goldShine:  '#fffbe2',
    pomDeep:    '#7a1520',
    pomMid:     '#c62f39',
    pomLit:     '#e85b59',
    pomShine:   '#ffb4a7',
    arilPink:   '#ff7c8d',   /* the seeds showing in the split */
    arilDark:   '#a71e39',

    shade:      '#12301a'    /* green-black gloom: this level's void, Tint work only */
  };

  var CEIL = 24;
  var FLOOR = 242;
  var DROP_GRAV = 38;     /* apples and oranges are heavier than tomatoes */
  var SPLAT_TIME = 1.6;   /* pulp soaks into bark a shade quicker than into mulch */
  var END_MIN = 34;       /* shortest trunk stub allowed at either end */

  /* This level's own physical constants, the ones the engine does not tune.
     makeDrop(x, spicy, fall) is the whole interface to the fruit, so how
     often a golden apple turns up is the art module's business. */
  var GOLD_CHANCE = 0.04;  /* rare: about one in twenty-five ordinary drops */
  var GOLD_GAP = 5;        /* and never within five drops of the last one */

  /* the neutral effect colours PlayScene paints out of - see js/coop.js.
     The power-up trio is LIME, so every particle, streak and halo the
     engine throws while the power-up runs comes out green instead of
     paprika without the engine knowing anything about it. */
  var FX = {
    motes:    '#fff3c6',   motesHi:  '#fffce8',
    puff:     '#eef3d3',   puffHi:   '#fbfbe9',
    ground:   '#8b7358',   groundHi: '#b9b4a1',
    splat:    '#e9e4a9',   splatHi:  '#ffbf50',
    hot:      '#5bbf28',   hotMid:   '#7be83a',  hotHi: '#c8ff88',
    heat:     '#8ee23a',   heatEdge: '#2f7f1a',
    glowCore: '240,255,200', glowEdge: '123,232,58'
  };

  /* the one-off heads up when a hazard arms. `power` is this level's name
     for its power-up: WARN is the mid-flight caption table, so it is the
     honest place to say SOUR without adding a key to the contract. An
     engine that has not learned to read it yet simply shouts SPICY. */
  var WARN = {
    drop:  ['▼ FRUIT ▼', 'IT IS ALL RIPE AT ONCE'],
    spike: ['▲ TWIGS ▲', 'NOBODY PRUNED UP HERE'],
    power: ['LIMES', 'SOUR SHRINKS YOU']
  };

  /* the colours js/scene_levelselect.js paints its generic preview with */
  var PREVIEW = {
    back: P.skyMid,      backAlt: P.skyPale,     seam: P.skyDeep,
    beam: P.barkDark,    beamDark: P.barkDeep,   beamLight: P.barkMid,
    ground: P.leafShade, groundDark: P.leafDeep, groundHi: P.barkPale,
    spike: P.twigMid,    spikeHi: P.twigLit,     air: P.sunGlare, gloom: P.shade
  };

  var T = {};             /* baked tiles */

  /* The module's clock, in radians, set from `scroll` at the top of every
     frame. The twig sway and the pomegranate's swing read it; an
     obstacle's `phase` is only an offset into it.
     It comes off scroll rather than off a dt because scroll stops dead
     when the game pauses and speeds up as the run does, so the wind is
     the run's own speed and it holds still behind the pause scrim. The
     Garden's rosette reads ob.phase alone, which nothing ever advances -
     that pulse is in fact frozen, and is not the thing to copy. */
  var clock = 0;

  /* ------------------------------------------------------- primitives */

  /* A 4x2 leaf with a midrib pixel: the unit the leaf masses are made of.
     `rib` exists because of the luminance floor in the header. leafDeep
     comes out at 99 through the far wall's haze and 95 through the
     tangle's, which is below a pillar's lit face - a whole layer of
     those speckling the flight band is the one thing that quietly undoes
     the level. The far layers pass leafShade instead, which hazes to
     119-127 and still reads as a rib. */
  function leafSmall(c, x, y, colour, dir, rib) {
    var d = dir === undefined ? 1 : dir;
    c.fillStyle = colour;
    c.fillRect(x, y, 4, 1);
    c.fillRect(x + (d > 0 ? 1 : 0), y + 1, 3, 1);
    c.fillStyle = rib || P.leafDeep;
    c.fillRect(x + (d > 0 ? 3 : 0), y, 1, 1);
  }

  /* a 7x4 pointed leaf with a midrib and a lit rim: the big sunlit ones
     in the photograph's foreground. `dir` is which side the sun is on. */
  function leafBig(c, x, y, dir, body, rim) {
    c.fillStyle = body;
    c.fillRect(x + 1, y, 5, 1);
    c.fillRect(x, y + 1, 7, 2);
    c.fillRect(x + 1, y + 3, 5, 1);
    c.fillStyle = P.leafShade;
    c.fillRect(x + 1, y + 1, 1, 1); c.fillRect(x + 3, y + 1, 1, 1); c.fillRect(x + 5, y + 1, 1, 1);
    c.fillRect(x + 2, y + 2, 1, 1); c.fillRect(x + 4, y + 2, 1, 1);
    c.fillStyle = rim || P.leafPale;
    c.fillRect(dir > 0 ? x + 5 : x + 1, y, 1, 1);
  }

  /* An elliptical mass of leaves. Points are picked by angle and radius
     rather than by rejection inside a box, so the cluster has no square
     corners giving away that it is a rectangle full of leaves. */
  function cluster(c, cx, cy, rw, rh, r, dark, mid, light, rib) {
    var n = Math.round(rw * rh / 9);
    for (var i = 0; i < n; i++) {
      var a = r() * TAU, k = Math.sqrt(r());
      var x = Math.round(cx + Math.cos(a) * k * rw / 2);
      var y = Math.round(cy + Math.sin(a) * k * rh / 2);
      var v = r();
      leafSmall(c, x, y, v < 0.45 ? dark : (v < 0.8 ? mid : light), v < 0.5 ? 1 : -1, rib);
    }
  }

  /* a fleck of the lichen crust on the lit side of every limb (the
     photograph's #a7ae96), brightest where the sun reaches it */
  function lichen(c, x, y, w, h, pale) {
    c.fillStyle = pale ? P.lichenPale : P.lichenGrey;
    c.fillRect(x, y, w, h);
    c.fillStyle = P.lichenPale;
    c.fillRect(x, y, 1, 1);
  }

  /* one pixel-span across a bough, painted along whichever axis is the
     cross axis for that bough's slope */
  function spanPx(c, steep, x, y, off, n, colour) {
    if (n <= 0) return;
    c.fillStyle = colour;
    if (steep) c.fillRect(x + off, y, n, 1);
    else c.fillRect(x, y + off, 1, n);
  }

  /* A forking grey-brown branch. It marches along whichever axis is
     longer and paints a span across the line at each step: a steep bough
     gets horizontal slices, a flat one vertical slices, which is the
     perpendicular to within a pixel and costs nothing.
     Lit from the upper left, so barkLit is always on the low side of the
     span and barkDark/barkDeep on the high side. */
  function bough(c, x0, y0, x1, y1, w0, w1, seed) {
    var dx = x1 - x0, dy = y1 - y0;
    var steps = Math.max(1, Math.round(Math.max(Math.abs(dx), Math.abs(dy))));
    var steep = Math.abs(dy) >= Math.abs(dx);
    var r = mulberry32(seed);
    for (var i = 0; i <= steps; i++) {
      var k = i / steps;
      var x = Math.round(x0 + dx * k), y = Math.round(y0 + dy * k);
      var w = Math.max(3, Math.round(lerp(w0, w1, k)));
      var o = -(w >> 1);
      spanPx(c, steep, x, y, o, w, P.barkMid);
      spanPx(c, steep, x, y, o + w - 4, 2, P.barkDark);
      spanPx(c, steep, x, y, o + w - 2, 1, P.barkDeep);
      spanPx(c, steep, x, y, o + 1, 2, P.barkLit);
      spanPx(c, steep, x, y, o, 1, P.outline);
      spanPx(c, steep, x, y, o + w - 1, 1, P.outline);
      /* crust on the sun side */
      if (i % 9 === 4) {
        var pale = r() < 0.25;
        if (steep) lichen(c, x + o + 2, y, 2, 1, pale);
        else lichen(c, x, y + o + 2, 1, 2, pale);
      }
      /* and a ridge of bark across it now and then */
      if (i % 23 === 11) spanPx(c, steep, x, y, o + 1, w - 2, P.barkDeep);
    }
  }

  /* the big knot hole the photograph has, with its swollen ring */
  function knot(c, x, y) {
    c.fillStyle = P.barkDeep; c.fillRect(x - 1, y - 1, 8, 6);
    c.fillStyle = P.knotDark;
    c.fillRect(x + 1, y, 4, 1);
    c.fillRect(x, y + 1, 6, 2);
    c.fillRect(x + 1, y + 3, 4, 1);
    c.fillStyle = P.lichenGrey; c.fillRect(x - 1, y - 1, 1, 1);
  }

  /* a little rounded fruit hanging in a distant cluster. 2x2 is a flat
     block; anything bigger loses its corners so it reads as round. */
  function fruitDot(c, x, y, size, mid, lit, deep) {
    c.fillStyle = mid;
    if (size <= 2) c.fillRect(x, y, size, size);
    else {
      c.fillRect(x + 1, y, size - 2, size);
      c.fillRect(x, y + 1, size, size - 2);
    }
    c.fillStyle = lit; c.fillRect(x + 1, y + 1, 1, 1);
    if (deep && size >= 4) { c.fillStyle = deep; c.fillRect(x + size - 2, y + size - 2, 1, 1); }
  }

  /* A 1px dead twig running off at ANY angle, forking twice. The old
     twigLine only ever walked downward, which is why the far layer used
     to read as rain; branches inside a crown go every way at once, so
     this takes a direction and the caller spreads them round the circle.
     `end` collects the fork tips, which is where the tufts get hung.
     It walks past the tile edge rather than stopping, so a ray that
     starts off-tile still arrives. */
  function twigRay(c, x0, y0, ang, len, seed, colour, rib, end) {
    var r = mulberry32(seed);
    var ca = Math.cos(ang), sa = Math.sin(ang);
    var wob = (seed % 997) * 0.0063;
    var forks = [Math.round(len * 0.4), Math.round(len * 0.7)];
    var W = c.canvas.width, H = c.canvas.height;
    var i, s;
    c.fillStyle = colour;
    for (i = 0; i < len; i++) {
      /* the wobble is across the ray, so it bends rather than stretches */
      var off = Math.sin(i * 0.07 + wob) * 2;
      var x = Math.round(x0 + ca * i - sa * off);
      var y = Math.round(y0 + sa * i + ca * off);
      if (x >= 0 && y >= 0 && x < W && y < H) c.fillRect(x, y, 1, 1);
      if (i !== forks[0] && i !== forks[1]) continue;
      var fa = ang + (i === forks[0] ? 0.6 : -0.6);
      var flen = 8 + Math.floor(r() * 13);
      var fx = x, fy = y;
      for (s = 0; s < flen; s++) {
        fx = Math.round(x + Math.cos(fa) * s);
        fy = Math.round(y + Math.sin(fa) * s);
        if (fx >= 0 && fy >= 0 && fx < W && fy < H) c.fillRect(fx, fy, 1, 1);
      }
      /* a far leaf on some of the fork tips, so the web is not all sticks */
      if (r() < 0.4) {
        leafSmall(c, fx - 2, fy - 1, r() < 0.5 ? P.leafFar : P.leafHi, r() < 0.5 ? 1 : -1, rib);
        c.fillStyle = colour;
      }
      /* only tips that landed ON the tile are offered as somewhere to
         hang a tuft; one hung off the edge is half a tuft */
      if (end && fx >= 6 && fy >= 6 && fx < W - 6 && fy < H - 6) end.push([fx, fy]);
    }
  }

  /* One irregular gap of daylight punched through a baked leaf mass.
     Three to five overlapping clearRects jittered about the centre, then
     a couple of pale leaves laid ACROSS the edge - without those the
     rectangles survive as rectangles and the wall reads as brickwork.
     Chinks are what keep the far wall from being a green plank, and
     their total area is this level's sky budget. */
  function chink(c, cx, cy, sw, sh, r) {
    var n = 3 + Math.floor(r() * 3);
    var j = Math.max(1, sw / 3);
    var i;
    for (i = 0; i < n; i++) {
      var w = Math.max(1, Math.round(sw * (0.5 + r() * 0.5)));
      var h = Math.max(1, Math.round(sh * (0.5 + r() * 0.5)));
      c.clearRect(Math.round(cx - w / 2 + (r() * 2 - 1) * j),
                  Math.round(cy - h / 2 + (r() * 2 - 1) * j), w, h);
    }
    var m = 2 + Math.floor(r() * 2);
    for (i = 0; i < m; i++) {
      var a = r() * TAU;
      leafSmall(c, Math.round(cx + Math.cos(a) * sw * 0.5) - 2,
                   Math.round(cy + Math.sin(a) * sh * 0.55),
                P.leafHaze, r() < 0.5 ? 1 : -1, P.leafShade);
    }
  }

  /* A slanted shaft of sunlight, the Coop's helper in this level's light:
     a soft outer band and a brighter core, stepping down in five bands.
     `strength` scales both. It exists because the shafts used to fall on
     open sky, where they were a whisper; falling on the far leaf wall at
     full strength they smear it into a pale vertical column. */
  function shaft(c, gx, H, strength) {
    var slant = 40;
    var m = strength === undefined ? 1 : strength;
    for (var y = 0; y < H; y++) {
      var k = y / H;
      var fade = Math.ceil((1 - k) * 5) / 5;
      if (fade <= 0) continue;
      var sx = gx + k * slant;
      var outer = 9 + k * 20;
      var core = 4 + k * 6;
      var dOuter = Math.round(fade * fade * 2 * m);
      var dCore = Math.round(fade * fade * 4 * m);
      if (dOuter > 0) Tint.rect(c, Math.round(sx), y, Math.round(outer), 1, P.sunGlare, dOuter);
      if (dCore > 0) Tint.rect(c, Math.round(sx + (outer - core) / 2), y, Math.round(core), 1,
                                P.sunGlare, dCore);
    }
  }

  /* the shape tables the fruit sprites are plotted from, and the two
     helpers that fill and outline them - the Coop's egg trick */
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

  /* ------------------------------------------------------------ tiles */

  /* The sky, baked once at full size and drawn at (0,0) without scrolling.
     The sun does not move when you fly - everything else slides past it -
     so its radial blaze is baked in and costs nothing per frame. */
  function bakeSky() {
    var W = VW, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    c.fillStyle = P.skyMid;
    c.fillRect(0, 0, W, H);
    /* Deeper toward the zenith, paler toward the bottom of the frame - and
       ramped a row at a time rather than laid in as four 50px bands. The
       bands' endpoints are the same (skyDeep at 6/16 up top, skyPale at
       8/16 at the bottom), but their four hard edges were plainly visible
       as steps across the menu backdrop, where there is no foliage in
       front of the sky to hide them. This is baked once and blitted at a
       fixed (0,0), so the extra rows cost nothing per frame. */
    for (var y = 0; y < H; y++) {
      var k = y / H;
      if (k < 0.42) {
        c.globalAlpha = (0.42 - k) / 0.42 * 0.40;
        c.fillStyle = P.skyDeep;
      } else {
        c.globalAlpha = (k - 0.42) / 0.58 * 0.52;
        c.fillStyle = P.skyPale;
      }
      c.fillRect(0, y, W, 1);
    }
    c.globalAlpha = 1;
    var g = c.createRadialGradient(58, 4, 1, 58, 4, 120);
    g.addColorStop(0, 'rgba(255,245,204,0.62)');
    g.addColorStop(0.45, 'rgba(255,245,204,0.22)');
    g.addColorStop(1, 'rgba(255,245,204,0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 180, 126);
    return t;
  }

  /* THE FAR SIDE OF THE CROWN, and the layer that owns this level's sky
     budget. It starts as a solid sheet of far green and has the daylight
     PUNCHED out of it as chinks, which is the way round a real crown
     works: the leaf is continuous and the sky is what is left over.

     Two rules hold the flight band legible while the frame is full:
       - the haze ramps from 7/16 of skyPale at the top of the tile to
         4/16 at the bottom, so the darkest leaf in here comes out at
         about 111 at worst and 123 across the flight band - clear of a
         pillar's lit face at 95, let alone its body at 61;
       - the chink centres lean up and to the left, because that is where
         the sun is baked into T.sky, and dapple that ignores the sun
         reads as holes rather than as light.

     The shafts go in BEFORE the chinks are punched: a shaft is a Tint,
     and tinting a hole would leave a warm film over the sky showing
     through it. */
  function bakeFarWall() {
    var W = 248, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2626);
    var i, y;

    c.fillStyle = P.leafWall;
    c.fillRect(0, 0, W, H);

    /* The crown itself: overlapping masses over the WHOLE tile height,
       not banded - the flight band is filled like everywhere else and is
       kept readable by value, not by being left empty.
       The mix is close to half lit, half shaded on purpose. An earlier
       pass ran 70/30 toward the pale triple and the wall came out as a
       flat grey-green fog: with the haze on top, the spread between the
       darkest and lightest leaf collapsed to about 25 levels and no leaf
       had an edge. It wants roughly 123 to 213 after haze to read as
       leaves rather than as weather. */
    var spots = [];
    for (i = 0; i < 116; i++) {
      var cx = Math.floor(r() * W), cy = Math.floor(r() * H);
      var rw = 30 + Math.floor(r() * 23), rh = 16 + Math.floor(r() * 11);
      if (r() < 0.55) cluster(c, cx, cy, rw, rh, r, P.leafWall, P.leafFar, P.leafHaze, P.leafShade);
      else cluster(c, cx, cy, rw, rh, r, P.leafShade, P.leafMid, P.leafFar, P.leafShade);
      spots.push([cx, cy]);
    }

    /* fruit hanging in the far crown, so the whole tree is a fruit tree
       and not just the near sprays */
    for (i = 0; i < 20; i++) {
      var s = spots[Math.floor(r() * spots.length)];
      var fx = s[0] + Math.floor(r() * 18) - 9, fy = s[1] + Math.floor(r() * 12) - 6;
      if (i < 14) {
        fruitDot(c, fx, fy, 2, i % 2 ? P.pomMid : P.orangeMid, i % 2 ? P.pomLit : P.orangeLit, null);
      } else {
        fruitDot(c, fx, fy, 3, P.appleMid, P.appleLit, null);
      }
    }

    /* light coming down through the far gaps, baked over the leaves the
       way real glare lies on them */
    shaft(c, 24, H, 0.5);
    shaft(c, 156, H, 0.5);

    /* THE SKY BUDGET. y = r()^1.6 leans the gaps toward the top of the
       tile and 55% of them sit in the left half, which is where the sun
       is. Raise these counts for more sky, lower them for less; nothing
       else in the level is allowed to be the sky knob. */
    function punch(n, wLo, wHi, hLo, hHi) {
      for (var k = 0; k < n; k++) {
        var px = r() < 0.55 ? Math.floor(r() * (W * 0.5)) : Math.floor(W * 0.5 + r() * (W * 0.5));
        var py = Math.floor(Math.pow(r(), 1.6) * H);
        var cw = wLo + Math.floor(r() * (wHi - wLo + 1));
        var chh = hLo + Math.floor(r() * (hHi - hLo + 1));
        var seed = Math.floor(r() * 1e9);
        chink(c, px, py, cw, chh, mulberry32(seed));
        /* A chink straddling the tile edge would be sliced in half and
           the slice would repeat every 248px as a straight vertical
           edge in the sky - the one seam a punched layer can show. The
           same seed redraws the identical hole on the far side, so it
           runs across the join. */
        if (px < cw) chink(c, px + W, py, cw, chh, mulberry32(seed));
        else if (px > W - cw) chink(c, px - W, py, cw, chh, mulberry32(seed));
      }
    }
    punch(26, 16, 24, 8, 12);
    punch(112, 8, 14, 4, 7);
    punch(90, 3, 6, 2, 4);
    /* pinholes are PAINTED, not punched: a single pixel of sky read as a
       dead pixel, a single pixel of skyWhite reads as a spark of glare */
    c.fillStyle = P.skyWhite;
    for (i = 0; i < 30; i++) c.fillRect(Math.floor(r() * W), Math.floor(r() * H), 1, 1);

    /* the haze ramp, one row at a time. 270 Tint calls, baked once. */
    c.globalCompositeOperation = 'source-atop';
    for (y = 0; y < H; y++) Tint.rect(c, 0, y, W, 1, P.skyPale, lerp(7, 4, y / (H - 1)));
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* THE TANGLE: thin twigs running off at every angle with tufts on
     their fork tips. This is the layer that says "branches in every
     direction" rather than "rain" - the old bakeFarTwigs only ever
     walked downward - and it is what you feel yourself weaving through.
     A ray that starts in the flight band is twigFar, which is already
     half sky and hazes to 170; one that starts outside it is the browner
     twigMid, which hazes to 134 and so is still above the floor on the
     stretch where it wanders in. */
  function bakeTangle() {
    var W = 232, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(4141);
    var tips = [];
    var i;

    for (i = 0; i < 34; i++) {
      var fromEdge = r() < 0.4;
      var x0 = fromEdge ? (r() < 0.5 ? -8 : W + 7) : Math.floor(r() * W);
      var y0 = Math.floor(r() * H);
      var ang = r() * TAU;
      var inLane = y0 > 64 && y0 < 200;
      twigRay(c, x0, y0, ang, 50 + Math.floor(r() * 91), 4141 + i * 97,
              inLane ? P.twigFar : P.twigMid, P.leafShade, tips);
    }

    /* Tufts on the fork tips - anywhere, the flight band included. This
       is the only mid-depth leaf in the level: without it the eye jumps
       straight from the hazed far wall to the unhazed near sprays and
       the crown flattens into two cut-out sheets. */
    var tufted = [];
    for (i = 0; i < 24 && tips.length; i++) {
      var tip = tips[Math.floor(r() * tips.length)];
      cluster(c, tip[0], tip[1], 12 + Math.floor(r() * 9), 7 + Math.floor(r() * 5), r,
              P.leafHi, P.leafSun, P.leafDry, P.leafShade);
      tufted.push(tip);
    }
    for (i = 0; i < 8 && tufted.length; i++) {
      var tf = tufted[Math.floor(r() * tufted.length)];
      fruitDot(c, tf[0] + Math.floor(r() * 8) - 4, tf[1] + Math.floor(r() * 6) - 3, 3,
               i % 2 ? P.appleMid : P.orangeMid, i % 2 ? P.appleLit : P.orangeLit, null);
    }

    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.skyPale, 4);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* The big forking boughs from the photograph - the limbs you weave
     between. None of the three comes within 20 degrees of vertical -
     vertical is reserved for pillars - and the closing haze tint
     guarantees that every pixel of wood here is lighter and bluer than
     the matching pixel of a pillar.

     A bare limb crossing an otherwise leafy frame reads as scaffolding,
     so every limb now carries leaf sprays along its length on the sun
     side. They are drawn AFTER all three boughs, so a spray can lie
     across the limb behind it and the three read as three depths. */
  function bakeBoughs() {
    var W = 264, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(3434);

    /* bough A, and the Y fork leaving it up and to the right */
    bough(c, -6, -4, 118, 244, 14, 6, 8801);
    bough(c, 46, 100, 204, 36, 8, 3, 8802);
    knot(c, 31, 70);
    /* bough B, coming down the other way */
    bough(c, 270, 26, 150, 272, 12, 5, 8803);
    /* bough C, thinner, 33 degrees off vertical and leaning the other way */
    bough(c, 150, -4, 48, 150, 7, 3, 8804);

    /* sprays every ~26px along each limb, on the side the sun is on */
    [[-6, -4, 118, 244], [46, 100, 204, 36], [270, 26, 150, 272], [150, -4, 48, 150]]
      .forEach(function (b) {
        var dx = b[2] - b[0], dy = b[3] - b[1];
        var len = Math.sqrt(dx * dx + dy * dy);
        var steps = Math.max(1, Math.round(len / 31));
        for (var i = 1; i < steps; i++) {
          /* jittered along the limb and across it: on an even spacing
             with an even offset the sprays march down the bough as a
             ladder, which is the one thing that makes a hand-placed
             limb look machine-made */
          var k = (i + r() * 0.6 - 0.3) / steps;
          var x = Math.round(b[0] + dx * k) + Math.round(r() * 5 - 2);
          var y = Math.round(b[1] + dy * k) + Math.round(r() * 5 - 2);
          /* the sun is up and to the left, so the sprays gather up-left
             of the limb and its own shade side stays bare */
          /* the twig the spray grows on. Without it the leaves float
             beside the limb instead of off it, which is what a bare
             offset looks like once there are four limbs doing it. */
          var sl = 4 + Math.floor(r() * 4);
          for (var q = 0; q < sl; q++) {
            c.fillStyle = q > sl - 3 ? P.twigLit : P.twigMid;
            c.fillRect(x - q, y - Math.round(q * 0.7), 1, 1);
          }
          if (r() < 0.85) leafBig(c, x - 8 - Math.floor(r() * 3), y - 5 + Math.floor(r() * 3),
                                  1, r() < 0.5 ? P.leafSun : P.leafHi, P.leafPale);
          if (r() < 0.7) leafBig(c, x + 1 + Math.floor(r() * 4), y + 1 + Math.floor(r() * 3),
                                 -1, r() < 0.5 ? P.leafHi : P.leafSun, P.leafPale);
          if (r() < 0.55) leafSmall(c, x - 4 + Math.floor(r() * 8), y + 5 + Math.floor(r() * 3),
                                    r() < 0.5 ? P.leafMid : P.leafHi, r() < 0.5 ? 1 : -1, P.leafShade);
          if (r() < 0.3) {
            c.fillStyle = P.stem; c.fillRect(x - 4, y - 2, 1, 3);
            if (r() < 0.5) fruitDot(c, x - 6, y + 1, 4, P.appleMid, P.appleLit, P.appleDeep);
            else fruitDot(c, x - 6, y + 1, 4, P.orangeMid, P.orangeLit, P.orangeDeep);
          }
        }
      });

    /* foliage and fruit at the fork tip and the bough ends */
    [[204, 36], [118, 244], [150, 272], [48, 150]].forEach(function (p) {
      cluster(c, p[0], p[1], 34, 20, r, P.leafShade, P.leafMid, P.leafHi, P.leafShade);
      for (var f = 0; f < 2; f++) {
        var fx = p[0] - 10 + f * 14, fy = p[1] - 6 + Math.floor(r() * 8);
        c.fillStyle = P.stem; c.fillRect(fx + 1, fy - 3, 1, 3);
        var pick = Math.floor(r() * 3);
        if (pick === 0) fruitDot(c, fx, fy, 4, P.appleMid, P.appleLit, P.appleDeep);
        else if (pick === 1) fruitDot(c, fx, fy, 4, P.orangeMid, P.orangeLit, P.orangeDeep);
        else fruitDot(c, fx, fy, 4, P.pomMid, P.pomLit, P.pomDeep);
      }
    });

    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.skyPale, 4);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* The big sunlit leaves close to the camera - sprays hanging from the
     ceiling and rising from the floor. No haze: this layer is near.
     The flight band gets one thin twig and nothing else. */
  function bakeNearLeaves() {
    var W = 212, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(5252);
    var i, k;

    /* The leaf mass gathered round the two boughs, laid down first so the
       sprays hang in front of it. Without this the level reads as a twig
       against an empty sky rather than as being up inside a tree: the
       sprays alone left the ceiling and floor bands about a third leaf,
       where they want to be about half. Both masses are kept clear of the
       flight band - the upper one bottoms out near y 50, the lower one
       tops out near y 214. */
    for (i = 0; i < 8; i++) {
      cluster(c, Math.floor(r() * W), 30 + Math.floor(r() * 16),
              34 + Math.floor(r() * 24), 16 + Math.floor(r() * 8), r,
              P.leafShade, P.leafMid, P.leafHi);
    }
    for (i = 0; i < 13; i++) {
      cluster(c, Math.floor(r() * W), 208 + Math.floor(r() * 30),
              38 + Math.floor(r() * 24), 16 + Math.floor(r() * 8), r,
              P.leafDeep, P.leafShade, P.leafMid);
    }

    /* Hanging from the canopy. About half of them now reach y 80-94, a
       dozen pixels into the flight band, which is what stops the top
       band ending on a ruled line. Any leaf that gets that far is
       painted leafSun/leafPale - BRIGHT - because a dark shape hanging
       into the lane is exactly what a hazard looks like. */
    var longOnes = [];
    for (i = 0; i < 12; i++) {
      var hx = Math.floor(r() * W), hlen = 26 + Math.floor(r() * 45);
      var hsway = r() * TAU;
      var pts = [];
      for (k = 0; k < hlen; k++) {
        var sx = hx + Math.round(Math.sin(k * 0.09 + hsway) * 4);
        c.fillStyle = k > hlen * 0.7 ? P.stemLit : P.stem;
        c.fillRect(sx, 24 + k, 1, 1);
        pts.push([sx, 24 + k]);
      }
      for (k = 4; k < hlen - 2; k += 4) {
        var pt = pts[k];
        var side = (k / 4) % 2 ? 1 : -1;
        var v = r();
        var body = pt[1] >= 78 ? P.leafSun
                 : (v < 0.5 ? P.leafSun : (v < 0.85 ? P.leafHi : P.leafDry));
        leafBig(c, pt[0] + (side > 0 ? 1 : -7), pt[1] - 2, side, body, P.leafPale);
      }
      if (hlen > 38) longOnes.push(pts);
    }
    /* four fruit, on the sprays long enough to carry one */
    for (i = 0; i < 4 && longOnes.length; i++) {
      var spray = longOnes[i % longOnes.length];
      var at = spray[Math.floor(spray.length * (0.55 + r() * 0.35))];
      c.fillStyle = P.stem; c.fillRect(at[0], at[1], 1, 2);
      if (r() < 0.5) fruitDot(c, at[0] - 2, at[1] + 2, 5, P.appleMid, P.appleLit, P.appleDeep);
      else fruitDot(c, at[0] - 2, at[1] + 2, 5, P.orangeMid, P.orangeLit, P.orangeDeep);
    }

    /* rising off the floor bough, same rule at the other end */
    for (i = 0; i < 13; i++) {
      var fx2 = Math.floor(r() * W), flen = 22 + Math.floor(r() * 35);
      var fsway = r() * TAU;
      for (k = 0; k < flen; k++) {
        var fsx = fx2 + Math.round(Math.sin(k * 0.09 + fsway) * 3);
        c.fillStyle = k > flen * 0.7 ? P.stemLit : P.stem;
        c.fillRect(fsx, 242 - k, 1, 1);
        if (k > 3 && k % 4 === 0) {
          var fside = (k / 4) % 2 ? 1 : -1;
          var fbody = (242 - k) <= 192 ? P.leafSun : (r() < 0.5 ? P.leafMid : P.leafHi);
          leafBig(c, fsx + (fside > 0 ? 1 : -7), 242 - k - 2, fside, fbody,
                  (242 - k) <= 192 ? P.leafPale : P.leafHi);
        }
      }
    }

    /* The flight band: two crossing twigs and five big pale leaves, and
       otherwise nothing near. No cluster masses are allowed between
       y 64 and y 200 in this layer - the near foliage is unhazed, so a
       mass of it here would be the only dark thing in the lane besides
       a pillar, and that is the level's whole reading. */
    [[40, 96, 150, 176, 110, 26, 58, 90], [300, 172, 372, 104, 84, 22, 60, -1]]
      .forEach(function (w) {
        for (var j = 0; j <= w[4]; j++) {
          var tk = j / w[4];
          var tx = Math.round(lerp(w[0], w[2], tk)), ty = Math.round(lerp(w[1], w[3], tk));
          c.fillStyle = (j % 3 === 0) ? P.twigLit : P.twigMid;
          c.fillRect(tx, ty, 1, 1);
          if (j === w[5] || j === w[6] || j === w[7]) {
            leafBig(c, tx + 1, ty - 2, 1, j === w[6] ? P.leafSun : P.leafHi, P.leafPale);
          }
        }
      });
    return t;
  }

  /* The underside of the leaf mass, with the bough you are flying under
     running along it. The sky chinks are what make this read as leaves
     with daylight behind them rather than as a green plank. */
  function bakeCeiling() {
    var W = 120, H = CEIL;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(1414);
    var i;

    c.fillStyle = P.leafDeep;
    c.fillRect(0, 0, W, H);
    for (i = 0; i < 110; i++) {
      var v = r();
      leafSmall(c, Math.floor(r() * W), Math.floor(r() * 14),
                v < 0.5 ? P.leafShade : (v < 0.82 ? P.leafMid : P.leafHi), v < 0.5 ? 1 : -1);
    }
    /* more chinks than the ceiling used to carry: the frame behind it is
       full of crown now, and 14 pinpricks read as a solid green lid */
    c.fillStyle = P.skyWhite;
    for (i = 0; i < 22; i++) c.fillRect(Math.floor(r() * W), Math.floor(r() * 11), 2, 1);

    /* the bough along the underside */
    c.fillStyle = P.barkLit;  c.fillRect(0, 15, W, 1);
    c.fillStyle = P.barkMid;  c.fillRect(0, 16, W, 3);
    c.fillStyle = P.barkDark; c.fillRect(0, 19, W, 2);
    c.fillStyle = P.outline;  c.fillRect(0, 21, W, 1);
    for (i = 0; i < 5; i++) lichen(c, Math.floor(r() * (W - 2)), 16 + Math.floor(r() * 2), 2, 1, r() < 0.25);
    c.fillStyle = P.barkDeep; c.fillRect(34, 15, 1, 6); c.fillRect(88, 15, 1, 6);

    /* twig stubs and leaf tips hanging below the bough */
    for (i = 0; i < 6; i++) {
      c.fillStyle = P.twigMid;
      c.fillRect(Math.floor(r() * W), 22, 1, 2 + Math.floor(r() * 2));
    }
    for (i = 0; i < 14; i++) {
      c.fillStyle = r() < 0.5 ? P.leafMid : P.leafShade;
      c.fillRect(Math.floor(r() * W), 22, 1, 1 + Math.floor(r() * 3));
    }
    return t;
  }

  /* A thick horizontal bough - the limb you would stand on - with more
     foliage in shadow underneath it. The top is the lit surface, because
     the light comes from above, so there is no shadow drawn above it. */
  function bakeFloor() {
    var W = 144, H = VH - FLOOR;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(3131);
    var i, x;

    c.fillStyle = P.barkPale; c.fillRect(0, 0, W, 1);
    c.fillStyle = P.barkLit;  c.fillRect(0, 1, W, 2);
    c.fillStyle = P.barkMid;  c.fillRect(0, 3, W, 11);
    c.fillStyle = P.barkDark; c.fillRect(0, 14, W, 3);
    c.fillStyle = P.barkDeep; c.fillRect(0, 17, W, 1);
    c.fillStyle = P.outline;  c.fillRect(0, 18, W, 1);

    /* grain */
    c.fillStyle = P.barkDark;
    for (i = 0; i < 40; i++) {
      c.fillRect(Math.floor(r() * W), 3 + Math.floor(r() * 11), 3 + Math.floor(r() * 7), 1);
    }
    for (i = 0; i < 8; i++) {
      lichen(c, Math.floor(r() * (W - 3)), 3 + Math.floor(r() * 7), 3, 1, i >= 6);
    }
    /* two wobbling ridges of bark */
    [26, 98].forEach(function (rx) {
      for (var y = 1; y < 17; y++) {
        c.fillStyle = P.barkDeep;
        c.fillRect(rx + Math.round(Math.sin(y * 0.8) * 1), y, 1, 1);
      }
    });
    /* moss on the crest */
    [18, 104].forEach(function (mx) {
      c.fillStyle = P.moss;   c.fillRect(mx, 1, 6, 2);
      c.fillStyle = P.leafHi; c.fillRect(mx + 2, 1, 1, 1);
    });
    /* leaf tips catching the light on the very top */
    c.fillStyle = P.leafMid;
    for (i = 0; i < 4; i++) c.fillRect(Math.floor(r() * W), 0, 1, 1);

    /* foliage in shadow below the limb */
    c.fillStyle = P.leafDeep; c.fillRect(0, 19, W, H - 19);
    for (i = 0; i < 30; i++) leafSmall(c, Math.floor(r() * W), 19 + Math.floor(r() * 7), P.leafShade);
    for (i = 0; i < 6; i++) leafSmall(c, Math.floor(r() * W), 19 + Math.floor(r() * 7), P.leafMid);
    c.fillStyle = P.twigDark;
    for (i = 0; i < 3; i++) { x = Math.floor(r() * W); c.fillRect(x, 19, 1, 4 + Math.floor(r() * 3)); }
    return t;
  }

  /* A vertical section of trunk: the darkest thing in the level, which is
     the whole reason this level reads. The LIT face is only barkMid -
     which is the BODY colour of a background bough - and the body is
     barkDark, darker than any hazed pixel behind it. */
  function bakePillar(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(880 + variant * 47);
    var i, y;

    c.fillStyle = P.outline;  c.fillRect(0, 0, 1, H);
    c.fillStyle = P.barkMid;  c.fillRect(1, 0, 5, H);
    c.fillStyle = P.barkDark; c.fillRect(6, 0, 17, H);
    c.fillStyle = P.barkDeep; c.fillRect(23, 0, 10, H);
    c.fillStyle = P.outline;  c.fillRect(33, 0, 1, H);
    /* crevice texture down the shade side */
    c.fillStyle = P.barkDark;
    for (y = 0; y < H; y += 4) { c.fillRect(31, y, 1, 1); c.fillRect(32, y + 2, 1, 1); }

    /* grain: deep streaks on the body, dark ones on the lit face */
    for (i = 0; i < 22; i++) {
      var onFace = r() < 0.35;
      c.fillStyle = onFace ? P.barkDark : P.barkDeep;
      c.fillRect(onFace ? 1 + Math.floor(r() * 5) : 6 + Math.floor(r() * 16),
                 Math.floor(r() * H), 1, 4 + Math.floor(r() * 10));
    }
    /* lichen, mostly on the lit half */
    for (i = 0; i < 9; i++) {
      var lx = i < 7 ? 1 + Math.floor(r() * 12) : 13 + Math.floor(r() * 8);
      lichen(c, lx, Math.floor(r() * (H - 2)), 2 + Math.floor(r() * 3), 1 + Math.floor(r() * 2), false);
    }
    /* bark ridges across the trunk, one every 21px */
    for (y = variant === 1 ? 14 : 6; y < H; y += 21) {
      for (var rx = 1; rx < 33; rx++) {
        var wob = Math.round(Math.sin(rx * 0.35 + variant) * 1);
        c.fillStyle = P.barkDeep; c.fillRect(rx, y + wob, 1, 1);
        if (rx < 15) { c.fillStyle = P.barkMid; c.fillRect(rx, y + wob + 1, 1, 1); }
      }
    }
    if (variant === 1) {
      /* a knot with a tuft growing out of it, and one fruit on the tuft.
         Decoration only - none of this gets a collision box. */
      c.fillStyle = P.barkDeep; c.fillRect(11, 29, 9, 7);
      c.fillStyle = P.knotDark;
      c.fillRect(13, 30, 4, 1); c.fillRect(12, 31, 6, 3); c.fillRect(13, 34, 4, 1);
      c.fillStyle = P.lichenGrey; c.fillRect(11, 29, 1, 1);
      leafSmall(c, 19, 28, P.leafHi, 1);
      leafSmall(c, 21, 31, P.leafMid, 1);
      leafSmall(c, 18, 33, P.leafHi, -1);
      c.fillStyle = P.stem; c.fillRect(23, 33, 1, 2);
      fruitDot(c, 22, 35, 4, P.appleMid, P.appleLit, P.appleDeep);
    }
    return t;
  }

  /* ---------------------------------------------------------- sprites

     The fruit are seven to eleven pixels across, so they are plotted row
     by row from a little shape table rather than drawn with shapes. The
     apple and the orange deliberately share one silhouette: colour and
     skin tell them apart at a glance, and the calyx is the other tell. */

  var FRUIT_ROWS = [[2, 5], [1, 7], [0, 9], [0, 9], [0, 9], [0, 9], [1, 7], [2, 5]];
  var LIME_ROWS  = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [0, 7], [0, 7], [1, 5], [2, 3]];
  var POM_ROWS   = [[3, 7], [1, 11], [0, 13], [0, 13], [0, 13], [0, 13], [0, 13], [1, 11],
                    [2, 9], [4, 5]];

  function bakeApple() {
    var t = makeCanvas(11, 12), c = t.ctx;
    rowsOutline(c, FRUIT_ROWS, 1, 3, P.outline);
    rowsFill(c, FRUIT_ROWS, 1, 3, P.appleMid);
    /* a dimple for the stem to sit in */
    c.fillStyle = P.outline; c.fillRect(5, 3, 1, 1);
    c.fillStyle = P.appleLit;
    c.fillRect(2, 4, 5, 1); c.fillRect(2, 5, 3, 1); c.fillRect(2, 6, 2, 1);
    c.fillStyle = P.appleShine; c.fillRect(3, 4, 2, 1);
    c.fillStyle = P.appleDeep;
    c.fillRect(8, 7, 2, 1); c.fillRect(8, 8, 2, 1); c.fillRect(7, 9, 2, 1);
    c.fillStyle = P.barkDark; c.fillRect(5, 1, 1, 2);
    c.fillStyle = P.leafHi;   c.fillRect(6, 1, 2, 1);
    c.fillStyle = P.leafShade; c.fillRect(7, 2, 1, 1);
    return t;
  }

  function bakeOrange() {
    var t = makeCanvas(11, 12), c = t.ctx;
    rowsOutline(c, FRUIT_ROWS, 1, 3, P.outline);
    rowsFill(c, FRUIT_ROWS, 1, 3, P.orangeMid);
    c.fillStyle = P.orangeLit;
    c.fillRect(2, 4, 5, 1); c.fillRect(2, 5, 3, 1); c.fillRect(2, 6, 2, 1);
    c.fillStyle = P.orangeShine; c.fillRect(3, 4, 1, 1);
    /* dimpled peel - the tell that this is not an apple */
    c.fillStyle = P.orangeDeep;
    c.fillRect(6, 6, 1, 1); c.fillRect(4, 8, 1, 1); c.fillRect(7, 9, 1, 1);
    c.fillRect(8, 7, 2, 1); c.fillRect(8, 8, 2, 1); c.fillRect(7, 10, 2, 1);
    /* a calyx, no stalk and no leaf: the other tell */
    c.fillStyle = P.stem;    c.fillRect(5, 2, 1, 1);
    c.fillStyle = P.stemLit; c.fillRect(6, 2, 1, 1);
    return t;
  }

  /* the lime: the power-up, pointed at both ends so it is never mistaken
     for a small apple, and the only thing on the level this saturated */
  function bakeLime() {
    var t = makeCanvas(9, 11), c = t.ctx;
    rowsOutline(c, LIME_ROWS, 1, 1, P.outline);
    rowsFill(c, LIME_ROWS, 1, 1, P.limeMid);
    c.fillStyle = P.limeDeep; c.fillRect(4, 0, 1, 1); c.fillRect(4, 10, 1, 1);
    c.fillStyle = P.limeHi;
    c.fillRect(2, 2, 2, 1); c.fillRect(2, 3, 1, 1); c.fillRect(1, 4, 1, 2);
    c.fillStyle = P.limeGlow; c.fillRect(2, 2, 1, 1);
    c.fillStyle = P.limeDeep;
    c.fillRect(6, 5, 1, 1); c.fillRect(6, 6, 1, 1); c.fillRect(6, 7, 1, 1);
    c.fillRect(5, 8, 1, 1);
    return t;
  }

  /* the golden apple: the apple's shape, a glint cross, and +5 */
  function bakeGold() {
    var t = makeCanvas(11, 12), c = t.ctx;
    rowsOutline(c, FRUIT_ROWS, 1, 3, P.outline);
    rowsFill(c, FRUIT_ROWS, 1, 3, P.goldMid);
    c.fillStyle = P.outline; c.fillRect(5, 3, 1, 1);
    c.fillStyle = P.goldLit;
    c.fillRect(2, 4, 5, 1); c.fillRect(2, 5, 3, 1); c.fillRect(2, 6, 2, 1);
    c.fillStyle = P.goldDeep;
    c.fillRect(8, 7, 2, 1); c.fillRect(8, 8, 2, 1); c.fillRect(7, 9, 2, 1);
    c.fillStyle = P.barkDark;  c.fillRect(5, 1, 1, 2);
    c.fillStyle = P.leafHi;    c.fillRect(6, 1, 2, 1);
    c.fillStyle = P.leafShade; c.fillRect(7, 2, 1, 1);
    c.fillStyle = P.goldShine;
    c.fillRect(3, 5, 1, 1); c.fillRect(2, 6, 3, 1); c.fillRect(3, 7, 1, 1);
    return t;
  }

  /* ------------------------------------------------------- windfall

     The fruit that came down days ago and stayed. The old one drew
     T.apple - the drop sprite itself, parked on the limb - so a piece of
     harmless scenery wore the exact silhouette of the thing that kills
     you, and it sat there on the ground doing nothing, which is exactly
     how it looked. This is the opposite of a drop on purpose:

       - wider than tall with a flat bottom, slumped to one side, about a
         third of the fruit's pixel count: no round symmetric silhouette;
       - no Lit, no Shine, no highlight of any kind on the upper-left
         shoulder, because that specular is the second tell of "round
         thing you fly into";
       - NO closed outline. The only dark edge is the contact shadow
         under it, offset a pixel to the right because the sun is upper
         left. The missing ring is most of what says "debris";
       - the skin has gone: the apple yellows through leafDry to a brown
         bruise where it landed, the orange has a grey mould bloom on its
         sagging side. Mould in lichenPale/lichenGrey is matte and is
         already this level's crust colour, so it cannot be read as a
         glint;
       - the stalk lies flat and sideways. An apple on the ground is on
         its side.

     The bottom row lands ON the floor bough's barkPale crest, breaking
     the lit line for its own width: the fruit is heavy and is lying IN
     the limb, not balanced on the paint. */

  var WINDFALL_ROWS = {
    /* gone brown: olive on the left, yellowing across, bruised where it
       hit, one soft spot, dried stalk out of the right side */
    apple: ['..AAA....',
            '.AAATT...',
            'AATTTTBBM',
            'ATTTBKBB.',
            '.DDDDDDDD'],
    /* gone furry: a wedge, highest on the left, sagging right, with the
       bloom on the SAGGING shoulder - never where a highlight would be */
    orange: ['.RRR.....',
             '.RRRRPP..',
             'RRRRPGGP.',
             'BBRRRPPR.',
             '.DDDDDDDD']
  };

  var WINDFALL_INK = {
    A: P.appleDeep, R: P.orangeDeep, T: P.leafDry,
    B: P.barkDark,  K: P.barkDeep,   M: P.barkMid,
    P: P.lichenPale, G: P.lichenGrey, D: P.barkDeep
  };

  function bakeWindfall(rows) {
    var t = makeCanvas(rows[0].length, rows.length), c = t.ctx;
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

  /* -------------------------------------------------- the pomegranate

     The stalk and the fruit are baked separately into one 16-wide
     coordinate space, so drawing both at the same origin reassembles the
     picture - but Gerald's hunger can pull the fruit off the stem and
     leave the stalk hanging on the ceiling. */

  function bakeHanger() {
    var t = makeCanvas(16, 14), c = t.ctx;
    /* the twig it hangs from */
    c.fillStyle = P.outline;  c.fillRect(6, 0, 1, 9); c.fillRect(9, 0, 1, 9);
    c.fillStyle = P.barkMid;  c.fillRect(7, 0, 1, 9);
    c.fillStyle = P.barkDark; c.fillRect(8, 0, 1, 9);
    /* the knuckle it grows out of */
    c.fillStyle = P.barkMid;  c.fillRect(6, 3, 4, 2);
    c.fillStyle = P.outline;  c.fillRect(6, 3, 1, 1);
    /* the stem */
    c.fillStyle = P.stem;     c.fillRect(8, 9, 1, 3);
    c.fillStyle = P.stemLit;  c.fillRect(8, 9, 1, 1);
    leafSmall(c, 3, 8, P.leafHi, -1);
    leafSmall(c, 10, 9, P.leafMid, 1);
    c.fillStyle = P.leafPale; c.fillRect(3, 8, 1, 1);
    return t;
  }

  function bakePom() {
    var t = makeCanvas(15, 15), c = t.ctx;
    rowsOutline(c, POM_ROWS, 1, 1, P.outline);
    rowsFill(c, POM_ROWS, 1, 1, P.pomMid);
    c.fillStyle = P.pomLit;
    c.fillRect(4, 2, 4, 1); c.fillRect(2, 3, 3, 1);
    c.fillRect(1, 4, 1, 1); c.fillRect(1, 5, 1, 1); c.fillRect(2, 6, 1, 1);
    c.fillStyle = P.pomShine;
    c.fillRect(4, 2, 2, 1); c.fillRect(2, 4, 1, 1);
    c.fillStyle = P.pomDeep;
    c.fillRect(11, 6, 3, 1); c.fillRect(11, 7, 3, 1); c.fillRect(10, 8, 3, 1);
    c.fillRect(9, 9, 2, 1); c.fillRect(6, 10, 3, 1);
    /* THE SPLIT: the photograph's fruit is burst open on the shoulder */
    c.fillStyle = P.arilDark;
    c.fillRect(9, 4, 1, 1); c.fillRect(11, 4, 1, 1);
    c.fillRect(8, 5, 1, 1); c.fillRect(12, 5, 1, 1);
    c.fillRect(8, 6, 1, 1); c.fillRect(12, 6, 1, 1);
    c.fillRect(9, 7, 1, 1); c.fillRect(11, 7, 1, 1);
    c.fillStyle = P.arilPink;
    c.fillRect(9, 5, 3, 1); c.fillRect(9, 6, 2, 1);
    /* the two pixels the rim would otherwise close over: without them the
       split reads as a smudge on the skin rather than as an opening */
    c.fillRect(10, 4, 1, 1); c.fillRect(10, 7, 1, 1);
    c.fillStyle = '#fff0f0'; c.fillRect(11, 6, 1, 1);
    /* the crown, pointing DOWN - a pomegranate hangs stem up */
    c.fillStyle = P.pomMid;
    c.fillRect(5, 11, 1, 1); c.fillRect(7, 11, 1, 1); c.fillRect(9, 11, 1, 1);
    c.fillStyle = P.pomDeep;
    c.fillRect(6, 11, 1, 1); c.fillRect(8, 11, 1, 1);
    c.fillStyle = P.outline;
    c.fillRect(4, 11, 1, 1); c.fillRect(10, 11, 1, 1);
    c.fillRect(5, 12, 1, 1); c.fillRect(7, 12, 1, 1); c.fillRect(9, 12, 1, 1);
    /* the stem socket, left open so the hanger's stalk shows through */
    c.clearRect(7, 0, 1, 1);
    return t;
  }

  function build() {
    T.sky        = bakeSky();
    T.farWall    = bakeFarWall();
    T.tangle     = bakeTangle();
    T.boughs     = bakeBoughs();
    T.nearLeaves = bakeNearLeaves();
    T.ceiling    = bakeCeiling();
    T.floor      = bakeFloor();
    T.pillar     = [bakePillar(0), bakePillar(1)];
    T.cap        = [bakeCap(false), bakeCap(true)];
  }

  function buildSprites() {
    T.apple  = bakeApple();
    T.orange = bakeOrange();
    T.lime   = bakeLime();
    T.gold   = bakeGold();
    T.hanger = bakeHanger();
    T.pom    = bakePom();
    T.windfall = { apple:  bakeWindfall(WINDFALL_ROWS.apple),
                   orange: bakeWindfall(WINDFALL_ROWS.orange) };
  }

  /* -------------------------------------------------------- drawing */

  function drawBackdrop(ctx, scroll) {
    /* The module clock, set here because drawBackdrop is the first thing
       called every frame. scroll runs at 110-180 px/s, so this turns over
       at 1.3-2.2 rad/s - faster as the run speeds up - and freezes with
       the rest of the world the instant the game pauses. */
    clock = scroll * 0.012;

    /* The sky does not scroll: everything else slides past the sun, and
       it is only ever seen through the chinks in the far wall. The four
       tile widths - 248, 232, 264, 212 - are pairwise non-multiples, so
       no two layers ever repeat on the same beat. */
    ctx.drawImage(T.sky.canvas, 0, 0);
    tileX(ctx, T.farWall.canvas, scroll * 0.14, 0);
    tileX(ctx, T.tangle.canvas, scroll * 0.26, 0);
    tileX(ctx, T.boughs.canvas, scroll * 0.38, 0);
    tileX(ctx, T.nearLeaves.canvas, scroll * 0.52, 0);

    /* The air, and the other half of the luminance floor. The lit tunnel
       is the wide warm band across the middle; the leafDeep bands at top
       and bottom push the near foliage down and away from it, so the
       frame reads dark / bright / dark even though it is leaf all the
       way through. */
    Tint.rect(ctx, 0, 64, VW, 136, P.sunGlare, 2);
    Tint.rect(ctx, 0, CEIL, VW, 40, P.leafDeep, 3);
    Tint.rect(ctx, 0, FLOOR - 50, VW, 50, P.leafDeep, 3);
    Tint.rect(ctx, 0, CEIL, 40, FLOOR - CEIL, P.leafDeep, 2);
    Tint.rect(ctx, VW - 40, CEIL, 40, FLOOR - CEIL, P.leafDeep, 2);
  }

  /* A calm version of the tree for the menus to sit on: the far wall and
     the tangle only. The boughs and the near sprays are left out because
     the menus need somewhere quiet to stand. */
  function drawMenuBackdrop(ctx, scroll) {
    clock = scroll * 0.012;
    ctx.drawImage(T.sky.canvas, 0, 0);
    tileX(ctx, T.farWall.canvas, scroll * 0.2, 0);
    tileX(ctx, T.tangle.canvas, scroll * 0.3, 0);
    Tint.rect(ctx, 0, 0, VW, VH, P.shade, 4);
    /* The gloom the menu boards need to stand on, laid in as four stacked
       bands of 1/16 rather than one of 4/16: against flat sky a single
       band draws a hard line straight across the screen. */
    Tint.rect(ctx, 0, VH - 140, VW, 140, P.shade, 1);
    Tint.rect(ctx, 0, VH - 110, VW, 110, P.shade, 1);
    Tint.rect(ctx, 0, VH - 80, VW, 80, P.shade, 1);
    Tint.rect(ctx, 0, VH - 50, VW, 50, P.shade, 1);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.ceiling.canvas, scroll, 0);
    /* the shade the bough casts down out of the leaves */
    Tint.rect(ctx, 0, CEIL, VW, 10, P.leafDeep, 5);
    Tint.rect(ctx, 0, CEIL, VW, 4, P.leafDeep, 4);
  }

  function drawFloor(ctx, scroll) {
    /* no shadow ABOVE the limb: the light comes from up there, and its
       top face is the lit surface */
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
    Tint.rect(ctx, 0, FLOOR + 19, VW, 9, P.shade, 4);
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
    /* the sawn-off side branches, which do have boxes */
    drawStubs(ctx, ob, x, w, true);
    drawStubs(ctx, ob, x, w, false);
    if (topH > 0) drawCap(ctx, x, ob.gapY - 9, w, false);
    if (botH > 0) drawCap(ctx, x, botY, w, true);
    /* the trunk's shadow on the sky behind it: green-black, not brown */
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH : 0, P.shade, 6);
    Tint.rect(ctx, x + w, botY, 4, botH > 0 ? botH : 0, P.shade, 6);
  }

  function drawColumn(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* The gap mouth is the knuckle where the bough forked: blunt, swollen,
     with two leaf tufts bursting out of it the way the Garden's cap does.
     It is a BAKED TILE, not drawn per frame, for one reason: the knuckle
     wants its four corner pixels and the two end pixels of its outer row
     to be sky, and there is no way to take a pixel back off the live bg
     layer - clearRect there would punch a hole straight through the
     backdrop to nothing. Baked, the corners are simply never painted. */
  function drawCap(ctx, x, y, w, pointingDown) {
    ctx.drawImage(T.cap[pointingDown ? 1 : 0].canvas, x - 4, y);
  }

  /* `pointingDown` is the Garden's flag with the Garden's meaning: it is
     true for the cap at the BOTTOM of the gap, whose lit band therefore
     faces up into the gap at y+1, and false for the one at the top, whose
     lit band faces down into the gap at y+ch-3. */
  function bakeCap(pointingDown) {
    var cw = 42, ch = 9;
    var t = makeCanvas(cw, ch), c = t.ctx;
    c.fillStyle = P.barkDark; c.fillRect(0, 0, cw, ch);
    c.fillStyle = P.barkMid;
    c.fillRect(0, pointingDown ? 1 : ch - 3, cw, 2);
    c.fillStyle = P.barkDeep;
    c.fillRect(0, pointingDown ? ch - 3 : 0, cw, 3);
    c.fillStyle = P.outline;
    c.fillRect(0, 0, cw, 1); c.fillRect(0, ch - 1, cw, 1);
    c.fillRect(0, 0, 1, ch); c.fillRect(cw - 1, 0, 1, ch);
    /* the corners, and the two end pixels of the row facing away from the
       gap, go back to sky so the knuckle reads rounded, not as a brick */
    c.clearRect(0, 0, 1, 1);      c.clearRect(cw - 1, 0, 1, 1);
    c.clearRect(0, ch - 1, 1, 1); c.clearRect(cw - 1, ch - 1, 1, 1);
    var outer = pointingDown ? ch - 1 : 0;
    c.clearRect(1, outer, 1, 1);  c.clearRect(cw - 2, outer, 1, 1);
    lichen(c, 6, 4, 3, 1, false);
    c.fillStyle = P.lichenPale; c.fillRect(30, 3, 1, 1);
    leafSmall(c, 3, 3, P.leafHi, 1);
    leafSmall(c, cw - 7, 3, P.leafSun, -1);
    return t;
  }

  /* Where a stub sits on its segment. drawStubs and rectsFor BOTH go
     through this, which is the whole point of it: the Garden's thorns map
     `k` onto the drawn segment height in drawThorns and onto the shorter
     boxed height in rectsFor, so a thorn is drawn up to five pixels below
     the box that kills you. Here there is one answer to the question. */
  function stubSeg(ob, top) {
    var botY = ob.gapY + ob.gapH;
    return top ? { y: CEIL, h: ob.gapY - CEIL }
               : { y: botY, h: FLOOR - botY };
  }

  function stubY(st, seg) { return seg.y + Math.round(st.k * (seg.h - 10)) + 5; }

  /* The pruned stubs: the knobs left where side branches were sawn off.
     They reach 6px out, which widens the column without ever reaching
     into the gap. The pale heartwood on the cut end is what makes a stub
     read as sawn rather than as a thorn.

     A stub belongs to ONE segment, the one its `k` puts it on, and this
     is called once per segment so it draws only its own. The Garden's
     drawThorns is called for both segments and walks the whole list both
     times, so it paints every thorn twice while rectsFor boxes each one
     once - half the Garden's thorns are lethal-looking wood you can fly
     straight through. Three stubs drawn is three stubs boxed. */
  function drawStubs(ctx, ob, x, w, top) {
    var seg = stubSeg(ob, top);
    if (seg.h <= 14) return;
    for (var i = 0; i < ob.stubs.length; i++) {
      var st = ob.stubs[i];
      if ((st.k < 0.5) !== top) continue;
      var ty = stubY(st, seg);
      var dir = st.side ? 1 : -1;
      var bx = st.side ? x + w - 1 : x;
      for (var s = 0; s < st.len; s++) {
        ctx.fillStyle = P.barkMid;  ctx.fillRect(bx + dir * s, ty - 1, 1, 1);
        ctx.fillStyle = P.barkDark; ctx.fillRect(bx + dir * s, ty, 1, 1);
        ctx.fillStyle = P.barkDeep; ctx.fillRect(bx + dir * s, ty + 1, 1, 1);
      }
      ctx.fillStyle = P.outline;  ctx.fillRect(bx + dir * st.len, ty - 1, 1, 3);
      ctx.fillStyle = P.woodCut;  ctx.fillRect(bx + dir * st.len, ty, 1, 1);
    }
  }

  /* ------------------------------------------------------ twig spurs

     Clusters of thin dead twigs growing off the ceiling and floor boughs.
     The whole cluster leans in the wind together - one clock, phases
     spread - and the tip travels a pixel either way. Every colour here is
     a flat fill: this moves, so nothing dithers. */

  function drawSpurs(ctx, ob) {
    var x = Math.round(ob.x);
    var down = ob.side === 'ceil';
    var baseY = down ? CEIL : FLOOR;
    for (var i = 0; i < ob.spikes.length; i++) {
      drawSpur(ctx, x + ob.spikes[i].dx, baseY, ob.spikes[i], down);
    }
  }

  function drawSpur(ctx, x, baseY, n, down) {
    var dir = down ? 1 : -1;
    var len = n.len;
    var forkAt = Math.round(len * n.fork);
    for (var i = 0; i < len; i++) {
      var k = i / len;
      /* the sway is zero at the root and +-1 at the tip */
      var sway = Math.round(Math.sin(clock * 1.7 + n.phase) * k * 1.4);
      var off = Math.round(Math.sin(k * 2.0 + n.bend) * k * 1.6) + sway;
      var y = baseY + dir * i;
      ctx.fillStyle = (i < len * 0.3) ? P.twigDark : P.twigMid;
      ctx.fillRect(x + off, y, 2, 1);
      ctx.fillStyle = P.twigLit;
      ctx.fillRect(x + off, y, 1, 1);
      if (i === len - 1) {
        /* dead wood ends dark */
        ctx.fillStyle = P.outline;
        ctx.fillRect(x + off, y, 2, 1);
      }
      if (i === forkAt) {
        ctx.fillStyle = P.twigMid;
        for (var s = 0; s < 4; s++) ctx.fillRect(x + off + 2 + s, y + dir * s, 1, 1);
        ctx.fillStyle = P.twigLit;
        ctx.fillRect(x + off + 2, y, 1, 1);
        /* one dry leaf still clinging on, pointing away from the pillar */
        if (n.leaf) leafSmall(ctx, x + off + 3, y + dir * 2, P.leafDry, 1);
      }
    }
    /* the root, and the little collar of bark it grows out of */
    ctx.fillStyle = P.outline;
    ctx.fillRect(x, baseY - (down ? 1 : 0), 2, 1);
    ctx.fillStyle = P.barkDark;
    ctx.fillRect(x - 1, down ? baseY - 2 : baseY, 4, 2);
  }

  /* ------------------------------------------------------- the fruit

     One maker serves every kind, so the art decides which fruit falls.
     `kind` is what it decided, but the drawing dispatches through
     kindOf() rather than off ob.kind directly: an engine that sets its
     own gold/sour flag after the maker returns then still gets the right
     sprite instead of a plain apple with a gold hitbox. */

  var nextKind = 'apple';   /* apples and oranges strictly alternate */
  var goldGap = 0;

  function kindOf(ob) {
    if (ob.gold) return 'gold';
    if (ob.spicy || ob.sour) return 'lime';
    return ob.kind || 'apple';
  }

  function drawDrop(ctx, ob) {
    var kind = kindOf(ob);
    var x = Math.round(ob.x + Math.sin(ob.spin) * 1.2);
    var y = Math.round(ob.y);
    if (kind === 'lime') { drawLimeDrop(ctx, ob, x, y); return; }
    if (kind === 'gold') { drawGoldDrop(ctx, ob, x, y); return; }
    ctx.drawImage((kind === 'orange' ? T.orange : T.apple).canvas, x - 5, y - 6);
  }

  /* the lime announces itself from across the sky, the way the Garden's
     pepper does - the same pulse, in acid green */
  function drawLimeDrop(ctx, ob, x, y) {
    var pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
    var r = Math.round(14 + pulse * 5);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(240,255,200,' + (0.46 * pulse).toFixed(3) + ')');
    g.addColorStop(0.55, 'rgba(123,232,58,' + (0.22 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(61,154,28,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    for (var i = 0; i < 3; i++) {
      var k = (ob.spin * 0.7 + i * 0.41) % 1;
      ctx.fillStyle = i % 2 ? P.limeGlow : P.limeHi;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), y - 8 - Math.round(k * 7), 1, 1);
    }
    ctx.drawImage(T.lime.canvas, x - 4, y - 5);
  }

  /* the golden apple comes down fast, so its trail is ABOVE it */
  function drawGoldDrop(ctx, ob, x, y) {
    var pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
    var r = Math.round(11 + pulse * 4);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(255,229,124,' + (0.40 * pulse).toFixed(3) + ')');
    g.addColorStop(0.55, 'rgba(241,194,49,' + (0.18 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(176,122,16,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    var a = ctx.globalAlpha;
    for (var i = 0; i < 4; i++) {
      ctx.globalAlpha = a * (i > 1 ? 0.5 : 1);
      ctx.fillStyle = i % 2 ? P.goldShine : P.goldLit;
      ctx.fillRect(x - 2 + Math.round(Math.sin(ob.spin * 3 + i) * 3), y - 7 - i * 4, 1, 1);
    }
    ctx.globalAlpha = a;
    ctx.drawImage(T.gold.canvas, x - 5, y - 6);
  }

  /* the spot on the bough a fruit is heading for: it tightens and darkens
     as the fruit drops, so the landing is never a surprise */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var kind = kindOf(ob);
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(11 - k * 5);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3,
              kind === 'lime' ? P.limeHi : (kind === 'gold' ? P.goldLit : P.shade),
              6 + k * 9);
  }

  /* what is left of one that made it all the way down: band, centre,
     shine, and two bits of skin thrown clear */
  var SPLAT_COLS = {
    apple:  [P.appleFlesh, P.appleMid,  P.appleShine,  P.appleDeep],
    orange: [P.juice,      P.orangeMid, P.orangeShine, P.orangeDeep],
    lime:   [P.limeHi,     P.limeMid,   P.limeGlow,    P.limeDeep],
    gold:   [P.goldLit,    P.goldMid,   P.goldShine,   P.goldDeep]
  };

  function drawDropSplat(ctx, ob) {
    var kind = kindOf(ob);
    var gold = kind === 'gold';
    /* a missed golden apple is gone inside the first 60% of the splat's
       life - a miss should not sit there rubbing it in */
    var k = gold ? clamp((ob.broken - SPLAT_TIME * 0.4) / (SPLAT_TIME * 0.6), 0, 1)
                 : clamp(ob.broken / SPLAT_TIME, 0, 1);
    var cols = SPLAT_COLS[kind] || SPLAT_COLS.apple;
    var x = Math.round(ob.x), y = FLOOR + 1;
    var spread = Math.round((gold ? 5 : 7) + (1 - k) * 3);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);
    ctx.fillStyle = cols[0]; ctx.fillRect(x - spread, y + 1, spread * 2, 2);
    ctx.fillStyle = cols[1]; ctx.fillRect(x - 3, y, 7, 2);
    ctx.fillStyle = cols[2]; ctx.fillRect(x - 1, y, 2, 1);
    ctx.fillStyle = cols[3];
    ctx.fillRect(x - spread - 2, y + 2, 2, 1);
    ctx.fillRect(x + spread, y + 1, 2, 1);
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------- the pomegranate

     It hangs from the ceiling, which is the mirror of the Garden's
     succulent sitting in a pot on the floor: the succulent is a small
     deliberate dive, this is a small deliberate climb. `ob.y` is the
     fruit's centre at rest, and ob.dx/ob.dy is where Gerald's hunger has
     dragged it off the stem. The swing is drawn only - it is never
     written into ob.dx, which belongs to the hunger. */
  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var swing = Math.round(Math.sin(clock * 1.4 + ob.phase) * 2);
    var hx = Math.round(ob.x);
    var rx = Math.round(ob.x + ob.dx) + swing;
    var ry = Math.round(ob.y + ob.dy);
    var lifted = ob.dy > 1 || ob.dx > 1 || ob.dx < -1;
    var i;

    /* the only rose light on the level - the lime's is acid, the golden
       apple's is yellow - and it travels with the fruit */
    var pulse = 0.7 + 0.3 * Math.sin(clock * 2.1 + ob.phase);
    var r = Math.round(14 + pulse * 4);
    var g = ctx.createRadialGradient(rx, ry, 1, rx, ry, r);
    g.addColorStop(0, 'rgba(255,180,167,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(198,47,57,' + (0.14 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(122,21,32,0)');
    ctx.fillStyle = g;
    ctx.fillRect(rx - r, ry - r, r * 2, r * 2);

    /* the stalk, which stays on the ceiling whatever happens to the fruit */
    ctx.drawImage(T.hanger.canvas, hx - 8, CEIL);
    ctx.fillStyle = P.stem;
    ctx.fillRect(hx + Math.round(swing / 2), CEIL + 12, 1, 1);

    if (lifted) {
      /* seeds dribbling out of the torn shoulder as it comes off */
      for (i = 0; i < 3; i++) {
        var kk = (clock * 0.5 + i * 0.33) % 1;
        ctx.fillStyle = i % 2 ? P.arilPink : P.arilDark;
        ctx.fillRect(rx - 2 + i * 2, ry - 8 + Math.round(kk * 6), 1, 1);
      }
      ctx.fillStyle = P.arilPink;
      ctx.fillRect(hx, CEIL + 12, 1, 1);
    }

    ctx.drawImage(T.pom.canvas, rx - 7, ry - 7);

    for (i = 0; i < 2; i++) {
      var k = (clock * 0.22 + i * 0.5) % 1;
      ctx.fillStyle = i ? P.pomShine : P.leafPale;
      ctx.fillRect(rx - 4 + i * 7, ry - 9 - Math.round(k * 9), 1, 1);
    }
  }

  /* ---------------------------------------------- ground dressing */

  /* harmless things resting on the limb, so the bough is not a bare stripe */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x);
    if (ob.kind === 0) {
      /* A windfall: one that came down days ago and went over. Drawn
         from its own bake, NEVER from T.apple/T.orange - see the
         windfall section. Rows 0-3 land on FLOOR-3..FLOOR, so its last
         row takes out the bough's lit crest for its own width, and the
         contact shadow lands on FLOOR+1. The Tint then pools the
         limb's own shade over its base and a pixel either side. */
      ctx.drawImage(T.windfall[ob.fruit ? 'apple' : 'orange'].canvas, x, FLOOR - 3);
      Tint.rect(ctx, x - 1, FLOOR - 1, 11, 4, P.shade, 5);
    } else if (ob.kind === 1) {
      leafBig(ctx, x, FLOOR - 4, 1, P.leafDry, P.leafDry);
      leafBig(ctx, x + 7, FLOOR - 3, -1, P.leafMid, P.leafHi);
    } else {
      /* a broken twig lying along the bough */
      ctx.fillStyle = P.twigMid; ctx.fillRect(x, FLOOR - 2, 12, 1);
      ctx.fillStyle = P.twigLit; ctx.fillRect(x + 2, FLOOR - 3, 6, 1);
      ctx.fillStyle = P.twigMid; ctx.fillRect(x + 8, FLOOR - 5, 1, 3);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawSpurs(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ------------------------------------------------- the cover art

     The little window on the level select. It must read at a glance as
     BLUE, BRIGHT, a dark trunk with a gap, fruit - if it reads as green
     it has failed, and the test is to look at it beside the Garden's
     card. The caller has already clipped to the box, so nothing here
     clips or restores. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var canopy = y + Math.round(h * 0.14);
    var floorY = y + h - Math.round(h * 0.16);
    var i, k;

    /* sky, deeper at the top, with the sun blazing in the corner */
    ctx.fillStyle = P.skyMid; ctx.fillRect(x, y, w, h);
    Tint.rect(ctx, x, y, w, Math.round(h * 0.35), P.skyDeep, 5);
    Tint.rect(ctx, x, y + h - 30, w, 30, P.skyPale, 6);
    Tint.rect(ctx, x + 1, y + 1, 22, 18, P.sunGlare, 3);
    Tint.rect(ctx, x + 4, y + 4, 16, 12, P.sunGlare, 7);

    /* The far side of the crown, filling the card the way it fills the
       level. The cover used to be an open blue field with one bough across
       it, which sold a level that no longer exists: in play the sky is 13%
       of the frame and arrives as chinks. Two hashed passes of 2x2 blocks,
       the second offset, leave irregular gaps for the sky rather than a
       grid - a single pass on a 2px lattice reads as gingham. */
    for (var fy = y; fy < y + h; fy += 2) {
      for (var fx = x; fx < x + w; fx += 2) {
        var fn = (Math.imul(fx - x + 7, 2246822519) ^ Math.imul(fy - y + 13, 3266489917)) >>> 0;
        var v = (fn >>> 13) % 100;
        if (v < 17) continue;                       /* this one stays sky */
        ctx.fillStyle = v < 38 ? P.leafWall : (v < 62 ? P.leafFar
                      : (v < 82 ? P.leafShade : P.leafHaze));
        ctx.fillRect(fx, fy, 2, 2);
      }
    }
    /* a paler wash low down, so the card has the same depth gradient the
       level does and the trunks still read against it */
    Tint.rect(ctx, x, y + Math.round(h * 0.45), w, h - Math.round(h * 0.45), P.leafHaze, 4);
    Tint.rect(ctx, x, y, w, Math.round(h * 0.30), P.leafDeep, 4);

    /* a background bough crossing behind everything, drifting as it goes.
       It is painted in barkLit and barkMid, which puts it lighter than
       the trunks by construction rather than by a haze pass. */
    var span = w + 16;
    var bx0 = x + w + 8 - ((s * 0.3) % span);
    for (i = 0; i <= span / 2; i++) {
      var bk = i / (span / 2);
      var pbx = Math.round(lerp(bx0, bx0 - span, bk));
      var pby = Math.round(lerp(canopy - 2, floorY - 10, bk));
      if (pbx < x - 2 || pbx > x + w) continue;
      ctx.fillStyle = P.barkLit; ctx.fillRect(pbx, pby, 2, 6);
      ctx.fillStyle = P.barkMid; ctx.fillRect(pbx, pby + 4, 2, 2);
    }

    /* the canopy across the top. The leaf positions come off a cheap hash
       rather than a modulus: `i % k` marches along in a sawtooth and the
       band reads as a comb. */
    ctx.fillStyle = P.leafDeep; ctx.fillRect(x, y, w, canopy - y);
    for (i = 0; i < 14; i++) {
      var n = (i * 1103515245) >>> 0;
      var lx = x + (n >>> 17) % Math.max(1, w - 4);
      var ly = y + 1 + ((n >>> 9) % Math.max(1, canopy - y - 3));
      leafSmall(ctx, lx, ly, (n >>> 5) % 3 ? P.leafMid : P.leafHi, (n & 1) ? 1 : -1);
    }
    ctx.fillStyle = P.skyWhite;
    for (i = 0; i < 6; i++) {
      var cn = (i * 2654435761) >>> 0;
      ctx.fillRect(x + (cn >>> 18) % Math.max(1, w - 2), y + (cn >>> 11) % Math.max(1, canopy - y - 2), 2, 1);
    }
    ctx.fillStyle = P.barkLit; ctx.fillRect(x, canopy - 4, w, 1);
    ctx.fillStyle = P.barkMid; ctx.fillRect(x, canopy - 3, w, 2);

    /* two or three sprays hanging out of it, one carrying an orange */
    for (var v = 0; v < 3; v++) {
      var vx = Math.round(x + ((v * 37 - s * 0.5) % (w + 14)) - 7);
      if (vx < x - 2 || vx > x + w) continue;
      var vlen = 8 + (v % 3) * 5;
      ctx.fillStyle = P.stem; ctx.fillRect(vx, canopy, 1, vlen);
      ctx.fillStyle = P.leafSun; ctx.fillRect(vx - 2, canopy + vlen - 3, 5, 3);
      if (v === 1) {
        ctx.fillStyle = P.orangeMid; ctx.fillRect(vx - 1, canopy + vlen, 3, 3);
        ctx.fillStyle = P.orangeLit; ctx.fillRect(vx - 1, canopy + vlen, 1, 1);
      }
    }

    /* Foliage massed on the limb, its tops poking up into the sky. The
       heights come off a cheap hash rather than a modulus: `i % k` marches
       along in a sawtooth and the band reads as a comb. The mass below is
       laid in from floorY+5 so nothing fringes out under the bark. */
    ctx.fillStyle = P.leafShade; ctx.fillRect(x, floorY + 5, w, y + h - floorY - 5);
    for (var band = 0; band < 3; band++) {
      for (i = 0; i < w / 4 + 2; i++) {
        var hn = (i * 1103515245 + band * 12345) >>> 0;
        var px2 = x + ((i * 5 + band * 3) % (w + 4)) - 2;
        var ph = 3 + (hn >>> 16) % 7;
        ctx.fillStyle = ((hn >>> 6) % 3) ? P.leafMid : P.leafHi;
        ctx.fillRect(px2, floorY + band * 2 - ph, 3, ph);
      }
    }
    ctx.fillStyle = P.barkPale; ctx.fillRect(x, floorY, w, 1);
    ctx.fillStyle = P.barkLit;  ctx.fillRect(x, floorY + 1, w, 1);
    ctx.fillStyle = P.barkMid;  ctx.fillRect(x, floorY + 2, w, 2);
    ctx.fillStyle = P.outline;  ctx.fillRect(x, floorY + 4, w, 1);

    /* the dark trunks sliding past, with a gap you could fly through */
    var period = big ? 46 : 38;
    var vspan = floorY - canopy;
    for (k = 0; k < 3; k++) {
      var ox = Math.round(x + w + 10 - ((s + k * period) % (period * 3)));
      if (ox < x - 12 || ox > x + w + 2) continue;
      var gapH = Math.round(vspan * 0.36);
      /* the three gaps have to sit clear of the canopy band AND clear of
         each other, or two of the trunks read as one unbroken pole and
         the card stops saying "there is a gap you fly through" */
      var gapY = Math.round(canopy + 6 + ((k * 9 + 5) % Math.max(1, vspan - gapH - 14)));
      trunk(ctx, ox, canopy, gapY - canopy);
      trunk(ctx, ox, gapY + gapH, floorY - gapY - gapH);
    }

    /* an apple and an orange falling in turn, and a pomegranate dangling */
    var ty = y + 6 + ((s * 1.6) % Math.max(1, floorY - y - 10));
    ctx.fillStyle = P.appleMid; ctx.fillRect(x + Math.round(w * 0.72), Math.round(ty), 3, 3);
    ctx.fillStyle = P.barkDark; ctx.fillRect(x + Math.round(w * 0.72) + 1, Math.round(ty) - 1, 1, 1);
    var ty2 = y + 6 + ((s * 1.6 + (floorY - y - 10) * 0.5) % Math.max(1, floorY - y - 10));
    ctx.fillStyle = P.orangeMid; ctx.fillRect(x + Math.round(w * 0.55), Math.round(ty2), 3, 3);
    ctx.fillStyle = P.orangeLit; ctx.fillRect(x + Math.round(w * 0.55), Math.round(ty2), 1, 1);
    var pmx = x + Math.round(w * 0.86);
    ctx.fillStyle = P.stem;    ctx.fillRect(pmx + 1, canopy, 1, 4);
    ctx.fillStyle = P.pomMid;  ctx.fillRect(pmx, canopy + 4, 3, 3);
    ctx.fillStyle = P.pomLit;  ctx.fillRect(pmx, canopy + 4, 1, 1);
    ctx.fillStyle = P.pomDeep; ctx.fillRect(pmx + 1, canopy + 7, 1, 1);

    /* The doodad. Its halo is DARK here: against a bright sky a dark edge
       is what separates it, which is the same trick the Garden plays with
       wall-shadow against pale stucco, the other way up. It is laid down
       tight to the sprite rather than as the Garden's loose square: over
       flat stucco a big soft square has no visible corners, but over flat
       blue it reads as a rectangle somebody left on the card. One pixel
       proud of the outline all round is all it takes here. */
    var bx = Math.round(x + w * 0.3);
    var by = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, bx - sz / 2 - 2, by - sz / 2 - 2, sz + 4, sz + 4, P.leafDeep, 6);
    ctx.fillStyle = P.outline;  ctx.fillRect(bx - sz / 2 - 1, by - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(bx - sz / 2, by - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(bx - sz / 2, by - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(bx + sz / 2 - 2, by - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(bx + sz / 2, by, 2, 1);

    Tint.rect(ctx, x, y, w, h, P.sunGlare, 1);
  }

  /* one little dark trunk inside a cover */
  function trunk(ctx, x, y, h) {
    if (h <= 0) return;
    ctx.fillStyle = P.outline;  ctx.fillRect(x, y, 1, h);
    ctx.fillStyle = P.barkMid;  ctx.fillRect(x + 1, y, 2, h);
    ctx.fillStyle = P.barkDark; ctx.fillRect(x + 3, y, 4, h);
    ctx.fillStyle = P.barkDeep; ctx.fillRect(x + 7, y, 1, h);
    ctx.fillStyle = P.outline;  ctx.fillRect(x + 8, y, 1, h);
    for (var ly = y + 3; ly < y + h; ly += 11) {
      ctx.fillStyle = P.lichenGrey; ctx.fillRect(x + 1, ly, 1, 1);
    }
    for (var ry = y + 6; ry < y + h; ry += 13) {
      ctx.fillStyle = P.barkDeep; ctx.fillRect(x + 1, ry, 7, 1);
    }
  }

  /* ---------------------------------------------------- generation */

  function makePillar(x, gapY, gapH) {
    var stubs = [];
    for (var i = 0; i < 3; i++) {
      stubs.push({ k: rand(0.08, 0.92), side: chance(0.5),
                   len: randInt(3, 6), bend: rand(0, TAU) });
    }
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.35) ? 1 : 0, stubs: stubs, scored: false };
  }

  function makeSpikes(x, side, count, maxLen) {
    var spikes = [], dx = 0;
    for (var i = 0; i < count; i++) {
      /* a twig is stiffer than mint, so it never runs the whole way from
         its own maxLen down to half of it */
      spikes.push({ dx: dx, len: Math.round(rand(maxLen * 0.6, maxLen)),
                    bend: rand(0, TAU), fork: rand(0.55, 0.8),
                    leaf: chance(0.35), phase: rand(0, TAU) });
      dx += randInt(5, 8);
    }
    return { type: 'spike', x: x, side: side, spikes: spikes, w: dx + 2 };
  }

  /* A fruit letting go of its stem. x and y are its CENTRE, because it
     falls and rocks rather than sitting on a grid; `fall` is its starting
     speed downward and DROP_GRAV does the rest.
     The engine only ever says whether this one is the power-up, so
     everything else about it is decided here: the golden apple's odds,
     and the strict apple/orange alternation, which is the point - the sky
     is never two of the same green in a row. */
  function makeDrop(x, spicy, fall) {
    var ob = { type: 'drop', x: x, y: CEIL + 6, broken: 0, spin: rand(0, TAU) };
    if (spicy) {
      ob.kind = 'lime'; ob.spicy = true; ob.w = 8; ob.vy = fall;
      ob.spinRate = rand(2.2, 4.6) * (chance(0.5) ? -1 : 1);
      return ob;
    }
    ob.spicy = false;
    if (goldGap > 0) goldGap--;
    if (goldGap <= 0 && chance(GOLD_CHANCE)) {
      goldGap = GOLD_GAP;
      ob.kind = 'gold'; ob.gold = true; ob.w = 10;
      /* it is the one thing here that drops rather than falls */
      ob.vy = fall * 2.4 + 50;
      ob.spinRate = rand(3.5, 7) * (chance(0.5) ? -1 : 1);
      return ob;
    }
    ob.kind = nextKind;
    nextKind = nextKind === 'apple' ? 'orange' : 'apple';
    ob.w = 9; ob.vy = fall;
    ob.spinRate = rand(2.2, 4.6) * (chance(0.5) ? -1 : 1);
    return ob;
  }

  /* The pomegranate, hanging off a twig on the ceiling. `y` is where it
     is grabbed - the engine defaults a boon to the floor, so a boon that
     is anywhere else says so on the object. `name` and `burst` are the
     caption and the particle colours: a pomegranate bursts into seeds,
     not into jade rosette leaves. dx/dy is where the hunger has dragged
     the fruit, and is zero for every other doodad. */
  function makeBoon(x) {
    return { type: 'boon', x: x, y: CEIL + 18, w: 16, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0,
             name: 'POMEGRANATE',
             burst: [P.arilPink, P.pomLit, P.pomShine, P.leafHi] };
  }

  function makeLitter(x) {
    return { type: 'litter', x: x, w: 16, kind: randInt(0, 2), fruit: chance(0.5) };
  }

  /* collision rectangles in screen space. Every lethal pixel has a box
     and nothing that is not lethal has one: the stubs are lethal wood and
     get boxes, the cap tufts, the lichen, the knot, the spur forks and
     the clinging dead leaves are decoration and get none. */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
      /* The sawn stubs widen the column where they stick out - at most
         6px, so they never reach into the gap. The segment and the row
         come from stubSeg/stubY, the same two functions drawStubs uses,
         so the box is exactly the three rows of wood that were painted:
         drawStubs fills ty-1, ty and ty+1, and the run of pixels is
         bx .. bx + len inclusive, which is len+1 wide. */
      for (var i = 0; i < ob.stubs.length; i++) {
        var st = ob.stubs[i];
        var seg = stubSeg(ob, st.k < 0.5);
        if (seg.h <= 14) continue;
        var ty = stubY(st, seg) - 1;
        if (st.side) out.push([ob.x + ob.w - 1, ty, st.len + 1, 3]);
        else out.push([ob.x - st.len, ty, st.len + 1, 3]);
      }
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      var kind = kindOf(ob);
      /* the two collectables get generous boxes and the two hazards get
         boxes a shade tighter than their art: catching is meant to be
         easy and dodging is meant to be fair */
      if (kind === 'lime') out.push([ob.x - 5, ob.y - 6, 10, 12]);
      else if (kind === 'gold') out.push([ob.x - 6, ob.y - 6, 12, 12]);
      else out.push([ob.x - 4, ob.y - 4, 8, 9]);
    } else if (ob.type === 'boon') {
      /* the fruit is what you collect, so the box travels with it, and it
         is wide enough that the +-2px swing never carries the art out */
      if (!ob.taken) out.push([ob.x + ob.dx - 8, ob.y + ob.dy - 8, 16, 17]);
    } else if (ob.type === 'spike') {
      /* only the WOOD is lethal. The fork, the dry leaf and the sway are
         decoration; the sway is allowed to carry the drawn tip a pixel
         outside its box, because the Coop's nails already bend 2.6px
         outside theirs and that precedent is generous to the player. */
      for (var k = 0; k < ob.spikes.length; k++) {
        var n = ob.spikes[k];
        if (ob.side === 'ceil') out.push([ob.x + n.dx, CEIL, 2, n.len]);
        else out.push([ob.x + n.dx, FLOOR - n.len, 2, n.len]);
      }
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
