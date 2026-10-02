/* ------------------------------------------------------------------
   Land of Doodads - title screen
   A slow pan through the coop with everyone the player has earned
   living in it. Each doodad carries a `title` role in js/doodads.js:
   a percher hops between the perches as they drift past, a flyer
   patrols the air, a stomper walks the hay refusing to accept that it
   cannot fly. They notice each other and chirp about it.
   Doodads that have not been unlocked are simply not here - this game
   treats locked content as not existing yet rather than as withheld.
------------------------------------------------------------------ */
'use strict';

var TitleScene = (function () {

  var SCROLL = 15;                 /* px per second of camera drift */
  var CEIL = Coop.CEIL, FLOOR = Coop.FLOOR;

  var t = 0, scroll = 0;
  var perches = [], litter = [], dust = [], bubbles = [], puffs = [], props = [];
  var actors = {};                 /* id -> Actor, whoever is in today */
  var cast = [];                   /* the same actors, in draw order    */
  var directorTimer = 3;

  /* who stands in front of whom */
  var DEPTH = { walk: 0, perch: 1, patrol: 2 };

  /* the sign is drawn on the foreground layer, above the doodads, so a
     percher that takes a high perch disappears behind it */
  var PERCH_TOP = 134;
  var timers = [];                 /* delayed beats, ticked by the scene */
  var menuIndex = 0;
  var MENU = ['PLAY', 'HIGH SCORES', 'ACHIEVEMENTS'];

  /* which row the NEW tab hangs on, asked of the menu rather than typed as a
     2, because the tab landing on the wrong board is the kind of mistake
     that survives a reordering unnoticed */
  var ACHV_ROW = MENU.indexOf('ACHIEVEMENTS');

  /* The menu's geometry, in one place because two things now need it: the
     loop that draws the boards, and the NEW tab that has to land on the
     third board's corner exactly. A second copy of `144 + m * 38` sitting in
     drawFg is how those two quietly drift apart the next time a row is
     added, so there is only the one copy and both callers ask for it.

     172 wide rather than the 152 these boards were: ACHIEVEMENTS is 142px at
     scale 2 and UI.button centres its label at x + w/2 - 1, so on a 152
     board the S finished 6px from the edge, directly under the lit board's
     right-hand nail at x + w - 6. On 172 the word has 15px of air each side
     and the nails (bx + 4 and bx + bw - 6) are clear of the glyphs. The
     column also has to start higher, at 144 instead of 182, because three
     rows of 38 have to finish at the same 252 the two rows used to - the
     footer strip's soft edge begins at 254 and the logo's subtitle ends at
     113, which leaves the top board 31px of daylight above it. */
  var MENU_BW = 172, MENU_BH = 32;
  function menuX() { return (VW - MENU_BW) / 2; }          /* 154 */
  function menuY(m) { return 144 + m * 38; }               /* 144 / 182 / 220 */

  /* THE MENU COLUMN IS A PLACE THE PERCHERS KEEP OUT OF.

     With two boards the column started at y 182 and a percher sitting on a
     perch at 134..180 stood above it. With three it starts at 144, so any
     perch in the middle of the screen puts its percher BEHIND a board for
     the whole fourteen seconds the perch takes to drift from x 346 to x 134
     at SCROLL 15 - the doodad the player earned, hidden by the menu that
     tells them so. Rather than move the boards or the perches, the column
     joins the left edge and the far right as somewhere a percher will not
     choose and will not stay: 20px of air either side of the boards, so a
     doodad is not half-eclipsed by a board's edge either. */
  var MENU_L = (VW - MENU_BW) / 2 - 20;                    /* 134 */
  var MENU_R = (VW - MENU_BW) / 2 + MENU_BW + 20;          /* 346 */

  function inColumn(p) {
    var cx = p.x + p.w * 0.5;
    return cx > MENU_L && cx < MENU_R;
  }

  /* The rectangles this screen drew, refilled every frame inside drawFg and
     handed to Input by Game.render. PLAY was already the biggest word on the
     screen; it simply was not a button. Now it is one, and it is the only
     thing on the title a tap can land on - the coop, the logo and the sky
     are scenery again. */
  var hot = [];

  /* ------------------------------------------------------- scenery */

  function spawnPerch(x) {
    var p = {
      x: x,
      y: randInt(108, 180),
      w: randInt(58, 112),
      rope: chance(0.4)
    };
    perches.push(p);
    return p;
  }

  function makeProp(x) {
    return { x: x, kind: randInt(0, 2), w: 26 };
  }

  function seedScenery() {
    perches.length = 0; litter.length = 0; dust.length = 0; props.length = 0;
    var x = -40;
    while (x < VW + 160) { var p = spawnPerch(x); x += randInt(96, 168); }
    for (var i = 0; i < 6; i++) {
      var l = Coop.makeLitter(rand(0, VW + 80));
      litter.push(l);
    }
    var px = 40;
    while (px < VW + 200) { props.push(makeProp(px)); px += randInt(150, 280); }
    for (var d = 0; d < 34; d++) {
      dust.push({ x: rand(0, VW), y: rand(CEIL, FLOOR), vy: rand(-5, -1), vx: rand(-7, -2),
                  phase: rand(0, TAU), bright: chance(0.3) });
    }
  }

  function updateScenery(dt) {
    var move = SCROLL * dt;
    var i;
    for (i = perches.length - 1; i >= 0; i--) {
      perches[i].x -= move;
      if (perches[i].x + perches[i].w < -30) perches.splice(i, 1);
    }
    var rightmost = -999;
    for (i = 0; i < perches.length; i++) rightmost = Math.max(rightmost, perches[i].x);
    if (rightmost < VW + 120) spawnPerch(rightmost + randInt(96, 168));

    for (i = props.length - 1; i >= 0; i--) {
      props[i].x -= move;
      if (props[i].x < -60) { props.splice(i, 1); props.push(makeProp(VW + rand(60, 240))); }
    }

    for (i = litter.length - 1; i >= 0; i--) {
      litter[i].x -= move;
      if (litter[i].x < -30) { litter.splice(i, 1); litter.push(Coop.makeLitter(VW + rand(10, 160))); }
    }

    for (i = 0; i < dust.length; i++) {
      var p = dust[i];
      p.x += (p.vx - SCROLL * 0.6) * dt;
      p.y += p.vy * dt + Math.sin(t * 1.4 + p.phase) * 4 * dt;
      if (p.x < -2) { p.x = VW + 2; p.y = rand(CEIL, FLOOR); }
      if (p.y < CEIL) { p.y = FLOOR - 4; p.x = rand(0, VW); }
    }

    for (i = puffs.length - 1; i >= 0; i--) {
      var pf = puffs[i];
      pf.life -= dt; pf.x += pf.vx * dt - move; pf.y += pf.vy * dt; pf.vy += 40 * dt;
      if (pf.life <= 0) puffs.splice(i, 1);
    }
    for (i = bubbles.length - 1; i >= 0; i--) {
      var bb = bubbles[i];
      bb.life -= dt;
      if (bb.life <= 0) { bubbles.splice(i, 1); continue; }
      placeBubble(bb, dt);
    }
  }

  function puff(x, y, n) {
    for (var i = 0; i < (n || 5); i++) {
      puffs.push({ x: x + rand(-5, 5), y: y + rand(-2, 1), vx: rand(-18, 18), vy: rand(-26, -6),
                   life: rand(0.3, 0.7), col: chance(0.5) ? Coop.P.hayLight : Coop.P.hayPale });
    }
  }

  /* a setTimeout that cannot fire after the scene is gone */
  function later(delay, fn) { timers.push({ t: delay, fn: fn }); }

  function updateTimers(dt) {
    for (var i = timers.length - 1; i >= 0; i--) {
      timers[i].t -= dt;
      if (timers[i].t <= 0) { var fn = timers[i].fn; timers.splice(i, 1); fn(); }
    }
  }

  /* Where a bubble sits, worked out once a frame rather than in the draw.

     Two separate problems, two separate parts. The TARGET only moves when
     its doodad has genuinely gone somewhere (2px), so a doodad that is
     merely bobbing cannot flip the bubble between two columns - that alone
     had it moving on 35% of frames. The SHOWN position then eases toward
     that target, because a target which steps 2-5px at a time would
     otherwise lurch after a doodad that is gliding. Bobbing moves nothing;
     travelling reads as following. */
  function placeBubble(b, dt) {
    var a = b.actor;
    var wx = a.x + a.r * 0.6, wy = a.y - a.r - 10;
    if (b.tx === undefined) { b.tx = wx; b.ty = wy; b.sx = wx; b.sy = wy; }
    if (Math.abs(wx - b.tx) > 2) b.tx = wx;
    if (Math.abs(wy - b.ty) > 2) b.ty = wy;
    b.sx = damp(b.sx, b.tx, 0.0005, dt);
    b.sy = damp(b.sy, b.ty, 0.0005, dt);
  }

  /* One bubble per doodad. The director and the idle chatter can both fire
     at a doodad inside the same second, and two bubbles at one actor draw
     at the same spot, one over the other - which reads as a smeared or
     doubled bubble rather than as two remarks. Saying something again
     replaces what is already up. */
  function say(actor, symbol) {
    for (var i = bubbles.length - 1; i >= 0; i--) {
      if (bubbles[i].actor === actor) bubbles.splice(i, 1);
    }
    bubbles.push({ actor: actor, symbol: symbol, life: 1.2 });
    Audio3.play('chirp');
  }

  /* -------------------------------------------------------- actors */

  function Actor(id, r) {
    this.id = id;
    this.r = r;
    this.x = 0; this.y = 0;
    this.vx = 0; this.vy = 0;
    this.angle = 0;
    this.flapTimer = 0;
    this.state = 'idle';
    this.timer = rand(1, 3);
    this.bobPhase = rand(0, TAU);
    this.perch = null;
    this.target = null;
    this.spanX = 78; this.spanY = 34;   /* how far a flyer wanders */
    this.foot = Doodads.get(id).sprite.footOffset;
  }

  Actor.prototype.flap = function (strength) {
    this.flapTimer = 0.28;
    if (strength) this.vy -= strength;
  };

  Actor.prototype.flying = function () { return this.flapTimer > 0; };

  /* ---- percher: rides the perches, hops to a new one as they pass */

  function updatePercher(a, dt) {
    a.flapTimer -= dt;
    a.timer -= dt;

    if (a.state === 'perch') {
      /* TWO DIFFERENT REASONS TO GO, AND ONLY ONE OF THEM IS A REASON TO
         LET GO.

         GONE is the perch itself ending: recycled out of the list, or
         carried off the left of the stage. There is nothing left to stand
         on and the percher has to leave whether or not it has anywhere to
         leave to.

         HIDDEN is the perch drifting in behind the menu boards, which is
         new - the column starts at y 144 now, not 182, so a perch in the
         middle of the screen puts whoever is on it behind a sign for the
         fourteen seconds it takes to cross. That is a reason to go LOOKING
         for somewhere better, and never a reason to step off: if the hop
         finds nothing the percher keeps standing exactly where it is and
         rides the perch on through. The 2px is so a perch handed out at the
         very boundary is not declared hidden on the frame it was taken.

         Riding on was the whole of the bug the first time this was written.
         leapToPerch can and does come back empty - every free perch taken,
         or every one of them still off the right-hand edge - and the old
         shape simply stopped updating a.x and a.y when that happened, which
         with GONE was a doodad standing still at the far left for half a
         second and with HIDDEN is a doodad hanging in the air over the hay
         in the middle of the screen. A doodad behind a sign reads as a
         doodad behind a sign. A doodad in mid-air reads as a bug. */
      var held = a.perch && perches.indexOf(a.perch) >= 0;
      var gone = !held || a.perch.x + a.perch.w < 96;
      var hidden = held && !gone && inColumn(a.perch)
                   && a.perch.x + a.perch.w * 0.5 < MENU_R - 2;
      if (gone || hidden) leapToPerch(a);
      /* still perched means the hop found nowhere to go - or was never
         called for in the first place, which is the ordinary case */
      if (a.state === 'perch' && held) {
        a.x = a.perch.x + a.perch.w * 0.5;
        a.y = a.perch.y - a.r * a.foot + Math.sin(t * 2.1 + a.bobPhase) * 1.2;
        a.angle = Math.sin(t * 1.1 + a.bobPhase) * 0.05;
        if (a.timer <= 0) {
          a.timer = rand(2.2, 5);
          if (chance(0.45)) { a.flap(0); say(a, '♪'); }
          else if (chance(0.5)) say(a, '·');
        }
      }
    } else if (a.state === 'hopping') {
      a.hopT += dt / a.hopDur;
      var k = clamp(a.hopT, 0, 1);
      var tp = a.target;
      a.x = lerp(a.from.x, tp.x + tp.w * 0.5, k);
      var arc = -Math.sin(k * Math.PI) * a.hopArc;
      a.y = lerp(a.from.y, tp.y - a.r * a.foot, k) + arc;
      a.angle = lerp(-0.22, 0.12, k) * (1 - Math.abs(0.5 - k) * 0.7);
      if (k > 0.1 && k < 0.75 && a.flapTimer <= 0.02) a.flap(0);
      if (k >= 1) {
        a.state = 'perch';
        a.perch = tp;
        a.timer = rand(1.4, 3.4);
        a.angle = 0;
        puff(a.x, tp.y, 3);
      }
    }
  }

  /* the first perch in `list` nobody else has a claim on */
  function freePerch(list, self) {
    for (var i = 0; i < list.length; i++) if (!perchTaken(list[i], self)) return list[i];
    return null;
  }

  /* somebody else is already sitting on it, or on their way to it */
  function perchTaken(p, self) {
    for (var i = 0; i < cast.length; i++) {
      var o = cast[i];
      if (o === self || o.role !== 'perch') continue;
      if (o.perch === p || o.target === p) return true;
    }
    return false;
  }

  /* CAN THIS PERCH BE LANDED ON AT ALL - asked by every pass below, which
     is the point of it being a function.

     It used to be asked only by the first pass. The fallback underneath
     tested nothing but "free, and to the right of me", and perches are
     SPAWNED OFF THE RIGHT EDGE - updateScenery keeps pushing new ones out
     at rightmost + 96..168 until the furthest is past VW + 120 - so the
     furthest-right free perch is routinely one that has not arrived yet.
     That was survivable while the fallback was the rare branch. Once the
     menu column started evicting perchers in the middle of the stage it
     became the usual branch, and a percher hopping to a perch at x 600
     simply left the screen.

     The three tests, in the order they rule things out: below the sign,
     because PERCH_TOP is where the logo stops covering things; past x 150,
     because anything further left is on its way out of shot and would have
     to be left again within a few seconds; and a centre inside VW - 74, so
     the doodad lands somewhere the player can see. */
  function landable(p, a) {
    if (p === a.perch || perchTaken(p, a)) return false;
    if (p.y < PERCH_TOP) return false;
    if (p.x < 150) return false;
    return p.x + p.w * 0.5 <= VW - 74;
  }

  /* The nearest landable perch to `aim`, optionally refusing the ones
     behind the menu boards. Two passes over the same test is how the
     column gets to be a preference rather than a ban: a percher would
     rather be hidden for a while than be left hopping in place with
     nowhere to land. */
  function bestPerch(a, aim, avoidColumn) {
    var best = null;
    for (var i = 0; i < perches.length; i++) {
      var p = perches[i];
      if (!landable(p, a)) continue;
      if (avoidColumn && inColumn(p)) continue;
      if (!best || Math.abs(p.x - aim) < Math.abs(best.x - aim)) best = p;
    }
    return best;
  }

  function leapToPerch(a) {
    /* The sweet spot used to be x 280, the middle of a stage whose menu
       lived at the bottom. It is now the right-hand gap, between the boards'
       right edge at MENU_R (346) and the furthest right a percher may stand
       (centre 406) - which, with a perch 58..112 wide, is a left edge of
       about 290..377. Measuring against 392 therefore reads as "as far into
       that gap as this perch will go", and the wide perches that would poke
       back over the boards lose to the narrow ones that clear them.

       And if the gap has nothing free in it, take the nearest landable
       perch anywhere, boards included. Being half behind a sign for a few
       seconds is a small price; the alternative is a doodad with nowhere to
       go, and what that actually looks like is in updatePercher. */
    var best = bestPerch(a, 392, true) || bestPerch(a, 392, false);
    if (!best) { a.timer = 0.4; return; }
    a.from = { x: a.x, y: a.y };
    a.target = best;
    a.state = 'hopping';
    a.hopT = 0;
    a.hopDur = clamp(Math.abs(best.x - a.x) / 130, 0.75, 1.9);
    a.hopArc = 22 + Math.random() * 16;
    a.flap(0);
    if (chance(0.4)) say(a, '!');
  }

  /* ---- flyer: never lands, patrols the upper air, likes to swoop */

  function updateFlyer(a, dt) {
    a.flapTimer -= dt;
    a.timer -= dt;

    var tx, ty;
    if (a.state === 'swoop' && a.target) {
      tx = a.target.x + a.swoopDX;
      ty = a.target.y + a.swoopDY;
      if (a.timer <= 0) { a.state = 'patrol'; a.timer = rand(3, 6); }
    } else {
      /* a lazy figure of eight, sized so two flyers keep out of each
         other's way and off the sign and the menu boards */
      tx = a.homeX + Math.sin(t * 0.42 + a.bobPhase) * a.spanX;
      ty = a.homeY + Math.sin(t * 0.83 + a.bobPhase) * a.spanY;
      if (a.timer <= 0) { a.timer = rand(2.5, 5); if (chance(0.3)) { a.flap(0); say(a, '·'); } }
    }

    var ax = (tx - a.x) * 2.6, ay = (ty - a.y) * 2.6;
    a.vx = damp(a.vx + ax * dt, 0, 0.14, dt);
    a.vy = damp(a.vy + ay * dt, 0, 0.14, dt);
    a.x += a.vx * dt;
    a.y += a.vy * dt;
    a.angle = clamp(a.vy / 240, -0.3, 0.42);
    if (a.vy < -14 && a.flapTimer <= 0.04) a.flap(0);
    if (a.flapTimer < -0.5 && chance(dt * 1.6)) a.flap(0);
  }

  /* ---- stomper: walks the hay, hops, occasionally attempts flight */

  function updateStomper(a, dt) {
    a.flapTimer -= dt;
    a.timer -= dt;
    var ground = FLOOR - a.r * a.foot;

    if (a.state === 'walk') {
      /* spanX, because how far a stomper can wander depends on how wide
         its artwork is: the default 26 walks a broad sprite off the stage */
      a.x = damp(a.x, a.homeX + Math.sin(t * 0.3 + a.bobPhase) * (a.spanX || 26), 0.4, dt);
      a.y = ground - Math.abs(Math.sin(t * 3.4 + a.bobPhase)) * 1.6;
      a.angle = Math.sin(t * 3.4 + a.bobPhase) * 0.04;
      if (a.timer <= 0) {
        a.timer = rand(2.4, 5.5);
        if (chance(0.45)) { a.state = 'hop'; a.vy = -92; a.hops = 1; }
        else if (chance(0.5)) { a.state = 'attempt'; a.vy = -120; a.hops = 3; a.flap(0); say(a, '!'); }
      }
    } else if (a.state === 'hop' || a.state === 'attempt') {
      a.vy += 620 * dt;
      a.y += a.vy * dt;
      a.angle = clamp(a.vy / 700, -0.16, 0.2);
      if (a.state === 'attempt' && a.vy > -20 && a.flapTimer <= 0.02 && a.hops > 0) {
        a.hops--; a.flap(78);
      }
      if (a.y >= ground) {
        a.y = ground; a.vy = 0;
        puff(a.x, FLOOR, 6);
        if (a.state === 'attempt') { say(a, '?'); }
        a.state = 'walk';
        a.timer = rand(2, 4.5);
        a.angle = 0;
      }
    }
  }

  var BEHAVIOUR = { perch: updatePercher, patrol: updateFlyer, walk: updateStomper };

  function withRole(role) {
    var out = [];
    for (var i = 0; i < cast.length; i++) if (cast[i].role === role) out.push(cast[i]);
    return out;
  }
  function anyWithRole(role) { var l = withRole(role); return l.length ? choose(l) : null; }

  /* ------------------------------------------------------ director */

  function director(dt) {
    directorTimer -= dt;
    if (directorTimer > 0) return;
    directorTimer = rand(5, 9);
    var roll = Math.random();
    /* the beats are cast by role, not by name, so they keep working
       whoever happens to be living in the coop today */
    var flyer = anyWithRole('patrol');
    var percher = anyWithRole('perch');
    var walker = anyWithRole('walk');

    if (roll < 0.36 && flyer && percher) {
      /* the flyer buzzes somebody sitting down */
      flyer.state = 'swoop';
      flyer.target = percher;
      flyer.swoopDX = rand(-62, -44);
      flyer.swoopDY = rand(-32, -12);
      flyer.timer = rand(1.6, 2.6);
      later(0.9, function () { percher.flap(0); say(percher, '!'); });
      say(flyer, '♪');
    } else if (roll < 0.62 && flyer && walker) {
      /* the flyer drops in on somebody on the ground, who objects */
      flyer.state = 'swoop';
      flyer.target = walker;
      flyer.swoopDX = rand(18, 38);
      flyer.swoopDY = rand(-62, -44);
      flyer.timer = rand(1.4, 2.2);
      later(1.0, function () {
        if (walker.state === 'walk') { walker.state = 'hop'; walker.vy = -104; say(walker, '!'); }
      });
    } else if (roll < 0.82 && walker) {
      /* another go at flying */
      if (walker.state === 'walk') {
        walker.state = 'attempt'; walker.vy = -126; walker.hops = 3;
        walker.flap(0); say(walker, '★');
      }
    } else if (cast.length) {
      /* a round of chirping, whoever is in */
      for (var i = 0; i < Math.min(3, cast.length); i++) {
        (function (a, delay, sym) {
          later(delay, function () { say(a, sym); });
        })(cast[i], i * 0.44, i === 2 ? '·' : '♪');
      }
    }
  }

  /* ------------------------------------------------------ lifecycle */

  function enter(params) {
    t = 0; scroll = 0;
    bubbles.length = 0; puffs.length = 0; timers.length = 0;
    seedScenery();
    menuIndex = (params && params.menu) || 0;

    /* An achievement can come true somewhere that has no banner to show it
       in: a run abandoned from the pause panel after the plank that paid for
       it, a doodad bought on the select screen, or a save file that already
       satisfied one before achievements existed at all. Re-evaluating on the
       way in banks those, silently - the earned count goes up and the
       ACHIEVEMENTS row grows its NEW tab, which is all the title should say.
       The celebrating belongs to the run that earned it and to the screen
       that can show the badge, so the newly-earned list is deliberately
       dropped on the floor here. */
    Achievements.check();

    actors = {}; cast = [];
    var best = Doodads.bestReached();
    Doodads.list.forEach(function (d) {
      if (d.title && Doodads.isUnlocked(d, best)) addActor(d);
    });
    sortCast();

    directorTimer = 4;
  }

  /* move a doodad into the coop and stage it according to its role */
  function addActor(d) {
    var a = new Actor(d.id, d.title.r);
    a.role = d.title.role;
    if (a.role === 'perch') {
      var want = [], q;
      /* High enough to stand clear of the sign, and out of the menu column:
         the hop-off rule in updatePercher would evict a percher seeded into
         the column on its very first frame, which is a hop at t = 0 before
         the player has seen anybody standing anywhere. Choosing properly in
         the first place costs one test. */
      for (q = 0; q < perches.length; q++) {
        if (perches[q].y >= PERCH_TOP && !inColumn(perches[q])) want.push(perches[q]);
      }
      if (!want.length) want = perches;
      a.state = 'perch';
      /* One perch each - asked, not counted. Counting heads assumed the
         perchers were seeded in order onto want[0], want[1], ...; that is
         wrong on refresh(), where the ones already in the coop have long
         since hopped elsewhere, and it collapses when fewer perches clear
         PERCH_TOP than there are perchers, clamping the last ones onto a
         perch somebody already has. perchTaken is what every other perch
         choice in this file uses.

         A high perch if one is free, otherwise ANY free perch - standing a
         little lower is a far smaller price than standing inside another
         doodad - and only share when every perch in the coop is spoken
         for, which needs more perchers than the scenery has beams. */
      a.perch = freePerch(want, a) || freePerch(perches, a)
             || want[withRole('perch').length % want.length];
      a.x = a.perch.x + a.perch.w * 0.5;
      a.y = a.perch.y - a.r * a.foot;
    } else if (a.role === 'patrol') {
      a.state = 'patrol';
      a.homeX = d.title.homeX; a.homeY = d.title.homeY;
      if (d.title.spanX) a.spanX = d.title.spanX;
      if (d.title.spanY) a.spanY = d.title.spanY;
      a.x = a.homeX; a.y = a.homeY;
    } else {
      a.state = 'walk';
      a.homeX = d.title.homeX;
      if (d.title.spanX) a.spanX = d.title.spanX;
      a.x = a.homeX; a.y = FLOOR - a.r * a.foot;
    }
    actors[d.id] = a;
    cast.push(a);
    return a;
  }

  function sortCast() { cast.sort(function (p, q) { return DEPTH[p.role] - DEPTH[q.role]; }); }

  /* A doodad can arrive while the title screen is up - the master passkey
     can be typed right here - so let it walk straight in rather than
     waiting for a scene change. Everyone already in keeps their place. */
  function refresh() {
    var best = Doodads.bestReached();
    var added = false;
    Doodads.list.forEach(function (d) {
      if (!d.title || actors[d.id] || !Doodads.isUnlocked(d, best)) return;
      say(addActor(d), '★');
      added = true;
    });
    if (added) sortCast();
  }

  function update(dt) {
    t += dt;
    scroll += SCROLL * dt;
    updateTimers(dt);
    updateScenery(dt);
    for (var i = 0; i < cast.length; i++) BEHAVIOUR[cast[i].role](cast[i], dt);
    director(dt);

    if (Game.locked()) return;
    /* A tap on a board moves the cursor onto it BEFORE the confirm below
       runs, and the board carries a:'confirm' - so one tap is choose and
       go, and the keyboard branch underneath does the going. */
    var tg = Input.tapped();
    if (tg && tg.id === 'menu') menuIndex = tg.i;
    if (tg && tg.id === 'sound') {
      /* the same toggle M has always driven, and the same toast with it, so
         a phone and a keyboard say the same thing about the same state */
      var muted = Audio3.toggleMute();
      Game.toast(muted ? 'SOUND OFF' : 'SOUND ON');
      if (!muted) Audio3.play('move');
    }
    if (Input.nav('down')) { menuIndex = (menuIndex + 1) % MENU.length; Audio3.play('move'); }
    if (Input.nav('up')) { menuIndex = (menuIndex + MENU.length - 1) % MENU.length; Audio3.play('move'); }
    if (Input.hit('confirm')) {
      Audio3.play('select');
      /* Named, not numbered, so the row order is free to change: both
         screens come back with the index they left from (ScoresScene with
         { menu: 1 }, AchievementsScene with { menu: 2 }) and those numbers
         are the only place the order is written down twice. */
      if (MENU[menuIndex] === 'PLAY') Game.go(LevelSelectScene, {});
      else if (MENU[menuIndex] === 'HIGH SCORES') Game.go(ScoresScene, {});
      else Game.go(AchievementsScene, {});
    }
  }

  /* -------------------------------------------------------- drawing */

  function drawBg(ctx) {
    Coop.drawBackdrop(ctx, scroll);
    Coop.drawCeiling(ctx, scroll);

    /* perches, drawn between the backdrop and the floor */
    for (var i = 0; i < perches.length; i++) {
      var p = perches[i];
      var x = Math.round(p.x);
      if (p.rope) {
        ctx.fillStyle = Coop.P.outline;
        ctx.fillRect(x + 6, CEIL, 1, p.y - CEIL);
        ctx.fillRect(x + p.w - 7, CEIL, 1, p.y - CEIL);
      }
      Coop.postH(ctx, x, Math.round(p.y), p.w, 7);
      Tint.rect(ctx, x, Math.round(p.y) + 7, p.w, 5, Coop.P.void, 5);
    }

    Coop.drawFloor(ctx, scroll);
    for (var l = 0; l < litter.length; l++) Coop.drawObstacle(ctx, litter[l]);
    for (var pr = 0; pr < props.length; pr++) drawGroundProp(ctx, props[pr]);

    /* the doodads throw a little shade of their own */
    for (var sh = 0; sh < cast.length; sh++) {
      if (cast[sh].role === 'walk') groundShadow(ctx, cast[sh]);
      else if (cast[sh].role === 'perch') perchShadow(ctx, cast[sh]);
    }

    /* dust in the air */
    for (var d = 0; d < dust.length; d++) {
      var pt = dust[d];
      ctx.fillStyle = pt.bright ? Coop.P.daylightHi : Coop.P.dust;
      ctx.fillRect(Math.round(pt.x), Math.round(pt.y), 1, 1);
    }
    for (var k = 0; k < puffs.length; k++) {
      var pf = puffs[k];
      ctx.fillStyle = pf.col;
      ctx.fillRect(Math.round(pf.x), Math.round(pf.y), 1, 1);
    }
  }

  /* things that live on the floor of the coop */
  function drawGroundProp(ctx, p) {
    var P = Coop.P, x = Math.round(p.x), y = Coop.FLOOR;
    if (p.kind === 0) {
      /* nesting box with straw spilling out */
      ctx.fillStyle = P.beamMid; ctx.fillRect(x, y - 19, 30, 19);
      ctx.fillStyle = P.beamLight; ctx.fillRect(x + 1, y - 18, 28, 2);
      ctx.fillStyle = P.void; ctx.fillRect(x + 5, y - 14, 20, 12);
      ctx.fillStyle = P.hayMid; ctx.fillRect(x + 5, y - 6, 20, 4);
      ctx.fillStyle = P.hayLight; ctx.fillRect(x + 7, y - 7, 6, 1); ctx.fillRect(x + 16, y - 8, 5, 1);
      ctx.fillStyle = P.outline;
      ctx.fillRect(x, y - 20, 30, 1); ctx.fillRect(x - 1, y - 19, 1, 19); ctx.fillRect(x + 30, y - 19, 1, 19);
      ctx.fillRect(x + 5, y - 14, 20, 1);
      UI.nail(ctx, x + 3, y - 17); UI.nail(ctx, x + 25, y - 17);
    } else if (p.kind === 1) {
      /* feed bowl */
      ctx.fillStyle = P.wireDark; ctx.fillRect(x, y - 7, 22, 7);
      ctx.fillStyle = P.wireLight; ctx.fillRect(x + 1, y - 6, 3, 5);
      ctx.fillStyle = P.hayPale; ctx.fillRect(x + 3, y - 8, 16, 2);
      ctx.fillStyle = P.hayLight; ctx.fillRect(x + 6, y - 9, 8, 1);
      ctx.fillStyle = P.outline;
      ctx.fillRect(x, y - 8, 22, 1); ctx.fillRect(x - 1, y - 7, 1, 7); ctx.fillRect(x + 22, y - 7, 1, 7);
    } else {
      /* a leaning length of spare timber */
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(-0.42);
      Coop.postH(ctx, 0, -8, 46, 8);
      ctx.restore();
    }
  }

  function groundShadow(ctx, a) {
    if (!a) return;
    var h = clamp((Coop.FLOOR - a.r * a.foot - a.y) / 40, 0, 1);
    var w = Math.round(a.r * (1.9 - h * 0.6));
    Tint.rect(ctx, Math.round(a.x - w / 2), Coop.FLOOR + 1, w, 3, Coop.P.void, Math.round(11 - h * 6));
  }

  function perchShadow(ctx, a) {
    if (!a || a.state !== 'perch' || !a.perch) return;
    var w = Math.round(a.r * 1.5);
    Tint.rect(ctx, Math.round(a.x - w / 2), Math.round(a.perch.y), w, 2, Coop.P.void, 11);
  }

  function drawChars(ctx) {
    /* cast is pre-sorted by role depth: walkers, then perchers, then flyers */
    for (var i = 0; i < cast.length; i++) drawActor(ctx, cast[i]);
  }

  function drawActor(ctx, a) {
    Doodads.draw(ctx, a.id, a.x, a.y, a.r, a.angle, a.flying());
  }

  function drawFg(ctx) {
    hot.length = 0;
    drawLogo(ctx);

    /* Menu boards, one per option, and each one a button: 32 tall rather
       than 22, which is 44 CSS px at the 1.389 fit a phone gets in
       landscape.

       The blinking marker and the chevron that flank the chosen row are
       keyboard-and-cursor only. On a phone the board IS the button and a lit
       board already says which one is chosen, so a pair of triangles
       pointing at it would be one thing too many on a screen whose whole
       rule is "tap the thing itself". On a computer they are what the arrow
       keys look like. */
    var bw = MENU_BW, bh = MENU_BH, bx = menuX();
    var m, by;
    for (m = 0; m < MENU.length; m++) {
      by = menuY(m);
      UI.button(ctx, hot, bx, by, bw, bh,
                { id: 'menu', i: m, a: 'confirm', label: MENU[m], lit: m === menuIndex });
      if (m === menuIndex && !UI.touch()) {
        UI.marker(ctx, bx - 12, by + bh / 2, t);
        UI.chevron(ctx, bx + bw + 12, by + bh / 2, -1, 4, UI.C.gold);
      }
    }

    /* HOW MANY BADGES ARE WAITING TO BE LOOKED AT.

       Earning an achievement mid-flight is announced where it happens, but
       the ones banked silently - on the way into this screen, or on the
       first boot after a save file turns out to have satisfied several
       already - have nothing to announce them, and a row the player has
       never seen is exactly what the doodad select's NEW tag is for. So the
       same tag, in the same colours, hung off the ACHIEVEMENTS board's
       top-right corner rather than inset into it: overhanging by 4px up and
       4px right, so the board keeps all 172px for its label and the tab
       cannot crowd the S. Drawn after the boards, which puts it on top of
       the lit board's gold rim where the 1px drop shadow reads.

       It is not a target. The board underneath it already is one, and a tag
       that could be pressed separately would be a second thing to press for
       the same destination. freshCount() is the length of a cached array, so
       asking every frame is free, and it drops as the achievements screen's
       exit() marks the rows it actually showed - the count here is honest
       the next time this screen is drawn. */
    var n = Achievements.freshCount();
    if (n > 0) {
      var tag = n + ' NEW';
      var tw = Font.measure(tag, 1) + 8;           /* 37 for '1 NEW', 43 for '12 NEW' */
      var tx = bx + bw + 4 - tw;
      by = menuY(ACHV_ROW) - 4;                    /* 216: overhanging the board's top edge */
      ctx.fillStyle = UI.C.shadow;   ctx.fillRect(tx + 1, by + 1, tw, 9);
      ctx.fillStyle = UI.C.goldDark; ctx.fillRect(tx, by, tw, 9);
      ctx.fillStyle = UI.C.gold;
      ctx.fillRect(tx, by, tw, 1); ctx.fillRect(tx, by + 8, tw, 1);
      ctx.fillRect(tx, by, 1, 9); ctx.fillRect(tx + tw - 1, by, 1, 9);
      UI.text(ctx, tag, tx + tw / 2, by + 1, { align: 'center', colour: UI.C.ink, shadow: null });
    }

    /* THE SOUND TOGGLE, and it is here because without it a phone cannot
       reach the sound at all.

       Mute has only ever been KeyM. The two places that said so - this
       screen's footer and the pause panel's key list - are both correctly
       suppressed on touch, because they list keys a phone does not have;
       but mute was INSIDE those lists and, unlike flying, moving and
       pausing, it never got a touch home to move to. So it did not just
       lose its signpost, it lost its only route.

       Drawn whenever something is POINTING, the same rule the BACK button
       and the scores screen's paging arrows follow: a cursor can use it too,
       and a keyboard that has never pointed keeps its footer and its M. The
       cursor's footer line drops M SOUND in exchange, because a key named
       underneath a button that does the same thing is the BACK-twice
       contradiction again; the keyboard's line keeps it, since that is the
       only place the key is still the only way. The
       label carries the state rather than the action, because that is what
       the toast has always said and a button that reads SOUND ON is only
       ambiguous until you have pressed it once. */
    if (Input.pointing()) {
      /* its base sits a little above the footer strip, which is drawn after
         it and on a cursor would otherwise smear its bottom border */
      UI.button(ctx, hot, 6, VH - 46, 68, 26,
                { id: 'sound', scale: 1,
                  label: Audio3.isMuted() ? 'SOUND OFF' : 'SOUND ON' });
    }

    /* arcade style hi-score readout in the corner */
    var best = Scores.table(Game.room(), Game.level())[0];
    if (best) {
      var hi = 'HI  ' + best.name + '  ' + best.score;
      var hw = Font.measure(hi, 1) + 10;
      UI.panel(ctx, VW - hw - 6, 5, hw, 13, { fill: UI.C.darker, edge: UI.C.inkFaint });
      UI.text(ctx, hi, VW - 11, 8, { align: 'right', colour: UI.C.gold });
    }

    /* Speech bubbles ride above their doodad.

       The doodads live on the smooth layer and move in fractions of a
       pixel; a bubble is pixel art and has to land on whole ones. Rounding
       the actor's position every frame meant a doodad merely BOBBING
       flipped the bubble back and forth between two columns - it moved on
       35% of frames while its owner was only breathing. So the bubble
       keeps its own position and only takes a new one when the doodad has
       genuinely gone somewhere (2px), which leaves the rise as the only
       motion in it. */
    var ga = ctx.globalAlpha;
    for (var i = 0; i < bubbles.length; i++) {
      var b = bubbles[i];
      var a = b.actor;
      /* an actor off the side of the stage has no bubble to show: both it
         and the doodad belong off screen, and only one of them can be
         clamped back on */
      if (a.x < -20 || a.x > VW + 20 || b.sx === undefined) continue;
      /* and it stays on the screen even when its doodad is at the edge.
         sx/sy, not bx/by: those two names belong to the menu boards at the
         top of this same function, and `var` is function-scoped, so the
         bubble loop was quietly overwriting them. Harmless while nothing
         after the loop read them - the NEW tab above reads bx. */
      var sx = clamp(Math.round(b.sx), 1, VW - 13);
      var sy = Math.round(b.sy - (1.2 - b.life) * 6);
      /* fade rather than strobe: the old blink ran at 12Hz, which on a
         bubble this small read as a fault */
      ctx.globalAlpha = ga * clamp(b.life / 0.3, 0, 1);
      drawBubble(ctx, sx, sy, b.symbol);
    }
    ctx.globalAlpha = ga;

    /* footer. It said "◀ ▶ MOVE", which was wrong on every input the game
       has - this menu is a column and always has been - and on a phone it
       repeated the boards as words directly underneath them, so UI.footer
       leaves it out there entirely. */
    UI.footer(ctx, '▲ ▼ CHOOSE   ENTER SELECT   M SOUND   F FULLSCREEN',
                   'CLICK A BOARD   F FULLSCREEN');
  }

  function drawLogo(ctx) {
    var s = 5;
    var y1 = 26 + Math.round(Math.sin(t * 1.2) * 1);
    var y2 = y1 + 40;
    /* LAND OF / DOODADS, with the lower third of every letter shaded */
    logoLine(ctx, 'LAND OF', VW / 2, y1, s, t * 1.6);
    logoLine(ctx, 'DOODADS', VW / 2, y2, s, t * 1.6 + 1.2);
    UI.text(ctx, 'A BACKYARD ADVENTURE', VW / 2, y2 + 40,
            { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow, spacing: 3 });
  }

  function logoLine(ctx, str, x, y, s, wave) {
    Font.draw(ctx, str, x, y, { scale: s, align: 'center', colour: UI.C.shadow,
                                wave: wave, waveAmp: 0.6, outline: UI.C.shadow, outlineWidth: 1 });
    Font.draw(ctx, str, x, y, { scale: s, align: 'center', colour: UI.C.gold, wave: wave, waveAmp: 0.6 });
    /* two-tone shading on the bottom rows of each glyph */
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, y + Math.round(s * 4.2), VW, s * 3);
    ctx.clip();
    Font.draw(ctx, str, x, y, { scale: s, align: 'center', colour: UI.C.goldDark, wave: wave, waveAmp: 0.6 });
    ctx.restore();
  }

  function drawBubble(ctx, x, y, symbol) {
    var w = 11, h = 11;
    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
    ctx.fillStyle = UI.C.ink;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x, y, 1, 1); ctx.fillRect(x + w - 1, y, 1, 1);
    ctx.fillRect(x, y + h - 1, 1, 1); ctx.fillRect(x + w - 1, y + h - 1, 1, 1);
    /* tail */
    ctx.fillStyle = UI.C.ink;
    ctx.fillRect(x + 2, y + h, 3, 1);
    ctx.fillRect(x + 2, y + h + 1, 2, 1);
    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x + 1, y + h, 1, 2);
    ctx.fillRect(x + 4, y + h + 1, 2, 1);
    Font.draw(ctx, symbol, x + 3, y + 2, { scale: 1, colour: UI.C.shadow });
  }

  return { enter: enter, refresh: refresh, update: update,
           drawBg: drawBg, drawChars: drawChars, drawFg: drawFg,
           targets: function () { return hot; } };
})();
