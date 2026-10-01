/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE COUCH

   Movie night. You are flying ACROSS THE BACK OF A GREY TUFTED
   SECTIONAL, between stacks of throw pillows, with a band of plantation
   shutters along the very top of the room and a dark walnut coffee
   table sliding past below. Drawn from Couch ref 1-4 in Assets/Concept:
   the sectional, the cream-and-gold damask cushions, the cream knit
   throw over the far arm, the monstera leaf in the corner of the
   window, the chess set, the magnifying glass, and the three round
   coasters - two pale wood slices and one coiled pink one - which are
   the spare lives.

   WHAT THIS BAY IS, AND WHY IT IS NOT THE DESK. Both rooms are the same
   room and both have the same windows in them, so the first cut of this
   level filled its whole backdrop with the room's shutters and put the
   sectional along the bottom as a 68px strip. Two bays, one wall, one
   beige: a player could not tell the Couch from the Desk in a single
   frame, which is the one thing the Backyard's five never fail at.

   Couch ref 2 is the answer and it is unambiguous. The GREY TUFTED BACK
   fills the photograph to within a hand of the window sill; the shutters
   are a band along the top; the cream-and-gold cushions stand against
   the grey. So that is the layering here: 70 pixels of shutter at the
   lid and 148 pixels of microfibre under it, which is two thirds of the
   playfield. The Desk's field is beige paint, a white desk and three
   lit screens. This one's field is grey upholstery with buttons in it.
   The ceiling, the pendants, the light sheet and the oak floor are the
   room's and stay the room's - that is what makes it one house.

   Somebody made popcorn. Nobody swept up.

   THE SIGNATURE IS THE POPCORN, and it is the one hazard in the game
   that does not leave when it lands. A kernel falls out of the crown
   moulding, hits the seam where the back cushions meet the seat, and
   comes straight back up - and it keeps coming back up, at its own
   steady height, until the room has scrolled out from under it. The
   lower sixty pixels of this bay are alive with hopping kernels, and
   the crown moulding above is hard, because in this room the ceiling
   ends the run the same as the floor. A squeeze between a floor that
   moves and a ceiling that kills.

   The escape hatch is the hot cheddar kernel: while the run is hot the
   engine smashes any plain drop the doodad flies into, so a hot doodad
   goes through the carpet instead of round it.

   The engine cannot do the bouncing on its own - its drop loop is
   gravity, position, spin, and splat on the ground, and splatting on
   the ground is exactly the line this bay disagrees with. So it exports
   art.stepDrop and the engine hands it one drop at a time to move. See
   stepDrop for what that contract permits and what it does not.

   Same discipline as js/coop.js, js/deck.js and js/construction.js:
   every pixel in here is generated and baked into a tile once, and ANY
   shade laid over something that scrolls is a flat Tint, never a
   Dither. The Bayer grid is anchored in user space, so a dithered rect
   that moves re-phases against the pattern and the pixels boil. There
   is no call to Dither.rect anywhere in this file, and the kernels
   "spin" by swapping four baked frames rather than by ctx.rotate, for
   the same reason.

   READABILITY, AND IT IS THE ONE THING THIS BAY HAD TO GET RIGHT. The
   pillars here are PILLOWS, so the bay is asking a player to tell a
   cushion that kills from a sofa made of cushions, at 174 pixels a
   second, with eight pixels of timing room in the gap. The first answer
   was to recolour nothing and lean on the outline: five in ten columns
   were grey microfibre, like the sofa, separated from it by a hard
   black edge and a cast shadow. Measured, that answer failed - the grey
   column's body came out at 110.6 of luminance against a flight lane of
   121.7, DARKER than the thing behind it, and the whole mix separated
   by 22.6 where the Canopy manages 86.9 and the Whiteboard 162.5.

   THE ANSWER IS IN THE PHOTOGRAPHS AND THE LEVEL HAD DRIFTED OFF IT.
   Couch ref 2 and ref 4 show a GREY sectional with CREAM-AND-GOLD
   cushions thrown on it, and across a room you can tell them apart
   instantly. This file had walked both of them towards the same beige:
   the sofa written warm, the cushions shaded with greys borrowed off
   the sofa, half the columns painted in the sofa's own pigment and the
   backrest's scenery cushions painted in the columns'. So: the sofa
   goes back to a neutral grey and down a value, every cushion you can
   hit is cream and gold and shaded with tan rather than grey, the three
   scenery cushions on the backrest wear the sofa's grey, and the open
   damask diamond belongs to the column alone. The backdrop is grey from
   the sill to the crease now, and every cream left in the bay is on
   something the player has to ACT on - a column, a bolster cap, a
   kernel, the marshmallow. The outline and the 4px cast
   shadow stay - they are what holds the column together where it
   crosses the pale shutter band at the top - but they are no longer
   carrying the whole job on their own.

   And the popcorn: the crease where the back cushions meet the seat,
   FLOOR-7..FLOOR, is seatDeep #433e38 - the darkest band in the bay and
   the one every white kernel makes contact in. The field above it got
   two values LIGHTER in this pass, because it is now most of the
   screen, so the crease is carrying the whole of the kernel's
   legibility budget on its own and is drawn to.
------------------------------------------------------------------ */
'use strict';

