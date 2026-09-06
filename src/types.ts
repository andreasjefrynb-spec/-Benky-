export type MainCategory = 
  | 'kanji'
  | 'vocab'
  | 'phrases'
  | 'minna'
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
  // Vocab
  | 'salam'
  | 'angka_waktu'
  | 'makanan'
  | 'keluarga'
  | 'kata_kerja'
  | 'kata_sifat'
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
  // Phrases
  | 'perkenalan'
  | 'belanja'
  | 'restoran'
  | 'perjalanan'
  | 'darurat'
  | 'tata_bahasa_n5'
  | 'tata_bahasa_n4'
  | 'tata_bahasa_n3'
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
  // General
  | 'all';

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
  isCustom?: boolean;
}

export type MasteryStatus = 'new' | 'learning' | 'mastered';

export interface UserItemProgress {
  id: string;
  status: MasteryStatus;
  lastStudied?: number;
  reviewCount: number;
  correctCount: number;
  isFavorite?: boolean;
}

export interface QuizQuestion {
  id: string;
  item: CardItem;
  type: 'meaning' | 'reading' | 'audio' | 'reverse';
  questionText: string;
  subText?: string;
  options: string[];
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
  level: 'N5' | 'N4';
  part: 'Shokyu I (N5)' | 'Shokyu II (N4)';
  title: string;
  theme: string;
  summary: string;
  grammarPatterns: MinnaGrammarPattern[];
  keyVocab: MinnaVocabItem[];
  dialogue?: {
    title: string;
    lines: MinnaDialogueLine[];
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


