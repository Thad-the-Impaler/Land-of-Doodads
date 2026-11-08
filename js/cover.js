/* ------------------------------------------------------------------
   Land of Doodads - THE COVERS

   Every level's little live window - the level-select cards, the TV's
   reruns, the stands' set - is ONE scene, laid out and timed here, and
   painted by the level.

   It used to be twenty scenes. Each level wrote its own drawPreview from
   scratch, and each one rebuilt the same picture by hand: a wall, two
   bands, columns sliding past with a gap, something falling, the doodad
   bobbing. So the doodad flew at a fifth of the card in one and a third
   in the next, the columns were nine wide here and fourteen there, the
   bands were whatever looked right that afternoon, and the doodad bobbed
   on a sine that knew nothing about the columns and flew straight
   through them. The Coop had no cover at all, and three files kept a
   copy of the generic one.

   Now the WHERE and the WHEN live here, once, and a level only says WHAT
   things look like. The geometry is the game's own, at one scale:

     k        = h / 270, the card's height over the field's
     lane     = rows 24..242 of the field (every level shares them)
     column   = 34 wide, gap 88 (between a bay's 104 start and 80 floor)
     doodad   = 26 across (BODY_R 13), at the field's X_START 116 of 480

   The one thing that is not true to scale is the SPACING: a card is about
   square and the field is 16:9, so at true spacing a card would show one
   column and a bit. Instead the columns come at the rate the field shows
   them - 480 / 226, a little over two to a screen - and pass at the rate
   a bay's start pace passes them (110 px/s over 226 px apart), so every
   card on the select marches in step whatever its width.

   THE DOODAD FLIES THE GAPS. Its height comes off the columns either side
   of it: level with a column's gap while it is inside that column,
   easing to the next gap across the open span, with a small flap-and-fall
   on top. It can never touch a column, on any card at any size.

   A LEVEL'S COVER is a `COVER` object on its art module. Cover.draw calls
   its painters in this order, and every one gets the scene `S` (below):

     back(ctx, S)          REQUIRED. The whole card: wall, scenery, set
                           pieces in the distance. S.s is the lane's
                           scroll, for parallax (S.s * 0.25 for a wall).
     pillar(ctx, x, y, w, h, end, p, S)
                           One half of one column, x..x+w by y..y+h. `end`
                           is 'top' (hangs from the ceiling; its cap is at
                           the bottom, y + h) or 'bottom' (stands on the
                           floor; its cap is at y). `p.i` is the column's
                           own index - pick variants off it, never off x,
                           or a column changes as it slides.
     ceiling(ctx, S)       The band S.y..S.top, over the columns' ends.
     floor(ctx, S)         The band S.floor..S.y+S.h, ditto.
     props(ctx, S)         THE LEVEL'S OWN HAZARD, in the lane and behind
                           the doodad: a jet, a flame, a steam column,
                           spikes, a sauce arc. Put it in S.spans - the
                           open space between neighbouring columns - with
                           EVEN span.i: the odd spans carry the drop. A
                           span is only about 27 px wide on a side card
                           (41 on the big one), so size a prop off
                           sp.x1 - sp.x0 rather than the level's own px.
     drop(ctx, d, S)       The falling thing, centred on d.x, d.y. It lets
                           go of the ceiling as its span comes in on the
                           right and lands before it reaches the doodad;
                           d.f runs 0..1 down the fall. It is clipped to
                           the rows below S.top, so it slides out of the
                           ceiling and never paints over the band.
     over(ctx, S)          Over the drop and still under the doodad: a fog
                           that hides what falls through it but never the
                           player.
     -- the doodad, painted here, the same on every card --
     front(ctx, S)         Over everything: the room's light, a haze, a
                           lens, and a readout if the level has one (big
                           cards only - S.big).

   Every painter but `back` may be left out. A level without `pillar` gets
   plain columns in its PREVIEW colours. Paint whole pixels, read sizes off
   S rather than the card's w and h, and draw nothing outside S's box -
   the caller clips, and so does Cover.draw. Props and drops are painted
   after the bands (in a bay the spikes go first), so a floor hazard
   stands on S.floor - 1 and its stain goes on the lane above it. Anything
   that cycles - a mister, a beam, a pop - keys off S.t, never S.s: the
   speed depends on the card's width, so a cycle keyed to the scroll
   would blink at four different rates. A painter may use its level's
   baked tiles: no cover is drawn before its level has been built (the
   TV measures its reruns inside its own build, after every level it
   reruns). It must never roll dice or change anything outside the card -
   the TV paints covers in the middle of a run.

   COVER.ink is the doodad's outline (dark brown if left out), and
   COVER.halo a wash behind it for a wall too close to its colour: a
   colour, or { colour, pad, strength } (a pad of 3 on the big card,
   scaled with it, and strength 5 if left out; strength on Tint's 0..16).

   THE SCENE, S:
     x y w h t big     the box and the clock as handed in
     k                 true scale, h / 270
     top floor lane    the lane's rows on the card (top..floor), and its depth
     s speed           how far the lane has slid (px) and how fast
     pw period gapH    a column's width, the spacing, a gap's height
     pillars           [{ i, x, gapY, gapH }] - x is the left edge, gapY
                       the gap's top row
     spans             [{ i, x0, x1, gaps, line }] - the open space between
                       column i and column i + 1. `gaps` is the two
                       columns' gap tops, [left, right]; `line` is
                       { top, bottom }, the rows the doodad's path can use
                       crossing this span. Something that rises from the
                       floor stays below line.bottom, something that
                       hangs from the ceiling above line.top, and the
                       doodad never meets it.
     doodad            { x, y, size } - centre and size, both whole
     drop              { i, x, y, f } or null
   Nothing here is typed against a card size: the covers are drawn at
   118x114 and 82x94 on the select, 96x72 on the TV's reruns and 72x44 on
   the stands' set, and every number above scales with the card.
------------------------------------------------------------------ */
'use strict';

