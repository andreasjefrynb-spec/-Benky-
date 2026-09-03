import React, { useState, useMemo } from 'react';
import { 
  Volume2, 
  Search, 
  X, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  BookOpen, 
  Sparkles,
  CheckCircle2,
  Star
} from 'lucide-react';
import { CardItem, UserItemProgress } from '../types';
import { soundManager } from '../utils/audio';

interface VocabGroupViewProps {
  cards: CardItem[];
  progress: Record<string, UserItemProgress>;
  speechRate: number;
  onStartFlashcard: (subCategory: string, level: 'all' | 'N5' | 'N4') => void;
  onToggleFavorite?: (cardId: string) => void;
}

interface GroupMeta {
  id: string;
  name: string;
  kanjiTitle: string;
  icon: string;
  desc: string;
}

const GROUP_METAS: Record<string, GroupMeta> = {
  kata_kerja: {
    id: 'kata_kerja',
    name: 'Kata Kerja',
    kanjiTitle: '動詞 (Doushi)',
    icon: '🏃‍♂️',
    desc: 'Aktivitas, gerak, transitif & intransitif esensial',
  },
  kata_sifat: {
    id: 'kata_sifat',
    name: 'Kata Sifat',
    kanjiTitle: '形容詞 (Keiyoushi)',
    icon: '✨',
    desc: 'Sifat-i (い) dan sifat-na (な) untuk deskripsi',
  },
  makanan: {
    id: 'makanan',
    name: 'Makanan & Minuman',
    kanjiTitle: '食べ物・飲み物',
    icon: '🍱',
    desc: 'Bahan masakan, bumbu, hidangan & minuman',
  },
  keluarga: {
    id: 'keluarga',
    name: 'Keluarga & Relasi',
    kanjiTitle: '家族・人間関係',
    icon: '👨‍👩‍👧',
    desc: 'Panggilan keluarga sendiri vs orang lain & sahabat',
  },
  angka_waktu: {
    id: 'angka_waktu',
    name: 'Waktu & Bilangan',
    kanjiTitle: '時間・数字',
    icon: '⏱️',
    desc: 'Jam, menit, hari, bulan, musim & satuan hitung',
  },
  tempat: {
    id: 'tempat',
    name: 'Tempat & Arah',
    kanjiTitle: '場所・方向',
    icon: '📍',
    desc: 'Fasilitas umum, gedung, kota & arah mata angin',
  },
  benda_rumah: {
    id: 'benda_rumah',
    name: 'Benda & Sehari-hari',
    kanjiTitle: '日用品・家具・衣類',
    icon: '🏠',
    desc: 'Perabot rumah tangga, pakaian & perkakas',
  },
  tubuh_kesehatan: {
    id: 'tubuh_kesehatan',
    name: 'Tubuh & Medis',
    kanjiTitle: '体・健康・病院',
    icon: '🏥',
    desc: 'Bagian tubuh, gejala sakit & perawatan kesehatan',
  },
  transportasi: {
    id: 'transportasi',
    name: 'Transportasi',
    kanjiTitle: '交通・乗り物',
    icon: '🚆',
    desc: 'Kereta, stasiun, jalan raya & kendaraan',
  },
  profesi_sekolah: {
    id: 'profesi_sekolah',
    name: 'Sekolah, Karir & Hobi',
    kanjiTitle: '学校・仕事・趣味',
    icon: '💼',
    desc: 'Pendidikan, pekerjaan, profesi & aktivitas luang',
  },
  alam_hewan: {
    id: 'alam_hewan',
    name: 'Alam, Cuaca & Hewan',
    kanjiTitle: '自然・天気・生き物',
    icon: '🌲',
    desc: 'Kondisi cuaca, fenomena alam & binatang peliharaan',
  },
  keterangan_fukushi: {
    id: 'keterangan_fukushi',
    name: 'Kata Keterangan',
    kanjiTitle: '副詞 (Fukushi)',
    icon: '💬',
    desc: 'Frekuensi, tingkat, kemungkinan & penghubung kalimat',
  },
  salam: {
    id: 'salam',
    name: 'Salam & Sapaan',
    kanjiTitle: '挨拶・日常表現',
    icon: '🌸',
    desc: 'Ungkapan sopan sehari-hari & etiket bertutur',
  },
};

