"use strict";

const HEADER = `<h1>ТРЕНАЖЁР <span>СЛУЖЕНИЯ</span></h1>`;

function npcHeaderHTML(p, trust) {
  const mood = GameEngine.moodFromTrust(trust);
  return `
    <div class="npc">
      <div class="avatar">${p.avatar}</div>
      <div class="npc-info">
        <div class="npc-name">
          <span>${p.name}</span>
          <span class="mood" id="moodStatus">${mood.face} ${Math.floor(trust)}% · ${mood.label}</span>
        </div>
        <div class="npc-trait">${p.trait}</div>
        <div class="trust-wrap"><div class="trust-bar" id="trustBar" style="width:${trust}%; background:${mood.color}"></div></div>
      </div>
    </div>`;
}

function renderMenu() {
  engine.stopTimer();
  const rows = [];
  for (let i = 1; i <= 6; i++) {
    const lv = LEVELS.find((l) => l.id === i);
    if (lv) {
      rows.push(`
        <div class="level" data-level="${lv.id}">
          <div>
            <div class="lv-name">Уровень ${lv.id}: ${lv.name}</div>
            <div class="npc-trait">${lv.desc} · ${lv.themes.length} тем</div>
          </div>
          <div style="color:var(--accent); font-weight:700;">Начать →</div>
        </div>`);
    } else {
      rows.push(`
        <div class="level locked">
          <div>
            <div class="lv-name">Уровень ${i}</div>
            <div class="npc-trait">Скоро — добавим по шаблону</div>
          </div>
          <div>🔒</div>
        </div>`);
    }
  }
  
  // Profile stats
  const p = engine.profile.data;
  const profileHtml = p.sessions > 0 ? `
    <div class="fb" style="margin-bottom:16px;">
      <h3>Профиль игрока</h3>
      <div class="npc-trait">Сессий пройдено: <b>${p.sessions}</b> | Общий рейтинг: <b>${p.achievable > 0 ? Math.round((p.earned/p.achievable)*100) : 0}%</b></div>
    </div>
  ` : "";

  app.innerHTML = `
    ${HEADER}
    <p class="sub">Подбирай ответ под характер собеседника. Доверие важнее скорости.</p>
    ${profileHtml}
    <div class="card"><div class="levels">${rows.join("")}</div></div>
    <p class="sub">Механика: у каждого свой характер и стартовое доверие. Грубость роняет доверие — при 0% собеседник уходит.</p>
  `;
  app.querySelectorAll(".level[data-level]").forEach((el) => {
    el.addEventListener("click", () => engine.startSession(LEVELS.find((l) => l.id === +el.dataset.level)));
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
  const card = engine.session.cards[engine.session.index];
  const p = card.personality;
  const step = card.steps[engine.session.stepIndex];
  const multi = card.steps.length > 1;

  app.innerHTML = `
    ${HEADER}
    <div class="card ${step.isConflict ? 'conflict' : ''}">
      <div class="hud">
        <span>Уровень <b>${engine.session.level.id}</b> · Карточка <b>${engine.session.index + 1}</b>/${engine.session.cards.length}${multi ? ` · Шаг <b>${engine.session.stepIndex + 1}</b>/${card.steps.length}` : ""}</span>
        ${engine.session.streak > 1 ? `<span class="streak-badge">🔥 Серия ×${engine.session.streak}</span>` : ""}
      </div>
      <div class="hud">
        <span>✅ Верно: <b>${engine.session.correct}</b> · ❌ Неверно: <b>${engine.session.wrong}</b></span>
        <span>Баллы: <b>${engine.session.earned}</b></span>
      </div>
      ${npcHeaderHTML(p, engine.session.trust)}
      <div id="dynamicNotices"></div>
      ${multi && engine.session.stepIndex > 0 && !step.isConflict ? `<div class="npc-trait" style="margin-bottom:12px;">Ситуация: «${card.theme.question}»</div>` : ""}
      ${step.isConflict ? `<div class="conflict-badge">⚠️ Спор! Снизьте градус напряжения</div>` : ""}
      <div class="question">«${step.prompt}»</div>
      
      <div class="bible-search">
        <input type="text" id="bSearchInput" placeholder="Поиск стиха (напр. 'даром' или 'Иоанна')" autocomplete="off" />
        <div id="bSearchResults" class="search-results"></div>
      </div>

      <div class="timer-wrap"><div class="timer-bar" id="timerBar"></div></div>
      <div class="timer-label" id="timerLabel"></div>
      <div class="answers" id="answers"></div>
    </div>
  `;
  const box = $("#answers");
  step.answers.forEach((a, i) => {
    const b = document.createElement("button");
    b.className = "answer";
    b.textContent = a.text;
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
        sInput.placeholder = "Стих применён ✓";
      }
    }
  });
  
  let currentThinkTime = p.thinkTime || DEFAULT_THINK_TIME;
  if (engine.session.streak >= 3) currentThinkTime = currentThinkTime * 0.7; // 30% faster
  engine.startTimer(currentThinkTime, () => engine.resolveAnswer(-1));
}

