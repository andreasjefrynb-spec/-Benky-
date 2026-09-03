import React from 'react';
import { Layers, Grid3X3, Award, PenTool, FolderTree } from 'lucide-react';
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
  const chartLabel = isVocab ? 'Kelompok Kosakata' : 'Tabel Karakter';
  const ChartIcon = isVocab ? FolderTree : Grid3X3;

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
      description: isVocab
        ? 'Daftar kosakata terkelompok N5 & N4'
        : 'Bagan lengkap karakter & audio cepat',
      enabled: showChartOption || isVocab,
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
      enabled: activeCategory === 'kanji',
    },
  ];

  return (
    <div className="bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200/80 flex flex-wrap sm:flex-nowrap gap-1">
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
              className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                isActive
                  ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-rose-600' : 'text-slate-500'}`} />
              <span>{m.label}</span>
            </button>
          );
        })}
    </div>
  );
};
