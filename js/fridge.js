/* ------------------------------------------------------------------
   Land of Doodads - THE KITCHEN / THE FRIDGE   (4-3)

   The door has swung shut behind you and you are flying through the
   TOP COMPARTMENT of the house's fridge - Fridge ref 1 and the top
   shelf of ref 5 - along its open front, between the ribbed roof and
   the glass of the top shelf. Drawn from those two photographs: the
   white liner of the roof with its raised ribs running back to the
   corner, the square LED panel set in it, the little white air vent
   hanging off the roof at the back on the right, the brushed steel
   back panel with its two round holes and its raised middle plate,
   the shelf's rear channel, the glass, and the polished steel trim
   along the shelf's front. On the shelf, the three things that are
   really up there, once each and at their own size: the half gallon of
   Horizon milk on its back with its cap up and its length running back
   into the fridge, the long clear bag with a dark pack in it lying
   across the back, and the grey pulp egg carton with its green label,
   its length running back too - the way ref 5 has them.

   THE CAMERA, AND WHY EVERYTHING MOVES AT THE SPEED IT DOES. One
   pinhole, at the compartment's mid-height (row 133), 80 cm out in
   front of the opening. The opening is 27 cm tall and fills the play
   lane (rows 24..241: 8.07 px a cm); the back wall is 45 cm further
   in, so it stands at 80/125 = 0.64 of that scale (5.17 px a cm) and
   slides past at 0.64 of the room's speed. The roof and the glass are
   the two planes between: the roof recedes from the lid (row 24) to
   the back corner (row 63) and the glass from the trim (row 242) to
   the back channel (row 203), each one smooth shaded sheet, and
   anything ON them - the LED panel, the ribs, the vent - is drawn
   where that pinhole puts it and moves at the speed its depth gives
   it, so the ribs fan out from the corner and lean over as they pass,
   exactly as they do in ref 1. The milk, the bag and the eggs are
   BOXES in that room: each one's near face is a sprite at its own
   depth, and its top and the side that faces the middle of the screen
   are drawn where the pinhole puts them, so a carton turns as it goes
   by. The compartment is 82 cm wide (662 px at the opening, 424 at the
   back wall) and comes round again every compartment.

   THE GLASS IS A MIRROR AT THIS ANGLE. Seen from 13 cm above it, the
   shelf gives back about a quarter of the back wall and of each thing
   standing on it, upside down under them, fading as the glass comes
   nearer and the angle steepens.

   THE COLD IS THE PALETTE. The owner asked for a frosty vibe, so the
   whole room is the LED's white-blue: whites gone blue-grey, the steel
   gone blue, rime along every edge that faces up and frost crystals in
   the corners. The warm pixels in the bay are few and all mean
   something: the milk's red (dimmed), a frozen yolk, the kimchi, the
   beef, and the heat. The engine's dust is frost in the air.

   THE PILLARS ARE THE OWNER'S PICK: mixed, frosted fridge stacks -
   Chobani tubs, sour cream tubs, the little steel box with the green
   lid, foil trays on their black tray - standing on the shelf and
   hanging upside down from the roof, capped with a foil tray or the
   big steel box with the blue lid (Fridge ref 4). They are the
   obstacle at the obstacle's scale, a 34px column like every bay's,
   and their white is the whitest thing in the room by design.

   FROZEN EGGS FALL FROM THE ROOF. THE COOP'S EGG, exactly - its shape,
   its outline, its colours - with the cold on it (the owner's call,
   2026-11-01; the first build froze the brown egg from ref 5, bigger,
   and he wanted the Coop's); they fall faster than the Coop's raw eggs
   (they are heavier and slicker) and CLINK on the trim, and what is
   left is shell and a frozen yolk - a ball, not a puddle, which is the
   detail that says frozen.

   THE MIST. A cold haze lies in the compartment from the first frame,
   thickest low because cold air sinks, and from score 8 the fan comes
   on (the whirr), the vent breathes, and a BANK of cold mist rolls in
   from the right, crosses the room and goes. Less than the Bar's fog
   (the owner's word), and still something that changes play: inside a
   bank a tub is a white field and its outline, and an egg is mostly
   its spot. What the mist may never hide: the lid and the trim (it is
   clipped to the lane, so both kill edges stay crisp) and the spot
   every falling thing throws on the trim (it is drawn on the trim,
   outside the clip). See THE MIST.

   THE COLD SNAP. Occasionally, from the late score, the temperature
   drops: the fridge's own readout in the top right corner counts down,
   the room clears and goes blue, the cold air runs in to the player as
   a ring of frost spiralling down onto him - a second and a half of
   it, with the chill sounding - and then he is ENCASED IN ICE: the
   engine's block, much heavier than Baby Burrito's weight, for three
   pillars, one crack each, and the third breaks it. The heat is the
   counter: a player who is hot when the cold arrives FIZZLES it into
   steam. See THE COLD SNAP for the clock and why it is fair.

   MEASURED, headless, at the tune in js/levels.js, sixteen seeded
   one-minute runs a line, lives turned into saves (the shared harness's
   stock autopilot unless it says otherwise):
     hits a minute       10.8 (9.8..11.4 over three runs of sixteen) -
                         the Bar 10.3, the TV 13.6, the Table 7.1. A
                         pilot that reacts 100ms late and flaps at most
                         every 0.15s: 17.3, against the Bar's 15.1 and
                         the TV's 16.6.
     the eggs            30 born a minute, 9..13 within 22px of the
                         doodad, 4..5 contacts
     the snap            2.0 freezes a minute of late play (3.7 tells:
                         a save's grace calls a tell off, and every hit
                         is a save in these runs), 12% of late play in
                         the ice, a due tell waiting 1.0s on the average
                         (bank 0.4, grace 1.5, landing 1.0 a run), never
                         a tell while iced nor inside 16s of a thaw
     in the ice          the stock pilot 4.6 hits a minute against 14.0
                         free and 71% of freezes broken out of; the late
                         pilot 30.2 against 19.7 (x1.5)
     the mist            31% of late play with the lane over 0.45, a
                         bank's plateau 0.56 at its mean and 0.77 at its
                         thickest, not one pixel on the lid or the trim,
                         and the lane under 0.10 a second into every tell
     the pickups         kimchi every 22..27s, lime 27..42s, patty
                         46..56s, the ice cream once in about 45 stacks

   Same discipline as every other level file: every pixel is generated
   and baked once in build(), any shade laid over something that
   scrolls is a flat Tint or a baked alpha sheet (there is no call to
   Dither anywhere in this file), and nothing turns by ctx.rotate - the
   patty tumbles through baked frames.
------------------------------------------------------------------ */
'use strict';

