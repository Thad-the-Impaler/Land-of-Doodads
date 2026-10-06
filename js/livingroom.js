/* ------------------------------------------------------------------
   Land of Doodads - THE LIVING ROOM, the room itself
   Five bays share one house after dark: oak boards underfoot, warm
   plaster overhead, crown moulding, and a line of pendant lamps that
   are the only reason anything in here is lit at all. The Desk, the
   Couch, the Mantle, the Whiteboard and the Fort each paint their own
   wall and their own hazards; the ceiling, the floor, the pigments and
   the lighting pass live here, once, so that all five agree. (The Fort
   has swallowed the room in cardboard and lays its own rugs over the
   boards, but they are these boards - its floor strip cuts the oak with
   paintOak, seed 7 - and its pendants are these pendants, switched off.)

   WHY THIS FILE EXISTS. Five copies of a ceiling drift the first time
   one builder nudges a crown colour, and the ceiling is the one thing
   in this room the player has to learn exactly once - because in here
   it KILLS, the same as the floor. A rule that ends runs cannot be a
   rule that looks slightly different in every bay. Cross-module reuse
   is already house style: the Coop publishes postH, postV and drawNail
   and the title screen reads Coop.CEIL.

   WHICH BAYS WEAR THE ROOM'S BAND. The plaster, the crown, the pendants
   and the register were drawn off the Ceiling reference photographs,
   and the owner is keeping those for a CEILING level of their own. The
   Desk and the Couch keep this band - they are rooms you look across,
   with a ceiling over them, and the owner says it works there. The
   Mantle, the Whiteboard and the Fort bake a band of their own (bakeTop
   in each file: the stone above a television, the top rail of a rolling
   frame, the scalloped edge of a cardboard roof panel with the blue LED
   strip above it) and draw it themselves. What every bay shares,
   whatever the band is made of, is the CONTRACT: 240 wide so it tiles
   on one beat, CEIL = 24 rows deep, row 23 a hard dark edge on the kill
   line, nothing solid below it, and the room's crownShade strip laid
   under it so the rows the player flies through carry the same shade in
   all five.

   WHY THE CEILING IS FOUR HARD ROWS. Everywhere else in the game the
   lid is texture and the player learns it by bumping it. Here bumping
   it is the end of the run, so the band needs a legible EDGE rather
   than a soft one: crown, highlight, shade, outline, and then a fifth
   outline row at 23 sitting directly on the kill line. Four flat rows
   that never change, in a colour nothing else in the room uses, so the
   boundary reads at a glance from any distance and at any speed.

   WHY THE PENDANTS STOP AT y 17. A lamp is the one thing that wants to
   hang DOWN out of the band, and it is the one thing that must not: a
   shade dangling at y 20 looks like something you could fly under, and
   you cannot, because 24 is lethal. So the glass ends at 17, six clear
   pixels inside the moulding, and what reaches into the room is the
   LIGHT - one baked pool of it blitted under each pendant by
   drawCeiling. Nothing solid ever leaves the band.

   WHY THE LIGHT IS ONE FUNCTION. drawLight() is the last call in every
   level's drawBackdrop, and no level paints a vignette or a gloom of
   its own. One wash in one place means the room is one room: a bay
   that shaded its own corners would read as a different house, and a
   bay that forgot to would read as a bug.

   WHY THE LIGHT IS A SHEET AND NOT A STACK OF TINTS. It used to be five
   flat Tint.rects, and a flat rect has an EDGE: on the Whiteboard - the
   one pale wall in the room - they measured as three grey stripes across
   the board, 43 and 45 of luminance in a single row. Every falloff in
   here is now painted row by row into a baked alpha sheet at boot and
   blitted whole, so there is nothing left to have an edge. Same for the
   pendant pools and for every contact shadow a rail, a tray, a seat or a
   skirting throws. See `the light`, below, for the arithmetic.

   Same discipline as every other level file: every pixel in here is
   generated and baked once, and ANY shade laid over something that
   scrolls is a flat Tint or a baked sheet, never a Dither. The Bayer
   grid is anchored in user space, so a dithered rect that moves
   re-phases against the pattern and the pixels boil; a smooth alpha
   field has no pattern to re-phase and may move freely. There is no
   call to Dither.rect anywhere in this file.
------------------------------------------------------------------ */
'use strict';

