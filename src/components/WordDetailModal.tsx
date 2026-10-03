import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Volume2,
  BookOpen,
  Sparkles,
  Layers,
  HelpCircle,
  Copy,
  Check,
  Lightbulb,
  ExternalLink,
  PenTool,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { CardItem } from '../types';
import { soundManager } from '../utils/audio';
import { getFullDictionaryDetail, FullDictionaryDetail } from '../utils/meaningClarifier';
import { getWordClassification } from '../utils/wordClassifier';
import { getWordNuanceInfo } from '../utils/wordNuances';
import { getQuickConjugationForms } from '../utils/japaneseConjugator';

interface WordDetailModalProps {
  card: CardItem | null;
  isOpen: boolean;
  onClose: () => void;
  speechRate?: number;
  onOpenConjugation?: (card: CardItem) => void;
  onPracticeWriting?: (card: CardItem) => void;
}

export const WordDetailModal: React.FC<WordDetailModalProps> = ({
  card,
  isOpen,
  onClose,
  speechRate = 1.0,
  onOpenConjugation,
  onPracticeWriting,
}) => {
  const [copied, setCopied] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [playingSentence, setPlayingSentence] = useState(false);

  if (!isOpen || !card) return null;

  const detail: FullDictionaryDetail = getFullDictionaryDetail(card);
  const wordClass = getWordClassification(card);
  const nuance = getWordNuanceInfo(card);
  const quickConjugation = getQuickConjugationForms(card);
  const isConjugatable =
    wordClass.type.startsWith('verb') || wordClass.type.startsWith('adj');

  const handleSpeakMainWord = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsPlayingAudio(true);
    const textToSpeak = card.kanji || card.japanese;
    const reading = card.furigana || card.reading;
    soundManager.speakJapanese(
      textToSpeak,
      speechRate,
      () => setIsPlayingAudio(false),
      reading
    );
  };

  const handleSpeakSentence = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPlayingSentence(true);
    soundManager.speakJapanese(
      text,
      speechRate * 0.9,
      () => setPlayingSentence(false)
    );
  };

  const handleCopyExplanation = () => {
    navigator.clipboard.writeText(detail.fullExplanationSentence);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div
        id="word-detail-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          id="word-detail-modal-card"
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/90 dark:border-slate-800 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden text-slate-800 dark:text-slate-100"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Panel */}
          <div className="relative p-5 sm:p-6 bg-gradient-to-br from-rose-50/80 via-white to-amber-50/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 border-b border-slate-200 dark:border-slate-800">
            <button
              id="close-word-detail-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-black border ${wordClass.badgeClass}`}
              >
                <span>{wordClass.icon}</span>
                <span>{wordClass.label}</span>
              </span>

              {card.level && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  JLPT {card.level}
                </span>
              )}

              {card.subCategory && (
                <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                  {card.subCategory.replace(/_/g, ' ')}
                </span>
              )}
            </div>

            {/* Word Main Title & Audio */}
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-3">
                <button
                  id="speak-word-detail-btn"
                  onClick={handleSpeakMainWord}
                  className={`p-3 rounded-2xl transition-all cursor-pointer shadow-xs active:scale-95 ${
                    isPlayingAudio
                      ? 'bg-rose-600 text-white ring-4 ring-rose-200 dark:ring-rose-900 scale-105'
                      : 'bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-slate-700 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-slate-700 hover:border-rose-200'
                  }`}
                  title="Dengarkan pelafalan asli penutur bahasa Jepang"
                >
                  <Volume2 className={`w-6 h-6 ${isPlayingAudio ? 'animate-bounce' : ''}`} />
                </button>

                <div>
                  <div className="flex items-baseline gap-2.5 flex-wrap">
                    <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-jp leading-none tracking-tight">
                      {card.japanese}
                    </span>
                    {card.furigana && card.furigana !== card.japanese && (
                      <span className="text-sm sm:text-base font-bold text-rose-500 dark:text-rose-400 font-jp">
                        {card.furigana}
                      </span>
                    )}
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-slate-500 dark:text-slate-400 mt-1">
                    {card.reading}
                  </div>
                </div>
              </div>

              {/* Action Buttons: Practice Writing / Kanji Stroke */}
              {(card.strokes || card.category === 'kanji') && onPracticeWriting && (
                <button
                  type="button"
                  onClick={() => {
                    onPracticeWriting(card);
                    onClose();
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 transition-all cursor-pointer active:scale-95 shadow-2xs"
                  title="Latihan tulis goresan kanji"
                >
                  <PenTool className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                  <span>Latihan Tulis</span>
                </button>
              )}
            </div>
          </div>

          {/* Modal Content Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-slate-50/40 dark:bg-slate-950/40">
            {/* 1. SPOTLIGHT: PENJELASAN ARTI DETAIL ALA KAMUS RESMI */}
            <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-2xl p-4 sm:p-5 shadow-md relative overflow-hidden border border-indigo-800/60">
              <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-indigo-700/50">
                <div className="flex items-center gap-1.5 text-indigo-200 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Penjelasan Detail & Arti Kamus</span>
                </div>

                <button
                  onClick={handleCopyExplanation}
                  className="flex items-center gap-1 text-[11px] font-bold text-indigo-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  title="Salin kalimat penjelasan detail"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-sm sm:text-base font-semibold leading-relaxed text-indigo-50 font-sans tracking-wide">
                {detail.fullExplanationSentence}
              </p>

              {/* Rincian Makna & Variasi */}
              {detail.meaningsList && detail.meaningsList.length > 1 && (
                <div className="mt-3 pt-2.5 border-t border-indigo-800/70 flex items-center gap-1.5 flex-wrap text-xs">
                  <span className="text-indigo-300 font-medium">Variasi Makna:</span>
                  {detail.meaningsList.map((m, idx) => (
                    <span
                      key={idx}
                      className="bg-indigo-800/80 text-white px-2 py-0.5 rounded-md font-bold text-[11px] border border-indigo-700/60"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* 2. KAIDAH TATA BAHASA & POLA PARTIKEL */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Kelas Kata & Kaidah Gramatikal */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700 shadow-2xs space-y-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Peran Gramatikal & Golongan
                </span>
                <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                  <span>{wordClass.icon}</span>
                  <span>{detail.grammaticalRole}</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                  {wordClass.grammarHint}
                </p>
              </div>

              {/* Pola Penggunaan / Partikel Penting */}
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700 shadow-2xs space-y-1.5">
                <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                  Pola Partikel / Rumus Pakai
                </span>
                {detail.particlePattern ? (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-indigo-900 dark:text-indigo-300 font-bold font-jp text-xs sm:text-sm">
                    {detail.particlePattern}
                  </div>
                ) : (
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                    Dapat digunakan langsung dengan partikel pokok (は, が, を, に, で) sesuai peran subjek / objek kalimat.
                  </p>
                )}
              </div>
            </div>

            {/* 3. CATATAN ANTI-BINGUNG & PASANGAN KONTRAS */}
            {(detail.disambiguationNote || detail.contrastPair) && (
              <div className="bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-2xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-amber-900 dark:text-amber-300 font-black text-xs">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                  <span>Konteks & Pembeda Anti-Bingung</span>
                </div>

                {detail.disambiguationNote && (
                  <p className="text-xs text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
                    {detail.disambiguationNote}
                  </p>
                )}

                {detail.contrastPair && (
                  <div className="bg-white/90 dark:bg-slate-800/90 rounded-xl p-2.5 border border-amber-200/80 dark:border-amber-800/60 text-xs text-slate-800 dark:text-slate-200">
                    <span className="font-extrabold text-amber-900 dark:text-amber-300 block mb-0.5">
                      💡 Bedakan dengan:
                    </span>
                    <span className="font-jp font-black text-slate-900 dark:text-white mr-1">
                      {detail.contrastPair.word}
                    </span>
                    <span className="font-mono text-slate-500 dark:text-slate-400 font-semibold mr-1.5">
                      ({detail.contrastPair.reading})
                    </span>
                    <span className="text-slate-600 dark:text-slate-300">— {detail.contrastPair.difference}</span>
                  </div>
                )}
              </div>
            )}

            {/* 4. PEMBEDA NUANSA */}
            {nuance && (
              <div className="bg-sky-50/80 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800/60 rounded-2xl p-4 shadow-2xs space-y-2">
                <div className="flex items-center gap-1.5 text-sky-900 dark:text-sky-300 font-black text-xs">
                  <BookOpen className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0" />
                  <span>Nuansa Penggunaan: {nuance.japanese}</span>
                </div>
                <p className="text-xs text-sky-950 dark:text-sky-200 font-medium leading-relaxed">
                  {nuance.nuanceExplanation}
                </p>
                <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-white/80 dark:bg-slate-800 p-2 rounded-xl border border-sky-100 dark:border-sky-900">
                  <strong className="text-sky-900 dark:text-sky-300">Konteks:</strong> {nuance.contextUsage}
                </div>
              </div>
            )}

            {/* 5. CONTOH KALIMAT NYATA */}
            {(card.exampleJp || detail.sampleSentenceJp) && (
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-200/90 dark:border-slate-700 shadow-2xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                    Contoh Kalimat Alami
                  </span>
                  <button
                    onClick={(e) =>
                      handleSpeakSentence(card.exampleJp || detail.sampleSentenceJp!, e)
                    }
                    className="flex items-center gap-1 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                    title="Dengarkan pelafalan contoh kalimat"
                  >
                    <Volume2 className={`w-3.5 h-3.5 ${playingSentence ? 'animate-bounce' : ''}`} />
                    <span>Dengarkan Kalimat</span>
                  </button>
                </div>

                <div className="p-3 bg-slate-50/80 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-700/80 space-y-1">
                  <p className="font-jp text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 leading-snug">
                    {card.exampleJp || detail.sampleSentenceJp}
                  </p>
                  {(card.exampleId || detail.sampleSentenceId) && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                      {card.exampleId || detail.sampleSentenceId}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* 6. PERUBAHAN BENTUK KATA (JIKA KATA KERJA / KATA SIFAT) */}
            {isConjugatable && (
              <div className="bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 rounded-2xl p-4 shadow-2xs space-y-2.5">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5 text-indigo-950 dark:text-indigo-200 font-black text-xs">
                    <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    <span>Perubahan Bentuk (Konjugasi Pokok)</span>
                  </div>

                  {onOpenConjugation && (
                    <button
                      type="button"
                      onClick={() => {
                        onOpenConjugation(card);
                        onClose();
                      }}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
                    >
                      Buka 14+ Bentuk Lengkap ➜
                    </button>
                  )}
                </div>

                {quickConjugation && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">Bentuk ~Masu</span>
                      <span className="font-jp font-black text-slate-900 dark:text-white">{quickConjugation.masu}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">Bentuk ~Te (Sambung)</span>
                      <span className="font-jp font-black text-slate-900 dark:text-white">{quickConjugation.te}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">Bentuk ~Nai (Negatif)</span>
                      <span className="font-jp font-black text-slate-900 dark:text-white">{quickConjugation.nai}</span>
                    </div>
                    <div className="bg-white dark:bg-slate-800 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold block">Bentuk ~Ta (Lampau)</span>
                      <span className="font-jp font-black text-slate-900 dark:text-white">{quickConjugation.ta}</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 7. MNEMONIC / TIPS MENGHAFAL */}
            {card.mnemonic && (
              <div className="bg-amber-50/60 dark:bg-amber-950/30 rounded-2xl p-4 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 space-y-1">
                <span className="font-extrabold text-amber-800 dark:text-amber-400 text-[10px] uppercase tracking-wider block">
                  💡 Tips Menghafal / Cara Cepat Ingat
                </span>
                <p className="leading-relaxed font-medium">{card.mnemonic}</p>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-3 sm:p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Kamus Terverifikasi Bahasa Jepang - Indonesia</span>
            </span>
            <button
              id="close-word-detail-modal-bottom-btn"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold transition-colors cursor-pointer border border-transparent dark:border-slate-700"
            >
              Tutup
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
