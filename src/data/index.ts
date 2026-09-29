import { CardItem, MainCategory, QuizQuestion, QuizOptionDetail } from '../types';
import { hiraganaData } from './hiraganaData';
import { katakanaData } from './katakanaData';
import { kanjiData, kanjiN5Data } from './kanjiData';
import { vocabData } from './vocabData';
import { phrasesData } from './phrasesData';
import { particlesList, particleComparisons, particlesCardItems } from './particlesData';
import { trapVerbsGodan, verbProfiles, conjugationCardItems } from './conjugationsData';
import { minnaShokyu1Lessons } from './minnaShokyu1';
import { minnaShokyu2Lessons } from './minnaShokyu2';
import { minnaChuukyu1Lessons } from './minnaChuukyu1';
import { tobiraChapters } from './tobiraData';
import { quartetLessons } from './quartetData';
import { shinKanzenData } from './shinKanzenData';
import { souMatomeWeeks } from './souMatomeData';
import { tryJlptLessons } from './tryJlptData';
import { irodoriTopics } from './irodoriData';
import { sswSectors } from './sswData';
import { dokkaiN1Data } from './dokkaiN1Data';
import { choukaiN1Data } from './choukaiN1Data';
import { ruigigoN1Data } from './ruigigoN1Data';
import { getWordClassification } from '../utils/wordClassifier';
import { getHiraganaReading } from '../utils/hiraganaConverter';
import { getWordNuanceInfo } from '../utils/wordNuances';
import { getClarifiedMeaning } from '../utils/meaningClarifier';

/**
 * Fungsi cerdas untuk memastikan kosakata dalam setiap bab Minna no Nihongo
 * terlengkapi secara maksimal tanpa ada duplikasi.
 */
function deduplicateMinnaVocab(rawVocab: typeof minnaShokyu1Lessons[0]['keyVocab']) {
  const result: typeof rawVocab = [];
  const seen = new Map<string, (typeof rawVocab)[0]>();

  for (const item of rawVocab) {
    const normJp = (item.jp || '').replace(/[（\(].*?[）\)]/g, '').replace(/\[.*?\]/g, '').replace(/\s+/g, '');
    const normReading = (item.reading || '').replace(/[（\(].*?[）\)]/g, '').replace(/\[.*?\]/g, '').replace(/\s+/g, '').toLowerCase();
    const key = normReading.length >= 2 ? normReading : normJp;

    if (seen.has(key)) {
      const existing = seen.get(key)!;
      if (!existing.kanji && item.kanji) {
        existing.kanji = item.kanji;
      }
      if (!existing.jp.includes('（') && !existing.jp.includes('(') && (item.jp.includes('（') || item.jp.includes('('))) {
        // Do not overwrite with bare particle notation like （を） or （が）
        if (!/[（\(][をがにでの][\)）]/.test(item.jp)) {
          existing.jp = item.jp;
        }
      }
      if (!existing.jp.includes('[') && item.jp.includes('[')) {
        const bracket = item.jp.match(/\[.*?\]/)?.[0];
        if (bracket) existing.jp = `${existing.jp} ${bracket}`;
      }
      if ((item.id || '').length > (existing.id || '').length && !existing.id.includes('[')) {
        existing.id = item.id;
      }
    } else {
      const clone = { ...item };
      seen.set(key, clone);
      result.push(clone);
    }
  }

  return result;
}

export const allMinnaLessons = [
  ...minnaShokyu1Lessons,
  ...minnaShokyu2Lessons,
  ...minnaChuukyu1Lessons,
].map(lesson => ({
  ...lesson,
  keyVocab: deduplicateMinnaVocab(lesson.keyVocab)
}));

// Convert curriculum items to CardItem format for flashcard/quiz reuse
export const minnaCardItems: CardItem[] = allMinnaLessons.flatMap(lesson =>
  lesson.keyVocab.map((v, idx) => {
    // Clean bare parenthesized particle artifacts like （を）, （が）, （に） for crystal clear display
    const cleanJp = v.jp.replace(/[（\(][をがにでの][\)）]/g, '').trim();
    const cleanReading = v.reading ? v.reading.replace(/\s*[（\(][a-zA-Z\s]*[\)）]/gi, '').trim() : v.reading;

    return {
      id: `minna-${lesson.part.includes('Chuukyuu') ? 'cq1' : 'sh'}-${lesson.chapter}-${idx}`,
      japanese: cleanJp || v.jp,
      reading: cleanReading || v.reading,
      meaningId: v.id,
      category: 'minna' as MainCategory,
      subCategory: lesson.part.includes('Chuukyuu') ? `bab_chuukyu_${lesson.chapter}` : `bab_${lesson.chapter}`,
      level: lesson.level,
      notes: `Bab ${lesson.chapter} (${lesson.part}): ${lesson.title}`
    };
  })
);

