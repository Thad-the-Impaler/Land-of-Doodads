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

  /* Double taps, for abilities that want a gesture rather than a key.
     Only a FRESH press counts, so holding a direction never produces one
     and the menus' auto-repeat cannot fake it. */
  var DOUBLE_TAP = 0.28;
  var clock = 0;
  var lastTap = {};       // action -> clock at its last fresh press
  var doubled = {};       // action -> true for exactly one frame

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
    pressed[action] = true;
    var prev = lastTap[action];
    if (prev !== undefined && clock - prev <= DOUBLE_TAP) {
      doubled[action] = true;
      lastTap[action] = undefined;   /* a third tap starts a fresh pair */
    } else {
      lastTap[action] = clock;
    }
    anyPressed = true;
    repeatTimer[action] = REPEAT_DELAY;
    Audio3.unlock();
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
    window.addEventListener('blur', function () {
      held = {}; downCodes = {}; lastTap = {};
    });
  }

  /* called once per frame, before scene updates */
  function update(dt) {
    clock += dt;
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
    doubled = {};
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
    down: function (a) { return !!held[a]; },
    /* fresh press only - used for flying and for confirming */
    hit: function (a) { return pressed[a] === true; },
    /* fresh press or auto-repeat - used for menu movement */
    nav: function (a) { return !!pressed[a]; },
    /* two fresh presses inside DOUBLE_TAP seconds; true for one frame */
    doubleTap: function (a) { return !!doubled[a]; },
    anyHit: function () { return anyPressed; },
    /* text entry: letters/digits typed this frame, '\b' for backspace */
    setTextMode: setTextMode,
    typed: function () { return typed.slice(); },
    /* watch for a sequence typed anywhere; fn fires the moment it lands */
    watchCode: function (seq, fn) { codes.push({ seq: seq, fn: fn, buf: '' }); }
  };
})();
