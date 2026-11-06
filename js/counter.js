/* ------------------------------------------------------------------
   Land of Doodads - THE KITCHEN / THE COUNTER  (4-2)

   Night. You are flying ALONG THE BACK COUNTER with your chin on the
   quartz, facing the backsplash: the white stone is the ground band,
   the underside of the uppers with the warm strip of light under them
   is the lid, and in between is the splash - the iridescent linear
   mosaic of pearl glass, marble and brushed silver, raked from above
   by that strip of light and going grey toward the stone. Everything
   the owner keeps on this counter stands against it, at its true size,
   in its true order (Counter ref 1-12): the ice cream maker and the
   panini press under the microwave's shelf, the potatoes and the wire
   basket of onions, the monstera in its white pot in front of the
   corner window, the bean canister, the Breville, the grinder and its
   cups, the Instant Pot, the air fryer, the knife block, the two oil
   jars, the paper towels and the crock, the end-grain board lying flat
   in front of the sink window. The shutters are black between their
   louvres, because it is night outside.

   THE OWNER PICKED THE BIG THINGS HIMSELF and this file does not
   re-decide them:
     - the PILLARS are stacks of end-grain cutting boards standing on the
       quartz (a stack of them seen edge-on IS a checkerboard), and the
       glass-front upper cabinets with their nickel bar pulls hanging from
       the lid, each with its own strip of light underneath;
     - KNIVES fall point-first off the uppers - paring, steak and chef's,
       out of the Calphalon block - and stick, quivering, in a board;
     - THE APPLIANCES each pose one threat, with a telegraph you can see
       AND hear, and that is this bay's signature (see THE MACHINES);
     - a Tabasco-style bottle is the heat, a pair of spent espresso pucks
       off the baking sheet is the spare life ("coffee grounds"), and a
       pair of mixer beaters is the spin.

   ONE SCALE FOR EVERYTHING ON THE COUNTER, 1.3 px per cm, obstacle and
   scenery alike, so the proportions between things he owns are true:
   the Instant Pot is 43 wide, the Breville with its hopper 52 tall, the
   knife block 30, a board 34 (the pillar's column). 1.3 and not more
   because the tallest machine has to stay under the lowest lane: the
   Breville's hopper tops out at row 190, and a doodad threading the
   lowest gap the tune makes (81, centre 167.5) has his hitbox bottom at
   178.5. The microwave on its shelf hangs with its top up behind the
   lid and the sign under the shelf ending on row 58 - level with the top
   edge of the highest gap the room can make (CEIL + 34), so a doodad
   threading any gap has his head clear of it.

   AND ONE HONEST FICTION, stated here so nobody has to discover it: the
   lane is 218 px tall and the real gap between the counter and the
   uppers is 46 cm, which is 60 px at this scale. Every bay has this -
   the Table's dish stacks are 1.7 m tall by the same arithmetic. What the
   owner checks is the proportion between objects and the grain of the
   mosaic against them, so the mosaic is laid at a 4 px row pitch (a 3 px
   strip and a pixel of grout): the Instant Pot stands eleven strips tall,
   an outlet plate four, which is what refs 7, 9 and 10 show. At the pitch
   a lens five centimetres off the stone would truly see, the strips would
   be 13 px rows and read as subway tile, dwarfing every object on the
   counter. The outlets are at their true height, just over the machines.

   DEPTH, near to far: the band of quartz (1.0) with the litter and the
   gifts on it; the pillars, the machines, the knives and the doodad
   (1.0); the back ten centimetres of the counter (0.94) with the baking
   sheet of spent pucks drying on it; the splash and everything standing
   against it, windows included (0.88, the Bar's wall). The lid is the
   underside of the uppers directly over the lane (1.0).

   THE LIGHT. The only light in the room is the warm strip under the
   uppers, so the splash is bright for its top forty rows and falls away
   to a warm grey toward the stone. The first wall was too dark - the
   owner's word, 2026-11-01 - so it was lifted a step (see THE NIGHT at
   bakeWall for the numbers). The windows have no uppers over them, so no
   light falls on their shutters but what the room bounces. Everything
   that ACTS in this bay is still brighter than the wall it crosses, or
   ringed against it: steam 234, the scoops 240, a blade 215 with its
   black handle 30, the boards' maple 205 and walnut 70 with a ring round
   both, the cabinets' cream 195 round a dark pane. The machines are NOT
   on the wall - each one comes past in the play plane, and only there.

   Same discipline as every other level file: every pixel is generated
   and baked once in build(), anything laid over something that scrolls
   is a flat Tint or a baked alpha sheet - there is no Dither in this
   file - and nothing turns by ctx.rotate: a falling knife leans by baked
   frames, a lid lifts by baked frames, and the jets are plotted.
------------------------------------------------------------------ */
'use strict';

