import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  HelpCircle,
  Flag,
  Layers,
  Sparkles,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  ListFilter,
} from 'lucide-react';
import { CardItem, QuizQuestion, LevelFilterOption } from '../types';
import { generateQuizQuestions } from '../data';
import { soundManager } from '../utils/audio';
import { GROUP_METAS } from './VocabGroupView';
import { getWordClassification } from '../utils/wordClassifier';
import { getHiraganaReading, containsJapanese, containsKanji } from '../utils/hiraganaConverter';
import { getWordNuanceInfo } from '../utils/wordNuances';

interface QuizViewProps {
  cardPool: CardItem[];
  speechRate: number;
  onCompleteQuiz: (correctCount: number, total: number) => void;
  initialSubCategory?: string;
  initialLevel?: LevelFilterOption;
}

export const QuizView: React.FC<QuizViewProps> = ({
  cardPool,
  speechRate,
  onCompleteQuiz,
  initialSubCategory,
  initialLevel,
}) => {
  const [selectedGroup, setSelectedGroup] = useState<string>(initialSubCategory || 'all');
  const [levelFilter, setLevelFilter] = useState<LevelFilterOption>(initialLevel || 'all');
  const [countMode, setCountMode] = useState<'all' | 10 | 25 | 50 | 100>('all');
  const [showHiragana, setShowHiragana] = useState<boolean>(true);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<
    { question: QuizQuestion; userAnswer: string; isCorrect: boolean }[]
  >([]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isSettingsExpandedOnMobile, setIsSettingsExpandedOnMobile] = useState(false);
  const [isWrapGroups, setIsWrapGroups] = useState(false);
  const groupsScrollRef = React.useRef<HTMLDivElement | null>(null);

  const scrollGroups = (direction: 'left' | 'right') => {
    if (groupsScrollRef.current) {
      const amount = direction === 'left' ? -250 : 250;
      groupsScrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    return soundManager.onPlaybackChange((playing) => {
      setIsPlayingAudio(playing);
    });
  }, []);

  // Sync when initialSubCategory changes from parent
  useEffect(() => {
    if (initialSubCategory) {
      setSelectedGroup(initialSubCategory);
    }
  }, [initialSubCategory]);

  useEffect(() => {
    if (initialLevel) {
      setLevelFilter(initialLevel);
    }
  }, [initialLevel]);

  // Extract all subcategories / groups present in cardPool
  const availableGroups = useMemo(() => {
    const map = new Map<string, number>();
    cardPool.forEach((c) => {
      if (c.subCategory) {
        map.set(c.subCategory, (map.get(c.subCategory) || 0) + 1);
      }
    });

    if (map.size === 0) return [];

    return Array.from(map.entries())
      .map(([key, count]) => {
        let name = key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
        let kanjiTitle = '';
        let icon = '📁';
        let desc = 'Materi Kosakata';

        if (key.startsWith('bab_chuukyu_')) {
          const num = parseInt(key.replace('bab_chuukyu_', ''), 10);
          name = `Chuukyu Bab ${num}`;
          kanjiTitle = `中級 第${num}課`;
          icon = '📖';
          desc = 'Minna no Nihongo Chuukyu';
        } else if (key.startsWith('bab_')) {
          const num = parseInt(key.replace('bab_', ''), 10);
          name = num > 50 ? `Chuukyu Bab ${num}` : `Shokyu Bab ${num}`;
          kanjiTitle = `第${num}課`;
          icon = '📖';
          desc = 'Minna no Nihongo';
        } else if (key.startsWith('tobira_')) {
          name = `Tobira Bab ${key.replace('tobira_', '')}`;
          kanjiTitle = `第${key.replace('tobira_', '')}章`;
          icon = '⛩️';
          desc = 'Tobira Gateway';
        } else if (key.startsWith('quartet_v1_l')) {
          name = `Quartet I Bab ${key.replace('quartet_v1_l', '')}`;
          kanjiTitle = `第${key.replace('quartet_v1_l', '')}課`;
          icon = '🎼';
          desc = 'Quartet Vol 1';
        } else if (key.startsWith('quartet_v2_l')) {
          name = `Quartet II Bab ${key.replace('quartet_v2_l', '')}`;
          kanjiTitle = `第${key.replace('quartet_v2_l', '')}課`;
          icon = '🎼';
          desc = 'Quartet Vol 2';
        } else if (key.startsWith('shinkanzen_')) {
          name = `Shin Kanzen ${key.replace('shinkanzen_', '').toUpperCase()}`;
          icon = '🎯';
          desc = 'Shin Kanzen Master';
        } else if (key.startsWith('soumatome_')) {
          name = `Sou-matome ${key.replace('soumatome_', '').replace('_w', ' Mgg ')}`;
          icon = '📅';
          desc = 'Nihongo Sou-matome';
        } else if (key.startsWith('try_')) {
          name = `TRY! ${key.replace('try_', '').replace('_ch', ' Bab ')}`;
          icon = '🚀';
          desc = 'TRY! JLPT Series';
        }

        return {
          key,
          count,
          meta: GROUP_METAS[key] || {
            id: key,
            name,
            kanjiTitle,
            icon,
            desc,
          },
        };
      })
      .sort((a, b) => b.count - a.count);
  }, [cardPool]);

  // Check if cardPool has cards with N5/N4/N3/Native levels
  const hasLevelTags = cardPool.some(
    (c) => c.level === 'N5' || c.level === 'N4' || c.level === 'N3' || c.level === 'Native'
  );

  // Filter pool based on selected group & level
  const effectivePool = useMemo(() => {
    let pool = cardPool;

    // Filter by group if selected
    if (selectedGroup !== 'all') {
      const groupFiltered = pool.filter((c) => c.subCategory === selectedGroup);
      if (groupFiltered.length > 0) {
        pool = groupFiltered;
      }
    }

    // Filter by level
    if (levelFilter !== 'all') {
      const levelFiltered = pool.filter((c) => c.level === levelFilter);
      if (levelFiltered.length > 0) {
        pool = levelFiltered;
      }
    }

    return pool;
  }, [cardPool, selectedGroup, levelFilter]);

  // Start new quiz
  const startNewQuiz = (customCount?: 'all' | 10 | 25 | 50 | 100) => {
    const targetCount = customCount ?? countMode;
    const qList = generateQuizQuestions(effectivePool, targetCount, cardPool);
    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setAnswersHistory([]);
  };

  useEffect(() => {
    startNewQuiz();
  }, [effectivePool, countMode]);

  const currentQ = questions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswered) return;

    setSelectedAnswer(option);
    setIsAnswered(true);

    const isCorrect = option === currentQ.correctAnswer;
    if (isCorrect) {
      soundManager.playCorrectSound();
      setScore((prev) => prev + 1);
    } else {
      soundManager.playWrongSound();
    }

    setAnswersHistory((prev) => [
      ...prev,
      { question: currentQ, userAnswer: option, isCorrect },
    ]);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      onCompleteQuiz(score + (selectedAnswer === currentQ.correctAnswer ? 0 : 0), questions.length);
    }
  };

  const handleEarlyFinish = () => {
    setIsFinished(true);
    const totalGuessed = answersHistory.length;
    onCompleteQuiz(score, totalGuessed > 0 ? totalGuessed : 1);
  };

  // Keyboard navigation for desktop users (1-4, A-D, Enter/Space)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (!isAnswered && currentQ) {
        let selectedIdx = -1;
        if (e.key === '1' || e.key.toLowerCase() === 'a') selectedIdx = 0;
        else if (e.key === '2' || e.key.toLowerCase() === 'b') selectedIdx = 1;
        else if (e.key === '3' || e.key.toLowerCase() === 'c') selectedIdx = 2;
        else if (e.key === '4' || e.key.toLowerCase() === 'd') selectedIdx = 3;

        if (selectedIdx >= 0 && selectedIdx < currentQ.options.length) {
          e.preventDefault();
          handleSelectOption(currentQ.options[selectedIdx]);
        }
      } else if (isAnswered) {
        if (e.key === 'Enter' || e.code === 'Space') {
          e.preventDefault();
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnswered, currentQ, currentIndex, questions.length]);

  if (!currentQ || questions.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800">
        <p className="text-slate-600 dark:text-slate-300 font-semibold mb-4">Mempersiapkan soal kuis...</p>
        <button
          onClick={() => startNewQuiz()}
          className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold cursor-pointer"
        >
          Mulai Kuis
        </button>
      </div>
    );
  }

  // FINISHED QUIZ SCREEN
  if (isFinished) {
    const totalGuessed = answersHistory.length;
    const percentage = totalGuessed > 0 ? Math.round((score / totalGuessed) * 100) : 0;
    const wrongCount = totalGuessed - score;

    let feedback = 'Latihan yang bagus! Terus asah pemahaman kosakata dan karaktermu.';
    let emoji = '🎉';
    if (percentage === 100) {
      feedback = 'Sempurna! Semua kata berhasil ditebak dengan benar!';
      emoji = '🏆';
    } else if (percentage >= 80) {
      feedback = 'Luar biasa! Daya ingat bahasa Jepangmu sangat tajam!';
      emoji = '🌟';
    } else if (percentage < 50) {
      feedback = 'Tetap semangat! Ulas kembali kartu kosakata dan coba kuis lagi.';
      emoji = '💪';
    }

    return (
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/90 dark:border-slate-800 shadow-sm text-center">
        <div className="text-5xl mb-3">{emoji}</div>
        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
          Kuis Selesai!
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{feedback}</p>

        {/* Primary Result Card: Benar berapa kata dari semua kata yang ditebak */}
        <div className="bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800/80 rounded-3xl p-6 sm:p-8 mb-6 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-widest block mb-1">
            Hasil Tebakan
          </span>
          <div className="text-3xl sm:text-5xl font-black text-emerald-700 dark:text-emerald-400 tracking-tight my-2">
            Benar {score} dari {totalGuessed} kata
          </div>
          <p className="text-xs sm:text-sm text-emerald-800/80 dark:text-emerald-300/90 font-semibold">
            Tingkat Akurasi: <span className="font-extrabold">{percentage}%</span> ({score} Benar, {wrongCount} Salah)
          </p>
        </div>

        {/* 3-Column Summary: Total Ditebak, Benar, Salah (Streak Ditiadakan) */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 dark:bg-slate-800/90 rounded-2xl border border-slate-200/60 dark:border-slate-700 mb-6">
          <div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 block uppercase">Total Ditebak</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-slate-100">
              {totalGuessed}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 block uppercase">Benar</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {score}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400 block uppercase">Salah</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-600 dark:text-rose-400">
              {wrongCount}
            </span>
          </div>
        </div>

        {/* Review Answers */}
        <div className="text-left mb-6">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Tinjauan Semua Kata yang Ditebak ({answersHistory.length}):</span>
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {answersHistory.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-2 ${
                  item.isCorrect
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-100'
                    : 'bg-rose-50/50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-slate-800 dark:text-slate-100'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <span className="text-slate-400 font-mono text-[11px]">#{idx + 1}</span>
                    <span className="font-jp text-sm text-slate-900 dark:text-white">{item.question.item.japanese}</span>
                    {item.question.item.reading && (
                      <span className="text-slate-500 dark:text-slate-400">({item.question.item.reading})</span>
                    )}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300">
                    Jawabanmu:{' '}
                    <strong className={item.isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}>
                      {item.userAnswer}
                    </strong>
                  </p>
                  {!item.isCorrect && (
                    <p className="text-emerald-700 dark:text-emerald-400 font-semibold">
                      Benar: {item.question.correctAnswer}
                    </p>
                  )}
                </div>
                {item.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => startNewQuiz()}
            className="w-full sm:w-auto px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Ulangi Kuis Ini</span>
          </button>
          {availableGroups.length > 0 && selectedGroup !== 'all' && (
            <button
              onClick={() => {
                setSelectedGroup('all');
              }}
              className="w-full sm:w-auto px-6 py-3 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 dark:hover:bg-slate-600 text-white font-bold text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Layers className="w-4 h-4" />
              <span>Coba Kelompok Lain</span>
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* MOBILE HEADER: Compact Status Bar + Quick Settings Toggle */}
      <div className="sm:hidden flex flex-col gap-2">
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-3 py-2 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <span>Soal <strong className="text-rose-600 dark:text-rose-400">{currentIndex + 1}</strong>/{questions.length}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/70 px-2 py-0.5 rounded-md font-bold">
              Benar: {score}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Hiragana Switch */}
            <button
              type="button"
              onClick={() => setShowHiragana(!showHiragana)}
              className={`px-2 py-1 text-[11px] font-extrabold rounded-lg border transition-all cursor-pointer flex items-center gap-1 ${
                showHiragana
                  ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
              title="Toggle Hiragana"
            >
              <span className="font-jp text-xs">あ</span>
              <span>{showHiragana ? 'ON' : 'OFF'}</span>
            </button>

            {/* Settings Toggle */}
            <button
              type="button"
              onClick={() => setIsSettingsExpandedOnMobile(!isSettingsExpandedOnMobile)}
              className={`px-2 py-1 text-[11px] font-bold rounded-lg border transition-all cursor-pointer ${
                isSettingsExpandedOnMobile
                  ? 'bg-slate-900 dark:bg-rose-600 text-white border-slate-900 dark:border-rose-600'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
              }`}
            >
              ⚙️ Opsi
            </button>

            {answersHistory.length >= 3 && (
              <button
                onClick={handleEarlyFinish}
                className="text-[11px] font-bold text-slate-500 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer"
                title="Selesai"
              >
                Selesai
              </button>
            )}
          </div>
        </div>

        {/* Collapsible Mobile Settings */}
        {isSettingsExpandedOnMobile && (
          <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col gap-2.5 animate-in fade-in duration-150">
            {availableGroups.length > 0 && (
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between gap-1.5">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <ListFilter className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                    <span>Pilih Kelompok ({availableGroups.length}):</span>
                  </span>

                  <select
                    value={selectedGroup}
                    onChange={(e) => setSelectedGroup(e.target.value)}
                    className="text-[11px] bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-lg px-2 py-1 font-bold focus:outline-none focus:ring-1 focus:ring-rose-400 max-w-[150px] truncate"
                  >
                    <option value="all">Semua ({cardPool.length})</option>
                    {availableGroups.map((g) => (
                      <option key={g.key} value={g.key}>
                        {g.meta.name} ({g.count})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5 select-none">
                  <button
                    type="button"
                    onClick={() => setSelectedGroup('all')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 ${
                      selectedGroup === 'all'
                        ? 'bg-slate-900 dark:bg-rose-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    Semua
                  </button>
                  {availableGroups.map((g) => (
                    <button
                      key={g.key}
                      type="button"
                      onClick={() => setSelectedGroup(g.key)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 ${
                        selectedGroup === g.key
                          ? 'bg-rose-600 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {g.meta.name} ({g.count})
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Level & Count */}
            <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex-wrap">
              {hasLevelTags && (
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400">Level:</span>
                  {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                        levelFilter === lvl ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {lvl === 'all' ? 'Semua' : lvl}
                    </button>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-slate-400 dark:text-slate-400">Tebak:</span>
                {(['all', 10, 25] as const).map((cnt) => (
                  <button
                    key={cnt}
                    onClick={() => setCountMode(cnt)}
                    className={`px-2 py-0.5 text-xs font-bold rounded-md ${
                      countMode === cnt ? 'bg-rose-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {cnt === 'all' ? 'Semua' : cnt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DESKTOP HEADER & CONTROLS (Hidden on Mobile) */}
      <div className="hidden sm:flex flex-col gap-4">
        {/* VOCABULARY GROUP SELECTOR (When card pool has groups) */}
        {availableGroups.length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-3.5 sm:p-4 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xs flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-100 dark:border-rose-900/60">
                  <Layers className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-tight">
                    Pilih Kelompok Kosakata:
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                    Kuis khusus kelompok tema kata tertentu
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Quick Dropdown Picker */}
                <select
                  value={selectedGroup}
                  onChange={(e) => setSelectedGroup(e.target.value)}
                  className="text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 rounded-xl px-2.5 py-1 font-semibold focus:outline-none focus:ring-2 focus:ring-rose-400 cursor-pointer max-w-[200px] truncate shadow-2xs"
                  title="Pilih kelompok dari daftar drop-down"
                >
                  <option value="all">🌟 Semua Kelompok ({cardPool.length})</option>
                  {availableGroups.map((g) => (
                    <option key={g.key} value={g.key}>
                      {g.meta.icon} {g.meta.name} ({g.count})
                    </option>
                  ))}
                </select>

                {/* Wrap Toggle */}
                <button
                  onClick={() => setIsWrapGroups(!isWrapGroups)}
                  className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-xl border transition-all cursor-pointer shadow-2xs ${
                    isWrapGroups
                      ? 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border-rose-300 dark:border-rose-800'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                  }`}
                  title={isWrapGroups ? 'Mode pita geser' : 'Tampilkan semua kelompok dalam baris'}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>{isWrapGroups ? 'Pita' : 'Grid'}</span>
                </button>

                {/* Scroll Arrows when not wrapped */}
                {!isWrapGroups && (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => scrollGroups('left')}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                      title="Geser ke kiri"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => scrollGroups('right')}
                      className="w-7 h-7 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-colors cursor-pointer shadow-2xs"
                      title="Geser ke kanan"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Group Pills with Emojis & Counts */}
            <div
              ref={groupsScrollRef}
              className={`${
                isWrapGroups
                  ? 'flex flex-wrap gap-1.5 max-h-[220px] overflow-y-auto pr-1 py-1'
                  : 'flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scroll-smooth select-none'
              }`}
            >
              <button
                type="button"
                onClick={() => setSelectedGroup('all')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                  selectedGroup === 'all'
                    ? 'bg-slate-900 dark:bg-rose-600 text-white shadow-2xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>🌟 Semua Kelompok</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                    selectedGroup === 'all' ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {cardPool.length}
                </span>
              </button>

              {availableGroups.map((g) => {
                const isSelected = selectedGroup === g.key;
                return (
                  <button
                    key={g.key}
                    type="button"
                    onClick={() => setSelectedGroup(g.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 ${
                      isSelected
                        ? 'bg-rose-600 text-white shadow-2xs ring-2 ring-rose-600/20'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                    title={`${g.meta.name}: ${g.meta.desc}`}
                  >
                    <span>{g.meta.icon}</span>
                    <span>{g.meta.name}</span>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-extrabold ${
                        isSelected ? 'bg-white/25 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {g.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Control Bar: Level, Jumlah Kata & Toggle Hiragana */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 sm:px-5 sm:py-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-2xs">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Level Filter (if applicable) */}
            {hasLevelTags && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Level:</span>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      id={`quiz-level-${lvl}`}
                      onClick={() => setLevelFilter(lvl)}
                      className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                        levelFilter === lvl
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700'
                      }`}
                    >
                      {lvl === 'all' ? 'Semua' : lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quiz Count Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Tebak:</span>
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                <button
                  id="quiz-count-all"
                  onClick={() => setCountMode('all')}
                  className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                    countMode === 'all'
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700'
                  }`}
                  title={`Tebak semua kata dalam kategori ini (${effectivePool.length} kata)`}
                >
                  Semua ({effectivePool.length} kata)
                </button>

                {effectivePool.length > 10 && (
                  <button
                    id="quiz-count-10"
                    onClick={() => setCountMode(10)}
                    className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                      countMode === 10
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700'
                    }`}
                  >
                    10
                  </button>
                )}

                {effectivePool.length > 25 && (
                  <button
                    id="quiz-count-25"
                    onClick={() => setCountMode(25)}
                    className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                      countMode === 25
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700'
                    }`}
                  >
                    25
                  </button>
                )}

                {effectivePool.length > 50 && (
                  <button
                    id="quiz-count-50"
                    onClick={() => setCountMode(50)}
                    className={`px-2.5 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                      countMode === 50
                        ? 'bg-rose-600 text-white shadow-2xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700'
                    }`}
                  >
                    50
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Toggle Hiragana Switcher */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              id="toggle-hiragana-reading"
              onClick={() => setShowHiragana(!showHiragana)}
              className={`px-3 py-1.5 text-xs font-extrabold rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 select-none ${
                showHiragana
                  ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-800 ring-2 ring-rose-500/20 shadow-2xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title="Tampilkan atau sembunyikan bacaan Hiragana untuk melatih hafalan kanji"
            >
              {showHiragana ? <Eye className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" /> : <EyeOff className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />}
              <span className="font-jp text-sm font-bold">あ</span>
              <span>Hiragana: <strong className={showHiragana ? 'text-rose-700 dark:text-rose-300' : 'text-slate-600 dark:text-slate-400'}>{showHiragana ? 'ON' : 'OFF'}</strong></span>
            </button>
          </div>
        </div>

        {/* Quiz Progress & Stats Header (Desktop) */}
        <div className="flex items-center justify-between bg-white dark:bg-slate-900 px-5 py-3 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <span>Kata ke-</span>
            <span className="text-rose-600 dark:text-rose-400 font-extrabold text-sm">{currentIndex + 1}</span>
            <span>dari</span>
            <span className="font-extrabold text-slate-800 dark:text-slate-100">{questions.length}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <div className="text-xs font-bold text-slate-700 dark:text-slate-200 bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200/80 dark:border-emerald-800/80 px-3 py-1 rounded-xl">
              Benar: <span className="text-emerald-700 dark:text-emerald-400 font-black text-sm">{score}</span>
              <span className="text-slate-400 font-normal"> / {isAnswered ? currentIndex + 1 : currentIndex} kata ditebak</span>
            </div>

            {answersHistory.length >= 3 && questions.length > 10 && (
              <button
                onClick={handleEarlyFinish}
                className="text-[11px] font-bold text-slate-500 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950/50 px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer flex items-center gap-1"
                title="Akhiri kuis sekarang dan lihat perolehan kata yang berhasil ditebak"
              >
                <Flag className="w-3 h-3 text-slate-400 dark:text-slate-400" />
                <span>Selesai</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200/80 dark:bg-slate-800 h-2 rounded-full overflow-hidden -mt-2">
        <div
          className="bg-rose-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-md text-center relative overflow-hidden">
        {/* Type, Group, and Level Badges */}
        <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/60">
            {currentQ.type === 'meaning' ? 'Tebak Arti Indonesia' : 'Tebak Bahasa Jepang'}
          </span>

          {/* SPESIFIK GOLONGAN KATA: Kata Sifat -i / -na, Kata Kerja Gol 1, 2, 3, dsb */}
          {(() => {
            const wordClass = getWordClassification(currentQ.item);
            return (
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black border shadow-2xs ${wordClass.badgeClass}`}
                title={wordClass.grammarHint}
              >
                <span>{wordClass.icon}</span>
                <span>{wordClass.label}</span>
              </span>
            );
          })()}

          {currentQ.item.subCategory && GROUP_METAS[currentQ.item.subCategory] && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
              <span>{GROUP_METAS[currentQ.item.subCategory].icon}</span>
              <span>{GROUP_METAS[currentQ.item.subCategory].name}</span>
            </span>
          )}

          {currentQ.item.level && (
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
              {currentQ.item.level}
            </span>
          )}
        </div>

        {/* Question Japanese Prompt */}
        <div className="my-4">
          {(() => {
            const promptText = currentQ.type === 'reverse' ? currentQ.item.meaningId : currentQ.item.japanese;
            const itemFurigana = getHiraganaReading(currentQ.item);
            const isJpPrompt = currentQ.type !== 'reverse';
            const isKana = currentQ.item.category === 'hiragana' || currentQ.item.category === 'katakana';
            const hasKanji = containsKanji(promptText);
            // Furigana HANYA untuk karakter yang mengandung Kanji, BUKAN kuis tebak bacaan, dan BUKAN huruf Kana
            const canShowFurigana = isJpPrompt && showHiragana && !isKana && hasKanji && currentQ.type !== 'reading';
            const len = promptText.length;
            const sizeClass =
              len <= 2
                ? 'text-5xl sm:text-6xl'
                : len <= 5
                ? 'text-3xl sm:text-4xl lg:text-5xl'
                : len <= 12
                ? 'text-2xl sm:text-3xl lg:text-4xl'
                : len <= 25
                ? 'text-xl sm:text-2xl'
                : 'text-base sm:text-lg md:text-xl';

            return (
              <div>
                {/* Hiragana Subtitle HANYA jika prompt adalah Kanji Jepang dan bukan kuis tebak bacaan */}
                {canShowFurigana && itemFurigana && itemFurigana !== promptText && (
                  <div className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 font-jp tracking-wider mb-1.5 animate-fadeIn">
                    【 {itemFurigana} 】
                  </div>
                )}
                <div className={`font-jp ${sizeClass} font-black text-slate-900 dark:text-white tracking-normal drop-shadow-xs max-w-xl mx-auto break-words leading-snug`}>
                  {promptText}
                </div>
              </div>
            );
          })()}
          {currentQ.subText && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 font-medium">
              {currentQ.subText}
            </p>
          )}
          {/* Tampilkan bacaan lengkap HANYA setelah soal dijawab agar tidak membocorkan jawaban */}
          {isAnswered && (
            <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold animate-fadeIn">
              <span>Pelafalan: <strong>{currentQ.item.reading}</strong></span>
              {currentQ.item.furigana && currentQ.item.furigana !== currentQ.item.reading && (
                <span className="text-rose-600 dark:text-rose-400 font-jp">({currentQ.item.furigana})</span>
              )}
            </div>
          )}
        </div>

        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100 mb-6">
          {currentQ.questionText}
        </h3>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-5 text-left">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === currentQ.correctAnswer;
            const optDetail = currentQ.optionDetails?.[idx] || currentQ.optionDetails?.find((d) => d.value === option);

            // Cek apakah opsi ini memiliki bacaan Hiragana
            const optFurigana = optDetail?.furigana || (containsJapanese(option) ? getHiraganaReading({ japanese: option }) : undefined);

            let btnStyle = 'bg-slate-50 dark:bg-slate-800/90 hover:bg-rose-50/60 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100';

            if (isAnswered) {
              if (isCorrectAnswer) {
                btnStyle = 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 dark:border-emerald-600 text-emerald-900 dark:text-emerald-200 font-bold ring-2 ring-emerald-300 dark:ring-emerald-700';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 dark:border-rose-600 text-rose-900 dark:text-rose-200 font-bold';
              } else {
                btnStyle = 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                id={`quiz-opt-${idx}`}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option)}
                className={`w-full min-h-[60px] sm:min-h-[66px] p-3.5 sm:p-4 rounded-2xl border text-sm sm:text-base font-semibold transition-all duration-200 flex items-start justify-between gap-3 cursor-pointer select-none active:scale-[0.98] ${btnStyle}`}
              >
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span className="w-7 h-7 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-xs font-bold text-slate-600 dark:text-slate-200 shrink-0 shadow-2xs mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex flex-col min-w-0 flex-1">
                    {/* Teks Opsi Utama */}
                    <span className="font-jp text-left break-words text-base sm:text-lg font-bold leading-snug">
                      {option}
                    </span>

                    {/* Bacaan Hiragana hanya jika opsi berupa karakter Kanji (bukan huruf Kana) dan bukan kuis tebak bacaan */}
                    {showHiragana && optFurigana && optFurigana !== option && containsKanji(option) && currentQ.type !== 'reading' && (
                      <span className="text-xs font-black text-rose-600 dark:text-rose-400 font-jp tracking-wide mt-0.5">
                        【 {optFurigana} 】
                      </span>
                    )}

                    {/* Setelah dijawab, tampilkan arti Indonesia dari opsi ini agar langsung bisa dipelajari */}
                    {isAnswered && optDetail?.meaning && currentQ.type === 'reverse' && (
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-1">
                        Arti: {optDetail.meaning} {optDetail.wordTypeLabel ? `• ${optDetail.wordTypeLabel}` : ''}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-center">
                  {/* Keyboard shortcut hint on desktop */}
                  {!isAnswered && (
                    <span className="hidden sm:inline text-[10px] text-slate-400 dark:text-slate-400 font-mono bg-white dark:bg-slate-700 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">
                      [{idx + 1}]
                    </span>
                  )}
                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation & Next Question button */}
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 text-left"
          >
            <div className="flex-1 min-w-0">
              <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-400 uppercase tracking-wide block">
                Penjelasan & Golongan Kata
              </span>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                {currentQ.explanation}
              </p>

              {/* Box Pembeda Nuansa jika kata ini memiliki makna mirip (seperti Tanjun vs Jimi) */}
              {(() => {
                const nuance = getWordNuanceInfo(currentQ.item);
                if (!nuance) return null;
                return (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-amber-50/90 dark:bg-amber-950/70 border border-amber-200/80 dark:border-amber-800/80 text-xs shadow-2xs">
                    <div className="font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-1.5 mb-0.5">
                      <span>💡 Pembeda Nuansa: {nuance.japanese} (語彙の使い分け)</span>
                    </div>
                    <p className="text-[11px] text-amber-950 dark:text-amber-200 font-medium leading-relaxed">
                      {nuance.nuanceExplanation}
                    </p>
                    <div className="mt-1 text-[10px] text-amber-800/90 dark:text-amber-300/90">
                      <strong>Konteks:</strong> {nuance.contextUsage}
                    </div>
                  </div>
                );
              })()}
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-slate-900 dark:bg-rose-600 hover:bg-slate-800 dark:hover:bg-rose-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 select-none active:scale-95"
            >
              <span>{currentIndex < questions.length - 1 ? 'Kata Berikutnya' : 'Lihat Hasil'}</span>
              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">[Enter]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Helper info on PC */}
      <div className="text-center text-xs text-slate-400 dark:text-slate-500 font-medium hidden sm:block">
        Tekan angka <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px]">1</kbd>-<kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px]">4</kbd> atau <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px]">A</kbd>-<kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px]">D</kbd> untuk memilih &amp; <kbd className="px-1.5 py-0.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-slate-600 dark:text-slate-300 font-mono text-[10px]">Enter</kbd> untuk lanjut
      </div>
    </div>
  );
};
