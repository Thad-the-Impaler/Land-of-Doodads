/* ------------------------------------------------------------------
   Land of Doodads - THE KITCHEN / THE DISHWASHER   (4-5)

   The finale of the Kitchen. We have followed the dishes through the
   room - across the island, along the counter, in and out of the
   fridge - and here they are cleansed, so the cycle may be restarted.
   The door has shut behind you and the machine is RUNNING: you are an
   action camera sealed in the tub, between the lower rack and the
   upper, looking straight at the back wall. Drawn from Dishwasher ref
   1-6 and the crops cut from them: the dark stainless tub with its big
   pressed panels, the water tower up the middle of the back wall, the
   upper rack's coated wires seen from under them with the grey
   handle on its front rail, the lower rack's wire floor, the owner's
   black square plates with the gold ring, the black bowl with the cream
   enamel inside, the big black pan, the ribbed stacking tumblers and
   the tall highballs, the glass tub with its blue lid, the grey
   silicone spatula, the cutlery and the cutlery basket.

   ONE CAMERA, FLAT AND SIDE-ON. The lens is 11 cm over the lower rack,
   17 under the upper one, in the middle of the tub; the lane (rows
   24..241) is the 28 cm between the racks. Every layer is one flat
   sheet at one scale and one parallax - nothing recedes, fans or turns
   (the Fridge's pinhole room stays the Fridge's). The play plane is the
   lower rack's front row of tines, 20 cm out; the back wall is 34 cm
   behind that, so it stands at 20/54 = 0.37 of the lane's scale and
   slides by at 0.37 of its speed. The world is the tub unrolled: the
   back wall, the right side wall, the left side wall, and round again
   (the door is where the camera is, and is never drawn), one wall sheet
   of 470 px that comes past once every 1270 px of travel - and in that
   loop there is ONE tower, TWO big panels on the back wall, ONE panel
   and ONE rack rail on each side wall, and ONE DOODADS handle on the lid.
   The lid IS the underside of the upper rack; the ground IS the lower
   rack's wire floor with the tub floor and its pool under it. No lamp:
   the only light is the camera's own LED, so the tub is lit from the
   front and falls away into the corners (a baked vignette on the walls
   only - nothing that can hurt or help is ever darkened).

   DANK, NOT MURKY. The walls are wet steel at about 100 of 255, the
   panels a step lighter, beaded with condensation and streaked where
   the beads run; the two kill edges are the two brightest horizontal
   lines in the room (the rack wires); the stacks are black ringed with
   gold or bright glass; the water is the brightest thing in the tub.

   THE PROGRAM RUNS OVER YOU. The ladder of this bay is the machine's
   own program, named on its readout in the top right corner before
   each part starts: PRE-RINSE, WASH, RINSE, DRY, CLEAN - and at CLEAN
   it beeps three times, breathes, and RESTARTS HEAVIER ("so that the
   cycle may be restarted"). It runs on a clock from the moment the pump
   primes (score 3), so the finale is punctual whoever is flying: the
   HEAVY cycle by about forty seconds of play, its RINSE - THE CLIMAX,
   both arms, everything flying - by about fifty-five. See THE PROGRAM.

   THE SIGNATURE: THE SPRAY ARMS. The tub has a lower arm turning under
   the lower rack and a middle arm turning under the upper one, and seen
   side-on a turning arm's tips sweep to and fro as its length
   foreshortens - "things rotate in unique ways", and nothing here is
   ever ctx.rotate'd: the arms turn through baked frames. Each tip
   throws a JET, and A JET DOES NOT KILL. IT CARRIES (the engine's new
   ledger.jetVy - see THE PUSH): the floor arm's jets lift you toward
   the upper rack, which kills, and in the RINSE the middle arm's jets
   bear you down toward the lower rack, which kills. A ten-pixel column
   of the brightest water in the room, sweeping, never under a stack,
   never full until it has stood a second in plain sight - and the way
   out of one is to leave it, not to flap. See THE ARMS.

   THE DROPS COME FROM IN FRONT OF YOU. What the jets knock loose comes
   FLYING at you from the right - tumblers, the glass tub, from the
   HEAVY cycle the square plates (flipping) and the bowls, and in POTS
   AND PANS the pan - out of a splash at the edge of the picture half a
   second before it comes, tumbling end over end through baked frames,
   and it BURSTS ON A STACK if one is in its way: nothing ever comes
   through a plate at you. The loose cutlery still falls off the upper
   rack in every part, and the gifts always fall. See THE DROPS.

   WATER ON THE LENS. Drops bead on the camera, run, and in DRY they
   dry off; inside every bead the tub is UPSIDE DOWN, the way a drop of
   water turns a picture over - and a bead turns over ONLY EMPTY TUB:
   the inversion fades out before any stack, anything thrown, any jet
   or the doodad comes into it, and is counted (lensOverLethal) at
   zero. See THE LENS.

   AND THE MACHINE IN FULL SPRAY, all theatre that changes nothing you
   can die of (see that section): the tub's air thick with streaks of
   water thrown off the arms and sloshed up off the racks, every jet in a
   sheath of spray, bursting through the rack at its root and raining
   back from its end, the walls running with sheets of water, the upper
   rack dripping onto the lower; the detergent BURSTS three seconds into
   every WASH (a pop, a fizz, the machine jumping), foam is thrown up and
   clings to the walls and the stacks' caps, a foam line builds on the
   rack and bubbles rise and burst into rings of drops - and THE RINSE
   CLEARS THE SOAP AWAY; the racks RATTLE while the pump runs (every
   stack jigs a pixel, its boxes with it; the wires and what lies on
   them shake), the machine RUMBLES through the climax; DRY fills the
   tub with steam, dries the walls and the fan pulls you back; CLEAN
   drains the pool with a glug and three beeps, still but for the drips.
   Its own rhythm is the ladder's: PRE light, WASH soapy, RINSE clear and
   violent, the climax the peak, DRY and CLEAN the breath.

   MEASURED, headless, at the tune in js/levels.js, the shared harness's
   stock autopilot, one-minute runs, lives turned into saves:
     hits a minute       14.4 over 48 seeds (14.3, 14.9 and 14.1 in three
                         blocks of 16; 14.5 before thrown things kept
                         their boxes all the way) - the TV 13.75, the Fort 13.6, the
                         Fridge 10.8 at the same settings: the hardest bay
                         in the Kitchen and the TV's equal. The stacks 63%
                         of it, the flyers 24%, the cutlery 13%; the jets
                         kill nobody themselves - what they carry him into
                         is counted as the stack. A pilot that reacts
                         100 ms late and flaps at most every 0.15 s: 17.9
                         (the TV 16.6, the Fridge 17.3). Ninety-second
                         runs, on into POTS AND PANS: 17.8.
     the program         the pump primes at 6.1 s, HEAVY at 40.1, THE
                         HEAVY RINSE at 54.1 (53.9..55.7); a minute of play
                         is 10% before the pump, 12% PRE-RINSE, 40% WASH,
                         25% RINSE (the climax 10), 8% DRY, 5% CLEAN. Hits
                         per minute spent in each: PRE 7, WASH 16, RINSE 17,
                         DRY 18, CLEAN 18, THE CLIMAX 23
     the arms            a station in 43% of bays; one at full on the
                         screen 76% of WASH and 78% of RINSE; ten lifts a
                         minute, and 4 hits a minute of WASH or RINSE come
                         within 0.6 s of one. A pilot that keeps under the
                         floor's jets loses nothing to them in WASH
     the flyers          27 a minute with the twins, 38% burst on stacks,
                         5.3 a minute within 22 px of him, never sooner
                         than 1.68 s after the splash
     the cutlery         24 falling a minute once armed; two a minute
                         thrown back at him by a jet, lethal all the way
                         (one thrown too close to him bursts instead):
                         in ten minutes of the stock pilot, nothing that
                         looks lethal passed through him outside a save's
                         grace
     the gifts           the hot sauce every 28 s, the beater every 36,
                         the lime every 40, the spotless glass every 49;
                         the tablet about once in forty stacks
     the lens            not one frame with a bead turned over a box or
                         the doodad, in 64 runs; the beads turned over 39%
                         of the time they are on the lens
     the cost            the whole frame, all three layers and the
                         engine's share, in the harness's Chrome: 0.6 ms
                         on the average over a run and 0.8 ms held in the
                         climax at its thickest (the Fridge 0.4, the TV
                         1.95); build() about 60 ms

   Same discipline as every other level file: everything is generated
   and baked once in build(); per-frame work is blits and fills; any
   shade over anything that scrolls is a flat fill or a baked sheet,
   never a Dither (there is no call to Dither anywhere in this file);
   nothing turns by ctx.rotate at draw time (the falling and flying
   things are baked by turning a drawing of them ON THE BAKE, the
   Island's pans' method, and the arms by foreshortening); and nothing
   a frame draws reads Math.random - every flicker of spray comes off a
   clock through the house hash, so a paused frame drawn twice is the
   same frame.
------------------------------------------------------------------ */
'use strict';

