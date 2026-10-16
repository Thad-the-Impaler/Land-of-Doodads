/* ------------------------------------------------------------------
   Land of Doodads - THE DINING ROOM, the room itself
   Four bays in the same house as the Living Room, one wall over: the
   walnut table with the kitchen behind it, the white-oak boards under
   it, the charcoal bar cabinet by the half wall, and the plaster
   ceiling over all three. THE TABLE, THE FLOOR, THE BAR and THE CEILING
   each paint their own scene; what lives here is only what the four of
   them must agree on.

   WHY THIS FILE IS SMALL. The Living Room's five bays share a ceiling
   band, a floor and one lighting pass, because all five are the same
   view - across a room at couch height - and their room module owns
   all three. These four are not one view. The Table looks across a
   tabletop at the kitchen, the Floor is down at board level under the
   chairs, the Bar is up on a cabinet against a half wall, and the
   Ceiling is up against the plaster with the room folded beneath it.
   Their lids are four different things (a ceiling, the underside of a
   table, a ledge, the plaster) and so are their floors. A shared band
   here would be a band three of them painted over.

   What they DO share is the house. The same white shaker cabinets,
   the same steel fridge, the same crackle-glass pendants and the same
   white oak run through every reference photograph, so those pigments
   are published once, here - a fridge that is a different grey in two
   bays is two fridges.

   THE TIME OF DAY MOVES THROUGH THE ROOM, and the photographs are why.
   The Table and the Floor were shot in daylight, with the kitchen's
   shutters lit; the Bar and the Ceiling were shot after dark with the
   pendants on. So the room runs from afternoon at 3-1 to evening at
   3-4, and each bay lights itself for its own hour - which is the one
   thing this module deliberately does NOT do for them.

   Same discipline as every other level file: everything is generated
   and baked once at boot, and any shade laid over something that
   scrolls is a flat Tint or a baked alpha sheet, never a Dither.
------------------------------------------------------------------ */
'use strict';

var DiningRoom = (function () {

  /* The house's pigments. A bay keeps its OWN P for its own furniture
     and reads these for the things every photograph has in it. By
     convention a bay aliases this table as `H` (the house), so `H.steel`
     is visibly the house's and `P.plate` is visibly the bay's.

     The plaster, the crown and the lamp glass are the LIVING ROOM'S
     values, read off its table rather than retyped: it is the same
     ceiling (the Living Room's band was drawn off these very Ceiling
     photographs), and two creams for one ceiling would be the first
     thing anybody walking between the two rooms noticed. */
  var L = LivingRoom.P;
  var P = {
    /* the ceiling, shared with the Living Room */
    plasterLit:   L.plasterLit,
    plasterMid:   L.plasterMid,
    plasterDim:   L.plasterDim,
    plasterShade: L.plasterShade,
    crown:        L.crown,
    crownShade:   L.crownShade,
    vent:         L.vent,
    ventSlot:     L.ventSlot,

    /* the crackle-glass pendants - every Dining Room photo after dark
       has one in it, and so does the Living Room's lid */
    lampCore:     L.lampCore,
    lampGlass:    L.lampGlass,
    lampCrackle:  L.lampCrackle,
    lampDark:     L.lampDark,
    lampRod:      L.lampRod,
    lampGlow:     L.lampGlow,

    /* the white oak: the Living Room's boards, which run on through */
    oakLip:       L.oakLip,
    oakLight:     L.oakLight,
    oakMid:       L.oakMid,
    oakWarm:      L.oakWarm,
    oakGrain:     L.oakGrain,
    oakSeam:      L.oakSeam,
    oakKnot:      L.oakKnot,
    oakShade:     L.oakShade,

    /* the kitchen beyond: white shaker cabinets, cream walls, a grey
       tile splash and the steel of the fridge and the range hood */
    cabinet:      '#e4ddcc',
    cabinetLit:   '#f1ebdd',
    cabinetShade: '#c2b9a5',
    cabinetDeep:  '#9b927f',
    wall:         '#d3c9b4',
    wallShade:    '#b5ab96',
    steel:        '#a9adae',
    steelLit:     '#d3d6d4',
    steelShade:   '#7c8183',
    steelDeep:    '#555a5d',
    tile:         '#a8a59c',
    tileShade:    '#8a877f',

    /* the table, and the white of its base and the chairs */
    walnut:       '#6e4a2e',
    walnutLit:    '#8c6340',
    walnutHi:     '#a97b51',
    walnutDeep:   '#4b3120',
    paint:        '#ece6d8',   /* the white chairs and the pedestal */
    paintShade:   '#c9c1ae',
    paintDeep:    '#a39a86',

    /* the bar: charcoal distressed wood, and the grey-washed ledge */
    char:         '#2f2d2c',
    charLit:      '#46423f',
    charGrain:    '#5a5550',
    charDeep:     '#1d1b1a',
    ledge:        '#a7a29a',
    ledgeLit:     '#c6c1b8',
    ledgeShade:   '#7f7a73',

    /* the black of the bar stools and the pendant rods */
    iron:         '#24211f',
    ironLit:      '#4a4643',

    /* plants, which are in every photograph */
    leaf:         '#4f7a3a',
    leafLit:      '#7aa452',
    leafDeep:     '#2f4d24',

    /* the shutters' daylight, and the skylight's dusk */
    daylight:     '#f6f1e2',
    dusk:         '#2f4f8f',
    duskDeep:     '#1d3466',

    outline:      L.outline,
    void:         L.void
  };

  /* The playfield, for all four bays: the Living Room's numbers, which
     were the Coop's. Twelve bays of muscle memory say where the lid and
     the ground are, and this room changes what they are made of, which
     is enough to change at once. */
  var CEIL = LivingRoom.CEIL;
  var FLOOR = LivingRoom.FLOOR;

  /* the shortest plank stub allowed at either end, the Coop's number */
  var END_MIN = LivingRoom.END_MIN;

  /* The dust in the air. Afternoon dust in the two daylit bays is the
     sun catching it; the evening bays may hand PlayScene the Living
     Room's lamp-lit pair instead, through their own FX. */
  var AIR = { motes: '#f2ead6', motesHi: '#fffbef' };

  return {
    P: P, CEIL: CEIL, FLOOR: FLOOR, END_MIN: END_MIN, AIR: AIR,
    /* The Living Room's utilities, published again under this room's
       name so a Dining Room bay never has to reach across the hall for a
       positive modulo - and so the two rooms cannot grow two of them. */
    wrap: LivingRoom.wrap, hash: LivingRoom.hash,
    rowsFill: LivingRoom.rowsFill, rowsOutline: LivingRoom.rowsOutline,
    drawColumn: LivingRoom.drawColumn, glow: LivingRoom.glow,
    blitBelowCeil: LivingRoom.blitBelowCeil, ringOf: LivingRoom.ringOf,
    bakeShade: LivingRoom.bakeShade, ease: LivingRoom.ease, rgba: LivingRoom.rgba,
    paintOak: LivingRoom.paintOak, bakeCeiling: LivingRoom.bakeCeiling
  };
})();
