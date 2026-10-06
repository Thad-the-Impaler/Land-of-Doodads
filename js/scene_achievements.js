/* ------------------------------------------------------------------
   Land of Doodads - achievements
   One badge, one name, one line saying how, and on the right either the
   date it was earned or how far off it still is. Six to a page, paged
   the way the high scores table is paged, and reached from the title's
   third board.

   This screen is PURE READING. There is nothing to do to a row - you
   cannot buy an achievement or choose one - so no row is a target and no
   row says a verb. The only rectangles the game listens to here are the
   way back and the two that turn the page, which is why `hot` is short
   and why it is refilled inside drawFg beside the buttons that fill it.

   THE PAGE COUNT IS DERIVED, NEVER TYPED. There are twelve rows today
   and the roster is meant to grow - every new bay is one more line in
   the Achievements table and nothing else - so a hardcoded 2 would rot
   the first time a thirteenth row landed. See pages(). (The twelfth, the
   Fort's King, filled page two to six and needed nothing here: 12 / 6
   is still 2.)

   AND FOUR OF THE TWELVE ARE SECRET. Mosquitos, Do You Respect Wood?,
   Don't Worry, Be Capy and Long Live the King all name a Living Room
   bay, and the Living Room is a secret until it is earned: js/levels.js hands the level
   select three '? ? ?' placeholders rather than a shut room's bays, and
   the high scores screen pages Levels.shown() rather than playable()
   because merely READING a table would write its key into the save file
   and leave the secret sitting there. This screen is the newest place
   that could leak it, and the leak would be silent - a name, a how-line
   or an icon on a row nobody has earned yet. So a row that
   Achievements.visible() calls false draws the padlock badge, '? ? ?',
   and NOTHING ELSE. Not the name, not the method, not the progress, not
   the need. The only thing it admits is that it exists, which is exactly
   what the level select's three placeholder cards admit.
------------------------------------------------------------------ */
'use strict';

