/* ------------------------------------------------------------------
   Land of Doodads - THE STANDS, the third title screen
   It replaces the porch once fifteen priced doodads are open (the
   dispatcher at the foot of js/scene_title.js does the choosing).

   The idea in one line: the whole Land has dragged its furniture into
   the yard at dusk and built a grandstand out of it, and everybody is
   in the seats. Three tiers rise under a scoreboard. The front tier is
   Backyard things standing on the lawn (hay bales, the raised planter,
   a deck bench, a fallen bough, a lumber stack on sawhorses); the
   middle tier is Living Room furniture stood behind them (the desk, a
   loveseat, the mantle, a whiteboard, a box fort); the top tier is
   Dining Room furniture piled on top of that (the walnut table, two
   stools, the bar, a slab of the upside-down ceiling, a console TV
   surfing the game's own covers). EACH TIER IS ONE ROOM AND EACH
   STATION IS ONE LEVEL, so the seats are geometry: two per station,
   thirty today, and every one of them on screen at once.

   Nothing here is typed against three rooms or five bays. The tiers are
   read off Levels.rooms on every enter(), so a fourth room is a fourth
   tier the day it opens; a level with no painter of its own gets a bench
   in its own PREVIEW colours, and a level not yet earned gets a dust
   sheet - it still seats two, and it spoils nothing.

   Nothing per frame walks the roster. The staged cast is at most the
   seat count, and update, draw, the director and the shadows all run
   over that. enter() stages the cast (one pass, paging past capacity),
   and refresh() walks the roster once when the master passkey opens
   doodads while this screen is up. Of the roster this file reads
   title.role, title.r and the sprite metrics, and nothing else.
------------------------------------------------------------------ */
'use strict';

