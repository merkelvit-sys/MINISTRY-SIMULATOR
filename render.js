"use strict";

document.addEventListener("click", (e) => {
  if (e.target.closest("button") || e.target.closest(".level")) {
    soundFX.playClick();
  }
});

function getHeaderHTML() {
  const cur = window.i18n ? window.i18n.currentLang : "ru";
  const t = (k) => window.i18n ? window.i18n.t(k) : k;
  return `
    <div class="lang-switcher">
      <button class="lang-btn ${cur === 'ru' ? 'active' : ''}" onclick="changeLanguage('ru')">RU</button>
      <button class="lang-btn ${cur === 'de' ? 'active' : ''}" onclick="changeLanguage('de')">DE</button>
    </div>
    <h1>${t("appTitle")} <span>${t("appSubtitle")}</span></h1>
  `;
}

window.changeLanguage = function(lang) {
  if (window.i18n) {
    window.i18n.setLanguage(lang);
  }
};

if (window.i18n) {
  window.i18n.subscribe(() => {
    if (window.engine && window.engine.session) {
      renderStep();
    } else {
      renderMenu();
    }
  });
}

let selectedMode = "normal";

function npcHeaderHTML(p, trust, isTalking = false) {
  const mood = GameEngine.moodFromTrust(trust);
  const cue = GameEngine.getNpcCue(p, trust);
  const avatarSvg = window.AvatarRenderer ? window.AvatarRenderer.render(p, trust, isTalking) : `<div class="avatar">${p.avatar}</div>`;
  const name = window.i18n ? window.i18n.getText(p.name) : p.name;
  const trait = window.i18n ? window.i18n.getText(p.trait) : p.trait;
  return `
    <div class="npc">
      ${avatarSvg}
      <div class="npc-info">
        <div class="npc-name">
          <span>${name}</span>
          <span class="mood" id="moodStatus">${mood.face} ${Math.floor(trust)}% · ${mood.label}</span>
        </div>
        <div class="npc-trait">${trait}</div>
        <div class="trust-wrap"><div class="trust-bar" id="trustBar" style="width:${trust}%; background:${mood.color}"></div></div>
        <div class="npc-cue">${cue}</div>
      </div>
    </div>`;
}

