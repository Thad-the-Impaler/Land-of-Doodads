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

**Triangles mean different things to a thumb and to a keyboard, so there are
two vocabularies and a screen never shows both.** On a phone a triangle appears
only inside a raised pad, and only ever means *press this to move that way* - a
loose one beside a pad that did the same job was half of what made the old menus
contradict themselves. On a computer the loose ones come back, flanking the room
plate, the level card, the doodad's name, the ends of the stall rail and the
chosen menu row: there they are signage for the **arrow keys**, and they are not
pressable because the thing they point at is. The high scores table is the one
screen where the two could collide - its paging arrows become buttons the moment
anything points - so there the chevrons are drawn only when nothing is.

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

Five more are boarded up until you earn them, and one of those until you find
him rather than buy him:

| | | |
|---|---|---|
| **Maximus** | **score 15** | a pug with two small wings and enormous confidence |
| **Billy** | **score 25** | a biro doodle on ruled paper that got out of the margin |
| **Inari** | **nine succulents** | a grey cat, mildly disgusted, who let herself in |
| **Turd the Bird** | **three limes** | a small brown bird; the name was not his idea |
| **Saddam** | **find him** | a crawfish the size of a plum, waiting behind the bamboo |

Not every price is a score. Inari costs **nine succulents**, the spare life the
levels grow - the Garden's potted plant, and the Deck's pot, the Canopy's
pomegranate and the Construction Zone's heart of junk with it - so she is earned
by going and getting something rather than by surviving longer, and it is what
she is worth, because what she brings is a spare life of her own.

Turd the Bird is bought with **three limes**, which only THE CANOPY sheds, so
his card names the level: a price in a currency you have never seen is not a
price at all. There are four kinds of lock now - a score, a count of succulents,
a count of limes, and having found somebody - and `Doodads.requirement()` turns
any of them into the same price, plate and progress bar, so the select screen
never has to know which one it is looking at.

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
| **THE GARDEN** | 1-2 | **20** in the Coop | neat rows, once, before the mint got its way |
| **THE DECK** | 1-3 | **20** in the Garden | the good furniture, under an apple tree |
| **THE CANOPY** | 1-4 | **20** in the Deck | up inside that tree, weaving between the branches |
| **THE CONSTRUCTION ZONE** | 1-5 | **20** in the Canopy | three years of deck materials, and the saws still plugged in |

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
| THE CONSTRUCTION ZONE | stacked lumber, strapped | buzzsaws, past **6**, and never off - half the bays, then nine in ten | beams off the lid, past **5** | a butane can | dropped screws, an offcut, sawdust |

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

## The Living Room

The second room, and a secret until it is earned: **20** in the Construction
Zone opens the door and its first bay together, and until then the level select
shows three padlocked `? ? ?` cards where its bays will be. Inside it is after
dark, and **the ceiling kills** - the same as the floor. That is one rule for all
five bays, so the gaps never close quite as far as the Backyard's (82 or 80
rather than 78): overshooting upward used to bounce, and in here it ends the run.

| | | opens on | |
|---|---|---|---|
| **THE DESK** | 2-1 | **20** in the Construction Zone | three screens, four drawers, and something always ringing |
| **THE COUCH** | 2-2 | **20** in the Desk | movie night across the back of the sectional; nobody swept up the popcorn |
| **THE MANTLE** | 2-3 | **20** in the Couch | a switched-off flatscreen, and somebody sitting on the remotes |
| **THE WHITEBOARD** | 2-4 | **20** in the Mantle | nothing on it was ever erased; the magnets hold it all down |
| **THE FORT** | 2-5 | **20** in the Whiteboard | the whole room swallowed by a cardboard box fort, and the Cupmen have toy guns |

| | pillars | spikes | falling | the power-ups | the spare life |
|---|---|---|---|---|---|
| THE DESK | book towers | notifications out of the monitors, past **10** - they ring you, they do not kill | books, past **7** | a breath mint; a quarter is +5 | a coffee |
| THE COUCH | stacks of throw pillows | heaps of popcorn, past **12** | popcorn, past **4**, which never stops bouncing | hot cheddar popcorn; a marshmallow is +5 | a coaster |
| THE MANTLE | ledger stone | remotes, past **8**, firing beams; game controllers that wander, past **18** | dead pixels, past **6** | a lime-green volume key, which *shrinks* you; the capybara is +5 | a fresh battery |
| THE WHITEBOARD | bars of black marker | markers drawing lines, past **7** | magnets, past **5** | every one in the game, drawn in marker - the only lid that sheds the heat *and* the sour | a drawn succulent |
| THE FORT | stacks of corrugated panels | none - the Cupmen hold the floor | black foam biscuits, past **5**, rarer than any other bay's drops, and none while the King reigns | none off the lid - every gift is shot at you | an ammo bag full of yellow pellets |

