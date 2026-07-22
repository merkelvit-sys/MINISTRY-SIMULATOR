"use strict";

/* ================================================================
   АУТЕНТИЧНЫЙ КОНТЕНТ СЛУЖЕНИЯ (RU / DE)
   ================================================================ */

const TONES = {
  fact:       { ru: "Информативно", de: "Informativ" },
  deep:       { ru: "Глубже, с Писанием", de: "Tiefer, mit Bibeltext" },
  tact:       { ru: "Такт и сочувствие", de: "Taktgefühl & Mitgefühl" },
  brief:      { ru: "Кратко", de: "Kurz und knapp" },
  respect:    { ru: "Уважение к выбору", de: "Respekt vor der freien Wahl" },
  pushy:      { ru: "Навязчиво", de: "Aufdringlich" },
  dismissive: { ru: "Сухо / отмахнуться", de: "Abweisend / Desinteressiert" },
  false:      { ru: "Неверно по сути", de: "Inhaltlich falsch" }
};

const SCRIPTURES = {
  "Матфея 10:8": {
    ref: { ru: "Матфея 10:8", de: "Matthäus 10:8" },
    text: { ru: "Даром получили — даром давайте.", de: "Empfangen habt ihr kostenfrei, gebt kostenfrei." },
    keywords: { ru: ["даром", "бесплатно", "деньги", "проповедь"], de: ["kostenfrei", "kostenlos", "geld", "predigen"] }
  },
  "Деяния 17:11": {
    ref: { ru: "Деяния 17:11", de: "Apostelgeschichte 17:11" },
    text: { ru: "Жители Верии были благороднее живших в Фессалонике: они приняли слово с огромным рвением и каждый день тщательно исследовали Писания, чтобы проверить, так ли всё на самом деле.", de: "Die Juden in Beröa waren offener als die in Thessalonich. Sie nahmen das Wort sehr bereitwillig auf und forschten täglich in den Schriften, ob sich alles so verhielt." },
    keywords: { ru: ["исследовали", "убедиться", "проверка", "верийцы"], de: ["beröa", "schriften", "forschen", "prüfen"] }
  },
  "1 Иоанна 5:19": {
    ref: { ru: "1 Иоанна 5:19", de: "1. Johannes 5:19" },
    text: { ru: "Мы знаем, что мы от Бога, а весь мир — во власти Злого.", de: "Wir wissen, dass wir von Gott stammen, aber die ganze Welt liegt in der Macht des Bösen." },
    keywords: { ru: ["мир", "злой", "власть", "сатана", "дьявол", "страдания"], de: ["welt", "böse", "macht", "satan", "leiden"] }
  },
  "Псалом 46:9": {
    ref: { ru: "Псалом 46:9", de: "Psalm 46:9" },
    text: { ru: "По всей земле он прекращает войны, ломает луки, сжигает колесницы.", de: "Er macht dem Krieg auf der ganzen Erde ein Ende. Den Bogen zerbricht er, den Speer zerschlägt er." },
    keywords: { ru: ["война", "прекращает", "мир", "оружие"], de: ["krieg", "ende", "frieden", "waffen"] }
  },
  "Екклесиаст 9:5": {
    ref: { ru: "Екклесиаст 9:5", de: "Prediger 9:5" },
    text: { ru: "Живые знают, что умрут, а мёртвые ничего не знают. Им больше нет награды, и память о них предана забвению.", de: "Denn die Lebenden wissen, dass sie sterben werden, aber die Toten wissen gar nichts, auch bekommen sie keinen Lohn mehr." },
    keywords: { ru: ["мертвые", "ничего не знают", "смерть", "состояние", "душа"], de: ["toten", "nichts wissen", "tod", "zustand"] }
  },
  "Деяния 24:15": {
    ref: { ru: "Деяния 24:15", de: "Apostelgeschichte 24:15" },
    text: { ru: "Я, как и они, надеюсь на Бога, что будет воскресение праведных и неправедных.", de: "Und ich habe die Hoffnung auf Gott, dass es eine Auferstehung sowohl der Gerechten als auch der Ungerechten geben wird." },
    keywords: { ru: ["воскресение", "надежда", "праведные", "неправедные", "умершие"], de: ["auferstehung", "hoffnung", "gerechte", "ungerechte"] }
  },
  "Иоанна 17:3": {
    ref: { ru: "Иоанна 17:3", de: "Johannes 17:3" },
    text: { ru: "Чтобы получить вечную жизнь, им нужно узнавать тебя, единственного истинного Бога, и того, кого ты послал, — Иисуса Христа.", de: "Das bedeutet ewiges Leben: dich, den einzigen wahren Gott, kennenzulernen und den, den du gesandt hast, Jesus Christus." },
    keywords: { ru: ["вечная жизнь", "знание", "бог", "иисус", "познание"], de: ["ewiges leben", "erkennen", "gott", "jesus"] }
  },
  "Иакова 1:13": {
    ref: { ru: "Иакова 1:13", de: "Jakobus 1:13" },
    text: { ru: "В испытании пусть никто не говорит: «Меня испытывает Бог», потому что Бога невозможно испытать злом и он сам никого не испытывает злом.", de: "In einer Prüfung soll keiner sagen: «Ich werde von Gott auf die Probe gestellt.» Denn Gott kann nicht durch Schlechtes geprüft werden." },
    keywords: { ru: ["испытание", "зло", "страдания", "причина", "бог не виноват"], de: ["prüfung", "böse", "leiden", "ursache"] }
  },
  "Римлянам 15:4": {
    ref: { ru: "Римлянам 15:4", de: "Römer 15:4" },
    text: { ru: "А всё, что было написано прежде, было написано для нашего наставления, чтобы благодаря нашей стойкости и утешению из Писаний у нас была надежда.", de: "Denn alles, was früher aufgeschrieben wurde, ist zu unserer Anleitung aufgeschrieben worden, damit wir Hoffnung haben." },
    keywords: { ru: ["библия", "надежда", "утешение", "наставление"], de: ["bibel", "hoffnung", "trost", "anleitung"] }
  },
  "Откровение 21:4": {
    ref: { ru: "Откровение 21:4", de: "Offenbarung 21:4" },
    text: { ru: "Он отрёт всякую слезу с их глаз, и смерти больше не будет, ни скорби, ни вопля, ни боли больше не будет. Прежнее прошло.", de: "Und er wird jede Träne von ihren Augen abwischen, und der Tod wird nicht mehr sein, noch wird Trauer noch Geschrei noch Schmerz mehr sein." },
    keywords: { ru: ["смерть", "слезы", "боль", "будущее", "надежда", "рай"], de: ["tod", "tränen", "schmerz", "zukunft", "paradies"] }
  },
  "Исаия 41:10": {
    ref: { ru: "Исаия 41:10", de: "Jesaja 41:10" },
    text: { ru: "Не бойся, потому что я с тобой. Не тревожься, потому что я твой Бог. Я укреплю тебя, помогу тебе...", de: "Fürchte dich nicht, denn ich bin bei dir. Sei nicht ängstlich, denn ich bin dein Gott. Ich werde dich stärken." },
    keywords: { ru: ["страх", "тревога", "помощь", "бог с тобой"], de: ["angst", "sorge", "hilfe", "gott"] }
  },
  "2 Тимофею 3:16": {
    ref: { ru: "2 Тимофею 3:16", de: "2. Timotheus 3:16" },
    text: { ru: "Всё Писание вдохновлено Богом и полезно для обучения, для обличения, для исправления, для наставления в праведности.", de: "Die ganze Schrift ist von Gott eingegeben und nützlich zum Lehren, zum Zurechtweisen, zum Richtigstellen." },
    keywords: { ru: ["библия", "вдохновлено", "полезно", "обучение"], de: ["bibel", "inspiriert", "nützlich", "lehren"] }
  },
  "1 Петра 3:15": {
    ref: { ru: "1 Петра 3:15", de: "1. Petrus 3:15" },
    text: { ru: "Чтите Христа как Господа в своих сердцах и всегда будьте готовы защитить свою надежду перед каждым, кто требует от вас объяснений, но делайте это с кротостью и глубоким уважением.", de: "Seid stets bereit zur Verteidigung vor jedem, der von euch einen Grund für die Hoffnung verlangt, doch tut es mit Milde und tiefem Respekt." },
    keywords: { ru: ["кротость","уважение","защита","надежда"], de: ["milde", "respekt", "verteidigung", "hoffnung"] }
  },
  "Колоссянам 4:6": {
    ref: { ru: "Колоссянам 4:6", de: "Kolosser 4:6" },
    text: { ru: "Пусть ваша речь всегда будет любезной, приправленной солью, чтобы вы знали, как отвечать каждому.", de: "Eure Rede sei stets gefällig, mit Salz gewürzt, damit ihr wisst, wie ihr jedem antworten sollt." },
    keywords: { ru: ["речь","любезной","соль","отвечать"], de: ["rede", "freundlich", "salz", "antworten"] }
  },
  "2 Тимофею 2:24": {
    ref: { ru: "2 Тимофею 2:24", de: "2. Timotheus 2:24" },
    text: { ru: "Служителю же Господа не нужно вступать в распри, но нужно быть мягким со всеми, способным учить, сдерживать себя, когда с ним поступают несправедливо.", de: "Ein Sklave des Herrn aber hat es nicht nötig zu streiten, sondern muss gegen alle sanft sein, lehrfähig." },
    keywords: { ru: ["спор","мягким","учить","сдерживать"], de: ["streit", "sanft", "lehren", "beherrschen"] }
  },
  "Притчи 15:1": {
    ref: { ru: "Притчи 15:1", de: "Sprüche 15:1" },
    text: { ru: "Кроткий ответ отвращает гнев, а резкое слово вызывает ярость.", de: "Eine gelinde Antwort wendet Grimm ab, aber ein verletzendes Wort erregt Zorn." },
    keywords: { ru: ["кроткий","ответ","гнев","резкое"], de: ["sanft", "antwort", "zorn", "hart"] }
  }
};

