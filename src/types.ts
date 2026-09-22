export type MainCategory = 
  | 'search'
  | 'kanji'
  | 'vocab'
  | 'phrases'
  | 'dokkai'
  | 'choukai'
  | 'minna'
  | 'tobira'
  | 'quartet'
  | 'shinkanzen'
  | 'soumatome'
  | 'tryjlpt'
  | 'irodori'
  | 'ssw'
  | 'particles'
  | 'conjugation'
  | 'hiragana'
  | 'katakana'
  | 'custom';

export type StudyMode = 
  | 'flashcard'
  | 'chart'
  | 'quiz'
  | 'writing';

export type SubCategory = 
  // Kana
  | 'gojuon' 
  | 'dakuon' 
  | 'yoon'
  // Kanji
  | 'kanji_angka'
  | 'kanji_alam'
  | 'kanji_manusia'
  | 'kanji_waktu'
  | 'kanji_arah'
  | 'kanji_posisi'
  | 'kanji_kata_kerja'
  | 'kanji_aktivitas'
  | 'kanji_sifat'
  | 'kanji_sosial'
  | 'kanji_abstrak'
  | 'kanji_hukum'
  // Vocab
  | 'salam'
  | 'angka_waktu'
  | 'makanan'
  | 'keluarga'
  | 'kata_kerja'
  | 'kata_sifat'
  | 'kata_sifat_na'
  | 'tempat'
  | 'tempat_kerja'
  | 'benda_rumah'
  | 'tubuh_kesehatan'
  | 'kesehatan'
  | 'transportasi'
  | 'profesi_sekolah'
  | 'alam_hewan'
  | 'lingkungan'
  | 'keuangan'
  | 'perasaan'
  | 'keterangan_fukushi'
  // Vocab Lanjutan & Native Nihonjin
  | 'yojijukugo'
  | 'kanyouku'
  | 'kotowaza'
  | 'onomatope'
  | 'bisnis_formal'
  | 'abstrak_akademik'
  | 'fukugou_doushi'
  | 'berita_ekonomi'
  // Phrases
  | 'perkenalan'
  | 'belanja'
  | 'restoran'
  | 'perjalanan'
  | 'darurat'
  | 'tata_bahasa_n5'
  | 'tata_bahasa_n4'
  | 'tata_bahasa_n3'
  | 'fukugou_joshi'
  | 'ruigigo'
  | 'percakapan_harian'
  | 'bisnis_sopan'
  // Particles
  | 'partikel_dasar'
  | 'partikel_arah_tempat'
  | 'partikel_waktu_batas'
  | 'partikel_hubungan'
  | 'partikel_akhir'
  // Conjugation
  | 'konjugasi_kata_kerja'
  | 'konjugasi_kata_sifat'
  // Dokkai & Choukai
  | 'dokkai_editorial'
  | 'dokkai_perbandingan'
  | 'dokkai_informasi'
  | 'choukai_keigo'
  | 'choukai_kyokumen'
  | 'choukai_sokkai'
  // General & dynamic (Bab Minna, Irodori topic, SSW sector)
  | 'all'
  | (string & {});

export interface CardItem {
  id: string;
  category: MainCategory;
  subCategory?: SubCategory;
  japanese: string;        // e.g. "あ" or "水" or "ありがとう"
  kanji?: string;          // If applicable, e.g. "食べる"
  reading: string;        // Hiragana reading or Romaji e.g. "taberu"
  furigana?: string;       // Furigana reading if kanji e.g. "たべる"
  meaningId: string;       // Meaning in Indonesian e.g. "Makan"
  exampleJp?: string;      // Example sentence in Japanese
  exampleId?: string;      // Example sentence translation in Indonesian
  mnemonic?: string;       // Tips menghapal / cara mudah ingat
  onyomi?: string;         // For Kanji
  kunyomi?: string;        // For Kanji
  strokes?: number;        // Stroke count
  level?: 'N5' | 'N4' | 'N3' | 'Dasar' | 'Lanjutan' | 'Starter (A1)' | 'Shokyu 1 (A2)' | 'Shokyu 2 (A2)' | 'SSW / N4-N3';
  notes?: string;
  isCustom?: boolean;
}

