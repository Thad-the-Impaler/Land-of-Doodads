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

  /* A board you can press, and the only way this game says "press me".

     It draws the board and adds its rectangle to `hot` in one call, on
     purpose: the invariant the touch UI rests on is that the rectangle the
     player sees and the rectangle the game listens to are the same one, and
     a helper that cannot be split in half is how that stops being a
     convention and starts being structural. There is no way to draw a
     button here and forget to make it tappable.

       ctx   the foreground context
       hot   the scene's target list for this frame (see Input.setTargets)
       o     { label, id, a, i, lit, scale }
             label  the verb, e.g. 'PLAY', 'BACK', 'SAVE'
             id     the kind of thing, passed straight through to the target
             a      optional Input action fired on press, usually 'confirm'
             i      optional index or direction, passed through
             lit    true for the chosen one: gold edge, nails, bright text
             scale  text scale, 2 unless it is a small board

     The label is centred on the face and nudged a pixel left to offset its
     own drop shadow, the same way the title boards have always done it. */
  function button(ctx, hot, x, y, w, h, o) {
    o = o || {};
    var s = o.scale || 2;
    /* a cursor can rest on a button without pressing it, which a finger
       cannot, so it gets a step between plain and chosen */
    var over = Input.hovering(o.id, o.i);
    board(ctx, x, y, w, h, {
      highlight: o.lit ? C.gold : (over ? C.goldDark : null),
      nails: !!o.lit,
      seams: false
    });
    if (o.label) {
      text(ctx, o.label, x + w / 2 - 1, y + Math.round((h - Font.GH * s) / 2), {
        align: 'center', scale: s,
        colour: (o.lit || over) ? C.ink : C.inkDim, shadow: C.shadow
      });
    }
    hot.push({ x: x, y: y, w: w, h: h, id: o.id, a: o.a, i: o.i });
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

  /* Solid pixel triangle; dir -1 = left, 1 = right. NOT exported, and that
     is the point: a triangle in this game now appears only inside a raised
     pad and only ever means "move this way". Loose chevrons were half of
     what made the menus contradict themselves - a decorative one beside the
     name you were on, a second at the edge of the rail, a third in the
     footer text, none of them pressable, all of them next to a pad that
     was. The only ones left are the pair below, either side of the little
     handset on the turn-it-sideways notice, which are a picture of a phone
     rotating rather than anything you can press. */
  function chevron(ctx, x, y, dir, size, colour) {
    ctx.fillStyle = colour || C.ink;
    x = Math.round(x); y = Math.round(y);
    for (var i = 0; i < size; i++) {
      var h = (size - i) * 2 - 1;
      ctx.fillRect(x + dir * i - (dir < 0 ? 1 : 0), y - (h >> 1), 1, h);
    }
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

  /* Is a finger driving? Scenes ask this to leave out furniture that only a
     keyboard or a cursor needs, and to word a label for a thumb. */
  function touch() {
    return Input.pointerKind() === 'touch';
  }

  /* The strip of key hints along the bottom.

     On a phone it draws NOTHING, and that rule lives here rather than in
     five scenes so none of them can forget it. The strip used to repeat the
     buttons as words directly underneath the buttons - BACK appeared twice
     on the level select, once as a thing you press and once as a caption -
     which is exactly the contradiction this pass is clearing. A keyboard
     still needs to be told what the keys do, and a mouse gets its own
     wording because on a desktop both work and hiding either would be a lie.

     `keys` is shown to a keyboard (and before anything at all has pointed);
     `mouse` to a cursor. */
  function footer(ctx, keys, mouse) {
    if (touch()) return;
    ctx.fillStyle = C.darker;
    ctx.fillRect(0, VH - 13, VW, 13);
    /* a soft edge so the strip does not cut the scenery off with a hard line */
    Tint.rect(ctx, 0, VH - 16, VW, 3, C.darker, 8);
    ctx.fillStyle = C.inkFaint;
    ctx.fillRect(0, VH - 13, VW, 1);
    text(ctx, Input.pointerKind() === 'mouse' ? mouse : keys, VW / 2, VH - 10,
         { align: 'center', colour: C.inkDim });
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

     They are the last pads left in the game - the two movement pads and the
     pause button during a run - so they are no longer kept faint. At 0.42
     alpha the glyphs were all but invisible against the coop's floor, which
     is a poor joke on the one control a player has to find by eye; the
     outline and the brighter ink below are there to lift them off whatever
     scenery they happen to be standing on. */
  function pads(ctx) {
    var list = Input.pads();
    for (var i = 0; i < list.length; i++) {
      var z = list[i];
      if (z.rest) continue;
      var on = Input.padHeld(z.a);
      /* a cursor can sit on a pad without pressing it, which a finger
         cannot - so it gets a step between resting and held */
      var over = !on && Input.padHover(z.a);
      var a = ctx.globalAlpha;
      ctx.globalAlpha = a * (on ? 1 : (over ? 0.85 : 0.70));

      ctx.fillStyle = C.shadow;
      ctx.fillRect(z.x + 1, z.y + 2, z.w, z.h);
      /* a dark rim, so a pad edge reads against hay as well as against sky */
      ctx.fillRect(z.x - 1, z.y - 1, z.w + 2, 1);
      ctx.fillRect(z.x - 1, z.y + z.h, z.w + 2, 1);
      ctx.fillRect(z.x - 1, z.y - 1, 1, z.h + 2);
      ctx.fillRect(z.x + z.w, z.y - 1, 1, z.h + 2);
      ctx.fillStyle = on ? C.boardHi : C.board;
      ctx.fillRect(z.x, z.y, z.w, z.h);
      ctx.fillStyle = on ? C.gold : C.boardTop;
      ctx.fillRect(z.x, z.y, z.w, 2);
      ctx.fillStyle = C.boardLo;
      ctx.fillRect(z.x, z.y + z.h - 2, z.w, 2);
      ctx.fillStyle = on ? C.gold : C.inkFaint;
      ctx.fillRect(z.x, z.y, z.w, 1); ctx.fillRect(z.x, z.y + z.h - 1, z.w, 1);
      ctx.fillRect(z.x, z.y, 1, z.h); ctx.fillRect(z.x + z.w - 1, z.y, 1, z.h);

      /* Ink, not dim ink: a pad that has to be found against a hay bale
         cannot afford a muted glyph. No pad carries a word any more - a
         triangle inside a raised pad is the whole vocabulary, and it only
         ever means "move this way". */
      var cx = z.x + z.w / 2, cy = z.y + z.h / 2;
      if (z.icon === 'II') {
        ctx.fillStyle = C.ink;
        ctx.fillRect(Math.round(cx) - 5, Math.round(cy) - 7, 4, 14);
        ctx.fillRect(Math.round(cx) + 1, Math.round(cy) - 7, 4, 14);
      } else {
        text(ctx, z.icon, cx, Math.round(cy - 6),
             { align: 'center', scale: 2, colour: C.ink, shadow: C.shadow });
      }
      ctx.globalAlpha = a;
    }
  }

  /* One hint line, worded for what the player is actually holding. A phone
     has no keys, so touch REPLACES the key list; a mouse sits beside the
     keyboard rather than replacing it, because on a desktop both work and
     hiding either one would be a lie. */
  function forInput(keys, mouse, touch) {
    var k = Input.pointerKind();
    return k === 'touch' ? touch : (k === 'mouse' ? mouse : keys);
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
    C: C, scrim: scrim, board: board, button: button, panel: panel, nail: nail,
    pads: pads, rotateNotice: rotateNotice, forInput: forInput,
    touch: touch, footer: footer,
    text: text, heading: heading, hint: hint, rule: rule, padlock: padlock
  };
})();