var Dishwasher = (function () {

  /* the house: the kitchen's pigments and its utilities */
  var K = Kitchen.P;
  var CEIL = Kitchen.CEIL, FLOOR = Kitchen.FLOOR;
  var LANE = FLOOR - CEIL;                    /* 218 */
  var wrap = Kitchen.wrap, hash = Kitchen.hash;
  var ease = Kitchen.ease, rgba = Kitchen.rgba;
  var ringOf = Kitchen.ringOf, glow = Kitchen.glow, blitBelowCeil = Kitchen.blitBelowCeil;

  /* The bay's own pigments. PlayScene never reads this table. Every
     luminance in the comments is of 255 and was chosen against the plan
     in the header: walls about 100, kill edges the brightest lines, the
     stacks black-and-gold or bright glass, the water brightest of all. */
  var P = {
    /* THE TUB: dark stainless, wet. The body sits at 99 (the Counter's
       evening wall was "weirdly dark" at 126 and lifted to 155; a running
       dishwasher may be darker than a kitchen - dank is the point - but
       it must read as wet steel on a phone, not as black) */
    wall:         '#56606a',   /* lum  94 */
    wallBrush:    '#5d6771',   /* the brushed grain, a step up */
    wallPanel:    '#626c76',   /* lum 106: a pressed panel's field */
    wallLit:      '#7b868f',   /* lum 131: a panel's lit step */
    wallHi:       '#a6b1b9',   /* lum 173: the rolled corners, the sheen */
    wallDeep:     '#434a51',   /* lum  73: a panel's shaded step */
    seam:         '#2a3035',   /* lum  47: the corner seams */
    tower:        '#30363b',
    towerLit:     '#565e65',
    towerDeep:    '#1d2125',
    railGrey:     '#a3aaaf',
    railShade:    '#6d7479',
    roller:       '#7c8388',
    rollerLit:    '#d2d8dc',
    bead:         '#b9c6ce',   /* condensation */
    beadRun:      '#8796a0',
    /* THE LENS'S BEADS */
    lensLit:      '#ffffff',
    lensDark:     '#1a2026',
    lensRun:      '#b9d4e0',
    /* THE LID: the upper rack from below */
    lidDark:      '#1d2125',
    lidBlob:      '#4a535a',
    lidGlint:     '#dfe8ec',
    lidRecess:    '#2b3237',
    wire:         '#c0c7cb',   /* lum 197 */
    wireLit:      '#e8edf0',   /* lum 236: the arris and the kill wire */
    wireShade:    '#838b90',
    wireDeep:     '#50575c',
    handle:       '#63696e',
    handleLit:    '#878d92',
    handleDeep:   '#44494d',
    handleInk:    '#3f4448',
    /* THE GROUND: the lower rack and the tub floor */
    rackGap:      '#22282c',
    floor:        '#2c3236',   /* lum  48 */
    floorLit:     '#3b4247',
    pool:         '#2e4955',
    poolDeep:     '#223640',
    poolSheen:    '#7aa0b0',
    poolHi:       '#bcd8e3',
    sump:         '#5a6065',
    sumpRim:      '#91979c',
    sumpSlot:     '#33383c',
    arm:          '#b9bfc3',
    armLit:       '#e1e6e9',
    armDeep:      '#80878b',
    armFar:       '#8f969a',
    hub:          '#9ca2a6',
    hubDeep:      '#5d6367',
    foam:         '#e9f1f5',
    bubble:       '#cfe3ec',
    bubbleLit:    '#ffffff',
    /* THE WATER: the brightest thing in the tub */
    jetCore:      '#f4fdff',   /* lum 251 */
    jet:          '#aadff4',
    jetEdge:      '#5fb0d4',
    spray:        '#d6eef8',
    mist:         '#93bccd',
    steam:        '#dfeaf0',
    /* THE STACKS: the owner's black square plates with the gold ring,
       the black bowl with the cream enamel inside, the big black pan */
    plate:        '#16181b',   /* lum  23 */
    plateLit:     '#353a40',
    plateDeep:    '#0b0c0e',
    plateRing:    '#e5d09c',   /* lum 211: the gilt ring, from the photos */
    plateRingShade:'#a8946a',
    pan:          '#121417',
    panLit:       '#30353b',
    panRim:       '#4a5057',
    enamel:       '#ece3ca',
    enamelShade:  '#c5bb9f',
    sheen:        '#cdd7dc',   /* lum 214: the camera's light down a stack */
    /* the glasses */
    glass:        '#93a8b2',   /* lum 163 */
    glassLit:     '#dce9ee',
    glassRim:     '#f5fbfd',   /* lum 249 */
    glassDeep:    '#5f717b',
    glassRib:     '#b9cad2',
    tubGlass:     '#a3bac4',
    tubLid:       '#4f86a8',   /* the blue lid */
    tubLidLit:    '#86b6d2',
    tubLidDeep:   '#2f5a76',
    /* THE LOOSE THINGS */
    steel:        '#ccd1d5',   /* lum 207 */
    steelLit:     '#f3f6f8',
    steelShade:   '#80878c',
    knifeHandle:  '#1c1e21',
    spatula:      '#8f9498',   /* the grey silicone */
    spatulaLit:   '#bdc2c6',
    spatulaDeep:  '#5f6468',
    basket:       '#9aa0a5',
    basketLit:    '#c8cdd1',
    basketHole:   '#3c4246',
    /* THE GIFTS */
    bottle:       '#c3d1d8',
    bottleLit:    '#f1f7fa',
    bottleShade:  '#8c9ca5',
    sauce:        '#d8342a',
    sauceHi:      '#f26a50',
    sauceDeep:    '#8e1d18',
    capWhite:     '#f4f4f0',
    capShade:     '#bcbcb4',
    limeRind:     '#4f9a32',
    limeRindLit:  '#79c24f',
    limeRindDeep: '#2f6a1d',
    limeFlesh:    '#a8d85e',
    limePith:     '#eef5dc',
    limeLit:      '#d8f4a6',
    gold:         '#f1c232',
    goldLit:      '#fff0a0',
    goldDeep:     '#a8821c',
    white:        '#ffffff',
    tabWhite:     '#f4f6f6',
    tabShade:     '#c9d0d0',
    tabBlue:      '#3a6fd8',
    tabBlueLit:   '#78a0ee',
    tabRed:       '#d8342a',
    tabRedLit:    '#f07a64',
    /* a spare life glows the same jade in every level */
    lifeJade:     '#5fae9a',
    lifePale:     '#93d8bd',
    /* THE READOUT: the machine's own display */
    readout:      '#dfe9f0',
    readoutShadow:'#101418',
    readoutHot:   '#ff6a4a',
    readoutDim:   '#8b99a2',
    outline:      K.outline,
    void:         K.void
  };

  /* The neutral effect palette the engine paints its particles from:
     everything that comes off anything in here is water */
  var FX = {
    /* mist in the air */
    motes: '#5f7786', motesHi: '#a3bccb',
    /* a splash where a thing lets go */
    puff: '#9fd6ee', puffHi: '#e8f8ff',
    /* wire and water off the rack */
    ground: '#8c9aa3', groundHi: '#c5d0d6',
    /* water */
    splat: '#b9d4e0', splatHi: '#f2fbff',
    hot: '#ff4a2e', hotMid: '#ff8a5a', hotHi: '#ffd8c4', heat: '#ff4a2e', heatEdge: '#7a2012',
    glowCore: '255,214,196', glowEdge: '255,74,46'
  };

  /* The heads-ups, two short lines each, no apostrophes. The engine says
     the lid (first flap), the pump (score 3, the spike slot's banner) and
     the cutlery (score 4); the program says each part the first time it
     comes, and the two restarts. Spaced by the program's own queue (see
     THE PROGRAM), so one never talks over another. */
  var WARN = {
    ceil:  ['▲ THE UPPER RACK ▲',  'ITS WIRES END THE RUN'],
    spike: ['▲ THE PUMP IS ON ▲',  'WATCH THE ARMS TURN'],
    drop:  ['▼ LOOSE CUTLERY ▼',   'THE RACKS ARE SHAKING'],
    flyer: ['◀ FLYING DISHES ◀',   'THE JETS THROW THEM AT YOU'],
    wash:  ['▲ THE WASH ▲',        'JETS LIFT YOU TO THE LID'],
    rinse: ['▼ THE RINSE ▼',       'THE TOP ARM PUSHES DOWN'],
    dry:   ['▲ THE DRY ▲',         'THE FAN PULLS YOU BACK'],
    heavy: ['▲ HEAVY CYCLE ▲',     'BOTH ARMS. IT ALL FLIES'],
    pots:  ['▲ POTS AND PANS ▲',   'THE PANS FLY TOO']
  };

  /* the thirteen colours a generic cover would use; this bay paints its
     own, but the table stays honest */
  var PREVIEW = {
    back: P.wall, backAlt: P.wallPanel, seam: P.seam,
    beam: P.plate, beamDark: P.plateDeep, beamLight: P.plateRing,
    ground: P.wire, groundDark: P.wireShade, groundHi: P.wireLit,
    spike: P.jet, spikeHi: P.jetCore, air: P.spray, gloom: P.void
  };

  var END_MIN = Kitchen.END_MIN;
  var CEIL_KILLS = Kitchen.CEIL_KILLS;
  var BOON_NAME = 'TABLET';
  var GOLD_NAME = 'SPOTLESS GLASS';

  var T = {};                       /* baked tiles and sprites */

  /* --------------------------------------------------------- the camera

     ONE LOOP of the tub is 1270 px of travel. The wall sheet is the tub's
     three walls side by side, 470 px at 0.37 of the lane's scale, so it
     slides at 470/1270 of the room's speed and comes round once a loop;
     the lid and the ground are the play plane's own surfaces, one loop
     long at 1.0, so the DOODADS handle and the rack's every wire come round
     with it. */
  var LOOP = 1270;
  var WALL_W = 470, WALL_PAR = WALL_W / LOOP;          /* 0.370 */
  var SEC_BACK = 157, SEC_RIGHT = 157;                 /* the left wall is the 156 left over */
  var TOWER_X = 78;                                    /* the tower's centre on the back wall */
  var PANEL_W = 60, PANEL_H = 120, PANEL_Y = 30;       /* a pressed panel, on the sheet */
  var HANDLE_X = 236, HANDLE_W = 62;                   /* the DOODADS handle on the lid loop */

  /* the lid band's rows (0..23) and the ground band's (242..269) */
  var LID_ARM_Y = 11;                                  /* the middle arm's frame's top row */
  var GROUND_ARM_Y = FLOOR + 4;                        /* the lower arm's frame's top row, 246 */
  var POOL_Y = FLOOR + 17;                             /* the pool's surface, 259 */

  /* --------------------------------------------------------- helpers */

  function rect(c, x, y, w, h, col) {
    if (w <= 0 || h <= 0) return;
    c.fillStyle = col; c.fillRect(x, y, w, h);
  }
  function dot(c, x, y, col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }

  function hexRGB(hex) {
    /* a pigment is a hex; a mix() is an rgb() - both come through here */
    if (hex.charAt(0) !== '#') {
      var m = hex.match(/[\d.]+/g);
      return [+m[0], +m[1], +m[2]];
    }
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

  /* An alpha sheet in one colour, painted through ImageData (the Bar's,
     the Fridge's): every smooth falloff in this file is one of these */
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

  /* a small sprite as a grid of characters, one to the pixel */
  function paintGrid(c, rows, x, y, pal) {
    for (var j = 0; j < rows.length; j++) {
      for (var i = 0; i < rows[j].length; i++) {
        var col = pal[rows[j].charAt(i)];
        if (col) dot(c, x + i, y + j, col);
      }
    }
  }

  /* an ellipse's outline, one pixel wide, by rows - for rings seen at a
     slant (the plate's gilt ring, the sump's slots) */
  function ellipseRing(c, cx, cy, rx, ry, col) {
    if (rx < 0.5 || ry < 0.5) { rect(c, Math.round(cx - rx), Math.round(cy), Math.max(1, Math.round(rx * 2)), 1, col); return; }
    var n = Math.ceil(Math.max(rx, ry) * 6);
    for (var i = 0; i < n; i++) {
      var a = i * TAU / n;
      dot(c, Math.round(cx + Math.cos(a) * rx - 0.5), Math.round(cy + Math.sin(a) * ry - 0.5), col);
    }
  }
  function ellipseFill(c, cx, cy, rx, ry, col) {
    c.fillStyle = col;
    for (var y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) {
      var k = (y + 0.5 - cy) / ry;
      if (k <= -1 || k >= 1) continue;
      var hw = rx * Math.sqrt(1 - k * k);
      var x0 = Math.round(cx - hw), x1 = Math.round(cx + hw);
      if (x1 > x0) c.fillRect(x0, y, x1 - x0, 1);
    }
  }

  /* ================================================ TURNING THINGS

     A LOOSE THING IS A FUNCTION OF ITS OWN FRAME: region(u, v) gives a
     material number (0 for air), u along its length and v across it, in
     pixels at the sprite's own scale, centred on the thing. A frame at
     angle th is painted by asking, for every pixel centre of the frame's
     square, where that point is in the thing's own frame - the inverse
     turn, point-sampled - so the turn is done once, on the bake, and the
     picture is never resampled at draw time. `fu` and `fv` foreshorten
     the thing along u or v (a plate flipping about its upright, a lid
     about its long side): a frame of a flip is the same thing, narrower.
     Then the house's edge light, worked out on the TURNED picture so it
     always comes from the same side whatever way up the thing is: a
     painted pixel with air above or to its left takes the material's lit
     tone, one with air below or to its right its deep tone (the camera's
     LED is low and to the left of the lens, the photos' highlights say),
     and the outline is laid under the lot. `tones[m]` is [body, lit,
     deep]; a material with one tone is never edge-lit (a rim, a ring). */
  function bakeTurn(N, th, fu, fv, region, tones, alpha) {
    var t = makeCanvas(N, N), C = N / 2, cs = Math.cos(th), sn = Math.sin(th);
    var grid = new Int8Array(N * N), x, y, m;
    for (y = 0; y < N; y++) {
      for (x = 0; x < N; x++) {
        var dx = x + 0.5 - C, dy = y + 0.5 - C;
        var u = (cs * dx + sn * dy) / fu, v = (-sn * dx + cs * dy) / fv;
        grid[y * N + x] = region(u, v) | 0;
      }
    }
    var img = t.ctx.createImageData(N, N), d = img.data;
    for (y = 0; y < N; y++) {
      for (x = 0; x < N; x++) {
        m = grid[y * N + x];
        if (!m) continue;
        var tn = tones[m], col = tn[0];
        if (tn.length > 1) {
          var up = y === 0 || !grid[(y - 1) * N + x], lf = x === 0 || !grid[y * N + x - 1];
          var dn = y === N - 1 || !grid[(y + 1) * N + x], rt = x === N - 1 || !grid[y * N + x + 1];
          if (up || lf) col = tn[1];
          else if (dn || rt) col = tn[2];
        }
        var rgb = hexRGB(col), i = (y * N + x) * 4;
        d[i] = rgb[0]; d[i + 1] = rgb[1]; d[i + 2] = rgb[2];
        d[i + 3] = Math.round(255 * (tn.length > 3 ? tn[3] : (alpha === undefined ? 1 : alpha)));
      }
    }
    t.ctx.putImageData(img, 0, 0);
    return ringUnder(t);
  }

  /* SIXTEEN FRAMES A TURN for everything that tumbles: a fork's tip moves
     about three pixels from one to the next, which reads as turning and
     not as flicking between poses (eight was measured on the Table's
     silverware and called "a strobe") */
  var TURN_N = 16;
  function turnFrame(spin) { return Math.round(wrap(spin, TAU) / (TAU / TURN_N)) % TURN_N; }

  /* THE BOXES OF A TURNING THING: squares along it in its own frame, as
     [u, v, size], put on the screen at the frame's own angle - quantised
     exactly as the frame is drawn - so a diagonal fork never kills in
     the empty corners of its square (the Island's PAN_BOX) */
  function turnBoxes(out, x, y, frame, boxes, fu) {
    var th = frame * TAU / TURN_N, c = Math.cos(th), s = Math.sin(th);
    var bx = Math.round(x), by = Math.round(y);
    for (var i = 0; i < boxes.length; i++) {
      var u = boxes[i][0] * (fu || 1), v = boxes[i][1], z = boxes[i][2];
      out.push([bx + c * u - s * v - z / 2, by + s * u + c * v - z / 2, z, z]);
    }
    return out;
  }

  /* ======================================================= THE ROOM */

  /* THE WALLS, one sheet of 470 x 218 (the lane's rows), at 0.37:
       x   0..156  THE BACK WALL - the two big pressed panels of ref 1
                   and 5 either side of the TOWER, the dark water column
                   that feeds the arms, with its collar at the top where
                   it meets the rack's feed and its round boss
       x 157..313  THE RIGHT SIDE WALL - one panel, and along the top the
                   UPPER RACK'S SIDE RAIL with its roller (ref 3)
       x 314..469  THE LEFT SIDE WALL - the same, mirrored
     with the rolled corner between each two, all of it brushed steel,
     wet: beaded with condensation (hashed, never random), streaked
     under one bead in nine where it has run, more of both low down where
     the spray lands, and three soft bands of sheen where the camera's
     light comes back off the wet. One sheet, tiled: tileX covers the
     whole screen at any offset, so nothing on it ever pops in. */
  function panelsOn() {
    /* [x0, w] of every pressed panel on the sheet, left to right */
    var t0 = TOWER_X - 7;
    return [[t0 - 5 - PANEL_W, PANEL_W], [TOWER_X + 7 + 6, PANEL_W],
            [SEC_BACK + Math.round((SEC_RIGHT - PANEL_W) / 2), PANEL_W],
            [SEC_BACK + SEC_RIGHT + Math.round((WALL_W - SEC_BACK - SEC_RIGHT - PANEL_W) / 2), PANEL_W]];
  }

  function bakeWall() {
    var W = WALL_W, H = LANE, i, x, y;
    var base = hexRGB(P.wall);
    /* the steel itself: a brushed grain that runs up and down (one value
       a column, a slower wander every four), and the wet - a faint
       darkening that gathers toward the bottom where the spray lands */
    var t = pixelSheet(W, H, function (x, y) {
      var g = ((hash(x * 131 + 7) % 9) - 4) * 0.8 + ((hash((x >> 2) * 977 + 3) % 5) - 2) * 0.9;
      var low = y > 150 ? -(y - 150) / (H - 150) * 6 : 0;
      return [base[0] + g + low, base[1] + g + low, base[2] + g + low];
    });
    var c = t.ctx;

    /* THE PRESSED PANELS. Each is a shallow dish pressed into the sheet:
       a rounded rectangle whose outer step catches the light on its top
       and left and falls into shade on its bottom and right, and whose
       inner step does the opposite - which is what reads as a pressing
       and not a painted box - around a field a shade lighter than the
       wall. Corner radius 5. */
    var PN = panelsOn();
    for (i = 0; i < PN.length; i++) paintPanel(c, PN[i][0], PANEL_Y, PN[i][1], PANEL_H);

    /* THE TOWER, up the middle of the back wall: the dark water column,
       a lit strip down its left and a dark line down its right, a wider
       collar where it meets the rack's feed at the top and a round boss
       where the upper arm's pipe comes off it (ref 5), and the joint low
       down where it comes up out of the sump */
    var tx = TOWER_X - 7;
    rect(c, tx, 0, 14, H, P.tower);
    rect(c, tx, 0, 2, H, P.towerLit);
    rect(c, tx + 13, 0, 1, H, P.towerDeep);
    rect(c, tx - 3, 0, 20, 15, P.tower);
    rect(c, tx - 3, 0, 2, 15, P.towerLit);
    rect(c, tx + 16, 0, 1, 15, P.towerDeep);
    rect(c, tx - 3, 15, 20, 1, P.towerDeep);
    rect(c, tx - 3, 14, 20, 1, P.towerLit);
    ellipseFill(c, TOWER_X, 62, 6, 6, P.towerLit);
    ellipseFill(c, TOWER_X, 62, 5, 5, P.tower);
    ellipseFill(c, TOWER_X - 1, 61, 2, 2, P.towerLit);
    rect(c, tx - 1, 186, 16, 3, P.towerLit);
    rect(c, tx - 1, 189, 16, 1, P.towerDeep);

    /* THE CORNER SEAMS, where one wall turns into the next: a dark line
       and the rolled corner beside it catching the light */
    var seams = [0, SEC_BACK, SEC_BACK + SEC_RIGHT];
    for (i = 0; i < seams.length; i++) {
      var sx = seams[i];
      rect(c, sx, 0, 1, H, P.seam);
      rect(c, wrap(sx - 1, W), 0, 1, H, P.seam);
      rect(c, sx + 1, 0, 1, H, P.wallHi);
      rect(c, sx + 2, 0, 1, H, P.wallLit);
    }

    /* THE UPPER RACK'S SIDE RAILS, one on each side wall at the rack's
       own height, which is the lid's: a grey bar along the top of the
       sheet with the rack's roller at the door end (the right wall's at
       its left, the left wall's at its right) */
    paintRail(c, SEC_BACK + 6, SEC_RIGHT - 12, true);
    paintRail(c, SEC_BACK + SEC_RIGHT + 6, W - SEC_BACK - SEC_RIGHT - 12, false);

    /* THE WET: condensation everywhere, about one bead to 140 square
       pixels and thicker low down; one in nine has run and left a streak
       under it, 4..12 px. Off the hash, so the same wall is wet the same
       way every boot. */
    for (y = 1; y < H - 2; y++) {
      for (x = 0; x < W; x++) {
        var h = hash(x * 7919 + y * 104729);
        var per = y > 150 ? 90 : 140;
        if (h % per !== 0) continue;
        if (x >= tx - 3 && x <= tx + 16) continue;        /* not on the dark tower */
        dot(c, x, y, P.bead);
        if ((h >>> 9) % 9 === 0) {
          var len = 4 + (h >>> 13) % 9 + (y > 150 ? 4 : 0);
          for (var k = 1; k <= len && y + k < H; k++) {
            if ((k + (h >>> 5)) % 4 === 0) continue;
            dot(c, x, y + k, k < len / 2 ? P.beadRun : mix(P.beadRun, P.wall, 0.5));
          }
        }
      }
    }

    /* THE SHEEN: the camera's light thrown back off the wet steel, three
       soft upright bands, one a wall, just left of each wall's middle */
    var bands = [[32, 44], [SEC_BACK + 40, 36], [SEC_BACK + SEC_RIGHT + 46, 40]];
    var sheen = alphaSheet(W, H, P.wallHi, function (x, y) {
      var a = 0;
      for (var b = 0; b < bands.length; b++) {
        var d = Math.abs(x + 0.5 - bands[b][0]) / (bands[b][1] / 2);
        if (d < 1) a = Math.max(a, 0.17 * (1 - ease(d)) * (0.75 + 0.25 * Math.sin(y * 0.031 + b)));
      }
      return a;
    });
    c.drawImage(sheen.canvas, 0, 0);
    return t;
  }

  function paintPanel(c, x, y, w, h) {
    var r = 5, j;
    function row(yy, x0, x1, col) { rect(c, x0, yy, x1 - x0, 1, col); }
    /* the rounded outline, row by row: how far in the corner pulls row j */
    function inset(j) {
      if (j >= r && j < h - r) return 0;
      var k = j < r ? r - j - 0.5 : j - (h - r) + 0.5;
      return Math.round(r - Math.sqrt(Math.max(0, r * r - k * k)));
    }
    for (j = 0; j < h; j++) {
      var a = inset(j);
      row(y + j, x + a, x + w - a, P.wallPanel);
    }
    /* the outer step: lit top and left, deep bottom and right */
    for (j = 0; j < h; j++) {
      var b = inset(j);
      var top = j === 0 || inset(j - 1) > b + 1, bot = j === h - 1 || inset(j + 1) > b + 1;
      if (top) row(y + j, x + b, x + w - b, P.wallLit);
      if (bot) row(y + j, x + b, x + w - b, P.wallDeep);
      if (j < h - r) dot(c, x + b, y + j, P.wallLit);
      else dot(c, x + b, y + j, j > h - 3 ? P.wallDeep : P.wallLit);
      dot(c, x + w - b - 1, y + j, j < r ? P.wallLit : P.wallDeep);
    }
    row(y, x + r, x + w - r, P.wallHi);
    /* the inner step, a pixel in: shade under the lit edge, light over
       the deep one - the pressing's wall seen from the front */
    row(y + 2, x + 4, x + w - 4, P.wallDeep);
    rect(c, x + 2, y + 4, 1, h - 8, P.wallDeep);
    row(y + h - 3, x + 4, x + w - 4, P.wallLit);
    rect(c, x + w - 3, y + 4, 1, h - 8, P.wallLit);
  }

  function paintRail(c, x, w, rollerLeft) {
    rect(c, x, 2, w, 6, P.railGrey);
    rect(c, x, 2, w, 1, P.rollerLit);
    rect(c, x, 7, w, 1, P.railShade);
    rect(c, x, 8, w, 1, P.wallDeep);
    var rx = rollerLeft ? x + 6 : x + w - 6;
    ellipseFill(c, rx, 5, 5.5, 5.5, P.railShade);
    ellipseFill(c, rx, 5, 4.5, 4.5, P.roller);
    ellipseFill(c, rx - 1, 4, 2, 2, P.rollerLit);
    dot(c, rx, 5, P.wallDeep);
  }

  /* THE CAMERA'S LIGHT FALLING AWAY: a multiply of the void over the
     walls only, nothing at the middle of the frame and VIG_MAX in the
     corners on a smooth curve. Laid after the walls and before anything
     that can be touched, so no stack, jet, thing or gift is ever darkened
     by it. The lead's cap: 0.35. */
  var VIG_MAX = 0.33;
  function bakeVignette(k) {
    return alphaSheet(VW, LANE, P.void, function (x, y) {
      var nx = (x + 0.5 - VW / 2) / (VW / 2), ny = (y + CEIL + 0.5 - VH / 2) / (VH / 2);
      var d = Math.sqrt(nx * nx * 0.8 + ny * ny * 1.2) / Math.sqrt(2);
      return VIG_MAX * k * ease(clamp((d - 0.30) / 0.62, 0, 1));
    });
  }

  /* THE LID, one loop of 1270 x 24 at 1.0: the underside of the upper
     rack, seen from 17 cm below it. Rows:
       0..11   the dark above the rack, and in it the undersides of the
               glasses standing on it, mouth-down: soft blobs with a
               glint on their rims, one every 36 px or so
       12      the rack's side member, in its own shade
       13..15  the rack's wire floor, edge on: two long wires and the
               cross wires between them every 6 px
       16..21  the recess the middle spray arm turns in (drawn over this
               by drawCeiling, off the list)
       22      the front rail's under edge
       23      THE ARRIS, the front rail's lit wire - the brightest line
               at the top of the room, and the lid kills along the row
               under it */
  function bakeLid() {
    var W = LOOP, t = makeCanvas(W, CEIL), c = t.ctx, x, i;
    rect(c, 0, 0, W, 12, P.lidDark);
    for (x = 4; x < W - 16; ) {
      var h = hash(x * 271 + 11), bw = 8 + h % 7, by = 3 + (h >>> 5) % 4, bh = 9 - (by - 3);
      ellipseFill(c, x + bw / 2, by + bh / 2, bw / 2, bh / 2, P.lidBlob);
      rect(c, x + 2, by + bh - 1, bw - 4, 1, P.lidGlint);
      dot(c, x + 1, by + bh - 2, mix(P.lidGlint, P.lidBlob, 0.5));
      x += bw + 14 + (h >>> 9) % 26;
    }
    rect(c, 0, 12, W, 1, P.wireDeep);
    rect(c, 0, 13, W, 3, P.lidRecess);
    rect(c, 0, 13, W, 1, P.wireShade);
    rect(c, 0, 15, W, 1, P.wire);
    for (x = 2; x < W; x += 6) rect(c, x, 13, 1, 3, P.wire);
    rect(c, 0, 16, W, 6, P.lidRecess);
    for (i = 0; i < 6; i++) rect(c, 0, 16 + i, W, 1, mix(P.lidRecess, P.lidDark, i / 8));
    rect(c, 0, 22, W, 1, P.wireShade);
    rect(c, 0, 23, W, 1, P.wireLit);
    return t;
  }

  /* THE HANDLE (ref 1, 5; crop bosch_handle): the grey bar on the
     upper rack's front rail, at exactly the lid's height, so from under
     the rack it is its underside - a 62 x 9 bar with rounded ends, a lit
     top and a deep foot, and DOODADS pressed into it where the real one
     has its maker's name and ring (no real brand on a level). ONE, once a
     loop, drawn over the middle arm because it is in front of it. */
  function bakeHandle() {
    var W = HANDLE_W, H = 9, t = makeCanvas(W, H), c = t.ctx;
    rect(c, 2, 0, W - 4, H, P.handle);
    rect(c, 1, 1, W - 2, H - 2, P.handle);
    rect(c, 0, 2, W, H - 4, P.handle);
    rect(c, 2, 0, W - 4, 1, P.handleLit);
    rect(c, 1, 1, 1, 1, P.handleLit);
    rect(c, 0, 2, 1, H - 4, P.handleLit);
    rect(c, 2, H - 1, W - 4, 1, P.handleDeep);
    rect(c, W - 1, 2, 1, H - 4, P.handleDeep);
    dot(c, W - 2, H - 2, P.handleDeep);
    var word = 'DOODADS', x0 = Math.round((W - Font.measure(word, 1)) / 2);
    /* pressed in: the letters' light edge under them, then the letters */
    Font.draw(c, word, x0 + 1, 2, { scale: 1, colour: P.handleLit });
    Font.draw(c, word, x0, 1, { scale: 1, colour: P.handleInk });
    return t;
  }

  /* THE GROUND, one loop of 1270 x 28 at 1.0: the lower rack's wire
     floor seen from 11 cm above it, and the tub floor under it. Rows:
       0 (242)    THE KILL WIRE: the rack's front wire, crisp, the
                  brightest line at the bottom of the room
       1..4       the rack's floor, edge on: a wire, and the cross wires
                  every 6 px over the dark you see down through them
       5          the rack's back wire, in shade
       6..13      the tub floor under the rack, dark steel
       14..27     THE POOL, the water in the bottom of the tub; its sheen
                  (row 14, POOL_Y) is laid over this by drawFloor and
                  wobbles while the pump runs */
  function bakeGround() {
    var W = LOOP, H = VH - FLOOR, t = makeCanvas(W, H), c = t.ctx, x, y;
    rect(c, 0, 0, W, H, P.floor);
    rect(c, 0, 0, W, 1, P.wireLit);
    rect(c, 0, 1, W, 1, P.wire);
    rect(c, 0, 2, W, 3, P.rackGap);
    for (x = 3; x < W; x += 6) rect(c, x, 1, 1, 4, P.wire);
    rect(c, 0, 5, W, 1, P.wireShade);
    for (y = 6; y < 17; y++) rect(c, 0, y, W, 1, mix(P.floorLit, P.floor, (y - 6) / 10));
    for (x = 0; x < W; x++) {
      var h = hash(x * 613 + 5);
      if (h % 5 === 0) rect(c, x, 7 + (h >>> 4) % 8, 1, 1 + (h >>> 8) % 2, P.floorLit);
    }
    for (y = 17; y < H; y++) rect(c, 0, y, W, 1, mix(P.pool, P.poolDeep, (y - 17) / (H - 17)));
    /* the water's own glints, still */
    for (x = 0; x < W; x++) {
      var g = hash(x * 389 + 17);
      if (g % 11 === 0) dot(c, x, 19 + (g >>> 5) % 8, mix(P.poolSheen, P.pool, 0.4));
    }
    return t;
  }

  /* THE POOL'S SURFACE: three baked rows of sheen a loop long, a third of
     a wave apart, cycled while the pump runs (the water sloshing) and
     held on the first while it is off */
  function bakeSheen(ph) {
    var W = LOOP, t = makeCanvas(W, 2), c = t.ctx;
    for (var x = 0; x < W; x++) {
      var s = Math.sin(x * 0.21 + ph * TAU) + 0.6 * Math.sin(x * 0.057 - ph * TAU * 2 + 1.3);
      if (s > 0.9) dot(c, x, 0, P.poolHi);
      else if (s > 0.1) dot(c, x, 0, P.poolSheen);
      else dot(c, x, 0, mix(P.poolSheen, P.pool, 0.6));
      if (s > 1.25) dot(c, x, 1, P.poolSheen);
    }
    return t;
  }

  /* THE FOAM the suds leave on the rack: a lumpy loop of bubbles over
     rows 244..252 - never on 242 or 243, the kill wire stays crisp */
  function bakeFoam() {
    var W = LOOP, H = 6;
    return pixelSheet(W, H, function (x, y) {
      var top = 1.6 + 1.3 * Math.sin(x * 0.13) + 0.9 * Math.sin(x * 0.041 + 2) + (hash(x * 97) % 3) * 0.4;
      if (y < top) return null;
      var b = hash(x * 53 + y * 977);
      var rgb = hexRGB(b % 7 === 0 ? P.bubbleLit : (b % 3 === 0 ? P.bubble : P.foam));
      var a = 0.55 + 0.45 * clamp((y - top) / 3, 0, 1);
      return [rgb[0], rgb[1], rgb[2], a * (b % 5 === 0 ? 0.6 : 1)];
    });
  }

  /* THE STEAM of DRY: a flat haze with eight soft cores (the Fridge's
     bank's method), 480 x 218, laid across the lane and drifting */
  var STEAM_A = 0.22, STEAM_CORE = 0.34;
  function bakeSteam() {
    var B = [], i;
    for (i = 0; i < 8; i++) {
      var h = hash(4401 + i * 7919);
      B.push([30 + i * 60 + (h % 30), 20 + (h >>> 7) % (LANE - 40), 40 + (h >>> 15) % 30]);
    }
    var core = (STEAM_CORE - STEAM_A) / (1 - STEAM_A);
    return alphaSheet(VW, LANE, P.steam, function (x, y) {
      var keep = 1 - STEAM_A;
      for (var j = 0; j < B.length; j++) {
        var dx = wrap(x + 0.5 - B[j][0] + VW / 2, VW) - VW / 2, dy = (y + 0.5 - B[j][1]) * 1.3;
        var d = Math.sqrt(dx * dx + dy * dy) / B[j][2];
        if (d < 1) keep *= 1 - core * (1 - ease(d));
      }
      return 1 - keep;
    });
  }

  /* ===================================================== THE STACKS

     The obstacle at the obstacle's scale, 1.3 px a cm (a 26 cm plate is
     the 34 px column), both halves of every pillar the same scale.

     STANDING ON THE LOWER RACK: THE PLATES (crop plate_pan_cutlery,
     lower_rack_pan) - the owner's black square plates with the gilt
     ring, STACKED FLAT the way they were stacked before they went in,
     with the black bowl (cream enamel inside) and the big black pan
     among them. Seen from a little above the stack's top, every plate
     shows the sliver of its ring at its edge: a ladder of gold on black
     that reads at any size. Tiled from the cap DOWNWARD, so the thing at
     the mouth of the gap is whole and the cut is behind the kill wire.

     HANGING UNDER THE UPPER RACK: THE GLASSES (crop ribbed_tumblers,
     spatula_tub) - the ribbed stacking tumblers nested in columns, and
     the tall smooth highballs of ref 5, bright clear glass a little
     see-through over the wall (baked with its alpha, never a Dither).
     Tiled from the cap UPWARD, the cut behind the lid.

     Every stack carries the camera's light down its left edge and the
     house outline down its right. No shadows on the wall: the only lamp
     in here is at the lens, and a shadow of a thing lit from the camera
     falls straight back behind the thing itself. */

  /* one plate seen edge-on from a little above, 3 rows: its ring's
     sliver, then its rim; `off` narrows it by a pixel at one side or the
     other, so a stack is jagged the way a real stack is, not ruled */
  function paintPlate(c, y, off) {
    var x0 = off < 0 ? 1 : 0, x1 = off > 0 ? 33 : 34;
    rect(c, x0, y, x1 - x0, 3, P.plate);
    rect(c, x0 + 3, y, x1 - x0 - 6, 1, P.plateRing);
    dot(c, x0 + 2, y, P.plateRingShade); dot(c, x1 - 3, y, P.plateRingShade);
    rect(c, x0, y + 1, x1 - x0, 1, P.plateLit);
    rect(c, x0 + 2, y + 2, x1 - x0 - 3, 1, P.plateDeep);
  }

  /* the bowl in a stack, right way up, 12 rows: the cream enamel inside
     showing over its rim, the black body under it */
  function paintBowl(c, y) {
    rect(c, 1, y, 32, 1, P.panRim);
    rect(c, 3, y + 1, 28, 2, P.enamel);
    rect(c, 3, y + 3, 28, 1, P.enamelShade);
    rect(c, 1, y + 1, 2, 3, P.pan); rect(c, 31, y + 1, 2, 3, P.pan);
    for (var j = 4; j < 12; j++) {
      var a = j < 9 ? 1 : (j - 8);
      rect(c, a, y + j, 34 - 2 * a, 1, j === 4 ? P.panLit : P.pan);
    }
    rect(c, 2, y + 11, 30, 1, P.plateDeep);
  }

  /* the big pan upside down, 14 rows: its base on top, its sides
     flaring to the rim, the handle's root a dim nub at the back */
  function paintPanDown(c, y) {
    rect(c, 13, y, 8, 2, mix(P.pan, P.wallDeep, 0.5));
    for (var j = 2; j < 14; j++) {
      var a = Math.max(0, 4 - Math.floor((j - 2) / 2));
      rect(c, a, y + j, 34 - 2 * a, 1, j < 4 ? P.panLit : P.pan);
    }
    rect(c, 0, y + 12, 34, 1, P.panRim);
    rect(c, 0, y + 13, 34, 1, P.plateDeep);
  }

  /* the camera's light down the left of a stack and the outline down
     its right, over whatever is painted on the tile */
  function edgeStack(c, h) {
    var d = c.getImageData(0, 0, 34, h).data;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < 34; x++) {
        if (d[(y * 34 + x) * 4 + 3] === 0) continue;
        dot(c, x, y, P.sheen);
        break;
      }
      for (var x2 = 33; x2 >= 0; x2--) {
        if (d[(y * 34 + x2) * 4 + 3] === 0) continue;
        dot(c, x2, y, P.outline);
        break;
      }
    }
  }

  /* TILE A: six plates, the bowl, four plates. TILE B: the pan upside
     down on nine plates. 42 rows each. */
  function bakePlates(v) {
    var t = makeCanvas(34, 42), c = t.ctx, y = 0, i;
    if (v === 0) {
      for (i = 0; i < 6; i++, y += 3) paintPlate(c, y, i % 2 ? 1 : (i % 4 === 2 ? -1 : 0));
      paintBowl(c, y); y += 12;
      for (i = 0; i < 4; i++, y += 3) paintPlate(c, y, i % 2 ? -1 : 0);
    } else {
      paintPanDown(c, y); y += 14;
      for (i = 0; i < 9; i++, y += 3) paintPlate(c, y, i % 3 === 1 ? 1 : (i % 3 === 2 ? -1 : 0));
      rect(c, 0, y, 34, 1, P.outline);
    }
    edgeStack(c, 42);
    return t;
  }

  /* ONE TUMBLER of a nested column, 11 wide and 12 rows: the ribbed
     glass, its rim where the next one nests (the bottom row, the
     brightest), a glint down its lit side and the deep down its other.
     Tapered a pixel: the base end (up) is narrower than the mouth (down). */
  function paintTumbler(c, x, y) {
    var j;
    for (j = 0; j < 12; j++) {
      var a = j < 3 ? 2 : (j < 7 ? 1 : 0);
      var col = j === 11 ? P.glassRim : (j % 2 === 1 && j < 10 ? P.glassRib : P.glass);
      rect(c, x + a, y + j, 11 - 2 * a, 1, col);
      if (j < 10) {
        dot(c, x + a, y + j, P.glassLit);
        dot(c, x + 10 - a, y + j, P.glassDeep);
      }
    }
    /* the nested glass's lip under the rim, and the rim catching the light */
    rect(c, x + 1, y + 10, 9, 1, P.glassDeep);
    dot(c, x + 2, y + 11, P.white);
  }
  function paintHighball(c, x, y) {
    /* hanging mouth-down: its heavy base at the top, its rim at the foot */
    rect(c, x + 1, y, 14, 3, P.glassDeep);
    rect(c, x + 1, y, 14, 1, P.glassRib);
    rect(c, x, y + 3, 16, 12, P.glass);
    rect(c, x, y + 15, 16, 1, P.glassRim);
    rect(c, x + 2, y + 3, 2, 12, P.glassLit);
    rect(c, x + 14, y + 3, 1, 12, P.glassDeep);
    rect(c, x + 7, y + 5, 1, 7, P.glassRib);
    rect(c, x, y + 14, 16, 1, P.glassDeep);
    dot(c, x + 3, y + 15, P.white);
  }
  /* TILE C: three tumblers abreast. TILE D: two highballs. Baked with
     the glass's own alpha, so the wall shows faintly through them. */
  function bakeGlasses(v) {
    var H = v === 0 ? 12 : 16, t = makeCanvas(34, H), c = t.ctx;
    if (v === 0) { paintTumbler(c, 0, 0); paintTumbler(c, 11, 0); paintTumbler(c, 23, 0); }
    else { paintHighball(c, 0, 0); paintHighball(c, 18, 0); }
    edgeStack(c, H);
    return glassAlpha(t);
  }
  /* GLASS IS SEEN THROUGH: its body at 0.62 and its ribs at 0.85 over
     the wall, its rims, glints, deep edges and outline whole - so a stack
     of glasses is a ladder of bright rims with the wall showing between,
     which is what a stack of clear glass is */
  function glassAlpha(t) {
    var img = t.ctx.getImageData(0, 0, t.w, t.h), d = img.data;
    var body = [P.glass, P.tubGlass].map(hexRGB), rib = hexRGB(P.glassRib);
    for (var i = 0; i < d.length; i += 4) {
      if (!d[i + 3]) continue;
      for (var k = 0; k < body.length; k++) {
        if (d[i] === body[k][0] && d[i + 1] === body[k][1] && d[i + 2] === body[k][2]) d[i + 3] = 158;
      }
      if (d[i] === rib[0] && d[i + 1] === rib[1] && d[i + 2] === rib[2]) d[i + 3] = 217;
    }
    t.ctx.putImageData(img, 0, 0);
    return t;
  }

  /* THE CAPS, 42 x 9, laid across the mouth of the gap at x - 4.
     On a plate stack (its top): 0 THE BOWL right way up, its cream
       inside showing over the rim; 1 A SQUARE PLATE face up, its gilt
       ring an ellipse at this slant, the maker's mark at its middle.
     On a glass stack (its foot): 0 THE GLASS TUB lid-down, the blue lid
       with its clip tabs (spatula_tub); 1 A TUMBLER'S HEAVY BASE. */
  function bakeCapStand(k) {
    var t = makeCanvas(42, 9), c = t.ctx, j;
    if (k === 0) {
      rect(c, 2, 0, 38, 1, P.panRim);
      rect(c, 1, 1, 40, 2, P.enamel);
      rect(c, 4, 1, 34, 1, mix(P.enamel, P.white, 0.4));
      rect(c, 1, 3, 40, 1, P.enamelShade);
      for (j = 4; j < 9; j++) {
        var a = 1 + Math.floor((j - 4) / 2);
        rect(c, a, j, 42 - 2 * a, 1, j === 4 ? P.panLit : P.pan);
      }
      rect(c, 0, 1, 1, 3, P.pan); rect(c, 41, 1, 1, 3, P.pan);
    } else {
      rect(c, 0, 1, 42, 7, P.plate);
      rect(c, 1, 0, 40, 1, P.plateLit);
      rect(c, 0, 7, 42, 1, P.plateDeep);
      rect(c, 0, 8, 42, 1, P.plateLit);
      ellipseRing(c, 21, 4, 17, 2.6, P.plateRing);
      rect(c, 19, 4, 4, 1, P.plateRingShade);
    }
    edgeCap(c);
    return t;
  }
  function bakeCapHang(k) {
    var t = makeCanvas(42, 9), c = t.ctx;
    if (k === 0) {
      rect(c, 1, 0, 40, 6, P.tubGlass);
      rect(c, 1, 0, 40, 1, P.glassRim);
      rect(c, 2, 1, 3, 1, P.glassLit); rect(c, 2, 2, 1, 2, P.glassLit);
      rect(c, 38, 1, 2, 5, P.glassDeep);
      rect(c, 1, 5, 40, 1, P.glassDeep);
      rect(c, 0, 6, 42, 2, P.tubLid);
      rect(c, 0, 6, 42, 1, P.tubLidLit);
      rect(c, 0, 8, 42, 1, P.tubLidDeep);
      rect(c, 3, 5, 3, 2, P.tubLidLit); rect(c, 36, 5, 3, 2, P.tubLidLit);
    } else {
      rect(c, 2, 0, 38, 6, P.glass);
      rect(c, 2, 0, 38, 1, P.glassRim);
      rect(c, 2, 2, 38, 1, P.glassRib); rect(c, 2, 4, 38, 1, P.glassRib);
      rect(c, 3, 1, 1, 5, P.glassLit);
      rect(c, 0, 6, 42, 2, P.glassDeep);
      rect(c, 0, 8, 42, 1, P.glassRim);
    }
    edgeCap(c);
    return glassAlpha(t);
  }
  function edgeCap(c) {
    var d = c.getImageData(0, 0, 42, 9).data;
    for (var y = 0; y < 9; y++) {
      for (var x = 0; x < 42; x++) if (d[(y * 42 + x) * 4 + 3]) { dot(c, x, y, P.outline); break; }
      for (var x2 = 41; x2 >= 0; x2--) if (d[(y * 42 + x2) * 4 + 3]) { dot(c, x2, y, P.outline); break; }
    }
  }

  /* A STANDING STACK IS TILED FROM ITS CAP DOWNWARD, A HANGING ONE FROM
     ITS CAP UPWARD (the Fridge's columnDown and columnUp), so the element
     at the mouth is always whole and the cut is always at a kill edge */
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

  /* ======================================================= THE ARMS

     THE TWO SPRAY ARMS, side-on. Each is a grey plastic bar turning flat
     about its hub; from the side its length foreshortens to |cos| of its
     angle and its two tips swing to and fro across the hub, the near one
     brighter than the far - sixteen baked frames a turn, chosen by the
     arm's own angle, and no ctx.rotate anywhere. The lower arm (R_LOWER,
     a 40 cm arm at the stacks' 1.3 px a cm) turns in the ground band
     under the rack's wires with its nozzles UP; the middle arm (R_UPPER,
     shorter, as the real one is) in the lid's recess under the upper
     rack with its nozzles DOWN, a shade darker because it is further
     from the light. */
  var R_LOWER = 52, R_UPPER = 40;
  var ARM_N = 16;
  function bakeArm(R, up) {
    var out = [], W = 2 * R + 14, C = W / 2, H = 12;
    /* bright steel either way - the lower arm on the dark tub floor, the
       middle one in the lid's dark recess - so the thing that throws the
       jets is seen turning; the middle arm a step darker (it is further
       from the lens's light), the far half of each in shade */
    var lit = up ? P.steelLit : mix(P.steelLit, P.steel, 0.35);
    var body = up ? P.steel : mix(P.steel, P.steelShade, 0.2);
    var deep = up ? P.steelShade : mix(P.steelShade, P.outline, 0.15);
    var farLit = mix(body, deep, 0.25), farBody = mix(body, deep, 0.55), farDeep = mix(deep, P.outline, 0.35);
    var th0 = up ? 7 : 6, th1 = up ? 4 : 3, base = up ? 9 : 2;
    for (var k = 0; k < ARM_N; k++) {
      var th = k * TAU / ARM_N, cs = Math.cos(th), sn = Math.sin(th);
      var t = makeCanvas(W, H), c = t.ctx, x;
      var L = Math.max(6, R * Math.abs(cs));
      var tip0 = C + R * cs, tip1 = C - R * cs;
      var nearTip = sn >= 0 ? tip0 : tip1, nearSide = nearTip >= C ? 1 : -1;
      /* THE BAR, column by column: thicker at the hub than at the tips
         (the real arm is), its ends rounded, a highlight down its top */
      for (x = Math.floor(C - L); x < Math.ceil(C + L); x++) {
        var u = (x + 0.5 - C) / L, d = Math.min(1, Math.abs(u));
        var tk = Math.round(th0 - (th0 - th1) * d);
        if (Math.abs(u) > 1 - 1.5 / L) tk = Math.max(2, tk - 1);
        var near = (x + 0.5 - C) * nearSide >= 0 || Math.abs(cs) < 0.15;
        var y0 = up ? base - tk + 1 : base;
        rect(c, x, y0, 1, tk, near ? body : farBody);
        dot(c, x, y0, near ? lit : farLit);
        if (tk > 3) dot(c, x, y0 + 1, near ? mix(lit, body, 0.5) : farBody);
        dot(c, x, y0 + tk - 1, near ? deep : farDeep);
      }
      /* the hub: a drum a little taller than the bar, its cap catching the
         light, the bearing a dark dot in its middle */
      var hw = up ? 14 : 12, hh = th0 + 2, hy = up ? base - th0 : 0;
      rect(c, Math.round(C - hw / 2), hy, hw, hh, body);
      rect(c, Math.round(C - hw / 2) + 1, hy, hw - 2, 2, lit);
      rect(c, Math.round(C - hw / 2), hy + hh - 1, hw, 1, deep);
      rect(c, Math.round(C + hw / 2) - 1, hy, 1, hh, deep);
      rect(c, Math.round(C) - 1, hy + Math.floor(hh / 2), 2, 2, P.hubDeep);
      /* THE NOZZLES: one at each tip and one halfway out, up on the floor
         arm and down on the middle one; the near ones bright */
      [[tip0, 0], [tip1, 1], [C + R * cs * 0.5, 0], [C - R * cs * 0.5, 1]].forEach(function (q, i) {
        var nearN = (q[1] === 0) === (sn >= 0), big = i < 2;
        var tk2 = Math.round(th0 - (th0 - th1) * (big ? 1 : 0.5));
        var nx = Math.round(q[0]) - (big ? 1 : 0), nw = big ? 3 : 2;
        var ny = up ? base - tk2 - 1 : base + tk2;
        rect(c, nx, ny, nw, 2, nearN ? lit : farBody);
        if (nearN && big) dot(c, nx + 1, up ? ny : ny + 1, P.white);
      });
      out.push(ringUnder(t));
    }
    return out;
  }
  function armFrame(th) { return Math.round(wrap(th, TAU) / (TAU / ARM_N)) % ARM_N; }

  /* THE JET, a column of the brightest water in the tub: an edge of
     deeper blue either side, the body, a white core, and in it streaks
     that run along the column at the water's own speed - a texture that
     repeats every JET_PER rows, drawn from an offset that moves with the
     clock, so the water visibly flows OUT of the nozzle. Baked with its
     alpha: the edges let the wall through, the core does not. */
  /* THE PUSH's column is JET_W, the core and the body; the SHEATH round it
     - translucent water thrown off the column, its edge broken and
     flickering - is drawn out to JET_DRAW and pushes nothing. Three
     baked variants of the sheath, cycled fast on top of the flow, so the
     edges flicker as well as run. */
  var JET_W = 10, JET_DRAW = 28, JET_PER = 48, JET_TEX_H = JET_PER + 110, JET_VARS = 3;
  function bakeJetTex(v) {
    var C = JET_DRAW / 2 - 0.5, sheath = hexRGB(mix(P.jet, P.spray, 0.5));
    return pixelSheet(JET_DRAW, JET_TEX_H, function (x, y) {
      var yy = y % JET_PER, ph = yy * TAU / JET_PER;
      /* the body's half width ripples along it - water, not a rod - and
         the ripples ride the flow, because the texture scrolls with it */
      var hw = 4.6 + 0.6 * Math.sin(ph * 2) + 0.4 * Math.sin(ph * 3 + 1.7);
      var sw = 10 + 2.2 * Math.sin(ph * 2 + v * 2.1) + 1.3 * Math.sin(ph * 5 + 0.4 + v);
      var off = 0.6 * Math.sin(ph + 2.1);
      var d = Math.abs(x - C - off), h = hash(x * 131 + yy * 977 + v * 7919 + 5);
      var col, a;
      if (d > sw + 0.5) {
        /* spray flung off the sheath */
        if (d < sw + 4 && h % 9 === 0) { col = h % 2 ? P.spray : P.jetCore; a = 0.6; }
        else return null;
      } else if (d > hw + 0.5) {
        /* THE SHEATH: thinning outward, its edge broken */
        var k = (d - hw) / (sw - hw);
        if (k > 0.7 && h % 3 === 0) return null;
        if (h % 13 === 0) { col = P.jetCore; a = 0.55; }
        else { var rgb0 = sheath; return [rgb0[0], rgb0[1], rgb0[2], 0.42 - 0.3 * k]; }
      } else if (d > hw - 0.7) { col = P.jetEdge; a = 0.85; }
      else if (d < 2.1) {
        /* the core, broken into dashes that run with the water */
        col = hash(Math.floor(yy / 3) * 31 + 7) % 4 === 0 ? P.jet : P.jetCore; a = 1;
      } else { col = h % 6 === 0 ? P.jetCore : P.jet; a = 0.9; }
      var rgb = hexRGB(col);
      return [rgb[0], rgb[1], rgb[2], a];
    });
  }

  /* the cloud of spray a jet stands in: soft, widest at the root, behind
     everything (stretched to the jet's height when it is drawn) */
  function bakePlume(down) {
    return alphaSheet(44, 64, P.spray, function (x, y) {
      var k = down ? 1 - y / 63 : y / 63, hw = 9 + 13 * k, dx = Math.abs(x + 0.5 - 22) / hw;
      return dx < 1 ? 0.24 * (1 - ease(dx)) * (0.5 + 0.5 * k) : 0;
    });
  }

  /* the mist where a jet bursts through a rack: a soft flat cloud */
  function bakeMist() {
    return alphaSheet(40, 14, P.spray, function (x, y) {
      var dx = (x + 0.5 - 20) / 20, dy = (y + 0.5 - 7) / 7, d = Math.sqrt(dx * dx + dy * dy);
      return d < 1 ? 0.5 * (1 - ease(d)) : 0;
    });
  }

  /* the spray a jet frays into at its free end: three frames of loose
     droplets round a soft head, cycled fast */
  var FRAY_W = 26, FRAY_H = 16, FRAY_N = 6;
  /* a hanging jet's end: the column breaking into drops that are thrown
     down and out and go on falling */
  function bakeFrayDown() {
    var out = [];
    for (var f = 0; f < FRAY_N; f++) {
      var t = makeCanvas(FRAY_W, FRAY_H), c = t.ctx, i, cx = FRAY_W / 2;
      ellipseFill(c, cx, 3.5, 6, 3, P.jet);
      ellipseFill(c, cx, 3.5, 3.5, 2, P.jetCore);
      rect(c, cx - 5, 0, 10, 2, P.jet);
      for (i = 0; i < 14; i++) {
        var h = hash(i * 6113 + 71), side = i % 2 ? 1 : -1;
        var vx = side * (6 + h % 20), vy = 10 + (h >>> 7) % 20;
        var k = wrap(f / FRAY_N + (h >>> 13) % 100 / 100, 1) * 0.5;
        var px = Math.round(cx + vx * k), py = Math.round(4 + vy * k + 0.5 * 120 * k * k);
        if (px < 0 || px >= FRAY_W || py < 0 || py >= FRAY_H) continue;
        dot(c, px, py, i % 3 === 0 ? P.jetCore : P.spray);
      }
      out.push(t);
    }
    return out;
  }
  function bakeFray() {
    var out = [];
    for (var f = 0; f < FRAY_N; f++) {
      var t = makeCanvas(FRAY_W, FRAY_H), c = t.ctx, i, k;
      /* the head: where the column opens out */
      var cx = FRAY_W / 2;
      ellipseFill(c, cx, FRAY_H - 4, 6.5, 3.5, P.jet);
      ellipseFill(c, cx, FRAY_H - 4, 4, 2.4, P.jetCore);
      rect(c, cx - 5, FRAY_H - 2, 10, 2, P.jet);
      /* and the drops it throws: each on its own arc, up, out and down,
         at its own point in its flight for this frame */
      for (i = 0; i < 14; i++) {
        var h = hash(i * 7919 + 333), side = i % 2 ? 1 : -1;
        var vx = side * (8 + h % 26), vy = -(18 + (h >>> 7) % 22);
        k = wrap(f / FRAY_N + (h >>> 13) % 100 / 100, 1) * 0.55;
        var px = Math.round(cx + vx * k), py = Math.round(FRAY_H - 5 + vy * k + 0.5 * 160 * k * k);
        if (px < 0 || px >= FRAY_W || py < 0 || py >= FRAY_H) continue;
        dot(c, px, py, i % 3 === 0 ? P.jetCore : P.spray);
        if (i % 4 === 0 && py + 1 < FRAY_H) dot(c, px, py + 1, P.jet);
      }
      out.push(t);
    }
    return out;
  }

  /* THE SUMP under each lower arm's hub: the round filter plate in the
     tub floor, seen at a slant - a flat ellipse in the pool with its rim
     and three slotted rings - and the stem the arm turns on. And four
     frames of the water swirling into it, played while CLEAN drains. */
  function bakeSump() {
    var t = makeCanvas(48, 12), c = t.ctx;
    ellipseFill(c, 24, 7, 22, 4.2, P.sumpRim);
    ellipseFill(c, 24, 7, 20.5, 3.4, P.sump);
    ellipseRing(c, 24, 7, 15, 2.4, P.sumpSlot);
    ellipseRing(c, 24, 7, 10, 1.6, P.sumpSlot);
    ellipseFill(c, 24, 7, 4, 1.2, P.sumpSlot);
    rect(c, 22, 0, 4, 6, P.hubDeep);
    rect(c, 22, 0, 1, 6, P.hub);
    return t;
  }
  function bakeSwirl() {
    var out = [];
    for (var f = 0; f < 4; f++) {
      out.push(alphaSheet(44, 10, P.poolHi, function (x, y) {
        var dx = (x + 0.5 - 22) / 21, dy = (y + 0.5 - 5) / 4.5, r = Math.sqrt(dx * dx + dy * dy);
        if (r > 1 || r < 0.15) return 0;
        var a = Math.atan2(dy, dx) + r * 5 - f * TAU / 4;
        var s = Math.sin(a * 2);
        return s > 0.55 ? 0.7 * (1 - r) + 0.15 : 0;
      }));
    }
    return out;
  }

  /* ================================================= THE LOOSE THINGS

     REGIONS, in their own frames (see TURNING THINGS). Material numbers:
       1 steel   2 the knife's black handle   3 a rivet, a glint
       4 grey silicone (the spatula's head and grip)
       5 the blue lid's rim   6 the blue lid's field
       7 glass   8 a glass's rib   9 a glass's rim   10 a glass's base
       11 black (plate, bowl, pan)   12 the gilt ring   13 cream enamel
       14 a pan's rim   15 the tub's clear glass   16 gold  17 gold rib
       18 gold rim */
  var TONES = [null,
    [P.steel, P.steelLit, P.steelShade],
    [P.knifeHandle, '#3b3e43', '#0c0d0f'],
    [P.steelLit],
    [P.spatula, P.spatulaLit, P.spatulaDeep],
    [P.tubLid, P.tubLidLit, P.tubLidDeep],
    [mix(P.tubLid, P.tubLidLit, 0.4), P.tubLidLit, P.tubLid],
    [P.glass, P.glassLit, P.glassDeep],
    [P.glassRib],
    [P.glassRim],
    [P.glassDeep],
    [P.plate, P.plateLit, P.plateDeep],
    [P.plateRing],
    [P.enamel, mix(P.enamel, P.white, 0.4), P.enamelShade],
    [P.panRim],
    [P.tubGlass, P.glassLit, P.glassDeep],
    [P.gold, P.goldLit, P.goldDeep],
    [P.goldLit],
    [P.white]
  ];

  function rFork(u, v) {
    var av = Math.abs(v);
    if (u > 4 && u <= 8.5) {
      if (av > 2.5) return 0;
      var tv = v + 2.5;
      return (tv < 1 || (tv >= 2 && tv < 3) || tv >= 4) ? 1 : 0;
    }
    if (u > 0 && u <= 4) return av <= 1 + (u / 4) * 1.5 ? 1 : 0;
    if (u > -8.5 && u <= 0) return av <= (u < -6 ? 1.3 : 0.9) ? 1 : 0;
    return 0;
  }
  function rSpoon(u, v) {
    var du = (u - 4.5) / 3.6, dv = v / 3;
    if (du * du + dv * dv <= 1) return (du < -0.2 && Math.abs(dv) < 0.35) ? 3 : 1;
    if (u > -8 && u <= 1.5) return Math.abs(v) <= (u < -5.5 ? 1.3 : 0.9) ? 1 : 0;
    return 0;
  }
  function rKnife(u, v) {
    if (u > -1 && u <= 10) {
      var top = 1.5, bot = u > 6 ? 1.5 - (u - 6) * 0.75 : 1.5;
      return (v >= -top && v <= bot) ? 1 : 0;
    }
    if (u > -10 && u <= -1) {
      if (Math.abs(v) > 2) return 0;
      if (Math.abs(v) < 0.6 && (Math.abs(u + 3.5) < 0.7 || Math.abs(u + 7.5) < 0.7)) return 3;
      return 2;
    }
    return 0;
  }
  function rSpatula(u, v) {
    if (u > 3 && u <= 15) {
      var lim = 3 - (u > 13 ? (u - 13) * 0.9 : 0);
      if (Math.abs(v) > lim) return 0;
      return (u > 5 && u < 13 && Math.abs(v - 0.5) < 0.5 && Math.floor(u) % 3 === 0) ? 0 : 4;
    }
    if (u > -7 && u <= 3) return Math.abs(v) <= 0.9 ? 1 : 0;
    if (u > -15 && u <= -7) return Math.abs(v) <= 1.5 ? 4 : 0;
    return 0;
  }
  /* the blue lid of the glass tub, face on: 26 x 18, rounded, its rim
     and its field (a flip foreshortens it in v) */
  function rLid(u, v) {
    var au = Math.abs(u), av = Math.abs(v);
    if (au > 13 || av > 9) return 0;
    var cx = Math.max(0, au - 10), cy = Math.max(0, av - 6);
    if (cx * cx + cy * cy > 9) return 0;
    return (au > 11 || av > 7) ? 5 : 6;
  }

  /* THE FLYERS. A ribbed tumbler, end over end, its mouth at +u */
  function rTumbler(u, v, gold) {
    if (u < -8.5 || u > 8.5) return 0;
    var hw = 4 + 1.5 * (u + 8.5) / 17;
    if (Math.abs(v) > hw) return 0;
    if (u > 7.5) return gold ? 18 : 9;
    if (u < -7) return gold ? 17 : 10;
    if (Math.floor(u + 8.5) % 2 === 1 && u < 6) return gold ? 17 : 8;
    return gold ? 16 : 7;
  }
  function rGoldTumbler(u, v) { return rTumbler(u, v, true); }
  /* the glass tub with its blue lid on, end over end */
  function rTub(u, v) {
    var au = Math.abs(u);
    if (au > 13 || v < -7 || v > 7) return 0;
    var cx = Math.max(0, au - 11), cy = Math.max(0, -v - 5);
    if (cx * cx + cy * cy > 4) return 0;
    if (v > 4) return 5;
    if (v < -6 || au > 12) return 9;
    return 15;
  }
  /* the owner's square plate, face on: black, corners rounded, the gilt
     ring and the inner ring round the maker's mark; its back has only
     the foot ring. A flip about its upright foreshortens it in u. */
  function rPlate(u, v, back) {
    var au = Math.abs(u), av = Math.abs(v);
    if (au > 17 || av > 17) return 0;
    var cx = Math.max(0, au - 13), cy = Math.max(0, av - 13);
    if (cx * cx + cy * cy > 16) return 0;
    var r = Math.sqrt(u * u + v * v);
    if (!back) {
      if (Math.abs(r - 12.5) < 0.6) return 12;
      if (Math.abs(r - 5) < 0.55) return 12;
      if (r < 1.5 && av < 0.6) return 12;
    } else if (Math.abs(r - 9) < 0.6) return 14;
    return 11;
  }
  /* the bowl, side-on, end over end: a half ellipse, the cream inside
     showing in a band under its rim */
  function rBowl(u, v) {
    if (v < -5.5 || v > 5.5) return 0;
    var k = (u / 12) * (u / 12) + ((v + 5.5) / 11) * ((v + 5.5) / 11);
    if (k > 1) return 0;
    if (v < -4.5) return 14;
    if (v < -2.5 && Math.abs(u) < 10.5) return 13;
    return 11;
  }
  /* the big pan and its long handle, side-on: a shallow black pan, rim
     up, its walls flaring, the handle off its right side; centred on the
     pan, so the handle swings wide as it turns */
  function rPan(u, v) {
    if (v >= -6 && v <= 6) {
      var hw = 18 - (v + 6) * 0.25;
      if (Math.abs(u) <= hw) return v < -5 ? 14 : 11;
    }
    if (u > 17 && u <= 32) {
      var mid = -4.5 - (u - 17) * 0.12;
      if (Math.abs(v - mid) <= (u > 28 ? 1.6 : 1.1)) return 11;
    }
    return 0;
  }

  /* KINDS. 0..4 fall off the upper rack; 5..9 fly in from the right. For
     each: its sprite square, its region, how it turns ('spin' end over
     end, 'flipU' about its upright, 'flipV' about its long side), its
     boxes in its own frame [u, v, size], and the sounds and colours of
     its landing. */
  var KINDS = [
    { name: 'fork',    N: 21, region: rFork,    turn: 'spin', boxes: [[6, 0, 5], [1.5, 0, 4], [-3, 0, 3], [-7, 0, 3]],
      land: 'clink', burst: [P.steelLit, P.steel] },
    { name: 'spoon',   N: 20, region: rSpoon,   turn: 'spin', boxes: [[4.5, 0, 6], [-1.5, 0, 3], [-6, 0, 3]],
      land: 'clink', burst: [P.steelLit, P.steel] },
    { name: 'knife',   N: 24, region: rKnife,   turn: 'spin', boxes: [[7, 0, 3], [2, 0, 4], [-3, 0, 4], [-8, 0, 4]],
      land: 'clink', burst: [P.steelLit, P.knifeHandle] },
    { name: 'lid',     N: 30, region: rLid,     turn: 'flipV', boxes: null,
      land: 'clank', burst: [P.tubLidLit, P.tubLid] },
    { name: 'spatula', N: 34, region: rSpatula, turn: 'spin', boxes: [[12, 0, 6], [6, 0, 6], [0, 0, 3], [-5, 0, 3], [-11, 0, 3]],
      land: 'thud', burst: [P.spatulaLit, P.spatula] },
    { name: 'tumbler', N: 22, region: rTumbler, turn: 'spin', boxes: [[4, 0, 9], [-3.5, 0, 8]], glass: true,
      land: 'clink', burst: [P.glassRim, P.glass] },
    { name: 'tub',     N: 32, region: rTub,     turn: 'spin', boxes: [[-7.5, 0, 12], [0, 0, 12], [7.5, 0, 12]], glass: true,
      land: 'clank', burst: [P.glassRim, P.tubGlass] },
    { name: 'plate',   N: 38, region: rPlate,   turn: 'flipU', boxes: null,
      land: 'clank', burst: [P.plateRing, P.plateLit] },
    { name: 'bowl',    N: 28, region: rBowl,    turn: 'spin', boxes: [[-6, -0.5, 10], [0, 0, 10], [6, -0.5, 10]],
      land: 'clank', burst: [P.enamel, P.plateLit] },
    { name: 'pan',     N: 68, region: rPan,     turn: 'spin', boxes: [[-11, 0, 11], [0, 0, 11], [11, 0, 11], [23, -5.5, 3], [29, -6.2, 3]],
      land: 'clank', burst: [P.panRim, P.pan] }
  ];
  var K_TUB_LID = 3, K_TUMBLER = 5, K_TUB = 6, K_PLATE = 7, K_BOWL = 8, K_PAN = 9;
  var FLIP_FACE = 18, PLATE_FACE = 34;

  /* a flip's frame f: how far the face is foreshortened, never quite to
     nothing (the thing has a thickness) */
  function flipK(f, face, thick) { return Math.max(thick / face, Math.abs(Math.cos(f * TAU / TURN_N))); }

  function bakeKind(K0) {
    var out = [], f;
    for (f = 0; f < TURN_N; f++) {
      if (K0.turn === 'spin') out.push(bakeTurn(K0.N, f * TAU / TURN_N, 1, 1, K0.region, TONES, K0.glass ? 0.92 : 1));
      else if (K0.turn === 'flipV') out.push(bakeTurn(K0.N, 0, 1, flipK(f, FLIP_FACE, 3), K0.region, TONES));
      else {
        var back = Math.cos(f * TAU / TURN_N) < 0;
        out.push(bakeTurn(K0.N, 0, flipK(f, PLATE_FACE, 4), 1, function (u, v) { return rPlate(u, v, back); }, TONES));
      }
    }
    return out;
  }

  /* ===================================================== THE GIFTS

     Every one a small baked sprite near its usual size (the TV's lesson:
     pickups drawn at twice their size "made the level much easier"),
     each in its own bright colours with the house outline, falling off
     the upper rack like anything else that was loose in it. */

  /* SPICY - THE HOT SAUCE, UPTURNED: the Island's clear home bottle,
     washed and put in the rack cap-DOWN, with the last of the sauce run
     down into its shoulder and neck. 9 x 19. */
  var SAUCE_ROWS = [
    '.bbbbbbb.', 'Lccccccsb', 'Lccccccsb', 'Lccccccsb', 'Lccccccsb', 'Lccccccsb', 'Lccccccsb',
    'Lccccccsb', 'Lhrrrrrdb', 'Lhrrrrrdb', 'Lrrrrrrdb', 'Lrrrrrrdb', 'Lrrrrrrdb',
    '.Lrrrrrd.', '..hrrd...', '..rrrd...', '.wwwwwww.', '.wwwwwwk.', '.kkkkkkk.'
  ];
  function bakeSauce() {
    var t = makeCanvas(11, 21);
    paintGrid(t.ctx, SAUCE_ROWS, 1, 1, { b: P.bottleShade, L: P.bottleLit, c: P.bottle, s: P.bottleShade,
      h: P.sauceHi, r: P.sauce, d: P.sauceDeep, w: P.capWhite, k: P.capShade });
    return ringUnder(t);
  }

  /* SOUR - THE LIME HALF, squeezed, the thing people drop in the
     cutlery basket to freshen the machine: rind up, the cut face down,
     the pith a white line where they meet. 13 x 9. */
  var LIME_ROWS = [
    '....LLLLR....', '..LLlllllRR..', '.Llllllllllr.', 'Llllllllllllr', 'llllllllllllr',
    'llllllllllllr', 'ppppppppppppp', 'fFffFffFffFff', '.fffffffffff.'
  ];
  function bakeLime() {
    var t = makeCanvas(15, 11);
    paintGrid(t.ctx, LIME_ROWS, 1, 1, { L: P.limeRindLit, l: P.limeRind, R: P.limeRind, r: P.limeRindDeep,
      p: P.limePith, f: P.limeFlesh, F: P.limeLit });
    return ringUnder(t);
  }

  /* SPIN - THE BEATER: one of the Counter's mixer beaters on its own in
     the rack, 10 x 16: the shank, and the four wire loops of its balloon
     turning about its own axis - six frames cover a quarter turn, which
     is all the turn there is in four loops. The near strands bright, the
     far ones dim. */
  function bakeBeater() {
    var out = [];
    for (var f = 0; f < 6; f++) {
      var t = makeCanvas(12, 18), c = t.ctx, i, y;
      rect(c, 4, 1, 3, 5, P.steelShade);
      rect(c, 4, 1, 1, 5, P.steelLit);
      rect(c, 3, 5, 5, 1, P.steel);
      for (y = 6; y < 17; y++) {
        var hw = 4.6 * Math.sin(Math.PI * (y - 5) / 12.5);
        for (i = 0; i < 8; i++) {
          var a = i * Math.PI / 4 + f * (Math.PI / 4) / 6;
          var xx = Math.round(6 + hw * Math.cos(a) - 0.5);
          dot(c, xx, y, Math.sin(a) > 0 ? P.steelLit : P.steelShade);
        }
      }
      rect(c, 4, 16, 3, 1, P.steel);
      out.push(ringUnder(t));
    }
    return out;
  }

  /* GOLD - THE SPOTLESS GLASS: a ribbed tumbler come out of the wash so
     clean it shines gold, tumbling slowly; its star glint is drawn on it
     and hops from rib to rib. */

  /* THE SPARE LIFE - THE TABLET: a dishwasher tab thrown loose in the
     rack, standing on the wires - the white body, the blue layer, the
     red ball. 14 x 10. */
  var TAB_ROWS = [
    'wwwwwwwwBBBBBB', 'WwwwwwwwBbbbbb', 'Wwwwwwwrrbbbbb', 'Wwwwwwrrrrbbbb', 'Wwwwwwrrrrbbbb',
    'Wwwwwwwrrbbbbb', 'Wwwwwwwwbbbbbb', 'Wwwwwwwwbbbbbb', 'wwwwwwwwbbbbbb', 'kkkkkkkkdddddd'
  ];
  function bakeTablet() {
    var t = makeCanvas(16, 12);
    paintGrid(t.ctx, TAB_ROWS, 1, 1, { w: P.tabWhite, W: P.white, B: P.tabBlueLit, b: P.tabBlue,
      r: P.tabRed, k: P.tabShade, d: mix(P.tabBlue, P.outline, 0.4) });
    dot(t.ctx, 8, 4, P.tabRedLit);
    return ringUnder(t);
  }

  /* ======================================================== LITTER

     Harmless, on the lower rack, in the play plane, foot on the kill
     wire: a spoon and a fork lying in the wires, a clump of foam (only
     while the suds are up) and, once a loop at most, THE CUTLERY BASKET
     (crop cutlery_basket): the grey lattice box with its handle across
     the top and the business ends of four pieces of cutlery standing up
     out of it - two spoon bowls, a fork, a knife's black handle. */
  function bakeSpoonFlat() {
    var t = makeCanvas(16, 5), c = t.ctx;
    rect(c, 1, 2, 9, 1, P.steel); rect(c, 1, 1, 9, 1, P.steelLit);
    ellipseFill(c, 12, 2.5, 3, 1.5, P.steel); rect(c, 11, 1, 3, 1, P.steelLit);
    return ringUnder(t);
  }
  function bakeForkFlat() {
    var t = makeCanvas(18, 5), c = t.ctx;
    rect(c, 1, 2, 10, 1, P.steel); rect(c, 1, 1, 10, 1, P.steelLit);
    rect(c, 11, 1, 2, 3, P.steel);
    rect(c, 13, 1, 4, 1, P.steelLit); rect(c, 13, 3, 4, 1, P.steel);
    return ringUnder(t);
  }
  function bakeFoamClump() {
    var t = makeCanvas(20, 7), c = t.ctx;
    ellipseFill(c, 10, 5, 9, 3, P.foam);
    ellipseFill(c, 7, 3.5, 4, 2.5, P.foam);
    ellipseFill(c, 13, 3, 3.5, 2.5, P.foam);
    ellipseRing(c, 6, 3, 1.5, 1.5, P.bubble); ellipseRing(c, 12, 2.5, 2, 2, P.bubble);
    ellipseRing(c, 16, 4.5, 1.2, 1.2, P.bubble);
    dot(c, 11, 1, P.bubbleLit); dot(c, 5, 2, P.bubbleLit);
    return t;
  }
  function bakeBasket() {
    var t = makeCanvas(20, 31), c = t.ctx, x, y;
    /* the cutlery standing out of it first, so the basket's lip is over it */
    ellipseFill(c, 5, 4, 2.2, 3, P.steel); dot(c, 4, 3, P.steelLit);
    ellipseFill(c, 14, 3, 2, 2.6, P.steel); dot(c, 13, 2, P.steelLit);
    rect(c, 9, 1, 1, 8, P.steel); rect(c, 8, 1, 1, 3, P.steelLit); rect(c, 10, 1, 1, 3, P.steelLit);
    rect(c, 16, 4, 2, 6, P.knifeHandle); dot(c, 16, 6, P.steelLit);
    /* the box: lattice every 4 px, the handle bar over the top */
    rect(c, 2, 9, 16, 21, P.basket);
    for (y = 11; y < 29; y += 4) for (x = 4; x < 17; x += 4) rect(c, x, y, 2, 2, P.basketHole);
    rect(c, 2, 9, 16, 1, P.basketLit); rect(c, 2, 9, 1, 21, P.basketLit);
    rect(c, 17, 9, 1, 21, mix(P.basket, P.outline, 0.4));
    rect(c, 1, 7, 18, 2, P.basket); rect(c, 1, 7, 18, 1, P.basketLit);
    return ringUnder(t);
  }

  /* ======================================================= THE SUDS

     A bubble is a ring with a glint, in three sizes; it pops through two
     baked frames - the ring breaking into an arc and four specks. */
  function bakeBubbles() {
    var out = [], D;
    for (D = 3; D <= 9; D += 2) {
      var t = makeCanvas(D + 2, D + 2), c = t.ctx, r = D / 2;
      if (D === 3) { rect(c, 2, 1, 1, 1, P.bubble); rect(c, 1, 2, 1, 1, P.bubble); rect(c, 3, 2, 1, 1, P.bubble); rect(c, 2, 3, 1, 1, P.bubble); }
      else ellipseRing(c, 1 + r, 1 + r, r, r, P.bubble);
      if (D >= 7) {
        /* a big one's film: faint, with a sheen on its lower rim */
        var film = alphaSheet(D + 2, D + 2, P.bubble, function (x, y) {
          var dx = x + 0.5 - 1 - r, dy = y + 0.5 - 1 - r;
          return dx * dx + dy * dy < (r - 0.8) * (r - 0.8) ? 0.12 : 0;
        });
        c.globalCompositeOperation = 'destination-over';
        c.drawImage(film.canvas, 0, 0);
        c.globalCompositeOperation = 'source-over';
        dot(c, Math.round(1 + r * 1.4), Math.round(1 + r * 1.6), P.bubbleLit);
      }
      dot(c, Math.round(1 + r * 0.4), Math.round(1 + r * 0.4), P.bubbleLit);
      out.push(t);
    }
    return out;
  }
  /* A BUBBLE BURSTING: a ring of drops flung out from where it was, three
     frames, widening and thinning */
  var POP_N = 3, POP_T = 0.06;
  function bakePops() {
    var out = [];
    for (var f = 0; f < POP_N; f++) {
      var t = makeCanvas(15, 15), c = t.ctx, rr = 2.5 + f * 2.2;
      for (var i = 0; i < 8; i++) {
        if (f === 2 && i % 2) continue;
        var a = i * TAU / 8 + f * 0.2;
        dot(c, Math.round(7 + Math.cos(a) * rr), Math.round(7 + Math.sin(a) * rr), i % 3 ? P.bubble : P.bubbleLit);
      }
      out.push(t);
    }
    return out;
  }

  /* ======================================================= THE LENS

     A drop of water on the camera: a disc mask for each radius (4..9),
     used to cut the turned-over patch, and its rim - a bright arc at the
     top left, a dark one at the bottom right, a two-pixel glint at ten
     o'clock - so a bead reads as a drop even when it is only a rim. */
  var LENS_R0 = 4, LENS_R1 = 9;
  function bakeLensMask(r) {
    return alphaSheet(2 * r, 2 * r, P.white, function (x, y) {
      var dx = x + 0.5 - r, dy = y + 0.5 - r;
      return dx * dx + dy * dy <= r * r ? 1 : 0;
    });
  }
  function bakeLensRim(r) {
    var D = 2 * r + 2, t = makeCanvas(D, D), c = t.ctx, n = Math.ceil(r * 8);
    for (var i = 0; i < n; i++) {
      var a = i * TAU / n, x = Math.round(r + 1 + Math.cos(a) * r - 0.5), y = Math.round(r + 1 + Math.sin(a) * r - 0.5);
      var k = Math.cos(a - Math.PI * 1.25);          /* 1 at the top left, -1 at the bottom right */
      if (k > 0.25) { c.globalAlpha = 0.55 + 0.4 * k; dot(c, x, y, P.lensLit); }
      else if (k < -0.2) { c.globalAlpha = 0.35 + 0.35 * -k; dot(c, x, y, P.lensDark); }
      else { c.globalAlpha = 0.25; dot(c, x, y, P.lensLit); }
    }
    c.globalAlpha = 1;
    var ga = Math.PI * 1.15;
    rect(c, Math.round(r + 1 + Math.cos(ga) * r * 0.55) - 1, Math.round(r + 1 + Math.sin(ga) * r * 0.55), 2, 1, P.lensLit);
    /* the drop's own faint body: a lens bends the light a little */
    var body = alphaSheet(D, D, P.white, function (x, y) {
      var dx = x + 0.5 - r - 1, dy = y + 0.5 - r - 1, d = Math.sqrt(dx * dx + dy * dy) / r;
      return d < 0.92 ? 0.06 + 0.06 * d : 0;
    });
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(body.canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ===================================================== THE PROGRAM

     The machine's program is the ladder, run on its own clock from the
     moment the pump primes (PRIME_SCORE, the third stack), with the CYCLE
     NUMBER as the escalation. Score gates only the start, so the climax
     comes when it comes whoever is flying: the HEAVY cycle by about forty
     seconds of play and its RINSE by about fifty-five (the lead's pace -
     the brief's first cycle ran 41 s and put the climax past a minute,
     where few players would ever see it). Every length is here:

                        PRE   WASH  RINSE  DRY  CLEAN
       cycle 1 AUTO      5     12     9     5     3     34 s
       cycle 2 HEAVY     2     12    12     4     3     33 s
       cycle 3+ POTS     2     12    14     3     3     34 s

     At the stock pace the pump primes at ~6 s: WASH 11..23, RINSE 23..32,
     DRY 32..37, CLEAN 37..40, HEAVY WASH 42..54, HEAVY RINSE 54..66 (the
     climax), DRY, CLEAN, POTS AND PANS from 73.

     WHAT EACH PART DOES
       PRE-RINSE  the pump runs low: the floor arm idles with a drizzle at
                  its tips, no jets; fallers only; one bead on the lens
       WASH       THE FLOOR ARM RUNS: every arm on the screen spins up
                  over a second and its two jets grow out of the rack;
                  3 s in, THE DETERGENT BURSTS; flyers; the racks rattle
       RINSE      THE MIDDLE ARM RUNS: its jets hang from the upper rack
                  and bear down. In the AUTO cycle the floor arm rests;
                  from HEAVY on BOTH ARMS RUN - THE CLIMAX
       DRY        the heater: no jets, the arms wind down, the tub fills
                  with steam, the fan pulls you back (ledger.drift, the
                  Floor's mop's own 12 px/s) and the lens dries off;
                  fallers only (things settle)
       CLEAN      THE BREATH: the sky is held (ledger.holdDrops), the pool
                  drains with a glug, three beeps, the readout flashes the
                  next cycle's name - and at its end the machine RESTARTS
                  with a slam and a shake, heavier

     ESCALATION BY CYCLE (CYC): the jets' heights, whether both arms run
     in the rinse, how many of the plain drops fly (and in pairs), what
     may fly, the arms' speed, how many beads on the lens. */
  var PRIME_SCORE = 3;
  var PROG = [
    { name: 'AUTO',      pre: 5, wash: 12, rinse: 9,  dry: 5, clean: 3 },
    { name: 'HEAVY',     pre: 2, wash: 12, rinse: 12, dry: 4, clean: 3 },
    { name: 'POTS+PANS', pre: 2, wash: 12, rinse: 14, dry: 3, clean: 3 }
  ];
  var NEXT_PHASE = { pre: 'wash', wash: 'rinse', rinse: 'dry', dry: 'clean' };
  var PHASE_WORD = { off: '- - - -', pre: 'PRE-RINSE', wash: 'WASH', rinse: 'RINSE', dry: 'DRY', clean: 'CLEAN' };
  var CYC = [
    { hUp: 85, hDown: 75, both: false, pairs: 0,   plate: false, pan: false, perL: 2.6, perU: 2.2,
      flyWash: 0.6, flyRinse: 0.45,
      lens: { pre: 1, wash: 3, rinse: 4 } },
    { hUp: 92, hDown: 82, both: true,  pairs: 0.5, plate: true,  pan: false, perL: 2.3, perU: 1.9,
      flyWash: 0.75, flyRinse: 0.6,
      lens: { pre: 1, wash: 3, rinse: 7 } },
    { hUp: 92, hDown: 82, both: true,  pairs: 0.5, plate: true,  pan: true,  perL: 2.1, perU: 1.8,
      flyWash: 0.8, flyRinse: 0.65,
      lens: { pre: 1, wash: 4, rinse: 7 } }
  ];
  function progOf(n) { return PROG[Math.min(n, PROG.length) - 1]; }
  function cycOf(n) { return CYC[Math.min(n, CYC.length) - 1]; }

  var BURST_AT = 3.0;                       /* the detergent, this far into a WASH */
  var SUDS_DECAY = [14, 20];                /* seconds the suds take to die: AUTO, HEAVY on */
  var DRY_DRIFT = 12;                       /* the fan's pull, px/s - the Floor's mop's number */
  var BEEP_AT = [0, 0.5, 1.0], FLASH_AT = 2.0;
  var RUMBLE_EVERY = 0.4, RUMBLE_A = 0.7, THRUM_EVERY = 3.0;
  var WARN_GAP = 2.7;                       /* a banner's 2.4 s and a breath */

  /* THE PARTS' RHYTHM, for the theatre: PRE light, WASH soapy, RINSE clear
     and violent, the climax the peak, DRY and CLEAN the breath */
  var FURY_OF = { off: 0, pre: 0.22, wash: 0.55, rinse: 0.8, dry: 0, clean: 0 };
  var WET_OF = { off: 0, pre: 0.35, wash: 0.65, rinse: 1, dry: 0, clean: 0 };
  var RINSE_CLEAR = 2.5, FOAM_BUILD = 4.0;
  function furyOf(S) { return climax(S) ? 1 : (FURY_OF[S.phase] || 0); }

  /* the climax: the rinse of any cycle after the first */
  function climax(S) { return S.cycle >= 2 && S.phase === 'rinse'; }
  function pumpOn(S) { return S.phase === 'pre' || S.phase === 'wash' || S.phase === 'rinse'; }

  /* THE RUNNING COUNT, read-only, for the headless checks (the Fridge's
     pattern): reset when a fresh ledger is seen, so a new run or a RETRY
     starts at nothing. What stepDrop counts it counts on the ledger
     (Pepper steps copies of the drops, and a copy's ledger is a copy) and
     stepWorld copies it here. */
  var tally = {};
  function resetTally() {
    var k;
    for (k in tally) delete tally[k];
    tally.phaseT = { off: 0, pre: 0, wash: 0, rinse: 0, dry: 0, clean: 0, climax: 0 };
    tally.pushUp = { pre: 0, wash: 0, rinse: 0, dry: 0, clean: 0, off: 0 };
    tally.pushDown = { pre: 0, wash: 0, rinse: 0, dry: 0, clean: 0, off: 0 };
    tally.fullOn = { pre: 0, wash: 0, rinse: 0, dry: 0, clean: 0, off: 0 };
    tally.lifts = 0; tally.liftFrames = 0; tally.lastLiftT = -9; tally.liftPhase = '';
    tally.stationsBorn = 0; tally.stationsRefused = 0; tally.bays = 0;
    tally.flyersBorn = 0; tally.pairs = 0; tally.fallersBorn = 0; tally.giftsBorn = 0; tally.giftsBy = {};
    tally.bubbles = 0; tally.bubblesPopped = 0;
    tally.lensFrames = 0; tally.lensInvFrames = 0; tally.lensOverLethal = 0;
    tally.rattles = 0; tally.restarts = 0; tally.beeps = 0; tally.bursts = 0;
    tally.heavyAt = -1; tally.climaxAt = -1; tally.primeAt = -1;
    tally.time = 0; tally.frames = 0;
    tally.cycle = 0; tally.phase = 'off';
    tally.c = {};
  }
  resetTally();

  /* what stepDrop counts, on the ledger (one level deep, so a forecast's
     copy of the ledger is a copy of this too) */
  function freshCounts() {
    return { blastsUp: 0, giftThrows: 0, tosses: 0, shovesDown: 0, flyerPops: 0, flyerLands: 0,
             sprayPops: 0, launched: 0, nearT: 0 };
  }

  /* THE PROGRAM'S STATE, all numbers and short strings: nothing in it is
     a list, so the ledger's copy for a forecast is right without a deep
     copy, and the tape (which freezes stepWorld) has nothing to undo. */
  function freshProg() {
    return { cycle: 1, phase: 'off', t: 0, clock: 0,
             suds: 0, sudsDecay: SUDS_DECAY[0], burst: false, cryNext: '',
             beeps: 0, rattle: 0, rattleNext: 0, rumbleT: 0, thrumT: 0,
             drain: 0, steam: 0, steamX: 0, sheenT: 0,
             wWash: false, wRinse: false, wDry: false, wFly: false, wPots: false,
             warnA: '', warnB: '', warnWait: 0,
             pairT: -1, pairKind: 0, pairY: 0,
             bubT: 0, popCryT: 0, sprayCryT: 0, hissT: 0, lensT: 0,
             fury: 0, wet: 0, flow: 0, foam: 0, burstT: -1, lensRun: 0,
             dice: (Math.random() * 4294967296) >>> 0 };
  }

  /* THE THEATRE'S OWN DICE. The bubbles and the beads on the lens are
     rolled off a stream of their own, kept on the program (mulberry32's
     arithmetic, Dice.own's), never off the game's: so making the soap
     busier or the lens wetter can never move a single stack, drop or
     gift - the run's own rolls are the same whatever the theatre does. */
  function tr(S) {
    var s = S.dice = (S.dice + 0x6D2B79F5) | 0;
    var t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  function trand(S, a, b) { return a + tr(S) * (b - a); }

  /* the program's banners go through a queue of two, spaced so a second
     never cuts a first short; the engine's own (the lid, the pump, the
     cutlery) come at scores 0, 3 and 4, before the program says a word */
  function say(S, key) {
    if (!S.warnA) S.warnA = key;
    else if (!S.warnB && S.warnA !== key) S.warnB = key;
  }
  function stepWarn(dt, L, S) {
    if (S.warnWait > 0) { S.warnWait -= dt; return; }
    if (!S.warnA) return;
    L.warn = S.warnA; S.warnA = S.warnB; S.warnB = '';
    S.warnWait = WARN_GAP;
  }
  /* one cry a frame is the engine's rule; a second one the same frame
     waits for the next */
  function cry(L, S, role) {
    if (!L.cry) L.cry = role;
    else if (!S.cryNext) S.cryNext = role;
  }

  function stepProgram(dt, run, L, S) {
    if (S.cryNext && !L.cry) { L.cry = S.cryNext; S.cryNext = ''; }
    if (S.phase === 'off') {
      if ((run.score || 0) < PRIME_SCORE) return;
      /* THE PUMP PRIMES */
      S.phase = 'pre'; S.t = 0;
      cry(L, S, 'thrum');
      L.shake = 1.4;
      tally.primeAt = run.time || 0;
    }
    S.t += dt;
    var pr = progOf(S.cycle), len = pr[S.phase];
    if (S.t >= len) {
      S.t -= len;
      if (S.phase === 'clean') {
        /* THE RESTART: heavier */
        S.cycle++; S.phase = 'pre';
        cry(L, S, 'slam'); L.shake = 2.2;
        if (S.cycle === 2) { say(S, 'heavy'); tally.heavyAt = run.time || 0; }
        else if (S.cycle === 3 && !S.wPots) { S.wPots = true; say(S, 'pots'); }
        S.suds = 0; S.burst = false; S.beeps = 0;
        tally.restarts++;
      } else {
        S.phase = NEXT_PHASE[S.phase];
        if (S.phase === 'wash') {
          cry(L, S, 'thrum'); cry(L, S, 'spray');
          S.burst = false;
          if (!S.wWash) { S.wWash = true; say(S, 'wash'); }
        } else if (S.phase === 'rinse') {
          cry(L, S, 'spray');
          if (!S.wRinse) { S.wRinse = true; say(S, 'rinse'); }
          if (S.cycle >= 2 && tally.climaxAt < 0) tally.climaxAt = run.time || 0;
        } else if (S.phase === 'dry') {
          cry(L, S, 'steam');
          if (!S.wDry) { S.wDry = true; say(S, 'dry'); }
        } else if (S.phase === 'clean') {
          cry(L, S, 'glug');
          S.beeps = 0; S.suds = 0;
        }
      }
    }

    /* THE DETERGENT, three seconds into every WASH: a pop, a fizz, the
       machine jumping, and the suds at full */
    if (S.phase === 'wash' && !S.burst && S.t >= BURST_AT) {
      S.burst = true;
      cry(L, S, 'pop'); cry(L, S, 'fizzle');
      L.shake = Math.max(L.shake || 0, 1.0);
      S.suds = 1; S.sudsDecay = SUDS_DECAY[S.cycle >= 2 ? 1 : 0];
      S.burstT = 0;
      tally.bursts++;
    }
    if (S.burstT >= 0) S.burstT += dt;
    /* the soap dies slowly in the wash, and THE RINSE CLEARS IT AWAY -
       the beat between the soapy part and the violent one */
    if (S.phase === 'clean') S.suds = 0;
    else S.suds = Math.max(0, S.suds - dt / (S.phase === 'rinse' ? RINSE_CLEAR : S.sudsDecay));
    S.foam = S.suds > S.foam ? Math.min(S.suds, S.foam + dt / FOAM_BUILD) : S.suds;

    /* THE THEATRE'S DIALS (see THE MACHINE IN FULL SPRAY): how violent the
       water is, eased between the parts so a part arrives rather than
       switches on; how wet the walls are - running in the pump's parts,
       drying off through DRY, still in CLEAN; the walls' own flow clock,
       which nearly stops when the pump does; the lens's rivulets */
    var tf = furyOf(S);
    S.fury = approach(S.fury, tf, dt * (tf > S.fury ? 1.4 : 0.8));
    if (S.phase === 'dry') S.wet = Math.max(0, S.wet - dt / (pr.dry * 0.8));
    else S.wet = approach(S.wet, WET_OF[S.phase] || 0, dt * 0.6);
    S.flow += dt * (pumpOn(S) ? 1 : 0.15);
    S.lensRun = approach(S.lensRun, S.phase === 'rinse' ? 1 : 0, dt * 0.7);

    /* THE BEEPS, and the breath */
    if (S.phase === 'clean') {
      while (S.beeps < BEEP_AT.length && S.t >= BEEP_AT[S.beeps]) { S.beeps++; cry(L, S, 'beep'); tally.beeps++; }
    }
    L.holdDrops = S.phase === 'clean';
    /* THE FAN, for the whole of DRY, eased in over its first half second */
    L.drift = S.phase === 'dry' ? DRY_DRIFT * clamp(S.t / 0.5, 0, 1) : 0;

    /* the pool: drained over CLEAN's first two seconds, back over 1.5 s */
    S.drain = S.phase === 'clean' ? Math.min(1, S.drain + dt / 2) : Math.max(0, S.drain - dt / 1.5);
    /* the steam: in over DRY's first second, out over its last */
    if (S.phase === 'dry') S.steam = Math.min(ease(S.t / 1.0), ease((pr.dry - S.t) / 1.0));
    else S.steam = Math.max(0, S.steam - dt / 0.5);
    S.steamX += ((run.speed || 0) * 0.5 + 12) * dt;
    if (pumpOn(S)) S.sheenT += dt;

    /* THE MACHINE RUMBLES through the climax: a one-pixel shake written
       every 0.4 s (Screen.shake turns it into a continuous tremor), and
       the pump's thrum every three seconds. Never in DRY or CLEAN - those
       are the breath. */
    if (climax(S)) {
      S.rumbleT -= dt;
      if (S.rumbleT <= 0) { S.rumbleT = RUMBLE_EVERY; L.shake = Math.max(L.shake || 0, RUMBLE_A); }
      S.thrumT -= dt;
      if (S.thrumT <= 0) { S.thrumT = THRUM_EVERY; cry(L, S, 'thrum'); }
    } else { S.rumbleT = 0; S.thrumT = 1.0; }
  }

  /* ======================================================== THE ARMS
     (their clock and their push)

     AN ARM STATION is the engine's spike, in the slot between two stacks
     (makeSpikes below): the tub has one lower arm and one middle arm on
     its centre line, and the tub comes round, so a station - the sump in
     the floor with the lower arm on it, and the middle arm under the
     upper rack straight over it - comes past about every other bay.

     ITS CLOCK, every frame (stepStations), off the program's part:
       the floor arm WANTS WATER in WASH, and in RINSE from HEAVY on
       the middle arm WANTS WATER in RINSE
     An arm that wants water and is ON THE SCREEN spins up and its jets
     grow, eased, over JET_RISE; one that stops wanting it lets its jets
     fall over JET_FALL. An arm with no water idles while the pump runs
     (IDLE_W) and winds down to still in DRY and CLEAN. So no jet is ever
     full before it has stood a second in plain sight: a hub enters at
     x 470 and reaches his column in 1.9..3.0 s, growing all the way.
     The two arms turn opposite ways; every field is a number on the
     station, so Buster's tape plays an arm backwards with everything else.

     THE PUSH (the engine's ledger.jetVy, approached at 2400 px/s/s): a
     jet at PUSH_MIN of its height or more, either tip, carries a doodad
     whose hitbox is in its column - PUSH.up lifts at 170 px/s, PUSH.down
     bears down at 240. Not while he is under the floor (Capybara). It
     acts in the grace too: water does not care, and he cannot be hurt.
     The brief's 150 and 70-px jets were measured first and the stock
     pilot was in a jet in 1% of WASH: the jets were scenery. At these
     heights and pushes it is lifted ten times a minute.

     WHY IT IS FAIR. A JET NEVER KILLS: it can only carry him into
     something that does, and it is a ten-pixel column, sweeping, never a
     wall, never under a stack, never full before it has stood a second
     in view. In AUTO the floor jets stand 85 (rows 157..241: a centre at
     145 or above is never in one) and the rack's 75 (to row 98: a centre
     at 110 or below is clear); from HEAVY 92 and 82, which leaves the
     climax's both-arms rinse a clear band for his centre of 118..138
     where an up tip and a down tip stand at the same x - and they are
     on two arms turning opposite ways at different speeds, so they line
     up for a moment, not for long. At the extreme gaps the clear band
     shrinks to a few pixels, and there the jet is a lift to be ridden:
     he rises at 170 px/s while in it, out of it in a fifth of a second
     at the room's speed, and he dies of it only if it carries him into
     the next cap - so the hard moment is entering a gap while a tip
     DWELLS under its mouth (a tip crosses its arm's span in half a turn,
     1.3 s in AUTO, and dwells at each end, 14..35 px short of the caps).
     The whole swing is in sight in the band, a column is crossed
     sideways in 0.2 s of steering, and LEAVING the water is the answer,
     not flapping in it. Measured: a pilot that keeps under every running
     floor jet loses nothing to the water in WASH; in the rinses, where
     the rack's jets bear down from above as well, keeping clear of both
     is the test, and the climax is where it is hardest. */
  var JET_RISE = 1.0, JET_FALL = 0.6, PUSH_MIN = 0.6;
  /* the push, as one table the headless checks may turn (read live) */
  var PUSH = { up: -170, down: 240 };
  var IDLE_W = 1.2, ARM_ACC = 1.6;
  var ARM_GAP = 2;                      /* stacks from one station to the next */

  function hubX(ob) { return ob.x + 60; }
  function tipX(ob, upper, k) {
    var R = upper ? R_UPPER : R_LOWER, th = upper ? ob.thU : ob.thL;
    return hubX(ob) + (k ? -1 : 1) * R * Math.cos(th);
  }
  /* how tall each arm's jets are now: the cycle's height on the arm's
     own eased envelope */
  function jetH(ob, upper, S) {
    var c = cycOf(S ? S.cycle : 1);
    return upper ? c.hDown * ease(ob.eU) : c.hUp * ease(ob.eL);
  }

  function stepStations(dt, obstacles, run, L, S) {
    var c = cycOf(S.cycle), on = pumpOn(S), full = false;
    var wantL = S.phase === 'wash' || (S.phase === 'rinse' && c.both), wantU = S.phase === 'rinse';
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'spike' || !ob.arm) continue;
      var seen = hubX(ob) < VW - 8;
      if (wantL && seen) {
        if (!ob.cL) { ob.cL = true; if (S.sprayCryT <= 0) { cry(L, S, 'spray'); S.sprayCryT = 0.5; } }
        ob.eL = Math.min(1, ob.eL + dt / JET_RISE);
      } else {
        ob.eL = Math.max(0, ob.eL - dt / JET_FALL);
        if (ob.eL === 0) ob.cL = false;
      }
      if (wantU && seen) {
        if (!ob.cU) { ob.cU = true; if (S.sprayCryT <= 0) { cry(L, S, 'spray'); S.sprayCryT = 0.5; } }
        ob.eU = Math.min(1, ob.eU + dt / JET_RISE);
      } else {
        ob.eU = Math.max(0, ob.eU - dt / JET_FALL);
        if (ob.eU === 0) ob.cU = false;
      }
      var wl = ob.eL > 0 ? lerp(IDLE_W, TAU / c.perL, ob.eL) : (on ? IDLE_W : 0);
      var wu = ob.eU > 0 ? lerp(IDLE_W, TAU / c.perU, ob.eU) : (on ? IDLE_W * 0.8 : 0);
      ob.wL = approach(ob.wL, wl, ARM_ACC * dt);
      ob.wU = approach(ob.wU, wu, ARM_ACC * dt);
      ob.thL += ob.wL * dt;
      ob.thU -= ob.wU * dt;
      ob.hL = jetH(ob, false, S);
      ob.hU = jetH(ob, true, S);
      if (seen && hubX(ob) > -R_LOWER && (ob.eL >= 1 || ob.eU >= 1)) full = true;
      if (ob.eL > 0 || ob.eU > 0) S.rattleOn = true;
    }
    if (S.sprayCryT > 0) S.sprayCryT -= dt;
    if (full) tally.fullOn[S.phase] += dt;
  }

  /* the push: which jet, if any, has him this frame */
  function stepPush(dt, obstacles, run, L, S) {
    var up = false, down = false, i, k;
    var px = run.px, py = run.py, hr = run.hr || 11;
    if (px !== undefined && !run.under) {
      var c = cycOf(S.cycle);
      for (i = 0; i < obstacles.length; i++) {
        var ob = obstacles[i];
        if (ob.type !== 'spike' || !ob.arm) continue;
        if (Math.abs(hubX(ob) - px) > R_LOWER + JET_W + hr) continue;
        for (k = 0; k < 2; k++) {
          if (ob.hL >= PUSH_MIN * c.hUp && Math.abs(tipX(ob, false, k) - px) < JET_W / 2 + hr &&
              py + hr > FLOOR - ob.hL) up = true;
          if (ob.hU >= PUSH_MIN * c.hDown && Math.abs(tipX(ob, true, k) - px) < JET_W / 2 + hr &&
              py - hr < CEIL + ob.hU) down = true;
        }
      }
    }
    /* never both at once at these heights (an up-jet's reach and a
       down-jet's leave 58 rows between them, more than his 22); if a
       later tune ever made it possible, the lift would win */
    L.jetVy = up ? PUSH.up : (down ? PUSH.down : 0);
    /* the counts: a LIFT is an episode, a new one after a quarter second
       clear of the water */
    if (up || down) {
      if ((run.time || 0) - tally.lastLiftT > 0.25) { tally.lifts++; tally.liftPhase = S.phase; }
      tally.lastLiftT = run.time || 0;
      tally.liftFrames++;
      if (up) tally.pushUp[S.phase]++; else tally.pushDown[S.phase]++;
      /* a hot doodad in the water steams (cosmetic), and hisses now and then */
      if (run.hot && S.hissT <= 0) { cry(L, S, 'hiss'); S.hissT = 0.5; }
    }
    if (S.hissT > 0) S.hissT -= dt;
  }

  /* THE RACKS RATTLE while any arm is running: a 0.3 s burst every 1.4
     to 2.0 s - continuous through the climax - and every stack jigs a
     pixel up and down for it, boxes and all (jig, below) */
  var view = { obs: null, run: null, rattle: false };
  function stepRattle(dt, L, S) {
    var on = S.rattleOn;
    S.rattleOn = false;
    if (S.rattle > 0) S.rattle -= dt;
    if (climax(S)) S.rattle = Math.max(S.rattle, 0.05);
    else if (on) {
      S.rattleNext -= dt;
      if (S.rattleNext <= 0) {
        S.rattleNext = rand(1.4, 2.0); S.rattle = 0.3;
        cry(L, S, 'rattle'); tally.rattles++;
      }
    }
    view.rattle = S.rattle > 0;
  }
  /* A STACK'S JIG: 0 or a pixel either way, off the stack's own age and
     seed - which the tape records, so a rewind plays the same jig back -
     and only while the racks rattle. Drawing and rectsFor both add it to
     every row of the stack. */
  function jig(ob) {
    return view.rattle ? Math.round(Math.sin((ob.age || 0) * 34 + (ob.seed || 0)) * 0.9) : 0;
  }

  /* THE FLYERS IN PAIRS, from HEAVY on: half of them have a twin of the
     same kind thrown 0.35 s after them, 36 px above or below */
  var PAIR_DT = 0.35, PAIR_DY = 36;
  function stepFlyers(dt, obstacles, run, L, S) {
    var c = cycOf(S.cycle);
    for (var i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.type !== 'drop' || ob.seenW) continue;
      ob.seenW = true;
      if (!ob.fly) {
        var gk = giftOf(ob);
        if (gk) { tally.giftsBorn++; tally.giftsBy[gk] = (tally.giftsBy[gk] || 0) + 1; } else tally.fallersBorn++;
        continue;
      }
      if (!ob.launched) { ob.seenW = false; continue; }
      tally.flyersBorn++;
      if (!S.wFly) { S.wFly = true; say(S, 'flyer'); }
      if (!ob.pair && c.pairs > 0 && S.pairT < 0 && chance(c.pairs)) {
        S.pairT = PAIR_DT; S.pairKind = ob.kind;
        var dy = chance(0.5) ? -PAIR_DY : PAIR_DY;
        if (ob.y0 + dy < FLY_Y0 || ob.y0 + dy > FLY_Y1) dy = -dy;
        S.pairY = ob.y0 + dy;
      }
    }
    if (S.pairT >= 0) {
      S.pairT -= dt;
      if (S.pairT < 0) {
        if (pumpOn(S)) {
          var tw = makeFlyer(S.pairKind, S.pairY);
          tw.launched = true; tw.pair = true; tw.cry = 'splashIn'; tw.x = VW + FLY_PEEK;
          run.born.push(tw);
          tally.pairs++;
        }
        S.pairT = -1;
      }
    }
  }

  /* ======================================================= THE SUDS

     The bubbles are the ledger's own flat list of numbers (x, y, size,
     age, life - five a bubble, at most BUB_MAX): born at the pool while
     the suds are up, four a second at full in AUTO and eight from HEAVY
     on, rising 20..40 px/s with the room going by, wobbling a pixel, and
     popping between 1.5 and 3 s old - two baked frames and a soft tick,
     no more than one tick in 0.35 s. Harmless; no box; drawn under the
     doodad. */
  var BUB_MAX = 40, BUB_N = 5, BUB_SIZES = [3, 3, 5, 5, 7, 9];
  function stepBubbles(dt, run, L, S) {
    var B = L.bub, i, sp = run.speed || 0;
    if (S.popCryT > 0) S.popCryT -= dt;
    for (i = B.length - BUB_N; i >= 0; i -= BUB_N) {
      B[i + 3] += dt;
      B[i] -= sp * dt;
      if (B[i + 3] < B[i + 4]) B[i + 1] -= (20 + (B[i + 2] - 3) * 5) * dt;
      if (B[i + 3] >= B[i + 4] + POP_N * POP_T || B[i] < -8 || B[i + 1] < CEIL + 4) {
        if (B[i + 3] >= B[i + 4]) tally.bubblesPopped++;
        B.splice(i, BUB_N);
      } else if (B[i + 3] >= B[i + 4] && B[i + 3] - dt < B[i + 4] && S.popCryT <= 0) {
        S.popCryT = 0.35; cry(L, S, 'bubble');
      }
    }
    if (S.suds > 0.3 && S.phase !== 'clean') {
      S.bubT -= dt * (S.cycle >= 2 ? 12 : 7) * S.suds;
      while (S.bubT <= 0 && B.length < BUB_MAX * BUB_N) {
        S.bubT += 1;
        B.push(trand(S, 10, VW + 40), FLOOR - 2 - trand(S, 0, 4), BUB_SIZES[Math.floor(tr(S) * BUB_SIZES.length)], 0, trand(S, 1.2, 3.0));
        tally.bubbles++;
      }
      if (S.bubT < 0) S.bubT = 0;
    }
  }

  /* ======================================================= THE LENS

     Drops on the camera: the ledger's own flat list, LENS_N numbers a
     drop (x, y, r, vy, age, state, inv, hold) - state 1 GROWING (born at
     r 4, a pixel every 1.5 s to 7..9), 2 HELD (1..4 s), 3 RUNNING (down
     the lens at 30..70 px/s with a streak behind it, gone past row 218),
     4 DRYING (DRY: a pixel off every 0.3 s, gone under 4). How many by
     part: PRE 1, WASH 3, RINSE 4 (7 in the climax), DRY none - they
     dry - and CLEAN leaves them where they are. Born at x 20..440, y
     70..100 (not higher: a fork let go off the rack is a box from its
     first frame, and a bead must already be fading when it appears),
     never over the score (x 180..300 above row 96); a centre stays in rows 70..218 and r is at most 9, so
     no bead ever touches the lid or the rack: nothing ever turns over a
     kill edge.

     THE TURN-OVER AND WHY IT IS FAIR (postBg, postChars). Inside a bead
     the patch of picture under it is drawn upside down, the way a drop of
     water turns a scene over - at `inv`, the bead's inversion alpha, which
     eases to 1 when the bead is CLEAR and to 0 when it is not over
     INV_FADE (0.12 s) - it FADES, it never blinks. A bead is clear on a
     frame when nothing that can hurt or help him - no stack's box, no
     thrown thing's (a dish still in its splash counts from the splash),
     no gift's, no jet's whole sweep, and not the doodad - is within its
     circle (r + 2) or will be within LENS_LOOK (0.16 s) at the speed it
     is going: the bead's own run down the lens included, a thing near a
     running arm allowed the jet's throw either way, the doodad allowed
     the fastest he can go either way (a flap turns a fall round in a
     frame), plus the machine's shake and a margin. So the fade-out has
     always finished before the first lethal pixel or the doodad reaches
     the bead. A bead that is not clear is a PLAIN BEAD, its rim alone over
     the true picture; a clear one is turned over and a little brighter (a
     drop gathers light), so the player can see which is which. The rule
     is a count, not a hope: lensOverLethal is every frame on which a bead
     with any inversion at all overlapped a box or the doodad, and over 48
     one-minute runs and 16 of ninety seconds it is zero, with the beads
     turned over 40% of the time they are on the lens. */
  var LENS_MAX = 8, LENS_N = 8, LENS_Y0 = 70;
  var INV_FADE = 0.12, LENS_LOOK = 0.16, LENS_PAD = 6, LENS_LIFT = 0.16;
  var lensScratch = [];
  function lensWant(S) {
    if (S.phase === 'off' || S.phase === 'dry') return 0;
    if (S.phase === 'clean') return -1;               /* as they are */
    return cycOf(S.cycle).lens[S.phase] || 0;
  }
  function lensSpot(x, y) {
    if (x > 180 && x < 300 && y < 96) return false;
    return true;
  }
  function stepLens(dt, obstacles, run, L, S) {
    var E = L.lens, i, n = E.length / LENS_N, want = lensWant(S);
    /* the drops' own lives */
    for (i = (n - 1) * LENS_N; i >= 0; i -= LENS_N) {
      E[i + 4] += dt;
      var st = E[i + 5];
      if (S.phase === 'dry' && st !== 4) { E[i + 5] = st = 4; E[i + 4] = 0; }
      if (st === 1) {
        if (E[i + 4] >= 1.5) { E[i + 4] = 0; E[i + 2]++; if (E[i + 2] >= E[i + 7]) { E[i + 5] = 2; E[i + 7] = trand(S, 1, 4); } }
      } else if (st === 2) {
        if (E[i + 4] >= E[i + 7]) { E[i + 5] = 3; E[i + 3] = trand(S, 30, 70); E[i + 4] = 0; }
      } else if (st === 3) {
        E[i + 1] += E[i + 3] * dt;
        if (E[i + 1] > 218) { E.splice(i, LENS_N); continue; }
      } else if (st === 4) {
        if (E[i + 4] >= 0.3) { E[i + 4] = 0; E[i + 2]--; if (E[i + 2] < LENS_R0) { E.splice(i, LENS_N); continue; } }
      }
    }
    /* new ones, one at a time, a beat apart */
    n = E.length / LENS_N;
    if (S.lensT > 0) S.lensT -= dt;
    if (want > 0 && n < Math.min(want, LENS_MAX) && S.lensT <= 0) {
      for (var tries = 0; tries < 6; tries++) {
        var bx = Math.round(trand(S, 20, 440)), by = Math.round(trand(S, LENS_Y0, LENS_Y0 + 30));
        if (!lensSpot(bx, by)) continue;
        E.push(bx, by, LENS_R0, 0, 0, 1, 0, 7 + Math.floor(tr(S) * 3));
        S.lensT = trand(S, 0.6, 1.4);
        break;
      }
    }
    /* clear or not, and the fade */
    n = E.length / LENS_N;
    var hit = lensHits(obstacles, run, S);
    for (i = 0; i < n * LENS_N; i += LENS_N) {
      var clear = !lensNear(hit, E[i], E[i + 1], E[i + 2], false, E[i + 5] === 3 ? E[i + 3] : 0);
      E[i + 6] = clear ? Math.min(1, E[i + 6] + dt / INV_FADE) : Math.max(0, E[i + 6] - dt / INV_FADE);
      tally.lensFrames++;
      if (E[i + 6] > 0) {
        tally.lensInvFrames++;
        if (lensNear(hit, E[i], E[i + 1], E[i + 2], true)) {
          tally.lensOverLethal++;
          tally.lensWhy = lensWhy;
        }
      }
    }
  }

  /* everything a bead must not turn over, as eight numbers each: the box
     SWEPT along its way for LENS_LOOK (for the rule), then the box as it
     is NOW (for the count). A jet is its arm's whole sweep - as tall as it
     is going to be if it is rising. The doodad is a box round his circle
     swept by the fastest he can go either way in that time: a flap turns
     a fall round in a frame. */
  function nearJet(ob, obstacles) {
    for (var i = 0; i < obstacles.length; i++) {
      var s = obstacles[i];
      if (s.type === 'spike' && s.arm && (s.eL > 0 || s.eU > 0) && Math.abs(hubX(s) - ob.x) < R_LOWER + 40) return true;
    }
    return false;
  }
  function lensHits(obstacles, run, S) {
    var H = lensScratch, sp = run.speed || 0, i, j, c = cycOf(S.cycle);
    H.length = 0;
    for (i = 0; i < obstacles.length; i++) {
      var ob = obstacles[i];
      if (ob.x > VW + 120 || ob.x < -140) continue;
      if (ob.type === 'spike' && ob.arm) {
        var hx = hubX(ob), sw = sp * LENS_LOOK;
        var hl = ob.eL > 0 || ob.cL ? c.hUp : 0, hu = ob.eU > 0 || ob.cU ? c.hDown : 0;
        if (hl > 0) H.push(hx - R_LOWER - 6 - sw, FLOOR - hl - 4, 2 * R_LOWER + 12 + sw, hl + 4,
                           hx - R_LOWER - 5, FLOOR - ob.hL, 2 * R_LOWER + 10, ob.hL);
        if (hu > 0) H.push(hx - R_UPPER - 6 - sw, CEIL, 2 * R_UPPER + 12 + sw, hu + 4,
                           hx - R_UPPER - 5, CEIL, 2 * R_UPPER + 10, ob.hU);
        continue;
      }
      if (ob.type !== 'pillar' && ob.type !== 'drop' && ob.type !== 'boon') continue;
      if (ob.type === 'drop' && ob.broken > 0) continue;
      var R = lensRectsOf(ob, [], false), X = lensRectsOf(ob, [], true);
      var vx = -sp, vy = 0, jy = ob.type === 'pillar' ? 1 : 0;
      if (ob.type === 'drop') {
        vx = -sp + (ob.fly ? -(ob.launched && ob.age >= FLY_TELL ? ob.vx : 0) : (ob.vx || 0));
        vy = ob.vy || 0;
        /* a jet can turn a thing round in a frame: near a running arm,
           allow for its throw either way */
        if (nearJet(ob, obstacles)) jy = (SHOVE_VY + 20) * LENS_LOOK;
      }
      var dx = vx * LENS_LOOK, dy = vy * LENS_LOOK;
      for (j = 0; j < R.length; j++) {
        var r = R[j], q = X[j] || [0, 0, 0, 0];
        H.push(r[0] + Math.min(0, dx), r[1] + Math.min(0, dy) - jy, r[2] + Math.abs(dx), r[3] + Math.abs(dy) + 2 * jy,
               q[0], q[1], q[2], q[3]);
      }
    }
    if (run.px !== undefined) {
      var hr = run.hr || 11, rx = 116 * LENS_LOOK + 2, ry = 545 * LENS_LOOK;
      H.push(run.px - hr - rx, run.py - hr - ry, 2 * (hr + rx), 2 * (hr + ry),
             run.px - hr, run.py - hr, 2 * hr, 2 * hr);
    }
    return H;
  }
  /* is a bead at (x, y, r) near anything: `exact` asks the boxes as they
     are against the circle's own square (the count); otherwise the swept
     boxes against the circle grown by two and the margin (the rule) - the
     margin is the machine's shake (three pixels at its hardest) and a
     little more */
  function lensNear(H, x, y, r, exact, vy) {
    var pad = exact ? 1 : 2 + LENS_PAD, o = exact ? 4 : 0;
    var x0 = x - r - pad, y0 = y - r - pad, x1 = x + r + pad, y1 = y + r + pad + (exact ? 0 : (vy || 0) * LENS_LOOK);
    for (var i = 0; i < H.length; i += 8) {
      var bx = H[i + o], by = H[i + o + 1], bw = H[i + o + 2], bh = H[i + o + 3];
      if (bw <= 0 || bh <= 0) continue;
      if (bx < x1 && bx + bw > x0 && by < y1 && by + bh > y0) {
        if (exact) lensWhy = [Math.round(x), Math.round(y), r, Math.round(bx), Math.round(by), Math.round(bw), Math.round(bh), H[i + 2], H[i + 3]].join(',');
        return true;
      }
    }
    return false;
  }
  var lensWhy = '';

  /* THE ROOM'S OWN STEP, once a frame in play: the program, the arms and
     their push, the rattle, the flyers' twins, the suds, the lens, the
     banners. Everything per run lives on run.ledger (new every run, and
     frozen with this step by pause and by Buster's tape). */
  function stepWorld(dt, obstacles, run) {
    var L = run.ledger;
    if (!L) return;
    if (!L.prog) { L.prog = freshProg(); L.dwc = freshCounts(); L.bub = []; L.lens = []; resetTally(); }
    var S = L.prog;
    if (view.force) {
      /* the headless review's hook (the TV's force): put the program in a
         part, as though it had got there */
      S.phase = view.force.phase; S.cycle = view.force.cycle; S.t = view.force.t || 0;
      if (S.phase === 'wash' && S.t < BURST_AT) S.burst = false;
      view.force = null;
    }
    S.clock += dt;
    tally.time = run.time || 0; tally.frames++;
    tally.phaseT[S.phase] += dt;
    if (climax(S)) tally.phaseT.climax += dt;
    stepProgram(dt, run, L, S);
    stepStations(dt, obstacles, run, L, S);
    stepRattle(dt, L, S);
    stepPush(dt, obstacles, run, L, S);
    stepFlyers(dt, obstacles, run, L, S);
    stepBubbles(dt, run, L, S);
    stepLens(dt, obstacles, run, L, S);
    stepWarn(dt, L, S);
    tally.cycle = S.cycle; tally.phase = S.phase; tally.c = L.dwc;
  }

  /* the program as the drawing sees it: off the run the backdrop was
     handed this frame (the ceiling and the floor are not handed one) */
  function progNow() {
    var r = view.run;
    return r && r.ledger && r.ledger.prog ? r.ledger.prog : null;
  }

  /* THE OVERLAY, the last thing on the room layer, under the doodad,
     clipped to the lane: the steam of DRY, the bubbles, and the steam off
     a hot doodad in the water. It draws off the ledger and nothing else,
     so a frame nobody steps holds still. */
  function drawOverlay(ctx, obstacles, run) {
    var L = run && run.ledger, S = L ? L.prog : null;
    if (!S) return;
    var a0 = ctx.globalAlpha, i;
    ctx.save();
    ctx.beginPath(); ctx.rect(0, CEIL, VW, LANE); ctx.clip();
    /* THE STEAM, drifting left, one sheet in two copies */
    if (S.steam > 0.004) {
      ctx.globalAlpha = a0 * S.steam;
      var sx = -Math.round(wrap(S.steamX, VW));
      ctx.drawImage(T.steam.canvas, sx, CEIL);
      ctx.drawImage(T.steam.canvas, sx + VW, CEIL);
      ctx.globalAlpha = a0;
    }
    /* THE BUBBLES */
    var B = L.bub;
    for (i = 0; B && i < B.length; i += BUB_N) {
      var bx = B[i], by = B[i + 1], sz = B[i + 2], age = B[i + 3], life = B[i + 4];
      if (age < life) {
        var wob = Math.round(Math.sin(age * 3 * TAU + bx * 0.1));
        var spr = T.bubble[(sz - 3) / 2];
        ctx.drawImage(spr.canvas, Math.round(bx + wob - spr.w / 2), Math.round(by - spr.h / 2));
      } else {
        var pf = T.pop[Math.min(POP_N - 1, Math.floor((age - life) / POP_T))];
        ctx.drawImage(pf.canvas, Math.round(bx - 7), Math.round(by - 7));
      }
    }
    /* THE CAMERA IN THE SPRAY, at the peak: a few thin, faint streaks */
    if (S.fury > 0.6) drawFrontSpray(ctx, S, run.speed || 0);
    /* a hot doodad in a jet steams */
    if (run.hot && L.jetVy && run.px !== undefined) {
      for (i = 0; i < 4; i++) {
        var k = wrap(S.clock * 2.2 + i * 0.25, 1);
        ctx.globalAlpha = a0 * (1 - k) * 0.8;
        rect(ctx, Math.round(run.px - 8 + i * 5 + Math.sin(S.clock * 7 + i) * 2), Math.round(run.py - 10 - k * 14), 2, 2, P.steam);
      }
      ctx.globalAlpha = a0;
    }
    ctx.restore();
    ctx.globalAlpha = a0;
  }

  /* ================================================ THE LENS, DRAWN

     postBg turns the room layer over inside every clear bead and postChars
     does the very same to the doodad's layer at its own device scale, off
     the same `inv` stepWorld worked out once - so the two layers agree
     frame for frame. Each bead: the patch under it copied UPSIDE DOWN
     into a scratch canvas (a mirror on whole pixels, exact), cut to the
     bead's disc, and laid back at the bead's inversion alpha. The shake
     transform is taken off first (the TV's note): the lens is on the
     camera, and the camera is what is shaking. Only in play and paused -
     the tumble after a death is the doodad's, and a bead holds plain. */
  function lensBuf(px) {
    var b = T.lensBuf;
    if (!b || b.w < px || b.h < px) b = T.lensBuf = makeCanvas(Math.max(px, 24), Math.max(px, 24));
    return b;
  }
  function lensMaskD(r, d) {
    var key = r + 'x' + d;
    if (!T.lensMaskD[key]) {
      var m = makeCanvas(2 * r * d, 2 * r * d);
      m.ctx.imageSmoothingEnabled = false;
      m.ctx.drawImage(T.lensMask[r - LENS_R0].canvas, 0, 0, 2 * r, 2 * r, 0, 0, 2 * r * d, 2 * r * d);
      T.lensMaskD[key] = m;
    }
    return T.lensMaskD[key];
  }
  function turnOver(ctx, d, run, state) {
    var L = run && run.ledger, E = L ? L.lens : null;
    if (!E || !E.length || (state !== 'play' && state !== 'paused')) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalCompositeOperation = 'source-over';
    for (var i = 0; i < E.length; i += LENS_N) {
      var inv = E[i + 6];
      if (inv <= 0.004) continue;
      var r = E[i + 2], x = Math.round(E[i]), y = Math.round(E[i + 1]), D = 2 * r * d;
      var b = lensBuf(D), c = b.ctx;
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalCompositeOperation = 'source-over'; c.globalAlpha = 1;
      c.imageSmoothingEnabled = false;
      c.clearRect(0, 0, D, D);
      c.translate(0, D); c.scale(1, -1);
      c.drawImage(ctx.canvas, (x - r) * d, (y - r) * d, D, D, 0, 0, D, D);
      c.setTransform(1, 0, 0, 1, 0, 0);
      c.globalCompositeOperation = 'destination-in';
      c.drawImage(d === 1 ? T.lensMask[r - LENS_R0].canvas : lensMaskD(r, d).canvas, 0, 0);
      /* and a drop gathers light: what it turns over it brightens */
      c.globalCompositeOperation = 'source-atop';
      c.globalAlpha = LENS_LIFT;
      c.fillStyle = P.lensLit;
      c.fillRect(0, 0, D, D);
      c.globalAlpha = 1;
      c.globalCompositeOperation = 'source-over';
      ctx.globalAlpha = inv;
      ctx.imageSmoothingEnabled = false;
      if (d !== 1) {
        /* the char layer is transparent where nothing is: clear the disc
           first, or the upright and the turned-over copies would both show */
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(lensMaskD(r, d).canvas, (x - r) * d, (y - r) * d);
        ctx.globalCompositeOperation = 'source-over';
      }
      ctx.drawImage(b.canvas, 0, 0, D, D, (x - r) * d, (y - r) * d, D, D);
    }
    ctx.restore();
  }
  function postBg(ctx, run, state) { turnOver(ctx, 1, run, state); }
  function postChars(ctx, run, state) {
    var d = ctx.canvas.width / VW;
    turnOver(ctx, d, run, state);
  }

  /* THE FRONT, over the doodad and under every number the game puts up:
     the beads' rims (they are ON the lens, so they are over everything in
     the tub, him included - a ring and a glint, never a fill), the streak
     a running bead leaves, and the machine's readout. */
  var READ_X = 466, READ_Y = 44;
  function drawFront(ctx, run, state) {
    var L = run && run.ledger, S = L ? L.prog : null;
    var a0 = ctx.globalAlpha, i;
    /* THE RINSE RUNS DOWN THE LENS: a few faint rivulets over the whole
       picture, wavering as they go - low enough that nothing under them
       is any harder to see */
    if (S && S.lensRun > 0.01 && state !== 'ready') drawLensRun(ctx, S, a0);
    if (L && L.lens && L.lens.length && state !== 'ready') {
      var E = L.lens;
      for (i = 0; i < E.length; i += LENS_N) {
        var r = E[i + 2], x = Math.round(E[i]), y = Math.round(E[i + 1]);
        if (E[i + 5] === 3) {
          for (var k = 1; k <= 10; k++) {
            ctx.globalAlpha = a0 * 0.5 * (1 - k / 11);
            dot(ctx, x, y - r - k, P.lensRun);
          }
        }
        ctx.globalAlpha = a0;
        var rim = T.lensRim[r - LENS_R0];
        ctx.drawImage(rim.canvas, x - r - 1, y - r - 1);
      }
      ctx.globalAlpha = a0;
    }
    if (state !== 'play' && state !== 'paused') return;
    drawReadout(ctx, S);
  }

  var LENS_RUNS = 7, LENS_RUN_A = 0.16;
  function drawLensRun(ctx, S, a0) {
    for (var i = 0; i < LENS_RUNS; i++) {
      var h = hash(i * 4513 + 77), x0 = 16 + h % 448;
      var v = 40 + (h >>> 8) % 50, len = 26 + (h >>> 15) % 30, span = LANE + len + 60;
      var head = CEIL - len + wrap(S.clock * v + (h >>> 3) % span, span);
      for (var k = 0; k < len; k += 1) {
        var y = Math.round(head - k);
        if (y < CEIL || y >= FLOOR) continue;
        var x = x0 + Math.round(Math.sin(y * 0.09 + i * 1.7) * 2);
        ctx.globalAlpha = a0 * LENS_RUN_A * S.lensRun * (1 - k / len);
        dot(ctx, x, y, P.lensRun);
        if (k < len / 2) dot(ctx, x + 1, y, P.lensLit);
      }
    }
    ctx.globalAlpha = a0;
  }

  /* THE READOUT, the machine's own display, on the front layer IN THE LID
     BAND at its right end, in one line: the cycle (dim), the part, and
     the time left in it as the machine counts it. Up here it can never
     sit over the mouth of a hanging stack as one comes in (the lead
     caught HEAVY RINSE printed over a column of tumblers at its first
     home under the band), and it stops short of the pause button's
     corner (x 434..474 on a touch screen) and clear of the score. Hot for
     the climax, blinking twice a second; in CLEAN's last second the next
     cycle's name, hot. Before the pump primes, four dim dashes. */
  var READ_X = 428, READ_Y = 3;
  function drawReadout(ctx, S) {
    var o = { scale: 1, colour: P.readout, shadow: P.readoutShadow, align: 'right' };
    if (!S || S.phase === 'off') {
      o.colour = P.readoutDim;
      Font.draw(ctx, PHASE_WORD.off, READ_X, READ_Y, o);
      return;
    }
    var pr = progOf(S.cycle), left = Math.max(0, Math.ceil(pr[S.phase] - S.t - 0.001));
    var hot = climax(S), blink = Math.floor(S.clock * 4) % 2 === 0;
    var time = '0:' + (left < 10 ? '0' : '') + left;
    o.colour = hot ? P.readoutHot : P.readout;
    Font.draw(ctx, time, READ_X, READ_Y, o);
    var x = READ_X - Font.measure(time, 1) - 6;
    var word = PHASE_WORD[S.phase];
    o.colour = hot && blink ? P.readoutHot : P.readout;
    Font.draw(ctx, word, x, READ_Y, o);
    x -= Font.measure(word, 1) + 6;
    var next = S.phase === 'clean' && S.t >= FLASH_AT;
    o.colour = next || hot ? (blink ? P.readoutHot : P.readout) : P.readoutDim;
    Font.draw(ctx, next ? progOf(S.cycle + 1).name : pr.name, x, READ_Y, o);
  }

  /* ======================================= THE MACHINE IN FULL SPRAY

     The owner's words: "chaotic, confusing, dank, water and soap flying
     everywhere, things spinning and shaking and bursting". Everything in
     this section is THEATRE: it has no box, it can neither kill nor help,
     and nothing that steps the game reads it. It draws off the program's
     own dials (S.fury, how violent the water is; S.wet, how wet the walls
     are; S.suds and S.foam, the soap; S.burstT, the detergent's moment;
     S.lensRun) and its clock, every drop through the house hash - so a
     paused frame drawn twice is the same frame and nothing here rolls a
     die. The parts have a rhythm, and the rhythm is the point: PRE-RINSE
     light, WASH soapy, RINSE clear and violent, THE HEAVY RINSE the peak,
     DRY steam, CLEAN calm and dripping.

     WHERE IT GOES. Almost all of it is on the room layer BEHIND the lane's
     things - drawn by the backdrop before the first stack - so every
     stack, every thrown dish, every fork and the doodad are drawn over it
     and stand out of it at 1x. What is drawn in front of them is thin and
     faint: the jets' own spray at their columns, a few streaks in the
     climax, the rinse on the lens.

     A STATELESS DROP is the i-th of a family, thrown again every T
     seconds (T its own, between T0 and T1), every throw with its own dice
     - the hash of i and the throw's number - so it is the same drop at the
     same clock whoever draws it, and a family costs nothing to keep. */
  var DQ = { k: 0, t: 0, h: 0, T: 1 };
  function dropAt(i, fam, clock, T0, T1) {
    var h = hash(i * 7919 + fam * 104729 + 17);
    var T = T0 + (h % 1000) / 1000 * (T1 - T0);
    var u = clock / T + ((h >>> 10) % 1000) / 1000, n = Math.floor(u);
    DQ.k = u - n; DQ.t = DQ.k * T; DQ.T = T; DQ.h = hash(h + n * 977 + 31);
    return DQ;
  }
  /* a streak of water: a bright head and a tail along the way it is going */
  function streak(ctx, x, y, vx, vy, len, a, a0, thick) {
    var v = Math.sqrt(vx * vx + vy * vy) || 1, ux = vx / v, uy = vy / v;
    var w = thick ? 2 : 1;
    ctx.globalAlpha = a0 * a;
    ctx.fillStyle = P.jetCore;
    ctx.fillRect(Math.round(x), Math.round(y), w, w);
    ctx.fillStyle = P.spray;
    for (var k = 1; k < len; k++) {
      ctx.globalAlpha = a0 * a * (1 - k / (len + 1));
      ctx.fillRect(Math.round(x - ux * k), Math.round(y - uy * k), w, 1);
    }
  }
  /* the racks rattle, and everything loose on them with them: a pixel
     either way, off the clock, while they do (never a kill edge - only
     what lies on the wires, the glasses above the rack, the handle) */
  function rattleDX() {
    var S = progNow();
    return view.rattle && S ? (hash(Math.floor(S.clock * 24) + 5) % 3) - 1 : 0;
  }

  /* THE WALLS RUN WITH WATER: sheets of it, each a baked strip of thin
     water with ripples running down it, at the walls' own parallax, their
     flow off the program's clock - running while the pump runs, strongest
     in the rinse, drying off through DRY, still in CLEAN */
  var SHEET_FLOW = 46, SHEET_P = 64;
  var SHEETS = [[8, 1], [40, 2], [96, 0], [150, 2], [178, 1], [232, 0], [270, 2], [318, 1], [362, 0], [400, 2], [438, 1]];
  function bakeSheet(W, seed) {
    /* a few rivulets wandering down a thin film: each a line of water a
       pixel or two wide that wavers as it runs, with beads of light
       travelling down it - the texture is periodic in SHEET_P and is
       scrolled down, so the beads run */
    var base = hexRGB(mix(P.wall, P.wallHi, 0.35)), hi = hexRGB(P.wallHi), lt = hexRGB(P.bead);
    var R = [], n = 3 + seed % 3, i;
    for (i = 0; i < n; i++) {
      var h = hash(seed * 977 + i * 131 + 3);
      R.push({ x: 3 + (i + 0.5) * (W - 6) / n + ((h % 7) - 3), w: 0.6 + (h >>> 4) % 3 * 0.35,
               f: 1 + (h >>> 7) % 2, ph: ((h >>> 9) % 100) / 100 * TAU, k: 2 + (h >>> 12) % 3, p2: ((h >>> 15) % 100) / 100 * TAU });
    }
    return pixelSheet(W, LANE + SHEET_P, function (x, y) {
      var ph = (y % SHEET_P) * TAU / SHEET_P;
      var e0 = 1.5 + 1.2 * Math.sin(ph * 2 + seed), e1 = W - 2.5 + 1.2 * Math.sin(ph * 3 + 1 + seed);
      if (x < e0 || x > e1) return null;
      var ef = Math.min(ease((x - e0) / 4), ease((e1 - x) / 4)), best = null, ba = 0.05 * ef;
      for (var j = 0; j < R.length; j++) {
        var r = R[j], cx = r.x + 1.6 * Math.sin(ph * r.f + r.ph), d = Math.abs(x + 0.5 - cx);
        if (d > r.w + 0.5) continue;
        var bead = Math.sin(ph * r.k + r.p2) > 0.82;
        var a = (bead ? 0.55 : 0.24) * (1 - d / (r.w + 0.6)) * (0.6 + 0.4 * ef);
        if (a > ba) { ba = a; best = bead ? hi : lt; }
      }
      var c = best || base;
      return [c[0], c[1], c[2], ba];
    });
  }
  /* soap clinging to the steel: a few lumps of foam, three sizes */
  function bakeFoamBlobs() {
    return [[7, 4], [10, 5], [14, 7]].map(function (sz) {
      var t = makeCanvas(sz[0] + 2, sz[1] + 2), c = t.ctx, w = sz[0], hh = sz[1];
      ellipseFill(c, 1 + w / 2, 1 + hh * 0.6, w / 2, hh * 0.45, P.foam);
      ellipseFill(c, 1 + w * 0.32, 1 + hh * 0.42, w * 0.26, hh * 0.4, P.foam);
      ellipseFill(c, 1 + w * 0.68, 1 + hh * 0.38, w * 0.22, hh * 0.36, P.foam);
      dot(c, Math.round(1 + w * 0.3), 2, P.bubbleLit);
      if (w > 8) { ellipseRing(c, 1 + w * 0.6, 1 + hh * 0.55, 1.5, 1.2, P.bubble); dot(c, Math.round(1 + w * 0.8), Math.round(hh * 0.7), P.bubble); }
      rect(c, 2, hh, w - 2, 1, mix(P.foam, P.bubble, 0.6));
      return t;
    });
  }
  /* suds lying on a stack's cap, and hanging under one */
  function bakeCapFoam(hang) {
    var t = makeCanvas(42, 5), c = t.ctx;
    for (var x = 0; x < 42; x++) {
      var h = hash(x * 389 + (hang ? 7 : 3)), top = 1 + (h % 3 === 0 ? 1 : 0) + (x < 2 || x > 39 ? 2 : 0);
      for (var y = top; y < 5; y++) dot(c, x, hang ? 4 - y : y, (h >>> 4) % 5 === 0 && y === top ? P.bubbleLit : (y === top ? P.foam : mix(P.foam, P.bubble, 0.5)));
      if (hang && h % 7 === 0) dot(c, x, 4, P.bubble);
    }
    return t;
  }

  function drawWallWater(ctx, scroll, S) {
    var off = scroll * WALL_PAR, a0 = ctx.globalAlpha, i, x;
    if (S.wet > 0.01) {
      var sy = Math.round(wrap(-S.flow * SHEET_FLOW, SHEET_P));
      ctx.globalAlpha = a0 * S.wet;
      for (i = 0; i < SHEETS.length; i++) {
        var sh = T.sheet[SHEETS[i][1]];
        for (x = wrap(SHEETS[i][0] - off, WALL_W) - WALL_W; x < VW; x += WALL_W) {
          if (x + sh.w < 0) continue;
          ctx.drawImage(sh.canvas, 0, sy, sh.w, LANE, Math.round(x), CEIL, sh.w, LANE);
        }
      }
    }
    /* THE SOAP CLINGS to the walls after the burst, and the rinse takes it */
    if (S.suds > 0.03) {
      ctx.globalAlpha = a0 * Math.min(1, S.suds * 1.3) * 0.9;
      for (i = 0; i < WALL_FOAM; i++) {
        var h = hash(i * 2741 + 13), fb = T.foamBlob[h % 3];
        var wy = CEIL + 12 + (h >>> 5) % (LANE - 30);
        /* and it slides: a little way down the steel over the soap's life,
           leaving a wet trail */
        var slide = Math.round((1 - S.suds) * (6 + (h >>> 21) % 14));
        for (x = wrap((h >>> 13) % WALL_W - off, WALL_W) - WALL_W; x < VW; x += WALL_W) {
          if (x + fb.w < 0) continue;
          if (slide > 1) rect(ctx, Math.round(x) + (fb.w >> 1), wy, 1, slide, P.beadRun);
          ctx.drawImage(fb.canvas, Math.round(x), wy + slide);
        }
      }
    }
    ctx.globalAlpha = a0;
  }
  var WALL_FOAM = 17;

  /* THE SPRAY, behind the lane's things. AMBIENT: the rest of the tub in
     full spray - streaks thrown up off the floor's arms in the wash, down
     off the rack's in the rinse, both ways in the climax, SPRAY_N of them
     at full fury (dozens on the screen at the peak, a handful in PRE).
     FROM THE ARMS: a fan off the tips of every arm on the screen that has
     water. And the DETERGENT'S BURST: lumps of foam thrown up out of the
     rack for two and a half seconds. */
  var SPRAY_N = 96, TIP_N = 16, FOAM_THROW = 26, FOAM_T = 2.6, HAZE_A = 0.3;
  var SLOSH_EVERY = 0.55, SLOSH_LIFE = 0.75, SLOSH_N = 22;
  function drawSpray(ctx, S, obs, sp) {
    var a0 = ctx.globalAlpha, i, j, q;
    /* THE AIR IS WET: a thin haze of spray drifting through the tub, as
       thick as the water is violent */
    if (S.fury > 0.05) {
      ctx.globalAlpha = a0 * HAZE_A * S.fury;
      var hx0 = -Math.round(wrap(S.steamX * 1.3, VW));
      ctx.drawImage(T.steam.canvas, hx0, CEIL);
      ctx.drawImage(T.steam.canvas, hx0 + VW, CEIL);
      ctx.globalAlpha = a0;
    }
    /* and round every running jet, the cloud of spray it stands in */
    for (i = 0; obs && i < obs.length; i++) {
      var so = obs[i];
      if (so.type !== 'spike' || !so.arm) continue;
      for (var up2 = 0; up2 < 2; up2++) {
        var hj = up2 ? so.hU : so.hL;
        if (hj < 2) continue;
        for (var kk = 0; kk < 2; kk++) {
          var px = Math.round(tipX(so, up2 === 1, kk));
          if (px < -30 || px > VW + 30) continue;
          ctx.globalAlpha = a0 * (0.75 + 0.25 * Math.sin(S.clock * 17 + kk * 2 + so.seed));
          var ph2 = Math.round(hj * 1.25);
          var pl = up2 ? T.plumeDown : T.plume;
          ctx.drawImage(pl.canvas, 0, 0, pl.w, pl.h, px - pl.w / 2, up2 ? CEIL : FLOOR - ph2, pl.w, ph2);
        }
      }
    }
    ctx.globalAlpha = a0;
    var n = Math.round(SPRAY_N * S.fury), rinse = S.phase === 'rinse', both = climax(S);
    for (i = 0; i < n; i++) {
      q = dropAt(i, 1, S.clock, 0.6, 1.2);
      var h = q.h, down = rinse && (!both || h % 2 === 0), t = q.t, g = 620;
      var vx = (h >>> 9) % 260 - 130 - sp * 0.5;
      var vy = down ? 40 + (h >>> 17) % 180 : -(240 + (h >>> 17) % 230);
      var x = h % 560 - 40 + vx * t, y = (down ? CEIL + 1 : FLOOR - 1) + vy * t + 0.5 * g * t * t;
      if (y >= FLOOR - 1 || y <= CEIL || x < -4 || x > VW + 4) continue;
      streak(ctx, x, y, vx, vy + g * t, 4 + h % 4, 0.85 * (1 - 0.45 * q.k), a0, h % 3 === 0);
    }
    for (i = 0; obs && i < obs.length; i++) {
      var ob = obs[i];
      if (ob.type !== 'spike' || !ob.arm) continue;
      var hx = hubX(ob);
      if (hx < -80 || hx > VW + 80) continue;
      for (var arm = 0; arm < 2; arm++) {
        var e = arm ? ob.eU : ob.eL;
        if (e <= 0.05) continue;
        var m = Math.round(TIP_N * (0.6 + S.fury) * e);
        for (j = 0; j < m; j++) {
          q = dropAt(j, 7 + arm * 3 + (ob.seed % 1000) * 11, S.clock, 0.35, 0.7);
          var hh = q.h, t2 = q.t, side = (hh >>> 3) % 2 ? 1 : -1;
          var tx = tipX(ob, arm === 1, hh % 2);
          var vx2 = side * (20 + (hh >>> 5) % 130) - sp * 0.3;
          var vy2 = arm ? 60 + (hh >>> 12) % 180 : -(190 + (hh >>> 12) % 230);
          var x2 = tx + vx2 * t2, y2 = (arm ? CEIL + 2 : FLOOR - 2) + vy2 * t2 + 0.5 * 600 * t2 * t2;
          if (y2 >= FLOOR - 1 || y2 <= CEIL) continue;
          streak(ctx, x2, y2, vx2, vy2 + 600 * t2, 4 + hh % 3, 0.85 * (1 - q.k), a0, hh % 4 === 0);
        }
      }
    }
    /* THE SLOSH: in the rinses the water does not only spray, it bursts -
       a sheet of it thrown up off the rack or down off the upper one,
       somewhere along the tub, every SLOSH_EVERY seconds, the last two in
       the air at once */
    if (S.phase === 'rinse') {
      var nb = Math.floor(S.clock / SLOSH_EVERY);
      for (var b = nb - 1; b <= nb; b++) {
        var hs = hash(b * 6151 + 29), tb0 = S.clock - b * SLOSH_EVERY;
        if (tb0 > SLOSH_LIFE || (!both && hs % 3 === 0)) continue;
        var fromLid = both ? hs % 2 === 0 : (hs >>> 3) % 2 === 0, bx0 = 30 + (hs >>> 5) % 420 - sp * 0.5 * tb0;
        for (j = 0; j < SLOSH_N * S.fury; j++) {
          var hd = hash(hs + j * 131), ang = ((hd % 1000) / 1000 - 0.5) * 2.2, spd = 160 + (hd >>> 10) % 220;
          var vxs = Math.sin(ang) * spd, vys = (fromLid ? 1 : -1) * Math.cos(ang) * spd;
          var xs = bx0 + vxs * tb0, ys = (fromLid ? CEIL + 1 : FLOOR - 1) + vys * tb0 + 300 * tb0 * tb0;
          if (ys >= FLOOR - 1 || ys <= CEIL) continue;
          streak(ctx, xs, ys, vxs, vys + 600 * tb0, 3 + hd % 3, 0.9 * (1 - tb0 / SLOSH_LIFE), a0, hd % 3 === 0);
        }
      }
    }
    if (S.burstT >= 0 && S.burstT < FOAM_T && S.suds > 0.05) {
      for (i = 0; i < FOAM_THROW; i++) {
        var hf = hash(i * 3571 + S.cycle * 131 + 7), t3 = S.burstT - (hf % 50) / 100;
        if (t3 < 0) continue;
        var vy3 = -(250 + (hf >>> 7) % 230), vx3 = (hf >>> 15) % 140 - 70 - sp * 0.5;
        var x3 = 20 + (hf >>> 3) % 440 + vx3 * t3, y3 = FLOOR - 3 + vy3 * t3 + 0.5 * 520 * t3 * t3;
        if (y3 >= FLOOR - 2 || y3 <= CEIL) continue;
        var fb = T.foamBlob[hf % 3];
        ctx.globalAlpha = a0 * 0.9 * (1 - S.burstT / FOAM_T);
        ctx.drawImage(fb.canvas, Math.round(x3 - fb.w / 2), Math.round(y3 - fb.h / 2));
      }
    }
    ctx.globalAlpha = a0;
  }

  /* IN FRONT, at the peak only: a few thin, faint streaks across the
     picture - the camera itself in the spray - never enough to hide a
     thing */
  var FRONT_N = 16, FRONT_A = 0.32;
  function drawFrontSpray(ctx, S, sp) {
    var n = Math.round(FRONT_N * clamp((S.fury - 0.6) / 0.4, 0, 1)), a0 = ctx.globalAlpha;
    for (var i = 0; i < n; i++) {
      var q = dropAt(i, 3, S.clock, 0.4, 0.8), h = q.h, t = q.t, down = h % 2 === 0;
      var vx = (h >>> 9) % 260 - 130 - sp * 0.5, vy = down ? 120 + (h >>> 17) % 200 : -(300 + (h >>> 17) % 200);
      var x = h % 520 - 20 + vx * t, y = (down ? CEIL + 2 : FLOOR - 2) + vy * t + 0.5 * 700 * t * t;
      if (y >= FLOOR - 1 || y <= CEIL) continue;
      streak(ctx, x, y, vx, vy + 700 * t, 4, FRONT_A * (1 - q.k), a0);
    }
    ctx.globalAlpha = a0;
  }

  /* THE UPPER RACK DRIPS, all the time the pump runs and on into CLEAN:
     a drop off the wires, falling in the room (so it goes by with it),
     and a pixel or two of splash on the lower rack */
  var DRIPS_OF = { off: 0, pre: 14, wash: 24, rinse: 32, dry: 14, clean: 22 }, DRIP_G = 520;
  function drawDrips(ctx, scroll, S) {
    var n = climax(S) ? 42 : (DRIPS_OF[S.phase] || 0), a0 = ctx.globalAlpha;
    var tl = Math.sqrt(2 * (LANE - 3) / DRIP_G);
    for (var i = 0; i < n; i++) {
      var q = dropAt(i, 5, S.clock, tl + 0.2, tl + 0.8), h = q.h, t = q.t;
      var x = Math.round(wrap(h % LOOP - scroll, LOOP));
      if (x > VW + 2) continue;
      if (t < tl) {
        ctx.globalAlpha = a0 * 0.75;
        rect(ctx, x, Math.round(CEIL + 1 + 0.5 * DRIP_G * t * t), 1, t > 0.2 ? 2 : 1, P.spray);
      } else if (t < tl + 0.14) {
        var k = (t - tl) / 0.14;
        ctx.globalAlpha = a0 * (1 - k);
        dot(ctx, x - 1 - Math.round(k * 2), FLOOR - 2 - Math.round(k * 2), P.spray);
        dot(ctx, x + 1 + Math.round(k * 2), FLOOR - 2 - Math.round(k * 1.5), P.jetCore);
      }
    }
    ctx.globalAlpha = a0;
  }

  /* THE ARM IS SEEN TURNING: behind each tip, the way it has come, a
     short fading trail at its nozzles' row - water if the arm has any,
     a glint of steel if not - longer the faster the tip is crossing */
  function drawTipTrail(ctx, ob, upper, y) {
    var w = upper ? -ob.wU : ob.wL, R = upper ? R_UPPER : R_LOWER, th = upper ? ob.thU : ob.thL;
    var e = upper ? ob.eU : ob.eL, a0 = ctx.globalAlpha;
    if (Math.abs(w) < 0.3) return;
    for (var k = 0; k < 2; k++) {
      var vx = (k ? 1 : -1) * R * Math.sin(th) * w, tx = tipX(ob, upper, k);
      var n = Math.min(7, Math.round(Math.abs(vx) / 22)), dir = vx > 0 ? -1 : 1;
      for (var i = 1; i <= n; i++) {
        ctx.globalAlpha = a0 * (e > 0.05 ? 0.8 : 0.5) * (1 - i / (n + 1));
        dot(ctx, Math.round(tx + dir * i * 2), y + (i % 2), e > 0.05 ? (i % 2 ? P.spray : P.jetCore) : P.steelLit);
      }
    }
    ctx.globalAlpha = a0;
  }

  /* A JET'S OWN WATER, drawn at its column: drops shed off its sides and
     arcing away; at its root, where it bursts through the rack, a fan of
     drops splashing out along the wires and a puff of mist; at its free
     end, water raining back down. None of it pushes - the push is the
     column's body, JET_W, as measured. */
  function jetTheatre(ctx, ob, upper, k, tx, h, cl, a0, far) {
    var i, q, fa = far ? 0.7 : 1, fam = (ob.seed % 997) * 13 + (upper ? 5 : 0) + k * 2;
    var root = upper ? CEIL : FLOOR, dir = upper ? 1 : -1;
    for (i = 0; i < 10; i++) {
      q = dropAt(i, fam, cl, 0.35, 0.6);
      var hq = q.h, side = hq % 2 ? 1 : -1, t = q.t;
      var y0 = root + dir * h * (0.1 + 0.85 * ((hq >>> 3) % 100) / 100);
      var vx = side * (40 + (hq >>> 10) % 90), vy = upper ? 10 + (hq >>> 17) % 70 : -(30 + (hq >>> 17) % 90);
      var x = tx + side * 7 + vx * t, y = y0 + vy * t + 260 * t * t;
      if (y >= FLOOR - 1 || y <= CEIL) continue;
      ctx.globalAlpha = a0 * fa * (1 - q.k) * 0.9;
      dot(ctx, Math.round(x), Math.round(y), hq % 3 ? P.spray : P.jetCore);
      if (hq % 4 === 0) dot(ctx, Math.round(x - side), Math.round(y - 1), P.jet);
    }
    ctx.globalAlpha = a0 * fa * (0.4 + 0.2 * Math.sin(cl * 23 + k * 2 + ob.seed));
    ctx.drawImage(T.mist.canvas, Math.round(tx) - 20, upper ? CEIL : FLOOR - 12);
    for (i = 0; i < 12; i++) {
      q = dropAt(i, fam + 101, cl, 0.25, 0.42);
      var hb = q.h, sd = hb % 2 ? 1 : -1, tb = q.t;
      var vxb = sd * (60 + (hb >>> 4) % 110), vyb = upper ? 10 + (hb >>> 12) % 60 : -(60 + (hb >>> 12) % 120);
      var xb = tx + sd * 3 + vxb * tb, yb = (upper ? CEIL + 1 : FLOOR - 1) + vyb * tb + 450 * tb * tb;
      if (yb >= FLOOR - 1 || yb < CEIL) continue;
      ctx.globalAlpha = a0 * fa * (1 - q.k);
      dot(ctx, Math.round(xb), Math.round(yb), hb % 3 ? P.spray : P.jetCore);
    }
    for (i = 0; i < 7; i++) {
      q = dropAt(i, fam + 211, cl, 0.5, 0.8);
      var hr = q.h, tr = q.t, sx = (hr % 23) - 11;
      var y1 = upper ? CEIL + h : FLOOR - h - 3, vyr = upper ? 40 : -(30 + (hr >>> 6) % 60);
      var xr = tx + sx * (1 + 2 * tr), yr = y1 + vyr * tr + 300 * tr * tr;
      if (yr >= FLOOR - 1 || yr <= CEIL) continue;
      ctx.globalAlpha = a0 * fa * (1 - q.k * 0.7);
      rect(ctx, Math.round(xr), Math.round(yr), 1, 2, P.spray);
    }
    ctx.globalAlpha = a0;
  }

  /* ========================================================= BUILD */

  function build() {
    T.wall = bakeWall();
    T.vig = bakeVignette(1);
    T.vigMenu = bakeVignette(0.7);
    T.lid = bakeLid();
    T.handle = bakeHandle();
    T.ground = bakeGround();
    T.sheen = [bakeSheen(0), bakeSheen(1 / 3), bakeSheen(2 / 3)];
    T.foam = bakeFoam();
    T.steam = bakeSteam();

    T.plates = [bakePlates(0), bakePlates(1)];
    T.glasses = [bakeGlasses(0), bakeGlasses(1)];
    T.capStand = [bakeCapStand(0), bakeCapStand(1)];
    T.capHang = [bakeCapHang(0), bakeCapHang(1)];

    T.armLow = bakeArm(R_LOWER, true);
    T.armMid = bakeArm(R_UPPER, false);
    T.jetTex = [];
    for (var jv = 0; jv < JET_VARS; jv++) T.jetTex.push(bakeJetTex(jv));
    T.mist = bakeMist();
    T.plume = bakePlume(false);
    T.plumeDown = bakePlume(true);
    T.sheet = [bakeSheet(26, 1), bakeSheet(40, 2), bakeSheet(34, 3)];
    T.foamBlob = bakeFoamBlobs();
    T.capFoam = bakeCapFoam(false);
    T.capFoamH = bakeCapFoam(true);
    T.fray = bakeFray();
    T.frayDown = bakeFrayDown();
    T.sump = bakeSump();
    T.swirl = bakeSwirl();

    T.kind = KINDS.map(bakeKind);
    /* and by name, for the stands' seat and the headless review */
    KINDS.forEach(function (K0, i) { T['loose_' + K0.name] = T.kind[i]; });
    T.goldGlass = bakeKind({ N: 22, region: rGoldTumbler, turn: 'spin' });
    T.sauce = bakeSauce();
    T.lime = bakeLime();
    T.beater = bakeBeater();
    T.tablet = bakeTablet();
    T.flare = bakeFlares();

    T.spoonFlat = bakeSpoonFlat();
    T.forkFlat = bakeForkFlat();
    T.foamClump = bakeFoamClump();
    T.basket = bakeBasket();
    T.bubble = bakeBubbles();
    T.pop = bakePops();

    T.lensMask = []; T.lensRim = []; T.lensMaskD = {};
    for (var r = LENS_R0; r <= LENS_R1; r++) { T.lensMask.push(bakeLensMask(r)); T.lensRim.push(bakeLensRim(r)); }
    T.lensBuf = null;
  }

  /* THE TELL OF A FLYER: a splash bursting at the edge of the picture,
     three frames cycled fast, with a left-pointing chevron in the water's
     white - the thing is about to come out of the spray, here, at this
     height */
  function bakeFlares() {
    var out = [];
    for (var f = 0; f < 3; f++) {
      var t = makeCanvas(18, 18), c = t.ctx;
      var a = alphaSheet(18, 18, P.jet, function (x, y) {
        var dx = (x + 0.5 - 13) / 8, dy = (y + 0.5 - 9) / 8, d = Math.sqrt(dx * dx + dy * dy);
        return d < 1 ? 0.8 * (1 - d) : 0;
      });
      c.drawImage(a.canvas, 0, 0);
      for (var i = 0; i < 16; i++) {
        var h = hash(f * 4111 + i * 37 + 9), ang = (h % 360) * TAU / 360, rr = 2 + (h >>> 9) % 8;
        dot(c, Math.round(13 + Math.cos(ang) * rr), Math.round(9 + Math.sin(ang) * rr), i % 3 ? P.spray : P.jetCore);
      }
      rect(c, 11, 8, 4, 3, P.jetCore);
      out.push(t);
    }
    return out;
  }

  /* ======================================================= DRAWING */

  /* THE WALLS, at 0.37, and the camera's light falling away over them.
     The list and the run are kept for the ceiling and the floor, which
     come later in the same frame and draw the arms off them (the TV's
     view.obs) - read for drawing and nothing else. */
  function drawBackdrop(ctx, scroll, obstacles, run) {
    view.obs = obstacles || null;
    view.run = run || null;
    tileX(ctx, T.wall.canvas, scroll * WALL_PAR, CEIL);
    var S = progNow();
    if (S) drawWallWater(ctx, scroll, S);
    drawRunnels(ctx, scroll, S ? S.flow : 0, S ? 0.5 + 1.3 * S.wet : 0.5);
    ctx.drawImage(T.vig.canvas, 0, CEIL);
    /* the spray and the drips go on here, behind every stack and every
       thrown thing: see THE MACHINE IN FULL SPRAY */
    if (S) {
      drawSpray(ctx, S, view.obs, run && run.speed || 0);
      drawDrips(ctx, scroll, S);
    }
  }

  /* THE WALLS RUN WITH WATER: drops sliding down the steel at the wall's
     own parallax, each leaving a short wet streak above it - RUNNELS a
     wall loop, at hashed places on the sheet and their own speeds, off
     the program's clock (so a pause holds them), twice as many while the
     pump runs. A drop is two pixels; it is the wall being wet, never a
     thing in the room. */
  var RUNNELS = 22;
  function drawRunnels(ctx, scroll, clock, k) {
    var off = scroll * WALL_PAR, a0 = ctx.globalAlpha;
    for (var i = 0; i < Math.round(RUNNELS * k); i++) {
      var h = hash(i * 6967 + 41), wx = h % WALL_W;
      var v = 9 + (h >>> 9) % 18, len = LANE + 30;
      var y = CEIL - 10 + wrap(clock * v + (h >>> 3) % len, len);
      if (y > FLOOR - 2) continue;
      var x = wrap(wx - off, WALL_W);
      for (; x < VW + 2; x += WALL_W) {
        var xi = Math.round(x);
        if (xi < 0 || xi >= VW) continue;
        ctx.globalAlpha = a0 * 0.55;
        rect(ctx, xi, Math.max(CEIL, Math.round(y) - 7), 1, Math.min(7, Math.round(y) - CEIL), P.beadRun);
        ctx.globalAlpha = a0;
        rect(ctx, xi, Math.round(y), 1, 2, P.bead);
        dot(ctx, xi, Math.round(y), P.wallHi);
      }
    }
    ctx.globalAlpha = a0;
  }

  /* THE LID: the rack's underside, the middle arm of every station
     turning in its recess with the top of its jets coming out of its
     nozzles, and the DOODADS handle over all of it, once a loop */
  function drawCeiling(ctx, scroll) {
    var jx = rattleDX();
    tileX(ctx, T.lid.canvas, scroll - jx, 0);
    var obs = view.obs, S = progNow(), i, k;
    if (obs) {
      for (i = 0; i < obs.length; i++) {
        var ob = obs[i];
        if (ob.type !== 'spike' || !ob.arm) continue;
        var hx = Math.round(hubX(ob));
        if (hx < -R_UPPER - 10 || hx > VW + R_UPPER + 10) continue;
        /* the feed it hangs from */
        rect(ctx, hx - 3, 6, 6, 7, P.hubDeep);
        rect(ctx, hx - 3, 6, 2, 7, P.steel);
        var fr = T.armMid[armFrame(ob.thU)];
        ctx.drawImage(fr.canvas, hx - fr.w / 2, LID_ARM_Y);
        drawTipTrail(ctx, ob, true, LID_ARM_Y + 6);
        /* the jets leaving the nozzles, down to the arris - which stays a
           whole bright wire across them */
        if (ob.hU > 0.5) {
          for (k = 0; k < 2; k++) {
            var tx = Math.round(tipX(ob, true, k)) - JET_DRAW / 2;
            ctx.drawImage(T.jetTex[0].canvas, 0, 0, JET_DRAW, 23 - (LID_ARM_Y + 7), tx, LID_ARM_Y + 7, JET_DRAW, 23 - (LID_ARM_Y + 7));
          }
        }
      }
    }
    for (var x = wrap(HANDLE_X - HANDLE_W / 2 - scroll, LOOP) - LOOP; x < VW; x += LOOP) {
      if (x > -HANDLE_W) ctx.drawImage(T.handle.canvas, Math.round(x) + jx, 14);
    }
  }

  /* THE GROUND: the rack and the tub floor; the pool's sheen (sloshing
     while the pump runs, lower while CLEAN drains it); the foam the suds
     leave; and every station's sump, the swirl into it while it drains,
     the lower arm turning over it and the foot of its jets coming up
     through the rack - the kill wire stays one whole bright line across
     them */
  function drawFloor(ctx, scroll) {
    var S = progNow(), i, k, jx = rattleDX();
    tileX(ctx, T.ground.canvas, scroll - jx, FLOOR);
    var dr = S ? Math.round(S.drain * 4) : 0;
    if (dr > 0) rect(ctx, 0, POOL_Y, VW, dr, P.floor);
    var sf = S && pumpOn(S) ? Math.floor(S.sheenT * 7.5) % 3 : 0;
    tileX(ctx, T.sheen[sf].canvas, scroll, POOL_Y + dr);
    if (S && S.suds > 0.02) {
      /* THE FOAM LINE BUILDS after the burst, row by row up from the
         rack's floor, and goes with the suds */
      var a0 = ctx.globalAlpha, fr0 = Math.max(1, Math.round(T.foam.h * S.foam));
      ctx.globalAlpha = a0 * Math.min(1, S.suds * 0.8 + 0.2);
      var fy = FLOOR + 2 + T.foam.h - fr0, fo = -Math.round(wrap(scroll, LOOP));
      for (var fx = fo; fx < VW; fx += LOOP) ctx.drawImage(T.foam.canvas, 0, T.foam.h - fr0, LOOP, fr0, fx, fy, LOOP, fr0);
      ctx.globalAlpha = a0;
    }
    var obs = view.obs;
    if (!obs) return;
    for (i = 0; i < obs.length; i++) {
      var ob = obs[i];
      if (ob.type !== 'spike' || !ob.arm) continue;
      var hx = Math.round(hubX(ob));
      if (hx < -R_LOWER - 10 || hx > VW + R_LOWER + 10) continue;
      ctx.drawImage(T.sump.canvas, hx - 24, POOL_Y - 4 + dr);
      if (S && S.phase === 'clean' && S.drain > 0.05) {
        var ga = ctx.globalAlpha;
        ctx.globalAlpha = ga * Math.min(1, S.drain * 1.5);
        ctx.drawImage(T.swirl[Math.floor(S.clock * 10) % 4].canvas, hx - 22, POOL_Y - 2 + dr);
        ctx.globalAlpha = ga;
      }
      var fr = T.armLow[armFrame(ob.thL)];
      ctx.drawImage(fr.canvas, hx - fr.w / 2, GROUND_ARM_Y);
      drawTipTrail(ctx, ob, false, GROUND_ARM_Y + 3);
      if (ob.hL > 0.5) {
        for (k = 0; k < 2; k++) {
          var tx = Math.round(tipX(ob, false, k));
          ctx.drawImage(T.jetTex[0].canvas, 0, 0, JET_DRAW, 7, tx - JET_DRAW / 2, FLOOR + 1, JET_DRAW, 7);
          /* the water churning where it leaves the nozzle, under the rack */
          var cl = S ? S.clock : 0;
          for (var j = 0; j < 4; j++) {
            var h = hash(ob.seed + k * 31 + j * 7 + Math.floor(cl * 20) * 13);
            dot(ctx, tx - 7 + h % 15, FLOOR + 2 + (h >>> 6) % 4, j % 2 ? P.spray : P.jetCore);
          }
        }
      }
    }
  }

  /* THE CALM DISHWASHER for any menu pointed at it: the pump OFF - the
     walls at their parallax, the rack and the DOODADS handle, the pool
     still, one slow drip off the upper rack every two seconds, and the
     camera's falloff a little stronger. No stacks, no arms, no jets, no
     bubbles, no beads, no readout. */
  function drawMenuBackdrop(ctx, scroll) {
    var s = scroll * 0.6;
    var keepObs = view.obs, keepRun = view.run;
    view.obs = null; view.run = null;
    tileX(ctx, T.wall.canvas, s * WALL_PAR, CEIL);
    drawRunnels(ctx, s, scroll / 40, 0.5);
    ctx.drawImage(T.vigMenu.canvas, 0, CEIL);
    drawCeiling(ctx, s);
    drawFloor(ctx, s);
    /* THE DRIP: off the menu's own scroll, one every two seconds at a
       hashed x, falling 40 px as a short streak */
    var t = scroll / 30, n = Math.floor(t / 2), k = wrap(t, 2) / 0.9;
    if (k < 1) {
      var dx = 60 + hash(n * 7919 + 3) % 360, dy = CEIL + 1 + Math.round(k * k * 40);
      rect(ctx, dx, dy, 1, 3, P.spray);
      dot(ctx, dx, dy + 3, P.jetCore);
    }
    view.obs = keepObs; view.run = keepRun;
  }

  /* ------------------------------------------------------- the stacks */
  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x), j = jig(ob);
    var topEnd = ob.gapY - 9 + j, botY = ob.gapY + ob.gapH + j, colY = botY + 9;
    if (topEnd > CEIL) columnUp(ctx, T.glasses[ob.vH].canvas, x, CEIL, topEnd - CEIL);
    if (FLOOR > colY) columnDown(ctx, T.plates[ob.vS].canvas, x, colY, FLOOR - colY);
    ctx.drawImage(T.capHang[ob.capHang].canvas, x - 4, topEnd);
    ctx.drawImage(T.capStand[ob.capStand].canvas, x - 4, botY);
    /* SUDS on the caps while the soap is up: lying on the plates' cap,
       hanging under the glasses' - inside each cap's own rows but for a
       pixel of froth, so no edge moves */
    var S = progNow();
    if (S && S.suds > 0.05) {
      var a0 = ctx.globalAlpha;
      ctx.globalAlpha = a0 * Math.min(1, S.suds * 1.4);
      ctx.drawImage(T.capFoam.canvas, x - 4, botY - 1);
      ctx.drawImage(T.capFoamH.canvas, x - 4, topEnd + 5);
      ctx.globalAlpha = a0;
    }
  }

  /* --------------------------------------------- the jets, in the lane

     Each live tip's column: up from the rack for the floor arm, down from
     the upper rack for the middle arm, the water flowing OUT of the
     nozzle along it (the texture's offset runs with the program's clock,
     anchored at the nozzle so a rising jet does not slide), fraying into
     spray at its free end. The far tip's jet is a shade dimmer than the
     near one's. In PRE-RINSE the floor arm idles with a DRIZZLE at its
     tips: a few drops of spray, no column, no push. */
  var JET_FLOW = 150;
  function drawStation(ctx, ob) {
    var S = progNow(), cl = S ? S.clock : (ob.age || 0), k, i;
    var hx = hubX(ob);
    if (hx < -R_LOWER - 12 || hx > VW + R_LOWER + 12) return;
    var a0 = ctx.globalAlpha, B = Math.floor(cl * JET_FLOW), jv = Math.floor(cl * 14) % JET_VARS;
    for (k = 0; k < 2; k++) {
      var far, tx, h, x0, f;
      /* the floor arm's jet */
      h = Math.round(ob.hL);
      if (h > 0) {
        tx = tipX(ob, false, k); x0 = Math.round(tx) - JET_DRAW / 2;
        far = (k ? -1 : 1) * Math.sin(ob.thL) < 0;
        ctx.globalAlpha = a0 * (far ? 0.78 : 1);
        ctx.drawImage(T.jetTex[jv].canvas, 0, wrap(B - h, JET_PER), JET_DRAW, h, x0, FLOOR - h, JET_DRAW, h);
        f = T.fray[Math.floor(cl * 18 + k * 3) % FRAY_N];
        ctx.drawImage(f.canvas, Math.round(tx) - FRAY_W / 2, FLOOR - h - FRAY_H + 5);
        for (i = 0; i < 4; i++) {
          var q = wrap(cl * 2.2 + i * 0.25 + k * 0.37 + ob.seed * 0.001, 1);
          ctx.globalAlpha = a0 * (1 - q) * (far ? 0.7 : 0.9);
          dot(ctx, Math.round(tx + Math.sin(i * 2.3 + ob.seed) * q * 7), Math.round(FLOOR - h - 3 - q * 10), P.spray);
        }
        ctx.globalAlpha = a0;
        jetTheatre(ctx, ob, false, k, tx, h, cl, a0, far);
      }
      /* the middle arm's jet */
      h = Math.round(ob.hU);
      if (h > 0) {
        tx = tipX(ob, true, k); x0 = Math.round(tx) - JET_DRAW / 2;
        far = (k ? -1 : 1) * Math.sin(ob.thU) < 0;
        ctx.globalAlpha = a0 * (far ? 0.78 : 1);
        ctx.drawImage(T.jetTex[jv].canvas, 0, wrap(-B, JET_PER), JET_DRAW, h, x0, CEIL, JET_DRAW, h);
        f = T.frayDown[Math.floor(cl * 18 + k * 3) % FRAY_N];
        ctx.drawImage(f.canvas, Math.round(tx) - FRAY_W / 2, CEIL + h - 4);
        ctx.globalAlpha = a0;
        jetTheatre(ctx, ob, true, k, tx, h, cl, a0, far);
      }
      /* the drizzle of PRE-RINSE */
      if (S && S.phase === 'pre' && ob.hL <= 0) {
        tx = tipX(ob, false, k);
        for (i = 0; i < 3; i++) {
          var p = wrap(cl * 1.6 + i / 3 + k * 0.5, 1);
          ctx.globalAlpha = a0 * (1 - p);
          dot(ctx, Math.round(tx + (i - 1) * 2 + Math.sin(p * 6 + i) * 1.5), Math.round(FLOOR - 2 - p * 14), P.spray);
        }
        ctx.globalAlpha = a0;
      }
    }
  }

  /* ------------------------------------------------------- the drops

     Everything that draws or collides a drop reads ob.gold, ob.spicy,
     ob.sour and ob.whirl LIVE - the engine sets the last two after
     makeDrop returns. */
  function giftOf(ob) {
    if (ob.gold) return 'gold';
    if (ob.spicy) return 'sauce';
    if (ob.sour) return 'lime';
    if (ob.whirl) return 'beater';
    return '';
  }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y), g = giftOf(ob), age = ob.age || 0, i, k, spr;
    if (ob.fly && !ob.launched && !g) return;
    if (ob.fly && ob.launched) {
      if (age < FLY_TELL) {
        /* THE TELL: it creeps out of a splash at the edge, rattling, with a
           chevron pointing the way it is about to come */
        spr = T.kind[ob.kind][turnFrame(ob.spin)];
        blitBelowCeil(ctx, spr.canvas, x - spr.w / 2, Math.round(ob.y0) - spr.h / 2 + (Math.floor(age * 30) % 2));
        var fl = T.flare[Math.floor(age * 15) % 3];
        ctx.drawImage(fl.canvas, VW - 18, Math.round(ob.y0) - 9);
        var cx = VW - 30, cy = Math.round(ob.y0);
        if (Math.floor(age * 8) % 2 === 0) {
          for (i = 0; i < 5; i++) {
            rect(ctx, cx + i, cy - i, 2, 1, P.jetCore); rect(ctx, cx + i, cy + i, 2, 1, P.jetCore);
            dot(ctx, cx + i + 2, cy - i, P.jetEdge); dot(ctx, cx + i + 2, cy + i, P.jetEdge);
          }
        }
        return;
      }
      spr = T.kind[ob.kind][turnFrame(ob.spin)];
      blitBelowCeil(ctx, spr.canvas, x - spr.w / 2, y - spr.h / 2);
      return;
    }
    if (!g) {
      spr = T.kind[ob.kind][turnFrame(ob.spin)];
      blitBelowCeil(ctx, spr.canvas, x - spr.w / 2, y - spr.h / 2);
      return;
    }
    var pulse = 0.72 + 0.28 * Math.sin(age * 2.6);
    if (g === 'sauce') {
      /* it wears the heat as every hot thing in the house does */
      glow(ctx, x, y, Math.round(16 + pulse * 6),
           'rgba(' + FX.glowCore + ',' + (0.50 * pulse).toFixed(3) + ')',
           'rgba(' + FX.glowEdge + ',' + (0.24 * pulse).toFixed(3) + ')',
           'rgba(122,32,18,0)');
      var wob = Math.round(Math.sin(age * 9) * 0.6);
      blitBelowCeil(ctx, T.sauce.canvas, x - 5 + wob, y - 10);
    } else if (g === 'lime') {
      glow(ctx, x, y, Math.round(13 + pulse * 4),
           'rgba(154,230,120,' + (0.40 * pulse).toFixed(3) + ')',
           'rgba(110,190,80,' + (0.18 * pulse).toFixed(3) + ')',
           'rgba(60,120,40,0)');
      blitBelowCeil(ctx, T.lime.canvas, x - 7, y - 5);
    } else if (g === 'beater') {
      glow(ctx, x, y, Math.round(14 + pulse * 4),
           'rgba(214,180,255,' + (0.40 * pulse).toFixed(3) + ')',
           'rgba(160,110,230,' + (0.18 * pulse).toFixed(3) + ')',
           'rgba(90,50,150,0)');
      blitBelowCeil(ctx, T.beater[Math.floor(age * 10) % 6].canvas, x - 6, y - 9);
    } else {
      /* THE SPOTLESS GLASS: gold, tumbling slowly, its star glint hopping
         from rib to rib */
      glow(ctx, x, y, Math.round(13 + pulse * 4),
           'rgba(242,207,106,' + (0.45 * pulse).toFixed(3) + ')',
           'rgba(224,176,74,' + (0.20 * pulse).toFixed(3) + ')',
           'rgba(224,176,74,0)');
      spr = T.goldGlass[turnFrame(ob.spin)];
      blitBelowCeil(ctx, spr.canvas, x - spr.w / 2, y - spr.h / 2);
      k = Math.floor(age * 4) % 3;
      var gx = x + [-3, 1, 3][k], gy = y + [-4, 0, 4][k];
      if (gy - 2 >= CEIL) {
        rect(ctx, gx - 2, gy, 5, 1, P.white); rect(ctx, gx, gy - 2, 1, 5, P.white);
        dot(ctx, gx, gy, P.goldLit);
      }
    }
  }

  /* THE SPOT on the rack under anything coming down: wide and faint while
     it is up by the upper rack, tight and dark as it arrives - on the
     rack's floor, under the kill wire, so the wire stays whole. A flyer
     has none: it comes from the front, and its tell is its splash. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0 || (ob.fly && ob.launched) || (ob.fly && !giftOf(ob))) return;
    var k = clamp((ob.y - CEIL) / LANE, 0, 1), w = 13 - Math.round(6 * k);
    var g = giftOf(ob);
    var col = g === 'sauce' ? P.sauceDeep : (g === 'lime' ? P.limeRindDeep : (g === 'gold' ? P.goldDeep : P.void));
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 2, w, 3, col, 6 + Math.round(10 * k));
  }

  /* WHAT IS LEFT. A thing that burst on a stack leaves its pieces flying
     off where it struck - glass in bright shards, a plate or a bowl or a
     pan in black chips and a glint of its gold or its cream; a thing that
     landed lies on the rack for a moment; a gift lies as itself. All of
     it fades over its last half second. */
  function drawDropSplat(ctx, ob) {
    var a = ctx.globalAlpha, x = Math.round(ob.x), i;
    var left = ob.broken, e = (ob.splat || 1.2) - left;
    ctx.globalAlpha = a * clamp(left / 0.4, 0, 1);
    if (ob.pop) {
      var K0 = KINDS[ob.kind] || KINDS[0], glass = !!K0.glass;
      for (i = 0; i < 7; i++) {
        var h = hash((ob.seed || 1) * 31 + i * 977);
        var vx = ((h % 140) - 70) - 40, vy = -((h >>> 8) % 90) - 20;
        var px = Math.round(ob.x + vx * e), py = Math.round(ob.y + vy * e + 260 * e * e);
        if (py < CEIL || py > FLOOR) continue;
        var col = glass ? (i % 2 ? P.glassRim : P.glass) : (i % 3 === 0 ? K0.burst[0] : P.plate);
        rect(ctx, px, py, i % 3 === 0 ? 2 : 1, i % 2 ? 2 : 1, col);
        if (!glass) dot(ctx, px, py - 1, P.plateLit);
      }
      ctx.globalAlpha = a;
      return;
    }
    var g = giftOf(ob), y = FLOOR - 2;
    if (g === 'sauce') ctx.drawImage(T.sauce.canvas, x - 5, y - 19);
    else if (g === 'lime') ctx.drawImage(T.lime.canvas, x - 7, y - 9);
    else if (g === 'beater') ctx.drawImage(T.beater[0].canvas, x - 6, y - 16);
    else if (g === 'gold') { var gs = T.goldGlass[TURN_N / 4]; ctx.drawImage(gs.canvas, x - gs.w / 2, y - gs.h / 2 - 3); }
    else {
      /* lying on the rack, flat: the frame with its length across */
      var spr = T.kind[ob.kind][ob.fly && KINDS[ob.kind].turn === 'flipU' ? TURN_N / 4 : 0];
      var lie = KINDS[ob.kind].turn === 'flipV' ? 2 : (ob.kind === K_BOWL || ob.kind === K_PAN ? 6 : 3);
      ctx.drawImage(spr.canvas, x - spr.w / 2, y - spr.h / 2 - lie + 2);
    }
    ctx.globalAlpha = a;
  }

  /* --------------------------------------------------- the spare life

     THE TABLET standing on the rack's wires, in the jade every spare life
     wears; while the suds are up it fizzes */
  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 5 + ob.dy), i;
    var pulse = 0.8 + 0.2 * Math.sin(ob.phase + (ob.age || 0) * 2.6);
    var r = Math.round(18 + pulse * 6);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.70 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.32 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, Math.max(CEIL, y - r), r * 2, y + r - Math.max(CEIL, y - r));
    ctx.drawImage(T.tablet.canvas, x - 8, y - 6);
    var S = progNow(), sud = S ? S.suds : 0, age = ob.age || 0;
    for (i = 0; i < 3; i++) {
      var k = wrap(ob.phase * 0.22 + age * (sud > 0.05 ? 0.7 : 0.3) + i * 0.34, 1);
      dot(ctx, x - 6 + i * 6, y - 8 - Math.round(k * (sud > 0.05 ? 16 : 9)), sud > 0.05 ? P.bubbleLit : P.lifePale);
    }
  }

  /* ------------------------------------------------------- the litter */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x) + rattleDX();
    if (ob.kind === 0) ctx.drawImage(T.spoonFlat.canvas, x - 8, FLOOR - 4);
    else if (ob.kind === 1) ctx.drawImage(T.forkFlat.canvas, x - 9, FLOOR - 4);
    else if (ob.kind === 2) {
      var S = progNow();
      if (!S || S.suds <= 0.05) return;
      var a = ctx.globalAlpha;
      ctx.globalAlpha = a * Math.min(1, S.suds * 2);
      ctx.drawImage(T.foamClump.canvas, x - 10, FLOOR - 6);
      ctx.globalAlpha = a;
    } else ctx.drawImage(T.basket.canvas, x - 10, FLOOR - 30);
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') { if (ob.arm) drawStation(ctx, ob); }
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ======================================================= THE COVER

     118 x 114 on the big card, 82 x 94 on the side ones (and small in the
     stands' set); the caller has clipped. The tub in miniature at the
     lane's own proportions: the upper rack's wires along the top and the
     lower rack's along the bottom, the back wall between with a pressed
     panel and the tower; a glass stack hanging and a plate stack
     standing; THE LOWER ARM turning in the floor band with ONE JET
     standing up from its near tip, flowing and fraying; a tumbler flying
     in from the right end over end; beads on the lens (rims only - no
     turning-over on a card) and the readout saying WASH. Whole pixels;
     nothing rotates at draw. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var i, k;
    var lidH = Math.max(3, Math.round(h * 0.08));
    var floorY = y + Math.round(h * 0.88);
    var top = y + lidH, lane = floorY - top;

    /* 1. the back wall, a pressed panel either side of the tower */
    rect(ctx, x, top, w, lane, P.wall);
    var pw = Math.round(w * 0.3), ph = Math.round(lane * 0.55), py = top + Math.round(lane * 0.14);
    var tw = Math.max(2, Math.round(w * 0.05)), tx = x + Math.round(w * 0.5 - tw / 2);
    [x + Math.round(w * 0.5) - tw - 3 - pw, x + Math.round(w * 0.5) + tw + 3].forEach(function (px0) {
      rect(ctx, px0, py, pw, ph, P.wallPanel);
      rect(ctx, px0, py, pw, 1, P.wallHi);
      rect(ctx, px0, py, 1, ph, P.wallLit);
      rect(ctx, px0, py + ph - 1, pw, 1, P.wallDeep);
      rect(ctx, px0 + pw - 1, py, 1, ph, P.wallDeep);
    });
    rect(ctx, tx, top, tw, lane, P.tower);
    rect(ctx, tx, top, 1, lane, P.towerLit);
    for (i = 0; i < 40; i++) {
      var hh = hash(i * 7919 + 13);
      dot(ctx, x + hh % w, top + (hh >>> 8) % lane, P.bead);
    }
    /* the camera's falloff at the card's sides */
    var vig = Math.max(3, Math.round(w * 0.08));
    Tint.rect(ctx, x, top, vig, lane, P.void, 3);
    Tint.rect(ctx, x + w - vig, top, vig, lane, P.void, 3);

    /* 2. the lid: the dark over the rack, its wires, the arris */
    rect(ctx, x, y, w, lidH, P.lidDark);
    rect(ctx, x, y + lidH - 3, w, 1, P.wireShade);
    rect(ctx, x, y + lidH - 1, w, 1, P.wireLit);
    for (i = 0; i < w; i += 4) dot(ctx, x + i, y + lidH - 2, P.wire);

    /* 3. the ground: the kill wire, the rack, the floor and the pool */
    rect(ctx, x, floorY, w, y + h - floorY, P.floor);
    rect(ctx, x, floorY, w, 1, P.wireLit);
    rect(ctx, x, floorY + 1, w, 1, P.wire);
    for (i = 1; i < w; i += 4) dot(ctx, x + i, floorY + 2, P.wire);
    if (floorY + 6 < y + h) {
      rect(ctx, x, floorY + 6, w, y + h - floorY - 6, P.pool);
      for (i = 0; i < w; i++) if (Math.sin(i * 0.5 + t * 6) > 0.6) dot(ctx, x + i, floorY + 6, P.poolSheen);
    }

    /* 4. a glass stack hanging, a plate stack standing */
    var sw = big ? 12 : 9;
    var gx = x + Math.round(w * 0.25) - sw / 2, gH = Math.round(lane * 0.34);
    for (i = 0; i < gH; i++) {
      var rimRow = (gH - 1 - i) % 4 === 0;
      rect(ctx, gx, top + i, sw, 1, rimRow ? P.glassRim : P.glass);
      dot(ctx, gx + 1, top + i, P.glassLit);
    }
    rect(ctx, gx - 2, top + gH, sw + 4, 3, P.tubLid);
    rect(ctx, gx - 2, top + gH, sw + 4, 1, P.tubLidLit);
    rect(ctx, gx + sw, top, 1, gH, P.outline);
    var sx = x + Math.round(w * 0.82) - sw / 2, sH = Math.round(lane * 0.44), sy = floorY - sH;
    for (i = 0; i < sH; i++) {
      var row = i % 3;
      rect(ctx, sx, sy + i, sw, 1, row === 0 ? P.plateRing : (row === 1 ? P.plateLit : P.plate));
    }
    rect(ctx, sx - 2, sy - 3, sw + 4, 1, P.panRim);
    rect(ctx, sx - 2, sy - 2, sw + 4, 2, P.enamel);
    rect(ctx, sx, sy, 1, sH, P.sheen);
    rect(ctx, sx + sw - 1, sy, 1, sH, P.outline);

    /* 5. THE ARMS, the lower turning in the floor band and the middle one
       under the upper rack the other way, each with a jet from its near
       tip - the floor's flowing up, the rack's flowing down - both in the
       clear span between the stacks */
    var ax = x + Math.round(w * 0.535), R = big ? 18 : 13;
    [[t * 2.4, Math.min(y + h - 3, floorY + 3), true], [-t * 2.9 + 1.3, Math.max(y, y + lidH - 3), false]].forEach(function (A) {
      var th = A[0], ay = A[1], up = A[2], rr = up ? R : Math.round(R * 0.8);
      var L = Math.max(2, Math.round(rr * Math.abs(Math.cos(th))));
      rect(ctx, ax - L, ay, 2 * L, 2, up ? P.arm : P.armFar);
      rect(ctx, ax - L, ay, 2 * L, 1, P.armLit);
      rect(ctx, ax - 2, ay - 1, 4, 3, P.hub);
      var jx = ax + Math.round(rr * Math.cos(th) * (Math.sin(th) >= 0 ? 1 : -1));
      var jh = Math.round(h * (up ? 0.30 : 0.22));
      var j0 = up ? floorY - jh : top;
      rect(ctx, jx - 2, j0, 5, jh, P.jetEdge);
      rect(ctx, jx - 1, j0, 3, jh, P.jet);
      rect(ctx, jx, j0, 1, jh, P.jetCore);
      for (i = 0; i < jh; i += 5) dot(ctx, jx - 1, j0 + ((i + Math.floor(t * 30) * (up ? -1 : 1)) % jh + jh) % jh, P.jetCore);
      for (i = 0; i < 3; i++) {
        var hs = hash(Math.floor(t * 12) * 31 + i * 7 + (up ? 0 : 99));
        dot(ctx, jx - 3 + hs % 7, up ? j0 - 1 - (hs >>> 5) % 5 : j0 + jh + (hs >>> 5) % 5, P.spray);
      }
    });

    /* 6. a tumbler flying in from the right, end over end */
    var fx = x + w - Math.round(wrap(t * 60, w + 24)) + 8, fy = y + Math.round(h * 0.45 + 6 * Math.sin(t * 3));
    var fs = T.kind[K_TUMBLER][Math.floor(t * 8) % TURN_N];
    ctx.drawImage(fs.canvas, fx - fs.w / 2, fy - fs.h / 2);

    /* 7. the doodad, the Couch's block */
    var dx = Math.round(x + w * 0.12), dy = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.12));
    var sz = big ? 8 : 6;
    rect(ctx, dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2, P.outline);
    rect(ctx, dx - sz / 2, dy - sz / 2, sz, sz, '#c9873c');
    rect(ctx, dx - sz / 2, dy - sz / 2, sz - 2, 1, '#eab873');
    dot(ctx, dx + sz / 2 - 2, dy - 1, P.outline);
    rect(ctx, dx + sz / 2, dy, 2, 1, '#f3cc84');

    /* 8. beads on the lens, rims only, one of them running */
    var b1 = T.lensRim[1], b2 = T.lensRim[0];
    ctx.drawImage(b1.canvas, x + Math.round(w * 0.78) - 6, y + Math.round(h * 0.56) + Math.round(wrap(t * 8, 20)) - 6);
    if (big) ctx.drawImage(b2.canvas, x + Math.round(w * 0.16) - 5, y + Math.round(h * 0.26) - 5);

    /* 9. the readout */
    if (big) Font.draw(ctx, 'WASH', x + w - 3, y + lidH + 3, { scale: 1, colour: P.readout, shadow: P.readoutShadow, align: 'right' });
  }

  /* ==================================================== GENERATION */

  /* A stack works out what it is when it is made, and writes itself into
     the run's ledger - where this bay's left stack is and how far it is
     from the last (the Island's way): makeSpikes runs straight after for
     the same bay, and a station has to know both to stand in the middle
     of the free span. */
  function makePillar(x, gapY, gapH, run) {
    var ob = { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
               vS: chance(0.5) ? 0 : 1, vH: chance(0.6) ? 0 : 1,
               capStand: chance(0.5) ? 0 : 1, capHang: chance(0.5) ? 0 : 1,
               seed: randInt(1, 100000), scored: false };
    if (run && run.ledger) {
      var L = run.ledger;
      if (L.plank) L.spacing = x - L.plank.x;
      L.plank = ob;
      L.n = (L.n || 0) + 1;
      tally.bays++;
    }
    return ob;
  }

  /* AN ARM STATION, in the spike slot. The engine stands a spike at
     mid +- 14; a station ignores that and puts its hub in the middle of
     the free span between the two caps - the left cap ends at the stack's
     x + 38, the right begins at the next stack's x - 4, so the middle is
     the stack's x + spacing / 2 + 17, with the spacing predicted off the
     last two stacks (it moves 0.44 px a second). At spacing 184 a lower
     tip reaches 52 px either side of the hub, 14 px short of either cap's
     edge; at 226, 35 px short: A JET NEVER STANDS UNDER A STACK. Never two
     bays running (ARM_GAP): a station refused stands an empty slot.
     `keep`: a spare life does not take the tub's arms out of the tub (the
     engine's save sweep honours it); the grace is what keeps him. */
  function makeSpikes(x, side, count, maxLen, run) {
    var L = run && run.ledger;
    var none = { type: 'spike', x: Math.round(x), side: 'floor', w: 1, spikes: [] };
    if (!L || !L.plank) return none;
    if (L.armN !== undefined && L.n - L.armN < ARM_GAP) { tally.stationsRefused++; return none; }
    var S = L.spacing > 0 ? L.spacing : 184;
    var c = Math.round(L.plank.x + S / 2 + 17);
    L.armN = L.n;
    tally.stationsBorn++;
    return { type: 'spike', side: 'floor', arm: true, keep: true,
             x: c - 60, w: 120,
             thL: rand(0, TAU), thU: rand(0, TAU), wL: 0, wU: 0,
             eL: 0, eU: 0, hL: 0, hU: 0, cL: false, cU: false,
             seed: randInt(1, 100000),
             spikes: [] };                 /* named by the contract; an arm is not made of spikes */
  }

  /* ======================================================== THE DROPS

     ONE MAKER for everything that comes loose, and the program's part
     decides which way it comes:

     FALLERS, off the upper rack at the engine's x - the loose cutlery
       (fork, spoon, the black-handled knife, the tub's blue lid which
       flutters, the spatula cartwheeling) and every gift. DROP_GRAV 150,
       the Fridge's eggs' number and for the Fridge's reason: the brief's
       600 ("steel falls hard") and the Table's 300 both landed nearly
       every fork in front of him - a fall the stock pilot met once in
       eight minutes is scenery - and at 150 a fork let go 120..230 px in
       crosses his column through the middle of the lane. The engine's
       puff on the lid and its crack are right for them: a knock.
     FLYERS, from the right, "from in front of you": a plain drop in WASH
       or RINSE (CYC's flyWash / flyRinse of them, growing with the
       cycle), never in PRE, DRY or CLEAN, never a gift, never one a crow
       is carrying. It CREEPS OUT OF A SPLASH at the edge of the picture at
       its own height, rattling, a chevron pointing the way it will come -
       its tell, FLY_TELL long, boxless - and then crosses at the room's
       speed and its own (178..284 px/s), tumbling end over end (the plate
       flips), most of them thrown THROUGH THE GAP HE IS HEADING FOR (see
       aimFlyer), and BURSTS ON A STACK in its way: nothing ever comes
       through a plate at him. Measured, nothing thrown has ever come
       within 22 px of him sooner than 1.67 s after its splash. What may
       fly grows with the cycle: tumblers and the glass tub in AUTO, the
       square plates and the bowls from HEAVY, the pan in POTS AND PANS.

     WHETHER A DROP FLIES IS ONLY KNOWN WHEN IT IS LET GO. The engine
     makes a drop sour or a spin AFTER this returns, and a gift always
     falls. So a would-be flyer is made where it would let go of the lid
     (the engine's x) and carries its entry point as a GETTER on `entry`
     (the engine's E2: where its puff goes, and Pepper's star) that only
     answers while it is still plain; the first step launches it from the
     edge, or - if the engine made it a gift - lets it fall from the lid
     like every gift. Until that first step it draws nothing and has no
     box, which is one frame. */
  var DROP_GRAV = 150, LID_GRAV = 150, GIFT_GRAV = 150;
  var FALL = { steel: DROP_GRAV };          /* read live, for the headless checks */
  var SPLAT_TIME = 1.2;
  var FLY_TELL = 0.55, FLY_PEEK = 12;
  var FLY_Y0 = CEIL + 40, FLY_Y1 = FLOOR - 60;      /* 64..182 */
  /* how many plain drops fly, by part, and how many of those are thrown
     through his gap (read live: the headless checks may turn them) */
  var FLY = { aim: 0.85 };
  /* the flyers' own pace and weight: [vx lo, vx hi, gravity, turn lo, turn hi] */
  var FLY_PACE = {};
  FLY_PACE[K_TUMBLER] = [60, 100, 70, 4, 7];
  FLY_PACE[K_TUB]     = [50, 80, 80, 3, 5];
  FLY_PACE[K_PLATE]   = [50, 80, 40, 5, 8];
  FLY_PACE[K_BOWL]    = [55, 85, 80, 3.5, 6];
  FLY_PACE[K_PAN]     = [45, 70, 90, 3, 4.5];
  /* steel, thrown back by a jet: up and BACK over his head (the Island's
     measured reason - thrown straight up, a pan came down on the very
     pilot who had cleared the column) */
  var BLAST_VY = -240, BLAST_VX = -70, GIFT_VY = -200, GIFT_VX = 150, TOSS_VY = -200, SHOVE_VY = 260;

  /* A THROW NEVER COMES AT HIM SOONER THAN HE CAN SEE IT GO UP. Everything
     a jet throws keeps its boxes the whole way: it was once boxless while
     it climbed (the Island's pans), but here a thing thrown up from a jet
     ahead of him keeps coming AT him, and a fork that sails through the
     doodad reads as a bug - the owner's own note, 2026-11-05. So the
     thing is lethal all the way, and the one that would reach his column
     inside NEAR_T of the throw - too soon to have seen it leave the
     water - BURSTS IN THE SPRAY instead, where it is (the finale's own
     "things bursting"). Behind him a throw is going away from him, and is
     thrown. `away` is how fast the throw itself carries it toward him on
     top of the room's scroll: the steel's -BLAST_VX, a flyer's own pace. */
  var NEAR_T = 0.7;
  function inHisFace(ob, run, away) {
    var px = run.px !== undefined ? run.px : 116;
    if (ob.x < px) return false;
    var close = (run.speed || 0) + away;
    return close > 0 && (ob.x - px - 20) / close < NEAR_T;
  }

  /* THE SPOTLESS GLASS IS THE ART'S ROLL, the Table's reason: a +5 the
     module did not roll would be drawn as cutlery and dodged. */
  var GOLD_CHANCE = 0.03, GOLD_GAP = 6;
  var goldGap = 0;

  function flyerEntry() {
    return (this.spicy || this.gold || this.sour || this.whirl) ? undefined : this.fe;
  }

  function pickFlyer(S) {
    var c = cycOf(S ? S.cycle : 1), rinse = S && S.phase === 'rinse';
    var w = [[K_TUMBLER, 4], [K_TUB, rinse ? 2 : 0], [K_PLATE, c.plate ? 2 : 0],
             [K_BOWL, c.plate ? 2 : 0], [K_PAN, c.pan ? 2 : 0]];
    var tot = 0, i;
    for (i = 0; i < w.length; i++) tot += w[i][1];
    var r = rand(0, tot);
    for (i = 0; i < w.length; i++) { r -= w[i][1]; if (r < 0) return w[i][0]; }
    return K_TUMBLER;
  }

  function makeFlyer(kind, y0) {
    var F = FLY_PACE[kind], K0 = KINDS[kind];
    var y = Math.round(clamp(y0, FLY_Y0, FLY_Y1));
    return { type: 'drop', fly: true, launched: false, kind: kind,
             x: VW + 24, y: y, y0: y, fe: [VW - 2, y],
             vx: rand(F[0], F[1]), vy: rand(-70, -40), grav: F[2],
             spin: rand(0, TAU), spinRate: rand(F[3], F[4]) * (chance(0.5) ? -1 : 1),
             w: Math.round(K0.N * 0.8), broken: 0, blasts: 0,
             spicy: false, gold: false,
             landCry: K0.land, burst: K0.burst, splat: SPLAT_TIME,
             seed: randInt(1, 99999) };
  }

  function pickFaller() {
    var r = rand(0, 11);
    return r < 3 ? 0 : (r < 6 ? 1 : (r < 8 ? 2 : (r < 10 ? K_TUB_LID : 4)));
  }

  function makeFaller(x, spicy, gold, fall) {
    var k = pickFaller(), K0 = KINDS[k];
    var ob = { type: 'drop', fly: false, kind: k, x: x, y: CEIL + 5, vy: fall, vx: 0,
               spicy: !!spicy, gold: !!gold, broken: 0, blasts: 0,
               spin: rand(0, TAU), spinRate: rand(2.5, 5) * (chance(0.5) ? -1 : 1),
               w: Math.round(K0.N * 0.8), landCry: K0.land, burst: K0.burst, splat: SPLAT_TIME,
               seed: randInt(1, 99999) };
    if (k === K_TUB_LID) ob.spinRate = rand(5, 8) * (chance(0.5) ? -1 : 1);
    if (spicy) dress(ob);
    if (gold) { ob.name = GOLD_NAME; dress(ob); }
    return ob;
  }

  /* a gift's own size, voice and colours, put on when it is known to be
     one - the heat and the gold here, the lime and the spin on the first
     step (the engine names them after the maker returns) */
  function dress(ob) {
    var g = giftOf(ob);
    if (!g || ob.dressed === g) return;
    ob.dressed = g;
    ob.spinRate = g === 'gold' ? 3 * (ob.spinRate < 0 ? -1 : 1) : 0;
    if (g === 'sauce') { ob.w = 9; ob.landCry = 'clink'; ob.burst = [P.sauce, P.capWhite]; ob.splat = 1.4; }
    else if (g === 'lime') { ob.w = 13; ob.landCry = 'pat'; ob.burst = [P.limeLit, P.limeFlesh]; ob.splat = 1.4; }
    else if (g === 'beater') { ob.w = 10; ob.landCry = 'clink'; ob.burst = [P.steelLit, P.steel]; ob.splat = 1.4; }
    else { ob.w = 11; ob.landCry = 'clink'; ob.burst = [P.goldLit, P.gold]; ob.splat = 1.2; }
  }

  function makeDrop(x, spicy, fall, run, want) {
    var gold = want === 'gold';
    if (!spicy && !gold && want !== 'plain') {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var S = run && run.ledger ? run.ledger.prog : null;
    var odds = 0;
    if (S && !spicy && !gold && want === undefined) {
      var cy = cycOf(S.cycle);
      odds = S.phase === 'wash' ? cy.flyWash : (S.phase === 'rinse' ? cy.flyRinse : 0);
    }
    if (odds > 0 && chance(odds)) {
      var ob = makeFlyer(pickFlyer(S), rand(FLY_Y0, FLY_Y1));
      /* until it is let go it is where a gift would let go of the lid */
      ob.x = x; ob.y = CEIL + 5; ob.ex = x; ob.fall0 = fall;
      Object.defineProperty(ob, 'entry', { get: flyerEntry, enumerable: false, configurable: true });
      return ob;
    }
    return makeFaller(x, spicy, gold, fall);
  }

  /* LITTER, on the lower rack: a spoon (4), a fork (3), a clump of foam
     (3, seen only while the suds are up) and the cutlery basket (1) - one
     basket in the tub, so never two inside six litters of each other */
  function makeLitter(x, run) {
    var L = run && run.ledger, r = rand(0, 11);
    var k = r < 4 ? 0 : (r < 7 ? 1 : (r < 10 ? 2 : 3));
    if (L) {
      L.litN = (L.litN || 0) + 1;
      if (k === 3) {
        if (L.basketN !== undefined && L.litN - L.basketN < 6) k = 0;
        else L.basketN = L.litN;
      }
    }
    return { type: 'litter', x: x, w: 20, kind: k, seed: randInt(1, 100000) };
  }

  /* THE TABLET, standing on the rack */
  function makeBoon(x, run) {
    return { type: 'boon', x: x, y: FLOOR - 5, w: 16, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0, name: BOON_NAME,
             burst: [P.tabRed, P.tabWhite, P.lifePale, P.lifeJade] };
  }

  /* ======================================================= PHYSICS

     stepDrop owns every drop; the engine's default never runs here. It
     is CLONE-SAFE (Pepper runs it ahead on copies): its dice are rand /
     chance only, it writes nothing but the drop it is handed and the
     ledger (counts on run.ledger.dwc, cries on run.ledger.cry), it reads
     the stacks' boxes into module scratch lists it empties first, and it
     never mutates a list hanging off a drop. */
  var scrA = [], scrB = [];

  function stepDrop(ob, dt, obstacles, run) {
    var L = run && run.ledger, C = L && L.dwc;
    if (ob.fly && !ob.launched) {
      if (giftOf(ob)) {
        /* the engine made it a gift: it falls from the lid, like them all */
        ob.fly = false; ob.kind = 0; ob.vy = ob.fall0 || 20;
      } else {
        ob.launched = true; ob.x = VW + FLY_PEEK;
        aimFlyer(ob, obstacles, run);
        if (L && !L.cry) L.cry = 'splashIn';
        if (C) C.launched++;
      }
    }
    if (giftOf(ob)) dress(ob);
    if (ob.fly) return stepFlyer(ob, dt, obstacles, run, L, C);

    var gift = !!giftOf(ob);
    var g = gift ? GIFT_GRAV : (ob.kind === K_TUB_LID ? LID_GRAV : FALL.steel);
    ob.vy += g * dt;
    ob.y += ob.vy * dt;
    if (ob.vx) { ob.x += ob.vx * dt; ob.vx *= 1 - 0.6 * dt; }
    /* the blue lid flutters as it comes down, and the lime sways */
    if (!gift && ob.kind === K_TUB_LID) ob.x += Math.cos((ob.age || 0) * 2.5) * 14 * dt;
    if (ob.sour) ob.x += Math.cos((ob.age || 0) * 3) * 9 * dt;
    ob.spin += ob.spinRate * dt;
    jetsOn(ob, obstacles, run, L, C, gift);
    if (ob.pop) return true;
    return ob.vy > 0 && ob.y >= FLOOR - 4;
  }

  /* WHERE A FLYER IS THROWN. Most are thrown THROUGH THE GAP HE IS
     HEADING FOR: the stack he will not yet have reached when the thing
     gets to him (at the room's speed and its own), at a height inside
     that stack's gap - so it comes out of the gap in front of him, and
     the splash at the edge was at the very height the gap is. It is
     given a gentle hop that brings it back to that height as it crosses
     the stack, so it threads the gap and does not burst on the cap: the
     player meets it in the open, coming, and goes over or under it. The
     rest are thrown anywhere in the band, and those mostly burst on the
     first stack in their way - the chaos. Decided on the first step,
     which may read where he is (a maker may not), on the drop's own dice. */
  function aimFlyer(ob, obstacles, run) {
    var sp = run && run.speed ? run.speed : 118, px = run && run.px !== undefined ? run.px : 116;
    var tm = FLY_TELL + (VW + 24 - px) / (sp + ob.vx), best = null, i;
    var y0 = rand(FLY_Y0, FLY_Y1);
    if (obstacles && chance(FLY.aim)) {
      for (i = 0; i < obstacles.length; i++) {
        var p = obstacles[i];
        if (p.type !== 'pillar' || p.x - sp * tm < px + 25) continue;
        if (!best || p.x < best.x) best = p;
      }
    }
    if (best) {
      y0 = best.gapY + best.gapH * rand(0.42, 0.68);
      /* a hop that brings it down to that height as it reaches him; it
         crosses the stack a little higher on the same arc, still inside
         the gap (at most a fifth of a gap above where it is aimed) */
      var tf = clamp((VW + 24 - px) / (sp + ob.vx), 0.3, 3);
      ob.vy = -ob.grav * tf / 2;
      ob.aimed = true;
    }
    ob.y = ob.y0 = Math.round(clamp(y0, FLY_Y0, FLY_Y1));
  }

  function stepFlyer(ob, dt, obstacles, run, L, C) {
    var sp = run ? run.speed || 0 : 0;
    /* THE TELL: held just off the edge against the room (the engine has
       already scrolled it this frame), its splash at the edge */
    if ((ob.age || 0) < FLY_TELL) { ob.x = VW + FLY_PEEK - 6 * ease((ob.age || 0) / FLY_TELL); return false; }
    ob.x -= ob.vx * dt;
    ob.vy += ob.grav * dt;
    ob.y += ob.vy * dt;
    ob.spin += ob.spinRate * dt;
    jetsOn(ob, obstacles, run, L, C, false);
    if (ob.pop) return true;
    if (ob.x < VW - 2 && hitsStack(ob, obstacles)) {
      ob.pop = true;
      if (L && !L.cry) L.cry = KINDS[ob.kind].glass ? 'tinkle' : 'clank';
      if (C) C.flyerPops++;
      return true;
    }
    if (ob.vy > 0 && ob.y >= FLOOR - 4) { if (C) C.flyerLands++; return true; }
    if (ob.x < -40 || ob.y < CEIL - 60) ob.gone = true;
    return false;
  }

  /* does a flyer's body touch any stack's box: the stacks' own boxes,
     read off the list (never written) */
  function hitsStack(ob, obstacles) {
    scrA.length = 0;
    bodyRects(ob, scrA);
    if (!scrA.length) return false;
    for (var i = 0; i < obstacles.length; i++) {
      var p = obstacles[i];
      if (p.type !== 'pillar' || p.x > ob.x + 50 || p.x + 42 < ob.x - 50) continue;
      scrB.length = 0;
      rectsFor(p, scrB);
      for (var a = 0; a < scrA.length; a++) {
        var A = scrA[a];
        for (var b = 0; b < scrB.length; b++) {
          var Bq = scrB[b];
          if (A[0] < Bq[0] + Bq[2] && A[0] + A[2] > Bq[0] && A[1] < Bq[1] + Bq[3] && A[1] + A[3] > Bq[1]) return true;
        }
      }
    }
    return false;
  }

  /* THE JETS THROW WHAT COMES INTO THEM (the Island's fire, both ways):
       into a floor jet, steel goes UP AND BACK (BLAST) and a flyer is
       TOSSED up, keeping its pace - both keeping their boxes all the way,
       and both BURSTING in the spray instead when the throw would reach
       him inside NEAR_T (inHisFace); a gift goes UP AND ON, catchable all
       the way;
       into a hanging jet, anything is SHOVED DOWN, keeping its box (it is
       going where it was going, faster, under a jet in plain sight).
     Once thrown, not again for 0.3 s, and never while already climbing. */
  function jetsOn(ob, obstacles, run, L, C, gift) {
    if (!run || !obstacles || !L || !L.prog) return;
    if (ob.vy < -60 || (run.time || 0) - (ob.blastT === undefined ? -9 : ob.blastT) < 0.3) return;
    var c = cycOf(L.prog.cycle);
    for (var i = 0; i < obstacles.length; i++) {
      var s = obstacles[i];
      if (s.type !== 'spike' || !s.arm || Math.abs(hubX(s) - ob.x) > R_LOWER + 16) continue;
      for (var k = 0; k < 2; k++) {
        if (s.hL >= PUSH_MIN * c.hUp && Math.abs(ob.x - tipX(s, false, k)) < 12 &&
            ob.y > FLOOR - s.hL - 30 && ob.y < FLOOR + 4) {
          ob.blastT = run.time || 0; ob.blasts = (ob.blasts || 0) + 1; ob.bounced = true;
          if (gift) { ob.vy = GIFT_VY + rand(-15, 15); ob.vx = GIFT_VX + rand(-20, 20); if (C) C.giftThrows++; }
          else if (inHisFace(ob, run, ob.fly ? (ob.vx || 0) : -BLAST_VX)) {
            ob.pop = true;
            if (C) C.sprayPops++;
            if (!L.cry) L.cry = KINDS[ob.kind].glass ? 'tinkle' : 'clank';
            return;
          }
          else if (ob.fly) { ob.vy = TOSS_VY + rand(-20, 20); if (C) C.tosses++; }
          else { ob.vy = BLAST_VY + rand(-20, 20); ob.vx = BLAST_VX + rand(-15, 15); ob.spinRate *= 1.6; if (C) C.blastsUp++; }
          if (!L.cry) L.cry = 'squirt';
          return;
        }
        if (s.hU >= PUSH_MIN * c.hDown && Math.abs(ob.x - tipX(s, true, k)) < 12 &&
            ob.y > CEIL - 4 && ob.y < CEIL + s.hU + 30 && ob.vy < SHOVE_VY) {
          ob.blastT = run.time || 0; ob.vy = SHOVE_VY;
          if (C) C.shovesDown++;
          if (!L.cry) L.cry = 'squirt';
          return;
        }
      }
    }
  }

  /* ===================================================== THE BOXES

     Every lethal pixel has a box and nothing harmless has one. A stack
     is the Coop's four boxes verbatim, moved by its jig with its picture;
     the top column grows or shrinks by the jig at the lid, so nothing
     lethal ever leaves the lid's edge. An arm has none - a jet carries,
     it does not kill. A tumbling thing's boxes are squares along it at
     its frame's own angle; a flipping one's is its frame's own width. */
  function giftRects(ob, out) {
    var g = giftOf(ob), x = ob.x, y = ob.y;
    if (g === 'sauce') out.push([x - 4, y - 9, 9, 19]);
    else if (g === 'lime') out.push([x - 6, y - 4, 13, 9]);
    else if (g === 'beater') out.push([x - 5, y - 8, 10, 16]);
    else turnBoxes(out, x, y, turnFrame(ob.spin), [[3.5, 0, 10], [-3.5, 0, 9]]);
    return out;
  }
  /* the body of a loose thing, whatever it is doing */
  function bodyRects(ob, out) {
    var K0 = KINDS[ob.kind], f = turnFrame(ob.spin);
    if (K0.turn === 'spin') return turnBoxes(out, ob.x, ob.y, f, K0.boxes);
    if (K0.turn === 'flipV') {
      var hh = Math.max(3, Math.round(FLIP_FACE * flipK(f, FLIP_FACE, 3)));
      out.push([ob.x - 13, ob.y - hh / 2, 26, hh]);
      return out;
    }
    var ww = Math.max(4, Math.round(PLATE_FACE * flipK(f, PLATE_FACE, 4)));
    out.push([ob.x - ww / 2, ob.y - 17, ww, 34]);
    return out;
  }

  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var j = jig(ob);
      var topH = ob.gapY - 9 - CEIL + j;
      if (topH > 0) out.push([ob.x, CEIL, 34, topH]);
      out.push([ob.x - 4, ob.gapY - 9 + j, 42, 9]);
      var botY = ob.gapY + ob.gapH + j;
      out.push([ob.x - 4, botY, 42, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, 34, botH]);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      if (giftOf(ob)) {
        if (ob.fly && ob.launched) return out;      /* (never: gifts fall) */
        return giftRects(ob, out);
      }
      if (ob.fly) {
        /* no box until it is out of the spray and on the screen */
        if (!ob.launched || (ob.age || 0) < FLY_TELL || ob.x > VW - 2) return out;
      }
      /* a thing a jet has thrown keeps its boxes all the way (see
         inHisFace for why nothing is thrown at him too soon to see) */
      bodyRects(ob, out);
    } else if (ob.type === 'boon') {
      if (!ob.taken) out.push([ob.x + ob.dx - 7, FLOOR - 10 + ob.dy, 14, 10]);
    }
    return out;
  }

  /* what a lens bead must not turn over: every box a thing has or is
     about to have - a flyer still in its tell (where it will come out,
     already on its way) - and every gift */
  function lensRectsOf(ob, out, exact) {
    if (ob.type === 'pillar' || ob.type === 'boon') return rectsFor(ob, out);
    if (ob.type !== 'drop' || ob.broken > 0) return out;
    if (giftOf(ob)) return giftRects(ob, out);
    if (ob.fly && (!ob.launched || (ob.age || 0) < FLY_TELL)) {
      /* swept only: it has no box yet, but it is coming out here */
      if (!exact) out.push([VW - 60, ob.y0 - 20, 90, 40]);
      else if (ob.launched) out.push([VW - 22, ob.y0 - 18, 40, 36]);
      return out;
    }
    return bodyRects(ob, out);
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME, CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME, GOLD_NAME: GOLD_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor, drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview, drawOverlay: drawOverlay, drawFront: drawFront,
    postBg: postBg, postChars: postChars,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop, GOLD_GIFT: true,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop, stepWorld: stepWorld,
    rectsFor: rectsFor,
    /* for the headless checks, read-only: the running count, the
       program's tables and the arms' geometry */
    tally: tally, PROG: PROG, CYC: CYC, KINDS: KINDS, PUSH: PUSH, FLY: FLY, FALL: FALL,
    force: function (phase, cycle, t) { view.force = { phase: phase, cycle: cycle || 1, t: t || 0 }; },
    hubX: hubX, tipX: tipX, R_LOWER: R_LOWER, R_UPPER: R_UPPER, JET_W: JET_W, FLY_TELL: FLY_TELL
  };
})();