export type JlptLevel = 'N5' | 'N4' | 'N3';
export type LevelFilterOption = 'all' | 'N5' | 'N4' | 'N3';

export type MasteryStatus = 'new' | 'learning' | 'mastered';

export interface UserItemProgress {
  id: string;
  status: MasteryStatus;
  lastStudied?: number;
  reviewCount: number;
  correctCount: number;
  isFavorite?: boolean;
}

export interface QuizOptionDetail {
  value: string;
  label: string;
  furigana?: string;
  reading?: string;
  meaning?: string;
  wordTypeLabel?: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  item: CardItem;
  type: 'meaning' | 'reading' | 'audio' | 'reverse';
  questionText: string;
  subText?: string;
  options: string[];
  optionDetails?: QuizOptionDetail[];
  correctAnswer: string;
  explanation: string;
}

export interface UserStats {
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  totalCardsReviewed: number;
  quizCompleted: number;
  masteredCount: number;
}

// Interfaces khusus Partikel Bahasa Jepang
export interface ParticleExample {
  jp: string;
  reading: string;
  id: string;
  highlight: string;
}

export interface ParticleFunction {
  title: string;
  formula: string;
  explanation: string;
  examples: ParticleExample[];
}

export interface ParticleItem {
  id: string;
  particle: string;
  romaji: string;
  nameId: string;
  group: 'inti' | 'tempat_arah' | 'waktu_batas' | 'korelasi_jumlah' | 'akhir_kalimat';
  level: 'N5' | 'N4' | 'N3';
  summary: string;
  functions: ParticleFunction[];
  tips?: string;
  cardItem: CardItem;
}

export interface ParticleComparison {
  id: string;
  pair: string;
  title: string;
  coreDifference: string;
  itemA: {
    symbol: string;
    role: string;
    focus: string;
    exampleJp: string;
    exampleId: string;
    nuance: string;
  };
  itemB: {
    symbol: string;
    role: string;
    focus: string;
    exampleJp: string;
    exampleId: string;
    nuance: string;
  };
  mnemonic: string;
}

// Interfaces khusus Konjugasi (Perubahan Bentuk)
export type VerbGroup = 'godan' | 'ichidan' | 'fukisoku' | 'i_keiyoushi' | 'na_keiyoushi';

export interface ConjugationForm {
  formKey: string;
  formName: string;
  japanese: string;
  reading: string;
  meaningId: string;
  exampleJp: string;
  exampleId: string;
  ruleExplanation?: string;
}

export interface VerbConjugationProfile {
  id: string;
  dictionary: string;
  kanji?: string;
  reading: string;
  group: VerbGroup;
  meaningId: string;
  level: 'N5' | 'N4' | 'N3';
  isException?: boolean;
  exceptionNote?: string;
  forms: ConjugationForm[];
}

// Minna no Nihongo (Bab 1 - 50)
export interface MinnaGrammarPattern {
  id: string;
  pattern: string;
  formula: string;
  explanation: string;
  examples: {
    jp: string;
    reading: string;
    id: string;
  }[];
}

export interface MinnaVocabItem {
  jp: string;
  reading: string;
  id: string;
  type?: string;
  kanji?: string;
}

export interface MinnaDialogueLine {
  speaker: string;
  jp: string;
  reading: string;
  id: string;
}

export interface MinnaLesson {
  chapter: number;
  level: 'N5' | 'N4' | 'N3';
  part: 'Shokyu I (N5)' | 'Shokyu II (N4)' | 'Chuukyuu I (N3)';
  title: string;
  theme: string;
  summary: string;
  grammarPatterns: MinnaGrammarPattern[];
  keyVocab: MinnaVocabItem[];
  dialogue?: {
    title: string;
    lines: MinnaDialogueLine[];
  };
  readingPassage?: {
    titleJp: string;
    titleId: string;
    textJp: string;
    textId: string;
  };
}

// Irodori (Can-do A1 & A2)
export interface IrodoriKeyPhrase {
  jp: string;
  reading: string;
  id: string;
  situation?: string;
}

export interface IrodoriDialogueLine {
  speaker: string;
  jp: string;
  reading: string;
  id: string;
}