export const VocabGroupView: React.FC<VocabGroupViewProps> = ({
  cards,
  progress,
  speechRate,
  onStartFlashcard,
  onToggleFavorite,
}) => {
  const [levelFilter, setLevelFilter] = useState<'all' | 'N5' | 'N4'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    kata_kerja: true,
    kata_sifat: true,
    makanan: true,
  });
  const [activeGroupShortcut, setActiveGroupShortcut] = useState<string>('all');

  // Filter cards based on Level & Search Query
  const filteredCards = useMemo(() => {
    return cards.filter((card) => {
      // Level filter
      if (levelFilter !== 'all' && card.level && card.level !== levelFilter) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchJp = card.japanese?.toLowerCase().includes(q);
        const matchKanji = card.kanji?.toLowerCase().includes(q);
        const matchReading = card.reading?.toLowerCase().includes(q);
        const matchFurigana = card.furigana?.toLowerCase().includes(q);
        const matchMeaning = card.meaningId?.toLowerCase().includes(q);
        if (!matchJp && !matchKanji && !matchReading && !matchFurigana && !matchMeaning) {
          return false;
        }
      }

      return true;
    });
  }, [cards, levelFilter, searchQuery]);

  // Group filtered cards by subCategory
  const groupedData = useMemo(() => {
    const map: Record<string, CardItem[]> = {};

    filteredCards.forEach((card) => {
      const sub = card.subCategory || 'lainnya';
      if (!map[sub]) {
        map[sub] = [];
      }
      map[sub].push(card);
    });

    // Sort groups matching defined keys first
    const definedKeys = Object.keys(GROUP_METAS);
    const existingKeys = Object.keys(map).sort((a, b) => {
      const idxA = definedKeys.indexOf(a);
      const idxB = definedKeys.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });

    return existingKeys.map((subKey) => ({
      key: subKey,
      meta: GROUP_METAS[subKey] || {
        id: subKey,
        name: subKey.replace('_', ' ').toUpperCase(),
        kanjiTitle: '単語',
        icon: '📚',
        desc: 'Kumpulan kosakata bahasa Jepang',
      },
      cards: map[subKey],
    }));
  }, [filteredCards]);

  const toggleGroupExpand = (groupKey: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [groupKey]: !prev[groupKey],
    }));
  };

  const expandAll = () => {
    const allExp: Record<string, boolean> = {};
    groupedData.forEach((g) => {
      allExp[g.key] = true;
    });
    setExpandedGroups(allExp);
  };

  const collapseAll = () => {
    setExpandedGroups({});
  };

  const playWordAudio = (text: string) => {
    soundManager.speak(text, speechRate);
  };

  // Group shortcut click
  const scrollToGroup = (groupKey: string) => {
    setActiveGroupShortcut(groupKey);
    if (groupKey === 'all') return;
    setExpandedGroups((prev) => ({ ...prev, [groupKey]: true }));
    const el = document.getElementById(`vocab-group-${groupKey}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Top Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs flex flex-col gap-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Kelompok Kosakata Bahasa Jepang
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Menampilkan <span className="font-bold text-slate-800">{filteredCards.length}</span> dari {cards.length} kata, terbagi dalam {groupedData.length} kelompok tematik
            </p>
          </div>

          {/* Level Filter (Semua, N5, N4) */}
          <div className="flex items-center bg-slate-100 p-1 rounded-2xl self-start md:self-auto border border-slate-200/60 shadow-2xs">
            <span className="text-xs font-bold text-slate-500 px-2.5">Level JLPT:</span>
            {(['all', 'N5', 'N4'] as const).map((lvl) => (
              <button
                key={lvl}
                id={`filter-level-${lvl}`}
                onClick={() => setLevelFilter(lvl)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                  levelFilter === lvl
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                {lvl === 'all' ? 'Semua Level' : lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Search & Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2 border-t border-slate-100">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kata (Kanji, Romaji, atau arti bahasa Indonesia)..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-400 focus:bg-white focus:border-rose-400 shadow-2xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            <button
              onClick={expandAll}
              className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Buka Semua
            </button>
            <button
              onClick={collapseAll}
              className="px-3 py-2 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Tutup Semua
            </button>
          </div>
        </div>

        {/* Group Shortcut Quick Jump Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          <button
            onClick={() => scrollToGroup('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeGroupShortcut === 'all'
                ? 'bg-slate-800 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Semua Kelompok
          </button>
          {groupedData.map((g) => (
            <button
              key={g.key}
              onClick={() => scrollToGroup(g.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeGroupShortcut === g.key
                  ? 'bg-rose-600 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{g.meta.icon}</span>
              <span>{g.meta.name}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 font-bold">
                {g.cards.length}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Empty Search Result */}
      {groupedData.length === 0 && (
        <div className="bg-white rounded-3xl p-12 border border-slate-200/80 text-center shadow-xs">
          <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            Tidak ada kata yang sesuai
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-6">
            Kata kunci "{searchQuery}" tidak ditemukan pada filter {levelFilter === 'all' ? 'semua level' : levelFilter}.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setLevelFilter('all');
            }}
            className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
          >
            Reset Pencarian & Filter
          </button>
        </div>
      )}

      {/* Group Sections List */}
      <div className="flex flex-col gap-6">
        {groupedData.map((group) => {
          const isExpanded = !!expandedGroups[group.key];
          const n5Count = group.cards.filter((c) => c.level === 'N5').length;
          const n4Count = group.cards.filter((c) => c.level === 'N4').length;

          return (
            <div
              key={group.key}
              id={`vocab-group-${group.key}`}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden transition-all"
            >
              {/* Group Header Card */}
              <div
                onClick={() => toggleGroupExpand(group.key)}
                className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors border-b border-slate-100"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-rose-50 text-2xl flex items-center justify-center shrink-0 border border-rose-100 shadow-2xs">
                    {group.meta.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base sm:text-lg font-black text-slate-900">
                        {group.meta.name}
                      </h3>
                      <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">
                        {group.meta.kanjiTitle}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {group.meta.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                  {/* Word Count Badges */}
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                    <span>{group.cards.length} kata</span>
                    {(n5Count > 0 || n4Count > 0) && (
                      <span className="text-[10px] text-slate-400 font-normal">
                        ({n5Count > 0 ? `N5: ${n5Count}` : ''}{n5Count > 0 && n4Count > 0 ? ', ' : ''}{n4Count > 0 ? `N4: ${n4Count}` : ''})
                      </span>
                    )}
                  </div>

                  {/* Practice Flashcard Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartFlashcard(group.key, levelFilter);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-all cursor-pointer"
                    title={`Latihan flashcard kelompok ${group.meta.name}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Latihan Kartu</span>
                  </button>

                  {/* Expand Toggle */}
                  <div className="p-1 text-slate-400 hover:text-slate-700 rounded-lg">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>

              {/* Group Body: List of Words */}
              {isExpanded && (
                <div className="p-4 sm:p-6 bg-slate-50/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {group.cards.map((card) => {
                      const itemProg = progress[card.id];
                      const isMastered = itemProg?.status === 'mastered';
                      const isFav = !!itemProg?.isFavorite;

                      return (
                        <div
                          key={card.id}
                          className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-2xs hover:shadow-sm hover:border-rose-200 transition-all flex flex-col justify-between gap-3 group"
                        >
                          {/* Card Top: Japanese & Level */}
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-japanese">
                                  {card.japanese}
                                </span>
                                {card.furigana && card.furigana !== card.reading && (
                                  <span className="text-xs text-rose-500 font-semibold">
                                    {card.furigana}
                                  </span>
                                )}
                              </div>
                              <div className="text-xs font-semibold text-slate-500 tracking-wide mt-0.5">
                                {card.reading}
                              </div>
                            </div>

                            <div className="flex items-center gap-1.5 shrink-0">
                              {card.level && (
                                <span
                                  className={`px-2 py-0.5 text-[10px] font-extrabold rounded-md ${
                                    card.level === 'N5'
                                      ? 'bg-sky-50 text-sky-700 border border-sky-200'
                                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  }`}
                                >
                                  {card.level}
                                </span>
                              )}
                              {isMastered && (
                                <span title="Sudah Hapal">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100" />
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Card Middle: Indonesian Meaning */}
                          <div className="pt-2 border-t border-slate-100">
                            <div className="text-xs sm:text-sm font-bold text-slate-800">
                              {card.meaningId}
                            </div>
                            {card.exampleJp && (
                              <div className="mt-1.5 p-2 bg-slate-50 rounded-xl text-[11px] text-slate-600 border border-slate-100">
                                <p className="font-medium text-slate-700">
                                  {card.exampleJp}
                                </p>
                                {card.exampleId && (
                                  <p className="text-slate-400 mt-0.5 text-[10px]">
                                    {card.exampleId}
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {/* Card Bottom: Audio Pronounce & Favorite */}
                          <div className="flex items-center justify-between pt-2">
                            <button
                              onClick={() => playWordAudio(card.japanese)}
                              className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Dengarkan pelafalan bahasa Jepang"
                            >
                              <Volume2 className="w-4 h-4" />
                              <span className="text-[11px]">Audio</span>
                            </button>

                            {onToggleFavorite && (
                              <button
                                onClick={() => onToggleFavorite(card.id)}
                                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                                  isFav
                                    ? 'text-amber-500 hover:text-amber-600 bg-amber-50'
                                    : 'text-slate-300 hover:text-slate-500 hover:bg-slate-50'
                                }`}
                                title={isFav ? 'Hapus dari favorit' : 'Tandai favorit'}
                              >
                                <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