export const tobiraCardItems: CardItem[] = tobiraChapters.flatMap(ch =>
  ch.keyVocab.map((v, idx) => ({
    id: `tobira-${ch.chapter}-${idx}`,
    japanese: v.kanji,
    reading: v.reading,
    meaningId: v.id,
    category: 'tobira' as MainCategory,
    subCategory: `tobira_${ch.chapter}`,
    level: ch.level,
    notes: `Tobira ${ch.titleId} [${ch.theme}]`
  }))
);

export const quartetCardItems: CardItem[] = quartetLessons.flatMap(lsn =>
  lsn.grammarPatterns.map((gp, idx) => ({
    id: `quartet-${lsn.volume}-${lsn.lesson}-${idx}`,
    japanese: gp.pattern,
    reading: gp.formula,
    meaningId: gp.explanation,
    category: 'quartet' as MainCategory,
    subCategory: `quartet_v${lsn.volume}_l${lsn.lesson}`,
    level: lsn.level,
    notes: `Quartet Vol ${lsn.volume} ${lsn.titleId}`
  }))
);

export const shinKanzenCardItems: CardItem[] = shinKanzenData.flatMap(sk =>
  sk.patternsOrPoints.map((pt, idx) => ({
    id: `shinkanzen-${sk.id}-${idx}`,
    japanese: pt.title,
    reading: pt.formula || pt.title,
    meaningId: pt.nuance,
    category: 'shinkanzen' as MainCategory,
    subCategory: `shinkanzen_${sk.level}`,
    level: sk.level,
    notes: `Shin Kanzen Master ${sk.level}: ${sk.unitTitleId}`
  }))
);

export const souMatomeCardItems: CardItem[] = souMatomeWeeks.flatMap(w =>
  w.days.flatMap(d =>
    d.targetItems.map((ti, idx) => ({
      id: `soumatome-${w.id}-${d.dayNumber}-${idx}`,
      japanese: ti.japanese,
      reading: ti.reading,
      meaningId: ti.meaningId,
      category: 'soumatome' as MainCategory,
      subCategory: `soumatome_${w.level}_w${w.weekNumber}`,
      level: w.level,
      notes: `Nihongo Sou-matome ${w.level} ${w.weekTitleId} - ${d.dayTitle}`
    }))
  )
);

export const tryJlptCardItems: CardItem[] = tryJlptLessons.flatMap(tl =>
  tl.grammarPoints.map((gp, idx) => ({
    id: `try-${tl.id}-${idx}`,
    japanese: gp.pattern,
    reading: gp.formula,
    meaningId: gp.meaningId,
    category: 'tryjlpt' as MainCategory,
    subCategory: `try_${tl.level}_ch${tl.chapter}`,
    level: tl.level,
    notes: `TRY! JLPT ${tl.level} ${tl.chapterTitleId}`
  }))
);

export const irodoriCardItems: CardItem[] = irodoriTopics.flatMap(topic =>
  topic.keyPhrases.map((p, idx) => ({
    id: `irodori-${topic.id}-${idx}`,
    japanese: p.jp,
    reading: p.reading,
    meaningId: p.id,
    category: 'irodori' as MainCategory,
    subCategory: topic.id,
    level: topic.level,
    notes: `${topic.topic} [Can-do: ${topic.canDo.slice(0, 50)}...]`
  }))
);

export const sswCardItems: CardItem[] = sswSectors.flatMap(sec =>
  sec.vocab.map((v, idx) => ({
    id: `ssw-${sec.sectorId}-${idx}`,
    japanese: v.jp,
    reading: v.reading,
    meaningId: v.id,
    category: 'ssw' as MainCategory,
    subCategory: sec.sectorId,
    level: 'SSW / N4-N3',
    notes: `Bidang SSW: ${sec.name}`
  }))
);

export {
  hiraganaData,
  katakanaData,
  kanjiData,
  kanjiN5Data,
  vocabData,
  phrasesData,
  particlesList,
  particleComparisons,
  particlesCardItems,
  trapVerbsGodan,
  verbProfiles,
  conjugationCardItems,
  minnaShokyu1Lessons,
  minnaShokyu2Lessons,
  minnaChuukyu1Lessons,
  tobiraChapters,
  quartetLessons,
  shinKanzenData,
  souMatomeWeeks,
  tryJlptLessons,
  irodoriTopics,
  sswSectors,
  dokkaiN1Data,
  choukaiN1Data,
  ruigigoN1Data,
};

