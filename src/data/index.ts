import { CardItem, MainCategory, QuizQuestion } from '../types';
import { hiraganaData } from './hiraganaData';
import { katakanaData } from './katakanaData';
import { kanjiData, kanjiN5Data } from './kanjiData';
import { vocabData } from './vocabData';
import { phrasesData } from './phrasesData';

export { hiraganaData, katakanaData, kanjiData, kanjiN5Data, vocabData, phrasesData };

export function getAllBuiltInCards(): CardItem[] {
  return [
    ...hiraganaData,
    ...katakanaData,
    ...kanjiData,
    ...vocabData,
    ...phrasesData,
  ];
}

export function getCardsByCategory(category: MainCategory, customCards: CardItem[] = []): CardItem[] {
  if (category === 'custom') {
    return customCards;
  }
  const all = getAllBuiltInCards();
  return all.filter(c => c.category === category);
}

// Generate randomized quiz questions
export function generateQuizQuestions(
  pool: CardItem[],
  count: number | 'all' = 'all'
): QuizQuestion[] {
  if (!pool || pool.length < 4) {
    // If not enough cards in filtered pool, borrow from all built-in cards
    pool = getAllBuiltInCards();
  }

  // Shuffle pool (Fisher-Yates shuffle)
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const targetCount = count === 'all' ? shuffled.length : Math.min(count, shuffled.length);
  const selected = shuffled.slice(0, targetCount);

  return selected.map((item, index) => {
    // Choose question type: meaning, reading, reverse, or audio
    const types: ('meaning' | 'reading' | 'reverse' | 'audio')[] = ['meaning', 'reading', 'reverse', 'audio'];
    const chosenType = types[index % types.length];

    // Pick 3 random distinct distractors from pool quickly (O(1))
    const distractors: CardItem[] = [];
    let attempts = 0;
    while (distractors.length < 3 && attempts < 30 && distractors.length < pool.length - 1) {
      attempts++;
      const randIdx = Math.floor(Math.random() * pool.length);
      const candidate = pool[randIdx];
      if (candidate.id !== item.id && !distractors.some(d => d.id === candidate.id)) {
        distractors.push(candidate);
      }
    }

    let questionText = '';
    let subText = '';
    let correctAnswer = '';
    let options: string[] = [];
    let explanation = '';

    if (chosenType === 'meaning') {
      // Prompt Japanese, user picks Indonesian meaning
      questionText = `Apa arti dari: ${item.japanese}?`;
      subText = item.reading ? `(${item.reading})` : '';
      correctAnswer = item.meaningId;
      options = [
        item.meaningId,
        ...distractors.map(o => o.meaningId),
      ];
      explanation = `${item.japanese} (${item.reading}) artinya: ${item.meaningId}.`;
    } else if (chosenType === 'reading') {
      // Prompt Japanese/Kanji, user picks Romaji/reading
      questionText = `Bagaimana cara membaca: ${item.japanese}?`;
      subText = `Arti: ${item.meaningId}`;
      correctAnswer = item.reading;
      options = [
        item.reading,
        ...distractors.map(o => o.reading),
      ];
      explanation = `Bacaan dari ${item.japanese} adalah "${item.reading}".`;
    } else if (chosenType === 'reverse') {
      // Prompt Indonesian meaning, user picks Japanese
      questionText = `Pilihlah bahasa Jepang untuk: "${item.meaningId}"`;
      correctAnswer = item.japanese;
      options = [
        item.japanese,
        ...distractors.map(o => o.japanese),
      ];
      explanation = `"${item.meaningId}" dalam bahasa Jepang adalah ${item.japanese} (${item.reading}).`;
    } else {
      // Audio quiz: prompt audio listening
      questionText = `Dengarkan pelafalan audionya, karakter atau kata apakah itu?`;
      subText = `Klik tombol suara untuk mendengar ulang`;
      correctAnswer = `${item.japanese} (${item.reading})`;
      options = [
        `${item.japanese} (${item.reading})`,
        ...distractors.map(o => `${o.japanese} (${o.reading})`),
      ];
      explanation = `Audio tersebut melafalkan ${item.japanese} [${item.reading}] yang artinya "${item.meaningId}".`;
    }

    // Shuffle options
    const shuffledOptions = Array.from(new Set(options)).sort(() => Math.random() - 0.5);

    return {
      id: `quiz-${item.id}-${index}`,
      item,
      type: chosenType,
      questionText,
      subText,
      options: shuffledOptions,
      correctAnswer,
      explanation,
    };
  });
}
