/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM / THE TV   (3-5)

   The last bay of the Dining Room, and the camera is a hand's width
   from the dining-room television. Drawn from TV ref 1-3 (tvref/tv1,
   tv2, tv3) and the two close-ups cut from them (wall_crop, the woven
   marble; frame_corner, the mitred white frame): a big glossy black
   panel in a matte white picture-frame bezel, hung on a wall of woven
   marble strips - pale grey, veined like wood, each one a little curved
   pillow - that run in vertical chevron chains from the skirting to the
   ceiling. Switched off, the glass holds the room: the skylight well
   top and centre, the amber pendant hanging under it, the shutters at
   the bottom left and two little frames at the bottom right (tv1).

   THE PICTURE IS 218 ROWS TALL. The white top rail is the lid and its
   lower edge kills; the white bottom rail is the ground and its lit top
   arris kills; the woven wall shows above the one and below the other.
   EVERYTHING PHYSICAL IS IN FRONT OF THE GLASS and is drawn by the
   ordinary calls: columns of the same woven marble capped with lengths
   of the white rail (the pillars), dead pixels falling OUT of the
   picture (the Mantle's, exactly - the owner's words), the doodad.
   EVERYTHING BROADCAST IS INSIDE THE GLASS and is painted by
   drawBackdrop into a picture buffer before a pillar is laid over it:
   the programme, and the five power-ups, which are imagery - they tune
   in out of a blob of static, wear their red and blue misconvergence
   and bounce slowly up and down the picture like a screensaver - and
   are caught all the same, by flying through them, on the engine's
   ordinary collide path.

   THE LEVEL IS META IN FOUR STEPS, which is the owner's whole brief -
   "super meta, playing with the style, the quality, in all of the ways
   an old TV would":
     1. COLD OPEN on the set switched off, exactly tv1.
     2. IT COMES ON LIKE A CRT during GET READY - a dot, a line, the
        picture blooming out of the line, the degauss wobble - onto a
        test card, and on the first flap it starts CHANNEL-SURFING THE
        GAME'S OWN EARLIER LEVELS as low-res 4:3 reruns, each in an old
        set's look (black and white, sepia, a seventies tube, green
        phosphor, CGA, a worn tape). THE CHANNEL NUMBER IS THE BAY CODE:
        CH 11 is 1-1 THE COOP and CH 34 is 3-4 THE CEILING.
     3. It finds CH 35: THIS BAY, LIVE - a feedback tunnel of the room
        and of you, a frame late, each copy smaller, dimmer and a
        different colour. Then the set develops FAULTS, each announced
        by the set itself before it happens, and at first they stay
        INSIDE THE GLASS: they cost the player the power-ups' legibility
        and nothing else.
     4. Then the faults SPILL OUT onto the room and the doodad - snow
        over everything, the vertical hold slipping, tears, ghosts, the
        right of the picture collapsing, a mosaic - and the smooth
        doodad becomes chunky pixel art for the rest of the run. At
        death the tube collapses to a line, to a dot, and the black
        glass is what sits behind the results board.

   WHAT A FAULT MAY NEVER DO is move a thing without moving the doodad
   by exactly the same amount. rectsFor never reads a fault; a slipped,
   torn or ghosted frame is the whole frame, room and doodad together,
   and the HUD and the touch pads stand still on top of it. The fairness
   numbers are measured, not hoped for: see THE FAULTS.

   AND THE PICTURE IS BEHIND HIM, so it lights him from behind: a rim of
   the tube's cool light round his silhouette whenever the set is on (see
   rimLight). It is no wider than an outline, and it is the difference
   between a black bird on the black live feed and a hole in the picture.

   Same discipline as every other level file: everything is generated
   and baked once in build(); per-frame work is blits and fills; any
   shade laid over anything that scrolls is a flat fill or a baked
   sheet, never a Dither - there is no call to Dither.rect anywhere in
   this file; the dead pixel tumbles and the record turns by swapping
   baked frames; and there is no Math.random() anywhere a frame is
   drawn. Every flicker of static comes off the set's own stepped frame
   counter through the house hash, so a paused frame drawn twice is the
   same frame, snow and all.
------------------------------------------------------------------ */
'use strict';

