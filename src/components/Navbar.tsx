import React, { useState, useEffect } from 'react';
import { Volume2, PlusCircle, Sparkles, SlidersHorizontal } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { AudioSettingsModal } from './AudioSettingsModal';

interface NavbarProps {
  onOpenAddCustom: () => void;
  speechRate: number;
  onToggleSpeechRate: () => void;
  onSelectSpeechRate?: (rate: number) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddCustom,
  speechRate,
  onToggleSpeechRate,
  onSelectSpeechRate,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const [engine, setEngine] = useState(soundManager.getEngine());
  const [aiVoice, setAiVoice] = useState(soundManager.getAiVoice());

  useEffect(() => {
    const unsubPlayback = soundManager.onPlaybackChange((playing) => {
      setIsPlayingAudio(playing);
    });

    const unsubEngine = soundManager.onEngineChange(() => {
      setEngine(soundManager.getEngine());
      setAiVoice(soundManager.getAiVoice());
    });

    return () => {
      unsubPlayback();
      unsubEngine();
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
            {/* AI Voice & Audio Engine Settings Button */}
            <button
              id="audio-settings-btn"
              onClick={() => setIsAudioSettingsOpen(true)}
              className={`flex items-center gap-1.5 min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer select-none active:scale-95 ${
                engine === 'ai'
                  ? 'bg-rose-50/70 border-rose-200 text-rose-700 hover:bg-rose-100/70'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
              title="Pengaturan Suara: Pilih Karakter AI Gemini atau Suara Perangkat"
              aria-label="Pengaturan suara pelafalan AI"
            >
              {engine === 'ai' ? (
                <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              ) : (
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              )}
              <div className="text-left flex flex-col justify-center">
                <span className="text-[10px] font-bold leading-none hidden sm:block text-slate-500">
                  {engine === 'ai' ? 'Suara AI' : 'Sistem'}
                </span>
                <span className="text-xs font-black leading-tight flex items-center gap-1">
                  {engine === 'ai' ? (
                    <>
                      <span>{aiVoice}</span>
                      <span className="text-[9px] px-1 py-0.2 bg-rose-200/70 text-rose-800 rounded font-bold sm:inline hidden">
                        AI
                      </span>
                    </>
                  ) : (
                    'Lokal'
                  )}
                </span>
              </div>
            </button>

            {/* Audio Speed Button */}
            <button
              id="audio-speed-btn"
              onClick={onToggleSpeechRate}
              className="flex items-center gap-1 min-h-[44px] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 rounded-xl transition-colors cursor-pointer select-none"
              title={`Kecepatan suara: ${speechRate === 0.75 ? 'Lambat (0.75x)' : speechRate === 0.9 ? 'Sedang/Alami (0.9x)' : speechRate === 1.0 ? 'Normal (1.0x)' : 'Cepat (1.1x)'}`}
              aria-label="Ubah kecepatan audio"
            >
              <Volume2 className="w-3.5 h-3.5 text-rose-600 shrink-0" />
              <span className="font-mono">{speechRate}x</span>
            </button>

            {/* Test Audio Button (Plays Natural AI Conversational Japanese) */}
            <button
              id="audio-test-btn"
              onClick={handleTestAudio}
              className={`flex min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer items-center gap-1.5 text-xs font-bold select-none active:scale-95 ${
                isPlayingAudio
                  ? 'bg-rose-50 text-rose-600 border border-rose-200 ring-2 ring-rose-100 animate-pulse'
                  : 'text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200/80 bg-white'
              }`}
              title="Tes Suara Bahasa Jepang Alami (Gemini AI Tokyo Accent)"
              aria-label="Tes suara pelafalan"
            >
              <Volume2
                className={`w-4 h-4 shrink-0 ${
                  isPlayingAudio ? 'text-rose-600 animate-bounce' : 'text-slate-500'
                }`}
              />
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

      {/* Audio & AI Voice Settings Modal */}
      <AudioSettingsModal
        isOpen={isAudioSettingsOpen}
        onClose={() => setIsAudioSettingsOpen(false)}
        speechRate={speechRate}
        onSelectSpeechRate={handleSelectRate}
      />
    </>
  );
};

