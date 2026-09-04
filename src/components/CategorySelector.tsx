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
  const categories: {
    id: MainCategory;
    title: string;
    sub: string;
    badge: string;
    icon: string;
  }[] = [
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
      sub: 'JLPT N5–N3',
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
      id: 'hiragana',
      title: 'Hiragana',
      sub: '46 Aksara Dasar',
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

  return (
    <div className="w-full py-1">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center gap-2.5 p-2.5 sm:p-3 rounded-2xl text-left border transition-all duration-200 cursor-pointer select-none ${
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
                className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-base transition-colors shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
                }`}
              >
                {cat.badge}
              </div>

              {/* Title & Sub */}
              <div className="min-w-0 flex-1 pr-6">
                <span className="block text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap leading-tight">
                  {cat.title}
                </span>
                <p
                  className={`text-[10px] truncate mt-0.5 leading-tight ${
                    isActive ? 'text-rose-100 font-medium' : 'text-slate-400'
                  }`}
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
