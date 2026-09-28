/* ------------------------------------------------------------------
   Land of Doodads - high scores
   The top ten for each playable level, a little doodad beside every
   entry, and each doodad's personal best along the bottom. X resets a
   level's table back to the doodads' own starting scores.
------------------------------------------------------------------ */
'use strict';

var ScoresScene = (function () {

  var t = 0, scroll = 0;
  var list = [];               /* playable {room, level} pairs */
  var index = 0;
  var slide = 0;
  var confirming = false;

  var PX = 70, PW = 340, PY = 48, PH = 190;
  var ROW0 = 66, ROWH = 17;

  /* The rectangles this screen drew, refilled inside drawFg and handed to
     Input by Game.render. The pair of triangles that used to sit either side
     of the level's name were the title screen's selection marker glyph
     meaning something else entirely, and the controls that actually paged the
     table were two pads in the opposite corner. Now the triangle IS the
     control, it sits in a raised pad beside the table it pages, and there is
     nothing else on the screen a tap can land on. */
  var hot = [];

  function current() { return list[index]; }

  function enter() {
    t = 0;
    list = Levels.playable();
    index = 0;
    /* open on whichever level was played last */
    for (var i = 0; i < list.length; i++) {
      if (list[i].roomIndex === Game.selection.room && list[i].levelIndex === Game.selection.level) index = i;
    }
    slide = 0;
    confirming = false;
  }

  function update(dt) {
    t += dt;
    scroll += 7 * dt;
    slide = damp(slide, 0, 0.0005, dt);
    if (Game.locked()) return;

    if (confirming) {
      /* KEEP carries no action of its own - a button that undoes something
         should not share a key with the button that does it - so it is read
         here. RESET carries a:'confirm' and falls into the line below, the
         same one ENTER uses. */
      var tgc = Input.tapped();
      if (tgc && tgc.id === 'keep') { confirming = false; Audio3.play('move'); return; }
      if (Input.hit('confirm')) {
        Scores.erase(current().room, current().level);
        confirming = false;
        Audio3.play('back');
        Game.toast('TABLE RESET');
      } else if (Input.hit('back')) {
        confirming = false;
        Audio3.play('move');
      }
      return;
    }

    /* the side pads carry a:'left' / a:'right' and fall straight into the
       paging code below, so only BACK needs a word here */
    var tg = Input.tapped();
    if (tg && tg.id === 'back') { Audio3.play('back'); Game.go(TitleScene, { menu: 1 }); return; }

    if (Input.nav('left') || Input.nav('right')) {
      if (list.length < 2) { Audio3.play('deny'); Screen.shake(1.2, 0.16); }
      else {
        var dir = Input.nav('left') ? -1 : 1;
        index = (index + dir + list.length) % list.length;
        slide = dir * 24;
        Audio3.play('move');
      }
    }
    if (Input.hit('erase')) { confirming = true; Audio3.play('pause'); }
    if (Input.hit('back') || Input.hit('confirm')) { Audio3.play('back'); Game.go(TitleScene, { menu: 1 }); }
  }

  /* -------------------------------------------------------- drawing */

  function rowY(i) { return ROW0 + i * ROWH; }

  function drawBg(ctx) {
    Coop.drawMenuBackdrop(ctx, scroll);

    var c = current();
    if (!c) return;
    var x = PX + Math.round(slide), rows = Scores.table(c.room, c.level);

    UI.panel(ctx, x, PY, PW, PH, { fill: '#1b120a', edge: UI.C.inkFaint, corner: UI.C.gold });
    UI.text(ctx, 'RANK', x + 10, PY + 6, { colour: UI.C.inkFaint });
    UI.text(ctx, 'NAME', x + 48, PY + 6, { colour: UI.C.inkFaint });
    UI.text(ctx, 'DOODAD', x + 96, PY + 6, { colour: UI.C.inkFaint });
    UI.text(ctx, 'SCORE', x + PW - 12, PY + 6, { align: 'right', colour: UI.C.inkFaint });
    UI.rule(ctx, x + 8, PY + 15, PW - 16, UI.C.inkFaint);

    for (var i = 0; i < Scores.SIZE; i++) {
      var y = rowY(i), e = rows[i];
      var colour = Scores.rankColour(i);
      if (i % 2 === 0) { ctx.fillStyle = '#22170d'; ctx.fillRect(x + 3, y - 2, PW - 6, ROWH - 1); }
      UI.text(ctx, Scores.ordinal(i), x + 10, y + 4, { colour: e ? colour : UI.C.inkFaint });
      if (!e) {
        UI.text(ctx, '- - -', x + 48, y + 4, { colour: UI.C.inkFaint });
        UI.text(ctx, '-', x + PW - 12, y + 4, { align: 'right', colour: UI.C.inkFaint });
        continue;
      }
      UI.text(ctx, e.name.replace(/ /g, '_'), x + 48, y, { scale: 2, colour: colour, shadow: UI.C.shadow });
      var d = e.doodad && Doodads.get(e.doodad);
      UI.text(ctx, d ? d.name : '?', x + 108, y + 4, { colour: d ? d.accentLight : UI.C.inkFaint });
      UI.text(ctx, String(e.score), x + PW - 12, y, { align: 'right', scale: 2, colour: colour, shadow: UI.C.shadow });
      if (i === 0) UI.text(ctx, '★', x + 38, y + 4, { colour: UI.C.gold });
    }
  }

  /* the doodads themselves stay smooth, so they ride the sharp layer */
  function drawChars(ctx) {
    var c = current();
    if (!c) return;
    var x = PX + Math.round(slide), rows = Scores.table(c.room, c.level);
    for (var i = 0; i < rows.length; i++) {
      var d = rows[i].doodad && Doodads.get(rows[i].doodad);
      if (!d) continue;
      var lead = i === 0;
      var bob = lead ? Math.sin(t * 3) * 1.2 : 0;
      var flap = lead && Math.sin(t * 3) > 0.6;
      /* at his own size, like everywhere else he stands in a line with the
         others: a row of these is a row of doodads, not a row of icons */
      Doodads.draw(ctx, d.id, x + 99, rowY(i) + 6 + bob, 5.2 * (d.size || 1), 0, flap);
    }
  }

  function drawFg(ctx) {
    hot.length = 0;
    var c = current();
    /* The bests row, and on a keyboard the key hints under it. A phone gets
       no hint line at all - UI.footer leaves it out - so the strip shrinks to
       the one row of content that is not a caption for a button. */
    var strip = UI.touch() ? 18 : 28;
    ctx.fillStyle = UI.C.darker;
    ctx.fillRect(0, VH - strip, VW, strip);
    ctx.fillStyle = UI.C.inkFaint;
    ctx.fillRect(0, VH - strip, VW, 1);

    UI.heading(ctx, 'HIGH SCORES', VW / 2, 8, 2, { colour: UI.C.gold });

    /* The way back, and the two that page the table. Only drawn once
       something is pointing, the same rule the pads follow; a keyboard has
       ◀ ▶ and ESC and does not need them taking up the room. */
    if (Input.pointing() && !confirming) {
      UI.button(ctx, hot, 6, 4, 44, 32, { id: 'back', label: 'BACK', scale: 1 });
      if (list.length > 1) {
        UI.button(ctx, hot, 26, 122, 36, 44, { id: 'prev', a: 'left', label: '◀' });
        UI.button(ctx, hot, VW - 62, 122, 36, 44, { id: 'next', a: 'right', label: '▶' });
      }
    }

    if (c) {
      var label = c.room.name + '  ·  ' + c.level.name;
      UI.text(ctx, label, VW / 2, 30, { align: 'center', colour: UI.C.ink });

      /* The one screen in the game where both arrow vocabularies could show
         at once: the two paging buttons above are drawn the moment anything
         points, and these say the same thing for the arrow KEYS. So they
         are drawn only when nothing is pointing - never a loose triangle
         beside a pressable one doing the same job. */
      if (!Input.pointing()) {
        var half = Font.measure(label, 1) / 2;
        var live = list.length > 1 ? UI.C.gold : UI.C.inkFaint;
        UI.chevron(ctx, VW / 2 - half - 10, 33, -1, 4, live);
        UI.chevron(ctx, VW / 2 + half + 10, 33, 1, 4, live);
      }

      /* Each doodad's own best on this level, plus a count of the ones
         still boarded up. Only the earned ones are named: the row was
         sized for three and five of them overflow the 480px screen, and
         a locked doodad's personal best is always a dash anyway. */
      var best = Doodads.bestReached();
      var shut = 0;
      var parts = [];
      Doodads.list.forEach(function (d) {
        if (!Doodads.isUnlocked(d, best)) { shut++; return; }
        var pb = Scores.personalBest(c.room, c.level, d.id);
        parts.push({ d: d, pb: pb, text: d.name + ' ' + (pb > 0 ? pb : '-') });
      });

      /* The row gives way in stages rather than running off the edge, in
         the order of what it can most afford to lose. Closing the gap up
         carried it to five doodads and had bottomed out at seven, where it
         filled the screen to both edges with nothing to spare - and the
         art folder has four more in it. */
      var BUDGET = VW - 20, by = UI.touch() ? VH - 12 : VH - 24;
      var gap = 16, label = true, show = parts, hidden = 0;
      var tail = function () { return hidden ? '+' + hidden : ''; };
      var measure = function () {
        var w = label ? Font.measure('BESTS', 1) : -gap;
        show.forEach(function (p) { w += gap + Font.measure(p.text, 1); });
        if (hidden) w += gap + Font.measure(tail(), 1);
        if (shut) w += gap + 13 + Font.measure(shut + ' LOCKED', 1);
        return w;
      };
      while (gap > 6 && measure() > BUDGET) gap -= 2;
      /* 1. the label goes first; it is the word that says least */
      if (measure() > BUDGET) label = false;
      /* 2. then the ones with nothing to report, counted instead - a row
            of dashes is the least information on the line */
      while (measure() > BUDGET) {
        var idx = -1;
        for (var q = 0; q < show.length; q++) if (show[q].pb <= 0) { idx = q; break; }
        if (idx < 0) break;
        show = show.slice(0, idx).concat(show.slice(idx + 1));
        hidden++;
      }
      /* 3. and if even the scoring ones will not fit, the lowest of them */
      while (measure() > BUDGET && show.length > 1) { show = show.slice(0, -1); hidden++; }

      var bx = Math.round(VW / 2 - measure() / 2);
      if (label) { UI.text(ctx, 'BESTS', bx, by, { colour: UI.C.inkFaint }); bx += Font.measure('BESTS', 1) + gap; }
      show.forEach(function (p) {
        UI.text(ctx, p.text, bx, by, { colour: p.d.accentLight });
        bx += Font.measure(p.text, 1) + gap;
      });
      if (hidden) {
        UI.text(ctx, tail(), bx, by, { colour: UI.C.inkFaint });
        bx += Font.measure(tail(), 1) + gap;
      }
      if (shut) {
        UI.padlock(ctx, bx + 4, by + 3, 1, UI.C.inkFaint);
        UI.text(ctx, shut + ' LOCKED', bx + 13, by, { colour: UI.C.inkFaint });
      }
    }

    /* drawn over the bottom 13px of the strip above, and not at all on a
       phone - where the arrows and the way back are buttons you can press */
    UI.footer(ctx, '◀ ▶ LEVEL    X RESET TABLE    ESC BACK',
                   '◀ ▶ LEVEL    X RESET TABLE    ESC BACK');

    if (confirming && c) {
      UI.scrim(ctx, 10);
      var w = 236, h = 100, x = (VW - w) / 2, y = (VH - h) / 2;
      UI.board(ctx, x, y, w, h, { highlight: UI.C.red });
      UI.text(ctx, 'RESET ' + c.level.name + '?', VW / 2, y + 9, { align: 'center', scale: 2, colour: UI.C.ink, shadow: UI.C.shadow });
      UI.text(ctx, 'BACK TO THE DOODADS\' OWN SCORES.', VW / 2, y + 31, { align: 'center', colour: UI.C.ink, shadow: UI.C.shadow });
      UI.text(ctx, 'PERSONAL BESTS ARE KEPT.', VW / 2, y + 45, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
      /* Two boards, because this question has to be answerable by whatever
         is pointing at it. It used to be answerable only by a KEY: the panel
         read TAP RESET while drawing nothing tappable, and with the menu's
         old tap-anywhere zone gone there was no way to answer or dismiss it
         at all - a phone that reached this screen was stuck on it. */
      if (Input.pointing()) {
        UI.button(ctx, hot, VW / 2 - 104, y + 60, 96, 28,
                  { id: 'reset', a: 'confirm', label: 'RESET', lit: true, scale: 1 });
        UI.button(ctx, hot, VW / 2 + 8, y + 60, 96, 28,
                  { id: 'keep', label: 'KEEP', scale: 1 });
      } else {
        UI.text(ctx, 'ENTER RESET    ESC KEEP', VW / 2, y + 66,
                { align: 'center', colour: UI.C.gold, shadow: UI.C.shadow });
      }
    }
  }

  return { enter: enter, update: update, drawBg: drawBg, drawChars: drawChars, drawFg: drawFg,
           targets: function () { return hot; } };
})();
