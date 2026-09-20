/* ------------------------------------------------------------------
   Land of Doodads - shared menu furniture
   Boards, nails, chevrons: the whole interface is meant to look like
   it was hammered together in the same shed as the levels.
------------------------------------------------------------------ */
'use strict';

var UI = (function () {

  var C = {
    ink:      '#f2e6c8',
    inkDim:   '#a89572',
    inkFaint: '#6d5f4a',
    shadow:   '#160e07',
    gold:     '#f3cc84',
    goldDark: '#9c7233',
    red:      '#c84b31',
    green:    '#7fb04a',
    board:    '#6b4526',
    boardHi:  '#87582f',
    boardTop: '#a97640',
    boardLo:  '#43301c',
    dark:     '#1b1209',
    darker:   '#0d0805'
  };

  /* dims whatever is behind a menu; flat so the dust and particles still
     drifting underneath do not twinkle through a pattern */
  function scrim(ctx, strength) {
    Tint.rect(ctx, 0, 0, VW, VH, C.darker, strength === undefined ? 11 : strength);
  }

  /* a wooden sign board */
  function board(ctx, x, y, w, h, o) {
    o = o || {};
    x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
    ctx.fillStyle = C.shadow;
    ctx.fillRect(x + 2, y + 3, w, h);                 /* drop shadow */
    ctx.fillStyle = C.board;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = C.boardHi;
    ctx.fillRect(x + 1, y + 1, w - 2, 2);
    ctx.fillStyle = C.boardTop;
    ctx.fillRect(x + 2, y + 1, w - 4, 1);
    ctx.fillStyle = C.boardLo;
    ctx.fillRect(x + 1, y + h - 3, w - 2, 2);
    /* board joints (skipped on short one-line boards, where a seam would
       run straight through the text) */
    for (var by = y + 14; o.seams !== false && by < y + h - 4; by += 15) {
      ctx.fillStyle = C.boardLo; ctx.fillRect(x + 1, by, w - 2, 1);
      ctx.fillStyle = C.boardTop; ctx.fillRect(x + 1, by + 1, w - 2, 1);
    }
    /* outline */
    ctx.fillStyle = C.shadow;
    ctx.fillRect(x, y, w, 1); ctx.fillRect(x, y + h - 1, w, 1);
    ctx.fillRect(x, y, 1, h); ctx.fillRect(x + w - 1, y, 1, h);
    if (o.highlight) {
      ctx.fillStyle = o.highlight;
      ctx.fillRect(x - 1, y - 1, w + 2, 1); ctx.fillRect(x - 1, y + h, w + 2, 1);
      ctx.fillRect(x - 1, y - 1, 1, h + 2); ctx.fillRect(x + w, y - 1, 1, h + 2);
    }
    if (o.nails !== false) {
      nail(ctx, x + 4, y + 4); nail(ctx, x + w - 6, y + 4);
      nail(ctx, x + 4, y + h - 6); nail(ctx, x + w - 6, y + h - 6);
    }
  }

  function nail(ctx, x, y) {
    ctx.fillStyle = '#ccd3d9'; ctx.fillRect(x, y, 2, 1);
    ctx.fillStyle = '#8b939c'; ctx.fillRect(x, y + 1, 2, 1);
    ctx.fillStyle = C.shadow; ctx.fillRect(x, y + 2, 2, 1);
  }

  /* dark inset panel, for huds and previews */
  function panel(ctx, x, y, w, h, o) {
    o = o || {};
    x = Math.round(x); y = Math.round(y); w = Math.round(w); h = Math.round(h);
    ctx.fillStyle = o.fill || C.dark;
    ctx.fillRect(x, y, w, h);
    if (o.dither) Dither.rect(ctx, x, y, w, h, C.darker, o.dither);
    var edge = o.edge || C.inkFaint;
    ctx.fillStyle = edge;
    ctx.fillRect(x, y, w, 1); ctx.fillRect(x, y + h - 1, w, 1);
    ctx.fillRect(x, y, 1, h); ctx.fillRect(x + w - 1, y, 1, h);
    if (o.corner) {
      ctx.fillStyle = o.corner;
      ctx.fillRect(x, y, 3, 1); ctx.fillRect(x, y, 1, 3);
      ctx.fillRect(x + w - 3, y, 3, 1); ctx.fillRect(x + w - 1, y, 1, 3);
      ctx.fillRect(x, y + h - 1, 3, 1); ctx.fillRect(x, y + h - 3, 1, 3);
      ctx.fillRect(x + w - 3, y + h - 1, 3, 1); ctx.fillRect(x + w - 1, y + h - 3, 1, 3);
    }
  }

  /* solid pixel triangle; dir -1 = left, 1 = right */
  function chevron(ctx, x, y, dir, size, colour) {
    ctx.fillStyle = colour || C.ink;
    x = Math.round(x); y = Math.round(y);
    for (var i = 0; i < size; i++) {
      var h = (size - i) * 2 - 1;
      ctx.fillRect(x + dir * i - (dir < 0 ? 1 : 0), y - (h >> 1), 1, h);
    }
  }

  function chevronV(ctx, x, y, dir, size, colour) {
    ctx.fillStyle = colour || C.ink;
    x = Math.round(x); y = Math.round(y);
    for (var i = 0; i < size; i++) {
      var w = (size - i) * 2 - 1;
      ctx.fillRect(x - (w >> 1), y + dir * i - (dir < 0 ? 1 : 0), w, 1);
    }
  }

  /* the blinking marker next to the focused menu row */
  function marker(ctx, x, y, t, colour) {
    var bob = Math.round(Math.sin(t * 7) * 1);
    chevron(ctx, x + bob, y, 1, 4, colour || C.gold);
  }

  function text(ctx, str, x, y, o) {
    o = o || {};
    if (o.shadow === undefined) o.shadow = C.shadow;
    if (o.colour === undefined) o.colour = C.ink;
    return Font.draw(ctx, str, x, y, o);
  }

  /* big heading with an outline so it reads over busy scenery */
  function heading(ctx, str, x, y, scale, o) {
    o = o || {};
    return Font.draw(ctx, str, x, y, {
      scale: scale, align: o.align || 'center',
      colour: o.colour || C.gold,
      outline: o.outline || C.shadow,
      shadow: o.shadow || null,
      shadowX: 0, shadowY: 2,
      wave: o.wave, waveAmp: o.waveAmp, wavePhase: o.wavePhase,
      spacing: o.spacing
    });
  }

  /* footer hint strip */
  function hint(ctx, str, y, t) {
    var blink = t === undefined ? 1 : (Math.sin(t * 3.2) > -0.55 ? 1 : 0);
    if (!blink) return;
    text(ctx, str, VW / 2, y, { scale: 1, align: 'center', colour: C.inkDim, shadow: C.shadow });
  }

  /* horizontal rule made of dashes */
  function rule(ctx, x, y, w, colour) {
    ctx.fillStyle = colour || C.inkFaint;
    for (var i = 0; i < w; i += 2) ctx.fillRect(Math.round(x + i), Math.round(y), 1, 1);
  }

  /* a padlock, drawn for everything that is not built yet */
  function padlock(ctx, x, y, scale, colour) {
    scale = scale || 1;
    var c = colour || C.inkDim;
    function px(dx, dy, w, h) {
      ctx.fillRect(Math.round(x + dx * scale), Math.round(y + dy * scale),
                   Math.round(w * scale), Math.round(h * scale));
    }
    ctx.fillStyle = C.shadow;
    px(-4, -6, 9, 4); px(-5, -2, 11, 9);
    ctx.fillStyle = c;
    px(-3, -6, 7, 3);        /* shackle */
    px(-3, -5, 2, 3);
    px(2, -5, 2, 3);
    px(-5, -2, 11, 8);       /* body */
    ctx.fillStyle = C.shadow;
    px(-1, 1, 3, 2);
    px(0, 2, 1, 3);
  }

  /* The on-screen controls. Their geometry is Input's, not ours, so what
     the player sees and what the game listens to are the same rectangles.
     Kept faint: they sit over a run in progress and must not compete with
     the pillars for attention. */
  function pads(ctx) {
    var list = Input.pads();
    for (var i = 0; i < list.length; i++) {
      var z = list[i];
      if (z.rest) continue;
      var on = Input.padHeld(z.a);
      var a = ctx.globalAlpha;
      ctx.globalAlpha = a * (on ? 0.85 : 0.42);

      ctx.fillStyle = C.shadow;
      ctx.fillRect(z.x + 1, z.y + 2, z.w, z.h);
      ctx.fillStyle = on ? C.boardHi : C.board;
      ctx.fillRect(z.x, z.y, z.w, z.h);
      ctx.fillStyle = on ? C.gold : C.boardTop;
      ctx.fillRect(z.x, z.y, z.w, 2);
      ctx.fillStyle = C.boardLo;
      ctx.fillRect(z.x, z.y + z.h - 2, z.w, 2);
      ctx.fillStyle = on ? C.gold : C.inkFaint;
      ctx.fillRect(z.x, z.y, z.w, 1); ctx.fillRect(z.x, z.y + z.h - 1, z.w, 1);
      ctx.fillRect(z.x, z.y, 1, z.h); ctx.fillRect(z.x + z.w - 1, z.y, 1, z.h);

      var cx = z.x + z.w / 2, cy = z.y + z.h / 2;
      if (z.label) {
        text(ctx, z.label, cx, Math.round(cy - 3), { align: 'center',
             colour: on ? C.ink : C.inkDim, shadow: C.shadow });
      } else if (z.icon === 'II') {
        ctx.fillStyle = on ? C.ink : C.inkDim;
        ctx.fillRect(Math.round(cx) - 4, Math.round(cy) - 5, 3, 10);
        ctx.fillRect(Math.round(cx) + 2, Math.round(cy) - 5, 3, 10);
      } else {
        text(ctx, z.icon, cx, Math.round(cy - (z.small ? 3 : 6)),
             { align: 'center', scale: z.small ? 1 : 2,
               colour: on ? C.ink : C.inkDim, shadow: C.shadow });
      }
      ctx.globalAlpha = a;
    }
  }

  /* 480x270 is a landscape shape and a phone held upright cannot show it
     at any useful size, so say so rather than rendering a stamp */
  function rotateNotice(ctx, t) {
    ctx.fillStyle = '#0b0805';
    ctx.fillRect(0, 0, VW, VH);
    var bob = Math.round(Math.sin(t * 2.2) * 2);
    var cx = VW / 2, cy = VH / 2 - 14 + bob;
    /* a little handset turning on its side */
    ctx.fillStyle = C.shadow;  ctx.fillRect(cx - 15, cy - 25, 30, 50);
    ctx.fillStyle = C.board;   ctx.fillRect(cx - 14, cy - 24, 28, 48);
    ctx.fillStyle = C.darker;  ctx.fillRect(cx - 11, cy - 20, 22, 38);
    ctx.fillStyle = C.boardTop; ctx.fillRect(cx - 4, cy + 19, 8, 2);
    chevron(ctx, cx + 30, cy, 1, 6, C.gold);
    chevron(ctx, cx - 30, cy, -1, 6, C.gold);
    heading(ctx, 'TURN IT SIDEWAYS', cx, VH / 2 + 30, 2, { colour: C.gold });
    text(ctx, 'LAND OF DOODADS IS A WIDE GAME', cx, VH / 2 + 52,
         { align: 'center', colour: C.inkDim });
  }

  return {
    C: C, scrim: scrim, board: board, panel: panel, nail: nail,
    pads: pads, rotateNotice: rotateNotice,
    chevron: chevron, chevronV: chevronV, marker: marker,
    text: text, heading: heading, hint: hint, rule: rule, padlock: padlock
  };
})();
