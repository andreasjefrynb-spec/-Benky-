import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Search,
  X,
  Layers,
  BookOpen,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  ChevronRight,
  ArrowLeft,
  LayoutGrid,
  List,
  Filter,
  Eye,
  EyeOff,
  Check,
  Bookmark,
  Star,
} from 'lucide-react';
import { CardItem, UserItemProgress, LevelFilterOption } from '../types';
import { soundManager } from '../utils/audio';
import { WordConjugationModal } from './WordConjugationModal';
import { getQuickConjugationForms } from '../utils/japaneseConjugator';
import { getWordClassification } from '../utils/wordClassifier';
import { getClarifiedMeaning, hasClarificationDetails } from '../utils/meaningClarifier';

export interface VocabGroupViewProps {
  cards: CardItem[];
  progress: Record<string, UserItemProgress>;
  speechRate: number;
  onStartFlashcard: (subCategory: string, level: LevelFilterOption) => void;
  onStartQuiz?: (subCategory: string, level: LevelFilterOption) => void;
  onToggleFavorite?: (cardId: string) => void;
}

export interface GroupMeta {
  id: string;
  name: string;
  kanjiTitle: string;
  icon: string;
  desc: string;
  cluster: 'tata_bahasa' | 'kehidupan' | 'masyarakat' | 'alam_manusia' | 'tingkat_mahir_native';
  color: string;
}

export const GROUP_CLUSTERS = [
  {
    id: 'tata_bahasa',
    title: 'Tata Bahasa & Pondasi Inti',
    sub: 'Kata kerja, sifat, dan keterangan pokok',
    icon: '⚡',
  },
  {
    id: 'tingkat_mahir_native',
    title: 'Idiom & Ungkapan Penutur Asli',
    sub: 'Yojijukugo (四字熟語), Idiom tubuh (慣用句), Bisnis & Percakapan Alami',
    icon: '⛩️',
  },
  {
    id: 'kehidupan',
    title: 'Aktivitas & Kehidupan Sehari-hari',
    sub: 'Makanan, perabotan rumah, etiket dan salam',
    icon: '🍜',
  },
  {
    id: 'masyarakat',
    title: 'Masyarakat, Tempat & Karier',
    sub: 'Tempat, transportasi, sekolah, kerja & keluarga',
    icon: '🏙️',
  },
  {
    id: 'alam_manusia',
    title: 'Waktu, Tubuh & Alam Sekitar',
    sub: 'Waktu, angka, anatomi, kesehatan & cuaca',
    icon: '🌿',
  },
] as const;

