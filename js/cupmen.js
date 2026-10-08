/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE CUPMEN

   THE FORT'S SECOND MODULE. It is not a bay and it has no entry in
   js/levels.js: js/fort.js is the level, and it reaches everything in
   here through four one-line delegates (makeFoe, stepFoe, bopFoe,
   drawActors) and through the shot fork at the top of its own
   stepDrop/drawDrop/drawDropSplat/rectsFor. It is loaded BEFORE
   fort.js, because that file aliases this palette at load, and it is
   built LAST by Fort.build() - the Whiteboard -> Chalkboard precedent -
   which is why build() below is self-guarded. This file never names
   the Fort in code: it is a population that could stand in any bay that
   publishes its four hooks.

   WHO THEY ARE. Fort ref 7 is the photograph they grew out of: red
   party cups standing upside down on a cardboard panel on the grey
   sofa, and a toy blaster lying on the cushion beside them. The owner
   painted the cups as soldiers - an upside-down cup, wide at the
   bottom, two angry eyes and a zigzag mouth on the RIGHT-hand side of
   it, so as painted every cup FACES RIGHT - and gave each one a toy gun
   of its own, painted POINTING RIGHT. Five ranks:

     CRIMSON    blue pistol. Yellow pellets, which end runs, and one in
                five a RED one, which is the heat (never two reds in a
                row). From pace 12.
     GREEN      white shotgun. A blast of two small GREEN pellets, which
                are sours, and nothing else. Rarer. From pace 12.
     SILVER     the SENTINELS, with the cream SAW. Robotic: 10px steps
                and no waddle, a quicker (but as smooth) aim, and a burst
                of three - yellow and red. From pace 20.
     GOLD       the GOLDEN ORDER, gold pistols. Quick SILVER pellets that
                curve after you (3 in 4) and spinning GOLD COINS that are
                worth +5 (1 in 4). From pace 20.
     KING       once per run at pace 30. A hundred pixels of gold cup -
                3.3 cupmen tall, 76 wide - with a pink crown and a red
                eye. He holds station on the screen like the Chalkboard's
                shark, summons two floating orange guns on the side the
                player is coming from, and is bopped three times ON THE
                CROWN. While he is up, the biscuits stop falling.

   A cupman stands on nearly every bay (0.9 of them), and any of them
   but the King goes over if you LAND ON HIS HEAD - a bop, no points.
   From the side he is as lethal as he ever was.

   THEY MARCH. The owner's words are "march back and forth", so a
   cupman walks 40..58px/s (the Sentinel 33) inside a 60px patrol, and
   walks again BETWEEN shots - still facing the doodad, a strafe - from
   the moment he fires until 0.15s before his next telegraph could
   start, so the muzzle never moves under a line it has shown. He stands
   still while aiming and while the player is 0..40px ahead of him (a
   lethal body that sets off towards you is unreadable); once passed by
   24px he goes back to his patrol, turning at most once as a doodad
   goes over him (see stepCupman). A TURN IS INSTANT: the owner asked
   for no in-between frames, which squeezing the painting through zero
   width had shown as the flat card it is.

   THE GUN IS HELD LOW AND FORWARD, past the brim at the foot of the cup,
   never across the face - and drawn behind the cup on the rare aim steep
   enough to cross it (see GUN).

   THE FAIRNESS RULES, every one, because a shooter that is not fair is
   not an obstacle, it is a coin toss:

     1. AHEAD ONLY. A cupman engages when the player is 40..400px to his
        LEFT - his gun comes up as soon as half of him is on the screen
        (READY), about 2s of scroll at the doodad's start x. The owner's words are "when the
        player approaches"; a cupman already passed never fires - a
        pellet from behind, at a doodad who only ever looks right, is
        not a hazard anyone can read. Under 40px his body is the hazard,
        and rule 3 holds his gun anyway. The King's guns: 40px, and they
        float AHEAD of him (64 and 112px), so they cover the doodad who
        is fighting him.
     2. NOTHING FIRES FROM OFF SCREEN. The whole cup must be on it (the
        centre inside 16..VW-16); the gun and the dots are on the screen
        side of him whenever he aims.
     3. NEVER POINT BLANK. A doodad whose hitbox edge is nearer the
        MUZZLE than 60px, or than 0.44s of the pellet's own flight,
        whichever is further, holds the shot (56px for the floating guns):
        with at least 0.15s of locked line in front of it, every pellet
        that can reach him gives him ~0.6s from the frozen line, and a
        15px dodge takes 0.05s (a flap) to 0.16s (from rest, falling).
        Measured headless against an autopilot that flies INTO the line
        (it steers for the next gap and ignores pellets): the quickest
        of ~1000 pellets arrived 0.38s after it left the muzzle, 0.53s
        after its line froze.
     4. NOTHING FIRES DURING THE GRACE after a save, nor at a submerged
        Teef.
     5. NOTHING FIRES DOWN A CORRIDOR. A player whose hitbox overlaps any
        plank's column union - x in [p.x-4-hr, p.x+38+hr], 64px for an
        11px hitbox - with a CLEAR line to the muzzle is held: a corridor
        gives +-30px of room and no horizontal escape, and a half-lead
        pellet down it is near unavoidable. A line that crosses cardboard
        is NOT held any more - the pellet pops on the plank (round 1 held
        those, which was most shots: 0.6..1 shot per cupman encounter,
        and the owner saw them "already gone before they can shoot").
     6. THE TELEGRAPH. Three aim dots growing out of the muzzle and
        following the aim, never shorter than 0.26s. It starts the moment
        he is engaged, his cooldown spent and his gun on its mark. Its
        last 0.15s is THE LOCK: the aim freezes and the dots take the
        colour of the pellet; the lock waits, tracking, until the shot is
        fair (rules 3 and 5), and once locked it never unlocks - it fires,
        or if the shot has stopped being fair it stands down and starts
        again. "Dodge the line you were shown" is literally true of every
        pellet. The King's two guns never fire within 0.6s of each other.
     7. HALF LEAD. The gun aims at where you are plus half of where your
        vertical speed is taking you: a doodad that keeps moving is
        missed and a doodad that hovers is hit. The aim FOLLOWS that point
        on a critically damped spring - no snaps, no ticks, no overshoot.
     8. NEVER FASTER THAN run.speed + 90 ON THE SCREEN. A pellet's
        muzzle speed M (48..88) is set against the RUG, because the
        cupman is standing on it; round 2 takes it to 0.85 of
        run.speed + M, never under run.speed + 34 - 164..226px/s on the
        screen at the Fort's pace (SHOT). (A pellet set at a flat 145 on
        the screen moved at run.speed - 145 in the room: it hung on the
        muzzle at pace 12 and drifted back through the cup under the
        heat.) From across the screen it arrives in about 1..2s.
     9. SIX LIVE PELLETS AT MOST, counting the ones born this frame. The
        cap gates FIRE, never engagement, so a full sky does not make
        every cupman flinch.
    10. A CUPMAN NEVER FIRES IN HIS FIRST HALF SECOND. He is admitted at
        about VW+90 and scrolls in at <= 334px/s even under the heat and
        marching; his telegraph cannot start before VW+READY and lasts
        0.30s, and rule 2 holds the lock until his centre is under VW-16 -
        0.53s at the very fastest. That, and not his cooldown, is the real
        guarantee.
    11. HOMING IS DODGED BY MOVING. 2.0 rad/s for 1.3s, and never once
        the pellet is past you.
    12. THE KING'S BOP NEVER THROWS YOU INTO CARDBOARD. His crown is bop
        only, and it is withdrawn while a plank overlaps the doodad or
        will within 0.3s - the rebound's rise (25px, apex at 0.21s) plus
        a margin - so a bop only ever happens between planks. A cupman's
        head needs no such shield: his patrol keeps him 36px clear of
        the next plank, and a doodad down on the rug to bop him is under
        that plank's gap whether he bops or not.

   WHY THEY LIVE ON THE SMOOTH LAYER. The sprites are the owner's
   paintings, in the same style as the doodads, and the doodads are drawn
   on the device-resolution char canvas with smoothing on. A painted cup
   pushed through the 480x270 nearest-neighbour layer would be a smear
   of thirty pixels; on the char layer it is a painting. So drawActors
   scales them with drawImage and - unlike every level file - DOES ROTATE
   A CANVAS: the pixel rule ("no ctx.rotate on a pixel sprite, bake the
   frames") is about resampling a pixel sprite on the pixel layer, and
   this is the layer where the doodads have always tilted. The pellets
   are the opposite case: tiny, on the bg layer under the pellet-eating
   particles, as baked pixel discs and coin frames. A cupman in front of
   the planks is honest - he is standing in the room, nearer the camera
   than the cardboard. The King is the exception: a 76px giant with a
   plank drawn through his belly reads as a bug, so the level redraws
   the lower column and cap of any plank within 38px of his centre ON
   TOP of him after drawActors (fort.js) - he stands BEHIND the
   cardboard, crown over the plank, and the lethal edge is never hidden.
   His fade while a plank crosses him is only 0.8, a hint that the crown
   is not there to land on (below).

   THE PELLETS ARE DROPS. Type 'drop' with `shot: true`, so every gift
   path the engine already has - grabSpicy, takeGold, grabSour, Gerald's
   pull, Saddam's tail, the heat's smash, the save's splatter - works on
   them unchanged. THREE SEPARATIONS between the lethal yellow and the
   gift gold: SHAPE (a solid disc against a spinning coin), RING (a dark
   ring against none) and GLOW (none against a gold halo). Every lethal
   pellet is a disc with the dark ring and no glow; every gift glows. A
   green pellet wears a PURPLE ring - gun_green's stripe - because the
   Fort has a green chamber and nothing else in the bay is purple.

   LUMINANCE (Rec. 601, measured off the PNGs and the hexes below): the
   painted crimson cup averages 86, green 59, silver 137, gold 188, the
   King 180. The red and the green are the two that sink into the foot of
   a near wall in shadow (~80 after the room's light), which is why the
   GREEN and SILVER get a warm backlight glow behind them: by value alone
   the green is 21 points under its wall. (Round 1 also stroked a cool
   rim light along every cup's top-left edge; the owner read it as a
   stray white line following them, and it is gone.)

   Same discipline as the art modules where it applies: no Math.random in
   a draw, no Dither.rect, no Audio3 and no particles from in here (the
   engine plays the `cry` a born thing carries and drains the ledger),
   no splice, and NO ALLOCATION PER FRAME IN A STEP - the scratch array
   below is module-level and every count is a loop, never a filter. A
   pellet object is born when a gun fires, which is an event and not a
   frame.
------------------------------------------------------------------ */

var Cupmen = (function () {
  'use strict';

  /* ---------------------------------------------------- the aliases

     The Whiteboard's four plotters, the same function objects that file
     and the Chalkboard use - the pop rings and the cover's little cups
     are plotted strokes on the pixel layer, and a second Bresenham is a
     second chance to get one subtly wrong. `c` is a context; each call
     sets its own fillStyle; pcircle takes integers only. */
  var pline = Whiteboard.pline;
  var pcircle = Whiteboard.pcircle;

  /* the room's geometry, aliased and never literal: a pellet popping on
     the roof panel and a cup standing on the rug are standing on the
     room's own two lines */
  var CEIL = LivingRoom.CEIL;      /*  24 */
  var FLOOR = LivingRoom.FLOOR;    /* 242 */
  var wrap = LivingRoom.wrap, hash = LivingRoom.hash;
  var PI = Math.PI;

  /* ---------------------------------------------------- the palette

     Luminance after each (0.299R + 0.587G + 0.114B). The cup hexes are
     the paintings' own flats, picked for the pixel cups on the cover and
     the badge and for the fallback when a PNG has not arrived; cupRed is
     also the red cup lying in the Fort's litter, so the knocked-over cup
     on the rug and the soldier are the same plastic. */
  var P = {
    cupRed:        '#d92b24',   /*  94  the crimson cup                     */
    cupRedDk:      '#8e1a14',   /*  60                                      */
    cupGold:       '#f5b21c',   /* 181  the Order's cup, and the King's     */
    cupGoldDk:     '#b07a0c',   /* 126                                      */
    cupGreen:      '#164a2e',   /*  55  the darkest cup: hence a backlight  */
    cupGreenDk:    '#0b2a1a',   /*  31                                      */
    cupSilver:     '#8f9094',   /* 144  the Sentinel, the bay's one neutral */
    cupSilverDk:   '#5a5b5f',   /*  91                                      */
    crown:         '#f36ad0',   /* 159  the King's crown, the guns' rings   */
    crownDk:       '#b23f98',   /* 108                                      */
    eyeWhite:      '#ffffff',   /* 255                                      */
    eyeRed:        '#ff5a4a',   /* 138  the King's left eye                 */
    pelletYellow:  '#ffc21a',   /* 193  LETHAL: 49 clear of kraft at 144    */
    pelletYellowHi:'#fff3b0',   /* 239                                      */
    pelletRed:     '#ff3b2a',   /* 116  the heat                            */
    pelletRedHi:   '#ffb08a',   /* 195                                      */
    pelletGreen:   '#8cff5a',   /* 202  the sour                            */
    pelletGreenHi: '#e4ffd0',   /* 242                                      */
    pelletPurple:  '#6a2fb0',   /*  79  the sour's ring, gun_green's stripe */
    pelletSilver:  '#dfe3ea',   /* 227  LETHAL, the quick one, homing       */
    pelletSilverHi:'#ffffff',   /* 255                                      */
    streak:        '#8f9094',   /* 144  the silver's speed streak           */
    pelletGold:    '#ffe58a',   /* 226  the +5: pale champagne, not orange  */
    pelletGoldEdge:'#c98a10',   /* 143  the coin's own milled edge          */
    pelletGoldHi:  '#ffffff',   /* 255  the glint                           */
    ring:          '#1a1410',   /*  21  every lethal pellet wears this      */
    flash:         '#fff1b0',   /* 238  aim dots and the muzzle halo        */
    flashCore:     '#ffffff',   /* 255                                      */
    shade:         '#3a2c1f',   /*  47  the contact shadow under a cup      */
    gunBlue:       '#1f4fb8',   /*  77  the Crimson's pistol                */
    gunWhite:      '#f2f3f0',   /* 242  the shotgun and the SAW             */
    gunGold:       '#e0a020',   /* 165  the Order's pistol                  */
    gunOrange:     '#ff8a2a',   /* 162  every painted muzzle, the King's gun*/
    outline:       '#1a1410'    /*  21                                      */
  };

  /* THE KING'S DATA, MUTABLE ON PURPOSE. A maker is never handed `tune`,
     and the King's threshold has to be forceable by a headless test, so
     it lives here as art data rather than in the level's tune - and
     js/levels.js says so beside the Fort's foeScore. */
  var tune = { kingAt: 30, kingHp: 3 };

  var T = {};

  /* ---------------------------------------------------- the tables

     SIZES. A cup is drawn 30 virtual px tall: 26 lost the faces, and the
     eyes are what say "enemy". s = 30/367 = 0.0817, width 27.3, and its
     top at FLOOR-30 = 212 is still 4px under the lowest gap bottom any
     plank can have (208), so a cupman never blocks a gap - the floor is
     simply lethal a little higher where one stands. A gun is drawn at
     ITS OWN CUP'S SCALE, so the painted size relationship between the two
     holds (the trimmer cut both at one shared 0.25 for exactly this).
     THE KING IS A GIANT: 100 tall, s = 100/440 = 0.2273, width 334 * s =
     76, the painting's crown its top 73 rows = the top 17px, y 142..159.
     At 66 he was 2.2 cupmen and read as "a bigger cup". Everything drawn
     of him above y 210 is NOT lethal - see foeRects. His floating guns
     are 0.125 (40px wide) - magic, bigger than anything a cup can hold,
     and in proportion to him. */
  var CUP_H = 30, CUP_S = CUP_H / 367;
  var KING_H = 100, KING_S = KING_H / 440, KING_W = 76;
  var KING_HALF = 38;       /* drawn half-width: the fade test, and fort.js's
                               plank-over-the-King redraw uses the same 38 */
  var CROWN_H = 17;         /* the painting's crown, on screen */
  var HEAD_H = 6;           /* a cupman's bop strip, the top of his cup */
  var GUN_S_KING = 0.125;

  /* the guns as the trimmer measured them: muzzle = the middle of the
     barrel's mouth, grip = the middle of the lowest row of the handle.
     A held gun pivots on its grip. A FLOATING gun has no hand, and a
     thing pivoting on its bottom-left corner swings like a door, so the
     King's guns pivot on the painting's centre (`px`, `py`) instead.

     THE HOLD, LOW AND FORWARD, so the gun never covers the face. The
     face is painted on the facing side of the upper half: eyes, brows
     and the zigzag mouth sit in x 0..+10.5 (face side), y -24.5..-14.5
     from the foot, measured off the PNGs at the 30px draw (the Sentinel's
     eyes are nearer the middle, -3..+3, hence the union box). The hand
     used to be at (+7, -13) - INSIDE the body at mouth height - and the
     barrel, 6.7px above the grip, went straight across the eyes at every
     angle. Now the grip is at (hx, hy) = (+16, -5) out past the brim
     (the cup is 13.3px wide each side at that height): level, the gun's
     nearest pixel is 1px clear of the body, and a scan of every opaque
     gun pixel against that face box, every half degree of elevation,
     first touches it at 58.5 degrees up for the pistols, 68.5 for the
     shotgun and 62 for the SAW (held 2px further out and 1px lower: its
     painting is the biggest). `beh` is that threshold less about
     five degrees, in radians (54, 64 and 57 degrees): aimed steeper, the gun is drawn BEHIND the cup, which hides
     the part that would cross the face and leaves the barrel and muzzle
     showing past the rim. Only a doodad nearly overhead and close puts a
     gun there - and point blank (rule 3) holds that shot anyway. */
  var GUN = {
    crimson: { img: 'gun_crimson', mx: 205, my: 39,   gx: 19.5, gy: 121, hx: 16, hy: 5, beh: 0.95 },
    gold:    { img: 'gun_gold',    mx: 205, my: 39,   gx: 19.5, gy: 121, hx: 16, hy: 5, beh: 0.95 },
    green:   { img: 'gun_green',   mx: 267, my: 34.5, gx: 30,   gy: 107, hx: 16, hy: 5, beh: 1.12 },
    silver:  { img: 'gun_silver',  mx: 319, my: 47,   gx: 14,   gy: 145, hx: 18, hy: 4, beh: 1.0 },
    king:    { img: 'gun_king',    mx: 319, my: 47,   gx: 160,  gy: 73 }
  };

  /* THE RANKS. tele = the first telegraph; cool = the cycle from one
     shot to the next INCLUDING the short telegraph in front of it (so a
     Crimson fires every 1.60s while you are in front of him). Round 1
     had 1.5 / 2.4 / 1.4 / 1.3 and a 0.42 telegraph, and measured ~0.6..1
     shot per encounter: a cupman is ahead of the doodad and on screen
     for about 1..2s, minus the point-blank tail, and one 1.5s cycle does
     not fit twice in that. At 0.30 + 0.62 the first shot is ~0.4s into
     an engagement and the next every 0.62s. Measured headless (js/
     cupmen.js stepped against a rail autopilot, 2 minutes each, round
     2's whole cycle and rules): 3.2 shots per Crimson at run.speed 130
     with the doodad at x 116, 2.2 at 150 / x 160, 1.3 at the top speed
     178 / x 200, ~1 under the heat; about 1 cupman in 100 never fired,
     and none from x 160 down. Those were at 0.62; the final check of
     round 2 measured 1.64 per Crimson and 1.33 per Gold over a late run
     at the top speed, under the owner's "typically 2-3", so both went to
     0.50 - and with a cupman in nine bays of ten that was a wall of
     pellets: the owner played it and found them "very fast and too hard
     to get past". Doubling every cycle (Crimson and Gold 1.10) still
     measured 2.2 shots per Crimson at a normal 147px/s scroll, so they
     went further: Crimson and Gold 1.60, Green 2.20, the Sentinel 2.40,
     the King's guns 2.6, and the sky holds six live pellets, not nine.
     A cupman still gets a shot at you on every pass - the first comes
     ~0.4s into the engagement whatever the cycle - and a second only if
     you are slow getting past him. The Green's blast is two pellets, so
     it cycles slower; the Sentinel's 2.40 carries a burst of three, so it
     still out-fires the Crimson 1.25 pellets a second to 0.63, which is
     the owner's "much faster rate". `aimW` is the aim's spring (aimAt): the natural
     frequency of a critically damped follow, rad/s - 14 settles a flick
     of the target in ~0.3s, the Sentinel's 22 in ~0.2s, quicker but as
     smooth. `speed` is the march in the ROOM: at 22 against a 137..178
     scroll it was a 12..16% wobble and a turn needed 2.7s; at 40..58 a
     60px leg is ~1.3s. `reach` is NOT a speed knob - the 88px window and
     Teef's +14 rule below are built on it. */
  var RANK = {
    crimson: { reach: 30, speed: 46, tele: 0.30, cool: 1.60, aimW: 14, cry: 'pew',    body: 'cupRed',    dark: 'cupRedDk' },
    green:   { reach: 30, speed: 40, tele: 0.30, cool: 2.20, aimW: 14, cry: 'blast',  body: 'cupGreen',  dark: 'cupGreenDk' },
    silver:  { reach: 22, speed: 0,  tele: 0.26, cool: 2.40, aimW: 22, cry: 'rattle', body: 'cupSilver', dark: 'cupSilverDk' },
    gold:    { reach: 30, speed: 58, tele: 0.30, cool: 1.60, aimW: 14, cry: 'pew',    body: 'cupGold',   dark: 'cupGoldDk' },
    king:    { reach: 0,  speed: 0,  tele: 0,    cool: 0,    aimW: 0,  cry: null,     body: 'cupGold',   dark: 'cupGoldDk' },
    gun:     { reach: 0,  speed: 0,  tele: 0.35, cool: 2.6,  aimW: 12, cry: 'pew',    body: 'gunOrange', dark: 'crownDk' }
  };

  /* THE PELLETS. M is the MUZZLE SPEED AGAINST THE RUG (the room
     frame), round 1's whole speed: the screen speed WAS run.speed + M -
     see speedOf and rule 8. A horizontal yellow left the gun at 62px/s
     against the rug, and it out-runs the planks by its room speed times
     cos a, so "pellets stop on cardboard" actually happens. `box` is the
     hit square's side; `r` the drawn radius. Silver is the quick one.
     THEN "A LITTLE SLOWER" (round 2): the screen speed is SLOW = 0.85 of
     that, but never under run.speed + M_MIN. A flat 0.85 of the screen
     speed would take 15% of run.speed off the ROOM speed too, and at the
     heat's 1.55x a green would have hung on its own muzzle again (0.85 x
     (276 + 48) = 275 against a 276 rug). 34px/s against the rug is the
     least that still reads as a shot leaving the gun: 17px clear of the
     muzzle in half a second, and every pellet still beats the planks.
     What it comes to, screen px/s (round 1 in brackets):
       run.speed 130   yellow 164 (192)  red/green 164 (182/178)  silver 185 (218)
       run.speed 178   yellow 212 (240)  red/green 212 (230/226)  silver 226 (266)
     The yellow and the silver are 0.85 of round 1 at the Fort's usual
     pace and the slower red and green ~0.9 (the floor holds them); at
     the top speed and under the heat the floor holds them all, 0.85..0.96.
     The King's crown coins are gifts and keep their arc. */
  var SHOT = {
    yellow: { M: 62, r: 3,   box: 7, tile: 7, hi: 'pelletYellowHi', body: 'pelletYellow' },
    red:    { M: 52, r: 3.5, box: 8, tile: 8, hi: 'pelletRedHi',    body: 'pelletRed' },
    green:  { M: 48, r: 2.5, box: 6, tile: 6, hi: 'pelletGreenHi',  body: 'pelletGreen' },
    silver: { M: 88, r: 3,   box: 7, tile: 7, hi: 'pelletSilverHi', body: 'pelletSilver' },
    gold:   { M: 52, r: 4,   box: 9, tile: 11, hi: 'pelletGold',    body: 'pelletGoldEdge' }
  };
  var SLOW = 0.85, M_MIN = 34;
  /* THE KING'S FLOATING GUNS hold station on the SCREEN, not the rug, so
     theirs stays a plain screen speed, 150 x 0.85 = 128: from GUN_MIN
     (56px) to 159px ahead of a doodad at his crown it arrives in
     0.44..1.24s after a 0.35s telegraph. */
  var GUN_V = 128;
  var KINDS = ['yellow', 'red', 'green', 'silver', 'gold'];

  /* the fairness numbers, named where the essay above argues them */
  var ENGAGE_MIN = 40;      /* rule 1: the nearest a cupman engages      */
  var GUN_MIN = 56;         /* rule 3 for the floating guns              */
  var GUN_GAP = 0.6;        /* rule 6: the King's two guns never together */
  var FIRE_MIN = 60;        /* rule 3: muzzle to hitbox edge, in px      */
  var FIRE_T = 0.44;        /* rule 3 again, in seconds to impact        */
  var RANGE = 400;          /* rule 1's far end: the whole screen ahead  */
  var EDGE = 16;            /* rule 2: the whole cup inside the screen   */
  var READY = 14;           /* the gun comes up from c <= VW + READY     */
  var GUN_AHEAD = 40;       /* rule 1 for the floating guns              */
  var LOCK = 0.15;          /* rule 6: the frozen tail of a telegraph    */
  var TELE_MIN = 0.26;      /* rule 6: never shorter                     */
  var MAX_SHOTS = 6;        /* rule 9                                    */
  var REST_W = 9;           /* the carry's spring, rad/s (aimAt)         */
  var AIM_VMAX = 9;         /* rad/s, the most any aim swings            */
  var VOLLEY_DT = 0.14;     /* the Sentinel's burst spacing              */
  var STEP_T = 0.30, STEP_PX = 10, SLIDE_T = 0.08;   /* 33px/s, the Sentinel */
  var PLANT_T = 0.05;       /* the 0.94 squash as a Sentinel's foot lands */
  var TURN = 2.0, HOME_T = 1.3;       /* rule 11                         */
  var REST = 0.3;           /* a lowered gun points 0.3 rad down          */
  var DOWN_T = 0.55;        /* a bopped cupman's topple                   */
  var KING_X = 248;         /* where the King keeps station              */
  /* the floating guns' stations, AHEAD of him: slot 0 high, slot 1 mid.
     kx 238..258 puts them at 302..370 (<= VW-24 with 20px of gun either
     side), clear of his silhouette (cx + 38 and a 20px gun half: 64 > 58)
     and of his crown (y 70 and 144 against a crown at 142, but 64+ px to
     the side). From a doodad bopping him at cx +- 27 they are 17..159px
     ahead, so the guns cover the fight itself. At -40/+30 they were
     silent for anyone standing next to him: parking by the King made the
     level easier than the one without him. */
  var GUN_DX = [64, 112], GUN_Y = [CEIL + 46, FLOOR - 98];
  var LOOK = 0.3;           /* rule 12: the bop shield's look-ahead (s)  */

  /* THE ONE SCRATCH ARRAY. muzzleOf writes into it; every step and every
     draw that needs a hand or a muzzle reads it straight back. */
  var MZ = [0, 0, 0, 0, 0, 0];

  /* ===================================================== baking

     Everything on the PIXEL layer is baked once: pellet discs, the
     silver's two flicker frames, four coin frames, three glow sprites,
     five pop-ring frames per kind, an aim-dot stamp, and the small
     plotted cups and crown for the cover and the badge. None of it
     touches a PNG - Assets load after Levels.buildArt and Badges.build,
     so a bake that reached for a painting would find nothing. */

  /* [offset, width] rows of a disc `d` across, hand-measured rather than
     computed: at 5..8 pixels the rounding IS the shape */
  var DISC = {
    4: [[1, 2], [0, 4], [0, 4], [1, 2]],
    5: [[1, 3], [0, 5], [0, 5], [0, 5], [1, 3]],
    6: [[1, 4], [0, 6], [0, 6], [0, 6], [0, 6], [1, 4]],
    7: [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [2, 3]],
    8: [[2, 4], [1, 6], [0, 8], [0, 8], [0, 8], [0, 8], [1, 6], [2, 4]]
  };

  /* A pellet: the outer disc in the ring colour, the inner disc one
     pixel in, and a two-pixel highlight top-left where the blue strip
     catches it. The ring is what every lethal pellet wears and the sour
     wears purple; a lethal pellet with no ring would be a gift. */
  function bakeDisc(d, ring, body, hi, hi2) {
    var t = makeCanvas(d, d), c = t.ctx;
    LivingRoom.rowsFill(c, DISC[d], 0, 0, ring);
    LivingRoom.rowsFill(c, DISC[d - 2], 1, 1, body);
    c.fillStyle = hi;
    c.fillRect(2, 2, 1, 1);
    if (hi2) c.fillRect(d > 6 ? 3 : 2, d > 6 ? 2 : 3, 1, 1);
    return t;
  }

  /* THE COIN, the Desk's quarter grammar at nine pixels: four frames 9,
     6, 3 and 6 wide, the 3-wide one edge-on and REEDED, a white glint
     on the face frames. No dark ring - the milled edge is gold-brown at
     143, which is the edge of a coin and not the outline of a hazard. */
  var COIN_W = [9, 6, 3, 6];
  function coinRows(w) {
    var rows = [], i;
    for (i = 0; i < 9; i++) {
      var k = (i - 4) / 4.5;
      var hw = Math.round((w / 2) * Math.sqrt(Math.max(0, 1 - k * k)));
      if (hw < 1) hw = 1;
      rows.push([Math.round(4.5 - hw), Math.max(1, hw * 2)]);
    }
    return rows;
  }
  function bakeCoin(f) {
    var w = COIN_W[f], rows = coinRows(w), i;
    var t = makeCanvas(11, 11), c = t.ctx;
    LivingRoom.rowsFill(c, rows, 1, 1, P.pelletGoldEdge);
    if (w === 3) {
      for (i = 2; i < 9; i++) {
        c.fillStyle = (i % 2) ? P.pelletGold : P.pelletGoldEdge;
        c.fillRect(5, 1 + i, 1, 1);
      }
      return t;
    }
    /* the face, one pixel in from the milled edge */
    c.fillStyle = P.pelletGold;
    for (i = 1; i < 8; i++) {
      var r = rows[i];
      if (r[1] > 2) c.fillRect(2 + r[0], 1 + i, r[1] - 2, 1);
    }
    c.fillStyle = P.pelletGoldHi;
    c.fillRect(1 + rows[2][0] + 1, 3, 1, 1);
    if (w === 9) c.fillRect(1 + rows[2][0] + 2, 3, 1, 1);
    /* a struck mark in the middle, so it is money and not a button */
    c.fillStyle = P.pelletGoldEdge;
    c.fillRect(5, 4, 1, 3);
    return t;
  }

  /* A SOFT GLOW, BAKED. 24x24, a radial falloff to nothing at the edge,
     blitted at an alpha that breathes with the pellet's own age - one
     drawImage per gift per frame, never a createRadialGradient. */
  function bakeGlow(rgb, peak) {
    var t = makeCanvas(24, 24), c = t.ctx;
    var g = c.createRadialGradient(12, 12, 0, 12, 12, 12);
    g.addColorStop(0, 'rgba(' + rgb + ',' + peak + ')');
    g.addColorStop(0.45, 'rgba(' + rgb + ',' + (peak * 0.4).toFixed(3) + ')');
    g.addColorStop(1, 'rgba(' + rgb + ',0)');
    c.fillStyle = g;
    c.fillRect(0, 0, 24, 24);
    return t;
  }

  /* THE POP: five 9x9 frames of a burst ring - a flash, a ring of 2, a
     ring of 3, a broken ring of 4, four last sparks - in the pellet's own
     two colours, so a pellet stopped by cardboard bursts where it struck
     and in what it was. */
  function ringDots(c, r, step, col, skip) {
    var n = Math.max(8, r * 8);
    c.fillStyle = col;
    for (var i = 0; i < n; i += step) {
      if (skip && (i % (step * 2))) continue;
      var a = i / n * TAU;
      c.fillRect(4 + Math.round(Math.cos(a) * r), 4 + Math.round(Math.sin(a) * r), 1, 1);
    }
  }
  function bakePop(kind) {
    var s = SHOT[kind], hi = P[s.hi], body = P[s.body], out = [], f;
    for (f = 0; f < 5; f++) {
      var t = makeCanvas(9, 9), c = t.ctx;
      if (f === 0) { LivingRoom.rowsFill(c, DISC[5], 2, 2, body); c.fillStyle = hi; c.fillRect(3, 3, 3, 3); }
      else if (f === 1) { pcircle(c, 4, 4, 2, body); c.fillStyle = hi; c.fillRect(4, 2, 1, 1); c.fillRect(2, 4, 1, 1); }
      else if (f === 2) { pcircle(c, 4, 4, 3, body); ringDots(c, 3, 3, hi, false); }
      else if (f === 3) ringDots(c, 4, 2, body, false);
      else { c.fillStyle = hi; c.fillRect(0, 0, 1, 1); c.fillRect(8, 0, 1, 1); c.fillRect(0, 8, 1, 1); c.fillRect(8, 8, 1, 1); }
      out.push(t);
    }
    return out;
  }

  /* a 3x3 aim dot for the pixel layer (the cover draws its dots with it;
     in play the dots are on the smooth layer, drawn round) */
  function bakeAimDot() {
    var t = makeCanvas(3, 3), c = t.ctx;
    c.fillStyle = P.flash;
    c.fillRect(1, 0, 1, 3); c.fillRect(0, 1, 3, 1);
    c.fillStyle = P.flashCore;
    c.fillRect(1, 1, 1, 1);
    return t;
  }

  /* the crown, 9x7, for the badge: three points, a band, a red gem */
  function bakeCrownMini() {
    var t = makeCanvas(9, 7), c = t.ctx;
    c.fillStyle = P.crown;
    c.fillRect(0, 0, 1, 2); c.fillRect(4, 0, 1, 2); c.fillRect(8, 0, 1, 2);
    c.fillRect(1, 1, 1, 1); c.fillRect(3, 1, 3, 1); c.fillRect(7, 1, 1, 1);
    c.fillRect(0, 2, 9, 4);
    c.fillStyle = P.crownDk;
    c.fillRect(0, 6, 9, 1);
    c.fillStyle = P.eyeRed;
    c.fillRect(4, 3, 1, 2);
    return t;
  }

  /* ------------------------------------------------ the pixel cups

     For the level card and the badge, where a painting at 9 pixels is a
     blot: a plotted cup, 8x9 (big) or 6x7, wide at the bottom like the
     upside-down party cup it is, a 1px outline round it, the white lip
     at its foot, two eye pixels and a zigzag on the FACE SIDE - so the
     whole sprite mirrors on `face`. Rows are [offset, width], facing
     right; a mirrored row is [W - o - w, w] and a mirrored pixel W-1-x. */
  var MINI = {
    big: {
      w: 8, h: 9,
      rows: [[1, 6], [1, 6], [1, 6], [1, 6], [1, 6], [0, 8], [0, 8], [0, 8], [0, 8]],
      eyes: [[4, 2], [6, 2]], mouth: [[3, 5], [4, 4], [5, 5], [6, 4]], brow: [[4, 1], [6, 1]]
    },
    small: {
      w: 6, h: 7,
      rows: [[1, 4], [1, 4], [1, 4], [0, 6], [0, 6], [0, 6], [0, 6]],
      eyes: [[3, 1], [5, 1]], mouth: [[3, 3], [4, 4]], brow: []
    }
  };
  function cupCols(kind) {
    var rk = RANK[kind] || RANK.crimson;
    return { body: P[rk.body], dark: P[rk.dark] };
  }

  /* drawPixelCup(ctx, cx, baseY, kind, face, big): the cup stands with
     its foot on the row above baseY, centred on cx. Plotted, not baked,
     so the cover can turn him round on any frame for the price of a few
     fillRects; cupMini[] below holds a baked copy for anything that only
     wants the picture. */
  function drawPixelCup(ctx, cx, baseY, kind, face, big) {
    var m = big ? MINI.big : MINI.small, col = cupCols(kind);
    var x0 = Math.round(cx - m.w / 2), y0 = Math.round(baseY) - m.h;
    var left = face < 0, i, r, o, px;
    /* the outline: every row fattened a pixel each side, plus a cap row */
    ctx.fillStyle = P.outline;
    for (i = 0; i < m.h; i++) {
      r = m.rows[i]; o = left ? m.w - r[0] - r[1] : r[0];
      ctx.fillRect(x0 + o - 1, y0 + i, r[1] + 2, 1);
    }
    r = m.rows[0]; o = left ? m.w - r[0] - r[1] : r[0];
    ctx.fillRect(x0 + o, y0 - 1, r[1], 1);
    for (i = 0; i < m.h; i++) {
      r = m.rows[i]; o = left ? m.w - r[0] - r[1] : r[0];
      /* the top (the cup's base, up here) catches the light; the foot
         is the white lip of the rim */
      ctx.fillStyle = i === 0 ? col.dark : (i === m.h - 1 ? P.eyeWhite : col.body);
      ctx.fillRect(x0 + o, y0 + i, r[1], 1);
    }
    ctx.fillStyle = P.eyeWhite;
    for (i = 0; i < m.eyes.length; i++) {
      px = left ? m.w - 1 - m.eyes[i][0] : m.eyes[i][0];
      ctx.fillRect(x0 + px, y0 + m.eyes[i][1], 1, 1);
    }
    ctx.fillStyle = kind === 'silver' ? P.outline : col.dark;
    for (i = 0; i < m.mouth.length; i++) {
      px = left ? m.w - 1 - m.mouth[i][0] : m.mouth[i][0];
      ctx.fillRect(x0 + px, y0 + m.mouth[i][1], 1, 1);
    }
    for (i = 0; i < m.brow.length; i++) {
      px = left ? m.w - 1 - m.brow[i][0] : m.brow[i][0];
      ctx.fillRect(x0 + px, y0 + m.brow[i][1], 1, 1);
    }
    if (kind === 'king') {
      /* a crown of three points on the cup's top, and the red eye */
      var cw = m.w - 2, cxl = x0 + 1;
      ctx.fillStyle = P.crown;
      ctx.fillRect(cxl, y0 - 3, cw, 2);
      ctx.fillRect(cxl, y0 - 5, 1, 2);
      ctx.fillRect(cxl + cw - 1, y0 - 5, 1, 2);
      ctx.fillRect(cxl + (cw >> 1), y0 - 5, 1, 2);
      ctx.fillStyle = P.eyeRed;
      ctx.fillRect(x0 + (left ? m.w - 1 - m.eyes[0][0] : m.eyes[0][0]), y0 + m.eyes[0][1], 1, 1);
    }
  }

  /* drawPixelGun(ctx, hx, hy, kind, face, aimLeft): (hx, hy) is the
     bottom of the handle, the barrel runs up and forward from it. Three
     shapes - a 6x3 pistol (crimson, gold), an 8x3 shotgun (green), a 9x4
     SAW (silver, and the King's orange one) - in their painted colours
     with the orange mouth every painting has. `aimLeft` is truthy while
     he is AIMING: the target in a run is always to the left, so the gun
     comes up level and points left whatever `face` says; otherwise the
     gun points `face`-wards and droops a pixel at the muzzle half, which
     is a gun being carried. */
  var PGUN = {
    pistol:  { len: 6, rows: [[0, -2, 6, 1, 'b'], [0, -1, 2, 2, 'b'], [2, -2, 1, 1, 's'], [5, -2, 1, 1, 'm']] },
    shotgun: { len: 8, rows: [[0, -2, 8, 1, 'b'], [0, -1, 2, 2, 'b'], [3, -2, 1, 1, 's'], [4, -2, 1, 1, 't'], [7, -2, 1, 1, 'm']] },
    saw:     { len: 9, rows: [[1, -3, 7, 1, 'b'], [0, -2, 9, 1, 'b'], [0, -1, 2, 2, 'b'], [4, -3, 1, 2, 's'], [5, -3, 1, 2, 't'], [8, -2, 1, 1, 'm']] }
  };
  var PGUN_KIND = {
    crimson: { shape: 'pistol',  b: 'gunBlue',   s: 'pelletRed',    t: 'gunOrange',   m: 'gunOrange' },
    gold:    { shape: 'pistol',  b: 'gunGold',   s: 'pelletYellow', t: 'gunOrange',   m: 'gunOrange' },
    green:   { shape: 'shotgun', b: 'gunWhite',  s: 'pelletGreen',  t: 'pelletPurple', m: 'cupSilverDk' },
    silver:  { shape: 'saw',     b: 'gunWhite',  s: 'cupSilverDk',  t: 'outline',     m: 'gunOrange' },
    king:    { shape: 'saw',     b: 'gunOrange', s: 'cupGold',      t: 'crown',       m: 'cupGoldDk' }
  };
  function drawPixelGun(ctx, hx, hy, kind, face, aimLeft) {
    var k = PGUN_KIND[kind === 'gun' ? 'king' : kind] || PGUN_KIND.crimson;
    var sh = PGUN[k.shape], dir = aimLeft ? -1 : (face < 0 ? -1 : 1);
    var x0 = Math.round(hx), y0 = Math.round(hy), i, q, dx, dy;
    for (i = 0; i < sh.rows.length; i++) {
      q = sh.rows[i];
      ctx.fillStyle = P[k[q[4]]];
      for (dx = 0; dx < q[2]; dx++) {
        var lx = q[0] + dx;
        /* the droop: past the middle of the gun everything sits a row lower */
        var droop = (!aimLeft && lx >= (sh.len >> 1) && q[1] < -1) ? 1 : 0;
        for (dy = 0; dy < q[3]; dy++) {
          ctx.fillRect(x0 + dir * lx, y0 + q[1] + dy + droop, 1, 1);
        }
      }
    }
  }

  /* the baked picture of each pixel cup, facing right, outline included
     (10x15: the crown needs the five rows above) */
  function bakeCupMini(kind) {
    var t = makeCanvas(10, 15);
    drawPixelCup(t.ctx, 5, 14, kind, 1, true);
    return t;
  }

  /* SELF-GUARDED. Fort.build() calls this last on every boot and it
     costs one test after the first; it also lets a test page call it
     without asking whether anything already has. Canvases: 4 discs + 2
     silver frames + 4 coins + 3 glows + 25 pop frames + 1 aim dot + 1
     crown + 5 minis = 45, about 4.6k pixels in all - nothing here is
     bigger than a 24x24 glow. */
  function build() {
    if (T.pellet) return;
    T.pelletSilver = [
      bakeDisc(7, P.ring, P.pelletSilver, P.pelletSilverHi, true),
      bakeDisc(7, P.ring, P.pelletSilver, P.pelletSilver, false)
    ];
    T.pellet = {
      yellow: bakeDisc(7, P.ring, P.pelletYellow, P.pelletYellowHi, true),
      red:    bakeDisc(8, P.ring, P.pelletRed, P.pelletRedHi, true),
      /* the sour's ring is PURPLE: a green disc with a dark ring would be
         a green disc, and the Fort has a green chamber */
      green:  bakeDisc(6, P.pelletPurple, P.pelletGreen, P.pelletGreenHi, false),
      silver: T.pelletSilver[0]
    };
    T.coin = [];
    for (var f = 0; f < 4; f++) T.coin.push(bakeCoin(f));
    T.glow = {
      red:   bakeGlow('255,59,42', 0.55),
      green: bakeGlow('140,255,90', 0.50),
      gold:  bakeGlow('255,214,110', 0.60),
      warm:  bakeGlow('255,207,138', 0.18),   /* the dark cups' backlight */
      /* a floating gun's halo: at 0.16 and r 16 an orange gun simply hung
         in the air; at 0.55 and r 22 it was conjured */
      pink:  bakeGlow('243,106,208', 0.55)
    };
    T.pop = {};
    for (var i = 0; i < KINDS.length; i++) T.pop[KINDS[i]] = bakePop(KINDS[i]);
    T.aimDot = bakeAimDot();
    T.crownMini = bakeCrownMini();
    T.cupMini = {
      crimson: bakeCupMini('crimson'), green: bakeCupMini('green'),
      silver: bakeCupMini('silver'), gold: bakeCupMini('gold'), king: bakeCupMini('king')
    };
  }

  /* ===================================================== geometry */

  /* THE BODY CENTRE. `ob.x` is the LEFT EDGE OF THE WINDOW the body can
     be found in and `ob.w` its width - collide's prefilter and save()
     read exactly those two, so a cupman is tested and cleared wherever
     in his patrol he is - and the march moves `ob.off` inside it. The
     engine scrolls ob.x; nobody else writes it. */
  function cx(ob) {
    if (ob.kind === 'king') return ob.x + ob.w / 2;
    if (ob.kind === 'gun') return ob.x + 18;
    return ob.x + ob.w / 2 + ob.off;
  }

  /* muzzleOf(ob, out) -> out = [hx, hy, mx, my, gs, fy]
     THE ONE FORMULA for where the gun is, used by the step that fires
     and by the draw that shows the sprite, the dots and the flash - so
     the pellet leaves exactly where the dots were. A held gun hangs at
     the hand, LOW AND FORWARD (c + face*hx, FLOOR - hy: 16..18px out
     from the centre and 4..5px off the rug, see GUN); a floating gun
     pivots on its centre. The draw does translate(h) . rotate(a) .
     (flip y when aiming left, so the gun is never upside down) .
     scale(gs) . drawImage(-pivot), so the muzzle in the world is that
     same chain applied to (mx - pivot): with fy = cos(a) < 0 ? -1 : 1,
       mx = hx + cos(a)*lx - sin(a)*ly*fy
       my = hy + sin(a)*lx + cos(a)*ly*fy
     where (lx, ly) = (muzzle - pivot) * gs. Bob is draw-only and not in
     here: a cupman who is aiming is standing still, and his bob is 0. */
  function muzzleOf(ob, out) {
    var g, gs, hx, hy, a = ob.aimA;
    if (ob.kind === 'gun') {
      g = GUN.king; gs = GUN_S_KING; hx = ob.x + 18; hy = ob.y;
    } else {
      g = GUN[ob.kind] || GUN.crimson; gs = CUP_S;
      hx = cx(ob) + (ob.face < 0 ? -g.hx : g.hx); hy = FLOOR - g.hy;
    }
    var fy = Math.cos(a) < 0 ? -1 : 1;
    var lx = (g.mx - g.gx) * gs, ly = (g.my - g.gy) * gs;
    var ca = Math.cos(a), sa = Math.sin(a);
    out[0] = hx; out[1] = hy;
    out[2] = hx + ca * lx - sa * ly * fy;
    out[3] = hy + sa * lx + ca * ly * fy;
    out[4] = gs; out[5] = fy;
    return out;
  }

  /* a segment against an axis-aligned rect, the slab method: no arrays,
     no allocation, true if any point of (x0,y0)-(x1,y1) is inside */
  function segHitsRect(x0, y0, x1, y1, rx, ry, rw, rh) {
    if (rw <= 0 || rh <= 0) return false;
    var dx = x1 - x0, dy = y1 - y0, t0 = 0, t1 = 1, p, q, r, k;
    for (k = 0; k < 4; k++) {
      if (k === 0) { p = -dx; q = x0 - rx; }
      else if (k === 1) { p = dx; q = rx + rw - x0; }
      else if (k === 2) { p = -dy; q = y0 - ry; }
      else { p = dy; q = ry + rh - y0; }
      if (p === 0) { if (q < 0) return false; continue; }
      r = q / p;
      if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; }
      else { if (r < t0) return false; if (r < t1) t1 = r; }
    }
    return true;
  }

  /* RULE 5. Off p.x/p.gapY/p.gapH directly - never rectsFor, never an
     array. The column union [p.x-4, p.x+38] is the caps' width taken all
     the way up and down: 4px conservative on a column row. THE CORRIDOR
     is that same union widened by the hitbox, [p.x-4-hr, p.x+38+hr]: the
     x-range in which the doodad's box overlaps cardboard and so has no
     horizontal escape - 64px for an 11px hitbox.

     lineBlocked: does cardboard stand between the muzzle and the target?
     ROUND 1 HELD EVERY SUCH SHOT, and that was most of them: a floor
     shooter's line to a doodad in the next gap crosses that plank's
     lower column for most of every bay, and the measured rate was 0.6..1
     shot per cupman encounter - "they're already gone before they can
     shoot". Round 2 FIRES IT: a blocked pellet pops on the plank
     (stepShot), which is the cupmen visibly fighting the room the doodad
     is threading, and costs the doodad nothing.

     downCorridor: the doodad is in a corridor AND the line to him is
     clear - a pellet down a plank's slot at a doodad with nowhere to go
     but along it. That one is still held. */
  function lineBlocked(obstacles, x0, y0, x1, y1) {
    var lo = Math.min(x0, x1), hi = Math.max(x0, x1);
    for (var i = 0; i < obstacles.length; i++) {
      var p = obstacles[i];
      if (p.type !== 'pillar') continue;
      if (p.x + 38 < lo || p.x - 4 > hi) continue;
      if (segHitsRect(x0, y0, x1, y1, p.x - 4, CEIL, 42, p.gapY - CEIL)) return true;
      var by = p.gapY + p.gapH;
      if (segHitsRect(x0, y0, x1, y1, p.x - 4, by, 42, FLOOR - by)) return true;
    }
    return false;
  }
  function downCorridor(obstacles, px, hr, x0, y0, x1, y1) {
    var inside = false;
    for (var i = 0; i < obstacles.length && !inside; i++) {
      var p = obstacles[i];
      if (p.type === 'pillar') inside = px >= p.x - 4 - hr && px <= p.x + 38 + hr;
    }
    return inside && !lineBlocked(obstacles, x0, y0, x1, y1);
  }

  /* RULE 9, counted with a loop: live pellets in the world plus the
     ones already queued this frame, so two cupmen firing on one frame
     cannot both see five. Six: round 2 raised it to 9 so the cap would
     not hold fire, and the owner found the result too hard to get past;
     with the cycles doubled the cap is the ceiling on a crowded sky
     again, which is what it is for. */
  function room(obstacles, run, n) {
    var live = 0, i, o;
    for (i = 0; i < obstacles.length; i++) {
      o = obstacles[i];
      if (o.shot && !o.broken && !o.gone) live++;
    }
    var born = run.born || [];
    for (i = 0; i < born.length; i++) if (born[i].shot) live++;
    return live + n <= MAX_SHOTS;
  }

  /* the wrapped difference b - a in (-PI, PI]. A raw approach() on
     atan2 swings the long way through 0 at the +-PI seam whenever the
     target is level with the hand - and Maximus trots at exactly that
     height. */
  function angDiff(b, a) { return wrap(b - a + PI, TAU) - PI; }

  /* ===================================================== the makers */

  /* A PELLET. (vx, vy) in the SCREEN frame (speedOf has already put
     run.speed into a cupman's); stepShot adds the room's speed back. `burst` is the [hi, body] pair the engine's splatter
     paints its pop in; `splat` how long the pop ring lasts; `cry` the
     audio role the engine plays when it admits this (rate-limited
     there, so a green blast is one noise). */
  function makeShot(kind, x, y, vx, vy, cry) {
    var s = SHOT[kind];
    return {
      type: 'drop', shot: true, kind: kind,
      x: x, y: y, w: kind === 'gold' ? 9 : 7,
      vx: vx, vy: vy,
      spicy: kind === 'red', gold: kind === 'gold', sour: kind === 'green',
      name: kind === 'gold' ? 'GOLD SHOT' : undefined,
      broken: 0, spin: 0, spinRate: kind === 'gold' ? 10 : 0,
      life: 3.0, homeT: kind === 'silver' ? HOME_T : 0, grav: 0,
      pop: false, gone: false, cry: cry || null,
      splat: 0.4, burst: [P[s.hi], P[s.body]],
      seed: randInt(0, 65535)
    };
  }

  /* THE KING'S COIN: out of his crown (10px under its top, y 152),
     up and over, under its own gravity - the only pellet that falls. +5 if caught, named CROWN so
     the shout says so; a missed one pops gold on the rug. No cry: the
     stomp or the regicide is already the noise of that frame. `y` and
     `vy` default to the crown's spot and -150; the regicide passes its
     own (see bopFoe). */
  function makeCrown(x, vx, y, vy) {
    var ob = makeShot('gold', x, y == null ? FLOOR - KING_H + 10 : y, vx,
                      vy == null ? -150 : vy, null);
    ob.name = 'CROWN';
    ob.grav = 300;
    ob.life = 4;
    ob.splat = 0.6;
    return ob;
  }

  /* AN ORDINARY CUPMAN, and TEEF'S SURFACING RULE. The patrol window
     sits 14px RIGHT of the bay's centre: centre = mid + 14, half = reach
     + 14 (14 = half the body plus 3). Teef dives under a plank and
     breach() surfaces him when his hitbox clears the plank's far edge,
     i.e. with his body at plank.x + 40..62 on the rug - and neither
     breach() nor the under-branch asks diveSpans again (it is asked on
     entry only). At spacingMin 190 a window centred on `mid` would put a
     body as near as plank.x + 36, on the surfacing spot. Offset, the
     nearest body edge is mid + 14 - 30 - 11 = plank.x + 68, clear of a
     surfacing hitbox; the far edge is mid + 55 against the next cap at
     mid + 91, which leaves 36px of rug. */
  function makeCupman(kind, mid) {
    var rk = RANK[kind], half = rk.reach + 14, centre = mid + 14;
    var off = rand(-rk.reach, rk.reach), dir = chance(0.5) ? 1 : -1;
    /* `bop` makes his flagged head strip a bop surface (foeRects), and
       `burst` is the colour of the stomp's particles: his own plastic and
       the white of his rim */
    return {
      type: 'spike', foe: true, kind: kind, side: 'floor', bop: true,
      x: centre - half, w: half * 2, y: FLOOR,
      reach: rk.reach, off: off, dir: dir, face: dir,
      mode: 'march', speed: rk.speed,
      cool: rand(0.1, 0.4), tele: 0, teleMax: 0, hot: false,
      volley: 0, volleyT: 0, shots: 0, lastRed: false,
      hp: 1, gone: false, flashT: 0, downT: 0,
      stepT: rand(0, STEP_T), stepTo: off, walk: 1, marching: true,
      aimA: dir > 0 ? REST : PI - REST, aimV: 0, aimLock: false, lockT: 0,
      since: 9, shielded: false,
      burst: [P[rk.body], P.eyeWhite]
    };
  }

  /* THE KING. 76 wide (his drawn width, the widest of his boxes and
     his painting - collide's prefilter and save() read ob.w), centre at
     ob.x + ob.w/2. `keep` keeps him through a save; `bop` makes his
     flagged crown box a bop surface; `burst` is the colour of his crown
     flying off when he is bopped. L.ky is half his height, where the
     summoning is said to come from. */
  function makeKing(mid, run) {
    var L = run.ledger;
    L.kx = mid; L.ky = FLOOR - KING_H / 2; L.kingHurt = 0; L.summonT = 0;
    return {
      type: 'spike', foe: true, kind: 'king', side: 'floor', keep: true, bop: true,
      x: mid - KING_W / 2, w: KING_W, y: FLOOR, vx: -120, mode: 'enter', face: -1,
      hp: tune.kingHp, hurtT: 0, squash: 1, tilt: 0, summonT: 0, downT: 0,
      shielded: false, fade: 1, warned: false,
      burst: [P.cupGold, P.crown], gone: false
    };
  }

  /* A FLOATING GUN, summoned into slot 0 (high) or slot 1 (mid), both
     AHEAD of him at GUN_DX. No boxes - see foeRects. The first shot of
     slot 1 trails slot 0's by 0.85s, so the two never fire together
     (and stepGun puts that stagger back after every bop). */
  function makeGun(slot, L) {
    var wantX = L.kx + GUN_DX[slot];
    return {
      type: 'spike', foe: true, kind: 'gun', side: 'air', slot: slot,
      x: wantX - 18, w: 36, y: GUN_Y[slot], vx: 0, face: -1,
      mode: 'rise', riseT: 0.4, leaveT: 0, tele: 0, teleMax: 0, hot: false,
      cool: 0.85 * slot + 0.6, shots: 0, aimA: PI, aimV: 0, aimLock: false, lockT: 0, since: 9,
      flashT: 0, gone: false, fade: 1, shielded: false, cry: 'summon'
    };
  }

  /* makeFoe(mid, spacing, run): the engine asks once per bay, from
     pace >= tune.foeScore, after the bay's spike, litter and boon makers
     have had their go. In this order:
       1. THE KING, before every cap: at pace >= kingAt (30), once a run,
          in the late phase. He comes whatever the bay holds - he stands in
          the screen frame, and the level draws any plank passing through
          him over him. HE STOPS THE BISCUITS: the ledger's holdDrops is
          the engine's one read-only key (js/scene_play.js spawnDrops), so
          the sky goes quiet from his summons until he falls (bopFoe) -
          the owner's note, "have them stop coming down when the King
          Cupman is present". The drop timer is frozen, not reset.
       2. THE BAY FLAGS: a bay holds ONE thing on its floor. The pillar
          maker reset both, the spike and boon makers set them, so a bay
          with the spare life on its rug never has a cupman in it.
       3. WHILE HE REIGNS: a rare Golden Order (one bay in eight) and
          nothing else. At 0.18 an Order scrolling through his 76px body
          was a common sight, two lethal paintings stacked at the floor.
       4. THE DICE: 0.9, "almost every pillar". Round 1 rolled 0.55 / 0.62
          behind a streak cap (no two bays in a row before the late phase,
          no three after) and the owner asked for "much more often"; the
          cap is gone. With 190..232 spacing on a 480 screen that is two
          cupmen on screen at once and sometimes three, which rule 9's
          live-pellet cap (6) keeps in check. */
  function makeFoe(mid, spacing, run) {
    var L = run.ledger;
    if (!L) return null;
    if (run.score >= tune.kingAt && !L.kingSeen && run.late) {
      L.kingSeen = true;
      L.kingUp = true;
      L.holdDrops = true;
      return makeKing(mid, run);
    }
    if (L.baySpike || L.bayBoon) return null;
    if (L.kingUp) return chance(0.12) ? makeCupman('gold', mid) : null;
    if (!chance(0.9)) return null;
    var kind;
    if (!run.late) kind = chance(0.78) ? 'crimson' : 'green';
    else {
      var r = Math.random();
      kind = r < 0.34 ? 'crimson' : (r < 0.48 ? 'green' : (r < 0.74 ? 'silver' : 'gold'));
    }
    return makeCupman(kind, mid);
  }

  /* ===================================================== the guns go off

     THE CYCLE, shared by every shooter, rebuilt in round 2 because the
     owner found the aim "weird, glitchy and choppy" and the cupmen
     "already gone before they can shoot". Round 1 locked the aim only
     while the line was clear and unlocked it whenever cardboard crossed
     it, so behind every plank the dots flicked between frozen and
     tracking; it ticked the Sentinel's aim 15 degrees at a time; it slid
     the far dot in an 8px saw; and it held every shot whose line crossed
     cardboard, which was most of them. Now:

       TRACK   the telegraph starts when the cooldown is spent and the gun
               is within 0.25 rad of its target. The dots grow out of the
               muzzle and follow the aim, which is smooth (aimAt).
       HOLD    the tracking part runs down to LOCK seconds and waits there,
               still tracking, while the shot would be unfair: point blank
               (rule 3) or straight down a corridor (rule 5). Nothing
               changes on screen - the same dots go on following.
       LOCK    the first frame the shot is fair, the aim FREEZES and the
               dots take the colour of what is coming, for LOCK = 0.15s
               (the frame that locks is not counted, so the frozen line is
               on screen for at least 0.15s). This is the only transition
               a telegraph makes: once locked it never unlocks.
       FIRE    if the shot is still fair - not gone point blank, not down a
               corridor, the sky not full (rule 9) - it fires along the
               locked line, WHETHER OR NOT CARDBOARD IS IN THE WAY: a
               blocked pellet pops on the plank. If it is not, he STANDS
               DOWN - the dots go, a 0.3s breath, a fresh short telegraph -
               rather than firing a line he can no longer stand behind.

     A Sentinel's burst runs on after its first shot, 0.14s apart, along
     the SAME locked line; it stops only when the shot would no longer be
     fair (`lineOk`: point blank or down a corridor), never because of
     cardboard. The three pellets are one line shown once. */
  function teleShort(rk) { return Math.max(TELE_MIN, rk.tele / 2); }

  /* the SCREEN speed a pellet leaves at: a cupman's is 0.85 of the rug's
     speed plus its muzzle speed, never under the rug's plus M_MIN (rule 8
     and SHOT); a floating gun's is its own 128 */
  function speedOf(kind, run, ob) {
    if (ob.kind === 'gun') return GUN_V;
    return Math.max(run.speed + M_MIN, SLOW * (run.speed + SHOT[kind].M));
  }

  function shoot(ob, run, kind, a, V, cry) {
    var bx = MZ[2] + Math.cos(a) * 4, by = MZ[3] + Math.sin(a) * 4;
    /* born 4px PAST the muzzle: the pellet is on the pixel layer, under
       the gun on the smooth one, and 4px keeps it out from under the
       barrel on its first frame */
    run.born.push(makeShot(kind, bx, by, Math.cos(a) * V, Math.sin(a) * V, cry));
  }

  /* one red in N, never two in a row */
  function redOr(ob, n) {
    var red = !ob.lastRed && chance(1 / n);
    ob.lastRed = red;
    return red ? 'red' : 'yellow';
  }

  function fire(ob, run, obstacles) {
    var a = ob.aimA, rk = RANK[ob.kind], k;
    if (ob.kind === 'green') {
      if (!room(obstacles, run, 2)) return false;
      shoot(ob, run, 'green', a - 0.14, speedOf('green', run, ob), rk.cry);
      shoot(ob, run, 'green', a + 0.14, speedOf('green', run, ob), rk.cry);
    } else {
      if (!room(obstacles, run, 1)) return false;
      if (ob.kind === 'crimson') k = redOr(ob, 5);
      else if (ob.kind === 'silver') { k = redOr(ob, 6); ob.volley = 2; ob.volleyT = VOLLEY_DT; }
      else if (ob.kind === 'gold') k = chance(0.25) ? 'gold' : 'silver';
      else k = 'yellow';                 /* the King's guns: yellow only */
      shoot(ob, run, k, a, speedOf(k, run, ob), rk.cry);
    }
    ob.flashT = 0.12;
    ob.shots++;
    ob.since = 0;
    return true;
  }

  /* `fair` is this frame's verdict on the shot (rules 3 and 5, and the
     King's gun stagger); `want` the aim being followed; `lineOk` the
     same verdict along the locked line, for a burst in flight. */
  function cycle(ob, dt, obstacles, run, fair, want, lineOk) {
    var rk = RANK[ob.kind];
    if (ob.volley > 0) {
      if (!lineOk) { ob.volley = 0; return; }
      ob.volleyT -= dt;
      if (ob.volleyT <= 0) {
        ob.volleyT = VOLLEY_DT;
        ob.volley--;
        if (room(obstacles, run, 1)) {
          var vk = redOr(ob, 6);
          shoot(ob, run, vk, ob.aimA, speedOf(vk, run, ob), rk.cry);
          ob.flashT = 0.12;
        }
      }
      return;
    }
    if (ob.tele > 0) {
      if (!ob.aimLock) {
        ob.tele = Math.max(LOCK, ob.tele - dt);
        if (ob.tele <= LOCK && fair) { ob.aimLock = true; ob.aimV = 0; ob.lockT = 0; }
        return;
      }
      ob.lockT += dt;
      ob.tele = Math.max(0, LOCK - ob.lockT);
      if (ob.lockT < LOCK) return;
      ob.tele = 0;
      ob.aimLock = false;
      ob.lockT = 0;
      if (fair && fire(ob, run, obstacles)) {
        ob.hot = true;
        ob.cool = Math.max(0.3, rk.cool - teleShort(rk));
      } else {
        ob.cool = 0.3;                   /* he stands down, and goes again */
      }
      return;
    }
    if (ob.cool <= 0 && Math.abs(angDiff(want, ob.aimA)) <= 0.25) {
      ob.tele = ob.teleMax = ob.hot ? teleShort(rk) : rk.tele;
      ob.lockT = 0;
    }
  }

  /* where to point: the player plus HALF a lead on his vertical speed
     (rule 7). Writes TX/TY. `floorShooter` keeps a cupman from aiming
     into his own rug (ty <= hand - 2); a floating gun has no rug. */
  var TX = 0, TY = 0;
  function target(run, hx, hy, V, floorShooter) {
    var px = run.px, py = run.py;
    var d0 = Math.sqrt((px - hx) * (px - hx) + (py - hy) * (py - hy));
    var lead = Math.min(0.35, d0 / V) * 0.5;
    var lo = CEIL + 8, hi = floorShooter ? Math.min(FLOOR - 8, hy - 2) : FLOOR - 8;
    TX = px;
    TY = clamp(py + (run.pvy || 0) * lead, lo, hi);
    return Math.sqrt((TX - hx) * (TX - hx) + (TY - hy) * (TY - hy));
  }

  /* THE AIM, A CRITICALLY DAMPED FOLLOW: an angular velocity aimV pulled
     towards the wrapped difference by w^2 and braked by 2w, so the gun
     swings to a new target without overshoot and without a corner in
     its motion - the doodad's lead jumps whenever he flaps (rule 7 reads
     his vertical speed), and round 1's clamped 9 rad/s chase turned each
     flap into a visible snap. aimV is capped at AIM_VMAX; the step is
     split in two over 20ms so a long frame (game.js caps one at 1/30s)
     stays well damped at w 22 (w x h <= 0.37).
     A locked aim, and a burst in flight, hold perfectly still: shots 2
     and 3 follow the line the telegraph showed (rule 6). */
  function aimAt(ob, dt, want, w) {
    if (ob.aimLock || ob.volley > 0) { ob.aimV = 0; return; }
    var n = dt > 0.02 ? 2 : 1, h = dt / n;
    for (var i = 0; i < n; i++) {
      var d = angDiff(want, ob.aimA);
      ob.aimV += (w * w * d - 2 * w * ob.aimV) * h;
      ob.aimV = clamp(ob.aimV, -AIM_VMAX, AIM_VMAX);
      ob.aimA = angDiff(ob.aimA + ob.aimV * h, 0);
    }
  }

  /* A TURN IS INSTANT. The owner: "just have them change the direction
     they are facing without any in-between frames" - round 1 squeezed the
     cup's width through zero over 0.12s, which showed the painting as the
     flat card it is. The gun mirrors with the cup (a -> PI - a, and its
     swing with it), so a cupman who turns round is holding the same gun
     the same way on the other side rather than swinging it through his
     own face. */
  function turn(ob, f) {
    ob.face = f;
    ob.aimA = angDiff(PI - ob.aimA, 0);
    ob.aimV = -ob.aimV;
  }

  /* ===================================================== the steps

     THE CONTRACT (the engine's stepBoon contract, plus two sentences):
     the engine has ALREADY scrolled ob.x this frame, so anything holding
     station adds run.speed back and works in the SCREEN frame; px/py are
     one frame stale; a step may read the list but never splice it; it
     may push NEW obstacles into run.born, which the engine admits after
     its walk returns; and it may set ob.gone to retire the one it was
     handed. Nothing here plays a sound or makes a particle. */

  function march(ob, dt) {
    if (ob.kind === 'silver') {
      /* 10px every 0.30s, each step a 0.08s slide and then dead still:
         a machine, not a waddle. stepTo is where the foot is going; off
         slides to it at 125px/s, and the cup squashes as the foot plants
         (drawCupman). */
      ob.stepT += dt;
      if (ob.stepT >= STEP_T) {
        ob.stepT = 0;
        var to = ob.stepTo + ob.dir * STEP_PX;
        if (Math.abs(to) >= ob.reach) { to = (to < 0 ? -1 : 1) * ob.reach; ob.dir = -ob.dir; }
        ob.stepTo = to;
      }
      ob.off = approach(ob.off, ob.stepTo, STEP_PX / SLIDE_T * dt);
    } else {
      ob.off += ob.dir * ob.speed * dt;
      if (Math.abs(ob.off) >= ob.reach) {
        ob.off = (ob.off < 0 ? -1 : 1) * ob.reach;
        ob.dir = -ob.dir;
      }
    }
  }

  function stepCupman(ob, dt, obstacles, run) {
    /* BOPPED: he topples for DOWN_T and is gone. No boxes (foeRects), no
       aim, no march - the engine scrolls him with the rug. */
    if (ob.mode === 'down') {
      ob.downT -= dt;
      if (ob.downT <= 0) ob.gone = true;
      return;
    }
    var rk = RANK[ob.kind], c = cx(ob), px = run.px;
    /* RULE 2: he FIRES only with the whole cup inside the screen, EDGE =
       16 being his 13.7px half-width and a little. He RAISES HIS GUN and
       may start his telegraph a little earlier, from c <= VW + READY,
       when the gun and the dots - both on his screen side, his left - are
       already on it and half of him is: the lock then waits for all of
       him (`fair`, below), so the dots are on screen for the whole of
       their tracking part before anything can fire. That buys the 0.15s
       his aim needs to swing up from the carry, and 30px of scroll. */
    var onScreen = c >= EDGE && c <= VW - EDGE;
    var inView = c >= EDGE && c <= VW + READY;
    var ahead = c - px;
    /* RULES 1 AND 4. RANGE is 400, past anything on the screen: he
       engages the moment he is in view, which at the doodad's start x
       (116) is ~380px and ~2s ahead of him. Round 1's 230 left the first
       ~0.8s of every cupman with his gun down. Engagement asks nothing
       about the pellet cap. */
    var engaged = inView && ahead >= ENGAGE_MIN && ahead <= RANGE && !run.under && !run.grace;
    /* TOO CLOSE: 0..40px ahead he stops and turns to watch. A body that
       has stopped is the most readable thing a lethal body can do, and
       one that set off towards a doodad a cup's width away would be
       unreadable. PASSED by 24px or more, he goes back to his patrol: he
       cannot reach a doodad any more except one holding LEFT at the
       slowest scroll, which is that player's own choice. */
    var passed = inView && ahead < -24;
    var watching = !engaged && inView && ahead < ENGAGE_MIN && !passed;
    /* BETWEEN SHOTS he marches too: from the moment a shot or burst is
       away until 0.15s before the next telegraph could start, so he is
       standing before the dots show and the muzzle never moves under a
       line it has shown. He keeps FACING the doodad and keeps his aim on
       him while he walks - a strafe, not a turn: round 1 turned him to
       his walk and lowered the gun between every pair of shots, which at
       a 0.7s cycle would be a flip and a swing every few frames. */
    var between = engaged && ob.tele <= 0 && ob.volley <= 0 && ob.cool > 0.15;
    var walking = (!engaged && !watching) || between;
    /* A PASSED CUPMAN NEVER TURNS AGAIN. He walks on the way he is facing
       and stands still at the end of his patrol rather than reversing:
       the reversal was a second 180 a fraction of a second after the one
       that set him walking, 13 of ~103 bays late in a run, and it read as
       a twitch on a cupman the doodad had already left behind. */
    if (passed) {
      ob.dir = ob.face;
      if (ob.off * ob.face >= ob.reach - 0.5) walking = false;
    }

    ob.cool = Math.max(0, ob.cool - dt);
    if (ob.flashT > 0) ob.flashT -= dt;

    /* face the doodad while engaged or watching, else the way he walks.
       WATCHING turns him only TOWARDS a doodad still in front of him;
       once it is over his head or behind him he holds the face he has.
       Round 2's first cut faced the sign of px - c all through the watch
       window, so a doodad flying over flipped him at ahead ~0 and then
       his patrol (ob.dir, usually the other way) flipped him back at
       ahead -24: two instant 180s about 0.14s apart, measured on 109 of
       ~220 bays (verify-mech WARN 1), which read as a twitch. Now a
       passed cupman turns at most once, at -24, to walk on. */
    var wantFace = engaged ? (px < c ? -1 : 1)
      : watching ? (px < c ? -1 : ob.face)
      : passed ? ob.face
      : ob.dir;
    if (wantFace !== ob.face) turn(ob, wantFace);

    if (walking) march(ob, dt);
    else if (ob.kind === 'silver') ob.off = approach(ob.off, ob.stepTo, STEP_PX / SLIDE_T * dt);
    ob.marching = walking;
    ob.walk = approach(ob.walk, walking && ob.kind !== 'silver' ? 1 : 0, dt * 6);
    ob.mode = walking && !engaged ? 'march' : (engaged ? 'aim' : 'watch');

    muzzleOf(ob, MZ);
    if (!engaged) {
      /* the gun comes down to the carry on the side he faces, on the same
         spring as the aim; the telegraph and any burst are dropped and
         the next engagement starts with the full-length telegraph */
      ob.tele = 0; ob.volley = 0; ob.hot = false; ob.aimLock = false; ob.lockT = 0;
      aimAt(ob, dt, ob.face > 0 ? REST : PI - REST, REST_W);
      return;
    }
    /* the lead is worked out on the pellet's own screen speed */
    var V = speedOf(ob.kind === 'gold' ? 'silver' : 'yellow', run, ob);
    target(run, MZ[0], MZ[1], V, true);
    var want = Math.atan2(TY - MZ[1], TX - MZ[0]);
    aimAt(ob, dt, want, rk.aimW);
    muzzleOf(ob, MZ);
    /* RULE 3, POINT BLANK, measured from the MUZZLE, where the pellet is
       born, to the near edge of the doodad's hitbox (hr + the pellet's
       half box, 4) - where it would actually strike - and in TIME as well
       as distance: FIRE_MIN px AND FIRE_T s at the pellet's own screen
       speed, whichever is further (under the heat the rug is 1.55x; 0.40s
       of 310px/s is 124px). Measured to the centre, as round 1 did, a
       pellet arrived 15px early: 0.35s against a 0.40 rule. RULE 5, the
       corridor, is downCorridor; rule 2 is onScreen. Together they make
       `fair`, which gates the LOCK and the SHOT and never the telegraph
       (cycle). */
    var hr = run.hr || 11;
    var dm = Math.sqrt((TX - MZ[2]) * (TX - MZ[2]) + (TY - MZ[3]) * (TY - MZ[3]));
    var far = dm - hr - 4 >= Math.max(FIRE_MIN, FIRE_T * V);
    var fair = onScreen && far && !downCorridor(obstacles, px, hr, MZ[2], MZ[3], TX, TY);
    /* a burst runs on along its LOCKED line under the same two rules -
       point blank, and a clear line down a corridor - for every pellet,
       not only the first */
    var lineOk = ob.volley <= 0 || (far && !downCorridor(obstacles, px, hr, MZ[2], MZ[3],
      MZ[2] + Math.cos(ob.aimA) * dm, MZ[3] + Math.sin(ob.aimA) * dm));
    cycle(ob, dt, obstacles, run, fair, want, lineOk);
  }

  /* THE KING. Enter, reign, down. */
  function stepKing(ob, dt, obstacles, run) {
    var L = run.ledger, c = cx(ob), i, o;
    if (ob.hurtT > 0) ob.hurtT -= dt;
    ob.squash = approach(ob.squash, 1, dt);          /* 0.7 -> 1 in 0.3s */

    if (ob.mode === 'enter') {
      /* he strides in from the right at 120px/s on the screen - a giant
         does not run - announces himself the first frame he is properly
         on it, and plants his feet at KING_X */
      ob.vx = -120;
      ob.x += (run.speed + ob.vx) * dt;
      c = cx(ob);
      if (!ob.warned && c <= VW - 30) { ob.warned = true; L.warn = 'king'; L.cry = 'summon'; }
      if (c <= KING_X) { ob.mode = 'reign'; ob.vx = 0; }
    } else if (ob.mode === 'reign') {
      /* STATION KEEPING, the Chalkboard shark's one line: vx in the
         screen frame, 0 holds station, and the room's speed added back
         because the engine took it off before calling. The slow 10px
         sway is THE ONLY DEVIATION from "moving forward at the same rate
         as the screen": a giant standing perfectly still reads as a
         painting stuck to the glass. cx stays in 238..258, so the crown
         box (cx-14..cx+14 = 224..272) is always inside the player's
         reach of X_MAX 304. */
      var want = KING_X + Math.sin(ob.age * 0.8) * 10;
      ob.vx = approach(ob.vx, clamp((want - c) * 3, -60, 60), 300 * dt);
      ob.x += (run.speed + ob.vx) * dt;
    } else if (ob.mode === 'down') {
      ob.x += run.speed * dt;               /* he falls where he stood */
      ob.downT -= dt;
      if (ob.downT <= 0) { ob.gone = true; return; }
    }
    c = cx(ob);

    /* THE SHIELD AND THE FADE, two tests about two different things.
       THE SHIELD (rule 12) is about THE PLAYER: the crown box is
       withdrawn while any plank overlaps the doodad's hitbox now or will
       within LOOK = 0.3s, and while a floor stand overlaps it now. The
       bop's rebound lifts the doodad 25px with its apex at 0.21s, so
       from a crown at 142 the hitbox top reaches 142 - 2*11 - 1 - 25 =
       94, well up any upper column (gapY <= 126): a bop must never
       happen with cardboard about to arrive. The plank's leading edge
       travels 0.3 * run.speed (46..53px) in that time, hence the stretch
       to the left. At a 153px/s scroll the window is (215 - 64 - 46)/153 = 0.69s
       in every 1.41s plank period - about what it was at 66px tall.
       THE FADE is about THE KING: while cardboard crosses his drawn body
       (38px either side of his centre) he fades to 0.8. The level redraws
       those planks over him, so he already stands behind them; the fade
       is only a hint that the crown is not there to land on. */
    var sh = false, fade = false, pl = run.px - run.hr, pr = run.px + run.hr;
    var ahead = LOOK * run.speed, w;
    for (i = 0; i < obstacles.length; i++) {
      o = obstacles[i];
      if (o.type === 'pillar') {
        fade = fade || (o.x + 38 >= c - KING_HALF && o.x - 4 <= c + KING_HALF);
        sh = sh || (o.x + 38 >= pl && o.x - 4 - ahead <= pr);
      } else if (o.type === 'spike' && !o.foe) {
        w = o.w || 0;
        fade = fade || (o.x + w >= c - KING_HALF && o.x <= c + KING_HALF);
        sh = sh || (o.x + w >= pl && o.x <= pr);
      }
    }
    ob.shielded = sh;
    ob.fade = approach(ob.fade, fade ? 0.8 : 1, dt * 0.2 / 0.15);

    if (ob.mode === 'down') return;
    L.kx = c;
    L.ky = FLOOR - KING_H / 2;
    L.kingHurt = Math.max(0, ob.hurtT);

    /* THE SUMMONS: one loop, a bit per slot in use, one gun per 1.2s
       into the first free slot, never while he is hurt or entering. A
       gun spliced by a save is simply not in the list when he looks. */
    L.summonT = (L.summonT || 0) - dt;
    if (ob.mode === 'reign' && ob.hurtT <= 0 && L.summonT <= 0) {
      var used = 0;
      for (i = 0; i < obstacles.length; i++) {
        o = obstacles[i];
        if (o.kind === 'gun' && o.foe && !o.gone && o.mode !== 'leave') used |= (1 << o.slot);
      }
      var born = run.born;
      for (i = 0; i < born.length; i++) if (born[i].kind === 'gun') used |= (1 << born[i].slot);
      var slot = !(used & 1) ? 0 : (!(used & 2) ? 1 : -1);
      if (slot >= 0) { born.push(makeGun(slot, L)); L.summonT = 1.2; }
    }
  }

  function stepGun(ob, dt, obstacles, run) {
    var L = run.ledger, px = run.px;
    if (ob.flashT > 0) ob.flashT -= dt;
    ob.cool = Math.max(0, ob.cool - dt);
    ob.since += dt;
    if (L.kingDown && ob.mode !== 'leave') { ob.mode = 'leave'; ob.leaveT = 0.3; ob.tele = 0; ob.aimLock = false; }

    /* station in the screen frame, AHEAD of him (GUN_DX): slot 0 high,
       slot 1 mid, each bobbing on its own */
    var wantX = (L.kx || KING_X) + GUN_DX[ob.slot];
    var wantY = GUN_Y[ob.slot] + Math.sin(ob.age * 2.6) * 5;
    var c = cx(ob);
    ob.vx = clamp((wantX - c) * 4, -90, 90);
    ob.x += (run.speed + ob.vx) * dt;
    ob.y = damp(ob.y, wantY, 0.004, dt);
    c = cx(ob);

    var sh = false;
    for (var i = 0; i < obstacles.length && !sh; i++) {
      var p = obstacles[i];
      if (p.type === 'pillar') sh = p.x + 38 >= c - 18 && p.x - 4 <= c + 18;
    }
    ob.shielded = sh;
    ob.fade = approach(ob.fade, sh ? 0.6 : 1, dt * 0.4 / 0.15);

    if (ob.mode === 'leave') {
      ob.leaveT -= dt;
      if (ob.leaveT <= 0) ob.gone = true;
      return;
    }
    if (ob.mode === 'rise') {
      ob.riseT -= dt;
      if (ob.riseT <= 0) { ob.riseT = 0; ob.mode = 'float'; }
      return;
    }
    /* the gun holds while he is hurt, during the grace, while Teef is
       under, and while the player is not 40px AHEAD of it (slot 0 at
       kx + 64 = 302..322 can be within 40 of a player at 285..304) */
    var engaged = c > 8 && c < VW - 24 && c - px >= GUN_AHEAD && !(L.kingHurt > 0) &&
                  !run.grace && !run.under && !L.kingDown;
    muzzleOf(ob, MZ);
    if (!engaged) {
      ob.tele = 0; ob.aimLock = false; ob.hot = false; ob.lockT = 0;
      /* THE STAGGER, PUT BACK. While he is hurt both guns are held and
         their cool would run to 0, so both would start the full 0.35s
         telegraph on the frame the hurt ends and fire together - two
         lines converging on one point. Held at 0.45 and 1.3, the first
         shots land 0.8s and 1.65s after the hurt. */
      if (L.kingHurt > 0) ob.cool = Math.max(ob.cool, 0.45 + 0.85 * ob.slot);
      aimAt(ob, dt, PI, REST_W);
      return;
    }
    var dist = target(run, MZ[0], MZ[1], GUN_V, false);
    var want = Math.atan2(TY - MZ[1], TX - MZ[0]);
    aimAt(ob, dt, want, RANK.gun.aimW);
    muzzleOf(ob, MZ);
    /* THE STAGGER, KEPT. Both guns telegraph together and, unchecked,
       lock and fire together - two lines converging on one point,
       measured on every pair of shots in a reign in round 1. A gun whose
       sibling fired under GUN_GAP ago is not `fair`: it waits, tracking,
       until the gap has passed and then locks for the full LOCK, so the
       second pellet trails the first by at least 0.75s; and if both lock
       on one frame, whichever steps second finds the other's `since` at 0
       when its lock runs out and stands down. Like a cupman's, a floating
       gun fires through cardboard and holds only point blank or down a
       corridor. */
    var sib = false;
    for (var j = 0; j < obstacles.length; j++) {
      var g = obstacles[j];
      if (g !== ob && g.kind === 'gun' && g.foe && !g.gone && g.since < GUN_GAP) sib = true;
    }
    var fair = dist >= GUN_MIN && !sib && !downCorridor(obstacles, px, run.hr || 11, MZ[2], MZ[3], TX, TY);
    cycle(ob, dt, obstacles, run, fair, want, fair);
  }

  function stepFoe(ob, dt, obstacles, run) {
    if (ob.gone || !run.ledger || !run.born) return;
    if (ob.kind === 'king') stepKing(ob, dt, obstacles, run);
    else if (ob.kind === 'gun') stepGun(ob, dt, obstacles, run);
    else stepCupman(ob, dt, obstacles, run);
  }

  /* bopFoe(ob, run): the engine has already stomped, shaken, rebounded
     the doodad and played 'stomp', in the cupman's own colours (burst).

     AN ORDINARY CUPMAN goes over on the first bop - the owner: "make the
     regular cupmen boppable if you land on their heads without getting
     shot". No points (the stomp and the rebound are the reward; a cupman
     on nearly every bay paying for each would turn the bay's scores into
     a stomping count). His telegraph and any burst die with him; a
     pellet already in the air flies on.

     THE KING: a bounce off the crown while he is
     entering or still hurt is only that - a bounce, no hp. The fight's
     reward is paid PER BOP, out of his crown: one CROWN coin each, +15
     for the fight in all. Three on the fall made it +25 - about 35s of
     play at pace 30 for a 5..15s fight - and the bay's high scores
     would have become "did you kill the King"; +15 is still the biggest
     single payout in the game, and paid only for the fight.
     A cry is left alone on a bop; on the fall the ledger asks for the
     regicide, the banner, the shake and the deed, which the engine
     drains at the end of the same bop() - so a bop that also ends the run
     in the same collide() walk still banks the badge. */
  function bopFoe(ob, run) {
    if (ob.kind === 'gun') return;
    if (ob.kind !== 'king') {
      if (ob.mode === 'down') return;
      ob.mode = 'down';
      ob.downT = DOWN_T;
      ob.tele = 0; ob.volley = 0; ob.aimLock = false; ob.flashT = 0;
      return;
    }
    if (ob.mode !== 'reign' || ob.hurtT > 0) return;
    var L = run.ledger, c = cx(ob);
    ob.hp--;
    ob.hurtT = 1.0;
    ob.squash = 0.7;
    ob.tilt += 0.06;                /* he leans further with every bop */
    L.kingHurt = 1.0;
    if (ob.hp > 0) {
      run.born.push(makeCrown(c, rand(-60, 60)));
      return;
    }
    ob.mode = 'down';
    ob.downT = 0.9;
    ob.vx = 0;
    L.kingUp = false;
    L.kingDown = true;
    L.holdDrops = false;            /* the biscuits fall again (makeFoe) */
    L.warn = 'kingDown';
    L.cry = 'regicide';
    L.shake = 6;
    L.deed = 'king';
    /* THE REGICIDE COIN is born LOW AND AHEAD, not in the crown: the
       doodad that just bopped him has rebounded to y ~130, right where a
       crown-born coin (x c, y 152) would appear, and it was taken on its
       first frame - `gifts: []` 0.4s and 0.7s after 'down' - so the owner
       never saw the King pay. From (c + 28, FLOOR - 40 = 202) at +70 /
       -200 under grav 300 it arcs up and right to an apex of y ~135 at
       0.67s and lands ~1.5s out: 72px under the bop, a thing you reach for.
       The per-bop coins above stay in the crown (caught on purpose). */
    run.born.push(makeCrown(c + 28, 70, FLOOR - 40, -200));
  }

  /* stepShot(ob, dt, obstacles, run) -> true when it is done (the engine
     lands it; with ob.pop set, it bursts where it struck in its own
     colours rather than on the floor). In the SCREEN frame, like the
     King: the engine took the room's speed off. */
  function stepShot(ob, dt, obstacles, run) {
    ob.life -= dt;
    if (ob.life <= 0) { ob.pop = true; return true; }

    /* HOMING, rule 11. Round 2 slowed the silver to 0.85 and slowed its
       turn with it, 2.4 -> 2.0 rad/s, and stretched its homing life 1.1
       -> 1.3s, so it flies THE SAME CURVE, only slower: at most 149
       degrees over its life, and a turning circle at its 185..226px/s on
       the screen (run.speed 130..178) of V/TURN = 92..113px of radius
       (round 1: 85..111) - still a bend you see. A faster turn on a slower
       pellet would have made it a better homer, the opposite of the ask.
       From the nearest it may fire (rule 3: 0.40s of its own flight) it
       turns at most 0.8 rad before it arrives, while a flap has moved the
       doodad ~37px in its first 0.15s. And it never turns round: once it
       is past him it is done. */
    if (ob.homeT > 0) {
      if (ob.x > run.px - 10) {
        var want = Math.atan2(run.py - ob.y, run.px - ob.x);
        var cur = Math.atan2(ob.vy, ob.vx);
        cur += clamp(angDiff(want, cur), -TURN * dt, TURN * dt);
        var v = Math.sqrt(ob.vx * ob.vx + ob.vy * ob.vy);
        ob.vx = Math.cos(cur) * v;
        ob.vy = Math.sin(cur) * v;
        ob.homeT -= dt;
      } else ob.homeT = 0;
    }
    if (ob.grav) ob.vy += ob.grav * dt;          /* the King's crowns only */
    ob.x += (run.speed + ob.vx) * dt;
    ob.y += ob.vy * dt;
    if (ob.spinRate) ob.spin += ob.spinRate * dt;

    if (ob.x > VW + 20 || ob.x < -20) { ob.gone = true; return false; }
    if (ob.y <= CEIL + 2) { ob.y = CEIL + 2; ob.pop = true; return true; }     /* the roof panel */
    if (ob.y >= FLOOR - 3) { ob.y = FLOOR - 3; ob.pop = true; return true; }   /* the rug */

    /* CARDBOARD IS SOLID. The circle against the column union straight
       off p.x/p.gapY/p.gapH - no rectsFor, no arrays. 42 wide over a 34
       column: a pellet pops 4px early on a column row, which nobody can
       see, and the test allocates nothing. */
    var r = SHOT[ob.kind].r;
    for (var i = 0; i < obstacles.length; i++) {
      var p = obstacles[i];
      if (p.type !== 'pillar' || Math.abs(p.x + 17 - ob.x) >= 60) continue;
      var by = p.gapY + p.gapH;
      if (circleHitsRect(ob.x, ob.y, r, p.x - 4, CEIL, 42, p.gapY - CEIL) ||
          circleHitsRect(ob.x, ob.y, r, p.x - 4, by, 42, FLOOR - by)) {
        ob.pop = true;
        return true;
      }
    }
    return false;
  }

  /* ===================================================== the boxes */

  /* AN ORDINARY CUPMAN, THE KING'S PATTERN AT HIS SIZE. First his HEAD,
     BOP-ONLY (the 5th element): the top 6px of the cup, y 212..218, 20
     wide - the cup's base is 20px across up there. Then his BODY,
     LETHAL, y 218..242, 22 wide on a 27px drawing (the brim's flare is
     forgiven). The engine's bop wants the doodad's hitbox bottom, last
     frame, at or above the head's top + 3 and moving down: a landing ON
     him bops him, and a doodad that meets the head strip from the side
     at that height is already reaching 11px down into the body, which
     kills - "if you land on their heads without getting shot". (Round 1
     had him lethal all over and not boppable at all, the King's alone;
     the owner asked for it.) Toppling (mode 'down') he publishes
     nothing: a cupman going over is not there to hit or bop again.

     THE KING: first his CROWN, BOP-ONLY (the 5th element) - y 142..159,
     28 wide, the crown he has: a landing on his face is nothing, you bop
     a king on the crown. Absent while the shield is up (rule 12) and
     once he is down; from above a bop, from the side nothing. It stays
     bop-only at any height: his face spans the gap band (142..210 against
     gaps 58..208), and a lethal box there would block gaps. Then his
     base, LETHAL, from y 210, 48 wide on a 76px foot (the brim's flare
     forgiven, as a cupman's is): 2px below the lowest gap bottom any
     plank can have (208), so he never blocks a gap. Those are the
     numbers, not his drawn silhouette - everything drawn of him between
     the crown and y 210 is scenery.

     A FLOATING GUN PUBLISHES NOTHING. It is a shooter, not a wall, and a
     lethal float in the gap band under scrolling planks would be unfair. */
  function foeRects(ob, out) {
    if (ob.gone) return out;
    if (ob.kind === 'gun') return out;
    var c = cx(ob);
    if (ob.kind === 'king') {
      if (ob.mode === 'down') return out;
      if (!ob.shielded) out.push([c - 14, FLOOR - KING_H, 28, CROWN_H, 1]);
      out.push([c - 24, 210, 48, FLOOR - 210]);
      return out;
    }
    if (ob.mode === 'down') return out;
    out.push([c - 10, FLOOR - CUP_H, 20, HEAD_H, 1]);
    out.push([c - 11, FLOOR - CUP_H + HEAD_H, 22, CUP_H - HEAD_H]);
    return out;
  }

  function shotRects(ob, out) {
    if (ob.broken > 0 || ob.gone) return out;
    var b = SHOT[ob.kind].box, h = b / 2;
    out.push([ob.x - h, ob.y - h, b, b]);
    return out;
  }

  /* ===================================================== the pixel layer

     The pellets. No shadows on any of them: a thing moving sideways
     throws its shadow nowhere the player can read, and the gifts glow
     instead. Every clock in here is the pellet's own `age`. */

  function blit(ctx, tile, x, y) { LivingRoom.blitBelowCeil(ctx, tile.canvas, x, y); }

  function drawGlow(ctx, glow, x, y, a) {
    var a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * a;
    LivingRoom.blitBelowCeil(ctx, glow.canvas, x - 12, y - 12);
    ctx.globalAlpha = a0;
  }

  /* a baked glow stretched to radius r, cropped at CEIL like
     LivingRoom.glow, at the caller's alpha times a: the smooth layer's
     halos, without a createRadialGradient a frame */
  function drawGlowR(ctx, glow, x, y, r, a) {
    var top = Math.max(CEIL, y - r);
    if (top >= y + r) return;
    var sy = (top - (y - r)) / (2 * r) * 24;
    var a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * a;
    ctx.drawImage(glow.canvas, 0, sy, 24, 24 - sy, x - r, top, 2 * r, y + r - top);
    ctx.globalAlpha = a0;
  }

  function drawShot(ctx, ob) {
    if (ob.gone || !T.pellet) return;
    var x = Math.round(ob.x), y = Math.round(ob.y), age = ob.age || 0;
    var pulse = 0.55 + 0.25 * Math.sin(age * 9);
    var k = ob.kind, h;
    if (k === 'yellow') {
      blit(ctx, T.pellet.yellow, x - 3, y - 3);
    } else if (k === 'red') {
      drawGlow(ctx, T.glow.red, x, y, pulse);
      blit(ctx, T.pellet.red, x - 4, y - 4);
      /* two sparks off it, the heat's own colours, hopping every 1/14s */
      h = hash((Math.floor(age * 14) * 7 + ob.seed) | 0);
      ctx.fillStyle = '#ffcf8a';
      ctx.fillRect(x - 4 + (h % 9), y - 5 - ((h >>> 4) % 3), 1, 1);
      ctx.fillStyle = '#f4703a';
      ctx.fillRect(x - 4 + ((h >>> 8) % 9), y + 4 + ((h >>> 12) % 2), 1, 1);
    } else if (k === 'green') {
      drawGlow(ctx, T.glow.green, x, y, pulse * 0.9);
      blit(ctx, T.pellet.green, x - 3, y - 3);
    } else if (k === 'silver') {
      /* THE SPEED STREAK: eight pixels back along its own velocity,
         fading, 2px near and 1px far. Grey, no sparkle - sparkle is
         treasure grammar and this is the lethal quick one. */
      var v = Math.sqrt(ob.vx * ob.vx + ob.vy * ob.vy) || 1;
      var ux = ob.vx / v, uy = ob.vy / v;
      ctx.fillStyle = P.streak;
      /* multiplied by the alpha it was handed and put back after, as every
         other draw helper in this file does */
      var a0 = ctx.globalAlpha;
      for (var s = 1; s <= 8; s++) {
        ctx.globalAlpha = a0 * 0.7 * (1 - s / 9);
        var sz = s < 4 ? 2 : 1;
        var sy = Math.round(y - uy * (3 + s));
        if (sy >= CEIL) ctx.fillRect(Math.round(x - ux * (3 + s)) - (sz >> 1), sy - (sz >> 1), sz, sz);
      }
      ctx.globalAlpha = a0;
      blit(ctx, T.pelletSilver[Math.floor(age * 20) % 2], x - 3, y - 3);
    } else if (k === 'gold') {
      drawGlow(ctx, T.glow.gold, x, y, pulse);
      /* two grains trailing above it, the Couch's marshmallow trick */
      var g = Math.floor(wrap(age * 30, 6));
      ctx.fillStyle = P.pelletGold;
      ctx.fillRect(x - 2 - (ob.vx > 0 ? 2 : -2), y - 6 - (g >> 1), 1, 1);
      ctx.fillStyle = P.pelletGoldHi;
      ctx.fillRect(x + 2 - (ob.vx > 0 ? 2 : -2), y - 8 - ((g + 3) % 6 >> 1), 1, 1);
      var f = Math.floor(wrap(ob.spin, TAU) / TAU * 4) % 4;
      blit(ctx, T.coin[f], x - 5, y - 5);
    }
  }

  /* the pop: a ring in the pellet's own colours, fading with what is
     left of `broken`; a gold one leaves a little glow behind - a missed
     +5, mourned */
  function drawShotSplat(ctx, ob) {
    if (ob.gone || !T.pop) return;
    var span = ob.splat || 0.4;
    var k = clamp(ob.broken / span, 0, 1);
    var f = Math.min(4, Math.floor((1 - k) * 5));
    var x = Math.round(ob.x), y = Math.round(ob.y);
    if (ob.kind === 'gold') drawGlow(ctx, T.glow.gold, x, y, 0.6 * k);
    var a0 = ctx.globalAlpha;
    ctx.globalAlpha = a0 * Math.max(0.15, k);
    blit(ctx, T.pop[ob.kind] ? T.pop[ob.kind][f] : T.pop.yellow[f], x - 4, y - 4);
    ctx.globalAlpha = a0;
  }

  /* ===================================================== the smooth layer

     drawActors(ctx, obstacles): the char canvas, whose transform carries
     the device ratio and the screen shake - so ONE save/restore round the
     whole call, one more round every sprite, and never setTransform.
     Order: the floating guns (behind him, should one drift over him),
     the cupmen, the King - and then the level's planks over the King. */

  function imgOk(img) { return img && img.complete && img.naturalWidth; }

  function drawShadow(ctx, x, w, h, a) {
    ctx.save();
    ctx.globalAlpha *= a;
    ctx.fillStyle = P.shade;
    ctx.beginPath();
    ctx.ellipse(x, FLOOR - 1, w / 2, h / 2, 0, 0, TAU);
    ctx.fill();
    ctx.restore();
  }

  /* the fallback when a painting has not arrived: a flat trapezoid in
     the cup's colour with two eye dots - never a throw */
  function drawFallbackCup(ctx, c, baseY, kind, hgt, face) {
    var col = cupCols(kind), wb = hgt * 0.91, wt = wb * 0.7;
    ctx.save();
    ctx.fillStyle = col.body;
    ctx.beginPath();
    ctx.moveTo(c - wt / 2, baseY - hgt); ctx.lineTo(c + wt / 2, baseY - hgt);
    ctx.lineTo(c + wb / 2, baseY); ctx.lineTo(c - wb / 2, baseY);
    ctx.closePath(); ctx.fill();
    ctx.fillStyle = P.eyeWhite;
    ctx.fillRect(c + face * hgt * 0.08 - 1, baseY - hgt * 0.68, 2, 2);
    ctx.fillRect(c + face * hgt * 0.26 - 1, baseY - hgt * 0.68, 2, 2);
    ctx.restore();
  }

  /* A cup: its painted origin is its bottom centre, mirrored on `face`
     and never narrowed (a turn is instant - see turn). sq is the squash -
     flattened and widened, a cup that was just stood on.

     NO RIM LIGHT. Round 1 stroked a 1.5px cool line up each cup's left
     side and round the top rim, and up the King's flank, to lift the dark
     cups off the dark foot of the wall; the owner saw "the bent white
     translucent line that follows them" and asked for it gone. The two
     cups that needed it most, the Green and the Sentinel, keep their
     warm backlight glow behind them (drawCupman), which separates them
     from the wall without drawing on the painting. */
  function drawCup(ctx, key, c, baseY, s, face, sq, tilt, kind, hgt) {
    var img = Assets.img(key);
    if (!imgOk(img)) { drawFallbackCup(ctx, c, baseY, kind, hgt, face); return; }
    ctx.save();
    ctx.translate(c, baseY);
    if (tilt) ctx.rotate(tilt);
    ctx.scale((face < 0 ? -1 : 1) * s / sq, s * sq);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight);
    ctx.restore();
  }

  /* a held or floating gun, pivoted where muzzleOf says */
  function drawGun(ctx, key, g, hx, hy, a, gs, alpha) {
    var img = Assets.img(key);
    ctx.save();
    if (alpha < 1) ctx.globalAlpha *= alpha;
    ctx.translate(hx, hy);
    ctx.rotate(a);
    if (Math.cos(a) < 0) ctx.scale(1, -1);
    ctx.scale(gs, gs);
    if (imgOk(img)) ctx.drawImage(img, -g.gx, -g.gy);
    else { ctx.fillStyle = P.gunOrange; ctx.fillRect(0, g.my - g.gy - 12, g.mx - g.gx, 24); }
    ctx.restore();
  }

  /* RULE 6 MADE VISIBLE, and the cupmen's signature: a DOTTED AIM LINE,
     the toy-gun telegraph every child knows. Three dots from the first
     frame, spread along a line that GROWS out of the muzzle - its reach
     eases 10 -> 34px over the tracking part of the telegraph and then
     stays - with a 1px pale line joining the muzzle to the farthest dot.
     The dots sit still ON the line: round 1 slid the far one 8px outward
     three times a telegraph, which on a line that was also turning read
     as jitter. Once the aim has locked they freeze, in the colour of what
     is coming (yellow; a Green's sour green; the Order's quick silver),
     the line takes that colour at 0.35, and nothing changes again until
     the shot. Dark-ringed, so they read on pale cardboard as well as on
     the dark wall; r 2.2 at 0.9 (1.0 locked) - at r 1.3 nobody caught
     one in thirty freezes. */
  function drawDots(ctx, ob, dy) {
    /* during a Sentinel's burst the line it locked stays up, locked, at
       full reach: pellets two and three go down a line still on screen */
    var vol = ob.volley > 0;
    if (!vol && (!(ob.tele > 0) || !ob.teleMax)) return;
    var lk = ob.aimLock || vol;
    var span = Math.max(0.01, ob.teleMax - LOCK);
    var k = lk ? 1 : clamp((ob.teleMax - ob.tele) / span, 0, 1);
    var reach = 10 + 24 * LivingRoom.ease(k);
    var ca = Math.cos(ob.aimA), sa = Math.sin(ob.aimA);
    var shot = ob.kind === 'green' ? P.pelletGreen :
               (ob.kind === 'gold' ? P.pelletSilver : P.pelletYellow);
    var x0 = MZ[2], y0 = MZ[3] + dy;
    ctx.save();
    var ga = ctx.globalAlpha;
    /* the line under the dots, muzzle to farthest dot */
    ctx.globalAlpha = ga * (lk ? 0.35 : 0.22);
    ctx.strokeStyle = lk ? shot : 'rgb(255,241,176)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x0 + ca * reach, y0 + sa * reach);
    ctx.stroke();
    ctx.globalAlpha = ga * (lk ? 1 : 0.9);
    ctx.fillStyle = lk ? shot : P.flash;
    ctx.strokeStyle = 'rgba(26,20,16,0.75)';
    ctx.lineWidth = 1;
    for (var i = 0; i < 3; i++) {
      var d = 10 + (reach - 10) * (i / 2);
      ctx.beginPath();
      ctx.arc(x0 + ca * d, y0 + sa * d, 2.2, 0, TAU);
      ctx.fill(); ctx.stroke();
    }
    ctx.restore();
  }

  function drawFlash(ctx, ob, dy) {
    if (!(ob.flashT > 0)) return;
    var k = ob.flashT / 0.12;
    ctx.save();
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * 0.6 * k;
    ctx.fillStyle = P.flash;
    ctx.beginPath(); ctx.arc(MZ[2], MZ[3] + dy, 5, 0, TAU); ctx.fill();
    ctx.globalAlpha = ga * Math.min(1, k);
    ctx.fillStyle = P.flashCore;
    ctx.beginPath(); ctx.arc(MZ[2], MZ[3] + dy, 3, 0, TAU); ctx.fill();
    ctx.restore();
  }

  /* A BOPPED CUPMAN goes over backwards on the back edge of his brim
     (13px behind his centre) - a quarter turn and a bit, 1.4 rad, eased
     over DOWN_T - flattened to 0.75 by the stomp and springing back as
     he falls, fading through the second half. His gun drops where his
     hand was and lies on the rug, fading with him. All draw-only: he
     has had no boxes since the bop (foeRects). */
  function drawToppling(ctx, ob, c) {
    var k = LivingRoom.ease(clamp(1 - ob.downT / DOWN_T, 0, 1));
    var th = 1.4 * k, f = ob.face < 0 ? -1 : 1;
    var a = k < 0.5 ? 1 : Math.max(0, 1 - (k - 0.5) * 2);
    if (a <= 0.01) return;
    var pvx = c - f * 13;
    var bx = pvx + f * 13 * Math.cos(th), by = FLOOR - 13 * Math.sin(th);
    ctx.save();
    ctx.globalAlpha *= a;
    drawShadow(ctx, c, 28, 5, 0.28 * (1 - k));
    var g = GUN[ob.kind];
    drawGun(ctx, g.img, g, c + f * g.hx, FLOOR - 1, f > 0 ? 0 : PI, CUP_S, 1);
    drawCup(ctx, 'cup_' + ob.kind, bx, by, CUP_S, f, 0.75 + 0.25 * k, -f * th, ob.kind, CUP_H);
    ctx.restore();
  }

  function drawCupman(ctx, ob) {
    var c = cx(ob);
    if (c < -40 || c > VW + 40) return;
    if (ob.mode === 'down') { drawToppling(ctx, ob, c); return; }
    var age = ob.age || 0;
    /* THE WADDLE, draw only: a 1.5px hop and a 0.08 rad rock while he
       marches, eased out with `walk` when he stops; the Sentinel has none */
    var bob = -Math.abs(Math.sin(age * 8)) * 1.5 * ob.walk;
    var tilt = Math.sin(age * 8) * 0.08 * ob.walk;
    if (ob.kind === 'green' || ob.kind === 'silver') {
      /* the warm backlight: the two dark cups against the dark foot of
         the wall need something behind them, not more on them */
      if (T.glow) drawGlowR(ctx, T.glow.warm, c, FLOOR - 16, 18, 1);
    }
    /* THE SENTINEL'S STEP: the 0.08s slide reads at 1x but the robot did
       not; a 0.94 squash for the 0.05s after each foot plants does */
    var sq = (ob.kind === 'silver' && ob.marching && ob.stepT >= SLIDE_T &&
              ob.stepT < SLIDE_T + PLANT_T) ? 0.94 : 1;
    drawShadow(ctx, c, 28, 5, 0.28);
    muzzleOf(ob, MZ);
    var g = GUN[ob.kind];
    /* THE GUN IS HELD LOW AND FORWARD (GUN), in front of him - and
       BEHIND him once it is aimed steeper than `beh`, where it would
       otherwise cross his face: the cup hides that part of it, the barrel
       shows past his rim. The flip is on a fixed angle, so it happens
       once as the aim climbs through it, never back and forth. */
    var behind = -Math.sin(ob.aimA) > Math.sin(g.beh);
    if (behind) drawGun(ctx, g.img, g, MZ[0], MZ[1] + bob, ob.aimA, MZ[4], 1);
    drawCup(ctx, 'cup_' + ob.kind, c, FLOOR + bob, CUP_S, ob.face, sq, tilt, ob.kind, CUP_H);
    if (!behind) drawGun(ctx, g.img, g, MZ[0], MZ[1] + bob, ob.aimA, MZ[4], 1);
    drawDots(ctx, ob, bob);
    drawFlash(ctx, ob, bob);
  }

  function drawFloatGun(ctx, ob) {
    var c = cx(ob);
    if (c < -40 || c > VW + 40) return;
    var k = 1;
    if (ob.mode === 'rise') k = 1 - ob.riseT / 0.4;
    else if (ob.mode === 'leave') k = Math.max(0, ob.leaveT / 0.3);
    var a = ob.fade * (ob.mode === 'leave' ? k : 1);
    muzzleOf(ob, MZ);
    ctx.save();
    ctx.globalAlpha *= a;
    /* conjured: a pink ring opening round it as it rises, a pink halo
       while it floats, and three crown-pink sparks orbiting it at r 14
       (age-keyed, on the layer where the doodads already animate) */
    if (ob.mode === 'rise') {
      ctx.save();
      ctx.globalAlpha *= (1 - k);
      ctx.strokeStyle = P.crown;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(MZ[0], MZ[1], 6 + 14 * k, 0, TAU); ctx.stroke();
      ctx.restore();
    }
    if (T.glow) drawGlowR(ctx, T.glow.pink, MZ[0], MZ[1], 22, 1);
    ctx.fillStyle = P.crown;
    for (var i = 0; i < 3; i++) {
      var sa = (ob.age || 0) * 2 + i * 2.09, sr = 14 * k;
      var sy = MZ[1] + Math.sin(sa) * sr;
      if (sy - 1 >= CEIL) ctx.fillRect(MZ[0] + Math.cos(sa) * sr - 1, sy - 1, 2, 2);
    }
    drawGun(ctx, GUN.king.img, GUN.king, MZ[0], MZ[1], ob.aimA, GUN_S_KING * Math.max(0.05, k), 1);
    if (ob.mode === 'float') { drawDots(ctx, ob, 0); drawFlash(ctx, ob, 0); }
    ctx.restore();
  }

  function drawKing(ctx, ob) {
    var c = cx(ob), age = ob.age || 0;
    if (c < -60 || c > VW + 60) return;
    var tilt = ob.tilt, sc = 1, a = ob.fade;
    if (ob.mode === 'down') {
      /* over 0.9s he goes over backwards onto his side, shrinks to 0.6
         and is gone */
      var k = LivingRoom.ease(1 - ob.downT / 0.9);
      tilt = ob.tilt + (1.3 - ob.tilt) * k;
      sc = 1 - 0.4 * k;
      a *= 1 - k;
    }
    /* HURT IS A FLASH, NOT A FADE: see-through used to mean both "you
       hit him" and "a plank is inside him". On the odd twelfths of a
       second while hurtT runs: a pink burst behind him (the baked pink
       glow at 64x64 on (c, FLOOR - 50), alpha 0.5 - the crown's own
       colour, nothing else in the bay is pink), the painting laid over
       itself once more with 'lighter' at 0.65 - one sprite, one second,
       no filter. (Round 1 also stroked his flanks white; that went with
       the rim light, which the owner asked to lose.) At 0.35 the
       body only went (255,188,5) -> (255,253,7), a hue shift you saw if
       you were staring at him; at 0.65 it goes to ~(255,255,90) and the
       crown to white-pink, a hit you see from the corner of the eye. */
    var hot = ob.hurtT > 0 && ob.mode !== 'down' && Math.floor(age * 12) % 2 === 1;
    if (a <= 0.01) return;
    var s = KING_S * sc;
    ctx.save();
    ctx.globalAlpha *= a;
    drawShadow(ctx, c, 80 * sc, 9, 0.3);
    if (hot && T.glow) drawGlowR(ctx, T.glow.pink, c, FLOOR - 50, 32, 0.5);
    drawCup(ctx, 'cup_king', c, FLOOR, s, ob.face, ob.squash, tilt, 'king', KING_H * sc);
    if (hot) {
      ctx.save();
      ctx.globalAlpha *= 0.65;
      ctx.globalCompositeOperation = 'lighter';
      drawCup(ctx, 'cup_king', c, FLOOR, s, ob.face, ob.squash, tilt, 'king', KING_H * sc);
      ctx.restore();
    }
    /* THE RED EYE. Painted on his left eye at (+13, -244) from his foot
       (measured off the PNG), and it smoulders: a soft red glow breathing
       over it, inside his own tilt so it stays in his head */
    ctx.save();
    ctx.translate(c, FLOOR);
    if (tilt) ctx.rotate(tilt);
    var ex = (ob.face < 0 ? -13 : 13) * s / ob.squash, ey = -244 * s * ob.squash;
    if (T.glow) {
      /* the baked red glow (peak 0.55), breathing 0.35..0.55 */
      var a0 = ctx.globalAlpha;
      ctx.globalAlpha = a0 * (0.35 + 0.2 * Math.sin(age * 3.1)) / 0.55;
      ctx.drawImage(T.glow.red.canvas, ex - 10, ey - 10, 20, 20);
      ctx.globalAlpha = a0;
    }
    ctx.restore();
    ctx.restore();
  }

  function drawActors(ctx, obstacles) {
    var i, o;
    ctx.save();
    for (i = 0; i < obstacles.length; i++) {
      o = obstacles[i];
      if (o.foe && !o.gone && o.kind === 'gun') drawFloatGun(ctx, o);
    }
    for (i = 0; i < obstacles.length; i++) {
      o = obstacles[i];
      if (o.foe && !o.gone && o.kind !== 'gun' && o.kind !== 'king') drawCupman(ctx, o);
    }
    for (i = 0; i < obstacles.length; i++) {
      o = obstacles[i];
      if (o.foe && !o.gone && o.kind === 'king') drawKing(ctx, o);
    }
    ctx.restore();
  }

  /* ========================================================= exports */
  return {
    P: P, tune: tune, tiles: T,
    build: build,
    makeFoe: makeFoe, stepFoe: stepFoe, bopFoe: bopFoe, drawActors: drawActors,
    stepShot: stepShot, foeRects: foeRects, shotRects: shotRects,
    drawShot: drawShot, drawShotSplat: drawShotSplat,
    muzzleOf: muzzleOf,
    drawPixelCup: drawPixelCup, drawPixelGun: drawPixelGun
  };
})();