export interface IrodoriCanDoItem {
  id: string;
  topic: string;
  lesson: string;
  level: 'Starter (A1)' | 'Shokyu 1 (A2)' | 'Shokyu 2 (A2)';
  canDo: string;
  targetExpression: string;
  keyPhrases: IrodoriKeyPhrase[];
  tips: string;
  dialogue?: IrodoriDialogueLine[];
}

// SSW (Tokutei Ginou 特定技能 12 Bidang)
export interface SSWVocabItem {
  jp: string;
  reading: string;
  id: string;
}

export interface SSWScenarioItem {
  title: string;
  situation: string;
  japanese: string;
  indonesian: string;
}

export interface SSWSectorItem {
  id: string;
  sectorId: string;
  name: string;
  kanji: string;
  english: string;
  summary: string;
  coreSkills: string[];
  safetyProtocol: string;
  vocab: SSWVocabItem[];
  scenarios?: SSWScenarioItem[];
}

// Dokkai (Membaca Analitis N1 読解)
export interface DokkaiQuestion {
  id: string;
  questionJp: string;
  questionId: string;
  options: {
    label: string;
    textJp: string;
    textId: string;
  }[];
  correctOption: string;
  explanationJp: string;
  explanationId: string;
  authorMindsetAnalysis: string; // Analisis cara berpikir penulis
}

export interface DokkaiItem {
  id: string;
  type: 'editorial' | 'hikaku' | 'jouhou';
  titleJp: string;
  titleId: string;
  theme: string;
  recommendedTimeMinutes: number;
  authorA?: {
    name: string;
    role: string;
    textJp: string;
    textId: string;
  };
  authorB?: {
    name: string;
    role: string;
    textJp: string;
    textId: string;
  };
  passageJp: string;
  passageId: string;
  paragraphs?: {
    jp: string;
    id: string;
  }[];
  keyVocab: {
    kanji: string;
    reading: string;
    meaningId: string;
  }[];
  questions: DokkaiQuestion[];
  readingStrategy: string;
}

// Choukai (Menyimak Nuansa & Keigo Bisnis N1 聴解)
export interface ChoukaiQuestion {
  id: string;
  questionJp: string;
  questionId: string;
  options: {
    label: string;
    textJp: string;
    textId: string;
  }[];
  correctOption: string;
  explanationId: string;
  kyokumenDistractionAnalysis?: string; // Analisis distraksi / u-turn
}

export interface ChoukaiItem {
  id: string;
  type: 'keigo_bisnis' | 'kyokumen_tenkan' | 'sokkai_outou';
  titleJp: string;
  titleId: string;
  situation: string;
  speakerRole: string;
  audioDialogue: {
    speaker: string;
    role?: string;
    jp: string;
    reading: string;
    id: string;
    isKeyDecisionTurn?: boolean; // Poin penentu u-turn keputusan
  }[];
  keigoBreakdown?: {
    term: string;
    type: 'Sonkeigo' | 'Kenjougo' | 'Teineigo' | 'Bikago';
    plainEquivalent: string;
    usageNote: string;
  }[];
  questions: ChoukaiQuestion[];
  listeningStrategy: string;
}

// Ruigigo (Perbandingan Nuansa Tipis Tata Bahasa N1 類義語)
export interface RuigigoItem {
  id: string;
  coreMeaning: string;
  patterns: {
    pattern: string;
    nuance: string;
    formality: 'Sangat Formal / Tertulis' | 'Formal Bisnis' | 'Lisan Emosional' | 'Sastra Klasik';
    constraints: string;
    exampleJp: string;
    exampleId: string;
  }[];
  distinctionSummary: string;
}

// ----------------------------------------------------
// TOBIRA: Gateway to Advanced Japanese (上級へのとびら)
// ----------------------------------------------------
export interface TobiraChapter {
  chapter: number;
  level: 'N3';
  titleJp: string;
  titleRomaji: string;
  titleId: string;
  theme: string;
  culturalNote: {
    title: string;
    content: string;
    icon?: string;
  };
  readingPassage: {
    titleJp: string;
    reading: string;
    titleId: string;
    contentJp: string;
    contentReading: string;
    contentId: string;
  };
  grammarPatterns: {
    id: string;
    pattern: string;
    formula: string;
    explanation: string;
    nuanceNote?: string;
    examples: {
      jp: string;
      reading: string;
      id: string;
    }[];
  }[];
  keyVocab: {
    kanji: string;
    reading: string;
    id: string;
    type?: string;
  }[];
  dialogue?: {
    title: string;
    lines: {
      speaker: string;
      jp: string;
      reading: string;
      id: string;
    }[];
  };
}

