/* ------------------------------------------------------------------
   Land of Doodads - the porch, the second title screen
   It replaces the coop title once ten priced doodads are open (the
   dispatcher at the foot of js/scene_title.js does the choosing).

   The idea in one line: the porch is NAILED DOWN and the Land slides
   past behind it. Everyone the player has earned stands on the porch at
   full size - walkers on the boards, sitters on two shelf rows, flyers
   in the four corners the hanging sign leaves free - and the menu is
   three signs nailed to the porch's riser, under every pair of feet.
   Behind the posts the rooms of the Land go by as bays: each one is a
   FROZEN BAKED PAINTING of that level's own menu backdrop, full height,
   behind its own dark timber doorframe. Every layer of a bay moves at
   exactly 1.0, because it is one canvas; a wall tiled at 0.3 inside a
   frame moving at 1.0 would move at 1.3, faster than the hole you are
   looking through.

   Nothing per frame walks the roster. The staged cast is at most 23
   (8 walking, 11 seated, 4 flying) and update, draw, the director, the
   seat search and the shadows all run over that. Exactly two places
   walk the whole roster, and neither is per frame: enter() stages the
   cast (one pass per role, and past the quota each visit shows the next
   page of that role), and refresh() walks it once when the master
   passkey opens doodads while this screen is already up.

   Of the roster this file reads title.role and title.r and nothing
   else: homeX/homeY/spanX/spanY belong to the coop title alone, and
   nobody on the porch picks coordinates against furniture.
------------------------------------------------------------------ */
'use strict';

