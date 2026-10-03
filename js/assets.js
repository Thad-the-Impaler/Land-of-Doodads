/* ------------------------------------------------------------------
   Land of Doodads - image loading
------------------------------------------------------------------ */
'use strict';

var Assets = (function () {

  var images = {};
  var total = 0, done = 0, failed = [];

  /* The rows are in the roster's order, not alphabetical, so a missing
     doodad is found by reading down the two tables side by side. Every path
     is what tools/trim_sprites.py writes - it crops each painting to its
     opaque bounds and names the result <id>_<frame>.png - so a new doodad
     only ever adds the two rows its own trim produced. gerald_eat is the one
     third frame in the game and the only row that breaks the pairing. */
  var MANIFEST = {
    cookie_fall:   'Assets/sprites/cookie_fall.png',
    cookie_fly:    'Assets/sprites/cookie_fly.png',
    pepper_fall:   'Assets/sprites/pepper_fall.png',
    pepper_fly:    'Assets/sprites/pepper_fly.png',
    gerald_fall:   'Assets/sprites/gerald_fall.png',
    gerald_fly:    'Assets/sprites/gerald_fly.png',
    gerald_eat:    'Assets/sprites/gerald_eat.png',
    maximus_fall:  'Assets/sprites/maximus_fall.png',
    maximus_fly:   'Assets/sprites/maximus_fly.png',
    billy_fall:    'Assets/sprites/billy_fall.png',
    billy_fly:     'Assets/sprites/billy_fly.png',
    inari_fall:    'Assets/sprites/inari_fall.png',
    inari_fly:     'Assets/sprites/inari_fly.png',
    saddam_fall:   'Assets/sprites/saddam_fall.png',
    saddam_fly:    'Assets/sprites/saddam_fly.png',
    turd_fall:     'Assets/sprites/turd_fall.png',
    turd_fly:      'Assets/sprites/turd_fly.png',
    koa_fall:      'Assets/sprites/koa_fall.png',
    koa_fly:       'Assets/sprites/koa_fly.png',
    roller_fall:   'Assets/sprites/roller_fall.png',
    roller_fly:    'Assets/sprites/roller_fly.png',
    donkey_fall:   'Assets/sprites/donkey_fall.png',
    donkey_fly:    'Assets/sprites/donkey_fly.png',
    capybara_fall: 'Assets/sprites/capybara_fall.png',
    capybara_fly:  'Assets/sprites/capybara_fly.png',
    teef_fall:     'Assets/sprites/teef_fall.png',
    teef_fly:      'Assets/sprites/teef_fly.png'
  };
  /* every doodad in js/doodads.js needs both frames listed here: the load
     loop walks MANIFEST, and window.DOODAD_SPRITES from the single file
     build only redirects keys that are already in it, it cannot add any.
     A doodad left out of this table does not throw: Doodads.draw finds no
     image and falls back to a flat circle in the doodad's accent, and
     because no request was ever made for it, failed() never mentions it and
     the loading screen reports a clean load. That silence is why the rule is
     written down here - the only symptom is one doodad drawn as a coloured
     blob on the rail, which reads as art that is not finished yet. */

  /* the single file build (tools/build_single_file.py) drops the frames in
     as data uris, because chrome refuses to load neighbouring files from a
     file:// page. everywhere else these stay ordinary png requests. */
  function source(key) {
    var inlined = window.DOODAD_SPRITES;
    return (inlined && inlined[key]) || MANIFEST[key];
  }

  function load(onDone) {
    var keys = Object.keys(MANIFEST);
    total = keys.length;
    if (total === 0) { onDone(); return; }
    keys.forEach(function (key) {
      var img = new Image();
      img.onload = function () { done++; if (done + failed.length === total) onDone(); };
      img.onerror = function () {
        failed.push(key);
        if (done + failed.length === total) onDone();
      };
      img.src = source(key);
      images[key] = img;
    });
  }

  return {
    load: load,
    img: function (key) { return images[key]; },
    progress: function () { return total ? (done + failed.length) / total : 1; },
    failed: function () { return failed; }
  };
})();
