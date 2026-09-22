/* ------------------------------------------------------------------
   Land of Doodads - the doodads (playable characters)
   The sprite metadata below is measured from the source art: pivot is
   the centre of the body in the neutral (fall) frame, bodyR is that
   body's radius, and footOffset is how far below the pivot the feet
   sit (in body radii) - so every doodad can be drawn, stood on the
   ground and collided at a consistent size whatever its art. Run
   tools/trim_sprites.py to regenerate it; do not hand-edit.

   unlockAt is the score the player has to have reached before a doodad
   can be flown. No unlockAt means it was always there.
   title says how the doodad behaves in the coop on the title screen.

   Every doodad has an ability, and every one of them is PASSIVE: it needs
   no button of its own. The one that did (a dash on a double-tap) was cut,
   because asking for a gesture mid-flight fights the hand already flapping.
   Each ability is a plain field PlayScene reads - `nerve`, `watch`, `pull`,
   `trot`, `light` - so a new one is a new field rather than a new branch on
   an id, and each sits on its own axis: points, sight, pickups, survival,
   handling.
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
      title: { role: 'patrol', r: 18, homeX: 340, homeY: 124 }
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
      unlockAt: 20,
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
      unlockAt: 30,
      /* the biro, not the paper: every other doodad is warm brown or green
         against a dim brown coop, and giving him the near-white paper as an
         accent would put a white light shaft behind a white sprite */
      accent: '#4f8fd0', accentDark: '#2c5680', accentLight: '#9fc8ee',
      sprite: { w: 384, h: 360, pivotX: 192.0, pivotY: 178.2, bodyR: 178.2, footOffset: 1.00 },
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

  /* pass `best` when checking several doodads in one frame. masterKey()
     and boonsTaken() both cache, so this stays cheap enough to call from
     a draw loop. A doodad states whatever it wants and has to satisfy all
     of it; one that states nothing was always there. */
  function isUnlocked(d, best) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d) return false;
    if (masterKey()) return true;
    if (d.unlockAt && (best === undefined ? bestReached() : best) < d.unlockAt) return false;
    if (d.unlockBoons && boonsTaken() < d.unlockBoons) return false;
    return true;
  }

  /* What a locked doodad is still waiting for: the price to print, how far
     along the player is and what to call it. Here rather than on the select
     screen, so the card never has to know which kind of lock it is looking
     at - and a third kind is a third branch in one place. */
  function requirement(d) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d) return null;
    if (d.unlockBoons) {
      return { price: 'COLLECT ' + d.unlockBoons + ' SUCCULENTS', unit: 'TAKEN',
               plate: d.unlockBoons + ' SUCCULENTS',
               have: Math.min(boonsTaken(), d.unlockBoons), need: d.unlockBoons };
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
    get: function (id) { return BY_ID[id]; },
    /* the cursor position for an id; 0 for anything unrecognised, so a
       stale save puts the player on the first doodad rather than nowhere */
    indexOf: function (id) { for (var i = 0; i < LIST.length; i++) if (LIST[i].id === id) return i; return 0; },
    has: function (id) { return !!BY_ID[id]; },
    draw: draw,
    bestReached: bestReached, noteScore: noteScore,
    boonsTaken: boonsTaken, noteBoon: noteBoon, requirement: requirement,
    isUnlocked: isUnlocked, firstUnlocked: firstUnlocked,
    masterKey: masterKey, setMasterKey: setMasterKey
  };
})();
