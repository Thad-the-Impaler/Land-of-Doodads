/* ------------------------------------------------------------------
   Land of Doodads - high scores
   Two tables for each playable level, a tab apiece. MY SCORES is this
   browser's arcade top ten, a little doodad beside every entry and
   each doodad's personal best along the bottom; X resets it back to
   the doodads' own starting scores. EVERYONE is the ten best runs
   anybody has flown, from js/world.js - arcade style, so one player can
   hold several - with where this browser's best stands along the bottom.
------------------------------------------------------------------ */
'use strict';

var ScoresScene = (function () {

  var t = 0, scroll = 0;
  var list = [];               /* playable {room, level} pairs */
  var index = 0;
  var slide = 0;
  var confirming = false;
  /* 0 this browser's tables, 1 everyone's. Not reset on enter: whoever
     went to look at the world's board last time wants it again. */
  var tab = 0;

  var PX = 70, PW = 340, PY = 48, PH = 190;
  var ROW0 = 66, ROWH = 17;
  var FROM_X = 236;            /* the country column, on everyone's board only */

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
    /* shown(), not playable(): a room that has not been earned keeps its
       bays to itself, and this screen is the one place a name could leak
       out of a shut door. It would also be the place that BUILT the leak -
       Scores.table() writes a table the first time it is read, so paging
       past a secret level would put its key in the save file. */
    list = Levels.shown();
    index = 0;
    /* open on whichever level was played last */
    for (var i = 0; i < list.length; i++) {
      if (list[i].roomIndex === Game.selection.room && list[i].levelIndex === Game.selection.level) index = i;
    }
    slide = 0;
    confirming = false;
    /* a best that could not be sent when its run ended goes now, so the
       board this screen is about to ask for has it on */
    World.syncAll();
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
    if (tg && tg.id === 'tab') {
      if (tg.i !== tab) { tab = tg.i; Audio3.play('move'); }
      return;
    }
    /* ▲ ▼ had nothing to do on this screen, and the tabs sit one above the
       other in what they mean if not on the screen: mine, then everyone */
    if (Input.nav('up') || Input.nav('down')) { tab = 1 - tab; Audio3.play('move'); }

    if (Input.nav('left') || Input.nav('right')) {
      if (list.length < 2) { Audio3.play('deny'); Screen.shake(1.2, 0.16); }
      else {
        var dir = Input.nav('left') ? -1 : 1;
        index = (index + dir + list.length) % list.length;
        slide = dir * 24;
        Audio3.play('move');
      }
    }
    /* everyone's board is not this browser's to reset */
    if (Input.hit('erase')) {
      if (tab === 0) { confirming = true; Audio3.play('pause'); }
      else { Audio3.play('deny'); Screen.shake(1.2, 0.16); }
    }
    if (Input.hit('back') || Input.hit('confirm')) { Audio3.play('back'); Game.go(TitleScene, { menu: 1 }); }
  }

  /* -------------------------------------------------------- drawing */

  function rowY(i) { return ROW0 + i * ROWH; }

  /* the rows on show: this browser's table, or whatever everyone's board
     has come back with so far (nothing, the first moment it is asked) */
  function rowsFor(c) {
    return tab === 1 ? World.board(c.room, c.level).rows : Scores.table(c.room, c.level);
  }

  function drawBg(ctx) {
    Coop.drawMenuBackdrop(ctx, scroll);

    var c = current();
    if (!c) return;
    var x = PX + Math.round(slide), rows = rowsFor(c);

    UI.panel(ctx, x, PY, PW, PH, { fill: '#1b120a', edge: UI.C.inkFaint, corner: UI.C.gold });
    UI.text(ctx, 'RANK', x + 10, PY + 6, { colour: UI.C.inkFaint });
    UI.text(ctx, 'NAME', x + 48, PY + 6, { colour: UI.C.inkFaint });
    UI.text(ctx, 'DOODAD', x + 96, PY + 6, { colour: UI.C.inkFaint });
    if (tab === 1) UI.text(ctx, 'FROM', x + FROM_X, PY + 6, { colour: UI.C.inkFaint });
    UI.text(ctx, 'SCORE', x + PW - 12, PY + 6, { align: 'right', colour: UI.C.inkFaint });
    UI.rule(ctx, x + 8, PY + 15, PW - 16, UI.C.inkFaint);

    /* an empty board of everyone's says why it is empty, rather than ten
       rows of dashes that would read the same whether the world has not
       played this level yet or this browser cannot reach it */
    if (tab === 1 && !rows.length) { drawWorldEmpty(ctx, x, World.board(c.room, c.level)); return; }

    for (var i = 0; i < Scores.SIZE; i++) {
      var y = rowY(i), e = rows[i];
      var colour = Scores.rankColour(i);
      /* this browser's own row on everyone's board, lit the way the results
         board lights the run that has just gone on */
      var ink = e && e.me ? UI.C.gold : colour;
      if (e && e.me) { ctx.fillStyle = '#4a3017'; ctx.fillRect(x + 3, y - 2, PW - 6, ROWH - 1); }
      else if (i % 2 === 0) { ctx.fillStyle = '#22170d'; ctx.fillRect(x + 3, y - 2, PW - 6, ROWH - 1); }
      UI.text(ctx, Scores.ordinal(i), x + 10, y + 4, { colour: e ? colour : UI.C.inkFaint });
      if (!e) {
        UI.text(ctx, '- - -', x + 48, y + 4, { colour: UI.C.inkFaint });
        UI.text(ctx, '-', x + PW - 12, y + 4, { align: 'right', colour: UI.C.inkFaint });
        continue;
      }
      UI.text(ctx, e.name.replace(/ /g, '_'), x + 48, y, { scale: 2, colour: ink, shadow: UI.C.shadow });
      var d = e.doodad && Doodads.get(e.doodad);
      UI.text(ctx, d ? d.name : '?', x + 108, y + 4, { colour: d ? d.accentLight : UI.C.inkFaint });
      if (e.country) UI.text(ctx, e.country, x + FROM_X, y + 4, { colour: UI.C.inkDim });
      UI.text(ctx, String(e.score), x + PW - 12, y, { align: 'right', scale: 2, colour: ink, shadow: UI.C.shadow });
      if (i === 0) UI.text(ctx, '★', x + 38, y + 4, { colour: UI.C.gold });
    }
  }

  function drawWorldEmpty(ctx, x, w) {
    var cx = x + PW / 2, cy = PY + PH / 2;
    var big = w.status === 'loading' ? 'ASKING EVERYONE...'
            : w.status === 'offline' ? 'OFFLINE' : 'NO SCORES YET';
    var small = w.status === 'loading' ? ''
              : w.status === 'offline' ? 'EVERYONE\'S SCORES NEED THE INTERNET' : 'THE FIRST RUN HERE TAKES 1ST';
    UI.text(ctx, big, cx, cy - 12, { align: 'center', scale: 2, colour: UI.C.ink, shadow: UI.C.shadow });
    if (small) UI.text(ctx, small, cx, cy + 8, { align: 'center', colour: UI.C.inkDim });
  }

  /* the doodads themselves stay smooth, so they ride the sharp layer */
  function drawChars(ctx) {
    var c = current();
    if (!c) return;
    var x = PX + Math.round(slide), rows = rowsFor(c);
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

  /* The foot of everyone's board, where MY SCORES keeps its row of bests:
     where this browser's best run on the level stands among every run, and
     how many players have flown it. The top ten is ten runs; this line is
     the one about you. */
  function drawYou(ctx, c) {
    var by = UI.touch() ? VH - 12 : VH - 24;
    var w = World.board(c.room, c.level);
    var line = '', ink = UI.C.inkDim;
    if (w.status === 'ok' && w.you) {
      line = 'YOUR BEST: ' + Scores.ordinal(w.you.rank - 1) + '    ' +
             World.count(w.total) + (w.total === 1 ? ' PLAYER' : ' PLAYERS');
      ink = UI.C.gold;
    } else if (w.status === 'ok' && w.total) {
      /* an empty board has already said so in the middle of the panel */
      line = World.count(w.total) + (w.total === 1 ? ' PLAYER' : ' PLAYERS') + '    YOU ARE NOT ON IT YET';
    } else if (w.status === 'offline') {
      line = 'YOUR BESTS GO UP NEXT TIME YOU ARE ONLINE';
    }
    if (line) UI.text(ctx, line, VW / 2, by, { align: 'center', colour: ink });
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

    /* The heading is the switch: two boards, the one on show lit, so the
       top of the screen says which table this is and is also the way to
       the other one. */
    var TW = 124;
    UI.button(ctx, hot, VW / 2 - TW - 3, 3, TW, 24, { id: 'tab', i: 0, label: 'MY SCORES', lit: tab === 0 });
    UI.button(ctx, hot, VW / 2 + 3, 3, TW, 24, { id: 'tab', i: 1, label: 'EVERYONE', lit: tab === 1 });

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
      UI.text(ctx, label, VW / 2, 33, { align: 'center', colour: UI.C.ink });

      /* The one screen in the game where both arrow vocabularies could show
         at once: the two paging buttons above are drawn the moment anything
         points, and these say the same thing for the arrow KEYS. So they
         are drawn only when nothing is pointing - never a loose triangle
         beside a pressable one doing the same job. */
      if (!Input.pointing()) {
        var half = Font.measure(label, 1) / 2;
        var live = list.length > 1 ? UI.C.gold : UI.C.inkFaint;
        UI.chevron(ctx, VW / 2 - half - 10, 36, -1, 4, live);
        UI.chevron(ctx, VW / 2 + half + 10, 36, 1, 4, live);
      }
    }

    if (c && tab === 1) drawYou(ctx, c);
    else if (c) {

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
      /* `showLabel`, not `label`: the level's name is already in a `label`
         declared at the top of this function, and `var` is function-scoped,
         so the two were one variable holding a string and then a boolean.
         It worked only because every read of the string happens above this
         line - which is the kind of "works" this project has been bitten by
         four times, and it would stop working the day anything below here
         wanted the level's name. */
      var BUDGET = VW - 20, by = UI.touch() ? VH - 12 : VH - 24;
      var gap = 16, showLabel = true, show = parts, hidden = 0;
      var tail = function () { return hidden ? '+' + hidden : ''; };
      var measure = function () {
        var w = showLabel ? Font.measure('BESTS', 1) : -gap;
        show.forEach(function (p) { w += gap + Font.measure(p.text, 1); });
        if (hidden) w += gap + Font.measure(tail(), 1);
        if (shut) w += gap + 13 + Font.measure(shut + ' LOCKED', 1);
        return w;
      };
      while (gap > 6 && measure() > BUDGET) gap -= 2;
      /* 1. the label goes first; it is the word that says least */
      if (measure() > BUDGET) showLabel = false;
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
      if (showLabel) { UI.text(ctx, 'BESTS', bx, by, { colour: UI.C.inkFaint }); bx += Font.measure('BESTS', 1) + gap; }
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
    /* The mouse line was a copy of the keyboard one, which is the exact
       contradiction UI.footer takes two strings to avoid: a cursor is
       looking at two paging boards it can click while being told about
       arrow keys. The achievements screen, which pages the same way, has
       said it properly since it was written. */
    if (tab === 0) {
      UI.footer(ctx, '▲ ▼ EVERYONE    ◀ ▶ LEVEL    X RESET TABLE    ESC BACK',
                     'CLICK ◀ ▶ FOR LEVEL    X RESET TABLE    ESC BACK');
    } else {
      UI.footer(ctx, '▲ ▼ MY SCORES    ◀ ▶ LEVEL    ESC BACK',
                     'CLICK ◀ ▶ FOR LEVEL    ESC BACK');
    }

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
