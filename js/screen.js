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

  /* a point from a touch or a click, in the 480x270 the game thinks in */
  function toVirtual(clientX, clientY) {
    var r = stage.getBoundingClientRect();
    if (!r.width || !r.height) return null;
    return { x: (clientX - r.left) / r.width * VW,
             y: (clientY - r.top) / r.height * VH };
  }

  function shake(amount, time) {
    if (amount > shakeAmount) { shakeAmount = amount; shakeTime = time || 0.35; }
  }

  function updateShake(dt) {
    if (shakeTime > 0) {
      shakeTime -= dt;
      var a = shakeAmount * Math.max(0, shakeTime / 0.35);
      shakeX = Math.round(rand(-a, a));
      shakeY = Math.round(rand(-a, a));
      if (shakeTime <= 0) { shakeAmount = 0; shakeX = shakeY = 0; }
    } else { shakeX = 0; shakeY = 0; }
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