export function getAllBuiltInCards(): CardItem[] {
  return [
    ...hiraganaData,
    ...katakanaData,
    ...kanjiData,
    ...vocabData,
    ...phrasesData,
    ...particlesCardItems,
    ...conjugationCardItems,
    ...minnaCardItems,
    ...tobiraCardItems,
    ...quartetCardItems,
    ...shinKanzenCardItems,
    ...souMatomeCardItems,
    ...tryJlptCardItems,
    ...irodoriCardItems,
    ...sswCardItems,
  ];
}

export function getCardsByCategory(category: MainCategory, customCards: CardItem[] = []): CardItem[] {
  if (category === 'home') {
    return [];
  }
  if (category === 'custom') {
    return customCards;
  }
  if (category === 'minna') {
    return minnaCardItems;
  }
  if (category === 'tobira') {
    return tobiraCardItems;
  }
  if (category === 'quartet') {
    return quartetCardItems;
  }
  if (category === 'shinkanzen') {
    return shinKanzenCardItems;
  }
  if (category === 'soumatome') {
    return souMatomeCardItems;
  }
  if (category === 'tryjlpt') {
    return tryJlptCardItems;
  }
  if (category === 'irodori') {
    return irodoriCardItems;
  }
  if (category === 'ssw') {
    return sswCardItems;
  }
  const all = getAllBuiltInCards();
  return all.filter(c => c.category === category);
}

