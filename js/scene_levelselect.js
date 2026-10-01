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
  var roomIndex = 0, levelIndex = 0;
  var slideRoom = 0, slideLevel = 0;  /* animated offsets for carousel movement */
  var denyShake = 0;
  /* Rooms that have come open since the player last looked at them, by id.
     The doodad stalls have had this since there were doodads to earn, and
     for the same reason: a plate that has read `? ? ?` for a hundred runs
     reads as permanent scenery, and without a tag on it nobody ever finds
     out it stopped saying that. Its twin save key is the stalls' 'seen'. */
  var freshRooms = [];

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
  /* EVERY read of a room's bays on this screen goes through Levels.levelsOf,
     never through room.levels. A shut room hands over three placeholders
     instead of its own cards, so a level behind a door the player has not
     opened cannot reach drawCard, cannot reach drawPreview, and cannot be
     counted - the number of bays in there is not readable off the front of
     it either. */
  function levelsIn(ri) { return Levels.levelsOf(room(ri)); }

  function level(ri, li) {
    var list = levelsIn(ri);
    return list[clamp(li, 0, list.length - 1)];
  }

  function enter(params) {
    t = 0;
    roomIndex = Game.selection.room;
    levelIndex = Game.selection.level;
    focus = (params && params.focus) || 'room';
    slideRoom = slideLevel = 0;
    denyShake = 0;
    markFreshRooms();
  }

  /* Game calls this when the unlock state changes under the scene - which
     on this screen means IMP11 typed into it. The plate flips from `? ? ?`
     to LIVING ROOM and is tagged NEW in the same frame, because a room that
     opens while you are looking at it is exactly as new as one that opens
     mid-run. */
  function refresh() {
    Levels.refresh();
    markFreshRooms();
  }

  function markFreshRooms() {
    var seen = Save.get('seen.rooms', []);
    if (!Array.isArray(seen)) seen = [];
    freshRooms = [];
    for (var i = 0; i < Levels.rooms.length; i++) {
      var r = Levels.rooms[i];
      /* Only a room that had to be EARNED can be new. The Backyard was
         never unlocked, it was always the room you were standing in - and
         `unlock` rather than a score is the question, for the same reason
         the stalls ask for a requirement: not every lock is a score. */
      if (r.unlock && Levels.roomOpen(r) && seen.indexOf(r.id) < 0) freshRooms.push(r.id);
    }
  }

  /* The tag comes off a room on MOVEMENT or on COMMITMENT, whichever
     happens first - moveRoom below, focusLevels and exit here.

     Movement alone was not enough. A room can come open while the
     carousel is already sitting on it (IMP11 typed into this screen, or a
     run that crosses 20 and drops the player back onto the plate they
     were last on), and then there is no move left to make: the player
     reads LIVING ROOM, goes down into its cards, plays all four, and the
     gold tab is still there the next time and the time after that, for
     ever. Going down to the cards is a reading of the name every bit as
     much as arriving on it is, and so is walking away from the screen. */
  function clearNewRoom(r) {
    if (!r) return;
    var at = freshRooms.indexOf(r.id);
    if (at < 0) return;
    freshRooms.splice(at, 1);
    var seen = Save.get('seen.rooms', []);
    if (!Array.isArray(seen)) seen = [];
    if (seen.indexOf(r.id) < 0) { seen.push(r.id); Save.set('seen.rooms', seen); }
  }

  /* Down from the plate to the cards, from wherever the focus was. Every
     way of getting there goes through here - the down key, ENTER on an
     open room, and a finger on a card - so the tag comes off on all three
     and not just on the one that happened to be tested. */
  function focusLevels() {
    if (focus === 'room') clearNewRoom(room(roomIndex));
    focus = 'level';
  }

  /* Game.goInstant calls this if a scene has one. The last chance to take
     the tag off: a player who opened the room, looked at it and pressed
     ESC has still read the name. */
  function exit() {
    clearNewRoom(room(roomIndex));
  }

  function moveRoom(dir) {
    var next = roomIndex + dir;
    if (next < 0 || next >= Levels.rooms.length) { deny(); return; }
    roomIndex = next;
    var r = room(roomIndex);
    var list = levelsIn(roomIndex);
    /* startLevel is a statement about a room's OWN bays - "open on THE
       COOP", "open on THE DESK" - so it only means anything once the player
       can see them. A shut room is three placeholders and opens on the
       middle one, exactly as the built-later placeholder always has. */
    var open = Levels.roomOpen(r);
    levelIndex = (open && r.startLevel !== undefined) ? r.startLevel
                                                      : Math.floor(list.length / 2);
    slideRoom = dir * 26;
    clearNewRoom(r);
    Audio3.play('move');
  }

  function moveLevel(dir) {
    var list = levelsIn(roomIndex);
    var next = levelIndex + dir;
    if (next < 0 || next >= list.length) { deny(); return; }
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
      else if (tg.id === 'card') { focusLevels(); if (tg.i) moveLevel(tg.i); }
    }

    if (focus === 'room') {
      if (Input.nav('left')) moveRoom(-1);
      if (Input.nav('right')) moveRoom(1);
      if (Input.nav('down')) { focusLevels(); Audio3.play('move'); }
      if (Input.hit('confirm')) {
        /* a shut room refuses exactly the way the placeholder does: there is
           nothing in there to pick, and saying so with a shake is the whole
           of what the player is told */
        if (!Levels.roomOpen(room(roomIndex))) deny();
        else { focusLevels(); Audio3.play('select'); }
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

     The font has two useful sizes here and nothing in between - it is drawn
     from whole pixels, so a scale of 1.5 would put half-pixel stems on some
     letters and not others - which makes the budget the only real dial.

     THE GARDEN and THE CANOPY are 118px at scale 2 and were dropping to
     scale 1, half the size, because the budget was 112. Six pixels. The
     budget is now the whole title plate, 118, which both of them fit
     exactly; they get a pixel of the card's own inset either side rather
     than a gap inside the plate, which is close but is not the plate
     overflowing.

     Squeezing the letters together was tried and taken out again: it bought
     the room but a title set tighter than every other line on the screen
     looks like a mistake, and it looked like one. Better a size that fits
     on its own terms.

     THE CONSTRUCTION ZONE fits neither and takes scale 1, which is what it
     always did. */
  function fitTitle(name, budget) {
    return { scale: Font.measure(name, 2) <= budget ? 2 : 1, spacing: 1 };
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
    var bays = levelsIn(roomIndex);
    var leftLv = levelIndex > 0 ? bays[levelIndex - 1] : null;
    var rightLv = levelIndex < bays.length - 1 ? bays[levelIndex + 1] : null;

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
    /* A room that has not been earned is a PLACEHOLDER in every pixel. It
       is drawn by the same branch that draws the never-built one, and it
       does not even carry its own name: the plate reads `? ? ?`, which is
       the same glyph the Construction Zone's card points at. A room that
       named itself while refusing to open would have told the player more
       than it was asked to. */
    var shut = !Levels.roomOpen(r);
    var nm = shut ? '? ? ?' : r.name;
    var colour = shut ? UI.C.inkFaint : (big ? UI.C.ink : UI.C.inkDim);
    var tagged = !shut && freshRooms.indexOf(r.id) >= 0;
    /* THE NAME IS NEVER SHOVED FOR THE TAG. The plate is 152 wide and
       LIVING ROOM is 130 of it at scale 2, so a tag parked INSIDE the
       frame has to come out of the name: it covered the OM, and the 13px
       shove that was supposed to get out of its way pushed the L off the
       left edge instead. Both ends overflowed to make room for 23 pixels
       of gold.

       So the tag hangs off the CORNER - see drawNewTab - and the name
       keeps the whole plate and stays centred in it, which is fitTitle's
       own rule: a size that fits on its own terms, never a squeeze. The
       padlock's shove stays, because a padlock is drawn ON the plate and
       a shut room cannot be tagged anyway. */
    if (shut && big) {
      UI.padlock(ctx, x + w / 2 - 22, y + h / 2, 1, UI.C.inkDim);
      UI.text(ctx, nm, x + w / 2 + 8, y + 9, { align: 'center', scale: 2, colour: colour });
    } else if (big) {
      UI.text(ctx, nm, x + w / 2, y + 9, { align: 'center', scale: 2, colour: colour });
    } else {
      UI.text(ctx, nm, x + w / 2, y + 12, { align: 'center', colour: colour });
    }
    /* and the tag, on the centre plate or on a side slot - wherever the
       room happens to be sitting when the player next opens this screen */
    if (tagged) drawNewTab(ctx, x, y, w);
  }

  /* The charselect's NEW tab, to the pixel: a 23x9 gold-edged box in the
     top right corner of whatever it is tagging. Copied rather than shared
     because it is nine fillRects, and the alternative is a UI helper that
     exists to be called from two places with the same three numbers.

     ON A ROOM PLATE IT STRADDLES THE FRAME rather than sitting inside it.
     A stall has empty board to spare in its corner; a plate that is 152
     wide and carries a 130px name has none, and a tab parked inside it
     ate two letters. Hung off the corner at y = sy - 4 it occupies rows
     sy-4 .. sy+4, and the name's rows start at sy+9, so the two never
     meet. Nothing is lost above it either: the ROOM caption over the
     plate is centred and never reaches the right-hand end. */
  function drawNewTab(ctx, sx, sy, sw) {
    var x = sx + sw - 26, y = sy - 4;
    ctx.fillStyle = UI.C.goldDark; ctx.fillRect(x, y, 23, 9);
    ctx.fillStyle = UI.C.gold;
    ctx.fillRect(x, y, 23, 1); ctx.fillRect(x, y + 8, 23, 1);
    ctx.fillRect(x, y, 1, 9); ctx.fillRect(x + 22, y, 1, 9);
    UI.text(ctx, 'NEW', x + 11, y + 1, { align: 'center', colour: UI.C.ink, shadow: null });
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

    /* THE ONE CLUE, and it lives on the KEY rather than on the door.

       A level that is somebody's gate says so on its own cover: SCORE 20
       HERE / OPENS ? ? ?, with the same progress bar a locked card uses.
       `? ? ?` is the same glyph as the plate to the right of the Backyard,
       and that is the one connection the player is allowed to make - it
       never names the room, never shows a cover and never says how many
       bays are behind it. It is on an OPEN card, because a card you cannot
       play yet has its own price to announce and cannot carry somebody
       else's too; and it is on the BIG card only, for the room. It
       disappears the frame the door opens, because Levels.keyFor stops
       finding a shut room to point at. */
    if (open && big) {
      var kf = Levels.keyFor(lv);
      if (kf) {
        Tint.rect(ctx, px, py + ph - 26, pw, 26, UI.C.darker, 8);
        UI.text(ctx, 'SCORE ' + kf.score + ' HERE', px + pw / 2, py + ph - 26,
                { align: 'center', colour: UI.C.gold });
        UI.text(ctx, 'OPENS ? ? ?', px + pw / 2, py + ph - 16,
                { align: 'center', colour: UI.C.inkDim });
        var kw = pw - 24, kx = px + 12, ky = py + ph - 6;
        ctx.fillStyle = UI.C.inkFaint; ctx.fillRect(kx, ky, kw, 5);
        ctx.fillStyle = UI.C.darker;   ctx.fillRect(kx + 1, ky + 1, kw - 2, 3);
        var kfw = Math.round((kw - 2) * clamp(kf.have / kf.score, 0, 1));
        if (kfw > 0) {
          ctx.fillStyle = UI.C.goldDark; ctx.fillRect(kx + 1, ky + 1, kfw, 3);
          ctx.fillStyle = UI.C.gold;     ctx.fillRect(kx + 1, ky + 1, kfw, 1);
        }
      }
    }

    /* name plate */
    var ny = py + ph + 2;
    Dither.rect(ctx, px, ny, pw, titleH - 2, UI.C.darker, 14);
    if (big) {
      /* the whole title plate is the budget - see fitTitle */
      var fit = fitTitle(lv.name, pw);
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

  return { enter: enter, exit: exit, refresh: refresh, update: update,
           drawBg: drawBg, drawFg: drawFg,
           targets: function () { return hot; } };
})();
