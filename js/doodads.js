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
------------------------------------------------------------------ */
'use strict';

var Doodads = (function () {

  var LIST = [
    {
      id: 'cookie',
      name: 'COOKIE',
      tagline: 'FIRST TO THE FEEDER',
      about: ['SOFT, ROUND AND FULL OF NERVE.', 'FLIES LIKE A THROWN BISCUIT.'],
      ability: 'STILL HATCHING',
      accent: '#c9873c', accentDark: '#7a4a1c', accentLight: '#eab873',
      sprite: { w: 381, h: 384, pivotX: 219.6, pivotY: 222.8, bodyR: 161.1, footOffset: 1.00 },
      title: { role: 'perch', r: 19 }
    },
    {
      id: 'pepper',
      name: 'PEPPER',
      tagline: 'HOLDS A GRUDGE',
      about: ['OILY GREEN SHINE, SHORT TEMPER.', 'ALWAYS WATCHING THE DOOR.'],
      /* double-tap right and she throws herself forward. `dash` is the
         whole ability: how fast, for how long, and how long until the
         next one. */
      ability: 'DASH',
      abilityLive: true,
      abilityAbout: ['DOUBLE-TAP \u25B6 TO CHARGE.', 'SHE GOES THROUGH WHAT FALLS.'],
      dash: { speed: 360, time: 0.26, cool: 1.5 },
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
      ability: 'STILL HATCHING',
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
      ability: 'STILL HATCHING',
      unlockAt: 30,
      /* the biro, not the paper: every other doodad is warm brown or green
         against a dim brown coop, and giving him the near-white paper as an
         accent would put a white light shaft behind a white sprite */
      accent: '#4f8fd0', accentDark: '#2c5680', accentLight: '#9fc8ee',
      sprite: { w: 384, h: 360, pivotX: 192.0, pivotY: 178.2, bodyR: 178.2, footOffset: 1.00 },
      title: { role: 'patrol', r: 19, homeX: 96, homeY: 104, spanX: 54, spanY: 24 }
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
     caches, so this stays cheap enough to call from a draw loop. */
  function isUnlocked(d, best) {
    if (typeof d === 'string') d = BY_ID[d];
    if (!d) return false;
    if (!d.unlockAt) return true;
    if (masterKey()) return true;
    return (best === undefined ? bestReached() : best) >= d.unlockAt;
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
    isUnlocked: isUnlocked, firstUnlocked: firstUnlocked,
    masterKey: masterKey, setMasterKey: setMasterKey
  };
})();