function renderStepFeedback(pl) {
  const { card, step, scores, best, bestIndex, chosenIndex, raw, points, mult, trustBefore, trustAfter, left, lastStep, timedOut, fatigueMsg } = pl;
  const p = card.personality;
  const answers = step.answers;

  let tier, title;
  if (timedOut && left)            { tier = "poor";    title = "⏱️ Время вышло — собеседник ушёл"; }
  else if (timedOut)               { tier = "poor";    title = "⏱️ Время вышло — вы не успели ответить"; }
  else if (left)                   { tier = "poor";    title = "🚶 Собеседник прекратил разговор — доверие упало до 0%"; }
  else if (raw === best && raw > 0){ tier = "perfect"; title = "🎯 Идеально! Полное взаимопонимание"; }
  else if (raw >= 0)               { tier = "partial"; title = "👍 Неплохо, но можно точнее"; }
  else                             { tier = "poor";    title = "🗣️ Мимо — собеседник насторожился"; }

  const bestTones = answers[bestIndex].tones.map((t) => TONES[t]).join(", ");
  const answersHtml = answers.map((a, i) => {
    const cls = ["answer"];
    if (scores[i] === best) cls.push("best");
    if (i === chosenIndex && scores[i] !== best) cls.push("badpick");
    if (i === chosenIndex) cls.push("picked");
    const tags = a.tones.map((t) => `<span class="tag">${TONES[t]}</span>`).join("");
    const mark = i === chosenIndex ? " ← ваш выбор" : (scores[i] === best ? " ✓ лучший" : "");
    return `<button class="${cls.join(" ")}" disabled>${a.text}${tags}<span class="npc-trait">${mark}</span></button>`;
  }).join("");

  const trustColor = GameEngine.moodFromTrust(trustAfter).color;
  const scr = step.scripture && SCRIPTURES[step.scripture] ? `<div class="scripture-link" data-ref="${step.scripture}">📖 Открыть текст Библии: ${step.scripture}</div>` : "";
  const combo = mult > 1 ? `<div class="combo">🔥 Комбо ×${mult} за серию!</div>` : "";
  const fatigue = fatigueMsg ? `<div class="fatigue-warn">⚠️ ${fatigueMsg}</div>` : "";
  
  const nextLabel = (left || lastStep) ? "Следующий собеседник →" : "Продолжить разговор →";
  const isEnd = (left || lastStep) && engine.session.index === engine.session.cards.length - 1;

  app.innerHTML = `
    ${HEADER}
    <div class="card ${step.isConflict ? 'conflict' : ''}">
      ${npcHeaderHTML(p, trustAfter)}
      <div class="question">«${step.prompt}»</div>
      <div class="answers">${answersHtml}</div>
      <div class="fb ${tier}">
        <h3>${title}</h3>
        <div>${p.tip || p.trait} Лучший тон здесь: <b>${bestTones}</b>.</div>
        <div class="scr-points">➕ Баллы: <b>${points}</b> · Доверие: ${Math.floor(trustBefore)}% → <b style="color:${trustColor}">${Math.floor(trustAfter)}%</b> · Всего: <b>${engine.session.earned}</b> · ✅ ${engine.session.correct} / ❌ ${engine.session.wrong}</div>
        ${combo}
        ${fatigue}
        ${scr}
      </div>
      <button class="btn" id="nextBtn">${isEnd ? "Завершить сессию" : nextLabel}</button>
    </div>
  `;
  const link = $(".scripture-link");
  if (link) link.addEventListener("click", () => openBibleModal(link.dataset.ref));
  $("#nextBtn").addEventListener("click", () => engine.advance());
}