**THE FORT** is the last bay, and the only one where something shoots back. The
room has been built over with a box fort of corrugated panels joined by black
foam discs, and the furniture of the four bays before it shows over the
cardboard roofline. From **12** the **Cupmen** - upside-down party cups,
painted by hand like the doodads - march the rug between nearly every pair of planks, and when you
fly toward one it turns, raises its gun, shows you three aim dots and fires:

| | from | gun | shoots |
|---|---|---|---|
| **Crimson Cupmen** | **12** | a blue pistol | yellow pellets that end the run, and now and then a **red** one that is the heat |
| **Green Cupmen** | **12**, rarer | a white shotgun | pairs of small **green** pellets - sours |
| **Silver Sentinels** | **20** | a SAW | bursts of three, yellow and red, three times the Crimsons' rate; they move like robots |
| **Golden Order** | **20** | a gold pistol | quick **silver** pellets that curve after you, and spinning **gold** coins worth +5 |
| **King Cupman** | **30**, once a run | none in hand | summons two floating guns; **bop him on the crown three times** |

The Cupmen are fair on purpose: they only fire at a doodad still ahead of them,
never from off screen and never at point blank, and the last moment of every aim
is frozen so the line you were shown is the line the pellet takes. They do shoot
with cardboard in the way - a pellet that meets a plank pops on it harmlessly.
Flying into a Cupman's side ends the run, but land on its head without being shot
and it topples over and is gone. The King takes three bops: he keeps pace with
the screen while the planks pass through him, every bop knocks a gold **crown**
out of his head, and when he falls he drops three more, the ordinary Cupmen come
back, and the badge **LONG LIVE THE KING** is yours. While he reigns the biscuits
stop falling, and only the odd Golden Order cupman still turns up.

## The Dining Room

The third room, the same house one wall over, and a secret until **20** in the
Fort opens it and its first bay together. It has five bays, and the first
four run from afternoon to evening, because that is how the photographs were
taken: the Table and the Floor in daylight, the Bar and the Ceiling with the
pendants on. The fifth is the dining-room television, and what time it is in
there depends on what is on.

**The lid is not one rule in here.** Each bay's lid is a different object, so
each bay says for itself whether it kills: the Table's ceiling, the Bar's ledge
and the Ceiling's plaster do, and the Floor's lid - the underside of the table -
only stops you, Backyard-style.

| | | opens on | |
|---|---|---|---|
| **THE TABLE** | 3-1 | **20** in the Fort | the walnut dining table with the kitchen behind it, and the ketchup is not on your side |
| **THE FLOOR** | 3-2 | **20** in the Table | board level under the chairs; crumbs everywhere, and something coming for them |
| **THE BAR** | 3-3 | **20** in the Floor | the charcoal bar cabinet against the half wall, after dark, with the humidifier on |
| **THE CEILING** | 3-4 | **20** in the Bar | up against the plaster, with the room folded in half beneath you |
| **THE TV** | 3-5 | **20** in the Ceiling | a hand's width from the set on the woven marble wall, and it is showing you |

| | pillars | the bay's own hazard | falling | the power-ups | the spare life |
|---|---|---|---|---|---|
| THE TABLE | stacks of white plates, bowls and mugs | squeeze bottles, past **8**, that lean, pop their caps and squirt a ribbon of ketchup across the bay | silverware, past **5**, tumbling | a spicy brownie; a folded paper crane is +5 | a yogurt volcano |
| THE FLOOR | white chair legs from above, black stool legs from below | the mop, past **10** | crumbs, past **4**, which bounce like the Couch's popcorn | hot sauce and lime juice, falling as drops | a fallen leaf |
| THE BAR | stacks of wooden spirit boxes and white footed planters | the humidifier's mist, past **10** | wine corks, past **5**: one hop, then they lie still | a vinyl record, which is the **spin** | a pinecone |
| THE CEILING | angled drywall soffits and skylight wells | the pole, past **14** | lint and dust, past **5** | a spicy feather and a spin feather | noodles, stuck to the ceiling |
| THE TV | columns of the woven marble, capped with the white frame | the set itself: its faults, past **10** | dead pixels, past **6**, the Mantle's | all four, ON the screen: a hot pepper, a lime, a spin record and a gold apple | a succulent, on the screen too |