function renderMenu() {
  engine.stopTimer();
  const rows = [];
  const t = (k) => window.i18n ? window.i18n.t(k) : k;
  const getText = (obj) => window.i18n ? window.i18n.getText(obj) : obj;

  for (let i = 1; i <= 6; i++) {
    const lv = LEVELS.find((l) => l.id === i);
    if (lv) {
      const mastery = engine.profile.getLevelMastery(lv);
      const lvName = getText(lv.name);
      const lvDesc = getText(lv.desc);
      const unmasteredBtn = mastery.completed < mastery.total
        ? `<button class="btn-unmastered" data-unmastered="${lv.id}">${t("unmasteredBtn")}</button>`
        : `<span class="tag" style="color:var(--good); border-color:var(--good);">${t("allMastered")}</span>`;

      rows.push(`
        <div class="level-card" style="background:var(--card2); border:1px solid var(--line); border-radius:16px; padding:16px 20px; margin-bottom:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <div style="flex:1;">
              <div class="lv-name">${t("level")} ${lv.id}: ${lvName}</div>
              <div class="npc-trait">${lvDesc} · ${lv.themes.length} ${t("themes")}</div>
              <div class="mastery-wrap">
                <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--muted);">
                  <span>${t("masteryCompleted")} <b>${mastery.completed} / ${mastery.total}</b></span>
                  <span>${mastery.percent}%</span>
                </div>
                <div class="mastery-bar-bg"><div class="mastery-bar-fill" style="width:${mastery.percent}%"></div></div>
              </div>
              <div style="margin-top:6px;">${unmasteredBtn}</div>
            </div>
            <button class="btn" style="margin:0 0 0 16px; padding:10px 18px;" data-level="${lv.id}">${t("startBtn")}</button>
          </div>
        </div>`);
    } else {
      rows.push(`
        <div class="level locked">
          <div>
            <div class="lv-name">${t("level")} ${i}</div>
            <div class="npc-trait">🔒</div>
          </div>
          <div>🔒</div>
        </div>`);
    }
  }
  
  // Profile stats & Badges
  const p = engine.profile.data;
  const userBadges = p.badges || [];
  
  const badgesHtml = Object.values(BADGES).map(b => {
    const isUnlocked = userBadges.includes(b.id);
    const bName = getText(b.name);
    const bDesc = getText(b.desc);
    return `
      <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="badge-icon">${b.icon}</div>
        <div>
          <div class="badge-title">${bName} ${isUnlocked ? '✓' : ''}</div>
          <div class="badge-desc">${bDesc}</div>
        </div>
      </div>`;
  }).join("");

  const profileHtml = p.sessions > 0 ? `
    <div class="fb" style="margin-bottom:16px;">
      <h3>${t("playerProfile")}</h3>
      <div class="npc-trait">${t("sessionsPassed")} <b>${p.sessions}</b> | ${t("overallRating")} <b>${p.achievable > 0 ? Math.round((p.earned/p.achievable)*100) : 0}%</b></div>
      <div style="margin-top:12px;">
        <div style="font-weight:700; font-size:13px; color:var(--fg); margin-bottom:8px;">${t("achievementsTitle")}</div>
        <div class="badge-grid">${badgesHtml}</div>
      </div>
    </div>
  ` : `
    <div class="fb" style="margin-bottom:16px;">
      <h3>${t("achievementsTitle")}</h3>
      <div class="badge-grid">${badgesHtml}</div>
    </div>
  `;

  app.innerHTML = `
    ${getHeaderHTML()}
    <p class="sub">${window.i18n ? window.i18n.t("appDesc") : "Подбирай ответ под характер собеседника. Доверие важнее скорости."}</p>
    
    <div class="mode-selector">
      <button class="mode-btn ${selectedMode === 'normal' ? 'active' : ''}" id="modeNormal">${window.i18n ? window.i18n.t("modeNormal") : "Обычный режим"}</button>
      <button class="mode-btn ${selectedMode === 'hardcore' ? 'active hardcore' : ''}" id="modeHardcore">${window.i18n ? window.i18n.t("modeHardcore") : "⚡ Испытание на прочность"}</button>
    </div>

    ${profileHtml}
    <div class="card"><div class="levels">${rows.join("")}</div></div>
    <p class="sub">Механика: у каждого свой характер и стартовое доверие. Грубость роняет доверие — при 0% собеседник уходит.</p>
  `;

  // Handlers
  $("#modeNormal").addEventListener("click", () => { selectedMode = "normal"; renderMenu(); });
  $("#modeHardcore").addEventListener("click", () => { selectedMode = "hardcore"; renderMenu(); });

  app.querySelectorAll("button[data-level]").forEach((el) => {
    el.addEventListener("click", () => engine.startSession(LEVELS.find((l) => l.id === +el.dataset.level), selectedMode, false));
  });

  app.querySelectorAll("button[data-unmastered]").forEach((el) => {
    el.addEventListener("click", (e) => {
      e.stopPropagation();
      engine.startSession(LEVELS.find((l) => l.id === +el.dataset.unmastered), selectedMode, true);
    });
  });
}

function renderTrustUpdate(trust, msg, type) {
  const mood = GameEngine.moodFromTrust(trust);
  const bar = $("#trustBar");
  const status = $("#moodStatus");
  if (bar) { bar.style.width = trust + "%"; bar.style.background = mood.color; }
  if (status) status.innerHTML = `${mood.face} ${Math.floor(trust)}% · ${mood.label}`;
  
  const notify = document.createElement("div");
  notify.className = `trust-notify ${type}`;
  notify.textContent = msg;
  $("#dynamicNotices").appendChild(notify);
  setTimeout(() => notify.remove(), 4000);
}

