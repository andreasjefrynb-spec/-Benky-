import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MainCategory } from '../types';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  X,
  Compass,
  PlusCircle,
} from 'lucide-react';

interface CategorySelectorProps {
  activeCategory: MainCategory;
  onSelectCategory: (cat: MainCategory) => void;
  counts: Record<MainCategory, number>;
  onOpenAddCustom?: () => void;
}

interface CategoryDef {
  id: MainCategory;
  title: string;
  sub: string;
  badge: string;
  icon: string;
  categoryGroup?: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
  onOpenAddCustom,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({
    'Tingkat Menengah (N3)': true, // Hidden by default as requested
  });
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const categories: CategoryDef[] = [
    // --- TINGKAT DASAR (N5 – N4) ---
    {
      id: 'vocab',
      title: 'Kosakata & Idiom (N5–N3)',
      sub: 'Kosakata Tematik & Penutur Asli',
      badge: '語',
      icon: '📖',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'kanji',
      title: 'Kanji (N5–N3)',
      sub: 'Stroke Order & Latihan Menulis',
      badge: '漢',
      icon: '㊗️',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'minna',
      title: 'Pelajaran Dasar (N5–N4)',
      sub: '50 Bab Utama Shokyu & Latihan',
      badge: '初',
      icon: '🔰',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'hiragana',
      title: 'Hiragana',
      sub: '46 Karakter Dasar & Variasi',
      badge: 'あ',
      icon: '🌸',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'katakana',
      title: 'Katakana',
      sub: '46 Kata Serapan & Variasi',
      badge: 'ア',
      icon: '⚡',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'particles',
      title: 'Partikel Dasar',
      sub: 'Tata Bahasa 助詞 (20 Partikel)',
      badge: '助',
      icon: '📎',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'conjugation',
      title: 'Konjugasi Kata Kerja',
      sub: '14 Bentuk, Lagu ~Te & Drill',
      badge: '活',
      icon: '🔄',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'irodori',
      title: 'Praktis Can-Do (A1–A2)',
      sub: 'Percakapan Situasi Nyata',
      badge: '彩',
      icon: '🎨',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },
    {
      id: 'ssw',
      title: 'Materi Kerja SSW',
      sub: '12 Sektor Tokutei Ginou',
      badge: '技',
      icon: '👷',
      categoryGroup: 'Tingkat Dasar (N5 – N4)',
    },

    // --- TINGKAT MENENGAH (N3) ---
    {
      id: 'phrases',
      title: 'Tata Bahasa & Pola (N3)',
      sub: 'Pola Tematik, Nuansa & Drill Ujian',
      badge: '文',
      icon: '🏛️',
      categoryGroup: 'Tingkat Menengah (N3)',
    },
    {
      id: 'dokkai',
      title: 'Membaca & Wacana (N3)',
      sub: 'Wacana Budaya, Artikel & Bacaan Menengah',
      badge: '読',
      icon: '📰',
      categoryGroup: 'Tingkat Menengah (N3)',
    },
    {
      id: 'choukai',
      title: 'Menyimak & Dialog (N3)',
      sub: 'Percakapan Nyata, Situasi & Respon',
      badge: '聴',
      icon: '🎧',
      categoryGroup: 'Tingkat Menengah (N3)',
    },
  ];