// ----------------------------------------------------
// QUARTET: Intermediate Japanese Across the 4 Skills (QUARTET Ⅰ・Ⅱ)
// ----------------------------------------------------
export interface QuartetLesson {
  volume: 1;
  lesson: number;
  level: 'N3';
  titleJp: string;
  titleRomaji: string;
  titleId: string;
  theme: string;
  readingSkill: {
    title: string;
    passageJp: string;
    passageReading: string;
    passageId: string;
    strategyTip: string;
  };
  writingSkill: {
    taskName: string;
    prompt: string;
    modelEssayJp: string;
    modelEssayReading: string;
    modelEssayId: string;
    usefulConnectors: string[];
  };
  speakingSkill: {
    situation: string;
    goal: string;
    dialogue: {
      speaker: string;
      jp: string;
      reading: string;
      id: string;
    }[];
    keyExpressions: string[];
  };
  listeningSkill: {
    situation: string;
    scriptJp: string;
    scriptReading: string;
    scriptId: string;
    comprehensionCheck: string;
    correctAnswer: string;
  };
  grammarPatterns: {
    id: string;
    pattern: string;
    formula: string;
    explanation: string;
    examples: {
      jp: string;
      reading: string;
      id: string;
    }[];
  }[];
}

// ----------------------------------------------------
// SHIN KANZEN MASTER (新完全マスター N3)
// ----------------------------------------------------
export interface ShinKanzenItem {
  id: string;
  level: 'N3';
  section: 'bunpou' | 'dokkai' | 'choukai' | 'goi' | 'kanji';
  unitTitleJp: string;
  unitTitleId: string;
  focusCore: string;
  explanation: string;
  patternsOrPoints: {
    title: string;
    formula?: string;
    nuance: string;
    trapWarning?: string;
    examples: {
      jp: string;
      reading: string;
      id: string;
    }[];
  }[];
  confusingPairsComparison?: {
    patternA: string;
    patternB: string;
    difference: string;
    exampleA: string;
    exampleB: string;
  };
  masteryDrill: {
    questionJp: string;
    options: string[];
    correctIndex: number;
    analysisId: string;
  }[];
}

// ----------------------------------------------------
// NIHONGO SOU-MATOME (日本語総まとめ N3)
// ----------------------------------------------------
export interface SouMatomeDayPlan {
  dayNumber: number; // 1 to 7
  dayTitle: string;
  themeJp: string;
  themeId: string;
  targetItems: {
    japanese: string;
    reading: string;
    meaningId: string;
    collocationOrUsage?: string;
    sampleSentenceJp?: string;
    sampleSentenceId?: string;
  }[];
  dailyMiniTest?: {
    questionJp: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export interface SouMatomeWeek {
  id: string;
  level: 'N3';
  subject: 'kanji' | 'goi' | 'bunpou' | 'dokkai' | 'choukai';
  weekNumber: number;
  weekTitleJp: string;
  weekTitleId: string;
  days: SouMatomeDayPlan[];
}

// ----------------------------------------------------
// TRY! NIHONGO NOURYOKU SHIKEN (TRY! 日本語能力試験 N3)
// ----------------------------------------------------
export interface TryJlptLesson {
  id: string;
  level: 'N3';
  chapter: number;
  chapterTitleJp: string;
  chapterTitleId: string;
  storyScenario: {
    setting: string;
    passageJp: string;
    passageReading: string;
    passageId: string;
  };
  canDoGoal: string;
  grammarPoints: {
    number: number;
    pattern: string;
    formula: string;
    meaningId: string;
    explanation: string;
    examples: {
      jp: string;
      reading: string;
      id: string;
    }[];
  }[];
  tryExamDrill: {
    questionJp: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}


