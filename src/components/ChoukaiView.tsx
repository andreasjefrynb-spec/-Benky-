import React, { useState, useMemo, useRef } from 'react';
import { ChoukaiItem } from '../types';
import { choukaiN1Data } from '../data/choukaiN1Data';
import { speakJapanese } from '../utils/audio';
import {
  Headphones,
  Volume2,
  Play,
  Square,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Sparkles,
  Zap,
  Briefcase,
  AlertTriangle,
  User,
  Activity,
  Layers,
  Search,
} from 'lucide-react';

interface ChoukaiViewProps {
  speechRate: number;
}

export const ChoukaiView: React.FC<ChoukaiViewProps> = ({ speechRate: defaultSpeechRate }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(choukaiN1Data[0]?.id || '');
  const [activeTabType, setActiveTabType] = useState<'all' | 'keigo_bisnis' | 'kyokumen_tenkan' | 'sokkai_outou'>('all');
  const [audioSpeed, setAudioSpeed] = useState<number>(1.15); // Default to authentic 1.15x N1 natural speed
  const [showScript, setShowScript] = useState<boolean>(false);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [activePlayingIndex, setActivePlayingIndex] = useState<number | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');

  const currentScenario = useMemo(() => {
    return choukaiN1Data.find((s) => s.id === selectedScenarioId) || choukaiN1Data[0];
  }, [selectedScenarioId]);

  const filteredScenarios = useMemo(() => {
    return choukaiN1Data.filter((s) => {
      const matchType = activeTabType === 'all' || s.type === activeTabType;
      const matchSearch =
        s.titleJp.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.titleId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.situation.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchSearch;
    });
  }, [activeTabType, searchQuery]);

  const stopAudio = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAll(false);
    setActivePlayingIndex(null);
  };

  const handlePlaySingleLine = (text: string, reading?: string, index?: number) => {
    stopAudio();
    if (typeof index === 'number') {
      setActivePlayingIndex(index);
    }
    speakJapanese(text, audioSpeed, () => {
      setActivePlayingIndex(null);
    }, reading);
  };

  const handlePlayFullDialogue = async () => {
    if (isPlayingAll) {
      stopAudio();
      return;
    }

    if (!currentScenario || !currentScenario.audioDialogue.length) return;
    setIsPlayingAll(true);

    const lines = currentScenario.audioDialogue;
    for (let i = 0; i < lines.length; i++) {
      setActivePlayingIndex(i);
      await new Promise<void>((resolve) => {
        speakJapanese(
          lines[i].jp,
          audioSpeed,
          () => {
            setTimeout(resolve, 350); // Natural pause between conversational turns
          },
          lines[i].reading
        );
      });
    }

    setIsPlayingAll(false);
    setActivePlayingIndex(null);
  };

  const handleSelectOption = (questionId: string, optionLabel: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionLabel }));
  };

  const handleToggleExplanation = (questionId: string) => {
    setShowExplanations((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  return (
    <div className="w-full flex flex-col gap-6 max-w-7xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-indigo-900 via-violet-800 to-purple-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3.5 py-1 rounded-full text-xs font-bold tracking-wide mb-3">
            <Headphones className="w-4 h-4 text-violet-200" />
            <span>JLPT N3 Choukai (聴解) • Menyimak Percakapan Natural &amp; Respon</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Simulasi Menyimak Situasi, Percakapan Kerja, &amp; Respon Spontan
          </h1>
          <p className="mt-2 text-sm sm:text-base text-violet-100/90 leading-relaxed">
            Latih telinga mendengarkan bahasa Jepang natural tingkat menengah: tangkap alur percakapan, nuansa tuturan sopan sehari-hari, dan respon spontan 1-2 detik (即時応答).
          </p>
        </div>
      </div>

      {/* Filter and Speed Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Type Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTabType('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTabType === 'all'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            Semua Skenario ({choukaiN1Data.length})
          </button>
          <button
            onClick={() => setActiveTabType('kyokumen_tenkan')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTabType === 'kyokumen_tenkan'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Activity className="w-4 h-4" />
            Distraksi U-Turn (局面転換)
          </button>
          <button
            onClick={() => setActiveTabType('keigo_bisnis')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTabType === 'keigo_bisnis'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            Keigo Bisnis &amp; Negosiasi
          </button>
          <button
            onClick={() => setActiveTabType('sokkai_outou')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-all ${
              activeTabType === 'sokkai_outou'
                ? 'bg-violet-600 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Zap className="w-4 h-4" />
            Respon Kilat (即時応答)
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari skenario audio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-violet-500"
          />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Scenario List */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
            Daftar Modul Choukai N3 ({filteredScenarios.length})
          </div>
          {filteredScenarios.map((sc) => {
            const isSelected = sc.id === currentScenario?.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  stopAudio();
                  setSelectedScenarioId(sc.id);
                  setShowScript(false);
                  setSelectedAnswers({});
                  setShowExplanations({});
                }}
                className={`p-4 rounded-2xl text-left border transition-all ${
                  isSelected
                    ? 'bg-violet-50/80 border-violet-500 shadow-md ring-1 ring-violet-500'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                      sc.type === 'kyokumen_tenkan'
                        ? 'bg-amber-100 text-amber-800'
                        : sc.type === 'keigo_bisnis'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {sc.type === 'kyokumen_tenkan'
                      ? 'Distraksi U-Turn'
                      : sc.type === 'keigo_bisnis'
                      ? 'Keigo Bisnis'
                      : 'Respon Spontan'}
                  </span>
                </div>
                <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{sc.titleJp}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{sc.titleId}</p>
              </button>
            );
          })}
        </div>

        {/* Right Side: Audio Player, Dialogue Lines & Questions */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {currentScenario && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col gap-6">
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-violet-700 uppercase tracking-wide">
                      Situasi: {currentScenario.situation}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-800">
                    {currentScenario.titleJp}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {currentScenario.titleId}
                  </p>
                </div>

                {/* Speed Controls */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 p-1.5 rounded-2xl shrink-0">
                  <span className="text-[11px] font-bold text-slate-500 px-2">Kecepatan:</span>
                  {[
                    { label: '0.85x', speed: 0.85 },
                    { label: '1.0x', speed: 1.0 },
                    { label: '1.15x (Alami)', speed: 1.15 },
                  ].map((s) => (
                    <button
                      key={s.label}
                      onClick={() => setAudioSpeed(s.speed)}
                      className={`px-2.5 py-1 text-xs font-bold rounded-xl transition-all ${
                        audioSpeed === s.speed
                          ? 'bg-violet-600 text-white shadow-xs'
                          : 'text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Master Audio Playback Bar */}
              <div className="bg-gradient-to-r from-violet-900 to-indigo-950 rounded-2xl p-4 sm:p-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                <div className="flex items-center gap-3">
                  <button
                    onClick={handlePlayFullDialogue}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isPlayingAll
                        ? 'bg-amber-400 text-slate-950 animate-pulse'
                        : 'bg-white text-violet-900 hover:scale-105 shadow-md'
                    }`}
                  >
                    {isPlayingAll ? <Square className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>
                  <div>
                    <div className="font-bold text-sm sm:text-base">
                      {isPlayingAll ? 'Sedang Memutar Audio Skenario...' : 'Putar Seluruh Dialog Audio'}
                    </div>
                    <div className="text-xs text-violet-200">
                      {isPlayingAll ? 'Klik untuk menghentikan' : 'Dengarkan dialog secara beruntun dengan jeda natural'}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowScript(!showScript)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 hover:bg-white/30 text-white px-3.5 py-2 rounded-xl border border-white/20 transition-all self-start sm:self-auto"
                >
                  {showScript ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span>Sembunyikan Naskah Teks (Simulasi Ujian)</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span>Buka Naskah Dialog &amp; Furigana</span>
                    </>
                  )}
                </button>
              </div>

              {/* Strategy Alert */}
              <div className="bg-violet-50/80 border border-violet-200 rounded-2xl p-4 text-xs sm:text-sm text-violet-950 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-violet-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-violet-900 block mb-0.5">
                    Tips Mendengar Nuansa &amp; Intonasi:
                  </span>
                  {currentScenario.listeningStrategy}
                </div>
              </div>

              {/* Dialogue Transcript List */}
              <div className="flex flex-col gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {showScript ? 'Transkrip Dialog Interaktif' : 'Mode Ujian Menyimak (Naskah Ditutup)'}
                </span>

                {!showScript ? (
                  <div className="bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-2">
                    <Headphones className="w-10 h-10 text-slate-400 animate-bounce" />
                    <h4 className="font-bold text-slate-700 text-base">
                      Naskah Disembunyikan untuk Melatih Telinga
                    </h4>
                    <p className="text-xs text-slate-500 max-w-md">
                      Klik tombol &ldquo;Putar Seluruh Dialog Audio&rdquo; di atas, dengarkan baik-baik intonasi dan kata kuncinya, lalu coba jawab pertanyaan di bawah sebelum membuka teks.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {currentScenario.audioDialogue.map((line, idx) => {
                      const isLineActive = activePlayingIndex === idx;
                      return (
                        <div
                          key={idx}
                          className={`p-4 rounded-2xl border transition-all ${
                            isLineActive
                              ? 'bg-violet-50/90 border-violet-500 shadow-md ring-1 ring-violet-500'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                                <User className="w-3 h-3 text-slate-500" />
                                {line.speaker}
                              </span>
                              {line.isKeyDecisionTurn && (
                                <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                                  <AlertTriangle className="w-3 h-3 text-amber-600" />
                                  Poin U-Turn Keputusan
                                </span>
                              )}
                            </div>
                            <button
                              onClick={() => handlePlaySingleLine(line.jp, line.reading, idx)}
                              className="p-1.5 text-violet-600 hover:text-violet-800 hover:bg-violet-50 rounded-lg transition-all"
                              title="Dengarkan baris ini"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-base sm:text-lg font-medium text-slate-900 leading-relaxed">
                            {line.jp}
                          </p>
                          <p className="text-xs text-violet-700 font-mono mt-0.5">{line.reading}</p>
                          <p className="text-xs sm:text-sm text-slate-600 mt-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                            {line.id}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Keigo Breakdown Table */}
              {currentScenario.keigoBreakdown && currentScenario.keigoBreakdown.length > 0 && (
                <div className="flex flex-col gap-2 mt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Bedah Keigo &amp; Bahasa Etika Bisnis
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentScenario.keigoBreakdown.map((kg, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col gap-1.5 shadow-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900 text-sm">{kg.term}</span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              kg.type === 'Sonkeigo'
                                ? 'bg-blue-100 text-blue-800'
                                : kg.type === 'Kenjougo'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-purple-100 text-purple-800'
                            }`}
                          >
                            {kg.type}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          Bentuk Biasa:{' '}
                          <span className="font-semibold text-slate-700">
                            {kg.plainEquivalent}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2 rounded-xl mt-1">
                          {kg.usageNote}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comprehension Quiz */}
              <div className="flex flex-col gap-5 mt-4 border-t border-slate-200 pt-6">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-violet-700" />
                  <h3 className="font-extrabold text-slate-800 text-lg">
                    Pertanyaan Pemahaman Menyimak (聴解)
                  </h3>
                </div>

                {currentScenario.questions.map((q, qIndex) => {
                  const selected = selectedAnswers[q.id];
                  const isAnswered = Boolean(selected);
                  const isCorrect = selected === q.correctOption;
                  const isExpOpen = showExplanations[q.id];

                  return (
                    <div
                      key={q.id}
                      className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200 flex flex-col gap-4"
                    >
                      <div>
                        <span className="text-xs font-bold text-violet-700">
                          Soal Choukai #{qIndex + 1}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                          {q.questionJp}
                        </h4>
                        <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{q.questionId}</p>
                      </div>

                      {/* Options */}
                      <div className="flex flex-col gap-2.5">
                        {q.options.map((opt) => {
                          const isOptionChosen = selected === opt.label;
                          let btnStyle =
                            'bg-white border-slate-200 text-slate-800 hover:border-violet-400 hover:bg-violet-50/40';

                          if (isAnswered) {
                            if (opt.label === q.correctOption) {
                              btnStyle =
                                'bg-violet-50 border-violet-500 text-violet-950 font-semibold ring-1 ring-violet-500';
                            } else if (isOptionChosen && !isCorrect) {
                              btnStyle = 'bg-red-50 border-red-400 text-red-950 ring-1 ring-red-400';
                            } else {
                              btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                            }
                          }

                          return (
                            <button
                              key={opt.label}
                              onClick={() => handleSelectOption(q.id, opt.label)}
                              className={`p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${btnStyle}`}
                            >
                              <span className="font-bold text-xs px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 shrink-0">
                                {opt.label}
                              </span>
                              <div className="flex-1">
                                <div className="text-sm font-medium">{opt.textJp}</div>
                                <div className="text-xs text-slate-500 mt-0.5">{opt.textId}</div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {/* Feedback */}
                      {isAnswered && (
                        <div className="flex flex-col gap-3 pt-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {isCorrect ? (
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                                  <CheckCircle2 className="w-4 h-4" />
                                  <span>Jawaban Anda Tepat! ({q.correctOption})</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-100 px-3 py-1 rounded-full">
                                  <XCircle className="w-4 h-4" />
                                  <span>Jawaban Salah. Kunci: {q.correctOption}</span>
                                </div>
                              )}
                            </div>
                            <button
                              onClick={() => handleToggleExplanation(q.id)}
                              className="text-xs font-bold text-violet-700 hover:text-violet-800 underline"
                            >
                              {isExpOpen ? 'Sembunyikan Pembahasan' : 'Buka Analisis Distraksi U-Turn'}
                            </button>
                          </div>

                          {isExpOpen && (
                            <div className="bg-white rounded-xl p-4 border border-violet-200 flex flex-col gap-2.5 text-xs sm:text-sm">
                              <div>
                                <span className="font-bold text-slate-800 block">Penjelasan:</span>
                                <p className="text-slate-700 leading-relaxed">{q.explanationId}</p>
                              </div>
                              {q.kyokumenDistractionAnalysis && (
                                <div className="bg-amber-50/80 p-3 rounded-lg border border-amber-200">
                                  <span className="font-bold text-amber-900 block mb-0.5">
                                    ⚠️ Analisis Jebakan &amp; Distraksi Audio:
                                  </span>
                                  <p className="text-amber-950 leading-relaxed">
                                    {q.kyokumenDistractionAnalysis}
                                  </p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
