import React, { useState, useEffect } from 'react';
import { Volume2, Smartphone, Check, Play, Pause, X, Radio, Info, Sliders } from 'lucide-react';
import { soundManager, DeviceVoiceInfo } from '../utils/audio';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechRate: number;
  onSelectSpeechRate: (rate: number) => void;
}

const TEST_PHRASES = [
  {
    jp: 'こんにちは！日本語の発音テストです。今日もがんばりましょう！',
    romaji: 'Konnichiwa! Nihongo no hatsuon tesuto desu. Kyou mo gambarimashou!',
    id: 'Halo! Ini tes pelafalan bahasa Jepang. Tetap semangat hari ini!',
  },
  {
    jp: '私は毎日日本語を勉強しています。',
    romaji: 'Watashi wa mainichi nihongo o benkyou shite imasu.',
    id: 'Saya belajar bahasa Jepang setiap hari.',
  },
  {
    jp: 'ありがとうございます。どうぞよろしくお願いします。',
    romaji: 'Arigatou gozaimasu. Douzo yoroshiku onegaishimasu.',
    id: 'Terima kasih banyak. Senang berkenalan dengan Anda.',
  },
];

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  speechRate,
  onSelectSpeechRate,
}) => {
  const [deviceVoices, setDeviceVoices] = useState<DeviceVoiceInfo[]>([]);
  const [selectedDeviceVoice, setSelectedDeviceVoice] = useState<string | null>(
    soundManager.getSelectedDeviceVoice()
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);
  const [selectedTestIndex, setSelectedTestIndex] = useState<number>(0);

  const refreshDeviceVoices = () => {
    setDeviceVoices(soundManager.getAvailableDeviceVoices());
    setSelectedDeviceVoice(soundManager.getSelectedDeviceVoice());
  };

  useEffect(() => {
    refreshDeviceVoices();

    const unsubPlayback = soundManager.onPlaybackChange((playing) => {
      setIsPlaying(playing);
      if (!playing) {
        setPlayingVoiceId(null);
      }
    });

    const unsubEngine = soundManager.onEngineChange(() => {
      setSelectedDeviceVoice(soundManager.getSelectedDeviceVoice());
    });

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.onvoiceschanged = () => {
        refreshDeviceVoices();
      };
    }

    return () => {
      unsubPlayback();
      unsubEngine();
    };
  }, []);

  if (!isOpen) return null;

  const handleSelectDeviceVoice = (voiceURI: string | null) => {
    soundManager.setSelectedDeviceVoice(voiceURI);
    setSelectedDeviceVoice(voiceURI);
  };

  const handlePreviewDeviceVoice = (voiceURI: string | null) => {
    const previewKey = voiceURI || 'auto-device';
    if (isPlaying && playingVoiceId === previewKey) {
      soundManager.stop();
      setPlayingVoiceId(null);
      return;
    }

    soundManager.setSelectedDeviceVoice(voiceURI);
    setSelectedDeviceVoice(voiceURI);
    setPlayingVoiceId(previewKey);
    const phrase = TEST_PHRASES[selectedTestIndex] || TEST_PHRASES[0];
    soundManager.speak(phrase.jp, speechRate, () => {
      setPlayingVoiceId(null);
    });
  };

  const handlePlayCurrentTest = () => {
    if (isPlaying) {
      soundManager.stop();
      setPlayingVoiceId(null);
      return;
    }
    const phrase = TEST_PHRASES[selectedTestIndex] || TEST_PHRASES[0];
    setPlayingVoiceId('test-phrase');
    soundManager.speak(phrase.jp, speechRate, () => {
      setPlayingVoiceId(null);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/70 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-xs">
              <Volume2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Pengaturan Suara Pelafalan
              </h2>
              <p className="text-xs text-slate-500">
                Suara standar sistem (Web Speech) — instan, jernih &amp; stabil tanpa kuota
              </p>
            </div>
          </div>
          <button
            id="close-audio-settings-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Tutup pengaturan suara"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5">
          {/* Speech Rate (Speed) Selection */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-slate-400" />
                Kecepatan Pelafalan (Speed)
              </label>
              <span className="text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                Saat ini: {speechRate}x
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { rate: 0.75, label: '0.75x', desc: 'Lambat' },
                { rate: 0.9, label: '0.9x', desc: 'Natural (Ideal)' },
                { rate: 1.0, label: '1.0x', desc: 'Normal' },
                { rate: 1.1, label: '1.1x', desc: 'Cepat' },
              ].map((item) => {
                const isSelected = speechRate === item.rate;
                return (
                  <button
                    key={item.rate}
                    id={`speed-btn-${item.rate}`}
                    type="button"
                    onClick={() => onSelectSpeechRate(item.rate)}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'border-rose-500 bg-rose-500 text-white shadow-xs font-bold'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="text-sm font-mono leading-none">{item.label}</div>
                    <div
                      className={`text-[10px] mt-1 ${
                        isSelected ? 'text-white/90 font-medium' : 'text-slate-400'
                      }`}
                    >
                      {item.desc}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audio Test Section */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700">Uji Suara &amp; Pelafalan</span>
              <div className="flex gap-1">
                {TEST_PHRASES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedTestIndex(i)}
                    className={`w-6 h-6 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                      selectedTestIndex === i
                        ? 'bg-rose-500 text-white'
                        : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-3 rounded-xl border border-slate-200/70 mb-3">
              <p className="text-sm font-bold text-slate-900 font-sans leading-relaxed">
                {TEST_PHRASES[selectedTestIndex].jp}
              </p>
              <p className="text-xs text-rose-600 font-mono mt-0.5">
                {TEST_PHRASES[selectedTestIndex].romaji}
              </p>
              <p className="text-xs text-slate-500 mt-0.5 italic">
                {TEST_PHRASES[selectedTestIndex].id}
              </p>
            </div>

            <button
              type="button"
              id="test-speech-playback-btn"
              onClick={handlePlayCurrentTest}
              className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                isPlaying && playingVoiceId === 'test-phrase'
                  ? 'bg-rose-600 text-white shadow-xs animate-pulse'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs active:scale-98'
              }`}
            >
              {isPlaying && playingVoiceId === 'test-phrase' ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Sedang Melafalkan...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Putar Contoh Pelafalan ({speechRate}x)</span>
                </>
              )}
            </button>
          </div>

          {/* Device Voices List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold text-slate-500 tracking-wider uppercase flex items-center gap-1.5">
                <Smartphone className="w-3.5 h-3.5 text-slate-400" />
                Pilihan Suara Perangkat Terdeteksi
              </label>
              <span className="text-[11px] text-slate-400 font-medium">
                {deviceVoices.length} suara ditemukan
              </span>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {/* Auto Select Recommended Voice */}
              <div
                className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  selectedDeviceVoice === null
                    ? 'border-rose-500 bg-rose-50/40 shadow-xs ring-1 ring-rose-200'
                    : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleSelectDeviceVoice(null)}
                  className="flex-1 flex items-start gap-3 text-left cursor-pointer select-none"
                >
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                      selectedDeviceVoice === null
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-900">
                        Otomatis (Paling Alami)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        Rekomendasi
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Sistem memilih suara bahasa Jepang paling jernih &amp; alami di perangkat Anda.
                    </p>
                  </div>
                </button>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handlePreviewDeviceVoice(null)}
                    className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                      isPlaying && playingVoiceId === 'auto-device'
                        ? 'bg-rose-500 text-white shadow-xs animate-pulse'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                    }`}
                  >
                    {isPlaying && playingVoiceId === 'auto-device' ? (
                      <>
                        <Pause className="w-3.5 h-3.5 shrink-0" />
                        <span>Memutar...</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                        <span>Tes</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleSelectDeviceVoice(null)}
                    className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                      selectedDeviceVoice === null
                        ? 'bg-rose-100 text-rose-600'
                        : 'text-slate-300 hover:text-slate-400'
                    }`}
                  >
                    {selectedDeviceVoice === null ? (
                      <Check className="w-4 h-4 stroke-[3]" />
                    ) : (
                      <Radio className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Individual Device Voices */}
              {deviceVoices.map((voice) => {
                const isSelected = selectedDeviceVoice === voice.voiceURI;
                const isVoicePlaying = isPlaying && playingVoiceId === voice.voiceURI;

                return (
                  <div
                    key={voice.voiceURI}
                    className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-slate-800 bg-slate-50 shadow-xs ring-1 ring-slate-300'
                        : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => handleSelectDeviceVoice(voice.voiceURI)}
                      className="flex-1 flex items-start gap-3 text-left cursor-pointer select-none"
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                          isSelected
                            ? 'bg-slate-900 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {voice.displayName[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-bold text-slate-900">
                            {voice.displayName}
                          </span>
                          {voice.quality === 'natural' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              Natural
                            </span>
                          )}
                          {voice.quality === 'enhanced' && (
                            <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-sky-100 text-sky-800 border border-sky-200">
                              Enhanced
                            </span>
                          )}
                          <span className="text-[10px] px-2 py-0.5 rounded-md font-medium bg-slate-100 text-slate-600">
                            {voice.gender === 'male' ? 'Pria' : voice.gender === 'female' ? 'Wanita' : 'Netral'}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 truncate">
                          {voice.voiceURI}
                        </p>
                      </div>
                    </button>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handlePreviewDeviceVoice(voice.voiceURI)}
                        className={`min-h-[36px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                          isVoicePlaying
                            ? 'bg-slate-900 text-white shadow-xs animate-pulse'
                            : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
                        }`}
                      >
                        {isVoicePlaying ? (
                          <>
                            <Pause className="w-3.5 h-3.5 shrink-0" />
                            <span>Memutar...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                            <span>Tes</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleSelectDeviceVoice(voice.voiceURI)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-slate-200 text-slate-900'
                            : 'text-slate-300 hover:text-slate-400'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : (
                          <Radio className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}

              {deviceVoices.length === 0 && (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed">
                  <div className="flex items-center gap-2 font-bold mb-1 text-slate-800">
                    <Info className="w-4 h-4 text-rose-500 shrink-0" />
                    Menggunakan paket suara bawaan browser (ja-JP)
                  </div>
                  Sistem otomatis menggunakan mesin sintesis suara bahasa Jepang default browser Anda secara instan dan bebas kuota.
                </div>
              )}
            </div>
          </div>

          {/* Natural Voice Hint */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-600 flex items-start gap-2">
            <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
            <span>
              <strong>Tips Suara Natural:</strong> Pada Windows, gunakan <strong>Microsoft Edge</strong> untuk menikmati suara <em>Microsoft Nanami Online (Natural)</em>. Pada iPhone/Mac, aktifkan suara <em>Kyoko (Enhanced)</em> di Pengaturan Aksesibilitas.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              Suara:{' '}
              <strong className="text-slate-800 font-semibold">
                {selectedDeviceVoice ? 'Pilihan Kustom' : 'Otomatis (Direkomendasikan)'}
              </strong>{' '}
              &bull; <span className="font-mono">{speechRate}x</span>
            </span>
          </div>

          <button
            id="done-audio-settings-btn"
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
