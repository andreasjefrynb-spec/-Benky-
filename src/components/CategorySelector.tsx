import React from 'react';
import { MainCategory } from '../types';

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
  const [filterGroup, setFilterGroup] = React.useState<'all' | 'curriculum' | 'foundation'>('all');

  const categories: {
    id: MainCategory;
    title: string;
    sub: string;
    badge: string;
    icon: string;
    group: 'curriculum' | 'foundation';
  }[] = [
    {
      id: 'minna',
      title: 'Minna Bab 1–50',
      sub: 'Shokyu I & II (N5–N4)',
      badge: '本',
      icon: '📚',
      group: 'curriculum',
    },
    {
      id: 'irodori',
      title: 'Irodori Can-Do',
      sub: 'Starter & A2 Hidup',
      badge: '彩',
      icon: '🎨',
      group: 'curriculum',
    },
    {
      id: 'ssw',
      title: 'Materi SSW',
      sub: '12 Sektor Tokutei Ginou',
      badge: '技',
      icon: '👷',
      group: 'curriculum',
    },
    {
      id: 'kanji',
      title: 'Kanji',
      sub: 'Aksara N5–N3',
      badge: '漢',
      icon: '㊗️',
      group: 'foundation',
    },
    {
      id: 'vocab',
      title: 'Kosakata',
      sub: 'JLPT N5–N3',
      badge: '語',
      icon: '📖',
      group: 'foundation',
    },
    {
      id: 'phrases',
      title: 'Frasa & Pola',
      sub: 'Percakapan N5–N3',
      badge: '話',
      icon: '💬',
      group: 'foundation',
    },
    {
      id: 'particles',
      title: 'Partikel',
      sub: 'Tata Bahasa 助詞',
      badge: '助',
      icon: '📎',
      group: 'foundation',
    },
    {
      id: 'conjugation',
      title: 'Konjugasi',
      sub: 'Perubahan Bentuk',
      badge: '活',
      icon: '🔄',
      group: 'foundation',
    },
    {
      id: 'hiragana',
      title: 'Hiragana',
      sub: '46 Aksara Dasar',
      badge: 'あ',
      icon: '🌸',
      group: 'foundation',
    },
    {
      id: 'katakana',
      title: 'Katakana',
      sub: '46 Kata Serapan',
      badge: 'ア',
      icon: '⚡',
      group: 'foundation',
    },
    {
      id: 'custom',
      title: 'Kartu Saya',
      sub: 'Catatan Kustom',
      badge: '私',
      icon: '✍️',
      group: 'foundation',
    },
  ];

  const filteredCategories = categories.filter((c) => {
    if (filterGroup === 'curriculum') return c.group === 'curriculum';
    if (filterGroup === 'foundation') return c.group === 'foundation';
    return true;
  });

  return (
    <div className="w-full flex flex-col gap-2.5 py-1">
      {/* Group Pills Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5 select-none">
        <button
          onClick={() => setFilterGroup('all')}
          className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
            filterGroup === 'all'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
          }`}
        >
          Semua Materi ({categories.length})
        </button>
        <button
          onClick={() => setFilterGroup('curriculum')}
          className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterGroup === 'curriculum'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
          }`}
        >
          <span>🎯 Kurikulum &amp; SSW</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20">3</span>
        </button>
        <button
          onClick={() => setFilterGroup('foundation')}
          className={`min-h-[36px] px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            filterGroup === 'foundation'
              ? 'bg-rose-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200/80'
          }`}
        >
          <span>🌸 Pondasi &amp; JLPT</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-white/20">8</span>
        </button>
      </div>

      {/* Grid Categories */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-2.5">
        {filteredCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer select-none min-h-[56px] active:scale-[0.98] ${
                isActive
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200/70 ring-2 ring-rose-400 ring-offset-1'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-rose-200 hover:bg-rose-50/30'
              }`}
            >
              {/* Count Badge in top-right corner */}
              <span
                className={`absolute top-2 right-2 text-[10px] px-1.5 py-0.5 rounded-md font-extrabold leading-none ${
                  isActive
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 text-slate-600 group-hover:bg-rose-100 group-hover:text-rose-700'
                }`}
              >
                {count}
              </span>

              {/* Badge Icon */}
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center font-bold text-sm sm:text-base transition-colors shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
                }`}
              >
                {cat.badge}
              </div>

              {/* Title & Sub */}
              <div className="min-w-0 flex-1 pr-4 sm:pr-5">
                <span className="block text-xs sm:text-sm font-bold tracking-tight truncate leading-tight">
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
            </button>
          );
        })}
      </div>
    </div>
  );
};