var Cover = (function () {

  /* the field every level shares */
  var FIELD_H = 270, FIELD_W = 480, CEIL = 24, FLOOR = 242;
  var COLUMN_W = 34, GAP = 88, BODY = 26, X_START = 116;
  /* a bay's start: 110 px/s, columns 226 apart */
  var PACE = 110 / 226;
  /* how many columns a screen shows */
  var PER_SCREEN = FIELD_W / 226;

  /* Where the gaps sit, as a fraction of the lane, column by column. A
     fixed run, so every card reads the same; seven long, so it never
     falls into step with the odd and even spans; and no two neighbours
     more than a quarter of the lane apart, so the climb between them is
     one the doodad could make. With a gap of 0.40 of the lane the centres
     have to stay inside 0.20..0.80 - these keep 0.06 clear of that. */
  var GAPS = [0.50, 0.36, 0.58, 0.68, 0.44, 0.30, 0.56];

  /* where a column stands at t = 0, as a fraction of the card: just right
     of the middle, so the doodad starts out in open air */
  var PHASE = 0.56;
  /* where the drop is down by, as a fraction of the card: well short of
     the doodad, so nothing ever falls through it */
  var LAND = 0.45;
  /* the flap: one hop every HOP_T seconds */
  var HOP_T = 0.5;
  /* how far above the floor a drop's middle lands, in field rows: a
     drop is a dozen rows or so, so it lands sitting on the floor rather
     than half sunk into it */
  var DROP_REST = 7;

  function mod(n, m) { return ((n % m) + m) % m; }

  function scene(x, y, w, h, t, big) {
    var k = h / FIELD_H;
    var top = y + Math.round(CEIL * k), floor = y + Math.round(FLOOR * k);
    var lane = floor - top;
    var pw = Math.max(4, Math.round(COLUMN_W * k));
    var period = Math.max(pw * 3, Math.round(w / PER_SCREEN));
    var gapH = Math.max(8, Math.round(GAP * k));
    var speed = period * PACE;
    var s = t * speed;
    var size = Math.max(4, Math.round(BODY * k));
    var phase = Math.round(w * PHASE);

    function colX(i) { return x + phase + Math.round(i * period - s); }
    function gapY(i) {
      var c = top + Math.round(lane * GAPS[mod(i, GAPS.length)]);
      return clamp(c - Math.round(gapH / 2), top + 2, floor - 2 - gapH);
    }

    /* how high a flap lifts it (see the doodad's line below) */
    var hopH = Math.max(1, Math.round(gapH * 0.08));
    var half = Math.ceil(size / 2);

    var i0 = Math.floor((s - phase - pw) / period), i1 = Math.ceil((s - phase + w) / period);
    var pillars = [], spans = [], i;
    for (i = i0; i <= i1; i++) {
      var cx = colX(i);
      if (cx + pw > x && cx < x + w) pillars.push({ i: i, x: cx, gapY: gapY(i), gapH: gapH });
      var nx = colX(i + 1);
      if (nx > x && cx + pw < x + w) {
        var ga = gapY(i), gb = gapY(i + 1);
        var ma = ga + gapH / 2, mb = gb + gapH / 2;
        spans.push({ i: i, x0: cx + pw, x1: nx, gaps: [ga, gb],
                     line: { top: Math.floor(Math.min(ma, mb) - half - hopH),
                             bottom: Math.ceil(Math.max(ma, mb) + half) } });
      }
    }

    /* THE DOODAD'S LINE. `m` is how near a column's edge it may come: its
       half-width and a pixel. Inside [column - m, column + pw + m] it holds
       that gap's middle; across the span to the next one it eases over. */
    var dx = x + Math.round(w * X_START / FIELD_W), m = half + 1;
    var j = Math.floor((dx - x - phase + s + m) / period);       /* the last column it reached */
    var a1 = colX(j) + pw + m, b0 = colX(j + 1) - m;
    var midA = gapY(j) + gapH / 2, midB = gapY(j + 1) + gapH / 2, cy;
    if (dx <= a1) cy = midA;
    else {
      var u = clamp((dx - a1) / Math.max(1, b0 - a1), 0, 1);
      cy = midA + (midB - midA) * u * u * (3 - 2 * u);
    }
    /* the flap: up quickly, down slowly, a quarter of a gap at most, which
       is still well inside the gap's margin of (gapH - size) / 2 */
    var hp = mod(t, HOP_T) / HOP_T;
    var hop = hopH * 4 * hp * (1 - hp);
    var doodad = { x: dx, y: Math.round(cy - hop), size: size };

    /* THE DROP rides an odd span: it lets go of the ceiling as the span's
       middle comes in at the right-hand edge and lands as it passes LAND */
    var drop = null;
    for (i = 0; i < spans.length && !drop; i++) {
      var sp = spans[i];
      if (mod(sp.i, 2) !== 1) continue;
      var mx = Math.round((sp.x0 + sp.x1) / 2);
      var f = (x + w - mx) / (w * (1 - LAND));
      if (f >= 0 && f < 1) drop = { i: sp.i, x: mx, y: top + Math.round((lane - DROP_REST * k) * f * f), f: f };
    }

    return { x: x, y: y, w: w, h: h, t: t, big: !!big, k: k,
             top: top, floor: floor, lane: lane, s: s, speed: speed,
             pw: pw, period: period, gapH: gapH,
             pillars: pillars, spans: spans, doodad: doodad, drop: drop };
  }

  /* THE DOODAD, the same block on every card: an outline, a warm body with
     a lit top edge, an eye and a beak. A level may give it a halo of its
     own colour (COVER.halo) if its wall is close to the block's. */
  function doodad(ctx, S, C) {
    var d = S.doodad, z = d.size, x0 = d.x - Math.floor(z / 2), y0 = d.y - Math.floor(z / 2);
    var ink = C.ink || '#20150c';
    if (C.halo) {
      var H = typeof C.halo === 'string' ? { colour: C.halo } : C.halo;
      var pad = H.pad === undefined ? Math.max(1, Math.round(7 * S.k)) : H.pad;
      Tint.rect(ctx, x0 - pad, y0 - pad, z + pad * 2, z + pad * 2, H.colour, H.strength === undefined ? 5 : H.strength);
    }
    ctx.fillStyle = ink;       ctx.fillRect(x0, y0, z, z);
    ctx.fillStyle = '#c9873c'; ctx.fillRect(x0 + 1, y0 + 1, z - 2, z - 2);
    ctx.fillStyle = '#eab873'; ctx.fillRect(x0 + 1, y0 + 1, z - 4, 1);
    ctx.fillStyle = ink;       ctx.fillRect(x0 + z - 3, y0 + Math.floor(z / 2) - 1, 1, 1);
    ctx.fillStyle = '#f3cc84'; ctx.fillRect(x0 + z, y0 + Math.floor(z / 2), 2, 1);
  }

  /* a column for a level that has not painted its own */
  function plainPillar(ctx, x, y, w, h, end, p, S, Q) {
    if (h <= 0) return;
    ctx.fillStyle = Q.beam;      ctx.fillRect(x, y, w, h);
    ctx.fillStyle = Q.beamLight; ctx.fillRect(x + 1, y, Math.max(1, Math.round(w / 5)), h);
    ctx.fillStyle = Q.beamDark;  ctx.fillRect(x, y, 1, h); ctx.fillRect(x + w - 1, y, 1, h);
  }

  /* `art` is a level's art module. Draws its cover into x, y, w, h. */
  function draw(art, ctx, x, y, w, h, t, big) {
    var C = (art && art.COVER) || Coop.COVER;
    var Q = (art && art.PREVIEW) || Coop.PREVIEW;
    var S = scene(x, y, w, h, t, big), i;
    ctx.save();
    ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip();
    C.back(ctx, S);
    for (i = 0; i < S.pillars.length; i++) {
      var p = S.pillars[i], below = p.gapY + p.gapH;
      if (C.pillar) {
        C.pillar(ctx, p.x, S.top, S.pw, p.gapY - S.top, 'top', p, S);
        C.pillar(ctx, p.x, below, S.pw, S.floor - below, 'bottom', p, S);
      } else {
        plainPillar(ctx, p.x, S.top, S.pw, p.gapY - S.top, 'top', p, S, Q);
        plainPillar(ctx, p.x, below, S.pw, S.floor - below, 'bottom', p, S, Q);
      }
    }
    if (C.ceiling) C.ceiling(ctx, S);
    if (C.floor) C.floor(ctx, S);
    if (C.props) C.props(ctx, S);
    if (S.drop && C.drop) {
      ctx.save();
      ctx.beginPath(); ctx.rect(x, S.top, w, y + h - S.top); ctx.clip();
      C.drop(ctx, S.drop, S);
      ctx.restore();
    }
    if (C.over) C.over(ctx, S);
    doodad(ctx, S, C);
    if (C.front) C.front(ctx, S);
    ctx.restore();
  }

  return { draw: draw, scene: scene };
})();
