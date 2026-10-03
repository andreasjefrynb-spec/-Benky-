import React, { useState, useMemo } from 'react';
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
  Eye,
  EyeOff,
  Star,
} from 'lucide-react';
import { CardItem, UserItemProgress, LevelFilterOption } from '../types';
import { soundManager } from '../utils/audio';
import { WordConjugationModal } from './WordConjugationModal';
import { WordDetailModal } from './WordDetailModal';
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
  cluster: 'tata_bahasa' | 'kehidupan' | 'masyarakat' | 'alam_manusia' | 'modern_kreatif' | 'tingkat_mahir_native';
  color: string;
}

export const GROUP_CLUSTERS = [
  {
    id: 'tata_bahasa',
    title: 'Tata Bahasa & Pondasi Inti',
    sub: 'Kata kerja, sifat, keterangan, dan nomina pokok',
    icon: '⚡',
  },
  {
    id: 'kehidupan',
    title: 'Aktivitas & Kehidupan Sehari-hari',
    sub: 'Makanan, perabotan rumah, pakaian, alat tulis & salam',
    icon: '🍜',
  },
  {
    id: 'masyarakat',
    title: 'Masyarakat, Tempat & Karier',
    sub: 'Tempat, transportasi, sekolah/karier, keluarga, bisnis & negara',
    icon: '🏙️',
  },
  {
    id: 'alam_manusia',
    title: 'Waktu, Tubuh & Alam Sekitar',
    sub: 'Waktu & angka, tubuh & kesehatan, alam & cuaca',
    icon: '🌿',
  },
  {
    id: 'modern_kreatif',
    title: 'Minat, Digital & Wacana Modern',
    sub: 'Hobi & olahraga, teknologi & IT, konsep abstrak & opini',
    icon: '🚀',
  },
  {
    id: 'tingkat_mahir_native',
    title: 'Idiom & Ungkapan Penutur Asli',
    sub: 'Yojijukugo (四字熟語), Idiom tubuh (慣用句), Kotowaza & Onomatope',
    icon: '⛩️',
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
    color: 'from-blue-500/10 to-indigo-500/10 border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300',
  },
  kata_sifat: {
    id: 'kata_sifat',
    name: 'Kata Sifat',
    kanjiTitle: '形容詞 (Keiyoushi)',
    icon: '✨',
    desc: 'Sifat-i (い) dan sifat-na (な) deskriptif',
    cluster: 'tata_bahasa',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300',
  },
  kata_benda: {
    id: 'kata_benda',
    name: 'Kata Benda Pokok',
    kanjiTitle: '名詞 (Meishi)',
    icon: '📦',
    desc: 'Benda umum, pronomina penunjuk (これ/それ/あれ) & nomina penting',
    cluster: 'tata_bahasa',
    color: 'from-slate-500/10 to-zinc-500/10 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-200',
  },
  keterangan_fukushi: {
    id: 'keterangan_fukushi',
    name: 'Kata Keterangan',
    kanjiTitle: '副詞 (Fukushi)',
    icon: '💬',
    desc: 'Frekuensi, intensitas, kemungkinan & penghubung',
    cluster: 'tata_bahasa',
    color: 'from-purple-500/10 to-pink-500/10 border-purple-200 dark:border-purple-900/60 text-purple-800 dark:text-purple-300',
  },
  makanan: {
    id: 'makanan',
    name: 'Makanan & Minuman',
    kanjiTitle: '食べ物・飲み物',
    icon: '🍱',
    desc: 'Hidangan, bahan masakan, rasa & minuman',
    cluster: 'kehidupan',
    color: 'from-rose-500/10 to-orange-500/10 border-rose-200 dark:border-rose-900/60 text-rose-800 dark:text-rose-300',
  },
  benda_rumah: {
    id: 'benda_rumah',
    name: 'Benda & Rumah',
    kanjiTitle: '日用品・家具',
    icon: '🏠',
    desc: 'Perabot rumah tangga & perlengkapan sehari-hari',
    cluster: 'kehidupan',
    color: 'from-emerald-500/10 to-teal-500/10 border-emerald-200 dark:border-emerald-900/60 text-emerald-800 dark:text-emerald-300',
  },
  pakaian: {
    id: 'pakaian',
    name: 'Pakaian & Busana',
    kanjiTitle: '服・衣類・服飾 (Irui)',
    icon: '👔',
    desc: 'Pakaian, kemeja, celana, sepatu, jas, dasi, topi & busana',
    cluster: 'kehidupan',
    color: 'from-pink-500/10 to-indigo-500/10 border-pink-200 dark:border-pink-900/60 text-pink-800 dark:text-pink-300',
  },
  benda_sekolah: {
    id: 'benda_sekolah',
    name: 'Alat Tulis & Belajar',
    kanjiTitle: '文房具・勉強道具 (Bunbougu)',
    icon: '✏️',
    desc: 'Buku, pensil, pulpen, kamus, penggaris, buku catatan & alat belajar',
    cluster: 'kehidupan',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300',
  },
  salam: {
    id: 'salam',
    name: 'Salam & Sapaan Sopan',
    kanjiTitle: '挨拶・日常表現 (Aisatsu)',
    icon: '🌸',
    desc: 'Ungkapan salam harian, terima kasih, permohonan maaf & etiket tutur',
    cluster: 'kehidupan',
    color: 'from-pink-500/10 to-rose-500/10 border-pink-200 dark:border-pink-900/60 text-pink-800 dark:text-pink-300',
  },
  kalimat_percakapan: {
    id: 'kalimat_percakapan',
    name: 'Pola Kalimat & Percakapan Minna',
    kanjiTitle: '実用会話・短文 (Reibun)',
    icon: '💬',
    desc: 'Pola kalimat praktis & contoh percakapan penting Minna no Nihongo (Bab 1–50)',
    cluster: 'kehidupan',
    color: 'from-sky-500/10 to-indigo-500/10 border-sky-200 dark:border-sky-900/60 text-sky-800 dark:text-sky-300',
  },
  tempat: {
    id: 'tempat',
    name: 'Tempat & Arah',
    kanjiTitle: '場所・方向',
    icon: '📍',
    desc: 'Fasilitas umum, bangunan, kota & arah mata angin',
    cluster: 'masyarakat',
    color: 'from-sky-500/10 to-cyan-500/10 border-sky-200 dark:border-sky-900/60 text-sky-800 dark:text-sky-300',
  },
  transportasi: {
    id: 'transportasi',
    name: 'Transportasi',
    kanjiTitle: '交通・乗り物',
    icon: '🚆',
    desc: 'Stasiun, kereta, jalan raya & armada kendaraan',
    cluster: 'masyarakat',
    color: 'from-cyan-500/10 to-blue-500/10 border-cyan-200 dark:border-cyan-900/60 text-cyan-800 dark:text-cyan-300',
  },
  negara_bahasa: {
    id: 'negara_bahasa',
    name: 'Negara & Bahasa Asing',
    kanjiTitle: '国名・外国語・外国人',
    icon: '🌐',
    desc: 'Nama negara Katakana (Amerika, Doitsu, Furansu), bahasa asing & bangsa',
    cluster: 'masyarakat',
    color: 'from-blue-500/10 to-teal-500/10 border-blue-200 dark:border-blue-900/60 text-blue-800 dark:text-blue-300',
  },
  profesi_sekolah: {
    id: 'profesi_sekolah',
    name: 'Sekolah & Karier',
    kanjiTitle: '学校・仕事・趣味',
    icon: '💼',
    desc: 'Pendidikan, mata pelajaran, profesi & kegemaran',
    cluster: 'masyarakat',
    color: 'from-violet-500/10 to-purple-500/10 border-violet-200 dark:border-violet-900/60 text-violet-800 dark:text-violet-300',
  },
  keluarga: {
    id: 'keluarga',
    name: 'Keluarga & Teman',
    kanjiTitle: '家族・人間関係',
    icon: '👨‍👩‍👧',
    desc: 'Sebutan keluarga sendiri vs orang lain & sahabat',
    cluster: 'masyarakat',
    color: 'from-amber-500/10 to-yellow-500/10 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300',
  },
  angka_waktu: {
    id: 'angka_waktu',
    name: 'Waktu & Bilangan',
    kanjiTitle: '時間・数字',
    icon: '⏱️',
    desc: 'Jam, menit, tanggal, bulan, musim & satuan hitung',
    cluster: 'alam_manusia',
    color: 'from-teal-500/10 to-emerald-500/10 border-teal-200 dark:border-teal-900/60 text-teal-800 dark:text-teal-300',
  },
  tubuh_kesehatan: {
    id: 'tubuh_kesehatan',
    name: 'Tubuh & Medis',
    kanjiTitle: '体・健康・病院',
    icon: '🏥',
    desc: 'Bagian anatomi, keluhan sakit & istilah medis',
    cluster: 'alam_manusia',
    color: 'from-red-500/10 to-rose-500/10 border-red-200 dark:border-red-900/60 text-red-800 dark:text-red-300',
  },
  alam_hewan: {
    id: 'alam_hewan',
    name: 'Alam & Hewan',
    kanjiTitle: '自然・天気・生き物',
    icon: '🌲',
    desc: 'Cuaca, fenomena alam, binatang & tumbuhan',
    cluster: 'alam_manusia',
    color: 'from-lime-500/10 to-emerald-500/10 border-lime-200 dark:border-lime-900/60 text-lime-800 dark:text-lime-300',
  },
  yojijukugo: {
    id: 'yojijukugo',
    name: 'Yojijukugo (Idiom 4 Kanji)',
    kanjiTitle: '四字熟語',
    icon: '📜',
    desc: 'Idiom 4 kanji khas orang Jepang (一期一会, 以心伝心, 臨機応変, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-amber-600/10 to-rose-600/10 border-amber-300 dark:border-amber-900/60 text-amber-900 dark:text-amber-300',
  },
  kanyouku: {
    id: 'kanyouku',
    name: 'Kanyouku (Idiom Percakapan)',
    kanjiTitle: '慣用句 (Kanyouku)',
    icon: '🗣️',
    desc: 'Idiom bagian tubuh & rasa penutur asli (気が置けない, 匙を投げる, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-emerald-600/10 to-teal-600/10 border-emerald-300 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-300',
  },
  kotowaza: {
    id: 'kotowaza',
    name: 'Kotowaza (Peribahasa Jepang)',
    kanjiTitle: 'ことわざ (諺)',
    icon: '🎋',
    desc: 'Peribahasa & falsafah hidup tradisional Jepang (猿も木から落ちる, 継続は力なり, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-teal-600/10 to-emerald-600/10 border-teal-300 dark:border-teal-900/60 text-teal-900 dark:text-teal-300',
  },
  onomatope: {
    id: 'onomatope',
    name: 'Onomatope & Gitaigo',
    kanjiTitle: 'オノマトペ・擬態語',
    icon: '✨',
    desc: 'Tiruan bunyi & keadaan rasa penutur asli (ぺこぺこ, ぎりぎり, ぐっすり, dll.)',
    cluster: 'tingkat_mahir_native',
    color: 'from-rose-600/10 to-pink-600/10 border-rose-300 dark:border-rose-900/60 text-rose-900 dark:text-rose-300',
  },
  bisnis_formal: {
    id: 'bisnis_formal',
    name: 'Bisnis, Kantor & Keuangan',
    kanjiTitle: 'ビジネス・社会・金融',
    icon: '🏛️',
    desc: 'Etika kantor, kontrak, rapat, keuangan, gaji, belanja & transaksi',
    cluster: 'masyarakat',
    color: 'from-blue-600/10 to-cyan-600/10 border-blue-300 dark:border-blue-900/60 text-blue-900 dark:text-blue-300',
  },
  hiburan_olahraga: {
    id: 'hiburan_olahraga',
    name: 'Hobi, Seni & Olahraga',
    kanjiTitle: '趣味・スポーツ・娯楽',
    icon: '⚽',
    desc: 'Musik, instrumen, olahraga, film, anime, manga, seni & rekreasi',
    cluster: 'modern_kreatif',
    color: 'from-amber-500/10 to-orange-500/10 border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300',
  },
  teknologi_media: {
    id: 'teknologi_media',
    name: 'Teknologi, IT & Media',
    kanjiTitle: 'IT・通信・メディア',
    icon: '💻',
    desc: 'Komputer, internet, aplikasi, ponsel, perangkat digital & berita',
    cluster: 'modern_kreatif',
    color: 'from-indigo-500/10 to-blue-500/10 border-indigo-200 dark:border-indigo-900/60 text-indigo-800 dark:text-indigo-300',
  },
  abstrak_akademik: {
    id: 'abstrak_akademik',
    name: 'Abstrak, Pemikiran & Opini',
    kanjiTitle: '抽象概念・論説・思考',
    icon: '🧠',
    desc: 'Konsep pemikiran, opini, ide, alasan, nilai sosial & masyarakat',
    cluster: 'modern_kreatif',
    color: 'from-purple-600/10 to-indigo-600/10 border-purple-300 dark:border-purple-900/60 text-purple-900 dark:text-purple-300',
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
  const [selectedGroupKey, setSelectedGroupKey] = useState<string>('catalog');
  const [levelFilter, setLevelFilter] = useState<LevelFilterOption>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unmastered' | 'mastered'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [displayMode, setDisplayMode] = useState<'grid' | 'table'>('grid');
  const [showFurigana, setShowFurigana] = useState<boolean>(true);
  const [onlyClarified, setOnlyClarified] = useState<boolean>(false);
  const [selectedConjugationCard, setSelectedConjugationCard] = useState<CardItem | null>(null);
  const [selectedDetailCard, setSelectedDetailCard] = useState<CardItem | null>(null);

  // Group cards by subCategory with smart classification fallback
  const allGroupedMap = useMemo(() => {
    const map: Record<string, CardItem[]> = {};
    const definedKeys = new Set(Object.keys(GROUP_METAS));

    cards.forEach((card) => {
      let targetSub = card.subCategory || 'kata_benda';

      if (!definedKeys.has(targetSub)) {
        const cls = getWordClassification(card);
        if (cls.type.startsWith('verb')) {
          targetSub = 'kata_kerja';
        } else if (cls.type === 'adj_i' || cls.type === 'adj_na') {
          targetSub = 'kata_sifat';
        } else if (cls.type === 'adverb') {
          targetSub = 'keterangan_fukushi';
        } else if (cls.type === 'numeral' || cls.type === 'time_adverb' || cls.type === 'counter') {
          targetSub = 'angka_waktu';
        } else if (cls.type === 'phrase') {
          targetSub = 'kalimat_percakapan';
        } else {
          targetSub = 'kata_benda';
        }
      }

      if (!map[targetSub]) {
        map[targetSub] = [];
      }
      map[targetSub].push(card);
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

  // Selected Group Details
  const currentActiveGroup = useMemo(() => {
    if (selectedGroupKey === 'catalog') return null;
    if (selectedGroupKey === 'all') {
      return {
        key: 'all',
        meta: {
          id: 'all',
          name: 'Semua Kelompok Kosakata',
          kanjiTitle: '全単語 (Zen Tango)',
          icon: '📚',
          desc: 'Koleksi lengkap seluruh 4.200+ kosakata bahasa Jepang N5–N3',
          cluster: 'tata_bahasa' as const,
          color: 'from-slate-100 to-slate-200 border-slate-300 dark:border-slate-800 text-slate-800 dark:text-slate-100',
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
        const matchClarified = clarified.primaryMeaning?.toLowerCase().includes(q);
        return Boolean(matchJp || matchKanji || matchReading || matchFurigana || matchMeaning || matchClarified);
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-7 border border-slate-200/90 dark:border-slate-800 shadow-2xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/50">
                    <BookOpen className="w-5 h-5" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
                    Katalog Kelompok Kosakata
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl">
                  Kosakata bahasa Jepang dikelompokkan secara terarah ke dalam tema-tema tematik presisi untuk mempermudah ingatan dan persiapan ujian.
                </p>
              </div>

              {/* Action: Buka Semua Kelompok Sekaligus */}
              <button
                onClick={() => setSelectedGroupKey('all')}
                className="self-start md:self-auto px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs cursor-pointer transition-all active:scale-95 shrink-0 border border-transparent dark:border-slate-700"
              >
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Lihat Semua ({cards.length} Kata)</span>
              </button>
            </div>
          </div>

          {/* 6 Klaster Tematik Rapi */}
          <div className="space-y-6">
            {GROUP_CLUSTERS.map((cluster) => {
              const clusterGroups = groupsList.filter(
                (g) => g.meta.cluster === cluster.id && g.totalCount > 0
              );

              if (clusterGroups.length === 0) return null;

              return (
                <div key={cluster.id} className="space-y-3">
                  {/* Cluster Heading */}
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{cluster.icon}</span>
                      <h3 className="text-base font-black text-slate-800 dark:text-slate-200">
                        {cluster.title}
                      </h3>
                      <span className="text-xs text-slate-400 dark:text-slate-500 hidden sm:inline">
                        &bull; {cluster.sub}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {clusterGroups.reduce((acc, g) => acc + g.totalCount, 0)} kata
                    </span>
                  </div>

                  {/* Grid Cards of Groups in this Cluster */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                    {clusterGroups.map((group) => (
                      <div
                        key={group.key}
                        onClick={() => setSelectedGroupKey(group.key)}
                        className="group bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-500 hover:shadow-md transition-all duration-200 p-4 sm:p-5 flex flex-col justify-between gap-4 cursor-pointer select-none active:scale-[0.99]"
                      >
                        {/* Top: Icon, Titles & Kanji */}
                        <div className="space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <div className="w-11 h-11 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center text-2xl group-hover:scale-105 transition-transform shadow-2xs shrink-0">
                                {group.meta.icon}
                              </div>
                              <div>
                                <h4 className="text-base font-black text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                                  {group.meta.name}
                                </h4>
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 font-jp">
                                  {group.meta.kanjiTitle}
                                </span>
                              </div>
                            </div>

                            <ChevronRight className="w-5 h-5 text-slate-300 dark:text-slate-600 group-hover:text-rose-500 group-hover:translate-x-0.5 transition-all shrink-0 mt-1" />
                          </div>

                          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                            {group.meta.desc}
                          </p>
                        </div>

                        {/* Bottom: Counts, Progress & Action */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                          {/* Level Pills */}
                          <div className="flex items-center gap-1.5 flex-wrap text-[10px] font-mono font-bold">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                              {group.totalCount} kata
                            </span>
                            {group.n5Count > 0 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border border-sky-200/60 dark:border-sky-800">
                                N5: {group.n5Count}
                              </span>
                            )}
                            {group.n4Count > 0 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800">
                                N4: {group.n4Count}
                              </span>
                            )}
                            {group.n3Count > 0 && (
                              <span className="px-1.5 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200/60 dark:border-purple-800">
                                N3: {group.n3Count}
                              </span>
                            )}
                          </div>

                          {/* Progress Bar */}
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-[11px] font-bold">
                              <span className="text-slate-400 dark:text-slate-500">Tingkat Hafal</span>
                              <span className="text-slate-700 dark:text-slate-300 font-mono">
                                {group.masteredCount}/{group.totalCount} ({group.percentMastered}%)
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
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
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800 shadow-2xs space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              {/* Back to Catalog Button */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedGroupKey('catalog')}
                  className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 border border-transparent dark:border-slate-700"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Katalog Kelompok</span>
                </button>

                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-2xl">{currentActiveGroup?.meta.icon}</span>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 truncate">
                      {currentActiveGroup?.meta.name}
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                      {currentActiveGroup?.meta.kanjiTitle} &bull; {displayCards.length} kata ditampilkan
                    </p>
                  </div>
                </div>
              </div>

              {/* Group Quick Dropdown Selector & Action Buttons */}
              <div className="flex items-center gap-2 self-end md:self-auto flex-wrap">
                <span className="text-xs font-bold text-slate-400 hidden sm:inline">Pindah:</span>
                <select
                  value={selectedGroupKey}
                  onChange={(e) => setSelectedGroupKey(e.target.value)}
                  aria-label="Pilih Kelompok Kosakata"
                  className="text-xs font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">📚 Semua Kelompok ({cards.length})</option>
                  {groupsList
                    .filter((g) => g.totalCount > 0)
                    .map((g) => (
                      <option key={g.key} value={g.key}>
                        {g.meta.icon} {g.meta.name} ({g.totalCount})
                      </option>
                    ))}
                </select>

                {/* Practice Buttons */}
                <button
                  onClick={() => onStartFlashcard(selectedGroupKey, levelFilter)}
                  className="px-3 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all shrink-0 active:scale-95"
                  title="Mulai Latihan Flashcard Kelompok Ini"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Flashcard</span>
                </button>

                {onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(selectedGroupKey, levelFilter)}
                    className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer transition-all shrink-0 active:scale-95"
                    title="Mulai Kuis Kelompok Ini"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Kuis</span>
                  </button>
                )}
              </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-3">
              {/* Search Box */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari kata (Kanji, Romaji, atau arti bahasa Indonesia)..."
                  className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-400 focus:bg-white dark:focus:bg-slate-800"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Filters (Level, Status, View Mode) */}
              <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-between md:justify-end">
                {/* Level Filter */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                  {(['all', 'N5', 'N4', 'N3'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setLevelFilter(lvl)}
                      className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                        levelFilter === lvl
                          ? 'bg-rose-600 text-white shadow-2xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
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
                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
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
                      ? 'bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-700 shadow-2xs'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 border-slate-200 dark:border-slate-700'
                  }`}
                  title={onlyClarified ? 'Klik untuk menampilkan semua kata' : 'Saring kata-kata yang rawan tertukar / memiliki pembeda konteks & partikel khusus'}
                >
                  <Sparkles className={`w-3.5 h-3.5 ${onlyClarified ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'}`} />
                  <span>Anti-Bingung</span>
                </button>

                {/* Grid vs Table Toggle */}
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
                  <button
                    onClick={() => setDisplayMode('grid')}
                    className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                      displayMode === 'grid'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                    title="Tampilan Kotak Kartu"
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDisplayMode('table')}
                    className={`p-1.5 rounded-lg cursor-pointer transition-all ${
                      displayMode === 'table'
                        ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-2xs'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
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
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-200/90 dark:border-slate-800 text-center shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-800 dark:text-slate-200">
                Tidak ada kata yang sesuai
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Kata kunci &ldquo;{searchQuery}&rdquo; tidak ditemukan pada filter level yang dipilih.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setLevelFilter('all');
                  setOnlyClarified(false);
                }}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold cursor-pointer transition-colors"
              >
                Reset Filter
              </button>
            </div>
          ) : displayMode === 'grid' ? (
            /* ========================================================================= */
            /* VIEW 1: GRID KARTU KOSAKATA SEDERHANA & RAPI                              */
            /* ========================================================================= */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {displayCards.map((card) => {
                const itemProg = progress[card.id];
                const isMastered = itemProg?.status === 'mastered';
                const isFav = !!itemProg?.isFavorite;
                const wordClass = getWordClassification(card);
                const isConjugatable =
                  wordClass.type.startsWith('verb') || wordClass.type.startsWith('adj');

                return (
                  <div
                    key={`${card.id}-${card.japanese}`}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-4.5 border border-slate-200/90 dark:border-slate-800 shadow-2xs hover:border-rose-400 dark:hover:border-rose-500/70 hover:shadow-xs transition-all flex flex-col justify-between gap-3 group relative"
                  >
                    {/* Card Top: Word & Kanji */}
                    <div className="space-y-1.5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-baseline gap-2 flex-wrap">
                            <span className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight font-jp">
                              {card.japanese}
                            </span>
                            {showFurigana && card.furigana && card.furigana !== card.reading && (
                              <span className="text-xs text-rose-500 dark:text-rose-400 font-bold font-jp">
                                {card.furigana}
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                            {card.reading}
                          </div>
                        </div>

                        {/* Level Badge & Favorite */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {card.level && (
                            <span
                              className={`px-2 py-0.5 text-[10px] font-black rounded-md border ${
                                card.level === 'N5'
                                  ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                                  : card.level === 'N4'
                                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                  : card.level === 'N3'
                                  ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                                  : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 font-black'
                              }`}
                            >
                              {card.level}
                            </span>
                          )}
                          {isMastered && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950" />
                          )}
                          {onToggleFavorite && (
                            <button
                              onClick={() => onToggleFavorite(card.id)}
                              className="p-1 text-slate-300 dark:text-slate-600 hover:text-amber-500 transition-colors cursor-pointer"
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
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${wordClass.badgeClass}`}>
                          <span>{wordClass.icon}</span>
                          <span>{wordClass.shortLabel}</span>
                        </span>
                      </div>
                    </div>

                    {/* Indonesian Meaning */}
                    {(() => {
                      const clarified = getClarifiedMeaning(card);
                      return (
                        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                          <div className="space-y-1">
                            <div className="flex items-start justify-between gap-1.5 flex-wrap">
                              <span className="text-xs sm:text-sm font-extrabold text-slate-800 dark:text-slate-200 leading-snug">
                                {clarified.primaryMeaning}
                              </span>
                              {clarified.contextBadge && (
                                <span
                                  className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-extrabold border shrink-0 ${
                                    clarified.contextBadge.variant === 'intransitive'
                                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                      : clarified.contextBadge.variant === 'transitive'
                                      ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                                      : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                  }`}
                                >
                                  {clarified.contextBadge.text}
                                </span>
                              )}
                            </div>

                            {/* Particle Hint if available */}
                            {clarified.particleHint && (
                              <div className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 flex items-center gap-1">
                                <span className="text-[9px] px-1 py-0.2 bg-indigo-50 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-300 rounded font-mono">Partikel:</span>
                                <span className="font-jp">{clarified.particleHint}</span>
                              </div>
                            )}

                            {/* Anti-Bingung note if present */}
                            {clarified.contrastPair && (
                              <div className="text-[10px] bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/60 rounded-lg p-1.5 text-amber-900 dark:text-amber-300 leading-tight">
                                <span className="font-extrabold text-amber-950 dark:text-amber-200">💡 Bedakan dgn: </span>
                                <span className="font-jp font-bold">{clarified.contrastPair.word}</span>
                                <span> ({clarified.contrastPair.reading}) — {clarified.contrastPair.difference}</span>
                              </div>
                            )}
                          </div>

                          {/* Example Sentence */}
                          {card.exampleJp && (
                            <div
                              onClick={() => handlePlayAudio(card.exampleJp!)}
                              className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 text-[11px] text-slate-600 dark:text-slate-300 border border-slate-100 dark:border-slate-800 hover:border-rose-200 dark:hover:border-rose-800 transition-colors cursor-pointer group/ex"
                              title="Klik dengarkan contoh kalimat"
                            >
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-jp font-medium text-slate-800 dark:text-slate-200">
                                  {card.exampleJp}
                                </span>
                                <Volume2 className="w-3 h-3 text-slate-400 group-hover/ex:text-rose-500 shrink-0" />
                              </div>
                              {card.exampleId && (
                                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                                  {card.exampleId}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* Card Bottom: Audio Play Button, Detail Kamus & 14 Bentuk Button */}
                    <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1.5 flex-wrap">
                      <button
                        onClick={(e) =>
                          handlePlayAudio(
                            card.kanji || card.japanese,
                            card.furigana || card.reading,
                            e
                          )
                        }
                        className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer active:scale-95"
                      >
                        <Volume2 className="w-4 h-4" />
                        <span className="text-[11px]">Audio</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setSelectedDetailCard(card)}
                          className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200/80 dark:hover:bg-slate-700 px-2.5 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 transition-all cursor-pointer active:scale-95 shadow-2xs"
                          title="Lihat penjelasan detail arti kata lengkap"
                        >
                          <BookOpen className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                          <span>Detail</span>
                        </button>

                        {isConjugatable && (
                          <button
                            type="button"
                            onClick={() => setSelectedConjugationCard(card)}
                            className="flex items-center gap-1 text-xs font-bold text-indigo-700 dark:text-indigo-300 hover:text-indigo-900 dark:hover:text-indigo-200 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100/90 dark:hover:bg-indigo-900/60 px-2.5 py-1.5 rounded-xl border border-indigo-200/80 dark:border-indigo-800 transition-all cursor-pointer active:scale-95 shadow-2xs"
                            title="Lihat seluruh 14+ perubahan bentuk kata"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                            <span>14 Bentuk</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* ========================================================================= */
            /* VIEW 2: TABEL / DAFTAR RINGKAS RAPI                                      */
            /* ========================================================================= */
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-2xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                      <th className="py-3 px-4">Kosakata (Jepang)</th>
                      <th className="py-3 px-4">Jenis / Golongan</th>
                      <th className="py-3 px-4">Romaji / Baca</th>
                      <th className="py-3 px-4">Arti (Indonesia)</th>
                      <th className="py-3 px-4 text-center">Detail & Konjugasi</th>
                      <th className="py-3 px-4 text-center">Level</th>
                      <th className="py-3 px-4 text-center">Suara</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {displayCards.map((card) => {
                      const itemProg = progress[card.id];
                      const isMastered = itemProg?.status === 'mastered';
                      const wordClass = getWordClassification(card);
                      const isConjugatable =
                        wordClass.type.startsWith('verb') || wordClass.type.startsWith('adj');

                      return (
                        <tr
                          key={`${card.id}-${card.japanese}`}
                          className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group"
                        >
                          {/* Japanese Word */}
                          <td className="py-2.5 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-jp font-black text-sm sm:text-base text-slate-900 dark:text-slate-100">
                                {card.japanese}
                              </span>
                              {showFurigana && card.furigana && card.furigana !== card.reading && (
                                <span className="text-[10px] text-rose-500 dark:text-rose-400 font-bold font-jp">
                                  {card.furigana}
                                </span>
                              )}
                              {isMastered && (
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 fill-emerald-100 dark:fill-emerald-950 shrink-0" />
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
                          <td className="py-2.5 px-4 font-mono text-slate-600 dark:text-slate-400 text-[11px]">
                            {card.reading}
                          </td>

                          {/* Meaning */}
                          <td className="py-2.5 px-4 font-bold text-slate-800 dark:text-slate-200">
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
                                            ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                            : clarified.contextBadge.variant === 'transitive'
                                            ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                                            : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                                        }`}
                                      >
                                        {clarified.contextBadge.text}
                                      </span>
                                    )}
                                  </div>
                                  {clarified.particleHint && (
                                    <div className="text-[10px] font-semibold text-indigo-700 dark:text-indigo-400 font-mono">
                                      Partikel: <span className="font-jp">{clarified.particleHint}</span>
                                    </div>
                                  )}
                                  {clarified.contrastPair && (
                                    <div className="text-[10px] text-amber-900 dark:text-amber-300 font-normal">
                                      <span className="font-bold">Bedakan dgn: </span>
                                      <span className="font-jp font-bold">{clarified.contrastPair.word}</span>
                                      <span> ({clarified.contrastPair.difference})</span>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </td>

                          {/* Detail & Perubahan Kata Action Buttons */}
                          <td className="py-2.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                onClick={() => setSelectedDetailCard(card)}
                                className="px-2 py-1 text-[11px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-slate-700 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
                                title="Lihat penjelasan detail arti kata lengkap"
                              >
                                <BookOpen className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                                <span>Detail</span>
                              </button>

                              {isConjugatable && (
                                <button
                                  onClick={() => setSelectedConjugationCard(card)}
                                  className="px-2 py-1 text-[11px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 transition-colors border border-indigo-200/80 dark:border-indigo-800 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shadow-2xs"
                                  title="Buka seluruh bentuk konjugasi kata"
                                >
                                  <Sparkles className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                                  <span>14 Bentuk</span>
                                </button>
                              )}
                            </div>
                          </td>

                          {/* Level */}
                          <td className="py-2.5 px-4 text-center">
                            {card.level && (
                              <span
                                className={`px-1.5 py-0.5 text-[9px] font-black rounded-md border ${
                                  card.level === 'N5'
                                    ? 'bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800'
                                    : card.level === 'N4'
                                    ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                                    : card.level === 'N3'
                                    ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                                    : 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800 font-black'
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
                              className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 hover:text-rose-600 dark:hover:text-rose-400 text-slate-600 dark:text-slate-300 transition-colors cursor-pointer"
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

      {/* Modal Detail Arti Kosakata Lengkap */}
      <WordDetailModal
        card={selectedDetailCard}
        isOpen={!!selectedDetailCard}
        onClose={() => setSelectedDetailCard(null)}
        speechRate={speechRate}
        onOpenConjugation={(c) => {
          setSelectedDetailCard(null);
          setSelectedConjugationCard(c);
        }}
      />

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
