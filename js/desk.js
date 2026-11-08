/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE DESK

   A workstation in daylight. The light comes in through white
   plantation shutters with the sky showing between the slats and falls
   on a bright greige wall rolled in bands, with a pothos vine run along
   the top rail; three screens and one desk lamp are the only other
   light in the bay. Two floating shelves
   carry the keepsakes - the jar, the grey slab with the horned ghost
   painted on it, the candle, the photo frame, the little skeleton,
   and on the lower one a row of red and white spines, an orange party
   hat, a green cube and a wooden crane. Under all of it: a white desk
   with two banks of shaker drawers, a knee hole full of cable, a
   keyboard, a mouse, a tin of gum, a studio speaker and a pot of ivy.
   Drawn from Assets/Concept/Desk ref 1-4; ref 4 is the daylight one,
   and the one the light in here is measured against.

   WHAT THIS BAY IS FOR. It is the first room in the game whose CEILING
   KILLS, and the first room with a hazard that does not. Those are two
   rules to learn in one level, so the pace is the Garden's and not the
   next rung up: the moulding has already taken the top 34px of every
   gap away, and a level that then also sped up would be charging twice
   for the same lesson.

   THE PILLARS ARE BOOK TOWERS. The shelves in the photograph are
   stacked two deep and the overflow is in piles on the desk, so a
   plank in here is a column of hardbacks - some spine out, some fore
   edge out, every course jogged a pixel because nobody stacked it
   straight - capped top and bottom with a fat dictionary. They are the
   DARKEST solid thing on the screen: since the daylight cut the wall is
   a bright greige off Desk ref 4, the shutters are white timber with
   sky in the chinks, and a tower of deep red, black, ochre, bottle
   green, navy and walnut stands against all of that the way the black
   monitors in the photograph do. That is the whole value plan - the
   same inversion the Mantle plays, the other way up - and it is what
   lets the wall be as bright as the photograph without the planks
   vanishing into it. The note at the top of P has the numbers.

   THE SIGNATURE IS THE APP ICON, AND IT COMES OUT OF A SCREEN. It is a
   'spike', because a spike is something fixed to an edge of the room
   that you fly past - and this pops out into the air exactly like that -
   but it carries ob.stun instead of killing. Touch one and the phone
   rings: three decaying buzzes of screen shake over 1.1 seconds, a
   banner in the SPICY slot, a pale flash, and NOTHING taken off the
   score or the lives. It is the only hazard in the game that costs the
   player nothing except the ability to read the next two seconds of a
   level whose entire skill is reading the next two seconds. The next
   plank is almost always inside that 1.1s, and that plank is the test.
   There is no lethal spike in this bay at all.

   The brief says the icons "pop out of the monitor screens", and the
   first build of this bay had them rising off the DESKTOP instead, at a
   flat y 198, with the three screens they were supposed to be coming
   out of playing no part in it. They now leave a named point on a named
   pane of glass: the pane lights up before the icon arrives, flashes as
   it goes, and keeps the spray. See THE NOTIFICATION'S GEOMETRY and
   pickPop() for how a thing travelling at the scroll's full rate is
   made to come out of furniture travelling at two fifths of it.

   THE HEAT IS MINT. FX.hot / hotMid / hotHi / heat / heatEdge /
   glowCore / glowEdge are all cool greens here, so the wash, the
   embers, the speed streaks and the doodad's halo come out a cold
   breath with no engine change at all. The banner still says SPICY! in
   orange and that is accepted: the power-up is a breath mint, and a
   breath mint is minty-spicy.

   Same discipline as js/coop.js, js/garden.js and js/construction.js:
   every pixel is generated here and baked into tiles once, and ANY
   shade laid over something that scrolls is a flat Tint, never a
   Dither. The Bayer grid is anchored in user space, so a dithered rect
   that moves re-phases against the pattern and the pixels boil. There
   is no call to Dither.rect anywhere in this file, nothing calls
   ctx.rotate, no draw function calls Math.random, and the quarter
   spins by swapping four baked frames.

   The ceiling, the floor, the room's pigments and the lighting pass
   are the ROOM's and come from js/livingroom.js. This bay's floor IS
   the room's floor - bare board right up to the wall - so drawFloor is
   LivingRoom.drawFloor, and drawBackdrop ends with LivingRoom.drawLight
   and paints no vignette or gloom of its own.
------------------------------------------------------------------ */
'use strict';

