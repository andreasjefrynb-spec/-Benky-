import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  SlidersHorizontal,
  Search,
  Home,
  Moon,
  Sun,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  Check,
  RotateCw,
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { AudioSettingsModal } from './AudioSettingsModal';
import { DevicePreviewMode, DeviceOrientation } from './DeviceSimulator';

interface NavbarProps {
  onOpenAddCustom?: () => void;
  onOpenGlobalSearch: () => void;
  devicePreview?: DevicePreviewMode;
  onSelectDevicePreview?: (mode: DevicePreviewMode) => void;
  onToggleRotate?: () => void;
  orientation?: DeviceOrientation;
  speechRate: number;
  onToggleSpeechRate: () => void;
  onSelectSpeechRate?: (rate: number) => void;
  onGoHome?: () => void;
  isHomeActive?: boolean;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenAddCustom,
  onOpenGlobalSearch,
  devicePreview = 'desktop',
  onSelectDevicePreview,
  onToggleRotate,
  orientation = 'portrait',
  speechRate,
  onToggleSpeechRate,
  onSelectSpeechRate,
  onGoHome,
  isHomeActive = false,
  isDarkMode = false,
  onToggleDarkMode,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isAudioSettingsOpen, setIsAudioSettingsOpen] = useState(false);
  const [isDeviceMenuOpen, setIsDeviceMenuOpen] = useState(false);
  const deviceMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (deviceMenuRef.current && !deviceMenuRef.current.contains(e.target as Node)) {
        setIsDeviceMenuOpen(false);
      }
    };
    if (isDeviceMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDeviceMenuOpen]);

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
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 shadow-xs transition-colors">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          {/* Brand Logo & Name (Clickable to Go Home) */}
          <button
            onClick={onGoHome}
            className="flex items-center gap-2 sm:gap-3 min-w-0 shrink text-left cursor-pointer group focus:outline-hidden"
            title="Kembali ke Beranda Utama"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-white flex items-center justify-center font-bold text-lg sm:text-2xl shadow-md shadow-rose-200/60 dark:shadow-rose-950/40 shrink-0 select-none group-hover:scale-105 transition-transform">
              日
            </div>
            <div className="min-w-0">
              <h1 className="text-base sm:text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors font-jp tracking-wide leading-none truncate">
                日本語クラス
              </h1>
            </div>
          </button>

          {/* Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Home Button */}
            {onGoHome && (
              <button
                onClick={onGoHome}
                className={`flex items-center gap-1.5 min-h-[36px] sm:min-h-[44px] px-2 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer select-none active:scale-95 shadow-3xs ${
                  isHomeActive
                    ? 'border-rose-300 bg-rose-500 text-white font-black'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold'
                }`}
                title="Buka Beranda Utama"
                aria-label="Kembali ke beranda"
              >
                <Home className="w-4 h-4 shrink-0" />
                <span className="text-xs leading-none hidden xs:inline">
                  Beranda
                </span>
              </button>
            )}

            {/* Search Button */}
            <button
              onClick={onOpenGlobalSearch}
              className="flex items-center gap-1.5 min-h-[36px] sm:min-h-[44px] px-2 sm:px-3.5 py-1.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/80 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 active:bg-rose-200 text-rose-700 dark:text-rose-300 transition-all cursor-pointer select-none active:scale-95 shadow-3xs"
              title="Pencarian Global: Cari kata apapun di seluruh materi"
              aria-label="Buka pencarian kata & terjemahan"
            >
              <Search className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0" />
              <span className="text-xs font-black leading-none text-rose-700 dark:text-rose-300">
                Cari Kata
              </span>
            </button>

            {/* Rotate Button (Available when in Mobile or Tablet Preview) */}
            {devicePreview !== 'desktop' && onToggleRotate && (
              <button
                onClick={onToggleRotate}
                className="flex items-center gap-1.5 min-h-[36px] sm:min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all cursor-pointer select-none active:scale-95 shadow-3xs"
                title={`Putar Orientasi (${orientation === 'landscape' ? 'Landscape' : 'Portrait'})`}
                aria-label="Putar Orientasi Layar"
              >
                <RotateCw className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                <span className="hidden sm:inline">Rotate</span>
              </button>
            )}

            {/* Device Preview Selector */}
            {onSelectDevicePreview && (
              <div className="relative" ref={deviceMenuRef}>
                <button
                  id="device-preview-navbar-btn"
                  onClick={() => setIsDeviceMenuOpen(!isDeviceMenuOpen)}
                  className={`flex items-center gap-1.5 min-h-[36px] sm:min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer select-none active:scale-95 shadow-3xs ${
                    devicePreview !== 'desktop'
                      ? 'border-indigo-500/60 bg-indigo-600 text-white font-black shadow-md shadow-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold'
                  }`}
                  title="Pilih Tampilan Layar (Device Preview)"
                  aria-label="Pilih Tampilan Perangkat"
                >
                  {devicePreview === 'mobile' ? (
                    <Smartphone className="w-4 h-4 text-amber-300 shrink-0" />
                  ) : devicePreview === 'tablet' ? (
                    <Tablet className="w-4 h-4 text-cyan-300 shrink-0" />
                  ) : (
                    <Monitor className="w-4 h-4 text-slate-600 dark:text-slate-300 shrink-0" />
                  )}
                  <span className="text-xs leading-none font-bold hidden xs:inline">
                    {devicePreview === 'mobile'
                      ? 'Mobile'
                      : devicePreview === 'tablet'
                      ? 'Tablet'
                      : 'Current screen size'}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 opacity-70 transition-transform ${isDeviceMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu for Device Selection (Matching Screenshot) */}
                {isDeviceMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-700/80 shadow-2xl p-1.5 z-50 flex flex-col gap-1 backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-150">
                    {/* Option: Current screen size */}
                    <button
                      onClick={() => {
                        onSelectDevicePreview('desktop');
                        setIsDeviceMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                        devicePreview === 'desktop'
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Monitor className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span className="text-xs">Current screen size</span>
                      </div>
                      {devicePreview === 'desktop' && (
                        <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      )}
                    </button>

                    {/* Option: Mobile */}
                    <button
                      onClick={() => {
                        onSelectDevicePreview('mobile');
                        setIsDeviceMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                        devicePreview === 'mobile'
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Smartphone className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span className="text-xs">Mobile</span>
                      </div>
                      {devicePreview === 'mobile' && (
                        <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      )}
                    </button>

                    {/* Option: Tablet */}
                    <button
                      onClick={() => {
                        onSelectDevicePreview('tablet');
                        setIsDeviceMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-all cursor-pointer ${
                        devicePreview === 'tablet'
                          ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 font-black'
                          : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Tablet className="w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0" />
                        <span className="text-xs">Tablet</span>
                      </div>
                      {devicePreview === 'tablet' && (
                        <Check className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Nightmode Toggle Button */}
            {onToggleDarkMode && (
              <button
                id="nightmode-toggle-btn"
                onClick={onToggleDarkMode}
                className={`flex items-center gap-1.5 min-h-[36px] sm:min-h-[44px] px-2 sm:px-3 py-1.5 rounded-xl border transition-all cursor-pointer select-none active:scale-95 shadow-3xs ${
                  isDarkMode
                    ? 'border-amber-400/60 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold'
                }`}
                title={isDarkMode ? 'Mode Malam Aktif (Klik untuk Mode Terang)' : 'Mode Terang Aktif (Klik untuk Mode Malam)'}
                aria-label={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Malam'}
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-600 shrink-0" />
                )}
                <span className="text-xs font-bold leading-none hidden sm:inline">
                  {isDarkMode ? 'Malam' : 'Terang'}
                </span>
              </button>
            )}

            {/* Audio Settings Button */}
            <button
              id="audio-settings-btn"
              onClick={() => setIsAudioSettingsOpen(true)}
              className="flex items-center justify-center w-[36px] sm:w-[44px] h-[36px] sm:h-[44px] rounded-xl border border-slate-200/90 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:bg-slate-200 text-slate-700 dark:text-slate-200 transition-all cursor-pointer select-none active:scale-95 shrink-0"
              title="Pengaturan Suara: Ubah kecepatan dan suara sistem"
              aria-label="Pengaturan suara pelafalan"
            >
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-600 dark:text-slate-300 shrink-0" />
            </button>

            {/* Audio Speed Quick Toggle (Desktop only) */}
            <button
              id="audio-speed-btn"
              onClick={onToggleSpeechRate}
              className="hidden sm:flex items-center gap-1 min-h-[44px] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:bg-slate-300 rounded-xl transition-colors cursor-pointer select-none border border-transparent dark:border-slate-700"
              title={`Kecepatan suara: ${speechRate === 0.75 ? 'Lambat (0.75x)' : speechRate === 0.9 ? 'Sedang/Alami (0.9x)' : speechRate === 1.0 ? 'Normal (1.0x)' : 'Cepat (1.1x)'}`}
              aria-label="Ubah kecepatan audio"
            >
              <Volume2 className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400 shrink-0" />
              <span className="font-mono">{speechRate}x</span>
            </button>

            {/* Test Audio Button */}
            <button
              id="audio-test-btn"
              onClick={handleTestAudio}
              className={`hidden md:flex min-h-[44px] px-2.5 sm:px-3 py-1.5 rounded-xl transition-all cursor-pointer items-center gap-1.5 text-xs font-bold select-none active:scale-95 ${
                isPlayingAudio
                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800 ring-2 ring-rose-100 dark:ring-rose-900 animate-pulse'
                  : 'text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 border border-slate-200/80 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
              title="Tes Suara Pelafalan Bahasa Jepang (Web Speech)"
              aria-label="Tes suara pelafalan"
            >
              <Volume2
                className={`w-4 h-4 shrink-0 ${
                  isPlayingAudio ? 'text-rose-600 dark:text-rose-400 animate-bounce' : 'text-slate-500 dark:text-slate-400'
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

