import React, { useState, useMemo, useRef } from 'react';
import { MinnaLesson } from '../types';
import { allMinnaLessons } from '../data';
import { Volume2, BookOpen, Layers, Search, CheckCircle2, ChevronRight, ChevronLeft, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface MinnaViewProps {
  speechRate: number;
  onPracticeLesson?: (chapter: number) => void;
}

export const MinnaView: React.FC<MinnaViewProps> = ({ speechRate, onPracticeLesson }) => {
  const [selectedChapter, setSelectedChapter] = useState<number>(1);
  const [filterPart, setFilterPart] = useState<'all' | 'shokyu1' | 'shokyu2'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileListExpanded, setIsMobileListExpanded] = useState<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  // Filter lessons based on part and search
  const filteredLessons = useMemo(() => {
    return allMinnaLessons.filter((l) => {
      if (filterPart === 'shokyu1' && l.chapter > 25) return false;
      if (filterPart === 'shokyu2' && l.chapter <= 25) return false;
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
    return allMinnaLessons.find((l) => l.chapter === selectedChapter) || allMinnaLessons[0];
  }, [selectedChapter]);

  const handleSelectChapter = (chapter: number) => {
    setSelectedChapter(chapter);
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePrevChapter = () => {
    if (selectedChapter > 1) {
      handleSelectChapter(selectedChapter - 1);
    }
  };

  const handleNextChapter = () => {
    if (selectedChapter < 50) {
      handleSelectChapter(selectedChapter + 1);
    }
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-700 via-rose-600 to-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Kurikulum Standar Minna no Nihongo (みんなの日本語)</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Pelajaran Lengkap Bab 1 – 50
          </h1>
          <p className="text-rose-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Mencakup seluruh tata bahasa penting (Bunkei &amp; Reibun), kosakata terstruktur, pola konjugasi, dan percakapan kontekstual dari Shokyu I (N5) hingga Shokyu II (N4).
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          日
        </div>
      </div>

      {/* Quick Chapter Switcher for Mobile & PC */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2">
        <button
          onClick={handlePrevChapter}
          disabled={selectedChapter <= 1}
          className="min-h-[40px] px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer select-none transition-colors"
          title="Bab Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex items-center gap-2 flex-1 justify-center max-w-md">
          <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap hidden min-[480px]:inline">
            Lompat ke:
          </span>
          <select
            value={selectedChapter}
            onChange={(e) => handleSelectChapter(Number(e.target.value))}
            className="w-full sm:w-auto bg-rose-50/80 border border-rose-200 text-rose-800 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-rose-400 cursor-pointer"
          >
            {allMinnaLessons.map((l) => (
              <option key={l.chapter} value={l.chapter}>
                Bab {l.chapter}: {l.title} ({l.level})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleNextChapter}
          disabled={selectedChapter >= 50}
          className="min-h-[40px] px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer select-none transition-colors"
          title="Bab Berikutnya"
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Part Tabs */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setFilterPart('all')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterPart === 'all'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Semua (1–50)
          </button>
          <button
            onClick={() => setFilterPart('shokyu1')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterPart === 'shokyu1'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Shokyu I &bull; N5 (1–25)
          </button>
          <button
            onClick={() => setFilterPart('shokyu2')}
            className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              filterPart === 'shokyu2'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Shokyu II &bull; N4 (26–50)
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
              const isSelected = lesson.chapter === currentLesson.chapter;
              return (
                <button
                  key={lesson.chapter}
                  onClick={() => handleSelectChapter(lesson.chapter)}
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
                        Bab {lesson.chapter}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-1.5 py-0.2 rounded-md ${
                          lesson.level === 'N5'
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-indigo-100 text-indigo-700'
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
                  Bab {currentLesson.chapter}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-xl">
                  {currentLesson.part}
                </span>
                <span
                  className={`text-xs font-extrabold px-2.5 py-1 rounded-xl ${
                    currentLesson.level === 'N5'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                  }`}
                >
                  Target JLPT {currentLesson.level}
                </span>
              </div>

              {onPracticeLesson && (
                <button
                  onClick={() => onPracticeLesson(currentLesson.chapter)}
                  className="inline-flex items-center gap-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Hafal Kosakata Bab Ini</span>
                </button>
              )}
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
                          onClick={(e) => handleSpeak(ex.jp, e)}
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
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-rose-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Kosakata Kunci Bab {currentLesson.chapter} (言葉 Kotoba)
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {currentLesson.keyVocab.length} Kata
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentLesson.keyVocab.map((vocab, vIdx) => (
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
                    onClick={(e) => handleSpeak(vocab.jp, e)}
                    className="p-2 rounded-xl bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 border border-slate-200/60 shadow-2xs transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
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
                      onClick={(e) => handleSpeak(line.jp, e)}
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
