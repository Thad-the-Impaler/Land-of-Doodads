/* ------------------------------------------------------------------
   Land of Doodads - room and level select
   Laid out from the concept sketch: a row of rooms across the top,
   then a carousel of level cards, the middle one blown up with a
   living preview of the level inside it.
------------------------------------------------------------------ */
'use strict';

var LevelSelectScene = (function () {

  var t = 0, scroll = 0;
  var focus = 'room';                 /* 'room' then 'level' */
  var roomIndex = 1, levelIndex = 1;
  var slideRoom = 0, slideLevel = 0;  /* animated offsets for carousel movement */
  var denyShake = 0;

  var CARD = { w: 126, h: 150, y: 66 };
  var SIDE = { w: 88, h: 112, y: 85 };
  /* The side room slots were 16 tall, which is 22 CSS px on a phone - half a
     touch target. They now stand the full height of the row they are in, so
     the thing you press is the thing you were already looking at. */
  var ROOM = { w: 152, h: 32, y: 11 };
  var SIDEROOM = { w: 86, h: 32, y: 11 };

  /* The rectangles this screen drew, refilled inside drawFg and handed to
     Input by Game.render. The peeking neighbours ARE the arrows here: a
     finger presses the room or the card it can see rather than working out
     which of two rows a hidden cursor is on, so the four decorative
     chevrons - and the whole idea of a mode - stop mattering to a thumb. */
  var hot = [];

  function room(i) { return Levels.rooms[clamp(i, 0, Levels.rooms.length - 1)]; }
  /* undefined outside the list, so the side slots stay empty at the ends */
  function roomAt(i) { return Levels.rooms[i]; }
  function level(ri, li) {
    var r = room(ri);
    return r.levels[clamp(li, 0, r.levels.length - 1)];
  }

  function enter(params) {
    t = 0;
    roomIndex = Game.selection.room;
    levelIndex = Game.selection.level;
    focus = (params && params.focus) || 'room';
    slideRoom = slideLevel = 0;
    denyShake = 0;
  }

  function moveRoom(dir) {
    var next = roomIndex + dir;
    if (next < 0 || next >= Levels.rooms.length) { deny(); return; }
    roomIndex = next;
    var r = room(roomIndex);
    levelIndex = r.startLevel === undefined ? Math.floor(r.levels.length / 2) : r.startLevel;
    slideRoom = dir * 26;
    Audio3.play('move');
  }

  function moveLevel(dir) {
    var r = room(roomIndex);
    var next = levelIndex + dir;
    if (next < 0 || next >= r.levels.length) { deny(); return; }
    levelIndex = next;
    slideLevel = dir * 34;
    Audio3.play('move');
  }

  function deny() {
    Audio3.play('deny');
    denyShake = 0.26;
    Screen.shake(1.4, 0.2);
  }

  function update(dt) {
    t += dt;
    scroll += 9 * dt;
    slideRoom = damp(slideRoom, 0, 0.0005, dt);
    slideLevel = damp(slideLevel, 0, 0.0005, dt);
    if (denyShake > 0) denyShake -= dt;

    if (Game.locked()) return;

    /* A tap goes straight at what it landed on, and then the keyboard branches
       below carry on from wherever the finger left the cursor. A side card
       tap moves the carousel; the centre card carries a:'confirm', so it
       falls into the level branch's own confirm - which is what plays the
       level, or refuses it if the gate is still shut. */
    var tg = Input.tapped();
    if (tg) {
      if (tg.id === 'back') { Audio3.play('back'); Game.go(TitleScene, {}); return; }
      if (tg.id === 'room') { focus = 'room'; moveRoom(tg.i); }
      else if (tg.id === 'card') { focus = 'level'; if (tg.i) moveLevel(tg.i); }
    }

    if (focus === 'room') {
      if (Input.nav('left')) moveRoom(-1);
      if (Input.nav('right')) moveRoom(1);
      if (Input.nav('down')) { focus = 'level'; Audio3.play('move'); }
      if (Input.hit('confirm')) {
        if (room(roomIndex).locked) deny();
        else { focus = 'level'; Audio3.play('select'); }
      }
      if (Input.hit('back')) { Audio3.play('back'); Game.go(TitleScene, {}); }
    } else {
      if (Input.nav('left')) moveLevel(-1);
      if (Input.nav('right')) moveLevel(1);
      if (Input.nav('up')) { focus = 'room'; Audio3.play('move'); }
      if (Input.hit('confirm')) {
        var lv = level(roomIndex, levelIndex);
        if (lv.locked || !Levels.isUnlocked(lv)) deny();
        else {
          Game.selection.room = roomIndex;
          Game.selection.level = levelIndex;
          Audio3.play('select');
          Game.go(CharSelectScene, {});
        }
      }
      if (Input.hit('back')) { focus = 'room'; Audio3.play('back'); }
    }
  }

  /* -------------------------------------------------------- drawing */

  function drawBg(ctx) {
    Coop.drawMenuBackdrop(ctx, scroll);
  }

  /* Where every slot on this screen is, worked out once so the rectangle
     that gets drawn and the rectangle that gets listened to are read off the
     same six numbers - including halfway through a slide, when the drawn
     card and a stale target would otherwise part company. */
  function layout(shakeX) {
    var rx = VW / 2 + slideRoom + (focus === 'room' ? shakeX : 0);
    var lx = VW / 2 + slideLevel + (focus === 'level' ? shakeX : 0);
    function rect(x, y, w, h) { return { x: Math.round(x), y: y, w: w, h: h }; }
    return {
      roomL: rect(rx - ROOM.w / 2 - SIDEROOM.w - 26, SIDEROOM.y, SIDEROOM.w, SIDEROOM.h),
      room:  rect(rx - ROOM.w / 2, ROOM.y, ROOM.w, ROOM.h),
      roomR: rect(rx + ROOM.w / 2 + 26, SIDEROOM.y, SIDEROOM.w, SIDEROOM.h),
      cardL: rect(lx - CARD.w / 2 - SIDE.w - 20, SIDE.y, SIDE.w, SIDE.h),
      card:  rect(lx - CARD.w / 2, CARD.y, CARD.w, CARD.h),
      cardR: rect(lx + CARD.w / 2 + 20, SIDE.y, SIDE.w, SIDE.h)
    };
  }

  /* the one-pixel nudge that makes a chevron look like it is leaning the
     way it points. Keyboard and cursor only - see the callers. */
  function arrowBob() { return Math.round((Math.sin(t * 5) + 1) * 0.5 + 0.2); }

  /* How to fit a level's name on its cover.

     THE GARDEN and THE CANOPY measure 118px at scale 2 against a 112px
     plate - over by SIX PIXELS - and were dropping to scale 1 for it, which
     is half the size for the sake of nothing anyone could see. Tightening
     the letter spacing before touching the scale buys 18px on a ten-letter
     name and 40 on a long one, which is more than enough to keep both of
     them big.

     Ordered so the biggest thing that fits wins: full size and normal
     spacing, then full size and tight, then down a step and the same two
     again. THE CONSTRUCTION ZONE ends up at the bottom rung and is better
     off for it - at 125px it used to hang over both ends of its own plate,
     and tight it is 105 and inside it. */
  function fitTitle(name, budget) {
    var tries = [[2, 1], [2, 0], [1, 1], [1, 0]];
    for (var i = 0; i < tries.length; i++) {
      if (Font.measure(name, tries[i][0], tries[i][1]) <= budget) {
        return { scale: tries[i][0], spacing: tries[i][1] };
      }
    }
    return { scale: 1, spacing: 0 };
  }

  /* one target, from the rectangle that was just drawn */
  function hit(rc, id, i, a) {
    hot.push({ x: rc.x, y: rc.y, w: rc.w, h: rc.h, id: id, i: i, a: a });
  }

  function drawFg(ctx) {
    hot.length = 0;
    var shakeX = denyShake > 0 ? Math.round(Math.sin(t * 60) * 2) : 0;
    var L = layout(shakeX);

    /* The way back, and the only piece of furniture on this screen that is
       not also content. Drawn first, so its rectangle is FIRST in the list
       and wins the moment a sliding room slot passes under it. */
    if (Input.pointing()) UI.button(ctx, hot, 6, 4, 44, 32, { id: 'back', label: 'BACK', scale: 1 });

    /* ---- rooms ---- */
    var prevRoom = roomAt(roomIndex - 1), nextRoom = roomAt(roomIndex + 1);
    drawRoomSlot(ctx, prevRoom, L.roomL, false, -1);
    if (prevRoom) hit(L.roomL, 'room', -1);
    drawRoomSlot(ctx, nextRoom, L.roomR, false, 1);
    if (nextRoom) hit(L.roomR, 'room', 1);
    /* the centre room board is where you already are, so it is not a target */
    drawRoomSlot(ctx, room(roomIndex), L.room, true);

    /* Signage for the arrow keys, either side of what they move. Not drawn
       on a phone, where the side slots are the arrows and can be pressed. */
    if (!UI.touch()) {
      var rbob = arrowBob();
      var rcol = focus === 'room' ? UI.C.gold : UI.C.inkFaint;
      var rmy = ROOM.y + ROOM.h / 2;
      if (prevRoom) UI.chevron(ctx, L.room.x - 10 - rbob, rmy, -1, 5, rcol);
      if (nextRoom) UI.chevron(ctx, L.room.x + ROOM.w + 10 + rbob, rmy, 1, 5, rcol);
    }

    UI.text(ctx, 'ROOM', L.room.x + ROOM.w / 2, ROOM.y - 9,
            { align: 'center',
              colour: (focus === 'room' && !UI.touch()) ? UI.C.ink : UI.C.inkFaint });

    /* ---- levels ---- */
    var r = room(roomIndex);
    var leftLv = levelIndex > 0 ? r.levels[levelIndex - 1] : null;
    var rightLv = levelIndex < r.levels.length - 1 ? r.levels[levelIndex + 1] : null;

    if (leftLv) { drawCard(ctx, leftLv, L.cardL, false, -1); hit(L.cardL, 'card', -1); }
    if (rightLv) { drawCard(ctx, rightLv, L.cardR, false, 1); hit(L.cardR, 'card', 1); }
    drawCard(ctx, level(roomIndex, levelIndex), L.card, true, 0);
    hit(L.card, 'card', 0, 'confirm');

    if (!UI.touch()) {
      var cbob = arrowBob();
      var ccol = focus === 'level' ? UI.C.gold : UI.C.inkFaint;
      var cmy = CARD.y + CARD.h / 2;
      if (leftLv) UI.chevron(ctx, L.card.x - 9 - cbob, cmy, -1, 6, ccol);
      if (rightLv) UI.chevron(ctx, L.card.x + CARD.w + 9 + cbob, cmy, 1, 6, ccol);
    }

    /* ---- the strip under everything ---- */
    var lv = level(roomIndex, levelIndex);
    Tint.rect(ctx, 0, VH - 46, VW, 46, UI.C.darker, 12);
    UI.rule(ctx, 30, VH - 46, VW - 60, UI.C.inkFaint);
    if (lv.blurb) {
      UI.text(ctx, lv.blurb[0], VW / 2, VH - 40, { align: 'center', colour: UI.C.inkDim });
      if (lv.blurb[1]) UI.text(ctx, lv.blurb[1], VW / 2, VH - 31, { align: 'center', colour: UI.C.inkDim });
    }

    var shut = lv.locked || !Levels.isUnlocked(lv);
    UI.footer(ctx,
      focus === 'room' ? '◀ ▶ ROOM    ENTER PICK ROOM    ESC BACK'
                       : (shut ? '◀ ▶ LEVEL    LOCKED    ESC ROOMS'
                               : '◀ ▶ LEVEL    ENTER PLAY    ESC ROOMS'),
      focus === 'room' ? 'CLICK A ROOM OR A CARD    ESC BACK'
                       : 'CLICK THE BIG CARD TO PLAY    ESC ROOMS');
  }

  /* `dir` is which side slot this is (-1 / +1), and only a cursor cares: it
     is what lets the slot under the pointer light up without lighting up its
     twin on the other side of the board. */
  function drawRoomSlot(ctx, r, rc, big, dir) {
    if (!r) return;
    var x = rc.x, y = rc.y, w = rc.w, h = rc.h;
    /* Gold means "this is what you press". On a keyboard that is whatever
       the focus is on, and the focus can be up here on the room. A finger
       has no focus and cannot press the centre plate at all - it is the
       name of where you already are - so on touch the gold belongs to the
       card below and never to this. It was the other way round on arrival:
       the one lit, nailed, button-shaped thing on the screen was the one
       thing that did nothing, and the card you had to press was dim. */
    var active = big && focus === 'room' && !UI.touch();
    if (big) {
      UI.board(ctx, x, y, w, h, { highlight: active ? UI.C.gold : null });
    } else {
      UI.panel(ctx, x, y, w, h, {
        fill: '#2b1e12', dither: 6,
        edge: Input.hovering('room', dir) ? UI.C.goldDark : UI.C.inkFaint
      });
    }
    var colour = r.locked ? UI.C.inkFaint : (big ? UI.C.ink : UI.C.inkDim);
    if (r.locked && big) {
      UI.padlock(ctx, x + w / 2 - 22, y + h / 2, 1, UI.C.inkDim);
      UI.text(ctx, r.name, x + w / 2 + 8, y + 9, { align: 'center', scale: 2, colour: colour });
    } else if (big) {
      UI.text(ctx, r.name, x + w / 2, y + 9, { align: 'center', scale: 2, colour: colour });
    } else {
      UI.text(ctx, r.name, x + w / 2, y + 12, { align: 'center', colour: colour });
    }
  }

  /* `dir` is -1 / 0 / +1, which side of the carousel this card is on. Only a
     cursor cares: it is what lets the card under the pointer light its frame
     without lighting its neighbour's. */
  function drawCard(ctx, lv, rc, big, dir) {
    var x = rc.x, y = rc.y, w = rc.w, h = rc.h;
    /* on touch the big card is always the thing you press, so it is always
       the lit one - see drawRoomSlot */
    var active = big && (UI.touch() || focus === 'level');
    var over = Input.hovering('card', dir);
    /* three states: never built (`locked`), built but not yet earned
       (`unlock`), and open. A placeholder shows nothing; an unearned level
       shows what it is and what it costs, the way a boarded doodad stall
       does - you cannot want something you cannot see. */
    var open = Levels.isUnlocked(lv);
    var frame = lv.locked ? UI.C.inkFaint
              : (!open ? (over ? UI.C.goldDark : UI.C.inkDim)
                       : (active ? UI.C.gold : (over ? UI.C.goldDark : UI.C.inkDim)));

    /* drop shadow + frame */
    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x + 2, y + 3, w, h);
    UI.panel(ctx, x, y, w, h, { fill: '#100c08', edge: frame, corner: lv.locked ? null : frame });

    var inset = big ? 4 : 3;
    var px = x + inset, py = y + inset, pw = w - inset * 2;
    var titleH = big ? 28 : 12;
    var ph = h - inset * 2 - titleH;

    if (lv.locked) {
      Dither.rect(ctx, px, py, pw, ph, '#241a12', 16);
      Dither.rect(ctx, px, py, pw, ph, UI.C.darker, 8);
      UI.padlock(ctx, px + pw / 2, py + ph / 2, big ? 2 : 1, UI.C.inkDim);
      UI.text(ctx, '? ? ?', x + w / 2, py + ph + (big ? 8 : 3),
              { align: 'center', scale: big ? 2 : 1, colour: UI.C.inkFaint });
      return;
    }

    drawPreview(ctx, px, py, pw, ph, big, lv);

    if (!open) {
      /* the bed is there behind the gate; it is just shut */
      Tint.rect(ctx, px, py, pw, ph, UI.C.darker, 10);
      var req = Levels.requirement(lv);
      UI.padlock(ctx, px + pw / 2, py + ph / 2 - (big ? 6 : 0), big ? 2 : 1,
                 denyShake > 0 ? UI.C.red : UI.C.inkDim);
      if (big && req) {
        UI.text(ctx, 'SCORE ' + req.score, px + pw / 2, py + ph - 26,
                { align: 'center', colour: denyShake > 0 ? UI.C.red : UI.C.gold });
        UI.text(ctx, 'IN ' + req.name, px + pw / 2, py + ph - 16,
                { align: 'center', colour: UI.C.inkDim });
        /* how far off it is */
        var bw = pw - 24, bx = px + 12, by = py + ph - 6;
        ctx.fillStyle = UI.C.inkFaint; ctx.fillRect(bx, by, bw, 5);
        ctx.fillStyle = UI.C.darker;   ctx.fillRect(bx + 1, by + 1, bw - 2, 3);
        var fw = Math.round((bw - 2) * clamp(req.have / req.score, 0, 1));
        if (fw > 0) {
          ctx.fillStyle = UI.C.goldDark; ctx.fillRect(bx + 1, by + 1, fw, 3);
          ctx.fillStyle = UI.C.gold;     ctx.fillRect(bx + 1, by + 1, fw, 1);
        }
      }
    }

    /* name plate */
    var ny = py + ph + 2;
    Dither.rect(ctx, px, ny, pw, titleH - 2, UI.C.darker, 14);
    if (big) {
      /* the plate, less a pixel of air at each end - see fitTitle */
      var fit = fitTitle(lv.name, pw - 2);
      UI.text(ctx, lv.name, x + w / 2, ny + 1 + (fit.scale === 1 ? 4 : 0),
              { align: 'center', scale: fit.scale, spacing: fit.spacing,
                colour: !open ? UI.C.inkDim : (active ? UI.C.gold : UI.C.ink) });
      /* The one commit verb, written on the one card it belongs to. A phone
         has no ENTER and no footer to read it off, so the lit card says what
         pressing it does; a keyboard keeps the level's code, which is what
         the footer's ENTER PLAY is talking about. */
      if (open && UI.touch()) {
        UI.text(ctx, 'TAP TO PLAY', px + 2, ny + 18, { colour: UI.C.gold });
      } else {
        UI.text(ctx, lv.code, px + 2, ny + 18, { colour: UI.C.inkDim });
      }
      if (open) {
        UI.text(ctx, 'HI ' + Scores.top(room(roomIndex), lv), px + pw - 2, ny + 18,
                { align: 'right', colour: UI.C.inkDim });
      } else {
        UI.text(ctx, 'LOCKED', px + pw - 2, ny + 18, { align: 'right', colour: UI.C.inkFaint });
      }
    } else {
      /* the small cards are only 1 scale to begin with, but a long name
         still has to stop at the frame */
      var sn = lv.name;
      if (Font.measure(sn, 1) > pw - 4) {
        while (sn.length > 4 && Font.measure(sn + '.', 1) > pw - 4) sn = sn.slice(0, -1);
        sn += '.';
      }
      UI.text(ctx, sn, x + w / 2, ny + 1, { align: 'center', colour: UI.C.inkDim });
    }
  }

  /* a small live window into the level */
  function drawPreview(ctx, x, y, w, h, big, lv) {
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    /* a level can paint its own cover; the generic one below is the Coop's
       shapes, which read as neither level once it is recoloured */
    if (lv && lv.art && lv.art.drawPreview) {
      lv.art.drawPreview(ctx, x, y, w, h, t, big);
      ctx.restore();
      return;
    }
    /* every level publishes the handful of colours this window needs, so
       the Garden's card is not painted in the Coop's browns */
    var P = (lv && lv.art && lv.art.PREVIEW) || Coop.PREVIEW;
    var s = t * 24;
    var ceil = y + 6, floor = y + h - 9;

    /* back wall */
    ctx.fillStyle = P.back; ctx.fillRect(x, y, w, h);
    for (var i = -1; i < w / 11 + 1; i++) {
      var sx = Math.round(x + i * 11 - (s * 0.25) % 11);
      ctx.fillStyle = (i % 2) ? P.backAlt : P.back;
      ctx.fillRect(sx, y, 10, h);
      ctx.fillStyle = P.seam; ctx.fillRect(sx, y, 1, h);
    }
    Tint.rect(ctx, x, y, w, Math.round(h * 0.5), P.air, 1);
    Tint.rect(ctx, x, y + h - 30, w, 30, P.gloom, 3);

    /* rafters and hay */
    ctx.fillStyle = P.beam; ctx.fillRect(x, y, w, 6);
    ctx.fillStyle = P.beamDark; ctx.fillRect(x, y + 4, w, 2);
    ctx.fillStyle = P.ground; ctx.fillRect(x, floor, w, y + h - floor);
    Tint.rect(ctx, x, floor, w, y + h - floor, P.groundDark, 7);
    ctx.fillStyle = P.groundHi; ctx.fillRect(x, floor, w, 1);

    /* plank pairs sliding past, with a gap you could fly through */
    var period = 40;
    var span = floor - ceil;
    for (var k = 0; k < 4; k++) {
      var ox = Math.round(x + w + 12 - ((s + k * period) % (period * 4)));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.34);
      var gapY = Math.round(ceil + 6 + ((k * 17) % Math.max(1, span - gapH - 12)));
      planklet(ctx, ox, ceil, gapY - ceil, P);
      planklet(ctx, ox, gapY + gapH, floor - gapY - gapH, P);
    }

    /* nails poking out of the bedding */
    for (var n = 0; n < 3; n++) {
      var nx = Math.round(x + w - ((s * 1 + n * 53) % (w + 30)));
      if (nx < x || nx > x + w - 2) continue;
      ctx.fillStyle = P.spike;
      ctx.fillRect(nx, floor - 5, 1, 5);
      ctx.fillRect(nx + 2, floor - 7, 1, 7);
      ctx.fillStyle = P.spikeHi;
      ctx.fillRect(nx + 2, floor - 8, 2, 1);
    }

    /* a doodad silhouette flying it */
    var bx = Math.round(x + w * 0.32);
    var by = Math.round(y + h / 2 + Math.sin(t * 3.1) * (h * 0.18));
    var sz = big ? 7 : 5;
    ctx.fillStyle = '#20150c';
    ctx.fillRect(bx - sz / 2 - 1, by - sz / 2 - 1, sz + 2, sz + 2);
    ctx.fillStyle = '#c9873c';
    ctx.fillRect(bx - sz / 2, by - sz / 2, sz, sz);
    ctx.fillStyle = '#eab873';
    ctx.fillRect(bx - sz / 2, by - sz / 2, sz - 2, 1);
    ctx.fillStyle = '#20150c';
    ctx.fillRect(bx + sz / 2 - 2, by - 1, 1, 1);
    ctx.fillStyle = '#f3cc84';
    ctx.fillRect(bx + sz / 2, by, 2, 1);

    Tint.rect(ctx, x, y, w, h, P.air, 1);
    ctx.restore();
  }

  /* One little plank column inside a preview, painted from the PREVIEW
     palette it was handed.

     This used to reach for `Coop.P` and ask it for `beam`, which the Coop's
     pigment table does not have - it calls that colour `beamMid`, and only
     PREVIEW publishes it as `beam`. Assigning undefined to fillStyle is a
     no-op rather than an error, so the column kept whatever colour was set
     last, which is the hay highlight two lines above the loop: the Coop's
     planks came out near-white. Take the palette as an argument, so a
     missing key is a missing key on the level that owns it. */
  function planklet(ctx, x, y, h, P) {
    if (h <= 0) return;
    ctx.fillStyle = P.beam; ctx.fillRect(x, y, 10, h);
    ctx.fillStyle = P.beamLight; ctx.fillRect(x + 1, y, 2, h);
    ctx.fillStyle = P.beamDark; ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 9, y, 1, h);
  }

  return { enter: enter, update: update, drawBg: drawBg, drawFg: drawFg,
           targets: function () { return hot; } };
})();