const PERSONALITIES = {
  sincere: {
    id: "sincere",
    name: { ru: "Искренний искатель", de: "Aufrichtiger Sucher" },
    avatar: "🤔",
    startTrust: 65,
    thinkTime: 45,
    trait: { ru: "Терпелив, любит глубокие мысли из Библии.", de: "Geduldig, liebt tiefgründige Gedanken aus der Bibel." },
    tip: { ru: "Ценит содержательность и тексты Писания.", de: "Schätzt Tiefgang und Bibeltexte." },
    pref: { fact: 2, deep: 3, tact: 1, brief: -1, respect: 1, pushy: -3, dismissive: -2, false: -6 }
  },
  hurrying: {
    id: "hurrying",
    name: { ru: "Спешащий прохожий", de: "Eiliger Passant" },
    avatar: "🏃",
    startTrust: 55,
    thinkTime: 30,
    trait: { ru: "Очень мало времени, нужна короткая мысль.", de: "Hat sehr wenig Zeit, braucht einen kurzen Gedanken." },
    tip: { ru: "Ценит краткость и конкретику; длинные ответы теряют его.", de: "Schätzt Kürze und Konkretheit; lange Antworten schrecken ihn ab." },
    pref: { fact: 1, deep: -2, tact: 0, brief: 3, respect: 1, pushy: -3, dismissive: -1, false: -6 }
  },
  skeptic: {
    id: "skeptic",
    name: { ru: "Скептик / эмоциональный", de: "Skeptiker / Emotional" },
    avatar: "😒",
    startTrust: 45,
    thinkTime: 38,
    trait: { ru: "Чувствителен к тону: откликается на такт и уважение.", de: "Empfindlich auf den Ton: spricht auf Taktgefühl und Respekt an." },
    tip: { ru: "Реагирует на сочувствие и уважение к выбору, не на давление.", de: "Reagiert auf Mitgefühl und Respekt vor der freien Wahl, nicht auf Druck." },
    pref: { fact: 0, deep: 0, tact: 4, brief: 0, respect: 3, pushy: -5, dismissive: -3, false: -6 }
  },
  rel_leader: {
    id: "rel_leader",
    name: { ru: "Знаток / священнослужитель", de: "Kenner / Geistlicher" },
    avatar: "📖",
    startTrust: 50,
    thinkTime: 40,
    trait: { ru: "Хорошо знает традиции, ценит глубокое знание Писания и уважение.", de: "Kennt Traditionen gut, schätzt tiefes Bibelwissen und Respekt." },
    tip: { ru: "Не вступайте в споры. Говорите глубоко, ссылаясь на Библию, и сохраняйте кротость.", de: "Lass dich nicht auf Streit ein. Sprich tiefgründig mit Verweis auf die Bibel und bleibe milde." },
    pref: { deep: 3, fact: 2, tact: 2, respect: 2, brief: -1, dismissive: -4, pushy: -5, false: -8 },
    tonePenalties: { pushy: -2, dismissive: -2 }
  },
  relative: {
    id: "relative",
    name: { ru: "Близкий родственник", de: "Naher Verwandter" },
    avatar: "👵",
    startTrust: 60,
    thinkTime: 45,
    trait: { ru: "Переживает за вас, чувствителен к тону, опасается чужих идей.", de: "Sorgt sich um dich, reagiert empfindlich auf den Ton, scheut fremde Ideen." },
    tip: { ru: "Главное — любовь, такт и уважение. Не давите догмами, показывайте добрый пример.", de: "Hauptsache Liebe, Taktgefühl und Respekt. Dränge keine Dogmen auf, sei ein gutes Vorbild." },
    pref: { tact: 4, respect: 3, deep: 1, fact: 1, brief: 0, dismissive: -4, pushy: -6, false: -6 },
    tonePenalties: { pushy: -2, dismissive: -2 }
  },
  colleague: {
    id: "colleague",
    name: { ru: "Коллега / Одноклассник", de: "Kollege / Mitschüler" },
    avatar: "💼",
    startTrust: 55,
    thinkTime: 35,
    trait: { ru: "Опасается неловкости на работе/учёбе, ценит простоту и ненавязчивость.", de: "Befürchtet Peinlichkeiten bei der Arbeit/Schule, schätzt Einfachheit." },
    tip: { ru: "Будьте естественны и кратки. Не превращайте перерыв в формальную лекцию.", de: "Sei natürlich und kurz. Mach die Pause nicht zu einer formellen Vorlesung." },
    pref: { tact: 3, brief: 3, respect: 2, fact: 1, deep: -1, pushy: -5, dismissive: -3, false: -6 },
    tonePenalties: { pushy: -2, dismissive: -2 }
  }
};

const CONFLICT_STEPS = {
  sincere: {
    prompt: {
      ru: "Я думал, мы просто рассуждаем. К чему этот напор? Я пока не готов соглашаться.",
      de: "Ich dachte, wir unterhalten uns einfach. Warum dieser Druck? Ich bin noch nicht bereit zuzustimmen."
    },
    answers: [
      { text: { ru: "Вы правы, простите. Мне не следовало так давить. Мне действительно важно услышать ваше мнение.", de: "Du hast recht, entschuldige. Ich hätte nicht so drängen sollen. Es ist mir wirklich wichtig, deine Meinung zu hören." }, tones: ["tact", "respect"] },
      { text: { ru: "Истина есть истина, её надо принимать.", de: "Wahrheit ist Wahrheit, man muss sie akzeptieren." }, tones: ["pushy", "false"] },
      { text: { ru: "Тогда нам не о чем говорить.", de: "Dann haben wir uns nichts mehr zu sagen." }, tones: ["dismissive"] },
      { text: { ru: "Давайте просто почитаем Библию, там всё понятно.", de: "Lass uns einfach in der Bibel lesen, dort ist alles klar." }, tones: ["deep"] }
    ]
  },
  hurrying: {
    prompt: {
      ru: "Слушайте, вы тратите моё время. Если вы не можете сказать коротко, я пошёл.",
      de: "Hör zu, du verschwendest meine Zeit. Wenn du es nicht kurz fassen kannst, bin ich weg."
    },
    answers: [
      { text: { ru: "Извините, я затянул. Если коротко: [возврат к сути].", de: "Entschuldigung, ich habe zu weit ausgeholt. Kurz gesagt: [Zurück zum Thema]." }, tones: ["brief", "tact"] },
      { text: { ru: "Это вопрос жизни и смерти, остановитесь на минуту!", de: "Das ist eine Frage von Leben und Tod, bleib eine Minute stehen!" }, tones: ["pushy"] },
      { text: { ru: "Раз так спешите, бегите.", de: "Wenn du es so eilig hast, geh nur." }, tones: ["dismissive"] },
      { text: { ru: "В Библии говорится...", de: "In der Bibel steht..." }, tones: ["deep"] }
    ]
  },
  skeptic: {
    prompt: {
      ru: "Вот опять! Вы не слышите меня, а просто гнёте свою линию. Почему вы считаете, что только вы правы?",
      de: "Da ist es wieder! Du hörst mir nicht zu, sondern beharrst nur auf deiner Meinung. Warum glaubst du, dass nur du recht hast?"
    },
    answers: [
      { text: { ru: "Простите, если это так прозвучало. Я уважаю ваше право на собственное мнение. Давайте начнём сначала?", de: "Entschuldige, wenn es so rüberkam. Ich respektiere dein Recht auf eine eigene Meinung. Sollen wir von vorn anfangen?" }, tones: ["tact", "respect"] },
      { text: { ru: "Потому что Библия — это слово Бога, а не моё мнение.", de: "Weil die Bibel Gottes Wort ist, nicht meine persönliche Meinung." }, tones: ["deep", "pushy"] },
      { text: { ru: "Если бы вы меня послушали, вы бы поняли.", de: "Wenn du mir zuhören würdest, würdest du es verstehen." }, tones: ["pushy"] },
      { text: { ru: "Я не гну свою линию, вы сами спросили.", de: "Ich beharre nicht auf meiner Meinung, du hast selbst gefragt." }, tones: ["dismissive"] }
    ]
  },
  rel_leader: {
    prompt: {
      ru: "Ваша трактовка противоречит нашим вековым традициям. Вы посягаете на святое!",
      de: "Deine Auslegung widerspricht unseren jahrhundertealten Traditionen. Du greifst das Heilige an!"
    },
    answers: [
      { text: { ru: "Я глубоко уважаю ваши чувства и традиции. Могу я лишь показать, на основании чего из Библии строится эта мысль?", de: "Ich respektiere deine Gefühle und Traditionen zutiefst. Darf ich dir kurz zeigen, worauf dieser biblische Gedanke beruht?" }, tones: ["tact", "respect"] },
      { text: { ru: "Традиции людей часто противоречат Писанию, пора бы это знать.", de: "Menschentraditionen widersprechen oft den Schriften, das sollte man wissen." }, tones: ["pushy", "false"] },
      { text: { ru: "Каждый верит во что хочет. Всего доброго.", de: "Jeder glaubt, was er will. Alles Gute." }, tones: ["dismissive"] },
      { text: { ru: "В Библии прямо сказано про фарисеев и их традиции.", de: "In der Bibel steht einiges über die Pharisäer und ihre Traditionen." }, tones: ["pushy", "deep"] }
    ]
  },
  relative: {
    prompt: {
      ru: "Я просто боюсь за тебя. Ты так изменился, и мне кажется, ты отдаляешься от семьи.",
      de: "Ich habe einfach Angst um dich. Du hast dich so verändert, und ich habe das Gefühl, du entfremdest dich von der Familie."
    },
    answers: [
      { text: { ru: "Я очень люблю нашу семью и не хочу никакого расстояния. Извини, если по неосторожности дал такое ощущение.", de: "Ich liebe unsere Familie sehr und möchte keine Distanz. Entschuldige, wenn ich dir unabsichtlich dieses Gefühl gegeben habe." }, tones: ["tact", "respect"] },
      { text: { ru: "Ты мне очень дорог(а). Моя вера учит меня ещё больше заботиться о близких, а не отдаляться.", de: "Du bist mir sehr wichtig. Mein Glaube lehrt mich, mich noch mehr um meine Lieben zu kümmern, statt mich zu entfernen." }, tones: ["tact"] },
      { text: { ru: "Иисус говорил, что родные могут быть противниками истины, так что это нормально.", de: "Jesus sagte, dass die eigenen Angehörigen Gegner der Wahrheit sein können, das ist also normal." }, tones: ["pushy"] },
      { text: { ru: "Ты просто не хочешь понимать мою правду.", de: "Du willst meine Wahrheit einfach nicht verstehen." }, tones: ["dismissive"] }
    ]
  },
  colleague: {
    prompt: {
      ru: "Давай оставим религию за рамками работы. Это неудобно обсуждать в офисе/школе.",
      de: "Lass uns Religion aus dem Spiel lassen. Es ist unangenehm, das im Büro/in der Schule zu besprechen."
    },
    answers: [
      { text: { ru: "Понимаю, это действительно неудобно. Я не буду навязывать тему. Спросите, если вдруг заинтересует.", de: "Verstehe, das ist in der Tat unangenehm. Ich werde das Thema nicht aufdrängen. Frag mich einfach, falls es dich mal interessiert." }, tones: ["tact", "respect"] },
      { text: { ru: "Хорошо, я вас услышал. Давайте вернемся к рабочему вопросу.", de: "In Ordnung, ich habe verstanden. Kehren wir zu den Arbeitsfragen zurück." }, tones: ["brief", "tact"] },
      { text: { ru: "Это слишком важно, чтобы молчать. Вы должны выслушать.", de: "Das ist zu wichtig, um zu schweigen. Du musst zuhören." }, tones: ["pushy"] },
      { text: { ru: "Как хотите, мне всё равно.", de: "Wie du willst, mir ist das egal." }, tones: ["dismissive"] }
    ]
  }
};