**THE SQUEEZE BOTTLES** are clear plastic with the ketchup showing through, and
every one is squeezed on a clock keyed to where it is on the screen, the way
the Mantle's remotes fire - so the same bottle always squirts at the same place,
and the lean, the cap and the bead at the nozzle come well before the stream.
The ribbon arcs away from you, toward the next plank, and only the ribbon kills.

**THE MOP** rolls in at the left edge of the Floor and parks there. It is a
wall, never a hazard: you bump against its head and it does nothing to you
but pull - very slowly and very weakly, 12 pixels a second against your 116,
so that a doodad left to drift ends up against it and has to keep moving
forward. It pulls far harder on everything else: crumbs, the two droplets and
the leaves are dragged back toward it, past you, and whatever reaches the
roller is swallowed, which is what fills its tank.

**THE HUMIDIFIER** stands on the bar against the wall, always somewhere on the
screen. From **10** it starts misting, and it says so first: its ring lights,
it chuffs three times and it hisses, a second and a half before anything
happens. Then a plume comes out of it and the room fogs up for real - nearly
nine tenths white at its thickest, so the next plank is a ghost of an outline
and a cork is hard to see until it is close - holds for four seconds and
clears, and it comes round every 16 to 23 seconds. The fog never covers the two
edges of the room, the doodad, or the spot on the bar where each cork is going
to land, so it is a hazard you fly through on memory and on the spots, not a
coin toss.

**THE POLE** comes up through the Ceiling's mirrored floor now and then, hook
first, prods the ceiling three times as if it is looking for something, and
goes back down. It is a wall across the whole screen while it is up - but it
is only ever up in the right half, and it sinks as it comes toward you, so
hanging back to the left always gets you past it. The spin bounces off it.

**THE TV** is the one bay where the picture is the hazard. It opens on the set
switched off, the room reflected in the glass, and comes on the way an old tube
did - a dot, a line, the picture blooming out of it with a rainbow wobble - onto
a test card. From the first flap it is CHANNEL-SURFING THE GAME ITSELF: the
earlier bays as chunky 4:3 reruns, each in an old set's look (black and white,
sepia, a seventies tube, green phosphor, CGA, a worn tape), and the channel
number is the bay's code, so CH 11 is the Coop and CH 34 the Ceiling. At **8**
it finds CH 35, which is this bay, live: a feedback tunnel of the room and of
you, a frame late. The power-ups are broadcasts - they tune in out of a blob of
static and bounce up and down the picture like a screensaver - and you catch
them by flying through them, as anywhere else; a VOLUME bar says what you got.
From **10** the set develops FAULTS - snow, the vertical hold slipping, a
tracking tear, a ghost, the right of the picture collapsing, a channel surf -
and every one is named on the screen a second before it happens. At first they
stay inside the glass. At **16 they spill out**: from then on a fault happens to
the whole room and to you alike (a slip slips both, a tear tears both, so
nothing is ever drawn somewhere it is not), the doodad turns to pixel art for
the rest of the run, and from **20** the picture can go to mosaic. Die, and the
tube collapses to a line and a dot and goes dark.

### The spin

The room's new power-up, and the first that changes what a pillar *is*. A
record off the Bar's ledge or a purple feather off the Ceiling, and while it
lasts - six seconds - the doodad spins clockwise in a purple glow, and **a
pillar no longer kills it: it bounces off with a shower of sparks.** A column's
face throws it back the way it came at the room's own speed, the top of a
lower column is a trampoline and the underside of an upper one knocks it down,
so a spinning doodad is shoved along a pillar until it finds the gap. The
Ceiling's pole counts as a pillar for this. Nothing else changes: the spin is
only a picture, so flying feels exactly the same, and the floor, a killing lid
and everything that falls still end the run.

## The Kitchen

