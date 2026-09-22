import React, { useState, useMemo, useRef, useEffect } from 'react';
import { DokkaiItem } from '../types';
import { dokkaiN1Data } from '../data/dokkaiN1Data';
import {
  BookOpen,
  Timer,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Search,
  Scale,
  Newspaper,
  Compass,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';

interface DokkaiViewProps {
  speechRate?: number;
}

export const DokkaiView: React.FC<DokkaiViewProps> = () => {
  const [selectedArticleId, setSelectedArticleId] = useState<string>(dokkaiN1Data[0]?.id || '');
  const [activeTabType, setActiveTabType] = useState<'all' | 'editorial' | 'hikaku' | 'jouhou'>('all');
  const [showTranslations, setShowTranslations] = useState<boolean>(false);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Timer state
  const [timerSeconds, setTimerSeconds] = useState<number>(420);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const filteredArticles = useMemo(() => {
    return dokkaiN1Data.filter((art) => {
      const matchType = activeTabType === 'all' || art.type === activeTabType;
      const matchSearch =
        art.titleJp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.titleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.theme.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [activeTabType, searchQuery]);

  const currentArticle = useMemo(() => {
    return dokkaiN1Data.find((a) => a.id === selectedArticleId) || dokkaiN1Data[0];
  }, [selectedArticleId]);

  // Reset timer on article change
  useEffect(() => {
    if (currentArticle) {
      setTimerSeconds(currentArticle.recommendedTimeMinutes * 60);
      setIsTimerRunning(false);
      setSelectedAnswers({});
      setShowExplanations({});
    }
  }, [currentArticle]);

  // Timer loop
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const formatTime = (totalSec: number) => {
    const min = Math.floor(totalSec / 60);
    const sec = totalSec % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (questionId: string, optionLabel: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleToggleExplanation = (questionId: string) => {
    setShowExplanations((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold tracking-wide mb-3">
            <BookOpen className="w-4 h-4 text-emerald-200" />
            <span>JLPT N3 Dokkai (読解) • Analisis Membaca Wacana Menengah</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Bedah Teks Wacana, Opini, &amp; Informasi N3
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-100/90 leading-relaxed">
            Kuasai strategi membaca pemahaman tingkat menengah: membedah esai opini tematik (論説文), mengomparasi 2 sudut pandang (比較読解), dan teknik pemindaian dokumen informasi (情報検索).
          </p>
        </div>
      </div>

      {/* Navigation and Article Selectors */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Type Filter Buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTabType('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTabType === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Semua Modul ({dokkaiN1Data.length})
          </button>
          <button
            onClick={() => setActiveTabType('editorial')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTabType === 'editorial'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Newspaper className="w-4 h-4" />
            Editorial (社説・論説文)
          </button>
          <button
            onClick={() => setActiveTabType('hikaku')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTabType === 'hikaku'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Scale className="w-4 h-4" />
            Perbandingan (比較読解)
          </button>
          <button
            onClick={() => setActiveTabType('jouhou')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTabType === 'jouhou'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Search className="w-4 h-4" />
            Informasi (情報検索)
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari tema, judul, atau topik..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Main Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Article Selector List */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Daftar Bacaan N3 ({filteredArticles.length})
          </div>
          {filteredArticles.map((art) => {
            const isSelected = art.id === currentArticle?.id;
            return (
              <button
                key={art.id}
                onClick={() => setSelectedArticleId(art.id)}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-emerald-50/80 border-emerald-500 shadow-md ring-1 ring-emerald-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      art.type === 'editorial'
                        ? 'bg-blue-100 text-blue-800'
                        : art.type === 'hikaku'
                        ? 'bg-purple-100 text-purple-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {art.type === 'editorial'
                      ? 'Editorial / 社説'
                      : art.type === 'hikaku'
                      ? 'Teks Perbandingan'
                      : 'Pencarian Informasi'}
                  </span>
                  <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                    <Timer className="w-3 h-3" />
                    {art.recommendedTimeMinutes} mnt
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{art.titleJp}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{art.titleId}</p>
              </button>
            );
          })}
        </div>

        {/* Right Side: Active Article Passage & Questions */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {currentArticle && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
              {/* Header Info & Timer Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                      {currentArticle.theme}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                    {currentArticle.titleJp}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {currentArticle.titleId}
                  </p>
                </div>

                {/* Interactive Timer Controls */}
                <div className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl shrink-0">
                  <Timer
                    className={`w-4 h-4 ${
                      timerSeconds <= 60 && timerSeconds > 0
                        ? 'text-red-500 animate-pulse'
                        : 'text-slate-600'
                    }`}
                  />
                  <span
                    className={`font-mono font-bold text-sm ${
                      timerSeconds <= 60 && timerSeconds > 0 ? 'text-red-600' : 'text-slate-800'
                    }`}
                  >
                    {formatTime(timerSeconds)}
                  </span>
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-lg transition-all ${
                      isTimerRunning
                        ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    {isTimerRunning ? 'Jeda' : 'Mulai Tes'}
                  </button>
                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerSeconds(currentArticle.recommendedTimeMinutes * 60);
                    }}
                    title="Reset Timer"
                    className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Strategy Alert Box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
                <Compass className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-emerald-800 block mb-0.5">
                    Strategi Menjawab Cepat:
                  </span>
                  {currentArticle.readingStrategy}
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Teks Dokkai
                </span>
                <button
                  onClick={() => setShowTranslations(!showTranslations)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-xl border border-emerald-200 transition-all"
                >
                  {showTranslations ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      <span>Sembunyikan Terjemahan</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tampilkan Terjemahan Per Paragraf</span>
                    </>
                  )}
                </button>
              </div>

              {/* Passage Render */}
              <div className="bg-slate-50/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80 flex flex-col gap-4">
                {currentArticle.paragraphs ? (
                  currentArticle.paragraphs.map((p, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <p className="text-base sm:text-lg leading-relaxed text-slate-800 font-medium text-justify">
                        {p.jp}
                      </p>
                      {showTranslations && (
                        <p className="text-xs sm:text-sm text-slate-600 bg-white/80 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                          {p.id}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-base sm:text-lg leading-relaxed text-slate-800 whitespace-pre-line font-medium text-justify">
                      {currentArticle.passageJp}
                    </p>
                    {showTranslations && (
                      <p className="text-xs sm:text-sm text-slate-600 bg-white/80 p-4 rounded-xl border border-slate-200/60 leading-relaxed whitespace-pre-line">
                        {currentArticle.passageId}
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Key Vocab Chips */}
              {currentArticle.keyVocab && currentArticle.keyVocab.length > 0 && (
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Kosakata Kunci &amp; Istilah N3
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {currentArticle.keyVocab.map((kv, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-xl p-2.5 flex items-start justify-between gap-2 shadow-xs"
                      >
                        <div>
                          <div className="font-bold text-slate-800 text-sm">{kv.kanji}</div>
                          <div className="text-[11px] text-emerald-700 font-medium">
                            {kv.reading}
                          </div>
                        </div>
                        <div className="text-xs text-slate-600 text-right">{kv.meaningId}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Comprehension Questions */}
              <div className="flex flex-col gap-5 mt-2 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-emerald-700" />
                  <h3 className="font-extrabold text-slate-800 text-lg">
                    Pertanyaan Pemahaman Bacaan
                  </h3>
                </div>

                {currentArticle.questions.map((q, qIndex) => {
                  const selected = selectedAnswers[q.id];
                  const isAnswered = Boolean(selected);
                  const isCorrect = selected === q.correctOption;
                  const isExpOpen = showExplanations[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 flex flex-col gap-4"
                    >
                      <div>
                        <span className="text-xs font-bold text-emerald-700">
                          Soal #{qIndex + 1}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                          {q.questionJp}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{q.questionId}</p>
                      </div>

                      {/* Options List */}
                      <div className="flex flex-col gap-2.5">
                        {q.options.map((opt) => {
                          const isOptionChosen = selected === opt.label;
                          let btnStyle =
                            'bg-white border-slate-200 text-slate-800 hover:border-emerald-400 hover:bg-emerald-50/40';

                          if (isAnswered) {
                            if (opt.label === q.correctOption) {
                              btnStyle =
                                'bg-emerald-50 border-emerald-500 text-emerald-950 font-semibold ring-1 ring-emerald-500';
                            } else if (isOptionChosen && !isCorrect) {
                              btnStyle =
                                'bg-red-50 border-red-400 text-red-950 ring-1 ring-red-400';
                            } else {
                              btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={opt.label}
                              onClick={() => handleSelectOption(q.id, opt.label)}
                              className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
                            >
                              <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                                {opt.label}
                              </span>
                              <div className="flex-1">
                                <div className="text-sm font-medium">{opt.textJp}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{opt.textId}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Result Feedback and Deep Mindset Breakdown */}
                      {isAnswered && (
                        <div className="flex flex-col gap-3 pt-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Jawaban Benar! ({q.correctOption})</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                                  <XCircle className="w-4 h-4" />
                                  <span>Jawaban Kurang Tepat. Opsi Benar: {q.correctOption}</span>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleToggleExplanation(q.id)}
                              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                            >
                              {isExpOpen ? 'Sembunyikan Bedah Jawaban' : 'Buka Bedah Cara Berpikir Penulis'}
                            </button>
                          </div>

                          {isExpOpen && (
                            <div className="bg-white rounded-xl p-4 border border-emerald-200 flex flex-col gap-2.5 text-xs sm:text-sm">
                              <div>
                                <span className="font-bold text-slate-800 block">Penjelasan:</span>
                                <p className="text-slate-700 leading-relaxed">{q.explanationId}</p>
                              </div>
                              <div className="bg-emerald-50/70 p-3 rounded-lg border border-emerald-100">
                                <span className="font-bold text-emerald-900 block mb-0.5">
                                  🧠 Bedah Mindset &amp; Logika Penulis:
                                </span>
                                <p className="text-emerald-950 leading-relaxed">
                                  {q.authorMindsetAnalysis}
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
