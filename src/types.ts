export type MainCategory = 
  | 'hiragana'
  | 'katakana'
  | 'kanji'
  | 'vocab'
  | 'phrases'
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
  | 'kanji_kata_kerja'
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
  | 'benda_rumah'
  | 'tubuh_kesehatan'
  | 'transportasi'
  | 'profesi_sekolah'
  | 'alam_hewan'
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
  level?: 'N5' | 'N4' | 'N3' | 'Dasar' | 'Lanjutan';
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