var Fridge = (function () {

  /* the house: the kitchen's pigments and its utilities */
  var K = Kitchen.P;
  var CEIL = Kitchen.CEIL, FLOOR = Kitchen.FLOOR;
  var wrap = Kitchen.wrap, hash = Kitchen.hash;
  var ease = Kitchen.ease, rgba = Kitchen.rgba;
  var ringOf = Kitchen.ringOf, glow = Kitchen.glow, blitBelowCeil = Kitchen.blitBelowCeil;
  var rowsFill = Kitchen.rowsFill;

  /* The bay's own pigments. PlayScene never reads this table. Everything
     here is the fridge in its own light: the LED's white-blue on the
     liner and the steel, and nothing warm that is not food. */
  var P = {
    /* THE LID: the liner's front flange over the opening, white plastic
       rolled over at its edge. Row 23 is its arris, the kill line. */
    lip:          '#cfdee8',   /* lum 220 */
    lipLit:       '#e8f2f8',
    lipShade:     '#aebfcb',
    lipDeep:      '#8a9dab',
    lidArris:     '#536874',   /* lum 98: the dark line under the white */
    /* THE ROOF: the ribbed liner going back to the corner */
    roofNear:     '#b4c5d0',   /* lum 191, by the LED */
    roofFar:      '#94a7b4',   /* lum 163, in the corner */
    cornerShade:  '#718490',
    ribLit:       '#cbd9e2',
    ribShade:     '#8699a6',
    /* THE LIGHT, the square LED panel in the roof (ref 1) */
    led:          '#e8f6ff',
    ledCore:      '#ffffff',
    ledRim:       '#8ea2af',
    /* the vent hanging off the roof at the back (ref 1, the white block
       with two slots) */
    ventFace:     '#c4d3dc',
    ventLit:      '#e1ecf2',
    ventShade:    '#8d9fac',
    ventSlot:     '#3e505c',
    /* THE BACK WALL: the white liner over the brushed steel panel */
    liner:        '#a8bac6',   /* lum 182 */
    linerShade:   '#8b9dab',
    steel:        '#8c9ba6',   /* lum 152 */
    steelLit:     '#b4c1ca',
    steelShade:   '#71808b',
    steelDeep:    '#56636d',
    steelHole:    '#27323a',
    channel:      '#4b5862',
    channelLit:   '#aebcc6',
    /* THE GLASS, seen through to the dark of the compartment below */
    glassFar:     '#8aa2b1',
    glassNear:    '#647b8b',
    /* THE TRIM, the shelf's polished steel front */
    trimArris:    '#e3eef4',   /* lum 234: the kill row */
    trimLit:      '#b6c5ce',
    trimSheen:    '#93a4ae',
    trimFace:     '#6b7b86',   /* lum 120 */
    trimBrush:    '#76868f',
    trimDeep:     '#46525b',
    trimShadow:   '#222a30',
    /* the cold itself */
    mist:         '#e4f1f7',   /* lum 238 */
    frost:        '#eef8fc',
    frostDeep:    '#b9d3e0',
    rime:         '#ffffff',
    ice:          '#c8e4f0',
    iceHi:        '#ffffff',
    iceShade:     '#8fb4c8',
    coldTint:     '#7fb6d6',
    coldDeep:     '#1e2c35',
    sparkEdge:    '#3d7fa8',
    /* THE STACKS: the tubs (Fridge ref 4) */
    tubWhite:     '#f1f5f8',   /* lum 243 */
    tubLit:       '#ffffff',
    tubShade:     '#cad6de',
    tubDeep:      '#97aab6',
    tubLine:      '#566977',
    chobaniInk:   '#2b2f33',
    chobaniGreen: '#5fa63a',
    sourLav:      '#b59bd0',
    sourLavDeep:  '#8a6dae',
    sourInk:      '#4a3470',
    /* the steel boxes, the green lid and the blue */
    boxSteel:     '#c3cbd1',
    boxSteelLit:  '#eef2f4',
    boxSteelShade:'#8e989f',
    boxSteelDeep: '#5c666d',
    lidGreen:     '#86c43f',
    lidGreenLit:  '#b6e26f',
    lidGreenDeep: '#4f8420',
    lidBlue:      '#2e5fc2',
    lidBlueLit:   '#5d88e2',
    lidBlueDeep:  '#1d3c88',
    /* foil and the black tray under it */
    foil:         '#c9c6be',
    foilLit:      '#eeece5',
    foilShade:    '#9c998f',
    foilDeep:     '#6b6964',
    black:        '#22272b',
    blackLit:     '#4d575e',
    /* THE SCENERY (photograph colours; stepped back at bake) */
    milkRed:      '#9a3a3d',
    milkRedLit:   '#b44c4b',
    milkRedDeep:  '#6e2a2e',
    milkWhite:    '#dfe6ea',
    milkInk:      '#2f5a8c',
    milkYellow:   '#d9c24c',
    cap:          '#eef2f4',
    capShade:     '#b5c0c7',
    bagClear:     'rgba(226,240,247,0.42)',
    bagGlint:     '#f4fbff',
    pack:         '#2a3035',
    packLit:      '#454e55',
    packRed:      '#a53a36',
    pulp:         '#a59d8e',
    pulpLit:      '#c2baa9',
    pulpShade:    '#857d6f',
    pulpDeep:     '#655f55',
    eggLabel:     '#5e8f3c',
    /* THE FROZEN EGG: the Coop's egg frozen through - its cream gone to
       ice blue, its brown outline to a cold navy */
    shell:        '#cfe8f6',
    shellLit:     '#f4fbff',
    shellShade:   '#94c2de',
    shellDeep:    '#5f93b8',
    shellFleck:   '#acd2ea',
    shellLine:    '#18283a',
    yolk:         '#e5b24c',
    yolkHi:       '#f6d47a',
    /* THE KIMCHI (ref 2/3, in the crisper) */
    kimchi:       '#c8322a',
    kimchiHi:     '#ec6a4d',
    kimchiDeep:   '#8e1f1a',
    jarLid:       '#f2f4f5',
    jarLidShade:  '#b8c2c8',
    labelWhite:   '#f4f6f7',
    labelGreen:   '#6db33f',
    /* THE LIME JUICE: a squeeze bottle of it - the pale cloudy juice
       through the plastic, the green label with a lime slice on it, the
       green flip cap */
    limeGreen:    '#3f8d2e',     /* the label */
    limeLit:      '#66b44a',
    limeDeep:     '#28611d',
    limeCap:      '#52a83e',
    limeCapLit:   '#8ad266',
    limeCapDeep:  '#2f6d24',
    juice:        '#e2e8b2',
    juiceHi:      '#f7fae6',
    juiceShade:   '#bec78b',
    juiceDeep:    '#929d61',
    limeRind:     '#f3f7e6',
    limeFlesh:    '#b8df5c',
    limePith:     '#8bc33f',
    /* THE ICE CREAM: see SCOOPS, the four flavours */
    /* THE PATTY */
    beef:         '#74362e',
    beefLit:      '#9a4d41',
    beefDeep:     '#46191a',
    fat:          '#dccbb9',
    gold:         '#f2cf6a',
    goldDeep:     '#c9a23f',
    goldHi:       '#fff3c4',
    /* the crisper's loose grape (ref 2/3) */
    grape:        '#9bc14b',
    grapeHi:      '#d2ec9a',
    grapeDeep:    '#5f8a2a',
    /* the fridge's own display */
    readout:      '#bfe6f7',
    readoutShadow:'#14303f',
    readoutHot:   '#ff8a5a',
    /* a spare life glows the same jade in every level */
    lifeJade:     '#5fae9a',
    lifePale:     '#93d8bd',
    outline:      K.outline,
    void:         K.void
  };
  /* The neutral effect palette the engine paints its particles from.
     The Kitchen's lamp-lit AIR is not used: the fridge's air is frost. */
  var FX = {
    motes: '#cfe3ee', motesHi: '#ffffff',
    /* frost shaken off the roof when an egg lets go */
    puff: '#dcebf3', puffHi: '#ffffff',
    /* the trim's steel and ice chips, for the bops */
    ground: '#6b7b86', groundHi: '#c5d6df',
    /* ice shards (every drop carries its own pair anyway) */
    splat: '#dfeef5', splatHi: '#ffffff',
    hot: '#f0922e', hotMid: '#ffb347', hotHi: '#ffe08a', heat: '#f0922e', heatEdge: '#b84d12',
    glowCore: '255,224,138', glowEdge: '240,146,46'
  };

  /* The heads-ups, two short lines each, no apostrophes (the font has
     one, the house style does not). The banners come at 5 (the eggs),
     8 (the mist) and 12 (the snap): three pillars apart each, and the
     heaviest thing in the room comes last. */
  var WARN = {
    drop: ['▼ FROZEN EGGS ▼', 'THEY SHATTER WHERE YOU FLY'],
    ceil: ['▲ THE LINER ▲', 'THE ROOF IS AS HARD AS ICE'],
    mist: ['▲ COLD MIST ▲', 'READ THE SPOTS ON THE TRIM'],
    late: ['▲ COLD SNAP ▲', 'THE ICE HOLDS FOR 3 STACKS']
  };

  /* the thirteen colours a generic cover would use: the TV's reruns and
     the stands' set read PREVIEW.back, and the cover itself is COVER,
     below, in the bay's own pigments */
  var PREVIEW = {
    back: P.liner, backAlt: P.roofNear, seam: P.ribShade,
    beam: P.tubWhite, beamDark: P.tubDeep, beamLight: '#ffffff',
    ground: P.trimFace, groundDark: P.trimDeep, groundHi: P.trimArris,
    spike: P.shell, spikeHi: P.frost, air: P.led, gloom: P.coldDeep
  };

  var END_MIN = Kitchen.END_MIN;
  var CEIL_KILLS = Kitchen.CEIL_KILLS;
  var BOON_NAME = 'ICE CREAM';
  var GOLD_NAME = 'PATTY';

  /* THE EGG'S FALL IS SET BY WHERE IT HAS TO BE, the Bar's lesson. The
     brief had 190 (1.3..1.5s down, born at x 280..376): counted over
     eight autopiloted minutes, 1.9 eggs a minute came within 22px of the
     doodad, because at 190 an egg is at the doodad's height only when it
     is still well to his right - nearly all of them landed in front of
     him, and the bay's sky was scenery. At 150 an egg takes 1.6..1.7s to
     come down, and born at x 250..360 (the tune's dropAhead 120..230) it
     crosses x 116 at y 104..220 at mid speed - low in the lane at
     speedStart, through the middle at speedMax, a hazard that grows with
     the run - and still lands on the screen, so the CLINK and the yolk
     are seen. Measured at the final tune: 9 to 14 eggs a minute within
     22px of an autopilot that dodges nothing, 3 to 5 contacts. Still
     quicker than the Coop's raw egg (3s); slower than the Table's fork. */
  var DROP_GRAV = 150;
  /* shell and a frozen yolk lie on the trim this long */
  var SPLAT_TIME = 1.5;

  /* THE PATTY IS THE ART'S ROLL, the Table's reason: a +5 the module did
     not roll would fall as an egg and be dodged. About one drop in 22,
     never inside six of another. */
  var GOLD_CHANCE = 0.045, GOLD_GAP = 6;
  var goldGap = 0;

  var T = {};                       /* baked tiles and sprites */

  /* --------------------------------------------------------- the camera

     ONE PINHOLE, the way the Table and the Floor share one room. The eye
     is level with the middle of the opening (row 133), so the roof and
     the glass are mirror images of each other in depth. A thing at depth
     d cm behind the opening is drawn at scale s = EYE / (EYE + d) of the
     opening's, and slides at s of the room's speed:

        the opening: the lid, the trim, the stacks, the eggs   s 1.00
        the LED panel, 4..10 cm in                              s 0.95..0.89
        the ribs, 18..45 cm in                                  s 0.82..0.64
        the vent, 38 cm in                                      s 0.68
        the back wall and everything standing against it        s 0.64

     EYE is set by the one thing the photographs fix, the back wall's
     share of the frame: 45 cm of depth at 0.64 is 80 cm of lens. On the
     roof and on the glass, row and depth are one number: a row r on the
     roof is at s = (133 - r) / 109, on the glass s = (r - 133) / 109.
     Anything at world x X (in opening pixels) is on the screen at
     240 + s (X - scroll - 240): the vanishing point is the middle of the
     screen, and a tiled layer at s is tileX'd at s.scroll - 240(1 - s),
     so every layer agrees with every other about where the compartment
     is. */
  var HORIZON = 133;
  var PX_CM = (FLOOR - CEIL) / 27;            /* 8.07 at the opening */
  var COMP_W = 662;                           /* 82 cm at the opening */
  var WALL_W = 424;                           /* 82 cm at the back wall */
  var WALL_PAR = WALL_W / COMP_W;             /* 0.6405 */
  var DEPTH_CM = 45;
  var EYE_CM = DEPTH_CM * WALL_PAR / (1 - WALL_PAR);   /* 80.2 */
  var WALL_Y = 64;                            /* the first row of the back wall */
  var BASE_Y = 202;                           /* the row the shelf's things stand on */
  var GLASS_Y = 203;                          /* the glass, back to front, 203..241 */
  var WALL_H = FLOOR - WALL_Y;                /* 178: the wall and its reflection */
  var BASE_T = BASE_Y - WALL_Y;               /* 138: the base row in the tile */
  var LID_H = CEIL, TRIM_H = VH - FLOOR;      /* 24 and 28 */

  function sAt(cm) { return EYE_CM / (EYE_CM + cm); }
  function roofRow(s) { return HORIZON - s * (HORIZON - CEIL); }
  function roofScale(r) { return (HORIZON - r) / (HORIZON - CEIL); }
  function layerOff(s, scroll) { return s * scroll - 240 * (1 - s); }

  /* THE LED PANEL, ref 1: a square of light in the roof, in the middle
     of the compartment, 12 cm wide, from 4 to 10 cm in */
  var LED_X = 331, LED_HALF = 6 * PX_CM, LED_D0 = 4, LED_D1 = 10;
  var LED_S = sAt(7);
  /* THE RIBS, ref 1: nine raised ribs on the back of the roof, 9 cm
     apart, from 18 cm in to the corner */
  var RIB_N = 9, RIB_DX = 70, RIB_D0 = 18;
  /* THE VENT, ref 1: the little white block on the roof at the back,
     right of the middle, 5 cm wide and 2.5 cm deep, 38 cm in */
  var VENT_X = 481, VENT_D = 38, VENT_S = sAt(VENT_D);
  var VENT_W = 28, VENT_H = 14;

  /* --------------------------------------------------------- helpers */

  function rect(c, x, y, w, h, col) {
    if (w <= 0 || h <= 0) return;
    c.fillStyle = col; c.fillRect(x, y, w, h);
  }
  function dot(c, x, y, col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }

  function hexRGB(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  function mixRGB(a, b, k) {
    return [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k, a[2] + (b[2] - a[2]) * k];
  }
  function css(c) {
    return 'rgb(' + Math.round(c[0]) + ',' + Math.round(c[1]) + ',' + Math.round(c[2]) + ')';
  }
  function mix(a, b, k) { return css(mixRGB(hexRGB(a), hexRGB(b), k)); }

  /* An alpha sheet in one colour, painted through ImageData: every
     smooth falloff in this file - the haze, the banks, the pools of
     light, the soft discs - is one of these, baked at boot (the Bar's) */
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

  /* a sheet painted pixel by pixel in any colours: fn returns an
     [r, g, b] (or [r, g, b, alpha]) or null for clear */
  function pixelSheet(w, h, fn) {
    var t = makeCanvas(w, h), img = t.ctx.createImageData(w, h), d = img.data;
    var x, y, p, i = 0;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        p = fn(x, y);
        if (p) {
          d[i] = Math.round(clamp(p[0], 0, 255));
          d[i + 1] = Math.round(clamp(p[1], 0, 255));
          d[i + 2] = Math.round(clamp(p[2], 0, 255));
          d[i + 3] = p.length > 3 ? Math.round(clamp(p[3], 0, 1) * 255) : 255;
        }
        i += 4;
      }
    }
    t.ctx.putImageData(img, 0, 0);
    return t;
  }

  /* The house's 1px outline laid UNDER everything painted on a sprite so
     far (the Table's ringUnder): notches keep their insides */
  function ringUnder(t) {
    var ring = ringOf(t, t.w, t.h);
    t.ctx.globalCompositeOperation = 'destination-over';
    t.ctx.drawImage(ring.canvas, 0, 0);
    t.ctx.globalCompositeOperation = 'source-over';
    return t;
  }

  /* lay a colour over the PAINTED pixels of a sheet only */
  function tintAtop(t, col, a) {
    t.ctx.globalCompositeOperation = 'source-atop';
    t.ctx.fillStyle = rgba(col, a);
    t.ctx.fillRect(0, 0, t.w, t.h);
    t.ctx.globalCompositeOperation = 'source-over';
  }

  function flipped(src) {
    var t = makeCanvas(src.w, src.h), c = t.ctx;
    c.translate(0, src.h);
    c.scale(1, -1);
    c.drawImage(src.canvas, 0, 0);
    c.setTransform(1, 0, 0, 1, 0, 0);
    return t;
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

  /* a few crystals of rime: `n` white pixels and two of ice, scattered
     off a hash in a w x h patch, so the same patch frosts the same way
     every time it is baked */
  function crystals(c, x, y, w, h, n, seed) {
    for (var i = 0; i < n; i++) {
      var hh = hash(seed + i * 7919);
      dot(c, x + hh % w, y + (hh >>> 11) % h, i % 4 === 3 ? P.ice : P.rime);
    }
  }

  /* ======================================================= THE ROOM */

  /* THE LID, 662 x 24 at 1.0: the liner's front flange over the
     opening, a compartment wide so it never visibly repeats. Rows:
       0..1    the flange's top, a step darker (it turns away)
       2..16   its face, the white plastic, faint long shading
       17      the roll catching the LED from inside - the lit row
       18..20  the roll turning under
       21..22  under it, in its own shade
       23      the arris: the dark line the lid kills along
     Rime on the roll and frost feathers on the face, a compartment's
     worth, scrolling with the lid: the cold is the motion cue up here. */
  function bakeLid() {
    var W = COMP_W, t = makeCanvas(W, LID_H), c = t.ctx, r = mulberry32(4301), i, x, y;
    var ROWS = [mix(P.lip, P.lipShade, 0.6), mix(P.lip, P.lipShade, 0.3)];
    for (i = 2; i <= 16; i++) ROWS.push(mix(P.lip, P.lipShade, 0.2 * (1 - (i - 2) / 14)));
    ROWS.push(P.lipLit, P.lip, P.lipShade, P.lipDeep, P.lipDeep, mix(P.lipDeep, P.lidArris, 0.5), P.lidArris);
    for (y = 0; y < LID_H; y++) rect(c, 0, y, W, 1, ROWS[y]);
    /* the face's long soft shading: wide pale and grey bands, two to a
       compartment, as moulded plastic catches a light from below */
    for (x = 0; x < W; x++) {
      var k = 0.5 + 0.5 * Math.sin(x / W * TAU * 2 + 0.7);
      if (k > 0.7) { c.fillStyle = rgba(P.lipLit, 0.35 * (k - 0.7) / 0.3); c.fillRect(x, 3, 1, 13); }
    }
    /* RIME along the roll: little runs of white, and here and there a
       crystal standing up off it */
    for (i = 0; i < 70; i++) {
      x = Math.floor(r() * W);
      var len = 1 + Math.floor(r() * 4);
      rect(c, x, 17, Math.min(len, W - x), 1, P.rime);
      if (r() < 0.4) dot(c, x + Math.floor(len / 2), 16, P.frost);
      if (r() < 0.3) dot(c, x, 18, P.iceHi);
    }
    /* FROST CREEPING UP the face from the cold roll: a ragged zone a few
       pixels deep whose height wanders along the lid, thick at its foot
       and thinning as it climbs, with a crystal standing at its edge now
       and then - frost grows from the coldest edge, not in patterns */
    for (x = 0; x < W; x++) {
      var u = x / W * TAU;
      var hgt = 3 + 2.2 * Math.sin(u * 3 + 0.4) + 1.6 * Math.sin(u * 7 + 2.1) + 1.2 * Math.sin(u * 13 + 1.3);
      for (y = 16; y >= 16 - Math.max(0, hgt); y--) {
        var k = (16 - y) / Math.max(1, hgt);
        if (hash(x * 131 + y * 7 + 11) % 100 < 70 * (1 - k) + 6) dot(c, x, y, k < 0.35 ? P.rime : P.frost);
      }
      if (hgt > 4.5 && hash(x * 17 + 5) % 23 === 0) {
        var cy = Math.round(16 - hgt) - 1;
        dot(c, x, cy, P.rime); dot(c, x - 1, cy + 1, P.frost); dot(c, x + 1, cy + 1, P.frost); dot(c, x, cy - 1, P.frost);
      }
    }
    return t;
  }

  /* THE ROOF, a static sheet 480 x 40 at row 24: ONE smooth gradient from
     the front (lit) to the back corner, so it has no texture of its own
     to scroll; what moves on it - the LED, the ribs, the vent - is drawn
     on it at its own depth. The last three rows darken into the corner. */
  function bakeRoof() {
    var H = WALL_Y - CEIL, t = makeCanvas(VW, H), c = t.ctx, y;
    for (y = 0; y < H; y++) {
      var col = mix(P.roofNear, P.roofFar, ease(y / (H - 1)));
      if (y >= H - 3) col = mix(P.roofFar, P.cornerShade, (y - (H - 4)) / 3);
      rect(c, 0, y, VW, 1, col);
    }
    return t;
  }

  /* the LED's pool on the roof: a wide soft ellipse of its own light,
     brightest at the panel. 360 x 40, centred on the panel. */
  function bakeLedPool() {
    var W = 360, H = WALL_Y - CEIL, cy = 9;
    return alphaSheet(W, H, P.led, function (x, y) {
      var dx = (x + 0.5 - W / 2) / (W / 2), dy = (y + 0.5 - cy) / (y < cy ? 12 : 34);
      var d = Math.sqrt(dx * dx + dy * dy);
      return d < 1 ? 0.42 * (1 - ease(d)) : 0;
    });
  }

  /* THE VENT, ref 1: a white block 28 x 14 hanging off the roof, a lit
     top, a shaded right end, and two dark slots side by side - the cold
     air comes out of here. With its soft shadow on the wall under it. */
  function bakeVent() {
    var t = makeCanvas(VENT_W, VENT_H), c = t.ctx;
    rect(c, 1, 0, VENT_W - 2, VENT_H - 1, P.ventFace);
    rect(c, 1, 0, VENT_W - 2, 1, P.ventShade);          /* where it meets the roof */
    rect(c, 1, 1, VENT_W - 2, 1, P.ventLit);
    rect(c, VENT_W - 4, 1, 3, VENT_H - 2, P.ventShade);
    rect(c, 1, VENT_H - 2, VENT_W - 2, 1, P.ventShade);
    rect(c, 1, VENT_H - 1, VENT_W - 2, 1, P.lipDeep);
    /* the slots */
    rect(c, 7, 4, 5, 6, P.ventSlot); rect(c, 15, 4, 5, 6, P.ventSlot);
    rect(c, 7, 9, 5, 1, P.ventShade); rect(c, 15, 9, 5, 1, P.ventShade);
    dot(c, 11, 4, P.ventShade); dot(c, 19, 4, P.ventShade);
    /* rime round the slots' lips */
    dot(c, 8, 3, P.rime); dot(c, 10, 3, P.rime); dot(c, 16, 3, P.rime); dot(c, 18, 3, P.rime);
    dot(c, 3, 2, P.rime); dot(c, 22, 2, P.rime);
    return t;
  }
  function bakeVentShade() {
    return alphaSheet(VENT_W + 16, 14, P.coldDeep, function (x, y) {
      var dx = Math.abs(x + 0.5 - (VENT_W + 16) / 2) / ((VENT_W + 16) / 2);
      return 0.22 * (1 - ease(dx)) * (1 - ease(y / 13));
    });
  }

  /* THE BACK WALL, 424 x 178 at 0.64, laid at row 64: the compartment's
     back as ref 1 and ref 5 have it. Tile rows (screen = tile + 64):
       0..13     the white liner, in the cove under the roof's corner
       14..134   THE STEEL PANEL: brushed steel, a raised middle plate
                 (its top edge 14, the ends 19, chamfered), the two
                 round holes at a third and two thirds
       135..138  the shelf's back channel, a lit lip and its dark
       139..177  the glass's reflection of all of the above, flipped,
                 fading toward the front (laid over the static glass)
     Nothing stands in this tile: the things on the shelf are boxes in the
     room (THE SHELF, below), each at its own depth. */
  var HOLE_Y = 30, HOLES = [141, 283];

  function panelTop(x) {
    /* the raised middle plate, x 62..362, and its chamfered ends */
    if (x >= 62 && x <= 362) return 14;
    if (x >= 57 && x < 62) return 14 + (62 - x);
    if (x > 362 && x <= 367) return 14 + (x - 362);
    return 19;
  }

  function bakeWall() {
    var W = WALL_W, H = WALL_H, x, y, i;
    var STEEL = hexRGB(P.steel), LIT = hexRGB(P.steelLit), SHADE = hexRGB(P.steelShade);
    var LINER = hexRGB(P.liner), LSH = hexRGB(P.linerShade), CORNER = hexRGB(P.cornerShade);
    /* the brushing: per row, runs of a few percent lighter or darker,
       which is what brushed steel is from a metre away */
    var streak = function (x, y) {
      var o = hash(y * 131 + 7) % W, run = 9 + hash(y * 17 + 3) % 23;
      var h = hash(y * 977 + Math.floor(wrap(x + o, W) / run) * 31);
      return ((h % 7) - 3) * 1.6;
    };
    var t = pixelSheet(W, H, function (x, y) {
      if (y > BASE_T) return null;
      var top = panelTop(x);
      if (y < top - 1) {
        /* the liner: deep in the cove, lighter as it comes down */
        if (y === 0) return CORNER;
        return mixRGB(LSH, LINER, ease((y - 1) / 6));
      }
      if (y === top - 1) return mixRGB(LSH, CORNER, 0.6);          /* the gap at the plate's edge */
      if (y === top) return LIT;                                     /* its lit top edge */
      if (y >= 135) return null;                                     /* the channel, below */
      /* THE SHEEN: broad soft reflections of the LED across the plate,
         periodic in the tile so it wraps, and lighter at the top where
         the light is */
      var u = x / W * TAU;
      var sheen = 7 * Math.sin(u + 0.4) + 4 * Math.sin(2 * u + 2.2) + 3 * Math.sin(3 * u + 0.9);
      var down = 8 * (1 - ease((y - top) / 60)) - 5 * ease((y - 90) / 45);
      var k = sheen + down + streak(x, y);
      var c = k >= 0 ? mixRGB(STEEL, LIT, k / 40) : mixRGB(STEEL, SHADE, -k / 22);
      /* the plate's ends sit a step back, a shade darker */
      if (top === 19) c = mixRGB(c, SHADE, 0.25);
      return c;
    });
    var c = t.ctx;
    /* the plate's chamfer edges, lit going up and shaded coming down, and
       a short shadow where each end steps back */
    for (x = 57; x < 62; x++) dot(c, x, panelTop(x), P.steelLit);
    for (x = 363; x <= 367; x++) dot(c, x, panelTop(x), P.steelShade);
    rect(c, 368, 20, 1, 6, P.steelShade);
    /* rime along the plate's top edge */
    for (i = 0; i < 46; i++) {
      x = hash(5101 + i * 37) % W;
      dot(c, x, panelTop(x) - 1, i % 3 ? P.rime : P.frost);
    }
    /* THE TWO HOLES, ref 1: dark, a shadow inside the upper left and the
       light on the lower right of the rim */
    for (i = 0; i < HOLES.length; i++) {
      var hx = HOLES[i], hy = HOLE_Y;
      rect(c, hx - 2, hy - 2, 5, 5, P.steelHole);
      rect(c, hx - 3, hy - 1, 7, 3, P.steelHole);
      rect(c, hx - 1, hy - 3, 3, 7, P.steelHole);
      dot(c, hx - 2, hy - 2, P.steelDeep);
      rect(c, hx - 1, hy + 4, 3, 1, P.steelLit); dot(c, hx + 2, hy + 3, P.steelLit);
      dot(c, hx + 3, hy + 2, P.steelLit);
      rect(c, hx - 1, hy - 4, 3, 1, P.steelDeep);
    }
    /* THE CHANNEL at the back of the glass: its lit lip with rime, then dark */
    rect(c, 0, 135, W, 1, P.channelLit);
    rect(c, 0, 136, W, 3, P.channel);
    for (i = 0; i < 40; i++) dot(c, hash(6203 + i * 53) % W, 135, P.rime);
    /* FROST in the corners where the panel meets the channel: little
       clusters along the foot of the steel */
    for (i = 0; i < 14; i++) {
      var fx = hash(7001 + i * 89) % (W - 8);
      crystals(c, fx, 129, 8, 5, 4, 7100 + i * 13);
    }

    /* THE REFLECTION: rows 139..177 are rows 138..100 flipped, at a
       quarter, fading to a fifteenth at the front - the glass as a
       mirror at a grazing angle. A touch darker than the thing, as a
       reflection in tinted glass is. */
    var img = c.getImageData(0, 0, W, H), d = img.data;
    var RH = H - BASE_T - 1;
    for (y = 0; y < RH; y++) {
      var src = BASE_T - y, dst = BASE_T + 1 + y;
      var a = REFL_A0 - (REFL_A0 - REFL_A1) * ease(y / (RH - 1));
      for (x = 0; x < W; x++) {
        var si = (src * W + x) * 4, di = (dst * W + x) * 4;
        d[di] = d[si] * 0.82; d[di + 1] = d[si + 1] * 0.86; d[di + 2] = d[si + 2] * 0.92;
        d[di + 3] = Math.round(a * 255);
      }
    }
    c.putImageData(img, 0, 0);
    return t;
  }
  /* how much of the room the glass gives back: at the back, where the
     angle is grazing, and at the front, where it is steeper */
  var REFL_A0 = 0.30, REFL_A1 = 0.06;

  /* ======================================================== THE SHELF

     The three things on the top shelf, as ref 5 has them: the milk at the
     left and the eggs at the right, each lying with its length running
     back into the fridge, and the flat bag lying across the middle at
     the back. Each is a BOX in the room, drawn where the pinhole puts it:
     its near face is a baked sprite at its near depth's scale and moves
     at that depth's speed; its top (the eye is above all three) and the
     side that faces the middle of the screen are drawn a column or a row
     at a time from baked textures, so they foreshorten and turn as the
     box goes by, exactly as the roof's ribs do. In the glass, under each,
     its reflection.

        the milk   9.5 x 9.5 x 24 cm, 21..45 cm in, at the left
        the bag    30 x 3 x 15 cm, 30..45 cm in, across the middle
        the eggs   10 x 7 x 30 cm, 15..45 cm in, at the right

     X is where it stands across the compartment (opening pixels, 662 to
     the compartment); d0..d1 its near and far depth in cm; h its height
     in cm. Their colours are the photographs' laid a quarter of the way
     back toward the steel, so they are always quieter than a stack. */
  var BOXES = [
    { id: 'bag',  X0: 216, w: 30, d0: 30, d1: 45, h: 3 },
    { id: 'milk', X0: 22, w: 9.5, d0: 21, d1: 45, h: 9.5 },
    { id: 'eggs', X0: 552, w: 10, d0: 15, d1: 45, h: 7 }
  ];
  var STEP_BACK = 0.24;

  function stepBack(t) {
    tintAtop(t, P.steel, STEP_BACK);
    tintAtop(t, P.coldDeep, 0.08);
    return t;
  }

  /* THE MILK, Fridge ref 1 and 5: a half gallon of Horizon on its back,
     the gable end to us - the slope with the white cap catching the LED
     over the end panel with the brand's white name and yellow band - and
     the long side panel ("our farmers, your family" and the round cow
     logo) running back to the wall. */
  function milkFace(W, H) {
    var t = makeCanvas(W, H), c = t.ctx, y, g = Math.round(H * 0.42);
    /* the upper slope, tilted up to the LED, and the lower one turned
       away under the fin */
    for (y = 0; y < g; y++) rect(c, 0, y, W, 1, mix(P.milkRedLit, P.milkRed, 0.2 + 0.6 * y / g));
    rect(c, 0, g, W, H - g, P.milkRed);
    rect(c, 0, 0, W, 1, mix(P.milkRedLit, '#ffffff', 0.25));
    /* THE FIN, the sealed top, a pale ridge across the end */
    rect(c, 0, g, W, 2, P.milkWhite);
    rect(c, 0, g + 2, W, 1, P.milkRedDeep);
    /* THE CAP on the upper slope: a white disc, its rim and its shade */
    var cw = Math.round(W * 0.30), ch = Math.max(5, Math.round(g * 0.55));
    var cx = Math.round(W * 0.30), cy = Math.round(g * 0.22);
    rect(c, cx + 1, cy, cw - 2, ch, P.cap);
    rect(c, cx, cy + 1, cw, ch - 2, P.cap);
    rect(c, cx + 1, cy + ch - 1, cw - 2, 1, P.capShade);
    rect(c, cx + cw - 2, cy + 1, 2, ch - 2, P.capShade);
    rect(c, cx + 2, cy + 1, Math.round(cw * 0.4), 1, '#ffffff');
    dot(c, cx + Math.round(cw / 2), cy + Math.round(ch / 2), P.capShade);
    /* the end panel below the fin: the brand's white name and the
       yellow ORGANIC band, as words' worth of colour, no letters */
    var ny = g + 5, nh = Math.max(5, Math.round((H - g) * 0.30));
    rect(c, 5, ny, W - 10, nh, P.milkWhite);
    rect(c, 8, ny + Math.round(nh / 2) - 1, W - 16, 2, P.milkRed);
    var by = ny + nh + 2;
    rect(c, 9, by, W - 18, Math.max(3, Math.round(H * 0.08)), P.milkYellow);
    /* the panel's shade at the right and its foot */
    rect(c, W - 3, 1, 3, H - 1, P.milkRedDeep);
    rect(c, 0, H - 2, W, 2, P.milkRedDeep);
    crystals(c, 1, 0, W - 4, 2, 7, 8801);
    return stepBack(t);
  }
  function milkSide(W, H) {
    var t = makeCanvas(W, H), c = t.ctx, i, x;
    rect(c, 0, 0, W, H, mix(P.milkRed, P.milkRedDeep, 0.35));
    rect(c, 0, 0, W, 1, P.milkRedLit);
    /* the lettering, two lines of it, and the round logo */
    for (i = 0; i < 2; i++) {
      for (x = 4 + i * 3; x < W * 0.55; x += 5) rect(c, x, Math.round(H * (0.22 + i * 0.16)), 3, 2, P.milkWhite);
    }
    var lx = Math.round(W * 0.68), ly = Math.round(H * 0.42), lr = Math.round(H * 0.18);
    rect(c, lx - lr, ly - lr + 1, lr * 2, lr * 2 - 2, P.milkWhite);
    rect(c, lx - lr + 1, ly - lr, lr * 2 - 2, lr * 2, P.milkWhite);
    rect(c, lx - lr + 2, ly - lr + 2, lr * 2 - 4, lr - 1, P.milkInk);
    for (x = 4; x < W - 4; x += 6) rect(c, x, Math.round(H * 0.78), 4, 1, mix(P.milkRed, P.milkWhite, 0.4));
    rect(c, 0, H - 2, W, 2, P.milkRedDeep);
    return stepBack(t);
  }
  function milkTop(W, H) {
    var t = makeCanvas(W, H), c = t.ctx, y;
    rect(c, 0, 0, W, H, P.milkRedLit);
    for (y = 2; y < H; y += 4) rect(c, 2 + (y % 3), y, Math.round(W * 0.6), 1, mix(P.milkRedLit, P.milkWhite, 0.45));
    rect(c, W - 2, 0, 2, H, P.milkRed);
    crystals(c, 0, 0, W, H, 8, 8811);
    return stepBack(t);
  }

  /* THE BAG, ref 1 and 5: a long clear bag lying flat, a dark pack inside
     it with a red stripe and a white label, the plastic catching the LED */
  function bagFace(W, H) {
    var t = makeCanvas(W, H), c = t.ctx;
    c.fillStyle = P.bagClear; c.fillRect(0, 0, W, H);
    rect(c, 4, 2, W - 8, H - 4, P.pack);
    rect(c, 4, 2, W - 8, 1, P.packLit);
    rect(c, 4, Math.round(H / 2), W - 8, 1, P.packRed);
    rect(c, Math.round(W * 0.42), 3, Math.round(W * 0.12), Math.round(H / 2) - 3, P.milkWhite);
    rect(c, 2, 0, Math.round(W * 0.3), 1, P.bagGlint);
    rect(c, Math.round(W * 0.6), 1, Math.round(W * 0.2), 1, P.bagGlint);
    rect(c, 0, H - 1, W, 1, mix(P.pack, P.steel, 0.5));
    return stepBack(t);
  }
  function bagTop(W, H) {
    var t = makeCanvas(W, H), c = t.ctx, y;
    c.fillStyle = P.bagClear; c.fillRect(0, 0, W, H);
    rect(c, 5, 2, W - 10, H - 3, P.pack);
    for (y = 3; y < H - 1; y += 3) rect(c, 6, y, W - 12, 1, P.packLit);
    rect(c, 5, Math.round(H * 0.45), W - 10, 1, P.packRed);
    rect(c, Math.round(W * 0.4), 3, Math.round(W * 0.14), H - 5, mix(P.milkWhite, P.pack, 0.3));
    rect(c, 8, 1, Math.round(W * 0.35), 1, P.bagGlint);
    rect(c, Math.round(W * 0.55), H - 2, Math.round(W * 0.3), 1, P.bagGlint);
    crystals(c, 2, 0, W - 4, H, 9, 8901);
    return stepBack(t);
  }
  function bagSide(W, H) {
    var t = makeCanvas(W, H), c = t.ctx;
    c.fillStyle = P.bagClear; c.fillRect(0, 0, W, H);
    rect(c, 0, 1, W, H - 2, mix(P.pack, P.bagGlint, 0.25));
    return stepBack(t);
  }

  /* THE EGG CARTON, ref 5: grey pulp, its lid's end to us with the green
     label, the six cups bulging along its side, the ridged lid on top */
  function eggsFace(W, H) {
    var t = makeCanvas(W, H), c = t.ctx, x, y, lid = Math.round(H * 0.44);
    /* the lid's end, its top edge taken in where the lid rounds over */
    for (y = 0; y < lid; y++) {
      var ins = Math.max(0, 4 - y);
      rect(c, ins, y, W - 2 * ins, 1, y < 2 ? P.pulpLit : P.pulp);
    }
    /* the split between lid and base: a dark seam and the base's lip */
    rect(c, 0, lid, W, 1, P.pulpDeep);
    rect(c, 0, lid + 1, W, 2, P.pulpLit);
    /* the base's end: the end cup's round belly, lit on the left and
       turning away on the right, its foot taken in */
    for (y = lid + 3; y < H; y++) {
      var k = (y - lid - 3) / (H - lid - 4), ins2 = Math.round(Math.max(0, k - 0.6) * 12);
      rect(c, ins2, y, W - 2 * ins2, 1, P.pulp);
      rect(c, ins2, y, 3, 1, P.pulpLit);
      rect(c, W - ins2 - 6, y, 6, 1, P.pulpShade);
      dot(c, W - ins2 - 1, y, P.pulpDeep);
    }
    rect(c, Math.round(W * 0.48), lid + 4, 1, H - lid - 8, P.pulpShade);
    /* the green label on the lid's end, ref 5, with its two lines */
    rect(c, 6, 5, Math.round(W * 0.5), lid - 9, P.eggLabel);
    rect(c, 6, lid - 4, Math.round(W * 0.5), 1, mix(P.eggLabel, P.pulpDeep, 0.5));
    rect(c, 9, 8, Math.round(W * 0.36), 1, P.labelWhite);
    rect(c, 9, 11, Math.round(W * 0.24), 1, P.labelWhite);
    speckle(c, W, H, 9303, 70);
    rect(c, W - 2, 4, 2, lid - 4, P.pulpShade);
    crystals(c, 4, 0, W - 8, 2, 6, 9401);
    return stepBack(t);
  }
  function eggsSide(W, H) {
    var t = makeCanvas(W, H), c = t.ctx, i, x, y, lid = Math.round(H * 0.44);
    rect(c, 0, 0, W, lid, mix(P.pulp, P.pulpShade, 0.45));
    rect(c, 0, 0, W, 1, P.pulp);
    rect(c, 0, lid, W, 1, P.pulpDeep);
    rect(c, 0, lid + 1, W, 1, P.pulpShade);
    /* the six cups bulging out of the base, near (left) to far */
    var cw = W / 6;
    for (i = 0; i < 6; i++) {
      for (x = 0; x < Math.round(cw); x++) {
        var k = (x + 0.5) / cw * 2 - 1, round = Math.sqrt(Math.max(0, 1 - k * k));
        var foot = H - Math.round((1 - round) * (H - lid) * 0.45);
        var col = k < -0.35 ? P.pulp : (k > 0.45 ? P.pulpDeep : P.pulpShade);
        rect(c, Math.round(i * cw) + x, lid + 2, 1, foot - lid - 2, col);
      }
    }
    speckle(c, W, H, 9311, 90);
    return stepBack(t);
  }
  function eggsTop(W, H) {
    var t = makeCanvas(W, H), c = t.ctx, i;
    rect(c, 0, 0, W, H, P.pulpLit);
    /* the lid's ridges across it, one between each pair of cups */
    for (i = 1; i < 6; i++) rect(c, 2, Math.round(i * H / 6), W - 4, 1, P.pulpShade);
    rect(c, 0, 0, 2, H, P.pulp); rect(c, W - 2, 0, 2, H, P.pulpShade);
    speckle(c, W, H, 9321, 40);
    crystals(c, 1, 0, W - 2, H, 10, 9411);
    return stepBack(t);
  }
  function speckle(c, W, H, seed, n) {
    for (var i = 0; i < n; i++) {
      var h = hash(seed + i * 61);
      dot(c, h % W, (h >>> 9) % H, (h >>> 20) & 1 ? P.pulpShade : P.pulpLit);
    }
  }

  /* a box's baked pieces: the near face at its near scale, a side texture
     (depth across, height down) and a top texture (width across, depth
     down), and the near face's reflection, flipped and faded */
  var BOX_PAINT = {
    milk: [milkFace, milkSide, milkTop],
    bag:  [bagFace, bagSide, bagTop],
    eggs: [eggsFace, eggsSide, eggsTop]
  };
  function bakeBoxes() {
    var out = [], i;
    for (i = 0; i < BOXES.length; i++) {
      var B = BOXES[i], paint = BOX_PAINT[B.id];
      var s0 = sAt(B.d0), s1 = sAt(B.d1);
      var wX = B.w * PX_CM;
      var fw = Math.round(wX * s0), fh = Math.round(B.h * PX_CM * s0);
      var depthPx = Math.round((B.d1 - B.d0) * PX_CM * 0.8);
      var face = paint[0](fw, fh);
      var side = paint[1](Math.max(8, depthPx), fh);
      var top = paint[2](fw, Math.max(8, Math.round(depthPx / 2)));
      var refl = makeCanvas(fw, fh);
      refl.ctx.drawImage(flipped(face).canvas, 0, 0);
      fadeRows(refl, REFL_A0 * 0.9, 0.0);
      var sideRefl = flipped(side);
      fadeRows(sideRefl, REFL_A0 * 0.8, 0.0);
      out.push({ id: B.id, X0: B.X0, wX: wX, d0: B.d0, d1: B.d1, h: B.h, s0: s0, s1: s1,
                 face: face, side: side, top: top, refl: refl, sideRefl: sideRefl });
    }
    return out;
  }
  /* scale a sheet's alpha from a0 on its first row to a1 on its last */
  function fadeRows(t, a0, a1) {
    var img = t.ctx.getImageData(0, 0, t.w, t.h), d = img.data, x, y;
    for (y = 0; y < t.h; y++) {
      var a = a0 + (a1 - a0) * ease(y / Math.max(1, t.h - 1));
      for (x = 0; x < t.w; x++) d[(y * t.w + x) * 4 + 3] = Math.round(d[(y * t.w + x) * 4 + 3] * a);
    }
    t.ctx.putImageData(img, 0, 0);
  }

  /* EVERY COPY OF EVERY BOX on the screen this frame, in the order a
     painter must lay them. U is a box's left edge in world pixels relative
     to the vanishing point, so at a depth with scale s an edge is on the
     screen at 240 + s U. The boxes never overlap across the shelf, and
     the eye is over the middle of the screen, so a box can only ever hide
     part of one FARTHER OUT TO THE SIDE than itself - never one nearer the
     middle. So the farthest out goes down first, whatever its depth, and
     the one straddling the middle last. A fixed order (the bag, then the
     milk, then the eggs) laid the carton's far corner over the milk once
     the two had slid left of the middle, which the owner caught. */
  var boxQueue = [];
  function drawBoxes(ctx, scroll) {
    var b, U, n = 0;
    for (b = 0; b < T.boxes.length; b++) {
      var B = T.boxes[b];
      /* out to VW + 200, as the roof's ribs run: a box's far edge is at
         240 + 0.64 U, so a copy stopped at U 260 came on already 50px
         inside the right edge - the owner saw them pop in */
      for (U = wrap(B.X0 - scroll, COMP_W) - 240 - COMP_W; U < VW + 200; U += COMP_W) {
        if (Math.max(240 + B.s0 * (U + B.wX), 240 + B.s1 * (U + B.wX)) < -2 ||
            Math.min(240 + B.s0 * U, 240 + B.s1 * U) > VW + 2) continue;
        var out = U + B.wX < 0 ? -(U + B.wX) : (U > 0 ? U : 0);
        boxQueue[n] = boxQueue[n] || {};
        boxQueue[n].B = B; boxQueue[n].U = U; boxQueue[n].out = out; n++;
      }
    }
    boxQueue.length = n;
    boxQueue.sort(function (p, q) { return q.out - p.out; });
    for (b = 0; b < n; b++) drawBox(ctx, boxQueue[b].B, boxQueue[b].U);
  }

  /* ONE COPY OF ONE BOX, its left edge at U */
  function drawBox(ctx, B, U) {
    var hp = B.h * PX_CM, wX = B.wX, s0 = B.s0, s1 = B.s1, x, y, s, k;
    var sw = B.side.w, sh = B.side.h, tw = B.top.w, th = B.top.h;
    var xl0 = 240 + s0 * U, xr0 = 240 + s0 * (U + wX);
    var xl1 = 240 + s1 * U, xr1 = 240 + s1 * (U + wX);
    var yb0 = HORIZON + s0 * (FLOOR - HORIZON), yt0 = yb0 - hp * s0;
    var fx = Math.round(xl0), fy = Math.round(yt0), fb = fy + B.face.h;

    /* THE SIDE toward the middle of the screen, a column at a time */
    var e = 0, xa = 0, xb = 0;
    if (xr0 < 240) { e = U + wX; xa = Math.round(xr0); xb = Math.round(xr1); }
    else if (xl0 > 240) { e = U; xa = Math.round(xl1); xb = Math.round(xl0); }
    if (xb > xa) {
      for (x = xa; x < xb; x++) {
        s = clamp((x + 0.5 - 240) / e, s1, s0);
        k = clamp((EYE_CM / s - EYE_CM - B.d0) / (B.d1 - B.d0), 0, 0.999);
        var cb = Math.round(HORIZON + s * (FLOOR - HORIZON)), ct = Math.round(cb - hp * s);
        ctx.drawImage(B.side.canvas, Math.floor(k * sw), 0, 1, sh, x, ct, 1, cb - ct);
        ctx.drawImage(B.sideRefl.canvas, Math.floor(k * sw), 0, 1, sh, x, cb, 1, cb - ct);
      }
    }
    /* THE TOP, a row at a time from the far edge to the near */
    var yt1 = HORIZON + s1 * (FLOOR - HORIZON - hp);
    for (y = Math.round(yt1); y < fy; y++) {
      s = clamp((y + 0.5 - HORIZON) / (FLOOR - HORIZON - hp), s1, s0);
      k = clamp((EYE_CM / s - EYE_CM - B.d0) / (B.d1 - B.d0), 0, 0.999);
      var rl = Math.round(240 + s * U), rr = Math.round(240 + s * (U + wX));
      if (rr > rl) ctx.drawImage(B.top.canvas, 0, Math.floor((1 - k) * th * 0.999), tw, 1, rl, y, rr - rl, 1);
    }
    /* THE NEAR FACE, and its reflection and contact shade in the glass */
    ctx.drawImage(B.refl.canvas, fx, fb);
    Tint.rect(ctx, fx, fb, B.face.w, 1, P.void, 6);
    ctx.drawImage(B.face.canvas, fx, fy);
  }

  /* THE GLASS, a static sheet 480 x 39 at row 203: what is under the
     shelf seen through it, cool and dim, darker toward the front. The
     reflection over it travels with the wall. */
  function bakeGlass() {
    var H = FLOOR - GLASS_Y, t = makeCanvas(VW, H), c = t.ctx, y;
    for (y = 0; y < H; y++) rect(c, 0, y, VW, 1, mix(P.glassFar, P.glassNear, ease(y / (H - 1))));
    return t;
  }

  /* THE TRIM, 662 x 28 at 1.0: the shelf's polished steel front.
       0      the lit arris - THE KILL ROW, the brightest line in the band
       1..3   the chamfer catching the LED, stepping down
       4..18  the brushed face, with the room swimming in it
       19     its lower edge, lit
       20..21 the turn under
       22..27 the dark under the shelf */
  function bakeTrim() {
    var W = COMP_W, H = TRIM_H, r = mulberry32(5501), i;
    var FACE = hexRGB(P.trimFace), SHEEN = hexRGB(P.trimSheen), DEEP = hexRGB(P.trimDeep);
    var t = pixelSheet(W, H, function (x, y) {
      if (y === 0) return hexRGB(P.trimArris);
      if (y <= 3) return mixRGB(hexRGB(P.trimLit), SHEEN, (y - 1) / 2.5);
      if (y <= 18) {
        /* polished steel holds a soft blur of the room: broad lighter
           swathes, three to a compartment */
        var u = x / W * TAU;
        var sw = Math.max(0, Math.sin(3 * u + 0.5)) * 0.55 + Math.max(0, Math.sin(5 * u + 2.0)) * 0.25;
        var dv = 1 - Math.abs(y - 9) / 10;
        var cc = mixRGB(FACE, SHEEN, clamp(sw * dv, 0, 1));
        return cc;
      }
      if (y === 19) return SHEEN;
      if (y <= 21) return DEEP;
      return mixRGB(hexRGB(P.trimShadow), DEEP, 0.25 * (1 - (y - 22) / 6));
    });
    var c = t.ctx;
    /* the brushing: long horizontal hairlines across the face */
    for (i = 0; i < 90; i++) {
      var x = Math.floor(r() * W), y = 5 + Math.floor(r() * 13), len = 8 + Math.floor(r() * 40);
      c.fillStyle = r() < 0.5 ? rgba(P.trimBrush, 0.8) : rgba(P.trimDeep, 0.35);
      c.fillRect(x, y, Math.min(len, W - x), 1);
    }
    /* rime on the chamfer, and now and then a bead of melt under it */
    for (i = 0; i < 60; i++) {
      x = Math.floor(r() * W);
      dot(c, x, 1, P.rime);
      if (r() < 0.25) dot(c, x + 1, 2, P.frost);
    }
    return t;
  }

  /* the light over the whole room, static: the lens's two side columns,
     a cold dark at each edge (the house's falloff), and nothing else */
  function bakeLight() {
    var t = makeCanvas(VW, VH), c = t.ctx, x;
    for (x = 0; x < 56; x++) {
      var k = 1 - ease(x / 56);
      c.fillStyle = rgba(P.coldDeep, 0.20 * k);
      c.fillRect(x, CEIL, 1, FLOOR - CEIL);
      c.fillRect(VW - 1 - x, CEIL, 1, FLOOR - CEIL);
    }
    return t;
  }

  /* ===================================================== THE STACKS

     A pillar is a 34px column of fridge things. Three 34-wide tiles,
     listed TOP-DOWN as a standing stack shows them (the first is the one
     under the cap), each element jogged a pixel because nobody stacks
     straight - a fixed jog, off the list, so the tower is the same tower
     every frame. Lit from the upper left, every element frosted: a line
     of rime along the top of anything with a dark top, crystals at its
     foot, and a cold blue over its lower part. Art is at most 30 across
     so a jogged element and its ring stay inside the 34. */
  function elFrost(c, y, h, x0, w, seed) {
    /* the cold settling on its lower part */
    c.globalCompositeOperation = 'source-atop';
    c.fillStyle = rgba(P.frostDeep, 0.20);
    var fh = Math.round(h * 0.4);
    c.fillRect(x0, y + h - fh, w, fh);
    c.globalCompositeOperation = 'source-over';
    crystals(c, x0 + 1, y + h - 4, 6, 3, 4, seed);
  }

  /* CHOBANI, 24 rows: the 32oz tub, white, a white lid a hair wider than
     the body, the wordmark in black (a word's worth of ink, no letters)
     and the flavour's green band */
  var CHOBANI_INK = [
    '.##.#.......#.........#.',
    '#...###.##..###..##..#..',
    '.##.#.#.##..###.###.#.##'
  ];
  function elChobani(c, y, jx) {
    var L = 2 + jx, r;
    rect(c, L, y, 30, 1, P.tubLit);
    rect(c, L, y + 1, 30, 1, P.tubWhite);
    rect(c, L + 26, y, 4, 2, P.tubShade);
    rect(c, L, y + 2, 30, 1, P.tubDeep);
    for (r = 3; r < 22; r++) {
      var ins = r < 12 ? 1 : 2, w = 30 - 2 * ins, x0 = L + ins;
      rect(c, x0, y + r, w, 1, P.tubWhite);
      dot(c, x0, y + r, P.tubLit);
      rect(c, x0 + w - 5, y + r, 4, 1, P.tubShade);
      dot(c, x0 + w - 1, y + r, P.tubDeep);
    }
    paintGrid(c, CHOBANI_INK, L + 3, y + 7, { '#': P.chobaniInk });
    rect(c, L + 2, y + 15, 26, 2, P.chobaniGreen);
    rect(c, L + 25, y + 15, 3, 2, mix(P.chobaniGreen, P.tubDeep, 0.5));
    rect(c, L + 3, y + 22, 24, 1, P.tubDeep);
    rect(c, L + 4, y + 23, 22, 1, P.tubLine);
    elFrost(c, y, 24, L, 30, 1301 + y * 7 + jx);
  }

  /* SOUR CREAM, 15 rows: the 16oz tub (ref 4), white lid, the lavender
     label with its little window of white (the bowl on the carton) */
  function elSour(c, y, jx) {
    var L = 2 + jx, r;
    rect(c, L, y, 30, 1, P.tubLit);
    rect(c, L, y + 1, 30, 1, P.tubWhite);
    rect(c, L + 26, y, 4, 2, P.tubShade);
    rect(c, L, y + 2, 30, 1, P.tubDeep);
    for (r = 3; r < 13; r++) {
      var ins = r < 8 ? 1 : 2, w = 30 - 2 * ins, x0 = L + ins;
      rect(c, x0, y + r, w, 1, r === 3 ? P.tubWhite : P.sourLav);
      dot(c, x0, y + r, r === 3 ? P.tubLit : mix(P.sourLav, '#ffffff', 0.35));
      rect(c, x0 + w - 4, y + r, 3, 1, r === 3 ? P.tubShade : P.sourLavDeep);
      dot(c, x0 + w - 1, y + r, P.sourLavDeep);
    }
    /* the label: two short lines of purple lettering and the white window */
    rect(c, L + 4, y + 5, 7, 1, P.sourInk); rect(c, L + 4, y + 7, 9, 1, P.sourInk);
    rect(c, L + 15, y + 5, 9, 6, P.labelWhite);
    rect(c, L + 17, y + 8, 5, 2, P.tubShade);
    rect(c, L + 3, y + 12, 25, 1, P.sourLavDeep);
    rect(c, L + 3, y + 13, 24, 1, P.tubDeep);
    rect(c, L + 4, y + 14, 22, 1, P.tubLine);
    elFrost(c, y, 15, L, 30, 1401 + y * 7 + jx);
  }

  /* THE LITTLE STEEL BOX, 14 rows (ref 4): a narrower steel box under a
     green lid with its clear window */
  function elBox(c, y, jx) {
    var L = 4 + jx;
    rect(c, L, y, 26, 1, P.lidGreenLit);
    rect(c, L, y + 1, 26, 2, P.lidGreen);
    rect(c, L + 6, y + 1, 14, 1, mix(P.lidGreen, P.boxSteelLit, 0.45));   /* the window */
    rect(c, L, y + 3, 26, 1, P.lidGreenDeep);
    rect(c, L + 22, y, 4, 3, mix(P.lidGreen, P.lidGreenDeep, 0.5));
    rect(c, L + 1, y + 4, 24, 9, P.boxSteel);
    rect(c, L + 1, y + 4, 24, 1, P.boxSteelDeep);
    rect(c, L + 1, y + 5, 1, 8, P.boxSteelLit);
    rect(c, L + 3, y + 6, 14, 1, P.boxSteelLit);
    rect(c, L + 21, y + 5, 3, 8, P.boxSteelShade);
    rect(c, L + 1, y + 13, 24, 1, P.boxSteelDeep);
    /* rime on the lid's edge */
    crystals(c, L + 1, y, 24, 1, 5, 1501 + y);
    elFrost(c, y + 4, 10, L + 1, 24, 1503 + y * 7 + jx);
  }

  /* A FOIL TRAY, 8 rows: the rolled rim, the fluted wall, the base */
  function elFoil(c, y, jx) {
    var L = 2 + jx, r;
    rect(c, L + 1, y, 28, 1, P.foilLit);
    rect(c, L, y + 1, 30, 1, P.foil);
    rect(c, L, y + 1, 1, 1, P.foilLit);
    rect(c, L + 25, y + 1, 5, 1, P.foilShade);
    for (r = 2; r < 7; r++) {
      var ins = r < 4 ? 1 : 2, x0 = L + ins, w = 30 - 2 * ins;
      for (var x = 0; x < w; x++) dot(c, x0 + x, y + r, (x >> 1) & 1 ? P.foilShade : P.foil);
      dot(c, x0, y + r, P.foilLit);
    }
    rect(c, L + 3, y + 7, 24, 1, P.foilDeep);
    crystals(c, L + 2, y, 26, 1, 4, 1601 + y + jx);
  }

  /* THE BLACK TRAY the foil trays sit on, 10 rows */
  function elBlack(c, y, jx) {
    var L = 2 + jx;
    rect(c, L, y, 30, 1, P.blackLit);
    rect(c, L, y + 1, 30, 8, P.black);
    rect(c, L, y + 1, 1, 8, P.blackLit);
    rect(c, L + 2, y + 2, 20, 1, mix(P.black, P.blackLit, 0.5));
    rect(c, L + 1, y + 9, 28, 1, mix(P.black, P.outline, 0.5));
    /* rime shows best on black: along its rim, and frost at its foot */
    crystals(c, L, y, 30, 1, 9, 1701 + y + jx);
    crystals(c, L + 1, y + 6, 8, 3, 5, 1703 + y + jx);
  }

  /* the three towers, TOP-DOWN, [element, jog] */
  var STACKS = [
    [['S', 1], ['C', 0], ['S', -1], ['C', 0]],                               /* V0 dairy, 78 */
    [['B', 0], ['C', 1], ['B', -1], ['K', 0], ['B', 1]],                     /* V1 steel, 76 */
    [['S', 1], ['C', 0], ['F', 0], ['F', 1], ['F', -1], ['K', 0]]            /* V2 foil, 73 */
  ];
  var EL_H = { C: 24, S: 15, B: 14, F: 8, K: 10 };
  var EL_PAINT = { C: elChobani, S: elSour, B: elBox, F: elFoil, K: elBlack };

  function bakeStack(v) {
    var list = STACKS[v], h = 0, i, y = 0;
    for (i = 0; i < list.length; i++) h += EL_H[list[i][0]];
    var t = makeCanvas(34, h), c = t.ctx;
    for (i = 0; i < list.length; i++) {
      EL_PAINT[list[i][0]](c, y, list[i][1]);
      y += EL_H[list[i][0]];
    }
    return ringUnder(t);
  }

  /* THE CAPS, 42 x 9, standing (the thing lying across the mouth of a
     standing stack, top face up). The hanging cap is the same flipped.
     CAP A, THE FOIL TRAY: the rim, the flutes, the base, its own outline
     top and bottom so the mouth is a crisp line. */
  function bakeCapFoil() {
    var t = makeCanvas(42, 9), c = t.ctx, x, r;
    rect(c, 2, 0, 38, 1, P.outline);
    rect(c, 1, 1, 40, 1, P.foilLit);
    rect(c, 1, 2, 40, 1, P.foil);
    rect(c, 35, 2, 6, 1, P.foilShade);
    for (r = 3; r < 7; r++) {
      var ins = r < 5 ? 2 : 3;
      for (x = ins; x < 42 - ins; x++) dot(c, x, r, (x >> 1) & 1 ? P.foilShade : P.foil);
      dot(c, ins, r, P.foilLit);
    }
    rect(c, 4, 7, 34, 1, P.foilDeep);
    rect(c, 5, 8, 32, 1, P.outline);
    /* the ends */
    dot(c, 1, 0, P.outline); dot(c, 40, 0, P.outline);
    rect(c, 0, 1, 1, 2, P.outline); rect(c, 41, 1, 1, 2, P.outline);
    for (r = 3; r < 7; r++) { var e = r < 5 ? 1 : 2; dot(c, e, r, P.outline); dot(c, 41 - e, r, P.outline); }
    dot(c, 3, 7, P.outline); dot(c, 38, 7, P.outline);
    /* rime on the rim */
    crystals(c, 3, 1, 36, 1, 5, 1801);
    return t;
  }

  /* CAP B, THE BIG STEEL BOX WITH THE BLUE LID (ref 2/3/4): the lid's
     blue rim with its clip tab hanging down over the steel at the
     front, and the box's wall under it */
  function bakeCapBlue() {
    var t = makeCanvas(42, 9), c = t.ctx;
    rect(c, 1, 0, 40, 1, P.outline);
    rect(c, 1, 1, 40, 1, P.lidBlueLit);
    rect(c, 1, 2, 40, 1, P.lidBlue);
    rect(c, 1, 3, 40, 1, P.lidBlueDeep);
    rect(c, 34, 1, 7, 2, mix(P.lidBlue, P.lidBlueDeep, 0.4));
    rect(c, 2, 4, 38, 4, P.boxSteel);
    rect(c, 2, 4, 38, 1, P.boxSteelLit);
    rect(c, 2, 5, 1, 3, P.boxSteelLit);
    rect(c, 35, 5, 5, 3, P.boxSteelShade);
    rect(c, 2, 7, 38, 1, P.boxSteelDeep);
    rect(c, 2, 8, 38, 1, P.outline);
    /* the clip tab, at the front in the middle, over the steel */
    rect(c, 19, 3, 4, 3, P.lidBlue);
    rect(c, 19, 3, 1, 3, P.lidBlueLit);
    rect(c, 19, 6, 4, 1, P.lidBlueDeep);
    /* the ends */
    rect(c, 0, 1, 1, 3, P.outline); rect(c, 41, 1, 1, 3, P.outline);
    rect(c, 1, 4, 1, 4, P.outline); rect(c, 40, 4, 1, 4, P.outline);
    crystals(c, 3, 1, 30, 1, 4, 1901);
    return t;
  }

  /* A STANDING STACK IS TILED FROM ITS CAP DOWNWARD, A HANGING ONE FROM
     ITS CAP UPWARD, so the element at the mouth of the gap is always
     whole and the cut is always at a kill edge: the standing column's
     last element goes down behind the trim, the hanging one's up behind
     the lid's flange. (js/bar.js's columnUp, and its mirror.) */
  function columnDown(ctx, tile, x, y, h) {
    var th = tile.height, w = tile.width, drawn = 0, slice;
    while (drawn < h) {
      slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, 0, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }
  function columnUp(ctx, tile, x, y, h) {
    var th = tile.height, w = tile.width, drawn = 0, slice;
    while (drawn < h) {
      slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + h - drawn - slice, w, slice);
      drawn += slice;
    }
  }

  /* ======================================================== THE EGG

     THE COOP'S EGG, baked by the Coop itself (9 x 11 with its outline:
     the lit shoulder, the shade rolling away to the right, the three
     freckles), then FROZEN THROUGH: every one of its colours swapped for
     the ice's (the shell above), so it is the same egg in a different
     hue, and the cold laid on it - a cap of rime on the crown with a
     ragged edge, a glint, two flecks of frost on the rim. The first
     freeze only cooled the cream a touch and the owner found it too like
     the Coop's (2026-11-01). Drawn where the Coop draws it and boxed as
     the Coop boxes it. */
  function bakeEgg() {
    var t = Coop.bakeEgg(), c = t.ctx, C = Coop.P;
    var SWAP = [[C.eggShell, P.shell], [C.eggShellHi, P.shellLit], [C.eggShade, P.shellShade],
                [C.eggShadow, P.shellDeep], [C.eggFleck, P.shellFleck], [C.outline, P.shellLine]]
      .map(function (q) { return [hexRGB(q[0]), hexRGB(q[1])]; });
    var img = c.getImageData(0, 0, t.w, t.h), d = img.data, i, j;
    for (i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      for (j = 0; j < SWAP.length; j++) {
        var a = SWAP[j][0];
        if (d[i] === a[0] && d[i + 1] === a[1] && d[i + 2] === a[2]) {
          d[i] = SWAP[j][1][0]; d[i + 1] = SWAP[j][1][1]; d[i + 2] = SWAP[j][1][2];
          break;
        }
      }
    }
    c.putImageData(img, 0, 0);
    /* the rime on the crown, ragged where it gives out */
    dot(c, 3, 1, P.iceHi); dot(c, 4, 1, P.rime); dot(c, 5, 1, P.frost);
    dot(c, 4, 2, P.frost); dot(c, 5, 2, P.frost); dot(c, 6, 2, P.frostDeep);
    dot(c, 5, 3, P.frostDeep);
    /* the glint, and frost on the shaded rim */
    dot(c, 2, 4, P.iceHi);
    dot(c, 7, 6, P.frost); dot(c, 6, 8, P.frostDeep);
    return t;
  }

  /* ================================================== THE POWER-UPS

     Usual pickup size, each ringed, each wearing a glow that says what it
     is. They are the warmest things in the room after the heat itself. */

  /* THE KIMCHI JAR (spicy), ref 2/3's red jar in the crisper: 14 x 17
     with the ring. A white lid, a clear round jar full of red, chunks,
     the label (a red word-bar and a green rule), frost on the shoulder. */
  function bakeKimchi() {
    var t = makeCanvas(14, 17), c = t.ctx;
    /* the lid */
    rect(c, 2, 1, 10, 1, P.jarLid);
    rect(c, 1, 2, 12, 1, P.jarLid);
    rect(c, 1, 3, 12, 1, P.jarLidShade);
    rect(c, 10, 1, 2, 2, P.jarLidShade);
    /* the jar */
    rect(c, 1, 4, 12, 11, P.kimchi);
    rect(c, 2, 15, 10, 1, P.kimchiDeep);
    rect(c, 10, 5, 3, 10, P.kimchiDeep);
    rect(c, 1, 13, 12, 2, P.kimchiDeep);
    /* the chunks */
    rect(c, 3, 11, 2, 2, P.kimchiHi); rect(c, 8, 12, 2, 1, P.kimchiHi); rect(c, 10, 6, 1, 2, P.kimchiHi);
    /* the clear wall catching the light */
    c.fillStyle = 'rgba(255,255,255,0.55)'; c.fillRect(2, 5, 1, 8);
    c.fillStyle = 'rgba(255,255,255,0.35)'; c.fillRect(3, 4, 6, 1);
    /* the label */
    rect(c, 4, 6, 7, 5, P.labelWhite);
    rect(c, 5, 7, 5, 1, P.kimchi);
    rect(c, 5, 8, 3, 1, P.kimchiDeep);
    rect(c, 4, 10, 7, 1, P.labelGreen);
    /* frost */
    dot(c, 2, 4, P.rime); dot(c, 12, 4, P.frost); dot(c, 11, 14, P.frost);
    return ringUnder(t);
  }

  /* THE LIME JUICE (sour): a plain squeeze bottle of it, as it stands in
     a fridge door - a flip cap, a short neck, round shoulders, a straight
     body, the green label with a lime slice on it, the cloudy juice
     showing through above and below the label - frozen: rime on the cap
     and the shoulders, crystals at the foot. 12 x 20 with the ring. The
     first one was a lime-shaped squeeze bottle, and on the screen it read
     as a teardrop (a "witch's vial", the owner's word, 2026-11-01). */
  var LIME_BOTTLE = [
    '...cCCd...',
    '...CrCd...',
    '...dddd...',
    '...nrnn...',
    '..hjjjjs..',
    '.hjrjjrjs.',
    'hhjjjjjjss',
    'hjjjjjjjsD',
    'lLLLLLLLLK',
    'lLLwwwLLLK',
    'lLwyyywLLK',
    'lLwypywLwK',
    'lLwyyywLLK',
    'lLLwwwLLLK',
    'lLLLLLLLLK',
    'hhjjjjjjsD',
    'hjjjrjjssD',
    '.sDDDDDDD.'
  ];
  function bakeLime() {
    var t = makeCanvas(12, 20), c = t.ctx;
    paintGrid(c, LIME_BOTTLE, 1, 1, {
      c: P.limeCapLit, C: P.limeCap, d: P.limeCapDeep, r: P.rime,
      n: P.juiceHi, h: P.juiceHi, j: P.juice, s: P.juiceShade, D: P.juiceDeep,
      l: P.limeLit, L: P.limeGreen, K: P.limeDeep,
      w: P.limeRind, y: P.limeFlesh, p: P.limePith
    });
    /* the frost: a crust along the cap's top, crystals round the foot */
    dot(c, 4, 1, P.frost); dot(c, 6, 1, P.iceHi);
    crystals(c, 2, 16, 8, 2, 4, 9301);
    return ringUnder(t);
  }

  /* THE ICE CREAM (the boon): ONE SCOOP, bare, sitting on the shelf's
     front edge - no cup, no bowl (the owner's word, 2026-11-01; the first
     one stood in a clear dessert cup) - in one of four colours, so a
     scoop is a scoop of SOMETHING: strawberry, mint chip, chocolate and
     vanilla bean. Its shape is a scoop's: a round dome, the crease where
     the scoop's edge curled, the ragged lip under it, the flat foot it
     sits on. A few flecks of its flavour in it and frost on its crown.
     20 x 15 with the ring. */
  var SCOOPS = [
    { base: '#f2a3b6', lit: '#fbd2dc', shade: '#d67b93', deep: '#b05872', fleck: '#c23a52' },  /* strawberry */
    { base: '#bfe7cf', lit: '#e4f7eb', shade: '#92ccaf', deep: '#68a587', fleck: '#4a2c1c' },  /* mint chip */
    { base: '#8d5c3d', lit: '#ad7b52', shade: '#6c432a', deep: '#4d2e1b', fleck: '#36200f' },  /* chocolate */
    { base: '#f6eed4', lit: '#fffbec', shade: '#ded0ab', deep: '#bcab83', fleck: '#7a6248' }   /* vanilla bean */
  ];
  var SCOOP_DOME = [[6, 6], [4, 10], [3, 12], [2, 14], [1, 16], [1, 16], [1, 16], [1, 16], [1, 16], [2, 14]];
  /* the lip: a pixel proud of the dome either side, scalloped */
  var SCOOP_LIP = ['.oooooooooooooooo.', 'oooooooooooooooooo', '.oo.oooooooooo.oo.'];
  function bakeScoop(F, seed) {
    var t = makeCanvas(20, 15), c = t.ctx, i, o, w;
    /* the dome, lit from the upper left, rolling into shade at the right
       and darker toward its foot */
    for (i = 0; i < SCOOP_DOME.length; i++) {
      o = 1 + SCOOP_DOME[i][0]; w = SCOOP_DOME[i][1];
      rect(c, o, 1 + i, w, 1, i < 7 ? F.base : mix(F.base, F.shade, 0.5));
      rect(c, o + w - 3, 1 + i, 3, 1, F.shade);
      if (i >= 1 && i <= 5) rect(c, o + 1, 1 + i, Math.max(1, Math.round(w * 0.3) - i % 2), 1, F.lit);
    }
    dot(c, 7, 1, F.lit); dot(c, 8, 1, '#ffffff');
    /* the crease under the dome, then the lip, lit along its top */
    rect(c, 3, 10, 14, 1, F.deep);
    paintGrid(c, SCOOP_LIP, 1, 11, { o: F.base });
    rect(c, 2, 11, 12, 1, F.lit);
    rect(c, 15, 11, 3, 1, F.shade);
    rect(c, 2, 13, 2, 1, F.shade); rect(c, 5, 13, 10, 1, F.shade); rect(c, 16, 13, 2, 1, F.deep);
    /* the scoop's own texture: little pits and its flavour's flecks */
    for (i = 0; i < 9; i++) {
      var hh = hash(seed + i * 131);
      var fx = 4 + hh % 12, fy = 2 + (hh >>> 7) % 8;
      dot(c, fx, fy, i < 5 ? F.fleck : F.shade);
    }
    /* frost on the crown */
    dot(c, 9, 1, P.frost); dot(c, 6, 2, P.rime); dot(c, 12, 2, P.frost); dot(c, 14, 4, P.frostDeep);
    return ringUnder(t);
  }

  /* THE FROZEN PATTY (+5): beef, iced, tumbling through four frames -
     flat, tilted, edge on, tilted back. It stays the colour of beef (it
     is beef); the gold glow round it is what says five points. */
  var PATTY_FLAT = [[3, 8], [1, 12], [0, 14], [1, 12], [3, 8]];
  var PATTY_TILT = [[5, 6], [2, 11], [0, 14], [0, 14], [1, 13], [3, 9]];
  var PATTY_EDGE = [[1, 12], [0, 14], [1, 12]];
  function bakePatty(rows, flip) {
    var t = makeCanvas(16, 10), c = t.ctx, i;
    var y0 = Math.round((10 - rows.length) / 2);
    rowsFill(c, rows, 1, y0, P.beef);
    for (i = 0; i < rows.length; i++) {
      var o = 1 + rows[i][0], w = rows[i][1];
      if (i === 0) rect(c, o, y0, w, 1, P.frost);                 /* the rime on top */
      else if (i === 1) rect(c, o, y0 + 1, Math.round(w * 0.5), 1, P.beefLit);
      rect(c, o + w - 2, y0 + i, 2, 1, P.beefDeep);
      if (i === rows.length - 1) rect(c, o, y0 + i, w, 1, P.beefDeep);
    }
    if (rows.length > 3) {
      dot(c, 5, y0 + 2, P.fat); dot(c, 9, y0 + 1, P.fat); dot(c, 11, y0 + 3, P.fat);
      dot(c, 7, y0 + 2, P.iceHi);
    } else {
      dot(c, 4, y0 + 1, P.fat); dot(c, 10, y0 + 1, P.fat);
    }
    ringUnder(t);
    return flip ? flipped(t) : t;
  }

  /* ======================================================== LITTER

     On the trim's chamfer, never boxed: a patch of rime, a drip of melt
     with its bead, a loose green grape from the crisper (ref 2/3), and a
     torn corner of foil. */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 1, i, h;
    if (ob.kind === 0) {
      for (i = 0; i < 7; i++) {
        h = hash(ob.seed + i * 977);
        dot(ctx, x + h % 9, y + (h >>> 9) % 3, i < 5 ? P.rime : P.ice);
      }
    } else if (ob.kind === 1) {
      rect(ctx, x + 4, y + 3, 1, 3, P.trimDeep);
      dot(ctx, x + 4, y + 6, P.iceHi);
      dot(ctx, x + 3, y + 2, P.frost);
    } else if (ob.kind === 2) {
      rect(ctx, x + 1, y + 2, 4, 1, P.outline);
      rect(ctx, x, y, 3, 2, P.grape); rect(ctx, x + 3, y, 1, 2, P.grape);
      rect(ctx, x, y + 2, 4, 1, P.grapeDeep);
      dot(ctx, x + 1, y, P.grapeHi);
    } else {
      rect(ctx, x, y + 1, 5, 1, P.foilLit);
      rect(ctx, x + 1, y + 2, 4, 1, P.foilShade);
      dot(ctx, x + 5, y + 2, P.foil);
    }
  }

  /* ======================================================== THE MIST

     Its clock lives in run.ledger.mist, is stepped in stepWorld and
     drawn in drawOverlay, and every piece of it is a baked alpha sheet
     in P.mist, clipped to rows 24..241 so the lid and the trim, the two
     kill edges, stay crisp - and every falling thing's spot, which is
     drawn on the trim, stays readable however thick it gets.

     TWO PARTS.
     THE HAZE, there from the first frame: 0.12 under the roof to 0.22
       along the shelf, because cold air sinks. The Bar's fog is 0.80 to
       0.90; this is the fridge's breath, not a humidifier's.
     THE BANKS, from score 8: a 1300 x 218 lumpy sheet - 0.43 everywhere
       and ten soft cores to 0.70, its first and last 150px eased in and
       out - born with its left edge at the right of the screen and
       crossing the room at 0.80 of its speed plus 30 px/s (cold air in
       the middle of the compartment, pushed along by the fan). A bank is
       announced by the whirr of the fan and by the vent breathing out,
       and the next one comes 5.5..9.5s after the last one leaves. The
       brief's bank (760px, 0.30..0.62) was measured at 11% of late play
       over 0.45 - a bank that wide is never over the whole screen for
       long - and this one at 30..32%, the Bar's own share (34..36%) at
       two thirds of its thickness.
     The whole fog goes down at `drain`, which the cold snap's tell pulls
     down to an eighth over its first second as the cold air runs in to
     the player, and which fills back up over 0.6s after.

     THE NUMBERS are measured off the overlay drawn alone on a clear
     canvas: see the header of THE COLD SNAP and the report. */
  var BANK_SCORE = 8, FIRST_BANK = 3.0;
  var BANK_W = 1300, BANK_SOFT = 150, BANK_PAR = 0.80, BANK_DRIFT = 30;
  var BANK_IDLE_MIN = 5.5, BANK_IDLE_MAX = 9.5;
  var HAZE_TOP = 0.12, HAZE_BOT = 0.22, BANK_CORES = 10;
  var BANK_BASE = 0.43, BANK_PEAK = 0.70;
  var DRAIN = 0.88, DRAIN_T = 1.0, DRAIN_BACK = 0.6;
  var PLUME_A = 0.6;
  var BREATH_EVERY = 1.4;

  function freshMist() {
    return { armed: false, next: 0, banks: [], drain: 1, puffs: [], specks: [], breath: BREATH_EVERY };
  }

  function bakeHaze(top, bot) {
    return alphaSheet(VW, FLOOR - CEIL, P.mist, function (x, y) {
      return top + (bot - top) * ease(y / (FLOOR - CEIL - 1));
    });
  }

  /* THE BANK: the base, six cores laid over it (each combines as another
     layer of mist, never added past one), the roll-in and roll-out */
  function bakeBank() {
    var B = [], i, H = FLOOR - CEIL;
    for (i = 0; i < BANK_CORES; i++) {
      var h = hash(6101 + i * 7919);
      B.push([BANK_SOFT + 30 + (i + 0.5) * (BANK_W - 2 * BANK_SOFT - 60) / BANK_CORES + ((h % 41) - 20),
              30 + (h >>> 7) % (H - 60), 70 + (h >>> 15) % 41]);
    }
    var core = (BANK_PEAK - BANK_BASE) / (1 - BANK_BASE);
    return alphaSheet(BANK_W, H, P.mist, function (x, y) {
      var keep = 1 - BANK_BASE, j;
      for (j = 0; j < B.length; j++) {
        var dx = x + 0.5 - B[j][0], dy = (y + 0.5 - B[j][1]) * 1.4;
        var d = Math.sqrt(dx * dx + dy * dy) / B[j][2];
        if (d < 1) keep *= 1 - core * (1 - ease(d));
      }
      var a = 1 - keep;
      var edge = Math.min(ease((x + 0.5) / BANK_SOFT), ease((BANK_W - x - 0.5) / BANK_SOFT));
      return a * edge;
    });
  }

  /* the soft discs every puff is drawn with, diameters 8..112 by 4 (the
     Bar's), and the snap's cold discs, 40..168 by 8, in frost */
  function bakeDiscs(hex, d0, d1, step) {
    var out = [], D;
    for (D = d0; D <= d1; D += step) {
      (function (D) {
        out.push(alphaSheet(D, D, hex, function (x, y) {
          var dx = (x + 0.5 - D / 2) / (D / 2), dy = (y + 0.5 - D / 2) / (D / 2);
          var d = Math.sqrt(dx * dx + dy * dy);
          return d < 1 ? 1 - ease(d) : 0;
        }));
      })(D);
    }
    return out;
  }
  /* the cold's bright front: an annulus, brightest at 0.8 of the radius */
  function bakeRims(hex, d0, d1, step) {
    var out = [], D;
    for (D = d0; D <= d1; D += step) {
      (function (D) {
        out.push(alphaSheet(D, D, hex, function (x, y) {
          var dx = (x + 0.5 - D / 2) / (D / 2), dy = (y + 0.5 - D / 2) / (D / 2);
          var d = Math.sqrt(dx * dx + dy * dy), k = Math.abs(d - 0.8) / 0.2;
          return k < 1 ? 1 - ease(k) : 0;
        }));
      })(D);
    }
    return out;
  }
  function discFor(r) { return T.disc[clamp(Math.round((r * 2 - 8) / 4), 0, T.disc.length - 1)]; }
  function coldFor(d, set) { return set[clamp(Math.round((d - 40) / 8), 0, set.length - 1)]; }

  /* the bank's thickness at every pixel, kept as bytes, for the snap's
     rule that it never starts inside one of a bank's thick cores */
  function bankAlpha(bank) {
    var d = bank.ctx.getImageData(0, 0, bank.w, bank.h).data, out = new Uint8Array(bank.w * bank.h);
    for (var i = 0; i < out.length; i++) out[i] = d[i * 4 + 3];
    return out;
  }
  function bankAt(m, px, py) {
    if (!m || !m.banks.length) return 0;
    var b = m.banks[0], k = Math.round(px - b.x), j = Math.round(py - CEIL);
    if (k < 0 || k >= BANK_W || j < 0 || j >= FLOOR - CEIL) return 0;
    return T.bankA[j * BANK_W + k] / 255;
  }

  /* the fog for this frame: the haze and any bank, into one sheet */
  function paintFog(m) {
    var b = T.fogBuf, c = b.ctx, i;
    c.clearRect(0, 0, b.w, b.h);
    c.drawImage(T.haze.canvas, 0, 0);
    for (i = 0; m && i < m.banks.length; i++) c.drawImage(T.bank.canvas, Math.round(m.banks[i].x), 0);
  }

  /* ===================================================== THE COLD SNAP

     Its clock lives in run.ledger.snap and is stepped in stepWorld; the
     room's part of it is drawn in drawOverlay (under the doodad), the
     fridge's readout in drawFront (over the ice, under the HUD).

     ONE CYCLE, from the late score:
       IDLE   the rest - 16..22s after a thaw (the owner's "occasionally"),
              8..12 after a fizzle, 3..5 after a cancel; the first snap is
              due 4.5s after the late banner goes up
       TELL   1.5s. The chill sounds, the readout counts 37 down to 0, the
              fog drains to a quarter as the cold air runs in, the lane
              goes blue, a disc of frost closes on the doodad and twenty
              sparks of ice spiral down onto him from 86px to 14px
       then, in this order: HOT - the heat FIZZLES it (a hiss, a burst of
              steam, the sparks thrown out, the readout jumping back up in
              orange); GRACE or ALREADY FROZEN - it is called off quietly;
              otherwise ledger.freeze, and the engine's ice takes him
       FROZEN three pillars (the engine's tune.iceFor): the readout warms
              a step at each crack, 0, 12, 24
       THAW   the engine's shatter: the readout eases back to 37

     A TELL MAY ONLY START when he is free, outside a save's grace, not
     inside one of a bank's thick cores (the bank where he is under 0.60:
     tested on the bank's mean down his column instead, 0.45 held a tell
     through the whole of every bank and 0.55 through none of it), and
     when the ice will land just after he has cleared a stack (THE
     LANDING, clearAfter); it waits otherwise and the wait is counted by
     reason. While it runs,
     and for the first second of the ice, the sky is held quiet
     (ledger.holdDrops), so the first heavy flaps are made under a clear
     roof.

     WHY IT IS FAIR: a second and a half of warning in sound, in the
     room, in the readout and round the doodad himself, before a weight
     that cannot kill on its own; never in a thick bank; the sky held
     still for the first heavy second; three pillars of it and then at
     least sixteen seconds free; and the kimchi is the counter. */
  var T_TELL = 1.5, FIRST_SNAP = 4.5;
  var REST_MIN = 16, REST_MAX = 22;
  var FIZZLE_MIN = 8, FIZZLE_MAX = 12;
  var CANCEL_MIN = 3, CANCEL_MAX = 5;
  var HOLD_AFTER_FREEZE = 1.0, BANK_HOLD = 1.5, BANK_BLOCK = 0.60;
  var LAND_LO = 0.0, LAND_HI = 0.3;
  var REFUSE_T = 0.08, T_THAW = 0.6;
  var SPARKS = 20, SPARK_R0 = 86, SPARK_R1 = 14, SPARK_SPIN = 7.5;
  var COLD_D0 = 160, COLD_D1 = 44, COLD_A = 0.50, RIM_A = 0.75, TINT_MAX = 0.25;
  var READ_IDLE = 37, RA_IDLE = 0.55;

  /* the running count, read-only, for the headless checks: reset when
     a fresh ledger is seen (a new run or a RETRY) */
  var tally = {};
  function resetTally() {
    tally.tells = 0; tally.freezes = 0; tally.fizzles = 0; tally.cancels = 0; tally.refused = 0;
    tally.thaws = 0; tally.heldBank = 0; tally.heldGrace = 0; tally.heldFrozen = 0; tally.heldGate = 0;
    tally.waitSum = 0; tally.waitN = 0; tally.bankHeld = 0; tally.banks = 0;
    tally.lateT = 0; tally.frozenT = 0; tally.tellWhileFrozen = 0; tally.sinceThawMin = 1e9;
  }
  resetTally();

  function freshSnap() {
    return { phase: 'off', t: 0, next: 0, k: 0, seen: false, wait: 0, sinceThaw: 1e9,
             read: READ_IDLE, ra: RA_IDLE, hotT: 0, readFrom: READ_IDLE,
             post: '', pt: 0, cold: 0, seed: randInt(1, 100000) };
  }

  /* THE LANDING: the ice should take him in open air, just after he has
     cleared a stack, so the first heavy flaps are made with a whole
     pillar's interval in front of him and not in the mouth of a gap. A
     tell is 1.5s; it may start when some stack's far edge (and his own
     radius) will be 0.0 to 0.3s behind him as it ends - at the room's
     speed now, which is the speed it will be. A stack comes past every
     1.0 to 1.9s, so this waits half a second on the average. */
  function clearAfter(obstacles, run) {
    var sp = run.speed || 0, i, ob;
    if (sp <= 0) return true;
    for (i = 0; i < obstacles.length; i++) {
      ob = obstacles[i];
      if (ob.type !== 'pillar') continue;
      var behind = T_TELL - (ob.x + 38 + (run.hr || 11) - run.px) / sp;
      if (behind >= LAND_LO && behind <= LAND_HI) return true;
    }
    return false;
  }

  function startTell(L, S) {
    S.phase = 'tell'; S.t = 0; S.k = 0; S.post = ''; S.pt = 0;
    L.cry = 'chill';
    tally.tells++;
    tally.waitSum += S.wait; tally.waitN++; S.wait = 0;
    if (S.sinceThaw < tally.sinceThawMin) tally.sinceThawMin = S.sinceThaw;
  }

  function cancelSnap(S) {
    S.phase = 'idle'; S.t = 0;
    S.post = 'cancel'; S.pt = 0; S.readFrom = S.read;
    S.next = rand(CANCEL_MIN, CANCEL_MAX);
    tally.cancels++;
  }

  function stepSnap(dt, obstacles, run, L, S, m) {
    if (S.phase === 'off') {
      L.holdDrops = false;
      if (!run.late) return;
      S.phase = 'idle'; S.next = FIRST_SNAP; S.t = 0;
    }
    tally.lateT += dt;
    if (run.frozen > 0) tally.frozenT += dt;
    S.t += dt;
    S.sinceThaw += dt;
    if (S.post) S.pt += dt;
    if (S.hotT > 0) S.hotT -= dt;

    if (S.phase === 'idle') {
      S.next -= dt;
      if (S.next <= 0) {
        var why = run.frozen > 0 ? 'heldFrozen' : (run.grace ? 'heldGrace'
                : (bankAt(m, run.px, run.py) > BANK_BLOCK ? 'heldBank'
                : (!clearAfter(obstacles, run) ? 'heldGate' : '')));
        if (why) { tally[why] += dt; S.wait += dt; }
        else startTell(L, S);
      }
    }
    if (S.phase === 'tell') {
      S.k = ease(S.t / T_TELL);
      if (run.frozen > 0) tally.tellWhileFrozen++;
      if (S.t >= T_TELL) {
        S.k = 1;
        if (run.hot) {
          /* THE FIZZLE: the heat kept the cold off, and says so */
          S.phase = 'idle'; S.t = 0; S.next = rand(FIZZLE_MIN, FIZZLE_MAX);
          S.post = 'fizzle'; S.pt = 0; S.hotT = 0.3;
          L.cry = 'hiss';
          tally.fizzles++;
          for (var i = 0; i < 14; i++) {
            m.puffs.push({ x: run.px + rand(-6, 6), y: run.py + rand(-6, 6), vx: rand(-30, 30) + run.speed * 0.6,
                           vy: rand(-60, -30), age: -i * 0.02, life: 0.9, r0: 6, r1: 26, a0: 0.95, carry: 1 });
          }
        } else if (run.grace || run.frozen > 0) {
          cancelSnap(S);
        } else {
          L.freeze = true;
          S.phase = 'frozen'; S.t = 0; S.seen = false;
          S.post = 'freeze'; S.pt = 0;
        }
      }
    } else if (S.phase === 'frozen') {
      if (!S.seen) {
        if (run.frozen > 0) { S.seen = true; tally.freezes++; }
        else if (S.t > REFUSE_T) { tally.refused++; cancelSnap(S); }
      } else if (run.frozen === 0) {
        /* the shatter - earned, or a save or a death broke it */
        S.phase = 'thaw'; S.t = 0; S.sinceThaw = 0;
        S.next = rand(REST_MIN, REST_MAX);
        tally.thaws++;
      }
    } else if (S.phase === 'thaw') {
      if (S.t >= T_THAW) { S.phase = 'idle'; S.t = 0; }
    }

    /* the sky held quiet through the tell and the first heavy second */
    L.holdDrops = S.phase === 'tell' || (S.phase === 'frozen' && S.t < HOLD_AFTER_FREEZE);

    /* THE READOUT, as a number and how bright */
    if (S.phase === 'tell') { S.read = Math.round(READ_IDLE * (1 - S.k)); S.ra = 1; }
    else if (S.phase === 'frozen') {
      S.read = S.seen ? [0, 12, 24][clamp(3 - run.frozen, 0, 2)] : 0; S.ra = 1;
    } else if (S.phase === 'thaw') { S.read = Math.round(lerp(24, READ_IDLE, ease(S.t / T_THAW))); S.ra = 1; }
    else if (S.post === 'fizzle' && S.pt < 0.5) { S.read = Math.round(lerp(18, READ_IDLE, ease(S.pt / 0.5))); S.ra = 1; }
    else if (S.post === 'cancel' && S.pt < 0.5) { S.read = Math.round(lerp(S.readFrom, READ_IDLE, ease(S.pt / 0.5))); S.ra = 1; }
    else { S.read = READ_IDLE; S.ra = Math.max(RA_IDLE, S.ra - dt / 0.5); }

    /* how cold the room looks: the tell's k, and a 0.6s fade after it */
    if (S.phase === 'tell') S.cold = S.k;
    else S.cold = Math.max(0, S.cold - dt / 0.6);

    /* frost crystals coming off him while he is iced, two a second */
    if (run.frozen > 0 && hash(Math.floor(tally.frozenT * 2) + S.seed) % 2 === 0 &&
        Math.floor(tally.frozenT * 2) !== Math.floor((tally.frozenT - dt) * 2)) {
      m.specks.push({ x: run.px + rand(-10, 10), y: run.py + rand(-6, 8), vy: 20, age: 0, life: 0.6 });
    }
  }

  function stepMist(dt, run, L, m, S) {
    var speed = run.speed || 0, i, p;
    if (!m.armed && run.score >= BANK_SCORE) {
      m.armed = true; m.next = FIRST_BANK;
      L.warn = 'mist';
    }
    /* THE DRAIN: the cold air running in to him through the tell, and
       the room filling back up after it */
    if (S.phase === 'tell') m.drain = 1 - DRAIN * ease(S.t / DRAIN_T);
    else m.drain = Math.min(1, m.drain + DRAIN * dt / DRAIN_BACK);

    for (i = m.banks.length - 1; i >= 0; i--) {
      var b = m.banks[i];
      b.x -= (speed * BANK_PAR + BANK_DRIFT) * dt;
      if (b.x + BANK_W < 0) {
        m.banks.splice(i, 1);
        m.next = rand(BANK_IDLE_MIN, BANK_IDLE_MAX);
      }
    }
    if (m.armed && !m.banks.length) {
      m.next -= dt;
      if (m.next <= 0) {
        /* not while the cold is closing in, nor in the ice's first
           second and a half: one thing at a time */
        if (S.phase === 'tell' || (S.phase === 'frozen' && S.t < BANK_HOLD)) tally.bankHeld += dt;
        else {
          m.banks.push({ x: VW });
          tally.banks++;
          if (!L.cry) L.cry = 'whirr';
          /* THE VENT BREATHES: three puffs out of every vent on the
             screen, falling - cold air sinks - and carried with it */
          var vx = firstVent(run.scroll || 0);
          for (; vx < VW + 20; vx += COMP_W * VENT_S) {
            for (var k = 0; k < 3; k++) {
              m.puffs.push({ x: vx + VENT_W / 2 + rand(-3, 3), y: ventRow() + VENT_H - 2,
                             vx: -20, vy: 18, age: -k * 0.27, life: 1.2, r0: 4, r1: 18, a0: 0.5,
                             carry: VENT_S });
            }
          }
        }
      }
    }

    /* BREATH: a little puff ahead of him every 1.4s while he is free */
    if (run.frozen > 0) m.breath = BREATH_EVERY;
    else {
      m.breath -= dt;
      if (m.breath <= 0) {
        m.breath += BREATH_EVERY;
        m.puffs.push({ x: run.px + 14, y: run.py - 2, vx: -30, vy: -12, age: 0, life: 0.6,
                       r0: 3, r1: 9, a0: 0.35, carry: 1 });
      }
    }

    for (i = m.puffs.length - 1; i >= 0; i--) {
      p = m.puffs[i];
      p.age += dt;
      if (p.age < 0) continue;
      p.x += (p.vx - speed * p.carry) * dt;
      p.y += p.vy * dt;
      if (p.age >= p.life) m.puffs.splice(i, 1);
    }
    for (i = m.specks.length - 1; i >= 0; i--) {
      p = m.specks[i];
      p.age += dt;
      p.x -= speed * dt;
      p.y += p.vy * dt;
      if (p.age >= p.life) m.specks.splice(i, 1);
    }
  }

  /* THE ROOM'S OWN STEP: the mist and the snap, once a frame */
  function stepWorld(dt, obstacles, run) {
    var L = run.ledger;
    if (!L) return;
    if (!L.mist) { L.mist = freshMist(); resetTally(); }
    if (!L.snap) L.snap = freshSnap();
    stepSnap(dt, obstacles, run, L, L.snap, L.mist);
    stepMist(dt, run, L, L.mist, L.snap);
  }

  /* THE OVERLAY, the last thing on the room layer, under the doodad.
     CLIPPED TO THE LANE: the fog, the cold and the frost all live inside
     rows 24..241. It draws off the ledger and nothing else, so on a frame
     nobody steps - GET READY, pause, the results - it holds still. */
  function drawOverlay(ctx, obstacles, run) {
    var L = run && run.ledger, m = L ? L.mist : null, S = L ? L.snap : null;
    var a0 = ctx.globalAlpha, i, p, d, k;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, CEIL, VW, FLOOR - CEIL); ctx.clip();

    /* THE FOG */
    var drain = m ? m.drain : 1;
    if (drain > 0.004) {
      if (!m || !m.banks.length) {
        ctx.globalAlpha = a0 * drain;
        ctx.drawImage(T.haze.canvas, 0, CEIL);
      } else {
        paintFog(m);
        ctx.globalAlpha = a0 * drain;
        ctx.drawImage(T.fogBuf.canvas, 0, CEIL);
      }
      ctx.globalAlpha = a0;
    }

    /* THE COLD over the lane: a flat blue, up to a quarter */
    if (S && S.cold > 0.004) {
      ctx.globalAlpha = a0 * TINT_MAX * S.cold;
      ctx.fillStyle = P.coldTint;
      ctx.fillRect(0, CEIL, VW, FLOOR - CEIL);
      ctx.globalAlpha = a0;
    }

    /* THE PUFFS - the vent, the breath, the steam - into a sheet of their
       own and down at 0.6, so a pile of them never stacks to white */
    if (m && m.puffs.length) {
      var pb = T.plumeBuf, pc = pb.ctx, any = false;
      pc.clearRect(0, 0, pb.w, pb.h);
      for (i = 0; i < m.puffs.length; i++) {
        p = m.puffs[i];
        if (p.age < 0) continue;
        k = p.age / p.life;
        d = discFor(p.r0 + (p.r1 - p.r0) * ease(k));
        pc.globalAlpha = p.a0 * (1 - k);
        pc.drawImage(d.canvas, Math.round(p.x - d.w / 2), Math.round(p.y - CEIL - d.h / 2));
        any = true;
      }
      pc.globalAlpha = 1;
      if (any) {
        ctx.globalAlpha = a0 * PLUME_A;
        ctx.drawImage(pb.canvas, 0, CEIL);
        ctx.globalAlpha = a0;
      }
    }
    if (m) {
      for (i = 0; i < m.specks.length; i++) {
        p = m.specks[i];
        dot(ctx, Math.round(p.x), Math.round(p.y), p.age < 0.3 ? P.iceHi : P.ice);
      }
    }

    /* THE COLD CLOSING IN: the disc and the ring of sparks, round him */
    if (S && run) drawCold(ctx, S, run.px, run.py, a0);

    ctx.restore();
    ctx.globalAlpha = a0;
  }

  function drawCold(ctx, S, px, py, a0) {
    var discA = 0, discD = 0, sparkA = 0, sparkR = 0, tt = 0, out = 0;
    if (S.phase === 'tell') {
      discD = lerp(COLD_D0, COLD_D1, S.k); discA = S.k;
      sparkA = clamp(S.t / 0.2, 0, 1); sparkR = lerp(SPARK_R0, SPARK_R1, S.k); tt = S.t;
    } else if (S.post === 'freeze' && S.pt < 0.15) {
      discD = COLD_D1 * (1 - S.pt / 0.15); discA = 1;
    } else if (S.post === 'fizzle' && S.pt < 0.4) {
      if (S.pt < 0.15) { discD = COLD_D1 * (1 - S.pt / 0.15); discA = 1; }
      sparkA = 1 - S.pt / 0.4; sparkR = SPARK_R1 + 160 * S.pt; tt = T_TELL + S.pt; out = 1;
    } else if (S.post === 'cancel' && S.pt < 0.3) {
      discD = COLD_D1; discA = 1 - S.pt / 0.3;
      sparkA = 1 - S.pt / 0.3; sparkR = SPARK_R1 + 20 * S.pt; tt = T_TELL + S.pt;
    }
    if (discA > 0.004 && discD >= 8) {
      /* THE COLD CLOSING IN: a blue body of cold air round him with a
         bright front of frost at its edge, shrinking onto him */
      var cd = coldFor(discD, T.coldDisc), cr = coldFor(discD, T.coldRim);
      ctx.globalAlpha = a0 * COLD_A * discA;
      ctx.drawImage(cd.canvas, Math.round(px - cd.w / 2), Math.round(py - cd.h / 2));
      ctx.globalAlpha = a0 * RIM_A * discA;
      ctx.drawImage(cr.canvas, Math.round(px - cr.w / 2), Math.round(py - cr.h / 2));
      ctx.globalAlpha = a0;
    }
    if (sparkA > 0.004) {
      /* TWENTY SPARKS spiralling in: each a cross of ice with a dark
         blue edge, so it reads on a white room as well as a grey one,
         and two fading pixels of trail behind it along the spiral */
      var spin = SPARK_SPIN * (out ? 0.3 : 1);
      for (var i = 0; i < SPARKS; i++) {
        var th0 = i * TAU / SPARKS + 0.31 * (hash(S.seed + i * 31) % 100) / 100;
        for (var j = 2; j >= 0; j--) {
          var tj = tt - j * 0.035, th = th0 + spin * tj;
          var rr = S.phase === 'tell' ? lerp(SPARK_R0, SPARK_R1, ease(clamp(tj / T_TELL, 0, 1)))
                                      : sparkR - j * (out ? 6 : 0);
          rr += 4 * Math.sin(5 * tj + i);
          var x = Math.round(px + Math.cos(th) * rr), y = Math.round(py + Math.sin(th) * rr);
          if (j > 0) {
            ctx.globalAlpha = a0 * sparkA * (j === 1 ? 0.55 : 0.28);
            dot(ctx, x, y, P.ice);
            continue;
          }
          ctx.globalAlpha = a0 * sparkA;
          rect(ctx, x - 2, y - 1, 5, 3, P.sparkEdge);
          rect(ctx, x - 1, y - 2, 3, 5, P.sparkEdge);
          rect(ctx, x - 1, y, 3, 1, P.ice);
          rect(ctx, x, y - 1, 1, 3, P.ice);
          dot(ctx, x, y, P.iceHi);
        }
      }
      ctx.globalAlpha = a0;
    }
  }

  /* THE READOUT, the fridge's own temperature display, on the FRONT
     layer in the top right corner - the TV's channel number's place,
     which is clear of every piece of the HUD: the pause button ends at
     row 38, the score and the line under it are centred, the gauges are
     centred on rows 80..110 and the pads are at the bottom. Quiet at
     37F all run (the lesson); bright while it falls, while he is iced
     and while it warms; orange for a moment when the heat beats it. The
     font has no degree sign, so the ring is drawn: a 3 x 3 hollow square
     at the font's scale, raised, between the number and the F. */
  var READ_X = 466, READ_Y = 44;
  function drawFront(ctx, run, state) {
    if (state !== 'play' && state !== 'paused') return;
    var S = run && run.ledger ? run.ledger.snap : null;
    var val = S ? S.read : READ_IDLE, a = S ? S.ra : RA_IDLE;
    var col = S && S.hotT > 0 ? P.readoutHot : P.readout;
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * a;
    var o = { scale: 2, colour: col, shadow: P.readoutShadow, align: 'right' };
    Font.draw(ctx, 'F', READ_X, READ_Y, o);
    var rx = READ_X - Font.measure('F', 2) - 8;
    /* the ring's shadow, then the ring */
    rect(ctx, rx + 2, READ_Y + 2, 6, 2, P.readoutShadow); rect(ctx, rx + 2, READ_Y + 6, 6, 2, P.readoutShadow);
    rect(ctx, rx + 2, READ_Y + 2, 2, 6, P.readoutShadow); rect(ctx, rx + 6, READ_Y + 2, 2, 6, P.readoutShadow);
    rect(ctx, rx, READ_Y, 6, 2, col); rect(ctx, rx, READ_Y + 4, 6, 2, col);
    rect(ctx, rx, READ_Y, 2, 6, col); rect(ctx, rx + 4, READ_Y, 2, 6, col);
    Font.draw(ctx, String(val), rx - 2, READ_Y, o);
    ctx.globalAlpha = ga;
  }

  /* ========================================================= BUILD */

  function build() {
    T.lid = bakeLid();
    T.roof = bakeRoof();
    T.ledPool = bakeLedPool();
    T.vent = bakeVent();
    T.ventShade = bakeVentShade();
    T.wall = bakeWall();
    T.boxes = bakeBoxes();
    T.glass = bakeGlass();
    T.trim = bakeTrim();
    T.light = bakeLight();

    var s0 = bakeStack(0), s1 = bakeStack(1), s2 = bakeStack(2);
    T.stack = [s0, s1, s2];
    T.stackUp = [flipped(s0), flipped(s1), flipped(s2)];
    var ca = bakeCapFoil(), cb = bakeCapBlue();
    T.capUp = [ca, cb];
    T.capDown = [flipped(ca), flipped(cb)];

    T.egg = bakeEgg();
    T.kimchi = bakeKimchi();
    T.lime = bakeLime();
    T.scoops = SCOOPS.map(function (F, k) { return bakeScoop(F, 5100 + k * 37); });
    T.iceCream = T.scoops[0];                 /* the one the stands' shelf shows */
    var tilt = bakePatty(PATTY_TILT, false);
    T.patty = [bakePatty(PATTY_FLAT, false), tilt, bakePatty(PATTY_EDGE, false), flipped(tilt)];

    T.haze = bakeHaze(HAZE_TOP, HAZE_BOT);
    T.menuHaze = bakeHaze(0.14, 0.14);
    T.bank = bakeBank();
    T.bankA = bankAlpha(T.bank);
    T.disc = bakeDiscs(P.mist, 8, 112, 4);
    T.coldDisc = bakeDiscs(P.coldTint, 40, 168, 8);
    T.coldRim = bakeRims(P.iceHi, 40, 168, 8);
    T.fogBuf = makeCanvas(VW, FLOOR - CEIL);
    T.plumeBuf = makeCanvas(VW, FLOOR - CEIL);
  }

  /* ======================================================= DRAWING */

  function ventRow() { return Math.round(roofRow(sAt(VENT_D - 2))); }
  /* the first vent copy whose left edge is at or right of x -VENT_W */
  function firstVent(scroll) {
    var per = COMP_W * VENT_S, x = 240 + VENT_S * (VENT_X - scroll - 240) - VENT_W / 2;
    return -VENT_W + wrap(x + VENT_W, per);
  }

  /* THE ROOF'S MOVING THINGS: the LED's pool, the ribs, the LED panel */
  function drawRoof(ctx, scroll) {
    var i, r, U, k;
    ctx.drawImage(T.roof.canvas, 0, CEIL);
    /* the light pool, under everything else on the roof */
    var per = COMP_W * LED_S;
    var lx = -T.ledPool.w + wrap(240 + LED_S * (LED_X - scroll - 240) + T.ledPool.w / 2, per);
    for (; lx < VW + T.ledPool.w / 2; lx += per) {
      ctx.drawImage(T.ledPool.canvas, Math.round(lx - T.ledPool.w / 2), CEIL);
    }
    /* THE RIBS: each a raised strip running back to the corner, drawn
       where the pinhole puts it, so they fan out from the middle of the
       screen and lean as they go by */
    var r0 = Math.ceil(roofRow(sAt(RIB_D0))), r1 = WALL_Y - 1;
    for (i = 0; i < RIB_N; i++) {
      var X0 = LED_X + (i - (RIB_N - 1) / 2) * RIB_DX;
      U = wrap(X0 - scroll, COMP_W) - 240 - COMP_W;
      for (; U < VW + 200; U += COMP_W) {
        var sA = roofScale(r0), sB = roofScale(r1);
        var xa = 240 + sA * U, xb = 240 + sB * U;
        if ((xa < -4 && xb < -4) || (xa > VW + 4 && xb > VW + 4)) continue;
        for (r = r0; r <= r1; r++) {
          var s = roofScale(r + 0.5), x = Math.round(240 + s * U);
          k = (r - r0) / (r1 - r0);
          /* the rib's lit face toward the light, its shade on the far
             side: which side is which turns with the side of the screen
             it is on, as a raised strip seen from below does */
          var w = k < 0.5 ? 3 : 2;
          if (U < 0) { rect(ctx, x, r, w, 1, P.ribLit); dot(ctx, x + w, r, P.ribShade); }
          else { dot(ctx, x - 1, r, P.ribShade); rect(ctx, x, r, w, 1, P.ribLit); }
        }
      }
    }
    /* THE LED PANEL, row by row so its sides converge on the middle of
       the screen as the roof does */
    var ra = Math.round(roofRow(sAt(LED_D0))), rb = Math.round(roofRow(sAt(LED_D1)));
    U = wrap(LED_X - scroll, COMP_W) - 240 - COMP_W;
    for (; U < VW + 200; U += COMP_W) {
      var xl0 = 240 + roofScale(ra) * (U - LED_HALF);
      if (xl0 > VW + 4 || 240 + roofScale(ra) * (U + LED_HALF) < -4) continue;
      for (r = ra - 1; r <= rb + 1; r++) {
        var ss = roofScale(r + 0.5);
        var xl = Math.round(240 + ss * (U - LED_HALF)), xr = Math.round(240 + ss * (U + LED_HALF));
        var rim = r === ra - 1 || r === rb + 1;
        rect(ctx, xl - 1, r, xr - xl + 2, 1, rim ? P.ledRim : P.led);
        if (!rim) {
          dot(ctx, xl - 1, r, P.ledRim); dot(ctx, xr, r, P.ledRim);
          rect(ctx, xl + 3, r, xr - xl - 6, 1, P.ledCore);
        }
      }
    }
  }

  /* THE ROOM, back to front: the roof and what is on it, the glass, the
     wall with the shelf's things and their reflection, the vent hanging
     in front of the wall's top, the light. */
  function drawBackdrop(ctx, scroll) { drawRoom(ctx, scroll); }
  function drawRoom(ctx, scroll) {
    ctx.fillStyle = P.coldDeep; ctx.fillRect(0, CEIL, VW, FLOOR - CEIL);
    drawRoof(ctx, scroll);
    ctx.drawImage(T.glass.canvas, 0, GLASS_Y);
    tileX(ctx, T.wall.canvas, layerOff(WALL_PAR, scroll), WALL_Y);
    /* the shelf's things, farthest out to the side first */
    drawBoxes(ctx, scroll);
    /* the vents, and the soft shade each throws on the liner under it */
    var per = COMP_W * VENT_S, vy = ventRow() - 1;
    for (var x = firstVent(scroll); x < VW + 4; x += per) {
      var vx = Math.round(x);
      ctx.drawImage(T.ventShade.canvas, vx - 8, vy + VENT_H - 2);
      ctx.drawImage(T.vent.canvas, vx, vy);
    }
    ctx.drawImage(T.light.canvas, 0, 0);
  }

  function drawCeiling(ctx, scroll) { tileX(ctx, T.lid.canvas, scroll, 0); }
  function drawFloor(ctx, scroll) { tileX(ctx, T.trim.canvas, scroll, FLOOR); }

  /* THE CALM FRIDGE, for any menu pointed at it: the room at six tenths
     of the scroll with the shelf's things, the haze even and thin over
     the lane, the lid and the trim. No stacks, no eggs, no banks, no
     readout, no snap. */
  function drawMenuBackdrop(ctx, scroll) {
    var s = scroll * 0.6;
    drawRoom(ctx, s);
    ctx.drawImage(T.menuHaze.canvas, 0, CEIL);
    drawCeiling(ctx, s);
    drawFloor(ctx, s);
  }

  /* ------------------------------------------------------- the stacks */
  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), v = ob.variant;
    var topEnd = ob.gapY - 9, botY = ob.gapY + ob.gapH, colY = botY + 9;
    /* the hard shadow on the room behind, first, 3px of void */
    if (topEnd > CEIL) Tint.rect(ctx, x + 34, CEIL, 3, topEnd - CEIL, P.void, 5);
    Tint.rect(ctx, x + 38, topEnd, 3, 9, P.void, 5);
    Tint.rect(ctx, x + 38, botY, 3, 9, P.void, 5);
    if (FLOOR > colY) Tint.rect(ctx, x + 34, colY, 3, FLOOR - colY, P.void, 5);
    if (topEnd > CEIL) columnUp(ctx, T.stackUp[v].canvas, x, CEIL, topEnd - CEIL);
    if (FLOOR > colY) columnDown(ctx, T.stack[v].canvas, x, colY, FLOOR - colY);
    ctx.drawImage(T.capDown[ob.capDown].canvas, x - 4, topEnd);
    ctx.drawImage(T.capUp[ob.capUp].canvas, x - 4, botY);
  }

  /* ------------------------------------------------------- the drops

     Everything that draws or collides a drop reads ob.gold, ob.spicy and
     ob.sour LIVE - the engine sets sour after makeDrop returns. A spin
     never comes in this bay (no whirlChance); if a crow ever brought one
     it is painted as the lime, which at least reads as a thing to catch. */
  function kindOf(ob) {
    if (ob.gold) return 'patty';
    if (ob.spicy) return 'kimchi';
    if (ob.sour || ob.whirl) return 'lime';
    return 'egg';
  }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y), i, k;
    var kind = kindOf(ob), age = ob.age || 0;
    if (kind === 'egg') {
      blitBelowCeil(ctx, T.egg.canvas, Math.round(ob.x + Math.sin(ob.spin) * 1.2) - 4, y - 5);
      return;
    }
    if (kind === 'kimchi') {
      /* it wears the heat exactly as the brownie and the deviled egg do */
      var pulse = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(16 + pulse * 6),
           'rgba(' + FX.glowCore + ',' + (0.50 * pulse).toFixed(3) + ')',
           'rgba(' + FX.glowEdge + ',' + (0.24 * pulse).toFixed(3) + ')',
           'rgba(184,77,18,0)');
      for (i = 0; i < 3; i++) {
        k = wrap(age * 0.7 + i * 0.41, 1);
        var fy = y - 9 - Math.round(k * 7);
        if (fy < CEIL) continue;
        dot(ctx, x - 4 + Math.round(Math.sin(age * 2 + i) * 4), fy, i % 2 ? FX.hotHi : FX.hot);
      }
      var wob = Math.round(Math.sin(age * 9) * 0.6);
      blitBelowCeil(ctx, T.kimchi.canvas, x - 7 + wob, y - 8);
      return;
    }
    if (kind === 'lime') {
      var lp = 0.72 + 0.28 * Math.sin(age * 2.6);
      glow(ctx, x, y, Math.round(13 + lp * 4),
           'rgba(154,230,120,' + (0.40 * lp).toFixed(3) + ')',
           'rgba(110,190,80,' + (0.18 * lp).toFixed(3) + ')',
           'rgba(60,120,40,0)');
      blitBelowCeil(ctx, T.lime.canvas, x - 6, y - 10);
      return;
    }
    /* THE PATTY: the gold glow and two sparkles, beef in the middle */
    var gp = 0.72 + 0.28 * Math.sin(age * 2.6);
    glow(ctx, x, y, Math.round(13 + gp * 4),
         'rgba(242,207,106,' + (0.45 * gp).toFixed(3) + ')',
         'rgba(224,176,74,' + (0.20 * gp).toFixed(3) + ')',
         'rgba(224,176,74,0)');
    for (i = 0; i < 2; i++) {
      k = wrap(age * 0.9 + i * 0.5, 1);
      var sy = y - 7 - Math.round(k * 6);
      if (sy >= CEIL) dot(ctx, x - 5 + i * 10, sy, i ? P.goldHi : P.gold);
    }
    var f = Math.floor(wrap(ob.spin, TAU) / TAU * 4) % 4;
    blitBelowCeil(ctx, T.patty[f].canvas, x - 8, y - 5);
  }

  /* THE SPOT on the trim, under whatever is coming down: wide and faint
     while it is up by the roof, tight and dark as it arrives - darker and
     wider than the Coop's, on purpose, because in a bank it is the one
     clear clue. OUTSIDE the fog's clip. An egg near the trim adds a line
     of its own ice-light across the spot. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = 13 - Math.round(6 * k);
    var kind = kindOf(ob);
    var col = kind === 'egg' ? P.void : (kind === 'kimchi' ? P.kimchiDeep
            : (kind === 'lime' ? P.limeDeep : P.goldDeep));
    var sx = Math.round(ob.x - w / 2);
    Tint.rect(ctx, sx, FLOOR + 1, w, 3, col, 6 + Math.round(10 * k));
    if (kind === 'egg' && k > 0.5) {
      var a = ctx.globalAlpha;
      ctx.globalAlpha = a * 0.5;
      rect(ctx, sx + 1, FLOOR + 1, w - 2, 1, P.ice);
      ctx.globalAlpha = a;
    }
  }

  /* WHAT IS LEFT, on the trim. An egg: four chips of shell and ice and
     THE FROZEN YOLK - a little half-dome, because a frozen yolk is a
     ball; the kimchi a red smear with two chunks; the lime on its side;
     the patty lying flat with its glow gone. Faded over the last half
     second rather than blinking out. */
  function drawDropSplat(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 1, kind = kindOf(ob);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * clamp(ob.broken / 0.5, 0, 1);
    if (kind === 'egg') {
      rect(ctx, x - 6, y + 1, 2, 1, P.shell); dot(ctx, x - 6, y, P.frost);
      rect(ctx, x + 4, y + 1, 2, 1, P.shellShade); dot(ctx, x + 6, y, P.iceHi);
      dot(ctx, x - 3, y + 2, P.ice); dot(ctx, x + 3, y + 2, P.shell);
      rect(ctx, x - 2, y, 5, 2, P.yolk);
      rect(ctx, x - 1, y - 1, 3, 1, P.yolk);
      dot(ctx, x - 1, y - 1, P.yolkHi); dot(ctx, x, y, P.yolkHi);
    } else if (kind === 'kimchi') {
      rect(ctx, x - 4, y + 1, 9, 2, P.kimchi);
      rect(ctx, x - 3, y + 1, 4, 1, P.kimchiHi);
      dot(ctx, x - 6, y + 2, P.kimchiDeep); dot(ctx, x + 6, y + 1, P.kimchi);
    } else if (kind === 'lime') {
      /* the bottle on its side, cap to the right */
      Tint.rect(ctx, x - 9, y + 3, 18, 1, P.void, 6);
      rect(ctx, x - 9, y - 2, 15, 5, P.juice);
      rect(ctx, x - 9, y - 2, 15, 1, P.juiceHi);
      rect(ctx, x - 9, y + 2, 15, 1, P.juiceDeep);
      rect(ctx, x - 6, y - 2, 7, 5, P.limeGreen);
      rect(ctx, x - 6, y - 2, 7, 1, P.limeLit);
      rect(ctx, x - 4, y - 1, 3, 3, P.limeRind);
      dot(ctx, x - 3, y, P.limeFlesh);
      rect(ctx, x + 6, y - 1, 1, 3, P.juiceHi);
      rect(ctx, x + 7, y - 1, 2, 3, P.limeCap);
    } else {
      Tint.rect(ctx, x - 7, y + 3, 14, 1, P.void, 6);
      ctx.drawImage(T.patty[0].canvas, x - 8, y - 5);
    }
    ctx.globalAlpha = a;
  }

  /* --------------------------------------------------- the spare life */
  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var i;
    if (!ob.held) Tint.rect(ctx, Math.round(ob.x) - 10, FLOOR - 1, 20, 2, P.void, 7);
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 8 + ob.dy);
    /* THE GLOW SAYS SPARE LIFE: the jade every spare life wears, at the
       Table's raised strength and more - a pale cold room washes a glow
       out the way an afternoon one does */
    var pulse = 0.8 + 0.2 * Math.sin(ob.phase + (ob.age || 0) * 2.6);
    var r = Math.round(20 + pulse * 6);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.72 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, Math.max(CEIL, y - r), r * 2, y + r - Math.max(CEIL, y - r));
    ctx.drawImage(T.scoops[ob.flavour || 0].canvas, x - 10, y - 6);
    for (i = 0; i < 3; i++) {
      var k = wrap(ob.phase * 0.22 + (ob.age || 0) * 0.3 + i * 0.34, 1);
      dot(ctx, x - 7 + i * 7, y - 9 - Math.round(k * 10), i === 1 ? P.frost : P.lifePale);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
    /* a spike is never armed in here and draws nothing */
  }

  /* ======================================================= THE COVER

     The Fridge's painters for its cover (js/cover.js lays it out and
     times it, the same on every card). The compartment straight on: the
     roof with its LED and its ribs, the back wall with the steel and the
     shelf's three things, the glass, the lid and the trim. The columns
     are the bay's stacks of tubs, foil and steel under a foil tray or a
     blue lid; a frozen egg comes down with its spot; the haze lies over
     the lane with a bank going by in it; and every seven seconds THE
     SNAP closes on the doodad - sparks spiralling in, the lane going
     blue, a pale flash and the ice round him. */

  /* a 5-row cap or band squeezed to n rows: the first, the last, and the
     ones between evenly spaced; at two rows the outline and the colour
     under it, so a cap never goes solid black */
  function squeeze(rows, n) {
    if (n >= rows.length) return rows;
    if (n === 2) return [rows[0], rows[2]];
    var out = [];
    for (var j = 0; j < n; j++) out.push(rows[Math.round(j * (rows.length - 1) / (n - 1))]);
    return out;
  }
  var COVER_CAPS = [
    /* the foil tray; the 'F' row is the fluted foil */
    [P.outline, P.foilLit, 'F', P.foilDeep, P.outline],
    /* the steel box under the blue lid */
    [P.outline, P.lidBlueLit, P.lidBlue, P.boxSteel, P.outline]
  ];

  var COVER = {
    back: function (ctx, S) {
      var x = S.x, w = S.w, top = S.top, trimY = S.floor, lane = S.lane, s = S.s, i, k;
      var roofB = top + Math.round(lane * 0.18), glassT = trimY - Math.round(lane * 0.17);
      rect(ctx, x, S.y, w, S.h, P.steel);
      /* the roof, its gradient, its LED, its ribs */
      for (i = top; i < roofB; i++) rect(ctx, x, i, w, 1, mix(P.roofNear, P.roofFar, (i - top) / Math.max(1, roofB - top)));
      var ledW = Math.round(w * 0.22), lx = x + Math.round(wrap(w * 0.5 - s * 0.9, w + ledW)) - ledW;
      rect(ctx, lx, top + 1, ledW, 2, P.ledCore);
      rect(ctx, lx - 1, top + 3, ledW + 2, 1, P.ledRim);
      for (i = 0; i < 6; i++) {
        var rbx = x + Math.round(wrap(i * w / 5 - s * 0.7, w));
        var lean = Math.round((rbx - (x + w / 2)) * 0.15);
        rect(ctx, rbx, roofB - 3, 1, 3, P.ribLit);
        rect(ctx, rbx + Math.round(lean / 2), roofB - 5, 1, 2, P.ribLit);
      }
      /* the wall: liner, steel, the shelf's things at the wall's own
         speed, the channel */
      rect(ctx, x, roofB, w, glassT - roofB, P.steel);
      rect(ctx, x, roofB, w, 2, P.liner);
      rect(ctx, x, roofB + 2, w, 1, P.steelLit);
      var cyc = w + 40, ox = Math.round(wrap(-s * 0.64, cyc));
      for (k = -1; k <= 1; k++) {
        var bx = x + ox + k * cyc;
        rect(ctx, bx + 2, glassT - 7, 16, 7, P.milkRed);
        rect(ctx, bx + 4, glassT - 9, 3, 2, P.cap);
        rect(ctx, bx + 5, glassT - 5, 6, 2, P.milkWhite);
        rect(ctx, bx + 22, glassT - 3, 14, 3, P.pack);
        rect(ctx, bx + 40, glassT - 5, 20, 5, P.pulp);
        rect(ctx, bx + 40, glassT - 5, 20, 1, P.pulpLit);
      }
      rect(ctx, x, glassT - 1, w, 1, P.channel);
      /* the glass, seen through to the dark below */
      for (i = glassT; i < trimY; i++) rect(ctx, x, i, w, 1, mix(P.glassFar, P.glassNear, (i - glassT) / Math.max(1, trimY - glassT)));
      /* the lens's side falloff */
      var vig = Math.max(4, Math.round(w * 0.09));
      Tint.rect(ctx, x, top, vig, lane, P.coldDeep, 2);
      Tint.rect(ctx, x + w - vig, top, vig, lane, P.coldDeep, 2);
    },

    /* One stack: white tubs with dark joints, counted from the cap so
       the one at the mouth of the gap is always whole (the bay tiles its
       stacks the same way). Dairy, steel or foil off the column's index,
       the bay's three towers; rime on every third tub's lit edge; the
       foil tray or the blue lid at the mouth. */
    pillar: function (ctx, x, y, w, h, end, p, S) {
      if (h <= 0) return;
      var v = ((p.i % 3) + 3) % 3, hang = end === 'top';
      var ch = Math.max(2, Math.round(9 * S.k)), ov = Math.max(1, Math.round(4 * S.k));
      var st = Math.max(3, Math.round(12 * S.k)), sh = w <= 9 ? 1 : 2;
      Tint.rect(ctx, x + w, y, ov, h, P.void, 5);
      rect(ctx, x, y, w, h, P.outline);
      /* walk away from the cap, one element at a time: `at` is the
         element's edge nearest the cap, its joint the row furthest */
      var at = hang ? y + h - ch : y + ch, j = 0;
      while (hang ? at > y : at < y + h) {
        var foil = v === 2 && j % 3 !== 0, eh = foil ? 3 : st;
        var by = hang ? at - eh + 1 : at, bh = eh - 1;
        if (by < y) { bh -= y - by; by = y; }
        if (by + bh > y + h) bh = y + h - by;
        if (bh > 0) {
          if (foil) {
            for (var fx = x + 1; fx < x + w - 1; fx++) dot(ctx, fx, by, ((fx - x) >> 1) & 1 ? P.foilShade : P.foil);
            if (bh > 1) rect(ctx, x + 1, by + 1, w - 2, bh - 1, P.foilShade);
            dot(ctx, x + 1, by, P.foilLit);
          } else {
            var steel = v === 0 ? j % 4 === 3 : (v === 1 && (j & 1) === 1);
            rect(ctx, x + 1, by, w - 2, bh, steel ? P.boxSteel : P.tubWhite);
            rect(ctx, x + w - 1 - sh, by, sh, bh, steel ? P.boxSteelShade : P.tubShade);
            /* where a tub has the rows for it, its label: the sour
               cream's lavender and the Chobani's green band; the steel
               box's green lid */
            if (bh >= 4 && steel) rect(ctx, x + 1, by, w - 2, 1, P.lidGreen);
            else if (bh >= 4 && v === 0) {
              if (j & 1) rect(ctx, x + 1, by + 2, w - 2, 1, P.chobaniGreen);
              else rect(ctx, x + 1, by + 1, w - 2, bh - 2, P.sourLav);
            }
            if (j % 3 === 1) dot(ctx, x + 1, by, P.frost);
          }
        }
        at += hang ? -eh : eh;
        j++;
      }
      /* the cap across the mouth, its outline at the gap's edge */
      var rows = squeeze(COVER_CAPS[hash(p.i * 41 + 26) & 1], ch);
      for (var r = 0; r < ch; r++) {
        var cy = hang ? y + h - 1 - r : y + r, col = rows[r];
        if (col === 'F') {
          for (var cx = 0; cx < w + 2 * ov; cx++) dot(ctx, x - ov + cx, cy, (cx >> 1) & 1 ? P.foilShade : P.foil);
        } else rect(ctx, x - ov, cy, w + 2 * ov, 1, col);
      }
    },

    /* the lid: the liner's white flange, its dark arris the kill line */
    ceiling: function (ctx, S) {
      rect(ctx, S.x, S.y, S.w, S.top - S.y, P.lip);
      rect(ctx, S.x, S.top - 2, S.w, 1, P.lipLit);
      rect(ctx, S.x, S.top - 1, S.w, 1, P.lidArris);
    },
    /* the shelf's polished trim and its bright arris */
    floor: function (ctx, S) {
      var x = S.x, w = S.w, f = S.floor, b = S.y + S.h;
      rect(ctx, x, f, w, b - f, P.trimFace);
      rect(ctx, x, f, w, 1, P.trimArris);
      rect(ctx, x, f + 1, w, 1, P.trimLit);
      if (f + 5 < b) rect(ctx, x, b - 2, w, 2, P.trimShadow);
    },

    /* THE MIST. The haze over the whole lane first - here, not in back,
       so the stacks stand in it as they do in the bay, and under the
       doodad so he reads through it - then a bank in every other even
       span, a soft column of cold with frost drifting down it. Clipped
       to the lane: the lid and the trim never fog. */
    props: function (ctx, S) {
      ctx.save();
      ctx.beginPath(); ctx.rect(S.x, S.top, S.w, S.lane); ctx.clip();
      Tint.rect(ctx, S.x, S.top, S.w, S.lane, P.mist, 3);
      for (var n = 0; n < S.spans.length; n++) {
        var sp = S.spans[n];
        if (((sp.i % 4) + 4) % 4 !== 0) continue;
        var b0 = sp.x0 - 6, b1 = sp.x1 + 6, mid = Math.round((sp.x0 + sp.x1) / 2);
        var bg = ctx.createLinearGradient(b0, 0, b1, 0);
        bg.addColorStop(0, 'rgba(228,241,247,0)');
        bg.addColorStop(0.3, 'rgba(228,241,247,0.55)');
        bg.addColorStop(0.7, 'rgba(228,241,247,0.55)');
        bg.addColorStop(1, 'rgba(228,241,247,0)');
        ctx.fillStyle = bg; ctx.fillRect(b0, S.top, b1 - b0, S.lane);
        for (var i = 0; i < 4; i++) {
          var fy = S.top + Math.round(wrap(S.t * 9 + i * 17, S.lane));
          dot(ctx, mid + (hash(sp.i * 7 + i) % 13) - 6, fy, i & 1 ? P.ice : P.iceHi);
        }
      }
      ctx.restore();
    },

    /* the frozen egg, swaying as the bay's does, and its spot on the trim */
    drop: function (ctx, d, S) {
      var ex = d.x + Math.round(Math.sin(S.t * 6)), ey = d.y;
      var sw = Math.max(2, Math.round(5 - 3 * d.f));
      Tint.rect(ctx, d.x - sw, S.floor + 1, sw * 2 + 1, 2, P.void, 6 + Math.round(8 * d.f));
      if (S.k < 0.2) {
        /* the stands' set, where the doodad is four pixels: a fleck of an egg */
        rect(ctx, ex - 1, ey - 2, 3, 4, P.shellLine);
        rect(ctx, ex, ey - 1, 1, 2, P.shell);
        return;
      }
      /* the Coop's egg in its frozen colours, corners off. The shell is
         within a shade of the glass behind it, so a flat one was only its
         outline - and five by seven of outline beside 37F reads as a
         nought. Lit on top and shaded underneath, it is a solid thing. */
      rect(ctx, ex - 2, ey - 2, 5, 5, P.shellLine);
      rect(ctx, ex - 1, ey - 3, 3, 7, P.shellLine);
      rect(ctx, ex - 1, ey - 2, 3, 5, P.shell);
      rect(ctx, ex - 1, ey + 1, 3, 2, P.shellShade);
      rect(ctx, ex - 1, ey - 2, 2, 1, P.frost);
      dot(ctx, ex - 1, ey - 1, P.iceHi);
    },

    /* THE SNAP on a seven-second loop: the lane cooling to blue as the
       sparks spiral in on him, the flash, and the block of ice round him
       for two seconds; the thermometer's readout on the big card */
    front: function (ctx, S) {
      var sk = wrap(S.t / 7 + 0.5, 1) * 7, D = S.doodad, i;
      if (sk < 1.2) {
        var kk = ease(sk / 1.2);
        ctx.save();
        ctx.beginPath(); ctx.rect(S.x, S.top, S.w, S.lane); ctx.clip();
        var a0 = ctx.globalAlpha;
        ctx.globalAlpha = a0 * 0.20 * kk; rect(ctx, S.x, S.top, S.w, S.lane, P.coldTint);
        ctx.globalAlpha = a0;
        for (i = 0; i < 12; i++) {
          var th = i * TAU / 12 + sk * 6, rr = lerp(S.w * 0.38, 5, kk);
          var spx = Math.round(D.x + Math.cos(th) * rr), spy = Math.round(D.y + Math.sin(th) * rr);
          dot(ctx, spx, spy, P.iceHi); dot(ctx, spx + 1, spy, P.ice); dot(ctx, spx, spy + 1, P.ice);
        }
        ctx.restore();
      }
      if (sk >= 1.2 && sk < 3.4) {
        var z = D.size, bx = D.x - Math.floor(z / 2) - 3, by = D.y - Math.floor(z / 2) - 3, a1 = ctx.globalAlpha;
        ctx.globalAlpha = a1 * 0.45; rect(ctx, bx, by, z + 6, z + 6, P.ice); ctx.globalAlpha = a1;
        rect(ctx, bx, by, z + 6, 1, P.iceHi);
        rect(ctx, bx, by, 1, z + 6, P.iceHi);
      }
      if (sk >= 1.2 && sk < 1.3) {
        var a2 = ctx.globalAlpha;
        ctx.globalAlpha = a2 * 0.5; rect(ctx, S.x, S.y, S.w, S.h, P.frost); ctx.globalAlpha = a2;
      }
      if (S.big) {
        var rd = sk < 1.2 ? Math.round(37 * (1 - ease(sk / 1.2))) : (sk < 3.4 ? 0 : 37);
        Font.draw(ctx, rd + 'F', S.x + S.w - 3, S.top + 3, { scale: 1, colour: P.readout, shadow: P.readoutShadow, align: 'right' });
      }
    }
  };

  /* ==================================================== GENERATION */

  /* dairy 4 in 10, steel 3, foil 3; each cap rolled on its own, the foil
     tray a shade commoner than the blue lid */
  function makePillar(x, gapY, gapH, run) {
    var v = Math.random();
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: v < 0.4 ? 0 : (v < 0.7 ? 1 : 2),
             capUp: chance(0.55) ? 0 : 1, capDown: chance(0.55) ? 0 : 1,
             scored: false };
  }

  /* NO SPIKES IN HERE (the tune's shut gate, spikeScore 1e9). The
     contract's maker answers anyway, with nothing that draws or kills. */
  function makeSpikes(x, side, count, maxLen, run) {
    return { type: 'spike', x: Math.round(x), side: 'floor', w: 1, spikes: [] };
  }

  /* ONE MAKER FOR THE EGG, THE KIMCHI AND THE PATTY (the lime is the
     engine's, set after this returns). The engine says spicy; the patty
     is rolled here. `want` (Crow's ORDNANCE): 'gold' makes the patty on
     request and 'plain' makes anything but, and neither touches the dice
     or the gap - a gift handed to a crow must not move this bay's own
     rhythm. */
  function makeDrop(x, spicy, fall, run, want) {
    var gold = want === 'gold';
    if (!spicy && !gold && want !== 'plain') {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var ob = { type: 'drop', x: x, y: CEIL + 5, vy: fall, spicy: !!spicy, gold: gold, broken: 0,
               w: 7, spin: rand(0, TAU), spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1),
               landCry: 'clink', burst: [P.iceHi, P.shell], splat: SPLAT_TIME };
    if (spicy) { ob.w = 14; ob.landCry = 'pat'; ob.burst = [P.kimchiHi, P.kimchi]; ob.splat = 1.6; }
    if (gold) {
      ob.w = 16; ob.name = GOLD_NAME; ob.spinRate = 6 * (chance(0.5) ? -1 : 1);
      ob.landCry = 'thud'; ob.burst = [P.gold, P.beef]; ob.splat = 1.2;
    }
    return ob;
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 16, kind: randInt(0, 3), seed: randInt(1, 100000) };
  }

  /* THE ICE CREAM, a scoop sitting on the shelf at the front, in one of
     the four colours */
  function makeBoon(x, run) {
    var f = randInt(0, SCOOPS.length - 1);
    return { type: 'boon', x: x, y: FLOOR - 15, w: 20, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0, name: BOON_NAME, flavour: f,
             burst: [SCOOPS[f].lit, SCOOPS[f].base, P.lifePale, P.lifeJade] };
  }

  /* ======================================================= PHYSICS

     stepDrop owns every drop; the engine's default never runs here.
       THE EGG falls at DROP_GRAV and rocks.
       THE KIMCHI falls at 170 (a full jar), wobbling a pixel.
       THE LIME falls at 170 and sways 3px either way at 3 rad/s - a
         real sway, so its box goes where its picture goes.
       THE PATTY falls at 150, tumbling at 6 rad/s. */
  function stepDrop(ob, dt, obstacles, run) {
    var kind = kindOf(ob);
    if (kind === 'egg') {
      ob.vy += DROP_GRAV * dt;
      ob.spin += ob.spinRate * dt;
    } else if (kind === 'patty') {
      ob.vy += 150 * dt;
      ob.spin += ob.spinRate * dt;
    } else {
      ob.vy += 170 * dt;
      if (kind === 'lime') {
        if (ob.w !== 12) {
          /* the engine made it sour after the maker returned: dress it */
          ob.w = 12; ob.landCry = 'clank'; ob.burst = [P.limeLit, P.limeGreen]; ob.splat = 1.4;
        }
        ob.x += Math.cos((ob.age || 0) * 3) * 9 * dt;
      }
    }
    ob.y += ob.vy * dt;
    return ob.y >= FLOOR - 4;
  }

  /* ===================================================== THE BOXES

     Every lethal pixel has a box and nothing harmless has one. */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      /* the Coop's four boxes verbatim: a tub's taper gives back a pixel
         or two inside the 34 the box keeps */
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, 34, topH]);
      out.push([ob.x - 4, ob.gapY - 9, 42, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, 42, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, 34, botH]);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      var kind = kindOf(ob);
      if (kind === 'egg') out.push([ob.x - 3, ob.y - 4, 6, 9]);       /* the Coop's */
      else if (kind === 'kimchi') out.push([ob.x - 6, ob.y - 7, 12, 14]);
      else if (kind === 'lime') out.push([ob.x - 5, ob.y - 9, 10, 18]);
      else out.push([ob.x - 7, ob.y - 4, 14, 8]);
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 10, FLOOR - 15 + ob.dy, 20, 15]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, COVER: COVER, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME, CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor, drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawOverlay: drawOverlay, drawFront: drawFront,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop, GOLD_GIFT: true,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld,
    rectsFor: rectsFor,
    /* for the headless checks, read-only: the snap's running count and
       the constants the owner may turn */
    tally: tally, REST_MIN: REST_MIN, REST_MAX: REST_MAX
  };
})();
