# Land of Doodads

A pixel-art side-scroller in the Flappy Bird family: the coop rolls past at a
steady clip, you flap to stay off the floor and off the nails, and the run only
ends when you hit something.

Once you are past 8 the rafters start shedding eggs, and one in a handful of
those is a deviled egg worth flying into. Get further and the coop fills up:
there are five doodads, and two of them have to be earned.

## Playing it

**[Play it in your browser](https://thad-the-impaler.github.io/Land-of-Doodads/)**
— served straight off this repository by GitHub Pages, no download.

**Or double-click `Land of Doodads.html`.** That is the whole game in one
self-contained file, so it opens straight off the desktop in any browser.

`index.html` is the same game with the source split into files, which is what
you want while editing it - but Chrome will not let a `file://` page load the
scripts next to it (it treats every local file as its own origin and blocks
them), so it needs to be served:

```bash
cd "~/Library/Mobile Documents/com~apple~CloudDocs/Land of Doodads"
python3 -m http.server 8123
```

then visit <http://localhost:8123>. Safari and Firefox will open `index.html`
directly without a server; Chrome will not.

After changing anything under `js/`, `css/` or `Assets/sprites/`, rebuild the
single file with:

```bash
python3 tools/build_single_file.py
```

## On a phone

Open the [play link](https://thad-the-impaler.github.io/Land-of-Doodads/) and
turn the phone sideways - 480x270 is a landscape shape and the game says so if
you are holding it upright.

Touch does not have its own path through the game. A finger produces the same
actions the keys do, so every screen behaves as it always has and the on-screen
pads are drawn from the very same table the game listens to, which is why what
you see and what it responds to cannot drift apart.

| | |
|---|---|
| In a run | **tap anywhere** to fly; the `◀ ▶` pads bottom-left to move; `II` top-right to pause |
| In a menu | `◀ ▶` to move, **tap anywhere else** to choose, `BACK` bottom-right |
| Entering initials | `◀ ▶` to pick a letter, `▲ ▼` to change it, `SAVE` |

The pads stay hidden until a finger actually touches the screen, so nothing
changes on a desktop. Pepper's dash works by double-tapping the `▶` pad, the
same gesture as double-tapping the key.

## Controls

| | |
|---|---|
| Fly | `SPACE` / `UP` / `W` - one press per flap, holding does nothing |
| Move back and forth | `LEFT` `RIGHT` / `A` `D` |
| Menus | arrows or WASD, `ENTER` to choose, `ESC` to go back |
| Pause | `P` |
| Sound | `M` |
| Fullscreen | `F` |
| Reset a level's table | `X` on the High Scores screen (asks first) |

The doodad you picked last is remembered.

## The doodads

Three are standing in the coop from the start:

| | | |
|---|---|---|
| **Cookie** | first to the feeder | soft, round, and full of nerve |
| **Pepper** | holds a grudge | oily green shine, short temper |
| **Gerald** | technically flightless | has not accepted this |

Two more are boarded up in their stalls until you earn them:

| | | |
|---|---|---|
| **Maximus** | **score 20** | a pug with two small wings and enormous confidence |
| **Billy** | **score 30** | a biro doodle on ruled paper that got out of the margin |

The doodad select screen shows all five from the first run, so you can see what
is in there and what it costs: a locked stall is timbered over with the price on
its plate, a padlock on the middle board, and the doodad itself asleep behind
the boards. The card underneath carries a progress bar towards it.

Unlocking happens **mid-run**, the moment the score ticks past - the run does not
have to end for it to count. The doodad then moves into the coop on the title
screen and gets a `NEW` tab on its stall until you have looked at it.

The score that matters is the highest you have ever reached, with any doodad, on
any level. It is kept separately from the high score tables, so resetting a table
with `X` never takes a doodad away again.

### The master passkey

Type **`IMP11`** on any screen and every doodad opens at once. It takes effect
where you stand: stalls unboard themselves on the select screen, and on the title
screen the new doodads walk straight into the coop.

It is stored as its own `passkey` flag rather than by inflating the score you have
reached, so the "highest ever" figure stays honest and turning it back off later is
one line. Keys that are part way through the code do not also do their normal job -
without that, typing it would mute on the `M` and pause on the `P` - but pressing
`M` or `P` on their own still works as always.

To take it back off, in the browser console:

```js
localStorage.removeItem('doodads.passkey'); location.reload();
```

## The levels

**THE COOP** (1-1) is open from the start. **THE GARDEN** (1-2) opens once you have
reached **30** in the Coop, or with the master passkey. Its card sits on the level
select from the first run showing the padlock, what it costs and how close you are -
a level you cannot see is a level nobody chases.

A level's art is a module of its own (`js/coop.js`, `js/garden.js`) implementing a
shared contract, and `js/scene_play.js` never names one. Both grow the same five
kinds of thing, themed differently:

| | THE COOP | THE GARDEN |
|---|---|---|
| pillars | plank columns | bamboo stakes, with short thorny vines off the sides |
| spikes | bent nails, from the start | mint sprouts, past **15**, and long |
| falling | eggs, past 8 | tomatoes, past **7** |
| the hot one | deviled egg | hot pepper |
| dressing | feed, feathers, bedding | bark chips, fallen leaves, a paver |
| the rare one | - | **a succulent in a pot** |

### Pepper's dash

Double-tap `RIGHT` or `D` and Pepper throws herself forward. Anything **falling**
that she meets is knocked out of the air, the same way the spicy power-up cooks
one - but pillars and mint are not, and since the world comes at her from the
right, a dash carries her *into* whatever is coming. Meeting a pillar sooner is
what the move costs.

There is no sprite for it; she just beats her wings hard. A gauge in the top
left says whether it is back yet - it takes a second and a half.

Only a **fresh** press counts toward the double-tap, so holding a direction can
never trigger it.

### Gerald's hunger

Gerald has a **hunger**:
power-ups within 110 pixels drift to him, faster the closer they get, and he
holds his mouth open while he has hold of one. Only power-ups - the hot drop
and the succulent. Ordinary eggs and tomatoes are left well alone, because a
magnet that drags hazards into you is a curse rather than a gift.

A succulent pulled this way lifts clean out of its pot and comes to him,
trailing soil, leaving the empty pot standing on the bed.

### The succulent

A potted succulent occasionally sits on the ground in the Garden, glowing a cool
jade that nothing else in the level wears. Fly into it and it buys back one mistake.

The next thing that would have ended the run instead spends it: the screen washes
mint, the doodad blinks for a moment and **keeps flying**. It is not moved out of
trouble - moving it can always put it somewhere worse - the trouble is taken out of
the world around it instead, so you are never revived into the pillar that just got
you. You can hold two at a time; taking a third when the pot is full pays out points.
They are deliberately rare - roughly one bay in thirty-five, and never two close
together.

## Eggs

Reach **8** in THE COOP and the rafters start letting go. An egg tips off up
ahead with a puff of straw, drifts down the whole height of the coop and bursts
in the bedding; the spot it casts on the hay tells you where it is. Touching one
ends the run like anything else.

Roughly one egg in fourteen is a **deviled egg** - a glowing, paprika-dusted
half that is the only thing in the coop worth flying *into*. Catching one sets
the run on fire for about six and a half seconds:

* the coop runs about half again as fast,
* every plank is worth **double**,
* and ordinary eggs cook on contact instead of ending the run, which is the
  only reason the extra speed is a reward rather than a punishment.

A gauge under the score counts the heat down and blinks when it is nearly out.
Catching a second one while the first is still burning tops it up.

Everything about them is tuned in `tune` on the level in `js/levels.js` -
`eggScore` is the score they start at, and a level that leaves it out never
sheds any.

## High scores

Every level keeps an arcade-style top ten. A new table starts with a few low
scores set by the doodads themselves (Pepper 12, Cookie 7, Gerald 2) so there
is something to chase from the first run.

* **During a run** the line under your score shows the next entry to beat
  (`NEXT PEP 12`) and flashes `PASSED ...` as you overtake each one.
* **Make the board** and the game-over screen asks for three initials: type
  them, or use up/down to change a letter and left/right to move. The table
  beside it shows where you will land as you type. Enter saves; Escape saves
  too, so a score is never lost by accident. Your last initials are offered
  next time.
* **High Scores** on the title screen shows the full table for each level,
  with each doodad's personal best along the bottom. Personal bests also show
  on the doodad select screen.
* `X` on the High Scores screen resets that level's table back to the
  doodads' starting scores. Personal bests are kept.

Everything - scores, personal bests and which doodads you have earned - is
stored in the browser's local storage, so it all belongs to the browser it was
set in. None of it is shared between players or computers.

## What is in here

```
Land of Doodads.html  the built single file game - double-click this one
index.html            page shell: three stacked canvases
css/style.css         letterboxing and the pixel-perfect upscale
tools/trim_sprites.py prepares character frames from the source artwork
tools/build_single_file.py  bundles everything into Land of Doodads.html
Assets/sprites/       game-ready character frames (trimmed from Assets/Doodads)
js/
  core.js             constants, maths, save helpers
  font.js             the hand-plotted 5x7 bitmap font
  input.js            keyboard, edge triggered so flaps cannot be held
  audio.js            a small WebAudio blip synth (no sample files)
  screen.js           canvas layers, screen shake, ordered dithering
  assets.js           image loading
  doodads.js          the characters and how they are drawn
  coop.js             BACKYARD / THE COOP: tiles, obstacles, eggs, collision
  garden.js           BACKYARD / THE GARDEN: the same contract, grown instead of built
  levels.js           rooms and levels
  scores.js           top ten tables, personal bests, initials
  ui.js               boards, panels, chevrons, padlocks
  scene_title.js      the animated coop and the doodads living in it
  scene_levelselect.js  room carousel then level carousel
  scene_charselect.js doodad stalls
  scene_play.js       the run itself, plus initials entry and results
  scene_scores.js     the high score screen
  game.js             boot, scene manager, main loop
```

### How the pixel look works

Everything except the doodads is drawn into a fixed 480x270 canvas that is
scaled up by a whole number, so every pixel stays square: the backgrounds, the
obstacles, the menus and all the text (the font is plotted by hand, glyph by
glyph, rather than drawn by the browser).

Shading on anything that scrolls uses flat tints (`Tint.rect`). Ordered 4x4
dither patterns (`Dither.rect`) are kept for surfaces that hold still - boards,
panels, locked cards - because a dither pattern that moves a pixel at a time,
or a fixed one laid over a moving layer, flips a large share of its pixels on
every step and reads as flicker.

The doodads themselves ride on a second, full-resolution canvas stacked on top,
so they stay smooth against the pixelated world.

### Adding to it

* **A new level** - write an art module implementing the level contract and drop a
  level object into a room's `levels` array. `js/coop.js` and `js/garden.js` are the
  two worked examples; between them they cover every member. The contract is:
  `CEIL` `FLOOR` `END_MIN` `DROP_GRAV` `SPLAT_TIME`, the palettes `P` `FX` `PREVIEW`,
  the hazard warnings `WARN`, `build()`, `drawBackdrop` `drawCeiling` `drawFloor`
  `drawObstacle` `drawDrop` `drawDropSpot` `drawDropSplat`, `rectsFor`, and the
  generators `makePillar` `makeSpikes` `makeDrop` `makeLitter` (plus optional
  `makeBoon`). `P` is the level's own pigments and PlayScene never reads it; `FX` is
  the neutral effect palette it paints particles and the spicy wash out of, and
  `PREVIEW` is the handful of colours the level-select window uses.
  Give the level `unlock: { room, level, score }` to gate it behind a score on
  another level; leave it out and it is open from the start.
* **A new room** - replace one of the locked placeholder rooms in
  `js/levels.js`.
* **A new doodad** - drop the `Fall` and `Fly` artwork into
  `Assets/Doodads (Characters)`, add it to `DOODADS` in
  `tools/trim_sprites.py` and run that script: it trims and scales both frames
  into `Assets/sprites/` and prints the sprite metadata. Register the two
  frames in `js/assets.js` and add an entry to `LIST` in `js/doodads.js` with
  that metadata - `pivotX`/`pivotY`/`bodyR`/`footOffset` are measured from the
  art so every doodad is drawn, stood up and collided at the same size.
  Add `unlockAt: <score>` and a `lockedAbout` pair to gate it; leave both out
  and it is simply there from the start. `title: { role, r, homeX, homeY }`
  says how it behaves in the coop on the title screen - `perch` hops between
  the perches, `patrol` flies a figure of eight (`spanX`/`spanY` size it), and
  `walk` stomps the hay and keeps trying to fly. The select screen lays itself
  out from `LIST`, but its five bays are sized to fit 480 pixels: a sixth
  doodad needs new numbers at the top of `js/scene_charselect.js`.
* **Traits and abilities** - `ability` is the name shown on the select card.
  A doodad whose ability actually does something sets `abilityLive: true` (the
  card then shows a star instead of a padlock) and `abilityAbout`, two lines
  that replace its flavour text. The ability itself is a *field* PlayScene
  reads, not a check on the doodad's id - Gerald's is `pull`, his reach in
  pixels - so the next one is another field rather than another branch.
  Abilities so far: Gerald's `pull` (a radius) and Pepper's
  `dash: { speed, time, cool }`. `Input.doubleTap(action)` is there for any
  ability that wants a gesture rather than a key.
  A doodad may also have extra sprite frames: add the artwork, list it in
  `DOODADS` in `tools/trim_sprites.py` under a frame name, re-run the script
  (it crops every frame of a doodad with one shared box, so **adding a frame
  changes that doodad's sprite metadata** and the printed block must be pasted
  back), register it in `js/assets.js`, then ask for it by name in
  `Doodads.draw(..., 'eat', ...)`. A doodad without that frame falls back to
  its neutral one.
* **Another pickup** - the deviled egg is the pattern to copy: `Coop.makeEgg`
  builds it, `rectsFor` gives it a box, and `PlayScene.collide` decides whether
  a box is something you hit or something you catch.
