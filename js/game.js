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

  /* ?hit=1 outlines every rectangle the game is listening to this frame, in
     red, over the top of everything. It is the only cheap way to check the
     one rule the whole touch UI rests on - that a listened rectangle is a
     drawn one - because the check is "does every red box sit exactly on
     something that looks pressable, and does every pressable thing have
     one". Left in the shipped build: it costs a regex at boot. */
  var HIT_DEBUG = /[?&]hit=1/.test(location.search);

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

    /* A phone held upright gets the notice and nothing else. It is worked
       out here, before a single rectangle is published, because the notice
       covers the scene completely and a covered scene must not be listening:
       see Input.setBlocked. */
    var upright = Input.pointerKind() === 'touch' && Screen.portrait;

    if (scene) {
      if (scene.drawBg) scene.drawBg(bg);

      /* The movement pads and the pause button go on the BACKGROUND layer,
         above the world and UNDER the doodad. They used to be painted on the
         foreground with everything else, which meant that holding LEFT and
         flying low - the one moment the left pad is certainly in use - hid
         the doodad behind the very button steering it, completely. Nothing
         else about them changes; they are still Input's rectangles, drawn
         from Input's table. Menus have no pads at all, so this only ever
         paints during a run. */
      if (Input.pointing()) UI.pads(bg);

      if (scene.drawChars) scene.drawChars(ch);
      if (scene.drawFg) scene.drawFg(fg);
    }

    /* This is where drawn becomes listened. The scene has just this moment
       painted its boards, cards and stalls, and filled a list of their
       rectangles while it did so; handing that list to Input here means the
       next touch is tested against the frame the player is looking at. Doing
       it from update() instead would test a finger against a layout that had
       not been shown yet. */
    Input.setTargets(upright ? null : (scene && scene.targets ? scene.targets() : null));
    Input.setBlocked(upright);

    if (HIT_DEBUG) drawHitBoxes(fg);

    if (toastTime > 0) {
      var a = Math.min(1, toastTime * 3);
      if (a > 0.2) {
        /* sized to the words: the old fixed 76px panel clipped anything
           longer than about twelve characters */
        var tw = Font.measure(toastText, 1) + 12;
        /* and shoved along when the pause button is up there with it, so
           SOUND OFF does not park itself underneath the way out of a run */
        var tx = VW - tw - 6 - ((Input.pointing() && Input.touchMode() !== 'menu') ? 46 : 0);
        UI.panel(fg, tx, 6, tw, 13, { fill: UI.C.darker, edge: UI.C.inkFaint });
        UI.text(fg, toastText, tx + tw / 2, 10, { align: 'center', colour: UI.C.inkDim });
      }
    }

    /* nothing below this point is worth showing if the phone is upright */
    if (upright) UI.rotateNotice(fg, rotateT);

    if (wipe > 0) Dither.wipe(fg, wipe, '#0b0805');

    if (loadFade > 0) {
      fg.fillStyle = 'rgba(11,8,5,' + loadFade + ')';
      fg.fillRect(0, 0, VW, VH);
    }
  }

  function toast(str) { toastText = str; toastTime = 1.5; }

  /* every rectangle a press could land on: the mode's pads first, then the
     scene's own targets. The rest zone has no rectangle to draw - it is
     whatever is left over - so it is skipped. */
  function drawHitBoxes(ctx) {
    var pads = Input.pads(), list = Input.targets(), i;
    ctx.strokeStyle = '#ff2020';
    ctx.lineWidth = 1;
    for (i = 0; i < pads.length; i++) if (!pads[i].rest) outline(ctx, pads[i]);
    for (i = 0; i < list.length; i++) outline(ctx, list[i]);
  }

  function outline(ctx, r) {
    ctx.strokeRect(Math.round(r.x) + 0.5, Math.round(r.y) + 0.5,
                   Math.round(r.w) - 1, Math.round(r.h) - 1);
  }

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
