/* ------------------------------------------------------------------
   Land of Doodads - display layers
     bgCanvas   480x270, nearest-neighbour  (world, obstacles, panels)
     charCanvas device resolution, smooth   (the doodads themselves)
     fgCanvas   480x270, nearest-neighbour  (hud, menus, transitions)
   The stage is always scaled by a whole number so pixels stay square.
------------------------------------------------------------------ */
'use strict';

var Screen = (function () {

  var stage, bg, ch, fg;
  var ctxBg, ctxCh, ctxFg;
  var scale = 1, dpr = 1, portrait = false;
  var shakeX = 0, shakeY = 0, shakeTime = 0, shakeAmount = 0;
  /* THE ROLL - the whole stage tilts about its centre. See roll().
     rollDeg  the swing's peak, in degrees, capped at ROLL_MAX
     rollSpan what it started at, so the envelope can decay to exactly zero
     rollLeft seconds left
     rollNow  the angle on screen right now, which toVirtual has to undo
     rollOn   whether the transform is currently written, so a roll that is
              over clears the style once instead of every frame for ever */
  var rollDeg = 0, rollSpan = 0, rollLeft = 0, rollNow = 0, rollOn = false;
  var rollFit = 1;            /* the pull-back that keeps the tilt on screen */
  var ROLL_MAX = 8, ROLL_HZ = 1.25;

  /* How far the stage has to pull BACK to tilt without losing its corners.

     A rotated box needs more room than an upright one, and the stage has
     none: it is sized to exactly VW*scale by VH*scale inside a body with
     overflow hidden, so on a phone in landscape - or fullscreen on a 16:9
     display, where the whole-number fit lands exactly - it already fills
     the viewport edge to edge. Rotating it there threw 21 virtual rows of
     the top and bottom corners off the screen, which took the spare-life
     succulents with it and, worse, the high and low ends of the next
     plank's gap as it came in from the right. A punish that hides the
     thing that is about to kill you is not a punish, it is a bug.

     So the tilt scales as it turns, by exactly the factor that fits the
     rotated box back inside the upright one. The room reads as lurching
     away from the player rather than as the camera losing its grip, which
     is what a telephone going off in your ear should feel like anyway.
     480x270 is a wide box and the height is always the binding side: at
     the Desk's peak of 5.3 degrees it is a 14% pull-back. */
  function fitFor(deg) {
    var a = Math.abs(deg) * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a);
    return Math.min(VW / (VW * cs + VH * sn), VH / (VW * sn + VH * cs));
  }

  function init() {
    stage = document.getElementById('stage');
    bg = document.getElementById('bgCanvas');
    ch = document.getElementById('charCanvas');
    fg = document.getElementById('fgCanvas');
    ctxBg = bg.getContext('2d');
    ctxFg = fg.getContext('2d');
    ctxCh = ch.getContext('2d');
    ctxBg.imageSmoothingEnabled = false;
    ctxFg.imageSmoothingEnabled = false;
    window.addEventListener('resize', resize);
    resize();
    API.ctxBg = ctxBg; API.ctxFg = ctxFg; API.ctxCh = ctxCh;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    var s = Math.min(window.innerWidth / VW, window.innerHeight / VH);
    /* Whole-number scaling keeps every pixel square, which is the whole look
       of the game - but only once there is room for 2x. Below that, rounding
       down means a phone in landscape renders a 480x270 postage stamp in the
       middle of the screen, so take the fractional fit and fill it instead.
       At phone pixel ratios the uneven pixel edges that costs are invisible. */
    scale = s >= 2 ? Math.floor(s) : Math.max(1, s);
    portrait = window.innerHeight > window.innerWidth;

    var w = Math.round(VW * scale), h = Math.round(VH * scale);
    stage.style.width = w + 'px';
    stage.style.height = h + 'px';

    var cw = Math.round(w * dpr), chh = Math.round(h * dpr);
    if (ch.width !== cw || ch.height !== chh) { ch.width = cw; ch.height = chh; }
    API.scale = scale;
    API.portrait = portrait;
  }

  /* a point from a touch or a click, in the 480x270 the game thinks in.

     It is measured from the stage's CENTRE and not from its top left, and
     the current roll is undone on the way in, because a rotated element's
     getBoundingClientRect() is its axis-aligned BOUNDING BOX: while the
     room is tilting, r.left/r.width describe a box up to 28px wider than
     the stage and a tap would land somewhere else entirely. The centre is
     the one point rotation leaves alone, offsetWidth/offsetHeight are the
     layout size and ignore the transform, and at rollNow 0 this is exactly
     the old arithmetic. */
  function toVirtual(clientX, clientY) {
    var r = stage.getBoundingClientRect();
    var w = stage.offsetWidth, h = stage.offsetHeight;
    if (!w || !h) return null;
    var dx = clientX - (r.left + r.width / 2);
    var dy = clientY - (r.top + r.height / 2);
    if (rollNow) {
      var a = -rollNow * Math.PI / 180, cs = Math.cos(a), sn = Math.sin(a);
      var rx = dx * cs - dy * sn;
      dy = dx * sn + dy * cs;
      dx = rx;
      /* and undo the pull-back, or a tap lands short of where it looks */
      dx /= rollFit; dy /= rollFit;
    }
    return { x: (dx / w + 0.5) * VW, y: (dy / h + 0.5) * VH };
  }

  function shake(amount, time) {
    if (amount > shakeAmount) { shakeAmount = amount; shakeTime = time || 0.35; }
  }

  /* THE ROLL, the one thing a stun can do that a shake cannot.

     A shake translates all three canvases by the same (shakeX, shakeY) -
     see beginFrame - so the doodad and the planks move TOGETHER, and the
     one number the player is reading, the doodad's height against the next
     gap, comes out of a shaken frame unchanged. That is why the Desk's
     ring cost about zero planks at an amplitude of 8 and would have cost
     about zero at 20: the picture jitters, the task does not.

     A rigid ROTATION about the stage's centre tilts the HORIZON instead.
     Every pixel stays honest - nothing is hidden, nothing is drawn where it
     is not, collision is untouched - but a gap dx ahead now sits dx*sin(th)
     off where the eye expects it, and at the Desk's 12px of timing room
     that error is most of the budget. It is applied as a CSS transform on
     #stage, so all three layers, the HUD and the bezel turn as one piece:
     the pixel layers are already-upscaled bitmaps by then, so nothing is
     resampled in virtual space and the dither patterns cannot boil.

     theta(t) = deg * sin(TAU*1.25*t) * (1 - t/time): two full swings over
     1.6s, the first the biggest, settling to exactly zero as the ring ends.
     ROLL_MAX exists for the same reason the shake's own cap does - a punish
     must never make the game unplayable - and 8 degrees is where a plank
     still reads. The bigger swing wins a top-up, like shake(). */
  function roll(deg, time) {
    if (!(deg > 0) || !(time > 0)) return;
    if (deg < rollDeg && rollLeft > 0) return;
    rollDeg = Math.min(deg, ROLL_MAX);
    rollSpan = time;
    rollLeft = time;
  }

  function rollStop() {
    rollDeg = rollSpan = rollLeft = rollNow = 0;
    rollFit = 1;
    if (rollOn && stage) { stage.style.transform = ''; rollOn = false; }
  }

  function updateShake(dt) {
    if (shakeTime > 0) {
      shakeTime -= dt;
      var a = shakeAmount * Math.max(0, shakeTime / 0.35);
      shakeX = Math.round(rand(-a, a));
      shakeY = Math.round(rand(-a, a));
      if (shakeTime <= 0) { shakeAmount = 0; shakeX = shakeY = 0; }
    } else { shakeX = 0; shakeY = 0; }
    if (rollLeft > 0) {
      rollLeft -= dt;
      if (rollLeft <= 0) rollStop();
      else {
        var t = rollSpan - rollLeft;
        rollNow = rollDeg * Math.sin(TAU * ROLL_HZ * t) * (rollLeft / rollSpan);
        rollFit = fitFor(rollNow);
        /* two decimals is a hundredth of a degree - a twentieth of a pixel
           across the stage, and it keeps the style string short. The scale
           rides with it so nothing is ever rotated off the screen; see
           fitFor. */
        stage.style.transform = 'rotate(' + rollNow.toFixed(2) + 'deg) scale(' +
                                rollFit.toFixed(4) + ')';
        rollOn = true;
      }
    }
  }

  function beginFrame() {
    ctxBg.setTransform(1, 0, 0, 1, 0, 0);
    ctxBg.clearRect(0, 0, VW, VH);
    ctxFg.setTransform(1, 0, 0, 1, 0, 0);
    ctxFg.clearRect(0, 0, VW, VH);
    ctxCh.setTransform(1, 0, 0, 1, 0, 0);
    ctxCh.clearRect(0, 0, ch.width, ch.height);

    /* screen shake: the pixel layers move in whole pixels only */
    ctxBg.setTransform(1, 0, 0, 1, shakeX, shakeY);
    ctxFg.setTransform(1, 0, 0, 1, shakeX, shakeY);
    var d = scale * dpr;
    ctxCh.setTransform(d, 0, 0, d, shakeX * d, shakeY * d);
    ctxCh.imageSmoothingEnabled = true;
    ctxCh.imageSmoothingQuality = 'high';
  }

  function toggleFullscreen() {
    if (document.fullscreenElement) document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen();
  }

  var API = {
    init: init, resize: resize, beginFrame: beginFrame, toVirtual: toVirtual,
    shake: shake, updateShake: updateShake, toggleFullscreen: toggleFullscreen,
    /* roll() is asked for by a stun that carries one, and rollStop() by
       anything that ends a run or leaves the scene: updateShake runs from
       game.js for every scene there is, so a roll nobody cancelled would
       go on tilting a menu for the rest of its 1.6 seconds. */
    roll: roll, rollStop: rollStop,
    ctxBg: null, ctxCh: null, ctxFg: null, scale: 1, portrait: false
  };
  return API;
})();