The fourth room, through the doorway from the Dining Room into the kitchen the
Table has been looking at all along, and a secret until **20** in the TV opens
it and its first bay together. Five bays, all after dark under the cans and the
island's amber pendants (the fridge lights itself, the cabinets take the
room's light through their open doors, and in the shut dishwasher the only
light is the camera's), and **the lid kills in all five** - a ceiling, the
underside of the uppers, the fridge's liner, a cabinet's top board, the
dishwasher's upper rack - so the gaps never close past 81. The last
is the room's finale: we followed the dishes through the kitchen, and the
dishwasher is where they are cleaned so the cycle can start again.

| | | opens on | |
|---|---|---|---|
| **THE ISLAND** | 4-1 | **20** in the TV | chin on the island's quartz, the whole kitchen across it, and the cooktop is on the move |
| **THE COUNTER** | 4-2 | **20** in the Island | the back counter under the uppers, and every machine on it is plugged in |
| **THE FRIDGE** | 4-3 | **20** in the Counter | inside the top compartment with the door swung shut; it is very cold in here |
| **THE CABINETS** | 4-4 | **20** in the Fridge | along the top shelf of the glass-front uppers, past the coffee gear and the good glasses - mind the good mugs |
| **THE DISHWASHER** | 4-5 | **20** in the Cabinets | sealed in the tub with the door shut, and the cycle has started |

| | pillars | the bay's own hazard | falling | the power-ups | the spare life |
|---|---|---|---|---|---|
| THE ISLAND | stacks of the red enamel Dutch oven, and the range hood's steel chimney with its glass canopy | the cooktop, past **7**: it comes past set into the quartz and throws a column of fire up at you | pans, past **4**: skillets, saucepans and non-stick, tumbling | clear home-style hot sauce; watermelon in lime juice (sour); a gold pan is +5 | a Glutathione sachet |
| THE COUNTER | stacks of end-grain cutting boards, and the glass-front uppers with their bar pulls | the six machines, past **6**, one at a time, each with its own move | knives, past **4**, point first | a Tabasco-style bottle; mixer beaters (the **spin**) | two spent espresso pucks |
| THE FRIDGE | frosted stacks of tubs, steel lunch boxes and foil trays, from both ends | the mist, past **8**, and the cold snap, past **12** | frozen eggs (the Coop's eggs, frozen ice-blue), past **5** | a frozen kimchi jar; frozen lime juice (sour); a frozen beef patty is +5 | a scoop of ice cream, in one of four flavours |
| THE CABINETS | nested ribbed tumblers and tulip glasses under a white dish, and the black mugs nested mouth-down from the cabinet's top | the let-go, past **6**: a stack of mugs rocks, chinks and drops, and its gap moves up under the shelf | glasses, past **4**, tumbling and breaking where they land | the Verve tumbler with its flame crest (the heat); the pineapple glass (sour); the orange origami fox (the **spin**); the wooden robot in gold is +5 (crows' gift) | the Smiski, glowing |
| THE DISHWASHER | the black square plates with the gold ring (a bowl or the pan among them), and nested tumblers hanging from the upper rack | the program, past **3**: the spray arms' jets throw you up and down, and the dishes come flying from in front | loose cutlery, past **4**; from the first WASH, tumblers, the glass tub, plates, bowls and the pan fly in from the right | an upturned hot sauce; a lime half (sour); a mixer beater (the **spin**); a spotless glass is +5 | a dishwasher tablet |

**THE COOKTOP** is the black glass set into the island, and it only comes past
now and then - about once every ten seconds at first, every six later. As it
comes in its rings glow and click and a dotted line climbs to exactly how high
the fire will go; then the ring under you throws a column of fire up off the
glass for half a second. Go over it. Anything that falls into a live column is
thrown back up: a pan goes up and back over your head, a power-up goes up and
forward, so a hot sauce dropped into the fire can be caught on the way up. Past
**14** a cooktop can light two rings at once.

**THE MACHINES** come past on the counter one at a time - the wall behind keeps
only the counter's other things, so a machine is never in front of its own twin
- each with its own warning the first time and its own move every time: the
espresso machine's wand hisses and blows a plume of steam up behind it; the
panini press lifts its lid and clamps it shut on anything flying low; the
Instant Pot whistles and puts a wall of steam up to just under the lid; the air
fryer counts down, slams its baskets out and blows you backwards; the microwave
on its shelf dings, opens its door and showers sparks; the ice cream maker pops
its lid and flings three rock-hard scoops in an arc. Every move is keyed to
where the machine is on the screen, so the same machine always goes off in the
same place.

