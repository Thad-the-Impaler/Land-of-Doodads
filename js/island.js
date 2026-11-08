/* ------------------------------------------------------------------
   Land of Doodads - THE KITCHEN / THE ISLAND  (4-1)

   Evening. You are flying ACROSS THE TOP OF THE ISLAND with your chin
   on its quartz: the lens is five centimetres over the stone at the
   island's dining-side edge, so the white quartz with its grey veins
   fills the bottom of the screen and runs away from you to the island's
   far edge, a few rows under the middle of the frame. Past that edge is
   the back counter, two and a half metres off: its quartz nose, the
   machines standing on it - the Breville and its grinder, the Instant
   Pot, the air fryer, the knife block, the sink's gooseneck with the
   soap and the bottles and the bamboo dish rack - the iridescent strip
   mosaic behind them, the four glass-front uppers with their nickel
   bars between two runs of open shelves, the monstera under the little
   window, the big window of plantation shutters black between their
   louvres, and over all of it the ceiling plane with its cans. Drawn
   from the owner's Island ref 1 (the lens on the island at night, this
   very view), ref 3 (the same room from a step back, with the hood and
   its chimney), ref 4 and 6 (the cooktop and the quartz up close) and
   Counter ref 1, 2, 10 and 12 for the machines and the corner.

   THE OWNER WROTE THE LEVEL DOWN AND PICKED ITS TWO BIG THINGS:
     - pans fall from above;
     - the stove "occasionally comes past on the ground, shooting up
       tall pillars of fire at the player. This fire can also blast
       things back up, the pans and power-ups";
     - the power-ups are his: a clear white-capped home hot-sauce
       bottle (spicy), a Glutathione stick pack (the spare life, the
       teal Cymbiotika one off Gluta ref), a wedge of watermelon wet
       with lime juice (sour) and a gold pan (+5);
     - the PILLARS are stacks of the red enamel Dutch oven standing on
       the quartz - pot, lid and knob, pot - and the stainless chimney
       of the island's range hood hanging from the lid with its curved
       glass canopy as the cap;
     - the lid kills, as it does all through the Kitchen.

   THE ROOM, AS ONE PHYSICAL SPACE. One pinhole, level, and one set of
   heights and distances that every row below is read off:

        row(H, D)   = 186 - 180 (H - 96) / D
        width(w, D) = 180 w / D

   H is the height over the floor and D the distance from the lens, in
   cm; the lens is at 96 (the quartz is 91). Read off it: the island's
   far edge (91, 1.2 m) is row 194; the back counter's quartz nose is
   190; the uppers (137..229 cm, 2.63 m) are 95..158 with their crown
   to 90; the ceiling over the back wall (274) is 64, and the ceiling
   plane between there and the lid takes rows 24..64. A 38 cm door at
   the wall is 23 px. The one thing NOT read off this lens is the
   cooktop, which is the stove and so belongs to the play plane - see
   THE COOKTOP for why, and where it went.

   COUNTED, NOT REPEATED. Island ref 1 and Counter ref 1 and 2 have the
   uppers as TWO PAIRS of glass-front doors - four, their bar pulls
   meeting in the middle of each pair - with open shelves at both ends
   (three straight ones by the little window, three curved ones by the
   big one). The little window is two shutter panels and the big one
   four. That is what is drawn, once each, in a 480 px wall tile; past
   the big window the wall runs on, with the little shelf and its dark
   bottle, to the corner into the hall and its doorway - which is where
   THE TABLE's view of this same wall puts them. (THE TABLE drew three
   uppers from across the room; ref 1 has the four pulls, and this bay
   counts the photograph in front of it.)

   WHY THE ISLAND IS ONE PLANE. Everything on the island top - the
   stone, and the cooktop set into it - scrolls at 1.0, from the far
   edge at row 194 to the bottom of the screen: the cooktop is set into
   the stone, and a thing set into a surface must move with that surface,
   so the island is one surface at one speed. The
   back counter and everything on it is baked into the wall tile at
   0.25: an appliance that drifted out from under its own cabinet would
   be the first thing the owner saw. The counter's nose at 190 against
   the island's edge at 194 is a clean depth shear, which is what the
   eye expects there.

   AND WHY THE ISLAND IS BARE. In ref 1 and 2 the island has a tray on
   it - the ZZ plant on its bamboo stand, the pepper grinder, the steel
   oil can, the Polaroid - and the red Dutch oven on the cooktop. The
   tray stands BETWEEN the dining edge and the cooktop (ref 2, ref 6
   from the other side), which at this lens is behind the camera: a
   60 cm plant 70 cm off would be 140 px tall across the whole lane.
   And the Dutch oven that sits on the cooktop in every photograph is
   not drawn on it: the pots are in the bay as the pillars (THE COOKTOP
   says why a second one would be wrong at either scale).

   LUMINANCE, MEASURED (sixteen scrolls, no obstacles): the ceiling
   plane 134, the wall over the uppers 154, the uppers 144 (their glass
   panes 92), the splash 146, the counter's machines 40..120, the quartz
   lane 213, the band under the kill row 178 - a step from 205 to 183
   across the kill row itself, and no line drawn on it. Everything the
   player acts on is red (the stacks, 47..125), brushed steel (the
   chimneys, a 167 face with a 213 lit edge, an 89 shade and the house
   ring), black (the pans), the fire's orange, or a power-up's own
   colour, against a cream-and-white room: the enamel stands ninety
   under the stone it stands on, and the chimneys stand clear of the
   ceiling plane and the uppers both, cold grey against a warm wall.

   WHAT IT DOES IN A REAL RUN, counted rather than assumed: sixteen
   seeded 60 s runs for each number, flown by the headless harness's
   autopilot with spare lives enough that a run lasts the minute (see
   THE STOVE for the clock and the arithmetic):
     - a stove every 9..10 s from the first one (about 20 s in) until
       35 s, every 6..6.5 s after; every one that comes past fires once
       but for those that wait out a save's grace (1 in 20);
     - a pilot that flies each gap at 70% and ANSWERS THE TELL - high in
       the gap, over the column, down again - is hit 0.8..1.2 times a
       minute, a quarter of it by the late doubles; the same pilot in
       3-1 THE TABLE, 0.56. One that ignores the stove is hit 3.9 times
       a minute, nearly all of it fire: the stove changes how you fly.
       With the stoves taken out the bay is 0.06 - the pans alone are
       the Table's silverware;
     - the fire throws a pan or a power-up 1..2 times a minute, and a
       thrown pan has hit nobody since it was thrown back over his head;
     - thirty pans land on the stone a minute, and one to two power-ups
       are caught.

   Same discipline as every other level file: every pixel is generated
   and baked once in build(), anything laid over something that scrolls
   is a flat Tint or a baked alpha sprite - there is no Dither in this
   file - and nothing turns by ctx.rotate: the pans tumble through
   sixteen baked frames and the watermelon through eight.
------------------------------------------------------------------ */
'use strict';

