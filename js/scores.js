/* ------------------------------------------------------------------
   Land of Doodads - high score tables
   Every level keeps an arcade style top ten: three letter initials,
   the doodad that flew the run, and the score. A fresh table comes
   with a few low scores already on it, set by the doodads themselves,
   so there is something to chase on the very first run.
   Separately, each doodad keeps its own personal best per level.
------------------------------------------------------------------ */
'use strict';

var Scores = (function () {

  var SIZE = 10;

  /* the doodads' own entries on a brand new table */
  var HOUSE = [
    { name: 'PEP', score: 12, doodad: 'pepper' },
    { name: 'COO', score: 7, doodad: 'cookie' },
    { name: 'GER', score: 2, doodad: 'gerald' }
  ];

  /* The HATCHLING achievement is "pass the default high score", so the
     achievement roster has to be told what that score is. It asks here
     rather than carrying a 12 of its own: the default high score is not a
     number somebody chose for it, it is whatever the best of the doodads'
     own three entries happens to be, and the day this table is reseeded
     with different names and numbers the achievement must move with it. A
     12 written down anywhere else would quietly go on asking for a score
     that no longer means anything. */
  function houseTop() {
    var t = 0;
    for (var i = 0; i < HOUSE.length; i++) if (HOUSE[i].score > t) t = HOUSE[i].score;
    return t;
  }

  /* A level's id is baked into every score key, and this one was spelled
     'coup' until it was pointed out that a coup is a change of government
     and a coop is where the chickens live. Renaming it would otherwise
     orphan every table and personal best set before the fix, so anything
     saved under the old spelling is moved across once. */
  function migrate() {
    if (Save.get('migrated.coop', false) === true) return;
    Save.keys().forEach(function (k) {
      var moved = k.replace(/\.coup(\.|$)/, '.coop$1');
      if (moved === k) return;
      var v = Save.get(k, null);
      if (v !== null) Save.set(moved, v);
      Save.remove(k);
    });
    Save.set('migrated.coop', true);
  }

  function key(room, level) { return 'scores.' + room.id + '.' + level.id; }
  function pbKey(room, level, doodad) { return 'pb.' + room.id + '.' + level.id + '.' + doodad; }

  function fresh() {
    return HOUSE.map(function (e) { return { name: e.name, score: e.score, doodad: e.doodad, when: 0 }; });
  }

  function sanitise(list) {
    if (!Array.isArray(list)) return null;
    var out = [];
    for (var i = 0; i < list.length && out.length < SIZE; i++) {
      var e = list[i];
      if (!e || typeof e.score !== 'number' || typeof e.name !== 'string') continue;
      out.push({ name: e.name.slice(0, 3), score: e.score | 0,
                 doodad: e.doodad || null, when: e.when || 0 });
    }
    out.sort(function (a, b) { return b.score - a.score; });
    return out;
  }

  /* the table for a level, newest data first time it is asked for */
  function table(room, level) {
    var list = sanitise(Save.get(key(room, level), null));
    if (list) return list;

    list = fresh();
    /* carry over the single best score saved by earlier versions */
    var legacyKey = 'best.' + room.id + '.' + level.id;
    var legacy = Save.get(legacyKey, 0) | 0;
    if (legacy > 0) insert(list, { name: 'YOU', score: legacy, doodad: null, when: Date.now() });
    Save.set(key(room, level), list);
    return list;
  }

  /* index an entry would take, or -1 if it misses the board.
     a tie never displaces the entry that got there first. */
  function rankFor(room, level, score) {
    if (score <= 0) return -1;
    var list = table(room, level);
    for (var i = 0; i < list.length; i++) if (score > list[i].score) return i;
    return list.length < SIZE ? list.length : -1;
  }

  function insert(list, entry) {
    var at = list.length;
    for (var i = 0; i < list.length; i++) if (entry.score > list[i].score) { at = i; break; }
    list.splice(at, 0, entry);
    if (list.length > SIZE) list.length = SIZE;
    return at < SIZE ? at : -1;
  }

  function submit(room, level, name, score, doodad) {
    var list = table(room, level);
    var at = insert(list, { name: name, score: score, doodad: doodad, when: Date.now() });
    Save.set(key(room, level), list);
    if (name) Save.set('initials', name);
    return at;
  }

  function top(room, level) {
    var list = table(room, level);
    return list.length ? list[0].score : 0;
  }

  function personalBest(room, level, doodad) {
    return Save.get(pbKey(room, level, doodad), 0) | 0;
  }

  /* returns true when the run beat that doodad's previous best */
  function recordRun(room, level, doodad, score) {
    if (score > personalBest(room, level, doodad)) {
      Save.set(pbKey(room, level, doodad), score);
      return true;
    }
    return false;
  }

  /* back to the doodads' starting table; personal bests are left alone */
  function erase(room, level) {
    Save.set(key(room, level), fresh());
  }

  function lastInitials() {
    var s = Save.get('initials', 'AAA');
    return (typeof s === 'string' && s.length === 3) ? s : 'AAA';
  }

  function ordinal(i) {
    var n = i + 1;
    var suffix = (n % 100 >= 11 && n % 100 <= 13) ? 'TH'
               : ({ 1: 'ST', 2: 'ND', 3: 'RD' }[n % 10] || 'TH');
    return n + suffix;
  }

  /* gold, silver and bronze for the podium, plain ink below */
  function rankColour(i) {
    return ['#f3cc84', '#c9d1d8', '#d0925a'][i] || UI.C.ink;
  }

  return {
    SIZE: SIZE, migrate: migrate, houseTop: houseTop,
    table: table, rankFor: rankFor, submit: submit, top: top,
    personalBest: personalBest, recordRun: recordRun, erase: erase,
    lastInitials: lastInitials, ordinal: ordinal, rankColour: rankColour
  };
})();