**THE MIST** in the Fridge is a cold haze that is always there, and from **8**
banks of it roll through - thinner than the Bar's fog, but enough that the next
stack is a shape before it is a stack. The lid and the shelf's edge are never
fogged, and every frozen egg throws a crisp spot on the trim.

### The ice

From **12** in the Fridge, every twenty seconds or so the temperature drops. The
readout in the corner counts down to zero, the mist drains toward you, a ring of
ice closes in for a second and a half, and then you are **frozen solid**: a
block of ice round you, much heavier than a baby on your back - every flap lifts
you 30 pixels instead of 48 and you fall faster - until you have passed **three
more pillars**. It cracks at each one and breaks at the third. A death or a
spare life breaks it too. **The heat keeps the cold off**: catch the kimchi and
a cold snap that arrives while you are hot fizzles into steam.

### The let-go

From **6** in the Cabinets, a hanging stack of mugs ahead of you may **let go**.
It rocks, chinks and comes away from the cabinet's top with a crack of light
along it, then the whole stack drops through its own gap and lands on the stack
below - and **the gap moves**: as big as it was (the mugs nest a little tighter
as they land, so a hair bigger), but up under the top, which kills. Each stack
picks its own moment - as it comes in, or after it has been on screen a while -
and rocks for longer or shorter, but it always chinks first and always lands
far enough ahead to climb to. Climb on the chink, not on the landing. At first
only short stacks let go; from **14** any stack may, tall ones too and more
often, and from **24** two in a row. **The heat does not stop it**: while you
are hot the window is tighter, and never two in a row.

### The program

**THE PROGRAM** runs the Dishwasher. From **3** the pump primes, and the readout
at the top names each part as it starts - PRE-RINSE, WASH, RINSE, DRY, CLEAN.
At the end of CLEAN it beeps three times and starts again heavier: HEAVY, then
POTS+PANS. In WASH the spray arm under the lower rack turns and its jets throw
you up toward the upper rack's wires; in RINSE the arm under the upper rack
throws you down toward the lower one; in the HEAVY RINSE, about a minute in,
both at once. **A jet never kills by itself** - it carries you, and the way out
is to fly out of it, not to flap. What the jets knock loose comes **flying at
you from in front**, out of a splash at the right edge half a second first, and
bursts on any stack in its way. The detergent bursts into suds in every WASH,
DRY fills the tub with steam while the fan pulls you back, and CLEAN drains the
pool with a glug. Water beads on the lens too, and inside every bead the tub is
upside down - but a bead only ever turns over empty tub, never anything that
can hurt you.

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
| PEPPER | **WATCHFUL** | a `!` over whatever is about to hit her, a white dotted line laid on the room under what falls, hops or flies showing where it will really go - a falling thing's all the way down to a bracket on the floor where it lands - and a star in the gift's colour where the next one is due |
| GERALD | **HUNGER** | power-ups within 110 pixels drift to him |
| MAXIMUS | **TROT** | the ground cannot end him |
| BILLY | **PAPER-LIGHT** | he falls slow and flies soft |
| INARI | **SPARE LIFE** | she brings her own; the first mistake is free |
| SADDAM | **TAIL FLICK** | he bats down what falls, one at a time |
| TURD THE BIRD | **PINT-SIZED** | he is simply smaller, and a lime makes him smaller still |

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

Three marks, and each is one idea.

A **`!`** over anything loose that is going to hit her - an egg on its way down, a kernel mid-hop, a tuft of lint drifting her way, a Cupman's pellet - riding with it, from a little over a second out. The mark is honest: the level's own physics are run ahead on a copy of the thing, dice and all, and it lights only when that real path reaches where she is now. Move, and it goes out. Nothing for a thing that will miss her, nothing for a gift, nothing for a plain drop the heat would cook anyway.

A **white dotted line** under everything loose near her, laid on the room itself: it stands still against the scenery and scrolls with it, and the thing travels along it and eats it as it goes, the way her first dashes did. It is the thing's real route - the same forecast as the `!`, drawn. An egg's or a knife's drops straight down to where it lands, and a small bracket on the floor marks the spot; a kernel's or a crumb's runs down to its first touchdown and, once it is hopping, hops along the cushion for the next second and a half; lint's wanders down and a feather's sways; a Cupman's pellet's runs its flight line and a silver one bends after her; a scoop's arcs out of its machine. Up to three at once, the nearest first (and up to two gifts' lines besides, in the gift's colour). A line ends where its thing comes down, bursts or leaves the room. A falling thing's runs all the way down to its bracket on the floor, whichever side of her that is and whether or not it is about to hit her, just as her first dashes did; a hopping thing's and a pellet's run on until they are a little way behind her, and a pellet's stops just short of her while its `!` is up. A line stops sooner only where its thing would meet another loose thing, or be knocked sideways - off a plank's side or cap, out of a stove's blast - because beyond a collision nothing is promised.

