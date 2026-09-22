import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Lightbulb,
  Sparkles,
  BookOpen,
  Search,
  X,
  PenTool,
  LayoutGrid,
  ListFilter,
} from 'lucide-react';
import { CardItem, UserItemProgress, SubCategory, LevelFilterOption } from '../types';
import { soundManager } from '../utils/audio';
import { KanjiStrokeOrderViewer } from './KanjiStrokeOrderViewer';
import { WordConjugationModal } from './WordConjugationModal';
import { getWordClassification } from '../utils/wordClassifier';
import { getWordNuanceInfo } from '../utils/wordNuances';
import { getClarifiedMeaning } from '../utils/meaningClarifier';

interface FlashcardViewProps {
  cards: CardItem[];
  progress: Record<string, UserItemProgress>;
  onUpdateProgress: (id: string, status: 'new' | 'learning' | 'mastered') => void;
  onToggleFavorite?: (id: string) => void;
  onPracticeWriting?: (card: CardItem) => void;
  speechRate: number;
  initialSubCategory?: string;
  initialLevel?: LevelFilterOption;
  initialCardId?: string;
}

export const FlashcardView: React.FC<FlashcardViewProps> = ({
  cards,
  progress,
  speechRate,
  onPracticeWriting,
  initialSubCategory = 'all',
  initialLevel = 'all',
  initialCardId,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>(initialSubCategory);
  const [minnaGroupFilter, setMinnaGroupFilter] = useState<'all' | 'minna1' | 'minna2'>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilterOption>(initialLevel);
  const [searchQuery, setSearchQuery] = useState('');
  const [shuffledCards, setShuffledCards] = useState<CardItem[]>(cards);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [strokeModalCard, setStrokeModalCard] = useState<CardItem | null>(null);
  const [conjugationModalCard, setConjugationModalCard] = useState<CardItem | null>(null);
  const [isFilterExpandedOnMobile, setIsFilterExpandedOnMobile] = useState(false);
  const [isWrapSubCats, setIsWrapSubCats] = useState(false);
  const subCatScrollRef = useRef<HTMLDivElement | null>(null);

  const scrollSubCats = (direction: 'left' | 'right') => {
    if (subCatScrollRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      subCatScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Subscribe to audio playback state for visual feedback
  useEffect(() => {
    return soundManager.onPlaybackChange((playing) => {
      setIsPlayingAudio(playing);
    });
  }, []);

  const handleSpeakCurrentCard = useCallback((card: CardItem | null) => {
    if (!card) return;
    // Speak kanji or japanese text with explicit reading/furigana
    const textToSpeak = card.kanji || card.japanese || card.furigana;
    const reading = card.furigana || card.reading;
    soundManager.speakJapanese(textToSpeak, speechRate, undefined, reading);
  }, [speechRate]);

  // Unique subcategories in available cards
  const availableSubCats = Array.from(
    new Set(cards.map((c) => c.subCategory).filter(Boolean))
  ) as SubCategory[];

  const hasMinnaShokyuChapters = availableSubCats.some((sub) => {
    if (sub.startsWith('bab_') && !sub.startsWith('bab_chuukyu_')) {
      const num = parseInt(sub.replace('bab_', ''), 10);
      return num >= 1 && num <= 50;
    }
    return false;
  });

  const displayedSubCats = availableSubCats.filter((sub) => {
    if (minnaGroupFilter === 'all') return true;
    if (sub.startsWith('bab_') && !sub.startsWith('bab_chuukyu_')) {
      const num = parseInt(sub.replace('bab_', ''), 10);
      if (minnaGroupFilter === 'minna1') {
        return num >= 1 && num <= 25;
      }
      if (minnaGroupFilter === 'minna2') {
        return num >= 26 && num <= 50;
      }
    }
    return false;
  });

  const groupCardsCount = hasMinnaShokyuChapters && minnaGroupFilter !== 'all'
    ? cards.filter((card) => {
        if (card.subCategory && card.subCategory.startsWith('bab_') && !card.subCategory.startsWith('bab_chuukyu_')) {
          const num = parseInt(card.subCategory.replace('bab_', ''), 10);
          if (minnaGroupFilter === 'minna1') return num >= 1 && num <= 25;
          if (minnaGroupFilter === 'minna2') return num >= 26 && num <= 50;
        }
        return false;
      }).length
    : cards.length;

  // Keep selectedSubCategory in bounds of minnaGroupFilter
  useEffect(() => {
    if (!hasMinnaShokyuChapters || selectedSubCategory === 'all') return;
    
    if (selectedSubCategory.startsWith('bab_') && !selectedSubCategory.startsWith('bab_chuukyu_')) {
      const num = parseInt(selectedSubCategory.replace('bab_', ''), 10);
      if (minnaGroupFilter === 'minna1' && (num < 1 || num > 25)) {
        setSelectedSubCategory('all');
        setCurrentIndex(0);
      } else if (minnaGroupFilter === 'minna2' && (num < 26 || num > 50)) {
        setSelectedSubCategory('all');
        setCurrentIndex(0);
      }
    } else if (minnaGroupFilter !== 'all') {
      setSelectedSubCategory('all');
      setCurrentIndex(0);
    }
  }, [minnaGroupFilter, selectedSubCategory, hasMinnaShokyuChapters]);

  // Check if current cards collection has level tags (e.g. N5 / N4 / N3 / Native)
  const hasLevelTags = cards.some(
    (c) => c.level === 'N5' || c.level === 'N4' || c.level === 'N3' || c.level === 'Native'
  );

  // Filter cards based on subcategory, level, and search query
  const filteredCards = shuffledCards.filter((card) => {
    // Minna Group Check
    if (hasMinnaShokyuChapters && minnaGroupFilter !== 'all') {
      if (card.subCategory && card.subCategory.startsWith('bab_') && !card.subCategory.startsWith('bab_chuukyu_')) {
        const num = parseInt(card.subCategory.replace('bab_', ''), 10);
        if (minnaGroupFilter === 'minna1' && (num < 1 || num > 25)) {
          return false;
        }
        if (minnaGroupFilter === 'minna2' && (num < 26 || num > 50)) {
          return false;
        }
      } else {
        return false;
      }
    }

    // Subcategory check
    if (selectedSubCategory !== 'all' && card.subCategory !== selectedSubCategory) {
      return false;
    }

    // Level check
    if (levelFilter !== 'all' && card.level && card.level !== levelFilter) {
      return false;
    }

    // Search query check
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchJp = card.japanese?.toLowerCase().includes(q);
      const matchKanji = card.kanji?.toLowerCase().includes(q);
      const matchReading = card.reading?.toLowerCase().includes(q);
      const matchFurigana = card.furigana?.toLowerCase().includes(q);
      const matchMeaning = card.meaningId?.toLowerCase().includes(q);
      const clarified = getClarifiedMeaning(card);
      const matchClarified =
        clarified.primaryMeaning.toLowerCase().includes(q) ||
        (clarified.contextBadge && clarified.contextBadge.text.toLowerCase().includes(q)) ||
        (clarified.secondaryMeanings && clarified.secondaryMeanings.some((m) => m.toLowerCase().includes(q)));

      if (!matchJp && !matchKanji && !matchReading && !matchFurigana && !matchMeaning && !matchClarified) {
        return false;
      }
    }

    return true;
  });

  // Keep cards in sync and jump to initialCardId if provided
  useEffect(() => {
    setShuffledCards(cards);
    setIsFlipped(false);
    
    if (initialCardId) {
      const indexInCards = cards.findIndex(c => c.id === initialCardId);
      if (indexInCards !== -1) {
        // Find index of matching card using subcategory and level filters
        const matchIdx = cards.filter(c => {
          if (selectedSubCategory !== 'all' && c.subCategory !== selectedSubCategory) return false;
          if (levelFilter !== 'all' && c.level && c.level !== levelFilter) return false;
          return true;
        }).findIndex(c => c.id === initialCardId);

        if (matchIdx !== -1) {
          setCurrentIndex(matchIdx);
          return;
        }
      }
    }
    setCurrentIndex(0);
  }, [cards, initialCardId]);

  // Adjust current index if it exceeds filtered length
  useEffect(() => {
    if (currentIndex >= filteredCards.length && filteredCards.length > 0) {
      setCurrentIndex(0);
    }
    setIsFlipped(false);
  }, [filteredCards.length, currentIndex]);

  const currentCard = filteredCards[currentIndex] || null;
  const currentProg = currentCard ? progress[currentCard.id] : null;
  const isMastered = currentProg?.status === 'mastered';

  const handleFlip = useCallback(() => {
    soundManager.playFlipSound();
    setIsFlipped((prev) => !prev);
  }, []);

  const handlePrev = useCallback(() => {
    if (filteredCards.length <= 1) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredCards.length - 1));
  }, [filteredCards.length]);

  const handleNext = useCallback(() => {
    if (filteredCards.length <= 1) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev < filteredCards.length - 1 ? prev + 1 : 0));
  }, [filteredCards.length]);

  const handleShuffle = () => {
    setIsFlipped(false);
    const shuffled = [...shuffledCards].sort(() => Math.random() - 0.5);
    setShuffledCards(shuffled);
    setCurrentIndex(0);
  };

  // Touch swipe support for mobile (HP)
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const isDragOrSwipeRef = useRef<boolean>(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
    isDragOrSwipeRef.current = false;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    // If there was any noticeable drag or scroll movement (> 12px), prevent card click flip
    if (Math.abs(diffX) > 12 || Math.abs(diffY) > 12) {
      isDragOrSwipeRef.current = true;
    }

    // Detect intentional horizontal swipe (> 45px threshold and horizontal > vertical)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 45) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleCardClick = () => {
    if (isDragOrSwipeRef.current) {
      isDragOrSwipeRef.current = false;
      return;
    }
    handleFlip();
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        handleFlip();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleFlip, handleNext, handlePrev]);

  const formatSubCatLabel = (sub: string) => {
    switch (sub) {
      case 'gojuon': return 'Gojūon (Dasar)';
      case 'dakuon': return 'Dakuon (Tenten/Maru)';
      case 'yoon': return 'Yōon (Gabungan)';
      case 'kanji_angka': return 'Kanji Angka';
      case 'kanji_alam': return 'Kanji Alam & Cuaca';
      case 'kanji_manusia': return 'Kanji Manusia & Tubuh';
      case 'kanji_waktu': return 'Kanji Waktu & Hari';
      case 'kanji_arah': return 'Kanji Arah & Posisi';
      case 'kanji_kata_kerja': return 'Kanji Kata Kerja';
      case 'kanji_sifat': return 'Kanji Kata Sifat';
      case 'kanji_sosial': return 'Kanji Sosial & Tempat';
      case 'salam': return 'Salam & Sapaan';
      case 'kata_kerja': return 'Kata Kerja (動詞)';
      case 'kata_sifat': return 'Kata Sifat (形容詞)';
      case 'makanan': return 'Makanan & Minuman';
      case 'keluarga': return 'Keluarga & Relasi';
      case 'angka_waktu': return 'Waktu & Bilangan';
      case 'tempat': return 'Tempat & Arah';
      case 'benda_rumah': return 'Benda & Sehari-hari';
      case 'tubuh_kesehatan': return 'Tubuh & Medis';
      case 'transportasi': return 'Transportasi';
      case 'profesi_sekolah': return 'Sekolah, Karir & Hobi';
      case 'alam_hewan': return 'Alam, Cuaca & Hewan';
      case 'keterangan_fukushi': return 'Kata Keterangan (副詞)';
      case 'yojijukugo': return 'Yojijukugo (四字熟語)';
      case 'kanyouku': return 'Kanyouku (慣用句)';
      case 'kotowaza': return 'Kotowaza (ことわざ・諺)';
      case 'onomatope': return 'Onomatope & Gitaigo (擬態語)';
      case 'bisnis_formal': return 'Bisnis & Etiket Formal';
      case 'abstrak_akademik': return 'Abstrak & Opini Kritis';
      case 'perkenalan': return 'Perkenalan Diri';
      case 'restoran': return 'Restoran & Makan';
      case 'belanja': return 'Belanja & Transaksi';
      case 'perjalanan': return 'Wisata & Transportasi';
      case 'darurat': return 'Darurat & Medis';
      case 'tata_bahasa_n5': return 'Pola Tata Bahasa N5';
      case 'tata_bahasa_n4': return 'Pola Tata Bahasa N4';
      case 'tata_bahasa_n3': return 'Pola Tata Bahasa N3';
      case 'percakapan_harian': return 'Percakapan Sehari-hari';
      case 'bisnis_sopan': return 'Etiket Kerja & Bisnis';
      default: {
        if (sub.startsWith('bab_chuukyu_')) {
          return `Chuukyu Bab ${sub.replace('bab_chuukyu_', '')}`;
        }
        if (sub.startsWith('bab_')) {
          const num = parseInt(sub.replace('bab_', ''), 10);
          return num > 50 ? `Chuukyu Bab ${num}` : `Shokyu Bab ${num}`;
        }
        if (sub.startsWith('tobira_')) {
          return `Tobira Bab ${sub.replace('tobira_', '')}`;
        }
        if (sub.startsWith('quartet_v1_l')) {
          return `Quartet I Bab ${sub.replace('quartet_v1_l', '')}`;
        }
        if (sub.startsWith('quartet_v2_l')) {
          return `Quartet II Bab ${sub.replace('quartet_v2_l', '')}`;
        }
        if (sub.startsWith('shinkanzen_')) {
          return `Shin Kanzen ${sub.replace('shinkanzen_', '').toUpperCase()}`;
        }
        if (sub.startsWith('soumatome_')) {
          return `Sou-matome ${sub.replace('soumatome_', '').replace('_w', ' Mgg ')}`;
        }
        if (sub.startsWith('try_')) {
          return `TRY! ${sub.replace('try_', '').replace('_ch', ' Bab ')}`;
        }
        return sub.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
      }
    }
  };

  if (!currentCard || filteredCards.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-10 border border-slate-200/80 text-center shadow-xs">
        <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">
          Tidak ada kartu dalam filter atau pencarian ini
        </h3>
        <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
          Cobalah mengatur ulang filter sub-kategori, level JLPT, atau hapus kata kunci pencarian.
        </p>
        <button
          onClick={() => {
            setSelectedSubCategory('all');
            setLevelFilter('all');
            setSearchQuery('');
          }}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-sm font-bold rounded-xl shadow-xs transition-all cursor-pointer"
        >
          Reset Filter & Tampilkan Semua
        </button>
      </div>
    );
  }

  const progressPercent = Math.round(((currentIndex + 1) / filteredCards.length) * 100);

  return (
    <div className="flex flex-col items-center w-full max-w-3xl mx-auto">
      {/* Search & Filters Header */}
      <div className="w-full mb-2 sm:mb-5">
        {/* MOBILE CONTROLS BAR: Minimalist & Non-intrusive */}
        <div className="sm:hidden flex items-center justify-between gap-1.5 mb-2">
          {/* Level Filter (if cards have N5/N4/N3 tags) */}
          {hasLevelTags ? (
            <div className="flex items-center bg-white border border-slate-200/90 rounded-xl p-0.5 text-xs font-semibold shadow-2xs">
              {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => {
                    setLevelFilter(lvl);
                    setCurrentIndex(0);
                  }}
                  className={`px-2 py-1 rounded-lg transition-all cursor-pointer text-[11px] ${
                    levelFilter === lvl
                      ? 'bg-rose-600 text-white font-bold shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {lvl === 'all' ? 'Semua' : lvl}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-[11px] font-bold text-slate-500 bg-white border border-slate-200/80 px-2.5 py-1 rounded-xl">
              {filteredCards.length} Kartu
            </div>
          )}

          {/* Quick Actions (Acak + Toggle Cari/Filter) */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShuffle}
              className="flex items-center gap-1 px-2.5 py-1.5 text-slate-600 bg-white border border-slate-200/90 rounded-xl text-xs font-semibold shadow-2xs cursor-pointer active:scale-95"
              title="Acak urutan kartu"
            >
              <Shuffle className="w-3 h-3 text-slate-500" />
              <span className="text-[11px]">Acak</span>
            </button>

            <button
              onClick={() => setIsFilterExpandedOnMobile(!isFilterExpandedOnMobile)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer active:scale-95 shadow-2xs ${
                isFilterExpandedOnMobile || searchQuery || selectedSubCategory !== 'all'
                  ? 'bg-rose-50 text-rose-700 border-rose-200'
                  : 'bg-white text-slate-600 border-slate-200/90'
              }`}
              title="Buka pencarian & filter tema"
            >
              <Search className="w-3 h-3" />
              <span className="text-[11px]">Filter</span>
              {(searchQuery || selectedSubCategory !== 'all') && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE COLLAPSIBLE EXPANSION for Search & Subcategories */}
        {(isFilterExpandedOnMobile || searchQuery) && (
          <div className="sm:hidden flex flex-col gap-2 p-3 bg-white rounded-2xl border border-slate-200/90 shadow-xs mb-2 animate-in fade-in duration-150">
            {/* Search Input */}
            <div className="relative w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                placeholder="Cari kanji, romaji, atau arti..."
                className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentIndex(0);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Subcategories Ribbon on Mobile */}
            {availableSubCats.length > 0 && (
              <div className="flex flex-col gap-2 pt-1 border-t border-slate-100 animate-in fade-in duration-200">
                {/* Minna Group Tabs Filter on Mobile */}
                {hasMinnaShokyuChapters && (
                  <div className="flex items-center gap-1 p-0.5 bg-slate-100 rounded-xl text-[10px] font-extrabold border border-slate-200/60 mb-1 w-full max-w-sm justify-between shadow-3xs">
                    <button
                      onClick={() => setMinnaGroupFilter('all')}
                      className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                        minnaGroupFilter === 'all'
                          ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setMinnaGroupFilter('minna1')}
                      className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                        minnaGroupFilter === 'minna1'
                          ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Mina 1
                    </button>
                    <button
                      onClick={() => setMinnaGroupFilter('minna2')}
                      className={`flex-1 py-1 rounded-lg text-center transition-all cursor-pointer ${
                        minnaGroupFilter === 'minna2'
                          ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Mina 2
                    </button>
                  </div>
                )}

                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                    <ListFilter className="w-3 h-3 text-rose-600" />
                    <span>Pilih Bab / Tema ({displayedSubCats.length}):</span>
                  </span>

                  {/* Mobile Quick Dropdown */}
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => {
                      setSelectedSubCategory(e.target.value);
                      setCurrentIndex(0);
                    }}
                    className="text-[11px] bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-2 py-1 font-bold focus:outline-none focus:ring-1 focus:ring-rose-400 max-w-[160px] truncate"
                  >
                    <option value="all">Semua ({groupCardsCount})</option>
                    {displayedSubCats.map((sub) => {
                      const count = cards.filter((c) => c.subCategory === sub).length;
                      return (
                        <option key={sub} value={sub}>
                          {formatSubCatLabel(sub)} ({count})
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="flex items-center gap-1.5 overflow-x-auto py-1 select-none no-scrollbar">
                  <button
                    onClick={() => {
                      setSelectedSubCategory('all');
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 transition-all ${
                      selectedSubCategory === 'all'
                        ? 'bg-slate-800 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Semua
                  </button>
                  {displayedSubCats.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => {
                        setSelectedSubCategory(sub);
                        setCurrentIndex(0);
                      }}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap shrink-0 transition-all ${
                        selectedSubCategory === sub
                          ? 'bg-rose-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {formatSubCatLabel(sub)}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* DESKTOP SEARCH & FILTERS (Hidden on Mobile to avoid clutter) */}
        <div className="hidden sm:flex flex-col gap-2.5">
          {/* Search Bar & Level Filter */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                placeholder="Cari kata (Kanji, Romaji, atau arti bahasa Indonesia)..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:border-rose-400 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setCurrentIndex(0);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
                  title="Hapus pencarian"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Level Filter (if cards have N5/N4/N3/N2/N1 level tags) */}
            {hasLevelTags && (
              <div className="flex items-center bg-white border border-slate-200 rounded-xl p-0.5 text-xs font-semibold shadow-2xs shrink-0">
                {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => {
                      setLevelFilter(lvl);
                      setCurrentIndex(0);
                    }}
                    className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                      levelFilter === lvl
                        ? 'bg-rose-600 text-white font-bold shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {lvl === 'all' ? 'Semua' : lvl}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Subcategory Navigation Bar with Arrow Controls & Dropdown */}
          {availableSubCats.length > 0 && (
            <div className="flex flex-col gap-2 bg-slate-50/90 p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-slate-200/40">
                <div className="flex items-center gap-1.5 text-xs text-slate-700 font-bold">
                  <ListFilter className="w-4 h-4 text-rose-600" />
                  <span>Pilih Bab / Tema ({displayedSubCats.length}):</span>
                  {selectedSubCategory !== 'all' && (
                    <button
                      onClick={() => {
                        setSelectedSubCategory('all');
                        setCurrentIndex(0);
                      }}
                      className="ml-1 text-[11px] text-rose-600 hover:text-rose-700 font-bold cursor-pointer underline"
                      title="Kembalikan ke semua subkategori"
                    >
                      Tampilkan Semua
                    </button>
                  )}
                </div>

                {/* Minna Group Tabs Filter on Desktop */}
                {hasMinnaShokyuChapters && (
                  <div className="flex items-center gap-0.5 p-0.5 bg-slate-200/70 rounded-xl text-xs font-bold border border-slate-200/50 self-start md:self-auto shadow-3xs">
                    <button
                      onClick={() => setMinnaGroupFilter('all')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        minnaGroupFilter === 'all'
                          ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Semua
                    </button>
                    <button
                      onClick={() => setMinnaGroupFilter('minna1')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        minnaGroupFilter === 'minna1'
                          ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Minna I (Bab 1-25)
                    </button>
                    <button
                      onClick={() => setMinnaGroupFilter('minna2')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        minnaGroupFilter === 'minna2'
                          ? 'bg-white text-slate-800 shadow-2xs font-extrabold'
                          : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      Minna II (Bab 26-50)
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] text-slate-500 font-semibold">
                  {minnaGroupFilter === 'minna1' 
                    ? 'Menampilkan Minna no Nihongo Bagian 1 (Dasar / N5)' 
                    : minnaGroupFilter === 'minna2' 
                      ? 'Menampilkan Minna no Nihongo Bagian 2 (Menengah-Bawah / N4)' 
                      : 'Menampilkan semua kategori bab.'
                  }
                </span>

                <div className="flex items-center gap-1.5">
                  {/* Quick Dropdown Picker for 1-click chapter jump */}
                  <select
                    value={selectedSubCategory}
                    onChange={(e) => {
                      setSelectedSubCategory(e.target.value);
                      setCurrentIndex(0);
                    }}
                    className="text-xs bg-white border border-slate-200 text-slate-700 rounded-xl px-2.5 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer max-w-[210px] truncate shadow-2xs"
                    title="Pilih langsung dari menu drop-down"
                  >
                    <option value="all">Semua ({groupCardsCount})</option>
                    {displayedSubCats.map((sub) => {
                      const count = cards.filter((c) => c.subCategory === sub).length;
                      return (
                        <option key={sub} value={sub}>
                          {formatSubCatLabel(sub)} ({count})
                        </option>
                      );
                    })}
                  </select>

                  {/* Wrap vs Horizontal Scroll Toggle */}
                  <button
                    onClick={() => setIsWrapSubCats(!isWrapSubCats)}
                    className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer shadow-2xs ${
                      isWrapSubCats
                        ? 'bg-rose-100 text-rose-800 border-rose-300'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                    title={isWrapSubCats ? 'Beralih ke mode pita geser' : 'Buka semua tombol dalam grid baris'}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>{isWrapSubCats ? 'Pita Geser' : 'Grid Lengkap'}</span>
                  </button>

                  {/* Left & Right Clickable Scroll Arrows (visible in scroll ribbon mode) */}
                  {!isWrapSubCats && (
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => scrollSubCats('left')}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                        title="Geser opsi ke kiri"
                        aria-label="Geser opsi ke kiri"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => scrollSubCats('right')}
                        className="w-7 h-7 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 active:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                        title="Geser opsi ke kanan"
                        aria-label="Geser opsi ke kanan"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Subcategory Pills Container */}
              <div
                ref={subCatScrollRef}
                className={`${
                  isWrapSubCats
                    ? 'flex flex-wrap gap-1.5 max-h-[260px] overflow-y-auto pr-1 py-1'
                    : 'flex items-center gap-1.5 overflow-x-auto py-1 scroll-smooth'
                } select-none`}
              >
                <button
                  onClick={() => {
                    setSelectedSubCategory('all');
                    setCurrentIndex(0);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none shrink-0 ${
                    selectedSubCategory === 'all'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  Semua Sub-kategori
                </button>
                {displayedSubCats.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setSelectedSubCategory(sub);
                      setCurrentIndex(0);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap select-none shrink-0 ${
                      selectedSubCategory === sub
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {formatSubCatLabel(sub)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Controls */}
          <div className="flex items-center justify-between gap-2 text-xs pt-1 border-t border-slate-100">
            <span className="text-slate-500 font-medium">
              Menampilkan <strong className="text-slate-800">{filteredCards.length}</strong> kartu
            </span>

            <button
              onClick={handleShuffle}
              className="flex items-center gap-1.5 px-3 py-1.5 text-slate-600 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg font-semibold transition-colors cursor-pointer shadow-2xs"
              title="Acak urutan kartu"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Acak Kartu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar & Counter */}
      <div className="w-full flex items-center justify-between mb-1.5 text-xs font-semibold text-slate-500 px-1">
        <span>
          Kartu <strong className="text-slate-800">{currentIndex + 1}</strong> /{' '}
          <strong className="text-slate-800">{filteredCards.length}</strong>
        </span>
        <div className="flex items-center gap-1.5">
          <span className="font-mono text-[11px]">{progressPercent}%</span>
        </div>
      </div>
      <div className="w-full bg-slate-200/70 h-1 sm:h-1.5 rounded-full overflow-hidden mb-3 sm:mb-5">
        <div
          className="bg-rose-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* 3D FLASHCARD CONTAINER */}
      <div className="w-full min-h-[350px] h-[360px] sm:h-[410px] md:h-[430px] perspective-1000 select-none mb-3 sm:mb-5">
        <motion.div
          id="flashcard-element"
          onClick={handleCardClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative w-full h-full cursor-pointer transform-style-3d duration-500 rounded-3xl shadow-lg border border-slate-200/90"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* FRONT OF CARD */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl p-4 sm:p-7 flex flex-col justify-between backface-hidden bg-gradient-to-b from-white to-[#fffaf8] ${
              isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between shrink-0 gap-2">
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-50 text-rose-600 border border-rose-100 uppercase tracking-wider shrink-0">
                  {currentCard.level || currentCard.category}
                </span>
                {(() => {
                  const wordClass = getWordClassification(currentCard);
                  return (
                    <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg border shadow-2xs flex items-center gap-1 shrink-0 ${wordClass.badgeClass}`}>
                      <span>{wordClass.icon}</span>
                      <span>{wordClass.shortLabel}</span>
                    </span>
                  );
                })()}
              </div>

              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                {/* Audio button */}
                <button
                  id="flashcard-audio-front"
                  onClick={() => handleSpeakCurrentCard(currentCard)}
                  className={`p-2.5 rounded-full transition-all shadow-xs cursor-pointer select-none ${
                    isPlayingAudio
                      ? 'bg-rose-500 text-white scale-110 ring-4 ring-rose-200 animate-pulse'
                      : 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:scale-105 active:scale-95'
                  }`}
                  title="Putar Audio Pelafalan Asli"
                  aria-label="Putar audio"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Center: Main Character / Word */}
            <div className="flex flex-col items-center justify-center my-auto text-center px-2 sm:px-4 flex-1 min-h-0">
              <motion.div
                key={currentCard.id}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`font-jp font-black text-slate-900 tracking-normal drop-shadow-xs max-w-full break-words leading-tight ${
                  currentCard.japanese.length <= 2
                    ? 'text-5xl sm:text-7xl lg:text-8xl'
                    : currentCard.japanese.length <= 4
                    ? 'text-4xl sm:text-5xl lg:text-6xl'
                    : currentCard.japanese.length <= 8
                    ? 'text-2xl sm:text-3xl lg:text-4xl'
                    : currentCard.japanese.length <= 15
                    ? 'text-xl sm:text-2xl lg:text-3xl'
                    : currentCard.japanese.length <= 25
                    ? 'text-lg sm:text-xl lg:text-2xl'
                    : 'text-base sm:text-lg lg:text-xl'
                }`}
              >
                {currentCard.japanese}
              </motion.div>

              {currentCard.furigana && (
                <p className="mt-2 text-sm sm:text-base font-semibold text-rose-600 font-jp">
                  {currentCard.furigana}
                </p>
              )}

              {(currentCard.strokes || currentCard.category === 'kanji') && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setStrokeModalCard(currentCard);
                  }}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200/80 hover:bg-rose-100 cursor-pointer transition-all active:scale-95 shadow-2xs select-none"
                  title="Lihat urutan goresan & langkah tulis (Hitsujun)"
                >
                  <PenTool className="w-3.5 h-3.5 text-rose-600" />
                  <span>{currentCard.strokes ? `${currentCard.strokes} Goresan` : 'Langkah Tulis'} &bull; 筆順</span>
                </button>
              )}
            </div>

            {/* Bottom Hint */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 pt-2 border-t border-slate-100 shrink-0">
              <RotateCw className="w-3.5 h-3.5 text-rose-400 animate-spin-slow" />
              <span>Ketuk untuk membalik kartu (atau tekan Spasi)</span>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div
            className={`absolute inset-0 w-full h-full rounded-3xl p-4 sm:p-7 flex flex-col justify-between backface-hidden rotate-y-180 bg-white border-2 border-rose-200/80 shadow-xl ${
              !isFlipped ? 'pointer-events-none' : ''
            }`}
          >
            {/* Top Toolbar */}
            <div className="flex items-center justify-between shrink-0 gap-2">
              <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                <span className="px-2.5 py-1 text-[11px] font-bold rounded-lg bg-rose-50 text-rose-600 border border-rose-100 uppercase tracking-wider shrink-0">
                  {currentCard.level || currentCard.category}
                </span>
                {(() => {
                  const wordClass = getWordClassification(currentCard);
                  return (
                    <span className={`px-2.5 py-1 text-[11px] font-extrabold rounded-lg border shadow-2xs flex items-center gap-1 shrink-0 ${wordClass.badgeClass}`}>
                      <span>{wordClass.icon}</span>
                      <span>{wordClass.shortLabel}</span>
                    </span>
                  );
                })()}
              </div>

              <div className="flex items-center gap-2 shrink-0" onClick={(e) => e.stopPropagation()}>
                <button
                  id="flashcard-audio-back"
                  onClick={() => handleSpeakCurrentCard(currentCard)}
                  className={`p-2.5 rounded-full transition-all shadow-xs cursor-pointer select-none ${
                    isPlayingAudio
                      ? 'bg-rose-500 text-white scale-110 ring-4 ring-rose-200 animate-pulse'
                      : 'bg-rose-50 text-rose-600 hover:bg-rose-100 hover:scale-105 active:scale-95'
                  }`}
                  title="Dengarkan kembali pelafalan utama"
                  aria-label="Putar ulang audio"
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Center Content: Meaning & Details (Full Width & Gracefully Scrollable) */}
            <div className="flex-1 min-h-0 w-full flex flex-col items-center text-center px-1 sm:px-2 space-y-2.5 overflow-y-auto my-1.5 custom-scrollbar">
              {/* Japanese Word & Reading Header (Never squeezed into vertical column) */}
              <div className="w-full flex flex-col items-center text-center pb-2 border-b border-slate-100 shrink-0">
                <div
                  className={`font-jp font-black text-rose-600 leading-snug break-words max-w-full tracking-normal ${
                    currentCard.japanese.length <= 4
                      ? 'text-2xl sm:text-3xl md:text-4xl'
                      : currentCard.japanese.length <= 10
                      ? 'text-xl sm:text-2xl md:text-3xl'
                      : currentCard.japanese.length <= 20
                      ? 'text-lg sm:text-xl md:text-2xl'
                      : 'text-base sm:text-lg md:text-xl'
                  }`}
                >
                  {currentCard.japanese}
                </div>

                <div className="flex items-center justify-center gap-1.5 mt-1 flex-wrap">
                  <span className="text-xs sm:text-sm font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200/70 max-w-full break-all">
                    {currentCard.reading}
                  </span>
                  {currentCard.furigana && currentCard.furigana !== currentCard.reading && (
                    <span className="text-xs text-rose-500 font-jp font-semibold">
                      {currentCard.furigana}
                    </span>
                  )}
                </div>
              </div>

              {/* Indonesian Meaning - Diperjelas & Bebas Ambiguitas */}
              {(() => {
                const clarified = getClarifiedMeaning(currentCard);
                return (
                  <div className="w-full max-w-md flex flex-col items-center">
                    <div className="flex items-center justify-center gap-1.5 flex-wrap mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Arti Presisi
                      </span>
                      {clarified.contextBadge && (
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold border shadow-2xs ${
                            clarified.contextBadge.variant === 'intransitive'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : clarified.contextBadge.variant === 'transitive'
                              ? 'bg-sky-50 text-sky-800 border-sky-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {clarified.contextBadge.text}
                        </span>
                      )}
                    </div>

                    <h4
                      className={`font-extrabold text-slate-900 mt-0.5 leading-snug ${
                        clarified.primaryMeaning.length > 50
                          ? 'text-base sm:text-lg'
                          : clarified.primaryMeaning.length > 25
                          ? 'text-lg sm:text-xl md:text-2xl'
                          : 'text-2xl sm:text-3xl'
                      }`}
                    >
                      {clarified.primaryMeaning}
                    </h4>

                    {/* Secondary Meanings if any */}
                    {clarified.secondaryMeanings && clarified.secondaryMeanings.length > 0 && (
                      <div className="flex items-center gap-1.5 flex-wrap justify-center mt-1.5 text-[11px] text-slate-600">
                        <span className="text-slate-400 font-semibold text-[10px]">Makna lain:</span>
                        {clarified.secondaryMeanings.map((alt, altIdx) => (
                          <span
                            key={altIdx}
                            className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-semibold text-[10px]"
                          >
                            {alt}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Particle Hint */}
                    {clarified.particleHint && (
                      <div className="mt-1.5 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-indigo-50/80 border border-indigo-100 text-indigo-900 text-[11px] font-bold">
                        <span className="text-indigo-500 font-mono text-[10px]">Partikel:</span>
                        <span className="font-jp">{clarified.particleHint}</span>
                      </div>
                    )}

                    {/* Anti-Bingung: Pasangan Pembanding / Kontras Langsung */}
                    {clarified.contrastPair && (
                      <div className="w-full mt-2.5 bg-amber-50/90 border border-amber-200/90 p-2.5 rounded-xl text-left shadow-2xs">
                        <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-[11px] mb-0.5">
                          <span>💡 Anti-Bingung: Bedakan dengan</span>
                          <span className="font-jp font-black text-amber-950 px-1.5 py-0.5 bg-amber-100/90 rounded border border-amber-200">
                            {clarified.contrastPair.word} ({clarified.contrastPair.reading})
                          </span>
                        </div>
                        <p className="text-[11px] text-amber-900 font-medium leading-relaxed">
                          {clarified.contrastPair.difference}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })()}

              {/* Klasifikasi Golongan Kata & Kaidah Gramatikal + Perubahan Kata */}
              {(() => {
                const wordClass = getWordClassification(currentCard);
                const isConjugatable =
                  wordClass.type.startsWith('verb') ||
                  wordClass.type.startsWith('adj') ||
                  wordClass.type === 'noun';

                return (
                  <div className={`w-full max-w-md p-2.5 rounded-xl border text-xs text-left shadow-2xs ${wordClass.badgeClass}`}>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <div className="font-extrabold flex items-center gap-1.5">
                        <span>{wordClass.icon}</span>
                        <span>{wordClass.label}</span>
                      </div>
                      {isConjugatable && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConjugationModalCard(currentCard);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] flex items-center gap-1 shadow-2xs transition-all cursor-pointer select-none active:scale-95"
                          title="Buka seluruh 14+ bentuk perubahan kata lengkap"
                        >
                          <Sparkles className="w-3 h-3 text-indigo-200" />
                          <span>Perubahan Kata</span>
                        </button>
                      )}
                    </div>
                    <p className="font-medium text-[11px] opacity-90 leading-relaxed">{wordClass.grammarHint}</p>
                  </div>
                );
              })()}

              {/* Pembeda Nuansa Kata (Agar Tidak Bingung Seperti Tanjun vs Jimi) */}
              {(() => {
                const nuance = getWordNuanceInfo(currentCard);
                if (!nuance) return null;
                return (
                  <div className="w-full max-w-md bg-amber-50/90 border border-amber-200/90 p-3 rounded-2xl text-left shadow-2xs">
                    <div className="flex items-center gap-1.5 text-amber-900 font-extrabold text-xs mb-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>Pembeda Nuansa: {nuance.japanese} (語彙の使い分け)</span>
                    </div>
                    <p className="text-xs font-semibold text-amber-950 leading-relaxed mb-1.5">
                      {nuance.nuanceExplanation}
                    </p>
                    <div className="bg-white/85 rounded-xl p-2 border border-amber-200/60 text-[11px] space-y-1">
                      <div className="text-slate-700">
                        <strong className="text-amber-900">Konteks Pemakaian:</strong> {nuance.contextUsage}
                      </div>
                      {nuance.contrastedWith && nuance.contrastedWith.length > 0 && (
                        <div className="pt-1 border-t border-amber-100">
                          <span className="text-[10px] font-extrabold uppercase text-slate-400 block mb-0.5">
                            Bandingkan dengan:
                          </span>
                          {nuance.contrastedWith.map((c, cIdx) => (
                            <div key={cIdx} className="text-slate-700 flex items-start gap-1">
                              <span className="font-jp font-bold text-amber-800 shrink-0">• {c.kanji} ({c.reading}):</span>
                              <span>{c.nuance}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* Onyomi & Kunyomi with Audio if Kanji */}
              {(currentCard.onyomi || currentCard.kunyomi) && (
                <div className="flex flex-wrap justify-center gap-2 text-xs font-medium text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 w-full max-w-md">
                  {currentCard.onyomi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speakJapanese(currentCard.onyomi!, speechRate, undefined, currentCard.onyomi!);
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 rounded-lg text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-2xs"
                      title="Klik untuk mendengarkan bacaan On-yomi (Katakana)"
                    >
                      <span className="text-rose-600 font-extrabold">On:</span>
                      <span className="font-semibold">{currentCard.onyomi}</span>
                      <Volume2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    </button>
                  )}
                  {currentCard.kunyomi && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speakJapanese(currentCard.kunyomi!, speechRate, undefined, currentCard.kunyomi!);
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 rounded-lg text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-2xs"
                      title="Klik untuk mendengarkan bacaan Kun-yomi (Hiragana)"
                    >
                      <span className="text-indigo-600 font-extrabold">Kun:</span>
                      <span className="font-semibold">{currentCard.kunyomi}</span>
                      <Volume2 className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                    </button>
                  )}
                  {(currentCard.strokes || currentCard.category === 'kanji') && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setStrokeModalCard(currentCard);
                      }}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-white hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 rounded-lg text-slate-700 transition-all cursor-pointer select-none active:scale-95 shadow-2xs"
                      title="Lihat urutan coretan langkah demi langkah (Hitsujun)"
                    >
                      <PenTool className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="text-rose-600 font-extrabold">Urutan Coretan</span>
                    </button>
                  )}
                </div>
              )}

              {/* Mnemonic Hint */}
              {currentCard.mnemonic && (
                <div className="w-full max-w-md bg-amber-50/90 border border-amber-200/80 p-2.5 rounded-xl text-left flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-extrabold text-amber-700 uppercase tracking-wide block">
                      Tips Mengingat (Mnemonic)
                    </span>
                    <p className="text-xs text-amber-900 leading-relaxed font-medium">
                      {currentCard.mnemonic}
                    </p>
                  </div>
                </div>
              )}

              {/* Example sentence */}
              {currentCard.exampleJp && (
                <div 
                  className="w-full max-w-md bg-slate-50 border border-slate-200/80 p-2.5 rounded-xl text-left cursor-pointer hover:bg-rose-50/40 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.speak(currentCard.exampleJp!, speechRate);
                  }}
                  title="Klik untuk mendengarkan contoh kalimat"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wide flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-rose-500" /> Contoh Pemakaian
                    </span>
                    <Volume2 className="w-3.5 h-3.5 text-rose-500" />
                  </div>
                  <p className="text-xs sm:text-sm font-jp font-bold text-slate-800">
                    {currentCard.exampleJp}
                  </p>
                  {currentCard.exampleId && (
                    <p className="text-[11px] text-slate-600 mt-0.5">
                      {currentCard.exampleId}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Bottom Hint */}
            <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 pt-2 border-t border-slate-100 shrink-0">
              <RotateCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Ketuk untuk kembali ke sisi depan</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FLASHCARD CONTROLS: PREV, FLIP, NEXT */}
      <div className="w-full flex items-center justify-between gap-2 sm:gap-4 mb-2 sm:mb-3">
        <button
          id="btn-prev-card"
          onClick={handlePrev}
          disabled={filteredCards.length <= 1}
          className="flex-1 min-h-[44px] sm:min-h-[52px] py-2.5 sm:py-3 px-2 sm:px-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 shadow-xs active:scale-95 transition-all cursor-pointer select-none"
          title="Kartu Sebelumnya (Panah Kiri / Geser Kanan)"
        >
          <ChevronLeft className="w-4 h-4 shrink-0" />
          <span>Sebelumnya</span>
          <span className="text-[11px] text-slate-400 font-normal hidden md:inline">[←]</span>
        </button>

        <button
          id="btn-flip-card"
          onClick={handleFlip}
          className="flex-1 min-h-[44px] sm:min-h-[52px] py-2.5 sm:py-3 px-3 sm:px-6 rounded-2xl bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 sm:gap-2 shadow-md active:scale-95 transition-all cursor-pointer select-none"
          title="Balik Kartu (Spasi / Ketuk Kartu)"
        >
          <RotateCw className="w-4 h-4 shrink-0" />
          <span>Balik Kartu</span>
          <span className="text-[11px] text-slate-400 font-normal hidden sm:inline">[Spasi]</span>
        </button>

        <button
          id="btn-next-card"
          onClick={handleNext}
          disabled={filteredCards.length <= 1}
          className="flex-1 min-h-[44px] sm:min-h-[52px] py-2.5 sm:py-3 px-2 sm:px-5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-xs sm:text-sm flex items-center justify-center gap-1 sm:gap-2 shadow-xs active:scale-95 transition-all cursor-pointer select-none"
          title="Kartu Berikutnya (Panah Kanan / Geser Kiri)"
        >
          <span>Berikutnya</span>
          <span className="text-[11px] text-slate-400 font-normal hidden md:inline">[→]</span>
          <ChevronRight className="w-4 h-4 shrink-0" />
        </button>
      </div>

      {/* Keyboard Shortcut & Mobile Swipe Hint */}
      <div className="text-center text-xs text-slate-400 font-medium select-none pt-0.5">
        <span className="hidden sm:inline">
          Gunakan tombol <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">Spasi</kbd> untuk membalik &amp; tombol panah <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">←</kbd> <kbd className="px-1.5 py-0.5 bg-slate-100 border border-slate-200 rounded text-slate-600 font-mono text-[10px]">→</kbd> untuk berganti kartu
        </span>
        <span className="sm:hidden text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1.5">
          <span>👈 Geser untuk ganti</span>
          <span>&bull;</span>
          <span>Ketuk untuk membalik 👉</span>
        </span>
      </div>

      {/* Kanji Stroke Order Modal (Urutan Coretan Langkah demi Langkah) */}
      {strokeModalCard && (
        <div
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-xs"
          onClick={() => setStrokeModalCard(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <KanjiStrokeOrderViewer
              kanjiChar={strokeModalCard.japanese}
              reading={strokeModalCard.reading}
              meaningId={strokeModalCard.meaningId}
              strokesCount={strokeModalCard.strokes}
              speechRate={speechRate}
              onClose={() => setStrokeModalCard(null)}
              onPracticeWriting={
                onPracticeWriting
                  ? () => {
                      const target = strokeModalCard;
                      setStrokeModalCard(null);
                      onPracticeWriting(target);
                    }
                  : undefined
              }
            />
          </div>
        </div>
      )}

      {/* Modal Perubahan Kata Lengkap (14+ Bentuk Konjugasi) */}
      <WordConjugationModal
        card={conjugationModalCard}
        isOpen={!!conjugationModalCard}
        onClose={() => setConjugationModalCard(null)}
        speechRate={speechRate}
      />
    </div>
  );
};
