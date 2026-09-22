/* ------------------------------------------------------------------
   Land of Doodads - doodad select
   Five stalls in a row under one rail, standing on one floor plank.
   The chosen one is lit up and showing off; the ones that have not been
   earned yet are boarded over, with the price nailed to the plate and
   something large and asleep still visible between the boards.
   Traits and abilities are still being hatched.

   Nothing on the pixel layers moves. The old version slid the selected
   panel sideways by 10px on every keypress, and that panel is filled
   with a dither: Dither.rect paints with a pattern anchored in user
   space, so moving the rect re-phases the Bayer grid against it and the
   stall boils for a fifth of a second. Selection motion lives on the
   smooth sprite layer instead, where it is free.
------------------------------------------------------------------ */
'use strict';

var CharSelectScene = (function () {

  var SW = 82, SH = 104;          /* an unselected stall               */
  var SX0 = 11, PITCH = 94;       /* 5*82 + 4*12 = 458, 11px each side */
  var STALL_FLOOR = 158;          /* every stall's bottom edge         */
  var GROW_W = 8, GROW_H = 10;    /* the selected one, grown upward    */
  var CRATE_Y = 130;              /* crate lid: every doodad stands here */
  var PLATE_Y = 144;
  var RAIL_Y = 38, RAIL_H = 6;
  var CARD_Y = 168;
  var POP_T = 0.22, FLASH_T = 0.08, DENY_T = 0.35;
  var BOARD_H = 10, BOARD_Y = [62, 90, 118];

  var t = 0, scroll = 0;
  var index = 0;
  var bob = [], flapTimer = [], flapCooldown = [], pop = [];
  var flashTimer = 0, denyFlash = 0;
  var best = 0;                   /* cached: never read the save in a draw call */
  var fresh = [];                 /* ids unlocked since the player last looked */

  function unlocked(i) { return Doodads.isUnlocked(Doodads.list[i], best); }

  /* ------------------------------------------------------- lifecycle */

  function enter() {
    t = 0; flashTimer = 0; denyFlash = 0;
    scroll = 0;
    best = Doodads.bestReached();

    index = Doodads.indexOf(Game.selection.doodad);
    if (!unlocked(index)) {
      index = Doodads.indexOf(Doodads.firstUnlocked());
      Game.selection.doodad = Doodads.list[index].id;
      Save.set('doodad', Game.selection.doodad);
    }

    bob = []; flapTimer = []; flapCooldown = []; pop = [];
    for (var i = 0; i < Doodads.list.length; i++) {
      bob.push(rand(0, TAU));
      flapTimer.push(0);
      flapCooldown.push(rand(0.6, 2.4));
      pop.push(0);
    }

    markFresh();
    if (fresh.length) {
      index = Doodads.indexOf(fresh[0]);
      pop[index] = POP_T;
      Audio3.play('select');
    }
  }

  /* anything earned since the player last looked gets a NEW tab - without
     it the boards read as permanent scenery and nobody ever finds out
     they came off */
  function markFresh() {
    var seen = Save.get('seen', []);
    if (!Array.isArray(seen)) seen = [];
    fresh = [];
    for (var k = 0; k < Doodads.list.length; k++) {
      var dd = Doodads.list[k];
      /* only something that had to be earned can be new - the starting
         three were never unlocked, they were always standing here */
      if (dd.unlockAt && unlocked(k) && seen.indexOf(dd.id) < 0) fresh.push(dd.id);
    }
  }

  /* The unlock state can change while this scene is live - the master
     passkey can be typed right here. Game calls this so we can look
     again, rather than us re-reading the save on every frame. */
  function refresh() {
    best = Doodads.bestReached();
    markFresh();
    for (var i = 0; i < fresh.length; i++) pop[Doodads.indexOf(fresh[i])] = POP_T;
  }

  /* the NEW tab comes off a stall once the player has actually looked at it */
  function clearNew(i) {
    var id = Doodads.list[i].id;
    var at = fresh.indexOf(id);
    if (at < 0) return;
    fresh.splice(at, 1);
    var seen = Save.get('seen', []);
    if (!Array.isArray(seen)) seen = [];
    if (seen.indexOf(id) < 0) { seen.push(id); Save.set('seen', seen); }
  }

  function move(dir) {
    var next = index + dir;
    if (next < 0 || next >= Doodads.list.length) {
      Audio3.play('deny');
      Screen.shake(1.2, 0.16);
      return;
    }
    index = next;
    flashTimer = FLASH_T;
    denyFlash = 0;
    clearNew(index);
    if (unlocked(index)) {
      pop[index] = POP_T;
      flapTimer[index] = 0.3;
      flapCooldown[index] = rand(0.8, 2.2);
    }
    Audio3.play('move');
  }

  function update(dt) {
    t += dt;
    scroll += 7 * dt;

    for (var i = 0; i < Doodads.list.length; i++) {
      if (pop[i] > 0) pop[i] -= dt;
      if (!unlocked(i)) continue;      /* a boarded stall never chirps */
      flapTimer[i] -= dt;
      flapCooldown[i] -= dt;
      if (flapCooldown[i] <= 0) {
        flapCooldown[i] = (i === index) ? rand(1.1, 2.4) : rand(2.5, 5);
        flapTimer[i] = 0.3;
        if (i === index) Audio3.play('chirp');
      }
    }
    if (flashTimer > 0) flashTimer -= dt;
    if (denyFlash > 0) denyFlash -= dt;

    if (Game.locked()) return;
    if (Input.nav('left')) move(-1);
    if (Input.nav('right')) move(1);
    if (Input.hit('confirm')) {
      if (!unlocked(index)) {
        /* refuse in place: the reason is already the biggest line on the
           card, so flash that rather than throwing a toast over it */
        Audio3.play('deny');
        Screen.shake(1.4, 0.2);
        denyFlash = DENY_T;
      } else {
        clearNew(index);
        Game.selection.doodad = Doodads.list[index].id;
        Save.set('doodad', Game.selection.doodad);
        Audio3.play('start');
        Game.go(PlayScene, {});
      }
    }
    if (Input.hit('back')) {
      Audio3.play('back');
      Game.go(LevelSelectScene, { focus: 'level' });
    }
  }

  /* -------------------------------------------------------- drawing */

  /* the one layout function; drawBg, drawChars and drawFg all use it, so
     a sprite and its crate can never disagree about where the stall is */
  function stall(i) {
    var sel = i === index;
    var x = SX0 + i * PITCH, w = SW, y = STALL_FLOOR - SH, h = SH;
    if (sel) { x -= GROW_W / 2; w += GROW_W; y -= GROW_H; h += GROW_H; }
    return { x: x, y: y, w: w, h: h, cx: x + (w >> 1), sel: sel };
  }

  function openCount() {
    var n = 0;
    for (var i = 0; i < Doodads.list.length; i++) if (unlocked(i)) n++;
    return n;
  }

  function drawBg(ctx) {
    Coop.drawMenuBackdrop(ctx, scroll);

    var P = Coop.P, i, s;

    /* the rail the whole row hangs from */
    ctx.fillStyle = P.beamMid;   ctx.fillRect(6, RAIL_Y, 468, RAIL_H);
    ctx.fillStyle = P.beamLight; ctx.fillRect(7, RAIL_Y + 1, 466, 1);
    ctx.fillStyle = P.beamDark;  ctx.fillRect(7, RAIL_Y + 4, 466, 1);
    ctx.fillStyle = P.outline;
    ctx.fillRect(6, RAIL_Y, 468, 1); ctx.fillRect(6, RAIL_Y + RAIL_H - 1, 468, 1);
    ctx.fillRect(6, RAIL_Y, 1, RAIL_H); ctx.fillRect(473, RAIL_Y, 1, RAIL_H);
    UI.nail(ctx, 10, RAIL_Y + 1); UI.nail(ctx, 468, RAIL_Y + 1);

    /* the four dividing posts, behind the stalls so a grown one can sit
       flush against the timber */
    for (i = 0; i < 4; i++) {
      var px = SX0 + 86 + i * PITCH;
      ctx.fillStyle = P.beamMid;   ctx.fillRect(px, 44, 4, 114);
      ctx.fillStyle = P.beamLight; ctx.fillRect(px, 44, 1, 114);
      ctx.fillStyle = P.outline;   ctx.fillRect(px + 3, 44, 1, 114);
      UI.nail(ctx, px, RAIL_Y + 1);
    }

    for (i = 0; i < Doodads.list.length; i++) {
      var d = Doodads.list[i];
      s = stall(i);
      var open = unlocked(i);

      /* the wall showing between rail and stall above an unselected bay.
         flat, not dithered: the backdrop scrolls underneath it */
      if (!s.sel) Tint.rect(ctx, s.x, 44, s.w, 10, UI.C.darker, 10);

      /* stall panel. all five hold perfectly still, so dither is safe */
      UI.panel(ctx, s.x, s.y, s.w, s.h, {
        fill: s.sel ? (open ? '#211710' : '#1a120b') : (open ? '#181008' : '#130c06'),
        dither: s.sel ? (open ? 3 : 5) : (open ? 8 : 10),
        edge: s.sel ? (flashTimer > 0 ? UI.C.ink
                      : (open ? UI.C.gold : (denyFlash > 0 ? UI.C.red : UI.C.inkDim)))
                    : UI.C.inkFaint,
        corner: s.sel ? (flashTimer > 0 ? UI.C.ink
                        : (open ? UI.C.gold : (denyFlash > 0 ? UI.C.red : UI.C.inkDim)))
                      : null
      });

      /* a shaft of light on the chosen one - grey on a boarded stall, so
         the boards cut across it and light leaks between them */
      if (s.sel) {
        for (var y = 0; y < 85; y++) {
          var k = y / 85;
          /* forced even, so cx - w/2 is always a whole pixel */
          var w = 2 * Math.round(7 + k * 28);
          Dither.rect(ctx, s.cx - (w >> 1), 45 + y, w, 1,
                      open ? d.accentLight : UI.C.inkFaint,
                      open ? Math.max(1, Math.round(3 - k * 2)) : Math.max(1, Math.round(2 - k)));
        }
      }

      /* crate to stand on, and the shadow it catches */
      crate(ctx, s.cx, CRATE_Y, s.sel ? 56 : 44, s.sel && open);
      var sr = s.sel ? 25 : 18;
      Dither.rect(ctx, Math.round(s.cx - sr * 0.7), CRATE_Y + 1,
                  Math.round(sr * 1.4), 3, UI.C.shadow, 12);

      /* name plate across the bottom of the stall; a boarded one never
         goes gold, whatever the cursor is doing */
      Dither.rect(ctx, s.x + 1, PLATE_Y, s.w - 2, 13, UI.C.darker, 15);
      ctx.fillStyle = (s.sel && open) ? UI.C.gold : UI.C.inkFaint;
      ctx.fillRect(s.x + 1, PLATE_Y, s.w - 2, 1);
    }

    /* the floor plank the whole row stands on */
    ctx.fillStyle = P.beamMid;   ctx.fillRect(6, 158, 468, 7);
    ctx.fillStyle = P.beamLight; ctx.fillRect(7, 159, 466, 1);
    ctx.fillStyle = P.beamDark;  ctx.fillRect(7, 163, 466, 1);
    ctx.fillStyle = P.outline;
    ctx.fillRect(6, 158, 468, 1); ctx.fillRect(6, 164, 468, 1);
    ctx.fillRect(6, 158, 1, 7); ctx.fillRect(473, 158, 1, 7);
    for (i = 0; i < 4; i++) { ctx.fillStyle = P.outline; ctx.fillRect(SX0 + 87 + i * PITCH, 159, 1, 5); }
    /* flat: the menu floor scrolls under this one */
    Tint.rect(ctx, 6, 165, 468, 2, UI.C.shadow, 9);
  }

  function crate(ctx, cx, y, w, lit) {
    var x = Math.round(cx - w / 2), h = 13;
    y = Math.round(y);
    ctx.fillStyle = Coop.P.beamMid; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = Coop.P.beamLight; ctx.fillRect(x + 1, y + 1, w - 2, 2);
    ctx.fillStyle = Coop.P.beamDark; ctx.fillRect(x + 1, y + h - 3, w - 2, 2);
    ctx.fillStyle = Coop.P.outline;
    ctx.fillRect(x, y, w, 1); ctx.fillRect(x, y + h - 1, w, 1);
    ctx.fillRect(x, y, 1, h); ctx.fillRect(x + w - 1, y, 1, h);
    for (var i = x + 7; i < x + w - 4; i += 9) {
      ctx.fillStyle = Coop.P.beamDark; ctx.fillRect(i, y + 2, 1, h - 4);
    }
    UI.nail(ctx, x + 3, y + 3); UI.nail(ctx, x + w - 5, y + 3);
    if (lit) { ctx.fillStyle = Coop.P.beamHi; ctx.fillRect(x + 2, y + 1, w - 4, 1); }
  }

  function drawChars(ctx) {
    for (var i = 0; i < Doodads.list.length; i++) {
      var d = Doodads.list[i];
      var s = stall(i);
      var open = unlocked(i);
      var r = s.sel ? 25 : 18;
      var amp = open ? (s.sel ? 2.4 : 1.4) : 0.8;      /* a shut one barely stirs */
      var b = Math.sin(t * 2.3 + bob[i]) * amp;
      var fly = open && flapTimer[i] > 0;
      var lift = fly ? -3 : 0;
      /* the whole of the selection animation: a 5px hop on the smooth
         layer, so no pixel-layer geometry moves when the cursor does */
      var hop = (open && pop[i] > 0)
              ? -Math.round(Math.sin((1 - pop[i] / POP_T) * Math.PI) * 5) : 0;
      var y = CRATE_Y - r * d.sprite.footOffset + b + lift + hop;
      var tilt = Math.sin(t * 1.7 + bob[i]) * 0.04 + (fly ? -0.06 : 0);
      Doodads.draw(ctx, d.id, s.cx, y, r, tilt, fly,
                   open ? (s.sel ? null : { alpha: 0.85 }) : { alpha: 0.55 });
    }
  }

  function drawFg(ctx) {
    var d = Doodads.list[index];
    var open = unlocked(index);
    var r = Levels.rooms[Game.selection.room];
    var lv = r.levels[Game.selection.level];

    UI.heading(ctx, 'CHOOSE YOUR DOODAD', VW / 2, 10, 2, { colour: UI.C.gold });
    UI.text(ctx, r.name + '  ·  ' + lv.name, VW / 2, 28, { align: 'center', colour: UI.C.inkDim });
    var n = openCount();
    if (n < Doodads.list.length) {
      UI.text(ctx, n + ' OF ' + Doodads.list.length, VW - 10, 12,
              { align: 'right', colour: UI.C.inkFaint });
    }

    /* per stall: the boards go on before the plate text, so nothing dims it */
    for (var i = 0; i < Doodads.list.length; i++) {
      var s = stall(i);
      var dd = Doodads.list[i];
      if (!unlocked(i)) drawBoards(ctx, s, dd);
      else if (fresh.indexOf(dd.id) >= 0) drawNewTab(ctx, s);
      if (unlocked(i)) {
        UI.text(ctx, dd.name, s.cx, 147, { align: 'center', colour: s.sel ? UI.C.gold : UI.C.inkDim });
      } else {
        UI.text(ctx, 'SCORE ' + dd.unlockAt, s.cx, 147,
                { align: 'center', colour: s.sel ? UI.C.inkDim : UI.C.inkFaint });
      }
    }

    /* the card. flat tint: the menu backdrop scrolls behind it */
    Tint.rect(ctx, 0, CARD_Y, VW, 86, UI.C.darker, 12);
    UI.rule(ctx, 40, CARD_Y, VW - 80, UI.C.inkFaint);

    /* chevrons at a fixed x, so they do not twitch as names change width */
    UI.chevron(ctx, 150 - arrowBob(), 184, -1, 6, index > 0 ? UI.C.gold : UI.C.inkFaint);
    UI.chevron(ctx, 330 + arrowBob(), 184, 1, 6,
               index < Doodads.list.length - 1 ? UI.C.gold : UI.C.inkFaint);

    if (open) drawOpenCard(ctx, d, r, lv);
    else drawLockedCard(ctx, d);

    ctx.fillStyle = UI.C.darker;
    ctx.fillRect(0, VH - 13, VW, 13);
    ctx.fillStyle = UI.C.inkFaint;
    ctx.fillRect(0, VH - 13, VW, 1);
    UI.text(ctx, open ? UI.forInput('◀ ▶ PICK    ENTER FLY    ESC LEVELS',
                                    '◀ ▶ PICK    CLICK FLY    ESC LEVELS',
                                    '◀ ▶ PICK    TAP TO FLY    BACK')
                      : UI.forInput('◀ ▶ PICK    LOCKED    ESC LEVELS',
                                    '◀ ▶ PICK    LOCKED    ESC LEVELS',
                                    '◀ ▶ PICK    LOCKED    BACK'),
            VW / 2, VH - 10, { align: 'center', colour: UI.C.inkDim });
  }

  function drawOpenCard(ctx, d, r, lv) {
    UI.heading(ctx, d.name, VW / 2, 174, 3, { colour: d.accentLight });
    UI.text(ctx, d.tagline, VW / 2, 198, { align: 'center', colour: UI.C.gold, spacing: 2 });
    /* a doodad whose ability actually does something says what it does,
       in place of its second line of flavour */
    var blurb = (d.abilityLive && d.abilityAbout) ? d.abilityAbout : d.about;
    UI.text(ctx, blurb[0], VW / 2, 210, { align: 'center', colour: UI.C.inkDim });
    UI.text(ctx, blurb[1], VW / 2, 219, { align: 'center', colour: UI.C.inkDim });

    var pb = Scores.personalBest(r, lv, d.id);
    var bestText = pb > 0 ? '★ BEST ' + pb : '★ NO RUNS YET';
    var abilityText = 'ABILITY: ' + d.ability;
    var live = !!d.abilityLive;
    var gap = 22;
    var rowW = Font.measure(bestText, 1) + gap + 13 + Font.measure(abilityText, 1);
    var ax = Math.round(VW / 2 - rowW / 2);
    UI.text(ctx, bestText, ax, 232, { colour: pb > 0 ? UI.C.gold : UI.C.inkFaint });
    ax += Font.measure(bestText, 1) + gap;
    if (live) {
      /* a star, not a padlock: the padlock here means "not built yet" */
      UI.text(ctx, '★', ax + 4, 232, { colour: d.accentLight });
    } else {
      UI.padlock(ctx, ax + 4, 235, 1, UI.C.inkFaint);
    }
    UI.text(ctx, abilityText, ax + 13, 232,
            { colour: live ? d.accentLight : UI.C.inkFaint });
  }

  function drawLockedCard(ctx, d) {
    var hot = denyFlash > 0;
    UI.padlock(ctx, 190, 184, 2, hot ? UI.C.red : UI.C.inkDim);
    UI.heading(ctx, '? ? ?', 257, 174, 3, { colour: UI.C.inkDim });
    UI.text(ctx, 'SCORE ' + d.unlockAt + ' TO UNLOCK', VW / 2, 198,
            { align: 'center', spacing: 2, colour: hot ? UI.C.red : UI.C.gold });
    UI.text(ctx, d.lockedAbout[0], VW / 2, 210, { align: 'center', colour: UI.C.inkDim });
    UI.text(ctx, d.lockedAbout[1], VW / 2, 219, { align: 'center', colour: UI.C.inkDim });

    /* how far off it is. fixed x on every part, so the numbers growing a
       digit can never shove the bar sideways */
    var need = d.unlockAt, p = clamp(best / need, 0, 1);
    UI.text(ctx, 'BEST ' + best, 154, 232, { align: 'right', colour: UI.C.inkDim });
    ctx.fillStyle = UI.C.inkFaint; ctx.fillRect(160, 232, 160, 7);
    ctx.fillStyle = UI.C.darker;   ctx.fillRect(161, 233, 158, 5);
    var fw = Math.round(158 * p);
    if (fw > 0) {
      ctx.fillStyle = UI.C.goldDark; ctx.fillRect(161, 233, fw, 5);
      ctx.fillStyle = UI.C.gold;     ctx.fillRect(161, 233, fw, 1);
    }
    UI.text(ctx, 'NEED ' + need, 326, 232, { colour: UI.C.inkDim });
  }

  /* boards nailed across a stall that has not been earned. drawn on the
     foreground layer, which sits above the smooth sprite canvas, so they
     genuinely occlude the doodad asleep behind them. */
  function drawBoards(ctx, s, d) {
    var P = Coop.P;
    /* sink the sprite back. flat, not dithered - it bobs underneath */
    Tint.rect(ctx, s.x + 1, s.y + 1, s.w - 2, CRATE_Y - (s.y + 1), '#0d0805', 6);

    var rows = s.sel ? [46].concat(BOARD_Y) : BOARD_Y;
    for (var i = 0; i < rows.length; i++) {
      var by = rows[i], bx = s.x - 2, bw = s.w + 4;
      ctx.fillStyle = P.beamMid;   ctx.fillRect(bx, by, bw, BOARD_H);
      ctx.fillStyle = P.beamLight; ctx.fillRect(bx + 1, by + 1, bw - 2, 2);
      ctx.fillStyle = P.beamDark;  ctx.fillRect(bx + 1, by + 7, bw - 2, 2);
      ctx.fillStyle = P.outline;
      ctx.fillRect(bx, by, bw, 1); ctx.fillRect(bx, by + BOARD_H - 1, bw, 1);
      ctx.fillRect(bx, by, 1, BOARD_H); ctx.fillRect(bx + bw - 1, by, 1, BOARD_H);
      UI.nail(ctx, bx + 4, by + 3); UI.nail(ctx, bx + bw - 6, by + 3);
    }

    /* the padlock straddles the middle board like a real hasp */
    UI.padlock(ctx, s.cx, 94, s.sel ? 2 : 1,
               (s.sel && denyFlash > 0) ? UI.C.red : (s.sel ? UI.C.ink : UI.C.inkDim));
  }

  function drawNewTab(ctx, s) {
    var x = s.x + s.w - 26, y = s.y + 3;
    ctx.fillStyle = UI.C.goldDark; ctx.fillRect(x, y, 23, 9);
    ctx.fillStyle = UI.C.gold;
    ctx.fillRect(x, y, 23, 1); ctx.fillRect(x, y + 8, 23, 1);
    ctx.fillRect(x, y, 1, 9); ctx.fillRect(x + 22, y, 1, 9);
    UI.text(ctx, 'NEW', x + 11, y + 1, { align: 'center', colour: UI.C.ink, shadow: null });
  }

  function arrowBob() { return Math.round((Math.sin(t * 5) + 1) * 0.5 + 0.2); }

  return { enter: enter, refresh: refresh, update: update,
           drawBg: drawBg, drawChars: drawChars, drawFg: drawFg };
})();
