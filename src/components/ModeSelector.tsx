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
  const isIrodori = activeCategory === 'irodori';
  const isSSW = activeCategory === 'ssw';

  let chartLabel = 'Tabel Karakter';
  let ChartIcon = Grid3X3;
  let chartDesc = 'Bagan lengkap karakter & audio cepat';

  if (isMinna) {
    chartLabel = 'Materi Minna Bab 1–50';
    ChartIcon = BookOpen;
    chartDesc = 'Tata bahasa, pola rumus bunkei, kosakata & percakapan Bab 1–50';
  } else if (isIrodori) {
    chartLabel = 'Modul Can-Do Irodori';
    ChartIcon = Compass;
    chartDesc = 'Target komunikasi praktis, tips hidup Jepang & simulasi';
  } else if (isSSW) {
    chartLabel = 'Panduan 12 Sektor SSW';
    ChartIcon = Briefcase;
    chartDesc = 'Keahlian ujian, K3, istilah teknis & skenario lapangan';
  } else if (isVocab) {
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
    chartDesc = '14 bentuk perubahan kata kerja/sifat & panduan golongan';
  }

  const modes: {
    id: StudyMode;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    enabled: boolean;
  }[] = [
    {
      id: 'chart',
      label: chartLabel,
      icon: ChartIcon,
      description: chartDesc,
      enabled: showChartOption || isVocab || isParticles || isConjugation || isMinna || isIrodori || isSSW,
    },
    {
      id: 'flashcard',
      label: 'Flashcard SRS',
      icon: Layers,
      description: 'Hapalan kartu bolak-balik & interval ingatan',
      enabled: true,
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
    <div className="bg-slate-100/90 p-1 rounded-2xl border border-slate-200/80 flex items-center gap-1 overflow-x-auto no-scrollbar sm:flex-nowrap shadow-2xs">
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
              className={`flex-1 shrink-0 sm:shrink min-w-[110px] sm:min-w-0 min-h-[42px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 px-2.5 sm:px-3 rounded-xl font-bold text-xs sm:text-sm whitespace-nowrap transition-all duration-150 cursor-pointer select-none active:scale-[0.98] ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-rose-600' : 'text-slate-500'}`} />
              <span className="text-center leading-tight truncate">{m.label}</span>
            </button>
          );
        })}
    </div>
  );
};