/* Helper for creating concise theme objects */
function createTheme(id, qRu, qDe, scripture, ansArray) {
  return {
    id,
    question: { ru: qRu, de: qDe },
    scripture: scripture || "",
    answers: ansArray.map(a => ({
      text: { ru: a[0], de: a[1] },
      tones: a[2]
    }))
  };
}

/* ================================================================
   6 ПОЛНЫХ УРОВНЕЙ СЛУЖЕНИЯ (ПО 10 ТЕМ В КАЖДОМ, ВСЕГО 60 ТЕМ!)
   ================================================================ */

const LEVEL_1 = {
  id: 1,
  name: { ru: "Стенд и общественные места", de: "Trolley-Dienst und Öffentlichkeit" },
  desc: { ru: "Публичное служение у стенда с литературой", de: "Öffentlicher Dienst mit dem Literatur-Trolley" },
  themes: [
    createTheme("1.1", "Что это за стенд? Вы продаёте эти книги и журналы?", "Was ist das für ein Stand? Verkaufen Sie diese Bücher und Zeitschriften?", "Матфея 10:8", [
      ["Здравствуйте! Это информационный стенд. Вся литература бесплатна.", "Guten Tag! Das ist ein Informationsstand. Alle Publikationen sind kostenlos.", ["fact", "respect"]],
      ["Добрый день! Мы бесплатно делимся библейскими мыслями («Даром получили — даром давайте»).", "Guten Tag! Wir teilen kostenlose Gedanken aus der Bibel («Empfangen habt ihr kostenfrei, gebt kostenfrei»).", ["deep", "respect"]],
      ["Нет, всё абсолютно бесплатно. Можете взять то, что заинтересует.", "Nein, alles ist völlig kostenfrei. Sie können sich gerne etwas mitnehmen.", ["brief"]],
      ["Вам обязательно нужно это прочитать, это самое важное!", "Das müssen Sie unbedingt lesen, es ist das Wichtigste!", ["pushy"]]
    ]),
    createTheme("1.2", "Что такое сайт JW.ORG?", "Was ist die Website JW.ORG?", "", [
      ["Это наш официальный сайт с бесплатной Библией и статьями на сотнях языков.", "Das ist unsere offizielle Website mit kostenlosen Bibeln und Artikeln in hunderten Sprachen.", ["fact", "respect"]],
      ["Это ресурс с бесплатными ответами на важные жизненные вопросы на основе Библии.", "Das ist eine kostenlose Online-Quelle mit Antworten auf wichtige Lebensfragen auf Bibelbasis.", ["brief"]],
      ["Сайт помогает исследовать Писание и находить практические советы для семьи.", "Die Website hilft dabei, die Heilige Schrift zu erforschen und praktische Ratschläge zu finden.", ["deep"]],
      ["Зайдите в интернет и сами посмотрите.", "Geben Sie es einfach bei Google ein, dort finden Sie alles.", ["dismissive"]]
    ]),
    createTheme("1.3", "Почему вы стоите молча и ничего не предлагаете прохожим?", "Warum stehen Sie schweigend da und sprechen die Passanten nicht an?", "", [
      ["Мы уважаем право выбора людей и помогаем тем, кто сам проявляет интерес.", "Wir respektieren die Entscheidungsfreiheit der Menschen und helfen denen, die selbst Interesse zeigen.", ["respect", "tact"]],
      ["Наши стенды открыты для каждого. Если у человека есть вопрос, он может свободно подойти.", "Unsere Stände stehen allen offen. Wenn jemand eine Frage hat, kann er gerne kommen.", ["fact", "respect"]],
      ["Мы не хотим быть навязчивыми.", "Wir möchten nicht aufdringlich sein.", ["brief"]],
      ["Вам нужно заставить людей слушать!", "Man sollte die Leute zwingen zuzuhören!", ["pushy"]]
    ]),
    createTheme("1.4", "Как проходят ваши бесплатные интерактивные уроки Библии?", "Wie läuft ein kostenloser interaktiver Bibelkurs ab?", "", [
      ["Это удобное обсуждение по темам: вы задаёте вопросы, а мы находим ответы в Библии.", "Es ist ein praktisches Gespräch nach Themen: Sie stellen Fragen, wir finden Antworten in der Bibel.", ["fact", "respect"]],
      ["Мы рассматриваем, что Библия говорит о будущем, семье и обретении душевного покоя.", "Wir betrachten, was die Bibel über die Zukunft, die Familie und den inneren Frieden sagt.", ["deep"]],
      ["Курс бесплатный и проходит в удобное для вас время.", "Der Kurs ist kostenlos und findet zu einer für Sie passenden Zeit statt.", ["brief"]],
      ["Это обязательная программа для каждого человека.", "Das ist ein Pflichtprogramm für jeden Menschen.", ["pushy"]]
    ]),
    createTheme("1.5", "Кто такие Свидетели Иеговы?", "Wer sind Jehovas Zeugen?", "", [
      ["Мы — всемирная христианская община, которая строит свою веру строго на Библии.", "Wir sind eine weltweite christliche Gemeinschaft, die ihren Glauben fest auf die Bibel stützt.", ["fact", "respect"]],
      ["Мы стараемся подражать Христу и делиться библейской надеждой с ближними.", "Wir versuchen, Jesus nachzuahmen und die biblische Hoffnung mit den Mitmenschen zu teilen.", ["deep", "respect"]],
      ["Мы христиане, изучающие Библию.", "Wir sind Christen, die die Bibel studieren.", ["brief"]],
      ["Мы единственные праведники на этой земле.", "Wir sind die einzigen Gerechten auf dieser Erde.", ["false"]]
    ]),
    createTheme("1.6", "Могу я взять журнал для своей семьи?", "Kann ich eine Zeitschrift für meine Familie mitnehmen?", "", [
      ["Конечно! Возьмите, в нём как раз есть полезные статьи для семьи и воспитания детей.", "Natürlich! Nehmen Sie gerne eine mit, darin gibt es nützliche Artikel für die Familie.", ["tact", "respect"]],
      ["Разумеется. Все материалы бесплатны и помогут вам вместе исследовать Писание.", "Sehr gerne. Alle Publikationen sind kostenlos und helfen beim gemeinsamen Bibellesen.", ["deep", "respect"]],
      ["Да, берите сколько нужно.", "Ja, nehmen Sie so viel Sie brauchen.", ["brief"]],
      ["Только если вы пообещаете прочитать всё от корки до корки!", "Nur wenn Sie versprechen, alles von vorne bis hinten zu lesen!", ["pushy"]]
    ]),
    createTheme("1.7", "Почему у вас литература на разных языках?", "Warum haben Sie Literatur in verschiedenen Sprachen?", "Деяния 17:11", [
      ["Люди любят читать Слово Бога на родном языке. Мы стараемся помочь каждому.", "Menschen lesen Gottes Wort am liebsten in ihrer Muttersprache. Wir möchten jedem helfen.", ["fact", "respect"]],
      ["В Деяниях показано, что весть Бога предназначена для всех народов и языков.", "Die Apostelgeschichte zeigt, dass Gottes Botschaft für alle Nationen und Sprachen bestimmt ist.", ["deep"]],
      ["Чтобы каждый мог выбрать свой язык.", "Damit jeder seine Sprache wählen kann.", ["brief"]],
      ["Чтобы показать, сколько у нас разных книг.", "Um zu zeigen, wie viele verschiedene Bücher wir haben.", ["dismissive"]]
    ]),
    createTheme("1.8", "Чем ваш сайт отличается от других?", "Was unterscheidet Ihre Website von anderen?", "", [
      ["На jw.org нет коммерческой рекламы, сбора средств или платного контента.", "Auf jw.org gibt es keine kommerzielle Werbung, keine Spendenaufrufe und keine kostenpflichtigen Inhalte.", ["fact", "respect"]],
      ["Он полностью посвящён библейскому просвещению и укреплению семейных ценностей.", "Sie widmet sich ganz der biblischen Bildung und der Stärkung von Familienwerten.", ["deep"]],
      ["Там всё бесплатно и без рекламы.", "Dort ist alles kostenlos und werbefrei.", ["brief"]],
      ["Наш сайт — единственный хороший сайт в интернете.", "Unsere Website ist die einzige gute Website im Internet.", ["pushy"]]
    ]),
    createTheme("1.9", "Как финансируется ваша деятельность?", "Wie wird Ihre Tätigkeit finanziert?", "2 Коринфянам 9:7", [
      ["Наша деятельность поддерживается добровольными пожертвованиями людей по всему миру.", "Unsere Tätigkeit wird durch freiwillige Spenden von Menschen auf der ganzen Welt unterstützt.", ["fact", "respect"]],
      ["В Библии сказано: «Каждый пусть поступает, как решил в своём сердце, не с неохотой» (2 Коринфянам 9:7).", "In der Bibel heißt es: «Jeder gebe, wie er es sich im Herzen vorgenommen hat, nicht widerwillig» (2. Korinther 9:7).", ["deep"]],
      ["Всё держится на добровольных пожертвованиях.", "Alles basiert auf freiwilligen Spenden.", ["brief"]],
      ["Нам платят за каждую разданную книгу.", "Wir werden für jedes verteilte Buch bezahlt.", ["false"]]
    ]),
    createTheme("1.10", "С чего лучше начать чтение Библии?", "Womit beginnt man am besten beim Bibellesen?", "Римлянам 15:4", [
      ["Многие начинают с Евангелий (например, от Марка или Матфея), чтобы узнать о жизни Иисуса.", "Viele beginnen mit den Evangelien (z.B. Markus oder Matthäus), um das Leben Jesu kennenzulernen.", ["fact", "respect"]],
      ["В Римлянам 15:4 говорится, что Писания написаны для нашей надежды. Задавайте вопросы и ищите ответы.", "Römer 15:4 zeigt, dass die Schriften zu unserem Trost da sind. Stellen Sie Fragen und suchen Sie Antworten.", ["deep"]],
      ["Начните с Нового Завета.", "Beginnen Sie mit dem Neuen Testament.", ["brief"]],
      ["Читайте всё подряд с первой страницы, иначе ничего не поймёте!", "Lesen Sie alles hintereinander ab der ersten Seite, sonst verstehen Sie nichts!", ["pushy"]]
    ])
  ]
};

