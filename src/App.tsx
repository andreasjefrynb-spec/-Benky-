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
import { MinnaView } from './components/MinnaView';
import { TobiraView } from './components/TobiraView';
import { QuartetView } from './components/QuartetView';
import { ShinKanzenView } from './components/ShinKanzenView';
import { SouMatomeView } from './components/SouMatomeView';
import { TryJlptView } from './components/TryJlptView';
import { IrodoriView } from './components/IrodoriView';
import { SSWView } from './components/SSWView';
import { DokkaiView } from './components/DokkaiView';
import { ChoukaiView } from './components/ChoukaiView';
import { AdvancedGrammarView } from './components/AdvancedGrammarView';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import {
  MainCategory,
  StudyMode,
  CardItem,
  UserItemProgress,
  UserStats,
  LevelFilterOption,
} from './types';
import {
  hiraganaData,
  katakanaData,
  kanjiData,
  vocabData,
  phrasesData,
  particlesCardItems,
  conjugationCardItems,
  minnaCardItems,
  tobiraCardItems,
  quartetCardItems,
  shinKanzenCardItems,
  souMatomeCardItems,
  tryJlptCardItems,
  irodoriCardItems,
  sswCardItems,
  dokkaiN1Data,
  choukaiN1Data,
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
import { registerReadings } from './utils/audio';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<MainCategory>('search');
  const [studyMode, setStudyMode] = useState<StudyMode>('flashcard');
  const [speechRate, setSpeechRate] = useState<number>(0.9);

  // Persistence States
  const [customCards, setCustomCards] = useState<CardItem[]>([]);
  const [progress, setProgress] = useState<Record<string, UserItemProgress>>({});
  const [stats, setStats] = useState<UserStats>(getStoredStats());

  // Modal & Navigation States
  const [isAddCustomOpen, setIsAddCustomOpen] = useState(false);
  const [isGlobalSearchOpen, setIsGlobalSearchOpen] = useState(false);
  const [initialSearchCardId, setInitialSearchCardId] = useState<string | undefined>(undefined);
  const [writingTargetCard, setWritingTargetCard] = useState<CardItem | null>(null);
  const [vocabGroupTarget, setVocabGroupTarget] = useState<{
    subCategory: string;
    level: LevelFilterOption;
  } | null>(null);
  const [quizGroupTarget, setQuizGroupTarget] = useState<{
    subCategory: string;
    level: LevelFilterOption;
  } | null>(null);

  const handleSelectCardFromSearch = (card: CardItem, category: string) => {
    // Determine which main category this card belongs to
    let targetCat: MainCategory = 'vocab';
    if (card.id.startsWith('h_')) {
      targetCat = 'hiragana';
    } else if (card.id.startsWith('k_')) {
      targetCat = 'katakana';
    } else if (card.id.startsWith('kanji_')) {
      targetCat = 'kanji';
    } else if (card.id.startsWith('grammar_') || card.id.startsWith('p_') || card.subCategory === 'particles') {
      if (card.subCategory === 'particles') {
        targetCat = 'particles';
      } else {
        targetCat = 'phrases';
      }
    } else if (card.id.startsWith('conjugation_') || card.subCategory === 'conjugation') {
      targetCat = 'conjugation';
    } else {
      // It's Minna, Tobira, Quartet, Shin Kanzen, Sou-matome, Try, Irodori, SSW, or custom
      const sub = card.subCategory || '';
      if (card.id.startsWith('minna_') || sub.startsWith('bab_')) {
        targetCat = 'minna';
      } else if (card.id.startsWith('tobira_') || sub.startsWith('tobira_')) {
        targetCat = 'tobira';
      } else if (card.id.startsWith('quartet_') || sub.startsWith('quartet_')) {
        targetCat = 'quartet';
      } else if (card.id.startsWith('shinkanzen_') || sub.startsWith('shinkanzen_')) {
        targetCat = 'shinkanzen';
      } else if (card.id.startsWith('soumatome_') || sub.startsWith('soumatome_')) {
        targetCat = 'soumatome';
      } else if (card.id.startsWith('try_') || sub.startsWith('try_')) {
        targetCat = 'tryjlpt';
      } else if (card.id.startsWith('irodori_') || sub.startsWith('irodori_')) {
        targetCat = 'irodori';
      } else if (card.id.startsWith('ssw_') || sub.startsWith('ssw_')) {
        targetCat = 'ssw';
      } else if (card.id.startsWith('custom_')) {
        targetCat = 'custom';
      } else {
        targetCat = 'vocab';
      }
    }

    // Set the category and active mode to flashcard
    setActiveCategory(targetCat);
    setStudyMode('flashcard');
    setVocabGroupTarget({ subCategory: card.subCategory || 'all', level: card.level || 'all' });
    setInitialSearchCardId(card.id);
  };

  // Initialize data from localStorage on mount
  useEffect(() => {
    setCustomCards(getStoredCustomCards());
    setProgress(getStoredProgress());
    setStats(getStoredStats());
    try {
      const allCards = getAllBuiltInCards();
      registerReadings(allCards);
    } catch {
      // ignore
    }
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
      search: 0,
      minna: minnaCardItems.length,
      tobira: tobiraCardItems.length,
      quartet: quartetCardItems.length,
      shinkanzen: shinKanzenCardItems.length,
      soumatome: souMatomeCardItems.length,
      tryjlpt: tryJlptCardItems.length,
      irodori: irodoriCardItems.length,
      ssw: sswCardItems.length,
      kanji: kanjiData.length,
      vocab: vocabData.length,
      phrases: phrasesData.length,
      dokkai: dokkaiN1Data.length,
      choukai: choukaiN1Data.length,
      particles: particlesCardItems.length,
      conjugation: conjugationCardItems.length,
      hiragana: hiraganaData.length,
      katakana: katakanaData.length,
      custom: customCards.length,
    };
  }, [customCards.length]);

  // Show chart option for Minna, Phrases/Advanced Grammar, Tobira, Quartet, Shin Kanzen, Sou-matome, Try JLPT, Irodori, SSW, Vocabulary Groups, Kana, Particles, and Conjugation
  const showChartOption =
    activeCategory === 'phrases' ||
    activeCategory === 'minna' ||
    activeCategory === 'tobira' ||
    activeCategory === 'quartet' ||
    activeCategory === 'shinkanzen' ||
    activeCategory === 'soumatome' ||
    activeCategory === 'tryjlpt' ||
    activeCategory === 'irodori' ||
    activeCategory === 'ssw' ||
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
        onOpenGlobalSearch={() => setActiveCategory('search')}
        speechRate={speechRate}
        onToggleSpeechRate={handleToggleSpeechRate}
        onSelectSpeechRate={(rate) => setSpeechRate(rate)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-2.5 sm:px-6 py-2 sm:py-6 flex flex-col gap-2.5 sm:gap-6">
        {/* Category Selector Bar */}
        <section aria-label="Pilihan Kategori Belajar">
          <CategorySelector
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              setWritingTargetCard(null);
              setVocabGroupTarget(null);
              setQuizGroupTarget(null);
              setInitialSearchCardId(undefined);
              if (
                cat === 'phrases' ||
                cat === 'minna' ||
                cat === 'tobira' ||
                cat === 'quartet' ||
                cat === 'shinkanzen' ||
                cat === 'soumatome' ||
                cat === 'tryjlpt' ||
                cat === 'irodori' ||
                cat === 'ssw' ||
                cat === 'particles' ||
                cat === 'conjugation' ||
                cat === 'dokkai' ||
                cat === 'choukai'
              ) {
                setStudyMode('chart');
              }
            }}
            counts={categoryCounts}
            onOpenAddCustom={() => setIsAddCustomOpen(true)}
          />
        </section>

        {/* Mode Selector (Flashcard, Chart/Kelompok, Quiz, Writing) */}
        {activeCategory !== 'dokkai' && activeCategory !== 'choukai' && activeCategory !== 'search' && (
          <section aria-label="Pilihan Mode Belajar">
            <ModeSelector
              currentMode={studyMode}
              onSelectMode={setStudyMode}
              showChartOption={showChartOption}
              activeCategory={activeCategory}
            />
          </section>
        )}

        {/* Dynamic Study Content View */}
        <div className="flex-1 py-0.5 sm:py-2">
          {activeCategory === 'search' && (
            <GlobalSearchModal
              isInline={true}
              allCards={allCardsCombined}
              speechRate={speechRate}
              onSelectCard={handleSelectCardFromSearch}
            />
          )}

          {activeCategory === 'dokkai' && (
            <DokkaiView speechRate={speechRate} />
          )}

          {activeCategory === 'choukai' && (
            <ChoukaiView speechRate={speechRate} />
          )}

          {activeCategory !== 'dokkai' && activeCategory !== 'choukai' && studyMode === 'flashcard' && (
            <FlashcardView
              key={`flashcard-${activeCategory}-${vocabGroupTarget?.subCategory || 'all'}-${vocabGroupTarget?.level || 'all'}-${initialSearchCardId || 'none'}`}
              cards={currentCategoryCards}
              progress={progress}
              onUpdateProgress={handleUpdateProgress}
              onToggleFavorite={handleToggleFavorite}
              onPracticeWriting={handlePracticeWriting}
              speechRate={speechRate}
              initialSubCategory={vocabGroupTarget?.subCategory || 'all'}
              initialLevel={vocabGroupTarget?.level || 'all'}
              initialCardId={initialSearchCardId}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'minna' && (
            <MinnaView
              speechRate={speechRate}
              onPracticeLesson={(chapter, part) => {
                const subCat = part && part.includes('Chuukyuu') ? `bab_chuukyu_${chapter}` : `bab_${chapter}`;
                setVocabGroupTarget({ subCategory: subCat, level: 'all' });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(chapter, part) => {
                const subCat = part && part.includes('Chuukyuu') ? `bab_chuukyu_${chapter}` : `bab_${chapter}`;
                setQuizGroupTarget({ subCategory: subCat, level: 'all' });
                setStudyMode('quiz');
              }}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'tobira' && (
            <TobiraView
              speechRate={speechRate}
              onPracticeChapter={(chapter) => {
                setVocabGroupTarget({ subCategory: `tobira_${chapter}`, level: 'all' });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(chapter) => {
                setQuizGroupTarget({ subCategory: `tobira_${chapter}`, level: 'all' });
                setStudyMode('quiz');
              }}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'quartet' && (
            <QuartetView
              speechRate={speechRate}
              onPracticeLesson={(volume, lesson) => {
                setVocabGroupTarget({ subCategory: `quartet_v${volume}_l${lesson}`, level: 'all' });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(volume, lesson) => {
                setQuizGroupTarget({ subCategory: `quartet_v${volume}_l${lesson}`, level: 'all' });
                setStudyMode('quiz');
              }}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'shinkanzen' && (
            <ShinKanzenView
              speechRate={speechRate}
              onPracticeSection={(level, id) => {
                setVocabGroupTarget({ subCategory: `shinkanzen_${level}`, level });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(level, id) => {
                setQuizGroupTarget({ subCategory: `shinkanzen_${level}`, level });
                setStudyMode('quiz');
              }}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'soumatome' && (
            <SouMatomeView
              speechRate={speechRate}
              onPracticeDay={(level, week, day) => {
                setVocabGroupTarget({ subCategory: `soumatome_${level}_w${week}`, level });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(level, week) => {
                setQuizGroupTarget({ subCategory: `soumatome_${level}_w${week}`, level });
                setStudyMode('quiz');
              }}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'tryjlpt' && (
            <TryJlptView
              speechRate={speechRate}
              onPracticeLesson={(level, chapter) => {
                setVocabGroupTarget({ subCategory: `try_${level}_ch${chapter}`, level });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(level, chapter) => {
                setQuizGroupTarget({ subCategory: `try_${level}_ch${chapter}`, level });
                setStudyMode('quiz');
              }}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'irodori' && (
            <IrodoriView
              speechRate={speechRate}
              onPracticeTopic={(topicId) => {
                setVocabGroupTarget({ subCategory: topicId, level: 'all' });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(topicId) => {
                setQuizGroupTarget({ subCategory: topicId, level: 'all' });
                setStudyMode('quiz');
              }}
            />
          )}

          {studyMode === 'chart' && activeCategory === 'ssw' && (
            <SSWView
              speechRate={speechRate}
              onPracticeSector={(sectorId) => {
                setVocabGroupTarget({ subCategory: sectorId, level: 'all' });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(sectorId) => {
                setQuizGroupTarget({ subCategory: sectorId, level: 'all' });
                setStudyMode('quiz');
              }}
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
              onStartQuiz={(subCategory, level) => {
                setQuizGroupTarget({ subCategory, level });
                setStudyMode('quiz');
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

          {studyMode === 'chart' && activeCategory === 'phrases' && (
            <AdvancedGrammarView
              speechRate={speechRate}
              onPracticeGrammar={(level, id) => {
                setVocabGroupTarget({ subCategory: id, level });
                setStudyMode('flashcard');
              }}
              onStartQuiz={(level, id) => {
                setQuizGroupTarget({ subCategory: id, level });
                setStudyMode('quiz');
              }}
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
              key={`quiz-${activeCategory}-${quizGroupTarget?.subCategory || 'all'}-${quizGroupTarget?.level || 'all'}`}
              cardPool={
                quizGroupTarget && activeCategory === 'vocab'
                  ? vocabData
                  : currentCategoryCards.length >= 4
                  ? currentCategoryCards
                  : allCardsCombined
              }
              speechRate={speechRate}
              initialSubCategory={quizGroupTarget?.subCategory}
              initialLevel={quizGroupTarget?.level}
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
            日本語 ケラス &copy; {new Date().getFullYear()} &bull; Didesain untuk Pembelajar Bahasa Jepang Lengkap (N5–N3)
          </p>
          <div className="flex items-center gap-3 text-slate-500 font-medium flex-wrap justify-center">
            <span>Minna (Shokyu &amp; Chuukyu)</span>
            <span>&bull;</span>
            <span>Tobira &amp; Quartet</span>
            <span>&bull;</span>
            <span>Shin Kanzen Master &amp; Sou-matome &amp; TRY! JLPT</span>
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

      <GlobalSearchModal
        isOpen={isGlobalSearchOpen}
        onClose={() => setIsGlobalSearchOpen(false)}
        allCards={allCardsCombined}
        speechRate={speechRate}
        onSelectCard={handleSelectCardFromSearch}
      />
    </div>
  );
}