var Counter = (function () {

  /* the house: the Kitchen's shared pigments, and the helpers it
     republishes from the rooms before it */
  var K = Kitchen.P;
  var CEIL = Kitchen.CEIL, FLOOR = Kitchen.FLOOR;
  var wrap = Kitchen.wrap, hash = Kitchen.hash, ringOf = Kitchen.ringOf;
  var glow = Kitchen.glow, blitBelowCeil = Kitchen.blitBelowCeil;
  var ease = Kitchen.ease, rgba = Kitchen.rgba;

  /* The bay's own pigments. PlayScene never reads this table. */
  var P = {
    /* STEAM - the espresso's jet and the Instant Pot's geyser. Cool white,
       the brightest thing on the screen after the sparks: 234 over a wall
       that is 120..165 */
    steam:       '#e7ecef',
    steamHi:     '#ffffff',
    steamDeep:   '#9aa5ac',
    steamShade:  '#c4cdd3',     /* the underside of a billow, between the two */

    /* THE BOARDS - end-grain cutting boards, three woods glued in a
       checker: walnut, maple and cherry, each with its lit top arris and
       its shade along the bottom of the board */
    walnut:      '#5a3a24', walnutLit:   '#7a5236', walnutShade:  '#3d2616',
    maple:       '#d9b98a', mapleLit:    '#ecd2a6', mapleShade:   '#b89566',
    cherry:      '#a9643a', cherryLit:   '#c47f52', cherryShade:  '#7f4526',
    boardSeam:   '#1d1410',

    /* the machines' little lights: the press's blue readout, the fryer's
       red countdown, the microwave's green clock, the pot's pale display
       and the Breville's orange power lamp */
    ledBlue:     '#4d7dff', ledBlueHi:   '#9fc0ff', ledBlueDim:   '#26346a',
    ledRed:      '#ff5a3c', ledRedHi:    '#ffb09a', ledRedDim:    '#55201a',
    ledGreen:    '#5aff6e', ledGreenDim: '#1f4f28',
    ledPale:     '#cfe3ff', ledOrange:   '#ff9a2a',
    cavity:      '#f0d28a', cavityDeep:  '#b68c3c', cavityBack:   '#7a5a26',
    heatGlow:    '#ff9a3a',
    ridge:       '#2a2a2c',
    plate:       '#3e3634', plateGlow:   '#7a3a20', plateHot:    '#d0602a',
    gaugeFace:   '#e8e4da', gaugeRed:    '#d23a2a',
    panelFace:   '#cfccc4', panelShade:  '#a9a69f',
    lidGlass:    'rgba(220,235,245,0.55)',
    glassHi:     '#ffffff',

    /* THE SCOOPS - ice cream frozen rock hard, flung: a cream body that
       goes cold blue-grey in its shade, a cold rim and frost. Never warm,
       never glowing: a gift glows, a scoop is a stone. */
    cream:       '#f6efe0', scoopShade:  '#b9c7d6', scoopRim:     '#5f6c7c',
    frost:       '#dfe9f2',

    /* THE KNIVES' handles - the block's black composite, two steel rivets */
    handle:      '#1c1b1a', handleLit:   '#3a3836',

    /* THE HOT SAUCE: the little Louisiana bottle, red cap, green band */
    capRed:      '#c8231c', capRedHi:    '#ea4a3e', neckGreen:    '#2f8f4e',
    sauce:       '#c01a14', sauceHi:     '#e8453a', sauceDeep:    '#8c1410',
    label:       '#f4efe4',

    /* THE BEATERS - steel wire round the spin's own purple */
    whirl:       '#b061f0', whirlHi:     '#e6b3ff', whirlDark:    '#5a2a8c',

    /* THE PUCKS - spent espresso, packed hard and drying on the sheet */
    puck:        '#3b2518', puckLit:     '#5a3a28', puckHi:       '#8a6040',
    puckTop:     '#6e4a33', puckRim:     '#b08460',
    grounds:     '#2b1a12', bean:        '#3a2416',

    /* the crows' gift, a gold coffee bean */
    gold:        '#f2cf6a', goldDeep:    '#c9a23f', goldHi:       '#fff3c4',

    /* an extra life glows the same jade in every level */
    lifeJade:    '#5fae9a', lifePale:    '#93d8bd',

    /* THE REST OF THE COUNTER, for the splash */
    blockWood:   '#b88a52', blockLit:    '#d4a86a', blockDeep:    '#8a6238',
    oil:         '#d8b92a', oilDark:     '#8f7a1e',
    towel:       '#ece8e0', towelShade:  '#c9c4ba',
    crock:       '#6f6f6c', crockLit:    '#8c8c88',
    bagPaper:    '#c8a07a', bagShade:    '#a3805c', bagPrint:     '#b8452c',
    wire:        '#8e8e8c', onionNet:    '#d86a3c', onion:        '#d9a35a',
    potWhite:    '#e9e6df', potShade:    '#b3aea4',
    jute:        '#b89a62', juteShade:   '#8f7646',
    canisterGlass: 'rgba(230,236,240,0.5)',
    dialGrey:    '#8c8c90',
    teal:        '#6fb7b0',
    script:      '#5a5048',

    outline: K.outline, void: K.void
  };

  /* the neutral effect colours PlayScene paints its particles from */
  var FX = {
    motes: Kitchen.AIR.motes, motesHi: Kitchen.AIR.motesHi,
    /* cream dust off the uppers when a knife lets go */
    puff: '#e9dcc0', puffHi: '#f6ecd6',
    /* quartz chips for the bops and the wall's tick */
    ground: K.quartzShade, groundHi: K.quartzHi,
    /* steel: the default landing (every drop here carries its own burst) */
    splat: K.steel, splatHi: K.steelLit,
    hot: '#f0922e', hotMid: '#ffb347', hotHi: '#ffe08a', heat: '#f0922e', heatEdge: '#b84d12',
    glowCore: '255,224,138', glowEdge: '240,146,46'
  };

  /* The heads-up lines. There is no `spike` line on purpose: the engine
     would say it once when the slot arms, and the first machine says its
     own name a second later - two banners back to back for one thing.
     Each machine introduces itself instead, the first time it comes
     onto the screen (stepWorld), with the move it is about to make. */
  var WARN = {
    drop:     ['▼ KNIVES ▼',            'POINT FIRST. WHERE YOU FLY'],
    ceil:     ['▲ THE CABINETS ▲',      'THE UPPERS END THE RUN'],
    espresso: ['▲ ESPRESSO MACHINE ▲',  'THE WAND BLOWS SIDEWAYS'],
    press:    ['▲ PANINI PRESS ▲',      'DO NOT FLY LOW OVER IT'],
    pot:      ['▲ INSTANT POT ▲',       'THE VALVE. THEN THE GEYSER'],
    fryer:    ['▲ AIR FRYER ▲',         'HOT AIR PUSHES YOU BACK'],
    micro:    ['▼ MICROWAVE ▼',         'SPARKS FROM ABOVE. GO LOW'],
    maker:    ['▲ ICE CREAM MAKER ▲',   'SCOOPS ARE ROCK HARD. UP']
  };

  /* the thirteen colours a generic cover would use; this bay paints its
     own (drawPreview), but the table stays honest */
  var PREVIEW = {
    back: K.splashMarble, backAlt: K.splashPearl, seam: K.splashGrout,
    beam: P.maple, beamDark: P.walnut, beamLight: P.mapleLit,
    ground: K.quartz, groundDark: K.quartzDeep, groundHi: K.quartzHi,
    spike: P.steam, spikeHi: P.steamHi, air: K.underLight, gloom: K.blackGlass
  };

  var END_MIN = Kitchen.END_MIN;
  var CEIL_KILLS = Kitchen.CEIL_KILLS;

  /* STEEL IS HEAVY, the Table's number for its silverware: 213 px of
     fall at 300 takes about 1.1 s. A knife spawned at x 280..380 (the
     tune's dropAhead 100..200) comes down 60..180 px in front of the
     doodad at speedStart. stepDrop owns every drop in this bay; the
     contract publishes the number anyway. */
  var DROP_GRAV = 300;

  /* how long a landed knife stands, or lies, or quivers in a board */
  var SPLAT_TIME = 1.8;

  var BOON_NAME = 'COFFEE GROUNDS';
  var GOLD_NAME = 'BEAN';

  var T = {};                       /* baked tiles and sprites */

  /* --------------------------------------------------------- the rows

     The lid is rows 0..23, the splash 24..229 at the wall's parallax, the
     back of the counter 230..241 a little nearer, the band 242..269. The
     far strip's tile is 769 px wide for the wall's 720, so both come
     round every 818 px of world: the baking sheet is always in front of
     the Breville when the Breville comes past, and slides across it by
     exactly the parallax between the two, and no more. */
  var WALL_W = 720, WALL_H = 206, WALL_PAR = 0.88;
  var WALL_FOOT = WALL_H - 1;              /* tile row of the counter line, screen 229 */
  var FAR_Y = 230, FAR_H = 12, FAR_PAR = 0.94, FAR_W = 769;
  var BAND_W = 384;

  /* the two windows in the wall tile, and where the splash runs under
     them: a sill at tile row 186, mosaic below it */
  var WINDOWS = [174, 584];
  var WIN_W = 78, SILL_Y = 184;

  /* --------------------------------------------------------- helpers */

  function rect(c, x, y, w, h, col) {
    if (w <= 0 || h <= 0) return;
    c.fillStyle = col; c.fillRect(x, y, w, h);
  }
  function dot(c, x, y, col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }

  /* a 1px line between two points, Bresenham, for stems, cords and wire */
  function line(c, x0, y0, x1, y1, col, thick) {
    var dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
    var sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, err = dx + dy, e2;
    c.fillStyle = col;
    for (;;) {
      c.fillRect(x0, y0, thick || 1, thick || 1);
      if (x0 === x1 && y0 === y1) break;
      e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  /* The house's 1px outline, laid UNDER everything painted on a sprite
     canvas so far - ringOf smears the shape a pixel each way and keeps
     what the smear added, so a notch keeps its inside. `alpha` < 1 is the
     scenery's half ring: a full black ring round a kettle on the far wall
     is a cartoon. */
  function ringUnder(t, alpha) {
    var ring = ringOf(t, t.w, t.h);
    t.ctx.globalCompositeOperation = 'destination-over';
    if (alpha !== undefined) t.ctx.globalAlpha = alpha;
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalAlpha = 1;
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }

  function hexRGB(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }

  /* a pigment between two others, as a hex string, for the per-row ramps:
     flat colour row by row, never a dither */
  function mix(a, b, k) {
    var A = hexRGB(a), B = hexRGB(b), o = '#';
    for (var i = 0; i < 3; i++) {
      var v = Math.round(A[i] + (B[i] - A[i]) * k);
      o += (v < 16 ? '0' : '') + v.toString(16);
    }
    return o;
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

  /* An alpha sheet in one colour, painted pixel by pixel through
     ImageData (the Bar's): the heat's wedge and the steam's soft cloud */
  function alphaSheet(w, h, hex, fn) {
    var t = makeCanvas(w, h), img = t.ctx.createImageData(w, h), d = img.data;
    var rgb = hexRGB(hex), x, y, a, i = 0;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        a = fn(x, y);
        if (a > 0) {
          d[i] = rgb[0]; d[i + 1] = rgb[1]; d[i + 2] = rgb[2];
          d[i + 3] = Math.round(clamp(a, 0, 1) * 255);
        }
        i += 4;
      }
    }
    t.ctx.putImageData(img, 0, 0);
    return t;
  }

  /* Walk every painted pixel of a canvas once, at bake time: fn(rgba, x,
     y) changes the four numbers in place. The night's step on the wall,
     and the scenery's step back, are both this. */
  function eachPixel(t, fn) {
    var img = t.ctx.getImageData(0, 0, t.w, t.h), d = img.data, p = [0, 0, 0, 0];
    for (var y = 0; y < t.h; y++) {
      for (var x = 0; x < t.w; x++) {
        var i = (y * t.w + x) * 4;
        if (d[i + 3] === 0) continue;
        p[0] = d[i]; p[1] = d[i + 1]; p[2] = d[i + 2]; p[3] = d[i + 3];
        fn(p, x, y);
        d[i] = clamp(Math.round(p[0]), 0, 255); d[i + 1] = clamp(Math.round(p[1]), 0, 255);
        d[i + 2] = clamp(Math.round(p[2]), 0, 255); d[i + 3] = clamp(Math.round(p[3]), 0, 255);
      }
    }
    t.ctx.putImageData(img, 0, 0);
  }

  function lumOf(p) { return 0.299 * p[0] + 0.587 * p[1] + 0.114 * p[2]; }

  /* Pin a painted pixel's luminance under `cap`, softly: whatever is over
     `knee` keeps a third of its excess. Hue is kept - a pearl strip stays
     warm and a silver one cool - only the value comes down. */
  function softCap(p, knee, cap) {
    var l = lumOf(p);
    if (l <= knee) return;
    var want = Math.min(cap, knee + (l - knee) / 3);
    var k = want / l;
    p[0] *= k; p[1] *= k; p[2] *= k;
  }

  /* ======================================================== THE LID

     The underside of the uppers, close over the lane, and the light
     strip. It has to read as ONE solid cream beam with a lit edge, because
     the kill line is its bottom: the cabinets' shade where they meet the
     wall, the cream underside with a faint grain, the bottom rail of the
     run catching the room, the LED's housing, the strip itself, and the
     housing's lip as the last dark rows - so the brightest thing in the
     band is two rows above an edge, and the edge is crisp. No seams
     between cabinet boxes (the pillar cabinets are 34 px and the real
     doors 50; one run of seams would contradict the other) - but the
     strip's mounting clips, every 96 px, so the lid is seen to move. */
  function bakeLid() {
    var t = makeCanvas(480, CEIL), c = t.ctx, y, x;
    rect(c, 0, 0, 480, 3, K.cabinetDeep);
    for (y = 3; y <= 13; y++) rect(c, 0, y, 480, 1, mix(K.cabinetShade, K.cabinet, (y - 3) / 10));
    /* the underside's grain, faint, every four rows */
    for (y = 5; y <= 13; y += 4) {
      c.globalAlpha = 0.22; rect(c, 0, y, 480, 1, K.cabinetDeep); c.globalAlpha = 1;
    }
    rect(c, 0, 14, 480, 1, K.cabinetLine);
    rect(c, 0, 15, 480, 3, K.cabinetLit);
    rect(c, 0, 18, 480, 1, K.cabinetShade);
    rect(c, 0, 19, 480, 1, K.pullShade);
    rect(c, 0, 20, 480, 1, '#fffaf0');
    rect(c, 0, 21, 480, 1, K.underLight);
    rect(c, 0, 22, 480, 1, K.pullShade);
    rect(c, 0, 23, 480, 1, P.outline);
    for (x = 40; x < 480; x += 96) {
      rect(c, x, 19, 4, 1, K.pull);
      rect(c, x, 22, 4, 1, K.pull);
      rect(c, x + 1, 20, 2, 2, K.pullLit);
    }
    return t;
  }

  /* ===================================================== THE SPLASH

     A linear mosaic in rows of 4 px: a 3 px strip and a pixel of grout,
     strips 12..52 px long (9..40 cm, ref 7's range) in a running bond - no
     joint ever over a joint in the row above - in five materials by
     weight: pearl glass, white marble, frosted glass, brushed silver with
     its textured ticks, and the warm iridescent strips that catch the
     light. Seeded, so it is the same wall every boot, and laid round a
     720 px loop so the wrap has no seam. */
  var MATS = [
    [0.34, 'splashPearl'], [0.26, 'splashMarble'], [0.18, 'splashGlass'],
    [0.14, 'splashSilver'], [0.08, 'splashWarm']
  ];
  function pickMat(u) {
    for (var i = 0; i < MATS.length; i++) { if (u < MATS[i][0]) return i; u -= MATS[i][0]; }
    return 0;
  }

  /* a rect on the 720 loop, cut in two where it crosses the seam */
  function loopRect(c, x, y, w, h, col) {
    x = wrap(x, WALL_W);
    if (x + w <= WALL_W) { rect(c, x, y, w, h, col); return; }
    rect(c, x, y, WALL_W - x, h, col);
    rect(c, 0, y, x + w - WALL_W, h, col);
  }

  function paintStrip(c, x0, y, w, m, r) {
    var base = K[MATS[m][1]], i;
    loopRect(c, x0, y, w, 1, mix(base, K.splashGlint, 0.12));
    loopRect(c, x0, y + 1, w, 1, base);
    loopRect(c, x0, y + 2, w, 1, mix(base, K.splashGrout, 0.12));
    if (m === 0) {
      /* pearl: a fleck of the light at its left end, sometimes a second */
      if (r() < 0.34) loopRect(c, x0 + 1, y, 2, 1, K.splashGlint);
      if (r() < 0.25) loopRect(c, x0 + 3 + Math.floor(r() * (w - 6)), y + 1, 1, 1, K.splashGlint);
    } else if (m === 1) {
      /* marble: a grey vein running across one in four */
      if (r() < 0.25) {
        var vx = x0 + 2 + Math.floor(r() * Math.max(1, w - 8));
        for (i = 0; i < 3; i++) loopRect(c, vx + i * 2, y + i, 2, 1, K.splashGlass);
      }
    } else if (m === 3 && r() < 0.5) {
      /* brushed silver, the textured strips: a fine line of light along
         half of them (a row of ticks reads as stitching, not texture) */
      loopRect(c, x0 + 2, y + 1, Math.max(1, w - 4), 1, mix(base, K.splashGlint, 0.22));
    }
  }

  /* the grout as it reads from a few feet off: a line between strips, not
     a trench - halfway to the marble, or the wall is a stack of slates */
  var GROUT = mix(K.splashGrout, K.splashMarble, 0.45);
  function bakeMosaic(c) {
    var r = mulberry32(4242), prev = [], row, i;
    rect(c, 0, 0, WALL_W, WALL_H, GROUT);
    for (row = 0; row * 4 < WALL_H; row++) {
      var y = row * 4, off = Math.floor(r() * 52), at = off, joints = [];
      while (at < off + WALL_W) {
        var len = 12 + Math.floor(r() * 41), end = at + len;
        /* a running bond: a joint within 3 px of one in the row above
           slides on past it */
        for (var guard = 0; guard < 6; guard++) {
          var clash = false;
          for (i = 0; i < prev.length; i++) {
            if (Math.abs(wrap(end, WALL_W) - prev[i]) < 4) { clash = true; break; }
          }
          if (!clash) break;
          end += 5;
        }
        if (off + WALL_W - end < 12) end = off + WALL_W;
        paintStrip(c, at, y, end - at - 1, pickMat(r()), r);
        joints.push(wrap(end, WALL_W));
        at = end;
      }
      prev = joints;
    }
  }

  /* ------------------------------------------------ the windows

     White plantation shutters, two panels in a 4 px casing, louvres at
     8 px with the night black between them, a tilt rod down each panel
     and a divider rail across both. They run up behind the lid - the
     windows go to the ceiling and the uppers stop beside them - and down
     to a sill ten centimetres over the stone, with the splash under it. */
  /* the night between the louvres: the room's black, lifted toward a
     deep blue-grey with the wall (a black slot read as a hole) */
  var NIGHT_GAP = mix(K.shutterNight, '#56607a', 0.45);
  function bakeWindow(c, x0) {
    var y, i, px;
    rect(c, x0, 0, WIN_W, SILL_Y, K.shutter);
    rect(c, x0, 0, 1, SILL_Y, K.shutterShade);
    rect(c, x0 + WIN_W - 1, 0, 1, SILL_Y, K.shutterDeep);
    for (i = 0; i < 2; i++) {
      px = x0 + 4 + i * 36;
      rect(c, px, 0, 34, SILL_Y - 4, K.shutterShade);
      rect(c, px + 3, 0, 28, SILL_Y - 4, NIGHT_GAP);
      for (y = 2; y < SILL_Y - 6; y += 8) {
        if (y >= 96 && y < 104) continue;          /* the divider rail */
        rect(c, px + 3, y, 28, 1, K.shutterShade);
        rect(c, px + 3, y + 1, 28, 4, K.shutter);
        dot(c, px + 3, y + 1, '#f6f1e4');
        rect(c, px + 3, y + 5, 28, 1, K.shutterDeep);
      }
      /* the rail across the middle, and the tilt rods either side of it */
      rect(c, px + 3, 97, 28, 6, K.shutter);
      rect(c, px + 3, 102, 28, 1, K.shutterDeep);
      rect(c, px + 16, 0, 2, 96, K.shutterShade);
      rect(c, px + 16, 104, 2, SILL_Y - 112, K.shutterShade);
    }
    /* the sill: its lit nosing, its face and the shadow it throws */
    rect(c, x0 - 3, SILL_Y - 4, WIN_W + 6, 1, K.shutter);
    rect(c, x0 - 3, SILL_Y - 3, WIN_W + 6, 2, K.shutterShade);
    rect(c, x0 - 3, SILL_Y - 1, WIN_W + 6, 1, K.shutterDeep);
    c.globalAlpha = 0.35; rect(c, x0 - 2, SILL_Y, WIN_W + 4, 2, P.outline); c.globalAlpha = 1;
  }

  /* ------------------------------------------- what stands on the counter

     Each drawn ONCE, in the real order, feet on the counter line, at the
     bay's one scale. Painted at full value into a layer of their own,
     soft-ringed there, and only then laid on the wall - so the night's
     step that the whole wall takes afterwards takes them with it, and
     their outline is the half ring, never the obstacle's full one. */

  /* an outlet plate, true height (about 28 cm over the stone): a cream
     plate, its shade edge, two sockets; the switch plate is the same with
     a rocker */
  function outletPlate(c, x, y, sw) {
    rect(c, x, y, 9, 15, K.cabinetLit);
    rect(c, x + 8, y, 1, 15, K.cabinetShade);
    rect(c, x, y + 14, 9, 1, K.cabinetShade);
    if (sw) {
      rect(c, x + 3, y + 4, 3, 7, K.cabinet);
      rect(c, x + 3, y + 4, 3, 3, K.cabinetShade);
      dot(c, x + 4, y + 5, K.cabinetLit);
      return;
    }
    rect(c, x + 3, y + 3, 3, 3, K.cabinet);
    rect(c, x + 4, y + 3, 1, 2, P.outline);
    rect(c, x + 3, y + 9, 3, 3, K.cabinet);
    rect(c, x + 4, y + 9, 1, 2, P.outline);
  }

  function bagOfPotatoes(c, x, f) {
    /* the paper sack lying on its side, crumpled closed at the top (ref 4) */
    var W = [30, 33, 35, 37, 38, 39, 39, 39, 39, 39, 39, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 34, 33, 32];
    for (var i = 0; i < W.length; i++) {
      var y = f - W.length + 1 + i;
      rect(c, x + 39 - W[i], y, W[i], 1, i < 3 ? P.bagShade : P.bagPaper);
      dot(c, x + 39 - W[i], y, P.bagShade);
    }
    rect(c, x + 2, f - 23, 7, 3, P.bagShade);            /* the crumpled top */
    rect(c, x, f - 22, 3, 2, P.bagPaper);
    rect(c, x + 12, f - 14, 18, 2, P.bagPrint);          /* the red print, unreadable */
    rect(c, x + 14, f - 10, 13, 1, P.bagPrint);
    rect(c, x + 7, f, 32, 1, P.bagShade);
  }

  function fruitBasket(c, x, f) {
    /* the wire bowl on its stand, netted onions heaped in it (ref 4/5) */
    var i;
    for (i = 0; i < 6; i++) {
      var w = 22 + i * 2;
      rect(c, x + 18 - w / 2, f - 22 + i * 2, w, 1, P.onionNet);
    }
    rect(c, x + 8, f - 26, 20, 4, P.onion);
    rect(c, x + 5, f - 22, 26, 8, P.onion);
    for (i = 0; i < 26; i += 3) dot(c, x + 5 + i, f - 20 + (i % 2) * 3, P.onionNet);
    rect(c, x + 10, f - 27, 8, 2, P.bagPrint);
    for (i = 0; i < 5; i++) line(c, x + 2 + i * 8, f - 14, x + 6 + i * 6, f - 5, P.wire);
    rect(c, x + 1, f - 14, 34, 1, P.wire);
    rect(c, x + 5, f - 9, 26, 1, P.wire);
    rect(c, x + 9, f - 5, 18, 1, P.wire);
    rect(c, x + 8, f - 1, 20, 1, P.wire);
    rect(c, x + 12, f, 12, 1, P.wire);
  }

  /* THE MONSTERA - the only green thing in the bay, and the one plant:
     a white pot on a jute mat in the corner, seven split leaves on long
     stems fanning up and out in front of the shutters, the top ones going
     on up behind the lid because they are under the uppers. Each leaf is
     an ellipse at its own angle with its slits cut from the margin toward
     the midrib, plotted pixel by pixel - not a rotated image. */
  var LEAVES = [
    /* cx, cy (tile rows), half-length, half-width, angle (rad), stem foot dx */
    [20, 64, 17, 14, -0.55, 17], [66, 44, 16, 13, 0.6, 22], [6, 116, 14, 12, -1.15, 15],
    [76, 106, 14, 12, 1.05, 23], [42, 24, 16, 13, 0.08, 20], [28, 146, 12, 10, -1.45, 17],
    [58, 156, 12, 10, 1.35, 21]
  ];
  function monsteraLeaf(c, L, ox) {
    var cx = ox + L[0], cy = L[1], a = L[2], b = L[3], th = L[4];
    var cs = Math.cos(th), sn = Math.sin(th), x, y, k;
    for (y = Math.floor(cy - a - 1); y <= cy + a + 1; y++) {
      for (x = Math.floor(cx - a - 1); x <= cx + a + 1; x++) {
        var dx = x - cx, dy = y - cy;
        /* leaf coordinates: u along the midrib (tip at +a), v across */
        var u = dx * sn - dy * cs, v = dx * cs + dy * sn, av = Math.abs(v);
        /* a heart: broad toward the stem, coming to a point */
        var bw = b * (1.05 - 0.35 * Math.max(0, u / a));
        var e = (u * u) / (a * a) + (v * v) / (bw * bw);
        if (e > 1) continue;
        /* the notch where the stem goes in */
        if (u < -a * 0.7 && av < b * 0.22) continue;
        /* the splits, from the margin in toward the rib, swept toward the tip */
        var cut = false;
        for (k = -2; k <= 2; k++) {
          if (Math.abs(u - k * a * 0.3 - av * 0.45) < 0.75 && av > b * 0.34) cut = true;
        }
        /* and the holes along the rib */
        for (k = -1; k <= 1; k++) {
          var hu = (u - k * a * 0.3 - 0.15 * a) / (a * 0.08), hv = (av - b * 0.24) / (b * 0.07);
          if (hu * hu + hv * hv < 1) cut = true;
        }
        if (cut) continue;
        var col = K.leaf;
        if (av < 0.6) col = K.leafDeep;
        else if (v < 0) col = e > 0.7 ? K.leafLit : K.leaf;
        else if (e > 0.6) col = K.leafDeep;
        dot(c, x, y, col);
      }
    }
  }
  function monstera(c, x, f) {
    var i;
    /* the jute mat, the pot and its shade */
    rect(c, x - 6, f - 2, 52, 3, P.jute);
    for (i = 0; i < 52; i += 4) dot(c, x - 6 + i, f - 1, P.juteShade);
    var PW = [31, 33, 35, 37, 38, 39, 39, 39, 39, 39, 39, 38, 38, 37, 37, 36, 36, 35, 35, 34, 34, 33, 33, 32, 32, 31, 31, 30, 30, 29];
    var base = f - 2 - PW.length;
    for (i = 0; i < PW.length; i++) {
      var w = PW[i], px = x + Math.round((39 - w) / 2);
      rect(c, px, base + i, w, 1, P.potWhite);
      rect(c, px + w - 9, base + i, 9, 1, P.potShade);
      dot(c, px + 2, base + i, '#f8f6f0');
    }
    rect(c, x + 4, base, 31, 1, P.potShade);           /* the rim's inside */
    /* the stems, then the leaves on them */
    for (i = 0; i < LEAVES.length; i++) {
      var L = LEAVES[i];
      var ex = x - 20 + L[0] - Math.round(Math.sin(L[4]) * -L[2] * 0.8);
      var ey = L[1] + Math.round(Math.cos(L[4]) * L[2] * 0.8);
      line(c, x + L[5], base - 1, ex, ey, K.leafDeep);
    }
    for (i = 0; i < LEAVES.length; i++) monsteraLeaf(c, LEAVES[i], x - 20);
  }

  function beanCanister(c, x, f) {
    /* the clear OXO canister of beans, white lid (ref 3/6) */
    rect(c, x, f - 26, 14, 3, K.cabinetLit);
    rect(c, x, f - 23, 14, 1, K.cabinetShade);
    rect(c, x, f - 22, 14, 23, '#b9bdbe');
    rect(c, x + 1, f - 14, 12, 15, P.bean);
    for (var i = 0; i < 18; i++) {
      var h = hash(i * 37 + 5);
      dot(c, x + 1 + h % 12, f - 13 + (h >>> 4) % 14, '#5a3a24');
    }
    rect(c, x, f - 22, 1, 23, '#e3e7e8');
    rect(c, x + 13, f - 22, 1, 23, '#8f9496');
  }

  function grinder(c, x, f) {
    /* the black burr grinder with its round dial (ref 1/10) */
    rect(c, x, f - 38, 16, 39, K.blackGlass);
    rect(c, x, f - 38, 16, 1, K.blackGlassLit);
    rect(c, x, f - 38, 1, 39, K.blackGlassLit);
    rect(c, x + 3, f - 26, 9, 9, K.blackGlassLit);
    rect(c, x + 4, f - 25, 7, 7, P.dialGrey);
    dot(c, x + 7, f - 24, K.blackGlass);
    rect(c, x + 2, f - 8, 12, 1, K.blackGlassLit);
  }

  function cupsAndPitcher(c, x, f) {
    rect(c, x, f - 8, 9, 9, K.blackGlass); rect(c, x, f - 8, 9, 1, K.blackGlassLit);
    rect(c, x + 10, f - 8, 9, 9, K.blackGlass); rect(c, x + 10, f - 8, 9, 1, K.blackGlassLit);
    /* the steel milk pitcher in front of them, lit */
    rect(c, x + 4, f - 10, 11, 11, K.steel);
    rect(c, x + 4, f - 10, 2, 11, K.steelLit);
    rect(c, x + 13, f - 10, 2, 11, K.steelShade);
    rect(c, x + 3, f - 11, 3, 1, K.steelLit);
    rect(c, x + 15, f - 7, 2, 5, K.steelShade);
  }

  function sauceBottles(c, x, f) {
    for (var i = 0; i < 2; i++) {
      var bx = x + i * 7;
      rect(c, bx + 1, f - 12, 3, 3, i ? P.capRed : K.blackGlass);
      rect(c, bx, f - 9, 5, 10, '#3a2a20');
      rect(c, bx, f - 6, 5, 4, P.label);
      dot(c, bx, f - 9, '#6a5040');
    }
  }

  function knifeBlock(c, x, f) {
    /* the Calphalon two-tier block, five black handles rising out of its
       top slots, the salt grinder beside it (ref 2/9) */
    var i;
    for (i = 0; i < 5; i++) {
      rect(c, x + 7 + i * 4, f - 38, 3, 9, P.handle);
      dot(c, x + 7 + i * 4, f - 38, P.handleLit);
      dot(c, x + 8 + i * 4, f - 34, K.pull);
    }
    rect(c, x + 4, f - 30, 22, 12, P.blockWood);
    rect(c, x + 4, f - 30, 22, 1, P.blockLit);
    rect(c, x + 6, f - 29, 18, 2, K.steel);              /* the steel slot guard */
    rect(c, x, f - 18, 30, 19, P.blockWood);
    rect(c, x, f - 18, 30, 1, P.blockLit);
    rect(c, x, f - 18, 1, 19, P.blockLit);
    rect(c, x + 29, f - 18, 1, 19, P.blockDeep);
    for (i = 0; i < 6; i++) rect(c, x + 3 + i * 4, f - 16, 2, 4, P.blockDeep);
    rect(c, x + 13, f - 9, 3, 2, P.blockDeep);           /* the slot on its face */
    rect(c, x + 9, f - 3, 10, 1, P.blockDeep);           /* the logo, unreadable */
    /* the salt grinder: wood body, steel cap */
    rect(c, x + 32, f - 12, 7, 13, '#7a5236');
    rect(c, x + 32, f - 13, 7, 2, K.steel);
    rect(c, x + 32, f - 12, 1, 13, '#a0703e');
  }

  function oilJars(c, x, f) {
    for (var i = 0; i < 2; i++) {
      var jx = x + i * 15, oil = i ? P.oilDark : P.oil;
      rect(c, jx + 1, f - 21, 11, 3, K.steel);
      rect(c, jx + 1, f - 21, 11, 1, K.steelLit);
      rect(c, jx, f - 18, 13, 19, '#c9cdcd');
      rect(c, jx + 1, f - (i ? 8 : 14), 11, i ? 9 : 15, oil);
      rect(c, jx + 2, f - 17, 1, 17, '#f4f6f6');
    }
  }

  function crockAndTowel(c, x, f) {
    var i;
    /* the grey crock, a slotted spatula, a spoon and the rolling pin's end
       up out of it */
    line(c, x + 6, f - 18, x + 2, f - 40, '#3a3a3c', 2);
    rect(c, x - 2, f - 46, 7, 7, '#3a3a3c');
    for (i = 0; i < 3; i++) rect(c, x - 1 + i * 2, f - 45, 1, 5, '#6a6a6c');
    line(c, x + 12, f - 18, x + 14, f - 38, '#3a3a3c', 2);
    line(c, x + 18, f - 18, x + 26, f - 46, P.blockLit, 3);
    rect(c, x, f - 18, 22, 19, P.crock);
    rect(c, x, f - 18, 22, 1, P.crockLit);
    rect(c, x, f - 18, 2, 19, P.crockLit);
    /* the paper towels on their steel stand, in front of it */
    var tx = x + 16;
    rect(c, tx + 8, f - 46, 2, 4, K.steelLit);
    rect(c, tx, f - 42, 18, 42, P.towel);
    rect(c, tx + 13, f - 42, 5, 42, P.towelShade);
    for (i = 0; i < 40; i += 4) { dot(c, tx + 3 + (i % 8), f - 40 + i, P.towelShade); dot(c, tx + 8, f - 38 + i, P.towelShade); }
    rect(c, tx - 2, f, 22, 1, K.steel);
    rect(c, tx, f - 1, 18, 1, K.steelShade);
  }

  /* THE END-GRAIN BOARD, the real one, lying flat on the stone in front
     of the sink window (ref 2 and 9): 50 cm of it, four centimetres
     thick, so from down here it is its edge - and its edge is the same
     checker the pillars are built from. One, at its true size, dim. */
  function lyingBoard(c, x, f) {
    var tones = [P.walnut, P.maple, P.cherry], i;
    for (i = 0; i < 10; i++) {
      var tn = tones[hash(i * 11 + 3) % 3];
      rect(c, x + i * 5, f - 4, 5, 4, tn);
      rect(c, x + i * 5, f - 4, 5, 1, mix(tn, '#ffffff', 0.25));
    }
    rect(c, x, f - 5, 50, 1, P.mapleLit);
    rect(c, x, f, 50, 1, P.boardSeam);
  }

  /* THE RIGHT ORDER, left to right, as the owner keeps it - the left wing,
     the corner, the long right wing, the sink window. The tile unrolls the
     L and wraps from the sink back to the side wall, the way the Table's
     wall does. THE SIX MACHINES ARE NOT ON IT: each one comes past in the
     play plane, and the owner found a machine passing in front of its own
     twin on the wall strange (2026-11-01), so their stretches of counter
     are bare stone under the outlets they plug into - and the microwave's
     shelf sign, which the real microwave brings down with it, is gone from
     the top of the wall for the same reason. */
  function bakeScenery() {
    var t = makeCanvas(WALL_W, WALL_H), c = t.ctx, f = WALL_FOOT;
    /* left wing */
    outletPlate(c, 50, f - 48);
    outletPlate(c, 110, f - 48);
    bagOfPotatoes(c, 116, f);
    fruitBasket(c, 150, f);
    monstera(c, 190, f);
    /* right wing */
    beanCanister(c, 262, f);
    grinder(c, 336, f);
    cupsAndPitcher(c, 356, f);
    outletPlate(c, 388, f - 64);
    sauceBottles(c, 432, f);
    outletPlate(c, 502, f - 56);
    outletPlate(c, 511, f - 56, true);
    knifeBlock(c, 504, f);
    oilJars(c, 548, f);
    crockAndTowel(c, 592, f);
    lyingBoard(c, 630, f);
    return ringUnder(t, 0.6);
  }

  /* ------------------------------------------------ the wall, baked

     The mosaic, the windows over it, the counter's things over both, and
     then THE NIGHT: every pixel of the tile stepped down toward the dark
     the strip of light leaves below itself - eighty-six hundredths of its
     value at the top of the wall to seventy-eight at the stone - with
     anything still over 172 pressed softly under 190, so nothing behind
     the lane ever outshines a hazard. Then the light itself: a wash of
     the strip's warm white from the lid down forty-six rows, everywhere
     but the windows, which have no uppers over them. The counter's things
     take one more step on their own (bakeScenery's layer is dimmed before
     it is laid down), so they stay furniture.
     The first wall stepped down to 0.70..0.60 under a cap of 170 and read
     as a dark wall at night; the owner asked for it lighter (2026-11-01). */
  var NIGHT_TOP = 0.86, NIGHT_FOOT = 0.78;
  var WASH_A = 0.36, WASH_ROWS = 46;

  function inWindow(x) {
    for (var i = 0; i < WINDOWS.length; i++) if (x >= WINDOWS[i] - 3 && x < WINDOWS[i] + WIN_W + 3) return true;
    return false;
  }

  function bakeWall() {
    var t = makeCanvas(WALL_W, WALL_H), c = t.ctx, i;
    bakeMosaic(c);
    for (i = 0; i < WINDOWS.length; i++) bakeWindow(c, WINDOWS[i]);
    /* the contact line where the splash meets the stone */
    rect(c, 0, WALL_FOOT, WALL_W, 1, mix(K.splashGrout, P.outline, 0.5));
    var sc = bakeScenery();
    /* the scenery's own step back: a third of the way toward the wall's
       own tone, so it keeps its shape and loses its contrast - a black
       knife block on the far wall is a charcoal one - and then a tenth
       down, so nothing on the wall is as bright as what comes past */
    eachPixel(sc, function (p) {
      p[0] = (p[0] * 0.66 + 186 * 0.34) * 0.9;
      p[1] = (p[1] * 0.66 + 182 * 0.34) * 0.9;
      p[2] = (p[2] * 0.66 + 172 * 0.34) * 0.9;
    });
    c.drawImage(sc.canvas, 0, 0);
    var u = hexRGB(K.underLight);
    eachPixel(t, function (p, x, y) {
      var k = NIGHT_TOP + (NIGHT_FOOT - NIGHT_TOP) * (y / WALL_FOOT);
      p[0] *= k; p[1] *= k * 0.98; p[2] *= k * 0.93;
      softCap(p, 172, 190);
      if (y < WASH_ROWS && !inWindow(x)) {
        var a = WASH_A * (1 - ease(y / WASH_ROWS));
        p[0] += (u[0] - p[0]) * a; p[1] += (u[1] - p[1]) * a; p[2] += (u[2] - p[2]) * a;
        softCap(p, 180, 196);
      }
    });
    return t;
  }

  /* ------------------------------------------- the back of the counter

     The last ten centimetres of quartz before the wall, at 0.94: the
     back edge in shade where it meets the grout, warming to the stone's
     own white, its veins running long and mostly level. And the baking
     sheet of spent pucks drying on it, in front of the Breville's stretch
     (ref 1, 6, 8) with the teaspoon at its corner - the boon's real
     cousins, dim and on a tray. */
  function bakeFar() {
    var t = makeCanvas(FAR_W, FAR_H), c = t.ctx, i;
    /* the house's marble, lying almost flat this far back */
    Kitchen.paintMarble(c, FAR_W, FAR_H, {
      seed: 991, aTop: 0.07, aBot: 0.14, veins: 14, bold: 1, boldW: 3, clouds: 10, far: 0.55,
      base: function (y) { return y === 0 ? K.quartzShade : mix(K.quartzMid, K.quartz, (y - 1) / (FAR_H - 2)); },
      plain: function (y) { return y === 0; }
    });
    /* the baking sheet, foreshortened to a thin tray, its pucks standing
       up on it in three staggered rows */
    var sx = 278;
    rect(c, sx, 6, 70, 1, K.steelShade);
    rect(c, sx - 1, 7, 72, 4, K.steel);
    rect(c, sx - 1, 7, 72, 1, K.steelLit);
    rect(c, sx - 2, 11, 74, 1, K.steelDeep);
    for (i = 0; i < 9; i++) {
      var row = i % 3, px = sx + 4 + Math.floor(i / 3) * 20 + row * 6, py = 4 + row * 2;
      rect(c, px, py, 5, 2, P.puck);
      rect(c, px, py, 5, 1, P.puckLit);
    }
    rect(c, sx + 62, 9, 6, 1, K.steelLit);                 /* the teaspoon */
    rect(c, sx + 60, 9, 2, 1, K.steel);
    return t;
  }

  /* ------------------------------------------------------- the band

     The near stone, under the kill row: the strip's reflection coming
     forward on polished quartz three rows in, the veins bolder with their
     pale halo, the boundary on a plain row. No lip and no falloff -
     nothing is nearer than the stone. */
  function bakeBand() {
    var h = VH - FLOOR, t = makeCanvas(BAND_W, h);
    Kitchen.paintMarble(t.ctx, BAND_W, h, {
      seed: 1771, aTop: 0.28, aBot: 0.6, veins: 10, bold: 1, boldW: 3, clouds: 8, far: 0.7,
      base: function (y) {
        if (y === 0) return K.quartzShade;
        return y < 2 ? K.quartz : (y < 5 ? K.quartzHi : mix(K.quartz, K.quartzMid, (y - 5) / (h - 5) * 0.6));
      },
      plain: function (y) { return y === 0; }
    });
    return t;
  }

  /* ======================================================= THE BOARDS

     A standing pillar is a stack of end-grain cutting boards, seen
     EDGE-ON (ref 9's board, and the one lying in front of the sink
     window): each board a slab of its own - a pixel of pale arris along
     its top where the edge catches the strip of light, five rows of wood,
     and a pixel of dark seam under it, the gap before the next board.
     Inside each slab the glued strips come out as blocks in a STRICT
     alternation of dark walnut and pale maple (a cherry now and then
     standing in for a walnut), and each board starts one block over from
     the board beneath it - so the stack is a checkerboard and nothing
     else: one board's dark over the last one's pale, straight up the
     column. That is what keeps it from reading as brick. A random run of
     three tones in staggered bands, which is what the first cut had, IS a
     brick wall at this size.
     Each board is 30 px of the column's 34 and jogged a pixel either way
     - nobody stacks boards straight - with its left end catching the
     light and its right end in shade, so the slabs show at the column's
     edges too; the bottom board never jogs, it stands on the stone. Three
     stacks: 5 px blocks, 6 px blocks, and 5 px with a thick butcher block
     every fourth board. Fourteen boards to a tile - an even number, so the
     checker carries straight across the tile's wrap. Read BOTTOM to TOP,
     tiled to whatever height the gap leaves. */
  var WOODS = { w: ['walnutLit', 'walnut', 'walnutShade'],
                m: ['mapleLit', 'maple', 'mapleShade'],
                c: ['cherryLit', 'cherry', 'cherryShade'] };
  var ARRIS = '#f6e6c6';
  var BOARD_BLOCK = [5, 6, 5];

  /* one board: arris row, `body` rows of blocks, seam row - top at y */
  function paintBoard(c, y, body, x0, w, bw, darkFirst, seed) {
    var n = 0, x;
    for (x = x0; x < x0 + w; x += bw, n++) {
      var dark = ((n & 1) === 0) === darkFirst;
      var tone = dark ? (hash(seed * 31 + n * 7) % 6 === 0 ? 'c' : 'w') : 'm';
      var W = WOODS[tone], ww = Math.min(bw, x0 + w - x);
      rect(c, x, y, ww, 1, mix(P[W[0]], ARRIS, 0.72));
      rect(c, x, y + 1, ww, body, P[W[1]]);
      /* the glue line between two strips, faint */
      if (n > 0) { c.globalAlpha = 0.35; rect(c, x, y + 1, 1, body, P[W[2]]); c.globalAlpha = 1; }
    }
    /* the slab's two ends: lit on the left, in shade on the right */
    c.globalAlpha = 0.5;
    rect(c, x0, y, 1, body + 1, ARRIS);
    rect(c, x0 + w - 1, y + 1, 1, body, P.boardSeam);
    c.globalAlpha = 1;
    rect(c, x0, y + body + 1, w, 1, P.boardSeam);
  }

  function bakeBoards(v) {
    var list = [], i, H = 0, N = 14;
    for (i = 0; i < N; i++) {
      var body = (v === 2 && i % 4 === 3) ? 9 : 5;
      list.push(body); H += body + 2;
    }
    var t = makeCanvas(34, H), c = t.ctx, y = H;
    for (i = 0; i < N; i++) {
      y -= list[i] + 2;
      var jog = i === 0 ? 0 : (hash(v * 131 + i * 17 + 3) % 3) - 1;
      paintBoard(c, y, list[i], 2 + jog, 30, BOARD_BLOCK[v], (i & 1) === 0, v * 100 + i);
    }
    return ringUnder(t);
  }

  /* THE CAP: the biggest board lying across the top of the stack, seen
     from a hair above - its far edge catching the strip of light, its
     end-grain FACE foreshortened to three staggered rows of squares (the
     checker, visible on every cap), then its front edge, blocks like the
     column's. The Coop's 42x9 geometry. */
  function bakeCapUp() {
    var t = makeCanvas(42, 9), c = t.ctx, x, i;
    var tones = ['walnut', 'maple', 'cherry'];
    rect(c, 2, 0, 38, 1, P.outline);
    rect(c, 1, 1, 40, 1, P.outline); rect(c, 2, 1, 38, 1, P.mapleLit);
    rect(c, 0, 2, 42, 6, P.outline);
    rect(c, 1, 2, 40, 1, P.maple);
    for (i = 0; i < 3; i++) {
      for (x = 1 - i * 2; x < 41; x += 6) {
        var tn = tones[wrap(Math.floor((x + i * 2) / 6) + i, 3)];
        var a = Math.max(1, x), b = Math.min(41, x + 6);
        rect(c, a, 3 + i, b - a, 1, P[tn]);
        if (b - a > 2) dot(c, a, 3 + i, P[tn + 'Lit']);
      }
    }
    var r = mulberry32(77), at = 1, last = -1;
    while (at < 41) {
      var bw = 5 + Math.floor(r() * 3), k = Math.floor(r() * 3);
      if (k === last) k = (k + 1) % 3;
      last = k;
      var w = Math.min(bw, 41 - at), W = WOODS['wmc'.charAt(k)];
      rect(c, at, 6, w, 1, P[W[0]]);
      rect(c, at, 7, w, 1, P[W[2]]);
      at += bw;
    }
    rect(c, 1, 8, 40, 1, P.outline);
    return t;
  }

  /* ====================================================== THE UPPERS

     A hanging pillar is a glass-front shaker upper, the real ones' white
     with a narrow door to fit the column contract: 5 px stiles, 8 px
     rails, the pane dark with the night inside it and two glass shelves
     with the dim shapes of what the real cabinets hold, one vertical
     glare (a diagonal stripe on a pane reads as a crack), and the long
     nickel bar pull low on the meeting stile - the right one, then the
     left one, a pair. The third is the open-shelf end cap from ref 6, a
     teal cup and a white bowl on its two shelves. ANCHORED AT THE BOTTOM:
     the door's bottom rail and its pull always sit right over the cap,
     and the door runs up out of sight behind the lid, which is where an
     upper cabinet's door goes. */
  var DOOR_H = 104;
  function bakeDoor(v) {
    var t = makeCanvas(34, DOOR_H), c = t.ctx, y;
    rect(c, 0, 0, 34, DOOR_H, K.cabinet);
    if (v === 2) {
      rect(c, 4, 0, 26, DOOR_H, K.cabinetDeep);
      rect(c, 4, 0, 26, DOOR_H, mix(K.cabinetShade, K.cabinetDeep, 0.4));
      rect(c, 4, 0, 1, DOOR_H, K.cabinetDeep);
      var shelves = [34, 70];
      for (var s = 0; s < 2; s++) {
        rect(c, 4, shelves[s], 26, 1, K.cabinetLit);
        rect(c, 4, shelves[s] + 1, 26, 2, K.cabinet);
        rect(c, 4, shelves[s] + 3, 26, 1, K.cabinetDeep);
      }
      /* the teal cup on the upper shelf, the white bowl on the lower */
      rect(c, 9, 28, 7, 6, P.teal); rect(c, 9, 28, 7, 1, mix(P.teal, '#ffffff', 0.4));
      rect(c, 16, 29, 2, 3, P.teal);
      rect(c, 15, 66, 11, 4, K.cabinetLit); rect(c, 16, 69, 9, 1, K.cabinetShade);
    } else {
      /* the pane, between the stiles and rails */
      rect(c, 6, 8, 22, 88, K.glassDark);
      rect(c, 5, 7, 24, 1, K.cabinetShade);
      rect(c, 5, 8, 1, 88, K.cabinetShade);
      rect(c, 28, 8, 1, 88, K.cabinetLit);
      rect(c, 5, 96, 24, 1, K.cabinetLit);
      rect(c, 6, 38, 22, 1, K.glassShelf);
      rect(c, 6, 68, 22, 1, K.glassShelf);
      if (v === 0) {
        /* a stack of two bowls up top, a mug below */
        rect(c, 10, 34, 9, 2, K.glassGlare); rect(c, 11, 36, 7, 2, K.glassGlare);
        rect(c, 15, 62, 6, 6, K.glassGlare); rect(c, 16, 63, 4, 4, K.glassDark);
        rect(c, 21, 63, 2, 3, K.glassGlare);
      } else {
        /* two tumblers up top, a plate on its edge below */
        rect(c, 9, 31, 4, 7, K.glassGlare); rect(c, 10, 32, 2, 5, K.glassDark);
        rect(c, 15, 31, 4, 7, K.glassGlare); rect(c, 16, 32, 2, 5, K.glassDark);
        rect(c, 11, 58, 12, 10, K.glassGlare); rect(c, 13, 60, 8, 7, K.glassDark);
      }
      c.globalAlpha = 0.45; rect(c, 8, 12, 1, 50, K.glassGlare); c.globalAlpha = 1;
      /* the stiles' light and shade, the rails' */
      rect(c, 1, 0, 1, DOOR_H, K.cabinetLit);
      rect(c, 32, 0, 1, DOOR_H, K.cabinetShade);
      rect(c, 1, DOOR_H - 1, 32, 1, K.cabinetShade);
      /* THE BAR PULL, brushed nickel, low on the meeting stile */
      var px = v === 0 ? 29 : 3;
      rect(c, px, 70, 2, 21, K.pull);
      rect(c, px, 70, 1, 21, K.pullLit);
      rect(c, px, 90, 2, 1, K.pullShade);
    }
    rect(c, 0, 0, 1, DOOR_H, P.outline);
    rect(c, 33, 0, 1, DOOR_H, P.outline);
    return t;
  }

  /* THE CAP, hanging: the cabinet's bottom seen from under - the frame,
     the light rail, the underside, and its own strip of light, inset at
     the ends, with the glow under it the last thing before the gap. Every
     hanging cabinet carries the room's lid in miniature, and a lit line
     under the cap is what makes the mouth's edge crisp. */
  function bakeCapDown() {
    var t = makeCanvas(42, 9), c = t.ctx;
    rect(c, 1, 0, 40, 1, P.outline);
    rect(c, 0, 1, 42, 7, P.outline);
    rect(c, 1, 1, 40, 2, K.cabinet);
    rect(c, 1, 3, 40, 1, K.cabinetLine);
    rect(c, 1, 4, 40, 1, K.cabinetLit);
    rect(c, 1, 5, 40, 1, K.cabinetShade);
    rect(c, 1, 6, 40, 1, K.pullShade);
    rect(c, 4, 6, 34, 1, K.underLight);
    rect(c, 2, 7, 38, 1, '#f3dba6');
    rect(c, 2, 8, 38, 1, P.outline);
    return t;
  }

  /* ===================================================== THE MACHINES

     Six appliances off the owner's own counter, at the bay's one scale,
     each baked as a handful of frames - at rest, and each position of its
     one move - and each frame's SOLID BOXES read straight off its own
     painted pixels (maskBoxes): a box is a run of painted rows, so the
     box is the picture and the picture is the box, in every frame. The
     ring round each frame is laid after the boxes are read, so the house
     outline is a pixel of mercy all round.

     MSPR says where the body sits in its canvas (ox, oy), its width and
     height, and where its top row is on the screen: FLOOR - H for the
     five that stand on the counter, CEIL for the microwave on its shelf. */
  var MSPR = {
    espresso: { W: 52, H: 52, cw: 57, ch: 57, ox: 2, oy: 3, n: 3 },
    press:    { W: 46, H: 46, cw: 50, ch: 50, ox: 2, oy: 2, n: 4 },
    pot:      { W: 43, H: 50, cw: 47, ch: 54, ox: 2, oy: 2, n: 2 },
    fryer:    { W: 52, H: 43, cw: 56, ch: 47, ox: 2, oy: 2, n: 2 },
    micro:    { W: 76, H: 49, cw: 80, ch: 51, ox: 2, oy: 0, n: 4 },
    maker:    { W: 42, H: 44, cw: 46, ch: 48, ox: 2, oy: 2, n: 3 }
  };
  var KINDS = ['espresso', 'press', 'pot', 'fryer', 'micro', 'maker'];
  /* the microwave's top 14 px are up behind the lid, the way a hanging
     column's door runs up behind it, so the sign under its shelf ends on
     row 58 - level with the highest gap's top edge (CEIL + 34), and a
     doodad threading any gap the room can make has his head clear of it.
     (At 8 px it hung to row 64, and a pilot that never looks up met its
     sign on one pass in nine.) */
  var MICRO_HIDE = 14;
  function topOf(kind) { return kind === 'micro' ? CEIL - MICRO_HIDE : FLOOR - MSPR[kind].H; }

  /* the Breville Barista Express, with its grinder's hopper (ref 1, 3,
     6, 8): brushed steel, the pressure gauge between two rows of buttons,
     the group head and the portafilter's black handle in the brew
     recess, the drip tray, and the STEAM WAND on its right flank - F0
     hanging, F1 swung up and out for the blast, F2 the same a pixel up
     (the wand's rattle). The wand's tip in F1/F2 is WAND (body coords). */
  var WAND = [50, 17];
  function paintEspresso(c, ox, oy, f) {
    function R(x, y, w, h, col) { rect(c, ox + x, oy + y, w, h, col); }
    function D(x, y, col) { dot(c, ox + x, oy + y, col); }
    var y, i, h;
    /* the hopper: smoked black plastic, beans dim inside */
    R(8, 0, 13, 1, K.blackGlassHi);
    R(7, 1, 15, 1, K.blackGlass); D(8, 1, K.blackGlassHi);
    R(6, 2, 17, 2, K.blackGlassLit);
    R(6, 4, 17, 3, K.blackGlass);
    for (i = 0; i < 8; i++) { h = hash(i * 13 + 7); D(8 + h % 13, 4 + (h >>> 5) % 3, P.bean); }
    D(7, 4, K.blackGlassLit); D(7, 5, K.blackGlassLit);
    R(8, 7, 13, 1, K.blackGlassDeep);
    R(27, 5, 5, 3, K.blackGlass); R(27, 5, 5, 1, K.blackGlassLit);
    /* the top plate and the body */
    R(1, 8, 50, 1, K.steelLit);
    R(0, 9, 52, 3, K.steelLit);
    R(0, 12, 52, 40, K.steel);
    R(0, 12, 2, 40, K.steelLit);
    R(49, 12, 3, 40, K.steelShade);
    c.globalAlpha = 0.3;
    for (y = 14; y < 46; y += 4) R(2, y, 47, 1, K.steelDeep);
    c.globalAlpha = 1;
    /* the gauge between its buttons */
    R(15, 14, 3, 1, K.steelDeep); R(14, 15, 5, 3, K.steelDeep); R(15, 18, 3, 1, K.steelDeep);
    R(15, 15, 3, 3, P.gaugeFace); D(16, 16, P.gaugeRed); D(17, 15, P.gaugeRed);
    var bxs = [4, 8, 22, 26, 30, 34];
    for (i = 0; i < bxs.length; i++) {
      R(bxs[i], 16, 2, 2, K.blackGlassLit); D(bxs[i], 16, K.blackGlassHi);
    }
    R(40, 15, 6, 4, K.steelDeep); R(41, 16, 4, 2, K.steelLit);   /* the steam dial */
    /* the brew recess, the group head and the portafilter */
    var rec = mix(K.steel, K.steelShade, 0.6);
    R(8, 21, 35, 25, rec);
    R(8, 21, 35, 1, K.steelDeep); R(8, 21, 1, 25, K.steelShade);
    R(18, 22, 14, 2, K.steelLit);
    R(19, 24, 12, 4, K.steelDeep); R(19, 24, 12, 1, K.steelShade);
    R(22, 28, 2, 2, K.steelDeep); R(27, 28, 2, 2, K.steelDeep);
    line(c, ox + 31, oy + 25, ox + 37, oy + 29, P.handle, 2);
    D(31, 25, P.handleLit);
    /* the drip tray */
    R(1, 46, 50, 1, K.steelLit);
    R(1, 47, 50, 1, K.steelDeep);
    for (i = 2; i < 50; i += 2) D(i, 47, K.steel);
    R(1, 48, 50, 3, K.steel);
    R(1, 48, 1, 3, K.steelLit);
    R(1, 51, 50, 1, K.steelDeep);
    /* THE WAND */
    if (f === 0) {
      line(c, ox + 45, oy + 22, ox + 47, oy + 30, K.steelLit, 2);
      R(47, 31, 2, 2, K.blackGlass);
    } else {
      var lift = f === 2 ? 1 : 0;
      line(c, ox + 45, oy + 22, ox + 49, oy + 19 - lift, K.steelLit, 2);
      R(49, 17 - lift, 2, 2, K.blackGlass);
    }
    R(44, 21, 3, 3, K.blackGlass);
  }

  /* the contact grill (ref 4, 11, 12): a black base with its control
     strip and the blue readout, a steel trim along the bottom, and the
     lid with the steel handle bar across its front. The lid lifts about
     its BACK edge, so from the front it rises and shows its ridged
     underside: F0 shut, F1 20 degrees, F2 45, F3 70 - nearly upright, the
     top of the panel a pixel narrower each side because it is farther. */
  var PRESS_LID = [0, 14, 28, 38];
  function paintPress(c, ox, oy, f) {
    function R(x, y, w, h, col) { rect(c, ox + x, oy + y, w, h, col); }
    function D(x, y, col) { dot(c, ox + x, oy + y, col); }
    var i, y;
    /* the base */
    R(0, 36, 46, 8, K.blackGlass);
    R(0, 36, 46, 1, K.blackGlassLit);
    for (i = 0; i < 3; i++) { D(4 + i * 3, 40, K.blackGlassHi); D(35 + i * 3, 40, K.blackGlassHi); }
    R(18, 40, 6, 2, P.ledBlueDim);
    R(0, 44, 46, 1, K.steelLit);
    R(0, 45, 46, 1, K.steelShade);
    if (f === 0) {
      R(1, 30, 44, 6, K.blackGlass);
      R(1, 30, 44, 1, K.blackGlassLit);
      R(1, 35, 44, 1, K.blackGlassDeep);
      R(2, 28, 42, 2, K.steel);
      R(2, 28, 42, 1, K.pullLit);
      R(1, 28, 1, 4, K.steelShade); R(44, 28, 1, 4, K.steelShade);
      return;
    }
    /* open: the bottom plate showing in front of the hinge, ridged and
       HOT - the grill is on, its ridges glowing */
    R(2, 34, 42, 2, P.plate);
    for (i = 3; i < 44; i += 3) { D(i, 34, P.plateHot); D(i + 1, 35, P.plateGlow); }
    var h = PRESS_LID[f], top = 36 - h;
    for (y = top; y < 34; y++) {
      var n = (f === 3 && y < top + 6) ? 1 : 0;
      R(1 + n, y, 44 - 2 * n, 1, K.blackGlass);
      if (y >= top + 2) {
        var rr = (y - top) % 3;
        R(3 + n, y, 40 - 2 * n, 1, rr === 1 ? P.plateHot : (rr === 2 ? P.plateGlow : P.plate));
      }
    }
    R(2, top, 42, 2, K.steel);
    R(2, top, 42, 1, K.pullLit);
    R(1, top, 1, 3, K.steelShade); R(44, top, 1, 3, K.steelShade);
  }

  /* the Instant Pot (ref 1, 7, 10): the steel pot on its black foot ring,
     the panel - a light face in a black frame, the display and the
     buttons - the black lid with its rim catching the light, the arched
     lid handle and THE STEAM-RELEASE VALVE behind it. F1 is the valve a
     pixel over: its rattle. */
  var VALVE = [32, 1];
  function paintPot(c, ox, oy, f) {
    function R(x, y, w, h, col) { rect(c, ox + x, oy + y, w, h, col); }
    function D(x, y, col) { dot(c, ox + x, oy + y, col); }
    var i, j;
    R(3, 10, 37, 35, K.steel);
    R(3, 10, 3, 35, K.steelLit);
    R(36, 10, 4, 35, K.steelShade);
    R(3, 10, 37, 1, K.steelLit);
    R(4, 45, 35, 5, K.blackGlass);
    R(4, 45, 35, 1, K.blackGlassLit);
    R(5, 49, 33, 1, K.blackGlassDeep);
    R(1, 11, 2, 5, K.blackGlass); R(40, 11, 2, 5, K.blackGlass);
    /* the lid */
    R(6, 4, 31, 1, K.blackGlassHi);
    R(3, 5, 37, 1, K.blackGlass);
    R(1, 6, 41, 4, K.blackGlass);
    R(1, 6, 41, 1, K.blackGlassLit);
    R(2, 9, 39, 1, K.blackGlassDeep);
    /* the handle's arch */
    R(15, 0, 13, 1, K.blackGlassLit);
    R(14, 1, 3, 3, K.blackGlass); R(26, 1, 3, 3, K.blackGlass);
    R(15, 1, 12, 1, K.blackGlass);
    /* the valve */
    R(VALVE[0] - 1 + f, VALVE[1] - f, 3, 3, K.blackGlass);
    D(VALVE[0] - 1 + f, VALVE[1] - f, K.blackGlassHi);
    /* the panel */
    R(14, 18, 15, 18, K.blackGlass);
    R(15, 19, 13, 16, P.panelFace);
    R(15, 34, 13, 1, P.panelShade);
    R(17, 21, 9, 4, K.blackGlass);
    for (i = 0; i < 3; i++) R(18 + i * 3, 22, 2, 2, P.ledPale);
    for (j = 0; j < 3; j++) for (i = 0; i < 4; i++) D(16 + i * 3, 27 + j * 3, K.blackGlassLit);
  }

  /* the Instant Vortex Plus, two baskets (ref 1, 2, 7, 10): a black glass
     top with its reflection and the steel knob, the steel band, two
     drawer fronts with the long steel handles. F1 is the drawers SLAMMED
     OUT - a pixel nearer all round, the handles catching the light, and
     the hot cavity glowing in the slot over each. */
  function paintFryer(c, ox, oy, f) {
    function R(x, y, w, h, col) { rect(c, ox + x, oy + y, w, h, col); }
    R(3, 0, 46, 1, K.blackGlassLit);
    R(1, 1, 50, 8, K.blackGlass);
    R(2, 1, 48, 1, K.blackGlassHi);
    R(1, 2, 1, 7, K.blackGlassLit);
    R(24, 3, 4, 2, K.steel); R(24, 3, 4, 1, K.steelLit);
    R(20, 6, 12, 2, P.ledRedDim);
    R(0, 9, 52, 5, K.steel);
    R(0, 9, 52, 1, K.steelLit);
    R(0, 13, 52, 1, K.steelShade);
    R(0, 9, 2, 5, K.steelLit); R(49, 9, 3, 5, K.steelShade);
    R(1, 14, 50, 29, K.blackGlass);
    if (f === 0) {
      R(2, 15, 23, 27, K.blackGlass); R(2, 29, 23, 13, K.blackGlassLit);
      R(27, 15, 23, 27, K.blackGlass); R(27, 29, 23, 13, K.blackGlassLit);
      R(25, 15, 2, 27, K.blackGlassDeep);
      R(9, 19, 2, 20, K.pull); R(9, 19, 1, 20, K.pullLit);
      R(41, 19, 2, 20, K.pull); R(41, 19, 1, 20, K.pullLit);
    } else {
      R(0, 15, 26, 28, K.blackGlass); R(0, 29, 26, 14, K.blackGlassLit);
      R(26, 15, 26, 28, K.blackGlass); R(26, 29, 26, 14, K.blackGlassLit);
      R(25, 15, 2, 28, K.blackGlassDeep);
      R(0, 15, 26, 1, K.blackGlassHi); R(26, 15, 26, 1, K.blackGlassHi);
      R(8, 18, 3, 22, K.pullLit); R(10, 18, 1, 22, K.pull);
      R(41, 18, 3, 22, K.pullLit); R(43, 18, 1, 22, K.pull);
      R(2, 14, 22, 1, P.heatGlow); R(28, 14, 22, 1, P.heatGlow);
    }
    R(2, 42, 48, 1, K.blackGlassDeep);
  }

  /* the microwave on its wall shelf with the sign on the shelf's front
     (ref 4, 6, 11), hung from the lid the way the Table hangs a stack:
     the game's grammar for a ceiling-side thing. Steel frame, the
     black-glass door with its mesh and its bar, the panel with the green
     clock. F1..F3 the door swinging open toward you on its left hinge,
     the lit cavity coming into view - 26, 12, then 3 px of door, edge-on. */
  var MICRO_DOOR = [38, 26, 12, 3];
  function paintMicro(c, ox, oy, f) {
    function R(x, y, w, h, col) { rect(c, ox + x, oy + y, w, h, col); }
    function D(x, y, col) { dot(c, ox + x, oy + y, col); }
    var i, j, x, y;
    R(7, 0, 62, 36, K.steel);
    R(7, 0, 2, 36, K.steelLit);
    R(67, 0, 2, 36, K.steelShade);
    R(7, 34, 62, 2, K.steelShade);
    /* the panel and its clock */
    R(48, 3, 19, 30, K.blackGlass);
    R(48, 3, 19, 1, K.blackGlassLit);
    R(51, 15, 13, 4, K.blackGlassDeep);
    for (j = 0; j < 3; j++) for (i = 0; i < 5; i++) D(51 + i * 3, 21 + j * 4, K.blackGlassHi);
    /* the cavity behind the door, lit now that the door is open */
    var dw = MICRO_DOOR[f];
    if (f > 0) {
      R(9, 3, 38, 30, P.cavityBack);
      R(10, 5, 36, 26, P.cavity);
      R(10, 5, 36, 2, P.cavityDeep);
      R(44, 5, 2, 26, P.cavityDeep);
      R(12, 28, 32, 1, '#fff2c8');
      R(12, 29, 32, 2, P.cavityDeep);
    }
    /* the door */
    R(9, 3, dw, 30, K.steel);
    R(10, 4, Math.max(1, dw - 2), 28, K.blackGlass);
    if (dw > 6) {
      for (y = 6; y < 30; y++) for (x = 12; x < 9 + dw - 3; x++) if (((x + y) & 1) === 0) D(x, y, K.blackGlassLit);
      R(13, 7, 1, 9, K.blackGlassHi);
      /* the door's bar, on its free edge */
      R(9 + dw - 5, 9, 2, 16, K.steelLit);
      R(9 + dw - 4, 9, 1, 16, K.steel);
    } else {
      R(9, 3, dw, 30, K.steelLit);
    }
    /* the shelf, and the sign on its front */
    R(0, 36, 76, 1, K.cabinetLit);
    R(0, 37, 76, 3, K.cabinet);
    R(0, 40, 76, 1, K.cabinetShade);
    R(9, 41, 58, 8, K.cabinetLit);
    R(9, 48, 58, 1, K.cabinetShade);
    R(66, 41, 1, 8, K.cabinetShade);
    for (i = 4; i < 54; i++) {
      var h = hash(i * 7 + 1);
      if (h % 5 === 0) continue;
      D(9 + i, 44 + (h % 3 === 0 ? -1 : 0), P.script);
    }
  }

  /* the Cuisinart ice cream maker (ref 11, 12): a steel front, the black
     side with its vents, the black top with the control strip, and the
     CLEAR DOME LID over the bowl, the paddle's white shaft in it. F1 the
     lid flipped up on its left edge, the bowl open and the ice cream in
     it; F2 the dome a pixel up - the rattle before it pops. */
  var BOWL = [17, 15];
  function paintMaker(c, ox, oy, f) {
    function R(x, y, w, h, col) { rect(c, ox + x, oy + y, w, h, col); }
    function D(x, y, col) { dot(c, ox + x, oy + y, col); }
    var i;
    R(32, 18, 10, 26, K.blackGlass);
    R(32, 18, 10, 1, K.blackGlassLit);
    for (i = 0; i < 4; i++) R(34, 26 + i * 4, 6, 1, K.blackGlassLit);
    R(0, 18, 32, 3, K.blackGlass);
    R(0, 18, 32, 1, K.blackGlassLit);
    R(24, 19, 5, 1, K.blackGlassHi); D(29, 19, P.ledRed);
    R(0, 21, 32, 23, K.steel);
    R(0, 21, 2, 23, K.steelLit);
    R(0, 21, 32, 1, K.steelLit);
    R(30, 21, 2, 23, K.steelShade);
    R(8, 31, 12, 1, K.steelShade);
    R(0, 43, 42, 1, K.steelDeep);
    if (f === 1) {
      /* the lid up, the bowl open: ice cream in it, the paddle's shaft */
      R(10, 16, 16, 2, K.blackGlassDeep);
      R(12, 16, 12, 1, P.cream);
      R(17, 12, 1, 5, '#ffffff');
      R(9, 0, 5, 18, P.lidGlass);
      R(9, 0, 1, 18, P.glassHi);
      R(9, 0, 5, 1, P.glassHi);
      return;
    }
    var u = f === 2 ? 1 : 0;
    R(10, 17, 16, 1, K.blackGlassDeep);
    R(13, 13 - u, 10, 1, P.glassHi);
    R(11, 14 - u, 14, 1, P.lidGlass);
    R(9, 15 - u, 18, 3 - (u ? 0 : 1), P.lidGlass);
    D(BOWL[0], BOWL[1] - u, '#ffffff');
    D(12, 14 - u, P.glassHi);
  }

  var PAINT = { espresso: paintEspresso, press: paintPress, pot: paintPot,
                fryer: paintFryer, micro: paintMicro, maker: paintMaker };

  /* The boxes of a frame, read off its painted pixels: each row's runs
     (gaps of up to 2 px bridged - the ring closes them), merged
     down the rows while a run stays within a pixel of the box above it,
     so a rounded lid is a few boxes and a shelf under a microwave is its
     own. Offsets in body coordinates. */
  function maskBoxes(t, ox, oy) {
    var d = t.ctx.getImageData(0, 0, t.w, t.h).data, out = [], open = [], x, y, i, j;
    for (y = 0; y < t.h; y++) {
      var runs = [], x0 = -1, last = -10;
      for (x = 0; x < t.w; x++) {
        if (d[(y * t.w + x) * 4 + 3] > 40) {
          if (x0 < 0) x0 = x;
          else if (x - last > 3) { runs.push([x0, last]); x0 = x; }
          last = x;
        }
      }
      if (x0 >= 0) runs.push([x0, last]);
      var next = [];
      for (i = 0; i < runs.length; i++) {
        var r = runs[i], hit = null;
        for (j = 0; j < open.length; j++) {
          var o = open[j];
          if (!o.used && Math.abs(o.x0 - r[0]) <= 1 && Math.abs(o.x1 - r[1]) <= 1) { hit = o; break; }
        }
        if (hit) { hit.y1 = y; hit.x0 = Math.min(hit.x0, r[0]); hit.x1 = Math.max(hit.x1, r[1]); hit.used = true; next.push(hit); }
        else next.push({ x0: r[0], x1: r[1], y0: y, y1: y, used: true });
      }
      for (j = 0; j < open.length; j++) if (!open[j].used) out.push(open[j]);
      for (j = 0; j < next.length; j++) next[j].used = false;
      open = next;
    }
    out = out.concat(open);
    var res = [];
    for (i = 0; i < out.length; i++) {
      res.push([out[i].x0 - ox, out[i].y0 - oy, out[i].x1 - out[i].x0 + 1, out[i].y1 - out[i].y0 + 1]);
    }
    return res;
  }

  function bakeMachine(kind) {
    var s = MSPR[kind], frames = [];
    for (var f = 0; f < s.n; f++) {
      var bare = makeCanvas(s.cw, s.ch);
      PAINT[kind](bare.ctx, s.ox, s.oy, f);
      var art = makeCanvas(s.cw, s.ch);
      art.ctx.drawImage(bare.canvas, 0, 0);
      ringUnder(art);
      frames.push({ bare: bare, art: art, boxes: maskBoxes(bare, s.ox, s.oy) });
    }
    return frames;
  }

  /* ======================================================= THE KNIVES

     Three out of the Calphalon block - paring, steak and chef's - and
     they fall POINT FIRST, the way a dropped knife falls, never tumbling:
     a tumble would read as the Table's silverware, and the owner's new
     sound for this room is a knife landing point-first. The bread knife
     is left in the block (its teeth are a pixel of noise at this size;
     the steak knife says "it is a set").

     A knife is a column of rows from the butt to the point: the black
     handle with its lit edge and two steel rivets, a steel bolster, then
     the blade - its cutting edge a white pixel down the LEFT, the face
     lit steel, the spine in shade on the right - narrowing to the point,
     the chef's from six pixels at the heel. Three TILT frames, upright and
     a lean either way, made by sliding the rows a pixel every seven: a
     lean, never a rotation. A knife keeps the lean it was born with. */
  var KNIVES = [
    { L: 25, hw: 4, hand: 11, blade: [4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1] },
    { L: 30, hw: 4, hand: 13, blade: [4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1, 1] },
    { L: 43, hw: 5, hand: 17, blade: [6, 6, 6, 6, 6, 6, 6, 5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 3, 3, 3, 3, 2, 2, 2, 1, 1] }
  ];
  var KNIFE_ODDS = [0.38, 0.34, 0.28];
  var KN_AX = 8;                         /* the axis column in the knife's canvas */
  var TILTS = [0, -1, 1];

  function knifeShift(k, s, dir) { return dir * Math.round((s - KNIVES[k].L / 2) / 7); }

  function bakeKnife(k, d) {
    var K0 = KNIVES[k], dir = TILTS[d], t = makeCanvas(17, K0.L + 2), c = t.ctx, s;
    var spineOff = K0.hw - 3;
    for (s = 0; s < K0.L; s++) {
      var y = s + 1, ax = KN_AX + knifeShift(k, s, dir);
      if (s < K0.hand) {
        var hl = ax - 2, hw = K0.hw;
        if (s === 0) { hl += 1; hw -= 2; }
        rect(c, hl, y, hw, 1, P.handle);
        dot(c, hl, y, P.handleLit);
        if (s === Math.round(K0.hand * 0.3) || s === Math.round(K0.hand * 0.72)) dot(c, ax, y, K.pull);
        continue;
      }
      var w = K0.blade[s - K0.hand], spine = ax + spineOff;
      if (s === K0.hand) { rect(c, ax - 2, y, K0.hw, 1, K.steel); dot(c, ax - 2, y, K.steelLit); continue; }
      var x0 = spine - w + 1;
      rect(c, x0, y, w, 1, K.steelLit);
      if (w >= 2) dot(c, x0, y, '#ffffff');
      if (w >= 3) dot(c, spine, y, K.steelShade);
    }
    return ringUnder(t);
  }

  /* A KNIFE'S BOXES, read off its own rows: five rows at a time from
     the point up to the butt, each box the columns painted on EVERY row
     of its five (a lean that steps a pixel inside the five splits it in
     two), in canvas-free coordinates - x from the knife's axis column, y
     from its butt row. So the box is the blade and the handle, never the
     ring round them and never the air beside a leaning point. */
  function knifeSpan(k, s, dir) {
    var K0 = KNIVES[k], ax = knifeShift(k, s, dir);
    if (s < K0.hand) return s === 0 ? [ax - 1, ax - 2 + K0.hw - 2] : [ax - 2, ax - 2 + K0.hw - 1];
    if (s === K0.hand) return [ax - 2, ax - 2 + K0.hw - 1];
    var spine = ax + K0.hw - 3, w = K0.blade[s - K0.hand];
    return [spine - w + 1, spine];
  }
  function bakeKnifeBoxes(k, d) {
    var K0 = KNIVES[k], dir = TILTS[d], out = [], s, e;
    for (e = K0.L; e > 0; e -= 5) {
      var s0 = Math.max(0, e - 5), lo = -99, hi = 99, top = s0;
      for (s = s0; s < e; s++) {
        var sp = knifeSpan(k, s, dir);
        if (s > s0 && knifeShift(k, s, dir) !== knifeShift(k, s - 1, dir)) {
          out.push([lo, top, hi - lo + 1, s - top]);
          top = s; lo = -99; hi = 99;
        }
        lo = Math.max(lo, sp[0]); hi = Math.min(hi, sp[1]);
      }
      out.push([lo, top, hi - lo + 1, e - top]);
    }
    return out;
  }

  /* a knife lying on the stone, handle to the left, seen from down here
     as its profile: the dark handle, the bright line of the blade */
  function bakeKnifeLie(k) {
    var K0 = KNIVES[k], t = makeCanvas(K0.L + 2, 7), c = t.ctx, s;
    for (s = 0; s < K0.L; s++) {
      var x = s + 1;
      if (s < K0.hand) {
        rect(c, x, 2, 1, 3, P.handle);
        dot(c, x, 2, P.handleLit);
      } else {
        var w = K0.blade[s - K0.hand], hh = w >= 5 ? 3 : (w >= 2 ? 2 : 1);
        rect(c, x, 5 - hh, 1, hh, K.steelLit);
        dot(c, x, 4, '#ffffff');
      }
    }
    dot(c, 1 + Math.round(K0.hand * 0.3), 3, K.pull);
    dot(c, 1 + Math.round(K0.hand * 0.72), 3, K.pull);
    return ringUnder(t);
  }

  /* ======================================================= THE GIFTS */

  /* THE HOT SAUCE: the little Louisiana bottle every kitchen has - red
     cap, the green band at the neck, the sauce through the glass, and
     the diamond label with nothing written on it. 9 x 20. */
  var SAUCE = [
    '..RRRR...', '..rrrr...', '..rrrr...',
    '...ggg...', '...ggg...', '...ggg...',
    '..wsssd..', '.hssssd..', '.hsssssd.',
    '.hsssssd.', '.hsssssd.',
    '.hssLssd.', '.hsLLLsd.', '.hLLsLLd.', '.hsLLLsd.', '.hssLssd.',
    '.hsssssd.', '.hsssssd.', '.hsssssd.',
    '..eeeee..'
  ];
  var SAUCE_PAL = { r: P.capRed, R: P.capRedHi, g: P.neckGreen, s: P.sauce, h: P.sauceHi,
                    d: P.sauceDeep, L: P.label, e: P.sauceDeep, w: '#ffffff' };
  function bakeSauce(lying) {
    var rows = SAUCE, i, j;
    if (lying) {
      /* on its side for the landing: the grid read the other way round,
         cap to the left - a transposition at bake time, not a rotation */
      rows = [];
      for (j = 0; j < 9; j++) {
        var s = '';
        for (i = 0; i < SAUCE.length; i++) s += SAUCE[i].charAt(8 - j);
        rows.push(s);
      }
    }
    var t = makeCanvas(rows[0].length + 2, rows.length + 2);
    paintGrid(t.ctx, rows, 1, 1, SAUCE_PAL);
    return ringUnder(t);
  }

  /* THE BEATERS: a pair of hand-mixer beaters, the four-wire kind,
     shafts up - there is no mixer on this counter, so this one gift is
     drawn from life. The cages are the spin's own purple inside, so the
     colour of what it gives is on the thing that gives it, and four
     frames turn the cages about their shafts: wide, narrower, edge-on,
     narrower. */
  var CAGE = [1, 3, 3, 5, 5, 7, 7, 7, 7, 7, 5, 3, 1];
  var CAGE_W = [7, 5, 3, 5];
  function bakeBeaters(f) {
    var t = makeCanvas(20, 18), c = t.ctx, b, r;
    for (b = 0; b < 2; b++) {
      var cx = 4 + b * 9, sc = CAGE_W[f] / 7;
      rect(c, cx, 1, 2, 3, K.steel); dot(c, cx, 1, K.steelLit);
      for (r = 0; r < CAGE.length; r++) {
        var w = Math.max(1, Math.round(CAGE[r] * sc)), x0 = cx + 1 - Math.floor(w / 2);
        var y = 4 + r;
        var fill = mix(P.whirlDark, P.whirl, 1 - r / (CAGE.length - 1));
        rect(c, x0, y, w, 1, fill);
        dot(c, x0, y, K.steelLit);
        dot(c, x0 + w - 1, y, K.steelLit);
        if (r === 0 || r === CAGE.length - 1) rect(c, x0, y, w, 1, K.steelLit);
        /* the inner wires, which move as the cage turns */
        var inner = [0, 1, 0, -1][f];
        if (w >= 3) dot(c, cx + 1 + inner, y, K.steel);
        if (r === 5 || r === 9) rect(c, x0, y, w, 1, mix(K.steelLit, P.whirl, 0.4));
      }
    }
    return ringUnder(t);
  }

  /* THE COFFEE GROUNDS: two spent espresso pucks off the baking sheet,
     drawn so they can only be pucks - round, flat discs of packed
     grounds, as wide as four of their own thickness: each a speckled TOP
     seen a hair from above (an ellipse, its far rim in shade, its near rim
     a crisp lit edge where the top turns down), over a dark SIDE band
     that curves round under it. Two of them, the top one knocked out onto
     the other and lying half off it - a little stack, which is the one
     shape a disc cannot be mistaken in. The loose grounds round their feet
     are drawn on the stone (drawBoon), not in the sprite - a ringed speck
     at a disc's foot reads as a leg. 22 x 13 with its ring, the size of
     the house's other spare lives. */
  var PUCK_W = 16;
  function paintPuck(c, ox, oy, seed) {
    var a = PUCK_W / 2, b = 2, depth = 3, x, y;
    for (y = 0; y < 8; y++) {
      for (x = 0; x < PUCK_W; x++) {
        var dx = (x + 0.5 - a) / a, ty = (y + 0.5 - b) / b, by = (y + 0.5 - b - depth) / b;
        var top = dx * dx + ty * ty <= 1;
        var side = !top && (dx * dx + by * by <= 1 || (y + 0.5 >= b && y + 0.5 <= b + depth && Math.abs(dx) <= 1));
        if (!top && !side) continue;
        var h = hash(seed * 97 + y * 13 + x), col;
        if (top) {
          var dyn = (y + 1.5 - b) / b;             /* is the pixel below still top? */
          var nearRim = dx * dx + dyn * dyn > 1;
          col = P.puckTop;
          if (y === 0) col = P.puckLit;            /* the far rim, away from the light */
          else if (nearRim) col = P.puckRim;       /* the near rim, catching it */
          else if (h % 4 === 0) col = P.puckHi;
          else if (h % 5 === 0) col = P.puckLit;
        } else {
          col = by > 0.2 ? P.grounds : P.puck;
          if (dx < -0.75) col = P.puckLit;
        }
        dot(c, ox + x, oy + y, col);
      }
    }
  }
  function bakePucks() {
    var t = makeCanvas(23, 13), c = t.ctx;
    paintPuck(c, 1, 5, 1);             /* the one on the stone */
    paintPuck(c, 6, 1, 2);             /* the one lying half on it */
    return ringUnder(t);
  }

  /* THE GOLD BEAN, a crow's gift: a coffee bean in gold, its crease, two
     frames of tumble */
  var BEAN = [
    ['...oooooo...', '..oHHHHHHo..', '.oHgggggggo.', 'oHgggcggggdo', 'oggggcgggggo', '.oggcggggdo.', '..oddddddo..', '...oooooo...'],
    ['....oooo....', '...oHHHHo...', '..oHggggdo..', '.oHggcgggdo.', '.oggggcggdo.', '..ogggcgdo..', '...oddddo...', '....oooo....']
  ];
  function bakeBean(f) {
    var t = makeCanvas(14, 10);
    paintGrid(t.ctx, BEAN[f], 1, 1, { o: P.outline, H: P.goldHi, g: P.gold, d: P.goldDeep, c: P.goldDeep });
    return t;
  }

  /* THE SCOOP: frozen rock hard, a ball of cream gone cold blue-grey in
     its shade, a white glint, a frost fleck, and a COLD dark rim instead
     of the house's warm outline - so it reads as a stone the machine
     threw and never as the Fridge's gift. It does not glow. */
  var SCOOP = ['...rrr...', '..rhccr..', '.rhcccfr.', '.rcccccr.', '.rcccssr.', '.rccsssr.', '..rssbr..', '...rrr...'];
  function bakeScoop() {
    var t = makeCanvas(9, 8);
    paintGrid(t.ctx, SCOOP, 0, 0, { r: P.scoopRim, h: '#ffffff', c: P.cream, s: P.scoopShade,
                                     f: P.frost, b: mix(P.scoopShade, P.scoopRim, 0.5) });
    return t;
  }

  /* THE HEAT off the fryer: a wedge of hot air from its face out across
     the bay, strongest at the drawers and gone 200 px out, in wavy bands
     - four frames, keyed to the fryer's x so it holds still on pause. */
  function bakeHeat(f) {
    return alphaSheet(200, 64, FX.heat, function (x, y) {
      var k = x / 199, band = 0.55 + 0.45 * Math.sin(x * 0.13 + y * 0.42 + f * 1.57);
      var vy = Math.min(1, Math.min(y, 63 - y) / 12);
      return 0.36 * Math.pow(k, 1.4) * band * vy;
    });
  }

  /* a soft puff of steam, for the clouds: radius r, alpha falling to the
     edge (baked once per radius, never per frame) */
  function bakeDisc(r) {
    var n = r * 2 + 1;
    return alphaSheet(n, n, P.steam, function (x, y) {
      var d = Math.sqrt((x - r) * (x - r) + (y - r) * (y - r)) / r;
      return d >= 1 ? 0 : 0.9 * (1 - d * d);
    });
  }

  /* ========================================================== BUILD */

  function build() {
    LivingRoom.build();               /* the menu's gloom lives there */
    var i, k, d;
    T.lid = bakeLid();
    T.machine = {};
    for (i = 0; i < KINDS.length; i++) T.machine[KINDS[i]] = bakeMachine(KINDS[i]);
    T.wall = bakeWall();
    T.far = bakeFar();
    T.band = bakeBand();
    T.stand = [bakeBoards(0), bakeBoards(1), bakeBoards(2)];
    T.door = [bakeDoor(0), bakeDoor(1), bakeDoor(2)];
    T.capUp = bakeCapUp();
    T.capDown = bakeCapDown();
    T.knife = []; T.knifeLie = []; T.knifeBox = [];
    for (k = 0; k < KNIVES.length; k++) {
      T.knife.push([]);
      for (d = 0; d < TILTS.length; d++) T.knife[k].push(bakeKnife(k, d));
      T.knifeBox.push([]);
      for (d = 0; d < TILTS.length; d++) T.knifeBox[k].push(bakeKnifeBoxes(k, d));
      T.knifeLie.push(bakeKnifeLie(k));
    }
    T.sauce = bakeSauce(false);
    T.sauceLie = bakeSauce(true);
    T.beaters = [bakeBeaters(0), bakeBeaters(1), bakeBeaters(2), bakeBeaters(3)];
    T.pucks = bakePucks();
    T.bean = [bakeBean(0), bakeBean(1)];
    T.scoop = bakeScoop();
    T.heat = [bakeHeat(0), bakeHeat(1), bakeHeat(2), bakeHeat(3)];
    T.disc = {};
    for (i = 3; i <= 16; i++) T.disc[i] = bakeDisc(i);
    T.ball = {}; T.ballEdge = {};
    for (i = 2; i <= 12; i++) { T.ball[i] = bakeBall(i, false); T.ballEdge[i] = bakeBall(i, true); }
  }

  /* ====================================================== THE CLOCKS

     EVERY MOVE A MACHINE MAKES IS A THRESHOLD ON ITS OWN ob.x, the
     Table's bottle's grammar and for the Table's reasons: drawing and
     collision read the same number on the same frame, a pause holds the
     move exactly where it was, and the move always happens at the same
     place in front of you - one keyed to seconds would go off somewhere
     different every time. A machine crosses each threshold once, so it
     makes its move exactly ONCE a pass: an appearance IS an attack (the
     Cupmen's lesson - nothing here waits to see where the doodad is).
     Durations are px of scroll; at the tune's 118..180 px/s, 10 px is
     0.085..0.056 s. The doodad who never steers flies at x 116, hitbox
     105..127. Gaps 104 -> 81, so the lowest lane a threaded doodad flies
     is centre 156..167.5 (hitbox bottom 167..178.5) and the highest 110..
     98.5 (hitbox top 99..87.5); every "escapable" below is checked
     against those four rows. The per-machine arithmetic sits with each
     clock.

     AND WHAT THEY DO IN A REAL RUN, counted rather than assumed (sixteen
     seeded 60 s runs at this bay's tune, 400 spare lives, two autopilots
     that never look at a machine: one that holds x 116 and flies each gap
     at 60% of its depth, steering home when it is pushed off; one that
     also holds RIGHT half the time in half-second bursts and sinks to 70%).
     Each machine comes onto the screen 2.5..3.8 times a minute and makes
     its move on 2.1..2.9 of them (a save takes the rest out first). The
     blind straight pilot: 12.3 hits a minute - the boards 47%, the knives
     39%, the espresso's plume 5%, the sparks 5%, a board the fryer pushed
     him back into 4%, the scoops and the microwave's sign 1% each. The
     pilot pushing right: 7.6 - the knives 70%, the espresso 10%, the
     geyser 6%, the scoops 4%, the sparks 3%, the press 3%. Against the Bar
     on its own tune, 10.4 and 6.6; the Ceiling, 16.4 and 10.8. One machine
     at a time, crowded into every bay, the share of its moves that catch
     the blind straight pilot: espresso 14%, fryer 17%, microwave 19%, ice
     cream maker 13%, the pot and the press none - and of the pilot pushing
     right: the pot 23%, espresso 17%, microwave 14%, maker 6%, fryer 2%,
     press 1%. Each
     machine bites a different habit, and none of them owns the bay. */

  /* 0 at `from`, 1 at `to`, as ob.x runs down from one to the other */
  function lin(x, from, to) { return clamp((from - x) / (from - to), 0, 1); }
  function crossed(lx, x, at) { return lx > at && x <= at; }

  /* THE ESPRESSO MACHINE: the steam wand blows SIDEWAYS - up and to the
     right, out of the wand on the Breville's right flank, which is the only
     way a wand can point (a jet to the left would come out of the machine).
     So its trick is that it waits until it is UNDER you, and blows across
     whoever it has just gone beneath.
       144  TELL: the hiss, the wand swings up and rattles, steam dribbles
       64   FIRE: 'steam'; the jet runs out to full reach over 12 px
       52..4 HOLD, 48 px (0.27..0.41 s)
       4 -> -12 the jet lets go of the wand and its tail runs out
     The tell is 80 px before the fire, 0.44..0.68 s. The jet leaves the
     tip at row 207 rising at 0.75 (37 degrees), 5 px thick at the wand
     and 16 at its far end R px out: R is 44..72, cut so the plume ends
     6 px short of the next cap. Its highest box tops out at row 149, so
     A DOODAD WITH HIS CENTRE AT 137 OR ABOVE IS NEVER TOUCHED - one flap
     from anywhere in the lowest lane - and nobody in the high or middle
     lanes ever is. It bites the low lane, and a doodad diving toward a
     low gap past it: measured, a pilot who never looks at it is caught
     by 14% of its blasts, one who does need only flap. (It was 0.8 and
     80 px in the plan, and caught 38% of the blind pilot's passes - too
     many for the first machine anybody meets.) */
  var ESP_TELL = 144, ESP_FIRE = 64, ESP_FULL = 52, ESP_HOLD = 4, ESP_GONE = -12;
  var ESP_RMIN = 44, ESP_RMAX = 72;
  var ESP_SLOPE = 0.75, ESP_SEC = Math.sqrt(1 + ESP_SLOPE * ESP_SLOPE);
  function espFrame(x) {
    if (x > ESP_TELL || x <= ESP_GONE) return 0;
    if (x > ESP_FIRE) return (Math.floor(x / 3) & 1) ? 2 : 1;
    return 1;
  }
  /* the jet's head and tail as fractions of its reach, or null */
  function espJet(x) {
    if (x > ESP_FIRE || x <= ESP_GONE) return null;
    return [lin(x, ESP_HOLD, ESP_GONE), lin(x, ESP_FIRE, ESP_FULL)];
  }
  function espTip(ob) { return [Math.round(ob.x) + WAND[0], topOf('espresso') + WAND[1]]; }
  function espThick(u) { return 5 + 11 * u; }

  /* THE PANINI PRESS: the lid lifts and stands, then CLAMPS on whatever
     flew low over it - shut right under the doodad's column, so the slam
     is something you see happen beneath you.
       300  TELL: 'tick' (the latch); the readout lights; F1, F2 at 290,
            F3 at 280 - the lid standing nearly upright
       280..104 OPEN: the hot plates, the lid standing 38 px over the
            base, top at row 194
       104  SLAM: 'slam'; F3 -> F0 over 12 px, the press centred under x
            116 as it shuts
       92   SHUT: 'sizzle'; puffs out of the seam
     Escapable: the standing lid's top is 15.5..27 px under the lowest
     lane's hitbox, so only a doodad that DIVES 16 px under the lowest
     lane over a press can be clamped - and he has seen the lid standing
     for 176 px (1.0..1.5 s) first. Its boxes are the frame drawn, the
     lid at whatever height it has reached - never the sweep it is about
     to make. It is a block you fly over that bites
     the dip; its purpose is to make "dip between the boards" a thing you
     look before you do. */
  var PR_TELL = 300, PR_OPEN = 280, PR_SLAM = 104, PR_SHUT = 92, PR_DIM = 60;
  function pressFrame(x) {
    if (x > PR_TELL) return 0;
    if (x > 290) return 1;
    if (x > PR_OPEN) return 2;
    if (x > PR_SLAM) return 3;
    if (x > 100) return 3;
    if (x > 96) return 2;
    if (x > PR_SHUT) return 1;
    return 0;
  }

  /* THE INSTANT POT: the valve whistles, then a tall geyser of steam
     goes up out of it to row 80 - a wall in front of you.
       300  TELL: 'whistle'; the valve rattles, a wisp off it
       262  'whistle' again; the wisp thickens
       176  FIRE: 'steam'; the column climbs from the valve to row 80
            over 12 px
       164..136 HOLD
       136 -> 112 the column lets go of the pot and rises off it
       112 on, a cloud rolls out under the uppers - harmless
     The column's kill boxes are 8 wide on its 12 drawn, at x+28..x+36,
     so the last of them dies at screen x 140..148 - 13 px clear of a
     doodad flying at 116: A STRAIGHT FLYER IS NEVER TOUCHED, the wall
     dies in front of his beak, every time. A doodad pressing RIGHT closes
     on it at speed+116 and meets it: let go of right (it dies first), go
     over it (row 80 to the lid is a window 56 px tall), or be past it
     already (it fires behind him). It punishes rushing, which is the one
     habit a killing lid should break. */
  var POT_TELL = 300, POT_TELL2 = 262, POT_FIRE = 176, POT_UP = 164, POT_HOLD = 136, POT_GONE = 112;
  var POT_TOP = 80;
  function potColumn(ob) {
    var x = ob.x;
    if (x > POT_FIRE || x <= POT_GONE) return null;
    var base = topOf('pot') + VALVE[1] - 1;
    var top = base - (base - POT_TOP) * lin(x, POT_FIRE, POT_UP);
    var bottom = base - (base - POT_TOP) * lin(x, POT_HOLD, POT_GONE);
    return [Math.round(ob.x) + VALVE[0], Math.round(top), Math.round(bottom)];
  }

  /* THE AIR FRYER: three ticks and a countdown, then the baskets SLAM
     out and a blast of hot air comes off its face and PUSHES YOU BACK -
     through the world, not just across the screen. The engine's drift
     (ledger.drift) is set to the room's own speed plus 64, so for the
     half second of the blast a doodad that does nothing flies BACKWARD
     through the bay at 64 px/s, into whatever he has just passed; one who
     holds RIGHT still makes 52 px/s of headway, at every speed. Hot air
     is not lethal and nothing of it is boxed: what kills is the board he
     threaded a moment ago, if he has already left its gap's height.
       330, 300, 270  TELL: 'tick', the display counts 3, 2, 1, the fan
                      whirs
       240  FIRE: 'slam', the drawers jump out, the heat comes on (12 px)
       228..150 BLAST, 78 px (0.43..0.66 s)
       150 -> 120 the blast dies away; 110 the drawers go back ('tock')
     It acts on a doodad within 170 px in front of its face (fading out at
     300) and on nobody already over its far half. The pillar it stands
     behind reaches a straight flyer during the blast - the push is felt
     while he is threading it or just out of it, which is the moment it
     matters, and the cure is the oldest one in the game: hold the gap's
     height until you are clear, or hold right. */
  var FR_T1 = 330, FR_T2 = 300, FR_T3 = 270, FR_FIRE = 240, FR_FULL = 228, FR_FADE = 150, FR_END = 120, FR_IN = 110;
  var PUSH_BACK = 64, PUSH_NEAR = 170, PUSH_FAR = 300;
  function fryerFrame(x) { return (x <= FR_FIRE && x > FR_IN) ? 1 : 0; }
  function blastK(x) {
    if (x > FR_FIRE || x <= FR_END) return 0;
    if (x > FR_FULL) return (FR_FIRE - x) / (FR_FIRE - FR_FULL);
    if (x > FR_FADE) return 1;
    return 1 - ease((FR_FADE - x) / (FR_FADE - FR_END));
  }
  function fryerPush(ob, run) {
    var k = blastK(ob.x);
    if (k <= 0 || !run || run.px > ob.x + 26) return 0;
    var d = ob.x - run.px;
    var f = d <= PUSH_NEAR ? 1 : clamp(1 - (d - PUSH_NEAR) / (PUSH_FAR - PUSH_NEAR), 0, 1);
    return ((run.speed || 118) + PUSH_BACK) * k * f;
  }

  /* THE MICROWAVE, on its shelf: it dings, its door swings open on the
     lit cavity, and it throws SPARKS down into the bay - seven, one every
     9 px of scroll, each falling from the door's foot (row 44) at 40..110
     px/s under 520 and burning out in 0.36 s. 'zap' on three of them.
       300  TELL: 'ding'; the clock says END, blinking
       230  DOOR: 'tock'; F1, F2 at 221, F3 at 212
       200..146 SPARKS
       100  the door shuts, 'tock'
     The sparks burn out between rows 92 and 118 and never lower (their
     boxes end at 120): A DOODAD WITH HIS CENTRE AT 132 OR BELOW IS NEVER
     TOUCHED - the low and middle lanes are safe, the highest is squarely
     in it. They are born at the door (x+15..x+43) and the world carries
     them toward the doodad at 118..180 less their own drift, so the last
     few reach his column as they burn out. The ding is 100 px before the
     first spark (0.56..0.85 s); a drop from the high lane to 132 is 22..34
     px, one let-go. The bay's GO LOW, the complement of the espresso. */
  var MI_TELL = 300, MI_DOOR = 230, MI_SHUT = 100;
  var SPARK_AT = [200, 191, 182, 173, 164, 155, 146];
  var SPARK_LIFE = 0.36, SPARK_G = 520;
  function microFrame(x) {
    if (x > MI_DOOR) return 0;
    if (x > 221) return 1;
    if (x > 212) return 2;
    if (x > MI_SHUT) return 3;
    if (x > 96) return 2;
    if (x > 92) return 1;
    return 0;
  }

  /* THE ICE CREAM MAKER: the lid rattles, POPS, and the machine flings
     three scoops of rock-hard ice cream back along the bay in an arc.
       300  TELL: 'whirr'; the dome rattles, the paddle flicks
       236  POP: 'pop'; the lid flips up on its edge
       226, 214, 202 SCOOPS, one each
       160  the lid falls back, 'tock'
     A scoop leaves the bowl (row 211) at 215 px/s up under 420 and 70..90
     px/s back along the bay: its apex is 55 px up, at row 156, and NOTHING
     IT DOES IS EVER HIGHER THAN ROW 153 - a doodad with his centre at 141
     or above is never touched, one flap from the lowest lane. The three
     cross his column at their apex, rows 156..162, 0.34..0.57 s after they
     leave - a flat volley through the lower half of the lane, coming at a
     doodad who is threading the board behind the maker or just out of it -
     and a scoop that meets the board first breaks on it (measured, half of
     them do). The one that sends you UP, under a lid that kills. */
  var MK_TELL = 300, MK_POP = 236, MK_SHUT = 160;
  var SCOOP_AT = [226, 214, 202];
  var SCOOP_G = 420, SCOOP_VY = -215, SCOOP_VX0 = 70, SCOOP_VX1 = 90;
  function makerFrame(x) {
    if (x > MK_TELL) return 0;
    if (x > MK_POP) return (Math.floor(x / 3) & 1) ? 2 : 0;
    if (x > MK_SHUT) return 1;
    return 0;
  }

  function machineFrame(ob) {
    var x = ob.x;
    switch (ob.kind) {
      case 'espresso': return espFrame(x);
      case 'press': return pressFrame(x);
      case 'pot': return (x <= POT_TELL && x > POT_FIRE && (Math.floor(x / 3) & 1)) ? 1 : 0;
      case 'fryer': return fryerFrame(x);
      case 'micro': return microFrame(x);
      case 'maker': return makerFrame(x);
    }
    return 0;
  }

  /* ======================================================== DRAWING */

  /* BACK TO FRONT: the splash and everything on it (0.88), the back of
     the counter with the baking sheet (0.94). The kill row's own stone is
     the band, drawFloor. */
  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = K.splashGrout;
    ctx.fillRect(0, CEIL, VW, FLOOR - CEIL);
    tileX(ctx, T.wall.canvas, scroll * WALL_PAR, CEIL);
    tileX(ctx, T.far.canvas, scroll * FAR_PAR, FAR_Y);
  }

  function drawCeiling(ctx, scroll) { tileX(ctx, T.lid.canvas, scroll, 0); }

  function drawFloor(ctx, scroll) { tileX(ctx, T.band.canvas, scroll, FLOOR); }

  /* The calm version, for the porch: the splash and the counter at six
     tenths of the scroll, the house's gloom over the lower half. No
     boards, no machines, no knives - the porch bakes this once at a
     frozen scroll, and a hazard in a title picture never moves. */
  function drawMenuBackdrop(ctx, scroll) {
    drawBackdrop(ctx, scroll * 0.6);
    ctx.drawImage(LivingRoom.tiles.menuShade.canvas, 0, VH - 120);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  /* ------------------------------------------------------- the pillars */

  function drawColumnUp(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + h - drawn - slice, w, slice);
      drawn += slice;
    }
  }

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), v = ob.variant;
    var topH = ob.gapY - CEIL, botY = ob.gapY + ob.gapH, botH = FLOOR - botY;
    /* the hard cast shadow on the splash behind, the house's strip */
    if (topH > 0) Tint.rect(ctx, x + 34, CEIL, 4, topH, K.void, 6);
    if (botH > 0) Tint.rect(ctx, x + 34, botY, 4, botH, K.void, 6);
    /* the upper: anchored at its foot, cut by the lid */
    if (topH > 9) drawColumnUp(ctx, T.door[v].canvas, x, CEIL, 34, topH - 9);
    if (botH > 0) drawColumnUp(ctx, T.stand[v].canvas, x, botY, 34, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
  }

  /* ------------------------------------------------------ the machines */

  /* a puff of steam: a disc baked once per radius, at an alpha */
  function puff(ctx, x, y, r, a) {
    r = clamp(Math.round(r), 3, 16);
    var d = T.disc[r], g = ctx.globalAlpha;
    ctx.globalAlpha = g * a;
    ctx.drawImage(d.canvas, Math.round(x) - r, Math.round(y) - r);
    ctx.globalAlpha = g;
  }

  /* THE JET, steam and not a blade. Plotted along the axis from the wand
     (rising at 0.75, thickness 5 -> 16) in three layers, the way pixel
     smoke is drawn: a pale, half-see-through BODY whose edges billow -
     lobes that grow with the plume and roll outward along it - soft
     puffs piled on it either side, and down the middle a CHAIN OF STEAM
     BALLS, opaque and shaded (lit on the upper left, a deep rim lower
     right), one every 2 px, their sizes rolling outward with the flow, so
     the solid part of the plume has a scalloped, cauliflower edge and no
     straight line anywhere. Puffs come away off the upper side and off the
     far end and drift up and die.
     The kill boxes (attackRects) sit inside the chain of balls, by
     construction: a ball's radius is the distance from its centre to the
     far corner of any box it has to cover (half a ball-spacing along the
     axis, the box's half-height, the axis's climb across half a box),
     plus the pixel the rounding can cost - so every box pixel is solid
     steam, and the soft body round it is the mercy. Keyed to x, so it
     holds still on pause. */
  var BALL_STEP = 2;
  function espBoxH(u) { return Math.max(2, espThick(u) - 8); }
  function espBoxW(u) { return Math.max(2, espBoxH(u) * 0.55); }
  function espBallR(u) {
    var v = espBoxH(u) / 2 + ESP_SLOPE * (espBoxW(u) / 2 + BALL_STEP / 2);
    return Math.ceil(Math.sqrt(BALL_STEP * BALL_STEP / 4 + v * v) + 0.8);
  }

  /* a steam ball: opaque, lit on its upper left, a deep rim on its lower
     right - baked once per radius */
  function bakeBall(r, edge) {
    var n = r * 2, t = makeCanvas(n, n), c = t.ctx, x, y;
    for (y = 0; y < n; y++) {
      for (x = 0; x < n; x++) {
        var dx = x + 0.5 - r, dy = y + 0.5 - r, d = Math.sqrt(dx * dx + dy * dy);
        if (d > r) continue;
        if (edge) { dot(c, x, y, P.steamDeep); continue; }
        var col = P.steam;
        if (dy > r * 0.25 && d > r * 0.45) col = P.steamShade;
        if (dx + dy < -r * 0.5 && d > r * 0.25) col = P.steamHi;
        dot(c, x, y, col);
      }
    }
    return t;
  }

  function drawJet(ctx, ob) {
    var j = espJet(ob.x);
    if (!j) return;
    var uT = j[0], uH = j[1], tip = espTip(ob), R = ob.reach, run = ESP_FIRE - ob.x;
    var flow = run * 1.6, x0 = Math.ceil(R * uT), x1 = Math.floor(R * uH), x, k, u, ay, q;
    var g = ctx.globalAlpha, fade = 1 - uT;
    /* THE BODY: pale, half see-through, its two edges lobed */
    ctx.globalAlpha = g * 0.5;
    for (x = x0; x <= x1; x++) {
      u = x / R; ay = tip[1] - ESP_SLOPE * x;
      var half = (espThick(u) / 2 + 2.5) * ESP_SEC;
      var ph = (x - flow) / 5;
      var up = half * (0.8 + 0.5 * (0.5 + 0.5 * Math.sin(ph * 1.9)));
      var dn = half * (0.75 + 0.4 * (0.5 + 0.5 * Math.sin(ph * 1.4 + 2.2)));
      up += (hash(x * 7 + Math.floor(flow / 3)) % 3) - 1;
      rect(ctx, tip[0] + x, Math.round(ay - up), 1, Math.round(up + dn), '#dfe7ec');
    }
    ctx.globalAlpha = g;
    /* the lobes: soft puffs along both sides, rolling outward */
    for (k = 0; k < 9; k++) {
      var px = wrap(flow * 0.9 + k * 11, R + 10);
      if (px < x0 || px > x1) continue;
      u = px / R;
      puff(ctx, tip[0] + px, tip[1] - ESP_SLOPE * px + espThick(u) * ((k & 1) ? 0.45 : -0.55), 3 + u * 6, 0.5 * fade);
    }
    /* THE BALLS. A chain of them every 2 px at the size the boxes need
       (the steam that kills), and over it the BILLOWS - bigger balls every
       7 px, a pixel or two off the axis by turns, riding outward with the
       flow - so the outline is a row of round bumps, not a line. First
       every ball a pixel fatter in the deep grey, then the balls, so the
       solid steam has the geyser's grey outline, scalloped, and each
       billow its own lit top and shaded underside. */
    var balls = [], bx, r, last = -1;
    for (x = x1; x >= x0 - 1; x -= BALL_STEP) {
      bx = Math.max(x, x0);
      if (bx === last) break;
      last = bx;
      balls.push([bx, 0, Math.min(11, espBallR(bx / R))]);
    }
    for (k = 0; k * 7 < R + 7; k++) {
      bx = wrap(flow * 0.8 + k * 7, R + 7);
      if (bx < x0 + 2 || bx > x1 - 1) continue;
      u = bx / R;
      balls.push([bx, (k & 1) ? -1.5 - u : 1 + u * 0.5, Math.min(11, espBallR(u) + 1 + Math.round((1 + (k % 3)) * (0.4 + 0.6 * u)))]);
    }
    balls.sort(function (p1, p2) { return p2[0] - p1[0]; });
    for (var pass = 0; pass < 2; pass++) {
      for (k = 0; k < balls.length; k++) {
        bx = balls[k][0]; r = balls[k][2];
        var by = Math.round(tip[1] - ESP_SLOPE * bx + balls[k][1]);
        if (pass === 0) ctx.drawImage(T.ballEdge[r + 1].canvas, tip[0] + bx - r - 1, by - r - 1);
        else ctx.drawImage(T.ball[r].canvas, tip[0] + bx - r, by - r);
      }
    }
    /* the head, while it is running out: a fat white puff */
    if (uH < 1) {
      var hx = R * uH;
      puff(ctx, tip[0] + hx + 2, tip[1] - ESP_SLOPE * hx - 1, 5 + uH * 5, 0.9);
    }
    /* puffs coming away off the upper side, drifting up as they go */
    for (k = 0; k < 4; k++) {
      q = wrap(run * 0.035 + k * 0.25, 1);
      var sx = (k * 0.23 + 0.2) * R;
      if (sx < x0 || sx > x1) continue;
      u = sx / R;
      puff(ctx, tip[0] + sx + q * 10, tip[1] - ESP_SLOPE * sx - espThick(u) * 0.7 - q * 16, 3 + q * 4, (1 - q) * 0.55 * fade);
    }
    /* and off the far end, going on up and dying - never boxed */
    if (uH >= 1) {
      for (var i = 0; i < 5; i++) {
        q = wrap(run * 0.04 + i * 0.2, 1);
        var wx = tip[0] + R + 2 + q * 24, wy = tip[1] - ESP_SLOPE * R - 3 - q * 22 - (i & 1) * 4;
        puff(ctx, wx, wy, 4 + q * 6, (1 - q) * 0.65 * fade);
      }
    }
  }

  /* THE GEYSER: a column 12 wide (14 across its top ten rows, where it
     billows) from its live bottom to row 80, flecks rising; and over 80
     a soft fringe that is drawn, never boxed */
  function drawColumnSteam(ctx, ob) {
    var col = potColumn(ob);
    if (!col) return;
    var cx = col[0], top = col[1], bot = col[2], y, run = POT_FIRE - ob.x;
    var flow = Math.floor(run * 2);
    for (y = top; y <= bot; y++) {
      var bill = y < top + 10 && top <= POT_TOP + 2 ? 2 : 0;
      var ph = (y + flow) / 5;
      var l = cx - 6 - bill - Math.round(1.5 + 1.5 * Math.sin(ph * 1.9));
      var r = cx + 6 + bill + Math.round(1.5 + 1.5 * Math.sin(ph * 1.5 + 1.3));
      rect(ctx, l, y, r - l, 1, P.steamDeep);
      rect(ctx, l + 1, y, r - l - 2, 1, P.steam);
      rect(ctx, l + 1, y, Math.round((r - l) * 0.35), 1, wrap(y + flow, 8) < 4 ? P.steamHi : P.steam);
    }
    for (var p = 0; p < 4; p++) {
      var py = bot - wrap(flow * 1.2 + p * 23, Math.max(1, bot - top));
      puff(ctx, cx + ((p & 1) ? 5 : -5), py, 4, 0.7);
    }
    if (top <= POT_TOP + 2) {
      for (var i = 0; i < 4; i++) {
        var k = wrap(run * 0.05 + i * 0.25, 1);
        puff(ctx, cx + (i - 1.5) * 5 * k, POT_TOP - 3 - k * 26, 4 + k * 6, (1 - k) * 0.6);
      }
    }
    /* where the column leaves the valve, while it still does */
    if (bot >= topOf('pot')) puff(ctx, cx, bot + 1, 5, 0.7);
  }

  /* the machine's lights, painted over the baked sprite: the press's
     readout, the fryer's countdown, the microwave's clock, the Breville's
     lamp */
  var DIGIT = {
    '1': ['.x', 'xx', '.x'], '2': ['xx', '.x', 'x.'], '3': ['xx', '.x', 'xx'],
    '-': ['..', 'xx', '..']
  };
  function digit(ctx, ch, x, y, col) {
    var g = DIGIT[ch];
    for (var r = 0; r < 3; r++) for (var c2 = 0; c2 < 2; c2++) if (g[r].charAt(c2) === 'x') dot(ctx, x + c2, y + r, col);
  }

  function drawMachineLights(ctx, ob, X, top) {
    var x = ob.x;
    if (ob.kind === 'espresso') {
      if (wrap(Math.floor(x), 40) < 20) dot(ctx, X + 34, top + 16, P.ledOrange);
    } else if (ob.kind === 'press') {
      if (x <= PR_TELL && x > PR_DIM) {
        rect(ctx, X + 18, top + 40, 6, 2, P.ledBlue);
        for (var i = 0; i < 6; i += 2) dot(ctx, X + 18 + i + ((Math.floor(x / 4) & 1)), top + 40, P.ledBlueHi);
      }
    } else if (ob.kind === 'fryer') {
      var ch = x > FR_T1 ? null : (x > FR_T2 ? '3' : (x > FR_T3 ? '2' : (x > FR_FIRE ? '1' : null)));
      if (ch) { digit(ctx, ch, X + 24, top + 5, P.ledRed); digit(ctx, '-', X + 27, top + 5, P.ledRedDim); }
      else if (x <= FR_FIRE && x > FR_IN && (Math.floor(x / 6) & 1)) {
        rect(ctx, X + 21, top + 6, 10, 1, P.ledRed);
      }
    } else if (ob.kind === 'micro') {
      var end = x <= MI_TELL && x > MI_SHUT;
      if (!end || (Math.floor(x / 10) & 1)) {
        for (var d = 0; d < 3; d++) rect(ctx, X + 52 + d * 4, top + 16, 3, 2, end && d === 1 ? P.ledGreenDim : P.ledGreen);
        if (!end && (Math.floor(x / 30) & 1)) { dot(ctx, X + 55, top + 16, P.ledGreen); dot(ctx, X + 55, top + 17, P.ledGreen); }
      }
    }
  }

  function drawMachine(ctx, ob) {
    var s = MSPR[ob.kind], f = machineFrame(ob), fr = T.machine[ob.kind][f];
    var X = Math.round(ob.x), top = topOf(ob.kind), x = ob.x, i, k;
    /* the cast shadow on the splash behind, and the contact shadow on
       the stone - the house's two strips */
    if (ob.kind === 'micro') {
      Tint.rect(ctx, X + 76, CEIL, 4, s.H - MICRO_HIDE, K.void, 6);
    } else {
      Tint.rect(ctx, X + s.W, top + 4, 4, s.H - 4, K.void, 6);
      Tint.rect(ctx, X - 2, FLOOR - 2, s.W + 4, 2, K.void, 7);
    }
    blitBelowCeil(ctx, fr.art.canvas, X - s.ox, top - s.oy);
    drawMachineLights(ctx, ob, X, top);

    if (ob.kind === 'espresso') {
      /* the dribble before the blast: puffs off the raised wand */
      if (x <= ESP_TELL && x > ESP_FIRE) {
        var tip = espTip(ob);
        for (i = 0; i < 3; i++) {
          k = wrap((ESP_TELL - x) / 12 + i / 3, 1);
          rect(ctx, tip[0] + 1 + Math.round(k * 3), tip[1] - 2 - Math.round(k * 8), 2, 2, k < 0.5 ? P.steamHi : P.steam);
        }
      }
      drawJet(ctx, ob);
    } else if (ob.kind === 'pot') {
      /* the valve's wisp, thin and then thick, before the geyser */
      if (x <= POT_TELL && x > POT_FIRE) {
        var vx = X + VALVE[0], vy = top + VALVE[1] - 2, thick = x <= POT_TELL2 ? 2 : 1;
        for (i = 0; i < 10; i++) {
          var sway = Math.round(Math.sin((x * 0.3) + i * 0.7));
          if (wrap(i + Math.floor(x / 2), 5) !== 0) rect(ctx, vx + sway, vy - i, thick, 1, i < 4 ? P.steamHi : P.steam);
        }
      }
      drawColumnSteam(ctx, ob);
    } else if (ob.kind === 'press') {
      /* wisps off the open plates; puffs out of the seam after the slam */
      if (x <= PR_OPEN && x > PR_SLAM) {
        for (i = 0; i < 2; i++) {
          k = wrap((PR_OPEN - x) / 40 + i * 0.5, 1);
          dot(ctx, X + 12 + i * 20 + Math.round(Math.sin(k * 6) * 2), top + 33 - Math.round(k * 12), P.steam);
        }
      }
      if (x <= PR_SHUT && x > PR_SHUT - 30) {
        k = (PR_SHUT - x) / 30;
        for (i = 0; i < 4; i++) puff(ctx, X + 6 + i * 11 + k * 4, top + 30 - k * 10 - (i & 1) * 2, 3 + k * 3, (1 - k) * 0.7);
      }
    } else if (ob.kind === 'fryer') {
      /* the fan whirring up before the slam: motes circling the band */
      if (x <= FR_T1 && x > FR_FIRE) {
        for (i = 0; i < 3; i++) {
          var a = x * 0.25 + i * 2.1;
          dot(ctx, X + 26 + Math.round(Math.cos(a) * 24), top + 11 + Math.round(Math.sin(a) * 3), P.steamHi);
        }
      }
      if (f === 1) Tint.rect(ctx, X, FLOOR - 1, s.W, 1, K.void, 10);
    } else if (ob.kind === 'maker') {
      /* the paddle flicking under the rattling dome */
      if (x <= MK_TELL && x > MK_POP) dot(ctx, X + BOWL[0] + ((Math.floor(x / 2) & 1) ? 1 : -1), top + BOWL[1] - (f === 2 ? 1 : 0), '#ffffff');
      /* frost breath off the open bowl */
      if (f === 1) {
        for (i = 0; i < 3; i++) {
          k = wrap((MK_POP - x) / 30 + i / 3, 1);
          dot(ctx, X + 13 + i * 4, top + 14 - Math.round(k * 10), P.frost);
        }
      }
    } else if (ob.kind === 'micro') {
      /* the hum of the open cavity: a flicker of light at the door */
      if (f === 3 && (Math.floor(x / 3) & 1)) dot(ctx, X + 30, top + 18, '#ffffff');
    }
  }

  /* ----------------------------------------------------- the falling */

  /* Everything that draws or collides a drop reads its kind LIVE - the
     engine sets ob.whirl, and ob.gold, after makeDrop returns. */
  function kindOf(ob) {
    if (ob.spark) return 'spark';
    if (ob.scoop) return 'scoop';
    if (ob.gold) return 'gold';
    if (ob.spicy) return 'spicy';
    if (ob.whirl || ob.sour) return 'whirl';
    return 'knife';
  }

  /* A SPARK: a white-hot point in a cross of yellow, its trail behind it
     along its flight (quantised to eight directions), flickering. The
     brightest thing in the bay, and the smallest. */
  function drawSpark(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y), i;
    if (y < CEIL) return;
    var vx = (ob.vx || 0) - 150, vy = ob.vy || 0, l = Math.sqrt(vx * vx + vy * vy) || 1;
    var dx = Math.round(vx / l), dy = Math.round(vy / l);
    var hot = (Math.floor((ob.age || 0) * 30) & 1) === 0;
    /* the trail: two pixels wide behind the head, then one, cooling */
    for (i = 6; i >= 2; i--) {
      var tx = x - dx * i, ty = y - dy * i;
      rect(ctx, tx, ty, i < 4 ? 2 : 1, i < 4 ? 2 : 1, i > 4 ? FX.hot : FX.hotMid);
    }
    /* the head: a white-hot 2x2 in a cross of yellow */
    rect(ctx, x - 1, y, 4, 2, FX.hotHi);
    rect(ctx, x, y - 1, 2, 4, FX.hotHi);
    rect(ctx, x, y, 2, 2, '#ffffff');
    if (hot) {
      dot(ctx, x - 2, y - 2, FX.hotHi); dot(ctx, x + 3, y - 2, FX.hotMid);
      dot(ctx, x + 3, y + 3, FX.hotHi); dot(ctx, x - 2, y + 3, FX.hotMid);
    }
  }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y), kind = kindOf(ob), age = ob.age || 0, i, k;
    if (kind === 'spark') { drawSpark(ctx, ob); return; }
    if (kind === 'scoop') {
      /* two frost motes trailing on alternate frames, no glow */
      if (Math.floor(age * 20) & 1) {
        dot(ctx, x + 4, y - 4, P.frost);
        dot(ctx, x + 6, y - 1, P.frost);
      }
      blitBelowCeil(ctx, T.scoop.canvas, x - 4, y - 4);
      return;
    }
    if (kind === 'knife') {
      var L = KNIVES[ob.knife].L;
      blitBelowCeil(ctx, T.knife[ob.knife][ob.tilt].canvas, x - KN_AX, Math.round(ob.y - L / 2) - 1);
      return;
    }
    if (kind === 'gold') {
      var cp = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(14 + cp * 5),
           'rgba(243,204,132,' + (0.44 * cp).toFixed(3) + ')',
           'rgba(224,176,74,' + (0.20 * cp).toFixed(3) + ')', 'rgba(224,176,74,0)');
      blitBelowCeil(ctx, T.bean[Math.floor(age * 6) & 1].canvas, x - 7, y - 5);
      return;
    }
    if (kind === 'spicy') {
      /* THE HEAT: the house's cheddar glow and three sparks off the top;
         the bottle under it wobbles a pixel either way */
      var pulse = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(16 + pulse * 6),
           'rgba(255,224,138,' + (0.50 * pulse).toFixed(3) + ')',
           'rgba(240,146,46,' + (0.24 * pulse).toFixed(3) + ')', 'rgba(184,77,18,0)');
      for (i = 0; i < 3; i++) {
        k = wrap(age * 0.7 + i * 0.41, 1);
        var fy = y - 12 - Math.round(k * 7);
        if (fy >= CEIL) dot(ctx, x - 4 + Math.round(Math.sin(age * 2 + i) * 4), fy, i % 2 ? FX.hotHi : FX.hot);
      }
      var wob = (Math.floor(age * 5) & 1) ? 1 : 0;
      blitBelowCeil(ctx, T.sauce.canvas, x - 5 + wob, y - 11);
      return;
    }
    /* THE SPIN: the house's purple light and the beaters turning */
    var sp = 0.72 + 0.28 * Math.sin(age * 3.1);
    glow(ctx, x, y, Math.round(16 + sp * 5),
         'rgba(230,179,255,' + (0.46 * sp).toFixed(3) + ')',
         'rgba(176,97,240,' + (0.22 * sp).toFixed(3) + ')', 'rgba(90,42,140,0)');
    blitBelowCeil(ctx, T.beaters[Math.floor(age * 24) & 3].canvas, x - 10, y - 9);
  }

  /* The spot a falling thing casts on the stone: wide and faint up by the
     lid, tight and dark as it arrives, under the POINT for a knife - the
     one clue to where it will come down. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var kind = kindOf(ob);
    if (kind === 'spark') return;
    var py = kind === 'knife' ? ob.y + KNIVES[ob.knife].L / 2 : ob.y;
    var px = kind === 'knife' ? knifePointX(ob) : ob.x;
    var far = clamp(((FLOOR - 4) - py) / (FLOOR - 4 - CEIL), 0, 1);
    var w = (kind === 'knife' ? 4 : 6) + Math.round(8 * far);
    var col = kind === 'spicy' ? P.sauceDeep : (kind === 'gold' ? P.goldDeep : (kind === 'whirl' ? P.whirlDark : K.quartzDeep));
    Tint.rect(ctx, Math.round(px - w / 2), FLOOR + 1, w, 2, col, 14 - Math.round(9 * far));
  }

  /* What has landed. A knife on the stone stands a beat on its point and
     falls over; a knife in a board stands in it, quivering, then still; a
     scoop melts where it broke; the gifts lie on the stone. All fade over
     their last quarter second rather than blink out. */
  function drawDropSplat(ctx, ob) {
    var x = Math.round(ob.x), kind = kindOf(ob), a = ctx.globalAlpha, since = (ob.splat || SPLAT_TIME) - ob.broken;
    if (kind === 'spark' || ob.shattered) return;
    ctx.globalAlpha = a * clamp(ob.broken / 0.25, 0, 1);
    if (kind === 'knife') {
      var Kn = KNIVES[ob.knife], L = Kn.L;
      if (ob.stuck || !ob.toppled) {
        /* upright, the point in the board (or balanced on the stone); a
           knife in a board quivers for 0.4 s */
        var tilt = 0, depth = ob.stuck ? 3 : 0;
        if (ob.stuck && since < 0.4) tilt = (Math.floor(since * 30) & 1) ? 1 : 2;
        var pt = Math.round(ob.stuck ? ob.y : FLOOR + 1);
        var cnv = T.knife[ob.knife][tilt].canvas, hgt = cnv.height - 1 - depth;
        /* the point stays where it went in; the lean swings the handle */
        var kx = x - KN_AX - knifeShift(ob.knife, L - 1, TILTS[tilt]);
        ctx.drawImage(cnv, 0, 0, cnv.width, hgt, kx, pt - L, cnv.width, hgt);
      } else {
        Tint.rect(ctx, x - L / 2, FLOOR + 6, L, 1, K.void, 6);
        ctx.drawImage(T.knifeLie[ob.knife].canvas, x - Math.round(L / 2) - 1, FLOOR);
      }
    } else if (kind === 'scoop') {
      if (ob.pop) {
        rect(ctx, x - 2, Math.round(ob.y) - 1, 5, 2, P.cream);
        dot(ctx, x - 1, Math.round(ob.y) + 1, P.cream);
      } else {
        var g = clamp(since / 0.6, 0, 1), w = Math.round(9 + 4 * g);
        rect(ctx, x - Math.floor(w / 2), FLOOR + 2, w, 2, P.cream);
        rect(ctx, x - Math.floor(w / 2) + 1, FLOOR + 1, w - 4, 1, P.cream);
        rect(ctx, x - Math.floor(w / 2), FLOOR + 3, w, 1, P.scoopShade);
        dot(ctx, x - 2, FLOOR + 1, '#ffffff');
      }
    } else if (kind === 'spicy') {
      ctx.drawImage(T.sauceLie.canvas, x - 11, FLOOR - 2);
    } else if (kind === 'gold') {
      ctx.drawImage(T.bean[0].canvas, x - 7, FLOOR - 1);
    } else {
      ctx.drawImage(T.beaters[0].canvas, x - 10, FLOOR - 12);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------- the spare life */

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var bx = Math.round(ob.x);
    if (!ob.held) {
      /* its shadow, and the grounds that fell off it onto the stone */
      Tint.rect(ctx, bx - 11, FLOOR + 1, 22, 2, K.void, 7);
      for (var s2 = 0; s2 < 6; s2++) {
        var hh = hash(Math.floor(ob.phase * 1000) + s2 * 131);
        dot(ctx, bx - 15 + (hh % 30), FLOOR + 1 + ((hh >>> 5) % 4), (hh & 1) ? P.grounds : P.puck);
      }
    }
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 6 + ob.dy);
    /* the jade every spare life wears, the house's pulse */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + (ob.age || 0) * 2.6);
    var r = Math.round(20 + pulse * 4);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    /* half again the Table's alpha: a jade halo on near-white quartz is
       a faint thing, and the dark pucks inside it need it to say "gift" */
    g.addColorStop(0, 'rgba(147,216,189,' + (0.78 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.36 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.drawImage(T.pucks.canvas, x - 11, y - 6);
    for (var i = 0; i < 3; i++) {
      var k = wrap(ob.phase * 0.22 + (ob.age || 0) * 0.3 + i * 0.34, 1);
      dot(ctx, x - 7 + i * 7, y - 10 - Math.round(k * 11), i === 1 ? '#ffffff' : P.lifePale);
    }
  }

  /* ------------------------------------------------------- the litter

     On the stone under the kill line, never boxed: a scatter of spent
     grounds, a stray coffee bean, a ring of water off the wand's purge. */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2, i, h;
    if (ob.kind === 0) {
      for (i = 0; i < 7; i++) {
        h = hash(ob.seed + i * 977);
        dot(ctx, x + (h >>> 3) % 16, y + 1 + (h >>> 11) % 4, (h & 1) ? P.grounds : P.puck);
      }
    } else if (ob.kind === 1) {
      rect(ctx, x + 6, y + 2, 3, 2, P.bean);
      dot(ctx, x + 7, y + 2, P.puckHi);
      Tint.rect(ctx, x + 6, y + 4, 3, 1, K.void, 6);
    } else {
      rect(ctx, x + 2, y + 2, 10, 1, K.quartzHi);
      rect(ctx, x + 1, y + 3, 12, 1, K.quartzShade);
      rect(ctx, x + 3, y + 3, 8, 1, K.quartz);
      rect(ctx, x + 2, y + 4, 10, 1, K.quartzHi);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawMachine(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* THE OVERLAY, over everything that falls and under the doodad: the
     fryer's heat streaming off its face across the bay - a shimmer and
     the streaks of hot air - and the Instant Pot's cloud rolling out
     under the uppers once its column lets go. Both read the machines'
     own x, so both hold still on pause. */
  var STREAKS = 18;
  function drawOverlay(ctx, obstacles, run) {
    var blowing = false;
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'spike') continue;
      if (ob.kind === 'fryer') {
        var k = blastK(ob.x);
        if (k <= 0) continue;
        blowing = true;
        var X = Math.round(ob.x), g = ctx.globalAlpha;
        ctx.globalAlpha = g * k;
        ctx.drawImage(T.heat[Math.floor(ob.x / 3) & 3].canvas, X - 200, FLOOR - 64);
        ctx.globalAlpha = g;
        var run0 = FR_FIRE - ob.x;
        for (var s = 0; s < STREAKS; s++) {
          var h = hash(s * 31 + 7), len = 8 + h % 12;
          var sx = X - 4 - wrap(run0 * 3.4 + s * 29 + (h >>> 5) % 20, 240);
          var sy = FLOOR - 60 + (h >>> 9) % 56;
          ctx.globalAlpha = g * k * (1 - 0.6 * (X - sx) / 240);
          rect(ctx, Math.round(sx), sy, len, 1, (h & 1) ? FX.hotHi : FX.hotMid);
          if ((h >>> 3) % 3 === 0) rect(ctx, Math.round(sx) + 2, sy + 1, len - 4, 1, FX.hot);
        }
        ctx.globalAlpha = g;
      } else if (ob.kind === 'pot' && ob.x <= POT_GONE && ob.x > POT_GONE - 70) {
        var q = (POT_GONE - ob.x) / 70, cx = Math.round(ob.x) + VALVE[0];
        for (var b = 0; b < 5; b++) {
          var sp = (b - 2) * 18 * ease(q) + (b - 2) * 3;
          puff(ctx, cx + sp, CEIL + 12 + (b & 1) * 6 - q * 4, 6 + q * 8, (1 - q) * 0.45);
        }
      }
    }
    /* THE ONE WRITE A DRAW MAKES, and it can only take a push away: the
       drift is a STATE that stepWorld keeps current, and stepWorld does
       not run while Buster's tape plays the room back - so a blast that
       was blowing when the tape began would otherwise go on blowing at him
       for the whole of the rewind. If no fryer on the screen is blowing,
       nothing is. */
    var L = run && run.ledger;
    if (L && L.drift > 0 && !blowing) L.drift = 0;
  }

  /* THE FRONT, over the doodad: four streaks of the blast across him
     while it has hold of him, so being in it is seen on him */
  function drawFront(ctx, run, state) {
    var L = run && run.ledger;
    if (!L || !(L.drift > 0) || state !== 'play') return;
    var k = clamp(L.drift / 240, 0.3, 1), sc = run.scroll || 0, g = ctx.globalAlpha;
    for (var i = 0; i < 4; i++) {
      var h = hash(i * 53 + 11);
      var sx = run.px + 30 - wrap(sc * 3 + i * 23, 70), sy = run.py - 10 + (h % 20);
      ctx.globalAlpha = g * 0.7 * k;
      rect(ctx, Math.round(sx), Math.round(sy), 8 + (h >>> 4) % 6, 1, i & 1 ? FX.hotHi : FX.hotMid);
    }
    ctx.globalAlpha = g;
  }

  /* ======================================================= THE COVER

     118x114 on the big card, 82x94 on the side ones; the caller has
     clipped. A live miniature of this view at the bay's own row
     fractions: the lid with its strip of light across the top, the
     mosaic under its warm wash sliding at the wall's pace, a stack of
     boards standing and a glass upper hanging, the Instant Pot between
     them with its geyser going up to the lid - the one white column on
     the card - and a knife coming down point-first; the quartz across
     the bottom with two specks of grounds. The big card adds the air
     fryer with its drawers out and the heat streaming off it. Nothing
     glows. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22, i, k, yy;
    var lidB = y + Math.round(h * 0.09), floorY = y + Math.round(h * 0.9);
    /* the splash: warm under the lid, grey toward the stone, in strips -
       the lifted wall's values, as the bay has them */
    for (yy = lidB; yy < floorY; yy++) {
      var f = (yy - lidB) / Math.max(1, floorY - lidB);
      rect(ctx, x, yy, w, 1, mix('#bdb7aa', '#a29c90', f));
      if (((yy - lidB) & 1) === 1) {
        rect(ctx, x, yy, w, 1, mix('#a7a195', '#8f897e', f));
        var off = Math.round(wrap(-s * 0.88 + (yy * 37) % 23, 23));
        for (k = x - 23 + off; k < x + w; k += 23) dot(ctx, k, yy, '#7b766d');
      }
    }
    Tint.rect(ctx, x, lidB, w, Math.round(h * 0.12), K.underLight, 5);
    Tint.rect(ctx, x, lidB, w, Math.round(h * 0.05), K.underLight, 4);
    /* the counter, and two specks of grounds sliding on it */
    rect(ctx, x, floorY, w, y + h - floorY, K.quartz);
    rect(ctx, x, floorY, w, 1, K.quartzShade);
    rect(ctx, x, floorY + 2, w, 1, K.quartzHi);
    for (i = 0; i < 2; i++) dot(ctx, x + Math.round(wrap(w * 0.3 + i * 47 - s, w + 10)) - 5, floorY + 4 + i, P.grounds);

    /* the boards and the upper, sliding past with the pot between */
    var period = big ? 64 : 52, span = floorY - lidB;
    for (i = 0; i < 3; i++) {
      var trip = wrap(s + i * period, period * 3);
      var ox = Math.round(x + w + 12 - trip);
      if (ox < x - 50 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.36);
      var gapY = Math.round(lidB + 6 + ((i * 23) % Math.max(1, span - gapH - 12)));
      /* the glass upper */
      rect(ctx, ox - 1, lidB, 12, gapY - lidB, P.outline);
      rect(ctx, ox, lidB, 10, gapY - lidB - 2, K.cabinet);
      rect(ctx, ox + 2, lidB, 6, gapY - lidB - 5, K.glassDark);
      rect(ctx, ox + 8, gapY - 9, 1, 5, K.pullLit);
      rect(ctx, ox, gapY - 2, 10, 1, K.underLight);
      /* the boards */
      var by = gapY + gapH;
      rect(ctx, ox - 1, by, 12, floorY - by, P.outline);
      for (yy = by + 1; yy < floorY; yy += 2) {
        for (k = 0; k < 10; k += 3) {
          var tn = ((k / 3 + (yy - by) / 2) | 0) % 3;
          rect(ctx, ox + k, yy, Math.min(3, 10 - k), 2, [P.walnut, P.maple, P.cherry][tn]);
        }
      }
      rect(ctx, ox - 2, by, 14, 2, P.maple);
      if (i !== 1) continue;
      /* THE INSTANT POT in the bay behind, and its geyser */
      var px = ox + 20, pw = 14, ph = 14;
      rect(ctx, px - 1, floorY - ph - 1, pw + 2, ph + 1, P.outline);
      rect(ctx, px, floorY - ph + 3, pw, ph - 3, K.steel);
      rect(ctx, px, floorY - ph + 3, 2, ph - 3, K.steelLit);
      rect(ctx, px, floorY - ph, pw, 3, K.blackGlass);
      rect(ctx, px + 5, floorY - ph + 6, 4, 4, P.panelFace);
      var q = trip / (period * 3);
      if (q > 0.33 && q < 0.6) {
        /* the geyser, billowing as it climbs, a cloud where it tops out */
        var gy = floorY - ph - 1, gt = lidB + 4 + Math.round(span * 0.12), cx = px + 10;
        for (yy = gt; yy < gy; yy++) {
          var bw = 2 + Math.round(1.5 + 1.5 * Math.sin(yy * 0.55 + t * 9));
          rect(ctx, cx - bw, yy, bw * 2 + 1, 1, P.steamDeep);
          rect(ctx, cx - bw + 1, yy, bw * 2 - 1, 1, P.steam);
          if (((yy + Math.floor(t * 20)) % 5) < 2) dot(ctx, cx - bw + 1, yy, P.steamHi);
        }
        rect(ctx, cx - 6, gt - 3, 13, 4, P.steamDeep);
        rect(ctx, cx - 5, gt - 4, 11, 4, P.steam);
        rect(ctx, cx - 3, gt - 5, 6, 2, P.steamHi);
      } else if (q > 0.22 && q <= 0.33) {
        dot(ctx, px + 10, floorY - ph - 3 - (Math.floor(t * 10) & 1), P.steamHi);
      }
      /* THE AIR FRYER on the big card, its drawers out, the heat off it */
      if (big) {
        var fx = ox + 46, fw = 15, fh = 12;
        rect(ctx, fx - 1, floorY - fh - 1, fw + 2, fh + 1, P.outline);
        rect(ctx, fx, floorY - fh, fw, 3, K.blackGlass);
        rect(ctx, fx, floorY - fh + 3, fw, 1, K.steel);
        rect(ctx, fx, floorY - fh + 4, fw, fh - 4, K.blackGlassLit);
        rect(ctx, fx + 3, floorY - fh + 5, 1, 5, K.pullLit);
        rect(ctx, fx + 11, floorY - fh + 5, 1, 5, K.pullLit);
        for (k = 0; k < 3; k++) {
          var sx = fx - 4 - Math.round(wrap(t * 70 + k * 13, 34));
          rect(ctx, sx, floorY - 4 - k * 4, 5, 1, k & 1 ? FX.hotHi : FX.hotMid);
        }
      }
    }

    /* a knife coming down point-first */
    var kx = x + Math.round(w * 0.36);
    var ky = lidB + Math.round(wrap(s * 1.4, floorY - lidB - 4)) - 12;
    for (i = 0; i < 13; i++) {
      var yk = ky + i;
      if (yk < lidB || yk >= floorY) continue;
      if (i < 5) { rect(ctx, kx - 1, yk, 2, 1, P.handle); continue; }
      rect(ctx, kx - 1, yk, 1, 1, '#ffffff');
      if (i < 11) dot(ctx, kx, yk, K.steelLit);
    }

    /* the lid, the strip of light, the edge */
    rect(ctx, x, y, w, lidB - y, K.cabinet);
    rect(ctx, x, y, w, 2, K.cabinetDeep);
    rect(ctx, x, lidB - 4, w, 1, K.cabinetLit);
    rect(ctx, x, lidB - 3, w, 1, K.underLight);
    rect(ctx, x, lidB - 2, w, 1, '#f3dba6');
    rect(ctx, x, lidB - 1, w, 1, P.outline);

    /* the doodad flying it, the Couch's block */
    var ddx = Math.round(x + w * 0.22);
    var ddy = Math.round(y + h * 0.42 + Math.sin(t * 3.1) * (h * 0.12));
    var sz = big ? 8 : 6;
    rect(ctx, ddx - sz / 2 - 1, ddy - sz / 2 - 1, sz + 2, sz + 2, P.outline);
    rect(ctx, ddx - sz / 2, ddy - sz / 2, sz, sz, '#c9873c');
    rect(ctx, ddx - sz / 2, ddy - sz / 2, sz - 2, 1, '#eab873');
    dot(ctx, ddx + sz / 2 - 2, ddy - 1, P.outline);
    rect(ctx, ddx + sz / 2, ddy, 2, 1, '#f3cc84');
  }

  /* ===================================================== GENERATION */

  /* the run's notebook: where this bay's plank is, the machines' turn,
     which ones have been introduced, and the counts the headless checks
     read back (stats) */
  function book(run) {
    var L = run && run.ledger;
    if (!L) return { seen: {}, turn: -1, stats: newStats() };
    if (!L.seen) { L.seen = {}; L.turn = -1; L.stats = newStats(); }
    return L;
  }
  function newStats() {
    var o = { made: {}, onScreen: {}, fired: {}, sparks: 0, scoops: 0, scoopsBroke: 0,
              knives: 0, stuck: 0, pushFrames: 0, pushes: 0 };
    for (var i = 0; i < KINDS.length; i++) { o.made[KINDS[i]] = 0; o.onScreen[KINDS[i]] = 0; o.fired[KINDS[i]] = 0; }
    return o;
  }

  /* Boards 4 in 10, maple-heavy 3, butcher block 3; a door with its pull
     right or left, or the open shelf, one in five. The maker also writes
     down where this bay's plank is and how far it is from the last one -
     makeSpikes and makeBoon for the same bay run straight after it, and a
     machine has to know where the next stack will stand. */
  function makePillar(x, gapY, gapH, run) {
    var v = Math.random();
    var ob = { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
               variant: v < 0.4 ? 0 : (v < 0.7 ? 1 : 2), scored: false };
    if (run && run.ledger) {
      var L = book(run);
      if (L.plank) L.spacing = x - L.plank.x;
      L.plank = ob;
    }
    return ob;
  }

  /* THE MACHINES, in the order the owner meets them: each from its own
     pace, and a new one always comes the first time the slot rolls after
     its pace (with its own banner), the gentlest first. After that they
     take turns - never the same machine twice running. */
  var ROSTER = [['espresso', 6], ['press', 9], ['pot', 13], ['fryer', 17], ['micro', 21], ['maker', 25]];

  /* ONE MACHINE, whatever side the engine rolled and however many spikes
     it asked for: the slot is the spike slot because a machine is "a
     hazard standing between two planks" with one move, exactly the
     Table's bottle, and spikeChance -> spikeChanceMax is the "how often is
     there a machine in a bay" knob. At most one per bay by construction.

     It stands on the engine's x (mid +-14) and is then held at least 6 px
     clear of both caps, the espresso's plume included: the next plank is
     the one the ledger just wrote down plus the last spacing. ob.x is the
     body's left edge and ob.w covers everything it ever boxes, the jet's
     reach too, so collide()'s cull never drops a live box. */
  function makeSpikes(x, side, count, maxLen, run) {
    var L = book(run), score = run ? run.score : 99, kind = null, i, j;
    for (i = 0; i < ROSTER.length; i++) {
      if (ROSTER[i][1] <= score && !L.seen[ROSTER[i][0]]) { kind = ROSTER[i][0]; L.turn = i; break; }
    }
    if (!kind) {
      for (j = 1; j <= ROSTER.length; j++) {
        i = wrap(L.turn + j, ROSTER.length);
        if (ROSTER[i][1] <= score) { kind = ROSTER[i][0]; L.turn = i; break; }
      }
    }
    if (!kind) { kind = 'espresso'; L.turn = 0; }
    var first = !L.seen[kind];
    L.seen[kind] = true;
    var W = MSPR[kind].W, bx = Math.round(x - W / 2), hi = 9999;
    if (L.plank) {
      var lo = L.plank.x + 38 + 6;
      hi = L.plank.x + (L.spacing > 0 ? L.spacing : 182) - 4 - 6 - 1;
      var need = kind === 'espresso' ? WAND[0] + ESP_RMIN + 8 : W;
      bx = Math.round(clamp(bx, lo, Math.max(lo, hi - need)));
    }
    var ob = { type: 'spike', side: kind === 'micro' ? 'ceil' : 'floor', kind: kind,
               x: bx, w: W, lastX: bx, first: first, deflect: true, spikes: [] };
    if (kind === 'espresso') {
      ob.reach = Math.round(clamp(hi - (bx + WAND[0]) - 8, ESP_RMIN, ESP_RMAX));
      ob.w = WAND[0] + ob.reach + 9;
    }
    L.machine = { x: bx, w: ob.w, kind: kind, plank: L.plank };
    L.stats.made[kind]++;
    return ob;
  }

  /* ONE MAKER FOR THE KNIVES AND THE GIFTS. The engine says spicy, and
     sets the spin after this returns; a crow's 'gold' makes the bean and
     'plain' makes a knife, and neither touches anything of this bay's. A
     knife is born with its point just under the lid, so it comes down
     out of the uppers. */
  function makeDrop(x, spicy, fall, run, want) {
    var gold = want === 'gold';
    var u = Math.random(), kn = u < KNIFE_ODDS[0] ? 0 : (u < KNIFE_ODDS[0] + KNIFE_ODDS[1] ? 1 : 2);
    var len = KNIVES[kn].L;
    var ob = { type: 'drop', x: x, y: CEIL + 2 - len / 2, vy: fall, spicy: !!spicy, gold: gold, broken: 0,
               w: 8, knife: kn, tilt: randInt(0, 2), spin: 0, spinRate: 0,
               landCry: 'thunk', burst: [K.steelLit, K.steel], splat: SPLAT_TIME };
    if (spicy) { ob.y = CEIL + 4; ob.w = 12; ob.landCry = 'clink'; ob.burst = [P.sauceHi, P.sauce]; ob.splat = 1.2; }
    if (gold) { ob.y = CEIL + 4; ob.w = 14; ob.name = GOLD_NAME; ob.landCry = ''; ob.burst = [P.goldHi, P.gold]; ob.splat = 1.2; }
    if (run && run.ledger && !spicy && !gold) book(run).stats.knives++;
    return ob;
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 16, kind: randInt(0, 2), seed: randInt(1, 100000) };
  }

  /* THE COFFEE GROUNDS, standing on the stone. If this bay has a machine
     and the pucks would stand against it, they move to its right - or to
     its LEFT for the espresso, whose plume goes right, or if the right
     side is too near the next board: a gift under a live attack is a gift
     that kills whoever dives for it. */
  function makeBoon(x, run) {
    var L = run && run.ledger;
    if (L && L.machine && L.machine.plank === L.plank && L.plank) {
      var m = L.machine;
      if (x + 12 > m.x - 6 && x - 12 < m.x + m.w + 6) {
        var right = m.x + m.w + 12 + 12;
        var next = L.plank.x + (L.spacing > 0 ? L.spacing : 182) - 4;
        if (m.kind === 'espresso' || right + 12 > next - 8) x = m.x - 12 - 12;
        else x = right;
      }
    }
    return { type: 'boon', x: x, y: FLOOR - 6, w: 24, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0, name: BOON_NAME,
             burst: [P.puckHi, P.puckLit, P.lifePale, P.lifeJade] };
  }

  /* --------------------------------------------------------- physics */

  /* where a falling knife's point is, x: the lean slides the point */
  function knifePointX(ob) {
    return ob.x + knifeShift(ob.knife, KNIVES[ob.knife].L - 1, TILTS[ob.tilt]) + 0.5;
  }

  /* the solid boxes of a machine's body in its current frame, on screen */
  var BB = [];
  function bodyBoxes(ob, out) {
    var f = machineFrame(ob), bx = T.machine[ob.kind][f].boxes, X = Math.round(ob.x), top = topOf(ob.kind);
    for (var i = 0; i < bx.length; i++) {
      var y0 = top + bx[i][1], h = bx[i][3];
      if (y0 < CEIL) { h -= CEIL - y0; y0 = CEIL; }
      if (h > 0) out.push([X + bx[i][0], y0, bx[i][2], h]);
    }
    return out;
  }
  function inBoxes(boxes, x, y, pad) {
    for (var i = 0; i < boxes.length; i++) {
      var b = boxes[i];
      if (x >= b[0] - pad && x < b[0] + b[2] + pad && y >= b[1] - pad && y < b[1] + b[3] + pad) return true;
    }
    return false;
  }

  /* the gifts' heights, for where they come to rest on the stone */
  var GIFT_HALF = { spicy: 10, whirl: 8, gold: 4 };

  /* stepDrop owns every drop in this bay.
       - A KNIFE falls at DROP_GRAV. Its POINT is what meets things: the top
         of a board's cap (it STICKS, 'thunk', and stands in the board), a
         machine's body ('clink', and it is gone in a burst of steel), the
         stone (it stands a beat on its point, then falls over). One born
         where a microwave hangs is slid out from behind it on its first
         step, before it has been seen to move.
       - THE GIFTS fall at the brownie's 170, slower than steel.
       - A SPARK falls under 520 and burns out at SPARK_LIFE; it never lands.
       - A SCOOP flies its arc under 420, breaks on a board or a machine
         ('pat'), or lands on the stone and melts. */
  function stepDrop(ob, dt, obstacles, run) {
    var kind = kindOf(ob), i, o;
    if (kind === 'spark') {
      ob.vy += SPARK_G * dt; ob.y += ob.vy * dt; ob.x += ob.vx * dt;
      if ((ob.age || 0) >= SPARK_LIFE) ob.gone = true;
      return false;
    }
    if (kind === 'scoop') {
      ob.vy += SCOOP_G * dt; ob.y += ob.vy * dt; ob.x += ob.vx * dt;
      for (i = 0; i < obstacles.length; i++) {
        o = obstacles[i];
        if (o.type === 'pillar') {
          BB.length = 0; rectsFor(o, BB);
          if (inBoxes(BB, ob.x, ob.y, 2)) { ob.pop = true; if (run) book(run).stats.scoopsBroke++; return true; }
        } else if (o.type === 'spike' && (ob.age || 0) > 0.2) {
          BB.length = 0; bodyBoxes(o, BB);
          if (inBoxes(BB, ob.x, ob.y, 2)) { ob.pop = true; return true; }
        }
      }
      return ob.y >= FLOOR - 4;
    }
    if (kind !== 'knife') {
      if (!ob.dressed) {
        ob.dressed = true;
        if (ob.y < CEIL + 4) ob.y = CEIL + 4;
        if (kind === 'whirl') { ob.w = 16; ob.landCry = 'clank'; ob.burst = [P.whirlHi, P.whirl]; ob.splat = 1.2; }
      }
      ob.vy += 170 * dt;
      ob.y += ob.vy * dt;
      return ob.y >= FLOOR - GIFT_HALF[kind];
    }
    /* THE KNIFE */
    var L = KNIVES[ob.knife].L;
    if (!ob.checked) {
      ob.checked = true;
      for (i = 0; i < obstacles.length; i++) {
        o = obstacles[i];
        if (o.type === 'spike' && o.kind === 'micro' && ob.x > o.x - 6 && ob.x < o.x + 82) {
          ob.x = (ob.x < o.x + 38) ? o.x - 7 : o.x + 83;
        }
      }
    }
    var pt0 = ob.y + L / 2;
    ob.vy += DROP_GRAV * dt;
    ob.y += ob.vy * dt;
    var pt = ob.y + L / 2, px = knifePointX(ob);
    for (i = 0; i < obstacles.length; i++) {
      o = obstacles[i];
      if (o.type === 'pillar') {
        var capTop = o.gapY + o.gapH;
        if (px >= o.x - 4 && px < o.x + 38 && pt >= capTop + 2 && pt0 < capTop + 10) {
          ob.y = capTop + 3; ob.x = px - 0.5;
          ob.tilt = 0; ob.pop = true; ob.stuck = true; ob.splat = SPLAT_TIME;
          if (run) { run.ledger.cry = 'thunk'; book(run).stats.stuck++; }
          return true;
        }
      } else if (o.type === 'spike' && o.kind !== 'micro') {
        if (px < o.x - 2 || px > o.x + MSPR[o.kind].W + 2) continue;
        BB.length = 0; bodyBoxes(o, BB);
        if (inBoxes(BB, px, pt, 0)) {
          ob.y = pt; ob.pop = true; ob.shattered = true; ob.splat = 0.3;
          if (run) run.ledger.cry = 'clink';
          return true;
        }
      }
    }
    if (pt >= FLOOR - 1) { ob.x = px - 0.5; ob.tilt = 0; return true; }
    return false;
  }

  /* THE ROOM'S OWN STEP, once a frame: each machine's moves as it
     crosses its thresholds - the cries, the shakes, the sparks and scoops
     it throws, its banner the first time it comes on screen - the fryer's
     push into the engine's drift (a STATE, written every frame, 0 when no
     fryer is blowing), and the knives standing on the stone falling over.
     ob.lastX lives on the machine, which is per-run by nature. */
  function stepWorld(dt, obstacles, run) {
    var L = book(run), push = 0, i, ob, n;
    for (i = 0; i < obstacles.length; i++) {
      ob = obstacles[i];
      if (ob.type === 'spike') {
        var x = ob.x, lx = ob.lastX === undefined ? x + 1 : ob.lastX;
        if (lx > VW - 12 && x <= VW - 12) {
          L.stats.onScreen[ob.kind]++;
          if (ob.first) { L.warn = ob.kind; ob.first = false; }
        }
        if (x > -80 && x < VW + 20) machineEvents(ob, lx, x, run, L);
        if (ob.kind === 'fryer') push = Math.max(push, fryerPush(ob, run));
        ob.lastX = x;
      } else if (ob.type === 'drop' && ob.broken > 0 && !ob.stuck && !ob.toppled && !ob.shattered &&
                 kindOf(ob) === 'knife' && ob.broken < (ob.splat || SPLAT_TIME) - 0.25) {
        ob.toppled = true;
        L.cry = 'clink';
      }
    }
    if (push > 0) {
      if (!(L.drift > 0)) L.stats.pushes++;
      L.stats.pushFrames++;
    }
    L.drift = push;
  }

  function cry(L, role, shake) {
    L.cry = role;
    if (shake) L.shake = Math.max(L.shake || 0, shake);
  }

  function machineEvents(ob, lx, x, run, L) {
    var k = ob.kind, i, X = Math.round(x), top = topOf(k);
    if (k === 'espresso') {
      if (crossed(lx, x, ESP_TELL)) cry(L, 'hiss');
      if (crossed(lx, x, ESP_FIRE)) { cry(L, 'steam'); L.stats.fired[k]++; }
    } else if (k === 'press') {
      if (crossed(lx, x, PR_TELL)) cry(L, 'tick');
      if (crossed(lx, x, PR_SLAM)) { cry(L, 'slam', 2); L.stats.fired[k]++; }
      if (crossed(lx, x, PR_SHUT)) cry(L, 'sizzle');
    } else if (k === 'pot') {
      if (crossed(lx, x, POT_TELL) || crossed(lx, x, POT_TELL2)) cry(L, 'whistle');
      if (crossed(lx, x, POT_FIRE)) { cry(L, 'steam', 2); L.stats.fired[k]++; }
    } else if (k === 'fryer') {
      if (crossed(lx, x, FR_T1) || crossed(lx, x, FR_T2) || crossed(lx, x, FR_T3)) cry(L, 'tick');
      if (crossed(lx, x, FR_FIRE)) { cry(L, 'slam', 3); L.stats.fired[k]++; }
      if (crossed(lx, x, FR_IN)) cry(L, 'tock');
    } else if (k === 'micro') {
      if (crossed(lx, x, MI_TELL)) cry(L, 'ding');
      if (crossed(lx, x, MI_DOOR) || crossed(lx, x, MI_SHUT)) cry(L, 'tock');
      for (i = 0; i < SPARK_AT.length; i++) {
        if (!crossed(lx, x, SPARK_AT[i])) continue;
        if (i === 0) L.stats.fired[k]++;
        L.stats.sparks++;
        run.born.push({ type: 'drop', spark: true, shot: true, x: X + 15 + rand(0, 28), y: top + 34,
                        vx: rand(-45, 35), vy: rand(40, 110), w: 5, broken: 0, spicy: false,
                        cry: (i % 3 === 0) ? 'zap' : undefined, burst: [FX.hotHi, FX.hotMid] });
      }
    } else if (k === 'maker') {
      if (crossed(lx, x, MK_TELL)) cry(L, 'whirr');
      if (crossed(lx, x, MK_POP)) { cry(L, 'pop', 1); L.stats.fired[k]++; }
      if (crossed(lx, x, MK_SHUT)) cry(L, 'tock');
      for (i = 0; i < SCOOP_AT.length; i++) {
        if (!crossed(lx, x, SCOOP_AT[i])) continue;
        L.stats.scoops++;
        run.born.push({ type: 'drop', scoop: true, shot: true, x: X + BOWL[0], y: top + BOWL[1] - 2,
                        vx: -rand(SCOOP_VX0, SCOOP_VX1), vy: SCOOP_VY, w: 8, broken: 0, spicy: false,
                        cry: i === 0 ? 'clank' : undefined,
                        landCry: 'pat', burst: [P.cream, '#ffffff'], splat: 1.2 });
      }
    }
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one: a
     machine's body in every frame (read off its own pixels), and its
     attack only while it is drawn - the jet on its axis a box every 4 px,
     inside its chain of steam balls and never past either end of the
     plume drawn on that frame; the geyser 8 wide
     on its 12 drawn; a knife the columns painted on every row of each
     five (T.knifeBox), the spark its cross and the scoop its ball as two
     boxes each - never a bounding box. Swept headless through every phase
     of every machine in half-pixel steps (6,700 frames, some 33,000
     boxes): the knives, sparks, scoops, the pot, the fryer, the microwave
     and the maker land on painted pixels to the pixel; the press's and
     the espresso's bodies leave a pixel of a rounded corner here and there
     (a quarter of one percent of their box pixels at worst), and the jet
     four box pixels in ten thousand, at its sub-pixel ends. */
  function attackRects(ob, out) {
    var i, X;
    if (ob.kind === 'espresso') {
      var j = espJet(ob.x);
      if (!j) return out;
      var uT = j[0], uH = j[1], tip = espTip(ob), R = ob.reach, step = 4 / R;
      var xa = tip[0] + Math.ceil(R * uT), xb = tip[0] + Math.floor(R * uH);
      for (var u = 0; u <= 1.0001; u += step) {
        if (u < uT + 0.03 || u > uH - 0.03) continue;
        /* a box 8 px shorter than the steam is thick there, and narrower
           than it is tall: inside the chain of steam balls (espBallR) by
           construction, corners and all, on a plume climbing at 0.75 */
        var side = espBoxH(u), wide = espBoxW(u);
        var cx = tip[0] + R * u, cy = tip[1] - ESP_SLOPE * R * u;
        /* never past either end of the steam drawn on this frame */
        var l = Math.max(cx - wide / 2, xa + 1), r = Math.min(cx + wide / 2, xb - 1);
        if (r - l < 2) continue;
        out.push([l, cy - side / 2, r - l, side]);
      }
    } else if (ob.kind === 'pot') {
      var col = potColumn(ob);
      if (!col) return out;
      for (var y = col[1]; y < col[2]; y += 10) out.push([col[0] - 4, y, 8, Math.min(10, col[2] - y)]);
    }
    return out;
  }

  function rectsFor(ob, out) {
    var i;
    if (ob.type === 'pillar') {
      /* the Coop's four boxes verbatim: a jogged board gives back a pixel
         or two inside the 34 the box keeps, and a graze on a board's
         corner is forgiven, not punished */
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, 34, topH]);
      out.push([ob.x - 4, ob.gapY - 9, 42, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, 42, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, 34, botH]);
    } else if (ob.type === 'spike') {
      bodyBoxes(ob, out);
      attackRects(ob, out);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      var kind = kindOf(ob);
      var RX = Math.round(ob.x), RY = Math.round(ob.y);
      /* the spark's cross and the scoop's ball, each as the two boxes
         that ARE the drawn shape, on the drawn pixel grid */
      if (kind === 'spark') { out.push([RX - 1, RY, 4, 2]); out.push([RX, RY - 1, 2, 4]); }
      else if (kind === 'scoop') { out.push([RX - 3, RY - 2, 7, 4]); out.push([RX - 2, RY - 3, 5, 6]); }
      else if (kind === 'spicy') out.push([ob.x - 4, ob.y - 10, 8, 20]);
      else if (kind === 'gold') out.push([ob.x - 6, ob.y - 4, 12, 8]);
      else if (kind === 'whirl') out.push([ob.x - 8, ob.y - 7, 16, 14]);
      else {
        var kb = T.knifeBox[ob.knife][ob.tilt], X = Math.round(ob.x);
        var yTop = Math.round(ob.y - KNIVES[ob.knife].L / 2);
        for (i = 0; i < kb.length; i++) {
          if (yTop + kb[i][1] + kb[i][3] <= CEIL) continue;
          out.push([X + kb[i][0], yTop + kb[i][1], kb[i][2], kb[i][3]]);
        }
      }
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 10, FLOOR - 11 + ob.dy, 21, 11]);
    }
    return out;
  }

  /* which part of a machine a point is in - for the headless checks'
     hit attribution: 'jet', 'column' or 'body' */
  function partAt(ob, x, y, r) {
    var A = [];
    attackRects(ob, A);
    for (var i = 0; i < A.length; i++) if (circleHitsRect(x, y, r, A[i][0], A[i][1], A[i][2], A[i][3])) return ob.kind === 'pot' ? 'column' : 'jet';
    return 'body';
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME, CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor, drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview, drawOverlay: drawOverlay, drawFront: drawFront,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop, GOLD_GIFT: true,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld,
    rectsFor: rectsFor,
    /* for the headless checks, read-only: the clocks and the parts */
    machineFrame: machineFrame, espJet: espJet, potColumn: potColumn, blastK: blastK,
    attackRects: attackRects, bodyBoxes: bodyBoxes, partAt: partAt, kindOf: kindOf,
    KINDS: KINDS
  };
})();
