/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE FORT

   The fifth bay and the last one in the room. Somebody has built a box
   fort, and it has swallowed the Living Room whole: every surface the
   player flies past is a corrugated kraft panel joined to the next one
   by black foam biscuits, and the furniture of the four bays before it -
   the Desk with its monitor and its shelves, the shutters over the grey
   sectional and the coffee table, the television on the stone chimney
   breast over the black mantel, the whiteboard on its frame - is seen
   OVER THE ROOFLINE of the fort and THROUGH its portholes and doorways,
   dim, behind the cardboard, every piece of it standing on the room's
   floor. Drawn from Fort ref 1-7 in Assets/Concept (ref 3 is a .PNG):
   ref 2 and ref 5 for the wide fort, ref 1 and ref 4 for the panel
   close-ups and the sofa behind them, ref 6 for the projector, the
   yellow gable, the seam light and the blue strip, and ref 3 and ref 7
   for the box of panels, the geometric rug, the red cups on the sofa,
   the toy blaster and the walnut table; and the spare life from the Ammo
   Bag ref.

   Round 2: the room beyond the fort stands on its own floor at y 194;
   the far doorway is open; the floor is the geometric rug on oak; the
   spare life is THE AMMO BAG. The ladder, the bunk, the sleeping bag,
   the shag rug, the foam block, the tripods and the ribbons are gone,
   each on the owner's note, and the biscuit is matte.

   THE FORT IS A FORT IN A ROOM AND NOT A WALL. In ref 2 and ref 5 the
   lit shutters rise over the roof edge: the fort stands about two thirds
   of the room's height and the room goes on above it. So the bay is FOUR layers deep where every
   other bay in the house is two or three - the room at 0.12, the fort's
   far wall at 0.30, its near wall at 0.55 and the planks at 1.0 - and
   the two walls are not a band across the screen, they are a SKYLINE:
   every panel has its own roof height, from y 70 at the gable tower down
   to 190 at the low panel round the green chamber, and the rows from
   24 to 96 are left open on purpose so that the top half of every piece
   of furniture in the room is seen over them. The room tile is 960
   wide and passes the four earlier bays IN THE ORDER THEY WERE EARNED -
   the Desk, the Couch, the Mantle, the Whiteboard - so a long run flies
   past the whole Living Room the way the player unlocked it, and the
   floor strip under the fort runs the grey geometric rug and the room's
   own oak. "Sprawling throughout the entire Living Room" is drawn, not
   asserted.

   WHAT A PANEL IS, counted off the photographs, because the first draft
   of this plan guessed and guessed wrong. Each panel edge in ref 1, 2, 5
   and 6 is a run of HALF-ROUND BITES alternating with flat tabs - not
   square notches - and on a top edge those bites ARE the scalloped
   skyline of every wide shot. There are TWO sizes of hole: rows of small
   round ones, and one or two big PORTHOLES per panel, usually near a
   seam. The black foam connectors come in THREE looks, not one: edge on
   across a vertical seam they are a short black DASH, standing proud of
   a roof edge they are a half-disc BUMP silhouetted against the room,
   and only where a corner faces the camera do they show their round
   FACE with the slot in it. The printed panels carry an all-over doodle
   of cartoon creatures, stars, candy canes and bones in a brown line a
   little darker than the kraft, a few BIG loose creatures over it, and
   an oval badge. The badge in the photographs is the product's logo; in
   here it is an oval with an illegible red scribble in it and nothing
   else, and there are no letters anywhere in this file's art. Ref 6
   shows a panel number, "16", near an edge; panels here carry two
   digits and only digits. paintPanel is the one painter for all of it,
   and the pillars, the far wall and the near wall are all painted with
   it, so a panel is the same panel everywhere it appears.

   THE RULE OF THIS LEVEL: THE PALE MASS IS CARDBOARD AND CARDBOARD IS
   SOLID. The pillars are the one LIT surface in a dim room - the
   Mantle's plan, hazard = the pale mass - and they are the only thing
   in the bay painted in `kraftPlank`, a WARM kraft at 178. Everything
   behind them is held down AND TURNED COOL: the room beyond the fort is
   clamped to luminance 96 at bake time (bakeRoom ends with a pass that
   enforces it), the far wall is kraft in shadow sunk 20% toward the
   strip's slate, and the near wall - the one big surface right behind
   the planks - is THE INSIDE OF THE FORT, a cool grey-brown lit by the
   blue strip, washed toward the void so its foot sits far under the
   plank face. Value alone was not enough: an orange-brown plank on an
   orange-brown wall, wearing the wall's own grammar, read as "another
   panel, nearer". The Couch's cream on grey is the standard - warm on
   cool - and the Couch learned the value half the hard way at 110
   against 121; this bay starts from both.

   THE LIGHT IS WHAT THE CHILDREN BROUGHT IN. The pendants are off. There
   is a GREEN LED pool inside one chamber (ref 2, 5, 6: a panel glowing
   green from inside and green light spilling out under the wall onto the
   floor), a BLUE LED strip along the ceiling line (ref 2, 5, 6: the
   violet-blue band at the top of every wide shot), the projector's lens
   throwing a picture on a far panel (ref 6), and white light leaking
   through holes and seams on the far wall (ref 2, 5). Four of those move,
   and all four are keyed to scroll, never to a timer, so a paused fort
   is a still fort:
     - the green chamber BREATHES, a soft baked pool whose alpha rides a
       sine with a 314 world-pixel period - a breath, never a strobe, and
       never a boolean: a soft sprite moving with the surface it lies on
       has no edge inside anything that moves relative to it;
     - the projector's picture changes as the far wall passes (four
       frames of a moon drifting over a starfield), the Desk's screenPage
       precedent;
     - the tablet lying on a roof edge ticks between three tints every
       160 world pixels;
     - one bright band walks the LED strip, the Mantle's walking band.

   THE SEPARATIONS, because a bay full of brown cardboard and black
   biscuits has to keep its four hazards unmistakable over busy scenery.

     VALUE  the plank face is 178 and nothing behind it is lit like it.
            The room is clamped to 96; the far wall is washed to about 83
            and under; the near wall's face is 68 before the bay's own
            wash and the room's light sheet take it down again, and the
            band a player flies through is about 50 (MEASURED, below).
            The wall badges are 93, under the 96 like everything else
            behind a plank, and the planks carry none.
     HUE    the Cupmen and their pellets are SATURATED - red, green,
            silver, gold on the smooth layer; yellow, red, green, silver
            discs and a spinning gold coin on the pixel layer - and
            nothing in the scenery is saturated except the two LED
            colours, which are never disc shaped. A lit porthole pours a
            vertical SMEAR, a small lit hole shows one dim pixel, seam
            light is diamonds and beads, and white dots
            appear only on the far wall, three pixels at most, with no
            halo. So a green disc is always a sour and a bright yellow
            disc that MOVES is always a pellet - the one still heap of
            them is the ammo bag's, inside a cream tote with navy
            handles under the spare life's jade glow; the yellow gable never sits below
            y 150, out of the floor shooters' band; and nothing else in the
            bay is purple, which is why the sour wears a purple ring.
     SHAPE  THE FALLING BISCUIT IS THE ONLY FACE-ON BLACK DISC THAT MOVES.
            The connectors in the walls are dashes and bumps, and the two
            face-on ones at the lit panel's corners are pinned to it; on
            the far wall the connectors are not even black. The biscuit
            tumbles through twelve silhouettes, and its hitbox follows
            them, the magnet's scheme.
     SHADOW a falling biscuit throws a hard 2px offset block; nothing in
            the walls does. A pillar throws a soft 6px cast shadow to its
            right, because cardboard stands off the wall (the Couch's
            reason).
     DEPTH  the King is the one actor drawn bigger than a plank, on the
            smooth layer that lies over the pixel one, so the planks are
            drawn AGAIN over him (occludeKing): a giant stands behind the
            cardboard, never through it.


   THE SIGNATURE is a Cupman turning to face you, raising a toy gun, and
   the three aim dots that run out of the muzzle before the pellet does.
   None of that is in this file: the Cupmen, their guns, their pellets
   and the King live in js/cupmen.js, which owns section B of the plan and
   draws on the smooth layer the doodads are drawn on, because the
   owner's paintings of them are in the doodads' style. This module is
   the ROOM they march in, and it hands them the five hooks the engine
   asks a level for - makeFoe, stepFoe, bopFoe, drawActors and the shot
   half of stepDrop / rectsFor / drawDrop - as delegates, so the engine
   still only ever talks to `art`. The one thing the room adds to them is
   depth: after the actors are drawn, the planks the King stands behind
   are drawn again over him.

   BISCUITS, NOT GIFTS. The owner's falling hazard is the black foam
   connector the whole fort is held together with, coming loose and
   tumbling out of the roof like the Whiteboard's magnets. They are the
   rarest drop in the room on purpose - the Cupmen are the hard part -
   and they are ALWAYS plain: every gift in this bay, the heat, the sour
   and the gold, is shot at you out of a toy gun. They are MATTE black
   foam (bakeBiscuit), and they stop falling while the King is on the
   field: js/cupmen.js sets the run's ledger.holdDrops when he is
   summoned and clears it when he falls, and the engine's drop spawner
   honours it, so nothing here has to know.

   MEASURED, the Desk's census: the baked tiles walked pixel by pixel,
   and the backdrop composed whole - room, far wall, picture, near wall,
   the chamber's breath, the tablet, and the room's light sheet over it -
   at 80 scroll positions from 0 to 9000, every 113, and averaged. Rec.601
   luminance throughout, the same numbers as the palette's comments.
   THAT WALK WAS MADE ON THE WARM PALETTE (plank 144, near face 72). The
   plank and the cap are new pigments and their numbers are exact; the
   wall figures marked ~ are the walk's scaled by the pigments' change
   (near face 72 -> 68, far faces 20% toward a 73 slate) and want a
   fresh walk before anybody leans on the decimals.

     the plank face                    178 (kraftPlank; the warm walk's
                                       whole column tile averaged 120 to
                                       130 at a 144 face, so ~150 now)
     the room beyond the fort          mean ~66 (64 before round 2's
                                       redraw), max 96 - the clamp holds
     the far wall                      ~83 at its roofline, ~76 at the
                                       floor; ~74 across the band
     the near wall, its own tile       ~54 across y 150..242 (57 and 58
                                       warm), ~54 at its foot
     THE BAND A PLAYER FLIES THROUGH   ~50 mean across y 150..242 with
                                       the light sheet laid (53.3 warm,
                                       51.8 to 55.4 over the 80
                                       positions) - the plan's ceiling
                                       was 90 - so the plank face stands
                                       ~128 points clear of it, and a
                                       whole column tile ~100
     ...at the foot, y 212..242        ~42 (44.6 warm): where the Cupmen
                                       stand

   And against that, the things that have to be seen:

     the yellow pellet  193            15 over the plank face, ~143 over
                                       the band - it is the dark ring it
                                       carries, and its saturation, that
                                       part it from a plank, not value
     the biscuit        body 35,       143 under the plank face. Over
                        rim 119,       the near wall's own face (~54) the
                        edge 90,       body is ~19 under and its cool rim
                        outline 0      ~65 over; over what shows behind
                                       the wall (~66: the far wall, the
                                       doorways, the room) the rim is ~53
                                       over and the body ~31 under. It is
                                       MATTE: one row of rim, the row ends
                                       down the upper half at 90, no
                                       catch-light - and the hard black
                                       outline round it is what makes it
                                       a disc and not a blob.
     the red cup        94             ~52 over the foot of the wall: the
                                       plan feared 14 against an ~80 wall;
                                       the shaded wall makes it a value
                                       read as well as a hue one
     the green cup      55             ~13 over the foot - THE LOWEST in the
                                       bay, carried by the cup's 30px
                                       height, its outline and the warm
                                       backlight js/cupmen.js lays behind
                                       it and the silver one (the rim
                                       light it wore in round 1 is gone,
                                       on the owner's note)
     the silver cup     144            ~102 over the foot: the bay's one
                                       neutral mid-tone

   Same discipline as every bay in this room: every pixel in here is
   generated and baked once, ANY shade laid over something that scrolls
   is a flat Tint or a baked alpha sheet, never a Dither, and nothing
   rotates a pixel canvas - the biscuit tumbles by swapping twelve baked
   frames. There is no call to Dither.rect anywhere in this file, no
   Math.random inside any draw function, no particle and no sound: the
   engine owns both of those.
------------------------------------------------------------------ */
'use strict';

var Fort = (function () {

  /* the room's, aliased the way every Living Room bay aliases it, and the
     four bays before this one, aliased because the room beyond the fort IS
     their furniture and their pigments are what it is painted in */
  var CEIL = LivingRoom.CEIL, FLOOR = LivingRoom.FLOOR;
  var R = LivingRoom.P;
  var C = Couch.P;
  var M = Mantle.P;
  var W = Whiteboard.P;
  var D = Desk.P;
  var wrap = LivingRoom.wrap, hash = LivingRoom.hash;
  var ease = LivingRoom.ease, rgba = LivingRoom.rgba;
  var rowsFill = LivingRoom.rowsFill;
  /* THE WHITEBOARD'S FOUR PLOTTERS, the contract js/chalkboard.js already
     holds it to: 1px line, 1px circle, 2px line, 2px circle. A doodle on a
     panel is a stroke and not a shape, exactly as it is on the board. */
  var pline = Whiteboard.pline, pline2 = Whiteboard.pline2;
  var pcircle = Whiteboard.pcircle, pcircle2 = Whiteboard.pcircle2;
  /* The Cupmen's palette, the one thing of theirs this file reads at load:
     js/cupmen.js loads before this one for exactly this line. Everything
     else of theirs is called inside a function, when it runs. The guard is
     there so a page that failed to load cupmen.js still draws a room. */
  var CP = (typeof Cupmen !== 'undefined' && Cupmen.P) || {};

  var P = {
    /* ---- the panels: corrugated kraft. The number after each is its
       Rec.601 luminance, the house's habit, so anybody adding a pigment
       has to write one down too. */
    /* THE PLANK, its own four pigments. It was plain kraft at 144 on a
       near wall of the same orange-brown, carrying the same grammar the
       wall did, and at a glance a plank was "another panel, nearer". The
       Couch's cream plank is WARM on a COOL grey wall; this is that turn:
       the plank lifts and warms, the wall behind it goes cool (kraftIn and
       its family, below). At 178 the plank is the only wall-height
       surface over 110 in the bay (the grey rug it stands on is 154, the
       pale boards under that 206); the Gold cup (188) parts from it by
       saturation, as it does from the boards. */
    kraftPlank:     '#d4ad74',   /* 178 - THE PLANK FACE, and nothing else */
    kraftPlankLit:  '#ead0a0',   /* 210 - its seam lip and the cap's arris  */
    kraftPlankMid:  '#c29a63',   /* 160 - its flute ridges, tooth, cap rim  */
    kraftPlankShade:'#a8814f',   /* 135 - its shade edge                    */
    kraftLit:   '#c9a371',   /* 169 - the roof panel's lit edge           */
    kraft:      '#b08a5c',   /* 144 - the roof panel, the box, the litter */
    kraftMid:   '#a37f52',   /* 133 - flute ridges on the roof panel      */
    kraftShade: '#86663f',   /* 107 - the far wall                        */
    kraftDeep:  '#6b5133',   /*  85 - the far wall's other panels         */
    /* THE NEAR WALL IS COOL: the inside of the fort, lit by the blue strip
       and not by a lamp. Value barely moved (72 -> 68); the HUE did, and
       it is the hue turn that sets the warm plank off it (Couch: cream on
       grey). */
    kraftIn:    '#4b4140',   /*  68 - THE NEAR WALL: the fort's inside     */
    kraftInLit: '#645a58',   /*  93 - the near wall's lip                 */
    kraftInDeep:'#3a3334',   /*  53 - the near wall's shade edge. Not in
                                the plan's table: its `kraftDeep` is 85, a
                                SHADE brighter than the face it shades, so
                                the inside of the fort gets a dark of its
                                own */
    flute:      '#96744a',   /* 121 - the corrugation seen in a bite      */
    print:      '#4a3421',   /*  56 - the badge rim, the big creatures    */
    printSoft:  '#6e5236',   /*  87 - the all-over doodle ink             */
    printIn:    '#2e2628',   /*  41 - print on the near wall, cool too    */
    badge:      '#efe4cf',   /* 229 - the kit's cream badge stock. Never
                                laid at full strength: a 229 oval within
                                30px of every cap was the brightest thing
                                in the bay and the eye went to it instead
                                of the edge that kills (see toneFor)      */
    badgeIn:    '#625c54',   /*  93 - the badge on the walls: at 136 it was
                                40 over the 96 the value rule promises for
                                everything behind a plank                */
    badgeMark:  '#c0392b',   /*  96 - its illegible red scribble          */

    /* ---- the foam: the biscuits and every connector */
    foam:       '#232226',   /*  35 */
    foamLit:    '#4a484e',   /*  73 */
    foamDeep:   '#131215',   /*  19 */
    foamSlot:   '#0d0c0f',   /*  13 - the groove a panel edge pushes into */
    foamRim:    '#6f7690',   /* 119 - the blue strip catching a puck's top
                                arc: what makes black read over a far wall
                                and a doorway at 37 to 87, where a pure 35
                                had nothing to stand on. The wall's
                                connectors and the falling puck both wear
                                it: one row, the strip, not a gloss */
    foamEdge:   '#555a6b',   /*  90 - the row ends down a falling puck's
                                upper half, one pixel inside its edge.
                                Round 2 lit the biscuit with a 147 rim and
                                a 200 catch-light; the owner found it "too
                                shiny", and black foam is MATTE */

    /* ---- holes and the two LEDs */
    holeDark:   '#2a2219',   /*  35 - a hole with nothing lit behind it   */
    ledGreen:   '#5ef07a',   /* 183 */
    ledGreenCore:'#d8ffe0',  /* 240 */
    ledGreenDim:'#2f8f49',   /* 106 */
    ledBlue:    '#6a8cff',   /* 143 */
    ledBlueCore:'#dfe8ff',   /* 232 */
    ledBlueDeep:'#2f3f9a',   /*  69 */
    leakWhite:  '#fff4d8',   /* 244 - far wall only, three pixels, no halo */

    /* ---- the other panels in the kit */
    panelYellow:  '#c8b23c',  /* 171 - the far wall's gable only          */
    panelYellowDk:'#6e6428',  /*  96 - the near wall's, above y 150 only.
                                 It was 132, the brightest wall shape in
                                 y 150..190, over the 96 ceiling          */
    panelBlue:    '#2f4f9c',  /*  78 - the box of panels in the litter    */

    /* ---- the floor under the fort: the grey geometric rug on the oak,
       and the pale boards under everything */
    rugLit:     '#f3ebd8',   /* 235 - not a rug any more: the book's pages
                                and the cover's halo round the bird      */
    woodPale:   '#d9cdb6',   /* 206 */
    woodSeam:   '#b8ab93',   /* 172 */
    geoGrey:    '#9a9a98',   /* 154 */
    geoDark:    '#5c5c5a',   /*  92 */
    geoLight:   '#c4c4c0',   /* 196 */

    /* ---- the room beyond the fort. Nothing behind a panel above 96: see
       the value rule, which bakeRoom enforces rather than hopes for. */
    roomDeep:   '#2a2420',   /*  37 */
    roomWall:   '#4a4039',   /*  66 */
    roomLit:    '#5e5349',   /*  85 */
    tablet:     '#17171a',   /*  23 */
    tabletGlass:'#2b3340',   /*  50 */
    tabletGlow: '#8fb4ff',   /* 177 */
    projWhite:  '#d7d5d0',   /* 213 */
    projBeam:   '#8cc8ff',   /* 188 */
    projCable:  '#111111',   /*  17 */
    boxBrown:   '#8b6a44',   /* 112 */
    blaster:    '#ff7a1a',   /* 151 - the toy blaster, ref 7: scenery     */
    blasterBlue:'#2b5cc8',   /*  90 */
    bookYellow: '#d9b63a',   /* 178 */
    cupRedLit:  CP.cupRed || '#d92b24',   /* 94 - a red cup lying on its side */
    /* the Desk's screensaver seen through a porthole. The plan allowed
       Desk.P.pageWhite at 0.4 if nothing better was there; the Desk's
       own pageBar (#5c84a6) is the blue of the page it shows, and this
       is that blue a little lifted toward the glow of a lit screen. */
    monitorGlow:'#4f7fb8',   /* 119 */

    /* ---- THE AMMO BAG: this bay's spare life (Ammo Bag ref) - a canvas
       tote in natural cream with navy handles, straps and base band */
    bagCream:   '#ddd2bf',   /* 211 - natural canvas                       */
    bagLit:     '#f0e8d8',   /* 233 - the rim's top row, the lit left edge */
    bagShade:   '#b8ad98',   /* 173 - the shaded right column, the pocket  */
    bagNavy:    '#263a66',   /*  57 - handles, straps, base band           */
    bagNavyLit: '#3d5490',   /*  84 - the lit edge of the handles          */

    /* ---- shade and void */
    shade:      '#3a2c1f',   /*  47 - this bay's Tint-only shadow colour  */
    void:       R.void,
    outline:    R.outline
  };

  var END_MIN = LivingRoom.END_MIN;
  var CEIL_KILLS = LivingRoom.CEIL_KILLS;

  /* A foam puck is LIGHTER than a ferrite one: 40 against the Whiteboard
     magnet's 46 and the Garden's tomato at 34. Closed-cell foam drifts a
     hair on the way down, and a puck a player reads as a magnet should not
     arrive like one. */
  var DROP_GRAV = 40;

  /* the puck lies on the rug for 2.4s, the magnet's number: nothing in
     this fort gets swept up either */
  var SPLAT_TIME = 2.4;

  /* The room's particles. The air is the room's air; a biscuit coming
     loose sheds CARDBOARD dust from the slot it fell out of; the save
     burst and the floor specks are lint off a grey rug; the biscuit's own
     burst is foam. Every pellet carries its own burst pair (`ob.burst`, which the
     engine's splatter reads), so splat/splatHi here are the biscuit's and
     nothing else's. The heat is the Whiteboard's exactly, because a heat
     is the same heat in every bay of this room. */
  var FX = {
    motes:    LivingRoom.AIR.motes, motesHi: LivingRoom.AIR.motesHi,
    puff:     P.kraftShade,  puffHi:   P.kraftLit,
    ground:   P.geoDark,     groundHi: P.geoLight,
    splat:    P.foamDeep,    splatHi:  P.foamLit,
    hot:      '#e8452a',     hotMid:   '#f4703a',  hotHi: '#ffcf8a',
    heat:     '#e8452a',     heatEdge: '#8a1d10',
    glowCore: '255,207,138', glowEdge: '232,69,42'
  };

  /* The heads-up lines. ▼ for what falls, ▲ for what rises or stands.
     Line one is at most 24 characters and line two at most 28, which is
     the game's own measured precedent (the Mantle ships a 24-character
     first line at UI.heading's scale 2). The engine shows drop, foe and
     late as each one arms - there is no spike line, because the tripods
     and ribbons are out of this bay (see makeSpikes), and the engine
     shows none for a level without the key. king and kingDown are asked
     for by js/cupmen.js through the run's ledger, when the King reaches
     the screen and when he falls; ceil is the first flap's. */
  var WARN = {
    drop:     ['▼ BISCUITS ▼',         'THE FORT IS COMING APART'],
    foe:      ['▲ CUPMEN ▲',           'THEY BROUGHT TOY GUNS'],
    /* the late phase belongs to the Order and the Sentinels, not to the
       spikes: run.late changes nothing in this file, and says so here */
    late:     ['▲ SENTINELS ▲',        'AND THE GOLDEN ORDER'],
    king:     ['▲ KING CUPMAN ▲',      'BOP HIM. THREE TIMES.'],
    kingDown: ['▼ THE KING IS DOWN ▼', 'LONG LIVE THE KING'],
    /* the lid here is a roof panel's edge, not the room's plaster: a bay
       whose lid is not the room's ceiling says what its own is */
    ceil:     ['▲ THE ROOF PANEL ▲',   'CARDBOARD IS STILL SOLID']
  };

  /* the thirteen colours the generic cover would use. This bay paints its
     own (drawPreview), but the table stays honest. */
  var PREVIEW = {
    back: P.kraftIn, backAlt: P.kraftDeep, seam: P.kraftShade,
    beam: P.kraftPlank, beamDark: P.kraftPlankShade, beamLight: P.kraftPlankLit,
    ground: P.geoGrey, groundDark: P.geoDark, groundHi: P.geoLight,
    spike: P.foam, spikeHi: P.foamLit, air: P.ledGreen, gloom: P.void
  };

  /* the caption PlayScene puts on an extra life picked up here */
  var BOON_NAME = 'AMMO BAG';

  var T = {};             /* baked tiles and sprites */

  /* The level's own clock, in PIXELS OF SCROLL, cached once a frame by
     drawBackdrop - the Deck's mistScroll, cached for the Deck's reason.
     Everything that moves on its own in this bay (the chamber's breath,
     the projector, the tablet, the ammo bag's glow) reads this or ob.age, so
     a paused fort is a still fort and nothing can be waited out behind the
     pause scrim. */
  var clock = 0;

  /* ======================================================= utilities */

  function hexRgb(hex) {
    var n = parseInt(hex.slice(1), 16);
    return [n >> 16 & 255, n >> 8 & 255, n & 255];
  }
  function toHex(r, g, b) {
    var n = (1 << 24) | (Math.round(r) << 16) | (Math.round(g) << 8) | Math.round(b);
    return '#' + n.toString(16).slice(1);
  }
  /* a pigment `k` of the way toward another, resolved at BAKE time into a
     plain hex: the lit chamber is kraft tinted 25% toward the LED, and a
     piece of furniture beyond the fort is its own colour sunk toward the
     dark - both are colours, and neither is an alpha laid over something */
  function mix(a, b, k) {
    var x = hexRgb(a), y = hexRgb(b);
    return toHex(x[0] + (y[0] - x[0]) * k, x[1] + (y[1] - x[1]) * k, x[2] + (y[2] - x[2]) * k);
  }
  /* the room's dark, for the furniture beyond the fort */
  function dim(hex, k) { return mix(hex, P.roomDeep, k); }

  /* a 3px round hole, the plus stamp: a filled pcircle of radius 1 is the
     centre and its four orthogonal pixels, which at this size IS round */
  function plus(c, x, y, col) {
    c.fillStyle = col;
    c.fillRect(x - 1, y, 3, 1);
    c.fillRect(x, y - 1, 1, 3);
  }

  /* a filled disc, row by row - for portholes, the badge and the green
     spill's bites. pcircle is a 1px ring; this is what is inside one. */
  function disc(c, cx, cy, r, col) {
    c.fillStyle = col;
    for (var dy = -r; dy <= r; dy++) {
      var hw = Math.floor(Math.sqrt(Math.max(0, (r + 0.5) * (r + 0.5) - dy * dy)));
      c.fillRect(cx - hw, cy + dy, hw * 2 + 1, 1);
    }
  }
  function discClear(c, cx, cy, r) {
    for (var dy = -r; dy <= r; dy++) {
      var hw = Math.floor(Math.sqrt(Math.max(0, (r + 0.5) * (r + 0.5) - dy * dy)));
      c.clearRect(cx - hw, cy + dy, hw * 2 + 1, 1);
    }
  }

  /* A 3x5 digit, for the panel numerals of ref 6. Digits only: there are
     no letters anywhere in this bay's art, so nothing printed on the
     cardboard can ever be read as a word, a name or a brand. Rows are
     three-bit masks, top to bottom. */
  var DIGITS = [
    [7, 5, 5, 5, 7], [2, 6, 2, 2, 7], [7, 1, 7, 4, 7], [7, 1, 3, 1, 7], [5, 5, 7, 1, 1],
    [7, 4, 7, 1, 7], [7, 4, 7, 5, 7], [7, 1, 2, 2, 2], [7, 5, 7, 5, 7], [7, 5, 7, 1, 7]
  ];
  function digit(c, x, y, d, col) {
    c.fillStyle = col;
    var rows = DIGITS[d % 10];
    for (var j = 0; j < 5; j++) {
      for (var i = 0; i < 3; i++) if (rows[j] & (4 >> i)) c.fillRect(x + i, y + j, 1, 1);
    }
  }

  /* =================================================== the print

     The all-over doodle on the printed panels, ref 1, 2, 5 and 6: cartoon
     creatures with dot eyes and zigzag grins, little blob monsters with
     horns, stars, candy canes, bones and lightning bolts, in a brown line
     a step darker than the kraft. At 1x a doodle is seven to nine pixels,
     and it is drawn with the Whiteboard's plotters for the reason the board
     is: a doodle is a STROKE, and a plotted line with a kink in it reads
     as somebody's hand where a rectangle reads as a diagram.

     THE INK IS printSoft (87 on a plank face at 178) AND NOT print (57).
     A 14px cell grid of doodles in 57 is the Couch's rejected busy-ness
     moved onto cardboard: the lethal mass would shimmer with detail and
     stop reading as one thing. The photographs' print is BIG and LOOSE
     with smaller fill between, so the small ones go down in the soft ink
     and one or two big creatures per near-wall panel in `print` carry the
     read - and the pillars get no big ones at all. */

  /* a 7px round face: two dot eyes and a zigzag mouth (the Cupmen's own
     grin, which is not a coincidence: the owner's cups came off this
     cardboard's doodles) */
  function dFace(c, x, y, ink) {
    pcircle(c, x, y, 3, ink);
    c.fillStyle = ink;
    c.fillRect(x - 1, y - 1, 1, 1); c.fillRect(x + 1, y - 1, 1, 1);
    c.fillRect(x - 1, y + 1, 1, 1); c.fillRect(x, y + 2, 1, 1); c.fillRect(x + 1, y + 1, 1, 1);
  }
  /* a 9px blob monster with three horns and one eye */
  var BLOB = [[-4, 4], [-4, 0], [-3, -2], [-3, -4], [-1, -2], [0, -4], [1, -2], [3, -4], [3, -2],
              [4, 0], [4, 4], [2, 3], [0, 4], [-2, 3], [-4, 4]];
  function dBlob(c, x, y, ink) {
    for (var i = 1; i < BLOB.length; i++) {
      pline(c, x + BLOB[i - 1][0], y + BLOB[i - 1][1], x + BLOB[i][0], y + BLOB[i][1], ink);
    }
    c.fillStyle = ink; c.fillRect(x, y, 1, 1);
  }
  /* a star of five strokes, the Whiteboard's star at half the reach */
  function dStar(c, x, y, ink) {
    for (var i = 0; i < 5; i++) {
      var a0 = -Math.PI / 2 + i * TAU / 5, a1 = -Math.PI / 2 + ((i + 2) % 5) * TAU / 5;
      pline(c, x + Math.cos(a0) * 4, y + Math.sin(a0) * 4, x + Math.cos(a1) * 4, y + Math.sin(a1) * 4, ink);
    }
  }
  /* a candy cane: a 6px hook */
  function dCane(c, x, y, ink) {
    pline(c, x + 1, y + 4, x + 1, y - 2, ink);
    c.fillStyle = ink;
    c.fillRect(x, y - 3, 1, 1); c.fillRect(x - 1, y - 3, 1, 1); c.fillRect(x - 2, y - 2, 1, 1);
    c.fillRect(x - 2, y - 1, 1, 1);
    /* the stripes, as notches in the stroke beside it */
    c.fillRect(x + 2, y + 1, 1, 1); c.fillRect(x + 2, y + 3, 1, 1);
  }
  /* a bone: a 5px shaft and two knuckles at each end */
  function dBone(c, x, y, ink) {
    c.fillStyle = ink;
    c.fillRect(x - 2, y, 5, 1);
    c.fillRect(x - 4, y - 1, 1, 1); c.fillRect(x - 4, y + 1, 1, 1);
    c.fillRect(x + 4, y - 1, 1, 1); c.fillRect(x + 4, y + 1, 1, 1);
    c.fillRect(x - 3, y, 1, 1); c.fillRect(x + 3, y, 1, 1);
  }
  /* a lightning bolt of three strokes */
  function dBolt(c, x, y, ink) {
    pline(c, x + 2, y - 4, x - 1, y, ink);
    pline(c, x - 1, y, x + 1, y, ink);
    pline(c, x + 1, y, x - 2, y + 4, ink);
  }
  var DOODLES = [dFace, dBlob, dStar, dCane, dBone, dBolt];

  /* THE BIG ONES, ref 2's print at its own scale: a 14px face with a
     toothy grin and two ears, and a 16px horned blob. They are the reason
     the near wall reads as PRINTED cardboard from across the room. */
  function dFaceBig(c, x, y, ink) {
    pcircle(c, x, y, 6, ink);
    /* ears */
    pline(c, x - 5, y - 4, x - 7, y - 7, ink); pline(c, x - 7, y - 7, x - 3, y - 6, ink);
    pline(c, x + 5, y - 4, x + 7, y - 7, ink); pline(c, x + 7, y - 7, x + 3, y - 6, ink);
    c.fillStyle = ink;
    c.fillRect(x - 3, y - 2, 2, 2); c.fillRect(x + 2, y - 2, 2, 2);
    /* the grin: a zigzag with teeth */
    for (var i = -3; i <= 3; i++) c.fillRect(x + i, y + 2 + (i & 1), 1, 1);
    c.fillRect(x - 3, y + 3, 7, 1);
  }
  var BLOB_BIG = [[-7, 7], [-7, 0], [-6, -3], [-6, -7], [-3, -4], [0, -8], [3, -4], [6, -7], [6, -3],
                  [7, 0], [7, 7], [4, 5], [1, 7], [-2, 5], [-5, 7], [-7, 7]];
  function dBlobBig(c, x, y, ink) {
    for (var i = 1; i < BLOB_BIG.length; i++) {
      pline(c, x + BLOB_BIG[i - 1][0], y + BLOB_BIG[i - 1][1], x + BLOB_BIG[i][0], y + BLOB_BIG[i][1], ink);
    }
    pcircle(c, x - 2, y - 1, 1, ink); pcircle(c, x + 3, y - 1, 1, ink);
    c.fillStyle = ink;
    c.fillRect(x - 3, y + 3, 7, 1);
    c.fillRect(x - 2, y + 4, 1, 1); c.fillRect(x + 2, y + 4, 1, 1);
  }

  /* THE OVAL BADGE, 22x12. In the photographs it is the kit's logo; here
     it is an oval with a rim and an ILLEGIBLE three-stroke scribble in red
     inside it, and a small square where the logo's mascot sits - the shape
     of a brand badge with no brand in it. */
  var BADGE = (function () {
    var rows = [], i;
    for (i = 0; i < 12; i++) {
      var dy = (i + 0.5 - 6) / 6;
      var hw = Math.round(11 * Math.sqrt(Math.max(0, 1 - dy * dy)));
      rows.push([11 - hw, hw * 2]);
    }
    return rows;
  })();
  function badge(c, x, y, face, rim, mark) {
    var i;
    rowsFill(c, BADGE, x, y, face);
    c.fillStyle = rim;
    for (i = 0; i < BADGE.length; i++) {
      c.fillRect(x + BADGE[i][0], y + i, 1, 1);
      c.fillRect(x + BADGE[i][0] + BADGE[i][1] - 1, y + i, 1, 1);
    }
    c.fillRect(x + BADGE[0][0], y, BADGE[0][1], 1);
    c.fillRect(x + BADGE[11][0], y + 11, BADGE[11][1], 1);
    /* the mascot's square, and the scribble where a name would be */
    c.fillStyle = mark;
    c.fillRect(x + 4, y + 4, 3, 4);
    pline(c, x + 9, y + 7, x + 11, y + 4, mark);
    pline(c, x + 11, y + 4, x + 13, y + 7, mark);
    pline(c, x + 13, y + 7, x + 17, y + 5, mark);
  }

  /* ============================================= the panel painter

     ONE PAINTER FOR EVERY PANEL IN THE BAY. A pillar course, a far-wall
     panel and a near-wall panel are the same object seen in three lights,
     and three painters would drift the first time one of them grew a
     detail the other two did not. The light is the TONE table; the rest
     is the photographs' grammar, applied in this order:

       1. the face, and the material on it: FLUTE RIDGES - every third row
          a sparse tick run so the corrugation reads in raking light,
          denser in the top twelve rows where the LED strip rakes it - and
          KRAFT TOOTH, one pixel in seventy a step lighter or darker
       2. the layout, reserved on a mask BEFORE anything is printed: the
          small-hole grid, the portholes, the badge, the numeral and the
          big creatures, so the doodle print never crosses a hole, a bite
          or a number (the plan's rule, and the photographs': the die-cut
          holes go through the print, the print does not go round them,
          but at 1x a doodle cut by a hole is just noise)
       3. the print, then the badge and the big creatures
       4. the holes: SMALL ones, a 3px plus at a quarter and three quarters
          of the width every 24 rows, staggered 12 between the two
          columns, 40% of them with a crush ring (cardboard dents where it
          is pushed); and PORTHOLES, radius 4 or 5, one or two a panel,
          near a seam
       5. the edges: a 1px outline, a lit lip inside the top and left, a
          shade inside the bottom and right
       6. THE BITES: half-round cut-outs every 16px along every edge it is
          told to bite, never a rectangular notch. On an edge that faces
          the room (`sky`) the inside of the bite is cleared, so the
          scalloped skyline of ref 2 and ref 5 is the silhouette; on an
          edge that meets another panel (`seam`) the inside shows the
          corrugation, so two facing bites make the round holes that run
          along every seam in ref 6
       7. the numeral, two digits near a bottom corner

     Light is NOT painted here. A lit hole, a bead of seam light, a white
     leak: each is pushed onto `o.lights` and the caller lays them after
     its own wash, so a bake that sinks the wall toward the void does not
     sink the LED with it. */

  /* the strip's slate, what the fort's walls are turned toward */
  var COOL = '#3f4a5c';

  /* the four lights a panel can be seen in */
  function toneFor(o) {
    var t;
    if (o.mode === 'pillar') {
      /* the plank's own warm pigments. Its badge, if one is ever asked for
         (bakeColumn asks for none), is a PRINTED mark half sunk into the
         face with a soft rim - never the cream sticker that out-lit the
         plank beside every gap mouth */
      t = { face: P.kraftPlank, lit: P.kraftPlankLit, shade: P.kraftPlankShade, ridge: P.kraftPlankMid,
            tooth: P.kraftPlankLit, flute: P.flute, ink: P.printSoft, inkBig: P.print,
            badge: mix(P.badge, P.kraftPlank, 0.5), badgeRim: P.printSoft, mark: P.badgeMark,
            hole: P.holeDark, crush: P.kraftPlankShade, rim: P.kraftDeep };
    } else if (o.mode === 'near') {
      /* the inside of the fort, cool. Its ridges are a step LIGHTER than
         the face: on a wall in shadow the corrugation is the one thing the
         strip's light catches, so it reads as a lit tick, not a dark one.
         They are kraftDeep turned the same 20% toward the strip's slate as
         the far wall, so no warm speck is left on the cool wall. The badge
         is a dim printed oval (93) and its scribble three quarters ink: at
         0.6 it was still a red mark, and the only reds in the bay should
         be the Crimson and his heat. */
      var ridgeIn = mix(P.kraftDeep, COOL, 0.2);
      t = { face: P.kraftIn, lit: P.kraftInLit, shade: P.kraftInDeep, ridge: ridgeIn,
            tooth: P.kraftInLit, flute: ridgeIn, ink: P.printIn, inkBig: P.printIn,
            badge: P.badgeIn, badgeRim: P.printIn, mark: mix(P.badgeMark, P.printIn, 0.75),
            hole: P.holeDark, crush: P.kraftInDeep, rim: ridgeIn };
    } else {
      /* the far wall, plain kraft in shadow, two faces alternating, and
         turned 20% toward the strip's slate with the near wall - the whole
         fort behind the planks is cool, so the planks are the warm thing */
      var deep = o.face === P.kraftDeep;
      t = { face: mix(deep ? P.kraftDeep : P.kraftShade, COOL, 0.2),
            lit: mix(deep ? P.kraftShade : P.kraftMid, COOL, 0.2),
            shade: mix(deep ? P.kraftIn : P.kraftDeep, COOL, 0.2),
            ridge: deep ? mix(P.kraftDeep, P.kraftShade, 0.5) : mix(P.kraftShade, P.kraftMid, 0.5),
            tooth: deep ? P.kraftShade : P.kraftMid,
            flute: mix(deep ? mix(P.kraftDeep, P.kraftShade, 0.6) : P.flute, COOL, 0.2),
            ink: P.printSoft, inkBig: P.print, badge: P.badgeIn, badgeRim: P.print,
            mark: mix(P.badgeMark, P.printSoft, 0.4),
            hole: P.holeDark, crush: deep ? P.kraftIn : P.kraftDeep, rim: P.kraftIn };
    }
    if (o.lit) {
      /* THE GREEN CHAMBER'S PANEL: every tone 25% toward the LED's dim,
         resolved to plain hex here, so the lit panel is a different
         CARDBOARD rather than a tint laid over the normal one */
      for (var k in t) if (t.hasOwnProperty(k) && k !== 'mark' && k !== 'hole') t[k] = mix(t[k], P.ledGreenDim, 0.25);
    }
    return t;
  }

  /* the occupancy mask a panel's layout is reserved on */
  function makeMask(x, y, w, h) { return { x: x, y: y, w: w, h: h, a: new Uint8Array(w * h) }; }
  function maskSet(m, x, y, w, h) {
    for (var j = Math.max(0, y - m.y); j < Math.min(m.h, y + h - m.y); j++) {
      for (var i = Math.max(0, x - m.x); i < Math.min(m.w, x + w - m.x); i++) m.a[j * m.w + i] = 1;
    }
  }
  function maskFree(m, x, y, w, h) {
    if (x < m.x || y < m.y || x + w > m.x + m.w || y + h > m.y + m.h) return false;
    for (var j = y - m.y; j < y + h - m.y; j++) {
      for (var i = x - m.x; i < x + w - m.x; i++) if (m.a[j * m.w + i]) return false;
    }
    return true;
  }

  /* One half-round bite, centred on an edge point and cut `r` deep into
     the panel. `dir` names the edge it is on. Inside: cleared (a skyline)
     or the corrugation (a seam). Its rim: a 1px outline arc. r 2 is five
     pixels wide and three deep; r 3 is seven and four. */
  function bite(c, cx, cy, r, dir, sky, flute) {
    var outer = (r + 0.5) * (r + 0.5), inner = (r - 0.5) * (r - 0.5);
    for (var dy = 0; dy <= r; dy++) {
      for (var dx = -r; dx <= r; dx++) {
        var d2 = dx * dx + dy * dy;
        if (d2 > outer) continue;
        var px, py;
        if (dir === 'top') { px = cx + dx; py = cy + dy; }
        else if (dir === 'bottom') { px = cx + dx; py = cy - dy; }
        else if (dir === 'left') { px = cx + dy; py = cy + dx; }
        else { px = cx - dy; py = cy + dx; }
        if (d2 <= inner) {
          if (sky) c.clearRect(px, py, 1, 1);
          else { c.fillStyle = flute; c.fillRect(px, py, 1, 1); }
        } else {
          c.fillStyle = P.outline; c.fillRect(px, py, 1, 1);
        }
      }
    }
  }

  /* Where the bites go along an edge: every 16px, anchored so that two
     panels sharing a seam put their bites face to face. Vertical edges are
     anchored on the FLOOR (every wall panel stands on it), horizontal ones
     on the panel's own left edge. Returns the centres. */
  function bitesAlong(from, to, anchor, r) {
    var out = [], p = anchor - Math.floor((anchor - from) / 16) * 16 + 8;
    for (; p < to; p += 16) if (p - from >= r + 2 && to - p >= r + 2) out.push(p);
    return out;
  }

  /* o = { mode: 'pillar' | 'near' | 'far', face, lit, print, big, badge,
           ports, seed, numeral, fold, holes (default true), leak,
           biteR, edges: { t, b, l, r: 'sky' | 'seam' | null }, anchorY,
           lights: [] } */
  function paintPanel(c, x, y, w, h, o) {
    var rnd = mulberry32(o.seed || 1);
    var tn = toneFor(o);
    var m = makeMask(x, y, w, h);
    var e = o.edges || {};
    var br = o.biteR || 2;
    var lights = o.lights;
    var i, j, k, px, py;

    /* 1. the face, and the material on it */
    c.fillStyle = tn.face; c.fillRect(x, y, w, h);
    for (j = 2; j < h - 1; j++) {
      var top12 = j < 12;
      if (!top12 && j % 3) continue;
      /* a sparse run: 1 in 5 of the row in short ticks of two or three */
      for (i = 1; i < w - 1; i++) {
        if (rnd() > (top12 ? 0.10 : 0.07)) continue;
        var run = 2 + Math.floor(rnd() * 2);
        c.fillStyle = tn.ridge;
        c.fillRect(x + i, y + j, Math.min(run, w - 1 - i), 1);
        i += run + 2;
      }
    }
    for (j = 1; j < h - 1; j++) {
      for (i = 1; i < w - 1; i++) {
        if (rnd() > 1 / 70) continue;
        c.fillStyle = rnd() < 0.5 ? tn.tooth : tn.ridge;
        c.fillRect(x + i, y + j, 1, 1);
      }
    }

    /* 2. the layout, reserved before anything is printed. The edges and
       their bites first, so nothing lands in them. */
    maskSet(m, x, y, w, br + 2);
    maskSet(m, x, y + h - br - 2, w, br + 2);
    maskSet(m, x, y, br + 2, h);
    maskSet(m, x + w - br - 2, y, br + 2, h);

    /* how much clear cardboard a cut-out keeps round it: a wall panel is
       120 wide and can afford three pixels, a 34px plank cannot - at three
       its badge (planks carried one then) and its one porthole between
       them reserved every spot the print could go, and the printed plank
       came out blank */
    var pad = o.mode === 'pillar' ? 1 : 2;

    /* the badge and the numeral claim their places FIRST and the hole
       grid gives way to them, which is how the die is laid out in the
       photographs: no hole is ever punched through the printed badge */
    var bdg = null;
    if (o.badge && w >= 30 && h >= 24) {
      var slack = Math.max(0, w - 24 - (br + 2) * 2 - 2);
      for (k = 0; k < 12 && !bdg; k++) {
        var bx = x + Math.round(w / 2) - 11 + Math.floor(rnd() * (slack + 1)) - (slack >> 1);
        var by = y + Math.round(h * 0.42) - 6 + Math.floor(rnd() * 11) - 5;
        if (maskFree(m, bx - 1, by - 1, 24, 14)) bdg = [bx, by];
      }
      if (bdg) maskSet(m, bdg[0] - pad, bdg[1] - pad, 22 + pad * 2, 12 + pad * 2);
    }

    var num = null;
    if (o.numeral && h >= 16) {
      var nx = rnd() < 0.5 ? x + br + 4 : x + w - br - 11;
      var ny = y + h - br - 10;
      if (maskFree(m, nx - 1, ny - 1, 9, 7)) { num = [nx, ny, 10 + Math.floor(rnd() * 39)]; maskSet(m, nx - 1, ny - 1, 9, 7); }
    }

    /* THE PRINT ON A PLANK goes down here, before the die cuts are laid
       out. A 34px plank has room for two 14px cells across and its holes,
       its porthole and its badge took most of both - the printed plank
       came out blank - so on a pillar the doodles are laid GREEDILY over
       every free spot on a 7px stagger, three times in four, and
       the holes are then punched THROUGH them, which is what a die does
       to a printed sheet. Only the badge and the numeral keep the print
       off: they are printed too, and print does not overprint print. */
    if (o.print && o.mode === 'pillar') {
      for (py = y + 6, k = 0; py < y + h - 4; py += 7, k++) {
        for (px = x + 7 + (k % 2) * 3; px < x + w - 5; px += 7) {
          if (rnd() < 0.25 || !maskFree(m, px - 3, py - 3, 7, 7)) continue;
          DOODLES[Math.floor(rnd() * DOODLES.length)](c, px, py, tn.ink);
          maskSet(m, px - 4, py - 4, 9, 9);
        }
      }
      /* and the holes may now go anywhere the grid puts them */
      m = makeMask(x, y, w, h);
      maskSet(m, x, y, w, br + 2); maskSet(m, x, y + h - br - 2, w, br + 2);
      maskSet(m, x, y, br + 2, h); maskSet(m, x + w - br - 2, y, br + 2, h);
      if (bdg) maskSet(m, bdg[0] - pad, bdg[1] - pad, 22 + pad * 2, 12 + pad * 2);
      if (num) maskSet(m, num[0] - 1, num[1] - 1, 9, 7);
    }

    var holes = [];
    if (o.holes !== false && w >= 20) {
      var hx = [x + Math.round(w / 4), x + Math.round(w * 3 / 4)];
      for (k = 0; k < 2; k++) {
        for (py = y + 12 + k * 12; py < y + h - 6; py += 24) {
          if (py < y + 5 || !maskFree(m, hx[k] - 2, py - 2, 5, 5)) continue;
          holes.push([hx[k], py, rnd() < 0.4]);
          maskSet(m, hx[k] - 2, py - 2, 5, 5);
        }
      }
    }

    var ports = [];
    for (k = 0; k < (o.ports || 0); k++) {
      var pr = rnd() < 0.5 ? 4 : 5;
      if (h < pr * 2 + 10) break;
      /* near a seam: the first one off the left edge, the second off the
         right, at heights that differ so two panels side by side never
         line their portholes up into a row. A few tries, nudged down the
         seam, and none at all if the panel has no room for one. */
      for (var pt = 0; pt < 6; pt++) {
        var pxp = k ? x + w - 6 - pr - Math.floor(rnd() * 4) : x + 6 + pr + Math.floor(rnd() * 4);
        var pyp = y + Math.round(h * (k ? 0.66 : 0.36)) + Math.floor(rnd() * 7) - 3 + pt * 5 * (k ? -1 : 1);
        pyp = clamp(pyp, y + pr + 5, y + h - pr - 5);
        if (!maskFree(m, pxp - pr - 1, pyp - pr - 1, pr * 2 + 3, pr * 2 + 3)) continue;
        ports.push([pxp, pyp, pr]);
        maskSet(m, pxp - pr - 1 - pad, pyp - pr - 1 - pad, pr * 2 + 3 + pad * 2, pr * 2 + 3 + pad * 2);
        break;
      }
    }

    var bigs = [];
    for (k = 0; k < (o.big || 0); k++) {
      for (var tries = 0; tries < 24; tries++) {
        var gx = x + 10 + Math.floor(rnd() * Math.max(1, w - 20));
        var gy = y + 10 + Math.floor(rnd() * Math.max(1, h - 20));
        if (maskFree(m, gx - 9, gy - 9, 19, 19)) { bigs.push([gx, gy, k % 2]); maskSet(m, gx - 9, gy - 9, 19, 19); break; }
      }
    }

    /* 3. the print on a wall: about one doodle per 14x14 cell, 30% of
       cells empty */
    if (o.print && o.mode !== 'pillar') {
      for (py = y + 4; py + 14 <= y + h - 2; py += 14) {
        for (px = x + 4; px + 14 <= x + w - 2; px += 14) {
          if (rnd() < 0.30) continue;
          var dx0 = px + 7 + Math.floor(rnd() * 3) - 1, dy0 = py + 7 + Math.floor(rnd() * 3) - 1;
          var fn = DOODLES[Math.floor(rnd() * DOODLES.length)];
          if (!maskFree(m, dx0 - 4, dy0 - 4, 9, 9)) continue;
          fn(c, dx0, dy0, tn.ink);
          maskSet(m, dx0 - 4, dy0 - 4, 9, 9);
        }
      }
      for (k = 0; k < bigs.length; k++) (bigs[k][2] ? dBlobBig : dFaceBig)(c, bigs[k][0], bigs[k][1], tn.inkBig);
    }
    if (bdg) badge(c, bdg[0], bdg[1], tn.badge, tn.badgeRim, tn.mark);

    /* the fold (ref 6): a panel bent at an angle, a crease line with a lit
       lip beside it where the near half catches the strip */
    if (o.fold) {
      var fx = x + Math.round(w * 0.55);
      c.fillStyle = tn.ink;  c.fillRect(fx, y + 4, 1, h - 6);
      c.fillStyle = tn.lit;  c.fillRect(fx + 1, y + 4, 1, h - 6);
    }

    /* 4. the holes */
    for (k = 0; k < holes.length; k++) {
      var H = holes[k];
      if (H[2]) pcircle(c, H[0], H[1], 2, mix(tn.face, tn.crush, 0.6));
      plus(c, H[0], H[1], tn.hole);
      /* a small hole on the lit panel is a GLINT, one dim pixel under it,
         and not a smear: twelve to fifteen 1x5 green dashes a panel, in
         y 150..240 among the Cupmen, read as green rain in the band the
         green sour pellets fly through. The pool carries the "lit" read;
         only the portholes and the three bites under the wall pour light */
      if (o.lit && lights) lights.push(['glint', H[0], H[1]]);
      else if (o.leak && lights && rnd() < 0.34) lights.push(['leak', H[0], H[1]]);
      else if (o.dimSmear && lights) lights.push(['smearDim', H[0], H[1]]);
    }
    for (k = 0; k < ports.length; k++) {
      var Q = ports[k];
      if (o.mode === 'near') {
        /* TRANSPARENT, cut right through, with a 1px rim: the far wall and
           the room behind it show through at their own rates. A baked crop
           of the room would scroll at 0.55 while the room scrolls at 0.12
           - a parallax lie - and a hole is cheaper than a picture anyway. */
        pcircle(c, Q[0], Q[1], Q[2], tn.rim);
        discClear(c, Q[0], Q[1], Q[2] - 1);
        if (o.lit && lights) lights.push(['smear', Q[0], Q[1] + Q[2]]);
      } else {
        disc(c, Q[0], Q[1], Q[2], tn.hole);
        pcircle(c, Q[0], Q[1], Q[2] + 1, tn.crush);
        /* the lip of the cut catching the light, top left */
        c.fillStyle = tn.lit; c.fillRect(Q[0] - 1, Q[1] - Q[2] - 1, 3, 1);
        if (o.dimSmear && lights) lights.push(['smearDim', Q[0], Q[1]]);
      }
    }

    /* 5. the edges */
    if (e.t) { c.fillStyle = P.outline; c.fillRect(x, y, w, 1); c.fillStyle = tn.lit; c.fillRect(x + 1, y + 1, w - 2, 1); }
    if (e.l) { c.fillStyle = P.outline; c.fillRect(x, y, 1, h); c.fillStyle = tn.lit; c.fillRect(x + 1, y + 1, 1, h - 2); }
    if (e.r) { c.fillStyle = P.outline; c.fillRect(x + w - 1, y, 1, h); c.fillStyle = tn.shade; c.fillRect(x + w - 2, y + 1, 1, h - 2); }
    if (e.b) { c.fillStyle = P.outline; c.fillRect(x, y + h - 1, w, 1); c.fillStyle = tn.shade; c.fillRect(x + 1, y + h - 2, w - 2, 1); }

    /* 6. the bites */
    var ay = o.anchorY === undefined ? FLOOR : o.anchorY, list;
    if (e.t) { list = bitesAlong(x, x + w, x, br); for (k = 0; k < list.length; k++) bite(c, list[k], y, br, 'top', e.t === 'sky', tn.flute); }
    if (e.b) { list = bitesAlong(x, x + w, x, br); for (k = 0; k < list.length; k++) bite(c, list[k], y + h - 1, br, 'bottom', e.b === 'sky', tn.flute); }
    if (e.l) { list = bitesAlong(y, y + h, ay, br); for (k = 0; k < list.length; k++) bite(c, x, list[k], br, 'left', e.l === 'sky', tn.flute); }
    if (e.r) { list = bitesAlong(y, y + h, ay, br); for (k = 0; k < list.length; k++) bite(c, x + w - 1, list[k], br, 'right', e.r === 'sky', tn.flute); }

    /* a lit panel's vertical seams leak in BEADS - a pixel every 6 rows -
       never as a line and never as a disc */
    if (o.lit && lights) {
      for (py = y + 4; py < y + h - 3; py += 6) { lights.push(['bead', x + 1, py]); lights.push(['bead', x + w - 2, py + 3]); }
    }

    /* 7. the numeral */
    if (num) {
      digit(c, num[0], num[1], Math.floor(num[2] / 10), tn.ink);
      digit(c, num[0] + 4, num[1], num[2] % 10, tn.ink);
    }
    return tn;
  }

  /* The lights a panel asked for, laid after the caller's wash. Every one
     of them is a LINE, a DIAMOND or a single pixel, never a disc: the only round coloured
     things in this bay are the pellets, so a green disc is always a sour. */
  function drawLights(c, lights) {
    for (var i = 0; i < lights.length; i++) {
      var L = lights[i], x = L[1], y = L[2];
      if (L[0] === 'smear') {
        /* a vertical slit of LED: 1x3 at the hole, a 1x5 ray under it */
        c.fillStyle = P.ledGreen;    c.fillRect(x, y - 1, 1, 3);
        c.fillStyle = P.ledGreenDim; c.fillRect(x, y + 2, 1, 5);
      } else if (L[0] === 'glint') {
        c.fillStyle = P.ledGreenDim; c.fillRect(x, y + 2, 1, 1);
      } else if (L[0] === 'smearDim') {
        c.fillStyle = P.ledGreenDim; c.fillRect(x, y - 1, 1, 3);
        c.fillStyle = mix(P.ledGreenDim, P.kraftDeep, 0.5); c.fillRect(x, y + 2, 1, 3);
      } else if (L[0] === 'leak') {
        /* white light through a far-wall hole: the plus itself, three
           pixels across at most, and no halo - the only white dots in the
           bay, and on the slowest wall in it */
        plus(c, x, y, P.leakWhite);
      } else if (L[0] === 'bead') {
        c.fillStyle = P.ledGreen; c.fillRect(x, y, 1, 1);
      } else if (L[0] === 'diamond') {
        plus(c, x, y, L[3] || P.leakWhite);
      }
    }
  }

  /* ================================================ the connectors

     THREE STAMPS, because the photographs have three (ref 2, 5, 6) and the
     first draft's one 7x4 disc everywhere was wrong:
       DASH  5x2, laid across a vertical seam every 48px: a biscuit seen
             edge on is a short black dash
       BUMP  7x4, a half-disc standing proud of a roof edge every 48px,
             silhouetted against the room - the read of every skyline in
             ref 2 and ref 5
       FACE  9x9, face on with the slot across it - only at the two hero
             corners of the near wall's lit panel
     On the far wall the dash and the bump are foamLit over kraftDeep and
     never full black, so the scenery never wears the falling hazard's
     face-on black: the falling biscuit is the only face-on black disc
     that moves. */
  function bakeDash(far, vertical) {
    var t = makeCanvas(vertical ? 2 : 5, vertical ? 5 : 2), c = t.ctx;
    var body = far ? P.foamLit : P.foam, lit = far ? P.kraftShade : P.foamLit;
    c.fillStyle = body;
    c.fillRect(0, 0, t.w, t.h);
    c.fillStyle = lit;
    if (vertical) c.fillRect(0, 0, 1, 5); else c.fillRect(0, 0, 5, 1);
    return t;
  }

  var BUMP = [[2, 3], [1, 5], [0, 7], [0, 7]];
  function bakeBump(far, hanging) {
    var t = makeCanvas(7, 4), c = t.ctx, i;
    var rows = hanging ? BUMP.slice().reverse() : BUMP;
    rowsFill(c, rows, 0, 0, far ? P.foamLit : P.foam);
    c.fillStyle = far ? P.kraftShade : P.foamLit;          /* the arc the strip lights */
    c.fillRect(rows[0][0], 0, rows[0][1], 1);
    c.fillStyle = far ? P.kraftDeep : P.foamDeep;           /* the side in the slot  */
    c.fillRect(rows[3][0], 3, rows[3][1], 1);
    c.fillStyle = far ? P.foam : P.outline;
    for (i = 1; i < 4; i++) { c.fillRect(rows[i][0], i, 1, 1); c.fillRect(rows[i][0] + rows[i][1] - 1, i, 1, 1); }
    return t;
  }

  /* the face-on connector, with the slot a panel edge pushes into */
  function bakeFace() {
    var t = makeCanvas(9, 9), c = t.ctx, i;
    var rows = [];
    for (i = 0; i < 9; i++) {
      var dy = (i + 0.5 - 4.5) / 4.5;
      var hw = Math.round(4.4 * Math.sqrt(Math.max(0, 1 - dy * dy)));
      rows.push([4 - hw, hw * 2 + 1]);
    }
    rowsFill(c, rows, 0, 0, P.foam);
    c.fillStyle = P.foamDeep;
    for (i = 0; i < 9; i++) { c.fillRect(rows[i][0], i, 1, 1); c.fillRect(rows[i][0] + rows[i][1] - 1, i, 1, 1); }
    c.fillRect(rows[8][0], 8, rows[8][1], 1);
    c.fillStyle = P.foamRim;
    c.fillRect(rows[0][0], 0, rows[0][1], 1);
    c.fillRect(rows[1][0], 1, 1, 1); c.fillRect(rows[1][0] + rows[1][1] - 1, 1, 1, 1);
    c.fillStyle = P.foamLit;   c.fillRect(2, 2, 2, 1);
    c.fillStyle = P.foamSlot;  c.fillRect(1, 4, 7, 1);
    c.fillStyle = P.foamLit;   c.fillRect(2, 5, 5, 1);
    return t;
  }

  /* =========================================== the room beyond the fort

     LAYER 1, 960x218 at 0.12: the Living Room the fort was built in, seen
     over the roofline and through the doorways, dim. It is a ROOM and not
     a backcloth: a back wall, a skirting board along its foot at rows
     190..194, and a floor plane of the room's oak receding from the
     skirting toward the fort, and every piece of furniture STANDS ON that
     floor in front of the wall - its feet end on row 193 and a four-row
     contact shadow lies under them - at one scale, 1px = 1.56cm. Round 1
     pasted the furniture onto a flat wall: a sofa whose base hung 56 rows
     over the floor, books half sunk into the plaster, a ladder and a bunk
     rail across the window. The owner's note was that it "should at least
     physically make sense", and it was not; this is the redraw.

     The four bays before this one pass IN THE ORDER THEY ARE EARNED, left
     to right, each centred in its own 240 columns, so a long run flies
     past the room the way the player unlocked it:

       x   0..240  THE DESK: the white desk with two banks of drawers and
                   the knee hole, the monitor's screensaver glowing - the
                   one emissive glimpse in the room, and a RECTANGLE, never
                   a disc - the portrait screen asleep, a pile of hardbacks
                   and a pot of ivy on the desk, and the two floating
                   shelves of keepsakes over it with the pothos off the top
       x 240..480  THE COUCH: the shutters, cropped 1:1 out of the Couch's
                   own tile and sunk under the dark; the grey sectional with
                   its three four-button back panels and two throw pillows,
                   and the walnut coffee table in front of it with the
                   yellow book and a plant (ref 4, ref 7)
       x 480..720  THE MANTLE: the ledger-stone chimney breast floor to
                   ceiling, the dark television mounted on it, and the
                   black mantel shelf under the set with the soundbar on it
                   (Mantle ref 1 and 2)
       x 720..960  THE WHITEBOARD on its rolling frame: two uprights on
                   castored feet, the rail with tape on it, the pen tray,
                   and blue and purple marks on the board
     and one dark pendant hanging OFF over the couch and one over the
     board: the pendants are the room's, and tonight they are off.

     At 0.12 the tile repeats every 8000 world pixels, which is longer
     than most runs get; the far wall's 384 at 0.30 repeats every 1280 and
     the near wall's 480 at 0.55 every 873. 8000, 1280 and 873 share no
     small common multiple, so the three layers never repeat on one beat -
     the Desk's argument for its three widths, with the arithmetic.

     THE VALUE RULE IS ENFORCED, NOT HOPED FOR. Every piece of furniture
     back here is its own pigment sunk toward roomDeep, and the last thing
     the bake does is walk the pixels and pull anything over luminance 96
     down to 96 along its own hue. The board (half of its white over
     roomWall) lands at ~122 and the mantel's gloss row at ~116 before it,
     not at 96; the clamp is what makes the rule true whatever a future
     pigment does. */
  var ROOM_W = 960;
  var VALUE_CEIL = 96;

  /* the room's pendant shade, LivingRoom's own [offset, width] rows - it
     keeps them private, so they are restated here - hanging off tonight */
  var SHADE_ROWS = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [1, 5], [2, 3]];

  function clampValue(t, ceil) {
    var c = t.ctx;
    c.setTransform(1, 0, 0, 1, 0, 0);
    var img = c.getImageData(0, 0, t.w, t.h), d = img.data;
    for (var i = 0; i < d.length; i += 4) {
      if (!d[i + 3]) continue;
      var l = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
      if (l <= ceil) continue;
      var k = ceil / l;
      d[i] = Math.round(d[i] * k); d[i + 1] = Math.round(d[i + 1] * k); d[i + 2] = Math.round(d[i + 2] * k);
    }
    c.putImageData(img, 0, 0);
  }

  /* It hangs at y 24..44, where the room's ramp is still within a few
     points of roomDeep and the crown shade and the strip's wash lie over
     it: a roomDeep lamp there was a lamp nobody could find in any wide
     shot. So the cord is a step up off the dark, and the shade, still
     dark, carries a 1px rim on its lit (left) side and its lip, with the
     strip's blue on its crown - an object in silhouette, not a blot. */
  function pendant(c, x) {
    var i;
    c.fillStyle = mix(P.roomDeep, P.roomLit, 0.5);
    c.fillRect(x, CEIL, 1, 12);
    c.fillStyle = P.roomDeep;
    c.fillRect(x - 2, CEIL, 5, 1);
    rowsFill(c, SHADE_ROWS, x - 3, CEIL + 12, P.roomDeep);
    c.fillStyle = P.roomLit;
    for (i = 1; i < SHADE_ROWS.length; i++) c.fillRect(x - 3 + SHADE_ROWS[i][0], CEIL + 12 + i, 1, 1);
    c.fillRect(x - 3 + SHADE_ROWS[7][0], CEIL + 19, SHADE_ROWS[7][1], 1);
    c.fillStyle = mix(P.roomLit, P.ledBlue, 0.35);
    c.fillRect(x - 3 + SHADE_ROWS[0][0], CEIL + 12, SHADE_ROWS[0][1], 1);
    /* the glass off: one row of the room's lamp-dark in the bowl, so it is
       a lamp and not a blot */
    c.fillStyle = dim(R.lampDark, 0.55);
    c.fillRect(x - 1, CEIL + 14, 3, 2);
  }

  /* THE FLOOR LINE of the room, and the band that stands a piece on it.
     Every piece of furniture's last body row is ROOM_FLOOR - 1 (193); its
     contact shadow is four rows of the dark at 0.55 laid over the floor
     plane from two pixels outside its outermost foot to two pixels outside
     the other, AFTER the floor and BEFORE the piece. At 0.12 and dimmed
     under a 96 ceiling there is no other cue that says "standing on" - a
     sofa without it hung on the wall, which is what round 1's did. */
  var ROOM_FLOOR = 194;
  function contact(c, x0, x1) {
    c.fillStyle = rgba(P.roomDeep, 0.55);
    c.fillRect(x0, ROOM_FLOOR, x1 - x0, 4);
  }

  function bakeRoom() {
    var t = makeCanvas(ROOM_W, FLOOR - CEIL), c = t.ctx;
    var r = mulberry32(7301);
    var i, j, x, y, k;
    c.setTransform(1, 0, 0, 1, 0, -CEIL);

    /* THE ARCHITECTURE FIRST, because it is what makes the room a room and
       not a backcloth: a back wall, a skirting board along its foot, and a
       floor plane running from the skirting toward the fort. */
    /* the wall: a ramp from the dark at the ceiling to roomWall by 150,
       painted row by row so it has no edge (the room's rule), down to the
       skirting's top at 190 */
    for (y = CEIL; y < 190; y++) {
      c.fillStyle = mix(P.roomDeep, P.roomWall, ease((y - CEIL) / (150 - CEIL)));
      c.fillRect(0, y, ROOM_W, 1);
    }
    /* tooth, a one in sixty speckle a half step either side of the wall -
       the room's plaster tooth, quieter, because this wall is far away
       and in the dark. On the plaster only: the skirting is painted wood
       and the floor is oak */
    var toothHi = mix(P.roomWall, P.roomLit, 0.5), toothLo = mix(P.roomWall, P.roomDeep, 0.5);
    for (y = CEIL; y < 190; y++) {
      for (x = 0; x < ROOM_W; x++) {
        if (r() > 1 / 60) continue;
        c.fillStyle = r() < 0.5 ? toothHi : toothLo;
        c.fillRect(x, y, 1, 1);
      }
    }
    /* the blue strip's cold light down the top of the wall */
    for (y = CEIL; y < CEIL + 40; y++) {
      c.fillStyle = rgba(P.ledBlueDeep, 0.22 * (1 - ease((y - CEIL) / 40)));
      c.fillRect(0, y, ROOM_W, 1);
    }
    /* THE SKIRTING BOARD, rows 190..194: a lit top edge (~75), the board
       (~56), and the shadow line where the floor meets it (37) */
    c.fillStyle = mix(P.roomWall, P.roomLit, 0.5);  c.fillRect(0, 190, ROOM_W, 1);
    c.fillStyle = mix(P.roomWall, P.roomDeep, 0.35); c.fillRect(0, 191, ROOM_W, 3);
    c.fillStyle = P.roomDeep;                       c.fillRect(0, ROOM_FLOOR, ROOM_W, 1);
    /* THE FLOOR PLANE, rows 195..241: the room's own oak - the floor the
       other four bays stand on - under a wash laid ROW BY ROW from 0.66 at
       the skirting to 0.52 at the fort, so it is darker at the back and a
       hair lighter toward the camera: a plane receding to the wall, not a
       second wall. Seen only through a doorway, which is enough. */
    LivingRoom.paintOak(c, 0, ROOM_FLOOR + 1, ROOM_W, FLOOR - ROOM_FLOOR - 1, 11);
    for (y = ROOM_FLOOR + 1; y < FLOOR; y++) {
      c.fillStyle = rgba(P.roomDeep, 0.66 - 0.14 * (y - ROOM_FLOOR - 1) / (FLOOR - ROOM_FLOOR - 2));
      c.fillRect(0, y, ROOM_W, 1);
    }

    /* ONE RULER for all four bays, so they agree with each other: 1px is
       1.56cm, the room 24..194 is 2.65m, and a 75cm desk is 48 rows (floor
       194, desk top 146). Each bay owns 240 columns and its furniture is
       centred in them. The roofs of the far wall are at 96..118 (tower
       70), so rows 24..96 show over the fort all the time and the rest
       only through a doorway: the TOPS - shelves, shutters, the TV and its
       stone, the board's rail - carry each bay's identity, and the lower
       halves are right rather than rich. Flat rects, one lit row, one
       seam colour. */

    /* ---------------- x 0..240, THE DESK (js/desk.js: a white desk with
       two banks of shaker drawers, a knee hole full of cable, a monitor
       and a portrait screen, two floating shelves of keepsakes, the
       pothos off the shelf and a pot of ivy) */
    /* the two floating shelves, on the wall, x 70..170 */
    c.fillStyle = dim(D.shelfMid, 0.55);  c.fillRect(70, 62, 100, 3); c.fillRect(70, 88, 100, 3);
    c.fillStyle = dim(D.shelfDark, 0.5);  c.fillRect(70, 64, 100, 1); c.fillRect(70, 90, 100, 1);
    /* the top shelf's keepsakes, standing on row 61: a jar, the grey
       slab with its mark, a candle, a photo frame, the little skeleton
       and the green cube */
    c.fillStyle = mix(D.pages, P.roomWall, 0.5); c.fillRect(76, 56, 4, 6);
    c.fillStyle = dim(D.wallDark, 0.3);          c.fillRect(88, 56, 8, 6);
    c.fillStyle = P.roomDeep;                    c.fillRect(91, 58, 2, 1);
    c.fillStyle = dim(D.speaker, 0.5);           c.fillRect(104, 57, 3, 5);
    c.fillStyle = D.bezel;                       c.fillRect(116, 56, 7, 6);
    c.fillStyle = dim(D.wallLit, 0.4);           c.fillRect(117, 57, 5, 4);
    c.fillStyle = mix(D.speaker, P.roomWall, 0.4); c.fillRect(132, 56, 3, 6);
    c.fillStyle = P.roomDeep;                    c.fillRect(132, 57, 1, 1); c.fillRect(134, 57, 1, 1);
    c.fillStyle = dim(D.bookGreen, 0.4);         c.fillRect(150, 58, 4, 4);
    /* the lower shelf, standing on row 87: six red-and-white spines, the
       party hat and the wooden crane */
    for (i = 0; i < 6; i++) {
      c.fillStyle = i % 2 ? mix(mix(D.pages, '#ffffff', 0.3), P.roomWall, 0.5) : dim(D.bookRed, 0.5);
      c.fillRect(78 + i * 4, 81, 3, 7);
    }
    c.fillStyle = dim(D.bookYellow, 0.5);
    for (k = 0; k < 5; k++) c.fillRect(114 - (k >> 1), 83 + k, (k >> 1) * 2 + 1, 1);
    pline(c, 136, 87, 146, 80, dim(C.walnutLit, 0.4));
    c.fillStyle = dim(C.walnutLit, 0.4);         c.fillRect(135, 85, 2, 2);
    /* the pothos, five strands off the top shelf's right end, a leaf pair
       every three pixels */
    for (i = 0; i < 5; i++) {
      var vx = 150 + i * 6 + Math.floor(r() * 3), vl = 10 + Math.floor(r() * 17);
      for (j = 0; j < vl; j++) {
        var sway = Math.round(Math.sin(j * 0.32 + i) * 1.4);
        c.fillStyle = dim(D.ivyDark, 0.2);
        c.fillRect(vx + sway, 65 + j, 1, 1);
        if (j % 3 === 1) {
          c.fillStyle = dim(D.ivyMid, 0.18);
          c.fillRect(vx + sway + (j % 6 === 1 ? 1 : -2), 65 + j, 2, 1);
        }
      }
    }
    /* THE DESK, 150 wide at x 45..195, on the floor: its shadow, the top,
       two banks of three drawers reaching the floor, and the knee hole
       between them with a cable in it */
    contact(c, 47, 193);
    c.fillStyle = dim(D.deskTop, 0.66);    c.fillRect(45, 146, 150, 4);
    c.fillStyle = dim(D.deskLit, 0.62);    c.fillRect(45, 146, 150, 1);
    var face = dim(D.drawerFace, 0.7), faceLit = mix(face, D.deskLit, 0.25);
    c.fillStyle = P.roomDeep;              c.fillRect(93, 150, 54, 44);
    pline(c, 100, 193, 140, 160, mix(P.roomDeep, P.roomLit, 0.4));
    var banks = [49, 147];
    for (i = 0; i < 2; i++) {
      x = banks[i];
      c.fillStyle = face;                    c.fillRect(x, 150, 44, 44);
      c.fillStyle = dim(D.drawerShade, 0.6); c.fillRect(x, 164, 44, 1); c.fillRect(x, 178, 44, 1);
      c.fillStyle = faceLit;                 c.fillRect(x, 151, 44, 1); c.fillRect(x, 165, 44, 1); c.fillRect(x, 179, 44, 1);
      c.fillStyle = P.roomDeep;
      c.fillRect(x + 22, 157, 1, 1); c.fillRect(x + 22, 171, 1, 1); c.fillRect(x + 22, 185, 1, 1);
      c.fillStyle = dim(D.drawerShade, 0.5); c.fillRect(x, 192, 44, 2);
    }
    /* the monitor on its stand, and the screensaver: a RECTANGLE of the
       Desk's blue at 0.4 over the dark glass - the room's one glow, and
       never a disc */
    c.fillStyle = D.bezel;                  c.fillRect(76, 110, 44, 28);
    c.fillStyle = dim(D.bezelHi, 0.2);      c.fillRect(76, 110, 44, 1);
    c.fillStyle = P.roomWall;               c.fillRect(80, 114, 36, 20);
    c.fillStyle = rgba(P.monitorGlow, 0.4); c.fillRect(80, 114, 36, 20);
    c.fillStyle = rgba(D.screenLogo, 0.25); c.fillRect(94, 121, 8, 4);
    c.fillStyle = D.stand;                  c.fillRect(96, 138, 4, 8); c.fillRect(90, 144, 16, 2);
    /* the portrait screen beside it, asleep, on its own stand */
    c.fillStyle = D.bezel;                  c.fillRect(128, 108, 16, 30);
    c.fillStyle = dim(D.screenOff, 0.1);    c.fillRect(130, 110, 12, 26);
    c.fillStyle = dim(D.screenReflect, 0.6); c.fillRect(131, 111, 1, 12);
    c.fillStyle = D.stand;                  c.fillRect(135, 138, 2, 8);
    /* the pile of hardbacks ON THE DESK, left of the monitor and stacked
       up from the desk top (round 1 sank them half into the wall). In the
       Desk's covers mixed half into the wall: at full saturation the
       spines were the only saturated non-LED thing in the bay and read as
       a stack of pellets; the clamp holds their value, not their hue.
       x 46..49 rather than the brief's 50..53, so the widest pile ends on
       the monitor's bezel and never on its glass */
    var books = [[D.bookBlue, D.bookBlueHi], [D.bookRed, D.bookRedHi], [D.bookTan, D.bookTanHi],
                 [D.bookGreen, D.bookGreenHi], [D.bookYellow, D.bookYellowHi], [D.bookBlack, D.bookBlackHi]];
    y = 146;
    for (i = 0; i < books.length; i++) {
      var bw = 22 + Math.floor(r() * 7), bh = 4 + Math.floor(r() * 2), bx = 46 + Math.floor(r() * 4);
      y -= bh;
      c.fillStyle = mix(books[i][0], P.roomWall, 0.5); c.fillRect(bx, y, bw, bh);
      c.fillStyle = mix(books[i][1], P.roomWall, 0.5); c.fillRect(bx, y, bw, 1);
      c.fillStyle = dim(D.pages, 0.2);                c.fillRect(bx + bw - 2, y + 1, 2, bh - 1);
    }
    /* the pot of ivy at the desk's right end */
    c.fillStyle = dim(C.burnDeep, 0.2); c.fillRect(182, 138, 8, 8);
    c.fillStyle = dim(D.ivyMid, 0.3);
    c.fillRect(184, 133, 1, 5); c.fillRect(186, 131, 1, 7); c.fillRect(188, 134, 1, 4);

    /* ---------------- x 240..480, THE COUCH (js/couch.js: the grey
       microfibre sectional whose back is a row of separate four-button
       cushion panels, the cream-and-gold throw pillows, the plantation
       shutters along the top, the walnut coffee table) */
    /* the shutters, the Couch's own tile cropped 1:1 and sunk under the
       dark. Couch.build() has run (see build), so the canvas exists; if it
       somehow has not, the wall is simply bare there. */
    if (Couch.tiles.shutters) {
      c.drawImage(Couch.tiles.shutters.canvas, 0, 0, 240, 70, 240, 28, 240, 70);
      c.fillStyle = rgba(P.roomDeep, 0.55); c.fillRect(240, 28, 240, 70);
    }
    /* THE SECTIONAL, 156 wide at x 282..438, standing on the floor */
    contact(c, 280, 440);
    var sofa = dim(C.backMid, 0.45), crest = mix(C.seatHi, P.roomDeep, 0.4);
    /* the arms, full height to the base */
    c.fillStyle = sofa;  c.fillRect(282, 150, 6, 40); c.fillRect(432, 150, 6, 40);
    c.fillStyle = crest; c.fillRect(282, 150, 6, 1);  c.fillRect(432, 150, 6, 1);
    /* three back cushion panels with a lit crest, the dark valleys between
       them, and four buttons each in the Couch's wide rectangle */
    for (i = 0; i < 3; i++) {
      x = 288 + i * 48;
      c.fillStyle = sofa;      c.fillRect(x, 139, 46, 27);
      c.fillStyle = crest;     c.fillRect(x, 139, 46, 1);
      c.fillStyle = P.roomDeep;
      c.fillRect(x + 11, 147, 1, 1); c.fillRect(x + 34, 147, 1, 1);
      c.fillRect(x + 11, 157, 1, 1); c.fillRect(x + 34, 157, 1, 1);
      /* the valley after it: between two panels, and after the last
         one the two columns between the cushion and the right arm */
      c.fillRect(x + 46, 139, 2, 27);
    }
    /* the seat with its welt and one seam, the base under it, the feet */
    c.fillStyle = dim(C.backMid, 0.35);          c.fillRect(288, 166, 144, 12);
    c.fillStyle = mix(C.seatHi, P.roomDeep, 0.5); c.fillRect(288, 166, 144, 1);
    c.fillStyle = P.roomDeep;                    c.fillRect(360, 166, 1, 12);
    c.fillStyle = dim(C.seatShade, 0.3);         c.fillRect(288, 178, 144, 12);
    c.fillStyle = dim(C.walnut, 0.3);            c.fillRect(290, 190, 4, 4); c.fillRect(427, 190, 4, 4);
    /* two throw pillows sitting on the seat against the back */
    for (i = 0; i < 2; i++) {
      x = i ? 404 : 300;
      c.fillStyle = P.roomDeep;               c.fillRect(x - 1, 157, 16, 12);
      c.fillStyle = dim(C.pillowCream, 0.55); c.fillRect(x, 158, 14, 10);
      c.fillStyle = dim(C.pillowGold, 0.5);   c.fillRect(x + 5, 161, 3, 3);
    }
    /* THE WALNUT COFFEE TABLE in front of the sofa, its own shadow laid
       after the sofa's, the yellow book and the pot on its top */
    contact(c, 314, 374);
    c.fillStyle = C.walnut;            c.fillRect(312, 176, 64, 6);
    c.fillStyle = C.walnutLit;         c.fillRect(312, 176, 64, 1);
    c.fillStyle = dim(C.walnut, 0.4);  c.fillRect(316, 182, 3, 12); c.fillRect(370, 182, 3, 12);
    c.fillStyle = dim(P.bookYellow, 0.5); c.fillRect(322, 173, 16, 3);
    c.fillStyle = dim(D.pagesHi, 0.1);    c.fillRect(322, 173, 16, 1);
    /* the pot at x 344, not the brief's 352: the seat's seam at x 360
       showed over the table beside a pot at 352 and read as a cane in it */
    c.fillStyle = dim(C.burnDeep, 0.2);   c.fillRect(344, 170, 6, 6);
    c.fillStyle = dim(D.ivyMid, 0.3);
    c.fillRect(345, 166, 1, 4); c.fillRect(347, 164, 1, 6); c.fillRect(349, 167, 1, 3);

    /* ---------------- x 480..720, THE MANTLE (js/mantle.js, Mantle ref 1
       and 2: a floor-to-ceiling LEDGER-STONE chimney breast, the switched-
       off flatscreen MOUNTED on it, and under the TV the chunky black
       painted mantel shelf with the soundbar on it; ref 2 shows the stone
       running on below the shelf, and no firebox) */
    /* THE CHIMNEY BREAST, x 530..690, rows 24..193, in the Mantle's own
       course: pieces 14..44 long (its course() numbers), each with a 1px
       lit top, 4 or 5 rows tall over a 6px pitch so the joint under a
       course wanders. At 9..22 long, all 5 tall and butted, the stone read
       as BRICKS - ledger stone is long thin slices, not a wall of units */
    contact(c, 528, 692);
    /* The piece mix is the Mantle's own STONES (js/mantle.js): white and
       cream 3 each, grey-green and grey 2, tan 2, dark 1, and NO rust. An
       even pick over seven colours made tan+rust+dark 3 in 7 and, at 0.62
       dim over the cardboard, the breast read as a brown BRICK chimney;
       Mantle ref 2 is mostly white/cream/grey-green. One r() per piece as
       before, so the rest of the room's seeded layout does not move */
    var stones = [M.stoneWhite, M.stoneWhite, M.stoneWhite,
                  M.stoneCream, M.stoneCream, M.stoneCream,
                  M.stoneGreyGreen, M.stoneGreyGreen,
                  M.stoneGrey, M.stoneGrey,
                  M.stoneTan, M.stoneTan,
                  M.stoneDark];
    for (j = 0; j < 29; j++) {
      var cy = CEIL + j * 6, ch = Math.min(6, ROOM_FLOOR - cy);
      c.fillStyle = dim(M.stoneJoint, 0.3); c.fillRect(530, cy, 160, ch);
      x = 530 - Math.floor(r() * 20);
      while (x < 690) {
        var sw = 14 + Math.floor(r() * 31), sh = Math.min(r() < 0.5 ? 4 : 5, ch);
        var sx0 = Math.max(530, x), sx1 = Math.min(x + sw - 1, 690);
        var sCol = stones[Math.floor(r() * stones.length)];
        if (sx1 > sx0) {
          c.fillStyle = dim(sCol, 0.62);      c.fillRect(sx0, cy, sx1 - sx0, sh);
          c.fillStyle = dim(M.stoneLit, 0.55); c.fillRect(sx0, cy, sx1 - sx0, 1);
        }
        x += sw;
      }
    }
    /* the breast stands proud of the plaster: a dark column down each side */
    c.fillStyle = dim(M.stoneDark, 0.4); c.fillRect(530, CEIL, 1, ROOM_FLOOR - CEIL); c.fillRect(689, CEIL, 1, ROOM_FLOOR - CEIL);
    /* THE TELEVISION, 96x54, mounted on the stone - nothing under it but
       stone, eight rows of it showing above the shelf (Mantle ref 1) */
    c.fillStyle = M.bezel;              c.fillRect(562, 62, 96, 54);
    c.fillStyle = dim(M.bezelHi, 0.2);  c.fillRect(562, 62, 96, 1); c.fillRect(562, 62, 1, 54); c.fillRect(657, 62, 1, 54);
    c.fillStyle = M.screenDeep;         c.fillRect(564, 64, 92, 50);
    c.fillStyle = dim(M.reflShutter, 0.5); c.fillRect(570, 68, 18, 1);     /* a reflection */
    /* THE MANTEL SHELF, an 11-row block of black painted wood (Mantle ref
       2): its gloss row (the clamp holds it at 96), the top, the bevel,
       the face, and the two dark ends */
    c.fillStyle = M.mantleGloss; c.fillRect(536, 124, 148, 1);
    c.fillStyle = M.mantleTop;   c.fillRect(536, 125, 148, 2);
    c.fillStyle = M.mantleBevel; c.fillRect(536, 127, 148, 1);
    c.fillStyle = M.mantleFace;  c.fillRect(536, 128, 148, 7);
    c.fillStyle = M.mantleDeep;  c.fillRect(536, 124, 1, 11); c.fillRect(683, 124, 1, 11);
    /* the soundbar on it. No capybara and no remotes: a yellow blob back
       here would be a pellet */
    c.fillStyle = M.remoteBody;  c.fillRect(580, 120, 60, 4);
    c.fillStyle = M.remoteLit;   c.fillRect(580, 120, 60, 1);

    /* ---------------- x 720..960, THE WHITEBOARD (js/whiteboard.js: a
       board on a ROLLING ALUMINIUM FRAME - two uprights on feet, a top rail
       with tape on it, a pen tray) */
    contact(c, 794, 885);
    c.fillStyle = dim(W.alumDark, 0.55);
    c.fillRect(808, 78, 2, 112); c.fillRect(868, 78, 2, 112);       /* uprights */
    c.fillRect(796, 190, 27, 4); c.fillRect(856, 190, 27, 4);       /* foot bars */
    c.fillStyle = P.roomDeep;                                       /* casters */
    c.fillRect(796, 192, 2, 2); c.fillRect(821, 192, 2, 2);
    c.fillRect(856, 192, 2, 2); c.fillRect(881, 192, 2, 2);
    c.fillStyle = dim(W.alumMid, 0.62);
    c.fillRect(804, 80, 70, 4);                                     /* top rail */
    c.fillRect(804, 128, 70, 3);                                    /* pen tray */
    c.fillStyle = dim(W.tape, 0.5); c.fillRect(846, 80, 8, 2); c.fillRect(816, 80, 5, 2);
    /* the board at half of its white over the wall (the clamp then sets
       its value at 96) inside a 1px aluminium frame, and the marks at 0.6
       of their inks: the blue parabola, a blue stroke and a purple game of
       noughts and crosses - a board with writing on it, where 0.18 was a
       grey rectangle */
    var board = mix(P.roomWall, W.board, 0.5);
    c.fillStyle = dim(W.alumMid, 0.5); c.fillRect(806, 84, 66, 44);
    c.fillStyle = board;               c.fillRect(807, 85, 64, 42);
    var ink = mix(board, W.inkBlue, 0.6);
    for (i = 0; i < 16; i++) {
      var u = (i - 8) / 8;
      c.fillStyle = ink;
      c.fillRect(818 + i, 110 - Math.round((1 - u * u) * 14), 1, 2);
    }
    pline2(c, 846, 118, 862, 104, ink);
    c.fillStyle = mix(board, W.inkPurple, 0.6);
    c.fillRect(852, 90, 1, 7); c.fillRect(854, 90, 1, 7);
    c.fillRect(850, 92, 7, 1); c.fillRect(850, 94, 7, 1);

    /* the two pendants, off: one over the sofa, one over the board */
    pendant(c, 400);
    pendant(c, 880);

    clampValue(t, VALUE_CEIL);
    return t;
  }

  /* ======================================== the far wall of the fort

     LAYER 2, 384x218 at 0.30: the fort's far side, PLAIN kraft panels (no
     print: at this distance the print is a texture the eye cannot resolve,
     and a printed far wall competed with the near wall's) in two faces of
     shadow, 96px each, two courses tall with a seam at y 146. Roof heights
     per panel 118, 96, (none), 104, and ONE TOWER: panel 1 carries a
     half-height panel to y 70 with the yellow gable on it (ref 6: the
     yellow triangle with two fat connectors gripping its corner).

     THE DOORWAY. Panel 2 is missing. Through the gap the room shows: its
     wall, its skirting and its floor, at the room's own 0.12.

     THE PROJECTOR on its box sits on panel 3's roof (ref 6) and throws a
     picture back across the fort onto panel 0: a three-step wedge of
     beam with a 1px core, dimmer with distance, and a soft-edged 40x28
     picture whose FRAME is picked live by drawBackdrop off the scroll.

     The green chamber's light reaches this wall too: panel 1's holes are
     dim green SMEARS rather than white dots. Everywhere else the holes
     leak WHITE - a third of them, three pixels across, no halo - and the
     four-way seam junctions leak a white diamond. That is all the white
     light in the bay, and it is all on the slowest wall in it. */
  var FAR_W = 384;
  var FAR_SEAM = 146;

  /* the blue strip's light along a roof edge: one row inside the outline,
     laid by the caller under source-atop */
  function rakeRoof(c, x, top, w) {
    c.fillStyle = rgba(P.ledBlueCore, 0.18);
    c.fillRect(x + 1, top + 1, w - 2, 1);
  }
  var FAR = [
    { x: 0,   w: 96, top: 118, face: 'kraftShade', leak: true, ports: 1 },
    { x: 96,  w: 96, top: 96,  face: 'kraftDeep',  dim: true,  ports: 2, tower: true },
    { x: 288, w: 96, top: 104, face: 'kraftShade', leak: true, ports: 1, projector: true }
  ];
  var DOOR_FAR = [192, 288];
  var PICTURE = { x: 40, y: 130, w: 40, h: 28 };
  var LENS = { x: 304, y: 85 };

  function bakeFar() {
    var t = makeCanvas(FAR_W, FLOOR - CEIL), c = t.ctx;
    var r = mulberry32(8803);
    var lights = [], i, k, x, y;
    c.setTransform(1, 0, 0, 1, 0, -CEIL);

    for (i = 0; i < FAR.length; i++) {
      var p = FAR[i];
      var nextToDoor = { l: p.x === DOOR_FAR[1], r: p.x + p.w === DOOR_FAR[0] };
      var side = function (isDoor) { return isDoor ? 'sky' : 'seam'; };
      var o = { mode: 'far', face: P[p.face], seed: 900 + i * 37, biteR: 2, numeral: false,
                leak: !!p.leak, dimSmear: !!p.dim, lights: lights };
      /* the upper course, roof edge to the seam */
      o.ports = 0;
      o.edges = { t: 'sky', b: 'seam', l: side(nextToDoor.l), r: side(nextToDoor.r) };
      paintPanel(c, p.x, p.top, p.w, FAR_SEAM - p.top, o);
      /* and the lower, seam to floor */
      o.seed += 11; o.ports = p.ports;
      o.edges = { t: 'seam', b: null, l: side(nextToDoor.l), r: side(nextToDoor.r) };
      paintPanel(c, p.x, FAR_SEAM, p.w, FLOOR - FAR_SEAM, o);
    }

    /* THE TOWER and its gable, over panel 1 */
    paintPanel(c, 96, 70, 96, 26, { mode: 'far', face: P.kraftShade, seed: 977, biteR: 2,
                                    edges: { t: 'sky', b: 'seam', l: 'sky', r: 'sky' }, lights: lights });
    /* THE FAR WALL IS IN SHADOW TOO, and under the value rule: kraftShade
       is 107 as a pigment, which is over the 96 nothing behind a plank may
       pass. A smoothstep of the void from 0.18 at the tower's top to 0.32
       at the floor puts its lit face at 89 at the roofline and lower all
       the way down - source-atop, so the doorway and the sky over the
       roofs stay open. The gable, the projector and the lights go on
       AFTER it: they are what the room's light is landing on. */
    c.globalCompositeOperation = 'source-atop';
    for (y = 52; y < FLOOR; y++) {
      c.fillStyle = rgba(P.void, 0.18 + 0.14 * ease((y - 70) / (FLOOR - 70)));
      c.fillRect(0, y, FAR_W, 1);
    }
    /* THE STRIP RAKES THE ROOFS (ref 2: the roof edges are the brightest
       kraft in the frame) - a row of its core at 0.18 just inside every
       top edge that faces the room, after the wash so the wash does not
       eat it, and still source-atop so a bite's cleared notch stays sky */
    for (i = 0; i < FAR.length; i++) rakeRoof(c, FAR[i].x, FAR[i].tower ? 70 : FAR[i].top, FAR[i].w);
    c.globalCompositeOperation = 'source-over';

    /* The gable's yellow is the plan's panelYellow sunk a third of the way
       into the room's dark - 128 rather than 170. It is the one saturated
       thing on the far wall and it sits at y 52..70, where the top column
       of every plank passes in front of it; at full strength it out-lit the
       pillar face it is behind, which is the value rule broken by the one
       shape in the bay that is not cardboard-coloured. */
    var gY = mix(P.panelYellow, P.roomDeep, 0.3);
    var gx0 = 106, gx1 = 182, gApex = 52, gBase = 70, gMid = (gx0 + gx1) / 2;
    for (y = gApex; y < gBase; y++) {
      var f = (y - gApex) / (gBase - gApex);
      var hw = Math.round(f * (gx1 - gx0) / 2);
      c.fillStyle = gY; c.fillRect(Math.round(gMid - hw), y, hw * 2, 1);
      c.fillStyle = P.outline;
      c.fillRect(Math.round(gMid - hw) - 1, y, 1, 1); c.fillRect(Math.round(gMid + hw), y, 1, 1);
      /* the lit slope on the left, toward the strip */
      c.fillStyle = mix(gY, P.panelYellow, 0.6); c.fillRect(Math.round(gMid - hw), y, 1, 1);
    }
    c.fillStyle = mix(gY, P.kraftDeep, 0.45); c.fillRect(gx0, gBase - 1, gx1 - gx0, 1);
    /* the bites along its slopes: a notch every 10px, cleared, with the
       corrugation showing at the bottom of each */
    for (k = 1; k < 4; k++) {
      var ny = gApex + k * 4 + 1, nhw = Math.round(((ny - gApex) / (gBase - gApex)) * (gx1 - gx0) / 2);
      c.clearRect(Math.round(gMid - nhw), ny, 2, 2); c.clearRect(Math.round(gMid + nhw) - 1, ny, 2, 2);
      c.fillStyle = P.outline;
      c.fillRect(Math.round(gMid - nhw) + 2, ny, 1, 2); c.fillRect(Math.round(gMid + nhw) - 2, ny, 1, 2);
    }
    /* a seam line down the gable where two yellow panels meet (ref 6) */
    pline(c, gMid + 6, gApex + 4, gMid + 14, gBase - 1, mix(gY, P.kraftDeep, 0.5));

    /* THE DOORWAY (DOOR_FAR) is left CLEAR from the roofline to the
       floor: nothing is baked into it, and the room tile shows through -
       its wall, its skirting and its floor plane - which is what a missing
       panel shows. Round 1 laid a patch of the shag rug in it with a blue
       sleeping bag on top; the owner could not tell what the bag was, and
       the shag rug is a different room (Fort ref 2, 5), so both went. */

    /* THE PROJECTOR on its box, on panel 3's roof (ref 6). The box is the
       kit's own carton - with a handle slot and no lettering, because
       this file prints no letters - and the cable trails down its side. */
    c.fillStyle = P.boxBrown;                       c.fillRect(300, 90, 30, 14);
    c.fillStyle = mix(P.boxBrown, P.kraftLit, 0.4); c.fillRect(300, 90, 30, 1);
    c.fillStyle = mix(P.boxBrown, P.void, 0.35);    c.fillRect(329, 91, 1, 13);
    c.fillStyle = P.outline;                        c.fillRect(312, 96, 6, 2);
    c.fillStyle = P.projWhite;                      c.fillRect(304, 81, 22, 9);
    c.fillStyle = mix(P.projWhite, '#ffffff', 0.5); c.fillRect(304, 81, 22, 1);
    c.fillStyle = mix(P.projWhite, P.void, 0.35);
    for (i = 0; i < 4; i++) c.fillRect(314 + i * 3, 83, 1, 5);      /* the grille */
    c.fillRect(304, 89, 22, 1);
    c.fillStyle = P.outline;                        c.fillRect(303, 83, 3, 4);
    c.fillStyle = P.projBeam;                       c.fillRect(304, 84, 2, 2);      /* the lens */
    c.fillStyle = P.projCable;
    c.fillRect(326, 86, 3, 1); c.fillRect(330, 87, 1, 17);

    /* the beam, a wedge from the lens to the picture in three steps of
       alpha - brightest at the lens, as a beam in a dusty room is (ref 6:
       a visible shaft). At 0.10 / 0.06 / 0.03 the wedge was invisible at
       1x, and the picture it lands on was a box with no reason to be
       there - every wide shot read it as a stuck sprite. 0.16 / 0.10 /
       0.05 and a 1px core from the lens to the picture's centre at 0.30
       tie the two together: a projector, throwing. */
    for (x = PICTURE.x + PICTURE.w; x < LENS.x; x++) {
      var tt = (x - (PICTURE.x + PICTURE.w)) / (LENS.x - (PICTURE.x + PICTURE.w));
      var y0 = Math.round(lerp(PICTURE.y, LENS.y, tt)), y1 = Math.round(lerp(PICTURE.y + PICTURE.h, LENS.y + 2, tt));
      c.fillStyle = rgba(P.projBeam, tt > 0.66 ? 0.16 : (tt > 0.33 ? 0.10 : 0.05));
      c.fillRect(x, y0, 1, Math.max(1, y1 - y0));
    }
    var pcx = PICTURE.x + PICTURE.w / 2, pcy = PICTURE.y + PICTURE.h / 2;
    c.fillStyle = rgba(P.projBeam, 0.30);
    for (x = Math.round(pcx); x < LENS.x; x++) {
      c.fillRect(x, Math.round(lerp(pcy, LENS.y + 1, (x - pcx) / (LENS.x - pcx))), 1, 1);
    }
    /* the picture's screen: the beam landing on the panel. What is ON it
       is live - see drawBackdrop and T.movie. A projected picture has no
       crisp edge on cardboard: the hard 0.18 rectangle was the one thing
       in the bay that looked like a bug, so it is 0.10 inside and 0.05 on
       a 2px border all round - the CONTENT (bakeMovie) is what reads */
    c.fillStyle = rgba(P.projBeam, 0.05);
    c.fillRect(PICTURE.x, PICTURE.y, PICTURE.w, 2);
    c.fillRect(PICTURE.x, PICTURE.y + PICTURE.h - 2, PICTURE.w, 2);
    c.fillRect(PICTURE.x, PICTURE.y + 2, 2, PICTURE.h - 4);
    c.fillRect(PICTURE.x + PICTURE.w - 2, PICTURE.y + 2, 2, PICTURE.h - 4);
    c.fillStyle = rgba(P.projBeam, 0.10);
    c.fillRect(PICTURE.x + 2, PICTURE.y + 2, PICTURE.w - 4, PICTURE.h - 4);

    drawLights(c, lights);

    /* THE CONNECTORS, the far wall's: foamLit and never full black */
    /* across the vertical seams: panel 0 / 1 at x 96, and the tile's own
       edge, where panel 3 meets the next tile's panel 0 - stamped at both
       ends so the two halves make one dash across the join */
    for (y = FLOOR - 24; y > 118 + 4; y -= 48) {
      c.drawImage(T.dashFar.canvas, 96 - 2, y - 1);
      c.drawImage(T.dashFar.canvas, -2, y - 1);
      c.drawImage(T.dashFar.canvas, FAR_W - 3, y - 1);
    }
    /* across the course seam at 146, every 48 */
    for (i = 0; i < FAR.length; i++) {
      for (x = FAR[i].x + 24; x < FAR[i].x + FAR[i].w; x += 48) c.drawImage(T.dashFarV.canvas, x - 1, FAR_SEAM - 2);
    }
    /* standing proud of the roof edges, every 48 - not under the box */
    for (i = 0; i < FAR.length; i++) {
      var ry = FAR[i].tower ? 70 : FAR[i].top;
      for (x = FAR[i].x + 24; x < FAR[i].x + FAR[i].w; x += 48) {
        if (FAR[i].projector && x > 294 && x < 336) continue;
        if (FAR[i].tower && x > gx0 - 4 && x < gx1 + 4) continue;
        c.drawImage(T.bumpFar.canvas, x - 3, ry - 4);
      }
    }
    /* two fat connectors gripping the gable's corners (ref 6) */
    c.drawImage(T.bumpFar.canvas, gx0 - 4, gBase - 4); c.drawImage(T.bumpFar.canvas, gx0 - 4, gBase - 1);
    c.drawImage(T.bumpFar.canvas, gx1 - 3, gBase - 4); c.drawImage(T.bumpFar.canvas, gx1 - 3, gBase - 1);
    /* where four panels meet, a white DIAMOND of seam light */
    drawLights(c, [['diamond', 96, FAR_SEAM], ['diamond', 0, FAR_SEAM], ['diamond', FAR_W, FAR_SEAM]]);
    return t;
  }

  /* ======================================= the near wall: the hero tile

     LAYER 3, 480x218 at 0.55, two variants picked per world column by
     hash (the Whiteboard's k-loop): THE INSIDE OF THE FORT, IN SHADOW.
     Printed panels in COOL shaded kraft - the face 68, its lip 93, its
     print 41, turned toward the strip's slate - and then a smoothstep
     wash of the void over the whole tile, 0.15 at the highest roof rising to 0.35 at the floor, so the foot of the wall,
     which is where the Cupmen stand and where the pillars' lower columns
     are read against it, is the darkest wall in the room. The figures are
     in MEASURED, in the header.

     PER-PANEL ROOF HEIGHTS (ref 2, ref 5: no two panels the same), a GAP
     per tile - a doorway, through which the far wall and the room show -
     and the panels are not all the plan's 120: a doorway is a missing
     strip of wall, so the panel beside it is a half panel and the one
     past it a wide one, which the kit has as well (ref 3: the box of
     panels holds three sizes). Each variant has:
       - ONE GREEN-LIT PANEL, the chamber: lit cardboard (toneFor), holes
         as smears, beaded seams, two FACE-ON biscuits at its hero corners,
         three half-round bites of LED along its foot and the light
         spilling out under it in a 24-row ramp - ref 2 and ref 5's
         strongest image - with the breathing pool laid live over it
       - the yellow GABLE on a roof edge, never below y 150
       - ONE FOLD (ref 6)
       - a prop: the tablet lying on a roof on variant 0. Round 1 also
         leant a tripod on variant 0 and hung a ribbon pull-tab off a roof
         on variant 1; the tripods and ribbons left the bay as hazards in
         round 2, and the scenery ones went with them - the same look,
         and nothing for it to mean any more
     Bumps every 48 along every roof edge, dashes every 48 across every
     seam, and PORTHOLES that are cut clean through.

     THE BADGE is on HALF the printed panels, as in ref 2 and ref 5, named
     per panel in the table below (`badge`) and never on the lit one. The
     list is data rather than a hash of the panel's seed: on these eight
     seeds hash(seed + i) % 2 came out even for five of the six wide
     panels, which is a hash of consecutive integers being honest about
     its low bit, not a thinning.

     The plan put the tablet at x 150, y 124, which on variant 0 is in the
     air over the low lit panel; it lies on panel 0's roof instead, which
     is where a tablet put down on a fort would be. */
  var NEAR_W = 480;
  var NEAR = [
    { door: [300, 340], tablet: { x: 76, y: 124 }, gable: { x: 26, w: 40 },
      panels: [
        { x: 0,   w: 120, top: 128, ports: 2, big: 2, badge: true },
        { x: 120, w: 120, top: 190, ports: 1, big: 0, lit: true },
        { x: 240, w: 60,  top: 140, ports: 1, big: 1, fold: true, badge: true },
        { x: 340, w: 140, top: 164, ports: 2, big: 2 }
      ] },
    { door: [60, 100], gable: { x: 150, w: 44 },
      panels: [
        { x: 0,   w: 60,  top: 150, ports: 1, big: 1 },
        { x: 100, w: 140, top: 120, ports: 2, big: 2, fold: true, badge: true },
        { x: 240, w: 120, top: 182, ports: 1, big: 0, lit: true },
        { x: 360, w: 120, top: 136, ports: 2, big: 2, badge: true }
      ] }
  ];
  var NEAR_WASH_FROM = 120;

  function litPanel(v) {
    var ps = NEAR[v].panels;
    for (var i = 0; i < ps.length; i++) if (ps[i].lit) return ps[i];
    return null;
  }

  function bakeNear(v) {
    var L = NEAR[v];
    var t = makeCanvas(NEAR_W, FLOOR - CEIL), c = t.ctx;
    var lights = [], i, k, x, y, p;
    c.setTransform(1, 0, 0, 1, 0, -CEIL);

    for (i = 0; i < L.panels.length; i++) {
      p = L.panels[i];
      var lDoor = p.x === L.door[1], rDoor = p.x + p.w === L.door[0];
      paintPanel(c, p.x, p.top, p.w, FLOOR - p.top, {
        mode: 'near', lit: !!p.lit, print: true, big: p.big, badge: !!p.badge, numeral: true,
        ports: p.ports, fold: !!p.fold, seed: 7100 + v * 131 + i * 17, biteR: 3,
        edges: { t: 'sky', b: null, l: lDoor ? 'sky' : 'seam', r: rDoor ? 'sky' : 'seam' },
        lights: lights
      });
    }

    /* THE GABLE, a yellow triangle standing on a roof edge (ref 6), in
       the near wall's darker yellow and never below 150: a yellow shape
       must never sit in the band the floor shooters fire through */
    var host = null;
    for (i = 0; i < L.panels.length; i++) {
      if (L.gable.x >= L.panels[i].x && L.gable.x + L.gable.w <= L.panels[i].x + L.panels[i].w) host = L.panels[i];
    }
    if (host) {
      var gb = host.top, gh = Math.round(L.gable.w * 0.42), gm = L.gable.x + L.gable.w / 2;
      for (y = gb - gh; y < gb; y++) {
        var hw = Math.round(((y - (gb - gh)) / gh) * L.gable.w / 2);
        c.fillStyle = P.panelYellowDk; c.fillRect(Math.round(gm - hw), y, hw * 2, 1);
        c.fillStyle = P.outline;
        c.fillRect(Math.round(gm - hw) - 1, y, 1, 1); c.fillRect(Math.round(gm + hw), y, 1, 1);
      }
      c.fillStyle = mix(P.panelYellowDk, P.kraftIn, 0.5); c.fillRect(L.gable.x, gb - 1, L.gable.w, 1);
      /* two bites on its slopes */
      c.clearRect(Math.round(gm - L.gable.w * 0.25), gb - Math.round(gh * 0.5), 2, 2);
      c.clearRect(Math.round(gm + L.gable.w * 0.25) - 1, gb - Math.round(gh * 0.5), 2, 2);
    }

    /* THE TABLET, lying on a roof edge (ref 2, ref 5): the slab and its
       glass. Its glow is live - see drawBackdrop. */
    if (L.tablet) {
      c.fillStyle = P.tablet;      c.fillRect(L.tablet.x, L.tablet.y, 26, 4);
      c.fillStyle = P.tabletGlass; c.fillRect(L.tablet.x + 1, L.tablet.y, 24, 1);
      c.fillStyle = P.outline;     c.fillRect(L.tablet.x, L.tablet.y + 3, 26, 1);
    }

    /* THE WASH: the inside of the fort in shadow. A smoothstep of the void
       laid row by row - no edge - and SOURCE-ATOP, so the doorway, the
       portholes and the sky over the roofs stay clear for the layers
       behind to show through */
    c.globalCompositeOperation = 'source-atop';
    for (y = NEAR_WASH_FROM; y < FLOOR; y++) {
      c.fillStyle = rgba(P.void, 0.15 + 0.20 * ease((y - NEAR_WASH_FROM) / (FLOOR - NEAR_WASH_FROM)));
      c.fillRect(0, y, NEAR_W, 1);
    }
    /* the strip raking every roof, as on the far wall */
    for (i = 0; i < L.panels.length; i++) rakeRoof(c, L.panels[i].x, L.panels[i].top, L.panels[i].w);

    /* THE SPILL under the lit panel (ref 2, ref 5): the light pours out
       under the wall onto the floor. A 24-row ramp of the LED's dim up the
       foot of the panel and twelve pixels past each side of it, also
       source-atop so it lands only on cardboard */
    var lp = litPanel(v);
    if (lp) {
      /* soft both ways: the ramp up the wall, and the fall-off sideways
         over the 24 pixels past each side of the panel, so the spill has
         no edge anywhere - a lit rectangle on a dark wall is exactly the
         hard edge this room's lighting pass was rebuilt to get rid of */
      for (y = FLOOR - 24; y < FLOOR; y++) {
        var a = 0.25 * ease((y - (FLOOR - 24)) / 24);
        for (x = lp.x - 24; x < lp.x + lp.w + 24; x++) {
          var out = x < lp.x ? (lp.x - x) / 24 : (x >= lp.x + lp.w ? (x - lp.x - lp.w + 1) / 24 : 0);
          c.fillStyle = rgba(P.ledGreenDim, a * (1 - ease(out)));
          c.fillRect(x, y, 1, 1);
        }
      }
    }
    c.globalCompositeOperation = 'source-over';

    /* and the LED itself in three half-round bites along the panel's foot,
       at half alpha: half discs cut into the bottom edge, which is where
       the light actually gets out */
    if (lp) {
      for (k = 1; k <= 3; k++) {
        var bx = lp.x + Math.round(lp.w * k / 4);
        for (var dy = 0; dy <= 4; dy++) {
          var bw2 = Math.floor(Math.sqrt(Math.max(0, 20.25 - dy * dy)));
          c.fillStyle = rgba(dy < 2 ? P.ledGreenCore : P.ledGreen, 0.5);
          c.fillRect(bx - bw2, FLOOR - 1 - dy, bw2 * 2 + 1, 1);
        }
      }
    }

    drawLights(c, lights);

    /* THE CONNECTORS, black: bumps along every roof edge, dashes across
       every seam, both every 48 and both seated in a bite */
    for (i = 0; i < L.panels.length; i++) {
      p = L.panels[i];
      for (x = p.x + 24; x < p.x + p.w - 4; x += 48) {
        if (L.tablet && x > L.tablet.x - 4 && x < L.tablet.x + 30 && p.top === L.tablet.y + 4) continue;
        if (x > L.gable.x - 4 && x < L.gable.x + L.gable.w + 4 && host === p) continue;
        c.drawImage(T.bump.canvas, x - 3, p.top - 3);
      }
      /* across the seam on this panel's left, from the lower of the two
         roofs down; a doorway has no seam */
      if (p.x === L.door[1]) continue;
      var prev = i ? L.panels[i - 1] : L.panels[L.panels.length - 1];
      var from = Math.max(p.top, prev.top) + 6;
      for (y = FLOOR - 24; y > from; y -= 48) {
        c.drawImage(T.dash.canvas, p.x - 2, y - 1);
        if (p.x === 0) c.drawImage(T.dash.canvas, NEAR_W - 3, y - 1);
      }
    }
    /* the two face-on biscuits, at the lit panel's hero corners only */
    if (lp) {
      c.drawImage(T.face.canvas, lp.x - 4, lp.top + 4);
      c.drawImage(T.face.canvas, lp.x + lp.w - 5, lp.top + 4);
    }
    return t;
  }

  /* THE GREEN CHAMBER'S BREATH: a soft ellipse of the LED, 96x72, peak
     0.30 at its centre and gone at its rim, the LivingRoom pendant pool's
     pattern turned on its side. Blitted live at an alpha that rides a sine
     of the scroll - see drawBackdrop. */
  var POOL_W = 96, POOL_H = 72, POOL_A = 0.30;
  function bakePool() {
    var t = makeCanvas(POOL_W, POOL_H), c = t.ctx;
    for (var y = 0; y < POOL_H; y++) {
      for (var x = 0; x < POOL_W; x++) {
        var dx = (x + 0.5 - POOL_W / 2) / (POOL_W / 2), dy = (y + 0.5 - POOL_H / 2) / (POOL_H / 2);
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1) continue;
        c.fillStyle = rgba(P.ledGreen, POOL_A * (1 - ease(d)));
        c.fillRect(x, y, 1, 1);
      }
    }
    return t;
  }

  /* THE PICTURE ON THE FAR PANEL: four frames of a cartoon moon drifting
     across a starfield, the kind of thing a projector in a fort shows.
     Four stars move one pixel a frame, the moon six. The moon is at 0.55
     and the stars 0.5: at a third of an alpha the content vanished into
     the brown and only the frame read, a ghost box; it is the crescent
     the eye must land on, so it is the brightest thing the beam lays
     down, with a 0.15 halo row, 5 wide, above its top and below its foot. */
  function bakeMovie(f) {
    var t = makeCanvas(PICTURE.w, PICTURE.h), c = t.ctx;
    var stars = [[5, 6], [17, 21], [29, 4], [35, 15]];
    c.fillStyle = rgba(P.projWhite, 0.5);
    for (var i = 0; i < stars.length; i++) c.fillRect(wrap(stars[i][0] - f, PICTURE.w), stars[i][1], 1, 1);
    var mx = 8 + f * 6, my = 12 - (f % 2);
    c.fillStyle = rgba(P.projWhite, 0.15);
    c.fillRect(mx - 2, my - 4, 5, 1); c.fillRect(mx - 2, my + 4, 5, 1);
    c.fillStyle = rgba(P.projWhite, 0.55);
    for (var dy = -3; dy <= 3; dy++) {
      var hw = Math.floor(Math.sqrt(12.25 - dy * dy));
      c.fillRect(mx - hw, my + dy, hw * 2 + 1, 1);
    }
    /* the bite out of it that makes it a crescent */
    c.clearRect(mx + 1, my - 2, 2, 4);
    c.fillStyle = rgba(P.projBeam, 0.2); c.fillRect(mx + 1, my - 2, 2, 4);
    return t;
  }

  /* ===================================================== the roof edge

     This bay's own ceiling band, 240x24 like the room's so it tiles on the
     room's beat, row 23 hard on the kill line and nothing solid below it.
     From the top down:
       rows 0..13   THE DARK ROOM over the fort, ramped row by row from
                    roomDeep to roomWall so the band has no edge, with the
                    room's one-in-forty tooth - and THE BLUE LED STRIP on
                    rows 1..3 (ref 2, 5, 6), a diode of ledBlueCore every
                    6px on row 2, and a ramp of its deep blue under it from
                    0.55 at row 4 to nothing at row 12. It was two rows and
                    gone by row 7, a line; in ref 2, 5 and 6 the violet-blue
                    band is the first thing in every wide shot, the room's
                    second light
       rows 14..22  THE ROOF PANEL, seen edge on and from underneath: its
                    lit edge, six rows of kraft with a row of holes in it,
                    two rows of shade, and connectors HANGING under it
                    every 48px with the slot side down - and its underside
                    SCALLOPED, a half-round bite every 16px cut up into the
                    last two rows, so the lethal line has teeth and reads
                    as cardboard and not as a ruled line
       row 23       the outline, hard, full width: the kill line */
  var TOP_W = 240;
  function bakeTop() {
    var t = makeCanvas(TOP_W, CEIL), c = t.ctx;
    var r = mulberry32(2405);
    var x, y, k;
    for (y = 0; y < 14; y++) {
      c.fillStyle = P.roomDeep; c.fillRect(0, y, TOP_W, 1);
      c.fillStyle = rgba(P.roomWall, (y + 0.5) / 14); c.fillRect(0, y, TOP_W, 1);
    }
    for (y = 0; y < 14; y++) {
      for (x = 0; x < TOP_W; x++) {
        if (r() > 0.025) continue;
        c.fillStyle = r() < 0.5 ? P.roomLit : P.roomDeep;
        c.fillRect(x, y, 1, 1);
      }
    }
    /* the strip */
    c.fillStyle = P.ledBlue; c.fillRect(0, 1, TOP_W, 3);
    c.fillStyle = P.ledBlueCore;
    for (x = 2; x < TOP_W; x += 6) c.fillRect(x, 2, 1, 1);
    for (y = 4; y < 12; y++) {
      c.fillStyle = rgba(P.ledBlueDeep, 0.55 * (1 - (y - 4) / 8));
      c.fillRect(0, y, TOP_W, 1);
    }
    /* the roof panel's edge */
    c.fillStyle = P.kraftLit;   c.fillRect(0, 14, TOP_W, 1);
    c.fillStyle = P.kraft;      c.fillRect(0, 15, TOP_W, 6);
    for (x = 0; x < TOP_W; x++) {
      if (r() > 0.12) continue;
      c.fillStyle = r() < 0.5 ? P.kraftMid : P.kraftLit;
      c.fillRect(x, 15 + Math.floor(r() * 6), Math.min(2, TOP_W - x), 1);
    }
    for (x = 12; x < TOP_W; x += 24) plus(c, x, 17, P.holeDark);
    c.fillStyle = P.kraftShade; c.fillRect(0, 21, TOP_W, 1);
    c.fillStyle = P.kraftDeep;  c.fillRect(0, 22, TOP_W, 1);
    /* the scalloped underside: bites cut UP into rows 21..22, their inside
       the dark room seen through them */
    for (x = 8; x < TOP_W; x += 16) {
      for (var dy = 0; dy <= 2; dy++) {
        for (var dx = -2; dx <= 2; dx++) {
          var d2 = dx * dx + dy * dy;
          if (d2 > 6.25) continue;
          c.fillStyle = d2 <= 2.25 ? P.roomDeep : P.outline;
          c.fillRect(x + dx, 22 - dy, 1, 1);
        }
      }
    }
    /* the connectors hanging under the edge, slot side down */
    for (x = 24; x < TOP_W; x += 48) c.drawImage(T.bumpHang.canvas, x - 3, 19);
    c.fillStyle = P.outline; c.fillRect(0, 23, TOP_W, 1);
    return t;
  }

  /* The bright thing that walks the strip: 48x3 of the diode's core at a
     peak of 0.18 - the strip's own three rows - eased to nothing at both
     ends so it has no edge. */
  function bakeLedBand() {
    var t = makeCanvas(48, 3), c = t.ctx;
    for (var x = 0; x < 48; x++) {
      var k = 1 - Math.abs((x + 0.5) / 24 - 1);
      c.fillStyle = rgba(P.ledBlueCore, 0.18 * ease(k));
      c.fillRect(x, 0, 1, 3);
    }
    return t;
  }

  /* ========================================= the floor under the fort

     480x28 at 1.0, TWO SURFACES: the floor this fort stands on is the
     grey geometric rug lying on the room's oak (Fort ref 3, ref 7).
       x   0..300  THE GREY GEOMETRIC RUG: a soft LOZENGE weave, 1px
                   diamond outlines on a 16px pitch in a grey only 28 under
                   the ground, lit on each top vertex. It was full-contrast
                   X's on a 12px pitch, which is a chain-link fence
       x 300..480  THE ROOM'S OWN OAK, painted by LivingRoom.paintOak with
                   seed 7 - the same boards as the other four bays, because
                   it is the same room
     Round 1 also ran a shaggy cream rug and a span of pale boards here,
     from ref 2 and ref 5; the owner pointed out that those photographs
     were taken in a different room, so they are gone. Each change of
     surface is a 6px seam of seeded pixels from both sides, baked, so it
     moves with the floor and cannot boil. Row 0 is the death line's lip in
     each surface's own lit colour; rows 22..27 are the pale boards
     everything lies on, under a 1px shadow of the rug's edge. The litter
     reads as floor things - a rug and a floor are what they lie on. */
  var FLOOR_W = 480;
  var FLOOR_EDGES = [0, 300, 480];

  /* two staggered rows of 11x7 lozenges, the second row half a pitch
     over, so they read as a weave and no line runs the full height of the
     band. Plotted with pline so a 5:3 slope is a continuous 1px outline.
     The tile is 480 = 30 pitches, and the loop runs one lozenge past each
     end of it, so the canvas' own edge cuts them and the wrap is seamless */
  function paintGeo(c, w, r) {
    var x, y, j;
    var line = mix(P.geoGrey, P.geoDark, 0.45);
    c.fillStyle = P.geoGrey; c.fillRect(0, 0, w, 22);
    for (j = 0; j < 2; j++) {
      var cy = j ? 14 : 6;
      for (x = (j ? 8 : 0) - 16; x <= w + 16; x += 16) {
        pline(c, x - 5, cy, x, cy - 3, line); pline(c, x, cy - 3, x + 5, cy, line);
        pline(c, x + 5, cy, x, cy + 3, line); pline(c, x, cy + 3, x - 5, cy, line);
        c.fillStyle = P.geoLight; c.fillRect(x, cy - 3, 1, 1);
      }
    }
    for (y = 1; y < 22; y++) for (x = 0; x < w; x++) if (r() < 0.05) { c.fillStyle = r() < 0.5 ? P.geoLight : P.geoDark; c.fillRect(x, y, 1, 1); }
    c.fillStyle = P.geoLight; c.fillRect(0, 0, w, 1);
  }

  function bakeFloor() {
    var t = makeCanvas(FLOOR_W, VH - FLOOR), c = t.ctx;
    var r = mulberry32(4242);
    var surf = [], i, x, y;
    /* the rug, then the oak with its lip */
    surf.push(makeCanvas(FLOOR_W, 22));
    paintGeo(surf[0].ctx, FLOOR_W, r);
    surf.push(makeCanvas(FLOOR_W, 22));
    LivingRoom.paintOak(surf[1].ctx, 0, 1, FLOOR_W, 21, 7);
    surf[1].ctx.fillStyle = R.oakLip; surf[1].ctx.fillRect(0, 0, FLOOR_W, 1);
    /* each surface in its own span, then the seams pixel by pixel - at 300
       and at the tile's own edge, where the oak meets the next tile's rug */
    for (i = 0; i < 2; i++) {
      c.drawImage(surf[i].canvas, FLOOR_EDGES[i], 0, FLOOR_EDGES[i + 1] - FLOOR_EDGES[i], 22,
                  FLOOR_EDGES[i], 0, FLOOR_EDGES[i + 1] - FLOOR_EDGES[i], 22);
    }
    for (i = 0; i < 2; i++) {
      var b = FLOOR_EDGES[i + 1] % FLOOR_W, left = surf[i], right = surf[(i + 1) % 2];
      for (x = -3; x < 3; x++) {
        var col = wrap(b + x, FLOOR_W), pRight = (x + 3.5) / 6;
        for (y = 0; y < 22; y++) {
          var src = r() < pRight ? right : left;
          c.drawImage(src.canvas, col, y, 1, 1, col, y, 1, 1);
        }
      }
    }
    /* the boards under everything, and the shadow the rug's edge throws
       on them */
    c.fillStyle = P.woodPale; c.fillRect(0, 22, FLOOR_W, VH - FLOOR - 22);
    c.fillStyle = P.geoDark;  c.fillRect(0, 22, FLOOR_W, 1);
    c.fillStyle = P.woodSeam;
    for (x = 7; x < FLOOR_W; x += 48) c.fillRect(x, 23, 1, VH - FLOOR - 23);
    return t;
  }

  /* THE FOREGROUND, 480x16 at 1.35 from y 254 - the Couch's coffee-table
     trick, the one layer in the bay nearer the camera than the planks.
     Two things from ref 3 and ref 7, spaced across the 480 - the Couch's
     density:
       x  20..170  THE BOX OF PANELS (ref 7): big TRIANGULAR yellow and
                   blue offcuts leaning out over its rim at angles and a
                   kraft panel corner with its bites. It was eighteen
                   upright 5px tabs on a 7px pitch, which read as jars on a
                   shelf
       x 240..330  THE WALNUT TABLE'S CORNER with the yellow book on it -
                   the Couch's own table, in the Couch's own walnut, which
                   is the explicit link between that bay and this one
     Round 1 had a third, an orange-and-white foam block at x 380, and a
     cream ribbon loop over the box's front. Nobody could say what the
     block was, and the ribbons left the bay as hazards, so a cream loop in
     the foreground meant nothing any more; both are gone, and nothing
     replaces them. Never above y 254, so it cannot hide a pellet, a puck,
     a cup's shadow or the ammo bag, all of which live above the floor
     line. NEVER THE RED CUPS: a red cup at the edge of vision would be
     read as a Cupman. */
  function bakeFore() {
    var t = makeCanvas(FLOOR_W, 16), c = t.ctx;
    var x;
    /* the box of panels: five things leaning in it, nothing on a pitch.
       Each is drawn whole and the box's front then covers its foot, so
       only what stands over the rim (rows 0..5) is seen. */
    var yHi = mix(P.panelYellow, '#ffffff', 0.3), bHi = mix(P.panelBlue, '#ffffff', 0.3);
    var j, hw;
    /* two yellow right triangles, 14x9, the hypotenuse plotted. The first
       has its square corner low on the left and leans right; the second
       is its mirror, leaning left */
    for (j = 0; j < 9; j++) {
      hw = Math.round(14 * (j + 1) / 9);
      c.fillStyle = P.panelYellow;
      c.fillRect(30, 1 + j, hw, 1); c.fillRect(136 - hw, j, hw, 1);
    }
    pline(c, 30, 0, 44, 9, P.outline); c.fillStyle = P.outline; c.fillRect(29, 0, 1, 10);
    c.fillStyle = yHi; c.fillRect(30, 1, 1, 8);
    pline(c, 136, -1, 122, 8, P.outline); c.fillStyle = P.outline; c.fillRect(136, 0, 1, 9);
    /* a blue slab, 12x8, tilted: each pair of rows a pixel further right */
    for (j = 0; j < 8; j++) {
      c.fillStyle = j ? P.panelBlue : bHi; c.fillRect(62 + (j >> 1), j, 12, 1);
      c.fillStyle = P.outline; c.fillRect(61 + (j >> 1), j, 1, 1); c.fillRect(74 + (j >> 1), j, 1, 1);
    }
    /* a kraft panel's corner, standing over the rim, with two bites out of its
       top edge - a scrap of the fort itself waiting to be used */
    c.fillStyle = P.kraft;    c.fillRect(92, 0, 20, 8);
    c.fillStyle = P.kraftLit; c.fillRect(92, 1, 20, 1);
    c.fillStyle = P.outline;  c.fillRect(92, 0, 20, 1); c.fillRect(91, 0, 1, 8); c.fillRect(112, 0, 1, 8);
    bite(c, 98, 0, 2, 'top', true, P.flute); bite(c, 106, 0, 2, 'top', true, P.flute);
    c.fillStyle = P.boxBrown;                       c.fillRect(20, 6, 150, 10);
    c.fillStyle = mix(P.boxBrown, P.kraftLit, 0.5); c.fillRect(20, 6, 150, 2);
    c.fillStyle = mix(P.boxBrown, P.void, 0.3);     c.fillRect(20, 8, 150, 1);
    c.fillStyle = P.outline; c.fillRect(19, 6, 1, 10); c.fillRect(170, 6, 1, 10);
    c.fillStyle = mix(P.boxBrown, P.void, 0.2);
    for (x = 34; x < 168; x += 22) c.fillRect(x, 10, 1, 6);         /* the flute */
    /* the walnut table's corner, and the book */
    c.fillStyle = C.walnut;    c.fillRect(240, 4, 90, 12);
    c.fillStyle = C.walnutLit; c.fillRect(240, 4, 90, 1);
    c.fillStyle = C.walnutHi;  c.fillRect(252, 5, 14, 1); c.fillRect(296, 5, 9, 1);
    c.fillStyle = mix(C.walnut, P.void, 0.4); c.fillRect(240, 9, 90, 1);
    c.fillStyle = P.outline;   c.fillRect(239, 4, 1, 12); c.fillRect(330, 4, 1, 12);
    c.fillStyle = P.bookYellow; c.fillRect(262, 0, 30, 4);
    c.fillStyle = mix(P.bookYellow, '#ffffff', 0.35); c.fillRect(262, 0, 30, 1);
    c.fillStyle = P.rugLit;     c.fillRect(290, 1, 2, 3);                 /* the pages */
    c.fillStyle = P.outline;    c.fillRect(261, 0, 1, 4); c.fillRect(292, 0, 1, 4);
    return t;
  }

  /* ======================================================= the planks

     A STACK OF PANELS, 34 wide, in the plank's own WARM kraft at 178 on a
     COOL wall - the only surface in the bay at that value and that hue,
     which is the whole of the value rule. Panel
     courses are 48 tall and the tile is 128, which is NOT a multiple of 48,
     on purpose: the seams land at rows 0, 48 and 96 of every tile and the
     next one at 128, thirty-two rows after the last instead of forty-eight
     - sixteen early - so the seam pattern does not phase with the tile's
     own repeat, and a column three tiles long has no rhythm to find.

     TWO VARIANTS, rolled 0.58 / 0.42:
       0 PRINTED   the soft doodle print and a numeral on every course -
                   and no badge and no big creatures: the lethal mass stays
                   calm. The cream badge on courses 0 and 2 put a 229 oval
                   within 30px of nearly every cap, and the eye landed on
                   it instead of on the edge that kills
       1 PLAIN     bare kraft, holes, flute ridges and a few scratches
     There was a third, a plank LIT green from inside, and one time in six
     it passed in front of the one wall panel lit the same green with the
     same pool - the lethal thing vanishing into the scenery it copied.
     The chamber is the wall's; no plank glows.
     Every variant: an outline down both edges bitten every 16 rows, the
     small-hole grid, one porthole per course, and a connector across every
     course seam on both edges, standing 2px proud of the column into the
     lane. THOSE TWO PIXELS ARE INSIDE THE BOX: the collision box is the
     column, x..x+34, and the plank's own outline is what the player reads
     as its edge, so a bump is decoration on a lethal thing and moves no
     boundary. The tile is 38 wide with a 2px gutter each side to hold them
     - the plan's 34 has nowhere to put a pixel that stands proud. */
  var COL_W = 34, COL_PAD = 2, COL_H = 128, COURSE = 48;

  /* a connector across a horizontal seam, seen at the column's edge: a
     half-disc on its side, two pixels proud and three into the column */
  function sideBump(c, x, y, left) {
    var depth = [1, 2, 2, 2, 2, 2, 1];
    for (var i = 0; i < 7; i++) {
      var d = depth[i], py = y - 3 + i;
      c.fillStyle = i === 0 ? P.foamLit : (i === 6 ? P.foamDeep : P.foam);
      if (left) c.fillRect(x - d, py, d + 3, 1); else c.fillRect(x + COL_W - 3, py, d + 3, 1);
      c.fillStyle = P.outline;
      if (left) c.fillRect(x - d, py, 1, 1); else c.fillRect(x + COL_W - 1 + d, py, 1, 1);
    }
  }

  function bakeColumn(v) {
    var t = makeCanvas(COL_W + COL_PAD * 2, COL_H), c = t.ctx;
    var r = mulberry32(5100 + v * 53);
    var lights = [], k, i, x0 = COL_PAD;
    var courses = [[0, COURSE], [COURSE, COURSE], [COURSE * 2, COL_H - COURSE * 2]];
    for (k = 0; k < courses.length; k++) {
      paintPanel(c, x0, courses[k][0], COL_W, courses[k][1], {
        mode: 'pillar', lit: false, print: v === 0, big: 0,
        badge: false, numeral: v === 0, ports: 1,
        seed: 5100 + v * 53 + k * 7, biteR: 2, anchorY: courses[k][0] + courses[k][1],
        edges: { t: null, b: null, l: 'seam', r: 'seam' }, lights: lights
      });
    }
    /* a few scratches on the plain one: cardboard that has been dragged */
    if (v === 1) {
      for (i = 0; i < 5; i++) {
        var sx = x0 + 5 + Math.floor(r() * 22), sy = 4 + Math.floor(r() * (COL_H - 10));
        pline(c, sx, sy, sx + 2 + Math.floor(r() * 4), sy + (r() < 0.5 ? 1 : -1) * Math.floor(r() * 3),
              r() < 0.6 ? P.kraftPlankMid : P.kraftPlankShade);
      }
    }
    drawLights(c, lights);
    /* the course seams: an outline with a lit lip under it, and the
       connectors across them at both edges - the one at row 0 stamped
       again at row 128 so its top half is there when the tile repeats */
    for (k = 0; k < courses.length; k++) {
      var y = courses[k][0];
      c.fillStyle = P.outline;  c.fillRect(x0, y, COL_W, 1);
      c.fillStyle = P.kraftPlankLit;
      c.fillRect(x0 + 1, y + 1, COL_W - 2, 1);
      sideBump(c, x0, y, true);  sideBump(c, x0, y, false);
      if (y === 0) { sideBump(c, x0, COL_H, true); sideBump(c, x0, COL_H, false); }
    }
    return t;
  }

  /* THE CAP: a panel's end edge seen square on at the mouth of the gap,
     42x9, the engine's own cap box. A kraft slab with its bites along the
     face that looks INTO the gap, a lit arris on that face, and two
     biscuits standing in slots in it at x 6 and x 30 - the connectors that
     hold the course to the next, which is exactly what the photographs
     show at every panel end. `down` is the cap under the top column, whose
     gap face is its bottom row.
     THE EDGE THAT KILLS IS THE BRIGHTEST BAR. In the column's own 178
     with a 1px lip the cap read as "the column, ended"; the Couch's caps
     are the pale pillows the eye lands on. So the slab is 55% of the way
     to the arris (~196), and its far row is kraftPlankMid (160), not the
     135 shade - a cap is a rim of cardboard, not a box. The biscuits in
     its slots stay black. */
  function bakeCap(down) {
    var Wc = 42, Hc = 9, t = makeCanvas(Wc, Hc), c = t.ctx, i;
    var gapRow = down ? Hc - 1 : 0;
    c.fillStyle = mix(P.kraftPlank, P.kraftPlankLit, 0.55); c.fillRect(0, 0, Wc, Hc);
    c.fillStyle = P.kraftPlankMid;
    for (i = 3; i < Wc - 3; i += 5) c.fillRect(i, down ? 2 : 5, 2, 1);
    c.fillStyle = P.kraftPlankMid; c.fillRect(1, down ? 1 : Hc - 2, Wc - 2, 1);
    c.fillStyle = P.kraftPlankLit;   c.fillRect(1, down ? Hc - 2 : 1, Wc - 2, 1);
    c.fillStyle = P.outline;
    c.fillRect(0, 0, Wc, 1); c.fillRect(0, Hc - 1, Wc, 1);
    c.fillRect(0, 0, 1, Hc); c.fillRect(Wc - 1, 0, 1, Hc);
    for (i = 13; i < Wc - 4; i += 16) bite(c, i, gapRow, 2, down ? 'bottom' : 'top', false, P.flute);
    /* the two biscuits in their slots, half in and half proud of the face */
    var bx = [6, 30];
    for (i = 0; i < 2; i++) {
      var by = down ? Hc - 4 : 0;
      c.fillStyle = P.foam;    c.fillRect(bx[i], by, 5, 4);
      c.fillStyle = down ? P.foamDeep : P.foamLit; c.fillRect(bx[i] + 1, down ? by + 3 : by, 3, 1);
      c.fillStyle = down ? P.foamLit : P.foamDeep; c.fillRect(bx[i] + 1, down ? by : by + 3, 3, 1);
      c.fillStyle = P.foamSlot; c.fillRect(bx[i], down ? by : by + 3, 5, 1);
      c.fillStyle = P.outline;  c.fillRect(bx[i] - 1, by, 1, 4); c.fillRect(bx[i] + 5, by, 1, 4);
    }
    return t;
  }

  /* ================================================== the biscuits

     A black foam disc tumbling flat - the Whiteboard magnet's twelve-frame
     scheme, with a THICKER edge. The magnet goes 11, 9, 6, 3; the biscuit
     goes 11, 10, 8, 5, because foam is about a quarter as thick as it is
     wide (ref 1, ref 4: the connectors are pucks, not coins), and edge on
     it is a five-row band of side wall rather than a three-pixel sliver.
     Frames 0..5 show the SLOT face - a 1px groove across the middle, the
     slot the panel edge pushes into - and 6..11 the plain face, which is
     the biscuit's version of the magnet flashing silver and black: it is
     what says this is a flat disc turning over and not a ball.

     Black on a dark wall is the problem this sprite has to solve, and the
     answer is the strip - but MATTE: black foam under an LED shows one
     cool row and no highlight. Round 1 lit it with a 147 rim two rows
     deep and a four-pixel catch-light at 200, and the owner's note was
     that the biscuits looked too shiny; foam is not glossy. So: ONE row of
     foamRim (119, the same light the wall's connectors wear - the strip,
     not a gloss) along the top of the arc, and the row ends one pixel
     inside the edge down the upper half in foamEdge (90), just enough to
     part a falling puck from the dark wall behind it. Over the near wall
     the black body carries it (35 against the wall's foot); over the far
     wall and the doorway, at 37 to 87, the rim does. Round all of it a
     HARD BLACK EDGE, the outline on the first and last pixel of every row
     and along the bottom - with a 19 foamDeep edge the puck at 1x was a
     soft grey-blue blob, and a hard black edge is what says "foam disc".
     And a 1px cool halo outside the edge round the lower half. Motion,
     rate and hitbox are untouched by any of this. */
  var BIS_H = [11, 10, 8, 5, 8, 10, 11, 10, 8, 5, 8, 10];
  var BIS_FRAMES = 12;

  /* the ellipse as [offset, width] rows: the Whiteboard's discRows, which
     is private to that file and so restated here, unchanged */
  function discRows(fh) {
    var rows = [], i, ry = fh / 2;
    for (i = 0; i < fh; i++) {
      var dy = (i + 0.5 - ry) / ry;
      var hw = Math.round(5.4 * Math.sqrt(Math.max(0, 1 - dy * dy)));
      rows.push([5 - hw, hw * 2 + 1]);
    }
    return rows;
  }

  /* 13x11: the disc is 11 wide and the canvas carries one more column
     each side for the cool halo, so the puck is drawn one pixel in and
     blitted at x - 6 (drawDrop) */
  function bakeBiscuit(f) {
    var t = makeCanvas(13, 11), c = t.ctx;
    var fh = BIS_H[f], top = Math.round((11 - fh) / 2);
    var slot = f < 6, i;
    c.translate(1, 0);
    if (fh <= 5) {
      /* edge on: the side wall, lit along its top by the strip, its
         corners rounded off, and a 4px foamLit (73) tick on the lit row's
         foot - matte, a sheen and not a gloss */
      c.fillStyle = P.foam;      c.fillRect(0, top + 1, 11, fh - 2);
      c.fillStyle = P.foamRim;   c.fillRect(1, top, 9, 1);
      c.fillStyle = P.foamDeep;  c.fillRect(1, top + fh - 1, 9, 1);
      c.fillStyle = P.foamLit;   c.fillRect(2, top + 1, 4, 1);
      c.fillStyle = P.outline;   c.fillRect(0, top + 1, 1, fh - 2); c.fillRect(10, top + 1, 1, fh - 2);
      return t;
    }
    var rows = discRows(fh);
    /* THE COOL HALO: one pixel of foam half way to the strip's deep blue
       (52) just OUTSIDE the black edge, down the lower half only (rows
       ceil(fh/2)..fh-2). Over a 37..50 room that is +10 on the dark
       side - not a glow, exactly enough to part a black disc from a black
       room, the Couch marshmallow's 1px cool edge against its shadow */
    c.fillStyle = mix(P.foam, P.ledBlueDeep, 0.5);
    for (i = Math.ceil(fh / 2); i <= fh - 2; i++) {
      c.fillRect(rows[i][0] - 1, top + i, 1, 1);
      c.fillRect(rows[i][0] + rows[i][1], top + i, 1, 1);
    }
    rowsFill(c, rows, 0, top, P.foam);
    /* the edge, laid INSIDE the shape (the magnet's reason: a disc that
       gains a pixel when it turns is a disc that jitters), in hard black */
    c.fillStyle = P.outline;
    for (i = 0; i < rows.length; i++) {
      c.fillRect(rows[i][0], top + i, 1, 1);
      c.fillRect(rows[i][0] + rows[i][1] - 1, top + i, 1, 1);
    }
    c.fillRect(rows[fh - 1][0], top + fh - 1, rows[fh - 1][1], 1);
    /* the cool top arc, MATTE: the top row whole in foamRim (119), then
       the row ends one pixel inside the black edge from row 1 down the
       rest of the upper half in foamEdge (90). No second whole row and no
       catch-light; the census is in the header */
    c.fillStyle = P.foamRim;
    c.fillRect(rows[0][0], top, rows[0][1], 1);
    c.fillStyle = P.foamEdge;
    for (i = 1; i < Math.ceil(fh / 2); i++) {
      c.fillRect(rows[i][0] + 1, top + i, 1, 1);
      c.fillRect(rows[i][0] + rows[i][1] - 2, top + i, 1, 1);
    }
    if (slot) {
      var mid = top + Math.floor(fh / 2);
      c.fillStyle = P.foamSlot; c.fillRect(rows[mid - top][0] + 1, mid, rows[mid - top][1] - 2, 1);
      c.fillStyle = P.foamLit;  c.fillRect(rows[mid - top][0] + 2, mid + 1, Math.max(1, rows[mid - top][1] - 4), 1);
    } else {
      /* the plain face: a single press mark where the mould let go */
      c.fillStyle = P.foamDeep; c.fillRect(4, top + Math.floor(fh / 2), 3, 1);
    }
    return t;
  }

  /* ================================================== THE AMMO BAG

     The spare life is THE AMMO BAG (Ammo Bag ref, Assets/Concept/Ammo Bag
     ref.png): a canvas tote in natural cream, two navy straps running
     down its front from the handles into a navy base band, a front pocket
     whose folded top edge sits mid-height between the straps, and a round
     red stamp on the pocket - here a plain red ring with one illegible
     mark in it, because the ref's stamp is a logo and this file prints no
     letters. It is FULL of the Cupmen's own yellow pellets, heaped over
     the rim, in the yellow pellet's own three pigments (CP.pelletYellow,
     its hi and its dark ring): the ammo they shoot at you, bagged.

     Why a bag of pellets does not read as pellets: the heap is the only
     yellow-with-a-dark-ring thing in the bay that is STILL and ON THE
     FLOOR, it sits inside a cream silhouette with navy handles under a
     jade glow, and the lethal pellets are moving discs on the smooth
     layer. The sloth it replaces was round 1's; the owner swapped it.

     22x24, drawn in canvas space. Body, pocket, stamp, then the heap, then
     the handles in front of the heap, so the straps run up through it. */
  function bakeBag() {
    var t = makeCanvas(22, 24), c = t.ctx, i;
    var yel = CP.pelletYellow || '#ffc21a', yelHi = CP.pelletYellowHi || '#fff3b0', ring = CP.ring || '#1a1410';
    /* THE BODY, rows 9..22, a rounded bottom row, outlined one pixel
       outside it all round */
    var body = [];
    for (i = 0; i < 13; i++) body.push([2, 18]);
    body.push([3, 16]);
    LivingRoom.rowsOutline(c, body, 0, 9, P.outline);
    rowsFill(c, body, 0, 9, P.bagCream);
    /* the opening's dark edge, the rim's lit top, the lit left side and
       the shaded right */
    c.fillStyle = P.outline;  c.fillRect(2, 9, 18, 1);
    c.fillStyle = P.bagLit;   c.fillRect(3, 10, 16, 1); c.fillRect(2, 11, 1, 11);
    c.fillStyle = P.bagShade; c.fillRect(19, 11, 1, 11);
    /* the straps, down the front into the base band */
    c.fillStyle = P.bagNavy;  c.fillRect(6, 10, 2, 10); c.fillRect(14, 10, 2, 10);
    /* THE BASE BAND, rows 20..22, one catch of light on its top row's
       left - a strip in the light, not a gloss */
    c.fillStyle = P.bagNavy;  c.fillRect(2, 20, 18, 2); c.fillRect(3, 22, 16, 1);
    c.fillStyle = P.bagNavyLit; c.fillRect(3, 20, 6, 1);
    /* the pocket: its seam shadow and its folded top edge */
    c.fillStyle = P.bagShade; c.fillRect(8, 13, 6, 1);
    c.fillStyle = P.bagLit;   c.fillRect(8, 14, 6, 1);
    /* the stamp: a plain red ring and one mark */
    pcircle(c, 11, 17, 2, P.badgeMark);
    c.fillStyle = P.badgeMark; c.fillRect(11, 17, 1, 1);
    /* the handles' dark sides go down BEFORE the heap, so a pellet that
       rolls against a handle covers its outline rather than losing its
       own middle under it */
    c.fillStyle = P.outline;    c.fillRect(5, 2, 1, 8); c.fillRect(16, 2, 1, 8);
    /* THE HEAP, seven pellets in the cover's 3x3: a dark ring, a yellow
       cross over it and one hi pixel at the top. Four on the rim and
       three over them, every one placed CLEAR of the handles' feet
       (x 6..7 and 14..15): at x 5, 13 and 17 - the brief's first spacing
       - the straps drawn in front ate the middle of three of the seven */
    var heap = [[3, 9], [9, 9], [12, 9], [18, 9], [4, 6], [11, 6], [17, 6]];
    /* all the rings, then all the yellows, then the hi pixels: pellets
       that touch share their dark, so the heap is a heap of discs and not
       seven dark boxes with crosses in them */
    c.fillStyle = ring;
    for (i = 0; i < heap.length; i++) c.fillRect(heap[i][0] - 1, heap[i][1] - 1, 3, 3);
    c.fillStyle = yel;
    for (i = 0; i < heap.length; i++) {
      c.fillRect(heap[i][0] - 1, heap[i][1], 3, 1); c.fillRect(heap[i][0], heap[i][1] - 1, 1, 3);
    }
    c.fillStyle = yelHi;
    for (i = 0; i < heap.length; i++) c.fillRect(heap[i][0], heap[i][1] - 1, 1, 1);
    /* THE HANDLES, one navy arch from strap to strap (the tote's own
       shape), in front of the heap: the feet continue the straps up
       through it, a 2px crown over the top, left unoutlined on top so the
       crown stays 2px - over the room's 42..54 foot a 57 navy with dark
       sides reads */
    c.fillStyle = P.bagNavy;
    c.fillRect(6, 2, 2, 8); c.fillRect(14, 2, 2, 8);
    c.fillRect(7, 1, 8, 1); c.fillRect(8, 0, 6, 1);
    c.fillStyle = P.bagNavyLit; c.fillRect(6, 2, 1, 7); c.fillRect(8, 0, 6, 1);
    return t;
  }

  /* ======================================================= the litter

     What is lying on the rug under the fort, five kinds, all below the
     line that already kills and so none of them boxed:
       0  a biscuit that landed earlier, lying flat
       1  a yellow panel offcut with one bite out of it
       2  THE TOY BLASTER (ref 7, lying on the sofa beside the red cups). It
          is scenery and it NEVER fires - the guns that fire are the ones
          the Cupmen are holding, on the smooth layer, and they are painted
       3  a RED CUP on its side (ref 7) - the Cupmen's origin, knocked over
       4  a kraft scrap with a biscuit still pushed into it
     Each is a sprite and a row of the bay's shade under it. */
  var LITTER_Y = [3, 4, 3, 4, 4];
  function bakeLitter(kind) {
    var t = makeCanvas(19, 8), c = t.ctx;
    if (kind === 0) {
      c.fillStyle = P.foam;    c.fillRect(1, 0, 11, 3);
      c.fillStyle = P.foamRim; c.fillRect(2, 0, 9, 1);
      c.fillStyle = P.outline; c.fillRect(0, 0, 1, 3); c.fillRect(12, 0, 1, 3);
    } else if (kind === 1) {
      c.fillStyle = P.outline;     c.fillRect(0, 0, 11, 5);
      c.fillStyle = P.panelYellow; c.fillRect(1, 1, 9, 3);
      c.fillStyle = mix(P.panelYellow, '#ffffff', 0.3); c.fillRect(1, 1, 9, 1);
      c.clearRect(4, 0, 3, 2); c.fillStyle = P.outline; c.fillRect(4, 2, 3, 1);
    } else if (kind === 2) {
      /* 18x6: at 14x5 it was an orange bar. A stock, a blue slide, a
         barrel, and a grip under it with a blue trigger in the notch */
      c.fillStyle = P.outline;     c.fillRect(0, 0, 18, 4); c.fillRect(3, 3, 6, 3);
      c.fillStyle = P.blaster;     c.fillRect(1, 1, 16, 2); c.fillRect(4, 3, 2, 2);
      c.fillStyle = P.blasterBlue; c.fillRect(6, 1, 4, 2);
      c.fillStyle = mix(P.blaster, '#ffffff', 0.35); c.fillRect(1, 1, 5, 1);
      c.fillStyle = mix(P.blaster, P.void, 0.4); c.fillRect(16, 2, 2, 1);      /* the muzzle */
      c.fillStyle = P.blasterBlue; c.fillRect(7, 3, 2, 2);                       /* the trigger */
    } else if (kind === 3) {
      /* on its side, mouth to the right: a trapezoid narrow at the base */
      var cup = [[0, 5], [0, 6], [0, 7], [0, 6], [0, 5]];
      for (var i = 0; i < 5; i++) {
        c.fillStyle = P.cupRedLit; c.fillRect(1 + cup[i][0], i, cup[i][1], 1);
      }
      c.fillStyle = mix(P.cupRedLit, '#ffffff', 0.35); c.fillRect(2, 1, 4, 1);
      c.fillStyle = C.outline; c.fillRect(0, 1, 1, 3); c.fillRect(9, 0, 1, 5);
      c.fillStyle = mix(P.cupRedLit, P.void, 0.45); c.fillRect(7, 1, 1, 3);
      /* the white rolled rim of its mouth: what makes a red lozenge a cup */
      c.fillStyle = '#ffffff'; c.fillRect(8, 0, 1, 5);
    } else {
      c.fillStyle = P.outline;    c.fillRect(0, 1, 9, 4);
      c.fillStyle = P.kraftShade; c.fillRect(1, 2, 7, 2);
      c.fillStyle = P.kraftLit;   c.fillRect(1, 2, 7, 1);
      c.fillStyle = P.foam;       c.fillRect(6, 0, 4, 3);
      c.fillStyle = P.foamRim;    c.fillRect(7, 0, 2, 1);
    }
    return t;
  }

  /* ============================================================ build

     The room first, and it guards itself. Then the Couch: the room tile
     crops its shutters 1:1, and Levels.buildArt builds the Couch before
     this bay (it is the second bay of the room and this is the fifth), so
     the guard below never fires in the game as it stands - but it costs
     nothing and it makes the crop honest. Then the stamps, because the
     walls stamp them; then the walls, back to front; then everything else.

     LAST, Cupmen.build(), the Whiteboard -> Chalkboard precedent: the
     Cupmen are in no level entry of their own, so if this line were not
     here nothing would ever bake their pellets. It is self-guarded, and it
     touches no PNG (the sprites load after this runs; js/cupmen.js reads
     them at draw time).

     FORTY-FOUR canvases kept, about 575k pixels: the room tile is the big
     one at 209k, the two near walls are 209k between them, the far wall
     84k, the floor, its shade and the fore 27k, the band and its two
     strips 23k, the two planks 10k, the pool and the four pictures 11k,
     and the twenty-five small sprites under 4k together. Two 480x22
     scratch canvases are made and dropped inside bakeFloor. (Round 1 kept
     a tripod's foot and baked ribbon loops on first use; the tripods and
     ribbons are out of the bay, and so are their sprites.) */
  function build() {
    LivingRoom.build();
    if (!Couch.tiles.shutters) Couch.build();

    T.dash     = bakeDash(false, false);
    T.dashFar  = bakeDash(true, false);
    T.dashFarV = bakeDash(true, true);
    T.bump     = bakeBump(false, false);
    T.bumpFar  = bakeBump(true, false);
    T.bumpHang = bakeBump(false, true);
    T.face     = bakeFace();

    T.top      = bakeTop();
    /* the strip's blue wash down the top of the room: the room's own
       bakeShade, so it ramps the way the crown's shadow does */
    T.ledShade = LivingRoom.bakeShade(P.ledBlueDeep, 0.24, 36, false);
    T.ledBand  = bakeLedBand();

    T.room     = bakeRoom();
    T.far      = bakeFar();
    T.near     = [bakeNear(0), bakeNear(1)];
    T.pool     = bakePool();
    T.movie    = [bakeMovie(0), bakeMovie(1), bakeMovie(2), bakeMovie(3)];

    T.floor      = bakeFloor();
    T.floorShade = LivingRoom.bakeShade(P.void, 0.25, 12, true);
    T.fore       = bakeFore();

    T.column  = [bakeColumn(0), bakeColumn(1)];
    T.capDown = bakeCap(true);
    T.capUp   = bakeCap(false);

    T.biscuit = [];
    for (var f = 0; f < BIS_FRAMES; f++) T.biscuit.push(bakeBiscuit(f));
    T.bag     = bakeBag();
    T.litter  = [bakeLitter(0), bakeLitter(1), bakeLitter(2), bakeLitter(3), bakeLitter(4)];

    if (typeof Cupmen !== 'undefined' && Cupmen.build) Cupmen.build();
  }

  /* ========================================================= drawing */

  /* FOUR LAYERS, THREE LIVE OVERLAYS AND THE ROOM'S LIGHT, back to front:
       0  roomDeep, a safety net under everything
       1  the room beyond the fort, 960 at 0.12
       2  the fort's far wall, 384 at 0.30
          + the projector's picture, picked off the far wall's own scroll
       3  the near wall, 480 at 0.55, two variants by hash per column
          + the green chamber breathing, clipped to its panel
          + the tablet's glow
       4  LivingRoom.drawLight - last, as in every bay of this room
     The picture goes on BEFORE the near wall and not after it with the
     other two, because it is on the far wall and the near wall passes in
     front of it. */
  function drawBackdrop(ctx, scroll) {
    /* the one place a level may cache the scroll - see `clock` */
    clock = scroll;
    var k, v, x;

    ctx.fillStyle = P.roomDeep;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.room.canvas, scroll * 0.12, CEIL);

    var fs = scroll * 0.30;
    tileX(ctx, T.far.canvas, fs, CEIL);
    /* THE PICTURE changes as the world passes, the Desk's screenPage: a
       new frame each time a far-wall tile goes by, never on a timer */
    var movie = T.movie[Math.floor(wrap(fs, FAR_W * 4) / FAR_W)].canvas;
    var f0 = Math.floor(fs / FAR_W);
    for (k = f0; k <= f0 + 2; k++) {
      x = Math.round(k * FAR_W - fs) + PICTURE.x;
      if (x > -PICTURE.w && x < VW) ctx.drawImage(movie, x, PICTURE.y);
    }

    var ns = scroll * 0.55, k0 = Math.floor(ns / NEAR_W);
    /* the breath: 0.55 to 1.0 of the pool's own 0.30 on a sine with a
       period of 314 world pixels - a slow breath, never a strobe */
    var breath = 0.55 + 0.45 * Math.sin(clock * 0.02);
    /* and the tablet's screen, three tints, a new one every 160 */
    var tabA = 0.10 + 0.08 * (hash(Math.floor(clock / 160)) % 3);
    for (k = k0; k <= k0 + 1; k++) {
      v = hash(k) % 2;
      x = Math.round(k * NEAR_W - ns);
      ctx.drawImage(T.near[v].canvas, x, CEIL);
      var lp = litPanel(v);
      if (lp && x + lp.x < VW && x + lp.x + lp.w > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + lp.x, lp.top, lp.w, FLOOR - lp.top);
        ctx.clip();
        ctx.globalAlpha = breath;
        ctx.drawImage(T.pool.canvas, x + lp.x + Math.round(lp.w / 2) - POOL_W / 2,
                      lp.top + Math.round((FLOOR - lp.top) / 2) - POOL_H / 2);
        ctx.restore();
      }
      var tab = NEAR[v].tablet;
      if (tab && x + tab.x < VW && x + tab.x + 26 > 0) {
        var ga = ctx.globalAlpha;
        ctx.globalAlpha = ga * tabA;
        ctx.fillStyle = P.tabletGlow;
        ctx.fillRect(x + tab.x + 1, tab.y, 24, 3);
        ctx.globalAlpha = ga;
      }
    }

    LivingRoom.drawLight(ctx);
  }

  /* The porch resolves the Living Room's row to the Desk's, which is this
     same delegate, and no porch row is added for the Fort - so this is a
     plain delegate to the room's calm backdrop, as every bay's is. */
  function drawMenuBackdrop(ctx, scroll) { LivingRoom.drawMenuBackdrop(ctx, scroll); }

  /* The roof edge (bakeTop), then the room's crown strip under it so the
     rows the player flies through carry the shade they carry in every
     bay, then the strip's blue wash, and then the one bright band walking
     the strip. The blue is laid HERE, after drawBackdrop's drawLight, so
     the room's warm ramp at the top does not muddy it. */
  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.top.canvas, scroll, 0);
    ctx.drawImage(LivingRoom.tiles.crownShade.canvas, 0, CEIL);
    ctx.drawImage(T.ledShade.canvas, 0, CEIL);
    ctx.drawImage(T.ledBand.canvas, Math.round(wrap(scroll * 0.6, 528) - 48), 1);
  }

  /* the wall's shadow at its foot, the floor, and the foreground litter
     at 1.35 over the bottom of the floor band */
  function drawFloor(ctx, scroll) {
    ctx.drawImage(T.floorShade.canvas, 0, FLOOR - 12);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
    tileX(ctx, T.fore.canvas, scroll * 1.35, 254);
  }

  /* ----------------------------------------------------------- planks */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.column[ob.variant || 0].canvas;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    /* the cast shadow, FIRST, so the connectors standing proud of the
       column's right edge sit on top of it: cardboard stands off the wall,
       the Couch's reason, and a stack of it without a shadow floats. 6px
       at strength 8 (it was 4 at 6): the plank stands further off a
       cooler wall */
    if (topH > 0) Tint.rect(ctx, x + COL_W, CEIL, 6, topH, P.void, 8);
    if (botH > 0) Tint.rect(ctx, x + COL_W, botY, 6, botH, P.void, 8);
    if (topH > 0) LivingRoom.drawColumn(ctx, tile, x - COL_PAD, CEIL, COL_W + COL_PAD * 2, topH);
    if (botH > 0) LivingRoom.drawColumn(ctx, tile, x - COL_PAD, botY, COL_W + COL_PAD * 2, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
  }

  /* ----------------------------------------------------------- litter */

  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), k = ob.kind || 0;
    var y = FLOOR + LITTER_Y[k];
    Tint.rect(ctx, x, y + 5, k === 2 ? 18 : 13, 1, P.shade, 5);
    ctx.drawImage(T.litter[k].canvas, x, y);
  }

  /* ------------------------------------------------------ the ammo bag */

  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var rx = Math.round(ob.x + ob.dx), ry = Math.round(ob.y + ob.dy);
    /* the jade every spare life glows, keyed to the bay's clock so it stops
       when the run does - centred on the bag's body, not on its handles.
       Floor 0.7 like the Mantle's (0.7 + 0.3*sin, js/mantle.js): a spare
       life never goes dark. Round 2 had 0.5 + 0.5*sin at 0.05/px, which
       hit alpha 0 once every 126px (~1.1s at speedStart 116) and strobed.
       0.022/px is a 286px period, ~2.5s at 116 and ~1.6s at 178 */
    var pulse = 0.7 + 0.3 * Math.sin(ob.phase + clock * 0.022);
    LivingRoom.glow(ctx, rx, ry + 6, 16 + pulse * 4,
                    'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')',
                    'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')',
                    'rgba(47,107,98,0)');
    /* its shadow on the rug, while it is still standing on it */
    if (ob.dy > -2) Tint.rect(ctx, rx - 9, FLOOR - 1, 18, 1, P.shade, 6);
    /* rows FLOOR-24 .. FLOOR-1 at rest: the outline's last row sits on
       FLOOR-1, so the bag stands on the rug and not in it */
    ctx.drawImage(T.bag.canvas, rx - 11, ry - 7);
  }

  function drawObstacle(ctx, ob) {
    if (ob.gone) return;
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    /* a Cupman is a 'spike' the engine collides with, and it is drawn on
       the smooth layer by drawActors - nothing of it goes on this one. A
       spike that is not a Cupman never exists here (see makeSpikes), so
       there is nothing else to draw for the type */
    else if (ob.type === 'spike') { /* drawActors */ }
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ========================================================= the drops

     Two things are a 'drop' in this bay: the biscuit, and every PELLET a
     Cupman fires (ob.shot). A pellet is a drop so that the heat smashes
     it, Saddam's tail bats it, Gerald reels in the gifts and the save
     clears it, all for free - and so all three drop hooks dispatch on
     ob.shot FIRST and hand a pellet to js/cupmen.js, and all three return
     at once on ob.gone, a pellet that left the screen. */
  function bisFrame(ob) {
    return Math.floor(wrap(ob.spin, TAU) / TAU * BIS_FRAMES) % BIS_FRAMES;
  }

  function drawDrop(ctx, ob) {
    if (ob.gone) return;
    if (ob.shot) { Cupmen.drawShot(ctx, ob); return; }
    /* NO SWAY: a puck falls straight, the Whiteboard's argument */
    var x = Math.round(ob.x), y = Math.round(ob.y);
    var f = bisFrame(ob), fh = BIS_H[f];
    /* the hard offset shadow, three down and three right, cropped at the
       kill line exactly as the magnet's is - at strength 10, well over
       the magnet's 6, because a black puck over a dark room needs the
       block under it to read as a shadow at all (and it reads only over
       the rug anyway) */
    var sy = y - ((fh / 2) | 0) + 3;
    if (sy < CEIL) Tint.rect(ctx, x - 2, CEIL, 11, fh - (CEIL - sy), P.shade, 10);
    else Tint.rect(ctx, x - 2, sy, 11, fh, P.shade, 10);
    LivingRoom.blitBelowCeil(ctx, T.biscuit[f].canvas, x - 6, y - 5);
  }

  /* where it is going to land, tightening and darkening as it falls. A
     Tint blur alone (8 + k*9) was lost in the speckle of round 1's 220
     shag rug - two rounds of captures, no marker found even 10x under a
     falling puck - so it is a DRAWN RING: a 1px geoDark (92, the grey
     rug's own dark, 62 under its 154 ground) outline of a w x 3 rounded
     rect, its corners left open, with the Tint inside at 10 + k*8. An
     outline survives speckle; a blur does not. */
  function drawDropSpot(ctx, ob) {
    if (ob.gone || ob.shot || ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(13 - k * 6), x = Math.round(ob.x - w / 2), y = FLOOR + 1;
    Tint.rect(ctx, x + 1, y + 1, w - 2, 1, P.shade, 10 + k * 8);
    ctx.fillStyle = P.geoDark;
    ctx.fillRect(x + 1, y, w - 2, 1); ctx.fillRect(x + 1, y + 2, w - 2, 1);
    ctx.fillRect(x, y + 1, 1, 1);     ctx.fillRect(x + w - 1, y + 1, 1, 1);
  }

  /* a puck lying flat on the rug, 11x3, with the strip's cool light on
     its top edge - foamRim, the falling puck's own matte row */
  function drawDropSplat(ctx, ob) {
    if (ob.gone) return;
    if (ob.shot) { Cupmen.drawShotSplat(ctx, ob); return; }
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);
    ctx.fillStyle = P.foam;    ctx.fillRect(x - 5, FLOOR + 1, 11, 3);
    ctx.fillStyle = P.foamRim; ctx.fillRect(x - 4, FLOOR + 1, 9, 1);
    ctx.fillStyle = P.outline; ctx.fillRect(x - 5, FLOOR + 1, 1, 3); ctx.fillRect(x + 5, FLOOR + 1, 1, 3);
    ctx.globalAlpha = a;
  }

  /* ================================================== the cover art

     118x114 on the big card, 82x94 on the side ones, in the Whiteboard's
     numbered steps, everything as a fraction of w and h so one function
     draws both, and animated off s = t * 22. Everything on it is a thing
     the level actually does: a dim room over a cardboard skyline, the
     blue strip, the inside of the fort in shadow with its print, holes,
     connectors and one GREEN chamber, the roof edge with its connectors
     hanging under it, two planks sliding past, a biscuit tumbling - and
     the signature, a crimson Cupman on the rug turning to face the
     doodad, three aim dots running out of his pistol, and a yellow pellet
     crossing the card. The caller has clipped and saved; nothing here
     saves or restores except the one clip round the green pool. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var roofY = y + Math.round(h * 0.09);
    var floorY = y + Math.round(h * 0.86);
    var i, k, px, py;

    /* 1. the dim room, the strip, and the room over the fort: a shutter's
       slats, and the Mantle's chimney breast with the dark television on
       it rising over the skyline - the room's own furniture, as the room
       tile has it (round 1 had a white ladder here; it left the bay) */
    ctx.fillStyle = P.roomDeep; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = P.roomWall; ctx.fillRect(x, roofY, w, floorY - roofY);
    var stripY = y + Math.round(h * 0.04);
    ctx.fillStyle = P.ledBlue; ctx.fillRect(x, stripY, w, 2);
    ctx.fillStyle = P.ledBlueCore;
    for (i = 2; i < w; i += 6) ctx.fillRect(x + i, stripY, 1, 1);
    Tint.rect(ctx, x, stripY + 2, w, 3, P.ledBlueDeep, 6);
    var shX = x + Math.round(w * 0.14), shW = Math.round(w * 0.3);
    var shY0 = y + Math.round(h * 0.13), shY1 = y + Math.round(h * 0.3);
    ctx.fillStyle = dim(C.shutterMid, 0.5);
    for (py = shY0; py < shY1; py += 3) ctx.fillRect(shX, py, shW, 1);
    ctx.fillStyle = dim(C.shutterShade, 0.5);
    ctx.fillRect(shX + Math.round(shW / 2), shY0, 1, shY1 - shY0);
    /* the breast runs from the roofline to the floor in 1px courses of
       two stones, and the near wall's lit panel covers its lower part;
       the set hangs on it at the shutters' height */
    var tvX = x + Math.round(w * 0.66), tvW = big ? 16 : 12, tvH = big ? 7 : 5;
    var stX = tvX - 1, stW = tvW + 2;
    for (py = roofY + 1; py < floorY; py++) {
      ctx.fillStyle = (py & 1) ? dim(M.stoneCream, 0.62) : dim(M.stoneGrey, 0.62);
      ctx.fillRect(stX, py, stW, 1);
      /* one joint per course, wandering, so the stripes are stone */
      ctx.fillStyle = dim(M.stoneJoint, 0.3);
      ctx.fillRect(stX + (py * 7) % stW, py, 1, 1);
    }
    ctx.fillStyle = M.screenDeep;        ctx.fillRect(tvX, shY0, tvW, tvH);
    ctx.fillStyle = dim(M.bezelHi, 0.2); ctx.fillRect(tvX, shY0, tvW, 1);

    /* 2. the near wall, the inside of the fort, in shadow: two printed
       panels with scalloped tops at two heights, and a doorway */
    var pw = Math.round(w * 0.42);
    var panels = [
      { x: x, top: y + Math.round(h * 0.38), lit: false },
      { x: x + pw, top: y + Math.round(h * 0.52), lit: true }
    ];
    for (k = 0; k < 2; k++) {
      var p = panels[k], ph = floorY - p.top;
      var face = p.lit ? mix(P.kraftIn, P.ledGreenDim, 0.25) : P.kraftIn;
      ctx.fillStyle = face; ctx.fillRect(p.x, p.top, pw, ph);
      ctx.fillStyle = P.kraftInLit; ctx.fillRect(p.x, p.top + 1, pw, 1);
      ctx.fillStyle = P.outline;    ctx.fillRect(p.x, p.top, pw, 1);
      /* the scallops: a bite every 6px along the roof edge */
      for (i = 3; i < pw - 2; i += 6) {
        ctx.fillStyle = P.roomWall; ctx.fillRect(p.x + i, p.top, 2, 1);
        ctx.fillStyle = P.outline;  ctx.fillRect(p.x + i, p.top + 1, 2, 1);
      }
      /* three tiny doodles: a face, a star, a bolt */
      var ink = P.printIn;
      var dx0 = p.x + Math.round(pw * 0.3), dy0 = p.top + Math.round(ph * 0.28);
      pcircle(ctx, dx0, dy0, 2, ink);
      ctx.fillStyle = ink; ctx.fillRect(dx0 - 1, dy0, 1, 1); ctx.fillRect(dx0 + 1, dy0, 1, 1);
      var sx0 = p.x + Math.round(pw * 0.72), sy0 = p.top + Math.round(ph * 0.55);
      for (i = 0; i < 5; i++) {
        var a0 = -Math.PI / 2 + i * TAU / 5, a1 = -Math.PI / 2 + ((i + 2) % 5) * TAU / 5;
        pline(ctx, sx0 + Math.cos(a0) * 3, sy0 + Math.sin(a0) * 3, sx0 + Math.cos(a1) * 3, sy0 + Math.sin(a1) * 3, ink);
      }
      pline(ctx, p.x + Math.round(pw * 0.2) + 1, p.top + Math.round(ph * 0.7) - 2,
            p.x + Math.round(pw * 0.2) - 1, p.top + Math.round(ph * 0.7) + 2, ink);
      /* four small holes and a porthole cut through to the room */
      for (i = 0; i < 4; i++) {
        ctx.fillStyle = p.lit ? P.ledGreen : P.holeDark;
        ctx.fillRect(p.x + Math.round(pw * (i % 2 ? 0.75 : 0.25)), p.top + Math.round(ph * (0.25 + (i >> 1) * 0.4)) + (i % 2) * 3, 1, p.lit ? 2 : 1);
      }
      var portX = p.x + pw - 6, portY = p.top + Math.round(ph * 0.45);
      ctx.fillStyle = P.kraftDeep; ctx.fillRect(portX - 2, portY - 2, 5, 5);
      ctx.fillStyle = P.roomWall;  ctx.fillRect(portX - 1, portY - 2, 3, 5); ctx.fillRect(portX - 2, portY - 1, 5, 3);
      /* a bump at the roof seam */
      ctx.fillStyle = P.foam;    ctx.fillRect(p.x + pw - 2, p.top - 2, 4, 2);
      ctx.fillStyle = P.foamLit; ctx.fillRect(p.x + pw - 1, p.top - 2, 2, 1);
    }
    /* the oval badge on the first panel */
    var bgx = panels[0].x + Math.round(pw * 0.42), bgy = panels[0].top + Math.round((floorY - panels[0].top) * 0.5);
    ctx.fillStyle = P.printIn;  ctx.fillRect(bgx, bgy, 9, 5);
    ctx.fillStyle = P.badgeIn;  ctx.fillRect(bgx + 1, bgy + 1, 7, 3);
    ctx.fillStyle = mix(P.badgeMark, P.printIn, 0.3); ctx.fillRect(bgx + 3, bgy + 2, 4, 1);
    /* dashes down the seam between them */
    ctx.fillStyle = P.foam;
    for (py = panels[1].top + 4; py < floorY - 2; py += 8) ctx.fillRect(x + pw - 1, py, 3, 1);
    /* the green chamber's pool, and the light spilling out at its foot */
    ctx.save();
    ctx.beginPath(); ctx.rect(panels[1].x, panels[1].top, pw, floorY - panels[1].top); ctx.clip();
    var gcx = panels[1].x + pw / 2, gcy = (panels[1].top + floorY) / 2;
    var g = ctx.createRadialGradient(gcx, gcy, 1, gcx, gcy, pw * 0.6);
    var breath = 0.75 + 0.25 * Math.sin(t * 1.4);
    g.addColorStop(0, 'rgba(94,240,122,' + (0.34 * breath).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(94,240,122,0)');
    ctx.fillStyle = g; ctx.fillRect(panels[1].x, panels[1].top, pw, floorY - panels[1].top);
    ctx.restore();
    Tint.rect(ctx, panels[1].x - 3, floorY - 3, pw + 6, 3, P.ledGreen, 5);

    /* 3. the roofline: the kill line as the roof panel's edge, with two
       connectors hanging under it */
    ctx.fillStyle = P.kraftLit; ctx.fillRect(x, roofY - 3, w, 1);
    ctx.fillStyle = P.kraft;    ctx.fillRect(x, roofY - 2, w, 2);
    ctx.fillStyle = P.outline;  ctx.fillRect(x, roofY, w, 1);
    ctx.fillStyle = P.foam;
    ctx.fillRect(x + Math.round(w * 0.25), roofY + 1, 4, 2); ctx.fillRect(x + Math.round(w * 0.75), roofY + 1, 4, 2);

    /* 7. the floor - laid before the things that stand on it: the grey
       geometric rug with a hint of its lozenges, the pale boards under it
       with their seams crawling, and the box of panels in the foreground
       crawling faster */
    var rugH = Math.round((y + h - floorY) * 0.55);
    ctx.fillStyle = P.geoGrey;  ctx.fillRect(x, floorY, w, rugH);
    ctx.fillStyle = P.geoLight; ctx.fillRect(x, floorY, w, 1);
    for (i = 0; i < w; i += 8) {
      ctx.fillStyle = P.geoDark;
      if (floorY + 2 < floorY + rugH) ctx.fillRect(x + i, floorY + 2, 1, 1);
      if (floorY + 4 < floorY + rugH) ctx.fillRect(x + i + 4, floorY + 4, 1, 1);
      ctx.fillStyle = P.geoLight;
      if (floorY + 3 < floorY + rugH) ctx.fillRect(x + i + 2, floorY + 3, 1, 1);
    }
    ctx.fillStyle = P.woodPale; ctx.fillRect(x, floorY + rugH, w, y + h - floorY - rugH);
    ctx.fillStyle = P.woodSeam;
    for (i = 0; i < w / 12; i++) ctx.fillRect(x + wrap(i * 13 - s, w), floorY + rugH + 1, 1, y + h - floorY - rugH - 1);
    var boxX = x + wrap(-s * 1.35, w + 40) - 30;
    ctx.fillStyle = P.panelYellow; ctx.fillRect(boxX + 4, y + h - 6, 4, 3); ctx.fillRect(boxX + 16, y + h - 7, 4, 4);
    ctx.fillStyle = P.panelBlue;   ctx.fillRect(boxX + 10, y + h - 6, 4, 3);
    ctx.fillStyle = P.boxBrown;    ctx.fillRect(boxX, y + h - 3, 30, 3);
    ctx.fillStyle = P.kraftLit;    ctx.fillRect(boxX, y + h - 3, 30, 1);

    /* 7b. THE AMMO BAG on the rug, left of the bird's lane, before the
       planks so a plank sliding by passes in front of it: the navy base
       band, the cream body in its outline, the two straps running up into
       a 1px handle arch, and the heap on the rim - two pellet yellows with
       a pellet's dark ring between them. No glow on the card. Two straps
       where the brief allowed one: one strap was a bucket, two are a
       tote */
    var gbx = x + Math.round(w * 0.12), gbw = big ? 9 : 7, gbh = big ? 6 : 5;
    var gtop = floorY - 1 - gbh, gs0 = gbx + (big ? 2 : 1), gs1 = gbx + gbw - (big ? 3 : 2), gmid = gbx + (gbw >> 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(gbx - 1, gtop - 1, gbw + 2, gbh + 2);
    ctx.fillStyle = P.bagCream; ctx.fillRect(gbx, gtop, gbw, gbh);
    ctx.fillStyle = P.bagNavy;
    ctx.fillRect(gbx, floorY - 2, gbw, 1);
    ctx.fillRect(gs0, gtop - 2, 1, gbh + 1); ctx.fillRect(gs1, gtop - 2, 1, gbh + 1);
    ctx.fillRect(gs0, gtop - 3, gs1 - gs0 + 1, 1);
    ctx.fillStyle = CP.pelletYellow || '#ffc21a'; ctx.fillRect(gmid - 1, gtop - 1, 1, 1); ctx.fillRect(gmid + 1, gtop - 1, 1, 1);
    ctx.fillStyle = CP.ring || '#1a1410';         ctx.fillRect(gmid, gtop - 1, 1, 1);

    /* 4. two planks sliding past, caps on their mouths */
    var period = big ? 46 : 38;
    var span = floorY - roofY;
    for (k = 0; k < 3; k++) {
      var ox = Math.round(x + w + 10 - wrap(s + k * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.36);
      var room = Math.max(1, span - gapH - 20);
      var gapY = Math.round(roofY + 10 + (k * room) / 2);
      pvColumn(ctx, ox, roofY + 1, gapY - roofY - 1);
      pvColumn(ctx, ox, gapY + gapH, floorY - gapY - gapH);
      ctx.fillStyle = P.outline;  ctx.fillRect(ox - 2, gapY - 3, 13, 3); ctx.fillRect(ox - 2, gapY + gapH, 13, 3);
      ctx.fillStyle = P.kraftPlank; ctx.fillRect(ox - 1, gapY - 2, 11, 1); ctx.fillRect(ox - 1, gapY + gapH + 1, 11, 1);
      ctx.fillStyle = P.foam;     ctx.fillRect(ox + 1, gapY - 1, 2, 1); ctx.fillRect(ox + 6, gapY - 1, 2, 1);
      ctx.fillRect(ox + 1, gapY + gapH, 2, 1); ctx.fillRect(ox + 6, gapY + gapH, 2, 1);
    }

    /* 6. a biscuit tumbling down the right third, its height cycling the
       way the twelve real frames do, with its hard offset shadow */
    var bx = x + Math.round(w * 0.86);
    var by = Math.round(roofY + 2 + wrap(s * 1.2, floorY - roofY - 10));
    var bh = [7, 6, 4, 2, 4, 6][Math.floor(t * 9) % 6];
    ctx.fillStyle = P.shade;   ctx.fillRect(bx + 2, by + 2, 7, bh);
    ctx.fillStyle = P.foam;    ctx.fillRect(bx, by, 7, bh);
    ctx.fillStyle = P.outline; ctx.fillRect(bx, by, 1, bh); ctx.fillRect(bx + 6, by, 1, bh);
    ctx.fillStyle = P.foamRim; ctx.fillRect(bx + 1, by, 5, 1);

    /* 8. the doodad flying it: THE HOUSE BIRD, the same one every cover
       draws (js/desk.js, js/mantle.js) - the body, the eye, the beak, and
       the bob of h*0.15 on a 3.1 sine. Round 1 drew it here with no beak
       and a 2px bob, and the owner noticed. Its halo is PALE - the plan
       asked for the Whiteboard's dark one, but that card is a white board
       and this one is a dark room, and a dark halo on a dark wall drew a
       picture frame round the bird */
    var dxp = Math.round(x + w * 0.3);
    var dyp = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, dxp - sz / 2 - 2, dyp - sz / 2 - 2, sz + 4, sz + 4, P.rugLit, 3);
    ctx.fillStyle = P.outline;  ctx.fillRect(dxp - sz / 2 - 1, dyp - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(dxp - sz / 2, dyp - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(dxp - sz / 2, dyp - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(dxp + sz / 2 - 2, dyp - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(dxp + sz / 2, dyp, 2, 1);

    /* 5. THE SIGNATURE, on a three-second loop: he faces the doodad from
       0 to 1.0, three aim dots run out of the muzzle from 1.0 to 1.5, a
       yellow pellet with its dark ring crosses the card from 1.5 to 2.4,
       and he turns back from 2.4 to 3.0 */
    var phase = t % 3;
    var cx = x + Math.round(w * 0.62), baseY = floorY;
    var face = phase < 2.4 ? -1 : 1;
    /* the gun is held LOW and FORWARD, out past his side at the lower
       third of the cup, as js/cupmen.js now holds it in the game: at
       (4, 5) up it sat on the edge of his face at eye height */
    var hx = cx + face * (big ? 5 : 4), hy = baseY - (big ? 3 : 2);
    var mx = hx + face * (big ? 7 : 5);
    Tint.rect(ctx, cx - (big ? 5 : 4), baseY - 1, big ? 10 : 8, 1, P.shade, 8);
    if (typeof Cupmen !== 'undefined' && Cupmen.drawPixelCup && Cupmen.drawPixelGun) {
      Cupmen.drawPixelCup(ctx, cx, baseY, 'crimson', face, big);
      Cupmen.drawPixelGun(ctx, hx, hy, 'crimson', face, face < 0);
    } else {
      /* never throw on a card: a flat cup with its eyes, if the Cupmen are
         not there to draw themselves */
      var cw = big ? 8 : 6, chh = big ? 9 : 7;
      for (i = 0; i < chh; i++) {
        var iw = Math.round(cw * (0.6 + 0.4 * i / (chh - 1)));
        ctx.fillStyle = P.cupRedLit; ctx.fillRect(cx - Math.floor(iw / 2), baseY - chh + i, iw, 1);
      }
      ctx.fillStyle = '#ffffff'; ctx.fillRect(cx + face * 2 - 1, baseY - chh + 2, 1, 1); ctx.fillRect(cx + face * 2 + 1, baseY - chh + 2, 1, 1);
      ctx.fillStyle = CP.gunBlue || '#1f4fb8'; ctx.fillRect(Math.min(hx, mx), hy - 1, Math.abs(mx - hx) + 1, 2);
    }
    if (phase >= 1.0 && phase < 1.5) {
      var nd = 1 + Math.min(2, Math.floor((phase - 1.0) / 0.5 * 3));
      ctx.fillStyle = CP.flash || '#fff1b0';
      for (i = 1; i <= nd; i++) ctx.fillRect(mx + face * i * 4, hy - 1, 1, 1);
    }
    if (phase >= 1.5 && phase < 2.4) {
      var q = (phase - 1.5) / 0.9;
      px = Math.round(mx + face * q * (w * 0.5));
      py = hy - 1;
      ctx.fillStyle = CP.ring || '#1a1410';      ctx.fillRect(px - 1, py - 1, 3, 3);
      ctx.fillStyle = CP.pelletYellow || '#ffc21a'; ctx.fillRect(px - 1, py, 3, 1); ctx.fillRect(px, py - 1, 1, 3);
      ctx.fillStyle = CP.pelletYellowHi || '#fff3b0'; ctx.fillRect(px, py - 1, 1, 1);
    }

    /* 9. and the room is lit green, not lamp-warm */
    Tint.rect(ctx, x, y, w, h, P.ledGreen, 1);
  }

  /* One plank inside a cover: nine pixels of the plank's own warm kraft,
     so the cover's planks are the bay's, with a bitten outline,
     two holes, and a connector standing proud across a seam. */
  function pvColumn(ctx, x, y, h) {
    if (h <= 0) return;
    ctx.fillStyle = P.kraftPlank;    ctx.fillRect(x, y, 9, h);
    ctx.fillStyle = P.kraftPlankLit; ctx.fillRect(x + 1, y, 1, h);
    ctx.fillStyle = P.outline;
    for (var i = 0; i < h; i++) if (i % 5 !== 2) { ctx.fillRect(x - 1, y + i, 1, 1); ctx.fillRect(x + 9, y + i, 1, 1); }
    ctx.fillStyle = P.holeDark;
    if (h > 8) ctx.fillRect(x + 3, y + Math.round(h * 0.3), 1, 1);
    if (h > 14) ctx.fillRect(x + 6, y + Math.round(h * 0.7), 1, 1);
    if (h > 12) {
      var sy = y + Math.round(h / 2);
      ctx.fillStyle = P.outline; ctx.fillRect(x, sy, 9, 1);
      ctx.fillStyle = P.foam;    ctx.fillRect(x - 2, sy - 1, 2, 3); ctx.fillRect(x + 9, sy - 1, 2, 3);
    }
  }

  /* ====================================================== generation */

  /* A stack of panels. It also turns over the page in the run's notebook:
     a bay holds ONE thing on its floor - the ammo bag or a Cupman - and
     makePillar is the first maker the engine calls for a bay, so it is
     where the two bay flags go back to false. makeBoon sets bayBoon and
     js/cupmen.js's makeFoe reads both last. baySpike is still reset here
     because js/cupmen.js still reads it, but since round 2 nothing sets it
     true: the tripods and ribbons are out of the bay (see makeSpikes). */
  function makePillar(x, gapY, gapH, run) {
    if (run && run.ledger) { run.ledger.baySpike = false; run.ledger.bayBoon = false; }
    var roll = Math.random();
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: roll < 0.58 ? 0 : 1, scored: false };
  }

  /* NO SPIKES IN THIS BAY. Round 1 grew a tripod light stand on the
     floor or a ribbon pull-tab off the roof; the owner took them out -
     "we already get our floor obstacles with the cupmen". js/levels.js
     sets spikeScore so high that the engine's spikesReady() is never true
     here, so this is never called in a run. It stays because the engine's
     call site is level-agnostic and names art.makeSpikes for every bay; if
     it ever were called, what comes back is already gone - drawObstacle
     and rectsFor both return on ob.gone, so it draws nothing and kills
     nothing - and it never touches the ledger, so it cannot cost a bay
     its Cupman. */
  function makeSpikes(x, side, count, maxLen, run) {
    return { type: 'spike', x: Math.round(x), side: side, len: 0, w: 0, gone: true };
  }

  /* THE BISCUIT, always plain. `spicy` is ignored, and the tune carries no
     spicyChance, goldChance or sourChance for this bay: every gift here is
     a pellet out of a gun (js/cupmen.js), and a black puck that was
     sometimes a present would be a black puck the player stopped dodging.
     No `face`: one look, both sides of it baked into the twelve frames. */
  function makeDrop(x, spicy, fall, run) {
    return { type: 'drop', x: x, y: CEIL + 5, w: 11, vy: fall, spicy: false, gold: false,
             broken: 0, spin: rand(0, TAU),
             /* 4 to 8 radians a second: a slower turn than the magnet's
                5 to 9, foam being lighter and catching more air */
             spinRate: rand(4, 8) * (chance(0.5) ? -1 : 1) };
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 16, kind: randInt(0, 4) };
  }

  /* THE AMMO BAG, standing on the rug. ob.x is its MIDDLE - the box and
     the grab point are both centred on it - and the engine's cull and save
     look 46px either side of [x, x + w], which covers the ten pixels it
     reaches left of it. No `burst`: a spare life comes apart in the HUD's
     jade in every bay. */
  function makeBoon(x, run) {
    if (run && run.ledger) run.ledger.bayBoon = true;
    return { type: 'boon', x: x, y: FLOOR - 17, w: 20, taken: false, phase: rand(0, TAU),
             dx: 0, dy: 0, name: BOON_NAME };
  }

  /* THE LEVEL MOVES ITS OWN DROPS, both kinds. Publishing stepDrop takes
     the engine's four lines away for EVERY drop, so the biscuit has to
     integrate itself here - gravity, position, spin, and land on the rug -
     and a pellet is handed to js/cupmen.js, which flies it in the screen
     frame and pops it on cardboard. Read the list, never write it. */
  function stepDrop(ob, dt, obstacles, run) {
    if (ob.shot) return Cupmen.stepShot(ob, dt, obstacles, run);
    ob.vy += DROP_GRAV * dt;
    ob.y += ob.vy * dt;
    ob.spin += ob.spinRate * dt;
    return ob.y >= FLOOR - 4;
  }

  /* ---------------------------------------------- collision rectangles

     Every lethal pixel has a box and nothing harmless has one: the walls,
     the room, the connectors in the walls, the litter and the fore layer
     are all safe to touch. */
  function rectsFor(ob, out) {
    if (ob.gone) return out;
    if (ob.type === 'pillar') {
      /* the Whiteboard's four boxes, verbatim: the columns are the 34px
         face, the caps 42; the connectors standing proud of the face are
         decoration inside them */
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);

    } else if (ob.type === 'spike') {
      /* a Cupman; a spike that is not one never exists here (makeSpikes) */
      if (ob.foe) return Cupmen.foeRects(ob, out);

    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      if (ob.shot) return Cupmen.shotRects(ob, out);
      /* the box follows the TUMBLE: an edge-on biscuit is a 9x3 band and a
         face-on one a 9x9 block, the magnet's rule, so a puck turned edge
         on is never a frame of empty air that kills */
      var fh = Math.max(2, BIS_H[bisFrame(ob)]);
      out.push([ob.x - 4, ob.y - (fh / 2 - 1), 9, fh - 2]);

    } else if (ob.type === 'boon') {
      /* the bag, handles included - you can grab it by the handle - and
         travelling with it when Gerald reels it in */
      if (!ob.taken) out.push([ob.x + ob.dx - 9, FLOOR - 24 + ob.dy, 18, 23]);
    }
    return out;
  }

  /* --------------------------------------------------- the Cupmen's hooks

     Four delegates, one line each but the last, which also puts the
     cardboard back in front of the King (occludeKing). The engine asks `art` for these and
     never names who answers, and this file is the art; js/cupmen.js is
     where the answers live. They are wrapped rather than exported as the
     Cupmen's own functions because Cupmen is resolved when they RUN, not
     when this file loads - the only thing of theirs read at load is P. */
  function makeFoe(mid, spacing, run) { return Cupmen.makeFoe(mid, spacing, run); }
  function stepFoe(ob, dt, obstacles, run) { Cupmen.stepFoe(ob, dt, obstacles, run); }
  function bopFoe(ob, run) { Cupmen.bopFoe(ob, run); }
  function drawActors(ctx, obstacles) {
    Cupmen.drawActors(ctx, obstacles);
    occludeKing(ctx, obstacles);
  }

  /* THE GIANT STANDS BEHIND THE CARDBOARD. The King is drawn on the
     smooth layer, which goes on after the pixel layer, so every plank
     that scrolled through him was painted UNDER him - a lethal lower
     column vanishing inside a 100px cup, or, with the fade that hid it,
     a see-through king that meant both "you hit him" and "a plank is in
     him". So once the actors are down, every plank whose box [x - 4,
     x + 38] overlaps his drawn half-width is drawn again OVER him: its
     LOWER column and its up-cap, the same crops drawPillar makes, at
     integer coordinates with smoothing off so the redraw lands on the
     pixel layer's own pixels. He then stands behind the plank with his
     crown over it - ref 4's sofa behind the panel - and the edge that
     kills is never hidden. The
     upper column needs nothing: it ends at gapY <= 126, over the top of
     his crown (FLOOR - 100 = 142).

     His centre is read as ob.x + ob.w / 2, which is his drawn middle
     whatever size js/cupmen.js gives him, and the overlap uses the same
     half-width. Cardboard is redrawn only while he is drawn at all. */
  function occludeKing(ctx, obstacles) {
    var i, j, k, o;
    for (i = 0; i < obstacles.length; i++) {
      k = obstacles[i];
      if (!k.foe || k.gone || k.kind !== 'king') continue;
      var half = (k.w || 76) / 2, kc = k.x + half;
      if (kc < -half || kc > VW + half) continue;
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
      ctx.imageSmoothingEnabled = false;
      for (j = 0; j < obstacles.length; j++) {
        o = obstacles[j];
        if (o.gone) continue;
        if (o.type === 'pillar') {
          if (o.x + COL_W + 4 < kc - half || o.x - 4 > kc + half) continue;
          var x = Math.round(o.x), botY = o.gapY + o.gapH, botH = FLOOR - botY;
          if (botH <= 0) continue;
          LivingRoom.drawColumn(ctx, T.column[o.variant || 0].canvas, x - COL_PAD, botY,
                                COL_W + COL_PAD * 2, botH);
          ctx.drawImage(T.capUp.canvas, x - 4, botY);
        }
      }
      ctx.restore();
    }
  }

  /* WHAT IS ABSENT, and why it is absent rather than stubbed: makeMeet
     (nobody hides in this bay - the roster offers no meet here), makeWarp
     (the hole in the floor is the Whiteboard's) and stepBoon (the bag
     stands still; the engine only moves a boon a level steps). Three keys
     absent is three places nobody can put code that never runs. */
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
    rectsFor: rectsFor,
    makeFoe: makeFoe, stepFoe: stepFoe, bopFoe: bopFoe, drawActors: drawActors
  };
})();