And **a gift, announced in its colour** before it exists - red for spicy, green for sour, blue for a spare life, yellow for a bonus, purple for a spin: Pepper's own legend, the same on every bay whatever the room paints its pepper. A star in that colour on the lid, over the spot the next drop will let go of (up on the lid's own band when the score would otherwise be under it, so it never covers the digits), with a dotted line in the same colour hanging under it along the fall it will take, for up to about a second before it lets go (on the Couch and the Floor, where the drops come thick, often less: the next one is decided the moment the last one falls); a star at the right edge, at the height of a spare life still off screen; a star on a Cupman's gun when the pellet he has loaded is a red, a green or a gold. Once the gift is in the air its own line is drawn in its colour too, so the heads-up runs on until it is caught, and a soft blip marks the moment a star first appears. The next drop is decided up to 1.1 seconds early for everybody, with the same dice in the same order, so the odds and the rhythm are the ones every level was tuned on; the one thing that notices is the streak's helping hand, which counts a hot drop as on its way from the moment it is decided and so may wait those few moments longer to send its own. Only Pepper is told.

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
is 2.5 seconds, set against the rate the levels actually shed at: they start
around 2.2-2.5 seconds apart and floor out at 1.0-1.1, so early on he still gets
nearly all of them and late on he gets roughly one in three and flies the rest
himself. The ability thins out exactly as the pressure comes on, which is the
right way round, and two arriving together is precisely the moment he should not
get both.
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

### Turd's size

He is **0.7 of a normal doodad**, all the time, and that is the whole ability:
a hitbox 15 pixels across instead of 22, and a body drawn to match so what you
see is what the planks test. It is not a tuning number - it is the art. His
source drawing is 0.693 of Cookie's on the same canvas, and the sprite pipeline
normalises that away when it scales every frame to the same size, so the roster
entry puts it back.

What it is worth, in the only unit that matters - the room to time a flap in at
the tightest gap the game ever offers (78 pixels, in the Canopy), which is the
gap less your own width less the 48 pixels one flap lifts you:

| | room to flap |
|---|---|
| anyone else | **8px** |
| anyone else, with a lime | 16px |
| **Turd** | **15px** |
| **Turd, with a lime** | **21px** |

So he flies permanently with about what a lime buys everyone else, and a lime
on top of that takes him somewhere nobody else goes. The lime multiplies his
size rather than replacing it - 0.7 x 0.62 = **0.43**, a hitbox nine pixels
across - because being small is what he *is*, not something that happens to
him.

It costs him something, and deliberately: a smaller circle catches less, so a
succulent, a spicy drop or a lime is about a fifth harder for him to take, and
he has to hug a plank closer to meet anyone hiding behind it.

He is drawn small everywhere he stands beside another doodad - the stall rail,
the coop on the title screen, the little row on the high score table - because
it is what he is rather than a thing the run does to him. **Three limes** buys
him, and limes grow in one place only: THE CANOPY, roughly one falling fruit in
eleven. His locked card says so, because a player who cannot see where limes
come from cannot go and get them.

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
to thread through a gap narrows from 22 pixels across to under 14. It is 62% of
*its own* size, not a fixed target, which is why it compounds with Turd's - he
goes to 0.43 of a normal doodad rather than levelling with everyone else. Nothing else
about the run changes - no extra speed, no doubled planks, no cooking the fruit
you touch - the gaps are simply bigger than you are. Catching a second lime
while the first is still going tops the clock up, to a ceiling of 11.2 seconds.

It is the same gauge under the score, in the lime's own colour, and it blinks
the same way when the seconds are nearly gone. A drop is never both gold and
sour: the gold is taken first, so making it both would swallow the lime and owe
you an effect you never got.

## Sound

Every sound in the game is a couple of oscillators - a square wave, a filtered
noise burst, no files - which is what keeps the whole thing a handful of
scripts. `M` mutes, and the choice is saved.

