import React, { useState, useMemo } from 'react';
import { ShinKanzenItem } from '../types';
import { shinKanzenData } from '../data/shinKanzenData';
import {
  Volume2,
  Award,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  Layers,
  Scale,
} from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface ShinKanzenViewProps {
  speechRate: number;
  onPracticeSection?: (level: 'N3', id: string) => void;
  onStartQuiz?: (level: 'N3', id: string) => void;
}

export const ShinKanzenView: React.FC<ShinKanzenViewProps> = ({
  speechRate,
  onPracticeSection,
  onStartQuiz,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'all' | 'N3'>('all');
  const [selectedSection, setSelectedSection] = useState<'all' | 'bunpou' | 'goi' | 'kanji' | 'dokkai' | 'choukai'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [revealedDrills, setRevealedDrills] = useState<Record<string, boolean>>({});
  const [userSelectedChoices, setUserSelectedChoices] = useState<Record<string, number>>({});

  const filteredItems = useMemo(() => {
    return shinKanzenData.filter((item) => {
      if (selectedLevel !== 'all' && item.level !== selectedLevel) return false;
      if (selectedSection !== 'all' && item.section !== selectedSection) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle =
          item.unitTitleJp.toLowerCase().includes(q) ||
          item.unitTitleId.toLowerCase().includes(q);
        const matchExpl = item.explanation.toLowerCase().includes(q);
        const matchFocus = item.focusCore.toLowerCase().includes(q);
        const matchPatterns = item.patternsOrPoints.some(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.nuance.toLowerCase().includes(q) ||
            (p.trapWarning && p.trapWarning.toLowerCase().includes(q))
        );
        return matchTitle || matchExpl || matchFocus || matchPatterns;
      }
      return true;
    });
  }, [selectedLevel, selectedSection, searchQuery]);

  const toggleDrillReveal = (drillKey: string) => {
    setRevealedDrills((prev) => ({ ...prev, [drillKey]: !prev[drillKey] }));
  };

  const handleSelectOption = (drillKey: string, optionIndex: number) => {
    setUserSelectedChoices((prev) => ({ ...prev, [drillKey]: optionIndex }));
  };

  const handleSpeak = (text: string, reading?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-800 via-rose-800 to-amber-800 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Award className="w-3.5 h-3.5" />
            <span>Shin Kanzen Master (新完全マスター) N3</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Bedah Tuntas Jebakan &amp; Pola Ujian JLPT Standar Ketat (N3)
          </h1>
          <p className="text-red-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Metode legendaris untuk menganalisis nuansa tipis tata bahasa, sinonim kata kerja majemuk, idiom kanji, strategi dokkai N3, dan jebakan choukai.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          完
        </div>
      </div>

      {/* Filter and Section Selector */}
      <div className="flex flex-col gap-3">
        {/* Level Selector */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setSelectedLevel('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedLevel === 'all'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Semua Modul ({shinKanzenData.length})
            </button>
            <button
              onClick={() => setSelectedLevel('N3')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
                selectedLevel === 'N3'
                  ? 'bg-red-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              N3 Master
            </button>
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari pola, topik, jebakan..."
              className="w-full bg-white pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-red-400 shadow-2xs transition-all"
            />
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar gap-1">
          <button
            onClick={() => setSelectedSection('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedSection === 'all'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Semua Bagian
          </button>
          <button
            onClick={() => setSelectedSection('bunpou')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedSection === 'bunpou'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            文法 (Tata Bahasa &amp; Nuansa)
          </button>
          <button
            onClick={() => setSelectedSection('goi')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedSection === 'goi'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            語彙 (Kosakata &amp; Idiom)
          </button>
          <button
            onClick={() => setSelectedSection('kanji')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedSection === 'kanji'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            漢字 (Kanji &amp; Yojijukugo)
          </button>
          <button
            onClick={() => setSelectedSection('dokkai')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedSection === 'dokkai'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            読解 (Wacana &amp; Argumen)
          </button>
          <button
            onClick={() => setSelectedSection('choukai')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
              selectedSection === 'choukai'
                ? 'bg-slate-800 text-white'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            聴解 (Respon Cepat &amp; Intonasi)
          </button>
        </div>
      </div>

      {/* Items Feed */}
      <div className="flex flex-col gap-5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 text-slate-500 text-sm">
            Tidak ada materi Shin Kanzen Master yang cocok dengan filter yang dipilih.
          </div>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4"
            >
              {/* Header unit */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-xl text-xs font-black bg-red-100 text-red-800">
                    {item.level}
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 uppercase">
                    {item.section}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {onPracticeSection && (
                    <button
                      onClick={() => onPracticeSection(item.level, item.id)}
                      className="px-3 py-1 rounded-xl bg-red-50 hover:bg-red-100 text-red-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Flashcard</span>
                    </button>
                  )}
                  {onStartQuiz && (
                    <button
                      onClick={() => onStartQuiz(item.level, item.id)}
                      className="px-3 py-1 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Kuis Modul</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Unit Title & Focus */}
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-japanese">
                  {item.unitTitleJp}
                </h3>
                <p className="text-xs sm:text-sm text-red-800 font-bold mt-0.5">
                  {item.unitTitleId}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                  <strong className="text-slate-900">Fokus Kunci:</strong> {item.focusCore}
                </p>
              </div>

              {/* General Explanation */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {item.explanation}
              </p>

              {/* Core Patterns / Points Breakdown */}
              <div className="space-y-4 pt-1">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Pola Tata Bahasa &amp; Titik Analisis:
                </span>
                {item.patternsOrPoints.map((pt, pIdx) => (
                  <div
                    key={pIdx}
                    className="bg-slate-50/80 rounded-2xl border border-slate-200/80 p-4 space-y-3"
                  >
                    <div>
                      <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-japanese">
                        {pIdx + 1}. {pt.title}
                      </h4>
                      {pt.formula && (
                        <div className="bg-white border border-red-200 text-red-900 font-mono text-xs font-semibold px-3 py-1.5 rounded-xl mt-1.5 flex items-center gap-2">
                          <span className="bg-red-100 text-red-800 px-1.5 py-0.5 rounded-md text-[10px] uppercase font-bold">
                            Rumus
                          </span>
                          <span className="break-all">{pt.formula}</span>
                        </div>
                      )}
                      <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                        <strong className="text-slate-800">Nuansa:</strong> {pt.nuance}
                      </p>
                    </div>

                    {/* Trap Warning if present */}
                    {pt.trapWarning && (
                      <div className="bg-amber-50 border border-amber-300/80 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div>
                          <strong>Peringatan Jebakan:</strong> {pt.trapWarning}
                        </div>
                      </div>
                    )}

                    {/* Examples */}
                    {pt.examples.length > 0 && (
                      <div className="space-y-2 pt-2 border-t border-slate-200/60">
                        {pt.examples.map((ex, exIdx) => (
                          <div
                            key={exIdx}
                            className="bg-white p-2.5 sm:p-3 rounded-xl border border-slate-100 flex items-start justify-between gap-3 group"
                          >
                            <div className="flex-1 space-y-0.5">
                              <p className="text-sm font-bold text-slate-900 font-japanese">
                                {ex.jp}
                              </p>
                              <p className="text-xs text-red-700 font-medium">{ex.reading}</p>
                              <p className="text-xs text-slate-600">{ex.id}</p>
                            </div>
                            <button
                              onClick={(e) => handleSpeak(ex.jp, ex.reading, e)}
                              title="Putar Audio"
                              className="p-2 rounded-xl bg-slate-100 hover:bg-red-100 text-slate-600 hover:text-red-700 transition-colors shrink-0 cursor-pointer shadow-2xs"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Confusing Pairs Comparison (Shin Kanzen Special) */}
              {item.confusingPairsComparison && (
                <div className="bg-indigo-50/70 border border-indigo-200 rounded-2xl p-4 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2 border-b border-indigo-200/70 pb-2">
                    <Scale className="w-4 h-4 text-indigo-700" />
                    <h4 className="text-xs sm:text-sm font-extrabold text-indigo-950">
                      Perbandingan Pasangan Mirip: {item.confusingPairsComparison.patternA} vs{' '}
                      {item.confusingPairsComparison.patternB}
                    </h4>
                  </div>
                  <p className="text-xs text-indigo-900 leading-relaxed">
                    {item.confusingPairsComparison.difference}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="bg-white p-2.5 rounded-xl border border-indigo-100 text-slate-800">
                      <span className="font-bold text-indigo-700 block mb-1">
                        {item.confusingPairsComparison.patternA}:
                      </span>
                      {item.confusingPairsComparison.exampleA}
                    </div>
                    <div className="bg-white p-2.5 rounded-xl border border-indigo-100 text-slate-800">
                      <span className="font-bold text-indigo-700 block mb-1">
                        {item.confusingPairsComparison.patternB}:
                      </span>
                      {item.confusingPairsComparison.exampleB}
                    </div>
                  </div>
                </div>
              )}

              {/* Mastery Drill Questions (実戦ドリル) */}
              {item.masteryDrill.length > 0 && (
                <div className="bg-slate-900 text-white rounded-2xl p-4 sm:p-5 flex flex-col gap-4 shadow-xs">
                  <div className="flex items-center gap-2 border-b border-slate-800 pb-2.5">
                    <HelpCircle className="w-4 h-4 text-red-400" />
                    <span className="text-xs font-extrabold uppercase tracking-wider text-red-400">
                      Simulasi Soal JLPT ({item.level} マスター練習)
                    </span>
                  </div>

                  <div className="space-y-4">
                    {item.masteryDrill.map((drill, dIdx) => {
                      const drillKey = `${item.id}-drill-${dIdx}`;
                      const isRevealed = !!revealedDrills[drillKey];
                      const userChoice = userSelectedChoices[drillKey];

                      return (
                        <div key={dIdx} className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-bold font-japanese leading-relaxed text-slate-100">
                              {dIdx + 1}. {drill.questionJp}
                            </p>
                            <button
                              onClick={(e) => handleSpeak(drill.questionJp, undefined, e)}
                              className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-red-300 transition-colors shrink-0 cursor-pointer"
                              title="Putar Audio Soal"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {drill.options.map((opt, oIdx) => {
                              const isChosen = userChoice === oIdx;
                              const isCorrect = isRevealed && oIdx === drill.correctIndex;
                              const isWrongChoice = isRevealed && isChosen && !isCorrect;

                              return (
                                <button
                                  key={oIdx}
                                  onClick={() => handleSelectOption(drillKey, oIdx)}
                                  className={`p-2.5 rounded-xl text-left text-xs font-semibold font-japanese transition-all border flex items-center justify-between cursor-pointer ${
                                    isCorrect
                                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                      : isWrongChoice
                                      ? 'bg-red-950/80 border-red-500 text-red-200'
                                      : isChosen
                                      ? 'bg-slate-700 border-red-400 text-white'
                                      : 'bg-slate-900/60 border-slate-700 hover:bg-slate-700 text-slate-300'
                                  }`}
                                >
                                  <span>
                                    {oIdx + 1}. {opt}
                                  </span>
                                  {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-2 shrink-0" />}
                                  {isWrongChoice && <XCircle className="w-3.5 h-3.5 text-red-400 ml-2 shrink-0" />}
                                </button>
                              );
                            })}
                          </div>

                          <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                            <button
                              onClick={() => toggleDrillReveal(drillKey)}
                              className="px-3 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-colors cursor-pointer"
                            >
                              {isRevealed ? 'Sembunyikan Pembahasan' : 'Lihat Kunci & Pembahasan'}
                            </button>
                            {isRevealed && (
                              <span className="text-xs font-bold text-emerald-400">
                                Jawaban: Pilihan {drill.correctIndex + 1}
                              </span>
                            )}
                          </div>

                          {isRevealed && (
                            <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-xs text-slate-300 leading-relaxed">
                              <strong>Analisis:</strong> {drill.analysisId}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
