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
    text: { ru: "Я, как и они, надеюcь на Бога, что будет воскресение праведных и неправедных.", de: "Und ich habe die Hoffnung auf Gott, dass es eine Auferstehung sowohl der Gerechten als auch der Ungerechten geben wird." },
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

/* ================================================================
   100% АУТЕНТИЧНЫЕ УРОВНИ И ТЕМЫ СЛУЖЕНИЯ (LEVELS 1 - 6)
   ================================================================ */

const LEVEL_1 = {
  id: 1,
  name: { ru: "Стенд и общественные места", de: "Trolley-Dienst und Öffentlichkeit" },
  desc: { ru: "Публичное служение у стенда с литературой", de: "Öffentlicher Dienst mit dem Literatur-Trolley" },
  themes: [
    {
      id: "1.1",
      question: {
        ru: "Что это за стенд? Вы продаёте эти книги и журналы?",
        de: "Was ist das für ein Stand? Verkaufen Sie diese Bücher und Zeitschriften?"
      },
      scripture: "Матфея 10:8",
      answers: [
        {
          text: {
            ru: "Здравствуйте! Это информационный стенд. Вся наша литература бесплатна, мы ничего не продаём. Хотите посмотреть?",
            de: "Guten Tag! Das ist ein Informationsstand. Alle unsere Publikationen sind kostenlos, wir verkaufen nichts. Möchten Sie mal schauen?"
          },
          tones: ["fact", "respect"]
        },
        {
          text: {
            ru: "Добрый день! Мы бесплатно делимся библейскими мыслями, как повелел Иисус: «Даром получили — даром давайте» (Матфея 10:8).",
            de: "Guten Tag! Wir teilen kostenlose Gedanken aus der Bibel, so wie Jesus sagte: „Empfangen habt ihr kostenfrei, gebt kostenfrei“ (Matthäus 10:8)."
          },
          tones: ["deep", "respect"]
        },
        {
          text: {
            ru: "Нет, всё абсолютно бесплатно. Можете взять то, что заинтересует.",
            de: "Nein, alles ist völlig kostenfrei. Sie können sich gerne etwas mitnehmen."
          },
          tones: ["brief"]
        },
        {
          text: {
            ru: "Вам обязательно нужно это прочитать, это самое важное!",
            de: "Das müssen Sie unbedingt lesen, es ist das Wichtigste im Leben!"
          },
          tones: ["pushy"]
        }
      ]
    },
    {
      id: "1.2",
      question: {
        ru: "Что такое сайт JW.ORG?",
        de: "Was ist die Website JW.ORG?"
      },
      scripture: "",
      answers: [
        {
          text: {
            ru: "Это наш официальный сайт. Там можно читать Библию и статьи на сотнях языков без рекламы и платы. Вот QR-код.",
            de: "Das ist unsere offizielle Website. Dort kann man die Bibel und Artikel in hunderten Sprachen lesen – ohne Werbung oder Kosten. Hier ist ein QR-Code."
          },
          tones: ["fact", "respect"]
        },
        {
          text: {
            ru: "Это бесплатный ресурс с ответами на важные жизненные вопросы на основе Библии.",
            de: "Das ist eine kostenlose Online-Quelle mit Antworten auf wichtige Lebensfragen auf der Grundlage der Bibel."
          },
          tones: ["brief"]
        },
        {
          text: {
            ru: "Сайт помогает исследовать Писание и находить практические советы для семьи и жизни.",
            de: "Die Website hilft dabei, die Heilige Schrift zu erforschen und praktische Ratschläge für das Familienleben zu finden."
          },
          tones: ["deep"]
        },
        {
          text: {
            ru: "Зайдите в интернет и сами посмотрите.",
            de: "Geben Sie es einfach bei Google ein, dort finden Sie alles."
          },
          tones: ["dismissive"]
        }
      ]
    },
    {
      id: "1.3",
      question: {
        ru: "Почему вы стоите молча и ничего не предлагаете прохожим?",
        de: "Warum stehen Sie schweigend da und sprechen die Passanten nicht an?"
      },
      scripture: "",
      answers: [
        {
          text: {
            ru: "Мы уважаем право выбора людей. Мы здесь, чтобы помочь тем, кто сам проявляет интерес и хочет поговорить.",
            de: "Wir respektieren die Entscheidungsfreiheit der Menschen. Wir sind hier, um denjenigen zu helfen, die selbst Interesse zeigen."
          },
          tones: ["respect", "tact"]
        },
        {
          text: {
            ru: "Наши стенды открыты для каждого. Если у человека есть вопрос, он может свободно подойти.",
            de: "Unsere Stände stehen allen offen. Wenn jemand eine Frage hat, kann er gerne auf uns zukommen."
          },
          tones: ["fact", "respect"]
        },
        {
          text: {
            ru: "Мы не хотим быть навязчивыми.",
            de: "Wir möchten nicht aufdringlich sein."
          },
          tones: ["brief"]
        },
        {
          text: {
            ru: "Вам нужно заставить людей слушать!",
            de: "Man sollte die Leute zwingen zuzuhören!"
          },
          tones: ["pushy"]
        }
      ]
    },
    {
      id: "1.4",
      question: {
        ru: "Как проходят ваши бесплатные интерактивные уроки Библии?",
        de: "Wie läuft ein kostenloser interaktiver Bibelkurs ab?"
      },
      scripture: "",
      answers: [
        {
          text: {
            ru: "Это удобное обсуждение по темам: вы задаёте вопросы, а мы вместе находим ответы в Библии в комфортном для вас темпе.",
            de: "Es ist ein praktisches Gespräch nach Themen: Sie stellen Fragen und wir finden gemeinsam die Antworten in der Bibel – in Ihrem Tempo."
          },
          tones: ["fact", "respect"]
        },
        {
          text: {
            ru: "Мы рассматриваем, что Библия говорит о будущем, семье и обретении душевного покоя.",
            de: "Wir betrachten, was die Bibel über die Zukunft, die Familie und den inneren Frieden sagt."
          },
          tones: ["deep"]
        },
        {
          text: {
            ru: "Курс бесплатный и проходит в удобное для вас время.",
            de: "Der Kurs ist kostenlos und findet zu einer für Sie passenden Zeit statt."
          },
          tones: ["brief"]
        },
        {
          text: {
            ru: "Это обязательная программа для каждого человека.",
            de: "Das ist ein Pflichtprogramm für jeden Menschen."
          },
          tones: ["pushy"]
        }
      ]
    }
  ]
};

