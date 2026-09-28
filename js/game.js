/* ------------------------------------------------------------------
   Land of Doodads - boot, scene manager and main loop
------------------------------------------------------------------ */
'use strict';

var Game = (function () {

  var scene = null;
  var pending = null;          /* scene waiting behind a wipe */
  var pendingParams = null;
  var wipe = 0;                /* 0 = clear, 1 = fully covered */
  var wipeDir = 0;             /* +1 covering, -1 uncovering */
  var WIPE_SPEED = 4.4;
  var ready = false;
  var loadFade = 1;

  var toastText = '', toastTime = 0;
  var rotateT = 0;

  var selection = {
    room: Levels.startRoom,
    level: 0,
    doodad: 'cookie'                 /* replaced in init(), see pickDoodad */
  };

  /* The saved doodad is the one thing in the save file that can name
     something the player may not have: an id from a newer build, or one
     that was unlocked on another machine. Left alone it would either
     start a run as a locked doodad or hand Game.doodad() undefined, which
     PlayScene dereferences on its first frame. */
  function pickDoodad() {
    var saved = Save.get('doodad', 'cookie');
    if (Doodads.has(saved) && Doodads.isUnlocked(saved)) return saved;
    var fallback = Doodads.firstUnlocked();
    Save.set('doodad', fallback);
    return fallback;
  }

  /* --------------------------------------------------- scene swaps */

  function go(next, params) {
    if (pending) return;
    /* every scene is a menu until it says otherwise; PlayScene does */
    Input.setTouchMode('menu');
    pending = next;
    pendingParams = params || {};
    wipeDir = 1;
  }

  function goInstant(next, params) {
    Input.setTouchMode('menu');
    if (scene && scene.exit) scene.exit();
    scene = next;
    if (scene.enter) scene.enter(params || {});
  }

  function locked() { return wipeDir !== 0 || !ready; }

  /* ------------------------------------------------------ the loop */

  var last = 0;

  function frame(now) {
    requestAnimationFrame(frame);
    if (!last) last = now;
    var dt = (now - last) / 1000;
    last = now;
    if (dt > 1 / 30) dt = 1 / 30;      /* long stalls must not teleport anyone */
    if (dt < 0) dt = 0;

    step(dt);
    render();
  }

  function step(dt) {
    Input.update(dt);
    Screen.updateShake(dt);

    /* global keys work everywhere */
    if (Input.hit('fullscreen')) Screen.toggleFullscreen();
    if (Input.hit('mute')) {
      var m = Audio3.toggleMute();
      toast(m ? 'SOUND OFF' : 'SOUND ON');
      if (!m) Audio3.play('move');
    }
    if (toastTime > 0) toastTime -= dt;
    rotateT += dt;

    if (wipeDir === 1) {
      wipe += WIPE_SPEED * dt;
      if (wipe >= 1) {
        wipe = 1;
        goInstant(pending, pendingParams);
        pending = null; pendingParams = null;
        wipeDir = -1;
      }
    } else if (wipeDir === -1) {
      wipe -= WIPE_SPEED * dt;
      if (wipe <= 0) { wipe = 0; wipeDir = 0; }
    }

    if (scene && scene.update) scene.update(dt);
    Input.endFrame();
  }

  function render() {
    Screen.beginFrame();
    var bg = Screen.ctxBg, ch = Screen.ctxCh, fg = Screen.ctxFg;

    if (scene) {
      if (scene.drawBg) scene.drawBg(bg);
      if (scene.drawChars) scene.drawChars(ch);
      if (scene.drawFg) scene.drawFg(fg);
    }

    /* the on-screen controls belong to every scene, so they are drawn
       here once rather than remembered in five different places */
    if (Input.pointing()) UI.pads(fg);

    if (toastTime > 0) {
      var a = Math.min(1, toastTime * 3);
      if (a > 0.2) {
        /* sized to the words: the old fixed 76px panel clipped anything
           longer than about twelve characters */
        var tw = Font.measure(toastText, 1) + 12;
        UI.panel(fg, VW - tw - 6, 6, tw, 13, { fill: UI.C.darker, edge: UI.C.inkFaint });
        UI.text(fg, toastText, VW - tw / 2 - 6, 10, { align: 'center', colour: UI.C.inkDim });
      }
    }

    /* nothing below this point is worth showing if the phone is upright */
    if (Input.pointerKind() === 'touch' && Screen.portrait) UI.rotateNotice(fg, rotateT);

    if (wipe > 0) Dither.wipe(fg, wipe, '#0b0805');

    if (loadFade > 0) {
      fg.fillStyle = 'rgba(11,8,5,' + loadFade + ')';
      fg.fillRect(0, 0, VW, VH);
    }
  }

  function toast(str) { toastText = str; toastTime = 1.5; }

  /* ---------------------------------------------------------- boot */

  function drawLoading() {
    var bg = Screen.ctxBg, fg = Screen.ctxFg;
    Screen.beginFrame();
    bg.fillStyle = '#0b0805';
    bg.fillRect(0, 0, VW, VH);
    UI.text(fg, 'LAND OF DOODADS', VW / 2, VH / 2 - 14, { align: 'center', scale: 2, colour: UI.C.gold });
    UI.text(fg, 'LOADING', VW / 2, VH / 2 + 8, { align: 'center', colour: UI.C.inkDim });
  }

  /* The master passkey. Type it on any screen and the whole roster opens
     up. Registered here rather than in Input because this is the module
     that knows about doodads and scenes. */
  function masterPasskey() {
    Doodads.setMasterKey(true);
    Audio3.unlock();
    Audio3.play('unlock');
    Screen.shake(3, 0.35);
    toast('MASTER PASSKEY');
    /* whatever is on screen may have cached the old unlock state */
    if (scene && scene.refresh) scene.refresh();
  }

  function init() {
    Screen.init();
    Input.init();
    Input.watchCode('IMP11', masterPasskey);
    /* before anything reads a score: pickDoodad below asks Doodads
       whether a doodad is unlocked, which reads the personal bests */
    Scores.migrate();
    selection.doodad = pickDoodad();
    drawLoading();
    Levels.buildArt();

    Assets.load(function () {
      ready = true;
      goInstant(TitleScene, {});
      requestAnimationFrame(frame);
      /* fade the loading cover away once the first real frame is up */
      var fade = function () {
        loadFade -= 0.06;
        if (loadFade > 0) requestAnimationFrame(fade);
        else loadFade = 0;
      };
      requestAnimationFrame(fade);
    });
  }

  return {
    init: init, go: go, locked: locked, toast: toast,
    selection: selection,
    current: function () { return scene; },
    room: function () { return Levels.rooms[selection.room]; },
    level: function () { return Levels.rooms[selection.room].levels[selection.level]; },
    doodad: function () { return Doodads.get(selection.doodad); }
  };
})();

window.addEventListener('load', function () { Game.init(); });
