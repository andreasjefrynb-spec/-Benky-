import React, { useState } from 'react';
import { Volume2, CheckCircle2, Search, Sparkles, PenTool } from 'lucide-react';
import { CardItem, UserItemProgress, MainCategory } from '../types';
import { soundManager } from '../utils/audio';

interface CharacterChartProps {
  category: MainCategory; // 'hiragana' or 'katakana'
  cards: CardItem[];
  progress: Record<string, UserItemProgress>;
  speechRate: number;
  onPracticeWriting?: (item: CardItem) => void;
}

export const CharacterChart: React.FC<CharacterChartProps> = ({
  category,
  cards,
  progress,
  speechRate,
  onPracticeWriting,
}) => {
  const [tab, setTab] = useState<'gojuon' | 'dakuon' | 'yoon'>('gojuon');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter cards by tab and search
  const filteredCards = cards.filter((card) => {
    if (card.subCategory !== tab) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase().trim();
    return (
      card.japanese.includes(q) ||
      card.reading.toLowerCase().includes(q) ||
      card.meaningId.toLowerCase().includes(q)
    );
  });

  const title = category === 'hiragana' ? 'Bagan Hiragana Lengkap' : 'Bagan Katakana Lengkap';

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Header & Tabs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span>{title}</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200">
              {cards.length} Karakter
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Klik kartu untuk mendengarkan audio pelafalan secara langsung.
          </p>
        </div>

        {/* Sub-tabs */}
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
          <button
            id="tab-gojuon"
            onClick={() => setTab('gojuon')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none text-center ${
              tab === 'gojuon'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dasar (Gojūon)
          </button>
          <button
            id="tab-dakuon"
            onClick={() => setTab('dakuon')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none text-center ${
              tab === 'dakuon'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Tenten &amp; Maru (Dakuon)
          </button>
          <button
            id="tab-yoon"
            onClick={() => setTab('yoon')}
            className={`flex-1 sm:flex-none px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none text-center ${
              tab === 'yoon'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Gabungan (Yōon)
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari karakter atau romaji (contoh: ka, shi, ま)..."
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Grid of Characters */}
      {filteredCards.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <p className="text-slate-500 text-sm">
            Tidak ada karakter yang cocok dengan kata pencarian "{searchQuery}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {filteredCards.map((item) => {
            const isMastered = progress[item.id]?.status === 'mastered';

            return (
              <div
                key={item.id}
                id={`char-card-${item.id}`}
                onClick={() => soundManager.speak(item.japanese, speechRate)}
                className={`group relative bg-white p-4 rounded-2xl border transition-all duration-150 flex flex-col justify-between cursor-pointer hover:shadow-md hover:-translate-y-0.5 ${
                  isMastered
                    ? 'border-emerald-200/90 bg-gradient-to-b from-white to-emerald-50/20'
                    : 'border-slate-200 hover:border-rose-300'
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                    {item.reading}
                  </span>

                  <div className="flex items-center gap-1">
                    {isMastered && (
                      <CheckCircle2
                        className="w-4 h-4 text-emerald-500"
                        title="Sudah dihapal"
                      />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speak(item.japanese, speechRate);
                      }}
                      className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Putar Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Center Character */}
                <div className="my-3 text-center">
                  <span className="font-jp text-4xl sm:text-5xl font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                    {item.japanese}
                  </span>
                </div>

                {/* Bottom Example & Practice */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 truncate max-w-[120px]" title={item.exampleJp || ''}>
                    {item.exampleJp || item.meaningId}
                  </span>

                  {onPracticeWriting && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onPracticeWriting(item);
                      }}
                      className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
                      title="Latihan Menulis Huruf Ini"
                    >
                      <PenTool className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