var StandsScene = (function () {

  /* ----------------------------------------------------- constants */

  /* EVERY DOODAD AT 0.85 OF ITS TITLE SIZE, and the one knob for it.
     Three tiers, a scoreboard, the menu and the footer leave 176 rows for
     the stands. At full size the tallest sitter is 48 rows with its bob,
     and three of those leave eleven rows for all the furniture - a shelf,
     not a desk. At 0.85 the tallest (Maximus, 39.6 + 1.2 of bob) is 41,
     which is the room each tier gives its sitters, and the furniture gets
     14-row bands. It is uniform, so Turd and Baby stay small next to the
     rest, and it is still a quarter bigger than a doodad in a run. */
  var FIT = 0.85;

  /* No head at rest rises above HEAD: the scoreboard's face ends on row
     45 and its drop shadow on 48. TOP_TREAD is the top tier's seat line,
     FRONT_TREAD the front tier's - fixed by the menu row under it - and
     the tiers between are spaced evenly. GROUND is the lawn. */
  var HEAD = 49;
  var TOP_TREAD = 91, FRONT_TREAD = 201, GROUND = 218;

  /* how much air above its seat line each station's baked canvas keeps,
     for the things standing on it beside the sitters - the squeeze
     bottle, the tallest, is 34 */
  var PROP_UP = 40;

  /* the scoreboard: face rows 4..45, shadow to row 48 */
  var SB_X = 96, SB_Y = 4, SB_W = 288, SB_H = 42;

  /* The stage is capped by the seats, not by this; it is the knob for a
     phone that struggles with the smooth layer, and it is set where it
     cannot bite until a fourth room opens. */
  var MAX_STAGE = 40;

  var MENU = ['PLAY', 'HIGH SCORES', 'ACHIEVEMENTS'];
  var ACHV_ROW = MENU.indexOf('ACHIEVEMENTS');

  /* the porch's menu row exactly: three boards, each sized to its own
     word, along the lawn in front of the stands. Read as pitch-side
     hoardings now; UI.button keeps drawn and listened the same rectangle. */
  var MENU_Y = 220, MENU_BH = 32;
  var BOARDS = [
    { x: 12,  w: 100, scale: 3 },
    { x: 120, w: 166, scale: 2 },
    { x: 294, w: 174, scale: 2 }
  ];

  /* THE SIDE A LONE SITTER TAKES. A station's moving part - the egg, the
     mister, the bottle, the screen - is on one side of it, and a single
     occupant sits on the other so the joke is not behind somebody. */
  var LONE = { coop: 'B', deck: 'B', table: 'B', tv: 'B' };

  /* ----------------------------------------------------- scene state */

  var t = 0;
  var tiers = [];                  /* front first: tiers[0] stands on the lawn */
  var stage = [], visit = 0;
  var bubbles = [], puffs = [], sparks = [], timers = [], flies = [];
  var directorTimer = 4, chirpCooldown = 0, lastWave = -99, chaseFast = 0;
  var menuIndex = 0;
  var ROSTER_IX = {};

  /* THE LIGHTS. The first visit of a session opens on the stands in the
     dark and strikes three banks of floodlights left to right; banks[i]
     is how dark bank i still is, 0..16. */
  var litOnce = false, litPending = false;
  var banks = [0, 0, 0];

  /* The rectangles this screen drew, refilled every frame inside drawFg
     and handed to Input by Game.render. Three boards and the toggle. */
  var hot = [];

  var T = { sky: null, ground: null, ticker: null };

  /* baked stations, kept across visits and keyed by what they show; and
     the ids whose painter or live layer has thrown once, which are a
     bench from then on rather than a hole in the title screen */
  var CACHE = {}, FAILED = {};

  /* ------------------------------------------------------ small tools */

  function px(c, col, x, y, w, h) {
    if (!col) return;
    c.fillStyle = col;
    c.fillRect(x, y, w, h);
  }

  /* a baked tile is either a makeCanvas record or a bare canvas */
  function canvasOf(tl) { return tl ? (tl.canvas || tl) : null; }

  function blit(c, tl, x, y) {
    var k = canvasOf(tl);
    if (k && k.width) c.drawImage(k, Math.round(x), Math.round(y));
  }

  /* --------------------------------------------------------- the tiers */

  /* WHICH ROOMS ARE IN THE STANDS, and where every seat is.

     One tier per open room, front to back in room order, so the Backyard
     is on the lawn and the newest room is on top. Tiers between the top
     and the front are spaced evenly: with three that is a pitch of 55,
     and 55 is the 41 rows a sitter needs plus the 14-row band of the
     furniture showing above the heads of the row in front. With four the
     pitch drops to 36 and the row in front covers the bottom five rows of
     each sitter behind it - a class photo, which is an acceptable way for
     this screen to fill up.

     The front two tiers stand on the lawn, so their furniture runs down
     to GROUND behind whatever is in front of it; anything higher is piled
     on the tier below and is one pitch tall. Stations divide the width
     evenly, 96 each for five bays, and seat two when they are at least
     92 wide - the widest pair in the roster needs 88. */
  function layoutTiers() {
    var rooms = [], i, j;
    for (i = 0; i < Levels.rooms.length; i++) {
      var rm = Levels.rooms[i];
      if (!rm.locked && Levels.roomOpen(rm)) rooms.push(rm);
    }
    tiers.length = 0;
    var n = rooms.length;
    var pitch = n > 1 ? Math.floor((FRONT_TREAD - TOP_TREAD) / (n - 1)) : 0;
    for (i = 0; i < n; i++) {
      var tread = FRONT_TREAD - i * pitch;
      var h = i <= 1 ? GROUND - tread : pitch;
      var lvs = [];
      for (j = 0; j < rooms[i].levels.length; j++) {
        if (!rooms[i].levels[j].locked) lvs.push(rooms[i].levels[j]);
      }
      var sw = Math.floor(VW / Math.max(1, lvs.length));
      var x0 = Math.floor((VW - sw * lvs.length) / 2);
      var tier = { index: i, room: rooms[i], tread: tread, h: h, stations: [], seats: 0 };
      for (j = 0; j < lvs.length; j++) {
        var lv = lvs[j];
        var st = { tier: tier, k: j, lv: lv, id: lv.id, x: x0 + j * sw, w: sw, h: h, tread: tread,
                   cap: sw >= 92 ? 2 : 1, who: [], live: {} };
        if (!Levels.isUnlocked(lv)) st.paint = 'tarp';
        else st.paint = (PAINT[lv.id] && !FAILED[lv.id]) ? lv.id : 'bench';
        st.tile = bakeStation(st);
        if (LIVE[st.paint] && LIVE[st.paint].init) liveCall(st, 'init');
        tier.stations.push(st);
        tier.seats += st.cap;
      }
      tiers.push(tier);
    }
  }

  function seatCount() {
    var n = 0;
    for (var i = 0; i < tiers.length; i++) n += tiers[i].seats;
    return n;
  }

  /* ------------------------------------------------------ the bakes */

  /* ONE STATION, BAKED ONCE INTO ITS OWN CANVAS: the furniture from its
     seat line down, and the still props standing on it above. Row PROP_UP
     of the canvas is the seat line. Everything that moves is drawn live on
     top by that level's LIVE entry, never baked. A painter that throws -
     a tile renamed in its module, say - is caught here and the station is
     a bench from then on, so a level module can never take the title
     screen down with it. */
  function bakeStation(st) {
    var key = st.paint + ':' + st.id + ':' + st.w + 'x' + st.h;
    if (CACHE[key]) return CACHE[key];
    var m = st.lv.art || null;
    var tile = makeCanvas(st.w, PROP_UP + st.h);
    try {
      paintInto(tile, st.paint, st, m);
    } catch (e) {
      FAILED[st.id] = true;
      st.paint = 'bench';
      key = 'bench:' + st.id + ':' + st.w + 'x' + st.h;
      tile = makeCanvas(st.w, PROP_UP + st.h);
      paintInto(tile, 'bench', st, m);
      if (window.console) console.warn('stands: ' + st.id + ' is a bench tonight', e);
    }
    CACHE[key] = tile;
    return tile;
  }

  function paintInto(tile, paint, st, m) {
    var c = tile.ctx;
    c.save();
    c.translate(0, PROP_UP);
    try { PAINT[paint](c, st.w, st.h, m && m.P, m); }
    finally { c.restore(); }
    shadeFace(tile, st.w, st.h);
  }

  /* THE FLOODLIGHTS ARE OVERHEAD. A seat - the top four rows of a
     station, where everybody sits - faces them and keeps the level's own
     colours; the face below turns away and goes a third darker, after a
     two-row step. That is what keeps a doodad from being lost against a
     bank of desk drawers or a course of ledger stone, and it is lighting
     rather than a filter: it lands only on painted pixels (source-atop),
     so the sky still shows clean through the table's legs. The props
     standing on a seat are lit like the seat. */
  function shadeFace(tile, w, h) {
    var c = tile.ctx;
    c.save();
    c.globalCompositeOperation = 'source-atop';
    Tint.rect(c, 0, PROP_UP + 4, w, 2, '#0b0805', 2);
    Tint.rect(c, 0, PROP_UP + 6, w, h - 6, '#0b0805', 5);
    c.restore();
  }

  /* THE PAINTERS. Each one is handed a context whose row 0 is the seat
     line, the station's width and height, the level's own palette and the
     level's module, and paints the one whole object the level brought.
     Lit from above like every board and plank in the game: lit top rows,
     a dark base, flat fills. The furniture keeps its own level's colours
     because they are read from that level, so it cannot drift from it.
     Nothing here dithers - the stands do not move, but the shake does,
     and a baked canvas carries its pattern with it either way. */
  var PAINT = {

    /* BACKYARD, on the lawn */

    coop: function (c, w, h, P, m) {
      var r = mulberry32(101), bw = Math.floor((w - 8) / 2), i, b, x;
      for (b = 0; b < 2; b++) {
        x = b ? w - 2 - bw : 2;
        px(c, P.hayMid, x, 0, bw, h);
        px(c, P.hayLight, x, 0, bw, 2);
        for (i = 0; i < 24; i++) px(c, P.hayPale, x + 1 + Math.floor(r() * (bw - 3)), 2 + Math.floor(r() * (h - 5)), 2, 1);
        for (i = 0; i < 10; i++) px(c, P.hayDark, x + 1 + Math.floor(r() * (bw - 3)), 3 + Math.floor(r() * (h - 6)), 1, 2);
        px(c, P.hayDark, x, h - 2, bw, 2);
        px(c, P.beddingDark, x + 10, 0, 2, h);
        px(c, P.beddingDark, x + bw - 12, 0, 2, h);
        px(c, P.outline, x, 0, 1, h);
        px(c, P.outline, x + bw - 1, 0, 1, h);
      }
      blit(c, m.tiles.deviled, w - 13, -9);
    },

    garden: function (c, w, h, P) {
      var r = mulberry32(202), i, x;
      px(c, P.soilMid, 0, 0, w, 3);
      for (i = 0; i < 22; i++) px(c, P.chipLight, Math.floor(r() * (w - 2)), Math.floor(r() * 3), 2, 1);
      px(c, P.board, 0, 3, w, h - 3);
      px(c, P.boardHi, 0, 3, w, 1);
      var seam = 3 + Math.floor((h - 3) / 2);
      px(c, P.boardLo, 0, seam, w, 1);
      px(c, P.boardHi, 0, seam + 1, w, 1);
      px(c, P.boardLo, 0, h - 2, w, 2);
      /* three posts through the boards, the vinyl bed's own */
      var posts = [0, (w >> 1) - 2, w - 4];
      for (i = 0; i < posts.length; i++) {
        x = posts[i];
        px(c, P.boardHi, x, 2, 4, h - 2);
        px(c, P.boardEdge, x + 3, 2, 1, h - 2);
        px(c, P.boardEdge, x, 2, 4, 1);
      }
    },

    deck: function (c, w, h, P) {
      var x, i;
      /* bronze legs first, under the boards */
      var legs = [6, w - 12];
      for (i = 0; i < 2; i++) {
        px(c, P.bronzeMid, legs[i], 10, 6, h - 10);
        px(c, P.bronzeHi, legs[i] + 1, 10, 1, h - 10);
      }
      px(c, P.deckRed, 0, 0, w, 7);
      px(c, P.deckRedHi, 0, 0, w, 1);
      px(c, P.deckGap, 0, 3, w, 1);
      for (x = 23; x < w; x += 24) px(c, P.deckGap, x, 0, 1, 3);
      for (x = 11; x < w; x += 24) px(c, P.deckGap, x, 4, 1, 3);
      px(c, P.deckRedDark, 0, 7, w, 3);
      /* a mister on its riser at the left end, and the fire pit at the right */
      px(c, P.hoseBlack, 1, -16, 2, 16);
      px(c, P.brass, 0, -18, 4, 2);
      px(c, P.steelDark, w - 12, -4, 10, 4);
      px(c, P.steelMid, w - 12, -4, 10, 1);
      px(c, P.steelDark, w - 11, -5, 8, 1);
    },

    canopy: function (c, w, h, P, m) {
      var r = mulberry32(404), i;
      /* two forked sticks hold the bough off the lawn */
      var props = [12, w - 16];
      for (i = 0; i < 2; i++) {
        px(c, P.barkDark, props[i], 6, 3, h - 6);
        px(c, P.barkMid, props[i] + 1, 6, 1, h - 6);
        px(c, P.barkDark, props[i] - 2, 6, 2, 2);
        px(c, P.barkDark, props[i] + 3, 6, 2, 2);
      }
      px(c, P.barkMid, 0, 0, w, 7);
      px(c, P.barkLit, 0, 0, w, 2);
      px(c, P.barkDark, 0, 6, w, 1);
      for (i = 0; i < 9; i++) px(c, P.barkDark, Math.floor(r() * (w - 8)), 2 + Math.floor(r() * 4), 4 + Math.floor(r() * 5), 1);
      px(c, P.barkDark, 58, 2, 4, 3);
      px(c, P.outline, 59, 3, 2, 1);
      px(c, P.outline, 0, 0, 1, 7);
      px(c, P.outline, w - 1, 0, 1, 7);
      /* leaves standing up off the left end, and the pomegranate in them */
      for (i = 0; i < 6; i++) {
        px(c, P.leafMid, 1 + i * 3, -3 - (i % 3) * 2, 3, 2);
        px(c, P.leafHi, 2 + i * 3, -3 - (i % 3) * 2, 1, 1);
      }
      blit(c, m.tiles.pom, 2, -15);
    },

    construction: function (c, w, h, P, m) {
      var r = mulberry32(505), i, y;
      /* sawhorse legs, splayed */
      var horses = [9, w - 15];
      for (i = 0; i < 2; i++) {
        for (y = 10; y < h; y++) {
          var d = Math.floor((y - 10) / 3);
          px(c, P.lumDark, horses[i] - d, y, 2, 1);
          px(c, P.lumDark, horses[i] + 4 + d, y, 2, 1);
        }
      }
      /* two 2x4s on the horses */
      px(c, P.lumMid, 0, 3, w, 7);
      px(c, P.lumHi, 0, 3, w, 1);
      px(c, P.lumDark, 0, 6, w, 1);
      px(c, P.lumHi, 0, 7, w, 1);
      px(c, P.lumDark, 0, 9, w, 1);
      px(c, P.lumEnd, 0, 3, 3, 7);
      px(c, P.lumEnd, w - 3, 3, 3, 7);
      /* a sheet of plywood over them, with the saw's slot in it */
      px(c, P.plyMid, 0, 0, w, 3);
      px(c, P.plyLit, 0, 0, w, 1);
      px(c, P.plyEdge, 0, 2, w, 1);
      for (i = 0; i < 7; i++) px(c, P.plyGrain, Math.floor(r() * (w - 12)), 1, 6 + Math.floor(r() * 8), 1);
      px(c, P.plyEdge, (w >> 1) - 1, 0, 3, 1);
      /* the blue bucket at the left end, the can at the right */
      px(c, P.bucketDark, 1, -10, 9, 10);
      px(c, P.bucketMid, 2, -9, 7, 9);
      px(c, P.bucketHi, 2, -9, 2, 9);
      px(c, P.bucketHi, 1, -10, 9, 1);
      blit(c, m.tiles.can, w - 10, -13);
    },

    /* LIVING ROOM, behind them */

    desk: function (c, w, h, P, m) {
      var pedW = 31, i, k;
      px(c, P.wallDark, pedW, 4, w - 2 * pedW, h - 4);
      /* the cable down the knee hole */
      for (i = 0; i < h - 10; i++) px(c, P.cable, (w >> 1) - 4 + Math.round(Math.sin(i * 0.35) * 3), 6 + i, 1, 1);
      var peds = [0, w - pedW];
      for (k = 0; k < 2; k++) {
        var x = peds[k];
        px(c, P.deskTop, x, 4, pedW, h - 6);
        var dh = Math.floor((h - 8) / 3);
        for (i = 0; i < 3; i++) {
          var dy = 5 + i * dh;
          px(c, P.drawerFace, x + 2, dy, pedW - 4, dh - 2);
          px(c, P.drawerPanel, x + 5, dy + 4, pedW - 10, dh - 9);
          px(c, P.pullBlack, x + (pedW >> 1) - 3, dy + 2, 6, 1);
        }
        px(c, P.toeKick, x, h - 2, pedW, 2);
      }
      px(c, P.deskTop, 0, 0, w, 4);
      px(c, P.deskLit, 0, 0, w, 1);
      px(c, P.deskEdge, 0, 3, w, 1);
      blit(c, m.tiles.mug, 1, -12);
    },

    couch: function (c, w, h, P, m) {
      var i, k;
      /* the back cushions are the seat line: doodads perch on the back */
      px(c, P.backMid, 0, 0, w, 26);
      px(c, P.backLit, 0, 0, w, 2);
      px(c, P.backCrease, w >> 1, 0, 1, 26);
      for (k = 0; k < 2; k++) {
        var px0 = k * (w >> 1);
        var bx = [px0 + 12, px0 + (w >> 1) - 13];
        for (i = 0; i < 2; i++) {
          px(c, P.button, bx[i], 8, 2, 2);
          px(c, P.button, bx[i], 18, 2, 2);
        }
        px(c, P.backCrease, px0 + 15, 12, 6, 1);
        px(c, P.backCrease, px0 + 26, 15, 5, 1);
      }
      /* the seat cushions */
      px(c, P.seat, 0, 26, w, 13);
      px(c, P.seatLit, 0, 26, w, 2);
      px(c, P.seatShade, 0, 37, w, 2);
      px(c, P.seatShade, w >> 1, 28, 1, 9);
      px(c, P.seatDeep, 0, 39, w, h - 43);
      /* the arms, lower than the back */
      var arms = [0, w - 10];
      for (i = 0; i < 2; i++) {
        px(c, P.seat, arms[i], 21, 10, h - 25);
        px(c, P.seatHi, arms[i], 20, 10, 2);
        px(c, P.seatShade, arms[i] + (i ? 0 : 9), 22, 1, h - 26);
      }
      px(c, P.walnut, 3, h - 4, 4, 4);
      px(c, P.walnut, w - 7, h - 4, 4, 4);
      blit(c, m.tiles.marsh, 1, -9);
      var ch = m.tiles.cheddar;
      blit(c, ch && ch[0], w - 14, -13);
    },

    mantle: function (c, w, h, P, m) {
      var r = mulberry32(808), y, x, len;
      var stones = [P.stoneCream, P.stoneGrey, P.stoneTan, P.stoneRust, P.stoneCream];
      /* stacked ledger stone under the shelf */
      px(c, P.stoneJoint, 0, 6, w, h - 6);
      for (y = 6; y < h; y += 5) {
        x = -Math.floor(r() * 12);
        while (x < w) {
          len = 8 + Math.floor(r() * 18);
          px(c, stones[Math.floor(r() * stones.length)], x, y, len - 1, 4);
          x += len;
        }
      }
      /* the black shelf and its corbels */
      px(c, P.mantleFace, 0, 0, w, 6);
      px(c, P.mantleGloss, 0, 0, w, 1);
      px(c, P.mantleBevel, 0, 5, w, 1);
      px(c, P.mantleFace, 6, 6, 7, 6);
      px(c, P.mantleBevel, 6, 11, 7, 1);
      px(c, P.mantleFace, w - 13, 6, 7, 6);
      px(c, P.mantleBevel, w - 13, 11, 7, 1);
      blit(c, m.tiles.capy, 1, -10);
      blit(c, m.tiles.battery, (w >> 1) - 3, -16);
      /* the remote at the right end, pointing left; its LED is live */
      px(c, P.remoteBody, w - 15, -5, 14, 5);
      px(c, P.remoteKey, w - 12, -4, 1, 1);
      px(c, P.remoteKey, w - 9, -4, 1, 1);
      px(c, P.remoteKey, w - 6, -4, 1, 1);
      px(c, P.remoteKey, w - 12, -2, 1, 1);
      px(c, P.remoteKey, w - 9, -2, 1, 1);
      px(c, P.remoteRed, w - 5, -2, 2, 1);
    },

    whiteboard: function (c, w, h, P, m) {
      var bh = h - 16, i;
      /* easel legs under the board */
      px(c, P.alumDark, 10, bh, 2, h - bh);
      px(c, P.alumDark, w - 12, bh, 2, h - bh);
      /* the frame, the face and the tray */
      px(c, P.alumMid, 0, 0, w, bh);
      px(c, P.alumLit, 0, 0, w, 1);
      px(c, P.alumDark, 0, bh - 1, w, 1);
      px(c, P.board, 2, 2, w - 4, bh - 10);
      for (i = 0; i < bh - 12; i++) px(c, P.boardGlare, 50 + Math.floor(i * 0.6), 2 + i, 6, 1);
      px(c, P.boardShade, 2, bh - 10, w - 4, 2);
      px(c, P.alumMid, 0, bh - 8, w, 6);
      px(c, P.groove, 3, bh - 6, w - 6, 2);
      px(c, P.markerBody, 14, bh - 7, 10, 3);
      px(c, P.inkBlue, 24, bh - 7, 3, 3);
      px(c, P.markerBody, 34, bh - 7, 10, 3);
      px(c, P.inkGreen, 44, bh - 7, 3, 3);
      /* the doodle somebody left on it, in the board's own plotters: a
         smiling face, a sun, an arrow pointing at nothing */
      var WB = m;
      WB.pcircle(c, 14, 8, 5, P.inkBlue);
      px(c, P.inkBlue, 12, 6, 1, 1);
      px(c, P.inkBlue, 16, 6, 1, 1);
      WB.pline(c, 11, 10, 13, 12, P.inkBlue);
      WB.pline(c, 13, 12, 16, 12, P.inkBlue);
      WB.pline(c, 16, 12, 17, 10, P.inkBlue);
      WB.pcircle(c, 30, 7, 2, P.inkOrange);
      WB.pline(c, 30, 2, 30, 3, P.inkOrange);
      WB.pline(c, 25, 7, 26, 7, P.inkOrange);
      WB.pline(c, 34, 7, 35, 7, P.inkOrange);
      WB.pline(c, 27, 4, 27, 4, P.inkOrange);
      WB.pline(c, 33, 4, 33, 4, P.inkOrange);
      WB.pline(c, 22, 13, 38, 13, P.inkPurple);
      WB.pline(c, 35, 11, 38, 13, P.inkPurple);
      WB.pline(c, 35, 15, 38, 13, P.inkPurple);
      var mg = m.tiles.magnet;
      blit(c, mg && mg[0] && mg[0][0], 2, 2);
      blit(c, mg && mg[1] && mg[1][0], w - 13, 2);
    },

    fort: function (c, w, h, P) {
      var x, i;
      px(c, P.kraft, 0, 0, w, h);
      for (x = 2; x < w; x += 4) px(c, P.flute, x, 3, 1, h - 6);
      px(c, P.kraftLit, 0, 0, w, 3);
      px(c, P.kraftShade, w >> 1, 0, 1, 3);
      px(c, P.kraftShade, 0, 3, w, 1);
      px(c, P.kraftShade, 0, h - 3, w, 3);
      px(c, P.kraftShade, w - 2, 3, 2, h - 6);
      /* the window the Cupman stands in, cut right of centre */
      px(c, P.kraftIn, FORT_WIN, 4, 20, 13);
      px(c, P.kraftShade, FORT_WIN - 1, 3, 22, 1);
      /* THIS WAY UP, twice */
      var arrows = [10, w - 22];
      for (i = 0; i < 2; i++) {
        x = arrows[i];
        px(c, P.print, x + 2, 34, 1, 9);
        px(c, P.print, x + 1, 35, 3, 1);
        px(c, P.print, x, 36, 5, 1);
        px(c, P.print, x + 8, 34, 1, 9);
        px(c, P.print, x + 7, 35, 3, 1);
        px(c, P.print, x + 6, 36, 5, 1);
        px(c, P.print, x - 1, 45, 13, 1);
      }
      /* a few of the Cupmen's pellets lying on top */
      var pl = Cupmen.tiles && Cupmen.tiles.pellet;
      if (pl) {
        blit(c, pl.red, 2, -8);
        blit(c, pl.yellow, w - 9, -7);
        blit(c, pl.green, w - 16, -6);
      }
    },

    /* DINING ROOM, piled on top */

    table: function (c, w, h, P, m) {
      var r = mulberry32(1101), i;
      /* legs, with the gap between them left open */
      var legs = [4, w - 10];
      for (i = 0; i < 2; i++) {
        px(c, P.walnutBody, legs[i], 10, 6, h - 10);
        px(c, P.walnutLit2, legs[i] + 1, 10, 1, h - 10);
      }
      px(c, P.walnutBody, 0, 5, w, 5);
      px(c, P.walnutEdge, 0, 9, w, 1);
      px(c, P.walnutMid, 0, 0, w, 5);
      px(c, P.walnutSheen, 0, 0, w, 1);
      for (i = 0; i < 8; i++) px(c, P.walnutGrainLit, Math.floor(r() * (w - 14)), 1 + Math.floor(r() * 3), 8 + Math.floor(r() * 10), 1);
      px(c, P.walnutEdge, 0, 4, w, 1);
      var bt = m.tiles.bottle;
      blit(c, bt && bt[0] && bt[0][2] && bt[0][2][0], 1, -34);
      var br = m.tiles.brownie;
      blit(c, br && br[0], (w >> 1) - 7, -11);
    },

    /* two of the island's bar stools: the level's own dark seat on a black
       pedestal, a chrome foot ring and a splayed glide. The level's leg
       tiles are drawn for a camera four centimetres off the floor and are
       34 wide; at this distance a stool leg is four. */
    floor: function (c, w, h, P, m) {
      var T2 = m.tiles, i;
      var seats = [3, w - 45];
      for (i = 0; i < 2; i++) {
        var cx = seats[i] + 21;
        px(c, P.glide, cx - 2, 9, 4, h - 12);
        px(c, P.glideLit, cx - 1, 9, 1, h - 12);
        px(c, P.glideLit, cx - 10, 32, 20, 2);
        px(c, P.glide, cx - 10, 34, 20, 1);
        px(c, P.glide, cx - 8, h - 3, 16, 3);
        px(c, P.glideLit, cx - 8, h - 3, 16, 1);
        blit(c, T2.seat, seats[i], 0);
      }
      var cr = T2.crumb;
      if (cr && cr[0] && cr[0][0]) {
        blit(c, cr[0][0][0], (w >> 1) - 14, -9);
        blit(c, cr[1] && cr[1][0] && cr[1][0][1], (w >> 1) + 6, -9);
      }
    },

    bar: function (c, w, h, P, m) {
      var r = mulberry32(1303), x, i;
      px(c, P.tv, 0, 0, w, h);
      for (x = 23; x < w; x += 24) px(c, P.mesh, x, 4, 1, h - 10);
      px(c, P.barArris, 0, 0, w, 3);
      for (i = 0; i < 12; i++) px(c, P.distress, Math.floor(r() * w), Math.floor(r() * 3), 1, 1);
      px(c, P.brass, 0, h - 7, w, 2);
      px(c, P.boxShade, 0, h - 4, w, 4);
      blit(c, m.tiles.cone, 1, -20);
      blit(c, m.tiles.snowman, (w >> 1) - 4, -13);
      /* a little humidifier at the right end; its mist is live */
      px(c, P.humBase, w - 12, -5, 10, 5);
      px(c, P.humDome, w - 11, -12, 8, 7);
      px(c, P.ringIdle, w - 11, -6, 8, 1);
    },

    ceiling: function (c, w, h, P, m) {
      var x;
      /* a slab of the dining-room ceiling, the right way up for the level:
         upside down, the plaster plane on top with its two cans in it, the
         crown under that, and the pendant standing up out of it */
      px(c, P.plasterMid, 0, 0, w, h);
      for (x = 31; x < w; x += 32) px(c, P.plasterShade, x, 7, 1, h - 7);
      px(c, P.crown, 0, 4, w, 2);
      px(c, P.crownShade, 0, 6, w, 1);
      px(c, P.plasterDim, 0, h - 3, w, 3);
      px(c, P.plasterLit, 0, 0, w, 4);
      px(c, P.planeNear, 0, 3, w, 1);
      var rg = m.tiles.register;
      blit(c, rg && rg[1], (w >> 1) - 9, 12);
      px(c, P.canRim, 18, 0, 8, 2);
      px(c, P.canLight, 19, 0, 6, 1);
      px(c, P.canRim, w - 26, 0, 8, 2);
      px(c, P.canLight, w - 25, 0, 6, 1);
      /* the pendant, on its rod, glowing upward */
      Tint.rect(c, 0, -27, 11, 8, P.lampGlow, 5);
      px(c, P.canopyRim, 2, -1, 7, 1);
      px(c, P.lampRod, 5, -14, 1, 13);
      px(c, P.lampGlass, 2, -19, 7, 5);
      px(c, P.glassMid, 2, -15, 7, 1);
    },

    tv: function (c, w, h, P) {
      var y;
      px(c, P.box, 0, 0, w, h);
      px(c, P.boxEdge, 0, 0, w, 1);
      px(c, P.boxEdge, 0, 0, 1, h);
      px(c, P.boxEdge, w - 1, 0, 1, h);
      /* the screen's well; the picture is live */
      px(c, '#050505', TV_SX - 1, TV_SY - 1, TV_SW + 2, TV_SH + 2);
      /* speaker grille and two dials */
      for (y = 6; y < h - 6; y += 3) px(c, P.sensor, w - 17, y, 14, 1);
      px(c, P.sensorLit, w - 17, 6, 14, 1);
      px(c, P.rail, w - 14, h - 14, 4, 4);
      px(c, P.rail, w - 8, h - 14, 4, 4);
      px(c, P.boxEdge, 0, h - 2, w, 2);
      /* a tape on top, and the rabbit ears */
      px(c, P.box, 1, -4, 12, 4);
      px(c, P.vcrBlue, 3, -3, 8, 2);
      px(c, P.rail, w - 16, -2, 8, 2);
      for (y = 0; y < 14; y++) {
        px(c, P.rail, w - 13 - Math.round(y * 0.45), -3 - y, 1, 1);
        px(c, P.rail, w - 11 + Math.round(y * 0.45), -3 - y, 1, 1);
      }
    },

    /* A LEVEL THE PLAYER HAS NOT EARNED: a dust sheet over whatever it is.
       Still a seat, never a spoiler. */
    tarp: function (c, w, h) {
      var x;
      px(c, '#5a5648', 0, 0, w, h);
      px(c, '#6c6858', 0, 0, w, 2);
      for (x = 7; x < w; x += 13) px(c, '#44413a', x + (x % 3) - 1, 3, 1, h - 3);
      px(c, '#8a7a5a', 0, Math.min(6, h - 3), w, 1);
      px(c, '#44413a', 0, h - 1, w, 1);
    },

    /* A LEVEL THIS FILE HAS NO PAINTER FOR: a bench in its own colours,
       the three every PREVIEW publishes for the generic cover */
    bench: function (c, w, h, P, m) {
      var Q = (m && m.PREVIEW) || {};
      px(c, Q.back || '#43301c', 0, 3, w, h - 3);
      px(c, Q.beam || '#6b4526', 0, 0, w, 3);
      px(c, Q.ground || '#1b1209', 0, h - 2, w, 2);
    }
  };

  /* the fort's window, and the TV's picture, in station coordinates -
     both the bake and the live layer need them */
  var FORT_WIN = 58;
  var TV_SX = 4, TV_SY = 4, TV_SW = 72, TV_SH = 44;

  /* THE SKY: dusk over the yard, a moon, a tree line, and the two posts
     the scoreboard stands on. Baked once; the only dither on this screen,
     because it is a still painting that moves only with the shake. */
  function bakeSky() {
    var s = makeCanvas(VW, GROUND), c = s.ctx, r = mulberry32(7), i, x;
    /* the last of the day is low and warm, so whatever shows through the
       top tier - between the table's legs, under the stools - is lit sky
       and a dark doodad in front of it still reads */
    Dither.verticalRamp(c, 0, 0, VW, 44, '#141a2e', '#1f2440', 4);
    Dither.verticalRamp(c, 0, 44, VW, 40, '#1f2440', '#3a3352', 4);
    Dither.verticalRamp(c, 0, 84, VW, 36, '#3a3352', '#644556', 4);
    Dither.verticalRamp(c, 0, 120, VW, 98, '#644556', '#8a5a4c', 4);
    c.globalAlpha = 0.45;
    for (i = 0; i < 14; i++) px(c, UI.C.ink, Math.floor(r() * VW), 2 + Math.floor(r() * 50), 1, 1);
    c.globalAlpha = 1;
    /* a full moon, right of the scoreboard and under the HI panel */
    var mx = 446, my = 32, rr = 5, dy;
    for (dy = -rr; dy <= rr; dy++) {
      var half = Math.round(Math.sqrt(rr * rr - dy * dy));
      px(c, '#d9d1b4', mx - half, my + dy, half * 2 + 1, 1);
    }
    px(c, '#bdb498', mx - 2, my - 1, 2, 2);
    px(c, '#bdb498', mx + 2, my + 2, 2, 1);
    /* two lines of trees, the far one higher and lighter */
    var rows = [[122, '#2a2a2c', 0.031, 0.11], [134, '#161a14', 0.047, 0.17]];
    for (i = 0; i < rows.length; i++) {
      var base = rows[i][0];
      c.fillStyle = rows[i][1];
      for (x = 0; x < VW; x++) {
        var top = base + Math.sin(x * rows[i][2] + i * 2) * 7 + Math.sin(x * rows[i][3] + 1) * 3 + Math.floor(r() * 2);
        c.fillRect(x, Math.round(top), 1, GROUND - Math.round(top));
      }
    }
    /* the scoreboard's two posts, rising from behind the stands */
    var posts = [132, 344];
    for (i = 0; i < 2; i++) {
      px(c, '#24201c', posts[i], SB_Y + SB_H, 4, 70);
      px(c, '#3a342d', posts[i], SB_Y + SB_H, 1, 70);
    }
    return s;
  }

  /* the lawn: two rows of turf with blades, then grass to the bottom */
  function bakeGround() {
    var g = makeCanvas(VW, VH - GROUND + 2), c = g.ctx, x;
    px(c, '#1c2612', 0, 2, VW, VH - GROUND);
    px(c, '#2a3a1a', 0, 2, VW, 2);
    for (x = 3; x < VW; x += 7) {
      px(c, '#3e5224', x, 1, 1, 2);
      px(c, '#3e5224', x + 2, 0, 1, 3);
    }
    return g;
  }

  /* THE TICKER along the foot of the scoreboard, baked once a visit into a
     strip of its own, because it is a hundred and fifty glyphs and the
     scoreboard is drawn every frame */
  function bakeTicker(n) {
    var names = [], i, j;
    for (i = tiers.length - 1; i >= 0; i--) {
      for (j = 0; j < tiers[i].stations.length; j++) {
        var st = tiers[i].stations[j];
        if (st.paint !== 'tarp') names.push(st.lv.name);
      }
    }
    var parts = [n + ' DOODADS IN THE STANDS'];
    if (names.length) parts.push('TONIGHT: ' + names.join(' · '));
    parts.push('PLEASE DO NOT CLIMB ON THE FURNITURE');
    var str = parts.join('   ★   ') + '   ★   ';
    var w = Font.measure(str, 1);
    var k = makeCanvas(w, 7);
    Font.draw(k.ctx, str, 0, 0, { scale: 1, colour: UI.C.gold });
    return k;
  }

  /* --------------------------------------------- the stations, alive */

  /* WHAT EACH STATION DOES WHEN NOBODY IS LOOKING, AND WHAT IT DOES WHEN
     THE DIRECTOR POINTS AT IT. Every entry may have init(st), idle(st, dt),
     draw(st, ctx, x, y) - x, y being the station's left end and seat line
     on screen - and event(st), which returns false if it is busy. Each one
     reaches only into its own level's module and only for tiles and
     colours, and every call is wrapped (liveCall), so one level renaming a
     tile costs that station its tricks and nothing else. */
  var LIVE = {

    coop: {
      init: function (st) { st.live.feather = null; st.live.featherT = rand(2, 7); st.live.wob = 0; },
      idle: function (st, dt) {
        var L = st.live;
        L.featherT -= dt;
        if (L.featherT <= 0 && !L.feather) { L.feather = { x: rand(14, st.w - 14), y: -48, t: 0 }; L.featherT = rand(7, 11); }
        if (L.feather) {
          L.feather.t += dt;
          L.feather.y += 9 * dt;
          if (L.feather.y >= -1) L.feather = null;
        }
        if (L.wob > 0) L.wob -= dt;
      },
      draw: function (st, ctx, ox, oy) {
        var L = st.live, P = Coop.P;
        var jig = L.wob > 0 ? (Math.floor(L.wob * 16) % 2 ? 1 : -1) : 0;
        blit(ctx, Coop.tiles.egg, ox + 3 + jig, oy - 11);
        if (L.feather) {
          var fx = Math.round(ox + L.feather.x + Math.sin(L.feather.t * 3) * 4), fy = Math.round(oy + L.feather.y);
          px(ctx, P.featherA, fx, fy, 3, 1);
          px(ctx, P.featherB, fx + 1, fy + 1, 2, 1);
        }
      },
      event: function (st) {
        if (st.live.wob > 0) return false;
        st.live.wob = 1.1;
        Audio3.play('crack');
        later(0.5, function () { Audio3.play('crack'); });
        var a = nearestTo(st, st.x + 7);
        if (a) later(0.35, function () { turnToward(a, st.x + 7, 1.8); say(a, '?'); });
      }
    },

    garden: {
      init: function (st) { st.live.tom = { s: 'hang', t: 0 }; },
      idle: function (st, dt) {
        var tm = st.live.tom;
        tm.t += dt;
        if (tm.s === 'fall' && tm.t >= 0.35) {
          tm.s = 'gone'; tm.t = 0;
          Audio3.play('splat');
          var x = st.x + st.w - 6, y = st.tread - 2;
          for (var i = 0; i < 7; i++) spark(x, y, rand(-30, 30), rand(-40, -12), 0.5, chance(0.5) ? Garden.P.leafMid : '#c84b31', 1, 300);
        } else if (tm.s === 'gone' && tm.t >= 1.2) { tm.s = 'grow'; tm.t = 0; }
        else if (tm.s === 'grow' && tm.t >= 1) { tm.s = 'hang'; tm.t = 0; }
      },
      draw: function (st, ctx, ox, oy) {
        var P = Garden.P, T2 = Garden.tiles, w = st.w;
        var sw = Math.round(Math.sin(t * TAU / 2.6 + st.k));
        /* a pepper plant at the left end */
        px(ctx, P.stalkMid, ox + 6, oy - 18, 1, 18);
        px(ctx, P.leafMid, ox + 7 + sw, oy - 10, 4, 2);
        px(ctx, P.leafMid, ox + 2 + sw, oy - 16, 4, 2);
        px(ctx, P.leafMid, ox + 7 + sw, oy - 19, 3, 2);
        blit(ctx, T2.pepper, ox + 2 + sw, oy - 15);
        /* a tomato on its bamboo stake, in a wire cage, at the right end */
        var sx = ox + w - 6;
        px(ctx, P.bambooMid, sx, oy - 22, 1, 22);
        px(ctx, P.cageWire, sx - 7, oy - 13, 15, 1);
        px(ctx, P.cageWire, sx - 7, oy - 6, 15, 1);
        px(ctx, P.cageWire, sx - 7, oy - 13, 1, 13);
        px(ctx, P.cageWire, sx + 7, oy - 13, 1, 13);
        var tm = st.live.tom, ty = oy - 21, ga = ctx.globalAlpha;
        if (tm.s === 'gone') return;
        if (tm.s === 'fall') ty += Math.round(easeInCubic(clamp(tm.t / 0.35, 0, 1)) * 10);
        if (tm.s === 'grow') ctx.globalAlpha = ga * clamp(tm.t, 0, 1);
        blit(ctx, T2.tomato, sx - 5 + (tm.s === 'fall' ? 0 : sw), ty);
        ctx.globalAlpha = ga;
      },
      event: function (st) {
        if (st.live.tom.s !== 'hang') return false;
        st.live.tom.s = 'fall'; st.live.tom.t = 0;
        var a = nearestTo(st, st.x + st.w - 6);
        if (a) later(0.4, function () { hop(a, 7); say(a, '!'); });
      }
    },

    deck: {
      init: function (st) { st.live.spit = 0; },
      idle: function (st, dt) {
        var L = st.live;
        if (L.spit <= 0) return;
        var was = L.spit;
        L.spit -= dt;
        if ((was > 1.0 && L.spit <= 1.0) || (was > 0.55 && L.spit <= 0.55)) {
          for (var i = 0; i < 5; i++) {
            spark(st.x + 3, st.tread - 18, rand(10, 30), rand(-16, -4), 0.9,
                  chance(0.5) ? Deck.P.mist : Deck.P.mistHi, 2, -6);
          }
        }
      },
      draw: function (st, ctx, ox, oy) {
        var P = Deck.P, f = Math.floor(t * 10) % 2, fx = ox + st.w - 12;
        px(ctx, UI.C.red, fx + 2 + f, oy - 6, 2, 1);
        px(ctx, UI.C.gold, fx + 5 - f, oy - 7, 1, 2);
        px(ctx, UI.C.red, fx + 7, oy - 6 - f, 1, 1);
        if (st.live.spit > 0) px(ctx, P.mistHi, ox + 1, oy - 19, 2, 1);
      },
      event: function (st) {
        if (st.live.spit > 0) return false;
        st.live.spit = 1.2;
        Audio3.play('hiss');
        var a = st.who[0];
        if (a) later(0.3, function () { a.shiverT = 0.7; say(a, '!'); });
      }
    },

    canopy: {
      init: function (st) { st.live.or = { s: 'hang', t: 0 }; },
      idle: function (st, dt) {
        var o = st.live.or;
        o.t += dt;
        if (o.s === 'fall' && o.t >= 0.3) { o.s = 'roll'; o.t = 0; Audio3.play('tock'); }
        else if (o.s === 'roll' && o.t >= 0.9) { o.s = 'gone'; o.t = 0; }
        else if (o.s === 'gone' && o.t >= 2) { o.s = 'grow'; o.t = 0; }
        else if (o.s === 'grow' && o.t >= 1) { o.s = 'hang'; o.t = 0; }
      },
      draw: function (st, ctx, ox, oy) {
        var P = Canopy.P, T2 = Canopy.tiles, w = st.w;
        var sw = Math.round(Math.sin(t * TAU / 1.3 + st.k));
        /* a leafy twig standing up off the right end, with fruit on it */
        var tx = ox + w - 5;
        px(ctx, P.barkMid, tx, oy - 22, 1, 22);
        px(ctx, P.barkMid, tx - 22, oy - 22, 22, 1);
        for (var i = 0; i < 5; i++) {
          px(ctx, P.leafMid, tx - 24 + i * 5, oy - 25 - (i % 2), 4, 2);
          px(ctx, P.leafHi, tx - 23 + i * 5, oy - 25 - (i % 2), 1, 1);
        }
        px(ctx, P.stem, tx - 19, oy - 21, 1, 2);
        blit(ctx, T2.apple, tx - 24 - sw, oy - 19);
        var o = st.live.or, ga = ctx.globalAlpha, fx = tx - 12 + sw, fy = oy - 19;
        if (o.s === 'gone') return;
        if (o.s === 'hang' || o.s === 'grow') px(ctx, P.stem, tx - 7, oy - 21, 1, 2);
        if (o.s === 'fall') { fx = tx - 12; fy = oy - 19 + Math.round(easeInCubic(clamp(o.t / 0.3, 0, 1)) * 7); }
        if (o.s === 'roll') {
          var k = clamp(o.t / 0.9, 0, 1);
          fx = tx - 12 - Math.round(k * 14);
          fy = oy - 12 - Math.round(Math.abs(Math.sin(k * Math.PI * 2)) * 2 * (1 - k));
          ctx.globalAlpha = ga * clamp((1 - k) / 0.35, 0, 1);
        }
        if (o.s === 'grow') ctx.globalAlpha = ga * clamp(o.t, 0, 1);
        blit(ctx, T2.orange, fx, fy);
        ctx.globalAlpha = ga;
      },
      event: function (st) {
        if (st.live.or.s !== 'hang') return false;
        st.live.or.s = 'fall'; st.live.or.t = 0;
        Audio3.play('pat');
        var a = nearestTo(st, st.x + st.w - 12);
        if (a) later(0.5, function () { turnToward(a, st.x + st.w - 20, 1.6); say(a, '?'); });
      }
    },

    construction: {
      init: function (st) { st.live.spin = 0; },
      idle: function (st, dt) {
        var L = st.live;
        if (L.spin <= 0) return;
        L.spin -= dt;
        if (chance(dt * 16)) {
          spark(st.x + (st.w >> 1), st.tread - 2, rand(-34, 34), rand(-46, -16), 0.6,
                chance(0.5) ? Construction.P.plyPale : Construction.P.plyLit, 1, 220);
        }
      },
      draw: function (st, ctx, ox, oy) {
        var bl = Construction.tiles.blade, frames = bl && bl[9];
        if (!frames || !frames.length) return;
        var f = st.live.spin > 0 ? Math.floor(t * 24) % frames.length : 0;
        var cx = ox + (st.w >> 1);
        /* the top half only: the rest of the blade is under the plywood */
        ctx.save();
        ctx.beginPath(); ctx.rect(cx - 10, oy - 10, 21, 10); ctx.clip();
        blit(ctx, frames[f], cx - 9, oy - 9);
        ctx.restore();
      },
      event: function (st) {
        if (st.live.spin > 0) return false;
        st.live.spin = 2.4;
        Audio3.play('whirr');
        for (var i = 0; i < st.who.length; i++) {
          (function (a, d) { later(d, function () { hop(a, 10); say(a, '!'); }); })(st.who[i], 0.15 + i * 0.2);
        }
      }
    },

    desk: {
      init: function (st) { st.live.ring = 0; st.live.steamT = rand(0, 0.5); },
      idle: function (st, dt) {
        var L = st.live;
        L.steamT -= dt;
        if (L.steamT <= 0) {
          L.steamT = 0.5;
          spark(st.x + 8 + rand(-2, 2), st.tread - 13, rand(-2, 2), rand(-12, -8), 0.7, Desk.P.deskLit, 1, 0, 0.5);
        }
        if (L.ring > 0) L.ring -= dt;
      },
      draw: function (st, ctx, ox, oy) {
        var T2 = Desk.tiles, ringing = st.live.ring > 0;
        var jig = ringing ? (Math.floor(t / 0.08) % 2 ? 1 : -1) : 0;
        var ic = T2.icon && T2.icon[0];
        if (ic) blit(ctx, ic[ringing ? 1 : 0], ox + st.w - 16 + jig, oy - 16);
        var cf = ringing ? Math.floor(t * 8) % 4 : 0;
        blit(ctx, T2.coin && T2.coin[cf], ox + (st.w >> 1) - 6, oy - 13);
      },
      event: function (st) {
        if (st.live.ring > 0) return false;
        st.live.ring = 1.6;
        Audio3.play('ring');
        later(0.55, function () { Audio3.play('ring'); });
        var b = nearestTo(st, st.x + st.w - 8);
        if (b) later(0.25, function () { hop(b, 9); say(b, '!'); });
      }
    },

    couch: {
      init: function (st) { st.live.pops = []; st.live.popT = rand(1, 4); },
      idle: function (st, dt) {
        var L = st.live, i;
        L.popT -= dt;
        if (L.popT <= 0) { L.popT = rand(3.5, 5.5); popcorn(st, false); }
        for (i = L.pops.length - 1; i >= 0; i--) {
          L.pops[i].t += dt;
          if (L.pops[i].t >= L.pops[i].dur) L.pops.splice(i, 1);
        }
      },
      draw: function (st, ctx, ox, oy) {
        var pop = Couch.tiles.pop, L = st.live;
        if (!pop) return;
        for (var i = 0; i < L.pops.length; i++) {
          var p = L.pops[i], k = p.t / p.dur;
          var fr = pop[p.s] && pop[p.s][Math.floor(p.t * 12) % 4];
          blit(ctx, fr, ox + (st.w >> 1) - 4 + p.x + k * p.dx, oy - 9 - Math.sin(k * Math.PI) * p.h);
        }
      },
      event: function (st) {
        for (var i = 0; i < 5; i++) later(i * 0.24, function () { popcorn(st, true); });
        for (var j = 0; j < st.who.length; j++) {
          (function (a, d) { later(d, function () { a.flap(); say(a, '!'); }); })(st.who[j], 0.3 + j * 0.35);
        }
      }
    },

    mantle: {
      init: function (st) { st.live.beam = 0; },
      idle: function (st, dt) { if (st.live.beam > 0) st.live.beam -= dt; },
      draw: function (st, ctx, ox, oy) {
        var P = Mantle.P, w = st.w;
        px(ctx, Math.floor(t / 0.6) % 2 ? P.led : P.ledOff, ox + w - 15, oy - 4, 1, 1);
        if (st.live.beam > 0) {
          var k = clamp(1 - st.live.beam / 0.4, 0, 1), len = Math.round(k * (w - 15)) + 4;
          var bx = ox + w - 16 - len;
          px(ctx, P.laserHalo, bx, oy - 5, len, 3);
          px(ctx, P.laserCore, bx, oy - 4, len, 1);
        }
      },
      event: function (st) {
        if (st.live.beam > 0) return false;
        st.live.beam = 0.4;
        Audio3.play('pew');
        var a = st.who[0];
        if (a) later(0.15, function () { a.duckT = 0.4; say(a, '!'); });
      }
    },

    whiteboard: {
      init: function (st) { st.live.s = 'clean'; st.live.t = 0; st.live.art = null; },
      idle: function (st, dt) {
        var L = st.live;
        L.t += dt;
        if (L.s === 'drawing' && L.t >= 1.8) { L.s = 'drawn'; L.t = 0; }
        else if (L.s === 'drawn' && L.t >= 6) { L.s = 'erasing'; L.t = 0; Audio3.play('erase'); }
        else if (L.s === 'erasing' && L.t >= 0.8) { L.s = 'clean'; L.t = 0; }
      },
      draw: function (st, ctx, ox, oy) {
        var L = st.live;
        if (L.s === 'clean') return;
        if (!L.art) L.art = bakeDoodle(st);
        var x0 = 46, w = st.w - 50, from = 0, to = w;
        if (L.s === 'drawing') to = Math.round(w * clamp(L.t / 1.8, 0, 1));
        if (L.s === 'erasing') from = Math.round(w * clamp(L.t / 0.8, 0, 1));
        if (to > from) {
          ctx.save();
          ctx.beginPath(); ctx.rect(ox + x0 + from, oy + 2, to - from, 14); ctx.clip();
          ctx.drawImage(L.art.canvas, ox + x0, oy + 2);
          ctx.restore();
        }
        var P = Whiteboard.P;
        if (L.s === 'drawing') {
          px(ctx, P.markerBody, ox + x0 + to, oy + 4, 8, 3);
          px(ctx, P.inkPurple, ox + x0 + to - 1, oy + 5, 2, 1);
        }
        if (L.s === 'erasing') {
          px(ctx, P.alumDark, ox + x0 + from - 2, oy + 3, 9, 6);
          px(ctx, P.alumLit, ox + x0 + from - 2, oy + 3, 9, 1);
        }
      },
      event: function (st) {
        if (st.live.s !== 'clean') return false;
        st.live.s = 'drawing'; st.live.t = 0;
        Audio3.play('chalk');
        for (var i = 0; i < st.who.length; i++) turnToward(st.who[i], st.x + 70, 2.4);
      }
    },

    fort: {
      init: function (st) { st.live.pop = 0; st.live.anchor = { x: 0, y: 0, r: 3 }; },
      idle: function (st, dt) { if (st.live.pop > 0) st.live.pop -= dt; },
      draw: function (st, ctx, ox, oy) {
        if (!Cupmen.drawPixelCup) return;
        var L = st.live, cx = ox + FORT_WIN + 10;
        var near = nearestTo(st, cx), face = near && near.x < cx ? -1 : 1;
        if (L.pop > 0) {
          /* up out of the top of the box, and back down into it */
          var k = 1.6 - L.pop, rise = k < 0.2 ? k / 0.2 : (L.pop < 0.2 ? L.pop / 0.2 : 1);
          ctx.save();
          ctx.beginPath(); ctx.rect(cx - 6, oy - 12, 12, 12); ctx.clip();
          Cupmen.drawPixelCup(ctx, cx, oy + 9 - Math.round(rise * 9), 'crimson', face, true);
          ctx.restore();
          L.anchor.x = cx - 2; L.anchor.y = oy - 8;
          return;
        }
        var bob = Math.floor(t / 0.6) % 2;
        ctx.save();
        ctx.beginPath(); ctx.rect(ox + FORT_WIN, oy + 4, 20, 13); ctx.clip();
        Cupmen.drawPixelCup(ctx, cx, oy + 17 - bob, 'crimson', face, true);
        ctx.restore();
      },
      event: function (st) {
        if (st.live.pop > 0) return false;
        st.live.pop = 1.6;
        Audio3.play('stomp');
        later(0.2, function () { say(st.live.anchor, '!'); });
        for (var i = 0; i < st.who.length; i++) {
          (function (a, d) { later(d, function () { hop(a, 9); say(a, '!'); }); })(st.who[i], 0.35 + i * 0.15);
        }
      }
    },

    table: {
      init: function (st) { st.live.craneT = rand(1, 3); st.live.flap = 0; st.live.squirt = 0; },
      idle: function (st, dt) {
        var L = st.live;
        L.craneT -= dt;
        if (L.craneT <= 0) { L.flap = 0.4; L.craneT = rand(2.5, 4); }
        if (L.flap > 0) L.flap -= dt;
        if (L.squirt > 0) L.squirt -= dt;
      },
      draw: function (st, ctx, ox, oy) {
        var L = st.live, cr = Table.tiles.crane;
        var f = L.flap > 0 ? [1, 2, 1, 0][clamp(Math.floor((0.4 - L.flap) / 0.1), 0, 3)] : 0;
        blit(ctx, cr && cr[f], ox + st.w - 24, oy - 17);
        if (L.squirt > 0) {
          var k = clamp(1 - L.squirt / 0.6, 0, 1);
          for (var i = 0; i < 3; i++) {
            var q = clamp(k - i * 0.08, 0, 1);
            if (q <= 0) continue;
            px(ctx, UI.C.red, Math.round(ox + 9 + q * 22), Math.round(oy - 35 - Math.sin(q * Math.PI) * 10 + q * 6), 2, 2);
          }
        }
      },
      event: function (st) {
        if (st.live.squirt > 0) return false;
        st.live.squirt = 0.6;
        Audio3.play('squirt');
        var a = nearestTo(st, st.x + 20);
        if (a) later(0.35, function () { a.flap(); a.shiverT = 0.4; say(a, '!'); });
      }
    },

    floor: {
      init: function (st) { st.live.lx = 0; st.live.to = 0; st.live.leafT = rand(2, 5); st.live.blow = []; },
      idle: function (st, dt) {
        var L = st.live, i;
        L.leafT -= dt;
        if (L.leafT <= 0) { L.leafT = rand(4, 6); L.to = L.lx > 0 ? -6 : 6; }
        L.lx = approach(L.lx, L.to, 20 * dt);
        for (i = L.blow.length - 1; i >= 0; i--) {
          L.blow[i].t += dt;
          if (L.blow[i].t >= 1.1) L.blow.splice(i, 1);
        }
      },
      draw: function (st, ctx, ox, oy) {
        var lf = Floor.tiles.leaf, L = st.live, i;
        if (!lf) return;
        var moving = L.lx !== L.to;
        blit(ctx, lf[0][moving ? Math.floor(t * 10) % 4 : 0], ox + (st.w >> 1) - 9 + Math.round(L.lx), oy - 11);
        for (i = 0; i < L.blow.length; i++) {
          var b = L.blow[i], k = b.t / 1.1;
          blit(ctx, lf[b.kind][Math.floor(b.t * 12) % 4], ox - 18 + k * (st.w + 18), oy - 13 - b.h - Math.sin(k * TAU) * 3);
        }
      },
      event: function (st) {
        if (st.live.blow.length) return false;
        for (var i = 0; i < 3; i++) st.live.blow.push({ t: -i * 0.2, kind: i % 2, h: i * 4 });
        Audio3.play('hiss');
        for (var j = 0; j < st.who.length; j++) {
          (function (a, d) { later(d, function () { a.shiverT = 0.6; say(a, j === 0 ? '·' : '!'); }); })(st.who[j], 0.3 + j * 0.3);
        }
      }
    },

    bar: {
      init: function (st) { st.live.mistT = 0; st.live.surge = 0; },
      idle: function (st, dt) {
        var L = st.live;
        if (L.surge > 0) L.surge -= dt;
        L.mistT -= dt;
        if (L.mistT <= 0) {
          L.mistT = L.surge > 0 ? 0.1 : 0.6;
          spark(st.x + st.w - 7 + rand(-1, 1), st.tread - 13, rand(-3, 3), rand(-14, -8),
                L.surge > 0 ? 1.2 : 0.9, Bar.P.mist, 2, 0, 0.6);
        }
      },
      event: function (st) {
        if (st.live.surge > 0) return false;
        st.live.surge = 0.8;
        Audio3.play('hiss');
        var a = nearestTo(st, st.x + st.w - 7);
        if (a) later(0.3, function () { a.shiverT = 0.5; say(a, '!'); });
      }
    },

    ceiling: {
      init: function (st) { st.live.fy = rand(0, 30); st.live.pole = 0; st.live.ps = 'idle'; st.live.pt = 0; },
      idle: function (st, dt) {
        var L = st.live;
        L.fy += 6 * dt;
        if (L.fy > 32) L.fy = 0;
        L.pt += dt;
        if (L.ps === 'out') { L.pole = clamp(L.pt / 0.5, 0, 1); if (L.pt >= 0.5) { L.ps = 'hold'; L.pt = 0; Audio3.play('tock'); } }
        else if (L.ps === 'hold' && L.pt >= 1.5) { L.ps = 'in'; L.pt = 0; }
        else if (L.ps === 'in') { L.pole = clamp(1 - L.pt / 0.5, 0, 1); if (L.pt >= 0.5) { L.ps = 'idle'; L.pole = 0; } }
      },
      draw: function (st, ctx, ox, oy) {
        var P = Ceiling.P, T2 = Ceiling.tiles, L = st.live, ga = ctx.globalAlpha;
        /* a feather falling up, because the room is upside down */
        var ft = T2.feather && T2.feather[0] && T2.feather[0][0];
        if (ft) {
          ctx.globalAlpha = ga * clamp(1 - L.fy / 32, 0, 1) * clamp(L.fy / 4, 0, 1);
          blit(ctx, ft, ox + (st.w >> 1) - 7 + Math.sin(t * 1.7 + st.k) * 2, oy - 18 - L.fy);
          ctx.globalAlpha = ga;
        }
        /* the telescoping pole somebody keeps poking at it */
        var hgt = 10 + Math.round(easeInOut(L.pole) * 24), x = ox + st.w - 6;
        px(ctx, P.poleLit, x, oy - hgt, 2, hgt);
        px(ctx, P.collar, x - 1, oy - 6, 4, 2);
        blit(ctx, T2.hook, x - 5, oy - hgt - 11);
      },
      event: function (st) {
        if (st.live.ps !== 'idle') return false;
        st.live.ps = 'out'; st.live.pt = 0;
        Audio3.play('clank');
        var a = nearestTo(st, st.x + st.w - 6);
        if (a) later(0.5, function () { turnToward(a, st.x + st.w - 6, 1.6); say(a, '?'); });
      }
    },

    tv: {
      /* the channel list is made on the first idle, not here: init runs
         while the tiers are still being laid out, and the TV's own room is
         not in them yet */
      init: function (st) {
        var L = st.live;
        L.list = null; L.ch = 0;
        L.cutT = 4.5; L.snow = 0; L.surf = 0; L.surfT = 0;
        L.pic = makeCanvas(TV_SW, TV_SH);
      },
      idle: function (st, dt) {
        var L = st.live;
        if (!L.list) { L.list = channels(); L.ch = Math.floor(Math.random() * Math.max(1, L.list.length)); }
        L.cutT -= dt;
        if (L.snow > 0) L.snow -= dt;
        if (L.surf > 0) {
          L.surf -= dt; L.surfT -= dt;
          if (L.surfT <= 0) { L.surfT = 0.3; changeChannel(L); Audio3.play('chan'); }
        } else if (L.cutT <= 0) { L.cutT = 4.5; changeChannel(L); }
      },
      draw: function (st, ctx, ox, oy) {
        var L = st.live, P = TV.P, x = ox + TV_SX, y = oy + TV_SY;
        var lv = L.list ? L.list[L.ch] : null;
        paintChannel(L, lv);
        ctx.drawImage(L.pic.canvas, x, y);
        if (L.snow > 0) {
          var sn = TV.tiles[Math.floor(t * 30) % 2 ? 'snowA' : 'snowB'];
          if (sn) ctx.drawImage(canvasOf(sn), (Math.floor(t * 977) % 300), (Math.floor(t * 613) % 150), TV_SW, TV_SH, x, y, TV_SW, TV_SH);
        }
        var sc = TV.tiles.scan;
        if (sc) ctx.drawImage(canvasOf(sc), 0, 0, TV_SW, TV_SH, x, y, TV_SW, TV_SH);
        px(ctx, P.reflWell, x + 2, y + 1, TV_SW - 8, 1);
        if (lv && lv.code) {
          Font.draw(ctx, 'CH ' + lv.code.replace('-', ''), x + 3, y + 3, { scale: 1, colour: P.osd, shadow: '#000' });
        }
      },
      event: function (st) {
        if (st.live.surf > 0) return false;
        st.live.surf = 1.2; st.live.surfT = 0;
        for (var i = 0; i < st.who.length; i++) turnToward(st.who[i], st.x + TV_SX + TV_SW / 2, 2);
      }
    }
  };

  /* every open level that has a cover, for the TV station to surf */
  function channels() {
    var out = [], i, j;
    for (i = 0; i < tiers.length; i++) {
      for (j = 0; j < tiers[i].stations.length; j++) {
        var lv = tiers[i].stations[j].lv;
        if (Levels.isUnlocked(lv) && lv.art) out.push(lv);
      }
    }
    return out;
  }

  function changeChannel(L) {
    if (L.list.length > 1) L.ch = (L.ch + 1) % L.list.length;
    L.snow = 0.25;
  }

  /* ONE COVER INTO THE TV'S PICTURE, the TV's own way (js/tv.js
     paintCover): reset the canvas, clip, and a cover that throws is off
     the air from then on rather than taking the station down with it. */
  var offAir = {};
  function paintChannel(L, lv) {
    var c = L.pic.ctx, m = lv && lv.art;
    var back = m && m.PREVIEW ? m.PREVIEW.back : Coop.PREVIEW.back;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
    c.fillStyle = back; c.fillRect(0, 0, TV_SW, TV_SH);
    if (!lv || offAir[lv.id]) return;
    c.save();
    c.beginPath(); c.rect(0, 0, TV_SW, TV_SH); c.clip();
    try {
      if (m.drawPreview) m.drawPreview(c, 0, 0, TV_SW, TV_SH, t, false);
      else coopCard(c, 0, 0, TV_SW, TV_SH, t);
      c.restore();
    } catch (e) {
      offAir[lv.id] = true;
      L.pic = makeCanvas(TV_SW, TV_SH);
    }
  }

  /* THE COOP'S CARD, copied from js/tv.js (which copied it from the level
     select) rather than reached for: the Coop is the one level with no
     drawPreview of its own, and a shared helper between three screens is
     a helper that gets changed for one of them. */
  function coopCard(c, x, y, w, h, tt) {
    var Q = Coop.PREVIEW, s = tt * 24, i, k;
    var ceil = y + 6, floor = y + h - 9;
    c.fillStyle = Q.back; c.fillRect(x, y, w, h);
    for (i = -1; i < w / 11 + 1; i++) {
      var sx = Math.round(x + i * 11 - (s * 0.25) % 11);
      c.fillStyle = (i % 2) ? Q.backAlt : Q.back; c.fillRect(sx, y, 10, h);
      c.fillStyle = Q.seam; c.fillRect(sx, y, 1, h);
    }
    Tint.rect(c, x, y, w, Math.round(h * 0.5), Q.air, 1);
    Tint.rect(c, x, y + h - 30, w, 30, Q.gloom, 3);
    c.fillStyle = Q.beam; c.fillRect(x, y, w, 6);
    c.fillStyle = Q.beamDark; c.fillRect(x, y + 4, w, 2);
    c.fillStyle = Q.ground; c.fillRect(x, floor, w, y + h - floor);
    Tint.rect(c, x, floor, w, y + h - floor, Q.groundDark, 7);
    c.fillStyle = Q.groundHi; c.fillRect(x, floor, w, 1);
    var period = 40, span = floor - ceil;
    for (k = 0; k < 4; k++) {
      var ox = Math.round(x + w + 12 - ((s + k * period) % (period * 4)));
      if (ox < x - 14 || ox > x + w + 2) continue;
      var gapH = Math.round(span * 0.34);
      var gapY = Math.round(ceil + 6 + ((k * 17) % Math.max(1, span - gapH - 12)));
      planklet(c, ox, ceil, gapY - ceil, Q);
      planklet(c, ox, gapY + gapH, floor - gapY - gapH, Q);
    }
    var bx = Math.round(x + w * 0.32), by = Math.round(y + h / 2 + Math.sin(tt * 3.1) * (h * 0.16));
    c.fillStyle = '#20150c'; c.fillRect(bx - 3, by - 3, 7, 7);
    c.fillStyle = '#c9873c'; c.fillRect(bx - 2, by - 2, 5, 5);
    c.fillStyle = '#eab873'; c.fillRect(bx - 2, by - 2, 3, 1);
    c.fillStyle = '#f3cc84'; c.fillRect(bx + 3, by, 2, 1);
  }

  function planklet(c, x, y, h, Q) {
    if (h <= 0) return;
    c.fillStyle = Q.beam; c.fillRect(x, y, 10, h);
    c.fillStyle = Q.beamLight; c.fillRect(x + 1, y, 2, h);
    c.fillStyle = Q.beamDark; c.fillRect(x, y, 1, h); c.fillRect(x + 9, y, 1, h);
  }

  /* the whiteboard's second doodle, the one the marker draws while you
     watch: a stick doodad with wings, and a heart */
  function bakeDoodle(st) {
    var k = makeCanvas(st.w - 50, 14), c = k.ctx, P = Whiteboard.P, WB = Whiteboard;
    WB.pcircle(c, 8, 7, 5, P.inkPurple);
    c.fillStyle = P.inkPurple; c.fillRect(10, 5, 1, 1);
    WB.pline(c, 13, 7, 16, 8, P.inkOrange);
    WB.pline(c, 4, 6, 0, 2, P.inkPurple);
    WB.pline(c, 0, 2, 2, 8, P.inkPurple);
    WB.pline(c, 22, 5, 24, 3, P.inkGreen);
    WB.pline(c, 24, 3, 26, 5, P.inkGreen);
    WB.pline(c, 26, 5, 28, 3, P.inkGreen);
    WB.pline(c, 28, 3, 30, 5, P.inkGreen);
    WB.pline(c, 22, 5, 26, 11, P.inkGreen);
    WB.pline(c, 30, 5, 26, 11, P.inkGreen);
    WB.pline(c, 34, 10, 40, 10, P.inkBlue);
    return k;
  }

  function popcorn(st, loud) {
    st.live.pops.push({ t: 0, dur: 0.7, x: rand(-4, 4), dx: rand(-8, 8), h: rand(10, 18), s: Math.random() < 0.5 ? 0 : 1 });
    if (loud) Audio3.play('bop');
  }

  /* every call into a LIVE entry goes through here */
  function liveCall(st, fn, a, b, c) {
    if (FAILED[st.id] && st.paint !== 'bench' && st.paint !== 'tarp') return undefined;
    var L = LIVE[st.paint];
    if (!L || !L[fn]) return undefined;
    try { return L[fn](st, a, b, c); }
    catch (e) {
      FAILED[st.id] = true;
      if (window.console) console.warn('stands: ' + st.id + ' has stopped doing tricks', e);
      return undefined;
    }
  }

  /* -------------------------------------------------------- actors */

  function Actor(d) {
    var sp = d.sprite, k;
    this.id = d.id;
    this.role = d.title.role;
    this.r = d.title.r * FIT;
    k = this.r / sp.bodyR;
    /* the sprite's reach either side of its pivot and above it, in pixels
       at this size: plenty of sprites are not centred on their pivot, so
       the seating is done against these and never against the radius */
    this.L = sp.pivotX * k;
    this.R = (sp.w - sp.pivotX) * k;
    this.up = sp.pivotY * k;
    this.foot = this.r * sp.footOffset;
    this.height = this.foot + this.up;
    this.x = 0; this.y = 0; this.angle = 0;
    this.flapTimer = 0;
    this.timer = rand(1, 4);
    this.bobPhase = rand(0, TAU);
    this.st = null; this.seatX = 0; this.sway = 0;
    this.mode = 'sit';
    this.hy = 0; this.hv = 0; this.hops = 0; this.attempt = false; this.maxLift = 0;
    this.flip = false; this.turnT = -1; this.turnTo = false; this.holdT = 0;
    this.sqx = 1; this.duckT = 0; this.shiverT = 0;
    this.flight = null;
  }

  Actor.prototype.flap = function () { this.flapTimer = 0.28; };
  Actor.prototype.flying = function () { return this.flapTimer > 0; };

  function seatY(a) { return a.st.tread - a.foot; }

  /* ---- the lift: every hop, attempt and dart is the same little ballistic
     offset above the seat, so nobody ever leaves their seat to do it */

  function stepLift(a, dt) {
    if (a.hy === 0 && a.hv === 0) return false;
    a.hv += 620 * dt;
    if (a.attempt && a.hv > -20 && a.flapTimer <= 0.02 && a.hops > 0) { a.hops--; a.flap(); a.hv -= 78; }
    a.hy += a.hv * dt;
    if (a.hy < -a.maxLift) { a.hy = -a.maxLift; if (a.hv < 0) a.hv = 0; }
    if (a.hy >= 0) {
      a.hy = 0; a.hv = 0;
      if (a.mode !== 'hover') puff(a.x, a.st.tread, 3);
      if (a.attempt) { a.attempt = false; say(a, '?'); }
    }
    return true;
  }

  /* HOW HIGH THIS DOODAD MAY GO OFF ITS SEAT. Only the top tier has a
     ceiling, and it is the scoreboard's shadow - or, out past the board's
     ends, the HI panel and the sound toggle, which reach row 33. The front
     tier is frontmost, so rising in front of the row behind is simply
     depth; the middle is kept modest so a hop reads as a hop. */
  function liftCap(a) {
    var top = a.st.tier.index === tiers.length - 1 && tiers.length > 1;
    if (!top) return a.st.tier.index === 0 ? 40 : 16;
    var head = seatY(a) - a.up - 1.2;
    var under = a.x + a.R > SB_X - 2 && a.x - a.L < SB_X + SB_W + 4;
    return Math.max(0, head - (under ? HEAD : 36));
  }

  function hop(a, apex) {
    if (!a || a.flight || a.hy !== 0) return;
    var cap = liftCap(a);
    a.flap();
    apex = Math.min(apex, cap);
    if (apex < 1) return;         /* no headroom: the flap is the hop */
    a.maxLift = cap;
    a.hv = -Math.sqrt(2 * 620 * apex);
    a.hy = -0.01;
  }

  function attempt(a, sym) {
    if (!a || a.flight || a.hy !== 0) return;
    a.maxLift = liftCap(a);
    a.hv = -120; a.hy = -0.01; a.hops = 3; a.attempt = true;
    a.flap();
    say(a, sym || '!');
  }

  /* ---- TURN: a doodad looks the other way. The sprite squeezes to a
     sliver and comes back mirrored, the way a flat paper puppet turns.
     Mirroring swaps a sprite's two reaches - Alpha carries 25 px left of
     his pivot and 16 right - so a turn that would push into a neighbour
     or off the edge is played as a glance instead, the squeeze without
     the flip. */

  function turn(a, face, hold) {
    if (!a || a.flight || a.turnT >= 0) return;
    if (face === a.flip && !hold) return;
    a.turnT = 0;
    a.turnTo = (face === a.flip || flipFits(a, face)) ? face : a.flip;
    a.holdT = hold || 0;
  }

  function turnToward(a, x, hold) { if (a) turn(a, x < a.x, hold); }

  function flipFits(a, face) {
    var hx = a.st.x + a.seatX;
    var left = face ? a.R : a.L, right = face ? a.L : a.R;
    if (hx - left < 0 || hx + right > VW) return false;
    for (var i = 0; i < stage.length; i++) {
      var o = stage[i];
      if (o === a || o.flight || o.st.tier !== a.st.tier) continue;
      var ox = o.st.x + o.seatX, oL = o.flip ? o.R : o.L, oR = o.flip ? o.L : o.R;
      if (ox < hx && ox + oR + 1 > hx - left) return false;
      if (ox > hx && ox - oL - 1 < hx + right) return false;
    }
    return true;
  }

  function stepTurn(a, dt) {
    if (a.turnT >= 0) {
      var was = a.turnT;
      a.turnT += dt;
      if (was < 0.09 && a.turnT >= 0.09) a.flip = a.turnTo;
      a.sqx = 1 - 0.9 * Math.sin(Math.PI * clamp(a.turnT / 0.18, 0, 1));
      if (a.turnT >= 0.18) { a.turnT = -1; a.sqx = 1; }
    } else if (a.holdT > 0) {
      a.holdT -= dt;
      if (a.holdT <= 0) { a.holdT = 0; if (a.flip) turn(a, false, 0); }
    }
  }

  /* ---- sitter: bobs on its seat, chirps, now and then looks round */

  function updateSitter(a, dt) {
    a.timer -= dt;
    var lifting = stepLift(a, dt);
    a.x = damp(a.x, a.st.x + a.seatX, 0.02, dt);
    a.y = seatY(a) + Math.sin(t * 2.1 + a.bobPhase) * 1.2 + a.hy;
    a.angle = lifting ? clamp(a.hv / 700, -0.16, 0.2) : Math.sin(t * 1.1 + a.bobPhase) * 0.05;
    if (a.timer <= 0) {
      a.timer = rand(2.2, 5);
      var roll = Math.random();
      if (roll < 0.4) { a.flap(); say(a, '♪'); }
      else if (roll < 0.62) say(a, '·');
      else if (roll < 0.8) turn(a, !a.flip, rand(1.5, 3));
    }
  }

  /* ---- stomper: a walker on the front tier, which is frontmost, so it
     can stamp and hop and have its go at flying without passing behind
     anybody. The porch's stomper, without the walk. */

  function updateStomper(a, dt) {
    a.timer -= dt;
    var lifting = stepLift(a, dt);
    var home = a.st.x + a.seatX;
    a.x = damp(a.x, home + Math.sin(t * 0.3 + a.bobPhase) * a.sway, 0.4, dt);
    a.y = seatY(a) - (lifting ? 0 : Math.abs(Math.sin(t * 3.4 + a.bobPhase)) * 1.6) + a.hy;
    a.angle = lifting ? clamp(a.hv / 700, -0.16, 0.2) : Math.sin(t * 3.4 + a.bobPhase) * 0.04;
    if (!lifting && a.timer <= 0) {
      a.timer = rand(2.4, 5.5);
      var roll = Math.random();
      if (roll < 0.4) hop(a, 7);
      else if (roll < 0.62) attempt(a, '!');
      else if (roll < 0.8) turn(a, !a.flip, rand(1.5, 3));
    }
  }

  /* ---- flyer: never sits, hovers a hair over its seat with a beat every
     half second, and the director sends it on flyovers */

  function updateFlyer(a, dt) {
    a.timer -= dt;
    if (a.flight) { stepFlight(a, dt); return; }
    var lifting = stepLift(a, dt);
    a.x = damp(a.x, a.st.x + a.seatX, 0.02, dt);
    a.y = seatY(a) - 2 + Math.sin(t * 2.4 + a.bobPhase) * 2 + a.hy;
    a.angle = lifting ? -0.12 : Math.sin(t * 1.3 + a.bobPhase) * 0.06;
    if (a.flapTimer <= -0.22) a.flap();
    if (a.timer <= 0) {
      a.timer = rand(2.5, 5);
      if (chance(0.4)) say(a, '·');
      else if (chance(0.4)) turn(a, !a.flip, rand(1.5, 3));
    }
  }

  var BEHAVIOUR = { sit: updateSitter, stomp: updateStomper, hover: updateFlyer };

  /* THE FLYOVER: up off the seat, across to buzz somebody, and home -
     one smooth Catmull-Rom line through four points, eased as a whole so
     it leaves and lands gently. The bird faces the way it is going, and
     it never rises above HEAD or past an edge. */
  function flyover(a, target) {
    var side = target.x < VW / 2 ? 1 : -1;
    a.flight = {
      t: 0, dur: 3.2, target: target, poked: false,
      pts: [{ x: a.x, y: a.y },
            { x: a.x + side * 10, y: a.st.tread - 64 },
            { x: target.x + side * 30, y: target.y - 26 }]
    };
    if (a.turnT >= 0) { a.turnT = -1; a.sqx = 1; }
    a.holdT = 0;
  }

  function cr(p0, p1, p2, p3, f) {
    return 0.5 * (2 * p1 + (p2 - p0) * f + (2 * p0 - 5 * p1 + 4 * p2 - p3) * f * f + (3 * p1 - p0 - 3 * p2 + p3) * f * f * f);
  }

  function stepFlight(a, dt) {
    var f = a.flight;
    f.t += dt;
    var u = clamp(f.t / f.dur, 0, 1);
    var home = { x: a.st.x + a.seatX, y: seatY(a) - 2 };
    var P = [f.pts[0], f.pts[0], f.pts[1], f.pts[2], home, home];
    var e = easeInOut(u) * 3, i = Math.min(2, Math.floor(e)), k = e - i;
    var nx = cr(P[i].x, P[i + 1].x, P[i + 2].x, P[i + 3].x, k);
    var ny = cr(P[i].y, P[i + 1].y, P[i + 2].y, P[i + 3].y, k);
    var lx = a.flip ? a.R : a.L, rx = a.flip ? a.L : a.R;
    nx = clamp(nx, lx, VW - rx);
    ny = Math.max(ny, HEAD + a.up);
    var vx = dt > 0 ? (nx - a.x) / dt : 0, vy = dt > 0 ? (ny - a.y) / dt : 0;
    a.x = nx; a.y = ny;
    if (vx < -6) a.flip = true; else if (vx > 6) a.flip = false;
    a.angle = clamp(vy / 240, -0.3, 0.42) * (a.flip ? -1 : 1);
    if ((vy < -10 && a.flapTimer <= 0.04) || a.flapTimer < -0.2) a.flap();
    if (!f.poked && f.t > 1.4) {
      f.poked = true;
      var tg = f.target;
      if (tg.mode === 'stomp') hop(tg, 9); else tg.flap();
      say(tg, '!');
    }
    if (u >= 1) { a.flight = null; a.flip = false; a.angle = 0; }
  }

  /* ------------------------------------------------------ the cast */

  /* THE UNLOCKED DOODADS THAT GET A SEAT THIS VISIT. Under capacity,
     everybody. Over it, the visit'th page: M[(visit * Q + i) % n], so
     every one of them has been in the stands within ceil(n / Q) visits.
     One of this file's two passes over the roster; the other is
     refresh(). */
  function castPage() {
    var best = Doodads.bestReached(), members = [], i, d;
    for (i = 0; i < Doodads.list.length; i++) {
      d = Doodads.list[i];
      ROSTER_IX[d.id] = i;
      if (d.title && Doodads.isUnlocked(d, best)) members.push(d);
    }
    var cap = Math.min(seatCount(), MAX_STAGE);
    if (members.length <= cap) return members;
    var out = [];
    for (i = 0; i < cap; i++) out.push(members[(visit * cap + i) % members.length]);
    return out;
  }

  function byRoster(p, q) { return (ROSTER_IX[p.id] || 0) - (ROSTER_IX[q.id] || 0); }

  /* WHO SITS IN WHICH TIER. As even as the count allows, ties going to
     the back so the stands fill from the top. Walkers want the front
     tier, where they are frontmost and can stamp; flyers want the middle,
     which leaves them air on both sides for a flyover; everybody else,
     and any walker or flyer their tier had no room for, fills from the
     top down. Seats are role-agnostic, so twenty perchers or six walkers
     fit exactly as well as today's twelve and four. */
  function seatAll(list) {
    var N = tiers.length, i;
    if (!N) return;
    var cap = [], target = [], rows = [], pool = [];
    var m = list.length, base = Math.floor(m / N), extra = m % N;
    for (i = 0; i < N; i++) {
      cap.push(tiers[i].seats);
      target.push(Math.min(cap[i], base + ((N - 1 - i) < extra ? 1 : 0)));
      rows.push([]);
    }
    var flyRow = Math.min(1, N - 1);
    for (i = 0; i < list.length; i++) {
      var d = list[i];
      if (d.title.role === 'walk' && rows[0].length < target[0]) rows[0].push(d);
      else if (d.title.role === 'patrol' && rows[flyRow].length < target[flyRow]) rows[flyRow].push(d);
      else pool.push(d);
    }
    for (i = N - 1; i >= 0; i--) while (rows[i].length < target[i] && pool.length) rows[i].push(pool.shift());
    for (i = N - 1; i >= 0; i--) while (rows[i].length < cap[i] && pool.length) rows[i].push(pool.shift());
    for (i = 0; i < N; i++) {
      rows[i].sort(byRoster);
      seatRow(tiers[i], rows[i]);
    }
  }

  /* A TIER'S OCCUPANTS ACROSS ITS STATIONS, left to right in roster
     order. With no more of them than stations, one each, spread:
     station floor((k + 0.5) * S / m). With more, every station gets one
     and the extras double up at stations spread the same way. */
  function seatRow(tier, ds) {
    var S = tier.stations.length, m = ds.length, count = [], i, k;
    for (i = 0; i < S; i++) { count.push(0); tier.stations[i].who.length = 0; }
    if (m <= S) {
      for (k = 0; k < m; k++) count[Math.floor((k + 0.5) * S / m)]++;
    } else {
      var pairs = [];
      for (i = 0; i < S; i++) { count[i] = 1; if (tier.stations[i].cap > 1) pairs.push(i); }
      var e = Math.min(m - S, pairs.length);
      for (k = 0; k < e; k++) count[pairs[Math.floor((k + 0.5) * pairs.length / e)]]++;
    }
    var n = 0;
    for (i = 0; i < S; i++) {
      var st = tier.stations[i];
      for (k = 0; k < count[i] && n < m; k++) {
        var a = new Actor(ds[n++]);
        a.st = st;
        st.who.push(a);
        stage.push(a);
      }
      placeStation(st, true);
    }
  }

  /* WHERE THE ONE OR TWO DOODADS IN A STATION SIT, worked against the
     real sprite reaches.

     Two nominal seats at 26 and 70 of a 96 station, 44 apart. A pair sits
     on them when the left one's right reach plus the right one's left
     reach is 42 or less, which leaves 2px of air. Otherwise the pair is
     centred on the station with a gap g = clamp(94 - both widths, 2, 10)
     between them. The worst pair in today's roster is Hot Wing (24.4 left
     of his pivot, 20.5 right at 0.85) beside Saddam (20.2 / 22.9): 88
     across, so g is 6, Hot Wing sits at 24.5 and Saddam at 71.2. In the
     first station that leaves Hot Wing 0.1px inside the left edge of the
     screen; in the last, Saddam's right reach ends at 478.1. Between
     stations the worst case is a pair's right-hand doodad ending at 94.1
     against the next station's left-hand one starting at 95.1 - Alpha's
     25.4 left reach on a 24.5 seat - so a pixel of air. Two future
     doodads both 50 wide would overlap their neighbours by up to 2px,
     which is a crowd, not a fault.

     A lone sitter takes the side LONE says, or the left seat, nudged in
     until its whole sprite is inside the station. */
  function placeStation(st, snap) {
    var w = st.w, who = st.who, A = Math.round(w * 0.27), B = w - A, a, b;
    if (who.length === 1) {
      a = who[0];
      a.seatX = clamp(LONE[st.paint] === 'B' ? B : A, a.L + 1, w - a.R - 1);
    } else if (who.length === 2) {
      a = who[0]; b = who[1];
      if (a.R + b.L <= B - A - 2) { a.seatX = A; b.seatX = B; }
      else {
        var g = clamp(w - 2 - (a.L + a.R) - (b.L + b.R), 2, 10);
        a.seatX = w / 2 - g / 2 - a.R;
        b.seatX = w / 2 + g / 2 + b.L;
      }
    }
    for (var i = 0; i < who.length; i++) {
      a = who[i];
      a.mode = a.role === 'patrol' ? 'hover' : (a.role === 'walk' && st.tier.index === 0 ? 'stomp' : 'sit');
      if (snap) { a.x = st.x + a.seatX; a.y = seatY(a); }
    }
  }

  /* A STOMPER'S SWAY is half the air either side of it, up to 1.5px, so
     its little side-to-side never touches a neighbour. Worked once, after
     seating, over the stage. */
  function computeSway() {
    for (var i = 0; i < stage.length; i++) {
      var a = stage[i];
      if (a.mode !== 'stomp') continue;
      var hx = a.st.x + a.seatX, air = Math.min(hx - a.L, VW - hx - a.R);
      for (var j = 0; j < stage.length; j++) {
        var o = stage[j];
        if (o === a || o.st.tier !== a.st.tier) continue;
        var ox = o.st.x + o.seatX;
        if (ox < hx) air = Math.min(air, (hx - a.L) - (ox + o.R));
        else air = Math.min(air, (ox - o.L) - (hx + a.R));
      }
      a.sway = clamp(air / 2 - 0.5, 0, 1.5);
    }
  }

  /* back to front, and left to right inside a tier; flights are drawn
     after everybody, in drawChars */
  function sortStage() {
    stage.sort(function (p, q) {
      return (q.st.tier.index - p.st.tier.index) || ((p.st.x + p.seatX) - (q.st.x + q.seatX));
    });
  }

  function onStage(id) {
    for (var i = 0; i < stage.length; i++) if (stage[i].id === id) return true;
    return false;
  }

  /* A SEAT FOR A LATE ARRIVAL, in its role's tier order: an empty station
     anywhere first, so the newcomer is not squeezed in beside somebody
     while there is a bench to itself, then a station with one sitter. */
  function freeStation(d) {
    var N = tiers.length, order = [], i, j, pass;
    if (!N) return null;
    if (d.title.role === 'walk') for (i = 0; i < N; i++) order.push(i);
    else if (d.title.role === 'patrol') {
      order.push(Math.min(1, N - 1));
      for (i = 0; i < N; i++) if (order.indexOf(i) < 0) order.push(i);
    } else for (i = N - 1; i >= 0; i--) order.push(i);
    for (pass = 0; pass < 2; pass++) {
      for (i = 0; i < order.length; i++) {
        var tr = tiers[order[i]];
        for (j = 0; j < tr.stations.length; j++) {
          var st = tr.stations[j];
          if (pass === 0 ? st.who.length === 0 : st.who.length < st.cap) return st;
        }
      }
    }
    return null;
  }

  function nearestTo(st, x) {
    var best = null, bd = 1e9;
    for (var i = 0; i < st.who.length; i++) {
      var d = Math.abs(st.who[i].x - x);
      if (d < bd) { bd = d; best = st.who[i]; }
    }
    return best;
  }

  /* ------------------------------------------------- talk and scenery */

  /* ONE BUBBLE PER SPEAKER, FIVE ON SCREEN, ONE CHIRP EVERY 0.45s - the
     porch's three limits, which are what keep thirty doodads from being
     a racket. A speaker is anything with x, y and r: a doodad, or a
     station's anchor (the Cupman). */
  function say(actor, symbol) {
    if (!actor) return;
    for (var i = bubbles.length - 1; i >= 0; i--) if (bubbles[i].actor === actor) bubbles.splice(i, 1);
    bubbles.push({ actor: actor, symbol: symbol, life: 1.2 });
    if (bubbles.length > 5) bubbles.shift();
    if (chirpCooldown <= 0) { Audio3.play('chirp'); chirpCooldown = 0.45; }
  }

  /* The porch's hysteresis, and one rule of this screen's own: a bubble
     that would sit on the scoreboard, or on the HI panel or the sound
     toggle past its ends, goes beside the shoulder instead. */
  function placeBubble(b, dt) {
    var a = b.actor;
    var wx = a.x + a.r * 0.6, wy = a.y - a.r - 10;
    var underBoard = wx + 13 > SB_X && wx < SB_X + SB_W + 2;
    if (wy < (underBoard ? HEAD + 2 : 36)) { wy = a.y - 4; wx = a.x + a.r * 1.1; }
    if (b.tx === undefined) { b.tx = wx; b.ty = wy; b.sx = wx; b.sy = wy; }
    if (Math.abs(wx - b.tx) > 2) b.tx = wx;
    if (Math.abs(wy - b.ty) > 2) b.ty = wy;
    b.sx = damp(b.sx, b.tx, 0.0005, dt);
    b.sy = damp(b.sy, b.ty, 0.0005, dt);
  }

  function drawBubble(ctx, x, y, symbol) {
    var w = 11, h = 11;
    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x - 1, y - 1, w + 2, h + 2);
    ctx.fillStyle = UI.C.ink;
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x, y, 1, 1); ctx.fillRect(x + w - 1, y, 1, 1);
    ctx.fillRect(x, y + h - 1, 1, 1); ctx.fillRect(x + w - 1, y + h - 1, 1, 1);
    ctx.fillStyle = UI.C.ink;
    ctx.fillRect(x + 2, y + h, 3, 1);
    ctx.fillRect(x + 2, y + h + 1, 2, 1);
    ctx.fillStyle = UI.C.shadow;
    ctx.fillRect(x + 1, y + h, 1, 2);
    ctx.fillRect(x + 4, y + h + 1, 2, 1);
    Font.draw(ctx, symbol, x + 3, y + 2, { scale: 1, colour: UI.C.shadow });
  }

  /* a setTimeout that cannot fire after the scene is gone */
  function later(delay, fn) { timers.push({ t: delay, fn: fn }); }

  function updateTimers(dt) {
    for (var i = timers.length - 1; i >= 0; i--) {
      timers[i].t -= dt;
      if (timers[i].t <= 0) { var fn = timers[i].fn; timers.splice(i, 1); fn(); }
    }
  }

  function puff(x, y, n) {
    for (var i = 0; i < (n || 5); i++) {
      puffs.push({ x: x + rand(-5, 5), y: y + rand(-2, 1), vx: rand(-18, 18), vy: rand(-26, -6),
                   life: rand(0.3, 0.6), col: chance(0.5) ? '#a89572' : '#9d6c3d' });
    }
  }

  /* a station's particle: mist, steam, sawdust, tomato. g is gravity
     (negative floats it up), a its starting opacity. */
  function spark(x, y, vx, vy, life, col, size, g, a) {
    if (sparks.length > 80) return;
    sparks.push({ x: x, y: y, vx: vx, vy: vy, life: life, max: life, col: col, s: size || 1, g: g || 0, a: a === undefined ? 1 : a });
  }

  /* FIREFLIES over the stands, on the foreground so they glow in front of
     everything, and they are the first thing lit in the dark opening */
  function seedFlies() {
    flies.length = 0;
    for (var i = 0; i < 8; i++) {
      flies.push({ x: rand(0, VW), y: rand(56, 212), vx: rand(-6, 6), vy: rand(-4, 4), ph: rand(0, TAU) });
    }
  }

  function updateScenery(dt) {
    var i;
    for (i = 0; i < flies.length; i++) {
      var f = flies[i];
      f.vx = clamp(f.vx + rand(-8, 8) * dt, -6, 6);
      f.vy = clamp(f.vy + rand(-8, 8) * dt, -5, 5);
      f.x += f.vx * dt; f.y += f.vy * dt;
      if (f.x < 0) f.x += VW; else if (f.x >= VW) f.x -= VW;
      if (f.y < 56) { f.y = 56; f.vy = Math.abs(f.vy); }
      if (f.y > 212) { f.y = 212; f.vy = -Math.abs(f.vy); }
    }
    for (i = puffs.length - 1; i >= 0; i--) {
      var pf = puffs[i];
      pf.life -= dt; pf.x += pf.vx * dt; pf.y += pf.vy * dt; pf.vy += 40 * dt;
      if (pf.life <= 0) puffs.splice(i, 1);
    }
    for (i = sparks.length - 1; i >= 0; i--) {
      var s = sparks[i];
      s.life -= dt; s.x += s.vx * dt; s.y += s.vy * dt; s.vy += s.g * dt;
      if (s.life <= 0) sparks.splice(i, 1);
    }
    for (i = bubbles.length - 1; i >= 0; i--) {
      var bb = bubbles[i];
      bb.life -= dt;
      if (bb.life <= 0) { bubbles.splice(i, 1); continue; }
      placeBubble(bb, dt);
    }
  }

  function updateStations(dt) {
    for (var i = 0; i < tiers.length; i++) {
      for (var j = 0; j < tiers[i].stations.length; j++) liveCall(tiers[i].stations[j], 'idle', dt);
    }
  }

  /* ------------------------------------------------------ director */

  /* A BEAT EVERY FOUR TO SEVEN SECONDS. A beat that cannot run - no
     flyer in, nobody idle to chat - falls through to a round of chirping
     rather than to silence. The STATION beat is the biggest share on
     purpose: it is the furniture's turn, and the furniture is the levels. */
  function director(dt) {
    directorTimer -= dt;
    if (directorTimer > 0) return;
    directorTimer = rand(4, 7);
    var roll = Math.random(), done = false;
    if (roll < 0.12) done = t - lastWave > 20 && stage.length > 2 && (wave(), true);
    else if (roll < 0.30) done = flyoverBeat();
    else if (roll < 0.44) done = chatBeat();
    else if (roll < 0.54) done = attemptBeat();
    else if (roll < 0.86) done = stationBeat();
    if (!done) chant();
  }

  function idle(a) { return a && !a.flight && a.hy === 0 && a.turnT < 0 && a.holdT <= 0; }

  function flyoverBeat() {
    var flyers = [], others = [], i;
    for (i = 0; i < stage.length; i++) {
      if (stage[i].mode === 'hover' && !stage[i].flight) flyers.push(stage[i]);
      else if (stage[i].mode !== 'hover') others.push(stage[i]);
    }
    if (!flyers.length || !others.length) return false;
    var a = choose(flyers), tg = choose(others);
    flyover(a, tg);
    say(a, '♪');
    return true;
  }

  /* two idle sitters on one station: the right-hand one turns to face
     the left-hand one, who already faces it, and they have a word */
  function chatBeat() {
    var pairs = [], i, j;
    for (i = 0; i < tiers.length; i++) {
      for (j = 0; j < tiers[i].stations.length; j++) {
        var w = tiers[i].stations[j].who;
        if (w.length === 2 && idle(w[0]) && idle(w[1]) && w[0].mode !== 'hover' && w[1].mode !== 'hover') pairs.push(w);
      }
    }
    if (!pairs.length) return false;
    var p = choose(pairs), a = p[0], b = p[1];
    if (a.flip) turn(a, false, 0);
    turn(b, true, 2.6);
    say(a, '·');
    later(0.5, function () { say(b, '♪'); });
    later(1.1, function () { say(a, '!'); });
    later(1.6, function () { say(b, '·'); });
    return true;
  }

  function attemptBeat() {
    var list = [];
    for (var i = 0; i < stage.length; i++) if (stage[i].mode === 'stomp' && idle(stage[i])) list.push(stage[i]);
    if (!list.length) return false;
    attempt(choose(list), '★');
    return true;
  }

  function stationBeat() {
    var list = [], i, j;
    for (i = 0; i < tiers.length; i++) {
      for (j = 0; j < tiers[i].stations.length; j++) {
        var st = tiers[i].stations[j];
        if (LIVE[st.paint] && LIVE[st.paint].event && !FAILED[st.id]) list.push(st);
      }
    }
    for (i = 0; i < 3 && list.length; i++) {
      var k = (Math.random() * list.length) | 0;
      if (liveCall(list[k], 'event') !== false) return true;
      list.splice(k, 1);
    }
    return false;
  }

  function chant() {
    var pool = stage.slice();
    for (var i = 0; i < 3 && pool.length; i++) {
      (function (a, delay, sym) {
        later(delay, function () { say(a, sym); });
      })(pool.splice((Math.random() * pool.length) | 0, 1)[0], i * 0.44, i === 2 ? '·' : '♪');
    }
  }

  /* THE WAVE, left to right across all three tiers at once: everybody in
     a column goes up together, the way a stadium does it. No bubbles -
     thirty against a cap of five would read as twenty-five with nothing
     to say - and a chirp from every third, past the cooldown. */
  function wave() {
    lastWave = t;
    chaseFast = 2;
    var row = stage.slice();
    row.sort(function (p, q) { return p.x - q.x; });
    for (var i = 0; i < row.length; i++) {
      (function (a, delay, chirp) {
        later(delay, function () {
          if (a.flight) return;
          hop(a, a.mode === 'hover' ? 7 : 12);
          if (chirp) Audio3.play('chirp');
        });
      })(row[i], i * 0.045, i % 3 === 0);
    }
  }

  /* THE LIGHTS COME UP: three banks struck left to right, each going on
     with one flicker, and the wave once all three are lit. It waits for
     the wipe, like the porch's wave, or it would happen behind it. */
  function lightsUp() {
    for (var i = 0; i < 3; i++) {
      (function (k) {
        later(0.3 + k * 0.32, function () {
          banks[k] = 0;
          Audio3.play('thud');
          later(0.04, function () { banks[k] = 6; });
          later(0.08, function () { banks[k] = 0; });
        });
      })(i);
    }
    later(1.5, wave);
  }

  /* ----------------------------------------------------- lifecycle */

  function enter(params) {
    t = 0;
    bubbles.length = 0; puffs.length = 0; sparks.length = 0; timers.length = 0;
    chirpCooldown = 0; chaseFast = 0; lastWave = -99;
    directorTimer = 4;
    menuIndex = (params && params.menu) || 0;

    /* the same silent banking the porch does on the way in: an
       achievement earned somewhere with no banner to show it in */
    Achievements.check();

    if (!T.sky) T.sky = bakeSky();
    if (!T.ground) T.ground = bakeGround();

    /* Tiers are resolved on the way in and nowhere else, so a room that
       opens while the stands are up arrives on the next visit. */
    layoutTiers();
    seedFlies();

    stage.length = 0;
    seatAll(castPage());
    computeSway();
    sortStage();
    T.ticker = bakeTicker(stage.length);

    visit++;
    litPending = !litOnce;
    banks[0] = banks[1] = banks[2] = litPending ? 14 : 0;
  }

  /* A doodad arriving while the stands are up - the passkey typed right
     here - takes the first free seat its role prefers, with a puff and a
     star. Anybody with nowhere to sit waits for the next enter(). */
  function refresh() {
    var best = Doodads.bestReached(), added = false;
    for (var i = 0; i < Doodads.list.length; i++) {
      var d = Doodads.list[i];
      ROSTER_IX[d.id] = i;
      if (!d.title || onStage(d.id) || !Doodads.isUnlocked(d, best)) continue;
      if (stage.length >= MAX_STAGE) break;
      var st = freeStation(d);
      if (!st) continue;
      var a = new Actor(d);
      a.st = st;
      st.who.push(a);
      st.who.sort(byRoster);
      stage.push(a);
      placeStation(st, false);
      a.x = st.x + a.seatX; a.y = seatY(a);
      puff(a.x, st.tread, 6);
      say(a, '★');
      added = true;
    }
    if (added) { computeSway(); sortStage(); T.ticker = bakeTicker(stage.length); }
  }

  function update(dt) {
    t += dt;
    if (chirpCooldown > 0) chirpCooldown -= dt;
    if (chaseFast > 0) chaseFast -= dt;
    updateTimers(dt);
    updateScenery(dt);
    updateStations(dt);
    for (var i = 0; i < stage.length; i++) {
      var a = stage[i];
      a.flapTimer -= dt;
      if (a.shiverT > 0) a.shiverT -= dt;
      if (a.duckT > 0) a.duckT -= dt;
      stepTurn(a, dt);
      BEHAVIOUR[a.mode](a, dt);
    }

    /* the first frame the curtain is off */
    if (litPending && !Game.locked()) { litPending = false; litOnce = true; lightsUp(); }
    else if (!litPending && banks[0] + banks[1] + banks[2] === 0) director(dt);

    if (Game.locked()) return;
    var tg = Input.tapped();
    if (tg && tg.id === 'menu') menuIndex = tg.i;
    if (tg && tg.id === 'sound') {
      var muted = Audio3.toggleMute();
      Game.toast(muted ? 'SOUND OFF' : 'SOUND ON');
      if (!muted) Audio3.play('move');
    }
    /* LEFT AND RIGHT ONLY, as on the porch: Space is 'up' */
    if (Input.nav('right')) { menuIndex = (menuIndex + 1) % MENU.length; Audio3.play('move'); }
    if (Input.nav('left')) { menuIndex = (menuIndex + MENU.length - 1) % MENU.length; Audio3.play('move'); }
    if (Input.hit('confirm')) {
      Audio3.play('select');
      if (MENU[menuIndex] === 'PLAY') Game.go(LevelSelectScene, {});
      else if (MENU[menuIndex] === 'HIGH SCORES') Game.go(ScoresScene, {});
      else Game.go(AchievementsScene, {});
    }
  }

  /* -------------------------------------------------------- drawing */

  function drawBg(ctx) {
    var i, j, k;
    ctx.drawImage(T.sky.canvas, 0, 0);
    /* two of the stars twinkle */
    var tw = 0.25 + 0.35 * (0.5 + 0.5 * Math.sin(t * 2.3));
    var ga = ctx.globalAlpha;
    ctx.globalAlpha = ga * tw;
    px(ctx, UI.C.ink, 58, 14, 1, 1);
    ctx.globalAlpha = ga * (0.85 - tw);
    px(ctx, UI.C.ink, 412, 44, 1, 1);
    ctx.globalAlpha = ga;

    ctx.drawImage(T.ground.canvas, 0, GROUND - 2);

    /* THE STANDS, back to front: each station's painting, its live layer
       over that, then the contact shadows of whoever sits on that tier -
       before the tier in front is drawn over all of it */
    for (i = tiers.length - 1; i >= 0; i--) {
      var tr = tiers[i];
      for (j = 0; j < tr.stations.length; j++) {
        var st = tr.stations[j];
        ctx.drawImage(st.tile.canvas, st.x, st.tread - PROP_UP);
        liveCall(st, 'draw', ctx, st.x, st.tread);
      }
      for (k = 0; k < stage.length; k++) {
        var a = stage[k];
        if (a.st.tier !== tr || a.flight) continue;
        var lift = clamp(-a.hy / 30, 0, 1);
        var w = Math.round(a.r * (a.mode === 'hover' ? 1.1 : 1.5) * (1 - lift * 0.4));
        Tint.rect(ctx, Math.round(a.x - w / 2), tr.tread, w, 2, '#1a120c', a.mode === 'hover' ? 6 : Math.round(11 - lift * 6));
      }
    }

    for (i = 0; i < sparks.length; i++) {
      var s = sparks[i];
      ctx.globalAlpha = ga * s.a * clamp(s.life / s.max * 1.6, 0, 1);
      px(ctx, s.col, Math.round(s.x), Math.round(s.y), s.s, s.s);
    }
    ctx.globalAlpha = ga;
    for (i = 0; i < puffs.length; i++) {
      var pf = puffs[i];
      px(ctx, pf.col, Math.round(pf.x), Math.round(pf.y), 1, 1);
    }
  }

  function drawChars(ctx) {
    var i;
    for (i = 0; i < stage.length; i++) if (!stage[i].flight) drawActor(ctx, stage[i]);
    for (i = 0; i < stage.length; i++) if (stage[i].flight) drawActor(ctx, stage[i]);
  }

  function drawActor(ctx, a) {
    var sy = a.duckT > 0 ? 0.8 : 1;
    var shake = a.shiverT > 0 ? Math.sin(t * 70) * 0.12 : 0;
    Doodads.draw(ctx, a.id, a.x, a.y + a.foot * (1 - sy), a.r, a.angle + shake, a.flying(),
                 { flip: a.flip, squashX: a.sqx, squashY: sy });
  }

  function drawFg(ctx) {
    var i, ga = ctx.globalAlpha;
    hot.length = 0;

    /* the stands before the floodlights strike */
    for (i = 0; i < 3; i++) if (banks[i] > 0) Tint.rect(ctx, 160 * i, 0, 160, GROUND + 2, '#06060a', banks[i]);

    for (i = 0; i < flies.length; i++) {
      var f = flies[i];
      ctx.globalAlpha = ga * (0.2 + 0.5 * (0.5 + 0.5 * Math.sin(t * 1.9 + f.ph)));
      px(ctx, UI.C.gold, Math.round(f.x), Math.round(f.y), 1, 1);
    }
    ctx.globalAlpha = ga;

    drawScoreboard(ctx);

    /* THE MENU, the porch's three boards along the lawn */
    for (var m = 0; m < MENU.length; m++) {
      var b = BOARDS[m];
      UI.button(ctx, hot, b.x, MENU_Y, b.w, MENU_BH,
                { id: 'menu', i: m, a: 'confirm', scale: b.scale,
                  label: MENU[m], lit: m === menuIndex });
    }
    if (!UI.touch()) {
      UI.marker(ctx, 3, 236, t);
      UI.chevron(ctx, 477, 236, -1, 4, UI.C.gold);
    }

    /* how many badges are waiting, on the ACHIEVEMENTS board's corner */
    var n = Achievements.freshCount();
    if (n > 0) {
      var ab = BOARDS[ACHV_ROW];
      var tag = n + ' NEW';
      var tw = Font.measure(tag, 1) + 8;
      var tx = ab.x + ab.w + 4 - tw;
      var ty = MENU_Y - 4;
      ctx.fillStyle = UI.C.shadow;   ctx.fillRect(tx + 1, ty + 1, tw, 9);
      ctx.fillStyle = UI.C.goldDark; ctx.fillRect(tx, ty, tw, 9);
      ctx.fillStyle = UI.C.gold;
      ctx.fillRect(tx, ty, tw, 1); ctx.fillRect(tx, ty + 8, tw, 1);
      ctx.fillRect(tx, ty, 1, 9); ctx.fillRect(tx + tw - 1, ty, 1, 9);
      UI.text(ctx, tag, tx + tw / 2, ty + 1, { align: 'center', colour: UI.C.ink, shadow: null });
    }

    if (Input.pointing()) {
      UI.button(ctx, hot, 6, 5, 68, 26,
                { id: 'sound', scale: 1,
                  label: Audio3.isMuted() ? 'SOUND OFF' : 'SOUND ON' });
    }

    var best = Scores.table(Game.room(), Game.level())[0];
    if (best) {
      var hi = 'HI  ' + best.name + '  ' + best.score;
      var hw = Font.measure(hi, 1) + 10;
      UI.panel(ctx, VW - hw - 6, 5, hw, 13, { fill: UI.C.darker, edge: UI.C.inkFaint });
      UI.text(ctx, hi, VW - 11, 8, { align: 'right', colour: UI.C.gold });
    }

    for (i = 0; i < bubbles.length; i++) {
      var bb = bubbles[i];
      if (bb.sx === undefined) continue;
      var sx = clamp(Math.round(bb.sx), 1, VW - 13);
      var sy = Math.round(bb.sy - (1.2 - bb.life) * 6);
      ctx.globalAlpha = ga * clamp(bb.life / 0.3, 0, 1);
      drawBubble(ctx, sx, sy, bb.symbol);
    }
    ctx.globalAlpha = ga;

    UI.footer(ctx, '◀ ▶ CHOOSE   ENTER SELECT   M SOUND   F FULLSCREEN',
                   'CLICK A BOARD   F FULLSCREEN');
  }

  /* THE SCOREBOARD, on its two posts over the stands: a frame of bulbs
     chasing round it, LAND OF DOODADS in the porch's three-pass gold, and
     the ticker running along the foot. The bulbs race while the crowd is
     doing the wave. */
  function drawScoreboard(ctx) {
    var x = SB_X, y = SB_Y, w = SB_W, h = SB_H, i, n = 0;
    ctx.fillStyle = UI.C.shadow; ctx.fillRect(x + 2, y + 3, w, h);
    ctx.fillStyle = '#2a2622'; ctx.fillRect(x, y, w, h);
    ctx.fillStyle = '#3d3832'; ctx.fillRect(x, y, w, 1);
    ctx.fillStyle = '#1a1714'; ctx.fillRect(x, y + h - 1, w, 1);
    ctx.fillStyle = UI.C.darker; ctx.fillRect(x + 4, y + 4, w - 8, h - 7);

    var step = Math.floor(t / (chaseFast > 0 ? 0.08 : 0.25));
    for (i = 0; x + 6 + i * 8 < x + w - 4; i++, n++) bulb(ctx, x + 6 + i * 8, y + 1, n, step);
    for (i = 0; y + 9 + i * 8 < y + h - 4; i++, n++) {
      bulb(ctx, x + 1, y + 9 + i * 8, n, step);
      bulb(ctx, x + w - 3, y + 9 + i * 8, n + 1, step);
    }

    logoLine(ctx, 'LAND OF DOODADS', VW / 2, y + 7, 3, t * 1.6);

    ctx.fillStyle = UI.C.inkFaint; ctx.fillRect(x + 6, y + 31, w - 12, 1);
    if (T.ticker) {
      var tk = T.ticker.canvas, tw = tk.width;
      var off = Math.floor((t * 24) % tw);
      ctx.save();
      ctx.beginPath(); ctx.rect(x + 5, y + 33, w - 10, 7); ctx.clip();
      for (var tx = x + 5 - off; tx < x + w - 5; tx += tw) ctx.drawImage(tk, tx, y + 33);
      ctx.restore();
    }
  }

  function bulb(ctx, x, y, i, step) {
    ctx.fillStyle = (i + step) % 3 === 0 ? UI.C.gold : UI.C.goldDark;
    ctx.fillRect(x, y, 2, 2);
  }

  /* The coop title's three-pass logo, copied as the porch copied it.
     Pass one is a halo of shadow, pass two the gold, pass three the
     bottom three rows of every glyph in goldDark. */
  function logoLine(ctx, str, x, y, s, wave) {
    Font.draw(ctx, str, x, y, { scale: s, align: 'center', colour: UI.C.shadow,
                                wave: wave, waveAmp: 0.6, outline: UI.C.shadow, outlineWidth: 1 });
    Font.draw(ctx, str, x, y, { scale: s, align: 'center', colour: UI.C.gold, wave: wave, waveAmp: 0.6 });
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, y + Math.round(s * 4.2), VW, s * 3);
    ctx.clip();
    Font.draw(ctx, str, x, y, { scale: s, align: 'center', colour: UI.C.goldDark, wave: wave, waveAmp: 0.6 });
    ctx.restore();
  }

  return { enter: enter, refresh: refresh, update: update,
           drawBg: drawBg, drawChars: drawChars, drawFg: drawFg,
           targets: function () { return hot; },
           /* for a headless check: live references, read them only. And a
              station's trick on demand, by level id. */
           inspect: function () { return { tiers: tiers, stage: stage, failed: FAILED, offAir: offAir, t: t }; },
           fire: function (id) {
             for (var i = 0; i < tiers.length; i++) {
               for (var j = 0; j < tiers[i].stations.length; j++) {
                 if (tiers[i].stations[j].id === id) return liveCall(tiers[i].stations[j], 'event');
               }
             }
             return null;
           },
           wave: wave };
})();
