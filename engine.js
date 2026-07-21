"use strict";

const $ = (sel) => document.querySelector(sel);
const app = $("#app");
const rand = (n) => Math.floor(Math.random() * n);
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = rand(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

const SESSION_MIN = 5, SESSION_MAX = 6;
const TRUST_FACTOR = 7;
const TIMEOUT_PENALTY = -2;
const DEFAULT_THINK_TIME = 40;

function scoreAnswer(answer, personality) {
  return answer.tones.reduce((sum, t) => sum + (personality.pref[t] || 0), 0);
}

function buildSteps(theme) {
  if (Array.isArray(theme.steps)) {
    return theme.steps.map((s) => ({
      prompt: s.prompt,
      scripture: s.scripture || "",
      answers: shuffle(s.answers),
    }));
  }
  return [{ prompt: theme.question, scripture: theme.scripture || "", answers: shuffle(theme.answers) }];
}

class PlayerProfile {
  constructor() {
    this.data = this.load();
  }
  load() {
    try {
      const data = localStorage.getItem("service_sim_profile");
      if (data) return JSON.parse(data);
    } catch(e) {}
    return { sessions: 0, earned: 0, achievable: 0, encounters: { sincere: 0, hurrying: 0, skeptic: 0 }, toneUsage: {} };
  }
  save() {
    try { localStorage.setItem("service_sim_profile", JSON.stringify(this.data)); } catch(e) {}
  }
  recordSession(session) {
    this.data.sessions++;
    this.data.earned += session.earned;
    this.data.achievable += session.achievable;
    session.log.forEach(l => {
      if (l.personality) {
        this.data.encounters[l.personality] = (this.data.encounters[l.personality] || 0) + 1;
      }
      if (l.tones) {
        l.tones.forEach(t => {
          this.data.toneUsage[t] = (this.data.toneUsage[t] || 0) + 1;
        });
      }
    });
    this.save();
  }
  getFeedback() {
    if (this.data.sessions < 3) return "Пройдите ещё пару сессий, чтобы профиль собрал аналитику вашего стиля.";
    let mostUsedTone = "", maxTone = 0;
    for (const [t, c] of Object.entries(this.data.toneUsage)) {
      if (c > maxTone) { maxTone = c; mostUsedTone = t; }
    }
    const pct = this.data.achievable > 0 ? Math.round((this.data.earned / this.data.achievable) * 100) : 0;
    
    if (mostUsedTone === "pushy" || mostUsedTone === "false") return "💡 Совет: Вы часто используете напористые или резкие ответы. Старайтесь больше проявлять такт (respect) и опираться на Писание (deep).";
    if (pct < 60 && mostUsedTone === "deep") return "💡 Совет: Вы часто используете Писание, но иногда людям нужен просто короткий ответ или сочувствие. Следите за нетерпеливыми собеседниками.";
    if (pct >= 80) return "🏆 Отлично! У вас сформировался чуткий и адаптивный подход к разным людям.";
    return "💡 Аналитика: Вы развиваетесь. Экспериментируйте с разными тонами, чтобы найти лучший ключ к каждому характеру.";
  }
}

class GameEngine {
  constructor() {
    this.session = null;
    this.timer = { id: null, start: 0, total: 0 };
    this.isProcessing = false;
    this.perfectStreak = 0;
    this.profile = new PlayerProfile();
  }

  startSession(level) {
    this.perfectStreak = 0;
    const count = SESSION_MIN + rand(SESSION_MAX - SESSION_MIN + 1);
    const pKeys = Object.keys(PERSONALITIES);
    const themes = shuffle(level.themes).slice(0, Math.min(count, level.themes.length));
    this.session = {
      level,
      cards: themes.map((theme) => ({
        theme,
        personality: PERSONALITIES[pKeys[rand(pKeys.length)]],
        steps: buildSteps(theme),
      })),
      index: 0,
      stepIndex: 0,
      trust: 0,
      cardLeft: false,
      earned: 0,
      achievable: 0,
      correct: 0,
      wrong: 0,
      streak: 0,
      maxStreak: 0,
      leftCount: 0,
      scriptureOpens: 0,
      log: [],
      recentTones: [],
      inConflict: false,
      scriptureBonusUsed: false
    };
    this.startCard();
  }

  startCard() {
    const card = this.session.cards[this.session.index];
    this.session.stepIndex = 0;
    this.session.trust = card.personality.startTrust;
    this.session.cardLeft = false;
    this.session.inConflict = false;
    this.session.recentTones = [];
    this.session.scriptureBonusUsed = false;
    renderStep();
  }

  resolveAnswer(chosenIndex) {
    if (this.isProcessing) return;
    this.isProcessing = true;
    try {
      this.stopTimer();
      const card = this.session.cards[this.session.index];
      const step = card.steps[this.session.stepIndex];
      const p = card.personality;

      const scores = step.answers.map((a) => scoreAnswer(a, p));
      const best = Math.max(...scores);
      const bestIndex = scores.indexOf(best);
      const timedOut = chosenIndex === -1;
      let raw = timedOut ? TIMEOUT_PENALTY : scores[chosenIndex];
      
      let fatigueMsg = "";
      let chosenTones = [];
      if (!timedOut) {
        chosenTones = step.answers[chosenIndex].tones;
        this.session.recentTones.push(chosenTones[0]);
        if (this.session.recentTones.length > 3) this.session.recentTones.shift();
        
        if (this.session.recentTones.length === 3 && this.session.recentTones.every(t => t === chosenTones[0])) {
          raw -= 2;
          fatigueMsg = "Штраф за шаблонность: вы всё время выбираете один и тот же тон общения!";
        }
      }

      const gained = Math.max(0, raw);
      let mult = 1;
      if (raw > 0) {
        this.session.streak++;
        if (this.session.streak > this.session.maxStreak) this.session.maxStreak = this.session.streak;
        mult = this.constructor.computeMultiplier(this.session.streak);
        this.session.correct++;
      } else {
        this.session.streak = 0;
        this.session.wrong++;
      }
      const points = Math.round(gained * mult);
      this.session.earned += points;

      if (best > 0) {
        this.perfectStreak++;
        this.session.achievable += Math.round(Math.max(0, best) * this.constructor.computeMultiplier(this.perfectStreak));
      }

      const trustBefore = this.session.trust;
      this.session.trust = Math.max(0, Math.min(100, this.session.trust + raw * TRUST_FACTOR));
      
      // Ветвление: Спор
      if (!timedOut && raw < 0 && !this.session.inConflict) {
        this.session.inConflict = true;
        const cDef = CONFLICT_STEPS[p.id];
        card.steps.splice(this.session.stepIndex + 1, 0, {
          prompt: cDef.prompt, scripture: "", answers: shuffle(cDef.answers), isConflict: true
        });
      } else if (!timedOut && this.session.inConflict && step.isConflict) {
        if (raw >= 0) this.session.inConflict = false; // Успокоили
      }

      const left = this.session.trust <= 0;
      if (left) { this.session.cardLeft = true; this.session.leftCount++; }

      const lastStep = this.session.stepIndex >= card.steps.length - 1;
      this.session.log.push({
        themeId: card.theme.id, personality: p.id, stepIndex: this.session.stepIndex,
        chosenIndex, raw, best, points, mult, left, timedOut, tones: chosenTones
      });

      renderStepFeedback({
        card, step, scores, best, bestIndex, chosenIndex,
        raw, points, mult, trustBefore, trustAfter: this.session.trust, left, lastStep, timedOut, fatigueMsg
      });
    } finally {
      this.isProcessing = false;
    }
  }

  advance() {
    if (this.isProcessing) return;
    this.isProcessing = true;
    try {
      const card = this.session.cards[this.session.index];
      const lastStep = this.session.stepIndex >= card.steps.length - 1;
      this.session.scriptureBonusUsed = false; // reset for next step
      
      if (this.session.cardLeft || lastStep) {
        this.session.index++;
        if (this.session.index >= this.session.cards.length) {
          this.profile.recordSession(this.session);
          renderResult();
        } else {
          this.startCard();
        }
      } else {
        this.session.stepIndex++;
        renderStep();
      }
    } finally {
      this.isProcessing = false;
    }
  }

  searchScripture(query) {
    if (!query || query.length < 3) return [];
    const q = query.toLowerCase();
    const results = [];
    for (const [key, obj] of Object.entries(SCRIPTURES)) {
      if (key.toLowerCase().includes(q) || obj.text.toLowerCase().includes(q) || obj.keywords.some(k => k.toLowerCase().includes(q))) {
        results.push(obj);
      }
    }
    return results;
  }

  applyScripture(ref) {
    if (this.session.scriptureBonusUsed) return { success: false, msg: "Вы уже приводили стих в этом шаге." };
    this.session.scriptureBonusUsed = true;
    
    const card = this.session.cards[this.session.index];
    const step = card.steps[this.session.stepIndex];
    
    if (step.scripture === ref) {
      this.session.trust = Math.min(100, this.session.trust + 15);
      renderTrustUpdate(this.session.trust, "Отличный стих! Собеседник впечатлен (+15% доверия).", "good");
      return { success: true };
    } else {
      this.session.trust = Math.max(0, this.session.trust - 10);
      const left = this.session.trust <= 0;
      renderTrustUpdate(this.session.trust, "Собеседник не понял, к чему этот стих. (-10% доверия)", "bad");
      if (left) {
        this.resolveAnswer(-1); // forced leave
      }
      return { success: false };
    }
  }

  startTimer(seconds, onTimeout) {
    this.stopTimer();
    this.timer.total = seconds;
    this.timer.start = Date.now();
    this.updateTimerUI(seconds);
    this.timer.id = setInterval(() => {
      const remaining = this.timer.total - (Date.now() - this.timer.start) / 1000;
      if (remaining <= 0) { this.stopTimer(); this.updateTimerUI(0); onTimeout(); }
      else this.updateTimerUI(remaining);
    }, 100);
  }

  stopTimer() {
    if (this.timer.id) { clearInterval(this.timer.id); this.timer.id = null; }
  }

  updateTimerUI(remaining) {
    const bar = $("#timerBar"), label = $("#timerLabel");
    if (!bar) return;
    const pct = Math.max(0, Math.min(100, (remaining / this.timer.total) * 100));
    bar.style.width = pct + "%";
    bar.style.background = pct > 50 ? "var(--good)" : pct > 20 ? "var(--warn)" : "var(--bad)";
    if (label) label.textContent = "Время на размышление: " + Math.max(0, Math.ceil(remaining)) + " с";
  }

  static computeMultiplier(streak) {
    if (streak >= 5) return 2;
    if (streak >= 3) return 1.5;
    return 1;
  }

  static moodFromTrust(t) {
    if (t >= 80) return { face: "😊", label: "Расположен", color: "var(--good)" };
    if (t >= 60) return { face: "🙂", label: "Заинтересован", color: "var(--good)" };
    if (t >= 40) return { face: "😐", label: "Нейтрален", color: "var(--warn)" };
    if (t >= 20) return { face: "😕", label: "Насторожен", color: "var(--warn)" };
    if (t > 0)   return { face: "😠", label: "На грани", color: "var(--bad)" };
    return { face: "🚶", label: "Ушёл", color: "var(--bad)" };
  }

  static achievementsFor(s, pct) {
    const list = [];
    if (s.wrong === 0)        list.push({ icon: "✨", name: "Безупречный выход", desc: "Ни одного неверного ответа" });
    if (s.maxStreak >= 5)     list.push({ icon: "🔥", name: "Огненная серия", desc: "5+ верных ответов подряд" });
    if (s.leftCount === 0)    list.push({ icon: "🕊️", name: "Дипломат", desc: "Никто не прервал разговор" });
    if (s.scriptureOpens > 0) list.push({ icon: "📖", name: "Исследователь Писания", desc: "Открыл стих в Библии" });
    if (pct >= 85)            list.push({ icon: "🏆", name: "Мастер диалога", desc: "85%+ эффективности" });
    return list;
  }
}

const engine = new GameEngine();
