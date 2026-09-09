import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  Volume2,
  PenTool,
  HelpCircle,
  X,
  Sparkles,
} from 'lucide-react';
import {
  fetchKanjiStrokeData,
  KanjiStrokeData,
  KANJI_STROKE_RULES,
} from '../utils/kanjiStrokeData';
import { soundManager } from '../utils/audio';

interface KanjiStrokeOrderViewerProps {
  kanjiChar: string;
  reading?: string;
  meaningId?: string;
  strokesCount?: number;
  speechRate?: number;
  onPracticeWriting?: () => void;
  onClose?: () => void;
  compact?: boolean;
}

export const KanjiStrokeOrderViewer: React.FC<KanjiStrokeOrderViewerProps> = ({
  kanjiChar,
  reading,
  meaningId,
  strokesCount,
  speechRate = 0.9,
  onPracticeWriting,
  onClose,
  compact = false,
}) => {
  const [data, setData] = useState<KanjiStrokeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNumbers, setShowNumbers] = useState(true);
  const [showAllStrokesFaint, setShowAllStrokesFaint] = useState(true);
  const [showRulesModal, setShowRulesModal] = useState(false);
  const playTimerRef = useRef<NodeJS.Timeout | null>(null);

  const cleanChar = kanjiChar.trim().charAt(0) || '一';

  // Load stroke data for the character
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setCurrentStep(1);
    setIsPlaying(false);

    fetchKanjiStrokeData(cleanChar).then((result) => {
      if (isMounted) {
        setData(result);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [cleanChar]);

  const totalStrokes = data?.paths.length || strokesCount || 1;

  // Auto-play animation through steps
  useEffect(() => {
    if (isPlaying) {
      playTimerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= totalStrokes) {
            setIsPlaying(false);
            return 1;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (playTimerRef.current) {
        clearInterval(playTimerRef.current);
        playTimerRef.current = null;
      }
    }

    return () => {
      if (playTimerRef.current) clearInterval(playTimerRef.current);
    };
  }, [isPlaying, totalStrokes]);

  const handlePrevStep = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev > 1 ? prev - 1 : totalStrokes));
  }, [totalStrokes]);

  const handleNextStep = useCallback(() => {
    setIsPlaying(false);
    setCurrentStep((prev) => (prev < totalStrokes ? prev + 1 : 1));
  }, [totalStrokes]);

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStep >= totalStrokes) {
        setCurrentStep(1);
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(1);
  };

  const currentStroke = data?.paths[currentStep - 1];

  return (
    <div
      className={`w-full flex flex-col items-center bg-white ${
        compact ? 'p-2' : 'p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-sm'
      }`}
    >
      {/* Header Bar */}
      <div className="w-full flex items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 font-jp font-bold text-xl shrink-0">
            {cleanChar}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-sm truncate">
                Langkah Coretan (筆順)
              </span>
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 shrink-0">
                {totalStrokes} goresan
              </span>
            </div>
            {(reading || meaningId) && (
              <p className="text-xs text-slate-500 truncate">
                {reading && <span className="font-semibold text-rose-600 mr-1">{reading}</span>}
                {meaningId && <span>&bull; {meaningId}</span>}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* Pronunciation Audio */}
          <button
            onClick={() => soundManager.speak(cleanChar, speechRate)}
            className="p-2 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all cursor-pointer select-none active:scale-95"
            title="Dengarkan pelafalan kanji"
            aria-label="Dengarkan pelafalan"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Rules Guide Info */}
          <button
            onClick={() => setShowRulesModal(true)}
            className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all cursor-pointer select-none"
            title="Aturan Dasar Urutan Goresan Kanji (9 Prinsip)"
            aria-label="Aturan goresan kanji"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Optional Close Button if modal */}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-all cursor-pointer"
              title="Tutup"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Main Visualizer Area */}
      <div className="relative w-full aspect-square max-w-[280px] sm:max-w-[320px] bg-[#fffdf9] rounded-3xl border-2 border-slate-300 shadow-inner overflow-hidden select-none mb-3">
        {/* Authentic Japanese Cross Grid (十字格) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical center */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-red-200/90" />
          {/* Horizontal center */}
          <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-red-200/90" />
          {/* Diagonal guides */}
          <svg className="absolute inset-0 w-full h-full stroke-red-100/60" strokeDasharray="4,4">
            <line x1="0" y1="0" x2="100%" y2="100%" />
            <line x1="100%" y1="0" x2="0" y2="100%" />
          </svg>
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xs z-20">
            <div className="w-8 h-8 border-3 border-rose-500 border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs font-bold text-slate-600">Memuat urutan goresan...</span>
          </div>
        )}

        {/* SVG KanjiVG Rendering */}
        {data && data.paths.length > 0 ? (
          <svg
            viewBox="0 0 109 109"
            className="absolute inset-0 w-full h-full z-10"
            style={{
              strokeLinecap: 'round',
              strokeLinejoin: 'round',
            }}
          >
            {/* Future strokes: Faint gray dashed guide */}
            {showAllStrokesFaint &&
              data.paths.map((path, idx) => {
                if (idx < currentStep) return null;
                return (
                  <path
                    key={`faint-${path.id}`}
                    d={path.d}
                    fill="none"
                    stroke="#cbd5e1"
                    strokeWidth="3.5"
                    strokeDasharray="2,2"
                    opacity={0.45}
                  />
                );
              })}

            {/* Completed past strokes: Solid dark sumi ink */}
            {data.paths.map((path, idx) => {
              if (idx >= currentStep - 1) return null;
              return (
                <path
                  key={`past-${path.id}`}
                  d={path.d}
                  fill="none"
                  stroke="#1e293b"
                  strokeWidth="4"
                  opacity={0.95}
                />
              );
            })}

            {/* Current Active Stroke: Highlighted in Rose/Red */}
            {currentStroke && (
              <g key={`current-${currentStroke.id}`}>
                <path
                  d={currentStroke.d}
                  fill="none"
                  stroke="#e11d48"
                  strokeWidth="4.5"
                  className="animate-pulse"
                />
              </g>
            )}

            {/* Number Badges for Stroke Order */}
            {showNumbers &&
              data.numbers.map((numItem) => {
                const isCurrent = numItem.num === currentStep;
                const isPast = numItem.num < currentStep;

                return (
                  <g key={`num-${numItem.num}`}>
                    {/* Circle badge */}
                    <circle
                      cx={numItem.x - 2}
                      cy={numItem.y - 3}
                      r={isCurrent ? 4.5 : 3.5}
                      fill={isCurrent ? '#e11d48' : isPast ? '#475569' : '#94a3b8'}
                      opacity={isCurrent ? 1 : isPast ? 0.85 : 0.6}
                    />
                    {/* Number text */}
                    <text
                      x={numItem.x - 2}
                      y={numItem.y - 1}
                      fontSize="5"
                      fontFamily="sans-serif"
                      fontWeight="bold"
                      fill="#ffffff"
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {numItem.num}
                    </text>
                  </g>
                );
              })}
          </svg>
        ) : (
          /* Fallback when SVG path is unavailable */
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="font-jp text-[130px] sm:text-[150px] font-bold text-slate-800 leading-none select-none">
              {cleanChar}
            </span>
          </div>
        )}

        {/* Step Badge Overlay in top right */}
        <div className="absolute top-2.5 right-2.5 z-20 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-xl border border-slate-200/80 shadow-2xs flex items-center gap-1 text-[11px] font-mono font-bold text-slate-700">
          <span className="text-rose-600 font-extrabold">{currentStep}</span>
          <span className="text-slate-400">/</span>
          <span>{totalStrokes}</span>
        </div>
      </div>

      {/* Current Stroke Instruction Box */}
      <div className="w-full max-w-[340px] bg-rose-50/70 border border-rose-200/80 rounded-2xl p-3 mb-3 text-left">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-[10px] font-bold font-mono">
              {currentStep}
            </span>
            <span className="text-xs font-bold text-slate-800">
              Langkah {currentStep} dari {totalStrokes}
            </span>
          </div>
          {currentStroke?.type && (
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-lg bg-white border border-rose-200 text-rose-600 font-mono">
              Tipe: {currentStroke.type}
            </span>
          )}
        </div>

        <p className="text-xs text-rose-950 font-medium leading-relaxed">
          {currentStroke?.desc ||
            'Tarik kuas sesuai nomor dan arah panah panduan.'}
        </p>

        {data?.detectedRule && (
          <div className="mt-2 pt-2 border-t border-rose-200/60 flex items-start gap-1.5 text-[11px] text-rose-900">
            <Sparkles className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
            <span className="font-semibold leading-tight">{data.detectedRule}</span>
          </div>
        )}
      </div>

      {/* Stepper Controls */}
      <div className="w-full max-w-[340px] flex items-center justify-between gap-1.5 p-1.5 bg-slate-100 rounded-2xl border border-slate-200 mb-3 select-none">
        {/* Prev Step */}
        <button
          onClick={handlePrevStep}
          className="p-2 bg-white hover:bg-slate-50 text-slate-700 active:bg-slate-100 rounded-xl border border-slate-200/80 shadow-2xs transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
          title="Goresan Sebelumnya"
          aria-label="Langkah sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Play / Pause Animation */}
        <button
          onClick={handleTogglePlay}
          className={`flex-1 min-h-[38px] px-3 py-1.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98 ${
            isPlaying
              ? 'bg-amber-500 text-white hover:bg-amber-600'
              : 'bg-rose-600 text-white hover:bg-rose-700'
          }`}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          <span>{isPlaying ? 'Jeda' : 'Putar Animasi'}</span>
        </button>

        {/* Reset */}
        <button
          onClick={handleReset}
          className="p-2 bg-white hover:bg-slate-50 text-slate-700 active:bg-slate-100 rounded-xl border border-slate-200/80 shadow-2xs transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
          title="Mulai Ulang dari Coretan 1"
          aria-label="Ulangi"
        >
          <RotateCcw className="w-4 h-4" />
        </button>

        {/* Next Step */}
        <button
          onClick={handleNextStep}
          className="p-2 bg-white hover:bg-slate-50 text-slate-700 active:bg-slate-100 rounded-xl border border-slate-200/80 shadow-2xs transition-all cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
          title="Goresan Berikutnya"
          aria-label="Langkah berikutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* View Options (Toggle Numbers, Toggle Guides) */}
      <div className="w-full max-w-[340px] flex items-center justify-between gap-2 mb-3 text-xs">
        <button
          onClick={() => setShowNumbers((prev) => !prev)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
            showNumbers
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span>Nomor Coretan:</span>
          <span>{showNumbers ? 'ON' : 'OFF'}</span>
        </button>

        <button
          onClick={() => setShowAllStrokesFaint((prev) => !prev)}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold transition-all cursor-pointer border ${
            showAllStrokesFaint
              ? 'bg-slate-800 text-white border-slate-800'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {showAllStrokesFaint ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>Bayangan: {showAllStrokesFaint ? 'ON' : 'OFF'}</span>
        </button>
      </div>

      {/* Mini Step Carousel: Click any step to jump */}
      {data && data.paths.length > 0 && (
        <div className="w-full max-w-[340px] flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 mb-3">
          {data.paths.map((_, idx) => {
            const stepNum = idx + 1;
            const isCurrent = stepNum === currentStep;

            return (
              <button
                key={`step-btn-${stepNum}`}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStep(stepNum);
                }}
                className={`w-9 h-9 rounded-xl font-mono font-bold text-xs shrink-0 transition-all cursor-pointer select-none flex items-center justify-center border active:scale-95 ${
                  isCurrent
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs ring-2 ring-rose-300'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
                title={`Pindah ke langkah ${stepNum}`}
              >
                {stepNum}
              </button>
            );
          })}
        </div>
      )}

      {/* Action Shortcut: Practice on Canvas */}
      {onPracticeWriting && (
        <button
          onClick={onPracticeWriting}
          className="w-full max-w-[340px] min-h-[44px] py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer select-none active:scale-98"
        >
          <PenTool className="w-4 h-4 text-rose-400" />
          <span>Latih Tulis di Kanvas Sekarang</span>
        </button>
      )}

      {/* Modal: 9 Universal Rules of Kanji Stroke Order */}
      {showRulesModal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-3 backdrop-blur-xs"
          onClick={() => setShowRulesModal(false)}
        >
          <div
            className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] overflow-y-auto p-5 sm:p-6 shadow-2xl border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                  <span>9 Aturan Utama Urutan Coretan Kanji</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Pedoman resmi 筆順 (Hitsujun) untuk menulis kanji dengan rapi dan benar
                </p>
              </div>
              <button
                onClick={() => setShowRulesModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-xl cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {KANJI_STROKE_RULES.map((rule, idx) => (
                <div
                  key={rule.id}
                  className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 text-left"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      {rule.title}
                    </span>
                    <span className="text-[11px] font-jp text-rose-600 font-bold">
                      {rule.japanese}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {rule.description}
                  </p>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">
                      Contoh:
                    </span>
                    <div className="flex items-center gap-1 font-jp font-bold text-xs text-slate-800">
                      {rule.examples.map((ex) => (
                        <span
                          key={ex}
                          className="px-1.5 py-0.5 bg-white rounded-md border border-slate-200"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowRulesModal(false)}
              className="w-full mt-5 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl cursor-pointer hover:bg-slate-800 transition-colors"
            >
              Saya Mengerti
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
