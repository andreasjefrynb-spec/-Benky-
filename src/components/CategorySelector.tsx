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
      title: 'Kanji N5/N4',
      sub: 'Aksara N5 & N4',
      badge: '漢',
      icon: '㊗️',
    },
    {
      id: 'vocab',
      title: 'Kosakata',
      sub: 'JLPT N5/N4',
      badge: '語',
      icon: '📖',
    },
    {
      id: 'phrases',
      title: 'Frasa N5/N4',
      sub: 'Percakapan Harian',
      badge: '話',
      icon: '💬',
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
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex items-center gap-2.5 min-w-max pb-1">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          const count = counts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-left border transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200 ring-2 ring-rose-300 ring-offset-1'
                  : 'bg-white text-slate-700 border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/40'
              }`}
            >
              {/* Badge Icon */}
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
                }`}
              >
                {cat.badge}
              </div>

              {/* Title & Count */}
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold tracking-tight">
                    {cat.title}
                  </span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                      isActive
                        ? 'bg-white/30 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {count}
                  </span>
                </div>
                <p
                  className={`text-[10px] ${
                    isActive ? 'text-rose-100' : 'text-slate-400'
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