function renderStep() {
  const t = (k) => window.i18n ? window.i18n.t(k) : k;
  const getText = (obj) => window.i18n ? window.i18n.getText(obj) : obj;
  const card = engine.session.cards[engine.session.index];
  const p = card.personality;
  const step = card.steps[engine.session.stepIndex];
  const multi = card.steps.length > 1;

  app.innerHTML = `
    ${getHeaderHTML()}
    <div class="card ${step.isConflict ? 'conflict' : ''}">
      <div class="hud">
        <span>Уровень <b>${engine.session.level.id}</b> · Карточка <b>${engine.session.index + 1}</b>/${engine.session.cards.length}${multi ? ` · Шаг <b>${engine.session.stepIndex + 1}</b>/${card.steps.length}` : ""} ${engine.session.mode === 'hardcore' ? '<span class="tag" style="border-color:var(--bad); color:var(--bad);">⚡ Испытание</span>' : ''}</span>
        ${engine.session.streak > 1 ? `<span class="streak-badge">${t('comboStreak')}${engine.session.streak}</span>` : ""}
      </div>
      <div class="hud">
        <span>${t('hudCorrect')} <b>${engine.session.correct}</b> · ${t('hudWrong')} <b>${engine.session.wrong}</b></span>
        <span>${t('hudPoints')} <b>${engine.session.earned}</b></span>
      </div>
      ${npcHeaderHTML(p, engine.session.trust, true)}
      <div id="dynamicNotices"></div>
      ${multi && engine.session.stepIndex > 0 && !step.isConflict ? `<div class="npc-trait" style="margin-bottom:12px;">${t('situationLabel')} «${getText(card.theme.question)}»</div>` : ""}
      ${step.isConflict ? `<div class="conflict-badge">${t('conflictWarn')}</div>` : ""}
      <div class="question">«${getText(step.prompt)}»</div>
      
      <div class="bible-search">
        <input type="text" id="bSearchInput" placeholder="${t('bibleSearchPlaceholder')}" autocomplete="off" />
        <div id="bSearchResults" class="search-results"></div>
      </div>

      <div class="timer-wrap"><div class="timer-bar" id="timerBar"></div></div>
      <div class="timer-label" id="timerLabel"></div>
      <div class="answers" id="answers"></div>
    </div>
  `;
  soundFX.playPop();
  const box = $("#answers");
  step.answers.forEach((a, i) => {
    const b = document.createElement("button");
    b.className = "answer";
    b.textContent = getText(a.text);
    b.addEventListener("click", () => engine.resolveAnswer(i));
    box.appendChild(b);
  });
  
  // Bible search logic
  const sInput = $("#bSearchInput");
  const sRes = $("#bSearchResults");
  sInput.addEventListener("input", (e) => {
    const q = e.target.value;
    const res = engine.searchScripture(q);
    if (res.length > 0) {
      sRes.innerHTML = res.map(r => `
        <div class="sr-item" data-ref="${r.ref}">
          <b>${r.ref}</b> - ${r.text.substring(0, 45)}...
        </div>`).join("");
      sRes.style.display = "block";
    } else {
      sRes.style.display = "none";
    }
  });
  sRes.addEventListener("click", (e) => {
    const item = e.target.closest(".sr-item");
    if (item) {
      const result = engine.applyScripture(item.dataset.ref);
      sInput.value = "";
      sRes.style.display = "none";
      if(result.success) {
        sInput.disabled = true;
        sInput.placeholder = t('scriptureApplied');
      }
    }
  });
  
  let currentThinkTime = p.thinkTime || DEFAULT_THINK_TIME;
  if (engine.session.streak >= 3) currentThinkTime = currentThinkTime * 0.7;
  engine.startTimer(currentThinkTime, () => engine.resolveAnswer(-1));
}

