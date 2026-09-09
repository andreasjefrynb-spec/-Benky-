import React, { useState, useEffect } from 'react';
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
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  useEffect(() => {
    return soundManager.onPlaybackChange((playing) => {
      setIsPlayingAudio(playing);
    });
  }, []);

  const handleTestAudio = () => {
    soundManager.speak('日本語の勉強を始めましょう', speechRate);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/90 shadow-xs">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md shadow-rose-200/60 shrink-0 select-none">
            日
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl md:text-3xl font-black text-slate-900 font-jp tracking-wide leading-none">
              日本語 ケラス
            </h1>
            <p className="text-[10px] sm:text-xs font-semibold text-rose-600/90 leading-tight hidden sm:block mt-0.5">
              Minna Bab 1–50 &bull; Irodori &bull; SSW Tokutei Ginou &bull; JLPT
            </p>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Audio Speed Button */}
          <button
            id="audio-speed-btn"
            onClick={onToggleSpeechRate}
            className="flex items-center gap-1 min-h-[44px] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors cursor-pointer select-none"
            title={`Kecepatan suara: ${speechRate === 0.75 ? 'Lambat (0.75x)' : 'Normal (1.0x)'}`}
            aria-label="Ubah kecepatan audio"
          >
            <Volume2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
            <span className="font-mono">{speechRate}x</span>
          </button>

          {/* Test Audio Button (Accessible on Mobile and PC) */}
          <button
            id="audio-test-btn"
            onClick={handleTestAudio}
            className={`flex min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer items-center gap-1.5 text-xs font-bold select-none active:scale-95 ${
              isPlayingAudio
                ? 'bg-rose-50 text-rose-600 border border-rose-200 ring-2 ring-rose-100 animate-pulse'
                : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 bg-white'
            }`}
            title="Tes Suara Bahasa Jepang Asli (Tokyo Accent)"
            aria-label="Tes suara pelafalan"
          >
            <Volume2 className={`w-4 h-4 shrink-0 ${isPlayingAudio ? 'text-rose-600 animate-bounce' : 'text-slate-500'}`} />
            <span className="hidden sm:inline">{isPlayingAudio ? 'Memutar...' : 'Tes Suara'}</span>
          </button>

          {/* Add Custom Flashcard Button */}
          <button
            id="add-custom-card-btn"
            onClick={onOpenAddCustom}
            className="flex items-center justify-center gap-1.5 min-h-[44px] px-3 sm:px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-xs shadow-rose-200 transition-all cursor-pointer select-none"
            aria-label="Tambah kartu catatan buatan sendiri"
          >
            <PlusCircle className="w-4 h-4 shrink-0" />
            <span className="hidden sm:inline">Tambah Kartu</span>
            <span className="sm:hidden text-xs font-extrabold">+ Buat</span>
          </button>
        </div>
      </div>
    </header>
  );
};
