/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE COUCH

   Movie night. You are flying ACROSS THE BACK OF A GREY MICROFIBRE
   SECTIONAL, between stacks of throw pillows, with a band of plantation
   shutters along the very top of the room and a dark walnut coffee
   table sliding past below. Drawn from Couch ref 1-4 in Assets/Concept:
   the sectional, the cream-and-gold damask cushions, the cream knit
   throw over the far arm, the chess set, the magnifying glass - and from
   Coaster ref 1 and 2, the two coasters that are the spare lives: a
   laser-engraved birch map and a coiled pink-and-blue yarn one.

   THE SOFA BACK IS CUSHION PANELS, NOT A QUILT. Couch ref 2 is a row of
   separate back cushions, each one plain grey with exactly FOUR buttons
   in a wide rectangle and a few soft creases pulled out of them, a seam
   and a soft shadow between one panel and the next. The first two cuts
   of this bay painted the back as a continuous diamond-tufted lattice
   with a button at every crossing, which is a different piece of
   furniture - a chesterfield - and the owner said so. See bakeCouch for
   what carries the wall now that the lattice is gone.

   AND THE PANELS ARE STUFFED, NOT CAST. The cut after that one had the
   right layout and the wrong material: square corners, a flat face and
   a drawn seam, which the owner read as a concrete wall with bolts in
   it. So the SHAPE of a panel is a stuffed one and has been since - a
   wide pillow with corners rounded generously at the top and tight at
   the bottom, a rolled crest that curves instead of ruling, a valley at
   every seam that both neighbours fall into, a dimple under each of its
   four buttons, and no straight edge on the fabric anywhere.

   AND THE RENDERING IS THE HOUSE'S, WHICH TOOK TWO GOES. The cut that
   got the shape right drew it as a continuous height field with a light
   vector, seven tones and a tile-anchored ordered Bayer between every
   pair of them. That measures a mean run of 2.0 identical pixels along a
   row where the Coop's plank wall measures 5.2, and the owner's word for
   it was that the cushions had gone "really realistic" and stopped
   matching the rest of the game. He was right, so the height field, the
   light vector, the Bayer and two of the seven tones are gone.

   What draws the sofa now is the Backyard's own grammar and nothing
   else: FIVE flat tones with hard edges, a lit band and a dark band
   whose every boundary sits on a feature of the cushion, a dark line
   with a lit lip wherever two things meet, and a sparse seeded NAP of
   1px grain ticks over the lot - which is the Coop's plank, the Garden's
   stucco and the Construction Zone's lumber, at sofa scale. Five tones
   alone came out the other side of the fault at a mean run of 14 with
   three quarters of the field in one colour; it is the nap that brings
   it back to the family. bakeCouch has the numbers and the measurements
   beside them.

   AND THE CREST IS THE LAST OF IT. The shape pass did all of that and
   still left a 480px row of P.outline across the top of the tile, with
   the panels starting underneath it - so the top of the sofa, which is
   the first thing the eye meets because it is the silhouette against
   the bright shutters, was a dead-straight rule with a shallow notch
   every 160 pixels. The rule is gone. The crest is a curve - crestOf,
   the arch of a cushion plus a long wave across the whole tile so no two
   panels on screen crest at the same height - and the hard edge that
   holds it against the sill follows that curve instead of cutting
   across it.

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

   AND SOMEBODY IS IN THE POPCORN. KOA is the second doodad in the game
   who is FOUND rather than bought, and the Garden's way of hiding one -
   a face peeking over the top of a plank, holding perfectly still -
   would be thrown away in here, because the bottom of this bay is
   already full of pale things moving about and one more still face
   would be the easiest thing in the room to miss. So he hides IN them.
   He is standing on the cushion somewhere between the fifth pillow and
   the twentieth, bouncing at the kernels' own gravity to an apex in the
   middle of the kernels' own range, and the popcorn clicks off him.
   Touch him and he is yours. Take a plain kernel while he is on the
   screen and he is gone for the rest of the run.

   WHO KNOWS WHAT, because he is the first thing in this bay that three
   files have to agree about. The LEVEL says where (tune.meetAt and
   tune.meetSpan on THE COUCH, a window of pillows), the ROSTER says who
   (Doodads.meetable, which is told the level id so the Garden never
   offers the Couch's hider), and this MODULE says how: makeMeet puts
   him down, stepBoon moves him, hitMeet is how big he is to a kernel,
   rectsFor is how big he is to the doodad, and drawMeetSpot is the one
   thing painted for him here.

   HE IS A 'boon', which is why this file has so little to do for him.
   The engine's five obstacle types are closed and he did not get a
   sixth: a boon already has a grab point the engine asks the art for,
   a hitbox it asks rectsFor for, contact resolved in collide(), and -
   the one that makes the rule possible at all - it is LEFT STANDING by
   save(), so "took a hit and lived" is a state the player can be in and
   lose him from. A drop would have been wrong five ways over (lethal,
   splattered, knocked down by a tail, drawn in front of the pillows,
   and lined by Pepper's watch) and litter is never collided at all.

   WHAT THIS MODULE DOES NOT DO IS DRAW THE KOALA. Sprites cannot be
   painted on the room layer: it is nearest-neighbour by contract, and a
   377px PNG resampled to 27 on it would be noise. So PlayScene draws
   him with Doodads.draw on the smooth sprite layer, at the grab point
   this module publishes and squashed by the ob.squash this module sets -
   exactly as it already draws Saddam where the plank says he is. The
   art says where he is and what shape he is in; the engine draws him.

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
    backMid:      '#67635c',   /* the body of a cushion panel  (lum 99) */
    backLit:      '#7c7871',   /* its lamp-side swell         (lum 120) */
    backCrease:   '#4f4c46',   /* the seam's shadow, and a pleat         (76) */
    button:       '#343230',   /* a tufting button, and the seam row     (50) */
    crest:        '#918d86',   /* the arris along the very top          (141) */
    /* FIVE TONES AND NO RAMP. There used to be two more here - backSwell
       109 and backRoll 88 - and their whole job was to be the
       intermediate steps of a smooth falloff across a cushion panel,
       seven tones about eleven apart with an ordered dither between each
       pair. That is how a renderer draws a dome and it is not how this
       game draws anything: the Coop's planks, the Garden's bamboo and the
       Construction Zone's lumber each say their curvature with ONE lit
       band and ONE dark band 35 to 50 apart with a flat body between, and
       put every band edge on a feature of the object. So the two
       in-between steps are gone, these five carry the sofa, and the steps
       between neighbours are 21 / 21 / 23 / 26 - each one an edge the eye
       finds on purpose. What makes the panels read as stuffed is now
       WHERE the edges are and not how softly they blend. See bakeCouch. */

    /* THE THROW PILLOWS, and they are the thing that kills you, so
       nothing else in this bay is allowed to be this colour. The two
       shaded bands used to be greys borrowed off the sofa, which is
       what a cushion's shadow is NOT: a cream cushion turning away from
       a lamp goes tan, not grey. pillowShade and pillowDeep are that
       tan, and they are what lifts a modelled cushion's mean from the
       170s into the 190s without flattening the modelling. */
    pillowCream:  '#e8dcc0',
    pillowHi:     '#f5ecd8',
    /* The brass went UP a value when the damask medallion arrived. Two
       reasons and they point the same way. The photograph's thread is a
       soft brass on cream, not an ochre - at #c4a24c the print was
       darker against its own cushion than anything in Couch ref 4 is.
       And the medallion spends luminance where the old open diamond
       spent almost none: a gold pixel at 162 replacing lit cream at 228
       costs the pillar body six hundredths of a value, and there are a
       hundred of them now. At 178 the same print costs a third less and
       the separation stays where the last round left it. */
    pillowGold:   '#d4b258',
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

    /* THE TWO COASTERS, off Coaster ref 1 and 2. They could not look less
       alike and that is the gift: at boon size one reads as pale wood
       with rings on it and the other as a pink-and-blue spiral.

       ONE: a laser-engraved birch coaster, cut to the edge of a MAP
       rather than to a circle, with topographic contour lines burnt in
       mid-brown - dense in the middle - and a line of tiny engraved text
       round the rim. TWO: a single twisted cord of pink and pale blue
       yarn wound in a flat spiral from a small centre out to a soft,
       slightly irregular rim. */
    birch:        '#ecdfbc',   /* the pale face of the wood             */
    birchShade:   '#cdbb8e',   /* its lower-right edge, away from the lamp */
    burn:         '#a2733f',   /* a contour line, laser-burnt           */
    burnDeep:     '#6b4624',   /* the dense centre, and the rim text    */
    yarnPink:     '#ef8aa8',
    yarnPinkDeep: '#c25c82',   /* the groove between two turns of pink  */
    yarnBlue:     '#aad4e8',
    yarnBlueDeep: '#6ea2bf',   /* ... and of blue                       */
    yarnPale:     '#fbd6de',   /* the little pale knot at the centre    */
    woodBark:     '#5e4330',   /* dark wood: the chess pieces, the table's edge */

    /* the popcorn */
    popWhite:     '#f6efe2',
    popHi:        '#ffffff',
    popCream:     '#e9dcc0',
    popShade:     '#c4b48f',
    hull:         '#5a3a1e',   /* the kernel coat, down in the cleft    */
    hullPale:     '#e2c15e',   /* and the pip of yellow sitting on it   */

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

  /* ------------------------------------------- THE HIDER IN THE POPCORN

     KOA's four numbers, and every one of them is set against the
     kernels' rather than beside them, because the thing the player has
     to believe about him is that he came out of this carpet. Two sets
     of constants for one motion drift apart the first time either is
     tuned, so where he can share the popcorn's numbers he shares them -
     DROP_GRAV, HOP_VARY, the re-launch rather than a restitution - and
     the four below are the places he deliberately differs.

     KOA_HOP, his apex, is FIXED like a kernel's, and at 30 it sits a
     little UNDER the 33 that is the true midpoint of HOP_MIN..HOP_MAX -
     deliberately, and the three pixels are the whole margin: 33 would put
     his best hop's box top at FLOOR-65.9, over the FLOOR-64 that is the
     hitbox bottom of a doodad flying the middle of the lowest gap, and he
     would come up and meet somebody who had not gone down for him. The
     dive is the price of him and it has to stay a dive. At DROP_GRAV his period is 2 * sqrt(2 * 30 / 150)
     = 1.26s, which sits inside the 1.03..1.57s the popcorn around him
     is keeping, so one look tells the player where he is going to be -
     the same bargain this level offers for everything else that hops.
     And it is the number that sets the price of him, which was measured
     rather than guessed. On a nominal hop his centre tops out at
     FLOOR-44 and his box at FLOOR-58; on the +15% rolls, 34.5 of hop, it
     reaches FLOOR-62.5. A doodad flying the middle of the lowest gap has
     its hitbox bottom at FLOOR-64, so he is OUT OF REACH of a straight
     line through the gap on every hop he has - by six pixels on an
     average one and by a pixel and a half on his best. Which is the
     right shape for the number to have: he cannot be collected by flying
     properly, and on his best hop he is a pixel and a half from it, so
     the dive is short and it is obvious that it is needed. For scale, the
     highest a kernel's box ever gets is FLOOR-60 (see HOP_MAX), so at the
     top of a good hop he is the tallest thing on the carpet by a couple
     of pixels - which is also what makes him findable at all in a room
     where everything else is white and hopping.

     KOA_DRIFT is how far either side of where he was put he will
     wander, and it is why he needs no pillar maths where a kernel needs
     hitPillar. At spacingMin 184 the cushion between two pillows is
     92px wide and a pillow's lower cap takes 21 of it, so 20 of drift
     plus his own 14 of body never reaches a bolster. He stays in his
     patch; the engine keeps the patch clear by skipping the spike,
     litter and boon rolls for the gap he is in.

     KOA_KICK and KOA_VX_MAX are the kernels' sideways nudge cut down:
     16 where a kernel takes up to 24, capped at 24 where VX_MAX is 56.
     He is heavier than a kernel and his patch is smaller than the
     carpet, and a hider skating 56px/s through the popcorn would read as
     something coming at the player rather than something hiding.

     KOA_R is the radius a kernel comes off, and it is 13 against the 14
     of his hitbox (see rectsFor) - a pixel INSIDE it, on purpose. If
     the popcorn bounced off a circle wider than the box the player is
     diving at, the bounce would look like an invisible wall around him,
     and the one thing he must never read as is a hazard. Inside the box
     it reads as popcorn hitting fur. */
  var KOA_HOP = 30;
  var KOA_DRIFT = 20;
  var KOA_KICK = 16, KOA_VX_MAX = 24;
  var KOA_R = 13, KOA_PAIR_D = KERNEL_R + KOA_R;      /* 16.5 */

  /* The marshmallow's odds. They live here rather than in the tune
     because the ART is what has to know: a +5 the module has not rolled
     keeps a kernel's width, a kernel's hop and - worst - a kernel's
     plain white sprite, and the player reads an incoming hazard and
     dodges five points. GOLD_GAP keeps two from arriving together. */
  var GOLD_CHANCE = 0.040, GOLD_GAP = 7;
  var goldGap = 0;

  /* the 15 neutral effect colours PlayScene paints its particles, its
     dust and its washes out of. It never reads P. The air is the
     room's, shared by all five bays, so the dust drifting through the
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
  /* The spare life has two names now because it is two things. The EXTRA
     LIFE banner centres its caption on the screen and the SPENT caption
     does the same, so neither is bound by the +5 clamp above. */
  var MAP_NAME  = 'MAP COASTER';
  var YARN_NAME = 'YARN COASTER';
  var GOLD_NAME = 'MALLOW';

  /* The two coasters ALTERNATE, strictly. A coin toss would show one
     player four birch maps in a row and never the yarn, and at one spare
     life every thirty-odd planks that is most of a session; alternating
     means the second coaster anybody ever sees is the other kind. The
     first of a boot is the coin. */
  var nextYarn = chance(0.5);

  var T = {};              /* baked tiles and sprites */

  /* ------------------------------------------------------- geometry

     Where the furniture is, in screen pixels, named once so that the
     tile that bakes a thing and the code that places it cannot drift
     apart. The bay is six horizontal bands and the proportions are Couch
     ref 2's, measured off the photograph rather than guessed:

        24       the crown moulding (the room's, and it kills)
        26..85   the shutters: two panels, nine louvres each
        86..93   the window sill, with the sofa's shadow thrown up it
        94..120  the crest, and it is a CURVE: a cushion's apex touches 94
                 and the valley at a seam runs down to about 120
        94..234  THE BACK CUSHIONS - the field, and most of the screen
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

     IT IS STILL 384 WITH THE LEAF GONE, AND THAT IS NOT AN OVERSIGHT.
     The monstera used to be the reason: one leaf per tile at 192 put
     two or three on screen at once, all at the same height, and a plant
     that repeats is wallpaper. The owner wanted the leaf out of the
     blinds, so it is out - and the question that leaves behind is
     whether 384 is now just 192 printed twice, which would be a tile
     paying double for nothing.

     IT IS NOT, FOR TWO REASONS, AND I MEASURED THE SECOND ONE. The
     panel sequence is OPEN, SHUT, SHUT, OPEN. A 192 period needs panel
     i and panel i+2 to match, and open does not match shut, so the band
     has a dark stretch two panels wide with the night showing either
     side of it - exactly Couch ref 2's window - and that rhythm is 384
     pixels long whatever is painted in it. And the palm seen through
     the two open panels is drawn from ONE mulberry32 stream taken in
     panel order, so the second open panel gets different fronds from
     the first: the two 192px halves of the baked tile differ in 243
     pixels, counted off the tile itself. Halving it would not save a
     repeat, it would create one.

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

    /* and the hard edge round the whole panel. Three in ten pillars are
       cream and they pass in front of this: the outline is half of what
       keeps them from dissolving into it. */
    c.fillStyle = P.outline;
    c.fillRect(px - 1, 0, 1, SILL_Y);
    c.fillRect(px + PANEL_W, 0, 1, SILL_Y);
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

    /* and the shadow line under the nose of the sill, run the whole way
       across rather than per panel. The sill is ONE shelf: drawn per
       panel it left a 2px gap of lit wall every 96 pixels, and the
       sectional's crest now touches this row where a cushion's apex
       comes up to screen 94, so those gaps would have slid along the top
       of the sofa at a different parallax from the sofa itself. */
    c.fillStyle = P.outline;
    c.fillRect(0, SILL_Y + 7, SH_W, 1);

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
     0.62 parallax only ever moves it sideways: the crease at 235 is a
     perfectly flat line across the screen no matter where the scroll has
     got to, which is what makes it usable as the floor of the popcorn
     zone. The CREST is not flat and is not meant to be - it rises and
     falls across the panels - and nothing is solved against it: every
     number the hops are worked out from is quoted off FLOOR. */
  var CO_W = 480, CO_H = FLOOR - BACK_Y;   /* 480 x 148, drawn at y 94 */

  /* THE CUSHION PANELS. 160 wide because 480/160 is a whole number and
     this tile is laid end to end - a panel that does not divide into 480
     puts a half-cushion at every screen's seam - and because Couch ref 2
     measures a panel at about 1.3 times as wide as it is tall: the field
     is 137 rows, so 160 is the photograph's proportion to within a tenth.
     Three panels a screen, each one wider than four of the 34px pillows
     standing in front of it, so there is no pitch here for a pillar to
     be mistaken for.

     THE FOUR BUTTONS sit where the photograph's do: two rows at 36% and
     64% of the panel's height, two columns 18% either side of its centre
     line. In pixels that is rows 53 and 92 of the tile and 29 to each
     side of the panel's middle - a wide rectangle, 58 by 39, with a lot
     of plain cushion round it. */
  /* The sofa back is cut into panels this wide. NOT PANEL_W: that name is
     already taken by the shutter stile above, and a second `var` of it in
     the same IIFE is not a second variable - it is the same one, assigned
     later, so the window would have been built 160 wide instead of 90. */
  var CUSHION_W = 160;
  var BTN_DX = 29;
  /* ROW 88 AND NOT 92, which is the only number in this block the
     photograph did not pick. The three throw cushions propped on the seat
     are baked over the bottom of the panels and their outline ring lands
     on tile row 94; a lower button row at 92 puts its own shadow row on
     94 as well, so on the two panels a cushion stands in front of the
     bottom two buttons lost their shadow and sat ON the cushion's rim
     with nothing between. At 88 the dimple ends at row 90 and every one
     of the twelve has four rows of clear fabric under it. 53 and 88 of
     141 is 38% and 62%, which is the photograph's pair to within two
     points, and it puts the wide rectangle of four on the panel's middle
     instead of a little below it. */
  var BTN_Y = [53, 88];

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
    var x, y, i, j, p, pcx;
    var FIELD = 0;                        /* local row the cushions start  */
    var CREASE = CO_H - 7;                /* local 141, screen 235         */
    var hx = CUSHION_W / 2;

    /* 1. the body, AND NOTHING ALONG THE TOP OF IT - which is the one
       bullet of the owner's cushion note that the modelling pass left on
       the table. There used to be `fillRect(0, 0, CO_W, 1)` in P.outline
       here: a 480px dead-straight rule across the whole tile, with the
       cushion silhouette starting underneath it and only reaching u
       15..145 of each 160px panel, so what the player met at the top of
       the sofa back was a hard straight line with a shallow notch every
       160 pixels. The note asked for "the top edge of the whole back is
       a soft rolled crest, not a straight rule" and "no straight hard
       edge anywhere on the fabric", and in Couch ref 2 the crest is a
       continuous curve rising and falling across the panels with nothing
       above it at all.

       So the crest is part of the SILHOUETTE now. The top of the
       fabric is a curve (crestOf, in step 2), the dark above it is the
       recess between the sofa back and the window sill, and the hard
       edge the house style asks for is two rows of outline that FOLLOW
       that curve - laid at the end of step 2, where the shape of it is
       known. FIELD is 0 and not 1 for the same reason: the crest has to
       be able to reach the top row of the tile, or the row above it is a
       straight rule again by another name. */
    c.fillStyle = P.backMid;  c.fillRect(0, 0, CO_W, CO_H);

    /* 2. THE PANELS, AND THEY ARE DRAWN THE WAY THE REST OF THIS GAME
       DRAWS EVERYTHING. The SHAPES here are the ones that were right and
       are kept to the pixel - separate panels, four buttons each in a
       wide rectangle, corners rounded generously at the top and tight at
       the bottom, a crest that curves rather than rules, a valley at
       every seam, a dimple at every button. What changed is the
       RENDERING.

       What used to be here was a continuous height field, a normalised
       light vector, seven tones and a 4x4 ordered dither between every
       pair of them. Measured on this baked tile with no light sheet over
       it, that drew at a mean run of 2.2 identical pixels along a row,
       median 1, in thirteen colours. The Coop's plank wall measures 5.2
       on the same harness and the Garden's stucco 11.2. It was a
       continuous-tone renderer wearing a pixel-art costume, and against
       the Coop's planks it read as a photograph pasted into the game.

       THE GRAMMAR IT IS DRAWN IN NOW, read off js/coop.js, js/garden.js
       and js/construction.js rather than invented:
         - ONE FLAT TONE PER FACE. A slat of the Coop's wall is one of
           four tones over its whole width; a 2x4 in the Construction
           Zone's bundle is lumHi 1 / lumMid 4 / lumDark 1 and nothing in
           between.
         - CURVATURE IS A LIT BAND AND A DARK BAND. A plank is plankLight
           5 on the lamp side, plankMid 17 flat, plankDark 6 on the far
           side. A bamboo cane is bambooLit 4 / bambooMid 4 / bambooDark
           3. Not a ramp: two bands and a flat, 35 to 50 luminance apart,
           and every band edge sits on a FEATURE of the object - an
           arris, a node, a joint, the silhouette.
         - A DARK LINE WHEREVER TWO THINGS MEET, usually paired with a 1px
           lit lip under it: bakePlank's board joints, bakePillar's
           bamboo nodes, the twine lashings, the gap between two courses
           of lumber.
         - TEXTURE IS SPARSE SEEDED TICKS - grain, knots, nail heads, the
           Garden's 2600 pixels of stucco tooth. Never a Bayer laid
           between two tones to fake a third. This is the one bullet the
           first cut of these bands dropped, and dropping it is what left
           74% of the field in a single colour with the buttons and the
           folds engraved on a blank slab. See THE NAP, below.
         - A LIGHT RAMP EXISTS ONLY AT THE SCALE OF A WHOLE WALL, and only
           on a FLAT PLANE. The Garden's stucco steps about five times
           each way in 1/16 Tints; the Coop's grime is three flat steps
           and its daylight shaft five. On a flat plane the iso-lines of
           light are straight and parallel to the sill and the screed, so
           a light step and an architectural line are the same mark. On a
           curved OBJECT - plank, cane, 2x4, egg - the Backyard never
           ramps at all.

       WHICH IS WHY NO BAND BELOW IS A THRESHOLD OF A FIELD. A dome has no
       straight iso-lines: its are closed concentric loops with no edge of
       anything to sit on, so quantising its light - even to four tones,
       even with the dither gone - draws nested rings, which is a
       topographic map of a cushion. The old comment here said as much
       ("seven flat tones laid as contours read as a target") and reached
       for a dither to hide it; the house cure is to stop drawing
       iso-lines at all. So every edge below is ONE NAMED CURVE WITH A
       PHYSICAL CAUSE, and no two of them are offset copies of each other,
       because offset copies is what a contour map is made of: the cap's
       lower edge is the only one that follows the crest and it is a
       different curve from it, the skirt is dead straight because the
       seat it is pushed down into is straight, and the two flanks follow
       the silhouette.

       FIVE TONES, down from seven, every one of them already in P:
         ARRIS  P.crest      141  the rolled top edge catching the pendants
         LIT    P.backLit    120  the top roll turning under, and the
                                  lamp-side shoulder
         BODY   P.backMid     99  three quarters of the panel, one flat
         SHADE  P.backCrease  76  the skirt pushed into the seat, and the
                                  flank turned away from the lamp
         DARK   P.button      50  the gap between two cushions
       Steps of 21 / 21 / 23 / 26. Smaller than the Coop's 35-50, because
       microfibre is not pine and this sofa has to stay eleven points off
       neutral under the pillars; but every one of them is an edge the eye
       finds, which is now the point rather than the problem. P.outline
       stays the edge above the crest and is not a tone of the fabric.
       P.backSwell and P.backRoll were the two intermediate steps that
       made the old ramp a ramp, and they go with it.

       THE BANDS, down one 160x141 panel. `u` runs across it, `vv` is
       measured down from wherever the crest is on this column and
       rescaled to the full panel - exactly the coordinate the height
       field used to be read in, so the bands hang off the curved top the
       way the dome used to:
         THE DARK     everything inside the field and outside the
                      silhouette: the 2-column valley at every seam,
                      widening into the 18px corner wedges at the top and
                      the 8px ones at the bottom. The gap between two
                      cushions, seen straight on.
         THE OUTLINE  two rows directly above the first fabric row of each
                      column, following the crest. A solid thing against
                      the recess behind it.
         THE ARRIS    the first two fabric rows wherever the silhouette
                      faces within 25 degrees of straight up, thinning to
                      one row out to 70 degrees round the left corner and
                      30 round the right - the lamps are up and to the
                      left. This is the lumHi row on a 2x4 and the
                      bambooLit lip under a node.
         THE CAP      from under the arris down to vv 16 at the apex of
                      the panel, 13 a quarter of the way out and 9 at the
                      seams, PLUS a 4px strip hugging the left silhouette
                      down to vv 44, just above the top button row. The
                      top roll turns under here, deepest where the cushion
                      is fattest, and on the lamp side it carries on down
                      the shoulder the way plankLight runs the length of a
                      plank. This one curved edge is what carries the dome.
         THE BODY     everything not claimed above, about three quarters
                      of the panel, one flat tone. The big flat is what
                      makes it pixel art - but a big flat and NOTHING
                      ELSE is what makes it plastic, which is what the
                      nap three steps down is for.
         THE SHADE    the bottom 10 rows straight across, and a 5px strip
                      hugging the right silhouette from vv 20 down into
                      them. The roll pushed into the seat and the flank
                      turned away from the lamp: plankDark's band.
       The dome survives as the cap's lower edge dipping seven rows deeper
       at the apex than at the ends, read against the lit left shoulder
       and the shaded right flank - a cylinder's lit-band/dark-band read,
       stated once instead of integrated over every pixel. A seam survives
       as a 7px dark-then-light event: the neighbour's 5px shade strip,
       the 2px dark valley, this panel's 4px lit strip. That is the Coop's
       slat seam and the Garden's node, at sofa scale. */
    var ARRIS = 0, LIT = 1, BODY = 2, SHADE = 3, DARK = 4, OUTLINE = 5;
    var TONES = [P.crest, P.backLit, P.backMid, P.backCrease, P.button, P.outline];
    var PW = CUSHION_W, PH = CREASE - FIELD;          /* one panel: 160 x 141 */
    var R_TOP = 18, R_BOT = 8, GAP = 1;
    var CAP_MID = 16, CAP_END = 9;      /* the cap's depth at the apex and at a seam */
    var SKIRT = 10;                     /* rows of shade along the bottom            */
    var SIDE_SHADE = 5, SHADE_FROM = 20;/* the shaded right flank, and where it starts */
    var SIDE_LIT = 4, LIT_TO = 44;      /* the lit left shoulder, and where it stops   */
    var CREST_DIP = 11, CREST_P = 1.6, CREST_RUN = 3;
    var DEG = 180 / Math.PI;

    /* THE CREST LINE: which tile row the top of the fabric is on, column
       by column, and it is the whole of what makes the top edge read as a
       roll instead of as a rule. Two terms, and they are both there for a
       measured reason.

         - THE ARCH of one cushion: 11 rows from its apex down to the seam
           at either side, as |u|^1.6 in half-panels. The exponent is
           under two on purpose. Any smooth curve is flat at its own
           apex, and a quadratic arch over a 160px panel with 11 rows of
           amplitude stays inside half a pixel of its peak for fifty
           columns - which is a fifty-pixel straight run of silhouette,
           the very fault being fixed, just shorter. At 1.6 the roll turns
           over inside twenty-two columns and then falls away steadily
           into the seam, which is also what a stuffed cushion does: tight
           at the top, slack at the sides.
         - A LONG WAVE of three rows across the whole 480, cosine, so that
           the three panels on screen are not three identical arches. It
           puts their apexes on tile rows 2, 0 and 2 and their seams about
           14, 12 and 12 down, and it is periodic in CO_W, so it wraps at the
           tile seam like everything else in here.

       Measured off the result: the longest run of columns sharing one
       silhouette row is 22px against 480 before, 22 of the 480 columns
       reach tile row 0 - screen 94, exactly where the old rule was - and
       the valley at a seam is 26 rows deep, where the arch and the 18px
       top corner radius add together. */
    var crestOf = new Float32Array(CO_W);
    var cu;
    for (x = 0; x < CO_W; x++) {
      cu = (wrap(x + 0.5, CUSHION_W) - CUSHION_W / 2) / (CUSHION_W / 2);
      crestOf[x] = CREST_DIP * Math.pow(cu < 0 ? -cu : cu, CREST_P) +
                   CREST_RUN * (1 + Math.cos(TAU * (x + 0.5) / CO_W)) / 2;
    }

    /* WHERE A PIXEL STANDS IN ITS PANEL: the signed distance to the
       rounded-rectangle silhouette (negative inside), the vertical
       coordinate hung off the crest, and the two overshoots the corner
       arcs are measured from - which are also what says which way the
       silhouette FACES, and the arris is the one band that needs to know.
       Written into `sd` rather than returned, so the per-pixel loop
       allocates nothing. There is no height field and no gradient any
       more, so this needs no border ring around the tile: a pixel's tone
       depends on where it is and on nothing its neighbours are doing. */
    var sd = { d: 1, vv: 0, u: 0, qx: 0, qy: 0, ox: 0, oy: 0 };
    function silhouette(xi, v) {
      var top = crestOf[xi];
      var vv = (v - top) * PH / (PH - top);
      sd.vv = vv;
      if (vv < 0) { sd.d = 1; return; }
      var u = wrap(xi, PW) + 0.5;
      var r = vv < PH / 2 ? R_TOP : R_BOT;
      var hw = PW / 2 - GAP - r, hh = PH / 2 - r;
      var qx = Math.abs(u - PW / 2) - hw, qy = Math.abs(vv - PH / 2) - hh;
      var ox = Math.max(qx, 0), oy = Math.max(qy, 0);
      sd.u = u; sd.qx = qx; sd.qy = qy; sd.ox = ox; sd.oy = oy;
      sd.d = Math.sqrt(ox * ox + oy * oy) + Math.min(Math.max(qx, qy), 0) - r;
    }

    /* HOW DEEP THE CAP RUNS on this column: 16 rows at the apex of the
       panel, about 13 a quarter of the way out, 9 at the seams.
       Cos-squared and not a straight taper, so the edge has no flat and
       no corner anywhere along it - the top roll is fattest where the
       stuffing is and turns under sooner as the panel runs out of it.
       This is the ONLY curved tone edge on the panel, which is what
       keeps it from reading as the innermost ring of a contour map. */
    function capDepth(u) {
      var k = Math.cos(Math.PI * (u - PW / 2) / PW);
      return CAP_END + (CAP_MID - CAP_END) * k * k;
    }

    var tone = new Uint8Array(CO_W * CO_H);
    var inside = new Uint8Array(CO_W * CO_H);
    var v, th, depth, left, tv, ti;
    for (v = 0; v < PH; v++) {
      for (x = 0; x < CO_W; x++) {
        ti = (FIELD + v) * CO_W + x;
        silhouette(x, v + 0.5);
        if (sd.d >= 0) { tone[ti] = DARK; continue; }
        inside[ti] = 1;
        depth = -sd.d;
        left = sd.u < PW / 2;
        /* which way the silhouette faces here, in degrees off straight
           up, negative to the left. Only the top half of a panel can face
           upward at all; below the waist the edge is a flank, and the
           bottom is the skirt, which has its own band. */
        if (sd.vv < PH / 2) {
          if (sd.ox > 0 && sd.oy > 0) th = Math.atan2(sd.ox, sd.oy) * DEG;
          else if (sd.qy > 0) th = 0;
          else th = 90;
        } else {
          th = 180;
        }
        if (left) th = -th;
        tv = BODY;
        if (depth < 2 && th >= -70 && th <= 30 &&
            (depth < 1 || (th < 0 ? -th : th) <= 25)) tv = ARRIS;
        else if (sd.vv >= PH - SKIRT) tv = SHADE;
        else if (!left && depth < SIDE_SHADE && sd.vv >= SHADE_FROM) tv = SHADE;
        else if (sd.vv < capDepth(sd.u)) tv = LIT;
        else if (left && depth < SIDE_LIT && sd.vv < LIT_TO) tv = LIT;
        tone[ti] = tv;
      }
    }

    /* THE PLEATS - "just a few", and the owner's words are still the
       spec. Six per panel, on the origins they have always had: from each
       button a fold runs out toward its own corner, and between the two
       buttons of each row the fabric is pulled into a shallow horizontal
       one. A fold is the Coop's board joint borrowed - a 1px SHADE line
       with a 1px LIT lip directly under it, a dark line paired with a lit
       one, which is how every joint, node and lashing in the Backyard is
       drawn - solid for the first three fifths of its length and every
       second pixel after it, so it thins the way cloth gathered and let
       go does rather than stopping dead.

       It is written ONLY onto BODY. That is not tidiness: a pleat laid
       across a band edge would put a second line a pixel from the first,
       and a twin line a few pixels from an edge is exactly the ring this
       whole pass exists to get rid of.

       `locked` is what the nap below reads. A fold is the one mark on
       this panel that has to stay continuous, and a grain tick dropped
       on top of one would eat a pixel out of it; so every pixel a pleat
       writes is flagged here and the nap steps over it. The gather grows
       ROUND a fold, not through it. */
    var locked = new Uint8Array(CO_W * CO_H);
    function pleat(x0, y0, ddx, ddy, len) {
      var len2 = Math.sqrt(ddx * ddx + ddy * ddy);
      ddx /= len2; ddy /= len2;
      for (var s = 3; s < len; s++) {
        if (s > 0.6 * len && (s & 1)) continue;
        var px2 = wrap(Math.round(x0 + ddx * s), CO_W);
        var py2 = Math.round(y0 + ddy * s);
        if (py2 < FIELD + 1 || py2 >= CREASE - 1) continue;
        var ii = py2 * CO_W + px2, jj = (py2 + 1) * CO_W + px2;
        if (tone[ii] === BODY) { tone[ii] = SHADE; locked[ii] = 1; }
        if (tone[jj] === BODY) { tone[jj] = LIT; locked[jj] = 1; }
      }
    }
    /* the six of them, as a table rather than as six calls, because the
       nap has to walk the same six lines a second time to thicken the
       grain along them and two copies of these numbers is two chances to
       move one of them: [x off the panel's centre, row, dx, dy, length] */
    var PLEATS = [[-BTN_DX,     BTN_Y[0],     -0.80, -0.60, 28],
                  [ BTN_DX,     BTN_Y[0],      0.80, -0.60, 28],
                  [-BTN_DX,     BTN_Y[1],     -0.80,  0.60, 24],
                  [ BTN_DX,     BTN_Y[1],      0.80,  0.60, 24],
                  [-BTN_DX + 4, BTN_Y[0] + 1,  1,     0,    2 * BTN_DX - 8],
                  [-BTN_DX + 4, BTN_Y[1] + 1,  1,     0,    2 * BTN_DX - 8]];
    var PANELS = CO_W / CUSHION_W;
    var q;
    for (p = 0; p < PANELS; p++) {
      pcx = p * CUSHION_W + hx;
      for (q = 0; q < PLEATS.length; q++) {
        pleat(pcx + PLEATS[q][0], PLEATS[q][1], PLEATS[q][2], PLEATS[q][3], PLEATS[q][4]);
      }
    }

    /* THE NAP, and it is the fifth point of the grammar above - the one
       the first cut of these flat bands left out. The Coop drops 26
       seeded 1px grain ticks 3 to 11 long down every plank and two knots
       besides; the Garden scatters about 2600 single pixels of tooth
       across its stucco; the Construction Zone gives every course of
       lumber 20 ticks and two knots. None of that is a dither between two
       tones. All of it is sparse single pixels and short ticks of a
       NEIGHBOURING tone dropped by a seeded hash, so the surface has
       grain without having a gradient.

       Left out, the five bands measured a mean run of 14 identical pixels
       along a row where the Coop's plank wall measures 5.2, with 74% of
       the field in one colour and the longest flat run on a panel body
       154 pixels of a 160 pixel panel. The bands were right and the
       surface under them was plastic, so the four buttons and the six
       folds floated in open ground and read as an engraving on a blank
       slab rather than as cloth gathered round a thread.

       Microfibre is what the photographs show and it is the one
       upholstery that genuinely reads as fine directional grain, so the
       ticks run WITH THE FALL OF THE CLOTH: 1 pixel wide, two to four
       rows tall, which is the Coop's grain tick stood up the way a sofa
       back's pile hangs. One step LIGHTER or one step DARKER on the
       five-tone ladder and never anything else - no new tone, no third
       value mixed between two, which is the line between a nap and a
       dither - clamped at both ends, because the arris has no lighter
       neighbour in this palette and the skirt no darker one.

       THREE PASSES, and the second and third are the point of it. A nap
       spread evenly is a texture; a nap that thickens where the cloth is
       gathered is upholstery. So the field gets its scatter, and then
       every button and every fold gets a handful more dropped around it,
       which is what settles the pleats into the surface. Seeded off hash
       and not Math.random: the tile is the same tile every boot, and a
       tile that is the same every boot cannot boil when it scrolls. */
    /* THE NAP, and the one number in it that decides whether this reads as
       cloth or as weather.

       A tick 2 to 4 rows tall, at this density, is a STREAK: the first cut
       put 820 of them over the field and the cushions looked rained on -
       scratched, not woven. The Coop's grain ticks are 3 to 11 rows tall
       and look like timber because there are twenty-six of them on a whole
       plank, roughly half a percent of it; the Garden's stucco is the other
       answer, four and a half percent of the wall as SINGLE pixels, and it
       reads as tooth because nothing in it is long enough to be a line.

       Cloth is the Garden's case, not the Coop's. A tick is 1 row three
       times in four and 2 rows otherwise - short enough that no mark is a
       stroke - and there are more of them to hold the row-run measure where
       it was. Nothing here is a gradient and nothing is a dither; it is the
       same five tones, moved one step, in single pixels. */
    var NAP_FIELD = 1150;      /* marks over the whole 480 x 141 field    */
    var NAP_BTN = 34;          /* and again round each of the 12 buttons  */
    var NAP_PLEAT = 28;        /* and again along each of the 18 folds    */
    var NAP_BOX_X = 35, NAP_BOX_Y = 27;   /* the gather box round a button */

    function napTick(h, nx, ny) {
      /* 1 row three times in four, 2 the rest - see the NAP comment */
      var len = (((h >>> 3) & 3) === 0) ? 2 : 1;
      var up = ((h >>> 11) & 1) ? -1 : 1;
      var k, ii, nt;
      for (k = 0; k < len; k++) {
        if (ny + k >= CREASE) return;
        ii = (ny + k) * CO_W + nx;
        if (!inside[ii] || locked[ii]) continue;
        if (tone[ii] > SHADE) continue;     /* DARK and OUTLINE are structure */
        nt = tone[ii] + up;
        if (nt < ARRIS) nt = LIT;           /* nothing above the arris   */
        if (nt > SHADE) nt = BODY;          /* nothing below the skirt   */
        tone[ii] = nt;
      }
    }

    var nh, nx2, ny2, k2, ks;
    for (i = 0; i < NAP_FIELD; i++) {
      nh = hash(4001 + i * 9173);
      napTick(nh, nh % CO_W, FIELD + ((nh >>> 9) % PH));
    }
    ks = 0;
    for (p = 0; p < PANELS; p++) {
      pcx = p * CUSHION_W + hx;
      for (j = 0; j < 2; j++) {
        for (i = 0; i < 2; i++) {
          for (k2 = 0; k2 < NAP_BTN; k2++) {
            nh = hash(7001 + (ks * 97 + k2) * 2749);
            nx2 = wrap(pcx + (i ? BTN_DX : -BTN_DX) - (NAP_BOX_X >> 1) +
                       ((nh >>> 5) % NAP_BOX_X), CO_W);
            ny2 = BTN_Y[j] - (NAP_BOX_Y >> 1) + ((nh >>> 17) % NAP_BOX_Y);
            if (ny2 >= FIELD && ny2 < CREASE) napTick(nh, nx2, ny2);
          }
          ks++;
        }
      }
    }
    ks = 0;
    for (p = 0; p < PANELS; p++) {
      pcx = p * CUSHION_W + hx;
      for (q = 0; q < PLEATS.length; q++) {
        var pl = PLEATS[q];
        var pn = Math.sqrt(pl[2] * pl[2] + pl[3] * pl[3]);
        var pdx = pl[2] / pn, pdy = pl[3] / pn;
        for (k2 = 0; k2 < NAP_PLEAT; k2++) {
          nh = hash(9001 + (ks * 101 + k2) * 3571);
          /* how far along the fold, and how far off it: the gather is a
             sleeve round the line rather than a second line beside it */
          var ps = 3 + ((nh >>> 4) % (pl[4] - 3));
          var po = ((nh >>> 14) % 7) - 3;
          nx2 = wrap(Math.round(pcx + pl[0] + pdx * ps - pdy * po), CO_W);
          ny2 = Math.round(pl[1] + pdy * ps + pdx * po);
          if (ny2 >= FIELD && ny2 < CREASE) napTick(nh, nx2, ny2);
        }
        ks++;
      }
    }

    /* 3. FOUR BUTTONS A PANEL, and a button is a soft dark dimple with no
       highlight on it - which is what Couch ref 2 and ref 4 show, and
       what the last pass's lit lower lip was not.

       The stamp itself is unchanged: 3x3 of the sofa's own dark, one body
       pixel on its upper left shoulder so it is a dome and not a hole,
       and a 3px shade row under it for the shadow it throws on the lip
       below. What is new is that the pucker round it no longer comes out
       of a height field, because there is no height field: it is an
       EYEBROW, five shade pixels three rows above the button with one at
       each end a row lower, which is the fabric lifting where the thread
       pulls it in. An eyebrow and a shadow row with flat body between
       them - no ramp, so there is nothing here that can contour either.
       Stamped last, over the pleats and the nap, because a button wants a
       crisp edge and the nap must not eat one. */
    var bx, by, bd;
    for (p = 0; p < CO_W / CUSHION_W; p++) {
      pcx = p * CUSHION_W + hx;
      for (j = 0; j < 2; j++) {
        for (i = 0; i < 2; i++) {
          bx = pcx + (i ? BTN_DX : -BTN_DX); by = BTN_Y[j];
          for (bd = -2; bd <= 2; bd++) tone[(by - 3) * CO_W + wrap(bx + bd, CO_W)] = SHADE;
          tone[(by - 2) * CO_W + wrap(bx - 3, CO_W)] = SHADE;
          tone[(by - 2) * CO_W + wrap(bx + 3, CO_W)] = SHADE;
          for (bd = -1; bd <= 1; bd++) {
            tone[(by - 1) * CO_W + wrap(bx + bd, CO_W)] = DARK;
            tone[by * CO_W + wrap(bx + bd, CO_W)] = DARK;
            tone[(by + 1) * CO_W + wrap(bx + bd, CO_W)] = DARK;
            tone[(by + 2) * CO_W + wrap(bx + bd, CO_W)] = SHADE;
          }
          tone[(by - 1) * CO_W + wrap(bx - 1, CO_W)] = BODY;
        }
      }
    }

    /* THE EDGE, AND IT IS A CURVE. The house style wants a hard edge
       wherever a solid thing meets something behind it, and the thing
       that used to provide it along the top of the sofa was a straight
       rule at row 0. Walk down each column to the first row of fabric and
       lay two rows of outline immediately above it instead: on the
       twenty-two columns where the crest reaches row 0 nothing is drawn
       at all and the sill's own shadow line is the edge, and everywhere
       else the edge hugs the roll and then the two rounded corners
       rolling down into the seam. Above those two rows is DARK, the same
       P.button the valley between two cushions is painted in, because it
       is the same gap seen from the same angle: a wide V at the top
       narrowing to the 2px dark line that runs the rest of the way down
       to the crease. A column with no fabric on it at all - the seam
       itself - is left alone, or the walk would paint an edge into the
       bottom of the valley. */
    for (x = 0; x < CO_W; x++) {
      y = -1;
      for (j = 0; j < CREASE; j++) { if (inside[j * CO_W + x]) { y = j; break; } }
      if (y > 0) tone[(y - 1) * CO_W + x] = OUTLINE;
      if (y > 1) tone[(y - 2) * CO_W + x] = OUTLINE;
    }

    /* and laid down as RUNS, not as pixels. The old pass had to fill one
       pixel at a time because the dither gave it a new colour every other
       pixel; a row of this tile is now a handful of long flat bands, so
       the same 67,680 pixels go down in about three thousand fills. That
       the saving exists at all is the measurement: if this loop were not
       much cheaper than the old one, the tile would not be flat. */
    var runFrom, runTone;
    for (y = FIELD; y < CREASE; y++) {
      runFrom = 0; runTone = tone[y * CO_W];
      for (x = 1; x <= CO_W; x++) {
        if (x < CO_W && tone[y * CO_W + x] === runTone) continue;
        c.fillStyle = TONES[runTone];
        c.fillRect(runFrom, y, x - runFrom, 1);
        if (x < CO_W) { runTone = tone[y * CO_W + x]; runFrom = x; }
      }
    }
    /* 4. THE SEAMS are not drawn. A seam used to be a 2px welt and a 1px
       lit edge - a ruled line - and it is a VALLEY: the column either
       side of a panel boundary is outside both cushions' silhouettes and
       takes the dark. What flanks it is now a hard event rather than a
       falloff - the left neighbour's 5px shade strip, the 2px dark, this
       panel's 4px lit strip - which is the Coop's slat seam, where a 1px
       wallShadow sits between two flat slats, at sofa scale. x 0 is the
       tile seam, and the valley on it is what hides the repeat. */

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
  /* ------------------------------------------- the damask medallion

     GO AND LOOK AT COUCH REF 1, 2 AND 4. Three of the four throw
     pillows in the photographs carry one print, and it is not a
     diamond: it is a large ikat damask MEDALLION. One scalloped ogee
     fills most of the pillow face, with a gold-filled centre carrying a
     cream quatrefoil, grey scroll-vines curling off the four corners
     with hooked tendrils, gold leaf-lobes between the vines, and plain
     cream round the edge. Two threads on cream - a soft brass gold and
     a mid grey - with the GOLD carrying the medallion and the GREY
     carrying the vines.

     WHAT WAS HERE BEFORE was a 20px open diamond in one pixel with four
     dots and a grey centre, written down as "the damask reduced to what
     survives on a 34px cushion". It survived, and what it read as was a
     TILE MOTIF: no fill, no scallop, no vines, which is the whole of
     the owner's note. The lesson that produced it - thread at this size
     is a line and not a field - is right about the THREAD and wrong
     about the MEDALLION, which in the photograph is a solid stamp of
     gold with the cream drawn back out of it.

     IT MUST NOT COST THE SEPARATION, which is the one thing this pillar
     may not spend. A print is read by HUE and the separation is
     measured in LUMINANCE, and those are two different budgets: gold
     (#c4a24c, luminance 162) printed on the lit cream it sits on (about
     228) moves a 34x32 cushion's mean by 0.06 of a value per pixel, so
     the hundred-odd gold pixels below are worth about six values on a
     body that measures 177 against a lane of 110. If a later pass ever
     brings that under 60 the fix is to LIFT pillowGold toward the brass
     the photograph actually shows, never to thin the medallion back
     into a line.

     The ogee, as half-widths per row from the point at the top to the
     point at the bottom: fourteen pixels across the belly and
     twenty-two deep, which is a medallion filling a pillow face rather
     than a motif printed on one. The two single-row steps back at the
     quarter points are the SCALLOP - at this size a lobed edge is a one
     pixel notch, and anything more elaborate is noise. */
  var OGEE = [1, 2, 3, 3, 4, 5, 6, 7, 7, 8, 7, 7, 7, 8, 7, 6, 6, 5, 4, 3, 2, 1];
  var OGEE_Y = 5;                     /* its first row inside a cushion */

  /* the gold heart of it, same idea: a filled lozenge, which is the
     fill the old motif never had */
  var CORE = [1, 2, 3, 4, 5, 5, 4, 3, 2, 1];
  var CORE_Y = 11;

  /* One corner's scrollwork, drawn into the top left and mirrored into
     the other three. 'g' is the grey vine hooking outward, 'o' the gold
     leaf-lobe tucked in the crook of it - which is exactly how the
     photograph arranges the two colours. */
  var SCROLL = ['..ggg',
                '.g...',
                'g.o..',
                'g..o.',
                '.gg..',
                '..g..'];
  var SCROLL_X = 3, SCROLL_Y = 4;

  function damask(c, y) {
    var i, k, r, half, x0, x1, ch;

    /* THE OGEE, as a two pixel band. One pixel is a wire and reads as
       the diamond this is replacing; two is a drawn stroke, and a
       drawn stroke round a shape is what a stamped damask looks like. */
    c.fillStyle = P.pillowGold;
    for (i = 0; i < OGEE.length; i++) {
      half = OGEE[i];
      r = y + OGEE_Y + i;
      x0 = 17 - half; x1 = 16 + half;
      c.fillRect(x0, r, Math.min(2, x1 - x0 + 1), 1);
      c.fillRect(Math.max(x0, x1 - 1), r, Math.min(2, x1 - x0 + 1), 1);
    }

    /* THE CENTRE, filled, with a cream cross drawn back through it:
       cream showing through gold IS the quatrefoil at this size, and it
       is also what keeps the middle of the cushion - the brightest part
       of it - from going over to thread. */
    for (i = 0; i < CORE.length; i++) {
      half = CORE[i];
      c.fillRect(17 - half, y + CORE_Y + i, half * 2, 1);
    }
    /* INSET BY ONE, and that one pixel is the difference between a
       flower and a compass rose. Cut the cream all the way out to the
       lozenge's edge and the gold left behind is four separate arrow
       heads pointing out of the middle; stop a pixel short and the gold
       closes into a RING with a cream quatrefoil inside it, which is
       what Couch ref 4's centre is. */
    c.fillStyle = P.pillowHi;
    c.fillRect(14, y + 15, 6, 2);
    c.fillRect(16, y + 13, 2, 6);

    /* THE VINES. Four scrolls, one to a corner, each curling AWAY from
       the medallion - the direction matters, because four hooks curling
       inward read as arrows pointing at the middle. */
    for (k = 0; k < 4; k++) {
      var mx = (k === 1 || k === 3) ? -1 : 1;
      var my = (k === 2 || k === 3) ? -1 : 1;
      for (i = 0; i < SCROLL.length; i++) {
        for (r = 0; r < SCROLL[i].length; r++) {
          ch = SCROLL[i].charAt(r);
          if (ch === '.') continue;
          c.fillStyle = (ch === 'g') ? P.pillowGrey : P.pillowGold;
          c.fillRect(mx > 0 ? SCROLL_X + r : 33 - SCROLL_X - r,
                     y + (my > 0 ? SCROLL_Y + i : 31 - SCROLL_Y - i), 1, 1);
        }
      }
    }

    /* and the four compass marks that were always here, which now read
       as the little florets the print scatters between the medallion
       and its neighbours */
    c.fillStyle = P.pillowGoldDeep;
    c.fillRect(16, y + 8, 2, 1); c.fillRect(16, y + 23, 2, 1);
    c.fillRect(6, y + 15, 1, 2); c.fillRect(27, y + 15, 1, 2);
  }

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
        /* the ikat damask off the photographs - see the medallion above */
        damask(c, y);
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

     ONE hand-drawn kernel per shape, turned by exact quarter turns.

     WHAT WAS HERE BEFORE was a 7px DISC with the shading walking round
     the inside of an outline that never moved, on the argument that a
     seven pixel ball cannot be rotated. That argument is right about
     ARBITRARY angles - anything that is not a multiple of 90 degrees
     resamples into mush on a nearest-neighbour layer - and wrong about
     what follows from it, because a QUARTER turn on an odd grid is not
     a resample at all: 9 is odd, so turning about (4.5, 4.5) maps every
     pixel centre exactly onto another pixel centre and the sprite comes
     back pixel for pixel.

     What that buys is the whole of the owner's note. A disc with a
     brown dot walking round the rim reads as a golf ball, and that is
     what was on screen. What says POPCORN at this size is a LUMPY
     OUTLINE with a cleft in it and the hull sitting down in the cleft -
     and an outline can only be lumpy if it is allowed to turn with the
     kernel instead of standing still while the shading slides past it.

     The flicker the old comment feared was an outline changing every
     frame at 60Hz. This changes on the quarter turn: at spinRate 2.2 to
     4.6 rad/s that is 1.4 to 2.9 silhouette changes a second, which is
     the exact rate the SHADING already changed at. A lump turning a
     square corner twice a second reads as a tumble, which is what
     popcorn does when it bounces; a landed kernel spins at 0.4x and
     tumbles slower, as something that has stopped bouncing should.

     NOTHING THE PHYSICS DEPENDS ON MOVES: the 9x9 bake, the 1px ring
     underneath, the 3.5px collision radius, the x-4/y-4 blit and
     popFrame are all exactly as they were, so every number the hops
     were tuned against twice is untouched.

     The paint grids, one character to the pixel:
       W popWhite  the flesh      C popCream  a lobe turning away
       H popHi     the specular   S popShade  a crease
       .           outside the kernel
     The two HULL pixels are deliberately not in the grid - they are
     painted into the cleft AFTER the ring, so the ring dips into the
     concavity and the hull sits at the bottom of a dark V. That V is
     the single mark that says popcorn at seven pixels across. */
  var POP_GRID = [
    /* THE BUTTERFLY. Three single-pixel fingers along the top with the
       dark dipping between them, and that is the whole trick: a seven
       pixel shape wrapped in a one pixel ring reads as a BALL whatever
       is painted inside it, because the ring is most of what the eye
       gets at this size. The only way to break the ball is to make the
       RING go in and out, and one pixel notches round the perimeter do
       that where holes punched in the middle do not - holes read as
       eyes. Five rounds of candidates rendered at 14x to find it. */
    ['.W.W.W.',
     'WHWWWWW',
     'WWWWWWC',
     '.WWWWWC',
     'WWSWSWC',
     'WWS.SC.',
     '.W..C..'],
    /* THE MUSHROOM: two fingers instead of three, a flatter and wider
       cap, and the notch bitten out of the right side instead of the
       left, so the two kernels differ in SILHOUETTE and not merely in
       where the shading sits */
    ['..WW.W.',
     '.HWWWWW',
     'WWWWWWC',
     'WWWWWW.',
     'WWSWSWC',
     '.WS.SC.',
     '..W.C..']
  ];
  /* the cleft, and what goes in it: the pale pip above, the kernel's
     brown coat under it */
  var POP_HULL = [[3, 5, 'hullPale'], [3, 6, 'hull']];

  /* the cheddar clump still draws itself out of row spans - it is three
     kernels shouldering each other and already reads as a lump, so it
     keeps the shapes and the walking highlight it was tuned with */
  var POP_A = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [2, 3]];
  var POP_B = [[1, 4], [0, 6], [0, 7], [1, 6], [0, 7], [1, 5], [2, 4]];
  var LOBE = [[4, 4], [1, 4], [1, 1], [4, 1]];

  function bakePop(grid) {
    var t = makeCanvas(9, 9), c = t.ctx;
    var m = makeCanvas(9, 9);
    var ink = { W: P.popWhite, H: P.popHi, C: P.popCream, S: P.popShade };
    var r, k, ch;
    for (r = 0; r < grid.length; r++) {
      for (k = 0; k < grid[r].length; k++) {
        ch = grid[r].charAt(k);
        if (ch === '.') continue;
        c.fillStyle = ink[ch];
        c.fillRect(1 + k, 1 + r, 1, 1);
        m.ctx.fillStyle = '#ffffff';
        m.ctx.fillRect(1 + k, 1 + r, 1, 1);
      }
    }
    /* the ring goes UNDER the kernel, which is what makes it follow
       every concavity the grid has - including the cleft */
    c.globalCompositeOperation = 'destination-over';
    c.drawImage(LivingRoom.ringOf(m, 9, 9).canvas, 0, 0);
    c.globalCompositeOperation = 'source-over';
    for (r = 0; r < POP_HULL.length; r++) {
      c.fillStyle = P[POP_HULL[r][2]];
      c.fillRect(1 + POP_HULL[r][0], 1 + POP_HULL[r][1], 1, 1);
    }
    return t;
  }

  function bakePopSet() {
    var out = [], s, f, set, t, c;
    for (s = 0; s < POP_GRID.length; s++) {
      set = [bakePop(POP_GRID[s])];
      for (f = 1; f < 4; f++) {
        t = makeCanvas(9, 9); c = t.ctx;
        /* (4.5, 4.5) is the middle of a nine pixel sheet. Turn a square
           corner about it and every pixel lands on a pixel: no
           smoothing is asked for and none is needed. */
        c.translate(4.5, 4.5);
        c.rotate(f * Math.PI / 2);
        c.translate(-4.5, -4.5);
        c.drawImage(set[0].canvas, 0, 0);
        set.push(t);
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

  /* ------------------------------------------------------ the coasters

     The spare life, off the coffee table and standing on its edge in
     the nap. Two kinds, off Coaster ref 1 and 2, and makeBoon deals them
     out turn and turn about.

     A 19px disc rather than the 15 it would be to scale, because a
     coaster has to be grabbable from a flight path that is already
     fourteen pixels above a floor that kills. At 19 its box top sits at
     FLOOR-18 and the grab band is a doodad centred between FLOOR-31 and
     FLOOR-11 - a dive, but a dive with room in it. Both kinds keep the
     same radius and the same 21x21 canvas, so the engine's box, the
     dent in the nap and drawBoon's offsets are one set of numbers. */
  var COAST_R = 9.5;

  /* THE MAP COASTER'S OUTLINE is not a circle. The photograph's are cut
     to the edge of a map - a lake shore, a county line - so each is a
     disc with a bite out of one side and a point left where the bite
     ends. Two bites: a big round one out of the upper left, a nick out
     of the lower right. ringOf handles the notches; it is why it exists. */
  var MAP_BITES = [[-2.30, 10.6, 3.4], [0.95, 10.8, 2.1]];   /* [angle, dist, radius] */

  /* The yarn coaster's rim is soft and a little irregular - a wound cord
     never finishes on a perfect circle - so its radius wanders by about
     half a pixel round the edge. */
  function yarnR(a) { return 9.35 + 0.45 * Math.sin(3 * a + 1.0) + 0.25 * Math.sin(7 * a); }

  function inMap(dx, dy, d) {
    if (d > COAST_R) return false;
    for (var b = 0; b < MAP_BITES.length; b++) {
      var bx = Math.cos(MAP_BITES[b][0]) * MAP_BITES[b][1];
      var by = Math.sin(MAP_BITES[b][0]) * MAP_BITES[b][1];
      if (Math.sqrt((dx - bx) * (dx - bx) + (dy - by) * (dy - by)) < MAP_BITES[b][2]) return false;
    }
    return true;
  }

  function bakeCoaster(yarn) {
    var S = 21, t = makeCanvas(S, S), c = t.ctx;
    var cx = 10, cy = 10, px, py, dx, dy, d, a, col, inside;
    var m = makeCanvas(S, S);
    m.ctx.fillStyle = '#ffffff';

    for (py = 0; py < S; py++) {
      for (px = 0; px < S; px++) {
        dx = px - cx; dy = py - cy;
        d = Math.sqrt(dx * dx + dy * dy);
        a = Math.atan2(dy, dx);
        inside = yarn ? d <= yarnR(a) : inMap(dx, dy, d);
        if (!inside) continue;
        m.ctx.fillRect(px, py, 1, 1);
        if (yarn) {
          /* ONE CORD, WOUND. k is which turn of the spiral this pixel is
             on - an Archimedean spiral at a 3px pitch, two of cord and
             one of the groove between turns, which is three turns on a
             19px disc and the coarsest pitch that still reads as a coil
             - and `along` is how far along the cord it is. The cord is
             TWISTED from pink and pale blue, so its colour alternates
             every 4.5px of its length: d * along is arc length, and the
             stripes come out as a barber pole that gets finer toward the
             rim, which is what a twisted cord wound flat does. At a 2px
             pitch with 2.6px stripes it was pink-and-blue noise; the
             coil has to be the thing you see first, and the twist the
             thing you see second. The first three tenths of every turn
             are the groove, a shade deeper in whichever colour it is. */
          var turn = (d + a / TAU * 3 + 0.5) / 3;
          var k = Math.floor(turn), along = a + k * TAU;
          var pink = Math.floor((d * along) / 4.5 + k) % 2 === 0;
          var groove = turn - k < 0.30;
          if (d < 1.3) col = P.yarnPale;
          else if (groove) col = pink ? P.yarnPinkDeep : P.yarnBlueDeep;
          else col = pink ? P.yarnPink : P.yarnBlue;
          /* the rim falls away from the lamp on its lower right */
          if (d > yarnR(a) - 1.1 && dy + dx > 2) col = pink ? P.yarnPinkDeep : P.yarnBlueDeep;
        } else {
          /* PALE BIRCH WITH A MAP BURNT INTO IT. The contours are rings
             round a point a little off the coaster's own centre, each one
             wobbled by a sine of the angle so they are a hill's lines and
             not a target's, and they are DENSE IN THE MIDDLE: the gaps
             between them open out from 1.4px to 2px toward the rim. The
             innermost two are burnt deeper, the way a laser dwells where
             the lines crowd. Round the bottom of the rim, a dotted arc of
             single pixels is the engraved maker's name - at this size
             text is a texture, and a dotted arc is what six-point type
             looks like from a metre away. */
          var mx = dx - 1.4, my = (dy + 0.9) * 1.12;
          var mc = Math.sqrt(mx * mx + my * my) + 0.55 * Math.sin(3 * Math.atan2(my, mx) + 0.7);
          var RINGS = [1.3, 2.7, 4.3, 6.1, 8.1];
          col = P.birch;
          if (d > 7.4 && dy + dx > 3) col = P.birchShade;
          for (var ri = 0; ri < RINGS.length; ri++) {
            if (Math.abs(mc - RINGS[ri]) < 0.42) col = ri < 2 ? P.burnDeep : P.burn;
          }
          if (mc < 0.8) col = P.burnDeep;
          if (d > 7.9 && d < 9.0 && a > 0.55 && a < 2.6 && ((px + py) & 1)) col = P.burnDeep;
        }
        c.fillStyle = col;
        c.fillRect(px, py, 1, 1);
      }
    }

    /* the ring goes underneath, for the same reason the kernel's does -
       and it is a smear of the mask, so the bites keep their shape */
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
    /* the room first, and it guards itself - five bays in one room is
       five calls at boot and the oak only needs cutting once */
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

    T.coaster = [bakeCoaster(false), bakeCoaster(true)];   /* [map, yarn] */
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
     because drawLight is the room's and five bays that shaded their own
     corners would read as five different houses.

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

  /* THE ONLY THING THIS MODULE PAINTS FOR KOA: the patch of cushion he is
     standing over. It is drawDropSpot's grammar on a bigger thing, and
     for drawDropSpot's reason - in this bay how far UP a thing is and how
     far down the screen it is are two different questions, and what the
     player needs off the floor is how soon it comes down. Small and dark
     when he is about to land, wide and faint at the top of his hop. There
     is no second, fainter term for height above the hop the way a kernel
     has one: a kernel can be flicked up a cap and halfway to the
     moulding, and his apex is his ceiling.

     14..22 wide against a kernel's 5..11, because he is four times a
     kernel's width and a spot narrower than the thing casting it reads as
     a different, smaller object on the floor.

     NO GLOW, NO SPARKS, NOTHING THAT PULSES, and that is a decision and
     not an omission. The gifts get all three because a gift has to be
     noticed from across the room, and the trouble with him is the
     opposite one: the first instinct of a player who sees something new
     bouncing in the kill zone is to AVOID it, and a glowing thing in the
     popcorn reads as the hot cheddar, which is a hazard that happens to
     help. What tells the player he is not a hazard is that he has a FACE,
     which the engine draws on the sprite layer, and that the card they
     unlocked him from has already said somebody is bouncing in the
     popcorn and to get him out. The shadow is here for one job only: so
     his height is readable off the floor, the same way every kernel's is,
     because that is what a player needs to time the dive.

     AND IT IS A TINT. He moves, and the 4x4 Bayer is anchored in user
     space, so a dithered patch under a hopping animal re-phases every
     frame and the pixels boil. There is still no call to Dither.rect
     anywhere in this file. */
  function drawMeetSpot(ctx, ob) {
    var high = -ob.dy;                            /* 0 on the cushion    */
    var near = clamp(high / ob.hop, 0, 1);        /* 1 at the top of a hop */
    var w = 14 + Math.round(8 * near);
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3,
              P.seatDeep, 14 - Math.round(8 * near));
  }

  function drawBoon(ctx, ob) {
    /* KOA IS NOT DRAWN HERE, and it is worth saying where he is drawn
       instead. This canvas is the room layer: nearest-neighbour by
       contract, so that the pillows and the popcorn stay pixel art, and a
       377px koala resampled onto it at 27px would be mush. The sprite
       goes on the smooth layer, drawn by PlayScene with Doodads.draw at
       the grab point this module publishes, which is how every other
       screen in the game draws a doodad and how this one already draws
       Saddam. What is left for the room layer is his shadow, and he gets
       it only while he is still in play. */
    if (ob.meet) {
      if (!ob.met) drawMeetSpot(ctx, ob);
      return;
    }
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

    ctx.drawImage(T.coaster[ob.kind === 'yarn' ? 1 : 0].canvas, x - 10, y - 10);

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

    /* 3. THE SOFA, and it gets the rest of the card: the cushion panels
       the level bakes, reduced to the marks that survive at sixty pixels
       - a curved crest with a hard edge over it, a lit cap under that, a
       flat body, a shaded skirt, a valley at every seam, and FOUR BUTTONS
       in a wide rectangle, which is the one of those marks that says
       "this sofa" rather than "some sofa".

       It is drawn in the same five tones and the same bands as bakeCouch,
       and that is not a nicety. This file has advertised the wrong
       rendering on this card once already: bakeCouch stopped drawing a
       straight rule across the top of the fabric and the cover went on
       drawing one, so the card promised a level that no longer existed.
       The cushions have just been redrawn in flat bands with hard edges,
       so the cover is redrawn with them. */
    var band = seatY - backY - 2;
    var top = backY + 2;
    var PW = Math.max(14, Math.round(band * 1.17));

    /* The crest, as the level bakes it and NOT as a rule: CREST_DIP 11
       over a 160px panel is the level's figure, so a cover panel PW wide
       dips PW * 11/160, and the exponent stays 1.6 because a quadratic
       arch is flat at its own apex and a flat apex is the straight rule
       coming back under another name. */
    var cDip = Math.max(1, Math.round(PW * 11 / 160));

    /* EVERY TERM THAT DEPENDS ONLY ON THE COLUMN, COMPUTED ONCE. A cover
       is repainted every frame it is on screen and the carousel paints
       every visible card; this function had already gone from 0.188ms a
       call to 0.447ms once by leaving row-invariant arithmetic inside the
       pixel loop, and the fix was to hoist it. Same discipline, one loop
       further out: the crest's Math.pow and the cap's Math.cos are paid
       w times a call instead of w * band times.
         pRy    the first fabric row of this column - the crest
         pCap   how many rows of lit cap hang under the arris: the level's
                16 rows of 141 at a panel's apex, 9 at its seams
         pSkirtD / pShadeD / pLitD  the level's vv 131, 20 and 44, scaled
         pQx    how far outside the corner radius this column is
         pFlank 1 on the lit left strip, 2 on the shaded right one */
    var pRy = [], pCap = [], pSkirtD = [], pShadeD = [], pLitD = [], pQx = [], pFlank = [];
    var CR = 0.26;                           /* corner radius, in half-panels */
    var pShadeW = Math.max(1, Math.round(PW * 5 / 160));
    var pLitW = Math.max(1, Math.round(PW * 4 / 160));
    var ci, pu, cu2, au, kc, ph2;
    for (ci = 0; ci < w; ci++) {
      pu = ci % PW;
      cu2 = ((pu + 0.5) / PW - 0.5) * 2;
      au = cu2 < 0 ? -cu2 : cu2;
      pRy[ci] = top + Math.round(cDip * Math.pow(au, 1.6));
      ph2 = Math.max(1, seatY - pRy[ci]);
      kc = Math.cos(Math.PI * cu2 / 2);
      pCap[ci] = Math.max(1, Math.round(ph2 * (9 + 7 * kc * kc) / 141));
      pSkirtD[ci] = Math.round(ph2 * (1 - 10 / 141));
      pShadeD[ci] = Math.round(ph2 * 20 / 141);
      pLitD[ci] = Math.round(ph2 * 44 / 141);
      pQx[ci] = au - (1 - CR);
      pFlank[ci] = (pu > 0 && pu <= pLitW) ? 1 : (pu >= PW - pShadeW ? 2 : 0);
    }

    /* and the bands themselves, laid as RUNS and not as pixels: at this
       size a row of the sofa is five or six flat runs, which is the whole
       claim the level's own tile now makes. The order of the tests is
       bakeCouch's order - dark, arris, skirt, right flank, cap, left
       flank, body - because that order is what keeps the cap's curved
       edge the only curved edge on the panel. */
    var n, col, runCol, runFrom, d2, ay2, uy2, qy3, qy3sq;
    for (n = -2; n < band; n++) {
      ay2 = (n + 0.5) / band * 2 - 1;
      uy2 = ay2 < 0 ? -ay2 : ay2;
      if (uy2 > 0.98) uy2 = 0.98;
      qy3 = uy2 - (1 - CR);
      qy3sq = qy3 * qy3;
      runCol = null; runFrom = 0;
      for (ci = 0; ci <= w; ci++) {
        col = null;
        if (ci < w) {
          d2 = top + n - pRy[ci];
          if (d2 === -1 || d2 === -2) col = P.outline;
          else if (d2 < 0) col = (n >= 0) ? P.button : null;   /* the V above the crest */
          else if ((ci % PW) === 0 ||
                   (pQx[ci] > 0 && qy3 > 0 && pQx[ci] * pQx[ci] + qy3sq > CR * CR)) col = P.button;
          else if (d2 === 0) col = P.crest;
          else if (d2 >= pSkirtD[ci]) col = P.backCrease;
          else if (pFlank[ci] === 2 && d2 >= pShadeD[ci]) col = P.backCrease;
          else if (d2 < pCap[ci]) col = P.backLit;
          else if (pFlank[ci] === 1 && d2 < pLitD[ci]) col = P.backLit;
          else col = P.backMid;
        }
        if (col === runCol) continue;
        if (runCol) { ctx.fillStyle = runCol; ctx.fillRect(x + runFrom, top + n, ci - runFrom, 1); }
        runCol = col; runFrom = ci;
      }
    }

    /* AND THE NAP OVER THEM, because the level's fabric has one and a
       cover that advertises bare flat bands advertises the slab this
       round was called in to fix. At 160 pixels a panel a tick is 1 wide
       and two to four tall; at the thirty or sixty a cover gets it is one
       pixel, which is the same mark as far down as it goes.

       It is laid ONLY on the flat body - the middle three fifths of a
       panel, between the cap and the skirt - which is where all but a
       tenth of the level's ticks land anyway, and which is cheap: it
       needs none of the band chain above repeated, so this costs w*band/22
       hash calls and nothing else. Seeded off the column and row, never
       off `t`, so the speckle is nailed to the card and does not crawl
       while the carousel animates. */
    var nn, nh2, nx3, ny3, nd2;
    for (nn = 0; nn < (w * band) / 22; nn++) {
      nh2 = hash(5101 + nn * 7919 + w * 31 + band * 7);
      nx3 = nh2 % w;
      ny3 = (nh2 >>> 9) % band;
      pu = nx3 % PW;
      if (pu < PW * 0.2 || pu > PW * 0.8) continue;
      nd2 = top + ny3 - pRy[nx3];        /* rows below this column's crest */
      if (nd2 < pCap[nx3] || nd2 >= pSkirtD[nx3]) continue;
      ctx.fillStyle = ((nh2 >>> 20) & 1) ? P.backLit : P.backCrease;
      ctx.fillRect(x + nx3, top + ny3, 1, 1);
    }

    /* the four buttons on every panel, and a button is a dark pixel with
       a shade pixel over it and NOTHING UNDER IT. The lit lower lip that
       used to sit there went with the ramp: in Couch ref 2 and ref 4 a
       button is a soft dark dimple with no highlight at all, and the
       level stamps an eyebrow above and a shadow row below. At one pixel
       a button that is all the eyebrow there is room for.

       0.62 and not 0.64 on the lower row: the level moved its own lower
       buttons from tile row 92 to 88 of 141 to get them clear of the
       cushions propped in front of them, and 88/141 is 0.62. */
    var bx, byy, px0;
    for (k = 0; k * PW < w; k++) {
      px0 = x + k * PW;
      for (n = 0; n < 2; n++) {
        byy = top + Math.round(band * (n ? 0.62 : 0.36));
        for (i = 0; i < 2; i++) {
          bx = px0 + Math.round(PW * (i ? 0.68 : 0.32));
          if (bx >= x + w - 1) continue;
          ctx.fillStyle = P.backCrease; ctx.fillRect(bx, byy - 1, 1, 1);
          ctx.fillStyle = P.button;     ctx.fillRect(bx, byy, 1, 1);
        }
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
    var hotY = lidY + Math.round(wrap(s * 1.5, seatY - lidY - 6));
    kernelet(ctx, x + Math.round(w * 0.78), hotY, true);

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

  /* 5 DAMASK, 3 tufted, 2 knit, and the five and the three have just
     swapped. All three are cream, so the mix no longer decides whether
     the level is readable, only how varied it looks - it used to, when
     five in ten were the grey microfibre one and those five were the
     ones a player could not see. What decides the weights now is the
     photograph: three of the four throw pillows in Couch ref 1, 2 and 4
     carry the ikat medallion and exactly one is the plain stitched one,
     so the print the owner asked to see is the one they should see
     most. The tufted variant stays in the mix because the thing it is
     drawn from is in every shot too - it is just the SOFA BACK rather
     than a pillow. */
  function makePillar(x, gapY, gapH, run) {
    var v = Math.random();
    return { type: 'pillar', x: x, w: 34,
             gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: v < 0.5 ? 1 : (v < 0.8 ? 0 : 2),
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
    /* turn and turn about - see nextYarn. The engine reads ob.name for
       the caption and ob.burst for the particles, so the two kinds differ
       in both: a map coaster bursts birch and burnt brown, a yarn one
       pink and blue, and both carry the two jades every spare life in
       the game bursts with. */
    var yarn = nextYarn;
    nextYarn = !yarn;
    return { type: 'boon', x: x, y: FLOOR - 9, w: 18, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0,
             kind: yarn ? 'yarn' : 'map',
             name: yarn ? YARN_NAME : MAP_NAME,
             burst: yarn ? [P.yarnPink, P.yarnBlue, P.yarnPale, P.lifePale, P.lifeJade]
                         : [P.birch, P.burn, P.burnDeep, P.lifePale, P.lifeJade] };
  }

  /* --------------------------------------------------------- makeMeet

     KOA, put down in the middle of one gap's cushion. An OPTIONAL maker,
     like makeBoon: the engine calls it only if the level publishes one,
     and a level that does not gets the plank hider the Garden has always
     had, which is why nothing about Saddam changes for any of this.

     The engine sets ob.meet to whoever is hiding AFTER this returns, the
     way it sets plank.meet and ob.gold, so nothing in here knows or cares
     which doodad it is building a hiding place for. Everything below is
     true of any 13px animal standing in popcorn.                      */
  function makeMeet(x, run) {
    return {
      type: 'boon', x: x,

      /* FLOOR-14 is where a 13px doodad STANDS, and it is arithmetic
         rather than taste. Doodads.draw scales the sprite by r / bodyR,
         so at MEET_BODY 13 his art comes out about 27px tall, and his
         footOffset of 1.07 puts his feet 13.9px below the pivot the
         engine draws him on - which lands them on the cushion to within
         a tenth of a pixel. MEET_BODY is deliberately not scaled by
         anybody's `size` (its own comment in js/scene_play.js demands
         that), so this is a constant and not a function of who is in
         the popcorn tonight. */
      y: FLOOR - 14,

      /* collide() and the cull both test ob.x..ob.x+w, so w is his body
         and not a guess: 26 for a 27px sprite. And because the ART moves
         ob.x itself - the way a kernel's does - instead of carrying him
         in ob.dx the way the coaster's bob does, both of those tests
         stay honest for free. ob.dx exists and stays 0 so the engine's
         grabX() can read it without caring which kind of boon it holds. */
      w: 26, taken: false,
      dx: 0, dy: 0,

      /* ob.dy is his HOP, measured up from the cushion, which is what
         makes one grab point do for everything: the engine's grab point
         for a boon is boonY(ob) + ob.dy, so his box, the burst when he
         is caught and the sprite on the smooth layer all rise and fall
         with him off one number. ob.drift is the same integral in the
         world's frame and is what KOA_DRIFT bounds - it cannot be read
         back off ob.x, because the room is scrolling ob.x left at 112 to
         174px/s underneath him. */
      drift: 0, vx: 0, vy: 0,

      /* his own apex, in the same field a kernel keeps its apex in, so
         stepBoon's re-launch and stepDrop's are the same algebra */
      hop: KOA_HOP, squash: 1,

      /* THE ART'S STATEMENT THAT HE CAN BE SPOOKED. The engine's rule is
         generic - a hider that says it is shy is sent away when the
         player takes a plain hazard while it is on the screen - and the
         Garden's plank never says it, so the one doodad already shipped
         behind a cushion in the Backyard is untouched by the whole of
         this. Saying it here is also honest about whose rule it is: the
         popcorn is this bay's hazard, so being frightened OF the popcorn
         is this bay's idea. */
      shy: true,

      /* Nothing of his reads this. It is published because the boon
         contract names it and drawBoon's other branch bobs on it, the
         same reason makeSpikes publishes an empty `spikes` array: a
         level's objects answer the same questions whether or not this
         particular one has an interesting answer. */
      phase: rand(0, TAU)
    };
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
      } else if (p.type === 'boon' && p.meet && !p.met) {
        /* KOA, standing in the popcorn. 20 is KOA_PAIR_D rounded up, so
           the gate is never the thing that misses. The coasters fall
           straight through this test because only a hider carries
           ob.meet, and a hider already caught or already spooked carries
           ob.met and is out of play - the engine has stopped testing and
           drawing him by then and the art stops moving him. */
        if (ob.x < p.x - 20 || ob.x > p.x + 20) continue;
        hitMeet(ob, p);
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

  /* A kernel against KOA, and this is the contact that sells him: a
     thing the popcorn bounces off is a thing that is IN the popcorn.

     ONE-SIDED, LIKE hitKernel, AND FOR A STRONGER REASON. The art is
     forbidden from writing to another obstacle on a drop's call, and
     here that prohibition happens to be exactly what the design wants:
     he keeps his own rhythm no matter how much popcorn arrives, because
     nothing in this function can touch him. The kernels click off him;
     he goes on hopping at 1.26s like the metronome the player is timing.

     HE IS TREATED AS A WALL, not as a body. His own velocity is not in
     the closing speed, which is wrong by up to 95px/s at the bottom of
     a hop - and right anyway, because putting it in would make a rising
     koala serve kernels at the ceiling at 1.85 times that, and a hider
     who launches popcorn into the gap above him is a hazard with extra
     steps. Being a wall is also why the push-out is the WHOLE overlap
     where hitKernel takes half of it: the other kernel will do its own
     half on its own call, and he never will.

     1.85 is (1 + e) at the e = 0.85 hitKernel already uses - the whole
     impulse rather than the half an equal-mass pair takes, which is what
     an immovable body deals out. And there is no cap on the kernel's vy
     here on purpose: one knocked above its own apex is re-launched to
     that apex on its next landing anyway, so the fixed-period rule heals
     itself inside one hop, and stepDrop's moulding clamp catches the
     extreme at the top of the room. */
  function hitMeet(ob, p) {
    var dx = ob.x - p.x, dy = ob.y - (p.y + p.dy);
    var d2 = dx * dx + dy * dy;
    if (d2 >= KOA_PAIR_D * KOA_PAIR_D || d2 < 0.0001) return;
    var d = Math.sqrt(d2), nx = dx / d, ny = dy / d;
    ob.x += nx * (KOA_PAIR_D - d);
    ob.y += ny * (KOA_PAIR_D - d);
    var rv = ob.vx * nx + ob.vy * ny;
    if (rv >= 0) return;                 /* already separating */
    ob.vx -= 1.85 * rv * nx;
    ob.vy -= 1.85 * rv * ny;
    ob.vx = clamp(ob.vx, -VX_MAX, VX_MAX);
    ob.bounced = true;
  }

  /* --------------------------------------------------------- stepBoon

     stepDrop's twin, and the same contract word for word: the engine has
     already scrolled this obstacle and hands it over with the whole list;
     move the one you were given, you may READ the list, never splice it
     and never write to anything else in it. Set ob.bounced and the engine
     throws two particles of cushion fluff and ticks 'bop' for you, rate
     limited, because no art module calls Audio3 - which means he shares
     the popcorn's own landing sound, and that is half of why he reads as
     part of the carpet. There is no return value: unlike a drop, a boon
     has nothing the engine could land it into.

     `obstacles` goes UNREAD here, deliberately. The only thing he
     interacts with is the popcorn coming off him, and that is resolved on
     the KERNEL's call, in stepDrop -> hitMeet, where it can be applied to
     the kernel alone. Doing it from this side would mean writing to
     another obstacle, which the contract forbids, and would also apply
     every impulse twice. The parameter stays because the contract names
     it and the next bay that wants it should not have to change the hook.
  */
  function stepBoon(ob, dt, obstacles) {
    /* The coasters do not move under their own power: drawBoon bobs them
       on ob.phase, and the engine's hunger writes their ob.dx/ob.dy when
       Gerald reels one in - which is also why he is kept out of that
       hunger, since those are the two fields the art owns for him. And a
       hider already caught or already spooked is out of the run: the
       engine has stopped testing and drawing him, so there is nothing
       left in here to animate. */
    if (!ob.meet || ob.met) return;

    /* HIS BOUNCE IS THE KERNELS' BOUNCE - their gravity, their +-15%,
       their re-launch instead of a restitution. What differs is the four
       constants at the top of the file and nothing else.

       ob.dy is his height above the cushion, so 0 is standing and
       negative is airborne, and ob.y itself never moves. He is MADE at
       rest, which means the first frame's gravity carries ob.dy over 0
       and trips the landing branch below: he launches on the frame he is
       admitted and is never once seen holding still. That matters for
       exactly the reason no kernel in this bay ever comes to rest - a
       thing standing still down here reads as scenery, and the worst
       outcome for a hider is not being avoided, it is being walked
       past. */
    ob.vy += DROP_GRAV * dt;
    ob.dy += ob.vy * dt;
    ob.x += ob.vx * dt;
    ob.drift += ob.vx * dt;

    /* THE PATCH. He turns round at KOA_DRIFT either side of where he was
       put - see the constants for why 20 is the number that needs no
       pillar maths. Pulling ob.drift back onto the wall is what makes
       this test fire once instead of every frame afterwards: the next
       frame can only cross it again if the kick he has just taken is
       still pointed outwards, and then reversing is the right answer
       again. */
    if (ob.drift > KOA_DRIFT || ob.drift < -KOA_DRIFT) {
      ob.vx = -ob.vx;
      ob.drift = clamp(ob.drift, -KOA_DRIFT, KOA_DRIFT);
    }

    /* THE CUSHION, and it is stepDrop's landing with three things
       changed. Re-launched to his own apex rather than damped, so the
       period the player timed off one look is the period he keeps.
       Kicked sideways on every landing, because that wander is the
       popcorn's tell and it is the thing he picked up off them - it is
       what his ability is named for. And squashed, because 27 pixels of
       animal hitting a cushion that every kernel in the room is drumming
       on ought to give.

       He needs neither of stepDrop's two hard limits. The moulding is
       nowhere near a 30px hop, and nothing in the bay can put him above
       his own apex, because the one impulse that could is applied to the
       kernel and never to him. */
    if (ob.dy >= 0) {
      ob.dy = 0;
      ob.vy = -Math.sqrt(2 * DROP_GRAV * ob.hop * rand(1 - HOP_VARY, 1 + HOP_VARY));
      ob.vx = clamp(ob.vx * 0.75 + rand(-KOA_KICK, KOA_KICK), -KOA_VX_MAX, KOA_VX_MAX);
      ob.squash = 0.78;
      /* the engine's fluff comes out at ob.y + 3, which for him is his
         middle rather than his feet - two grains of cushion grain nobody
         will measure, and moving it would mean special-casing a helper a
         dozen kernels a second share */
      ob.bounced = true;
    }

    /* and the squash eases back out over about a tenth of a second.
       ob.squash is a field the ENGINE reads, the way it reads ob.landed
       and ob.name: it hands Doodads.draw { squashX: 1 / squash, squashY:
       squash }, so the art decides how he deforms and the sprite layer
       does the drawing. Math.min(1, dt * 12) rather than dt * 12 because
       one long frame - the first after a tab comes back - would otherwise
       carry the term past 1 and stretch him instead of settling him. */
    ob.squash += (1 - ob.squash) * Math.min(1, dt * 12);
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
      if (ob.meet) {
        /* KOA, and his is the one box in this bay that is BIGGER than the
           thing inside it: 28 against his 26 of body, a pixel of slack on
           each side, the same pixel both gifts get. Dodging is meant to be
           fair and catching is meant to be easy, and he is caught, not
           dodged - the player is already paying for him by flying low
           enough to be in the popcorn, and charging them a second time
           for a pixel of aim would be charging twice for one dive.

           It travels with his hop, because ob.y + ob.dy is where the
           engine draws him and a box left down on the cushion would mean
           collecting him by touching the air a bouncing koala has just
           left. Once he is caught or spooked he has no box at all: he is
           out of the run and the engine simply scrolls him off the left
           with everything else. */
        if (!ob.met) out.push([ob.x - 14, ob.y + ob.dy - 14, 28, 28]);
      } else if (!ob.taken) {
        /* the disc is what you collect, so the box travels with it and
           the dent it was standing in has none */
        out.push([ob.x + ob.dx - 9, FLOOR - 18 + ob.dy, 18, 18]);
      }
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    CEIL_KILLS: CEIL_KILLS,
    BOON_NAMES: [MAP_NAME, YARN_NAME],
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    drawPreview: drawPreview,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop,
    makeLitter: makeLitter, makeBoon: makeBoon,
    /* The two optional hooks, and optional is the whole point of them:
       the engine calls makeMeet only if the level has one and falls back
       to hiding the doodad behind a plank if it does not, and it calls
       stepBoon only if the level has one and otherwise leaves a boon
       sitting where it was put. So the Garden, the Canopy and every other
       level that sheds a spare life is untouched by either. */
    makeMeet: makeMeet, stepBoon: stepBoon,
    stepDrop: stepDrop,
    rectsFor: rectsFor
  };
})();