var LivingRoom = (function () {

  /* The room's pigments. A level keeps its OWN P for its own furniture -
     the Desk's monitors, the Couch's microfibre - and reads these for the
     four surfaces all of them share. By convention a level aliases this
     table as `R`, so `R.oakMid` is visibly the room's and `P.cushion` is
     visibly the level's. */
  var P = {
    /* the oak boards: pale, wide, satin, laid along the run */
    oakLip:     '#d4cfc1',   /* the lit top edge of the very first board  */
    oakLight:   '#c7c5b9',
    oakMid:     '#b4aa91',
    oakWarm:    '#b1a38a',   /* every other plank, a shade warmer         */
    oakGrain:   '#918b7b',
    oakSeam:    '#857965',
    oakKnot:    '#7a7064',
    oakShade:   '#6a5f50',

    /* plaster and the crown moulding overhead */
    plasterLit:   '#c5a46a',
    plasterMid:   '#a89272',
    plasterDim:   '#8d8268',
    plasterShade: '#726257',
    crown:        '#b09f8b',
    crownShade:   '#6e6052',
    vent:         '#716555',
    ventSlot:     '#4a4038',

    /* the pendant lamps, and the one colour their light is */
    lampCore:    '#fffedd',
    lampGlass:   '#fed346',
    lampCrackle: '#c19822',
    lampDark:    '#8a6a14',
    lampRod:     '#1c1812',
    lampGlow:    '#ffe3a0',

    /* night outside, and the two darks everything falls into */
    skyNight:   '#13274b',
    nightShade: '#2a241f',
    void:       '#15110d',
    outline:    '#1a1410'
  };

  /* The playfield, for all five bays. 24 and 242 are the Coop's numbers
     and the room keeps them: a player who has come through the Backyard
     has five levels of muscle memory for where the lid and the ground
     are, and this room changes what the lid DOES, which is quite enough
     to change at once. */
  var CEIL = 24;
  var FLOOR = 242;

  /* The room's one rule, as data. PlayScene binds this off the art in
     enter() and reads a plain boolean - the five Backyard levels publish
     nothing, !!undefined is false, and their rafters go on bouncing.
     Every Living Room module exports LivingRoom.CEIL_KILLS, not a literal,
     so the room cannot end up with four bays that kill and one that does
     not. */
  var CEIL_KILLS = true;

  /* the shortest plank stub allowed at either end, the Coop's number */
  var END_MIN = 34;

  /* The heads-up every bay shows on the very first flap. It is the same
     two lines in every bay roofed by this ceiling because it is the same
     ceiling in each of them, and
     because a player who learns it in the Desk and then reads something
     different in the Couch has been told the rule twice and believed it
     once. PlayScene shows this without the 'warn' tone: the doodad has
     just left the ground and the attention is already on the screen. */
  /* The default lid warning. A bay whose lid is NOT the room's ceiling says
     what its own is instead - the Mantle is roofed by a television and the
     Whiteboard by the frame it hangs on, and telling either player about a
     ceiling they cannot see is worse than telling them nothing. The Fort
     is roofed by a cardboard panel, and says so. */
  var WARN_CEIL = ['▲ LOW CEILING ▲', 'THIS ONE ENDS THE RUN'];

  /* The two neutral colours the air in this room is made of. Every level's
     FX.motes / FX.motesHi are these, so the dust drifting through the Desk
     and the dust drifting through the Mantle are the same dust. */
  var AIR = { motes: '#f4e2b4', motesHi: '#fff3d2' };

  var T = {};             /* the room's own baked tiles: oak, and a ceiling */

  /* ------------------------------------------------------- utilities

     The Backyard's helpers, published rather than copied, for the same
     reason the ceiling is: four builders working in parallel from four
     copies of a positive modulo is four chances to write `%` and have
     half the phases flip sign as the world scrolls left. */

  /* a positive modulo */
  function wrap(v, m) { return ((v % m) + m) % m; }

  /* the Deck's integer hash: anything that must shimmer without boiling
     comes off this rather than off Math.random, so a paused frame drawn
     twice looks the same both times */
  function hash(n) {
    n = (n ^ 61) ^ (n >>> 16);
    n = n + (n << 3);
    n = n ^ (n >>> 4);
    n = Math.imul(n, 0x27d4eb2d);
    n = n ^ (n >>> 15);
    return n >>> 0;
  }

  /* The Coop's egg plotter: a little shape table of [offset, width] rows,
     filled row by row. Anything under about a dozen pixels across is
     drawn this way rather than with shapes, because at that size the
     shape IS the pixels. */
  function rowsFill(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0], y + i, rows[i][1], 1);
  }

  /* the same shape fattened by a pixel all round, for the outline under it */
  function rowsOutline(c, rows, x, y, colour) {
    c.fillStyle = colour;
    for (var i = 0; i < rows.length; i++) c.fillRect(x + rows[i][0] - 1, y + i, rows[i][1] + 2, 1);
    c.fillRect(x + rows[0][0], y - 1, rows[0][1], 1);
    var last = rows[rows.length - 1];
    c.fillRect(x + last[0], y + rows.length, last[1], 1);
  }

  /* Tile a texture into a column of any height, BOTTOM first. A pillar is
     whatever height the gap left over, so the slice that gets cut short
     has to be the one at the far end from the cap - cut the bottom and
     every plank in the room shifts by a different amount. */
  function drawColumn(ctx, tile, x, y, w, h) {
    var th = tile.height, drawn = 0;
    while (drawn < h) {
      var slice = Math.min(th, h - drawn);
      ctx.drawImage(tile, 0, th - slice, w, slice, x, y + drawn, w, slice);
      drawn += slice;
    }
  }

  /* The Construction's radial halo, clipped at CEIL. A power-up glows, and
     a glow that spills over the moulding paints light on the far side of
     a wall. */
  function glow(ctx, x, y, r, core, mid, edge) {
    var g = ctx.createRadialGradient(x, y, 1, x, y, r);
    g.addColorStop(0, core);
    g.addColorStop(0.55, mid);
    g.addColorStop(1, edge);
    ctx.fillStyle = g;
    var top = Math.max(CEIL, y - r);
    ctx.fillRect(x - r, top, r * 2, y + r - top);
  }

  /* A falling thing is cropped to y >= CEIL as it is drawn, so it comes
     DOWN THROUGH the moulding rather than appearing on top of it. */
  function blitBelowCeil(ctx, tile, x, y) {
    var cut = CEIL - y;
    if (cut <= 0) { ctx.drawImage(tile, x, y); return; }
    if (cut >= tile.height) return;
    ctx.drawImage(tile, 0, cut, tile.width, tile.height - cut,
                  x, y + cut, tile.width, tile.height - cut);
  }

  /* The 1px halo round a shape, built by smearing it one pixel each way
     and keeping only what the smear added, then laid UNDERNEATH the shape.
     Fattening a shape row by row paints shut any notch it has - which a
     coaster has, and a controller has two of. */
  function ringOf(mask, w, h) {
    var ring = makeCanvas(w, h), c = ring.ctx;
    [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(function (d) {
      c.drawImage(mask.canvas, d[0], d[1]);
    });
    c.globalCompositeOperation = 'source-in';
    c.fillStyle = P.outline;
    c.fillRect(0, 0, w, h);
    c.globalCompositeOperation = 'source-over';
    return ring;
  }

  /* ----------------------------------------------------------- the oak

     One floor for the whole room, painted into whatever region it is
     handed: the 192x28 tile the floor itself is, and also the little
     patches of board a level wants inside a baked prop - the Couch's
     coffee table legs stand on it, the Desk's drawers sit on it.

     `seed` is the grain. Two regions painted with the same seed are the
     same board, which is what makes a level's own baked oak line up with
     the floor tile scrolling under it. */
  function paintOak(ctx, x, y, w, h, seed) {
    var r = mulberry32(seed === undefined ? 7 : seed);
    var row, i, k;

    /* the lit lip, and the first board's highlight under it */
    ctx.fillStyle = P.oakLip;   ctx.fillRect(x, y, w, 1);
    ctx.fillStyle = P.oakLight; ctx.fillRect(x, y + 1, w, 1);

    /* Planks, 9 rows of face each, separated by a 1px shadow seam and a
       1px highlight: a satin board catches the light on the edge NEAREST
       you, so the bright line goes below the dark one and not above it.
       Alternating oakMid and oakWarm is what keeps a wide floor from
       reading as one flat field. */
    var plank = 0;
    row = 2;
    while (row < h) {
      var face = Math.min(9, h - row);
      ctx.fillStyle = (plank % 2) ? P.oakWarm : P.oakMid;
      ctx.fillRect(x, y + row, w, face);

      /* Grain: short horizontal runs, 4 to 14px, with ONE 1px step
         allowed somewhere along a run. A run that steps twice reads as a
         scratch; a run that never steps reads as a ruled line. */
      var runs = Math.round(w / 9);
      for (i = 0; i < runs; i++) {
        var gx = Math.floor(r() * w);
        var gy = row + Math.floor(r() * face);
        var len = 4 + Math.floor(r() * 11);
        var step = Math.floor(r() * len);
        var dy = r() < 0.5 ? 0 : (r() < 0.5 ? -1 : 1);
        ctx.fillStyle = r() < 0.55 ? P.oakGrain : P.oakLight;
        for (k = 0; k < len; k++) {
          var px = x + ((gx + k) % w);
          var py = y + gy + (k >= step ? dy : 0);
          if (py >= y + row && py < y + row + face) ctx.fillRect(px, py, 1, 1);
        }
      }

      /* End joints, staggered. Two joints in line across a floor is the
         one thing that says "this was tiled" out loud, so each plank's
         joints are offset by a different fraction of the run. */
      var joint = Math.floor(r() * w);
      var gap = 46 + Math.floor(r() * 28);
      for (i = joint; i < joint + w; i += gap) {
        ctx.fillStyle = P.oakSeam;
        ctx.fillRect(x + (i % w), y + row, 1, face);
      }

      if (row + face < h) {
        ctx.fillStyle = P.oakSeam;  ctx.fillRect(x, y + row + face, w, 1);
        if (row + face + 1 < h) {
          ctx.fillStyle = P.oakLight; ctx.fillRect(x, y + row + face + 1, w, 1);
        }
      }
      row += face + 2;
      plank++;
    }

    /* one knot per 192px of board, with the grain swirling round it */
    var knots = Math.max(1, Math.round(w / 192));
    for (i = 0; i < knots; i++) {
      var kx = Math.floor(r() * Math.max(1, w - 7));
      var ky = 4 + Math.floor(r() * Math.max(1, h - 12));
      ctx.fillStyle = P.oakGrain;
      ctx.fillRect(x + kx - 1, y + ky - 1, 7, 5);
      ctx.fillStyle = P.oakKnot;
      ctx.fillRect(x + kx, y + ky, 5, 3);
    }

    /* The far end of the boards falls away from the lamps. Two flat steps
       rather than a ramp: the floor scrolls, so the shading has to be
       something that moves with it, and a 20-band gradient down 6 rows is
       6 rows of nearly-identical tints bought at 20 times the cost. */
    if (h > 22) Tint.rect(ctx, x, y + 22, w, h - 22, P.oakShade, 4);
    if (h > 25) Tint.rect(ctx, x, y + 25, w, h - 25, P.oakShade, 7);
  }

  /* -------------------------------------------------------- the ceiling

     bakeCeiling returns a fresh 240x24 tile every time it is called, so a
     level that wants its own top rail gets its own tile rather than
     scribbling on everybody else's. The default one - built here, used by
     any bay that passes nothing - is plaster, moulding, a pendant and an
     air register.

     240 is deliberately twice the pendant spacing nothing else in the room
     uses: one lamp per tile at x 120 puts a lamp every 240px of world, far
     enough apart that the three pools drawCeiling paints under them never
     meet and the room is genuinely brighter in some places than others. */

  /* the crackle-glass shade, 7px across at its widest, as [offset, width] */
  var SHADE = [[2, 3], [1, 5], [0, 7], [0, 7], [0, 7], [1, 5], [1, 5], [2, 3]];

  var CEIL_W = 240;        /* one pendant per tile, and the tile's width  */
  var LAMP_X = 120;        /* where in the tile that pendant hangs        */
  var SHADE_X = LAMP_X - 3;
  var SHADE_Y = 10;        /* ... so the last glass row lands on 17       */

  function bakeCeiling(railPainter) {
    var t = makeCanvas(CEIL_W, CEIL), c = t.ctx;
    var r = mulberry32(5150);
    var i, x, y;

    /* 1. the plaster, rows 0..18 */
    c.fillStyle = P.plasterMid;
    c.fillRect(0, 0, CEIL_W, 19);
    /* Tooth. Plaster that is one flat colour is the one thing plaster must
       not look like, and a 1-in-40 speckle is enough: any denser and it
       reads as noise rather than as a trowelled surface. */
    for (y = 0; y < 19; y++) {
      for (x = 0; x < CEIL_W; x++) {
        if (r() > 0.025) continue;
        c.fillStyle = r() < 0.5 ? P.plasterDim : P.plasterLit;
        c.fillRect(x, y, 1, 1);
      }
    }
    /* darker where the lamps do not reach - the ends of the tile, which
       are the midpoints between two pendants once it is laid end to end */
    Tint.rect(c, 0, 0, 56, 19, P.plasterDim, 6);
    Tint.rect(c, CEIL_W - 56, 0, 56, 19, P.plasterDim, 6);
    /* and the pool of light directly above the lamp, in two flat steps:
       72px of lift, then another 36 in the middle of it */
    Tint.rect(c, LAMP_X - 36, 0, 72, 19, P.plasterLit, 4);
    Tint.rect(c, LAMP_X - 18, 0, 36, 19, P.plasterLit, 5);

    /* 2. an air register, off to one side so it is not symmetrical with
       anything. 12x6, three louvres, flush with the plaster. */
    c.fillStyle = P.vent;     c.fillRect(30, 6, 12, 6);
    c.fillStyle = P.ventSlot;
    c.fillRect(31, 7, 10, 1); c.fillRect(31, 9, 10, 1); c.fillRect(31, 11, 10, 1);

    /* 3. the pendant. Its rod and canopy go on BEFORE the glass, so the
       shade's outline cuts the stem off where the two meet. */
    c.fillStyle = P.lampRod;
    c.fillRect(LAMP_X - 2, 1, 5, 2);          /* the ceiling canopy       */
    c.fillRect(LAMP_X, 3, 1, 7);              /* the drop, y 3..9         */

    /* The 1px ring, sides and top ONLY. The bottom row of the glass is the
       bottom of the lamp: a ring under it would put a pixel on row 18, one
       row nearer the kill line than anything solid in this room is allowed
       to reach. */
    c.fillStyle = P.outline;
    c.fillRect(SHADE_X + SHADE[0][0], SHADE_Y - 1, SHADE[0][1], 1);
    for (i = 0; i < SHADE.length; i++) {
      c.fillRect(SHADE_X + SHADE[i][0] - 1, SHADE_Y + i, 1, 1);
      c.fillRect(SHADE_X + SHADE[i][0] + SHADE[i][1], SHADE_Y + i, 1, 1);
    }
    rowsFill(c, SHADE, SHADE_X, SHADE_Y, P.lampGlass);
    /* four crackle flecks, seeded so the lamp looks the same every frame */
    for (i = 0; i < 4; i++) {
      var ri = 1 + Math.floor(r() * (SHADE.length - 2));
      c.fillStyle = P.lampCrackle;
      c.fillRect(SHADE_X + SHADE[ri][0] + Math.floor(r() * SHADE[ri][1]), SHADE_Y + ri, 1, 1);
    }
    /* the filament's worth of white in the middle of the glass */
    c.fillStyle = P.lampCore;
    c.fillRect(LAMP_X - 1, SHADE_Y + 2, 2, 3);
    /* and the shadow in the bowl of the shade */
    c.fillStyle = P.lampDark;
    c.fillRect(SHADE_X + SHADE[SHADE.length - 1][0], SHADE_Y + SHADE.length - 1,
               SHADE[SHADE.length - 1][1], 1);

    /* 4. the moulding: four hard rows and then the outline sitting on the
       kill line. These never change and nothing is ever drawn over them -
       they are the boundary, and the boundary is the level's one promise. */
    c.fillStyle = P.crown;      c.fillRect(0, 19, CEIL_W, 1);
    c.fillStyle = P.plasterLit; c.fillRect(0, 20, CEIL_W, 1);
    c.fillStyle = P.crownShade; c.fillRect(0, 21, CEIL_W, 1);
    c.fillStyle = P.outline;    c.fillRect(0, 22, CEIL_W, 1);
    c.fillRect(0, 23, CEIL_W, 1);

    /* The one thing a bay may change up here, and only the bottom four
       rows of it. Nothing passes one today - the Whiteboard used to hand
       in its rail this way, and now bakes its whole band itself - but
       the hook stays, because a bay that wants the room's plaster with
       its own trim along the bottom is a reasonable bay to be. */
    if (typeof railPainter === 'function') railPainter(c, 0, 20, CEIL_W, 4);
    return t;
  }

  /* The ceiling, laid across the screen, plus the light it throws down.

     `tile` lets a bay hand over its own baked band; leaving it out uses
     the room's. The pool under each pendant MOVES - it rides the same
     scroll as the tile, because a pool of lamplight that stayed put while
     its lamp slid past would read as a stain on the screen - and it is
     one baked sprite rather than three nested rects, which is what lets
     it move without carrying three hard edges along with it. It was three
     rects, and their rims measured as a 10-step on the Desk's wall and a
     13-step on the Mantle's glass; worse, they moved with the scroll, so
     a column that looked clean in one frame had a stair in it the next.
     An alpha sprite may travel; a dither may not. */
  function drawCeiling(ctx, scroll, tile) {
    var t = tile || T.ceiling;
    tileX(ctx, t.canvas, scroll, 0);

    /* Every pendant currently on screen, plus one either side. The pool is
       still ANCHORED on row 18 - the bottom row of the glass, so the light
       pours out of the lamp rather than out of thin air - but it is CROPPED
       to the kill line, because rows 19..23 are not the room: they are the
       moulding and the outline sitting on 24, and bakeCeiling promises in
       as many words that nothing is ever drawn over them. Something was,
       and it measured: on the Desk, row 23 ran 21.3 between the lamps and 64.4
       directly under one, so the one invariant the level has - here is
       where the ceiling starts, and it ends your run - was three times
       brighter under every pendant, which is exactly where a player flies.
       blitBelowCeil is the crop every falling thing in this room already
       uses, and it keeps the pool's rows where they were: source row 6
       still lands on 24, so nothing inside CEIL..FLOOR changes by a single
       alpha step and only the boundary gets its black back. */
    var first = LAMP_X - wrap(scroll, CEIL_W);
    for (var x = first - CEIL_W; x < VW + CEIL_W; x += CEIL_W) {
      blitBelowCeil(ctx, T.pool.canvas, Math.round(x) - POOL_W / 2, 18);
    }

    /* the shadow the moulding throws into the room, under everything the
       lamps just lit. A strip, not a rect: see bakeShade. */
    ctx.drawImage(T.crownShade.canvas, 0, CEIL);
  }

  /* --------------------------------------------------------- the floor

     The Desk calls this as its own drawFloor: its bay is bare board right
     up to the wall. The other three draw their own band - a rug, a hearth
     slab, a marker tray - and call paintOak for whatever boards show past
     it. */
  function drawFloor(ctx, scroll) {
    /* the dark the boards throw up the wall where they meet it - a strip
       rather than the flat 10-row Tint it was, for the same reason as
       everything else in the pass */
    ctx.drawImage(T.skirtShade.canvas, 0, FLOOR - 12);
    tileX(ctx, T.oak.canvas, scroll, FLOOR);
  }

  /* --------------------------------------------------------- the light

     ONE BAKED SHEET, blitted. The five washes used to be five flat Tints
     with hard edges, and on the Whiteboard they measured as three grey
     stripes: 43 and 45 of luminance in a single row at FLOOR-80 and
     FLOOR-40. A lamp's falloff has no edge, so the light is painted ONCE,
     row by row, into a 480x270 alpha sheet at boot, and drawLight is a
     single drawImage. Every ramp is a smoothstep - zero slope at both
     ends - because the eye finds the START of a linear ramp nearly as
     readily as it finds a step. Over a flat grey field the pass now moves
     no row by more than 2.7 and no column by more than 1.9; it was 27 and
     31. On the four real walls, anywhere the bay's own art is flat, the
     worst single row the pass moves is 3.5 on the Desk, 4.3 on the Couch,
     3.8 on the Mantle and 4.3 on the Whiteboard, against 26, 51, 19 and
     47 before - and not one row anywhere over 8.

     It is a sheet and not a Dither because the layers under it scroll:
     a Bayer grid anchored in user space re-phases against a moving
     backdrop and boils, while a smooth alpha field has no pattern to
     re-phase. It is the same mechanism as the Whiteboard's glare and the
     glow() every power-up wears. */

  /* zero slope at 0 and at 1 */
  function ease(k) { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); }

  /* a hex pigment at an alpha, for the per-row fills below */
  function rgba(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a.toFixed(4) + ')';
  }

  /* the four falloffs: lamp warmth down from the moulding, night up off
     the boards, the deeper pool at the skirting, and the two side columns.
     The peaks are the old Tint strengths (2, 4, 5 and 4 sixteenths) so
     the room is exactly as bright and exactly as dark as it was; only the
     edges are gone. */
  var WARM_ROWS = 64,   WARM_A  = 0.125;
  var NIGHT_FROM = 112, NIGHT_RUN = 88, NIGHT_A = 0.25;   /* full by FLOOR-24 */
  var VOID_FROM = 56,   VOID_A  = 0.3125;                 /* full at FLOOR    */
  var SIDE_W = 64,      SIDE_A  = 0.25;

  function bakeLight() {
    var t = makeCanvas(VW, VH), c = t.ctx;
    var y, x, k;
    for (y = CEIL; y < CEIL + WARM_ROWS; y++) {
      k = 1 - ease((y - CEIL) / WARM_ROWS);
      c.fillStyle = rgba(P.lampGlow, WARM_A * k);
      c.fillRect(0, y, VW, 1);
    }
    for (y = FLOOR - NIGHT_FROM; y < FLOOR; y++) {
      k = ease((y - (FLOOR - NIGHT_FROM)) / NIGHT_RUN);
      c.fillStyle = rgba(P.nightShade, NIGHT_A * k);
      c.fillRect(0, y, VW, 1);
    }
    for (y = FLOOR - VOID_FROM; y < FLOOR; y++) {
      k = ease((y - (FLOOR - VOID_FROM)) / VOID_FROM);
      c.fillStyle = rgba(P.void, VOID_A * k);
      c.fillRect(0, y, VW, 1);
    }
    for (x = 0; x < SIDE_W; x++) {
      k = 1 - ease(x / SIDE_W);
      c.fillStyle = rgba(P.void, SIDE_A * k);
      c.fillRect(x, CEIL, 1, FLOOR - CEIL);
      c.fillRect(VW - 1 - x, CEIL, 1, FLOOR - CEIL);
    }
    return t;
  }

  /* A contact shadow as a strip: `peak` alpha on the row it is thrown
     from, nothing on the far row, linear between. `fromBottom` puts the
     dark row at the bottom, for the shadow a skirting throws UP a wall.
     Published, because every bay's rail, tray, seat and shelf shadow is
     one of these: a flat Tint of 5/16 over ten rows is a cliff of 30 on
     a white board, and a strip of the same depth is 3 a row. */
  function bakeShade(colour, peak, rows, fromBottom) {
    var t = makeCanvas(VW, rows), c = t.ctx;
    for (var i = 0; i < rows; i++) {
      var k = 1 - (i + 0.5) / rows;
      c.fillStyle = rgba(colour, peak * k);
      c.fillRect(0, fromBottom ? rows - 1 - i : i, VW, 1);
    }
    return t;
  }

  /* The pool under one pendant: a half-ellipse of lampGlow, 96 wide and
     36 deep, brightest at the glass and gone at the rim. It replaces the
     three nested rects, whose edges were a 10-step on the Desk's wall and
     a 13-step on the Mantle's glass. It moves with its lamp as ONE
     piece, which an alpha sprite may do and a dither may not. */
  var POOL_W = 96, POOL_H = 36, POOL_A = 0.22;

  function bakePool() {
    var t = makeCanvas(POOL_W, POOL_H), c = t.ctx;
    for (var y = 0; y < POOL_H; y++) {
      for (var x = 0; x < POOL_W; x++) {
        var dx = (x + 0.5 - POOL_W / 2) / (POOL_W / 2), dy = (y + 0.5) / POOL_H;
        var d = Math.sqrt(dx * dx + dy * dy);
        if (d >= 1) continue;
        c.fillStyle = rgba(P.lampGlow, POOL_A * (1 - ease(d)));
        c.fillRect(x, y, 1, 1);
      }
    }
    return t;
  }

  /* the LAST call in every bay's drawBackdrop, and now one blit */
  function drawLight(ctx) { ctx.drawImage(T.light.canvas, 0, 0); }

  /* A calm version of the room for the menus to sit on: bare plaster, the
     dado line, the ceiling and the floor, and none of the furniture that
     would fight the ui. All five bays export this as their own
     drawMenuBackdrop. The porch (js/scene_porch.js) is the first caller:
     its 480-wide Living Room bay resolves room.levels[0] to THE DESK
     (levels.js:541), and the Desk's drawMenuBackdrop is a bare delegate
     to this one (desk.js:1697). The porch bakes the result into a tile
     once per session at a frozen scroll, so this runs once rather than
     sixty times a second. The game's own menus - scores, achievements,
     level select, character select - are still the Coop's. */
  function drawMenuBackdrop(ctx, scroll) {
    ctx.fillStyle = P.plasterDim;
    ctx.fillRect(0, 0, VW, VH);
    ctx.fillStyle = P.plasterShade;
    ctx.fillRect(0, 160, VW, 1);
    /* The gloom in the lower half, as a strip. It was
       Tint.rect(ctx, 0, VH - 120, VW, 120, P.void, 4) - 4/16 of void with a
       hard top edge on row 150, which is the same shape, in the same
       pigment, as the FLOOR-80 and FLOOR-40 rects that measured 37 and 39
       of luminance in one row and started this whole rebuild. The hard
       version survived the rebuild only as long as nothing called this
       function; the header of this file promises there is nothing left
       in here to have an edge, and this backdrop is not an exception -
       the porch bakes it behind a full-width Living Room bay on the
       second title screen, so the soft ramp is load-bearing rather than
       hypothetical.
       Nothing at the top, and the old 4/16 exactly where the wash meets
       the boards - the strip is 92 rows, from 150 down to FLOOR, for the
       same reason bakeLight's void ramp is full at FLOOR: the deepest the
       room ever gets is the row the skirting stands on. 0.0027 of alpha
       between one row and the next, which is 0.3 of luminance on the
       plaster where the edge at 150 measured 29. */
    ctx.drawImage(T.menuShade.canvas, 0, VH - 120);
    drawCeiling(ctx, scroll * 0.6);
    drawFloor(ctx, scroll * 0.6);
  }

  /* Bake the room. Every bay's build() calls this FIRST, and the guard is
     what makes that safe: five levels in one room means five calls at boot
     and the oak only needs cutting once. */
  function build() {
    if (T.oak) return;
    T.oak = makeCanvas(192, VH - FLOOR);
    paintOak(T.oak.ctx, 0, 0, T.oak.w, T.oak.h, 7);
    T.ceiling = bakeCeiling(null);
    /* the whole lighting pass, baked: the sheet, one pendant's pool, and
       the two contact shadows the room itself throws */
    T.light = bakeLight();
    T.pool = bakePool();
    T.crownShade = bakeShade(P.crownShade, 0.31, 10, false);
    T.skirtShade = bakeShade(P.nightShade, 0.25, 12, true);
    /* the menu backdrop's gloom, baked here with the other two rather than
       in drawMenuBackdrop, because a strip built per frame is a 480x120
       canvas allocated sixty times a second for a wash that never changes */
    T.menuShade = bakeShade(P.void, 0.25, FLOOR - (VH - 120), true);
  }

  return {
    P: P, CEIL: CEIL, FLOOR: FLOOR, CEIL_KILLS: CEIL_KILLS, END_MIN: END_MIN,
    WARN_CEIL: WARN_CEIL, AIR: AIR,
    /* the room's own two tiles, for anything that wants to read them back */
    tiles: T,
    build: build, bakeCeiling: bakeCeiling,
    drawCeiling: drawCeiling, paintOak: paintOak, drawFloor: drawFloor,
    drawLight: drawLight, drawMenuBackdrop: drawMenuBackdrop,
    /* Published for the same reason wrap and hash are: a bay's rail, tray,
       seat or shelf shadow is a contact shadow exactly like the room's
       crown and skirting, and four builders each writing their own
       per-row ramp is four chances to put an edge back. ease and rgba go
       with it, because anything baking a sheet of its own - the Mantle's
       lamp wash does - wants the same smoothstep and not a second one. */
    bakeShade: bakeShade, ease: ease, rgba: rgba,
    wrap: wrap, hash: hash, rowsFill: rowsFill, rowsOutline: rowsOutline,
    drawColumn: drawColumn, glow: glow, blitBelowCeil: blitBelowCeil,
    ringOf: ringOf
  };
})();