const LEVEL_2 = {
  id: 2,
  name: { ru: "Разговор у двери", de: "Gespräche an der Haustür" },
  desc: { ru: "Важные жизненные вопросы и утешение из Писания", de: "Wichtige Lebensfragen und Trost aus der Heiligen Schrift" },
  themes: [
    createTheme("2.1", "Почему в мире столько страданий, если Бог любящий?", "Warum lässt Gott so viel Leid zu, wenn er doch liebevoll ist?", "1 Иоанна 5:19", [
      ["Это очень важный вопрос. Мне жаль, что людям приходится сталкиваться с такой болью.", "Das ist eine sehr wichtige Frage. Es tut mir leid, dass Menschen so viel Schmerz erleben müssen.", ["tact", "respect"]],
      ["В 1 Иоанна 5:19 говорится, что весь мир во власти Злого, но Бог обещает всё исправить.", "In 1. Johannes 5:19 heißt es, dass die ganze Welt im Bösen liegt, aber Gott verspricht Besserung.", ["deep", "tact"]],
      ["Страдания временны, скоро всё изменится.", "Das Leid ist nur vorübergehend, bald wird sich alles ändern.", ["brief"]],
      ["Бог наказывает людей за их грехи.", "Gott bestraft die Menschen für ihre Sünden.", ["false"]]
    ]),
    createTheme("2.2", "Столько войн вокруг — о каком Боге мира вы говорите?", "So viele Kriege überall — von welchem Gott des Friedens sprechen Sie?", "Псалом 46:9", [
      ["Новости действительно пугают, и ваше беспокойство абсолютно понятно и оправданно.", "Die Nachrichten sind wirklich beängstigend, und Ihre Sorge ist völlig verständlich.", ["tact", "respect"]],
      ["В Псалме 46:9 есть обещание: Бог «по всей земле прекращает войны» и установит вечный мир.", "In Psalm 46:9 gibt es das Versprechen: Gott «macht dem Krieg auf der ganzen Erde ein Ende».", ["deep", "fact"]],
      ["Бог прекратит все войны на земле.", "Gott wird allen Kriegen auf der Erde ein Ende machen.", ["brief"]],
      ["Люди сами виноваты, что воюют.", "Die Menschen sind selbst schuld, dass sie Kriege führen.", ["false"]]
    ]),
    createTheme("2.3", "Что происходит с человеком после смерти?", "Was passiert mit einem Menschen nach dem Tod?", "Екклесиаст 9:5", [
      ["Это естественный вопрос для каждого, кто терял близких. Библия даёт очень ясный ответ.", "Das ist eine natürliche Frage für jeden, der Angehörige verloren hat. Die Bibel gibt eine klare Antwort.", ["tact", "respect"]],
      ["В Екклесиасте 9:5 сказано: «мёртвые ничего не знают». Они находятся в состоянии бессознательного покоя.", "In Prediger 9:5 heißt es: «die Toten wissen gar nichts». Sie sind in einem Zustand des Ruhens.", ["deep"]],
      ["Мёртвые покоятся и ничего не чувствуют.", "Die Toten ruhen und fühlen nichts.", ["brief"]],
      ["Душа человека сразу летит в ад или рай.", "Die Seele kommt sofort in die Hölle oder in den Himmel.", ["false"]]
    ]),
    createTheme("2.4", "Есть ли надежда снова увидеть умерших близких?", "Gibt es Hoffnung, verstorbene Angehörige wiederzusehen?", "Деяния 24:15", [
      ["Мысль о встрече с родными приносит огромное утешение. Бог обещает воскресение.", "Der Gedanke an ein Wiedersehen bringt großen Trost. Gott verspricht die Auferstehung.", ["tact", "respect"]],
      ["В Деяниях 24:15 записана надежда: «будет воскресение праведных и неправедных» прямо здесь на земле.", "Apostelgeschichte 24:15 gibt Hoffnung: Es wird eine «Auferstehung der Gerechten und Ungerechten» geben.", ["deep"]],
      ["Библия обещает воскресение умерших.", "Die Bibel verspricht die Auferstehung der Toten.", ["brief"]],
      ["Нет, кто умер — тот исчез навсегда.", "Nein, wer tot ist, ist für immer weg.", ["dismissive"]]
    ]),
    createTheme("2.5", "Зачем молиться, если Бог и так всё знает?", "Warum beten, wenn Gott ohnehin alles weiß?", "Филиппийцам 4:6", [
      ["Молитва — это не просто передача информации, а наш личный разговор с любящим Отцом.", "Das Gebet ist nicht nur Informationsweitergabe, sondern ein persönliches Gespräch mit dem Vater.", ["tact", "respect"]],
      ["В Филиппийцам 4:6 советуется открывать свои просьбы Богу, и его мир сохранит наши сердца.", "In Philipper 4:6 wird geraten, Gott die Bitten bekannt zu machen; sein Frieden wird uns behüten.", ["deep"]],
      ["Молитва приносит душевный покой и сближает с Богом.", "Das Gebet bringt Seelenfrieden und bringt uns Gott näher.", ["brief"]],
      ["Заученные молитвы надо повторять по 10 раз в день.", "Auswendig gelernte Gebete muss man 10 Mal am Tag wiederholen.", ["false"]]
    ]),
    createTheme("2.6", "Как укрепить брак и сохранить мир в семье?", "Wie kann man die Ehe stärken und den Frieden in der Familie bewahren?", "Ефесянам 5:33", [
      ["Крепкая семья строится на взаимном уважении и готовности прощать.", "Eine starke Familie baut auf gegenseitigem Respekt und Vergebungsbereitschaft auf.", ["tact", "respect"]],
      ["В Ефесянам 5:33 даётся золотой совет: мужу любить жену, а жене глубоко уважать мужа.", "In Epheser 5:33 steht der goldene Rat: Der Mann soll die Frau lieben, die Frau den Mann achten.", ["deep"]],
      ["Библейские советы помогают избегать конфликтов.", "Biblische Ratschläge helfen, Konflikte zu vermeiden.", ["brief"]],
      ["Развод — единственное решение любых проблем.", "Scheidung ist die einzige Lösung für alle Probleme.", ["dismissive"]]
    ]),
    createTheme("2.7", "Что Библия говорит о будущем нашей планеты?", "Was sagt die Bibel über die Zukunft unseres Planeten?", "Откровение 21:4", [
      ["Бог создал Землю не для уничтожения, а для того, чтобы она была прекрасным домом для людей.", "Gott hat die Erde nicht zur Vernichtung erschaffen, sondern als schönes Zuhause für Menschen.", ["fact", "respect"]],
      ["В Откровении 21:4 обещается, что больше не будет смерти, боли и слез, а Земля станет раем.", "Offenbarung 21:4 verspricht, dass es keinen Tod, Schmerz und Tränen mehr geben wird.", ["deep"]],
      ["Земля сохранится и станет райским домом.", "Die Erde wird erhalten bleiben und ein Paradies werden.", ["brief"]],
      ["Наша планета полностью сгорит в огне.", "Unser Planet wird im Feuer komplett verbrennen.", ["false"]]
    ]),
    createTheme("2.8", "Почему важно знать личное имя Бога — Иегова?", "Warum ist es wichtig, Gottes persönlichen Namen – Jehova – zu kennen?", "Исаия 42:8", [
      ["У каждого личного друга есть имя. Бог хочет, чтобы мы знали его имя и приближались к нему.", "Jeder persönliche Freund hat einen Namen. Gott möchte, dass wir seinen Namen kennen.", ["tact", "respect"]],
      ["В Исаии 42:8 Бог говорит: «Я Иегова. Это моё имя». Оно встречается в древних текстах тысячи раз.", "In Jesaja 42:8 sagt Gott: «Ich bin Jehova. Das ist mein Name.» Er steht tausendfach in den Urschriften.", ["deep"]],
      ["Имя Бога открывает его личность и замысел.", "Der Name Gottes offenbart seine Persönlichkeit und sein Vorhaben.", ["brief"]],
      ["Имя совершенно не имеет значения, называйте как хотите.", "Der Name spielt überhaupt keine Rolle, nennen Sie ihn wie Sie wollen.", ["dismissive"]]
    ]),
    createTheme("2.9", "Как справляться с ежедневной тревогой и стрессом?", "Wie geht man mit täglicher Sorge und Stress um?", "Исаия 41:10", [
      ["Стресс — частый спутник современной жизни. Поддержка из Слово Бога помогает обрести стойкость.", "Stress begleitet uns oft. Die Unterstützung aus Gottes Wort schenkt Widerstandskraft.", ["tact", "respect"]],
      ["В Исаии 41:10 Бог подбадривает: «Не бойся, я с тобой... Я укреплю тебя и помогу тебе».", "In Jesaja 41:10 ermuntert Gott: «Fürchte dich nicht, ich bin bei dir... Ich werde dich stärken».", ["deep"]],
      ["Доверие Богу даёт внутреннюю уверенность.", "Vertrauen auf Gott schenkt innere Zuversicht.", ["brief"]],
      ["Просто игнорируйте проблемы и они сами пройдут.", "Ignorieren Sie Probleme einfach, dann gehen sie vorbei.", ["dismissive"]]
    ]),
    createTheme("2.10", "Почему Библия актуальна для современного человека?", "Warum ist die Bibel für den modernen Menschen aktuell?", "2 Тимофею 3:16", [
      ["Мудрость Библии проверена веками. Её советы для семьи и жизни работают и сегодня.", "Die Weisheit der Bibel ist jahrhundertealt erprobt. Ihre Ratschläge funktionieren auch heute.", ["fact", "respect"]],
      ["В 2 Тимофею 3:16 говорится, что Писание полезно для обучения и исправления нашей жизни.", "2. Timotheus 3:16 zeigt, dass die Schrift nützlich zum Lehren und Richtigstellen ist.", ["deep"]],
      ["Библия дает практическое руководство на каждый день.", "Die Bibel gibt praktische Wegleitung für jeden Tag.", ["brief"]],
      ["Это устаревшая книга, не имеющая ценности.", "Das ist ein veraltetes Buch ohne Wert.", ["false"]]
    ])
  ]
};

