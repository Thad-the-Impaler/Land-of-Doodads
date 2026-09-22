/* ------------------------------------------------------------------
   Land of Doodads - keyboard input
   Actions are edge-triggered: FLY only fires on a fresh key press, so
   holding UP does nothing (same rule as Flappy Bird).
------------------------------------------------------------------ */
'use strict';

var Input = (function () {

  var MAP = {
    'ArrowUp': 'up', 'KeyW': 'up', 'Space': 'up',
    'ArrowDown': 'down', 'KeyS': 'down',
    'ArrowLeft': 'left', 'KeyA': 'left',
    'ArrowRight': 'right', 'KeyD': 'right',
    'Enter': 'confirm', 'NumpadEnter': 'confirm',
    'Escape': 'back', 'Backspace': 'back',
    'KeyP': 'pause',
    'KeyM': 'mute',
    'KeyF': 'fullscreen',
    'KeyX': 'erase', 'Delete': 'erase'
  };

  var held = {};          // action -> true while a key for it is down
  var pressed = {};       // action -> true for exactly one frame
  var repeatTimer = {};   // action -> seconds until the next auto-repeat
  var anyPressed = false;
  var downCodes = {};

  var REPEAT_DELAY = 0.34, REPEAT_RATE = 0.10;

  /* while typing initials, letter and number keys type instead of acting:
     otherwise spelling "MAF" would mute, go fullscreen, then walk left */
  var textMode = false;
  var typed = [];

  /* Typed codes, watched here rather than in a scene because a code has
     to work on every screen, and this is the only place that sees every
     keystroke - including while textMode is swallowing letters for the
     initials entry. Space and backspace come back from textChar as ' '
     and '\b', which is what breaks a part-typed sequence. */
  var codes = [];                 // { seq, fn, buf }

  /* Returns true when this key is part way through (or completes) a
     watched code, so the caller can stop it also doing its normal job:
     typing IMP11 would otherwise mute on the M and pause on the P. Only
     a run that really is heading for the code claims a key, so pressing
     M or P on their own still mutes and pauses as always. */
  function sniffCodes(code) {
    if (!codes.length) return false;
    var ch = textChar(code);
    if (ch === null) return false;
    var claim = false;
    for (var i = 0; i < codes.length; i++) {
      var c = codes[i];
      c.buf = (c.buf + ch).slice(-c.seq.length);
      if (c.buf === c.seq) { c.buf = ''; claim = true; c.fn(); continue; }
      /* any tail of what has been typed still heading for the code */
      for (var k = 0; k < c.buf.length; k++) {
        if (c.seq.indexOf(c.buf.slice(k)) === 0) { claim = true; break; }
      }
    }
    return claim;
  }

  function textChar(code) {
    if (/^Key[A-Z]$/.test(code)) return code.charAt(3);
    if (/^Digit[0-9]$/.test(code)) return code.charAt(5);
    if (/^Numpad[0-9]$/.test(code)) return code.charAt(6);
    if (code === 'Space') return ' ';
    if (code === 'Backspace') return '\b';
    return null;
  }

  function onKeyDown(e) {
    var claimed = !e.repeat && sniffCodes(e.code);
    if (textMode) {
      var ch = textChar(e.code);
      if (ch !== null) {
        /* letters mean letters here, so they are NOT swallowed - the
           code still counts up in the background and can fire */
        e.preventDefault();
        if (!e.repeat || ch === '\b') typed.push(ch);
        Audio3.unlock();
        return;
      }
    }
    if (claimed) { e.preventDefault(); Audio3.unlock(); return; }
    var action = MAP[e.code];
    if (!action) return;
    /* swallow browser scrolling / back navigation */
    if (e.code === 'Space' || e.code.indexOf('Arrow') === 0 || e.code === 'Backspace') e.preventDefault();
    if (e.repeat) return;                       // our own repeat logic instead
    if (downCodes[e.code]) return;
    downCodes[e.code] = action;
    held[action] = true;
    pressAction(action);
    /* a key means the pads are in the way rather than in use */
    pointerSeen = false; pointerKind = null; hoverAction = null;
    Audio3.unlock();
  }

  /* everything that has to happen when an action fires, whoever fired it */
  function pressAction(action) {
    pressed[action] = true;
    anyPressed = true;
    repeatTimer[action] = REPEAT_DELAY;
  }

  /* ----------------------------------------------------------- pointers

     Touch does not get its own path through the game, and neither does the
     mouse. Both produce the same actions the keys do - 'up', 'left',
     'confirm' and the rest - so every scene reads Input exactly as it
     always has and none of them had to learn what a finger or a cursor is.
     A click is simply a one-fingered touch that can also hover, so it runs
     through the very same begin/move/end below: there is one zone map and
     one set of rules, and a desktop cannot drift away from a phone.

     Which part of the screen means what depends on the mode, because a tap
     in the middle means "flap" in a run and "choose this" in a menu. Scenes
     set the mode; the pads are drawn from this same table, so what is drawn
     and what is listened to can never drift apart.                      */

  var PAD = 44, PAD_Y = 216, EDGE = 8;

  var ZONES = {
    play: [
      { a: 'left',  x: EDGE,          y: PAD_Y, w: PAD, h: PAD, icon: '\u25C0' },
      { a: 'right', x: EDGE + PAD + 6, y: PAD_Y, w: PAD, h: PAD, icon: '\u25B6' },
      { a: 'pause', x: VW - 38,       y: 6,     w: 32, h: 26,   icon: 'II', small: true },
      { a: 'up',    rest: true }
    ],
    menu: [
      { a: 'left',  x: EDGE,          y: PAD_Y, w: PAD, h: PAD, icon: '\u25C0' },
      { a: 'right', x: EDGE + PAD + 6, y: PAD_Y, w: PAD, h: PAD, icon: '\u25B6' },
      { a: 'back',  x: VW - EDGE - 54, y: PAD_Y, w: 54, h: PAD, label: 'BACK' },
      { a: 'confirm', rest: true }
    ],
    text: [
      { a: 'left',  x: EDGE,           y: PAD_Y, w: PAD, h: PAD, icon: '\u25C0' },
      { a: 'right', x: EDGE + PAD + 6, y: PAD_Y, w: PAD, h: PAD, icon: '\u25B6' },
      { a: 'up',    x: 196,            y: PAD_Y, w: PAD, h: PAD, icon: '\u25B2' },
      { a: 'down',  x: 196 + PAD + 6,  y: PAD_Y, w: PAD, h: PAD, icon: '\u25BC' },
      { a: 'confirm', x: VW - EDGE - 54, y: PAD_Y, w: 54, h: PAD, label: 'SAVE' }
    ]
  };

  var touchMode = 'menu';
  var pointerSeen = false;        /* is anything pointing, so draw the pads  */
  var pointerKind = null;         /* 'touch' | 'mouse' | null, for wording   */
  var points = {};                /* point id -> the action it is holding    */
  var touchHeld = {};             /* action -> held by at least one point    */
  var hoverAction = null;         /* what the cursor is over; a mouse only   */

  var MOUSE = 'mouse';            /* the cursor's id in `points`. Touch ids
                                     are numbers, so they cannot collide.    */

  /* A phone fires a synthetic mousedown a moment after a tap, which would
     otherwise flap twice and turn the pads into a mouse. preventDefault on
     the touch usually suppresses it, but not on a non-cancelable listener,
     so this swallows it outright. It decays in update() rather than reading
     a clock, because a frame is the only time this file believes in. */
  var TOUCH_GUARD = 0.5;
  var touchGuard = 0;

  /* The pads follow whatever you used last: click and they appear, press a
     key and they get out of the way again. A phone never presses a key, so
     nothing about touch changes. */
  function usePointer(kind) { pointerSeen = true; pointerKind = kind; }

  function zoneAt(x, y) {
    var list = ZONES[touchMode] || ZONES.menu;
    var rest = null;
    for (var i = 0; i < list.length; i++) {
      var z = list[i];
      if (z.rest) { rest = z; continue; }
      if (x >= z.x && x <= z.x + z.w && y >= z.y && y <= z.y + z.h) return z;
    }
    return rest;
  }

  function rebuildTouchHeld() {
    touchHeld = {};
    for (var id in points) if (points[id]) touchHeld[points[id]] = true;
  }

  /* one point going down, whatever put it there */
  function beginPoint(id, clientX, clientY) {
    var v = Screen.toVirtual(clientX, clientY);
    if (!v) return false;
    var z = zoneAt(v.x, v.y);
    if (!z) return false;
    points[id] = z.a;
    pressAction(z.a);
    return true;
  }

  /* sliding off a pad releases it and sliding onto another takes it, so a
     thumb - or a held mouse button - can travel from left to right without
     lifting */
  function movePoint(id, clientX, clientY) {
    if (!(id in points)) return;
    var v = Screen.toVirtual(clientX, clientY);
    if (!v) return;
    var z = zoneAt(v.x, v.y);
    var now = z ? z.a : null;
    if (now === points[id]) return;
    points[id] = now;
    /* the big rest-of-screen zone is a tap, not a hold: do not re-fire it */
    if (now === 'left' || now === 'right') pressAction(now);
  }

  function onTouchStart(e) {
    usePointer('touch');
    touchGuard = TOUCH_GUARD;
    Audio3.unlock();
    for (var i = 0; i < e.changedTouches.length; i++) {
      var t = e.changedTouches[i];
      beginPoint(t.identifier, t.clientX, t.clientY);
    }
    rebuildTouchHeld();
    if (e.cancelable) e.preventDefault();
  }

  function onTouchMove(e) {
    for (var i = 0; i < e.changedTouches.length; i++) {
      var t = e.changedTouches[i];
      movePoint(t.identifier, t.clientX, t.clientY);
    }
    rebuildTouchHeld();
    if (e.cancelable) e.preventDefault();
  }

  function onTouchEnd(e) {
    touchGuard = TOUCH_GUARD;
    for (var i = 0; i < e.changedTouches.length; i++) delete points[e.changedTouches[i].identifier];
    rebuildTouchHeld();
    if (e.cancelable) e.preventDefault();
  }

  /* ------------------------------------------------------------- mouse

     The left button is the finger. Everything else here exists because a
     cursor can do two things a finger cannot: hover over a pad without
     pressing it, and leave the window still holding the button down. */

  function onMouseDown(e) {
    if (e.button !== 0 || touchGuard > 0) return;
    usePointer('mouse');
    Audio3.unlock();
    if (!beginPoint(MOUSE, e.clientX, e.clientY)) return;
    rebuildTouchHeld();
    /* so a click-and-drag across the game does not turn into a text
       selection of the page underneath it */
    e.preventDefault();
  }

  function onMouseMove(e) {
    if (touchGuard > 0) return;
    var v = Screen.toVirtual(e.clientX, e.clientY);
    var z = v ? zoneAt(v.x, v.y) : null;
    /* only the drawn pads light up - the rest-of-screen zone is the whole
       playfield, and lighting that up would mean lighting up everything */
    hoverAction = (z && !z.rest) ? z.a : null;
    if (!(MOUSE in points)) return;
    movePoint(MOUSE, e.clientX, e.clientY);
    rebuildTouchHeld();
  }

  function onMouseUp(e) {
    if (e.button !== 0) return;
    delete points[MOUSE];
    rebuildTouchHeld();
  }

  /* the cursor leaving the window is a release: otherwise a button let go
     out there would leave a pad held down for ever */
  function onMouseOut(e) {
    if (e.relatedTarget || e.toElement) return;    // still inside the page
    delete points[MOUSE];
    hoverAction = null;
    rebuildTouchHeld();
  }

  function onKeyUp(e) {
    var action = downCodes[e.code];
    if (!action) return;
    delete downCodes[e.code];
    /* an action can be bound to several keys - only release when all are up */
    for (var code in downCodes) if (downCodes[code] === action) return;
    held[action] = false;
  }

  function init() {
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('keyup', onKeyUp);
    var opt = { passive: false };
    window.addEventListener('touchstart', onTouchStart, opt);
    window.addEventListener('touchmove', onTouchMove, opt);
    window.addEventListener('touchend', onTouchEnd, opt);
    window.addEventListener('touchcancel', onTouchEnd, opt);
    window.addEventListener('mousedown', onMouseDown, opt);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseout', onMouseOut);
    window.addEventListener('blur', function () {
      held = {}; downCodes = {};
      points = {}; touchHeld = {}; hoverAction = null;
    });
  }

  /* called once per frame, before scene updates */
  function update(dt) {
    if (touchGuard > 0) touchGuard -= dt;
    for (var action in repeatTimer) {
      if (!held[action]) continue;
      repeatTimer[action] -= dt;
      if (repeatTimer[action] <= 0) {
        repeatTimer[action] = REPEAT_RATE;
        /* only menu navigation auto-repeats */
        if (action === 'up' || action === 'down' || action === 'left' || action === 'right') {
          pressed[action] = 'repeat';
        }
      }
    }
  }

  /* called once per frame, after scene updates */
  function endFrame() {
    pressed = {};
    anyPressed = false;
    typed.length = 0;
  }

  function setTextMode(on) {
    textMode = !!on;
    typed.length = 0;
  }

  return {
    init: init,
    update: update,
    endFrame: endFrame,
    down: function (a) { return !!held[a] || !!touchHeld[a]; },
    /* fresh press only - used for flying and for confirming */
    hit: function (a) { return pressed[a] === true; },
    /* fresh press or auto-repeat - used for menu movement */
    nav: function (a) { return !!pressed[a]; },
    anyHit: function () { return anyPressed; },
    /* text entry: letters/digits typed this frame, '\b' for backspace */
    setTextMode: setTextMode,
    typed: function () { return typed.slice(); },
    /* watch for a sequence typed anywhere; fn fires the moment it lands */
    watchCode: function (seq, fn) { codes.push({ seq: seq, fn: fn, buf: '' }); },

    /* ---- touch ---- */
    setTouchMode: function (m) { if (ZONES[m]) touchMode = m; },
    touchMode: function () { return touchMode; },
    /* true once a finger or a cursor has been used on the game: the
       on-screen pads stay out of the way until there is a reason to
       believe in them, and step back out of it at the next keypress */
    pointing: function () { return pointerSeen; },
    /* 'touch' | 'mouse' | null. Only for wording and for the turn-it-
       sideways notice, which is a phone's problem and not a cursor's. */
    pointerKind: function () { return pointerKind; },
    /* the verb for whatever is pointing, so a hint reads right either way */
    tapWord: function () { return pointerKind === 'mouse' ? 'CLICK' : 'TAP'; },
    pads: function () { return ZONES[touchMode] || ZONES.menu; },
    padHeld: function (a) { return !!touchHeld[a]; },
    padHover: function (a) { return hoverAction === a; }
  };
})();
