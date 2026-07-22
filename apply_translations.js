const fs = require('fs');
const content = fs.readFileSync('content.js', 'utf8');

// We'll evaluate the code, modify the objects, and write it back.
let m = {};
eval('(function(){ var module = {}; ' + content + ';\n m.TONES = TONES; m.SCRIPTURES = SCRIPTURES; m.PERSONALITIES = PERSONALITIES; m.CONFLICT_STEPS = CONFLICT_STEPS; m.LEVEL_1 = LEVEL_1; m.LEVEL_2 = LEVEL_2; m.LEVEL_3 = LEVEL_3; m.LEVEL_4 = LEVEL_4; m.LEVEL_5 = LEVEL_5; m.LEVEL_6 = LEVEL_6; })()');

function tr(str) {
  if (typeof str !== 'string') return str;
  // Just a mock translation if actual is not provided.
  return { ru: str, de: str + ' (DE)' };
}

function trKeywords(arr) {
  if (!Array.isArray(arr)) return arr;
  return { ru: arr, de: arr.map(k => k + ' (DE)') };
}

// TONES
for(let k in m.TONES) {
  m.TONES[k] = tr(m.TONES[k]);
}
// SCRIPTURES
for(let k in m.SCRIPTURES) {
  m.SCRIPTURES[k].ref = tr(m.SCRIPTURES[k].ref);
  m.SCRIPTURES[k].text = tr(m.SCRIPTURES[k].text);
  m.SCRIPTURES[k].keywords = trKeywords(m.SCRIPTURES[k].keywords);
}
// PERSONALITIES
for(let k in m.PERSONALITIES) {
  m.PERSONALITIES[k].name = tr(m.PERSONALITIES[k].name);
  m.PERSONALITIES[k].trait = tr(m.PERSONALITIES[k].trait);
  m.PERSONALITIES[k].tip = tr(m.PERSONALITIES[k].tip);
}
// CONFLICT_STEPS
for(let k in m.CONFLICT_STEPS) {
  m.CONFLICT_STEPS[k].prompt = tr(m.CONFLICT_STEPS[k].prompt);
  m.CONFLICT_STEPS[k].answers.forEach(a => {
    a.text = tr(a.text);
  });
}
// LEVELS
[m.LEVEL_1, m.LEVEL_2, m.LEVEL_3, m.LEVEL_4, m.LEVEL_5, m.LEVEL_6].forEach(L => {
  if(!L) return;
  if(typeof L.name === 'string') L.name = tr(L.name);
  if(typeof L.desc === 'string') L.desc = tr(L.desc);
  L.themes.forEach(th => {
    if(th.question) th.question = tr(th.question);
    if(th.answers) {
      th.answers.forEach(a => a.text = tr(a.text));
    }
    if(th.steps) {
      th.steps.forEach(s => {
        if(s.prompt) s.prompt = tr(s.prompt);
        if(s.answers) s.answers.forEach(a => a.text = tr(a.text));
      });
    }
  });
});

const output = `"use strict";

const TONES = ${JSON.stringify(m.TONES, null, 2)};

const SCRIPTURES = ${JSON.stringify(m.SCRIPTURES, null, 2)};

const PERSONALITIES = ${JSON.stringify(m.PERSONALITIES, null, 2)};

const CONFLICT_STEPS = ${JSON.stringify(m.CONFLICT_STEPS, null, 2)};

const LEVEL_1 = ${JSON.stringify(m.LEVEL_1, null, 2)};

const LEVEL_2 = ${JSON.stringify(m.LEVEL_2, null, 2)};

const LEVEL_3 = ${JSON.stringify(m.LEVEL_3, null, 2)};

const LEVEL_4 = ${JSON.stringify(m.LEVEL_4, null, 2)};

const LEVEL_5 = ${JSON.stringify(m.LEVEL_5, null, 2)};

const LEVEL_6 = ${JSON.stringify(m.LEVEL_6, null, 2)};

const LEVELS = [LEVEL_1, LEVEL_2, LEVEL_3, LEVEL_4, LEVEL_5, LEVEL_6];
`;

fs.writeFileSync('content.js', output);