const LEVEL_3 = {
  id: 3,
  name: { ru: "Неформальное служение", de: "Informelles Zeugnisgeben" },
  desc: { ru: "В транспорте, очереди или во время отдыха", de: "Unterwegs, in Schlangen oder in der Freizeit" },
  themes: [
    createTheme("3.1", "Как вам удаётся сохранять спокойствие при тревожных новостях?", "Wie schaffen Sie es, bei so beunruhigenden Nachrichten ruhig zu bleiben?", "Римлянам 15:4", [
      ["Понимаю вас, новости создают много стресса. Меня очень поддерживает надежда из Библии.", "Ich verstehe Sie, Nachrichten erzeugen Stress. Mich ermutigt die Hoffnung aus der Bibel.", ["tact", "respect"]],
      ["В Римлянам 15:4 сказано, что утешение из Писаний даёт нам стойкость и уверенность в будущем.", "Römer 15:4 zeigt, dass der Trost aus den Schriften uns Standhaftigkeit und Zuversicht schenkt.", ["deep"]],
      ["Надежда из Библии даёт внутренний покой.", "Die biblische Hoffnung schenkt inneren Frieden.", ["brief"]],
      ["Дальше будет только хуже, так написано!", "Es wird nur noch schlimmer kommen!", ["pushy"]]
    ]),
    createTheme("3.2", "Что это за интересный журнал у вас в руках?", "Was ist das für eine interessante Zeitschrift in Ihrer Hand?", "", [
      ["Это журнал «Сторожевая башня». В нём рассматриваются практические советы для жизни на основе Библии.", "Das ist die Zeitschrift «Der Wachtturm». Sie behandelt praktische Lebenstipps auf Bibelbasis.", ["fact", "respect"]],
      ["Здесь как раз обсуждается тема укрепления семьи. Можете взять его почитать.", "Hier geht es gerade um die Stärkung der Familie. Sie können sie gerne lesen.", ["tact", "respect"]],
      ["Журнал бесплатно рассказывает о библейской надежде.", "Die Zeitschrift berichtet kostenlos über biblische Hoffnung.", ["brief"]],
      ["Прочитайте от корки до корки прямо сейчас!", "Lesen Sie sie sofort von vorne bis hinten!", ["pushy"]]
    ]),
    createTheme("3.3", "Воспитание детей сегодня требует столько сил!", "Kindererziehung erfordert heute so viel Kraft!", "Притчи 22:6", [
      ["Вы абсолютно правы, воспитание детей — это большой труд и огромная ответственность.", "Sie haben absolut recht, Kindererziehung ist eine große Aufgabe und Verantwortung.", ["tact", "respect"]],
      ["В Притчах 22:6 даётся добрый совет наставлять ребёнка на правильный путь с самого детства.", "In Sprüche 22:6 steht der gute Rat, ein Kind von klein auf auf den richtigen Weg zu lenken.", ["deep"]],
      ["Библейские ориентиры очень помогают родителям.", "Biblische Richtlinien helfen Eltern sehr.", ["brief"]],
      ["Пусть дети делают что хотят, не надо их учить.", "Lassen Sie Kinder tun was sie wollen.", ["dismissive"]]
    ]),
    createTheme("3.4", "Цены растут, как сохранять уверенность в завтрашнем дне?", "Die Preise steigen, wie bleibt man zuversichtlich?", "Матфея 6:31-33", [
      ["Экономическая нестабильность действительно беспокоит многих людей сегодня.", "Die wirtschaftliche Unsicherheit macht heute vielen Menschen Sorgen.", ["tact", "respect"]],
      ["Иисус в Матфея 6:33 заверил, что если ставить духовное на первое место, Бог позаботится о насущном.", "Jesus versicherte in Matthäus 6:33, dass Gott für das Nötige sorgt, wenn das Geistige vorgeht.", ["deep"]],
      ["Уверенность даёт доверие заботе Бога.", "Vertrauen auf Gottes Fürsorge schenkt Zuversicht.", ["brief"]],
      ["Нужно работать без отдыха 24 часа в сутки.", "Man muss rund um die Uhr ohne Pause arbeiten.", ["pushy"]]
    ]),
    createTheme("3.5", "Приятно видеть, когда люди проявляют доброту к незнакомцам.", "Es ist schön zu sehen, wenn Menschen Fremden Freundlichkeit zeigen.", "Иоанна 13:35", [
      ["Доброта и внимание делают наш мир лучше. Это очень ценное качество.", "Freundlichkeit macht unsere Welt besser. Das ist eine sehr wertvolle Eigenschaft.", ["tact", "respect"]],
      ["Иисус сказал в Иоанна 13:35, что именно по искренней любви узнают его истинных учеников.", "Jesus sagte in Johannes 13:35, dass man seine echten Jünger an der Liebe erkennt.", ["deep"]],
      ["Любовь к ближнему — основа христианства.", "Nächstenliebe ist das Fundament des Christentums.", ["brief"]],
      ["Доброта сегодня никому не нужна.", "Freundlichkeit braucht heute niemand mehr.", ["dismissive"]]
    ]),
    createTheme("3.6", "Природа поражает своей красотой и сложностью устройства!", "Die Natur beeindruckt durch ihre Schönheit und Komplexität!", "Евреям 3:4", [
      ["Действительно, гармония в природе заставляет задуматься о гениальном Замыслителе.", "Tatsächlich lässt die Harmonie der Natur an einen genialen Schöpfer denken.", ["fact", "respect"]],
      ["В Евреям 3:4 разумно отмечается: «Каждый дом кем-то построен, а построивший всё есть Бог».", "In Hebräer 3:4 heißt es logisch: «Jedes Haus wird von jemand erbaut, der aber alles erbaut hat, ist Gott».", ["deep"]],
      ["Сложность жизни указывает на мудрого Творца.", "Die Komplexität des Lebens weist auf einen weisen Schöpfer hin.", ["brief"]],
      ["Всё возникло случайно из ничего.", "Alles ist zufällig aus dem Nichts entstanden.", ["false"]]
    ]),
    createTheme("3.7", "Хорошая погода для прогулки в парке!", "Schönes Wetter für einen Spaziergang im Park!", "Псалом 104:24", [
      ["Да, замечательный день! Природа очень помогает восстановить силы и отдохнуть.", "Ja, ein wunderbarer Tag! Die Natur hilft sehr, Kräften zu tanken.", ["tact", "respect"]],
      ["В Псалме 104:24 восклицается: «Как многочисленны дела твои, Иегова! Всё сотворил ты с мудростью».", "In Psalm 104:24 heißt es: «Wie zahlreich sind deine Werke, o Jehova! Du hast sie alle mit Weisheit gemacht».", ["deep"]],
      ["Красота мира напоминает о щедрости Создателя.", "Die Schönheit der Welt erinnert an die Großzügigkeit des Schöpfers.", ["brief"]],
      ["Не обращал внимания на погоду.", "Ich habe gar nicht aufs Wetter geachtet.", ["dismissive"]]
    ]),
    createTheme("3.8", "Здоровье — самое ценное, что есть у человека.", "Gesundheit ist das Wertvollste, was der Mensch hat.", "Исаия 33:24", [
      ["Совершенно верно. Когда здоровье подводит, всё остальное отходит на второй план.", "Völlig richtig. Wenn die Gesundheit nachlässt, wird alles andere zweitrangig.", ["tact", "respect"]],
      ["Библия обещает время в Исаии 33:24, когда «ни один житель не скажет: я болен».", "Die Bibel verspricht in Jesaja 33:24 eine Zeit, in der «kein Bewohner sagen wird: Ich bin krank».", ["deep"]],
      ["Бог обещает в будущем полное избавление от болезней.", "Gott verspricht in der Zukunft die Befreiung von Krankheiten.", ["brief"]],
      ["Болезни будут всегда и ничего не поделать.", "Krankheiten wird es immer geben und man kann nichts tun.", ["dismissive"]]
    ]),
    createTheme("3.9", "Настоящих друзей в наше время найти нелегко.", "Echte Freunde sind heutzutage schwer zu finden.", "Притчи 17:17", [
      ["Верность и искренность в дружбе — действительно редкое и драгоценное качество.", "Treue und Ehrlichkeit in der Freundschaft sind wirklich seltene Eigenschaften.", ["tact", "respect"]],
      ["В Притчах 17:17 сказано: «Настоящий друг любит во всякое время и превращается в брата во время бедствия».", "In Sprüche 17:17 heißt es: «Ein wahrer Freund liebt allezeit und ist als Bruder für Zeiten der Not geboren».", ["deep"]],
      ["Настоящий друг познаётся в испытаниях.", "Ein wahrer Freund zeigt sich in der Not.", ["brief"]],
      ["Друзей не бывает, каждый сам за себя.", "Freunde gibt es nicht, jeder ist sich selbst der Nächste.", ["false"]]
    ]),
    createTheme("3.10", "Если бы все люди относились друг к другу с уважением...", "Wenn alle Menschen einander mit Respekt begegnen würden...", "Матфея 7:12", [
      ["Как изменился бы мир! Взаимное уважение могло бы предотвратить большинство конфликтов.", "Wie würde sich die Welt verändern! Gegenseitiger Respekt würde Konflikte verhindern.", ["tact", "respect"]],
      ["Иисус дал золотое правило в Матфея 7:12: «Во всём поступайте с людьми так, как хотите, чтобы они поступали с вами».", "Jesus gab die Goldene Regel in Matthäus 7:12: «Alles, was ihr wollt, dass euch die Menschen tun, das tut auch ihr ihnen».", ["deep"]],
      ["Золотое правило Иисуса — основа гармонии в обществе.", "Die Goldene Regel Jesu ist das Fundament der Harmonie.", ["brief"]],
      ["Люди никогда не научатся уважать друг друга.", "Menschen werden nie lernen, einander zu achten.", ["dismissive"]]
    ])
  ]
};

