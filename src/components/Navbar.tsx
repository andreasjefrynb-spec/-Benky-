import React, { useState, useEffect } from 'react';
import { Volume2, SlidersHorizontal, Search } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { AudioSettingsModal } from './AudioSettingsModal';

interface NavbarProps {
  onOpenAddCustom?: () => void;
  onOpenGlobalSearch: () => void;
  speechRate: number;
  onToggleSpeechRate: () => void;
  onSelectSpeechRate?: (rate: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddCustom,
  onOpenGlobalSearch,
  speechRate,
  onToggleSpeechRate,
  onSelectSpeechRate,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);

  useEffect(() => {
    const unsubPlayback = soundManager.onPlaybackChange((playing) => {
      setIsPlayingAudio(playing);
    });

    return () => {
      unsubPlayback();
    };
  }, []);

  const handleTestAudio = () => {
    soundManager.speak('こんにちは！日本語の勉強を始めましょう。', speechRate);
  };

  const handleSelectRate = (rate: number) => {
    if (onSelectSpeechRate) {
      onSelectSpeechRate(rate);
    } else {
      onToggleSpeechRate();
    }
  };

  return (
    <>
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
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Search Button */}
            <button
              onClick={onOpenGlobalSearch}
              className="flex items-center gap-1.5 min-h-[38px] sm:min-h-[44px] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 active:bg-rose-200 text-rose-700 transition-all cursor-pointer select-none active:scale-95 shadow-3xs"
              title="Pencarian Global: Cari kata apapun di seluruh materi"
              aria-label="Buka pencarian global"
            >
              <Search className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span className="text-xs font-black leading-none hidden sm:inline text-rose-700">
                Cari Kata
              </span>
            </button>

            {/* Audio Settings Button */}
            <button
              id="audio-settings-btn"
              onClick={() => setIsAudioSettingsOpen(true)}
              className="flex items-center justify-center w-[38px] sm:w-[44px] h-[38px] sm:h-[44px] rounded-xl border border-slate-200/90 bg-slate-50 hover:bg-slate-100 active:bg-slate-200 text-slate-700 transition-all cursor-pointer select-none active:scale-95 shrink-0"
              title="Pengaturan Suara: Ubah kecepatan dan suara sistem"
              aria-label="Pengaturan suara pelafalan"
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 shrink-0" />
            </button>

            {/* Audio Speed Quick Toggle (Desktop only) */}
            <button
              id="audio-speed-btn"
              onClick={onToggleSpeechRate}
              className="hidden sm:flex items-center gap-1 min-h-[44px] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors cursor-pointer select-none"
              title={`Kecepatan suara: ${speechRate === 0.75 ? 'Lambat (0.75x)' : speechRate === 0.9 ? 'Sedang/Alami (0.9x)' : speechRate === 1.0 ? 'Normal (1.0x)' : 'Cepat (1.1x)'}`}
              aria-label="Ubah kecepatan audio"
            >
              <Volume2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span className="font-mono">{speechRate}x</span>
            </button>

            {/* Test Audio Button */}
            <button
              id="audio-test-btn"
              onClick={handleTestAudio}
              className={`hidden md:flex min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer items-center gap-1.5 text-xs font-bold select-none active:scale-95 ${
                isPlayingAudio
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 ring-2 ring-rose-100 animate-pulse'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 bg-white'
              }`}
              title="Tes Suara Pelafalan Bahasa Jepang (Web Speech)"
              aria-label="Tes suara pelafalan"
            >
              <Volume2
                className={`w-4 h-4 shrink-0 ${
                  isPlayingAudio ? 'text-rose-600 animate-bounce' : 'text-slate-500'
                }`}
              />
              <span>{isPlayingAudio ? 'Memutar...' : 'Tes Suara'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Audio Settings Modal */}
      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
        speechRate={speechRate}
        onSelectSpeechRate={handleSelectRate}
      />
    </>
  );
};

