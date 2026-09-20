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
      Doodads.draw(ctx, d.id, x + 99, rowY(i) + 6 + bob, 5.2, 0, flap);
    }
  }

  function drawFg(ctx) {
    var c = current();
    /* two line footer: everyone's bests, then the controls */
    ctx.fillStyle = UI.C.darker;
    ctx.fillRect(0, VH - 28, VW, 28);
    ctx.fillStyle = UI.C.inkFaint;
    ctx.fillRect(0, VH - 28, VW, 1);
    UI.rule(ctx, 40, VH - 14, VW - 80, UI.C.inkFaint);

    UI.heading(ctx, 'HIGH SCORES', VW / 2, 8, 2, { colour: UI.C.gold });
    if (c) {
      var label = c.room.name + '  ·  ' + c.level.name;
      UI.text(ctx, label, VW / 2, 30, { align: 'center', colour: UI.C.ink });
      var half = Font.measure(label, 1) / 2;
      var live = list.length > 1 ? UI.C.gold : UI.C.inkFaint;
      UI.chevron(ctx, VW / 2 - half - 10, 33, -1, 4, live);
      UI.chevron(ctx, VW / 2 + half + 10, 33, 1, 4, live);

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
        parts.push({ d: d, text: d.name + ' ' + (pb > 0 ? pb : '-') });
      });
      /* close the gap up rather than running off the edge if the roster
         ever outgrows the room even once the locked ones are dropped */
      var gap = 16;
      var measure = function (g) {
        var w = Font.measure('BESTS', 1);
        parts.forEach(function (p) { w += g + Font.measure(p.text, 1); });
        if (shut) w += g + 13 + Font.measure(shut + ' LOCKED', 1);
        return w;
      };
      while (gap > 6 && measure(gap) > VW - 20) gap -= 2;
      var bx = Math.round(VW / 2 - measure(gap) / 2), by = VH - 24;
      UI.text(ctx, 'BESTS', bx, by, { colour: UI.C.inkFaint });
      bx += Font.measure('BESTS', 1) + gap;
      parts.forEach(function (p) {
        UI.text(ctx, p.text, bx, by, { colour: p.d.accentLight });
        bx += Font.measure(p.text, 1) + gap;
      });
      if (shut) {
        UI.padlock(ctx, bx + 4, by + 3, 1, UI.C.inkFaint);
        UI.text(ctx, shut + ' LOCKED', bx + 13, by, { colour: UI.C.inkFaint });
      }
    }

    UI.text(ctx, Input.usingTouch() ? '◀ ▶ LEVEL    BACK' : '◀ ▶ LEVEL    X RESET TABLE    ESC BACK',
            VW / 2, VH - 10, { align: 'center', colour: UI.C.inkDim });

    if (confirming && c) {
      UI.scrim(ctx, 10);
      var w = 236, h = 74, x = (VW - w) / 2, y = (VH - h) / 2;
      UI.board(ctx, x, y, w, h, { highlight: UI.C.red });
      UI.text(ctx, 'RESET ' + c.level.name + '?', VW / 2, y + 9, { align: 'center', scale: 2, colour: UI.C.ink, shadow: UI.C.shadow });
      UI.text(ctx, 'BACK TO THE DOODADS\' OWN SCORES.', VW / 2, y + 31, { align: 'center', colour: UI.C.ink, shadow: UI.C.shadow });
      UI.text(ctx, 'PERSONAL BESTS ARE KEPT.', VW / 2, y + 46, { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow });
      UI.text(ctx, Input.usingTouch() ? 'TAP RESET    BACK KEEPS' : 'ENTER RESET    ESC KEEP',
              VW / 2, y + 62, { align: 'center', colour: UI.C.gold, shadow: UI.C.shadow });
    }
  }

  return { enter: enter, update: update, drawBg: drawBg, drawChars: drawChars, drawFg: drawFg };
})();