// Generate randomized quiz questions
export function generateQuizQuestions(
  pool: CardItem[],
  count: number | 'all' = 'all',
  distractorPool?: CardItem[]
): QuizQuestion[] {
  const fallbackPool =
    distractorPool && distractorPool.length >= 4 ? distractorPool : getAllBuiltInCards();

  let activePool = pool;
  if (!activePool || activePool.length === 0) {
    activePool = fallbackPool;
  }

  // Shuffle pool (Fisher-Yates shuffle)
  const shuffled = [...activePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const targetCount = count === 'all' ? shuffled.length : Math.min(count, shuffled.length);
  const selected = shuffled.slice(0, targetCount);

  return selected.map((item, index) => {
    // Choose question type: meaning (Tebak Arti Indonesia) atau reverse (Tebak Karakter/Bahasa Jepang)
    const types: ('meaning' | 'reverse')[] = ['meaning', 'reverse'];
    const chosenType = types[index % types.length];

    const itemClarified = getClarifiedMeaning(item);
    const itemMeaningDisplay = itemClarified.contextBadge
      ? `${itemClarified.primaryMeaning} [${itemClarified.contextBadge.text}]`
      : itemClarified.primaryMeaning;
    const itemClassification = getWordClassification(item);
    const itemHiragana = getHiraganaReading(item);

    // Pick 3 random distinct distractors from activePool or fallbackPool with NO duplicate meaning, reading, or word
    const candidateSource = activePool.length >= 4 ? activePool : fallbackPool;
    const distractors: CardItem[] = [];
    let attempts = 0;
    while (distractors.length < 3 && attempts < 150 && candidateSource.length > distractors.length + 1) {
      attempts++;
      const randIdx = Math.floor(Math.random() * candidateSource.length);
      const candidate = candidateSource[randIdx];
      if (candidate.id === item.id) continue;
      if (distractors.some(d => d.id === candidate.id)) continue;

      const candClarified = getClarifiedMeaning(candidate);
      const candMeaningDisplay = candClarified.contextBadge
        ? `${candClarified.primaryMeaning} [${candClarified.contextBadge.text}]`
        : candClarified.primaryMeaning;

      // Distractor must not share meaning, reading, or text with item
      if (candMeaningDisplay.toLowerCase() === itemMeaningDisplay.toLowerCase()) continue;
      if (candClarified.primaryMeaning.toLowerCase() === itemClarified.primaryMeaning.toLowerCase()) continue;
      if (candidate.japanese.trim() === item.japanese.trim()) continue;
      if (candidate.reading.trim().toLowerCase() === item.reading.trim().toLowerCase()) continue;

      // Distractor must not collide with other already selected distractors
      const collidesWithDistractors = distractors.some(d => {
        const dClarified = getClarifiedMeaning(d);
        const dMeaning = dClarified.contextBadge
          ? `${dClarified.primaryMeaning} [${dClarified.contextBadge.text}]`
          : dClarified.primaryMeaning;
        return (
          dMeaning.toLowerCase() === candMeaningDisplay.toLowerCase() ||
          dClarified.primaryMeaning.toLowerCase() === candClarified.primaryMeaning.toLowerCase() ||
          d.japanese.trim() === candidate.japanese.trim() ||
          d.reading.trim().toLowerCase() === candidate.reading.trim().toLowerCase()
        );
      });
      if (collidesWithDistractors) continue;

      distractors.push(candidate);
    }

    // Candidates: target item first, followed by distractors
    const allCandidates = [item, ...distractors];

    let questionText = '';
    let subText = '';
    let correctAnswer = '';
    let rawOptionDetails: QuizOptionDetail[] = [];
    let explanation = '';

    const isKana = item.category === 'hiragana' || item.category === 'katakana';

    if (chosenType === 'meaning') {
      // 1. Prompt Japanese, user picks Indonesian meaning (Tebak Arti Indonesia)
      questionText = isKana
        ? `Huruf apakah ini dan bagaimana bunyinya: ${item.japanese}?`
        : `Apa arti dari: ${item.japanese}?`;
      subText = isKana
        ? `[Huruf ${item.category === 'katakana' ? 'Katakana' : 'Hiragana'}]`
        : itemClassification.shortLabel
        ? `[${itemClassification.shortLabel}]`
        : '';
      correctAnswer = itemMeaningDisplay;
      rawOptionDetails = allCandidates.map((c) => {
        const cClarified = getClarifiedMeaning(c);
        const cMeaningDisplay = cClarified.contextBadge
          ? `${cClarified.primaryMeaning} [${cClarified.contextBadge.text}]`
          : cClarified.primaryMeaning;
        return {
          value: cMeaningDisplay,
          label: cMeaningDisplay,
          furigana: getHiraganaReading(c),
          reading: c.reading,
          meaning: cMeaningDisplay,
          wordTypeLabel: getWordClassification(c).shortLabel,
          isCorrect: c.id === item.id,
        };
      });
      explanation = `${item.japanese}【${itemHiragana}】(${item.reading}) [${itemClassification.label}] artinya: "${itemClarified.primaryMeaning}". ${itemClassification.grammarHint}`;
    } else {
      // 2. Prompt Indonesian meaning, user picks Japanese (Tebak Karakter / Kata Jepang)
      questionText = `Pilihlah bahasa Jepang untuk: "${itemMeaningDisplay}"`;
      subText = `Golongan Kata: ${itemClassification.label}`;
      correctAnswer = item.japanese;
      rawOptionDetails = allCandidates.map((c) => ({
        value: c.japanese,
        label: c.japanese,
        furigana: getHiraganaReading(c),
        reading: c.reading,
        meaning: getClarifiedMeaning(c).primaryMeaning,
        wordTypeLabel: getWordClassification(c).shortLabel,
        isCorrect: c.id === item.id,
      }));
      explanation = `"${itemClarified.primaryMeaning}" dalam bahasa Jepang adalah ${item.japanese}【${itemHiragana}】(${item.reading}). [${itemClassification.label}]. ${itemClassification.grammarHint}`;
    }

    // Pembeda Nuansa / Anti-Bingung Tambahan
    if (itemClarified.contrastPair) {
      explanation += ` • 💡 Anti-Bingung: Bedakan dengan ${itemClarified.contrastPair.word} (${itemClarified.contrastPair.reading}) — ${itemClarified.contrastPair.difference}`;
    } else {
      const nuanceInfo = getWordNuanceInfo(item);
      if (nuanceInfo) {
        explanation += ` • 💡 Beda Nuansa: ${nuanceInfo.nuanceExplanation}`;
      } else if (item.mnemonic) {
        explanation += ` • 💡 Tips: ${item.mnemonic}`;
      }
    }

    // Deduplicate and Shuffle options
    const uniqueOptionsMap = new Map<string, QuizOptionDetail>();
    rawOptionDetails.forEach((opt) => {
      if (!uniqueOptionsMap.has(opt.value)) {
        uniqueOptionsMap.set(opt.value, opt);
      }
    });

    const shuffledDetails = Array.from(uniqueOptionsMap.values()).sort(() => Math.random() - 0.5);
    const shuffledOptions = shuffledDetails.map((d) => d.value);

    return {
      id: `quiz-${item.id}-${index}`,
      item,
      type: chosenType,
      questionText,
      subText,
      options: shuffledOptions,
      optionDetails: shuffledDetails,
      correctAnswer,
      explanation,
    };
  });
}
