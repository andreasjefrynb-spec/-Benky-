import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Volume2,
  AlertTriangle,
  BookOpen,
  Sparkles,
  Layers,
  ChevronRight,
  Info,
} from 'lucide-react';
import { CardItem } from '../types';
import { getWordConjugation, WordConjugationProfile, DetailedConjugationForm } from '../utils/japaneseConjugator';
import { soundManager } from '../utils/audio';

interface WordConjugationModalProps {
  card: CardItem | null;
  isOpen: boolean;
  onClose: () => void;
  speechRate?: number;
}

type TabCategory = 'all' | 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan';

export const WordConjugationModal: React.FC<WordConjugationModalProps> = ({
  card,
  isOpen,
  onClose,
  speechRate = 1.0,
}) => {
  const [activeCategory, setActiveCategory] = useState<TabCategory>('all');
  const [playingFormKey, setPlayingFormKey] = useState<string | null>(null);

  if (!isOpen || !card) return null;

  const profile: WordConjugationProfile = getWordConjugation(card);

  const handleSpeakWord = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const text = card.kanji || card.japanese || card.reading;
    const reading = card.furigana || card.reading;
    soundManager.speakJapanese(text, speechRate, undefined, reading);
  };

  const handleSpeakForm = (form: DetailedConjugationForm, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingFormKey(form.formKey);
    soundManager.speakJapanese(
      form.japanese,
      speechRate,
      () => setPlayingFormKey(null),
      form.reading
    );
  };

  const filteredForms = profile.forms.filter((f) => {
    if (activeCategory === 'all') return true;
    return f.categoryGroup === activeCategory;
  });

  const categories = [
    { id: 'all', label: 'Semua Bentuk' },
    { id: 'sopan', label: 'Bentuk Sopan (+/-)' },
    { id: 'dasar_kasual', label: 'Dasar & Kasual' },
    { id: 'sambung_syarat', label: 'Sambung & Syarat' },
    { id: 'turunan_lanjutan', label: 'Ragam & Lanjutan' },
  ];

  return (
    <AnimatePresence>
      <div
        id="word-conjugation-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="word-conjugation-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-slate-200/90 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden text-slate-800"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Panel */}
          <div className="relative p-3.5 sm:p-5 bg-gradient-to-br from-indigo-50/80 via-white to-sky-50/60 border-b border-slate-200">
            <button
              id="close-conjugation-modal-btn"
              onClick={onClose}
              className="absolute top-2.5 right-2.5 sm:top-3.5 sm:right-3.5 p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2 pr-7">
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] sm:text-xs font-semibold border ${profile.classification.badgeClass}`}>
                <span>{profile.classification.icon}</span>
                <span>{profile.groupLabel}</span>
              </span>
              {card.level && (
                <span className="px-1.5 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
                  {card.level}
                </span>
              )}
              {profile.isException && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] sm:text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300">
                  <AlertTriangle className="w-3 h-3 text-amber-700" />
                  Pengecualian / Jebakan
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 mt-1">
              <div className="flex items-center gap-2">
                <button
                  id="speak-original-word-btn"
                  onClick={handleSpeakWord}
                  className="p-1.5 sm:p-2 text-indigo-600 bg-white hover:bg-indigo-50 active:scale-95 rounded-lg sm:rounded-xl border border-indigo-100 shadow-xs transition-all shrink-0 cursor-pointer"
                  title="Dengarkan pengucapan kata dasar"
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-base sm:text-xl md:text-2xl font-bold text-slate-900 font-japanese leading-tight">
                      {profile.japanese}
                    </span>
                    <span className="text-[11px] sm:text-xs text-slate-500 font-mono italic">
                      ({card.reading})
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right bg-indigo-50/70 sm:bg-transparent px-2.5 py-1 sm:p-0 rounded-lg border border-indigo-100/70 sm:border-0 shrink-0">
                <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-slate-400 sm:block inline mr-1.5 sm:mr-0">Artinya</span>
                <span className="text-xs sm:text-base font-bold text-slate-800 leading-snug">{card.meaningId}</span>
              </div>
            </div>

            {/* Exception Banner if trap verb */}
            {profile.isException && profile.exceptionNote && (
              <div className="mt-2.5 p-2 sm:p-2.5 bg-amber-50/90 border border-amber-200 rounded-lg sm:rounded-xl text-[11px] sm:text-xs text-amber-800 flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <p className="leading-relaxed">{profile.exceptionNote}</p>
              </div>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 px-3 sm:px-5 py-1.5 sm:py-2 border-b border-slate-100 bg-slate-50/90 overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`tab-category-${cat.id}`}
                onClick={() => setActiveCategory(cat.id as TabCategory)}
                className={`px-2.5 py-1 rounded-md sm:rounded-lg text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Forms List Content */}
          <div className="flex-1 overflow-y-auto p-2.5 sm:p-5 space-y-2 sm:space-y-2.5 bg-slate-50/40">
            {filteredForms.map((form) => (
              <div
                key={form.formKey}
                id={`conjugation-form-card-${form.formKey}`}
                className="group bg-white rounded-xl p-2.5 sm:p-3.5 border border-slate-200/90 hover:border-indigo-300 hover:shadow-xs transition-all flex flex-col justify-between gap-1.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 flex-wrap min-w-0">
                    <span className="text-[10px] sm:text-xs font-bold text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100/80">
                      {form.formName}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-400">
                      {form.categoryGroupName}
                    </span>
                  </div>

                  <button
                    id={`speak-form-${form.formKey}`}
                    onClick={(e) => handleSpeakForm(form, e)}
                    className={`flex items-center gap-1 p-1 sm:px-2.5 sm:py-1 rounded-lg text-[11px] sm:text-xs font-semibold border transition-all cursor-pointer shrink-0 ${
                      playingFormKey === form.formKey
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                        : 'bg-indigo-50 text-indigo-700 border-indigo-200/80 hover:bg-indigo-100 hover:border-indigo-300'
                    }`}
                    title="Dengarkan pengucapan bentuk ini"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Dengarkan</span>
                  </button>
                </div>

                <div className="min-w-0">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-sm sm:text-lg font-bold text-slate-900 font-japanese leading-snug">
                      {form.japanese}
                    </span>
                    {!form.japanese.includes('(') && form.reading !== form.japanese && (
                      <span className="text-[11px] sm:text-xs text-indigo-600 font-semibold font-japanese">
                        {form.reading}
                      </span>
                    )}
                    <span className="text-[10px] sm:text-xs text-slate-400 font-mono italic">
                      ({form.romaji})
                    </span>
                  </div>

                  <p className="text-[11px] sm:text-xs font-medium text-slate-700 mt-0.5">
                    <span className="text-slate-400 mr-1">Arti:</span>
                    <span className="font-semibold text-slate-800">{form.meaningId}</span>
                  </p>

                  <p className="text-[10px] sm:text-[11px] text-slate-500 mt-1 leading-snug bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    <span className="font-semibold text-slate-600">Rumus: </span>
                    {form.rule}
                  </p>
                </div>
              </div>
            ))}

            {filteredForms.length === 0 && (
              <div className="text-center py-8 text-slate-400">
                <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-1.5" />
                <p className="text-xs sm:text-sm font-medium">Tidak ada bentuk konjugasi pada filter ini.</p>
              </div>
            )}
          </div>

          {/* Footer note */}
          <div className="p-2.5 sm:p-3.5 border-t border-slate-200 bg-white flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
            <span className="inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              <span>{profile.forms.length} bentuk perubahan</span>
            </span>
            <button
              id="close-conjugation-modal-bottom-btn"
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
