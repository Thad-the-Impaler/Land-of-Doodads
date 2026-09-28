# Land of Doodads

A pixel-art side-scroller in the Flappy Bird family: the coop rolls past at a
steady clip, you flap to stay off the floor and off the nails, and the run only
ends when you hit something.

Once you are past 8 the rafters start shedding eggs, and one in a handful of
those is a deviled egg worth flying into. Get further and the coop fills up:
there are seven doodads, three of them have to be earned - and one is not
for sale at all.

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

## Pointing at it

There are two rules, and between them they are the whole thing:

> **In a run, a tap anywhere flies.**
> **Everywhere else, you tap the thing itself - and the lit thing says what
> pressing it does.**

That is why the chosen doodad's nameplate reads `TAP TO FLY` and the level card
reads `TAP TO PLAY`. Nothing has to be read off a footer, so on a phone there is
no footer: a strip repeating the buttons as words, directly underneath the
buttons, was half of what made the old screens contradict themselves.

| | |
|---|---|
| In a run | **tap anywhere** to fly; the `◀ ▶` pads bottom-left to move; `II` top-right to pause |
| Paused | **tap anywhere** to carry on, or `QUIT TO LEVELS` |
| In a menu | **tap what you want.** One tap chooses it, and a second tap on the chosen one goes |
| Entering initials | `▲` and `▼` sit directly above and below each letter; `SAVE` |

There are no arrow pads on a menu any more, and no screen-wide "tap anywhere to
confirm". Both were the same mistake: the arrows contradicted the list they
pointed at, and tapping the doodad you wanted started a run as whoever the
invisible cursor happened to be on. **A tap that lands on nothing is free.**

A triangle now appears only inside a raised pad, and only ever means *move this
way* - the loose ones that used to flank a name, mark a chosen row or sit in a
strip of hint text are gone, along with `UI.chevronV` and `UI.marker`.

Neither touch nor the mouse has a path of its own. A finger and a cursor produce
the same actions the keys do, so every screen behaves as it always has, and the
rectangles the game listens to are the rectangles it just drew - see
`UI.button`, which paints a board and registers it in one call that cannot be
split in half. **A click is simply a one-fingered tap that can also hover**, so
a mouse plays the game exactly the way a phone does, and a board lights under
the cursor, which is the one thing a finger cannot do. Holding the button down
works like a thumb: slide off a movement pad and it lets go, slide onto the
other and it takes over.

A keypress hands the screen back to the keyboard - the pads go away and the hint
strip returns - so a desktop visitor who never touches the mouse sees exactly
what they always did. **A phone, though, is treated as a phone from the first
frame** (`matchMedia('(pointer: coarse)')`, or `?touch=1` to force it), because
the first screen it ever drew used to be captioned for keys it does not have.

