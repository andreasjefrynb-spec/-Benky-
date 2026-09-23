import React, { useState, useMemo, useRef } from 'react';
import { MinnaLesson } from '../types';
import { allMinnaLessons } from '../data';
import { Volume2, BookOpen, Layers, Search, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface MinnaViewProps {
  speechRate: number;
  onPracticeLesson?: (chapter: number, part?: string) => void;
  onStartQuiz?: (chapter: number, part?: string) => void;
}

const getLessonKey = (l: MinnaLesson) => `${l.part}-${l.chapter}`;

export const MinnaView: React.FC<MinnaViewProps> = ({ speechRate, onPracticeLesson, onStartQuiz }) => {
  const [selectedLessonKey, setSelectedLessonKey] = useState<string>(() => getLessonKey(allMinnaLessons[0]));
  const [filterPart, setFilterPart] = useState<'all' | 'shokyu1' | 'shokyu2' | 'chuukyu1'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vocabSearch, setVocabSearch] = useState<string>('');
  const [isMobileListExpanded, setIsMobileListExpanded] = useState<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  // Filter lessons based on part and search
  const filteredLessons = useMemo(() => {
    return allMinnaLessons.filter((l) => {
      if (filterPart === 'shokyu1' && (l.chapter > 25 || l.part.includes('Chuukyuu'))) return false;
      if (filterPart === 'shokyu2' && (l.chapter <= 25 || l.part.includes('Chuukyuu'))) return false;
      if (filterPart === 'chuukyu1' && l.part !== 'Chuukyuu I (N3)') return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = l.title.toLowerCase().includes(q);
        const matchTheme = l.theme.toLowerCase().includes(q);
        const matchGrammar = l.grammarPatterns.some(
          (g) => g.pattern.toLowerCase().includes(q) || g.explanation.toLowerCase().includes(q)
        );
        const matchVocab = l.keyVocab.some(
          (v) => v.jp.toLowerCase().includes(q) || v.reading.toLowerCase().includes(q) || v.id.toLowerCase().includes(q)
        );
        return matchTitle || matchTheme || matchGrammar || matchVocab || `bab ${l.chapter}`.includes(q);
      }
      return true;
    });
  }, [filterPart, searchQuery]);

  // Current selected lesson
  const currentLesson: MinnaLesson = useMemo(() => {
    return allMinnaLessons.find((l) => getLessonKey(l) === selectedLessonKey) || allMinnaLessons[0];
  }, [selectedLessonKey]);

  // Filtered vocabulary in currently selected lesson
  const filteredKeyVocab = useMemo(() => {
    if (!vocabSearch.trim() || !currentLesson) return currentLesson?.keyVocab || [];
    const q = vocabSearch.toLowerCase().trim();
    return currentLesson.keyVocab.filter(
      (v) =>
        v.jp.toLowerCase().includes(q) ||
        v.reading.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        (v.kanji && v.kanji.includes(q))
    );
  }, [currentLesson, vocabSearch]);

  const handleSelectLesson = (lesson: MinnaLesson) => {
    setSelectedLessonKey(getLessonKey(lesson));
    setVocabSearch('');
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentIndex = allMinnaLessons.findIndex((l) => getLessonKey(l) === selectedLessonKey);

  const handlePrevChapter = () => {
    if (currentIndex > 0) {
      handleSelectLesson(allMinnaLessons[currentIndex - 1]);
    }
  };

  const handleNextChapter = () => {
    if (currentIndex < allMinnaLessons.length - 1) {
      handleSelectLesson(allMinnaLessons[currentIndex + 1]);
    }
  };

  const handleSpeak = (text: string, readingOrEvent?: string | React.MouseEvent, e?: React.MouseEvent) => {
    let reading: string | undefined;
    let evt: React.MouseEvent | undefined;
    if (typeof readingOrEvent === 'string') {
      reading = readingOrEvent;
      evt = e;
    } else if (readingOrEvent && typeof readingOrEvent === 'object' && 'stopPropagation' in readingOrEvent) {
      evt = readingOrEvent as React.MouseEvent;
    }
    evt?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 rounded-2xl sm:rounded-3xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs font-semibold mb-2">
            <BookOpen className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span>Kurikulum Utama Minna no Nihongo (みんなの日本語)</span>
          </div>
          <h1 className="text-lg sm:text-2xl md:text-3xl font-black tracking-tight">
            Shokyu I, II &amp; Chuukyu I (N5–N3)
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm mt-1 leading-relaxed line-clamp-2 sm:line-clamp-none">
            Tata bahasa Bunkei &amp; Reibun, kosakata terstruktur, pola konjugasi, dan percakapan kontekstual Bab 1–50.
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs font-bold text-white/90">
            <span className="bg-white/15 px-2 py-0.5 rounded-lg backdrop-blur-xs">📚 50 Bab Utama + 12 Chuukyu</span>
            <span className="bg-white/15 px-2 py-0.5 rounded-lg backdrop-blur-xs">🎯 N5 &bull; N4 &bull; N3</span>
            <span className="bg-white/15 px-2 py-0.5 rounded-lg backdrop-blur-xs">🔊 Audio Suara Asli</span>
          </div>
        </div>
        <div className="absolute right-[-15px] bottom-[-20px] text-white/10 select-none pointer-events-none text-8xl sm:text-9xl font-black font-serif">
          日
        </div>
      </div>

      {/* Quick Chapter Switcher for Mobile & PC */}
      <div className="bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-1.5 sm:gap-2">
        <button
          onClick={handlePrevChapter}
          disabled={currentIndex <= 0}
          className="min-h-[38px] px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer select-none transition-colors"
          title="Bab Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex items-center gap-1.5 sm:gap-2 flex-1 justify-center max-w-md min-w-0">
          <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap hidden min-[480px]:inline">
            Bab:
          </span>
          <select
            value={selectedLessonKey}
            onChange={(e) => {
              const found = allMinnaLessons.find((l) => getLessonKey(l) === e.target.value);
              if (found) handleSelectLesson(found);
            }}
            className="w-full sm:w-auto bg-rose-50/90 border border-rose-200 text-rose-900 text-xs sm:text-sm font-bold rounded-xl px-2.5 sm:px-3 py-1.5 sm:py-2 focus:outline-hidden focus:ring-2 focus:ring-rose-400 cursor-pointer truncate"
          >
            {allMinnaLessons.map((l) => {
              const k = getLessonKey(l);
              return (
                <option key={k} value={k}>
                  [{l.part}] Bab {l.chapter}: {l.title} ({l.level})
                </option>
              );
            })}
          </select>
        </div>

        <button
          onClick={handleNextChapter}
          disabled={currentIndex >= allMinnaLessons.length - 1}
          className="min-h-[38px] px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer select-none transition-colors"
          title="Bab Berikutnya"
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Part Tabs */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar gap-1">
          <button
            onClick={() => setFilterPart('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterPart === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Semua ({allMinnaLessons.length})
          </button>
          <button
            onClick={() => setFilterPart('shokyu1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterPart === 'shokyu1'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Shokyu I &bull; N5 (1–25)
          </button>
          <button
            onClick={() => setFilterPart('shokyu2')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterPart === 'shokyu2'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Shokyu II &bull; N4 (26–50)
          </button>
          <button
            onClick={() => setFilterPart('chuukyu1')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterPart === 'chuukyu1'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Chuukyu I &bull; N3 (1–12)
          </button>
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pola, bab, atau kosakata..."
            className="w-full bg-white pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:border-rose-400 shadow-2xs transition-all"
          />
        </div>
      </div>

      {/* Main Content Layout: Sidebar Lesson List + Main Lesson Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Lesson Directory (Chapters 1 - 50) */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col">
          <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              Daftar Bab ({filteredLessons.length})
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                Bab {currentLesson.chapter} Aktif
              </span>
              <button
                onClick={() => setIsMobileListExpanded(!isMobileListExpanded)}
                className="lg:hidden p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
                title="Buka/Tutup Daftar Bab"
              >
                {isMobileListExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className={`space-y-1.5 pr-1 overflow-y-auto custom-scrollbar transition-all duration-200 ${
            isMobileListExpanded ? 'max-h-[480px]' : 'max-h-[190px] sm:max-h-[250px] lg:max-h-[720px]'
          }`}>
            {filteredLessons.map((lesson) => {
              const k = getLessonKey(lesson);
              const isSelected = k === selectedLessonKey;
              return (
                <button
                  key={k}
                  onClick={() => handleSelectLesson(lesson)}
                  className={`w-full text-left p-2.5 rounded-2xl transition-all cursor-pointer flex items-start gap-2.5 border ${
                    isSelected
                      ? 'bg-rose-50/80 border-rose-300 text-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 ${
                      isSelected ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {lesson.chapter}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold truncate">
                        {lesson.part.includes('Chuukyuu') ? 'Chuukyu ' : ''}Bab {lesson.chapter}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md ${
                          lesson.level === 'N5'
                            ? 'bg-emerald-100 text-emerald-700'
                            : lesson.level === 'N4'
                            ? 'bg-indigo-100 text-indigo-700'
                            : lesson.level === 'N3'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-purple-100 text-purple-700'
                        }`}
                      >
                        {lesson.level}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5 font-medium">
                      {lesson.theme}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 self-center transition-transform ${
                      isSelected ? 'text-rose-600 translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Lesson Workspace */}
        <div ref={workspaceRef} className="lg:col-span-8 flex flex-col gap-5 scroll-mt-20">
          {/* Lesson Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-rose-600 text-white text-xs font-extrabold px-3 py-1 rounded-xl shadow-xs">
                  {currentLesson.part.includes('Chuukyuu') ? 'Chuukyu ' : ''}Bab {currentLesson.chapter}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-xl">
                  {currentLesson.part}
                </span>
                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-xl ${
                    currentLesson.level === 'N5'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : currentLesson.level === 'N4'
                      ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                      : currentLesson.level === 'N3'
                      ? 'bg-amber-50 text-amber-700 border border-amber-200'
                      : 'bg-purple-50 text-purple-700 border border-purple-200'
                  }`}
                >
                  Target JLPT {currentLesson.level}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onPracticeLesson && (
                  <button
                    onClick={() => onPracticeLesson(currentLesson.chapter, currentLesson.part)}
                    className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Hafal Kosakata</span>
                  </button>
                )}
                {onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(currentLesson.chapter, currentLesson.part)}
                    className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Kuis Bab Ini</span>
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {currentLesson.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              <strong className="text-slate-800">Tema Pokok:</strong> {currentLesson.theme}
            </p>
            <div className="bg-slate-50 border-l-4 border-rose-500 p-3 rounded-r-2xl mt-3 text-xs text-slate-700 leading-relaxed">
              {currentLesson.summary}
            </div>
          </div>

          {/* Section 1: Grammar Patterns (Bunkei & Reibun) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-rose-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Pola Tata Bahasa &amp; Rumus (文型 Bunkei)
              </h3>
            </div>

            <div className="space-y-4">
              {currentLesson.grammarPatterns.map((gp, idx) => (
                <div
                  key={gp.id || idx}
                  className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 p-4 transition-all"
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {idx + 1}. {gp.pattern}
                    </h4>
                  </div>

                  {/* Formula Box */}
                  <div className="bg-white border border-rose-100 text-rose-700 font-mono text-xs font-semibold px-3 py-2 rounded-xl mt-2 flex items-center gap-2">
                    <span className="bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded-md text-[10px] uppercase font-bold">
                      Rumus
                    </span>
                    <span className="break-all">{gp.formula}</span>
                  </div>

                  {/* Explanation */}
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {gp.explanation}
                  </p>

                  {/* Examples */}
                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Contoh Kalimat (例文 Reibun):
                    </span>
                    {gp.examples.map((ex, exIdx) => (
                      <div
                        key={exIdx}
                        className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-100 flex items-start justify-between gap-3 group"
                      >
                        <div className="flex-1 space-y-0.5">
                          <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese">
                            {ex.jp}
                          </p>
                          <p className="text-xs text-rose-600 font-medium">
                            {ex.reading}
                          </p>
                          <p className="text-xs text-slate-600">
                            {ex.id}
                          </p>
                        </div>
                        <button
                          onClick={(e) => handleSpeak(ex.jp, ex.reading, e)}
                          title="Dengarkan Pelafalan Audio"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 transition-colors shrink-0 cursor-pointer"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Key Vocabulary (Kotoba) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Kosakata Bab {currentLesson.chapter} (言葉 Kotoba)
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  ({vocabSearch ? `${filteredKeyVocab.length} dari ` : ''}{currentLesson.keyVocab.length} Kata)
                </span>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kata / arti di bab ini..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-rose-400 text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            {filteredKeyVocab.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                Tidak ada kosakata yang cocok dengan kata kunci &quot;{vocabSearch}&quot;.
                <button
                  onClick={() => setVocabSearch('')}
                  className="block mx-auto mt-2 text-rose-600 font-bold hover:underline cursor-pointer"
                >
                  Reset Pencarian
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[600px] overflow-y-auto pr-1">
                {filteredKeyVocab.map((vocab, vIdx) => (
                  <div
                    key={vIdx}
                    className="p-3 bg-slate-50/70 hover:bg-white hover:shadow-xs rounded-2xl border border-slate-200/80 transition-all flex items-center justify-between gap-2.5"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-base font-extrabold text-slate-900 font-japanese">
                          {vocab.jp}
                        </span>
                        <span className="text-xs text-rose-600 font-semibold truncate">
                          {vocab.reading}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5 font-medium line-clamp-1" title={vocab.id}>
                        {vocab.id}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleSpeak(vocab.jp, vocab.reading, e)}
                      className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200/60 shadow-2xs transition-colors shrink-0 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Situational Dialogue (Kaiwa) if present */}
          {currentLesson.dialogue && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <BookOpen className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Percakapan Kontekstual (会話 Kaiwa): {currentLesson.dialogue.title}
                </h3>
              </div>

              <div className="space-y-3">
                {currentLesson.dialogue.lines.map((line, lIdx) => (
                  <div
                    key={lIdx}
                    className="bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200/80 flex items-start gap-3"
                  >
                    <div className="w-16 sm:w-20 shrink-0 font-extrabold text-xs text-slate-700 bg-white border border-slate-200/70 px-2 py-1 rounded-lg text-center shadow-2xs">
                      {line.speaker}
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese">
                        {line.jp}
                      </p>
                      <p className="text-xs text-rose-600 font-medium">
                        {line.reading}
                      </p>
                      <p className="text-xs text-slate-600">
                        {line.id}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleSpeak(line.jp, line.reading, e)}
                      className="p-2 rounded-xl bg-white hover:bg-rose-100 text-slate-600 hover:text-rose-700 border border-slate-200/60 transition-colors shrink-0 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
