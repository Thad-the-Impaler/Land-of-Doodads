/* ------------------------------------------------------------------
   Land of Doodads - ACHIEVEMENT BADGES

   Eleven 18x18 tiles, one per achievement, baked once into offscreen
   canvases and blitted whole thereafter. Each tile is a PLATE and an
   OBJECT: a dark rounded square with a one-pixel rim, and the thing
   the achievement is about sitting on it.

   WHY THEY ARE BAKED, AND WHY THERE ARE THREE OF EVERY ONE. The
   achievements screen draws six rows a frame, the title draws none,
   the banner draws one at double size and the results board draws one
   more - but the screen is the case that decides this. Six badges a
   frame, each a plate plus an object plus, for an unearned one, a
   per-pixel luminance pass, is a getImageData every sixteenth of a
   second on a 480x270 game that has to hold 60fps on a phone. So the
   DIM variant and the SECRET plate are baked too, at boot, beside the
   lit one. draw() is then always exactly one drawImage, whatever the
   row is showing.

   WHY 18. The screen's row is 32px tall and a badge wants 4px of air
   above and 7 below to sit on the name-and-how-line pair; the banner
   wants it to double cleanly to 36 beside a scale-2 name. 16 is the
   object, and the plate is a pixel of rim either side of it.

   WHAT THE OBJECTS ARE MADE OF. Seven are hand-plotted from 16x16
   string maps, in colours taken BY REFERENCE from the level the thing
   belongs to - Coop.P.eggShell, not a copied hex - so that a level
   repainted tomorrow repaints its badge with it. The other four blit
   the level's own baked tile: the butane can, the capybara, the Desk's
   ringing notification and the Garden's potted succulent. Those four
   ARE the pickup, at the pickup's own size, and redrawing them here
   would have been a second copy of a sprite free to drift away from
   the first. That is why build() must run after Levels.buildArt().

   The price of the blits is that this file knows four level modules by
   name. It reads them off the window rather than as bare identifiers,
   and treats a missing palette colour as the plate showing through, so
   a level file pulled out of index.html leaves a badge with a hole in
   it instead of a ReferenceError thrown inside Game.init() - which is
   before the first frame, with nothing drawn yet to say what went
   wrong. See mod() below.
------------------------------------------------------------------ */
'use strict';

