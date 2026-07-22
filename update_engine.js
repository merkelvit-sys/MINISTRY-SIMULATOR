const fs = require('fs');
let code = fs.readFileSync('engine.js', 'utf8');

// Replace static messages in getPedagogicalTip
code = code.replace(
  /static getPedagogicalTip\(personality, chosenTones, raw\) \{([\s\S]*?)\}/,
  `static getPedagogicalTip(personality, chosenTones, raw) {
    if (raw > 0) return { ru: '💡 Отличный выбор! Вы выбрали тон, который полностью согласуется с характером собеседника.', de: '💡 Perfekte Wahl! Der Ton passt zum Charakter.' };
    if (chosenTones.includes('pushy')) return { ru: '💡 Напористый тон отталкивает людей и снижает доверие. В служении важно сохранять кротость и уважение.', de: '💡 Aufdringlicher Ton stößt ab. Bewahre Sanftmut und Respekt.' };
    if (chosenTones.includes('dismissive')) return { ru: '💡 Сухой ответ создаёт впечатление равнодушия. Сочувствие и такт помогают открывать сердца.', de: '💡 Trockene Antwort wirkt gleichgültig.' };
    if (chosenTones.includes('false')) return { ru: '💡 Искажение фактов или неточные утверждения разрушают доверие собеседника.', de: '💡 Tatsachenverdrehung zerstört Vertrauen.' };
    if (personality.id === 'hurrying' && chosenTones.includes('deep')) return { ru: '💡 Спешащему человеку сложно выслушать длинную мысль. Сначала дайте краткий ответ.', de: '💡 Eiligen reicht eine kurze Antwort.' };
    if (personality.id === 'skeptic' && !chosenTones.includes('tact')) return { ru: '💡 Эмоциональному собеседнику в первую очередь важно почувствовать сочувствие и уважение.', de: '💡 Emotionaler Gesprächspartner erwartet Mitgefühl und Respekt.' };
    return { ru: '💡 Старайтесь проявлять такт (respect) и мягко направлять мысль к Библии (deep).', de: '💡 Zeige Takt (respect) und lenke sanft zur Bibel (deep).' };
  }`
);

// Localization of fatigueMsg
code = code.replace(
  /fatigueMsg = "Штраф за шаблонность: вы всё время выбираете один и тот же тон общения!";/,
  `fatigueMsg = { ru: "Штраф за шаблонность: вы всё время выбираете один и тот же тон общения!", de: "⚠️ Abwechslung fehlt: immer der gleiche Ton!" };`
);

// Localization of applyScripture messages
code = code.replace(
  /return \{ success: false, msg: "Вы уже приводили стих в этом шаге\." \};/,
  `return { success: false, msg: { ru: "Вы уже приводили стих в этом шаге.", de: "Du hast diesen Vers bereits in diesem Schritt angeführt." } };`
);

code = code.replace(
  /renderTrustUpdate\(this\.session\.trust, "Отличный стих! Собеседник впечатлен \(\+15% доверия\)\.", "good"\);/,
  `renderTrustUpdate(this.session.trust, { ru: "Отличный стих! Собеседник впечатлен (+15% доверия).", de: "Perfekter Vers! Gesprächspartner beeindruckt (+15% Vertrauen)." }, "good");`
);

code = code.replace(
  /renderTrustUpdate\(this\.session\.trust, "Собеседник не понял, к чему этот стих\. \(-10% доверия\)", "bad"\);/,
  `renderTrustUpdate(this.session.trust, { ru: "Собеседник не понял, к чему этот стих. (-10% доверия)", de: "Gesprächspartner verstand den Vers nicht. (-10% Vertrauen)" }, "bad");`
);

// Update step adaptation texts
code = code.replace(
  /nextStep\.prompt = "Собеседник тронут вашим чутким подходом и готов слушать дальше: " \+ nextStep\.prompt;/,
  `nextStep.prompt = { ru: "Собеседник тронут вашим чутким подходом и готов слушать дальше: " + (nextStep.prompt.ru || nextStep.prompt), de: "Gesprächspartner ist berührt und hört weiter zu: " + (nextStep.prompt.de || nextStep.prompt) };`
);

code = code.replace(
  /nextStep\.prompt = "Собеседник ещё сдерживает настороженность: " \+ nextStep\.prompt;/,
  `nextStep.prompt = { ru: "Собеседник ещё сдерживает настороженность: " + (nextStep.prompt.ru || nextStep.prompt), de: "Gesprächspartner ist noch vorsichtig: " + (nextStep.prompt.de || nextStep.prompt) };`
);

// Update log timeout text
code = code.replace(
  /chosenText: timedOut \? "Время истекло" : chosenAnsObj\.text,/,
  `chosenText: timedOut ? { ru: "Время истекло", de: "Zeit abgelaufen" } : chosenAnsObj.text,`
);

fs.writeFileSync('engine.js', code);
