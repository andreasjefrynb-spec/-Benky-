import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, Smartphone, Check, Play, Pause, X, Radio, Info } from 'lucide-react';
import { soundManager, AI_VOICES, AudioEngine, DeviceVoiceInfo } from '../utils/audio';

interface AudioSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  speechRate: number;
  onSelectSpeechRate: (rate: number) => void;
}

const VOICE_PREVIEWS: Record<string, { jp: string; romaji: string; id: string }> = {
  Kore: {
    jp: 'こんにちは！今日も楽しく日本語の勉強をしましょう。',
    romaji: 'Konnichiwa! Kyou mo tanoshiku nihongo no benkyou o shimashou.',
    id: 'Halo! Hari ini mari belajar bahasa Jepang bersama dengan menyenangkan.',
  },
  Zephyr: {
    jp: 'はじめまして。きれいな発音で一緒に学びましょう。',
    romaji: 'Hajimemashite. Kirei na hatsuon de issho ni manabimashou.',
    id: 'Salam kenal. Mari belajar bersama dengan pelafalan yang rapi dan sopan.',
  },
  Puck: {
    jp: 'ヤッホー！元気いっぱい日本語をどんどん練習しよう！',
    romaji: 'Yahho-! Genki ippai nihongo o dondon renshuu shiyou!',
    id: 'Halo! Penuh semangat, ayo kita terus latihan bahasa Jepang!',
  },
  Fenrir: {
    jp: '準備はいいか？集中して正しい日本語を身につけよう。',
    romaji: 'Junbi wa ii ka? Shuuchuu shite tadashii nihongo o mi ni tsukeyou.',
    id: 'Sudah siap? Mari fokus menguasai bahasa Jepang yang tepat.',
  },
  Charon: {
    jp: 'お疲れ様です。一歩ずつ落ち着いて進めていきましょう。',
    romaji: 'Otsukaresama desu. Ippozutsu ochitsuite susumete ikimashou.',
    id: 'Semangat belajarnya. Mari melangkah maju setahap demi setahap.',
  },
};

