import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { CategorySelector } from './components/CategorySelector';
import { ModeSelector } from './components/ModeSelector';
import { FlashcardView } from './components/FlashcardView';
import { CharacterChart } from './components/CharacterChart';
import { QuizView } from './components/QuizView';
import { WritingCanvas } from './components/WritingCanvas';
import { CustomCardModal } from './components/CustomCardModal';
import { VocabGroupView } from './components/VocabGroupView';
import { ParticlesView } from './components/ParticlesView';
import { ConjugationView } from './components/ConjugationView';
import {
  MainCategory,
  StudyMode,
  CardItem,
  UserItemProgress,
  UserStats,
} from './types';
import {
  hiraganaData,
  katakanaData,
  kanjiData,
  vocabData,
  phrasesData,
  particlesCardItems,
  conjugationCardItems,
  getCardsByCategory,
  getAllBuiltInCards,
} from './data';
import {
  getStoredProgress,
  saveStoredProgress,
  getStoredStats,
  updateStoredStats,
  getStoredCustomCards,
  saveStoredCustomCards,
} from './utils/storage';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MainCategory>('kanji');
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcard');
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // Persistence States
  const [customCards, setCustomCards] = useState<CardItem[]>([]);
  const [progress, setProgress] = useState<Record<string, UserItemProgress>>({});
  const [stats, setStats] = useState<UserStats>(getStoredStats());

  // Modal & Navigation States
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);
  const [writingTargetCard, setWritingTargetCard] = useState<CardItem | null>(null);
  const [vocabGroupTarget, setVocabGroupTarget] = useState<{
    subCategory: string;
    level: 'all' | 'N5' | 'N4' | 'N3';
  } | null>(null);

  // Initialize data from localStorage on mount
  useEffect(() => {
    setCustomCards(getStoredCustomCards());
    setProgress(getStoredProgress());
    setStats(getStoredStats());
  }, []);

  // Update progress helper
  const handleUpdateProgress = (id: string, status: 'new' | 'learning' | 'mastered') => {
    const prev = progress[id] || {
      id,
      status: 'new',
      reviewCount: 0,
      correctCount: 0,
      isFavorite: false,
    };

    const isNowMastered = status === 'mastered' && prev.status !== 'mastered';
    const updatedProg: Record<string, UserItemProgress> = {
      ...progress,
      [id]: {
        ...prev,
        status,
        reviewCount: prev.reviewCount + 1,
        lastStudied: Date.now(),
        correctCount: status === 'mastered' ? prev.correctCount + 1 : prev.correctCount,
      },
    };

    setProgress(updatedProg);
    saveStoredProgress(updatedProg);

    // Update stats
    updateStoredStats((s) => {
      const nextStats: UserStats = {
        ...s,
        totalCardsReviewed: s.totalCardsReviewed + 1,
        masteredCount: isNowMastered ? s.masteredCount + 1 : s.masteredCount,
      };
      setStats(nextStats);
      return nextStats;
    });
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    const prev = progress[id] || {
      id,
      status: 'new',
      reviewCount: 0,
      correctCount: 0,
      isFavorite: false,
    };

    const updatedProg: Record<string, UserItemProgress> = {
      ...progress,
      [id]: {
        ...prev,
        isFavorite: !prev.isFavorite,
      },
    };

    setProgress(updatedProg);
    saveStoredProgress(updatedProg);
  };

  // Add custom card
  const handleAddCustomCard = (newCard: CardItem) => {
    const updated = [newCard, ...customCards];
    setCustomCards(updated);
    saveStoredCustomCards(updated);
    setIsAddCustomOpen(false);
    setActiveCategory('custom');
  };

  // Delete custom card
  const handleDeleteCustomCard = (id: string) => {
    const updated = customCards.filter((c) => c.id !== id);
    setCustomCards(updated);
    saveStoredCustomCards(updated);
  };

  // Reset progress
  const handleResetProgress = () => {
    setProgress({});
    saveStoredProgress({});
    const initialStats: UserStats = {
      streakDays: 1,
      lastStudyDate: new Date().toISOString().split('T')[0],
      totalCardsReviewed: 0,
      quizCompleted: 0,
      masteredCount: 0,
    };
    setStats(initialStats);
    updateStoredStats(() => initialStats);
  };

  // Quiz completion handler
  const handleCompleteQuiz = (correctCount: number, total: number) => {
    updateStoredStats((s) => {
      const next = {
        ...s,
        quizCompleted: s.quizCompleted + 1,
        totalCardsReviewed: s.totalCardsReviewed + total,
      };
      setStats(next);
      return next;
    });
  };

  // Toggle speech rate (Normal 0.9x / Slow 0.75x)
  const handleToggleSpeechRate = () => {
    setSpeechRate((prev) => (prev === 0.9 ? 0.75 : 0.9));
  };

  // Switch to writing practice from Chart
  const handlePracticeWriting = (item: CardItem) => {
    setWritingTargetCard(item);
    setStudyMode('writing');
  };

  // Get current active cards
  const currentCategoryCards = useMemo(() => {
    return getCardsByCategory(activeCategory, customCards);
  }, [activeCategory, customCards]);

  // All cards combined
  const allCardsCombined = useMemo(() => {
    return [...getAllBuiltInCards(), ...customCards];
  }, [customCards]);

  // Counts for categories
  const categoryCounts: Record<MainCategory, number> = useMemo(() => {
    return {
      kanji: kanjiData.length,
      vocab: vocabData.length,
      phrases: phrasesData.length,
      particles: particlesCardItems.length,
      conjugation: conjugationCardItems.length,
      hiragana: hiraganaData.length,
      katakana: katakanaData.length,
      custom: customCards.length,
    };
  }, [customCards.length]);

  // Show chart option for Vocabulary Groups, Kana character tables, Particles, and Conjugation
  const showChartOption =
    activeCategory === 'vocab' ||
    activeCategory === 'hiragana' ||
    activeCategory === 'katakana' ||
    activeCategory === 'particles' ||
    activeCategory === 'conjugation';

  // If user is on chart mode and switches to a category without chart, fallback to flashcard
  useEffect(() => {
    if (studyMode === 'chart' && !showChartOption) {
      setStudyMode('flashcard');
    }
  }, [activeCategory, showChartOption, studyMode]);

  // If user is on writing mode and switches to a category other than kanji, hiragana, katakana, fallback to flashcard
  useEffect(() => {
    if (studyMode === 'writing' && activeCategory !== 'kanji' && activeCategory !== 'hiragana' && activeCategory !== 'katakana') {
      setStudyMode('flashcard');
    }
  }, [activeCategory, studyMode]);

  // Scroll to top whenever category or study mode changes so the view is fresh and never scrolled under header
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeCategory, studyMode]);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-slate-800 selection:bg-rose-500 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        onOpenAddCustom={() => setIsAddCustomOpen(true)}
        speechRate={speechRate}
        onToggleSpeechRate={handleToggleSpeechRate}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-6">
        {/* Category Selector Bar */}
        <section aria-label="Pilihan Kategori Belajar">
          <CategorySelector
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setWritingTargetCard(null);
              setVocabGroupTarget(null);
              if (cat === 'particles' || cat === 'conjugation') {
                setStudyMode('chart');
              }
            }}
            counts={categoryCounts}
          />
        </section>

        {/* Mode Selector (Flashcard, Chart/Kelompok, Quiz, Writing) */}
        <section aria-label="Pilihan Mode Belajar">
          <ModeSelector
            currentMode={studyMode}
            onSelectMode={setStudyMode}
            showChartOption={showChartOption}
            activeCategory={activeCategory}
          />
        </section>

        {/* Dynamic Study Content View */}
        <div className="flex-1 py-2">
          {studyMode === 'flashcard' && (
            <FlashcardView
              key={`flashcard-${activeCategory}-${vocabGroupTarget?.subCategory || 'all'}-${vocabGroupTarget?.level || 'all'}`}
              cards={currentCategoryCards}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onToggleFavorite={handleToggleFavorite}
              speechRate={speechRate}
              initialSubCategory={vocabGroupTarget?.subCategory || 'all'}
              initialLevel={vocabGroupTarget?.level || 'all'}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'vocab' && (
            <VocabGroupView
              cards={vocabData}
              progress={progress}
              speechRate={speechRate}
              onStartFlashcard={(subCategory, level) => {
                setVocabGroupTarget({ subCategory, level });
                setStudyMode('flashcard');
              }}
              onToggleFavorite={handleToggleFavorite}
            />
          )}

          {studyMode === 'chart' && (activeCategory === 'hiragana' || activeCategory === 'katakana') && (
            <CharacterChart
              category={activeCategory as 'hiragana' | 'katakana'}
              cards={currentCategoryCards}
              progress={progress}
              speechRate={speechRate}
              onPracticeWriting={handlePracticeWriting}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'particles' && (
            <ParticlesView speechRate={speechRate} />
          )}

          {studyMode === 'chart' && activeCategory === 'conjugation' && (
            <ConjugationView speechRate={speechRate} />
          )}

          {studyMode === 'quiz' && (
            <QuizView
              cardPool={currentCategoryCards.length >= 4 ? currentCategoryCards : allCardsCombined}
              speechRate={speechRate}
              onCompleteQuiz={handleCompleteQuiz}
            />
          )}

          {studyMode === 'writing' && (
            <WritingCanvas
              cards={currentCategoryCards.length > 0 ? currentCategoryCards : kanjiData}
              initialCard={writingTargetCard}
              speechRate={speechRate}
            />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 bg-white py-4 text-center text-xs text-slate-400">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            日本語 ケラス &copy; {new Date().getFullYear()} &bull; Didesain untuk Pembelajar Bahasa Jepang
          </p>
          <div className="flex items-center gap-3 text-slate-500 font-medium flex-wrap justify-center">
            <span>Kanji JLPT N5-N3</span>
            <span>&bull;</span>
            <span>1.400+ Kosakata (N5-N3)</span>
            <span>&bull;</span>
            <span>Partikel & Konjugasi Lengkap</span>
            <span>&bull;</span>
            <span>Audio Pelafalan Alami</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <CustomCardModal
        isOpen={isAddCustomOpen}
        onClose={() => setIsAddCustomOpen(false)}
        customCards={customCards}
        onAddCard={handleAddCustomCard}
        onDeleteCard={handleDeleteCustomCard}
      />
    </div>
  );
}
