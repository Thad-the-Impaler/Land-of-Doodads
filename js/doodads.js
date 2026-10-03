/* ------------------------------------------------------------------
   Land of Doodads - the doodads (playable characters)
   The sprite metadata below is measured from the source art: pivot is
   the centre of the body in the neutral (fall) frame, bodyR is that
   body's radius, and footOffset is how far below the pivot the feet
   sit (in body radii) - so every doodad can be drawn, stood on the
   ground and collided at a consistent size whatever its art. Run
   tools/trim_sprites.py to regenerate it; do not hand-edit.

   unlockAt is the score the player has to have reached before a doodad
   can be flown. No unlockAt means it was always there. There are SIX kinds
   of price, and meets() is the one place all six are written down:
     unlockAt     a score reached with anyone, on any level
     unlockBoons  succulents collected, any level, ever
     unlockLimes  limes caught, which only the Canopy grows
     unlockGold   { name, need, where } - that many of a level's +5 pickup,
                  counted on the PICKUP'S NAME rather than on the level, so
                  a second bay that one day shed quarters would count
                  toward the same three. `where` is only for the price line.
     unlockMeet   the id of the level he is HIDING in. Not bought: found.
     unlockDeed   the id of a deed the engine reports by name - something
                  the player DID, rather than something collected.
   The last two share one save key ('met', a list of doodad ids), because
   they are the same shape of answer: one event that either happened or did
   not, with nothing to total up and nothing to half-finish. A found doodad
   and a deed doodad are one list for that reason and no other.
   title says how the doodad behaves in the coop on the title screen.

   Every doodad has an ability, and every one of them is PASSIVE: it needs
   no button of its own. The one that did (a dash on a double-tap) was cut,
   because asking for a gesture mid-flight fights the hand already flapping.
   Each ability is a plain field PlayScene reads - `nerve`, `watch`, `pull`,
   `trot`, `light`, `lives`, `flick`, `size`, `bounce`, `carry`, `flat`,
   `calm` - so a new one is a new field rather than a new branch on an id,
   and each sits on its own axis: points, sight, pickups, survival,
   handling, room, spring, duration, shape, tempo.

   The four newest axes, because their words are less obvious than the rest:
   `bounce` is the SPRING - a flap taken from a fast fall gets part of the
   fall back as lift, which is a rule about the flap and not a weight.
   `carry` is DURATION - how long a power-up lasts, which nothing had ever
   scaled. `calm` is TEMPO - how much of the heat's hurry a doodad declines,
   where the points it pays out are untouched. `flat` is the SHAPE - the one
   doodad whose hitbox is not a circle: his width and his height trade
   against each other as he picks up speed and multiply back to the same
   area, so the integrator and the three flight numbers never learn about
   him at all - only collide(), the floor and lid tests and the draw do.
   `carry` and `calm` are each one multiplier read where a constant used to
   be read, which is the shape grav(), maxFall() and flapV() already set;
   `bounce` is a rule the flap carries, so the integrator still never learns
   a name. Three axes were held and given back in between - the LANE (a
   faster sideways nudge), the ODDS (more hot and sour drops) and HOT AIR
   (Billy's three numbers on a timer the heat wound up). The first two went
   because neither could be SEEN in a run, and an ability the player cannot
   see is not one; the third went because what it COULD be seen doing was
   already somebody else's, which is the other half of the same test.

   `voice` is the sound a doodad makes when the character select lands on
   it: the ROLE js/audio.js plays, not a path, so a doodad that borrows
   another's call just names the same role. A doodad that says nothing has
   no field, and the select screen's own click is all you hear - which is
   what every one of them did until there were recordings for three.

   `size` is the one field the OTHER scenes read too: it is how big the
   doodad is against a standard one, and a doodad that is small is small
   wherever it stands - the rail, the coop, the score table - because it is
   what he is, not something that happens to him in the run. A doodad that
   says nothing is size 1.
------------------------------------------------------------------ */
'use strict';

