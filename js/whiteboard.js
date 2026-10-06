/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE WHITEBOARD

   The fourth bay of five. A long whiteboard scrolls past with NOTHING
   behind it: every doodle, tally and parabola anybody ever drew on it is
   still there, stuck magnets and all. Markers dart in from the right and
   draw a thick black zigzag off the top rail or off the tray while you
   watch; round magnets tumble off the rail flashing silver-then-black;
   and the four familiar power-ups turn up as coloured marker drawings
   that run down the board like wet ink. Drawn from the four photographs
   in Assets/Concept.

   WHAT IS ACTUALLY ON THE BOARD, counted off the photographs, because an
   earlier pass guessed and the board read as empty grey. Refs 1 and 4
   show the whole thing at once: the parabola and the pointy S are THICK
   and saturated blue, the goofy face is blue, the noughts and crosses
   purple, the scribbled web purple, the checker patch orange and green.
   The tallies, the star and the wavy lines are the thin faint ones and
   ABCDE is a ghost somebody half-wiped. Stuck to it are about six BAR
   magnets - red, red, green, yellow, yellow, blue - and about eight small
   round silver ones plus the single copper one in ref 3. That is a board
   you can read from the far side of a room, and it is what bakeBoard puts
   on each 480px tile: twelve to fourteen doodles, four or five bars, five
   to seven silver rounds and exactly one copper.

   THE RULE OF THIS LEVEL. The board, its ramblings and its stuck magnets
   all scroll at 1.0 - the obstacles' own speed - because a whiteboard is
   a PLANE. There is no "behind" to parallax against, and ink drawn onto
   a board must not slide across the doodles it was drawn over. Every
   other level in the game is three or four layers at three or four
   speeds; this one is one layer at one speed, and that is not a saving,
   it is the subject. The only static thing in the bay is the lamp's
   glare on the melamine, baked once and blitted at a fixed position:
   a reflection does not travel with the surface it is on, and it is the
   one honest depth cue a flat plane has to give. Repetition is hidden
   the way the Deck hides its fence - three different 480px tiles, picked
   per world column by hash, so the board does not visibly repeat until
   the ninth screen.

   THE CEILING KILLS IN HERE, which is the room's rule and not this
   level's - but the band across the top of this bay is THIS LEVEL'S and
   not the room's. The room's plaster-and-pendant band came off the
   Ceiling reference photographs, which the owner is keeping for a
   Ceiling level; the Desk and the Couch still wear it, the Mantle and
   this bay do not. What a whiteboard on a rolling frame actually has
   over it is in Whiteboard ref 1: the frame's top rail - a fat
   aluminium extrusion with a hanger bracket in the middle, hinge plates
   where the panel pivots, scraps of blue tape stuck to it - and behind
   and above the rail, the dim room the board is standing in. bakeTop
   builds that, 240x24 on the room's own tile beat, with the rail's
   underside on the kill line; drawCeiling lays it. The rail over your
   head is the kill line, and the second flap is the mistake this level
   punishes.

   THE SIGNATURE IS THAT EVERYTHING IS DRAWN IN MARKER. Every power-up
   in the game shows up on this board as a dry-erase sketch of itself -
   the pepper, the lime, the succulent and the golden apple - which makes
   this the first bay that sheds BOTH the heat and the sour (the Fort
   after it is the second, out of its Cupmen's guns). drawGauge in
   js/scene_play.js grew a `y` parameter for it, so the lime's gauge
   moves to 92 rather than standing down while the heat has the 80. Each
   of the two is a shade rarer than it would be alone, because two
   power-ups at one rate is twice as many power-ups.

   It is also the first LIGHT room in the game, which is why drawChase
   now puts a shadow under NEXT, PASSED and HIGH SCORE, why this level's
   particles are DARK where every other level's are pale, and why the
   doodad on the cover wears a dark halo rather than a bright one. Dim
   grey ink on a white board is no ink at all.

   Same discipline as js/deck.js, js/canopy.js and js/construction.js:
   every pixel in here is generated and baked once, and ANY shade laid
   over something that scrolls is a flat Tint. The Bayer grid is anchored
   in user space, so a dithered rect that moves re-phases against the
   pattern and the pixels boil. There is no call to Dither.rect anywhere
   in this file, and the magnets tumble by swapping baked frames rather
   than by ctx.rotate, for the same reason.

   ONE COLOUR RULE RUNS THE WHOLE BAY, and it is TOTAL:

     BLACK INK KILLS. The 3px zigzag a marker is drawing, and the 34px
     column a marker filled in. Nothing else in the bay is black.
     EVERYTHING COLOURED is scenery or a gift.

   The pillars used to be aluminium posts, and they read as stacked
   chrome canisters: every 21px there was a rivet and a hinge or a band
   of blue tape, which is horizontal stripes on a cylinder, and nothing
   about brushed aluminium says whiteboard anyway. A solid bar somebody
   filled in with the black marker says it instantly, and it is what
   makes the rule above cover the whole screen instead of half of it.

   WHY THE LETHAL LINES STAY UNMISTAKABLE OVER BUSIER SCENERY - five
   separations, every one of them present in the photographs too, which
   is why a real board covered in scribble is still easy to read:

     VALUE  the ink is luminance 23 and the board is 229. The darkest
            thing anybody ever DREW on this board is the purple at 119,
            so no mark on it comes within 96 points of the ink; the
            darkest pixel of any kind on a baked tile, measured, is the
            red bar magnet at 97, and that is 74 points clear. No ink
            pigment is allowed under 119 and nothing in the bay but the
            marker is allowed under 97.
     HUE    the ink is the only neutral dark in the bay. Every doodle is
            coloured, and every magnet is a flat saturated rectangle,
            which no stroke in this level is.
     WIDTH  the zigzag is 3px and the bars are 34. No doodle exceeds 2.
     MOTION the zigzag is the only thing on the board being DRAWN - the
            marker rides its live end and the wet shine sits on the last
            36px of scroll - and the bars arrive from the right at
            obstacle speed with their caps on the mouth of the gap,
            exactly where every level in the game puts them.
     SHADOW a FALLING magnet throws a hard 2px offset block. Nothing
            stuck to the board throws anything, because a thing lying
            flat on a surface has no gap under it to throw one, and a
            drawing casts no shadow on the surface it is drawn on. So a
            magnet in the air is never confused with one stuck on, and
            drawPillar paints no shadow at all.

   The gifts keep their own separation from the newly saturated doodles
   three ways over: they FALL while the board scrolls as one plane, they
   pulse a glow, and they are 2px strokes filled with board white.
------------------------------------------------------------------ */
'use strict';

var Whiteboard = (function () {

  /* the room's, aliased the way every Living Room bay aliases it */
  var CEIL = LivingRoom.CEIL, FLOOR = LivingRoom.FLOOR;
  var R = LivingRoom.P;

  var P = {
    /* ---- the melamine itself. Four tones and nothing else: a board is
       a board, and the moment it has five tones it reads as a wall. */
    board:      '#e3e6e2',   /* luminance 226                           */
    boardGlare: '#f7f8f5',   /* where the pendant lands on it           */
    boardShade: '#d4d8d4',   /* the grubby lower-left corner            */
    ghost:      '#c3c7c6',   /* 197: what was never quite erased        */
    seam:       '#c0c5c3',   /* the panel joint, one per tile           */

    /* ---- the frame. Ten rows of extrusion at the ceiling and six at
       the tray, and that is all the aluminium left in the bay: the posts
       are black marker now. See bakeBar and bakeTop. */
    alumLit:    '#dfe2e6',
    alumMid:    '#b4b9bf',
    alumDark:   '#80868d',
    groove:     '#4f545b',   /* the rail's channel and the tray's        */
    /* ---- the room behind the top rail, out of the lamps. Two tones
       twelve apart, ramped row by row in bakeTop so the band above the
       rail has no edge in it; both sit far under the board (226) and far
       over the ink (23), so neither can be mistaken for a stroke. */
    beyond:     '#30323a',   /* 51: the wall behind the board, at the rail */
    beyondDeep: '#24262c',   /* 38: the same wall at the very top of the screen */
    tape:       '#2e8ed9',   /* the blue painter's tape on the rail - barBlue */
    capBlack:   '#1f2124',   /* the lost marker cap lying in the tray    */
    capHi:      '#4a4d52',
    outline:    '#1c1e22',

    /* ---- THE RAMBLINGS, in the pigments they are actually drawn in.
       These were pastels - everything above 150 luminance, 1px, so that
       nothing could compete with the ink - and the board came out empty
       grey. The photographs are not pastel at all: the parabola is a
       SATURATED blue laid on twice, and the thing that keeps it from
       competing with the ink is not that it is pale, it is that it is
       BLUE. So every one of these is a real marker colour, and the floor
       under them is 119 rather than 150 - still 97 clear points above the
       ink at 22, which is a wider gap than most of this game's levels
       have between a hazard and its own wall.

       The number after each is its luminance, and it is there so that
       anybody adding a ninth pigment has to write one down too. */
    inkBlue:    '#4f7fd4',   /* 123 - the parabola, the arrow            */
    inkPurple:  '#8a5fc4',   /* 119 - noughts and crosses, the web       */
    inkGreen:   '#5fa84a',   /* 135 - the checker's grid, the bar chart  */
    inkOrange:  '#e8893a',   /* 156 - the checker's fill                 */
    inkSky:     '#5aa8dc',   /* 151 - the face, the pointy S             */
    inkYellow:  '#e0c040',   /* 187 - the tallies, the bulb              */
    inkTan:     '#cfae70',   /* 177 - the star, the wavy lines           */

    /* ---- the stuck magnets, flat and glossy, off the photographs */
    barRed:     '#d7302c',
    barGreen:   '#8cc43a',
    barYellow:  '#f1d339',
    barBlue:    '#2e8ed9',
    barHi:      '#ffffff',
    copper:     '#8a5a3a',   /* the one brown round magnet in ref 3      */
    copperHi:   '#c08a5e',   /* ... and the light off the top of it      */

    /* ---- the dry-erase marker. The only true black in the bay. */
    ink:        '#17161b',
    inkWet:     '#4b4852',   /* the shine on a stroke still drying       */
    markerBody: '#1c1a1e',
    markerLit:  '#4a4650',
    markerLabel:'#e9ebe7',
    markerCone: '#5c6168',
    felt:       '#0a0a0c',

    /* ---- the falling magnets */
    magSilver:  '#c6cacd',
    magSilverHi:'#eef0f2',
    magSilverDk:'#8d9297',
    magBlue:    '#2e8ed9',
    magBlueHi:  '#8cc6f0',
    magBlueDk:  '#1b5f98',
    magBlack:   '#2c2e33',
    magBlackHi: '#5a5d64',
    ferrite:    '#1a1b1f',   /* the raw back face of a disc magnet       */
    ferriteHi:  '#3b3d44',
    shade:      '#6a6e74',   /* this level's Tint-only shadow colour     */

    /* ---- the four power-ups, drawn rather than grown */
    pepRed:     '#e03a2a',
    pepDark:    '#a12419',
    pepGlow:    '#ffb38a',
    stemGreen:  '#5fae4a',
    limeHi:     '#d6ff7a',
    limeMid:    '#8fd44a',
    limeDark:   '#3f7a2a',
    goldDark:   '#b8862a',
    goldMid:    '#e0b04a',
    goldHi:     '#f3cc84',
    goldShine:  '#fff6d4',
    /* the succulent's four greens are the Garden's exactly, because
       PlayScene draws the HUD life and the save burst in these pigments
       and a spare life must be the same plant in every level */
    sucDark:    '#2f6b62',
    sucMid:     '#5fae9a',
    sucHi:      '#93d8bd',
    sucTip:     '#e08a9a',
    potOrange:  '#c9783f',
    potHi:      '#e8a46e',

    /* ---- THE FUNNEL, and the only three pigments in this table that
       are not the bay's own. Everything above is a thing somebody drew
       on this board or left lying in its tray; these three are a colour
       the board does not own, and that is the entire reason they work.
       The funnel's bowl is not a drawing of a hole, it IS the hole, and
       what shows through it is the slate of the place it leads to.

       The header's value rule still holds and is why the green is
       allowed to be this dark: 101 against the ink's 23 is 78 clear
       points, which is more than the 74 the red bar magnet keeps. The
       HUE rule does the rest - nothing else in the bay is green, so no
       pixel of this can be read as a stroke, and nothing else in the
       bay shows a colour the bay does not own. See bakeFunnel. */
    funnelDeep: '#45765e',   /* 101 - the inside of the bowl. Lifted off
                                the Chalkboard's own slate at 65, because
                                a hole seen from a lit room is lit        */
    swirl:      '#8fc0a4',   /* 174 - the whirlpool turning in the bowl   */
    funnelDust: '#d8e3d3',   /* the chalk dust leaking back out of it     */

    /* ---- the marker tray along the bottom */
    trayChannel:'#8f949b',
    trayDeep:   '#6a6f76',

    void:       '#2a2c30'    /* grey-black: this bay's gloom, Tint only  */
  };

  var END_MIN = LivingRoom.END_MIN;
  var CEIL_KILLS = LivingRoom.CEIL_KILLS;

  /* A disc magnet is a PUCK: small, dense, and it arrives before you have
     finished thinking about it. 46 against the Garden's tomato at 34 and
     the Construction's 2x4 at 44 - a hair heavier than a stick of lumber,
     which is right for a thing made of sintered ferrite. */
  var DROP_GRAV = 46;

  /* 2.4 seconds, which at this level's speeds is 280 to 430 pixels of
     scroll: long enough that a magnet which reaches the tray CLACKS in
     and then simply stays there until it leaves the screen. Nothing in
     this bay dries, soaks in or gets wiped up - that is the joke of the
     whole level - so the splat does not fade out of existence either. */
  var SPLAT_TIME = 2.4;

  /* ------------------------------------------------- the marker clock

     The markers are keyed to POSITION, not to a timer: the Deck's idea,
     applied to x instead of to scroll. A stroke that takes N pixels of
     approach to draw occupies the same fraction of the run-up at any
     speed (including the heat's 1.55x), it freezes when the game pauses
     or the run dies, and it draws slowly on the GET READY screen so the
     player watches a whole one go on before flying into one.

     DRAW_FROM is where the nib touches down; DRAW_SPAN is how much
     approach the stroke takes to finish. 452 + 110 puts the last pixel
     down at ob.x 342, which is 27 past the furthest a hitbox can reach
     (player x maxes at 304, hit radius 11): an unfinished ordinary
     stroke is therefore NEVER collidable, and what the player meets is
     always a finished line. That is the promise the late phase breaks. */
  var DRAW_FROM = 452;
  var DRAW_SPAN = 110;

  /* THE LATE PHASE, armed by tune.lateScore 16 and announced by
     WARN.late. Past that score roughly half the markers come in BACKWARD:
     they fly past the rail, dive to the deep end of the stroke and draw
     it back toward the edge, over 300px instead of 110. Two things make
     that strictly worse than an ordinary stroke and both of them matter:

       1. the lethal pixels appear at the FAR end first - out in the
          middle of the mouth, where you fly - and fill in toward the
          rail, so the deepest pixel exists from the very first frame;
       2. it is not finished when it reaches you. Flying forward to meet
          it early buys you a SHORTER-LOOKING stroke whose dangerous half
          is already there, which is the exact trap a player who has
          learned the ordinary stroke will walk into.

     It is still entirely legible: the marker sits on the live end the
     whole way, so the thing drawing the hazard is drawn at the hazard. */
  var LATE_SPAN = 300;
  var LATE_CHANCE = 0.45;

  /* and how much approach the marker takes to get out of the way again
     once the stroke is done. 42px: a third of an ordinary stroke's own
     window, which is long enough to read as a flourish and short enough
     that two markers are never on screen for the same obstacle. */
  var EXIT_SPAN = 42;

  /* The golden apple's odds live HERE and not in the tune, the way the
     three newest Backyard levels do it, because the art is what has to
     know: an apple this module did not roll would keep a magnet's width,
     a magnet's fall and - worst - a magnet's hard little shadow, and the
     player would read an incoming puck and dodge a +5.

     0.035 rather than the Construction's 0.04, because this is already
     the only bay in the game whose lid sheds a pepper AND a lime AND the
     least rare succulent, and a board that hands out four kinds of present is
     a board where the fifth has to be worth stopping for. */
  var GOLD_CHANCE = 0.035, GOLD_GAP = 6;
  var goldGap = 0;

  /* On a white board the particles have to be DARK, which is the reverse
     of every other level in the game. The one place this bay overrides
     the room: LivingRoom.AIR is a warm near-white, which is the right
     dust for the Desk's beige wall and the Mantle's black mantle and is
     completely invisible against #e3e6e2. So the motes here are GREY,
     with the warm highlight kept for the ones the pendant catches - the
     air is still the room's air, it is just being seen against paper. */
  var FX = {
    motes:    '#c9ccd2',   motesHi:  '#fff4d8',
    puff:     '#aeb3b9',   puffHi:   '#d6dadf',   /* a magnet letting go sheds aluminium grey */
    ground:   R.oakGrain,  groundHi: R.oakLip,    /* and the floor is the room's oak          */
    splat:    '#2b2a30',   splatHi:  '#8c8a94',
    hot:      '#e8452a',   hotMid:   '#f4703a',  hotHi: '#ffcf8a',
    heat:     '#e8452a',   heatEdge: '#8a1d10',
    glowCore: '255,207,138', glowEdge: '232,69,42'
  };

  /* the one-off heads up when a hazard arms: the thing, then the excuse */
  var WARN = {
    drop:  ['▼ MAGNETS ▼', 'THEY DO NOT STICK TO AIR'],
    spike: ['▲ MARKERS ▲', 'NOBODY IS ALLOWED TO ERASE'],
    /* the late phase. It has to say what actually changed, because what
       changed is not that there are more of them - it is which END they
       start at, and a player who does not learn that will keep reading a
       half-drawn stroke as a half-length one. */
    late:  ['▲ MARKERS ▲', 'THEY START WHERE YOU FLY'],
    /* THE ONLY GIFT IN THE GAME THAT IS ANNOUNCED, because it is the
       only one that changes the level you are playing and a player who
       flies over it has not declined it, they have missed it. The arrows
       point DOWN, which is the gift's direction in this bay and the
       opposite of the two hazards above - and it is a gift's sentence,
       so it yields to a hazard's: the funnel asks for the slot and only
       takes it if nothing lethal wants it (see PlayScene's warpHint). */
    warp:  ['▼ A FUNNEL ▼', 'LAND IN IT. IF YOU CAN.'],
    /* the lid here is the frame's top rail, not a ceiling - see bakeTop */
    ceil:  ['▲ THE FRAME ENDS HERE ▲', 'THE TOP RAIL IS SOLID']
  };

  /* the thirteen colours the generic level-select window would use. This
     bay paints its own cover below, but the table stays honest. */
  var PREVIEW = {
    back: P.board, backAlt: P.boardGlare, seam: P.seam,
    /* the `beam` three are the generic cover's pillar, and this bay's
       pillar is a bar of black marker: body, the darker side of it and
       the one wet streak down it. They were the aluminium three. */
    beam: P.ink, beamDark: P.ink, beamLight: P.inkWet,
    ground: R.oakMid, groundDark: R.oakSeam, groundHi: R.oakLip,
    spike: P.ink, spikeHi: P.inkWet, air: R.lampGlow, gloom: P.void
  };

  /* the caption PlayScene puts on an extra life picked up here */
  var BOON_NAME = 'SUCCULENT';

  var T = {};             /* baked tiles and sprites */

  /* The level's own clock, in PIXELS OF SCROLL, cached once a frame by
     drawBackdrop - the Deck's mistScroll, and cached for the Deck's
     reason. The only thing in this bay that reads it is the succulent's
     sparkle, and it is scroll rather than seconds so that a paused board
     is a still board and a sparkle cannot be waited out behind the scrim. */
  var clock = 0;

  /* ------------------------------------------------------- utilities */

  var wrap = LivingRoom.wrap;
  var hash = LivingRoom.hash;

  /* A 1px Bresenham line. Everything already ON the board is drawn with
     this and with pcircle below, because a doodle is a stroke and not a
     shape: a rectangle outline reads as a diagram, and a plotted line
     with a kink in it reads as somebody's hand. */
  function pline(c, x0, y0, x1, y1, col) {
    c.fillStyle = col;
    x0 = Math.round(x0); y0 = Math.round(y0);
    x1 = Math.round(x1); y1 = Math.round(y1);
    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    var err = dx + dy, e2;
    for (;;) {
      c.fillRect(x0, y0, 1, 1);
      if (x0 === x1 && y0 === y1) break;
      e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  /* the midpoint circle, 1px, eight-way symmetric. A stroked arc would
     antialias into mush on a nearest-neighbour layer - the Construction's
     cathedral grain has the same problem and solves it the same way. */
  function pcircle(c, cx, cy, r, col) {
    c.fillStyle = col;
    var x = r, y = 0, err = 1 - r;
    while (x >= y) {
      c.fillRect(cx + x, cy + y, 1, 1); c.fillRect(cx + y, cy + x, 1, 1);
      c.fillRect(cx - y, cy + x, 1, 1); c.fillRect(cx - x, cy + y, 1, 1);
      c.fillRect(cx - x, cy - y, 1, 1); c.fillRect(cx - y, cy - x, 1, 1);
      c.fillRect(cx + y, cy - x, 1, 1); c.fillRect(cx + x, cy - y, 1, 1);
      y++;
      if (err < 0) err += 2 * y + 1;
      else { x--; err += 2 * (y - x) + 1; }
    }
  }

  /* THE SECOND BRUSH. The same two plotters with a 2x2 stamp instead of a
     1x1 one - identical Bresenham, identical midpoint circle, one
     fillRect argument different.

     There are two brushes because the photographs have two. Hold ref 4 at
     arm's length and the board sorts itself into two populations
     instantly: the parabola, the pointy S, the face, the purple web and
     the orange-and-green checker patch were drawn with a fat chisel nib
     and in several cases gone over twice, and the tallies, the star, the
     wavy lines and the ghost ABCDE were drawn with a fine one or are
     half-wiped. One brush for the whole board is what made the old tile
     read as a uniform grey texture rather than as things somebody drew at
     different times for different reasons - and it is also a third
     separation from the hazard for free, because the thickest mark any
     doodle can make is 2px and the thinnest lethal one is 3.

     A 2x2 stamp walked at 1px steps is 2px wide and solid: it is drawn
     DOWN and RIGHT of the plotted pixel, so a 2px shape is one pixel
     fatter at the bottom right than its 1px twin and nothing has to be
     re-measured. The doodle slots have 18px of slack in the tightest
     direction, which is nine times what that costs. */
  function pline2(c, x0, y0, x1, y1, col) {
    c.fillStyle = col;
    x0 = Math.round(x0); y0 = Math.round(y0);
    x1 = Math.round(x1); y1 = Math.round(y1);
    var dx = Math.abs(x1 - x0), sx = x0 < x1 ? 1 : -1;
    var dy = -Math.abs(y1 - y0), sy = y0 < y1 ? 1 : -1;
    var err = dx + dy, e2;
    for (;;) {
      c.fillRect(x0, y0, 2, 2);
      if (x0 === x1 && y0 === y1) break;
      e2 = 2 * err;
      if (e2 >= dy) { err += dy; x0 += sx; }
      if (e2 <= dx) { err += dx; y0 += sy; }
    }
  }

  function pcircle2(c, cx, cy, r, col) {
    c.fillStyle = col;
    var x = r, y = 0, err = 1 - r;
    while (x >= y) {
      c.fillRect(cx + x, cy + y, 2, 2); c.fillRect(cx + y, cy + x, 2, 2);
      c.fillRect(cx - y, cy + x, 2, 2); c.fillRect(cx - x, cy + y, 2, 2);
      c.fillRect(cx - x, cy - y, 2, 2); c.fillRect(cx - y, cy - x, 2, 2);
      c.fillRect(cx + y, cy - x, 2, 2); c.fillRect(cx + x, cy - y, 2, 2);
      y++;
      if (err < 0) err += 2 * y + 1;
      else { x--; err += 2 * (y - x) + 1; }
    }
  }

  /* ---------------------------------------------------- the top rail

     This bay's own ceiling band - 240x24 like the room's, so it tiles on
     the same beat, with the kill line on row 23 - built out of
     Whiteboard ref 1 and nothing else. From the top down:

       rows 0..13   THE ROOM BEHIND THE BOARD. The board stands on a
                    rolling frame in a dim room, so what shows over the
                    rail is the wall behind it, out of the lamps: a ramp
                    from beyondDeep at the top of the screen to beyond at
                    the rail, painted row by row so the band has no edge
                    of its own (0.9 of luminance a row), with the room's
                    one-in-forty plaster tooth on it.
       rows 14..22  THE RAIL: a fat aluminium extrusion seen from the
                    front. Its lit top edge, six rows of face, the rounded
                    dark underside, and the shadow line where it overhangs
                    the board. On it, per tile: the hanger bracket in the
                    middle that the board hangs from in the photograph, a
                    hinge plate either side where the panel pivots on its
                    frame, and two scraps of blue painter's tape - all
                    PRESSED INTO the face, nothing standing off it.
       row 23       the outline, on the kill line. 30 of luminance over a
                    board at 226: the hardest edge in the bay, which is
                    what the row that ends the run has to be.

     The two shadow strips that make the rail read as an OVERHANG are
     laid by drawCeiling exactly as they were - the room's crown strip
     and this bay's 40-row railShade - so rows 24 onward carry the shade
     they were measured with. */
  function bakeTop() {
    var W = 240, t = makeCanvas(W, CEIL), c = t.ctx;
    var r = mulberry32(3177);
    var x, y, i;

    /* the room behind: a ramp, then tooth */
    c.fillStyle = P.beyondDeep; c.fillRect(0, 0, W, 14);
    for (y = 0; y < 14; y++) {
      c.fillStyle = LivingRoom.rgba(P.beyond, (y + 0.5) / 14);
      c.fillRect(0, y, W, 1);
    }
    for (y = 0; y < 14; y++) {
      for (x = 0; x < W; x++) {
        if (r() > 0.025) continue;
        c.fillStyle = r() < 0.5 ? P.beyondDeep : P.groove;
        c.fillRect(x, y, 1, 1);
      }
    }

    /* the extrusion */
    c.fillStyle = P.alumLit;  c.fillRect(0, 14, W, 1);
    c.fillStyle = P.alumMid;  c.fillRect(0, 15, W, 6);
    c.fillStyle = P.alumDark; c.fillRect(0, 21, W, 1);
    c.fillStyle = P.groove;   c.fillRect(0, 22, W, 1);

    /* the hanger bracket, centred on the tile: a darker plate with a
       lit top edge and two screws, the thing ref 1 has at the top
       middle of the board */
    c.fillStyle = P.alumDark; c.fillRect(114, 15, 12, 6);
    c.fillStyle = P.alumLit;  c.fillRect(114, 15, 12, 1);
    c.fillStyle = P.groove;   c.fillRect(116, 18, 2, 2); c.fillRect(122, 18, 2, 2);

    /* two hinge plates, a knuckle down the middle of each */
    [40, 200].forEach(function (hx) {
      c.fillStyle = P.alumDark; c.fillRect(hx, 15, 8, 6);
      c.fillStyle = P.alumLit;  c.fillRect(hx + 3, 15, 2, 6);
      c.fillStyle = P.groove;   c.fillRect(hx + 1, 17, 1, 1); c.fillRect(hx + 6, 17, 1, 1);
    });

    /* and the blue tape, which is in all four photographs */
    c.fillStyle = P.tape;
    c.fillRect(20, 16, 7, 2);
    c.fillRect(156, 17, 6, 2);

    /* the pan head screws along the face, one every 48px, pressed in */
    for (i = 70; i < W; i += 48) {
      if (Math.abs(i - 120) < 10) continue;
      c.fillStyle = P.alumDark; c.fillRect(i, 17, 2, 2);
      c.fillStyle = P.alumLit;  c.fillRect(i, 17, 1, 1);
    }

    c.fillStyle = P.outline;  c.fillRect(0, 23, W, 1);
    return t;
  }

  /* =================================================== THE RAMBLINGS

     Eighteen things somebody drew and nobody wiped off, and TWELVE TO
     FOURTEEN of them go on every tile - the photographed board carries
     about fifteen in the same area, and seven was the single biggest
     reason the level read as empty. Each one is a function that paints
     into the board tile at a top-left corner, in one marker pigment, with
     one of the two brushes. They are placed on a 6x3 slot grid so that
     two of them can never overlap: at FOURTEEN of eighteen slots filled,
     a board with two doodles on top of each other does not read as a busy
     board, it reads as a bug.

     Each entry names its own size and its own preferred pigment - the
     parabola is blue in all four photographs, the tally marks are yellow,
     the noughts and crosses purple, the star tan - because the colour of
     a particular doodle is part of recognising it. The handful with no
     opinion take whatever the tile's seed hands them. */

  /* ---- the blue parabola on crossed axes, 46x44. The thing you see
     first in every photograph, and the only doodle on the board anybody
     drew on purpose - which is why it is the heaviest thing on it. FAT
     BRUSH throughout: in ref 4 the axes and the curve are the same weight
     as each other and both are twice the tallies beside them. The TICKS
     stay 1px, because a tick is the one mark on this diagram a hand makes
     without slowing down, and six 2px blobs on each axis read as beads on
     a string rather than as a scale. */
  function dParabola(c, x, y, ink, r) {
    var cx = x + 22, cy = y + 30, i;
    pline2(c, cx, y + 2, cx, y + 42, ink);         /* the y axis        */
    pline2(c, x + 1, cy, x + 45, cy, ink);         /* the x axis        */
    /* arrowheads, all four, the way a hand draws them: two short strokes */
    pline2(c, cx - 3, y + 6, cx, y + 2, ink); pline2(c, cx + 3, y + 6, cx, y + 2, ink);
    pline2(c, cx - 3, y + 38, cx, y + 42, ink); pline2(c, cx + 3, y + 38, cx, y + 42, ink);
    pline2(c, x + 5, cy - 3, x + 1, cy, ink); pline2(c, x + 5, cy + 3, x + 1, cy, ink);
    pline2(c, x + 41, cy - 3, x + 45, cy, ink); pline2(c, x + 41, cy + 3, x + 45, cy, ink);
    /* ticks, three a side on each axis */
    for (i = 1; i <= 3; i++) {
      pline(c, cx - 2, cy - i * 7, cx + 2, cy - i * 7, ink);
      pline(c, cx - 2, cy + i * 6, cx + 2, cy + i * 6, ink);
      pline(c, cx - i * 8, cy - 2, cx - i * 8, cy + 2, ink);
      pline(c, cx + i * 8, cy - 2, cx + i * 8, cy + 2, ink);
    }
    /* and the curve, plotted rather than stroked, with the vertex sitting
       a little below the origin the way a hand always puts it */
    var prevX = 0, prevY = 0;
    for (i = 0; i <= 40; i++) {
      var u = (i - 20) / 20;
      var px = x + 2 + i, py = Math.round(cy + 6 - u * u * 26);
      if (i) pline2(c, prevX, prevY, px, py, ink);
      prevX = px; prevY = py;
    }
  }

  /* ---- the goofy wide-eyed face, 34x34. Ref 1 and ref 4: a circle, two
     tall oval eyes with the pupils up in the corners, and a mouth full of
     teeth scribbled in so hard it has gone solid. */
  function dFace(c, x, y, ink, r) {
    var cx = x + 17, cy = y + 17, i;
    pcircle2(c, cx, cy, 16, ink);
    /* Two tall eyes, drawn as stacked circles so they come out oval. The
       radius is FIVE and not the four it was at 1px: a 2px brush eats
       two pixels of the hole from every side, and at r=4 the eye came
       out a solid blue blob with a two-pixel slot in it. At 5 there are
       four clear pixels of board inside each eye with the pupil up in the
       corner of them, which is the look in refs 1 and 3 - and they sit at
       cx +/- 7 rather than 6 so that widening them does not close the
       gap between the two. */
    pcircle2(c, cx - 7, cy - 6, 5, ink); pcircle2(c, cx - 7, cy - 4, 5, ink);
    pcircle2(c, cx + 7, cy - 6, 5, ink); pcircle2(c, cx + 7, cy - 4, 5, ink);
    c.fillStyle = ink;
    c.fillRect(cx - 8, cy - 9, 2, 2); c.fillRect(cx + 7, cy - 9, 2, 2);
    /* the mouth: a wide lozenge with a row of teeth zigzagged through it.
       The LIPS are fat and the TEETH are thin, and that is not a stylistic
       choice, it is the only way to keep teeth: a 2px zigzag stepped 2px
       closes up into one solid band and the mouth stops being a mouth. In
       ref 3 the outline is plainly the heavier of the two as well. */
    pline2(c, cx - 9, cy + 5, cx + 9, cy + 5, ink);
    pline2(c, cx - 9, cy + 13, cx + 9, cy + 13, ink);
    pline2(c, cx - 9, cy + 5, cx - 11, cy + 9, ink);
    pline2(c, cx - 11, cy + 9, cx - 9, cy + 13, ink);
    pline2(c, cx + 9, cy + 5, cx + 11, cy + 9, ink);
    pline2(c, cx + 11, cy + 9, cx + 9, cy + 13, ink);
    for (i = 0; i < 9; i++) {
      pline(c, cx - 8 + i * 2, cy + 6, cx - 7 + i * 2, cy + 9, ink);
      pline(c, cx - 7 + i * 2, cy + 9, cx - 6 + i * 2, cy + 6, ink);
    }
    pline(c, cx - 9, cy + 9, cx + 9, cy + 9, ink);
  }

  /* ---- T | G tally marks under a crossed line, 30x26. Somebody was
     keeping score at something and never said what. */
  function dTally(c, x, y, ink, r) {
    var i, g, gx;
    /* the two headings and the bar between them */
    pline(c, x + 3, y + 1, x + 9, y + 1, ink); pline(c, x + 6, y + 1, x + 6, y + 6, ink);
    pcircle(c, x + 22, y + 4, 3, ink); pline(c, x + 22, y + 4, x + 25, y + 4, ink);
    pline(c, x + 15, y, x + 15, y + 8, ink);
    pline(c, x, y + 9, x + 29, y + 9, ink);
    pline(c, x + 15, y + 9, x + 15, y + 25, ink);
    /* two columns of fives, the fifth stroke laid across the other four */
    for (g = 0; g < 4; g++) {
      gx = x + 1 + (g % 2) * 15;
      var gy = y + 12 + ((g >> 1) * 8);
      for (i = 0; i < 4; i++) pline(c, gx + i * 3, gy, gx + i * 3, gy + 6, ink);
      if (g !== 3) pline(c, gx - 1, gy + 6, gx + 10, gy, ink);
    }
  }

  /* ---- noughts and crosses, unfinished, 24x24. Nobody won. */
  function dNoughts(c, x, y, ink, r) {
    var i, cells = [1, 0, 1, 2, 1, 2, 2, 0, 3];   /* 0 nought 1 cross 2 empty */
    for (i = 1; i < 3; i++) {
      pline(c, x + i * 8, y + 1, x + i * 8, y + 23, ink);
      pline(c, x + 1, y + i * 8, x + 23, y + i * 8, ink);
    }
    for (i = 0; i < 9; i++) {
      var cx = x + (i % 3) * 8 + 4, cy = y + ((i / 3) | 0) * 8 + 4;
      if (cells[i] === 1) {
        pline(c, cx - 2, cy - 2, cx + 2, cy + 2, ink);
        pline(c, cx + 2, cy - 2, cx - 2, cy + 2, ink);
      } else if (cells[i] === 0) {
        pcircle(c, cx, cy, 2, ink);
      }
    }
  }

  /* ---- the five point star, 20x20, drawn in one stroke without lifting */
  function dStar(c, x, y, ink, r) {
    var pts = [], i;
    for (i = 0; i < 5; i++) {
      var a = -Math.PI / 2 + i * TAU / 5;
      pts.push([x + 10 + Math.cos(a) * 9, y + 10 + Math.sin(a) * 9]);
    }
    for (i = 0; i < 5; i++) {
      var q = pts[i], w = pts[(i + 2) % 5];
      pline(c, q[0], q[1], w[0], w[1], ink);
    }
  }

  /* ---- the pointy graffiti S, 18x30. The one on the right of ref 1,
     which every schoolchild on earth has drawn and nobody can explain. */
  function dEss(c, x, y, ink, r) {
    var pts = [[2, 8], [8, 1], [15, 6], [9, 13], [2, 16], [8, 22], [15, 20],
               [15, 25], [8, 29], [2, 24], [2, 18], [15, 11], [15, 6]];
    for (var i = 1; i < pts.length; i++) {
      pline2(c, x + pts[i - 1][0], y + pts[i - 1][1], x + pts[i][0], y + pts[i][1], ink);
    }
    /* the two long verticals that make it look drawn twice */
    pline2(c, x + 2, y + 8, x + 2, y + 16, ink);
    pline2(c, x + 15, y + 20, x + 15, y + 25, ink);
  }

  /* ---- the purple web polyhedron, 34x34: nine points round a ring with
     a chord between most of the pairs. Ref 1 and ref 4 both have one. */
  function dWeb(c, x, y, ink, r) {
    var pts = [], i, k, n = 9;
    for (i = 0; i < n; i++) {
      var a = i * TAU / n + 0.3;
      pts.push([Math.round(x + 17 + Math.cos(a) * 15), Math.round(y + 17 + Math.sin(a) * 15)]);
    }
    /* The RING first and always, fat. In both photographs the outer
       polygon is a closed shape somebody drew before they started joining
       the corners up, and it is what makes the thing read as a web rather
       than as a purple smudge. It used to be just another pair in the
       loop, so it came out with holes in it. */
    for (i = 0; i < n; i++) {
      k = (i + 1) % n;
      pline2(c, pts[i][0], pts[i][1], pts[k][0], pts[k][1], ink);
    }
    /* then the chords, and at HALF the old count. A 2px stroke covers
       twice the board a 1px one does, so keeping 68% of 36 possible
       chords at the new weight fills a 34px circle in solid. 48% of them
       puts back the same amount of purple at twice the thickness, which
       is the trade this whole pass is making. */
    for (i = 0; i < n; i++) {
      for (k = i + 2; k < n; k++) {
        if (i === 0 && k === n - 1) continue;    /* already in the ring  */
        if (r() < 0.52) continue;                /* a few chords missing */
        pline2(c, pts[i][0], pts[i][1], pts[k][0], pts[k][1], ink);
      }
    }
    for (i = 0; i < n; i++) pcircle2(c, pts[i][0], pts[i][1], 1, ink);
  }

  /* ---- the orange and green checker scribble, 36x30: a grid with every
     other cell filled in by hand, which is a thing people do while they
     are listening to somebody else talk */
  function dChecker(c, x, y, ink, r) {
    var i, k, s;
    for (i = 0; i <= 4; i++) pline2(c, x + i * 9, y, x + i * 9, y + 27, P.inkGreen);
    for (i = 0; i <= 3; i++) pline2(c, x, y + i * 9, x + 36, y + i * 9, P.inkGreen);
    /* the hatch, every other cell. STEPPED THREE at a 2px brush, so each
       diagonal is two pixels of ink with one of board beside it. The
       original was eight passes stepped one at 1px, which with the fat
       nib came out as a solid block and the patch read as a flag; at
       three the cell is three clean diagonals and the board shows between
       them, which is what refs 1 and 4 have - those cells are plainly
       SCRIBBLED and not filled in, and the direction of the scribble is
       half of what makes them read as somebody's hand. */
    for (i = 0; i < 4; i++) {
      for (k = 0; k < 3; k++) {
        if ((i + k) % 2) continue;
        for (s = 0; s < 8; s += 3) {
          pline2(c, x + i * 9 + 1, y + k * 9 + 1 + s, x + i * 9 + 1 + s, y + k * 9 + 1,
                 (i + k) % 4 ? P.inkOrange : P.inkGreen);
        }
      }
    }
  }

  /* ---- four wavy lines, 24x14. The purest ADHD mark there is. */
  function dWaves(c, x, y, ink, r) {
    for (var i = 0; i < 4; i++) {
      var yy = y + i * 4, px = x, py = yy;
      for (var k = 1; k <= 23; k++) {
        var ny = yy + Math.round(Math.sin(k * 0.9 + i) * 1.4);
        pline(c, px, py, x + k, ny, ink);
        px = x + k; py = ny;
      }
    }
  }

  /* ---- ABCDE in bubble letters, 40x10, and nearly wiped off: the one
     doodle on the board that somebody half-tried to remove */
  function dAbc(c, x, y, ink, r) {
    for (var i = 0; i < 5; i++) {
      var bx = x + i * 8;
      pline(c, bx, y, bx + 5, y, P.ghost);
      pline(c, bx, y + 9, bx + 5, y + 9, P.ghost);
      pline(c, bx, y, bx, y + 9, P.ghost);
      pline(c, bx + 5, y, bx + 5, y + 9, P.ghost);
      /* each letter's one inner mark, which is all the letter there is */
      if (i === 0) pline(c, bx + 1, y + 5, bx + 4, y + 5, P.ghost);
      else if (i === 1) { pline(c, bx + 1, y + 4, bx + 4, y + 4, P.ghost); pline(c, bx + 4, y + 1, bx + 4, y + 3, P.ghost); }
      else if (i === 2) pline(c, bx + 2, y + 2, bx + 2, y + 7, P.ghost);
      else if (i === 3) pline(c, bx + 2, y + 1, bx + 2, y + 8, P.ghost);
      else pline(c, bx + 1, y + 4, bx + 3, y + 4, P.ghost);
    }
  }

  /* ---- the small circle with three glyphs in it, 28x28. Ref 1, bottom
     left: a spiral, a tiny x and something that might be a person. */
  function dGlyphCircle(c, x, y, ink, r) {
    var cx = x + 14, cy = y + 14, i;
    pcircle(c, cx, cy, 13, ink);
    /* the spiral */
    var px = cx - 4, py = cy - 5;
    for (i = 1; i <= 16; i++) {
      var a = i * 0.7, rad = i * 0.26;
      var nx = Math.round(cx - 4 + Math.cos(a) * rad), ny = Math.round(cy - 5 + Math.sin(a) * rad);
      pline(c, px, py, nx, ny, ink); px = nx; py = ny;
    }
    /* the x */
    pline(c, cx - 6, cy + 3, cx - 2, cy + 7, ink);
    pline(c, cx - 2, cy + 3, cx - 6, cy + 7, ink);
    /* and the person */
    pcircle(c, cx + 4, cy + 2, 2, ink);
    pline(c, cx + 4, cy + 5, cx + 4, cy + 9, ink);
    pline(c, cx + 1, cy + 9, cx + 7, cy + 9, ink);
  }

  /* ---- a lightbulb, 20x26: the universal mark for an idea nobody wrote
     down afterwards */
  function dBulb(c, x, y, ink, r) {
    var cx = x + 10, i;
    pcircle(c, cx, y + 9, 7, ink);
    pline(c, cx - 4, y + 15, cx - 4, y + 19, ink);
    pline(c, cx + 4, y + 15, cx + 4, y + 19, ink);
    for (i = 0; i < 3; i++) pline(c, cx - 4, y + 19 + i * 2, cx + 4, y + 19 + i * 2, ink);
    pline(c, cx - 2, y + 25, cx + 2, y + 25, ink);
    /* the four rays coming off it */
    for (i = 0; i < 4; i++) {
      var a = -Math.PI / 2 + (i - 1.5) * 0.7;
      pline(c, cx + Math.cos(a) * 10, y + 9 + Math.sin(a) * 10,
            cx + Math.cos(a) * 14, y + 9 + Math.sin(a) * 14, ink);
    }
  }

  /* ---- a TODO list of six lines, not one of them crossed off, 34x30.
     The single most honest thing on the board. */
  function dTodo(c, x, y, ink, r) {
    pline(c, x, y, x + 16, y, ink);
    pline(c, x, y + 2, x + 16, y + 2, ink);
    for (var i = 0; i < 6; i++) {
      var yy = y + 6 + i * 4;
      pline(c, x, yy, x + 3, yy, ink);
      pline(c, x, yy + 2, x + 3, yy + 2, ink);
      pline(c, x, yy, x, yy + 2, ink);
      pline(c, x + 3, yy, x + 3, yy + 2, ink);
      pline(c, x + 6, yy + 1, x + 9 + Math.floor(r() * 24), yy + 1, ink);
    }
  }

  /* ---- a heart, 18x16 */
  function dHeart(c, x, y, ink, r) {
    pcircle(c, x + 5, y + 5, 4, ink);
    pcircle(c, x + 13, y + 5, 4, ink);
    pline(c, x + 1, y + 6, x + 9, y + 15, ink);
    pline(c, x + 17, y + 6, x + 9, y + 15, ink);
    pline(c, x + 5, y + 1, x + 13, y + 1, ink);
  }

  /* ---- a sun, 22x22 */
  function dSun(c, x, y, ink, r) {
    var cx = x + 11, cy = y + 11, i;
    pcircle(c, cx, cy, 6, ink);
    for (i = 0; i < 8; i++) {
      var a = i * TAU / 8;
      pline(c, cx + Math.cos(a) * 8, cy + Math.sin(a) * 8,
            cx + Math.cos(a) * 11, cy + Math.sin(a) * 11, ink);
    }
  }

  /* ---- a tiny bar chart with no labels and no axis numbers, 26x20 */
  function dChart(c, x, y, ink, r) {
    pline(c, x, y, x, y + 19, ink);
    pline(c, x, y + 19, x + 25, y + 19, ink);
    var hs = [7, 13, 5, 16, 10];
    for (var i = 0; i < 5; i++) {
      var bx = x + 3 + i * 4, h = hs[i];
      pline(c, bx, y + 19 - h, bx, y + 18, ink);
      pline(c, bx + 2, y + 19 - h, bx + 2, y + 18, ink);
      pline(c, bx, y + 19 - h, bx + 2, y + 19 - h, ink);
    }
  }

  /* ---- a long arrow with THIS written under it, 32x22. Pointing at
     something that was wiped off years ago. */
  function dThis(c, x, y, ink, r) {
    pline(c, x + 1, y + 7, x + 30, y + 2, ink);
    pline(c, x + 24, y, x + 30, y + 2, ink);
    pline(c, x + 25, y + 7, x + 30, y + 2, ink);
    /* T H I S, four marks at four pixels wide each */
    var bx = x + 6;
    pline(c, bx, y + 13, bx + 4, y + 13, ink); pline(c, bx + 2, y + 13, bx + 2, y + 20, ink);
    bx += 7;
    pline(c, bx, y + 13, bx, y + 20, ink); pline(c, bx + 4, y + 13, bx + 4, y + 20, ink);
    pline(c, bx, y + 16, bx + 4, y + 16, ink);
    bx += 7;
    pline(c, bx + 2, y + 13, bx + 2, y + 20, ink);
    bx += 5;
    pline(c, bx + 4, y + 13, bx, y + 13, ink); pline(c, bx, y + 13, bx, y + 16, ink);
    pline(c, bx, y + 16, bx + 4, y + 16, ink); pline(c, bx + 4, y + 16, bx + 4, y + 20, ink);
    pline(c, bx + 4, y + 20, bx, y + 20, ink);
  }

  /* ---- a spiral, 22x22, which is what a pen does while a meeting
     happens around it */
  function dSpiral(c, x, y, ink, r) {
    var cx = x + 11, cy = y + 11, px = cx, py = cy;
    for (var i = 1; i <= 54; i++) {
      var a = i * 0.46, rad = i * 0.2;
      var nx = Math.round(cx + Math.cos(a) * rad), ny = Math.round(cy + Math.sin(a) * rad);
      pline(c, px, py, nx, ny, ink); px = nx; py = ny;
    }
  }

  /* The pool. `ink` is the pigment this particular doodle is remembered
     in; null means the tile's seed decides. */
  var DOODLES = [
    { w: 46, h: 44, ink: 'inkBlue',   draw: dParabola },
    /* the face is BLUE in every photograph that has it, and a shade
       lighter than the parabola - it used to take whatever the tile's
       seed handed it, which on an orange tile made it a pumpkin */
    { w: 34, h: 34, ink: 'inkSky',    draw: dFace },
    { w: 30, h: 26, ink: 'inkYellow', draw: dTally },
    { w: 24, h: 24, ink: 'inkPurple', draw: dNoughts },
    { w: 20, h: 20, ink: 'inkTan',    draw: dStar },
    { w: 18, h: 30, ink: 'inkSky',    draw: dEss },
    { w: 34, h: 34, ink: 'inkPurple', draw: dWeb },
    { w: 36, h: 30, ink: 'inkOrange', draw: dChecker },
    { w: 24, h: 14, ink: 'inkTan',    draw: dWaves },
    { w: 40, h: 10, ink: null,        draw: dAbc },
    { w: 28, h: 28, ink: null,        draw: dGlyphCircle },
    { w: 20, h: 26, ink: 'inkYellow', draw: dBulb },
    { w: 34, h: 30, ink: null,        draw: dTodo },
    { w: 18, h: 16, ink: 'inkPurple', draw: dHeart },
    { w: 22, h: 22, ink: 'inkYellow', draw: dSun },
    { w: 26, h: 20, ink: 'inkGreen',  draw: dChart },
    { w: 32, h: 22, ink: 'inkBlue',   draw: dThis },
    { w: 22, h: 22, ink: null,        draw: dSpiral }
  ];

  var INKS = ['inkBlue', 'inkPurple', 'inkYellow', 'inkOrange', 'inkGreen', 'inkTan', 'inkSky'];

  /* ================================================== the board tile

     480 wide and the full height of the playfield between the rail and
     the tray, and there are THREE of them. One tile scrolling at 1.0
     repeats every four seconds at speedStart, which on a surface the
     player is staring straight at is unmissable; three picked by hash
     per world column repeat every 27 columns at worst and never in the
     same order, which is the Deck's fence trick applied to a wall the
     player can actually read. */

  var BOARD_W = 480;
  var BOARD_H = FLOOR - CEIL;      /* 218 */

  /* the bar magnets off the photographs: flat, glossy, and stuck on at
     whatever angle the hand that put them there happened to be at. Three
     stepped rows rather than a true rotation, because at 6px tall a
     rotation IS three stepped rows. */
  function barMagnet(c, x, y, colour, lean) {
    var i, step;
    for (i = 0; i < 3; i++) {
      step = Math.round((i - 1) * lean);
      c.fillStyle = colour;
      c.fillRect(x + step, y + i * 2, 18, 2);
    }
    /* the gloss along the top, and an EDGE shade below - 1px, hugging the
       magnet. Deliberately not the 2px hard cast shadow a FALLING magnet
       gets: a thing stuck flat to a board has no gap under it to throw
       one, and the difference between those two shadows is how the eye
       tells scenery from hazard on this level. */
    c.fillStyle = P.barHi;
    c.fillRect(x - Math.round(lean) + 1, y, 16, 1);
    c.fillStyle = P.shade;
    c.fillRect(x + Math.round(lean) + 1, y + 6, 17, 1);
  }

  function bakeBoard(tile) {
    var t = makeCanvas(BOARD_W, BOARD_H), c = t.ctx;
    var r = mulberry32(6200 + tile * 137);
    var i, k, x, y;

    /* 1. the melamine */
    c.fillStyle = P.board;
    c.fillRect(0, 0, BOARD_W, BOARD_H);

    /* 2. the light falling off toward the lower left, in three flat steps.
       This is the board's GRUBBINESS and not the lamp's falloff, which is
       why it is baked into the tile and scrolls with it: the corner of a
       whiteboard that nobody cleans because nobody writes there travels
       with the board. The lamp's own glare is a separate, static thing -
       see bakeGlare. */
    Tint.rect(c, 0, 92, 300, BOARD_H - 92, P.boardShade, 1);
    Tint.rect(c, 0, 126, 200, BOARD_H - 126, P.boardShade, 1);
    Tint.rect(c, 0, 160, 120, BOARD_H - 160, P.boardShade, 1);

    /* 3. the ghost marks. Not doodles - the SMEARS, the half-wiped
       circles and the one stroke of something that was rubbed out with a
       sleeve. Twelve or so per tile, in ghost and seam, which are three
       and five steps off the board: enough to be there, not enough to
       be looked at. */
    var ghosts = 10 + Math.floor(r() * 5);
    for (i = 0; i < ghosts; i++) {
      x = 14 + Math.floor(r() * (BOARD_W - 40));
      y = 14 + Math.floor(r() * (BOARD_H - 40));
      var col = r() < 0.6 ? P.ghost : P.seam;
      if (r() < 0.4) {
        /* a half-wiped circle: the arc somebody's cloth missed */
        var rad = 5 + Math.floor(r() * 9);
        var skip = Math.floor(r() * 8);
        for (k = 0; k < 8; k++) {
          if (k === skip || k === (skip + 1) % 8) continue;
          var a0 = k * TAU / 8, a1 = (k + 1) * TAU / 8;
          pline(c, x + Math.cos(a0) * rad, y + Math.sin(a0) * rad,
                x + Math.cos(a1) * rad, y + Math.sin(a1) * rad, col);
        }
      } else {
        /* a scribble, drifting as it goes the way a wiped stroke does */
        var len = 10 + Math.floor(r() * 26);
        var px = x, py = y, drift = (r() - 0.5) * 0.3;
        for (k = 1; k <= len; k++) {
          var ny = y + Math.round(Math.sin(k * 0.5) * 2 + k * drift);
          pline(c, px, py, x + k, ny, col);
          px = x + k; py = ny;
        }
      }
    }

    /* 4. the doodles, TWELVE TO FOURTEEN of them, on a 6x3 slot grid with
       a 12px margin all round. The grid is what guarantees no two
       overlap: the largest doodle in the pool is 46x44 and the smallest
       slot is 76x64, so a doodle jittered inside its own slot can never
       reach into the next one. A doodle appearing twice on the same tile
       would be read instantly, so the slots AND the pool are both drawn
       without replacement - and there are eighteen of each, so fourteen
       is the most this can ask for and still be true.

       It was seven to nine, which filled under half the grid, and with
       every mark in pastel at 1px the tile measured as a white rectangle
       with some grey in it. Twelve to fourteen is what the photographs
       carry per equivalent area: fifteen distinct things inside the frame
       of ref 1, not counting the magnets. Four of eighteen slots left
       empty is still enough clear board that the flight lane never has
       two large doodles stacked across it, which is the thing the grid
       exists to stop. */
    var MARGIN = 12;
    var SLOT_W = (BOARD_W - MARGIN * 2) / 6;      /* 76 */
    var SLOT_H = (BOARD_H - MARGIN * 2) / 3;      /* 64.67 */
    var slots = [], pool = [];
    for (i = 0; i < 18; i++) { slots.push(i); pool.push(i); }
    var count = 12 + Math.floor(r() * 3);
    for (i = 0; i < count; i++) {
      var si = Math.floor(r() * slots.length), slot = slots[si];
      slots.splice(si, 1);
      var di = Math.floor(r() * pool.length), d = DOODLES[pool[di]];
      pool.splice(di, 1);

      var sx = MARGIN + (slot % 6) * SLOT_W;
      var sy = MARGIN + ((slot / 6) | 0) * SLOT_H;
      var dx = Math.round(sx + r() * Math.max(0, SLOT_W - d.w));
      var dy = Math.round(sy + r() * Math.max(0, SLOT_H - d.h));
      var ink = P[d.ink || INKS[Math.floor(r() * INKS.length)]];
      d.draw(c, dx, dy, ink, r);
    }

    /* 5. the magnets that are STUCK to it, and they go on AFTER the
       doodles because a magnet put on a board covers what was drawn
       there. Counted off ref 1: six bar magnets - red, red, green,
       yellow, yellow, blue - and eight small round silver ones plus the
       one copper. This tile carries four or five bars, five to seven
       silver rounds and exactly one copper, which over the three tiles
       averages what the photograph has. It was two or three bars and one
       or two rounds in total, and that is not a board anybody uses.

       The bar colours come off a SHUFFLE and not off four independent
       rolls, because four independent rolls land four reds on a tile
       about once in sixty-four, and a tile with four red bars on it looks
       like a bug in a way that a tile with two does not. Shuffling means
       the first four are one of each - exactly what is in the
       photograph - and the fifth is the repeat. */
    var BARS = [P.barRed, P.barGreen, P.barYellow, P.barBlue];
    for (i = BARS.length - 1; i > 0; i--) {
      k = Math.floor(r() * (i + 1));
      var sw = BARS[i]; BARS[i] = BARS[k]; BARS[k] = sw;
    }
    var bars = 4 + Math.floor(r() * 2);
    for (i = 0; i < bars; i++) {
      barMagnet(c, 20 + Math.floor(r() * (BOARD_W - 60)),
                16 + Math.floor(r() * (BOARD_H - 40)),
                BARS[i % 4], (r() - 0.5) * 3);
    }
    /* the rounds. The copper is drawn LAST and unconditionally rather
       than rolled at 22%: it is the only brown thing in the bay and the
       whole reason it is worth drawing is that a player who has seen the
       board twice knows there is exactly one. A thing that is sometimes
       there is just noise. */
    var rounds = 5 + Math.floor(r() * 3);
    for (i = 0; i <= rounds; i++) {
      x = 16 + Math.floor(r() * (BOARD_W - 36));
      y = 16 + Math.floor(r() * (BOARD_H - 36));
      /* no outline: a 5px disc with a ring round it is a button, and in
         the photographs these are flush little cylinders catching one
         highlight each. The 1px row under it is the same EDGE shade the
         bars get and not the falling magnet's hard 2px offset block -
         see the header: that difference is the whole of how the player
         tells a hazard from a decoration on this level. */
      c.fillStyle = i === rounds ? P.copper : P.magSilver;
      c.fillRect(x, y, 5, 5);
      c.fillStyle = i === rounds ? P.copperHi : P.magSilverHi;
      c.fillRect(x + 1, y, 2, 1);
      c.fillStyle = P.shade;       c.fillRect(x + 1, y + 5, 5, 1);
    }

    /* 6. one panel seam, at a different x in each of the three tiles so
       that two tiles side by side never show the joint twice in a row */
    c.fillStyle = P.seam;
    c.fillRect(300 + tile * 60, 0, 1, BOARD_H);
    return t;
  }

  /* ===================================================== the glare

     The lamp on the melamine, baked once and blitted at a FIXED position
     every frame with no scroll on it at all. This is the only static
     pixel work in any level in the game and it is static for a physical
     reason: a specular reflection is a picture of the LIGHT, not of the
     surface, so it stays where the light is while the board slides under
     it. Every photograph of this board has exactly this - a big soft
     bloom up and to the right where the pendant is, a smaller one above
     it, and the corner down on the left where no light reaches at all.

     It is also the one depth cue a flat plane can honestly give. The
     Deck has four layers at four speeds to say "this is a place"; a
     board has one, and this is how it says the board is a surface and
     not a backdrop.

     The brightest point sits at x 352. The score prints at VW/2 = 240,
     so the bloom's core is 112px clear of it: bright white under white
     digits is the one place a glare on a light level could cost the
     player something, and it does not go there. */
  function bakeGlare() {
    var t = makeCanvas(BOARD_W, BOARD_H), c = t.ctx;

    /* written out rather than through a helper, because a radial gradient
       cannot take a hex and the three blooms want different alphas */
    var g = c.createRadialGradient(352, 70, 1, 352, 70, 150);
    g.addColorStop(0, 'rgba(247,248,245,0.80)');
    g.addColorStop(0.55, 'rgba(247,248,245,0.34)');
    g.addColorStop(1, 'rgba(247,248,245,0)');
    c.fillStyle = g; c.fillRect(202, 0, 300, 220);

    g = c.createRadialGradient(210, 40, 1, 210, 40, 90);
    g.addColorStop(0, 'rgba(247,248,245,0.52)');
    g.addColorStop(0.55, 'rgba(247,248,245,0.22)');
    g.addColorStop(1, 'rgba(247,248,245,0)');
    c.fillStyle = g; c.fillRect(120, 0, 180, 130);

    /* the whole bloom is the PENDANT's light, so it is warmed a sixteenth
       of the way toward it - source-atop, so only the pixels the blooms
       actually painted are tinted and the clear board is left alone */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, BOARD_W, BOARD_H, R.lampGlow, 1);
    c.globalCompositeOperation = 'source-over';

    /* and the corner the light never gets to, which is NOT warmed */
    g = c.createRadialGradient(40, 200, 1, 40, 200, 120);
    g.addColorStop(0, 'rgba(212,216,212,0.45)');
    g.addColorStop(0.55, 'rgba(212,216,212,0.20)');
    g.addColorStop(1, 'rgba(212,216,212,0)');
    c.fillStyle = g; c.fillRect(0, 80, 160, 138);

    /* THE LAMP'S FALLOFF DOWN THE BOARD, as one smoothstep ramp.

       The pendant is overhead and the board is a vertical plane, so the
       light on it must fall away from top to bottom - which the
       photographs show plainly: the bottom of this board is a good deal
       darker than the top in every one of the four.

       It is here, in the static tile, rather than in the scrolling one,
       because like the glare it is a picture of the LIGHT and not of the
       surface.

       It WAS three flat Tints at rows 112, 136 and 158, and on this one
       pale wall each of them measured as a straight grey line across the
       picture - the same fault the room's own five Tints had, and the
       same fix: LivingRoom now bakes its whole lighting pass as a sheet,
       and this is the Whiteboard's share of the same job. Three steps of
       1/16 become one ramp to 3/16 with zero slope at both ends, so the
       board is exactly as dark at the tray as it was and there is nothing
       left to have an edge. 1.5 x 0.1875 / 70 rows x the 120 luminance
       between the board and P.shade is 0.48 per row at the steepest
       point, against a 7.5 cliff at each of the three old steps.

       Rows are the TILE's, so the ramp starts 88 rows down (screen 112)
       and is full by row 158 (screen 182), which is where the room's own
       night band is getting going. The room's light stays the room's;
       what is shaped here is the board's own. */
    var ease = LivingRoom.ease, rgba = LivingRoom.rgba;
    var FALL_FROM = 112 - CEIL, FALL_RUN = 70, FALL_A = 3 / 16;
    for (var y = FALL_FROM; y < BOARD_H; y++) {
      c.fillStyle = rgba(P.shade, FALL_A * ease((y - FALL_FROM) / FALL_RUN));
      c.fillRect(0, y, BOARD_W, 1);
    }
    return t;
  }

  /* ===================================================== the floor

     The marker tray, and the room's oak under it. Six rows of aluminium
     and then the boards: the tray's LIP is the top row, which makes it
     the death line, and painting it in the brightest metal in the bay is
     deliberate - the two lines in this level that end a run are the rail
     at CEIL and the lip at FLOOR, and both of them are alumLit. The
     player learns one edge and gets the other free. */
  function bakeFloor() {
    var t = makeCanvas(192, VH - FLOOR), c = t.ctx;
    c.fillStyle = P.alumLit;     c.fillRect(0, 0, 192, 1);   /* the lip, y 242 */
    c.fillStyle = P.trayDeep;    c.fillRect(0, 1, 192, 1);
    c.fillStyle = P.trayChannel; c.fillRect(0, 2, 192, 3);
    c.fillStyle = P.alumMid;     c.fillRect(0, 4, 192, 1);   /* the channel's own lit line */
    c.fillStyle = P.groove;      c.fillRect(0, 5, 192, 1);   /* the rail's underside       */
    /* the room's boards, same seed as the Desk's and the Mantle's so the
       grain lines up with the floor the whole house stands on */
    LivingRoom.paintOak(c, 0, 6, 192, 22, 11);
    /* and the frame's own shadow lying across them */
    Tint.rect(c, 0, 6, 192, 3, P.shade, 4);
    return t;
  }

  /* ================================================= THE BLACK BARS

     The pillars. They were the uprights of a rolling aluminium frame -
     an extrusion with a channel down it, rivets every 21px, two clamp
     hinges and a wrap of blue tape - and a player looking at them in
     play read stacked chrome canisters with a stripe round them. The
     fault was not the aluminium, it was that every one of those details
     is a HORIZONTAL band on a vertical mid-grey column, which is the
     recipe for a stack of cans; and even drawn perfectly, nothing about
     brushed aluminium says whiteboard.

     So they are 34px bars of BLACK MARKER somebody filled in. Three
     things come out of that and all three are worth more than a frame:

       1. the bay's one colour rule becomes total. Black ink kills,
          whether it is the 3px zigzag or a 34px column, and everything
          coloured on screen is scenery or a gift. There is no second
          thing to learn.
       2. the separation is free. A bar at luminance 22 on a board at 226
          needs no outline, no channel and no cast shadow to be found -
          which is just as well, because a drawing casts no shadow on the
          surface it is drawn on, and this level's one tell is that only
          FALLING things have shadows.
       3. it is a whiteboard. A filled-in rectangle is the single most
          recognisable thing anybody has ever done to one.

     What stops a 34x64 black rectangle reading as a hole punched in the
     screen is the three things a real filled-in marker rectangle has,
     and nothing else:

     THE HAND EDGE. The core is columns 2..31, and the outer two columns
     each side are filled or not in runs of four to seven rows, off this
     variant's own seeded rng - so the edge wobbles a pixel the way a nib
     wobbles when somebody is colouring in and not tracing.

     THE DRY STREAKS. 1px of inkWet laid diagonally down-and-right, one
     about every nine rows, where the marker ran thin. They are diagonal
     because a hand colouring a tall shape in sweeps across it, and the
     two variants run on different phases so two bars on screen together
     are not the same bar twice.

     THE MISSED SLIVERS. Two or three bites of bare board out of the
     edges, where the hatch simply did not reach.

     The tile is 128 TALL and tiled vertically by LivingRoom.drawColumn.
     It was 64, which is the height every other column tile in the game
     is, and at 64 the streaks came back round twice inside one pillar and
     the eye found the repeat immediately - the old aluminium post had the
     same period and hid it behind a brushed-metal noise field that a
     filled-in rectangle has no excuse for. 128 is taller than all but the
     longest column this level generates, so most bars show the tile once
     and no bar shows it more than twice. The hand edge has no period to
     find in the first place, because its runs are 4 to 7 rows and the
     join lands wherever it lands - which is what a hand doing the same
     job twice does anyway. */
  function bakeBar(variant) {
    var W = 34, H = 128;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(930 + variant * 71);
    var i, y, run, n;

    /* the core */
    c.fillStyle = P.ink;
    c.fillRect(2, 0, 30, H);

    /* the hand edge, both sides, independently. n is how many of that
       side's two outer columns this run reaches: a quarter of the runs
       stop short of them both, half take one, a quarter take both, so
       the bar is 30 to 34 wide and spends most of its length at 32. */
    var side;
    for (side = 0; side < 2; side++) {
      y = 0;
      while (y < H) {
        run = 4 + Math.floor(r() * 4);
        n = r() < 0.25 ? 0 : (r() < 0.667 ? 1 : 2);
        if (n > 0) {
          c.fillStyle = P.ink;
          c.fillRect(side ? 32 : 2 - n, y, n, Math.min(run, H - y));
        }
        y += run;
      }
    }

    /* the dry streaks. The two variants start at different rows AND lean
       by different amounts, because a streak is the record of one sweep
       of a hand and two hands do not sweep the same. */
    c.fillStyle = P.inkWet;
    y = variant ? 4 : 9;
    while (y < H) {
      var len = 14 + Math.floor(r() * 12);
      var sx = 3 + Math.floor(r() * (W - 8 - len));
      for (i = 0; i < len; i++) {
        /* a 1-in-4 lean on one variant and a 1-in-8 on the other: over a
           20px streak that is five rows against two, which at this
           spacing is as much lean as there is room for before two
           streaks run into each other */
        var py = y + (variant ? (i >> 3) : (i >> 2));
        if (py >= 0 && py < H) c.fillRect(sx + i, py, 1, 1);
      }
      /* 7 to 12 rows on, and NOT a fixed 9. A fixed step put a streak on
         every ninth row for the whole height of the bar, which at 5x is a
         ladder and at 1x is a stack of rungs - the exact thing the
         aluminium post's rivets were doing wrong. A hand sweeping a shape
         in does not space its passes evenly; the average is the same and
         there is no frequency left to find. */
      y += 7 + Math.floor(r() * 6);
    }

    /* and the slivers the hatch missed: 3px bites taken out of one edge
       or the other, which is one pixel into the core. They are CLEARED
       rather than painted P.board, because a hole in the marker shows
       whatever is on the board behind it - a doodle, the glare, a stuck
       magnet - and painting the board's flat white into it would put a
       white chip on top of a parabola. Four over the 128-row tile, which
       is two or three inside any one column the level actually draws:
       two and it reads as damage, five and it reads as a texture. */
    for (i = 0; i < 4; i++) {
      y = Math.floor(r() * (H - 2));
      if (r() < 0.5) c.clearRect(0, y, 3, 2);
      else c.clearRect(W - 3, y, 3, 2);
    }
    return t;
  }

  /* The mouth of the gap: the END FLICK of the stroke, where the hand
     reached the edge of the rectangle and lifted off. 42x9, the engine's
     own cap box, spanning 4px past the bar each side - which is exactly
     what a hand overshooting the shape it is filling in does.

     It is solid ink with the four corner pixels notched off, because a
     stroke's end is never square; a 1px inkWet line along the face that
     looks INTO the gap, which is the wet edge the nib left as it came
     away; and a 6px inkWet dash on the flat, continuing the nearest dry
     streak out of the bar and across the cap, so the cap reads as part
     of the same stroke rather than as a lid on it.

     It is still the darkest thing on the screen and it still lands
     exactly where the player is aiming, which is the one property of the
     old moulded plastic cap worth keeping. `down` is the cap on the
     bottom of the top column, so its wet face is its BOTTOM row. */
  function bakeCap(down) {
    var W = 42, H = 9;
    var t = makeCanvas(W, H), c = t.ctx;
    c.fillStyle = P.ink; c.fillRect(0, 0, W, H);
    /* the four notched corners */
    c.clearRect(0, 0, 1, 1); c.clearRect(W - 1, 0, 1, 1);
    c.clearRect(0, H - 1, 1, 1); c.clearRect(W - 1, H - 1, 1, 1);
    /* the wet edge, on the face that looks into the gap */
    c.fillStyle = P.inkWet;
    c.fillRect(1, down ? H - 1 : 0, W - 2, 1);
    /* and the dry streak carrying on across it */
    for (var i = 0; i < 6; i++) c.fillRect(22 + i, (down ? 2 : 3) + (i >> 1), 1, 1);
    return t;
  }

  /* ================================================== the magnets

     A disc magnet tumbling flat, twelve baked frames of it, 11x11 each.
     The silhouette is the whole animation: a full disc, an ellipse, a
     thinner ellipse, a 3px sliver edge-on, and back out the other side -
     and then the SAME sequence again showing the raw ferrite BACK of the
     magnet rather than its plated face. That second half is why it
     flashes silver-then-black as it comes down, which is exactly what a
     fridge magnet dropped down a stairwell does, and it is also the one
     thing that tells the player at a glance that this is a flat disc and
     not a ball.

     Twelve frames and not four, because the hitbox follows the
     silhouette: an edge-on magnet is collided as a 9x1 sliver and a
     face-on one as a 9x9 square, and a four-frame cycle makes that
     change in steps the eye can see. Nothing rotates a canvas. */
  var MAG_H = [11, 9, 6, 3, 6, 9, 11, 9, 6, 3, 6, 9];
  var MAG_FRAMES = 12;

  /* the ellipse, as [offset, width] rows: the Coop's egg plotter again */
  function discRows(fh) {
    var rows = [], i, ry = fh / 2;
    for (i = 0; i < fh; i++) {
      var dy = (i + 0.5 - ry) / ry;
      var hw = Math.round(5.4 * Math.sqrt(Math.max(0, 1 - dy * dy)));
      rows.push([5 - hw, hw * 2 + 1]);
    }
    return rows;
  }

  /* face: 0 silver, 1 blue, 2 black - body, highlight, shadow */
  var MAG_FACE = [
    [P.magSilver, P.magSilverHi, P.magSilverDk],
    [P.magBlue,   P.magBlueHi,   P.magBlueDk],
    [P.magBlack,  P.magBlackHi,  P.ferrite]
  ];

  function bakeMagnet(face, f) {
    var t = makeCanvas(11, 11), c = t.ctx;
    var fh = MAG_H[f], top = Math.round((11 - fh) / 2);
    var back = f >= 6;
    var cols = MAG_FACE[face];
    var rows = discRows(fh);
    var i;

    if (fh <= 3) {
      /* edge on. A magnet seen from the side is a 3px pill of plated rim
         over the ferrite body, and at this width that is literally three
         rows: rim, core, rim. */
      c.fillStyle = P.ferrite;     c.fillRect(0, top, 11, fh);
      c.fillStyle = P.magSilverDk; c.fillRect(0, top, 11, 1);
      c.fillStyle = P.outline;     c.fillRect(0, top, 1, fh); c.fillRect(10, top, 1, fh);
      return t;
    }

    LivingRoom.rowsFill(c, rows, 0, top, back ? P.ferrite : cols[0]);
    /* the rim, laid INSIDE the shape: the first and last pixel of every
       row plus the top and bottom rows. An outline laid outside it would
       need a 13x13 canvas and the sprite is centred on an 11px grid - and
       a disc that gains a pixel when it turns is a disc that jitters. */
    c.fillStyle = back ? P.ferriteHi : P.outline;
    for (i = 0; i < rows.length; i++) {
      c.fillRect(rows[i][0], top + i, 1, 1);
      c.fillRect(rows[i][0] + rows[i][1] - 1, top + i, 1, 1);
    }
    c.fillRect(rows[0][0], top, rows[0][1], 1);
    c.fillRect(rows[rows.length - 1][0], top + fh - 1, rows[rows.length - 1][1], 1);

    if (!back) {
      /* the specular on the plated face, up at the top left where the
         pendant is - and the shadow terminator opposite it */
      c.fillStyle = cols[1];
      c.fillRect(2, top + 1, 3, 1);
      if (fh > 5) c.fillRect(2, top + 2, 2, 1);
      c.fillStyle = cols[2];
      c.fillRect(6, top + fh - 2, 3, 1);
    } else {
      /* and the one thing a ferrite back face has: the grind marks */
      c.fillStyle = P.ferriteHi;
      c.fillRect(3, top + ((fh / 2) | 0), 5, 1);
    }
    return t;
  }

  /* ================================================== the markers

     The sprite on the end of a stroke. 24x24, baked twice: barrel up and
     to the right for a stroke being drawn off the tray, down and to the
     right for one off the rail - in both cases the hand is coming from
     off screen to the right, which is the direction everything in this
     game arrives from.

     The cap is never shown. A dry-erase marker that still has its cap on
     is a marker that is not drawing, and the one thing the player must
     read off this sprite is that it IS drawing. */
  function bakeMarker(up) {
    var t = makeCanvas(24, 24), c = t.ctx;
    var i;
    for (i = 0; i < 22; i++) {
      var px = 1 + i;
      var py = up ? 22 - i : 1 + i;
      var col, hw;
      if (i < 3)       { col = P.felt;        hw = 0; }   /* the chisel nib   */
      else if (i < 6)  { col = P.markerCone;  hw = 1; }   /* the taper        */
      else if (i < 10) { col = P.markerBody;  hw = 1; }
      else if (i < 13) { col = P.markerLabel; hw = 1; }   /* the label band   */
      else             { col = P.markerBody;  hw = 1; }
      c.fillStyle = col;
      c.fillRect(px - hw, py - hw, hw * 2 + 1, hw * 2 + 1);
    }
    /* the lit edge along the top of the barrel, one pixel proud */
    c.fillStyle = P.markerLit;
    for (i = 7; i < 21; i++) {
      c.fillRect(1 + i - 1, (up ? 22 - i : 1 + i) - (up ? 2 : 1), 1, 1);
    }
    /* and the butt end, squared off */
    c.fillStyle = P.markerBody;
    c.fillRect(20, up ? 0 : 20, 3, 3);
    return t;
  }

  /* ========================================== the four drawn power-ups

     Every one of these is a PICTURE of the thing, on the board, in
     marker - a 2px chisel stroke of coloured ink with the board showing
     through the middle of it. The interiors are filled with P.board
     rather than left clear, and that is deliberate: a drawing on a
     whiteboard occludes whatever was drawn there before, and a
     see-through pepper would have the parabola running through it on its
     way down. Over clear board the fill is invisible, because it is the
     board's own colour; over a doodle or over the glare it covers, which
     is correct. */

  /* the pepper: the heat, in the one red that is not a bar magnet */
  function bakePepper() {
    var t = makeCanvas(11, 15), c = t.ctx;
    /* the body, as a chubby chili outline: left edge, right edge, the
       curl at the bottom. Drawn as the fill first and the stroke over it,
       because a 2px stroke drawn first gets eaten by its own fill. */
    var rows = [[3, 5], [2, 7], [2, 7], [2, 7], [2, 7], [2, 6], [3, 5], [3, 4], [4, 3], [4, 2]];
    LivingRoom.rowsFill(c, rows, 0, 4, P.board);
    c.fillStyle = P.pepRed;
    for (var i = 0; i < rows.length; i++) {
      c.fillRect(rows[i][0], 4 + i, 2, 1);
      c.fillRect(rows[i][0] + rows[i][1] - 2, 4 + i, 2, 1);
    }
    c.fillRect(rows[0][0], 4, rows[0][1], 2);
    c.fillStyle = P.pepDark; c.fillRect(4, 13, 2, 1);        /* the tip      */
    c.fillStyle = P.stemGreen;                               /* the stalk    */
    c.fillRect(4, 0, 2, 5); c.fillRect(6, 0, 2, 2);
    return t;
  }

  /* the lime: a citrus SLICE, not a whole fruit. A green oval at eleven
     pixels is a small apple and nothing else; a circle with spokes in it
     is a lime at any size, which is why every icon in the world draws it
     that way. The Canopy's lime is a whole one because the Canopy has
     oranges and apples beside it to be told apart from - this board has
     a golden apple on it, so the slice it is. */
  function bakeLime() {
    var t = makeCanvas(13, 13), c = t.ctx;
    var i;
    /* the board's own white, filled as nested rings rather than as a
       square, so the slice has a round silhouette and not a white box */
    for (i = 0; i <= 6; i++) pcircle(c, 6, 6, i, P.board);
    pcircle(c, 6, 6, 6, P.limeMid);
    pcircle(c, 6, 6, 5, P.limeMid);
    pcircle(c, 6, 6, 4, P.limeHi);                 /* the pith, inside the rim */
    for (i = 0; i < 6; i++) {
      var a = i * TAU / 6 + 0.26;
      pline(c, 6 + Math.cos(a) * 1.5, 6 + Math.sin(a) * 1.5,
            6 + Math.cos(a) * 3.6, 6 + Math.sin(a) * 3.6, P.limeDark);
    }
    return t;
  }

  /* the golden apple: the +5. It is the only drawing on this board in
     gold, and the gold is UI.C.gold's own family, so a +5 in the world
     reads as the same colour as the +5 in the score. */
  function bakeApple() {
    var t = makeCanvas(13, 15), c = t.ctx;
    var rows = [[3, 7], [2, 9], [1, 11], [1, 11], [1, 11], [1, 11], [2, 9], [3, 7], [4, 5]];
    LivingRoom.rowsFill(c, rows, 0, 5, P.board);
    c.fillStyle = P.goldDark;
    for (var i = 0; i < rows.length; i++) {
      c.fillRect(rows[i][0], 5 + i, 2, 1);
      c.fillRect(rows[i][0] + rows[i][1] - 2, 5 + i, 2, 1);
    }
    c.fillRect(rows[0][0], 5, rows[0][1], 2);
    c.fillRect(rows[rows.length - 1][0], 13, rows[rows.length - 1][1], 1);
    /* the inner line on the lit shoulder - what a hand does when it goes
       round a drawing twice on one side */
    c.fillStyle = P.goldMid;
    c.fillRect(3, 7, 1, 4); c.fillRect(4, 7, 3, 1);
    c.fillStyle = P.goldDark; c.fillRect(6, 3, 2, 3);          /* the stalk  */
    c.fillStyle = P.stemGreen;                                  /* the leaf   */
    c.fillRect(8, 2, 4, 2); c.fillRect(9, 1, 2, 1);
    /* and the glint, drawn as a cross because that is how a hand draws a
       shine and a single pale pixel reads as a mistake */
    c.fillStyle = P.goldShine;
    c.fillRect(4, 9, 3, 1); c.fillRect(5, 8, 1, 3);
    return t;
  }

  /* --------------------------------------------- the drawn succulent

     The spare life, in two canvases sharing one 20x22 coordinate space,
     the way the Deck shares its pot and rosette: draw both at the same
     origin and the picture reassembles, and Gerald's hunger can lift the
     rosette off the drawn pot and leave the pot on the board.

     There are two pots because there are two heights. The one down by
     the tray is drawn the right way up with the plant in it; the one up
     under the rail is drawn UPSIDE DOWN with the plant spilling out of
     it, because a picture on a whiteboard is not subject to gravity and
     this is the one bay in the game that can say so. */
  /* `flip` draws the whole plant upside down, for the one sketched high
     on the board: the rosette has to turn over with its pot or the
     drawing is of a succulent growing UP into an upturned pot, which is
     not a joke, it is a mistake. The flip is a transform on the BAKE and
     not on the draw - a baked tile is blitted as one piece whichever way
     up it was made, and nothing resamples because every mark in here is
     an integer rect. */
  function bakeRosette(flip) {
    var t = makeCanvas(20, 22), c = t.ctx;
    /* mirror about the WHOLE 22-row space (y -> 21 - y) and not about 21
       (y -> 20 - y) as this did, so that bakePot can flip on the same
       axis and the two halves of the drawing stay a mirror of each other.
       On the old axis the bottom row of the space had nowhere to land. */
    if (flip) { c.translate(0, 22); c.scale(1, -1); }
    /* FOUR rings of 2px leaf arcs round a centre at (10, 10), and the
       geometry is the Garden's exactly, shifted down TWO rows into this
       bay's taller space. PlayScene paints the HUD life and the save
       burst in these pigments, so the thing on the board has to be that
       plant and not another - and an earlier version here hollowed every
       leaf out to board white to make it look DRAWN, which turned the
       rosette into a stack of empty brackets and read as a ziggurat. What
       says "drawn" is the pot being an outline and the whole thing being
       flat; the plant itself has to stay the plant.

       IT WAS THREE ROWS AND IS NOW TWO, which is the second half of the
       proportion fix described over bakePot. At three the rosette's ink
       ran rows 6..15 and the pot's mouth is rows 13..14, so the plant
       sank THREE rows into the pot and swallowed the rim and the widest
       course of the body with it: six rows of pot were left showing. The
       Garden's plant covers exactly two rows of its pot and leaves seven.
       Two rows does the same here, and the flip comes out right for free -
       the transform is y -> 21 - y, so a rosette at 5..14 lands at 7..16
       against an upturned pot whose rim is row 8, which is the same two
       rows of overlap seen the other way up (the mirror is y -> 21 - y,
       and the upturned pot's rim lands on rows 7 and 8). */
    var rings = [
      { y: 12, xs: [[3, 4], [13, 4]], col: P.sucDark },
      { y: 10, xs: [[4, 4], [12, 4], [8, 4]], col: P.sucMid },
      { y: 8,  xs: [[6, 3], [11, 3]], col: P.sucMid },
      { y: 6,  xs: [[8, 4]], col: P.sucHi }
    ];
    rings.forEach(function (ring) {
      ring.xs.forEach(function (p) {
        /* the darker teal laid UNDER each leaf, where the Garden lays
           black: on a white board a black ring round a teal leaf is ink,
           and ink in this bay is the thing that kills you */
        c.fillStyle = P.sucDark; c.fillRect(p[0] - 1, ring.y - 1, p[1] + 2, 4);
        c.fillStyle = ring.col;  c.fillRect(p[0], ring.y, p[1], 2);
        c.fillStyle = P.sucHi;   c.fillRect(p[0], ring.y, 1, 1);
        c.fillStyle = P.sucTip;  c.fillRect(p[0] + p[1] - 1, ring.y, 1, 1);
      });
    });
    c.fillStyle = P.sucHi;  c.fillRect(9, 6, 2, 2);
    c.fillStyle = P.sucTip; c.fillRect(9, 5, 2, 1);
    return t;
  }

  /* The pot's width on a given body row, as ONE function, so the walls,
     the rim and the closed far end cannot disagree about how wide the pot
     is anywhere.

     THE TAPER WAS 0.45 A ROW AND IS NOW 0.15, which is the owner's note
     that "the succulent looks too big for its pot". It was not the plant:
     measured off the baked tiles side by side with the Garden's, both
     rosettes are 16px wide and 10 rows of ink, pixel for pixel the same
     plant. The pot was the problem. At 0.45 the inset ran 0,0,1,1,2,2,3,3,4
     so the body went 12,12,10,10,8,8,6,6,4 and closed on a 6px foot: under
     a 16px rosette that is a cone, not a pot, and the ratio of plant to
     visible pot came out 16:6. The Garden's pot does not taper at all -
     it is a straight 12 under the same 16px rosette, 16:12 - so a drawn
     version of the same power-up has to land near 12 too, or it is not
     that plant in marker, it is a different plant.

     0.15 gives 0,0,0,0,1,1,1,1,1: a body of 12 that steps in once to 10
     near the foot. That keeps a taper - a marker pot with parallel sides
     reads as a tin - while leaving the silhouette the Garden's. The rim
     stays 14 because the pot here is a hollow outline with the board
     showing through it and carries perhaps a third of the Garden pot's
     ink; a slightly wider lip buys back the weight the hollow gives up. */
  function potInset(row) { return Math.round(row * 0.15); }

  /* the pot, 20x22 shared space. `over` draws it upside down at the top
     of the space for the one hanging under the rail.

     IT FLIPS ON THE TRANSFORM NOW, exactly as bakeRosette does, because
     flipping it by arithmetic got the mirror wrong. The old version drew
     the body with `row = 8 - i` from the top of the space and then put
     the rim one row PAST the body at rows 8 and 9, so the upturned pot
     spanned ten rows against the upright one's nine - and the rosette,
     which mirrors about row 21, came down far enough to cover the whole
     of it. The upturned pot's mouth is the widest course it has and the
     one thing that says a plant could ever have been in it, and it was
     entirely hidden. Mirroring the identical upright drawing puts the
     mouth at rows 7-8 with the same two rows of overlap the low one has,
     and seven rows of pot showing on both. A baked tile is blitted as one
     piece whichever way up it was made, and nothing resamples, because
     every mark in here is an integer rect. */
  function bakePot(over) {
    var t = makeCanvas(20, 22), c = t.ctx;
    if (over) { c.translate(0, 22); c.scale(1, -1); }
    var top = 13, i, inset, x0, w;
    /* nine rows of tapering pot, drawn as a 2px outline with the board
       left showing through it. The flip takes the taper with it - a pot
       drawn upside down tapers the other way or it is not a pot, it is a
       bucket.

       AND THE INSIDE IS LEFT TRANSPARENT, where it used to be filled with
       P.board. "The board showing through" is what the pot is for, and a
       rect of the raw board pigment is not that: the room's light is
       baked into the backdrop before an obstacle is drawn over it, so the
       fill was the UNLIT board laid on top of the lit one. Measured in
       play with a succulent sketched low at FLOOR - 17, where the skirting
       gloom has the board down at luminance 119, the inside of the pot came
       back at 215 - a 96-step white block eight pixels wide sitting inside
       the drawing, which is what made the pot read as a solid object
       rather than as a thing somebody drew, and no amount of fixing the
       proportion would have fixed that. Transparent costs nothing: the
       pot is baked, so the board behind it arrives already lit and the
       ghost marks it crosses show through the way marker does. */
    for (i = 0; i < 9; i++) {
      inset = potInset(i);
      x0 = 4 + inset; w = 12 - inset * 2;
      c.fillStyle = P.potOrange;
      c.fillRect(x0, top + i, 2, 1);
      c.fillRect(x0 + w - 2, top + i, 2, 1);
    }
    /* the rim, which is the end of the pot the plant comes out of */
    c.fillStyle = P.potOrange; c.fillRect(3, top, 14, 2);
    c.fillStyle = P.potHi;     c.fillRect(4, top, 12, 1);
    /* and the far end, closed across whatever the taper left at row 8
       rather than across a hard-coded 6 - the old 6 was narrower than the
       walls it was supposed to join and left the foot open at the corners */
    inset = potInset(8);
    c.fillStyle = P.potOrange;
    c.fillRect(4 + inset, top + 8, 12 - inset * 2, 1);
    return t;
  }

  /* ================================================== THE FUNNEL

     A kitchen funnel standing in the tray, mouth up, drawn in the
     parabola's blue with the fat nib - and the inside of its bowl is
     not board. It is the slate of the place it leads to, with a
     whirlpool turning in it and chalk dust leaking back out, and it is
     the only green thing, the only hole and the ONLY THING THAT TURNS
     anywhere in this bay. Three separations for one object, because
     this one object is the only gift on the board that does not give
     you a point or a life - it gives you somewhere else to be.

     40x34, blitted at (round(ob.x) - 20, FLOOR - 34), so the tile's
     last row is FLOOR and the spout ends on the tray lip rather than
     hanging in the air over it. In tile coordinates, x right and y down
     from that top-left corner:

       rim          (2,2)  -> (38,2)    36 wide - ten wider than the
                                        26px body a pillar would have,
                                        so it reads as a MOUTH, not a
                                        pipe, from the right-hand edge
       bowl sides   (2,2)  -> (15,21)
                    (38,2) -> (25,21)
       spout        (15,21) -> (15,33)  10 wide, down to the lip
                    (25,21) -> (25,33)

     Every stroke is pline2 - the fat nib the parabola and the face were
     drawn with - so the funnel is 2px like every other drawing in here
     and can never be confused with the 3px zigzag or the 34px bar. The
     hand wobble is the thing that keeps it from reading as a diagram,
     and the endpoints are never moved, so the spout still meets the lip
     and the walls still meet the rim. */
  var FUNNEL_W = 40, FUNNEL_H = 34;

  /* one stroke, walked in 5-7px steps with the joints jittered a pixel
     off the dominant axis. 5 to 7 and not a fixed 6: a fixed step is a
     wave with a period, and a wave with a period is a machine. */
  function wobble(c, r, x0, y0, x1, y1, col) {
    var dx = x1 - x0, dy = y1 - y0;
    var len = Math.sqrt(dx * dx + dy * dy);
    var horiz = Math.abs(dx) > Math.abs(dy);
    var px = x0, py = y0, t = 0, step, nt, nx, ny, j;
    while (t < 1) {
      step = (5 + Math.floor(r() * 3)) / len;
      nt = Math.min(1, t + step);
      nx = x0 + dx * nt; ny = y0 + dy * nt;
      if (nt < 1) {
        j = Math.floor(r() * 3) - 1;              /* -1, 0 or +1 */
        if (horiz) ny += j; else nx += j;
      }
      pline2(c, px, py, nx, ny, col);
      px = nx; py = ny; t = nt;
    }
  }

  function bakeFunnel() {
    var t = makeCanvas(FUNNEL_W, FUNNEL_H), c = t.ctx;
    var r = mulberry32(4411);
    var y, lx, rx;

    /* THE INSIDE GOES DOWN FIRST, so the wall lands on top of it and
       the bowl has no thread of board showing inside its own ink. The
       span is taken a pixel wide of each plotted column on both sides,
       because pline2's stamp is a 2x2 drawn DOWN AND RIGHT of the pixel
       it is plotted at and the wobble can carry it a pixel either way:
       at its outermost the wall still has green behind it, and at its
       innermost it simply covers a pixel of green, which is what a
       thick nib does to the thing it is outlining. */
    c.fillStyle = P.funnelDeep;
    for (y = 2; y <= 20; y++) {
      lx = Math.round(2 + 13 * (y - 2) / 19);
      rx = Math.round(38 - 13 * (y - 2) / 19);
      c.fillRect(lx + 1, y, rx - lx, 1);
    }
    /* the throat, straight down to the clip at row 33 - the spout pours
       into the tray and the tray lip is painted over it by drawFloor */
    c.fillRect(16, 21, 10, FUNNEL_H - 21);

    /* and the wall. ONE stream for all five strokes, taken in this
       order, so the tile is the same tile on every boot and the funnel
       the player learns on plank 11 is the funnel they get on the
       retry. */
    wobble(c, r,  2,  2, 38,  2, P.inkBlue);     /* the rim             */
    wobble(c, r,  2,  2, 15, 21, P.inkBlue);     /* the left bowl wall  */
    wobble(c, r, 38,  2, 25, 21, P.inkBlue);     /* the right bowl wall */
    wobble(c, r, 15, 21, 15, 33, P.inkBlue);     /* the left spout      */
    wobble(c, r, 25, 21, 25, 33, P.inkBlue);     /* the right spout     */

    /* AND THE ONE PASS THAT MAKES THE WOBBLE SAFE, which is here because
       the first version of this tile did not have it and the tile was
       WRONG: the fill above is laid out row by row off the ideal
       trapezoid, and the rim is a hand line that steps a pixel up and
       down across the top of it. Wherever the rim stepped DOWN, the
       fill had already painted green on the row above where the ink
       actually landed - ten columns of 1px green fringe floating over
       the lip, measured.

       A green pixel OUTSIDE the vessel is the one thing this object may
       not do. It is the only green in the bay, the header's hue rule is
       what lets it be this dark, and that rule reads "the inside of the
       bowl": green over the rim is not an inside, it is a smudge on a
       white board, and at 1x it reads as a second thinner lip in a
       colour the bay does not own.

       So: walk each column from the top and drop every green pixel
       until the first pixel of wall. Green with no ink over it is green
       that is not in the bowl. It cannot eat anything legitimate - the
       bowl is closed at the top by the rim and on the sides by the
       walls, so every pixel of true interior has ink somewhere above it
       in its own column, including the spout's, whose own walls are
       over it. The bottom stays open on purpose: the spout pours into
       the tray and drawFloor paints the lip over that row. */
    var g0 = parseInt(P.funnelDeep.slice(1, 3), 16),
        g1 = parseInt(P.funnelDeep.slice(3, 5), 16),
        g2 = parseInt(P.funnelDeep.slice(5, 7), 16);
    var img = c.getImageData(0, 0, FUNNEL_W, FUNNEL_H), d = img.data;
    var col, i, wall;
    for (col = 0; col < FUNNEL_W; col++) {
      wall = false;
      for (y = 0; y < FUNNEL_H && !wall; y++) {
        i = (y * FUNNEL_W + col) * 4;
        if (d[i + 3] === 0) continue;                      /* board showing */
        if (d[i] === g0 && d[i + 1] === g1 && d[i + 2] === g2) d[i + 3] = 0;
        else wall = true;                                  /* the ink: stop */
      }
    }
    c.putImageData(img, 0, 0);
    return t;
  }

  /* THE SWIRL. Four frames, 28x10, three concentric ellipses with a
     quarter of each one missing, and the missing quarter walks 90
     degrees per frame.

     A broken ring whose gap goes round reads as rotation, and it costs
     four blits: the magnets' precedent, and the magnets' reason - the
     Bayer grid is anchored in user space and a ctx.rotate on a layer
     that scrolls boils the pixels (see the header). All three rings
     share the gap, so what the eye follows is ONE wedge of missing
     chalk sweeping round the bowl, rather than three rings arguing
     about which way they are going.

     rx 13/9/5 against ry 4/3/2 is a circle seen at a steep angle, which
     is what the inside of a funnel standing in a tray is. 1px, because
     the swirl is the one mark in the bay allowed to be finer than a
     doodle: it is not something somebody drew, it is water. */
  var SWIRL_RX = [13, 9, 5], SWIRL_RY = [4, 3, 2];
  var SWIRL_W = 28, SWIRL_H = 10, SWIRL_FRAMES = 4;

  /* WHERE THE SWIRL SITS INSIDE THE FUNNEL TILE, and the reason these are
     two named numbers rather than two literals in drawFunnel: the mask
     below and the blit in drawFunnel both come off this pair, so the
     water cannot drift out of the bowl by somebody adjusting one of
     them. The tile goes down at (x - 20, FLOOR - 34) and the swirl at
     (x - 14, FLOOR - 29), which is these two exactly. */
  var SWIRL_DX = 6, SWIRL_DY = 5;

  function bakeSwirl(i, funnelTile) {
    var t = makeCanvas(SWIRL_W, SWIRL_H), c = t.ctx;
    var cx = 14, cy = 5, gap0 = i * (TAU / SWIRL_FRAMES);
    var k, s, a, steps;
    c.fillStyle = P.swirl;
    for (k = 0; k < 3; k++) {
      /* stepped off the ring's own circumference, so the big one comes
         out solid and the small one is not plotted forty times into the
         same pixel */
      steps = Math.max(48, Math.ceil(TAU * SWIRL_RX[k] * 2));
      for (s = 0; s < steps; s++) {
        a = s / steps * TAU;
        if (wrap(a - gap0, TAU) < TAU / 4) continue;        /* the gap */
        c.fillRect(cx + Math.round(Math.cos(a) * SWIRL_RX[k]),
                   cy + Math.round(Math.sin(a) * SWIRL_RY[k]), 1, 1);
      }
    }

    /* AND THE BOWL CROPS IT, which is the second thing measured rather
       than assumed. The swirl is a 28x10 RECTANGLE and the bowl is a
       taper: at the swirl's own bottom rows the outer ring is 27px wide
       and the bowl has already closed to about 20, so the ring's lower
       arc ran straight through the blue wall and, in three places, out
       onto the bare board beyond it - 34 pixels on the ink and 3 outside
       the funnel altogether, counted across the four frames.

       Either one is the same offence as green over the rim. The 3 put
       the bay's only green on the white board outside the vessel; the 34
       chew pale pixels out of the one 2px outline that makes the thing
       read as something somebody DREW, and they do it at the shoulders,
       where the taper is the whole silhouette.

       So each frame is cropped to the funnel's INTERIOR once, at bake
       time, against the tile it will be blitted into. Water stops at the
       wall, which is what water does, and the blit stays a single
       drawImage with no clip and no per-frame work. */
    var fd = funnelTile.ctx.getImageData(0, 0, FUNNEL_W, FUNNEL_H).data;
    var g0 = parseInt(P.funnelDeep.slice(1, 3), 16),
        g1 = parseInt(P.funnelDeep.slice(3, 5), 16),
        g2 = parseInt(P.funnelDeep.slice(5, 7), 16);
    var img = c.getImageData(0, 0, SWIRL_W, SWIRL_H), d = img.data;
    var sx, sy, si, fi, fx, fy;
    for (sy = 0; sy < SWIRL_H; sy++) {
      for (sx = 0; sx < SWIRL_W; sx++) {
        si = (sy * SWIRL_W + sx) * 4;
        if (d[si + 3] === 0) continue;
        fx = sx + SWIRL_DX; fy = sy + SWIRL_DY;
        fi = (fy * FUNNEL_W + fx) * 4;
        if (fx < 0 || fx >= FUNNEL_W || fy < 0 || fy >= FUNNEL_H ||
            fd[fi + 3] === 0 ||
            fd[fi] !== g0 || fd[fi + 1] !== g1 || fd[fi + 2] !== g2) d[si + 3] = 0;
      }
    }
    c.putImageData(img, 0, 0);
    return t;
  }

  /* ------------------------------------------------------------ build */

  function build() {
    LivingRoom.build();
    /* this bay's own band over the board: see bakeTop */
    T.top     = bakeTop();
    T.board   = [bakeBoard(0), bakeBoard(1), bakeBoard(2)];
    T.glare   = bakeGlare();
    T.floor   = bakeFloor();
    T.post    = [bakeBar(0), bakeBar(1)];
    T.capDown = bakeCap(true);
    T.capUp   = bakeCap(false);
    /* The two contact shadows this bay throws, as baked STRIPS off the
       room's own bakeShade rather than as flat Tints. They were
       Tint.rect(..., P.shade, 5) over nine rows under the rail and the
       same over eight above the tray, and on a board at luminance 226
       each of those rims measured as a step of about 40 in a single row -
       the two biggest cliffs left in the room's one pale bay after
       LivingRoom baked its own pass. A strip of the same depth spreads
       the identical darkness over 40 and 12 rows at under 3 a row.

       THE RAIL STRIP IS 40 ROWS AND NOT 14, and the forty is measured
       rather than chosen. The room's own crown shadow is already laid
       over these rows - bakeShade(crownShade, 0.31, 10) out of
       LivingRoom.drawCeiling - and on a wall at luminance 226 that strip
       alone moves a row by up to 6.7. Anything this bay adds on top of it
       STACKS, so a second strip of the same length doubles the slope: at
       0.44 over 14 rows the worst row in the bay measured 9.8 and 145 of
       the 480 columns had a row over 8 in them.

       Stretching it to 40 does better than merely diluting it, and the
       numbers say by how much: 0.36 over 40 measures 5.59, which is
       LOWER than taking the strip away altogether (6.70). A long gentle
       ramp running the other way partly cancels the room's own slope
       where the room's strip runs out, and the pair comes out flatter
       than either on its own. Swept across eight scroll positions the
       worst row in the whole bay is 5.59 to 5.70 and all 480 columns are
       under 8 at every one of them; what is left is the room's crown
       shadow, measured at rows 27 to 33 and no longer the Whiteboard's to
       fix. The peak is still a hair darker than the pair of flat Tints
       was at the kill line - 163 against 158 - so the overhang reads as
       it did.

       The tray strip never binds: at every peak and length tried, from
       0.26 over 20 to 0.34 over 24, the bay's worst row stayed 5.59. It
       keeps 0.30 over 12, which is where the old flat 0.3125 over 8
       sat. */
    T.railShade = LivingRoom.bakeShade(P.shade, 0.36, 40, false);
    T.trayShade = LivingRoom.bakeShade(P.shade, 0.30, 12, true);
    T.magnet  = [];
    for (var face = 0; face < 3; face++) {
      var set = [];
      for (var f = 0; f < MAG_FRAMES; f++) set.push(bakeMagnet(face, f));
      T.magnet.push(set);
    }
    T.marker  = [bakeMarker(true), bakeMarker(false)];
    T.pepper  = bakePepper();
    T.lime    = bakeLime();
    T.apple   = bakeApple();
    T.sucRosette   = bakeRosette(false);
    T.sucRosetteUp = bakeRosette(true);
    T.sucPot       = bakePot(false);
    T.sucPotUp     = bakePot(true);
    /* the hole and the water in it - see bakeFunnel */
    T.funnel  = bakeFunnel();
    T.swirl   = [];
    /* the funnel first: each swirl frame is cropped to that tile's bowl */
    for (var sw = 0; sw < SWIRL_FRAMES; sw++) T.swirl.push(bakeSwirl(sw, T.funnel));

    /* AND THE PLACE THE FUNNEL GOES, which is why this line is in this
       function and not in some loader. Levels.buildArt walks lv.art and
       nothing else, and the Chalkboard is deliberately in no level entry
       - it is not a level, it has no cover, no high-score key and no
       row on the select screen - so if this call is not here nothing
       ever bakes it and the first landing in a funnel arrives in an
       empty room with no tiles in it.

       It is LAST because it is not this bay's furniture. It is safe
       because Chalkboard.build() is self-guarded (`if (T.board)
       return;`), so the second boot of this level costs nothing, and
       because it does its own LivingRoom.build() for exactly the reason
       the first line of this function does. */
    Chalkboard.build();
  }

  /* ========================================================= drawing */

  /* One layer, one speed, and then the light. There is no parallax in
     this bay at all - see the header. */
  function drawBackdrop(ctx, scroll) {
    /* the one place a level may cache the scroll, and the Deck's
       precedent for doing it: see `clock` above */
    clock = scroll;

    ctx.fillStyle = P.board;
    ctx.fillRect(0, 0, VW, VH);

    /* the two world columns that can be on screen, each picking one of
       the three tiles by hash. floor() of a scroll that only ever grows
       means k changes exactly when the seam crosses x 0. */
    var k0 = Math.floor(scroll / BOARD_W);
    for (var k = k0; k <= k0 + 1; k++) {
      ctx.drawImage(T.board[hash(k) % 3].canvas, Math.round(k * BOARD_W - scroll), CEIL);
    }

    /* the lamp on the melamine. NO scroll: a reflection is a picture of
       the light and the light is not going anywhere. */
    ctx.drawImage(T.glare.canvas, 0, CEIL);

    /* and the room's own lighting pass, last, as it is in all five bays.
       The vignette lands over a BRIGHT board here rather than a dim wall,
       which is right and is the whole reason this level does not look
       washed out: on the Desk the gloom at the skirting is the room's
       night, and here it is the shadow the frame itself throws. */
    LivingRoom.drawLight(ctx);
  }

  function drawMenuBackdrop(ctx, scroll) { LivingRoom.drawMenuBackdrop(ctx, scroll); }

  /* This bay's own band - the room behind the board and the frame's top
     rail, see bakeTop - tiled on the room's 240 beat, and then the two
     shades that make the rail read as an OVERHANG rather than as a
     stripe: the room's own crown strip, kept as it is so the rows under
     the rail carry the shade they were measured with, and this bay's
     railShade. On a dark level the moulding's own shadow does that job
     for free; on a white board a hard edge needs a hard shadow under it
     or the board simply runs up into the ceiling and the kill line
     disappears. No pendant pools: there is no pendant up here. */
  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.top.canvas, scroll, 0);
    ctx.drawImage(LivingRoom.tiles.crownShade.canvas, 0, CEIL);
    ctx.drawImage(T.railShade.canvas, 0, CEIL);
  }

  function drawFloor(ctx, scroll) {
    /* the tray's shadow, thrown UP the board - the one shadow in the game
       that goes upward, and it goes upward because the tray sticks out
       from the board and the lamp is above it. bakeShade's `fromBottom`
       is for exactly this: the dark row sits against the lip at FLOOR-1
       and the strip fades upward from it. */
    ctx.drawImage(T.trayShade.canvas, 0, FLOOR - 12);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
  }

  /* ---------------------------------------------------------- posts */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.post[ob.variant].canvas;
    var w = tile.width;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (topH > 0) LivingRoom.drawColumn(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) LivingRoom.drawColumn(ctx, tile, x, botY, w, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* AND NO CAST SHADOW. There were two 4px P.shade Tints down the right
       side of every column, which is what a mid-grey aluminium post on a
       near-white board needed to stop floating. A bar of black marker
       does not float - it is 204 luminance clear of the board - and more
       to the point a DRAWING CASTS NO SHADOW ON THE SURFACE IT IS DRAWN
       ON. That is not pedantry, it is the level's own tell: in this bay
       the hard offset shadow belongs to the FALLING magnets and to
       nothing else, so that a magnet in the air is never read as one
       stuck to the board. A shadow under a drawn thing would spend it. */
  }

  /* ================================================== the marker line

     A 'spike' that is a zigzag of black marker being drawn onto the
     board while the player watches it happen. Three things about it:

     IT IS KEYED TO POSITION. See DRAW_FROM and DRAW_SPAN above. Progress
     is a pure function of ob.x, so there is no clock to go out of sync,
     no state to save, and rectsFor and drawObstacle cannot disagree
     about how much of a stroke exists - they both ask the same function.

     THE BOX IS THE BRUSH. The stroke is walked with a 3x3 brush at 1px
     steps, and rectsFor walks the same polyline at 3px steps pushing the
     same 3x3 box. There is no approximating rectangle anywhere: what
     kills you is the pixels, which on a bent line is the only honest way
     to box it. A 3px step with a 3px box tiles exactly along the
     dominant axis of a stroke this shallow, so there are no holes.

     IT IS NEVER WIPED. That is the joke of the whole board, and it is
     also why there is no "armed" phase and no timer: a drawn stroke
     stays drawn and scrolls off, and the only thing that changes about
     it is how much of it has been drawn yet. */

  /* How far along the stroke the nib has got, 0 to 1, from ob.x alone. */
  function strokeP(ob) {
    return clamp((DRAW_FROM - ob.x) / ob.span, 0, 1);
  }

  /* the anchor the stroke grows out of: the middle of the obstacle's own
     span, on whichever line it was drawn off */
  function anchorX(ob) { return ob.x + ob.anchor; }
  function anchorY(ob) { return ob.side === 'ceil' ? CEIL : FLOOR; }

  /* Walk the polyline, handing every pixel to `step(px, py, d)` where d
     is the distance travelled so far. `from` and `to` are distances
     along the stroke; everything that draws or boxes this hazard goes
     through here, which is what stops the two of them drifting apart. */
  function walkStroke(ob, from, to, stride, step) {
    var ax = anchorX(ob), ay = anchorY(ob);
    var px = ax, py = ay, d = 0, i, k;
    for (i = 0; i < ob.segs.length; i++) {
      var nx = ax + ob.segs[i][0], ny = ay + ob.segs[i][1];
      var dx = nx - px, dy = ny - py;
      var len = Math.sqrt(dx * dx + dy * dy);
      if (len < 0.001) { px = nx; py = ny; continue; }
      for (k = stride; k <= len; k += stride) {
        var dd = d + k;
        if (dd >= from && dd <= to) {
          step(Math.round(px + dx * (k / len)), Math.round(py + dy * (k / len)), dd);
        }
      }
      d += len;
      px = nx; py = ny;
    }
  }

  /* the live end of the stroke - where the nib is, which is also where
     the marker sprite goes */
  function strokeTip(ob, p) {
    var want = ob.back ? ob.len * (1 - p) : ob.len * p;
    var ax = anchorX(ob), ay = anchorY(ob);
    var px = ax, py = ay, d = 0, i;
    for (i = 0; i < ob.segs.length; i++) {
      var nx = ax + ob.segs[i][0], ny = ay + ob.segs[i][1];
      var dx = nx - px, dy = ny - py;
      var len = Math.sqrt(dx * dx + dy * dy);
      if (d + len >= want) {
        var f = len < 0.001 ? 0 : (want - d) / len;
        return [px + dx * f, py + dy * f];
      }
      d += len; px = nx; py = ny;
    }
    return [px, py];
  }

  /* what range of the stroke exists at progress p. A forward stroke
     grows out from the anchor; a BACKWARD one - the late phase - already
     has its deep end and fills in toward the rail. */
  function drawnRange(ob, p) {
    if (ob.back) return [ob.len * (1 - p), ob.len];
    return [0, ob.len * p];
  }

  function drawMarkerSprite(ctx, ob, tx, ty) {
    /* the barrel always comes from off screen right; a stroke off the
       tray is reached from above it, one off the rail from below */
    if (ob.side === 'ceil') ctx.drawImage(T.marker[1].canvas, Math.round(tx) - 1, Math.round(ty) - 1);
    else ctx.drawImage(T.marker[0].canvas, Math.round(tx) - 1, Math.round(ty) - 22);
  }

  function drawStroke(ctx, ob) {
    var p = strokeP(ob);
    var ax = anchorX(ob), ay = anchorY(ob);
    var i;

    /* 1. BEFORE the nib lands: the marker flying in, over 48px of
       approach, from a point up and to the right of where it is going.
       It aims at whichever end it is about to start from, which for a
       late one is the deep end out in the middle of the mouth - and
       watching it dive out there is the whole warning. */
    if (p <= 0) {
      if (ob.x > 500) return;
      var q = clamp((500 - ob.x) / 48, 0, 1);
      var tgt = strokeTip(ob, 0);
      var fx = tgt[0] + 70 * (1 - q);
      var fy = tgt[1] + (ob.side === 'ceil' ? 40 : -40) * (1 - q);
      drawMarkerSprite(ctx, ob, fx, fy);
      return;
    }

    /* 2. the stroke itself. Three pixels of black, which is the only
       true black in the bay: red is the pepper, green the lime, gold the
       apple, teal the succulent, and the bar magnets own the rest. */
    var range = drawnRange(ob, p);
    ctx.fillStyle = P.ink;
    walkStroke(ob, range[0], range[1], 1, function (px, py) {
      ctx.fillRect(px - 1, py - 1, 3, 3);
    });

    /* The shine on ink that has not dried yet: the centre pixel goes pale
       wherever that pixel was laid down inside the last 36px of scroll.
       It is a SECOND pass and not a branch inside the first, because the
       brush is 3x3 at 1px steps - every stamp paints over the pixel
       before it, so a wet pixel written inline would be buried by the
       next stroke of the same line.

       Which pixels those are is solved rather than tested. A pixel at
       distance d went down at nib-progress `laid`, so it is wet while
       DRAW_FROM - laid*span - ob.x < 36; turning that round gives a
       threshold in `laid` and therefore a range in d, and the pass only
       walks the band instead of the whole stroke. */
    var wk = (DRAW_FROM - ob.x - 36) / ob.span;
    var wetA = range[0], wetB = range[1];
    if (ob.back) wetB = Math.min(wetB, ob.len * (1 - wk));
    else wetA = Math.max(wetA, ob.len * wk);
    if (wetB > wetA) {
      ctx.fillStyle = P.inkWet;
      walkStroke(ob, wetA, wetB, 1, function (px, py) {
        ctx.fillRect(px, py, 1, 1);
      });
    }

    /* 3. the marker. While it is drawing it sits on the live end, nib
       first; once the stroke is done it darts back the way it came,
       along the line it drew, and is gone. It is never boxed: a marker
       you can see coming is a warning, and a warning that kills you is
       not a warning. The barrel reaches up into clear air past the
       lethal tip, so flying into the marker and not the ink is a gift,
       and gifts in that direction are what this game gives. */
    var tip = strokeTip(ob, p);
    if (p < 1) { drawMarkerSprite(ctx, ob, tip[0], tip[1]); return; }
    var doneAt = DRAW_FROM - ob.span;
    var e = (doneAt - ob.x) / EXIT_SPAN;
    if (e < 0 || e > 1) return;
    drawMarkerSprite(ctx, ob, tip[0] + 200 * e, tip[1]);
  }

  /* ================================================== falling things

     Four kinds, one type string, and the drawing dispatches on the FLAGS
     and never on anything the maker stored: the engine sets ob.sour (and
     may set ob.gold) AFTER makeDrop returns, so a module that remembered
     a kind would paint a magnet with a lime's hitbox. Four answers rather
     than the Canopy's three, because this is the one bay whose LID sheds
     the heat and the sour both (the Fort's come out of guns, and it
     draws its own). */
  function kindOf(ob) {
    if (ob.gold) return 'apple';
    if (ob.spicy) return 'pepper';
    if (ob.sour) return 'lime';
    return 'magnet';
  }

  function magFrame(ob) {
    return Math.floor(wrap(ob.spin, TAU) / TAU * MAG_FRAMES) % MAG_FRAMES;
  }

  function drawDrop(ctx, ob) {
    var kind = kindOf(ob);
    /* NO SWAY, on any of the four. A magnet is a dense little puck and it
       falls straight; the three gifts are WET INK and ink runs straight
       down a vertical board. Every other level in the game rocks its
       drops a pixel either way to say they are tumbling through air -
       nothing here is in the air at all, which is the point. */
    var x = Math.round(ob.x), y = Math.round(ob.y);
    var i, k;

    if (kind === 'magnet') {
      var f = magFrame(ob);
      var fh = MAG_H[f];
      /* The shadow it throws on the board, two pixels down and right,
         the same size as the magnet is this frame. It is the one thing
         that says this magnet is in FRONT of the board rather than stuck
         to it - the ones baked into the tile get a 1px edge shade and
         this one gets a hard offset block, and that difference is the
         whole of how the player tells them apart. */
      /* Strength 7, which is the Construction Zone's pillar shadow and
         not the usual 5: a silver magnet face-on is #c6cacd against a
         board at #e3e6e2, the lowest-contrast hazard in the game, and
         what carries it is not the disc, it is the hard dark block
         under the disc. Half the tumble it is near-black ferrite and
         needs no help at all; the shadow is for the other half. */
      var sy = y - ((fh / 2) | 0) + 2;
      if (sy < CEIL) { Tint.rect(ctx, x - 3, CEIL, 11, fh - (CEIL - sy), P.shade, 7); }
      else Tint.rect(ctx, x - 3, sy, 11, fh, P.shade, 7);
      LivingRoom.blitBelowCeil(ctx, T.magnet[ob.face][f].canvas, x - 5, y - 5);
      return;
    }

    var pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);

    if (kind === 'pepper') {
      LivingRoom.glow(ctx, x, y, Math.round(14 + pulse * 5),
                      'rgba(255,207,138,' + (0.46 * pulse).toFixed(3) + ')',
                      'rgba(232,69,42,' + (0.22 * pulse).toFixed(3) + ')',
                      'rgba(138,29,16,0)');
      /* the smear of ink above it. Three dashes, each fainter than the
         last, in the drawing's OWN pigment - this is not a spark coming
         off a hot thing, it is the trail a wet stroke leaves running
         down a board, and it is the same shape in all three gifts. */
      var ga = ctx.globalAlpha;
      for (i = 0; i < 3; i++) {
        ctx.globalAlpha = ga * (0.7 - i * 0.2);
        ctx.fillStyle = P.pepRed;
        var py = y - 8 - i * 3;
        if (py >= CEIL) ctx.fillRect(x - 1, py, 2, 1);
      }
      ctx.globalAlpha = ga;
      LivingRoom.blitBelowCeil(ctx, T.pepper.canvas, x - 5, y - 7);
      return;
    }

    if (kind === 'lime') {
      /* the Canopy's lime glow exactly, because a lime is a lime: the
         player learned this colour in the Backyard and must not have to
         learn it again */
      LivingRoom.glow(ctx, x, y, Math.round(14 + pulse * 5),
                      'rgba(240,255,200,' + (0.46 * pulse).toFixed(3) + ')',
                      'rgba(123,232,58,' + (0.22 * pulse).toFixed(3) + ')',
                      'rgba(61,154,28,0)');
      var la = ctx.globalAlpha;
      for (i = 0; i < 3; i++) {
        ctx.globalAlpha = la * (0.7 - i * 0.2);
        ctx.fillStyle = P.limeMid;
        var ly = y - 9 - i * 3;
        if (ly >= CEIL) ctx.fillRect(x - 1, ly, 2, 1);
      }
      ctx.globalAlpha = la;
      LivingRoom.blitBelowCeil(ctx, T.lime.canvas, x - 6, y - 6);
      return;
    }

    /* the golden apple. It falls at twice the speed of anything else on
       the board - a drawing in wet ink that RUNS - so it gets the Deck's
       comet trail: the player has to read where it is GOING, not where
       it is. */
    LivingRoom.glow(ctx, x, y, Math.round(12 + pulse * 4),
                    'rgba(255,246,212,' + (0.40 * pulse).toFixed(3) + ')',
                    'rgba(224,176,74,' + (0.18 * pulse).toFixed(3) + ')',
                    'rgba(184,134,42,0)');
    var aa = ctx.globalAlpha;
    for (i = 0; i < 4; i++) {
      ctx.globalAlpha = aa * (i > 1 ? 0.5 : 1);
      k = wrap(ob.spin * 0.9 + i * 0.37, 1);
      var ty = y - 8 - i * 4 - Math.round(k * 3);
      if (ty < CEIL) continue;
      ctx.fillStyle = i % 2 ? P.goldShine : P.goldHi;
      ctx.fillRect(x - 1, ty, 2, 1);
    }
    ctx.globalAlpha = aa;
    LivingRoom.blitBelowCeil(ctx, T.apple.canvas, x - 6, y - 7);
  }

  /* The spot on the tray lip the thing is heading for: it tightens and
     darkens as it falls, so the landing is never a surprise. On a white
     board it has to be DARK to read, which is the reverse of the Coop's
     pale one and the same reversal as the particles. */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var kind = kindOf(ob);
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var w = Math.round(13 - k * 6);
    var col = kind === 'apple' ? P.goldMid
            : (kind === 'pepper' ? P.pepRed : (kind === 'lime' ? P.limeMid : P.shade));
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3, col, 6 + k * 9);
  }

  function drawDropSplat(ctx, ob) {
    var kind = kindOf(ob);
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x);
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);

    if (kind === 'magnet') {
      /* It landed flat in the channel and stuck to nothing, which is the
         joke, and it STAYS there - the tray is aluminium and a magnet is
         a magnet. An 11x3 pill lying in the tray with the lip's own
         highlight on top of it. */
      ctx.fillStyle = P.magSilverDk; ctx.fillRect(x - 5, FLOOR + 1, 11, 3);
      ctx.fillStyle = MAG_FACE[ob.face][0]; ctx.fillRect(x - 5, FLOOR + 2, 11, 2);
      ctx.fillStyle = MAG_FACE[ob.face][1]; ctx.fillRect(x - 4, FLOOR + 2, 4, 1);
      ctx.fillStyle = P.outline; ctx.fillRect(x - 5, FLOOR + 1, 1, 3); ctx.fillRect(x + 5, FLOOR + 1, 1, 3);
    } else if (kind === 'apple') {
      /* a missed +5 keeps glowing for a moment. It is mourned, the way
         the Deck mourns its golden apple, and then it is just a smear. */
      if (k > 0.4) {
        var g = ctx.createRadialGradient(x, FLOOR + 1, 1, x, FLOOR + 1, 10);
        g.addColorStop(0, 'rgba(255,246,212,' + (0.24 * ((k - 0.4) / 0.6)).toFixed(3) + ')');
        g.addColorStop(1, 'rgba(184,134,42,0)');
        ctx.fillStyle = g;
        ctx.fillRect(x - 10, FLOOR - 9, 20, 20);
      }
      ctx.fillStyle = P.goldDark; ctx.fillRect(x - 6, FLOOR + 2, 12, 2);
      ctx.fillStyle = P.goldMid;  ctx.fillRect(x - 4, FLOOR + 1, 8, 2);
      ctx.fillStyle = P.goldShine; ctx.fillRect(x - 1, FLOOR + 1, 2, 1);
    } else {
      var pool = kind === 'pepper' ? P.pepRed : P.limeMid;
      var hi = kind === 'pepper' ? P.pepGlow : P.limeHi;
      ctx.fillStyle = pool; ctx.fillRect(x - 5, FLOOR + 1, 11, 2);
      ctx.fillStyle = hi;   ctx.fillRect(x - 2, FLOOR + 1, 5, 1);
      ctx.fillStyle = pool; ctx.fillRect(x - 7, FLOOR + 2, 2, 1); ctx.fillRect(x + 6, FLOOR + 2, 2, 1);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------- the succulent */

  /* Where a drawn succulent hangs. The engine defaults a boon to
     FLOOR - 12; half of the ones here are sketched high on the board
     instead, which is a thing only this bay can do, because a drawing is
     not standing on anything.

     CEIL + 22 and not a pixel higher. The room's rule is that a
     ceiling-hung boon's box top sits at least 8px under the kill line,
     so that reaching one is never the same gesture as ending the run:
     the box here is 20 tall centred on the sketch, so its top is
     CEIL + 12, and a doodad that takes it is sitting at CEIL + 22 with
     its own hitbox top at CEIL + 11. That is one whole flap of daylight
     between the prize and the thing that kills you. It is the climb this
     room makes EXPENSIVE, which is not the same as a trap. */
  function boonY(ob) { return ob.y === undefined ? FLOOR - 12 : ob.y; }

  function drawBoon(ctx, ob) {
    /* a funnel is a boon with somewhere else in it: no plant, no pot, no
       sparkle, and it stays on the board after it is taken (see makeWarp) */
    if (ob.warp) { drawFunnel(ctx, ob); return; }
    if (ob.taken) return;
    var high = ob.y !== undefined && ob.y < 120;
    var ax = Math.round(ob.x), ay = Math.round(boonY(ob));
    var rx = Math.round(ob.x + ob.dx), ry = Math.round(boonY(ob) + ob.dy);
    var lifted = ob.dy < -1 || ob.dx > 1 || ob.dx < -1;
    var i;

    /* the pot stays drawn where somebody drew it, whatever Gerald does
       with the plant - and the high one is drawn upside down under the
       rail, as if somebody reached up and sketched it there */
    ctx.drawImage((high ? T.sucPotUp : T.sucPot).canvas, ax - 10, ay - 10);
    var rose = (high ? T.sucRosetteUp : T.sucRosette).canvas;

    /* the jade glow, travelling with the ROSETTE. Nothing else on this
       board is this green, which is the whole point of it. */
    LivingRoom.glow(ctx, rx, ry, 18,
                    'rgba(147,216,189,0.32)', 'rgba(95,174,154,0.14)', 'rgba(47,107,98,0)');

    /* three drips of ink shaking off it once it is out of the drawn pot -
       the Deck's soil, in the only material this level has */
    if (lifted) {
      for (i = 0; i < 3; i++) {
        var kk = wrap(ob.phase * 0.5 + i * 0.33, 1);
        ctx.fillStyle = P.sucDark;
        ctx.fillRect(rx - 2 + i * 2, ry + 4 + Math.round(kk * 6), 1, 1);
      }
    }
    ctx.drawImage(rose, rx - 10, ry - 10);

    /* four sparkle dashes going round it. They come off the obstacle's
       own phase plus a clock the LEVEL keeps in pixels of scroll, so
       they stop dead when the run does, like everything else in here. */
    for (i = 0; i < 4; i++) {
      var s = wrap(clock * 0.012 + ob.phase + i * 0.25, 1);
      ctx.fillStyle = P.sucHi;
      ctx.fillRect(rx - 9 + Math.round(s * 18), ry - 12 + (i % 2) * 20, 1, 1);
    }
  }

  /* -------------------------------------------------------- the funnel

     The glow goes down FIRST and under everything, because a gift glows
     in this bay and because this one has to be readable from the
     right-hand edge: it enters at x 578 to 824 and the player gets two
     and a half to six seconds of green on a white wall to decide
     whether to come down off a gap for it. Then the tile, then the
     swirl inside the bowl, then the dust - the dust last because half
     of its travel is ABOVE the tile's top row.

     The swirl's frame and the dust's climb both come off `clock`, the
     level's own clock in PIXELS OF SCROLL, for the reason the
     succulent's sparkle does: a paused board is a still board, and a
     turning hole behind the pause scrim is a hole somebody can line
     themselves up on at their leisure. The one exception is the gulp -
     once it has been landed in, the swirl spins up to three times the
     speed and keeps turning while the pull takes the player down. */
  function drawFunnel(ctx, ob) {
    var x = Math.round(ob.x), k, s;

    LivingRoom.glow(ctx, x, FLOOR - 18, 24, 'rgba(143,192,164,0.28)',
                    'rgba(69,118,94,0.12)', 'rgba(69,118,94,0)');
    ctx.drawImage(T.funnel.canvas, x - 20, FLOOR - FUNNEL_H);
    ctx.drawImage(T.swirl[Math.floor(wrap(clock * (ob.gulp > 0 ? 0.09 : 0.03)
                                          + ob.phase * 4, SWIRL_FRAMES))].canvas,
                  x - 20 + SWIRL_DX, FLOOR - FUNNEL_H + SWIRL_DY);

    /* three specks going up out of the bowl on a sine, which is the only
       thing in the bay leaving the board's plane - and 1px, so it is
       dust and not a fourth ring of the swirl */
    ctx.fillStyle = P.funnelDust;
    for (k = 0; k < 3; k++) {
      s = wrap(clock * 0.02 + ob.phase + k * 0.33, 1);
      ctx.fillRect(x - 2 + k * 2 + Math.round(Math.sin(s * TAU) * 2),
                   FLOOR - 30 - Math.round(s * 14), 1, 1);
    }
  }

  /* ------------------------------------------------ ground dressing

     What is lying in the tray. Markers on their sides, a cap somebody
     lost, and a block of eraser felt that has plainly never been used -
     which is the quietest joke on the level and the one that explains
     every ghost mark on the board behind it. */
  var MARKER_COLS = [P.barRed, P.barGreen, P.barBlue, P.barYellow, P.inkPurple, P.markerLabel];

  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), i;
    if (ob.kind === 0) {
      ctx.fillStyle = MARKER_COLS[ob.colour]; ctx.fillRect(x, FLOOR + 1, 14, 3);
      ctx.fillStyle = P.markerLabel;          ctx.fillRect(x + 4, FLOOR + 2, 4, 1);
      ctx.fillStyle = P.capBlack;             ctx.fillRect(x + 11, FLOOR + 1, 3, 3);
      ctx.fillStyle = P.trayDeep;             ctx.fillRect(x, FLOOR + 4, 14, 1);
    } else if (ob.kind === 1) {
      ctx.fillStyle = P.capBlack; ctx.fillRect(x, FLOOR + 2, 3, 3);
      ctx.fillStyle = P.capHi;    ctx.fillRect(x, FLOOR + 2, 3, 1);
    } else {
      ctx.fillStyle = P.groove;  ctx.fillRect(x, FLOOR + 2, 10, 3);
      ctx.fillStyle = P.alumMid; ctx.fillRect(x, FLOOR + 1, 10, 1);
      ctx.fillStyle = P.trayDeep; ctx.fillRect(x, FLOOR + 5, 10, 1);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawStroke(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ================================================== the cover art

     118x114 on the big card, 82x94 on the side ones. Among five dark
     Backyard covers and three dim Living Room ones this card is WHITE,
     which makes it unmistakable at a glance - and everything on it is
     something the level actually does: the board with its doodles, the
     rail, the tray, two aluminium posts with black caps, a magnet
     tumbling, and a black zigzag being drawn by a marker that leaves
     once it is finished. The caller has already clipped to the box, so
     nothing here saves or restores. */
  function drawPreview(ctx, x, y, w, h, t, big) {
    var s = t * 22;
    var railY = y + Math.round(h * 0.09);
    var trayY = y + h - Math.round(h * 0.15);
    var i, k;

    /* 1. the board, and the glare up in its top right */
    ctx.fillStyle = P.board; ctx.fillRect(x, y, w, h);
    Tint.rect(ctx, x + Math.round(w * 0.42), railY, Math.round(w * 0.58), Math.round(h * 0.52), P.boardGlare, 5);
    Tint.rect(ctx, x + Math.round(w * 0.54), railY, Math.round(w * 0.46), Math.round(h * 0.38), P.boardGlare, 6);
    Tint.rect(ctx, x + Math.round(w * 0.64), railY + 2, Math.round(w * 0.30), Math.round(h * 0.24), P.boardGlare, 7);
    Tint.rect(ctx, x, trayY - Math.round(h * 0.4), Math.round(w * 0.32), Math.round(h * 0.4), P.boardShade, 4);

    /* 2. SEVEN of the board's own doodles, placed by hand so the card is
       the same card every time it is drawn. They are drawn here rather
       than scaled down off the real tiles because at 118px a 46px
       parabola is most of the card: these are the same marks, smaller -
       and that has to include the two things the tiles changed. The card
       carries the same two BRUSHES, the same saturated inks, and the two
       marks the bay is most recognisable for that it was missing, the
       pointy S and the purple web. drawPreview must look like the level
       actually looks, and a pale five-doodle card over a bay carrying
       fourteen is a card that lies about what you are buying. */
    var dx0 = x + Math.round(w * 0.08), dy0 = y + Math.round(h * 0.22);
    /* the parabola, fat, the way it is on the board */
    ctx.fillStyle = P.inkBlue;
    ctx.fillRect(dx0 + 9, dy0, 2, 20); ctx.fillRect(dx0, dy0 + 14, 20, 2);
    for (i = 0; i < 18; i++) {
      var u = (i - 9) / 9;
      ctx.fillRect(dx0 + 1 + i, dy0 + 16 - Math.round(u * u * 13), 2, 2);
    }
    /* the face */
    var fx = x + Math.round(w * 0.58), fy = y + Math.round(h * 0.26);
    pcircle2(ctx, fx, fy, 7, P.inkSky);
    ctx.fillStyle = P.inkSky;
    ctx.fillRect(fx - 3, fy - 3, 2, 3); ctx.fillRect(fx + 2, fy - 3, 2, 3);
    ctx.fillRect(fx - 4, fy + 3, 8, 2);
    /* the pointy S, up between the parabola and the face, where the one
       in ref 1 sits relative to everything else */
    var ex0 = x + Math.round(w * 0.40), ey0 = y + Math.round(h * 0.13);
    var ess = [[0, 4], [4, 0], [8, 3], [4, 7], [0, 9], [4, 13], [8, 11]];
    for (i = 1; i < ess.length; i++) {
      pline2(ctx, ex0 + ess[i - 1][0], ey0 + ess[i - 1][1],
             ex0 + ess[i][0], ey0 + ess[i][1], P.inkSky);
    }
    /* the star */
    var sx0 = x + Math.round(w * 0.30), sy0 = y + Math.round(h * 0.62);
    for (i = 0; i < 5; i++) {
      var a0 = -Math.PI / 2 + i * TAU / 5, a1 = -Math.PI / 2 + ((i + 2) % 5) * TAU / 5;
      pline(ctx, sx0 + Math.cos(a0) * 6, sy0 + Math.sin(a0) * 6,
            sx0 + Math.cos(a1) * 6, sy0 + Math.sin(a1) * 6, P.inkTan);
    }
    /* the tally marks */
    var tx0 = x + Math.round(w * 0.74), ty0 = y + Math.round(h * 0.60);
    ctx.fillStyle = P.inkYellow;
    for (i = 0; i < 4; i++) ctx.fillRect(tx0 + i * 3, ty0, 1, 8);
    pline(ctx, tx0 - 1, ty0 + 8, tx0 + 10, ty0, P.inkYellow);
    /* and the purple web, down in the bottom left corner the glare never
       reaches. Seven points and three chords, which is as much web as
       survives being drawn at a seven pixel radius. */
    var wx0 = x + Math.round(w * 0.14), wy0 = y + Math.round(h * 0.74);
    var wpt = [];
    for (i = 0; i < 7; i++) {
      var wa = i * TAU / 7 + 0.4;
      wpt.push([wx0 + Math.round(Math.cos(wa) * 7), wy0 + Math.round(Math.sin(wa) * 7)]);
    }
    for (i = 0; i < 7; i++) {
      pline2(ctx, wpt[i][0], wpt[i][1], wpt[(i + 1) % 7][0], wpt[(i + 1) % 7][1], P.inkPurple);
    }
    for (i = 0; i < 3; i++) {
      pline2(ctx, wpt[i][0], wpt[i][1], wpt[i + 3][0], wpt[i + 3][1], P.inkPurple);
    }
    /* and one bar magnet, placed by hash so it moves between cards and
       never between frames */
    var mgx = x + 6 + (hash(big ? 3 : 7) % Math.max(1, w - 26));
    var mgy = y + 10 + (hash(big ? 11 : 19) % Math.max(1, h - 40));
    ctx.fillStyle = P.barRed;  ctx.fillRect(mgx, mgy, 10, 3);
    ctx.fillStyle = P.barHi;   ctx.fillRect(mgx, mgy, 9, 1);
    ctx.fillStyle = P.shade;   ctx.fillRect(mgx + 1, mgy + 3, 10, 1);

    /* 3. the dim room behind the board, and the frame's top rail under
       it - the level's own band, see bakeTop, with the hanger bracket
       in the middle */
    ctx.fillStyle = P.beyond;     ctx.fillRect(x, y, w, railY - y - 3);
    ctx.fillStyle = P.alumLit;    ctx.fillRect(x, railY - 3, w, 1);
    ctx.fillStyle = P.alumMid;    ctx.fillRect(x, railY - 2, w, 2);
    ctx.fillStyle = P.alumDark;   ctx.fillRect(x + Math.round(w / 2) - 3, railY - 2, 6, 2);
    ctx.fillStyle = P.outline;    ctx.fillRect(x, railY, w, 1);
    Tint.rect(ctx, x, railY + 1, w, 4, P.shade, 5);

    /* 4. two posts with their black caps, sliding past with a gap */
    var period = big ? 46 : 38;
    var span = trayY - railY;
    for (k = 0; k < 3; k++) {
      var ox = Math.round(x + w + 10 - wrap(s + k * period, period * 3));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.36);
      /* the three gaps spread over the WHOLE of the room left for them,
         not two thirds of it: the Deck learned on its own card that
         k/3 puts all three mouths in the same band on the small one */
      var room = Math.max(1, span - gapH - 20);
      var gapY = Math.round(railY + 10 + (k * room) / 2);
      pvPost(ctx, ox, railY + 1, gapY - railY - 1);
      pvPost(ctx, ox, gapY + gapH, trayY - gapY - gapH);
      /* the end flicks: ink overshooting the bar by two pixels each side,
         with the wet row on the face that looks into the gap */
      ctx.fillStyle = P.ink;    ctx.fillRect(ox - 2, gapY - 3, 13, 3);
      ctx.fillStyle = P.inkWet; ctx.fillRect(ox - 1, gapY - 1, 11, 1);
      ctx.fillStyle = P.ink;    ctx.fillRect(ox - 2, gapY + gapH, 13, 3);
      ctx.fillStyle = P.inkWet; ctx.fillRect(ox - 1, gapY + gapH, 11, 1);
    }

    /* 5. a black zigzag being drawn off the tray, with the marker on the
       end of it while it draws and gone the moment it is finished -
       which is the one thing about this level a still picture cannot say
       and a three-second loop can */
    var q = clamp((t % 3) / 2, 0, 1);
    var zx = x + Math.round(w * 0.46), zh = Math.round(span * 0.30);
    var pts = [[0, 0], [7, -zh * 0.34], [-5, -zh * 0.62], [6, -zh]];
    var px = zx, py = trayY, total = 0, segLen = [];
    for (i = 0; i < pts.length; i++) {
      var nx = zx + pts[i][0], ny = trayY + Math.round(pts[i][1]);
      var L = Math.sqrt((nx - px) * (nx - px) + (ny - py) * (ny - py));
      segLen.push(L); total += L; px = nx; py = ny;
    }
    var want = total * q, got = 0, tipx = zx, tipy = trayY;
    px = zx; py = trayY;
    ctx.fillStyle = P.ink;
    for (i = 0; i < pts.length; i++) {
      var ex = zx + pts[i][0], ey = trayY + Math.round(pts[i][1]);
      var f = clamp((want - got) / Math.max(0.001, segLen[i]), 0, 1);
      var hx = px + (ex - px) * f, hy = py + (ey - py) * f;
      if (f > 0) {
        for (k = 0; k <= Math.round(Math.max(Math.abs(hx - px), Math.abs(hy - py))); k++) {
          var kk = k / Math.max(1, Math.round(Math.max(Math.abs(hx - px), Math.abs(hy - py))));
          ctx.fillRect(Math.round(px + (hx - px) * kk) - 1, Math.round(py + (hy - py) * kk) - 1, 3, 3);
        }
      }
      tipx = hx; tipy = hy;
      got += segLen[i]; px = ex; py = ey;
      if (got >= want) break;
    }
    if (q < 1) {
      /* the marker, as four stepped pixels: a 24px sprite on a 118px card
         is a plank, and what has to read is "something is holding the end
         of that line" */
      for (i = 0; i < 7; i++) {
        ctx.fillStyle = i < 2 ? P.felt : (i < 4 ? P.markerLabel : P.markerBody);
        ctx.fillRect(Math.round(tipx) + i, Math.round(tipy) - i, 2, 2);
      }
    }

    /* 6. a magnet tumbling down the right third, its height cycling the
       way the real twelve frames do */
    var mx = x + Math.round(w * 0.82);
    var my = railY + 2 + wrap(s * 1.4, trayY - railY - 6);
    var mh = [7, 5, 2, 5][Math.floor(t * 9) % 4];
    ctx.fillStyle = P.shade;      ctx.fillRect(mx + 2, Math.round(my) + 2, 7, mh);
    ctx.fillStyle = P.magSilver;  ctx.fillRect(mx, Math.round(my), 7, mh);
    ctx.fillStyle = P.outline;    ctx.fillRect(mx, Math.round(my), 1, mh); ctx.fillRect(mx + 6, Math.round(my), 1, mh);
    ctx.fillStyle = P.magSilverHi; ctx.fillRect(mx + 1, Math.round(my), 3, 1);

    /* 7. the tray, and three rows of the room's oak under it with the
       grain crawling past */
    ctx.fillStyle = P.alumLit;     ctx.fillRect(x, trayY, w, 1);
    ctx.fillStyle = P.trayDeep;    ctx.fillRect(x, trayY + 1, w, 1);
    ctx.fillStyle = P.trayChannel; ctx.fillRect(x, trayY + 2, w, 2);
    ctx.fillStyle = P.groove;      ctx.fillRect(x, trayY + 4, w, 1);
    ctx.fillStyle = R.oakMid;      ctx.fillRect(x, trayY + 5, w, y + h - trayY - 5);
    ctx.fillStyle = R.oakLip;      ctx.fillRect(x, trayY + 5, w, 1);
    for (i = 0; i < w / 5; i++) {
      ctx.fillStyle = i % 3 ? R.oakGrain : R.oakLight;
      ctx.fillRect(x + wrap(i * 13 - s, w), trayY + 7 + (i % 3), 3, 1);
    }
    Tint.rect(ctx, x, trayY + 5, w, y + h - trayY - 5, R.oakShade, 5);

    /* 8. the doodad flying it, with a DARK halo. The Canopy's trick for a
       bright field, laid tight to the sprite rather than as a loose
       square: over a flat white board a big soft square reads as a
       rectangle somebody left on the card. One pixel proud of the
       outline all round is all it takes. */
    var bx = Math.round(x + w * 0.3);
    var by = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.16));
    var sz = big ? 8 : 6;
    Tint.rect(ctx, bx - sz / 2 - 2, by - sz / 2 - 2, sz + 4, sz + 4, P.void, 6);
    ctx.fillStyle = P.outline;  ctx.fillRect(bx - sz / 2 - 1, by - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';  ctx.fillRect(bx - sz / 2, by - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';  ctx.fillRect(bx - sz / 2, by - sz / 2, sz - 2, 1);
    ctx.fillStyle = P.outline;  ctx.fillRect(bx + sz / 2 - 2, by - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';  ctx.fillRect(bx + sz / 2, by, 2, 1);

    /* 9. and the pendant's warmth over the lot of it */
    Tint.rect(ctx, x, y, w, h, R.lampGlow, 1);
  }

  /* One bar of black marker inside a cover. Nine pixels of solid ink with
     one wet streak down it and no shadow beside it - the level's own
     rule at card scale. It was an aluminium extrusion whose dark pixels
     had to be COUNTED to stop it reading as a black pipe at three times
     across a 118px card; a bar that is meant to be black has no such
     problem, and the card now says what the level says in one glance:
     the black things are the ones that end the run. */
  function pvPost(ctx, x, y, h) {
    if (h <= 0) return;
    ctx.fillStyle = P.ink;    ctx.fillRect(x, y, 9, h);
    ctx.fillStyle = P.inkWet;
    for (var i = 0; i < h; i += 7) ctx.fillRect(x + 2 + ((i >> 2) % 4), y + i, 1, 4);
  }

  /* ====================================================== generation */

  function makePillar(x, gapY, gapH, run) {
    /* the two bars differ only in which way their hand edge wobbles and
       where their dry streaks start, which is the whole of the variety a
       filled-in black rectangle has or needs. At 0.35 the player sees a
       run of the same one often enough to stop noticing there are two,
       which is the correct amount of noticing. */
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.35) ? 1 : 0, scored: false };
  }

  /* A MARKER LINE.

     `count` is how many segments the zigzag has - the engine hands over
     3 to 6 and here that buys CROSSINGS rather than separate hazards,
     because one stroke is already 14 to 24px wide and six of them would
     wall the board off. `maxLen` is the stroke's REACH: how far off the
     rail or the tray it gets, 16 to 28 from the tune.

     The zigzag is laid out symmetrically about the anchor on purpose. A
     stroke that wandered would need its extent measured after the fact
     to get `w` right, and `w` is load bearing: collide() culls on ob.x
     and ob.x + ob.w, so a box outside that span is a box that is never
     tested and never cleared by a save. Swinging a fixed `half` either
     side means the furthest any pixel of the stroke - or of its 3px
     brush - can get is known before a single segment is built. */
  function makeSpikes(x, side, count, maxLen, run) {
    var segs = [], i;
    var half = randInt(7, 12);                 /* 14 to 24px of stroke */
    var rise = maxLen / count;
    for (i = 1; i <= count; i++) {
      var dx = (i % 2) ? half : -half;
      var dy = (side === 'ceil' ? 1 : -1) * rise * i;
      segs.push([dx, dy]);
    }
    /* its total length, measured once here so that nothing which walks
       the stroke has to measure it again */
    var len = 0, px = 0, py = 0;
    for (i = 0; i < segs.length; i++) {
      var ex = segs[i][0], ey = segs[i][1];
      len += Math.sqrt((ex - px) * (ex - px) + (ey - py) * (ey - py));
      px = ex; py = ey;
    }

    /* THE LATE PHASE. Past tune.lateScore roughly half of them come in
       backward: the marker dives to the deep end and draws toward the
       rail, over LATE_SPAN instead of DRAW_SPAN. See the constants at
       the top for why that is worse rather than merely different. No
       maker may make a hazard more lethal than the ones before it
       without a warning; run.late is the licence and WARN.late is the
       warning, and this is the only thing in the bay that uses either. */
    var back = !!(run && run.late) && chance(LATE_CHANCE);

    return { type: 'spike', x: x, side: side,
             /* the anchor sits in the middle of the span, and the span is
                the swing plus one pixel of brush plus one of slack each
                side, so every box rectsFor can produce is inside
                [x, x + w] by construction */
             anchor: half + 3, w: half * 2 + 6,
             segs: segs, len: len, back: back,
             span: back ? LATE_SPAN : DRAW_SPAN };
  }

  /* Something off the rail. FOUR kinds, one type string: the magnet, and
     the three drawn power-ups. The engine passes `spicy` in because the
     art has to SIZE the drop by it, and may set ob.sour or ob.gold after
     this returns - which is exactly why kindOf() asks the flags and
     nothing here stores a kind. */
  function makeDrop(x, spicy, fall, run) {
    var gold = false;
    if (!spicy) {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var ob = { type: 'drop', x: x, y: CEIL + 5, w: spicy ? 9 : 11,
               vy: fall, spicy: !!spicy, gold: gold, broken: 0,
               spin: rand(0, TAU),
               /* 5 to 9 radians a second, which at twelve frames is three
                  to five flashes of silver-and-black on the way down -
                  fast enough to read as tumbling, slow enough that the
                  hitbox's width is something the eye can follow */
               spinRate: rand(5, 9) * (chance(0.5) ? -1 : 1),
               /* which face is plated. Silver is what is on the board in
                  all four photographs; the blue and the black are the
                  other two in the tin, and keeping them rare means the
                  player reads SILVER as "magnet" and is never surprised
                  by a dark one against the ink. */
               face: chance(0.6) ? 0 : (chance(0.625) ? 1 : 2) };
    if (gold) {
      /* wet ink that RUNS: about a second and a half to the tray against
         a magnet's two and three quarters, so catching one is a decision
         and not a formality. No ob.name - the shout says GOLD +5, and it
         IS a golden apple, so there is nothing for a name to add. */
      ob.vy = fall * 2 + 60;
      ob.w = 13;
    }
    return ob;
  }

  /* what has been knocked into the tray. No boxes: everything down there
     is below the line that already kills you. */
  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 16, kind: randInt(0, 2), colour: randInt(0, 5) };
  }

  /* Half of them are sketched high on the board - see boonY for why
     CEIL + 22 is the highest anything in this room may hang. No `burst`:
     a drawn succulent still comes apart into the jade the HUD uses, and
     the default is that jade. */
  function makeBoon(x, run) {
    return { type: 'boon', x: x, y: chance(0.5) ? CEIL + 22 : FLOOR - 17,
             w: 20, taken: false, phase: rand(0, TAU), dx: 0, dy: 0,
             name: BOON_NAME };
  }

  /* ----------------------------------------------------------- the warp

     THE ONLY OBSTACLE THIS FILE MAKES THAT IS NOT MADE OF THIS LEVEL,
     and it is a 'boon' and nothing else. A boon is already drawn in
     drawBg's third pass in front of the tray, already carried through
     save(), already culled on x + w and already reached in collide()
     through rectsFor - four things the engine does for free and none of
     which had to be taught a new type string. The word Chalkboard
     appears in ONE place in the whole engine, this object's `warp`
     field, and PlayScene only ever asks it for `warp.home` and hands
     the rest of it to the art slot.

     Being a 'boon' is also why isPowerUp has to be taught to say no:
     Gerald's watch reels in the nearest power-up, and a hole in the
     world is not a thing anybody should be able to drag across the
     screen by the rim.

     `w: 40` is the TILE's width, not the box's - the box is the bowl
     and it is 24 wide, see rectsFor - because w is what the cull
     measures, and a funnel is not gone until the last blue pixel of it
     has left the screen.

     `y: FLOOR - 17` is the ordinary tray-standing boon's y, so anything
     in the engine that reads a boon's y for a caption or a particle
     finds the number it expects there. drawFunnel does not read it at
     all: the tile is pinned to FLOOR.

     `Chalkboard` is resolved when this function RUNS, not when the file
     loads, so the only load-order debt in this file is build()'s call
     to Chalkboard.build(). */
  function makeWarp(x, run) {
    return { type: 'boon', warp: Chalkboard, x: x, y: FLOOR - 17, w: 40,
             dx: 0, dy: 0, taken: false, phase: rand(0, TAU), gulp: 0 };
  }

  /* ---------------------------------------------- collision rectangles

     Every lethal pixel has a box and nothing harmless has one: the
     board's own drawings, the stuck magnets, the rail's screws, the
     tray, the litter in it and the marker on the end of a stroke are all
     safe to touch. */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);

    } else if (ob.type === 'spike') {
      /* THE BOX IS THE BRUSH. The same polyline, the same drawn range,
         3px steps against the drawing's 1px ones - and a 3px box stepped
         3px tiles exactly along the dominant axis of a stroke this
         shallow, so there is no hole in it anywhere. Nothing is
         approximated and nothing is a rectangle somebody guessed. */
      var p = strokeP(ob);
      if (p <= 0) return out;
      var range = drawnRange(ob, p);
      walkStroke(ob, range[0], range[1], 3, function (px, py) {
        /* clipped to the playfield, which only ever matters for the one
           box sitting on the anchor: the brush meets the rail and the
           tray exactly, so its outer row lands on CEIL-1 or FLOOR+1. In
           the air that row is the Deck's buried pixel - drawFloor paints
           the tray lip over it afterwards, which is correct, because a
           stroke drawn down to the tray does disappear behind it - but a
           BOX there would be a lethal rectangle outside the room, and
           every box in this game lives between the two lines. */
        var y0 = Math.max(CEIL, py - 1), y1 = Math.min(FLOOR, py + 2);
        if (y1 > y0) out.push([px - 1, y0, 3, y1 - y0]);
      });

    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      var kind = kindOf(ob);
      if (kind === 'magnet') {
        /* The box follows the TUMBLE. An edge-on magnet is a 9x1 sliver
           and a face-on one is a 9x9 block, because that is what is on
           the screen - a magnet collided as a square the whole way down
           would kill the player with a frame of empty air twice a
           second, and they would never know why. */
        var fh = Math.max(2, MAG_H[magFrame(ob)]);
        out.push([ob.x - 4, ob.y - (fh / 2 - 1), 9, fh - 2]);
      } else if (kind === 'pepper') {
        out.push([ob.x - 5, ob.y - 6, 10, 12]);
      } else {
        /* the lime and the apple: generous, because catching them is
           meant to be easy and the magnet is the only thing here that is
           meant to be dodged */
        out.push([ob.x - 6, ob.y - 6, 12, 12]);
      }

    } else if (ob.type === 'boon') {
      /* THE BOX IS THE BOWL, and it is the only box in this file that is
         not on a lethal thing. 24 wide against a 36px rim and 24 tall
         off FLOOR - 31: with hitR 11 that is a centre anywhere within
         +/-23 of the rim's middle and a 31px band of height above the
         ground death at FLOOR, which clears this file's worst frame
         step of 18.8px by twelve. Both edges are hitR-derived, so a
         shrivelled doodad gets the same 31px a fat one does. It goes
         the moment the funnel is taken - the tile stays drawn for the
         pull, but there is nothing left to land in. */
      if (ob.warp) { if (!ob.taken) out.push([ob.x - 12, FLOOR - 31, 24, 24]); return out; }
      /* the plant is what you collect, so the box travels with it and the
         drawn pot it came out of has none */
      if (!ob.taken) out.push([ob.x + ob.dx - 9, boonY(ob) + ob.dy - 10, 18, 20]);
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
    makeLitter: makeLitter, makeBoon: makeBoon, makeWarp: makeWarp,
    rectsFor: rectsFor,
    /* THE FOUR PLOTTERS, exported for js/chalkboard.js and for nothing
       else. A chalkboard is a board somebody drew on, which is this
       file's entire trade, and js/chalkboard.js aliases these four at
       the top level of its own IIFE - so it must load AFTER this file,
       and these four names are a contract that cannot be renamed on one
       side of it. 1px line, 1px circle, 2px line, 2px circle. */
    pline: pline, pline2: pline2, pcircle: pcircle, pcircle2: pcircle2
  };
})();