var PorchScene = (function () {

  /* ----------------------------------------------------- constants */

  var SCROLL = 15;                 /* px per second the Land slides by */
  var PORCH = 206;                 /* the porch floor: the walkers' ground */
  var HEADER = 52;                 /* the hanging sign's lowest row, shadow and all */
  var HEAD = HEADER + 2;           /* 54: no head may rise above this - see leapToSeat */
  var JAMB = 14, DOOR = 36;        /* a bay's doorframe; the loop seam gets the wide one */

  /* HOW MANY OF EACH ROLE FIT, and therefore the whole cost of this
     screen. They are tunables at the top of the file on purpose: the one
     cost that grows with the quota is Doodads.draw on the smooth layer
     (one drawImage of a 315-384px png each), so a parent watching frame
     time on a phone with the passkey on has three numbers to turn. */
  var WALK_MAX = 8, PERCH_MAX = 11, FLY_MAX = 4;

  var MENU = ['PLAY', 'HIGH SCORES', 'ACHIEVEMENTS'];

  /* which row the NEW tab hangs on, asked of the menu rather than typed
     as a 2, so the tab cannot land on the wrong board after a reorder */
  var ACHV_ROW = MENU.indexOf('ACHIEVEMENTS');

  /* THE MENU IS A ROW, NOT A COLUMN, and each board is sized to its own
     word rather than all three to the longest. PLAY at scale 3 on the
     narrowest board is the hierarchy the coop title had: the biggest
     word on the board the eye lands on first.

     UI.button centres its label at x + w/2 - 1 and puts the lit board's
     nails at x + 4 and x + w - 6, so the air columns below are what keep
     every glyph clear of a nail by at least 9px. Gaps of 8, margins of
     12, right edge 468, shadows out to 470 and down to row 254. */
  var MENU_Y = 220, MENU_BH = 32;
  var BOARDS = [
    { x: 12,  w: 100, scale: 3 },    /* PLAY         69px, 10 / 11 air to nails */
    { x: 120, w: 166, scale: 2 },    /* HIGH SCORES 130px, 12 / 14              */
    { x: 294, w: 174, scale: 2 }     /* ACHIEVEMENTS 142px, 10 / 12             */
  ];

  /* THE FOUR CORNERS THE SIGN LEAVES FREE, in stage order. Checked
     against the widest and tallest flyer in the game: Pepper reaches
     26.5 left, 18 right, 22.5 above and 18 below her centre at r 18,
     Billy 20.5 / 20.5 / 19 / 19.4 at r 19. So slot 1's sprite spans
     x 5.5..86 and rows 34.5..85 - under the sound toggle's shadow at 33,
     left of the sign at 96 - and slot 2 mirrors it clear of the sign's
     shadow at 385 and the HI panel at 17. Slots 3 and 4 stop at row
     131.4, and the nearest LOW heads are at 134.7 and 136.7.

     All of that is about a flyer AT HOME. A swoop leaves the slot, and
     the sign is cleared there by the position clamp in updateFlyer, not
     by these numbers. */
  var FLY_SLOTS = [
    { x: 50,  y: 62,  spanX: 18, spanY: 5 },
    { x: 434, y: 62,  spanX: 18, spanY: 5 },
    { x: 50,  y: 108, spanX: 18, spanY: 4 },
    { x: 434, y: 108, spanX: 18, spanY: 4 }
  ];

  /* TWO SHELF ROWS, FIXED AND HAND-JITTERED. A porch has shelves, not
     ropes and rafters, and because the porch never moves these are seven
     planks at seven typed positions rather than a spawner.

     The row field is 0 for the HIGH shelf and 1 for the LOW one, which is the
     only thing the seat search and the walker test need to know about
     them. A sitter's pivot is plank.y - r * foot, so the tallest sitters
     (Cookie 45.3 and Teef 45.2 above the plank) rest with their heads at
     70.7..76.7 on the HIGH row and 134.7..138.7 on the LOW one: under
     the sign's 52 and clear of the HIGH planks' shadow strips by 2.7 at
     rest, 1.5 at the top of the +/-1.2 bob - Q3's 135.7 against P3's
     strip (rows 129..132) is the tightest pair on the screen.

     At +/-22.5 the HIGH bodies occupy 105.5..376.5 in blocks with
     11/12/12/11 gaps, none of it under a flyer box (x <= 88.5 and
     x >= 389.5). The LOW row is wider and tighter: 77.5..403.5 with
     gaps 11/12/14/11/8, and its outer two blocks (77.5..122.5 at seat
     100, 358.5..403.5 at seat 381) DO reach into both flyer boxes in x.
     What keeps them apart is vertical, not horizontal - flyer slots 3
     and 4 bottom out at row 131.4 and the nearest LOW head is 133.5 at
     the top of its 1.2 bob - so lowering a flyer slot or raising the LOW
     shelf is checked against that 2.1px, not against the x spans.
     +/-22.5 is only a round figure, and not a symmetric one: the widest
     sitter is Cookie at 25.9 left and 19.0 right (r 19), the longest
     reach right is Inari's 21.1 (r 20), so the tightest real pair - the
     LOW row's 328 to 381 - still leaves 6px of air. No two seats share
     an x and every LOW seat is 26 to 28px off the nearest HIGH one, so
     a hop always reads as going somewhere. */
  var PLANKS = [
    { x: 100, w: 112, y: 120, row: 0, seats: [128, 184] },   /* P1 */
    { x: 218, w: 46,  y: 116, row: 0, seats: [241] },        /* P2 */
    { x: 270, w: 112, y: 122, row: 0, seats: [298, 354] },   /* P3 */
    { x: 72,  w: 112, y: 180, row: 1, seats: [100, 156] },   /* Q1 */
    { x: 190, w: 46,  y: 184, row: 1, seats: [213] },        /* Q2 */
    { x: 244, w: 112, y: 181, row: 1, seats: [272, 328] },   /* Q3 */
    { x: 358, w: 46,  y: 182, row: 1, seats: [381] }         /* Q4 */
  ];

  /* ELEVEN SEATS, flattened out of the plank table in the order the
     seating pass wants them: the HIGH row left to right, then the LOW
     row left to right. PERCH_MAX is this length, stated from the table
     rather than derived from an average gap. */
  var SEATS = [];
  for (var pi = 0; pi < PLANKS.length; pi++) {
    for (var si = 0; si < PLANKS[pi].seats.length; si++) {
      SEATS.push({ x: PLANKS[pi].seats[si], plank: PLANKS[pi] });
    }
  }

  /* THE WALKER GRID, AND WHICH OF IT GETS USED.

     Eight slots at 32 + 56k. Saddam is 50.7 wide with 23.8 of it left of
     his centre, so at 32 he starts at 8.2; Gerald reaches 26.7 right, so
     at 424 he ends at 450.7. Every walker wanders by WALK_SPAN, and at
     pitch 56 the worst pair (Saddam 50.7 beside Gerald 49.9) still stays
     1.3px clear with independent phases - which is why the row does not
     share a sway phase: a row swaying as one reads as a mechanism.

     n walkers take slot floor((k + 0.5) * WALK_SLOTS.length / n), and
     that divisor is the GRID's own length - the 8 in this table - not
     WALK_MAX. The cast cap says how many walkers come out; it has no
     business saying where they stand, and dividing by it would pack the
     row left whenever the cap was turned down and index off the end of
     the table whenever it was turned up. It is strictly increasing for
     n <= 8 and spreads the row instead of packing it left: four walkers
     stand at 88 / 200 / 312 / 424 with a slot of air between each pair,
     three at 88 / 256 / 368, one at 256. No clamp on n is needed:
     freeWalkSlot returns null once the table is full, so a ninth walker
     never reaches the stage, and floor((k + 0.5) * L / n) stays below L
     for every k < n, so the index cannot run off the end. */
  var WALK_SLOTS = [32, 88, 144, 200, 256, 312, 368, 424];
  var WALK_SPAN = 2;
  function walkSlot(k, n) { return WALK_SLOTS[Math.floor((k + 0.5) * WALK_SLOTS.length / n)]; }

  /* who stands in front of whom. Walkers are on the porch and sitters
     are on shelves behind it, so a walker covering up to 26px of a LOW
     sitter when the two line up is depth-correct rather than a mistake -
     and the seat search below still prefers a seat nobody is standing in
     front of. Flyers are drawn last, so a swoop past a head reads right. */
  var DEPTH = { perch: 0, walk: 1, patrol: 2 };

  /* THE BAYS: ids, resolved at enter(), never bound at script load.

     Order is coop -> deck -> canopy -> garden -> construction -> living
     room, which is not level order: it is one hard luminance cut (the
     bright Construction Zone giving way to the plaster of the house)
     instead of four. k picks which columns of the module's 480-wide
     room show; phase is the frozen scroll value handed to its
     drawMenuBackdrop. Both are knobs for the owner to retune in a
     browser - the values here are seeds, not findings.

     The door flag marks the loop seam, where the Living Room gives way to
     the Coop again: a wide frame with 8px of void down the middle, the
     one place on the porch that says you have left the house. */
  var BAYS = [
    { room: 'backyard',   level: 'coop',         w: 240, k: 0,   phase: 0, door: true },
    { room: 'backyard',   level: 'deck',         w: 240, k: 96,  phase: 0 },
    { room: 'backyard',   level: 'canopy',       w: 240, k: 0,   phase: 0 },
    { room: 'backyard',   level: 'garden',       w: 240, k: 48,  phase: 0 },
    { room: 'backyard',   level: 'construction', w: 240, k: 144, phase: 0 },
    { room: 'livingroom',                        w: 480, k: 0,   phase: 0 }
    /* ONE row for the whole room, and it stays the Desk's for all five
       bays: room.levels[0] is THE DESK, whose drawMenuBackdrop is the
       room's own calm wall. The Fort exports the same delegate rather
       than a row of its own, because another 240 row would make WORLD
       1920 rather than 1680 and put a second cardboard-dark seam on a
       loop that was laid out around one luminance cut. */
  ];

  /* ----------------------------------------------------- scene state */

  var t = 0, scroll = 0;
  var bays = [], WORLD = 0;        /* the kept rows and the sum of their widths */
  var dust = [], puffs = [], bubbles = [], timers = [];
  var directorTimer = 4;
  var chirpCooldown = 0;           /* ticked down in update(); see say() */
  var menuIndex = 0;
  var waved = false, wavePending = false;

  /* The rectangles this screen drew, refilled every frame inside drawFg
     and handed to Input by Game.render. Three boards and the toggle;
     the porch, the sign and the rooms are scenery. */
  var hot = [];

  /* ---------------------------------------- the porch tile and the bays */

  /* Baked canvases. The bays keep theirs on their own row object so it
     survives a visit; the porch floor is one 96x64 tile for all of it. */
  var T = { porch: null };

  /* Rows for an open room that has no row of its own in BAYS, so a room
     added to the game after this file was written is on the porch the
     day it opens rather than the day somebody remembers to come back
     here. Cached at module level, not rebuilt per enter(), so a spare
     row keeps its baked canvas across visits like every row in BAYS. */
  var SPARE = {};

  function spareRow(room) {
    if (!SPARE[room.id]) SPARE[room.id] = { room: room.id, w: 480, k: 0, phase: 0 };
    return SPARE[room.id];
  }

  /* WHICH ART A ROW DRAWS. A level row asks Levels for the level object
     and takes its art's drawMenuBackdrop; a room row takes the first
     bay's, which for the Living Room is the Desk's, which delegates to
     LivingRoom.drawMenuBackdrop. Every one of these is a closure over
     its own module's palette and tiles and reads no this, so holding
     the bare function is safe. */
  function bayDraw(row, room) {
    var lv = row.level ? Levels[row.level] : (room && room.levels && room.levels[0]);
    return lv && lv.art ? lv.art.drawMenuBackdrop : null;
  }

  /* WHICH ROOMS ARE ON THE PORCH TONIGHT, and where each one starts.

     The gate is Levels.roomOpen on the ROOM, not the level: roomOpen
     honours the passkey, and Levels.levelsOf already hands the level
     select every bay of an open room, so showing a room's own menu art
     here is not a spoiler. A row whose art cannot be resolved is
     skipped rather than drawn as a hole.

     WORLD is the sum of the kept widths: 1680 today, and 1680 the first
     time anyone ever sees this screen, because five of the ten priced
     doodads are Living Room unlocks - so the Living Room is open
     whenever ten of them are. */
  function resolveBays() {
    var rows = [], i, j, row, room, seen;

    for (i = 0; i < BAYS.length; i++) {
      row = BAYS[i];
      room = Levels.roomById(row.room);
      if (room && Levels.roomOpen(room)) rows.push(row);
    }
    for (i = 0; i < Levels.rooms.length; i++) {
      room = Levels.rooms[i];
      if (!Levels.roomOpen(room)) continue;
      seen = false;
      for (j = 0; j < rows.length; j++) if (rows[j].room === room.id) { seen = true; break; }
      if (!seen) rows.push(spareRow(room));
    }

    bays.length = 0;
    WORLD = 0;
    for (i = 0; i < rows.length; i++) {
      row = rows[i];
      row.draw = bayDraw(row, Levels.roomById(row.room));
      if (typeof row.draw !== 'function') continue;
      if (!row.tile) row.tile = bakeBay(row);
      row.x = WORLD;
      WORLD += row.w;
      bays.push(row);
    }
  }

  /* BAKING A BAY, ONCE, INTO ITS OWN CANVAS.

     Every menu backdrop in the game is a pure function of scroll -
     fills, tileX, Tint.rect, drawCeiling, drawFloor, all anchored at
     local 0, with no clip, save or setTransform on the context it is
     handed. So one call at a frozen phase is a painting, and a painting
     is three drawImages a frame instead of six modules' worth of tiling.
     It also settles the parallax question: a baked bay has no inner
     layers left to move at the wrong speed.

     Canvas column c >= edge shows room local x = c - edge + k, so k has
     to satisfy k <= 480 + edge - w (254 for a 240 bay with a jamb, 276
     with the door, 14 for the 480 bay) or the right-hand columns ask the
     room for pixels it does not have. The clamp is here rather than in
     the table because k is advertised as a knob to retune in a browser.
     tileX paints local [-tw, 480) and the backdrop's own base fillRect
     covers the rest, so every column of this canvas is painted. */
  function bakeBay(bay) {
    var edge = bay.door ? DOOR : JAMB;
    var k = clamp(bay.k, 0, Math.max(0, 480 + edge - bay.w));
    var tile = makeCanvas(bay.w, VH), c = tile.ctx;
    c.save();
    c.translate(edge - k, 0);
    bay.draw(c, bay.phase);
    c.restore();
    drawJamb(c, 0);
    if (bay.door) {
      c.fillStyle = '#15110d';
      c.fillRect(JAMB, 0, DOOR - 2 * JAMB, VH);
      drawJamb(c, DOOR - JAMB);
    }
    /* the frame throws a little shade into the room it frames */
    Tint.rect(c, edge, 0, 8, VH, '#160e07', 4);
    return tile;
  }

  /* A doorframe post, 14 wide, in dark timber so it silhouettes against
     the bright Garden and Construction as well as the dark Coop and
     Deck - a mid timber would have vanished into one of them. The pegs
     every 29 rows are postV's rhythm, so the frame is made of the same
     wood as the rest of the game. */
  function drawJamb(c, x) {
    c.fillStyle = '#20150c'; c.fillRect(x, 0, 1, VH);
    c.fillStyle = '#7d5430'; c.fillRect(x + 1, 0, 3, VH);
    c.fillStyle = '#4e3722'; c.fillRect(x + 4, 0, 9, VH);
    c.fillStyle = '#20150c'; c.fillRect(x + 13, 0, 1, VH);
    for (var y = 6; y < VH; y += 29) c.fillRect(x + 1, y, 12, 1);
  }

  /* THE PORCH FLOOR, one 96x64 tile drawn five times with no offset,
     because the porch does not move. Two rows of lit lip, twelve of
     boards with staggered joints, then the riser the menu is nailed to -
     which shows only in the 8px gaps between boards, the margins, and
     rows 252..269 on a phone. UI.C.board on this riser keeps the 3x
     separation the boards have from the coop wall today. */
  function bakePorch() {
    var tile = makeCanvas(96, VH - PORCH), c = tile.ctx;
    c.fillStyle = '#5e3f27'; c.fillRect(0, 0, 96, 2);            /* 206..207 lip   */
    c.fillStyle = '#4d3220'; c.fillRect(0, 2, 96, 12);           /* 208..219 boards */
    c.fillStyle = '#241509';
    c.fillRect(20, 2, 1, 6); c.fillRect(68, 2, 1, 6);            /* joints 208..213 */
    c.fillRect(44, 8, 1, 6); c.fillRect(92, 8, 1, 6);            /* joints 214..219 */
    c.fillRect(0, 14, 96, VH - PORCH - 14);                      /* 220..269 riser  */
    c.fillStyle = '#3b2515';
    c.fillRect(0, 30, 96, 1); c.fillRect(0, 54, 96, 1);          /* grain 236, 260  */
    return tile;
  }

  /* -------------------------------------------------------- actors */

  function Actor(id, r) {
    this.id = id;
    this.r = r;
    this.x = 0; this.y = 0;
    this.vx = 0; this.vy = 0;
    this.angle = 0;
    this.flapTimer = 0;
    this.state = 'idle';
    this.timer = rand(1, 3);
    this.hopTimer = rand(8, 18);
    this.bobPhase = rand(0, TAU);
    this.seat = null;
    this.slot = null;
    this.target = null;
    this.spanX = 78; this.spanY = 34;   /* how far a flyer wanders */
    var sp = Doodads.get(id).sprite;
    this.foot = sp.footOffset;
    /* how far above its own pivot this doodad's head reaches, in radii.
       The hop arc needs it: an arc measured without it puts a tall head
       inside the hanging sign off a high plank. */
    this.head = sp.pivotY / sp.bodyR;
    /* and how far either side of it, so the flyer clamp below can test
       the real sprite against the sign and the stage edges instead of
       against the one hand-worked figure the FLY_SLOTS comment quotes.
       Both are measured off the pivot, which plenty of sprites do not
       sit in the middle of - Pepper carries 1.47 radii to the left of
       hers and 1.00 to the right - so one half-extent will not do for
       both sides. */
    this.left  = sp.pivotX / sp.bodyR;               /* pepper 1.47, billy 1.08 */
    this.right = (sp.w - sp.pivotX) / sp.bodyR;      /* pepper 1.00, billy 1.08 */
  }

  Actor.prototype.flap = function (strength) {
    this.flapTimer = 0.28;
    if (strength) this.vy -= strength;
  };

  Actor.prototype.flying = function () { return this.flapTimer > 0; };

  /* ---- percher: sits a shelf, and every so often hops to another seat */

  function updatePercher(a, dt) {
    a.flapTimer -= dt;
    a.timer -= dt;
    a.hopTimer -= dt;

    if (a.state === 'perch') {
      /* NO GONE AND NO HIDDEN. The coop title had to watch for a perch
         being recycled out from under a doodad and for one drifting in
         behind the menu column; a fixed porch has neither. A seat is
         always there and nothing on the foreground layer is above the
         shelves, so a sitter sits until it chooses to move. */
      var s = a.seat;
      a.x = s.x;
      a.y = s.plank.y - a.r * a.foot + Math.sin(t * 2.1 + a.bobPhase) * 1.2;
      a.angle = Math.sin(t * 1.1 + a.bobPhase) * 0.05;
      if (a.timer <= 0) {
        a.timer = rand(2.2, 5);
        if (chance(0.45)) { a.flap(0); say(a, '♪'); }
        else if (chance(0.5)) say(a, '·');
      }
      if (a.hopTimer <= 0) leapToSeat(a);
    } else if (a.state === 'hopping') {
      a.hopT += dt / a.hopDur;
      var k = clamp(a.hopT, 0, 1);
      var tp = a.target;
      a.x = lerp(a.from.x, tp.x, k);
      var arc = -Math.sin(k * Math.PI) * a.hopArc;
      a.y = lerp(a.from.y, tp.plank.y - a.r * a.foot, k) + arc;
      a.angle = lerp(-0.22, 0.12, k) * (1 - Math.abs(0.5 - k) * 0.7);
      if (k > 0.1 && k < 0.75 && a.flapTimer <= 0.02) a.flap(0);
      if (k >= 1) {
        a.state = 'perch';
        a.seat = tp;
        a.timer = rand(1.4, 3.4);
        a.hopTimer = rand(8, 18);
        a.angle = 0;
        puff(a.x, tp.plank.y, 3);
      }
    }
  }

  /* ---- flyer: never lands, patrols its corner, likes to swoop */

  function updateFlyer(a, dt) {
    a.flapTimer -= dt;
    a.timer -= dt;

    var tx, ty;
    if (a.state === 'swoop' && a.target) {
      tx = a.target.x + a.swoopDX;
      ty = a.target.y + a.swoopDY;
      if (a.timer <= 0) { a.state = 'patrol'; a.timer = rand(3, 6); }
    } else {
      /* a lazy figure of eight, sized by the slot so two flyers in the
         same column keep out of each other's way and off the sign */
      tx = a.homeX + Math.sin(t * 0.42 + a.bobPhase) * a.spanX;
      ty = a.homeY + Math.sin(t * 0.83 + a.bobPhase) * a.spanY;
      if (a.timer <= 0) { a.timer = rand(2.5, 5); if (chance(0.3)) { a.flap(0); say(a, '·'); } }
    }

    /* THE SIGN IS ON THE FOREGROUND LAYER, and the patrol slots clear
       it on x alone - so a swoop, the one thing that leaves a slot, is
       the one thing that has to clear it on y. The director aims a
       flyer at a sitter whose seat is under the sign, and the board's
       face (rows 6..49) plus its opaque drop shadow (9..52) would saw
       the top off the bird's head for the whole 1.6-2.6s of the swoop.
       Clamping the target is not enough on its own: the spring sinks
       slower than the bird crosses x 96. So the POSITION is clamped,
       and the bird skims the sign's lower edge instead of going behind
       it. The x clamp is the same rule for the stage edges - a swoop
       at the walker in grid slot 424 would otherwise put a wing 4.6px
       off the right of the screen from the slot above him, and 33.8px
       off it from the slot across the stage: the spring is underdamped
       and overshoots by about 8% of whatever distance it just crossed. */
    var lx = a.r * a.left, rx = VW - a.r * a.right, cy = HEAD + a.r * a.head;
    var ax = (tx - a.x) * 2.6, ay = (ty - a.y) * 2.6;
    a.vx = damp(a.vx + ax * dt, 0, 0.14, dt);
    a.vy = damp(a.vy + ay * dt, 0, 0.14, dt);
    a.x += a.vx * dt;
    a.y += a.vy * dt;
    if (a.x < lx) { a.x = lx; if (a.vx < 0) a.vx = 0; }
    else if (a.x > rx) { a.x = rx; if (a.vx > 0) a.vx = 0; }
    if (a.x + a.r * a.right > 96 && a.x - a.r * a.left < 385 && a.y < cy) {
      a.y = cy; if (a.vy < 0) a.vy = 0;
    }
    a.angle = clamp(a.vy / 240, -0.3, 0.42);
    if (a.vy < -14 && a.flapTimer <= 0.04) a.flap(0);
    if (a.flapTimer < -0.5 && chance(dt * 1.6)) a.flap(0);
  }

  /* ---- stomper: walks the porch, hops, occasionally attempts flight */

  function updateStomper(a, dt) {
    a.flapTimer -= dt;
    a.timer -= dt;
    var ground = PORCH - a.r * a.foot;

    if (a.state === 'walk') {
      a.x = damp(a.x, a.homeX + Math.sin(t * 0.3 + a.bobPhase) * a.spanX, 0.4, dt);
      a.y = ground - Math.abs(Math.sin(t * 3.4 + a.bobPhase)) * 1.6;
      a.angle = Math.sin(t * 3.4 + a.bobPhase) * 0.04;
      if (a.timer <= 0) {
        a.timer = rand(2.4, 5.5);
        if (chance(0.45)) { a.state = 'hop'; a.vy = -92; a.hops = 1; }
        else if (chance(0.5)) { a.state = 'attempt'; a.vy = -120; a.hops = 3; a.flap(0); say(a, '!'); }
      }
    } else if (a.state === 'hop' || a.state === 'attempt') {
      a.vy += 620 * dt;
      a.y += a.vy * dt;
      a.angle = clamp(a.vy / 700, -0.16, 0.2);
      if (a.state === 'attempt' && a.vy > -20 && a.flapTimer <= 0.02 && a.hops > 0) {
        a.hops--; a.flap(78);
      }
      if (a.y >= ground) {
        a.y = ground; a.vy = 0;
        puff(a.x, PORCH, 6);
        if (a.state === 'attempt') { say(a, '?'); }
        a.state = 'walk';
        a.timer = rand(2, 4.5);
        a.angle = 0;
      }
    }
  }

  var BEHAVIOUR = { perch: updatePercher, patrol: updateFlyer, walk: updateStomper };

  /* HOP TO ANOTHER SEAT, WITH THE SIGN IN MIND.

     The seat itself is chosen in three steps. Free seats first, because
     landing on somebody is the one outcome there is no recovering from.
     Then, IF ANYTHING SURVIVES IT, drop the LOW seats a walker is
     standing in front of - a preference, never a ban, because a sitter
     with nowhere to go would rather be partly covered than hang in the
     air. Then a two-in-three preference for the other shelf, so a hop
     usually reads as going up or coming down rather than sliding along.

     The ARC is the part the sign pays for. A fixed hop of 22..38 off the
     P2 plank at y 116 puts Cookie's head at row 43, inside DOODADS. So
     the arc asks how much headroom the higher end of the hop actually
     has: HEAD is the lowest row a head may reach, and the headroom from
     the HIGH planks works out at 16.7 / 20.7 / 22.7 px for the tallest
     sitters. The Math.max(8, ...) floor can never bite, because no seat
     on either shelf has headroom under 16. */
  function leapToSeat(a) {
    var free = [], clear = [], other = [], i, s;

    for (i = 0; i < SEATS.length; i++) {
      s = SEATS[i];
      if (s === a.seat || seatTaken(s, a)) continue;
      free.push(s);
    }
    for (i = 0; i < free.length; i++) if (!walkerShades(free[i])) clear.push(free[i]);
    if (clear.length) free = clear;
    if (!free.length) { a.hopTimer = 0.4; return; }

    var row = a.seat ? a.seat.plank.row : -1;
    for (i = 0; i < free.length; i++) if (free[i].plank.row !== row) other.push(free[i]);
    s = (other.length && chance(0.67)) ? choose(other) : choose(free);

    a.from = { x: a.x, y: a.y };
    a.target = s; a.state = 'hopping'; a.hopT = 0;
    a.hopDur = clamp(Math.abs(s.x - a.x) / 130, 0.75, 1.9);
    var toY = s.plank.y - a.r * a.foot;
    var room = Math.min(a.y, toY) - a.r * a.head - HEAD;
    a.hopArc = Math.max(8, Math.min(room, 22 + Math.random() * 16));
    a.flap(0);
    if (chance(0.4)) say(a, '!');
  }

  /* somebody else is already sitting on it, or on their way to it. A
     sitter keeps its claim on the seat it left until it lands, so a hop
     can never be undercut in mid-air. Over stage, never the roster. */
  function seatTaken(s, self) {
    for (var i = 0; i < stage.length; i++) {
      var o = stage[i];
      if (o === self || o.role !== 'perch') continue;
      if (o.seat === s || o.target === s) return true;
    }
    return false;
  }

  /* is a walker standing in front of this seat? Only the LOW row can be
     covered. The tallest RESTING head on the porch is Maximus at 157.7,
     the top of his 1.6 walk bob, and it still clears the foot of P3's
     shadow strip (rows 129..132) by 24.7, P3's plank by 28.7 and the
     lowest HIGH sitter's own ink - Donkey on P3, whose art bottoms out
     at 122.02 - by 35.7. Resting is the pose a taller walker has to be
     checked against and the only one this test weighs: a hop or an
     attempt lifts that head for a moment, but what is being decided
     here is which seat a sitter settles into for the next eight to
     eighteen seconds, which is a question about where walkers stand.
     And 30px is about where a body stops hiding a body. */
  function walkerShades(s) {
    if (s.plank.row !== 1) return false;
    for (var i = 0; i < stage.length; i++) {
      var o = stage[i];
      if (o.role === 'walk' && Math.abs(s.x - o.homeX) < 30) return true;
    }
    return false;
  }

  /* ------------------------------------------------------ the cast */

  /* WHO IS ON STAGE, which is the only list anything per frame walks.
     At most WALK_MAX + PERCH_MAX + FLY_MAX = 23 of them. */
  var stage = [], visit = 0;

  /* THE UNLOCKED MEMBERS OF ONE ROLE THAT GET TO COME OUT THIS VISIT.

     Under the quota everybody does. Over it, the staged set is the
     visit'th page of that role: M[(visit * Q + i) % n]. So with twenty
     perchers and eleven seats, every one of them has been seen within
     two trips to the title screen, and the porch is a different crowd
     each time rather than the same eleven for ever.

     This is one of the file's two passes over the roster, and it runs
     from enter(), once per role. The other is refresh(), for a doodad
     that arrives mid-screen. Nothing per frame touches Doodads.list. */
  function castFor(role, max) {
    var members = [], out = [], i, d;
    var best = Doodads.bestReached();
    for (i = 0; i < Doodads.list.length; i++) {
      d = Doodads.list[i];
      if (d.title && d.title.role === role && Doodads.isUnlocked(d, best)) members.push(d);
    }
    if (members.length <= max) return members;
    for (i = 0; i < max; i++) out.push(members[(visit * max + i) % members.length]);
    return out;
  }

  /* PUT A DOODAD ON THE PORCH, in the first place its role has free, and
     hand back null when the role is full - which is how refresh() leaves
     a late arrival for the next enter() to page in. Nobody reads a
     coordinate out of the roster: role and r are the whole contract, and
     the tables above are where everyone lives. */
  function addActor(d) {
    var a = new Actor(d.id, d.title.r);
    a.role = d.title.role;
    if (a.role === 'perch') {
      var s = freeSeat(a);
      if (!s) return null;
      a.state = 'perch';
      a.seat = s;
      a.x = s.x;
      a.y = s.plank.y - a.r * a.foot;
    } else if (a.role === 'patrol') {
      var slot = freeSlot();
      if (!slot) return null;
      a.state = 'patrol';
      a.slot = slot;
      a.homeX = slot.x; a.homeY = slot.y;
      a.spanX = slot.spanX; a.spanY = slot.spanY;
      a.x = a.homeX; a.y = a.homeY;
    } else {
      var sx = freeWalkSlot();
      if (sx === null) return null;
      a.state = 'walk';
      a.spanX = WALK_SPAN;
      a.homeX = sx;
      a.x = a.homeX; a.y = PORCH - a.r * a.foot;
    }
    stage.push(a);
    return a;
  }

  /* The first seat nobody has: the HIGH row left to right, then the LOW
     seats no walker is standing in front of, then whatever LOW seats are
     left. SEATS is already in that order apart from the walker test,
     which is why this is two passes over one list rather than a sort. */
  function freeSeat(a) {
    var i;
    for (i = 0; i < SEATS.length; i++) {
      if (!seatTaken(SEATS[i], a) && !walkerShades(SEATS[i])) return SEATS[i];
    }
    for (i = 0; i < SEATS.length; i++) if (!seatTaken(SEATS[i], a)) return SEATS[i];
    return null;
  }

  function freeSlot() {
    for (var i = 0; i < FLY_SLOTS.length; i++) {
      var held = false;
      for (var j = 0; j < stage.length; j++) if (stage[j].slot === FLY_SLOTS[i]) { held = true; break; }
      if (!held) return FLY_SLOTS[i];
    }
    return null;
  }

  function freeWalkSlot() {
    for (var i = 0; i < WALK_SLOTS.length; i++) {
      var held = false;
      for (var j = 0; j < stage.length; j++) {
        if (stage[j].role === 'walk' && stage[j].homeX === WALK_SLOTS[i]) { held = true; break; }
      }
      if (!held) return WALK_SLOTS[i];
    }
    return null;
  }

  /* SPREAD THE WALKER ROW ACROSS THE WHOLE GRID, once, from enter(),
     after the entire row is on stage. refresh() deliberately cannot use
     this: re-spacing a row that is already standing would slide
     everybody sideways to make room for a late arrival, which on a
     screen whose whole promise is "nobody is hidden" would read as the
     porch rearranging itself behind the player's back. A latecomer takes
     the first grid slot nobody is standing in. */
  function spaceWalkers() {
    var row = [], i;
    for (i = 0; i < stage.length; i++) if (stage[i].role === 'walk') row.push(stage[i]);
    for (i = 0; i < row.length; i++) {
      row[i].homeX = walkSlot(i, row.length);
      row[i].x = row[i].homeX;
    }
  }

  function sortStage() { stage.sort(function (p, q) { return DEPTH[p.role] - DEPTH[q.role]; }); }

  function onStage(id) {
    for (var i = 0; i < stage.length; i++) if (stage[i].id === id) return true;
    return false;
  }

  function withRole(role) {
    var out = [];
    for (var i = 0; i < stage.length; i++) if (stage[i].role === role) out.push(stage[i]);
    return out;
  }
  function anyWithRole(role) { var l = withRole(role); return l.length ? choose(l) : null; }

  /* ------------------------------------------------- talk and scenery */

  /* ONE BUBBLE PER DOODAD, FIVE ON SCREEN, AND ONE CHIRP EVERY 0.45s.

     Two bubbles at one actor draw at the same spot and read as a smear
     rather than as two remarks, so saying something again replaces what
     is already up. The other two limits are what keep this screen calm
     as the roster grows: twenty-three doodads chattering at the coop
     title's rate would be a racket, and a cap stated here is a cap
     however many of them there are. */
  function say(actor, symbol) {
    for (var i = bubbles.length - 1; i >= 0; i--) if (bubbles[i].actor === actor) bubbles.splice(i, 1);
    bubbles.push({ actor: actor, symbol: symbol, life: 1.2 });
    if (bubbles.length > 5) bubbles.shift();
    if (chirpCooldown <= 0) { Audio3.play('chirp'); chirpCooldown = 0.45; }
  }

  /* Where a bubble sits, worked out once a frame rather than in the draw.
     The TARGET only moves when its doodad has genuinely gone somewhere
     (2px), so a doodad that is merely bobbing cannot flip the bubble
     between two columns; the SHOWN position then eases toward that
     target, because a target stepping 2-5px at a time would lurch after
     a doodad that is gliding.

     The low-row rule is the porch's own: a flyer in slot 1 or 2 patrols
     at row 62, and a bubble ten pixels above its head would park on the
     sound toggle's lower edge or under the HI panel. Beside the shoulder
     it reads as speech just as well. */
  function placeBubble(b, dt) {
    var a = b.actor;
    var wx = a.x + a.r * 0.6, wy = a.y - a.r - 10;
    if (wy < 36) { wy = a.y - 4; wx = a.x + a.r * 1.1; }
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
    /* tail */
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
                   life: rand(0.3, 0.7), col: chance(0.5) ? '#a89572' : '#9d6c3d' });
    }
  }

  /* Motes in the air over the bays only - below row 206 is a floor, not
     air. They drift on their own, with no scroll term anywhere: the
     porch is nailed down, and dust dragged left by a backdrop sliding
     behind a fixed foreground would be the one thing on screen agreeing
     with the rooms instead of with the porch. */
  function seedDust() {
    dust.length = 0;
    for (var i = 0; i < 24; i++) {
      dust.push({ x: rand(0, VW), y: rand(0, PORCH - 1), vy: rand(-5, -1), vx: rand(-9, -3),
                  phase: rand(0, TAU), bright: chance(0.3) });
    }
  }

  function updateScenery(dt) {
    var i;
    for (i = 0; i < dust.length; i++) {
      var p = dust[i];
      p.x += p.vx * dt;
      p.y += p.vy * dt + Math.sin(t * 1.4 + p.phase) * 4 * dt;
      if (p.x < -2) { p.x = VW + 2; p.y = rand(0, PORCH - 1); }
      if (p.y < 0) { p.y = 200; p.x = rand(0, VW); }
    }
    for (i = puffs.length - 1; i >= 0; i--) {
      var pf = puffs[i];
      pf.life -= dt; pf.x += pf.vx * dt; pf.y += pf.vy * dt; pf.vy += 40 * dt;
      if (pf.life <= 0) puffs.splice(i, 1);
    }
    for (i = bubbles.length - 1; i >= 0; i--) {
      var bb = bubbles[i];
      bb.life -= dt;
      if (bb.life <= 0) { bubbles.splice(i, 1); continue; }
      placeBubble(bb, dt);
    }
  }

  /* ------------------------------------------------------ director */

  function director(dt) {
    directorTimer -= dt;
    if (directorTimer > 0) return;
    directorTimer = rand(5, 9);
    var roll = Math.random();
    /* the beats are cast by role, not by name, so they keep working
       whoever happens to be on the porch today */
    var flyer = anyWithRole('patrol');
    var percher = anyWithRole('perch');
    var walker = anyWithRole('walk');

    if (roll < 0.36 && flyer && percher) {
      /* the flyer buzzes somebody sitting down */
      flyer.state = 'swoop';
      flyer.target = percher;
      flyer.swoopDX = rand(-62, -44);
      flyer.swoopDY = rand(-32, -12);
      flyer.timer = rand(1.6, 2.6);
      later(0.9, function () { percher.flap(0); say(percher, '!'); });
      say(flyer, '♪');
    } else if (roll < 0.62 && flyer && walker) {
      /* the flyer drops in on somebody on the boards, who objects */
      flyer.state = 'swoop';
      flyer.target = walker;
      flyer.swoopDX = rand(18, 38);
      flyer.swoopDY = rand(-62, -44);
      flyer.timer = rand(1.4, 2.2);
      later(1.0, function () {
        if (walker.state === 'walk') { walker.state = 'hop'; walker.vy = -104; say(walker, '!'); }
      });
    } else if (roll < 0.82 && walker) {
      /* another go at flying */
      if (walker.state === 'walk') {
        walker.state = 'attempt'; walker.vy = -126; walker.hops = 3;
        walker.flap(0); say(walker, '★');
      }
    } else if (stage.length) {
      /* A ROUND OF CHIRPING, THREE OF WHOEVER IS IN - sampled without
         replacement rather than taken off the front of the list. stage
         is sorted by depth, so stage[0..2] is three particular doodads
         in three particular seats, and on a screen that can hold
         twenty-three the same three would do all the chirping for ever. */
      var pool = stage.slice();
      for (var i = 0; i < 3 && pool.length; i++) {
        (function (a, delay, sym) {
          later(delay, function () { say(a, sym); });
        })(pool.splice((Math.random() * pool.length) | 0, 1)[0], i * 0.44, i === 2 ? '·' : '♪');
      }
    }
  }

  /* --------------------------------------------------- the opening wave */

  /* EVERYBODY FLAPS, LEFT TO RIGHT, ONCE PER SESSION.

     It is the whole of the announcement this screen gets: the tenth
     doodad already had its banner in the run that bought it, so the
     porch says hello by having everyone on it wave at the player in the
     first second instead of putting up a word.

     It waits for the wipe. Game.goInstant runs under full black and the
     uncover takes 0.227s, so a wave scheduled in enter() would happen
     behind the curtain. Chirps go straight to Audio3 rather than through
     say(): the wave is exempt from the chirp cooldown, and it carries no
     bubbles at all - thirteen bubbles against a five-bubble cap would
     show five, which would read as eight doodads having nothing to say. */
  function wave() {
    var row = stage.slice();
    row.sort(function (p, q) { return p.x - q.x; });
    for (var i = 0; i < row.length; i++) {
      (function (a, delay, chirp) {
        later(delay, function () {
          a.flap(0);
          if (chirp) Audio3.play('chirp');
        });
      })(row[i], i * 0.07, i % 2 === 0);
    }
  }

  /* ----------------------------------------------------- lifecycle */

  function enter(params) {
    t = 0; scroll = 0;
    bubbles.length = 0; puffs.length = 0; timers.length = 0;
    chirpCooldown = 0;
    directorTimer = 4;
    menuIndex = (params && params.menu) || 0;

    /* An achievement can come true somewhere that has no banner to show
       it in: a run abandoned from the pause panel after the plank that
       paid for it, a doodad bought on the select screen, or a save file
       that already satisfied one before achievements existed at all.
       Re-evaluating on the way in banks those, silently - the earned
       count goes up and the ACHIEVEMENTS row grows its NEW tab, which is
       all the title should say. The celebrating belongs to the run that
       earned it and to the screen that can show the badge, so the
       newly-earned list is deliberately dropped on the floor here. */
    Achievements.check();

    /* The bakes happen here, after Levels.buildArt() has run at boot and
       before the first frame is drawn. Bays are resolved on the way in
       and nowhere else, so WORLD cannot change under a running scroll:
       a room opened by the passkey while the porch is up arrives on the
       next visit. Today that cannot happen anyway - ten priced doodads
       open already implies the Living Room. */
    if (!T.porch) T.porch = bakePorch();
    resolveBays();
    seedDust();

    /* WALKERS GO ON FIRST, and the row is spread before anybody sits
       down, because the seat search prefers LOW seats no walker is
       standing in front of and cannot prefer that against a row which is
       not standing anywhere yet. */
    stage.length = 0;
    var walkers = castFor('walk', WALK_MAX);
    var perchers = castFor('perch', PERCH_MAX);
    var flyers = castFor('patrol', FLY_MAX);
    var i;
    for (i = 0; i < walkers.length; i++) addActor(walkers[i]);
    spaceWalkers();
    for (i = 0; i < perchers.length; i++) addActor(perchers[i]);
    for (i = 0; i < flyers.length; i++) addActor(flyers[i]);
    sortStage();

    /* after the staging, so the first visit ever shows page 0 of each
       role - which, under the quota, is simply roster order */
    visit++;
    wavePending = !waved;
  }

  /* A doodad can arrive while this screen is up - the master passkey can
     be typed right here - so let it walk straight on rather than waiting
     for a scene change. Everyone already on keeps their place, and
     anybody whose role is full is left for the next enter(), which will
     page them in. Bays are not re-resolved; see enter(). */
  function refresh() {
    var best = Doodads.bestReached();
    var added = false;
    for (var i = 0; i < Doodads.list.length; i++) {
      var d = Doodads.list[i];
      if (!d.title || onStage(d.id) || !Doodads.isUnlocked(d, best)) continue;
      var a = addActor(d);
      if (!a) continue;
      say(a, '★');
      added = true;
    }
    if (added) sortStage();
  }

  function update(dt) {
    t += dt;
    scroll += SCROLL * dt;
    if (chirpCooldown > 0) chirpCooldown -= dt;
    updateTimers(dt);
    updateScenery(dt);
    for (var i = 0; i < stage.length; i++) BEHAVIOUR[stage[i].role](stage[i], dt);
    director(dt);

    /* the first frame the curtain is off */
    if (wavePending && !Game.locked()) { wave(); waved = true; wavePending = false; }

    if (Game.locked()) return;
    /* A tap on a board moves the cursor onto it BEFORE the confirm below
       runs, and the board carries a:'confirm' - so one tap is choose and
       go, and the keyboard branch underneath does the going. */
    var tg = Input.tapped();
    if (tg && tg.id === 'menu') menuIndex = tg.i;
    if (tg && tg.id === 'sound') {
      /* the same toggle M has always driven, and the same toast with it,
         so a phone and a keyboard say the same thing about the same state */
      var muted = Audio3.toggleMute();
      Game.toast(muted ? 'SOUND OFF' : 'SOUND ON');
      if (!muted) Audio3.play('move');
    }
    /* LEFT AND RIGHT ONLY. The menu is a row now, and Space is mapped to
       'up' (js/input.js), so a screen that listened for up and down
       would have the spacebar quietly nudging the cursor. */
    if (Input.nav('right')) { menuIndex = (menuIndex + 1) % MENU.length; Audio3.play('move'); }
    if (Input.nav('left')) { menuIndex = (menuIndex + MENU.length - 1) % MENU.length; Audio3.play('move'); }
    if (Input.hit('confirm')) {
      Audio3.play('select');
      /* Named, not numbered, so the row order is free to change: both
         screens come back with the index they left from (ScoresScene
         with { menu: 1 }, AchievementsScene with { menu: 2 }) and those
         numbers are the only place the order is written down twice. */
      if (MENU[menuIndex] === 'PLAY') Game.go(LevelSelectScene, {});
      else if (MENU[menuIndex] === 'HIGH SCORES') Game.go(ScoresScene, {});
      else Game.go(AchievementsScene, {});
    }
  }

  /* -------------------------------------------------------- drawing */

  function drawBg(ctx) {
    drawBays(ctx);

    var i;
    for (i = 0; i < PLANKS.length; i++) drawPlank(ctx, PLANKS[i]);

    /* the porch floor goes on after the shelves and before the cast:
       it is the front of the stage, and the shelves are behind it */
    tileX(ctx, T.porch.canvas, 0, PORCH);

    /* the doodads throw a little shade of their own, over stage */
    for (i = 0; i < stage.length; i++) {
      if (stage[i].role === 'walk') walkShadow(ctx, stage[i]);
      else if (stage[i].role === 'perch') seatShadow(ctx, stage[i]);
    }

    var ga = ctx.globalAlpha;
    for (i = 0; i < dust.length; i++) {
      var pt = dust[i];
      ctx.globalAlpha = ga * (pt.bright ? 0.6 : 0.35);
      ctx.fillStyle = '#f2e6c8';
      ctx.fillRect(Math.round(pt.x), Math.round(pt.y), 1, 1);
    }
    ctx.globalAlpha = ga;

    for (i = 0; i < puffs.length; i++) {
      var pf = puffs[i];
      ctx.fillStyle = pf.col;
      ctx.fillRect(Math.round(pf.x), Math.round(pf.y), 1, 1);
    }
  }

  /* THE ROOMS GO BY: three blits, no clip, no translate.

     WORLD is larger than the screen, so at most one copy of any bay is
     visible and the whole loop is "draw the two or three that are in
     frame". Widths are integers, so adjacent bays share a rounded edge
     and no seam ever opens between them. Drawn under Screen.beginFrame's
     shake transform, so the passkey's shake moves the rooms with
     everything else. */
  function drawBays(ctx) {
    var off = scroll % WORLD;
    for (var i = 0; i < bays.length; i++) {
      var b = bays[i], sx = b.x - off;
      if (sx + b.w <= 0) sx += WORLD;
      if (sx < VW) ctx.drawImage(b.tile.canvas, Math.round(sx), 0);
    }
  }

  /* A shelf: the game's own timber, a flat shadow strip under it and two
     bracket stubs holding it up. All flat fills - nothing on this screen
     dithers, because a dither pattern over something that moves boils. */
  function drawPlank(ctx, p) {
    Coop.postH(ctx, p.x, p.y, p.w, 7);
    Tint.rect(ctx, p.x, p.y + 7, p.w, 4, '#160e07', 5);
    ctx.fillStyle = '#4e3722';
    ctx.fillRect(p.x + 6, p.y + 7, 3, 4);
    ctx.fillRect(p.x + p.w - 9, p.y + 7, 3, 4);
  }

  function walkShadow(ctx, a) {
    if (!a) return;
    var h = clamp((PORCH - a.r * a.foot - a.y) / 40, 0, 1);
    var w = Math.round(a.r * (1.9 - h * 0.6));
    Tint.rect(ctx, Math.round(a.x - w / 2), PORCH + 1, w, 3, '#1a120c', Math.round(11 - h * 6));
  }

  function seatShadow(ctx, a) {
    if (!a || a.state !== 'perch' || !a.seat) return;
    var w = Math.round(a.r * 1.5);
    Tint.rect(ctx, Math.round(a.x - w / 2), a.seat.plank.y, w, 2, '#1a120c', 11);
  }

  function drawChars(ctx) {
    /* stage is pre-sorted by role depth: sitters, then walkers, then flyers */
    for (var i = 0; i < stage.length; i++) drawActor(ctx, stage[i]);
  }

  function drawActor(ctx, a) {
    Doodads.draw(ctx, a.id, a.x, a.y, a.r, a.angle, a.flying());
  }

  function drawFg(ctx) {
    hot.length = 0;
    drawSign(ctx);

    /* THE MENU, three signs nailed to the porch's riser, under every
       pair of feet - which is the whole point of the porch. Each one is
       a UI.button, so the rectangle the player sees and the rectangle
       the game listens to are the same one, and each carries
       a:'confirm' so a tap is choose-and-go. */
    var m, b;
    for (m = 0; m < MENU.length; m++) {
      b = BOARDS[m];
      UI.button(ctx, hot, b.x, MENU_Y, b.w, MENU_BH,
                { id: 'menu', i: m, a: 'confirm', scale: b.scale,
                  label: MENU[m], lit: m === menuIndex });
    }

    /* THE PAIR FLANKS THE ROW, NOT THE BOARD. The coop title put a
       marker 12px to the left of the chosen board and a chevron 12px to
       its right; on a row whose boards are 8px apart that pair would sit
       on the neighbouring boards. So they go outside the whole row, at
       x 3 and x 477, five clear of PLAY at 12 and ACHIEVEMENTS' right
       edge at 468: the lit board says WHICH, and the pair says the keys
       go left and right. Keyboard only - on a phone the board is the
       button and a lit board already says which one is chosen. */
    if (!UI.touch()) {
      UI.marker(ctx, 3, 236, t);
      UI.chevron(ctx, 477, 236, -1, 4, UI.C.gold);
    }

    /* HOW MANY BADGES ARE WAITING TO BE LOOKED AT. The same tag the
       doodad select uses, hung off the ACHIEVEMENTS board's top-right
       corner - asked of the menu via ACHV_ROW rather than typed as a
       board index, so it cannot end up over PLAY after a reorder. It is
       not a target: the board under it already is one. */
    var n = Achievements.freshCount();
    if (n > 0) {
      var ab = BOARDS[ACHV_ROW];
      var tag = n + ' NEW';
      var tw = Font.measure(tag, 1) + 8;        /* 37 for '1 NEW', 43 for '12 NEW' */
      var tx = ab.x + ab.w + 4 - tw;            /* 435..471 / 429..471 */
      var ty = MENU_Y - 4;                      /* 216: overhanging the board's top edge */
      ctx.fillStyle = UI.C.shadow;   ctx.fillRect(tx + 1, ty + 1, tw, 9);
      ctx.fillStyle = UI.C.goldDark; ctx.fillRect(tx, ty, tw, 9);
      ctx.fillStyle = UI.C.gold;
      ctx.fillRect(tx, ty, tw, 1); ctx.fillRect(tx, ty + 8, tw, 1);
      ctx.fillRect(tx, ty, 1, 9); ctx.fillRect(tx + tw - 1, ty, 1, 9);
      UI.text(ctx, tag, tx + tw / 2, ty + 1, { align: 'center', colour: UI.C.ink, shadow: null });
    }

    /* THE SOUND TOGGLE, because without it a phone cannot reach the
       sound at all. Top left rather than the coop title's bottom left:
       the footer strip's row is the menu's now. Drawn whenever something
       is POINTING, the same rule the BACK button follows, and the label
       carries the state rather than the action because that is what the
       toast has always said. */
    if (Input.pointing()) {
      UI.button(ctx, hot, 6, 5, 68, 26,
                { id: 'sound', scale: 1,
                  label: Audio3.isMuted() ? 'SOUND OFF' : 'SOUND ON' });
    }

    /* arcade style hi-score readout in the corner, unchanged: the same
       table the coop title reads, so it cannot materialise a table for a
       level nobody has heard of */
    var best = Scores.table(Game.room(), Game.level())[0];
    if (best) {
      var hi = 'HI  ' + best.name + '  ' + best.score;
      var hw = Font.measure(hi, 1) + 10;
      UI.panel(ctx, VW - hw - 6, 5, hw, 13, { fill: UI.C.darker, edge: UI.C.inkFaint });
      UI.text(ctx, hi, VW - 11, 8, { align: 'right', colour: UI.C.gold });
    }

    /* Speech bubbles ride above their doodad. The doodads live on the
       smooth layer and move in fractions of a pixel; a bubble is pixel
       art and has to land on whole ones, which is what placeBubble's
       hysteresis is for. sx/sy, not bx/by: those names belong to the
       boards at the top of this same function and var is
       function-scoped. */
    var ga = ctx.globalAlpha;
    for (var i = 0; i < bubbles.length; i++) {
      var bb = bubbles[i];
      var a = bb.actor;
      if (a.x < -20 || a.x > VW + 20 || bb.sx === undefined) continue;
      var sx = clamp(Math.round(bb.sx), 1, VW - 13);
      var sy = Math.round(bb.sy - (1.2 - bb.life) * 6);
      /* fade rather than strobe: a blink on a bubble this small reads as
         a fault */
      ctx.globalAlpha = ga * clamp(bb.life / 0.3, 0, 1);
      drawBubble(ctx, sx, sy, bb.symbol);
    }
    ctx.globalAlpha = ga;

    UI.footer(ctx, '◀ ▶ CHOOSE   ENTER SELECT   M SOUND   F FULLSCREEN',
                   'CLICK A BOARD   F FULLSCREEN');
  }

  /* THE NAME, HANGING FROM THE TOP OF THE FRAME ON TWO CHAINS.

     One line at scale 3 on a 288x44 board, not two lines at scale 5.
     That is what makes two shelf rows, real hops and a menu row fit in
     270 rows: the board's face is rows 6..49 and its shadow reaches row
     52, which is HEADER, the number everything above the shelves clears.
     It also puts the gold on a guaranteed dark field over every room,
     bright Garden included, and gives the porch something to hang from.

     The sign does not bob. The coop logo did, and a board on two 6px
     chains that drifts up and down is a board that has come off its
     chains; the wave in the letters is the motion instead, and at scale
     3 it quantises to +/-3px per glyph, so the halo spans rows 7..39 at
     the extremes - inside the face either way. */
  function drawSign(ctx) {
    /* two chains, with a link glint in each */
    ctx.fillStyle = '#20150c';
    ctx.fillRect(116, 0, 2, 6); ctx.fillRect(362, 0, 2, 6);
    ctx.fillStyle = '#8b939c';
    ctx.fillRect(116, 2, 1, 1); ctx.fillRect(362, 2, 1, 1);

    UI.board(ctx, 96, 6, 288, 44, { seams: false, nails: false });

    /* 267px of letters on a 288 face: 11px of padding left of the L and
       10 right of the S */
    logoLine(ctx, 'LAND OF DOODADS', VW / 2, 13, 3, t * 1.6);

    /* 109px, x 186..294, rows 40..46. The board's boardLo strip is rows
       47..48, so the subtitle's shadow lands on it, which is where a
       painted word on a board would sit anyway. */
    UI.text(ctx, 'HOUSE AND YARD', VW / 2, 40,
            { align: 'center', colour: UI.C.inkDim, shadow: UI.C.shadow, spacing: 3 });
  }

  /* The coop title's three-pass logo, copied rather than imported: this
     file must not reach into that one, and a shared helper between two
     title screens is a shared helper that gets changed for one of them.
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
           targets: function () { return hot; } };
})();
