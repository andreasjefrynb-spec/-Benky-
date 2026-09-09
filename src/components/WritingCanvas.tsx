import React, { useRef, useState, useEffect, useMemo } from 'react';
import {
  RotateCcw,
  Volume2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  PenTool,
  ListOrdered,
  Sparkles,
  Search,
  X,
  Play,
  Pause,
} from 'lucide-react';
import { CardItem } from '../types';
import { soundManager } from '../utils/audio';
import { KanjiStrokeOrderViewer } from './KanjiStrokeOrderViewer';
import {
  fetchKanjiStrokeData,
  KanjiStrokeData,
  detectKanjiRule,
} from '../utils/kanjiStrokeData';
import { kanjiData } from '../data/kanjiData';
import { hiraganaData } from '../data/hiraganaData';
import { katakanaData } from '../data/katakanaData';

interface WritingCanvasProps {
  cards: CardItem[];
  initialCard?: CardItem | null;
  speechRate: number;
}

export const WritingCanvas: React.FC<WritingCanvasProps> = ({
  cards,
  initialCard,
  speechRate,
}) => {
  // Determine character category: kanji, hiragana, or katakana
  const [charCategory, setCharCategory] = useState<'kanji' | 'hiragana' | 'katakana'>(() => {
    if (initialCard?.category === 'hiragana') return 'hiragana';
    if (initialCard?.category === 'katakana') return 'katakana';
    return 'kanji';
  });

  const [levelFilter, setLevelFilter] = useState<'all' | 'N5' | 'N4' | 'N3'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get active pool based on selected category
  const activePool = useMemo(() => {
    if (charCategory === 'hiragana') return hiraganaData;
    if (charCategory === 'katakana') return katakanaData;
    // Default to kanjiData (all 335 kanji), merged with any custom cards if present
    return kanjiData;
  }, [charCategory]);

  // Filter cards by level and search query
  const filteredCards = useMemo(() => {
    let result = activePool;

    // Filter by JLPT level for kanji
    if (charCategory === 'kanji' && levelFilter !== 'all') {
      result = result.filter((c) => c.level === levelFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (c) =>
          c.japanese.includes(q) ||
          c.reading?.toLowerCase().includes(q) ||
          c.meaningId?.toLowerCase().includes(q) ||
          (c.onyomi && c.onyomi.toLowerCase().includes(q)) ||
          (c.kunyomi && c.kunyomi.toLowerCase().includes(q))
      );
    }

    return result;
  }, [activePool, charCategory, levelFilter, searchQuery]);

  const [selectedCard, setSelectedCard] = useState<CardItem>(() => {
    if (initialCard) return initialCard;
    if (cards.length > 0) return cards[0];
    return kanjiData[0];
  });

  const [activeTab, setActiveTab] = useState<'canvas' | 'stroke_steps'>('canvas');
  const [showGuide, setShowGuide] = useState(true);
  const [brushColor, setBrushColor] = useState('#1e293b'); // Sumi ink
  const [brushWidth, setBrushWidth] = useState(8);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokesHistory, setStrokesHistory] = useState<ImageData[]>([]);
  const [strokeData, setStrokeData] = useState<KanjiStrokeData | null>(null);

  // Stroke sequence step & auto-animation state
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // Update selected card if initialCard changes
  useEffect(() => {
    if (initialCard) {
      setSelectedCard(initialCard);
      if (initialCard.category === 'hiragana') setCharCategory('hiragana');
      else if (initialCard.category === 'katakana') setCharCategory('katakana');
      else setCharCategory('kanji');
    }
  }, [initialCard]);

  // Load stroke data for the current character
  useEffect(() => {
    const char = selectedCard.japanese.trim().charAt(0);
    if (char) {
      fetchKanjiStrokeData(char).then((res) => {
        setStrokeData(res);
        setActiveStep(1);
        setIsAnimating(false);
      });
    }
  }, [selectedCard]);

  // Handle stroke animation loop
  useEffect(() => {
    if (!isAnimating || !strokeData || strokeData.paths.length === 0) return;

    const timer = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= strokeData.paths.length) {
          return 1;
        }
        return prev + 1;
      });
    }, 850);

    return () => clearInterval(timer);
  }, [isAnimating, strokeData]);

  // Clear canvas whenever selected card changes
  useEffect(() => {
    clearCanvas();
  }, [selectedCard]);

  // Set up high-DPI canvas resolution with ResizeObserver
  const initCanvasResolution = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = container.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;

    const dpr = Math.max(window.devicePixelRatio || 2, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  useEffect(() => {
    initCanvasResolution();

    const container = containerRef.current;
    if (!container) return;

    const resizeObserver = new ResizeObserver(() => {
      initCanvasResolution();
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, [activeTab]);

  const getCoordinates = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e && e.touches.length > 0) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else if ('changedTouches' in e && e.changedTouches.length > 0) {
      const touch = e.changedTouches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else if ('clientX' in e) {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    return { x: 0, y: 0 };
  };

  const startDrawing = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save state before new stroke for Undo
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokesHistory((prev) => [...prev.slice(-15), currentState]);

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctx.moveTo(x, y);
  };

  const draw = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    if (!isDrawing) return;
    if (e.cancelable) {
      e.preventDefault();
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setStrokesHistory([]);
  };

  const handleUndo = () => {
    if (strokesHistory.length === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const previousState = strokesHistory[strokesHistory.length - 1];
    ctx.putImageData(previousState, 0, 0);
    setStrokesHistory((prev) => prev.slice(0, -1));
  };

  const currentIndex = filteredCards.findIndex((c) => c.id === selectedCard.id);

  const handlePrev = () => {
    if (filteredCards.length === 0) return;
    if (currentIndex > 0) {
      setSelectedCard(filteredCards[currentIndex - 1]);
    } else {
      setSelectedCard(filteredCards[filteredCards.length - 1]);
    }
  };

  const handleNext = () => {
    if (filteredCards.length === 0) return;
    if (currentIndex < filteredCards.length - 1 && currentIndex >= 0) {
      setSelectedCard(filteredCards[currentIndex + 1]);
    } else {
      setSelectedCard(filteredCards[0]);
    }
  };

  const detectedRule = detectKanjiRule(selectedCard.japanese);

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4">
      {/* Top Switcher: Kanvas Latihan vs Urutan Langkah Coretan (筆順) */}
      <div className="w-full flex items-center justify-between gap-2 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200 select-none">
        <div className="flex items-center gap-1.5 flex-1">
          <button
            type="button"
            onClick={() => setActiveTab('canvas')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'canvas'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <PenTool className="w-4 h-4 text-rose-600" />
            <span>Kanvas Menulis</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('stroke_steps')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 py-2 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
              activeTab === 'stroke_steps'
                ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80 ring-1 ring-slate-900/5'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
            }`}
          >
            <ListOrdered className="w-4 h-4 text-rose-600" />
            <span>Urutan Coretan Lengkap (筆順)</span>
            {strokeData && strokeData.paths.length > 0 && (
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700">
                {strokeData.paths.length} Goresan
              </span>
            )}
          </button>
        </div>

        {/* Quick Audio for Current Character */}
        <button
          type="button"
          onClick={() =>
            soundManager.speak(
              selectedCard.furigana || selectedCard.kanji || selectedCard.japanese,
              speechRate
            )
          }
          className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer select-none active:scale-95"
          title="Dengarkan Suara Asli"
          aria-label="Dengarkan audio"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>

      {/* TAB CONTENT 1: URUTAN LANGKAH CORETAN LENGKAP (筆順) */}
      {activeTab === 'stroke_steps' ? (
        <div className="w-full flex flex-col items-center">
          <KanjiStrokeOrderViewer
            kanjiChar={selectedCard.japanese}
            reading={selectedCard.reading}
            meaningId={selectedCard.meaningId}
            strokesCount={selectedCard.strokes}
            speechRate={speechRate}
            onPracticeWriting={() => setActiveTab('canvas')}
          />
        </div>
      ) : (
        /* TAB CONTENT 2: KANVAS LATIHAN MENULIS DENGAN DIAGRAM CORETAN BERSIH */
        <div className="w-full flex flex-col lg:flex-row gap-6 items-start">
          {/* Left side: Authentic Canvas Pad & Step Diagram */}
          <div className="flex-1 w-full flex flex-col items-center">
            {/* Top Info Bar */}
            <div className="w-full max-w-[380px] flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                  {selectedCard.reading}
                </span>
                <span
                  className="text-xs text-slate-600 font-semibold truncate max-w-[180px]"
                  title={selectedCard.meaningId}
                >
                  {selectedCard.meaningId}
                </span>
              </div>

              {/* Toggle Ghost Guide */}
              <button
                type="button"
                onClick={() => setShowGuide((prev) => !prev)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer select-none ${
                  showGuide
                    ? 'bg-rose-100 text-rose-800 border border-rose-200'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
                title="Hidupkan/Matikan bayangan panduan huruf"
              >
                {showGuide ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                <span>{showGuide ? 'Bayangan: ON' : 'Bayangan: OFF'}</span>
              </button>
            </div>

            {/* CANVAS CONTAINER WITH CLEAN JAPANESE PRACTICE GRID (十字格) */}
            <div
              ref={containerRef}
              className="relative w-full aspect-square max-w-[340px] sm:max-w-[380px] bg-[#fffdfa] rounded-3xl border-2 border-slate-300 shadow-md overflow-hidden select-none touch-none"
            >
              {/* Authentic Cross Grid Lines */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Center Vertical Line */}
                <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-red-200/80" />
                {/* Center Horizontal Line */}
                <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-red-200/80" />
                {/* Diagonal Guidelines */}
                <svg
                  className="absolute inset-0 w-full h-full stroke-red-100/60"
                  strokeDasharray="4,4"
                >
                  <line x1="0" y1="0" x2="100%" y2="100%" />
                  <line x1="100%" y1="0" x2="0" y2="100%" />
                </svg>
              </div>

              {/* Clean Ghost Guide: Shows character paths with active stroke highlighted */}
              {showGuide && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
                  {strokeData && strokeData.paths.length > 0 ? (
                    <svg
                      viewBox="0 0 109 109"
                      className="w-full h-full p-6 sm:p-7 pointer-events-none select-none"
                      style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                    >
                      {strokeData.paths.map((path, idx) => {
                        const isCurrent = idx === activeStep - 1;
                        return (
                          <path
                            key={`guide-${path.id}`}
                            d={path.d}
                            fill="none"
                            stroke={isCurrent ? '#e11d48' : '#94a3b8'}
                            strokeWidth={isCurrent ? '5.5' : '4'}
                            opacity={isCurrent ? 0.9 : 0.25}
                          />
                        );
                      })}
                    </svg>
                  ) : (
                    <span className="font-jp text-[150px] sm:text-[180px] font-bold text-rose-500/18 leading-none">
                      {selectedCard.japanese}
                    </span>
                  )}
                </div>
              )}

              {/* Interactive Drawing Canvas */}
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="relative z-10 w-full h-full cursor-crosshair touch-none select-none"
              />
            </div>

            {/* Canvas Tools Toolbar (Warna, Kuas, Undo, Hapus) */}
            <div className="w-full max-w-[380px] mt-3 flex items-center justify-between gap-1.5 p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
              {/* Color buttons */}
              <div className="flex items-center gap-1.5">
                {[
                  { color: '#1e293b', label: 'Hitam' },
                  { color: '#e11d48', label: 'Merah' },
                  { color: '#4338ca', label: 'Biru' },
                ].map((c) => (
                  <button
                    key={c.color}
                    type="button"
                    onClick={() => setBrushColor(c.color)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform cursor-pointer flex items-center justify-center ${
                      brushColor === c.color
                        ? 'scale-115 ring-2 ring-offset-1 ring-slate-500'
                        : 'hover:scale-105 active:scale-95'
                    }`}
                    style={{ backgroundColor: c.color }}
                    title={c.label}
                    aria-label={`Pilih warna ${c.label}`}
                  />
                ))}
              </div>

              {/* Brush thickness */}
              <div className="flex items-center gap-1">
                {[
                  { size: 4, label: 'Halus' },
                  { size: 8, label: 'Sedang' },
                  { size: 14, label: 'Kuas' },
                ].map((s) => (
                  <button
                    key={s.size}
                    type="button"
                    onClick={() => setBrushWidth(s.size)}
                    className={`px-2.5 py-1.5 text-xs font-bold rounded-xl cursor-pointer transition-colors ${
                      brushWidth === s.size
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>

              {/* Action buttons (Undo & Clear) */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleUndo}
                  disabled={strokesHistory.length === 0}
                  className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-xl hover:bg-slate-100 cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                  title="Kembalikan coretan sebelumnya (Undo)"
                  aria-label="Undo goresan"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={clearCanvas}
                  className="px-3 py-1.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl cursor-pointer transition-colors min-h-[38px]"
                >
                  Hapus
                </button>
              </div>
            </div>

            {/* DIAGRAM URUTAN LANGKAH CORETAN (筆順 / HITSUJUN STRIP) */}
            {strokeData && strokeData.paths.length > 0 && (
              <div className="w-full max-w-[380px] bg-white rounded-2xl border border-slate-200 p-3 shadow-xs flex flex-col gap-2.5 mt-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span className="text-xs font-bold text-slate-900">
                      Urutan Coretan ({strokeData.paths.length} Langkah)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsAnimating(!isAnimating)}
                      className="flex items-center gap-1.5 px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold transition-all cursor-pointer select-none active:scale-95 border border-rose-200/60"
                      title="Putar animasi urutan coretan satu per satu"
                    >
                      {isAnimating ? (
                        <Pause className="w-3.5 h-3.5" />
                      ) : (
                        <Play className="w-3.5 h-3.5 fill-rose-600" />
                      )}
                      <span>{isAnimating ? 'Jeda' : 'Animasi'}</span>
                    </button>
                  </div>
                </div>

                {/* Horizontal Scrollable Step-by-Step Strip */}
                <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 scrollbar-thin">
                  {strokeData.paths.map((_, stepIdx) => {
                    const isStepActive = activeStep === stepIdx + 1;
                    return (
                      <button
                        key={`step-btn-${stepIdx}`}
                        type="button"
                        onClick={() => {
                          setIsAnimating(false);
                          setActiveStep(stepIdx + 1);
                        }}
                        className={`shrink-0 flex flex-col items-center gap-1 p-1 rounded-xl border transition-all cursor-pointer ${
                          isStepActive
                            ? 'bg-rose-50 border-rose-500 ring-2 ring-rose-500/20 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:border-rose-300'
                        }`}
                        title={`Coretan ke-${stepIdx + 1}`}
                      >
                        <div className="w-12 h-12 bg-white rounded-lg border border-slate-200/80 relative overflow-hidden flex items-center justify-center p-0.5">
                          <svg
                            viewBox="0 0 109 109"
                            className="w-full h-full"
                            style={{ strokeLinecap: 'round', strokeLinejoin: 'round' }}
                          >
                            <line
                              x1="54.5"
                              y1="0"
                              x2="54.5"
                              y2="109"
                              stroke="#fee2e2"
                              strokeDasharray="3,3"
                              strokeWidth="1.5"
                            />
                            <line
                              x1="0"
                              y1="54.5"
                              x2="109"
                              y2="54.5"
                              stroke="#fee2e2"
                              strokeDasharray="3,3"
                              strokeWidth="1.5"
                            />
                            {/* Past strokes */}
                            {strokeData.paths.slice(0, stepIdx).map((p, pIdx) => (
                              <path
                                key={`strip-p-${pIdx}`}
                                d={p.d}
                                fill="none"
                                stroke="#334155"
                                strokeWidth="4.5"
                              />
                            ))}
                            {/* Current active stroke */}
                            <path
                              d={strokeData.paths[stepIdx].d}
                              fill="none"
                              stroke="#e11d48"
                              strokeWidth="6"
                            />
                          </svg>
                        </div>
                        <span
                          className={`text-[10px] font-bold font-mono ${
                            isStepActive ? 'text-rose-600 font-extrabold' : 'text-slate-500'
                          }`}
                        >
                          {stepIdx + 1}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Description of active stroke */}
                <div className="flex items-center justify-between text-[11px] text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-xl border border-slate-200/80">
                  <div className="flex items-center gap-1.5 truncate">
                    <span className="w-4 h-4 rounded-full bg-rose-600 text-white flex items-center justify-center text-[9px] font-bold shrink-0">
                      {activeStep}
                    </span>
                    <span className="truncate font-medium">
                      {strokeData.paths[activeStep - 1]?.desc || `Goresan ke-${activeStep}`}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('stroke_steps')}
                    className="text-rose-600 hover:text-rose-700 font-bold shrink-0 ml-2 hover:underline cursor-pointer text-[11px]"
                  >
                    Panduan Lengkap &rarr;
                  </button>
                </div>
              </div>
            )}

            {/* Character Navigation */}
            <div className="w-full max-w-[380px] mt-3 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={handlePrev}
                className="flex-1 min-h-[42px] py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 active:bg-slate-100 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer select-none"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>
              <span className="text-xs font-bold text-slate-500 font-mono">
                {currentIndex >= 0 ? currentIndex + 1 : 1} / {filteredCards.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="flex-1 min-h-[42px] py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 active:bg-slate-100 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer select-none"
              >
                <span>Berikutnya</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right side: Complete Character Selector & Details */}
          <div className="w-full lg:w-96 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                  <PenTool className="w-4 h-4 text-rose-600" />
                  <span>Pilih Karakter untuk Ditulis</span>
                </h3>
                <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {filteredCards.length} karakter
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Pilih karakter untuk mengganti kanvas & melihat urutan coretan.
              </p>
            </div>

            {/* Category Tabs: Kanji, Hiragana, Katakana */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              {[
                { id: 'kanji', label: 'Kanji', count: kanjiData.length },
                { id: 'hiragana', label: 'Hiragana', count: hiraganaData.length },
                { id: 'katakana', label: 'Katakana', count: katakanaData.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setCharCategory(tab.id as any);
                    setLevelFilter('all');
                    setSearchQuery('');
                  }}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    charCategory === tab.id
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label} <span className="text-[10px] opacity-70">({tab.count})</span>
                </button>
              ))}
            </div>

            {/* Search and Level Filter */}
            <div className="flex flex-col gap-2">
              {/* Search Box */}
              <div className="relative w-full">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kanji, bacaan, atau arti..."
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600 rounded-md"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Level Filter for Kanji */}
              {charCategory === 'kanji' && (
                <div className="flex items-center gap-1.5">
                  {[
                    { id: 'all', label: 'Semua (335)' },
                    { id: 'N5', label: 'N5 (103)' },
                    { id: 'N4', label: 'N4 (100)' },
                    { id: 'N3', label: 'N3 (132)' },
                  ].map((lvl) => (
                    <button
                      key={lvl.id}
                      type="button"
                      onClick={() => setLevelFilter(lvl.id as any)}
                      className={`flex-1 py-1 text-center text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        levelFilter === lvl.id
                          ? 'bg-slate-900 text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Complete Character Grid (NO SLICE!) */}
            <div className="grid grid-cols-4 gap-2 max-h-64 sm:max-h-72 overflow-y-auto pr-1 scrollbar-thin">
              {filteredCards.length > 0 ? (
                filteredCards.map((card) => {
                  const isCurrent = card.id === selectedCard.id;
                  return (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => setSelectedCard(card)}
                      className={`p-2 rounded-xl text-center border transition-all cursor-pointer relative flex flex-col items-center justify-center ${
                        isCurrent
                          ? 'bg-rose-600 text-white border-rose-600 font-bold shadow-xs ring-2 ring-rose-600/30'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-rose-300 hover:bg-white'
                      }`}
                      title={`${card.japanese} (${card.reading}): ${card.meaningId}`}
                    >
                      <div className="font-jp text-xl leading-tight">{card.japanese}</div>
                      <div
                        className={`text-[9px] truncate max-w-full font-medium ${
                          isCurrent ? 'text-rose-100' : 'text-slate-400'
                        }`}
                      >
                        {card.reading}
                      </div>
                      {card.level && (
                        <span
                          className={`text-[8px] font-mono px-1 rounded absolute top-1 right-1 ${
                            isCurrent ? 'bg-rose-700 text-white' : 'bg-slate-200/80 text-slate-600'
                          }`}
                        >
                          {card.level}
                        </span>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="col-span-4 py-8 text-center text-xs text-slate-400">
                  Tidak ada karakter yang cocok dengan pencarian "{searchQuery}".
                </div>
              )}
            </div>

            {/* Selected Card Details Box */}
            <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100/80 text-xs space-y-2">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span className="font-jp text-2xl text-rose-700">{selectedCard.japanese}</span>
                <span className="text-slate-500 font-semibold">{selectedCard.reading}</span>
              </div>
              <p className="text-slate-700 font-medium">
                Arti: <strong>{selectedCard.meaningId}</strong>
              </p>

              {/* Stroke Order Hint & Rule */}
              <div className="p-2.5 bg-white rounded-xl border border-rose-200/60 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800 text-[11px] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-rose-600" /> Aturan Coretan:
                  </span>
                  <span className="font-mono text-[11px] font-bold text-rose-600">
                    {strokeData?.totalStrokes || selectedCard.strokes || 1} Goresan
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                  {detectedRule}
                </p>
              </div>

              {/* Button: Jump to Full Step-by-Step Animation */}
              <button
                type="button"
                onClick={() => setActiveTab('stroke_steps')}
                className="w-full py-2 px-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
              >
                <ListOrdered className="w-3.5 h-3.5" />
                <span>Buka Urutan Coretan & 9 Aturan Lengkap</span>
              </button>

              {selectedCard.mnemonic && (
                <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
                  💡 {selectedCard.mnemonic}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