**On a phone**, open the
[play link](https://thad-the-impaler.github.io/Land-of-Doodads/) and turn the
phone sideways - 480x270 is a landscape shape and the game says so if you are
holding it upright, from the first frame and with the menu underneath deaf while
it does. Every doodad's ability is passive, so there is no gesture to learn and
nothing extra to reach for.

Add `?hit=1` to the URL to outline every rectangle the game is listening to.
It is the cheap check on the one rule all of this rests on: every red box should
sit on something that looks pressable, and everything that looks pressable
should have a box.

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

The keys never go away: clicking is an addition, not a mode. The doodad you
picked last is remembered.

## The doodads

Three are standing in the coop from the start:

| | | |
|---|---|---|
| **Cookie** | first to the feeder | soft, round, and full of nerve |
| **Pepper** | holds a grudge | oily green shine, short temper |
| **Gerald** | technically flightless | has not accepted this |

Three more are boarded up until you earn them, and a fourth until you find him:

| | | |
|---|---|---|
| **Maximus** | **score 15** | a pug with two small wings and enormous confidence |
| **Billy** | **score 25** | a biro doodle on ruled paper that got out of the margin |
| **Inari** | **nine succulents** | a grey cat, mildly disgusted, who let herself in |
| **Saddam** | **find him** | a crawfish the size of a plum, waiting behind the bamboo |

Not every price is a score. Inari costs **nine succulents**, the spare life the
levels grow - the Garden's potted plant, and the Deck's pot, the Canopy's
pomegranate and the Construction Zone's heart of junk with it - so she is earned
by going and getting something rather than by surviving longer, and it is what
she is worth, because what she brings is a spare life of her own.

Saddam has no price - his stall just says `HE'S HIDING. CAN YOU FIND HIM?`
**He is behind the tenth stake in THE GARDEN**,
with just enough of himself showing over the top of it to be noticed, and the
only way in is to fly close enough to touch him - which means hugging the
bottom edge of a gap that would kill you nine pixels lower. His stall says
`HIDING` and his card says `HE IS NOT FOR SALE`, because there is no meter to
fill: you have met him or you have not. Miss him and the plank is gone for that
run; he will be behind the tenth one again next time.

The select screen shows every stall from the first run, so you can see what is
in there and what it costs: a locked stall is timbered over with the price on
its plate, a padlock on the middle board, and the doodad itself asleep behind
the boards. The card underneath carries a progress bar towards it, counting
whatever that particular lock counts.

The rail is longer than the screen. Five stalls are shown at a time and the row
slides as the cursor reaches the end, with a sliver of the next stall bleeding
in at each edge to say that it carries on - so the roster can grow without the
screen being redesigned around its length. It **slides in whole 4px steps, and
the stall pitch is a multiple of 4**, because the stalls are full of an ordered
dither anchored in user space: move one by a part-cell and the Bayer grid
re-phases against it and the timber boils.

Unlocking happens **mid-run**, the moment the score ticks past - the run does not
have to end for it to count. The doodad then moves into the coop on the title
screen and gets a `NEW` tab on its stall until you have looked at it.

The score that matters is the highest you have ever reached, with any doodad, on
any level. It is kept separately from the high score tables, so resetting a table
with `X` never takes a doodad away again.

Every one of them flies differently - see [Abilities](#abilities).

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

Five of them, and they are a chain: every one but the first is bought with a
score on the one before it, so the BACKYARD opens a bay at a time.

| | | opens on | |
|---|---|---|---|
| **THE COOP** | 1-1 | from the start | a DIY chicken coop the size of a barn |
| **THE GARDEN** | 1-2 | **25** in the Coop | neat rows, once, before the mint got its way |
| **THE DECK** | 1-3 | **20** in the Garden | the good furniture, under an apple tree |
| **THE CANOPY** | 1-4 | **25** in the Deck | up inside that tree, weaving between the branches |
| **THE CONSTRUCTION ZONE** | 1-5 | **25** in the Canopy | three years of deck materials, and the saws still plugged in |

Every card sits on the level select from the first run showing the padlock, what
it costs and how close you are - a level you cannot see is a level nobody
chases. A locked card names the level you have to score in, which is often the
card immediately to its left, still locked itself. The master passkey opens the
lot.

A level's art is a module of its own - `js/coop.js`, `js/garden.js`,
`js/deck.js`, `js/canopy.js`, `js/construction.js` - implementing a shared
contract, and `js/scene_play.js` never names one. All five grow the same five
kinds of thing, themed differently:

| | pillars | spikes | falling | the power-up | dressing |
|---|---|---|---|---|---|
| THE COOP | plank columns | bent nails, from the start | eggs, past **8** | deviled egg | feed, feathers, bedding |
| THE GARDEN | bamboo stakes, thorny vines off the sides | mint sprouts, past **15**, and long | tomatoes, past **7** | hot pepper | bark chips, fallen leaves, a paver |
| THE DECK | bronze patio heaters | misters, past **14**, on a timer of their own | apples off the bough, past **7** | cinnamon apple | paint chips, windfall apples, a split log |
| THE CANOPY | silhouetted trunk sections | twigs, past **12** - nobody pruned up here | apples and oranges, past **6** | a lime, which *shrinks* you | fallen fruit, dry leaves, a broken twig |
| THE CONSTRUCTION ZONE | stacked lumber, strapped | buzzsaws, past **10**, and never off | beams off the lid, past **5** | a butane can | dropped screws, an offcut, sawdust |

Three of them also shed something **gold** - a golden apple in the Deck and the
Canopy, a golden gear in the Construction Zone. It falls two or three times as
fast as everything else, and it is the one thing in the game worth points for
being *caught* rather than for being threaded: `GOLD +5`, flat, because the heat
doubles what you fly past and not what you are handed.

### The spare life

A potted succulent occasionally sits on the ground in the Garden, glowing a cool
jade that nothing else in the level wears. Fly into it and it buys back one mistake.

The next thing that would have ended the run instead spends it: the screen washes
mint, the doodad blinks for a moment and **keeps flying**. It is not moved out of
trouble - moving it can always put it somewhere worse - the trouble is taken out of
the world around it instead, so you are never revived into the pillar that just got
you. You can hold two at a time; taking a third when the pot is full pays out points.
They are deliberately rare - roughly one bay in thirty-five, and never two close
together.

Four of the five levels grow one, and it is the same spare life every time, in
whatever the room has to hand: the Deck stands the identical pot on the boards,
the Canopy hangs a split **pomegranate** off the ceiling, and the Construction
Zone leaves a **heart of junk** on a pallet. Only the Coop grows none. They all
glow the same jade, because a colour that means *one more mistake* has to mean
it everywhere - and every one of them counts towards Inari's nine.

## Abilities

Every doodad has one, and **every one of them is passive**. An earlier version
gave Pepper a dash on a double-tapped `▶`, and it was a mistake worth
recording: it asked for a gesture mid-flight, with the same hand already busy
flapping, and it mostly fired late and drove her into a pillar. Nothing here
asks for an input of its own. Each one sits on a different axis, so no two
doodads are the same doodad with a different coat of paint.

| doodad | ability | what it does |
|---|---|---|
| COOKIE | **NERVE** | a plank threaded close scores **double** |
| PEPPER | **WATCHFUL** | she sees the gap coming and where the sky will land |
| GERALD | **HUNGER** | power-ups within 110 pixels drift to him |
| MAXIMUS | **TROT** | the ground cannot end him |
| BILLY | **PAPER-LIGHT** | he falls slow and flies soft |
| INARI | **SPARE LIFE** | she brings her own; the first mistake is free |
| SADDAM | **TAIL FLICK** | he bats down what falls, one at a time |

### Cookie's nerve

Every frame Cookie is inside a plank's width, the clearance between her and the
nearer edge of the gap is measured; the smallest of the whole pass is what
counts, so one brave frame is enough. Come within **7 pixels** and the plank is
worth two - four while the run is hot, because nerve and spicy stack. `NERVE +1`
is thrown where she took it, along with a spray off the edge she shaved.

Getting *inside* a plank disqualifies it instead. That is reachable - the grace
after a succulent save waves you straight through one - and a pass-through is
the opposite of a thread, so it must not read as the tightest one possible.

### Pepper's watchfulness

Two sight lines nobody else gets. Anything **falling** is drawn a dotted column
down to a bracket on the ground, so its landing spot is known the moment it
lets go - and the bracket goes hot for a spicy one. And the gap of the next
plank *still off the right of the screen* is held against the edge as a bracket,
brightening as it closes, so she can be at the right height before it arrives.
It eases out rather than blinking off in the stretch where the furthest plank is
already on screen and there is nothing left to foresee.

### Gerald's hunger

Power-ups within 110 pixels drift to him, faster the closer they get, and he
holds his mouth open while he has hold of one. Only power-ups - the hot drop
and the succulent. Ordinary eggs and tomatoes are left well alone, because a
magnet that drags hazards into you is a curse rather than a gift.

A succulent pulled this way lifts clean out of its pot and comes to him,
trailing soil, leaving the empty pot standing on the bed.

### Maximus's trot

He was never really flying. The floor stops him the way the rafters stop
everyone - he lands, kicks up bedding and can take off again - so the mistake
that ends every other run costs him a second instead. It is forgiveness, not
immunity: floor spikes still kill him, and a plank's lower half reaches the
ground, so he cannot simply run the level.

### Inari's spare life

She starts every run already holding **one** succulent, in any level - including
THE COOP, which grows none. There is no new machinery behind it: `lives: 1` is
the whole ability, and the succulent system already knows how to spend one, draw
it in the corner and shout about it. The caption is honest about which kind of
life went, so a save she never picked up reads `ONE LIFE SPENT` rather than
claiming a plant she never found.

It is called SPARE LIFE and not NINE LIVES, which is what a cat is owed and
would have had the player expecting eight more saves than the code hands out.

It is deliberately the same shape as what she costs. Nine of them buys her out
of the stall; she hands one back at the start of every run after that.

### Saddam's tail flick

The mirror of Gerald's hunger, and the only other ability that does anything
about what falls out of the sky: the hunger drags power-ups **in**, the tail
knocks hazards **out**. A crawfish tail is the fastest thing on him, so it is
the part that gets there: anything falling that comes within **28 pixels** is
batted out of the air before it lands.

**One flick takes one thing, and then the tail has to come back.** The cooldown
is 1.8 seconds, set against the rate the levels actually shed at: they floor out
around 1.1-1.5 seconds apart, so late on he gets about every other one and flies
the rest himself. Early, when they are 2.5 seconds apart, he still gets them all
- the ability thins out exactly as the pressure comes on, which is the right way
round, and two arriving together is precisely the moment he should not get both.
A quiet chirp and a few sparks say when the tail is back under him.

It is deliberately blind to power-ups. A crawfish that batted the hot pepper
away would be a curse wearing a gift's clothes, so the tail ignores exactly what
Gerald's hunger reaches for - the two abilities share one test and read it in
opposite directions.

Planks, mint and the ground are all still lethal, and so is every second
tomato.

### Billy's paper

A biro drawing weighs nothing. His gravity, terminal speed and flap are all
scaled down together, so a beat still lifts him about as far as anyone (45
pixels against the standard 48) - it just takes longer. Measured: **0.66
seconds** of hang against everyone else's 0.59. Gentler arcs, and more time to
change your mind halfway through one.

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
`dropScore` is the score they start at, and a level that leaves it out never
sheds any. Every level past the Coop sheds something: tomatoes, apples, fruit,
lumber. The machinery is the same in each, and only the art and the numbers
change.

### The lime

THE CANOPY sheds the one power-up that is not heat. Roughly one fruit in eleven
is a **lime**, and catching it does not set the run on fire - it shrinks you.

The doodad eases down to **62%** of its size over about half a second and stays
there for **7** seconds: the hitbox radius goes 11 -> 6.8, so the body you have
to thread through a gap narrows from 22 pixels across to under 14. Nothing else
about the run changes - no extra speed, no doubled planks, no cooking the fruit
you touch - the gaps are simply bigger than you are. Catching a second lime
while the first is still going tops the clock up, to a ceiling of 11.2 seconds.

It is the same gauge under the score, in the lime's own colour, and it blinks
the same way when the seconds are nearly gone. A drop is never both gold and
sour: the gold is taken first, so making it both would swallow the lime and owe
you an effect you never got.

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
  deck.js             BACKYARD / THE DECK: patio heaters, misters on a timer
  canopy.js           BACKYARD / THE CANOPY: dark trunks in dense foliage
  construction.js     BACKYARD / THE CONSTRUCTION ZONE: lumber, buzzsaws, a gear
  levels.js           rooms and levels
  scores.js           top ten tables, personal bests, initials
  ui.js               boards, buttons, panels, padlocks, the on-screen pads
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

* **A new level** - write an art module implementing the level contract, add its
  script tag to `index.html` (**after** the core, screen and doodad files and
  **before** `js/levels.js`, where the five existing levels sit) and drop a level
  object into a room's `levels` array. There are five worked examples; `js/coop.js`
  is the smallest and `js/garden.js` the one to read second, and between them they
  cover every member. The contract is:
  `CEIL` `FLOOR` `END_MIN` `DROP_GRAV` `SPLAT_TIME`, the palettes `P` `FX` `PREVIEW`,
  the hazard warnings `WARN`, the baked `tiles`, `build()`, `drawBackdrop`
  `drawMenuBackdrop` `drawCeiling` `drawFloor`
  `drawObstacle` `drawDrop` `drawDropSpot` `drawDropSplat` `drawPreview`, `rectsFor`,
  and the generators `makePillar` `makeSpikes` `makeDrop` `makeLitter` (plus optional
  `makeBoon`, which every level but the Coop now has). `P` is the level's own
  pigments and PlayScene never reads it; `FX` is
  the neutral effect palette it paints particles and the spicy wash out of, and
  `PREVIEW` is the handful of colours the level-select window uses - a level that
  paints its own `drawPreview` cover, as all but the Coop do, publishes them
  anyway. **The five obstacle type strings are the shared vocabulary and a level
  may invent none**: anything new is a *field* on a `pillar`, `spike`, `drop`,
  `litter` or `boon`, and the art module decides what it looks like and what boxes
  it has. Misters and buzzsaws are spikes; beams, apples and gold cans are all
  drops.
  Give the level `unlock: { room, level, score }` to gate it behind a score on
  another level; leave it out and it is open from the start. Gating it on a level
  that is itself gated is fine - the BACKYARD is a chain of five - and the locked
  card names whichever level it wants a score in.
* **A new room** - replace one of the locked placeholder rooms in
  `js/levels.js`.
* **A new doodad** - drop the `Fall` and `Fly` artwork into
  `Assets/Doodads (Characters)`, add it to `DOODADS` in
  `tools/trim_sprites.py` and run that script: it trims and scales both frames
  into `Assets/sprites/` and prints the sprite metadata. Register the two
  frames in `js/assets.js` and add an entry to `LIST` in `js/doodads.js` with
  that metadata - `pivotX`/`pivotY`/`bodyR`/`footOffset` are measured from the
  art so every doodad is drawn, stood up and collided at the same size.
  Add `lockedAbout` and a price to gate it - `unlockAt: <score>`,
  `unlockBoons: <count>` for succulents, or `unlockMeet: true` for one who is
  found in the world rather than bought; a doodad may state several and has to
  satisfy all of it, and one that states nothing is simply there from the
  start. A `unlockMeet` doodad needs a level to hide him: that is `meetAt: <n>`
  in a level's `tune`, naming which plank he is behind. The level says *where*
  and the roster says *who* (`Doodads.meetable()` hands back the first still-shut
  one), so neither has to know about the other and a second level can hide a
  second doodad by adding one number. `Doodads.requirement(d)` turns whichever
  lock it is into the price, the plate, the progress and what to call it, so the
  select screen never has to know which kind it is looking at - a third kind of
  price is a third branch in that one function. `title: { role, r, homeX, homeY }`
  says how it behaves in the coop on the title screen - `perch` hops between
  the perches, `patrol` flies a figure of eight (`spanX`/`spanY` size it), and
  `walk` stomps the hay and keeps trying to fly (two doodads may share a role -
  two perchers will not fight over one perch). The select screen lays itself out
  from `LIST` and slides, so it needs nothing new for a seventh doodad; if you
  do change `PITCH`, **keep it a multiple of 4** or every stall's dither will
  boil as the row moves.
* **Traits and abilities** - `ability` is the name shown on the select card and
  on the GET READY panel. A doodad whose ability actually does something sets
  `abilityLive: true` (the card then shows a star instead of a padlock) and
  `abilityAbout`, two lines that replace its flavour text. The ability itself is
  a *field* PlayScene reads, not a check on the doodad's id, so the next one is
  another field rather than another branch: `nerve` (a clearance in pixels),
  `watch` (a flag), `pull` (a radius), `trot` (a flag) and
  `light: { gravity, flap, fall }` (scales on the three numbers a doodad's
  flight is made of - ask `grav()`, `maxFall()` and `flapV()`, never the
  constants), `lives` (spare succulents a run starts with) and
  `flick: { reach, cool }` (a reach in pixels, and the seconds the tail needs
  before it can swing again - one flick takes one thing). Keep new ones
  **passive**: the one ability that needed a gesture during play was cut for
  fighting the hand that was already flapping.
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
