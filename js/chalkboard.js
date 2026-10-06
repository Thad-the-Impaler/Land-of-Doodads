/* ------------------------------------------------------------------
   Land of Doodads - LIVING ROOM / THE CHALKBOARD

   THE PLACE THE FUNNEL GOES. It is not a level. It has no entry in
   js/levels.js, no cover, no high-score key and no row on the select
   screen, and PlayScene never learns the word "Chalkboard": it reaches
   this module through `ob.warp` on the funnel the Whiteboard drops in
   its tray, holds it in `warp.art` for ten planks, and puts it back.
   `Levels.buildArt()` walks `lv.art` and nothing else, so nothing would
   ever bake these tiles - which is why the last line of
   `Whiteboard.build()` is `Chalkboard.build();` and why build() below
   is self-guarded.

   It is a SIBLING ART MODULE to js/whiteboard.js, implementing the same
   level-art contract against the same room, and it is loaded AFTER that
   file because it aliases four of its functions at the top level of this
   IIFE. The four plotters are a contract that cannot be renamed on one
   side of it.

   THE RULE OF THIS LEVEL, and it is the Whiteboard's rule turned inside
   out, which is the whole joke of falling through the tray:

     A SLAB OF CHALK KILLS. A LINE OF CHALK IS ALIVE.

   On the white board the ink was black and the gifts were coloured. Here
   everything is the same one chalk, and what separates the plank that
   ends the run from the shark that ends the chase is WIDTH and DENSITY:
   a plank is 34px of scrubbed-in chalk measuring about 205 against a
   board at 65, and the shark is a 1px and 2px outline of the same stick.
   There is no second chalk colour and no yellow: this level has exactly
   one separation to carry - a pale thin drawing from a pale wide slab -
   and a second pigment is a population it does not need.

   WHY IT READS AS SLATE AND NOT AS A DARK WHITEBOARD, four things, all
   of them visible at 1x:

     1. THE ERASER HAZE. bakeBoard lays three or four horizontal swipe
        bands of `ghost` with their alpha ramped up and back down row by
        row, so the band has no edge of its own. A wiped whiteboard is
        uniform; a chalkboard carries the cloud where the felt went, and
        that cloud is this level's depth cue. There is no glare sheet -
        a 480x218 baked pool for a static highlight nobody will look at
        in fifteen seconds is a third of the bake for nothing.
     2. THE STROKE IS POROUS. Every chalk pixel this module plots is
        `chalk` with probability 0.72, `chalkSoft` with 0.16, and dropped
        with 0.12, off a seeded mulberry32 - so no line in here is solid
        anywhere and no two boots disagree about where the holes are.
     3. THE FRAME IS WOOD, with a dust-piled ledge, where the Whiteboard's
        is aluminium with a channel.
     4. WARM WHITE ON COOL DARK GREEN, never white on black.

   GEOMETRY IS CONTINUOUS TO THE PIXEL with the bay upstairs, because the
   swap happens mid-flight and a doodad must not find the floor somewhere
   else. CEIL, FLOOR and CEIL_KILLS are aliases of the room's and never
   literals; bakeTop is 240x24 on the room's own tile beat with the kill
   line on row 23 and nothing solid under it; bakeFloor paints the room's
   oak with SEED 11, which is the Whiteboard's seed and the Desk's and the
   Mantle's, so the floor the player is flying over does not change at
   either seam. The plank makers on both sides return the identical shape,
   which is what lets the stay end instantly: see makePillar.

   WHAT THE ENGINE CAN REACH WHILE `warp` IS SET, and why every other key
   in the contract is absent rather than stubbed. PlayScene reads these
   off `art` during a stay: FX, WARN, drawBackdrop, drawCeiling,
   drawFloor, drawObstacle, makePillar, makeMeet, stepBoon, rectsFor -
   and CEIL/FLOOR/CEIL_KILLS, which it binds in enter() off the LEVEL's
   art and holds across the swap, but which are exported anyway so this
   module is a whole art module and not a fragment. The rest cannot be
   reached from in here at all:

     makeSpikes / makeLitter / makeBoon   sit inside `if (!held && !warp)`
                                          in spawnAhead. No hazard, no
                                          litter and no gift follows the
                                          player down the hole.
     makeDrop / DROP_GRAV / SPLAT_TIME /  all reached only through an
     drawDrop / drawDropSpot /            obstacle of type 'drop', and
     drawDropSplat / stepDrop             spawnDrops returns on its first
                                          line while `warp` is set, so no
                                          'drop' can exist in a stay.
     drawPreview / PREVIEW /              read off `lv.art` by the select
     drawMenuBackdrop / END_MIN /         screen and the title scene. This
     BOON_NAME                            module is in no level entry, so
                                          nothing ever holds it as lv.art.
     makeWarp                             the hole is the Whiteboard's. You
                                          do not fall out of the bottom of
                                          this room into a third one.

   Sixteen keys absent rather than stubbed is sixteen places nobody can
   put code that never runs. Sixteen is the checkable number: sixteen
   names in the roll call above, sixteen exported keys in the footer, and
   thirty-two keys in the whole art contract. If a key above ever does
   become reachable, the guard that made it unreachable has been taken off
   and this comment is the record of which one.

   Same discipline as the five bays: every pixel in here is generated and
   baked once, nothing rotates a canvas, and there is NO CALL TO
   Dither.rect anywhere in this file - the Bayer grid is anchored in user
   space and a dithered rect that scrolls re-phases against the pattern
   and boils.
------------------------------------------------------------------ */