const LEVEL_2 = {
  id: 2,
  name: { ru: "Разговор у двери", de: "Gespräche an der Haustür" },
  desc: { ru: "Важные жизненные вопросы и утешение из Писания", de: "Wichtige Lebensfragen und Trost aus der Heiligen Schrift" },
  themes: [
    {
      id: "2.1",
      question: {
        ru: "Почему в мире столько страданий, если Бог любящий?",
        de: "Warum lässt Gott so viel Leid zu, wenn er doch liebevoll ist?"
      },
      steps: [
        {
          prompt: {
            ru: "Почему в мире столько страданий? Если Бог добрый, почему столько боли?",
            de: "Warum gibt es so viel Leid auf der Welt? Wenn Gott gut ist, warum dann so viel Schmerz?"
          },
          scripture: "",
          answers: [
            {
              text: {
                ru: "Это очень важный вопрос, который волнует многих. Мне жаль, что людям приходится сталкиваться с такой болью.",
                de: "Das ist eine sehr wichtige Frage, die viele Menschen beschäftigt. Es tut mir leid, dass die Menschen so viel Schmerz erleben müssen."
              },
              tones: ["tact", "respect"]
            },
            {
              text: {
                ru: "Я понимаю вас. Когда вокруг столько горя, естественный вопрос — почему Бог молчит.",
                de: "Ich verstehe Sie. Wenn es so viel Leid gibt, fragt man sich natürlich, warum Gott zu schweigen scheint."
              },
              tones: ["tact"]
            },
            {
              text: {
                ru: "Бог допускает это для свободы воли.",
                de: "Gott lässt das wegen des freien Willens zu."
              },
              tones: ["brief"]
            },
            {
              text: {
                ru: "Бог наказывает людей за их грехи.",
                de: "Gott bestraft die Menschen für ihre Sünden."
              },
              tones: ["false"]
            }
          ]
        },
        {
          prompt: {
            ru: "Собеседник немного расположился. Что скажете дальше о причине страданий?",
            de: "Der Gesprächspartner wird zugänglicher. Was sagen Sie als Nächstes zur Ursache des Leids?"
          },
          scripture: "1 Иоанна 5:19",
          answers: [
            {
              text: {
                ru: "Библия показывает, что Бог не виновен в зле. В 1 Иоанна 5:19 говорится, что весь мир находится во власти Злого, но Бог обещает всё исправить.",
                de: "Die Bibel zeigt, dass Gott nicht für das Böse verantwortlich ist. In 1. Johannes 5:19 heißt es, dass die ganze Welt in der Macht des Bösen liegt, aber Gott verspricht Besserung."
              },
              tones: ["deep", "tact"]
            },
            {
              text: {
                ru: "Согласно 1 Иоанна 5:19, правитель этого мира — Сатана. Бог временно допускает это, чтобы доказать своё право править.",
                de: "Gemäß 1. Johannes 5:19 ist der Herrscher dieser Welt Satan. Gott lässt dies vorübergehend zu, um sein Recht zu regieren zu beweisen."
              },
              tones: ["fact", "deep"]
            },
            {
              text: {
                ru: "Страдания временны, скоро всё изменится.",
                de: "Das Leid ist nur vorübergehend, bald wird sich alles ändern."
              },
              tones: ["brief"]
            },
            {
              text: {
                ru: "Надо просто терпеть и не задавать лишних вопросов.",
                de: "Man muss einfach erdulden und keine unnötigen Fragen stellen."
              },
              tones: ["pushy"]
            }
          ]
        }
      ]
    },
    {
      id: "2.2",
      question: {
        ru: "Столько войн вокруг — о каком Боге мира вы говорите?",
        de: "So viele Kriege überall — von welchem Gott des Friedens sprechen Sie?"
      },
      steps: [
        {
          prompt: {
            ru: "Вокруг столько войн и насилия. Как в таком мире верить в Бога?",
            de: "Überall Kriege und Gewalt. Wie kann man in einer solchen Welt an Gott glauben?"
          },
          scripture: "",
          answers: [
            {
              text: {
                ru: "Новости действительно пугают, и ваше беспокойство абсолютно понятно и оправданно.",
                de: "Die Nachrichten sind wirklich beängstigend, und Ihre Sorge ist völlig verständlich und berechtigt."
              },
              tones: ["tact", "respect"]
            },
            {
              text: {
                ru: "Видеть войны и человеческое горе очень тяжело. Согласен с вами, мир очень нуждается в покое.",
                de: "Kriege und menschliches Leid zu sehen ist sehr schwer. Ich stimme Ihnen zu, die Welt braucht dringend Frieden."
              },
              tones: ["tact"]
            },
            {
              text: {
                ru: "Войны всегда были и будут.",
                de: "Kriege gab es schon immer und wird es immer geben."
              },
              tones: ["dismissive"]
            },
            {
              text: {
                ru: "Это всё признаки конца света!",
                de: "Das sind alles Zeichen für das Ende der Welt!"
              },
              tones: ["pushy"]
            }
          ]
        },
        {
          prompt: {
            ru: "Что говорит Библия об окончании войн?",
            de: "Was sagt die Bibel über das Ende von Kriegen?"
          },
          scripture: "Псалом 46:9",
          answers: [
            {
              text: {
                ru: "В Псалме 46:9 есть чудесное обещание: Бог «по всей земле прекращает войны». Он уничтожит всё оружие и установит вечный мир.",
                de: "In Psalm 46:9 gibt es ein wunderbares Versprechen: Gott „macht dem Krieg auf der ganzen Erde ein Ende“. Er wird alle Waffen vernichten."
              },
              tones: ["deep", "fact"]
            },
            {
              text: {
                ru: "Царство Бога заменяет человеческие правительства, которые не способны принести мир (Псалом 46:9).",
                de: "Gottes Königreich wird menschliche Regierungen ersetzen, die keinen Frieden bringen können (Psalm 46:9)."
              },
              tones: ["deep"]
            },
            {
              text: {
                ru: "Бог прекратит все войны на земле.",
                de: "Gott wird allen Kriegen auf der Erde ein Ende machen."
              },
              tones: ["brief"]
            },
            {
              text: {
                ru: "Люди сами виноваты, что воюют.",
                de: "Die Menschen sind selbst schuld, dass sie Kriege führen."
              },
              tones: ["false"]
            }
          ]
        }
      ]
    }
  ]
};