export const AudioSettingsModal: React.FC<AudioSettingsModalProps> = ({
  isOpen,
  onClose,
  speechRate,
  onSelectSpeechRate,
}) => {
  const [engine, setEngineState] = useState<AudioEngine>(soundManager.getEngine());
  const [currentVoice, setCurrentVoice] = useState<string>(soundManager.getAiVoice());
  const [deviceVoices, setDeviceVoices] = useState<DeviceVoiceInfo[]>([]);
  const [selectedDeviceVoice, setSelectedDeviceVoice] = useState<string | null>(
    soundManager.getSelectedDeviceVoice()
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

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
      setEngineState(soundManager.getEngine());
      setCurrentVoice(soundManager.getAiVoice());
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

  const handleSelectEngine = (newEngine: AudioEngine) => {
    soundManager.setEngine(newEngine);
    setEngineState(newEngine);
    refreshDeviceVoices();
  };

  const handleSelectVoice = (voiceId: string) => {
    soundManager.setAiVoice(voiceId);
    setCurrentVoice(voiceId);
  };

  const handleSelectDeviceVoice = (voiceURI: string | null) => {
    soundManager.setSelectedDeviceVoice(voiceURI);
    setSelectedDeviceVoice(voiceURI);
  };

  const handlePreviewVoice = (voiceId: string) => {
    const preview = VOICE_PREVIEWS[voiceId] || VOICE_PREVIEWS.Kore;
    if (isPlaying && playingVoiceId === voiceId) {
      soundManager.stop();
      setPlayingVoiceId(null);
      return;
    }

    soundManager.setAiVoice(voiceId);
    setCurrentVoice(voiceId);
    setPlayingVoiceId(voiceId);
    soundManager.speak(preview.jp, speechRate, () => {
      setPlayingVoiceId(null);
    });
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
    soundManager.speak('こんにちは！日本語の発音テストです。今日もがんばりましょう！', speechRate, () => {
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
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Pengaturan Suara Pelafalan
              </h2>
              <p className="text-xs text-slate-500">
                Pilih suara AI alami seperti ngobrol atau suara perangkat lokal
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
          {/* Engine Selection: AI Voice vs Device Synth */}
          <div>
            <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 uppercase">
              Mesin Suara (Audio Engine)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* AI Conversational Voice */}
              <button
                id="select-ai-voice-engine-btn"
                type="button"
                onClick={() => handleSelectEngine('ai')}
                className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                  engine === 'ai'
                    ? 'border-rose-400 bg-rose-50/50 ring-2 ring-rose-200/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900">
                    <Sparkles className="w-4 h-4 text-rose-500" />
                    Suara AI Realistis
                  </span>
                  {engine === 'ai' ? (
                    <span className="w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-slate-300" />
                  )}
                </div>
                <span className="text-[11px] font-semibold text-rose-600 mb-1">
                  Gemini AI Conversational Voice
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Pelafalan bernada manusiawi asli, intonasi Tokyo hidup, dan aksen vokal alami seperti teman ngobrol.
                </p>
                {soundManager.isAiQuotaCooldown() && (
                  <div className="mt-2 text-[10px] font-medium bg-amber-50 text-amber-800 px-2 py-1 rounded-lg border border-amber-200/80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                    Auto-fallback ke suara Tokyo lokal aktif saat kuota API istirahat.
                  </div>
                )}
              </button>

              {/* Device Web Speech API */}
              <button
                id="select-device-voice-engine-btn"
                type="button"
                onClick={() => handleSelectEngine('device')}
                className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                  engine === 'device'
                    ? 'border-slate-800 bg-slate-50 ring-2 ring-slate-200 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-900">
                    <Smartphone className="w-4 h-4 text-slate-600" />
                    Suara Sistem Perangkat
                  </span>
                  {engine === 'device' ? (
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </span>
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-slate-300" />
                  )}
                </div>
                <span className="text-[11px] font-medium text-slate-600 mb-1">
                  Web Speech API (Siri / Google TTS lokal)
                </span>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sintesis bawaan sistem operasi HP atau browser Anda tanpa butuh koneksi server.
                </p>
              </button>
            </div>
          </div>

          {/* AI Voice Personas (visible if engine is AI) */}
          {engine === 'ai' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase">
                  Pilihan Karakter Suara AI
                </label>
                <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">
                  5 Karakter Tersedia
                </span>
              </div>

              <div className="space-y-2">
                {AI_VOICES.map((voice) => {
                  const isSelected = currentVoice === voice.id;
                  const isVoicePlaying = isPlaying && playingVoiceId === voice.id;
                  return (
                    <div
                      key={voice.id}
                      className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-rose-400 bg-rose-50/40 shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleSelectVoice(voice.id)}
                        className="flex-1 flex items-start gap-3 text-left cursor-pointer select-none"
                      >
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${
                            isSelected
                              ? 'bg-rose-500 text-white shadow-xs'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {voice.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-sm font-bold text-slate-900">
                              {voice.name} ({voice.jpName})
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-600">
                              {voice.gender} &bull; {voice.tone}
                            </span>
                            {voice.recommended && (
                              <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                Sangat Alami
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                            {voice.description}
                          </p>
                        </div>
                      </button>

                      <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                        {/* Play Preview Button */}
                        <button
                          id={`preview-voice-${voice.id.toLowerCase()}-btn`}
                          type="button"
                          onClick={() => handlePreviewVoice(voice.id)}
                          className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                            isVoicePlaying
                              ? 'bg-rose-500 text-white shadow-xs animate-pulse'
                              : 'bg-white hover:bg-rose-50 text-rose-600 border border-rose-200'
                          }`}
                          title="Dengarkan contoh suara ini"
                        >
                          {isVoicePlaying ? (
                            <>
                              <Pause className="w-3.5 h-3.5 shrink-0" />
                              <span>Memutar...</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                              <span>Tes Suara</span>
                            </>
                          )}
                        </button>

                        {/* Select radio marker */}
                        <button
                          type="button"
                          onClick={() => handleSelectVoice(voice.id)}
                          className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-rose-100 text-rose-600'
                              : 'text-slate-300 hover:text-slate-400'
                          }`}
                          title={isSelected ? 'Dipilih' : 'Gunakan suara ini'}
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
              </div>
            </div>
          )}

          {/* Device Voices Selection (visible if engine is device) */}
          {engine === 'device' && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-500 tracking-wider uppercase">
                  Pilihan Suara Perangkat Terdeteksi
                </label>
                <span className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
                  {deviceVoices.length > 0 ? `${deviceVoices.length} Suara Jepang Tersedia` : 'Memindai Suara...'}
                </span>
              </div>

              <div className="space-y-2">
                {/* Auto-Select Option */}
                <div
                  className={`p-3 sm:p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    selectedDeviceVoice === null
                      ? 'border-slate-800 bg-slate-50 shadow-xs ring-1 ring-slate-300'
                      : 'border-slate-200/80 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleSelectDeviceVoice(null)}
                    className="flex-1 flex items-start gap-3 text-left cursor-pointer select-none"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        selectedDeviceVoice === null
                          ? 'bg-slate-900 text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      AUTO
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-slate-900">
                          Pilih Otomatis (Direkomendasikan)
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                          Paling Alami
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Sistem otomatis memprioritaskan suara Natural / Neural berkualitas tinggi (seperti Microsoft Nanami, Apple Kyoko Enhanced, atau Siri).
                      </p>
                    </div>
                  </button>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      id="preview-auto-device-voice-btn"
                      type="button"
                      onClick={() => handlePreviewDeviceVoice(null)}
                      className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                        isPlaying && playingVoiceId === 'auto-device'
                          ? 'bg-slate-900 text-white shadow-xs animate-pulse'
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
                          <span>Tes Suara</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSelectDeviceVoice(null)}
                      className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors cursor-pointer ${
                        selectedDeviceVoice === null
                          ? 'bg-slate-200 text-slate-900'
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
                                Studio Natural
                              </span>
                            )}
                            {voice.quality === 'enhanced' && (
                              <span className="text-[10px] px-2 py-0.5 rounded-md font-bold bg-sky-100 text-sky-800 border border-sky-200">
                                Apple Enhanced
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
                          className={`min-h-[38px] px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
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
                              <span>Tes Suara</span>
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
                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed">
                    <div className="flex items-center gap-2 font-bold mb-1">
                      <Info className="w-4 h-4 text-amber-600 shrink-0" />
                      Tidak ada paket suara bahasa Jepang terinstal di browser ini.
                    </div>
                    Sangat disarankan menggunakan opsi <strong>Suara AI Realistis (Gemini)</strong> di atas untuk mendapatkan pelafalan Tokyo yang jernih dan ekspresif.
                  </div>
                )}
              </div>

              {/* Natural Voice Hint */}
              <div className="mt-3 p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-[11px] text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Tips Kualitas Suara:</strong> Pada Windows, buka aplikasi lewat <strong>Microsoft Edge</strong> untuk menikmati suara <em>Microsoft Nanami Online (Natural)</em> secara gratis. Pada iPhone/Mac, aktifkan suara <em>Kyoko (Enhanced)</em> di Pengaturan Aksesibilitas.
                </span>
              </div>
            </div>
          )}

          {/* Speech Rate (Speed) Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-500 tracking-wider mb-2 uppercase">
              Kecepatan Pelafalan (Speed)
            </label>
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
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/70 flex items-center justify-between shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              Suara aktif:{' '}
              <strong className="text-slate-800 font-semibold">
                {engine === 'ai' ? `Gemini AI (${currentVoice})` : 'Sistem Lokal'}
              </strong>{' '}
              &bull; <span className="font-mono">{speechRate}x</span>
            </span>
          </div>

          <button
            id="done-audio-settings-btn"
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
};
