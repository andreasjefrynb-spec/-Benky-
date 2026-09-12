import React, { useRef, useEffect, useState } from 'react';
import { MainCategory } from '../types';
import { LayoutGrid, ChevronDown, ChevronUp } from 'lucide-react';

interface CategorySelectorProps {
  activeCategory: MainCategory;
  onSelectCategory: (cat: MainCategory) => void;
  counts: Record<MainCategory, number>;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
}) => {
  const [isGridExpandedOnMobile, setIsGridExpandedOnMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const categories: {
    id: MainCategory;
    title: string;
    sub: string;
    badge: string;
    icon: string;
  }[] = [
    {
      id: 'minna',
      title: 'Minna Bab 1–50',
      sub: 'Shokyu I & II',
      badge: '本',
      icon: '📚',
    },
    {
      id: 'irodori',
      title: 'Irodori Can-Do',
      sub: 'Starter & A2',
      badge: '彩',
      icon: '🎨',
    },
    {
      id: 'ssw',
      title: 'Materi SSW',
      sub: '12 Sektor Tokutei',
      badge: '技',
      icon: '👷',
    },
    {
      id: 'kanji',
      title: 'Kanji',
      sub: 'Aksara N5–N3',
      badge: '漢',
      icon: '㊗️',
    },
    {
      id: 'vocab',
      title: 'Kosakata',
      sub: '1.500+ N5–N3',
      badge: '語',
      icon: '📖',
    },
    {
      id: 'phrases',
      title: 'Frasa & Pola',
      sub: 'Percakapan N5–N3',
      badge: '話',
      icon: '💬',
    },
    {
      id: 'particles',
      title: 'Partikel',
      sub: 'Tata Bahasa 助詞',
      badge: '助',
      icon: '📎',
    },
    {
      id: 'conjugation',
      title: 'Konjugasi',
      sub: '14 Bentuk, Lagu ~Te & Drill',
      badge: '活',
      icon: '🔄',
    },
    {
      id: 'hiragana',
      title: 'Hiragana',
      sub: '46 Karakter Dasar',
      badge: 'あ',
      icon: '🌸',
    },
    {
      id: 'katakana',
      title: 'Katakana',
      sub: '46 Kata Serapan',
      badge: 'ア',
      icon: '⚡',
    },
    {
      id: 'custom',
      title: 'Kartu Saya',
      sub: 'Catatan Kustom',
      badge: '私',
      icon: '✍️',
    },
  ];

  // Auto-scroll the active category button into view on mobile
  useEffect(() => {
    if (scrollContainerRef.current) {
      const activeEl = scrollContainerRef.current.querySelector(
        `#cat-scroll-btn-${activeCategory}`
      ) as HTMLElement | null;
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center',
        });
      }
    }
  }, [activeCategory]);

  return (
    <div className="w-full flex flex-col gap-2">
      {/* Mobile Header Bar with category label & quick expand toggle */}
      <div className="flex sm:hidden items-center justify-between px-1">
        <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
          Kategori Belajar
        </span>
        <button
          onClick={() => setIsGridExpandedOnMobile(!isGridExpandedOnMobile)}
          className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1 py-0.5 px-2 rounded-lg bg-rose-50/70 border border-rose-200/60 cursor-pointer select-none"
          title="Buka semua kategori dalam bentuk kotak"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{isGridExpandedOnMobile ? 'Tampilan Baris' : 'Semua (11)'}</span>
          {isGridExpandedOnMobile ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>
      </div>

      {/* MOBILE: Single-Row Scrollable Chips (when not expanded) */}
      <div
        ref={scrollContainerRef}
        className={`sm:hidden ${
          isGridExpandedOnMobile
            ? 'grid grid-cols-2 gap-2'
            : 'flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-0.5'
        }`}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] || 0;

          if (isGridExpandedOnMobile) {
            return (
              <button
                key={cat.id}
                id={`cat-grid-btn-${cat.id}`}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setIsGridExpandedOnMobile(false);
                }}
                className={`flex items-center gap-2.5 p-2.5 rounded-2xl text-left border transition-all cursor-pointer select-none min-h-[52px] active:scale-98 ${
                  isActive
                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200/60 ring-2 ring-rose-400'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-rose-50 text-rose-600'
                  }`}
                >
                  {cat.badge}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <span className="block text-xs font-bold truncate">{cat.title}</span>
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded-md font-bold shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {count}
                    </span>
                  </div>
                  <p
                    className={`text-[10px] truncate ${
                      isActive ? 'text-rose-100' : 'text-slate-400'
                    }`}
                  >
                    {cat.sub}
                  </p>
                </div>
              </button>
            );
          }

          return (
            <button
              key={cat.id}
              id={`cat-scroll-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer select-none shrink-0 min-h-[42px] border active:scale-95 ${
                isActive
                  ? 'bg-rose-600 text-white border-rose-600 shadow-sm shadow-rose-300 ring-2 ring-rose-300 ring-offset-1'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
              }`}
            >
              <span className="text-sm shrink-0">{cat.icon}</span>
              <span>{cat.title}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-full font-mono font-bold leading-none ${
                  isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-500'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* DESKTOP (PC): Clean, Compact 6-Column Grid */}
      <div className="hidden sm:grid sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-pc-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center gap-2.5 p-2.5 rounded-2xl text-left border transition-all duration-150 cursor-pointer select-none min-h-[54px] active:scale-[0.98] ${
                isActive
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200/70 ring-2 ring-rose-400 ring-offset-1'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-rose-200 hover:bg-rose-50/25 shadow-2xs'
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm transition-colors shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
                }`}
              >
                {cat.badge}
              </div>

              {/* Title & Sub */}
              <div className="min-w-0 flex-1 pr-4">
                <span className="block text-xs font-bold tracking-tight truncate leading-tight">
                  {cat.title}
                </span>
                <p
                  className={`text-[10px] mt-0.5 leading-tight truncate ${
                    isActive ? 'text-rose-100 font-medium' : 'text-slate-400'
                  }`}
                  title={cat.sub}
                >
                  {cat.sub}
                </p>
              </div>

              {/* Count in top right */}
              <span
                className={`absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-md font-bold font-mono leading-none ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-rose-700'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
