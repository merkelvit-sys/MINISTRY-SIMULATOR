"use strict";

(() => {
  class SoundFXManager {
    constructor() {
      this.isMuted = false;
      this.ctx = null;
    }

    get context() {
      if (!this.ctx) {
        try {
          this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
          return null;
        }
      }
      if (this.ctx.state === "suspended") {
        this.ctx.resume().catch(() => {});
      }
      return this.ctx;
    }

    vibrate(ms) {
      if (this.isMuted) return;
      try {
        if ("vibrate" in navigator) {
          navigator.vibrate(ms);
        }
      } catch (e) {}
    }

    tone({ freq, type = "sine", duration = 0.1, volume = 0.15, delay = 0, rampTo = null, rampDuration = 0 } = {}) {
      if (this.isMuted) return;
      const ctx = this.context;
      if (!ctx) return;
      const t = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t);
      if (rampTo) {
        osc.frequency.linearRampToValueAtTime(rampTo, t + rampDuration);
      }
      gain.gain.setValueAtTime(volume, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + duration + 0.01);
    }

    playClick() {
      this.tone({ freq: 1200, type: "sine", duration: 0.06, volume: 0.1 });
      this.vibrate(20);
    }

    playPop() {
      this.tone({ freq: 300, type: "sine", duration: 0.08, volume: 0.12, rampTo: 800, rampDuration: 0.05 });
    }

    playSuccess() {
      this.tone({ freq: 523.25, type: "sine", duration: 0.1, volume: 0.15, delay: 0 });
      this.tone({ freq: 659.25, type: "sine", duration: 0.1, volume: 0.15, delay: 0.1 });
      this.tone({ freq: 783.99, type: "sine", duration: 0.15, volume: 0.15, delay: 0.2 });
      this.vibrate([50, 30, 100]);
    }

    playFail() {
      this.tone({ freq: 300, type: "sawtooth", duration: 0.15, volume: 0.1, delay: 0 });
      this.tone({ freq: 200, type: "sawtooth", duration: 0.2, volume: 0.1, delay: 0.15 });
      this.vibrate([100, 50, 50, 50, 50]);
    }
  }

  window.soundFX = new SoundFXManager();
})();