const LEVEL_3 = {
  id: 3,
  name: { ru: "Неформальное служение", de: "Informelles Zeugnisgeben" },
  desc: { ru: "В транспорте, очереди или во время отдыха", de: "Unterwegs, in Schlangen oder in der Freizeit" },
  themes: [
    {
      id: "3.1",
      question: {
        ru: "Как вам удаётся сохранять спокойствие при таких тревожных новостях?",
        de: "Wie schaffen Sie es, bei so beunruhigenden Nachrichten ruhig zu bleiben?"
      },
      steps: [
        {
          prompt: {
            ru: "Новости сегодня просто пугающие. Как вообще можно не паниковать?",
            de: "Die Nachrichten heute sind einfach beängstigend. Wie kann man da nicht in Panik geraten?"
          },
          scripture: "",
          answers: [
            {
              text: {
                ru: "Понимаю вас, новости действительно создают много стресса. Меня очень поддерживает надежда из Библии.",
                de: "Ich verstehe Sie, die Nachrichten erzeugen wirklich viel Stress. Mich ermutigt die Hoffnung aus der Bibel sehr."
              },
              tones: ["tact", "respect"]
            },
            {
              text: {
                ru: "Да, время непростое. Но знание того, что у Бога есть замысел для будущего, даёт внутренний покой.",
                de: "Ja, die Zeiten sind nicht leicht. Aber zu wissen, dass Gott einen Vorhaben für die Zukunft hat, schenkt inneren Frieden."
              },
              tones: ["deep", "tact"]
            },
            {
              text: {
                ru: "Просто не смотрите телевизор.",
                de: "Schauen Sie einfach kein Fernsehen mehr."
              },
              tones: ["brief"]
            },
            {
              text: {
                ru: "Дальше будет только хуже, так написано в Библии!",
                de: "Es wird nur noch schlimmer kommen, so steht es in der Bibel!"
              },
              tones: ["pushy"]
            }
          ]
        }
      ]
    }
  ]
};