const LEVEL_4 = {
  id: 4,
  name: { ru: "Повторные посещения", de: "Rückbesuche" },
  desc: { ru: "Развитие интереса у людей, проявивших внимание", de: "Förderung des Interesses bei aufgeschlossenen Personen" },
  themes: [
    createTheme("4.1", "Рад вас снова видеть! Я прочитал ту публикацию, которую вы оставили.", "Schön Sie wiederzusehen! Ich habe die Publikation gelesen.", "", [
      ["Очень рад это слышать! Какая мысль из статьи откликнулась вам больше всего?", "Das freut mich sehr! Welcher Gedanke aus dem Artikel hat Ihnen am besten gefallen?", ["tact", "respect"]],
      ["Замечательно! Сегодня мы можем вместе рассмотреть, что по этой теме говорит сама Библия.", "Wunderbar! Heute können wir gemeinsam anschauen, was die Bibel selbst dazu sagt.", ["deep", "respect"]],
      ["Вот держите ещё одну интересную статью.", "Hier ist noch ein interessanter Artikel für Sie.", ["brief"]],
      ["Теперь вы обязаны начать регулярный курс!", "Jetzt müssen Sie unbedingt einen regelmäßigen Kurs beginnen!", ["pushy"]]
    ]),
    createTheme("4.2", "В прошлый раз мы задались вопросом: В чём замысел Бога для человека?", "Letztes Mal fragten wir uns: Was ist Gottes Vorhaben für den Menschen?", "Бытие 1:28", [
      ["Приятно продолжить наше обсуждение. Бог создал человека для счастливой жизни.", "Schön, unser Gespräch fortzusetzen. Gott erschuf den Menschen für ein glückliches Leben.", ["fact", "respect"]],
      ["В Бытии 1:28 показано, что Бог поручил людям заботиться о Земле и жить на ней в мире.", "In 1. Mose 1:28 wird gezeigt, dass Gott den Menschen auftrug, die Erde zu pflegen und in Frieden zu leben.", ["deep"]],
      ["Замысел Бога — вечная счастливая жизнь на Земле.", "Gottes Vorhaben ist ewiges glückliches Leben auf der Erde.", ["brief"]],
      ["Бог создал человека просто так, без цели.", "Gott hat den Menschen einfach so ohne Ziel erschaffen.", ["false"]]
    ]),
    createTheme("4.3", "Что представляет собой Царство Бога, о котором просил Иисус?", "Was ist Gottes Königreich, um das Jesus zu beten lehrte?", "Матфея 6:9, 10", [
      ["В молитве «Отче наш» мы просим: «Да прийдёт Царствие Твоё». Это реальное небесное правительство.", "Im Vaterunser beten wir: «Dein Reich komme». Es ist eine reale himmlische Regierung.", ["fact", "respect"]],
      ["Царство Бога во главе с Иисусом Христом заменит все человеческие власти и принесёт мир на Землю (Матфея 6:10).", "Gottes Königreich unter Jesus wird alle menschlichen Regierungen ersetzen und Frieden bringen.", ["deep"]],
      ["Царство Бога — это правительство Бога для всей Земли.", "Gottes Königreich ist Gottes Regierung für die ganze Erde.", ["brief"]],
      ["Царство Бога — это просто состояние в сердце человека.", "Gottes Königreich ist nur ein Zustand im Herzen.", ["false"]]
    ]),
    createTheme("4.4", "Почему существует так много разных религий?", "Warum gibt es so viele verschiedene Religionen?", "Матфея 7:13, 14", [
      ["Это естественный вопрос. Не все пути ведут к Богу, важно проверять учения по Библии.", "Das ist eine berechtigte Frage. Nicht alle Wege führen zu Gott; man muss Lehren prüfen.", ["fact", "respect"]],
      ["Иисус сказал в Матфея 7:14, что узкие ворота ведут в жизнь, и немногие находят их.", "Jesus sagte in Matthäus 7:14, dass der schmale Weg zum Leben führt und wenige ihn finden.", ["deep"]],
      ["Истинное поклонение основано на точных знаниях Библии.", "Wahre Anbetung stützt sich auf genaue Bibelkenntnis.", ["brief"]],
      ["Все религии одинаково хороши и правильны.", "Alle Religionen sind gleich gut und richtig.", ["false"]]
    ]),
    createTheme("4.5", "Хочу показать вам удобную брошюру «Жить счастливой жизнью вечно!»", "Ich möchte Ihnen die Broschüre «Glücklich – für immer!» zeigen.", "", [
      ["Эта брошюра создана для интерактивного рассмотрения Библии короткими уроками.", "Diese Broschüre ist für das interaktive Bibellesen in kurzen Lektionen konzipiert.", ["fact", "respect"]],
      ["Каждая урочная тема включает стихи из Библии, иллюстрации и видеоматериалы.", "Jede Lektion enthält Bibeltexte, Illustrationen und Videos.", ["deep", "respect"]],
      ["Её можно читать в комфортном для вас темпе.", "Sie können sie in Ihrem eigenen Tempo lesen.", ["brief"]],
      ["Вы должны изучить её за одну неделю!", "Sie müssen sie in einer Woche durcharbeiten!", ["pushy"]]
    ]),
    createTheme("4.6", "Совместимы ли научные факты и доверие Библии?", "Sind wissenschaftliche Fakten und Bibelvertrauen vereinbar?", "Иов 26:7", [
      ["Библия — не научный учебник, но когда она упоминает научные факты, она поразительно точна.", "Die Bibel ist kein Wissenschaftsbuch, aber wenn sie Wissenschaft berührt, ist sie genau.", ["fact", "respect"]],
      ["Например, в Иове 26:7 ещё в древности было записано, что Бог «повесил землю ни на чём».", "In Hiob 26:7 wurde schon vor alters aufgeschrieben, dass Gott «die Erde an nichts aufhängt».", ["deep"]],
      ["Точные факты Писания опередили время на тысячелетия.", "Genaue Bibelangaben waren ihrer Zeit um Jahrtausende voraus.", ["brief"]],
      ["Наука и Библия всегда противоречат друг другу.", "Wissenschaft und Bibel widersprechen sich immer.", ["false"]]
    ]),
    createTheme("4.7", "Давайте прочитаем один короткий стих прямо из Библии.", "Lass uns einen kurzen Vers direkt aus der Bibel lesen.", "Евреям 4:12", [
      ["Чтение самого текста Писания имеет особую силу и освежает разум.", "Das Lesen des Bibeltextes selbst hat eine besondere Kraft und erfrischt den Sinn.", ["tact", "respect"]],
      ["В Евреям 4:12 сказано, что «слово Бога живо и действенно» и затрагивает самые глубокие чувства.", "In Hebräer 4:12 heißt es, dass «Gottes Wort lebendig und wirksam ist» und tief berührt.", ["deep"]],
      ["Слово Бога даёт ответы на личные вопросы.", "Gottes Wort gibt Antworten auf persönliche Fragen.", ["brief"]],
      ["Не надо читать Библию, слушайте только меня.", "Lesen Sie nicht selbst, hören Sie nur auf mich.", ["pushy"]]
    ]),
    createTheme("4.8", "У нас есть короткий 2-минутный ролик по этой теме на jw.org.", "Wir haben ein einführendes 2-Minuten-Video auf jw.org dazu.", "", [
      ["Видео наглядно и быстро показывает суть библейского ответа. Могу показать на планшете.", "Das Video zeigt anschaulich die biblische Antwort. Ich kann es auf dem Tablet zeigen.", ["fact", "respect"]],
      ["Короткие ролик помогают легко усвоить главную мысль Писания.", "Kurze Videos helfen, den Hauptgedanken der Schrift leicht zu erfassen.", ["deep"]],
      ["Ролик можно посмотреть в любое время по QR-коду.", "Das Video kann jederzeit per QR-Code angesehen werden.", ["brief"]],
      ["Вы обязаны посмотреть весь фильм сейчас!", "Sie müssen jetzt den ganzen Film anschauen!", ["pushy"]]
    ]),
    createTheme("4.9", "Действительно ли текст Библии сохранился без искажений?", "Ist der Bibeltext wirklich unverfälscht erhalten geblieben?", "2 Петра 1:21", [
      ["Древние рукописи и свитки Мёртвого моря подтверждают невероятную точность передачи текста.", "Alte Handschriften und die Schriftrollen vom Toten Meer bestätigen die Genauigkeit.", ["fact", "respect"]],
      ["В 2 Петра 1:21 объясняется, что люди «говорили от Бога, движимые святым духом».", "2. Petrus 1:21 erklärt, dass Menschen «von Gott aus redeten, getrieben von heiligen Geist».", ["deep"]],
      ["Бог позаботился о сохранении своего Слова для нас.", "Gott hat für die Bewahrung seines Wortes gesorgt.", ["brief"]],
      ["Библию переписывали сто раз и от оригинала ничего не осталось.", "Die Bibel wurde x-mal umgeschrieben und nichts ist übrig.", ["false"]]
    ]),
    createTheme("4.10", "Можем попробовать провести пробный 5-минутный библейский урок?", "Sollen wir eine 5-minütige Probelektion des Bibelkurses versuchen?", "", [
      ["Мы просто рассмотрим один абзац и один стих из Библии. Если не понравится — мы остановимся.", "Wir betrachten nur einen Absatz und einen Bibelvers. Wenn es nicht gefällt, hören wir auf.", ["tact", "respect"]],
      ["Это простой способ увидеть, как проходило обучение Библии в I веке.", "Es ist eine einfache Möglichkeit zu sehen, wie das Bibellernen im 1. Jahrhundert ablief.", ["deep"]],
      ["Пробный урок не обязывает вас ни к чему.", "Eine Probelektion verpflichtet Sie zu nichts.", ["brief"]],
      ["Вы должны соглашаться на всё, что я говорю.", "Sie müssen allem zustimmen, was ich sage.", ["pushy"]]
    ])
  ]
};

