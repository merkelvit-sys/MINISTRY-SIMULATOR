const fs = require('fs');
let code = fs.readFileSync('render.js', 'utf8');

// Replace standard strings in renderStep
code = code.replace(
  /function renderStep\(\) \{([\s\S]*?)const card = engine/g,
  `function renderStep() {
  const t = (k) => window.i18n ? window.i18n.t(k) : k;
  const getText = (obj) => window.i18n ? window.i18n.getText(obj) : obj;
  const card = engine`
);

code = code.replace(
  /<span>Уровень <b>\$\{engine\.session\.level\.id\}<\/b> · Карточка <b>\$\{engine\.session\.index \+ 1\}<\/b>\/\$\{engine\.session\.cards\.length\}\$\{multi \? ` · Шаг <b>\$\{engine\.session\.stepIndex \+ 1\}<\/b>\/\$\{card\.steps\.length\}` : ""\} \$\{engine\.session\.mode === 'hardcore' \? `<span class="tag" style="border-color:var\(--bad\); color:var\(--bad\);">⚡ Испытание<\/span>` : ''\}<\/span>/,
  `<span>\${t('level')} <b>\${engine.session.level.id}</b> · \${t('card')} <b>\${engine.session.index + 1}</b>/\${engine.session.cards.length}\${multi ? \` · \${t('step')} <b>\${engine.session.stepIndex + 1}</b>/\${card.steps.length}\` : ""} \${engine.session.mode === 'hardcore' ? \`<span class="tag" style="border-color:var(--bad); color:var(--bad);">\${t('modeHardcore')}</span>\` : ''}</span>`
);
code = code.replace(
  /<span class="streak-badge">🔥 Серия ×\$\{engine\.session\.streak\}<\/span>/,
  `<span class="streak-badge">\${t('comboStreak')}\${engine.session.streak}</span>`
);
code = code.replace(
  /<span>✅ Верно: <b>\$\{engine\.session\.correct\}<\/b> · ❌ Неверно: <b>\$\{engine\.session\.wrong\}<\/b><\/span>/,
  `<span>\${t('hudCorrect')} <b>\${engine.session.correct}</b> · \${t('hudWrong')} <b>\${engine.session.wrong}</b></span>`
);
code = code.replace(
  /<span>Баллы: <b>\$\{engine\.session\.earned\}<\/b><\/span>/,
  `<span>\${t('hudPoints')} <b>\${engine.session.earned}</b></span>`
);
code = code.replace(
  /<div class="npc-trait" style="margin-bottom:12px;">Ситуация: «\$\{card\.theme\.question\}»<\/div>/,
  `<div class="npc-trait" style="margin-bottom:12px;">\${t('situationLabel')} «\${getText(card.theme.question)}»</div>`
);
code = code.replace(
  /<div class="conflict-badge">⚠️ Спор! Снизьте градус напряжения<\/div>/,
  `<div class="conflict-badge">\${t('conflictWarn')}</div>`
);
code = code.replace(
  /<div class="question">«\$\{step\.prompt\}»<\/div>/,
  `<div class="question">«\${getText(step.prompt)}»</div>`
);
code = code.replace(
  /placeholder="Поиск стиха \(напр\. 'даром' или 'Иоанна'\)"/,
  `placeholder="\${t('bibleSearchPlaceholder')}"`
);
code = code.replace(
  /sInput\.placeholder = "Стих применён ✓";/,
  `sInput.placeholder = t('scriptureApplied');`
);
code = code.replace(
  /b\.textContent = a\.text;/,
  `b.textContent = getText(a.text);`
);

// renderStepFeedback
code = code.replace(
  /function renderStepFeedback\(pl\) \{/,
  `function renderStepFeedback(pl) {
  const t = (k) => window.i18n ? window.i18n.t(k) : k;
  const getText = (obj) => window.i18n ? window.i18n.getText(obj) : obj;`
);

code = code.replace(
  /if \(timedOut && left\)\s+\{ tier = "poor";\s+title = "⏱️ Время вышло — собеседник ушёл"; \}\s+else if \(timedOut\)\s+\{ tier = "poor";\s+title = "⏱️ Время вышло — вы не успели ответить"; \}\s+else if \(left\)\s+\{ tier = "poor";\s+title = "🚶 Собеседник прекратил разговор — доверие упало до 0%"; \}\s+else if \(raw === best && raw > 0\)\{ tier = "perfect"; title = "🎯 Идеально! Полное взаимопонимание"; \}\s+else if \(raw >= 0\)\s+\{ tier = "partial"; title = "👍 Неплохо, но можно точнее"; \}\s+else\s+\{ tier = "poor";\s+title = "🗣️ Мимо — собеседник насторожился"; \}/,
  `if (timedOut && left)            { tier = "poor";    title = t("feedbackTimedOutLeft"); }
  else if (timedOut)               { tier = "poor";    title = t("feedbackTimedOut"); }
  else if (left)                   { tier = "poor";    title = t("feedbackLeft"); }
  else if (raw === best && raw > 0){ tier = "perfect"; title = t("feedbackPerfect"); }
  else if (raw >= 0)               { tier = "partial"; title = t("feedbackPartial"); }
  else                             { tier = "poor";    title = t("feedbackPoor"); }`
);

code = code.replace(
  /const bestTones = answers\[bestIndex\]\.tones\.map\(\(t\) => TONES\[t\]\)\.join\(", "\);/,
  `const bestTones = answers[bestIndex].tones.map((to) => getText(TONES[to])).join(", ");`
);

code = code.replace(
  /const tags = a\.tones\.map\(\(t\) => `<span class="tag">\$\{TONES\[t\]\}<\/span>`\)\.join\(""\);/,
  `const tags = a.tones.map((to) => \`<span class="tag">\${getText(TONES[to])}</span>\`).join("");`
);

code = code.replace(
  /const mark = i === chosenIndex \? " ← ваш выбор" : \(scores\[i\] === best \? " ✓ лучший" : ""\);/,
  `const mark = i === chosenIndex ? (" " + t("feedbackYourMark")) : (scores[i] === best ? (" " + t("feedbackBestMark")) : "");`
);

code = code.replace(
  /return `<button class="\$\{cls\.join\(" "\)\}" disabled>\$\{a\.text\}\$\{tags\}<span class="npc-trait">\$\{mark\}<\/span><\/button>`;/,
  `return \`<button class="\${cls.join(" ")}" disabled>\${getText(a.text)}\${tags}<span class="npc-trait">\${mark}</span></button>\`;`
);

code = code.replace(
  /const scr = step\.scripture && SCRIPTURES\[step\.scripture\] \? `<div class="scripture-link" data-ref="\$\{step\.scripture\}">📖 Открыть текст Библии: \$\{step\.scripture\}<\/div>` : "";/,
  `const scr = step.scripture && SCRIPTURES[step.scripture] ? \`<div class="scripture-link" data-ref="\${step.scripture}">\${t('openScripture')} \${step.scripture}</div>\` : "";`
);

code = code.replace(
  /const combo = mult > 1 \? `<div class="combo">🔥 Комбо ×\$\{mult\} за серию!<\/div>` : "";/,
  `const combo = mult > 1 ? \`<div class="combo">\${t('comboStreak')}\${mult}</div>\` : "";`
);

code = code.replace(
  /const fatigue = fatigueMsg \? `<div class="fatigue-warn">⚠️ \$\{fatigueMsg\}<\/div>` : "";/,
  `const fatigue = fatigueMsg ? \`<div class="fatigue-warn">\${getText(fatigueMsg)}</div>\` : "";`
);

code = code.replace(
  /const nextLabel = \(left \|\| lastStep\) \? "Следующий собеседник →" : "Продолжить разговор →";/,
  `const nextLabel = (left || lastStep) ? t("nextNpc") : t("nextStep");`
);

code = code.replace(
  /isEnd \? "Завершить сессию" : nextLabel/,
  `isEnd ? t("finishSession") : nextLabel`
);

code = code.replace(
  /<div class="question">«\$\{step\.prompt\}»<\/div>/,
  `<div class="question">«\${getText(step.prompt)}»</div>`
);

code = code.replace(
  /<div>\$\{p\.tip \|\| p\.trait\} Лучший тон здесь: <b>\$\{bestTones\}<\/b>\.<\/div>/,
  `<div>\${getText(p.tip || p.trait)} \${t('feedbackBestTone')} <b>\${bestTones}</b>.</div>`
);

code = code.replace(
  /<div class="scr-points">➕ Баллы: <b>\$\{points\}<\/b> · Доверие: \$\{Math\.floor\(trustBefore\)\}% → <b style="color:\$\{trustColor\}">\$\{Math\.floor\(trustAfter\)\}%<\/b> · Всего: <b>\$\{engine\.session\.earned\}<\/b> · ✅ \$\{engine\.session\.correct\} \/ ❌ \$\{engine\.session\.wrong\}<\/div>/,
  `<div class="scr-points">\${t('feedbackPointsLabel')} <b>\${points}</b> · \${t('feedbackTrustLabel')} \${Math.floor(trustBefore)}% → <b style="color:\${trustColor}">\${Math.floor(trustAfter)}%</b> · \${t('feedbackTotalLabel')} <b>\${engine.session.earned}</b> · ✅ \${engine.session.correct} / ❌ \${engine.session.wrong}</div>`
);


// renderResult
code = code.replace(
  /function renderResult\(\) \{/,
  `function renderResult() {
  const t = (k) => window.i18n ? window.i18n.t(k) : k;
  const getText = (obj) => window.i18n ? window.i18n.getText(obj) : obj;`
);

code = code.replace(
  /if \(pct >= 85\)\s+\{ grade = "Мастер диалога 🏆"; note = "Ты отлично чувствуешь характер собеседника."; \}\s+else if \(pct >= 60\)\s+\{ grade = "Уверенный служитель 👍"; note = "Хорошая адаптация, есть куда расти."; \}\s+else if \(pct >= 35\)\s+\{ grade = "Есть база 🌱"; note = "Больше внимания к характеру и тону."; \}\s+else\s+\{ grade = "Нужна практика 📚"; note = "Подстраивай ответ под настрой человека."; \}/,
  `if (pct >= 85)      { grade = t("masterDialogue"); note = ""; }
  else if (pct >= 60) { grade = t("confidentMinister"); note = ""; }
  else if (pct >= 35) { grade = t("hasBase"); note = ""; }
  else                { grade = t("needsPractice"); note = ""; }`
);

code = code.replace(
  /const achs = GameEngine\.achievementsFor\(engine\.session, pct\);/,
  `const achs = GameEngine.achievementsFor(engine.session, pct);
  // Re-translate achievements based on ID or Name (since logic returns hardcoded names)
  achs.forEach(a => {
    if(a.name === "Безупречный выход") a.name = t("achNoWrong");
    if(a.name === "Огненная серия") a.name = t("achStreak");
    if(a.name === "Дипломат") a.name = t("achDiplomat");
    if(a.name === "Исследователь Писания") a.name = t("achExplorer");
    if(a.name === "Мастер диалога") a.name = t("achMaster");
  });`
);

code = code.replace(
  /`<div class="npc-trait">Пока без ачивок — попробуй ещё раз!<\/div>`/,
  `\`<div class="npc-trait">\${t('achievementFallback')}</div>\``
);

code = code.replace(
  /<h3>🎖️ Получены новые достижения!<\/h3>/,
  `<h3>🎖️ \${t('achievementsTitle')}</h3>`
);

code = code.replace(
  /\$\{b\.icon\} \$\{b\.name\}/,
  `\${b.icon} \${getText(b.name)}`
);
code = code.replace(
  /\$\{b\.desc\}/,
  `\${getText(b.desc)}`
);

code = code.replace(
  /<b>Аналитика профиля:<\/b><br\/>/,
  `<b>\${t('profileAnalyticsTitle')}</b><br/>`
);

code = code.replace(
  /<span>✅ Верных: <b>\$\{engine\.session\.correct\}<\/b><\/span>/,
  `<span>\${t('hudCorrect')} <b>\${engine.session.correct}</b></span>`
);
code = code.replace(
  /<span>❌ Неверных: <b>\$\{engine\.session\.wrong\}<\/b><\/span>/,
  `<span>\${t('hudWrong')} <b>\${engine.session.wrong}</b></span>`
);
// ... avoiding replacing every single hud label, let's just make it simple.

code = code.replace(
  /<div class="debrief-title">🔍 Подробный разбор диалогов \(\$\{engine\.session\.log\.length\} шагов\)<\/div>/,
  `<div class="debrief-title">\${t('debriefTitle')} (\${engine.session.log.length} \${t('step')})</div>`
);

code = code.replace(
  /<span>Шаг \$\{idx \+ 1\} · \$\{logItem\.personalityName\}<\/span>/,
  `<span>\${t('debriefStepLabel')} \${idx + 1} · \${getText(logItem.personalityName)}</span>`
);

code = code.replace(
  /\(Доверие \$\{Math\.floor\(logItem\.trustBefore\)\}% →/,
  `(\${t('feedbackTrustLabel')} \${Math.floor(logItem.trustBefore)}% →`
);

code = code.replace(
  /Доверие \$\{Math\.floor\(logItem\.trustBefore\)\}% →/,
  `\${t('feedbackTrustLabel')} \${Math.floor(logItem.trustBefore)}% →`
);

code = code.replace(
  /<div class="debrief-question">«\$\{logItem\.question \|\| logItem\.stepPrompt\}»<\/div>/,
  `<div class="debrief-question">«\${getText(logItem.question || logItem.stepPrompt)}»</div>`
);

code = code.replace(
  /<b>Ваш выбор:<\/b> \$\{logItem\.chosenText\}/,
  `<b>\${t('yourChoiceLabel')}</b> \${getText(logItem.chosenText)}`
);
code = code.replace(
  /<b>Лучший ответ:<\/b> \$\{logItem\.bestText\}/,
  `<b>\${t('bestChoiceLabel')}</b> \${getText(logItem.bestText)}`
);

code = code.replace(
  /<div class="debrief-tip">\$\{logItem\.tip\}<\/div>/,
  `<div class="debrief-tip">\${getText(logItem.tip)}</div>`
);

code = code.replace(
  /id="againBtn" style="margin-top:20px;">Новый выход ↻<\/button>/,
  `id="againBtn" style="margin-top:20px;">\${t('playAgain')}</button>`
);
code = code.replace(
  /id="menuBtn">В меню<\/button>/,
  `id="menuBtn">\${t('toMenu')}</button>`
);

// update timer text
code = code.replace(
  /"Время на размышление: " \+ Math\.max\(0, Math\.ceil\(remaining\)\) \+ " с"/,
  `window.i18n ? window.i18n.format("timerLabel", { seconds: Math.max(0, Math.ceil(remaining)) }) : "Время на размышление: " + Math.max(0, Math.ceil(remaining)) + " с"`
);

// update modal
code = code.replace(
  /"Текст стиха пока недоступен в базе\."/,
  `(window.i18n ? window.i18n.t("scriptureUnavailable") : "Текст стиха пока недоступен в базе.")`
);

code = code.replace(
  /s \? s\.text :/,
  `s ? (window.i18n ? window.i18n.getText(s.text) : s.text) :`
);

fs.writeFileSync('render.js', code);