const LEVEL_4 = {
  id: 4,
  name: { ru: "Повторные посещения", de: "Rückbesuche" },
  desc: { ru: "Развитие интереса у людей, проявивших внимание", de: "Förderung des Interesses bei aufgeschlossenen Personen" },
  themes: [
    {
      id: "4.1",
      question: {
        ru: "Рад вас снова видеть! Я прочитал ту публикацию, которую вы оставили.",
        de: "Schön Sie wiederzusehen! Ich habe die Publikation gelesen, die Sie mir dagelassen haben."
      },
      steps: [
        {
          prompt: {
            ru: "Здравствуйте! Я прочитал статью. Было очень интересно.",
            de: "Guten Tag! Ich habe den Artikel gelesen. Es war sehr interessant."
          },
          scripture: "",
          answers: [
            {
              text: {
                ru: "Очень рад это слышать! Какая мысль из статьи вам откликнулась больше всего?",
                de: "Das freut mich sehr zu hören! Welcher Gedanke aus dem Artikel hat Ihnen am besten gefallen?"
              },
              tones: ["tact", "respect"]
            },
            {
              text: {
                ru: "Замечательно! В следующий раз мы можем вместе рассмотреть, что по этой теме говорит сама Библия.",
                de: "Wunderbar! Beim nächsten Mal können wir gemeinsam anschauen, was die Bibel selbst zu diesem Thema sagt."
              },
              tones: ["deep", "respect"]
            },
            {
              text: {
                ru: "Вот держите ещё один журнал.",
                de: "Hier ist noch eine Zeitschrift für Sie."
              },
              tones: ["brief"]
            },
            {
              text: {
                ru: "Теперь вы обязаны начать регулярные занятия!",
                de: "Jetzt müssen Sie unbedingt einen regelmäßigen Kurs beginnen!"
              },
              tones: ["pushy"]
            }
          ]
        }
      ]
    }
  ]
};

