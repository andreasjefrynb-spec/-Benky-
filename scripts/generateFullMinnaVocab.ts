import fs from 'fs';
import path from 'path';
import { minnaShokyu1Lessons } from '../src/data/minnaShokyu1';
import { minnaShokyu2Lessons } from '../src/data/minnaShokyu2';
import { hiraganaToRomaji, katakanaToHiragana } from '../src/utils/hiraganaConverter';
import { MinnaVocabItem } from '../src/types';

const ocrFiles = [
  'raw_ocr_1_5.txt',
  'raw_ocr_6_15.txt',
  'raw_ocr_16_25.txt',
  'raw_ocr_26_35.txt',
  'raw_ocr_36_50.txt'
];

function isJapanese(text: string): boolean {
  return /[\u3040-\u30ff\u4e00-\u9faf]/.test(text);
}

function cleanRomaji(kana: string): string {
  let clean = kana.replace(/[（\(].*?[\)）]/g, '').trim();
  const startsWithTilde = clean.startsWith('～') || clean.startsWith('~');
  clean = clean.replace(/^[～~]/, '');
  const hira = katakanaToHiragana(clean);
  const romaji = hiraganaToRomaji(hira);
  return (startsWithTilde ? '~' : '') + romaji;
}

// Map each BAB number to its vocab items
const babVocabMap: Record<number, MinnaVocabItem[]> = {};

for (const f of ocrFiles) {
  const filePath = path.join(process.cwd(), 'scripts', 'ocr_data', f);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');

  let currentBab = 0;

  for (let rawLine of lines) {
    const line = rawLine.trim();
    if (!line) continue;

    const babMatch = line.match(/^BAB\s+(\d+)/i);
    if (babMatch) {
      currentBab = parseInt(babMatch[1], 10);
      if (!babVocabMap[currentBab]) {
        babVocabMap[currentBab] = [];
      }
      continue;
    }

    const itemMatch = line.match(/^(\d+)\s+(.+)$/);
    if (!itemMatch || currentBab === 0) continue;

    const num = parseInt(itemMatch[1], 10);
    const rest = itemMatch[2].trim();
    const tokens = rest.split(/\s+/);

    let kana = tokens[0];
    let idx = 1;

    // Check if token[1] is a particle like （に） or （を）
    if (idx < tokens.length && /^[（\(][をがにでのへな][\)）]$/.test(tokens[idx])) {
      kana += ' ' + tokens[idx];
      idx += 1;
    }

    let kanji: string | undefined = undefined;
    if (idx < tokens.length && isJapanese(tokens[idx])) {
      kanji = tokens[idx];
      idx += 1;
      if (idx < tokens.length && /^[（\(][をがにでのへな][\)）]$/.test(tokens[idx])) {
        kanji += ' ' + tokens[idx];
        idx += 1;
      }
    }

    const indonesian = tokens.slice(idx).join(' ').trim();
    const reading = cleanRomaji(kana);
    const jpDisplay = kanji ? `${kana} (${kanji})` : kana;

    babVocabMap[currentBab].push({
      jp: jpDisplay,
      reading,
      id: indonesian,
      kanji: kanji || undefined
    });
  }
}

console.log('Parsed BAB vocabulary totals:');
for (let b = 1; b <= 50; b++) {
  console.log(`Bab ${b}: ${babVocabMap[b]?.length || 0} items`);
}

// Update minnaShokyu1Lessons (Bab 1 to 25)
const updatedShokyu1 = minnaShokyu1Lessons.map(lesson => {
  const newVocab = babVocabMap[lesson.chapter] || lesson.keyVocab;
  return {
    ...lesson,
    keyVocab: newVocab
  };
});

// Update minnaShokyu2Lessons (Bab 26 to 50)
const updatedShokyu2 = minnaShokyu2Lessons.map(lesson => {
  const newVocab = babVocabMap[lesson.chapter] || lesson.keyVocab;
  return {
    ...lesson,
    keyVocab: newVocab
  };
});

// Write to files
const shokyu1Path = path.join(process.cwd(), 'src', 'data', 'minnaShokyu1.ts');
const shokyu2Path = path.join(process.cwd(), 'src', 'data', 'minnaShokyu2.ts');

fs.writeFileSync(
  shokyu1Path,
  `import { MinnaLesson } from '../types';\n\nexport const minnaShokyu1Lessons: MinnaLesson[] = ${JSON.stringify(updatedShokyu1, null, 2)};\n`
);
console.log('Successfully written minnaShokyu1.ts');

fs.writeFileSync(
  shokyu2Path,
  `import { MinnaLesson } from '../types';\n\nexport const minnaShokyu2Lessons: MinnaLesson[] = ${JSON.stringify(updatedShokyu2, null, 2)};\n`
);
console.log('Successfully written minnaShokyu2.ts');