function renderResult() {
  engine.stopTimer();
  const pct = engine.session.achievable > 0 ? Math.min(100, Math.round((engine.session.earned / engine.session.achievable) * 100)) : 0;
  let grade, note;
  if (pct >= 85)      { grade = "Мастер диалога 🏆"; note = "Ты отлично чувствуешь характер собеседника."; }
  else if (pct >= 60) { grade = "Уверенный служитель 👍"; note = "Хорошая адаптация, есть куда расти."; }
  else if (pct >= 35) { grade = "Есть база 🌱"; note = "Больше внимания к характеру и тону."; }
  else                { grade = "Нужна практика 📚"; note = "Подстраивай ответ под настрой человека."; }

  const achs = GameEngine.achievementsFor(engine.session, pct);
  const achHtml = achs.length
    ? achs.map((a) => `<div class="ach"><span class="ach-ico">${a.icon}</span><div><b>${a.name}</b><div class="npc-trait">${a.desc}</div></div></div>`).join("")
    : `<div class="npc-trait">Пока без ачивок — попробуй ещё раз!</div>`;

  const profileFeedback = engine.profile.getFeedback();

  app.innerHTML = `
    ${HEADER}
    <div class="card center">
      <div class="big-score">${pct}%</div>
      <h3>${grade}</h3>
      <p class="sub">${note}</p>
      
      <div class="fb" style="text-align:left; margin:16px 0;">
        <b>Аналитика профиля:</b><br/>
        <span style="font-size:14px; color:var(--muted)">${profileFeedback}</span>
      </div>

      <div class="hud" style="justify-content:center; flex-wrap:wrap; gap:18px;">
        <span>✅ Верных: <b>${engine.session.correct}</b></span>
        <span>❌ Неверных: <b>${engine.session.wrong}</b></span>
        <span>🔥 Лучшая серия: <b>${engine.session.maxStreak}</b></span>
        <span>🏅 Баллы: <b>${engine.session.earned}</b>/${engine.session.achievable}</span>
        <span>🚶 Ушли: <b>${engine.session.leftCount}</b></span>
      </div>
      <div class="ach-list">${achHtml}</div>
      <button class="btn" id="againBtn">Новый выход ↻</button>
      <button class="btn secondary" id="menuBtn">В меню</button>
    </div>
  `;
  $("#againBtn").addEventListener("click", () => engine.startSession(engine.session.level));
  $("#menuBtn").addEventListener("click", renderMenu);
}

function openBibleModal(ref) {
  if (engine.session) engine.session.scriptureOpens++;
  $("#modalRef").textContent = ref;
  const s = SCRIPTURES[ref];
  $("#modalText").textContent = s ? s.text : "Текст стиха пока недоступен в базе.";
  $("#bibleModal").classList.add("active");
}
function closeBibleModal() { $("#bibleModal").classList.remove("active"); }

$("#closeModalBtn").addEventListener("click", closeBibleModal);
$("#bibleModal").addEventListener("click", (e) => { if (e.target.id === "bibleModal") closeBibleModal(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeBibleModal(); });

renderMenu();
