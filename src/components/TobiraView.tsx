import React, { useState, useMemo, useRef } from 'react';
import { TobiraChapter } from '../types';
import { tobiraChapters } from '../data/tobiraData';
import {
  Volume2,
  BookOpen,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Search,
  Globe,
  Feather,
  Layers,
} from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface TobiraViewProps {
  speechRate: number;
  onPracticeChapter?: (chapter: number) => void;
  onStartQuiz?: (chapter: number) => void;
}

export const TobiraView: React.FC<TobiraViewProps> = ({
  speechRate,
  onPracticeChapter,
  onStartQuiz,
}) => {
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [levelFilter, setLevelFilter] = useState<'all' | 'N3'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [vocabSearch, setVocabSearch] = useState<string>('');
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const filteredChapters = useMemo(() => {
    return tobiraChapters.filter((ch) => {
      if (levelFilter !== 'all' && ch.level !== levelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          ch.titleJp.toLowerCase().includes(q) ||
          ch.titleId.toLowerCase().includes(q) ||
          ch.titleRomaji.toLowerCase().includes(q);
        const matchTheme = ch.theme.toLowerCase().includes(q);
        const matchGrammar = ch.grammarPatterns.some(
          (g) => g.pattern.toLowerCase().includes(q) || g.explanation.toLowerCase().includes(q)
        );
        const matchVocab = ch.keyVocab.some(
          (v) =>
            v.kanji.toLowerCase().includes(q) ||
            v.reading.toLowerCase().includes(q) ||
            v.id.toLowerCase().includes(q)
        );
        return matchTitle || matchTheme || matchGrammar || matchVocab || `bab ${ch.chapter}`.includes(q);
      }
      return true;
    });
  }, [levelFilter, searchQuery]);

  const currentChapter: TobiraChapter = useMemo(() => {
    return tobiraChapters.find((c) => c.chapter === selectedChapterNum) || tobiraChapters[0];
  }, [selectedChapterNum]);

  const filteredVocab = useMemo(() => {
    if (!vocabSearch.trim()) return currentChapter.keyVocab;
    const q = vocabSearch.toLowerCase().trim();
    return currentChapter.keyVocab.filter(
      (v) =>
        v.kanji.toLowerCase().includes(q) ||
        v.reading.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q)
    );
  }, [currentChapter, vocabSearch]);

  const handleSelectChapter = (chapterNum: number) => {
    setSelectedChapterNum(chapterNum);
    setVocabSearch('');
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentIndex = tobiraChapters.findIndex((c) => c.chapter === selectedChapterNum);

  const handlePrevChapter = () => {
    if (currentIndex > 0) {
      handleSelectChapter(tobiraChapters[currentIndex - 1].chapter);
    }
  };

  const handleNextChapter = () => {
    if (currentIndex < tobiraChapters.length - 1) {
      handleSelectChapter(tobiraChapters[currentIndex + 1].chapter);
    }
  };

  const handleSpeak = (text: string, reading?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 via-emerald-700 to-amber-700 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Globe className="w-3.5 h-3.5" />
            <span>Tobira: Gateway to Advanced Japanese (上級へのとびら)</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Eksplorasi Bahasa &amp; Budaya Menengah (N3)
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Materi komprehensif tingkat Menengah (N3) melalui teks wacana autentik, wawasan budaya mendalam, pola tata bahasa terstruktur, dan pengayaan kosakata kontekstual.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          扉
        </div>
      </div>

      {/* Chapter Switcher Controls */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2">
        <button
          onClick={handlePrevChapter}
          disabled={currentIndex <= 0}
          className="min-h-[40px] px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer select-none transition-colors"
          title="Bab Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Sebelumnya</span>
        </button>

        <div className="flex items-center gap-2 flex-1 justify-center max-w-md">
          <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap hidden min-[480px]:inline">
            Pilih Bab:
          </span>
          <select
            value={selectedChapterNum}
            onChange={(e) => handleSelectChapter(Number(e.target.value))}
            className="w-full sm:w-auto bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 cursor-pointer"
          >
            {tobiraChapters.map((ch) => (
              <option key={ch.chapter} value={ch.chapter}>
                Bab {ch.chapter}: {ch.titleJp} ({ch.level})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleNextChapter}
          disabled={currentIndex >= tobiraChapters.length - 1}
          className="min-h-[40px] px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-xs font-bold text-slate-700 flex items-center gap-1 cursor-pointer select-none transition-colors"
          title="Bab Berikutnya"
        >
          <span className="hidden sm:inline">Berikutnya</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar gap-1">
          <button
            onClick={() => setLevelFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              levelFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Semua Tingkat ({tobiraChapters.length})
          </button>
          <button
            onClick={() => setLevelFilter('N3')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              levelFilter === 'N3'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            N3 (Bab 1–4)
          </button>
        </div>

        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari bab, topik, atau pola..."
            className="w-full bg-white pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 shadow-2xs transition-all"
          />
        </div>
      </div>

      {/* Main Layout: Sidebar Chapters + Chapter Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Sidebar Chapters List */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col">
          <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              Daftar Bab Tobira ({filteredChapters.length})
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Bab {currentChapter.chapter} Aktif
            </span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredChapters.map((ch) => {
              const isSelected = ch.chapter === selectedChapterNum;
              return (
                <div
                  key={ch.chapter}
                  onClick={() => handleSelectChapter(ch.chapter)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-emerald-50/90 border-emerald-400 shadow-xs ring-1 ring-emerald-300'
                      : 'bg-white border-slate-200/70 hover:border-emerald-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                        {ch.level}
                      </span>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                        Bab {ch.chapter}: {ch.titleJp}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {ch.titleId}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-emerald-700 translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Workspace: Current Chapter Content */}
        <div ref={workspaceRef} className="lg:col-span-8 flex flex-col gap-5">
          {/* Chapter Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-emerald-100 text-emerald-800">
                  Tobira Bab {currentChapter.chapter}
                </span>
                <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-900">
                  Tingkat {currentChapter.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onPracticeChapter && (
                  <button
                    onClick={() => onPracticeChapter(currentChapter.chapter)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flashcard</span>
                  </button>
                )}
                {onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(currentChapter.chapter)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kuis Bab</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-japanese">
                {currentChapter.titleJp}
              </h2>
              <p className="text-xs text-emerald-700 font-semibold">{currentChapter.titleRomaji}</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {currentChapter.titleId} &bull; <strong className="text-slate-800">Tema:</strong>{' '}
                {currentChapter.theme}
              </p>
            </div>
          </div>

          {/* Section: Cultural Note (文化ノート) */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-3xl border border-amber-200/80 p-5 sm:p-6 shadow-2xs flex flex-col gap-3">
            <div className="flex items-center gap-2 border-b border-amber-200/60 pb-2.5">
              <span className="text-xl">{currentChapter.culturalNote.icon}</span>
              <h3 className="text-sm sm:text-base font-extrabold text-amber-950">
                Wawasan Budaya (文化ノート): {currentChapter.culturalNote.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              {currentChapter.culturalNote.content}
            </p>
          </div>

          {/* Section: Reading Passage (本文 読解 Dokkai) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-700" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Wacana Bacaan (本文): {currentChapter.readingPassage.titleJp}
                </h3>
              </div>
              <button
                onClick={(e) =>
                  handleSpeak(
                    currentChapter.readingPassage.contentJp,
                    currentChapter.readingPassage.contentReading,
                    e
                  )
                }
                title="Dengarkan Seluruh Teks Bacaan"
                className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Audio Wacana</span>
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2.5">
              <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese leading-relaxed">
                {currentChapter.readingPassage.contentJp}
              </p>
              <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                {currentChapter.readingPassage.contentReading}
              </p>
              <div className="pt-2 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Terjemahan:</strong> {currentChapter.readingPassage.contentId}
              </div>
            </div>
          </div>

          {/* Section: Grammar Patterns (文型 Bunkei) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <h3 className="text-base font-extrabold text-slate-900">
                Pola Tata Bahasa Utama (文型 Bunkei)
              </h3>
            </div>

            <div className="space-y-4">
              {currentChapter.grammarPatterns.map((gp, idx) => (
                <div
                  key={gp.id || idx}
                  className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 p-4 transition-all"
                >
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                    {idx + 1}. {gp.pattern}
                  </h4>

                  <div className="bg-white border border-emerald-100 text-emerald-800 font-mono text-xs font-semibold px-3 py-2 rounded-xl mt-2 flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md text-[10px] uppercase font-bold">
                      Rumus
                    </span>
                    <span className="break-all">{gp.formula}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {gp.explanation}
                  </p>

                  {gp.nuanceNote && (
                    <p className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl mt-2 font-medium">
                      💡 <strong>Catatan Nuansa:</strong> {gp.nuanceNote}
                    </p>
                  )}

                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-200/60">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Contoh Kalimat (例文):
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
                          <p className="text-xs text-emerald-700 font-medium">{ex.reading}</p>
                          <p className="text-xs text-slate-600">{ex.id}</p>
                        </div>
                        <button
                          onClick={(e) => handleSpeak(ex.jp, ex.reading, e)}
                          title="Dengarkan Pelafalan Audio"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors shrink-0 cursor-pointer"
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

          {/* Section: Key Vocabulary (重要語彙) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Feather className="w-4 h-4 text-emerald-700" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Kosakata Kunci Bab {currentChapter.chapter} (重要語彙)
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  ({filteredVocab.length} Kata)
                </span>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Cari kata di bab ini..."
                  value={vocabSearch}
                  onChange={(e) => setVocabSearch(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 text-xs rounded-xl pl-8 pr-3 py-1.5 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 text-slate-800 placeholder-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {filteredVocab.map((vocab, vIdx) => (
                <div
                  key={vIdx}
                  className="p-3 bg-slate-50/70 hover:bg-white hover:shadow-xs rounded-2xl border border-slate-200/80 transition-all flex items-center justify-between gap-2.5"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base font-extrabold text-slate-900 font-japanese">
                        {vocab.kanji}
                      </span>
                      <span className="text-xs text-emerald-700 font-semibold truncate">
                        {vocab.reading}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5 font-medium line-clamp-1" title={vocab.id}>
                      {vocab.id} &bull; <span className="text-slate-400 text-[10px]">{vocab.type}</span>
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleSpeak(vocab.kanji, vocab.reading, e)}
                    className="p-2 rounded-xl bg-white hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 border border-slate-200/60 shadow-2xs transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
