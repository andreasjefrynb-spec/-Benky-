import React, { useRef, useState, useEffect } from 'react';
import {
  RotateCcw,
  Volume2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  PenTool,
  CheckCircle,
} from 'lucide-react';
import { CardItem } from '../types';
import { soundManager } from '../utils/audio';

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
  const [selectedCard, setSelectedCard] = useState<CardItem>(
    initialCard || cards[0]
  );
  const [showGuide, setShowGuide] = useState(true);
  const [brushColor, setBrushColor] = useState('#1e293b'); // Sumi ink
  const [brushWidth, setBrushWidth] = useState(8);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [strokesHistory, setStrokesHistory] = useState<ImageData[]>([]);

  // Update selected card if initialCard changes
  useEffect(() => {
    if (initialCard) {
      setSelectedCard(initialCard);
    }
  }, [initialCard]);

  // Clear canvas whenever selected card changes
  useEffect(() => {
    clearCanvas();
  }, [selectedCard]);

  // Set up canvas resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set internal dimensions for sharp high-DPI displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const getCoordinates = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Save state before new stroke for Undo
    const currentState = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setStrokesHistory((prev) => [...prev.slice(-10), currentState]);

    setIsDrawing(true);
    const { x, y } = getCoordinates(e);

    ctx.beginPath();
    ctx.strokeStyle = brushColor;
    ctx.lineWidth = brushWidth;
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    e.preventDefault();
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

  const currentIndex = cards.findIndex((c) => c.id === selectedCard.id);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setSelectedCard(cards[currentIndex - 1]);
    } else {
      setSelectedCard(cards[cards.length - 1]);
    }
  };

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setSelectedCard(cards[currentIndex + 1]);
    } else {
      setSelectedCard(cards[0]);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col lg:flex-row gap-6 items-start">
      {/* Left side: Authentic Canvas Pad */}
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Top Info Bar */}
        <div className="w-full flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
              {selectedCard.reading}
            </span>
            <span className="text-xs text-slate-600 font-semibold truncate max-w-[160px]">
              {selectedCard.meaningId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => soundManager.speak(selectedCard.kanji || selectedCard.japanese, speechRate)}
              className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
              title="Dengarkan Suara"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowGuide((prev) => !prev)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                showGuide
                  ? 'bg-rose-100 text-rose-800 border border-rose-200'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
              title="Hidupkan/Matikan bayangan panduan huruf"
            >
              {showGuide ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{showGuide ? 'Panduan: ON' : 'Panduan: OFF'}</span>
            </button>
          </div>
        </div>

        {/* CANVAS CONTAINER WITH JAPANESE PRACTICE GRID (十字格) */}
        <div className="relative w-full aspect-square max-w-[360px] sm:max-w-[380px] bg-[#fffdfa] rounded-3xl border-2 border-slate-300 shadow-md overflow-hidden select-none touch-none">
          {/* Authentic Cross Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Center Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] border-l border-dashed border-red-200/80" />
            {/* Center Horizontal Line */}
            <div className="absolute top-1/2 left-0 right-0 h-[1px] border-t border-dashed border-red-200/80" />
            {/* Diagonal Guideline 1 */}
            <svg className="absolute inset-0 w-full h-full stroke-red-100/60" strokeDasharray="4,4">
              <line x1="0" y1="0" x2="100%" y2="100%" />
              <line x1="100%" y1="0" x2="0" y2="100%" />
            </svg>
          </div>

          {/* Ghost Guide Character (Watermark) */}
          {showGuide && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="font-jp text-[160px] sm:text-[180px] font-bold text-rose-500/18 leading-none">
                {selectedCard.japanese}
              </span>
            </div>
          )}

          {/* Interactive HTML5 Drawing Canvas */}
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="relative z-10 w-full h-full cursor-crosshair"
          />
        </div>

        {/* Canvas Tools Toolbar */}
        <div className="w-full max-w-[380px] mt-4 flex items-center justify-between gap-2 p-2 bg-white rounded-2xl border border-slate-200 shadow-xs">
          {/* Color buttons */}
          <div className="flex items-center gap-1.5">
            {[
              { color: '#1e293b', label: 'Hitam' },
              { color: '#e11d48', label: 'Merah' },
              { color: '#4338ca', label: 'Biru' },
            ].map((c) => (
              <button
                key={c.color}
                onClick={() => setBrushColor(c.color)}
                className={`w-6 h-6 rounded-full transition-transform cursor-pointer ${
                  brushColor === c.color ? 'scale-125 ring-2 ring-offset-1 ring-slate-400' : 'hover:scale-110'
                }`}
                style={{ backgroundColor: c.color }}
                title={c.label}
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
                onClick={() => setBrushWidth(s.size)}
                className={`px-2 py-1 text-[11px] font-bold rounded-md cursor-pointer transition-colors ${
                  brushWidth === s.size
                    ? 'bg-slate-800 text-white'
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
              onClick={handleUndo}
              disabled={strokesHistory.length === 0}
              className="p-2 text-slate-600 hover:text-slate-900 disabled:opacity-30 disabled:cursor-not-allowed rounded-lg hover:bg-slate-100 cursor-pointer"
              title="Kembalikan coretan sebelumnya (Undo)"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={clearCanvas}
              className="px-2.5 py-1 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
            >
              Hapus
            </button>
          </div>
        </div>

        {/* Character Navigation */}
        <div className="w-full max-w-[380px] mt-3 flex items-center justify-between gap-3">
          <button
            onClick={handlePrev}
            className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Sebelumnya</span>
          </button>
          <span className="text-xs font-semibold text-slate-500">
            {currentIndex + 1} / {cards.length}
          </span>
          <button
            onClick={handleNext}
            className="flex-1 py-2 px-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
          >
            <span>Berikutnya</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Right side: Quick Character Picker & Detail Panel */}
      <div className="w-full lg:w-72 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
            <PenTool className="w-4 h-4 text-rose-600" />
            <span>Pilih Karakter untuk Ditulis</span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Klik karakter untuk mengganti kanvas latihan.
          </p>
        </div>

        {/* Quick Character Carousel Grid */}
        <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto pr-1">
          {cards.slice(0, 40).map((card) => {
            const isCurrent = card.id === selectedCard.id;
            return (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card)}
                className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-rose-600 text-white border-rose-600 font-bold shadow-xs'
                    : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-rose-300'
                }`}
              >
                <div className="font-jp text-lg">{card.japanese}</div>
                <div
                  className={`text-[9px] ${
                    isCurrent ? 'text-rose-100' : 'text-slate-400'
                  }`}
                >
                  {card.reading}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Card Details */}
        <div className="p-3.5 bg-rose-50/50 rounded-2xl border border-rose-100/80 text-xs space-y-1.5">
          <div className="font-bold text-slate-900 flex items-center justify-between">
            <span className="font-jp text-base text-rose-700">{selectedCard.japanese}</span>
            <span className="text-slate-500">{selectedCard.reading}</span>
          </div>
          <p className="text-slate-700 font-medium">
            Arti: <strong>{selectedCard.meaningId}</strong>
          </p>
          {selectedCard.strokes && (
            <p className="text-[11px] text-slate-500">
              Jumlah Goresan: {selectedCard.strokes} langkah
            </p>
          )}
          {selectedCard.mnemonic && (
            <p className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200">
              💡 {selectedCard.mnemonic}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