export const GROUP_METAS: Record<string, GroupMeta> = {
  kata_kerja: {
    id: 'kata_kerja',
    name: 'Kata Kerja',
    kanjiTitle: '動詞 (Doushi)',
    icon: '🏃',
    desc: 'Aktivitas, gerak, transitif & intransitif pokok',
    cluster: 'tata_bahasa',
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 text-blue-800',
  },
  kata_sifat: {
    id: 'kata_sifat',
    name: 'Kata Sifat',
    kanjiTitle: '形容詞 (Keiyoushi)',
    icon: '✨',
    desc: 'Sifat-i (い) dan sifat-na (な) deskriptif',
    cluster: 'tata_bahasa',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-800',
  },
  keterangan_fukushi: {
    id: 'keterangan_fukushi',
    name: 'Kata Keterangan',
    kanjiTitle: '副詞 (Fukushi)',
    icon: '💬',
    desc: 'Frekuensi, intensitas, kemungkinan & penghubung',
    cluster: 'tata_bahasa',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-800',
  },
  makanan: {
    id: 'makanan',
    name: 'Makanan & Minuman',
    kanjiTitle: '食べ物・飲み物',
    icon: '🍱',
    desc: 'Hidangan, bahan masakan, rasa & minuman',
    cluster: 'kehidupan',
    color: 'from-rose-500/10 to-orange-500/10 border-rose-200 text-rose-800',
  },
  benda_rumah: {
    id: 'benda_rumah',
    name: 'Benda & Rumah',
    kanjiTitle: '日用品・家具・衣類',
    icon: '🏠',
    desc: 'Perabot rumah tangga, pakaian & perlengkapan',
    cluster: 'kehidupan',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 text-emerald-800',
  },
  salam: {
    id: 'salam',
    name: 'Salam & Sapaan',
    kanjiTitle: '挨拶・日常表現',
    icon: '🌸',
    desc: 'Ungkapan santun sehari-hari & etiket bertutur',
    cluster: 'kehidupan',
    color: 'from-pink-500/10 to-rose-500/10 border-pink-200 text-pink-800',
  },
  tempat: {
    id: 'tempat',
    name: 'Tempat & Arah',
    kanjiTitle: '場所・方向',
    icon: '📍',
    desc: 'Fasilitas umum, bangunan, kota & arah mata angin',
    cluster: 'masyarakat',
    color: 'from-sky-500/10 to-cyan-500/10 border-sky-200 text-sky-800',
  },
  transportasi: {
    id: 'transportasi',
    name: 'Transportasi',
    kanjiTitle: '交通・乗り物',
    icon: '🚆',
    desc: 'Stasiun, kereta, jalan raya & armada kendaraan',
    cluster: 'masyarakat',
    color: 'from-cyan-500/10 to-blue-500/10 border-cyan-200 text-cyan-800',
  },
  profesi_sekolah: {
    id: 'profesi_sekolah',
    name: 'Sekolah & Karier',
    kanjiTitle: '学校・仕事・趣味',
    icon: '💼',
    desc: 'Pendidikan, mata pelajaran, profesi & kegemaran',
    cluster: 'masyarakat',
    color: 'from-violet-500/10 to-purple-500/10 border-violet-200 text-violet-800',
  },
  keluarga: {
    id: 'keluarga',
    name: 'Keluarga & Teman',
    kanjiTitle: '家族・人間関係',
    icon: '👨‍👩‍👧',
    desc: 'Sebutan keluarga sendiri vs orang lain & sahabat',
    cluster: 'masyarakat',
    color: 'from-amber-500/10 to-yellow-500/10 border-amber-200 text-amber-800',
  },
  angka_waktu: {
    id: 'angka_waktu',
    name: 'Waktu & Bilangan',
    kanjiTitle: '時間・数字',
    icon: '⏱️',
    desc: 'Jam, menit, tanggal, bulan, musim & satuan hitung',
    cluster: 'alam_manusia',
    color: 'from-teal-500/10 to-emerald-500/10 border-teal-200 text-teal-800',
  },
  tubuh_kesehatan: {
    id: 'tubuh_kesehatan',
    name: 'Tubuh & Medis',
    kanjiTitle: '体・健康・病院',
    icon: '🏥',
    desc: 'Bagian anatomi, keluhan sakit & istilah medis',
    cluster: 'alam_manusia',
    color: 'from-red-500/10 to-rose-500/10 border-red-200 text-red-800',
  },
  alam_hewan: {
    id: 'alam_hewan',
    name: 'Alam & Hewan',
    kanjiTitle: '自然・天気・生き物',
    icon: '🌲',
    desc: 'Cuaca, fenomena alam, binatang & tumbuhan',
    cluster: 'alam_manusia',
    color: 'from-lime-500/10 to-emerald-500/10 border-lime-200 text-lime-800',
  },
  yojijukugo: {
    id: 'yojijukugo',
    name: 'Yojijukugo (Idiom 4 Kanji)',
    kanjiTitle: '四字熟語',
    icon: '📜',
    desc: 'Idiom 4 kanji khas orang Jepang (一期一会, 以心伝心, 臨機応変, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-amber-600/10 to-rose-600/10 border-amber-300 text-amber-900',
  },
  kanyouku: {
    id: 'kanyouku',
    name: 'Kanyouku (Idiom Percakapan)',
    kanjiTitle: '慣用句 (Kanyouku)',
    icon: '🗣️',
    desc: 'Idiom bagian tubuh & rasa penutur asli (気が置けない, 匙を投げる, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-emerald-600/10 to-teal-600/10 border-emerald-300 text-emerald-900',
  },
  kotowaza: {
    id: 'kotowaza',
    name: 'Kotowaza (Peribahasa Jepang)',
    kanjiTitle: 'ことわざ (諺)',
    icon: '🎋',
    desc: 'Peribahasa & falsafah hidup tradisional Jepang (猿も木から落ちる, 継続は力なり, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-teal-600/10 to-emerald-600/10 border-teal-300 text-teal-900',
  },
  onomatope: {
    id: 'onomatope',
    name: 'Onomatope & Gitaigo Penutur Asli',
    kanjiTitle: 'オノマトペ・擬態語',
    icon: '✨',
    desc: 'Tiruan bunyi & keadaan rasa penutur asli (ぺこぺこ, ぎりぎり, ぐっすり, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-rose-600/10 to-pink-600/10 border-rose-300 text-rose-900',
  },
  bisnis_formal: {
    id: 'bisnis_formal',
    name: 'Bisnis & Formal',
    kanjiTitle: 'ビジネス・社会',
    icon: '🏛️',
    desc: 'Istilah koran, kontrak kerja, etika & etiket profesional',
    cluster: 'tingkat_mahir_native',
    color: 'from-blue-600/10 to-cyan-600/10 border-blue-300 text-blue-900',
  },
  abstrak_akademik: {
    id: 'abstrak_akademik',
    name: 'Abstrak & Opini Kritis',
    kanjiTitle: '抽象概念・論説',
    icon: '🧠',
    desc: 'Kosakata tematik wacana, opini publik & diskusi',
    cluster: 'tingkat_mahir_native',
    color: 'from-purple-600/10 to-indigo-600/10 border-purple-300 text-purple-900',
  },
};

