/* ------------------------------------------------------------------
   Land of Doodads - 5x7 bitmap font
   Every glyph is hand-plotted so that all text in the game is real pixel
   art: no browser font rendering anywhere on screen.
   Glyphs are baked into per (scale, colour) atlases the first time
   they are used, then blitted with drawImage.
------------------------------------------------------------------ */
'use strict';

var Font = (function () {

  var GW = 5, GH = 7;                 // glyph cell, in font pixels

  var RAW = {
    'A': '01110 10001 10001 11111 10001 10001 10001',
    'B': '11110 10001 10001 11110 10001 10001 11110',
    'C': '01110 10001 10000 10000 10000 10001 01110',
    'D': '11110 10001 10001 10001 10001 10001 11110',
    'E': '11111 10000 10000 11110 10000 10000 11111',
    'F': '11111 10000 10000 11110 10000 10000 10000',
    'G': '01110 10001 10000 10111 10001 10001 01111',
    'H': '10001 10001 10001 11111 10001 10001 10001',
    'I': '11111 00100 00100 00100 00100 00100 11111',
    'J': '00111 00010 00010 00010 00010 10010 01100',
    'K': '10001 10010 10100 11000 10100 10010 10001',
    'L': '10000 10000 10000 10000 10000 10000 11111',
    'M': '10001 11011 10101 10101 10001 10001 10001',
    'N': '10001 11001 11001 10101 10011 10011 10001',
    'O': '01110 10001 10001 10001 10001 10001 01110',
    'P': '11110 10001 10001 11110 10000 10000 10000',
    'Q': '01110 10001 10001 10001 10101 10010 01101',
    'R': '11110 10001 10001 11110 10100 10010 10001',
    'S': '01111 10000 10000 01110 00001 00001 11110',
    'T': '11111 00100 00100 00100 00100 00100 00100',
    'U': '10001 10001 10001 10001 10001 10001 01110',
    'V': '10001 10001 10001 10001 10001 01010 00100',
    'W': '10001 10001 10001 10101 10101 11011 10001',
    'X': '10001 10001 01010 00100 01010 10001 10001',
    'Y': '10001 10001 01010 00100 00100 00100 00100',
    'Z': '11111 00001 00010 00100 01000 10000 11111',
    '0': '01110 10001 10011 10101 11001 10001 01110',
    '1': '00100 01100 00100 00100 00100 00100 01110',
    '2': '01110 10001 00001 00010 00100 01000 11111',
    '3': '11111 00010 00100 00010 00001 10001 01110',
    '4': '00010 00110 01010 10010 11111 00010 00010',
    '5': '11111 10000 11110 00001 00001 10001 01110',
    '6': '00110 01000 10000 11110 10001 10001 01110',
    '7': '11111 00001 00010 00100 01000 01000 01000',
    '8': '01110 10001 10001 01110 10001 10001 01110',
    '9': '01110 10001 10001 01111 00001 00010 01100',
    ' ': '00000 00000 00000 00000 00000 00000 00000',
    '.': '00000 00000 00000 00000 00000 01100 01100',
    ',': '00000 00000 00000 00000 01100 01100 11000',
    '!': '00100 00100 00100 00100 00100 00000 00100',
    '?': '01110 10001 00001 00010 00100 00000 00100',
    ':': '00000 01100 01100 00000 01100 01100 00000',
    ';': '00000 01100 01100 00000 01100 01100 11000',
    "'": '00100 00100 01000 00000 00000 00000 00000',
    '"': '01010 01010 00000 00000 00000 00000 00000',
    '-': '00000 00000 00000 11111 00000 00000 00000',
    '+': '00000 00100 00100 11111 00100 00100 00000',
    '=': '00000 00000 11111 00000 11111 00000 00000',
    '_': '00000 00000 00000 00000 00000 00000 11111',
    '/': '00001 00010 00010 00100 01000 01000 10000',
    '(': '00010 00100 01000 01000 01000 00100 00010',
    ')': '01000 00100 00010 00010 00010 00100 01000',
    '[': '01110 01000 01000 01000 01000 01000 01110',
    ']': '01110 00010 00010 00010 00010 00010 01110',
    '<': '00010 00100 01000 10000 01000 00100 00010',
    '>': '01000 00100 00010 00001 00010 00100 01000',
    '*': '00000 10101 01110 11111 01110 10101 00000',
    '%': '11001 11011 00010 00100 01000 11011 10011',
    '#': '01010 01010 11111 01010 11111 01010 01010',
    '&': '01100 10010 10100 01000 10101 10010 01101',
    '@': '01110 10001 10111 10111 10000 10001 01110',
    '·': '00000 00000 00000 01100 01100 00000 00000',   /* middle dot */
    '▶': '01000 01100 01110 01111 01110 01100 01000',   /* right arrow */
    '◀': '00010 00110 01110 11110 01110 00110 00010',   /* left arrow  */
    '▲': '00100 00100 01110 01110 11111 11111 00000',   /* up arrow    */
    '▼': '00000 11111 11111 01110 01110 00100 00100',   /* down arrow  */
    '★': '00100 00100 11111 01110 01010 10001 00000',   /* star        */
    '♥': '01010 11111 11111 11111 01110 00100 00000',   /* heart       */
    '♪': '00111 00101 00100 00100 01100 11100 11000'    /* music note  */
  };

  /* pre-split into row strings */
  var GLYPHS = {};
  var ORDER = [];
  for (var key in RAW) {
    GLYPHS[key] = RAW[key].split(' ');
    ORDER.push(key);
  }

  var atlases = {};                   // "scale|colour" -> {canvas,index,cw,ch}

  function atlas(scale, colour) {
    var id = scale + '|' + colour;
    var a = atlases[id];
    if (a) return a;

    var cw = GW * scale, ch = GH * scale;
    var c = document.createElement('canvas');
    c.width = cw * ORDER.length;
    c.height = ch;
    var ctx = c.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = colour;

    var index = {};
    for (var i = 0; i < ORDER.length; i++) {
      var rows = GLYPHS[ORDER[i]];
      index[ORDER[i]] = i;
      for (var y = 0; y < GH; y++) {
        var row = rows[y];
        for (var x = 0; x < GW; x++) {
          if (row.charAt(x) === '1') ctx.fillRect(i * cw + x * scale, y * scale, scale, scale);
        }
      }
    }
    a = { canvas: c, index: index, cw: cw, ch: ch };
    atlases[id] = a;
    return a;
  }

  function prepare(text) {
    return String(text).toUpperCase();
  }

  /* width of a string in virtual pixels */
  function measure(text, scale, spacing) {
    scale = scale || 1;
    spacing = spacing === undefined ? 1 : spacing;
    var n = prepare(text).length;
    if (n === 0) return 0;
    return n * GW * scale + (n - 1) * spacing * scale;
  }

  function height(scale) { return GH * (scale || 1); }

  /* core blit. o = {scale,colour,spacing,align,wave,waveAmp,waveSpeed,alpha} */
  function blit(ctx, text, x, y, o) {
    var scale = o.scale || 1;
    var spacing = o.spacing === undefined ? 1 : o.spacing;
    var colour = o.colour || '#ffffff';
    var str = prepare(text);
    var a = atlas(scale, colour);
    var adv = (GW + spacing) * scale;
    var w = measure(text, scale, spacing);

    var startX = x;
    if (o.align === 'center') startX = Math.round(x - w / 2);
    else if (o.align === 'right') startX = Math.round(x - w);
    startX = Math.round(startX);
    y = Math.round(y);

    for (var i = 0; i < str.length; i++) {
      var ch = str.charAt(i);
      var gi = a.index[ch];
      if (gi === undefined) { gi = a.index['?']; if (gi === undefined) continue; }
      if (ch === ' ') continue;
      var oy = 0;
      if (o.wave) oy = Math.round(Math.sin(o.wave + i * (o.wavePhase || 0.55)) * (o.waveAmp || 1)) * scale;
      ctx.drawImage(a.canvas, gi * a.cw, 0, a.cw, a.ch,
                    startX + i * adv, y + oy, a.cw, a.ch);
    }
    return w;
  }

  /* public draw, with optional shadow / outline passes */
  function draw(ctx, text, x, y, opts) {
    var o = opts || {};
    var scale = o.scale || 1;

    if (o.outline) {
      var oc = { scale: scale, spacing: o.spacing, colour: o.outline, align: o.align,
                 wave: o.wave, waveAmp: o.waveAmp, wavePhase: o.wavePhase };
      var d = (o.outlineWidth || 1) * scale;
      var offs = [[-d, 0], [d, 0], [0, -d], [0, d], [-d, -d], [d, -d], [-d, d], [d, d]];
      for (var i = 0; i < offs.length; i++) blit(ctx, text, x + offs[i][0], y + offs[i][1], oc);
    }
    if (o.shadow) {
      var sc = { scale: scale, spacing: o.spacing, colour: o.shadow, align: o.align,
                 wave: o.wave, waveAmp: o.waveAmp, wavePhase: o.wavePhase };
      var sx = (o.shadowX === undefined ? 1 : o.shadowX) * scale;
      var sy = (o.shadowY === undefined ? 1 : o.shadowY) * scale;
      blit(ctx, text, x + sx, y + sy, sc);
    }
    return blit(ctx, text, x, y, o);
  }

  return { draw: draw, measure: measure, height: height, GW: GW, GH: GH };
})();
