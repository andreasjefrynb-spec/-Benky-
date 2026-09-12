import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Search,
  Check,
  ChevronRight,
  Filter,
  Music,
  Zap,
  RotateCcw,
  Award,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
  XCircle,
  Flame,
  HelpCircle,
} from 'lucide-react';
import {
  verbProfiles,
  trapVerbsGodan,
} from '../data/conjugationsData';
import {
  TE_FORM_SONG_RULES,
  GODAN_VOWEL_ROWS,
  CONJUGATION_DRILL_ITEMS,
  TeFormSongRule,
} from '../data/conjugationDrillData';
import { VerbConjugationProfile, VerbGroup } from '../types';
import { soundManager } from '../utils/audio';

interface ConjugationViewProps {
  speechRate: number;
}

type ConjugationTab = 'simulator' | 'teSongAndLadder' | 'groupsGuide' | 'drillPractice';

export const ConjugationView: React.FC<ConjugationViewProps> = ({ speechRate }) => {
  const [activeTab, setActiveTab] = useState<ConjugationTab>('simulator');
  const [selectedVerbId, setSelectedVerbId] = useState<string>(verbProfiles[0]?.id || 'conj-taberu');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Tab 2: Te Song & 5-Vowel Ladder States
  const [activeTeSongId, setActiveTeSongId] = useState<string>('u-tsu-ru');
  const [selectedVowelIndex, setSelectedVowelIndex] = useState<number>(0);
  const [selectedGodanSampleVerb, setSelectedGodanSampleVerb] = useState<'kaku' | 'nomu' | 'hanasu' | 'kau' | 'matsu' | 'iku'>('kaku');

  // Tab 4: Drill Practice States
  const [drillCurrentIndex, setDrillCurrentIndex] = useState<number>(0);
  const [drillSelectedOption, setDrillSelectedOption] = useState<string | null>(null);
  const [drillAnswered, setDrillAnswered] = useState<boolean>(false);
  const [drillScore, setDrillScore] = useState<number>(0);
  const [drillStreak, setDrillStreak] = useState<number>(0);
  const [drillMaxStreak, setDrillMaxStreak] = useState<number>(0);
  const [drillFinished, setDrillFinished] = useState<boolean>(false);

  const selectedProfile: VerbConjugationProfile =
    verbProfiles.find((v) => v.id === selectedVerbId) || verbProfiles[0];

  const handleSpeak = (text: string, readingOrEvent?: string | React.MouseEvent, e?: React.MouseEvent) => {
    let reading: string | undefined;
    let evt: React.MouseEvent | undefined;
    if (typeof readingOrEvent === 'string') {
      reading = readingOrEvent;
      evt = e;
    } else if (readingOrEvent && typeof readingOrEvent === 'object' && 'stopPropagation' in readingOrEvent) {
      evt = readingOrEvent as React.MouseEvent;
    }
    if (evt) evt.stopPropagation();
    soundManager.speakJapanese(text, speechRate, undefined, reading);
  };

  // Filter verbs for simulator
  const filteredVerbs = useMemo(() => {
    return verbProfiles.filter((v) => {
      const matchesGroup =
        filterGroup === 'all' ||
        (filterGroup === 'traps' ? v.isException : v.group === filterGroup);
      const matchesSearch =
        searchQuery.trim() === '' ||
        v.dictionary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
        v.meaningId.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesGroup && matchesSearch;
    });
  }, [filterGroup, searchQuery]);

  const getGroupBadge = (group: VerbGroup) => {
    switch (group) {
      case 'godan':
        return { label: 'Golongan 1 (Godan)', color: 'bg-indigo-100 text-indigo-800 border-indigo-200' };
      case 'ichidan':
        return { label: 'Golongan 2 (Ichidan)', color: 'bg-emerald-100 text-emerald-800 border-emerald-200' };
      case 'fukisoku':
        return { label: 'Golongan 3 (Tak Beraturan)', color: 'bg-purple-100 text-purple-800 border-purple-200' };
      case 'i_keiyoushi':
        return { label: 'Kata Sifat -i (い形容詞)', color: 'bg-amber-100 text-amber-800 border-amber-200' };
      case 'na_keiyoushi':
        return { label: 'Kata Sifat -na (な形容詞)', color: 'bg-rose-100 text-rose-800 border-rose-200' };
    }
  };

  // Godan ladder dynamic sample builder
  const godanLadderSamples = {
    kaku: {
      kanji: '書く',
      reading: 'kaku',
      meaning: 'Menulis',
      stem: '書',
      levels: [
        { kana: 'か', ending: 'ない', full: '書かない', romaji: 'kakanai', meaning: 'Tidak menulis', form: 'Negatif Kasual' },
        { kana: 'き', ending: 'ます', full: '書きます', romaji: 'kakimasu', meaning: 'Menulis (sopan)', form: 'Sopan Formal' },
        { kana: 'く', ending: '', full: '書く', romaji: 'kaku', meaning: 'Menulis (kamus)', form: 'Bentuk Kamus' },
        { kana: 'け', ending: 'る / ば', full: '書ける / 書けば', romaji: 'kakeru / kakeba', meaning: 'Bisa menulis / Jika menulis', form: 'Potensial / Syarat' },
        { kana: 'こ', ending: 'う', full: '書こう', romaji: 'kakou', meaning: 'Ayo menulis!', form: 'Ajakan Kasual' },
      ],
    },
    nomu: {
      kanji: '飲む',
      reading: 'nomu',
      meaning: 'Minum',
      stem: '飲',
      levels: [
        { kana: 'ま', ending: 'ない', full: '飲まない', romaji: 'nomanai', meaning: 'Tidak minum', form: 'Negatif Kasual' },
        { kana: 'み', ending: 'ます', full: '飲みます', romaji: 'nomimasu', meaning: 'Minum (sopan)', form: 'Sopan Formal' },
        { kana: 'む', ending: '', full: '飲む', romaji: 'nomu', meaning: 'Minum (kamus)', form: 'Bentuk Kamus' },
        { kana: 'め', ending: 'る / ば', full: '飲める / 飲めば', romaji: 'nomeru / nomeba', meaning: 'Bisa minum / Jika minum', form: 'Potensial / Syarat' },
        { kana: 'も', ending: 'う', full: '飲もう', romaji: 'nomou', meaning: 'Ayo minum!', form: 'Ajakan Kasual' },
      ],
    },
    hanasu: {
      kanji: '話す',
      reading: 'hanasu',
      meaning: 'Berbicara',
      stem: '話',
      levels: [
        { kana: 'さ', ending: 'ない', full: '話さない', romaji: 'hanasanai', meaning: 'Tidak berbicara', form: 'Negatif Kasual' },
        { kana: 'し', ending: 'ます', full: '話します', romaji: 'hanashimasu', meaning: 'Berbicara (sopan)', form: 'Sopan Formal' },
        { kana: 'す', ending: '', full: '話す', romaji: 'hanasu', meaning: 'Berbicara (kamus)', form: 'Bentuk Kamus' },
        { kana: 'せ', ending: 'る / ば', full: '話せる / 話せば', romaji: 'hanaseru / hanaseba', meaning: 'Bisa bicara / Jika bicara', form: 'Potensial / Syarat' },
        { kana: 'そ', ending: 'う', full: '話そう', romaji: 'hanasou', meaning: 'Ayo mengobrol!', form: 'Ajakan Kasual' },
      ],
    },
    kau: {
      kanji: '買う',
      reading: 'kau',
      meaning: 'Membeli',
      stem: '買',
      levels: [
        { kana: 'わ', ending: 'ない', full: '買わない', romaji: 'kawanai', meaning: 'Tidak membeli (pakai WA!)', form: 'Negatif Kasual' },
        { kana: 'い', ending: 'ます', full: '買います', romaji: 'kaimasu', meaning: 'Membeli (sopan)', form: 'Sopan Formal' },
        { kana: 'う', ending: '', full: '買う', romaji: 'kau', meaning: 'Membeli (kamus)', form: 'Bentuk Kamus' },
        { kana: 'え', ending: 'る / ば', full: '買える / 買えば', romaji: 'kaeru / kaeba', meaning: 'Bisa beli / Jika beli', form: 'Potensial / Syarat' },
        { kana: 'お', ending: 'う', full: '買おう', romaji: 'kaou', meaning: 'Ayo membeli!', form: 'Ajakan Kasual' },
      ],
    },
    matsu: {
      kanji: '待つ',
      reading: 'matsu',
      meaning: 'Menunggu',
      stem: '待',
      levels: [
        { kana: 'た', ending: 'ない', full: '待たない', romaji: 'matanai', meaning: 'Tidak menunggu', form: 'Negatif Kasual' },
        { kana: 'ち', ending: 'ます', full: '待ちます', romaji: 'machimasu', meaning: 'Menunggu (sopan)', form: 'Sopan Formal' },
        { kana: 'つ', ending: '', full: '待つ', romaji: 'matsu', meaning: 'Menunggu (kamus)', form: 'Bentuk Kamus' },
        { kana: 'て', ending: 'る / ば', full: '待てる / 待てば', romaji: 'materu / mateba', meaning: 'Bisa tunggu / Jika tunggu', form: 'Potensial / Syarat' },
        { kana: 'と', ending: 'う', full: '待とう', romaji: 'matou', meaning: 'Ayo kita tunggu!', form: 'Ajakan Kasual' },
      ],
    },
    iku: {
      kanji: '行く',
      reading: 'iku',
      meaning: 'Pergi',
      stem: '行',
      levels: [
        { kana: 'か', ending: 'ない', full: '行かない', romaji: 'ikanai', meaning: 'Tidak pergi', form: 'Negatif Kasual' },
        { kana: 'き', ending: 'ます', full: '行きます', romaji: 'ikimasu', meaning: 'Pergi (sopan)', form: 'Sopan Formal' },
        { kana: 'く', ending: '', full: '行く', romaji: 'iku', meaning: 'Pergi (kamus)', form: 'Bentuk Kamus' },
        { kana: 'け', ending: 'る / ば', full: '行ける / 行けば', romaji: 'ikeru / ikeba', meaning: 'Bisa pergi / Jika pergi', form: 'Potensial / Syarat' },
        { kana: 'こ', ending: 'う', full: '行こう', romaji: 'ikou', meaning: 'Ayo berangkat!', form: 'Ajakan Kasual' },
      ],
    },
  };

  // Drill handler
  const currentDrillItem = CONJUGATION_DRILL_ITEMS[drillCurrentIndex] || CONJUGATION_DRILL_ITEMS[0];

  const handleSelectDrillOption = (option: string) => {
    if (drillAnswered) return;
    setDrillSelectedOption(option);
    setDrillAnswered(true);

    const isCorrect = option === currentDrillItem.correctAnswer;
    if (isCorrect) {
      const newStreak = drillStreak + 1;
      setDrillStreak(newStreak);
      if (newStreak > drillMaxStreak) setDrillMaxStreak(newStreak);
      setDrillScore((prev) => prev + 1);
      soundManager.playCorrect();
    } else {
      setDrillStreak(0);
      soundManager.playWrong();
    }
  };

  const handleNextDrill = () => {
    if (drillCurrentIndex + 1 < CONJUGATION_DRILL_ITEMS.length) {
      setDrillCurrentIndex((prev) => prev + 1);
      setDrillSelectedOption(null);
      setDrillAnswered(false);
    } else {
      setDrillFinished(true);
    }
  };

  const handleRestartDrill = () => {
    setDrillCurrentIndex(0);
    setDrillSelectedOption(null);
    setDrillAnswered(false);
    setDrillScore(0);
    setDrillStreak(0);
    setDrillFinished(false);
  };

  // Helper to split a word into root stem and suffix for color-coded visual understanding
  const renderWordWithColor = (japanese: string, profile: VerbConjugationProfile) => {
    // If adjective or irregular, display cleanly
    if (!japanese || japanese.length <= 1) return <span>{japanese}</span>;

    // Detect common suffix patterns
    const commonSuffixes = [
      'られない', 'られません', 'られる', 'させる', 'させて',
      'ません', 'ました', 'ましょう', 'ないで',
      'ます', 'ない', 'たくない', 'たい', 'って', 'んで', 'いて', 'いで', 'して',
      'った', 'んだ', 'いた', 'いだ', 'した', 'れる', 'れば', 'よう', 'ろう', 'こう', 'そう', 'とう', 'ぼう', 'もう',
      'くて', 'かった', 'くない', 'です', 'でした', 'じゃない', 'じゃありません', 'で', 'に'
    ];

    for (const s of commonSuffixes) {
      if (japanese.endsWith(s) && japanese.length > s.length) {
        const stem = japanese.slice(0, -s.length);
        return (
          <span className="inline-flex items-baseline">
            <span className="font-bold text-slate-900">{stem}</span>
            <span className="font-black text-rose-600 bg-rose-50 px-1 py-0.2 rounded border border-rose-200/60 ml-0.5 shadow-2xs">
              {s}
            </span>
          </span>
        );
      }
    }

    return <span className="font-bold text-slate-900">{japanese}</span>;
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-5 space-y-6">
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/60 relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-rose-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-3.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold tracking-wide uppercase border border-white/15 text-indigo-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Tata Bahasa & Konjugasi (活用 - Katsuyou)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white font-jp">
            Perubahan Bentuk Kata Kerja & Kata Sifat
          </h1>
          <p className="text-indigo-100/90 text-xs sm:text-sm sm:leading-relaxed leading-normal">
            Pahami rahasia perubahan bentuk kata Jepang tanpa pusing. Pelajari irama lagu bentuk <strong className="text-amber-300 font-bold">~Te</strong>, amati tangga ajaib <strong className="text-emerald-300 font-bold">5 Vokal (A-I-U-E-O)</strong>, waspadai kata kerja jebakan, jelajahi simulator 14 bentuk dengan penyorotan warna sufiks, serta uji kemampuanmu lewat latihan kilat instan.
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-indigo-200">
            <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
              <span>📚 3 Golongan Kata Kerja</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
              <span>🎵 Jingle Lagu ~Te</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
              <span>⚠️ Trap Verbs N5/N4</span>
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/15 flex items-center gap-1.5">
              <span>⚡ Latihan Drill Kilat</span>
            </span>
          </div>
        </div>
      </section>

      {/* Main Tab Controls with 4 Rich Sections */}
      <div className="bg-white p-1.5 sm:p-2 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5">
          <button
            id="tab-btn-conj-sim"
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/80 ring-2 ring-indigo-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4 shrink-0" />
            <span className="truncate">Simulator 14 Bentuk</span>
          </button>

          <button
            id="tab-btn-conj-song"
            onClick={() => setActiveTab('teSongAndLadder')}
            className={`px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center cursor-pointer ${
              activeTab === 'teSongAndLadder'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/80 ring-2 ring-indigo-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Music className="w-4 h-4 shrink-0 text-amber-500" />
            <span className="truncate">Lagu ~Te & Tangga 5 Vokal</span>
          </button>

          <button
            id="tab-btn-conj-guide"
            onClick={() => setActiveTab('groupsGuide')}
            className={`px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center cursor-pointer ${
              activeTab === 'groupsGuide'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/80 ring-2 ring-indigo-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
            <span className="truncate">Panduan Golongan & Jebakan</span>
          </button>

          <button
            id="tab-btn-conj-drill"
            onClick={() => setActiveTab('drillPractice')}
            className={`px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 text-center cursor-pointer ${
              activeTab === 'drillPractice'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200/80 ring-2 ring-indigo-400'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Zap className="w-4 h-4 shrink-0 text-yellow-500" />
            <span className="truncate">Latihan Kilat (Drill)</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: SIMULATOR & PROFILE EXPLORER                                       */}
      {/* ========================================================================= */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Verb Selector & Filter Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-5 space-y-4 shadow-2xs">
            <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
              {/* Group filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-extrabold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Filter:
                </span>
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'godan', label: 'Gol 1 (Godan)' },
                  { id: 'ichidan', label: 'Gol 2 (Ichidan)' },
                  { id: 'fukisoku', label: 'Gol 3 (Suru/Kuru)' },
                  { id: 'traps', label: '⚠️ Trap Verbs' },
                  { id: 'i_keiyoushi', label: 'Sifat -i' },
                  { id: 'na_keiyoushi', label: 'Sifat -na' },
                ].map((g) => (
                  <button
                    key={g.id}
                    id={`filter-conj-group-${g.id}`}
                    onClick={() => setFilterGroup(g.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      filterGroup === g.id
                        ? 'bg-indigo-600 text-white shadow-sm ring-1 ring-indigo-400'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full md:w-64">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  id="conj-search-input"
                  type="text"
                  placeholder="Cari kata (taberu, iku, oishii)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-800 shadow-2xs"
                />
              </div>
            </div>

            {/* Verb Quick Picker Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1.5 scrollbar-thin">
              {filteredVerbs.map((v) => {
                const isSelected = v.id === selectedVerbId;
                return (
                  <button
                    key={v.id}
                    id={`verb-picker-${v.id}`}
                    onClick={() => setSelectedVerbId(v.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer shrink-0 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-400'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <span className="font-jp font-black text-sm sm:text-base">{v.dictionary}</span>
                    <span className="opacity-80 text-xs font-sans">({v.reading})</span>
                    <span className="text-[11px] opacity-75">· {v.meaningId}</span>
                    {v.isException && (
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" title="Kata Kerja Jebakan!" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Verb Hero Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center gap-4">
                {/* Big Display Badge */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-indigo-900 text-white flex flex-col items-center justify-center shadow-lg font-bold shrink-0 border border-indigo-400/40">
                  <span className="text-2xl sm:text-3xl leading-none font-jp font-black">{selectedProfile.dictionary}</span>
                  <span className="text-[10px] tracking-wider uppercase opacity-90 mt-1 font-sans">
                    {selectedProfile.reading}
                  </span>
                </div>

                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-jp">
                      {selectedProfile.dictionary} ({selectedProfile.reading})
                    </h2>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                        getGroupBadge(selectedProfile.group).color
                      }`}
                    >
                      {getGroupBadge(selectedProfile.group).label}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-xs font-black bg-slate-100 text-slate-700 border border-slate-200">
                      JLPT {selectedProfile.level}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 font-medium">
                    Arti: <strong className="text-slate-900 font-bold">{selectedProfile.meaningId}</strong>
                  </p>
                </div>
              </div>

              {/* Pronunciation button */}
              <button
                id="btn-speak-selected-verb"
                onClick={() => handleSpeak(selectedProfile.dictionary, selectedProfile.reading)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs sm:text-sm transition-all self-start sm:self-auto border border-indigo-200/80 cursor-pointer shadow-2xs"
              >
                <Volume2 className="w-4 h-4 shrink-0" />
                <span>Dengarkan Audio</span>
              </button>
            </div>

            {/* Exception Warning Banner if any */}
            {selectedProfile.isException && selectedProfile.exceptionNote && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-2xl flex items-start gap-3 shadow-2xs">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <strong className="font-extrabold text-amber-900 block mb-0.5">
                    ⚠️ Peringatan Aturan Khusus / Kata Kerja Jebakan:
                  </strong>
                  {selectedProfile.exceptionNote}
                </div>
              </div>
            )}

            {/* Conjugation Forms Grid */}
            <div className="space-y-3 pt-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
                    Tabel Perubahan Bentuk Lengkap ({selectedProfile.forms.length} Bentuk)
                  </h3>
                  <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                    Sufiks ditandai warna
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  Klik ikon speaker pada tiap baris untuk mendengarkan audio
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {selectedProfile.forms.map((form) => (
                  <div
                    key={form.formKey}
                    id={`form-row-${selectedProfile.id}-${form.formKey}`}
                    className="p-4 rounded-2xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-indigo-300 hover:shadow-md transition-all space-y-2.5 relative group"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-extrabold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200/80">
                        {form.formName}
                      </span>
                      <button
                        id={`audio-form-${selectedProfile.id}-${form.formKey}`}
                        onClick={() => handleSpeak(form.japanese, form.reading)}
                        title="Dengar pengucapan bentuk ini"
                        className="p-2 rounded-xl bg-white hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 transition-colors border border-slate-200 cursor-pointer shadow-2xs"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form Word Display with highlighted suffix */}
                    <div>
                      <div className="text-xl font-bold font-jp">
                        {renderWordWithColor(form.japanese, selectedProfile)}
                      </div>
                      <div className="text-xs text-slate-500 italic mt-0.5">
                        {form.reading}
                      </div>
                      <div className="text-xs text-slate-700 font-semibold mt-1">
                        Makna: <span className="text-slate-900 font-bold">{form.meaningId}</span>
                      </div>
                    </div>

                    {/* Rule explanation */}
                    {form.ruleExplanation && (
                      <div className="text-[11px] text-slate-600 bg-white p-2.5 rounded-xl border border-slate-200/70 space-y-0.5">
                        <strong className="text-indigo-900 font-bold">Rumus Perubahan:</strong> {form.ruleExplanation}
                      </div>
                    )}

                    {/* Example Sentence */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200/90 flex items-start justify-between gap-2 shadow-2xs">
                      <div className="space-y-1 text-left text-xs min-w-0">
                        <div className="font-bold text-slate-900 font-jp leading-relaxed">
                          {form.exampleJp}
                        </div>
                        <div className="text-slate-600 leading-snug">
                          {form.exampleId}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(form.exampleJp)}
                        title="Dengar audio contoh kalimat"
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors shrink-0 cursor-pointer mt-0.5"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: LAGU ~TE & TANGGA 5 VOKAL (GODAN)                                  */}
      {/* ========================================================================= */}
      {activeTab === 'teSongAndLadder' && (
        <div className="space-y-8">
          {/* SECTION 1: THE TE-FORM SONG JINGLE */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold mb-1">
                  <Music className="w-3.5 h-3.5 text-amber-600" />
                  <span>Irama Emas Bahasa Jepang (歌で覚える「て形」)</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-jp">
                  Lagu & Jingle Hafalan Bentuk ~Te (て形)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Trik nomor 1 yang diajarkan di seluruh sekolah bahasa Jepang agar kamu tidak pernah salah mengubah kata kerja Golongan 1 (Godan)!
                </p>
              </div>

              <div className="text-xs bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-slate-600 shrink-0">
                💡 <strong>Tips:</strong> Klik tombol speaker pada contoh untuk mendengarkan lafal aslinya.
              </div>
            </div>

            {/* Song Rule Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {TE_FORM_SONG_RULES.map((rule) => {
                const isSelected = activeTeSongId === rule.id;
                return (
                  <div
                    key={rule.id}
                    id={`song-card-${rule.id}`}
                    onClick={() => setActiveTeSongId(rule.id)}
                    className={`p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer bg-gradient-to-br ${rule.bgGradient} ${
                      isSelected
                        ? 'ring-2 ring-indigo-500 shadow-md border-indigo-400 bg-white'
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    {/* Rhythm Header */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className={`px-2.5 py-1 rounded-xl text-xs font-black border ${rule.badgeColor}`}>
                        {rule.targetEnding}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500">
                        {rule.targetRomaji}
                      </span>
                    </div>

                    <div className="text-lg font-black text-slate-900 font-jp mb-1">
                      {rule.soundRhythm}
                    </div>

                    <p className="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                      {rule.jingleLyric}
                    </p>

                    {/* Sample Verbs */}
                    <div className="space-y-1.5 pt-2 border-t border-slate-200/60">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
                        Contoh Perubahan:
                      </span>
                      {rule.sampleVerbs.map((sample, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between text-xs bg-white/90 p-2 rounded-xl border border-slate-200/70 shadow-2xs"
                        >
                          <div className="min-w-0">
                            <span className="font-jp font-bold text-slate-900">{sample.dictionary}</span>
                            <span className="text-[11px] text-slate-500 ml-1">({sample.reading})</span>
                            <span className="text-[11px] text-indigo-700 font-bold font-jp ml-1.5">
                              ➜ {sample.result}
                            </span>
                          </div>
                          <button
                            onClick={(e) => handleSpeak(sample.result, sample.result, e)}
                            className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors shrink-0 ml-1"
                            title="Dengarkan audio"
                          >
                            <Volume2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}

                      {/* Exception Note if any */}
                      {rule.exception && (
                        <div className="mt-2.5 p-2 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                          <div className="flex items-center gap-1 text-amber-900 font-bold">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>Pengecualian: {rule.exception.word} (iku)</span>
                          </div>
                          <p className="text-[11px] leading-snug">
                            {rule.exception.note}
                          </p>
                          <div className="flex items-center justify-between bg-white p-1.5 rounded-lg border border-amber-200/80 font-jp font-bold">
                            <span>行く (iku) ➜ 行って (itte)</span>
                            <button
                              onClick={(e) => handleSpeak('行って', 'いって', e)}
                              className="p-1 text-amber-800 hover:text-amber-950"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 2: THE 5-VOWEL LADDER (五段活用 - GODAN LADDER) */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-extrabold mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Mengapa Disebut "Godan" (5 Tangga)?</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-jp">
                  Tangga Ajaib 5 Vokal (五段活用 - A, I, U, E, O)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Kata kerja Golongan 1 berubah dengan cara memutar bunyi vokal terakhir melalui 5 baris huruf Jepang: <strong>A, I, U, E, O</strong>.
                </p>
              </div>

              {/* Sample Verb Selector for the Ladder */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-xs font-bold text-slate-500">Uji Kata:</span>
                {[
                  { id: 'kaku', label: '書く (kaku)' },
                  { id: 'nomu', label: '飲む (nomu)' },
                  { id: 'hanasu', label: '話す (hanasu)' },
                  { id: 'kau', label: '買う (kau)' },
                  { id: 'matsu', label: '待つ (matsu)' },
                  { id: 'iku', label: '行く (iku)' },
                ].map((sample) => (
                  <button
                    key={sample.id}
                    onClick={() => setSelectedGodanSampleVerb(sample.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      selectedGodanSampleVerb === sample.id
                        ? 'bg-emerald-600 text-white shadow-sm ring-1 ring-emerald-400'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Ladder Demonstration */}
            {(() => {
              const activeSample = godanLadderSamples[selectedGodanSampleVerb];
              const vowelRowNames = [
                { vowel: 'A', name: 'Baris A (あ段)', tag: 'Negatif Kasual (~ない)', bg: 'from-rose-500 to-red-600', border: 'border-rose-300', lightBg: 'bg-rose-50/80' },
                { vowel: 'I', name: 'Baris I (い段)', tag: 'Bentuk Sopan (~ます / ~たい)', bg: 'from-indigo-500 to-blue-600', border: 'border-indigo-300', lightBg: 'bg-indigo-50/80' },
                { vowel: 'U', name: 'Baris U (う段)', tag: 'Bentuk Kamus Asli (辞書形)', bg: 'from-emerald-500 to-teal-600', border: 'border-emerald-300', lightBg: 'bg-emerald-50/80' },
                { vowel: 'E', name: 'Baris E (え段)', tag: 'Bisa / Sanggup (~る) & Syarat (~ば)', bg: 'from-amber-500 to-orange-600', border: 'border-amber-300', lightBg: 'bg-amber-50/80' },
                { vowel: 'O', name: 'Baris O (お段)', tag: 'Ajakan Kasual (~う / Ayo...)', bg: 'from-purple-500 to-violet-600', border: 'border-purple-300', lightBg: 'bg-purple-50/80' },
              ];

              return (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        Kata yang sedang diamati:
                      </div>
                      <div className="text-2xl font-black text-slate-900 font-jp flex items-baseline gap-2 mt-0.5">
                        <span>{activeSample.kanji}</span>
                        <span className="text-sm font-sans text-slate-500 font-normal">({activeSample.reading} - {activeSample.meaning})</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSpeak(activeSample.kanji, activeSample.reading)}
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                      <span>Dengar Kata Dasar</span>
                    </button>
                  </div>

                  {/* 5 Rows Interactive Grid */}
                  <div className="space-y-2.5">
                    {activeSample.levels.map((lvl, idx) => {
                      const meta = vowelRowNames[idx];
                      return (
                        <div
                          key={idx}
                          className={`p-3.5 sm:p-4 rounded-2xl border ${meta.border} ${meta.lightBg} flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-2xs hover:shadow-sm transition-all`}
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            {/* Vowel Letter Badge */}
                            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${meta.bg} text-white flex flex-col items-center justify-center font-black text-base shadow-sm shrink-0`}>
                              <span>{meta.vowel}</span>
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-black text-slate-900 text-sm font-jp">
                                  {meta.name}
                                </span>
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700">
                                  {meta.tag}
                                </span>
                              </div>
                              <div className="text-xs text-slate-600 mt-0.5">
                                Akar <strong className="font-jp text-slate-900">{activeSample.stem}</strong> + vokal{' '}
                                <strong className="font-jp text-indigo-700 text-sm">{lvl.kana}</strong>{' '}
                                {lvl.ending ? `+ ${lvl.ending}` : ''}
                              </div>
                            </div>
                          </div>

                          {/* Result Word & Meaning */}
                          <div className="flex items-center justify-between md:justify-end gap-3 self-stretch md:self-auto bg-white/80 md:bg-transparent p-2.5 md:p-0 rounded-xl border md:border-0 border-slate-200/60">
                            <div className="text-left md:text-right">
                              <div className="text-base sm:text-lg font-black text-slate-900 font-jp">
                                {lvl.full}
                              </div>
                              <div className="text-[11px] text-slate-500 font-mono">
                                {lvl.romaji} · <span className="text-slate-800 font-semibold">{lvl.meaning}</span>
                              </div>
                            </div>
                            <button
                              onClick={() => handleSpeak(lvl.full, lvl.romaji)}
                              className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-600 hover:text-indigo-600 border border-slate-200 shadow-2xs transition-colors shrink-0 cursor-pointer"
                              title="Dengarkan pelafalan bentuk ini"
                            >
                              <Volume2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: GROUPS GUIDE & TRAP VERBS                                          */}
      {/* ========================================================================= */}
      {activeTab === 'groupsGuide' && (
        <div className="space-y-6">
          {/* How to classify verbs */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
            <h3 className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2 font-jp">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Cara Kilat Mengidentifikasi 3 Golongan Kata Kerja</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Setiap kata kerja dalam bahasa Jepang masuk ke salah satu dari 3 kelompok di bawah ini. Golongan menentukan rumus perubahan yang berlaku!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm pt-2">
              {/* Golongan 1 */}
              <div className="p-4 sm:p-5 rounded-2xl border border-indigo-200 bg-indigo-50/50 space-y-2.5 shadow-2xs">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-indigo-200 text-indigo-900 inline-block border border-indigo-300">
                  Golongan 1: Godan (五段動詞)
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Semua kata kerja yang berakhiran: <strong>u, ku, gu, su, tsu, nu, bu, mu</strong>, atau <strong>ru</strong> yang vokal sebelum <em>ru</em> <u>BUKAN</u> i atau e (contoh: <em>toru, aruku, nomu, kau, matsu</em>).
                </p>
                <div className="text-indigo-950 font-bold text-xs bg-white p-2.5 rounded-xl border border-indigo-200">
                  ✨ Ciri Khas: Akhiran berpindah melalui 5 tangga vokal (A, I, U, E, O).
                </div>
              </div>

              {/* Golongan 2 */}
              <div className="p-4 sm:p-5 rounded-2xl border border-emerald-200 bg-emerald-50/50 space-y-2.5 shadow-2xs">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-200 text-emerald-900 inline-block border border-emerald-300">
                  Golongan 2: Ichidan (一段動詞)
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Kata kerja yang berakhiran <strong>-iru</strong> (seperti <em>miru, okiru</em>) atau <strong>-eru</strong> (seperti <em>taberu, neru, oshieru</em>).
                </p>
                <div className="text-emerald-950 font-bold text-xs bg-white p-2.5 rounded-xl border border-emerald-200">
                  ✨ Ciri Khas: Sangat mudah! Cukup potong <strong>ru</strong> lalu tempelkan akhiran baru (masu, nai, te, ta).
                </div>
              </div>

              {/* Golongan 3 */}
              <div className="p-4 sm:p-5 rounded-2xl border border-purple-200 bg-purple-50/50 space-y-2.5 shadow-2xs">
                <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-200 text-purple-900 inline-block border border-purple-300">
                  Golongan 3: Fukisoku (不規則動詞)
                </span>
                <p className="text-slate-700 leading-relaxed">
                  Hanya ada <strong>2 kata dasar</strong> di seluruh dunia: <strong>する (suru)</strong> dan <strong>くる (kuru)</strong>, beserta kata majemuknya (<em>benkyou suru, motte kuru</em>).
                </p>
                <div className="text-purple-950 font-bold text-xs bg-white p-2.5 rounded-xl border border-purple-200">
                  ✨ Ciri Khas: Bentuk berubah bebas dan harus dihafal spesial (suru ➜ shimasu, kuru ➜ kimasu).
                </div>
              </div>
            </div>
          </div>

          {/* Trap Verbs Section */}
          <div className="bg-white rounded-3xl border border-amber-200/90 shadow-sm p-5 sm:p-7 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 border border-amber-300">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-xl font-black text-slate-900 font-jp">
                  Waspada: Kata Kerja Jebakan (Trap Verbs N5 & N4)!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Kata-kata di bawah ini berakhiran <strong>-iru</strong> atau <strong>-eru</strong>, sehingga tampak seperti Golongan 2. Namun aslinya mereka adalah <strong>Golongan 1 (Godan)</strong>!
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
              {trapVerbsGodan.map((tv, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50/90 transition-all space-y-2 shadow-2xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-slate-900 font-jp">
                      {tv.kanji} <span className="text-xs text-slate-500 font-sans font-normal">({tv.reading})</span>
                    </span>
                    <button
                      onClick={() => handleSpeak(tv.kanji, tv.reading)}
                      className="p-1.5 rounded-lg bg-white hover:bg-amber-100 text-slate-600 hover:text-amber-800 border border-amber-200 cursor-pointer shadow-2xs"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs text-slate-800 font-bold">
                    Arti: {tv.meaning}
                  </div>
                  <div className="text-[11px] text-amber-950 font-mono bg-white p-2 rounded-xl border border-amber-200/80 leading-snug">
                    {tv.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adjective Conjugation Guide */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-4">
            <h3 className="text-base sm:text-xl font-black text-slate-900 font-jp">
              Konjugasi Kata Sifat (い形容詞 & な形容詞)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Di bahasa Jepang, kata sifat juga mengalami perubahan bentuk (positif, negatif, lampau, sambung).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm pt-1">
              {/* I-Keiyoushi */}
              <div className="p-4 sm:p-5 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-3 shadow-2xs">
                <span className="font-extrabold text-slate-900 block text-sm border-b border-amber-200 pb-2">
                  1. Kata Sifat -i (い形容詞)
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside leading-relaxed">
                  <li><strong>Positif Sekarang:</strong> Tetap ~i desu (<em>oishii desu</em>)</li>
                  <li><strong>Negatif Sekarang:</strong> Ganti -i jadi <strong>~kunai</strong> (<em>oishikunai desu</em>)</li>
                  <li><strong>Lampau Positif:</strong> Ganti -i jadi <strong>~katta</strong> (<em>oishikatta desu</em>)</li>
                  <li><strong>Lampau Negatif:</strong> Ganti -i jadi <strong>~kunakatta</strong> (<em>oishikunakatta desu</em>)</li>
                  <li><strong>Sambung (Dan):</strong> Ganti -i jadi <strong>~kute</strong> (<em>oishikute benri</em>)</li>
                </ul>
                <div className="bg-white p-3 rounded-xl border border-amber-200 text-amber-950 text-xs leading-relaxed">
                  <strong>⚠️ Pengecualian Wajib Ingat:</strong> Kata <strong>いい (ii - bagus)</strong> jika diubah ke bentuk lain harus memakai akar <strong>良い (yoi)</strong> ➜ <em>yokunai, yokatta, yokute</em>!
                </div>
              </div>

              {/* Na-Keiyoushi */}
              <div className="p-4 sm:p-5 rounded-2xl border border-rose-200 bg-rose-50/30 space-y-3 shadow-2xs">
                <span className="font-extrabold text-slate-900 block text-sm border-b border-rose-200 pb-2">
                  2. Kata Sifat -na (な形容詞)
                </span>
                <ul className="space-y-1.5 text-slate-700 list-disc list-inside leading-relaxed">
                  <li><strong>Positif Sekarang:</strong> Tambah <strong>~desu</strong> (<em>kirei desu</em>)</li>
                  <li><strong>Negatif Sekarang:</strong> <strong>~dewa arimasen / ~ja nai</strong> (<em>kirei ja nai</em>)</li>
                  <li><strong>Lampau Positif:</strong> <strong>~deshita / ~datta</strong> (<em>kirei deshita</em>)</li>
                  <li><strong>Lampau Negatif:</strong> <strong>~dewa arimasen deshita</strong></li>
                  <li><strong>Sambung (Dan):</strong> Cukup pasang <strong>~de</strong> (<em>kirei de shizuka</em>)</li>
                </ul>
                <div className="bg-white p-3 rounded-xl border border-rose-200 text-rose-950 text-xs leading-relaxed">
                  <strong>⚠️ Pengecualian Waspada:</strong> Kata <strong>綺麗 (kirei - indah/bersih)</strong> dan <strong>嫌い (kirai - benci)</strong> berbunyi -i tapi keduanya adalah KATA SIFAT -NA!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: LATIHAN KILAT KONJUGASI (INTERACTIVE DRILL PRACTICE)                 */}
      {/* ========================================================================= */}
      {activeTab === 'drillPractice' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
            {/* Header with Stats */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-900 text-[11px] font-extrabold mb-1">
                  <Zap className="w-3.5 h-3.5 text-yellow-600" />
                  <span>Interactive Drill Challenge</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-jp">
                  Latihan Kilat Perubahan Bentuk (Konjugasi Drill)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Uji instingmu dalam mengubah kata kerja dan kata sifat. Selesaikan 12 soal tantangan!
                </p>
              </div>

              {/* Scores & Streak Badges */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 border border-orange-200 text-orange-800 text-xs font-bold">
                  <Flame className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>Streak: <strong>{drillStreak}</strong></span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-indigo-800 text-xs font-bold">
                  Skor: <strong>{drillScore}</strong> / {CONJUGATION_DRILL_ITEMS.length}
                </div>
              </div>
            </div>

            {!drillFinished ? (
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-500">
                    <span>Soal #{drillCurrentIndex + 1} dari {CONJUGATION_DRILL_ITEMS.length}</span>
                    <span>{Math.round(((drillCurrentIndex + 1) / CONJUGATION_DRILL_ITEMS.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-indigo-600 rounded-full transition-all duration-300"
                      style={{ width: `${((drillCurrentIndex + 1) / CONJUGATION_DRILL_ITEMS.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Prompt Card */}
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white space-y-3 shadow-lg relative overflow-hidden">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/20 text-indigo-200 text-xs font-bold">
                      {currentDrillItem.groupType}
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-xs font-black">
                      {currentDrillItem.targetFormName}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black font-jp tracking-tight">
                        {currentDrillItem.promptWord}
                      </div>
                      <div className="text-sm text-indigo-200 font-sans mt-0.5">
                        ({currentDrillItem.promptReading}) · Arti: <strong className="text-white">{currentDrillItem.promptMeaning}</strong>
                      </div>
                    </div>
                    <button
                      onClick={() => handleSpeak(currentDrillItem.promptWord, currentDrillItem.promptReading)}
                      className="p-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white transition-all cursor-pointer border border-white/20 shrink-0"
                      title="Dengarkan kata ini"
                    >
                      <Volume2 className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-indigo-100 font-medium pt-2 border-t border-white/10">
                    {currentDrillItem.questionText}
                  </p>
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentDrillItem.options.map((opt, optIdx) => {
                    const isSelected = drillSelectedOption === opt;
                    const isCorrect = opt === currentDrillItem.correctAnswer;
                    let btnStyle = 'bg-white text-slate-800 border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/40';

                    if (drillAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-200 ring-2 ring-emerald-400';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md shadow-rose-200 ring-2 ring-rose-400';
                      } else {
                        btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={drillAnswered}
                        onClick={() => handleSelectDrillOption(opt)}
                        className={`p-4 rounded-2xl border-2 font-jp font-bold text-base sm:text-lg transition-all text-left flex items-center justify-between gap-2 cursor-pointer shadow-2xs ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {drillAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 shrink-0" />}
                        {drillAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Card upon answering */}
                {drillAnswered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3 shadow-2xs"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        {drillSelectedOption === currentDrillItem.correctAnswer ? (
                          <span className="flex items-center gap-1.5 text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-200">
                            <CheckCircle2 className="w-4 h-4" /> Jawaban Tepat!
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs font-black text-rose-700 bg-rose-100 px-3 py-1 rounded-full border border-rose-200">
                            <XCircle className="w-4 h-4" /> Kurang Tepat
                          </span>
                        )}
                      </div>
                      <button
                        onClick={handleNextDrill}
                        className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-indigo-200 transition-all cursor-pointer"
                      >
                        <span>{drillCurrentIndex + 1 === CONJUGATION_DRILL_ITEMS.length ? 'Lihat Hasil' : 'Lanjut Soal Berikutnya'}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      <strong>Penjelasan:</strong> {currentDrillItem.explanation}
                    </div>

                    <div className="text-xs text-amber-950 bg-amber-50 p-2.5 rounded-xl border border-amber-200/80 font-semibold flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>{currentDrillItem.ruleTip}</span>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              /* Drill Finished Summary */
              <div className="py-8 text-center space-y-5 max-w-md mx-auto">
                <div className="w-20 h-20 rounded-3xl bg-indigo-100 text-indigo-600 flex items-center justify-center mx-auto shadow-inner border border-indigo-200">
                  <Award className="w-10 h-10" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-2xl font-black text-slate-900 font-jp">
                    Latihan Konjugasi Selesai!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Kamu telah menyelesaikan semua 12 soal konjugasi.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Skor Akhir</span>
                    <span className="text-2xl font-black text-indigo-600">
                      {drillScore} / {CONJUGATION_DRILL_ITEMS.length}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 font-bold block">Max Streak</span>
                    <span className="text-2xl font-black text-orange-500">
                      {drillMaxStreak} 🔥
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleRestartDrill}
                  className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-md shadow-indigo-200 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ulangi Latihan Dari Awal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
