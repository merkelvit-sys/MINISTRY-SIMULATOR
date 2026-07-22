"use strict";

/**
 * AvatarRenderer — Процедурный генератор векторных SVG-аватаров и Lip-Sync анимации.
 * Автоматически вычисляет выражения лица на основе текущего значения Доверия (Trust %).
 */
class AvatarRenderer {
  /**
   * Карта профилей стиля для каждого характера
   */
  static get PERSONALITY_PRESETS() {
    return {
      sincere:    { skin: "#fde047", hair: "#854d0e", glasses: false, female: false },
      hurrying:   { skin: "#fed7aa", hair: "#9a3412", glasses: false, female: false },
      skeptic:    { skin: "#e2e8f0", hair: "#475569", glasses: true,  female: false },
      rel_leader: { skin: "#fef08a", hair: "#713f12", glasses: false, female: false },
      relative:   { skin: "#fbcfe8", hair: "#9d174d", glasses: true,  female: true },
      colleague:  { skin: "#bae6fd", hair: "#0369a1", glasses: false, female: true },
    };
  }

  /**
   * Отрисовка интерактивного SVG-аватара
   * @param {Object} personality - Объект характера из PERSONALITIES
   * @param {number} trust - Текущее доверие (0 - 100)
   * @param {boolean} isTalking - Флаг воспроизведения речи (Lip-Sync)
   * @returns {string} SVG HTML с обёрткой
   */
  static render(personality, trust = 50, isTalking = false) {
    if (!personality) {
      return `<div class="avatar">👤</div>`;
    }

    const id = personality.id || "sincere";
    const preset = AvatarRenderer.PERSONALITY_PRESETS[id] || {
      skin: "#fde047",
      hair: "#854d0e",
      glasses: false,
      female: false
    };

    // Расчет мимики
    let mouthD, eyebrowLeftD, eyebrowRightD, moodClass;

    if (trust < 35) {
      // Сердитый / Напряжённый
      eyebrowLeftD = "M 26,38 L 42,45";
      eyebrowRightD = "M 74,38 L 58,45";
      mouthD = "M 34,74 Q 50,60 66,74";
      moodClass = "anim-angry-pulse";
    } else if (trust > 70) {
      // Расположенный / Улыбающийся
      eyebrowLeftD = "M 26,36 Q 34,30 42,36";
      eyebrowRightD = "M 74,36 Q 66,30 58,36";
      mouthD = "M 34,65 Q 50,82 66,65";
      moodClass = "anim-bounce";
    } else {
      // Нейтральный
      eyebrowLeftD = "M 26,37 L 42,37";
      eyebrowRightD = "M 74,37 L 58,37";
      mouthD = "M 35,68 L 65,68";
      moodClass = "";
    }

    const talkingClass = isTalking ? "is-talking" : "";
    const emojiFallback = personality.avatar || "👤";

    return `
      <div class="avatar-svg-container ${moodClass}">
        <svg viewBox="0 0 100 100" class="avatar-svg" width="64" height="64">
          <!-- Контур лица -->
          <circle cx="50" cy="50" r="44" fill="${preset.skin}" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
          
          <!-- Волокно / причёска -->
          ${preset.female ? `
            <path d="M 10,50 Q 50,5 90,50 Q 95,85 85,90 Q 50,70 15,90 Q 5,85 10,50" fill="${preset.hair}" />
            <path d="M 20,40 Q 50,12 80,40 Q 50,25 20,40" fill="${preset.hair}" />
          ` : `
            <path d="M 15,42 Q 50,10 85,42 Q 50,22 15,42" fill="${preset.hair}" />
          `}

          <!-- Глаза -->
          <circle cx="34" cy="46" r="4.5" fill="#1e293b"/>
          <circle cx="66" cy="46" r="4.5" fill="#1e293b"/>
          <circle cx="35.5" cy="44.5" r="1.5" fill="#ffffff"/>
          <circle cx="67.5" cy="44.5" r="1.5" fill="#ffffff"/>

          <!-- Брови -->
          <path d="${eyebrowLeftD}" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>
          <path d="${eyebrowRightD}" stroke="#1e293b" stroke-width="3" stroke-linecap="round"/>

          <!-- Очки -->
          ${preset.glasses ? `
            <circle cx="34" cy="46" r="9" fill="none" stroke="#334155" stroke-width="2"/>
            <circle cx="66" cy="46" r="9" fill="none" stroke="#334155" stroke-width="2"/>
            <line x1="43" y1="46" x2="57" y2="46" stroke="#334155" stroke-width="2"/>
          ` : ""}

          <!-- Анимированный Рот Lip-Sync -->
          <path class="avatar-mouth ${talkingClass}" d="${mouthD}" stroke="#991b1b" stroke-width="3.5" stroke-linecap="round" fill="none"/>
        </svg>
        <span class="avatar-emoji-badge">${emojiFallback}</span>
      </div>
    `;
  }
}

window.AvatarRenderer = AvatarRenderer;