var TV = (function () {

  /* the playfield every Dining Room bay shares, and the house's helpers */
  var CEIL = DiningRoom.CEIL, FLOOR = DiningRoom.FLOOR;
  var PIC_H = FLOOR - CEIL;                       /* 218 */
  var END_MIN = DiningRoom.END_MIN;
  var wrap = DiningRoom.wrap, hash = DiningRoom.hash;
  var ease = DiningRoom.ease, rgba = DiningRoom.rgba;
  var blitBelowCeil = DiningRoom.blitBelowCeil;

  /* ------------------------------------------------- THE SCORE LADDER

     Everything the set does that changes play keys off run.score, which
     is `pace` - about half a point a second. The first plan waited for
     twenty points before anything mattered and the owner has already
     sent one fog back for making no difference, so the ladder is
     compressed: a new rerun every two points, the live feed at 8, the
     faults at tune.lateScore (10, in js/levels.js, which is the engine's
     WARN.late), out of the glass at 16. Retune them here and only here.

        0  2  4  6   CH 11 COOP, 12 GARDEN, 13 DECK, 14 CANOPY
        6            dead pixels arm (tune.dropScore, the engine's)
        8  LIVE_AT   CH 35 LIVE becomes the channel: the feedback tunnel
       10            tune.lateScore: BAD RECEPTION, faults in the glass
       16 SPILL_AT   the faults come out into the room and onto him
       20 MOSAIC_AT  the mosaic joins the list
       26 DEEP_AT    faults a quarter longer and closer together, the
                     snow denser, the doodad two pixels to a pixel, the
                     tunnel deeper
       34 BROADCAST_AT  the room wears the picture's scanlines for good
       45 SLEEP_AT   the set offers to switch itself off. It does not. */
  var CH_EVERY = 2;
  var LIVE_AT = 8;
  var SPILL_AT = 16;
  var MOSAIC_AT = 20;
  var DEEP_AT = 26;
  var BROADCAST_AT = 34;
  var SLEEP_AT = 45;

  /* ------------------------------------------------------- the pigments

     Every value off the photographs, measured: the wall in tv1 averages
     176 of luminance below the set and 199 above it, its gaps go down to
     about 120 and its lit edges up to about 220; the frame's face reads
     235 to 248; the black glass 19; the skylight in it 121. */
  var P = {
    /* the switched-off panel, and the room standing in it (tv1) */
    glassDeep:   '#141416',
    glass:       '#1a1a1c',
    glassLo:     '#202024',
    reflWell:    '#5e6266',   /* the well's slanted sides, a shade down */
    reflCord:    '#2c2c30',
    reflShade:   '#5a3a14',   /* the amber pendant                       */
    reflShadeHi: '#8a5c1e',
    reflSlat:    '#5a5e63',   /* the shutters, bottom left               */
    reflSlatLit: '#6e737a',
    reflFrame:   '#2e3034',   /* the two little frames, bottom right     */
    reflFrameIn: '#3a3c40',
    reflSpark:   '#4e5258',

    /* Buster's channel: a VCR's blue screen */
    vcrBlue:     '#1a35b0',

    /* the matte white frame (frame_corner) */
    railLit:     '#f4f6f5',
    rail:        '#e3e6e5',
    railLip:     '#c8ccca',
    railIn:      '#b9bdbc',

    /* THE WOVEN MARBLE, most common first, and its shadows */
    weave0:      '#a59d94',
    weave1:      '#cbc5bd',
    weave2:      '#d4cec6',
    weave3:      '#c4bdb4',
    weave4:      '#b1aaa1',
    weave5:      '#dcd7d0',
    weave6:      '#beb7ae',
    weave7:      '#b9b2aa',
    weaveDeep:   '#9a9289',
    weaveHole:   '#8a8279',   /* the deep between two pillows          */
    weaveRim:    '#a8a097',   /* a pillow's edge on its lit side        */
    weaveGap:    '#7a7269',
    weaveHi:     '#e5e2dc',

    /* the one real object on the wall: the little dark sensor tab under
       the bottom rail (tv2, centre) */
    sensor:      '#26262a',
    sensorLit:   '#3e3e44',

    /* the set's own writing on the glass */
    osd:         '#8cff9c',
    osdShadow:   '#0c2a10',
    live:        '#ff3a3a',
    osdEmpty:    '#1e3a24',

    /* the test card: seventy-five percent bars, as every card was */
    cardWhite:   '#c0c0c0',
    cardYellow:  '#c0c000',
    cardCyan:    '#00c0c0',
    cardGreen:   '#00c000',
    cardMagenta: '#c000c0',
    cardRed:     '#c00000',
    cardBlue:    '#0000c0',
    cardBlack:   '#101010',
    cardInk:     '#f0f0f0',

    /* static */
    /* static, held under the marble like everything else in the glass:
       its brightest grain is 168, so a snowed picture never outshines the
       pillars standing in front of it */
    snowDark:    '#141418',
    snowMid:     '#5c5c62',
    snowHi:      '#a6aaae',

    /* the pillarbox either side of a 4:3 rerun, and the dead band a
       failing deflection leaves */
    box:         '#0a0a0c',
    boxEdge:     '#1a1a1e',
    band:        '#06060a',
    tunnel:      '#0e1216',
    tunnelDim:   '#090b0e',

    /* the falling things: the Mantle's dead pixel, by its own pigments */
    pxRed:       '#ff2a2a',
    pxGreen:     '#2aff3a',
    pxBlue:      '#2a5aff',
    pxWhite:     '#f4f4ff',
    pxOutline:   '#08080a',
    dust:        '#cfd3d1',

    /* a spare life glows the same jade in every level in the game */
    lifeJade:    '#5fae9a',
    lifePale:    '#93d8bd',

    outline:     '#101012',
    void:        '#08080a'
  };

  /* the weave's greys as one ramp, palest to darkest: a strip's shade is
     an index into it, and a strip's own tone shifts the index a step or
     two, which is how some strips in the photograph are darker than their
     neighbours all over */
  var WEAVE = [P.weaveHi, P.weave5, P.weave2, P.weave1, P.weave3, P.weave6,
               P.weave7, P.weave4, P.weave0, P.weaveDeep];

  /* The fifteen neutral effect colours the engine paints its particles,
     dust and washes from. The puff is a cold blue-white, because what
     comes off the top rail of this screen is a picture coming apart. */
  var FX = {
    /* dust in front of a dark screen is barely there - drawn any
       brighter it reads as stars in the pillarbox */
    motes: '#4c5258', motesHi: '#7c848c',
    puff: '#9ab0d8', puffHi: '#dde8ff',
    ground: '#9a9d9c', groundHi: '#d6d9d8',
    splat: '#ff4040', splatHi: '#f4f4ff',
    hot: '#ff3030', hotMid: '#ff7a5a', hotHi: '#ffd0c0',
    heat: '#ff3030', heatEdge: '#7a1818',
    glowCore: '255,208,192', glowEdge: '255,48,48'
  };

  /* The heads-ups. `spill` is this bay's own, written into the ledger by
     stepScreen at SPILL_AT and drained like any other. No apostrophes:
     the font has none. */
  var WARN = {
    drop:  ['▼ DEAD PIXELS ▼', 'THE PICTURE IS COMING APART'],
    late:  ['▲ BAD RECEPTION ▲', 'THE SET WILL SAY SO FIRST'],
    spill: ['▲ IT IS SPILLING OUT ▲', 'THE FAULTS ARE IN THE ROOM NOW'],
    ceil:  ['▲ THE TOP RAIL ▲', 'THE FRAME ENDS THE RUN']
  };

  var PREVIEW = {
    back: P.glass, backAlt: P.glassLo, seam: P.glassDeep,
    beam: P.weave2, beamDark: P.weave0, beamLight: P.weaveHi,
    ground: P.rail, groundDark: P.railIn, groundHi: P.railLit,
    spike: P.osd, spikeHi: '#dfffe4', air: '#c8d8e8', gloom: P.void
  };

  var BOON_NAME = 'SUCCULENT';
  var GOLD_NAME = 'GOLD APPLE';

  /* The dead pixel weighs what the Mantle's weighs - it IS the Mantle's -
     and lies on the rail for as long. */
  var DROP_GRAV = 36;
  var SPLAT_TIME = 1.5;

  var T = {};

  /* ------------------------------------------------ THE RENDER CACHE

     Module scope and never per-run state, the Bar's `view`. stepScreen
     advances `clock` and `frame` once a stepped frame; a paused frame is
     not stepped, so every seeded offset holds and a paused screenshot is
     the same twice. `captured` and `fed` say which frame the live feed
     last took and `shownFrame` which one the tunnel is showing (see
     drawBackdrop's two feed buffers), so the tunnel holds still while
     paused too. `S` is the set as drawBackdrop last saw it, for
     drawFloor, which is not handed the run. `obs` is the
     obstacle list as drawBackdrop was last handed it, which is how
     postBg finds the dead pixels it re-stamps. */
  var view = { clock: 0, frame: 0, captured: -1, fed: -1, shownFrame: -1, boots: 0,
               obs: null, S: null, forceQ: [] };

  /* -------------------------------------------------------- helpers */

  function hexRGB(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }

  /* an alpha sheet in one colour, through ImageData, at boot only */
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

  /* one composite fill, and the context put back the way it was found */
  function op(c, mode, colour, a, x, y, w, h) {
    c.globalCompositeOperation = mode;
    c.globalAlpha = a;
    c.fillStyle = colour;
    c.fillRect(x, y, w, h);
    c.globalCompositeOperation = 'source-over';
    c.globalAlpha = 1;
  }

  /* a sprite blown up, nearest neighbour, to whole pixels either way */
  function scaled(src, k) {
    var w = Math.round(src.width * k), h = Math.round(src.height * k);
    var t = makeCanvas(w, h);
    t.ctx.imageSmoothingEnabled = false;
    t.ctx.drawImage(src, 0, 0, src.width, src.height, 0, 0, w, h);
    return t;
  }

  /* the same shape, all one colour: the red and blue ghosts a badly
     converged tube lays either side of everything bright */
  function tinted(src, colour) {
    var t = makeCanvas(src.w, src.h);
    t.ctx.drawImage(src.canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-in';
    t.ctx.fillStyle = colour;
    t.ctx.fillRect(0, 0, src.w, src.h);
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }

  function twin(src) {
    return { img: src, red: tinted(src, '#ff2040'), blue: tinted(src, '#2060ff') };
  }

  /* --------------------------------------------------- THE WOVEN WALL

     wall_crop and tv1, at the game's own scale. The television's glass is
     218 rows tall here and 590 pixels tall in tv1, so the photograph is
     0.369 of a game pixel to the pixel, and at that scale its wall
     autocorrelates at 23.3 pixels across (one chevron chain to the next)
     and 12.9 down (one strip to the next): this tile is 96x48, four
     chains of two columns across and four strips down, which is the
     photograph's own pitch rounded to whole pixels. The frame's rail,
     22 photo pixels thick, comes out at the 7 rows the rails below are.

     ONE STRIP is a rounded pillow about 19 long and 8.8 thick whose LONG
     AXIS leans 35 degrees (A10: a horizontal strip with slanted ends is a
     different wall). It is shaded ACROSS its thickness - the lit upper
     edge, the body stepping down through the photograph's greys, the
     darker lower edge - and fuller in the middle of its length than at its
     ends, where the pillow turns away from the skylight; four broken veins
     run ALONG it, because this is a wood-grained marble and the grain is
     what tv2 is mostly a photograph of.

     THE WEAVE. Neighbouring columns lean opposite ways, so each pair is a
     stack of chevrons, and the wall reads as vertical chains (tv1, tv3):
     inside a chain the two strips of a chevron cross at its apex, and
     which one lies on top alternates down the chain - a braid; between
     two chains the strips' outer ends meet end to end, which is the seam
     that makes a chain a chain. Laid painter's-fashion in two passes.

     The shadow side of every strip (below and to the right of it - the
     skylight is above) takes a 1px weaveGap; the lit side a softer rim;
     what is left between the pillows is the deep grey of the wall behind
     them. Iterated against tv1 brought down to the game's scale, side by
     side, four times, until the chains and the braid read; the first cut
     (straight mitred columns) read as bent bricks and the second (both
     families' ends alike) as a basket. Mean luminance 179 against the
     photograph's 176 below the set and 199 above it. */
  var W_ANG = 35 * Math.PI / 180, W_THK = 8.8, W_RND = 0.7;
  var W_COL = 12, W_ROW = 12;
  var W_APEX = 2.5, W_OUT = 1.5;      /* how far an end reaches past its column */

  function bakeWeave() {
    var W = 96, Hh = 48;
    var r = mulberry32(3505);
    var NC = W / W_COL, NR = Hh / W_ROW;
    var grid = new Array(W * Hh), strips = [], i, j, s;
    for (i = 0; i < grid.length; i++) grid[i] = P.weaveHole;
    var TONES = [0, 0, 0, 0, 1, 1, -1, -1, 2, -1, 1, 0];
    var DK = [2, 2, 3, -2, -1];
    for (i = 0; i < NC; i++) {
      for (j = 0; j < NR; j++) {
        var fam = i % 2, veins = [];
        for (var k = 0; k < 4; k++) {
          veins.push([-0.6 + r() * 1.2, -5 + r() * 10, 3 + r() * 4, DK[Math.floor(r() * DK.length)]]);
        }
        strips.push({ z: (j + (i >> 1) + fam) % 2, fam: fam,
                      cx: i * W_COL + W_COL / 2, cy: j * W_ROW + W_ROW / 2,
                      tone: TONES[Math.floor(r() * TONES.length)], veins: veins });
      }
    }
    /* the under pass, then the over pass; within a pass, painter's order */
    strips.sort(function (a, b) { return a.z - b.z; });
    for (s = 0; s < strips.length; s++) paintStrip(grid, W, Hh, strips[s]);
    var t = makeCanvas(W, Hh), c = t.ctx;
    for (var y = 0; y < Hh; y++) {
      var x0 = 0;
      for (var x = 1; x <= W; x++) {
        if (x === W || grid[y * W + x] !== grid[y * W + x0]) {
          c.fillStyle = grid[y * W + x0];
          c.fillRect(x0, y, x - x0, 1);
          x0 = x;
        }
      }
    }
    return t;
  }

  /* One strip into the colour grid, wrapped so the tile is seamless. Its
     two ends are not alike: the end at the chain's apex reaches 2.5px past
     the middle of the pair, under or over its partner, and the end at the
     edge of the chain reaches 1.5px into the next chain - which is what
     makes the chains read as chains. Each pixel is sampled four times and
     belongs to the strip if two samples land inside it, which keeps a 35
     degree edge from stairing into a saw. The shade is a pillow's: lit
     along the upper edge, falling off across the thickness, and a little
     fuller in the middle of the length than at the two ends. */
  function paintStrip(grid, W, Hh, st) {
    var sg = st.fam === 0 ? -1 : 1;
    var ax = Math.cos(W_ANG), ay = sg * Math.sin(W_ANG);
    var nx = -ay, ny = ax;
    if (ny < 0) { nx = -nx; ny = -ny; }
    var hc = (W_COL / 2) / Math.cos(W_ANG), hv = W_THK / 2, rr = hv * W_RND;
    var umin = st.fam === 0 ? -(hc + W_OUT) : -(hc + W_APEX);
    var umax = st.fam === 0 ? hc + W_APEX : hc + W_OUT;
    var mid = (umin + umax) / 2, span = (umax - umin) / 2;
    var mine = {}, list = [], x, y, sx, sy, k;
    var SS = [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]];
    for (y = Math.floor(st.cy - 14); y <= st.cy + 14; y++) {
      for (x = Math.floor(st.cx - 14); x <= st.cx + 14; x++) {
        var hits = 0, vs = 0, us = 0;
        for (k = 0; k < 4; k++) {
          var dx = x + SS[k][0] - st.cx, dy = y + SS[k][1] - st.cy;
          var u = dx * ax + dy * ay, v = dx * nx + dy * ny;
          if (Math.abs(v) > hv || u < umin || u > umax) continue;
          var du = u > umax - rr ? u - (umax - rr) : (u < umin + rr ? umin + rr - u : 0);
          var dv = Math.max(0, Math.abs(v) - (hv - rr));
          if (du === 0 || du * du + dv * dv <= rr * rr) { hits++; vs += v; us += u; }
        }
        if (hits < 2) continue;
        var vv = vs / hits, uu = us / hits, w = vv / hv, e = (uu - mid) / span;
        var lv = -w * 0.9 + 0.25 * (1 - e * e);
        var idx = clamp(Math.round(4 - lv * 3.2) + st.tone, 0, WEAVE.length - 1);
        var col = WEAVE[idx];
        for (k = 0; k < st.veins.length; k++) {
          var vn = st.veins[k];
          if (Math.abs(w - vn[0] - 0.06 * Math.sin(uu * 0.9)) < 0.09 && Math.abs(uu - vn[1]) < vn[2]) {
            col = WEAVE[clamp(idx + vn[3], 0, WEAVE.length - 1)];
          }
        }
        mine[x + ',' + y] = true;
        list.push([x, y, col]);
      }
    }
    /* the ring first, so the strip lies on it: the gap's shadow below and
       to the right of the strip (the skylight is above), a soft edge on the
       lit side, and never over a pixel of this strip */
    var ring = [], dark = {};
    var N = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1]];
    for (k = 0; k < list.length; k++) {
      x = list[k][0]; y = list[k][1];
      for (var q = 0; q < N.length; q++) {
        sx = x + N[q][0]; sy = y + N[q][1];
        if (mine[sx + ',' + sy]) continue;
        var shadow = N[q][1] > 0 || N[q][0] > 0;
        ring.push([sx, sy, shadow ? P.weaveGap : P.weaveRim, shadow]);
        if (shadow) dark[sx + ',' + sy] = true;
      }
    }
    for (k = 0; k < ring.length; k++) {
      if (!ring[k][3] && dark[ring[k][0] + ',' + ring[k][1]]) continue;
      grid[wrap(ring[k][1], Hh) * W + wrap(ring[k][0], W)] = ring[k][2];
    }
    for (k = 0; k < list.length; k++) {
      grid[wrap(list[k][1], Hh) * W + wrap(list[k][0], W)] = list[k][2];
    }
  }

  /* ------------------------------------------------------- THE FRAME

     The lid: rows 0..16 are the wall above the set, row 16 the crack
     where the frame stands off it; 17..23 are the top rail - its lit top
     face, the matte white, the lip and the inner return that meets the
     glass - and row 23 is the outline the run ends on. Nothing solid
     comes below 23. The rail is 7 rows because tv1's frame is 22 pixels
     of a 590 pixel glass, which is 8.1 rows of ours, and the lid band
     only has 24. */
  function bakeLid() {
    var t = makeCanvas(VW, CEIL), c = t.ctx, x;
    for (x = 0; x < VW; x += 96) c.drawImage(T.weave.canvas, 0, 31, 96, 17, x, 0, 96, 17);
    /* the wall above the set is in the skylight; it is the brightest
       wall in tv1 (199 against 176 below), and a whisper of shade down
       its last three rows says the frame stands proud of it */
    c.fillStyle = rgba(P.void, 0.10); c.fillRect(0, 13, VW, 1);
    c.fillStyle = rgba(P.void, 0.18); c.fillRect(0, 14, VW, 1);
    c.fillStyle = rgba(P.void, 0.26); c.fillRect(0, 15, VW, 1);
    c.fillStyle = P.weaveGap; c.fillRect(0, 16, VW, 1);
    var RAIL = [P.railLit, P.rail, P.rail, P.rail, P.railLip, P.railIn, P.outline];
    for (var i = 0; i < RAIL.length; i++) { c.fillStyle = RAIL[i]; c.fillRect(0, 17 + i, VW, 1); }
    return t;
  }

  /* The ground: row 0 (screen 242) is the bottom rail's lit top arris -
     the brightest row in the band and the kill edge - then the matte
     face, the lip, and the rail's shadow on the wall; the woven wall
     below it, in the shadow of the frame for its first few rows. THE
     SENSOR is tv2's small dark tab under the bottom rail, once per tile:
     the one real object on that wall, counted once. */
  function bakeGround() {
    var Hh = VH - FLOOR, t = makeCanvas(VW, Hh), c = t.ctx, x, i;
    for (x = 0; x < VW; x += 96) c.drawImage(T.weave.canvas, 0, 5, 96, 20, x, 8, 96, 20);
    var RAIL = [P.railLit, P.rail, P.rail, P.rail, P.rail, P.rail, P.railLip, P.weaveGap];
    for (i = 0; i < RAIL.length; i++) { c.fillStyle = RAIL[i]; c.fillRect(0, i, VW, 1); }
    /* the frame's shadow down the wall: a ramp, not a band */
    for (i = 0; i < 5; i++) {
      c.fillStyle = rgba(P.void, 0.22 * (1 - (i + 0.5) / 5));
      c.fillRect(0, 8 + i, VW, 1);
    }
    c.fillStyle = P.sensor;    c.fillRect(236, 7, 11, 3);
    c.fillStyle = P.sensorLit; c.fillRect(236, 7, 11, 1);
    c.fillStyle = P.outline;   c.fillRect(236, 10, 11, 1);
    return t;
  }

  /* ------------------------------------------------------ the pillars

     A column of the same woven marble standing in front of the glass,
     capped at the mouth of the gap with a length of the white rail. Two
     crops of the weave so a run of pillars does not repeat, an outline
     down both sides so a pale column never dissolves into a pale
     picture, and the column's own light: its left edge catches the
     skylight and its right edge turns away. A hair lighter than the
     wall itself - the pillars are the pale mass in this bay (the
     Mantle's rule), and the picture behind them is held under them. */
  function bakeColumn(v) {
    var W = 34, Hh = 48, t = makeCanvas(W, Hh), c = t.ctx;
    var sx = v ? 41 : 7;
    c.drawImage(T.weave.canvas, sx, 0, Math.min(W, 96 - sx), Hh, 0, 0, Math.min(W, 96 - sx), Hh);
    if (96 - sx < W) c.drawImage(T.weave.canvas, 0, 0, W - (96 - sx), Hh, 96 - sx, 0, W - (96 - sx), Hh);
    op(c, 'screen', '#ffffff', 0.06, 0, 0, W, Hh);
    c.fillStyle = rgba('#ffffff', 0.16); c.fillRect(1, 0, 1, Hh);
    c.fillStyle = rgba(P.void, 0.10);    c.fillRect(30, 0, 1, Hh);
    c.fillStyle = rgba(P.void, 0.18);    c.fillRect(31, 0, 1, Hh);
    c.fillStyle = rgba(P.void, 0.26);    c.fillRect(32, 0, 1, Hh);
    c.fillStyle = P.outline;
    c.fillRect(0, 0, 1, Hh);
    c.fillRect(W - 1, 0, 1, Hh);
    return t;
  }

  /* The cap: 42x9 of the frame's own rail, its lit arris facing INTO the
     gap - the edge that kills, and the one edge the eye must find in a
     hurry. Its two ends are MITRED, frame_corner's 45 degree seam, so it
     reads as a length cut off the very frame the picture is in. */
  function bakeCap(down) {
    var W = 42, Hh = 9, t = makeCanvas(W, Hh), c = t.ctx, i;
    var rows = [P.outline, P.railLip, P.rail, P.rail, P.rail, P.rail, P.rail, P.railLit, P.outline];
    for (i = 0; i < Hh; i++) {
      c.fillStyle = rows[down ? i : Hh - 1 - i];
      c.fillRect(0, i, W, 1);
    }
    /* the mitre seams, from the outer corners inwards */
    c.fillStyle = P.railLip;
    for (i = 1; i < 7; i++) {
      var yy = down ? i : Hh - 1 - i;
      c.fillRect(i, yy, 1, 1);
      c.fillRect(W - 1 - i, yy, 1, 1);
    }
    /* the four corners eased by a pixel */
    c.clearRect(0, 0, 1, 1); c.clearRect(W - 1, 0, 1, 1);
    c.clearRect(0, Hh - 1, 1, 1); c.clearRect(W - 1, Hh - 1, 1, 1);
    return t;
  }

  /* ------------------------------------------------------ THE GLASS

     The panel switched off, which is the cold open and the backdrop to
     the results board: tv1 at our scale. The skylight well top and
     centre - a trapezoid wide at the top and narrow at the bottom, its
     two side walls a shade paler than its far plane - the pendant's cord
     coming down out of it and the amber shade on the end, the shutters'
     window and slats at the bottom left, two little dark frames at the
     bottom right, and a few specks of dust on the glass. NOTHING IN HERE PASSES 135 of luminance
     and the marble is never under 175: the reflection is a reflection.
     No photographer, and no maker's name. It scrolls at 0.06 - a
     reflection belongs to the room behind the camera, not to the wall. */
  var GLASS_PAR = 0.06;

  function bakeGlass() {
    var W = VW, Hh = PIC_H, t = makeCanvas(W, Hh), c = t.ctx;
    var r = mulberry32(3517), y, i, x;
    c.fillStyle = P.glass; c.fillRect(0, 0, W, Hh);
    for (i = 0; i < 26; i++) {
      c.fillStyle = rgba(P.glassLo, 0.25 * (1 - (i + 0.5) / 26));
      c.fillRect(0, i, W, 1);
    }
    for (i = 0; i < 28; i++) {
      c.fillStyle = rgba(P.glassLo, 0.19 * ((i + 0.5) / 28));
      c.fillRect(0, 190 + i, W, 1);
    }
    /* THE WELL, measured off tv1's glass at our scale: it runs off the top
       of the panel (the skylight is above the set and the camera), its
       bottom edge is a crisp line on row 89 from x 135 to 355, its left
       side slants out to x 48 at the top and its right side to 440 - the
       photograph was taken a little left of centre, so the two sides are
       not mirror images. Inside it, the far plane is the ceiling of the
       well round the skylight, a shade darker toward the bottom; its two
       side walls are lit wedges a shade paler. Row by row. */
    for (y = 0; y <= 89; y++) {
      var k = y / 89;
      var xl = Math.round(48 + (135 - 48) * k), xr = Math.round(440 + (355 - 440) * k);
      var il = Math.round(128 + (142 - 128) * k), ir = Math.round(392 + (350 - 392) * k);
      var bb = Math.round(126 - 14 * k);
      c.fillStyle = 'rgb(' + (bb - 4) + ',' + bb + ',' + (bb + 4) + ')';
      c.fillRect(xl, y, xr - xl, 1);
      var ww = bb + 9;
      c.fillStyle = 'rgb(' + (ww - 4) + ',' + ww + ',' + (ww + 4) + ')';
      c.fillRect(xl, y, il - xl, 1);
      c.fillRect(ir, y, xr - ir, 1);
      c.fillStyle = P.reflWell;
      c.fillRect(xl, y, 1, 1); c.fillRect(xr - 1, y, 1, 1);
    }
    c.fillStyle = P.reflWell; c.fillRect(135, 89, 220, 1);
    /* the room below it, a breath lighter than the glass: the window
       light at the bottom left is what lifts it */
    for (y = 0; y < 81; y++) {
      for (x = 0; x < 90; x++) {
        var dd = Math.sqrt((x / 90) * (x / 90) + ((80 - y) / 80) * ((80 - y) / 80));
        if (dd >= 1) continue;
        c.fillStyle = rgba(P.reflSlat, 0.22 * (1 - ease(dd)));
        c.fillRect(x, 137 + y, 1, 1);
      }
    }
    /* the pendant: its cord, its glow and its tapered amber shade */
    c.fillStyle = P.reflCord; c.fillRect(238, 92, 1, 47);
    for (y = -18; y <= 18; y++) {
      for (x = -24; x <= 24; x++) {
        var d = Math.sqrt((x / 24) * (x / 24) + (y / 18) * (y / 18));
        if (d >= 1) continue;
        c.fillStyle = rgba(P.reflShadeHi, 0.10 * (1 - ease(d)));
        c.fillRect(238 + x, 150 + y, 1, 1);
      }
    }
    for (i = 0; i < 22; i++) {
      var hw = Math.round(2 + 5 * (i / 21));
      c.fillStyle = P.reflShade; c.fillRect(238 - hw, 139 + i, hw * 2 + 1, 1);
      c.fillStyle = P.reflCord;  c.fillRect(238 - hw, 139 + i, 1, 1); c.fillRect(238 + hw, 139 + i, 1, 1);
    }
    c.fillStyle = P.reflCord;    c.fillRect(231, 160, 15, 1);
    c.fillStyle = P.reflShadeHi; c.fillRect(237, 149, 3, 4);
    /* the shutters, bottom left (tv1): the window's frame and, in its
       lower half, the slats with the daylight between them */
    c.fillStyle = P.reflFrame; c.fillRect(0, 140, 44, 76);
    c.fillStyle = P.reflFrameIn; c.fillRect(0, 142, 40, 72);
    for (i = 0; i < 5; i++) {
      c.fillStyle = P.reflSlat;    c.fillRect(0, 176 + i * 6, 38, 3);
      c.fillStyle = P.reflSlatLit; c.fillRect(0, 179 + i * 6, 38, 1);
    }
    /* the two little frames, bottom right */
    c.fillStyle = P.reflFrame;   c.fillRect(416, 164, 20, 14);
    c.fillStyle = P.reflFrameIn; c.fillRect(418, 166, 16, 10);
    c.fillStyle = P.reflFrame;   c.fillRect(444, 172, 14, 10);
    c.fillStyle = P.reflFrameIn; c.fillRect(446, 174, 10, 6);
    for (i = 0; i < 14; i++) {
      c.fillStyle = P.reflSpark;
      c.fillRect(Math.floor(r() * W), Math.floor(r() * 108), 1, 1);
    }
    return t;
  }

  /* ------------------------------------------------- static, and glass

     Two sheets of snow, baked through ImageData once at boot and never
     again: 55% near-black, 30% grey, 15% pale grey, with one grain in
     thirty-three doubled sideways, because a CRT's snow is smeared along
     the scan. Every frame of static the set ever shows is these two
     sheets at an offset hashed off the frame counter. */
  function bakeSnow(seed) {
    var W = VW, Hh = PIC_H, t = makeCanvas(W, Hh);
    var img = t.ctx.createImageData(W, Hh), d = img.data, r = mulberry32(seed);
    var D = hexRGB(P.snowDark), M = hexRGB(P.snowMid), L = hexRGB(P.snowHi);
    var i, x, y, col, prev = D, dbl = false;
    for (y = 0; y < Hh; y++) {
      for (x = 0; x < W; x++) {
        if (dbl) { col = prev; dbl = false; }
        else {
          var q = r();
          col = q < 0.55 ? D : (q < 0.85 ? M : L);
          dbl = r() < 0.03;
        }
        prev = col;
        i = (y * W + x) * 4;
        d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
      }
    }
    t.ctx.putImageData(img, 0, 0);
    return t;
  }

  function bakeRows(every, a) {
    var t = makeCanvas(VW, PIC_H), c = t.ctx;
    c.fillStyle = rgba('#000000', a);
    for (var y = every - 1; y < PIC_H; y += every) c.fillRect(0, y, VW, 1);
    return t;
  }

  /* the tube's own fall-off toward its corners */
  function bakeVig() {
    return alphaSheet(VW, PIC_H, '#000000', function (x, y) {
      var dx = (x + 0.5 - VW / 2) / (VW / 2), dy = (y + 0.5 - PIC_H / 2) / (PIC_H / 2);
      var d = Math.sqrt(dx * dx * 0.55 + dy * dy * 0.45);
      return 0.38 * ease((d - 0.55) / 0.45);
    });
  }

  function bakeGlare() {
    var d = T.glass.ctx.getImageData(0, 0, VW, PIC_H).data;
    return alphaSheet(VW, PIC_H, '#ffffff', function (x, y) {
      var i = (y * VW + x) * 4;
      return 0.07 * (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) / 255;
    });
  }

  /* the room's own light at the two ends of the picture: no light comes
     from the sides of a television, so the sides are where it falls off */
  function bakeSideShade() {
    return alphaSheet(VW, PIC_H, P.void, function (x) {
      var e = Math.min(x + 0.5, VW - x - 0.5);
      return e < 56 ? 0.18 * (1 - ease(e / 56)) : 0;
    });
  }

  /* --------------------------------------------------- THE TEST CARD

     CH 03, while GET READY is up: seventy-five percent colour bars, the
     reverse strip under them, black below with a PLUGE step, and the
     card's two lines. No logo, no station, nobody's name: PLEASE STAND BY
     sits at screen rows 108..122 so it clears the GET READY heading
     (74) and its hint (132), and the bay's code sits under the reverse
     strip, clear of the engine's panel at 168. */
  function bakeCard() {
    var t = makeCanvas(VW, PIC_H), c = t.ctx, i;
    var BARS = [P.cardWhite, P.cardYellow, P.cardCyan, P.cardGreen, P.cardMagenta, P.cardRed, P.cardBlue];
    var REV = [P.cardBlue, P.cardBlack, P.cardMagenta, P.cardBlack, P.cardCyan, P.cardBlack, P.cardWhite];
    for (i = 0; i < 7; i++) {
      var x0 = Math.round(i * VW / 7), x1 = Math.round((i + 1) * VW / 7);
      c.fillStyle = BARS[i]; c.fillRect(x0, 0, x1 - x0, 118);
      c.fillStyle = REV[i];  c.fillRect(x0, 118, x1 - x0, 16);
    }
    c.fillStyle = P.cardBlack; c.fillRect(0, 134, VW, PIC_H - 134);
    /* the PLUGE: three near-blacks, the one thing on a card nobody looks at */
    c.fillStyle = '#0a0a0a'; c.fillRect(300, 150, 30, 50);
    c.fillStyle = '#161616'; c.fillRect(330, 150, 30, 50);
    c.fillStyle = '#1e1e1e'; c.fillRect(360, 150, 30, 50);
    /* the caption box the words sit in */
    c.fillStyle = P.cardBlack; c.fillRect(132, 78, 216, 26);
    Font.draw(c, 'PLEASE STAND BY', VW / 2, 84, { scale: 2, colour: P.cardInk, align: 'center' });
    Font.draw(c, '3-5  THE TV', 74, 168, { scale: 1, colour: '#9a9a9a', align: 'center' });
    return t;
  }

  /* ---------------------------------------------------- the power-ups

     The five things worth catching, borrowed from the bays that own them
     and blown up to two pixels to the pixel, with smoothing off: they are
     broadcast imagery, chunky the way a picture on a tube is chunky. Each
     wears a red and a blue twin for the misconvergence. Read in build(),
     after Levels.buildArt has baked every one of those rooms. */
  function need(mod, key, name) {
    if (!mod || !mod.tiles || !mod.tiles[key]) throw new Error('TV.build: ' + name + '.tiles.' + key + ' is missing');
    return mod.tiles[key];
  }

  /* --------------------------------------------------------- build */
  function build() {
    if (T.weave) return;
    T.weave = bakeWeave();
    T.lid = bakeLid();
    T.ground = bakeGround();
    T.column = [bakeColumn(0), bakeColumn(1)];
    T.capDown = bakeCap(true);
    T.capUp = bakeCap(false);
    T.glass = bakeGlass();
    T.snowA = bakeSnow(3509);
    T.snowB = bakeSnow(3511);
    T.scan = bakeRows(2, 0.26);
    T.cgaRows = bakeRows(4, 0.37);
    T.vig = bakeVig();
    /* the scanlines and the vignette as one sheet, and the skylight's glare
       on the glossy glass as another - a 'screen' of the glass at 0.07 is,
       to the level, white laid at 0.07 of the glass's own luminance - so
       the picture's finish is two blits a frame and not four */
    T.tube = makeCanvas(VW, PIC_H);
    T.tube.ctx.drawImage(T.scan.canvas, 0, 0);
    T.tube.ctx.drawImage(T.vig.canvas, 0, 0);
    T.glare = bakeGlare();
    T.sideShade = bakeSideShade();
    T.card = bakeCard();
    T.lidShade = DiningRoom.bakeShade(P.void, 0.28, 10, false);
    T.groundShade = DiningRoom.bakeShade(P.void, 0.24, 10, true);
    T.railGlow = DiningRoom.bakeShade('#c8d8e8', 0.10, 6, false);

    /* the working buffers, allocated once */
    T.pic = makeCanvas(VW, PIC_H);
    T.lo = makeCanvas(96, 72);
    T.scr = makeCanvas(VW, VH);
    T.feed = makeCanvas(VW, VH);      /* the frame being taken  */
    T.feedShown = makeCanvas(VW, VH); /* the frame on the screen */
    T.pix = makeCanvas(VW, VH);
    T.pix2 = makeCanvas(VW / 2, Math.ceil(VH / 2));
    T.rim = makeCanvas(VW, VH);
    /* the halving ladder the doodad's layer comes down (see shrink) */
    T.halves = [null, null];
    T.mos = makeCanvas(VW / 4, 68);
    T.cover = makeCanvas(64, 64);

    /* the dead pixel is the Mantle's, frame for frame */
    var px = need(Mantle, 'pixel', 'Mantle');
    if (!px[7] || !px[7].canvas) throw new Error('TV.build: Mantle.tiles.pixel needs eight frames');
    T.pixel = px;

    var rec = need(Bar, 'rec', 'Bar');
    T.pu = {
      hot:  twin(scaled(need(Garden, 'pepper', 'Garden').canvas, PU_SCALE)),
      sour: twin(scaled(need(Canopy, 'lime', 'Canopy').canvas, PU_SCALE)),
      gold: twin(scaled(need(Deck, 'golden', 'Deck').canvas, PU_SCALE)),
      spin: [twin(scaled(rec[0].canvas, PU_SCALE)), twin(scaled(rec[1].canvas, PU_SCALE)),
             twin(scaled(rec[2].canvas, PU_SCALE)), twin(scaled(rec[3].canvas, PU_SCALE))],
      pot:  scaled(need(Garden, 'pot', 'Garden').canvas, PU_SCALE),
      life: twin(scaled(need(Garden, 'rosette', 'Garden').canvas, PU_SCALE))
    };
    /* the bounce turns each thing round half its own height short of the
       rails, so the half-heights come off the sprites as baked - the
       record off its face-on frame, the succulent off its rosette */
    HALF = { hot: T.pu.hot.img.h >> 1, sour: T.pu.sour.img.h >> 1,
             gold: T.pu.gold.img.h >> 1, spin: T.pu.spin[0].img.h >> 1,
             life: T.pu.life.img.h >> 1 };
    measureCaps();
  }

  /* ------------------------------------------------------ THE RERUNS

     The game's own earlier bays, each on the channel its code spells,
     each in the look of a different old set. They are the bays' own
     level-select covers - the picture every player already knows each
     bay by - drawn at 96x72 and blown up three times into a 4:3 box in
     the middle of a widescreen picture, black either side, because that
     is what an old show on a new set looks like (A3).

     THE COOP HAS NO COVER OF ITS OWN: the level select paints it from
     its generic card in the Coop's own PREVIEW colours, and coopCard
     below is that card, line for line, so CH 11 is the picture a player
     has seen on the first card of the first room.

     All fourteen were rendered at 96x72 and looked at, small-card flag
     and big: every one reads at that size, so every one runs at it, with
     the small card's flag (its doodad is the smaller block). */
  var RERUNS = [
    [11, '1-1', 'THE COOP', null, 'bw'],
    [12, '1-2', 'THE GARDEN', Garden, 'sepia'],
    [13, '1-3', 'THE DECK', Deck, 'seventies'],
    [14, '1-4', 'THE CANOPY', Canopy, 'phosphor'],
    [15, '1-5', 'THE CONSTRUCTION ZONE', Construction, 'cga'],
    [21, '2-1', 'THE DESK', Desk, 'bw'],
    [22, '2-2', 'THE COUCH', Couch, 'vhs'],
    [23, '2-3', 'THE MANTLE', Mantle, 'bw'],
    [24, '2-4', 'THE WHITEBOARD', Whiteboard, 'sepia'],
    [25, '2-5', 'THE FORT', Fort, 'cga'],
    [31, '3-1', 'THE TABLE', Table, 'seventies'],
    [32, '3-2', 'THE FLOOR', Floor, 'phosphor'],
    [33, '3-3', 'THE BAR', Bar, 'vhs'],
    [34, '3-4', 'THE CEILING', Ceiling, 'sepia']
  ];
  var LIVE_CH = 35;
  /* the channel nobody tunes to: the VCR's own, which the set flips to only
     while somebody is on air on it (see makeMeet). 0, shown as VIDEO */
  var VIDEO_CH = 0;

  function rerunOf(ch) {
    for (var i = 0; i < RERUNS.length; i++) if (RERUNS[i][0] === ch) return RERUNS[i];
    return null;
  }

  /* the channel the run is on by its score, before any fault intervenes */
  function baseFor(score) {
    if (score >= LIVE_AT) return LIVE_CH;
    return RERUNS[Math.min(3, Math.floor(score / CH_EVERY))][0];
  }

  function caption(ch) {
    if (ch === LIVE_CH) return '3-5 THE TV';
    if (ch === VIDEO_CH) return 'PLEASE BE KIND - REWIND';
    var r = rerunOf(ch);
    return r ? r[1] + ' ' + r[2] : '';
  }

  /* ------------------------------------------------------- THE FAULTS

     ONE HARD FAULT AT A TIME, each told before it comes. The clock, the
     Bar's humidifier's: IDLE for 7..11 seconds (6..9 from DEEP_AT) after
     the last one cleared, then a TELL of a full second - the fault's
     name on the screen, blinking, a `tune` blip from the set (the snow's
     own swell for SNOW) and the picture flinching twice - then the fault
     itself. It never starts while the doodad is in the grace after a
     save, within 1.5s of a channel change, while a surf is running, or
     outside play; a fault already running when the run ends runs out.
     Never the same fault twice in a row.

       SNOW      rise 1.2, hold 2.8 (3.5 deep), clear 0.8. Static over the
                 picture at 0.55; spilled, over the room at 0.42 (0.48
                 deep) and over the doodad at 0.22 (as two sheets; see
                 SNOW_ROOM for the one-sheet equivalents). The rails are never
                 snowed on and the dead pixels are stamped back on top.
       V-HOLD    2.2s: four sawtooth slips of 0..22px down. Spilled, the
                 whole room layer and the doodad slip together, the HUD
                 does not; 22px keeps the bottom rail's kill edge on the
                 screen.
       TRACKING  1.6s: three tears of a 32-row band, the middle of it
                 thrown up to 6px sideways, the same offsets on the room
                 and on the doodad.
       GHOST     3.0s: the picture again at +9px and 0.35, eased in and
                 out. The ghost is AHEAD: a cap's ghost is 9px early,
                 never late.
       H-SIZE    4.0s: the right of the picture collapses into a 64px
                 dead band (A7) - only the right, because a band on the
                 left could hide a pillar beside a doodad hugging X_MIN.
                 What is left to read a pillar in: (416-116-11)/178 =
                 1.6s at the top speed.
       MOSAIC    2.0s, from MOSAIC_AT: four-pixel blocks, averaged rather
                 than point-sampled so nothing small vanishes, and the
                 dead pixels stamped back crisp on top.
       SURF      the set hunts through three more reruns, half a second
                 each. Cosmetic; it is how CH 15 to CH 34 are ever seen.

     Weights before the spill {SNOW 3, V-HOLD 2, TRACKING 2, GHOST 2,
     H-SIZE 1, SURF 3}, after it {3, 2, 2, 2, 2, 2} and MOSAIC 2. */
  var HARD = { snow: 1, vhold: 1, tear: 1, ghost: 1, hsize: 1, mosaic: 1 };
  var WORD = { snow: 'SNOW', vhold: 'V-HOLD', tear: 'TRACKING', ghost: 'GHOST',
               hsize: 'H-SIZE', mosaic: 'MOSAIC', surf: 'SURF' };
  var W_GLASS = [['snow', 3], ['vhold', 2], ['tear', 2], ['ghost', 2], ['hsize', 1], ['surf', 3]];
  var W_SPILL = [['snow', 3], ['vhold', 2], ['tear', 2], ['ghost', 2], ['hsize', 2], ['surf', 2]];
  var T_TELL = 1.0;
  var FIRST_TELL = 3.5;          /* after WARN.late has had its 2.4s */
  var GAP_MIN = 7, GAP_MAX = 11, GAP_MIN_DEEP = 6, GAP_MAX_DEEP = 9;
  var SNOW_RISE = 1.2, SNOW_HOLD = 2.8, SNOW_HOLD_DEEP = 3.5, SNOW_CLEAR = 0.8;
  /* the static's strength out in the room, as ONE sheet: the 0.42 (0.48
     deep) of the plan's two-sheet static - a second sheet at half - comes
     to 0.54 (0.60) laid as one, and the doodad's 0.22 to 0.30 */
  var SNOW_ROOM = 0.54, SNOW_ROOM_DEEP = 0.60, SNOW_HIM = 0.30;
  var VHOLD_SLIP = 0.55, VHOLD_PX = 22;
  var TEAR_EACH = 0.55, TEAR_ROWS = 32, TEAR_PX = 6;
  var GHOST_DX = 9, GHOST_A = 0.35;
  var HSIZE_X = 416, HSIZE_IN = 0.3;
  var SURF_EACH = 0.5;
  var CHAN_QUIET = 1.5;
  var BURST = 0.25, SURF_BURST = 0.12;

  function durFor(name, deep) {
    var k = deep ? 1.25 : 1;
    if (name === 'snow') return SNOW_RISE + (deep ? SNOW_HOLD_DEEP : SNOW_HOLD) + SNOW_CLEAR;
    if (name === 'vhold') return VHOLD_SLIP * 4 * k;
    if (name === 'tear') return TEAR_EACH * 3 * k;
    if (name === 'ghost') return 3.0 * k;
    if (name === 'hsize') return 4.0 * k;
    if (name === 'mosaic') return 2.0 * k;
    if (name === 'surf') return SURF_EACH * 3;
    return 0;
  }

  /* how much of the fault is showing, 0..1, off its own clock */
  function envOf(F) {
    if (F.stage !== 'run') return 0;
    var t = F.t, d = F.dur;
    if (F.name === 'snow') {
      var hold = d - SNOW_RISE - SNOW_CLEAR;
      if (t < SNOW_RISE) return ease(t / SNOW_RISE);
      if (t < SNOW_RISE + hold) return 1;
      return 1 - ease((t - SNOW_RISE - hold) / SNOW_CLEAR);
    }
    if (F.name === 'ghost') return Math.min(ease(t / 0.4), ease((d - t) / 0.4));
    if (F.name === 'hsize') return Math.min(ease(t / HSIZE_IN), ease((d - t) / HSIZE_IN));
    if (F.name === 'mosaic') return Math.min(1, t / 0.15, (d - t) / 0.15);
    return 1;
  }

  /* the vertical hold's slip at this instant: a sawtooth, 0 to 22px over
     0.55s and snapping back, four times */
  function vholdK(F) {
    return Math.round(VHOLD_PX * wrap(F.t, VHOLD_SLIP) / VHOLD_SLIP);
  }

  /* one row of the tear's sideways throw: nothing at the band's edges,
     the most in its middle, swinging on the set's clock */
  function tearOff(F, r) {
    return Math.round(TEAR_PX * Math.sin(Math.PI * (r + 0.5) / TEAR_ROWS) *
                      Math.sin(view.clock * 9 + F.ph));
  }

  /* is a HARD fault on the screen this instant */
  function hardOn(S) {
    return !!(S && S.fault.stage === 'run' && HARD[S.fault.name]);
  }

  function pick(S, list) {
    var tot = 0, i, F = S.fault;
    for (i = 0; i < list.length; i++) if (list[i][0] !== F.last) tot += list[i][1];
    var q = S.rng() * tot;
    for (i = 0; i < list.length; i++) {
      if (list[i][0] === F.last) continue;
      q -= list[i][1];
      if (q <= 0) return list[i][0];
    }
    return list[list.length - 1][0];
  }

  /* --------------------------------------------- THE SET, PER RUN

     run.ledger.tv: everything about this run's television. Created on
     the first stepScreen of a run - GET READY - and thrown away with the
     ledger by RETRY, which is what powers the set up again. The dice it
     rolls for its faults are its own seeded generator, rolled once from
     Math.random here and never at draw time. */
  function freshSet() {
    view.boots++;
    var quick = view.boots > 1;
    return {
      phase: 'off', pt: 0, delay: quick ? 0.2 : 0.5, k: quick ? 0.65 : 1,
      wob: -1,
      chan: 3, base: 3, chanT: 99, burst: 0,
      surf: null, surfPtr: 4,
      fault: { name: 'none', stage: 'idle', t: 0, dur: 0, next: FIRST_TELL, last: 'none',
               y0: 120, ph: 0, n: 0 },
      spill: false, spillT: 0,
      rng: mulberry32(Math.floor(Math.random() * 4294967296)),
      seen: {}, caught: 0, born: { hot: 0, sour: 0, gold: 0, spin: 0, life: 0 },
      vol: { t: 0, level: 0, kind: '' },
      osd: 0, third: 0, playT: -1, sleep: 0, sleepN: 0,
      score: 0, forced: {}
    };
  }

  /* the five things that are caught, by the flags the engine set, read
     LIVE every time - ob.gold, ob.sour and ob.whirl are written after
     makeDrop has returned, so a kind written down at birth is wrong */
  function kindOf(ob) {
    if (ob.type === 'boon') return 'life';
    if (ob.gold) return 'gold';
    if (ob.spicy) return 'hot';
    if (ob.sour) return 'sour';
    if (ob.whirl) return 'spin';
    return 'pixel';
  }

  /* how far up the volume bar a catch throws it */
  var VOL = { hot: 18, sour: 6, spin: 12, gold: 20, life: 14 };

  /* the ladder as this run stands on it - the real score, or one a
     harness has forced for a screenshot */
  function ladder(S, run) {
    var f = S.forced.score;
    return f && view.clock < f.until ? f.v : (run ? run.score || 0 : 0);
  }

  function forcedOn(S, key) {
    var f = S.forced[key];
    return !!(f && view.clock < f.until);
  }

  /* change the channel: a burst of static, a click, the number on the
     screen and the bay's name along the bottom */
  function tuneTo(S, run, ch, burst) {
    if (ch === S.chan) return;
    S.chan = ch;
    S.chanT = 0;
    S.burst = burst;
    S.osd = 2.0;
    S.third = 1.6;
    run.ledger.cry = ch === LIVE_CH ? 'tune' : 'chan';
  }

  function applyForces(S, run) {
    while (view.forceQ.length) {
      var f = view.forceQ.shift(), nm = f.name, until = view.clock + f.secs;
      if (nm === 'none') S.forced.none = { until: until };
      else if (nm === 'on') { S.phase = 'on'; S.pt = 0; S.wob = 0.8; }
      else if (nm === 'off') { S.phase = 'collapse'; S.pt = 0; }
      else if (nm === 'spill') { if (!S.spill) { S.spill = true; S.spillT = 0.5; } }
      else if (nm === 'live' || nm === 'tunnel') S.forced.chan = { v: LIVE_CH, until: until };
      else if (nm === 'card') S.forced.chan = { v: 3, until: until };
      else if (nm.indexOf('chan:') === 0) S.forced.chan = { v: +nm.slice(5), until: until };
      else if (nm.indexOf('score:') === 0) S.forced.score = { v: +nm.slice(6), until: until };
      else if (WORD[nm]) startFault(S, run, nm, f.secs, true);
    }
  }

  function startFault(S, run, name, dur, forced) {
    var F = S.fault;
    /* whoever is on air on the VIDEO channel is lost to it: the picture
       breaking up is the end of him for this run (the engine's spook) */
    if (onAir()) run.ledger.spook = true;
    F.name = name; F.stage = 'run'; F.t = 0; F.n = 0;
    F.dur = forced ? dur : durFor(name, ladder(S, run) >= DEEP_AT);
    F.y0 = 40 + Math.floor(S.rng() * 161);
    F.ph = S.rng() * TAU;
    if (name === 'surf') {
      var list = [];
      for (var i = 0; i < 3; i++) list.push(RERUNS[(S.surfPtr + i) % RERUNS.length][0]);
      S.surfPtr = (S.surfPtr + 3) % RERUNS.length;
      S.surf = { list: list, i: 0, t: 0 };
      tuneTo(S, run, list[0], SURF_BURST);
    }
  }

  function endFault(S, run) {
    var F = S.fault;
    if (F.name === 'surf') {
      S.surf = null;
      tuneTo(S, run, S.base, SURF_BURST);
    }
    F.last = F.name; F.name = 'none'; F.stage = 'idle'; F.t = 0;
    var deep = ladder(S, run) >= DEEP_AT;
    F.next = deep ? GAP_MIN_DEEP + S.rng() * (GAP_MAX_DEEP - GAP_MIN_DEEP)
                  : GAP_MIN + S.rng() * (GAP_MAX - GAP_MIN);
  }

  /* The set's clock, in every state but pause (the engine's hook). The
     power, in every state; the channels and the faults only in play. */
  function stepScreen(dt, state, run) {
    if (!run || !run.ledger) return;
    var L = run.ledger, S = L.tv;
    if (!S) S = L.tv = freshSet();
    view.clock += dt;
    view.frame++;
    applyForces(S, run);
    stepPower(S, dt, state, run);

    if (S.burst > 0) S.burst = Math.max(0, S.burst - dt);
    if (S.spillT > 0) S.spillT = Math.max(0, S.spillT - dt);
    if (S.osd > 0) S.osd -= dt;
    if (S.third > 0) S.third -= dt;
    if (S.vol.t > 0) S.vol.t -= dt;
    if (S.sleep > 0) S.sleep -= dt;
    S.chanT += dt;

    var F = S.fault;
    /* a running fault runs out whatever the state; a tell that has not
       turned into a fault yet is dropped the moment the run stops */
    if (F.stage === 'tell' && state !== 'play') { F.stage = 'idle'; F.name = 'none'; }
    if (F.stage === 'run') {
      F.t += dt;
      if (F.name === 'tear' && F.t >= (F.n + 1) * F.dur / 3) {
        F.n++;
        F.y0 = 40 + Math.floor(S.rng() * 161);
        F.ph = S.rng() * TAU;
      }
      if (S.surf) {
        S.surf.t += dt;
        var si = Math.floor(S.surf.t / SURF_EACH);
        if (si !== S.surf.i && si < S.surf.list.length) {
          S.surf.i = si;
          tuneTo(S, run, S.surf.list[si], SURF_BURST);
        }
      }
      if (F.t >= F.dur) endFault(S, run);
    }

    if (state !== 'play' || S.phase !== 'on') return;

    var sc = ladder(S, run);
    S.score = sc;
    if (S.playT < 0) S.playT = 0;
    else S.playT += dt;

    /* THE CHANNEL. A forced one wins; a surf owns the dial while it runs */
    var want = forcedOn(S, 'chan') ? S.forced.chan.v : (onAir() ? VIDEO_CH : baseFor(sc));
    if (want !== S.base) {
      S.base = want;
      if (!S.surf) tuneTo(S, run, want, BURST);
    } else if (!S.surf && S.chan !== S.base) tuneTo(S, run, S.base, BURST);

    /* THE SPILL, once, on the first play frame at SPILL_AT: the warning,
       the snow's swell in place of the warning's tone (one noise), and
       half a second of static over everything (A2) */
    if (!S.spill && sc >= SPILL_AT) {
      S.spill = true; S.spillT = 0.5;
      L.warn = 'spill';
      L.cry = 'snow';
    }
    if (sc >= SLEEP_AT + S.sleepN * 10 && S.sleepN < 3) {
      S.sleep = 3.0;
      S.sleepN++;
    }

    /* THE FAULT CLOCK, from WARN.late on; frozen in the grace after a save */
    if (!run.late || forcedOn(S, 'none')) return;
    if (F.stage === 'idle') {
      if (run.grace) return;
      F.next -= dt;
      if (F.next <= 0 && S.chanT >= CHAN_QUIET && !S.surf) {
        var list = S.spill ? W_SPILL.slice() : W_GLASS;
        if (S.spill && sc >= MOSAIC_AT) list.push(['mosaic', 2]);
        F.name = pick(S, list);
        F.stage = 'tell'; F.t = 0;
        L.cry = F.name === 'snow' ? 'snow' : (F.name === 'surf' ? 'chan' : 'tune');
      }
    } else if (F.stage === 'tell') {
      F.t += dt;
      if (F.t >= T_TELL) startFault(S, run, F.name, 0, false);
    }
  }

  /* THE POWER. off, then a dot, a line and the picture blooming out of
     it with the degauss wobble on it; on until the run ends; then the
     reverse - the picture squashed to a line, the line to a dot, dark. */
  var T_DOT = 0.12, T_LINE = 0.18, T_BLOOM = 0.40, T_COLLAPSE = 0.22, T_SPOT = 0.18;

  function stepPower(S, dt, state, run) {
    S.pt += dt;
    if (S.wob >= 0) S.wob += dt;
    var dead = state === 'dead' || state === 'entry';
    if (dead && (S.phase === 'on' || S.phase === 'bloom' || S.phase === 'line' || S.phase === 'dot')) {
      S.phase = 'collapse'; S.pt = 0;
      run.ledger.cry = 'tvOff';
      return;
    }
    if (S.phase === 'off' && !dead && S.pt >= S.delay) {
      S.phase = 'dot'; S.pt = 0; run.ledger.cry = 'tvOn';
    } else if (S.phase === 'dot' && S.pt >= T_DOT * S.k) {
      S.phase = 'line'; S.pt = 0;
    } else if (S.phase === 'line' && S.pt >= T_LINE * S.k) {
      S.phase = 'bloom'; S.pt = 0; S.wob = 0;
    } else if (S.phase === 'bloom' && S.pt >= T_BLOOM * S.k) {
      S.phase = 'on'; S.pt = 0;
      S.osd = 2.0;
    } else if (S.phase === 'collapse' && S.pt >= T_COLLAPSE) {
      S.phase = 'spot'; S.pt = 0;
    } else if (S.phase === 'spot' && S.pt >= T_SPOT) {
      S.phase = 'dark'; S.pt = 0;
    }
  }

  /* the degauss: a wobble that dies away over 0.8s from the bloom */
  function wobbleOf(S) {
    return S.wob < 0 ? 0 : Math.max(0, 1 - S.wob / 0.8);
  }

  /* THE FLINCH: during a tell the picture jumps two pixels, twice */
  function flinch(S) {
    var F = S.fault;
    if (F.stage !== 'tell') return 0;
    return (F.t < 0.07 || (F.t >= 0.5 && F.t < 0.57)) ? 2 : 0;
  }

  /* ------------------------------------------------ THE ROOM'S STEP

     Keeps the obstacle list to hand and counts the catches. Anything
     broadcast that was on the screen last frame, is gone now, had been on
     long enough to have a box, was not carried off by a crow and had not
     slid out at the left was caught - and the set puts its VOLUME bar up
     for it. No cry: a catch has the engine's own noises. */
  function stepWorld(dt, obstacles, run) {
    var S = run && run.ledger ? run.ledger.tv : null;
    view.obs = obstacles;
    if (!S) return;
    var now = {}, i, ob, k;
    for (i = 0; i < obstacles.length; i++) {
      ob = obstacles[i];
      if (ob.gone || ob.meet) continue;
      if (ob.type === 'drop' && !(ob.broken > 0)) {
        k = kindOf(ob);
        if (k === 'pixel') continue;
      } else if (ob.type === 'boon' && !ob.taken) k = 'life';
      else continue;
      if (ob.id === undefined) ob.id = ++uid;
      now[ob.id] = { k: k, x: ob.x, away: !!ob.away, age: ob.age || 0 };
      if (!S.seen[ob.id]) S.born[k]++;
    }
    for (var id in S.seen) {
      var was = S.seen[id];
      if (now[id] || was.away || was.x < -50 || was.age < BOX_AGE) continue;
      S.vol.t = 1.4; S.vol.level = VOL[was.k] || 10; S.vol.kind = was.k;
      S.caught++;
    }
    S.seen = now;
  }
  var uid = 0;

  /* A HARNESS'S HANDLE: TV.force('snow', 3) starts that fault now and
     holds it 3s; 'none' holds every fault off for the time given (the
     control run); 'spill' spills the set; 'live' or 'tunnel', 'card' and
     'chan:NN' hold the dial; 'score:NN' stands the ladder at NN for the
     time given; 'on' and 'off' throw the switch. Applied on the set's
     next step, so it is never half-applied mid-draw. */
  function force(name, secs) {
    view.forceQ.push({ name: String(name), secs: secs === undefined ? 3 : +secs });
  }

  /* and a read-only look at the set for a headless test */
  function debugState(run) {
    var S = run && run.ledger ? run.ledger.tv : null;
    if (!S) return null;
    return { phase: S.phase, chan: S.chan, base: S.base, spill: S.spill,
             fault: S.fault.name, stage: S.fault.stage, t: S.fault.t, dur: S.fault.dur,
             hard: hardOn(S), caught: S.caught, born: S.born, score: S.score };
  }

  /* ================================================== THE PICTURE

     Composed every drawn frame into T.pic (480x218, screen rows 24..241)
     and only then laid on the glass, so the pillars, the dead pixels and
     the doodad all go over it:
        1. the PROGRAMME - the test card, a rerun in its look, or the live
           feed - held under the marble (A4)
        2. before the spill, the running fault, on the programme only (A5)
        3. a burst of static on a channel change
        4. the tube's black level drifting, which a CRT's does
        5. the power-ups, in full colour, ON TOP - they break through the
           static and a slipped hold, the one thing the set cannot take
           the colour out of
        6. the scanlines, the tube's vignette, and the skylight still
           standing faintly in the glossy glass even with the set on
     ... and then through THE TUBE onto the glass. */

  /* THE PICTURE NEVER OUTSHINES THE MARBLE (A4). The pillars are the
     pale mass in this bay - their columns measure 182 of luminance on
     average and their caps 227 - so nothing in the glass may pass about
     155. The test card and the level-select cover take this one multiply;
     every rerun takes its own, measured at build (capOf, below). */
  var CAP = '#9c9c9c';
  var BOX_AGE = 0.45;           /* a broadcast thing tunes in for 0.45s and has no box */
  /* HOW BIG THE BROADCAST IS: the power-ups are the very sprites the
     player caught in their own bays, drawn a quarter bigger - "just a
     little bit bigger than their usual size", the owner's words, after the
     first cut doubled them and made the bay much easier. Nearest
     neighbour, so a quarter of the rows and columns come out doubled,
     which on a television is what a picture slightly too big for its
     tube looks like. The glow and the tune-in static scale with it. */
  var PU_SCALE = 1.25;

  /* THE COOP'S CARD - the level select's generic cover in the Coop's
     colours, which is what the first card of the first room shows */
  function coopCard(c, x, y, w, h, t) {
    var Q = Coop.PREVIEW, s = t * 24, i, k;
    var ceil = y + 6, floor = y + h - 9;
    c.fillStyle = Q.back; c.fillRect(x, y, w, h);
    for (i = -1; i < w / 11 + 1; i++) {
      var sx = Math.round(x + i * 11 - (s * 0.25) % 11);
      c.fillStyle = (i % 2) ? Q.backAlt : Q.back; c.fillRect(sx, y, 10, h);
      c.fillStyle = Q.seam; c.fillRect(sx, y, 1, h);
    }
    Tint.rect(c, x, y, w, Math.round(h * 0.5), Q.air, 1);
    Tint.rect(c, x, y + h - 30, w, 30, Q.gloom, 3);
    c.fillStyle = Q.beam; c.fillRect(x, y, w, 6);
    c.fillStyle = Q.beamDark; c.fillRect(x, y + 4, w, 2);
    c.fillStyle = Q.ground; c.fillRect(x, floor, w, y + h - floor);
    Tint.rect(c, x, floor, w, y + h - floor, Q.groundDark, 7);
    c.fillStyle = Q.groundHi; c.fillRect(x, floor, w, 1);
    var period = 40, span = floor - ceil;
    for (k = 0; k < 4; k++) {
      var ox = Math.round(x + w + 12 - ((s + k * period) % (period * 4)));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.34);
      var gapY = Math.round(ceil + 6 + ((k * 17) % Math.max(1, span - gapH - 12)));
      planklet(c, ox, ceil, gapY - ceil, Q);
      planklet(c, ox, gapY + gapH, floor - gapY - gapH, Q);
    }
    for (var n = 0; n < 3; n++) {
      var nx = Math.round(x + w - ((s + n * 53) % (w + 30)));
      if (nx < x || nx > x + w - 2) continue;
      c.fillStyle = Q.spike; c.fillRect(nx, floor - 5, 1, 5); c.fillRect(nx + 2, floor - 7, 1, 7);
      c.fillStyle = Q.spikeHi; c.fillRect(nx + 2, floor - 8, 2, 1);
    }
    var bx = Math.round(x + w * 0.32), by = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    c.fillStyle = '#20150c'; c.fillRect(bx - 3, by - 3, 7, 7);
    c.fillStyle = '#c9873c'; c.fillRect(bx - 2, by - 2, 5, 5);
    c.fillStyle = '#eab873'; c.fillRect(bx - 2, by - 2, 3, 1);
    c.fillStyle = '#f3cc84'; c.fillRect(bx + 3, by, 2, 1);
    Tint.rect(c, x, y, w, h, Q.air, 1);
  }

  function planklet(c, x, y, h, Q) {
    if (h <= 0) return;
    c.fillStyle = Q.beam; c.fillRect(x, y, 10, h);
    c.fillStyle = Q.beamLight; c.fillRect(x + 1, y, 2, h);
    c.fillStyle = Q.beamDark; c.fillRect(x, y, 1, h); c.fillRect(x + 9, y, 1, h);
  }

  /* One bay's cover into a little canvas at time t, inside its own
     save/clip, and a bay whose cover throws is taken off the air (its own
     PREVIEW.back from then on) rather than taking this bay down with it.
     The canvas it threw in is replaced, so no clip it left behind
     survives into the next frame. */
  var offAir = {};
  function paintCover(lo, w, h, r, t, big) {
    var c = lo.ctx, mod = r[3];
    var back = mod && mod.PREVIEW ? mod.PREVIEW.back : Coop.PREVIEW.back;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
    c.fillStyle = back; c.fillRect(0, 0, w, h);
    if (offAir[r[0]]) return lo;
    c.save();
    c.beginPath(); c.rect(0, 0, w, h); c.clip();
    try {
      if (mod) mod.drawPreview(c, 0, 0, w, h, t, big);
      else coopCard(c, 0, 0, w, h, t);
      c.restore();
    } catch (e) {
      offAir[r[0]] = true;
      lo = makeCanvas(w, h);
      lo.ctx.fillStyle = back; lo.ctx.fillRect(0, 0, w, h);
    }
    return lo;
  }

  /* THE LOOKS: what each old set did to a picture. Fills with composite
     modes over the programme, nothing per pixel. `room` asks for only the
     luminosity-preserving half of a look - the hue and the saturation -
     which is what the room itself takes during a surf after the spill:
     every value in the room keeps its luminance, so no pillar loses its
     edge to a sepia afternoon. */
  function look(c, name, x, y, w, h, room) {
    if (name === 'bw') {
      op(c, 'saturation', '#000000', 1, x, y, w, h);
    } else if (name === 'sepia') {
      op(c, 'saturation', '#000000', 1, x, y, w, h);
      op(c, 'color', '#a87448', 0.9, x, y, w, h);
      if (!room) op(c, 'screen', '#1a1008', 1, x, y, w, h);
    } else if (name === 'seventies') {
      op(c, 'saturation', '#ff0040', room ? 0.6 : 1, x, y, w, h);
      if (!room) {
        op(c, 'multiply', '#ffe2b8', 0.55, x, y, w, h);
        op(c, 'screen', '#2a1000', 1, x, y, w, h);
      }
    } else if (name === 'phosphor') {
      op(c, 'saturation', '#000000', 1, x, y, w, h);
      op(c, 'color', '#39ff6a', room ? 0.7 : 1, x, y, w, h);
      if (!room) op(c, 'screen', '#063010', 1, x, y, w, h);
    } else if (name === 'cga') {
      op(c, 'saturation', '#000000', 1, x, y, w, h);
      op(c, 'color', '#ff55ff', room ? 0.7 : 1, x, y, w, h);
      if (!room) {
        op(c, 'lighter', '#002a2a', 1, x, y, w, h);
        c.globalCompositeOperation = 'multiply';
        c.drawImage(T.cgaRows.canvas, 0, 0, w, h, x, y, w, h);
        c.globalCompositeOperation = 'source-over';
      }
    } else if (name === 'vhs') {
      op(c, 'color', '#e0a040', room ? 0.35 : 0.5, x, y, w, h);
      if (!room) tracking(c, x, y, w, h);
    }
  }

  /* THE TAPE'S TRACKING BAND: fourteen rows of picture thrown 7px to the
     left with a ribbon of noise under them, rolling slowly down the
     picture and spending some of its time off the bottom */
  function tracking(c, x, y, w, h) {
    var by = Math.round(wrap(view.clock * 60, 300)) - 40;
    var top = Math.max(0, by), bot = Math.min(h, by + 14);
    if (bot <= top) return;
    var s = T.scr.ctx;
    s.clearRect(0, 0, w, bot - top);
    s.drawImage(c.canvas, x, y + top, w, bot - top, 0, 0, w, bot - top);
    c.drawImage(T.scr.canvas, 0, 0, w, bot - top, x - 7, y + top, w, bot - top);
    var ny = Math.min(h - 2, bot);
    var ox = hash(view.frame * 13 + 5) % (VW - w);
    c.globalAlpha = 0.8;
    c.drawImage(T.snowA.canvas, ox, hash(view.frame * 13 + 6) % 200, w, 2, x, y + ny, w, 2);
    c.globalAlpha = 1;
  }

  /* EACH RERUN'S OWN CAP. One multiply for all fourteen held the palest
     (the Whiteboard's white wall) to 150 and took the Coop's barn and the
     Mantle's dark television down to mud with it. So each cover is
     measured once, at build - in its look, at three moments of its own
     loop, through getImageData, which is allowed at boot and nowhere else
     - and gets the multiply that brings ITS brightest one percent to 150
     of luminance, and no lower: a dark cover is left as dark as it is. */
  var capOf = {};
  /* 144, not 150: the tube's drifting black level adds up to six on top,
     and the measured ceiling inside the picture is then 155 */
  var CAP_TO = 144;
  function measureCaps() {
    var t = makeCanvas(96, 72), i, k, j;
    for (i = 0; i < RERUNS.length; i++) {
      var r = RERUNS[i], lum = [];
      for (k = 0; k < 3; k++) {
        t = paintCover(t, 96, 72, r, 0.6 + k * 1.7, false);
        look(t.ctx, r[4], 0, 0, 96, 72, false);
        var d = t.ctx.getImageData(0, 0, 96, 72).data;
        for (j = 0; j < d.length; j += 4) lum.push(0.299 * d[j] + 0.587 * d[j + 1] + 0.114 * d[j + 2]);
      }
      lum.sort(function (a, b) { return a - b; });
      var top = lum[Math.floor(lum.length * 0.99)] || 255;
      var m = Math.round(255 * Math.min(1, CAP_TO / Math.max(1, top)));
      capOf[r[0]] = 'rgb(' + m + ',' + m + ',' + m + ')';
    }
  }

  /* the programme into the picture: the card, a rerun or the feed */
  function programme(S, pc) {
    var ch = S.chan;
    if (ch === VIDEO_CH) {
      /* a tape's blue screen, a tracking line rolling up it, and whoever
         is on it drawn over it by compose */
      pc.fillStyle = P.vcrBlue; pc.fillRect(0, 0, VW, PIC_H);
      pc.fillStyle = 'rgba(255,255,255,0.18)';
      var tl = Math.floor(wrap(-view.clock * 52, PIC_H));
      pc.fillRect(0, tl, VW, 2);
      pc.fillStyle = 'rgba(255,255,255,0.06)';
      pc.fillRect(0, (tl + 7) % PIC_H, VW, 5);
      return;
    }
    if (ch === 3) {
      pc.drawImage(T.card.canvas, 0, 0);
      pc.fillStyle = 'rgba(255,255,255,0.35)';
      pc.fillRect(0, Math.floor(wrap(view.clock * 38, PIC_H)), VW, 1);
      op(pc, 'multiply', CAP, 1, 0, 0, VW, PIC_H);
      return;
    }
    if (ch === LIVE_CH) { live(S, pc); return; }
    var r = rerunOf(ch);
    pc.fillStyle = P.box; pc.fillRect(0, 0, VW, PIC_H);
    if (!r) return;
    T.lo = paintCover(T.lo, 96, 72, r, view.clock, false);
    pc.drawImage(T.lo.canvas, 0, 0, 96, 72, 96, 1, 288, 216);
    look(pc, r[4], 96, 1, 288, 216, false);
    op(pc, 'multiply', capOf[r[0]] || CAP, 1, 96, 1, 288, 216);
    pc.fillStyle = P.boxEdge;
    pc.fillRect(95, 0, 1, PIC_H); pc.fillRect(384, 0, 1, PIC_H);
  }

  /* CH 35 LIVE. The last frame of the whole room - the room layer as it
     left postBg and the doodad as he left postChars - drawn back into the
     picture at 0.80 about the tunnel's still point, so the picture holds
     the room which holds the picture which holds the room. Smoothing ON
     for this one blit: it is a camera looking at a screen, and a camera's
     copy is soft, which is also what keeps the copies' scanlines from
     beating into moire. Every generation then takes the rainbow at its
     own radius - the copies are nested at fixed scales, so a ring of hue
     per ring of copy is a different colour per generation - and the
     multiply that dims each one to about 0.63 of the last. Before the
     spill the feed sits back at 0.75; after it, full; from DEEP_AT at
     0.84, a longer tunnel. */
  function live(S, pc) {
    var deep = S.score >= DEEP_AT;
    /* the copy's rectangle; everything outside it is the dark round the
       camera's picture, already as dim as the multiply would make it */
    var fx = deep ? 38 : 48, fy = deep ? -1 : 3, fw = deep ? 404 : 384, fh = deep ? 220 : 216;
    pc.fillStyle = P.tunnelDim; pc.fillRect(0, 0, VW, PIC_H);
    pc.fillStyle = P.tunnel; pc.fillRect(fx, fy, fw, fh);
    pc.globalAlpha = S.spill ? 1 : 0.75;
    pc.imageSmoothingEnabled = true;
    if (deep) pc.drawImage(T.feedShown.canvas, 0, 0, VW, VH, 38, -1, 404, 227);
    else pc.drawImage(T.feedShown.canvas, 0, 0, VW, VH, 48, 3, 384, 216);
    pc.imageSmoothingEnabled = false;
    pc.globalAlpha = 1;
    var cx = 240, cy = deep ? 120 : 111, R = 300, sc = deep ? 0.84 : 0.80;
    var g = pc.createRadialGradient(cx, cy, 0, cx, cy, R);
    var h0 = view.clock * 34, rk = 260, k = 0;
    g.addColorStop(0, 'hsl(' + Math.round(h0 + 520) % 360 + ',100%,50%)');
    while (rk > 12 && k < 14) {
      g.addColorStop(Math.min(1, rk / R), 'hsl(' + Math.round(h0 + k * 40) % 360 + ',100%,50%)');
      rk *= sc; k++;
    }
    pc.globalCompositeOperation = 'color';
    pc.globalAlpha = 0.42;
    pc.fillStyle = g; pc.fillRect(fx, Math.max(0, fy), fw, Math.min(PIC_H, fh));
    pc.globalCompositeOperation = 'source-over';
    pc.globalAlpha = 1;
    op(pc, 'multiply', '#a0a4a8', 1, fx, Math.max(0, fy), fw, Math.min(PIC_H, fh));
  }

  /* ---------------------------------------------------------- STATIC

     Two baked sheets at offsets hashed off the frame counter, laid as
     four source-rect pieces each so nothing outside rows y0..y0+217 is
     ever touched and no clip is needed. */
  function snowSheet(c, sheet, ox, oy, y0, a) {
    var W = VW, Hh = PIC_H;
    c.globalAlpha = a;
    if (W - ox > 0 && Hh - oy > 0) c.drawImage(sheet, ox, oy, W - ox, Hh - oy, 0, y0, W - ox, Hh - oy);
    if (ox > 0 && Hh - oy > 0) c.drawImage(sheet, 0, oy, ox, Hh - oy, W - ox, y0, ox, Hh - oy);
    if (W - ox > 0 && oy > 0) c.drawImage(sheet, ox, 0, W - ox, oy, 0, y0 + Hh - oy, W - ox, oy);
    if (ox > 0 && oy > 0) c.drawImage(sheet, 0, 0, ox, oy, W - ox, y0 + Hh - oy, ox, oy);
  }

  /* `rich` lays the second sheet at half strength over the first, for
     the static inside the picture, which is looked at; the room's and the
     doodad's static is one sheet, which in motion reads the same and
     costs half */
  function drawSnow(c, a, y0, rich) {
    if (a <= 0.004) return;
    var f = view.frame;
    var ga = c.globalAlpha;
    snowSheet(c, T.snowA.canvas, hash(f * 7 + 1) % VW, hash(f * 7 + 2) % PIC_H, y0, ga * a);
    if (rich) snowSheet(c, T.snowB.canvas, hash(f * 7 + 3) % VW, hash(f * 7 + 4) % PIC_H, y0, ga * a * 0.5);
    c.globalAlpha = ga;
  }

  /* ---------------------------------------------- THE FAULTS, DRAWN

     The same six recipes serve the picture before the spill and the
     whole room layer after it. `y0, h` is the band they act in (the
     picture's rows), `c` the canvas they act on; T.scr is the scratch. */
  function fGhost(c, a, y0, h) {
    var s = T.scr.ctx, W = c.canvas.width;
    s.clearRect(0, 0, VW, VH);
    s.drawImage(c.canvas, 0, y0, W, h, 0, 0, W, h);
    c.globalAlpha = a;
    c.drawImage(T.scr.canvas, 0, 0, W - GHOST_DX, h, GHOST_DX, y0, W - GHOST_DX, h);
    c.globalAlpha = 1;
  }

  function fTear(c, F, bandTop, fill) {
    var s = T.scr.ctx, W = c.canvas.width, r, off;
    s.clearRect(0, 0, VW, TEAR_ROWS);
    s.drawImage(c.canvas, 0, bandTop, W, TEAR_ROWS, 0, 0, W, TEAR_ROWS);
    for (r = 0; r < TEAR_ROWS; r++) {
      off = tearOff(F, r);
      if (!off) continue;
      if (fill) { c.fillStyle = fill; c.fillRect(0, bandTop + r, W, 1); }
      else c.clearRect(0, bandTop + r, W, 1);
      c.drawImage(T.scr.canvas, 0, r, W, 1, off, bandTop + r, W, 1);
    }
  }

  function fHsize(c, env, y0, h) {
    var bw = Math.round((VW - HSIZE_X) * env);
    if (bw <= 0) return;
    var x0 = VW - bw;
    c.fillStyle = P.band; c.fillRect(x0, y0, bw, h);
    /* the deflection piling the picture up at the edge it has lost:
       two bright columns where the scan turns round */
    c.fillStyle = 'rgba(220,235,255,0.55)'; c.fillRect(x0 - 2, y0, 1, h);
    c.fillStyle = 'rgba(240,248,255,0.85)'; c.fillRect(x0 - 1, y0, 1, h);
  }

  /* averaged down to a quarter, nearest-neighbour back up (A6) */
  function fMosaic(c, y0, h, transparent) {
    var m = T.mos.ctx, mh = Math.ceil(h / 4);
    m.clearRect(0, 0, VW / 4, 68);
    m.imageSmoothingEnabled = true; m.imageSmoothingQuality = 'high';
    m.drawImage(c.canvas, 0, y0, VW, mh * 4, 0, 0, VW / 4, mh);
    m.imageSmoothingEnabled = false;
    if (transparent) c.clearRect(0, y0, VW, h);
    c.save();
    c.beginPath(); c.rect(0, y0, VW, h); c.clip();
    c.drawImage(T.mos.canvas, 0, 0, VW / 4, mh, 0, y0, VW, mh * 4);
    c.restore();
  }

  /* the faults on the programme, before the spill (A5) */
  function glassFault(S, pc) {
    var F = S.fault, env = envOf(F);
    if (F.stage !== 'run') return;
    if (F.name === 'snow') drawSnow(pc, 0.55 * env, 0, true);
    else if (F.name === 'ghost') fGhost(pc, GHOST_A * env, 0, PIC_H);
    else if (F.name === 'hsize') {
      /* in the glass a failing width squeezes the picture itself in from
         the right; out in the room only the dead band comes (A7), because
         squeezing the room would move the pillars without moving him */
      var bw = Math.round((VW - HSIZE_X) * env);
      if (bw > 0) {
        var sc = T.scr.ctx;
        sc.clearRect(0, 0, VW, PIC_H);
        sc.drawImage(pc.canvas, 0, 0);
        pc.fillStyle = P.band; pc.fillRect(0, 0, VW, PIC_H);
        pc.drawImage(T.scr.canvas, 0, 0, VW, PIC_H, 0, 0, VW - bw, PIC_H);
        fHsize(pc, env, 0, PIC_H);
      }
    }
    else if (F.name === 'mosaic') fMosaic(pc, 0, PIC_H, false);
    else if (F.name === 'tear') fTear(pc, F, clamp(F.y0 - CEIL, 0, PIC_H - TEAR_ROWS), P.band);
    else if (F.name === 'vhold') {
      /* the picture rolls: the frame slips down, the blanking bar rides
         above it, and over the bar is the tail of the frame before */
      var k = vholdK(F), s = T.scr.ctx;
      if (k <= 0) return;
      s.clearRect(0, 0, VW, PIC_H);
      s.drawImage(pc.canvas, 0, 0);
      pc.fillStyle = P.band; pc.fillRect(0, 0, VW, PIC_H);
      pc.drawImage(T.scr.canvas, 0, 0, VW, PIC_H - k, 0, k, VW, PIC_H - k);
      if (k > 5) pc.drawImage(T.scr.canvas, 0, PIC_H - k + 5, VW, k - 5, 0, 0, VW, k - 5);
    }
  }

  /* ---------------------------------------- THE BROADCAST POWER-UPS

     Everything worth catching, as imagery on the screen. TUNING IN (its
     first 0.45s, and no box): a square of static growing out of nothing
     where it will be. RESOLVING (to 0.80s): the sprite, jittering
     sideways with its colour guns wide apart. STEADY: a glow in the
     kind's own colours, the red and blue guns a pixel either side, the
     sprite, and every other frame a pixel lower - the interlace. On each
     bounce off the top or bottom of the picture the guns swap sides for
     a moment. A gift held by one of Crow's crew is a real thing in a
     real crow's talons, so it is drawn steady and in front. */
  var GLOW = {
    hot:  ['255,200,97', '255,74,26', '140,18,8'],
    sour: ['214,255,122', '143,212,74', '95,143,34'],
    spin: ['214,160,255', '150,80,220', '90,42,140'],
    gold: ['255,226,122', '230,192,74', '168,131,42'],
    life: ['147,216,189', '95,174,154', '47,107,98']
  };
  /* half-sizes for the bounce, in the sprite's own drawn pixels; build()
     measures them off the baked sprites */
  var HALF = null;

  function spinFrame(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 4) % 4; }

  /* where a broadcast thing's middle is, in screen space */
  function bob(ob) { return Math.round(Math.sin((ob.phase || 0) + (ob.age || 0) * 2.2) * 6); }
  function centreOf(ob) {
    if (ob.type === 'boon') return [Math.round(ob.x + 12 + ob.dx), Math.round(ob.y + ob.dy) + bob(ob)];
    return [Math.round(ob.x), Math.round(ob.tv || ob.held ? ob.y : ob.ty)];
  }

  function drawBroadcast(c, ob, oy) {
    var k = kindOf(ob), at = centreOf(ob), x = at[0], y = at[1] - oy;
    var age = ob.age || 0, a0 = c.globalAlpha, sp, tw;
    if (!ob.held && age < BOX_AGE) {
      var s = Math.round((3 + 9 * (age / BOX_AGE)) * PU_SCALE);
      var h = hash((ob.id || 1) * 97 + view.frame);
      c.globalCompositeOperation = 'lighter';
      c.globalAlpha = a0 * 0.85;
      c.drawImage(T.snowA.canvas, h % (VW - 24), (h >>> 9) % (PIC_H - 24), s, s,
                  x - (s >> 1), y - (s >> 1), s, s);
      c.globalCompositeOperation = 'source-over';
      c.globalAlpha = a0;
      return;
    }
    var resolving = !ob.held && age < 0.8;
    var jit = resolving ? (hash((ob.id || 1) * 31 + view.frame) % 7) - 3 : 0;
    var mis = resolving ? 2 : 1;
    if (ob.bounceT > 0) mis = -mis;
    var lace = !resolving && !ob.held && (view.frame & 1) ? 1 : 0;
    var gc = GLOW[k] || GLOW.life;
    var pulse = 0.72 + 0.28 * Math.sin(view.clock * 2.6 + (ob.phase || 0));
    var r = Math.round((8 + 3 * pulse) * PU_SCALE);
    var g = c.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(' + gc[0] + ',' + (0.46 * pulse).toFixed(3) + ')');
    g.addColorStop(0.55, 'rgba(' + gc[1] + ',' + (0.22 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(' + gc[2] + ',0)');
    c.fillStyle = g;
    c.fillRect(x - r, y - r, r * 2, r * 2);
    x += jit; y += lace;
    if (k === 'life') {
      /* the pot stays where it was planted unless it is a crow's gift;
         the rosette goes where Gerald's hunger pulls it */
      tw = T.pu.life;
      var lw = tw.img.w >> 1, lt = Math.round(8 * PU_SCALE);
      if (!ob.held) c.drawImage(T.pu.pot.canvas, Math.round(ob.x) + 12 - lw + jit, Math.round(ob.y) + bob(ob) - oy - lt + lace);
      sp = [tw.img.canvas, x - lw, y - lt];
    } else {
      tw = k === 'spin' ? T.pu.spin[spinFrame(ob)] : T.pu[k];
      sp = [tw.img.canvas, x - (tw.img.w >> 1), y - (tw.img.h >> 1)];
    }
    c.globalAlpha = a0 * 0.55;
    c.drawImage(tw.red.canvas, sp[1] - mis, sp[2]);
    c.drawImage(tw.blue.canvas, sp[1] + mis, sp[2]);
    c.globalAlpha = a0;
    c.drawImage(sp[0], sp[1], sp[2]);
  }

  /* ------------------------------------------------------- THE TUBE

     The picture onto the glass. ON: whole, unless the degauss is still
     wobbling it - four bands of it swaying sideways out of step, a
     rainbow washing through - and two pixels down for the flinch of a
     tell. BLOOM: the picture opening out of the line it came on as, very
     bright and fading to normal. LINE and DOT the way every CRT ever
     started. COLLAPSE and SPOT are the run ending: the picture squashed
     flat to a white line, the line to a dot, the dot gone. */
  function tube(ctx, S) {
    var ph = S.phase, pic = T.pic.canvas, k, h, i;
    var a0 = ctx.globalAlpha;
    if (ph === 'on') {
      var wob = wobbleOf(S), j = flinch(S);
      if (wob > 0.001) {
        for (i = 0; i < 4; i++) {
          var sy = i * 55, sh = Math.min(55, PIC_H - sy);
          var dx = Math.round(Math.sin(view.clock * 31 + i * 1.7) * 5 * wob);
          ctx.drawImage(pic, 0, sy, VW, sh, dx, CEIL + sy, VW, sh);
        }
        var rg = ctx.createLinearGradient(0, CEIL, 0, FLOOR);
        var hh = view.clock * 700;
        for (i = 0; i <= 4; i++) rg.addColorStop(i / 4, 'hsl(' + Math.round(hh + i * 90) % 360 + ',100%,50%)');
        ctx.globalCompositeOperation = 'color';
        ctx.globalAlpha = a0 * 0.35 * wob;
        ctx.fillStyle = rg; ctx.fillRect(0, CEIL, VW, PIC_H);
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = a0;
      } else ctx.drawImage(pic, 0, CEIL + j);
    } else if (ph === 'bloom') {
      k = clamp(S.pt / (T_BLOOM * S.k), 0, 1);
      h = Math.max(3, Math.round(PIC_H * ease(k)));
      var y0 = CEIL + 109 - (h >> 1);
      ctx.drawImage(pic, 0, 0, VW, PIC_H, 0, y0, VW, h);
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(220,235,255,' + (0.6 * (1 - k)).toFixed(3) + ')';
      ctx.fillRect(0, y0, VW, h);
      ctx.globalCompositeOperation = 'source-over';
    } else if (ph === 'line') {
      k = clamp(S.pt / (T_LINE * S.k), 0, 1);
      var lw = Math.round(VW * (0.25 + 0.75 * ease(k)));
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(180,210,255,0.5)'; ctx.fillRect((VW - lw) >> 1, 128, lw, 9);
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#e8f4ff'; ctx.fillRect((VW - lw) >> 1, 131, lw, 3);
    } else if (ph === 'dot') {
      k = clamp(S.pt / (T_DOT * S.k), 0, 1);
      dotAt(ctx, Math.round(2 + 4 * k), Math.round(2 + 2 * k), 0.4);
    } else if (ph === 'collapse') {
      k = clamp(S.pt / T_COLLAPSE, 0, 1);
      h = Math.max(3, Math.round(PIC_H * Math.pow(1 - k, 3)));
      var yc = CEIL + 109 - (h >> 1);
      ctx.drawImage(pic, 0, 0, VW, PIC_H, 0, yc, VW, h);
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = 'rgba(255,255,255,' + (0.35 + 0.5 * k).toFixed(3) + ')';
      ctx.fillRect(0, yc, VW, h);
      ctx.globalCompositeOperation = 'source-over';
    } else if (ph === 'spot') {
      k = clamp(S.pt / T_SPOT, 0, 1);
      if (k < 0.5) {
        var sw = Math.round(VW * (1 - ease(k * 2)) + 6);
        ctx.fillStyle = '#f4faff'; ctx.fillRect((VW - sw) >> 1, 131, sw, 3);
      } else {
        ctx.globalAlpha = a0 * (1 - ease((k - 0.5) * 2));
        dotAt(ctx, 6, 4, 0.4);
        ctx.globalAlpha = a0;
      }
    }
  }

  /* the spot: a hard white dot in a soft bloom wide enough to show round
     the GET READY hint, which sits on the very row a tube's centre is */
  function dotAt(ctx, w, h, halo) {
    var a0 = ctx.globalAlpha;
    var g = ctx.createRadialGradient(240, 133, 1, 240, 133, 30);
    g.addColorStop(0, 'rgba(200,225,255,' + (halo * 1.6).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(200,225,255,0)');
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = g;
    ctx.fillRect(210, 103, 60, 60);
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = a0;
    ctx.fillStyle = '#f4faff';
    ctx.fillRect(240 - (w >> 1), 133 - (h >> 1), w, h);
  }

  /* --------------------------------------------------- drawBackdrop */
  function drawBackdrop(ctx, scroll, obstacles, run) {
    var S = run && run.ledger ? run.ledger.tv : null;
    /* TWO FEED BUFFERS. The tunnel shows the frame taken on the LAST
       stepped frame and never the one being taken now - so a paused set,
       drawn twice, shows the same tunnel twice, and the copy postBg takes
       on the paused frame is not seen until the set steps again. */
    if (view.shownFrame !== view.frame) {
      var tmp = T.feedShown; T.feedShown = T.feed; T.feed = tmp;
      view.shownFrame = view.frame;
    }
    view.obs = obstacles || view.obs;
    view.S = S;
    var gx = (scroll || 0) * GLASS_PAR;
    ctx.fillStyle = P.glassDeep; ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.glass.canvas, gx, CEIL);
    if (S && S.phase !== 'off' && S.phase !== 'dark') {
      if (S.phase === 'on' || S.phase === 'bloom' || S.phase === 'collapse') compose(S, obstacles, gx);
      tube(ctx, S);
    }
    ctx.drawImage(T.sideShade.canvas, 0, CEIL);
  }

  function compose(S, obstacles, gx) {
    var pc = T.pic.ctx, i, ob;
    pc.setTransform(1, 0, 0, 1, 0, 0);
    pc.globalAlpha = 1; pc.globalCompositeOperation = 'source-over';
    pc.imageSmoothingEnabled = false;
    programme(S, pc);
    if (!S.spill) glassFault(S, pc);
    if (S.burst > 0) drawSnow(pc, Math.min(1, S.burst / 0.12) * 0.9, 0, true);
    op(pc, 'lighter', '#202428', 0.10 + 0.10 * Math.sin(view.clock * 0.37), 0, 0, VW, PIC_H);
    if (obstacles) {
      for (i = 0; i < obstacles.length; i++) {
        ob = obstacles[i];
        if (ob.held || ob.gone) continue;
        if (ob.meet) { if (!ob.met) drawOnAir(pc, ob, CEIL); continue; }
        if ((ob.type === 'drop' && !(ob.broken > 0) && kindOf(ob) !== 'pixel') ||
            (ob.type === 'boon' && !ob.taken)) drawBroadcast(pc, ob, CEIL);
      }
    }
    pc.drawImage(T.tube.canvas, 0, 0);
    tileX(pc, T.glare.canvas, gx, 0);
  }

  /* the rail and the wall: the lid, and the rail's shadow down the glass */
  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.lid.canvas, scroll, 0);
    ctx.drawImage(T.lidShade.canvas, 0, CEIL);
  }

  /* the ground, the frame's shadow up the glass, and - while the set is
     on - the picture's own light falling on the wall under the frame,
     which is all the glow the wall ever gets */
  function drawFloor(ctx, scroll) {
    ctx.drawImage(T.groundShade.canvas, 0, FLOOR - 10);
    tileX(ctx, T.ground.canvas, scroll, FLOOR);
    if (view.S && view.S.phase === 'on') ctx.drawImage(T.railGlow.canvas, 0, FLOOR + 8);
  }

  /* the menus see the set off: dark glass, the room in it, the frame */
  function drawMenuBackdrop(ctx, scroll) {
    var s = (scroll || 0) * 0.6;
    ctx.fillStyle = P.glassDeep; ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.glass.canvas, s * GLASS_PAR, CEIL);
    ctx.drawImage(T.sideShade.canvas, 0, CEIL);
    tileX(ctx, T.lid.canvas, s, 0);
    ctx.drawImage(T.lidShade.canvas, 0, CEIL);
    ctx.drawImage(T.groundShade.canvas, 0, FLOOR - 10);
    tileX(ctx, T.ground.canvas, s, FLOOR);
  }

  /* ------------------------------------------------------- the pillar */
  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), tile = T.column[ob.variant].canvas, w = 34;
    var topH = ob.gapY - CEIL, botY = ob.gapY + ob.gapH, botH = FLOOR - botY;
    if (topH > 0) DiningRoom.drawColumn(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) DiningRoom.drawColumn(ctx, tile, x, botY, w, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* standing in front of the glass: its hard shadow on the picture */
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH - 9 : 0, P.void, 7);
    Tint.rect(ctx, x + w, botY + 9, 4, botH > 9 ? botH - 9 : 0, P.void, 7);
  }

  /* ------------------------------------------------ the dead pixel

     The Mantle's, frame for frame and box for box: a red, a green and a
     blue stripe turning about the vertical, falling out of the picture
     and in front of everything in it. The spot it throws on the rail and
     the seven subpixels it comes apart into are the Mantle's too. */
  var PIX_W = [9, 8, 6, 3, 1, 3, 6, 8];
  function pixFrame(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 8) % 8; }

  function drawDrop(ctx, ob) {
    if (kindOf(ob) === 'pixel') {
      blitBelowCeil(ctx, T.pixel[pixFrame(ob)].canvas, Math.round(ob.x) - 5, Math.round(ob.y) - 5);
      return;
    }
    if (ob.held) drawBroadcast(ctx, ob, 0);
  }

  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0 || kindOf(ob) !== 'pixel') return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(11 - k * 5), x = Math.round(ob.x);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3, P.void, 6 + k * 9);
    ctx.fillStyle = P.pxRed;   ctx.fillRect(x - 2, FLOOR + 1, 1, 1);
    ctx.fillStyle = P.pxGreen; ctx.fillRect(x, FLOOR + 1, 1, 1);
    ctx.fillStyle = P.pxBlue;  ctx.fillRect(x + 2, FLOOR + 1, 1, 1);
  }

  var SPLAT_SPREAD = [[-6, 1], [-3, 2], [-1, 1], [1, 2], [3, 1], [5, 2], [7, 1]];
  function drawDropSplat(ctx, ob) {
    if (kindOf(ob) !== 'pixel') return;
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1), x = Math.round(ob.x), a = ctx.globalAlpha, i;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);
    var on = Math.floor(ob.broken * 12) % 2;
    for (i = 0; i < SPLAT_SPREAD.length; i++) {
      if ((i % 2) === on) continue;
      ctx.fillStyle = i % 3 === 0 ? P.pxRed : (i % 3 === 1 ? P.pxGreen : P.pxBlue);
      ctx.fillRect(x + SPLAT_SPREAD[i][0], FLOOR + SPLAT_SPREAD[i][1], 1, 1);
    }
    ctx.fillStyle = P.pxWhite;
    ctx.fillRect(x + SPLAT_SPREAD[3][0], FLOOR + SPLAT_SPREAD[3][1], 1, 1);
    ctx.globalAlpha = a;
  }

  /* dust on the top face of the bottom rail - the only litter a white
     frame on a clean wall has; half the time, nothing */
  function drawLitter(ctx, ob) {
    if (ob.kind !== 0) return;
    var x = Math.round(ob.x);
    ctx.fillStyle = P.dust;
    ctx.fillRect(x + 2, FLOOR + 1, 1, 1);
    ctx.fillRect(x + 6, FLOOR + 2, 1, 1);
    ctx.fillRect(x + 9, FLOOR + 1, 1, 1);
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') { if (ob.held && !ob.taken) drawBroadcast(ctx, ob, 0); }
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
    /* a spike is never armed in here and draws nothing */
  }

  /* ================================================ THE ROOM LAYER

     postBg is the last word on the room layer. Before the spill it only
     adds the permanent broadcast scanlines (from BROADCAST_AT) and takes
     the live feed; after it, the running fault acts on everything on
     this layer - wall, rails, pillars, dead pixels, the power-ups - and
     postChars does exactly the same thing to the doodad. The shake
     transform is taken off first: every one of these is a whole-canvas
     operation in the canvas's own pixels. */
  function postBg(ctx, run, state) {
    var S = run && run.ledger ? run.ledger.tv : null;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    if (S) {
      var F = S.fault, env = envOf(F);
      if (S.spill && S.surf && S.phase === 'on') {
        var r = rerunOf(S.chan);
        if (r) look(ctx, r[4], 0, CEIL, VW, PIC_H, true);
      }
      if (S.spill && F.stage === 'run') {
        if (F.name === 'ghost') fGhost(ctx, GHOST_A * env, CEIL, PIC_H);
        else if (F.name === 'mosaic') { fMosaic(ctx, CEIL, PIC_H, false); restamp(ctx, 1); }
        else if (F.name === 'tear') fTear(ctx, F, F.y0, P.band);
        else if (F.name === 'vhold') {
          var k = vholdK(F);
          if (k > 0) {
            var s = T.scr.ctx;
            s.clearRect(0, 0, VW, VH);
            s.drawImage(ctx.canvas, 0, 0);
            ctx.fillStyle = P.band; ctx.fillRect(0, 0, VW, k);
            ctx.drawImage(T.scr.canvas, 0, 0, VW, VH - k, 0, k, VW, VH - k);
          }
        } else if (F.name === 'snow') {
          drawSnow(ctx, (S.score >= DEEP_AT ? SNOW_ROOM_DEEP : SNOW_ROOM) * env, CEIL);
          restamp(ctx, 0.8);
        } else if (F.name === 'hsize') fHsize(ctx, env, CEIL, PIC_H);
      }
      /* THE SPILL ITSELF: half a second of static pouring out over the
         whole room. Strong enough to be an event and no stronger - 0.6 at
         its height and gone on a curve, so a pillar's outline and its caps
         never leave the screen, and every dead pixel stamped back on top */
      if (S.spillT > 0) {
        drawSnow(ctx, spillA(S) * 0.72, CEIL);
        restamp(ctx, 1);
      }
      if (S.score >= BROADCAST_AT && S.phase === 'on') {
        ctx.globalAlpha = 0.55; ctx.drawImage(T.scan.canvas, 0, CEIL);
        ctx.globalAlpha = 0.5;  ctx.drawImage(T.vig.canvas, 0, CEIL);
        ctx.globalAlpha = 1;
      }
    }
    /* THE FEED, once a stepped frame, so a paused tunnel holds */
    if (view.captured !== view.frame) {
      T.feed.ctx.clearRect(0, 0, VW, VH);
      T.feed.ctx.drawImage(ctx.canvas, 0, 0, ctx.canvas.width, ctx.canvas.height, 0, 0, VW, VH);
      view.captured = view.frame;
    }
    ctx.restore();
  }

  /* the spill's static: on at once, and away over the half second */
  function spillA(S) {
    var k = clamp(S.spillT / 0.5, 0, 1);
    return k * k;
  }

  /* A6: what can kill stays visible. After a mosaic or under the snow,
     every dead pixel in the air is stamped back where it truly is - the
     mosaic never runs with the hold or a tear, so where it truly is is
     where it is drawn. */
  function restamp(ctx, a) {
    var obs = view.obs, i, ob;
    if (!obs) return;
    ctx.globalAlpha = a;
    for (i = 0; i < obs.length; i++) {
      ob = obs[i];
      if (ob.type !== 'drop' || ob.broken > 0 || kindOf(ob) !== 'pixel') continue;
      blitBelowCeil(ctx, T.pixel[pixFrame(ob)].canvas, Math.round(ob.x) - 5, Math.round(ob.y) - 5);
    }
    ctx.globalAlpha = 1;
  }

  /* THE DOODAD'S LAYER. From LIVE_AT it is taken down to the game's own
     480x270 every frame - averaged, smoothing on (A6) - because the feed
     needs him in it. From the spill he STAYS that way: the smooth layer is
     cleared and the chunky copy laid back nearest-neighbour, one game
     pixel to the pixel (two from DEEP_AT), and the running fault acts on
     him with the same numbers it acts on the room with. Snow lands on his
     pixels only (source-atop), at the cap that keeps him readable. */
  function postChars(ctx, run, state) {
    var S = run && run.ledger ? run.ledger.tv : null;
    if (!S) return;
    var lit = S.phase === 'on' || S.phase === 'bloom' || S.phase === 'collapse';
    if (!lit && !S.spill) return;
    var cw = ctx.canvas.width, chh = ctx.canvas.height, d = cw / VW;
    var p = T.pix.ctx, F = S.fault, env = envOf(F);
    /* WHERE HE IS. In play nothing on this layer is ever far from the
       doodad - Crow's crew fly at his side, and nothing else in this bay
       stands on it - so only a band round him is taken down and put back:
       from the left edge (the crew come in from there) to 110px ahead of
       him, 100px above and below, and the fault's own reach on top of
       that (the hold's 22px slip, the ghost's 9). Out of play - the
       tumble, the results, a pause - the whole layer, every frame. The
       band is on the four-pixel grid, so the mosaic and the two-pixel
       doodad land on the same blocks the room's do. */
    var rx = 0, ry = 0, rw = VW, rh = VH;
    if (state === 'play' && run.px !== undefined) {
      ry = clamp(Math.floor((run.py - 100) / 4) * 4, 0, VH);
      rw = clamp(Math.ceil((run.px + 110) / 4) * 4, 0, VW);
      rh = clamp(Math.ceil((run.py + 100) / 4) * 4, 0, VH) - ry;
    }
    var oh = Math.min(VH - ry, rh + VHOLD_PX + 2), ow = Math.min(VW, rw + GHOST_DX + TEAR_PX + 4);
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    p.globalAlpha = 1; p.globalCompositeOperation = 'source-over';
    p.clearRect(0, 0, VW, VH);
    if (rw > 0 && rh > 0) shrink(ctx.canvas, rx * d, ry * d, rw * d, rh * d, p, rx, ry, rw, rh);
    if (S.spill) {
      var deep = S.score >= DEEP_AT, run1 = F.stage === 'run';
      if (run1 && F.name === 'mosaic') fMosaic(p, 0, VH, true);
      else if (deep) {
        var q = T.pix2.ctx;
        q.clearRect(0, 0, VW / 2, T.pix2.h);
        shrink(T.pix.canvas, 0, 0, VW, VH, q, 0, 0, VW / 2, VH / 2);
        p.clearRect(0, 0, VW, VH);
        p.drawImage(T.pix2.canvas, 0, 0, VW / 2, VH / 2, 0, 0, VW, VH);
      }
      if (run1 && F.name === 'ghost') pixGhost(p, GHOST_A * env);
      else if (run1 && F.name === 'tear') fTear(p, F, F.y0, null);
      else if (run1 && F.name === 'vhold') {
        var k = vholdK(F);
        if (k > 0) {
          var s = T.scr.ctx;
          s.clearRect(0, 0, VW, VH);
          s.drawImage(T.pix.canvas, 0, 0);
          p.clearRect(0, 0, VW, VH);
          p.drawImage(T.scr.canvas, 0, 0, VW, VH - k, 0, k, VW, VH - k);
        }
      } else if (run1 && F.name === 'snow') {
        p.globalCompositeOperation = 'source-atop';
        drawSnow(p, SNOW_HIM * env, CEIL);
        p.globalCompositeOperation = 'source-over';
      }
      /* the moment the picture pours out of the glass, it pours over him:
         static on his own pixels, harder than the room's but on him alone,
         so the pillars keep their edges through it */
      if (S.spillT > 0) {
        p.globalCompositeOperation = 'source-atop';
        drawSnow(p, spillA(S) * 0.8, CEIL);
        p.globalCompositeOperation = 'source-over';
      }
      if (lit) rimLight(S, p, rx, ry, ow, oh, true);
      /* and back, one game pixel to however many device pixels it is */
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(rx * d, ry * d, ow * d, oh * d);
      ctx.drawImage(T.pix.canvas, rx, ry, ow, oh, rx * d, ry * d, ow * d, oh * d);
    } else if (lit && rw > 0 && rh > 0) {
      /* still smooth: the backlight goes in behind him at the device's own
         resolution, softened, so it reads as light round a smooth thing */
      rimLight(S, p, rx, ry, rw, rh, false);
      ctx.globalCompositeOperation = 'destination-over';
      ctx.imageSmoothingEnabled = true;
      ctx.drawImage(T.rim.canvas, rx, ry, rw, rh, rx * d, ry * d, rw * d, rh * d);
      ctx.globalCompositeOperation = 'source-over';
    }
    if (view.fed !== view.frame) {
      T.feed.ctx.drawImage(T.pix.canvas, 0, 0);
      view.fed = view.frame;
    }
    ctx.restore();
  }

  /* AVERAGED DOWN, NOT POINT-SAMPLED (A6), and cheaply: halve with plain
     bilinear until the next step is no more than two to one, then the
     last step. Each halving is an exact two-by-two average, so a 1920
     canvas comes down to 480 as a true four-by-four box - the quality
     'high' asks for, without building a mip chain of the whole device
     canvas every frame. */
  function shrink(src, sx, sy, sw, sh, dst, dx, dy, dw, dh) {
    var cur = src, cx = sx, cy = sy, cw = sw, ch = sh, i = 0;
    for (var n = 0; cw > dw * 2.5 && n < 4; n++) {
      var hw = Math.ceil(cw / 2), hh = Math.ceil(ch / 2), hv = T.halves[i];
      /* grown to the device canvas the first time it is needed, and again
         only if the window grows */
      if (!hv || hv.w < hw || hv.h < hh) hv = T.halves[i] = makeCanvas(hw, hh);
      hv.ctx.clearRect(0, 0, hw, hh);
      hv.ctx.imageSmoothingEnabled = true; hv.ctx.imageSmoothingQuality = 'low';
      hv.ctx.drawImage(cur, cx, cy, cw, ch, 0, 0, hw, hh);
      cur = hv.canvas; cx = 0; cy = 0; cw = hw; ch = hh;
      i = 1 - i;
    }
    dst.imageSmoothingEnabled = true; dst.imageSmoothingQuality = cw > dw * 2.5 ? 'high' : 'low';
    dst.drawImage(cur, cx, cy, cw, ch, dx, dy, dw, dh);
    dst.imageSmoothingEnabled = false;
  }

  /* THE BACKLIGHT. He is between the camera and a lit screen, so the
     picture wraps round his edge: a one-pixel rim of the tube's cool light
     just outside his silhouette, strongest on the dark live feed and
     faintest on the test card. It is what keeps a black bird on a black
     tunnel - Crow, on CH 35 - from being a hole in the picture, and it is
     no wider than an outline, so it never reads as an aura (those mean a
     power-up). Built from the 480x270 copy of his layer; laid in behind
     him (destination-over), never over him. */
  var RIM = '#dbe7ff';
  function rimLight(S, p, x, y, w, h, into) {
    var a = S.chan === LIVE_CH ? 0.62 : (S.chan === 3 ? 0.3 : 0.45);
    var r = T.rim.ctx, src = T.pix.canvas;
    /* only the band he is in, a pixel wider all round for the ring */
    var x0 = Math.max(0, x - 1), y0 = Math.max(0, y - 1);
    var x1 = Math.min(VW, x + w + 1), y1 = Math.min(VH, y + h + 1), bw = x1 - x0, bh = y1 - y0;
    if (bw <= 0 || bh <= 0) return;
    r.globalCompositeOperation = 'source-over'; r.globalAlpha = 1;
    r.clearRect(x0, y0, bw, bh);
    r.drawImage(src, x0, y0, bw, bh, x0 - 1, y0, bw, bh);
    r.drawImage(src, x0, y0, bw, bh, x0 + 1, y0, bw, bh);
    r.drawImage(src, x0, y0, bw, bh, x0, y0 - 1, bw, bh);
    r.drawImage(src, x0, y0, bw, bh, x0, y0 + 1, bw, bh);
    r.globalCompositeOperation = 'source-in';
    r.fillStyle = RIM; r.fillRect(x0, y0, bw, bh);
    r.globalCompositeOperation = 'destination-out';
    r.drawImage(src, x0, y0, bw, bh, x0, y0, bw, bh);
    if (!into) {
      r.globalCompositeOperation = 'destination-in';
      r.fillStyle = 'rgba(0,0,0,' + a + ')'; r.fillRect(x0, y0, bw, bh);
      r.globalCompositeOperation = 'source-over';
      return;
    }
    r.globalCompositeOperation = 'source-over';
    p.globalCompositeOperation = 'destination-over';
    p.globalAlpha = a;
    p.drawImage(T.rim.canvas, x0, y0, bw, bh, x0, y0, bw, bh);
    p.globalAlpha = 1;
    p.globalCompositeOperation = 'source-over';
  }

  function pixGhost(p, a) {
    var s = T.scr.ctx;
    s.clearRect(0, 0, VW, VH);
    s.drawImage(T.pix.canvas, 0, 0);
    p.globalAlpha = a;
    p.drawImage(T.scr.canvas, GHOST_DX, 0);
    p.globalAlpha = 1;
  }

  /* ================================================ THE SET'S WRITING

     The on-screen display, in the green every set of a certain age wrote
     in, two pixels to the pixel with a dark shadow, on the front layer
     under every banner and number the game itself puts up. It keeps out
     from under the score (centre, rows 31..73) and the gauges (x 188..292,
     rows 80..110), and from under the shouts and banners (rows 94..133):
     the channel at the top right, PLAY and PAUSE at the top left, the
     fault's name low and centred, the bay's name and the VOLUME bar along
     the bottom of the picture. Only while the set is on. */
  function osd(ctx, str, x, y, scale, align, colour) {
    Font.draw(ctx, str, x, y, { scale: scale, colour: colour || P.osd, shadow: P.osdShadow,
                                align: align || 'left' });
  }

  function drawFront(ctx, run, state) {
    var S = run && run.ledger ? run.ledger.tv : null;
    if (!S) return;
    if (S.phase !== 'on') return;
    var F = S.fault, blink2 = Math.floor(view.clock * 2) % 2 === 0;
    /* the channel */
    if (S.chan === LIVE_CH && S.osd <= 0) {
      osd(ctx, 'LIVE', 466, 44, 2, 'right');
      if (blink2) {
        ctx.fillStyle = P.osdShadow; ctx.fillRect(407, 48, 6, 6);
        ctx.fillStyle = P.live; ctx.fillRect(406, 47, 6, 6);
      }
    } else if (S.osd > 0) {
      osd(ctx, S.chan === VIDEO_CH ? 'VIDEO' : 'CH ' + (S.chan < 10 ? '0' : '') + S.chan, 466, 44, 2, 'right');
    }
    if (S.third > 0 && S.chan !== 3) osd(ctx, caption(S.chan), 14, 228, 1, 'left');
    /* play and pause, the way the set says them */
    if (state === 'paused') {
      ctx.fillStyle = P.osdShadow; ctx.fillRect(16, 46, 4, 12); ctx.fillRect(24, 46, 4, 12);
      ctx.fillStyle = P.osd; ctx.fillRect(14, 44, 4, 12); ctx.fillRect(22, 44, 4, 12);
      osd(ctx, 'PAUSE', 34, 44, 2, 'left');
    } else if (state === 'play' && S.playT >= 0 && S.playT < 1.2) {
      osd(ctx, '▶ PLAY', 14, 44, 2, 'left');
    }
    /* the fault, named: blinking through the tell, solid as it starts */
    if (F.stage === 'tell' && Math.floor(F.t * 8) % 2 === 0) osd(ctx, WORD[F.name], 240, 206, 2, 'center');
    else if (F.stage === 'run' && F.t < 0.4 && WORD[F.name]) osd(ctx, WORD[F.name], 240, 206, 2, 'center');
    /* the volume a catch turned the set up to */
    if (S.vol.t > 0) drawVolume(ctx, S.vol);
    if (S.sleep > 0 && blink2) osd(ctx, 'SLEEP ' + (20 - S.sleepN * 5), 466, 62, 2, 'right');
  }

  function drawVolume(ctx, v) {
    var fill = Math.min(v.level, Math.round(v.level * Math.min(1, (1.4 - v.t) / 0.25)));
    osd(ctx, 'VOLUME', 196, 228, 1, 'left');
    for (var i = 0; i < 20; i++) {
      var x = 238 + i * 9;
      ctx.fillStyle = P.osdShadow; ctx.fillRect(x + 1, 229, 7, 6);
      ctx.fillStyle = i < fill ? (i >= 16 ? P.live : P.osd) : P.osdEmpty;
      ctx.fillRect(x, 228, 7, 6);
    }
    osd(ctx, String(fill), 422, 228, 1, 'left');
  }

  /* ================================================== THE COVER

     118x114 on the big card, 82x94 on the small ones, already clipped by
     the caller. The bay in miniature: the woven wall over the top rail
     and under the bottom one, and between them the set ON - cycling three
     reruns in their looks (the Coop in black and white, the Canopy in
     green phosphor, the Ceiling in CGA), four seconds each with a burst of
     static between, its scanlines and its channel number - with two marble
     columns and their white caps sliding past in front, a dead pixel
     tumbling out of the picture, a lime glowing on the screen (big card)
     and the doodad flying it. */
  var COVER_RUNS = [[11, 'bw'], [14, 'phosphor'], [34, 'cga']];

  function drawPreview(ctx, x, y, w, h, t, big) {
    var lidH = Math.round(h * 0.09), gndH = Math.round(h * 0.11);
    var py = y + lidH + 4, ph = h - lidH - gndH - 8, gy = py + ph;
    var i, k;

    /* 1. the picture: a rerun at half the card's resolution, doubled */
    var seg = Math.floor(t / 4), within = t - seg * 4;
    var run = COVER_RUNS[wrap(seg, COVER_RUNS.length)];
    var r = rerunOf(run[0]);
    var lw = Math.ceil(w / 2), lh = Math.ceil(ph / 2);
    T.cover = paintCover(T.cover, lw, lh, r, t, false);
    ctx.drawImage(T.cover.canvas, 0, 0, lw, lh, x, py, lw * 2, lh * 2);
    look(ctx, run[1], x, py, w, ph, false);
    op(ctx, 'multiply', CAP, 1, x, py, w, ph);
    if (within < 0.3) {
      var f = Math.floor(t * 30), hs = hash(f * 7 + 11);
      ctx.globalAlpha = 0.9 * (1 - within / 0.3);
      ctx.drawImage(T.snowA.canvas, hs % (VW - w), (hs >>> 9) % (PIC_H - ph), w, ph, x, py, w, ph);
      ctx.globalAlpha = 1;
    }

    /* 2. a lime on the screen, in the picture, under the scanlines */
    if (big) {
      var lx = x + Math.round(w * 0.64), ly = py + Math.round(ph * 0.42 + Math.sin(t * 1.3) * ph * 0.22);
      var pulse = 0.72 + 0.28 * Math.sin(t * 2.6);
      var g = ctx.createRadialGradient(lx, ly, 1, lx, ly, 13);
      g.addColorStop(0, 'rgba(214,255,122,' + (0.5 * pulse).toFixed(3) + ')');
      g.addColorStop(1, 'rgba(95,143,34,0)');
      ctx.fillStyle = g; ctx.fillRect(lx - 13, ly - 13, 26, 26);
      ctx.globalAlpha = 0.55;
      var lm = T.pu.sour.img, lhx = lm.w >> 1, lhy = lm.h >> 1;
      ctx.drawImage(T.pu.sour.red.canvas, lx - lhx - 1, ly - lhy);
      ctx.drawImage(T.pu.sour.blue.canvas, lx - lhx + 1, ly - lhy);
      ctx.globalAlpha = 1;
      ctx.drawImage(lm.canvas, lx - lhx, ly - lhy);
    }
    ctx.drawImage(T.scan.canvas, 0, 0, w, ph, x, py, w, ph);

    /* 3. two marble columns with white caps going past, keyed on their
       slot's identity and not their position (the Mantle's lesson: a
       column hashed on where it is boils as it slides) */
    var s = t * 22, period = big ? 46 : 38;
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - wrap(s + i * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var id = i + 3 * Math.floor((s + i * period) / (period * 3));
      var gapH = Math.round(ph * 0.40), room = Math.max(1, ph - gapH - 14);
      var gapY = Math.round(py + 7 + ((hash(id * 13 + 5) % 100) / 100) * room);
      pvColumn(ctx, ox, py - 4, gapY - py + 4, true, id * 2);
      pvColumn(ctx, ox, gapY + gapH, gy + 4 - gapY - gapH, false, id * 2 + 1);
    }

    /* the set's own number, on top, the way the OSD is in the bay */
    Font.draw(ctx, 'CH ' + run[0], x + w - 4, py + 3, { scale: 1, colour: P.osd, shadow: P.osdShadow, align: 'right' });

    /* 4. a dead pixel tumbling down out of the picture, right third */
    var pf = Math.floor(s / 4) % 8;
    var pw2 = Math.max(1, Math.round(PIX_W[pf] * 0.5));
    var pxx = x + Math.round(w * 0.82);
    var pyy = Math.round(py + 2 + wrap(s * 1.5, ph - 8));
    ctx.fillStyle = P.pxOutline; ctx.fillRect(pxx - Math.floor(pw2 / 2) - 1, pyy - 1, pw2 + 2, 7);
    if (pw2 <= 1) { ctx.fillStyle = P.pxWhite; ctx.fillRect(pxx, pyy, 1, 5); }
    else {
      var third = Math.max(1, Math.round(pw2 / 3)), o0 = pxx - Math.floor(pw2 / 2);
      ctx.fillStyle = pf < 4 ? P.pxRed : P.pxBlue; ctx.fillRect(o0, pyy, third, 5);
      ctx.fillStyle = P.pxGreen; ctx.fillRect(o0 + third, pyy, third, 5);
      ctx.fillStyle = pf < 4 ? P.pxBlue : P.pxRed; ctx.fillRect(o0 + third * 2, pyy, pw2 - third * 2, 5);
    }

    /* 5. the doodad flying it */
    var dx = Math.round(x + w * 0.3);
    var dy = Math.round(py + ph / 2 + Math.sin(t * 3.1) * (ph * 0.2));
    var sz = big ? 8 : 6;
    ctx.fillStyle = P.outline;  ctx.fillRect(dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx + sz / 2 - 2, dy - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(dx + sz / 2, dy, 2, 1);

    /* 6. the frame and the wall, last, over the columns' ends: the woven
       wall above, the top rail with its outline on the kill line, the
       bottom rail with its lit arris, the wall below */
    var wx = wrap(Math.round(s), 96);
    for (k = -96; k < w + 96; k += 96) {
      ctx.drawImage(T.weave.canvas, 0, 20, 96, lidH, x + k - wx, y, 96, lidH);
      ctx.drawImage(T.weave.canvas, 0, 4, 96, gndH, x + k - wx, gy + 4, 96, gndH);
    }
    var TOP = [P.railLit, P.rail, P.railIn, P.outline];
    for (i = 0; i < 4; i++) { ctx.fillStyle = TOP[i]; ctx.fillRect(x, y + lidH + i, w, 1); }
    var BOT = [P.railLit, P.rail, P.rail, P.railLip];
    for (i = 0; i < 4; i++) { ctx.fillStyle = BOT[i]; ctx.fillRect(x, gy + i, w, 1); }
    Tint.rect(ctx, x, gy + 4, w, 2, P.void, 5);
  }

  /* one little marble column, a crop of the real weave, with its white
     cap on the end that faces the gap */
  function pvColumn(ctx, x, y, h, capBottom, key) {
    if (h <= 0) return;
    var sx = hash(key * 7 + 3) % 84, sy = hash(key * 5 + 1) % 48;
    var done = 0;
    while (done < h) {
      var take = Math.min(h - done, 48 - sy);
      ctx.drawImage(T.weave.canvas, sx, sy, 12, take, x, y + done, 12, take);
      done += take; sy = 0;
    }
    ctx.fillStyle = P.outline; ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 11, y, 1, h);
    var cy = capBottom ? y + h - 4 : y;
    ctx.fillStyle = P.outline; ctx.fillRect(x - 2, cy, 16, 4);
    ctx.fillStyle = P.rail;    ctx.fillRect(x - 2, cy + 1, 16, 2);
    ctx.fillStyle = P.railLit; ctx.fillRect(x - 2, capBottom ? cy + 2 : cy + 1, 16, 1);
  }

  /* ================================================== GENERATION */

  function makePillar(x, gapY, gapH, run) {
    return { type: 'pillar', x: x, w: 34,
             gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.4) ? 1 : 0, scored: false };
  }

  /* NO SPIKES: the tune never arms them (spikeScore 1e9). The maker
     answers anyway, with a thing that has no art and no boxes. */
  function makeSpikes(x, side, count, maxLen, run) {
    return { type: 'spike', x: Math.round(x), side: 'floor', w: 1 };
  }

  /* Something off the top rail, or something on the screen: a dead pixel
     unless the engine says otherwise - and it says so AFTER this returns
     (ob.gold, ob.sour, ob.whirl), so nothing here writes down what kind
     of thing this is. `ty` is where on the picture it will tune in if it
     turns out to be broadcast. `want`, Crow's ORDNANCE: 'gold' makes the
     gold apple on request, 'plain' anything but; this bay rolls no gold of
     its own, the engine's goldChance does (A8). */
  function makeDrop(x, spicy, fall, run, want) {
    var ob = { type: 'drop', x: x, y: CEIL + 5, w: 9, vy: fall,
               spicy: !!spicy, broken: 0,
               spin: rand(0, TAU), spinRate: rand(4.5, 8) * (chance(0.5) ? -1 : 1),
               phase: rand(0, TAU), id: ++uid, bounceT: 0,
               ty: CEIL + 44 + rand(0, PIC_H - 88) };
    if (want === 'gold') { ob.gold = true; ob.name = GOLD_NAME; }
    return ob;
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 12, kind: randInt(0, 1) };
  }

  /* the succulent, on the screen: x is the LEFT EDGE of its box (the
     Living Room's convention, for collide's cull and save's clear) and y
     the middle of the lane it bobs about; Gerald's hunger owns dx/dy */
  function makeBoon(x, run) {
    return { type: 'boon', x: x, y: 112 + rand(0, 48), w: 24, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0, id: ++uid,
             name: BOON_NAME,
             burst: [P.lifePale, P.lifeJade, '#e08a9a', '#5aa84a'] };
  }

  /* SOMEBODY ON AIR - the TV's hider, for whoever the roster has put here
     (Buster). The engine asks for him once a run on the plank tune.meetAt
     rolls, sets ob.meet after this returns, and catches him on its own
     collide path when he is flown through, as a broadcast power-up is. He
     is a broadcast and so is drawn by THIS file, in the picture
     (selfDrawn), tuning in out of static like the rest. While he is on the
     screen the set is on his channel, VIDEO; a fault that starts while he
     is there scrambles him (startFault raises ledger.spook, the engine's
     spook takes him), and every fault is told a second before it starts,
     so the race is visible. `shy` is what lets the spook reach him. */
  function makeMeet(x, run) {
    return { type: 'boon', x: x, y: 96 + rand(0, 72), w: 26, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0, id: ++uid,
             shy: true, selfDrawn: true };
  }

  /* is he on the screen right now? read off the list the world step last
     saw, so the screen step and the fault start agree on one answer */
  function onAir() {
    var obs = view.obs;
    if (!obs) return false;
    for (var i = 0; i < obs.length; i++) {
      var ob = obs[i];
      if (ob.meet && !ob.met && !ob.gone && ob.x < VW - 6 && ob.x > -30) return true;
    }
    return false;
  }

  /* HIM, in the picture: the same tune-in out of static as a power-up,
     then his own sprite at broadcast size with the tube's ghosting either
     side and the phosphor glow behind him. Drawn where centreOf says, which
     is where rectsFor boxes him. */
  function drawOnAir(c, ob, oy) {
    var at = centreOf(ob), x = at[0], y = at[1] - oy, age = ob.age || 0, a0 = c.globalAlpha;
    if (age < BOX_AGE) {
      var s = Math.round((3 + 11 * (age / BOX_AGE)) * PU_SCALE);
      var h = hash((ob.id || 1) * 97 + view.frame);
      c.globalCompositeOperation = 'lighter';
      c.globalAlpha = a0 * 0.9;
      c.drawImage(T.snowA.canvas, h % (VW - 24), (h >>> 9) % (PIC_H - 24), s, s,
                  x - (s >> 1), y - (s >> 1), s, s);
      c.globalCompositeOperation = 'source-over';
      c.globalAlpha = a0;
      return;
    }
    var pulse = 0.72 + 0.28 * Math.sin(view.clock * 2.6 + (ob.phase || 0));
    var r = Math.round(16 * PU_SCALE);
    var g = c.createRadialGradient(x, y, 1, x, y, r + 6);
    g.addColorStop(0, 'rgba(160,196,255,' + (0.40 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(0,88,255,0)');
    c.fillStyle = g;
    c.fillRect(x - r - 6, y - r - 6, (r + 6) * 2, (r + 6) * 2);
    var id = ob.meet.id, body = Math.round(12 * PU_SCALE), blink = (view.frame >> 4) % 9 === 0;
    /* smoothed for these three draws only: a 338px sprite point-sampled
       down to 30 is noise, which the engine's hider draw warns about too */
    c.imageSmoothingEnabled = true;
    c.globalAlpha = a0 * 0.35;
    Doodads.draw(c, id, x - 2, y, body, 0, blink);
    Doodads.draw(c, id, x + 2, y, body, 0, blink);
    c.globalAlpha = a0;
    Doodads.draw(c, id, x, y + ((view.frame & 1) ? 1 : 0), body, 0, blink);
    c.imageSmoothingEnabled = false;
  }

  /* --------------------------------------------------------- stepDrop

     A DEAD PIXEL falls: the Mantle's four lines. ANYTHING BROADCAST never
     falls and never lands - it tunes in where it was put, and from its
     first step bounces slowly up and down the picture at 46px/s, off
     rails it never touches (ten pixels clear of both), swaying a few
     pixels as it goes, sliding off the left of the screen with the world
     and culled there by the engine. The kind is read live, every frame. */
  var BOUNCE_V = 46;

  function stepDrop(ob, dt, obstacles, run) {
    var k = kindOf(ob);
    if (k === 'pixel') {
      ob.vy += DROP_GRAV * dt;
      ob.y += ob.vy * dt;
      ob.spin += ob.spinRate * dt;
      return ob.y >= FLOOR - 4;
    }
    if (ob.gold && !ob.name) ob.name = GOLD_NAME;
    if (!ob.tv) {
      ob.tv = true;
      ob.y = ob.ty;
      ob.vy = (Math.sin(ob.phase) < 0 ? -1 : 1) * BOUNCE_V;
      ob.w = 14;
      if (k === 'spin') ob.spinRate = (ob.spinRate < 0 ? -1 : 1) * 2.6;
    }
    var half = HALF[k], lo = CEIL + 10 + half, hi = FLOOR - 10 - half;
    ob.y += ob.vy * dt;
    if (ob.y < lo) { ob.y = Math.min(hi, 2 * lo - ob.y); ob.vy = Math.abs(ob.vy); ob.bounceT = 0.3; }
    else if (ob.y > hi) { ob.y = Math.max(lo, 2 * hi - ob.y); ob.vy = -Math.abs(ob.vy); ob.bounceT = 0.3; }
    if (ob.bounceT > 0) ob.bounceT = Math.max(0, ob.bounceT - dt);
    ob.x += 5 * Math.cos((ob.age || 0) * 1.3 + ob.phase) * dt * 1.3;
    ob.spin += ob.spinRate * dt;
    return false;
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one, and NO
     BOX EVER READS A FAULT: a slipped, torn or ghosted frame moves the
     doodad with it, so the boxes stay where the world is. */
  /* HALF-SIZES, and a little kinder than each thing's own bay - about a
     fifth wider and taller than the box it has there (the Garden's pepper
     10x12, the Canopy's lime 10x12, the Deck's gold apple 10x10, the Bar's
     record 16x16, the Garden's succulent 18x19), because it is drawn a
     quarter bigger and it is a thing to be caught. The first cut drew
     everything twice its size with boxes to match and the owner sent it
     back as making the bay much easier. */
  var BOXES = { hot: [6, 8], sour: [6, 7], gold: [6, 6], spin: [10, 10], life: [11, 11] };

  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
      return out;
    }
    if (ob.type === 'drop' || ob.type === 'boon') {
      if (ob.broken > 0 || ob.taken) return out;
      var k = kindOf(ob);
      if (k === 'pixel') {
        /* the Mantle's: the lethal width is the drawn width, floored at 3 */
        var bw = Math.max(3, PIX_W[pixFrame(ob)]);
        out.push([ob.x - Math.floor(bw / 2), ob.y - 4, bw, 9]);
        return out;
      }
      if (!ob.held && (ob.age || 0) < BOX_AGE) return out;
      var at = centreOf(ob), b = BOXES[k];
      out.push([at[0] - b[0], at[1] - b[1], b[0] * 2, b[1] * 2]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME, CEIL_KILLS: true,
    BOON_NAMES: [BOON_NAME], GOLD_GIFT: true,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor, drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon, makeMeet: makeMeet,
    stepDrop: stepDrop, stepWorld: stepWorld, stepScreen: stepScreen,
    postBg: postBg, postChars: postChars, drawFront: drawFront,
    rectsFor: rectsFor,
    /* for a headless test: throw a fault or a channel on the set, and
       read the set back; and the ladder, so a test can name its rungs */
    force: force, debugState: debugState, hardOn: hardOn,
    LADDER: { LIVE_AT: LIVE_AT, SPILL_AT: SPILL_AT, MOSAIC_AT: MOSAIC_AT, DEEP_AT: DEEP_AT,
              BROADCAST_AT: BROADCAST_AT, SLEEP_AT: SLEEP_AT }
  };
})();
