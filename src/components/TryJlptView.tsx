import React, { useState, useMemo, useRef } from 'react';
import { TryJlptLesson } from '../types';
import { tryJlptLessons } from '../data/tryJlptData';
import {
  Volume2,
  BookOpen,
  Target,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface TryJlptViewProps {
  speechRate: number;
  onPracticeLesson?: (level: 'N3', chapter: number) => void;
  onStartQuiz?: (level: 'N3', chapter: number) => void;
}

export const TryJlptView: React.FC<TryJlptViewProps> = ({
  speechRate,
  onPracticeLesson,
  onStartQuiz,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'N3'>('N3');
  const [selectedChapterNum, setSelectedChapterNum] = useState<number>(1);
  const [revealedDrills, setRevealedDrills] = useState<Record<string, boolean>>({});
  const [userChoices, setUserChoices] = useState<Record<string, number>>({});
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const lessonsForLevel = useMemo(() => {
    return tryJlptLessons.filter((l) => l.level === selectedLevel);
  }, [selectedLevel]);

  const currentLesson: TryJlptLesson = useMemo(() => {
    return (
      lessonsForLevel.find((l) => l.chapter === selectedChapterNum) ||
      lessonsForLevel[0] ||
      tryJlptLessons[0]
    );
  }, [lessonsForLevel, selectedChapterNum]);

  const handleSelectLevel = (lvl: 'N3') => {
    setSelectedLevel(lvl);
    setSelectedChapterNum(1);
    setRevealedDrills({});
    setUserChoices({});
  };

  const handleSelectChapter = (chNum: number) => {
    setSelectedChapterNum(chNum);
    setRevealedDrills({});
    setUserChoices({});
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentIndex = lessonsForLevel.findIndex((l) => l.chapter === currentLesson.chapter);

  const handlePrev = () => {
    if (currentIndex > 0) {
      handleSelectChapter(lessonsForLevel[currentIndex - 1].chapter);
    }
  };

  const handleNext = () => {
    if (currentIndex < lessonsForLevel.length - 1) {
      handleSelectChapter(lessonsForLevel[currentIndex + 1].chapter);
    }
  };

  const toggleDrillReveal = (drillKey: string) => {
    setRevealedDrills((prev) => ({ ...prev, [drillKey]: !prev[drillKey] }));
  };

  const handleChooseOption = (drillKey: string, optIdx: number) => {
    setUserChoices((prev) => ({ ...prev, [drillKey]: optIdx }));
  };

  const handleSpeak = (text: string, reading?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-sky-600 to-cyan-600 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Target className="w-3.5 h-3.5" />
            <span>TRY! Nihongo Nouryoku Shiken (TRY! 日本語能力試験) N3</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Belajar Tata Bahasa Lewat Cerita &amp; Konteks Nyata (N3)
          </h1>
          <p className="text-sky-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Metode unggulan ABK (Asia Bunka Kaikan): membaca wacana wajar yang menyematkan seluruh target pola tata bahasa N3, melatih pemahaman bacaan dan kemampuan berbicara secara simultan.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          試
        </div>
      </div>

      {/* Level Selector Tabs */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => handleSelectLevel('N3')}
            className="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-blue-600 text-white shadow-xs cursor-pointer"
          >
            TRY! N3 (Pelajaran 1–6)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            disabled={currentIndex <= 0}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer transition-colors"
            title="Bab Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            Bab {currentLesson.chapter} dari {lessonsForLevel.length}
          </span>
          <button
            onClick={handleNext}
            disabled={currentIndex >= lessonsForLevel.length - 1}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer transition-colors"
            title="Bab Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Sidebar Chapters */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col">
          <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              Daftar Bab TRY! {selectedLevel}
            </span>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md">
              Bab {currentLesson.chapter} Aktif
            </span>
          </div>

          <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
            {lessonsForLevel.map((lsn) => {
              const isSelected = lsn.chapter === currentLesson.chapter;
              return (
                <div
                  key={lsn.id}
                  onClick={() => handleSelectChapter(lsn.chapter)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-400 shadow-xs ring-1 ring-blue-300'
                      : 'bg-white border-slate-200/70 hover:border-blue-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                        {lsn.level}
                      </span>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                        {lsn.chapterTitleJp}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {lsn.chapterTitleId}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-blue-700 translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Lesson Workspace */}
        <div ref={workspaceRef} className="lg:col-span-8 flex flex-col gap-5">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-blue-100 text-blue-800">
                  TRY! {currentLesson.level} &bull; Bab {currentLesson.chapter}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  Can-do: {currentLesson.canDoGoal}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onPracticeLesson && (
                  <button
                    onClick={() => onPracticeLesson(currentLesson.level, currentLesson.chapter)}
                    className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flashcard</span>
                  </button>
                )}
                {onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(currentLesson.level, currentLesson.chapter)}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kuis Bab</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-japanese">
                {currentLesson.chapterTitleJp}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {currentLesson.chapterTitleId}
              </p>
            </div>
          </div>

          {/* Contextual Story Passage (本文 Dokkai) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Wacana Cerita Kontekstual (本文)
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    Latar: {currentLesson.storyScenario.setting}
                  </span>
                </div>
              </div>
              <button
                onClick={(e) =>
                  handleSpeak(
                    currentLesson.storyScenario.passageJp,
                    currentLesson.storyScenario.passageReading,
                    e
                  )
                }
                title="Dengarkan Seluruh Cerita"
                className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
                <span>Audio Cerita</span>
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2.5">
              <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese leading-relaxed">
                {currentLesson.storyScenario.passageJp}
              </p>
              <p className="text-xs text-blue-700 font-medium leading-relaxed">
                {currentLesson.storyScenario.passageReading}
              </p>
              <div className="pt-2 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600 leading-relaxed">
                <strong className="text-slate-800">Terjemahan:</strong> {currentLesson.storyScenario.passageId}
              </div>
            </div>
          </div>

          {/* Target Grammar Points (文法) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sparkles className="w-4 h-4 text-blue-600" />
              <h3 className="text-base font-extrabold text-slate-900">
                Target Pola Tata Bahasa (文法ポイント)
              </h3>
            </div>

            <div className="space-y-4">
              {currentLesson.grammarPoints.map((gp) => (
                <div
                  key={`${currentLesson.id}-gp-${gp.number}`}
                  className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 p-4 transition-all"
                >
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 font-japanese">
                    {gp.number}. {gp.pattern}
                  </h4>

                  <div className="bg-white border border-blue-100 text-blue-800 font-mono text-xs font-semibold px-3 py-1.5 rounded-xl mt-2 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-md text-[10px] uppercase font-bold">
                      Rumus
                    </span>
                    <span className="break-all">{gp.formula}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 font-semibold mt-2">
                    <span className="text-slate-500 font-normal">Arti: </span>{gp.meaningId}
                  </p>

                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {gp.explanation}
                  </p>

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
                          <p className="text-xs text-blue-700 font-medium">{ex.reading}</p>
                          <p className="text-xs text-slate-600">{ex.id}</p>
                        </div>
                        <button
                          onClick={(e) => handleSpeak(ex.jp, ex.reading, e)}
                          title="Dengarkan Pelafalan Audio"
                          className="p-2 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-800 transition-colors shrink-0 cursor-pointer"
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

          {/* Try Exam Drill (TRY! 練習問題) */}
          {currentLesson.tryExamDrill && currentLesson.tryExamDrill.length > 0 && (
            <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 flex flex-col gap-4 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <HelpCircle className="w-4 h-4 text-sky-400" />
                <h4 className="text-sm sm:text-base font-extrabold text-sky-400">
                  Latihan Mandiri Bab (TRY! ドリル)
                </h4>
              </div>

              <div className="space-y-4">
                {currentLesson.tryExamDrill.map((drill, dIdx) => {
                  const drillKey = `${currentLesson.id}-drill-${dIdx}`;
                  const isRevealed = !!revealedDrills[drillKey];
                  const chosenOpt = userChoices[drillKey];

                  return (
                    <div
                      key={dIdx}
                      className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-bold font-japanese leading-relaxed text-slate-100">
                          {dIdx + 1}. {drill.questionJp}
                        </p>
                        <button
                          onClick={(e) => handleSpeak(drill.questionJp, undefined, e)}
                          className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-sky-300 transition-colors shrink-0 cursor-pointer"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {drill.options.map((opt, oIdx) => {
                          const isSelected = chosenOpt === oIdx;
                          const isCorrect = isRevealed && oIdx === drill.correctIndex;
                          const isWrong = isRevealed && isSelected && !isCorrect;

                          return (
                            <button
                              key={oIdx}
                              onClick={() => handleChooseOption(drillKey, oIdx)}
                              className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold font-japanese text-left flex items-center justify-between cursor-pointer transition-all ${
                                isCorrect
                                  ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                                  : isWrong
                                  ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                                  : isSelected
                                  ? 'bg-sky-900 border-sky-400 text-white'
                                  : 'bg-slate-900/60 border-slate-700 text-slate-300 hover:bg-slate-700'
                              }`}
                            >
                              <span>
                                {oIdx + 1}. {opt}
                              </span>
                              {isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-2 shrink-0" />}
                              {isWrong && <XCircle className="w-3.5 h-3.5 text-rose-400 ml-2 shrink-0" />}
                            </button>
                          );
                        })}
                      </div>

                      <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                        <button
                          onClick={() => toggleDrillReveal(drillKey)}
                          className="px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-colors cursor-pointer"
                        >
                          {isRevealed ? 'Tutup Kunci' : 'Cek Jawaban & Pembahasan'}
                        </button>
                        {isRevealed && (
                          <span className="text-xs font-bold text-emerald-400">
                            Jawaban: {drill.correctIndex + 1}. {drill.options[drill.correctIndex]}
                          </span>
                        )}
                      </div>

                      {isRevealed && (
                        <div className="bg-slate-900/90 p-3 rounded-lg border border-slate-700 text-xs text-slate-300 leading-relaxed">
                          <strong>Pembahasan:</strong> {drill.explanation}
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