var Doodads = (function () {

  var LIST = [
    {
      id: 'cookie',
      name: 'COOKIE',
      tagline: 'FIRST TO THE FEEDER',
      about: ['SOFT, ROUND AND FULL OF NERVE.', 'FLIES LIKE A THROWN BISCUIT.'],
      /* she is the one with the nerve, so threading a plank close is
         what she is paid for. `nerve` is the clearance, in pixels, that
         counts as a skim - measured from the hitbox to the nearer edge
         of the gap, so 7 is about a quarter of the room in a tight gap. */
      ability: 'NERVE',
      abilityLive: true,
      abilityAbout: ['THREAD A PLANK CLOSE', 'AND IT SCORES DOUBLE.'],
      nerve: 7,
      accent: '#c9873c', accentDark: '#7a4a1c', accentLight: '#eab873',
      sprite: { w: 381, h: 384, pivotX: 219.6, pivotY: 222.8, bodyR: 161.1, footOffset: 1.00 },
      voice: 'voiceCookie',
      title: { role: 'perch', r: 19 }
    },
    {
      id: 'pepper',
      name: 'PEPPER',
      tagline: 'HOLDS A GRUDGE',
      about: ['OILY GREEN SHINE, SHORT TEMPER.', 'ALWAYS WATCHING THE DOOR.'],
      /* always watching the door, so she is the one who sees what is
         coming: the gap of the plank still off the right of the screen,
         and the column anything falling is going to come down. `watch`
         is a flag - the sight lines are PlayScene's business. */
      ability: 'WATCHFUL',
      abilityLive: true,
      abilityAbout: ['SHE SEES THE NEXT GAP COMING', 'AND WHERE THE SKY WILL FALL.'],
      watch: true,
      accent: '#3f6b52', accentDark: '#1d3325', accentLight: '#7fb28d',
      sprite: { w: 384, h: 349, pivotX: 228.4, pivotY: 193.7, bodyR: 155.3, footOffset: 1.00 },
      /* spanY 16 rather than the default 34, because the title screen's
         menu grew a third board and the column now starts at y 144 instead
         of 182. updateFlyer's figure of eight is explicitly "sized to keep
         off the sign and the menu boards", and at the default she wandered
         to y 158 with an 18px body - 32px of her behind the top board. 16
         puts her lowest centre at 140, so her BODY is always above the
         boards and only the bottom of the sprite can pass behind one. She
         keeps all 78 of her horizontal travel; moving her sideways instead
         cannot work, since clearing the boards' right edge at x 326 needs a
         centre past 344 and 344 + 78 is off the stage. */
      voice: 'voicePepper',
      title: { role: 'patrol', r: 18, homeX: 340, homeY: 124, spanY: 16 }
    },
    {
      id: 'gerald',
      name: 'GERALD',
      tagline: 'TECHNICALLY FLIGHTLESS',
      about: ['HAS NOT ACCEPTED THIS.', 'KICKS OFF THE AIR OUT OF SPITE.'],
      /* the first ability in the game. `pull` is its reach in pixels;
         PlayScene reads the field rather than the name, so the next
         doodad's ability does not have to be an if on an id. */
      ability: 'HUNGER',
      abilityLive: true,
      abilityAbout: ['POWER-UPS DRIFT TO HIM.', 'HE DOES NOT CHASE. HE WAITS.'],
      /* 110px. The succulent sits ON the floor and the gap centres put a
          doodad around 86px above it, so a reach much shorter than this
          could never actually take one and the ability would be for the
          hot drop only. */
      pull: 110,
      accent: '#a3803f', accentDark: '#5d4720', accentLight: '#d8b878',
      sprite: { w: 384, h: 365, pivotX: 178.2, pivotY: 161.7, bodyR: 161.7, footOffset: 1.00 },
      title: { role: 'walk', r: 21, homeX: 118 }
    },
    {
      id: 'maximus',
      name: 'MAXIMUS',
      tagline: 'WINGS SOLD SEPARATELY',
      about: ['A PUG WITH TWO SMALL WINGS', 'AND ENORMOUS CONFIDENCE.'],
      lockedAbout: ['SOMETHING HEAVY IS ASLEEP', 'BEHIND THESE BOARDS.'],
      /* two small wings and a lot of dog: he was never really flying, so
         the ground does not end him. `trot` turns the floor from the
         thing that kills you into a thing you can stand on - planks and
         floor spikes still do, and a plank's lower half reaches the
         floor, so he cannot simply run the whole level. */
      ability: 'TROT',
      abilityLive: true,
      abilityAbout: ['THE GROUND CANNOT END HIM.', 'HE JUST TROTS IT OFF.'],
      trot: true,
      unlockAt: 15,
      accent: '#c2a072', accentDark: '#6a4c25', accentLight: '#e8d2aa',
      sprite: { w: 361, h: 384, pivotX: 180.7, pivotY: 192.0, bodyR: 180.7, footOffset: 1.06 },
      voice: 'voiceMaximus',
      title: { role: 'walk', r: 22, homeX: 392 }
    },
    {
      id: 'billy',
      name: 'BILLY',
      tagline: 'DRAWN ANGRY, STAYED ANGRY',
      about: ['BIRO ON RULED PAPER.', 'ESCAPED THE MARGIN. FURIOUS.'],
      lockedAbout: ['SOMETHING IN HERE HAS CLAWS', 'AND A GRUDGE ABOUT IT.'],
      /* he is a drawing, and drawings weigh nothing. `light` scales the
         three numbers his flight is made of. The flap is softened along
         with the gravity so a beat still lifts him about as far (45px
         against the standard 48) - what changes is the time it takes,
         which is the whole point: longer hang, gentler arcs, more room
         to change your mind. */
      ability: 'PAPER-LIGHT',
      abilityLive: true,
      abilityAbout: ['BIRO ON PAPER WEIGHS NOTHING.', 'HE FALLS SLOW AND FLIES SOFT.'],
      light: { gravity: 0.72, flap: 0.82, fall: 0.78 },
      unlockAt: 25,
      /* the biro, not the paper: every other doodad is warm brown or green
         against a dim brown coop, and giving him the near-white paper as an
         accent would put a white light shaft behind a white sprite */
      accent: '#4f8fd0', accentDark: '#2c5680', accentLight: '#9fc8ee',
      sprite: { w: 384, h: 360, pivotX: 192.0, pivotY: 178.2, bodyR: 178.2, footOffset: 1.00 },
      voice: 'voiceBilly',
      title: { role: 'patrol', r: 19, homeX: 96, homeY: 104, spanX: 54, spanY: 24 }
    },
    {
      id: 'inari',
      name: 'INARI',
      tagline: 'LET HERSELF IN',
      about: ['A GREY CAT, MILDLY DISGUSTED.', 'LANDED HERE ON PURPOSE.'],
      lockedAbout: ['TWO GREEN EYES IN THE DARK,', 'IN NO HURRY WHATSOEVER.'],
      /* the cat brings her own spare life, which is the whole ability:
         `lives` is what a run starts with, and the succulent system
         already knows how to spend one, draw it and shout about it.
         Named for the one spare she actually has and not for the nine a
         cat is supposed to: the joke was not worth the player expecting
         eight more saves than the code gives them. */
      ability: 'SPARE LIFE',
      abilityLive: true,
      abilityAbout: ['SHE BRINGS HER OWN SPARE.', 'THE FIRST MISTAKE IS FREE.'],
      lives: 1,
      /* not a score: nine succulents, which only the Garden grows */
      unlockBoons: 9,
      /* grey, because she is grey. Nothing else in the coop is cool and
         desaturated, and Billy already owns the saturated blue. */
      accent: '#8d95a6', accentDark: '#4a5263', accentLight: '#cdd6e6',
      sprite: { w: 384, h: 358, pivotX: 195.4, pivotY: 179.0, bodyR: 179.0, footOffset: 1.00 },
      title: { role: 'perch', r: 20 }
    },
    {
      id: 'saddam',
      name: 'SADDAM',
      tagline: 'WAS ALWAYS THERE',
      about: ['A CRAWFISH THE SIZE OF A PLUM.', 'ALL TAIL, CLAWS AND PATIENCE.'],
      lockedAbout: ["HE'S HIDING.", 'CAN YOU FIND HIM?'],
      /* The mirror of Gerald's hunger, and the only other doodad who does
         anything about what falls: the hunger drags power-ups IN, the tail
         knocks hazards OUT. A crawfish tail is the fastest thing on him, so
         it is the part that gets there. It is deliberately blind to
         power-ups - a crawfish that batted the hot pepper away would be a
         curse wearing a gift's clothes.

         `reach` is how far it gets, and `cool` is how long it takes to come
         back. One flick takes ONE thing, and 2.5s is set against the rate
         the levels actually shed at: they start around 2.2-2.5s apart and
         floor out at 1.0-1.1, so early on he still gets nearly all of them
         and late on he gets roughly one in three and has to fly the rest
         himself. The ability thins out exactly as the pressure comes on,
         which is the right way round - 1.8s left him taking half of them at
         the floor, which was most of the danger of the last level gone. */
      ability: 'TAIL FLICK',
      abilityLive: true,
      abilityAbout: ['THE TAIL GETS THERE FIRST.', 'THEN IT NEEDS A MOMENT.'],
      flick: { reach: 28, cool: 2.5 },
      /* Not a price at all: he is FOUND. The level says WHICH plank he is
         hiding behind (tune.meetAt) and the roster says WHO is behind it;
         touching him is what opens the stall.

         It names the level now, where it used to be a bare `true`, because
         there is a second found doodad: KOA is in the popcorn on the Couch,
         and meetable() is handed the level that is asking so that it can
         tell whose world is whose. Without it the Garden's tenth stake
         would offer whichever of the two was still shut and first in the
         roster, which is to say the Garden would hand over the koala. */
      unlockMeet: 'garden',
      /* boiled-crawfish red - the one warm red in a roster of browns,
         greens, a grey and a blue, and it reads against the Garden's green
         as well as the coop's timber */
      accent: '#a4432a', accentDark: '#5e2415', accentLight: '#d4775a',
      sprite: { w: 384, h: 329, pivotX: 179.9, pivotY: 143.9, bodyR: 143.9, footOffset: 1.00 },
      /* Measured in SPRITE width, not body radius: his art is 2.67 body
         radii across, so at r 19 he is 51px wide (23.8 left of the pivot,
         26.9 right). The default wander of 26 then put him at -3.8 and
         walked him off the stage, and into Gerald's 68.9..170.7 besides.
         A shorter span and a home of 34 gives him 4.2..66.9 - on screen,
         and clear of where Gerald's art begins at 68.9. (250, the first
         guess, was behind the PLAY board, which is painted over him.) */
      voice: 'voiceSaddam',
      title: { role: 'walk', r: 19, homeX: 34, spanX: 6 }
    },
    {
      id: 'turd',
      name: 'TURD THE BIRD',
      tagline: 'EASY TO MISS',
      about: ['A SMALL BROWN BIRD.', 'THE NAME WAS NOT HIS IDEA.'],
      lockedAbout: ['SOMETHING SMALL IS IN HERE.', 'YOU MAY HAVE TO SQUINT.'],
      /* He is drawn smaller than everyone else, and that is the whole of
         his ability: there is less of him to hit. `size` scales both the
         hitbox and the body, together, so what the player sees is always
         what the planks test - and it is the base the lime multiplies, so
         a lime makes him smaller still (0.7 x 0.62 = 0.43: a 9px hitbox
         and an 11px body, still comfortably above anything that could
         tunnel through a cap or a twig).

         0.7 is the art, not a tuning choice: his source drawing is 0.693
         of Cookie's, and the trim tool normalises that away, so this puts
         it back. It is also the number that earns his keep as his ONLY
         ability. The room to time a flap in at the tightest gap is
         gap - hitbox - 48px of lift: 78 - 22 - 48 = 8px for everyone else,
         78 - 15 - 48 = 15px for him, which is about what Billy's slow fall
         and soft flap come to between them. 0.85 - the "slightly" reading -
         would be 11px, a third of what a lime does, permanently, and the
         hardest unlock in the game paying out something you could not
         feel. And the bargain the lime already strikes applies to him all
         day: a smaller circle catches less, so a succulent, a can or a lime
         is about a fifth harder to take, and he has to hug a plank closer
         to meet anyone hiding behind one. */
      ability: 'PINT-SIZED',
      abilityLive: true,
      abilityAbout: ['LESS OF HIM TO HIT.', 'A LIME LEAVES EVEN LESS.'],
      size: 0.7,
      /* Three limes, and limes only grow in the Canopy: one eligible drop
         in eleven there is a lime. The price says where, because a player
         who cannot see where limes come from cannot chase them - and three
         is about one good run's worth once you are up there, which is the
         point of a price you can see the end of. */
      unlockLimes: 3,
      /* Cocoa: his art is one flat #805830 brown, and taken straight it is
         a third sandy brown on a rail that already has Gerald's and
         Maximus's. Pushed darker and redder it stays honest to the bird and
         reads as its own thing, warm against the canopy's green and dark
         enough not to be another tan. */
      accent: '#7b4f2c', accentDark: '#3f2612', accentLight: '#c48c5a',
      sprite: { w: 384, h: 330, pivotX: 219.0, pivotY: 165.0, bodyR: 165.0, footOffset: 1.00 },
      /* 13 is Cookie's 19 at 0.7: the perches are where he stands next to
         her, so this is where the difference has to hold up */
      title: { role: 'perch', r: 13 }
    },
    {
      id: 'koa',
      name: 'KOA',
      tagline: 'CAME OUT OF THE POPCORN',
      about: ['A KOALA. NOT A BEAR.', 'ASLEEP FOR MOST OF THIS.'],
      /* The RULE of his unlock lives here, on his own card, and not in
         requirement(): the price line stays one generic 'FIND HIM' for both
         of the found doodads, and each of them says in his own words what
         finding him actually asks. His asks for a clean dive, and the
         player is told so before they go, which is what makes the rule
         fair - nothing about it is hidden. */
      lockedAbout: ['SOMEBODY IS BOUNCING IN THE POPCORN.', 'GET HIM OUT WITHOUT TAKING A HIT.'],
      /* The SPRING, which is the literal reading of the word and the one
         the first pass talked itself out of. `bounce` is a rule about the
         flap and about nothing else: a flap taken while he is falling
         faster than `over` px/s gets `back` of the excess added to its
         lift. Everyone's flap SETS vy to -338 whatever he was doing a frame
         ago; his sets it to -338 minus 0.8 of whatever he was falling at
         over 420. A hover flap - the rhythm that holds a height, where he
         comes back down through his own line at 338 - is exactly everyone's
         flap, 48px of lift. Let him drop 50px under that line before the
         beat and he arrives at 480: 60 of excess, 48 of it back, a lift of
         63. A full-speed fall (545, which he reaches about 80px under the
         line) springs him 81 - a little short of double. That is how a
         rubber ball behaves, what it gets back being a share of what it
         came down with, and 0.8 is about what a good one keeps. It needs no
         gesture, because it is the same flap the thumb was already taking;
         and the player can see it, because he stretches on the rebound and
         the arc after it is plainly not the arc everyone else gets.

         It is NOT a death removed, and the reason is WHEN a flap acts. A
         flap turns him upward on the frame it lands, for him as for anyone;
         the spring only changes how high the arc after it goes. So the last
         moment he can save himself off the floor or a plank's cap is the
         same moment as everyone's, and what the extra buys him is
         altitude - which he had to dive to earn, and which, in a tight gap,
         kills him: 81px of spring in a gap with 56px of clearance is the
         upper plank. He dives where the air above him is open and flaps
         early where it is not, and that is a thing a player works out in
         one run. (The faster rise does clear a plank's face a hair sooner -
         about a pixel at room speed - which is the whole of its survival
         value, and it is only there after a dive that has put him under the
         top plank anyway.)

         What was rejected, across both passes. x1.5 on the sideways nudge
         went first: true to the word and invisible in play, and the owner
         said so. A bounce off the floor is Maximus's trot with a spring on
         it, and a bounce off the Living Room's lid deletes that room's whole
         novelty - each is a death removed, however it is dressed, and a
         death removed is Inari's spare life in another coat. A hard rebound
         off the Backyard's rafters is real and literal and has nowhere to
         happen in the Living Room, whose four bays end the run at the lid
         instead, so nearly half the game would never see it - and in the
         Backyard everybody already gets a small one (vy x -0.18 off the
         wall). A flap that ADDED to a rise, so that quick taps climbed
         faster, is the cut dash in a new coat: sudden, and pointed at the
         next plank. */
      ability: 'BOUNCE BACK',
      abilityLive: true,
      abilityAbout: ['THE HARDER HE FALLS,', 'THE HIGHER HE SPRINGS BACK UP.'],
      bounce: { over: 420, back: 0.8 },
      /* FOUND, like Saddam, and the value is the level he is found in -
         see meetable(). The Couch is the one bay with a floor worth hiding
         on: he is down in the popcorn, which is the only place the carpet
         can make a dive cost something. */
      unlockMeet: 'couch',
      /* Eucalyptus, NOT his grey. His art is 71% #afaca9, and a cool pale
         grey is already Inari's (#8d95a6) - a second grey light shaft on
         the rail would simply read as hers, and the accent's whole job is
         telling the stalls apart at a glance. A koala's one other colour is
         the leaf he is holding, and a silvery blue-green is clear of
         Pepper's bottle green (#3f6b52, which is darker and yellower) and
         of Billy's blue. */
      accent: '#5c9d94', accentDark: '#2f5a54', accentLight: '#9fd4cb',
      sprite: { w: 377, h: 384, pivotX: 191.6, pivotY: 192.0, bodyR: 179.9, footOffset: 1.07 },
      title: { role: 'perch', r: 19 }
    },
    {
      id: 'roller',
      name: 'ROLLER',
      tagline: 'NEVER CHECKED, NEVER CLAIMED',
      about: ['A CARRY-ON WITH ONE GOOD WHEEL.', 'KNOWS EVERY CAROUSEL BY NAME.'],
      lockedAbout: ['SOMETHING ON WHEELS IS PARKED HERE.', 'IT TAKES QUARTERS.'],
      /* The DURATION axis: nobody had ever scaled how LONG a power-up
         lasts. `carry` multiplies both timers - the heat's 6.5s becomes 8.8
         and the lime's 7.0 becomes 9.45 - and because PlayScene reads those
         times through accessors rather than the constants, the x1.6 top-up
         caps scale with them for free. That matters more than it sounds:
         without it his gauge would start past the end of its own bar and a
         second pickup would clip his first seconds off.

         1.35 and not 1.5, because the two power-ups are not worth the same
         to him. The heat is double-edged - longer heat is longer at 1.55x
         room speed, so stretching it is as much a dare as a gift - while
         the lime is pure gain and costs nothing at all. So the number is
         set against the LIME: 35% of seven seconds is about what Billy's
         slow fall is worth in a tight gap, for a few more planks. And
         nothing here survives a mistake, which is what keeps it clear of
         Inari's axis. */
      ability: 'CARRY-ON',
      abilityLive: true,
      abilityAbout: ['WHAT HE PICKS UP, HE PACKS.', 'THE HEAT AND THE LIME LAST LONGER.'],
      carry: 1.35,
      /* Three quarters, and the Desk is where quarters are shed. The count
         is keyed on the PICKUP'S name and not on the level, so a second bay
         that one day sheds quarters counts toward the same three - which is
         what "collect three quarters" says, and what a player would expect
         of it. `where` is for the price line only; it buys nothing else. */
      unlockGold: { name: 'QUARTER', need: 3, where: 'desk' },
      /* The HANDLE, and the quarter. His art is 83% one near-black,
         #2c2c2c, and 96% near-black all told, so a near-black accent is a
         hole in the coop's dim brown and an invisible light shaft behind
         him. The first pass tied a pink ribbon to him instead - the bag
         nobody can find on the carousel - and the owner did not get it,
         which is the one test an accent has to pass: it reads at a glance
         or it is not working. So this one is motivated by what is actually
         on him. The only thing on the sprite that is not black is the
         telescoping handle, #dad9d3, and the one thing he is bought with is
         three quarters; both are silver.

         Billy's note turns the other way here. His near-white was refused
         because a white shaft behind a white sprite is no shaft at all;
         behind a BLACK sprite it is the sharpest silhouette on the rail. It
         is kept clear of the two pale things it could be mistaken for by
         temperature: UI.C.ink (#f2e6c8) is cream and Inari's #cdd6e6 is
         cold and blue, and this is neither - a neutral steel, a shade
         lighter than the handle so it reads as light and not as more
         suitcase. */
      accent: '#a7a6a0', accentDark: '#55544f', accentLight: '#e4e3dd',
      sprite: { w: 315, h: 384, pivotX: 158.9, pivotY: 197.8, bodyR: 155.8, footOffset: 1.13 },
      /* Measured the way Saddam's was, in SPRITE width rather than body
         radius: at r 17 his art reaches 17.3 left and 17.0 right of the
         pivot, so a home of 460 with a span of 2 keeps him inside
         440.7..479 - on the stage, and clear of Maximus, whose r 22 art
         reaches x 440 at the far end of his own wander. The floor to the
         left of the menu column is full (Saddam 4..67, Gerald 69..171) and
         the column paints its boards over anybody standing in it, so the
         right edge is the only floor left to give him. */
      title: { role: 'walk', r: 17, homeX: 460, spanX: 2 }
    },
    {
      id: 'donkey',
      /* Ten characters, which at the card's heading scale of 3 measures
         177px against drawOpenCard's NAME_SPAN of 168 - so his name DOES
         step down to scale 2, the same step TURD THE BIRD's 231px already
         takes, and the heading band is sized for it. Nine characters or
         fewer (159px) would have held scale 3; the name is worth more than
         the size. */
      name: 'DONKEY JOE',
      tagline: 'LOUD IN BOTH DIRECTIONS',
      about: ['AN INFLATABLE DONKEY WITH A LOT OF TEETH.', 'HAS NEVER ONCE BEEN WRONG.'],
      lockedAbout: ['SOMETHING IN HERE IS GRINNING.', 'IT WANTS IT HOT AND IT WANTS IT SOUR.'],
      /* The SHAPE, which is a lever nobody had ever pulled: eleven doodads
         are circles and he is the one ellipse. `flat` is how WIDE he is at
         full fall speed - one and a half times - and his height takes the
         reciprocal of the same number, so width times height is 1 and the
         AREA of him never changes. In between it is linear in |vy| over the
         fall cap. Hanging at the top of an arc he is exactly everyone's
         11px circle; at the hover rhythm's 338px/s he is 14.4 across and
         8.4 tall; in a full dive at 545 he is 16.5 by 7.33. It is a pure
         function of how fast he is going, with no timer and no damping
         anywhere in it, which is the point: the shape IS the speed, so the
         hitbox cannot lag the body the player is watching, and the drawn
         outline is the same axis-aligned ellipse the planks test on every
         single frame.

         This is the owner's key taken literally instead of metaphorically,
         which is what the two earlier passes failed to do. An inflatable is
         a fixed volume of air in a soft skin, and a soft thing full of air
         flattens ACROSS its motion as it moves - a water balloon dropped
         off a roof, a raindrop, a beach ball slapped down on water - where
         a rubber ball stretches ALONG it. So Koa stretches tall on a
         rebound and Joe spreads flat at speed: the opposite body language,
         and the two of them tell the player they are made of different
         stuff before either ability has done anything at all.

         It is not Turd's axis, and the difference is worth writing down
         because it is the one a reader reaches for first. Turd is 0.7 of a
         doodad, always, for free, and the player's sentence for him is "he
         is small". Joe is never LESS of a doodad - the area is constant, it
         is the same amount of donkey reshaped - he is only ever spread
         sideways, only while he is fast, and he pays for it on the flanks:
         28.8px across at a hover flap and 33 in a dive against everyone's
         22, so a 7-9px drop's hit window grows from about 15px to 18.4 and
         20.5 (a quarter to a third more often found) the whole time he is
         moving, and he enters a plank's span 3-5px sooner. At a hover he is
         nobody special. And it changes how a gap is FLOWN - you dive into
         it, deliberately, which is the opposite of what the arc wants -
         where being small changes nothing about how you fly. The sentence
         is "he squashes flat when he's going fast, like a water balloon".

         It is not Koa's either, though both are paid out of a fast fall.
         Koa's spring is nothing at all under 420px/s and is read in flap();
         Joe's squash is continuous from zero and is read in collide(). Koa's
         dive buys ALTITUDE, after the gap, and in a tight one it is what
         kills him; Joe's dive buys CLEARANCE, inside the gap, and what it
         costs him is width. One of them is a rule about the flap and the
         other is a rule about the body, and they go opposite ways.

         It is not Billy's, and this is where HOT AIR died. grav(), maxFall()
         and flapV() are not touched: the arc is everyone's arc, 48.4px of
         lift and 0.57s of hang, on his first plank and his fiftieth. HOT
         AIR was those same three numbers on a timer the heat wound up, and
         the owner said so twice - a field of somebody else's with a trigger
         bolted on top is not an axis, whatever the trigger is.

         Nor is it a death removed, which is the bar every balloon idea on
         the list below failed. Nothing that visibly touches him stops
         killing him: the hitbox is the drawn body, the floor and the Living
         Room's lid are tested at the same honest vertical radius the planks
         are, and the trade is paid in both directions on every frame.
         Measured on the Coop's lower cap, one falling frame then a flap, 44
         trials: at 338px/s a round doodad survives down to a centre 11.36px
         above the cap and dies at 10.62, where Joe survives at 8.97 and
         dies at 8.26 - about 2.5px later, which at that speed is a quarter
         of a frame of lateness forgiven; at 545 it is 11.53/10.14 against
         7.81/6.97, about 3.7px. In the Backyard's 78px gap the room to time
         a flap in goes from everyone's 8px to about 10.6 at a hover flap
         and 11.7 in a dive. Turd's is 14.6 (a 15.4px hitbox against
         everyone's 22) and Billy's is 11 - his flap only lifts 45.2 of the
         standard 48.4, which his own card already says. So Joe at a hover
         is the SMALLEST forgiveness on the roster, under Billy's, and a
         dive buys him Billy's back - conditionally, and paid for on the
         flanks, where the other two are free and permanent.
         The lime composes through the hitbox the way Turd's size does: a
         shrivelled Joe in a full dive is 4.55px of half-height, which is
         the margin Turd-with-a-lime has stood on at 4.7 since his card was
         written, comfortably above anything that could tunnel a cap.

         1.5 and not another number because it is the first one a player
         notices in a single run. At 1.4 the dive is 7.9px tall and the
         hover flap 8.8 - 3.1 and 2.2px off round - which is under what a
         thumb can feel, and an ability nobody can feel is the LANE's and
         the ODDS' whole problem. 1.6 (6.9 and 8.0 tall, 35px across) is the
         next notch if it is ever wanted louder, and at that point the
         lime's 4.3px wants a floor under the vertical radius.

         Rejected, with reasons, because at twelve doodads every obvious
         lever belongs to somebody and the balloon's own verbs are the worst
         offenders. Inflation as a GAUGE - air that fills and drains and
         drives something - is the brief's own suggestion and has no legal
         consumer: size is Turd's, lift is Billy's, the flap is Koa's, lives
         are Inari's, points are Cookie's, duration is Roller's, tempo is
         Capybara's, so it is a timer on someone else's field whatever it
         drives, which is HOT AIR again under a new name. Deflating over the
         run is Turd getting smaller as the score climbs, which is the
         owner's own warning about slow Maximus turned sideways. Swelling
         with the heat was already refused on the HOT AIR card - a bigger
         hitbox turns the reward into a way of losing. Size by altitude (a
         real balloon does expand as it rises) makes a high gap a lottery by
         gap height. A breath on its own clock, swelling and shrinking on a
         1.6s period, is a coin flip the player cannot shift the phase of -
         a curse half the time. Squash on the FLAP alone, the cartoon bop,
         is this same lever with the impulse as its driver and is worse for
         it: the same flatness on a hover as on a dive, no new skill in it,
         and the honest description is "a flat Turd with a pump". FLAT OUT
         keeps the hover standard and makes the dive the thing. Then the
         deaths removed, every one of which is Inari's spare life in
         another coat: a soft skin that deflects grazes saves the slow ones
         and nothing else, drops that curve away from him are Saddam's REACH
         with a gentler verb, drops that fall slower near him are Pepper's
         and Saddam's between them, the bray's downwash IS Saddam's card
         text, bouncing off things is Koa's, and stun immunity is invisible
         in eight bays of nine. Bray recoil on the lane is 2-5px a flap and
         invisible, or big enough to pin him at the left wall where he
         cannot dodge. The heat's wind blowing him back pays out
         Capybara's more-time-in-the-fast-room by another route and would be
         a third heat-tied idea after two were refused. A hot start, triple
         points while hot and drops that give a little of both are puns on
         his unlock, and the points stayed Cookie's even for Capybara. A
         rested flap that lifts higher after a glide is Koa's spring with a
         different question asked of the same fall, and a handicap when the
         thumb hammers. Variable jump height, flap on release, a held hover:
         gestures, and the thumb has one job - that is the rule the cut dash
         wrote. The x1.5 sideways nudge is refused twice over now. Two
         honest runners-up were weighed and set behind this one: a big soft
         skin that catches pickups outside the solid core is Gerald at a
         seventh of his strength and it bends the rule that what the player
         sees is what the planks test; and the wind blowing him to the back
         of the room is the one genuinely open axis, the LANE, but it hands
         him reaction time in a game whose bottleneck is precision, and the
         LANE has already told us once that it cannot be felt. */
      ability: 'FLAT OUT',
      abilityLive: true,
      abilityAbout: ['THE FASTER HE GOES, THE FLATTER HE GETS.', 'FLAT FITS WHERE ROUND WOULD NOT.'],
      flat: 1.5,
      /* Neither collected nor scored: DONE. The engine reports the deed by
         this name and knows nothing whatever about what it opens, so the
         roster keeps the only copy of that fact - and the save remembers
         the DOODAD, in the same list the found ones use, because holding
         both at once either happened or it did not. */
      unlockDeed: 'hot-and-sour',
      /* His own blue, pushed to indigo. The art is 78% #2d00fe, and taken
         straight it sits on the rail beside Billy's #4f8fd0 as a second
         blue with nothing to tell them apart. Darker, and a step toward
         violet, it is unmistakably the donkey and not the biro, and it
         still reads against the coop's brown. */
      accent: '#5b4de0', accentDark: '#2c2380', accentLight: '#a39cf0',
      sprite: { w: 384, h: 335, pivotX: 208.8, pivotY: 172.4, bodyR: 162.4, footOffset: 1.00 },
      title: { role: 'perch', r: 19 }
    },
    {
      id: 'capybara',
      name: 'CAPYBARA',
      tagline: 'HAS NOWHERE TO BE',
      about: ['SOMETHING WILL SIT ON HIM.', 'HE WILL ALLOW IT.'],
      lockedAbout: ['SOMETHING IN HERE IS VERY CALM.', 'IT WOULD LIKE THREE OF ITS OWN.'],
      /* The TEMPO axis: how much of the heat's hurry he simply declines.
         `calm` is the FRACTION refused rather than a speed, so SPICY_SPEED
         1.55 becomes 1 + 0.55 * (1 - 0.5) = 1.275 for him. The streaks, the
         wash and the glow all still read off `heat` and not off the speed,
         so a hot run still LOOKS exactly as hot as it is; it just does not
         run as hard.

         0.5 and not 1.0: the heat's whole cost is the speed, so refusing
         all of it would turn every hot drop into a free double and the
         power-up into a pure gift. Half is the number at which a hot run is
         still a faster run than a cold one - he pays, he just pays half.
         Not Cookie's axis either, because the points are untouched: he has
         longer in which to earn the same doubles, not more of them. */
      ability: 'UNHURRIED',
      abilityLive: true,
      abilityAbout: ['THE HEAT STILL DOUBLES HIS POINTS.', 'IT ONLY HALF HURRIES THE ROOM.'],
      calm: 0.5,
      /* Three of his own, which the Mantle sheds. The CAPYBARA achievement
         counts the same pickup in its own ledger and the two complete on
         the same catch, which is deliberate rather than an oversight: the
         unlock currency is counted HERE because a wiped or corrupted
         achievements file must never be able to take a doodad away. */
      unlockGold: { name: 'CAPYBARA', need: 3, where: 'mantle' },
      /* Reed olive, NOT his butter yellow. The art is 75% #fefbab, which is
         Billy's near-white problem over again - a white light shaft behind
         a pale sprite - and a true gold would vanish into UI.C.gold on
         every price and every score it got printed beside. He is a
         riverbank animal, so the yellow pushed green is the reeds he is
         sitting in, and a yellow-green is clear of Gerald's tan (#a3803f,
         32 points less green) and of both of the greens. */
      accent: '#98a63a', accentDark: '#535c1b', accentLight: '#cdd57a',
      sprite: { w: 369, h: 384, pivotX: 184.6, pivotY: 188.8, bodyR: 184.6, footOffset: 1.02 },
      title: { role: 'perch', r: 20 }
    }
  ];

  var BY_ID = {};
  LIST.forEach(function (d) { BY_ID[d.id] = d; });

  /* Draw a doodad on the smooth layer.
     x,y   = centre of the body, in virtual pixels
     r     = wanted body radius, in virtual pixels
     angle = tilt in radians
     frame = false | true | a frame name, see draw()                */
  /* `frame` is false for the neutral pose, true for the flap, or the name
     of an extra frame such as 'eat'. Only Gerald has a third frame today,
     so anything asking for one it does not have falls back to neutral
     rather than disappearing. */
  function draw(ctx, id, x, y, r, angle, frame, opts) {
    var d = BY_ID[id];
    if (!d) return;
    var key = frame === true ? '_fly' : (frame ? '_' + frame : '_fall');
    var img = Assets.img(id + key);
    if (!img || !img.complete || !img.naturalWidth) img = Assets.img(id + '_fall');
    if (!img || !img.complete || !img.naturalWidth) { drawFallback(ctx, d, x, y, r); return; }
    var o = opts || {};
    var s = r / d.sprite.bodyR;
    ctx.save();
    ctx.translate(x, y);
    /* a flatten in SCREEN axes, applied before the tilt: for the one doodad
       whose hitbox is an ellipse, the drawn outline has to be the same
       axis-aligned ellipse the planks test whatever way he is pitched.
       squashX/squashY below are in the body's own axes and are flourishes
       (Koa's stretch, the heat's throb); these two are the shape itself.
       A no-op for anybody who does not pass them. */
    if (o.flatX || o.flatY) ctx.scale(o.flatX || 1, o.flatY || 1);
    if (angle) ctx.rotate(angle);
    if (o.alpha !== undefined) ctx.globalAlpha = o.alpha;
    var sx = s * (o.squashX || 1), sy = s * (o.squashY || 1);
    if (o.flip) sx = -sx;
    ctx.scale(sx, sy);
    ctx.drawImage(img, -d.sprite.pivotX, -d.sprite.pivotY, d.sprite.w, d.sprite.h);
    ctx.restore();
  }

  /* if the art ever fails to load the game still runs */
  function drawFallback(ctx, d, x, y, r) {
    ctx.save();
    ctx.fillStyle = d.accent;
    ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
    ctx.restore();
  }

  /* ------------------------------------------------------------ unlocks

     The highest score the player has ever reached, with anyone, on any
     level. It lives in its own save key rather than being read back out
     of the score tables, for two reasons:
       - a fresh table is seeded with the doodads' own house scores
         (PEP 12), so reading Scores.top would hand a brand new save more
         than half of MAXIMUS for free;
       - X on the High Scores screen wipes a table, and losing a doodad
         you had already earned would be indefensible.
     Personal bests are the player's own runs and survive that wipe, so
     they are what an existing save is seeded from the first time this
     runs.                                                             */

  var reached = null;                 /* cached; localStorage is not free */
  var boons = null;
  var limes = null;
  var golds = null;                   /* { QUARTER: 3 } - the +5s, by name */
  var met = null;                     /* ids of the found AND the deed ones */
  var passkey = null;

  /* The master passkey opens every doodad at once. It is its own flag
     rather than a shove to `reached`, so the honest "highest score you
     have ever reached" stays honest - and so switching it back off is
     one line if that is ever wanted. */
  function masterKey() {
    if (passkey === null) passkey = Save.get('passkey', false) === true;
    return passkey;
  }

  function setMasterKey(on) {
    passkey = !!on;
    Save.set('passkey', passkey);
    return passkey;
  }

  function bestReached() {
    if (reached !== null) return reached;
    var stored = Save.get('reached', null);
    if (typeof stored === 'number') { reached = stored; return reached; }
    var best = 0;
    Levels.playable().forEach(function (p) {
      LIST.forEach(function (d) {
        var pb = Scores.personalBest(p.room, p.level, d.id);
        if (pb > best) best = pb;
      });
    });
    Save.set('reached', best);
    reached = best;
    return reached;
  }

  /* Succulents ever collected, across every run. Its own key for the
     same reasons as `reached`: a wiped score table must not take a
     doodad away, and nothing else in the save can stand in for it -
     a total is not recoverable from anything that is kept. */
  function boonsTaken() {
    if (boons !== null) return boons;
    var stored = Save.get('succulents', 0);
    boons = (typeof stored === 'number' && stored > 0) ? Math.floor(stored) : 0;
    return boons;
  }

  /* one succulent taken. returns the doodads it just opened up. */
  function noteBoon() {
    var before = boonsTaken();
    boons = before + 1;
    Save.set('succulents', boons);
    return LIST.filter(function (d) {
      return d.unlockBoons && d.unlockBoons > before && d.unlockBoons <= boons;
    });
  }

  /* Limes ever caught, across every run - the succulent count's twin, kept
     for the same reasons: a wiped score table must not take a doodad away,
     and a total is not recoverable from anything else the save keeps. The
     engine calls the power-up "sour"; the save and the price call it what
     the player sees, a lime. */
  function limesTaken() {
    if (limes !== null) return limes;
    var stored = Save.get('limes', 0);
    limes = (typeof stored === 'number' && stored > 0) ? Math.floor(stored) : 0;
    return limes;
  }

  /* one lime caught. returns the doodads it just opened up. */
  function noteLime() {
    var before = limesTaken();
    limes = before + 1;
    Save.set('limes', limes);
    return LIST.filter(function (d) {
      return d.unlockLimes && d.unlockLimes > before && d.unlockLimes <= limes;
    });
  }

  /* THE +5 PICKUPS EVER CAUGHT, COUNTED BY THE ART'S OWN NAME FOR THEM -
     { QUARTER: 3, CAPYBARA: 1 }.

     Its own save key, for the same reasons as 'succulents' and 'limes': a
     wiped score table must not take a doodad away, and a total is not
     recoverable from anything else the save keeps. It is emphatically NOT
     read out of the achievements ledger, which counts the same catches in
     'achv.n' keyed by LEVEL ('gold.mantle'). Those are two books on purpose
     - Doodads owns the unlock currencies, Achievements owns the badges -
     so that a corrupted or hand-wiped achievements file can cost the player
     a badge but never a doodad. The same deliberate duplication already
     exists for 'succulents' against 'boon' and 'limes' against 'sour'.

     Keyed on the NAME and not on the level because the price says "collect
     three quarters": a second bay that one day shed quarters would count
     toward the same three, which is what the player was actually asked for.

     Nothing in the stored value is trusted - it is a JSON blob out of
     localStorage that a curious player can edit by hand. Only a plain
     object is accepted at all (an array would otherwise pass typeof and
     hand back its length and indices as counts), and each entry has to be a
     finite positive number before it is floored and kept. A broken entry
     costs the count for that one name instead of throwing on the first
     frame that draws a locked card. */
  function goldsTaken() {
    if (golds !== null) return golds;
    var stored = Save.get('gold', null);
    golds = {};
    if (stored && typeof stored === 'object' && !Array.isArray(stored)) {
      for (var k in stored) {
        /* off the PROTOTYPE, because `stored` came out of localStorage and a
           save holding {"hasOwnProperty": 1} makes stored.hasOwnProperty the
           number 1 - which throws on the first frame of boot, since
           Game.pickDoodad asks isUnlocked before anything is drawn. BY_ID and
           `places` are built from the roster in this file and can skip this;
           this one table cannot. */
        if (!Object.prototype.hasOwnProperty.call(stored, k)) continue;
        var n = stored[k];
        if (typeof n === 'number' && isFinite(n) && n > 0) golds[k] = Math.floor(n);
      }
    }
    return golds;
  }

  /* hasOwnProperty rather than `|| 0`, for the reason get() and has() give
     at the bottom of this file: `golds` is a plain object, so a pickup one
     day named CONSTRUCTOR or TOSTRING would otherwise find a function off
     the prototype. The names come from the art, which is free to call a
     thing whatever it likes. */
  function goldTaken(name) {
    var all = goldsTaken();
    return Object.prototype.hasOwnProperty.call(all, name) ? all[name] : 0;
  }

  /* one +5 caught, by name. returns the doodads it just opened up, exactly
     as noteBoon and noteLime do - usually none, and at most the one whose
     third quarter this was. */
  function noteGold(name) {
    var before = goldTaken(name);     /* which also primes the cache */
    golds[name] = before + 1;
    Save.set('gold', golds);
    return LIST.filter(function (d) {
      return d.unlockGold && d.unlockGold.name === name &&
             d.unlockGold.need > before && d.unlockGold.need <= before + 1;
    });
  }

  /* The doodads that have been found rather than earned, and now the ones
     that were EARNED BY A DEED as well. A list of ids rather than a count,
     because either one is a single event that has or has not happened and
     there is nothing to total up - and one list rather than two, because
     that is the only thing the two have in common and it is the whole of
     what the save needs to remember. The filter is what keeps a stale id
     out of it, so a doodad deleted from the roster cannot come back as a
     ghost in metIds(). */
  function metIds() {
    if (met !== null) return met;
    var stored = Save.get('met', []);
    met = Array.isArray(stored) ? stored.filter(function (id) { return BY_ID.hasOwnProperty(id); }) : [];
    return met;
  }

  /* The doodad hiding in THIS level, if any: the first still-shut one whose
     unlockMeet names the place that is asking. Levels ask for this instead
     of naming an id, so who is hiding where stays the roster's business.

     IT TAKES THE LEVEL ID, which it did not have to while Saddam was the
     only found doodad - it returned "the first still-shut found one" and
     there was only ever one to find. KOA is the second, in the popcorn on
     the Couch, and the old signature would have had the Garden's tenth
     stake offer whichever of the two came first in the roster: a koala
     behind a stake in the Garden, found by a dive that cost nothing, with
     the Couch's whole rule skipped. A falsy place returns null rather than
     matching the doodads that have no unlockMeet at all.

     IT ASKS meets(), NOT isUnlocked(), AND THE DIFFERENCE IS THE PASSKEY.
     isUnlocked() short-circuits true on masterKey(), so with IMP11 typed
     this returned null for everybody, PlayScene never set plank.meet on the
     tenth stake in the Garden, and SADDAM was never placed again - on that
     browser profile, permanently, because nothing in the game ever calls
     setMasterKey(false). He stayed on his card saying FIND HIM IN THE
     GARDEN for a doodad the world would never contain.

     The question being asked here is "is this doodad's price still unpaid",
     and the passkey does not pay a price - it opens a door. meets() is that
     question. The passkey still opens his stall to fly, exactly as before;
     what it no longer does is take him out of the world. */
  function meetable(place) {
    if (!place) return null;
    var best = bestReached();
    for (var i = 0; i < LIST.length; i++) {
      if (LIST[i].unlockMeet === place && !meets(LIST[i], best)) return LIST[i];
    }
    return null;
  }

  /* found one. returns it if this was the moment, or null if it was
     already known - so a second touch cannot fire the banner twice. */
  function noteMeet(d) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d || !d.unlockMeet) return null;
    var list = metIds();
    if (list.indexOf(d.id) >= 0) return null;
    list.push(d.id);
    Save.set('met', list);
    return d;
  }

  /* A DEED DONE, reported by name. Returns the doodads it just opened up,
     and [] every time after the first - which is the point of it, because
     the deed it was built for (holding the heat and the lime at once) is
     something a confident player does on most runs, and a banner that fired
     every time would be noise instead of news. The shape noteMeet has, for
     the same reason noteMeet has it: a deed is an event, not a total.

     It returns an array where noteMeet returns one doodad, because the
     caller's shape is noteBoon's and noteLime's - the engine pushes the
     result onto its unlock queue - and because nothing says two doodads
     could not one day want the same deed. The engine names the deed and
     never learns what it bought. */
  function noteDeed(name) {
    /* noteMeet's guard, in the shape noteMeet states it: without it an
       undefined name matches the eleven doodads that carry no unlockDeed
       field at all - `undefined === undefined` - and every one of them is
       written into the save as done. Nothing reaches it today, because the
       engine only ever names a deed it has a literal for, which is exactly
       the kind of latent that stops being latent when a second deed is
       added by somebody reading this function rather than its twin. */
    if (!name) return [];
    var list = metIds();
    var won = LIST.filter(function (d) {
      return d.unlockDeed === name && list.indexOf(d.id) < 0;
    });
    if (!won.length) return won;
    won.forEach(function (d) { list.push(d.id); });
    Save.set('met', list);
    return won;
  }

  /* record a run. returns the doodads this score just opened up, in
     roster order - usually none, occasionally one, and both at once if
     somebody jumps straight from nothing to thirty. */
  function noteScore(score) {
    var before = bestReached();
    if (score <= before) return [];
    reached = score;
    Save.set('reached', score);
    return LIST.filter(function (d) {
      return d.unlockAt && d.unlockAt > before && d.unlockAt <= score;
    });
  }

  /* HAS THIS DOODAD'S OWN PRICE ACTUALLY BEEN PAID?

     isUnlocked() without the passkey line, and the honest answer rather
     than the generous one. The achievements roster asks this: IMP11 opens
     every stall at once, and POULTRY CATCHER is a record of what the player
     DID, so a passkey must not hand it over. Split out of isUnlocked rather
     than copied into js/achievements.js so that the six prices are written
     down once - a seventh kind of lock is a line here and nowhere else. */
  function meets(d, best) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d) return false;
    if (d.unlockAt && (best === undefined ? bestReached() : best) < d.unlockAt) return false;
    if (d.unlockBoons && boonsTaken() < d.unlockBoons) return false;
    if (d.unlockLimes && limesTaken() < d.unlockLimes) return false;
    if (d.unlockGold && goldTaken(d.unlockGold.name) < d.unlockGold.need) return false;
    /* one test for the found ones and the deed ones together, because they
       share the one list: both are a yes that is remembered by the doodad's
       own id, and neither has a number to fall short of */
    if ((d.unlockMeet || d.unlockDeed) && metIds().indexOf(d.id) < 0) return false;
    return true;
  }

  /* DOES THIS DOODAD COST ANYTHING AT ALL?

     The six prices are written down HERE, beside meets(), so a seventh kind
     of lock is still one line in one file. It exists because the question
     was being asked by building the answer: Achievements.doodadsBought()
     called requirement() on all eight doodads purely to test the result for
     truthiness, and requirement() allocates an object and concatenates two
     strings for every priced one. Five objects and a dozen strings, thrown
     away unread, once per point scored and - until the achievements screen
     stopped asking an earned row for its progress - sixty times a second.

     EVERY NEW KIND HAS TO BE ADDED HERE AS WELL AS TO meets(), and the two
     say different things: meets() asks whether the price was paid, this asks
     whether there was one. POULTRY CATCHER counts the doodads that are
     priced AND met, so a kind this test did not know about would make its
     doodad free - it would never be counted toward the badge, and nine of
     twelve would be as high as the badge could ever read. */
  function priced(d) {
    if (typeof d === 'string') d = BY_ID.hasOwnProperty(d) ? BY_ID[d] : null;
    return !!(d && (d.unlockAt || d.unlockBoons || d.unlockLimes ||
                    d.unlockMeet || d.unlockGold || d.unlockDeed));
  }

  /* pass `best` when checking several doodads in one frame. masterKey(),
     boonsTaken() and limesTaken() all cache, so this stays cheap enough to
     call from a draw loop. A doodad states whatever it wants and has to satisfy all
     of it; one that states nothing was always there. */
  function isUnlocked(d, best) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d) return false;
    if (masterKey()) return true;
    return meets(d, best);
  }

  /* WHICH LEVEL IS THIS, AND WHAT IS IT CALLED?

     Two of the prices name a level - "find him" and "collect three of
     these" - and neither stores the NAME, only the id, because the names
     live in js/levels.js and a name copied into the roster is a name that
     will one day disagree with the menu.

     The walk is cached because of where it is called from. The select
     screen asks requirement() for a locked stall's `.plate` on every frame
     it draws the rail, so this would otherwise walk two rooms and nine bays
     per locked doodad per frame, forever, to answer a question whose answer
     cannot change: ids are fixed in the source. A miss is cached as null
     along with the hits, so a typo in an unlockGold.where costs one walk
     rather than one per frame. */
  var places = {};

  function placeOf(id) {
    if (places.hasOwnProperty(id)) return places[id];
    var found = null;
    var rooms = Levels.rooms;
    for (var i = 0; i < rooms.length && !found; i++) {
      var levels = rooms[i].levels;
      for (var j = 0; j < levels.length; j++) {
        if (levels[j].id === id) { found = { name: levels[j].name, room: rooms[i] }; break; }
      }
    }
    places[id] = found;
    return found;
  }

  /* SECRECY OUTRANKS HELPFULNESS, and it is the one thing the passkey is
     allowed to follow.

     The Living Room's bays are secret until its door is open - the level
     select will not so much as draw their names, and Levels.shown() keeps
     their score tables from being written - so a doodad's price must not
     print TRY THE COUCH to a player who has never heard of the Living Room.
     A locked card that said it would be handing over the room's existence,
     the number of bays in it and where to go, in exchange for nothing.

     roomOpen() is the right test and not gateMet(): it honours IMP11, and a
     passkey that opened every door in the game but left the price lines coy
     about where the doors were would be an exception nobody could guess.
     The limes' price never had to think about any of this, because the
     Canopy is in the Backyard where every bay is public from the first boot.

     Levels is safe to reach for even though it loads after this file: this
     only ever runs from a draw, which is long after boot, exactly as
     bestReached()'s call to Levels.playable() already does. */
  function placeLine(id) {
    var p = placeOf(id);
    return (p && Levels.roomOpen(p.room)) ? 'TRY ' + p.name : 'YOU ARE NOT THERE YET';
  }

  /* What a locked doodad is still waiting for: the price to print, how far
     along the player is and what to call it. Here rather than on the select
     screen, so the card never has to know which kind of lock it is looking
     at - and a seventh kind is a seventh branch in one place.

     Every string is measured against drawLockedCard's fixed geometry: the
     price is drawn centred at VW/2 with spacing 2, so n characters measure
     8n-2 px against a budget of about 460, and the longest of these is the
     shut-room form of the capybara's at 42 characters and 334px. The plates
     are spacing 1 (6n-1) and have to sit inside a stall's 92px pitch. */
  function requirement(d) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d) return null;
    if (d.unlockBoons) {
      return { price: 'COLLECT ' + d.unlockBoons + ' SUCCULENTS', unit: 'TAKEN',
               plate: d.unlockBoons + ' SUCCULENTS',
               have: Math.min(boonsTaken(), d.unlockBoons), need: d.unlockBoons };
    }
    /* the price names the level, because only one grows them - a player
       who has never seen a lime has no other way to learn where to look */
    if (d.unlockLimes) {
      return { price: 'CATCH ' + d.unlockLimes + ' LIMES IN THE CANOPY', unit: 'CAUGHT',
               plate: d.unlockLimes + ' LIMES',
               have: Math.min(limesTaken(), d.unlockLimes), need: d.unlockLimes };
    }
    /* The price names the level for the same reason the limes' does: a
       player who has not worked out where quarters come from cannot go and
       get three of them. The pickup's name is stored SINGULAR, because that
       is how the art shouts it when the +5 lands ('QUARTER +5'), so the
       price is the one place that adds the S - a pickup that did not
       pluralise with an S would want a field of its own, and none of them
       does. A doodad with no `where` simply gets the short line, which is
       what a pickup shed by several bays would want. */
    if (d.unlockGold) {
      var g = d.unlockGold;
      return { price: 'COLLECT ' + g.need + ' ' + g.name + 'S' +
                      (g.where ? '. ' + placeLine(g.where) : ''),
               unit: 'CAUGHT', plate: g.need + ' ' + g.name + 'S',
               have: Math.min(goldTaken(g.name), g.need), need: g.need };
    }
    /* nothing to total up and nothing to half-finish: you have met him or
       you have not, so this one asks the card for no progress bar.

       The level is looked up rather than written out, and that changed a
       shipped line - Saddam's card used to read FIND HIM IN THE GARDEN and
       now reads FIND HIM. TRY THE GARDEN. The preposition is the reason:
       IN or ON belongs to each level's name (in the garden, but on the
       couch) and nothing in js/levels.js stores which, so the line is built
       without one rather than with the wrong one. Giving every level a
       `prep` key would be nine rows touched for one word.

       It is also why neither of them says here what finding him COSTS. The
       Garden asks for nothing but a close pass; the Couch asks for a dive
       through the popcorn without taking a hit. That is each doodad's own
       business, so each says it in his lockedAbout, and this stays generic. */
    if (d.unlockMeet) {
      return { price: 'FIND HIM. ' + placeLine(d.unlockMeet), plate: 'HIDING',
               hint: 'HE IS NOT FOR SALE', bar: false };
    }
    /* a deed is one event too, so no bar here either. The copy is written
       out rather than built, because there is exactly one deed and a
       sentence reads better than a phrase assembled out of a deed id; a
       second deed would want a small table keyed by that id rather than a
       second branch.

       The hint deliberately does not name the Whiteboard. It is the last
       bay of a secret room, so naming it would spend the room's secret on a
       locked card - and ONE BAY SHEDS BOTH is true, gives away nothing and
       is quite enough to go looking with. */
    if (d.unlockDeed) {
      return { price: 'BE HOT AND SOUR AT ONCE', plate: 'HOT + SOUR',
               hint: 'ONE BAY SHEDS BOTH', bar: false };
    }
    if (d.unlockAt) {
      return { price: 'SCORE ' + d.unlockAt + ' TO UNLOCK', unit: 'BEST',
               plate: 'SCORE ' + d.unlockAt,
               have: Math.min(bestReached(), d.unlockAt), need: d.unlockAt };
    }
    return null;
  }

  function firstUnlocked() {
    var best = bestReached();
    for (var i = 0; i < LIST.length; i++) if (isUnlocked(LIST[i], best)) return LIST[i].id;
    return LIST[0].id;
  }

  return {
    list: LIST,
    /* hasOwnProperty, not truthiness: BY_ID is a plain object, so
       get('toString') and has('toString') would otherwise hand back a
       function off the prototype. That is reachable, not theoretical - the
       saved 'doodad' key is an arbitrary string from the save file, and
       Game.pickDoodad asks has() about it on the first frame of every
       boot. */
    get: function (id) { return BY_ID.hasOwnProperty(id) ? BY_ID[id] : null; },
    /* the cursor position for an id; 0 for anything unrecognised, so a
       stale save puts the player on the first doodad rather than nowhere */
    indexOf: function (id) { for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return i; return 0; },
    has: function (id) { return BY_ID.hasOwnProperty(id); },
    draw: draw,
    bestReached: bestReached, noteScore: noteScore,
    boonsTaken: boonsTaken, noteBoon: noteBoon, requirement: requirement,
    limesTaken: limesTaken, noteLime: noteLime,
    /* the +5 pickups, counted by the art's own name for them. goldTaken is
       what the price line on a locked card reads and what PlayScene's
       inspect() dumps for a headless test, the way it already dumps the
       succulents and the limes; noteGold is what PlayScene calls on a catch,
       and it hands back whatever that catch just opened. */
    goldTaken: goldTaken, noteGold: noteGold,
    /* meetable() takes the level id now - see its comment */
    meetable: meetable, noteMeet: noteMeet, noteDeed: noteDeed,
    isUnlocked: isUnlocked, meets: meets, priced: priced, firstUnlocked: firstUnlocked,
    masterKey: masterKey, setMasterKey: setMasterKey
  };
})();
