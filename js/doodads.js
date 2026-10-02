/* ------------------------------------------------------------------
   Land of Doodads - the doodads (playable characters)
   The sprite metadata below is measured from the source art: pivot is
   the centre of the body in the neutral (fall) frame, bodyR is that
   body's radius, and footOffset is how far below the pivot the feet
   sit (in body radii) - so every doodad can be drawn, stood on the
   ground and collided at a consistent size whatever its art. Run
   tools/trim_sprites.py to regenerate it; do not hand-edit.

   unlockAt is the score the player has to have reached before a doodad
   can be flown. No unlockAt means it was always there. unlockBoons,
   unlockLimes and unlockMeet are the other prices: things collected, and
   somebody found.
   title says how the doodad behaves in the coop on the title screen.

   Every doodad has an ability, and every one of them is PASSIVE: it needs
   no button of its own. The one that did (a dash on a double-tap) was cut,
   because asking for a gesture mid-flight fights the hand already flapping.
   Each ability is a plain field PlayScene reads - `nerve`, `watch`, `pull`,
   `trot`, `light`, `lives`, `flick`, `size` - so a new one is a new field
   rather than a new branch on an id, and each sits on its own axis:
   points, sight, pickups, survival, handling, room.

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
      /* Not a price at all: he is FOUND. The level says which plank he is
         hiding behind (tune.meetAt); this only says that touching him is
         what opens the stall. */
      unlockMeet: true,
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
  var met = null;                     /* ids of the ones found in the world */
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

  /* The doodads that have been found rather than earned. A list of ids
     rather than a count, because meeting one is a single event that either
     has or has not happened and there is nothing to total up. */
  function metIds() {
    if (met !== null) return met;
    var stored = Save.get('met', []);
    met = Array.isArray(stored) ? stored.filter(function (id) { return BY_ID.hasOwnProperty(id); }) : [];
    return met;
  }

  /* The doodad currently hiding in the world, if any: the first still-shut
     one that is found rather than bought. Levels ask for this instead of
     naming an id, so who is behind the plank stays the roster's business.

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
  function meetable() {
    var best = bestReached();
    for (var i = 0; i < LIST.length; i++) {
      if (LIST[i].unlockMeet && !meets(LIST[i], best)) return LIST[i];
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
     than copied into js/achievements.js so that the four prices are written
     down once - a fifth kind of lock is a line here and nowhere else. */
  function meets(d, best) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d) return false;
    if (d.unlockAt && (best === undefined ? bestReached() : best) < d.unlockAt) return false;
    if (d.unlockBoons && boonsTaken() < d.unlockBoons) return false;
    if (d.unlockLimes && limesTaken() < d.unlockLimes) return false;
    if (d.unlockMeet && metIds().indexOf(d.id) < 0) return false;
    return true;
  }

  /* DOES THIS DOODAD COST ANYTHING AT ALL?

     The four prices are written down HERE, beside meets(), so a fifth kind
     of lock is still one line in one file. It exists because the question
     was being asked by building the answer: Achievements.doodadsBought()
     called requirement() on all eight doodads purely to test the result for
     truthiness, and requirement() allocates an object and concatenates two
     strings for every priced one. Five objects and a dozen strings, thrown
     away unread, once per point scored and - until the achievements screen
     stopped asking an earned row for its progress - sixty times a second. */
  function priced(d) {
    if (typeof d === 'string') d = BY_ID.hasOwnProperty(d) ? BY_ID[d] : null;
    return !!(d && (d.unlockAt || d.unlockBoons || d.unlockLimes || d.unlockMeet));
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

  /* What a locked doodad is still waiting for: the price to print, how far
     along the player is and what to call it. Here rather than on the select
     screen, so the card never has to know which kind of lock it is looking
     at - and a fourth kind is a fourth branch in one place. */
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
    if (d.unlockAt) {
      return { price: 'SCORE ' + d.unlockAt + ' TO UNLOCK', unit: 'BEST',
               plate: 'SCORE ' + d.unlockAt,
               have: Math.min(bestReached(), d.unlockAt), need: d.unlockAt };
    }
    /* nothing to total up and nothing to half-finish: you have met him or
       you have not, so this one asks the card for no progress bar */
    if (d.unlockMeet) {
      return { price: 'FIND HIM IN THE GARDEN', plate: 'HIDING',
               hint: 'HE IS NOT FOR SALE', bar: false };
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
    meetable: meetable, noteMeet: noteMeet,
    isUnlocked: isUnlocked, meets: meets, priced: priced, firstUnlocked: firstUnlocked,
    masterKey: masterKey, setMasterKey: setMasterKey
  };
})();
