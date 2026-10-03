import React, { useMemo, useState } from 'react';
import {
  BookOpen,
  GraduationCap,
  ArrowRight,
  Volume2,
  PenTool,
  Search,
  Sparkles,
  ChevronRight,
  Compass,
  FileText,
  Headphones,
  Layers,
  Heart,
  Briefcase,
  Plane,
} from 'lucide-react';
import { CardItem, MainCategory, StudyMode, UserStats } from '../types';
import { kanjiData } from '../data/kanjiData';
import { vocabData } from '../data/vocabData';
import { soundManager } from '../utils/audio';

interface HomePortalViewProps {
  onSelectCategory: (category: MainCategory) => void;
  onStartPractice: (category: MainCategory, mode: StudyMode, subCategory?: string) => void;
  speechRate: number;
  stats: UserStats;
  onOpenGlobalSearch: () => void;
  onOpenRoadmapModal: () => void;
  onPracticeWriting: (item: CardItem) => void;
}

export const HomePortalView: React.FC<HomePortalViewProps> = ({
  onSelectCategory,
  onStartPractice,
  speechRate,
  onOpenGlobalSearch,
  onOpenRoadmapModal,
  onPracticeWriting,
}) => {
  const [isPlayingKotoba, setIsPlayingKotoba] = useState(false);

  // Time-aware gentle greeting (tanpa streak)
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 11) {
      return {
        jp: 'おはようございます',
        romaji: 'Ohayou gozaimasu',
        id: 'Selamat Pagi',
        icon: '🌅',
      };
    } else if (hour >= 11 && hour < 18) {
      return {
        jp: 'こんにちは',
        romaji: 'Konnichiwa',
        id: 'Selamat Siang',
        icon: '☀️',
      };
    } else {
      return {
        jp: 'こんばんは',
        romaji: 'Konbanwa',
        id: 'Selamat Malam',
        icon: '🌙',
      };
    }
  }, []);

  // Deterministic daily kanji & kotoba (santai & berganti tiap hari tanpa target streak)
  const { kanjiOfTheDay, kotobaOfTheDay } = useMemo(() => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const k = kanjiData[dayOfYear % kanjiData.length] || kanjiData[0];
    const v = vocabData[(dayOfYear * 17) % vocabData.length] || vocabData[0];
    return { kanjiOfTheDay: k, kotobaOfTheDay: v };
  }, []);

  const handlePlayKotoba = () => {
    if (!kotobaOfTheDay) return;
    setIsPlayingKotoba(true);
    soundManager.speak(kotobaOfTheDay.japanese, speechRate);
    setTimeout(() => setIsPlayingKotoba(false), 1200);
  };

  const handlePlayKanji = () => {
    if (!kanjiOfTheDay) return;
    soundManager.speak(kanjiOfTheDay.japanese, speechRate);
  };

  // Last studied category
  const lastStudied = useMemo(() => {
    try {
      const savedCat = localStorage.getItem('nihongo_last_active_category') as MainCategory | null;
      if (savedCat && savedCat !== 'home' && savedCat !== 'search') {
        const names: Partial<Record<MainCategory, string>> = {
          minna: 'Minna no Nihongo (Bab 1–50)',
          irodori: 'Irodori Can-Do (A1–A2)',
          ssw: 'Materi Kerja SSW 12 Sektor',
          tryjlpt: 'TRY! JLPT N3 Tata Bahasa',
          shinkanzen: 'Shin Kanzen Master N3',
          soumatome: 'Nihongo Sou-matome N3',
          tobira: 'Tobira Gateway to Advanced',
          quartet: 'Quartet Intermediate',
          phrases: 'Tata Bahasa & Pola Kalimat',
          kanji: 'Kanji (N5–N3)',
          vocab: 'Kosakata Komprehensif',
          particles: '20 Partikel 助詞',
          conjugation: '14 Konjugasi Kata Kerja',
          dokkai: 'Membaca Dokkai (N1–N3)',
          choukai: 'Menyimak Choukai (N1–N3)',
          hiragana: 'Huruf Hiragana',
          katakana: 'Huruf Katakana',
        };
        return {
          cat: savedCat,
          name: names[savedCat] || savedCat,
        };
      }
    } catch {
      // ignore
    }
    return null;
  }, []);

  return (
    <div className="flex flex-col gap-6 sm:gap-8 max-w-5xl mx-auto pb-16">
      {/* 1. WELCOMING HERO BANNER */}
      <section className="relative overflow-hidden rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs p-6 sm:p-9 transition-colors">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-2.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xl">{greeting.icon}</span>
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 tracking-wider uppercase font-mono">
                {greeting.jp} &bull; {greeting.id}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-slate-100 tracking-tight leading-tight">
              Ruang Belajar Bahasa Jepang
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Belajar dengan tenang dan santai sesuai kecepatanmu sendiri. Tanpa target harian yang membebani. Pilih materi yang ingin kamu pelajari hari ini.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <button
                onClick={onOpenRoadmapModal}
                className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs border border-transparent dark:border-slate-700 active:scale-95"
              >
                <GraduationCap className="w-4 h-4 text-rose-400" />
                <span>Panduan Urutan Belajar (Roadmap)</span>
              </button>
              <button
                onClick={onOpenGlobalSearch}
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-transparent dark:border-slate-700 active:scale-95"
              >
                <Search className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span>Cari Kata &amp; Terjemahan</span>
              </button>
            </div>
          </div>

          {/* Quick Last Studied Resume Card */}
          {lastStudied ? (
            <div className="shrink-0 bg-rose-50/80 dark:bg-rose-950/40 border border-rose-200/90 dark:border-rose-900/60 p-4 sm:p-5 rounded-2xl flex flex-col gap-2.5 max-w-xs shadow-3xs">
              <span className="text-[11px] font-extrabold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Terakhir Kamu Buka</span>
              </span>
              <h4 className="text-sm font-black text-slate-900 dark:text-slate-100 leading-snug">
                {lastStudied.name}
              </h4>
              <button
                onClick={() => onSelectCategory(lastStudied.cat)}
                className="mt-1 px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-3xs active:scale-95"
              >
                <span>Lanjutkan Sekarang</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="shrink-0 hidden md:flex flex-col items-center justify-center p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800 text-center max-w-[220px]">
              <span className="text-3xl mb-2">🍵</span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Santai &amp; Menyenangkan
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-normal">
                Kuasai bahasa Jepang secara bertahap tanpa rasa terburu-buru.
              </p>
            </div>
          )}
        </div>

        {/* Japanese subtle watermark */}
        <div className="absolute right-4 -bottom-6 font-jp text-9xl font-black text-slate-900/[0.03] dark:text-white/[0.02] select-none pointer-events-none">
          日本語
        </div>
      </section>

      {/* 2. TIGA PINTU UTAMA BELAJAR */}
      <section className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>🎯 Pilih Tujuan Belajarmu</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Materi dikelompokkan berdasarkan tujuan nyata agar kamu langsung tahu harus mulai dari mana
            </p>
          </div>
          <button
            onClick={onOpenRoadmapModal}
            className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 underline cursor-pointer hidden sm:block"
          >
            Lihat Urutan Lengkap &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* PINTU 1: KERJA DI JEPANG (SSW & JFT-BASIC A2) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-amber-200/90 dark:border-amber-900/60 hover:border-amber-400 dark:hover:border-amber-600 p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 flex items-center justify-center font-bold text-xl">
                  🛫
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
                  Kerja di Jepang
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-slate-100 text-base group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Kerja &amp; Tinggal di Jepang
                </h4>
                <p className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mt-0.5">
                  JFT-Basic (A2) &amp; SSW Tokutei Ginou
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Kuasai percakapan situasi nyata sehari-hari di Jepang (Irodori Can-Do) dan istilah teknis di 12 sektor kerja resmi (Kaigo, Restoran, Manufaktur, dll).
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onSelectCategory('irodori')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-xs flex items-center justify-between transition-colors cursor-pointer shadow-3xs"
              >
                <span>Irodori Can-Do (18 Topik)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectCategory('ssw')}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <span>Materi 12 Sektor SSW</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* PINTU 2: FONDASI LENGKAP MINNA NO NIHONGO (BAB 1–50) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-200/90 dark:border-emerald-900/60 hover:border-emerald-400 dark:hover:border-emerald-600 p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center font-bold text-xl">
                  🔰
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                  Pemula N5 – N4
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-slate-100 text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Fondasi Minna no Nihongo
                </h4>
                <p className="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-0.5">
                  Standar Dunia Bab 1–50 Lengkap
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Mulai dari dasar dengan 50 bab lengkap (*Bunkei*, *Reibun*, *Kaiwa*), penguasaan 20 partikel ujian (*wa, ga, ni, de*), serta 14 bentuk konjugasi verba.
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onSelectCategory('minna')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs flex items-center justify-between transition-colors cursor-pointer shadow-3xs"
              >
                <span>Buka Bab 1–50 Lengkap</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectCategory('conjugation')}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <span>14 Konjugasi Kata Kerja</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>

          {/* PINTU 3: SPESIALIS UJIAN RESMI JLPT (N3 – N1) */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-blue-200/90 dark:border-blue-900/60 hover:border-blue-400 dark:hover:border-blue-600 p-5 sm:p-6 transition-all hover:shadow-md flex flex-col justify-between gap-5 group">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-center font-bold text-xl">
                  🎯
                </div>
                <span className="text-[10px] font-black px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
                  Ujian N3 – N1
                </span>
              </div>
              <div>
                <h4 className="font-black text-slate-900 dark:text-slate-100 text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  Spesialis Ujian JLPT
                </h4>
                <p className="text-[11px] font-semibold text-blue-700 dark:text-blue-400 mt-0.5">
                  TRY! N3, Shin Kanzen &amp; Wacana N1
                </p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bedah soal ujian resmi JLPT N3 dengan tata bahasa berbasis cerita (TRY!), analisis jebakan nuansa (Shin Kanzen), serta latihan wacana berita (Dokkai).
              </p>
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => onSelectCategory('tryjlpt')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold text-xs flex items-center justify-between transition-colors cursor-pointer shadow-3xs"
              >
                <span>TRY! JLPT N3 Resmi</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onSelectCategory('shinkanzen')}
                className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-between border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
              >
                <span>Shin Kanzen Master N3</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INSPIRASI SANTAI HARI INI */}
      <section className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <span>🌸 Inspirasi Hari Ini</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Kenali 1 karakter dan 1 kata baru secara santai sambil mendengarkan suaranya
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* KANJI HARI INI */}
          {kanjiOfTheDay && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-100 dark:border-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-jp text-3xl sm:text-4xl font-bold shrink-0 shadow-3xs">
                    {kanjiOfTheDay.japanese}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300">
                        Level {kanjiOfTheDay.level || 'N5'}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">
                        {kanjiOfTheDay.strokes} Coretan
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                      {kanjiOfTheDay.meaningId}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-jp">
                      {kanjiOfTheDay.onyomi || kanjiOfTheDay.kunyomi || kanjiOfTheDay.reading}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handlePlayKanji}
                  className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Dengarkan cara baca kanji"
                  aria-label="Putar suara pelafalan kanji"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {kanjiOfTheDay.mnemonic && (
                <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800">
                  <span className="font-bold text-slate-800 dark:text-slate-100">Jembatan Ingatan:</span> {kanjiOfTheDay.mnemonic}
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                  Contoh: {kanjiOfTheDay.exampleJp || '—'}
                </span>
                <button
                  onClick={() => onPracticeWriting(kanjiOfTheDay)}
                  className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 active:scale-95"
                >
                  <PenTool className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                  <span>Coba Tulis di Canvas</span>
                </button>
              </div>
            </div>
          )}

          {/* KOTOBA HARI INI */}
          {kotobaOfTheDay && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 p-5 sm:p-6 shadow-xs flex flex-col justify-between gap-4 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
                      Level {kotobaOfTheDay.level || 'N5'}
                    </span>
                    <span className="text-xs text-slate-400 dark:text-slate-500">
                      Kosakata Pilihan
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-100 font-jp">
                      {kotobaOfTheDay.japanese}
                    </h4>
                    {kotobaOfTheDay.furigana && (
                      <span className="text-xs text-rose-600 dark:text-rose-400 font-jp">
                        ({kotobaOfTheDay.furigana})
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    {kotobaOfTheDay.reading}
                  </p>
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {kotobaOfTheDay.meaningId}
                  </p>
                </div>

                <button
                  onClick={handlePlayKotoba}
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isPlayingKotoba
                      ? 'bg-rose-500 text-white scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/60 text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400'
                  }`}
                  title="Dengarkan pelafalan asli"
                  aria-label="Putar audio kosakata"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>

              {kotobaOfTheDay.exampleJp && (
                <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-100 dark:border-slate-800 flex flex-col gap-0.5">
                  <span className="font-jp text-slate-800 dark:text-slate-100 font-medium">
                    {kotobaOfTheDay.exampleJp}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[11px]">
                    {kotobaOfTheDay.exampleId}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  Kategori: {kotobaOfTheDay.subCategory?.replace(/_/g, ' ') || 'Umum'}
                </span>
                <button
                  onClick={() => onSelectCategory('vocab')}
                  className="px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 active:scale-95"
                >
                  <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  <span>Koleksi 4.200+ Kata &rarr;</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. RAK AKSES CEPAT (QUICK TOOLS SHELF) */}
      <section className="flex flex-col gap-3.5">
        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>📚 Rak Referensi Cepat</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Akses langsung ke kamus kanji, kosakata, partikel, dan huruf tanpa perlu mencari-cari
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Kanji */}
          <button
            onClick={() => onSelectCategory('kanji')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-rose-50/50 dark:hover:bg-rose-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-rose-300 dark:hover:border-rose-700 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-3xs hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              ㊗️
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                650 Kanji Lengkap
              </h5>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Stroke order &amp; mnemonic
              </p>
            </div>
          </button>

          {/* Kosakata */}
          <button
            onClick={() => onSelectCategory('vocab')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-3xs hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              📖
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                4.200+ Kosakata
              </h5>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Flashcard santai &amp; audio
              </p>
            </div>
          </button>

          {/* Partikel */}
          <button
            onClick={() => onSelectCategory('particles')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-emerald-50/50 dark:hover:bg-emerald-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-300 dark:hover:border-emerald-700 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-3xs hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              📎
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                20 Partikel Kunci
              </h5>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Bedah は, が, に, で
              </p>
            </div>
          </button>

          {/* Kana */}
          <button
            onClick={() => onSelectCategory('hiragana')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 border border-slate-200/90 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700 text-left transition-all cursor-pointer flex flex-col justify-between gap-2 shadow-3xs hover:shadow-xs group"
          >
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center font-bold text-lg group-hover:scale-105 transition-transform">
              🌸
            </div>
            <div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Huruf Kana Dasar
              </h5>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Hiragana &amp; Katakana 100%
              </p>
            </div>
          </button>
        </div>
      </section>
    </div>
  );
};