There are three exceptions, all recordings. **An unlock plays one**, because
the moment a stall comes open is worth a voice rather than an arpeggio, and no
arrangement of square waves was going to be that; it fires for a doodad and a
level alike, and for the master passkey. **A ROOM coming open plays its own**,
louder, because that is rarer still - there is one score-gated room in the game
and you cross it once. It is keyed on the kind of thing that opened and not on
which room it is, so the day a second room is gated it will sound for that one
too; and when a single score opens a room and a bay together, which is exactly
what the Construction Zone's twentieth point does, the room wins the one slot
there is. **Cookie's nerve plays the third**, every time she shaves a plank
close enough to score double. That one is mixed well under the others - a
fanfare happens a handful of times in a save, a threaded plank happens every
couple of seconds in a good run.

The chiptune fanfare it replaced is still in the file and still wired up: if
the recording has not finished decoding, or the browser will not take it, or
the fetch fails, `play()` falls through to the synth. The biggest moment in the
game never goes quiet because of an asset. It is also one at a time - a score
that opens a level *and* a doodad in the same frame restarts the clip rather
than layering two of it.

The sources live in `Extra Sounds/` in the formats they arrived in - one is
Opus inside a CoreAudio container, which plays in nothing but Safari, and one
is the audio track of an `.mp4` - and `Assets/sounds/` holds the web-playable
copies the game actually loads, each trimmed of its silence and brought up to
about a -1.5dB peak. The single-file build inlines them as data uris the same
way it does the sprite frames, because a `file://` page may not fetch its
neighbours; `SOUND_ROLES` in that script is the one place a filename meets the
role it plays under.

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
* **High Scores** on the title screen has two tabs. **MY SCORES** is the full
  table for each level, with each doodad's personal best along the bottom.
  **EVERYONE** is the ten best runs anybody has flown on that level, from
  anywhere - arcade style, so one player can hold several places - with
  the device each was flown on (PHONE, TABLET or COMPUTER) and where your
  best stands along the bottom (`YOUR BEST: 2ND    37 PLAYERS`).
  Up and down switch tabs; personal bests also show on the doodad select
  screen.
* **Make your own table** and the run goes up to everyone's board as soon as
  its initials are saved, and the game-over screen shows where it landed
  (`EVERYONE: 3RD`). Offline, it waits and goes up next time. The first time
  an older save goes online, its whole table goes up with it.
* `X` on the High Scores screen resets that level's MY SCORES table back to
  the doodads' starting scores. Personal bests are kept, and everyone's board
  is not yours to reset.

Your tables, personal bests and which doodads you have earned are stored in
the browser's local storage, so they belong to the browser they were set in.
Only the runs on your tables go anywhere else: to a small server on Cloudflare's
free plan, with your initials, your doodad and a two-letter country. How it
works, and how to remove a fake score, is in `server/README.md`.

## What is in here