var Island = (function () {

  /* the house: the Kitchen's shared pigments, and the helpers it
     republishes from the rooms before it */
  var K = Kitchen.P;
  var CEIL = Kitchen.CEIL, FLOOR = Kitchen.FLOOR;
  var wrap = Kitchen.wrap, hash = Kitchen.hash, rowsFill = Kitchen.rowsFill;
  var ringOf = Kitchen.ringOf, glow = Kitchen.glow, blitBelowCeil = Kitchen.blitBelowCeil;
  var ease = Kitchen.ease, rgba = Kitchen.rgba;

  /* The bay's own pigments. PlayScene never reads this table. */
  var P = {
    /* the room at night: the step every far layer takes toward its own
       shade, and the hall's walls past the kitchen's corner */
    evening:        '#6f685d',
    canTrim:        '#a8a49c',
    wallCorner:     '#9a917f',
    hallWall:       '#8c8577',   hallDark: '#3f3a35',   hallDoor: '#a9a294',

    /* THE HOOD's glass canopy (the Table's own values, from the other
       side of the same room) */
    hoodGlass:      '#dde2df',   hoodGlassEdge: '#b4bcb9',
    hoodGlassClear: 'rgba(221,226,223,0.45)',

    /* the things on the back counter, from Counter ref 1, 2, 10, 12 */
    bean:           '#3a2a1c',   gauge: '#e8e2d2',
    display:        '#4f6fe0',   displayRed: '#d8402a',
    wood:           '#a07a48',   woodLit: '#c39a62',  woodDeep: '#6c4f2c',
    bamboo:         '#c9a46b',   bambooDeep: '#94723f',
    oil:            '#c4b03a',   oilDeep: '#8a7a20',
    jarGlass:       '#d6dbd6',
    towel:          '#f1ede4',   towelShade: '#c9c3b6',
    bottleNavy:     '#2b3a5c',   bottleTeal: '#4fa3a5',
    wine:           '#3a2f2a',   wineGlass: '#9fae96', cork: '#9a5a38',
    pothos:         '#6f9a3e',
    toy:            '#d9893a',

    /* THE PANS. Cast iron, brushed steel with a black phenolic handle,
       and a non-stick pan's charcoal - three blacks and a steel, so a
       falling pan is the darkest thing in a pale room */
    iron:           '#2f2d2b',   ironLit: '#4a4744',  ironDeep: '#171615', ironGlint: '#6b6763',
    phenolic:       '#1f1d1c',   phenolicLit: '#3c3936',
    nonstick:       '#3a3a3c',   nonstickRim: '#5d5d60', nonstickDeep: '#232325',

    /* THE HOT SAUCE: a clear squeeze bottle with a white flip cap, the
       sauce a hot red-orange through the plastic - not ketchup */
    hotSauce:       '#d8401e',   hotSauceHi: '#f06a3a', hotSauceDeep: '#8f2410',
    plasticClear:   'rgba(238,230,226,0.40)',
    plasticHi:      '#ffffff',   plasticShade: '#b9aaa6',
    cap:            '#f4f2ee',   capShade: '#c9c5bf',
    label:          '#f1ebdd',   labelEdge: '#c2b9a5',

    /* THE GLUTATHIONE STICK PACK, Gluta ref: teal foil and white print */
    teal:           '#1f7a85',   tealLit: '#3aa3ad',  tealHi: '#a8dde0',  tealDeep: '#145660',
    print:          '#eef7f6',

    /* THE WATERMELON, wet with lime juice */
    flesh:          '#e0404f',   fleshHi: '#f2707a',  fleshDeep: '#b02a3a',
    rind:           '#2f7a35',   rindLit: '#6fb05a',  pith: '#e9f0d6',
    juice:          '#eef7a8',   juiceDrip: '#d7ea7a', seed: '#1c1a1a',

    /* THE GOLD PAN - the game's +5 colour. The body is the DEEP gold,
       because the uppers behind it are pale: the bright gold is the rim */
    craneGold:      '#f2cf6a',   craneDeep: '#c9a23f', craneHi: '#fff3c4', goldDeep: '#8a6a1e',

    /* an extra life glows the same jade in every level */
    lifeJade:       '#5fae9a',   lifePale: '#93d8bd',

    /* the litter, on the stone */
    crumb:          '#6b4a2e',   crumbDeep: '#3a2a1c',
    sauceStain:     '#b8642a',   sauceStainDeep: '#8a4418',
    pepper:         '#2a2420',   pepperLit: '#4a3a30',

    glaze:          '#e6eef2',   canBlue: '#5f8fc4',
    shadeCool:      '#4e4640',
    outline:        K.outline,   void: K.void
  };

  /* the neutral effect colours PlayScene paints its particles from */
  var FX = {
    motes: Kitchen.AIR.motes, motesHi: Kitchen.AIR.motesHi,
    /* plaster dust when a pan lets go of the lid */
    puff: K.plasterMid, puffHi: K.plasterLit,
    /* quartz chips, for the bop */
    ground: K.quartzShade, groundHi: K.quartzHi,
    /* steel glints: the default landing (every drop here carries its own) */
    splat: K.steel, splatHi: K.steelLit,
    hot: '#f0922e', hotMid: '#ffb347', hotHi: '#ffe08a', heat: '#f0922e', heatEdge: '#b84d12',
    glowCore: '255,224,138', glowEdge: '240,146,46'
  };

  /* the heads-up when a hazard arms: the thing, then what to do about it */
  var WARN = {
    drop:  ['▼ PANS ▼', 'THEY LAND WHERE YOU FLY'],
    spike: ['▲ THE STOVE ▲', 'WATCH THE RING THAT GLOWS'],
    late:  ['▲ TWO RINGS ▲', 'GO THROUGH THE GAP HIGH'],
    ceil:  LivingRoom.WARN_CEIL
  };

  /* the thirteen colours a generic cover would use; this bay's COVER
     paints its own, but the table stays honest (the TV and the stands
     read PREVIEW.back) */
  var PREVIEW = {
    back: K.cabinetShade, backAlt: K.cabinet, seam: K.cabinetLine,
    beam: K.enamel, beamDark: K.enamelDeep, beamLight: K.enamelHi,
    ground: K.quartz, groundDark: K.quartzShade, groundHi: K.quartzHi,
    spike: FX.hot, spikeHi: FX.hotHi, air: K.underLight, gloom: K.blackGlass
  };

  var END_MIN = Kitchen.END_MIN;
  var CEIL_KILLS = Kitchen.CEIL_KILLS;

  /* A PAN IS HEAVY: the Table's steel, 213 px in 1.1 s, landing in front
     of the doodad from the tune's 104..200 spawn window. stepDrop owns
     every drop here; the number is published because the contract
     publishes it. */
  var DROP_GRAV = 300;
  /* everything there to be CAUGHT falls slower, the brownie's rule */
  var GIFT_GRAV = 170;

  /* how long a pan lies on the stone: long enough to scroll off */
  var SPLAT_TIME = 2.4;

  /* THE GOLD PAN IS THE ART'S ROLL, the Table's crane's reason: a +5 the
     module did not roll would be drawn as a black pan and dodged. One
     drop in twenty, never two inside six. */
  var GOLD_CHANCE = 0.05, GOLD_GAP = 6;
  var goldGap = 0;

  var BOON_NAME = 'GLUTATHIONE';
  var GOLD_NAME = 'GOLD PAN';

  var T = {};                       /* baked tiles and sprites */

  /* --------------------------------------------------------- the camera */
  var HORIZON = 186, FOCAL = 180, LENS_H = 96;
  function camRow(Hcm, Dcm) { return HORIZON - FOCAL * (Hcm - LENS_H) / Dcm; }

  var WALL_W = 480, WALL_Y = CEIL, WALL_H = 170, WALL_PAR = 0.25;   /* rows 24..193 */
  var EDGE_Y = 194;                 /* the island's far edge             */
  var QUARTZ_H = FLOOR - EDGE_Y;    /* 48: the lane's stone              */
  var BAND_H = VH - FLOOR;          /* 28: the stone under the kill row  */
  var CROWN_Y = 64;                 /* the ceiling meets the back wall   */
  var UP_TOP = 95, UP_BOT = 158;    /* the uppers                        */
  var NOSE_Y = 190;                 /* the back counter's quartz nose    */

  /* --------------------------------------------------------- helpers */

  function rect(c, x, y, w, h, col) {
    if (w <= 0 || h <= 0) return;
    c.fillStyle = col; c.fillRect(x, y, w, h);
  }
  function dot(c, x, y, col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }

  /* a 1px line between two points, Bresenham, for stems and vines */
  function line(c, x0, y0, x1, y1, col) {
    var dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0);
    var sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, err = dx + dy, e2;
    c.fillStyle = col;
    for (;;) {
      c.fillRect(x0, y0, 1, 1);
      if (x0 === x1 && y0 === y1) break;
      e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  /* the house's 1px outline, laid UNDER everything painted so far */
  function ringUnder(t) {
    var ring = ringOf(t, t.w, t.h);
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }
  /* the far layers' outline: the ring at half strength */
  function ringUnderSoft(t, a) {
    var ring = ringOf(t, t.w, t.h);
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.globalAlpha = a || 0.45;
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalAlpha = 1;
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }
  /* A sprite with see-through parts rings its MASK, and only outside it:
     the house ring laid under a translucent pixel would show through it
     as a smudge (the Table's bottle). */
  function ringMask(t, m) {
    var ring = ringOf(m, t.w, t.h);
    ring.ctx.globalCompositeOperation = 'destination-out';
    ring.ctx.drawImage(m.canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }

  /* a pigment between two others, flat, for the per-row ramps: returned
     as hex so it can be handed on to rgba() */
  function mix(a, b, k) {
    var na = parseInt(a.slice(1), 16), nb = parseInt(b.slice(1), 16);
    var r = Math.round((na >> 16 & 255) + ((nb >> 16 & 255) - (na >> 16 & 255)) * k);
    var g = Math.round((na >> 8 & 255) + ((nb >> 8 & 255) - (na >> 8 & 255)) * k);
    var bl = Math.round((na & 255) + ((nb & 255) - (na & 255)) * k);
    return '#' + ((1 << 24) | (r << 16) | (g << 8) | bl).toString(16).slice(1);
  }

  /* lay a tint over the PAINTED pixels of a canvas only */
  function tintAtop(t, col, strength) {
    t.ctx.globalCompositeOperation = 'source-atop';
    Tint.rect(t.ctx, 0, 0, t.w, t.h, col, strength);
    t.ctx.globalCompositeOperation = 'source-over';
  }

  /* a 1px ellipse outline, for the cooktop's rings: every pixel the
     curve passes through, walked by angle finely enough to leave no gap */
  function ellipse(c, cx, cy, rx, ry, col) {
    c.fillStyle = col;
    var n = Math.ceil((rx + ry) * 16), lx = -999, ly = -999;
    for (var i = 0; i <= n; i++) {
      var a = i / n * TAU;
      var x = Math.round(cx + Math.cos(a) * rx), y = Math.round(cy + Math.sin(a) * ry);
      if (x === lx && y === ly) continue;
      c.fillRect(x, y, 1, 1); lx = x; ly = y;
    }
  }
  /* and filled, for the glow inside a ring */
  function ellipseFill(c, cx, cy, rx, ry, col) {
    c.fillStyle = col;
    for (var y = -Math.floor(ry); y <= Math.floor(ry); y++) {
      var hw = Math.floor(rx * Math.sqrt(Math.max(0, 1 - (y * y) / (ry * ry + 0.25))));
      c.fillRect(Math.round(cx) - hw, Math.round(cy) + y, hw * 2 + 1, 1);
    }
  }

  /* a soft round light, baked once and blitted at any alpha: light on a
     surface, the only kind this file lets travel across the scroll */
  function bakeLight(w, h, col, peak) {
    var t = makeCanvas(w, h);
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var dx = (x + 0.5 - w / 2) / (w / 2), dy = (y + 0.5 - h / 2) / (h / 2);
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1) continue;
        t.ctx.fillStyle = rgba(col, peak * (1 - ease(d)));
        t.ctx.fillRect(x, y, 1, 1);
      }
    }
    return t;
  }

  /* ===================================================== THE BACK WALL

     T.wall: the ceiling plane, the back wall and the back counter with
     everything standing on it, 480x170 at 0.25, drawn at y 24. Local
     row = screen row - 24; every number below is a SCREEN row and the
     painters subtract. Left to right, as the photographs have it:
        0..58     the corner: the ice-cream maker, the panini press and
                  the wine bottle (Counter ref 12)
        60..116   the little window, two shutter panels, the monstera
                  in its white pot under it (Island ref 1, 3)
        116..128  three straight open shelves
        128..220  THE FOUR GLASS-FRONT UPPERS, two pairs; under them the
                  Breville and its grinder, the Instant Pot, the air fryer
        220..246  three curved open shelves, the pothos; under them the
                  knife block, the two oil jars, the crock, the towels
        250..358  the big window, four panels; the sink's things under it
        358..402  the wall to the corner: the spray bottle, the little
                  shelf with the dark bottle on it
        402..480  the corner into the hall, and its doorway
     A 38 cm door is 23 px here; count them. */
  var WY = function (row) { return row - WALL_Y; };

  /* a recessed can in the ceiling plane, seen at a glancing angle: its
     trim ring, the lit disc, and the pool it throws round itself */
  function ceilingCan(c, x, row, size) {
    var y = WY(row), hr = size * 4 + 6, i, j;
    for (j = -hr; j <= hr; j++) {
      for (i = -hr * 2; i <= hr * 2; i++) {
        var d = Math.sqrt((i / 2) * (i / 2) + j * j) / hr;
        if (d >= 1) continue;
        c.fillStyle = rgba(K.plasterLit, 0.55 * (1 - ease(d)));
        c.fillRect(x + i, y + j, 1, 1);
      }
    }
    var w = size * 3;
    rowsFill(c, [[1, w + 2], [0, w + 4], [1, w + 2]], x - Math.floor(w / 2) - 2, y - 1, P.canTrim);
  }
  /* the discs go on AFTER the evening's step back, so they stay lamps */
  function ceilingCanDisc(c, x, row, size) {
    var y = WY(row), w = size * 3;
    rect(c, x - Math.floor(w / 2), y, w, 1, K.lampCore);
  }

  /* ONE PLANTATION SHUTTER PANEL, at night: the stiles and rails, the
     louvres on a 5px pitch - the lit nose, the face, its underside and
     two rows of the night between - and a divider rail across the middle
     (Island ref 1's big window has its louvres in two banks) */
  function shutterPanel(c, x, row, w, h, divider) {
    var y = WY(row), ly, mid = divider ? y + Math.round(h * 0.47) : -99;
    rect(c, x, y, w, h, K.shutter);
    for (ly = y + 3; ly + 5 <= y + h - 3; ly += 5) {
      if (divider && ly + 5 > mid - 1 && ly < mid + 4) continue;
      rect(c, x + 2, ly, w - 4, 1, K.shutter);
      rect(c, x + 2, ly + 1, w - 4, 1, K.shutterShade);
      rect(c, x + 2, ly + 2, w - 4, 2, K.shutterNight);
      rect(c, x + 2, ly + 4, w - 4, 1, K.shutterDeep);
    }
    if (divider) { rect(c, x + 1, mid, w - 2, 2, K.shutter); rect(c, x + 1, mid + 2, w - 2, 1, K.shutterShade); }
    rect(c, x, y, 1, h, K.shutterShade);
    rect(c, x + w - 1, y, 1, h, K.shutterDeep);
    rect(c, x, y + h - 1, w, 1, K.shutterShade);
  }
  /* the window: its white casing, a sill, and the panels inside it */
  function shutterWindow(c, x, row, panels, pw, h, divider) {
    var w = panels * pw, y = WY(row);
    rect(c, x - 2, y - 2, w + 4, h + 4, K.cabinet);
    rect(c, x - 2, y - 2, w + 4, 1, K.cabinetLit);
    rect(c, x - 3, y + h + 1, w + 6, 1, K.cabinetLit);
    rect(c, x - 3, y + h + 2, w + 6, 1, K.cabinetShade);
    for (var i = 0; i < panels; i++) shutterPanel(c, x + i * pw, row, pw, h, divider);
  }

  /* THE BACKSPLASH, Counter ref 7 and 10: long thin strips of pearl
     glass, white marble and brushed silver, in rows, with a grey grout
     between - a linear mosaic, not a brick */
  function splash(c, x0, x1, row0, row1, seed) {
    var y0 = WY(row0), y1 = WY(row1), y, x;
    rect(c, x0, y0, x1 - x0, y1 - y0, K.splashGrout);
    var r = mulberry32(seed);
    for (y = y0; y < y1; y += 2) {
      x = x0 - Math.floor(r() * 9);
      while (x < x1) {
        var len = 4 + Math.floor(r() * 9), pick = r();
        var col = pick < 0.34 ? K.splashPearl : (pick < 0.62 ? K.splashMarble : (pick < 0.84 ? K.splashGlass : K.splashSilver));
        if (pick > 0.94) col = K.splashWarm;
        var bx = Math.max(x0, x), bw = Math.min(x1, x + len) - bx;
        if (bw > 0) rect(c, bx, y, bw, 1, col);
        if (bw > 2 && r() < 0.15) dot(c, bx + 1, y, K.splashGlint);
        x += len + 1;
      }
    }
  }

  /* A GLASS-FRONT SHAKER DOOR, evening: a 3px frame lit along the top
     and left, the pane dark with the mugs and glasses on two glass
     shelves, one vertical glare, and the long nickel bar on the stile
     that meets its pair */
  function glassDoor(c, x, w, seed, pullRight) {
    var y = WY(UP_TOP), h = UP_BOT - UP_TOP, i, s;
    rect(c, x, y, w, h, K.cabinetShade);
    rect(c, x, y, w, 1, K.cabinet); rect(c, x, y, 1, h, K.cabinet);
    rect(c, x + w - 1, y, 1, h, K.cabinetLine); rect(c, x, y + h - 1, w, 1, K.cabinetDeep);
    var gx = x + 3, gy = y + 3, gw = w - 6, gh = h - 6;
    rect(c, gx - 1, gy - 1, gw + 2, 1, K.cabinetDeep); rect(c, gx - 1, gy - 1, 1, gh + 2, K.cabinetDeep);
    rect(c, gx, gy, gw, gh, K.glassDark);
    var r = mulberry32(seed);
    var shelves = [gy + Math.round(gh * 0.36), gy + Math.round(gh * 0.68), gy + gh];
    for (i = 0; i < shelves.length; i++) {
      s = shelves[i];
      if (i < 2) rect(c, gx, s, gw, 1, K.glassShelf);
      var at = gx + 1 + Math.floor(r() * 2);
      while (at < gx + gw - 3) {
        var k = Math.floor(r() * 3);
        if (k === 0) { rect(c, at, s - 4, 3, 4, K.glassShelf); dot(c, at + 3, s - 3, K.glassShelf); at += 5; }
        else if (k === 1) { rect(c, at, s - 5, 2, 5, '#6c675e'); at += 4; }
        else { rect(c, at, s - 2, 4, 2, '#7a756b'); at += 6; }
      }
    }
    rect(c, gx + 2, gy + 1, 1, gh - 2, K.glassGlare);
    dot(c, gx + 3, gy + 2, K.glassGlare);
    var px = pullRight ? x + w - 3 : x + 2;
    rect(c, px, WY(140), 1, 9, K.pullLit);
    dot(c, px, WY(140) - 1, K.pullShade); dot(c, px, WY(149), K.pullShade);
  }

  /* open shelves: the cabinet's white side, three boards and the wall
     behind; `curved` gives the boards the rounded front of ref 2's */
  function openShelves(c, x, w, curved, seed) {
    var y = WY(UP_TOP), h = UP_BOT - UP_TOP, i;
    rect(c, x, y, w, h, K.wallShade);
    var boards = [112, 128, 144, 156];
    for (i = 0; i < boards.length; i++) {
      var by = WY(boards[i]);
      if (curved) {
        rect(c, x, by, w - 3, 1, K.cabinet); rect(c, x + w - 3, by, 2, 1, K.cabinetShade);
        rect(c, x, by + 1, w - 1, 1, K.cabinetShade); dot(c, x + w - 2, by - 1, K.cabinetShade);
      } else {
        rect(c, x, by, w, 1, K.cabinet); rect(c, x, by + 1, w, 1, K.cabinetShade);
      }
      /* the shade a board throws on the wall under it */
      Tint.rect(c, x, by + 2, w, 2, P.void, 2);
    }
    rect(c, curved ? x : x + w - 1, y, 1, h, K.cabinetShade);
    var r = mulberry32(seed);
    for (i = 0; i < 3; i++) {
      var sy = WY(boards[i]), sx = x + 2 + Math.floor(r() * (w - 8)), pick = Math.floor(r() * 3);
      if (pick === 0) { rect(c, sx, sy - 4, 4, 4, K.cabinetLit); dot(c, sx + 4, sy - 3, K.cabinetLit); }
      else if (pick === 1) { rect(c, sx, sy - 5, 3, 5, P.jarGlass); rect(c, sx, sy - 6, 3, 1, K.steelShade); }
      else { rect(c, sx, sy - 3, 5, 3, K.cabinet); rect(c, sx, sy - 3, 5, 1, K.cabinetLit); }
    }
  }

  /* ---- the machines on the back counter, each at its true size ---- */

  /* the Cuisinart ice-cream maker: a steel box with a black end and the
     clear dome of its lid on top (Counter ref 12) */
  function iceCream(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 13, 25, 13, K.steel);
    rect(c, x, b - 13, 25, 1, K.steelLit);
    rect(c, x + 19, b - 13, 6, 13, K.blackGlass);
    rect(c, x + 2, b - 6, 14, 1, K.steelShade);
    rect(c, x + 5, b - 16, 10, 3, K.cabinetShade);
    rect(c, x + 6, b - 17, 8, 1, K.cabinetShade);
    rect(c, x + 7, b - 16, 2, 1, K.cabinetLit);
    rect(c, x, b - 1, 25, 1, K.blackGlassDeep);
  }
  /* the panini press, closed: the black base and its blue display, the
     steel top plate and the long handle across it */
  function panini(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 6, 21, 6, K.blackGlass);
    rect(c, x, b - 1, 21, 1, K.steelShade);
    rect(c, x + 6, b - 4, 3, 1, P.display);
    dot(c, x + 13, b - 4, K.blackGlassHi); dot(c, x + 16, b - 4, K.blackGlassHi);
    rect(c, x + 1, b - 9, 19, 3, K.steel);
    rect(c, x - 1, b - 10, 23, 1, K.steelLit);
    rect(c, x + 21, b - 10, 1, 3, K.steelShade);
  }
  /* the wine bottle behind the press, clear with a cork */
  function wineBottle(c, x, base, dark) {
    var b = WY(base);
    rect(c, x, b - 11, 3, 11, dark ? P.wine : P.wineGlass);
    rect(c, x + 1, b - 15, 1, 4, dark ? P.wine : P.wineGlass);
    dot(c, x + 1, b - 16, P.cork);
    dot(c, x, b - 10, dark ? K.blackGlassHi : K.cabinetLit);
  }
  /* THE BREVILLE: a steel box with its bean hopper on top, the gauge,
     the group head and the black portafilter handle, the drip tray */
  function espresso(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 22, 22, 22, K.steel);
    rect(c, x, b - 22, 22, 1, K.steelLit); rect(c, x, b - 22, 1, 22, K.steelLit);
    rect(c, x + 20, b - 21, 2, 21, K.steelShade);
    /* the hopper: clear, dark with beans, a black lid */
    rect(c, x + 3, b - 29, 9, 7, P.bean);
    rect(c, x + 3, b - 30, 9, 1, K.blackGlass);
    rect(c, x + 3, b - 29, 1, 7, K.steelShade);
    /* the panel: buttons and the gauge */
    rect(c, x + 2, b - 19, 18, 3, K.steelShade);
    dot(c, x + 4, b - 18, K.steelLit); dot(c, x + 7, b - 18, K.steelLit);
    rect(c, x + 10, b - 19, 3, 3, P.gauge); dot(c, x + 11, b - 18, K.blackGlass);
    dot(c, x + 16, b - 18, K.steelLit);
    /* the group head and the portafilter */
    rect(c, x + 8, b - 14, 6, 3, K.steelDeep);
    rect(c, x + 2, b - 12, 7, 2, K.blackGlass);
    /* the steam wand */
    rect(c, x + 19, b - 14, 1, 6, K.steelLit);
    /* the drip tray */
    rect(c, x + 2, b - 4, 18, 3, K.steelDeep);
    rect(c, x + 2, b - 4, 18, 1, K.steelShade);
  }
  function grinder(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 16, 8, 16, K.blackGlass);
    rect(c, x, b - 16, 8, 1, K.blackGlassLit);
    rect(c, x + 1, b - 13, 3, 3, K.blackGlassHi); dot(c, x + 2, b - 12, K.blackGlass);
    rect(c, x + 2, b - 5, 4, 3, K.blackGlassLit);
  }
  /* the knock box and the steel milk jug beside the grinder */
  function baristaBits(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 4, 4, 4, K.blackGlass);
    rect(c, x + 5, b - 5, 3, 5, K.steelLit); dot(c, x + 7, b - 4, K.steelShade);
  }
  /* THE INSTANT POT: the black lid with its handle arc and the steam
     valve, the steel body, the black control panel, the black base */
  function instantPot(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 17, 19, 15, K.steel);
    rect(c, x + 1, b - 17, 2, 15, K.steelLit);
    rect(c, x + 15, b - 17, 4, 15, K.steelShade);
    rect(c, x - 1, b - 21, 21, 4, K.blackGlass);
    rect(c, x, b - 22, 19, 1, K.blackGlassLit);
    rect(c, x + 6, b - 24, 7, 1, K.blackGlass); dot(c, x + 5, b - 23, K.blackGlass); dot(c, x + 13, b - 23, K.blackGlass);
    dot(c, x + 3, b - 23, K.blackGlassHi);
    rect(c, x + 6, b - 15, 7, 6, K.blackGlass);
    rect(c, x + 7, b - 14, 5, 2, P.displayRed);
    rect(c, x + 7, b - 11, 5, 1, K.blackGlassHi);
    rect(c, x, b - 2, 19, 2, K.blackGlass);
  }
  /* THE AIR FRYER, the two-basket Vortex: the black glass top catching
     the room, the steel band, the black front and the two handles */
  function airFryer(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 19, 23, 6, K.blackGlass);
    rect(c, x + 1, b - 19, 21, 1, K.blackGlassHi);
    rect(c, x + 3, b - 18, 9, 1, K.blackGlassLit);
    dot(c, x + 11, b - 20, K.steelLit);
    rect(c, x, b - 13, 23, 3, K.steel);
    rect(c, x, b - 13, 23, 1, K.steelLit);
    rect(c, x, b - 10, 23, 10, K.blackGlass);
    rect(c, x + 11, b - 10, 1, 9, K.blackGlassDeep);
    rect(c, x + 4, b - 9, 2, 8, K.steelLit); rect(c, x + 6, b - 9, 1, 8, K.steelShade);
    rect(c, x + 16, b - 9, 2, 8, K.steelLit); rect(c, x + 18, b - 9, 1, 8, K.steelShade);
  }
  /* the Calphalon knife block, light wood, three black handles */
  function knifeBlock(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 11, 7, 11, P.wood);
    rect(c, x, b - 11, 7, 1, P.woodLit); rect(c, x + 6, b - 10, 1, 10, P.woodDeep);
    rect(c, x + 1, b - 14, 1, 3, K.blackGlass); rect(c, x + 3, b - 15, 1, 4, K.blackGlass); rect(c, x + 5, b - 13, 1, 2, K.blackGlass);
  }
  function oilJar(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 7, 4, 7, P.jarGlass);
    rect(c, x, b - 5, 4, 5, P.oil); rect(c, x + 3, b - 5, 1, 5, P.oilDeep);
    rect(c, x, b - 8, 4, 1, K.steelShade);
  }
  /* the crock with the spatulas in it, and the paper towels on their stand */
  function crock(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 7, 5, 7, K.blackGlassLit);
    rect(c, x + 1, b - 12, 1, 5, K.blackGlass); rect(c, x + 3, b - 13, 1, 6, P.woodLit);
    rect(c, x, b - 14, 3, 2, K.blackGlass);
  }
  function towels(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 15, 6, 14, P.towel);
    rect(c, x + 4, b - 15, 2, 14, P.towelShade);
    rect(c, x + 2, b - 17, 1, 2, K.steel);
    rect(c, x - 1, b - 1, 8, 1, K.steelShade);
  }
  /* under the big window, ref 1 left to right */
  function sinkThings(c) {
    var b = WY(NOSE_Y), i;
    /* a glass */
    rect(c, 279, b - 7, 4, 7, P.jarGlass); rect(c, 279, b - 7, 1, 7, K.cabinetLit);
    rect(c, 279, b - 1, 4, 1, K.steelShade);
    /* the soap pump */
    rect(c, 289, b - 8, 4, 8, K.cabinetLit); rect(c, 292, b - 8, 1, 8, K.cabinetShade);
    rect(c, 290, b - 10, 2, 2, K.steel); rect(c, 290, b - 11, 3, 1, K.steel);
    /* THE GOOSENECK: a 2px stem rising out of the counter, arching over
       to the right and its spout pointing down into the sink */
    rect(c, 301, b - 24, 2, 24, K.steel); rect(c, 301, b - 24, 1, 24, K.steelLit);
    rect(c, 302, b - 27, 3, 2, K.steel); rect(c, 304, b - 28, 4, 2, K.steelLit);
    rect(c, 308, b - 27, 2, 2, K.steel); rect(c, 309, b - 25, 2, 4, K.steel);
    rect(c, 309, b - 21, 2, 1, K.steelShade);
    rect(c, 300, b - 1, 4, 1, K.steelShade);
    /* the teal bottle and the navy one */
    rect(c, 313, b - 11, 4, 11, P.bottleTeal); rect(c, 313, b - 11, 1, 11, K.splashGlint);
    rect(c, 314, b - 13, 2, 2, K.cabinetLit);
    rect(c, 321, b - 15, 5, 15, P.bottleNavy); rect(c, 321, b - 15, 1, 15, P.canBlue);
    rect(c, 321, b - 17, 5, 2, K.blackGlass);
    /* the filter tap, a thin hook behind the rack */
    rect(c, 345, b - 19, 1, 19, K.steelLit);
    rect(c, 345, b - 20, 4, 1, K.steelLit); rect(c, 348, b - 19, 1, 3, K.steel);
    /* THE BAMBOO DISH RACK, two tiers of slats */
    for (i = 0; i < 31; i += 3) rect(c, 330 + i, b - 12, 1, 12, P.bamboo);
    rect(c, 330, b - 12, 31, 1, P.bamboo); rect(c, 330, b - 6, 31, 1, P.bamboo);
    rect(c, 330, b - 1, 31, 1, P.bambooDeep);
    rect(c, 330, b - 12, 1, 12, P.bambooDeep); rect(c, 360, b - 12, 1, 12, P.bambooDeep);
    rect(c, 333, b - 10, 8, 3, K.cabinetLit); rect(c, 350, b - 5, 6, 4, P.canBlue);
  }
  /* the spray bottle at the right of ref 1: white, a teal trigger */
  function sprayBottle(c, x) {
    var b = WY(NOSE_Y);
    rect(c, x, b - 10, 5, 10, K.cabinetLit); rect(c, x + 4, b - 10, 1, 10, K.cabinetShade);
    rect(c, x + 1, b - 13, 3, 3, P.bottleTeal); rect(c, x + 4, b - 13, 2, 1, P.bottleTeal);
    dot(c, x + 1, b - 12, K.splashGlint);
  }
  /* THE MONSTERA in its white pot, under the little window (Island ref
     1 and 3): five big split leaves on long stems fanning out of the pot,
     each a broad heart with its slits cut from the edge in toward the
     midrib - the slits are what make it a monstera and not a shrub, so
     they are cut right through and the splash shows in them. */
  function monstera(c) {
    var b = WY(NOSE_Y), i;
    rect(c, 64, b - 11, 15, 11, K.cabinetLit);
    rect(c, 75, b - 11, 4, 11, K.cabinetShade);
    rect(c, 63, b - 12, 17, 1, K.cabinet);
    rect(c, 64, b - 1, 15, 1, K.cabinetShade);
    /* [x, row, flip, tilt]: the leaf's top-left, which way it faces, and
       whether it droops */
    var leaves = [[44, 160, 1, 1], [52, 141, 1, 0], [70, 133, 0, 0], [86, 146, 0, 0], [92, 165, 0, 1]];
    for (i = 0; i < leaves.length; i++) {
      var L = leaves[i], sx = L[2] ? L[0] + 13 : L[0] + 4;
      line(c, 70 + (i % 3) * 2, b - 12, sx, WY(L[1]) + 6, K.leafDeep);
    }
    for (i = 0; i < leaves.length; i++) monsteraLeaf(c, leaves[i][0], WY(leaves[i][1]), !!leaves[i][2], !!leaves[i][3]);
  }
  /* one leaf, about 19x13: a broad heart about a midrib that runs from
     the stem notch to the tip, the upper half lit; and THE SLITS, every
     fourth column cut from both edges most of the way in to the rib, so
     the leaf is a broad notched heart - which at this size is the whole
     of what says monstera. `droop` tips the rib down toward the tip. */
  function monsteraLeaf(c, x, y, flip, droop) {
    var W = 19, H = 13, i, j;
    for (i = 0; i < W; i++) {
      var u = (i + 0.5) / W;                      /* 0 at the stem, 1 at the tip */
      /* the heart's half-height along the rib: full near the stem lobes,
         tapering to the point */
      var half = u < 0.12 ? 3 + u * 25 : 6.2 * Math.sqrt(Math.max(0, 1 - Math.pow((u - 0.12) / 0.88, 1.6)));
      var rib = 6 + (droop ? Math.round(u * u * 4) : -Math.round(u * 1.5));
      for (j = 0; j < H + 4; j++) {
        var d = j - rib;
        if (Math.abs(d) > half) continue;
        /* the stem notch between the two lobes */
        if (u < 0.1 && Math.abs(d) < 1.5) continue;
        var slit = (i % 4 === 2) && i > 2 && i < W - 3 && Math.abs(d) > half * 0.42;
        if (slit) continue;
        var col = d < 0 ? K.leafLit : K.leaf;
        if (d === 0) col = K.leafDeep;
        if (d > half - 1.5) col = K.leafDeep;
        if (d < 0 && d < -half + 1) col = K.leaf;
        dot(c, flip ? x + W - 1 - i : x + i, y + j, col);
      }
    }
  }

  function bakeWall() {
    var t = makeCanvas(WALL_W, WALL_H), c = t.ctx, x, y, i, r;

    /* 1. THE CEILING PLANE, rows 24..63: the plaster two metres off at
       the lid, darker, easing toward the plaster by the wall that the
       cans light. A faint tooth, so it is plaster and not a gradient. */
    for (y = 0; y < CROWN_Y - WALL_Y; y++) {
      rect(c, 0, y, WALL_W, 1, mix(K.plasterDim, K.plasterMid, ease(y / (CROWN_Y - WALL_Y - 1))));
    }
    r = mulberry32(4101);
    for (i = 0; i < 200; i++) {
      x = Math.floor(r() * WALL_W); y = Math.floor(r() * (CROWN_Y - WALL_Y - 1));
      dot(c, x, y, rgba(r() < 0.5 ? K.plasterDim : K.plasterLit, 0.35));
    }
    /* three cans along the run, one every 2.5 m (Island ref 3) */
    ceilingCan(c, 52, 40, 2); ceilingCan(c, 212, 40, 2); ceilingCan(c, 372, 40, 2);

    /* 2. THE BACK WALL from the crown down, in the evening's shade */
    rect(c, 0, WY(CROWN_Y), WALL_W, WALL_H - WY(CROWN_Y), K.wallShade);
    /* the hall past the corner: its ceiling runs on, so its crown is
       lower (farther), and its wall is a step darker */
    for (y = WY(CROWN_Y); y < WY(75); y++) rect(c, 402, y, 78, 1, mix(K.plasterMid, K.plasterDim, (y - WY(CROWN_Y)) / 14));
    rect(c, 402, WY(75), 78, 1, K.crown); rect(c, 402, WY(76), 78, 1, K.crownShade);
    rect(c, 402, WY(77), 78, WALL_H - WY(77), P.hallWall);
    /* the crown over the kitchen's wall */
    rect(c, 0, WY(CROWN_Y), 402, 1, K.crown);
    rect(c, 0, WY(CROWN_Y) + 1, 402, 1, K.plasterLit);
    rect(c, 0, WY(CROWN_Y) + 2, 402, 1, K.crownShade);
    /* the two corners: the counter's end at the left (the side wall seen
       edge-on), and the kitchen wall turning into the hall at 402 */
    rect(c, 0, WY(CROWN_Y), 1, WALL_H - WY(CROWN_Y), P.wallCorner);
    rect(c, 401, WY(CROWN_Y), 2, WALL_H - WY(CROWN_Y), P.wallCorner);

    /* 3. THE SPLASH along the whole counter, behind everything on it */
    splash(c, 1, 401, UP_BOT, NOSE_Y, 7711);

    /* 4. THE WINDOWS: the little one (two panels) and the big one (four,
       in two banks), white shutters and the night between the louvres */
    shutterWindow(c, 62, 114, 2, 26, 52, false);
    shutterWindow(c, 252, 107, 4, 26, 67, true);

    /* 5. THE UPPERS and their crown, with the open shelves at both ends */
    rect(c, 114, WY(90), 136, 3, K.cabinet);
    rect(c, 114, WY(90), 136, 1, K.cabinetLit);
    rect(c, 115, WY(93), 134, 2, K.cabinetShade);
    openShelves(c, 116, 12, false, 3101);
    for (i = 0; i < 4; i++) glassDoor(c, 128 + i * 23, 23, 3201 + i, i % 2 === 0);
    openShelves(c, 220, 27, true, 3301);
    /* the pothos trailing off the curved shelves (Counter ref 2) */
    var vine = [[236, 112], [238, 118], [237, 124], [239, 130], [238, 137], [240, 143], [239, 149]];
    for (i = 0; i < vine.length - 1; i++) line(c, vine[i][0], WY(vine[i][1]), vine[i + 1][0], WY(vine[i + 1][1]), K.leafDeep);
    for (i = 1; i < vine.length; i++) {
      rowsFill(c, [[1, 2], [0, 3], [1, 1]], vine[i][0] + (i % 2 ? 1 : -3), WY(vine[i][1]) - 1, P.pothos);
    }
    rect(c, 226, WY(124), 4, 4, P.toy); dot(c, 227, WY(123), K.leafLit);
    /* the uppers' underside: the cabinet's bottom rail and the strip of
       light under it, lit */
    rect(c, 114, WY(UP_BOT), 136, 1, K.cabinetDeep);

    /* 6. THE BACK COUNTER's nose and the drawer rail under it - all of the
       counter this lens can see over the island's far edge */
    rect(c, 1, WY(NOSE_Y), 400, 1, K.quartzHi);
    rect(c, 1, WY(NOSE_Y) + 1, 400, 1, K.quartz);
    rect(c, 1, WY(NOSE_Y) + 2, 400, 1, K.cabinetShade);
    rect(c, 1, WY(NOSE_Y) + 3, 400, 1, K.cabinetDeep);
    for (x = 20; x < 400; x += 46) rect(c, x, WY(NOSE_Y) + 3, 6, 1, K.pull);

    /* 7. WHAT STANDS ON IT, left to right */
    iceCream(c, 4); panini(c, 32); wineBottle(c, 55, NOSE_Y, false);
    monstera(c);
    espresso(c, 131); grinder(c, 155); baristaBits(c, 164);
    instantPot(c, 173); airFryer(c, 195);
    knifeBlock(c, 222); oilJar(c, 231); oilJar(c, 236); crock(c, 241);
    sinkThings(c);
    towels(c, 262);
    sprayBottle(c, 366);
    /* the little shelf on the wall and the dark bottle on it (THE TABLE's
       view of this wall has them right of the big window) */
    rect(c, 378, WY(141), 17, 1, K.cabinet); rect(c, 378, WY(142), 17, 1, K.cabinetShade);
    wineBottle(c, 385, 141, true);

    /* 8. THE HALL past the corner: the doorway, its white casing, the
       dim hall and the white door at the end of it (THE TABLE has the
       coats on a rail along there too; at this distance and this light
       they were three dark posts, and are left in the hall) */
    rect(c, 410, WY(112), 38, WALL_H - WY(112), K.cabinet);
    rect(c, 413, WY(115), 32, WALL_H - WY(115), P.hallDark);
    rect(c, 421, WY(124), 16, WALL_H - WY(124), P.hallDoor);
    rect(c, 423, WY(128), 5, 18, K.cabinetShade); rect(c, 430, WY(128), 5, 18, K.cabinetShade);
    dot(c, 434, WY(160), K.pull);

    /* THE EVENING'S STEP BACK: the whole far kitchen comes three
       sixteenths down toward its own shade, so the stone, the enamel and
       the fire are the brightest, reddest and hottest things in frame */
    Tint.rect(c, 0, 0, WALL_W, WALL_H, P.evening, 3);

    /* AND WHAT STAYS LIT through it: the cans' discs, and the strip of
       light under the uppers on the splash and the machines' tops */
    ceilingCanDisc(c, 52, 40, 2); ceilingCanDisc(c, 212, 40, 2); ceilingCanDisc(c, 372, 40, 2);
    for (y = 0; y < 9; y++) {
      c.fillStyle = rgba(K.underLight, 0.30 * (1 - y / 9));
      c.fillRect(114, WY(UP_BOT + 1) + y, 136, 1);
    }
    rect(c, 116, WY(UP_BOT) - 1, 132, 1, K.underLight);
    return t;
  }

  /* ======================================================= THE QUARTZ

     The island's top, from its far edge (row 194, 1.2 m off) to the
     bottom of the screen: ONE painting, 480x76, cut at the kill row
     into the lane (T.quartz, drawn at 194 by the backdrop) and the band
     (T.band, drawn at 242 by drawFloor), so every vein runs through the
     cut without a join. Warm white with soft grey veins that branch and
     fade (Island ref 4): a vein running across the island is a long low
     streak, foreshortened - it climbs a row in forty pixels at the far
     edge and one in four at the bottom of the screen. The band is a flat
     step darker, so the kill row is a value step and not a line. */
  function quartzColour(y) {
    if (y === EDGE_Y) return K.quartzHi;                  /* the far edge catching the pendant */
    if (y >= FLOOR) return mix(mix(K.quartzMid, K.quartzShade, 0.45), mix(K.quartzShade, K.quartzDeep, 0.2), ease((y - FLOOR) / BAND_H));
    var k = (y - EDGE_Y - 1) / (FLOOR - EDGE_Y - 2);
    /* lit by the pendants overhead: brightest at the far edge, easing a
       step down toward the lens - a white stone, so the step is small */
    return mix(mix(K.quartzHi, K.quartz, 0.5), mix(K.quartz, K.quartzMid, 0.55), ease(k));
  }

  function bakeQuartz() {
    var Hh = QUARTZ_H + BAND_H, t = makeCanvas(WALL_W, Hh), c = t.ctx, y;
    /* the house's marble (Kitchen.paintMarble): two bold veins across a
       tile and the crackle between them, lying down hard toward the far
       edge, with the far edge's lit row and the kill row kept plain */
    Kitchen.paintMarble(c, WALL_W, Hh, {
      seed: 9301, aTop: 0.10, aBot: 0.55, veins: 15, bold: 2, clouds: 12, far: 0.4,
      base: function (y) { return quartzColour(EDGE_Y + y); },
      plain: function (y) { return y === 0 || y === QUARTZ_H; }
    });
    /* the very bottom of the frame, right under the lens: a shade softer */
    for (y = Hh - 6; y < Hh; y++) {
      c.fillStyle = rgba(K.quartzDeep, 0.05 * (y - (Hh - 7)));
      c.fillRect(0, y, WALL_W, 1);
    }

    var lane = makeCanvas(WALL_W, QUARTZ_H), band = makeCanvas(WALL_W, BAND_H);
    lane.ctx.drawImage(t.canvas, 0, 0);
    band.ctx.drawImage(t.canvas, 0, -QUARTZ_H);
    return { lane: lane, band: band };
  }

  /* ===================================================== THE COOKTOP

     The island's own cooktop - the GE Profile's black glass set flush into
     the quartz (Island ref 4 and 6) - drawn IN THE PLAY PLANE, where the
     pots stand and at their scale, with the kill row running through it.

     WHY HERE AND NOT WHERE THE LENS PUTS IT. Read off the camera, the
     glass is 50..103 cm out, rows 195..204 at the island's far edge, 274
     px wide, with a 57 px Dutch oven on it. Drawn there (the first cut),
     the fire stood on the kill row 40 px in front of the burner it was
     supposed to come out of, and the pot on the cooktop was 1.7 times the
     size of the pots in the stacks standing nearer the lens: the far thing
     bigger than the near thing, and the fire somewhere the stove was not.
     The fire is a play-plane thing - it kills, so it stands on the kill
     row - and so the stove it comes out of is a play-plane thing too: the
     76 cm of glass at the pots' 1.42 px a cm (a 24 cm pot is the 34 px
     column) is 108 px across its far edge and 124 across its near one,
     and its 53 cm of depth, seen from five centimetres over the stone, is
     sixteen rows - four of them a sliver behind the kill row, twelve in
     the near band in front of it. The far quartz behind it stays clear
     stone. The column stands on the kill row as it always did, and now
     that is the cooktop's centre ring, so the fire and the burner are
     one object.

     NO POT ON IT. The red Dutch oven sits on this cooktop in every
     photograph. At play scale a pot standing in the lane that did not
     kill would be read as a pillar's pot; at the far scale it was the size
     fault. The pots are in the bay already: they are the pillars.

     Drawn in two passes because the band is painted after the spikes: the
     sliver behind the kill row with the backdrop, and the twelve rows in
     the band by drawFloor, both off the same obstacle list and the same
     ob.x, so the two halves cannot come apart. Never boxed: the only
     thing in this stove that kills is the fire. */
  var COOK_HALF = 62;               /* the obstacle's half-width: the glass's near edge */
  var COOK_Y = FLOOR - 5;           /* 237: the stone's seam behind the far edge        */
  var COOK_H = 18;                  /* rows 237..254: seam, bevel, glass, near edge, seam */
  var COOK_X = 64;                  /* the bake's centre column                          */
  var COOK_SPLIT = FLOOR - COOK_Y;  /* 5: sprite rows above the kill row                 */
  /* the four rings as [dx, row, rx, ry]: the large left, the medium at the
     centre back, the small at the centre front and the large right - very
     flat, seen from the stone's own height (ref 6, from the other side,
     mirrored). The column comes out of the centre pair, and a double's
     second out of the large left. */
  var RINGS = [[-30, 245, 14, 3], [0, 240, 9, 1], [0, 246, 12, 2], [30, 245, 14, 3]];
  var COL_RINGS = [[1, 2], [0]];    /* which rings each column comes out of */
  var DBL_DX = -30;                 /* the left large ring, off the centre */
  function cookHalf(row) { return Math.round(52 + (row - (COOK_Y + 1)) * 10 / 15); }

  function bakeCooktop() {
    var t = makeCanvas(COOK_X * 2 + 2, COOK_H), c = t.ctx, i, row;
    for (row = COOK_Y + 1; row <= COOK_Y + 16; row++) {
      var hw = cookHalf(row), y = row - COOK_Y;
      rect(c, COOK_X - hw, y, hw * 2, 1, K.blackGlass);
    }
    /* the stone's seams round it, the far bevel catching the pendant, the
       near edge falling away */
    rect(c, COOK_X - cookHalf(COOK_Y + 1) - 1, 0, cookHalf(COOK_Y + 1) * 2 + 2, 1, K.quartzShade);
    rect(c, COOK_X - cookHalf(COOK_Y + 1), 1, cookHalf(COOK_Y + 1) * 2, 1, K.blackGlassLit);
    rect(c, COOK_X - 62, 16, 124, 1, K.blackGlassDeep);
    rect(c, COOK_X - 63, 17, 126, 1, K.quartzShade);
    for (row = COOK_Y + 1; row <= COOK_Y + 16; row++) {
      var h2 = cookHalf(row), yy = row - COOK_Y;
      dot(c, COOK_X - h2, yy, K.blackGlassDeep); dot(c, COOK_X + h2 - 1, yy, K.blackGlassDeep);
    }
    /* THE SHEEN: the pendant reflected in the glass, a long soft streak
       left of centre, and the under-cabinet strip across the far rows */
    rect(c, COOK_X - 44, 3, 52, 1, K.blackGlassLit);
    rect(c, COOK_X - 38, 4, 40, 1, K.blackGlassLit);
    rect(c, COOK_X - 30, 3, 14, 1, K.blackGlassHi);
    rect(c, COOK_X + 14, 2, 30, 1, rgba(K.underLight, 0.18));
    rect(c, COOK_X - 50, 12, 18, 1, K.blackGlassLit);
    /* the rings, and the touch controls across the near middle - seven
       dots - with the little logo at the near right (ref 6) */
    for (i = 0; i < RINGS.length; i++) ellipse(c, COOK_X + RINGS[i][0], RINGS[i][1] - COOK_Y, RINGS[i][2], RINGS[i][3], K.blackGlassHi);
    for (i = -3; i <= 3; i++) dot(c, COOK_X + i * 6, 14, K.blackGlassHi);
    rect(c, COOK_X + 46, 14, 3, 1, K.blackGlassLit);
    return t;
  }

  /* NO HOOD OVER IT. The real canopy hangs over this cooktop, and from
     a lens on the stone its underside would fill the top of the frame -
     rows 24..70, the steel body and its lamps going away to the far rim
     of the glass. It was drawn that way, faint, and at 480x270 it read
     as a grey ghost in the top lane between two chimneys: not clearly
     the room, and in exactly the place a player looks for the next thing
     that kills him near the lid. The hood is in the bay already - the
     chimneys hanging from the lid ARE it, canopy and all - so the
     scenery copy was left out rather than kept as a shape to doubt. */

  /* ===================================================== THE DUTCH OVENS

     A standing pillar is a stack of red enamel Dutch ovens on the
     quartz: pot, lid and knob, pot, lid and knob, and on top the biggest
     lid of all (the cap). Every pot in it is WHOLE - a stack that ended
     in half a pot under its lid would be a stack nobody built - so each
     pillar works out its own stack when it is made: as many lidded pots
     as fit, each a few rows deeper or shallower (a 5-qt, a 7-qt), and
     the top pot as deep as what is left, its rim under the cap's lid.

     A lidded pot, top to bottom, 34 wide: the steel knob (3 rows), the
     lid's dome (5), the lid's lip (1), the pot's rim (1), the body (b,
     8..16), the foot (2), and the house ring under the lot, shared with
     the pot below. The body is 30 wide with the loop handles in the
     outer two columns either side: the box is the Coop's 34, and a
     graze on a pot's wall is forgiven, the Table's mug rule. Lit from
     the upper left: a band of the pendant's reflection down the left
     third, the enamel easing from scarlet to oxblood toward the foot. */
  var B_MIN = 8, B_MAX = 16;
  var DOME = [20, 26, 30, 30, 30];

  function paintPotBody(c, y0, b, jx) {
    var y, cols;
    for (y = 0; y < b; y++) {
      var k = y / Math.max(1, b - 1), row = y0 + y;
      /* the band of the body: left edge, the lit stripe, the face, the
         turn, the shade */
      var face = mix(K.enamel, K.enamelMid, ease(k) * 0.8);
      rect(c, 2 + jx, row, 30, 1, face);
      rect(c, 2 + jx, row, 2, 1, K.enamelMid);
      rect(c, 4 + jx, row, 4, 1, mix(K.enamel, face, 0.5));
      rect(c, 9 + jx, row, 5, 1, k < 0.75 ? K.enamelHi : mix(K.enamelHi, K.enamel, 0.6));
      rect(c, 25 + jx, row, 3, 1, mix(face, K.enamelMid, 0.6));
      rect(c, 28 + jx, row, 2, 1, K.enamelMid);
      rect(c, 30 + jx, row, 2, 1, K.enamelDeep);
      /* the loop handles, two rows under the rim */
      if (y >= 1 && y <= 4) {
        cols = y === 1 ? K.enamelMid : (y === 4 ? K.enamelDeep : K.enamel);
        rect(c, 0 + jx, row, 2, 1, cols); rect(c, 32 + jx, row, 2, 1, y === 1 ? K.enamelMid : K.enamelDeep);
        if (y === 2 || y === 3) { dot(c, 1 + jx, row, P.outline); dot(c, 32 + jx, row, P.outline); }
      }
    }
  }
  function paintFoot(c, y0, jx) {
    rect(c, 2 + jx, y0, 30, 1, K.enamelDeep);
    rect(c, 3 + jx, y0 + 1, 28, 1, '#4a100e');
  }
  /* a lidded pot of body depth b, variant v: 0 plain, 1 the lid sitting
     ajar a pixel, 2 the knob missing from its lid */
  function bakeUnit(v, b) {
    var A = 12 + b, t = makeCanvas(34, A + 2), c = t.ctx, i, y = 1;
    var lj = v === 1 ? 1 : 0;
    if (v !== 2) {
      rect(c, 15 + lj, y, 4, 1, K.steelLit);
      rect(c, 14 + lj, y + 1, 6, 1, K.steel);
      rect(c, 16 + lj, y + 2, 2, 1, K.steelShade);
    }
    y += 3;
    for (i = 0; i < DOME.length; i++) {
      var w = DOME[i], x0 = 17 - w / 2 + lj;
      rect(c, x0, y + i, w, 1, i < 2 ? K.enamelHi : K.enamel);
      if (i >= 2) { rect(c, x0 + w - 3, y + i, 3, 1, K.enamelMid); dot(c, x0, y + i, K.enamelHi); }
    }
    rect(c, 13 + lj, y, 4, 1, '#f3a79e');               /* the specular on the dome */
    if (v === 2) rect(c, 15, y, 4, 1, K.enamelDeep);    /* the knob's empty well */
    y += 5;
    rect(c, 2 + lj, y, 30, 1, K.enamelMid);             /* the lid's lip */
    if (v === 1) dot(c, 2, y, K.enamelDeep);
    y += 1;
    rect(c, 2, y, 30, 1, K.enamelHi);                   /* the pot's rim */
    rect(c, 28, y, 4, 1, K.enamel);
    y += 1;
    paintPotBody(c, y, b, 0);
    paintFoot(c, y + b, 0);
    return ringUnder(t);
  }
  /* the top pot, the one under the cap: a rim and a deep body, cut to
     whatever depth is left (its rim hides under the cap's lid) */
  var TOP_H = 44;
  function bakeTopPot() {
    var t = makeCanvas(34, TOP_H + 2), c = t.ctx;
    paintPotBody(c, 1, TOP_H - 2, 0);
    paintFoot(c, TOP_H - 1, 0);
    return ringUnder(t);
  }

  /* THE CAP: the topmost pot's lid, 42x9 across the mouth of the gap -
     the dome with the steel knob let into its crown, the flange catching
     the pendant along its top and shading under. Rows as [offset, width]
     so the empty corners are as small as the Table's platter's. */
  var LID_CAP = [[6, 30], [3, 36], [1, 40], [0, 42], [0, 42], [0, 42], [0, 42], [0, 42], [1, 40]];
  function bakeCapUp() {
    var t = makeCanvas(42, 9), c = t.ctx, i;
    var cols = [K.enamelHi, K.enamelHi, K.enamel, K.enamel, K.enamel, K.enamelHi, K.enamelMid, K.enamelMid, K.enamelDeep];
    for (i = 0; i < 9; i++) {
      rect(c, LID_CAP[i][0], i, LID_CAP[i][1], 1, cols[i]);
      if (i >= 2 && i <= 4) { rect(c, LID_CAP[i][0] + LID_CAP[i][1] - 5, i, 5, 1, K.enamelMid); }
    }
    rect(c, 10, 1, 5, 1, '#f3a79e');
    /* the knob, set into the dome's crown */
    rect(c, 18, 0, 6, 1, K.steelLit); rect(c, 18, 1, 6, 1, K.steel); rect(c, 23, 0, 1, 2, K.steelShade);
    rect(c, 19, 2, 4, 1, K.steelShade);
    return ringUnder(t);
  }

  /* how a pillar of height `avail` (rows from under its cap to the kill
     row's ring) is built: n lidded pots and the depth of the top one */
  function planStack(avail, seed) {
    var n = Math.max(0, Math.round((avail - 15) / 25)), bodies = [], i, used = 0;
    for (i = 0; i < n; i++) { bodies.push(11 + (hash(seed + i * 31) % 3)); used += 13 + bodies[i]; }
    var top = avail - used, k = 0, guard = 0;
    while (top < 9 && n > 0 && guard++ < 60) {
      if (bodies[k % n] > B_MIN) { bodies[k % n]--; top++; }
      k++;
    }
    while (top > 24 && n > 0 && guard++ < 120) {
      if (bodies[k % n] < B_MAX) { bodies[k % n]++; top--; }
      k++;
    }
    return { bodies: bodies, top: top };
  }

  /* ===================================================== THE CHIMNEYS

     A hanging pillar is the stainless chimney of the island's hood (ref
     3) coming down out of the lid, with the canopy as its cap. 34x48,
     tiled TOP first so the cut slice is at the canopy, where a chimney
     is cut anyway. Brushed steel in the evening: the edge toward the
     pendant lit, a reflection band down the left third, the face a cold
     mid grey with the brush running down it, the far side in shade - a
     cold grey against a warm cream wall, ringed. The chimney is two
     pieces telescoped, so it has a seam, at a different row in each of
     the three tiles. */
  var CHIM_SEAM = [44, 28, 12];
  function bakeChimney(v) {
    var t = makeCanvas(34, 48), c = t.ctx, y, i;
    var face = '#a3a8aa';
    rect(c, 1, 0, 32, 48, face);
    rect(c, 1, 0, 1, 48, K.steelLit);
    rect(c, 2, 0, 3, 48, K.steel);
    rect(c, 5, 0, 5, 48, mix(K.steel, K.steelLit, 0.55));
    rect(c, 10, 0, 2, 48, K.steel);
    rect(c, 27, 0, 3, 48, K.steelShade);
    rect(c, 30, 0, 3, 48, K.steelDeep);
    /* the brush, a streak in every third column */
    var r = mulberry32(5601 + v * 17);
    for (i = 12; i < 27; i += 3) {
      var sy = Math.floor(r() * 48), len = 6 + Math.floor(r() * 15);
      for (y = 0; y < len; y++) dot(c, i + (r() < 0.2 ? 1 : 0), (sy + y) % 48, r() < 0.5 ? K.steelShade : K.steel);
    }
    var s = CHIM_SEAM[v];
    rect(c, 1, s, 32, 1, K.steelDeep);
    rect(c, 1, s + 1, 32, 1, K.steelLit);
    rect(c, 0, 0, 1, 48, P.outline);
    rect(c, 33, 0, 1, 48, P.outline);
    return t;
  }
  /* the TOP-first tiler: the cut lands at the bottom, under the canopy */
  function drawColumnDown(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, 0, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* THE CANOPY CAP, 42x9: the chimney's foot flaring, the curved glass
     seen nearly edge-on from below - its top rim, the clear between
     where the room shows through, its bottom rim - and the steel body
     under the glass with its filters and its two lamps, lit. The glass
     is see-through, so the ring goes round the mask, outside. */
  function bakeCapDown() {
    var t = makeCanvas(42, 9), m = makeCanvas(42, 9), c = t.ctx, i;
    var rows = [[3, 36, K.steelLit], [1, 40, K.steel], [0, 42, P.hoodGlass], [0, 42, P.hoodGlassClear],
                [0, 42, P.hoodGlassClear], [0, 42, P.hoodGlassEdge], [2, 38, K.steelLit], [2, 38, K.steel], [3, 36, K.steelShade]];
    for (i = 0; i < 9; i++) {
      rect(c, rows[i][0], i, rows[i][1], 1, rows[i][2]);
      rect(m.ctx, rows[i][0], i, rows[i][1], 1, '#ffffff');
    }
    /* the glass's own edges catching the light at either end */
    dot(c, 0, 3, P.hoodGlass); dot(c, 41, 4, P.hoodGlassEdge);
    rect(c, 6, 3, 9, 1, rgba(K.cabinetLit, 0.55));
    for (i = 0; i < 4; i++) rect(c, 8 + i * 7, 7, 4, 1, K.steelDeep);
    rect(c, 11, 8, 2, 1, K.lampCore); rect(c, 29, 8, 2, 1, K.lampCore);
    return ringMask(t, m);
  }

  /* ========================================================= THE FIRE

     A pillar of fire from the kill row up. NOT a beam: a first cut drew
     it as bands of orange either side of a yellow core with a ring down
     both sides, and at 480x270 that was a lava tube. Fire is a FIELD of
     heat - hottest in the middle and at the root, falling off to the
     sides - with a ripple running up it, and its colour is read off the
     heat a pixel at a time: white-yellow in the core, amber, orange, a
     deep orange edge and an ember red at the very rim. The ripple pulls
     the core into teardrops that climb, and pushes licks of flame a few
     pixels out past the sides, and over the top it breaks into pointed
     tongues.

     THE BOX IS THE BODY. Every pixel of the 20 px band down the middle
     (cols -10..9 of the centre) is held at least at the edge's heat on
     every row of every frame, so the box [x-10, top, 20, h] is painted
     wall to wall; the licks outside it and the tongues over it are
     flame that rides on the body and is never boxed - the Table's drips,
     the Coop's mercy pixel. No outline: the ember rim is the edge, and
     a black ring round a fire made it a pipe.

     Eight frames at 15 fps; the ripple's phase moves up a frame at a
     time, so it flows upward and loops. */
  var FLAME_W = 28, FLAME_HALF = 14, FLAME_H = 140, TONGUE_H = 18, FLAME_FRAMES = 8;
  var COL_HALF = 10;                /* the box: centre-10 .. centre+9 */
  var FIRE_RAMP = [
    [0.86, '#fff6d8'], [0.68, FX.hotHi], [0.50, FX.hotMid], [0.32, FX.hot],
    [0.15, FX.heatEdge], [0.04, '#7a2408']
  ];
  function fireColour(heat) {
    for (var i = 0; i < FIRE_RAMP.length; i++) if (heat >= FIRE_RAMP[i][0]) return FIRE_RAMP[i][1];
    return null;
  }
  /* the heat at a pixel: x from the centre (pixel centres), y rows above
     the root, f the frame */
  function fireHeat(x, y, f) {
    var ph = f / FLAME_FRAMES * TAU;
    var ax = Math.abs(x) / 10.5;
    var base = 1 - ax * ax;
    var rip = 0.16 * Math.sin(y * 0.33 - ph * 2 + x * 0.35)
            + 0.10 * Math.sin(y * 0.11 - ph + x * 0.9)
            + 0.07 * Math.sin(y * 0.71 - ph * 3);
    /* the teardrops in the core, climbing */
    var drop = 0.14 * Math.sin(y * 0.21 - ph * 2) * Math.max(0, 1 - ax * 1.6);
    var root = y < 10 ? 0.35 * (1 - y / 10) : 0;
    return base + rip + drop + root;
  }
  function bakeFlame(f) {
    var t = makeCanvas(FLAME_W, FLAME_H), c = t.ctx, row, x;
    for (row = 0; row < FLAME_H; row++) {
      var y = FLAME_H - 1 - row;
      for (x = -FLAME_HALF; x < FLAME_HALF; x++) {
        var heat = fireHeat(x + 0.5, y, f);
        var inBox = x >= -COL_HALF && x < COL_HALF;
        if (inBox) heat = Math.max(heat, 0.16);
        else heat = Math.min(heat, 0.31) - 0.05 * (Math.abs(x + 0.5) - COL_HALF);
        var col = fireColour(heat);
        if (col) dot(c, FLAME_HALF + x, row, col);
      }
    }
    return t;
  }
  /* the tongues over the body: the same field, dying off with height and
     split into three or four pointed flames by a lobe across it */
  function bakeTongue(f) {
    var t = makeCanvas(FLAME_W, TONGUE_H), c = t.ctx, row, x;
    var ph = f / FLAME_FRAMES * TAU;
    for (row = 0; row < TONGUE_H; row++) {
      var up = TONGUE_H - 1 - row, k = up / TONGUE_H;
      for (x = -FLAME_HALF; x < FLAME_HALF; x++) {
        var xc = x + 0.5;
        var lobe = 0.5 + 0.5 * Math.cos(xc * 0.62 + Math.sin(ph + up * 0.2) * 1.2);
        var heat = fireHeat(xc, FLAME_H + up, f) * (1 - k * 1.25) * (0.45 + 0.75 * lobe) - k * 0.12;
        if (Math.abs(xc) > COL_HALF) heat -= 0.08 * (Math.abs(xc) - COL_HALF);
        var col = fireColour(heat);
        if (col) dot(c, FLAME_HALF + x, row, col);
      }
    }
    return t;
  }
  /* the root's flare on the stone: the jet spreading where it leaves the
     ground, wider than the column, in the bottom four rows only */
  function bakeRoot(f) {
    var t = makeCanvas(40, 5), c = t.ctx, row, x;
    var ph = f / FLAME_FRAMES * TAU;
    for (row = 0; row < 5; row++) {
      for (x = -20; x < 20; x++) {
        var xc = x + 0.5, ax = Math.abs(xc) / (12 + row * 2);
        var heat = (1 - ax * ax) * (0.55 + row * 0.12) + 0.12 * Math.sin(xc * 0.8 + ph * 2);
        var col = fireColour(heat);
        if (col) dot(c, 20 + x, row, col);
      }
    }
    return t;
  }

  /* ======================================================== THE PANS

     Three pans in side profile, rasterised at bake time through sixteen
     exact 22.5-degree turns rather than drawn sixteen times: a pan is a
     set of regions in its own frame (u along it, v across it, v down),
     each turned and plotted pixel by pixel into a 35x35 canvas about
     (17,17), walked finely enough that no pixel of a 2px handle is
     missed. The light stays put while the pan turns: an edge that faces
     up or left is lit, one facing down or right is in shade, so the
     glint slides round the pan the way it does on a real one.
       0 a 10" cast-iron skillet    24x5 body, a 9px handle      33
       1 a 2-qt steel saucepan       16x9 body, a black handle   26
       2 an 8" non-stick fry pan     20x4 body, a black handle   28 */
  var PAN = [
    { L: 33, u0: -7.5, u1: 16.5, v0: -2.5, v1: 2.5, taper: 2, h0: -16.5, hv0: -2.5, hv1: -0.5, rise: 0 },
    { L: 26, u0: -3, u1: 13, v0: -4.5, v1: 4.5, taper: 0, h0: -13, hv0: -3.5, hv1: -1.5, rise: 0.15 },
    { L: 28, u0: -6, u1: 14, v0: -2, v1: 2, taper: 3, h0: -14, hv0: -2, hv1: 0, rise: 0.2 }
  ];
  var PAN_N = 35, PAN_C = 17;
  /* the region of a point of pan k: 0 nothing, 1 body, 2 rim, 3 handle */
  function panRegion(k, u, v) {
    var p = PAN[k];
    if (u >= p.u0 && u <= p.u1 && v >= p.v0 && v <= p.v1) {
      var ub = (p.u0 + p.u1) / 2, hw = (p.u1 - p.u0) / 2 - p.taper * (v - p.v0) / (p.v1 - p.v0);
      if (Math.abs(u - ub) <= hw) return v < p.v0 + 1 ? 2 : 1;
    }
    if (k === 1 && v >= p.v0 && v < p.v0 + 1 && u >= p.u0 - 1 && u <= p.u1 + 1) return 2;   /* the saucepan's rolled rim */
    if (u >= p.h0 && u < p.u0 + 0.5) {
      var lift = p.rise * (p.u0 - u);
      if (v >= p.hv0 - lift && v <= p.hv1 - lift) return 3;
    }
    return 0;
  }
  /* the tones: [body, lit, deep, rim, handle, handleLit] */
  function panTones(k, gold) {
    if (gold) return [P.craneDeep, P.craneGold, P.goldDeep, P.craneHi, P.craneDeep, P.craneGold];
    if (k === 0) return [P.iron, P.ironLit, P.ironDeep, P.ironGlint, P.iron, P.ironLit];
    if (k === 1) return [K.steel, K.steelLit, K.steelShade, K.steelLit, P.phenolic, P.phenolicLit];
    return [P.nonstick, P.nonstickRim, P.nonstickDeep, P.nonstickRim, P.phenolic, P.phenolicLit];
  }
  function bakePan(k, frame, gold) {
    var N = PAN_N, C = PAN_C, p = PAN[k];
    var t = makeCanvas(N, N), c = t.ctx;
    var th = frame * TAU / 16, cs = Math.cos(th), sn = Math.sin(th);
    var grid = [], band = [], i, u, v;
    for (i = 0; i < N * N; i++) { grid.push(0); band.push(0); }
    var ub = (p.u0 + p.u1) / 2;
    for (u = -p.L / 2; u <= p.L / 2; u += 0.25) {
      for (v = -5; v <= 5; v += 0.25) {
        var r = panRegion(k, u, v);
        if (!r) continue;
        var px = Math.round(C + cs * u - sn * v), py = Math.round(C + sn * u + cs * v);
        if (px < 1 || py < 1 || px > N - 2 || py > N - 2) continue;
        var idx = py * N + px;
        /* the rim wins over the body, the body over the handle */
        var rank = [0, 2, 3, 1][r];
        if (rank > [0, 2, 3, 1][grid[idx]]) grid[idx] = r;
        /* the saucepan's steel has a highlight band along its body */
        if (k === 1 && r === 1) band[idx] = (u < ub - 2 && u > ub - 6) ? 1 : (u > ub + 5 ? 2 : band[idx]);
      }
    }
    var tones = panTones(k, gold), x, y;
    for (y = 0; y < N; y++) {
      for (x = 0; x < N; x++) {
        var g = grid[y * N + x];
        if (!g) continue;
        var upE = !grid[(y - 1) * N + x], lfE = !grid[y * N + x - 1];
        var dnE = !grid[(y + 1) * N + x], rtE = !grid[y * N + x + 1];
        var col;
        if (g === 3) col = (upE || lfE) ? tones[5] : tones[4];
        else if (g === 2) col = (dnE || rtE) && !(upE || lfE) ? tones[0] : tones[3];
        else {
          col = tones[0];
          if (k === 1 && band[y * N + x] === 1) col = K.steelLit;
          if (k === 1 && band[y * N + x] === 2) col = K.steelShade;
          if (upE || lfE) col = tones[1];
          else if (dnE || rtE) col = tones[2];
        }
        dot(c, x, y, col);
      }
    }
    return ringUnder(t);
  }
  /* THE BOXES, in the pan's own frame as [u, v, size]: three along the
     body and two along the handle, turned to the frame's own angle, so a
     diagonal pan never kills in the empty corners of its square */
  var PAN_BOX = [
    [[-3.5, 0, 4], [4.5, 0, 4], [12.5, 0, 4], [-14, -1.5, 3], [-10, -1.5, 3]],
    [[-0.5, 0, 5], [5, 0, 5], [10.5, 0, 5], [-11, -3.7, 2], [-7, -3.1, 2]],
    [[-2.7, 0, 3], [4, 0, 4], [10.7, 0, 3], [-12, -2.2, 3], [-8.5, -1.5, 3]]
  ];

  /* ===================================================== THE POWER-UPS */

  /* THE HOT SAUCE, 9x19: the white flip cap, the clear neck and
     shoulders, the body of clear plastic with the sauce from row 10 down
     and a blank white label on it. Frame 1 leans a pixel (it wobbles as
     it falls); T.bottleDown is frame 0 lying on its side, transposed,
     for when it lands. Its see-through rows ring the mask. */
  var BOT_ROWS = [[1, 7], [1, 7], [1, 7], [2, 5], [2, 5], [1, 7], [0, 9]];
  (function () { for (var i = 7; i < 19; i++) BOT_ROWS.push([0, 9]); })();
  function bottleArt(frame) {
    var g = [], r, x;
    for (r = 0; r < 19; r++) {
      var row = [], x0 = BOT_ROWS[r][0] + (frame === 1 && r <= 6 ? 1 : 0), w = BOT_ROWS[r][1];
      for (x = 0; x < 10; x++) row.push(null);
      for (x = x0; x < x0 + w; x++) {
        var col;
        if (r <= 2) col = (r === 2 || x === x0 + w - 1) ? P.capShade : P.cap;
        else if (r < 10) col = x === x0 ? P.plasticHi : (x === x0 + w - 1 ? P.plasticShade : P.plasticClear);
        else {
          col = P.hotSauce;
          if (x === x0 + 1) col = P.hotSauceHi;
          if (x === x0 + w - 1) col = P.hotSauceDeep;
          if (x === x0) col = P.plasticHi;
          if (r === 10 && x > x0 && x < x0 + w - 1) col = P.hotSauceHi;
          if (r >= 12 && r <= 15 && x >= x0 + 2 && x <= x0 + 6) col = (r === 12 || r === 15 || x === x0 + 6) ? P.labelEdge : P.label;
          if (r === 18) col = P.hotSauceDeep;
        }
        row[x] = col;
      }
      g.push(row);
    }
    return g;
  }
  function paintArt(t, m, g, ox, oy, transpose) {
    for (var r = 0; r < g.length; r++) {
      for (var x = 0; x < g[r].length; x++) {
        if (!g[r][x]) continue;
        var px = transpose ? ox + (g.length - 1 - r) : ox + x, py = transpose ? oy + x : oy + r;
        dot(t.ctx, px, py, g[r][x]);
        dot(m.ctx, px, py, '#ffffff');
      }
    }
  }
  function bakeBottle(frame) {
    var t = makeCanvas(12, 21), m = makeCanvas(12, 21);
    paintArt(t, m, bottleArt(frame), 1, 1, false);
    return ringMask(t, m);
  }
  function bakeBottleDown() {
    var t = makeCanvas(21, 12), m = makeCanvas(21, 12);
    paintArt(t, m, bottleArt(0), 1, 1, true);
    return ringMask(t, m);
  }

  /* THE GLUTATHIONE STICK PACK, 14x23, off Gluta ref: a teal foil pouch
     shaped like a bottle - the narrow tab at the top with its tear
     notch, the shoulders, the body - with the white print as this size
     can carry it: the logo's arc over the brand, the wordmark, the
     product name as a block of alternating pixels (which reads as a word
     at this size), and the flavour's box. It stands propped on its
     bottom seam, leaning a hair. */
  var SACHET_ROWS = [[3, 8], [3, 8], [3, 8], [3, 8], [3, 8], [2, 10], [1, 12]];
  (function () { for (var i = 7; i < 23; i++) SACHET_ROWS.push([0, 14]); })();
  function bakeSachet() {
    var t = makeCanvas(16, 25), c = t.ctx, r, x;
    for (r = 0; r < 23; r++) {
      var x0 = 1 + SACHET_ROWS[r][0] - (r < 5 ? 1 : 0), w = SACHET_ROWS[r][1], y = 1 + r;
      rect(c, x0, y, w, 1, P.teal);
      rect(c, x0 + w - 1, y, 1, 1, P.tealDeep);
      if (r >= 6) { rect(c, x0 + 2, y, 3, 1, P.tealLit); dot(c, x0 + 1, y, P.tealHi); }
      else dot(c, x0, y, P.tealLit);
    }
    /* the tear notch, and the bottom seam */
    dot(c, 3, 3, P.tealDeep); dot(c, 10, 3, P.tealDeep);
    rect(c, 1, 23, 14, 1, P.tealDeep);
    /* the print */
    dot(c, 7, 9, P.print); dot(c, 8, 8, P.print); dot(c, 9, 8, P.print); dot(c, 10, 9, P.print); dot(c, 8, 10, P.print);
    rect(c, 3, 12, 10, 1, P.print);
    for (x = 0; x < 10; x++) { if (x % 2 === 0) dot(c, 3 + x, 15, P.print); if (x % 3 !== 1) dot(c, 3 + x, 16, P.print); }
    rect(c, 5, 19, 6, 1, P.print);
    return ringUnder(t);
  }

  /* THE WATERMELON WEDGE, wet with lime juice, 17x17 about (8,8): a slice
     lying on its rind - the dark green rind with its lit top, the white
     pith, the red flesh narrowing to the point, three black seeds, and
     the juice glistening on it in three spots that move between two
     sub-frames. Turned through eight 45-degree tumbles by inverse
     mapping each pixel into the slice's own frame. */
  var MELON_SEEDS = [[-2.5, 0.5], [2, -0.5], [0, 1.8]];
  var MELON_JUICE = [[[-3.5, 1.5], [1, -2.5], [3.5, 2]], [[-2, 2.2], [0.5, -1], [4, 1.2]]];
  function melonAt(u, v, sub) {
    if (v > 5.5 || v < -6.5) return null;
    var half = 7.5 * (v + 6.5) / 10;
    if (v > 3) half = 7.5 - (v - 3) * 0.3;
    if (Math.abs(u) > half) return null;
    if (v > 4.4) return v > 4.9 ? P.rind : P.rindLit;
    if (v > 3.3) return P.pith;
    var i;
    for (i = 0; i < MELON_SEEDS.length; i++) {
      if (Math.abs(u - MELON_SEEDS[i][0]) < 0.6 && Math.abs(v - MELON_SEEDS[i][1]) < 0.6) return P.seed;
    }
    for (i = 0; i < 3; i++) {
      var j = MELON_JUICE[sub][i];
      if (Math.abs(u - j[0]) < 0.55 && Math.abs(v - j[1]) < 0.55) return P.juice;
    }
    if (u < -half + 1.6) return P.fleshHi;
    if (u > half - 1.2) return P.fleshDeep;
    return P.flesh;
  }
  function bakeMelon(frame, sub) {
    var N = 17, C = 8, t = makeCanvas(N, N), x, y;
    var th = frame * TAU / 8, cs = Math.cos(th), sn = Math.sin(th);
    for (y = 0; y < N; y++) {
      for (x = 0; x < N; x++) {
        var dx = x - C, dy = y - C;
        var u = cs * dx + sn * dy, v = -sn * dx + cs * dy;
        var col = melonAt(u, v, sub);
        if (col) dot(t.ctx, x, y, col);
      }
    }
    /* the drip of lime off the rind, in the slice's own frame */
    var du = 3, dv = 6.4;
    dot(t.ctx, Math.round(C + cs * du - sn * dv), Math.round(C + sn * du + cs * dv), P.juiceDrip);
    return ringUnder(t);
  }

  /* ========================================================= BUILD */

  function build() {
    LivingRoom.build();               /* the menu gloom and the lid's pools live there */
    T.ceiling = Kitchen.bakeCeiling(null);
    T.wall = bakeWall();
    var q = bakeQuartz();
    T.quartz = q.lane;
    T.band = q.band;
    T.cooktop = bakeCooktop();
    T.fireLight = bakeLight(96, 44, FX.hot, 0.42);
    T.glassLight = bakeLight(90, 12, FX.hotMid, 0.55);
    T.ringGlow = bakeLight(64, 8, FX.hot, 0.75);
    T.unit = [];
    for (var v = 0; v < 3; v++) {
      T.unit.push([]);
      for (var b = 0; b <= B_MAX; b++) T.unit[v].push(b >= B_MIN ? bakeUnit(v, b) : null);
    }
    T.topPot = bakeTopPot();
    T.capUp = bakeCapUp();
    T.chimney = [bakeChimney(0), bakeChimney(1), bakeChimney(2)];
    T.capDown = bakeCapDown();
    T.flame = []; T.tongue = []; T.root = [];
    for (var f = 0; f < FLAME_FRAMES; f++) { T.flame.push(bakeFlame(f)); T.tongue.push(bakeTongue(f)); T.root.push(bakeRoot(f)); }
    T.pan = [];
    for (var k = 0; k < 3; k++) {
      T.pan.push([]);
      for (var fr = 0; fr < 16; fr++) T.pan[k].push(bakePan(k, fr, false));
    }
    T.goldPan = [];
    for (fr = 0; fr < 16; fr++) T.goldPan.push(bakePan(0, fr, true));
    T.bottle = [bakeBottle(0), bakeBottle(1)];
    T.bottleDown = bakeBottleDown();
    T.sachet = bakeSachet();
    T.melon = [];
    for (fr = 0; fr < 8; fr++) T.melon.push([bakeMelon(fr, 0), bakeMelon(fr, 1)]);
  }

  /* ======================================================== DRAWING */

  /* BACK TO FRONT: the wall and the ceiling plane (0.25), the island's
     stone (1.0), and on the stone, wherever there is a stove, the sliver
     of its glass behind the kill row and the fire's light. The porch calls
     with no list, and gets the bare room.

     The list is kept for drawFloor, which comes later in the same frame
     and draws the rest of each cooktop on the band - see THE COOKTOP. It
     is read for drawing and nothing else. */
  var frameObs = null;
  function drawBackdrop(ctx, scroll, obstacles, run) {
    frameObs = obstacles || null;
    ctx.fillStyle = K.plasterDim;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * WALL_PAR, WALL_Y);
    tileX(ctx, T.quartz.canvas, scroll, EDGE_Y);
    if (!obstacles) return;
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type === 'spike' && ob.stove) drawCooktop(ctx, ob, false);
    }
  }

  /* one pass of a cooktop: `near` false is the sliver behind the kill row
     (with the backdrop), true the twelve rows on the band (with the floor) */
  function drawCooktop(ctx, ob, near) {
    var c = Math.round(stoveC(ob)), i, k;
    if (c < -80 || c > VW + 80) return;
    var sy = near ? COOK_SPLIT : 0, sh = near ? COOK_H - COOK_SPLIT : COOK_SPLIT;
    ctx.drawImage(T.cooktop.canvas, 0, sy, T.cooktop.w, sh, c - COOK_X, COOK_Y + sy, T.cooktop.w, sh);
    var lit = stoveLight(ob), a = ctx.globalAlpha;
    /* the fire's light on the stone and in the glass: a baked falloff,
       never a rect */
    if (lit > 0.02) {
      for (i = 0; i < ob.nc; i++) {
        var kk = colh(ob, i) / Math.max(1, colH(ob, i));
        if (kk <= 0.02) continue;
        var lx = Math.round(colX(ob, i));
        ctx.globalAlpha = a * Math.min(1, kk);
        if (!near) ctx.drawImage(T.fireLight.canvas, lx - 48, FLOOR - 30);
        else {
          ctx.drawImage(T.fireLight.canvas, 0, 30, 96, 14, lx - 48, FLOOR, 96, 14);
          ctx.drawImage(T.glassLight.canvas, lx - 45, FLOOR + 1);
        }
      }
      ctx.globalAlpha = a;
    }
    /* THE RINGS GLOWING UP, the tell: a column's rings turn from the
       glass's grey through orange to a pale yellow, the heat filling them
       and a soft halo round them on the black - the one bright thing on
       the darkest surface in the bay, which is why the tell is here */
    var g = ob.glow || 0;
    for (i = 0; i < ob.nc; i++) {
      var cx = Math.round(colX(ob, i)), live = colh(ob, i) > 0;
      var heat = live ? 1 : g;
      if (heat <= 0.02) continue;
      var rings = COL_RINGS[i];
      for (k = 0; k < rings.length; k++) {
        var R = RINGS[rings[k]];
        if ((R[1] >= FLOOR) !== near) continue;
        ctx.globalAlpha = a * Math.min(1, heat);
        ctx.drawImage(T.ringGlow.canvas, 0, 0, 64, 8, cx - R[2] - 4, R[1] - R[3] - 3, R[2] * 2 + 8, R[3] * 2 + 6);
        ctx.globalAlpha = a * Math.min(1, heat) * 0.6;
        ellipseFill(ctx, cx, R[1], R[2] - 1, Math.max(0.6, R[3] - 1), FX.heatEdge);
        ctx.globalAlpha = a;
        var col = heat < 0.4 ? FX.heatEdge : (heat < 0.75 ? FX.hot : FX.hotHi);
        ellipse(ctx, cx, R[1], R[2], R[3], col);
      }
    }
    /* AND THE FIRE COMES OUT OF ITS RING: on the band, the column runs on
       down from the kill row into the ring, and flares there across the
       glass. Below the kill row nothing can be touched, so none of this is
       boxed - the box is the column above the line, as it always was. */
    if (near) {
      for (i = 0; i < ob.nc; i++) {
        var hh = Math.round(colh(ob, i));
        if (hh <= 0) continue;
        var fx = Math.round(colX(ob, i)), f = Math.floor((ob.age * 15) + i * 3) % FLAME_FRAMES;
        var ring = RINGS[COL_RINGS[i][COL_RINGS[i].length - 1]], deep = ring[1] - FLOOR;
        var kf = Math.min(1, hh / 24);
        ctx.globalAlpha = a * kf;
        ctx.drawImage(T.flame[f].canvas, 0, FLAME_H - deep, FLAME_W, deep, fx - FLAME_HALF, FLOOR, FLAME_W, deep);
        ctx.drawImage(T.root[f].canvas, fx - 20, ring[1] - 2);
        ctx.globalAlpha = a;
      }
    }
  }

  /* is screen x over a cooktop's glass, at the band's top rows */
  function onGlass(x) {
    if (!frameObs) return false;
    for (var i = 0; i < frameObs.length; i++) {
      var o = frameObs[i];
      if (o.type === 'spike' && o.stove && Math.abs(x - stoveC(o)) < cookHalf(FLOOR + 1) - 2) return true;
    }
    return false;
  }

  /* how lit the room round a stove is: how far up its fire is */
  function stoveLight(ob) {
    var h = 0;
    for (var i = 0; i < ob.nc; i++) h = Math.max(h, colh(ob, i) / Math.max(1, colH(ob, i)));
    return h;
  }

  /* THE LID IS THE HOUSE'S CEILING BAND - the Living Room's plaster,
     amber crackle-glass pendant and register over the four hard crown
     rows, with each pendant's pool laid into the room under it. Island
     ref 5 has exactly those pendants hanging over this island. */
  function drawCeiling(ctx, scroll) { LivingRoom.drawCeiling(ctx, scroll, T.ceiling); }

  /* the band: the stone under the kill row, cut from the same painting */
  function drawFloor(ctx, scroll) {
    tileX(ctx, T.band.canvas, scroll, FLOOR);
    /* and the near rows of every cooktop, on the band - see THE COOKTOP */
    if (!frameObs) return;
    for (var i = 0; i < frameObs.length; i++) {
      var ob = frameObs[i];
      if (ob.type === 'spike' && ob.stove) drawCooktop(ctx, ob, true);
    }
  }

  /* The calm version, for the porch: the room and the bare island, at
     six tenths of the scroll, the house's menu gloom over the lower half.
     No stove, no stacks, no pans: a hazard in a title picture is a
     hazard that never moves. */
  function drawMenuBackdrop(ctx, scroll) {
    drawBackdrop(ctx, scroll * 0.6);
    ctx.drawImage(LivingRoom.tiles.menuShade.canvas, 0, VH - 120);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  /* ------------------------------------------------------- the pillars */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), v = ob.variant, i;
    var topH = ob.gapY - CEIL, botY = ob.gapY + ob.gapH, botH = FLOOR - botY;
    /* the hard cast shadow on the room behind, the Couch's strip */
    if (topH > 0) Tint.rect(ctx, x + 34, CEIL, 4, topH, P.void, 6);
    if (botH > 0) Tint.rect(ctx, x + 34, botY, 4, botH, P.void, 6);
    if (topH > 0) {
      drawColumnDown(ctx, T.chimney[v].canvas, x, CEIL, 34, ob.gapY - 9 - CEIL + 2);
      ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    }
    if (botH > 0) {
      /* the stack, from the stone up: whole pots, each jogged a pixel
         either way because nobody stacks cast iron straight - the base
         never moves, it is standing on the stone */
      var plan = ob.stack, yb = FLOOR;           /* the row of the next pot's bottom ring */
      for (i = 0; i < plan.bodies.length; i++) {
        var b = plan.bodies[i], p = 13 + b;
        var jx = i === 0 ? 0 : (hash(ob.seed + i * 13) % 3) - 1;
        var uv = (i === 1 && v > 0) ? v : 0;
        var tile = T.unit[uv][b].canvas;
        ctx.drawImage(tile, x + jx, yb - p);
        yb -= p;
      }
      /* the top pot, as deep as is left, its rim under the cap */
      var top = plan.top, jt = plan.bodies.length ? (hash(ob.seed + 97) % 3) - 1 : 0;
      ctx.drawImage(T.topPot.canvas, 0, TOP_H + 2 - top - 1, 34, top + 1, x + jt, yb - top, 34, top + 1);
      ctx.drawImage(T.capUp.canvas, x - 4, botY);
    }
  }

  /* --------------------------------------------------------- the fire */

  function drawStoveFire(ctx, ob) {
    var i, k;
    for (i = 0; i < ob.nc; i++) {
      var h = Math.round(colh(ob, i)), cx = Math.round(colX(ob, i));
      if (h <= 0) continue;
      var f = Math.floor((ob.age * 15) + i * 3) % FLAME_FRAMES;
      var bh = Math.min(h, FLAME_H);
      ctx.drawImage(T.flame[f].canvas, 0, FLAME_H - bh, FLAME_W, bh, cx - FLAME_HALF, FLOOR - bh, FLAME_W, bh);
      ctx.drawImage(T.tongue[f].canvas, cx - FLAME_HALF, FLOOR - bh - TONGUE_H);
      /* the embers over it while it holds */
      if (ob.st === ST_HOLD || ob.st === ST_RISE) {
        for (k = 0; k < 4; k++) {
          var e = wrap(ob.t * 1.7 + k * 0.27, 1);
          var ey = FLOOR - bh - TONGUE_H - Math.round(e * 26);
          var ex = cx - 6 + ((hash(k * 41 + Math.floor(ob.t * 1.7 + k * 0.27) * 7) % 13));
          if (ey > CEIL) dot(ctx, ex, ey, k % 2 ? FX.hotHi : FX.hot);
        }
      }
    }
    /* THE SMOKE after: wisps of plaster-pale air rising off where the
       column was, fading. Drawn, never boxed. */
    for (i = 0; i < ob.wisps.length; i++) {
      var w = ob.wisps[i], aa = 1 - w.age / 1.2;
      if (aa <= 0) continue;
      var a = ctx.globalAlpha;
      ctx.globalAlpha = a * aa * 0.6;
      rowsFill(ctx, [[1, 2], [0, 4], [1, 2]], Math.round(w.x) - 2, Math.round(w.y), K.plasterMid);
      ctx.globalAlpha = a;
    }
  }

  /* THE TELL, part two, in the play plane: once the rings have been
     glowing half a second, a dotted line of sparks climbs the exact line
     the column will stand on, up to the exact height it will reach, and
     stands there blinking until the fire follows it - the Table's aim
     dots, for a column. It is drawn from the same numbers as the box, so
     it cannot lie about WHERE or HOW HIGH. */
  function drawStoveAim(ctx, ob) {
    if (ob.st !== ST_TELL || ob.t < 0.45) return;
    var reach = clamp((ob.t - 0.45) / 0.35, 0, 1), blink = Math.floor(ob.t * 10) & 1;
    var a = ctx.globalAlpha;
    for (var i = 0; i < ob.nc; i++) {
      var Hc = colH(ob, i), cx = Math.round(colX(ob, i)), top = FLOOR - Hc, y;
      var upto = FLOOR - Math.round(Hc * reach);
      ctx.globalAlpha = a * (blink ? 1 : 0.6);
      for (y = FLOOR - 4; y >= upto; y -= 5) {
        rect(ctx, cx - 1, y, 2, 3, FX.heatEdge);
        dot(ctx, cx - 1 + (Math.floor(y / 5) & 1), y + 1, FX.hotHi);
      }
      if (reach >= 1) {
        /* the height it will reach, a bracket across the line */
        rect(ctx, cx - 6, top, 12, 1, FX.heatEdge);
        rect(ctx, cx - 4, top - 1, 8, 1, FX.hotMid);
        dot(ctx, cx - 6, top + 1, FX.heatEdge); dot(ctx, cx + 5, top + 1, FX.heatEdge);
      }
      /* and the root warming on the stone */
      ctx.globalAlpha = a * (0.35 + 0.35 * reach);
      rect(ctx, cx - 7, FLOOR - 2, 14, 2, FX.hot);
      rect(ctx, cx - 4, FLOOR - 3, 8, 1, FX.hotMid);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------------- the falling */

  /* Everything that draws or collides a drop reads ob.gold, ob.spicy,
     ob.sour and ob.whirl LIVE - the engine sets the last two after
     makeDrop returns - and settle() patches the fields a lime needs the
     first time anything looks at it. There is no whirl in this bay; if
     one ever arrived it would be painted as the watermelon. */
  function kindOf(ob) {
    if (ob.gold) return 'gold';
    if (ob.spicy) return 'sauce';
    if (ob.sour || ob.whirl) return 'melon';
    return 'pan';
  }
  function settle(ob) {
    if (ob.settled) return;
    ob.settled = true;
    if ((ob.sour || ob.whirl) && !ob.gold && !ob.spicy) {
      ob.w = 16; ob.landCry = 'pat'; ob.burst = [P.fleshHi, P.flesh]; ob.splat = 1.4;
      ob.spinRate = 2 * (chance(0.5) ? -1 : 1);
    }
  }
  function panFrame(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 16) % 16; }
  function melonFrame(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 8) % 8; }

  function drawDrop(ctx, ob) {
    settle(ob);
    var x = Math.round(ob.x), y = Math.round(ob.y), i, k;
    var kind = kindOf(ob), age = ob.age || 0;
    if (kind === 'pan') {
      /* a pan the fire has just thrown trails embers while it climbs */
      if (ob.blasts && ob.vy < 0) {
        for (i = 0; i < 4; i++) {
          var ey = y + 6 + i * 4 + (Math.floor(age * 20 + i) % 3);
          if (ey >= CEIL && ey < FLOOR) dot(ctx, x - 3 + ((i * 5 + Math.floor(age * 13)) % 7), ey, i % 2 ? FX.hotHi : FX.hot);
        }
      }
      blitBelowCeil(ctx, T.pan[ob.kind][panFrame(ob)].canvas, x - PAN_C, y - PAN_C);
      return;
    }
    if (kind === 'gold') {
      var cp = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(15 + cp * 5),
           'rgba(243,204,132,' + (0.46 * cp).toFixed(3) + ')',
           'rgba(224,176,74,' + (0.22 * cp).toFixed(3) + ')',
           'rgba(224,176,74,0)');
      for (i = 0; i < 2; i++) {
        k = wrap(age * 0.9 + i * 0.5, 1);
        var sy = y - 10 - Math.round(k * 6);
        if (sy >= CEIL) dot(ctx, x - 6 + i * 13, sy, i ? P.craneHi : '#f3cc84');
      }
      blitBelowCeil(ctx, T.goldPan[panFrame(ob)].canvas, x - PAN_C, y - PAN_C);
      return;
    }
    if (kind === 'melon') {
      var sp = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(16 + sp * 5),
           'rgba(228,255,154,' + (0.45 * sp).toFixed(3) + ')',
           'rgba(182,224,78,' + (0.22 * sp).toFixed(3) + ')',
           'rgba(95,146,38,0)');
      blitBelowCeil(ctx, T.melon[melonFrame(ob)][Math.floor(age * 4) % 2].canvas, x - 8, y - 8);
      return;
    }
    /* THE HOT SAUCE, wearing the game's heat: the glow and three sparks
       off the cap, wobbling at three a second as it falls upright */
    var pulse = 0.72 + 0.28 * Math.sin(age * 2.6);
    glow(ctx, x, y, Math.round(16 + pulse * 6),
         'rgba(255,224,138,' + (0.50 * pulse).toFixed(3) + ')',
         'rgba(240,146,46,' + (0.24 * pulse).toFixed(3) + ')',
         'rgba(184,77,18,0)');
    for (i = 0; i < 3; i++) {
      k = wrap(age * 0.7 + i * 0.41, 1);
      var fy = y - 12 - Math.round(k * 7);
      if (fy < CEIL) continue;
      dot(ctx, x - 4 + Math.round(Math.sin(age * 2 + i) * 4), fy, i % 2 ? FX.hotHi : FX.hot);
    }
    blitBelowCeil(ctx, T.bottle[Math.floor(age * 6) % 2].canvas, x - 5, y - 10);
  }

  /* The spot a falling thing casts on the stone: wide and faint while it
     is up by the lid, tight and dark as it arrives - in its own colour,
     so the spot tells the kind before the thing is in sight. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var high = (FLOOR - 4) - ob.y;
    var far = clamp(high / (FLOOR - 4 - CEIL), 0, 1);
    var w = 6 + Math.round(10 * far);
    var kind = kindOf(ob);
    /* on a cooktop's black glass a shadow is invisible: there the spot is
       the pendant's reflection broken up, a pale smudge on the glass */
    if (onGlass(ob.x)) {
      Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 2, K.blackGlassHi, 12 - Math.round(7 * far));
      return;
    }
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 2,
              kind === 'gold' ? P.craneDeep : (kind === 'sauce' ? P.hotSauceDeep : (kind === 'melon' ? P.rind : P.shadeCool)),
              14 - Math.round(9 * far));
  }

  /* What has landed, lying on the stone in front of the kill line: a pan
     flat (or upside down), rung once - the settle frame for its first
     0.14 s is its whole bounce - the bottle on its side, the slice on its
     rind, the gold pan on its back. Everything fades over its last
     quarter second rather than blinking out. */
  function drawDropSplat(ctx, ob) {
    settle(ob);
    var x = Math.round(ob.x), kind = kindOf(ob);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * clamp(ob.broken / 0.25, 0, 1);
    if (kind === 'pan' || kind === 'gold') {
      var settleF = ob.broken > (ob.splat || SPLAT_TIME) - 0.14;
      var base = ob.flip ? 8 : 0, fr = settleF ? (base + 15) % 16 : base;
      Tint.rect(ctx, x - 13, FLOOR + 5, 28, 2, P.shadeCool, 8);
      ctx.drawImage((kind === 'gold' ? T.goldPan : T.pan[ob.kind])[fr].canvas, x - PAN_C, FLOOR + 1 - PAN_C);
    } else if (kind === 'sauce') {
      Tint.rect(ctx, x - 9, FLOOR + 6, 20, 2, P.shadeCool, 8);
      ctx.drawImage(T.bottleDown.canvas, x - 10, FLOOR - 4);
    } else {
      Tint.rect(ctx, x - 7, FLOOR + 6, 15, 2, P.shadeCool, 8);
      ctx.drawImage(T.melon[0][0].canvas, x - 8, FLOOR - 8);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------- the spare life */

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var i, bx = Math.round(ob.x);
    /* the shadow stays on the stone even while it is in the air (or in a
       crow's talons, ob.held, when it goes with it) */
    if (!ob.held) Tint.rect(ctx, bx - 8, FLOOR - 1, 17, 2, P.shadeCool, 8);
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 12 + ob.dy);
    /* THE GLOW SAYS SPARE LIFE: the house jade, at the kitchen's strength */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + (ob.age || 0) * 2.6);
    var r = Math.round(20 + pulse * 4);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.58 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.24 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.drawImage(T.sachet.canvas, x - 8, FLOOR - 24 + Math.round(ob.dy));
    for (i = 0; i < 3; i++) {
      var k = wrap(ob.phase * 0.22 + (ob.age || 0) * 0.3 + i * 0.34, 1);
      dot(ctx, x - 7 + i * 7, y - 14 - Math.round(k * 11), i === 1 ? P.tealHi : P.lifePale);
    }
  }

  /* ------------------------------------------------------- the litter

     On the stone under the kill line, flat, never boxed - only what ref
     4 has on this quartz: crumbs, a dried orange spot of sauce, and
     peppercorns spilled from the grinder. (The grinder itself stands on
     the tray behind the lens; stood up in the band it would be the
     smallest near thing in a picture that is true about distance.) */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2, i, h;
    if (ob.kind === 0) {
      for (i = 0; i < 6; i++) {
        h = hash(ob.seed + i * 977);
        dot(ctx, x + (h >>> 3) % 16, y + 1 + (h >>> 11) % 4, (h & 1) ? P.crumb : P.crumbDeep);
      }
    } else if (ob.kind === 1) {
      rect(ctx, x + 2, y + 2, 7, 2, P.sauceStain);
      rect(ctx, x + 3, y + 1, 4, 1, P.sauceStain);
      dot(ctx, x + 2, y + 3, P.sauceStainDeep); dot(ctx, x + 8, y + 2, P.sauceStainDeep);
      dot(ctx, x + 11, y + 3, P.sauceStain);
    } else {
      for (i = 0; i < 3; i++) {
        h = hash(ob.seed + i * 613);
        var px = x + (h >>> 3) % 14, py = y + 1 + (h >>> 11) % 3;
        dot(ctx, px, py, P.pepper); dot(ctx, px + 1, py, P.pepperLit);
      }
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') { if (ob.stove) { drawStoveAim(ctx, ob); drawStoveFire(ctx, ob); } }
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ======================================================= THE COVER

     The Island's painters for its cover (js/cover.js lays it out and
     times it). A live miniature of THIS view at the bay's own row
     fractions, re-based on the lane: the lid band with its pendants, the
     ceiling plane with its cans, the cream wall with the glass uppers
     and a shutter panel, the machines on the counter line, and the
     quartz taking the bottom of the card. The columns are the bay's
     own: the hood's steel chimneys hanging with the glass canopy for a
     cap, and the stacks of red Dutch ovens standing with the big lid on
     top. In the open spans THE BLACK GLASS lies in the stone (the one
     black thing) and fires ONE COLUMN OF FIRE (the one orange thing),
     and a skillet tumbles down. Each layer at its own parallax. */

  /* a row of the lane, as a fraction of it */
  function laneRow(S, f) { return S.top + Math.round(S.lane * f); }

  /* a cap's rows at card size, the far side first and the gap's edge
     last: the outline on the gap's edge and the lit row just inside it
     are kept at every size, the face fills what is left */
  function capRows(n, far, face, lit, edge) {
    if (n <= 2) return [lit, edge];
    var rows = n >= 4 ? [far] : [];
    while (rows.length < n - 2) rows.push(face);
    rows.push(lit, edge);
    return rows;
  }

  var COVER = {
    halo: P.void,
    ink: P.outline,
    back: function (ctx, S) {
      var x = S.x, y = S.y, w = S.w, h = S.h, s = S.s, i, k;
      var crownY = laneRow(S, 0.183), upT = laneRow(S, 0.326), upB = laneRow(S, 0.615);
      var noseY = laneRow(S, 0.762), edgeY = laneRow(S, 0.781);

      /* 1. the ceiling plane and its cans, at the wall's pace */
      for (i = y; i < crownY; i++) rect(ctx, x, i, w, 1, mix(K.plasterDim, K.plasterMid, (i - y) / Math.max(1, crownY - y)));
      for (k = 0; k < 3; k++) {
        var cx0 = x + Math.round(wrap(k * 47 + 20 - s * WALL_PAR, w + 20)) - 10;
        Tint.rect(ctx, cx0 - 5, crownY - 7, 11, 4, K.plasterLit, 6);
        rect(ctx, cx0 - 1, crownY - 6, 3, 1, K.lampCore);
      }
      /* 2. the wall, the uppers, the shutters, the splash and the counter */
      rect(ctx, x, crownY, w, noseY - crownY, K.wallShade);
      rect(ctx, x, crownY, w, 1, K.crown);
      var span = Math.round(w * 1.6), dw = Math.max(4, Math.round(7 * S.k * 2.4));
      for (k = -1; k < 2; k++) {
        var gx0 = x + Math.round(wrap(w * 0.1 - s * WALL_PAR, span)) + k * span;
        for (i = 0; i < 4; i++) {
          rect(ctx, gx0 + i * dw, upT, dw, upB - upT, K.cabinetShade);
          rect(ctx, gx0 + i * dw + 1, upT + 1, dw - 2, upB - upT - 2, K.glassDark);
          rect(ctx, gx0 + i * dw + 1, upT + Math.round((upB - upT) * 0.45), dw - 2, 1, K.glassShelf);
          rect(ctx, gx0 + i * dw + (i % 2 ? 1 : dw - 2), upB - 6, 1, 3, K.pullLit);
        }
        var sx0 = gx0 + dw * 4 + 12, sw = Math.round(w * 0.3), shT = upT + 3;
        rect(ctx, sx0 - 1, shT - 1, sw + 2, noseY - 3 - shT + 1, K.cabinet);
        for (i = shT; i < noseY - 3; i += 2) { rect(ctx, sx0, i, sw, 1, K.shutter); rect(ctx, sx0, i + 1, sw, 1, K.shutterNight); }
        for (i = 0; i < 4; i++) rect(ctx, sx0 + Math.round(i * sw / 4), shT, 1, noseY - 3 - shT, K.shutterShade);
        /* the machines: the espresso, the pot, the fryer */
        rect(ctx, gx0 + 2, noseY - 6, 5, 6, K.steel);
        rect(ctx, gx0 + 10, noseY - 6, 5, 6, K.steel); rect(ctx, gx0 + 10, noseY - 7, 5, 1, K.blackGlass);
        rect(ctx, gx0 + 18, noseY - 5, 6, 5, K.blackGlass); rect(ctx, gx0 + 18, noseY - 3, 6, 1, K.steel);
      }
      for (i = upB; i < noseY; i++) if ((i - upB) % 2 === 0) Tint.rect(ctx, x, i, w, 1, K.splashPearl, 4);
      Tint.rect(ctx, x, y, w, noseY - y, P.evening, 3);
      rect(ctx, x, noseY, w, 1, K.quartzHi);
      rect(ctx, x, noseY + 1, w, edgeY - noseY - 1, K.cabinetShade);

      /* 3. the island's quartz, down through the floor band - the band is
         the same stone - with its veins sliding at the lane's pace */
      for (i = edgeY; i < y + h; i++) {
        var row = EDGE_Y + Math.round((i - edgeY) / Math.max(1, (y + h) - edgeY) * (VH - EDGE_Y - 1));
        rect(ctx, x, i, w, 1, quartzColour(row));
      }
      for (i = 0; i < 4; i++) {
        var vx = x + Math.round(wrap(i * 37 - s, w + 20)) - 10;
        rect(ctx, vx, edgeY + Math.round((5 + i * 3) * S.k * 2.4), Math.max(4, Math.round(9 * S.k * 2.4)), 1, K.vein);
      }
    },
    /* A hanging column is the hood's stainless chimney with the glass
       canopy for its cap; a standing one is the stack of Dutch ovens
       with the big lid on top - whole pots from the stone up, each one
       above the first a pixel off true (planStack's "nobody stacks cast
       iron straight"), and the base never moves. */
    pillar: function (ctx, x, y, w, h, end, p, S) {
      if (h <= 0) return;
      var ch = Math.min(h, Math.max(2, Math.round(9 * S.k))), ov = Math.max(1, Math.round(4 * S.k)), i, rows, n;
      if (end === 'top') {
        var body = h - ch, lit = Math.max(1, Math.round(w / 3));
        rect(ctx, x, y, w, h, P.outline);
        rect(ctx, x + 1, y, w - 2, h, '#a3a8aa');
        rect(ctx, x + 1, y, 1, h, K.steelLit);
        rect(ctx, x + 2, y, 2, h, K.steel);
        rect(ctx, x + 4, y, lit - 3, h, mix(K.steel, K.steelLit, 0.55));
        var sh = w >= 12 ? 2 : 1;
        rect(ctx, x + w - 1 - sh * 2, y, sh, h, K.steelShade);
        rect(ctx, x + w - 1 - sh, y, sh, h, K.steelDeep);
        /* the telescoping seam, at its own row on each chimney */
        if (body > 6) {
          var sy = y + 2 + hash(p.i * 17 + 5) % (body - 5);
          rect(ctx, x + 1, sy, w - 2, 1, K.steelDeep);
          rect(ctx, x + 1, sy + 1, w - 2, 1, K.steelLit);
        }
        /* the canopy: the glass seen nearly edge-on, the steel under it,
           the outline on the gap's edge */
        rows = capRows(ch, P.hoodGlass, P.hoodGlassClear, K.steel, P.outline); n = rows.length;
        rows[0] = P.hoodGlass;
        for (i = 0; i < n; i++) {
          var inset = (rows[i] === K.steel || i === n - 1) ? 1 : 0;
          rect(ctx, x - ov + inset, y + h - n + i, w + (ov - inset) * 2, 1, rows[i]);
        }
        Tint.rect(ctx, x + w, y, ov, body, P.void, 6);
        return;
      }
      /* the Dutch ovens, whole ones from the stone up */
      var unit = Math.max(5, Math.round(21 * S.k)), yb = y + h, j = 0, under = y + ch;
      while (yb - unit >= under + 3) {
        var uy = yb - unit, px = x + (j === 0 ? 0 : (hash(p.i * 13 + j) % 3) - 1);
        rect(ctx, px - 1, uy, w + 2, unit, P.outline);
        rect(ctx, px + (w >> 1) - 1, uy, 2, 1, K.steelLit);
        rect(ctx, px + 1, uy + 1, w - 2, 1, K.enamelHi);
        rect(ctx, px, uy + 2, w, unit - 4, K.enamel);
        rect(ctx, px + 2, uy + 2, 2, unit - 4, K.enamelHi);
        rect(ctx, px + w - 4, uy + 2, 2, unit - 4, K.enamelMid);
        rect(ctx, px, uy + unit - 2, w, 1, K.enamelDeep);
        if (unit >= 7) { rect(ctx, px - 2, uy + 3, 1, 2, K.enamelMid); rect(ctx, px + w + 1, uy + 3, 1, 2, K.enamelDeep); }
        yb = uy; j++;
      }
      /* the top pot, cut to whatever is left under the lid */
      if (yb > under) {
        rect(ctx, x - 1, under, w + 2, yb - under, P.outline);
        rect(ctx, x, under, w, yb - under, K.enamelMid);
        rect(ctx, x + 2, under, 2, yb - under, K.enamel);
      }
      /* the big lid: the dome lit along its top, the outline under it,
         and the knob let into its crown */
      rect(ctx, x - ov, y, w + ov * 2, ch, P.outline);
      rect(ctx, x - ov + 1, y, w + ov * 2 - 2, ch - 1, K.enamel);
      rect(ctx, x - ov + 2, y, w + ov * 2 - 4, 1, K.enamelHi);
      rect(ctx, x + (w >> 1) - 1, y - 1, 2, 1, K.steelLit);
      Tint.rect(ctx, x + w + 1, y + ch, ov, h - ch, P.void, 6);
    },
    /* THE LID, the house's ceiling band in miniature: the plaster, a
       pendant on its rod every so often riding with the lid, the crown
       and its shade, and the outline on the kill line */
    ceiling: function (ctx, S) {
      var x = S.x, y = S.y, w = S.w, d = S.top - S.y, k;
      var ol = d >= 6 ? 2 : 1, plaster = Math.max(1, d - ol - 2);
      rect(ctx, x, y, w, plaster, K.plasterMid);
      var pp = Math.round(w * 0.55);
      for (k = -1; k < 3; k++) {
        var lpx = x + Math.round(wrap(w * 0.3 - S.s, pp)) + k * pp;
        if (lpx < x - 12 || lpx > x + w + 12) continue;
        Tint.rect(ctx, lpx - 9, y, 19, plaster, K.plasterLit, 7);
        Tint.rect(ctx, lpx - 9, S.top, 19, Math.max(2, Math.round(4 * S.k * 2.4)), K.lampGlow, 3);
        var gh = Math.min(3, plaster - 1);
        if (gh >= 2) {
          rect(ctx, lpx, y, 1, plaster - gh, K.lampRod);
          rect(ctx, lpx - 1, y + plaster - gh, 3, gh, P.outline);
          rect(ctx, lpx - 1, y + plaster - gh, 3, gh - 1, K.lampGlass);
          dot(ctx, lpx, y + plaster - gh + 1, K.lampCore);
        } else dot(ctx, lpx, y + plaster - 1, K.lampCore);
      }
      rect(ctx, x, S.top - ol - 2, w, 1, K.crown);
      rect(ctx, x, S.top - ol - 1, w, 1, K.crownShade);
      rect(ctx, x, S.top - ol, w, ol, P.outline);
    },
    /* the kill row: one row a value step darker - the stone under it is
       already there, painted by `back` */
    floor: function (ctx, S) {
      rect(ctx, S.x, S.floor, S.w, 1, mix(K.quartzShade, K.quartzDeep, 0.3));
    },
    /* THE STOVE, in the even spans: the cooktop's black glass lying in
       the stone under the span's middle, straddling the kill row as in
       the bay, its rings as flat dashes, the centre one glowing up before
       the fire. Its column never climbs into the doodad's line. */
    props: function (ctx, S) {
      var fy = S.floor;
      for (var i = 0; i < S.spans.length; i++) {
        var sp = S.spans[i];
        if (wrap(sp.i, 2)) continue;
        var stx = Math.round((sp.x0 + sp.x1) / 2);
        var cw = Math.max(5, Math.min(Math.round(0.30 * (sp.x1 - sp.x0)), Math.round(62 * S.k)));
        var dl = Math.max(2, Math.round(cw * 0.35)), rw = Math.max(2, Math.round(cw * 0.3));
        rect(ctx, stx - cw + 2, fy - 1, (cw - 2) * 2, 1, K.blackGlassLit);
        rect(ctx, stx - cw + 1, fy, (cw - 1) * 2, 2, K.blackGlass);
        rect(ctx, stx - cw, fy + 2, cw * 2, 2, K.blackGlass);
        rect(ctx, stx - cw, fy + 4, cw * 2, 1, K.blackGlassDeep);
        rect(ctx, stx - cw + 2, fy, dl + 1, 1, K.blackGlassLit);
        rect(ctx, stx - cw + 2, fy + 2, dl, 1, K.blackGlassHi);
        rect(ctx, stx + cw - 2 - dl, fy + 2, dl, 1, K.blackGlassHi);
        /* the phase off the span, so two stoves on one card are never in step */
        var wave = Math.sin(S.t * 2.2 + sp.i * 1.7);
        var fire = clamp(wave * 1.4 + 0.2, 0, 1);
        var tell = fire > 0 ? 1 : clamp(wave * 1.4 + 1.2, 0, 1);
        rect(ctx, stx - rw, fy + 2, rw * 2, 1, tell < 0.05 ? K.blackGlassHi : (tell < 0.6 ? FX.heatEdge : FX.hotHi));
        if (tell >= 0.6) { rect(ctx, stx - rw - 1, fy + 1, rw * 2 + 2, 1, FX.hot); Tint.rect(ctx, stx - rw - 3, fy, rw * 2 + 6, 4, FX.hot, 6); }
        /* the column, pulsing up and down out of its ring: its embers
           three rows over its top stay under the doodad's line */
        var reach = Math.max(0, fy - sp.line.bottom - 4), colH = Math.round(reach * fire);
        if (colH < 3) continue;
        var fw = Math.max(4, 2 * Math.round(S.pw * 0.25)), hw = fw >> 1, ct = fy - colH;
        rect(ctx, stx - hw, ct, 1, colH, FX.heatEdge);
        rect(ctx, stx + hw - 1, ct, 1, colH, FX.heatEdge);
        rect(ctx, stx - hw + 1, ct, fw - 2, colH, FX.hot);
        if (fw >= 6) rect(ctx, stx - hw + 2, ct + 1, fw - 4, colH - 1, FX.hotMid);
        rect(ctx, stx - 1, ct + 2, 2, colH - 2, FX.hotHi);
        rect(ctx, stx - hw + 1, fy, fw - 2, 2, FX.hotHi);
        dot(ctx, stx - 2, ct - 2, FX.hot); dot(ctx, stx + 1, ct - 3, FX.hotMid);
        var pool = Math.max(2, Math.round(6 * S.k * 2.4));
        Tint.rect(ctx, stx - cw, fy - pool, cw * 2, pool, FX.hot, 4);
      }
    },
    /* a skillet tumbling end over end through four frames, and its
       shadow on the stone tightening as it comes down */
    drop: function (ctx, d, S) {
      var fr = Math.floor(S.t * 6) % 4, x = d.x, y = d.y, i;
      var L = S.k >= 0.3 ? 3 : 2, H = S.k >= 0.3 ? 4 : 2;
      var sw = Math.max(2, Math.round((8 - 4 * d.f) * S.k * 2.4));
      Tint.rect(ctx, x - (sw >> 1), S.floor + 1, sw, 1, P.shadeCool, 4);
      if (fr === 0) { rect(ctx, x - L, y, L * 2 + 1, 2, P.iron); rect(ctx, x - L - H, y, H, 1, P.iron); }
      else if (fr === 1) { for (i = 0; i < L * 2; i++) dot(ctx, x - L + i, y - L + i, P.iron); dot(ctx, x - L - 1, y - L - 1, P.iron); }
      else if (fr === 2) { rect(ctx, x, y - L, 2, L * 2 + 1, P.iron); rect(ctx, x, y - L - H, 1, H, P.iron); }
      else { for (i = 0; i < L * 2; i++) dot(ctx, x + L - i, y - L + i, P.iron); dot(ctx, x + L + 1, y - L - 1, P.iron); }
    }
  };

  /* ===================================================== GENERATION */

  /* A pillar works out its own stack of pots when it is made (see
     planStack), and writes itself into the run's ledger: where this
     bay's left plank is, how far it is from the last one, and how many
     there have been - makeSpikes and makeBoon for the same bay run
     straight after this, and the stove has to know all three. */
  function makePillar(x, gapY, gapH, run) {
    var v = Math.random();
    var ob = { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
               variant: v < 0.45 ? 0 : (v < 0.75 ? 1 : 2), scored: false, seed: randInt(1, 100000) };
    ob.stack = planStack(FLOOR - (ob.gapY + ob.gapH + 9) + 1, ob.seed);
    if (run && run.ledger) {
      var L = run.ledger;
      if (L.plank) L.spacing = x - L.plank.x;
      L.plank = ob;
      L.n = (L.n || 0) + 1;
    }
    return ob;
  }

  /* ========================================================= THE STOVE

     THE BAY'S OWN HAZARD, and the owner's words: the stove "comes past
     on the ground, shooting up tall pillars of fire at the player". It
     is the island's own cooktop - the black glass set into the quartz in
     the play plane, the kill row running through it, its four rings (its
     hood is the chimneys) - and it comes past in the engine's spike slot,
     between two planks, on the stone. The column grows out of its centre
     ring. Every one that comes past FIRES, once, at him,
     and every shot is told: the rings glow, the burner clicks twice,
     sparks climb the line the column will stand on to the height it
     will reach, and then it goes up with a whump.

     WHERE IT STANDS. The engine stands a spike at mid +-14; the stove
     ignores that and puts its centre rings at mid + 6 - with the
     prediction of the next plank the Table's bottle uses - because the
     free span between the two caps is centred at mid + 17 and the sums
     below want the column 60 px past the left cap and 82 short of the
     right one at the tightest tune. NEVER IN TWO BAYS RUNNING, NOR WITH
     ONE BETWEEN: two cooktops 184 px apart would overlap by 90 and the
     house has one, and two climbs a bay apart left no time to come back
     down between them. A stove too close to the last is refused and a
     crumb stands in its slot - so the engine's spike odds are the odds
     of a stove in any bay that is allowed one.

     THE CLOCK (stepWorld, per stove, in seconds, so pause freezes it;
     drawing and rectsFor read the same fields, so they cannot disagree):

        cold -> tell 1.10 s -> rise 0.35 -> hold 0.50 -> die 0.30 -> spent

     It starts the tell when the ring is 1.85 v ahead of him (0.4 s of
     lead past the column being full) and on the screen; nothing is
     aimed at him in the grace after a save, and a stove that could only
     fire behind him once the grace is over passes cold.

     HOW TALL. The column stands from the kill row to 30 px under the top
     of the LOWER of the two gaps either side of it, never above row 111:
     a doodad threading the lower gap at 62% must climb 34 px to clear it,
     one hugging that gap's top clears it with 8 to spare, and the lid's
     own lane (apex 35, a flap's reach 84) keeps a 15-row window over the
     tallest column. With both gaps high it is 131 px; no gap sits lower
     than row 126, so it is never under 86 - tall, as the owner said, 40
     to 60% of the lane in every run. It spans the whole height from the
     kill row: there is no flying under it.

     THE ESCAPE, at the tightest tune (v 176, spacing 184): the ring is
     60 px past the left cap's edge. The glow starts 326 px out; the column
     is full at px + 70 and its body reaches his hitbox 0.28 s later; the
     left cap's edge is 10 px ahead of him at that moment, so he leaves the
     gap 0.12 s after the column is full and has 0.16 s to climb 34 px,
     which a flap at the gap's mouth does (a beat is 48). That is why the
     tell runs 1.45 s before the column is full: the climb is made in the
     gap, on the warning, not after it. At the start (v 116, spacing 226)
     the column is full with the cap 35 px behind him and 0.52 s to climb.
     It dies at px - 18 and he is clear of it with the right cap 62+ px
     ahead and the column's top already adapted to the lower gap. The
     other two ways out are BACK (hold left in the tell) and the DASH
     (steer right while the rings glow and the column rises behind you).

     AND MEASURED, because stacked fairness rules once neutered the Fort's
     shooters to one shot in thirty seconds: a pilot that answers the tell
     (flies the lower gap as high as its cap allows, then climbs to the
     height the sparks showed it) was not hit by a single column in sixteen
     minutes of runs; its fire hits, a quarter of a minute, are all late
     doubles. The same pilot ignoring the stove is hit by four columns in
     five that fire.

     IN THE LATE PHASE (tune.lateScore) nearly half the stoves light the
     large left ring too, on the same clock: a second column 30 px nearer
     him, 22..51 px past the left cap, standing to 58 px under the left
     gap's top, which asks him to come through that gap high and stay
     there - WARN.late says so first. */
  var T_TELL = 1.10, T_RISE = 0.35, T_HOLD = 0.50, T_DIE = 0.30, T_AHEAD = 0.40;
  var COL_MIN_TOP = 111, COL_MAX_TOP = 200;
  var DBL_CHANCE = 0.45;
  /* the left ring's column, just past the mouth of the left gap, stands
     to 58 px under that gap's top: coming out of the gap his centre must
     be at most 47 px under its top as he crosses it - a 36 px band, wider
     than half a flap's 48 px rise and fall, with 22..51 px of travel past
     the cap to make it in. Tied to the gap's top, not its depth, because
     the band is what the player flies. */
  var DBL_TOP = 58;
  /* the fewest planks from one stove to the next: two clear bays between
     them, so one climb over a column is never followed by the next
     column's tell before he is back down in a gap */
  var STOVE_GAP = 3;

  /* WHERE THE STOVE IS. The engine scrolls ob.x and nothing else, so
     the centre and every column are read off it each time they are
     wanted - stored, they would stand still while the stove slid away. */
  function stoveC(ob) { return ob.x + COOK_HALF; }

  /* THE STOVE'S STATE IS ALL NUMBERS AND FLAGS, never strings or lists,
     because Buster's tape (js/scene_play.js, tapeSnap) records exactly
     the number and boolean fields of everything in the world and plays
     them back: kept that way, rewinding a stove draws its column back
     down into the ring and replays the clock from where the tape stops.
     A state word or a list of columns would be left where it was while
     the stove slid back under it. So: ob.st is the state, ob.nc how many
     columns, and column i is ob.dx<i> (off the centre), ob.H<i> (its full
     height) and ob.h<i> (its height now) - 0 the centre rings, 1 the left
     ring of a double. */
  var ST_COLD = 0, ST_TELL = 1, ST_RISE = 2, ST_HOLD = 3, ST_DIE = 4, ST_SPENT = 5;
  var ST_NAMES = ['cold', 'tell', 'rise', 'hold', 'die', 'spent'];
  function colDx(ob, i) { return i ? ob.dx1 : ob.dx0; }
  function colH(ob, i) { return i ? ob.H1 : ob.H0; }
  function colh(ob, i) { return i ? ob.h1 : ob.h0; }
  function setColh(ob, i, v) { if (i) ob.h1 = v; else ob.h0 = v; }
  function colX(ob, i) { return ob.x + COOK_HALF + colDx(ob, i); }

  function crumb(x) {
    return { type: 'litter', x: x, w: 18, kind: 0, seed: randInt(1, 100000) };
  }

  function makeSpikes(x, side, count, maxLen, run) {
    var L = run && run.ledger;
    if (!L || !L.plank) return crumb(x);
    if (L.stoveN !== undefined && L.n - L.stoveN < STOVE_GAP) return crumb(x);
    var S = L.spacing > 0 ? L.spacing : 184;
    var c = Math.round(L.plank.x + S / 2 + 6 + rand(-4, 4));
    /* ob.keep: a spare life does not take the island's cooktop out of the
       island (the engine's save sweep honours it). The grace is what keeps
       him safe from it - a cold stove waits the grace out, and a column
       already up burns on through a doodad that cannot be hurt. */
    var ob = { type: 'spike', side: 'floor', stove: true, keep: true,
               x: c - COOK_HALF, w: COOK_HALF * 2,
               st: ST_COLD, t: 0, nc: 0, dx0: 0, H0: 0, h0: 0, dx1: DBL_DX, H1: 0, h1: 0,
               wisps: [], glow: 0,
               dbl: chance(DBL_CHANCE), shots: 0, ticked: false,
               spikes: [] };           /* named by the contract; a stove is not made of spikes */
    L.stove = { c: c, plank: L.plank, ob: ob };
    L.stoveN = L.n;
    var st = stats(L);
    st.stoves++;
    return ob;
  }

  /* the run's tally of what the stove did, for the headless counts */
  function stats(L) {
    if (!L.isl) L.isl = { stoves: 0, tells: 0, fires: 0, doubles: 0, spent: 0, blastPan: 0, blastGift: 0, nearPass: 0 };
    return L.isl;
  }

  /* the pillars either side of a column, off the live list */
  function neighbours(obstacles, cx) {
    var left = null, right = null;
    for (var i = 0; i < obstacles.length; i++) {
      var o = obstacles[i];
      if (o.type !== 'pillar') continue;
      if (o.x < cx && (!left || o.x > left.x)) left = o;
      if (o.x > cx && (!right || o.x < right.x)) right = o;
    }
    return [left, right];
  }

  function aimColumns(ob, obstacles, run) {
    var c = stoveC(ob), nb = neighbours(obstacles, c), left = nb[0], right = nb[1];
    var gapTop = Math.max(left ? left.gapY : 0, right ? right.gapY : 0);
    if (!left && !right) gapTop = 100;
    var top = clamp(gapTop + 30, COL_MIN_TOP, COL_MAX_TOP);
    ob.nc = 1; ob.dx0 = 0; ob.H0 = FLOOR - top; ob.h0 = 0; ob.h1 = 0;
    if (run.late && ob.dbl && left) {
      var top2 = clamp(left.gapY + DBL_TOP, COL_MIN_TOP, FLOOR - 30);
      ob.nc = 2; ob.dx1 = DBL_DX; ob.H1 = FLOOR - top2;
    }
  }

  /* the stove's clock: the only function that changes a stove's state */
  function stepStove(ob, dt, obstacles, run) {
    var L = run.ledger, st = stats(L), i;
    ob.t += dt;
    var v = run.speed || 116, px = run.px || 116, c = stoveC(ob);
    if (ob.st === ST_COLD) {
      if (run.grace || run.under) { ob.waited = true; return; }
      if (ob.waited && c < px + (T_TELL + T_RISE) * v - 30) { ob.st = ST_SPENT; ob.t = 0; st.spent++; return; }
      if (c <= px + (T_TELL + T_RISE + T_AHEAD) * v && c <= 470) {
        ob.st = ST_TELL; ob.t = 0; ob.shots++; ob.glow = 0; ob.ticked = false;
        aimColumns(ob, obstacles, run);
        st.tells++;
        if (!L.cry) L.cry = 'tick';
      }
      return;
    }
    if (ob.st === ST_TELL) {
      ob.glow = ob.t < 0.3 ? ease(ob.t / 0.3) : 0.75 + 0.25 * Math.sin(ob.t * 38);
      if (!ob.ticked && ob.t >= 0.55) { ob.ticked = true; if (!L.cry) L.cry = 'tick'; }
      if (ob.t >= T_TELL) {
        ob.st = ST_RISE; ob.t = 0;
        L.cry = 'ignite'; L.shake = 1.4;
        st.fires++;
        if (ob.nc > 1) st.doubles++;
      }
      return;
    }
    if (ob.st === ST_RISE) {
      ob.glow = 1;
      for (i = 0; i < ob.nc; i++) setColh(ob, i, colH(ob, i) * ease(ob.t / T_RISE));
      if (ob.t >= T_RISE) { ob.st = ST_HOLD; ob.t = 0; for (i = 0; i < ob.nc; i++) setColh(ob, i, colH(ob, i)); }
    } else if (ob.st === ST_HOLD) {
      if (ob.t >= T_HOLD) {
        ob.st = ST_DIE; ob.t = 0;
        for (i = 0; i < ob.nc; i++) {
          for (var k = 0; k < 4; k++) ob.wisps.push({ x: colX(ob, i) + rand(-6, 6), y: FLOOR - colH(ob, i) - rand(0, 10), vx: rand(-8, 8), age: rand(-0.2, 0) });
        }
      }
    } else if (ob.st === ST_DIE) {
      for (i = 0; i < ob.nc; i++) setColh(ob, i, colH(ob, i) * (1 - ease(ob.t / T_DIE)));
      if (ob.t >= T_DIE) { ob.st = ST_SPENT; ob.t = 0; ob.h0 = 0; ob.h1 = 0; }
    } else if (ob.st === ST_SPENT) {
      ob.glow = Math.max(0, ob.glow - dt);
    }
    /* how close he came: a live column within 40 px of him while his
       hitbox reaches below 20 px over its top - the near pass, once a shot */
    if (!ob.near && (ob.st === ST_RISE || ob.st === ST_HOLD)) {
      for (i = 0; i < ob.nc; i++) {
        if (Math.abs(colX(ob, i) - px) < 40 + COL_HALF && (run.py || 0) + (run.hr || 11) > FLOOR - colh(ob, i) - 20) { ob.near = true; st.nearPass++; break; }
      }
    }
  }

  /* ONE MAKER FOR THE PANS AND ALL FOUR POWER-UPS. The engine says spicy
     (and may make it sour after); the gold pan is rolled here so the
     sprite knows. `want` is Crow's ORDNANCE: 'gold' makes the +5 on
     request and 'plain' makes anything but, and NEITHER touches this
     bay's own gold dice. */
  function makeDrop(x, spicy, fall, run, want) {
    var gold = want === 'gold';
    if (!spicy && !gold && want !== 'plain') {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var k = Math.random();
    var ob = { type: 'drop', x: x, y: CEIL + 5, vy: fall, vx: 0, spicy: !!spicy, gold: gold, broken: 0,
               w: 26, kind: k < 0.5 ? 0 : (k < 0.8 ? 1 : 2), spin: rand(0, TAU),
               /* heavier than a fork, a slower tumble: 4..7 rad/s is 10..18
                  silhouette changes a second */
               spinRate: rand(4, 7) * (chance(0.5) ? -1 : 1), flip: chance(0.5),
               landCry: 'clang', burst: [K.steelLit, K.steelShade], splat: SPLAT_TIME };
    if (spicy) {
      ob.w = 12; ob.landCry = 'tock'; ob.burst = [P.hotSauceHi, P.hotSauce]; ob.splat = 1.4;
      ob.spin = 0; ob.spinRate = 0;
    }
    if (gold) {
      ob.w = 24; ob.name = GOLD_NAME; ob.kind = 0;
      ob.spinRate = 2.5 * (chance(0.5) ? -1 : 1);
      ob.landCry = 'clang'; ob.burst = [P.craneHi, P.craneGold]; ob.splat = 1.2;
    }
    return ob;
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 18, kind: randInt(0, 2), seed: randInt(1, 100000) };
  }

  /* THE GLUTATHIONE, standing on the stone. In a stove's bay it moves to
     the right of the aimed ring, in front of the pot: 44 px clear of the
     column's centre, never under it, never in its blast. A player who
     dashed past the glowing ring dives for it; one who went high over
     the fire has passed it. */
  function makeBoon(x, run) {
    var L = run && run.ledger;
    if (L && L.stove && L.stove.plank === L.plank) x = L.stove.c + 44;
    return { type: 'boon', x: x, y: FLOOR - 12, w: 16, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0, name: BOON_NAME,
             burst: [P.tealHi, P.teal, P.lifePale, P.lifeJade] };
  }

  /* --------------------------------------------------------- physics

     stepDrop owns every drop; the engine's default never runs here.
       - A PAN falls at DROP_GRAV and tumbles; the power-ups fall at 170.
       - THE FIRE BLASTS WHAT FALLS INTO IT, the owner's "this fire can
         also blast things back up, the pans and power-ups". A drop that
         comes down within 26 px of a live column, anywhere from 30 px
         over its top to the stone, is thrown back up and forward (see
         BLAST_VY below for which way) with a faster spin, trailing
         embers: a pan climbs about 110 px and sails back over his head,
         harmless until it tops out (see rectsFor), and comes down behind
         him; a power-up goes up and on, and comes down round him,
         catchable anywhere on its arc. The engine's tick and two chips come with it
         (ob.bounced), and a sizzle. */
  /* WHICH WAY THE FIRE THROWS. A pan goes UP AND BACK, over his head;
     a power-up goes UP AND ON, ahead of him. Two cuts measured why:
       - thrown straight up (-300 and a nudge), a pan left the column's
         top just as he crossed over it, and the one place the stove tells
         him to be was the one place it came through: two in five of the
         pans the fire threw hit a pilot that had cleared the column;
       - thrown up and forward, it stood off ahead of him as it climbed -
         and the room, going by at 116..176, carried it back over him as it
         came down: one in four still hit him, on the way down.
     Thrown back at 80 px/s against the scroll, a pan passes over his head
     while it is still climbing - and a pan the fire has thrown has no box
     until it tops out (rectsFor) - and comes down behind him. The fire
     throws the danger away and the gifts forward: a hot sauce or a
     watermelon goes up more gently (it is light) and on at 150 px/s, and
     comes down round him, catchable all the way. */
  var BLAST_VY = -255, BLAST_VX = -80;
  var GIFT_VY = -200, GIFT_VX = 150;

  function stepDrop(ob, dt, obstacles, run) {
    settle(ob);
    var gift = ob.gold || ob.spicy || ob.sour || ob.whirl;
    ob.vy += (gift ? GIFT_GRAV : DROP_GRAV) * dt;
    ob.y += ob.vy * dt;
    if (ob.vx) { ob.x += ob.vx * dt; ob.vx *= 1 - 0.6 * dt; }
    ob.spin += ob.spinRate * dt;
    if (run && run.ledger && obstacles) {
      for (var i = 0; i < obstacles.length; i++) {
        var s = obstacles[i];
        if (s.type !== 'spike' || !s.stove || !s.nc) continue;
        for (var k = 0; k < s.nc; k++) {
          var hk = colh(s, k);
          if (hk < 4) continue;
          if (Math.abs(ob.x - colX(s, k)) > 26) continue;
          if (ob.y < FLOOR - hk - 30 || ob.y > FLOOR + 4) continue;
          /* once a blast has it going up it is not blasted again on the way */
          if (ob.vy < -60 || run.time - (ob.blastT === undefined ? -9 : ob.blastT) < 0.3) continue;
          ob.vy = (gift ? GIFT_VY : BLAST_VY) + rand(-20, 20);
          ob.vx = (gift ? GIFT_VX : BLAST_VX) + rand(-25, 25);
          ob.spinRate *= 1.6;
          ob.blastT = run.time; ob.blasts = (ob.blasts || 0) + 1;
          ob.bounced = true;
          if (!run.ledger.cry) run.ledger.cry = 'sizzle';
          var st = stats(run.ledger);
          if (gift) st.blastGift++; else st.blastPan++;
        }
      }
    }
    return ob.vy > 0 && ob.y >= FLOOR - 4;
  }

  /* The room's own step: every stove's clock, its smoke. */
  function stepWorld(dt, obstacles, run) {
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'spike' || !ob.stove) continue;
      stepStove(ob, dt, obstacles, run);
      for (var k = ob.wisps.length - 1; k >= 0; k--) {
        var w = ob.wisps[k];
        w.age += dt;
        w.x -= (run.speed || 0) * dt;
        if (w.age < 0) continue;
        w.y -= 18 * dt; w.x += w.vx * dt;
        if (w.age > 1.2) ob.wisps.splice(k, 1);
      }
    }
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one. */
  function columnBoxes(ob, out) {
    for (var i = 0; i < ob.nc; i++) {
      var h = Math.round(colh(ob, i));
      if (h <= 0) continue;
      out.push([Math.round(colX(ob, i)) - COL_HALF, FLOOR - Math.min(h, FLAME_H), COL_HALF * 2, Math.min(h, FLAME_H)]);
    }
    return out;
  }

  function rectsFor(ob, out) {
    var i;
    if (ob.type === 'pillar') {
      /* the Coop's four boxes verbatim */
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, 34, topH]);
      out.push([ob.x - 4, ob.gapY - 9, 42, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, 42, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, 34, botH]);
    } else if (ob.type === 'spike') {
      /* THE FIRE, and only the fire: the body of each live column, from
         the stone to its top. The glass, the rings, the pot, the light,
         the aim's sparks, the licks and tongues and the root's flare, and
         the smoke are all harmless and unboxed. */
      if (ob.stove) columnBoxes(ob, out);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      settle(ob);
      var kind = kindOf(ob);
      if (kind === 'gold') out.push([ob.x - 10, ob.y - 6, 20, 12]);
      else if (kind === 'sauce') out.push([ob.x - 4, ob.y - 9, 9, 19]);
      else if (kind === 'melon') out.push([ob.x - 7, ob.y - 5, 15, 11]);
      else if (ob.blasts && ob.vy < 0) {
        /* A PAN THE FIRE HAS THROWN IS HARMLESS UNTIL IT TOPS OUT. It is
           thrown from the column he has just been made to fly over, and
           measured, a pan that killed on the way up killed a player who
           had done exactly what the stove told him to: two in five of the
           pans thrown hit a pilot that had cleared the column. So it has
           no box while it climbs, and a pan's boxes again from its apex
           on - by which time it has gone back over his head (BLAST_VX). */
      } else {
        /* FIVE SMALL SQUARES ALONG THE PAN at the frame's own angle,
           quantised exactly as it is drawn */
        var th = panFrame(ob) * TAU / 16, c = Math.cos(th), s = Math.sin(th);
        var bx = Math.round(ob.x), by = Math.round(ob.y), boxes = PAN_BOX[ob.kind];
        for (i = 0; i < boxes.length; i++) {
          var u = boxes[i][0], v = boxes[i][1], z = boxes[i][2];
          out.push([bx + c * u - s * v - z / 2, by + s * u + c * v - z / 2, z, z]);
        }
      }
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 7, FLOOR - 23 + ob.dy, 14, 23]);
    }
    return out;
  }

  /* for the headless checks, read-only */
  function stoveState(ob) {
    var cols = [];
    for (var i = 0; i < ob.nc; i++) cols.push({ x: colX(ob, i), H: colH(ob, i), h: colh(ob, i) });
    return { state: ST_NAMES[ob.st], t: ob.t, glow: ob.glow, c: stoveC(ob), cols: cols };
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, COVER: COVER, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME, CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor, drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop, GOLD_GIFT: true,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld,
    rectsFor: rectsFor,
    /* for the headless checks: the stove's clock and its boxes, read-only */
    stoveState: stoveState, columnBoxes: columnBoxes, camRow: camRow
  };
})();
