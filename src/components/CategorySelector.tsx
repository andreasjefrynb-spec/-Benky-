import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MainCategory } from '../types';
import { RoadmapModal } from './RoadmapModal';
import {
  ChevronDown,
  ChevronUp,
  Sparkles,
  Check,
  X,
  Compass,
  PlusCircle,
  GraduationCap,
  Award,
  BookCheck,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface CategorySelectorProps {
  activeCategory: MainCategory;
  onSelectCategory: (cat: MainCategory) => void;
  counts: Record<MainCategory, number>;
  onOpenAddCustom?: () => void;
  isRoadmapOpen?: boolean;
  setIsRoadmapOpen?: (open: boolean) => void;
}

interface CategoryDef {
  id: MainCategory;
  title: string;
  sub: string;
  badge: string;
  icon: string;
  categoryGroup: string;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  activeCategory,
  onSelectCategory,
  counts,
  onOpenAddCustom,
  isRoadmapOpen,
  setIsRoadmapOpen,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [internalRoadmapModal, setInternalRoadmapModal] = useState<boolean>(false);
  const showRoadmapModal = isRoadmapOpen !== undefined ? isRoadmapOpen : internalRoadmapModal;
  const setShowRoadmapModal = setIsRoadmapOpen || setInternalRoadmapModal;
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleGroup = (groupName: string) => {
    setCollapsedGroups(prev => ({
      ...prev,
      [groupName]: !prev[groupName]
    }));
  };

  const categories: CategoryDef[] = [
    // --- 0. BERANDA BELAJAR ---
    {
      id: 'home',
      title: 'Beranda Belajar (Portal Utama)',
      sub: 'Dashboard Santai, Inspirasi Hari Ini & Jalur Kelulusan',
      badge: '本',
      icon: '⛩️',
      categoryGroup: '0. Beranda Utama',
    },

    // --- 1. LULUS JFT-BASIC & KERJA JEPANG (SSW TOKUTEI GINOU) ---
    {
      id: 'irodori',
      title: 'Praktis Can-Do JFT (A1–A2)',
      sub: 'Situasi Percakapan Nyata di Jepang & Standar Ujian JFT-Basic',
      badge: '彩',
      icon: '🎨',
      categoryGroup: '1. Persiapan JFT-Basic (A2) & Kerja Jepang (SSW)',
    },
    {
      id: 'ssw',
      title: 'Materi Kerja SSW Tokutei Ginou',
      sub: '12 Sektor Kerja Resmi: Kaigo, Gaishoku, Manufaktur, Konstruksi, dll.',
      badge: '技',
      icon: '👷',
      categoryGroup: '1. Persiapan JFT-Basic (A2) & Kerja Jepang (SSW)',
    },

    // --- 2. FONDASI JLPT N5 – N4 & MINNA NO NIHONGO ---
    {
      id: 'minna',
      title: 'Kurikulum Minna no Nihongo',
      sub: 'Bab 1–50 Shokyu + Chuukyu, Pola Kalimat & Latihan',
      badge: '初',
      icon: '🔰',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },
    {
      id: 'vocab',
      title: 'Kosakata & Idiom (N5–N3)',
      sub: 'Kosakata Tematik, Nuansa & Penutur Asli',
      badge: '語',
      icon: '📖',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },
    {
      id: 'kanji',
      title: 'Kanji (N5–N3) & Stroke Order',
      sub: 'Animasi Coretan, Mnemonic & Latihan Menulis',
      badge: '漢',
      icon: '㊗️',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },
    {
      id: 'particles',
      title: 'Partikel Tata Bahasa 助詞',
      sub: '20 Partikel Kunci Ujian: は, が, を, に, で, と, へ, dll.',
      badge: '助',
      icon: '📎',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },
    {
      id: 'conjugation',
      title: 'Konjugasi Kata Kerja & Sifat',
      sub: '14 Bentuk: ~Te, Kamus, ~Nai, ~Ta, Masu, Ba, Maksud, dll.',
      badge: '活',
      icon: '🔄',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },
    {
      id: 'hiragana',
      title: 'Huruf Hiragana',
      sub: '46 Karakter Dasar, Dakuon & Yoon',
      badge: 'あ',
      icon: '🌸',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },
    {
      id: 'katakana',
      title: 'Huruf Katakana',
      sub: '46 Huruf Serapan Kata Asing & Aturan Baca',
      badge: 'ア',
      icon: '⚡',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },
    {
      id: 'search',
      title: 'Cari Kata & Terjemahan AI',
      sub: 'Kamus Instan & Mesin Terjemahan Suara Cepat',
      badge: '索',
      icon: '🔍',
      categoryGroup: '2. Fondasi JLPT N5 – N4 & Pelajaran Dasar',
    },

    // --- 3. SPESIALIS LULUS UJIAN JLPT N3 (BUKU RESMI & DRILL) ---
    {
      id: 'tryjlpt',
      title: 'TRY! JLPT N3 Tata Bahasa',
      sub: 'Pola Ujian Resmi, Cerita Kontekstual & Soal Drill',
      badge: '試',
      icon: '🎯',
      categoryGroup: '3. Spesialis Lulus Ujian JLPT N3',
    },
    {
      id: 'soumatome',
      title: 'Nihongo Sou-matome N3',
      sub: 'Target 6 Minggu Lulus Bunpou, Kanji & Kosakata',
      badge: '総',
      icon: '📅',
      categoryGroup: '3. Spesialis Lulus Ujian JLPT N3',
    },
    {
      id: 'shinkanzen',
      title: 'Shin Kanzen Master N3',
      sub: 'Bank Soal Jebakan, Perbedaan Nuansa & Analisis Presisi',
      badge: '完',
      icon: '🏆',
      categoryGroup: '3. Spesialis Lulus Ujian JLPT N3',
    },
    {
      id: 'phrases',
      title: 'Tata Bahasa & Pola Kalimat N3',
      sub: 'Pola Tematik, Nuansa, Perbedaan & Drill Ujian',
      badge: '文',
      icon: '🏛️',
      categoryGroup: '3. Spesialis Lulus Ujian JLPT N3',
    },

    // --- 4. TINGKAT LANJUT JLPT N3 – N1 (TOBIRA, QUARTET, DOKKAI, CHOUKAI) ---
    {
      id: 'tobira',
      title: 'Tobira: Gateway to Advanced (N3–N2)',
      sub: 'Bahasa Otentik, Budaya & Teks Wacana Menengah Menuju Mahir',
      badge: '扉',
      icon: '🚪',
      categoryGroup: '4. Tingkat Lanjut JLPT N3 – N1',
    },
    {
      id: 'quartet',
      title: 'Quartet Intermediate (N3–N2)',
      sub: 'Integrasi 4 Keterampilan: Membaca, Menulis, Menyimak, Berbicara',
      badge: '四',
      icon: '🎻',
      categoryGroup: '4. Tingkat Lanjut JLPT N3 – N1',
    },
    {
      id: 'dokkai',
      title: 'Membaca & Wacana Dokkai (N1–N3)',
      sub: 'Editorial Berita Asahi, Analisis Argumen & Pemahaman Logika',
      badge: '読',
      icon: '📰',
      categoryGroup: '4. Tingkat Lanjut JLPT N3 – N1',
    },
    {
      id: 'choukai',
      title: 'Menyimak & Listening Choukai (N1–N3)',
      sub: 'Respon Cepat (Sokkai Outou), Dialog Nyata & Pengumuman',
      badge: '聴',
      icon: '🎧',
      categoryGroup: '4. Tingkat Lanjut JLPT N3 – N1',
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

  const featuredQuickCategories: { id: MainCategory; shortTitle: string; icon: string }[] = [
    { id: 'home', shortTitle: 'Beranda', icon: '⛩️' },
    { id: 'minna', shortTitle: 'Bab 1–50 (Minna)', icon: '🔰' },
    { id: 'irodori', shortTitle: 'JFT A1-A2 Can-Do', icon: '🎨' },
    { id: 'ssw', shortTitle: 'SSW Kerja Jepang', icon: '👷' },
    { id: 'tryjlpt', shortTitle: 'TRY! JLPT N3', icon: '🎯' },
    { id: 'soumatome', shortTitle: 'Sou-matome N3', icon: '📅' },
    { id: 'shinkanzen', shortTitle: 'Shin Kanzen N3', icon: '🏆' },
    { id: 'tobira', shortTitle: 'Tobira (N3-N2)', icon: '🚪' },
    { id: 'quartet', shortTitle: 'Quartet (N3-N2)', icon: '🎻' },
    { id: 'vocab', shortTitle: 'Kosakata (N5–N3)', icon: '📖' },
    { id: 'kanji', shortTitle: 'Kanji (N5–N3)', icon: '㊗️' },
    { id: 'phrases', shortTitle: 'Tata Bahasa N3', icon: '🏛️' },
    { id: 'particles', shortTitle: 'Partikel', icon: '📎' },
    { id: 'conjugation', shortTitle: 'Konjugasi', icon: '🔄' },
    { id: 'dokkai', shortTitle: 'Dokkai N1-N3', icon: '📰' },
    { id: 'choukai', shortTitle: 'Choukai N1-N3', icon: '🎧' },
    { id: 'search', shortTitle: 'Cari & Terjemah', icon: '🔍' },
  ];

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

      {/* Quick Category Chips Strip */}
      <div className="mt-2.5 flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 select-none -mx-0.5 px-0.5">
        {featuredQuickCategories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-1.5 transition-all cursor-pointer shrink-0 active:scale-95 ${
                isActive
                  ? 'bg-rose-600 text-white shadow-xs scale-[1.02]'
                  : 'bg-white text-slate-700 hover:bg-rose-50/50 hover:text-rose-600 border border-slate-200/90 shadow-3xs'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.shortTitle}</span>
            </button>
          );
        })}
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
                      Pilih materi di bawah atau cek panduan roadmap kelulusan
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                  <button
                    onClick={() => setShowRoadmapModal(true)}
                    className="px-2.5 py-1 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Buka panduan urutan belajar agar lulus ujian JFT & JLPT"
                  >
                    <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                    <span className="hidden sm:inline">Roadmap Lulus JFT &amp; JLPT</span>
                    <span className="sm:hidden">Roadmap</span>
                  </button>
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
                            const count = cat.id === 'search' ? 'Cari' : (counts[cat.id] || 0);

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
                <button
                  onClick={() => setShowRoadmapModal(true)}
                  className="font-bold text-[11px] text-rose-600 hover:text-rose-700 underline cursor-pointer"
                >
                  Panduan Lulus JFT &amp; JLPT &rarr;
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* MODAL PANDUAN ROADMAP KELULUSAN JFT & JLPT                                 */}
      {/* ========================================================================= */}
      <RoadmapModal
        isOpen={showRoadmapModal}
        onClose={() => setShowRoadmapModal(false)}
        onSelectCategory={(cat) => {
          setShowRoadmapModal(false);
          setIsOpen(false);
          onSelectCategory(cat);
        }}
      />
    </div>
  );
};