function renderStepFeedback(pl) {
  const t = (k) => window.i18n ? window.i18n.t(k) : k;
  const getText = (obj) => window.i18n ? window.i18n.getText(obj) : obj;
  const { card, step, scores, best, bestIndex, chosenIndex, raw, points, mult, trustBefore, trustAfter, left, lastStep, timedOut, fatigueMsg } = pl;
  const p = card.personality;
  const answers = step.answers;

  let tier, title;
  if (timedOut && left)            { tier = "poor";    title = t("feedbackTimedOutLeft"); }
  else if (timedOut)               { tier = "poor";    title = t("feedbackTimedOut"); }
  else if (left)                   { tier = "poor";    title = t("feedbackLeft"); }
  else if (raw === best && raw > 0){ tier = "perfect"; title = t("feedbackPerfect"); }
  else if (raw >= 0)               { tier = "partial"; title = t("feedbackPartial"); }
  else                             { tier = "poor";    title = t("feedbackPoor"); }

  const bestTones = answers[bestIndex].tones.map((to) => getText(TONES[to])).join(", ");
  const answersHtml = answers.map((a, i) => {
    const cls = ["answer"];
    if (scores[i] === best) cls.push("best");
    if (i === chosenIndex && scores[i] !== best) cls.push("badpick");
    if (i === chosenIndex) cls.push("picked");
    const tags = a.tones.map((to) => `<span class="tag">${getText(TONES[to])}</span>`).join("");
    const mark = i === chosenIndex ? (" " + t("feedbackYourMark")) : (scores[i] === best ? (" " + t("feedbackBestMark")) : "");
    return `<button class="${cls.join(" ")}" disabled>${getText(a.text)}${tags}<span class="npc-trait">${mark}</span></button>`;
  }).join("");

  const trustColor = GameEngine.moodFromTrust(trustAfter).color;
  const scr = step.scripture && SCRIPTURES[step.scripture] ? `<div class="scripture-link" data-ref="${step.scripture}">${t('openScripture')} ${step.scripture}</div>` : "";
  const combo = mult > 1 ? `<div class="combo">${t('comboStreak')}${mult}</div>` : "";
  const fatigue = fatigueMsg ? `<div class="fatigue-warn">${getText(fatigueMsg)}</div>` : "";
  
  const nextLabel = (left || lastStep) ? t("nextNpc") : t("nextStep");
  const isEnd = (left || lastStep) && engine.session.index === engine.session.cards.length - 1;

  app.innerHTML = `
    ${getHeaderHTML()}
    <div class="card ${step.isConflict ? 'conflict' : ''}">
      ${npcHeaderHTML(p, trustAfter)}
      <div class="question">«${getText(step.prompt)}»</div>
      <div class="answers">${answersHtml}</div>
      <div class="fb ${tier}">
        <h3>${title}</h3>
        <div>${getText(p.tip || p.trait)} ${t('feedbackBestTone')} <b>${bestTones}</b>.</div>
        <div class="scr-points">${t('feedbackPointsLabel')} <b>${points}</b> · ${t('feedbackTrustLabel')} ${Math.floor(trustBefore)}% → <b style="color:${trustColor}">${Math.floor(trustAfter)}%</b> · ${t('feedbackTotalLabel')} <b>${engine.session.earned}</b> · ✅ ${engine.session.correct} / ❌ ${engine.session.wrong}</div>
        ${combo}
        ${fatigue}
        ${scr}
      </div>
      <button class="btn" id="nextBtn">${isEnd ? t("finishSession") : nextLabel}</button>
    </div>
  `;
  if (tier === "poor") {
    soundFX.playFail();
  } else {
    soundFX.playSuccess();
  }
  const link = $(".scripture-link");
  if (link) link.addEventListener("click", () => openBibleModal(link.dataset.ref));
  $("#nextBtn").addEventListener("click", () => engine.advance());
}

