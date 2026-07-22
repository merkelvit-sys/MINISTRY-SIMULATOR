"use strict";

/**
 * SoundFXManager / SafeSoundEngine
 * Процедурный звуковой движок на основе Web Audio API и Haptic Feedback (Vibration API).
 * Управляет звуковым интерфейсом и тактильным откликом без внешних MP3-файлов.
 */
class SoundFXManager {
  constructor() {
    /** @type {boolean} Флаг отключения звука и вибрации */
    this.isMuted = false;
    /** @type {AudioContext|null} */
    this.ctx = null;
    /** @type {boolean} */
    this.isUnlocked = false;

    this._initUnlockListeners();
  }

  /**
   * Ленивая инициализация AudioContext (Singleton)
   * @returns {AudioContext|null}
   */
  get context() {
    if (!this.ctx) {
      try {
        const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioCtxClass();
      } catch (e) {
        console.warn("[SoundFX] Web Audio API не поддерживается этим браузером.");
        return null;
      }
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Снятие автоблокировки AudioContext по первому жесту пользователя (Autoplay Policy)
   * @private
   */
  _initUnlockListeners() {
    const unlock = () => {
      if (this.context && this.context.state === "suspended") {
        this.context.resume();
      }
      this.isUnlocked = true;
      ["click", "touchstart", "keydown"].forEach((evt) =>
        document.removeEventListener(evt, unlock)
      );
    };

    ["click", "touchstart", "keydown"].forEach((evt) =>
      document.addEventListener(evt, unlock, { once: true })
    );
  }

  /**
   * Тактильный отклик (Haptic Feedback) для мобильных устройств
   * @param {number|number[]} pattern - Длительность вибрации в мс или паттерн [мс_вкл, мс_пауза, ...]
   */
  vibrate(pattern) {
    if (this.isMuted) return;
    try {
      if ("vibrate" in navigator && typeof navigator.vibrate === "function") {
        navigator.vibrate(pattern);
      }
    } catch (e) {
      // Игнорируем ошибки доступа к Haptic Feedback в ограниченных фреймах
    }
  }

  /**
   * Базовый метод процедурной генерации звукового тона с частотной модуляцией (Pitch Sweep)
   * @param {Object} options
   * @param {number} options.freq - Стартовая частота в Гц
   * @param {OscillatorType} [options.type="sine"] - Тип волны ('sine', 'square', 'sawtooth', 'triangle')
   * @param {number} [options.duration=0.1] - Длительность звучания в секундах
   * @param {number} [options.volume=0.15] - Громкость (0.0 - 1.0)
   * @param {number} [options.delay=0] - Задержка старта в секундах относительно текущего времени
   * @param {number|null} [options.rampTo=null] - Конечная частота модулятора (Pitch Sweep)
   * @param {number} [options.rampDuration=0] - Длительность изменения частоты в секундах
   */
  tone({
    freq,
    type = "sine",
    duration = 0.1,
    volume = 0.15,
    delay = 0,
    rampTo = null,
    rampDuration = 0,
  } = {}) {
    if (this.isMuted) return;
    const ctx = this.context;
    if (!ctx) return;

    try {
      const startTime = ctx.currentTime + delay;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, startTime);

      // Частотная модуляция (Pitch Sweep)
      if (rampTo !== null && rampDuration > 0) {
        osc.frequency.exponentialRampToValueAtTime(
          Math.max(1, rampTo),
          startTime + rampDuration
        );
      }

      // Плавная огибающая громкости (Attack & Exponential Decay)
      gain.gain.setValueAtTime(volume, startTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration + 0.02);
    } catch (e) {
      console.warn("[SoundFX] Ошибка воспроизведения тона:", e);
    }
  }

  /**
   * Пресет: Быстрый падающий щелчок при нажатии на кнопки
   */
  playClick() {
    this.tone({
      freq: 1200,
      rampTo: 400,
      rampDuration: 0.04,
      type: "sine",
      duration: 0.05,
      volume: 0.1,
    });
    this.vibrate(15);
  }

  /**
   * Пресет: Быстрое восходящее всплытие для появление облачков речи
   */
  playPop() {
    this.tone({
      freq: 280,
      rampTo: 850,
      rampDuration: 0.06,
      type: "sine",
      duration: 0.08,
      volume: 0.12,
    });
    this.vibrate(25);
  }

  /**
   * Пресет: Торжественное мажорное арпеджио (C5 -> E5 -> G5) с тактильной вибрацией
   */
  playSuccess() {
    // Нота C5
    this.tone({ freq: 523.25, rampTo: 580, rampDuration: 0.05, type: "sine", duration: 0.1, volume: 0.15, delay: 0 });
    // Нота E5
    this.tone({ freq: 659.25, rampTo: 700, rampDuration: 0.05, type: "sine", duration: 0.1, volume: 0.15, delay: 0.08 });
    // Нота G5
    this.tone({ freq: 783.99, rampTo: 880, rampDuration: 0.08, type: "sine", duration: 0.18, volume: 0.18, delay: 0.16 });

    // Двойной пульсирующий тактильный отклик
    this.vibrate([40, 30, 80]);
  }

  /**
   * Пресет: Нисходящая пилообразная волна для ошибок или снижения доверия
   */
  playFail() {
    this.tone({
      freq: 320,
      rampTo: 140,
      rampDuration: 0.2,
      type: "sawtooth",
      duration: 0.22,
      volume: 0.12,
      delay: 0,
    });

    // Плотный вибро-отклик предупреждения
    this.vibrate([100, 40, 80]);
  }

  /**
   * Переключение режима без звука
   * @returns {boolean} Новое состояние isMuted
   */
  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

// Экспорт синглтона с поддержкой обратной совместимости
const soundInstance = new SoundFXManager();
window.soundFX = soundInstance;
window.soundEngine = soundInstance;

class MinistrySpeechEngine {
  constructor() {
    this.synth = window.speechSynthesis;
    this.enabled = true;
  }

  speak(text) {
    if (!this.synth || !this.enabled || !text) return;
    try {
      this.synth.cancel();
      const lang = window.i18n ? window.i18n.currentLang : "ru";
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "de" ? "de-DE" : "ru-RU";
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      this.synth.speak(utterance);
    } catch(e) {}
  }

  stop() {
    if (this.synth) try { this.synth.cancel(); } catch(e) {}
  }

  toggle() {
    this.enabled = !this.enabled;
    if (!this.enabled) this.stop();
    return this.enabled;
  }
}

window.speechEngine = new MinistrySpeechEngine();
