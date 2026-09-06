import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Volume2,
  Sparkles,
  BookOpen,
  AlertTriangle,
  Search,
  Check,
  ChevronRight,
  Filter,
} from 'lucide-react';
import {
  verbProfiles,
  trapVerbsGodan,
} from '../data/conjugationsData';
import { VerbConjugationProfile, VerbGroup } from '../types';
import { soundManager } from '../utils/audio';

interface ConjugationViewProps {
  speechRate: number;
}

export const ConjugationView: React.FC<ConjugationViewProps> = ({ speechRate }) => {
  const [activeTab, setActiveTab] = useState<'simulator' | 'groupsGuide'>('simulator');
  const [selectedVerbId, setSelectedVerbId] = useState<string>(verbProfiles[0]?.id || 'conj-taberu');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedProfile: VerbConjugationProfile =
    verbProfiles.find((v) => v.id === selectedVerbId) || verbProfiles[0];

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.speakJapanese(text, speechRate);
  };

  // Filter verbs for selector
  const filteredVerbs = verbProfiles.filter((v) => {
    const matchesGroup = filterGroup === 'all' || v.group === filterGroup;
    const matchesSearch =
      searchQuery.trim() === '' ||
      v.dictionary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.meaningId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const getGroupBadge = (group: VerbGroup) => {
    switch (group) {
      case 'godan':
        return { label: 'Golongan 1 (Godan)', color: 'bg-indigo-100 text-indigo-800' };
      case 'ichidan':
        return { label: 'Golongan 2 (Ichidan)', color: 'bg-emerald-100 text-emerald-800' };
      case 'fukisoku':
        return { label: 'Golongan 3 (Tak Beraturan)', color: 'bg-purple-100 text-purple-800' };
      case 'i_keiyoushi':
        return { label: 'Kata Sifat -i (い形容詞)', color: 'bg-amber-100 text-amber-800' };
      case 'na_keiyoushi':
        return { label: 'Kata Sifat -na (な形容詞)', color: 'bg-rose-100 text-rose-800' };
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tata Bahasa: Konjugasi & Perubahan Bentuk (活用 - Katsuyou)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Perubahan Bentuk Kata Kerja & Kata Sifat Jepang
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Pahami sistem perubahan kata kerja (Golongan 1, 2, dan 3) dan kata sifat secara menyeluruh. Waspadai kata kerja jebakan, dan jelajahi simulator 12 bentuk perubahan lengkap dengan contoh kalimat percakapan dan audio.
          </p>
        </div>
      </section>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            id="tab-btn-conj-sim"
            onClick={() => setActiveTab('simulator')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'simulator'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kamus & Simulator Konjugasi</span>
          </button>

          <button
            id="tab-btn-conj-guide"
            onClick={() => setActiveTab('groupsGuide')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'groupsGuide'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Panduan Golongan & Jebakan</span>
          </button>
        </div>
      </div>

      {/* TAB 1: SIMULATOR & PROFILE EXPLORER */}
      {activeTab === 'simulator' && (
        <div className="space-y-6">
          {/* Verb Selector & Filter */}
          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              {/* Group filters */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Golongan:
                </span>
                {[
                  { id: 'all', label: 'Semua' },
                  { id: 'godan', label: 'Gol 1 (Godan)' },
                  { id: 'ichidan', label: 'Gol 2 (Ichidan)' },
                  { id: 'fukisoku', label: 'Gol 3 (Suru/Kuru)' },
                  { id: 'i_keiyoushi', label: 'Sifat -i' },
                  { id: 'na_keiyoushi', label: 'Sifat -na' },
                ].map((g) => (
                  <button
                    key={g.id}
                    id={`filter-conj-group-${g.id}`}
                    onClick={() => setFilterGroup(g.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      filterGroup === g.id
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>

              {/* Search */}
              <div className="relative w-full sm:w-60">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                <input
                  id="conj-search-input"
                  type="text"
                  placeholder="Cari kata (taberu, iku)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-stone-800"
                />
              </div>
            </div>

            {/* Verb Quick Picker Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {filteredVerbs.map((v) => {
                const isSelected = v.id === selectedVerbId;
                return (
                  <button
                    key={v.id}
                    id={`verb-picker-${v.id}`}
                    onClick={() => setSelectedVerbId(v.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 ring-2 ring-indigo-500'
                        : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span className="font-serif font-bold text-sm sm:text-base">{v.dictionary}</span>
                    <span className="opacity-80 text-xs">({v.reading})</span>
                    <span className="text-[11px] opacity-70">· {v.meaningId}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected Verb Hero Card */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
              <div className="flex items-center gap-4">
                {/* Big Display Badge */}
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white flex flex-col items-center justify-center shadow-lg font-bold">
                  <span className="text-2xl leading-none font-serif">{selectedProfile.dictionary}</span>
                  <span className="text-[10px] tracking-wider uppercase opacity-90 mt-1">
                    {selectedProfile.reading}
                  </span>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-stone-900 font-serif">
                      {selectedProfile.dictionary} ({selectedProfile.reading})
                    </h2>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        getGroupBadge(selectedProfile.group).color
                      }`}
                    >
                      {getGroupBadge(selectedProfile.group).label}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-stone-100 text-stone-700">
                      JLPT {selectedProfile.level}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-stone-600 font-medium">
                    Arti: <strong className="text-stone-900">{selectedProfile.meaningId}</strong>
                  </p>
                </div>
              </div>

              {/* Pronunciation button */}
              <button
                id="btn-speak-selected-verb"
                onClick={() => handleSpeak(selectedProfile.dictionary)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold text-sm transition-all self-start sm:self-auto"
              >
                <Volume2 className="w-5 h-5" />
                <span>Dengarkan Pelafalan</span>
              </button>
            </div>

            {/* Exception Warning Banner if any */}
            {selectedProfile.isException && selectedProfile.exceptionNote && (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                  <strong className="font-bold text-amber-900 block mb-0.5">
                    Peringatan Aturan Khusus / Jebakan:
                  </strong>
                  {selectedProfile.exceptionNote}
                </div>
              </div>
            )}

            {/* Conjugation Forms Grid */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Tabel 12+ Bentuk Perubahan Lengkap
                </h3>
                <span className="text-xs text-stone-400">
                  Klik ikon speaker pada tiap baris untuk mendengarkan audio
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedProfile.forms.map((form) => (
                  <div
                    key={form.formKey}
                    id={`form-row-${selectedProfile.id}-${form.formKey}`}
                    className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 hover:bg-white hover:border-indigo-200 hover:shadow-sm transition-all space-y-2.5"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                        {form.formName}
                      </span>
                      <button
                        id={`audio-form-${selectedProfile.id}-${form.formKey}`}
                        onClick={() => handleSpeak(form.japanese)}
                        title="Dengar pengucapan bentuk ini"
                        className="p-1.5 rounded-lg bg-white hover:bg-indigo-50 text-stone-500 hover:text-indigo-600 transition-colors border border-stone-200"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Form Word Display */}
                    <div>
                      <div className="text-lg font-bold text-stone-900 font-serif">
                        {form.japanese}
                      </div>
                      <div className="text-xs text-stone-500 italic">
                        {form.reading}
                      </div>
                      <div className="text-xs text-stone-700 font-medium">
                        Makna: <span className="text-stone-900">{form.meaningId}</span>
                      </div>
                    </div>

                    {/* Rule explanation */}
                    {form.ruleExplanation && (
                      <div className="text-[11px] text-stone-500 bg-white p-2 rounded-lg border border-stone-150">
                        <strong>Rumus:</strong> {form.ruleExplanation}
                      </div>
                    )}

                    {/* Example Sentence */}
                    <div className="bg-white p-2.5 rounded-lg border border-stone-200 flex items-start justify-between gap-2">
                      <div className="space-y-0.5 text-left text-xs">
                        <div className="font-semibold text-stone-900 font-serif">
                          {form.exampleJp}
                        </div>
                        <div className="text-stone-600">
                          {form.exampleId}
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(form.exampleJp)}
                        title="Dengar audio contoh kalimat"
                        className="p-1.5 rounded-md hover:bg-stone-100 text-stone-500 shrink-0"
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

      {/* TAB 2: GROUPS GUIDE & TRAP VERBS */}
      {activeTab === 'groupsGuide' && (
        <div className="space-y-6">
          {/* How to classify verbs */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>Cara Cepat Membedakan 3 Golongan Kata Kerja</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs sm:text-sm">
              {/* Golongan 1 */}
              <div className="p-4 rounded-xl border border-indigo-200 bg-indigo-50/50 space-y-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-200 text-indigo-900 inline-block">
                  Golongan 1: Godan (五段)
                </span>
                <p className="text-stone-700">
                  Semua kata kerja berakhiran <strong>u, ku, gu, su, tsu, nu, bu, mu</strong>, atau <strong>ru</strong> yang vokal sebelum ru BUKAN i atau e (seperti toru, aruku, nomu).
                </p>
                <div className="text-indigo-900 font-medium text-xs bg-white p-2 rounded border border-indigo-100">
                  Ciri: Mengalami pergeseran 5 vokal (a, i, u, e, o).
                </div>
              </div>

              {/* Golongan 2 */}
              <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-200 text-emerald-900 inline-block">
                  Golongan 2: Ichidan (一段)
                </span>
                <p className="text-stone-700">
                  Kata kerja berakhiran <strong>-iru</strong> (seperti miru, okiru) atau <strong>-eru</strong> (seperti taberu, neru, oshieru).
                </p>
                <div className="text-emerald-900 font-medium text-xs bg-white p-2 rounded border border-emerald-100">
                  Ciri: Konjugasi super mudah, cukup buang <em>ru</em> lalu tempelkan akhiran!
                </div>
              </div>

              {/* Golongan 3 */}
              <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50 space-y-2">
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-200 text-purple-900 inline-block">
                  Golongan 3: Fukisoku (不規則)
                </span>
                <p className="text-stone-700">
                  Hanya ada <strong>2 kata dasar</strong> di seluruh dunia: <strong>する (suru)</strong> dan <strong>くる (kuru)</strong>, beserta kata benda + suru (benkyou suru, dll.).
                </p>
                <div className="text-purple-900 font-medium text-xs bg-white p-2 rounded border border-purple-100">
                  Ciri: Bentuk berubah drastis dan wajib dihafal spesial.
                </div>
              </div>
            </div>
          </div>

          {/* Trap Verbs Section */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-stone-900">
                  Waspada: Kata Kerja Jebakan (Trap Verbs)!
                </h3>
                <p className="text-xs sm:text-sm text-stone-500">
                  Kata-kata di bawah ini berakhiran <strong>-iru</strong> atau <strong>-eru</strong>, tetapi <strong>BUKAN</strong> Golongan 2! Mereka adalah kata kerja <strong>Golongan 1 (Godan)</strong>.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {trapVerbsGodan.map((tv, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 hover:bg-amber-50 transition-colors space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-black text-stone-900 font-serif">
                      {tv.kanji} <span className="text-xs text-stone-500 font-sans font-normal">({tv.reading})</span>
                    </span>
                    <button
                      onClick={() => handleSpeak(tv.kanji)}
                      className="p-1.5 rounded bg-white hover:bg-amber-100 text-stone-600 hover:text-amber-700 border border-amber-200"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-xs text-stone-700 font-semibold">
                    Arti: {tv.meaning}
                  </div>
                  <div className="text-[11px] text-amber-900 font-mono bg-white/80 p-1.5 rounded border border-amber-200/80">
                    {tv.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adjective Conjugation Guide */}
          <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-5 sm:p-6 space-y-4">
            <h3 className="text-base sm:text-lg font-bold text-stone-900">
              Konjugasi Kata Sifat (い形容詞 & な形容詞)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* I-Keiyoushi */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                <span className="font-bold text-stone-900 block text-sm">
                  1. Kata Sifat -i (い形容詞)
                </span>
                <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                  <li><strong>Positif Sekarang:</strong> ~i desu (oishii desu)</li>
                  <li><strong>Negatif Sekarang:</strong> Ganti -i jadi <strong>~kunai</strong> (oishikunai desu)</li>
                  <li><strong>Lampau Positif:</strong> Ganti -i jadi <strong>~katta</strong> (oishikatta desu)</li>
                  <li><strong>Lampau Negatif:</strong> Ganti -i jadi <strong>~kunakatta</strong> (oishikunakatta desu)</li>
                  <li><strong>Sambung (Dan):</strong> Ganti -i jadi <strong>~kute</strong> (oishikute)</li>
                </ul>
                <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 text-amber-950 text-xs">
                  <strong>Pengecualian Penting:</strong> Kata <strong>いい (ii - bagus)</strong> jika diubah ke bentuk lain wajib memakai dasar <strong>良い (yoi)</strong> → <em>yokunai, yokatta, yokute</em>!
                </div>
              </div>

              {/* Na-Keiyoushi */}
              <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3">
                <span className="font-bold text-stone-900 block text-sm">
                  2. Kata Sifat -na (な形容詞)
                </span>
                <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                  <li><strong>Positif Sekarang:</strong> ~desu (kirei desu)</li>
                  <li><strong>Negatif Sekarang:</strong> <strong>~dewa arimasen / ~ja nai</strong> (kirei ja nai)</li>
                  <li><strong>Lampau Positif:</strong> <strong>~deshita / ~datta</strong> (kirei deshita)</li>
                  <li><strong>Lampau Negatif:</strong> <strong>~dewa arimasen deshita</strong></li>
                  <li><strong>Sambung (Dan):</strong> Cukup pasang <strong>~de</strong> (kirei de shizuka)</li>
                </ul>
                <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200 text-rose-950 text-xs">
                  <strong>Pengecualian Waspada:</strong> Kata <strong>綺麗 (kirei - indah/bersih)</strong> dan <strong>嫌い (kirai - benci)</strong> berbunyi -i tapi keduanya adalah Kata Sifat -NA!
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