  // Find currently active category object
  const currentCategory =
    categories.find((c) => c.id === activeCategory) || categories[0];

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (id: MainCategory) => {
    onSelectCategory(id);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className="w-full relative select-none">
      {/* ========================================================================= */}
      {/* TOMBOL UTAMA: "MAU BELAJAR APA"                                           */}
      {/* Sembunyikan semua menu pelajaran di dalam tombol ini                      */}
      {/* ========================================================================= */}
      <div
        id="btn-mau-belajar-apa"
        onClick={() => setIsOpen((prev) => !prev)}
        className={`w-full p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl border-2 transition-all duration-200 cursor-pointer flex items-center justify-between gap-3 shadow-2xs ${
          isOpen
            ? 'bg-rose-50/70 border-rose-500 ring-2 ring-rose-200/70'
            : 'bg-white border-slate-200/90 hover:border-rose-300 hover:bg-slate-50/60'
        }`}
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Tombol Mau Belajar Apa - Pilih Materi Pelajaran"
      >
        {/* Left Side: Label "Mau Belajar Apa" & Active Lesson Badge */}
        <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
          <div
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-sm sm:text-base shrink-0 transition-colors shadow-2xs ${
              isOpen
                ? 'bg-rose-600 text-white'
                : 'bg-rose-50 text-rose-600 border border-rose-200'
            }`}
          >
            {currentCategory.badge}
          </div>

          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1">
                <Compass className="w-3 h-3 text-rose-500" />
                <span>Mau Belajar Apa</span>
              </span>
              <span className="text-slate-300 hidden sm:inline">&bull;</span>
              <span className="text-[10px] sm:text-xs font-medium text-slate-400 hidden sm:inline">
                Klik untuk ganti pelajaran
              </span>
            </div>

            {/* Currently Active Lesson Name */}
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-sm sm:text-base font-extrabold text-slate-900 truncate">
                {currentCategory.icon} {currentCategory.title}
              </span>
              <span className="text-[10px] sm:text-xs text-slate-500 font-medium truncate hidden md:inline">
                ({currentCategory.sub})
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Toggle Arrow */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center transition-all ${
              isOpen
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {isOpen ? (
              <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            ) : (
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            )}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MENU PELAJARAN (TERSEMBUNYI - HANYA MUNCUL SAAT TOMBOL DIKETUK)          */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile closing */}
            <div
              className="sm:hidden fixed inset-0 bg-slate-900/40 z-40 backdrop-blur-2xs"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
              className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-3xl border-2 border-slate-200 shadow-2xl overflow-hidden p-3.5 sm:p-5 max-h-[80vh] sm:max-h-[600px] flex flex-col"
            >
              {/* Menu Header inside Dropdown */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-xs shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm sm:text-base font-black text-slate-900 truncate">
                      Mau Belajar Apa Hari Ini?
                    </h4>
                    <p className="text-[11px] text-slate-500 truncate hidden xs:block">
                      Pilih salah satu menu pelajaran di bawah untuk mulai belajar
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer transition-colors"
                    title="Tutup Menu"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Grouped Lessons */}
              <div className="overflow-y-auto pr-1 flex flex-col gap-4">
                {Object.entries(
                  categories.reduce<Record<string, CategoryDef[]>>((acc, cat) => {
                    if (!acc[cat.categoryGroup]) acc[cat.categoryGroup] = [];
                    acc[cat.categoryGroup].push(cat);
                    return acc;
                  }, {})
                ).map(([groupName, groupCats]) => {
                  const isCollapsed = !!collapsedGroups[groupName];
                  return (
                    <div key={groupName} className="flex flex-col gap-2">
                      <div 
                        onClick={() => toggleGroup(groupName)}
                        className="flex items-center gap-2 px-1 cursor-pointer select-none group/hdr py-1"
                      >
                        <span className={`text-[11px] font-black uppercase tracking-wider ${
                          groupName.includes('Mahir')
                            ? 'text-indigo-600'
                            : groupName.includes('Dasar')
                            ? 'text-emerald-700'
                            : 'text-slate-500'
                        } group-hover/hdr:text-rose-600 transition-colors`}>
                          {groupName} ({groupCats.length})
                        </span>
                        <div className="h-px flex-1 bg-slate-100 group-hover/hdr:bg-rose-200 transition-colors" />
                        <span className="text-xs font-bold text-slate-400 group-hover/hdr:text-rose-600">
                          {isCollapsed ? '▼ Buka' : '▲ Tutup'}
                        </span>
                      </div>

                      {!isCollapsed && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                          {groupCats.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            const count = counts[cat.id] || 0;

                            return (
                              <button
                                key={cat.id}
                                id={`menu-item-${cat.id}`}
                                onClick={() => handleSelect(cat.id)}
                                className={`group relative flex items-center gap-3 p-3 rounded-2xl text-left border transition-all duration-150 cursor-pointer select-none active:scale-[0.98] ${
                                  isActive
                                    ? 'bg-rose-600 text-white border-rose-600 shadow-md shadow-rose-200/70 ring-2 ring-rose-300'
                                    : 'bg-white text-slate-700 border-slate-200/90 hover:border-rose-300 hover:bg-rose-50/30'
                                }`}
                              >
                                {/* Kanji Badge */}
                                <div
                                  className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 transition-colors ${
                                    isActive
                                      ? 'bg-white/20 text-white'
                                      : 'bg-rose-50 text-rose-600 group-hover:bg-rose-100'
                                  }`}
                                >
                                  {cat.badge}
                                </div>

                                {/* Info */}
                                <div className="min-w-0 flex-1 pr-6">
                                  <div className="flex items-center gap-1.5">
                                    <span className="text-xs shrink-0">{cat.icon}</span>
                                    <span className="text-xs sm:text-sm font-bold truncate">
                                      {cat.title}
                                    </span>
                                  </div>
                                  <p
                                    className={`text-[11px] truncate mt-0.5 ${
                                      isActive ? 'text-rose-100' : 'text-slate-400'
                                    }`}
                                  >
                                    {cat.sub}
                                  </p>
                                </div>

                                {/* Right indicator: checkmark if active, else count */}
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                                  {cat.id === 'custom' && onOpenAddCustom && (
                                    <span
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsOpen(false);
                                        onSelectCategory('custom');
                                        onOpenAddCustom();
                                      }}
                                      className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border transition-colors ${
                                        isActive
                                          ? 'bg-white text-rose-700 border-white hover:bg-rose-50'
                                          : 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                                      }`}
                                      title="Buat kartu baru sekarang"
                                    >
                                      + Tambah
                                    </span>
                                  )}
                                  {isActive ? (
                                    <div className="w-5 h-5 rounded-full bg-white/25 flex items-center justify-center text-white">
                                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                                    </div>
                                  ) : (
                                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-500 group-hover:bg-rose-100 group-hover:text-rose-700">
                                      {count}
                                    </span>
                                  )}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Quick Help Tip */}
              <div className="pt-2 mt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>💡 Tip: Menu akan otomatis tertutup setelah memilih materi pelajaran.</span>
                <span className="font-mono text-[10px] text-slate-500 font-semibold">{categories.length} Modul Lengkap (N5–N3)</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