```
Land of Doodads.html  the built single file game - double-click this one
index.html            page shell: three stacked canvases
css/style.css         letterboxing and the pixel-perfect upscale
tools/trim_sprites.py prepares character frames from the source artwork,
                      and (its FOES pass) the Cupmen and their guns at one
                      shared scale, so a gun keeps its size against its cup
tools/build_single_file.py  bundles everything into Land of Doodads.html
server/               everyone's high scores: the Cloudflare Worker and its
                      database (see server/README.md)
Assets/sprites/       game-ready character frames and the Cupmen (trimmed from
                      Assets/Doodads (Characters))
js/
  core.js             constants, maths, save helpers
  font.js             the hand-plotted 5x7 bitmap font
  input.js            keyboard, edge triggered so flaps cannot be held
  audio.js            a small WebAudio blip synth, plus the one recording
  screen.js           canvas layers, screen shake, ordered dithering
  assets.js           image loading
  doodads.js          the characters and how they are drawn
  coop.js             BACKYARD / THE COOP: tiles, obstacles, eggs, collision
  garden.js           BACKYARD / THE GARDEN: the same contract, grown instead of built
  deck.js             BACKYARD / THE DECK: patio heaters, misters on a timer
  canopy.js           BACKYARD / THE CANOPY: dark trunks in dense foliage
  construction.js     BACKYARD / THE CONSTRUCTION ZONE: lumber, buzzsaws, a gear
  livingroom.js       LIVING ROOM: the room itself - ceiling, floor, pigments, the light
  desk.js             LIVING ROOM / THE DESK: book towers, ringing notifications
  couch.js            LIVING ROOM / THE COUCH: pillows, bouncing popcorn
  mantle.js           LIVING ROOM / THE MANTLE: ledger stone, remotes and their beams
  whiteboard.js       LIVING ROOM / THE WHITEBOARD: marker lines, tumbling magnets
  chalkboard.js       the Whiteboard's second art module
  cupmen.js           the Fort's Cupmen, their pellets and the King
  fort.js             LIVING ROOM / THE FORT: the box fort, biscuits, ammo bag
  diningroom.js       DINING ROOM: the house's shared pigments and the playfield
  table.js            DINING ROOM / THE TABLE: dish stacks, silverware, squeeze bottles
  floor.js            DINING ROOM / THE FLOOR: chair and stool legs, crumbs, the mop
  bar.js              DINING ROOM / THE BAR: spirit boxes, planters, corks, the humidifier
  ceiling.js          DINING ROOM / THE CEILING: soffits, lint, feathers, the pole
  tv.js               DINING ROOM / THE TV: the woven wall, the set, its reruns and its faults
  kitchen.js          KITCHEN: the house's quartz (and its marble painter), splash, steel and the playfield
  island.js           KITCHEN / THE ISLAND: Dutch ovens, the hood, pans, the cooktop's fire
  counter.js          KITCHEN / THE COUNTER: cutting boards, uppers, knives, six machines
  fridge.js           KITCHEN / THE FRIDGE: frosted stacks, frozen eggs, the mist, the cold snap
  cabinets.js         KITCHEN / THE CABINETS: the top shelf's coffee gear and glasses, mug stacks, the let-go
  dishwasher.js       KITCHEN / THE DISHWASHER: plate stacks, the spray arms' jets, flying dishes, the program
  levels.js           rooms and levels
  scores.js           top ten tables, personal bests, initials
  world.js            everyone's board: sending bests, fetching the top ten
  ui.js               boards, buttons, panels, padlocks, the on-screen pads
  badges.js           the achievement badges, baked once
  achievements.js     the achievements and how each is counted
  scene_title.js      the animated coop and the doodads living in it
  scene_porch.js      the second title screen: every bay as a row on the porch
  scene_stands.js     the third: a grandstand of every level's furniture, a seat for 30
  scene_levelselect.js  room carousel then level carousel
  scene_charselect.js doodad stalls
  scene_play.js       the run itself, plus initials entry and results
  scene_scores.js     the high score screen
  scene_achievements.js  the achievements screen
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
  **before** `js/levels.js`, where the twenty existing levels sit) and drop a level
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
  Beyond the contract there are optional hooks, and a level that leaves them out
  never meets them: `stepDrop` / `stepBoon` / `stepFoe` move one thing of the
  level's own each frame; `makeFoe` (from `tune.foeScore`) stands something in
  a bay that acts; `stepWorld(dt, obstacles, run)` runs once a frame for what
  belongs to the room rather than to one thing in it (the Bar's humidifier
  clock); `drawOverlay(ctx, obstacles, run)` is the last thing on the room layer,
  in front of everything that falls but behind the doodad (the Bar's fog, the
  Floor's mop). Four more are for a level that treats the whole PICTURE, the
  TV's: `drawBackdrop` is also handed the obstacle list and `run`, so a backdrop
  can paint things into itself before the pillars go over them;
  `stepScreen(dt, state, run)` runs in every state but pause - GET READY, the
  tumble and the results included - for a set that comes on and goes off around
  a run (a `cry` it writes outside play is played straight away);
  `postBg(ctx, run, state)` is the last word on the room layer and
  `postChars(ctx, run, state)` the last on the doodad's, for whole-frame
  treatments that must land on both alike (a mosaic, a vertical-hold slip, the
  colour going); and `drawFront(ctx, run, state)` is the first thing on the HUD
  layer, over the doodad and under every number the game puts up (a channel
  readout, snow on the doodad himself). A level keeps its per-run state in
  `run.ledger`, which is new
  every run, and talks back to the engine through a few of its keys: `warn`,
  `cry`, `shake`, `deed`, `pay`, `knock`, `holdDrops`, and `drift` and `wall`, which
  pull the doodad left and stand a harmless wall at the edge of the room (the
  mop). A pillar is something the spin bounces off; any other obstacle can ask
  to be by carrying `deflect` (the pole). A drop can land in its own voice with
  `landCry` (a fork clinks, lint lands without a sound).
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
