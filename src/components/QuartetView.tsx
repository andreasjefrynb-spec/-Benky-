import React, { useState, useMemo, useRef } from 'react';
import { QuartetLesson } from '../types';
import { quartetLessons } from '../data/quartetData';
import {
  Volume2,
  BookOpen,
  PenTool,
  MessageSquare,
  Headphones,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Search,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface QuartetViewProps {
  speechRate: number;
  onPracticeLesson?: (volume: 1 | 2, lesson: number) => void;
  onStartQuiz?: (volume: 1 | 2, lesson: number) => void;
}

export const QuartetView: React.FC<QuartetViewProps> = ({
  speechRate,
  onPracticeLesson,
  onStartQuiz,
}) => {
  const [selectedVol, setSelectedVol] = useState<1 | 2>(1);
  const [selectedLessonNum, setSelectedLessonNum] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'reading' | 'writing' | 'speaking' | 'listening' | 'grammar'>('reading');
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const currentLessonsForVol = useMemo(() => {
    return quartetLessons.filter((l) => l.volume === selectedVol);
  }, [selectedVol]);

  const currentLesson: QuartetLesson = useMemo(() => {
    return (
      quartetLessons.find((l) => l.volume === selectedVol && l.lesson === selectedLessonNum) ||
      currentLessonsForVol[0] ||
      quartetLessons[0]
    );
  }, [selectedVol, selectedLessonNum, currentLessonsForVol]);

  const handleSelectLesson = (vol: 1 | 2, lessonNum: number) => {
    setSelectedVol(vol);
    setSelectedLessonNum(lessonNum);
    setShowAnswer(false);
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const currentIndex = currentLessonsForVol.findIndex((l) => l.lesson === currentLesson.lesson);

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      handleSelectLesson(selectedVol, currentLessonsForVol[currentIndex - 1].lesson);
    }
  };

  const handleNextLesson = () => {
    if (currentIndex < currentLessonsForVol.length - 1) {
      handleSelectLesson(selectedVol, currentLessonsForVol[currentIndex + 1].lesson);
    }
  };

  const handleSpeak = (text: string, reading?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-700 to-sky-700 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Quartet: Intermediate Japanese (QUARTET Ⅰ・Ⅱ 4技能統合)</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Integrasi 4 Kemahiran: Baca, Tulis, Bicara, Simak (N3)
          </h1>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Kurikulum modern dari The Japan Times untuk menguasai komunikasi komprehensif tingkat Menengah (N3) secara seimbang.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          四
        </div>
      </div>

      {/* Volume Switcher & Navigation */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => {
              setSelectedVol(1);
              setSelectedLessonNum(1);
            }}
            className="px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-indigo-600 text-white shadow-xs"
          >
            Quartet I &bull; N3 (Pelajaran 1–6)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevLesson}
            disabled={currentIndex <= 0}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer transition-colors"
            title="Pelajaran Sebelumnya"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
            Pelajaran {currentLesson.lesson} dari {currentLessonsForVol.length}
          </span>
          <button
            onClick={handleNextLesson}
            disabled={currentIndex >= currentLessonsForVol.length - 1}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed text-slate-700 cursor-pointer transition-colors"
            title="Pelajaran Berikutnya"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Layout Grid: Sidebar Lessons + 4-Skill Interactive Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Sidebar Lesson List */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col">
          <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              Daftar Pelajaran Vol {selectedVol}
            </span>
            <span className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
              Pelajaran {currentLesson.lesson} Aktif
            </span>
          </div>

          <div className="space-y-1.5">
            {currentLessonsForVol.map((lsn) => {
              const isSelected = lsn.lesson === currentLesson.lesson;
              return (
                <div
                  key={`vol${lsn.volume}-l${lsn.lesson}`}
                  onClick={() => handleSelectLesson(lsn.volume, lsn.lesson)}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-2.5 ${
                    isSelected
                      ? 'bg-indigo-50/90 border-indigo-400 shadow-xs ring-1 ring-indigo-300'
                      : 'bg-white border-slate-200/70 hover:border-indigo-300 hover:bg-slate-50/70'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-indigo-100 text-indigo-800">
                        {lsn.level}
                      </span>
                      <h3 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">
                        Pelajaran {lsn.lesson}: {lsn.titleJp}
                      </h3>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                      {lsn.titleId}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 shrink-0 transition-transform ${
                      isSelected ? 'text-indigo-700 translate-x-0.5' : 'text-slate-300'
                    }`}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Lesson Workspace */}
        <div ref={workspaceRef} className="lg:col-span-8 flex flex-col gap-5">
          {/* Lesson Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-xl text-xs font-extrabold bg-indigo-100 text-indigo-800">
                  Quartet Vol {currentLesson.volume} &bull; Pelajaran {currentLesson.lesson}
                </span>
                <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-900">
                  Tingkat {currentLesson.level}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onPracticeLesson && (
                  <button
                    onClick={() => onPracticeLesson(currentLesson.volume, currentLesson.lesson)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flashcard</span>
                  </button>
                )}
                {onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(currentLesson.volume, currentLesson.lesson)}
                    className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Kuis</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-3">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-japanese">
                {currentLesson.titleJp}
              </h2>
              <p className="text-xs text-indigo-700 font-semibold">{currentLesson.titleRomaji}</p>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
                {currentLesson.titleId} &bull; <strong className="text-slate-800">Tema:</strong>{' '}
                {currentLesson.theme}
              </p>
            </div>
          </div>

          {/* Skill Selector Tabs */}
          <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar gap-1">
            <button
              onClick={() => setActiveTab('reading')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'reading'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>1. Membaca (読む)</span>
            </button>
            <button
              onClick={() => setActiveTab('writing')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'writing'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <PenTool className="w-4 h-4" />
              <span>2. Menulis (書く)</span>
            </button>
            <button
              onClick={() => setActiveTab('speaking')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'speaking'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>3. Berbicara (話す)</span>
            </button>
            <button
              onClick={() => setActiveTab('listening')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'listening'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>4. Menyimak (聞く)</span>
            </button>
            <button
              onClick={() => setActiveTab('grammar')}
              className={`flex-1 sm:flex-none px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'grammar'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Tata Bahasa (文型)</span>
            </button>
          </div>

          {/* Tab 1: Reading Skill */}
          {activeTab === 'reading' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900">
                  {currentLesson.readingSkill.title}
                </h3>
                <button
                  onClick={(e) =>
                    handleSpeak(
                      currentLesson.readingSkill.passageJp,
                      currentLesson.readingSkill.passageReading,
                      e
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-800 text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Audio Bacaan</span>
                </button>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2.5">
                <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese leading-relaxed">
                  {currentLesson.readingSkill.passageJp}
                </p>
                <p className="text-xs text-indigo-700 font-medium leading-relaxed">
                  {currentLesson.readingSkill.passageReading}
                </p>
                <div className="pt-2 border-t border-slate-200/60 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Arti:</strong> {currentLesson.readingSkill.passageId}
                </div>
              </div>

              {currentLesson.readingSkill.strategyTip && (
                <div className="bg-amber-50 border border-amber-200 p-3.5 rounded-2xl text-xs text-amber-900">
                  💡 <strong>Tips Strategi Membaca:</strong> {currentLesson.readingSkill.strategyTip}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Writing Skill */}
          {activeTab === 'writing' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900">
                  {currentLesson.writingSkill.taskName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  <strong>Tugas Penulisan:</strong> {currentLesson.writingSkill.prompt}
                </p>
              </div>

              {/* Useful Connectors */}
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-2">
                  Kata Penghubung / Pola Penulisan Kunci:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentLesson.writingSkill.usefulConnectors.map((conn, cIdx) => (
                    <span
                      key={cIdx}
                      className="px-3 py-1 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold"
                    >
                      {conn}
                    </span>
                  ))}
                </div>
              </div>

              {/* Model Essay */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-indigo-800 uppercase tracking-wider">
                    Contoh Esai Model (モデル作文):
                  </span>
                  <button
                    onClick={(e) =>
                      handleSpeak(
                        currentLesson.writingSkill.modelEssayJp,
                        currentLesson.writingSkill.modelEssayReading,
                        e
                      )
                    }
                    className="p-1.5 rounded-lg bg-white hover:bg-indigo-100 text-indigo-800 transition-colors cursor-pointer"
                    title="Dengarkan Esai Model"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-sm font-bold text-slate-900 font-japanese leading-relaxed">
                  {currentLesson.writingSkill.modelEssayJp}
                </p>
                <p className="text-xs text-indigo-700 font-medium">
                  {currentLesson.writingSkill.modelEssayReading}
                </p>
                <p className="text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                  {currentLesson.writingSkill.modelEssayId}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Speaking Skill */}
          {activeTab === 'speaking' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base font-extrabold text-slate-900">
                  Percakapan Terarah (話すスキル)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  <strong>Situasi:</strong> {currentLesson.speakingSkill.situation} &bull;{' '}
                  <strong>Target Can-Do:</strong> {currentLesson.speakingSkill.goal}
                </p>
              </div>

              <div className="space-y-3">
                {currentLesson.speakingSkill.dialogue.map((dlg, dIdx) => (
                  <div
                    key={dIdx}
                    className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-200/80 flex items-start gap-3"
                  >
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 font-black text-sm flex items-center justify-center shrink-0">
                      {dlg.speaker}
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese">
                        {dlg.jp}
                      </p>
                      <p className="text-xs text-indigo-700 font-medium">{dlg.reading}</p>
                      <p className="text-xs text-slate-600">{dlg.id}</p>
                    </div>
                    <button
                      onClick={(e) => handleSpeak(dlg.jp, dlg.reading, e)}
                      className="p-2 rounded-xl bg-white hover:bg-indigo-100 text-slate-600 hover:text-indigo-800 border border-slate-200/60 transition-colors shrink-0 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {currentLesson.speakingSkill.keyExpressions.length > 0 && (
                <div className="bg-indigo-50 border border-indigo-200 p-3.5 rounded-2xl">
                  <span className="text-[11px] font-bold text-indigo-900 uppercase tracking-wider block mb-1.5">
                    Ungkapan Kunci Percakapan:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {currentLesson.speakingSkill.keyExpressions.map((exp, eIdx) => (
                      <span
                        key={eIdx}
                        className="bg-white px-2.5 py-1 rounded-lg text-xs font-bold text-indigo-800 border border-indigo-200"
                      >
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Listening Skill */}
          {activeTab === 'listening' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    Latihan Menyimak (聞くスキル)
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    <strong>Situasi:</strong> {currentLesson.listeningSkill.situation}
                  </p>
                </div>
                <button
                  onClick={(e) =>
                    handleSpeak(
                      currentLesson.listeningSkill.scriptJp,
                      currentLesson.listeningSkill.scriptReading,
                      e
                    )
                  }
                  className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Putar Audio Menyimak</span>
                </button>
              </div>

              {/* Comprehension Check */}
              <div className="bg-indigo-50/70 border border-indigo-200 p-4 rounded-2xl flex flex-col gap-3">
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-indigo-700 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider block">
                      Pertanyaan Pemahaman:
                    </span>
                    <p className="text-sm font-extrabold text-slate-900 mt-0.5">
                      {currentLesson.listeningSkill.comprehensionCheck}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-indigo-200/70">
                  <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="px-3 py-1.5 rounded-xl bg-white border border-indigo-300 text-indigo-800 text-xs font-bold hover:bg-indigo-100 transition-colors cursor-pointer"
                  >
                    {showAnswer ? 'Sembunyikan Kunci & Naskah' : 'Lihat Kunci Jawaban & Naskah'}
                  </button>
                </div>

                {showAnswer && (
                  <div className="bg-white p-3.5 rounded-xl border border-indigo-200 space-y-2 text-xs">
                    <p className="text-emerald-700 font-bold">
                      ✅ <strong>Jawaban Benar:</strong> {currentLesson.listeningSkill.correctAnswer}
                    </p>
                    <div className="pt-2 border-t border-slate-100 text-slate-700 space-y-1">
                      <p className="font-japanese font-bold text-slate-900">
                        {currentLesson.listeningSkill.scriptJp}
                      </p>
                      <p className="text-indigo-600">{currentLesson.listeningSkill.scriptReading}</p>
                      <p className="text-slate-500">{currentLesson.listeningSkill.scriptId}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 5: Grammar Patterns */}
          {activeTab === 'grammar' && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-extrabold text-slate-900">
                  Tata Bahasa &amp; Pola Kalimat Quartet (文型 Bunkei)
                </h3>
              </div>

              <div className="space-y-4">
                {currentLesson.grammarPatterns.map((gp, idx) => (
                  <div
                    key={gp.id || idx}
                    className="bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 p-4 transition-all"
                  >
                    <h4 className="text-sm sm:text-base font-extrabold text-slate-900">
                      {idx + 1}. {gp.pattern}
                    </h4>

                    <div className="bg-white border border-indigo-100 text-indigo-800 font-mono text-xs font-semibold px-3 py-2 rounded-xl mt-2 flex items-center gap-2">
                      <span className="bg-indigo-100 text-indigo-800 px-1.5 py-0.5 rounded-md text-[10px] uppercase font-bold">
                        Rumus
                      </span>
                      <span className="break-all">{gp.formula}</span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
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
                            <p className="text-xs text-indigo-700 font-medium">{ex.reading}</p>
                            <p className="text-xs text-slate-600">{ex.id}</p>
                          </div>
                          <button
                            onClick={(e) => handleSpeak(ex.jp, ex.reading, e)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-indigo-100 text-slate-600 hover:text-indigo-800 transition-colors shrink-0 cursor-pointer"
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
          )}
        </div>
      </div>
    </div>
  );
};