export const VocabGroupView: React.FC<VocabGroupViewProps> = ({
  cards,
  progress,
  speechRate,
  onStartFlashcard,
  onStartQuiz,
  onToggleFavorite,
}) => {
  // Navigation State: 'catalog' (showing thematic bento cards) or selected group key (e.g. 'kata_kerja' or 'all')
  const [selectedGroupKey, setSelectedGroupKey] = useState<string>('catalog');
  const [levelFilter, setLevelFilter] = useState<LevelFilterOption>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('grid');
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [onlyClarified, setOnlyClarified] = useState<boolean>(false);
  const [selectedConjugationCard, setSelectedConjugationCard] = useState<CardItem | null>(null);

  // Group cards by subCategory
  const allGroupedMap = useMemo(() => {
    const map: Record<string, CardItem[]> = {};
    cards.forEach((card) => {
      const sub = card.subCategory || 'lainnya';
      if (!map[sub]) {
        map[sub] = [];
      }
      map[sub].push(card);
    });
    return map;
  }, [cards]);

  // Defined groups list with metadata
  const groupsList = useMemo(() => {
    const definedKeys = Object.keys(GROUP_METAS);
    return definedKeys.map((key) => {
      const meta = GROUP_METAS[key];
      const groupCards = allGroupedMap[key] || [];
      const masteredCount = groupCards.filter(
        (c) => progress[c.id]?.status === 'mastered'
      ).length;
      const n5Count = groupCards.filter((c) => c.level === 'N5').length;
      const n4Count = groupCards.filter((c) => c.level === 'N4').length;
      const n3Count = groupCards.filter((c) => c.level === 'N3').length;

      return {
        key,
        meta,
        cards: groupCards,
        totalCount: groupCards.length,
        masteredCount,
        percentMastered:
          groupCards.length > 0
            ? Math.round((masteredCount / groupCards.length) * 100)
            : 0,
        n5Count,
        n4Count,
        n3Count,
      };
    });
  }, [allGroupedMap, progress]);

  // Selected Group Details (if inside a specific group or 'all')
  const currentActiveGroup = useMemo(() => {
    if (selectedGroupKey === 'catalog') return null;
    if (selectedGroupKey === 'all') {
      return {
        key: 'all',
        meta: {
          id: 'all',
          name: 'Semua Kelompok Kosakata',
          kanjiTitle: '全単語',
          icon: '📚',
          desc: 'Koleksi lengkap seluruh 1.500+ kosakata bahasa Jepang N5–N3',
          cluster: 'tata_bahasa' as const,
          color: 'from-slate-100 to-slate-200 border-slate-300 text-slate-800',
        },
        cards,
      };
    }
    return groupsList.find((g) => g.key === selectedGroupKey) || null;
  }, [selectedGroupKey, groupsList, cards]);

  // Filtered Cards within the selected view
  const displayCards = useMemo(() => {
    const baseCards = currentActiveGroup ? currentActiveGroup.cards : cards;

    return baseCards.filter((card) => {
      // Level Filter
      if (levelFilter !== 'all' && card.level && card.level !== levelFilter) {
        return false;
      }

      // Status Filter
      if (statusFilter !== 'all') {
        const isMastered = progress[card.id]?.status === 'mastered';
        if (statusFilter === 'mastered' && !isMastered) return false;
        if (statusFilter === 'unmastered' && isMastered) return false;
      }

      // Anti-Bingung / Clarification Filter
      if (onlyClarified && !hasClarificationDetails(card)) {
        return false;
      }

      // Search Filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const clarified = getClarifiedMeaning(card);
        const matchJp = card.japanese?.toLowerCase().includes(q);
        const matchKanji = card.kanji?.toLowerCase().includes(q);
        const matchReading = card.reading?.toLowerCase().includes(q);
        const matchFurigana = card.furigana?.toLowerCase().includes(q);
        const matchMeaning = card.meaningId?.toLowerCase().includes(q);
        const matchClarified =
          clarified.primaryMeaning.toLowerCase().includes(q) ||
          (clarified.contextBadge && clarified.contextBadge.text.toLowerCase().includes(q)) ||
          (clarified.secondaryMeanings && clarified.secondaryMeanings.some((m) => m.toLowerCase().includes(q)));

        if (!matchJp && !matchKanji && !matchReading && !matchFurigana && !matchMeaning && !matchClarified) {
          return false;
        }
      }

      return true;
    });
  }, [currentActiveGroup, cards, levelFilter, statusFilter, onlyClarified, searchQuery, progress]);

  // Audio helper
  const handlePlayAudio = (text: string, reading?: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* ========================================================================= */}
      {/* HEADER UTAMA: KATALOG KELOMPOK KOSAKATA                                  */}
      {/* ========================================================================= */}
      {selectedGroupKey === 'catalog' ? (
        <div className="space-y-6">
          {/* Hero Banner Katalog */}
          <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-200/90 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-100">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Katalog Kelompok Kosakata
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 max-w-xl">
                  Pilih salah satu tema kelompok di bawah untuk mempelajari kosakata secara terarah, atau buka semua kelompok sekaligus.
                </p>
              </div>

              {/* Action: Buka Semua Kelompok Sekaligus */}
              <button
                onClick={() => setSelectedGroupKey('all')}
                className="self-start md:self-auto px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95 shrink-0"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Lihat Semua ({cards.length} Kata)</span>
              </button>
            </div>
          </div>

          {/* 4 Klaster Tematik Rapi */}
          <div className="space-y-6">
            {GROUP_CLUSTERS.map((cluster) => {
              const clusterGroups = groupsList.filter(
                (g) => g.meta.cluster === cluster.id
              );

              return (
                <div key={cluster.id} className="space-y-3">
                  {/* Cluster Heading */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cluster.icon}</span>
                      <h3 className="text-base font-black text-slate-800">
                        {cluster.title}
                      </h3>
                      <span className="text-xs text-slate-400 hidden sm:inline">
                        &bull; {cluster.sub}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 font-mono">
                      {clusterGroups.reduce((acc, g) => acc + g.totalCount, 0)} kata
                    </span>
                  </div>

                  {/* Grid Cards of Groups in this Cluster */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {clusterGroups.map((group) => (
                      <div
                        key={group.key}
                        onClick={() => setSelectedGroupKey(group.key)}
                        className="group bg-white rounded-2xl sm:rounded-3xl border-2 border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between gap-4 cursor-pointer select-none active:scale-[0.99]"
                      >
                        {/* Top: Icon, Titles & Kanji */}
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs shrink-0">
                                {group.meta.icon}
                              </div>
                              <div>
                                <h4 className="text-base font-black text-slate-900 group-hover:text-rose-600 transition-colors">
                                  {group.meta.name}
                                </h4>
                                <span className="text-xs font-bold text-slate-500 font-jp">
                                  {group.meta.kanjiTitle}
                                </span>
                              </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                          </div>

                          <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                            {group.meta.desc}
                          </p>
                        </div>

                        {/* Bottom: Counts, Progress & Action */}
                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          {/* Level Pills */}
                          <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono font-bold">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                              {group.totalCount} kata
                            </span>
                            {group.n5Count > 0 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-sky-50 text-sky-700 border border-sky-200/60">
                                N5: {group.n5Count}
                              </span>
                            )}
                            {group.n4Count > 0 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                                N4: {group.n4Count}
                              </span>
                            )}
                            {group.n3Count > 0 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-700 border border-purple-200/60">
                                N3: {group.n3Count}
                              </span>
                            )}
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="text-slate-400">Tingkat Hafal</span>
                              <span className="text-slate-700 font-mono">
                                {group.masteredCount}/{group.totalCount} ({group.percentMastered}%)
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full transition-all"
                                style={{ width: `${group.percentMastered}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* TAMPILAN FOKUS KELOMPOK KOSAKATA (EKSPLORASI KATA RAPI)                   */
        /* ========================================================================= */
        <div className="space-y-4 sm:space-y-5">
          {/* Navigation Bar: Tombol Kembali & Ganti Kelompok Cepat */}
          <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Back to Catalog Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedGroupKey('catalog')}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Katalog Kelompok</span>
                </button>

                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl">{currentActiveGroup?.meta.icon}</span>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 truncate">
                      {currentActiveGroup?.meta.name}
                    </h2>
                    <p className="text-xs text-slate-500 truncate">
                      {currentActiveGroup?.meta.kanjiTitle} &bull; {displayCards.length} kata ditampilkan
                    </p>
                  </div>
                </div>
              </div>

              {/* Group Quick Dropdown Selector */}
              <div className="flex items-center gap-2 self-end md:self-auto">
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">Pindah Kelompok:</span>
                <select
                  value={selectedGroupKey}
                  onChange={(e) => setSelectedGroupKey(e.target.value)}
                  aria-label="Pilih Kelompok Kosakata"
                  className="text-xs font-bold bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">📚 Semua Kelompok ({cards.length})</option>
                  {groupsList.map((g) => (
                    <option key={g.key} value={g.key}>
                      {g.meta.icon} {g.meta.name} ({g.totalCount})
                    </option>
                  ))}
                </select>

                {/* Practice Buttons */}
                <button
                  onClick={() => onStartFlashcard(selectedGroupKey, levelFilter)}
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all shrink-0"
                  title="Mulai Latihan Flashcard Kelompok Ini"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Flashcard</span>
                </button>

                {onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(selectedGroupKey, levelFilter)}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all shrink-0"
                    title="Mulai Kuis Kelompok Ini"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Kuis</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kata (Kanji, Romaji, atau arti bahasa Indonesia)..."
                  className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white focus:border-rose-400"
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

              {/* Filters (Level, Status, View Mode) */}
              <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-between md:justify-end">
                {/* Level Filter */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
                  {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        levelFilter === lvl
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {lvl === 'all' ? 'Semua' : lvl}
                    </button>
                  ))}
                </div>

                {/* Furigana Toggle */}
                <button
                  onClick={() => setShowFurigana((prev) => !prev)}
                  className={`p-1.5 rounded-xl border text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors ${
                    showFurigana
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}
                  title={showFurigana ? 'Sembunyikan Furigana' : 'Tampilkan Furigana'}
                >
                  {showFurigana ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">Furigana</span>
                </button>

                {/* Anti-Bingung Toggle */}
                <button
                  onClick={() => setOnlyClarified((prev) => !prev)}
                  className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all ${
                    onlyClarified
                      ? 'bg-amber-100 text-amber-900 border-amber-300 shadow-2xs'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
                  }`}
                  title={onlyClarified ? 'Klik untuk menampilkan semua kata' : 'Saring kata-kata yang rawan tertukar / memiliki pembeda konteks & partikel khusus'}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${onlyClarified ? 'text-amber-700' : 'text-slate-400'}`} />
                  <span>Anti-Bingung</span>
                </button>

                {/* Grid vs Table Toggle */}
                <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
                  <button
                    onClick={() => setDisplayMode('grid')}
                    className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                      displayMode === 'grid'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Tampilan Kotak Kartu"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDisplayMode('table')}
                    className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                      displayMode === 'table'
                        ? 'bg-white text-slate-900 shadow-2xs'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title="Tampilan Daftar / Tabel Rapi"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* DAFTAR KOSAKATA (GRID ATAU TABEL)                                        */}
          {/* ========================================================================= */}
          {displayCards.length === 0 ? (
            <div className="bg-white rounded-3xl p-10 border border-slate-200/90 text-center shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-800">
                Tidak ada kata yang sesuai
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Kata kunci &ldquo;{searchQuery}&rdquo; tidak ditemukan pada filter level yang dipilih.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLevelFilter('all');
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : displayMode === 'grid' ? (
            /* ========================================================================= */
            /* VIEW 1: GRID KARTU KOSAKATA TERATUR                                      */
            /* ========================================================================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {displayCards.map((card) => {
                const itemProg = progress[card.id];
                const isMastered = itemProg?.status === 'mastered';
                const isFav = !!itemProg?.isFavorite;
                const wordClass = getWordClassification(card);
                const quickForms = getQuickConjugationForms(card);

                return (
                  <div
                    key={`${card.id}-${card.japanese}`}
                    className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:border-rose-300 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group relative"
                  >
                    {/* Card Top: Word & Kanji */}
                    <div className="space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-jp">
                              {card.japanese}
                            </span>
                            {showFurigana && card.furigana && card.furigana !== card.reading && (
                              <span className="text-xs text-rose-500 font-bold font-jp">
                                {card.furigana}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-mono font-medium text-slate-500">
                            {card.reading}
                          </div>
                        </div>

                        {/* Level Badge & Mastery */}
                        <div className="flex items-center gap-1 shrink-0">
                          {card.level && (
                            <span
                              className={`px-2 py-0.5 text-[10px] font-black rounded-md border ${
                                card.level === 'N5'
                                  ? 'bg-sky-50 text-sky-700 border-sky-200'
                                  : card.level === 'N4'
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                  : card.level === 'N3'
                                  ? 'bg-purple-50 text-purple-700 border-purple-200'
                                  : card.level === 'N2'
                                  ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                  : 'bg-rose-50 text-rose-700 border-rose-200 font-black'
                              }`}
                            >
                              {card.level}
                            </span>
                          )}
                          {isMastered && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                          )}
                          {onToggleFavorite && (
                            <button
                              onClick={() => onToggleFavorite(card.id)}
                              className="p-1 text-slate-300 hover:text-amber-500 transition-colors cursor-pointer"
                              title={isFav ? 'Hapus dari favorit' : 'Simpan favorit'}
                            >
                              <Star
                                className={`w-3.5 h-3.5 ${
                                  isFav ? 'fill-amber-400 text-amber-400' : ''
                                }`}
                              />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Word Classification Badge */}
                      <div className="pt-1 flex items-center gap-1.5 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${wordClass.badgeClass}`}>
                          <span>{wordClass.icon}</span>
                          <span>{wordClass.shortLabel}</span>
                        </span>
                      </div>
                    </div>

                    {/* Indonesian Meaning & Quick Conjugation */}
                    {(() => {
                      const clarified = getClarifiedMeaning(card);
                      return (
                        <div className="pt-2 border-t border-slate-100 space-y-2">
                          <div className="space-y-1">
                            <div className="flex items-start justify-between gap-1.5 flex-wrap">
                              <span className="text-xs sm:text-sm font-extrabold text-slate-800 leading-snug">
                                {clarified.primaryMeaning}
                              </span>
                              {clarified.contextBadge && (
                                <span
                                  className={`inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-extrabold border shrink-0 ${
                                    clarified.contextBadge.variant === 'intransitive'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                      : clarified.contextBadge.variant === 'transitive'
                                      ? 'bg-sky-50 text-sky-800 border-sky-200'
                                      : 'bg-amber-50 text-amber-800 border-amber-200'
                                  }`}
                                >
                                  {clarified.contextBadge.text}
                                </span>
                              )}
                            </div>

                            {/* Particle Hint if available */}
                            {clarified.particleHint && (
                              <div className="text-[10px] font-semibold text-indigo-700 flex items-center gap-1">
                                <span className="text-[9px] px-1 py-0.2 bg-indigo-50 text-indigo-800 rounded font-mono">Partikel:</span>
                                <span className="font-jp">{clarified.particleHint}</span>
                              </div>
                            )}

                            {/* Anti-Bingung note if present */}
                            {clarified.contrastPair && (
                              <div className="text-[10px] bg-amber-50/80 border border-amber-200/70 rounded-lg p-1.5 text-amber-900 leading-tight">
                                <span className="font-extrabold text-amber-950">💡 Bedakan dgn: </span>
                                <span className="font-jp font-bold">{clarified.contrastPair.word}</span>
                                <span> ({clarified.contrastPair.reading}) — {clarified.contrastPair.difference}</span>
                              </div>
                            )}
                          </div>

                      {/* Quick Conjugation Snapshot (Masu, Te, Nai, Ta) */}
                      {quickForms && (
                        <div
                          onClick={() => setSelectedConjugationCard(card)}
                          className="bg-indigo-50/70 hover:bg-indigo-50 border border-indigo-100/90 rounded-xl p-2 cursor-pointer transition-colors group/quick"
                          title="Klik untuk membuka 14+ bentuk perubahan lengkap"
                        >
                          <div className="flex items-center justify-between text-[10px] font-extrabold text-indigo-900 mb-1">
                            <span className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-indigo-600" />
                              <span>Perubahan Bentuk:</span>
                            </span>
                            <span className="text-[9px] text-indigo-600 font-bold group-hover/quick:underline">
                              Lihat 14 Bentuk ➜
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-[10px] font-mono">
                            <div className="truncate text-slate-700">
                              <span className="text-slate-400 font-sans font-semibold mr-1">~Masu:</span>
                              <span className="font-bold font-jp text-indigo-950">{quickForms.masu.split(' ')[0]}</span>
                            </div>
                            <div className="truncate text-slate-700">
                              <span className="text-slate-400 font-sans font-semibold mr-1">~Te:</span>
                              <span className="font-bold font-jp text-indigo-950">{quickForms.te.split(' ')[0]}</span>
                            </div>
                            <div className="truncate text-slate-700">
                              <span className="text-slate-400 font-sans font-semibold mr-1">~Nai:</span>
                              <span className="font-bold font-jp text-indigo-950">{quickForms.nai.split(' ')[0]}</span>
                            </div>
                            <div className="truncate text-slate-700">
                              <span className="text-slate-400 font-sans font-semibold mr-1">~Ta:</span>
                              <span className="font-bold font-jp text-indigo-950">{quickForms.ta.split(' ')[0]}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Example Sentence */}
                      {card.exampleJp && (
                        <div
                          onClick={() => handlePlayAudio(card.exampleJp!)}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50/50 text-[11px] text-slate-600 border border-slate-100 hover:border-rose-200 transition-colors cursor-pointer group/ex"
                          title="Klik dengarkan contoh kalimat"
                        >
                          <div className="flex items-center justify-between gap-1">
                            <span className="font-jp font-medium text-slate-800">
                              {card.exampleJp}
                            </span>
                            <Volume2 className="w-3 h-3 text-slate-400 group-hover/ex:text-rose-500 shrink-0" />
                          </div>
                          {card.exampleId && (
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {card.exampleId}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })()}

                    {/* Card Bottom: Audio Play Button & Perubahan Kata */}
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={(e) =>
                          handlePlayAudio(
                            card.kanji || card.japanese,
                            card.furigana || card.reading,
                            e
                          )
                        }
                        className="flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer active:scale-95"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="text-[11px]">Audio</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedConjugationCard(card)}
                        className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100/90 px-2.5 py-1.5 rounded-xl border border-indigo-200/80 transition-all cursor-pointer active:scale-95 shadow-2xs"
                        title="Lihat seluruh perubahan kata lengkap"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Perubahan Kata</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ========================================================================= */
            /* VIEW 2: TABEL / DAFTAR RINGKAS RAPI                                      */
            /* ========================================================================= */
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Kosakata (Jepang)</th>
                      <th className="py-3 px-4">Jenis / Golongan</th>
                      <th className="py-3 px-4">Romaji / Baca</th>
                      <th className="py-3 px-4">Arti (Indonesia)</th>
                      <th className="py-3 px-4 text-center">Perubahan Kata</th>
                      <th className="py-3 px-4 text-center">Level</th>
                      <th className="py-3 px-4 text-center">Suara</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayCards.map((card) => {
                      const itemProg = progress[card.id];
                      const isMastered = itemProg?.status === 'mastered';
                      const wordClass = getWordClassification(card);

                      return (
                        <tr
                          key={`${card.id}-${card.japanese}`}
                          className="hover:bg-slate-50/80 transition-colors group"
                        >
                          {/* Japanese Word */}
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-jp font-black text-sm sm:text-base text-slate-900">
                                {card.japanese}
                              </span>
                              {showFurigana && card.furigana && card.furigana !== card.reading && (
                                <span className="text-[10px] text-rose-500 font-bold font-jp">
                                  {card.furigana}
                                </span>
                              )}
                              {isMastered && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />
                              )}
                            </div>
                          </td>

                          {/* Golongan / Jenis Kata */}
                          <td className="py-2.5 px-4">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${wordClass.badgeClass}`}>
                              <span>{wordClass.icon}</span>
                              <span className="whitespace-nowrap">{wordClass.shortLabel}</span>
                            </span>
                          </td>

                          {/* Romaji */}
                          <td className="py-2.5 px-4 font-mono text-slate-600 text-[11px]">
                            {card.reading}
                          </td>

                          {/* Meaning */}
                          <td className="py-2.5 px-4 font-bold text-slate-800">
                            {(() => {
                              const clarified = getClarifiedMeaning(card);
                              return (
                                <div className="space-y-0.5">
                                  <div className="flex items-center gap-1.5 flex-wrap">
                                    <span>{clarified.primaryMeaning}</span>
                                    {clarified.contextBadge && (
                                      <span
                                        className={`inline-block px-1.5 py-0.2 text-[9px] font-extrabold rounded border ${
                                          clarified.contextBadge.variant === 'intransitive'
                                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                            : clarified.contextBadge.variant === 'transitive'
                                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                                            : 'bg-amber-50 text-amber-800 border-amber-200'
                                        }`}
                                      >
                                        {clarified.contextBadge.text}
                                      </span>
                                    )}
                                  </div>
                                  {clarified.particleHint && (
                                    <div className="text-[10px] font-semibold text-indigo-700 font-mono">
                                      Partikel: <span className="font-jp">{clarified.particleHint}</span>
                                    </div>
                                  )}
                                  {clarified.contrastPair && (
                                    <div className="text-[10px] text-amber-900 font-normal">
                                      <span className="font-bold">Bedakan dgn: </span>
                                      <span className="font-jp font-bold">{clarified.contrastPair.word}</span>
                                      <span> ({clarified.contrastPair.difference})</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </td>

                          {/* Perubahan Kata Button */}
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={() => setSelectedConjugationCard(card)}
                              className="px-2.5 py-1 text-[11px] font-bold rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 transition-colors border border-indigo-200/80 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-2xs"
                              title="Buka seluruh bentuk konjugasi kata"
                            >
                              <Sparkles className="w-3 h-3 text-indigo-600" />
                              <span>14 Bentuk</span>
                            </button>
                          </td>

                          {/* Level */}
                          <td className="py-2.5 px-4 text-center">
                            {card.level && (
                              <span
                                className={`px-1.5 py-0.5 text-[9px] font-black rounded-md border ${
                                  card.level === 'N5'
                                    ? 'bg-sky-50 text-sky-700 border-sky-200'
                                    : card.level === 'N4'
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : card.level === 'N3'
                                    ? 'bg-purple-50 text-purple-700 border-purple-200'
                                    : card.level === 'N2'
                                    ? 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200 font-black'
                                }`}
                              >
                                {card.level}
                              </span>
                            )}
                          </td>

                          {/* Audio */}
                          <td className="py-2.5 px-4 text-center">
                            <button
                              onClick={(e) =>
                                handlePlayAudio(
                                  card.kanji || card.japanese,
                                  card.furigana || card.reading,
                                  e
                                )
                              }
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-600 transition-colors cursor-pointer"
                              title="Dengarkan pengucapan"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal Perubahan Kata Lengkap (14+ Bentuk Konjugasi) */}
      <WordConjugationModal
        card={selectedConjugationCard}
        isOpen={!!selectedConjugationCard}
        onClose={() => setSelectedConjugationCard(null)}
        speechRate={speechRate}
      />
    </div>
  );
};
