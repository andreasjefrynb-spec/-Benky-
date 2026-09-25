import React from 'react';
import { Layers, Grid3X3, Award, PenTool, FolderTree, BookOpen, RefreshCw, Compass, Briefcase } from 'lucide-react';
import { StudyMode, MainCategory } from '../types';

interface ModeSelectorProps {
  currentMode: StudyMode;
  onSelectMode: (mode: StudyMode) => void;
  showChartOption: boolean;
  activeCategory?: MainCategory;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({
  currentMode,
  onSelectMode,
  showChartOption,
  activeCategory,
}) => {
  const isVocab = activeCategory === 'vocab';
  const isParticles = activeCategory === 'particles';
  const isConjugation = activeCategory === 'conjugation';
  const isMinna = activeCategory === 'minna';
  const isPhrases = activeCategory === 'phrases';
  const isIrodori = activeCategory === 'irodori';
  const isSSW = activeCategory === 'ssw';

  let chartLabel = 'Tabel Karakter';
  let shortChartLabel = 'Tabel';
  let ChartIcon = Grid3X3;
  let chartDesc = 'Bagan lengkap karakter & audio cepat';

  if (isPhrases) {
    chartLabel = 'Pusat Tata Bahasa (N3)';
    shortChartLabel = 'Tata Bahasa';
    ChartIcon = BookOpen;
    chartDesc = 'Pola tematik, bedah nuansa mirip, program 6 minggu & drill soal ujian';
  } else if (isMinna) {
    chartLabel = 'Pelajaran Dasar Bab 1–50';
    shortChartLabel = 'Bab 1-50';
    ChartIcon = BookOpen;
    chartDesc = 'Tata bahasa, pola rumus bunkei, kosakata & percakapan Bab 1–50';
  } else if (isIrodori) {
    chartLabel = 'Modul Can-Do Irodori';
    shortChartLabel = 'Topik';
    ChartIcon = Compass;
    chartDesc = 'Target komunikasi praktis, tips hidup Jepang & simulasi';
  } else if (isSSW) {
    chartLabel = 'Panduan 12 Sektor SSW';
    shortChartLabel = 'Sektor SSW';
    ChartIcon = Briefcase;
    chartDesc = 'Keahlian ujian, K3, istilah teknis & skenario lapangan';
  } else if (isVocab) {
    chartLabel = 'Kelompok Kosakata';
    shortChartLabel = 'Kelompok';
    ChartIcon = FolderTree;
    chartDesc = 'Daftar kosakata terkelompok N5, N4 & N3';
  } else if (isParticles) {
    chartLabel = 'Bagan & Materi Partikel';
    shortChartLabel = 'Partikel';
    ChartIcon = BookOpen;
    chartDesc = 'Panduan partikel, perbandingan は/が/に/で & latihan';
  } else if (isConjugation) {
    chartLabel = 'Simulator & Panduan Bentuk';
    shortChartLabel = 'Konjugasi';
    ChartIcon = RefreshCw;
    chartDesc = '14 bentuk perubahan kata kerja/sifat & panduan golongan';
  }

  const modes: {
    id: StudyMode;
    label: string;
    shortLabel: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    enabled: boolean;
  }[] = [
    {
      id: 'chart',
      label: chartLabel,
      shortLabel: shortChartLabel,
      icon: ChartIcon,
      description: chartDesc,
      enabled: showChartOption || isVocab || isParticles || isConjugation || isMinna || isIrodori || isSSW,
    },
    {
      id: 'flashcard',
      label: 'Flashcard SRS',
      shortLabel: 'Flashcard',
      icon: Layers,
      description: 'Hapalan kartu bolak-balik & interval ingatan',
      enabled: true,
    },
    {
      id: 'quiz',
      label: 'Kuis Latihan',
      shortLabel: 'Kuis',
      icon: Award,
      description: 'Uji daya ingat & pendengaran audio',
      enabled: true,
    },
    {
      id: 'writing',
      label: 'Latihan Tulis',
      shortLabel: 'Tulis',
      icon: PenTool,
      description: 'Kanvas menulis karakter dengan jari/mouse',
      enabled: activeCategory === 'kanji' || activeCategory === 'hiragana' || activeCategory === 'katakana',
    },
  ];

  return (
    <div className="bg-slate-200/60 dark:bg-slate-900 p-1 rounded-2xl border border-slate-200/90 dark:border-slate-800 flex items-center gap-1 w-full shadow-2xs">
      {modes
        .filter((m) => m.enabled)
        .map((m) => {
          const isActive = currentMode === m.id;
          const Icon = m.icon;

          return (
            <button
              key={m.id}
              id={`mode-btn-${m.id}`}
              onClick={() => onSelectMode(m.id)}
              className={`flex-1 min-w-0 min-h-[38px] sm:min-h-[42px] flex items-center justify-center gap-1 sm:gap-2 py-1.5 sm:py-2 px-1 sm:px-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer select-none active:scale-[0.98] ${
                isActive
                  ? 'bg-white dark:bg-slate-800 text-rose-700 dark:text-rose-400 shadow-sm border border-slate-200/90 dark:border-slate-700 ring-1 ring-slate-900/5 font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-white/60 dark:hover:bg-slate-800/60'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isActive ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'}`} />
              <span className="sm:hidden text-[11px] font-extrabold truncate">{m.shortLabel}</span>
              <span className="hidden sm:inline text-center leading-tight truncate">{m.label}</span>
            </button>
          );
        })}
    </div>
  );
};
