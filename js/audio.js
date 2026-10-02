/* ------------------------------------------------------------------
   Land of Doodads - tiny WebAudio blip synth
   Nearly no samples: every sound is a couple of oscillators, which keeps
   the whole game a handful of files. The one exception is the unlock
   fanfare, which is a recording - see SAMPLES near the bottom. M mutes,
   and the choice is saved.
------------------------------------------------------------------ */
'use strict';

var Audio3 = (function () {

  var ctx = null;
  var master = null;
  var muted = Save.get('muted', false);

  function unlock() {
    if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    try {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.5;
      master.connect(ctx.destination);
    } catch (e) { ctx = null; return; }
    decodeAll();
  }

  function toggleMute() {
    muted = !muted;
    Save.set('muted', muted);
    if (master) master.gain.setTargetAtTime(muted ? 0 : 0.5, ctx.currentTime, 0.01);
    return muted;
  }

  function isMuted() { return muted; }

  /* one blippy voice */
  function tone(o) {
    if (!ctx || muted) return;
    var t0 = ctx.currentTime + (o.delay || 0);
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();
    osc.type = o.type || 'square';
    osc.frequency.setValueAtTime(o.from, t0);
    if (o.to && o.to !== o.from) osc.frequency.exponentialRampToValueAtTime(Math.max(1, o.to), t0 + o.dur);
    var vol = (o.vol === undefined ? 0.2 : o.vol);
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
    osc.connect(gain); gain.connect(master);
    osc.start(t0); osc.stop(t0 + o.dur + 0.02);
  }

  /* filtered noise burst, for impacts */
  function noise(o) {
    if (!ctx || muted) return;
    var t0 = ctx.currentTime + (o.delay || 0);
    var len = Math.floor(ctx.sampleRate * o.dur);
    var buf = ctx.createBuffer(1, len, ctx.sampleRate);
    var data = buf.getChannelData(0);
    for (var i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    var src = ctx.createBufferSource(); src.buffer = buf;
    var filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(o.freq || 900, t0);
    filter.frequency.exponentialRampToValueAtTime(Math.max(60, (o.freq || 900) * 0.25), t0 + o.dur);
    filter.Q.value = o.q || 1.2;
    var gain = ctx.createGain();
    gain.gain.setValueAtTime(o.vol === undefined ? 0.3 : o.vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + o.dur);
    src.connect(filter); filter.connect(gain); gain.connect(master);
    src.start(t0);
  }

  var SFX = {
    flap:    function () { tone({ from: 300, to: 620, dur: 0.09, type: 'square', vol: 0.13 });
                           noise({ freq: 1800, dur: 0.07, vol: 0.07 }); },
    score:   function () { tone({ from: 660, to: 660, dur: 0.07, type: 'square', vol: 0.14 });
                           tone({ from: 990, to: 990, dur: 0.11, type: 'square', vol: 0.13, delay: 0.07 }); },
    hit:     function () { noise({ freq: 520, dur: 0.30, vol: 0.34, q: 0.7 });
                           tone({ from: 220, to: 55, dur: 0.34, type: 'sawtooth', vol: 0.18 }); },
    thud:    function () { noise({ freq: 190, dur: 0.22, vol: 0.28, q: 0.5 });
                           tone({ from: 90, to: 44, dur: 0.24, type: 'triangle', vol: 0.2 }); },
    move:    function () { tone({ from: 520, to: 700, dur: 0.05, type: 'square', vol: 0.09 }); },
    select:  function () { tone({ from: 520, to: 520, dur: 0.06, type: 'square', vol: 0.12 });
                           tone({ from: 784, to: 784, dur: 0.06, type: 'square', vol: 0.12, delay: 0.055 });
                           tone({ from: 1046, to: 1046, dur: 0.12, type: 'square', vol: 0.11, delay: 0.11 }); },
    back:    function () { tone({ from: 440, to: 260, dur: 0.11, type: 'square', vol: 0.11 }); },
    deny:    function () { tone({ from: 190, to: 150, dur: 0.14, type: 'square', vol: 0.12 }); },
    pause:   function () { tone({ from: 600, to: 300, dur: 0.1, type: 'triangle', vol: 0.12 }); },
    chirp:   function () { tone({ from: 900 + Math.random() * 300, to: 1500 + Math.random() * 400,
                                  dur: 0.07, type: 'square', vol: 0.07 }); },
    /* A ROOM, if its recording is not there to play. It is the stall fanfare
       and not a second arrangement, because the alternative to a missing
       sample must be a sound and not silence, and this is the sound the game
       already means by "something opened". */
    room:    function () { SFX.unlock(); },
    /* a doodad just came unlocked - the one real fanfare in the game */
    unlock:  function () { tone({ from: 523, dur: 0.1, type: 'square', vol: 0.13 });
                           tone({ from: 659, dur: 0.1, type: 'square', vol: 0.13, delay: 0.09 });
                           tone({ from: 784, dur: 0.1, type: 'square', vol: 0.13, delay: 0.18 });
                           tone({ from: 1046, dur: 0.14, type: 'square', vol: 0.14, delay: 0.27 });
                           tone({ from: 784, dur: 0.1, type: 'square', vol: 0.11, delay: 0.41 });
                           tone({ from: 1046, dur: 0.34, type: 'square', vol: 0.14, delay: 0.50 });
                           tone({ from: 1318, dur: 0.34, type: 'square', vol: 0.10, delay: 0.50 });
                           noise({ freq: 2600, dur: 0.5, vol: 0.05, q: 0.6, delay: 0.5 }); },
    /* A badge pinned on. Two chords struck one after the other rather than
       another line of single notes, because every arpeggio in this table
       already belongs to something else and a fourth one would be heard as
       whichever of them it resembled most.

       It is deliberately sized between its neighbours, which is the whole
       job of the sound: a doodad coming unlocked is mkoydokoy and the better
       part of a second, a point is two notes inside a fifth of one, and this
       is a third of a second of two-voice chords with a bright tail on it.
       The player should be able to tell which of the three just happened
       without taking their eyes off the plank in front of them, and a
       fanfare for an achievement would make every doodad feel cheaper. */
    badge:   function () { tone({ from: 523, dur: 0.09, type: 'square', vol: 0.11 });
                           tone({ from: 659, dur: 0.09, type: 'square', vol: 0.09 });
                           tone({ from: 784, dur: 0.28, type: 'square', vol: 0.12, delay: 0.10 });
                           tone({ from: 1046, dur: 0.28, type: 'square', vol: 0.10, delay: 0.10 });
                           tone({ from: 1318, dur: 0.22, type: 'triangle', vol: 0.07, delay: 0.16 });
                           noise({ freq: 2800, dur: 0.3, vol: 0.04, q: 0.7, delay: 0.10 }); },


    /* ---- the succulent ---- */
    life:    function () { tone({ from: 523, dur: 0.07, type: 'triangle', vol: 0.13 });
                           tone({ from: 784, dur: 0.07, type: 'triangle', vol: 0.13, delay: 0.06 });
                           tone({ from: 1046, dur: 0.18, type: 'triangle', vol: 0.13, delay: 0.12 });
                           noise({ freq: 2400, dur: 0.2, vol: 0.05, q: 0.7 }); },
    /* the sound of a mistake being bought back: a gulp, then a rising all-clear */
    save:    function () { noise({ freq: 700, dur: 0.18, vol: 0.2, q: 0.8 });
                           tone({ from: 180, to: 90, dur: 0.16, type: 'sawtooth', vol: 0.16 });
                           tone({ from: 440, to: 880, dur: 0.24, type: 'triangle', vol: 0.12, delay: 0.14 });
                           tone({ from: 660, to: 1320, dur: 0.22, type: 'triangle', vol: 0.09, delay: 0.2 }); },

    /* ---- eggs and the deviled egg ---- */
    crack:   function () { noise({ freq: 2400, dur: 0.05, vol: 0.10, q: 2.2 });
                           tone({ from: 940, to: 520, dur: 0.05, type: 'square', vol: 0.06 }); },
    splat:   function () { noise({ freq: 420, dur: 0.16, vol: 0.17, q: 0.7 });
                           tone({ from: 260, to: 120, dur: 0.14, type: 'triangle', vol: 0.09 }); },
    sizzle:  function () { noise({ freq: 3400, dur: 0.45, vol: 0.07, q: 0.5 });
                           tone({ from: 700, to: 1400, dur: 0.3, type: 'triangle', vol: 0.06 }); },
    fizzle:  function () { noise({ freq: 1600, dur: 0.3, vol: 0.10, q: 0.8 });
                           tone({ from: 600, to: 180, dur: 0.26, type: 'sawtooth', vol: 0.08 }); },
    warn:    function () { tone({ from: 300, dur: 0.1, type: 'square', vol: 0.12 });
                           tone({ from: 440, dur: 0.16, type: 'square', vol: 0.12, delay: 0.11 }); },
    spicy:   function () { noise({ freq: 3000, dur: 0.5, vol: 0.10, q: 0.6 });
                           tone({ from: 523, dur: 0.07, type: 'square', vol: 0.13 });
                           tone({ from: 659, dur: 0.07, type: 'square', vol: 0.13, delay: 0.06 });
                           tone({ from: 784, dur: 0.07, type: 'square', vol: 0.13, delay: 0.12 });
                           tone({ from: 1046, dur: 0.22, type: 'square', vol: 0.14, delay: 0.18 });
                           tone({ from: 1318, dur: 0.26, type: 'square', vol: 0.10, delay: 0.24 }); },
    scoreHot:function () { tone({ from: 880, dur: 0.06, type: 'square', vol: 0.13 });
                           tone({ from: 1318, dur: 0.10, type: 'square', vol: 0.12, delay: 0.055 }); },
    /* the tail back under him: a quiet all-clear you can hear under play */
    ready:   function () { tone({ from: 660, dur: 0.05, type: 'triangle', vol: 0.07 });
                           tone({ from: 990, dur: 0.07, type: 'triangle', vol: 0.06, delay: 0.045 }); },
    /* a plank shaved close: a thin zip past the ear, not another point */
    nerve:   function () { tone({ from: 990, to: 1480, dur: 0.06, type: 'square', vol: 0.09 });
                           tone({ from: 1480, to: 1980, dur: 0.07, type: 'triangle', vol: 0.07, delay: 0.05 });
                           noise({ freq: 3200, dur: 0.08, vol: 0.05, q: 1.6 }); },
    /* an old telephone bell, for anything that stuns rather than kills: two
       squares a fifth apart, struck three times in a trill and then the
       trill again, which is what a bell striker actually does. Named for the
       sound and not for the level, like every other entry here. */
    ring:    function () { tone({ from: 1180, dur: 0.11, type: 'square', vol: 0.09 });
                           tone({ from: 1560, dur: 0.11, type: 'square', vol: 0.06 });
                           tone({ from: 1180, dur: 0.11, type: 'square', vol: 0.09, delay: 0.07 });
                           tone({ from: 1560, dur: 0.11, type: 'square', vol: 0.06, delay: 0.07 });
                           tone({ from: 1180, dur: 0.11, type: 'square', vol: 0.09, delay: 0.14 });
                           tone({ from: 1560, dur: 0.11, type: 'square', vol: 0.06, delay: 0.14 });
                           tone({ from: 1180, dur: 0.11, type: 'square', vol: 0.09, delay: 0.28 });
                           tone({ from: 1560, dur: 0.11, type: 'square', vol: 0.06, delay: 0.28 });
                           noise({ freq: 3600, dur: 0.1, vol: 0.03, q: 1.8 }); },
    /* a dry tick for a drop coming off the floor. It fires on every bounce
       of every kernel, so it is the quietest thing in this table by some way
       and has no tone under it at all - a pitch heard fifteen times in two
       seconds becomes a melody nobody wrote. */
    bop:     function () { noise({ freq: 1100, dur: 0.04, vol: 0.06, q: 1.4 }); },
    cooldown:function () { tone({ from: 784, to: 330, dur: 0.3, type: 'triangle', vol: 0.11 });
                           noise({ freq: 900, dur: 0.3, vol: 0.06, q: 0.5 }); },
    start:   function () { tone({ from: 392, to: 392, dur: 0.08, type: 'square', vol: 0.12 });
                           tone({ from: 523, to: 523, dur: 0.08, type: 'square', vol: 0.12, delay: 0.08 });
                           tone({ from: 659, to: 659, dur: 0.08, type: 'square', vol: 0.12, delay: 0.16 });
                           tone({ from: 784, to: 784, dur: 0.2, type: 'square', vol: 0.12, delay: 0.24 }); }
  };

  /* ---------------------------------------------------------- samples

     The synth above is the house style and it stays. This is the single
     exception, because an unlock is the one moment in the game that is
     worth a voice rather than an arpeggio, and no arrangement of square
     waves was going to be that.

     The synth fanfare is still there and still correct: if the recording
     has not arrived, or the browser will not decode it, or the fetch fails
     on somebody's file:// page, play() falls through to it. The biggest
     moment in the game never goes silent because of an asset.          */

  /* Keyed by what the sound DOES, so a role swaps from synth to recording
     by appearing here and nothing at the call sites changes. `vol` is per
     sound because these two want opposite things: a fanfare you hear over
     everything, and an in-play chirp that must sit under the game.

     NERVE went 0.30 -> 0.40 because it was not being heard at all. Mixing
     it down was the right instinct for a sound that COULD fire every couple
     of seconds and the wrong one for how often it actually does: nerve pays
     for a plank threaded within SEVEN pixels and only Cookie has it, so a
     run that is not deliberately shaving planks can go start to finish
     without one. A sound nobody hears is not a subtle sound. */
  var SAMPLES = {
    unlock: { src: 'Assets/sounds/mkoydokoy.mp3', vol: 0.45 },
    nerve:  { src: 'Assets/sounds/stressless.mp3', vol: 0.40 },
    /* A ROOM coming open, which is a rarer and bigger thing than a stall or
       a bay: there is one score-gated room in the game today and the player
       crosses it once. Louder than the stall fanfare for that reason, and
       its own recording rather than the same one twice. */
    room:   { src: 'Assets/sounds/wholenewworld.mp3', vol: 0.5 },

    /* THE DOODADS' OWN VOICES, one per stall, played when the character
       select lands on that doodad. js/doodads.js names the role in the
       doodad's own `voice` field, so a ninth doodad with a recording is a
       file, a line here and a line there - and a doodad with no recording
       says nothing extra, which is why `fallback` is 'move' rather than a
       voice-shaped arpeggio nobody asked for.

       They all share one CHANNEL. Holding an arrow walks the whole rail in
       a second and a half, and without it that is four recordings playing
       over one another; with it, each one cuts the last off exactly the way
       moving the cursor cuts off the click. See playSample.

       vol 0.40, down from the 0.55 these shipped at, and the same as the
       in-play chirp. These are the only recordings in the game that fire on
       a CURSOR MOVE - they are heard many times in the few seconds somebody
       spends on this screen, where the fanfares are heard once a week - so
       they belong under everything else rather than over it.

       Billy and Saddam are their own recordings. Cookie and Pepper are cut
       out of one long yard recording, where the calls sit 26 and 32 dB down
       with the room floor right underneath, so both carry a 320 Hz high
       pass and FFT noise reduction before the gain goes on: the room drops
       by about 18 dB and the calls do not move. tools/make_sound.sh has the
       exact command for each. */
    voiceCookie: { src: 'Assets/sounds/cookieselect.mp3', vol: 0.40,
                   channel: 'voice', fallback: 'move' },
    voicePepper: { src: 'Assets/sounds/pepperselect.mp3', vol: 0.40,
                   channel: 'voice', fallback: 'move' },
    voiceBilly:  { src: 'Assets/sounds/billyselect.mp3',  vol: 0.40,
                   channel: 'voice', fallback: 'move' },
    voiceSaddam: { src: 'Assets/sounds/saddamselect.mp3', vol: 0.40,
                   channel: 'voice', fallback: 'move' }
  };

  var bytes = {};               /* name -> ArrayBuffer, fetched at boot   */
  var buffers = {};             /* name -> AudioBuffer, decoded once ctx  */
  var sounding = {};            /* name -> the source currently playing   */

  /* the single file build inlines the sound as a data uri, exactly as it
     does the sprite frames, because a file:// page may not fetch its
     neighbours */
  function sampleSrc(name) {
    var inlined = window.DOODAD_SOUNDS;
    return (inlined && inlined[name]) || (SAMPLES[name] && SAMPLES[name].src);
  }

  function loadSample(name) {
    var url = sampleSrc(name);
    if (!url) return;
    if (url.indexOf('data:') === 0) {
      /* already in memory: unpack it rather than asking the network for
         something that is sitting in the page */
      try {
        var b64 = url.slice(url.indexOf(',') + 1);
        var bin = atob(b64), n = bin.length, arr = new Uint8Array(n), i;
        for (i = 0; i < n; i++) arr[i] = bin.charCodeAt(i);
        bytes[name] = arr.buffer;
      } catch (e) { return; }
      decodeSample(name);
      return;
    }
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function () {
      /* status 0 is a local file that loaded */
      if (xhr.status === 200 || xhr.status === 0) {
        bytes[name] = xhr.response;
        decodeSample(name);
      }
    };
    xhr.onerror = function () {};        /* the synth fanfare covers for it */
    try { xhr.send(); } catch (e) {}
  }

  /* Decoding needs the context, and the context needs a gesture, so this is
     called both when the bytes land and when the context is finally made -
     whichever happens second is the one that does the work. */
  function decodeSample(name) {
    if (!ctx || buffers[name] || !bytes[name]) return;
    /* decodeAudioData DETACHES what it is given, so hand it a copy: a
       decode that fails must not take the bytes with it */
    var copy = bytes[name].slice(0);
    var keep = function (buf) { if (buf) buffers[name] = buf; };
    try {
      var p = ctx.decodeAudioData(copy, keep, function () {});
      if (p && p.then) p.then(keep, function () {});
    } catch (e) {}
  }

  function decodeAll() { for (var name in SAMPLES) decodeSample(name); }

  /* Returns whether it actually played, which is what lets play() fall back
     to the synth without knowing why it did not. */
  function playSample(name) {
    if (!ctx || muted || !buffers[name]) return false;
    /* One at a time. A score that opens a level AND a doodad calls this
       twice in the same frame, and two four-second voices over each other
       is a mess - so whatever is sounding is stopped and it starts again
       from the top, which is also what makes a second unlock feel like a
       second unlock rather than a smear.

       A CHANNEL rather than the name, for the one case where the rule has
       to cover a whole family: the doodads' voices all share 'voice', so
       walking the character select's rail cuts each call off with the next
       instead of stacking a farmyard. Everything else is its own channel by
       default, which is what the name alone always meant. */
    var ch = (SAMPLES[name] && SAMPLES[name].channel) || name;
    if (sounding[ch]) {
      try { sounding[ch].stop(); } catch (e) {}
      sounding[ch] = null;
    }
    var src = ctx.createBufferSource();
    src.buffer = buffers[name];
    var gain = ctx.createGain();
    gain.gain.value = SAMPLES[name].vol;
    src.connect(gain); gain.connect(master);
    src.onended = function () { if (sounding[ch] === src) sounding[ch] = null; };
    src.start();
    sounding[ch] = src;
    return true;
  }

  function play(name) {
    var s = SAMPLES[name], fn = SFX[name];
    if (!fn && !s) return;
    unlock();
    if (playSample(name)) return;
    /* A recording with no synth entry of its own - which is every voice,
       because there is no arpeggio that sounds like Billy - still has to
       make SOME noise on the frame its bytes have not arrived yet, or the
       first press after a cold boot is the one that feels broken. */
    if (!fn && s.fallback) fn = SFX[s.fallback];
    if (fn) fn();
  }

  /* the bytes can be on their way before anything has been touched; only
     the decoding has to wait for a gesture */
  for (var s in SAMPLES) loadSample(s);

  return { unlock: unlock, play: play, toggleMute: toggleMute, isMuted: isMuted };
})();
