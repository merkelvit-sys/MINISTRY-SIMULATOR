"use strict";

class i18nManager {
  constructor() {
    this.currentLang = this.loadLanguage();
    this.listeners = new Set();

    this.dictionary = {
      ru: {
        appTitle: "ТРЕНАЖЁР",
        appSubtitle: "СЛУЖЕНИЯ",
        appDesc: "Подбирай ответ под характер собеседника. Доверие важнее скорости.",
        modeNormal: "Обычный режим",
        modeHardcore: "⚡ Испытание на прочность",
        level: "Уровень",
        card: "Карточка",
        step: "Шаг",
        themes: "тем",
        startBtn: "Начать →",
        unmasteredBtn: "Проработать неизученные (10 тем) 🎯",
        allMastered: "Все 10 тем освоены! ✓",
        playerProfile: "Профиль игрока",
        sessionsPassed: "Сессий пройдено:",
        overallRating: "Общий рейтинг:",
        achievementsTitle: "Достижения в служении:",
        correct: "✅ Верно:",
        wrong: "❌ Неверно:",
        points: "Баллы:",
        trust: "Доверие:",
        situation: "Ситуация:",

        hudCorrect: "✅ Верно:",
        hudWrong: "❌ Неверно:",
        hudPoints: "Баллы:",

        situationLabel: "Ситуация:",
        scriptureListPlaceholder: "Список стихов",
        bibleSearchPlaceholder: "Поиск стиха (напр. 'даром' или 'Иоанна')",
        scriptureApplied: "Стих применён ✓",
        openScripture: "📖 Открыть текст Библии:",
        nextStep: "Продолжить разговор →",
        nextNpc: "Следующий собеседник →",
        finishSession: "Завершить сессию",
        masteryCompleted: "Освоено тем:",
        debriefTitle: "🔍 Подробный разбор диалогов",
        yourChoice: "Ваш выбор:",
        bestChoice: "Лучший ответ:",
        playAgain: "Новый выход ↻",
        toMenu: "В меню",
        comboStreak: "🔥 Серия ×",
        masterDialogue: "Мастер диалога 🏆",
        confidentMinister: "Уверенный служитель 👍",
        hasBase: "Есть база 🌱",
        needsPractice: "Нужна практика 📚",

        feedbackPerfect: "🎯 Идеально! Полное взаимопонимание",
        feedbackPartial: "👍 Неплохо, но можно точнее",
        feedbackPoor: "🗣️ Мимо — собеседник насторожился",
        feedbackTimedOutLeft: "⏱️ Время вышло — собеседник ушёл",
        feedbackTimedOut: "⏱️ Время вышло — вы не успели ответить",
        feedbackLeft: "🚶 Собеседник прекратил разговор — доверие упало до 0%",
        fatigueMsg: "⚠️ Штраф за шаблонность: вы всё время выбираете один и тот же тон общения!",
        scriptureAlreadyUsed: "Вы уже приводили стих в этом шаге.",
        scriptureSuccess: "Отличный стих! Собеседник впечатлен (+15% доверия).",
        scriptureFailure: "Собеседник не понял, к чему этот стих. (-10% доверия)",

        achNoWrong: "✨ Безупречный выход",
        achStreak: "🔥 Огненная серия",
        achDiplomat: "🕊️ Дипломат",
        achExplorer: "📖 Исследователь Писания",
        achMaster: "🏆 Мастер диалога",

        tipSuccess: "💡 Отличный выбор! Вы выбрали тон, который полностью согласуется с характером собеседника.",
        tipPushy: "💡 Напористый тон отталкивает людей и снижает доверие. В служении важно сохранять кротость и уважение.",
        tipDismissive: "💡 Сухой ответ создаёт впечатление равнодушия. Сочувствие и такт помогают открывать сердца.",
        tipFalse: "💡 Искажение фактов или неточные утверждения разрушают доверие собеседника.",
        tipHurryingDeep: "💡 Спешащему человеку сложно выслушать длинную мысль. Сначала дайте краткий ответ.",
        tipSkepticNoTact: "💡 Эмоциональному собеседнику в первую очередь важно почувствовать сочувствие и уважение.",
        tipDefault: "💡 Старайтесь проявлять такт (respect) и мягко направлять мысль к Библии (deep).",

        profileBegin: "Пройдите ещё пару сессий, чтобы профиль собрал аналитику вашего стиля.",
        profilePushy: "💡 Совет: Вы часто используете напористые ответы. Старайтесь больше проявлять такт (respect) и опираться на Писание (deep).",
        profileDeepLow: "💡 Совет: Вы часто используете Писание, но иногда людям нужен просто короткий ответ или сочувствие. Следите за нетерпеливыми собеседниками.",
        profileHigh: "🏆 Отлично! У вас сформировался чуткий и адаптивный подход к разным людям.",
        profileMid: "💡 Аналитика: Вы развиваетесь. Экспериментируйте с разными тонами, чтобы найти лучший ключ к каждому характеру.",

        timerLabel: "Время на размышление: {{seconds}} с",
        yourChoiceLabel: "Ваш выбор:",
        bestChoiceLabel: "Лучший ответ:",
        feedbackYourMark: "← ваш выбор",
        feedbackBestMark: "✓ лучший",
        feedbackBestTone: "Лучший тон здесь:",
        feedbackPointsLabel: "➕ Баллы:",
        feedbackTrustLabel: "Доверие:",
        feedbackTotalLabel: "Всего:",
        debriefStepLabel: "Шаг",
        profileAnalyticsTitle: "Аналитика профиля:",
        achievementFallback: "Пока без ачивок — попробуй ещё раз!",
        bottomHint: "Механика: у каждого свой характер и стартовое доверие. Грубость роняет доверие — при 0% собеседник уходит.",
        scriptureUnavailable: "Текст стиха пока недоступен в базе.",
        conflictWarn: "⚠️ Спор! Снизьте градус напряжения",
      },
      de: {
        appTitle: "DIENST-TRAINER",
        appSubtitle: "Dienst",
        appDesc: "Passe deine Antwort an den Charakter des Gesprächspartners an. Vertrauen ist wichtiger als Tempo.",
        modeNormal: "Normaler Modus",
        modeHardcore: "⚡ Härteprüfung",
        level: "Stufe",
        card: "Karte",
        step: "Schritt",
        themes: "Themen",
        startBtn: "Starten →",
        unmasteredBtn: "Ungelernte durcharbeiten (10 Themen) 🎯",
        allMastered: "Alle 10 Themen gemeistert! ✓",
        playerProfile: "Spielerprofil",
        sessionsPassed: "Absolvierte Sitzungen:",
        overallRating: "Gesamtwertung:",
        achievementsTitle: "Errungenschaften im Dienst:",
        correct: "✅ Richtig:",
        wrong: "❌ Falsch:",
        points: "Punkte:",
        trust: "Vertrauen:",
        situation: "Situation:",

        hudCorrect: "✅ Richtig:",
        hudWrong: "❌ Falsch:",
        hudPoints: "Punkte:",

        situationLabel: "Situation:",
        scriptureListPlaceholder: "Versliste",
        bibleSearchPlaceholder: "Vers suchen (z.B. 'umsonst' oder 'Johannes')",
        scriptureApplied: "Vers angewendet ✓",
        openScripture: "📖 Bibeltext öffnen:",
        nextStep: "Gespräch fortsetzen →",
        nextNpc: "Nächster Gesprächspartner →",
        finishSession: "Sitzung beenden",
        masteryCompleted: "Gemeisterte Themen:",
        debriefTitle: "🔍 Detaillierte Gesprächsanalyse",
        yourChoice: "Deine Wahl:",
        bestChoice: "Beste Antwort:",
        playAgain: "Neuer Versuch ↻",
        toMenu: "Zum Menü",
        comboStreak: "🔥 Serie ×",
        masterDialogue: "Gesprächsmeister 🏆",
        confidentMinister: "Überzeugender Diener 👍",
        hasBase: "Gute Basis 🌱",
        needsPractice: "Übung erforderlich 📚",

        feedbackPerfect: "🎯 Perfekt! Volles Verständnis",
        feedbackPartial: "👍 Gut, aber präziser geht es",
        feedbackPoor: "🗣️ Vorbei — Gesprächspartner ist misstrauisch",
        feedbackTimedOutLeft: "⏱️ Zeit abgelaufen — Gesprächspartner ging",
        feedbackTimedOut: "⏱️ Zeit abgelaufen — keine Antwort",
        feedbackLeft: "🚶 Gespräch abgebrochen — Vertrauen auf 0%",
        fatigueMsg: "⚠️ Abwechslung fehlt: immer der gleiche Ton!",
        scriptureAlreadyUsed: "Du hast diesen Vers bereits in diesem Schritt angeführt.",
        scriptureSuccess: "Perfekter Vers! Gesprächspartner beeindruckt (+15% Vertrauen).",
        scriptureFailure: "Gesprächspartner verstand den Vers nicht. (-10% Vertrauen)",

        achNoWrong: "✨ Tadelloser Durchgang",
        achStreak: "🔥 Feuerserie",
        achDiplomat: "🕊️ Diplomat",
        achExplorer: "📖 Schriftforscher",
        achMaster: "🏆 Meisterdialog",

        tipSuccess: "💡 Perfekte Wahl! Der Ton passt zum Charakter.",
        tipPushy: "💡 Aufdringlicher Ton stößt ab. Bewahre Sanftmut und Respekt.",
        tipDismissive: "💡 Trockene Antwort wirkt gleichgültig.",
        tipFalse: "💡 Tatsachenverdrehung zerstört Vertrauen.",
        tipHurryingDeep: "💡 Eiligen reicht eine kurze Antwort.",
        tipSkepticNoTact: "💡 Emotionaler Gesprächspartner erwartet Mitgefühl und Respekt.",
        tipDefault: "💡 Zeige Takt (respect) und lenke sanft zur Bibel (deep).",

        profileBegin: "Absolviere noch ein paar Sitzungen...",
        profilePushy: "💡 Tipp: Du nutzt oft aufdringliche Antworten. Zeige mehr Takt (respect) und verweise auf die Bibel (deep).",
        profileDeepLow: "💡 Tipp: Oft nutzt du die Schrift, aber die Leute brauchen eine kurze Antwort. Achte auf eilige Gesprächspartner.",
        profileHigh: "🏆 Ausgezeichnet! Du hast einen einfühlsamen Ansatz entwickelt.",
        profileMid: "💡 Analyse: Du entwickelst dich weiter. Experimentiere mit Tönen...",

        timerLabel: "Nachdenkzeit: {{seconds}} s",
        yourChoiceLabel: "Deine Wahl:",
        bestChoiceLabel: "Beste Antwort:",
        feedbackYourMark: "← deine Wahl",
        feedbackBestMark: "✓ beste",
        feedbackBestTone: "Bester Ton hier:",
        feedbackPointsLabel: "➕ Punkte:",
        feedbackTrustLabel: "Vertrauen:",
        feedbackTotalLabel: "Gesamt:",
        debriefStepLabel: "Schritt",
        profileAnalyticsTitle: "Profilanalyse:",
        achievementFallback: "Noch keine Errungenschaften — versuche es nochmal!",
        bottomHint: "Mechanik: Jeder hat seinen Charakter und Startvertrauen. Grobheit senkt das Vertrauen — bei 0% geht der Gesprächspartner.",
        scriptureUnavailable: "Der Vers ist in der Datenbank noch nicht verfügbar.",
        conflictWarn: "⚠️ Konflikt! Senke die Spannung",
      }
    };
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((fn) => {
      try { fn(this.currentLang); }
      catch (e) { console.error("[i18n] Ошибка подписки:", e); }
    });
  }

  loadLanguage() {
    try {
      const saved = localStorage.getItem("service_sim_lang");
      if (saved === "de" || saved === "ru") return saved;
    } catch (e) {}
    return "ru";
  }

  setLanguage(lang) {
    if (lang === "ru" || lang === "de") {
      this.currentLang = lang;
      try { localStorage.setItem("service_sim_lang", lang); } catch (e) {}
      this.notify();
    }
  }

  t(key, fallback = "") {
    const curDict = this.dictionary[this.currentLang];
    if (curDict && curDict[key]) return curDict[key];
    const ruDict = this.dictionary["ru"];
    if (ruDict && ruDict[key]) return ruDict[key];
    return fallback || key;
  }

  getText(contentObj) {
    if (!contentObj) return "";
    if (typeof contentObj === "string") return contentObj;
    return contentObj[this.currentLang] || contentObj.ru || contentObj.de || "";
  }

  format(key, vars = {}) {
    let str = this.t(key);
    if (typeof vars === 'object') {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replaceAll("{{" + k + "}}", String(v));
      }
    }
    return str;
  }
}

window.i18n = new i18nManager();