const LEVEL_5 = {
  id: 5,
  name: { ru: "Изучение Библии", de: "Bibelstudium" },
  desc: { ru: "Проведение библейских уроков и ответы на вопросы ученика", de: "Durchführen von Bibelkursen und Beantworten von Fragen" },
  themes: [
    {
      id: "5.1",
      question: {
        ru: "Как мне объяснить близким свои новые взгляды на Библию?",
        de: "Wie kann ich meinen Angehörigen meine neuen Erkenntnisse aus der Bibel erklären?"
      },
      steps: [
        {
          prompt: {
            ru: "Моя семья волнуется из-за моих занятий Библией. Как мне поступить?",
            de: "Meine Familie macht sich Sorgen wegen meines Bibelkurses. Was soll ich tun?"
          },
          scripture: "1 Петра 3:15",
          answers: [
            {
              text: {
                ru: "В 1 Петра 3:15 советуется объяснять свою надежду «с кротостью и глубоким уважением». Добрый пример важен не меньше слов.",
                de: "In 1. Petrus 3:15 wird geraten, die Hoffnung „mit Milde und tiefem Respekt“ zu erklären. Ein gutes Beispiel ist genauso wichtig wie Worte."
              },
              tones: ["deep", "tact"]
            },
            {
              text: {
                ru: "Проявляйте любовь и терпение. Показывайте, что Библия помогает вам становиться ещё лучше в семье.",
                de: "Zeigen Sie Liebe und Geduld. Zeigen Sie, dass die Bibel Ihnen hilft, ein noch besserer Familienmensch zu werden."
              },
              tones: ["tact", "respect"]
            },
            {
              text: {
                ru: "Просто дайте им время.",
                de: "Geben Sie ihnen einfach Zeit."
              },
              tones: ["brief"]
            },
            {
              text: {
                ru: "Не слушайте их, они ничего не понимают!",
                de: "Hören Sie nicht auf sie, sie verstehen gar nichts!"
              },
              tones: ["pushy"]
            }
          ]
        }
      ]
    }
  ]
};

const LEVEL_6 = {
  id: 6,
  name: { ru: "Сложные вопросы и возражения", de: "Schwierige Fragen und Einwände" },
  desc: { ru: "Тактичные ответы на глубокие и непростые возражения", de: "Taktvolle Antworten auf schwierige und tiefe Einwände" },
  themes: [
    {
      id: "6.1",
      question: {
        ru: "Почему у вас своя собственная Библия — «Перевод нового мира»?",
        de: "Warum haben Sie Ihre eigene Bibel — die «Neue-Welt-Übersetzung»?"
      },
      steps: [
        {
          prompt: {
            ru: "Я слышал, что вы используете свой собственный перевод Библии. Почему?",
            de: "Ich habe gehört, dass Sie Ihre eigene Bibelübersetzung verwenden. Warum?"
          },
          scripture: "2 Тимофею 3:16",
          answers: [
            {
              text: {
                ru: "Это точный перевод на современный язык, сделанный с древних манускриптов с возвращением имени Бога — Иегова.",
                de: "Es ist eine genaue Übersetzung in moderne Sprache aus den alten Manuskripten, in der der Name Gottes – Jehova – wieder eingesetzt wurde."
              },
              tones: ["fact", "respect"]
            },
            {
              text: {
                ru: "Мы с радостью используем любой перевод Библии при разговоре. Главное — исследовать Слово Бога (2 Тимофею 3:16).",
                de: "Wir nutzen im Gespräch gerne jede Bibelübersetzung. Hauptsache ist, Gottes Wort zu erforschen (2. Timotheus 3:16)."
              },
              tones: ["deep", "respect"]
            },
            {
              text: {
                ru: "Наш перевод просто более понятен.",
                de: "Unsere Übersetzung ist einfach verständlicher."
              },
              tones: ["brief"]
            },
            {
              text: {
                ru: "Все остальные переводы искажены и неправильны!",
                de: "Alle anderen Übersetzungen sind verfälscht und falsch!"
              },
              tones: ["false"]
            }
          ]
        }
      ]
    }
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