var Chalkboard = (function () {
  'use strict';

  /* ---------------------------------------------------- the aliases

     THE FOUR PLOTTERS, taken off js/whiteboard.js at load. A chalkboard
     is a board somebody drew on, which is that file's entire trade, and
     re-implementing Bresenham and a midpoint circle in here would be two
     more chances to get a nearest-neighbour stroke subtly wrong. They are
     the same function objects that file uses internally.

       pline   (c, x0, y0, x1, y1, col)   1px line
       pline2  (c, x0, y0, x1, y1, col)   the same line, 2x2 stamp
       pcircle (c, cx, cy, r,  col)       1px circle
       pcircle2(c, cx, cy, r,  col)       the same circle, 2x2 stamp

     `c` is a 2D CONTEXT and not a tile, each call sets its own fillStyle,
     and the 2x2 stamp is drawn DOWN AND RIGHT of the plotted pixel - so a
     2px shape is one pixel fatter at its bottom right than its 1px twin.
     pline/pline2 round their arguments; pcircle/pcircle2 do not, so they
     are only ever passed integers in here. */
  var pline  = Whiteboard.pline,  pline2  = Whiteboard.pline2;
  var pcircle = Whiteboard.pcircle, pcircle2 = Whiteboard.pcircle2;

  /* the bay upstairs' palette, for the three colours that are not this
     level's to choose: the wall behind the board and its groove are the
     same wall and the same room, seen past a different frame */
  var W = Whiteboard.P;

  /* and the room's own: the oak, which this floor is made of */
  var R = LivingRoom.P;

  var wrap = LivingRoom.wrap;
  var hash = LivingRoom.hash;

  /* ALIASES, NEVER LITERALS. The swap happens in mid-air and PlayScene
     deliberately does not re-read these at the seam, so if this module
     ever disagreed with the Whiteboard about where the floor is, the
     disagreement would be invisible until a doodad landed on nothing. */
  var CEIL = LivingRoom.CEIL;              /* 24  */
  var FLOOR = LivingRoom.FLOOR;            /* 242 */
  var CEIL_KILLS = LivingRoom.CEIL_KILLS;

  /* ------------------------------------------------------ the palette

     Luminance (0.299R + 0.587G + 0.114B) after each, because the level's
     one rule is a VALUE rule and the numbers are the proof of it. The
     board is 65. A plank, porous, measures 0.72*232 + 0.16*191 + 0.12*65
     = 205. The shark's hard pass is 232 and its soft pass 191, and both
     of those are 1px or 2px wide where the plank is 34. */
  var P = {
    board:      '#2f4b3e',    /*  65  the slate                           */
    boardShade: '#263d32',    /*  53  the lower left, and the dark halo   */
    ghost:      '#4d6a5b',    /*  96  erased chalk that did not go        */
    seam:       '#243a30',    /*  49  the slate joint, one per tile       */

    chalk:      '#e6ebdd',    /* 231  the stroke. Warm: chalk is never
                                      pure white, and a pure one on this
                                      green reads as a cut-out           */
    chalkSoft:  '#b9c4b4',    /* 191  pressure-off pixels, dry streaks    */
    chalkDust:  '#8ea093',    /* 152  ghost doodles, the shed powder      */

    frameLit:   '#9a7a52',    /* 126  the wood rail, lit face             */
    frameMid:   '#7a5f3e',    /*  99                                      */
    frameDark:  '#4f3a24',    /*  63                                      */
    frameLine:  '#1e1611',    /*  24  bakeTop row 23: the kill line's
                                      hard edge                          */

    trayWood:   '#6b5338',    /*  86  the chalk ledge                     */
    trayDust:   '#c9cfc0',    /* 204  the dust piled on it                */
    eraserFelt: '#3a3330',    /*  52                                      */

    /* the wall behind the board, read off the bay upstairs rather than
       copied: same room, same wall, same lamps out of reach of it */
    beyond:     W.beyond,     /*  51 '#30323a' */
    beyondDeep: W.beyondDeep, /*  38 '#24262c' */
    groove:     W.groove      /*  83 '#4f545b' */
  };

  /* -------------------------------------------------------------- FX

     The neutral effect palette. PlayScene re-binds its own `FX` off this
     at the seam, so the room dust and the speed streaks turn to chalk the
     frame the board does; particles already in the air keep the colour
     they were born with and expire inside a second, which is right.

     `ground`, `splat` and the rest are read by nothing during a stay -
     there is no litter down here and nothing can break on the floor - but
     FX is a SHAPE and a module that publishes three quarters of one is a
     module that throws the first time somebody relaxes a guard upstairs.

     The seven heat-and-sour colours are COPIED BY VALUE off the
     Whiteboard's, deliberately and not re-chosen: a player who carries a
     hot run into the hole must come out of it looking exactly as hot as
     they went in, and the lime's wash is the same wash. */
  var FX = {
    motes:    '#9fb0a2',   motesHi:  '#eef2e6',
    puff:     '#c9d2c3',   puffHi:   '#eef2e6',
    ground:   R.oakGrain,  groundHi: R.oakLip,
    splat:    '#e6ebdd',   splatHi:  '#ffffff',
    hot:      Whiteboard.FX.hot,
    hotMid:   Whiteboard.FX.hotMid,
    hotHi:    Whiteboard.FX.hotHi,
    heat:     Whiteboard.FX.heat,
    heatEdge: Whiteboard.FX.heatEdge,
    glowCore: Whiteboard.FX.glowCore,
    glowEdge: Whiteboard.FX.glowEdge
  };

  /* The stay's one sentence. There is no `enter` line, because there is
     no stay without somebody to catch: enterWarp only makes the hole
     worth falling into when Doodads.chaseable says a shark is down here,
     and this IS the arrival sentence.

       14 chars at UI.heading scale 2 spacing 1 = 166px
       28 chars at UI.text                      = 167px

     `ceil` is the room's default and not this bay's own, unlike the
     Whiteboard's - see the note in the report. It is close to unreachable
     anyway: PlayScene shows it on the first flap of a run, and a doodad
     arriving here has been flying for ten planks already. */
  var WARN = {
    chase: ['▶ TEN PLANKS ▶', 'CATCH IT BEFORE THEY RUN OUT'],
    ceil:  LivingRoom.WARN_CEIL
  };

  var T = {};             /* baked tiles and sprites */

  /* The level's own clock, in PIXELS OF SCROLL, cached once a frame by
     drawBackdrop - the Deck's and the Whiteboard's cache, kept for their
     reason. NOTHING IN THIS MODULE READS IT TODAY. It is here because
     this board's only legal clock is scroll: a stay is ten planks long
     and a mark on the slate that phased off seconds could be waited out
     behind the pause scrim, where one phased off scroll cannot. If a
     future speck of dust on this board reaches for Date.now, this is the
     variable it was supposed to find. */
  var clock = 0;

  /* ------------------------------------------------------- utilities */

  var BOARD_W = 480;
  var BOARD_H = FLOOR - CEIL;      /* 218 */

  /* '#rrggbb' to [r, g, b]. The porous pass works on raw pixels and the
     palette is written in hex, which is the form every other module in
     the game reads it in; converting here means the two can never drift. */
  function rgbOf(hex) {
    return [parseInt(hex.slice(1, 3), 16),
            parseInt(hex.slice(3, 5), 16),
            parseInt(hex.slice(5, 7), 16)];
  }
  var RGB_CHALK = rgbOf(P.chalk);
  var RGB_SOFT  = rgbOf(P.chalkSoft);

  /* -1, 0 or +1 off a seeded stream. Everything in this file that wobbles
     wobbles by this, so a hand is a hand throughout. */
  function j3(r) { return Math.floor(r() * 3) - 1; }

  /* THE POROUS RULE, as a pass rather than as a plotter.

     Chalk does not lay down solid - it skips where the slate is proud and
     it goes thin where the hand lifted - and the cheapest honest way to
     get that is to draw the stroke solid into a TRANSPARENT scratch tile
     with the plotters above and then roll every pixel it put there. Doing
     it this way rather than by re-writing Bresenham means the shark, the
     doodles and the planks all shed at identical rates and none of them
     can drift from the others as the file grows.

     The tile must be transparent where it is not drawn, which is why the
     board's slate is filled AFTER this runs and never before it. */
  function porous(tile, r) {
    var w = tile.w, h = tile.h;
    var img = tile.ctx.getImageData(0, 0, w, h), d = img.data;
    var i, q, c;
    for (i = 0; i < d.length; i += 4) {
      if (d[i + 3] === 0) continue;
      q = r();
      if (q < 0.88) {
        c = q < 0.72 ? RGB_CHALK : RGB_SOFT;
        d[i] = c[0]; d[i + 1] = c[1]; d[i + 2] = c[2]; d[i + 3] = 255;
      } else {
        d[i + 3] = 0;                 /* the twelve percent that is slate */
      }
    }
    tile.ctx.putImageData(img, 0, 0);
  }

  /* The same rule's last clause on its own: drop `p` of the lit pixels and
     leave the rest exactly as they were drawn. The shark needs this one
     rather than the full pass, because its two passes have ALREADY chosen
     their own pigments - a hard one in chalk and a misregistered one in
     chalkSoft - and re-rolling them would throw away the only thing that
     makes the second pass read as a hand going over its own line.

     AND IT TAKES A FIELD, NOT A STREAM, which is the whole reason this is
     not two lines inside bakeShark. A sequential rng rolls once per LIT
     pixel in raster order, so the moment one frame lights a pixel the
     other does not - which is exactly what a tail flick is - every roll
     after it shifts by one and the entire rest of the drawing re-scatters
     its holes. Two frames swapped at 3Hz with the porosity re-scattered
     across the whole body is the pixels BOILING, the artefact this
     codebase bakes frames to avoid in the first place, and it is what the
     measurement showed: 294 pixels differing across all 72 columns when
     only the tail's 12 should move. A field indexed by position gives a
     pixel the same roll whatever else is lit, so the body comes out
     identical and only the tail changes. */
  function thinField(tile, field, p) {
    var w = tile.w, h = tile.h;
    var img = tile.ctx.getImageData(0, 0, w, h), d = img.data;
    for (var y = 0; y < h; y++) {
      for (var x = 0; x < w; x++) {
        var i = (y * w + x) * 4;
        if (d[i + 3] === 0) continue;
        if (field[y * w + x] < p) d[i + 3] = 0;
      }
    }
    tile.ctx.putImageData(img, 0, 0);
  }

  /* one roll per pixel of a tile that size, built once and shared by every
     frame and both facings of the thing it belongs to */
  function noiseField(seed, w, h) {
    var r = mulberry32(seed), n = [], i;
    for (i = 0; i < w * h; i++) n.push(r());
    return n;
  }

  /* A DARK HALO: every unlit 4-neighbour of a lit pixel, painted
     boardShade. Over the slate at 65 a halo at 53 is invisible. Over a
     CHALK PLANK at 205 it is the only thing keeping a 1px pale line from
     disappearing - and the shark threads every gap, so it is in front of
     a plank constantly, because PlayScene draws boons in the pass AFTER
     the pillars. The halo is painted onto unlit pixels only, so it cannot
     touch the drawing it is haloing and nothing has to be composited
     underneath. There is no pale powder pass: a bright halo on a bright
     drawing on a dark board is a second outline nobody asked for. */
  function halo(tile, col) {
    var w = tile.w, h = tile.h, c = tile.ctx;
    var d = c.getImageData(0, 0, w, h).data;
    var lit = [], x, y, i;
    for (i = 0; i < w * h; i++) lit.push(d[i * 4 + 3] !== 0);
    c.fillStyle = col;
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        i = y * w + x;
        if (lit[i]) continue;
        if ((x > 0 && lit[i - 1]) || (x < w - 1 && lit[i + 1]) ||
            (y > 0 && lit[i - w]) || (y < h - 1 && lit[i + w])) {
          c.fillRect(x, y, 1, 1);
        }
      }
    }
  }

  /* THE INVERSE OF halo(): clear every pixel of `tile` that 4-neighbours a
     lit pixel of `stamp`, so a drawing laid over another drawing stays a
     SECOND drawing instead of fusing with the first. The halo above cannot
     do this job - boardShade 53 against the board at 65 is invisible, and
     the two things needing separating here are both the chalk - so the
     separation has to be a HOLE in the thing underneath. The one caller is
     the stick man in the shark's mouth, who sits on top of four teeth and
     has to stay a man sitting in a jaw rather than a lump filling it. Run
     BEFORE the stamp is composited; the pixels the stamp itself covers are
     skipped, because the stamp is about to overdraw them anyway. */
  function moat(tile, stamp) {
    var w = tile.w, h = tile.h;
    var sd = stamp.ctx.getImageData(0, 0, w, h).data;
    var img = tile.ctx.getImageData(0, 0, w, h), d = img.data;
    var lit = [], x, y, i;
    for (i = 0; i < w * h; i++) lit.push(sd[i * 4 + 3] !== 0);
    for (y = 0; y < h; y++) {
      for (x = 0; x < w; x++) {
        i = y * w + x;
        if (lit[i]) continue;
        if ((x > 0 && lit[i - 1]) || (x < w - 1 && lit[i + 1]) ||
            (y > 0 && lit[i - w]) || (y < h - 1 && lit[i + w])) d[i * 4 + 3] = 0;
      }
    }
    tile.ctx.putImageData(img, 0, 0);
  }

  /* a polyline through a point table, with an offset, on either brush */
  function poly(c, pts, col, dx, dy, fat) {
    var draw = fat ? pline2 : pline;
    for (var i = 1; i < pts.length; i++) {
      draw(c, pts[i - 1][0] + dx, pts[i - 1][1] + dy,
              pts[i][0] + dx, pts[i][1] + dy, col);
    }
  }

  /* the same, with every POINT shoved a pixel off a seeded stream: a hand
     going over a line it has already drawn does not land on it */
  function polyShoved(c, pts, col, r) {
    var i, ax, ay, bx, by;
    for (i = 1; i < pts.length; i++) {
      ax = pts[i - 1][0] + j3(r); ay = pts[i - 1][1] + j3(r);
      bx = pts[i][0] + j3(r);     by = pts[i][1] + j3(r);
      pline(c, ax, ay, bx, by, col);
    }
  }

  /* ==================================================== THE TOP RAIL

     240x24, the room's own tile beat, so it tiles against the Whiteboard's
     band on the same phase and the seam at the swap is invisible.

       rows 0..13   the dim room BEHIND the board, a ramp from beyondDeep
                    at the top of the screen to beyond at the rail, painted
                    row by row so the band has no edge of its own, with the
                    room's one-in-forty plaster tooth on it. The Whiteboard's
                    rows, because it is the Whiteboard's wall.
       rows 14..22  THE WOOD RAIL. A chalkboard in a school hall is in a
                    varnished timber frame and not an aluminium extrusion,
                    and it is the fourth of the four things that stop this
                    reading as a whiteboard turned down.
       row 23       frameLine, the kill line's hard edge, and NOTHING SOLID
                    UNDER IT - the band contract in js/livingroom.js's
                    header. The rail over your head is what ends the run. */
  function bakeTop() {
    var W240 = 240, t = makeCanvas(W240, CEIL), c = t.ctx;
    var r = mulberry32(5312);
    var x, y, i;

    c.fillStyle = P.beyondDeep; c.fillRect(0, 0, W240, 14);
    for (y = 0; y < 14; y++) {
      c.fillStyle = LivingRoom.rgba(P.beyond, (y + 0.5) / 14);
      c.fillRect(0, y, W240, 1);
    }
    for (y = 0; y < 14; y++) {
      for (x = 0; x < W240; x++) {
        if (r() > 0.025) continue;
        c.fillStyle = r() < 0.5 ? P.beyondDeep : P.groove;
        c.fillRect(x, y, 1, 1);
      }
    }

    /* the timber */
    c.fillStyle = P.frameLit;  c.fillRect(0, 14, W240, 1);
    c.fillStyle = P.frameMid;  c.fillRect(0, 15, W240, 6);
    c.fillStyle = P.frameDark; c.fillRect(0, 21, W240, 2);

    /* AND THE GRAIN, which is the whole difference between a wooden rail
       and a brown stripe. Long shallow streaks along the run, never across
       it, two tones, and never on row 14 - the lit top edge of a moulding
       is the one row a plane has been over and it is the row the eye reads
       the straightness off. */
    for (i = 0; i < 26; i++) {
      var gy = 16 + Math.floor(r() * 5);
      var gx = Math.floor(r() * W240);
      var len = 8 + Math.floor(r() * 22);
      c.fillStyle = r() < 0.55 ? P.frameDark : P.frameLit;
      for (x = 0; x < len; x++) c.fillRect((gx + x) % W240, gy, 1, 1);
    }
    /* two knots, the size a batten actually has */
    [62, 178].forEach(function (kx) {
      c.fillStyle = P.frameDark; c.fillRect(kx, 17, 3, 2);
      c.fillStyle = P.frameLit;  c.fillRect(kx + 1, 17, 1, 1);
    });

    c.fillStyle = P.frameLine; c.fillRect(0, 23, W240, 1);
    return t;
  }

  /* ======================================================== THE TRAY

     192x28 - VH - FLOOR - and the same three bands the Whiteboard's tray
     has with the materials changed: a dust lip instead of an aluminium
     one, timber instead of extrusion, and then THE ROOM'S OAK ON SEED 11.

     Eleven is not a choice. It is the Whiteboard's seed and the Desk's and
     the Mantle's, and the floor under a stay has to be the same boards as
     the floor the player left, because the swap happens with the tray on
     screen and a grain that jumped would be the one thing on the frame
     that said "a different room" instead of "the same room, drawn in
     chalk". */
  function bakeFloor() {
    var t = makeCanvas(192, VH - FLOOR), c = t.ctx;
    var r = mulberry32(6611);
    var i, x;

    c.fillStyle = P.trayDust;  c.fillRect(0, 0, 192, 1);    /* the lip, y 242 */
    c.fillStyle = P.trayWood;  c.fillRect(0, 1, 192, 4);
    c.fillStyle = P.frameDark; c.fillRect(0, 5, 192, 1);    /* the underside  */

    /* THE DUST PILED ON IT. A chalk ledge is not a clean edge - it is a
       ledge with twenty years of chalk heaped along it, and the heap is
       what tells the player at a glance that the thing they are flying
       over is a TRAY and not a skirting board. Low mounds, never a
       continuous second row, because a continuous row is a stripe. */
    c.fillStyle = P.trayDust;
    for (i = 0; i < 22; i++) {
      x = Math.floor(r() * 190);
      c.fillRect(x, 1, 2 + Math.floor(r() * 4), 1);
      if (r() < 0.35) c.fillRect(x + 1, 2, 1 + Math.floor(r() * 2), 1);
    }
    /* and one stub of chalk lying in it, per tile */
    c.fillStyle = P.chalkSoft; c.fillRect(132, 1, 7, 2);
    c.fillStyle = P.chalk;     c.fillRect(132, 1, 7, 1);
    /* the eraser, down in the lower left where the haze says it lives */
    c.fillStyle = P.eraserFelt; c.fillRect(34, 1, 13, 3);
    c.fillStyle = P.frameMid;   c.fillRect(34, 1, 13, 1);

    LivingRoom.paintOak(c, 0, 6, 192, 22, 11);
    return t;
  }

  /* ================================================ WHAT IS ON THE BOARD

     Six ghost doodles and two live ones, QUIETER THAN THE WHITEBOARD'S
     FOURTEEN ON PURPOSE. That board was white and busy made it readable;
     this one is dark, the shark on it is a pale 1px outline, and busy
     would hide a shark. Three of the six come straight off the reference
     the owner attached - the wave line is the water the shark is in - and
     the rest are what is on a chalkboard nobody has wiped since Tuesday.

     Every one of them is drawn into a transparent scratch tile and run
     through the porous pass before it is composited onto the slate, so a
     doodle is broken the same way a plank is. No magnets and no tape:
     nothing sticks to slate. */

  /* a tally, `n` strokes, the fifth struck through the other four */
  function dTally(c, x, y, n, col) {
    for (var i = 0; i < Math.min(n, 4); i++) {
      pline(c, x + i * 5, y, x + i * 5 + 1, y + 16, col);
    }
    if (n >= 5) pline(c, x - 2, y + 14, x + 17, y + 2, col);
  }

  /* THE WATER, off the reference: the long wobbling line under the shark.
     Kept because it is the one mark in the drawing that is not the shark
     and it is the reason the drawing reads as a sea and not as a fish on
     a table. */
  function dWave(c, x, y, len, col) {
    var px = x, py = y, k, nx, ny;
    for (k = 1; k <= len; k += 3) {
      nx = x + k;
      ny = y + Math.round(Math.sin(k * 0.26) * 4);
      pline(c, px, py, nx, ny, col);
      px = nx; py = ny;
    }
  }

  /* noughts and crosses, unfinished. Nobody won this one either. */
  function dNoughts(c, x, y, col) {
    pline(c, x + 8, y, x + 8, y + 24, col);
    pline(c, x + 16, y, x + 16, y + 24, col);
    pline(c, x, y + 8, x + 24, y + 8, col);
    pline(c, x, y + 16, x + 24, y + 16, col);
    pcircle(c, x + 4, y + 4, 3, col);
    pline(c, x + 11, y + 11, x + 21, y + 21, col);
    pline(c, x + 21, y + 11, x + 11, y + 21, col);
    pcircle(c, x + 20, y + 4, 3, col);
  }

  /* "2+2", and no answer, because somebody was called away */
  function dSum(c, x, y, col) {
    var two = function (ox) {
      pline(c, x + ox, y + 2, x + ox + 6, y, col);
      pline(c, x + ox + 6, y, x + ox + 7, y + 5, col);
      pline(c, x + ox + 7, y + 5, x + ox, y + 11, col);
      pline(c, x + ox, y + 11, x + ox + 8, y + 11, col);
    };
    two(0);
    pline(c, x + 12, y + 6, x + 20, y + 6, col);
    pline(c, x + 16, y + 2, x + 16, y + 10, col);
    two(23);
  }

  /* a fish skeleton: the other thing anybody ever draws next to a shark */
  function dBones(c, x, y, col) {
    pline(c, x + 4, y + 8, x + 30, y + 8, col);           /* the spine   */
    for (var i = 0; i < 6; i++) {
      pline(c, x + 7 + i * 4, y + 8, x + 8 + i * 4, y + 3, col);
      pline(c, x + 7 + i * 4, y + 8, x + 8 + i * 4, y + 13, col);
    }
    pline(c, x + 30, y + 8, x + 35, y + 2, col);          /* the tail    */
    pline(c, x + 30, y + 8, x + 35, y + 14, col);
    pline(c, x + 35, y + 2, x + 35, y + 14, col);
    pcircle(c, x + 4, y + 7, 3, col);                     /* the head    */
    pline(c, x + 3, y + 6, x + 4, y + 6, col);            /* ...and eye  */
  }

  /* a crude boat. One hull, one mast, one sail, and it is above the wave
     line on every tile it lands on, because it is the thing the shark is
     under. */
  function dBoat(c, x, y, col) {
    pline(c, x, y + 14, x + 4, y + 20, col);
    pline(c, x + 4, y + 20, x + 24, y + 20, col);
    pline(c, x + 24, y + 20, x + 28, y + 14, col);
    pline(c, x, y + 14, x + 28, y + 14, col);
    pline(c, x + 14, y + 14, x + 14, y, col);             /* the mast    */
    pline(c, x + 15, y + 1, x + 24, y + 12, col);         /* the sail    */
    pline(c, x + 15, y + 12, x + 24, y + 12, col);
  }

  /* THE ERASER HAZE. Three or four bands, 30 to 50 rows tall and 200 to
     480 wide, alpha ramped 0 -> 0.30 -> 0 row by row so the band has no
     edge anywhere and nothing has to be feathered afterwards. The band's
     centre line DRIFTS ONE ROW EVERY THIRTY COLUMNS, because an arm
     sweeping a board sweeps an arc and not a rectangle - a perfectly
     horizontal haze reads as a gradient somebody applied. */
  function swipe(c, r) {
    var h = 30 + Math.floor(r() * 21);
    var w = 200 + Math.floor(r() * 281);
    var x0 = Math.floor(r() * (BOARD_W - w * 0.4)) - Math.floor(w * 0.2);
    var y0 = Math.floor(r() * (BOARD_H - h));
    var slant = r() < 0.5 ? 1 : -1;
    var x, row, a;
    for (x = 0; x < w; x++) {
      if (x0 + x < 0 || x0 + x >= BOARD_W) continue;
      var drift = Math.round(x / 30) * slant;
      for (row = 0; row < h; row++) {
        /* a triangle on the row, which is the cheapest ramp with no edge
           at either end and no flat top in the middle to read as a band */
        a = (row < h / 2 ? row / (h / 2) : (h - row) / (h / 2)) * 0.30;
        if (a <= 0.004) continue;
        c.fillStyle = LivingRoom.rgba(P.ghost, a);
        c.fillRect(x0 + x, y0 + row + drift, 1, 1);
      }
    }
  }

  function bakeBoard(tile) {
    var t = makeCanvas(BOARD_W, BOARD_H), c = t.ctx;
    var r = mulberry32(8140 + tile * 211);
    var i, n;

    /* 1. the slate */
    c.fillStyle = P.board;
    c.fillRect(0, 0, BOARD_W, BOARD_H);

    /* 2. the joint. ONE per tile, as the Whiteboard has one - a panel
       edge, not a grid, and it travels with the board. */
    c.fillStyle = P.seam;
    c.fillRect(96 + tile * 190, 0, 1, BOARD_H);

    /* 3. the lower left, where the eraser lives and nobody writes */
    c.fillStyle = LivingRoom.rgba(P.boardShade, 0.55);
    c.fillRect(0, 118, 210, BOARD_H - 118);
    c.fillStyle = LivingRoom.rgba(P.boardShade, 0.45);
    c.fillRect(0, 160, 120, BOARD_H - 160);

    /* 4. the haze */
    n = 3 + Math.floor(r() * 2);
    for (i = 0; i < n; i++) swipe(c, r);

    /* 5. AND THE DOODLES, onto a transparent scratch so the porous pass
       can reach them without reaching the slate. Placed on a 4x2 slot grid
       drawn without replacement, which is what guarantees no two overlap:
       the largest thing in the pool is 60x14 and the smallest slot is
       115x97. */
    var sc = makeCanvas(BOARD_W, BOARD_H), g = sc.ctx;
    var MARGIN = 16;
    var SLOT_W = (BOARD_W - MARGIN * 2) / 4;      /* 112 */
    var SLOT_H = (BOARD_H - MARGIN * 2) / 2;      /* 93  */
    var slots = [], k;
    for (k = 0; k < 8; k++) slots.push(k);

    /* the six ghosts, in chalkDust, and the two live ones in chalk. The
       live pair is always a tally of five and a wave: a tally that has
       reached five is the only mark on a chalkboard that is obviously
       NEWER than the rest of it, and the wave is the reference's water. */
    var marks = [
      { col: P.chalkDust, w: 22, h: 18, f: function (cc, x, y, col) { dTally(cc, x, y, 4, col); } },
      { col: P.chalkDust, w: 60, h: 10, f: function (cc, x, y, col) { dWave(cc, x, y + 5, 58, col); } },
      { col: P.chalkDust, w: 26, h: 26, f: dNoughts },
      { col: P.chalkDust, w: 32, h: 12, f: dSum },
      { col: P.chalkDust, w: 38, h: 16, f: dBones },
      { col: P.chalkDust, w: 30, h: 22, f: dBoat },
      { col: P.chalk,     w: 22, h: 18, f: function (cc, x, y, col) { dTally(cc, x, y, 5, col); } },
      { col: P.chalk,     w: 60, h: 10, f: function (cc, x, y, col) { dWave(cc, x, y + 5, 58, col); } }
    ];
    /* FIVE OR SIX of the ghosts, drawn without replacement, plus both live
       marks - so seven or eight of the eight slots are filled and no mark
       can appear twice on one tile. The design asked for five to SEVEN
       ghosts and named six of them; six is therefore the ceiling, because
       a seventh would have to be a repeat and a doodle appearing twice on
       the same 480px tile is read instantly - it is the thing the slot
       grid and the without-replacement draw exist to stop. If a seventh
       ghost is ever wanted, it is one more entry in `marks` and one more
       slot, not a bigger number here. */
    var ghosts = 5 + Math.floor(r() * 2);
    var order = [];
    for (k = 0; k < 6; k++) order.push(k);
    for (k = order.length - 1; k > 0; k--) {
      var sw = Math.floor(r() * (k + 1)), tmp = order[k];
      order[k] = order[sw]; order[sw] = tmp;
    }
    var chosen = order.slice(0, ghosts).concat([6, 7]);

    for (i = 0; i < chosen.length; i++) {
      var si = Math.floor(r() * slots.length), slot = slots[si];
      slots.splice(si, 1);
      var m = marks[chosen[i]];
      var sx = MARGIN + (slot % 4) * SLOT_W;
      var sy = MARGIN + ((slot / 4) | 0) * SLOT_H;
      var dx = Math.round(sx + r() * Math.max(0, SLOT_W - m.w));
      var dy = Math.round(sy + r() * Math.max(0, SLOT_H - m.h));
      m.f(g, dx, dy, m.col);
    }

    /* the ghosts are BROKEN by the same rule the live marks are - a wiped
       stroke is not a thinner stroke, it is the same stroke with most of
       it gone - and then they go down over the haze */
    porous(sc, r);
    c.drawImage(sc.canvas, 0, 0);
    return t;
  }

  /* ================================================== THE CHALK PLANKS

     A SCRUB, NOT A FILL. The Whiteboard's bar is a rectangle somebody
     coloured in solid with a marker, and a solid 34px rectangle of chalk
     is the one thing a hand cannot make - chalk goes down in strokes and
     a filled shape is twenty strokes side by side with the slate showing
     between them.

     So: the core is the porous densities per pixel, and then the three
     things a scrubbed-in chalk rectangle has that a filled one does not.

     THE SCRUB STREAKS. Every six to eleven rows - never a fixed step,
     because a fixed step is a ladder at 1x, which is the mistake the
     Whiteboard's rivets made - one row where the density drops to half.
     That is the row where the hand changed direction and the stick was
     barely touching.

     THE HAND EDGE. The Whiteboard's, in chalkSoft rather than in the core
     pigment: four-to-seven-row runs reaching none, one or two of the outer
     columns, so the plank is 30 to 34 wide and spends most of its length
     at 32. Soft, because the edge of a scrub is where the pressure ran out.

     THE SHED POWDER. One column of chalkDust at 40% outside each edge -
     the dust a stick of chalk throws sideways, and the thing that makes
     the plank sit ON the slate rather than being a hole cut in it.

     128 tall and tiled vertically by LivingRoom.drawColumn, for the
     Whiteboard's reason: at 64 the streaks come round twice inside one
     plank and the eye finds the repeat immediately. */
  function bakeBar(variant) {
    var BW = 34, BH = 128;
    var t = makeCanvas(BW, BH), c = t.ctx;
    var r = mulberry32(1470 + variant * 83);
    var x, y, q, side, run, n, i;

    /* the next row at which the stick goes thin, and the one after */
    var faint = 3 + Math.floor(r() * 6);

    for (y = 0; y < BH; y++) {
      var dense = (y === faint) ? 0.5 : 1;
      if (y === faint) faint = y + 6 + Math.floor(r() * 6);
      for (x = 2; x < 32; x++) {
        q = r();
        if (q >= 0.88 * dense) continue;
        c.fillStyle = q < 0.72 * dense ? P.chalk : P.chalkSoft;
        c.fillRect(x, y, 1, 1);
      }
    }

    /* the hand edge, both sides, independently */
    for (side = 0; side < 2; side++) {
      y = 0;
      while (y < BH) {
        run = 4 + Math.floor(r() * 4);
        n = r() < 0.25 ? 0 : (r() < 0.667 ? 1 : 2);
        if (n > 0) {
          c.fillStyle = P.chalkSoft;
          c.fillRect(side ? 32 : 2 - n, y, n, Math.min(run, BH - y));
        }
        y += run;
      }
    }

    /* the powder, on the outermost column each side */
    c.fillStyle = P.chalkDust;
    for (y = 0; y < BH; y++) {
      if (r() < 0.4) c.fillRect(0, y, 1, 1);
      if (r() < 0.4) c.fillRect(BW - 1, y, 1, 1);
    }

    /* and four bites the scrub never reached. CLEARED and not painted with
       the slate, because a hole in a plank shows whatever is on the board
       behind it - a swipe of haze, a ghost doodle, the joint - and painting
       flat slate into it would put a clean green chip on top of a doodle. */
    for (i = 0; i < 4; i++) {
      y = Math.floor(r() * (BH - 2));
      if (r() < 0.5) c.clearRect(0, y, 3, 2);
      else c.clearRect(BW - 3, y, 3, 2);
    }
    return t;
  }

  /* The mouth of the gap: 42x9, the engine's own cap box, spanning 4px
     past the plank each side. The same scrub at the same densities, the
     four corner pixels cleared because the end of a stroke is never
     square, and ONE SOFT ROW ON THE FACE THAT LOOKS INTO THE GAP - the
     pressure coming off as the hand lifted at the edge it was aiming for.
     `down` is the cap on the bottom of the top column, so its soft face
     is its BOTTOM row. */
  function bakeCap(down) {
    var CW = 42, CH = 9;
    var t = makeCanvas(CW, CH), c = t.ctx;
    var r = mulberry32(down ? 2204 : 2207);
    var x, y, q;
    for (y = 0; y < CH; y++) {
      for (x = 0; x < CW; x++) {
        q = r();
        if (q >= 0.88) continue;
        c.fillStyle = q < 0.72 ? P.chalk : P.chalkSoft;
        c.fillRect(x, y, 1, 1);
      }
    }
    c.clearRect(0, 0, 1, 1); c.clearRect(CW - 1, 0, 1, 1);
    c.clearRect(0, CH - 1, 1, 1); c.clearRect(CW - 1, CH - 1, 1, 1);
    c.fillStyle = P.chalkSoft;
    c.fillRect(1, down ? CH - 1 : 0, CW - 2, 1);
    return t;
  }

  /* ========================================================= THE SHARK

     The owner attached a drawing - Assets/Concept/Shark drawing ref.png,
     626x502 - and this is a trace of it. 0.115 of 626x502 is 72x57.7, so
     the tile is 72x58 and the trace is UNIFORM: nothing here is squashed
     to fit a box somebody picked first.

     The tables below are the LEFT-FACING pose, which is the reference's:
     teeth toward the player, the stick man in the mouth, the eye behind
     them. The right-facing tiles are the same tables mirrored through
     x -> 71 - x and nothing else.

     WHICH WAY IT FACES, AND WHY BOTH. Its default is RIGHT - forward, the
     way everyone in this game travels; the owner's words were "traveling
     forward with ease" and a shark swimming backwards is not at ease. It
     turns to the reference's pose for THE LOOK, and the look is the catch
     window. So the face the owner drew is the face the player sees at the
     only moments the shark can be caught, and the face it is wearing when
     it is.

     FOUR FAT TEETH A ROW AND NOT EIGHT. The reference has about seven a
     row; at 72px across, eight points is 2px of tooth, and 2px of tooth
     on a porous 1px stroke is noise exactly where the drawing's signature
     is. Four teeth 6px deep is what reads at 1x as the thing in the photo.

     THE TILE IS ON `bg`, the 480x270 nearest-neighbour layer, with
     everything else in the level. Nothing about the shark is drawn at
     device resolution - it is a drawing ON the board, and a drawing on a
     board is made of the board's pixels. */

  var SHARK_W = 72, SHARK_H = 58;

  var FIN      = [[16, 2], [14, 8], [11, 14], [5, 18]];
  var BACK     = [[16, 2], [23, 12], [30, 21], [38, 28], [46, 30],
                  [54, 27], [60, 22], [64, 15], [66, 14]];
  var TAIL     = [[66, 14], [64, 33], [59, 35], [70, 43], [63, 39]];
  var BELLY    = [[2, 36], [7, 46], [15, 51], [25, 52], [38, 52],
                  [49, 48], [60, 43], [63, 39]];
  var BELLY2   = [[12, 49], [24, 54], [36, 54], [47, 51], [57, 46]];
  var TEETH_UP = [[4, 18], [6, 24], [8, 19], [11, 26], [13, 21],
                  [16, 28], [18, 24], [19, 29]];
  var TEETH_LO = [[19, 29], [17, 35], [15, 31], [12, 37], [10, 32],
                  [7, 38], [5, 33], [2, 36]];

  /* THE TAIL FLICK. Two frames, and the body is pixel-identical between
     them: THE THREE POINTS THAT MOVE ARE THE THREE THE TAIL OWNS ALONE -
     the trailing edge, the notch and the lower lobe's tip, indices 1, 2
     and 3. Index 0 is the upper lobe's tip, which BACK also ends on, and
     index 4 is the root, which BELLY also ends on; moving either would
     open a gap between the tail and the fish it is on, and a shark that
     comes apart at the hip twice a second is not a tail flick.

     Frame 0 carries the three a pixel up and frame 1 two pixels down -
     three pixels of travel on a 29px tail, about the amplitude the
     reference's own wobble has. */
  var TAIL_LIVE = [1, 2, 3];
  var TAIL_DY = [-1, 2];

  function tailPts(frame) {
    var out = [], i;
    for (i = 0; i < TAIL.length; i++) {
      out.push([TAIL[i][0],
                TAIL[i][1] + (TAIL_LIVE.indexOf(i) < 0 ? 0 : TAIL_DY[frame])]);
    }
    return out;
  }

  /* the porosity field all four shark tiles share - see thinField */
  var SHARK_FIELD = noiseField(7310, SHARK_W, SHARK_H);

  /* mirror a table through the tile's vertical centre line */
  function flip(pts) {
    var out = [];
    for (var i = 0; i < pts.length; i++) out.push([(SHARK_W - 1) - pts[i][0], pts[i][1]]);
    return out;
  }

  /* THE THREE PASSES, each with a job.

     (1) THE HARD PASS. Every polyline once, in `chalk`, 1px. This is the
         drawing.
     (2) THE SOFT, MISREGISTERED PASS. The same polylines in `chalkSoft`
         with every point shoved (-1..1, -1..1). TWO MISREGISTERED PASSES
         IS A HAND GOING OVER ITS OWN LINE - it is not a blur and it is
         not an outline, it is the thing the reference actually shows,
         which is somebody who went round the shape twice and did not land
         on it the second time. The BELLY2 line - the second, wobblier
         belly in the photograph - is soft only, because it is a
         correction and not a line. And the fin's back edge, which is the
         heaviest stroke in the reference, gets a third pass offset (0,1):
         the descending half of the back sweep, from the fin tip to the
         belly of the curve.
     (3) THE DARK HALO. See halo() above.

     THE MAN is drawn BETWEEN the thinning and the halo, so he is never
     dropped - he is the joke of the drawing, he is already only thirteen
     pixels tall and 30 pixels in all, and with 12% of him gone he would be
     at the floor of legibility. He is on the 1px brush like everything
     else in here - NOTHING in this shark is on the 2px brush any more -
     and he is composited over a 1px moat cleared out from under him,
     because at 2px he filled the jaw he is sitting in. See the block
     that draws him.

     THE SEED IS 7310 AND IT DOES NOT CARRY THE FRAME. The design wrote
     mulberry32(7310 + frame), and a per-frame stream is the one thing
     this bake must not have: the two frames are swapped at 3Hz and the
     body is supposed to be pixel-identical across the swap, so a stream
     that differs per frame re-jitters every point of the fin, the back,
     the belly and the teeth three times a second. Measured before the
     fix: 294 pixels differing across all 72 columns, where only the
     tail's twelve should move. One stream for both frames, consumed in
     the same order over polylines with the same segment counts, gives
     identical jitter everywhere except the tail - whose POINTS differ,
     which is the animation. The porosity is handled the same way and for
     the same reason, by a position-indexed field rather than a stream:
     see thinField. */
  function bakeShark(left, frame) {
    var t = makeCanvas(SHARK_W, SHARK_H), c = t.ctx;
    var r = mulberry32(7310);
    var tail = tailPts(frame);

    var fin = FIN, back = BACK, bel = BELLY, bel2 = BELLY2;
    var tu = TEETH_UP, tl = TEETH_LO, tp = tail;
    var eyeX = 27, eyeY = 29, dotX = 28;
    var manX = 9, manY = 25;
    if (!left) {
      fin = flip(FIN); back = flip(BACK); bel = flip(BELLY); bel2 = flip(BELLY2);
      tu = flip(TEETH_UP); tl = flip(TEETH_LO); tp = flip(tail);
      eyeX = (SHARK_W - 1) - 27; dotX = (SHARK_W - 1) - 28;
      manX = (SHARK_W - 1) - 9;
    }

    /* (1) the hard pass */
    poly(c, fin,  P.chalk, 0, 0, false);
    poly(c, back, P.chalk, 0, 0, false);
    poly(c, tp,   P.chalk, 0, 0, false);
    poly(c, bel,  P.chalk, 0, 0, false);
    poly(c, tu,   P.chalk, 0, 0, false);
    poly(c, tl,   P.chalk, 0, 0, false);
    pcircle(c, eyeX, eyeY, 2, P.chalk);
    c.fillStyle = P.chalk; c.fillRect(dotX, eyeY, 1, 1);

    /* (2) the soft, misregistered pass */
    polyShoved(c, fin,  P.chalkSoft, r);
    polyShoved(c, back, P.chalkSoft, r);
    polyShoved(c, tp,   P.chalkSoft, r);
    polyShoved(c, bel,  P.chalkSoft, r);
    polyShoved(c, bel2, P.chalkSoft, r);
    polyShoved(c, tu,   P.chalkSoft, r);
    polyShoved(c, tl,   P.chalkSoft, r);
    /* the third pass on the heaviest line: the fin's back edge, running
       down into the belly of the sweep. Four segments, offset (0,1). */
    poly(c, back.slice(0, 5), P.chalkSoft, 0, 1, false);

    /* the porous rule's last clause, off the shared field */
    thinField(t, SHARK_FIELD, 0.12);

    /* THE MAN, after the thinning and exempt from it, on the 1px brush and
       with a 1px moat cleared round him.

       HE WAS ON THE 2px BRUSH AND HE WAS A LUMP. At r 2 the twelve ring
       points of pcircle2 stamp 2x2 each and light 28 of the 36 pixels of a
       6x6 patch instead of drawing a head, and five 2px limbs on a figure
       thirteen pixels tall fill most of what is left: 70 lit pixels where
       the 1px man is 30. Drawn last, at full density, he was the only
       thing in the tile the thinning had not been near. Measured on the
       bake: his own box, x 5..13 by y 22..36, came out 91 of 135
       pixels lit - 67% - where the drawing without him is 39 of 135, 29%.
       He lay straight across TEETH_UP's x 6..13 and TEETH_LO's x 7..12 and
       took the whole mouth box, x 2..20 by y 17..38, from 25% lit to 38%,
       so neither he nor the four teeth read: a pale smear where the
       reference's signature is. On the 1px brush with the moat the man box
       is 48 of 135, 36%, and the mouth box 115 of 418, 28%, against the
       board-only 25% - the man reads AND the tooth zigzag reads as teeth.

       The moat and not the halo, because boardShade 53 on board 65 is
       invisible and both things needing separating are the same chalk: see
       moat(). And still after thinField and still exempt, because that
       exemption is the whole reason a 1px man survives at all - he is
       thirteen pixels tall and 30 pixels in total, the joke of the
       drawing, and 12% of him gone is the floor of legibility.

       `man` is a SCRATCH tile and is not kept: it exists so the moat can
       be cut from the shape before the shape is laid down, and it is
       garbage the moment the drawImage returns. Four of them are made
       across the four shark bakes and none reaches T. */
    var man = makeCanvas(SHARK_W, SHARK_H), mc = man.ctx;
    var s = left ? 1 : -1;
    pcircle(mc, manX, manY, 2, P.chalk);
    pline(mc, manX, manY + 3, manX, manY + 6, P.chalk);                    /* body */
    pline(mc, manX, manY + 3, manX - 3 * s, manY + 5, P.chalk);            /* arms */
    pline(mc, manX, manY + 3, manX + 3 * s, manY + 5, P.chalk);
    pline(mc, manX, manY + 6, manX - 2 * s, manY + 10, P.chalk);           /* legs */
    pline(mc, manX, manY + 6, manX + 2 * s, manY + 10, P.chalk);
    moat(t, man);
    c.drawImage(man.canvas, 0, 0);

    /* (3) the halo */
    halo(t, P.boardShade);
    return t;
  }

  /* THE DORSAL FIN ON ITS OWN, 20x14, for the dive: the only part of the
     shark that is above the tray while the rest of it is under. It leans
     with the swim - back toward the tail - and it is built on the same
     three passes the body is, so a fin cutting the floor is the same
     drawing as the fin on the fish. */
  function bakeFin() {
    var t = makeCanvas(20, 14), c = t.ctx;
    var r = mulberry32(7411);
    var lead = [[12, 1], [16, 7], [18, 13]];      /* the leading edge   */
    var trail = [[12, 1], [8, 6], [3, 11], [2, 13]];
    var base = [[2, 13], [18, 13]];
    var field = noiseField(7411, 20, 14);
    poly(c, lead,  P.chalk, 0, 0, false);
    poly(c, trail, P.chalk, 0, 0, false);
    poly(c, base,  P.chalk, 0, 0, false);
    polyShoved(c, lead,  P.chalkSoft, r);
    polyShoved(c, trail, P.chalkSoft, r);
    thinField(t, field, 0.12);
    halo(t, P.boardShade);
    return t;
  }

  /* ============================================================ build

     SELF-GUARDED, because the one caller is the last line of
     Whiteboard.build() and that function runs again on every boot of that
     level. The guard is on T.board, which is assigned first. And it does
     its own LivingRoom.build() for the reason the Whiteboard's does: this
     module reads the room's oak and the room's crown strip, and a module
     that assumes somebody else built the room is a module that works until
     the day the load order changes.

     Fifteen canvases, about 272k pixels, about 1.04 MiB - all of it inside
     the Whiteboard's bake and so behind the LOADING cover. */
  function build() {
    if (T.board) return;
    LivingRoom.build();
    T.board = [bakeBoard(0), bakeBoard(1)];
    T.top = bakeTop();
    T.floor = bakeFloor();
    T.post = [bakeBar(0), bakeBar(1)];
    T.capDown = bakeCap(true);
    T.capUp = bakeCap(false);
    /* the two contact shadows, as baked strips off the room's own ramp -
       the Whiteboard's lengths and depths, because they were measured
       against a 480x218 wall in this room and the wall has only changed
       colour. They are far less load-bearing here: a strip at 0.36 over a
       board at 65 moves a row by under two. */
    T.railShade = LivingRoom.bakeShade(P.frameDark, 0.36, 40, false);
    T.trayShade = LivingRoom.bakeShade(P.frameDark, 0.30, 12, true);
    T.sharkR = [bakeShark(false, 0), bakeShark(false, 1)];
    T.sharkL = [bakeShark(true, 0), bakeShark(true, 1)];
    T.fin = bakeFin();
  }

  /* ========================================================== drawing */

  /* One layer, one speed, and then the light - the Whiteboard's rule and
     for its reason: a board is a PLANE. There is no "behind" to parallax
     against, and chalk drawn onto slate must not slide across the doodles
     it was drawn over. TWO tiles where that bay has three, because this
     board carries eight marks and not fourteen and two 480px tiles do not
     visibly repeat before a stay is over: ten planks is about nine seconds
     of board and the pair comes round at eleven. */
  function drawBackdrop(ctx, scroll) {
    clock = scroll;

    ctx.fillStyle = P.board;
    ctx.fillRect(0, 0, VW, VH);

    var k0 = Math.floor(scroll / BOARD_W);
    for (var k = k0; k <= k0 + 1; k++) {
      ctx.drawImage(T.board[hash(k) % 2].canvas,
                    Math.round(k * BOARD_W - scroll), CEIL);
    }

    LivingRoom.drawLight(ctx);
  }

  /* this bay's own band, the room's crown strip, and this bay's rail
     shadow - the Whiteboard's three lines, on the Whiteboard's reasoning:
     a hard edge over the playfield needs a shadow under it or the board
     runs up into the ceiling and the kill line disappears */
  function drawCeiling(ctx, scroll) {
    tileX(ctx, T.top.canvas, scroll, 0);
    ctx.drawImage(LivingRoom.tiles.crownShade.canvas, 0, CEIL);
    ctx.drawImage(T.railShade.canvas, 0, CEIL);
  }

  function drawFloor(ctx, scroll) {
    ctx.drawImage(T.trayShade.canvas, 0, FLOOR - 12);
    tileX(ctx, T.floor.canvas, scroll, FLOOR);
  }

  /* ---------------------------------------------------------- planks */

  function drawPillar(ctx, ob) {
    var x = Math.round(ob.x);
    var tile = T.post[ob.variant].canvas;
    var w = tile.width;
    var topH = ob.gapY - CEIL;
    var botY = ob.gapY + ob.gapH;
    var botH = FLOOR - botY;
    if (topH > 0) LivingRoom.drawColumn(ctx, tile, x, CEIL, w, topH);
    if (botH > 0) LivingRoom.drawColumn(ctx, tile, x, botY, w, botH);
    if (topH > 0) ctx.drawImage(T.capDown.canvas, x - 4, ob.gapY - 9);
    if (botH > 0) ctx.drawImage(T.capUp.canvas, x - 4, botY);
    /* AND NO CAST SHADOW, for the Whiteboard's reason exactly: a drawing
       casts no shadow on the surface it is drawn on. The plank already has
       140 points of luminance on the slate and the only thing in this room
       that could throw a shadow is the frame. */
  }

  /* ----------------------------------------------------------- shark */

  /* `face` is +1 for the default pose and -1 for the reference's. The tile
     centre lands on (ob.x, ob.y): x is the body centre, which is Koa's
     convention and what collide()'s prefilter is sized against, and y is
     the row the eye is on - so the fin tip is 27px above it, which is
     exactly where rectsFor puts the top of the upper box. */
  function drawShark(ctx, ob) {
    var x = Math.round(ob.x);

    if (ob.under) {
      /* UNDER THE SAND. The body is never drawn below the tray - the tray
         is 28px deep and a 58px shark would hang out of the bottom of the
         screen - so what is on screen is the fin and the wake, which is
         what a shark under sand actually shows and is also Teef's own move
         shown to the player before they have him. */
      ctx.drawImage(T.fin.canvas, x - 10, FLOOR - 14);
      ctx.fillStyle = P.chalkSoft;
      var p = wrap(ob.age * 6, 1);
      ctx.fillRect(x + 12 + Math.round(p * 3), FLOOR - 7, 3, 1);
      ctx.fillRect(x + 19 + Math.round(p * 4), FLOOR - 4, 3, 1);
      return;
    }

    /* the tail flick: 3Hz while it is actually moving, 1.4Hz while it is
       holding station. Off ob.age, which the engine advances, so a paused
       board is a still tail. */
    var rate = Math.abs(ob.vx) > 60 ? 3 : 1.4;
    var f = Math.floor(wrap(ob.age * rate, 2));
    var set = ob.face < 0 ? T.sharkL : T.sharkR;
    ctx.drawImage(set[f].canvas, x - 36, Math.round(ob.y) - 29);
  }

  function drawObstacle(ctx, ob) {
    if (ob.type === 'pillar') drawPillar(ctx, ob);
    else if (ob.type === 'boon' && ob.meet) drawShark(ctx, ob);
    /* and nothing else can exist in here - see the header's table of
       which makers are unreachable during a stay */
  }

  /* ====================================================== generation */

  /* THE SEAM, and it is the whole reason the exit reads as a teleport and
     not as a crash. js/whiteboard.js:makePillar returns
     { type, x, w: 34, gapY, gapH, variant 0|1, scored } and so does this
     one, field for field, and both modules own T.post[0..1], T.capDown and
     T.capUp. endWarp() leaves every pillar standing and swaps the module
     under them: the planks in flight are taken as its own by the other
     file's drawPillar and rectsFor on the very next frame, nothing on
     screen moves a pixel, and the board turns from chalk to marker.

     IF EITHER MAKER EVER GROWS A FIELD, BOTH DO. */
  function makePillar(x, gapY, gapH, run) {
    return { type: 'pillar', x: x, w: 34, gapY: Math.round(gapY), gapH: Math.round(gapH),
             variant: chance(0.35) ? 1 : 0, scored: false };
  }

  /* A MEET HIDER IN A BOON'S CLOTHES - Koa's machinery, unchanged: the
     engine sets ob.meet after this returns, isPowerUp already refuses a
     meet boon so Gerald cannot reel it in, save() leaves it standing, and
     a catch is Doodads.noteMeet plus the fanfare, the burst, the banner
     and Achievements.check() for free.

     `x` IS THE BODY CENTRE. collide()'s prefilter tests ob.x against
     px +- 46 with w 64, which passes x in [px-110, px+46] against a real
     hit range of (px-37, px+37) - so the prefilter can never cut a catch
     off and `w` is honest for the cull.

     `selfDrawn` is ONE line in PlayScene's drawMeet: the art inks its own
     hider on the room layer, in the room's medium, and the sprite of
     whoever he turns out to be is never shown until he is caught. That is
     the point of this hiding place - the hider IS the scenery.

     THE ART MOVES ob.x AND ob.y DIRECTLY and leaves dx/dy at 0, so the
     engine's grabX/grabY - where the burst happens on a catch - are the
     shark itself and not an offset from it.

     `age` is NOT in here: admit() starts it and moveObstacles advances it,
     so it is the engine's clock and a maker that set it would be fighting
     for it. `diveT` is, and it is the one field section 4 needs that its
     own list omits - the dive has a length and something has to hold it. */
  function makeMeet(x, run) {
    return { type: 'boon', x: x, y: (CEIL + FLOOR) / 2, yBase: (CEIL + FLOOR) / 2, w: 64,
             dx: 0, dy: 0, taken: false, selfDrawn: true,
             mode: 'enter', face: 1, vx: 0, under: false,
             lookX: 0, lookT: 0, diveT: 0, taunt: 0, lastTaunt: 0,
             looks: 0, dives: 0, phase: rand(0, TAU) };
  }

  /* ------------------------------------------------------- the chase */

  var ENTER_V = 190;        /* how fast it comes in from x 528            */
  var LEAD0 = 128;          /* how far ahead it holds station at the start*/
  var LEAD1 = 88;           /* ...and once it has tired                   */
  var TIRE_T = 14;          /* seconds to tire. A stay is 10 to 19.       */
  var X_MAX_SHARK = 372;    /* it never stations off the right of the room*/
  var VX_MAX = 130;
  var HELLO_AT = 96;        /* the hello stops 59px short of a standing
                               player: not a free catch, but a player
                               already sprinting right at the cut can take
                               it, and has earned it                      */
  var HELLO_T = 0.5;
  var LOOK_AT = 72;
  var LOOK_T = 0.55;
  var LOOK_V = 110;
  var DART_V = 170;         /* the flick of the tail out of a look        */
  var DIVE_T = 1.1;
  var Y_LO = CEIL + 30;     /*  54 */
  var Y_HI = FLOOR - 30;    /* 212 */

  /* the first plank whose far edge is still ahead of `x`. Scanned for the
     LEFTMOST such plank rather than the first in list order: the list is
     spawn order, which is very nearly ascending x and not quite - the
     shark itself is admitted before every plank of the stay. */
  function nextPlankAhead(obstacles, x) {
    var best = null;
    for (var i = 0; i < obstacles.length; i++) {
      var p = obstacles[i];
      if (p.type !== 'pillar') continue;
      if (p.x + p.w <= x) continue;
      if (!best || p.x < best.x) best = p;
    }
    return best;
  }

  function gapCentre(p) { return p.gapY + p.gapH / 2; }

  /* THE FRAME. moveObstacles scrolls every obstacle - ob.x -= spd * dt -
     BEFORE it calls stepBoon, so a hider that wants to hold station has to
     add the room's speed back. `ob.vx` is therefore in the SCREEN frame
     throughout this function: +130 opens 130px/s on the player and 0 holds
     station exactly. `run.speed` is one frame stale by design, which is at
     most a pixel on the frame the pace changes.

     There is exactly ONE line that moves this thing in x, and it is below. */
  function stepBoon(ob, dt, obstacles, run) {
    /* a hider already caught is out of the run: the engine has stopped
       testing and drawing him and there is nothing left in here to
       animate. A boon in this room that is not a hider cannot exist. */
    if (!ob.meet || ob.met) return;

    var plank = nextPlankAhead(obstacles, ob.x);
    var ahead = plank ? plank.x - ob.x : 1e9;
    var want, lead;

    if (ob.mode === 'enter') {
      /* in from the right at a flat 190 until it has the player's lead,
         and then THE HELLO: a look, with its own longer reach. The first
         thing on the dark board is the reference drawing turning to face
         you and gliding in with its mouth open - it arrives in about a
         second and a half and the first chalk plank is 2.4s away at
         speedMax. The hello does NOT count against the look cap: the cap
         is on taunts, and this is an introduction. */
      ob.vx = -ENTER_V;
      if (ob.x <= run.px + LEAD0) {
        ob.mode = 'look';
        ob.face = -1;
        ob.lookX = run.px + HELLO_AT;
        ob.lookT = HELLO_T;
      }

    } else if (ob.mode === 'look') {
      /* THE TARGET IS FROZEN IN SCREEN SPACE at the instant the look
         began, and that is the whole arithmetic of the catch window: a
         target re-read every frame walks away from the player as the
         player advances into it, and then the 0.37s of travel a catch
         costs never closes. Both ob.x and lookX are screen coordinates,
         and the screen is what scrolls, so a frozen number stays put. */
      ob.lookT -= dt;
      ob.vx = approach(ob.vx, clamp((ob.lookX - ob.x) * 4, -LOOK_V, LOOK_V), 600 * dt);
      if (ob.lookT <= 0) {
        ob.face = 1;
        ob.vx = DART_V;                 /* cruise's approach pulls this
                                           back to station over about 0.4s:
                                           a flick of the tail            */
        ob.mode = 'cruise';
        ob.taunt = rand(1.6, 2.6);
      }

    } else if (ob.mode === 'dive') {
      ob.diveT -= dt;
      ob.under = true;
      ob.vx = -30;                      /* it slips back toward you under
                                           the sand                       */
      if (ob.diveT <= 0) {
        ob.under = false;
        ob.vx = DART_V;
        ob.mode = 'cruise';
        ob.taunt = rand(1.6, 2.6);
        /* and it comes back up AT THE GAP LINE and damps on from there,
           rather than climbing all the way from under the tray - yBase
           was driven to FLOOR + 4 by the dive and the visible y has been
           clamped at Y_HI throughout, so this is simply the two agreeing
           again on the frame it surfaces. */
        ob.yBase = Y_HI;
      }

    } else {
      /* CRUISE. It holds station ahead of the player while the planks
         slide past it - forward, with ease - and it TIRES, closing from a
         128px lead to 88 over fourteen seconds, which is longer than most
         stays and shorter than the longest. */
      lead = LEAD0 + (LEAD1 - LEAD0) * Math.min(1, ob.age / TIRE_T);
      want = Math.min(X_MAX_SHARK, run.px + lead);
      ob.vx = approach(ob.vx, clamp((want - ob.x) * 3, -VX_MAX, VX_MAX), 400 * dt);
      ob.face = 1;
    }

    /* THE TAUNTS, and they only happen in cruise with clear water ahead:
       a shark turning round to look at you while a plank is 40px off its
       nose is a shark about to swim into it. */
    ob.taunt -= dt;
    /* THE GUARANTEE, and it is ONE LAST TIME and not a second clock.
       Past ten seconds, a drought of two and a half seconds forces a look
       whatever the cap says - but `looks <= 3` is what spends it: the
       forced look is the fourth, and from the fourth on this is false and
       the guarantee is over. Without that clause it re-armed every 2.5s
       for the rest of the stay and a nineteen-second stay measured SIX
       looks against a cap of three, which is not a shark that tires, it
       is a shark that pesters. Under the cap the clause is a no-op: the
       ordinary taunt would have fired anyway and nothing is overridden. */
    var forced = ob.age >= 10 && (ob.age - ob.lastTaunt) > 2.5 && ob.looks <= 3;
    if (ob.mode === 'cruise' && (ob.taunt <= 0 || forced) && ahead > 70) {
      var canLook = ob.looks < 3 || forced;
      var canDive = ob.dives < 2 && ahead >= 80 && ahead <= 140 && !forced;
      /* 0.6 look, 0.4 dive, a capped kind falling to the other, and both
         capped meaning nothing happens but the timer still rolls - the
         GUARANTEE above overrides the look cap, because the last thing
         this drawing does before the planks run out is turn to face you. */
      var pick = chance(0.6) ? 'look' : 'dive';
      if (pick === 'look' && !canLook) pick = canDive ? 'dive' : null;
      else if (pick === 'dive' && !canDive) pick = canLook ? 'look' : null;

      if (pick === 'look') {
        ob.mode = 'look';
        ob.face = -1;
        ob.lookX = run.px + LOOK_AT;
        ob.lookT = LOOK_T;
        ob.looks++;
        ob.lastTaunt = ob.age;
      } else if (pick === 'dive') {
        ob.mode = 'dive';
        ob.diveT = DIVE_T;
        ob.under = true;
        ob.vx = -30;
        ob.dives++;
        ob.lastTaunt = ob.age;
      }
      ob.taunt = rand(1.6, 2.6);
    }

    /* THE ONE LINE THAT MOVES IT. The room's speed added back, plus its
       own screen-frame velocity. */
    ob.x += (run.speed + ob.vx) * dt;

    /* Y, ALWAYS, whatever the mode. It threads every gap through the
       middle - it is showing you the line - and the clamp means no box it
       owns can leave the room: with ob.y in [CEIL+30, FLOOR-30] the upper
       box's top is at worst CEIL+3 and the body box's bottom at worst
       FLOOR-19. */
    var wantY = ob.under ? FLOOR + 4
                         : (plank ? gapCentre(plank) : (CEIL + FLOOR) / 2);
    ob.yBase = damp(ob.yBase, wantY, 0.002, dt);
    ob.y = ob.under ? FLOOR + 4
                    : clamp(ob.yBase + Math.sin(ob.age * 3.9) * 4, Y_LO, Y_HI);
  }

  /* ---------------------------------------------------------- boxes */

  function rectsFor(ob, out) {
    if (ob.type === 'pillar') {
      /* THE WHITEBOARD'S PILLAR BOXES, VERBATIM. The two files' planks are
         the same shape and must collide the same way, and the exit swaps
         the module under planks that are already in flight - so a box
         that differed by a pixel would be a plank that changed size on the
         frame the board changed colour. */
      var topH = ob.gapY - 9 - CEIL;
      if (topH > 0) out.push([ob.x, CEIL, ob.w, topH]);
      out.push([ob.x - 4, ob.gapY - 9, ob.w + 8, 9]);
      var botY = ob.gapY + ob.gapH;
      out.push([ob.x - 4, botY, ob.w + 8, 9]);
      var botH = FLOOR - (botY + 9);
      if (botH > 0) out.push([ob.x, botY + 9, ob.w, botH]);

    } else if (ob.type === 'boon') {
      /* THE CATCH BOXES, and they are the only boxes in this file that are
         not on a lethal thing. The SNOUT AND THE TAIL TIP ARE OUTSIDE ON
         PURPOSE: a catch on the tip of a 29px tail is a catch the player
         cannot aim, and the teeth are where the drawing says the business
         end is but they are also 34px from the body centre, which would
         make the look window a different width in each facing.

         Two boxes, and BOTH ARE FACING-INDEPENDENT. The lower one is the
         band through the body - 52 wide on a 72px drawing. The upper one
         is 16 wide, centred, and spans exactly the fin's rows: its top is
         ob.y - 27, which is the row the fin tip is on. It is NOT under the
         fin in either pose - the fin is at the front of the drawing and
         this box is over the middle of it - and that is deliberate: a
         catch box that jumped 20px sideways every time the shark turned
         would make the look window generous in one facing and mean in the
         other, and the look is the catch window.

         While it is UNDER, the box is the fin alone and the player has to
         skim the floor at y 217 to 230 to reach it. */
      if (ob.meet && !ob.met) {
        if (ob.under) out.push([ob.x - 8, FLOOR - 14, 16, 14]);
        else {
          out.push([ob.x - 26, ob.y - 9, 52, 20]);
          out.push([ob.x - 8, ob.y - 27, 16, 18]);
        }
      }
    }
    return out;
  }

  /* ========================================================= exports

     SIXTEEN KEYS: everything PlayScene can reach while `warp` is set, and
     nothing else. See the header for the roll call of what is absent and
     which guard makes each one unreachable. */
  return {
    P: P, FX: FX, WARN: WARN,
    CEIL: CEIL, FLOOR: FLOOR, CEIL_KILLS: CEIL_KILLS,
    tiles: T,
    build: build,
    drawBackdrop: drawBackdrop, drawCeiling: drawCeiling, drawFloor: drawFloor,
    drawObstacle: drawObstacle,
    makePillar: makePillar, makeMeet: makeMeet,
    stepBoon: stepBoon, rectsFor: rectsFor
  };
})();