var Desk = (function () {

  var CEIL = LivingRoom.CEIL, FLOOR = LivingRoom.FLOOR;
  var R = LivingRoom.P;                 /* the room's pigments */

  /* This bay's own pigments. The room's eight oaks, its plasters, its
     crown and its lamp glass are NOT in here: a level keeps only what is
     its own, and reads the room's through R.

     Every value is a DAY value now. Desk ref 1-3 are a dark room with
     one lamp in it, and the first three cuts of this table were night
     values brightened for the screen; Desk ref 4 is the same desk in
     daylight, and it is the photograph this table is measured against. */
  var P = {
    /* DAYLIGHT, AND WHAT IT COST. Desk ref 1-3 were shot at night under
       a desk lamp and the first cut of this table was a faithful
       tungsten. The second cut moved the hue and not the brightness - a
       white-balance change, red-minus-blue 20.9 -> 11.0 at constant
       luminance - and the owner said, rightly, that it did not look as if
       anything had changed. Desk ref 4 is the same desk in DAYLIGHT, and
       measured off it the wall is a bright, cool, nearly neutral greige:
       upper left #86817b (lum 130), mid left #69635d (lum 100), above the
       shutters #7c7772 (lum 120), red-minus-blue +10 to +12 throughout.
       The wall this table had ran lum 33 to 85 (wallDeep #24211e,
       wallDark #36322d, wallMid #454039, wallLit #5c544b). The warmth was
       already right; the brightness was forty to seventy short. So the
       wall goes UP to the photograph and the hue stays where the last cut
       put it. The base coat is written at the photograph's UPPER-LEFT
       wall (131, its brightest patch) and not its mid-left (100), because
       the room's own light sheet - night up off the boards, void at the
       skirting and the sides, shared by five bays and not this file's to
       touch - takes about a tenth off whatever this wall is painted, more
       toward the skirting: painted 131 it renders about 120 at mid lane
       and about 100 above the desk, which is the photograph's own range.
       At 109 the lane measured 102 and the room still read as dusk; at
       120 it measured 105, and the lane only moves three for every
       eleven the wall does, because a third of the lane is shutters,
       shelves and screens that do not move with it.

       AND THE LEVEL INVERTS. Lifting the wall to the photograph puts it
       within twenty of a book tower whose body measured 131, and a plank
       that does not separate from its lane is a level nobody can play.
       The photograph answers that too: the monitors in it are BLACK and
       the book spines are dark against the light wall - the room being
       bright is exactly why the things in it read as dark. So this bay
       now does what the Mantle already does, the other way up: a bright
       room with dark furniture in it. The six covers, the pages and the
       title line all drop into shadow (see BOOKS, below) and the tower is
       the darkest solid thing on the screen instead of the most
       saturated.

       AND THE SEPARATION, MEASURED PROPERLY, BECAUSE THE FIRST VERSION
       OF THIS PARAGRAPH GOT THE DIRECTION OF TRAVEL WRONG. It said the
       inversion took the separation from 48.4 to 51.9. It did not. Run
       on ONE harness, over both builds - lane = CEIL+14 to FLOOR-14,
       every one of the 480 columns, eight scroll phases; pillar body =
       columns x+6 to x+28 of a tower at x 200 over the same eight
       phases, gap and caps excluded - the night build measures lane 78.8
       against a body of 130.8, a separation of 52.0, and the daylight
       cut on its own measures lane 108.5 against a body of 58.7, a
       separation of 49.8. The inversion COST about two, and it landed a
       shade under the 50 the brief named as the floor. Neither 48.4 nor
       the direction of travel reproduces on any one method; what the old
       note almost certainly did was measure the two builds two different
       ways - or quote variant 1 of one against variant 0 of the other,
       which is the same mistake wearing a hat. A before-and-after is
       only a measurement if the same harness took both halves of it, so
       both halves above come from one function, run twice, on the two
       trees. Variant 1 runs 3 to 4 over variant 0 throughout, and is
       quoted separately or not at all.

       WHAT PUT IT BACK was not the tower and not the wall - neither of
       those moved again - but the three screens, which the daylight cut
       had left at their night values. Lighting them for the room they
       are now in (see THE THREE SCREENS and SCREEN_DIM) lifts the lane
       to 113.8 against the same body of 58.7: a separation of 55.2, and
       57.3 on variant 1. Three lit monitors are a third of the lane's
       width, so what they are worth is a third of what they move; the
       plank is dark and the lane is bright, and anything that brightens
       the lane buys separation rather than spending it.
       Red-minus-blue over the same band 10.5 -> 12.0 -> 11.2, and the
       photograph's wall is +11. The window is where the light comes from: the
       shutters are no longer held six sixteenths toward the void, the
       chinks between the slats carry the photograph's own daylight
       (#cbd3cf, lum 208, cool), and the wall round the window takes two
       bands of cool spill instead of one. Nothing that is a shape moved
       and nothing that is an object moved. It is the light. */

    /* the wall: greige, rolled in bands, with the lamp pool low left and
       the window's spill upper right. The base coat is lum 131. wallDeep
       is the two baked washes at the skirting and under the moulding.
       Red-minus-blue 12 throughout.

       THE ROLLER TEXTURE, AND WHAT THE DAYLIGHT CUT COST IT - stated
       with both pairs, because quoting one pair in one revision and the
       other pair in the next is how two numbers that moved a long way
       can be made to look as though nothing happened. Measured off the
       pigments, night -> day:
           wallDark  50.6 -> 121.7
           wallMid   64.7 -> 130.7      (the base coat, and the fill)
           wallLit   85.4 -> 144.0
           wallDark to wallLit, the full amplitude:  34.8 -> 22.3
           wallMid  to wallLit, the half:            20.7 -> 13.3
       The superseded note quoted the HALF at 20.7; the note that
       replaced it quoted the FULL at 22, and 22 next to 20.7 reads like
       a wall that stayed where it was. It did not. The texture lost a
       third of its absolute contrast (34.8 -> 22.3) and two thirds of
       its contrast relative to the base it sits on (54% of 65 -> 17% of
       131), on a wall that nearly doubled in brightness.

       It is left at that for now, deliberately: these three tones are
       the photograph's own wall and this round's brief is the hazard,
       the screens and these comments. But the stated job of that gap is
       that it is "the only thing stopping 336x270 of greige reading as a
       painted backdrop", and at 17% of base it is doing that job on
       about a third of the contrast it was designed with. If the wall is
       ever reported as reading flat, this is the number to widen, and
       widening it symmetrically about wallMid leaves the lane mean - and
       therefore the separation - where it is. */
    wallDeep:     '#6b665f',
    wallDark:     '#7e7972',
    wallMid:      '#87827b',   /* the base coat, and the fill behind everything */
    wallLit:      '#958f88',
    wallLamp:     '#ab9d87',   /* the lamp is still on; in daylight it is a hint */

    /* the plantation shutters, and the DAY behind the slats. These are
       the photograph's own numbers: frame #97938a (lum 147), louvre face
       #a4a099 (160), daylight through a slat #cbd3cf (208, cool), and the
       underside of a slat a mid grey rather than a night - a white slat in
       a lit room is not black on its far side. The frame and the face are
       written a few over the photograph because shutters() still takes
       the whole window one sixteenth toward the void (see there). */
    shutterFrame: '#a09c94',
    shutterLit:   '#c1bdb6',
    louvre:       '#a9a7a2',   /* a white slat, lit from behind and in front  */
    louvreGap:    '#6b6c6d',
    daySky:       '#cbd3cf',   /* the chink: the photograph's daylight, as is  */
    dayWall:      '#aab0b4',   /* the daylight falling on the wall round the window */

    /* the white floating shelves */
    shelfLit:     '#cdc7ba',
    shelfMid:     '#a9a195',
    shelfDark:    '#6f6860',

    /* pothos, on the shutters and in the pot on the desk */
    ivyDark:      '#3c5126',
    ivyMid:       '#5f7c3a',
    ivyLit:       '#8ba652',

    /* the desk itself: white melamine, shaker drawers, black bar pulls */
    deskLit:      '#e3dfd6',
    deskTop:      '#cbc6bb',
    deskEdge:     '#99938a',
    drawerFace:   '#b3ab9d',
    drawerPanel:  '#a39c90',
    drawerShade:  '#817a6f',
    pullBlack:    '#1c1711',
    pullHi:       '#4a423a',
    toeKick:      '#58534c',

    /* monitor bodies */
    bezel:        '#17130f',
    bezelHi:      '#3b3431',
    bezelSilver:  '#8e8578',
    stand:        '#2a2522',
    /* THE THREE SCREENS, RE-VALUED FOR THE DAY. The daylight cut moved
       the wall and did not move these, and a screen that was correct
       against a 72 wall is wrong against a 114 one: the widescreen's
       live page used to LEAD its wall by 34 and ended up six BEHIND it,
       which is a monitor that is switched on and does not look it. The
       request names "different sequences playing on the screens" as a
       feature of this bay, so all three have to read as lit glass in a
       lit room. The two emitters go up; the one that is asleep does not,
       because Desk ref 4's monitors are black and that is half of what
       makes the room read as bright. See SCREEN_DIM for the other half
       of this fix - the dimming that was paying for a constraint which
       no longer exists.

       THE NUMBERS, all three panes against the same strip of bare
       plaster at x 2..8, y 100..140 - the one place in the bay that is
       nothing but wall at every scroll phase. Night build, daylight cut
       as it stood, and now:
           wall strip          71.5   113.8   113.8
           widescreen page    104.4   104.4   150.5    lead +33 / -9 / +37
           portrait session    66.5    66.5   122.0    lead  -5 / -47 /  +8
           all-in-one glass    20.0    20.0    28.5    lead -52 / -94 / -85
       The widescreen is back to leading its wall by about the 34 it led
       by at night, which is what a switched-on monitor does. The
       portrait sits a little over the wall rather than fifty under it: a
       session's chrome is grey and is not meant to out-shout a web page,
       and its live playhead row is brighter again. The all-in-one is the
       one that is SUPPOSED to lose, and it still loses by 85.

       And the lane is a third screens, so lighting them is also what
       takes the plank-to-lane separation from 49.8 back to 55.2 - see
       AND THE SEPARATION, above. */

    /* the all-in-one, asleep. It STAYS the darkest field in the bay -
       a switched-off screen is the photograph's own black monitor and
       the anchor of the whole inversion - but a black screen in a lit
       room is charcoal and not ink (27 -> 37), and what it has in it is
       the WINDOW: the reflection was 46, which is a night reflection,
       and daylight off white shutters in dark glass is 98. The
       screensaver's four tints come up with it so the one sequence on
       this pane still reads: 112 -> 155 on a glass of 37. */
    screenOff:    '#26232b',   /* the all-in-one, asleep                      */
    screenReflect:'#5a6274',   /* the window reflected in it - daylight, so blue */
    screenLogo:   '#9a95bd',   /* the screensaver bouncing about on it        */

    /* the portrait screen: the session, scrolling a row at a time. A
       session's chrome is grey, not white, so this pane is meant to sit
       UNDER the page and OVER the wall - the whole family moves up by
       about 33 and the playhead row stays where it is, because it was
       already the brightest thing on the glass and still should be. */
    dawGrey:      '#a3b2c4',
    dawCell:      '#c7d3e0',
    dawHi:        '#e4edf6',
    dawHead:      '#6d99cf',
    dawPlay:      '#e8f3ff',

    /* the widescreen: a web page, creeping upward. A white page on a
       monitor is the brightest thing in a daylit room that is not the
       sky through a shutter slat - the photograph's own daylight is 208
       and a lit page is over it - so the paper goes 204 -> 230 and the
       ink on it does not move: a page gets brighter, its text does not. */
    pageWhite:    '#e2e7ec',   /* turned down once more in screenPage - SCREEN_DIM */
    pageText:     '#8a9199',
    pageBar:      '#5c84a6',
    pageOrange:   '#e0783a',
    pageRed:      '#b4443a',
    pageGrey:     '#aab0b6',

    /* the things lying on the desk */
    keyCase:      '#b9b5a7',
    keyTop:       '#dad6ca',
    mouse:        '#2a2622',
    speaker:      '#d4cdbf',
    speakerCone:  '#3a3430',
    cupPlastic:   '#c9bba0',
    cupLid:       '#efe9df',
    gumTin:       '#2a9c86',
    gumHi:        '#8ad9c7',
    cable:        '#121010',
    cableHi:      '#3a3634',

    /* the trinkets on the two shelves */
    tRed:         '#9b2e26',
    tWhite:       '#e9e1d2',
    tYellow:      '#d9b03a',
    tGreen:       '#4f7b3b',
    tOrange:      '#df7330',
    tGrey:        '#6c655d',
    tFrame:       '#b19a7a',
    tBone:        '#e2d9c6',

    /* BOOKS. Six covers, each with the arris colour that lights its top
       edge, and the three paper tones a book IN A STACK shares. They are
       spent on the pillars, on the cap and on the spines leaning on the
       shelf - the falling book has its own paper, three entries down,
       and the note there says why it had to be given one -
       and since the daylight cut they are the DARKEST pigments in the bay
       rather than the loudest: a stack of hardbacks between a monitor and
       a lit wall is in its own shadow, and Desk ref 4 shows exactly that
       - dark spines, a black screen, a bright wall behind both. Every
       cover keeps its hue and gives up about two fifths of its luminance
       (red 78 -> 47, yellow 173 -> 84, tan 132 -> 70, blue 74 -> 42,
       green 88 -> 50, black 29 -> 23); the fore-edges, which were the
       brightest thing in the bay at 227, are paper seen in shadow at 61;
       the title line is a dim 96 instead of a white 231. A tower's body
       measures 56.7 against a lane of 108.5 - that is the
       separation, and it is the Mantle's inversion the other way up. The
       first daylight cut stopped a third of the way (pages 82, covers
       about ten over these) with the wall at 109, and measured 68
       against 102: a separation of 34, worse than the night's 48; the
       second (pages 69, these covers, wall 120) measured 60 against 105,
       a separation of 46. The lesson is that the room's light sheet
       takes a tenth off a bright wall and nothing off a dark tower, and
       that only a third of the lane IS wall, so the tower has to pay
       more than the arithmetic on raw pigments says.
       Before, for the record: bookRed #9b2e26 / #c6483c, bookBlack
       #1f1c1c / #403a3b, bookYellow #d8ae3a / #f1cf6a, bookGreen #3f6a3a
       / #5f9155, bookBlue #2f4d7e / #4d6fa6, bookTan #b07a48 / #d19d6a,
       pages #eae2d2, pagesHi #f7f2e8, pagesShade #c7bcaa, title #f1e7d0. */
    bookRed:      '#601b18',  bookRedHi:    '#7c2922',
    bookBlack:    '#181616',  bookBlackHi:  '#2e2a2a',
    bookYellow:   '#6a5418',  bookYellowHi: '#88702a',
    bookGreen:    '#243c23',  bookGreenHi:  '#365236',
    bookBlue:     '#1b2c48',  bookBlueHi:   '#2a4066',
    bookTan:      '#5f3f25',  bookTanHi:    '#78553a',
    pages:        '#403c37',
    pagesHi:      '#4c4741',
    pagesShade:   '#33302d',
    title:        '#665f55',

    /* AND THE ONE BOOK THAT IS NOT IN THE STACK'S SHADOW. Everything
       above is a book SEEN IN A PILE - wedged between its neighbours,
       behind a monitor, under a shelf - and that is why the daylight cut
       was right to take it down. A book that has come off the shelf and
       is falling through the middle of the room is not in that shadow at
       all: it is in the open air with the window on it, which is the one
       place in this bay where paper still catches the light. So the DROP
       keeps its own three tones, and only the drop and what it leaves on
       the boards ever paint with them.

       THIS IS NOT A FLOURISH, IT IS THE LEVEL'S MAIN HAZARD. Darkening
       the shared paper took the bright fore-edge band off the drop
       sprite at the same moment the wall rose by as much as the books
       fell, so the lane-against-pillar number this round was tuned on
       showed nothing while the thing the player has to dodge went
       invisible. Measured over 14,400 placements (6 covers x 2
       orientations x 25 x-positions x 16 y-positions x 3 scroll phases),
       mean |dL| of the sprite against the backdrop under it: the night
       build never fell below 39.8 anywhere in the bay; sharing the dark
       paper put 2.75% of placements under 25 with a worst case of 11.7 -
       a black hardback crossing the knee hole at y 214, which is a flat
       field of 23 and is exactly the height every book ends its fall at.
       With these three tones the worst placement in the bay is 32.4,
       and NOTHING is under 25 - or under 30. The whole census, night
       build / daylight cut as it stood / now:
           min      39.3   11.7   32.4
           p05      50.1   28.1   54.3
           p25      65.0   52.2   72.6
           median   73.2   72.2   84.4
           under 25  0.00%  2.75%  0.00%
       The median barely moved between the first two columns, which is
       exactly why this was missed: the wall rose by as much as the books
       fell, so every summary statistic the round was watching stayed
       still while the bottom of the distribution fell out.

       The values are the room's own daylight, not an invention:
       dropPages is 208, which is the photograph's light through a
       shutter slat (#cbd3cf, 208); dropPagesHi is 236, a hair under the
       desk's white melamine; dropTitle is 180, gilt lettering on a dark
       cover rather than the night build's flat white 231. FX.splat and
       FX.splatHi are these two, by reference and not by copy, so the
       burst a landing book throws can never again be a different paper
       from the book it came off. */
    dropPages:    '#d8d0bf',
    dropPagesHi:  '#f2ece0',
    dropTitle:    '#bdb49c',

    /* the mug: this bay's spare life */
    mugWhite:     '#f0eae0',
    mugShade:     '#c8bfb1',
    mugRim:       '#d9d1c4',
    coffee:       '#43261a',
    coffeeHi:     '#7a4b2a',
    steam:        '#f4eee5',
    napkin:       '#efe7d7',
    /* PlayScene's LIFE_LEAF and LIFE_PALE. An extra life glows the same
       colour in every level or the colour teaches the player nothing;
       they are written out again as rgba in drawBoon's halo, which
       cannot take a hex, so the pigment is named in one place. */
    lifeJade:     '#5fae9a',
    lifePale:     '#93d8bd',

    /* the breath mint: the heat, wearing this bay's colours */
    mintWhite:    '#f5fbf8',
    mintShade:    '#bfe6d8',
    mintEdge:     '#58b89b',
    mintGlow:     '#8fe3c8',
    mintCore:     '#e8fff6',
    mintDeep:     '#2f8f74',

    /* the quarter */
    silverHi:     '#f3f4f2',
    silverMid:    '#c6c9c8',
    silverDark:   '#8c9193',
    silverEdge:   '#5d6264',
    silverWarm:   '#e9dcc0',   /* the lamp catching the rim                   */

    /* THE APP ICONS. The only pure screen colours in the bay, and the
       only pure white. They have to read "this is a notification and not
       a thing that kills you" at a glance and at speed, so they are
       lifted clean out of the room's palette instead of sitting inside
       it. */
    appGreen:     '#34c759',  appGreenHi: '#7fe49a',  appGreenDk: '#1f8f3c',
    appBlue:      '#2f8ff0',  appBlueHi:  '#7fbcf8',  appBlueDk:  '#1b5ea8',
    appRim:       '#f6f8fa',
    appGlyph:     '#ffffff',
    badge:        '#ff3b30',  badgeHi:    '#ff8a80',  badgeInk:   '#fff4f2',
    ringArc:      '#ffe9a8',

    /* light, and the two darks everything falls into */
    lampWarm:     '#f1c27a',
    lampCore:     '#ffe4ac',
    shade:        '#241c13',
    outline:      '#15110c',
    void:         '#120d08'
  };

  /* the six covers, as [body, arris], indexed by a book's `cover` */
  var COVERS = [
    [P.bookRed,    P.bookRedHi],
    [P.bookBlack,  P.bookBlackHi],
    [P.bookYellow, P.bookYellowHi],
    [P.bookGreen,  P.bookGreenHi],
    [P.bookBlue,   P.bookBlueHi],
    [P.bookTan,    P.bookTanHi]
  ];

  var END_MIN = LivingRoom.END_MIN;     /* shortest tower stub at either end */
  var CEIL_KILLS = LivingRoom.CEIL_KILLS;

  /* A hardback is heavier than an apple (the Canopy's 38) and lighter
     than a 2x4 (the Construction's 44). It is also the thing the player
     spends this level dodging, and 40 puts it on the floor in about 2.5s
     from the moulding - long enough to be read, short enough that a book
     and the plank it was aimed at arrive together. */
  var DROP_GRAV = 40;
  var SPLAT_TIME = 1.6;

  /* The 15 neutral effect colours PlayScene paints particles and washes
     from. It never reads P. The first two are the ROOM's air, so the dust
     drifting through the Desk is the dust drifting through the Mantle.
     The last seven are the mint.

     SPLAT IS THE ONE ENTRY THAT IS NOT A LITERAL, AND THAT IS
     DELIBERATE. splatter() throws twelve particles in these two when a
     drop lands, and what it throws them off is drawDropSplat's ridge of
     paper. They were written out by hand as '#eae2d2' / '#f7f2e8' with
     the comment "pages" - which was true of the night build and silently
     stopped being true the moment the daylight cut took P.pages down to
     61, leaving a 226-and-242 burst coming off a 61 book, 165 of
     luminance apart. Naming the pigments instead of copying their values
     is the only version of this that cannot drift again: change the
     paper the falling book is lit by and the burst follows it in the
     same edit. */
  var FX = {
    motes:    LivingRoom.AIR.motes,  motesHi: LivingRoom.AIR.motesHi,
    puff:     '#d2c5ad',   puffHi:   '#eae2d2',   /* plaster and paper dust */
    ground:   '#b4aa91',   groundHi: '#d4cfc1',   /* oak                    */
    splat:    P.dropPages, splatHi:  P.dropPagesHi, /* the falling book's own paper */
    hot:      '#5fd1b0',   hotMid:   '#8fe3c8',   hotHi: '#e8fff6',
    heat:     '#8fe3c8',   heatEdge: '#2f8f74',
    glowCore: '232,255,246', glowEdge: '95,209,176'
  };

  /* The heads-up for each hazard as it arms: the thing, then the excuse.
     `ceil` is the ROOM's, word for word, in every bay it roofs - it is the
     same ceiling, and a player who learns it here and then reads
     something different next door has been told the rule twice and
     believed it once. */
  var WARN = {
    drop:  ['▼ BOOKS ▼', 'THE SHELF GAVE UP'],
    spike: ['▲ NOTIFICATIONS ▲', 'DO NOT PICK UP. THEY SHAKE.'],
    ceil:  LivingRoom.WARN_CEIL
  };

  /* the thirteen colours the generic cover would use. This bay paints
     its own (see COVER); the table stays honest, and it is honest about
     a room - pale oak on the floor, a book tower for a beam, an app icon
     for a spike. The TV and the stands read `back` off it. */
  var PREVIEW = {
    back: P.wallMid, backAlt: P.wallDark, seam: P.wallDeep,
    beam: P.bookRed, beamDark: P.bookBlack, beamLight: P.pages,
    ground: R.oakMid, groundDark: R.oakSeam, groundHi: R.oakLip,
    spike: P.appGreen, spikeHi: P.appRim, air: P.lampCore, gloom: P.void
  };

  /* The caption on a spare life taken here, and on a +5. A coffee cup is
     not a succulent and a quarter is not "GOLD"; the engine prints
     whatever the object says. */
  var BOON_NAME = 'COFFEE';
  var GOLD_NAME = 'QUARTER';

  /* The quarter's odds live HERE rather than in the tune, the way the
     Construction Zone's golden gear does: the ART is what has to know. A
     coin this file has not been told about gets a book's width, a book's
     fall and - worst - a book's long ground shadow, so the player reads
     an incoming hardback and dodges five points. */
  var GOLD_CHANCE = 0.045, GOLD_GAP = 6;
  var goldGap = 0;

  /* THE THREE PANES OF GLASS, in furniture-tile coordinates. The tile is
     VH tall and drawn at y 0, so a pane's y here IS its screen y and
     only its x ever has to be moved. This table is the one place the
     glass is described: bakeFurniture turns the three panes down through
     it, and every notification in the bay comes out of one of them. */
  var SCREENS = [
    { x: 30,  y: 136, w: 72,  h: 50 },   /* the all-in-one, asleep       */
    { x: 136, y: 118, w: 42,  h: 74 },   /* the portrait session         */
    { x: 202, y: 142, w: 102, h: 48 }    /* the widescreen, and the page */
  ];

  /* THE NOTIFICATION'S GEOMETRY, in one place because six functions have
     to agree about it.

     WHERE AN ICON COMES FROM. A point on one of those three panes, held
     POP_INSET inside the glass so that the glow, the flash and the spray
     never cross a bezel, and POP_LOW up from the bottom of it so that
     what the player watches is a thing climbing out of a screen and over
     the top of it. The point TRAVELS WITH THE FURNITURE, not with the
     icon: popX() below turns ob.x into the pane's current screen x, so
     the glass keeps the light for as long as the pane is in frame.

     WHERE IT GOES. `hy`, exactly as before: 'ceil' climbs all the way up
     under the moulding and 'floor' stops short and hangs over the
     keyboard where the player is actually flying. DESK_Y is still the
     line a floor-side hover is measured down from - that height is the
     level's gameplay and none of this changes it - it is simply no
     longer where anything is born.

     THE RISE IS KEYED OFF ob.x, not off ob.age, because a spike is born
     as far as ~230px off the right edge; on age it would have finished
     rising unseen, and the pop - the whole reason this hazard reads as
     coming OUT of something - would never be watched by anybody. One
     POP_RISE for both sides: the two used to differ because the two
     travel different distances, and now that the horizontal hand-off
     rides the same schedule (see pickPop) a second length would be a
     second thing to keep in step for no gain. POP_KICK is what buys the
     floor side its pop: a ceiling icon climbs 110px and needs no help, a
     floor one climbs about fifteen, and five pixels of arc peaking
     halfway out is the difference between a thing leaving a screen and a
     thing sliding up one. */
  var DESK_Y = 198;           /* the desktop, in world y                     */
  var ICON_W = 15;            /* the sprite, badge overhang included         */
  var CEIL_LIFT = 30;         /* a ceiling icon's standoff above CEIL        */
  var FLOOR_LIFT = 14;        /* a floor icon's standoff above the desk      */
  var POP_RISE = 110;         /* px of ob.x the whole pop takes              */
  var POP_KICK = 5;           /* px of arc at the top of the flight          */
  var POP_INSET = 8;          /* how far inside the glass the pop point sits */
  var POP_LOW = 9;            /* and how far up from the bottom of it        */
  var POP_GLOW = 7;           /* the bloom's radius - fits inside POP_INSET  */
  var POP_CHARGE = 90;        /* px of ob.x the glass glows for beforehand   */

  /* The furniture layer's scroll rate and the width of its tile, named
     once and read by bakeFurniture, drawBackdrop, drawScreens and the pop
     geometry alike. Two copies of either is the one bug in this file that
     nobody would ever see coming: the icons would simply drift off their
     screens over a long run. */
  var FURN_RATE = 0.40;
  var FURN_W = 416;

  /* The module's clock, in radians, cached from `scroll` at the top of
     every frame. The mug's steam reads it. It comes off scroll rather
     than off a dt because scroll stops dead the instant the game pauses
     and speeds up as the run does - so the steam holds still behind the
     pause scrim, which a dt would not. The Garden's rosette phases off
     ob.phase alone, which nothing ever advances; that pulse is in fact
     frozen, and is not the thing to copy. */
  var clock = 0;

  /* `scroll` itself, cached in the same place and for the same reason,
     because pickPop has to know where the furniture is standing at the
     moment an icon is born. It is ONE FRAME STALE - drawBackdrop caches
     it and spawnAhead runs before the next draw - which at the bay's top
     speed is 6px of scroll and 2.4 of furniture, comfortably inside the
     eight pixels the pop point is already held clear of the glass. */
  var scrollNow = 0;

  /* HOW FAR DOWN THE SCREENS ARE TURNED, AND WHY IT IS NO LONGER FIVE.

     This was five sixteenths of void on the glass, and the reason
     written here was that "a book tower's pages band is 227 and must
     stay the brightest thing in the bay". That constraint is gone. The
     daylight cut inverted this level: the tower's pages band is 61, the
     tower is now the DARKEST solid thing on the screen, and a screen
     cannot out-shout it by being bright - the brighter the lane, the
     further the plank separates from it. Five sixteenths was being paid
     for nothing, and what it bought instead was three switched-on
     monitors reading at or below the wall behind them.

     So: ONE sixteenth, laid on the GLASS ONLY, on top of the three the
     whole furniture layer gets. It is not a curtain over an emitter any
     more; it is the sheen a pane of glass has when the room it is in is
     brighter than it was - the thing that keeps a monitor reading as
     glass rather than as a hole cut in the wall. Measured on the
     widescreen's live page against the plaster strip at x 2..8: the
     night build led its wall by 34 (105.7 against 71.8) and the daylight
     cut left it trailing by 6 (105.7 against 111.2). With the panes
     re-valued and this at one it leads by the number quoted at the top
     of THE THREE SCREENS in P.

     It is applied in exactly two places - under the baked chrome and
     under the live content - and it has to be the same number in both or
     a tab bar ends up brighter than the page under it. */
  var SCREEN_DIM = 1;

  var T = {};               /* baked tiles and sprites */

  /* positive modulo. Every phase in this file comes off a coordinate that
     goes negative as the world scrolls left, and a bare % would flip the
     sign half the time. */
  function mod(v, m) { return LivingRoom.wrap(v, m); }

  /* A triangle wave: 0 up to `span` and back again, with `v` free to run
     away forever. The screensaver bounces off all four sides of its
     screen with two of these and no state at all. */
  function tri(v, span) { return span - Math.abs(mod(v, 2 * span) - span); }

  /* ================================================================
     BAKED TILES
     ================================================================ */

  /* ------------------------------------------------------- the wall

     L1, the furthest layer: rolled plaster, the lamp pool, the shutters
     with night behind them, the pothos along the top rail, and the
     baseboard the whole bay stands on. 336 wide so it never repeats on
     the same beat as the shelves (288) or the furniture (416). */
  function bakeWall() {
    var W = 336, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(2101);
    var x, y;

    c.fillStyle = P.wallMid;
    c.fillRect(0, 0, W, H);

    /* Roller bands. Somebody rolled this wall in vertical strokes and
       never cut in the overlaps, so it stripes - 14 to 26px wide, three
       tones, seeded so a paused frame drawn twice is the same frame. It
       is the only texture the wall gets, and it is what stops 336x270 of
       beige reading as a painted backdrop. */
    x = 0;
    while (x < W) {
      var bw = 14 + Math.floor(r() * 13);
      if (x + bw > W) bw = W - x;
      var v = r();
      if (v < 0.38) { c.fillStyle = P.wallDark; c.fillRect(x, 0, bw, H); }
      else if (v > 0.74) { c.fillStyle = P.wallLit; c.fillRect(x, 0, bw, H); }
      x += bw;
    }

    /* THE LAMP POOL, baked. The only warm light on the wall is the one
       the desk lamp throws, and it is six concentric flat-tinted ellipse
       bands rather than a radial gradient: a gradient on a
       nearest-neighbour layer bands anyway, and this way the bands are
       chosen rather than arrived at. The strengths are 1,1,1,2,2,3 from
       the outside in, which compounds to about half-way to wallLamp at
       the core - and in daylight wallLamp is thirty over the base coat
       where it was fifty-four over it, so the core lands about fifteen
       up and a little warm: a lamp left on in a lit room, not a pool. */
    lampPool(c, 90, 150, W, H);

    /* THE DAYLIGHT, on the wall round the window: two bands of a cool
       grey, a sixteenth each, in ellipses centred on the shutters. The
       photograph's wall above the window measures 120 against 100 at mid
       height, and two bands of dayWall over the base coat is about eight
       of that at the core. Two bands and not the lamp pool's six, because
       it is a window across a room and not a lamp on a desk; their edges
       are curves, so no row of the bay moves by them. */
    dayPool(c, 221, 97, W, H);

    /* THE SHUTTERS. White plantation shutters, two panels either side of
       a centre stile, in a 6px frame. */
    shutters(c, 150, 28, 142, 138);

    /* The pothos run along the top rail and down the left stile. In the
       photograph it is trained along the frame and trailing off the
       right-hand end; here it hugs the top and the left because the
       right-hand side of the tile is where the next copy begins. */
    ivyRun(c, 150, 26, 142, true, r);
    ivyRun(c, 148, 34, 128, false, r);

    /* the baseboard: one dark line and nine pixels of white board, which
       is where the wall stops and the oak starts */
    c.fillStyle = R.crownShade; c.fillRect(0, 232, W, 1);
    c.fillStyle = P.shelfMid;   c.fillRect(0, 233, W, 9);

    /* and the two baked washes that sit this layer behind everything: the
       floor end of the room is in shadow, and so is the air up under the
       moulding where no lamp reaches */
    Tint.rect(c, 0, H - 60, W, 60, P.wallDeep, 5);
    Tint.rect(c, 0, 0, W, 20, P.wallDeep, 4);
    return t;
  }

  /* six nested ellipses of warm light, painted a row at a time */
  function lampPool(c, cx, cy, W, H) {
    var radii = [120, 101, 82, 63, 44, 24];
    var strength = [1, 1, 1, 2, 2, 3];
    for (var b = 0; b < radii.length; b++) {
      var rx = radii[b], ry = Math.round(rx * 0.78);
      for (var dy = -ry; dy <= ry; dy++) {
        var yy = cy + dy;
        if (yy < 0 || yy >= H) continue;
        var k = dy / ry;
        var hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - k * k)));
        if (hw <= 0) continue;
        var x0 = Math.max(0, cx - hw), x1 = Math.min(W, cx + hw);
        if (x1 <= x0) continue;
        Tint.rect(c, x0, yy, x1 - x0, 1, P.wallLamp, strength[b]);
      }
    }
  }

  /* the daylight's spill: the lamp pool's painter at two bands, a
     sixteenth each, the outer one as wide as the window and its frame */
  function dayPool(c, cx, cy, W, H) {
    var radii = [110, 70];
    for (var b = 0; b < radii.length; b++) {
      var rx = radii[b], ry = Math.round(rx * 0.78);
      for (var dy = -ry; dy <= ry; dy++) {
        var yy = cy + dy;
        if (yy < 0 || yy >= H) continue;
        var k = dy / ry;
        var hw = Math.round(rx * Math.sqrt(Math.max(0, 1 - k * k)));
        if (hw <= 0) continue;
        var x0 = Math.max(0, cx - hw), x1 = Math.min(W, cx + hw);
        if (x1 <= x0) continue;
        Tint.rect(c, x0, yy, x1 - x0, 1, P.dayWall, 1);
      }
    }
  }

  /* One window: a 6px painted frame with a lit inner edge, a 6px centre
     stile, and two louvre panels.

     THE SLATS ARE WHY IT READS AS A WINDOW. The pitch is six pixels -
     three of slat face, one of the lit arris along its lower edge, one
     of the shadow behind it and one of OUTSIDE. Without that last row
     the panel is a corrugated grey rectangle; with it there is a chink
     of daylight every six pixels, which is the only thing in the bay
     that says the wall has a far side. */
  function shutters(c, x, y, w, h) {
    var i, panel;

    /* THE OUTLINE FIRST, AND THE DAY INSIDE IT. These two were the other
       way round and the chink was never outside at all: the outline rect
       is w+2 by h+2, so it covered every pixel of the sky fill, and the
       one row in six the slats leave bare came out at the outline's own
       20 of luminance. It read as a plausible night, which is why it
       survived the night cut unnoticed - but a chink that paints itself
       black cannot carry daylight, and this bay's daylight comes through
       exactly these six-pixel gaps. The outline now goes down first and
       the sky fills the opening inside it, which leaves the same 1px
       dark ring round the window and puts the sky where the slats part. */
    c.fillStyle = P.outline;      c.fillRect(x - 1, y - 1, w + 2, h + 2);
    c.fillStyle = P.daySky;       c.fillRect(x, y, w, h);

    /* the frame */
    c.fillStyle = P.shutterFrame;
    c.fillRect(x, y, w, 6); c.fillRect(x, y + h - 6, w, 6);
    c.fillRect(x, y, 6, h); c.fillRect(x + w - 6, y, 6, h);
    /* the light catches the top and left of every moulded edge */
    c.fillStyle = P.shutterLit;
    c.fillRect(x, y, w, 1); c.fillRect(x, y, 1, h);
    c.fillRect(x + 5, y + 6, 1, h - 12); c.fillRect(x + 6, y + 5, w - 12, 1);

    /* the centre stile, and the two panels either side of it */
    var inX = x + 6, inY = y + 6, inW = w - 12, inH = h - 12;
    var stile = inX + Math.floor((inW - 6) / 2);
    var pw = stile - inX;
    for (panel = 0; panel < 2; panel++) {
      var px = panel ? stile + 6 : inX;
      for (i = 0; i + 5 < inH; i += 6) {
        var sy = inY + i;
        c.fillStyle = P.louvre;      c.fillRect(px, sy, pw, 3);
        c.fillStyle = P.shutterLit;  c.fillRect(px, sy + 3, pw, 1);
        c.fillStyle = P.louvreGap;   c.fillRect(px, sy + 4, pw, 1);
        /* row 5 is left as daySky: the chink, and the daylight */
      }
    }
    c.fillStyle = P.shutterFrame; c.fillRect(stile, inY, 6, inH);
    c.fillStyle = P.shutterLit;   c.fillRect(stile, inY, 1, inH);
    c.fillStyle = P.outline;      c.fillRect(stile + 5, inY, 1, inH);

    /* AND THEN A SIXTEENTH OF THE VOID, not six. Through the night cuts
       the window was held six sixteenths down because a tower's pages
       band was the one thing in the bay not allowed to lose, and white
       shutters painted at their own value beat it. The level inverts now
       - the towers are the dark thing - so the window may be what the
       photograph says it is, the brightest surface in the room: the
       frame about 147, a louvre face about 158 and the chink about 196
       after this, against the photograph's 147, 160 and 208. The one
       sixteenth that stays keeps the window a hair under its raw
       pigments, so the lit arris on the frame still reads as an arris
       and not as the same white as the slat under it. */
    Tint.rect(c, x - 1, y - 1, w + 2, h + 2, P.void, 1);
  }

  /* a vine with leaf clusters every 7-11px, run along a rail or down a
     stile. `horiz` says which. */
  function ivyRun(c, x, y, len, horiz, r) {
    var i = 0, step;
    c.fillStyle = P.ivyDark;
    if (horiz) c.fillRect(x, y, len, 1);
    else c.fillRect(x, y, 1, len);
    while (i < len - 4) {
      step = 7 + Math.floor(r() * 5);
      i += step;
      if (i >= len - 4) break;
      var flip = r() < 0.5;
      if (horiz) ivyLeaf(c, x + i, y + (flip ? 1 : -2), flip);
      else ivyLeaf(c, x + (flip ? 1 : -4), y + i, flip);
    }
  }

  /* a 4x2 leaf: body, a lit tip, and the underside it folds over */
  function ivyLeaf(c, x, y, flip) {
    c.fillStyle = P.ivyMid;  c.fillRect(x, y, 4, 1);
    c.fillStyle = P.ivyDark; c.fillRect(x, y + 1, 4, 1);
    c.fillStyle = P.ivyLit;  c.fillRect(x + (flip ? 0 : 3), y, 1, 1);
  }

  /* ----------------------------------------------------- the shelves

     L2: two white floating shelves and the things on them. Mostly
     transparent, so the wall and its lamp pool show between the
     keepsakes - which is the only reason the layer behind it was worth
     painting. 288 wide. */
  function bakeShelves() {
    var W = 288, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;

    shelfBoard(c, 14, 54, 182);
    shelfBoard(c, 14, 96, 162);

    /* the top shelf, left to right as in Desk ref 2: a jar, the grey
       slab with the horned ghost painted on it, a candle, a photo frame
       and the little skeleton. Everything stands ON the board, so every
       sprite's bottom row is the row above it. */
    trinketJar(c, 24, 44);
    trinketSlab(c, 52, 42);
    trinketCandle(c, 84, 46);
    trinketFrame(c, 100, 44, 12, 10);
    trinketSkeleton(c, 140, 42);

    /* the lower shelf: four red-and-white spines, the orange party hat
       on its brim, the green cube with the pale rim, a second frame and
       the little wooden crane */
    var spines = [P.tRed, P.tWhite, P.tRed, P.tWhite];
    for (var i = 0; i < 4; i++) trinketSpine(c, 24 + i * 6, 74, spines[i], i);
    trinketHat(c, 58, 86);
    trinketCube(c, 80, 86);
    trinketFrame(c, 104, 86, 12, 10);
    trinketCrane(c, 128, 82);

    /* The whole layer stands one step further back in the room. It goes
       on source-atop, so the gaps between the keepsakes stay clear and
       the wall behind them is not darkened twice. */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 5);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* one floating shelf: six pixels of board, and the shadow it throws */
  function shelfBoard(c, x, y, w) {
    c.fillStyle = P.shelfLit;  c.fillRect(x, y, w, 1);
    c.fillStyle = P.shelfMid;  c.fillRect(x, y + 1, w, 4);
    c.fillStyle = P.shelfDark; c.fillRect(x, y + 5, w, 1);
    Tint.rect(c, x, y + 6, w, 1, P.void, 9);
  }

  function trinketJar(c, x, y) {
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 1, 10, 11);
    c.fillStyle = P.tGrey;   c.fillRect(x, y + 2, 8, 8);
    c.fillStyle = P.tWhite;  c.fillRect(x, y, 8, 2);
    c.fillStyle = P.tBone;   c.fillRect(x + 2, y + 4, 1, 1);
  }

  /* the grey slab with the white horned face on it - the thing on the
     top shelf in the photograph that everyone asks about */
  function trinketSlab(c, x, y) {
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 1, 16, 14);
    c.fillStyle = P.tGrey;   c.fillRect(x, y, 14, 12);
    c.fillStyle = P.tWhite;
    c.fillRect(x + 2, y + 2, 2, 3); c.fillRect(x + 10, y + 2, 2, 3);  /* the horns */
    c.fillRect(x + 3, y + 5, 8, 5);                                   /* the face  */
    c.fillStyle = P.outline;
    c.fillRect(x + 5, y + 6, 1, 2); c.fillRect(x + 8, y + 6, 1, 2);
  }

  function trinketCandle(c, x, y) {
    c.fillStyle = P.outline;   c.fillRect(x - 1, y - 1, 6, 9);
    c.fillStyle = P.tWhite;    c.fillRect(x, y, 4, 8);
    c.fillStyle = R.lampGlass; c.fillRect(x + 1, y - 2, 1, 1);
  }

  function trinketFrame(c, x, y, w, h) {
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 1, w + 2, h + 2);
    c.fillStyle = P.tFrame;  c.fillRect(x, y, w, h);
    c.fillStyle = P.tWhite;  c.fillRect(x + 2, y + 2, w - 4, h - 4);
    c.fillStyle = P.tGrey;   c.fillRect(x + 3, y + 4, w - 6, 2);
  }

  function trinketSkeleton(c, x, y) {
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 1, 7, 14);
    c.fillStyle = P.tBone;   c.fillRect(x, y, 5, 12);
    c.fillStyle = P.outline;
    c.fillRect(x + 1, y + 1, 1, 1); c.fillRect(x + 3, y + 1, 1, 1);  /* the sockets */
    c.fillRect(x, y + 5, 5, 1); c.fillRect(x + 2, y + 7, 1, 5);      /* ribs, legs  */
  }

  /* one book spine stood on the shelf, 5x22, with the two pale ticks
     that stand in for a title at this size */
  function trinketSpine(c, x, y, col, i) {
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 1, 7, 24);
    c.fillStyle = col;       c.fillRect(x, y, 5, 22);
    c.fillStyle = P.title;
    c.fillRect(x + 1, y + 5 + (i % 3), 3, 1);
    c.fillRect(x + 1, y + 12 - (i % 2), 3, 1);
  }

  /* the orange party hat, stood on its brim */
  function trinketHat(c, x, y) {
    for (var i = 0; i < 10; i++) {
      var hw = Math.max(1, Math.round((i / 9) * 4));
      c.fillStyle = P.outline;  c.fillRect(x + 4 - hw - 1, y + i, hw * 2 + 2, 1);
      c.fillStyle = P.tOrange;  c.fillRect(x + 4 - hw, y + i, hw * 2, 1);
    }
    c.fillStyle = P.tWhite;  c.fillRect(x, y + 8, 8, 2);
    c.fillStyle = P.outline; c.fillRect(x, y + 10, 8, 1);
  }

  function trinketCube(c, x, y) {
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 1, 12, 12);
    c.fillStyle = P.tFrame;  c.fillRect(x, y, 10, 10);
    c.fillStyle = P.tGreen;  c.fillRect(x + 2, y + 2, 6, 6);
    c.fillStyle = P.ivyLit;  c.fillRect(x + 3, y + 3, 2, 1);
  }

  /* the little folded wooden crane */
  function trinketCrane(c, x, y) {
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 1, 5, 16);
    c.fillStyle = P.tFrame;  c.fillRect(x, y, 3, 14);
    c.fillStyle = P.tBone;   c.fillRect(x, y, 3, 1);
    c.fillStyle = P.tFrame;  c.fillRect(x + 3, y + 3, 3, 1);
  }

  /* --------------------------------------------------- the furniture

     L3, the nearest layer and the one the bay is named for: the
     desktop, two banks of drawers, the knee hole full of cable, the
     toe kick, and everything standing on the desk. 416 wide.

     The three screens get their CHROME baked here and their contents
     drawn live over the top, per visible tile copy, in drawScreens. A
     baked screen cannot play anything, and a screen that plays nothing
     in a level whose brief says "different sequences playing on the
     screens" is a lie told in pixels. */
  function bakeFurniture() {
    var W = FURN_W, H = VH;
    var t = makeCanvas(W, H), c = t.ctx;
    var i;

    /* 1. the knee hole first, so the drawers land in front of it */
    c.fillStyle = P.shade;   c.fillRect(170, 196, 60, 46);
    Tint.rect(c, 170, 196, 60, 46, P.void, 8);
    /* five cables sagging across it, one of them catching the lamp */
    for (i = 0; i < 5; i++) {
      var cy0 = 200 + i * 6, sag = 10 + i * 3;
      for (var cx = 170; cx < 230; cx++) {
        var u = (cx - 170) / 60;
        var yy = cy0 + Math.round(Math.sin(u * Math.PI) * sag);
        c.fillStyle = (i === 2 && cx > 192 && cx < 206) ? P.cableHi : P.cable;
        c.fillRect(cx, yy, 1, 1);
      }
    }

    /* 2. the drawer banks */
    drawerBank(c, 20, 201, 150);
    drawerBank(c, 230, 201, 170);

    /* 3. the toe kick, and the shadow it throws on the oak */
    c.fillStyle = P.toeKick; c.fillRect(0, 236, W, 6);
    Tint.rect(c, 0, 236, W, 6, P.void, 6);

    /* 4. the desktop: one lit lip, three of face, one dark edge, right
       across the tile so the line never breaks at a seam */
    c.fillStyle = P.deskLit;  c.fillRect(0, 196, W, 1);
    c.fillStyle = P.deskTop;  c.fillRect(0, 197, W, 3);
    c.fillStyle = P.deskEdge; c.fillRect(0, 200, W, 1);

    /* 5. a pile of books stood on end at the left-hand edge */
    var lean = [2, 1, 4, 0, 3];
    for (i = 0; i < 5; i++) {
      var bx = i * 5 + (i > 2 ? 1 : 0);
      deskBook(c, bx, 166, 5, 30, COVERS[lean[i]]);
    }

    /* 6. the all-in-one, asleep, with the window reflected in it */
    allInOne(c, 28, 134);
    /* 7. the plastic cup, and the ring it has left on the desk */
    plasticCup(c, 110, 174);
    /* 8. the portrait screen and 9. the widescreen */
    portraitMonitor(c, 134, 116);
    wideMonitor(c, 200, 140);
    /* and all three panes turned down, glass only - see SCREEN_DIM. Read
       out of SCREENS rather than written out again, because the same
       three rectangles decide where a notification comes out of, and a
       pane that was dimmed in one place and popped from in another would
       put a flash on a bezel. */
    for (i = 0; i < SCREENS.length; i++) {
      Tint.rect(c, SCREENS[i].x, SCREENS[i].y, SCREENS[i].w, SCREENS[i].h, P.void, SCREEN_DIM);
    }

    /* 10. the keyboard, straddling the near edge of the desk - it is in
       FRONT of both screens, which is why it goes on after them */
    keyboard(c, 204, 190);
    c.fillStyle = P.outline; c.fillRect(295, 191, 9, 6);
    c.fillStyle = P.mouse;   c.fillRect(296, 192, 7, 4);
    c.fillStyle = P.cableHi; c.fillRect(298, 192, 2, 1);
    /* the tin of gum from Desk ref 3 */
    c.fillStyle = P.outline; c.fillRect(287, 189, 14, 8);
    c.fillStyle = P.gumTin;  c.fillRect(288, 190, 12, 6);
    c.fillStyle = P.gumHi;   c.fillRect(289, 191, 10, 1); c.fillRect(291, 193, 4, 1);

    /* 11. the studio speaker, and 12. the pot of ivy beside it */
    studioSpeaker(c, 322, 170);
    pottedIvy(c, 356, 170);

    /* This layer is nearly in the action, so it is barely dimmed - three
       sixteenths, source-atop, which leaves the wall showing between the
       legs of everything rather than darkening it a second time. */
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, 0, W, H, P.void, 3);
    c.globalCompositeOperation = 'source-over';
    return t;
  }

  /* one bank: two 16px shaker drawers with black bar pulls */
  function drawerBank(c, x, y, w) {
    c.fillStyle = P.outline; c.fillRect(x, y, w, 35);
    drawerFront(c, x, y, w, 16);
    drawerFront(c, x, y + 18, w, 16);
  }

  function drawerFront(c, x, y, w, h) {
    c.fillStyle = P.outline;     c.fillRect(x, y, w, h);
    c.fillStyle = P.drawerFace;  c.fillRect(x + 1, y + 1, w - 2, h - 2);
    c.fillStyle = P.drawerPanel; c.fillRect(x + 4, y + 4, w - 8, h - 8);
    /* the inside of a shaker panel is a rebate, so the shadow is on the
       bottom and the right of it and nowhere else */
    c.fillStyle = P.drawerShade;
    c.fillRect(x + 4, y + h - 5, w - 8, 1);
    c.fillRect(x + w - 5, y + 4, 1, h - 8);
    /* the pull, centred */
    var px = x + Math.round(w / 2) - 9, py = y + Math.round(h / 2) - 1;
    c.fillStyle = P.pullBlack; c.fillRect(px, py, 18, 2);
    c.fillStyle = P.pullHi;    c.fillRect(px, py, 18, 1);
  }

  /* a hardback stood on the desk, seen spine out */
  function deskBook(c, x, y, w, h, cover) {
    c.fillStyle = P.outline;  c.fillRect(x, y, w, h);
    c.fillStyle = cover[0];   c.fillRect(x, y + 1, w - 1, h - 1);
    c.fillStyle = cover[1];   c.fillRect(x, y + 1, w - 1, 1);
    c.fillStyle = P.title;
    c.fillRect(x + 1, y + 8, w - 3, 1);
    c.fillRect(x + 1, y + 11, w - 3, 1);
    c.fillStyle = P.pages;    c.fillRect(x + w - 1, y + 1, 1, h - 1);
  }

  /* The dark all-in-one from Desk ref 1: a big black panel with a
     silver chin and an aluminium foot, asleep, with the shutters behind
     the photographer reflected in the top-left corner of the glass. */
  function allInOne(c, x, y) {
    c.fillStyle = P.outline;  c.fillRect(x, y, 76, 62);
    c.fillStyle = P.bezel;    c.fillRect(x + 1, y + 1, 74, 60);
    c.fillStyle = P.bezelHi;  c.fillRect(x + 1, y + 1, 74, 1);
    c.fillStyle = P.screenOff; c.fillRect(x + 2, y + 2, 72, 50);
    /* the reflection - the only reason a black rectangle reads as glass */
    c.fillStyle = P.screenReflect; c.fillRect(x + 4, y + 4, 10, 8);
    c.fillStyle = P.bezel;         c.fillRect(x + 6, y + 5, 1, 6);
    c.fillStyle = P.bezelSilver;   c.fillRect(x + 2, y + 53, 72, 2);
    c.fillStyle = P.stand;         c.fillRect(x + 33, y + 56, 10, 4);
    c.fillStyle = P.bezelSilver;   c.fillRect(x + 23, y + 60, 30, 2);
  }

  /* the disposable cup in every one of the three photographs */
  function plasticCup(c, x, y) {
    var i;
    for (i = 0; i < 22; i++) {
      var w = 10 + Math.round(i / 21 * 2);
      var cx = x + 6 - Math.round(w / 2);
      c.fillStyle = P.outline;    c.fillRect(cx - 1, y + i, w + 2, 1);
      c.fillStyle = P.cupPlastic; c.fillRect(cx, y + i, w, 1);
      c.fillStyle = P.cupLid;     c.fillRect(cx, y + i, 2, 1);
    }
    c.fillStyle = P.outline; c.fillRect(x - 1, y - 2, 14, 3);
    c.fillStyle = P.cupLid;  c.fillRect(x, y - 1, 12, 2);
    /* the ring it has left on the desktop */
    c.fillStyle = P.coffee;  c.fillRect(x + 1, y + 22, 10, 1);
  }

  /* The portrait screen. Its chrome is baked: a blue header bar and a
     grid of 6 columns by 14 rows of cells on grey gutters. The playhead
     row is painted live. */
  function portraitMonitor(c, x, y) {
    var col, row;
    c.fillStyle = P.outline; c.fillRect(x, y, 46, 78);
    c.fillStyle = P.bezel;   c.fillRect(x + 1, y + 1, 44, 76);
    c.fillStyle = P.bezelHi; c.fillRect(x + 1, y + 1, 44, 1);
    /* the session itself, at (x+2, y+2), 42 x 74 */
    c.fillStyle = P.dawGrey; c.fillRect(x + 2, y + 2, 42, 74);
    c.fillStyle = P.dawHead; c.fillRect(x + 2, y + 2, 42, 4);
    c.fillStyle = P.dawHi;
    c.fillRect(x + 4, y + 3, 1, 2); c.fillRect(x + 5, y + 4, 1, 1);
    for (row = 0; row < 14; row++) {
      for (col = 0; col < 6; col++) {
        /* one cell in five is lit, picked off the room's integer hash so
           the pattern never boils and never has to be stored */
        var lit = LivingRoom.hash(row * 7 + col * 131) % 5 === 0;
        c.fillStyle = lit ? P.dawHi : P.dawCell;
        c.fillRect(x + 2 + col * 7, y + 6 + row * 5, 6, 4);
      }
    }
    c.fillStyle = P.stand;       c.fillRect(x + 19, y + 78, 8, 2);
    c.fillStyle = P.bezelSilver; c.fillRect(x + 13, y + 78, 20, 2);
  }

  /* The widescreen. Only the tab bar is baked; the page under it scrolls
     live, cropped by a source rect rather than a clip. */
  function wideMonitor(c, x, y) {
    c.fillStyle = P.outline; c.fillRect(x, y, 106, 52);
    c.fillStyle = P.bezel;   c.fillRect(x + 1, y + 1, 104, 50);
    c.fillStyle = P.bezelHi; c.fillRect(x + 1, y + 1, 104, 1);
    c.fillStyle = P.pageWhite; c.fillRect(x + 2, y + 2, 102, 48);
    c.fillStyle = P.pageBar;   c.fillRect(x + 2, y + 2, 102, 5);
    c.fillStyle = P.pageGrey;
    c.fillRect(x + 4, y + 3, 20, 3); c.fillRect(x + 26, y + 3, 20, 3);
    c.fillRect(x + 48, y + 3, 20, 3);
    c.fillStyle = P.stand;       c.fillRect(x + 50, y + 52, 6, 2);
    c.fillStyle = P.bezelSilver; c.fillRect(x + 43, y + 52, 20, 2);
  }

  function keyboard(c, x, y) {
    var col, row;
    c.fillStyle = P.outline; c.fillRect(x, y, 84, 9);
    c.fillStyle = P.keyCase; c.fillRect(x + 1, y + 1, 82, 7);
    c.fillStyle = P.keyTop;
    for (row = 0; row < 3; row++) {
      for (col = 0; col < 26; col++) {
        c.fillRect(x + 2 + col * 3 + (row % 2), y + 2 + row * 2, 1, 1);
      }
    }
    c.fillStyle = P.deskEdge; c.fillRect(x + 1, y + 8, 82, 1);
  }

  /* the near-field monitor from Desk ref 3 */
  function studioSpeaker(c, x, y) {
    c.fillStyle = P.outline;     c.fillRect(x - 1, y - 1, 20, 28);
    c.fillStyle = P.speaker;     c.fillRect(x, y, 18, 26);
    c.fillStyle = P.speakerCone; c.fillRect(x + 4, y + 4, 10, 10);
    c.fillStyle = P.speaker;     c.fillRect(x + 7, y + 7, 4, 4);
    c.fillStyle = P.speakerCone; c.fillRect(x + 6, y + 18, 6, 5);
    c.fillStyle = P.cupLid;      c.fillRect(x, y, 18, 1);
  }

  /* The pot on the end of the desk and the pothos coming out of it: a
     seeded mass of leaves inside an ellipse, with three vines trailing
     back down to the desktop. The mass is drawn ABOVE the pot and well
     to its left, because in the photograph it has long since stopped
     being a plant on a desk and become a plant on a wall. */
  function pottedIvy(c, x, y) {
    var r = mulberry32(6611), i;

    c.fillStyle = P.outline;  c.fillRect(x - 1, y - 1, 38, 28);
    c.fillStyle = P.shade;    c.fillRect(x, y, 36, 26);
    c.fillStyle = P.tGrey;    c.fillRect(x, y, 36, 2);
    c.fillStyle = P.drawerShade; c.fillRect(x + 2, y + 4, 32, 1);

    /* the three vines first, so the leaf mass lands on top of them */
    for (i = 0; i < 3; i++) {
      var vx = x - 10 + i * 14;
      for (var vy = 130 + i * 8; vy < 196; vy++) {
        c.fillStyle = P.ivyDark;
        c.fillRect(vx + Math.round(Math.sin(vy * 0.09 + i) * 3), vy, 1, 1);
        if (vy % 9 === 0) {
          ivyLeaf(c, vx + Math.round(Math.sin(vy * 0.09 + i) * 3) - 1, vy, i % 2 === 0);
        }
      }
    }

    /* the mass: 60 x 70 centred at (370, 135), leaves thrown inside the
       ellipse off a seeded rng so a paused frame is the same frame */
    for (i = 0; i < 150; i++) {
      var a = r() * TAU, rr = Math.sqrt(r());
      var lx = 370 + Math.round(Math.cos(a) * rr * 30);
      var ly = 135 + Math.round(Math.sin(a) * rr * 35);
      ivyLeaf(c, lx, ly, r() < 0.5);
      if (r() < 0.18) { c.fillStyle = P.ivyLit; c.fillRect(lx + 1, ly, 1, 1); }
    }
  }

  /* ----------------------------------------------- the page that scrolls

     Baked once, 102 x 96, and drawn twice by source rect into the 43px
     of screen under the tab bar - so the page creeps upward forever
     with no clip, no second canvas and no seam. */
  function bakePage() {
    var W = 102, H = 96;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(9311), i;

    c.fillStyle = P.pageWhite; c.fillRect(0, 0, W, H);
    /* a headline, then eleven lines of body copy of honest lengths */
    c.fillStyle = P.pageText;  c.fillRect(6, 5, 62, 2);
    for (i = 0; i < 11; i++) {
      c.fillStyle = P.pageText;
      c.fillRect(6, 12 + i * 6, 40 + Math.floor(r() * 41), 1);
    }
    /* the thumbnail somebody put at the top of it */
    c.fillStyle = P.pageRed;  c.fillRect(80, 12, 14, 18);
    c.fillStyle = P.pageGrey; c.fillRect(82, 14, 10, 2);
    /* and the little grid of orange dots at the bottom - the diagram in
       Desk ref 1, which is the one thing on that screen you can read
       from across the room */
    for (i = 0; i < 12; i++) {
      c.fillStyle = P.pageOrange;
      c.fillRect(20 + (i % 4) * 8, 76 + Math.floor(i / 4) * 6, 2, 2);
    }
    return t;
  }

  /* ---------------------------------------------------- the pillars

     A tower of hardbacks. Two kinds of course, mixed by seed: SPINE OUT
     (a colour band, its arris as a 1px lit top edge, two pale title
     ticks) and FORE EDGE OUT (a pages band, shaded along the bottom,
     with the cover showing as two thin lines top and bottom). Every
     course is 5 to 8px tall and jogged up to a pixel either way, because
     nobody stacked it straight and a column of identical courses reads
     as corrugated iron.

     The tile is 34 x 64 and LivingRoom.drawColumn tiles it BOTTOM first,
     so the slice that gets cut short is always the one at the far end
     from the cap. */
  function bakePillar(variant) {
    var W = 34, H = 64;
    var t = makeCanvas(W, H), c = t.ctx;
    var r = mulberry32(4120 + variant * 97);
    var y = 0;

    c.fillStyle = P.shade; c.fillRect(0, 0, W, H);
    while (y < H) {
      var ch = 5 + Math.floor(r() * 4);
      if (y + ch > H) ch = H - y;
      var jog = Math.floor(r() * 3) - 1;
      var cover = COVERS[Math.floor(r() * COVERS.length)];
      if (r() < 0.55) spineCourse(c, jog, y, ch, cover, r);
      else edgeCourse(c, jog, y, ch, cover, r);
      /* the shadow between one book and the next */
      c.fillStyle = P.shade; c.fillRect(0, y + ch - 1, W, 1);
      y += ch;
    }

    /* Variant 1 has somebody's sticky note on it and a ribbon marker
       hanging out of one of the covers - the two things that stop a wall
       of books from being a texture and make it a particular pile. */
    if (variant === 1) {
      c.fillStyle = P.outline;    c.fillRect(21, 25, 8, 7);
      c.fillStyle = P.tYellow;    c.fillRect(22, 26, 6, 5);
      c.fillStyle = P.bookYellow; c.fillRect(22, 30, 6, 1);
      c.fillStyle = P.bookRed;    c.fillRect(9, 44, 1, 6);
    }

    /* and the hard edge that lifts a book tower off a beige wall */
    c.fillStyle = P.outline;
    c.fillRect(0, 0, 1, H); c.fillRect(W - 1, 0, 1, H);
    return t;
  }

  function spineCourse(c, x, y, h, cover, r) {
    c.fillStyle = cover[0]; c.fillRect(x, y, 34, h);
    c.fillStyle = cover[1]; c.fillRect(x, y, 34, 1);
    c.fillStyle = P.title;
    var ty = y + 2 + Math.floor(r() * Math.max(1, h - 4));
    c.fillRect(x + 5, ty, 9 + Math.floor(r() * 7), 1);
    c.fillRect(x + 22, ty, 5, 1);
  }

  function edgeCourse(c, x, y, h, cover, r) {
    c.fillStyle = P.pages;      c.fillRect(x, y, 34, h);
    c.fillStyle = P.pagesShade; c.fillRect(x, y + h - 2, 34, 1);
    c.fillStyle = cover[0];
    c.fillRect(x, y, 34, 1); c.fillRect(x, y + h - 2, 34, 1);
    /* the leaves of the block, which is the only thing that stops a
       fore-edge course looking like a strip of masking tape */
    c.fillStyle = P.pagesShade;
    for (var i = 0; i < 5; i++) {
      c.fillRect(x + 3 + Math.floor(r() * 28), y + 1, 1, Math.max(1, h - 3));
    }
    c.fillStyle = P.pagesHi; c.fillRect(x, y + 1, 34, 1);
  }

  /* The mouth of the gap: a fat dictionary laid flat across the top of
     the tower, face up or face down. Four bands - cover, its arris, the
     block of pages and the cover again - and an outline top and bottom,
     so the end of a plank is the most legible 9 pixels in the bay. */
  function bakeCap(down) {
    var W = 42, H = 9;
    var t = makeCanvas(W, H), c = t.ctx;
    var rows = [P.outline, P.bookBlackHi, P.bookBlack,
                P.pages, P.pagesHi, P.pagesShade,
                P.bookBlack, P.bookBlack, P.outline];
    for (var i = 0; i < H; i++) {
      c.fillStyle = rows[down ? H - 1 - i : i];
      c.fillRect(0, i, W, 1);
    }
    c.fillStyle = P.outline; c.fillRect(0, 0, 1, H); c.fillRect(W - 1, 0, 1, H);
    /* a ribbon marker trailing out of the end of it */
    c.fillStyle = P.bookRed; c.fillRect(34, down ? 0 : H - 3, 2, 3);
    return t;
  }

  /* ------------------------------------------------- the falling book

     Two ways round, and in the data the only difference between them is
     `dir`. FLAT is a long low thing to duck under or hop over; UP is a
     narrow thing to sidestep. That is the opposite dodge out of the same
     hazard.

     THERE IS NO TUMBLING. A box that swapped shape mid-fall could not be
     dodged honestly, and the player would be right to be annoyed.

     AND THE FORE EDGE IS LIT. Not one rectangle in here moved for the
     daylight cut; what moved is which paper they are painted in. The
     fore-edge band and the title row come out of dropPages / dropPagesHi
     / dropTitle instead of the stack's pages / pagesHi / title, because
     a book falling through the middle of the room is in the window's
     light and a book wedged in a pile is not. That is the whole fix for
     the hazard that lost its contrast, and it is lighting, not shape.

     WHY IT HAS TO BE A BAND AND NOT A BRIGHTER COVER. The covers are
     load-bearing: they are what the tower is made of, and they are dark
     on purpose so the plank separates from a bright lane. The drop
     cannot be lightened by lightening them. What it can have is the one
     part of a book that is paper, and 10% of the flat sprite being 208
     to 236 is worth more to the eye than the whole cover being ten
     brighter, because it is a CONTRAST inside the sprite as well as
     against the room - which is why it reads at any height, over the
     bright wall and over the near-black knee hole alike.

     The worst placement in the bay, over all 14,400 the census walks, is
     a black hardback lying flat across the knee hole at x 200, y 214,
     where the backdrop is a flat 23: mean |dL| 32.4, against 11.7 when
     this sprite shared the stack's paper. Nothing is under 25, and
     nothing is under 30. The full table is in P, under dropPages. */
  function bakeBookDrop(dir, ci) {
    var cover = COVERS[ci];
    var flat = dir === 'flat';
    var t = makeCanvas(flat ? 24 : 8, flat ? 8 : 24), c = t.ctx;

    if (flat) {
      c.fillStyle = P.outline;      c.fillRect(0, 0, 24, 8);
      c.fillStyle = cover[0];       c.fillRect(1, 1, 22, 6);
      c.fillStyle = cover[1];       c.fillRect(1, 1, 22, 1);  /* the lit top face */
      c.fillStyle = P.dropPages;    c.fillRect(18, 2, 4, 5);
      c.fillStyle = P.dropPagesHi;  c.fillRect(18, 2, 4, 1);
      c.fillStyle = P.dropTitle;    c.fillRect(4, 4, 8, 1);
    } else {
      c.fillStyle = P.outline;      c.fillRect(0, 0, 8, 24);
      c.fillStyle = cover[0];       c.fillRect(1, 1, 4, 22);
      c.fillStyle = cover[1];       c.fillRect(1, 1, 1, 22);
      c.fillStyle = P.dropTitle;    c.fillRect(2, 7, 3, 1); c.fillRect(2, 11, 3, 1);
      c.fillStyle = P.dropPages;    c.fillRect(5, 1, 2, 22);
      c.fillStyle = P.dropPagesHi;  c.fillRect(5, 1, 1, 22);
    }
    return t;
  }

  /* ------------------------------------------------------- the mint

     Nine pixels across, so it is plotted row by row out of a shape table
     rather than drawn with shapes: at that size the shape IS the pixels.
     The 1px rim goes on FIRST, as a fattened copy underneath, which is
     the Coop's egg exactly. The sprite is 11 wide so the rim has
     somewhere to live, and is blitted at (x-5, y-5) - which puts the
     9px mint dead on the drop's centre. */
  var MINT_ROWS = [[3, 3], [1, 7], [1, 7], [0, 9], [0, 9], [0, 9], [1, 7], [1, 7], [3, 3]];

  function bakeMint() {
    var t = makeCanvas(11, 11), c = t.ctx;
    LivingRoom.rowsOutline(c, MINT_ROWS, 1, 1, P.mintEdge);
    LivingRoom.rowsFill(c, MINT_ROWS, 1, 1, P.mintWhite);
    /* the lower right falls away from the lamp */
    c.fillStyle = P.mintShade;
    c.fillRect(6, 5, 3, 1); c.fillRect(5, 6, 4, 1); c.fillRect(5, 7, 3, 1);
    c.fillStyle = P.mintCore; c.fillRect(3, 3, 2, 1); c.fillRect(3, 4, 1, 1);
    return t;
  }

  /* ----------------------------------------------------- the quarter

     A coin turning on its vertical axis, as four baked frames 11, 7, 3
     and 7 pixels wide. Nothing rotates a canvas: a frame is a fresh
     raster at a new angle, so a spinning coin on the nearest-neighbour
     layer never resamples and never shimmers. The 3-wide frame is the
     edge on, and it is REEDED - the little milled ridges are the one
     detail that says quarter and not button. */
  var COIN_W = [11, 7, 3, 7];

  /* the [offset, width] rows of an ellipse `w` across and 11 tall, in an
     11-wide sprite */
  function coinRows(w) {
    var rows = [], i;
    for (i = 0; i < 11; i++) {
      var k = (i - 5) / 5.5;
      var hw = Math.round((w / 2) * Math.sqrt(Math.max(0, 1 - k * k)));
      if (hw < 1 && w >= 3) hw = 1;
      rows.push([5 - hw, Math.max(1, hw * 2)]);
    }
    return rows;
  }

  function bakeCoin(f) {
    var w = COIN_W[f];
    var rows = coinRows(w);
    var t = makeCanvas(13, 13), c = t.ctx;
    var i;

    LivingRoom.rowsOutline(c, rows, 1, 1, P.silverEdge);
    LivingRoom.rowsFill(c, rows, 1, 1, P.silverMid);

    if (w === 3) {
      /* edge on: the reeding, and nothing else - there is no face to see */
      for (i = 1; i < 12; i++) {
        c.fillStyle = (i % 2) ? P.silverDark : P.silverHi;
        c.fillRect(5, i, 3, 1);
      }
      c.fillStyle = P.silverWarm; c.fillRect(5, 3, 1, 5);
      return t;
    }

    /* the rim, the head, and the lamp catching the left-hand edge */
    c.fillStyle = P.silverHi;
    for (i = 0; i < rows.length; i++) {
      c.fillRect(1 + rows[i][0], 1 + i, 1, 1);
      c.fillRect(rows[i][0] + rows[i][1], 1 + i, 1, 1);
    }
    c.fillStyle = P.silverWarm;
    for (i = 3; i < 8; i++) c.fillRect(1 + rows[i][0], 1 + i, 1, 1);
    c.fillStyle = P.silverDark;
    c.fillRect(6 - Math.floor(w / 6), 5, Math.max(1, Math.round(w / 4)), 3);
    return t;
  }

  /* ---------------------------------------------------- the app icons

     Eight baked sprites: four apps, each quiet and ringing. The tile is
     13x13 with its corners cut, ringed in outline and then in a 1px pale
     inner rim, with the app colour between a lit top row and a two-row
     dark band at the bottom; the glyph is pure white, which is the only
     pure white in the bay; and a 5x5 red badge overhangs the top-right
     corner with a single pale stroke in it for the "1".

     15x15 of sprite, with the tile at (0, 2) so the badge has somewhere
     to overhang to. The tile's centre is therefore at sprite (6, 8),
     which is what everything downstream is measured from. */
  var APP = [
    { body: '#34c759', hi: '#7fe49a', dk: '#1f8f3c' },   /* 0 phone    */
    { body: '#2f8ff0', hi: '#7fbcf8', dk: '#1b5ea8' },   /* 1 mail     */
    { body: '#f6f8fa', hi: '#ffffff', dk: '#aab0b6' },   /* 2 calendar */
    { body: '#2f8ff0', hi: '#7fbcf8', dk: '#1b5ea8' }    /* 3 chat     */
  ];

  /* the rounded tile, as [offset, width] rows - 13 across with one pixel
     off each corner and two off the extreme corners */
  var TILE_ROWS = [
    [3, 7], [1, 11], [1, 11], [0, 13], [0, 13], [0, 13], [0, 13],
    [0, 13], [0, 13], [0, 13], [1, 11], [1, 11], [3, 7]
  ];

  /* 15 wide and SIXTEEN tall. The tile's thirteen rows start at y 2, so
     rowsOutline puts its bottom cap on row 15 - which falls off the end
     of a 15px canvas and leaves the one edge of the icon that has to
     stand against pale oak with no outline under it at all. The extra
     row costs nothing: the sprite is blitted from its top-left and the
     tile's centre is still at local (6, 8). */
  function bakeIcon(app, ringing) {
    var t = makeCanvas(15, 16), c = t.ctx;
    var a = APP[app];
    var ox = ringing ? 1 : 0, oy = 2;
    var i;

    LivingRoom.rowsOutline(c, TILE_ROWS, ox, oy, P.outline);
    LivingRoom.rowsFill(c, TILE_ROWS, ox, oy, a.body);
    /* the pale inner rim: the first and last pixel of every row */
    c.fillStyle = P.appRim;
    for (i = 0; i < TILE_ROWS.length; i++) {
      c.fillRect(ox + TILE_ROWS[i][0], oy + i, 1, 1);
      c.fillRect(ox + TILE_ROWS[i][0] + TILE_ROWS[i][1] - 1, oy + i, 1, 1);
    }
    c.fillStyle = a.hi; c.fillRect(ox + 2, oy + 1, 9, 1);
    c.fillStyle = a.dk; c.fillRect(ox + 1, oy + 10, 11, 2);

    /* the glyph. Four shapes, each hand-plotted, each one readable at
       3x on a screen the player is dodging past at 170px a second. */
    c.fillStyle = (app === 2) ? P.badge : P.appGlyph;
    if (app === 0) {                       /* a handset, lying at an angle */
      c.fillRect(ox + 3, oy + 4, 3, 2);
      c.fillRect(ox + 5, oy + 6, 3, 2);
      c.fillRect(ox + 7, oy + 7, 3, 2);
      c.fillRect(ox + 8, oy + 5, 2, 2);
      c.fillRect(ox + 3, oy + 7, 2, 2);
    } else if (app === 1) {                /* an envelope with its flap    */
      c.fillRect(ox + 2, oy + 4, 9, 6);
      c.fillStyle = a.dk;
      c.fillRect(ox + 3, oy + 5, 3, 1); c.fillRect(ox + 7, oy + 5, 3, 1);
      c.fillRect(ox + 5, oy + 6, 3, 1);
    } else if (app === 2) {                /* a calendar page, red banner  */
      c.fillRect(ox + 2, oy + 3, 9, 3);
      c.fillStyle = P.pageGrey;
      c.fillRect(ox + 3, oy + 7, 2, 2); c.fillRect(ox + 6, oy + 7, 2, 2);
      c.fillRect(ox + 3, oy + 10, 2, 1);
    } else {                               /* a speech bubble with a tail  */
      c.fillRect(ox + 2, oy + 3, 9, 6);
      c.fillRect(ox + 3, oy + 9, 3, 2);
      c.fillStyle = a.dk;
      c.fillRect(ox + 4, oy + 5, 5, 1); c.fillRect(ox + 4, oy + 7, 3, 1);
    }

    /* the badge, overhanging the top-right corner */
    c.fillStyle = P.outline; c.fillRect(9, 0, 6, 6);
    c.fillStyle = P.badge;   c.fillRect(10, 0, 5, 5);
    c.fillStyle = P.badgeHi; c.fillRect(10, 0, 5, 1);
    c.fillStyle = P.badgeInk; c.fillRect(12, 1, 1, 3);

    /* and, on the ringing frame, the two little arcs beside it */
    if (ringing) {
      c.fillStyle = P.ringArc;
      c.fillRect(8, 1, 1, 1); c.fillRect(7, 3, 1, 1);
    }
    return t;
  }

  /* ----------------------------------------------------- the mug

     The spare life. A white mug on a paper napkin, baked separately in
     one shared coordinate space so that drawing both at the same origin
     reassembles the picture - and Gerald's hunger can drag the mug off
     the napkin and leave the napkin on the boards. */
  function bakeMug() {
    var t = makeCanvas(16, 12), c = t.ctx;
    c.fillStyle = P.outline;  c.fillRect(0, 0, 13, 12);
    c.fillStyle = P.mugWhite; c.fillRect(1, 1, 11, 10);
    c.fillStyle = P.mugShade; c.fillRect(9, 2, 2, 9);
    c.fillStyle = P.mugRim;   c.fillRect(1, 1, 11, 1);
    c.fillStyle = P.coffee;   c.fillRect(2, 2, 9, 2);
    c.fillStyle = P.coffeeHi; c.fillRect(3, 2, 3, 1);
    /* the handle, on the right, where the light has to get round it */
    c.fillStyle = P.outline;
    c.fillRect(13, 3, 3, 1); c.fillRect(15, 4, 1, 4); c.fillRect(13, 8, 3, 1);
    c.fillStyle = P.mugWhite; c.fillRect(13, 4, 2, 4);
    c.fillStyle = P.mugShade; c.fillRect(14, 6, 1, 2);
    return t;
  }

  function bakeNapkin() {
    var t = makeCanvas(18, 3), c = t.ctx;
    c.fillStyle = P.outline; c.fillRect(0, 2, 18, 1);
    c.fillStyle = P.napkin;  c.fillRect(0, 0, 18, 2);
    c.fillStyle = P.mugShade;
    c.fillRect(3, 1, 2, 1); c.fillRect(12, 1, 3, 1);
    return t;
  }

  /* ---------------------------------------------------------- build */

  function build() {
    /* the room first, every time, and it bakes only once */
    LivingRoom.build();
    T.ceiling = LivingRoom.bakeCeiling(null);

    T.wall  = bakeWall();
    T.shelf = bakeShelves();
    T.furn  = bakeFurniture();
    T.page  = bakePage();

    T.pillar  = [bakePillar(0), bakePillar(1)];
    T.capDown = bakeCap(true);
    T.capUp   = bakeCap(false);

    /* a flat and an upright copy of every cover, so a book that falls is
       a particular book and not a recoloured rectangle */
    T.bookFlat = []; T.bookUp = [];
    for (var i = 0; i < COVERS.length; i++) {
      T.bookFlat.push(bakeBookDrop('flat', i));
      T.bookUp.push(bakeBookDrop('up', i));
    }

    T.mint = bakeMint();
    T.coin = [];
    for (i = 0; i < 4; i++) T.coin.push(bakeCoin(i));

    T.icon = [];
    for (i = 0; i < 4; i++) T.icon.push([bakeIcon(i, false), bakeIcon(i, true)]);

    T.mug    = bakeMug();
    T.napkin = bakeNapkin();
  }

  /* ================================================================
     DRAWING
     ================================================================ */

  /* Three baked layers at the Coop's rates, the live screens over the
     top of the nearest one, and then the ROOM's light. There is no
     vignette and no gloom in here: drawLight blits the one baked sheet
     that lights all five bays - it was five flat Tints and has not been
     since the pass was rebuilt - and a bay that shaded its own corners
     would read as a different house. */
  function drawBackdrop(ctx, scroll) {
    /* the module clock, set here because drawBackdrop is the first thing
       called every frame, and the raw scroll beside it for pickPop */
    clock = scroll * 0.012;
    scrollNow = scroll;

    ctx.fillStyle = P.wallMid;
    ctx.fillRect(0, 0, VW, VH);
    tileX(ctx, T.wall.canvas, scroll * 0.14, 0);
    tileX(ctx, T.shelf.canvas, scroll * 0.26, 0);
    tileX(ctx, T.furn.canvas, scroll * FURN_RATE, 0);
    drawScreens(ctx, scroll);

    LivingRoom.drawLight(ctx);
  }

  function drawMenuBackdrop(ctx, scroll) { LivingRoom.drawMenuBackdrop(ctx, scroll); }
  function drawCeiling(ctx, scroll) { LivingRoom.drawCeiling(ctx, scroll, T.ceiling); }
  /* this bay is bare board right up to the wall */
  function drawFloor(ctx, scroll) { LivingRoom.drawFloor(ctx, scroll); }

  /* ------------------------------------------- the three sequences

     Drawn live, for every visible copy of the furniture tile, and every
     one of them keyed off `scroll` rather than off a clock - so all three
     screens stop dead behind the pause scrim, speed up as the run does,
     and are in exactly the same state on two frames drawn at the same
     scroll. Nothing here reads a dt, a timer or Date.now.

     Each screen is tinted by void 3 after its content goes down, which
     is the same tint the furniture tile was baked with: a live screen
     that skipped it would be the brightest thing on the layer, and the
     one thing this bay cannot afford is something out-competing a book
     tower for the eye. */
  function drawScreens(ctx, scroll) {
    var step = T.furn.w;
    var start = -mod(scroll * FURN_RATE, step);
    for (var x = start; x < VW; x += step) {
      var ox = Math.round(x);
      if (ox > VW || ox + step < 0) continue;
      screenSaver(ctx, ox + 30, 136, scroll);
      screenSession(ctx, ox + 136, 118, scroll);
      screenPage(ctx, ox + 202, 147, scroll);
    }
  }

  /* The all-in-one is not asleep after all: there is a screensaver
     bouncing about on it. Two triangle waves and no state - the logo
     changes colour on every bounce because the two wave COUNTS decide
     the tint, so the colour and the corner it came off are the same
     fact told twice. */
  var LOGO_TINTS = ['#9a95bd', '#bd9a95', '#95bda9', '#a995bd'];

  function screenSaver(ctx, sx, sy, scroll) {
    var lx = Math.round(tri(scroll * 0.09, 63));
    var ly = Math.round(tri(scroll * 0.06, 45));
    var ti = mod(Math.floor(scroll * 0.09 / 63) + Math.floor(scroll * 0.06 / 45), 4);
    ctx.fillStyle = P.screenReflect;
    ctx.fillRect(sx + lx + 1, sy + ly + 1, 9, 5);
    ctx.fillStyle = LOGO_TINTS[ti];
    ctx.fillRect(sx + lx, sy + ly, 9, 5);
    Tint.rect(ctx, sx, sy, 72, 50, P.void, SCREEN_DIM);
    Tint.rect(ctx, sx, sy, 72, 50, P.void, 3);
  }

  /* The portrait screen is playing something: one row of six cells lights
     up at a time, stepping down the session a row every 44px of world,
     and the little play triangle in the header flicks on the even rows. */
  function screenSession(ctx, sx, sy, scroll) {
    var row = mod(Math.floor(scroll / 44), 14);
    var col;
    for (col = 0; col < 6; col++) {
      ctx.fillStyle = P.dawPlay;
      ctx.fillRect(sx + col * 7, sy + 4 + row * 5, 6, 4);
    }
    if (row % 2 === 0) {
      ctx.fillStyle = P.dawHi;
      ctx.fillRect(sx + 2, sy + 1, 1, 2); ctx.fillRect(sx + 3, sy + 2, 1, 1);
    }
    Tint.rect(ctx, sx, sy - 4, 42, 74, P.void, SCREEN_DIM);
    Tint.rect(ctx, sx, sy - 4, 42, 74, P.void, 3);
  }

  /* The widescreen's page, creeping upward. The 96-tall baked tile is
     drawn into the 43px window twice, by SOURCE RECT - not by ctx.clip,
     which would cost a save/restore on every visible copy of a layer
     that is already the most expensive thing on the screen. */
  function screenPage(ctx, sx, sy, scroll) {
    var off = Math.round(mod(scroll * 0.10, T.page.h));
    var first = Math.min(43, T.page.h - off);
    ctx.drawImage(T.page.canvas, 0, off, 102, first, sx, sy, 102, first);
    if (first < 43) {
      ctx.drawImage(T.page.canvas, 0, 0, 102, 43 - first,
                    sx, sy + first, 102, 43 - first);
    }
    Tint.rect(ctx, sx, sy - 5, 102, 48, P.void, SCREEN_DIM);
    Tint.rect(ctx, sx, sy - 5, 102, 48, P.void, 3);
  }

  /* --------------------------------------------------------- pillar */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.pillar[ob.variant].canvas;
    var w = tile.width;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (topH > 0) LivingRoom.drawColumn(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) LivingRoom.drawColumn(ctx, tile, x, botY, w, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* the hard cast shadow on the wall behind. The lamp is low and to the
       left in this bay, so everything throws to the RIGHT. */
    Tint.rect(ctx, x + w, CEIL, 4, topH > 0 ? topH : 0, P.void, 7);
    Tint.rect(ctx, x + w, botY, 4, botH > 0 ? botH : 0, P.void, 7);
  }

  /* ------------------------------------------------- the app icon

     Where it is, as a pure function of ob.x and the four numbers pickPop
     froze on it at birth. drawObstacle and rectsFor both call these and
     neither keeps a copy, for the reason the Mantle's beamX exists: two
     functions that each work out where a hazard is will one day
     disagree, and the one that gets it wrong is always the one with the
     boxes in it.

     NOTHING IN HERE READS `scroll`. It cannot: rectsFor runs inside
     collide(), which is a frame ahead of the next drawBackdrop, so a
     cached scroll would put the boxes one frame off the sprite. The
     furniture layer moves at FURN_RATE and an obstacle at 1, so the two
     differ by a constant the moment you know both once - and ob.popC IS
     that constant. */
  function popX(ob) { return FURN_RATE * ob.x + ob.popC; }

  /* 0 while it is still inside the glass, 1 once it has arrived. */
  function iconP(ob) { return clamp((ob.x0 - ob.x) / POP_RISE, 0, 1); }

  /* The icon closes the gap to its own x LINEARLY, and the ease is spent
     on the climb instead. A linear hand-off travels left for every value
     of ob.popSide smaller than POP_RISE; an eased one needs half of
     that, and pickPop needs the room - see the note on POP_SIDE. */
  function iconCX(ob) {
    return Math.round(ob.x + 6 + ob.popSide * (1 - iconP(ob)));
  }

  function iconCY(ob) {
    var p = iconP(ob);
    var e = 1 - (1 - p) * (1 - p);
    var cy = ob.popY - (ob.popY - ob.hy) * e - POP_KICK * Math.sin(Math.PI * p);
    /* it only bobs once it has got where it is going; a thing that bobbed
       on the way up would read as a balloon rather than as a pop-up */
    if (p >= 1) cy += Math.round(Math.sin((ob.x + ob.seed * 40) * 0.06) * 2);
    return Math.round(cy);
  }

  /* The light a screen throws while a notification is coming out of it,
     in that app's own colour, so the glass tells you which icon is
     arriving before the icon does. One radial field and no Dither
     anywhere near it: the pane this sits on scrolls, and a Bayer grid
     laid over a scrolling pane boils. POP_GLOW is 7 against POP_INSET's
     8, so the bloom is inside the glass with a pixel to spare. */
  function paneGlow(ctx, x, y, r, a, app) {
    if (a <= 0.01 || r < 1) return;
    var c = APP[app];
    LivingRoom.glow(ctx, x, y, r,
                    LivingRoom.rgba(c.hi, a),
                    LivingRoom.rgba(c.body, a * 0.55),
                    LivingRoom.rgba(c.body, 0));
  }

  function drawIcon(ctx, ob) {
    var p = iconP(ob);
    var px = Math.round(popX(ob));
    var i, a, t;

    /* 1. BEFORE: THE SCREEN LIGHTS UP. For the last POP_CHARGE px of
       world the glass glows at the spot the icon is about to come out
       of, from nothing up to full. Nothing APPEARS - it grows out of
       zero - so there is no pop-in to catch the eye, and by the time
       there is something to dodge the player has already been told
       which of the three screens to be watching. Squared, so the first
       half of the charge is barely there and the last quarter is all of
       it. */
    if (p <= 0) {
      var c = clamp((ob.x0 + POP_CHARGE - ob.x) / POP_CHARGE, 0, 1);
      paneGlow(ctx, px, ob.popY, 2 + POP_GLOW * c, 0.34 * c * c, ob.app);
      return;
    }

    var cx = iconCX(ob), cy = iconCY(ob);

    /* 2. THE FLASH: the charge spent. Brightest in the frame the icon
       leaves the glass and gone by a third of the way out. */
    if (p < 0.34) {
      var f = 1 - p / 0.34;
      paneGlow(ctx, px, ob.popY, 2 + POP_GLOW, 0.55 * f, ob.app);
    }

    /* 3. THE SPRAY: four pixels thrown off the spot ON THE GLASS, not
       off the icon. What the eye needs is where the thing came FROM,
       which is why this is the one part of the pop that stays behind. */
    if (p < 0.3) {
      for (i = 0; i < 4; i++) {
        a = i * (TAU / 4) + 0.6;
        ctx.fillStyle = i % 2 ? P.appRim : P.ringArc;
        ctx.fillRect(px + Math.round(Math.cos(a) * p * 10),
                     ob.popY + Math.round(Math.sin(a) * p * 10), 1, 1);
      }
    }

    /* 4. THE TETHER. Three icons in five leave a pane directly under
       where they end up and want nothing here; the rest come off one up
       to POP_SIDE px to the side, because three panes do not cover a
       desk - see pickPop. Four pixels thinning from the glass toward the
       icon, gone by the same third of the way out, is what makes those
       read as one event instead of as two things happening at once. */
    if (p < 0.34 && (ob.popSide > 3 || ob.popSide < -3)) {
      var fade = 1 - p / 0.34;
      for (i = 1; i <= 4; i++) {
        t = i / 5;
        Tint.rect(ctx, Math.round(px + (cx - px) * t),
                  Math.round(ob.popY + (cy - ob.popY) * t), 1, 1,
                  P.ringArc, Math.round(12 * fade * (1 - t)));
      }
    }

    /* 5. The ringing frame is picked off ob.x, like everything else here,
       so it blinks on a 100px beat and holds its phase through a pause. */
    var ringing = mod(ob.x + ob.seed * 50, 100) < 30 ? 1 : 0;
    ctx.drawImage(T.icon[ob.app][ringing].canvas, cx - 6, cy - 8);
  }

  /* ------------------------------------------------- falling things

     Which of the three a drop is, asked of the FLAGS and never of
     anything a maker stored: the engine may set ob.gold or ob.sour after
     makeDrop has returned, and a hitbox that says coin over a sprite that
     says hardback is the one mistake this dispatch exists to prevent. */
  function kindOf(ob) {
    if (ob.gold) return 'coin';
    if (ob.spicy || ob.sour) return 'mint';
    return 'book';
  }

  function drawDrop(ctx, ob) {
    var kind = kindOf(ob);
    var sway = Math.round(Math.sin(ob.spin) * 1.2);
    var x = Math.round(ob.x), y = Math.round(ob.y);
    var i, k, pulse;

    if (kind === 'mint') {
      pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
      LivingRoom.glow(ctx, x + sway, y, Math.round(14 + pulse * 5),
                      'rgba(232,255,246,' + (0.46 * pulse).toFixed(3) + ')',
                      'rgba(143,227,200,' + (0.22 * pulse).toFixed(3) + ')',
                      'rgba(47,143,116,0)');
      /* three cold sparkles rising off it - the Garden's pepper-spark
         formula, which is cheap and never repeats visibly */
      for (i = 0; i < 3; i++) {
        k = mod(ob.spin * 0.7 + i * 0.41, 1);
        var my = y - 8 - Math.round(k * 7);
        if (my < CEIL) continue;
        ctx.fillStyle = i % 2 ? P.mintCore : P.mintGlow;
        ctx.fillRect(x + sway - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), my, 1, 1);
      }
      LivingRoom.blitBelowCeil(ctx, T.mint.canvas, x + sway - 5, y - 5);
      return;
    }

    if (kind === 'coin') {
      pulse = 0.72 + 0.28 * Math.sin(ob.spin * 2.6);
      LivingRoom.glow(ctx, x + sway, y, Math.round(12 + pulse * 3),
                      'rgba(233,220,192,' + (0.30 * pulse).toFixed(3) + ')',
                      'rgba(198,201,200,' + (0.14 * pulse).toFixed(3) + ')',
                      'rgba(93,98,100,0)');
      /* it falls fast and it is worth five, so it trails ABOVE itself */
      for (i = 0; i < 2; i++) {
        k = mod(ob.spin * 0.9 + i * 0.5, 1);
        var ty = y - 7 - Math.round(k * 6);
        if (ty < CEIL) continue;
        ctx.fillStyle = i ? P.silverHi : P.silverWarm;
        ctx.fillRect(x + sway - 2 + i * 4, ty, 1, 1);
      }
      var f = Math.floor(mod(ob.spin, TAU) / TAU * 4) % 4;
      LivingRoom.blitBelowCeil(ctx, T.coin[f].canvas, x + sway - 6, y - 6);
      return;
    }

    /* the book. Two paper motes hang above either one, in the FALLING
       book's paper rather than the stack's - they came off this book, in
       this light, and a mote the colour of a shelved fore-edge would be
       two pixels of the tower floating in mid air. */
    for (i = 0; i < 2; i++) {
      k = mod(ob.spin * 0.7 + i * 0.41, 1);
      var py = y - 9 - Math.round(k * 7);
      if (py < CEIL) continue;
      ctx.fillStyle = i ? P.dropPagesHi : P.dropPages;
      ctx.fillRect(x - 4 + Math.round(Math.sin(ob.spin * 2 + i) * 4), py, 1, 1);
    }
    if (ob.dir === 'flat') {
      /* a shivering horizontal thing looks wrong, so this one sways in Y,
         exactly as the Construction's lying beam does */
      LivingRoom.blitBelowCeil(ctx, T.bookFlat[ob.cover].canvas, x - 12, y - 4 + sway);
    } else {
      LivingRoom.blitBelowCeil(ctx, T.bookUp[ob.cover].canvas, x + sway - 4, y - 12);
    }
  }

  /* where it is going to land: tightening and darkening as it falls, so
     nothing in this room arrives as a surprise */
  function drawDropSpot(ctx, ob) {
    if (ob.broken > 0) return;
    var k = clamp((ob.y - CEIL) / (FLOOR - CEIL), 0, 1);
    var kind = kindOf(ob);
    var w, col;
    if (kind === 'book' && ob.dir === 'flat') { w = Math.round(22 - k * 6); col = P.void; }
    else if (kind === 'book') { w = Math.round(11 - k * 5); col = P.void; }
    else if (kind === 'coin') { w = Math.round(11 - k * 5); col = P.silverHi; }
    else { w = Math.round(11 - k * 5); col = P.mintGlow; }
    Tint.rect(ctx, Math.round(ob.x - w / 2), FLOOR + 1, w, 3, col, 6 + k * 9);
  }

  function drawDropSplat(ctx, ob) {
    var k = clamp(ob.broken / SPLAT_TIME, 0, 1);
    var x = Math.round(ob.x);
    var a = ctx.globalAlpha;
    var kind = kindOf(ob);
    var i;
    ctx.globalAlpha = a * Math.min(1, k * 2.2);

    if (kind === 'book') {
      /* it has landed face down and open: a shallow tent of two covers
         meeting at a ridge of pages, which is how a hardback actually
         lands and is the only splat in the game that is a SHAPE.

         The ridge and the two splayed leaves are the FALLING book's
         paper, not the stack's, for two reasons. It is the same book it
         was a frame ago, and it is still out in the open. And the floor
         of this bay is the darkest band in it, so a splat in the stack's
         61 would land on the boards and disappear - which is the one
         place the player has to be able to see that the thing which was
         chasing them has stopped. PlayScene's twelve burst particles are
         FX.splat / FX.splatHi, which ARE these two pigments; the burst
         and the thing it came off are now one decision. */
      var cover = COVERS[ob.cover];
      ctx.fillStyle = P.dropPagesHi; ctx.fillRect(x - 2, FLOOR + 1, 4, 1);
      for (i = 1; i < 6; i++) {
        var hw = 2 + i * 2;
        ctx.fillStyle = cover[i < 3 ? 1 : 0];
        ctx.fillRect(x - hw, FLOOR + i, hw * 2, 1);
      }
      ctx.fillStyle = P.dropPages;
      ctx.fillRect(x - 12, FLOOR + 5, 3, 1); ctx.fillRect(x + 9, FLOOR + 5, 3, 1);
      ctx.fillStyle = P.outline; ctx.fillRect(x - 12, FLOOR + 6, 24, 1);
    } else if (kind === 'coin') {
      /* a quarter nobody caught, lying flat and dulling */
      ctx.fillStyle = P.silverMid; ctx.fillRect(x - 5, FLOOR + 1, 11, 2);
      ctx.fillStyle = P.silverHi;  ctx.fillRect(x - 5, FLOOR + 1, 11, 1);
      ctx.fillStyle = P.silverEdge;
      ctx.fillRect(x - 5, FLOOR + 1, 1, 2); ctx.fillRect(x + 5, FLOOR + 1, 1, 2);
    } else {
      /* a mint fizzing itself out on the boards */
      ctx.fillStyle = P.mintShade; ctx.fillRect(x - 5, FLOOR + 1, 10, 2);
      var blink = Math.floor(ob.broken * 11) % 2;
      ctx.fillStyle = P.mintCore;
      ctx.fillRect(x - 3, FLOOR + blink, 1, 1);
      ctx.fillRect(x + 3, FLOOR + 1 - blink, 1, 1);
    }
    ctx.globalAlpha = a;
  }

  /* ------------------------------------------------------- the mug

     The spare life. It publishes no `y`, so the engine's default grab
     point - FLOOR - 12 - is the right one: a mug somebody left on the
     boards is grabbed where a mug on the boards is.

     The steam is clocked off `clock` PLUS ob.phase and never off
     ob.phase alone. Nothing in the engine advances a boon's phase; a
     pulse that reads it by itself is frozen, which is the Garden
     rosette's bug and not a thing to copy. */
  function drawBoon(ctx, ob) {
    if (ob.taken) return;
    var nx = Math.round(ob.x);
    var rx = Math.round(ob.x + ob.dx), ry = Math.round(FLOOR - 14 + ob.dy);
    var i;

    /* the napkin stays on the boards wherever the mug gets to */
    /* not under a crow's talons (ob.held, Crow's ORDNANCE): the gift has left its napkin */
    if (!ob.held) ctx.drawImage(T.napkin.canvas, nx - 9, FLOOR - 2);

    /* the succulent's exact glow: a life is a life, in any level */
    var pulse = 0.7 + 0.3 * Math.sin(clock * 2.1 + ob.phase);
    LivingRoom.glow(ctx, rx + 6, ry + 5, Math.round(15 + pulse * 4),
                    'rgba(147,216,189,' + (0.34 * pulse).toFixed(3) + ')',
                    'rgba(95,174,154,' + (0.14 * pulse).toFixed(3) + ')',
                    'rgba(47,107,98,0)');

    ctx.drawImage(T.mug.canvas, rx - 8, ry);

    /* three threads of steam off the surface */
    for (i = 0; i < 3; i++) {
      var k = mod(clock * 0.5 + ob.phase + i * 0.33, 1);
      var sy = ry - 1 - Math.round(k * 9);
      if (sy < CEIL) continue;
      ctx.fillStyle = i === 1 ? P.steam : P.mugRim;
      ctx.fillRect(rx - 5 + i * 3 + Math.round(Math.sin(k * 5 + i) * 1.5), sy, 1, 1);
    }
  }

  /* ---------------------------------------------- ground dressing

     Harmless, boxless, and the reason the boards are not an empty
     stripe: the things that fall off a desk and never get picked up. */
  function drawLitter(ctx, ob) {
    var x = Math.round(ob.x), y = FLOOR + 2, i;
    if (ob.kind === 0) {                    /* a black pen */
      ctx.fillStyle = P.cable;   ctx.fillRect(x, y + 2, 10, 2);
      ctx.fillStyle = P.cableHi; ctx.fillRect(x + 7, y + 2, 1, 2);
      ctx.fillStyle = P.outline; ctx.fillRect(x + 10, y + 2, 1, 2);
    } else if (ob.kind === 1) {             /* a coil of cable */
      ctx.fillStyle = P.cable;
      for (i = 0; i < 12; i++) {
        ctx.fillRect(x + i, y + 2 + ((i * 5) % 3), 1, 1);
        ctx.fillRect(x + i, y + 4 - ((i * 3) % 3), 1, 1);
      }
      ctx.fillStyle = P.cableHi; ctx.fillRect(x + 5, y + 3, 1, 1);
    } else {                                /* a sticky note, face up */
      ctx.fillStyle = P.bookYellow; ctx.fillRect(x + 1, y + 3, 6, 3);
      ctx.fillStyle = P.tYellow;    ctx.fillRect(x, y + 2, 6, 3);
      ctx.fillStyle = P.drawerShade; ctx.fillRect(x + 1, y + 3, 4, 1);
    }
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'spike') drawIcon(ctx, ob);
    else if (ob.type === 'litter') drawLitter(ctx, ob);
    else if (ob.type === 'boon') drawBoon(ctx, ob);
    else if (ob.type === 'drop') { if (ob.broken > 0) drawDropSplat(ctx, ob); else drawDrop(ctx, ob); }
  }

  /* ================================================================
     THE COVER ART

     The Desk's painters for its cover. js/cover.js lays it out, times
     it and paints the doodad; this says what the bay looks like.

     It has to look like the level actually looks, which for this bay
     means four things have to be in it: a PALE TOP - the only cover in
     the game whose ceiling is plaster rather than sky or rafters, and
     the tell that this is a room; a shutter; the desk with its drawers
     and its lit screens, every one of them running its own sequence;
     and the app icon with its red badge, which is the one thing nobody
     will mistake for another level. The book towers are the columns.
     ================================================================ */

  /* the desktop's row on a card: DESK_Y, carried over by the lane */
  function coverDeskY(S) { return S.top + Math.round(S.lane * (DESK_Y - CEIL) / (FLOOR - CEIL)); }

  var COVER = {
    halo: P.shade,
    ink: P.outline,

    back: function (ctx, S) {
      var x = S.x, y = S.y, w = S.w, h = S.h, q = S.k * 2.4, i, n;
      var deskY = coverDeskY(S);

      /* the wall, with the lamp pool on the left third. Three nested
         bands rather than one, so it reads as light falling off rather
         than as a rectangle somebody painted a different colour. */
      ctx.fillStyle = P.wallMid; ctx.fillRect(x, y, w, h);
      Tint.rect(ctx, x, y, Math.round(w * 0.40), h, P.wallLamp, 3);
      Tint.rect(ctx, x, y + Math.round(h * 0.2), Math.round(w * 0.28), Math.round(h * 0.6), P.wallLamp, 3);
      Tint.rect(ctx, x, y + Math.round(h * 0.35), Math.round(w * 0.16), Math.round(h * 0.3), P.wallLamp, 3);
      Tint.rect(ctx, x + Math.round(w * 0.5), y, Math.round(w * 0.5), h, P.wallDark, 4);

      /* A shutter, upper right - AND THE DAY BEHIND IT, drifting at a
         seventh of the lane. Three of slat, one of shadow and one of sky
         on the big card, with the bay's lit arris dropped because a
         single pale row at card scale only greys the slat it sits under.
         The sky row is the one thing on this card that is not a room,
         and the window is where this bay's daylight comes from. */
      var shW = Math.round(w * 0.3), shH = Math.round(h * 0.26);
      var shY = S.top + Math.max(1, Math.round(4 * q)), edge = Math.max(2, Math.round(4 * q));
      var pitch = Math.max(3, Math.round(5 * q)), slat = pitch - 2;
      var every = Math.round(w * 1.5);
      var sx0 = x + w - shW - edge - Math.round(mod(S.s * 0.14, every));
      for (n = 0; n < 2; n++) {
        var shX = sx0 + n * every;
        if (shX >= x + w || shX + shW <= x) continue;
        ctx.fillStyle = P.shutterFrame; ctx.fillRect(shX, shY, shW, shH);
        for (i = 2; i + pitch - 1 < shH - 2; i += pitch) {
          ctx.fillStyle = P.louvre;    ctx.fillRect(shX + 2, shY + i, shW - 4, slat);
          ctx.fillStyle = P.louvreGap; ctx.fillRect(shX + 2, shY + i + slat, shW - 4, 1);
          ctx.fillStyle = P.daySky;    ctx.fillRect(shX + 2, shY + i + slat + 1, shW - 4, 1);
        }
        ctx.fillStyle = P.shutterLit; ctx.fillRect(shX, shY, shW, 1);
      }

      /* The desk line, two drawer fronts and their pulls. The knee hole
         goes down FIRST and stays dark, because without it the drawers
         are two pale rectangles with nothing between them and the desk
         reads as a shelf. On the stands' little set there is no room for
         a drawer, and the knee hole is the desk. */
      ctx.fillStyle = P.shade;    ctx.fillRect(x, deskY + 3, w, S.floor - deskY - 3);
      ctx.fillStyle = P.deskLit;  ctx.fillRect(x, deskY, w, 1);
      ctx.fillStyle = P.deskTop;  ctx.fillRect(x, deskY + 1, w, 2);
      ctx.fillStyle = P.deskEdge; ctx.fillRect(x, deskY + 3, w, 1);
      var dw = Math.round(w * 0.4), dh = S.floor - deskY - 6;
      if (dh >= 4) {
        [x + 3, x + Math.round(w * 0.54)].forEach(function (bx) {
          ctx.fillStyle = P.outline;     ctx.fillRect(bx, deskY + 4, dw, dh);
          ctx.fillStyle = P.drawerFace;  ctx.fillRect(bx + 1, deskY + 5, dw - 2, dh - 2);
          if (dh >= 8) {
            ctx.fillStyle = P.drawerPanel; ctx.fillRect(bx + 3, deskY + 7, dw - 6, dh - 6);
            ctx.fillStyle = P.drawerShade; ctx.fillRect(bx + 3, deskY + dh, dw - 6, 1);
          }
          ctx.fillStyle = P.pullBlack;   ctx.fillRect(bx + 5, deskY + 4 + (dh >> 1), dw - 10, 2);
          ctx.fillStyle = P.pullHi;      ctx.fillRect(bx + 5, deskY + 4 + (dh >> 1), dw - 10, 1);
        });
      }

      /* Two of the three screens stand at the back of the desk, each
         running its own sequence in miniature, on the clock rather than
         the scroll so every card plays them at one speed. The widescreen
         is not here: it is the one the notifications come out of, so it
         travels with them (see props). */
      var pw = Math.round(w * 0.14), ph = Math.round(S.lane * 0.35);
      var px = x + Math.round(w * 0.06), py = deskY - ph;
      ctx.fillStyle = P.bezel;   ctx.fillRect(px - 1, py - 1, pw + 2, ph + 2);
      ctx.fillStyle = P.dawGrey; ctx.fillRect(px, py, pw, ph);
      ctx.fillStyle = P.dawHead; ctx.fillRect(px, py, pw, Math.min(2, Math.max(1, ph >> 3)));
      var rows = Math.min(6, Math.floor((ph - 3) / 3)), row = mod(Math.floor(S.t * 2.75), Math.max(1, rows));
      for (i = 0; i < rows; i++) {
        ctx.fillStyle = i === row ? P.dawPlay : P.dawCell;
        ctx.fillRect(px + 1, py + 3 + i * 3, pw - 2, 2);
      }
      /* and the all-in-one, with a dot bouncing about on it */
      var aw = Math.round(w * 0.2), ah = Math.round(S.lane * 0.2);
      var ax = x + Math.round(w * 0.76), ay = deskY - ah;
      ctx.fillStyle = P.bezel;     ctx.fillRect(ax - 1, ay - 1, aw + 2, ah + 2);
      ctx.fillStyle = P.screenOff; ctx.fillRect(ax, ay, aw, ah);
      ctx.fillStyle = P.screenLogo;
      ctx.fillRect(ax + Math.round(tri(S.t * 11, aw - 2)), ay + Math.round(tri(S.t * 7, ah - 2)), 2, 1);
      ctx.fillStyle = P.bezelSilver; ctx.fillRect(ax, ay + ah - 1, aw, 1);
      /* turned down, exactly as they are in the bay - see SCREEN_DIM */
      Tint.rect(ctx, px, py, pw, ph, P.void, SCREEN_DIM);
      Tint.rect(ctx, ax, ay, aw, ah, P.void, SCREEN_DIM);
    },

    /* THE BOOK TOWER: courses of hardbacks, some spine out and some fore
       edge out, every one jogged a pixel because nobody stacked it
       straight, counted from the dictionary at the mouth of the gap so
       the short one ends against the moulding or the boards. Covers are
       hashed off the column, its end and the course, never off x. */
    pillar: function (ctx, x, y, w, h, end, p, S) {
      if (h <= 0) return;
      var q = S.k * 2.4, top = end === 'top';
      var capH = Math.max(2, Math.round(9 * S.k)), proud = Math.max(1, Math.round(4 * S.k));
      var key = p.i * 2 + (top ? 0 : 1), hv, c, d = capH;
      ctx.fillStyle = P.shade; ctx.fillRect(x, y, w, h);
      for (c = 0; d < h; c++) {
        hv = LivingRoom.hash(key * 131 + c * 7 + 5);
        var ch = Math.max(2, Math.round((5 + hv % 4) * q * 0.55));
        var cy = top ? y + h - d - ch : y + d, cb = cy + ch;
        if (cy < y) cy = y;
        if (cb > y + h) cb = y + h;
        var cover = COVERS[(hv >>> 4) % COVERS.length];
        var seam = ch >= 3 ? 1 : 0, jog = (hv >>> 8) & 1;
        var bx = x + 1 + jog, bw = w - 3, rh = cb - cy - seam;
        if (rh > 0) {
          if (((hv >>> 10) % 20) < 11) {
            /* spine out: the cover, its lit arris, a dim title */
            ctx.fillStyle = cover[0]; ctx.fillRect(bx, cy, bw, rh);
            ctx.fillStyle = cover[1]; ctx.fillRect(bx, cy, bw, 1);
            if (rh >= 3) {
              ctx.fillStyle = P.title;
              ctx.fillRect(bx + 2 + (hv >>> 14) % Math.max(1, bw - 6), cy + 1 + (rh > 3 ? 1 : 0), 2, 1);
            }
          } else {
            /* fore edge out: the block of pages between two boards */
            ctx.fillStyle = P.pages;      ctx.fillRect(bx, cy, bw, rh);
            ctx.fillStyle = cover[0];     ctx.fillRect(bx, cy, bw, 1);
            if (rh >= 3) {
              ctx.fillStyle = P.pagesShade; ctx.fillRect(bx, cy + rh - 1, bw, 1);
              ctx.fillRect(bx + 2 + (hv >>> 14) % Math.max(1, bw - 4), cy + 1, 1, rh - 2);
            }
          }
        }
        d += ch;
      }
      /* One tower in three has somebody's sticky note on the standing
         half and a ribbon marker hanging out of the hanging one - what
         stops a wall of books from being a texture. */
      var tag = LivingRoom.hash(p.i * 17 + 3);
      if (tag % 3 === 1) {
        var at = capH + Math.round(S.lane * 0.1);
        if (!top && h > at + 6) {
          ctx.fillStyle = P.outline; ctx.fillRect(x + w - 6, y + at, 5, 4);
          ctx.fillStyle = P.tYellow; ctx.fillRect(x + w - 5, y + at + 1, 3, 2);
        } else if (top && h > at + 4) {
          ctx.fillStyle = P.bookRed; ctx.fillRect(x + (w >> 1) - 2, y + h - at - 3, 1, 3);
        }
      }
      ctx.fillStyle = P.outline;
      ctx.fillRect(x, y, 1, h); ctx.fillRect(x + w - 1, y, 1, h);

      /* The DICTIONARY, laid flat across the mouth of the gap: the bay's
         nine rows - outline, arris, board, pages, board - folded to what
         the card has, the outline always on the gap's edge. */
      var rows = capH >= 4 ? [P.outline, P.bookBlackHi, P.pages, P.bookBlack]
               : capH === 3 ? [P.outline, P.pagesHi, P.bookBlack] : [P.outline, P.pagesHi];
      var capY = top ? y + h - capH : y, r;
      for (r = 0; r < capH; r++) {
        ctx.fillStyle = rows[Math.min(r, rows.length - 1)];
        ctx.fillRect(x - proud, top ? y + h - 1 - r : y + r, w + proud * 2, 1);
      }
      ctx.fillStyle = P.outline;
      ctx.fillRect(x - proud, capY, 1, capH); ctx.fillRect(x + w + proud - 1, capY, 1, capH);
      /* a ribbon marker trailing out of its far side */
      if (tag & 1) {
        ctx.fillStyle = P.bookRed;
        ctx.fillRect(x + w - 2, top ? capY - 1 : capY + capH - 1, 1, 2);
      }
      /* the hard cast shadow: the lamp is low and to the left in this
         bay, so everything throws to the RIGHT */
      Tint.rect(ctx, x + w, y, proud, h, P.void, 7);
    },

    /* THE WHOLE POINT OF THIS COVER. Every other card in the game has
       sky, leaf or rafters across the top; this one has plaster and
       crown moulding, and the hard rows under it are the rows the bay
       itself uses. A player looking at the level select learns from this
       picture alone that the Living Room has a lid, before they are ever
       told it kills. The pendants and their pools pass at the lane's own
       pace, one per 240 px of world, as the room's tile lays them. */
    ceiling: function (ctx, S) {
      var x = S.x, w = S.w, y = S.y, d = S.top - S.y, n;
      var hard = d >= 8 ? 4 : 3, pr = d - hard;
      ctx.fillStyle = R.plasterMid; ctx.fillRect(x, y, w, pr);
      var every = Math.max(24, Math.round(240 * S.k)), poolW = Math.round(w * 0.3);
      var first = x + Math.round(w * 0.45) - Math.round(mod(S.s, every));
      for (n = -1; n < Math.ceil(w / every) + 1; n++) {
        var lx = first + n * every;
        if (lx + poolW < x || lx - poolW > x + w) continue;
        ctx.fillStyle = R.plasterLit; ctx.fillRect(lx - (poolW >> 1), y, poolW, pr);
        /* the pendant hanging in it */
        var gr = pr >= 6 ? 3 : (pr >= 3 ? 2 : 1), gw = Math.max(3, Math.round(7 * S.k));
        var gy = y + pr - gr, gx = lx - (gw >> 1);
        if (gy > y) { ctx.fillStyle = R.lampRod; ctx.fillRect(lx, y, 1, gy - y); }
        ctx.fillStyle = R.lampGlass; ctx.fillRect(gx, gy, gw, gr);
        ctx.fillStyle = R.outline;   ctx.fillRect(gx - 1, gy, 1, gr); ctx.fillRect(gx + gw, gy, 1, gr);
        ctx.fillStyle = R.lampCore;  ctx.fillRect(lx, gy + (gr > 1 ? 1 : 0), 1, 1);
      }
      var mould = hard === 4 ? [R.crown, R.plasterLit, R.crownShade, R.outline]
                             : [R.crown, R.crownShade, R.outline];
      for (n = 0; n < hard; n++) { ctx.fillStyle = mould[n]; ctx.fillRect(x, y + pr + n, w, 1); }
    },

    /* the oak, with its seams and grain crawling past at the lane's pace */
    floor: function (ctx, S) {
      var x = S.x, w = S.w, fy = S.floor, d = S.y + S.h - S.floor, q = S.k * 2.4, c;
      var off = Math.round(S.s);
      ctx.fillStyle = R.oakLip;   ctx.fillRect(x, fy, w, 1);
      ctx.fillStyle = R.oakLight; ctx.fillRect(x, fy + 1, w, 1);
      ctx.fillStyle = R.oakMid;   ctx.fillRect(x, fy + 2, w, d - 2);
      var seam = Math.max(8, Math.round(w / 4));
      for (c = Math.floor(off / seam); c * seam - off < w; c++) {
        ctx.fillStyle = R.oakSeam; ctx.fillRect(x + c * seam - off, fy + 2, 1, d - 2);
      }
      var gp = Math.max(3, Math.round(6 * q)), gl = Math.max(2, Math.round(3 * q));
      for (c = Math.floor(off / gp) - 1; c * gp - off < w; c++) {
        var hv = LivingRoom.hash(c + 977);
        ctx.fillStyle = hv % 3 ? R.oakGrain : R.oakLight;
        ctx.fillRect(x + c * gp - off + hv % gp, fy + 3 + (hv >>> 5) % Math.max(1, d - 4), gl, 1);
      }
      /* The boards are the biggest single block on the card, so they are
         held down two steps: a flat wash over all of them and a deeper one
         under the skirting, the shape the room's own drawLight makes. */
      Tint.rect(ctx, x, fy, w, d, R.nightShade, 4);
      var deep = Math.max(2, Math.round(5 * q));
      Tint.rect(ctx, x, fy + deep, w, d - deep, R.oakShade, 6);
    },

    /* THE SIGNATURE: an app icon COMING OUT OF A SCREEN. The widescreen
       rides each even span on the desktop, narrower than the span so it
       never meets a tower, and runs the bay's own pop as its span comes
       in: the glass charges, flashes, the icon leaves it with a kick and
       climbs - the rise is keyed off how far the span has travelled, the
       way the level keys it off ob.x - and bobs where it stops. Where it
       stops is whichever side of the doodad's line has more room, so it
       never hangs where the doodad has to fly. */
    props: function (ctx, S) {
      var q = S.k * 2.4, deskY = coverDeskY(S), i, j;
      var z = Math.max(4, Math.round(9 * q)), half = Math.ceil(z / 2), bobA = Math.max(1, Math.round(2 * q));
      for (i = 0; i < S.spans.length; i++) {
        var sp = S.spans[i];
        if (sp.i % 2) continue;
        var mx = Math.round((sp.x0 + sp.x1) / 2), sw = sp.x1 - sp.x0;

        /* the widescreen and its page, creeping upward */
        var ww = Math.min(Math.round(102 * S.k), sw - 2 * Math.max(1, Math.round(4 * S.k)) - 4);
        var wh = Math.max(4, Math.round(48 * S.k));
        var wx = mx - (ww >> 1), wy = deskY - wh;
        ctx.fillStyle = P.bezel;     ctx.fillRect(wx - 1, wy - 1, ww + 2, wh + 2);
        ctx.fillStyle = P.pageWhite; ctx.fillRect(wx, wy, ww, wh);
        ctx.fillStyle = P.pageBar;   ctx.fillRect(wx, wy, ww, wh >= 10 ? 2 : 1);
        var lines = Math.floor((wh - 4) / 4), creep = mod(Math.floor(S.t * 4), 4);
        for (j = 0; j < lines; j++) {
          var lw = ww - 4 - (j % 3) * 3;
          if (lw < 2) continue;
          ctx.fillStyle = (j % 3 === 2) ? P.pageOrange : P.pageText;
          ctx.fillRect(wx + 2, wy + 3 + mod(j * 4 - creep, lines * 4), lw, 1);
        }
        Tint.rect(ctx, wx, wy, ww, wh, P.void, SCREEN_DIM);

        /* the pop, on the span's travel: charge over CH px, then the rise
           over RISE, starting once the next tower is in frame */
        var u = S.x + S.w - mx;
        var C = Math.ceil(sw / 2) + 1, CH = Math.max(6, Math.round(46 * S.k));
        var RISE = Math.max(8, Math.round(110 * S.k));
        var gx = mx + Math.round(ww * 0.12), gy = deskY - Math.max(2, Math.round(9 * S.k));
        var g1w = Math.max(3, Math.round(9 * q)), g1h = Math.max(2, Math.round(5 * q));
        var g2w = Math.max(1, Math.round(5 * q)), g2h = Math.max(1, Math.round(4 * q));
        var glow = 0;
        if (u < C) { var c = clamp((u - (C - CH)) / CH, 0, 1); glow = c * c; }
        var rp = clamp((u - C) / RISE, 0, 1);
        if (u >= C && rp < 0.34) glow = 1 - rp / 0.34;
        var hv = LivingRoom.hash(sp.i * 31 + 7), mail = hv % 4 === 1;
        var hi = mail ? P.appBlueHi : P.appGreenHi;
        if (glow > 0) {
          Tint.rect(ctx, gx - (g1w >> 1), gy - (g1h >> 1), g1w, g1h, hi, Math.round(10 * glow));
          Tint.rect(ctx, gx - (g2w >> 1), gy - (g2h >> 1), g2w, g2h, hi, Math.round(10 * glow));
        }
        if (u < C) continue;
        /* the spray, thrown off the spot on the glass */
        if (rp < 0.3) {
          for (j = 0; j < 4; j++) {
            var a = j * (Math.PI / 2) + 0.6;
            ctx.fillStyle = j % 2 ? P.appRim : P.ringArc;
            ctx.fillRect(gx + Math.round(Math.cos(a) * rp * 10 * q), gy + Math.round(Math.sin(a) * rp * 10 * q), 1, 1);
          }
        }

        /* where it stops: under the moulding or over the desk, on the
           side of sp.line with more room, at the bay's own standoffs */
        var hy;
        if (sp.line.top - S.top >= deskY - sp.line.bottom) {
          hy = Math.max(S.top + half + bobA + 1,
                        Math.min(S.top + Math.round(30 * S.k) + half, sp.line.top - half - bobA - 1));
        } else {
          hy = Math.min(deskY - half - 1,
                        Math.max(deskY - Math.round(14 * S.k) - half, sp.line.bottom + half + bobA + 1));
        }
        var e = 1 - (1 - rp) * (1 - rp);
        var cy = Math.round(gy - (gy - hy) * e - 5 * q * Math.sin(Math.PI * rp));
        if (rp >= 1) cy += Math.round(Math.sin(S.t * 2.6 + (hv % 628) / 100) * bobA);
        /* and never up into the moulding, kick and badge included */
        cy = Math.max(cy, S.top + half + 3);
        var ix = gx - half, iy = cy - half;
        var bw = Math.max(2, Math.round(5 * q)), bh = Math.max(2, Math.round(4 * q));
        ctx.fillStyle = P.outline;  ctx.fillRect(ix - 1, iy - 1, z + 2, z + 2);
        ctx.fillStyle = mail ? P.appBlue : P.appGreen; ctx.fillRect(ix, iy, z, z);
        ctx.fillStyle = hi;         ctx.fillRect(ix, iy, z, 1);
        ctx.fillStyle = mail ? P.appBlueDk : P.appGreenDk;
        ctx.fillRect(ix, iy + z - (z >= 6 ? 2 : 1), z, z >= 6 ? 2 : 1);
        if (z >= 6) {
          ctx.fillStyle = P.appGlyph;
          ctx.fillRect(ix + Math.round(z * 0.22), iy + Math.round(z * 0.33), Math.round(z * 0.55), Math.max(1, Math.round(z * 0.33)));
        }
        ctx.fillStyle = P.badge;    ctx.fillRect(ix + z - bw + 2, iy - 2, bw, bh);
        if (bh >= 3) { ctx.fillStyle = P.badgeInk; ctx.fillRect(ix + z - (bw >> 1) + 1, iy - 1, 1, bh - 2); }
        if (Math.floor(S.t * 3) % 2 === 0 && z >= 6) {
          ctx.fillStyle = P.ringArc;
          ctx.fillRect(ix + z + 3, iy, 1, 1); ctx.fillRect(ix + z + 4, iy + 3, 1, 1);
        }
      }
    },

    /* A hardback coming down, flat on every other one and upright on the
       rest - the two dodges the level asks for. Its fore edge is the
       falling book's own lit paper, dropPages, not the stack's shadowed
       one: a cover that drew the hazard in the tower's dark paper would
       promise a book the player will not be able to see. */
    drop: function (ctx, d, S) {
      var q = S.k * 2.4, flat = mod(d.i, 4) === 1;
      var L = Math.max(5, Math.round(11 * q)), N = Math.max(3, Math.round(5 * q));
      var bw = flat ? L : N, bh = flat ? N : L;
      var bx = d.x - (bw >> 1), by = d.y - (bh >> 1);
      var cover = COVERS[LivingRoom.hash(d.i * 13 + 1) % COVERS.length];
      ctx.fillStyle = P.outline; ctx.fillRect(bx, by, bw, bh);
      ctx.fillStyle = cover[0];  ctx.fillRect(bx + 1, by + 1, bw - 2, bh - 2);
      ctx.fillStyle = cover[1];
      if (flat) ctx.fillRect(bx + 1, by + 1, bw - 2, 1); else ctx.fillRect(bx + 1, by + 1, 1, bh - 2);
      var pc = bw >= 7 ? 2 : 1;
      ctx.fillStyle = P.dropPages;   ctx.fillRect(bx + bw - 1 - pc, by + 1 + (flat ? 1 : 0), pc, bh - 2 - (flat ? 1 : 0));
      ctx.fillStyle = P.dropPagesHi; ctx.fillRect(bx + bw - 1 - pc, by + 1 + (flat ? 1 : 0), flat ? pc : 1, flat ? 1 : bh - 2);
    },

    /* and one lamp over the whole room */
    front: function (ctx, S) { Tint.rect(ctx, S.x, S.y, S.w, S.h, P.lampWarm, 1); }
  };

  /* ================================================================
     GENERATION

     Every maker takes a trailing `run` = { score, time, late }, which is
     the only way this file learns how far along a run is. This bay does
     not read it: nothing here gets more lethal as the run goes on except
     the numbers the tune already ramps, and a maker that read `scroll`
     to decide difficulty would be reading the wrong thing entirely.
     ================================================================ */

  function makePillar(x, gapY, gapH, run) {
    return { type: 'pillar', x: x, w: 34,
             gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.35) ? 1 : 0, scored: false };
  }

  /* ---------------------------------------- WHICH SCREEN, AND WHEN

     Called once, at birth, and it writes the four numbers the drawing
     and the boxes read for the rest of the icon's life:

       ob.x0       the ob.x at which it leaves the glass
       ob.popC     popX(ob) = FURN_RATE * ob.x + popC, the pop point's
                   screen x - which is to say where that pane is NOW
       ob.popY     the pop point's y, which never moves
       ob.popSide  how far the pop point is from where the icon will
                   finally sit: the gap the hand-off closes

     THE PROBLEM. An obstacle crosses the screen at the scroll's full
     rate and the furniture it is supposed to come out of crosses at
     FURN_RATE, so an icon and a pane drift apart by six pixels for every
     ten the world moves. Worse, the three panes of glass cover 216 of
     the furniture tile's 416 columns and the stretch behind the
     keyboard, the gum tin, the speaker and the pot of ivy is 142 columns
     of desk with no screen on it at all. There is no pair of constants
     that puts a 15px sprite on a pane, at a watchable place on screen,
     for every spawn. Several were tried; the arithmetic says no.

     SO THE ICON IS GIVEN A CHOICE, AND THE CHOICE IS SCORED. For every
     second value of ob.x at which the pop could fire, and for the
     nearest copies of each of the three panes, this works out how far
     off the pop point would be and how far outside the frame, and keeps
     the cheapest. Measured over 4000 births through this function, with
     the scroll stepped right across the 416-column period: every single
     pop point landed inside a pane of glass; an exact hit - the icon
     directly over that glass, popSide 0 - three spawns in five; |popSide|
     45 at the 90th percentile and 80 at the worst; and the pop point
     inside the frame 97 times in 100. The other three come out of a pane
     whose right-hand edge is off screen and slide in already climbing,
     which is the worst this bay can do and is still a notification
     leaving a monitor.

     TWO RULES ARE REJECTIONS AND NOT COSTS, because breaking either is a
     bug rather than a disappointment.

     ONE: |popSide| <= POP_SIDE. The hand-off closes the gap linearly
     over POP_RISE px of ob.x, so the icon's apparent speed is
     (POP_RISE - |popSide|) / POP_RISE of the scroll - 0.27 at the worst
     case of 80 against 110. Slower than the room, which is exactly what
     a thing that has just let go of the background should be, and never
     negative, which would read as the icon being thrown forwards.
     POP_SIDE is 80 and not some rounder number because the widest gap
     between two inset panes is 158 columns, so the nearest pane is never
     more than 79 away - which is also the proof that this scan always
     finds SOMETHING, since the last ob.x it tries clears rule two for
     any popSide at all.

     TWO: the ENGINE's. collide() skips an obstacle at ob.x > player.x +
     46 without ever asking for its boxes, and the icon is drawn - and
     boxed - at ob.x + 6 + popSide*(1-p). A doodad pinned at X_MAX 304
     makes the tightest case, ob.x 350: the box's left edge is then
     351 + popSide*(1-p) and the doodad's reach is 304 + HIT_R 11, so
     anything past 36 pixels of lag would hide a box the player could
     touch. POP_SLACK is 30, six pixels inside that. */
  var POP_SCAN_LO = 404;      /* the earliest ob.x a pop may fire at      */
  var POP_SCAN_HI = 560;      /* and the latest - see rule two            */
  var POP_AIM = 448;          /* the one it is nudged towards             */
  var POP_SIDE = 80;          /* the furthest a pop point may be, in px   */
  var POP_SEEN_LO = 268;      /* the band of screen x where a pane is     */
  var POP_SEEN_HI = 470;      /* comfortably in frame                     */
  var POP_SLACK = 30;         /* how much lag the engine's cull forgives  */

  function pickPop(ob, xb, at) {
    /* The furniture layer's coordinate of the point the icon is born over,
       which is all that is needed to place every copy of every pane for the
       rest of the run.

       `at` is the engine's LIVE scroll, off run.scroll, and not the
       scrollNow this file caches in drawBackdrop. drawBackdrop runs during
       render and the makers run during update, so the cached one is always
       a frame stale - up to six pixels at speedMax. Here that was well
       inside POP_SLACK and invisible, but the Mantle made the same read for
       a laser's phase and it put collision and the drawn beam on opposite
       sides of the lethal window. One frame is one frame; take the live
       number when there is one. */
    var lk = FURN_RATE * (at + xb);
    var best = 1e9, loose = 1e9;
    var x0, i, k, s, lo, hi, lx, q, lp, side, mag, px, seen, cost, n;

    for (x0 = POP_SCAN_LO; x0 <= POP_SCAN_HI; x0 += 2) {
      /* the icon's own centre, in those same layer coordinates: it slides
         0.6 of a column left for every pixel the world moves */
      lx = 0.6 * x0 + 6 + lk;
      q = clamp((x0 - 350) / POP_RISE, 0, 1);
      for (i = 0; i < SCREENS.length; i++) {
        s = SCREENS[i];
        lo = s.x + POP_INSET; hi = s.x + s.w - POP_INSET;
        /* the copy of this pane nearest the icon, and its two neighbours */
        n = Math.round((lx - (lo + hi) / 2) / FURN_W);
        for (k = n - 1; k <= n + 1; k++) {
          lp = clamp(lx, lo + k * FURN_W, hi + k * FURN_W);
          side = lp - lx;
          mag = side < 0 ? -side : side;
          px = x0 + 6 + side;
          seen = Math.max(0, px - POP_SEEN_HI) + Math.max(0, POP_SEEN_LO - px);
          /* eight to one: being watched beats being tidy, and a pop that
             happened off the right edge of the screen did not happen */
          cost = mag + 8 * seen + 0.30 * Math.abs(x0 - POP_AIM);
          /* THE SAFETY NET, and the one piece of this that is not an
             optimisation. The two rules below are rejections, and a scan
             that rejected everything would leave an icon with no x0, no
             popC and a NaN working its way out through the BOXES. It
             cannot happen as the panes stand - at the last x0 the scan
             tries, q is 1 and rule two is vacuous, and the widest gap
             between two inset panes is 158 columns so the nearest is never
             more than 79 away, inside POP_SIDE's 80 - but "cannot happen"
             is a thing people write just before somebody moves a monitor.
             So the loop also keeps the best candidate with no rules
             applied at all, and falls back to it. */
          if (cost < loose) {
            loose = cost;
            if (best === 1e9) {
              ob.x0 = x0; ob.popSide = side; ob.popC = lp - lk;
              ob.popY = s.y + s.h - POP_LOW;
            }
          }
          if (mag > POP_SIDE) continue;                 /* rule one */
          if (mag * (1 - q) > POP_SLACK) continue;      /* rule two */
          if (cost < best) {
            best = cost;
            ob.x0 = x0;
            ob.popSide = side;
            ob.popC = lp - lk;
            ob.popY = s.y + s.h - POP_LOW;
          }
        }
      }
    }
  }

  /* THE APP ICON. A 'spike' that does not kill: ob.stun is what says so,
     and the engine reads it in collide() before it ever reaches hurt().

     ONE icon per bay, always - the engine offers `count` between 3 and 6
     and this spends it on WHICH APP instead. Two shakes in one bay is a
     picture nobody can read, and four notifications strung across a gap
     would be a wall of punishment rather than a joke.

     `x` is the LEFT edge of everything this obstacle can collide with and
     `w` its full width, because collide() culls on ob.x and ob.x + ob.w
     and save() clears on the same two numbers - a box outside that span
     is a box that is never tested and never cleared.

     `len` is how far into the air it HOVERS, which is the same question
     tune.spikeCeilMin..Max answers for a mint sprout; the standoff that
     keeps it clear of the moulding and the desktop is this file's and is
     added on top. `hy` is worked out once here so that iconCY, rectsFor
     and the burst position all read one number, and pickPop works out the
     other four the same way and for the same reason. */
  function makeSpikes(x, side, count, maxLen, run) {
    var len = Math.round(rand(maxLen * 0.7, maxLen));
    var hy = side === 'ceil' ? CEIL + CEIL_LIFT + len : DESK_Y - FLOOR_LIFT - len;
    var ob = {
      type: 'spike', x: x, w: ICON_W, side: side,
      /* the engine's cluster size, spent on the app instead: 3..6 -> 0..3 */
      app: clamp(count - 3, 0, 3),
      len: len, hy: hy,
      seed: rand(0, TAU),
      /* THE RING. `time` is how long it lasts, `amp` how hard the screen
         buzzes (the engine caps it at 12), `roll` how far the whole room
         tilts in degrees (the engine caps that at 8), and the two lines
         are what it shouts into the SPICY slot.

         IT WAS 1.1s AND 8px OF BUZZ AND IT COST NOTHING. A shake moves
         all three canvases by the same offset, so the doodad and the
         planks slide together and the one number the player is actually
         reading - his height against the next gap - comes out of a shaken
         frame unchanged. Forced in play and watched: the picture jitters,
         the task does not. Which is why the amp is now 12, the whole of
         what the engine allows, and why the amp is not the fix.

         THE ROLL IS THE FIX. The stage turns about its centre, so the
         HORIZON tilts: a gap dx ahead sits dx*sin(theta) off where the
         eye puts it, while every pixel stays where it was drawn and
         collision never learns about any of it. Six degrees against this
         bay's 12px of timing room (gapMin 82 - 2*hitR - the 48 one flap
         lifts): sin 6 is 0.105, so a plank 100px off - about 0.6s of
         warning, the distance a decision is actually made at - reads
         10.5px wrong at the peak and about 6.7px averaged over a swing,
         half the budget. 1.6s at 110-172px/s is 176-275px of scroll
         against a spacing of 186-230, so exactly ONE plank is flown
         inside a ring and two inside a chained one. Honest price: about
         half a plank, and about one for a chain.

         It still spends no life and hides nothing - the icon is consumed
         before hurt() is ever reached, nothing moves that the player
         collides with, and a room visibly rolling under RING RING! is
         unmistakable. The two candidates that were rejected both broke
         that rule: a phone card over the lane makes a plank unseeable at
         0.12s of warning, and shaking the scenery apart from the doodad
         draws a plank up to 8px from where it kills you.

         1.6s, not longer: the engine's top-up rule caps a chain at
         1.6 x 1.6 = 2.56s, and the buzz's own pulse train comes out of
         `time` for free - five 0.36s pulses at 12, 10, 9, 8 then 6px
         where there used to be three at 8, 6 and 4. */
      stun: { time: 1.6, amp: 12, roll: 6, say: 'RING RING!', sub: 'SOMEBODY IS CALLING' },
      /* where the 12-particle burst goes when one is touched - the ICON
         and not the doodad, so the player sees WHAT they hit. By the time
         anything can reach it the rise is long over and the icon is
         sitting on `hy` give or take the two pixels of its bob, so this
         is the honest answer to within a bob. */
      y: hy
    };
    pickPop(ob, x, run ? run.scroll : scrollNow);
    return ob;
  }

  /* Something off the shelves. x and y are its CENTRE, because it falls
     and rocks rather than sitting on a grid. Three kinds, one type
     string: a hardback, a breath mint and a quarter. */
  /* `want`, Crow's ORDNANCE (js/scene_play.js): 'gold' makes the +5 on
     request and 'plain' makes anything but, and NEITHER touches the gold
     dice or the gap - a gift handed to a crow must not move this bay's own
     rhythm. Any other value is the ordinary roll, exactly as before. */
  function makeDrop(x, spicy, fall, run, want) {
    var gold = want === 'gold';
    if (!spicy && !gold && want !== 'plain') {
      if (goldGap > 0) goldGap--;
      else if (chance(GOLD_CHANCE)) { gold = true; goldGap = GOLD_GAP; }
    }
    var ob = { type: 'drop', x: x, y: CEIL + 5, w: 24, vy: fall,
               spicy: !!spicy, gold: gold, broken: 0,
               cover: randInt(0, COVERS.length - 1),
               dir: chance(0.5) ? 'flat' : 'up',
               spin: rand(0, TAU),
               spinRate: rand(2.2, 4.6) * (chance(0.5) ? -1 : 1) };
    if (spicy) ob.w = 9;
    else if (gold) {
      ob.w = 11;
      /* a quarter is FAST - about 1.3s from the shelf against a book's
         2.5 - so catching one is a decision and not a formality */
      ob.vy = fall * 2.2 + 70;
      /* and the engine shouts this level's own word for it */
      ob.name = GOLD_NAME;
    } else if (ob.dir === 'up') ob.w = 8;
    return ob;
  }

  function makeLitter(x, run) {
    return { type: 'litter', x: x, w: 14, kind: randInt(0, 2) };
  }

  /* The mug sits on the boards, so it publishes no `y` and the engine's
     default grab point is the right one. `name` and `burst` are the
     caption and the particle colours: a coffee does not come apart into
     jade rosette leaves, but the jade is in the burst anyway because a
     spare life glows jade everywhere in this game. */
  function makeBoon(x, run) {
    return { type: 'boon', x: x, w: 16, taken: false,
             phase: rand(0, TAU), dx: 0, dy: 0,
             name: BOON_NAME,
             burst: [P.steam, P.coffeeHi, P.lifePale, P.lifeJade] };
  }

  /* Collision rectangles in screen space. Every lethal pixel has a box
     and nothing harmless has one - the shelves, the monitors, the cables,
     the napkin and the mug's handle are all safe to touch.

     The icon DOES get a box, because the engine has to detect it in order
     to ring the phone; what makes it harmless is ob.stun, not the absence
     of a rectangle. */
  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      /* the Coop's four boxes, verbatim, in every bay in the game */
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);
    } else if (ob.type === 'spike') {
      /* NOTHING while it is still inside the screen - there is no sprite
         to hit yet, only a pane glowing. ob.x0 is 404 at its lowest and a
         doodad reaches 315, so this never costs the player a thing; it is
         here because a box with no sprite under it is a bug waiting for
         the day somebody moves one of those two numbers.

         Then ONE box, a pixel inside the tile, read off the same two
         functions that place the sprite. The badge and the ring arcs have
         none: a graze on the corner of a notification is forgiven,
         because this is a punishment and not a death, and the only thing
         a tight box would buy is a shake the player cannot account for. */
      if (ob.x > ob.x0) return out;
      var cx = iconCX(ob), cy = iconCY(ob);
      out.push([cx - 5, cy - 5, 11, 11]);
    } else if (ob.type === 'drop') {
      if (ob.broken > 0) return out;
      /* the two gifts get generous boxes because catching them is meant
         to be easy; the book gets one a pixel inside its art because
         dodging it is meant to be fair */
      var kind = kindOf(ob);
      if (kind === 'coin') out.push([ob.x - 6, ob.y - 6, 12, 12]);
      else if (kind === 'mint') out.push([ob.x - 5, ob.y - 5, 10, 10]);
      else if (ob.dir === 'flat') out.push([ob.x - 11, ob.y - 3, 22, 6]);
      else out.push([ob.x - 3, ob.y - 11, 6, 22]);
    } else if (ob.type === 'boon') {
      /* the mug is what you collect, so the box travels with it and the
         napkin it was standing on has none */
      if (!ob.taken) out.push([ob.x + ob.dx - 8, FLOOR + ob.dy - 14, 16, 14]);
    }
    return out;
  }

  return {
    P: P, FX: FX, WARN: WARN, PREVIEW: PREVIEW, COVER: COVER, CEIL: CEIL, FLOOR: FLOOR, tiles: T,
    END_MIN: END_MIN, DROP_GRAV: DROP_GRAV, SPLAT_TIME: SPLAT_TIME,
    CEIL_KILLS: CEIL_KILLS,
    BOON_NAME: BOON_NAME,
    build: build,
    drawBackdrop: drawBackdrop, drawMenuBackdrop: drawMenuBackdrop,
    drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle,
    drawDrop: drawDrop, drawDropSpot: drawDropSpot, drawDropSplat: drawDropSplat,
    makePillar: makePillar, makeSpikes: makeSpikes, makeDrop: makeDrop, GOLD_GIFT: true,
    makeLitter: makeLitter, makeBoon: makeBoon,
    rectsFor: rectsFor
  };
})();
