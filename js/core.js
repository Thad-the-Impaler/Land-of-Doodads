/* ------------------------------------------------------------------
   Land of Doodads - core constants + small maths helpers
   Everything in the game is laid out in "virtual pixels": a fixed
   480x270 playfield that gets scaled up by a whole number.
------------------------------------------------------------------ */
'use strict';

var VW = 480;                       // virtual width  (pixels)
var VH = 270;                       // virtual height (pixels)
var TAU = Math.PI * 2;

function clamp(v, lo, hi) { return v < lo ? lo : (v > hi ? hi : v); }
function lerp(a, b, t) { return a + (b - a) * t; }

/* THE DICE the four helpers below roll. Math.random, except while PlayScene
   is stepping one falling thing: then `Dice.roll` is that thing's OWN stream
   (its `dice` field, a mulberry32 state), so a kernel's next bounce was
   decided the moment it was made and a copy of it stepped ahead rolls the
   very same numbers. That is what lets Pepper see where things will go.
   Code that calls Math.random directly is outside this, on purpose: the
   makers and the scenery have no future to foresee. */
var Dice = {
  roll: Math.random,
  ob: null,
  /* one step of the stream on Dice.ob.dice - mulberry32's arithmetic, with
     the state kept on the object so that copying the object copies it */
  own: function () {
    var o = Dice.ob, s = o.dice = (o.dice + 0x6D2B79F5) | 0;
    var t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
};

function rand(a, b) { return a + Dice.roll() * (b - a); }
function randInt(a, b) { return Math.floor(a + Dice.roll() * (b - a + 1)); }
function chance(p) { return Dice.roll() < p; }
function choose(list) { return list[(Dice.roll() * list.length) | 0]; }
function sign(v) { return v < 0 ? -1 : (v > 0 ? 1 : 0); }

/* frame-rate independent "move toward" */
function approach(cur, target, maxDelta) {
  if (cur < target) return Math.min(cur + maxDelta, target);
  if (cur > target) return Math.max(cur - maxDelta, target);
  return target;
}

/* frame-rate independent smoothing: rate = fraction remaining after 1s */
function damp(cur, target, rate, dt) {
  return target + (cur - target) * Math.pow(rate, dt);
}

function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }
function easeInCubic(t) { return t * t * t; }
function easeOutBack(t) { var c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); }
function easeInOut(t) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; }

/* deterministic rng, used for scenery that must not flicker between frames */
function mulberry32(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* circle (cx,cy,r) against axis aligned rect */
function circleHitsRect(cx, cy, r, rx, ry, rw, rh) {
  var nx = clamp(cx, rx, rx + rw);
  var ny = clamp(cy, ry, ry + rh);
  var dx = cx - nx, dy = cy - ny;
  return dx * dx + dy * dy < r * r;
}

/* tiny wrapper so save files never explode on a locked-down browser */
var Save = {
  get: function (key, fallback) {
    try {
      var raw = localStorage.getItem('doodads.' + key);
      return raw === null ? fallback : JSON.parse(raw);
    } catch (e) { return fallback; }
  },
  set: function (key, value) {
    try { localStorage.setItem('doodads.' + key, JSON.stringify(value)); } catch (e) { /* ignore */ }
  },
  remove: function (key) {
    try { localStorage.removeItem('doodads.' + key); } catch (e) { /* ignore */ }
  },
  /* every key this game has stored, prefix already stripped */
  keys: function () {
    try {
      var out = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf('doodads.') === 0) out.push(k.slice(8));
      }
      return out;
    } catch (e) { return []; }
  }
};

/* create an offscreen pixel canvas (nearest neighbour, no smoothing) */
function makeCanvas(w, h) {
  var c = document.createElement('canvas');
  c.width = w; c.height = h;
  var ctx = c.getContext('2d');
  ctx.imageSmoothingEnabled = false;
  return { canvas: c, ctx: ctx, w: w, h: h };
}

/* draw a tile repeatedly across the full virtual width, scrolled by offset */
function tileX(ctx, canvas, offset, y, width) {
  var tw = canvas.width;
  var start = -(((offset % tw) + tw) % tw);
  for (var x = start; x < (width === undefined ? VW : width); x += tw) {
    ctx.drawImage(canvas, Math.round(x), Math.round(y));
  }
}
