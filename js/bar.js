/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM / THE BAR

   Evening, the pendants on. You are flying along the top of the
   CHARCOAL BAR CABINET that stands against the half wall, between
   stacks of dark wooden spirit boxes and white footed planters, under
   the grey-washed ledge of the half wall, with the kitchen beyond it -
   the shaker cabinets, the fridge with its photographs, the amber
   pendant hanging in front of the stone and the dark television - showing
   as a sliver over the top. Drawn from Bar ref 1-5 in Assets/Concept:
   ref 5 is the composition (kitchen, ledge, cream wall, white chair rail,
   bar top, the box, the envelope, the humidifier, the photographs, the
   planter, the pinecones), ref 3 is the spirit box and the humidifier
   close up, ref 1 and 2 the still life (the paper tent with its twig
   fire and the RIP note, the snowman, the rock, the cell-textured pot),
   and ref 4 the same cabinet after dark with its open shelf - the red
   book, the board game, the clock - between the two mesh doors. The
   lamp in ref 1-3 throws long soft shadows of everything on the bar up
   the wall, and so does this one; and since a home bar is bottles and
   glasses, a nearer layer of them stands along the back of the bar top.

   THE SIGNATURE IS THE HUMIDIFIER, and it is the one obstacle in the
   game that kills nothing. It stands on the bar against the wall - the
   frosted, snow-speckled dome on its white base from Bar ref 3, never
   off the screen, sliding slowly by at the wall's parallax - and from
   the late score it clears its throat. The ring at its foot lights,
   three small chuffs come out of the nozzle with a hiss, and a second
   and a half later it SPRAYS: a column of mist climbs out of the apex
   and billows, and a fog rolls out of it across the whole room, so that
   for three seconds the wall, the stacks and the corks are seen through
   about half a value of vapour. Then it clears. See THE MIST.

   What it may not hide is anything a player needs. The doodad, the HUD
   and Pepper's sight lines are drawn after it; the fog is clipped to the
   lane, so the two kill edges - the ledge's outline and the bar top's
   arris - stay crisp, and so does every spot a falling cork throws on
   the bar. A stack in the fog is still a dark line round a lighter
   field; a cork in it is still a dark ring. What the fog takes away is
   the wall, which is the one thing nobody needed.

   THE CORKS ARE THE BAY'S DROPS: they leave the ledge with a little
   pace, tumble end over end, TOCK on the bar, take ONE hop and lie down,
   and a cork lying down is nothing. THE RECORD is the spin: a 7-inch
   single flipping as it falls, the only purple thing in the room. THE
   PINECONE on the bar is the spare life. There are no spikes, no heat,
   no lime and no gold in here.

   THE PILLARS ARE THE OWNER'S PICK: stacked wooden spirit boxes - Bar
   ref 3's dark red-brown presentation box with its hinged lid and a
   brass plaque low on the front, with no word anywhere on it - and the
   white, cell-textured, three-footed planter from Bar ref 1, the lower
   ones with the peace lily growing out of the top. Both stand on the
   bar top, both hang from the ledge.

   Same discipline as every other level file: every pixel in here is
   generated and baked once in build(), and any shade laid over anything
   that scrolls is a flat Tint or a baked alpha sheet, never a Dither.
   There is no call to Dither.rect anywhere in this file. The corks and
   the record turn by swapping quarter-turn frames, never by ctx.rotate.
------------------------------------------------------------------ */
'use strict';

