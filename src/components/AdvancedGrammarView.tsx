import React, { useState, useMemo, useRef } from 'react';
import {
  Volume2,
  BookOpen,
  Sparkles,
  Award,
  Calendar,
  Layers,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Scale,
  Target,
} from 'lucide-react';
import { speakJapanese } from '../utils/audio';
import { shinKanzenData } from '../data/shinKanzenData';
import { souMatomeWeeks } from '../data/souMatomeData';
import { tobiraChapters } from '../data/tobiraData';
import { quartetLessons } from '../data/quartetData';
import { tryJlptLessons } from '../data/tryJlptData';
import { minnaChuukyu1Lessons } from '../data/minnaChuukyu1';

interface AdvancedGrammarViewProps {
  speechRate: number;
  onPracticeGrammar?: (level: 'N3', id: string) => void;
  onStartQuiz?: (level: 'N3', id: string) => void;
}

export const AdvancedGrammarView: React.FC<AdvancedGrammarViewProps> = ({
  speechRate,
  onPracticeGrammar,
  onStartQuiz,
}) => {
  // Navigation filters
  const [levelFilter, setLevelFilter] = useState<'all' | 'N3'>('all');
  const [tabMode, setTabMode] = useState<'thematic' | 'traps_nuances' | 'daily_program' | 'exam_drills'>('thematic');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Thematic selection
  const [selectedTopicId, setSelectedTopicId] = useState<string>('tobira_1');

  // Traps & Nuance selection
  const [selectedNuanceId, setSelectedNuanceId] = useState<string>('sk_n3_1');
  const [revealedNuanceDrills, setRevealedNuanceDrills] = useState<Record<string, boolean>>({});
  const [userNuanceChoices, setUserNuanceChoices] = useState<Record<string, number>>({});

  // Daily program selection
  const [programWeek, setProgramWeek] = useState<number>(1);
  const [programDay, setProgramDay] = useState<number>(1);
  const [revealedDayQuestions, setRevealedDayQuestions] = useState<Record<number, boolean>>({});

  // Exam Drill selection
  const [selectedDrillLevel, setSelectedDrillLevel] = useState<'N3'>('N3');
  const [revealedExamDrills, setRevealedExamDrills] = useState<Record<string, boolean>>({});
  const [userExamChoices, setUserExamChoices] = useState<Record<string, number>>({});

  const workspaceRef = useRef<HTMLDivElement | null>(null);

  // Unified Thematic Grammar Topics
  const thematicTopics = useMemo(() => {
    const list: Array<{
      id: string;
      level: 'N3';
      categoryTitle: string;
      theme: string;
      patterns: Array<{
        pattern: string;
        formula?: string;
        explanation: string;
        examples: Array<{ jp: string; reading?: string; id: string }>;
      }>;
    }> = [];

    // From Tobira
    tobiraChapters.forEach((ch) => {
      list.push({
        id: `tobira_${ch.chapter}`,
        level: ch.level,
        categoryTitle: `Topik ${ch.chapter}: ${ch.titleJp} (${ch.titleId})`,
        theme: ch.theme,
        patterns: ch.grammarPatterns.map((g) => ({
          pattern: g.pattern,
          formula: g.formula,
          explanation: g.explanation,
          examples: g.examples,
        })),
      });
    });

    // From Quartet
    quartetLessons.forEach((ql) => {
      list.push({
        id: `quartet_v${ql.volume}_l${ql.lesson}`,
        level: ql.level,
        categoryTitle: `Unit ${ql.lesson}: ${ql.titleJp} (${ql.titleId})`,
        theme: ql.theme,
        patterns: ql.grammarPatterns.map((g) => ({
          pattern: g.pattern,
          formula: g.formula,
          explanation: g.explanation,
          examples: g.examples,
        })),
      });
    });

    // From TRY!
    tryJlptLessons.forEach((tl) => {
      list.push({
        id: `try_${tl.level}_ch${tl.chapter}`,
        level: tl.level,
        categoryTitle: `Modul ${tl.chapter}: ${tl.chapterTitleJp} (${tl.chapterTitleId})`,
        theme: tl.canDoGoal,
        patterns: tl.grammarPoints.map((g) => ({
          pattern: g.pattern,
          formula: g.formula,
          explanation: `${g.meaningId} • ${g.explanation}`,
          examples: g.examples,
        })),
      });
    });

    // From Minna Chuukyu
    minnaChuukyu1Lessons.forEach((ml) => {
      list.push({
        id: `chuukyu_ch${ml.chapter}`,
        level: 'N3',
        categoryTitle: `${ml.title}`,
        theme: ml.theme,
        patterns: ml.grammarPatterns.map((g) => ({
          pattern: g.pattern,
          formula: g.formula,
          explanation: g.explanation,
          examples: g.examples.map((ex) => ({
            jp: ex.jp,
            reading: ex.reading,
            id: ex.id,
          })),
        })),
      });
    });

    return list;
  }, []);

  // Filter thematic topics
  const filteredThematicTopics = useMemo(() => {
    return thematicTopics.filter((t) => {
      if (levelFilter !== 'all' && t.level !== levelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = t.categoryTitle.toLowerCase().includes(q);
        const matchTheme = t.theme.toLowerCase().includes(q);
        const matchPatterns = t.patterns.some(
          (p) =>
            p.pattern.toLowerCase().includes(q) ||
            p.explanation.toLowerCase().includes(q)
        );
        return matchTitle || matchTheme || matchPatterns;
      }
      return true;
    });
  }, [thematicTopics, levelFilter, searchQuery]);

  // Current selected thematic topic
  const currentThematicTopic = useMemo(() => {
    return (
      filteredThematicTopics.find((t) => t.id === selectedTopicId) ||
      filteredThematicTopics[0] ||
      thematicTopics[0]
    );
  }, [filteredThematicTopics, selectedTopicId, thematicTopics]);

  // Nuances & Traps (from Shin Kanzen Master)
  const filteredNuanceItems = useMemo(() => {
    return shinKanzenData.filter((item) => {
      if (levelFilter !== 'all' && item.level !== levelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          item.unitTitleJp.toLowerCase().includes(q) ||
          item.unitTitleId.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q) ||
          item.patternsOrPoints.some(
            (p) =>
              p.title.toLowerCase().includes(q) ||
              p.nuance.toLowerCase().includes(q) ||
              (p.trapWarning && p.trapWarning.toLowerCase().includes(q))
          )
        );
      }
      return true;
    });
  }, [levelFilter, searchQuery]);

  const currentNuanceItem = useMemo(() => {
    return (
      filteredNuanceItems.find((n) => n.id === selectedNuanceId) ||
      filteredNuanceItems[0] ||
      shinKanzenData[0]
    );
  }, [filteredNuanceItems, selectedNuanceId]);

  // Daily Program (from Sou-matome)
  const dailyProgramWeeks = useMemo(() => {
    const lvl = levelFilter === 'all' ? 'N3' : levelFilter;
    return souMatomeWeeks.filter((w) => w.level === lvl);
  }, [levelFilter]);

  const currentProgramWeek = useMemo(() => {
    return (
      dailyProgramWeeks.find((w) => w.weekNumber === programWeek) ||
      dailyProgramWeeks[0] ||
      souMatomeWeeks[0]
    );
  }, [dailyProgramWeeks, programWeek]);

  const currentProgramDay = useMemo(() => {
    return (
      currentProgramWeek.days.find((d) => d.dayNumber === programDay) ||
      currentProgramWeek.days[0]
    );
  }, [currentProgramWeek, programDay]);

  const handleSpeak = (text: string, reading?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Unified Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-rose-950 to-indigo-950 rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-rose-900/30">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2 text-rose-200">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pusat Tata Bahasa &amp; Pola Kalimat Lanjutan</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Tingkat Menengah (N3)
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1 leading-relaxed">
            Kurikulum tata bahasa terpadu: pola kalimat tematik, bedah nuansa tipis (*Confusing Pairs*), peringatan jebakan ujian, dan latihan soal terarah.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/5 select-none pointer-events-none text-9xl font-black font-serif">
          文
        </div>
      </div>

      {/* Control Bar: Level Filter & Sub-Mode Tabs */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Level Filter Tabs */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs gap-1">
            {(['all', 'N3'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setLevelFilter(lvl)}
                className={`flex-1 sm:flex-none px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  levelFilter === lvl
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {lvl === 'all' ? 'Semua Materi (N3)' : lvl}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pola tata bahasa (contoh: ~わりに, ~べき, ~あげく)..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-slate-200/90 rounded-2xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400 shadow-2xs"
            />
          </div>
        </div>

        {/* Feature Sub-Mode Tabs */}
        <div className="flex items-center bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar gap-1.5">
          <button
            onClick={() => setTabMode('thematic')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              tabMode === 'thematic'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4 text-rose-600" />
            <span>Pola Tata Bahasa Tematik</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 font-mono">
              {filteredThematicTopics.length}
            </span>
          </button>

          <button
            onClick={() => setTabMode('traps_nuances')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              tabMode === 'traps_nuances'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-4 h-4 text-amber-600" />
            <span>Bedah Nuansa &amp; Pasangan Mirip</span>
          </button>

          <button
            onClick={() => setTabMode('daily_program')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              tabMode === 'daily_program'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Program Belajar Harian (6 Minggu)</span>
          </button>

          <button
            onClick={() => setTabMode('exam_drills')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
              tabMode === 'exam_drills'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Target className="w-4 h-4 text-indigo-600" />
            <span>Drill Soal Ujian &amp; Pembahasan</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* SUB-MODE 1: THEMATIC GRAMMAR PATTERNS                                    */}
      {/* ========================================================================= */}
      {tabMode === 'thematic' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start" ref={workspaceRef}>
          {/* Left Topic Selector */}
          <div className="lg:col-span-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-2 px-1">
              <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                Daftar Topik ({filteredThematicTopics.length})
              </span>
              {/* Quick Jump Dropdown */}
              <select
                value={selectedTopicId}
                onChange={(e) => handleSelectTopic(e.target.value)}
                className="text-xs bg-white border border-slate-200 text-slate-700 rounded-xl px-2 py-1 font-bold focus:outline-none focus:ring-1 focus:ring-rose-400 max-w-[180px] truncate cursor-pointer shadow-2xs"
                title="Lompat ke topik tertentu"
              >
                {filteredThematicTopics.map((top) => (
                  <option key={top.id} value={top.id}>
                    [{top.level}] {top.categoryTitle}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2 max-h-[560px] overflow-y-auto pr-1">
              {filteredThematicTopics.map((top) => {
              const isSelected = currentThematicTopic?.id === top.id;
              return (
                <button
                  key={top.id}
                  onClick={() => handleSelectTopic(top.id)}
                  className={`flex flex-col text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-rose-50/90 border-rose-300 ring-2 ring-rose-200 shadow-xs'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-700">
                      {top.level}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-bold">
                      {top.patterns.length} pola
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {top.categoryTitle}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{top.theme}</p>
                </button>
              );
            })}
            </div>
          </div>

          {/* Right Topic Details */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {currentThematicTopic ? (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs flex flex-col gap-5">
                {/* Topic Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-rose-100 text-rose-700">
                        {currentThematicTopic.level}
                      </span>
                      <span className="text-xs text-slate-400 font-bold">
                        {currentThematicTopic.patterns.length} Pola Tata Bahasa
                      </span>
                    </div>
                    <h2 className="text-lg sm:text-xl font-black text-slate-900">
                      {currentThematicTopic.categoryTitle}
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                      {currentThematicTopic.theme}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    {onPracticeGrammar && (
                      <button
                        onClick={() =>
                          onPracticeGrammar(
                            currentThematicTopic.level,
                            currentThematicTopic.id
                          )
                        }
                        className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                      >
                        ⚡ Flashcard
                      </button>
                    )}
                    {onStartQuiz && (
                      <button
                        onClick={() =>
                          onStartQuiz(
                            currentThematicTopic.level,
                            currentThematicTopic.id
                          )
                        }
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                      >
                        🎯 Mulai Kuis
                      </button>
                    )}
                  </div>
                </div>

                {/* Pattern List */}
                <div className="flex flex-col gap-4">
                  {currentThematicTopic.patterns.map((pat, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 transition-all flex flex-col gap-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-base sm:text-lg font-black text-rose-700 font-jp">
                              {pat.pattern}
                            </span>
                            <button
                              onClick={(e) => handleSpeak(pat.pattern, undefined, e)}
                              className="w-7 h-7 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 flex items-center justify-center cursor-pointer transition-colors"
                              title="Dengarkan Pelafalan"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {pat.formula && (
                        <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 text-xs font-mono text-slate-700">
                          <span className="font-bold text-slate-500">Rumus: </span>
                          {pat.formula}
                        </div>
                      )}

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {pat.explanation}
                      </p>

                      {/* Examples */}
                      {pat.examples && pat.examples.length > 0 && (
                        <div className="flex flex-col gap-2 pt-2 border-t border-slate-200/60">
                          <span className="text-[11px] font-bold text-slate-400 uppercase">
                            Contoh Kalimat:
                          </span>
                          {pat.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="flex items-start justify-between gap-2 p-2.5 rounded-xl bg-white border border-slate-200/60"
                            >
                              <div className="min-w-0">
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 font-jp">
                                  {ex.jp}
                                </p>
                                {ex.reading && (
                                  <p className="text-[11px] text-slate-400 font-mono">
                                    {ex.reading}
                                  </p>
                                )}
                                <p className="text-xs text-slate-600 mt-0.5">{ex.id}</p>
                              </div>
                              <button
                                onClick={(e) => handleSpeak(ex.jp, ex.reading, e)}
                                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-600 flex items-center justify-center shrink-0 cursor-pointer transition-colors"
                                title="Putar audio contoh kalimat"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center text-slate-500 text-sm">
                Pilih topik dari daftar sebelah kiri.
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODE 2: TRAPS & NUANCES (Confusing Pairs & Nuance Dissection)          */}
      {/* ========================================================================= */}
      {tabMode === 'traps_nuances' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          {/* Left Nuance List */}
          <div className="lg:col-span-4 flex flex-col gap-2 max-h-[600px] overflow-y-auto pr-1">
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider px-1">
              Unit Bedah Nuansa ({filteredNuanceItems.length})
            </span>
            {filteredNuanceItems.map((n) => {
              const isSelected = currentNuanceItem?.id === n.id;
              return (
                <button
                  key={n.id}
                  onClick={() => setSelectedNuanceId(n.id)}
                  className={`flex flex-col text-left p-3 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50/90 border-amber-300 ring-2 ring-amber-200 shadow-xs'
                      : 'bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800">
                      {n.level}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400 font-bold uppercase">
                      {n.section}
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                    {n.unitTitleJp}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.unitTitleId}</p>
                </button>
              );
            })}
          </div>

          {/* Right Nuance Details */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {currentNuanceItem && (
              <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs flex flex-col gap-5">
                <div className="pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-100 text-amber-800">
                      {currentNuanceItem.level} &bull; {currentNuanceItem.section.toUpperCase()}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900">
                    {currentNuanceItem.unitTitleJp} ({currentNuanceItem.unitTitleId})
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {currentNuanceItem.explanation}
                  </p>
                </div>

                {/* Patterns & Nuance Comparison */}
                <div className="flex flex-col gap-4">
                  {currentNuanceItem.patternsOrPoints.map((pt, idx) => (
                    <div
                      key={idx}
                      className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-base sm:text-lg font-black text-slate-900 font-jp">
                          {pt.title}
                        </span>
                        <button
                          onClick={(e) => handleSpeak(pt.title, undefined, e)}
                          className="w-7 h-7 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {pt.formula && (
                        <div className="p-2 bg-white rounded-lg border border-slate-200/60 text-xs font-mono text-slate-700">
                          <span className="font-bold text-slate-500">Rumus: </span>
                          {pt.formula}
                        </div>
                      )}

                      <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <span className="font-bold text-amber-700 block mb-1">
                          🔍 Bedah Nuansa &amp; Konteks Penggunaan:
                        </span>
                        {pt.nuance}
                      </div>

                      {pt.trapWarning && (
                        <div className="p-3 bg-rose-50/80 rounded-xl border border-rose-200 text-xs text-rose-800 leading-relaxed flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold block">⚠️ Peringatan Jebakan Ujian:</span>
                            {pt.trapWarning}
                          </div>
                        </div>
                      )}

                      {/* Example Sentences */}
                      {pt.examples && pt.examples.length > 0 && (
                        <div className="flex flex-col gap-2 pt-2">
                          <span className="text-[11px] font-bold text-slate-400 uppercase">
                            Contoh Kontekstual:
                          </span>
                          {pt.examples.map((ex, exIdx) => (
                            <div
                              key={exIdx}
                              className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-start justify-between gap-2"
                            >
                              <div>
                                <p className="text-xs sm:text-sm font-semibold text-slate-900 font-jp">
                                  {ex.jp}
                                </p>
                                <p className="text-xs text-slate-600 mt-0.5">{ex.id}</p>
                              </div>
                              <button
                                onClick={(e) => handleSpeak(ex.jp, undefined, e)}
                                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center shrink-0 cursor-pointer"
                              >
                                <Volume2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Mastery Drills */}
                {currentNuanceItem.masteryDrill && currentNuanceItem.masteryDrill.length > 0 && (
                  <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                    <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-rose-600" />
                      <span>Simulasi Soal Drill Unit Ini:</span>
                    </h3>

                    {currentNuanceItem.masteryDrill.map((d, dIdx) => {
                      const drillKey = `${currentNuanceItem.id}_d_${dIdx}`;
                      const isRevealed = revealedNuanceDrills[drillKey];
                      const userChoice = userNuanceChoices[drillKey];

                      return (
                        <div
                          key={dIdx}
                          className="p-4 rounded-2xl bg-amber-50/40 border border-amber-200/70 flex flex-col gap-3"
                        >
                          <p className="text-xs sm:text-sm font-bold text-slate-900 font-jp">
                            {dIdx + 1}. {d.questionJp}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {d.options.map((opt, oIdx) => {
                              const isSelected = userChoice === oIdx;
                              const isCorrect = oIdx === d.correctIndex;

                              let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-amber-400';
                              if (isRevealed) {
                                if (isCorrect) btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                                else if (isSelected) btnStyle = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                              } else if (isSelected) {
                                btnStyle = 'bg-amber-100 border-amber-400 text-amber-900 font-bold';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() =>
                                    setUserNuanceChoices((prev) => ({
                                      ...prev,
                                      [drillKey]: oIdx,
                                    }))
                                  }
                                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${btnStyle}`}
                                >
                                  {oIdx + 1}. {opt}
                                </button>
                              );
                            })}
                          </div>

                          <div className="flex items-center justify-between pt-1">
                            <button
                              onClick={() =>
                                setRevealedNuanceDrills((prev) => ({
                                  ...prev,
                                  [drillKey]: !prev[drillKey],
                                }))
                              }
                              className="text-xs font-bold text-amber-800 hover:underline cursor-pointer"
                            >
                              {isRevealed ? 'Sembunyikan Kunci & Penjelasan' : '💡 Buka Kunci Jawaban'}
                            </button>
                          </div>

                          {isRevealed && (
                            <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700 leading-relaxed">
                              <span className="font-bold text-emerald-700 block mb-0.5">
                                Jawaban Benar: Nomor {d.correctIndex + 1} ({d.options[d.correctIndex]})
                              </span>
                              {d.analysisId}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODE 3: DAILY 6-WEEK PROGRAM                                         */}
      {/* ========================================================================= */}
      {tabMode === 'daily_program' && (
        <div className="flex flex-col gap-4">
          {/* Week Selector */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {dailyProgramWeeks.map((w) => (
              <button
                key={`${w.level}-w${w.weekNumber}`}
                onClick={() => {
                  setProgramWeek(w.weekNumber);
                  setProgramDay(1);
                  setRevealedDayQuestions({});
                }}
                className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  currentProgramWeek?.weekNumber === w.weekNumber
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white border border-slate-200/90 text-slate-600 hover:bg-slate-50'
                }`}
              >
                Minggu {w.weekNumber}: {w.weekTitleId}
              </button>
            ))}
          </div>

          {/* Day Selector Ribbon */}
          {currentProgramWeek && (
            <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {currentProgramWeek.days.map((d) => (
                <button
                  key={`w${currentProgramWeek.weekNumber}-d${d.dayNumber}`}
                  onClick={() => {
                    setProgramDay(d.dayNumber);
                    setRevealedDayQuestions({});
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                    currentProgramDay?.dayNumber === d.dayNumber
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Hari {d.dayNumber} ({d.dayTitle})
                </button>
              ))}
            </div>
          )}

          {/* Day Content */}
          {currentProgramDay && (
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs flex flex-col gap-5">
              <div className="pb-4 border-b border-slate-100">
                <span className="text-xs font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                  {currentProgramWeek?.level} &bull; Minggu {currentProgramWeek?.weekNumber} &bull; Hari {currentProgramDay.dayNumber}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-2">
                  {currentProgramDay.themeJp} ({currentProgramDay.themeId})
                </h2>
              </div>

              {/* Target Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentProgramDay.targetItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-base font-black text-slate-900 font-jp">
                        {item.japanese}
                      </span>
                      <button
                        onClick={(e) => handleSpeak(item.japanese, item.reading, e)}
                        className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 flex items-center justify-center cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs font-bold text-slate-700">
                      {item.meaningId}
                    </p>

                    {item.collocationOrUsage && (
                      <p className="text-[11px] text-slate-500 bg-white p-2 rounded-lg border border-slate-200/50">
                        {item.collocationOrUsage}
                      </p>
                    )}

                    {item.sampleSentenceJp && (
                      <div className="p-2.5 bg-white rounded-xl border border-slate-200/60 text-xs text-slate-700">
                        <p className="font-semibold font-jp">{item.sampleSentenceJp}</p>
                        <p className="text-slate-500 text-[11px] mt-0.5">{item.sampleSentenceId}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Daily Mini Test */}
              {currentProgramDay.dailyMiniTest && currentProgramDay.dailyMiniTest.length > 0 && (
                <div className="pt-4 border-t border-slate-200 flex flex-col gap-3">
                  <h3 className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Latihan Cepat Hari Ini:</span>
                  </h3>

                  {currentProgramDay.dailyMiniTest.map((q, qIdx) => {
                    const isRevealed = revealedDayQuestions[qIdx];
                    return (
                      <div
                        key={qIdx}
                        className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-200/70 flex flex-col gap-2"
                      >
                        <p className="text-xs sm:text-sm font-bold text-slate-900 font-jp">
                          {qIdx + 1}. {q.questionJp}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          {q.options.map((opt, oIdx) => (
                            <span
                              key={oIdx}
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs text-slate-700"
                            >
                              ({oIdx + 1}) {opt}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() =>
                            setRevealedDayQuestions((prev) => ({
                              ...prev,
                              [qIdx]: !prev[qIdx],
                            }))
                          }
                          className="text-xs font-bold text-emerald-800 hover:underline cursor-pointer text-left pt-1"
                        >
                          {isRevealed ? 'Tutup Kunci Jawaban' : '💡 Buka Kunci Jawaban'}
                        </button>

                        {isRevealed && (
                          <div className="p-2.5 bg-white rounded-xl border border-emerald-200 text-xs text-emerald-800 font-semibold">
                            Jawaban: Pilihan {q.correctIndex + 1} ({q.options[q.correctIndex]}) &bull; {q.explanation}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* SUB-MODE 4: EXAM DRILLS & JLPT SIMULATION                                */}
      {/* ========================================================================= */}
      {tabMode === 'exam_drills' && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200/90 shadow-2xs">
            <button
              onClick={() => setSelectedDrillLevel('N3')}
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-indigo-600 text-white shadow-xs"
            >
              Simulasi Drill N3
            </button>
          </div>

          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs flex flex-col gap-4">
            <h3 className="text-base font-black text-slate-900">
              Kumpulan Latihan Soal Standar Ujian JLPT {selectedDrillLevel}
            </h3>
            <p className="text-xs text-slate-500">
              Pilih jawaban yang paling tepat, lalu buka kunci jawaban untuk melihat analisis pembahasannya.
            </p>

            {/* Render Drills from Shin Kanzen for selected level */}
            <div className="flex flex-col gap-4 mt-2">
              {shinKanzenData
                .filter((s) => s.level === selectedDrillLevel && s.masteryDrill && s.masteryDrill.length > 0)
                .map((unit) => (
                  <div
                    key={unit.id}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col gap-3"
                  >
                    <span className="text-xs font-bold text-indigo-700 uppercase">
                      Topik: {unit.unitTitleJp} ({unit.unitTitleId})
                    </span>

                    {unit.masteryDrill?.map((dr, dIdx) => {
                      const dKey = `exam_${unit.id}_${dIdx}`;
                      const isRevealed = revealedExamDrills[dKey];
                      const userChoice = userExamChoices[dKey];

                      return (
                        <div key={dIdx} className="flex flex-col gap-2.5 pt-2 border-t border-slate-200/60">
                          <p className="text-xs sm:text-sm font-bold text-slate-900 font-jp">
                            {dIdx + 1}. {dr.questionJp}
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {dr.options.map((opt, oIdx) => {
                              const isSelected = userChoice === oIdx;
                              const isCorrect = oIdx === dr.correctIndex;

                              let btnClass = 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300';
                              if (isRevealed) {
                                if (isCorrect) btnClass = 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                                else if (isSelected) btnClass = 'bg-rose-100 border-rose-400 text-rose-900 line-through';
                              } else if (isSelected) {
                                btnClass = 'bg-indigo-100 border-indigo-400 text-indigo-900 font-bold';
                              }

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() =>
                                    setUserExamChoices((prev) => ({
                                      ...prev,
                                      [dKey]: oIdx,
                                    }))
                                  }
                                  className={`p-2.5 rounded-xl border text-xs text-left transition-all cursor-pointer ${btnClass}`}
                                >
                                  {oIdx + 1}. {opt}
                                </button>
                              );
                            })}
                          </div>

                          <button
                            onClick={() =>
                              setRevealedExamDrills((prev) => ({
                                ...prev,
                                [dKey]: !prev[dKey],
                              }))
                            }
                            className="text-xs font-bold text-indigo-700 hover:underline cursor-pointer text-left pt-1"
                          >
                            {isRevealed ? 'Sembunyikan Pembahasan' : '💡 Buka Kunci Jawaban & Pembahasan'}
                          </button>

                          {isRevealed && (
                            <div className="p-3 bg-white rounded-xl border border-emerald-200 text-xs text-slate-700">
                              <span className="font-bold text-emerald-700 block mb-0.5">
                                Kunci: Pilihan {dr.correctIndex + 1} ({dr.options[dr.correctIndex]})
                              </span>
                              {dr.analysisId}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
