/* ------------------------------------------------------------------
   Land of Doodads - image loading
------------------------------------------------------------------ */
'use strict';

var Assets = (function () {

  var images = {};
  var total = 0, done = 0, failed = [];

  var MANIFEST = {
    cookie_fall: 'Assets/sprites/cookie_fall.png',
    cookie_fly:  'Assets/sprites/cookie_fly.png',
    pepper_fall: 'Assets/sprites/pepper_fall.png',
    pepper_fly:  'Assets/sprites/pepper_fly.png',
    gerald_fall: 'Assets/sprites/gerald_fall.png',
    gerald_fly:  'Assets/sprites/gerald_fly.png',
    gerald_eat:  'Assets/sprites/gerald_eat.png',
    maximus_fall:'Assets/sprites/maximus_fall.png',
    maximus_fly: 'Assets/sprites/maximus_fly.png',
    billy_fall:  'Assets/sprites/billy_fall.png',
    billy_fly:   'Assets/sprites/billy_fly.png',
    inari_fall:  'Assets/sprites/inari_fall.png',
    inari_fly:   'Assets/sprites/inari_fly.png',
    saddam_fall: 'Assets/sprites/saddam_fall.png',
    saddam_fly:  'Assets/sprites/saddam_fly.png',
    turd_fall:   'Assets/sprites/turd_fall.png',
    turd_fly:    'Assets/sprites/turd_fly.png'
  };
  /* every doodad in js/doodads.js needs both frames listed here: the load
     loop walks MANIFEST, and window.DOODAD_SPRITES from the single file
     build only redirects keys that are already in it, it cannot add any. */

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
