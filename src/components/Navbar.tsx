import React from 'react';
import { Volume2, PlusCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  onOpenAddCustom: () => void;
  speechRate: number;
  onToggleSpeechRate: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddCustom,
  speechRate,
  onToggleSpeechRate,
}) => {
  const handleTestAudio = () => {
    soundManager.speak('日本語の勉強を始めましょう', speechRate);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-rose-200">
            日
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold text-slate-800 tracking-tight">
                NihonGo!
              </h1>
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-rose-50 text-rose-700 rounded-md border border-rose-200">
                Hapalan Jepang
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block">
              Belajar Hiragana, Katakana, Kanji & Kosakata
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio Speed Button */}
          <button
            id="audio-speed-btn"
            onClick={onToggleSpeechRate}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title={`Kecepatan suara: ${speechRate === 0.75 ? 'Lambat (0.75x)' : 'Normal (1.0x)'}`}
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-500" />
            <span>{speechRate}x</span>
          </button>

          {/* Test Audio Button */}
          <button
            id="audio-test-btn"
            onClick={handleTestAudio}
            className="hidden sm:inline-flex p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            title="Tes Suara Bahasa Jepang"
            aria-label="Tes suara pelafalan"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Add Custom Flashcard Button */}
          <button
            id="add-custom-card-btn"
            onClick={onOpenAddCustom}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-sm transition-all"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tambah Kartu</span>
            <span className="sm:hidden">+</span>
          </button>
        </div>
      </div>
    </header>
  );
};