var Bar = (function () {

  /* the house: the bar's charcoal, the ledge's grey wash, the kitchen,
     the lamp glass, the plants, and the two darks everything falls into */
  var H = DiningRoom.P;
  var CEIL = DiningRoom.CEIL, FLOOR = DiningRoom.FLOOR;
  var wrap = DiningRoom.wrap, hash = DiningRoom.hash;
  var ease = DiningRoom.ease, rgba = DiningRoom.rgba;
  var ringOf = DiningRoom.ringOf, blitBelowCeil = DiningRoom.blitBelowCeil;

  /* The bay's own pigments. PlayScene never reads this table. Evening
     values: Bar ref 4 is the cabinet after dark, and the cream wall in
     it has gone a warm grey-beige two steps under the daylit shots. */
  var P = {
    /* the cream wall after dark, Bar ref 4 */
    wall:          '#a69d8c',   /* lum 158 */
    wallTooth:     '#b2a998',
    wallToothDark: '#978e7e',
    /* the white chair rail, Bar ref 1/5 */
    railLit:       '#dad4c7',
    rail:          '#c7c0b2',
    railShade:     '#8d8679',
    /* The bar top's lit arris, which is the kill edge: the pale distress
       catching the pendant along the back of the slab. 138 on a body of
       48, the brightest row in the band by ninety - nothing a player has
       to read the floor by is in doubt. */
    barArris:      '#8f8a83',
    distress:      '#6f6a64',   /* the dry-brush streaks, Bar ref 1-3   */
    mesh:          '#4a4744',   /* the door panels' wire, Bar ref 4     */
    /* the open shelf, Bar ref 4 */
    book:          '#7a2a2a',  bookLit: '#9a4040',
    boardWood:     '#b58a52',
    pegPurple:     '#6a2fb0',  pegRed: '#c23a3a',  pegBlue: '#3b8fc9',
    clockFace:     '#efece6',  clockRim: '#2a2826',
    /* THE SPIRIT BOX, Bar ref 3: dark red-brown presentation box, brass
       plaque, no words. Two woods, because the photograph has both: the
       box is red-brown where the lamp reaches it and near-black walnut in
       its own shadow, and a run of one tone is a wall. */
    boxWood:       '#5c3a22',  boxLit: '#7d5433',  boxHi: '#9a6a42',
    boxShade:      '#3f2615',  boxDeep: '#2a1709',
    boxWood2:      '#4a2e1c',  boxLit2: '#6a4529', boxHi2: '#86593a',
    brass:         '#b58d3e',  brassLit: '#e0bd6a',
    /* THE PLANTER, Bar ref 1/5: white, cell-textured, three feet */
    potWhite:      '#e9e6df',  potHi: '#f7f5f0',   potCell: '#c9c5bc',
    potShade:      '#b3aea4',  potDeep: '#8e887d',
    soil:          '#3a2a1c',  soilLit: '#5a4330',
    /* THE HUMIDIFIER, Bar ref 3: frosted dome, white base */
    humDome:       '#d6d9db',  humDomeLit: '#eceef0', humDomeShade: '#b2b8bc', humSpeck: '#ffffff',
    humBase:       '#e8e6e2',  humBaseShade: '#b9b6b1', humNozzle: '#6c7378',
    ringIdle:      '#b9c6cc',  ringLit: '#9fd7e8',  ringHot: '#dcf5ff',
    /* THE MIST: one colour, a touch cool against an amber room so it
       reads as vapour and not as the wall getting brighter */
    mist:          '#dde1e3',   /* lum 223 */
    /* THE CORK */
    cork:          '#d8b47a',  corkLit: '#efd6a2',  corkShade: '#ad8853',  corkDeep: '#6e4d2a',
    wine:          '#6a2238',  wineLit: '#8d3552',
    /* THE RECORD, in the engine's purple verbatim, so the falling thing
       and the power it gives are one colour */
    vinyl:         '#1c1a1e',  vinylGroove: '#3a373d', vinylRim: '#5c5862', vinylShine: '#8e8a95',
    labelPurple:   '#b061f0',  labelHi: '#e6b3ff',  labelDark: '#5a2a8c',
    /* THE PINECONE, Bar ref 1/5 */
    cone:          '#8a5a30',  coneLit: '#b47f49',  coneShade: '#5a3619',  coneDeep: '#2f1a0b',
    /* the still life: the tent, the note, the twigs, the envelope, the
       prints, the snowman, the rock */
    paper:         '#e8df9a',  paperLine: '#c9bd6e', paperDeep: '#a3974c',
    note:          '#f1efe8',  ink: '#4a4a4a',
    twig:          '#6b4a2c',  ember: '#ff8a2a',
    kraft:         '#8e6d48',  kraftShade: '#6b5034',
    envelope:      '#ece8de',  envelopeShade: '#c6c1b5',
    stampRed:      '#b8433b',  stampBlue: '#4a6fa5',
    print:         '#e6e2d8',  printShade: '#b9b4a8',  printInk: '#6c6a64',
    snow:          '#dfeaf0',  snowHi: '#ffffff',  snowShade: '#a9bcc6',
    rock:          '#9c978e',  rockShade: '#6f6a62',
    /* the kitchen's own few things the house does not keep */
    tv:            '#1e2124',  tvFrame: '#3a3e42',
    photoSky:      '#6f8fb0',  photoLand: '#7a6a4a',
    picGround:     '#d9dfe2',
    /* the back of the bar: the glass, the foil, the blank labels, the
       steel, the slate */
    glassGreen:    '#203a2a',  glassGreenLit: '#3f6450', glassGreenDeep: '#14231a',
    glassBlack:    '#1d1c22',  glassBlackLit: '#4a4855', glassBlackDeep: '#111014',
    glassSpec:     '#9fbcae',
    foilRed:       '#6e1f2a',  foilRedLit: '#9a3a46',  foilRedDeep: '#4a1219',
    label:         '#d1c5a6',  labelShade: '#b1a588',  labelEdge: '#a39778',
    glassClear:    '#e9eeee',  glassRim: '#d6dddd',  glassEdge: '#aab2b2',  glassEdgeDim: '#7f8888',
    whisky:        '#a2621f',  whiskyLit: '#cf8a3c',
    slate:         '#46423f',  slateLit: '#615c57',  slateDeep: '#33302d',
    steelFace:     '#9aa0a3',  steelBright: '#d3d8da', steelDim: '#6a7073', steelJoint: '#454a4d',
    handle:        '#2f2a27',  handleLit: '#4e4743',
    /* the two hung photographs: light wood, and muted pictures */
    frame:         '#8d775c',  frameLit: '#a48d70',  frameShade: '#6c5944',
    photoHill:     '#6f7d74',  photoCoat: '#4f4a4a',  photoShirt: '#8a6f5a',
    photoSkin:     '#c4a088',  photoHair: '#3e3632',
    sepia:         '#8c7a5e',  sepiaLit: '#c2b293',  sepiaDeep: '#5c4c38',
    /* a spare life glows the same in every level */
    lifeJade:      '#5fae9a',  lifePale: '#93d8bd',
    /* the evening's shade: the Living Room's night, because the house
       publishes its void and its outline but not this one, and it is the
       same night through the same windows */
    night:         LivingRoom.P.nightShade,
    outline:       H.outline,  void: H.void
  };

  /* The neutral effect palette the engine paints its particles from.
     It never reads P. Evening dust is the Living Room's lamp-lit pair. */
  var FX = {
    motes: LivingRoom.AIR.motes, motesHi: LivingRoom.AIR.motesHi,
    /* a cork leaving the ledge is cork-coloured */
    puff:  '#c9a46b', puffHi: '#e2c58f',
    /* chips of charcoal distress off the bar top */
    ground: '#5a5550', groundHi: '#8f8a83',
    splat: '#c9a46b', splatHi: '#e2c58f',
    /* required keys; nothing hot ever falls in here */
    hot: '#f0922e', hotMid: '#ffb347', hotHi: '#ffe08a', heat: '#f0922e', heatEdge: '#b84d12',
    /* the only glowing pickup in this bay is purple */
    glowCore: '214,160,255', glowEdge: '150,80,220'
  };

  /* The heads-ups. The lid is a ledge and not a ceiling, so it says so -
     the Mantle's form: telling a player about a ceiling they cannot see
     is worse than telling them nothing. No spike line: nothing arms.
     No apostrophes anywhere: the font has none. */
  var WARN = {
    /* the rule, in five words: a cork lying down is nothing */
    drop: ['▼ CORKS ▼', 'ONE HOP, THEN THEY LIE STILL'],
    /* the telegraph, named - the hiss is the first of three */
    late: ['▲ MIST ▲', 'LISTEN FOR THE HISS'],
    ceil: ['▲ THE LEDGE ▲', 'THE HALF WALL IS SOLID']
  };

  /* the thirteen colours a generic cover would use. This bay paints its
     own, but the table stays honest: wall field, white stacks, charcoal
     ground, cork as the falling thing. */
  var PREVIEW = {
    back: P.wall, backAlt: P.wallTooth, seam: P.railShade,
    beam: P.potWhite, beamDark: P.potShade, beamLight: P.potHi,
    ground: H.char, groundDark: H.charDeep, groundHi: P.barArris,
    spike: P.cork, spikeHi: P.corkLit, air: H.lampGlow, gloom: H.void
  };

  var BOON_NAME = 'PINECONE';

  var T = {};              /* baked tiles and sprites */

  /* ONE render-side cache, and it is not per-run state. drawBackdrop is
     not handed `run` and cannot read the ledger; drawOverlay is, and it
     runs on every frame the scene draws. So drawOverlay writes the
     humidifier's ring level here at its END and the next frame's
     drawBackdrop reads it to pick the ring frame and the glow - the
     Mantle's scrollNow discipline. One frame of staleness after a RETRY
     shows the idle ring a frame late and nothing else. */
  var view = { ring: 0, src: null };

  /* ------------------------------------------------------- geometry

     The bay by screen row, Bar ref 5's proportions:

        0..11    THE KITCHEN beyond the half wall, a sliver: shaker
                 cabinets, the fridge, the stone and the dark TV, the
                 amber pendant. 0.12, it is across a room.
        12..23   THE LEDGE, grey-washed timber, 1.0. Row 23 is the kill
                 line, and nothing solid comes below it.
        24..241  THE WALL, 0.30: cream after dark, lit in warm pools with
                 dusk between them, two family photographs hung high, the
                 white chair rail at 186..195, and the still life on the
                 bar against it - the balloon print, the envelope, the
                 photographs, the paper tent - with THE HUMIDIFIER
                 standing among them at 192..241, and every one of them
                 throwing a long soft shadow up the wall.
        142..241 THE BACK OF THE BAR, 0.60: bottles, glasses, a decanter,
                 a shaker, standing on the bar's back edge under the rail,
                 nearer than the humidifier and behind the pillars.
        242..269 THE BAR TOP AND THE CABINET FACE, 1.0: the arris (the
                 kill edge), the charcoal slab, its lit front edge, and
                 the open shelf with the mesh doors either side.

     No 1.35 foreground layer: nothing on this bar is nearer the camera
     than the cabinet's own front edge. */
  var KITCHEN_H = 12;
  var LEDGE_Y = 12, LEDGE_W = 240;
  var WALL_H = FLOOR - CEIL;          /* 218 */
  var RAIL_Y = 186;                   /* screen row of the rail's top    */
  var KITCHEN_PAR = 0.12, WALL_PAR = 0.30;

  /* THE HUMIDIFIER'S PLACE. It rides the wall at 0.30 and the wall tile
     is exactly one screen wide, so tileX lays exactly ONE humidifier on
     the screen at every scroll (split across the two edges for the half
     second its 44px take to cross the seam). It drifts left at 0.30 of
     the room's speed - 34 to 53 px/s - crossing the screen in 9 to 14
     seconds and coming back in at the right, which reads as one machine
     being slowly passed on a long bar: the Couch's propped cushions ride
     at 0.62 on a seat that scrolls at 1.0 in exactly this way. At scroll
     0 it stands at x 300, in view and right of the doodad, before the
     first cork ever falls. It is never pinned to the screen - a thing on
     the bar that did not scroll would read as HUD - and it is never a
     pillar and never has a box. */
  var HUM_X = 300, HUM_Y = 192, HUM_W = 44, HUM_H = 50;
  var NOZ_DX = 22, NOZ_Y = 194;      /* the hole in the apex, Bar ref 3 */

  /* where the copy tileX draws at the left is, exactly as tileX rounds
     it, so the sprite and the wall it is baked against never part */
  function humX(scroll) { return HUM_X + Math.round(-wrap(scroll * WALL_PAR, VW)); }

  /* the nozzle of whichever copy has its nozzle on the screen */
  function nozzleX(scroll) {
    var n = humX(scroll) + NOZ_DX;
    return n < 0 ? n + VW : n;
  }

  /* ------------------------------------------------------- helpers */

  function dot(c, col, x, y) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }

  function hexRGB(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }

  /* An alpha sheet in one colour, painted pixel by pixel through
     ImageData: every smooth falloff in this file - the fog, the glow,
     the soft shadows on the wall - is one of these, baked at boot,
     because a stack of hard-edged rects is a stack of stripes. */
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

  /* the 1px dark ring round whatever is already painted on a canvas,
     laid UNDER it - so it follows every notch the shape has (ringOf) */
  function ringed(t) {
    var m = makeCanvas(t.w, t.h), c = t.ctx;
    m.ctx.drawImage(t.canvas, 0, 0);
    m.ctx.globalCompositeOperation = 'source-in';
    m.ctx.fillStyle = '#ffffff';
    m.ctx.fillRect(0, 0, t.w, t.h);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(ringOf(m, t.w, t.h).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* a character grid onto a canvas, one character to the pixel */
  function plot(c, grid, ink, ox, oy) {
    var r, k, ch;
    for (r = 0; r < grid.length; r++) {
      for (k = 0; k < grid[r].length; k++) {
        ch = grid[r].charAt(k);
        if (ch === '.' || !ink[ch]) continue;
        dot(c, ink[ch], ox + k, oy + r);
      }
    }
  }

  /* a sprite turned by an exact quarter turn about its middle. On an odd
     square sheet every pixel centre lands on a pixel centre, so nothing
     is resampled - the popcorn's trick (couch.js bakePopSet) */
  function turned(src, q) {
    var t = makeCanvas(src.w, src.h), c = t.ctx;
    c.translate(src.w / 2, src.h / 2);
    c.rotate(q * Math.PI / 2);
    c.translate(-src.w / 2, -src.h / 2);
    c.drawImage(src.canvas, 0, 0);
    return t;
  }

  function flipped(src) {
    var t = makeCanvas(src.w, src.h), c = t.ctx;
    c.translate(0, src.h);
    c.scale(1, -1);
    c.drawImage(src.canvas, 0, 0);
    return t;
  }

  /* -------------------------------------------- the kitchen beyond

     480x12 at 0.12, the far side of the half wall in Bar ref 5. Left to
     right: white shaker cabinets with their pulls, the steel fridge
     papered in photographs, more cabinets, the herringbone stone
     surround with the dark television in it and the amber pendant
     hanging in front, a framed photograph on the cream wall, the white
     barn door on its black rail, and the dark of the hall beyond it.

     It is far, it is a sliver, and the HUD's life row sits over the
     left of it the way it sits over every bay's lid; so the whole strip
     takes a step into the night and only the pendant is left bright -
     the lamp is the one thing over there the eye should find. */
  function bakeKitchen() {
    var W = VW, t = makeCanvas(W, KITCHEN_H), c = t.ctx;
    var x, y, i;

    /* the cabinets, everywhere first, then the other things over them */
    c.fillStyle = H.cabinet; c.fillRect(0, 0, W, KITCHEN_H);
    for (x = 0, i = 0; x < W; x += 28, i++) {
      /* a door every 28: the stile's shadow and its lit edge */
      c.fillStyle = H.cabinetShade; c.fillRect(x, 0, 1, 9);
      c.fillStyle = H.cabinetLit;   c.fillRect(x + 1, 0, 1, 9);
      /* THE SHAKER PANEL - a recessed field inside a flat frame, the one
         mark that makes it this kitchen's cabinet and not a white wall:
         shade along its top and left, light along its bottom and right */
      c.fillStyle = H.cabinetShade; c.fillRect(x + 5, 1, 19, 1); c.fillRect(x + 5, 1, 1, 6);
      c.fillStyle = H.cabinetLit;   c.fillRect(x + 6, 7, 18, 1); c.fillRect(x + 23, 2, 1, 5);
      /* the bar pulls, paired either side of every second stile */
      if (i % 2 === 1) {
        c.fillStyle = H.steelDeep;
        c.fillRect(x - 3, 4, 1, 3); c.fillRect(x + 3, 4, 1, 3);
      }
    }
    /* the doors' bottom rail, and the gap under the cabinets */
    c.fillStyle = H.cabinetShade; c.fillRect(0, 9, W, 1);
    c.fillStyle = H.cabinetDeep;  c.fillRect(0, 11, W, 1);

    /* THE FRIDGE, Bar ref 5: French doors, two long handles at the
       split, and photographs over every inch of it */
    var FX0 = 60, FW = 48;
    c.fillStyle = H.steel;      c.fillRect(FX0, 0, FW, KITCHEN_H);
    c.fillStyle = H.steelLit;   c.fillRect(FX0 + 1, 0, 1, KITCHEN_H); c.fillRect(FX0, 0, FW, 1);
    c.fillStyle = H.steelShade; c.fillRect(FX0 + FW - 3, 0, 3, KITCHEN_H);
    c.fillStyle = H.steelDeep;
    c.fillRect(FX0 + 24, 0, 1, KITCHEN_H);
    c.fillRect(FX0 - 1, 0, 1, KITCHEN_H); c.fillRect(FX0 + FW, 0, 1, KITCHEN_H);
    c.fillStyle = H.steelLit;
    c.fillRect(FX0 + 21, 2, 1, 8); c.fillRect(FX0 + 27, 2, 1, 8);
    var MAGNETS = [[64, 2, 3, 3, P.print], [69, 5, 2, 2, P.pegRed], [74, 3, 3, 2, P.pegBlue],
                   [77, 7, 2, 2, P.paper], [90, 2, 2, 3, P.print], [93, 6, 3, 2, H.leafLit],
                   [98, 3, 2, 2, P.pegRed], [101, 7, 2, 2, P.print]];
    for (i = 0; i < MAGNETS.length; i++) {
      c.fillStyle = MAGNETS[i][4];
      c.fillRect(MAGNETS[i][0], MAGNETS[i][1], MAGNETS[i][2], MAGNETS[i][3]);
    }

    /* the cream wall the kitchen's other things hang on */
    c.fillStyle = H.wall;
    c.fillRect(200, 0, 22, KITCHEN_H); c.fillRect(306, 0, 90, KITCHEN_H);
    c.fillStyle = H.wallShade;
    c.fillRect(200, 11, 22, 1); c.fillRect(306, 11, 90, 1);

    /* THE STONE SURROUND, Bar ref 5's herringbone tile round the TV:
       two diagonals of joint, alternating every second row, which is
       what a herringbone is at one pixel a brick */
    c.fillStyle = H.tile; c.fillRect(222, 0, 84, KITCHEN_H);
    c.fillStyle = H.tileShade;
    for (y = 0; y < KITCHEN_H; y++) {
      for (x = 222; x < 306; x++) {
        var k = ((y >> 1) & 1) ? wrap(x + y, 4) : wrap(x - y, 4);
        if (k === 0) c.fillRect(x, y, 1, 1);
      }
    }
    /* the television, off, in it */
    c.fillStyle = P.tvFrame; c.fillRect(236, 1, 57, 11);
    c.fillStyle = P.tv;      c.fillRect(237, 2, 55, 10);
    /* one long dull reflection across the glass, so it is a screen
       and not a hole */
    c.fillStyle = P.tvFrame;
    for (i = 0; i < 9; i++) c.fillRect(262 + i * 2, 9 - Math.floor(i * 0.8), 2, 1);

    /* the framed photograph on the wall to its right, Bar ref 5 */
    c.fillStyle = H.iron;     c.fillRect(352, 1, 19, 9);
    c.fillStyle = P.photoSky; c.fillRect(353, 2, 17, 4);
    c.fillStyle = P.photoLand; c.fillRect(353, 6, 17, 3);
    c.fillStyle = P.print;    c.fillRect(358, 4, 2, 3); c.fillRect(362, 3, 2, 4);

    /* THE BARN DOOR, Bar ref 5: white boards on a black rail */
    c.fillStyle = H.cabinetLit; c.fillRect(398, 2, 38, 10);
    c.fillStyle = H.cabinetShade;
    for (x = 401; x < 436; x += 4) c.fillRect(x, 3, 1, 9);
    c.fillStyle = H.iron;
    c.fillRect(388, 0, 60, 2);
    c.fillRect(402, 2, 1, 3); c.fillRect(431, 2, 1, 3);
    /* and the dark of the hall past it, which is where the evening is */
    c.fillStyle = P.night; c.fillRect(440, 2, 40, 10);
    c.fillStyle = H.wallShade;  c.fillRect(439, 0, 1, KITCHEN_H);

    /* the step into the night, then the lamp ON TOP of it */
    Tint.rect(c, 0, 0, W, KITCHEN_H, P.night, 4);

    /* THE PENDANT, Bar ref 5: a tall amber cone in front of the stone.
       The rod comes down out of the top of the strip; the glass is
       seven across at its widest. The warm light round it is two flat
       tints, which is allowed here: this tile is static, and it is
       always laid down whole. */
    var LX = 252;
    Tint.rect(c, LX - 22, 0, 45, KITCHEN_H, H.lampGlow, 3);
    Tint.rect(c, LX - 11, 2, 23, KITCHEN_H - 2, H.lampGlow, 4);
    c.fillStyle = H.lampRod; c.fillRect(LX, 0, 1, 4);
    var CONE = [[3, 1], [2, 3], [2, 3], [1, 5], [1, 5], [1, 5], [0, 7], [0, 7]];
    c.fillStyle = P.outline;
    for (i = 0; i < CONE.length; i++) {
      c.fillRect(LX - 3 + CONE[i][0] - 1, 4 + i, 1, 1);
      c.fillRect(LX - 3 + CONE[i][0] + CONE[i][1], 4 + i, 1, 1);
    }
    DiningRoom.rowsFill(c, CONE, LX - 3, 4, H.lampGlass);
    dot(c, H.lampCrackle, LX - 1, 8); dot(c, H.lampCrackle, LX + 2, 10);
    c.fillStyle = H.lampCore; c.fillRect(LX, 7, 2, 2);
    c.fillStyle = H.lampDark; c.fillRect(LX - 3, 11, 7, 1);
    return t;
  }

  /* ------------------------------------------------------- the ledge

     THE LID, and it is the top of the half wall: Bar ref 4 has it as a
     grey-washed board across the very top of the frame and ref 5 shows
     its long soft figure - grey wash over timber, the grain flowing
     along it like driftwood. 240 wide, the room's band width, 1.0.

       0  ledgeLit   the top face catching the pendant
       1  ledge      the top face, a few lit ticks of grain
       2  ledgeShade the arris where it turns down
       3..7 ledge    the front face, and the grain
       8  ledgeLit   the lower lip - the lit row three above the edge
       9  ledgeShade under it
       10, 11 outline, and 11 is screen 23: the kill line

     Nothing hangs from it, ever. */
  function bakeLedge() {
    var W = LEDGE_W, t = makeCanvas(W, 12), c = t.ctx, r = mulberry32(4421);
    var i, k, x, y;
    c.fillStyle = H.ledgeLit;   c.fillRect(0, 0, W, 1);
    c.fillStyle = H.ledge;      c.fillRect(0, 1, W, 1);
    c.fillStyle = H.ledgeShade; c.fillRect(0, 2, W, 1);
    c.fillStyle = H.ledge;      c.fillRect(0, 3, W, 5);
    c.fillStyle = H.ledgeLit;   c.fillRect(0, 8, W, 1);
    c.fillStyle = H.ledgeShade; c.fillRect(0, 9, W, 1);
    c.fillStyle = P.outline;    c.fillRect(0, 10, W, 2);

    /* the top face's few ticks */
    for (i = 0; i < 10; i++) {
      c.fillStyle = H.ledgeLit;
      x = Math.floor(r() * W);
      c.fillRect(x, 1, Math.min(3 + Math.floor(r() * 8), W - x), 1);
    }

    /* THE FIGURE: three long waves of shade along the front face, each
       stepping a row up or down every 14 to 24 pixels - the flowing line
       of grey-washed grain that is the whole look of this board in Bar
       ref 5. Laid first, so the short ticks below sit over them. */
    for (k = 0; k < 3; k++) {
      x = Math.floor(r() * W);
      y = 3 + Math.floor(r() * 5);
      var len = 60 + Math.floor(r() * 50), run = 0, step = 14 + Math.floor(r() * 11);
      c.fillStyle = H.ledgeShade;
      for (i = 0; i < len; i++) {
        c.fillRect((x + i) % W, y, 1, 1);
        if (++run >= step) {
          run = 0; step = 14 + Math.floor(r() * 11);
          y += (y <= 3) ? 1 : (y >= 7 ? -1 : (r() < 0.5 ? -1 : 1));
        }
      }
    }

    /* and the ticks: 22, 8 to 30 long, lit six in ten - and never two
       on one row within six pixels of each other, or two ticks read as
       one long scratch */
    var used = [[], [], [], [], []], placed = 0, tries = 0;
    while (placed < 22 && tries++ < 600) {
      var gx = Math.floor(r() * W), gy = Math.floor(r() * 5), gl = 8 + Math.floor(r() * 23);
      var lit = r() < 0.6, clash = false;
      for (i = 0; i < used[gy].length && !clash; i++) {
        var u = used[gy][i];
        var a0 = gx - 6, a1 = gx + gl + 6;
        /* wrap-aware overlap of [a0,a1) with [u0,u1) on a ring of W */
        for (k = -1; k <= 1 && !clash; k++) {
          if (a0 < u[1] + k * W && u[0] + k * W < a1) clash = true;
        }
      }
      if (clash) continue;
      used[gy].push([gx, gx + gl]);
      placed++;
      c.fillStyle = lit ? H.ledgeLit : H.ledgeShade;
      for (i = 0; i < gl; i++) c.fillRect((gx + i) % W, 3 + gy, 1, 1);
    }

    /* one knot a tile, the grain's reason to swerve */
    c.fillStyle = H.ledgeShade; c.fillRect(171, 4, 5, 3);
    c.fillStyle = P.outline;    c.fillRect(172, 5, 3, 1);
    return t;
  }

  /* --------------------------------------------------------- the wall

     480 x 218 at 0.30, the cream wall of the half wall after dark: its
     tooth, the white chair rail from Bar ref 1/5 with its shadow on the
     wall below it, and - in the full version - the still life standing
     on the bar against it. `still` false is the bare wall the menu
     backdrop wants.

     THE STILL LIFE IS HALF WHAT IS ON THAT BAR, deliberately. Bar ref 5
     has a box, an envelope, the humidifier, the photographs, a snowman,
     a rock, a paper tent, a planter and two pinecones. The box and the
     planter are the PILLARS and the pinecone is the SPARE LIFE, so none
     of the three appears on this wall in any form: scenery wearing a
     hazard's or a gift's badge is the Couch's whole lesson. The snowman
     and the rock are on the bar top as litter. What is left back here is
     what nobody could mistake for anything: an envelope leaning on the
     wall, a stack of photographs lying flat, the paper tent with its
     twig fire and its note - and the humidifier, which is drawn over
     this tile every frame (drawBackdrop) so that its ring can light. */
  function bakeWall(still) {
    var t = makeCanvas(VW, WALL_H), c = t.ctx, r = mulberry32(4901);
    var x, y, i, k;

    c.fillStyle = P.wall; c.fillRect(0, 0, VW, WALL_H);
    /* TOOTH: single pixels, one in seventy, never ticks - the Garden's
       stucco rule. Painted plaster has a tooth and no grain. */
    for (y = 0; y < WALL_H; y++) {
      for (x = 0; x < VW; x++) {
        if (r() > 1 / 70) continue;
        dot(c, r() < 0.5 ? P.wallTooth : P.wallToothDark, x, y);
      }
    }

    /* THE CHAIR RAIL, Bar ref 1/5, screen rows 186..195: a cap catching
       the light, the face, a lower bead that catches it too, the face
       again, the underside, and the hard line where it leaves the wall */
    var RL = RAIL_Y - CEIL;           /* 162 */
    var RAIL = [P.railLit, P.rail, P.rail, P.rail, P.rail, P.railLit, P.rail, P.rail,
                P.railShade, P.outline];
    for (i = 0; i < RAIL.length; i++) { c.fillStyle = RAIL[i]; c.fillRect(0, RL + i, VW, 1); }
    /* and its shadow down the wall: eight rows, per-row alpha, because
       this is a static tile and a strip on a static tile has no edge */
    for (i = 0; i < 8; i++) {
      c.fillStyle = rgba(P.void, 0.22 * (1 - (i + 0.5) / 8));
      c.fillRect(0, RL + RAIL.length + i, VW, 1);
    }

    /* THE EVENING LIGHT ON IT, which is the most striking thing in Bar
       ref 1, 2 and 3: the wall is not lit evenly, it is lit in WARM
       POOLS where the amber light falls - up under the ledge, from the
       pendants - with cooler, darker stretches between them. Two pools a
       tile at about a sixth of lampGlow, two soft bands of night between,
       all of it wrapped so the tile still tiles. Measured at the middle
       of the lane the wall now runs about 150 in the dusk between the
       pools to about 172 at their hearts; the planters stay 40 clear of
       the brightest of it and the boxes 100 under it. */
    c.drawImage(alphaSheet(VW, WALL_H, H.lampGlow, function (x, y) {
      var keep = 1, j, dx, dy, d;
      for (j = 0; j < POOLS.length; j++) {
        dx = Math.abs(x + 0.5 - POOLS[j][0]); if (dx > VW / 2) dx = VW - dx;
        dx /= POOLS[j][2]; dy = (y + 0.5 - POOLS[j][1]) / POOLS[j][3];
        d = Math.sqrt(dx * dx + dy * dy);
        if (d < 1) keep *= 1 - POOLS[j][4] * (1 - ease(d));
      }
      return 1 - keep;
    }).canvas, 0, 0);
    c.drawImage(alphaSheet(VW, WALL_H, P.night, function (x, y) {
      var a = 0, j, dx;
      for (j = 0; j < DUSK.length; j++) {
        dx = Math.abs(x + 0.5 - DUSK[j][0]); if (dx > VW / 2) dx = VW - dx;
        if (dx < DUSK[j][1]) a = Math.max(a, DUSK[j][2] * (1 - ease(dx / DUSK[j][1])));
      }
      return a;
    }).canvas, 0, 0);

    if (!still) return t;

    /* THE STILL LIFE, painted first into a sheet of its own, because its
       silhouette is what the lamp throws up the wall */
    var S = makeCanvas(VW, WALL_H), sc = S.ctx;
    stillPicture(sc, 45, 192);
    stillEnvelope(sc, 139, 200);
    stillPrints(sc, 192, 210);
    stillTent(sc, 236, 201);

    /* THE SHADOWS ON THE WALL. The lamp in here is low and to the LEFT -
       the side every lit arris in the bay is on: the boxes' lit left
       edge, the dome's highlight, the pots' lit cells - so everything
       standing on the bar throws a LONG soft shadow up the wall and to
       the right of itself, the way the lamp does in Bar ref 1 and 3: half
       as tall again as the thing, leaning over, softening and fading as
       it climbs (castShadow). The humidifier's reaches past the chair
       rail. Ref 3's shadow of a peace lily's leaves stays high on the
       wall, thrown by a plant out of the frame, and the two hung
       photographs throw a narrow soft edge. One alpha sheet, the darkest
       wins where two meet: the wall is lit from somewhere, not
       stencilled. Everything here moves with the wall, and so do the
       things casting it. */
    var M = makeCanvas(VW, WALL_H);
    M.ctx.drawImage(S.canvas, 0, 0);
    M.ctx.drawImage(T.hum[0].canvas, HUM_X - 1, HUM_Y - CEIL - 1);
    var cast = castShadow(M, WALL_H - 1, 1.6, 0.6, 2, 0.34, 52, true);
    var LEAF = [];
    for (k = 0; k < LILY_SHADOW.length; k++) {
      var la = LILY_SHADOW[k][0] * Math.PI / 180;
      LEAF.push([Math.sin(la), -Math.cos(la), LILY_SHADOW[k][1], LILY_SHADOW[k][2]]);
    }
    c.drawImage(alphaSheet(VW, WALL_H, P.night, function (x, y) {
      var a = cast[y * VW + x], j, s2, tt, u, hw;
      for (j = 0; j < HUNG.length; j++) {
        a = Math.max(a, rectShade(x, y, HUNG[j][0] + 3, HUNG[j][1] - 2, HUNG[j][2], HUNG[j][3], 3, 0.16));
      }
      var px = x + 0.5 - LILY_BX, py = y + 0.5 - LILY_BY;
      if (px > -110 && px < 110 && py > -110 && py < 4) {
        for (j = 0; j < LEAF.length; j++) {
          s2 = px * LEAF[j][0] + py * LEAF[j][1];
          tt = Math.abs(px * LEAF[j][1] - py * LEAF[j][0]);
          if (s2 > 0 && s2 < LILY_STEM) {
            if (tt < 1.2) a = Math.max(a, 0.11 * (1 - tt / 1.2));
            continue;
          }
          u = (s2 - LILY_STEM) / LEAF[j][2];
          if (u <= 0 || u >= 1) continue;
          hw = LEAF[j][3] / 2 * Math.pow(Math.sin(Math.PI * u), 0.75);
          a = Math.max(a, 0.13 * (1 - ease((tt - hw + 3) / 6)));
        }
      }
      return a;
    }).canvas, 0, 0);

    /* the two photographs hung on the wall, then the still life */
    hungPhoto(c, HUNG[0], 0);
    hungPhoto(c, HUNG[1], 1);
    c.drawImage(S.canvas, 0, 0);
    return t;
  }

  /* THE LONG SHADOW. `m` is a sheet with the shadow-casters painted on
     it, standing on row `base`. Each row of wall above the base shows
     the slice of the casters `1/stretch` as high, slid `shear` pixels
     right for every pixel of height and `off` more: a low lamp on the
     left throws everything up and over. The casters' mask is blurred
     twice first, and every row is blurred again sideways in proportion
     to how far up it is, so the shadow is crisp-ish at the foot and a
     soft penumbra at the top; and it fades by two thirds over `reach`
     pixels of the caster's height. Returns per-pixel alpha (times
     `peak`), for an alphaSheet. `wrapX` for a tile laid end to end. */
  function castShadow(m, base, stretch, shear, off, peak, reach, wrapX) {
    var w = m.w, h = m.h, d = m.ctx.getImageData(0, 0, w, h).data;
    var A = new Float32Array(w * h), out = new Float32Array(w * h), i, x, y, k;
    for (i = 0; i < w * h; i++) A[i] = d[i * 4 + 3] > 0 ? 1 : 0;
    A = blurBox(blurBox(A, w, h, 2, wrapX), w, h, 2, wrapX);
    for (y = 0; y <= base; y++) {
      var hh = (base - y) / stretch;
      if (hh > reach * 1.5) continue;
      var oy = Math.round(base - hh), r = Math.round(hh / 14);
      var fade = Math.max(0, 1 - 0.66 * hh / reach);
      for (x = 0; x < w; x++) {
        var cx = Math.round(x - off - shear * hh), sum = 0;
        for (k = -r; k <= r; k++) {
          var sx = cx + k;
          if (wrapX) sx = wrap(sx, w); else if (sx < 0 || sx >= w) continue;
          sum += A[oy * w + sx];
        }
        if (sum > 0) out[y * w + x] = peak * fade * sum / (2 * r + 1);
      }
    }
    return out;
  }

  /* a separable box blur, radius r, wrapping sideways if asked */
  function blurBox(A, w, h, r, wrapX) {
    var B = new Float32Array(w * h), C = new Float32Array(w * h), x, y, k, s, n;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        s = 0; n = 0;
        for (k = -r; k <= r; k++) {
          var sx = x + k;
          if (wrapX) sx = wrap(sx, w); else if (sx < 0 || sx >= w) continue;
          s += A[y * w + sx]; n++;
        }
        B[y * w + x] = s / n;
      }
    }
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        s = 0; n = 0;
        for (k = -r; k <= r; k++) {
          var sy = y + k;
          if (sy < 0 || sy >= h) continue;
          s += B[sy * w + x]; n++;
        }
        C[y * w + x] = s / n;
      }
    }
    return C;
  }

  /* a soft rectangle's alpha: full inside, gone `soft` pixels outside */
  function rectShade(x, y, rx, ry, rw, rh, soft, peak) {
    var dx = Math.max(rx - (x + 0.5), 0, (x + 0.5) - (rx + rw));
    var dy = Math.max(ry - (y + 0.5), 0, (y + 0.5) - (ry + rh));
    if (dx > soft || dy > soft) return 0;
    var d = Math.sqrt(dx * dx + dy * dy);
    return peak * (1 - ease(d / soft));
  }

  /* THE HUNG PHOTOGRAPHS: family photographs in plain light-wood frames,
     the house's own (Bar ref 5 has one on the wall beyond the half
     wall). [x, y, w, h] in tile pixels, high in the field between the
     ledge and the rail, one in each pool of lamplight so the light has
     something to fall on. They are kept QUIET: a mid-tone frame with no
     black outline, a muted picture, and the whole thing laid back a
     third of the way toward the wall colour - nothing up here may read
     louder than a box stack or a cork, and it slides at the wall's 0.30
     against the room's 1.0, so nothing up here can be mistaken for
     something coming. */
  var HUNG = [[94, 28, 48, 36], [332, 38, 26, 34]];

  function hungPhoto(c, f, kind) {
    var x0 = f[0], y0 = f[1], W = f[2], Hh = f[3], i, k;
    var t = makeCanvas(W, Hh), g = t.ctx;
    /* the frame: lit along its top and left, shade along its bottom and
       right, a darker line where the picture is set into it */
    g.fillStyle = P.frame;      g.fillRect(0, 0, W, Hh);
    g.fillStyle = P.frameLit;   g.fillRect(0, 0, W, 1); g.fillRect(0, 0, 1, Hh);
    g.fillStyle = P.frameShade; g.fillRect(0, Hh - 1, W, 1); g.fillRect(W - 1, 0, 1, Hh);
    g.fillRect(3, 3, W - 6, 1); g.fillRect(3, 3, 1, Hh - 6);
    if (kind === 0) {
      /* a couple out of doors, Bar ref 5's photograph: sky, a line of
         hills, grass, and two figures standing in it */
      g.fillStyle = P.photoSky;  g.fillRect(4, 4, W - 8, 12);
      g.fillStyle = P.photoHill; g.fillRect(4, 14, W - 8, 3);
      for (k = 0; k < W - 8; k++) if (hash(91 + k) % 3 === 0) dot(g, P.photoHill, 4 + k, 13);
      g.fillStyle = P.photoLand; g.fillRect(4, 17, W - 8, Hh - 21);
      var FIG = [[Math.round(W / 2) - 7, P.photoCoat, P.photoSkin], [Math.round(W / 2) - 1, P.photoShirt, P.photoSkin]];
      for (i = 0; i < FIG.length; i++) {
        var fx = FIG[i][0];
        g.fillStyle = FIG[i][2]; g.fillRect(fx + 1, 10, 3, 3);
        g.fillStyle = P.photoHair; g.fillRect(fx + 1, 9, 3, 1);
        g.fillStyle = FIG[i][1]; g.fillRect(fx, 13, 5, 8);
        g.fillStyle = P.photoHair; g.fillRect(fx + 1, 21, 1, 5); g.fillRect(fx + 3, 21, 1, 5);
      }
    } else {
      /* an old print, sepia: a tree on a hill */
      g.fillStyle = P.sepiaLit; g.fillRect(4, 4, W - 8, Hh - 8);
      g.fillStyle = P.sepia;    g.fillRect(4, Hh - 10, W - 8, 6);
      for (k = 0; k < W - 8; k++) if (hash(77 + k) % 2) dot(g, P.sepia, 4 + k, Hh - 11);
      var tx = Math.floor(W / 2);
      g.fillStyle = P.sepiaDeep; g.fillRect(tx, 13, 1, Hh - 23);
      g.fillRect(tx - 3, 9, 7, 5); g.fillRect(tx - 2, 8, 5, 1); g.fillRect(tx - 2, 14, 5, 1);
    }
    /* and the whole of it laid back toward the wall */
    g.globalCompositeOperation = 'source-atop';
    g.fillStyle = rgba(P.wall, 0.30);
    g.fillRect(0, 0, W, Hh);
    g.globalCompositeOperation = 'source-over';
    c.drawImage(t.canvas, x0, y0);
  }

  /* the two pools of lamplight, [x, y, rx, ry, peak] in tile pixels */
  var POOLS = [[118, 58, 150, 120, 0.22], [350, 54, 140, 112, 0.19]];
  /* and the dusk between them, [x, half-width, peak] in tile pixels */
  var DUSK = [[236, 72, 0.16], [0, 66, 0.14]];

  /* THE LILY'S SHADOW: seven leaves fanned up from a point on the rail,
     [degrees off straight up, blade length, blade width]. A peace lily
     is a fountain of long pointed blades on long stems - Bar ref 1's
     plant and ref 3's shadow of it. */
  var LILY_BX = 410, LILY_BY = 160, LILY_STEM = 16;
  var LILY_SHADOW = [[-64, 34, 9], [-46, 46, 11], [-24, 60, 13], [-6, 70, 14],
                     [14, 58, 13], [32, 50, 12], [54, 40, 10]];

  /* THE FRAMED PICTURE, Bar ref 5: leaning on the wall at the left end
     of the bar, a white frame round a print of coloured balloons - the
     one burst of colour on the back of the bar. 22 x 26, leaning two
     pixels over at the top. */
  function stillPicture(c, x0, y0) {
    var W = 22, Hh = 26, i, k;
    var flat = makeCanvas(W, Hh), f = flat.ctx;
    f.fillStyle = P.note;          f.fillRect(0, 0, W, Hh);
    f.fillStyle = P.envelopeShade; f.fillRect(W - 2, 0, 2, Hh); f.fillRect(0, Hh - 2, W, 2);
    f.fillStyle = P.printShade;    f.fillRect(3, 3, W - 6, Hh - 6);
    f.fillStyle = P.picGround;     f.fillRect(4, 4, W - 8, Hh - 8);
    var BALLS = [P.stampRed, P.pegBlue, P.paper, P.ember, P.stampBlue, H.leafLit, P.pegRed];
    for (i = 0; i < 26; i++) {
      var h = hash(4411 + i * 977);
      f.fillStyle = BALLS[h % BALLS.length];
      f.fillRect(5 + (h >>> 4) % (W - 11), 5 + (h >>> 12) % (Hh - 11), 2, 2);
    }
    var t = makeCanvas(W + 4, Hh + 2);
    for (i = 0; i < Hh; i++) {
      k = Math.round((Hh - 1 - i) / (Hh - 1) * 2);
      t.ctx.drawImage(flat.canvas, 0, i, W, 1, 1 + k, 1 + i, W, 1);
    }
    ringed(t);
    c.drawImage(t.canvas, x0 - 1, y0 - 1);
  }

  /* THE ENVELOPE, Bar ref 5: a long white envelope stood on its edge and
     leaning back on the wall behind the box. 38 x 17 - a business
     envelope is two and a quarter times as long as it is tall - with
     the stamp in the corner and the address as three scribbled lines,
     which is what handwriting is from across a room. Every row shifted
     right a little more than the one below it: it leans. */
  function stillEnvelope(c, x0, y0) {
    var W = 38, Hh = 17, i, k;
    var flat = makeCanvas(W, Hh), f = flat.ctx;
    f.fillStyle = P.envelope;      f.fillRect(0, 0, W, Hh);
    f.fillStyle = P.envelopeShade; f.fillRect(W - 2, 0, 2, Hh); f.fillRect(0, Hh - 1, W, 1);
    /* the stamp */
    f.fillStyle = P.stampRed;  f.fillRect(W - 7, 2, 4, 4);
    f.fillStyle = P.stampBlue; f.fillRect(W - 6, 3, 2, 2);
    /* the return address, two short lines, and the address, three */
    for (k = 0; k < 2; k++) {
      for (i = 0; i < 7; i++) if (hash(311 + k * 31 + i) % 4) dot(f, P.printInk, 2 + i, 2 + k * 2);
    }
    for (k = 0; k < 3; k++) {
      for (i = 0; i < 13 - k * 2; i++) if (hash(733 + k * 57 + i) % 5) dot(f, P.ink, 12 + i, 8 + k * 2);
    }
    var t = makeCanvas(W + 6, Hh + 2);
    for (i = 0; i < Hh; i++) {
      var sh = Math.round((Hh - 1 - i) / (Hh - 1) * 3);
      t.ctx.drawImage(flat.canvas, 0, i, W, 1, 1 + sh, 1 + i, W, 1);
    }
    ringed(t);
    c.drawImage(t.canvas, x0 - 1, y0 - 1);
  }

  /* THE PHOTOGRAPHS, Bar ref 1/3/5: a stack of prints lying flat, seen
     nearly edge on from bar height. The top print is a picture - ref 5's
     has red and green in it - and the edges under it are the pale and
     grey of a pile of card. */
  function stillPrints(c, x0, y0) {
    var W = 32, Hh = 7, i;
    var t = makeCanvas(W + 2, Hh + 2), g = t.ctx;
    g.fillStyle = P.print;      g.fillRect(1, 1, W, 2);
    g.fillStyle = P.printShade; g.fillRect(1, 3, W, Hh - 2);
    g.fillStyle = P.print;      g.fillRect(1, 4, W, 1); g.fillRect(2, 6, W - 1, 1);
    /* the picture on top, a few pixels of it */
    g.fillStyle = P.stampRed;  g.fillRect(8, 1, 4, 1);
    g.fillStyle = H.leaf;      g.fillRect(12, 1, 6, 1); g.fillRect(10, 2, 5, 1);
    g.fillStyle = P.printInk;  g.fillRect(22, 2, 2, 1);
    /* the bottom print stuck out a little further, the way a pile does */
    g.fillStyle = P.printShade; g.fillRect(W - 2, Hh - 1, 3, 1);
    ringed(t);
    c.drawImage(t.canvas, x0 - 1, y0 - 1);
  }

  /* THE PAPER TENT, Bar ref 1/2: yellow lined paper folded into an
     A-frame, lit on its left face and in shade on its right, with the
     lines running down both faces, a dark doorway, a little fire of
     twigs in front of it on a scrap of brown paper, and the RIP note
     leaning against its right side - a scribble, not letters. */
  var TENT = [[11, 2], [10, 4], [9, 6], [8, 8], [7, 10], [6, 12], [5, 14], [4, 16],
              [3, 18], [2, 20], [1, 22], [0, 24], [0, 24], [0, 24], [0, 24], [0, 24]];
  var FIRE = ['...F..',
              '..EE..',
              '.T..T.',
              '..TT..',
              '.T..T.'];

  function stillTent(c, x0, y0) {
    var W = 24, Hh = TENT.length, i, k;
    var t = makeCanvas(W + 2, Hh + 2), g = t.ctx;
    for (i = 0; i < Hh; i++) {
      for (k = TENT[i][0]; k < TENT[i][0] + TENT[i][1]; k++) {
        var right = k >= 12;
        var line = (k % 3) === 1;
        dot(g, right ? (line ? P.paperDeep : P.paperLine) : (line ? P.paperLine : P.paper), 1 + k, 1 + i);
      }
    }
    /* the doorway: a dark triangle at the foot of the gable */
    for (i = 0; i < 5; i++) {
      g.fillStyle = P.kraftShade;
      g.fillRect(1 + 12 - 1 - Math.floor(i / 2), 1 + Hh - 5 + i, 2 + Math.floor(i / 2) * 2, 1);
    }
    ringed(t);
    c.drawImage(t.canvas, x0 - 1, y0 - 1);

    /* the brown paper the fire sits on, and the fire */
    var fx = x0 + 9, fy = y0 + Hh - 6;
    c.fillStyle = P.kraftShade; c.fillRect(fx - 3, y0 + Hh - 1, 12, 1);
    c.fillStyle = P.kraft;      c.fillRect(fx - 2, y0 + Hh - 2, 10, 1);
    plot(c, FIRE, { F: H.lampGlass, E: P.ember, T: P.twig }, fx, fy);

    /* the note, leaning one pixel at the top, three pixels of ink */
    var n = makeCanvas(9, 9), ng = n.ctx;
    for (i = 0; i < 7; i++) {
      ng.fillStyle = P.note;
      ng.fillRect(1 + (i < 3 ? 1 : 0), 1 + i, 6, 1);
    }
    dot(ng, P.ink, 3, 3); dot(ng, P.ink, 4, 3); dot(ng, P.ink, 6, 3);
    dot(ng, P.ink, 3, 5); dot(ng, P.ink, 5, 5);
    ringed(n);
    c.drawImage(n.canvas, x0 + 17, y0 + Hh - 8);
  }

  /* ------------------------------------------- the back of the bar

     A NEARER LAYER, 640 x 100 at 0.60, standing on the bar's back edge
     (row 99 is screen 241) and staying under the chair rail: the things
     that make it a home bar - wine bottles of three shapes (a shouldered
     Bordeaux, a sloping Burgundy, a fat sparkling bottle in its foil),
     two stemmed wine glasses catching the lamp, a decanter, a tumbler of
     whisky on a stack of slate coasters, a cocktail shaker, a waiter's
     corkscrew lying flat. Six groups with a long stretch of bare bar
     between each, so it is a bar with things on it and not a shelf.

     WHAT IS NOT HERE, and why. No box, no footed planter, no pinecone and
     no cork: those are a hazard's and a gift's badges. And NO SUCCULENT,
     though Bar ref 5 has one: a small potted succulent is exactly what
     the Garden and the Deck hand out as a spare life, and a player who
     has come through the Backyard would see one sitting on this bar and
     fly down for it. The steel shaker stands where it would have.

     IT SITS BEHIND THE PILLARS IN VALUE. Every object is outlined, then
     the whole layer is laid back 28% toward the wall's own colour, and
     the light sheet's night is drawn over it (the pillars are drawn
     after the sheet and never are). The glass is dark green and near
     black, but nothing here reaches the box stacks' hard black edge, and
     nothing reaches the planters' white: the brightest pixel on the
     layer, the shaker's lit edge, comes out about 185 against a planter
     at 215. Each thing throws the same long soft shadow up the wall as
     the still life does (castShadow), baked into a second sheet that is
     drawn UNDER the humidifier, because the humidifier is nearer the
     wall than anything casting it. */
  var BB_W = 640, BB_H = 100, BB_PAR = 0.60;

  /* a solid sprite from a list of row widths, centred in W, painted by a
     function of (row, column-in-row, row width), ringed */
  function solid(W, widths, paint) {
    var t = makeCanvas(W + 2, widths.length + 2), c = t.ctx, i, k;
    for (i = 0; i < widths.length; i++) {
      var w = widths[i], o = Math.floor((W - w) / 2);
      for (k = 0; k < w; k++) {
        var col = paint(i, k, w);
        if (col) dot(c, col, 1 + o + k, 1 + i);
      }
    }
    return ringed(t);
  }

  function repeat(v, n) { var a = []; while (n-- > 0) a.push(v); return a; }

  /* A BOTTLE: foil over the neck, glass with a lit column on its left and
     shade down its right, one specular point on the shoulder, and a
     blank label - no word, no mark. */
  function bottle(widths, foil, label, glass, foilCol, spec) {
    return solid(Math.max.apply(null, widths), widths, function (i, k, w) {
      var last = k === w - 1 || k === w - 2 && w > 6;
      if (i >= foil[0] && i <= foil[1]) {
        if (i === foil[0] || k === 0) return foilCol[1];
        return last ? foilCol[2] : foilCol[0];
      }
      if (label && i >= label[0] && i <= label[1] && k >= 1 && k <= w - 2) {
        if (i === label[0] || i === label[1]) return P.labelEdge;
        return k >= w - 3 ? P.labelShade : P.label;
      }
      if (i === spec[0] && k === spec[1]) return glass[3];
      if (i === widths.length - 1) return glass[2];
      if (k === 1 && w > 4) return glass[1];
      if (last) return glass[2];
      return glass[0];
    });
  }

  function bakeBordeaux() {
    var W = [7].concat(repeat(5, 15), [7, 9], repeat(11, 28));
    return bottle(W, [0, 10], [26, 37], [P.glassGreen, P.glassGreenLit, P.glassGreenDeep, P.glassSpec],
                  [P.foilRed, P.foilRedLit, P.foilRedDeep], [18, 2]);
  }
  function bakeBurgundy() {
    var W = [7].concat(repeat(5, 14), [5, 5, 7, 7, 7, 9, 9, 9, 11, 11], repeat(11, 21));
    return bottle(W, [0, 9], [30, 40], [P.glassBlack, P.glassBlackLit, P.glassBlackDeep, P.glassSpec],
                  [P.brass, P.brassLit, P.boxShade], [21, 2]);
  }
  function bakeSparkling() {
    var W = [7].concat(repeat(5, 13), [7, 7, 9, 9, 11, 11, 13, 13], repeat(13, 21));
    return bottle(W, [0, 15], [28, 36], [P.glassGreen, P.glassGreenLit, P.glassGreenDeep, P.glassSpec],
                  [P.brass, P.brassLit, P.boxShade], [19, 3]);
  }

  /* CLEAR GLASS: the rim, a lit left edge and a dull right one, the stem
     and the foot, and what is in it - the wall shows through the rest,
     faintly lightened, which is what glass against a wall looks like */
  function glassy(W, widths, fill) {
    var t = makeCanvas(W + 2, widths.length + 2), c = t.ctx, i, k;
    for (i = 0; i < widths.length; i++) {
      var w = widths[i], o = Math.floor((W - w) / 2);
      for (k = 0; k < w; k++) {
        var col = fill(i, k, w);
        if (col === 'clear') {
          c.globalAlpha = 0.22; dot(c, P.glassClear, 1 + o + k, 1 + i); c.globalAlpha = 1;
        } else if (col) dot(c, col, 1 + o + k, 1 + i);
      }
    }
    return ringed(t);
  }

  /* the stemmed wine glass, `wine` rows of red in the bowl */
  function bakeWineGlass(wine) {
    var W = [7, 9, 9, 9, 9, 9, 7, 7, 5, 3].concat(repeat(1, 9), [9, 7]);
    return glassy(9, W, function (i, k, w) {
      if (i === 0) return P.glassRim;
      if (i >= 10 && i <= 18) return P.glassEdge;
      if (i === 19) return P.glassRim;
      if (i === 20) return P.glassEdgeDim;
      if (k === 0) return P.glassRim;
      if (k === w - 1) return P.glassEdgeDim;
      if (wine && i >= 9 - wine) return i === 9 - wine ? P.wineLit : P.wine;
      return 'clear';
    });
  }

  /* the decanter: a narrow neck and a wide flat-bottomed bowl, half full */
  function bakeDecanter() {
    var W = [7].concat(repeat(5, 9), [7, 9, 11, 13, 13, 15, 15, 15], repeat(17, 10), [15]);
    return glassy(17, W, function (i, k, w) {
      if (i === 0) return P.glassRim;
      if (i === W.length - 1) return P.glassEdgeDim;
      if (k === 0 || (k === 1 && w > 9)) return P.glassRim;
      if (k === w - 1) return P.glassEdgeDim;
      if (i >= 17) return i === 17 ? P.wineLit : (k === 2 && i < 23 ? P.wineLit : P.wine);
      return 'clear';
    });
  }

  /* the tumbler, whisky and one cube of ice in it */
  function bakeTumbler() {
    var W = repeat(9, 11);
    return glassy(9, W, function (i, k, w) {
      if (i === 0) return P.glassRim;
      if (i === 10) return P.glassRim;
      if (k === 0) return P.glassRim;
      if (k === w - 1) return P.glassEdgeDim;
      if (i >= 4) {
        if (i === 4) return P.whiskyLit;
        if ((i === 5 || i === 6) && (k === 3 || k === 4)) return P.glassClear;
        return P.whisky;
      }
      return 'clear';
    });
  }

  /* the coasters, slate, five of them stacked */
  function bakeCoasters() {
    return solid(13, [11, 13, 13, 13, 13], function (i, k, w) {
      if (i === 0) return P.slateLit;
      if (k === w - 1) return P.slateDeep;
      return i % 2 ? P.slate : P.slateDeep;
    });
  }

  /* THE SHAKER, a steel cobbler: cap, strainer, and a body that tapers
     down to its foot, a dark joint between each part */
  function bakeShaker() {
    var W = [3, 3, 5, 5, 7, 7, 7, 7, 7, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 7, 7, 7];
    return solid(9, W, function (i, k, w) {
      if (i === 3 || i === 8) return P.steelJoint;
      if (k === 0) return P.steelFace;
      if (k === 1) return P.steelBright;
      if (k >= w - 2) return P.steelDim;
      return P.steelFace;
    });
  }

  /* the corkscrew lying on its side: the dark handle, the steel worm and
     the little foil knife */
  function bakeCorkscrew() {
    var t = makeCanvas(17, 6), c = t.ctx;
    c.fillStyle = P.handle;      c.fillRect(1, 2, 12, 2);
    c.fillStyle = P.handleLit;   c.fillRect(1, 2, 12, 1);
    c.fillStyle = P.steelFace;   c.fillRect(13, 2, 3, 1); c.fillRect(13, 4, 3, 1);
    dot(c, P.steelBright, 14, 3); dot(c, P.steelFace, 3, 1); dot(c, P.steelFace, 4, 1);
    return ringed(t);
  }

  /* where each thing stands in the 640 tile: [sprite, left x, lift] */
  function bakeBackBar() {
    var t = makeCanvas(BB_W, BB_H), c = t.ctx, i;
    var base = BB_H - 1;
    var PLACE = [[bakeBordeaux(), 30, 0], [bakeBurgundy(), 43, 0], [bakeSparkling(), 56, 0],
                 [bakeWineGlass(3), 73, 0],
                 [bakeCoasters(), 150, 0], [bakeTumbler(), 152, 5],
                 [bakeDecanter(), 246, 0],
                 [bakeShaker(), 352, 0],
                 [bakeWineGlass(2), 444, 0], [bakeWineGlass(4), 456, 0], [bakeCorkscrew(), 472, 0],
                 [bakeBurgundy(), 566, 0]];
    for (i = 0; i < PLACE.length; i++) {
      var sp = PLACE[i][0];
      /* the sprite's last painted row is its canvas's second-last */
      c.drawImage(sp.canvas, PLACE[i][1] - 1, base - (sp.h - 2) - PLACE[i][2]);
    }
    /* the long soft shadow of all of it, before it is laid back */
    var cast = castShadow(t, base, 1.6, 0.6, 2, 0.32, 46, true);
    T.bbShade = alphaSheet(BB_W, BB_H, P.night, function (x, y) { return cast[y * BB_W + x]; });
    /* and laid back toward the wall */
    c.globalCompositeOperation = 'source-atop';
    c.fillStyle = rgba(P.wall, 0.28);
    c.fillRect(0, 0, BB_W, BB_H);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ------------------------------------------------- the humidifier

     Bar ref 3, close up: a frosted dome like a fat bell - broad across
     the top, steep at the sides, tucked in where it meets the base -
     white snow-flecks all over it, a small dark nozzle at the apex; a
     white cylindrical base with three buttons on its front. 44 x 50,
     against a 34px box stack: the photograph's proportion.

     THE DOME is two bands and a flat, not a ramp: a lit cap over its
     upper left, where the lamp is, shade down its right flank and along
     its foot where it turns under, and one flat between. The highlight
     is an oval and not a stripe, because a stripe down a dome reads as a
     tombstone; an oval on its shoulder reads as a dome. THE FLECKS are
     what says "humidifier" and not "egg": Bar ref 3's frosted snow-fleck
     finish, forty-six white pixels and a few pairs, thickest low down
     where the photograph has them. THE RING at the foot of the dome is
     the LED, and it is the one thing on the sprite that changes: idle,
     lit (the tell), hot (the spray). Frames 1 and 2 also light the
     frosted glass from inside, from below - which is what a lit diffuser
     looks like, and what makes the tell visible out of the side of the
     eye. */
  var DOME_W = [10, 16, 20, 24, 26, 28, 30, 31, 32, 33, 34, 35, 36, 36, 37, 37, 38, 38, 39, 39,
                39, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 40, 39, 38, 37, 36];

  function domeX0(y) { return Math.round(22 - DOME_W[y] / 2); }

  function bakeHumidifier(frame) {
    var t = makeCanvas(HUM_W + 2, HUM_H + 2), c = t.ctx;
    var r = mulberry32(8811), y, x, w, x0, dx, i, k;
    var RING = [P.ringIdle, P.ringLit, P.ringHot][frame];

    /* the dome, rows 0..39, and the ring on 40 */
    for (y = 0; y < DOME_W.length; y++) {
      w = DOME_W[y]; x0 = domeX0(y);
      for (x = x0; x < x0 + w; x++) {
        dx = (x + 0.5 - 22) / (w / 2);
        var hx = (dx + 0.38) / 0.42, hy = (y - 13) / 12;
        var col = P.humDome;
        if (y === 40) col = RING;
        else if (y >= 34 || dx > 0.55 || (dx < -0.86 && y > 24)) col = P.humDomeShade;
        else if (hx * hx + hy * hy < 1) col = P.humDomeLit;
        dot(c, col, 1 + x, 1 + y);
      }
    }
    /* the LED's light inside the frosted glass, from below */
    if (frame > 0) {
      var from = frame === 1 ? 14 : 4;
      for (y = from; y < 40; y++) {
        w = DOME_W[y]; x0 = domeX0(y);
        k = Math.pow((y - from) / (40 - from), 0.8);
        c.globalAlpha = (frame === 1 ? 0.50 : 0.70) * k;
        c.fillStyle = RING;
        c.fillRect(1 + x0, 1 + y, w, 1);
      }
      c.globalAlpha = 1;
    }
    /* the snow-flecks: never on the outer two columns of a row and never
       on the apex, where the nozzle is; weighted low, as in the photo */
    for (i = 0; i < 46; i++) {
      y = 3 + Math.floor(Math.sqrt(r()) * 35);
      w = DOME_W[y]; x0 = domeX0(y);
      x = x0 + 2 + Math.floor(r() * Math.max(1, w - 5));
      dot(c, P.humSpeck, 1 + x, 1 + y);
      if (i % 6 === 0) dot(c, P.humSpeck, 2 + x, 1 + y);
    }
    /* the nozzle, a dark hole with the glass's lip lit behind it */
    c.fillStyle = P.humNozzle; c.fillRect(1 + 21, 1 + 1, 3, 2);
    dot(c, P.humDomeShade, 1 + 21, 1 + 3); dot(c, P.humDomeShade, 1 + 23, 1 + 3);

    /* THE BASE, rows 41..49, 40 wide: a lit lip where the dome sits in
       it, the face, the shade down its right and along its foot, its
       bottom corners rounded, and the three buttons in a row */
    c.fillStyle = P.humBase;      c.fillRect(1 + 2, 1 + 41, 40, 9);
    c.fillStyle = P.humDomeLit;   c.fillRect(1 + 3, 1 + 41, 32, 1);
    c.fillStyle = P.humBaseShade; c.fillRect(1 + 36, 1 + 42, 6, 6);
    c.fillRect(1 + 2, 1 + 48, 40, 2);
    c.clearRect(1 + 2, 1 + 49, 1, 1); c.clearRect(1 + 41, 1 + 49, 1, 1);
    c.fillStyle = P.humNozzle;
    c.fillRect(1 + 17, 1 + 45, 2, 1); c.fillRect(1 + 21, 1 + 45, 2, 1); c.fillRect(1 + 25, 1 + 45, 2, 1);
    return ringed(t);
  }

  /* ---------------------------------------------------- the light

     ONE BAKED SHEET, the Living Room's bakeLight with this bay's
     numbers: warmth down off the ledge from the lamp beyond it, night
     coming up off the bar, void in the two side columns. No pool under
     the pendant - it is on the far side of the half wall. Pillars are
     drawn after it and are never night-shaded, which is what keeps the
     white planters clear of the wall at the bottom of the room. */
  function bakeLight() {
    var t = makeCanvas(VW, VH), c = t.ctx, y, x, k;
    for (y = CEIL; y < CEIL + 56; y++) {
      k = 1 - ease((y - CEIL) / 56);
      c.fillStyle = rgba(H.lampGlow, 0.10 * k);
      c.fillRect(0, y, VW, 1);
    }
    /* full by FLOOR-16 and full to FLOOR */
    for (y = FLOOR - 100; y < FLOOR; y++) {
      k = ease((y - (FLOOR - 100)) / 84);
      c.fillStyle = rgba(P.night, 0.22 * k);
      c.fillRect(0, y, VW, 1);
    }
    for (x = 0; x < 56; x++) {
      k = 1 - ease(x / 56);
      c.fillStyle = rgba(H.void, 0.22 * k);
      c.fillRect(x, CEIL, 1, FLOOR - CEIL);
      c.fillRect(VW - 1 - x, CEIL, 1, FLOOR - CEIL);
    }
    return t;
  }

  /* -------------------------------------------------- the bar top

     The floor band, 480 x 28 at 1.0, Bar ref 1-4: the charcoal
     distressed slab seen from just above, dry-brushed pale along its
     grain, its lit front edge, and under it the open shelf of the
     cabinet between two mesh doors - the red book, the board game with
     its purple, red and blue pegs, the clock. Ref 4 is all of it.

        0      barArris   the kill edge, the brightest row in the band
        1      charLit
        2..14  the slab: char, dry-brush streaks, grain, nail dents
        15     charDeep   the seam where the slab steps to its nose
        16..17 charLit    the front edge, Bar ref 3's pale nose
        18     charDeep   under it
        19..27 the shelf, in the dark */
  function bakeFloor() {
    var W = VW, Hh = VH - FLOOR, t = makeCanvas(W, Hh), c = t.ctx;
    var r = mulberry32(5177), i, x, y;

    c.fillStyle = P.barArris; c.fillRect(0, 0, W, 1);
    c.fillStyle = H.charLit;  c.fillRect(0, 1, W, 1);
    c.fillStyle = H.char;     c.fillRect(0, 2, W, 13);
    /* the dry brush: pale streaks along the grain, never on the two
       edge rows, so the arris stays one clean line */
    for (i = 0; i < 30; i++) {
      c.fillStyle = P.distress;
      x = Math.floor(r() * W);
      var len = 6 + Math.floor(r() * 17);
      y = 2 + Math.floor(r() * 13);
      for (var k = 0; k < len; k++) c.fillRect((x + k) % W, y, 1, 1);
    }
    for (i = 0; i < 14; i++) {
      c.fillStyle = H.charGrain;
      x = Math.floor(r() * W);
      c.fillRect(x, 2 + Math.floor(r() * 13), Math.min(3 + Math.floor(r() * 6), W - x), 1);
    }
    for (i = 0; i < 6; i++) dot(c, H.charDeep, Math.floor(r() * W), 3 + Math.floor(r() * 11));

    c.fillStyle = H.charDeep; c.fillRect(0, 15, W, 1);
    c.fillStyle = H.charLit;  c.fillRect(0, 16, W, 2);
    /* the nose catches the lamp in a few long pale scuffs, Bar ref 3 */
    for (i = 0; i < 8; i++) {
      c.fillStyle = P.distress;
      x = Math.floor(r() * W);
      c.fillRect(x, 16 + Math.floor(r() * 2), Math.min(4 + Math.floor(r() * 10), W - x), 1);
    }
    c.fillStyle = H.charDeep; c.fillRect(0, 18, W, 1);

    /* THE SHELF, Bar ref 4 */
    c.fillStyle = H.void; c.fillRect(0, 19, W, Hh - 19);
    /* the mesh doors either side, each a dark panel with the wire as a
       dot grid in its own frame */
    meshDoor(c, 0, 71);
    meshDoor(c, 400, 71);
    /* the stiles between a door and the open shelf */
    c.fillStyle = H.charLit;
    c.fillRect(72, 19, 1, Hh - 19); c.fillRect(398, 19, 1, Hh - 19);
    /* the red book standing at the end of the shelf */
    c.fillStyle = P.book;    c.fillRect(128, 19, 8, 9);
    c.fillStyle = P.bookLit; c.fillRect(128, 19, 1, 9);
    c.fillStyle = H.charDeep; c.fillRect(137, 19, 1, 9);
    /* the board game: a wooden board and the pegs on it */
    c.fillStyle = P.boardWood; c.fillRect(168, 21, 70, 3);
    c.fillStyle = H.charDeep;  c.fillRect(168, 24, 70, 1);
    var PEGS = [[174, P.pegPurple], [188, P.pegPurple], [202, P.pegPurple],
                [216, P.pegRed], [226, P.pegRed], [234, P.pegBlue]];
    for (i = 0; i < PEGS.length; i++) {
      c.fillStyle = PEGS[i][1]; c.fillRect(PEGS[i][0], 19, 3, 3);
      dot(c, H.void, PEGS[i][0] + 1, 20);
    }
    /* the clock, its rim and face */
    c.fillStyle = P.clockRim;  c.fillRect(262, 19, 12, 6);
    c.fillStyle = P.clockFace; c.fillRect(264, 20, 8, 5); c.fillRect(263, 21, 10, 3);
    dot(c, P.outline, 267, 20); dot(c, P.outline, 268, 22); dot(c, P.outline, 267, 22);
    /* and down into the dark, flat, because this tile is static */
    Tint.rect(c, 0, 19, W, Hh - 19, H.void, 4);
    return t;
  }

  function meshDoor(c, x0, w) {
    var x, y, Hh = VH - FLOOR;
    c.fillStyle = H.charDeep; c.fillRect(x0, 19, w, Hh - 19);
    c.fillStyle = H.charGrain;
    c.fillRect(x0, 19, w, 1); c.fillRect(x0, 19, 1, Hh - 19); c.fillRect(x0 + w - 1, 19, 1, Hh - 19);
    c.fillStyle = P.mesh;
    for (y = 21; y < Hh; y += 2) for (x = x0 + 3 + ((y >> 1) & 1); x < x0 + w - 2; x += 2) c.fillRect(x, y, 1, 1);
  }

  /* ---------------------------------------------------- the pillars

     THE OWNER'S PICK: stacked wooden spirit boxes and white footed
     planters. Three variants - the red-brown box (30%), the dark walnut
     box (25%) and the planter (45%) - and the planters get the smaller
     share because they are the weaker read against a cream wall: 55%
     dark wood is what keeps the bay's columns legible at a glance.

     WHAT KEEPS THEM OFF THE WALL. The boxes are about seventy values
     under it. The planters are only about forty over it, so they carry
     everything else the house has: a hard outline all round, the 4px
     void cast shadow on the wall behind, the waffle of cells that makes
     them the pot in Bar ref 1 rather than a white tube, and the fact
     that they are drawn after the light sheet and never night-shaded. */

  /* THE SPIRIT BOX, one box on end, 34 x 44. Bar ref 3: dark red-brown
     wood, a hinged lid with a seam across it near the top, the grain
     running UP because the box stands on end, and a brass plaque low on
     the front - blank, with no lettering, no dots, nothing in it. */
  function bakeBox(v) {
    var W = 34, Hh = 44, t = makeCanvas(W, Hh), c = t.ctx;
    var r = mulberry32(7300 + v * 17), i, k, x, y;
    var wood = v ? P.boxWood2 : P.boxWood, lit = v ? P.boxLit2 : P.boxLit, hi = v ? P.boxHi2 : P.boxHi;

    c.fillStyle = wood;       c.fillRect(0, 0, W, Hh);
    c.fillStyle = hi;         c.fillRect(1, 0, 1, Hh);
    c.fillStyle = lit;        c.fillRect(2, 0, 1, Hh);
    c.fillStyle = P.boxShade; c.fillRect(30, 0, 3, Hh);

    /* THE GRAIN, before the joints so the joints cut it. Twelve ticks,
       vertical, never through the lid seam and never on the plaque. */
    for (i = 0; i < 12; i++) {
      for (k = 0; k < 20; k++) {
        x = 4 + Math.floor(r() * 25);
        y = 10 + Math.floor(r() * 30);
        var len = 3 + Math.floor(r() * 7);
        if (y + len > 42) continue;
        if (x >= 11 && x <= 22 && y + len >= 29 && y <= 36) continue;
        c.fillStyle = (i % 3 === 0) ? lit : P.boxShade;
        c.fillRect(x, y, 1, len);
        break;
      }
    }
    /* three more on the lid, short */
    for (i = 0; i < 3; i++) {
      c.fillStyle = P.boxShade;
      c.fillRect(5 + Math.floor(r() * 23), 3, 1, 2 + Math.floor(r() * 3));
    }

    /* THE JOINTS. Shade, outline, outline, lit - a dark line with a lit
       lip, which is how every joint in this game is drawn: the bottom
       of one box (42 shade, 43 outline) meets the top of the next (0
       outline, 1 lit arris). And the lid's own seam: 8 the dark of the
       gap, 9 the lit lip under it - the Coop's joint, at box scale. */
    c.fillStyle = P.outline;  c.fillRect(0, 0, W, 1);
    c.fillStyle = hi;         c.fillRect(1, 1, W - 2, 1);
    c.fillStyle = P.boxDeep;  c.fillRect(1, 8, W - 2, 1);
    c.fillStyle = hi;         c.fillRect(1, 9, W - 2, 1);
    c.fillStyle = P.boxShade; c.fillRect(1, 42, W - 2, 1);
    c.fillStyle = P.outline;  c.fillRect(0, 43, W, 1);
    c.fillRect(0, 0, 1, Hh); c.fillRect(W - 1, 0, 1, Hh);

    /* THE PLAQUE, columns 12..21, rows 30..35: lit on its top and left,
       dark on its bottom and right, which is a plate standing proud of
       the wood */
    c.fillStyle = P.brass;    c.fillRect(12, 30, 10, 6);
    c.fillStyle = P.brassLit; c.fillRect(12, 30, 10, 1); c.fillRect(12, 30, 1, 6);
    c.fillStyle = P.boxDeep;  c.fillRect(12, 35, 10, 1); c.fillRect(21, 30, 1, 6);
    /* and the one fleck of light on the brass, which is what makes it
       metal rather than a mustard rectangle */
    dot(c, P.brassLit, 14, 32);
    return t;
  }

  /* THE BOX CAP, 42 x 9: a box lying on its side across the mouth of the
     gap, lid end to the left - the lid's seam seen from the side is the
     dark column at 9 - with the edge of its plaque catching the lamp. A
     box with softened corners, not a bar. `down` is the same thing
     mirrored for the mouth of a hanging stack. */
  function bakeBoxCap(v, down) {
    var W = 42, Hh = 9, t = makeCanvas(W, Hh), c = t.ctx;
    var wood = v ? P.boxWood2 : P.boxWood, lit = v ? P.boxLit2 : P.boxLit, hi = v ? P.boxHi2 : P.boxHi;
    c.fillStyle = P.outline;  c.fillRect(0, 0, W, 1);
    c.fillStyle = hi;         c.fillRect(0, 1, W, 1);
    c.fillStyle = wood;       c.fillRect(0, 2, W, 5);
    c.fillStyle = lit;        c.fillRect(1, 2, 8, 5);
    c.fillStyle = P.boxDeep;  c.fillRect(9, 2, 1, 5);
    c.fillStyle = P.boxShade; c.fillRect(0, 7, W, 1);
    c.fillStyle = P.outline;  c.fillRect(0, 8, W, 1);
    c.fillRect(0, 0, 1, Hh); c.fillRect(W - 1, 0, 1, Hh);
    /* the grain along it, because it is lying down */
    c.fillStyle = P.boxShade;
    c.fillRect(14, 3, 7, 1); c.fillRect(29, 5, 9, 1); c.fillRect(12, 6, 5, 1);
    /* the plaque's edge */
    c.fillStyle = P.brass; c.fillRect(24, 3, 4, 3);
    dot(c, P.brassLit, 24, 3);
    /* the four corners taken off */
    c.clearRect(0, 0, 1, 1); c.clearRect(W - 1, 0, 1, 1);
    c.clearRect(0, Hh - 1, 1, 1); c.clearRect(W - 1, Hh - 1, 1, 1);
    return down ? flipped(t) : t;
  }

  /* THE PLANTER, one pot, 34 x 38. Bar ref 1/5: a white pot with a
     rolled rim, bellied in the middle, its whole face a grid of small
     recessed cells, standing on three square feet with the wall showing
     between them.

       0     outline       3      potShade (the rim's undershadow)
       1     potHi         4..31  the body, bellied, the cells
       2     potWhite      32     potDeep, the bottom rim
                           33..36 THE FEET, transparent between
                           37     outline under each foot

     THE CELLS, and they are what makes it the pot in Bar ref 1 rather
     than a white tube: rows of small recessed squares all over its face,
     each a flat face with a darker L along its right side and its foot -
     the shadow inside the recess. They are laid ROUND THE POT, not flat
     on it: the cell columns are evenly spaced in ANGLE, so they are five
     pixels wide down the middle and squeeze to one or two at the flanks,
     which is the whole of what tells the eye the pot is round. Four rows
     to a cell down its height. Over the lit left the faces are potHi,
     over the right flank and along the belly where it turns under they
     are potShade with a potDeep L, and flat between: two bands and a
     flat, and every band edge sits on a cell line. */
  var POT_INSET = [2, 2, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
                   0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2];
  var POT_FEET = [[3, 5], [14, 6], [26, 5]];      /* [first column, width] */
  var POT_CELLS = 10;                             /* cell columns across the visible half */

  /* which cell column a pixel column is in, by angle round the pot */
  function potCell(x) {
    var u = Math.asin(clamp((x + 0.5 - 17) / 16.6, -1, 1)) / (Math.PI / 2);
    return Math.min(POT_CELLS - 1, Math.floor((u + 1) / 2 * POT_CELLS));
  }

  function bakePot() {
    var W = 34, Hh = 38, t = makeCanvas(W, Hh), c = t.ctx;
    var x, y, s, i;
    /* the rim */
    c.fillStyle = P.outline;  c.fillRect(0, 0, W, 1);
    c.fillStyle = P.potHi;    c.fillRect(1, 1, W - 2, 1);
    c.fillStyle = P.potWhite; c.fillRect(1, 2, W - 2, 1);
    c.fillStyle = P.potShade; c.fillRect(1, 3, W - 2, 1);
    c.fillStyle = P.outline;  c.fillRect(0, 0, 1, 4); c.fillRect(W - 1, 0, 1, 4);
    c.fillStyle = P.potShade; c.fillRect(W - 4, 1, 3, 2);
    /* the body and its cells */
    for (y = 4; y < 32; y++) {
      s = POT_INSET[y - 4];
      dot(c, P.outline, s, y); dot(c, P.outline, W - 1 - s, y);
      for (x = s + 1; x < W - 1 - s; x++) {
        var cell = potCell(x);
        var vline = x < W - 2 - s && potCell(x + 1) !== cell;
        var hline = wrap(y - 4, 4) === 3;
        var edge = vline || hline;
        var dark = cell >= POT_CELLS - 2 || y >= 28;
        var lit = !dark && cell <= 1;
        var col;
        if (dark) col = edge ? P.potDeep : P.potShade;
        else if (lit) col = edge ? P.potCell : P.potHi;
        else col = edge ? P.potCell : P.potWhite;
        dot(c, col, x, y);
      }
    }
    /* the bottom rim */
    c.fillStyle = P.potDeep; c.fillRect(3, 32, W - 6, 1);
    dot(c, P.outline, 2, 32); dot(c, P.outline, W - 3, 32);
    /* the three feet, and the outline round each */
    for (i = 0; i < POT_FEET.length; i++) {
      var fx = POT_FEET[i][0], fw = POT_FEET[i][1];
      c.fillStyle = P.potWhite; c.fillRect(fx, 33, fw, 4);
      c.fillStyle = P.potHi;    c.fillRect(fx, 33, 1, 3);
      c.fillStyle = P.potShade; c.fillRect(fx + fw - 1, 33, 1, 4);
      c.fillStyle = P.potDeep;  c.fillRect(fx, 36, fw, 1);
      c.fillStyle = P.outline;
      c.fillRect(fx - 1, 33, 1, 4); c.fillRect(fx + fw, 33, 1, 4);
      c.fillRect(fx - 1, 37, fw + 2, 1);
    }
    return t;
  }

  /* THE PLANTER CAPS.
     The LOWER one, at the mouth of a standing stack: the top pot's rim
     with the PEACE LILY growing out of it, Bar ref 1/5 - three leaf
     spears, one upright and one leaning out each way, in rows 0..3,
     with air either side of them. rectsFor gives the leaves their own
     narrow box for exactly that reason: one 42x9 box would kill in the
     air beside them.
     The UPPER one, at the mouth of a hanging stack: an upturned pot's
     rim, no plant. */
  var LILY = ['.........L..........',
              '..LG....LGD.....GD..',
              '...LGD..LGD....LGD..',
              '....GD...G.....GD...'];
  var LILY_X = 10;          /* the map's first column in the cap */

  function capCell(x) {
    var u = Math.asin(clamp((x + 0.5 - 21) / 20.6, -1, 1)) / (Math.PI / 2);
    return Math.min(11, Math.floor((u + 1) / 2 * 12));
  }

  function bakePotCap(down) {
    var W = 42, Hh = 9, t = makeCanvas(W, Hh), c = t.ctx, x, y, i;
    var top = down ? 0 : 4;
    /* the rows, top to bottom; null is the face, where the cells go */
    var rows = down ? [P.outline, P.potDeep, P.potShade, null, null, null, null, P.potHi, P.outline]
                    : [0, 0, 0, 0, P.potHi, null, null, P.potShade, P.outline];
    for (y = top; y < Hh; y++) {
      for (x = 1; x < W - 1; x++) {
        var cell = capCell(x), col = rows[y];
        if (col === null) {
          var edge = (x < W - 2 && capCell(x + 1) !== cell) || (down && y === 5);
          if (cell >= 10) col = edge ? P.potDeep : P.potShade;
          else if (cell <= 1) col = edge ? P.potCell : P.potHi;
          else col = edge ? P.potCell : P.potWhite;
        } else if (cell >= 10 && col === P.potHi) col = P.potWhite;
        dot(c, col, x, y);
      }
    }
    /* the ends and their corners */
    c.fillStyle = P.outline;
    c.fillRect(0, top, 1, Hh - top); c.fillRect(W - 1, top, 1, Hh - top);
    c.clearRect(0, top, 1, 1); c.clearRect(W - 1, top, 1, 1);
    c.clearRect(0, Hh - 1, 1, 1); c.clearRect(W - 1, Hh - 1, 1, 1);
    if (!down) {
      /* the soil it is planted in, under the leaves */
      c.fillStyle = P.soil; c.fillRect(11, 4, 19, 1);
      dot(c, P.soilLit, 15, 4); dot(c, P.soilLit, 24, 4);
      plot(c, LILY, { L: H.leafLit, G: H.leaf, D: H.leafDeep }, LILY_X, 0);
    }
    return t;
  }

  /* A HANGING STACK IS TILED FROM ITS CAP UPWARD, so the unit cut short
     is the one that disappears into the ledge and not the one next to
     the gap - drawColumn's rule, from the other end. The tile is the
     flipped one: boxes hang lid-down and pots mouth-down, so the units
     either side of a gap present the same face to it. */
  function columnUp(ctx, tile, x, y, h) {
    var th = tile.height, w = tile.width, drawn = 0, slice;
    while (drawn < h) {
      slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + h - drawn - slice, w, slice);
      drawn += slice;
    }
  }

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), v = ob.variant;
    var topEnd = ob.gapY - 9;               /* the upper cap's first row  */
    var botY = ob.gapY + ob.gapH;           /* the lower cap's first row  */
    var colY = botY + 9;                    /* the lower column's first row */
    /* THE CAST SHADOWS FIRST, on the wall behind: 4px of void at 6/16
       to the right of the column and of each cap. A flat Tint, because
       it moves; drawn before the stack so the caps' own ends are never
       darkened by the column's shadow. */
    if (topEnd > CEIL) Tint.rect(ctx, x + 34, CEIL, 4, topEnd - CEIL, P.void, 6);
    Tint.rect(ctx, x + 38, topEnd, 4, 9, P.void, 6);
    Tint.rect(ctx, x + 38, botY + (v === 2 ? 4 : 0), 4, v === 2 ? 5 : 9, P.void, 6);
    if (FLOOR > colY) Tint.rect(ctx, x + 34, colY, 4, FLOOR - colY, P.void, 6);
    /* and the soft half of it: the low lamp on the left throws every
       stack's shadow a long way across the wall, so the hard 4px strip
       runs on into a 16px ramp - an alpha sprite that moves with the
       column, never a Dither */
    var cs = T.colShade.canvas;
    if (topEnd > CEIL) ctx.drawImage(cs, 0, 0, 16, 1, x + 38, CEIL, 16, topEnd - CEIL);
    ctx.drawImage(cs, 0, 0, 16, 1, x + 42, topEnd, 16, 9);
    ctx.drawImage(cs, 0, 0, 16, 1, x + 42, botY + (v === 2 ? 4 : 0), 16, v === 2 ? 5 : 9);
    if (FLOOR > colY) ctx.drawImage(cs, 0, 0, 16, 1, x + 38, colY, 16, FLOOR - colY);

    if (topEnd > CEIL) columnUp(ctx, T.stackUp[v].canvas, x, CEIL, topEnd - CEIL);
    if (FLOOR > colY) DiningRoom.drawColumn(ctx, T.stack[v].canvas, x, colY, 34, FLOOR - colY);
    ctx.drawImage(T.capDown[v].canvas, x - 4, topEnd);
    ctx.drawImage(T.capUp[v].canvas, x - 4, botY);
  }

  /* ----------------------------------------------------- the cork

     7 x 11 standing on end, plotted from a grid, one character to the
     pixel:  L corkLit  C cork  S corkShade  D corkDeep  W wine  V wineLit
     The top end is a flat disc catching the lamp; the shaft has a few
     pits of shade in it, which is what cork is; the bottom two rows are
     the wine stain, and that stain is what makes a pale cylinder a
     CORK at eleven pixels. */
  var CORK = ['LLLLLLC',
              'LCCCCSD',
              'LCCSCSD',
              'LCCCCSD',
              'LCSCCSD',
              'LCCCCSD',
              'LCCCSSD',
              'LCSCCSD',
              'LCCCCSD',
              'VWWWWWD',
              'VWWWWDD'];

  /* Baked at (3, 1) on a 13x13 sheet and turned by exact quarter turns
     about its middle - 13 is odd, so every pixel lands on a pixel. The
     four frames are upright, on its side, upside down, on its side the
     other way: a cylinder going end over end. */
  function bakeCorks() {
    var t = makeCanvas(13, 13);
    plot(t.ctx, CORK, { L: P.corkLit, C: P.cork, S: P.corkShade, D: P.corkDeep,
                        W: P.wine, V: P.wineLit }, 3, 1);
    ringed(t);
    return [t, turned(t, 1), turned(t, 2), turned(t, 3)];
  }

  /* THE LYING CORK: frame 1 cropped to the cork and its ring. Drawn for
     a cork that has settled (drawDropSplat) and for the corks already
     lying on the bar as litter - the same sprite in both places, on
     purpose: a cork lying down is nothing, and the bay says so twice. */
  function bakeCorkDown(frames) {
    var t = makeCanvas(13, 9);
    t.ctx.drawImage(frames[1].canvas, 0, 2, 13, 9, 0, 0, 13, 9);
    return t;
  }

  /* ---------------------------------------------------- the record

     THE SPIN, as a 7-inch single flipping end over end as it falls:
     face, oblique, edge, oblique the other way. Black vinyl with its
     grooves, the shine across its upper left, the purple label with the
     spindle hole - and the purple is the engine's own, so the record and
     the power it gives are one colour. 17 across, on a 19 sheet with
     its ring. */
  function bakeRecordFace(rows) {
    var t = makeCanvas(19, rows + 2), c = t.ctx;
    var cx = 9, cy = 1 + (rows - 1) / 2, sq = 17 / rows;
    var px, py, dx, dy, d, ang, col;
    for (py = 0; py < rows + 2; py++) {
      for (px = 0; px < 19; px++) {
        dx = px - cx; dy = (py - cy) * sq;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d > 8.4) continue;
        ang = Math.atan2(dy, dx) * 180 / Math.PI;
        if (ang < 0) ang += 360;
        if (d > 7.4) col = P.vinylRim;
        else if (d > 6.2 && ang >= 200 && ang <= 250) col = P.vinylShine;
        else if (d <= 3.4) {
          col = P.labelPurple;
          if (d > 2.4 && ang >= 180 && ang <= 300) col = P.labelHi;
          else if (d > 2.4 && ang <= 120) col = P.labelDark;
        } else if (Math.floor(d) === 5 || Math.floor(d) === 7) col = P.vinylGroove;
        /* the sheen across the grooves, the two opposed wedges every
           record has under a lamp */
        else if ((ang >= 205 && ang <= 240) || (ang >= 25 && ang <= 60)) col = P.vinylGroove;
        else col = P.vinyl;
        dot(c, col, px, py);
      }
    }
    /* the spindle hole, and the one white point on the shine */
    dot(c, P.vinyl, cx, Math.round(cy));
    dot(c, '#ffffff', cx - 5, Math.round(cy - 5 / sq));
    return ringed(t);
  }

  function bakeRecordEdge() {
    var t = makeCanvas(19, 7), c = t.ctx;
    c.fillStyle = P.vinylShine;  c.fillRect(1, 1, 17, 1);
    c.fillStyle = P.vinyl;       c.fillRect(1, 2, 17, 3);
    c.fillStyle = P.labelPurple; c.fillRect(7, 2, 5, 3);
    dot(c, P.labelHi, 8, 2);
    c.fillStyle = P.vinylRim;    c.fillRect(1, 5, 17, 1);
    return ringed(t);
  }

  /* ---------------------------------------------------- the pinecone

     THE SPARE LIFE, Bar ref 1/5: a big open pinecone standing on its
     base on the bar, pointed at the top and blunt at the foot. 13 x 17.

     WHAT MAKES IT A PINECONE AT THIRTEEN PIXELS is the edge, not the
     inside. A smooth brown oval with a pattern on it is an egg with a
     pattern on it; an open cone's silhouette is JAGGED, every third row
     a pair of scale tips standing out a pixel past the body, and the
     ring laid under follows them - so it gets a serrated outline that
     nothing else in the room has. Inside, the scales are bands of three
     rows in a brick offset: the shadowed underside of a scale, its face,
     and its lit tip, with a dark gap between one scale and the next. The
     lower right of the cone turns away from the lamp. A stalk on top.
     It glows jade, the jade every spare life in the game glows. */
  var CONE = [[6, 1], [5, 3], [4, 5], [3, 7], [3, 7], [2, 9], [2, 9], [1, 11], [1, 11], [1, 11],
              [1, 11], [1, 11], [1, 11], [2, 9], [2, 9], [3, 7], [4, 5]];
  /* the rows whose scale tips stand proud of the body, one pixel each side */
  var CONE_TIPS = [3, 6, 9, 12, 14];

  function bakePinecone() {
    var t = makeCanvas(15, 20), c = t.ctx, i, k, ox = 1, oy = 2;
    for (i = 0; i < CONE.length; i++) {
      var band = Math.floor(i / 3), r = i % 3, shift = (band & 1) ? 2 : 0;
      for (k = CONE[i][0]; k < CONE[i][0] + CONE[i][1]; k++) {
        var u = wrap(k - shift, 4), col;
        if (r === 0) col = u === 3 ? P.coneDeep : P.coneShade;
        else if (r === 1) col = u === 3 ? P.coneDeep : P.cone;
        else col = u === 3 ? P.coneShade : (u === 1 ? P.coneLit : P.cone);
        /* turned from the lamp: the lower right */
        if (k > 7 && i > 7) {
          if (col === P.cone) col = P.coneShade;
          else if (col === P.coneLit) col = P.cone;
        }
        dot(c, col, ox + k, oy + i);
      }
    }
    for (i = 0; i < CONE_TIPS.length; i++) {
      var row = CONE_TIPS[i];
      dot(c, P.coneLit, ox + CONE[row][0] - 1, oy + row);
      dot(c, P.coneShade, ox + CONE[row][0] + CONE[row][1], oy + row);
    }
    /* the apex is one lit pixel, not a dark one */
    dot(c, P.coneLit, ox + 6, oy);
    ringed(t);
    dot(c, P.coneDeep, ox + 6, 0);           /* the stalk, outside the ring */
    return t;
  }

  /* ------------------------------------------------------ the litter

     What is lying on the bar top, below the kill line, drawn once each.
     None of it has a box and none of it ever will: everything drawn at
     FLOOR+n is already the floor. Bar ref 1/2: the tiny clear snowman,
     the pale pumice rock, a print slid off the stack - and corks, lying
     down, which is the bay's rule written on the furniture. */
  function bakeSnowman() {
    var ROWS = [[2, 3], [2, 3], [1, 5], [1, 5], [1, 5], [0, 7], [0, 7], [0, 7], [0, 7], [1, 5], [1, 5]];
    var t = makeCanvas(9, 13), c = t.ctx, i;
    DiningRoom.rowsFill(c, ROWS, 1, 1, P.snow);
    for (i = 0; i < ROWS.length; i++) {
      dot(c, P.snowHi, 1 + ROWS[i][0], 1 + i);
      dot(c, P.snowShade, ROWS[i][0] + ROWS[i][1], 1 + i);
    }
    /* the tiers' joins, and one see-through pixel in each - it is glass */
    c.fillStyle = P.snowShade; c.fillRect(3, 2 + 1, 3, 1); c.fillRect(2, 1 + 4, 5, 1);
    dot(c, P.snowHi, 4, 1);
    dot(c, P.wall, 4, 2); dot(c, P.wall, 4, 4); dot(c, P.wall, 4, 8);
    return ringed(t);
  }

  function bakeRock() {
    var t = makeCanvas(11, 7), c = t.ctx;
    DiningRoom.rowsFill(c, [[2, 5], [1, 7], [0, 9], [0, 9], [1, 7]], 1, 1, P.rock);
    c.fillStyle = P.rockShade; c.fillRect(6, 3, 4, 2); c.fillRect(4, 5, 4, 1);
    dot(c, P.potHi, 3, 2); dot(c, P.potHi, 5, 3);
    dot(c, P.rockShade, 4, 2);
    return ringed(t);
  }

  function bakePrint() {
    var t = makeCanvas(12, 8), c = t.ctx;
    c.fillStyle = P.print;      c.fillRect(1, 1, 10, 6);
    c.fillStyle = P.printShade; c.fillRect(1, 6, 10, 1); c.fillRect(10, 1, 1, 6);
    c.fillStyle = P.printInk;   c.fillRect(3, 3, 3, 1);
    dot(c, H.leaf, 7, 2); dot(c, P.stampRed, 7, 4);
    return ringed(t);
  }

  /* ------------------------------------------------------- THE MIST

     The humidifier's clock lives in run.ledger.mist, is stepped by
     stepWorld and drawn by drawOverlay, and every piece of the fog is a
     baked alpha sheet in P.mist.

     ONE CYCLE: IDLE 9..15s (from the end of the last clear), then
       TELL  1.5s  the ring lights over 0.4s, a hiss, three small chuffs
                   out of the nozzle half a second apart
       RISE  1.2s  a second hiss: the plume starts, the fog rolls out of
                   the humidifier and thickens
       HOLD  2.8s  full fog, the plume still pouring, the ring pulsing
       CLEAR 2.0s  the fog thins to nothing
     The FIRST tell is due 3s after run.late is first seen - the engine
     shows WARN.late at lateScore for 2.4s, so the first chuff lands just
     as the banner leaves - and nothing at all happens before run.late.
     A tell that falls due while the machine is about to slide off the
     left of the screen waits for it to come round again (THE GATE, in
     stepWorld): up to about 4.4s, because a spray nobody can see coming
     out of anything is the one version of this the owner did not ask
     for.

     MEASURED at the real tune, autopiloted, eight one-minute runs: the
     late phase arms at 13.5..20.4s, the first tell comes 3.0..6.7s after
     that, and then one every 17..22s. The fog lasts 6s a time (2.8s of
     it at full density), so the lane is fogged about three tenths of
     the late game and at full about a seventh.

     THREE TELLS, 1.5s AHEAD OF ANY FOG: the hiss, the ring and the
     chuffs. And then the plume itself climbing out of the dome, which
     is the owner's word for it - the humidifier "sprays out mist" - and
     a fog that visibly ROLLS OUT FROM IT across the room rather than
     fading up everywhere at once, so there is never any doubt where it
     came from. */
  var IDLE = 0, TELL = 1, RISE = 2, HOLD = 3, CLEAR = 4;
  var T_TELL = 1.5, T_RISE = 1.2, T_HOLD = 2.8, T_CLEAR = 2.0;
  var GAP_MIN = 9, GAP_MAX = 15, FIRST = 3.0;
  var GATE_MIN = 150, GATE_MAX = 470;
  var CHUFFS = [0, 0.5, 1.0];
  var PUFF_LIFE = 0.8;
  /* THE PLUME: a blob every 0.09s through RISE and HOLD (every 0.045s
     for the first half second) - about 50 - each living 3.2s, so at most
     ~36 alive and the cap is a guard */
  var BLOB_EVERY = 0.09, BLOB_CAP = 48, BLOB_LIFE = 3.2;
  /* THE FRONT: the fog's leading edge, a circle round the nozzle that
     grows at 380px/s with a 140px soft rim. It covers the whole lane
     (the far corner is ~510px from a nozzle at the screen's edge) about
     1.7s after the spray starts - the 1.2s rise plus half a second -
     and from then on the sheet is simply drawn whole. */
  var FRONT_V = 380, FRONT_SOFT = 140, FRONT_FULL = 700;
  /* the most the plume can add over the haze, wherever it piles up */
  var PLUME_A = 0.60;

  function freshMist() {
    return { phase: IDLE, t: 0, next: Infinity, density: 0, ring: 0,
             blobs: [], acc: 0, puffs: [], chuffs: 0,
             driftA: 0, driftB: 0, front: 0, fx: 0, src: 0, sprays: 0 };
  }

  /* how big and how thick a plume blob is at its age. It leaves the
     nozzle as a small dense jet - three pixels of radius at 0.40 - and
     opens out to forty-eight while it thins: that change of size is
     what reads as SPRAY rather than as smoke. */
  function blobR(b) { return 3 + 45 * ease(b.age / 2.6); }
  function blobA(b) { return 0.62 * Math.min(1, b.age / 0.08) * Math.max(0, 1 - b.age / BLOB_LIFE); }

  function stepWorld(dt, obstacles, run) {
    var L = run.ledger, m = L.mist, i, b;
    if (!m) m = L.mist = freshMist();
    var speed = run.speed || 0;
    /* the mist rides the humidifier's layer: everything in it is carried
       left at the wall's 0.30, or the plume would slide off the nozzle */
    var carry = speed * WALL_PAR * dt;
    var n1 = humX(run.scroll || 0) + NOZ_DX, k;

    /* THE SOURCE: once a spray has begun, the machine it comes from is
       the copy of the humidifier nearest where that machine was last
       frame - followed exactly, off the same rounding tileX uses - so the
       chuffs, the plume and the fog's front all come out of one dome even
       if it slides off the left of the screen mid-spray. */
    if (m.phase !== IDLE) {
      var want = m.src - carry, best = n1;
      for (k = -1; k <= 1; k++) {
        if (Math.abs(n1 + k * VW - want) < Math.abs(best - want)) best = n1 + k * VW;
      }
      m.src = best;
    }

    m.t += dt;
    if (m.phase === IDLE) {
      if (run.late && m.next === Infinity) m.next = FIRST;
      if (m.next !== Infinity) {
        m.next -= dt;
        /* THE GATE. A spray only starts while the humidifier on screen
           has room to do it in: nozzle at x 150..470, so that sliding
           left at up to 53px/s it is still on the screen when the plume
           starts 1.5s later and through the 1.2s of the rise. Otherwise
           the clock waits - at most about 4.4s, which is how long the
           next copy takes to come in from the right - and a tell is never
           wasted on a machine about to leave. */
        var nx = nozzleX(run.scroll || 0);
        if (m.next <= 0 && nx >= GATE_MIN && nx <= GATE_MAX) {
          m.phase = TELL; m.t = 0; m.chuffs = 0; m.src = nx;
          L.cry = 'hiss';
        }
      }
    }
    if (m.phase === TELL) {
      m.ring = ease(m.t / 0.4);
      while (m.chuffs < CHUFFS.length && m.t >= CHUFFS[m.chuffs]) {
        m.puffs.push({ x: m.src, y: NOZ_Y - 1, age: 0 });
        m.chuffs++;
      }
      if (m.t >= T_TELL) {
        m.phase = RISE; m.t -= T_TELL;
        m.front = 16; m.fx = m.src; m.acc = BLOB_EVERY;
        m.sprays++;
        L.cry = 'hiss';
      }
    }
    if (m.phase === RISE) {
      m.density = ease(m.t / T_RISE);
      m.ring = 1;
      if (m.t >= T_RISE) { m.phase = HOLD; m.t -= T_RISE; }
    }
    if (m.phase === HOLD) {
      m.density = 1;
      m.ring = 0.6 + 0.4 * Math.sin(m.t * 6);
      if (m.t >= T_HOLD) { m.phase = CLEAR; m.t -= T_HOLD; }
    }
    if (m.phase === CLEAR) {
      m.density = 1 - ease(m.t / T_CLEAR);
      m.ring = m.density * 0.6;
      if (m.t >= T_CLEAR) {
        m.phase = IDLE; m.t = 0; m.density = 0; m.ring = 0;
        m.next = rand(GAP_MIN, GAP_MAX);
      }
    }

    /* the plume pours while the machine is spraying */
    if (m.phase === RISE || m.phase === HOLD) {
      m.front = Math.min(FRONT_FULL, m.front + FRONT_V * dt);
      m.acc += dt;
      /* the first half second of the spray comes out twice as hard - the
         machine clearing its throat for real - so the plume is a column
         from its very first frame */
      var every = (m.phase === RISE && m.t < 0.5) ? BLOB_EVERY * 0.5 : BLOB_EVERY;
      while (m.acc >= every) {
        m.acc -= every;
        m.blobs.push({ x: m.src + rand(-2, 2), y: NOZ_Y - 2, vx: rand(-16, 16), vy: rand(-70, -42), age: 0 });
        if (m.blobs.length > BLOB_CAP) m.blobs.shift();
      }
    }
    m.fx -= carry;

    for (i = m.puffs.length - 1; i >= 0; i--) {
      b = m.puffs[i];
      b.age += dt; b.x -= carry; b.y -= 22 * dt;
      if (b.age >= PUFF_LIFE) m.puffs.splice(i, 1);
    }
    for (i = m.blobs.length - 1; i >= 0; i--) {
      b = m.blobs[i];
      b.age += dt;
      b.x += b.vx * dt - carry;
      b.y += b.vy * dt;
      b.vx *= 1 - 0.5 * dt;
      /* the climb slows to a drift of 4px/s, and that is where it billows */
      b.vy += (-4 - b.vy) * Math.min(1, 1.4 * dt);
      if (b.age >= BLOB_LIFE) m.blobs.splice(i, 1);
    }

    /* THE TWO CLOUD SHEETS drift at two different rates, both leftward
       with the room and one of them a little against it, so the fog has
       thin and thick patches that move through each other - a slow
       churn - and reads as a thing IN the room the stacks are passing
       through rather than a smear on the glass */
    m.driftA = wrap(m.driftA + (speed * 0.40 + 14) * dt, VW);
    m.driftB = wrap(m.driftB + (speed * 0.22 - 9) * dt, VW);
  }

  /* the fog for this frame, built into one scratch sheet: the haze, the
     two cloud sheets over it, and - while the front is still rolling out
     - cut back to a soft circle round the nozzle */
  function paintFog(m) {
    var b = T.fogBuf, c = b.ctx;
    c.globalCompositeOperation = 'source-over';
    c.clearRect(0, 0, b.w, b.h);
    c.drawImage(T.haze.canvas, 0, 0);
    tileX(c, T.cloudA.canvas, m.driftA, 0);
    tileX(c, T.cloudB.canvas, m.driftB, 0);
    if (m.front < FRONT_FULL) {
      var fy = NOZ_Y - CEIL, R = Math.max(1, m.front);
      var g = c.createRadialGradient(m.fx, fy, 0, m.fx, fy, R);
      g.addColorStop(0, 'rgba(0,0,0,1)');
      g.addColorStop(clamp((R - FRONT_SOFT) / R, 0, 1), 'rgba(0,0,0,1)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      c.globalCompositeOperation = 'destination-in';
      c.fillStyle = g;
      c.fillRect(0, 0, b.w, b.h);
      c.globalCompositeOperation = 'source-over';
    }
  }

  /* the soft disc nearest a radius: they are baked every 4px of
     diameter, 8 to 112, so a growing blob never visibly steps */
  function discFor(r) {
    return T.disc[clamp(Math.round((r * 2 - 8) / 4), 0, T.disc.length - 1)];
  }

  /* THE OVERLAY, the last thing on the room layer.

     THE CLIP IS THE FAIRNESS DECISION. The fog lives strictly inside
     rows 24..241: the ledge above and the bar top below stay crisp, so
     BOTH KILL EDGES ARE NEVER FOGGED, and the spot each cork throws on
     the bar top is always readable - the player always knows where the
     next cork comes down even when the cork itself is dim. It is
     physically right too: the ledge is nearer the camera than the mist,
     and the mist lies on the bar rather than in front of its edge.

     It draws off the ledger and nothing else, so on a frame when the
     run is not being stepped - GET READY, pause, the tumble, the
     results - it shows exactly what the ledger holds, which is the
     fog as it was. */
  function drawOverlay(ctx, obstacles, run) {
    var m = run && run.ledger ? run.ledger.mist : null;
    var a0 = ctx.globalAlpha, i, b, a, d;
    if (m && (m.density > 0 || m.blobs.length || m.puffs.length)) {
      ctx.save();
      ctx.beginPath(); ctx.rect(0, CEIL, VW, FLOOR - CEIL); ctx.clip();
      if (m.density > 0) {
        paintFog(m);
        ctx.globalAlpha = a0 * m.density;
        ctx.drawImage(T.fogBuf.canvas, 0, CEIL);
      }
      /* THE PLUME AND THE CHUFFS go into a sheet of their own first and
         that sheet goes down at PLUME_A. Forty soft discs piled on one
         spot would otherwise stack to solid white over the humidifier -
         the one place a cork can be falling past it - and this way the
         thickest the plume can ever get is PLUME_A over the haze. */
      if (m.blobs.length || m.puffs.length) {
        var pb = T.plumeBuf, pc = pb.ctx;
        pc.clearRect(0, 0, pb.w, pb.h);
        for (i = 0; i < m.blobs.length; i++) {
          b = m.blobs[i];
          a = blobA(b);
          if (a <= 0.004) continue;
          d = discFor(blobR(b));
          pc.globalAlpha = a;
          pc.drawImage(d.canvas, Math.round(b.x - d.w / 2), Math.round(b.y - CEIL - d.h / 2));
        }
        for (i = 0; i < m.puffs.length; i++) {
          b = m.puffs[i];
          d = discFor(6 + b.age * 16);
          pc.globalAlpha = 0.95 * (1 - b.age / PUFF_LIFE);
          pc.drawImage(d.canvas, Math.round(b.x - d.w / 2), Math.round(b.y - CEIL - d.h / 2));
        }
        pc.globalAlpha = 1;
        ctx.globalAlpha = a0 * PLUME_A;
        ctx.drawImage(pb.canvas, 0, CEIL);
      }
      ctx.restore();
    }
    ctx.globalAlpha = a0;
    view.ring = m ? m.ring : 0;
    view.src = m && m.phase !== IDLE ? m.src : null;
  }

  /* --------------------------------------------- the baked fog pieces

     THE HAZE, 480 x 218: per-row alpha 0.30 at the ledge to 0.52 at the
     bar top - thinnest at the top, thickest along the bar, because mist
     is heavier than air and rolls along the surface it came out onto.
     THE CLOUDS, two 480 x 218 sheets of seven soft blobs each, radius
     50 to 90 at a peak of 0.19, wrapped so they tile.

     WHAT THAT ADDS UP TO, measured off the overlay drawn alone onto a
     clear canvas at full density, three cloud offsets: thinnest pixel
     0.30 (under the ledge), mean 0.48, 0.49 over the band a doodad
     actually flies (y 69..197), thickest 0.66..0.72 - low down, where two
     cloud cores cross over the thickest haze - and not one pixel outside
     rows 24..241. Under the plume itself, right over the nozzle, it
     reaches 0.87: that is the spray, it is 30 pixels wide, and it moves.
     The cloud peak was 0.22 and measured a 0.745 maximum where three
     cores met; 0.19 holds it under the 0.72 the fairness argument
     needs. "Fogs up the screen considerably": the wall loses half its
     contrast for 2.8s, two thirds of it in the bottom third. */
  function bakeHaze() {
    return alphaSheet(VW, WALL_H, P.mist, function (x, y) {
      return 0.30 + 0.22 * ease(y / (WALL_H - 1));
    });
  }

  var CLOUD_A = 0.19;

  function bakeCloud(seed) {
    var B = [], i;
    for (i = 0; i < 7; i++) {
      var h = hash(seed + i * 7919);
      B.push([h % VW, 20 + ((h >>> 9) % 178), 50 + ((h >>> 17) % 41)]);
    }
    return alphaSheet(VW, WALL_H, P.mist, function (x, y) {
      var keep = 1, j, dx, dy, d;
      for (j = 0; j < B.length; j++) {
        dx = Math.abs(x + 0.5 - B[j][0]); if (dx > VW / 2) dx = VW - dx;
        dy = y + 0.5 - B[j][1];
        d = Math.sqrt(dx * dx + dy * dy) / B[j][2];
        if (d < 1) keep *= 1 - CLOUD_A * (1 - ease(d));
      }
      return 1 - keep;
    });
  }

  function bakeDiscs() {
    var out = [], D;
    for (D = 8; D <= 112; D += 4) {
      (function (D) {
        out.push(alphaSheet(D, D, P.mist, function (x, y) {
          var dx = (x + 0.5 - D / 2) / (D / 2), dy = (y + 0.5 - D / 2) / (D / 2);
          var d = Math.sqrt(dx * dx + dy * dy);
          return d < 1 ? 1 - ease(d) : 0;
        }));
      })(D);
    }
    return out;
  }

  /* the humidifier's own cool light on the wall round it: a radial
     sheet of mist, peak 0.09, always there - and a second one in the
     LED's own cyan, peak 0.34, drawn at the ring's level, so when the
     ring lights the wall round the machine lights with it. That glow is
     the tell a player sees out of the side of the eye. */
  function bakeHumPool(hex, peak) {
    return alphaSheet(120, 80, hex, function (x, y) {
      var dx = (x + 0.5 - 60) / 60, dy = (y + 0.5 - 40) / 40;
      var d = Math.sqrt(dx * dx + dy * dy);
      return d < 1 ? peak * (1 - ease(d)) : 0;
    });
  }

  /* ---------------------------------------------------------- build */

  function build() {
    T.kitchen = bakeKitchen();
    T.ledge = bakeLedge();
    T.ledgeShade = DiningRoom.bakeShade(H.void, 0.30, 12, false);
    T.hum = [bakeHumidifier(0), bakeHumidifier(1), bakeHumidifier(2)];
    T.wall = bakeWall(true);
    T.menuWall = bakeWall(false);
    T.backBar = bakeBackBar();         /* and T.bbShade with it */
    /* the soft half of a column's cast shadow, a 16px ramp, stretched to
       any height (it is constant down its length, so the stretch is
       exact) */
    T.colShade = alphaSheet(16, 1, P.void, function (x) { return 0.16 * (1 - ease((x + 0.5) / 16)); });
    T.humPool = bakeHumPool(P.mist, 0.09);
    T.humGlow = bakeHumPool(P.ringLit, 0.34);
    T.light = bakeLight();
    T.floor = bakeFloor();
    T.barShade = DiningRoom.bakeShade(H.void, 0.26, 10, true);

    var box0 = bakeBox(0), box1 = bakeBox(1), pot = bakePot();
    T.stack = [box0, box1, pot];
    T.stackUp = [flipped(box0), flipped(box1), flipped(pot)];
    T.capUp = [bakeBoxCap(0, false), bakeBoxCap(1, false), bakePotCap(false)];
    T.capDown = [bakeBoxCap(0, true), bakeBoxCap(1, true), bakePotCap(true)];

    T.cork = bakeCorks();
    T.corkDown = bakeCorkDown(T.cork);
    var face = bakeRecordFace(17), oblique = bakeRecordFace(11);
    T.rec = [face, oblique, bakeRecordEdge(), flipped(oblique)];
    T.cone = bakePinecone();
    T.snowman = bakeSnowman();
    T.rock = bakeRock();
    T.print = bakePrint();

    T.haze = bakeHaze();
    T.cloudA = bakeCloud(6013);
    T.cloudB = bakeCloud(6029);
    T.disc = bakeDiscs();
    T.fogBuf = makeCanvas(VW, WALL_H);
    T.plumeBuf = makeCanvas(VW, WALL_H);
  }

  /* -------------------------------------------------------- drawing */

  /* THE WALL, THE HUMIDIFIER AND THE LIGHT, back to front:
       1. the wall tile at 0.30
       2. per humidifier copy on screen: its cool pool on the wall (once,
          and once more at the ring's level), its contact shadow on the
          bar, and the sprite in this frame's ring state
       3. the light sheet over all of it */
  function drawBackdrop(ctx, scroll) {
    var hx = humX(scroll), ring = view.ring, i, x;
    var f = ring < 0.33 ? 0 : (ring < 0.8 ? 1 : 2);
    tileX(ctx, T.wall.canvas, scroll * WALL_PAR, CEIL);
    /* the back bar's long shadows on the wall, under the humidifier */
    tileX(ctx, T.bbShade.canvas, scroll * BB_PAR, FLOOR - BB_H);
    for (i = 0; i < 2; i++) {
      x = hx + i * VW;
      if (x + HUM_W + 40 < 0 || x - 40 > VW) continue;
      /* only the machine that is spraying lights up: at the seam both
         copies are on the screen for half a second and one of them is
         not the one that hissed */
      var on = view.src !== null && Math.abs(x + NOZ_DX - view.src) < 40;
      ctx.drawImage(T.humPool.canvas, x + NOZ_DX - 60, 216 - 40);
      if (on && ring > 0.01) {
        var ga = ctx.globalAlpha;
        ctx.globalAlpha = ga * Math.min(1, ring);
        ctx.drawImage(T.humGlow.canvas, x + NOZ_DX - 60, 216 - 40);
        ctx.globalAlpha = ga;
      }
      Tint.rect(ctx, x - 1, FLOOR - 2, HUM_W + 2, 2, H.void, 6);
      ctx.drawImage(T.hum[on ? f : 0].canvas, x - 1, HUM_Y - 1);
    }
    /* the bottles and glasses, nearer than the humidifier */
    tileX(ctx, T.backBar.canvas, scroll * BB_PAR, FLOOR - BB_H);
    ctx.drawImage(T.light.canvas, 0, 0);
  }

  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.kitchen.canvas, scroll * KITCHEN_PAR, 0);
    tileX(ctx, T.ledge.canvas, scroll, LEDGE_Y);
    ctx.drawImage(T.ledgeShade.canvas, 0, CEIL);
  }

  function drawFloor(ctx, scroll) {
    ctx.drawImage(T.barShade.canvas, 0, FLOOR - 10);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
  }

  /* THE CALM BAR, for any menu pointed at it: the kitchen and the ledge,
     the bare wall with its rail, the bar top, the light. No humidifier,
     no still life, no stacks, no mist. */
  function drawMenuBackdrop(ctx, scroll) {
    var s = scroll * 0.6;
    ctx.fillStyle = P.wall; ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.menuWall.canvas, s * WALL_PAR, CEIL);
    ctx.drawImage(T.light.canvas, 0, 0);
    tileX(ctx, T.kitchen.canvas, s * KITCHEN_PAR, 0);
    tileX(ctx, T.ledge.canvas, s, LEDGE_Y);
    ctx.drawImage(T.ledgeShade.canvas, 0, CEIL);
    ctx.drawImage(T.barShade.canvas, 0, FLOOR - 10);
    tileX(ctx, T.floor.canvas, s, FLOOR);
  }

  /* ---------------------------------------------------- the drops

     Everything that draws or collides a drop reads ob.whirl LIVE: the
     engine sets it after makeDrop has returned. */
  function frameOf(ob) { return Math.floor(wrap(ob.spin, TAU) / TAU * 4) % 4; }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y);
    if (ob.whirl) { drawRecord(ctx, ob, x, y); return; }
    blitBelowCeil(ctx, T.cork[frameOf(ob)].canvas, x - 6, y - 6);
  }

  /* THE RECORD, glowing, with three purple sparks rising off it - the
     Couch's cheddar, in the spin's colours. The only glowing thing that
     falls in this bay and the brightest purple on the screen. */
  function drawRecord(ctx, ob, x, y) {
    var pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6), i, k, sy;
    DiningRoom.glow(ctx, x, y, Math.round(18 + pulse * 6),
                    'rgba(214,160,255,' + (0.50 * pulse).toFixed(3) + ')',
                    'rgba(150,80,220,' + (0.24 * pulse).toFixed(3) + ')',
                    'rgba(90,42,140,0)');
    for (i = 0; i < 3; i++) {
      k = wrap(ob.spin * 0.7 + i * 0.41, 1);
      sy = y - 10 - Math.round(k * 7);
      if (sy < CEIL) continue;
      ctx.fillStyle = i % 2 ? P.labelHi : P.labelPurple;
      ctx.fillRect(x - 5 + Math.round(Math.sin(ob.spin * 2 + i) * 5), sy, 1, 1);
    }
    var f = T.rec[frameOf(ob)];
    blitBelowCeil(ctx, f.canvas, x - 9, y - Math.floor(f.h / 2));
  }

  /* THE SPOT on the bar top, under whatever is coming down: wide and
     faint when it is high, small and dark when it is about to land. It
     is OUTSIDE the fog's clip, which is why it matters: in the fog it
     is the most legible thing about a cork. Purple for a record. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var far = clamp((FLOOR - 4 - ob.y) / (FLOOR - CEIL), 0, 1);
    var near = clamp((FLOOR - 4 - ob.y) / 60, 0, 1);
    var w = 5 + Math.round(6 * far);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3,
              ob.whirl ? P.labelPurple : H.void, 15 - Math.round(9 * near));
  }

  /* THE REMAINS, and they are not a mess: a settled cork lying on its
     side across the back of the bar, or a record nobody caught lying
     flat with its glow gone. Full alpha, no fade; they stay as they are
     until they scroll off. */
  function drawDropSplat(ctx, ob) {
    var x = Math.round(ob.x);
    if (ob.whirl) {
      Tint.rect(ctx, x - 9, FLOOR + 2, 19, 2, H.void, 7);
      ctx.drawImage(T.rec[2].canvas, x - 9, FLOOR - 3);
      return;
    }
    Tint.rect(ctx, x - 6, FLOOR + 4, 13, 2, H.void, 7);
    ctx.drawImage(T.corkDown.canvas, x - 6, FLOOR - 3);
  }

  /* --------------------------------------------------- the pinecone */
  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var i;
    /* the dent it stood in stays after Gerald has pulled it */
    Tint.rect(ctx, Math.round(ob.x) - 7, FLOOR - 1, 14, 2, H.void, 8);
    var bob = Math.round(Math.sin(ob.phase + ob.age * 2.2) * 1.2);
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 9 + ob.dy) + bob;
    /* the jade every spare life glows, the Couch's gradient verbatim */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + ob.age * 2.6);
    var r = Math.round(15 + pulse * 4);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);
    ctx.drawImage(T.cone.canvas, x - 7, y - 10);
    for (i = 0; i < 2; i++) {
      var k = wrap(ob.phase * 0.22 + ob.age * 0.3 + i * 0.5, 1);
      ctx.fillStyle = i ? P.potHi : P.lifePale;
      ctx.fillRect(x - 5 + i * 9, y - 12 - Math.round(k * 9), 1, 1);
    }
  }

  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x);
    if (ob.kind === 0) {
      Tint.rect(ctx, x, FLOOR + 10, 13, 2, H.void, 6);
      ctx.drawImage(T.corkDown.canvas, x, FLOOR + 3);
    } else if (ob.kind === 1) ctx.drawImage(T.snowman.canvas, x, FLOOR + 1);
    else if (ob.kind === 2) ctx.drawImage(T.rock.canvas, x + 1, FLOOR + 6);
    else ctx.drawImage(T.print.canvas, x, FLOOR + 5);
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
    /* a spike is never armed in here and draws nothing */
  }

  /* ----------------------------------------------------- the cover

     118x114 on the big card, 82x94 on the side ones; the caller has
     clipped to the box. The level's proportions: the lid band a tenth
     (the kitchen sliver and the ledge), the wall to 86% with the rail
     at 70%, the bar top the last 14%. The humidifier stands bottom
     left - it is the slow layer and does not move - with a box and a
     planter stack sliding past, a cork tumbling down, a record falling
     purple, a pinecone on the bar, and THE MIST breathing in and out
     over the lane on a seven second cycle, clipped to the lane the way
     the level clips it. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22, i, k, n;
    var kitH = Math.max(3, Math.round(h * 0.04));
    var LEDGE = big ? [H.ledgeLit, H.ledge, H.ledge, H.ledgeLit, H.ledgeShade, P.outline, P.outline]
                    : [H.ledgeLit, H.ledge, H.ledgeLit, H.ledgeShade, P.outline, P.outline];
    var wallY = y + kitH + LEDGE.length;
    var barY = y + Math.round(h * 0.86);
    var railY = y + Math.round(h * 0.70);
    var lane = barY - wallY;

    /* 1. the kitchen sliver, its lamp */
    ctx.fillStyle = H.cabinet; ctx.fillRect(x, y, w, kitH);
    for (i = 4; i < w; i += 10) { ctx.fillStyle = H.cabinetShade; ctx.fillRect(x + i, y, 1, kitH); }
    ctx.fillStyle = H.steel; ctx.fillRect(x + Math.round(w * 0.12), y, 9, kitH);
    Tint.rect(ctx, x, y, w, kitH, P.night, 4);
    var lx = x + Math.round(w * 0.68);
    Tint.rect(ctx, lx - 7, y, 17, kitH, H.lampGlow, 4);
    ctx.fillStyle = H.lampGlass; ctx.fillRect(lx, y + kitH - 3, 3, 3); ctx.fillRect(lx + 1, y, 1, kitH - 3);
    ctx.fillStyle = H.lampCore;  ctx.fillRect(lx + 1, y + kitH - 2, 1, 1);

    /* 2. the ledge */
    for (i = 0; i < LEDGE.length; i++) { ctx.fillStyle = LEDGE[i]; ctx.fillRect(x, y + kitH + i, w, 1); }
    ctx.fillStyle = H.ledgeShade;
    ctx.fillRect(x + (w * 31) % 50, y + kitH + 2, 9, 1);
    ctx.fillRect(x + (w * 17) % 60 + 40, y + kitH + 3, 12, 1);

    /* 3. the wall, its tooth, the rail */
    ctx.fillStyle = P.wall; ctx.fillRect(x, wallY, w, barY - wallY);
    for (n = 0; n < (w * lane) / 60; n++) {
      var th = hash(4901 + n * 7919 + w * 13);
      ctx.fillStyle = (th >>> 20) & 1 ? P.wallTooth : P.wallToothDark;
      ctx.fillRect(x + th % w, wallY + (th >>> 9) % lane, 1, 1);
    }
    var RAIL = big ? [P.railLit, P.rail, P.railShade, P.outline] : [P.railLit, P.rail, P.outline];
    for (i = 0; i < RAIL.length; i++) { ctx.fillStyle = RAIL[i]; ctx.fillRect(x, railY + i, w, 1); }
    Tint.rect(ctx, x, railY + RAIL.length, w, 2, P.void, 3);
    Tint.rect(ctx, x, wallY, w, 3, H.void, 4);

    /* 4. THE HUMIDIFIER, bottom left, standing on the bar, its ring and
       its glow lit while the card's mist is coming */
    var cyc = wrap(t / 7, 1);
    hummer(ctx, x + Math.round(w * 0.07), barY, big, cyc > 0.08 && cyc < 0.70);

    /* 5. two stacks sliding past: a box stack, a planter, a box */
    var period = big ? 46 : 38;
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - wrap(s + i * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(lane * 0.36);
      var gapY = Math.round(wallY + 6 + ((i * 23) % Math.max(1, lane - gapH - 14)));
      stacklet(ctx, ox, wallY, gapY - wallY, i === 1, false);
      stacklet(ctx, ox, gapY + gapH, barY - gapY - gapH, i === 1, true);
    }

    /* 6. a cork on its way down, end over end, and the record */
    var cy0 = wallY + Math.round(wrap(s * 1.4, lane - 6));
    var cxx = x + Math.round(w * 0.55);
    var side = Math.floor(s * 0.4) % 2;
    ctx.fillStyle = P.outline;
    if (side) {
      ctx.fillRect(cxx - 1, cy0 - 1, 7, 5);
      ctx.fillStyle = P.corkLit; ctx.fillRect(cxx, cy0, 5, 1);
      ctx.fillStyle = P.cork;    ctx.fillRect(cxx, cy0 + 1, 4, 2);
      ctx.fillStyle = P.wine;    ctx.fillRect(cxx + 4, cy0 + 1, 1, 2);
    } else {
      ctx.fillRect(cxx - 1, cy0 - 1, 5, 7);
      ctx.fillStyle = P.corkLit; ctx.fillRect(cxx, cy0, 3, 1);
      ctx.fillStyle = P.cork;    ctx.fillRect(cxx, cy0 + 1, 3, 3);
      ctx.fillStyle = P.wine;    ctx.fillRect(cxx, cy0 + 4, 3, 1);
    }
    var ry = wallY + Math.round(wrap(s * 0.9 + 30, lane - 8)) + 3;
    var rx = x + Math.round(w * 0.3) + 8 + Math.round(Math.sin(t * 2.2) * 3);
    Tint.rect(ctx, rx - 4, ry - 4, 9, 9, P.labelPurple, 4);
    Tint.rect(ctx, rx - 6, ry - 6, 13, 13, P.labelPurple, 2);
    ctx.fillStyle = P.outline; ctx.fillRect(rx - 3, ry - 2, 7, 5); ctx.fillRect(rx - 2, ry - 3, 5, 7);
    ctx.fillStyle = P.vinyl;   ctx.fillRect(rx - 2, ry - 1, 5, 3); ctx.fillRect(rx - 1, ry - 2, 3, 5);
    ctx.fillStyle = P.labelPurple; ctx.fillRect(rx, ry, 1, 1);
    ctx.fillStyle = P.labelHi; ctx.fillRect(rx - 1, ry - 1, 1, 1);

    /* 7. the bar top band, and the shelf under it */
    var BAND = [P.barArris, H.charLit, H.char, H.char, H.char, H.char, H.charDeep, H.charLit, H.charLit];
    for (i = 0; i < BAND.length && barY + i < y + h; i++) {
      ctx.fillStyle = BAND[i]; ctx.fillRect(x, barY + i, w, 1);
    }
    for (i = 0; i < 5; i++) {
      ctx.fillStyle = P.distress;
      ctx.fillRect(x + (hash(5177 + i * 31 + w) % w), barY + 2 + i % 4, 4 + i, 1);
    }
    var shelfY = barY + BAND.length;
    if (shelfY < y + h) {
      ctx.fillStyle = H.void; ctx.fillRect(x, shelfY, w, y + h - shelfY);
      ctx.fillStyle = P.pegPurple; ctx.fillRect(x + Math.round(w * 0.42), shelfY + 1, 2, 2);
      ctx.fillStyle = P.pegRed;    ctx.fillRect(x + Math.round(w * 0.52), shelfY + 1, 2, 2);
      ctx.fillStyle = P.pegBlue;   ctx.fillRect(x + Math.round(w * 0.60), shelfY + 1, 2, 2);
    }

    /* 8. the pinecone on the bar, glowing jade */
    var px0 = x + Math.round(w * 0.78), py0 = barY - 5;
    var pulse = 0.7 + 0.3 * Math.sin(t * 2.6);
    var gr = 7 + pulse * 2;
    var g = ctx.createRadialGradient(px0, py0, 1, px0, py0, gr);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.40 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g; ctx.fillRect(px0 - gr, py0 - gr, gr * 2, gr * 2);
    ctx.fillStyle = P.outline; ctx.fillRect(px0 - 4, py0 - 4, 9, 9); ctx.fillRect(px0 - 1, py0 - 6, 3, 2);
    ctx.fillStyle = P.cone;    ctx.fillRect(px0 - 3, py0 - 3, 7, 7); ctx.fillRect(px0, py0 - 5, 1, 2);
    ctx.fillStyle = P.coneShade; ctx.fillRect(px0 - 2, py0 + 2, 6, 1); ctx.fillRect(px0 + 2, py0 - 1, 2, 3);
    ctx.fillStyle = P.coneLit;
    ctx.fillRect(px0 - 2, py0 - 2, 1, 1); ctx.fillRect(px0, py0 - 2, 1, 1);
    ctx.fillRect(px0 - 1, py0, 1, 1); ctx.fillRect(px0 + 1, py0, 1, 1); ctx.fillRect(px0 - 2, py0 + 1, 1, 1);

    /* 9. THE MIST, on the level's own cycle squeezed into seven seconds:
       the ring lights, a column climbs out of the nozzle and billows, the
       lane fogs over, and it clears - clipped to the lane between the
       ledge's outline and the bar's arris, the fairness the level keeps */
    var ph = wrap(t / 7, 1);
    var plumeK = Math.sin(Math.PI * clamp((ph - 0.18) / 0.50, 0, 1));
    var fogK = Math.sin(Math.PI * clamp((ph - 0.26) / 0.66, 0, 1));
    fogK *= fogK;
    var hx0 = x + Math.round(w * 0.07), hw0 = big ? 26 : 19, hh0 = big ? 30 : 22;
    var nzx = hx0 + hw0 / 2, nzy = barY - hh0;
    ctx.save();
    ctx.beginPath(); ctx.rect(x, wallY, w, lane); ctx.clip();
    if (fogK > 0.01) {
      /* the haze over the whole lane, thicker low down, and three soft
         clouds drifting through it */
      Tint.rect(ctx, x, wallY, w, lane, P.mist, Math.round(fogK * 8));
      Tint.rect(ctx, x, wallY + Math.round(lane * 0.45), w, lane - Math.round(lane * 0.45), P.mist, Math.round(fogK * 3));
      for (i = 0; i < 3; i++) {
        var mr = w * (0.24 + i * 0.05);
        var mx = x + wrap(w * 0.2 + i * (w * 0.4) - s * 0.5, w + 40) - 20;
        var my = wallY + lane * (0.55 + 0.15 * Math.sin(i * 2.1));
        var mg = ctx.createRadialGradient(mx, my, 1, mx, my, mr);
        mg.addColorStop(0, 'rgba(221,225,227,' + (0.30 * fogK).toFixed(3) + ')');
        mg.addColorStop(1, 'rgba(221,225,227,0)');
        ctx.fillStyle = mg; ctx.fillRect(mx - mr, my - mr, mr * 2, mr * 2);
      }
    }
    if (plumeK > 0.01) {
      /* the column out of the nozzle, widening as it climbs */
      for (i = 0; i < 5; i++) {
        var pk = i / 4, pr = 2 + pk * (big ? 13 : 10);
        var py = nzy - 2 - pk * lane * 0.42;
        var px = nzx + Math.sin(t * 1.3 + i) * pk * 3;
        var pg = ctx.createRadialGradient(px, py, 0.5, px, py, pr);
        pg.addColorStop(0, 'rgba(236,240,242,' + (0.75 * plumeK * (1 - pk * 0.45)).toFixed(3) + ')');
        pg.addColorStop(1, 'rgba(221,225,227,0)');
        ctx.fillStyle = pg; ctx.fillRect(px - pr, py - pr, pr * 2, pr * 2);
      }
    }
    ctx.restore();

    /* 10. the doodad flying it, the Couch's exact block */
    var dx = Math.round(x + w * 0.3);
    var dy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, dx - sz, dy - sz, sz * 2, sz * 2, P.void, 5);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx + sz / 2 - 2, dy - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(dx + sz / 2, dy, 2, 1);

    /* 11. THE LIGHT, in miniature, and in RAMPS: the level's light is a
       baked sheet with no edges in it, so the card's is too - warmth
       down off the ledge, night coming up off the bar, the two side
       columns - each a linear gradient rather than a flat band, so the
       card does not carry the three hard stripes the level got rid of */
    var lg = ctx.createLinearGradient(0, wallY, 0, wallY + lane * 0.35);
    lg.addColorStop(0, 'rgba(255,227,160,0.14)'); lg.addColorStop(1, 'rgba(255,227,160,0)');
    ctx.fillStyle = lg; ctx.fillRect(x, wallY, w, Math.round(lane * 0.35));
    var ng = ctx.createLinearGradient(0, wallY + lane * 0.45, 0, barY);
    ng.addColorStop(0, 'rgba(42,36,31,0)'); ng.addColorStop(1, 'rgba(42,36,31,0.26)');
    ctx.fillStyle = ng; ctx.fillRect(x, Math.round(wallY + lane * 0.45), w, barY - Math.round(wallY + lane * 0.45));
    Tint.rect(ctx, x, barY + 1, w, y + h - barY - 1, H.void, 4);
    var vig = Math.max(6, Math.round(w * 0.12));
    var vl = ctx.createLinearGradient(x, 0, x + vig, 0);
    vl.addColorStop(0, 'rgba(21,17,13,0.26)'); vl.addColorStop(1, 'rgba(21,17,13,0)');
    ctx.fillStyle = vl; ctx.fillRect(x, y, vig, h);
    var vr = ctx.createLinearGradient(x + w, 0, x + w - vig, 0);
    vr.addColorStop(0, 'rgba(21,17,13,0.26)'); vr.addColorStop(1, 'rgba(21,17,13,0)');
    ctx.fillStyle = vr; ctx.fillRect(x + w - vig, y, vig, h);
  }

  /* THE HUMIDIFIER IN A COVER: the level's sprite reduced - a dome
     that is round across the top and steep at the sides (a superellipse,
     so it is a bell and not a hill), its upper left lit, a scatter of
     white flecks, the dark nozzle, the LED ring, the white base - and,
     while the card is about to mist, the ring lit and the cool glow. */
  function hummer(ctx, x, foot, big, lit) {
    var dw = big ? 26 : 19, dh = big ? 22 : 16, bh = big ? 7 : 5;
    var top = foot - bh - dh, i, hw, row, R = dw / 2;
    var cx = x + R;
    if (lit) {
      var g = ctx.createRadialGradient(cx, top + dh * 0.7, 1, cx, top + dh * 0.7, dw);
      g.addColorStop(0, 'rgba(159,215,232,0.30)');
      g.addColorStop(1, 'rgba(159,215,232,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - dw, top - 4, dw * 2, dh + bh + 4);
    }
    var HW = [];
    for (i = 0; i < dh; i++) {
      var yy = 1 - (i + 0.5) / dh;
      HW.push(Math.max(1, Math.round(R * Math.pow(1 - Math.pow(yy, 2.4), 1 / 2.4))));
    }
    /* the outline: a pixel round every row, and the row above the top */
    ctx.fillStyle = P.outline;
    ctx.fillRect(Math.round(cx - HW[0]), top - 1, HW[0] * 2, 1);
    for (i = 0; i < dh; i++) ctx.fillRect(Math.round(cx - HW[i]) - 1, top + i, HW[i] * 2 + 2, 1);
    ctx.fillRect(x, foot - bh, dw + 2, bh + 1);
    /* the dome: lit upper left, shade right and low, flat between */
    for (i = 0; i < dh; i++) {
      hw = HW[i]; row = top + i;
      var l = Math.round(cx - hw);
      ctx.fillStyle = i > dh - 4 ? P.humDomeShade : P.humDome; ctx.fillRect(l, row, hw * 2, 1);
      if (i < dh * 0.65 && i > 0) { ctx.fillStyle = P.humDomeLit; ctx.fillRect(l + 1, row, Math.max(1, Math.round(hw * 0.7)), 1); }
      ctx.fillStyle = P.humDomeShade; ctx.fillRect(Math.round(cx + hw * 0.5), row, hw - Math.round(hw * 0.5), 1);
      if (lit && i > dh * 0.5) { Tint.rect(ctx, l, row, hw * 2, 1, P.ringLit, 6); }
    }
    for (i = 0; i < (big ? 9 : 6); i++) {
      var hh = hash(8811 + i * 37);
      var fy = 3 + (hh >>> 8) % (dh - 4), fw = HW[fy];
      ctx.fillStyle = P.humSpeck;
      ctx.fillRect(Math.round(cx - fw + 1 + hh % Math.max(1, fw * 2 - 2)), top + fy, 1, 1);
    }
    ctx.fillStyle = P.humNozzle; ctx.fillRect(Math.round(cx) - 1, top, 2, 1);
    /* the ring, and the base under it */
    ctx.fillStyle = lit ? P.ringHot : P.ringIdle; ctx.fillRect(x + 2, foot - bh - 1, dw - 2, 1);
    ctx.fillStyle = P.humBase;      ctx.fillRect(x + 1, foot - bh, dw, bh);
    ctx.fillStyle = P.humDomeLit;   ctx.fillRect(x + 2, foot - bh, dw - 6, 1);
    ctx.fillStyle = P.humBaseShade; ctx.fillRect(x + 1, foot - 2, dw, 2); ctx.fillRect(x + dw - 3, foot - bh, 4, bh);
    ctx.fillStyle = P.humNozzle;
    ctx.fillRect(Math.round(cx) - 4, foot - 3, 1, 1); ctx.fillRect(Math.round(cx) - 1, foot - 3, 1, 1);
    ctx.fillRect(Math.round(cx) + 2, foot - 3, 1, 1);
  }

  /* one stack inside a cover. `pot` picks the planter; `up` says which
     end faces the gap (the cap goes there) */
  function stacklet(ctx, x, y, h, pot, up) {
    if (h <= 0) return;
    var cy, ch, i;
    for (cy = up ? y : y + h; up ? cy < y + h : cy > y; cy += up ? 11 : -11) {
      ch = up ? Math.min(11, y + h - cy) : Math.min(11, cy - y);
      var ty = up ? cy : cy - ch;
      ctx.fillStyle = P.outline; ctx.fillRect(x, ty, 10, ch);
      if (ch < 3) continue;
      if (pot) {
        ctx.fillStyle = P.potWhite; ctx.fillRect(x + 1, ty + 1, 8, ch - 2);
        ctx.fillStyle = P.potHi;    ctx.fillRect(x + 1, ty + 1, 1, ch - 2);
        ctx.fillStyle = P.potShade; ctx.fillRect(x + 8, ty + 1, 1, ch - 2);
        ctx.fillStyle = P.potCell;
        for (i = 0; i < ch - 3; i += 3) { ctx.fillRect(x + 3, ty + 2 + i, 1, 1); ctx.fillRect(x + 6, ty + 2 + i, 1, 1); }
        ctx.fillStyle = P.potDeep;  ctx.fillRect(x + 1, up ? ty + ch - 2 : ty + 1, 8, 1);
      } else {
        ctx.fillStyle = P.boxWood;  ctx.fillRect(x + 1, ty + 1, 8, ch - 2);
        ctx.fillStyle = P.boxHi;    ctx.fillRect(x + 1, ty + 1, 1, ch - 2);
        ctx.fillStyle = P.boxShade; ctx.fillRect(x + 8, ty + 1, 1, ch - 2);
        ctx.fillStyle = P.boxDeep;  ctx.fillRect(x + 1, up ? ty + 3 : ty + ch - 4, 8, 1);
        if (ch > 7) { ctx.fillStyle = P.brass; ctx.fillRect(x + 3, up ? ty + ch - 4 : ty + 2, 3, 2); }
      }
    }
    /* the cap across the mouth */
    var by = up ? y : y + h - 3;
    ctx.fillStyle = P.outline; ctx.fillRect(x - 2, by, 14, 3);
    ctx.fillStyle = pot ? P.potWhite : P.boxWood; ctx.fillRect(x - 1, by + (up ? 1 : 0), 12, 2);
    ctx.fillStyle = pot ? P.potHi : P.boxHi;     ctx.fillRect(x - 1, up ? by + 1 : by + 1, 12, 1);
    if (pot && up) {
      ctx.fillStyle = H.leafLit; ctx.fillRect(x + 2, by - 2, 1, 2); ctx.fillRect(x + 7, by - 2, 1, 2);
      ctx.fillStyle = H.leaf;    ctx.fillRect(x + 4, by - 3, 2, 3);
    }
  }

  /* ---------------------------------------------------- generation */

  /* 30% red-brown box, 25% dark walnut box, 45% planter - see the
     pillars' note for why the planters get the smaller share */
  function makePillar(x, gapY, gapH, run) {
    var v = Math.random();
    return { type: 'pillar', x: x, w: 34,
             gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: v < 0.30 ? 0 : (v < 0.55 ? 1 : 2),
             scored: false };
  }

  /* NO SPIKES IN HERE. The tune never arms them (spikeScore 1e9, the
     Fort's shut gate); this is the contract's maker answering anyway,
     with a thing that has no art and no boxes. */
  function makeSpikes(x, side, count, maxLen, run) {
    return { type: 'spike', x: Math.round(x), side: 'floor', w: 1 };
  }

  /* A CORK, or - once the engine has set ob.whirl on it - a record.
     Everything that differs between the two is read live in stepDrop
     and drawDrop, never stored here. `spicy` is ignored: this bay has no
     spicyChance. No art-rolled gold. */
  function makeDrop(x, spicy, fall, run) {
    return {
      type: 'drop', x: x, y: CEIL + 5, vy: fall, vx: 0,
      spicy: false, broken: 0, w: 7,
      spin: rand(0, TAU),
      /* faster than a kernel: a cork is top-heavy and whips */
      spinRate: rand(3.5, 6.5) * (chance(0.5) ? -1 : 1),
      /* the one hop, to its own apex */
      hop: rand(8, 14), hops: 0, landed: false,
      landCry: 'pat',
      /* settling throws dust off the charcoal, not a splash */
      burst: [FX.groundHi, FX.ground]
    };
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 13, kind: randInt(0, 3), seed: randInt(1, 100000) };
  }

  function makeBoon(x, run) {
    return { type: 'boon', x: x, y: FLOOR - 9, w: 14, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0, name: BOON_NAME,
             burst: [P.coneLit, P.cone, P.coneDeep, P.lifePale, P.lifeJade] };
  }

  /* --------------------------------------------------------- stepDrop

     THE CORK: fall, TOCK, one hop, lie down.

     DROP_GRAV 150 IS SET BY WHAT A CORK HAS TO DO ON THE WAY DOWN, and
     the first number this file had for it was wrong in a way only a
     count could show. At 260, born at x 356..460 (dropAhead 20..124), a
     cork fell in 1.2s and landed at x 136..327 - always on the screen,
     always ahead of the doodad, the tock and the hop always in view -
     and in four autopiloted minutes not one cork came within 22px of
     the doodad: everything landed in front of it and lay down, and the
     bay's only hazard from the sky was scenery. The Coop's eggs come
     within that distance 16 times a minute, the Mantle's 14, the Desk's
     10 (same bot, same harness).

     So a cork has to CROSS THE DOODAD'S COLUMN IN THE AIR, the way an
     egg does. At 150 the fall takes 1.57s; born at x 250..400 (the
     dropAhead 80..230 this file asks levels.js for) a cork crosses x 116
     with the lane still under it for about three corks in ten at
     speedStart, six in ten at 145px/s and nearly all of them at
     speedMax - a hazard that grows with the run - and lands at x 71..221
     at speedStart and -26..124 at speedMax: on the screen, so the tock,
     the hop and the lying down are still seen. Measured at that tune
     over six autopiloted minutes: 7 to 15 corks a minute within 22px of
     an autopilot that dodges nothing (mean 10), and 4 to 7 hits - the
     Living Room's own range.

     THE HOP is quicker than the fall, because a cork is light and
     springy and a hop that floated at 150 read as a balloon: it is
     launched against HOP_GRAV 300 to its own 8..14px apex and is down
     again in 0.46..0.61s, travelling 7..18px sideways. Its apex puts a
     cork's centre at FLOOR-18 and its box top at FLOOR-21 = 221; the
     lowest gap's centre line puts a doodad's hitbox bottom at 208.
     Thirteen pixels of daylight: a hopping cork cannot reach a doodad
     flying its gap properly - the Couch's bargain - and a cork that has
     hopped once lies down and loses its box.

     NOT ob.bounced on the tock: that would have the engine tick 'bop' and
     the ledger play the 'tock' as well - two clicks on one contact. The
     ledger carries the tock and the hop is the visual. The settle is the
     engine's own landing with landCry 'pat'.

     THE RECORD falls at half the gravity (75) so it takes about 2.2s to
     come down, swaying 26px/s either way and flipping twice a second -
     a gift drifts, so it can be caught rather than merely noticed - and
     at any speed it crosses the doodad's column with most of the lane
     still under it. It never hops: it lands flat with a pat. */
  var DROP_GRAV = 150;
  var HOP_GRAV = 300;
  var RECORD_GRAV = 0.5;
  /* a settled cork is never seen to fade: from the furthest landing, x
     221 at speedStart, it leaves the cull at -77 in 2.6s */
  var SPLAT_TIME = 6.0;

  function stepDrop(ob, dt, obstacles, run) {
    var whirl = !!ob.whirl;
    ob.vy += (whirl ? DROP_GRAV * RECORD_GRAV : (ob.hops ? HOP_GRAV : DROP_GRAV)) * dt;
    ob.y += ob.vy * dt;
    ob.x += ob.vx * dt;
    if (whirl) {
      ob.x += Math.sin(ob.spin * 1.1) * 26 * dt;
      if (ob.w !== 17) { ob.w = 17; ob.spinRate = (ob.spinRate < 0 ? -1 : 1) * rand(2.0, 3.0); }
      ob.burst = [P.vinylShine, P.vinylGroove];
    }
    ob.spin += ob.spinRate * (ob.landed ? 0.5 : 1) * dt;
    if (ob.y < CEIL + 4) { ob.y = CEIL + 4; ob.vy = Math.abs(ob.vy) * 0.3; }
    if (ob.y >= FLOOR - 4) {
      ob.y = FLOOR - 4;
      if (whirl || ob.hops >= 1) return true;
      ob.hops = 1; ob.landed = true;
      ob.vy = -Math.sqrt(2 * HOP_GRAV * ob.hop);
      ob.vx = (chance(0.5) ? 1 : -1) * rand(14, 30);
      run.ledger.cry = 'tock';
    }
    return false;
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one. */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);              /* the upper cap */
      var botY = ob.gapY + ob.gapH;
      if (ob.variant === 2) {
        /* THE PLANTED CAP IS TWO BOXES: the rim, and the lily standing
           on it - 15 pixels of a 42 pixel cap, with air either side that
           one 42x9 box would kill in. The leaves' box is a pixel inside
           their tips, the way a kernel is collided a pixel tighter than
           it is drawn. */
        out.push([ob.x - 4, botY + 4, ob.w + 8, 5]);
        out.push([ob.x - 4 + LILY_X + 3, botY + 1, 13, 3]);
      } else {
        out.push([ob.x - 4, botY, ob.w + 8, 9]);
      }
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      /* the middle of a tumbling 7x11 - the ends are forgiven - and a
         record a little wider than it is drawn, because it is caught */
      if (ob.whirl) out.push([ob.x - 8, ob.y - 8, 16, 16]);
      else out.push([ob.x - 3, ob.y - 3, 6, 6]);
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 8, FLOOR - 18 + ob.dy, 16, 18]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: DiningRoom.END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    CEIL_KILLS: true,
    BOON_NAMES: [BOON_NAME],
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld, drawOverlay: drawOverlay,
    rectsFor: rectsFor
  };
})();
