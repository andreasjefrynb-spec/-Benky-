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
} from 'lucide-react';
import { CardItem, QuizQuestion } from '../types';
import { generateQuizQuestions } from '../data';
import { soundManager } from '../utils/audio';

interface QuizViewProps {
  cardPool: CardItem[];
  speechRate: number;
  onCompleteQuiz: (correctCount: number, total: number) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({
  cardPool,
  speechRate,
  onCompleteQuiz,
}) => {
  const [levelFilter, setLevelFilter] = useState<'all' | 'N5' | 'N4' | 'N3'>('all');
  const [countMode, setCountMode] = useState<'all' | 10 | 25 | 50 | 100>('all');
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

  useEffect(() => {
    return soundManager.onPlaybackChange((playing) => {
      setIsPlayingAudio(playing);
    });
  }, []);

  // Check if cardPool has cards with N5/N4/N3 levels
  const hasLevelTags = cardPool.some((c) => c.level === 'N5' || c.level === 'N4' || c.level === 'N3');

  // Filter pool based on level
  const effectivePool = useMemo(() => {
    if (levelFilter === 'all') return cardPool;
    const filtered = cardPool.filter((c) => c.level === levelFilter);
    return filtered.length >= 4 ? filtered : cardPool;
  }, [cardPool, levelFilter]);

  // Start new quiz
  const startNewQuiz = (customCount?: 'all' | 10 | 25 | 50 | 100) => {
    const targetCount = customCount ?? countMode;
    const qList = generateQuizQuestions(effectivePool, targetCount);
    setQuestions(qList);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setAnswersHistory([]);

    // If first question is audio, play it
    if (qList[0]?.type === 'audio') {
      setTimeout(() => {
        soundManager.speak(qList[0].item.furigana || qList[0].item.kanji || qList[0].item.japanese, speechRate);
      }, 300);
    }
  };

  useEffect(() => {
    startNewQuiz();
  }, [effectivePool, countMode]);

  const currentQ = questions[currentIndex];

  // Auto-play audio when question is of type 'audio'
  useEffect(() => {
    if (currentQ?.type === 'audio' && !isAnswered) {
      soundManager.speak(currentQ.item.furigana || currentQ.item.kanji || currentQ.item.japanese, speechRate);
    }
  }, [currentIndex, currentQ, isAnswered, speechRate]);

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
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
        <p className="text-slate-600 font-semibold mb-4">Mempersiapkan soal kuis...</p>
        <button
          onClick={() => startNewQuiz()}
          className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-bold"
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
      <div className="w-full max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm text-center">
        <div className="text-5xl mb-3">{emoji}</div>
        <h2 className="text-2xl font-black text-slate-900 mb-1">
          Kuis Selesai!
        </h2>
        <p className="text-sm text-slate-500 mb-6">{feedback}</p>

        {/* Primary Result Card: Benar berapa kata dari semua kata yang ditebak */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-6 sm:p-8 mb-6 shadow-2xs">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-widest block mb-1">
            Hasil Tebakan
          </span>
          <div className="text-3xl sm:text-5xl font-black text-emerald-700 tracking-tight my-2">
            Benar {score} dari {totalGuessed} kata
          </div>
          <p className="text-xs sm:text-sm text-emerald-800/80 font-semibold">
            Tingkat Akurasi: <span className="font-extrabold">{percentage}%</span> ({score} Benar, {wrongCount} Salah)
          </p>
        </div>

        {/* 3-Column Summary: Total Ditebak, Benar, Salah (Streak Ditiadakan) */}
        <div className="grid grid-cols-3 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/60 mb-6">
          <div>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Total Ditebak</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-800">
              {totalGuessed}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Benar</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">
              {score}
            </span>
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 block uppercase">Salah</span>
            <span className="text-2xl sm:text-3xl font-black text-rose-600">
              {wrongCount}
            </span>
          </div>
        </div>

        {/* Review Answers */}
        <div className="text-left mb-6">
          <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-1.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Tinjauan Semua Kata yang Ditebak ({answersHistory.length}):</span>
          </h3>
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {answersHistory.map((item, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-xs flex items-start justify-between gap-2 ${
                  item.isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                    : 'bg-rose-50/50 border-rose-200 text-slate-800'
                }`}
              >
                <div className="space-y-0.5">
                  <div className="font-bold flex items-center gap-1.5">
                    <span className="text-slate-400 font-mono text-[11px]">#{idx + 1}</span>
                    <span className="font-jp text-sm text-slate-900">{item.question.item.japanese}</span>
                    {item.question.item.reading && (
                      <span className="text-slate-500">({item.question.item.reading})</span>
                    )}
                  </div>
                  <p className="text-slate-600">
                    Jawabanmu:{' '}
                    <strong className={item.isCorrect ? 'text-emerald-700' : 'text-rose-700'}>
                      {item.userAnswer}
                    </strong>
                  </p>
                  {!item.isCorrect && (
                    <p className="text-emerald-700 font-semibold">
                      Benar: {item.question.correctAnswer}
                    </p>
                  )}
                </div>
                {item.isCorrect ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
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
            <span>Mulai Ulang Kuis</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-5">
      {/* Control Bar: Level & Jumlah Kata (Termasuk Tebak Semua Kata) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3.5 sm:px-5 sm:py-3 rounded-2xl border border-slate-200/90 shadow-2xs">
        {/* Level Filter (if applicable) */}
        {hasLevelTags && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Level:</span>
            <div className="flex items-center bg-slate-100 p-1 rounded-xl">
              {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
                <button
                  key={lvl}
                  id={`quiz-level-${lvl}`}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                    levelFilter === lvl
                      ? 'bg-rose-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
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
          <span className="text-xs font-bold text-slate-500">Tebak:</span>
          <div className="flex items-center bg-slate-100 p-1 rounded-xl">
            <button
              id="quiz-count-all"
              onClick={() => setCountMode('all')}
              className={`px-3 py-1 text-xs font-extrabold rounded-lg transition-all cursor-pointer ${
                countMode === 'all'
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
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
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
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
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
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
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                50
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quiz Progress & Stats Header (Streak Ditiadakan Sesuai Permintaan) */}
      <div className="flex items-center justify-between bg-white px-5 py-3 rounded-2xl border border-slate-200/90 shadow-xs">
        <div className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
          <span>Kata ke-</span>
          <span className="text-rose-600 font-extrabold text-sm">{currentIndex + 1}</span>
          <span>dari</span>
          <span className="font-extrabold text-slate-800">{questions.length}</span>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Menampilkan hanya benar berapa kata dari yang ditebak */}
          <div className="text-xs font-bold text-slate-700 bg-emerald-50 border border-emerald-200/80 px-3 py-1 rounded-xl">
            Benar: <span className="text-emerald-700 font-black text-sm">{score}</span>
            <span className="text-slate-400 font-normal"> / {isAnswered ? currentIndex + 1 : currentIndex} kata ditebak</span>
          </div>

          {/* Opsi selesaikan kuis kapan saja untuk melihat perolehan saat ini */}
          {answersHistory.length >= 3 && questions.length > 10 && (
            <button
              onClick={handleEarlyFinish}
              className="text-[11px] font-bold text-slate-500 hover:text-rose-700 hover:bg-rose-50 px-2.5 py-1 rounded-lg border border-slate-200 transition-colors cursor-pointer flex items-center gap-1"
              title="Akhiri kuis sekarang dan lihat perolehan kata yang berhasil ditebak"
            >
              <Flag className="w-3 h-3 text-slate-400" />
              <span>Selesai</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200/80 h-2 rounded-full overflow-hidden -mt-2">
        <div
          className="bg-rose-500 h-full transition-all duration-300 rounded-full"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md text-center relative overflow-hidden">
        {/* Type Badge */}
        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-100 mb-4">
          {currentQ.type === 'meaning' && 'Tebak Arti Indonesia'}
          {currentQ.type === 'reading' && 'Tebak Cara Baca Romaji'}
          {currentQ.type === 'reverse' && 'Tebak Karakter Jepang'}
          {currentQ.type === 'audio' && 'Kuis Pendengaran (Audio)'}
        </span>

        {/* Question Japanese Prompt */}
        {currentQ.type === 'audio' ? (
          <div className="my-4 flex flex-col items-center">
            <button
              id="quiz-audio-play-btn"
              onClick={() => soundManager.speak(currentQ.item.furigana || currentQ.item.kanji || currentQ.item.japanese, speechRate)}
              className={`w-20 h-20 rounded-full text-white flex items-center justify-center shadow-lg transition-all cursor-pointer mb-2 select-none ${
                isPlayingAudio
                  ? 'bg-rose-600 scale-110 ring-4 ring-rose-200 animate-pulse shadow-rose-300'
                  : 'bg-rose-500 hover:bg-rose-600 shadow-rose-200 hover:scale-105 active:scale-95'
              }`}
              title="Putar Suara Bahasa Jepang"
            >
              <Volume2 className="w-9 h-9" />
            </button>
            <p className="text-xs font-bold text-slate-500">
              {isPlayingAudio ? 'Sedang memutar suara...' : 'Ketuk untuk mendengarkan pelafalannya'}
            </p>
          </div>
        ) : (
          <div className="my-4">
            {(() => {
              const promptText = currentQ.type === 'reverse' ? currentQ.item.meaningId : currentQ.item.japanese;
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
                <div className={`font-jp ${sizeClass} font-black text-slate-900 tracking-normal drop-shadow-xs max-w-xl mx-auto break-words leading-snug`}>
                  {promptText}
                </div>
              );
            })()}
            {currentQ.subText && (
              <p className="text-xs text-slate-500 mt-2 font-medium">
                {currentQ.subText}
              </p>
            )}
          </div>
        )}

        <h3 className="text-base sm:text-lg font-bold text-slate-800 mb-6">
          {currentQ.questionText}
        </h3>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-5 text-left">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === currentQ.correctAnswer;

            let btnStyle = 'bg-slate-50 hover:bg-rose-50/60 border-slate-200 text-slate-800';

            if (isAnswered) {
              if (isCorrectAnswer) {
                btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-300';
              } else if (isSelected) {
                btnStyle = 'bg-rose-50 border-rose-500 text-rose-900 font-bold';
              } else {
                btnStyle = 'bg-slate-50/50 border-slate-200 text-slate-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                id={`quiz-opt-${idx}`}
                disabled={isAnswered}
                onClick={() => handleSelectOption(option)}
                className={`w-full min-h-[56px] sm:min-h-[60px] p-3.5 sm:p-4 rounded-2xl border text-sm sm:text-base font-semibold transition-all duration-200 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none active:scale-[0.98] ${btnStyle}`}
              >
                <div className="flex items-start sm:items-center gap-3 min-w-0 flex-1">
                  <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 shrink-0 shadow-2xs mt-0.5 sm:mt-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-jp text-left break-words leading-snug flex-1">{option}</span>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-center">
                  {/* Keyboard shortcut hint on desktop */}
                  {!isAnswered && (
                    <span className="hidden sm:inline text-[10px] text-slate-400 font-mono bg-white px-1.5 py-0.5 rounded border border-slate-200">
                      [{idx + 1}]
                    </span>
                  )}
                  {isAnswered && isCorrectAnswer && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectAnswer && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
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
            className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-left"
          >
            <div>
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wide block">
                Penjelasan
              </span>
              <p className="text-xs sm:text-sm text-slate-700 font-medium">
                {currentQ.explanation}
              </p>
            </div>

            <button
              onClick={handleNext}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0 select-none active:scale-95"
            >
              <span>{currentIndex < questions.length - 1 ? 'Kata Berikutnya' : 'Lihat Hasil'}</span>
              <span className="text-[10px] text-slate-400 font-normal hidden sm:inline">[Enter]</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>

      {/* Helper info on PC */}
      <div className="text-center text-xs text-slate-400 font-medium hidden sm:block">
        Tekan angka <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">1</kbd>-<kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">4</kbd> atau <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">A</kbd>-<kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">D</kbd> untuk memilih &amp; <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-600 font-mono text-[10px]">Enter</kbd> untuk lanjut
      </div>
    </div>
  );
};
