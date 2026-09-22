import React, { useState, useMemo } from 'react';
import { SouMatomeWeek } from '../types';
import { souMatomeWeeks } from '../data/souMatomeData';
import {
  Volume2,
  Calendar,
  Sparkles,
  Search,
  Check,
  Layers,
  HelpCircle,
} from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface SouMatomeViewProps {
  speechRate: number;
  onPracticeDay?: (level: 'N3', week: number, day: number) => void;
  onStartQuiz?: (level: 'N3', week: number) => void;
}

export const SouMatomeView: React.FC<SouMatomeViewProps> = ({
  speechRate,
  onPracticeDay,
  onStartQuiz,
}) => {
  const [selectedLevel, setSelectedLevel] = useState<'N3'>('N3');
  const [selectedWeekNum, setSelectedWeekNum] = useState<number>(1);
  const [selectedDayNum, setSelectedDayNum] = useState<number>(1);
  const [revealedQuestions, setRevealedQuestions] = useState<Record<number, boolean>>({});

  const weeksForLevel = useMemo(() => {
    return souMatomeWeeks.filter((w) => w.level === selectedLevel);
  }, [selectedLevel]);

  const currentWeek: SouMatomeWeek = useMemo(() => {
    return (
      weeksForLevel.find((w) => w.weekNumber === selectedWeekNum) ||
      weeksForLevel[0] ||
      souMatomeWeeks[0]
    );
  }, [weeksForLevel, selectedWeekNum]);

  const currentDay = useMemo(() => {
    return currentWeek.days.find((d) => d.dayNumber === selectedDayNum) || currentWeek.days[0];
  }, [currentWeek, selectedDayNum]);

  const handleSelectLevel = (level: 'N3') => {
    setSelectedLevel(level);
    setSelectedWeekNum(1);
    setSelectedDayNum(1);
    setRevealedQuestions({});
  };

  const handleSelectWeek = (weekNum: number) => {
    setSelectedWeekNum(weekNum);
    setSelectedDayNum(1);
    setRevealedQuestions({});
  };

  const toggleReveal = (qIdx: number) => {
    setRevealedQuestions((prev) => ({ ...prev, [qIdx]: !prev[qIdx] }));
  };

  const handleSpeak = (text: string, reading?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-700 via-orange-600 to-rose-600 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>Nihongo Sou-matome (日本語総まとめ) N3</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Program Belajar Terstruktur 6 Minggu Selesai (N3)
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Pola belajar harian praktis: Hari 1–6 penguasaan kosakata/tata bahasa bertema visual, dan Hari 7 Ujian Praktik Nyata (実戦問題) untuk persiapan JLPT N3 optimal.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          総
        </div>
      </div>

      {/* Level Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => handleSelectLevel('N3')}
            className="px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-600 text-white shadow-xs cursor-pointer"
          >
            Sou-matome N3 (6 Minggu)
          </button>
        </div>

        {/* Week Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {weeksForLevel.map((w) => (
            <button
              key={`${selectedLevel}-w${w.weekNumber}`}
              onClick={() => handleSelectWeek(w.weekNumber)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                selectedWeekNum === w.weekNumber
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Minggu {w.weekNumber}
            </button>
          ))}
        </div>
      </div>

      {/* Week Title & Day Selector */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                {currentWeek.level} &bull; Minggu {currentWeek.weekNumber}
              </span>
              <span className="text-xs font-bold text-slate-400 capitalize">
                Mata Pelajaran: {currentWeek.subject}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
              {currentWeek.weekTitleJp}
            </h2>
            <p className="text-xs text-slate-500">{currentWeek.weekTitleId}</p>
          </div>

          <div className="flex items-center gap-2">
            {onStartQuiz && (
              <button
                onClick={() => onStartQuiz(currentWeek.level, currentWeek.weekNumber)}
                className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kuis Minggu {currentWeek.weekNumber}</span>
              </button>
            )}
          </div>
        </div>

        {/* Days Ribbon (Day 1 to Day 7) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
          {currentWeek.days.map((day) => {
            const isSelected = selectedDayNum === day.dayNumber;
            const isTestDay = day.dayNumber === 7;

            return (
              <button
                key={`${currentWeek.id}-d${day.dayNumber}`}
                onClick={() => {
                  setSelectedDayNum(day.dayNumber);
                  setRevealedQuestions({});
                }}
                className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? isTestDay
                      ? 'bg-rose-600 border-rose-600 text-white shadow-xs'
                      : 'bg-amber-500 border-amber-500 text-white shadow-xs'
                    : isTestDay
                    ? 'bg-rose-50 border-rose-200 text-rose-900 hover:bg-rose-100'
                    : 'bg-slate-50 border-slate-200 hover:bg-amber-50 hover:border-amber-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-black uppercase tracking-wider">
                    {isTestDay ? 'Hari 7 (Ujian)' : `Hari ${day.dayNumber}`}
                  </span>
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                </div>
                <p
                  className={`text-xs font-extrabold truncate mt-1 ${
                    isSelected ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {day.themeId || day.dayTitle}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day Content Workspace */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <span className="text-xs font-black text-amber-700 uppercase tracking-wider">
              {currentDay.dayNumber === 7 ? 'Ujian Ringkasan Mingguan (実戦問題)' : `Target Hari ke-${currentDay.dayNumber}: ${currentDay.dayTitle}`}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {currentDay.themeJp}
            </h3>
            <p className="text-xs text-slate-500">{currentDay.themeId}</p>
          </div>

          {onPracticeDay && (
            <button
              onClick={() => onPracticeDay(currentWeek.level, currentWeek.weekNumber, currentDay.dayNumber)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Flashcard Hari Ini</span>
            </button>
          )}
        </div>

        {/* Target Items List */}
        <div className="space-y-4">
          {currentDay.targetItems.map((item, iIdx) => (
            <div
              key={iIdx}
              className="bg-slate-50/80 hover:bg-slate-50 rounded-2xl border border-slate-200/80 p-4 sm:p-5 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="text-base sm:text-lg font-black text-slate-900 font-japanese">
                    {item.japanese}
                  </h4>
                  {item.reading && (
                    <p className="text-xs text-amber-700 font-semibold">{item.reading}</p>
                  )}
                  <p className="text-xs sm:text-sm text-slate-700 font-medium mt-0.5">
                    {item.meaningId}
                  </p>
                  {item.collocationOrUsage && (
                    <p className="text-xs text-slate-500 mt-1 bg-white px-2.5 py-1 rounded-lg border border-slate-200 inline-block">
                      <strong>Pola/Kolokasi:</strong> {item.collocationOrUsage}
                    </p>
                  )}
                </div>
                <button
                  onClick={(e) => handleSpeak(item.japanese, item.reading, e)}
                  className="p-2 rounded-xl bg-white hover:bg-amber-100 text-slate-600 hover:text-amber-800 transition-colors shrink-0 shadow-2xs cursor-pointer"
                  title="Putar Audio"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Sample Sentences */}
              {item.sampleSentenceJp && (
                <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-start justify-between gap-3 bg-white p-3 rounded-xl border border-slate-100">
                  <div className="space-y-0.5 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 font-japanese">
                      {item.sampleSentenceJp}
                    </p>
                    <p className="text-xs text-slate-600">{item.sampleSentenceId}</p>
                  </div>
                  <button
                    onClick={(e) => handleSpeak(item.sampleSentenceJp!, undefined, e)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-amber-50 text-slate-500 hover:text-amber-700 transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Daily Mini Test (練習問題) */}
        {currentDay.dailyMiniTest && currentDay.dailyMiniTest.length > 0 && (
          <div className="bg-slate-900 text-white rounded-3xl p-5 sm:p-6 flex flex-col gap-4 mt-2 shadow-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm sm:text-base font-extrabold text-amber-400">
                Latihan Harian Sou-matome (ドリル・実戦問題)
              </h4>
            </div>

            <div className="space-y-4">
              {currentDay.dailyMiniTest.map((pq, qIdx) => {
                const isRevealed = !!revealedQuestions[qIdx];

                return (
                  <div key={qIdx} className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold font-japanese leading-relaxed text-slate-100">
                        {qIdx + 1}. {pq.questionJp}
                      </p>
                      <button
                        onClick={(e) => handleSpeak(pq.questionJp, undefined, e)}
                        className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-amber-300 transition-colors shrink-0 cursor-pointer"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {pq.options.map((opt, oIdx) => {
                        const isCorrect = isRevealed && oIdx === pq.correctIndex;
                        return (
                          <div
                            key={oIdx}
                            className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold font-japanese ${
                              isCorrect
                                ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200'
                                : 'bg-slate-900/60 border-slate-700 text-slate-300'
                            }`}
                          >
                            {oIdx + 1}. {opt}
                          </div>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-slate-700 flex items-center justify-between">
                      <button
                        onClick={() => toggleReveal(qIdx)}
                        className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
                      >
                        {isRevealed ? 'Tutup Kunci' : 'Cek Kunci'}
                      </button>
                      {isRevealed && (
                        <span className="text-xs font-bold text-emerald-400">
                          Jawaban: Nomor {pq.correctIndex + 1} &bull; {pq.explanation}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