function renderResult() {
  const t = (k, p) => window.i18n ? window.i18n.t(k, p) : k;
  const getText = (obj) => window.i18n ? window.i18n.getText(obj) : obj;
  engine.stopTimer();
  const pct = engine.session.achievable > 0 ? Math.min(100, Math.round((engine.session.earned / engine.session.achievable) * 100)) : 0;
  
  let grade = t("ui.grade_master", t("masterDialogue"));

  const achs = GameEngine.achievementsFor(engine.session, pct);
  const achHtml = achs.length
    ? achs.map((a) => {
        const name = a.nameKey ? t(a.nameKey) : (a.name || "");
        const desc = a.descKey ? t(a.descKey, a.params) : (a.desc || "");
        return `
          <div class="ach">
            <span class="ach-ico">${a.icon}</span>
            <div>
              <b>${name}</b>
              <div class="npc-trait">${desc}</div>
            </div>
          </div>`;
      }).join("")
    : `<div class="npc-trait">${t('ui.no_achievements', t('achievementFallback'))}</div>`;

  const newBadgesHtml = (engine.session.newBadges && engine.session.newBadges.length > 0)
    ? `<div class="fb perfect" style="margin:16px 0; text-align:left;">
        <h3>🎖️ ${t('achievementsTitle')}</h3>
        <div style="display:flex; flex-direction:column; gap:8px; margin-top:8px;">
          ${engine.session.newBadges.map(b => `<div style="font-weight:700;">${b.icon} ${getText(b.name)} — <span style="font-weight:normal; font-size:13px; color:var(--muted);">${getText(b.desc)}</span></div>`).join("")}
        </div>
       </div>`
    : "";

  const rawFeedback = engine.profile.getFeedback();
  const profileAnalysisText = typeof rawFeedback === "object" ? getText(rawFeedback) : rawFeedback;
  const ptsAbbr = t('ui.pts_abbr', 'б.');

  // Debriefing list HTML
  const debriefListHtml = engine.session.log.map((logItem, idx) => {
    const isGood = logItem.raw > 0;
    const chosenTonesStr = logItem.chosenTones.map(tKey => {
      const tObj = TONES[tKey] || tKey;
      return getText(tObj);
    }).join(", ");
    const bestTonesStr = logItem.bestTones.map(tKey => {
      const tObj = TONES[tKey] || tKey;
      return getText(tObj);
    }).join(", ");
    
    return `
      <div class="debrief-card">
        <div class="debrief-header">
          <span>${t('ui.step_label', t('debriefStepLabel'))} ${idx + 1} · ${getText(logItem.personalityName)}</span>
          <span style="color:${isGood ? 'var(--good)' : 'var(--bad)'}; font-weight:700;">
            ${isGood ? `+${logItem.points} ${ptsAbbr} (${t('feedbackTrustLabel')} ${Math.floor(logItem.trustBefore)}% → ${Math.floor(logItem.trustAfter)}%)` : `${t('feedbackTrustLabel')} ${Math.floor(logItem.trustBefore)}% → ${Math.floor(logItem.trustAfter)}%`}
          </span>
        </div>
        <div class="debrief-question">«${getText(logItem.question || logItem.stepPrompt)}»</div>
        <div class="debrief-choice ${isGood ? 'good' : 'bad'}">
          <b>${t('ui.yourChoiceLabel', t('yourChoiceLabel'))}</b> ${getText(logItem.chosenText)} ${chosenTonesStr ? `<span class="tag">${chosenTonesStr}</span>` : ''}
        </div>
        ${!isGood ? `
          <div class="debrief-optimal">
            <b>${t('ui.bestChoiceLabel', t('bestChoiceLabel'))}</b> ${getText(logItem.bestText)} <span class="tag">${bestTonesStr}</span>
          </div>
        ` : ''}
        <div class="debrief-tip">${getText(logItem.tip)}</div>
      </div>`;
  }).join("");

  app.innerHTML = `
    ${getHeaderHTML()}
    <div class="card center">
      <div class="big-score">${pct}%</div>
      <h3>${grade}</h3>
      
      ${newBadgesHtml}

      <!-- Блок аналитики -->
      <div class="fb partial" style="text-align:left; margin:16px 0;">
        <h4 style="margin:0 0 4px;">💡 ${t('ui.profile_analysis', t('profileAnalyticsTitle'))}</h4>
        <div style="font-size:13px; color:var(--muted)">
          ${t('ui.profile_analysis_text', profileAnalysisText)}
        </div>
      </div>

      <!-- Статистика -->
      <div class="hud" style="justify-content:center; flex-wrap:wrap; gap:14px;">
        <span>✅ ${t('ui.correct', t('hudCorrect'))}: <b>${engine.session.correct}</b></span>
        <span>❌ ${t('ui.wrong', t('hudWrong'))}: <b>${engine.session.wrong}</b></span>
        <span>🔥 ${t('ui.best_streak', 'Лучшая серия')}: <b>${engine.session.maxStreak}</b></span>
        <span>🏅 ${t('ui.points_label', t('hudPoints'))}: <b>${engine.session.earned}</b>/${engine.session.achievable}</span>
        <span>🚶 ${t('ui.left_count', 'Ушли')}: <b>${engine.session.leftCount}</b></span>
      </div>

      <!-- Список достижений -->
      <div class="ach-list">${achHtml}</div>

      <div class="debrief-section">
        <div class="debrief-title">${t('debriefTitle')} (${engine.session.log.length} ${t('ui.step_label', t('step'))})</div>
        <div class="debrief-list">${debriefListHtml}</div>
      </div>

      <div style="margin-top:20px; display:flex; gap:12px; justify-content:center;">
        <button class="btn" id="againBtn">${t('ui.btn_again', t('playAgain'))} ↻</button>
        <button class="btn secondary" id="menuBtn">${t('ui.btn_menu', t('toMenu'))}</button>
      </div>
    </div>
  `;
  soundFX.playSuccess();
  $("#againBtn").addEventListener("click", () => engine.startSession(engine.session.level, engine.session.mode));
  $("#menuBtn").addEventListener("click", renderMenu);
}

function openBibleModal(ref) {
  if (engine.session) engine.session.scriptureOpens++;
  $("#modalRef").textContent = ref;
  const s = SCRIPTURES[ref];
  $("#modalText").textContent = s ? (window.i18n ? window.i18n.getText(s.text) : s.text) : (window.i18n ? window.i18n.t("scriptureUnavailable") : "Текст стиха пока недоступен в базе.");
  $("#bibleModal").classList.add("active");
}
function closeBibleModal() { $("#bibleModal").classList.remove("active"); }

$("#closeModalBtn").addEventListener("click", closeBibleModal);
$("#bibleModal").addEventListener("click", (e) => { if (e.target.id === "bibleModal") closeBibleModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBibleModal(); });

renderMenu();