var AchievementsScene = (function () {

  var PER_PAGE = 6;               /* rows to a page                    */
  var ROWH = 32;                  /* the row pitch                     */
  var ROW0 = 46;                  /* the first row's top edge          */

  /* The panel: 46..433 across, 44..239 down. Six rows of 32 from 46 put
     the last row's stripe at 206..236, inside the panel's own bottom
     edge at 239 with two pixels to spare. */
  var PX = 46, PY = 44, PW = 388, PH = 196;

  /* Everything inside the panel is an OFFSET from the panel's left edge,
     because the panel slides on a page turn and a column pinned to an
     absolute x would walk out of it. The numbers are the measured ones
     minus PX: badge 54, name 80, bar 306 (120 wide, so it ends at 426),
     and 426 is also the right-aligned edge the dates and counters hang
     from. The widest how-line - SURVIVE 3 NOTIFICATIONS IN ONE RUN at
     203px - ends at 283, which is the 23px of air between the text
     column and the bar. */
  var BADGE_DX = 8;
  var TEXT_DX = 34;
  var BAR_DX = 260, BAR_W = 120;
  var RIGHT_DX = 380;
  var LOCK_DX = 374;              /* UI.padlock draws from its middle:
                                     374 spans 369..380, flush with the
                                     right column above it */

  /* The two option objects the badge blitter takes. They never change, and
     they were being rebuilt per row per frame - six objects a second times
     sixty for two booleans. */
  var DIM = { dim: true }, SECRET = { secret: true };

  var t = 0, scroll = 0;
  var page = 0;
  var slide = 0;

  /* The ids whose NEW tab has actually been PUT ON SCREEN this visit.
     The title's `n NEW` tab has to be honest, and "honest" means a tag
     is cleared because the player saw it and not because the player
     opened the screen: a freshly earned row sitting on page two must
     survive a visit that never turned the page. drawBg is the only code
     that knows which rows were drawn, so it is the code that fills this,
     and exit() is what spends it. */
  var seenNow = [];

  /* The two halves of the line under the panel, worked out on the way in
     because nothing on this screen can earn anything, so neither answer can
     change while it is up.

     `anyRetro` is whether any plate came out of history rather than out of
     play - those print '- - -' where the day goes, and the first half of
     the line says what the dash means. `anyCounting` is whether any row is
     still filling a bar that started from nothing, which is the whole
     reason the line exists: it is the one that answers "why does this say
     0 / 20 when I have been playing for weeks".

     They are asked SEPARATELY. They were one question, and that was the
     bug: the line only appeared when a dash was on screen, so a save that
     the first release had already stamped with real dates - which is every
     save that had refreshed once - got no dashes and therefore no
     explanation either, and the screen went on contradicting itself. The
     bars are the thing that needs explaining whether or not anything is
     dashed. */
  var anyRetro = false, anyCounting = false;

  /* The rectangles this screen drew, refilled inside drawFg and handed
     to Input by Game.render - BACK and the two paging boards, or nothing
     at all before anything has pointed. */
  var hot = [];

  /* Derived from the roster's own length, so twelve achievements are
     two pages of six and a thirteenth makes three, with nothing here to
     edit. Never below one: a modulo by zero in the paging code below
     would turn the arrow keys into a crash. */
  function pages() {
    return Math.max(1, Math.ceil(Achievements.total() / PER_PAGE));
  }

  /* ------------------------------------------------------- lifecycle */

  function enter() {
    t = 0;
    slide = 0;
    seenNow = [];
    page = 0;
    anyRetro = Achievements.retroCount() > 0;
    anyCounting = false;
    for (var r = 0; r < Achievements.list.length; r++) {
      var row = Achievements.list[r];
      /* a tally is the kind that starts from nothing; a probe reads a count
         the save was already keeping and needs no explanation */
      if (row.tally && !Achievements.earned(row)) { anyCounting = true; break; }
    }
    /* Arrive on the page the new thing is on. A player who comes here
       because the title said `1 NEW` is looking for one row, and the
       doodad select already makes the same promise by jumping the rail
       to a freshly opened stall. A secret row cannot carry a tag, so it
       cannot be the reason to turn the page either. */
    for (var i = 0; i < Achievements.list.length; i++) {
      var a = Achievements.list[i];
      if (Achievements.isFresh(a) && Achievements.visible(a)) {
        page = Math.floor(i / PER_PAGE);
        break;
      }
    }
  }

  /* Spending seenNow, and the one place the fresh flags are cleared.

     IT IS DONE ON THE WAY OUT, NOT ON THE WAY IN. Clearing in enter()
     would be a line shorter and would also mean the row that was earned
     ten seconds ago is not TAGGED on the only visit where the tag is
     the point - the player would arrive at the screen the title sent
     them to and find nothing gold on it. So the tag stays lit for the
     whole visit, and it is spent as the screen closes. */
  function exit() {
    /* the whole list in one call, so the save is written once rather than
       once per row - five rows banked out of history on a first boot all
       sit on page one, and that was five JSON.stringify and five
       synchronous writes inside the single frame of a scene swap */
    if (seenNow.length) Achievements.markSeen(seenNow);
    seenNow = [];
  }

  function update(dt) {
    t += dt;
    scroll += 7 * dt;
    slide = damp(slide, 0, 0.0005, dt);
    if (Game.locked()) return;

    /* the paging boards carry a:'left' / a:'right' and fall straight
       into the nav branch below, so only BACK needs a word here */
    var tg = Input.tapped();
    if (tg && tg.id === 'back') { Audio3.play('back'); Game.go(TitleScene, { menu: 2 }); return; }

    if (Input.nav('left') || Input.nav('right')) {
      if (pages() < 2) { Audio3.play('deny'); Screen.shake(1.2, 0.16); }
      else {
        var dir = Input.nav('left') ? -1 : 1;
        page = (page + dir + pages()) % pages();
        slide = dir * 24;
        Audio3.play('move');
      }
    }
    /* ENTER goes back as well as ESC. On a screen with nothing to
       confirm, the confirm key having no effect reads as a dead key. */
    if (Input.hit('back') || Input.hit('confirm')) { Audio3.play('back'); Game.go(TitleScene, { menu: 2 }); }
  }

  /* -------------------------------------------------------- drawing */

  /* YYYY-MM-DD, zero-padded, because the font has no lowercase and no
     comma-and-space month name would fit the right column anyway. */
  function pad2(n) { return n < 10 ? '0' + n : String(n); }

  function stamp(ms) {
    var d = new Date(ms);
    return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate());
  }

  /* The doodad select's tab, moved here unchanged: goldDark plate, a
     one-pixel gold rim, NEW in plain ink with no drop shadow because at
     9px tall a shadow closes the letters up. 23x9 fits the three glyphs
     (17px) with three pixels of air each side. */
  function drawNewTab(ctx, x, y) {
    ctx.fillStyle = UI.C.goldDark; ctx.fillRect(x, y, 23, 9);
    ctx.fillStyle = UI.C.gold;
    ctx.fillRect(x, y, 23, 1); ctx.fillRect(x, y + 8, 23, 1);
    ctx.fillRect(x, y, 1, 9); ctx.fillRect(x + 22, y, 1, 9);
    UI.text(ctx, 'NEW', x + 11, y + 1, { align: 'center', colour: UI.C.ink, shadow: null });
  }

  function drawBg(ctx) {
    Coop.drawMenuBackdrop(ctx, scroll);

    var x = PX + Math.round(slide);
    /* no `dither` on this panel: the Bayer cell is anchored in user
       space, and a panel that slides 24px in eased fractions would
       re-phase its own pattern every frame and boil */
    UI.panel(ctx, x, PY, PW, PH, { fill: '#1b120a', edge: UI.C.inkFaint, corner: UI.C.gold });

    var list = Achievements.list;
    for (var i = 0; i < PER_PAGE; i++) {
      var k = page * PER_PAGE + i;
      if (k >= list.length) break;
      var a = list[k];
      var ry = ROW0 + i * ROWH;

      /* a banded table reads down a column without a rule between every
         row, which at 32px pitch would be twelve more lines than the
         panel wants */
      if (i % 2 === 0) { ctx.fillStyle = '#22170d'; ctx.fillRect(x + 3, ry, PW - 6, ROWH - 1); }

      /* Three cached lookups, not three reads of the save: Achievements
         caches its two keys in module scope and Levels caches what a
         room's gate reached, so asking every frame costs nothing. It is
         asked every frame on purpose - IMP11 can be typed with this
         screen open, and a cached answer would leave the four secret
         rows padlocked until the player left and came back. */
      var vis = Achievements.visible(a);

      if (!vis) {
        /* The whole of the secrecy, and the one thing on this screen
           that could be got wrong without anybody noticing: the badge is
           the shared padlock plate, the name is three question marks,
           and the right column is a padlock. No name, no how-line, no
           bar, no need, no date - a shut row admits that it exists and
           nothing more, exactly like a shut room's three cards on the
           level select. */
        Badges.draw(ctx, a.icon || a.id, x + BADGE_DX, ry + 7, SECRET);
        UI.text(ctx, '? ? ?', x + TEXT_DX, ry + 6, { colour: UI.C.inkDim });
        UI.padlock(ctx, x + LOCK_DX, ry + 17, 1, UI.C.inkFaint);
        continue;
      }

      var done = Achievements.earned(a);

      /* 18px of badge at ry + 7 in a 32px row leaves 7px above and 7
         below: it is centred on the row, which also puts it on the optical
         middle of the two lines of text beside it. The dim tile is the
         object as a shadow of itself, so a locked row still says WHAT it
         is - that is the whole point of showing it. */
      /* a.icon, not a.id: the roster says which badge a row wears, and the
         two happen to agree for all twelve. A thirteenth row that borrowed
         another's art would otherwise ask Badges for an id it has never
         baked and be handed the padlock plate - on an EARNED row. */
      Badges.draw(ctx, a.icon || a.id, x + BADGE_DX, ry + 7, done ? null : DIM);

      var nw = UI.text(ctx, a.name, x + TEXT_DX, ry + 6,
                       { colour: done ? UI.C.gold : UI.C.ink });

      if (done && Achievements.isFresh(a)) {
        /* 185px for the longest name plus 6 of air plus the 23px tab is
           214 of the 220 the text column has. It fits, and it fits for
           the worst case rather than for the names that happen to be
           short. */
        drawNewTab(ctx, x + TEXT_DX + nw + 6, ry + 5);
        if (seenNow.indexOf(a.id) < 0) seenNow.push(a.id);
      }

      UI.text(ctx, a.how, x + TEXT_DX, ry + 17, { colour: UI.C.inkDim });

      if (done) {
        UI.text(ctx, 'EARNED', x + RIGHT_DX, ry + 6, { align: 'right', colour: UI.C.inkDim });
        var ts = Achievements.when(a);
        /* A DASH IS THE RETROACTIVE PLATES' DATE. Five of the twelve are
           read out of save keys the game already kept, so a save that has
           been played for weeks banks them on its first boot with this
           build - and the save can prove they were done but cannot say
           when. Achievements.init() records a 0 for exactly those, and
           1970-01-01 would be a lie where a gap is the truth. */
        UI.text(ctx, ts ? stamp(ts) : '- - -', x + RIGHT_DX, ry + 17,
                { align: 'right', colour: UI.C.inkFaint });
      } else {
        /* `p` here and not above the branch: an earned row draws no bar
           and reads no number, and asking for one ran POULTRY CATCHER's
           probe - eight doodads deep - sixty times a second for a figure
           nothing printed. */
        var p = Achievements.progress(a);
        /* A SCORE ROW SAYS 'BEST 20', NOT '20 / 26'. You PASS 25, so the
           bar has to finish at 26, and printing both numbers put two
           different targets on one row - on the screen whose whole job is
           to agree with itself. The bar still carries the fraction. */
        UI.text(ctx, a.best ? 'BEST ' + p.have : p.have + ' / ' + p.need,
                x + RIGHT_DX, ry + 6,
                { align: 'right', colour: UI.C.inkDim });
        /* The doodad select's price plate at 120 wide instead of 160: a
           frame, a dark well, a goldDark fill and one gold pixel along
           its top edge. It is the same recipe because it is the same
           idea - this is what the thing costs and this is how much of it
           has been paid. VOYAGER shows 0 / 1 and an empty bar, which
           looks blunt and is still true. */
        ctx.fillStyle = UI.C.inkFaint; ctx.fillRect(x + BAR_DX, ry + 17, BAR_W, 7);
        ctx.fillStyle = UI.C.darker;   ctx.fillRect(x + BAR_DX + 1, ry + 18, BAR_W - 2, 5);
        var fw = Math.round((BAR_W - 2) * clamp(p.have / p.need, 0, 1));
        if (fw > 0) {
          ctx.fillStyle = UI.C.goldDark; ctx.fillRect(x + BAR_DX + 1, ry + 18, fw, 5);
          ctx.fillStyle = UI.C.gold;     ctx.fillRect(x + BAR_DX + 1, ry + 18, fw, 1);
        }
      }
    }
  }

  function drawFg(ctx) {
    hot.length = 0;

    UI.heading(ctx, 'ACHIEVEMENTS', VW / 2, 8, 2, { colour: UI.C.gold });

    /* 142px of heading centred is 169..311; this is 83px at its widest
       (EARNED 12 / 12) ending at 474, so the two never meet. It is dim
       ink while there is anything left to earn and gold once there is
       not, which is the only congratulation this screen offers - and a
       full roster takes the results board's own 3Hz gold/ink blink,
       because a line that has stopped counting should say so rather than
       just sitting there one shade brighter. */
    var got = Achievements.earnedCount(), all = Achievements.total();
    var done = got >= all;
    UI.text(ctx, 'EARNED ' + got + ' / ' + all, VW - 6, 12,
            { align: 'right',
              colour: done ? (Math.floor(t * 3) % 2 ? UI.C.ink : UI.C.gold) : UI.C.inkDim });

    if (pages() > 1) {
      var lab = 'PAGE ' + (page + 1) + ' OF ' + pages();
      UI.text(ctx, lab, VW / 2, 30, { align: 'center', colour: UI.C.inkDim });
      /* Arrow-key signage, flanking the thing the arrow keys change, and
         drawn ONLY when nothing is pointing - the two boards below do
         the same job for a finger or a cursor, and a loose triangle
         beside a pressable one is the contradiction the high scores
         screen already settled. Never two arrow vocabularies at once. */
      if (!Input.pointing()) {
        var half = Font.measure(lab, 1) / 2;
        UI.chevron(ctx, VW / 2 - half - 10, 33, -1, 4, UI.C.gold);
        UI.chevron(ctx, VW / 2 + half + 10, 33, 1, 4, UI.C.gold);
      }
    }

    /* The way back and the two that page the panel. Drawn only once
       something has pointed, the same rule the scores table follows: a
       keyboard has ◀ ▶ and ESC and does not need three boards eating the
       margins to say so. UI.button paints and publishes in one call, so
       there is no way to draw one of these and forget to listen for it -
       which is also why there is nothing else in `hot`. */
    if (Input.pointing()) {
      UI.button(ctx, hot, 6, 4, 44, 32, { id: 'back', label: 'BACK', scale: 1 });
      if (pages() > 1) {
        /* 5..41 and 439..475: five pixels clear of the panel's 46 and
           433 at both ends, so neither board ever sits on the table */
        UI.button(ctx, hot, 5, 122, 36, 44, { id: 'prev', a: 'left', label: '◀' });
        UI.button(ctx, hot, VW - 41, 122, 36, 44, { id: 'next', a: 'right', label: '▶' });
      }
    }

    drawNote(ctx);

    /* nothing at all on a phone, where the arrows and the way back are
       boards you press rather than keys somebody has to be told about */
    UI.footer(ctx, '◀ ▶ PAGE    ESC BACK',
                   'CLICK ◀ ▶ TO PAGE    ESC BACK');
  }

  /* THE ONE LINE THIS SCREEN HAS TO SAY ABOUT ITSELF.

     Two things on it can look like faults, and both of them were reported
     as faults, so both get a sentence - the same sentence slot, because
     there is one strip and they are never equally urgent.

     THE PASSKEY, first, because it is the louder contradiction: IMP11
     opens every stall and every door, so the character select shows eight
     doodads while POULTRY CATCHER reads 1 / 3 and VOYAGER reads 0 / 1. The
     counting is right - a badge is a record of what was done and a cheat
     code does nothing - but the screen was asserting both halves and
     explaining neither.

     THE DASH, otherwise: five of the twelve are read out of save keys the
     game already kept, so they arrive EARNED with no day, while seven count
     things nothing was counting before and start their bars at zero. Two
     rows both saying COLLECT 20 behaved oppositely on one refresh, which
     is exactly what it looks like when a counter is broken.

     The strip is js/scene_scores.js's, copied: the same 28px on a keyboard
     and 18 on a phone, the same faint rule along its top. Measured against
     this screen - the panel's last row is 239, the keyboard rule lands at
     242 and the text at 246..252 with its shadow on 253, and UI.footer's
     own soft edge starts at 254. Nothing overlaps. It is NOT folded into
     the footer string, because UI.footer draws nothing at all on touch and
     a phone would then never be told any of this. */
  function drawNote(ctx) {
    var line = '';
    if (Doodads.masterKey()) line = 'THE PASSKEY OPENS DOORS. IT EARNS NOTHING.';
    /* BOTH conditions, because the line is only worth saying to somebody who
       was already playing when the badges arrived: a dash on the board means
       the save was carrying history, and a bar still filling means something
       started from nothing on the same day. A player who installed this week
       has neither, and telling them their bars count from the day they
       installed is noise. */
    else if (anyRetro && anyCounting && Achievements.since()) {
      line = '- - - MEANS ALREADY DONE.  BARS COUNT FROM ' + stamp(Achievements.since());
    }
    if (!line) return;
    var strip = UI.touch() ? 18 : 28;
    ctx.fillStyle = UI.C.darker;
    ctx.fillRect(0, VH - strip, VW, strip);
    ctx.fillStyle = UI.C.inkFaint;
    ctx.fillRect(0, VH - strip, VW, 1);
    UI.text(ctx, line, VW / 2, UI.touch() ? VH - 12 : VH - 24,
            { align: 'center', colour: UI.C.inkFaint });
  }

  /* No refresh(). Game calls it on whatever scene is up when IMP11 is
     typed, for screens that cached the unlock state - and this one
     caches nothing: drawBg asks Achievements.visible() per row per
     frame, so the four secret rows turn into real rows on the very
     next frame without being asked to. */
  return { enter: enter, exit: exit, update: update,
           drawBg: drawBg, drawFg: drawFg,
           targets: function () { return hot; } };
})();