const LEVEL_5 = {
  id: 5,
  name: { ru: "Изучение Библии", de: "Bibelstudium" },
  desc: { ru: "Проведение библейских уроков и ответы на вопросы ученика", de: "Durchführen von Bibelkursen und Beantworten von Fragen" },
  themes: [
    createTheme("5.1", "Как мне объяснить близким свои новые взгляды на Библию?", "Wie kann ich meinen Angehörigen meine neuen Erkenntnisse erklären?", "1 Петра 3:15", [
      ["В 1 Петра 3:15 советуется объяснять свою надежду «с кротостью и глубоким уважением».", "In 1. Petrus 3:15 wird geraten, die Hoffnung «mit Milde und tiefem Respekt» zu erklären.", ["deep", "tact"]],
      ["Проявляйте любовь и терпение. Добрый пример важен не меньше слов.", "Zeigen Sie Liebe und Geduld. Ein gutes Beispiel ist genauso wichtig wie Worte.", ["tact", "respect"]],
      ["Просто дайте родным время привыкнуть.", "Geben Sie Ihren Angehörigen einfach Zeit.", ["brief"]],
      ["Не слушайте их, они ничего не понимают!", "Hören Sie nicht auf sie, sie verstehen gar nichts!", ["pushy"]]
    ]),
    createTheme("5.2", "Что значит «выкупать время» для духовных занятий?", "Was bedeutet es, «die Zeit auszukaufen» für geistige Dinge?", "Ефесянам 5:15, 16", [
      ["В Ефесянам 5:16 советуется мудро использовать время, выделяя главное среди суеты.", "In Epheser 5:16 wird geraten, die Zeit weise zu nutzen und das Wichtige zu priorisieren.", ["deep"]],
      ["Это значит осознанно планировать время для чтения Библии и размышления.", "Das bedeutet, bewusst Zeit für das Bibellesen und Nachdenken einzuplanen.", ["fact", "respect"]],
      ["Выделяйте немного времени каждый день.", "Nehmen Sie sich jeden Tag etwas Zeit.", ["brief"]],
      ["Нужно бросить все дела и только читать книги.", "Man muss alle Aufgaben aufgeben und nur noch lesen.", ["false"]]
    ]),
    createTheme("5.3", "Как развить привычку регулярного чтения Библии?", "Wie entwickelt man die Gewohnheit des regelmäßigen Bibellesens?", "Псалом 1:1, 2", [
      ["В Псалме 1:2 говорится о счастливчике, который размышляет над Законом Бога день и ночь.", "In Psalm 1:2 wird der Glückliche beschrieben, der Tag und Nacht über Gottes Gesetz nachdenkt.", ["deep"]],
      ["Лучше читать понемногу каждый день, чем много раз в месяц. Важна регулярность.", "Lieber täglich ein wenig lesen als einmal im Monat viel. Regelmäßigkeit zählt.", ["fact", "respect"]],
      ["Читайте в одно и то же удобное время.", "Lesen Sie zur selben passenden Zeit.", ["brief"]],
      ["Если за день не прочитали 10 глав — вы плохо стараетесь.", "Wenn Sie nicht 10 Kapitel am Tag lesen, strengen Sie sich nicht an.", ["pushy"]]
    ]),
    createTheme("5.4", "Что делать, если трудно сосредоточиться во время молитвы?", "Was tun, wenn es schwerfällt, sich beim Gebet zu konzentrieren?", "1 Фессалоникийцам 5:17", [
      ["Молитесь простыми и искренними словами. Бог смотрит на сердце, а не на красноречие.", "Beten Sie mit einfachen, ehrlichen Worten. Gott sieht auf das Herz.", ["tact", "respect"]],
      ["В 1 Фессалоникийцам 5:17 советуется «непрестанно молиться» — сохранять молитвенный настрой.", "In 1. Thessalonicher 5:17 steht: «Betet unablässig» – bewahrt eine gebetsvolle Haltung.", ["deep"]],
      ["Говорите с Богом откровенно, как с близким другом.", "Sprechen Sie offen mit Gott wie mit einem guten Freund.", ["brief"]],
      ["Используйте только заученные сложные тексты.", "Nutzen Sie nur auswendig gelernte schwere Texte.", ["false"]]
    ]),
    createTheme("5.5", "Зачем посещать христианские встречи в Зале Царства?", "Warum Versammlungszusammenkünfte im Königreichssaal besuchen?", "Евреям 10:24, 25", [
      ["В Евреям 10:24, 25 побуждается собираться вместе для взаимного ободрения и любви.", "In Hebräer 10:24, 25 wird ermuntert, zusammenzukommen, um einander zu Liebe anzuspornen.", ["deep"]],
      ["Встречи дают духовное обучение и тёплое дружеское общение единоверцев.", "Zusammenkünfte bieten biblische Bildung und Gemeinschaft.", ["fact", "respect"]],
      ["Общение с братьями и сёстрами укрепляет веру.", "Die Gemeinschaft stärkt den Glauben.", ["brief"]],
      ["Можно верить в душе и никогда ни с кем не встречаться.", "Man kann alleine glauben und muss niemanden treffen.", ["dismissive"]]
    ]),
    createTheme("5.6", "Как применять библейские принципы в выборе развлечений?", "Wie wendet man biblische Grundsätze bei der Unterhaltung an?", "Филиппийцам 4:8", [
      ["В Филиппийцам 4:8 советуется помышлять о том, что чисто, праведно и добродетельно.", "In Philipper 4:8 wird geraten, über das nachzudenken, was rein, gerecht und tugendhaft ist.", ["deep"]],
      ["Развлечения должны освежать силы и не наполнять умы жестокостью или нечистотой.", "Unterhaltung sollte erfrischen und den Sinn nicht mit Gewalt füllen.", ["tact", "respect"]],
      ["Выбирайте то, что созидает вашу совесть.", "Wählen Sie das, was Ihr Gewissen stärkt.", ["brief"]],
      ["Христианам вообще запрещены любые развлечения.", "Christen sind jegliche Unterhaltungen verboten.", ["false"]]
    ]),
    createTheme("5.7", "Что означает христианский нейтралитет и миролюбие?", "Was bedeutet christliche Neutralität und Friedfertigkeit?", "Исаия 2:4", [
      ["В Исаии 2:4 предсказано, что служители Бога «перекуют мечи на плуги» и не будут учиться воевать.", "In Jesaja 2:4 ist vorhergesagt, dass Gottes Diener «Schwerter zu Pflugscharen schmieden».", ["deep"]],
      ["Иисус учил своих последователей любить даже врагов и сохранять нейтралитет в политике.", "Jesus lehrte seine Nachfolger, selbst Feinde zu lieben und politisch neutral zu bleiben.", ["fact", "respect"]],
      ["Миролюбие — неотъемлемая черта ученика Христа.", "Friedfertigkeit ist ein Merkmal eines Jüngers Christi.", ["brief"]],
      ["Настоящий христианин должен участвовать в политических спорах.", "Ein echter Christ sollte sich an politischen Streitigkeiten beteiligen.", ["false"]]
    ]),
    createTheme("5.8", "Как преодолевать насмешки или несогласие знакомых?", "Wie geht man mit Spott oder Ablehnung Bekannter um?", "Матфея 5:11, 12", [
      ["Иисус заверил в Матфея 5:11: «Счастливы вы, когда вас порочат... из-за меня».", "Jesus versicherte in Matthäus 5:11: «Glücklich seid ihr, wenn man euch schmäht um meinetwillen».", ["deep"]],
      ["Сохраняйте доброту и кротость. Время и ваше доброе поведение рассеют сомнения.", "Bewahren Sie Freundlichkeit. Zeit und gutes Verhalten zerstreuen Bedenken.", ["tact", "respect"]],
      ["Стойкость в испытаниях укрепляет личную веру.", "Standhaftigkeit in Prüfungen stärkt den Glauben.", ["brief"]],
      ["Отвечайте тем же злословием в ответ.", "Zanken Sie genauso zurück.", ["pushy"]]
    ]),
    createTheme("5.9", "В чём разница между формальной молитвой и искренним разговором с Богом?", "Was unterscheidet ein formelles Gebet von einem ehrlichen Gespräch mit Gott?", "Матфея 6:7", [
      ["В Матфея 6:7 Иисус предостерёг: «Приходя в молитве, не повторяйте одно и то же».", "In Matthäus 6:7 warnte Jesus: «Wenn ihr betet, sagt nicht immer wieder dasselbe».", ["deep"]],
      ["Бог ценит искренние чувства, изливаемые от сердца, а не заученные формулировки.", "Gott schätzt ehrliche Gefühle aus dem Herzen, nicht auswendig gelernte Phrasen.", ["fact", "respect"]],
      ["Искренняя молитва — это доверительный разговор с Отцом.", "Ein ehrliches Gebet ist ein vertrauliches Gespräch mit dem Vater.", ["brief"]],
      ["Чем длиннее молитва — тем лучше Бог её слышит.", "Je länger das Gebet, desto besser hört Gott.", ["false"]]
    ]),
    createTheme("5.10", "Каковы важные шаги на пути к христианскому крещению?", "Was sind wichtige Schritte auf dem Weg zur christlichen Taufe?", "Матфея 28:19, 20", [
      ["Крещение — это осознанный личный шаг посвящения Богу Иегове на основе точных знаний.", "Die Taufe ist ein bewusster persönlicher Schritt der Hingabe an Gott auf Wissensbasis.", ["fact", "respect"]],
      ["В Матфея 28:19, 20 Иисус повелел подготавливать учеников, уча их соблюдать всё заповеданное.", "In Matthäus 28:19, 20 gebot Jesus, Jünger zu machen und sie zu lehren.", ["deep"]],
      ["Шаги включают познание, веру, раскаяние и посвящение.", "Die Schritte umfassen Erkenntnis, Glauben, Reue und Hingabe.", ["brief"]],
      ["Крестить надо младенцев без их согласия.", "Man muss Säuglinge ohne deren Zustimmung taufen.", ["false"]]
    ])
  ]
};

