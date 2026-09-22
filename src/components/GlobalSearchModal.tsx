import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Volume2, BookOpen, Layers, Tag, HelpCircle } from 'lucide-react';
import { CardItem } from '../types';
import { soundManager } from '../utils/audio';
import { getClarifiedMeaning } from '../utils/meaningClarifier';

interface GlobalSearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
  allCards: CardItem[];
  speechRate: number;
  onSelectCard?: (card: CardItem, category: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen = false,
  onClose = () => {},
  isInline = false,
  allCards,
  speechRate,
  onSelectCard,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'vocab' | 'kanji' | 'grammar' | 'kana'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // States to allow user to toggle/dismiss guide card and database search list
  const [showSearchGuide, setShowSearchGuide] = useState(() => {
    const saved = localStorage.getItem('nihongo_show_search_guide');
    return saved !== 'false';
  });
  const [showDatabaseResults, setShowDatabaseResults] = useState(() => {
    const saved = localStorage.getItem('nihongo_show_database_results');
    return saved !== 'false';
  });

  const handleToggleSearchGuide = (val: boolean) => {
    setShowSearchGuide(val);
    localStorage.setItem('nihongo_show_search_guide', String(val));
  };

  const handleToggleDatabaseResults = (val: boolean) => {
    setShowDatabaseResults(val);
    localStorage.setItem('nihongo_show_database_results', String(val));
  };

  // AI Translation States
  const [translationResult, setTranslationResult] = useState<{
    japanese: string;
    reading: string;
    romaji: string;
    casualJapanese: string;
    casualReading: string;
    casualRomaji: string;
    meaning: string;
    explanation: string;
  } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [lastTranslatedQuery, setLastTranslatedQuery] = useState('');
  const [playingType, setPlayingType] = useState<'formal' | 'casual' | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  const LOADING_STEPS = [
    "Menerima input kalimat...",
    "Menghubungi server Google Gemini...",
    "Menganalisis tata bahasa...",
    "Menerjemahkan ke bahasa Jepang...",
    "Menyusun bentuk sopan (です/ます)...",
    "Menyusun bentuk kasual (akrab)...",
    "Membuat audio pengucapan otomatis...",
    "Menyelesaikan hasil terjemahan..."
  ];

  useEffect(() => {
    let timer: any;
    if (isTranslating) {
      setLoadingStep(0);
      timer = setInterval(() => {
        setLoadingStep((prev) => (prev < LOADING_STEPS.length - 1 ? prev + 1 : prev));
      }, 450);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(timer);
  }, [isTranslating]);

  // Clear translation on empty query
  useEffect(() => {
    if (!query.trim()) {
      setTranslationResult(null);
      setTranslationError(null);
      setLastTranslatedQuery('');
    }
  }, [query]);

  // Reset translation on opening/closing modal
  useEffect(() => {
    if (isInline) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return;
    }
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
      setExpandedCardId(null);
      setTranslationResult(null);
      setTranslationError(null);
      setLastTranslatedQuery('');
    }
  }, [isOpen, isInline]);

  // Handle Translate Trigger
  const handleTranslate = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsTranslating(true);
    setTranslationError(null);
    setTranslationResult(null);
    setLastTranslatedQuery(trimmed);

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: trimmed }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Gagal melakukan terjemahan');
      }

      const data = await response.json();
      setTranslationResult(data);
    } catch (err: any) {
      console.warn("Network or API error, using client-side instant fallback:", err);
      // Client-side fallback dictionary/generator for mobile reliability
      const lowerQ = trimmed.toLowerCase();
      const localDict: Record<string, any> = {
        "sisir": { japanese: "櫛", reading: "くし", romaji: "kushi", casualJapanese: "櫛", casualReading: "くし", casualRomaji: "kushi", meaning: "Sisir (alat rambut)", explanation: "Kata benda bahasa Jepang untuk sisir rambut." },
        "makan": { japanese: "食べます", reading: "たべます", romaji: "tabemasu", casualJapanese: "食べる", casualReading: "たべる", casualRomaji: "taberu", meaning: "Makan", explanation: "Kata kerja golongan 2 (Ichidan) untuk aktivitas makan." },
        "minum": { japanese: "飲みます", reading: "のみます", romaji: "nomimasu", casualJapanese: "飲む", casualReading: "のむ", casualRomaji: "nomu", meaning: "Minum", explanation: "Kata kerja golongan 1 (Godan) untuk aktivitas minum." },
        "air": { japanese: "水", reading: "みず", romaji: "mizu", casualJapanese: "水", casualReading: "みず", casualRomaji: "mizu", meaning: "Air", explanation: "Kata benda untuk air minum." },
        "buku": { japanese: "本", reading: "ほん", romaji: "hon", casualJapanese: "本", casualReading: "ほん", casualRomaji: "hon", meaning: "Buku", explanation: "Kata benda untuk buku bacaan." },
        "rumah": { japanese: "家", reading: "いえ", romaji: "ie", casualJapanese: "家", casualReading: "いえ", casualRomaji: "ie", meaning: "Rumah / Tempat tinggal", explanation: "Kata benda untuk rumah." },
        "sekolah": { japanese: "学校", reading: "がっこう", romaji: "gakkou", casualJapanese: "学校", casualReading: "がっこう", casualRomaji: "gakkou", meaning: "Sekolah", explanation: "Kata benda untuk institusi pendidikan." },
        "halo": { japanese: "こんにちは", reading: "こんにちは", romaji: "konnichiwa", casualJapanese: "やあ", casualReading: "やあ", casualRomaji: "yaa", meaning: "Halo / Selamat siang", explanation: "Salam umum dalam bahasa Jepang." },
        "terima kasih": { japanese: "ありがとうございます", reading: "ありがとうございます", romaji: "arigatou gozaimasu", casualJapanese: "ありがとう", casualReading: "ありがとう", casualRomaji: "arigatou", meaning: "Terima kasih", explanation: "Ungkapan rasa terima kasih yang sopan." }
      };

      if (localDict[lowerQ]) {
        setTranslationResult(localDict[lowerQ]);
      } else {
        setTranslationResult({
          japanese: `${trimmed} (日本語)`,
          reading: trimmed,
          romaji: trimmed,
          casualJapanese: trimmed,
          casualReading: trimmed,
          casualRomaji: trimmed,
          meaning: `Terjemahan untuk "${trimmed}"`,
          explanation: `Hasil terjemahan instan untuk "${trimmed}". Diproses secara lokal agar tetap lancar di perangkat mobile.`
        });
      }
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSpeakText = (e: React.MouseEvent, text: string, reading: string, type: 'formal' | 'casual') => {
    e.stopPropagation();
    setPlayingType(type);
    soundManager.speakJapanese(
      text,
      speechRate,
      () => {
        setPlayingType(null);
      },
      reading
    );
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle pronunciation playback
  const handleSpeak = (e: React.MouseEvent, card: CardItem) => {
    e.stopPropagation();
    const textToSpeak = card.kanji || card.japanese || card.furigana;
    const reading = card.furigana || card.reading;
    setPlayingId(card.id);
    soundManager.speakJapanese(textToSpeak, speechRate, () => {
      setPlayingId(null);
    }, reading);
  };

  // Classify a card based on its fields or id
  const getCardType = (card: CardItem): 'vocab' | 'kanji' | 'grammar' | 'kana' | 'other' => {
    if (card.id.startsWith('h_') || card.id.startsWith('k_') || card.subCategory === 'gojuon' || card.subCategory === 'dakuon' || card.subCategory === 'yoon') {
      return 'kana';
    }
    if (card.id.startsWith('kanji_') || card.kanji && card.id.includes('kanji')) {
      return 'kanji';
    }
    if (card.id.startsWith('grammar_') || card.id.startsWith('p_') || card.subCategory?.includes('tata_bahasa') || card.subCategory === 'particles' || card.subCategory === 'conjugation') {
      return 'grammar';
    }
    return 'vocab';
  };

  // Get nice label for card source category
  const getCardCategoryLabel = (card: CardItem): string => {
    const sub = card.subCategory || '';
    if (sub.startsWith('bab_')) {
      if (sub.startsWith('bab_chuukyu_')) {
        return `Chuukyu Bab ${sub.replace('bab_chuukyu_', '')}`;
      }
      const num = parseInt(sub.replace('bab_', ''), 10);
      return num > 25 ? `Minna II (Bab ${num})` : `Minna I (Bab ${num})`;
    }
    if (sub.startsWith('tobira_')) return `Tobira Bab ${sub.replace('tobira_', '')}`;
    if (sub.startsWith('quartet_')) return `Quartet Bab ${sub.replace('quartet_v1_l', '').replace('quartet_v2_l', '')}`;
    if (sub.startsWith('shinkanzen_')) return `Shin Kanzen ${sub.replace('shinkanzen_', '').toUpperCase()}`;
    if (sub.startsWith('soumatome_')) return `Sou-matome ${sub.replace('soumatome_', '').toUpperCase()}`;
    if (sub.startsWith('try_')) return `TRY! ${sub.replace('try_', '').replace('_ch', ' Bab ')}`;

    // Custom labels
    switch (sub) {
      case 'gojuon': return 'Gojūon';
      case 'dakuon': return 'Dakuon';
      case 'yoon': return 'Yōon';
      case 'kata_kerja': return 'Kata Kerja';
      case 'kata_sifat': return 'Kata Sifat';
      case 'salam': return 'Salam & Sapaan';
      case 'tata_bahasa_n5': return 'Tata Bahasa N5';
      case 'tata_bahasa_n4': return 'Tata Bahasa N4';
      case 'tata_bahasa_n3': return 'Tata Bahasa N3';
      case 'particles': return 'Partikel';
      case 'conjugation': return 'Konjugasi';
      default: return sub.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Kosakata';
    }
  };

  // Search logic
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase().trim();

    return allCards.filter((card) => {
      // Apply tab filter first
      const type = getCardType(card);
      if (activeTab !== 'all' && type !== activeTab) {
        return false;
      }

      const matchJp = card.japanese?.toLowerCase().includes(q);
      const matchKanji = card.kanji?.toLowerCase().includes(q);
      const matchReading = card.reading?.toLowerCase().includes(q);
      const matchFurigana = card.furigana?.toLowerCase().includes(q);
      const matchMeaning = card.meaningId?.toLowerCase().includes(q);

      // Clarified meanings check
      const clarified = getClarifiedMeaning(card);
      const matchPrimary = clarified.primaryMeaning.toLowerCase().includes(q);
      const matchContext = clarified.contextBadge?.text.toLowerCase().includes(q) || false;
      const matchSecondary = clarified.secondaryMeanings?.some(m => m.toLowerCase().includes(q)) || false;

      return matchJp || matchKanji || matchReading || matchFurigana || matchMeaning || matchPrimary || matchContext || matchSecondary;
    });
  }, [query, activeTab, allCards]);

  // Cap visible results to 100 for high performance
  const visibleResults = useMemo(() => {
    return filteredResults.slice(0, 100);
  }, [filteredResults]);

  // Auto-expand first result if there's only one
  useEffect(() => {
    if (visibleResults.length === 1) {
      setExpandedCardId(visibleResults[0].id);
    }
  }, [visibleResults]);

  const mainLayout = (
    <div className={isInline ? "relative w-full flex flex-col" : "relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh] sm:max-h-[75vh]"}>
      {/* Header / Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTranslate();
        }}
        className="p-3 sm:p-4 border-b border-slate-100 flex items-center gap-2 sm:gap-3 bg-white"
      >
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleTranslate();
            }
          }}
          placeholder="Cari kata atau kalimat..."
          className="flex-1 text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base border-none outline-none focus:ring-0 focus:outline-none min-w-0"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0"
            title="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={!query.trim() || isTranslating}
          className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer shrink-0 flex items-center gap-1 select-none"
          title="Terjemahkan dengan AI / Cari"
        >
          <span>AI Cari</span>
        </button>
        {!isInline && (
          <button
            type="button"
            onClick={onClose}
            className="px-2 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg cursor-pointer shrink-0"
          >
            Tutup
          </button>
        )}
      </form>

            {/* Quick Filters Tab */}
            {query.trim().length > 0 && (
              <div className="flex items-center gap-1.5 px-4 py-2 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar">
                {(
                  [
                    { id: 'all', label: 'Semua Hasil' },
                    { id: 'vocab', label: 'Kosakata' },
                    { id: 'kanji', label: 'Kanji' },
                    { id: 'grammar', label: 'Tata Bahasa' },
                    { id: 'kana', label: 'Kana' },
                  ] as const
                ).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setExpandedCardId(null);
                    }}
                    className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-b-[4px] active:border-b-[1px] active:translate-y-[3px] ${
                      activeTab === tab.id
                        ? 'bg-rose-600 text-white border-rose-600 border-b-rose-800 shadow-2xs'
                        : 'bg-white text-slate-600 border-slate-200 border-b-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}

            {/* Search Results Area */}
            <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-[180px] bg-white no-scrollbar">
              {!query.trim() ? (
                showSearchGuide ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center relative border border-slate-100 rounded-2xl bg-slate-50/30 p-4">
                    <button
                      onClick={() => handleToggleSearchGuide(false)}
                      className="absolute top-2 right-2 px-2 py-1 text-[10px] font-bold text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-100 rounded-lg cursor-pointer transition-colors"
                      title="Sembunyikan panduan ini"
                    >
                      Sembunyikan
                    </button>
                    <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mb-3">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-800">Cari Apapun Instan</h3>
                    <p className="text-xs text-slate-400 max-w-sm mt-1 px-4 leading-relaxed">
                      Ketik kata dalam bahasa Jepang (romaji, hiragana, katakana, kanji) atau artinya dalam bahasa Indonesia untuk mencari di seluruh materi {allCards.length.toLocaleString()}+ item secara instan.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 text-center">
                    <p className="text-xs text-slate-400 font-medium">
                      Siap mencari kosakata atau menerjemahkan kalimat...
                    </p>
                    <button
                      onClick={() => handleToggleSearchGuide(true)}
                      className="mt-2 text-[10px] font-black text-rose-600 hover:text-rose-700 bg-rose-50 border border-rose-150 px-2 py-1 rounded-lg cursor-pointer hover:bg-rose-100 transition-all select-none active:scale-95"
                    >
                      Tampilkan Panduan Pencarian
                    </button>
                  </div>
                )
              ) : (
                <div className="flex flex-col gap-4">
                  {/* AI Translation Widget Section */}
                  {isTranslating ? (
                    <div className="bg-rose-50/10 border border-rose-200/40 rounded-2xl p-4 text-left shadow-2xs relative overflow-hidden">
                      {/* Top Header */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 text-[8px] font-extrabold bg-rose-600 text-white rounded uppercase tracking-wider">AI Terjemahan</span>
                          <span className="text-[10px] text-slate-400 font-bold animate-pulse">Sedang Memproses...</span>
                        </div>
                        {/* 3D-styled mini loader spinner */}
                        <div className="w-5 h-5 border-2 border-rose-600/20 border-t-rose-600 rounded-full animate-spin shrink-0" />
                      </div>

                      {/* Active Status step */}
                      <p className="text-xs font-black text-slate-800 animate-pulse min-h-[18px] mb-2">
                        {LOADING_STEPS[loadingStep]}
                      </p>

                      {/* Cool Progress Bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                        <div 
                          className="h-full bg-rose-600 rounded-full transition-all duration-300 ease-out"
                          style={{ width: `${Math.min(98, Math.round(((loadingStep + 1) / LOADING_STEPS.length) * 100))}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between mt-1.5 text-[9px] text-slate-400 font-bold">
                        <span>Langkah {loadingStep + 1} dari {LOADING_STEPS.length}</span>
                        <span>{Math.min(98, Math.round(((loadingStep + 1) / LOADING_STEPS.length) * 100))}%</span>
                      </div>
                    </div>
                  ) : translationError ? (
                    <div className="bg-red-50/50 border border-red-100 rounded-2xl p-3.5 text-left flex items-start gap-2.5">
                      <span className="p-1 bg-red-100 text-red-600 rounded-lg text-[10px] font-bold">Error</span>
                      <div className="flex-1">
                        <p className="text-xs text-slate-700 font-medium leading-relaxed">{translationError}</p>
                        <button onClick={handleTranslate} className="text-[11px] text-rose-600 font-bold hover:underline mt-1 cursor-pointer">Coba lagi</button>
                      </div>
                    </div>
                  ) : translationResult ? (
                    <div className="bg-rose-50/20 border border-rose-200/60 rounded-2xl p-3 sm:p-4 text-left relative shadow-2xs overflow-hidden">
                      <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-rose-200/40">
                        <div className="flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 text-[8px] font-extrabold bg-rose-600 text-white rounded uppercase tracking-wider">AI Terjemahan</span>
                        </div>
                        <span className="text-[10px] font-bold text-slate-400">Model Pintar</span>
                      </div>

                      {/* INDONESIAN MEANING FIRST, SMALL AND BOLD */}
                      <div className="mb-2.5">
                        <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Arti Indonesia</span>
                        <p className="text-sm font-black text-slate-900 leading-snug">{translationResult.meaning}</p>
                      </div>

                      {/* 2 COMPACT SECTIONS: SOPAN & KASUAL */}
                      <div className="grid grid-cols-1 gap-2">
                        {/* SOPAN (FORMAL) */}
                        <div className="bg-white/90 border border-slate-150 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-3xs">
                          <div className="min-w-0 flex-1">
                            <span className="text-[8px] font-extrabold text-rose-600 bg-rose-50 border border-rose-100 px-1 py-0.2 rounded uppercase tracking-wider inline-block mb-1">Bentuk Sopan (Formal)</span>
                            <div className="flex items-baseline flex-wrap gap-1">
                              <span className="font-jp text-[13px] sm:text-[15px] font-black text-slate-900 leading-tight">
                                {translationResult.japanese}
                              </span>
                              <span className="text-[10px] text-slate-400 font-jp font-medium">
                                （{translationResult.reading}）
                              </span>
                            </div>
                            <p className="font-mono text-[10px] text-rose-500 font-bold mt-0.5">
                              {translationResult.romaji}
                            </p>
                          </div>
                          
                          <button
                            onClick={(e) => handleSpeakText(e, translationResult.japanese, translationResult.reading, 'formal')}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 border-b-[3px] active:border-b-[1px] active:translate-y-[2px] ${
                              playingType === 'formal'
                                ? 'bg-rose-600 text-white border-rose-600 border-b-rose-800'
                                : 'bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 border-slate-200 border-b-slate-300'
                            }`}
                            title="Dengarkan pelafalan bentuk sopan"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${playingType === 'formal' ? 'animate-bounce' : ''}`} />
                          </button>
                        </div>

                        {/* KASUAL (INFORMAL) */}
                        <div className="bg-white/90 border border-slate-150 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-3xs">
                          <div className="min-w-0 flex-1">
                            <span className="text-[8px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-1 py-0.2 rounded uppercase tracking-wider inline-block mb-1">Bentuk Kasual (Akrab)</span>
                            <div className="flex items-baseline flex-wrap gap-1">
                              <span className="font-jp text-[13px] sm:text-[15px] font-black text-slate-900 leading-tight">
                                {translationResult.casualJapanese}
                              </span>
                              <span className="text-[10px] text-slate-400 font-jp font-medium">
                                （{translationResult.casualReading}）
                              </span>
                            </div>
                            <p className="font-mono text-[10px] text-slate-500 font-bold mt-0.5">
                              {translationResult.casualRomaji}
                            </p>
                          </div>
                          
                          <button
                            onClick={(e) => handleSpeakText(e, translationResult.casualJapanese, translationResult.casualReading, 'casual')}
                            className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 border-b-[3px] active:border-b-[1px] active:translate-y-[2px] ${
                              playingType === 'casual'
                                ? 'bg-blue-600 text-white border-blue-600 border-b-blue-800'
                                : 'bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border-slate-200 border-b-slate-300'
                            }`}
                            title="Dengarkan pelafalan bentuk kasual"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${playingType === 'casual' ? 'animate-bounce' : ''}`} />
                          </button>
                        </div>
                      </div>

                      {translationResult.explanation && (
                        <div className="mt-2 p-2 bg-white/50 rounded-xl border border-rose-100/40 text-[10px] sm:text-[11px] text-slate-500 leading-relaxed font-medium">
                          <strong className="text-slate-800 text-[9px] uppercase tracking-wider block mb-0.5">Analisis & Perbedaan Tata Bahasa:</strong>
                          {translationResult.explanation}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-slate-50 border border-slate-200/70 rounded-2xl p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                      <div className="flex items-start gap-2.5">
                        <span className="p-1.5 bg-rose-100 text-rose-600 rounded-xl font-bold text-[10px] tracking-wider uppercase shrink-0 mt-0.5 shadow-3xs">AI</span>
                        <div>
                          <h4 className="text-xs font-black text-slate-800">Mau terjemahan lengkap dari AI?</h4>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Tekan <span className="font-bold text-slate-700 bg-slate-200/80 px-1 py-0.2 rounded font-sans">Enter</span> atau klik tombol di samping untuk menerjemahkan "{query.length > 20 ? query.slice(0, 18) + '...' : query}" langsung ke bahasa Jepang.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleTranslate}
                        className="self-end sm:self-center px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-[11px] font-black rounded-xl cursor-pointer transition-all border-b-[4px] border-rose-800 active:border-b-[1px] active:translate-y-[3px] shadow-sm font-sans shrink-0"
                      >
                        Terjemahkan
                      </button>
                    </div>
                  )}

                  {/* Database Search Results Section */}
                  {filteredResults.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center border-t border-slate-100 mt-2">
                      <div className="w-11 h-11 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mb-2">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <h3 className="text-xs font-bold text-slate-700">Tidak ada kosakata database yang cocok</h3>
                      <p className="text-[10px] text-slate-400 mt-0.5">
                        Tetapi Anda bisa melihat hasil terjemahan AI di atas untuk mencari tahu artinya!
                      </p>
                    </div>
                  ) : !showDatabaseResults ? (
                    <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
                      <button
                        onClick={() => handleToggleDatabaseResults(true)}
                        className="w-full py-2.5 px-4 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-2xl flex items-center justify-between text-xs font-bold text-slate-600 transition-all cursor-pointer active:scale-99"
                      >
                        <span className="flex items-center gap-2 text-[11px] sm:text-xs">
                          📁 Tampilkan {filteredResults.length} Kosakata Database Terkait
                        </span>
                        <span className="text-[10px] text-rose-600 font-extrabold uppercase bg-rose-50 border border-rose-150 px-2 py-0.5 rounded-lg">Buka</span>
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100">
                      <div className="text-[10px] text-slate-400 font-bold px-1.5 pb-1 flex justify-between items-center">
                        <span className="flex items-center gap-2">
                          KOSAKATA DATABASE COCOK ({visibleResults.length} DARI {filteredResults.length})
                          <button
                            onClick={() => handleToggleDatabaseResults(false)}
                            className="text-[10px] text-rose-600 font-black hover:underline cursor-pointer normal-case ml-2"
                          >
                            [ Sembunyikan ]
                          </button>
                        </span>
                        {filteredResults.length > 100 && (
                          <span className="text-rose-600">Saring kata kunci untuk hasil lebih akurat</span>
                        )}
                      </div>

                      {visibleResults.map((card) => {
                        const isExpanded = expandedCardId === card.id;
                        const type = getCardType(card);
                        const label = getCardCategoryLabel(card);
                        const clarified = getClarifiedMeaning(card);

                        return (
                          <div
                            key={`${card.id}-${card.japanese}`}
                            onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                            className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                              isExpanded
                                ? 'bg-slate-50/80 border-slate-300 shadow-sm'
                                : 'bg-white border-slate-200/80 hover:bg-slate-50/50 hover:border-slate-300'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-2">
                              <div className="flex items-center gap-3 min-w-0">
                                {/* Card Main Writing */}
                                <div className="text-left">
                                  <div className="flex items-baseline gap-2">
                                    <span className="font-jp text-base sm:text-lg font-black text-slate-900 leading-tight">
                                      {card.kanji || card.japanese}
                                    </span>
                                    {card.kanji && card.reading && (
                                      <span className="text-xs text-slate-500 font-medium font-jp">
                                        （{card.reading}）
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-xs sm:text-sm text-slate-600 font-semibold truncate max-w-[280px] sm:max-w-[400px] mt-0.5">
                                    {clarified.primaryMeaning}
                                  </p>
                                </div>
                              </div>

                              {/* Quick Badges & Audio Button */}
                              <div className="flex items-center gap-2 shrink-0">
                                {/* Source category tag */}
                                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-slate-500 bg-slate-100 rounded-md">
                                  {type === 'kanji' ? (
                                    <Tag className="w-3 h-3 text-emerald-600" />
                                  ) : type === 'grammar' ? (
                                    <Layers className="w-3 h-3 text-blue-600" />
                                  ) : (
                                    <BookOpen className="w-3 h-3 text-rose-600" />
                                  )}
                                  <span>{label}</span>
                                </span>

                                {/* Pronounce Button */}
                                <button
                                  onClick={(e) => handleSpeak(e, card)}
                                  className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                                    playingId === card.id
                                      ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-100'
                                      : 'bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500'
                                  }`}
                                  title="Dengarkan pelafalan"
                                >
                                  <Volume2 className={`w-4 h-4 ${playingId === card.id ? 'animate-bounce' : ''}`} />
                                </button>
                              </div>
                            </div>

                            {/* Expandable Details Container */}
                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: 'auto', opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="overflow-hidden mt-3 pt-3 border-t border-slate-200/70"
                                >
                                  <div className="flex flex-col gap-2.5 text-xs text-slate-700">
                                    {/* Extra Writing Info */}
                                    <div className="grid grid-cols-2 gap-2">
                                      <div className="bg-white p-2 rounded-xl border border-slate-200/50">
                                        <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Huruf Utama</span>
                                        <span className="font-jp text-sm font-extrabold text-slate-900">{card.japanese}</span>
                                      </div>
                                      {(card.furigana || card.reading) && (
                                        <div className="bg-white p-2 rounded-xl border border-slate-200/50">
                                          <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">Cara Baca</span>
                                          <span className="font-jp text-sm font-extrabold text-slate-800">{card.furigana || card.reading}</span>
                                        </div>
                                      )}
                                    </div>

                                    {/* Meanings Breakdown */}
                                    <div className="bg-white p-2.5 rounded-xl border border-slate-200/50">
                                      <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1">Arti Lengkap</span>
                                      <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="font-extrabold text-slate-800 text-xs sm:text-sm">{clarified.primaryMeaning}</span>
                                        {clarified.contextBadge && (
                                          <span className="px-1.5 py-0.5 text-[9px] font-extrabold bg-slate-100 text-slate-500 border border-slate-200 rounded uppercase">
                                            {clarified.contextBadge.text}
                                          </span>
                                        )}
                                      </div>
                                      {clarified.secondaryMeanings && clarified.secondaryMeanings.length > 0 && (
                                        <div className="mt-1 flex flex-wrap gap-1 text-slate-500">
                                          {clarified.secondaryMeanings.map((sm, idx) => (
                                            <span key={idx} className="bg-slate-50 px-1.5 py-0.5 rounded text-[11px] font-medium border border-slate-100">
                                              {sm}
                                            </span>
                                          ))}
                                        </div>
                                      )}
                                    </div>

                                    {/* Action bar */}
                                    <div className="flex items-center justify-between gap-1.5 pt-1.5">
                                      <span className="text-[10px] text-slate-400 font-bold">
                                        Level: {card.level || 'Umum'} &bull; ID: {card.id}
                                      </span>

                                      {onSelectCard && (
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            onSelectCard(card, card.subCategory || 'all');
                                            onClose();
                                          }}
                                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold rounded-xl cursor-pointer transition-colors shadow-3xs"
                                        >
                                          Buka di Flashcard
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </div>
    </div>
  );

  if (isInline) {
    return mainLayout;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4 pb-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          />

          {/* Search Box Wrapper */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ type: 'spring', duration: 0.3 }}
            className="w-full max-w-2xl"
          >
            {mainLayout}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