var Badges = (function () {

  var W = 18, H = 18;

  var LIT = {};              /* id -> the earned tile          */
  var DIM = {};              /* id -> the same object, dimmed  */
  var SECRET = null;         /* one shared '? ? ?' plate       */
  var built = false;

  /* ------------------------------------------------- the two row helpers

     Lifted verbatim from js/livingroom.js, where mantle.js's bakeCapy and
     every other object in the room under a dozen pixels across already
     draws itself with them: a table of [offset, width] rows filled one row
     at a time, and the same table fattened by a pixel all round for the
     outline that goes under it.

     They are duplicated here on purpose rather than called through
     LivingRoom. A badge is a piece of menu furniture, not a piece of a
     level, and these eleven tiles bake inside Game.init() - the one place
     in the game where a missing module is fatal and invisible. Six lines
     is cheaper insurance than the dependency. */
  function rowsFill(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0], y + i, rows[i][1], 1);
  }

  function rowsOutline(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0] - 1, y + i, rows[i][1] + 2, 1);
    c.fillRect(x + rows[0][0], y - 1, rows[0][1], 1);
    var last = rows[rows.length - 1];
    c.fillRect(x + last[0], y + rows.length, last[1], 1);
  }

  /* ------------------------------------------------------------ the plate

     Sixteen rows of sixteen, which rowsOutline then fattens by a pixel all
     round. That is the whole plate: the rim lands on (1,0,16,1), (1,17,16,1),
     (0,1,1,16) and (17,1,1,16), and the four corner pixels are never
     written, so the tile reads as rounded against whatever is behind it.
     Drawn with the row helpers rather than four hand-written fillRects
     because it is the same shape-table idiom as everything else in the
     file, and the pixels come out identical either way. */
  var PLATE_ROWS = [
    [0, 16], [0, 16], [0, 16], [0, 16], [0, 16], [0, 16], [0, 16], [0, 16],
    [0, 16], [0, 16], [0, 16], [0, 16], [0, 16], [0, 16], [0, 16], [0, 16]
  ];

  /* ------------------------------------------------------ module lookups

     A level module by name, or null. Read off the window the way
     assets.js reads window.DOODAD_SPRITES, so that the four badges which
     blit a level's own tile degrade to a bare plate if that level is ever
     taken out, instead of killing the boot. */
  function mod(name) {
    return (typeof window !== 'undefined' && window[name]) || null;
  }

  function palOf(name) { var m = mod(name); return (m && m.P) || {}; }

  function tileOf(name, key) {
    var m = mod(name);
    return (m && m.tiles && m.tiles[key]) || null;
  }

  function blit(c, t, x, y) { if (t && t.canvas) c.drawImage(t.canvas, x, y); }

  /* Plot a string map onto the object layer, one pixel a character, with
     the map's (0,0) at tile (ox,oy). '.' is the plate showing through -
     and so is any letter whose colour came back undefined, which is what
     a missing level module looks like from in here. A badge with a hole
     in it is a bad badge; a badge that throws is a dead game. */
  function plot(c, map, pal, ox, oy) {
    var y, x, row, col;
    for (y = 0; y < map.length; y++) {
      row = map[y];
      for (x = 0; x < row.length; x++) {
        col = pal[row.charAt(x)];
        if (!col) continue;
        c.fillStyle = col;
        c.fillRect(ox + x, oy + y, 1, 1);
      }
    }
  }

  /* ------------------------------------------------------------ the maps

     Sixteen rows of sixteen characters each. Every one of these was drawn
     at 8x and judged by eye before it was typed in; the letters are only
     a palette index, and the palette beside each drawing function names
     the level colour each letter stands for. */

  var MAP_HATCHLING = [
    '................',
    '.....oooo.......',
    '....occcco......',
    '...occcocoo.....',
    '...occccccobbo..',
    '...occcccccbbbo.',
    '...oycccccoobo..',
    '..osocycooso....',
    '.ohssossosssdo..',
    '.ohsssssssssdo..',
    '.ossssssssssdo..',
    '.osssfssssssdo..',
    '..osssssssfdo...',
    '..owsssssddwo...',
    '...owwddddwo....',
    '....oooooooo....'
  ];

  var MAP_PULLET = [
    '.........oo.....',
    '........orro....',
    '.......oaaaao...',
    '.......oaoaaobo.',
    '.......oaaaaobbo',
    '.oo....oarraobo.',
    'oaao..ooaaaaoro.',
    'oaaaooaaaaaaao..',
    '.oaaaaaaammaao..',
    '.oaammmmmmmmao..',
    '.oammkkkmmmmo...',
    '..okmmmmmmkko...',
    '...okkkkkkko....',
    '....oolool......',
    '.....ol.ol......',
    '....ollolll.....'
  ];

  var MAP_POULTRY = [
    '....oooooo......',
    '..ooNNNNnnoo....',
    '.oNnw....wnno...',
    '.oNnoooooownno..',
    'oNnoccccccownno.',
    'oNnocowcccwcono.',
    'onnoccccwcccobo.',
    'onnwcccccwcccbo.',
    'onnocwcccccwobo.',
    '.onocccwcccccoo.',
    '.onnocccccwcco..',
    '..oowoyccccyoo..',
    '...oonoooooohHo.',
    '.....ooooo.ohHo.',
    '............odho',
    '.............ooo'
  ];

  var MAP_VOYAGER = [
    '.ooooooooooo....',
    '.oFFFFFFFFFoo...',
    '.oFoooooooFoPo..',
    '.oFoLLLLLloFoPo.',
    '.oFoLLLLLloFoppo',
    '.oFoLLLLLloFoppo',
    '.oFoLLLLlloFopqo',
    '.oFoLLLLlloFopqo',
    '.oFoLLLllloFokqo',
    '.oFoLLllllgFopqo',
    '.oFoLlllllgFopqo',
    '.oFolllllggFopqo',
    '.oFollllgggFopqo',
    '.oFfllgggggFoqqo',
    '.odddddddddddqoo',
    '..oooooooooooo..'
  ];

  var MAP_TOLERANCE = [
    '....g......w....',
    '...w....S...g...',
    '...g...oSo..w...',
    '....w..oso......',
    '......oosoo.....',
    '.....ohmmmdo....',
    '.....ohmmmmdo...',
    '.....ohmmmmdo...',
    '.....ohmmmmdo...',
    '.....ohmmmmdo...',
    '....ohmmmmddo...',
    '...ohmmmmddo....',
    '..ohmmmmddo.....',
    '..ohmmddoo......',
    '..oddddo........',
    '...oooo.........'
  ];

  var MAP_INFINITY = [
    '................',
    '................',
    '................',
    '..GSG......ggg..',
    '.G...G....g...g.',
    'G.....G..g.....d',
    'G......Gg......d',
    'G.....g..d.....d',
    '.g...g....d...d.',
    '..ggg......ddd..',
    '................',
    '..r.r......r.r..',
    '................',
    '....r......r....',
    '................',
    '................'
  ];

  var MAP_WOOD = [
    '.....ooooo......',
    '...oowwwwwoo....',
    '..owwwwwwwwwo...',
    '..owwwwbbbbwwo..',
    '.owwwwbwwwwbwwo.',
    '.ooowbwwbbbwbwo.',
    '..oowbwbBBbwbwo.',
    '..owwbwbBBBbwso.',
    '.owwwbwbBBbwbso.',
    '.owwwbwwbbbwbso.',
    '.owwwwbwwwwbsso.',
    '.owwwwwbbbbssoo.',
    '..owwBwBwBwsso..',
    '...oowwBwBwso...',
    '.....owwwwso....',
    '......ooooo.....'
  ];

  /* ------------------------------------------------------- the eleven

     id -> the function that paints that badge's object on its own
     transparent 18x18 layer. This table is also the id list: build() and
     has() both read it, so a twelfth badge is added in exactly one place.

     Each function resolves its own palette when it runs, which is inside
     build(), which is inside Game.init() - by then every level module has
     been loaded and Levels.buildArt() has baked its tiles. Nothing here
     is touched at load time. */
  var OBJ = {

    /* 1 HATCHLING - a chick's head up out of its broken shell, in the
       Coop's egg colours. It reads by three things: the one dark eye
       pixel in the yellow dome, the paprika beak jutting out past the
       silhouette, and the sawtooth of shell at row 7 - shell, dark,
       shell, dark - which is the whole "broken" tell. The egg keeps the
       Coop egg's own lighting, highlight up the left shoulder and shade
       down the right, so the two read as the same object. */
    hatchling: function (c) {
      var K = palOf('Coop');
      plot(c, MAP_HATCHLING, {
        o: K.outline, s: K.eggShell, h: K.eggShellHi, d: K.eggShade,
        w: K.eggShadow, f: K.eggFleck, c: K.yolkHi, y: K.yolk, b: K.paprika
      }, 1, 1);
    },

    /* 2 PULLET - a young hen facing right, wearing Cookie's browns. The
       comb and wattle are UI red rather than a new hex because they are
       the only pure red on the tile and the menus already own that one;
       the beak and legs are the Coop's yolk, which is the yellow every
       chicken in this game is drawn with. */
    pullet: function (c) {
      var K = palOf('Coop');
      var dd = mod('Doodads');
      var ck = (dd && dd.get && dd.get('cookie')) || {};
      var ui = (typeof UI !== 'undefined' && UI.C) || {};
      plot(c, MAP_PULLET, {
        o: K.outline, a: ck.accentLight, m: ck.accent, k: ck.accentDark,
        r: ui.red, b: K.yolk, l: K.yolk
      }, 1, 1);
    },

    /* 3 POULTRY CATCHER - a net with a chick's head caught in it. The
       hoop is the Coop's nail steel lit on its upper left, the strands
       are its chicken wire, and the handle is its timber, so the whole
       implement is built out of things that are already in that room.
       Three strands lie OVER the chick: that is what makes it caught
       rather than merely next to a hoop. */
    poultry: function (c) {
      var K = palOf('Coop');
      plot(c, MAP_POULTRY, {
        o: K.outline, n: K.nailMid, N: K.nailLight, w: K.wireLight,
        h: K.beamLight, H: K.beamHi, d: K.beamDark,
        c: K.yolkHi, y: K.yolk, b: K.paprika
      }, 1, 1);
    },

    /* 4 VOYAGER - a door standing open with daylight coming through it.
       A new room is the only thing in this game you can be let into, and
       the Coop's daylight is the game's own colour for somewhere else.
       The light grades from daylightHi at the top left to slatGap at the
       bottom right so the bright rectangle reads as LIGHT and not as a
       yellow door; the thin leaf swung out to the right with its one
       steel knob pixel is what says the door is open and not a window. */
    voyager: function (c) {
      var K = palOf('Coop');
      plot(c, MAP_VOYAGER, {
        o: K.outline, f: K.beamMid, F: K.beamLight, d: K.beamDark,
        L: K.daylightHi, l: K.daylight, g: K.slatGap,
        p: K.plankMid, P: K.plankHi, q: K.plankDark, k: K.nailLight
      }, 1, 1);
    },

    /* 5 TOLERANCE - a chilli with heat coming off it, in the Garden's hot
       palette. This badge stands for all five of the game's spicy drops -
       the deviled egg, the pepper, the butane can, the mint, the hot
       cheddar popcorn - so it is the most legible chilli it can be rather
       than a copy of the Garden's own thin five-pixel sprite. The five
       loose glow pixels drifting up either side are the same two colours
       the Garden throws its hot sparks in. */
    tolerance: function (c) {
      var K = palOf('Garden');
      plot(c, MAP_TOLERANCE, {
        o: K.outline, m: K.hotMid, h: K.hotHi, d: K.hotDark,
        s: K.stalkMid, S: K.stalkHi, g: K.hotGlow, w: K.hotHi
      }, 1, 1);
    },

    /* 6 THE SURVIVOR MAN - the Garden's potted succulent, its own two
       tiles, no new pixels. The pot and the rosette share one 20x20
       coordinate space in garden.js so that Gerald's hunger can lift the
       plant out and leave the pot standing; drawing both at the same
       origin reassembles the picture exactly. Pot first, as drawBoon
       does. The offsets put the composite inside rows 1..16 of the
       tile, which drops the rosette one row lower on the rim than it
       sits in the level - the only liberty taken, and it buys the whole
       plant a plate it fits on. */
    survivor: function (c) {
      blit(c, tileOf('Garden', 'pot'), -1, -3);
      blit(c, tileOf('Garden', 'rosette'), -1, -2);
    },

    /* 7 INFINITY POOL - a golden figure of eight with four dark dots
       under it for its reflection in the water. The strokes CROSS at
       (7..8,6): that crossing is the entire difference between an
       infinity sign and two rings side by side, and it is the one place
       on this tile where a pixel cannot move.

       No outline. Gold reads cleanly on the darker plate on its own, and
       a 16-wide stroke with a pixel of ink either side of it would have
       had nothing left in the middle to be gold. The reflection reuses
       goldDark rather than a dimmer colour of its own, because a
       reflection in this game has always been the shadow of the thing. */
    infinity: function (c) {
      var K = palOf('Construction');
      plot(c, MAP_INFINITY, {
        g: K.goldMid, G: K.goldHi, d: K.goldDark, S: K.goldShine, r: K.goldDark
      }, 1, 1);
    },

    /* 8 BURN WITH THE FLAMES OF VICTORY - the Construction Zone's butane
       can, alight. The can is its own 9x13 tile, cap and red body and
       white label band and all, so this badge cannot drift away from the
       pickup. bakeCan puts a nail-light pixel on the nozzle at its local
       (4,0), which lands at tile (8,4) - and the flame is built on top of
       that pixel, a pale-cored teardrop three rows tall. The flame has no
       outline: the level's own sparks have none either. */
    butane: function (c) {
      var K = palOf('Construction');
      blit(c, tileOf('Construction', 'can'), 4, 4);
      if (K.flame) {
        c.fillStyle = K.flame;
        c.fillRect(7, 2, 1, 1); c.fillRect(9, 2, 1, 1);
        c.fillRect(6, 3, 1, 1); c.fillRect(10, 3, 1, 1);
      }
      if (K.flameHi) {
        c.fillStyle = K.flameHi;
        c.fillRect(8, 1, 1, 1);
        c.fillRect(8, 2, 1, 1);
        c.fillRect(7, 3, 3, 1);
      }
    },

    /* 9 MOSQUITOS - the Desk's ringing notification, badge and all. App 0
       is the phone handset and frame 1 is the ringing one, which is the
       frame that carries the two little ringArc pixels beside the badge.
       The sprite is 15x16 and fills the plate's interior almost exactly.
       Nothing is redrawn: this badge IS the object that rings you, which
       is the only thing that needed saying. */
    mosquitos: function (c) {
      var m = mod('Desk');
      var ic = (m && m.tiles && m.tiles.icon && m.tiles.icon[0]) || null;
      blit(c, ic && ic[1], 1, 1);
    },

    /* 10 DO YOU RESPECT WOOD? - the Couch's laser-engraved map coaster,
       face on. The level's own coaster is a 21px disc shaded per pixel
       from a distance field, which cannot be blitted into 16 and cannot
       be scaled down without losing the contour lines that are the whole
       point of it. So this one is the same object redrawn at 13 across,
       in the same four birch-and-burn colours: the bite out of the upper
       left is the map's shoreline, the three nested rings are the
       contours with the innermost burnt deeper, and the dotted arc of
       burnDeep along the bottom rim is the engraved maker's name. */
    wood: function (c) {
      var K = palOf('Couch');
      plot(c, MAP_WOOD, {
        o: K.outline, w: K.birch, s: K.birchShade, b: K.burn, B: K.burnDeep
      }, 1, 1);
    },

    /* 11 DON'T WORRY, BE CAPY - the little yellow capybara off the mantel
       shelf, its own 13x10 tile at its own size. mantle.js says the three
       ink pixels of the face are what make it a capybara and not a loaf,
       so they are not touched; the tile is simply centred on the plate. */
    capy: function (c) {
      blit(c, tileOf('Mantle', 'capy'), 3, 4);
    }
  };

  /* ----------------------------------------------------------- the bake */

  function plateTile(edge) {
    var ui = (typeof UI !== 'undefined' && UI.C) || {};
    var t = makeCanvas(W, H);
    rowsOutline(t.ctx, PLATE_ROWS, 1, 1, edge);
    rowsFill(t.ctx, PLATE_ROWS, 1, 1, ui.darker);
    return t;
  }

  /* The dim pass, run once over a badge's object layer before it is
     composited onto the unlit plate. Luminance, then a warm dark ramp:
     the object as a shadow of itself on the board, rather than the same
     object at half alpha, which on a dark plate just looks like a badge
     drawn badly. One formula for the hand-plotted objects and the blitted
     ones alike, which is the reason it is a pixel pass and not a second
     palette - there is no palette to recolour inside Desk's icon tile.

     getImageData is safe here: every pixel on this canvas was put there
     by a fillRect or by a drawImage from another canvas we baked, so
     nothing taints it, and it runs eleven times at boot and never again. */
  function dimTile(t) {
    var img = t.ctx.getImageData(0, 0, W, H);
    var d = img.data, i, l;
    for (i = 0; i < d.length; i += 4) {
      if (!d[i + 3]) continue;
      l = 0.30 * d[i] + 0.59 * d[i + 1] + 0.11 * d[i + 2];
      d[i]     = Math.min(255, Math.round(l * 0.46 + 22));
      d[i + 1] = Math.min(255, Math.round(l * 0.40 + 16));
      d[i + 2] = Math.min(255, Math.round(l * 0.30 + 10));
    }
    t.ctx.putImageData(img, 0, 0);
  }

  /* Bake all twenty-three tiles. Idempotent, and nothing above this line
     runs until it is called: Game.init() calls it after Levels.buildArt()
     because four of the objects are level tiles, and after ui.js has
     loaded because every plate is UI.C.

     Each badge's object is drawn once on its own layer, composited onto
     the lit plate, then dimmed IN PLACE and composited onto the unlit
     one - so a badge costs one object canvas and not two. */
  function build() {
    if (built) return;
    built = true;

    var ui = (typeof UI !== 'undefined' && UI.C) || {};
    var id, obj;

    for (id in OBJ) {
      if (!OBJ.hasOwnProperty(id)) continue;

      obj = makeCanvas(W, H);
      OBJ[id](obj.ctx);

      LIT[id] = plateTile(ui.goldDark);
      LIT[id].ctx.drawImage(obj.canvas, 0, 0);

      dimTile(obj);
      DIM[id] = plateTile(ui.inkFaint);
      DIM[id].ctx.drawImage(obj.canvas, 0, 0);
    }

    /* One secret plate for all of them, not one per id. A '? ? ?' row is
       withholding the badge as much as the name, so every hidden
       achievement has to look like every other one - eleven different
       padlocked plates would leak eleven different silhouettes. */
    SECRET = plateTile(ui.inkFaint);
    if (typeof UI !== 'undefined' && UI.padlock) UI.padlock(SECRET.ctx, 8, 8, 1, ui.inkDim);
  }

  /* ---------------------------------------------------------- the blit */

  /* One drawImage, whatever the row is showing. Scale is 1 or 2 and
     nothing else: those are the two sizes measured into the screen's
     32px row and the banner's 36px line, and a third would be a layout
     decision somebody has to make with a ruler rather than a multiply,
     so an unmeasured scale is quietly served as 1.

     globalAlpha is left alone - the unlock banner fades its whole
     contents by setting it, and a baked tile honours that for free.

     An id this build has never heard of draws the secret plate. The
     achievements screen walks a roster it does not own, and a row with
     a name and no badge would be a hole; a row that looks locked is at
     worst early. */
  function draw(ctx, id, x, y, opts) {
    var o = opts || {};
    var s = o.scale === 2 ? 2 : 1;
    /* has() and not LIT[id], because LIT is a plain object and an id of
       'constructor' or 'toString' would come back off Object.prototype as
       something truthy with no .canvas on it - which is a thrown TypeError
       in the middle of a frame instead of a locked-looking row. */
    var t = (!o.secret && has(id)) ? (o.dim ? DIM[id] : LIT[id]) : null;
    if (!t) t = SECRET;
    if (!t) return;
    ctx.drawImage(t.canvas, Math.round(x), Math.round(y), W * s, H * s);
  }

  /* Whether this build knows that badge, answered off the id table rather
     than off the baked tiles, so it tells the truth before build() runs. */
  function has(id) { return OBJ.hasOwnProperty(id); }

  return {
    build: build,
    draw: draw,
    has: has,
    W: W,
    H: H
  };
})();
