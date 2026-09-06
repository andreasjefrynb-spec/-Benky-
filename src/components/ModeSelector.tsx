import React from 'react';
import { Layers, Grid3X3, Award, PenTool, FolderTree, BookOpen, RefreshCw } from 'lucide-react';
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

  let chartLabel = 'Tabel Karakter';
  let ChartIcon = Grid3X3;
  let chartDesc = 'Bagan lengkap karakter & audio cepat';

  if (isVocab) {
    chartLabel = 'Kelompok Kosakata';
    ChartIcon = FolderTree;
    chartDesc = 'Daftar kosakata terkelompok N5, N4 & N3';
  } else if (isParticles) {
    chartLabel = 'Bagan & Materi Partikel';
    ChartIcon = BookOpen;
    chartDesc = 'Panduan partikel, perbandingan は/が/に/で & latihan';
  } else if (isConjugation) {
    chartLabel = 'Simulator & Panduan Bentuk';
    ChartIcon = RefreshCw;
    chartDesc = '12 bentuk perubahan kata kerja/sifat & panduan golongan';
  }

  const modes: {
    id: StudyMode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    enabled: boolean;
  }[] = [
    {
      id: 'flashcard',
      label: 'Flashcard SRS',
      icon: Layers,
      description: 'Hapalan kartu bolak-balik & interval ingatan',
      enabled: true,
    },
    {
      id: 'chart',
      label: chartLabel,
      icon: ChartIcon,
      description: chartDesc,
      enabled: showChartOption || isVocab || isParticles || isConjugation,
    },
    {
      id: 'quiz',
      label: 'Kuis Latihan',
      icon: Award,
      description: 'Uji daya ingat & pendengaran audio',
      enabled: true,
    },
    {
      id: 'writing',
      label: 'Latihan Tulis',
      icon: PenTool,
      description: 'Kanvas menulis karakter dengan jari/mouse',
      enabled: activeCategory === 'kanji' || activeCategory === 'hiragana' || activeCategory === 'katakana',
    },
  ];

  return (
    <div className="bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 grid grid-cols-2 sm:flex sm:flex-nowrap gap-1.5 shadow-2xs">
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
              className={`flex-1 min-h-[44px] sm:min-h-[42px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all duration-150 cursor-pointer select-none active:scale-98 ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-rose-600' : 'text-slate-500'}`} />
              <span className="whitespace-nowrap sm:whitespace-normal text-center leading-tight">{m.label}</span>
            </button>
          );
        })}
    </div>
  );
};