/* ------------------------------------------------------------------
   Flat tints, for shading anything that moves.
   A dither pattern that scrolls a pixel at a time (or a fixed pattern
   laid over a scrolling layer) flips a large share of its pixels on
   every step, which reads as flicker. A flat tint just changes the
   colour, so it moves as calmly as the thing underneath it.
   Strength uses the same 0..16 scale as Dither.rect.
------------------------------------------------------------------ */
var Tint = {
  rect: function (ctx, x, y, w, h, colour, strength) {
    if (strength <= 0 || w <= 0 || h <= 0) return;
    var a = ctx.globalAlpha;
    ctx.globalAlpha = a * Math.min(1, strength / 16);
    ctx.fillStyle = colour;
    ctx.fillRect(x, y, w, h);
    ctx.globalAlpha = a;
  }
};

/* ------------------------------------------------------------------
   Ordered dithering - 4x4 Bayer patterns. Used for texture on things
   that hold still (boards, panels, locked cards) and for the wipe;
   never across something that scrolls, see Tint above.
------------------------------------------------------------------ */
var Dither = (function () {

  var BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  var BAYER8 = null;
  var patterns = {};

  function bayer8() {
    if (BAYER8) return BAYER8;
    var B2 = [0, 2, 3, 1];
    BAYER8 = new Array(64);
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        /* 8x8 = the 4x4 kernel refined by a 2x2 one, so the wipe fills
           in scattered blocks instead of marching down in stripes */
        BAYER8[y * 8 + x] = 4 * BAYER4[((y >> 1) & 3) * 4 + ((x >> 1) & 3)] + B2[(y & 1) * 2 + (x & 1)];
      }
    }
    return BAYER8;
  }

  /* density 0..16 -> fraction of pixels painted */
  function pattern(ctx, colour, density) {
    var id = colour + '|' + density;
    var p = patterns[id];
    if (p) return p;
    var c = makeCanvas(4, 4);
    c.ctx.fillStyle = colour;
    for (var i = 0; i < 16; i++) {
      if (BAYER4[i] < density) c.ctx.fillRect(i % 4, (i / 4) | 0, 1, 1);
    }
    p = ctx.createPattern(c.canvas, 'repeat');
    patterns[id] = p;
    return p;
  }

  function rect(ctx, x, y, w, h, colour, density) {
    if (density <= 0) return;
    if (density >= 16) { ctx.fillStyle = colour; ctx.fillRect(x, y, w, h); return; }
    ctx.fillStyle = pattern(ctx, colour, density);
    ctx.fillRect(x, y, w, h);
  }

  /* a vertical ramp between two colours, drawn as dithered bands */
  function verticalRamp(ctx, x, y, w, h, top, bottom, steps) {
    steps = steps || 6;
    ctx.fillStyle = top;
    ctx.fillRect(x, y, w, h);
    var bandH = h / steps;
    for (var i = 0; i < steps; i++) {
      var d = Math.round(((i + 1) / steps) * 16);
      rect(ctx, x, Math.round(y + i * bandH), w, Math.ceil(bandH), bottom, d);
    }
  }

  /* full-screen block wipe used between scenes: t 0 -> 1 covers up */
  function wipe(ctx, t, colour) {
    if (t <= 0) return;
    if (t >= 1) { ctx.fillStyle = colour; ctx.fillRect(0, 0, VW, VH); return; }
    var b = bayer8();
    var cell = 6;
    var cols = Math.ceil(VW / cell), rows = Math.ceil(VH / cell);
    var threshold = t * 64;
    ctx.fillStyle = colour;
    for (var y = 0; y < rows; y++) {
      for (var x = 0; x < cols; x++) {
        if (b[(y & 7) * 8 + (x & 7)] < threshold) ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }

  return { rect: rect, pattern: pattern, verticalRamp: verticalRamp, wipe: wipe };
})();
