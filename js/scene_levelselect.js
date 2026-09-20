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
  var ROOM = { w: 152, h: 24, y: 14 };
  var SIDEROOM = { w: 86, h: 16, y: 18 };

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

  function drawFg(ctx) {
    var shakeX = denyShake > 0 ? Math.round(Math.sin(t * 60) * 2) : 0;

    /* ---- rooms ---- */
    var rx = VW / 2 + slideRoom + (focus === 'room' ? shakeX : 0);
    drawRoomSlot(ctx, roomAt(roomIndex - 1), rx - ROOM.w / 2 - SIDEROOM.w - 26, SIDEROOM.y, SIDEROOM.w, SIDEROOM.h, false);
    drawRoomSlot(ctx, roomAt(roomIndex + 1), rx + ROOM.w / 2 + 26, SIDEROOM.y, SIDEROOM.w, SIDEROOM.h, false);
    drawRoomSlot(ctx, room(roomIndex), rx - ROOM.w / 2, ROOM.y, ROOM.w, ROOM.h, true);

    if (roomIndex > 0) UI.chevron(ctx, rx - ROOM.w / 2 - 10 - arrowBob(), ROOM.y + ROOM.h / 2, -1, 5,
                                  focus === 'room' ? UI.C.gold : UI.C.inkFaint);
    if (roomIndex < Levels.rooms.length - 1) UI.chevron(ctx, rx + ROOM.w / 2 + 10 + arrowBob(), ROOM.y + ROOM.h / 2, 1, 5,
                                  focus === 'room' ? UI.C.gold : UI.C.inkFaint);

    UI.text(ctx, 'ROOM', rx, ROOM.y - 9, { align: 'center', colour: focus === 'room' ? UI.C.ink : UI.C.inkFaint });

    /* ---- levels ---- */
    var r = room(roomIndex);
    var lx = VW / 2 + slideLevel + (focus === 'level' ? shakeX : 0);
    var leftLv = levelIndex > 0 ? r.levels[levelIndex - 1] : null;
    var rightLv = levelIndex < r.levels.length - 1 ? r.levels[levelIndex + 1] : null;

    if (leftLv) drawCard(ctx, leftLv, lx - CARD.w / 2 - SIDE.w - 20, SIDE.y, SIDE.w, SIDE.h, false);
    if (rightLv) drawCard(ctx, rightLv, lx + CARD.w / 2 + 20, SIDE.y, SIDE.w, SIDE.h, false);
    drawCard(ctx, level(roomIndex, levelIndex), lx - CARD.w / 2, CARD.y, CARD.w, CARD.h, true);

    if (leftLv) UI.chevron(ctx, lx - CARD.w / 2 - 9 - arrowBob(), CARD.y + CARD.h / 2, -1, 6,
                           focus === 'level' ? UI.C.gold : UI.C.inkFaint);
    if (rightLv) UI.chevron(ctx, lx + CARD.w / 2 + 9 + arrowBob(), CARD.y + CARD.h / 2, 1, 6,
                            focus === 'level' ? UI.C.gold : UI.C.inkFaint);

    /* ---- the strip under everything ---- */
    var lv = level(roomIndex, levelIndex);
    Tint.rect(ctx, 0, VH - 46, VW, 46, UI.C.darker, 12);
    UI.rule(ctx, 30, VH - 46, VW - 60, UI.C.inkFaint);
    if (lv.blurb) {
      UI.text(ctx, lv.blurb[0], VW / 2, VH - 40, { align: 'center', colour: UI.C.inkDim });
      if (lv.blurb[1]) UI.text(ctx, lv.blurb[1], VW / 2, VH - 31, { align: 'center', colour: UI.C.inkDim });
    }

    var hintY = VH - 13;
    if (focus === 'room') {
      UI.text(ctx, Input.usingTouch() ? '◀ ▶ ROOM    TAP TO PICK    BACK'
                                      : '◀ ▶ ROOM    ENTER PICK ROOM    ESC BACK',
              VW / 2, hintY, { align: 'center', colour: UI.C.inkDim });
    } else {
      var shut = lv.locked || !Levels.isUnlocked(lv);
      var touch = Input.usingTouch();
      UI.text(ctx, shut ? (touch ? '◀ ▶ LEVEL    LOCKED    BACK' : '◀ ▶ LEVEL    LOCKED    ESC ROOMS')
                        : (touch ? '◀ ▶ LEVEL    TAP TO PLAY    BACK' : '◀ ▶ LEVEL    ENTER PLAY    ESC ROOMS'),
              VW / 2, hintY, { align: 'center', colour: UI.C.inkDim });
    }
  }

  function arrowBob() { return Math.round((Math.sin(t * 5) + 1) * 0.5 + 0.2); }

  function drawRoomSlot(ctx, r, x, y, w, h, big) {
    if (!r) return;
    var active = big && focus === 'room';
    if (big) {
      UI.board(ctx, x, y, w, h, { highlight: active ? UI.C.gold : null });
    } else {
      UI.panel(ctx, x, y, w, h, { fill: '#2b1e12', edge: UI.C.inkFaint, dither: 6 });
    }
    var colour = r.locked ? UI.C.inkFaint : (big ? UI.C.ink : UI.C.inkDim);
    if (r.locked && big) {
      UI.padlock(ctx, x + w / 2 - 22, y + h / 2, 1, UI.C.inkDim);
      UI.text(ctx, r.name, x + w / 2 + 8, y + (h - 14) / 2, { align: 'center', scale: 2, colour: colour });
    } else if (big) {
      UI.text(ctx, r.name, x + w / 2, y + (h - 14) / 2, { align: 'center', scale: 2, colour: colour });
    } else {
      UI.text(ctx, r.name, x + w / 2, y + (h - 7) / 2, { align: 'center', colour: colour });
    }
  }

  function drawCard(ctx, lv, x, y, w, h, big) {
    x = Math.round(x); y = Math.round(y);
    var active = big && focus === 'level';
    /* three states: never built (`locked`), built but not yet earned
       (`unlock`), and open. A placeholder shows nothing; an unearned level
       shows what it is and what it costs, the way a boarded doodad stall
       does - you cannot want something you cannot see. */
    var open = Levels.isUnlocked(lv);
    var frame = lv.locked ? UI.C.inkFaint
              : (!open ? UI.C.inkDim : (active ? UI.C.gold : UI.C.inkDim));

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
      UI.text(ctx, lv.name, x + w / 2, ny + 1, { align: 'center', scale: 2,
              colour: !open ? UI.C.inkDim : (active ? UI.C.gold : UI.C.ink) });
      UI.text(ctx, lv.code, px + 2, ny + 18, { colour: UI.C.inkDim });
      if (open) {
        UI.text(ctx, 'HI ' + Scores.top(room(roomIndex), lv), px + pw - 2, ny + 18,
                { align: 'right', colour: UI.C.inkDim });
      } else {
        UI.text(ctx, 'LOCKED', px + pw - 2, ny + 18, { align: 'right', colour: UI.C.inkFaint });
      }
    } else {
      UI.text(ctx, lv.name, x + w / 2, ny + 1, { align: 'center', colour: UI.C.inkDim });
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
      planklet(ctx, ox, ceil, gapY - ceil);
      planklet(ctx, ox, gapY + gapH, floor - gapY - gapH);
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

  /* one little plank column inside a preview */
  function planklet(ctx, x, y, h) {
    if (h <= 0) return;
    var P = Coop.P;
    ctx.fillStyle = P.beam; ctx.fillRect(x, y, 10, h);
    ctx.fillStyle = P.beamLight; ctx.fillRect(x + 1, y, 2, h);
    ctx.fillStyle = P.beamDark; ctx.fillRect(x, y, 1, h); ctx.fillRect(x + 9, y, 1, h);
  }

  return { enter: enter, update: update, drawBg: drawBg, drawFg: drawFg };
})();