var Couch = (function () {

  /* the room's: the lid, the pigments, the lighting pass and the helpers */
  var CEIL = LivingRoom.CEIL, FLOOR = LivingRoom.FLOOR;
  var R = LivingRoom.P;
  var wrap = LivingRoom.wrap, hash = LivingRoom.hash;

  /* The bay's own pigments. Lifted one or two values off the
     photographs, the Deck's bronze precedent: a living room at night is
     a dim room, and a faithful transcription of these greys would put
     the pillars, the cushions and the popcorn inside about nine values
     of each other. PlayScene never reads this table. */
  var P = {
    /* THE SHUTTERS, and they are the top seventy pixels of the room and
       nothing else. The first cut of this table took them three
       sixteenths back toward the wall because the whole backdrop was
       made of them and three in ten pillars had to win against the lot;
       then they became a band at the lid and were allowed to be the
       nearly-white timber the photograph shows.

       THEY WERE STILL A DAYTIME WINDOW, which is the one thing they are
       not. Couch ref 2 is lit by a flash a metre away; this room is lit
       by four pendants hanging down the MIDDLE of the ceiling, and the
       window is the far side of it. At 226 and 199 the band measured a
       mean of 163 over the top seventy rows - the brightest surface in
       the bay, brighter than the Desk's lit wall, and the one place a
       cream column had nothing to separate from. Everything here comes
       down about an eighth. It is still unmistakably white-painted
       timber and still the lightest architecture in the room; it is no
       longer competing with the thing a player has to see. */
    wall:         '#7a7163',   /* the painted reveal between two panels */
    shutterLit:   '#cbc3b4',   /* the lit nose of a louvre              */
    shutterMid:   '#b0a794',   /* the face of a louvre                  */
    shutterShade: '#8a8176',   /* under a louvre, and the frame's edges */
    shutterDark:  '#6b6459',   /* the gap in a panel that is shut       */
    nightBlue:    '#7f98bf',   /* the slice of night between two slats  */
    nightDeep:    '#5c7497',   /* every fourth one, and the palm fronds */
    leafDark:     '#2c4a2b',   /* the monstera's veins and its notches  */
    leafMid:      '#4f7d45',   /* the monstera leaf itself              */

    /* THE TUFTED BACK, off Couch ref 2, and it is the bay's field: two
       thirds of the screen is these five values. They are two whole
       values lighter than the backrest they replace, because a strip at
       the bottom of a frame may be as dark as it likes and a surface
       that IS the frame may not - a near-black field eats the doodad,
       the pillars and the popcorn all three. What pays for that is the
       crease below, which went the other way.

       AND THEY ARE GREY, NOT BEIGE. This table drifted: the sofa was
       written warm (111,105,96 - fifteen points of red over blue) and
       the cushions were written with grey shadow bands, so the two of
       them met in the middle at a shared beige and the pillars stopped
       reading. Go and look at Couch ref 2 and ref 4: the sectional is a
       NEUTRAL grey and the cushions on it are CREAM AND GOLD, and in
       the photograph you can tell them apart across the room. Here the
       sofa is pulled back to within eleven points of neutral and down a
       value, and every cream in the bay is pulled up and kept warm, so
       the two families separate by hue as well as by value and the
       separation does not depend on the lamp. */
    backMid:      '#67635c',   /* the field of a tufted diamond         */
    backLit:      '#7c7871',   /* its lamp-side face                    */
    backCrease:   '#4f4c46',   /* the fold between two diamonds         */
    button:       '#343230',   /* a tufting button, and the seam row    */
    crest:        '#918d86',   /* the lit roll along the very top       */

    /* THE THROW PILLOWS, and they are the thing that kills you, so
       nothing else in this bay is allowed to be this colour. The two
       shaded bands used to be greys borrowed off the sofa, which is
       what a cushion's shadow is NOT: a cream cushion turning away from
       a lamp goes tan, not grey. pillowShade and pillowDeep are that
       tan, and they are what lifts a modelled cushion's mean from the
       170s into the 190s without flattening the modelling. */
    pillowCream:  '#e8dcc0',
    pillowHi:     '#f5ecd8',
    pillowGold:   '#c4a24c',
    pillowGoldDeep: '#957839',
    pillowShade:  '#cdbb94',   /* the face turned away from the pendant */
    pillowDeep:   '#ab9870',   /* and the last of it, at the seam       */
    pillowGrey:   '#a09a8e',   /* the damask's grey scroll, thread only */
    knitCream:    '#ded3c0',
    knitShade:    '#c6b99f',

    /* THE BACKREST'S OWN CUSHIONS - the three propped along the back,
       which are scenery and must never be mistaken for a column. The
       photograph has them cream, and painted cream they were the single
       worst thing in the bay: 56x52 of the pillars' own cream, with the
       pillars' own diamond on it, sitting still in the flight lane.
       Cream in here is a uniform, so the three on the backrest wear the
       sofa's grey instead and keep only the scrollwork. They are still
       forty values clear of the field they sit on, which is all a piece
       of furniture needs; the cream is spent on the hazard. */
    propGrey:     '#969188',
    propGreyHi:   '#aaa59c',
    propGreyShade: '#6c6962',
    propGreyDeep: '#55524d',
    propMotif:    '#b0a893',   /* the scroll, read at four feet, in grey */

    /* the seat, off Couch ref 3's floor band. Same fabric as the back,
       so it follows the back off the beige: the values are where they
       were to within a point - the crease is still the darkest band in
       the bay and still the thing every white kernel is seen against -
       and only the hue moved. */
    seat:         '#787570',
    seatLit:      '#8a867f',   /* the nap, and the welt's second row    */
    seatHi:       '#a09d96',   /* the welt along the top of the cushion */
    seatShade:    '#5d5a55',   /* the cushion joins, and under the band */
    seatDeep:     '#413f3b',   /* the front face, and THE CREASE        */

    /* the walnut coffee table and the chess set on it */
    walnut:       '#5b3b26',
    walnutLit:    '#7c5536',
    walnutHi:     '#a07047',
    chessLight:   '#d8c29b',
    chessDark:    '#80593a',

    /* the coasters: two wood slices and one coiled pink one */
    woodSlice:    '#c4a46e',
    woodRing:     '#a88a58',
    woodPale:     '#e0c58f',
    woodBark:     '#5e4330',
    pinkWoven:    '#d394b0',
    pinkPale:     '#efc2d4',
    pinkDeep:     '#a66e86',

    /* the popcorn */
    popWhite:     '#f6efe2',
    popHi:        '#ffffff',
    popCream:     '#e9dcc0',
    popShade:     '#c4b48f',
    hull:         '#5a3a1e',   /* the one brown pixel that says kernel  */

    /* the hot cheddar kind */
    cheddar:      '#f0922e',
    cheddarHi:    '#ffc45a',
    cheddarDust:  '#c9641c',

    /* the marshmallow, worth five */
    marshWhite:   '#fff8f4',
    marshPink:    '#f2d9dc',
    marshShade:   '#d9c3c6',

    /* the controller lost down the back */
    controller:   '#1b1b1d',
    controllerGrey: '#5c5c60',

    /* an extra life glows the same colour in every level or the colour
       teaches the player nothing: these are PlayScene's LIFE_LEAF and
       LIFE_PALE, written out again as rgba in drawBoon's gradient,
       which cannot take a hex */
    lifeJade:     '#5fae9a',
    lifePale:     '#93d8bd',

    outline:      R.outline,
    void:         R.void
  };

  var END_MIN = LivingRoom.END_MIN;
  var CEIL_KILLS = LivingRoom.CEIL_KILLS;

  /* THE GRAVITY IS SET BY WHERE A KERNEL LANDS, not by how a kernel
     falls. The engine spawns a drop at VW - rand(dropAheadMin,
     dropAheadMax), which for this bay is x 280..376, and it falls 209px
     from the moulding to the cushion while the world slides left under
     it. The whole point of this level is that you can SEE the popcorn
     hopping about, so a kernel has to still be on the screen when it
     arrives.

       grav 110 - 1.83s of fall - lands at x -38..58 at speedMax
       grav 120 - 1.75s         - lands at x -25..71
       grav 150 - 1.58s         - lands at x   6..102
       grav 220 - 1.32s         - lands at x  51..147, and reads as hail

     150 is the lightest gravity at which every kernel is still on
     screen at top speed, and at speedStart it puts them down at x
     104..200 - straight in front of the doodad. The engine's own drop
     loop never sees this number because stepDrop takes the four lines
     over, but everything below is integrated against it.

     Against it the hops are timed too: a 46px hop at 150 takes 1.57s
     from the cushion and back, a 20px one 1.03s, so a kernel's rhythm
     is something a player can count after watching one of them. */
  var DROP_GRAV = 150;

  /* Vestigial, and honestly so. landDrop is the splat, and stepDrop
     never returns true, so nothing in this bay is ever broken. It is
     published because the contract publishes it and because
     drawDropSplat has to have a duration to fade over if some future
     engine ever lands one of these. */
  var SPLAT_TIME = 1.2;

  /* HOW HIGH A KERNEL COMES BACK UP.

     Not a restitution. A kernel is re-launched to a FIXED apex of its
     own, roughly the one it had last time, and there are two reasons:

     1. A damped bounce ends with a kernel at rest. A kernel at rest is
        a 7px hazard sitting 4px above a floor that already kills, and
        the player who clips it has been killed by something they read
        as scenery. Nothing in this bay ever comes to rest.
     2. A fixed apex has a fixed PERIOD. The kernel you are about to fly
        over is doing the same thing it did the last two times, so one
        look at it tells you where it will be, which is the difference
        between a harsh level and a coin toss.

     46 is the ceiling on the apex and it is the only number here that
     was solved for. At gapMin 82 the engine puts the lowest gap's lower
     lip at FLOOR-34 and a doodad flying that gap's centre line has its
     hitbox bottom at FLOOR-64. A kernel launched at 46 x 1.15 tops out
     53px above the cushion, which puts the top of its box at FLOOR-60 -
     four pixels of daylight. Fly the middle of the gap and the popcorn
     cannot reach you; sink in the gap and it can. That is the deal this
     level offers and it is the same deal every time. */
  var HOP_MIN = 20, HOP_MAX = 46;
  var HOP_VARY = 0.15;         /* +-15%, so the rhythm stays learnable  */

  /* The marshmallow is soft and it is a gift, so it barely hops at all
     and stays down where it can be dived for. */
  var MARSH_HOP_MIN = 9, MARSH_HOP_MAX = 14;

  /* How far a kernel will wander sideways in world space once it has
     touched down. Capped at 56 against a world that scrolls at 112 to
     174, so a kernel can lag the room or run ahead of it a little
     without ever outrunning it off the right-hand edge. */
  var VX_MAX = 56;

  /* The collision radius a kernel uses against the furniture and
     against its neighbours. 3.5 is half of the 7px art: a kernel is
     collided as the ball it looks like, not as the square it is drawn
     in. PAIR_D is the same number doubled - two kernels touch when
     their centres are 7 apart. */
  var KERNEL_R = 3.5;
  var PAIR_D = 7;

  /* The marshmallow's odds. They live here rather than in the tune
     because the ART is what has to know: a +5 the module has not rolled
     keeps a kernel's width, a kernel's hop and - worst - a kernel's
     plain white sprite, and the player reads an incoming hazard and
     dodges five points. GOLD_GAP keeps two from arriving together. */
  var GOLD_CHANCE = 0.040, GOLD_GAP = 7;
  var goldGap = 0;

  /* the 15 neutral effect colours PlayScene paints its particles, its
     dust and its washes out of. It never reads P. The air is the
     room's, shared by all four bays, so the dust drifting through the
     Couch is the dust drifting through the Desk. */
  var FX = {
    motes:    LivingRoom.AIR.motes,  motesHi: LivingRoom.AIR.motesHi,
    /* a kernel letting go of the moulding is popcorn-coloured */
    puff:     '#e9dcc0',   puffHi:   '#f6efe2',
    /* and what comes off the cushion when one lands on it is cushion
       fluff - these are also the two colours of the bounce particles
       the engine throws for every single hop, which is most of what
       makes a hop read as a contact rather than as a change of mind */
    ground:   '#8a8176',   groundHi: '#b8afa3',
    splat:    '#f6efe2',   splatHi:  '#ffd27a',
    hot:      '#f0922e',   hotMid:   '#ffb347',  hotHi: '#ffe08a',
    heat:     '#f0922e',   heatEdge: '#b84d12',
    glowCore: '255,224,138', glowEdge: '240,146,46'
  };

  /* the one-off heads up when a hazard arms: the thing, then the excuse */
  var WARN = {
    drop:  ['▼ POPCORN ▼', 'IT DOES NOT STOP BOUNCING'],
    /* The drifts are the same popcorn, heaped. They get their own line
       anyway, because a thing that kills and never moves is a different
       promise from a thing that kills and never stops. */
    spike: ['▲ DRIFTS ▲', 'IT PILES UP WHERE IT LANDS'],
    ceil:  LivingRoom.WARN_CEIL
  };

  /* the thirteen colours the generic level-select window would use.
     This bay paints its own cover below, but the table stays honest. */
  var PREVIEW = {
    /* the FIELD, not the lid: a generic card painted out of this table
       has to come out grey microfibre, because that is what the bay is */
    back: P.backMid, backAlt: P.backLit, seam: P.backCrease,
    beam: P.pillowCream, beamDark: P.pillowGold, beamLight: P.pillowHi,
    ground: P.seat, groundDark: P.seatShade, groundHi: P.seatHi,
    spike: P.popWhite, spikeHi: P.popHi, air: R.lampGlow, gloom: P.void
  };

  /* The captions PlayScene puts on the two things worth catching.
     MARSHMALLOW was the first word here and it did not fit: the +5
     shout is drawn centred on where it was caught, clamped to x 30 at
     the nearest, so a caption may be at most 60px wide before its left
     end leaves the screen. The font is 5px on a 6px advance, so the
     whole string - the name, a space, '+5' - gets ten characters, which
     is seven for the name. 'MARSHMALLOW +5' is fourteen and measured 83
     wide: two characters drew off the left edge. MALLOW is what anybody
     actually calls one, and it is six. */
  var BOON_NAME = 'COASTER';
  var GOLD_NAME = 'MALLOW';

  var T = {};              /* baked tiles and sprites */

  /* ------------------------------------------------------- geometry

     Where the furniture is, in screen pixels, named once so that the
     tile that bakes a thing and the code that places it cannot drift
     apart. The bay is six horizontal bands and the proportions are Couch
     ref 2's, measured off the photograph rather than guessed:

        24       the crown moulding (the room's, and it kills)
        26..85   the shutters: two panels, nine louvres each
        86..93   the window sill, with the sofa's shadow thrown up it
        94..97   the lit roll along the top of the sectional
        98..234  THE TUFTED BACK - the field, and most of the screen
        189..241 three throw cushions propped on the seat, leaning back
        235..241 the crease where the back cushions meet the seat
        242..269 the seat cushion - this bay's FLOOR band
        258..269 the coffee table, in front of everything

     The seat is the floor on purpose. The brief says the popcorn
     bounces off the cushions, and 238 - the line every drop in the game
     contacts - lands exactly in the crease where the back cushions meet
     the seat, which is where popcorn collects on a real couch. Moving
     the sofa up from 174 to 94 did not move that line by a pixel: every
     number the hops are solved against is quoted off FLOOR. */
  var BACK_Y  = 94;        /* the top of the sectional tile             */
  var TABLE_Y = 258;       /* the coffee table's top edge               */

  /* ------------------------------------------------------- the window

     One 384px tile carrying four 90px plantation shutter panels and the
     6px of wall between each pair. Open, shut, shut, open, which is
     Couch ref 2's window exactly - the two in the middle are closed and
     the two on the outside show the night - and which also means the
     band has a dark stretch and a light stretch rather than one
     alternating texture.

     IT IS 384 AND NOT 192 BECAUSE OF THE LEAF. One monstera per tile at
     192 put two or three of them on screen at once, all at the same
     height, and a plant that repeats is wallpaper. At 384 there is
     usually one and never more than two, and the panel pattern takes
     twice as long to come round.

     IT IS A BAND, 70 ROWS DEEP, and that is the whole of this fix. It
     used to be 218 - every row from the moulding to the floor - and the
     Couch and the Desk came out as the same level. Couch ref 2 has the
     sill about a quarter of the way down the frame with the sofa under
     it, so 70 rows out of 218 is the photograph's own proportion.

     Shrinking it cost a louvre count and a pitch. Nineteen slats at a
     7px pitch needs 133 rows; the band has 54 between the top rail and
     the sill, which is nine slats at 6. The timber-to-air ratio goes
     from 5:2 to 4:2, which is if anything righter - a louvred panel is
     mostly the air between the slats, and if the air is thinner than
     the timber the eye calls it corrugation. */
  var SH_W = 384, SH_H = 70;              /* 384 x 70, drawn at y=CEIL  */
  var PANEL_W = 90, STILE = 6;
  var RAIL_Y  = 2,   RAIL_H = 6;          /* local; screen 26..31       */
  var LOUV_Y  = 8,   LOUV_N = 9, LOUV_P = 6;    /* screen 32..85        */
  var SILL_Y  = 62,  SILL_H = 8;          /* screen 86..93              */

  function shutterPanel(c, px, open, r) {
    var i, y, k;
    var FIELD_X = px + STILE, FIELD_W = PANEL_W - STILE * 2;
    var ROD_X = px + Math.round(PANEL_W / 2) - 1;

    /* the frame: two stiles, a top rail and a sill, all one panel's
       worth of painted timber */
    c.fillStyle = P.shutterMid;
    c.fillRect(px, 0, PANEL_W, SILL_Y + SILL_H);
    c.fillStyle = P.shutterLit;
    c.fillRect(px + 1, 0, 2, SILL_Y + SILL_H);
    c.fillRect(px + PANEL_W - 5, 0, 2, SILL_Y + SILL_H);
    c.fillStyle = P.shutterShade;
    c.fillRect(px + STILE - 1, 0, 1, SILL_Y + SILL_H);
    c.fillRect(px + PANEL_W - STILE, 0, 1, SILL_Y + SILL_H);

    /* the top rail, and the hard line under it the louvres hang from */
    c.fillStyle = P.shutterLit;   c.fillRect(px, RAIL_Y, PANEL_W, 2);
    c.fillStyle = P.shutterShade; c.fillRect(px, RAIL_Y + RAIL_H - 1, PANEL_W, 1);

    /* THE LOUVRES, on a 6px pitch: the lit nose of the slat, two rows
       of its face, the shadow it throws on the slat below, and then TWO
       rows of gap. Two and not one because one was all this band needed
       to stop reading as a shutter and start reading as a roller door.
       The two gap rows are the one thing that did NOT come out of the
       pitch when the band was cut from 218 rows to 70; the face lost a
       row instead.

       On the open panel the gap is the night outside, and it is the
       only cool colour anywhere in this bay. On the shut one it is more
       timber in shadow. The photograph has one of each. */
    for (i = 0; i < LOUV_N; i++) {
      y = LOUV_Y + i * LOUV_P;
      c.fillStyle = P.shutterLit;   c.fillRect(FIELD_X, y, FIELD_W, 1);
      c.fillStyle = P.shutterMid;   c.fillRect(FIELD_X, y + 1, FIELD_W, 2);
      c.fillStyle = P.shutterShade; c.fillRect(FIELD_X, y + 3, FIELD_W, 1);
      if (open) {
        c.fillStyle = (i % 4 === 3) ? P.nightDeep : P.nightBlue;
        c.fillRect(FIELD_X, y + 4, FIELD_W, 1);
        c.fillStyle = P.nightDeep;
        c.fillRect(FIELD_X, y + 5, FIELD_W, 1);
      } else {
        c.fillStyle = P.shutterDark; c.fillRect(FIELD_X, y + 4, FIELD_W, 2);
      }
    }

    /* the palm nobody has trimmed, seen through the open panel: fronds
       drawn ONLY into the night rows, so they appear as a broken line
       the way a thing behind a blind actually does */
    if (open) {
      for (k = 0; k < 6; k++) {
        var fx = FIELD_X + 8 + Math.floor(r() * (FIELD_W - 24));
        var fy = LOUV_Y + 4 + Math.floor(r() * LOUV_N) * LOUV_P;
        var fl = 10 + Math.floor(r() * 14);
        var dy = r() < 0.5 ? 1 : -1;
        for (i = 0; i < fl; i++) {
          var py = fy + Math.round(i / 5) * LOUV_P * dy;
          if (py < LOUV_Y || py >= LOUV_Y + LOUV_N * LOUV_P) continue;
          if ((py - LOUV_Y) % LOUV_P < 4) continue;
          c.fillStyle = P.nightDeep;
          c.fillRect(fx + i, py, 1, 1);
        }
      }
    }

    /* THE TILT ROD. One 3px batten down the middle of the panel with a
       staple into every slat, and it is worth more than everything else
       in this tile put together: slats alone are a pattern, and slats
       with a rod down them are a plantation shutter. */
    c.fillStyle = P.shutterShade;
    c.fillRect(ROD_X - 1, RAIL_Y + RAIL_H, 5, SILL_Y - 3 - RAIL_Y - RAIL_H);
    c.fillStyle = P.shutterMid;
    c.fillRect(ROD_X, RAIL_Y + RAIL_H, 3, SILL_Y - 3 - RAIL_Y - RAIL_H);
    c.fillStyle = P.shutterLit;
    c.fillRect(ROD_X, RAIL_Y + RAIL_H, 1, SILL_Y - 3 - RAIL_Y - RAIL_H);
    for (i = 0; i < LOUV_N; i++) {
      c.fillStyle = P.shutterShade;
      c.fillRect(ROD_X, LOUV_Y + i * LOUV_P + 2, 3, 1);
    }

    /* the bottom rail and the sill nose, which is the shelf the
       sectional's back stops just under */
    c.fillStyle = P.shutterShade; c.fillRect(px, SILL_Y - 3, PANEL_W, 2);
    c.fillStyle = P.outline;      c.fillRect(px, SILL_Y - 1, PANEL_W, 1);
    c.fillStyle = P.shutterLit;   c.fillRect(px - 2, SILL_Y, PANEL_W + 4, 2);
    c.fillStyle = P.shutterMid;   c.fillRect(px - 2, SILL_Y + 2, PANEL_W + 4, 4);
    c.fillStyle = P.shutterShade; c.fillRect(px - 2, SILL_Y + 6, PANEL_W + 4, 1);
    c.fillStyle = P.outline;      c.fillRect(px - 2, SILL_Y + 7, PANEL_W + 4, 1);

    /* and the hard edge round the whole panel. Three in ten pillars are
       cream and they pass in front of this: the outline is half of what
       keeps them from dissolving into it. */
    c.fillStyle = P.outline;
    c.fillRect(px - 1, 0, 1, SILL_Y);
    c.fillRect(px + PANEL_W, 0, 1, SILL_Y);
  }

  /* The monstera in the corner of the window. Three notches cut into
     its right edge is the whole of what makes a 24x30 green blob read
     as that particular plant. */
  function monstera(c, x, y) {
    var ROWS = [
      [10, 4], [7, 10], [5, 14], [3, 17], [2, 19], [1, 21], [1, 22],
      [0, 23], [0, 23], [0, 23], [0, 24], [0, 24], [0, 24], [0, 23],
      [0, 23], [0, 22], [1, 21], [1, 20], [2, 19], [2, 17], [3, 16],
      [4, 14], [5, 12], [6, 11], [7, 9], [8, 8], [9, 6], [10, 5],
      [11, 3], [12, 2]
    ];
    var i;
    LivingRoom.rowsOutline(c, ROWS, x, y, P.outline);
    LivingRoom.rowsFill(c, ROWS, x, y, P.leafMid);
    /* the midrib, and the veins running out of it to the leaf's edge */
    c.fillStyle = P.leafDark;
    for (i = 0; i < ROWS.length; i++) c.fillRect(x + 11, y + i, 1, 1);
    for (i = 3; i < 26; i += 4) {
      var half = Math.round(ROWS[i][1] / 2);
      c.fillRect(x + 12, y + i, half - 1, 1);
      c.fillRect(x + 11 - half + 2, y + i + 1, half - 2, 1);
    }
    /* the three notches, cut back to the midrib out of the right edge */
    [[6, 5], [13, 6], [20, 5]].forEach(function (n) {
      c.fillStyle = P.leafDark;
      c.fillRect(x + 13, y + n[0], 11, n[1]);
    });
    c.globalCompositeOperation = 'destination-out';
    [[6, 5], [13, 6], [20, 5]].forEach(function (n) {
      c.fillStyle = '#000';
      c.fillRect(x + 15, y + n[0] + 1, 10, n[1] - 2);
    });
    c.globalCompositeOperation = 'source-over';
  }

  function bakeShutters() {
    var t = makeCanvas(SH_W, SH_H), c = t.ctx;
    var r = mulberry32(6120), i;

    /* the wall behind, which is what shows in the 6px reveal between
       the two panels and everywhere below the sill */
    c.fillStyle = P.wall;
    c.fillRect(0, 0, SH_W, SH_H);

    shutterPanel(c, 1, true, r);     /* open to the night        */
    shutterPanel(c, 97, false, r);   /* shut                     */
    shutterPanel(c, 193, false, r);  /* shut                     */
    shutterPanel(c, 289, true, r);   /* open to the night        */

    /* the monstera in the corner of the open panel, on a stem that goes
       off the left edge of the tile - a leaf floating in the middle of
       a pane is a sticker, and a leaf on a stalk is a plant standing
       somewhere off to the side of the room. It used to hang at local
       y 72, which no longer exists; in Couch ref 1 and ref 4 it is in
       the TOP corner of the window anyway. */
    for (i = 0; i < 10; i++) {
      c.fillStyle = i > 6 ? P.leafDark : P.leafMid;
      c.fillRect(i, 30 + Math.round(i * 0.5), 1, 2);
    }
    monstera(c, 6, 14);              /* local 14..43, screen 38..67 */

    /* NO STEP BACK TOWARD THE WALL. There used to be a 3/16 Tint of
       P.wall over the whole tile, because the shutters were the entire
       backdrop and three in ten pillars had to beat them. Now they are
       the top seventy rows and the pillars' problem is the grey field
       below, so the timber is allowed to be the colour it is in the
       photograph - and taking the beige out of this tile is half of
       what stops the bay reading as the Desk. */
    return t;
  }

  /* --------------------------------------------------- the sectional

     The back of the couch, 480 wide so one copy fills the screen, with
     the diamond tufting baked straight into it and three cushions
     propped on the seat leaning back against it. It is 148 rows deep
     and it is THE FIELD OF THE LEVEL - the thing a player sees behind
     everything else, the thing that says in one frame which bay they
     are in. It is not dimmed the way a backdrop layer usually is,
     because a backdrop you are flying across is not a backdrop.

     Everything in here is a horizontal band or a baked shape, so the
     0.62 parallax only ever moves it sideways: the crest at y 94 is a
     perfectly flat line across the screen no matter where the scroll
     has got to, and so is the crease at 235, which is what makes the
     pair of them usable as the top and the bottom of the popcorn zone. */
  var CO_W = 480, CO_H = FLOOR - BACK_Y;   /* 480 x 148, drawn at y 94 */

  /* THE TUFTING LATTICE. 48 wide because 480/48 is a whole number and
     this tile is laid end to end - a lattice that does not divide into
     480 puts a seam in the upholstery every screen. 37 tall because
     148/37 is also a whole number, so the diamonds close at the crease
     and at the crest instead of being cut off half a button short, and
     because four diamonds down a 148px back is what Couch ref 2 has.
     The pitch is also set against the pillars: at 34x26 the cells came
     out the same size as the 34px cushions standing in front of them,
     and two grids of one pitch read as one tiled wall. */
  var CELL_W = 48, CELL_H = 37;

  /* A 56x52 throw cushion propped against the back, drawn into its own
     little canvas so the outline can go underneath it.

     The first cut of this was a square with a 2px border round it and a
     filled medallion in the middle, and on a dark wall it read as a
     FRAMED PICTURE, which is the one thing it must not be. Three things
     fix that and all three are about silhouette rather than about
     pattern: the corners are pinched in, the whole thing LEANS - every
     row is shifted a little further right than the one below it,
     because a cushion propped against a sofa back is never upright -
     and the shading is radial, so it is fattest in the middle.

     `style` picks which of the photograph's three it is: the gold
     damask, the same print in grey, or the plain one with three rows of
     stitching across it. */
  function throwPillow(c, x, y, style) {
    var W = 56, H = 52, LEAN = 7;
    var gold  = style === 'gold';
    var motif = gold ? P.propMotif : P.propGreyShade;
    var deep  = P.propGreyDeep;
    var i, k, rows = [];

    for (i = 0; i < H; i++) {
      /* the corner pinch: four rows at each end, taken in a pixel at a
         time, which is a soft corner and not a chamfer */
      var ins = 0;
      if (i < 4) ins = 4 - i;
      else if (i > H - 5) ins = 5 - (H - i);
      /* and the lean. The top of the cushion is further right than its
         foot, so it is resting on something. */
      rows.push([ins + Math.round((H - 1 - i) / (H - 1) * LEAN), W - ins * 2]);
    }

    var t = makeCanvas(W + LEAN + 2, H + 2), g = t.ctx;
    LivingRoom.rowsFill(g, rows, 1, 1, P.propGrey);

    /* the stuffing, the pillars' formula: distance from the middle in
       cushion-widths, tipped one step toward the lamp */
    for (i = 0; i < H; i++) {
      for (k = 0; k < rows[i][1]; k++) {
        var dx = (rows[i][0] + k - (W + LEAN) / 2) / (W / 2);
        var dy = (i - (H - 1) / 2) / (H / 2);
        var lit = Math.sqrt(dx * dx + dy * dy) - (dx * 0.26 + dy * 0.30);
        var col = lit < 0.40 ? P.propGreyHi : (lit < 0.88 ? null : (lit < 1.10 ? P.propGreyShade : deep));
        if (!col) continue;
        g.fillStyle = col;
        g.fillRect(1 + rows[i][0] + k, 1 + i, 1, 1);
      }
    }

    /* The print, as THREAD: a scroll, a ring of dots round it and four
       more at the compass points. Open, because a filled medallion at
       this size is a shape printed on a panel and an open one is
       embroidery on cloth.

       AND IT IS A SCROLL AND NOT A DIAMOND, which it used to be. The
       open diamond is what the pillar cushions wear, and a piece of
       scenery wearing the hazard's badge - at the hazard's own size, in
       the hazard's own cream - is the reason a player could not pick a
       column out of the backrest. Couch ref 4's cushions are covered in
       opposed curls anyway; the diamond was never the photograph's, it
       was the pillar's. So the backrest keeps the curls and gives the
       diamond up, and the only open diamond left in the bay is on
       something that will end the run. */
    var cx = 1 + Math.round(W / 2) + 2, cy = 1 + Math.round(H / 2);
    if (style === 'stitch') {
      /* three runs of dark stitching, which is the whole of the plain
         cushion's pattern in the photograph */
      for (k = 0; k < 3; k++) {
        for (i = 0; i < 30; i += 3) {
          g.fillStyle = P.propGreyShade;
          g.fillRect(cx - 15 + i + Math.round(k * 1.4), cy - 14 + k * 5, 2, 1);
        }
      }
    } else {
      g.fillStyle = motif;
      for (i = 0; i < 24; i++) {
        var sa = i / 24 * Math.PI;
        g.fillRect(cx + Math.round(Math.cos(sa) * 11), cy - 4 + Math.round(Math.sin(sa) * 7), 1, 1);
        g.fillRect(cx - Math.round(Math.cos(sa) * 11), cy + 4 - Math.round(Math.sin(sa) * 7), 1, 1);
      }
      g.fillStyle = deep;
      for (k = 0; k < 18; k++) {
        var a = k / 18 * TAU;
        g.fillRect(cx + Math.round(Math.cos(a) * 15), cy + Math.round(Math.sin(a) * 14), 1, 1);
      }
      g.fillStyle = motif;
      g.fillRect(cx - 1, cy - 2, 3, 3);
      [[0, -21], [0, 20], [-23, 0], [22, 0]].forEach(function (p) {
        g.fillRect(cx + p[0] - 1, cy + p[1], 2, 2);
      });
    }

    var m = makeCanvas(W + LEAN + 2, H + 2);
    LivingRoom.rowsFill(m.ctx, rows, 1, 1, '#ffffff');
    g.globalCompositeOperation = 'destination-in';
    g.drawImage(m.canvas, 0, 0);
    g.globalCompositeOperation = 'destination-over';
    g.drawImage(LivingRoom.ringOf(m, W + LEAN + 2, H + 2).canvas, 0, 0);
    g.globalCompositeOperation = 'source-over';
    c.drawImage(t.canvas, x - 1, y - 1);
  }

  /* THE THIRD CUSHION, and the reason this is not the knit throw it was
     drawn as twice. A bundled blanket on a sofa back has no silhouette
     worth having at fifty pixels: whatever texture goes on it - ribs,
     dashes, a mesh - the shape underneath stays a soft-cornered slab,
     and a pale soft-cornered slab reads as a panel rather than as
     cloth. Both cuts of it came out as a stack of paper. The photograph
     has a third cushion propped at that end of the sectional anyway,
     plain cream with three rows of dark stitching across it, so that is
     what goes there - and three cushions in a row is also what the sofa
     in Couch ref 4 actually looks like. */
  function stitchPillow(c, x, y) { throwPillow(c, x, y, 'stitch'); }

  function bakeCouch() {
    var t = makeCanvas(CO_W, CO_H), c = t.ctx;
    var x, y, i, j;
    var FIELD = 4;                        /* local row the tufting starts  */
    var CREASE = CO_H - 7;                /* local 141, screen 235         */

    /* 1. the body, and the roll along the top of it. The outline is the
       hard edge the house style asks for everywhere a solid thing meets
       something behind it; the three rows under it are the roll of the
       backrest catching the pendants, crest then backLit, which is what
       Couch ref 2's top edge actually does. */
    c.fillStyle = P.backMid;  c.fillRect(0, 0, CO_W, CO_H);
    c.fillStyle = P.outline;  c.fillRect(0, 0, CO_W, 1);
    c.fillStyle = P.crest;    c.fillRect(0, 1, CO_W, 1);
    c.fillStyle = P.backLit;  c.fillRect(0, 2, CO_W, 2);

    /* 2. THE DIAMOND TUFTING, and it is a surface rather than a pattern.
       Drawn once as four short diagonal creases out of each button, it
       came out as an argyle lattice louder than the pillars standing in
       front of it - the lines read and the padding did not. So the
       diamonds are filled instead: every pixel of the back is asked how
       far it is from the nearest fold, and the far ones are the swell.

       u and v are the lattice coordinates rotated 45 degrees, which is
       the cheapest honest way to say "diamond" on a grid: the folds are
       the two families of lines where either one lands on a whole
       number, min(du,dv) is how deep into a diamond a pixel is - zero
       on a fold, a half at the centre - and a button is where four
       folds cross.

       THE SWELL IS HALF-LIT, not lit all over, and that is the one
       thing that makes 148 rows of this read as upholstery rather than
       as wallpaper. The pendants are overhead and a little to the left,
       so each diamond is bright on its upper-left face and falls away
       to the fold below it. eu/ev are the pixel's offset from ITS OWN
       diamond's centre - the centre is the half-integer corner of the
       cell it is in - and nx/ny turn that back into screen terms, so
       the lamp direction is stated once, in screen space, the same way
       the pillars and the cushions state it. Baked, because this is a
       per-pixel pass over seventy thousand pixels and it would be
       absurd anywhere else. */
    for (y = FIELD; y < CREASE; y++) {
      for (x = 0; x < CO_W; x++) {
        var u2 = x / CELL_W + y / CELL_H;
        var v2 = x / CELL_W - y / CELL_H;
        var fu = u2 - Math.round(u2), fv = v2 - Math.round(v2);
        var du = fu < 0 ? -fu : fu, dv = fv < 0 ? -fv : fv;
        var across, along;
        if (du < dv) { across = du; along = dv; } else { across = dv; along = du; }
        if (across < 0.060 * (1 - along * 1.55)) {
          /* THE FOLD, AND IT IS PULLED AT THE BUTTON AND LETS GO
             BETWEEN TWO. `across` is how far off a fold line a pixel
             is; `along` is how far down that fold it has got - zero on
             a button, a half at the midpoint between two of them. So
             the crease is ~3.5 screen pixels wide where the thread
             comes through and tapers to nothing about two thirds of the
             way along, leaving the middle of every fold open. A crease
             of one width all the way round came out as quilted vinyl -
             a diner booth, not a microfibre sofa - and the buttons,
             which are the one mark that actually says tufted,
             disappeared into the lattice crossing over them. */
          c.fillStyle = P.backCrease;
        } else {
          /* THE SWELL, and it is the pillars' own formula so that a
             tuft and a cushion are lit by the same lamp. eu/ev are the
             pixel's offset from ITS OWN diamond's centre - the
             half-integer corner of the cell it landed in - and nx/ny
             are that offset put back into screen terms, across and
             down, scaled so the four points of the diamond sit at a
             radius of one. Then it is a disc, pushed UP: the pendants
             are overhead and a little to the left, so a tuft is bright
             above its middle and falls away into the fold under it.

             The first cut of this took the Chebyshev distance to the
             nearest fold and tilted that, which is a diamond falloff
             tilted off a diamond cell - it gave a row of pointed cones
             like little bells, and a wall of them read as a pattern
             printed on a flat panel rather than as padding. */
          var eu = fu - (fu < 0 ? -0.5 : 0.5), ev = fv - (fv < 0 ? -0.5 : 0.5);
          var nx = eu + ev, ny = eu - ev;
          if (Math.sqrt(nx * nx + ny * ny) + ny * 0.30 + nx * 0.12 > 0.58) continue;
          c.fillStyle = P.backLit;
        }
        c.fillRect(x, y, 1, 1);
      }
    }

    /* 3. A BUTTON WHEREVER FOUR FOLDS MEET, on the lattice's own nodes:
       whole-number rows straight, half-number rows shifted half a cell,
       which is a diamond grid and is what the photograph's buttons do.
       Seven rows of them fall inside the field.

       EACH ONE IS A PUCKER AND THEN A HOLE, and the pucker is what
       makes it read. A 2x2 of #3a342e dropped straight onto the
       crossing was invisible: a button is only 27 values darker than
       the crease it sits in the middle of, and the crease is at its
       widest exactly there, so the whole thing vanished into a dark
       junction. What a real button does is gather the fabric into a
       little raised ring around itself, and a ring that catches the
       lamp is 48 values LIGHTER than the crease. So: a five-across plus
       of backLit, then the 3x3 hole punched into the middle of it.
       Bright ring, dark core, and it carries at one to one.

       Stamped AFTER the per-pixel pass rather than tested inside it,
       because a button wants a crisp square edge and the pass's
       thresholds would hand it a soft one. */
    for (j = 0; j * CELL_H / 2 <= CO_H; j++) {
      var by = Math.round(j * CELL_H / 2);
      if (by < FIELD + 3 || by > CREASE - 3) continue;
      var off = (j & 1) ? CELL_W / 2 : 0;
      for (i = 0; i * CELL_W + off < CO_W; i++) {
        var bx = Math.round(i * CELL_W + off);
        /* the pucker, with its four corners left off - a 5x5 square of
           highlight is a little steel plate, and gathered cloth has no
           corners */
        c.fillStyle = P.backLit;
        c.fillRect(bx - 1, by - 2, 3, 5); c.fillRect(bx - 2, by - 1, 5, 3);
        c.fillStyle = P.button;  c.fillRect(bx - 1, by - 1, 3, 3);
      }
    }

    /* 4. the two section joins - a sectional is three pieces of
       furniture pretending to be one, and the seams are where it gives
       itself away. x 0 is the tile seam, so laying the join on it is
       also what hides the repeat. */
    c.fillStyle = P.button;
    c.fillRect(0, FIELD, 2, CREASE - FIELD);
    c.fillRect(240, FIELD, 2, CREASE - FIELD);
    c.fillStyle = P.backLit;
    c.fillRect(2, FIELD, 1, CREASE - FIELD);
    c.fillRect(242, FIELD, 1, CREASE - FIELD);

    /* 5. THE CREASE. The seam where the back cushions meet the seat,
       and the darkest band in the bay by two whole values. A kernel
       contacts at FLOOR-4, which is three rows into this, so every
       white hopping thing in the level is seen against the one place in
       the room that is nearly black. That is not decoration, it is the
       legibility budget - and it is the budget that paid for the field
       above being lightened. */
    c.fillStyle = P.button;    c.fillRect(0, CREASE - 1, CO_W, 1);
    c.fillStyle = P.seatDeep;  c.fillRect(0, CREASE, CO_W, CO_H - CREASE);

    /* 6. and the three cushions propped on the seat, leaning back on
       it. 95 puts a 52px cushion's bottom six rows inside the crease,
       which is what a cushion standing on a seat does - it sinks into
       the seam rather than sitting on a line. Their tops reach local
       95, a little past halfway up the back, which is where they reach
       in Couch ref 4. They used to stand at the top of a 68px strip
       with their heads over the crest; a cushion at the TOP of a sofa
       back is a cushion nobody could sit next to. */
    throwPillow(c, 62,  CO_H - 53, 'gold');
    throwPillow(c, 300, CO_H - 53, 'grey');
    stitchPillow(c, 384, CO_H - 53);

    /* and the crease laid back over their feet, so they sink into it
       rather than stopping dead on it. Over the crease itself this is
       seatDeep on seatDeep and changes nothing; over a cushion it is
       three quarters of the way to the dark. */
    Tint.rect(c, 0, CREASE, CO_W, CO_H - CREASE, P.seatDeep, 12);
    return t;
  }

  /* --------------------------------------------------- the seat band

     This bay's FLOOR: 28 rows of grey microfibre seen from just above,
     with the welt catching the lamp along its top edge and the front of
     the cushion falling away into the dark at the bottom of the screen.

     `nap` is the whole of why it does not read as a grey rectangle.
     Microfibre is a pile fabric and it shows every direction it has
     been brushed in; 120 seeded single pixels, half a value lighter and
     half a value darker, is enough to say so and little enough that the
     band still reads as one flat surface to land on. */
  function bakeSeat() {
    var W = 160, H = VH - FLOOR, i, k;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(4820);

    c.fillStyle = P.seat;      c.fillRect(0, 0, W, H);
    c.fillStyle = P.seatHi;    c.fillRect(0, 0, W, 1);
    c.fillStyle = P.seatLit;   c.fillRect(0, 1, W, 1);
    /* The nap. Microfibre shows every direction it has been brushed in,
       and the way to say so is long shallow strokes rather than grains
       of sand - the first cut of this band used 120 single pixels at
       two full values of contrast and read as wet concrete. */
    for (i = 0; i < 54; i++) {
      c.fillStyle = r() < 0.5 ? P.seatLit : P.seatShade;
      c.fillRect(Math.floor(r() * W), 3 + Math.floor(r() * 17), 3 + Math.floor(r() * 8), 1);
    }
    /* and two creases where somebody has been sitting */
    for (i = 0; i < 2; i++) {
      var wx = Math.floor(r() * W), wy = 7 + i * 6, wl = 20 + Math.floor(r() * 24);
      for (k = 0; k < wl; k++) {
        var wy2 = wy + Math.round(Math.sin(k / wl * Math.PI) * 2);
        c.fillStyle = P.seatShade; c.fillRect((wx + k) % W, wy2, 1, 1);
        c.fillStyle = P.seatLit;   c.fillRect((wx + k) % W, wy2 + 1, 1, 1);
      }
    }
    /* THE CUSHION ITSELF. One tile is one seat cushion, so it is fattest
       in the middle and falls away to the joins at either end - without
       this the band is a flat field of speckle and reads as paving. */
    for (i = 0; i < W; i++) {
      var e = Math.abs(i - W / 2) / (W / 2);
      if (e > 0.72) Tint.rect(c, i, 0, 1, 22, P.seatShade, Math.round((e - 0.72) * 26));
      else if (e < 0.34) Tint.rect(c, i, 1, 1, 18, P.seatHi, 2);
    }
    /* the front seam of the cushion, and then the front face of it */
    c.fillStyle = P.seatShade; c.fillRect(0, 21, W, 1);
    c.fillStyle = P.seatDeep;  c.fillRect(0, 22, W, H - 22);
    Tint.rect(c, 0, 23, W, H - 23, P.void, 4);

    /* One cushion join, laid on the tile seam so it wraps cleanly: the
       seat of a sectional is three cushions and the eye wants to see
       where one stops. */
    c.fillStyle = P.seatDeep; c.fillRect(0, 0, 2, 22);
    c.fillStyle = P.seatHi;   c.fillRect(2, 0, 1, 22);

    /* And the whole band takes one step into the room's night. The lamp
       is overhead so a horizontal surface is the brightest thing in the
       bay by rights, but LivingRoom.drawLight stops at FLOOR and
       everything above this band has had the night and the void washes
       laid over it - left alone the seat came out eleven values clear
       of the back it is attached to, and read as a different piece of
       furniture. With the wash it lands at a luminance of 97, between
       the crease above it (62) and the tufted field above that (106),
       which is the right order for one sofa seen from above. */
    Tint.rect(c, 0, 0, W, H, R.nightShade, 4);
    return t;
  }

  /* -------------------------------------------------- the coffee table

     The only thing in this bay drawn in FRONT of the floor, and the
     reason it is allowed to be is that it never rises above y 258 - it
     is the near edge of the room and it cannot overlap anything the
     player has to read. It runs at 1.35x the world's scroll because it
     is nearer the camera than the boards are, which is also the only
     parallax in the game that is faster than 1.

     Walnut, a chessboard mid-game and the magnifying glass, all three
     straight off Couch ref 3. */
  function bakeTable() {
    var W = 480, H = VH - TABLE_Y, i, k, x, y;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(9330);

    c.fillStyle = P.walnutHi;  c.fillRect(0, 0, W, 1);
    c.fillStyle = P.walnutLit; c.fillRect(0, 1, W, 1);
    c.fillStyle = P.walnut;    c.fillRect(0, 2, W, H - 2);
    /* the grain: long runs, because a walnut top is one slab and the
       figure in it is the length of the board */
    for (i = 0; i < 46; i++) {
      c.fillStyle = r() < 0.5 ? P.walnutLit : P.woodBark;
      c.fillRect(Math.floor(r() * W), 2 + Math.floor(r() * (H - 3)),
                 6 + Math.floor(r() * 25), 1);
    }

    /* the chess set, four ranks of it showing above the screen's edge */
    c.fillStyle = P.walnutHi; c.fillRect(179, 0, 38, 1);
    for (y = 0; y < 4; y++) {
      for (x = 0; x < 12; x++) {
        c.fillStyle = ((x + y) % 2) ? P.chessDark : P.chessLight;
        c.fillRect(180 + x * 3, 1 + y * 3, 3, 3);
      }
    }
    c.fillStyle = P.woodBark; c.fillRect(179, 1, 1, H - 1); c.fillRect(216, 1, 1, H - 1);
    /* two pieces still standing on it, seen from above as caps */
    c.fillStyle = P.chessLight; c.fillRect(186, 4, 3, 3);
    c.fillStyle = P.outline;    c.fillRect(186, 7, 3, 1);
    c.fillStyle = P.chessDark;  c.fillRect(204, 1, 3, 3);
    c.fillStyle = P.outline;    c.fillRect(204, 4, 3, 1);

    /* the magnifying glass lying across the near edge */
    for (k = 0; k < 2; k++) {
      c.fillStyle = k ? P.walnutLit : P.woodBark;
      for (i = 0; i < 16; i++) {
        var a = i / 16 * TAU;
        c.fillRect(300 + Math.round(Math.cos(a) * (7 - k)),
                   6 + Math.round(Math.sin(a) * (5 - k)), 1, 1);
      }
    }
    c.fillStyle = P.walnutHi; c.fillRect(308, 5, 11, 2);
    c.fillStyle = P.woodBark; c.fillRect(308, 7, 11, 1);
    return t;
  }

  /* ---------------------------------------------------- the pillars

     Two throw cushions stacked, tiled to whatever height the gap leaves
     over. Three variants off the photograph - the tufted one, the gold
     damask one and the knit one - weighted 5/3/2, and ALL THREE ARE
     CREAM, which is the whole of this pass.

     WHY THE GREY ONE IS GONE. Five in ten columns used to be grey
     microfibre, on the argument that a grey cushion reads against the
     pale shutters where a cream one does not. The argument was sound
     and the colour was wrong, because grey microfibre is what the SOFA
     is made of: the level was painting half its hazards in the exact
     pigment of the field they stand on. Measured on the Canopy's own
     method - mean luminance of the column's body against the mean of
     the whole flight lane - the grey variant came out at 110.6 against
     a lane of 121.7, DARKER than its own backdrop by eleven, and the
     three-variant mix separated by 22.6 where the Canopy manages 86.9
     and the Whiteboard 162.5. At gapMin 82 that is eight pixels of
     timing room spent on a column the player has to work out.

     Go back to Couch ref 2 and ref 4: the sectional is grey and every
     cushion thrown on it is cream and gold. That separation is in the
     photograph; the level had lost it. So the cream belongs to the
     thing that kills you, the grey belongs to the furniture, and the
     three variants differ by PATTERN rather than by value - a gold
     cord and a tuft, an open damask medallion, a stocking stitch.
     Nothing that just sits there is painted cream any more.

     What still carries it is what always carried it: a hard outline all
     round, a 4px void shadow cast on the field behind, and a body
     (pillowCream #e8dcc0, luminance 220) a hundred and twenty values
     clear of the field it passes over (backMid #67635c, 99), and a
     hundred values of internal range inside the column itself - hi 236
     down to deep 149 - so it is a modelled object on a flat one. */
  function bakeStack(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var half, i, k, x, y, dx, dy;

    /* One cream, three fabrics. The knit is half a value duller than the
       other two because wool does not take a highlight the way a woven
       cover does, and that is as far apart as the three are allowed to
       get - the player is reading PATTERN here, not brightness. */
    var body  = variant === 2 ? P.knitCream : P.pillowCream;
    var hi    = P.pillowHi;
    var shade = variant === 2 ? P.knitShade : P.pillowShade;
    var deep  = variant === 2 ? P.pillowShade : P.pillowDeep;

    for (half = 0; half < 2; half++) {
      y = half * 32;
      c.fillStyle = body; c.fillRect(0, y, W, 32);

      /* THE STUFFING, and it is the whole job. A cushion is fattest in
         the middle and pinched at every corner, and a flat rectangle
         with a highlight down one edge is a tile - which is exactly
         what the first cut of this pillar read as, standing against
         pale shutters. So the shading is radial: how far a pixel is
         from the middle of this cushion, in cushion-widths, picks the
         tone, and the lamp's direction tips it one step lighter up and
         to the left. Four bands over 32 pixels is as much modelling as
         this size can carry and one more than it needs. */
      for (i = 0; i < 32; i++) {
        for (k = 0; k < W; k++) {
          dx = (k - (W - 1) / 2) / (W / 2);
          dy = (i - 15.5) / 16;
          var d = Math.sqrt(dx * dx + dy * dy);
          /* the light comes over the doodad's left shoulder */
          var lit = d - (dx * 0.34 + dy * 0.38);
          var col = lit < 0.34 ? hi : (lit < 0.74 ? body : (lit < 1.00 ? shade : deep));
          if (col === body) continue;
          c.fillStyle = col;
          c.fillRect(k, y + i, 1, 1);
        }
      }

      if (variant === 0) {
        /* one tuft button, with the fabric pulled in at it. Three
           pixels of pinch and no more: the first cut of this pillow had
           six, and six makes an X you can read across the room - louder
           than the pillar it is drawn on.

           The button and the pinch used to be painted out of the sofa's
           table - button, seatShade, seatHi - which is what made this
           variant a piece of the backrest with an outline round it. A
           cream velvet cushion is tufted with a GOLD covered button and
           the folds running out of it are tan, so the three marks come
           out of the cushion's own column of the table now and the only
           grey left on the thing is nothing at all. */
        c.fillStyle = P.pillowGoldDeep;
        c.fillRect(16, y + 15, 2, 2);
        c.fillStyle = P.pillowShade;
        for (i = 2; i <= 4; i++) {
          c.fillRect(16 + i, y + 15 - i, 1, 1); c.fillRect(17 - i, y + 15 - i, 1, 1);
          c.fillRect(16 + i, y + 16 + i, 1, 1); c.fillRect(17 - i, y + 16 + i, 1, 1);
        }
        c.fillStyle = P.pillowHi; c.fillRect(16, y + 13, 2, 1);
        /* and the gold cord along the seam, which is what tells this one
           apart from the knit at a glance now that both are cream */
        c.fillStyle = P.pillowGold;
        c.fillRect(6, y + 4, W - 12, 1); c.fillRect(6, y + 27, W - 12, 1);
      } else if (variant === 1) {
        /* the damask, reduced to what survives on a 34px cushion: an
           open diamond and four dots. The first cut had a filled
           medallion with a dotted ring round it and it read as a
           bathroom tile - a print on a cushion is thread, and thread at
           this size is a line and not a field. */
        c.fillStyle = P.pillowGold;
        for (i = 0; i < 8; i++) {
          c.fillRect(17 - i, y + 16 - 7 + i, 1, 1); c.fillRect(16 + i, y + 16 - 7 + i, 1, 1);
          c.fillRect(17 - i, y + 16 + 7 - i, 1, 1); c.fillRect(16 + i, y + 16 + 7 - i, 1, 1);
        }
        c.fillStyle = P.pillowGoldDeep;
        c.fillRect(16, y + 8, 2, 1); c.fillRect(16, y + 23, 2, 1);
        c.fillRect(6, y + 15, 1, 2); c.fillRect(27, y + 15, 1, 2);
        c.fillStyle = P.pillowGrey;
        c.fillRect(16, y + 15, 2, 2);
      } else {
        /* The knit, in DASHES. Ruled rows crossed by ruled verticals is
           a basket weave, and a basket at thirty-four pixels is a grid -
           the same trap the throw on the backrest fell into twice. A
           dash every five pixels, staggered row by row, is stocking
           stitch and reads as cloth. */
        for (i = 2; i < 30; i += 3) {
          c.fillStyle = P.knitShade;
          for (x = 2 + (i % 5); x < W - 4; x += 5) c.fillRect(x, y + i, 3, 1);
        }
      }

      /* The corners, taken in four rows deep. A cushion has no corners
         - it has four places where the seams meet and the stuffing runs
         out - and four pixels of pinch at each one is the difference
         between a stack of cushions and a stack of bricks. The column
         is still collided as the full 34, which is the forgiving way
         round: the art gives back a pixel the box keeps. */
      var PINCH = [4, 2, 1, 1];
      for (i = 0; i < PINCH.length; i++) {
        c.clearRect(0, y + i, PINCH[i], 1);
        c.clearRect(W - PINCH[i], y + i, PINCH[i], 1);
        c.clearRect(0, y + 31 - i, PINCH[i], 1);
        c.clearRect(W - PINCH[i], y + 31 - i, PINCH[i], 1);
      }
      c.fillStyle = P.outline;
      c.fillRect(0, y, W, 1); c.fillRect(0, y + 31, W, 1);
      c.fillRect(0, y, 1, 32); c.fillRect(W - 1, y, 1, 32);
      for (i = 0; i < PINCH.length; i++) {
        c.clearRect(0, y + i, PINCH[i], 1);
        c.clearRect(W - PINCH[i], y + i, PINCH[i], 1);
        c.clearRect(0, y + 31 - i, PINCH[i], 1);
        c.clearRect(W - PINCH[i], y + 31 - i, PINCH[i], 1);
        c.fillStyle = P.outline;
        c.fillRect(PINCH[i], y + i, 1, 1); c.fillRect(W - 1 - PINCH[i], y + i, 1, 1);
        c.fillRect(PINCH[i], y + 31 - i, 1, 1); c.fillRect(W - 1 - PINCH[i], y + 31 - i, 1, 1);
      }
      /* the piping: one pale line just inside the outline along the lit
         edges, and the squashed seam where this cushion sits on the one
         below it */
      c.fillStyle = hi;
      c.fillRect(5, y + 1, W - 10, 1); c.fillRect(1, y + 5, 1, 22);
      c.fillStyle = deep;
      c.fillRect(5, y + 30, W - 10, 1);
    }
    /* and the squash where the two meet: the top cushion's weight is on
       the bottom one, so the join is a shadow with the light caught on
       the lip above it */
    c.fillStyle = P.void; c.fillRect(3, 30, W - 6, 1);
    c.fillStyle = hi;     c.fillRect(4, 33, W - 8, 1);
    return t;
  }

  /* The mouth of the gap: a bolster cushion seen end-on. Round, striped
     and 8px wider than the column either side of it, which is the
     Coop's geometry verbatim - and there is nothing sticking out of a
     pillow, so the four boxes rectsFor returns are the whole of it. */
  function bakeCap(down) {
    var W = 42, H = 9, i, k;
    var t = makeCanvas(W, H), c = t.ctx;
    /* a bolster lying across the mouth of the gap: five bands of cream
       with the gold stripe round its middle, lit on the face that looks
       into the gap because that is where the lamp is */
    var rows = [P.outline, P.pillowHi, P.pillowCream, P.pillowGold, P.pillowCream,
                P.pillowGrey, P.pillowGoldDeep, P.pillowGoldDeep, P.outline];
    for (i = 0; i < H; i++) {
      c.fillStyle = rows[down ? H - 1 - i : i];
      c.fillRect(0, i, W, 1);
    }
    /* THE ENDS. A bolster is a tube and the ends of a tube are circles
       seen edge-on, so the outer four columns at each end are taken in
       a row at a time and gathered to a dark button - and that button
       is the one pixel that stops a 42x9 pale bar reading as a marble
       shelf, which is what the first cut of this cap read as. */
    var CUT = [4, 3, 2, 1];
    for (k = 0; k < CUT.length; k++) {
      c.clearRect(k, 0, 1, CUT[k]);
      c.clearRect(k, H - CUT[k], 1, CUT[k]);
      c.clearRect(W - 1 - k, 0, 1, CUT[k]);
      c.clearRect(W - 1 - k, H - CUT[k], 1, CUT[k]);
      c.fillStyle = P.outline;
      c.fillRect(k, CUT[k], 1, 1); c.fillRect(k, H - 1 - CUT[k], 1, 1);
      c.fillRect(W - 1 - k, CUT[k], 1, 1); c.fillRect(W - 1 - k, H - 1 - CUT[k], 1, 1);
    }
    /* the gathered button at each end, and the two creases running out
       of it along the tube */
    c.fillStyle = P.pillowGoldDeep;
    c.fillRect(1, 4, 2, 1); c.fillRect(W - 3, 4, 2, 1);
    c.fillStyle = P.outline;
    c.fillRect(1, 4, 1, 1); c.fillRect(W - 2, 4, 1, 1);
    c.fillStyle = P.pillowGrey;
    c.fillRect(4, 3, 5, 1); c.fillRect(4, 5, 5, 1);
    c.fillRect(W - 9, 3, 5, 1); c.fillRect(W - 9, 5, 5, 1);
    return t;
  }

  /* ---------------------------------------------------- the popcorn

     Four baked frames of one silhouette. A kernel is seven pixels
     across and a seven pixel ball CANNOT be rotated - every angle that
     is not a multiple of 90 degrees resamples into mush on a
     nearest-neighbour layer, and a shape that changes outline every
     frame reads as flicker rather than as spin. So the outline holds
     perfectly still and what moves is the shading: the cream lobe, the
     one brown hull pixel on the rim and the white specular all walk
     round the shape together. Four frames is one turn, and at
     spinRate 2.2 to 4.6 rad/s that is a kernel tumbling about twice a
     second, which is what popcorn does.

     Two silhouettes, because half the kernels in a bowl are round and
     half of them are the lopsided butterfly kind. */
  var POP_A = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [2, 3]];
  var POP_B = [[1, 4], [0, 6], [0, 7], [1, 6], [0, 7], [1, 5], [2, 4]];
  /* the lobe, the hull and the specular, in four positions each - they
     run round the shape in the same direction, one quarter turn apart */
  var LOBE = [[4, 4], [1, 4], [1, 1], [4, 1]];
  var HULL = [[5, 2], [4, 5], [1, 4], [2, 1]];
  var SPEC = [[2, 1], [1, 3], [4, 5], [5, 2]];

  function bakePop(rows, f, body, lobe, shade, hiCol, hullCol) {
    var t = makeCanvas(9, 9), c = t.ctx;
    var i;
    LivingRoom.rowsFill(c, rows, 1, 1, body);
    /* the two rows nearest the light's far side, always */
    c.fillStyle = shade;
    for (i = rows.length - 2; i < rows.length; i++) {
      c.fillRect(1 + rows[i][0], 1 + i, rows[i][1], 1);
    }
    c.fillStyle = lobe;    c.fillRect(1 + LOBE[f][0], 1 + LOBE[f][1], 2, 2);
    c.fillStyle = hullCol; c.fillRect(1 + HULL[f][0], 1 + HULL[f][1], 1, 1);
    c.fillStyle = hiCol;   c.fillRect(1 + SPEC[f][0], 1 + SPEC[f][1], 1, 1);

    /* Cut everything back to the silhouette, then lay the 1px ring
       UNDERNEATH it. Fattening the shape row by row would paint the
       notch in POP_B shut, which is the one thing that tells the two
       kernels apart. */
    var m = makeCanvas(9, 9);
    LivingRoom.rowsFill(m.ctx, rows, 1, 1, '#ffffff');
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(m.canvas, 0, 0);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, 9, 9).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  function bakePopSet() {
    var out = [], s, f, set;
    for (s = 0; s < 2; s++) {
      set = [];
      for (f = 0; f < 4; f++) {
        set.push(bakePop(s ? POP_B : POP_A, f,
                         P.popWhite, P.popCream, P.popShade, P.popHi, P.hull));
      }
      out.push(set);
    }
    return out;
  }

  /* THE HOT CHEDDAR, and it is a CLUMP of three kernels rather than one
     in a different colour. Two reasons, and the second one is the real
     one. Hot cheddar popcorn genuinely sticks together - that is what
     the cheese does - and a single seven pixel kernel painted orange is
     seven pixels of orange, which is not enough to be the brightest
     thing in the lower half of a dark room. The heat is this bay's
     escape hatch: a hot run SMASHES plain kernels instead of dying to
     them, so the player flying into a filling carpet needs to be able
     to pick this out at the top of the screen and go and get it. */
  function bakeCheddar(f) {
    var S = 13, t = makeCanvas(S, S), c = t.ctx;
    var m = makeCanvas(S, S);
    /* three kernels, one big and two shouldering it */
    var LUMPS = [[3, 3, POP_A], [0, 5, POP_B], [6, 6, POP_B]];
    var i, k;
    for (i = 0; i < LUMPS.length; i++) {
      var rows = LUMPS[i][2], ox = LUMPS[i][0], oy = LUMPS[i][1];
      LivingRoom.rowsFill(c, rows, ox, oy, P.cheddar);
      LivingRoom.rowsFill(m.ctx, rows, ox, oy, '#ffffff');
    }
    /* It is ALL the bright orange, with the dark only where one kernel
       sits behind another. A hot power-up on a pale shutter has to be
       the brightest thing on the screen, and the first cut painted two
       of the three lumps in cheddarDust and came out as a brown lozenge
       the eye slid straight off. */
    c.fillStyle = P.cheddarDust;
    c.fillRect(3, 9, 4, 1); c.fillRect(6, 11, 5, 1); c.fillRect(1, 10, 3, 1);
    c.fillStyle = P.cheddarHi;
    c.fillRect(3 + LOBE[f][0], 3 + LOBE[f][1], 3, 2);
    c.fillRect(2, 5, 3, 1); c.fillRect(7, 7, 2, 1);
    for (k = 0; k < 6; k++) {
      c.fillStyle = (k % 2) ? P.cheddarHi : P.popHi;
      c.fillRect(1 + ((k * 5 + f * 3) % 11), 2 + ((k * 7 + f * 5) % 9), 1, 1);
    }
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(m.canvas, 0, 0);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, S, S).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* THE MARSHMALLOW, worth five.

     A CYLINDER LYING ON ITS SIDE, with the open end turned toward you.
     The first cut was a rounded rectangle in white and it read as a
     blank domino: at nine pixels a marshmallow has exactly two tells
     and the silhouette is not one of them. The tells are the END DISC -
     a pale ring with a flatter middle, which is the sugared cut face -
     and the two soft bands round the barrel where it has been squashed
     in the bag. Both of them are horizontal, and a kernel has nothing
     horizontal anywhere, which is the whole point: one of these is +5
     and the other ends the run. */
  function bakeMarsh() {
    var ROWS = [[1, 9], [0, 11], [0, 11], [0, 11], [0, 11], [0, 11], [1, 9]];
    var t = makeCanvas(13, 9), c = t.ctx;
    LivingRoom.rowsFill(c, ROWS, 1, 1, P.marshWhite);
    /* the barrel, falling away to the right and down */
    c.fillStyle = P.marshPink;  c.fillRect(8, 2, 4, 5);
    c.fillStyle = P.marshShade; c.fillRect(2, 6, 10, 1); c.fillRect(10, 2, 2, 5);
    /* the two squash bands */
    c.fillStyle = P.marshShade; c.fillRect(6, 2, 1, 5); c.fillRect(9, 2, 1, 5);
    /* the cut end, turned toward you: a ring with a flatter middle */
    c.fillStyle = P.marshPink;  c.fillRect(1, 2, 5, 5);
    c.fillStyle = P.marshWhite; c.fillRect(2, 3, 3, 3);
    c.fillStyle = P.popHi;      c.fillRect(2, 3, 2, 1);
    var m = makeCanvas(13, 9);
    LivingRoom.rowsFill(m.ctx, ROWS, 1, 1, '#ffffff');
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(m.canvas, 0, 0);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, 13, 9).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ------------------------------------------------------- the drifts

     THE SPIKE OF THIS BAY IS MORE POPCORN. The brief lists exactly one
     obstacle here and the tune asks for spikes anyway, and the honest
     answer to that is not to invent a second lethal thing - a broken
     spring, a dropped fork - but to heap up the one that is already
     here. A drift is a mound of the same kernels, in the same white, on
     the cushion where they landed and in the moulding where they got
     wedged, and it teaches the player nothing they did not already know
     the instant the first kernel killed them: popcorn hurts. One rule,
     three shapes.

     Four sizes, two lumps of each, both ways up: sixteen little tiles
     baked once rather than a mound rasterised live every frame. The
     engine's maxLen picks the size and its count picks the lump, so
     tune.spikeCeilMin..Max and spikeFloorMin..Max still mean what they
     have always meant. */
  var DRIFT = [{ w: 26, h: 10 }, { w: 31, h: 15 }, { w: 36, h: 20 }, { w: 41, h: 25 }];
  var DRIFT_BOX = [];      /* filled in by build(), three boxes per size */

  /* the dome a drift is piled into: widest at the base, and the 0.55
     exponent is what makes it a heap rather than a cone */
  function driftHalf(j, W, H) {
    return (W / 2 - 1) * Math.pow(Math.max(0, 1 - j / H), 0.55);
  }

  function bakeDrift(s, lump, down) {
    var W = DRIFT[s].w, H = DRIFT[s].h;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2200 + s * 37 + lump * 101);
    var cx = W / 2, j, hw, i, n;

    /* 1. the mass. The gaps between individual kernels in a heap are
       shadow, not holes, so the dome goes down solid in popShade first
       and the kernels are stamped on top of it. */
    c.fillStyle = P.popShade;
    for (j = 0; j < H; j++) {
      hw = Math.round(driftHalf(j, W, H));
      if (hw < 1) continue;
      c.fillRect(Math.round(cx - hw), down ? j : H - 1 - j, hw * 2, 1);
    }

    /* 2. the kernels themselves, stamped where the dome has room. A
       heap of popcorn is lumpy at the edges and that lumpiness is what
       stops a drift reading as a grey triangle. */
    n = Math.round(W * H / 14);
    for (i = 0; i < n; i++) {
      var bx = Math.floor(r() * (W - 4));
      var lim = driftHalf(0, W, H);
      var reach = H * Math.pow(Math.max(0, 1 - Math.abs(bx + 2 - cx) / lim), 0.8);
      var bj = Math.floor(r() * Math.max(1, reach));
      var by = down ? bj : H - 1 - bj - 3;
      if (by < 0 || by + 4 > H) continue;
      var blob = [[1, 2], [0, 4], [0, 4], [1, 2]];
      var col = r() < 0.55 ? P.popWhite : P.popCream;
      for (var k = 0; k < 4; k++) {
        c.fillStyle = (k === (down ? 0 : 3)) ? P.popShade : col;
        c.fillRect(bx + blob[k][0], by + k, blob[k][1], 1);
      }
      if (r() < 0.3) { c.fillStyle = P.popHi; c.fillRect(bx + 1, by + (down ? 2 : 1), 1, 1); }
      if (r() < 0.2) { c.fillStyle = P.hull;  c.fillRect(bx + 2, by + 2, 1, 1); }
    }

    /* 3. cut back to the dome, ring it, and sink the end that touches
       the furniture into shadow */
    var m = makeCanvas(W, H);
    m.ctx.fillStyle = '#ffffff';
    for (j = 0; j < H; j++) {
      hw = Math.round(driftHalf(j, W, H));
      if (hw < 1) continue;
      m.ctx.fillRect(Math.round(cx - hw), down ? j : H - 1 - j, hw * 2, 1);
    }
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(m.canvas, 0, 0);
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, down ? 0 : H - 4, W, 4, P.void, 5);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, W, H).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* Three boxes per size, stepping in with the dome. Each band takes
     the half-width at its NARROW end, so every box sits inside the art
     and a graze on the shoulder of a heap is forgiven - the Garden's
     rule for anything with a curved silhouette. Both edges are inside
     [x, x+w], which is the one promise a spike's geometry has to keep:
     collide() and save() both cull on exactly those two numbers, and a
     box outside them is a box that is never tested and never cleared. */
  function driftBoxes(s) {
    var W = DRIFT[s].w, H = DRIFT[s].h;
    var j1 = Math.max(1, Math.floor(H / 3)), j2 = Math.max(j1 + 1, Math.floor(H * 2 / 3));
    var r0 = Math.max(1, Math.round(driftHalf(j1, W, H)));
    var r1 = Math.max(1, Math.round(driftHalf(j2, W, H)));
    var r2 = Math.max(1, Math.round(driftHalf(H - 1, W, H)));
    /* [left offset from ob.x, depth of the band's near edge, width, height] */
    return [[W / 2 - r0, 0,  r0 * 2, j1],
            [W / 2 - r1, j1, r1 * 2, j2 - j1],
            [W / 2 - r2, j2, r2 * 2, H - j2]];
  }

  /* ------------------------------------------------------- the coaster

     The spare life, off the coffee table and standing on its edge in
     the nap. Two of the three coasters in the photograph are pale wood
     slices and one is a coiled pink rope one, so the odds here are the
     picture's: a third of them are pink.

     A 19px disc rather than the 15 it would be to scale, because a
     coaster has to be grabbable from a flight path that is already
     fourteen pixels above a floor that kills. At 19 its box top sits at
     FLOOR-18 and the grab band is a doodad centred between FLOOR-31 and
     FLOOR-11 - a dive, but a dive with room in it. */
  var COAST_R = 9.5;

  function bakeCoaster(woven) {
    var S = 21, t = makeCanvas(S, S), c = t.ctx;
    var cx = 10, cy = 10, px, py, dx, dy, d, a, col;

    for (py = 0; py < S; py++) {
      for (px = 0; px < S; px++) {
        dx = px - cx; dy = py - cy;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d > COAST_R) continue;
        a = Math.atan2(dy, dx);
        if (woven) {
          /* one rope coiled in from the rim: an Archimedean spiral with
             a 2px pitch, which is the only way a coil reads at 19px */
          col = (Math.floor((d + a / TAU * 2) / 2) % 2) ? P.pinkWoven : P.pinkPale;
          if (d > 8.4 && dy > 0) col = P.pinkDeep;
          if (d > 8.9) col = P.pinkDeep;
        } else {
          /* a slice of log: bark round the outside, two growth rings,
             and the crack that every one of these develops */
          if (d > 8.4) col = P.woodBark;
          else if (Math.abs(d - 6.4) < 0.5 || Math.abs(d - 3.6) < 0.5) col = P.woodRing;
          else col = P.woodSlice;
          if (d > 6.6 && d < 8.5 && a > -2.5 && a < -1.1) col = P.woodPale;
        }
        c.fillStyle = col;
        c.fillRect(px, py, 1, 1);
      }
    }
    if (!woven) {
      /* the crack, centre to rim */
      c.fillStyle = P.woodBark;
      for (var i = 1; i < 9; i++) c.fillRect(cx + i, cy - Math.round(i * 0.4), 1, 1);
    }

    /* the ring goes underneath, for the same reason the kernel's does */
    var m = makeCanvas(S, S);
    m.ctx.fillStyle = '#ffffff';
    for (py = 0; py < S; py++) {
      for (px = 0; px < S; px++) {
        dx = px - cx; dy = py - cy;
        if (Math.sqrt(dx * dx + dy * dy) <= COAST_R) m.ctx.fillRect(px, py, 1, 1);
      }
    }
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, S, S).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ------------------------------------------------------- the litter

     What is down the back of a sofa, drawn once each. None of it has a
     box and none of it ever will: everything a level draws at FLOOR+n
     is below the line the doodad dies on, so the rule the player learns
     is "the floor band is already the floor", and a chess pawn lying in
     the nap can be as detailed as it likes without owing anybody a
     warning. */
  function bakePiece(rows, light) {
    var W = 0, i;
    for (i = 0; i < rows.length; i++) W = Math.max(W, rows[i][0] + rows[i][1]);
    var t = makeCanvas(W + 2, rows.length + 2), c = t.ctx;
    LivingRoom.rowsFill(c, rows, 1, 1, light ? P.chessLight : P.chessDark);
    /* a turned piece catches the lamp down one side and nothing down
       the other, which is all the modelling six pixels can carry */
    c.fillStyle = light ? P.pillowHi : P.chessLight;
    for (i = 0; i < rows.length; i++) c.fillRect(1 + rows[i][0], 1 + i, 1, 1);
    c.fillStyle = light ? P.chessDark : P.woodBark;
    for (i = 0; i < rows.length; i++) {
      c.fillRect(1 + rows[i][0] + rows[i][1] - 1, 1 + i, 1, 1);
    }
    var m = makeCanvas(W + 2, rows.length + 2);
    LivingRoom.rowsFill(m.ctx, rows, 1, 1, '#ffffff');
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(m.canvas, 0, 0);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, W + 2, rows.length + 2).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  var PAWN = [[2, 2], [1, 4], [1, 4], [2, 2], [1, 4], [2, 2], [2, 2], [1, 4], [1, 4], [0, 6], [0, 6]];
  var ROOK = [[0, 7], [0, 7], [1, 5], [2, 3], [2, 3], [2, 3], [2, 3], [2, 3], [1, 5], [0, 7], [0, 7], [0, 7]];

  /* the controller somebody sat on, lying on its back in the cushions */
  function bakePad() {
    var t = makeCanvas(18, 10), c = t.ctx;
    var ROWS = [[3, 12], [1, 16], [0, 18], [0, 18], [0, 18], [1, 16], [3, 12], [5, 8]];
    LivingRoom.rowsFill(c, ROWS, 0, 1, P.controller);
    c.fillStyle = P.controllerGrey;
    c.fillRect(4, 3, 3, 3); c.fillRect(11, 3, 3, 3);
    c.fillStyle = P.controller;
    c.fillRect(5, 4, 1, 1); c.fillRect(12, 4, 1, 1);
    c.fillStyle = P.seatHi; c.fillRect(8, 2, 2, 1);
    var m = makeCanvas(18, 10);
    LivingRoom.rowsFill(m.ctx, ROWS, 0, 1, '#ffffff');
    c.globalCompositeOperation = 'destination-in';
    c.drawImage(m.canvas, 0, 0);
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, 18, 10).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* ---------------------------------------------------------- build */

  function build() {
    /* the room first, and it guards itself - four bays in one room is
       four calls at boot and the oak only needs cutting once */
    LivingRoom.build();
    T.ceiling = LivingRoom.bakeCeiling(null);

    T.shutters = bakeShutters();
    T.couch    = bakeCouch();
    T.floor    = bakeSeat();
    T.table    = bakeTable();

    /* the two contact shadows this bay throws, both the room's own
       bakeShade so that a seam here ramps exactly the way a seam in the
       ceiling or at the skirting does. Ten rows and not six: at six the
       sill ramp measured 7 of luminance a row, which is inside the
       room's rule but only just, and the crown's own shadow runs at 3.1
       and the skirting's at 2.1. Ten puts this one at 3.4 and nothing
       in the room's lighting is then above 3.5. */
    T.sillShade = LivingRoom.bakeShade(P.backCrease, 0.34, 10, true);
    T.seatShade = LivingRoom.bakeShade(P.seatDeep, 0.22, 10, true);

    T.stack    = [bakeStack(0), bakeStack(1), bakeStack(2)];
    T.capDown  = bakeCap(true);
    T.capUp    = bakeCap(false);

    T.pop      = bakePopSet();
    T.cheddar  = [bakeCheddar(0), bakeCheddar(1), bakeCheddar(2), bakeCheddar(3)];
    T.marsh    = bakeMarsh();

    /* assigned, not appended to - DRIFT_BOX is module level, and a second
       build() would otherwise leave it twice as long with the first set
       stranded at the front. Levels.buildArt() calls each art module once
       today, so this is a guard rather than a fix, but a tile table that
       only survives being baked once is a trap for whoever bakes twice. */
    DRIFT_BOX.length = 0;
    T.drift = { floor: [], ceil: [] };
    for (var s = 0; s < DRIFT.length; s++) {
      T.drift.floor.push([bakeDrift(s, 0, false), bakeDrift(s, 1, false)]);
      T.drift.ceil.push([bakeDrift(s, 0, true), bakeDrift(s, 1, true)]);
      DRIFT_BOX.push(driftBoxes(s));
    }

    T.coaster = [bakeCoaster(false), bakeCoaster(true)];
    T.pawn    = [bakePiece(PAWN, true), bakePiece(PAWN, false)];
    T.rook    = [bakePiece(ROOK, true), bakePiece(ROOK, false)];
    T.pad     = bakePad();
  }

  /* -------------------------------------------------------- drawing */

  /* FOUR LAYERS AND THE ROOM'S LIGHT, back to front:

       1. a flat fill of backMid, which is only ever a safety net - the
          two tiles below cover every row from CEIL to FLOOR between them
       2. the shutter band, 70 rows at 0.16, because the window is right
          across the room and barely moves
       3. the shadow the sofa throws up the sill, ten rows, baked
       4. the sectional, 148 rows at 0.62, because you are flying along
          the top of it and it is nearly in the action
       5. LivingRoom.drawLight

     Nothing else: this bay draws no vignette and no gloom of its own,
     because drawLight is the room's and four bays that shaded their own
     corners would read as four different houses.

     LAYER 3 IS DOING TWO JOBS. A sofa standing against a wall darkens
     the wall just above where it meets it, which is in every one of the
     four photographs; and without it the sill's bottom row (shutterMid
     under the room's wash, luminance ~162) meets the sofa's crest (149)
     in a single step, which is a seam, not a join. A ten-row ramp to
     backCrease puts the sill down to ~134 at the contact and lets the
     1px outline be the edge the eye finds, which is what an edge is
     supposed to be here. */
  function drawBackdrop(ctx, scroll) {
    ctx.fillStyle = P.backMid;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.shutters.canvas, scroll * 0.16, CEIL);
    ctx.drawImage(T.sillShade.canvas, 0, BACK_Y - 10);
    tileX(ctx, T.couch.canvas, scroll * 0.62, BACK_Y);
    LivingRoom.drawLight(ctx);
  }

  function drawMenuBackdrop(ctx, scroll) { LivingRoom.drawMenuBackdrop(ctx, scroll); }

  function drawCeiling(ctx, scroll) { LivingRoom.drawCeiling(ctx, scroll, T.ceiling); }

  /* The seat, and then the coffee table in front of it. The table is
     the only thing in the bay painted over the floor band and it never
     climbs above 258, so it cannot hide a kernel, a drift or a coaster -
     all three of which live above FLOOR. */
  function drawFloor(ctx, scroll) {
    /* the dark the seat throws back up into the crease. A STRIP and not
       the flat 10-row Tint it was: a flat Tint has an edge and a 5/16
       edge is a cliff of thirty, which is exactly the fault the room's
       own lighting pass was rebuilt to get rid of. Over the crease it
       is seatDeep on seatDeep and costs nothing; where a cushion's foot
       is in the way it is the last of the three things sinking it. */
    ctx.drawImage(T.seatShade.canvas, 0, FLOOR - 10);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
    tileX(ctx, T.table.canvas, scroll * 1.35, TABLE_Y);
  }

  /* --------------------------------------------------------- pillars */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.stack[ob.variant].canvas;
    var w = tile.width;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (topH > 0) LivingRoom.drawColumn(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) LivingRoom.drawColumn(ctx, tile, x, botY, w, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* the hard cast shadow on the shutters behind. With a pale wall this
       is the other half of what separates a cream cushion from it. */
    if (topH > 0) Tint.rect(ctx, x + w, CEIL, 4, topH, P.void, 6);
    if (botH > 0) Tint.rect(ctx, x + w, botY, 4, botH, P.void, 6);
  }

  /* ---------------------------------------------------------- drifts */

  function drawDrift(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = (ob.side === 'ceil' ? T.drift.ceil : T.drift.floor)[ob.size][ob.lump];
    var H = DRIFT[ob.size].h, W = DRIFT[ob.size].w;
    if (ob.side === 'ceil') {
      ctx.drawImage(tile.canvas, x, CEIL);
    } else {
      /* the heap sits ON the cushion, so its contact shadow goes ABOVE
         FLOOR - anything a spike paints at FLOOR+n is buried by the
         floor band drawn after it, which is the Deck's lesson */
      ctx.drawImage(tile.canvas, x, FLOOR - H);
      Tint.rect(ctx, x - 2, FLOOR - 2, W + 4, 2, P.seatDeep, 9);
    }
  }

  /* ------------------------------------------------------ the kernels

     Everything that draws or collides a drop reads ob.gold and ob.spicy
     and never a kind the maker stored, because the engine is allowed to
     set either flag AFTER makeDrop has returned - the Canopy's rule. A
     lime can never arrive here (this bay has no sourChance) but if one
     ever did it would be painted as the hot kernel, which at least
     reads as a thing to catch. */
  function kindOf(ob) {
    if (ob.gold) return 'marsh';
    if (ob.spicy || ob.sour) return 'cheddar';
    return 'pop';
  }

  function popFrame(ob) {
    return Math.floor(wrap(ob.spin, TAU) / TAU * 4) % 4;
  }

  function drawDrop(ctx, ob) {
    var x = Math.round(ob.x), y = Math.round(ob.y);
    var kind = kindOf(ob), i, k;

    if (kind === 'pop') {
      LivingRoom.blitBelowCeil(ctx, T.pop[ob.shape][popFrame(ob)].canvas, x - 4, y - 4);
      return;
    }

    var pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);

    if (kind === 'marsh') {
      LivingRoom.glow(ctx, x, y, Math.round(15 + pulse * 5),
                      'rgba(243,204,132,' + (0.44 * pulse).toFixed(3) + ')',
                      'rgba(224,176,74,' + (0.20 * pulse).toFixed(3) + ')',
                      'rgba(224,176,74,0)');
      /* two grains of sugar coming off it, so a white thing in a room
         full of white things is plainly the one that is worth catching */
      for (i = 0; i < 2; i++) {
        k = wrap(ob.spin * 0.9 + i * 0.5, 1);
        var sy = y - 7 - Math.round(k * 6);
        if (sy < CEIL) continue;
        ctx.fillStyle = i ? P.popHi : '#f3cc84';
        ctx.fillRect(x - 3 + i * 5, sy, 1, 1);
      }
      LivingRoom.blitBelowCeil(ctx, T.marsh.canvas, x - 6, y - 4);
      return;
    }

    /* the hot one, glowing, with three sparks coming off the top of it.
       It is the escape hatch from the carpet, so it is the brightest
       thing in the lower half of the screen by some margin. */
    LivingRoom.glow(ctx, x, y, Math.round(16 + pulse * 6),
                    'rgba(255,224,138,' + (0.50 * pulse).toFixed(3) + ')',
                    'rgba(240,146,46,' + (0.24 * pulse).toFixed(3) + ')',
                    'rgba(184,77,18,0)');
    for (i = 0; i < 3; i++) {
      k = wrap(ob.spin * 0.7 + i * 0.41, 1);
      var fy = y - 8 - Math.round(k * 7);
      if (fy < CEIL) continue;
      ctx.fillStyle = i % 2 ? P.cheddarHi : P.cheddar;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), fy, 1, 1);
    }
    LivingRoom.blitBelowCeil(ctx, T.cheddar[popFrame(ob)].canvas, x - 6, y - 6);
  }

  /* THE SPOT IS TIED TO HEIGHT, not to how far down the screen the
     thing is, because in this bay those are two different questions.
     Everything else in the game falls once and the two numbers agree;
     here a kernel spends most of its life hopping, and what the player
     needs off the floor is how far ABOVE THE CUSHION the thing is right
     now - which is the same as asking how soon it comes down.

     So: small and dark when it is about to land, wide and faint at the
     top of its hop, and wider still and fainter when it is a long way
     up and only just out of the moulding. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var high = (FLOOR - 4) - ob.y;
    var near = clamp(high / HOP_MAX, 0, 1);        /* 0 at the cushion  */
    var far  = clamp(high / (FLOOR - CEIL), 0, 1); /* 1 at the moulding */
    var w = 5 + Math.round(6 * far);
    var kind = kindOf(ob);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3,
              kind === 'marsh' ? P.marshPink : (kind === 'cheddar' ? P.cheddar : P.void),
              15 - Math.round(9 * near));
  }

  /* Never reached - stepDrop does not land anything - and here because
     the contract says a level has one. A kernel that somehow did come
     to rest would lie there flattened. */
  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);
    var kind = kindOf(ob);
    ctx.fillStyle = kind === 'cheddar' ? P.cheddar : (kind === 'marsh' ? P.marshWhite : P.popWhite);
    ctx.fillRect(x - 4, FLOOR + 1, 9, 2);
    ctx.fillStyle = kind === 'cheddar' ? P.cheddarHi : P.popHi;
    ctx.fillRect(x - 2, FLOOR + 1, 5, 1);
    ctx.fillStyle = P.popShade;
    ctx.fillRect(x - 6, FLOOR + 2, 2, 1); ctx.fillRect(x + 5, FLOOR + 2, 2, 1);
    ctx.globalAlpha = a;
  }

  /* --------------------------------------------------------- the boon */

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var i;
    /* the dent it was standing in stays where it was even after Gerald
       has pulled the coaster out of it - the Construction's pallet */
    Tint.rect(ctx, Math.round(ob.x) - 7, FLOOR - 1, 14, 2, P.seatShade, 10);

    var bob = Math.round(Math.sin(ob.phase + ob.age * 2.2) * 1.2);
    var x = Math.round(ob.x + ob.dx), y = Math.round(FLOOR - 9 + ob.dy) + bob;

    /* the succulent's exact glow: a life is a life, in any level */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + ob.age * 2.6);
    var r = Math.round(15 + pulse * 4);
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, 'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')');
    g.addColorStop(0.6, 'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(47,107,98,0)');
    ctx.fillStyle = g;
    ctx.fillRect(x - r, y - r, r * 2, r * 2);

    ctx.drawImage(T.coaster[ob.kind === 'woven' ? 1 : 0].canvas, x - 10, y - 10);

    for (i = 0; i < 2; i++) {
      var k = wrap(ob.phase * 0.22 + ob.age * 0.3 + i * 0.5, 1);
      ctx.fillStyle = i ? P.popHi : P.lifePale;
      ctx.fillRect(x - 5 + i * 9, y - 12 - Math.round(k * 9), 1, 1);
    }
  }

  /* -------------------------------------------------------- the litter */

  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2, i;
    if (ob.kind === 0) ctx.drawImage(T.pawn[ob.seed & 1].canvas, x + 4, y + 1);
    else if (ob.kind === 1) ctx.drawImage(T.rook[ob.seed & 1].canvas, x + 3, y);
    else if (ob.kind === 3) ctx.drawImage(T.pad.canvas, x, y + 3);
    else {
      /* crumbs. ONE pixel each, deliberately: a 2px crumb at the same
         white as a 7px kernel is a thing the player has to stop and
         identify, and the answer is always "nothing". */
      for (i = 0; i < 6; i++) {
        var h = hash(ob.seed + i * 977);
        ctx.fillStyle = (h & 1) ? P.popCream : P.popShade;
        ctx.fillRect(x + (h >>> 3) % 18, y + 1 + (h >>> 11) % 4, 1, 1);
      }
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawDrift(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ---------------------------------------------------- the cover art

     118x114 on the big card, 82x94 on the side ones, and the caller has
     already clipped to the box so nothing in here clips or restores.

     IT SHOWS WHAT THE LEVEL IS, which means it shows what the level
     looks like and in the same proportions: a band of louvred shutters
     across the top THIRD and no more, the grey tufted field with its
     buttons filling everything under it, a damask cushion leaning on
     the seat, two pillow stacks with a gap sliding by, and - the point
     of the whole bay - popcorn hopping along the seat at the bottom,
     with one more still on its way down.

     The card used to give the shutters 54% of its height, which was the
     level as it was then. A cover that is mostly shutters sits on the
     level select next to the Desk's cover, which is also mostly
     shutters, and the two cards are the same card. 30% is the level's
     own figure: 70 rows of shutter out of 218 between the lid and the
     floor. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var lidY   = y + Math.round(h * 0.07);
    var backY  = y + Math.round(h * 0.30);   /* the crest of the sofa     */
    var seatY  = y + h - Math.round(h * 0.17);
    var i, k;

    /* 1. the wall, and the crown moulding across the very top */
    ctx.fillStyle = P.backMid;    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = R.plasterMid; ctx.fillRect(x, y, w, lidY - y);
    ctx.fillStyle = R.plasterLit; ctx.fillRect(x + Math.round(w * 0.3), y, Math.round(w * 0.3), lidY - y - 2);
    ctx.fillStyle = R.crown;      ctx.fillRect(x, lidY - 2, w, 1);
    ctx.fillStyle = R.outline;    ctx.fillRect(x, lidY - 1, w, 1);

    /* 2. the shutters: a 4px louvre pitch with the night in every gap,
       which is as fine as this band goes before it turns into grey */
    ctx.fillStyle = P.shutterMid; ctx.fillRect(x, lidY, w, backY - lidY);
    for (i = lidY + 2; i < backY - 1; i += 4) {
      ctx.fillStyle = P.shutterLit;   ctx.fillRect(x, i, w, 1);
      ctx.fillStyle = P.shutterShade; ctx.fillRect(x, i + 2, w, 1);
      ctx.fillStyle = (((i - lidY) >> 2) % 4 === 3) ? P.nightDeep : P.nightBlue;
      ctx.fillRect(x, i + 3, w, 1);
    }
    /* the stiles and the tilt rods, which is what makes this a shutter
       and not a venetian blind - exactly as in the level itself */
    for (i = 0; i < 2; i++) {
      var sx = x + Math.round(w * (0.33 + i * 0.4));
      ctx.fillStyle = P.shutterMid; ctx.fillRect(sx, lidY, 4, backY - lidY);
      ctx.fillStyle = P.shutterLit; ctx.fillRect(sx + 1, lidY, 1, backY - lidY);
      ctx.fillStyle = P.outline;    ctx.fillRect(sx + 4, lidY, 1, backY - lidY);
      var rx = x + Math.round(w * (0.13 + i * 0.4));
      ctx.fillStyle = P.shutterShade; ctx.fillRect(rx - 1, lidY + 1, 4, backY - lidY - 2);
      ctx.fillStyle = P.shutterLit;   ctx.fillRect(rx, lidY + 1, 1, backY - lidY - 2);
    }

    /* 3. THE SOFA, and it gets the rest of the card, which is the point
       of this rewrite. The lit roll, then the tufted field: two sets of
       ruled diagonals, the lamp caught on the face just above each
       descending crease, and a BUTTON at every crossing. That is the
       level's per-pixel pass reduced to the three marks that survive at
       sixty pixels - and the buttons are the one of the three that
       actually says "tufted" rather than "diagonal stripes". */
    ctx.fillStyle = P.outline;  ctx.fillRect(x, backY - 1, w, 1);
    ctx.fillStyle = P.crest;    ctx.fillRect(x, backY, w, 1);
    ctx.fillStyle = P.backLit;  ctx.fillRect(x, backY + 1, w, 1);
    ctx.fillStyle = P.backMid;  ctx.fillRect(x, backY + 2, w, seatY - backY - 2);
    var band = seatY - backY - 2;
    var top = backY + 2;
    /* 3.2 diamonds down the field is the level's own count (four over
       148 rows, the lowest of them behind the cushions), and 1.3 is its
       48:37 cell, so the lattice on the card is the lattice in the bay.
       The nodes are (i*PW, k*PH/2) with the odd rows shoved half a cell
       across, which makes every diamond PW wide and PH tall with its
       CENTRE half a cell along from a node - which is the one fact the
       three passes below all need. */
    var PH = Math.max(8, Math.round(band / 3.2));
    var PW = Math.max(10, Math.round(PH * 1.3));
    var hw = Math.max(2, Math.round(PW * 0.30)), hh = Math.max(2, Math.round(PH * 0.30));
    var bx, byy, n, ww, run;

    /* the swell in the upper half of every diamond, FIRST, so the
       creases rule over the top of it. Without this the card's whole
       lower two thirds came out as flat grey with a faint argyle on
       it - the thing that says "padding" is the light sitting on the
       padding, not the lines between. */
    ctx.fillStyle = P.backLit;
    for (k = 0; k * PH / 2 <= band + PH; k++) {
      byy = top + Math.round(k * PH / 2);
      for (i = -1; i * PW < w + PW; i++) {
        bx = x + Math.round(i * PW + ((k & 1) ? 0 : PW / 2));
        for (n = -hh; n <= hh; n++) {
          var ry = byy + n - Math.round(PH * 0.12);
          if (ry < top || ry >= top + band) continue;
          ww = Math.round(hw * Math.sqrt(Math.max(0, 1 - (n / hh) * (n / hh))));
          ctx.fillRect(bx - ww, ry, ww * 2 + 1, 1);
        }
      }
    }
    /* the creases, ruled out of every node both ways */
    ctx.fillStyle = P.backCrease;
    for (i = -1; i * PW < w + PW; i++) {
      for (k = 0; k < band; k++) {
        run = Math.round(k * PW / PH);
        ctx.fillRect(x + i * PW + run, top + k, 1, 1);
        ctx.fillRect(x + i * PW - run, top + k, 1, 1);
      }
    }
    /* and the button, pucker and all, wherever four of them meet */
    for (k = 0; k * PH / 2 <= band; k++) {
      byy = top + Math.round(k * PH / 2);
      if (byy < top || byy >= top + band) continue;
      for (i = 0; i * PW + ((k & 1) ? PW / 2 : 0) < w; i++) {
        bx = x + Math.round(i * PW + ((k & 1) ? PW / 2 : 0));
        ctx.fillStyle = P.backLit;
        ctx.fillRect(bx - 1, byy, 3, 1); ctx.fillRect(bx, byy - 1, 1, 3);
        ctx.fillStyle = P.button;
        ctx.fillRect(bx, byy, 1, 1);
      }
    }

    /* the damask cushion propped ON THE SEAT and leaning back, rounded -
       a square one reads as a picture hung on the wall, and one propped
       at the crest reads as a cushion nobody could sit next to. Its
       bottom is on the seat line because that is where the level's three
       are, six rows down into the crease. */
    var pw = Math.round(w * 0.22), ph = Math.round(band * 0.60);
    var pxx = x + Math.round(w * 0.05);
    for (i = 0; i < ph; i++) {
      var ins = i < 2 ? 2 - i : (i > ph - 3 ? 3 - (ph - i) : 0);
      var lean = Math.round((ph - 1 - i) / (ph - 1) * 3);
      var rx2 = pxx + ins + lean, rw = pw - ins * 2;
      ctx.fillStyle = P.outline;
      ctx.fillRect(rx2 - 1, seatY - ph + i, rw + 2, 1);
      ctx.fillStyle = (i < 3) ? P.propGreyHi : (i > ph - 4 ? P.propGreyDeep : P.propGrey);
      ctx.fillRect(rx2, seatY - ph + i, rw, 1);
    }
    /* two curls and not a diamond, the same rule the backrest's own
       cushions follow: the diamond is the column's badge, and the cover
       is where a player learns which shape is going to kill them */
    ctx.fillStyle = P.propMotif;
    var mcx = pxx + Math.round(pw / 2) + 2, mcy = seatY - Math.round(ph / 2);
    ctx.fillRect(mcx - 4, mcy - 2, 7, 1);
    ctx.fillRect(mcx - 2, mcy + 2, 7, 1);

    /* 4. two pillow stacks with a gap, sliding past */
    var period = big ? 46 : 38;
    var span = seatY - lidY;
    for (i = 0; i < 3; i++) {
      var ox = Math.round(x + w + 10 - wrap(s + i * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.34);
      var gapY = Math.round(lidY + 4 + ((i * 19) % Math.max(1, span - gapH - 10)));
      pillowlet(ctx, ox, lidY + 2, gapY - lidY - 2, i % 3, false);
      pillowlet(ctx, ox, gapY + gapH, seatY - gapY - gapH, i % 3, true);
    }

    /* 5. the seat, and the popcorn that is the whole reason for it. The
       three kernels are each on their own rhythm, each casts a spot
       that darkens as it comes down, and one more is always on its way
       out of the moulding - which is the level in one picture. */
    ctx.fillStyle = P.seatDeep; ctx.fillRect(x, seatY - 3, w, 3);
    ctx.fillStyle = P.seatHi;   ctx.fillRect(x, seatY, w, 1);
    ctx.fillStyle = P.seatLit;  ctx.fillRect(x, seatY + 1, w, 1);
    ctx.fillStyle = P.seat;     ctx.fillRect(x, seatY + 2, w, y + h - seatY - 2);
    Tint.rect(ctx, x, seatY + 5, w, y + h - seatY - 5, P.void, 6);
    /* the walnut table across the very bottom, nearer than anything */
    ctx.fillStyle = P.walnutHi; ctx.fillRect(x, y + h - 4, w, 1);
    ctx.fillStyle = P.walnut;   ctx.fillRect(x, y + h - 3, w, 3);
    for (i = 0; i < 6; i++) {
      ctx.fillStyle = (i % 2) ? P.chessLight : P.chessDark;
      ctx.fillRect(x + Math.round(wrap(w * 0.5 - s * 1.35 + i * 3, w + 20)) - 10, y + h - 3, 3, 3);
    }

    for (i = 0; i < 3; i++) {
      var kx = x + Math.round(wrap(w - s * 0.9 + i * 37, w + 8)) - 4;
      if (kx < x || kx > x + w - 4) continue;
      var apex = Math.round(band * (0.45 + i * 0.2));
      var rise = Math.abs(Math.sin(t * (2.6 - i * 0.4) + i * 1.3));
      var ky = Math.round(seatY - 4 - rise * apex);
      Tint.rect(ctx, kx - 1, seatY + 2, 5, 1, P.void, 15 - Math.round(rise * 9));
      kernelet(ctx, kx, ky, false);
    }
    /* and the hot one on its way down, which is the one warm thing in a
       grey room and the only colour on this card */
    var fy = lidY + Math.round(wrap(s * 1.5, seatY - lidY - 6));
    kernelet(ctx, x + Math.round(w * 0.78), fy, true);

    /* 6. the doodad flying it, with a halo so a pale bird never goes
       missing against a pale shutter */
    var dx = Math.round(x + w * 0.3);
    var dy = Math.round(y + h * 0.42 + Math.sin(t * 3.1) * (h * 0.14));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, dx - sz, dy - sz, sz * 2, sz * 2, P.void, 5);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx - sz / 2 - 1, dy - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(dx - sz / 2, dy - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(dx + sz / 2 - 2, dy - 1, 1, 1);
    ctx.fillStyle = P.pillowHi; ctx.fillRect(dx + sz / 2, dy, 2, 1);

    /* 7. THE ROOM'S OWN LIGHT, in miniature. LivingRoom.drawLight is
       half of what the Couch looks like - night creeping up off the
       seat, void in the two side columns, lamp warmth under the
       moulding - and a cover painted without it came out eleven values
       paler than the level and sat on the level select looking like a
       different bay to the two either side of it. */
    Tint.rect(ctx, x, y, w, Math.round(h * 0.3), R.lampGlow, 2);
    /* anchored to the CARD and not to backY any more: the crest moved up
       to 30% and a night wash starting there would have put two thirds
       of the cover in shadow */
    Tint.rect(ctx, x, y + Math.round(h * 0.52), w, Math.round(h * 0.48), R.nightShade, 4);
    Tint.rect(ctx, x, seatY - 6, w, y + h - seatY + 6, P.void, 4);
    var vig = Math.max(4, Math.round(w * 0.09));
    Tint.rect(ctx, x, y, vig, h, P.void, 4);
    Tint.rect(ctx, x + w - vig, y, vig, h, P.void, 4);
    Tint.rect(ctx, x, y, w, h, R.lampGlow, 1);
  }

  /* One kernel inside a cover: five pixels across with its corners
     knocked off, because a white square at this size is a window and
     the one thing the cover has to get right is that these are round */
  function kernelet(ctx, x, y, hot) {
    if (hot) Tint.rect(ctx, x - 3, y - 3, 9, 9, P.cheddarHi, 4);
    ctx.fillStyle = P.outline;
    ctx.fillRect(x - 1, y, 5, 3); ctx.fillRect(x, y - 1, 3, 5);
    ctx.fillStyle = hot ? P.cheddar : P.popWhite;
    ctx.fillRect(x, y, 3, 3);
    ctx.fillStyle = hot ? P.cheddarHi : P.popHi;   ctx.fillRect(x, y, 1, 1);
    ctx.fillStyle = hot ? P.cheddarDust : P.popShade; ctx.fillRect(x + 1, y + 2, 2, 1);
  }

  /* One cushion column inside a cover. `up` says which end carries the
     bolster: the cap has to be on the end that faces the gap, or the
     cover shows two columns with their mouths shut. Each cushion is
     drawn as its own rounded block with a dark seam between, because a
     ruled column with lines across it is a ladder. */
  function pillowlet(ctx, x, y, h, variant, up) {
    if (h <= 0) return;
    /* the cover's columns follow bakeStack: all cream, because the cover
       is the one frame a player sees before they choose the level and it
       has to teach the same thing the level does - cream is the hazard */
    var body  = variant === 2 ? P.knitCream : P.pillowCream;
    var hi    = P.pillowHi;
    var shade = variant === 2 ? P.knitShade : P.pillowShade;
    var cy, ch;
    for (cy = y; cy < y + h; cy += 11) {
      ch = Math.min(11, y + h - cy);
      ctx.fillStyle = P.outline; ctx.fillRect(x, cy, 10, ch);
      if (ch < 3) continue;
      ctx.fillStyle = body;  ctx.fillRect(x + 1, cy + 1, 8, ch - 2);
      ctx.fillStyle = hi;    ctx.fillRect(x + 2, cy + 1, 5, 1); ctx.fillRect(x + 1, cy + 2, 1, ch - 4);
      ctx.fillStyle = shade; ctx.fillRect(x + 8, cy + 2, 1, ch - 3); ctx.fillRect(x + 3, cy + ch - 2, 5, 1);
    }
    /* the bolster across the mouth */
    var by = up ? y : y + h - 3;
    ctx.fillStyle = P.outline;     ctx.fillRect(x - 2, by, 14, 3);
    ctx.fillStyle = P.pillowCream; ctx.fillRect(x - 1, by + (up ? 0 : 1), 12, 2);
    ctx.fillStyle = P.pillowGold;  ctx.fillRect(x - 1, by + 1, 12, 1);
    ctx.fillStyle = P.pillowHi;    ctx.fillRect(x, by + (up ? 0 : 1), 10, 1);
  }

  /* ----------------------------------------------------- generation */

  /* 5 tufted, 3 damask, 2 knit - and all three cream, so the mix no
     longer decides whether the level is readable, only how varied it
     looks. It used to: five in ten were the grey microfibre one and
     those five were the ones a player could not see. */
  function makePillar(x, gapY, gapH, run) {
    var v = Math.random();
    return { type: 'pillar', x: x, w: 34,
             gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: v < 0.5 ? 0 : (v < 0.8 ? 1 : 2),
             scored: false };
  }

  /* A DRIFT OF POPCORN. `count` picks which of two lumps and `maxLen`
     picks the size, so the four spikeCeil/spikeFloor numbers in the
     tune still buy exactly what they have always bought: a bigger
     number is a bigger thing in the way.

     x is the LEFT edge of everything and w is the full width, which is
     the one rule a spike owes the engine - collide() culls on ob.x and
     ob.x+ob.w, and save() clears on the same two, so a box outside them
     is a box that is never tested and never cleared. */
  function makeSpikes(x, side, count, maxLen, run) {
    /* 13 and 3.7 are solved against the tune this bay actually ships
       with: the engine asks for maxLen 14..22 at the ceiling and 16..24
       on the cushion, and those ten values have to land on all four
       sizes rather than on the middle two. 14 is the smallest heap, 24
       the biggest, and the four steps in between come out even. */
    var s = clamp(Math.round((maxLen - 13) / 3.7), 0, DRIFT.length - 1);
    return { type: 'spike', x: Math.round(x), side: side,
             size: s, lump: (count & 1),
             w: DRIFT[s].w,
             /* nothing reads this but the contract names it, and a heap
                is not made of spikes */
             spikes: [] };
  }

  /* ONE MAKER FOR THE HAZARD AND BOTH CATCHABLES, because all three of
     them are a thing that comes out of the moulding and hops about on
     the cushion, and the only differences are what they are worth and
     how high they bounce.

       plain    - a kernel. Hops 20..46. Ends the run.
       cheddar  - the heat. Same hop, and the escape hatch: a hot run
                  smashes plain kernels on contact instead of dying to
                  them, so the way out of a full carpet is through it.
       marsh    - +5. Hops 9..14, so the five points stay down in the
                  dangerous part of the room where they are worth
                  diving for.

     The marshmallow is rolled HERE and not in the tune for the reason
     the Construction's gear is: the art has to know, or a +5 gets a
     kernel's sprite and the player dodges it. */
  function makeDrop(x, spicy, fall, run) {
    var gold = false;
    if (!spicy) {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var ob = {
      type: 'drop', x: x, y: CEIL + 5,
      vy: fall,
      /* the kernel's OWN sideways motion, in world space, on top of the
         scroll the engine applies. Zero until it first touches down:
         nothing pushes a kernel sideways while it is still falling. */
      vx: 0,
      spicy: !!spicy, gold: gold, broken: 0,
      w: 7, shape: randInt(0, 1),
      spin: rand(0, TAU), spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1),
      hop: rand(HOP_MIN, HOP_MAX),
      landed: false
    };
    /* the cheddar is three kernels stuck together, so it is wider than
       one - and w is what collide() and save() cull on */
    if (spicy) ob.w = 11;
    if (gold) {
      ob.w = 9;
      ob.name = GOLD_NAME;
      ob.hop = rand(MARSH_HOP_MIN, MARSH_HOP_MAX);
      /* a gift drifts down slower, so it has a chance of being taken
         rather than merely noticed - the engine does this for the drops
         IT rolls and this one is ours */
      ob.vy = fall * 0.7;
    }
    return ob;
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 18, kind: randInt(0, 3), seed: randInt(1, 100000) };
  }

  /* The coaster, stood on its edge and sunk into the nap. `y` is where
     it is GRABBED - the middle of the disc - because the engine's
     default would put the grab point on the cushion and Gerald would
     reel it in by the dent. */
  function makeBoon(x, run) {
    var woven = chance(0.33);
    return { type: 'boon', x: x, y: FLOOR - 9, w: 18, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0,
             kind: woven ? 'woven' : 'wood',
             name: BOON_NAME,
             burst: woven ? [P.pinkPale, P.pinkWoven, P.pinkDeep, P.lifePale, P.lifeJade]
                          : [P.woodPale, P.woodSlice, P.woodBark, P.lifePale, P.lifeJade] };
  }

  /* --------------------------------------------------------- stepDrop

     THE CONTRACT. The engine hands this ONE drop and the whole obstacle
     list, after it has already scrolled this drop and only while
     ob.broken <= 0. Move the drop you were given; you may READ the list
     (and ask rectsFor for a pillar's boxes) but never splice it and
     never write to anything else in it. Return TRUE to land the drop
     the ordinary way - splat, sound, SPLAT_TIME on the floor - and
     false or nothing to keep it alive. A live drop leaves the world off
     the left edge like everything else.

     Set ob.bounced and the engine throws two particles of cushion fluff
     and ticks 'bop' for you, rate limited, because no art module calls
     Audio3. Set ob.landed and Pepper's sight line stops being drawn to
     it, because a thing already on the cushion has nothing left to
     foresee.

     This one NEVER returns true. Nothing in this bay lands for good.

     THE ORDER MATTERS. Integrate, then the furniture, then the
     neighbours, and the two hard limits last - so that whatever the
     pillows and the other kernels did to it, every drop ends every call
     inside CEIL+4 .. FLOOR-4 and no kernel is ever drawn through the
     moulding or under the seat. */
  function stepDrop(ob, dt, obstacles) {
    var i;

    ob.vy += DROP_GRAV * dt;
    ob.y += ob.vy * dt;
    ob.x += ob.vx * dt;
    /* it tumbles slower once it is just bouncing about: a kernel
       spinning at full rate on the cushion reads as a thing being
       driven rather than a thing being dropped */
    ob.spin += ob.spinRate * (ob.landed ? 0.4 : 1) * dt;

    for (i = 0; i < obstacles.length; i++) {
      var p = obstacles[i];
      if (p.type === 'pillar') {
        /* 60px either side is comfortably more than the 49px a pillar's
           caps are wide, so the test is never the thing that misses */
        if (ob.x < p.x - 60 || ob.x > p.x + p.w + 60) continue;
        hitPillar(ob, p);
      } else if (p !== ob && p.type === 'drop' && p.broken <= 0 && p.hop !== undefined) {
        hitKernel(ob, p);
      }
    }

    /* the moulding. A kernel only ever gets up here off a cap, and it
       is not allowed to leave through the top of the room. */
    if (ob.y < CEIL + 4) {
      ob.y = CEIL + 4;
      ob.vy = Math.abs(ob.vy) * 0.3;
    }

    /* THE CUSHION. Not a restitution - a re-launch to this kernel's own
       apex, give or take fifteen per cent, so it keeps the rhythm it
       has had all along and the player can time it off one look. See
       HOP_MIN/HOP_MAX above for why it is done this way round.

       The sideways kick is what keeps a carpet from turning into a row
       of metronomes: each landing nudges the kernel's world-frame drift
       by up to 24px/s either way, damped to three quarters of what it
       had, so it wanders without ever running away. */
    if (ob.y >= FLOOR - 4) {
      ob.y = FLOOR - 4;
      ob.landed = true;
      ob.vy = -Math.sqrt(2 * DROP_GRAV * ob.hop * rand(1 - HOP_VARY, 1 + HOP_VARY));
      ob.vx = clamp(ob.vx * 0.75 + rand(-24, 24), -VX_MAX, VX_MAX);
      ob.bounced = true;
    }
    return false;
  }

  /* A kernel against one pillar, using the module's OWN rectsFor so the
     thing it bounces off and the thing the doodad dies on are the same
     four boxes by construction. The loop that calls this walks the
     obstacle list backwards and scrolls each one as it reaches it, so a
     pillar at a lower index is at most one frame - six pixels at the
     worst dt the game allows - stale to the kernel testing it. The Deck
     accepted exactly that staleness for its mister clock. */
  var pillarBoxes = [];

  function hitPillar(ob, p) {
    var i;
    pillarBoxes.length = 0;
    rectsFor(p, pillarBoxes);
    for (i = 0; i < pillarBoxes.length; i++) {
      var b = pillarBoxes[i];
      var cx = clamp(ob.x, b[0], b[0] + b[2]);
      var cy = clamp(ob.y, b[1], b[1] + b[3]);
      var dx = ob.x - cx, dy = ob.y - cy;
      var d2 = dx * dx + dy * dy;
      /* A centre INSIDE a box falls straight through and is drawn in
         front, which is what every level's drops already do when one
         clips a plank. Pushing it out would be worse: there is no
         correct direction, and a kernel teleporting sideways out of a
         cushion is a bug the player can see. */
      if (d2 < 0.25 || d2 >= KERNEL_R * KERNEL_R) continue;

      var d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
      ob.x += nx * (KERNEL_R - d);
      ob.y += ny * (KERNEL_R - d);

      if (Math.abs(nx) > Math.abs(ny)) {
        /* a side face: it comes off sideways and keeps falling. The
           kick has a floor on it because a kernel dropping dead
           vertically has no vx to reverse, and a contact that changes
           nothing reads as the kernel passing through the cushion. */
        ob.vx = nx * Math.max(Math.abs(ob.vx) * 0.55, 18);
        ob.vy *= 0.9;
      } else if (ny < 0) {
        /* THE TOP OF A CAP, which is the one contact that could ruin
           the level. A kernel hopping 20 to 46 that settled on the
           bolster at the bottom of a gap would be sitting IN the gap,
           and the gap is the only way through. So it does not settle
           there: it rolls off the end it is nearest, with barely any
           hop left, and it is clear of the bolster inside half a
           second. */
        ob.vy = -Math.abs(ob.vy) * 0.25;
        ob.vx = (ob.x >= b[0] + b[2] / 2 ? 1 : -1) * rand(30, 50);
        ob.bounced = true;
      } else {
        /* the underside of the cap above: straight back down */
        ob.vy = Math.abs(ob.vy) * 0.55;
      }
      /* one box per call. Two push-outs in one frame from two boxes of
         the same pillar fight each other, and the second one always
         wins, which is how a thing ends up inside a plank. */
      return;
    }
  }

  /* Kernel against kernel: a ONE-SIDED equal-mass impulse that each
     kernel applies to ITSELF.

     The art cannot know what order the engine walks the list in, and it
     is forbidden from writing to the other drop anyway. So instead of
     resolving a pair once and moving both, each kernel moves itself out
     by half the overlap and takes half the impulse - and the other one
     does the same thing on its own call, with the same numbers, because
     the geometry between them is symmetric. It converges in two calls
     and it can never double-apply.

     0.925 is (1+e)/2 at e = 0.85: the share of the closing speed one
     body of an equal-mass pair takes in an elastic-ish collision.
     Kernels are light and dry and they click off each other. */
  function hitKernel(ob, o2) {
    var dx = ob.x - o2.x, dy = ob.y - o2.y;
    var d2 = dx * dx + dy * dy;
    if (d2 >= PAIR_D * PAIR_D || d2 < 0.0001) return;
    var d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
    ob.x += nx * (PAIR_D - d) * 0.5;
    ob.y += ny * (PAIR_D - d) * 0.5;
    var rv = (ob.vx - o2.vx) * nx + (ob.vy - o2.vy) * ny;
    if (rv >= 0) return;                 /* already separating */
    ob.vx -= 0.925 * rv * nx;
    ob.vy -= 0.925 * rv * ny;
    ob.vx = clamp(ob.vx, -VX_MAX, VX_MAX);
  }

  /* ------------------------------------------------------- the boxes

     Every lethal pixel has a box and nothing harmless has one. The
     pillows are the Coop's four boxes verbatim and nothing sticks out
     of a cushion; the drifts step in with their own dome; a kernel is
     collided a pixel tighter than it is drawn because dodging is meant
     to be fair, and both gifts a pixel wider because catching is meant
     to be easy.

     A LANDED KERNEL KEEPS ITS BOX. That is the whole point of this
     level: the bottom of the room fills up with things that are still
     lethal, and the one that gets you is still on the screen
     afterwards, hopping, so you can see what it was. */
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
    } else if (ob.type === 'spike') {
      var boxes = DRIFT_BOX[ob.size];
      for (i = 0; i < boxes.length; i++) {
        var b = boxes[i];
        if (ob.side === 'ceil') out.push([ob.x + b[0], CEIL + b[1], b[2], b[3]]);
        else out.push([ob.x + b[0], FLOOR - b[1] - b[3], b[2], b[3]]);
      }
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      if (ob.gold) out.push([ob.x - 5, ob.y - 4, 10, 8]);
      else if (ob.spicy || ob.sour) out.push([ob.x - 5, ob.y - 5, 10, 10]);
      else out.push([ob.x - 3, ob.y - 3, 6, 6]);
    } else if (ob.type === 'boon') {
      /* the disc is what you collect, so the box travels with it and
         the dent it was standing in has none */
      if (!ob.taken) out.push([ob.x + ob.dx - 9, FLOOR - 18 + ob.dy, 18, 18]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon,
    stepDrop: stepDrop,
    rectsFor: rectsFor
  };
})();