const LEVEL_6 = {
  id: 6,
  name: { ru: "Сложные вопросы и возражения", de: "Schwierige Fragen und Einwände" },
  desc: { ru: "Тактичные ответы на глубокие и непростые возражения", de: "Taktvolle Antworten auf schwierige und tiefe Einwände" },
  themes: [
    createTheme("6.1", "Почему вы используете «Перевод нового мира»?", "Warum nutzen Sie die «Neue-Welt-Übersetzung»?", "2 Тимофею 3:16", [
      ["Это точный перевод на современный язык, сделанный с древних манускриптов с возвращением имени Бога.", "Es ist eine genaue Übersetzung in moderne Sprache aus alten Handschriften mit Gottes Namen.", ["fact", "respect"]],
      ["Мы с радостью используем любой перевод Библии при разговоре (2 Тимофею 3:16).", "Wir nutzen im Gespräch gerne jede Bibelübersetzung (2. Timotheus 3:16).", ["deep", "respect"]],
      ["Наш перевод понятен и доступен каждому.", "Unsere Übersetzung ist verständlich und zugänglich.", ["brief"]],
      ["Все остальные переводы неправильные!", "Alle anderen Übersetzungen sind falsch!", ["false"]]
    ]),
    createTheme("6.2", "У меня своя вера и своя церковь!", "Ich habe meinen eigenen Glauben und meine eigene Kirche!", "Иоанна 4:23, 24", [
      ["Мы очень уважаем ваше искреннее отношение к вере. Религиозные чувства — это очень лично.", "Wir respektieren Ihre ehrliche Einstellung zum Glauben sehr.", ["tact", "respect"]],
      ["В Иоанна 4:23 сказано, что истинные поклонники будут поклоняться Отцу «в духе и истине».", "In Johannes 4:23 steht, dass wahre Anbeter den Vater «in Geist und Wahrheit» anbeten.", ["deep"]],
      ["Главное — сверять учения с Библией.", "Wichtig ist, Lehren mit der Bibel abzugleichen.", ["brief"]],
      ["Ваша церковь полностью ошибается!", "Ihre Kirche liegt völlig falsch!", ["pushy"]]
    ]),
    createTheme("6.3", "У меня абсолютно нет времени разговаривать!", "Ich habe absolut keine Zeit zu sprechen!", "", [
      ["Понимаю вас, не буду задерживать. Оставлю лишь короткую карточку с адресом сайта.", "Ich verstehe Sie und halte Sie nicht auf. Ich lasse nur eine Kontaktkarte da.", ["brief", "tact"]],
      ["Спасибо за вашу откровенность. Желаю вам доброго дня!", "Vielen Dank für Ihre Ehrlichkeit. Ich wünsche Ihnen einen schönen Tag!", ["respect"]],
      ["Мы можем зайти в другой раз в удобное время.", "Wir können ein andermal zu einer passenden Zeit kommen.", ["brief"]],
      ["Вы обязаны уделить мне хотя бы 15 минут!", "Sie müssen mir mindestens 15 Minuten schenken!", ["pushy"]]
    ]),
    createTheme("6.4", "Меня совершенно не интересует религия!", "Religion interessiert mich überhaupt nicht!", "", [
      ["Понимаю вас. Многие устали от разочарований в религиозных организациях.", "Ich verstehe Sie. Viele sind enttäuscht von religiösen Organisationen.", ["tact", "respect"]],
      ["Мы приходим поговорить не о религии, а о будущем планеты и практических советах для жизни.", "Wir sprechen nicht über Religion, sondern über die Zukunft und Lebenstipps.", ["fact", "respect"]],
      ["Спасибо за честный ответ. Всего вам доброго!", "Danke für die ehrliche Antwort. Alles Gute!", ["brief"]],
      ["Без религии вы попадёте в беду!", "Ohne Religion geraten Sie in Schwierigkeiten!", ["pushy"]]
    ]),
    createTheme("6.5", "Разве у вас не менялись некоторые ожидания в прошлом?", "Haben sich manche Erwartungen bei Ihnen früher nicht verändert?", "Притчи 4:18", [
      ["Честное исследование Библии требует готовности уточнять понимание по мере роста знаний.", "Ehrliches Bibelforschen erfordert die Bereitschaft, das Verständnis zu verfeinern.", ["fact", "respect"]],
      ["В Притчах 4:18 сказано: «Путь праведных — как сияющий свет, который становится всё ярче».", "In Sprüche 4:18 heißt es: «Der Pfad der Gerechten ist wie glänzendes Licht, das heller wird».", ["deep"]],
      ["Понимание Библии становится всё точнее со временем.", "Das Bibelverständnis wird mit der Zeit genauer.", ["brief"]],
      ["Мы никогда ни в чём не ошибались.", "Wir haben uns noch nie in etwas geirrt.", ["false"]]
    ]),
    createTheme("6.6", "Зачем проповедовать тем, кто уже считает себя христианином?", "Warum gepredigt wird denen, die sich schon als Christen sehen?", "Матфея 24:14", [
      ["Нам приятно общаться с теми, кто любит Библию. Это возможность взаимно ободриться.", "Wir sprechen gerne mit denen, die die Bibel lieben. Das muntert gegenseitig auf.", ["tact", "respect"]],
      ["В Матфея 24:14 Иисус повелел делиться благой вестью о Царстве по всей обитаемой земле.", "In Matthäus 24:14 gebot Jesus, die gute Botschaft vom Reich auf der ganzen Erde zu teilen.", ["deep"]],
      ["Обсуждение Библии обогащает обоих собеседников.", "Bibelgespräche bereichern beide Gesprächspartner.", ["brief"]],
      ["Потому что другие христиане неправильно верят.", "Weil andere Christen falsch glauben.", ["pushy"]]
    ]),
    createTheme("6.7", "Почему вы не празднуете некоторые популярные праздники?", "Warum feiern Sie manche beliebten Feiertage nicht?", "Колоссянам 2:8", [
      ["Мы глубоко исследовали происхождение традиций и стараемся соблюдать только то, что одобряет Бог.", "Wir haben die Herkunft der Bräuche erforscht und halten das, was Gott gutheißt.", ["fact", "respect"]],
      ["В Колоссянам 2:8 советуется остерегаться человеческих традиций, не основанных на Христе.", "In Kolosser 2:8 wird geraten, sich vor Menschlichen Traditionen zu hüten.", ["deep"]],
      ["Наш выбор основан на желании радовать Творца.", "Unsere Wahl stützt sich auf den Wunsch, den Schöpfer zu erfreuen.", ["brief"]],
      ["Кто празднует — тот совершает грех!", "Wer feiert, begeht eine Sünde!", ["pushy"]]
    ]),
    createTheme("6.8", "Религия — это просто средство для зарабатывания денег!", "Religion ist nur ein Mittel zum Geldverdienen!", "2 Коринфянам 2:17", [
      ["К сожалению, коммерциализация религии действительно вызвала у многих отвращение.", "Leider hat die Kommerzialisierung der Religion bei vielen Abscheu erzeugt.", ["tact", "respect"]],
      ["Павел в 2 Коринфянам 2:17 подчеркнул: «Мы не торговцы словом Бога, а говорим со всей искренностью».", "Paulus betonte in 2. Korinther 2:17: «Wir sind nicht wie viele, die mit dem Wort Gottes handeln».", ["deep"]],
      ["Вся наша деятельность поддерживается добровольно без сбора средств.", "Unsere Tätigkeit wird freiwillig ohne Kollekten unterstützt.", ["brief"]],
      ["Все религиозные деятели одинаковы.", "Alle religiösen Personen sind gleich.", ["dismissive"]]
    ]),
    createTheme("6.9", "В чем ваша позиция относительно уважения к ценности жизни?", "Wie ist Ihre Haltung bezüglich der Wertschätzung des Lebens?", "Деяния 15:29", [
      ["Мы глубоко ценим дар жизни и всегда выбираем самую качественную бескровную медицину.", "Wir schätzen das Leben zutiefst und wählen die beste blutfreie Medizin.", ["fact", "respect"]],
      ["Библия в Деяниях 15:29 советуется воздерживаться от крови из уважения к Дателю жизни.", "Die Bibel rät in Apostelgeschichte 15:29, sich des Blutes aus Respekt zu enthalten.", ["deep"]],
      ["Бескровная хирургия сегодня признана передовой и безопасной.", "Blutfreie Chirurgie gilt heute als fortschrittlich und sicher.", ["brief"]],
      ["Жизнь не имеет ценности.", "Das Leben hat keinen Wert.", ["false"]]
    ]),
    createTheme("6.10", "Как вы поступаете, когда собеседник проявляет недоброжелательность?", "Wie reagieren Sie, wenn ein Gesprächspartner Unfreundlichkeit zeigt?", "Притчи 15:1", [
      ["Мы всегда сохраняем уважение и спокойствие. В Притчах 15:1 сказано: «Кроткий ответ отвращает гнев».", "Wir bewahren stets Respekt. In Sprüche 15:1 heißt es: «Eine gelinde Antwort wendet Zorn ab».", ["tact", "respect"]],
      ["В 2 Тимофею 2:24 советуется быть мягким со всеми и сдерживать себя при несправедливости.", "2. Timotheus 2:24 rät, gegen alle sanft zu sein und sich zu beherrschen.", ["deep"]],
      ["Кротость и спокойствие — лучший ответ на грубость.", "Sanftmut und Ruhe sind die beste Antwort auf Härte.", ["brief"]],
      ["Нужно отвечать тем же и спорить до победного!", "Man muss genauso zurückzanken und streiten!", ["pushy"]]
    ])
  ]
};

// --- МЕНЕДЖЕР РЕПОЗИТОРИЯ КОНТЕНТА ---
class MinistryContentRepository {
  static getLevels(lang = 'ru') {
    const rawLevels = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6];
    return rawLevels.map(level => ({
      id: level.id,
      name: level.name[lang] || level.name.ru,
      desc: level.desc[lang] || level.desc.ru,
      themes: level.themes.map(theme => ({
        id: theme.id,
        question: typeof theme.question === 'object' ? (theme.question[lang] || theme.question.ru) : theme.question,
        scripture: theme.scripture || "",
        steps: theme.steps ? theme.steps.map(step => ({
          prompt: typeof step.prompt === 'object' ? (step.prompt[lang] || step.prompt.ru) : step.prompt,
          scripture: step.scripture || "",
          answers: step.answers.map(ans => ({
            text: typeof ans.text === 'object' ? (ans.text[lang] || ans.text.ru) : ans.text,
            tones: ans.tones
          }))
        })) : null,
        answers: theme.answers ? theme.answers.map(ans => ({
          text: typeof ans.text === 'object' ? (ans.text[lang] || ans.text.ru) : ans.text,
          tones: ans.tones
        })) : null
      }))
    }));
  }
}

const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6];

window.MinistryContentRepository = MinistryContentRepository;
window.LEVELS = LEVELS;
window.TONES = TONES;
window.SCRIPTURES = SCRIPTURES;
window.PERSONALITIES = PERSONALITIES;
window.CONFLICT_STEPS = CONFLICT_STEPS;
