/* ------------------------------------------------------------------
   Land of Doodads - tiny WebAudio blip synth
   No samples: every sound is a couple of oscillators, which keeps the
   whole game a handful of files. M mutes, and the choice is saved.
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
    } catch (e) { ctx = null; }
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
    /* a doodad just came unlocked - the one real fanfare in the game */
    unlock:  function () { tone({ from: 523, dur: 0.1, type: 'square', vol: 0.13 });
                           tone({ from: 659, dur: 0.1, type: 'square', vol: 0.13, delay: 0.09 });
                           tone({ from: 784, dur: 0.1, type: 'square', vol: 0.13, delay: 0.18 });
                           tone({ from: 1046, dur: 0.14, type: 'square', vol: 0.14, delay: 0.27 });
                           tone({ from: 784, dur: 0.1, type: 'square', vol: 0.11, delay: 0.41 });
                           tone({ from: 1046, dur: 0.34, type: 'square', vol: 0.14, delay: 0.50 });
                           tone({ from: 1318, dur: 0.34, type: 'square', vol: 0.10, delay: 0.50 });
                           noise({ freq: 2600, dur: 0.5, vol: 0.05, q: 0.6, delay: 0.5 }); },


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
    /* a plank shaved close: a thin zip past the ear, not another point */
    nerve:   function () { tone({ from: 990, to: 1480, dur: 0.06, type: 'square', vol: 0.09 });
                           tone({ from: 1480, to: 1980, dur: 0.07, type: 'triangle', vol: 0.07, delay: 0.05 });
                           noise({ freq: 3200, dur: 0.08, vol: 0.05, q: 1.6 }); },
    cooldown:function () { tone({ from: 784, to: 330, dur: 0.3, type: 'triangle', vol: 0.11 });
                           noise({ freq: 900, dur: 0.3, vol: 0.06, q: 0.5 }); },
    start:   function () { tone({ from: 392, to: 392, dur: 0.08, type: 'square', vol: 0.12 });
                           tone({ from: 523, to: 523, dur: 0.08, type: 'square', vol: 0.12, delay: 0.08 });
                           tone({ from: 659, to: 659, dur: 0.08, type: 'square', vol: 0.12, delay: 0.16 });
                           tone({ from: 784, to: 784, dur: 0.2, type: 'square', vol: 0.12, delay: 0.24 }); }
  };

  function play(name) { var fn = SFX[name]; if (fn) { unlock(); fn(); } }

  return { unlock: unlock, play: play, toggleMute: toggleMute, isMuted: isMuted };
})();
