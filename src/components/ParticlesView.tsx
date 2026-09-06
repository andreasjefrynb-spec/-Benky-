import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Volume2,
  Search,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { particlesList, particleComparisons } from '../data/particlesData';
import { ParticleItem, ParticleComparison } from '../types';
import { soundManager } from '../utils/audio';

interface ParticlesViewProps {
  speechRate: number;
}

// Latihan Soal Cepat Partikel
const practiceQuestions = [
  {
    id: 'pq-1',
    sentence: '私___インドネシア人です。',
    reading: 'watashi ___ indoneshia-jin desu',
    translation: 'Saya adalah orang Indonesia.',
    correct: 'は',
    options: ['は', 'が', 'を', 'に'],
    explanation: 'Partikel は (wa) digunakan untuk menandai topik utama pembicaraan ("Adapun tentang saya...").',
  },
  {
    id: 'pq-2',
    sentence: '毎朝、コーヒー___飲みます。',
    reading: 'maiasa, koohii ___ nomimasu',
    translation: 'Setiap pagi, saya meminum kopi.',
    correct: 'を',
    options: ['を', 'に', 'で', 'が'],
    explanation: 'Partikel を (o) digunakan untuk menandai objek penderita langsung dari kata kerja transitif (minum).',
  },
  {
    id: 'pq-3',
    sentence: '図書館___本を読みます。',
    reading: 'toshokan ___ hon o yomimasu',
    translation: 'Saya membaca buku di perpustakaan.',
    correct: 'で',
    options: ['で', 'に', 'へ', 'を'],
    explanation: 'Partikel で (de) digunakan untuk tempat berlangsungnya aktivitas dinamis (membaca buku).',
  },
  {
    id: 'pq-4',
    sentence: '机の上に猫___います。',
    reading: 'tsukue no ue ni neko ___ imasu',
    translation: 'Di atas meja ada seekor kucing.',
    correct: 'が',
    options: ['が', 'を', 'で', 'に'],
    explanation: 'Untuk keberadaan benda/makhluk hidup dengan います / あります, subjek yang ada ditandai dengan が (ga).',
  },
  {
    id: 'pq-5',
    sentence: '毎朝7時___起きます。',
    reading: 'maiasa shichiji ___ okimasu',
    translation: 'Setiap pagi saya bangun pada pukul 7.',
    correct: 'に',
    options: ['に', 'で', 'へ', 'を'],
    explanation: 'Waktu yang memiliki angka pasti (jam, hari, tanggal) menggunakan partikel に (ni).',
  },
  {
    id: 'pq-6',
    sentence: '明日、京都___行きます。',
    reading: 'ashita, Kyouto ___ ikimasu',
    translation: 'Besok saya akan pergi menuju ke Kyoto.',
    correct: 'へ',
    options: ['へ', 'で', 'を', 'から'],
    explanation: 'Partikel へ (e) menunjukkan arah pergerakan haluan menuju ke suatu tempat tujuan.',
  },
  {
    id: 'pq-7',
    sentence: '財布に千円___ありません。',
    reading: 'saifu ni sen-en ___ arimasen',
    translation: 'Di dompet saya hanya tersisa 1.000 yen saja (merasa sedikit).',
    correct: 'しか',
    options: ['しか', 'だけ', 'も', 'より'],
    explanation: 'Partikel しか (shika) wajib berpasangan dengan bentuk negatif (ありません) dan bermakna rasa kurang.',
  },
  {
    id: 'pq-8',
    sentence: '明日___レポートを出してください。',
    reading: 'ashita ___ repooto o dashite kudasai',
    translation: 'Kumpulkan laporannya paling lambat sebelum hari esok.',
    correct: 'までに',
    options: ['までに', 'まで', 'から', 'に'],
    explanation: 'Partikel までに (made ni) menandakan tenggat batas waktu (deadline) tindakan harus selesai sebelum waktu tersebut.',
  },
];

export const ParticlesView: React.FC<ParticlesViewProps> = ({ speechRate }) => {
  const [activeTab, setActiveTab] = useState<'catalog' | 'comparisons' | 'practice'>('catalog');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedParticleId, setExpandedParticleId] = useState<string | null>('part-wa');

  // Practice state
  const [currentQuizIdx, setCurrentQuizIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Filter particles
  const filteredParticles = particlesList.filter((item) => {
    const matchesGroup = selectedGroup === 'all' || item.group === selectedGroup;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.particle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.nameId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    soundManager.speakJapanese(text, speechRate);
  };

  const handleSelectQuizOption = (opt: string) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(opt);
  };

  const handleCheckQuizAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    const q = practiceQuestions[currentQuizIdx];
    if (selectedOption === q.correct) {
      soundManager.playCorrect();
      setQuizScore((prev) => prev + 1);
    } else {
      soundManager.playWrong();
    }
  };

  const handleNextQuizQuestion = () => {
    if (currentQuizIdx < practiceQuestions.length - 1) {
      setCurrentQuizIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuizIdx(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setQuizScore(0);
    setIsQuizFinished(false);
  };

  const currentQ = practiceQuestions[currentQuizIdx];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-r from-rose-700 via-rose-800 to-amber-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-semibold tracking-wide uppercase">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Tata Bahasa Inti: Partikel (助詞 - Joshi)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
            Kuasai Partikel Bahasa Jepang Secara Mudah & Mendalam
          </h1>
          <p className="text-rose-100 text-sm sm:text-base leading-relaxed">
            Partikel adalah <strong className="text-white">"perekat kalimat"</strong> yang menentukan peran setiap kata: siapa yang bertindak, di mana dilakukan, dengan apa, dan kapan. Pahami perbedaan krusial seperti <span className="underline decoration-amber-300 font-bold">は vs が</span> dan <span className="underline decoration-amber-300 font-bold">に vs で</span> dengan mudah.
          </p>
        </div>
      </section>

      {/* Main Tab Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-3">
        <div className="flex items-center gap-2 overflow-x-auto py-1">
          <button
            id="tab-btn-catalog"
            onClick={() => setActiveTab('catalog')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'catalog'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Bagan & Penjelasan Partikel</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500 text-white">
              {particlesList.length}
            </span>
          </button>

          <button
            id="tab-btn-comparisons"
            onClick={() => setActiveTab('comparisons')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'comparisons'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Perbandingan Membingungkan (VS)</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500 text-white">
              {particleComparisons.length}
            </span>
          </button>

          <button
            id="tab-btn-practice"
            onClick={() => setActiveTab('practice')}
            className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'practice'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-200'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Latihan Cepat</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-600 text-white">
              8 Soal
            </span>
          </button>
        </div>
      </div>

      {/* TAB 1: CATALOG & EXPLANATIONS */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* Filters & Search */}
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between bg-stone-50 p-4 rounded-xl border border-stone-200">
            {/* Category Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-stone-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Kelompok:
              </span>
              {[
                { id: 'all', label: 'Semua' },
                { id: 'inti', label: 'Inti (は・が・を)' },
                { id: 'tempat_arah', label: 'Tempat & Arah (に・で・へ)' },
                { id: 'korelasi_jumlah', label: 'Korelasi & Pilihan' },
                { id: 'waktu_batas', label: 'Waktu & Batas' },
                { id: 'akhir_kalimat', label: 'Akhir Kalimat (か・ね・よ)' },
              ].map((g) => (
                <button
                  key={g.id}
                  id={`filter-group-${g.id}`}
                  onClick={() => setSelectedGroup(g.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedGroup === g.id
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white text-stone-700 border border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                id="particle-search-input"
                type="text"
                placeholder="Cari partikel (wa, ga, を)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm bg-white border border-stone-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 text-stone-800"
              />
            </div>
          </div>

          {/* Particle List Cards */}
          <div className="space-y-4">
            {filteredParticles.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-stone-200">
                <p className="text-stone-500 text-sm">Tidak ada partikel yang cocok dengan pencarian.</p>
              </div>
            ) : (
              filteredParticles.map((item) => {
                const isExpanded = expandedParticleId === item.id;
                return (
                  <div
                    key={item.id}
                    id={`particle-card-${item.id}`}
                    className="scroll-mt-24 bg-white rounded-2xl border border-stone-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
                  >
                    {/* Header Row */}
                    <div
                      onClick={() => setExpandedParticleId(isExpanded ? null : item.id)}
                      className="p-4 sm:p-5 flex items-center justify-between cursor-pointer select-none bg-stone-50/50 hover:bg-stone-100/50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        {/* Big Character Badge */}
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex flex-col items-center justify-center shadow-md font-bold shrink-0">
                          <span className="text-2xl leading-none font-serif">{item.particle}</span>
                          <span className="text-[10px] tracking-wider uppercase opacity-90">{item.romaji}</span>
                        </div>

                        {/* Title & Level */}
                        <div className="space-y-1 min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-stone-900">
                              {item.nameId}
                            </h3>
                            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800">
                              {item.level}
                            </span>
                            <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-stone-100 text-stone-600">
                              {item.group === 'inti'
                                ? 'Partikel Inti'
                                : item.group === 'tempat_arah'
                                ? 'Tempat & Arah'
                                : item.group === 'waktu_batas'
                                ? 'Waktu & Batas'
                                : item.group === 'korelasi_jumlah'
                                ? 'Korelasi & Pilihan'
                                : 'Akhir Kalimat'}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-stone-600 max-w-2xl leading-relaxed break-words">
                            {item.summary}
                          </p>
                        </div>
                      </div>

                      {/* Right Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          id={`audio-btn-${item.id}`}
                          onClick={(e) => handleSpeak(item.particle, e)}
                          title="Dengar pelafalan audio"
                          className="p-2.5 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-colors"
                        >
                          <Volume2 className="w-5 h-5" />
                        </button>
                        <span className="text-xs font-semibold text-rose-600 hidden sm:inline">
                          {isExpanded ? 'Tutup Detail ▲' : 'Lihat Rumus & Contoh ▼'}
                        </span>
                      </div>
                    </div>

                    {/* Expandable Detail Section */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-stone-200 p-5 sm:p-6 space-y-5 bg-white"
                        >
                          {/* Mnemonic / Tips Box */}
                          {item.tips && (
                            <div className="bg-amber-50 border-l-4 border-amber-500 p-3.5 rounded-r-xl flex items-start gap-3">
                              <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                              <div className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                                <strong className="font-semibold text-amber-900 block mb-0.5">
                                  Trik Mengingat (Mnemonic):
                                </strong>
                                {item.tips}
                              </div>
                            </div>
                          )}

                          {/* Functions List */}
                          <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                              Fungsi & Pola Kalimat
                            </h4>

                            <div className="grid grid-cols-1 gap-4">
                              {item.functions.map((fn, idx) => (
                                <div
                                  key={idx}
                                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 space-y-3"
                                >
                                  {/* Title & Formula */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    <span className="text-sm font-bold text-stone-900">
                                      {fn.title}
                                    </span>
                                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-rose-50 text-rose-700 border border-rose-200">
                                      {fn.formula}
                                    </span>
                                  </div>

                                  <p className="text-xs sm:text-sm text-stone-700">
                                    {fn.explanation}
                                  </p>

                                  {/* Examples */}
                                  <div className="space-y-2 pt-1">
                                    {fn.examples.map((ex, exIdx) => (
                                      <div
                                        key={exIdx}
                                        className="bg-white p-3 rounded-lg border border-stone-200 flex items-start justify-between gap-3"
                                      >
                                        <div className="space-y-1 text-left">
                                          <div className="text-sm sm:text-base font-medium text-stone-900 font-serif">
                                            {ex.jp}
                                          </div>
                                          <div className="text-xs text-stone-500 italic">
                                            {ex.reading}
                                          </div>
                                          <div className="text-xs sm:text-sm text-stone-700">
                                            Arti: <span className="font-medium text-stone-800">{ex.id}</span>
                                          </div>
                                        </div>

                                        <button
                                          id={`audio-ex-${item.id}-${idx}-${exIdx}`}
                                          onClick={() => handleSpeak(ex.jp)}
                                          title="Dengarkan kalimat ini"
                                          className="p-2 rounded-lg bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600 transition-colors shrink-0"
                                        >
                                          <Volume2 className="w-4 h-4" />
                                        </button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* TAB 2: SIDE-BY-SIDE COMPARISON (VS GUIDES) */}
      {activeTab === 'comparisons' && (
        <div className="space-y-6">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed">
              <strong className="block font-bold mb-1">Panduan Anti-Bingung: Pasangan Partikel yang Sering Keliru</strong>
              Banyak pembelajar bahasa Jepang tertukar menggunakan partikel seperti <strong>は vs が</strong> atau <strong>に vs で</strong>. Di bawah ini disajikan perbandingan komparatif langsung beserta trik membedakannya dalam satu detik!
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {particleComparisons.map((comp) => (
              <div
                key={comp.id}
                id={`comp-card-${comp.id}`}
                className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden"
              >
                {/* Comparison Header */}
                <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-800 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500 text-black uppercase tracking-wider inline-block mb-1">
                      {comp.pair}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold">{comp.title}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-300 max-w-md">
                    {comp.coreDifference}
                  </p>
                </div>

                {/* Side-by-side columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-stone-200 p-5 gap-6">
                  {/* Item A */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-9 h-9 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-lg">
                          {comp.itemA.symbol.split(' ')[0]}
                        </span>
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{comp.itemA.symbol}</h4>
                          <span className="text-xs text-rose-700 font-semibold">{comp.itemA.role}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(comp.itemA.exampleJp)}
                        className="p-2 rounded-lg bg-stone-100 hover:bg-rose-50 text-stone-600 hover:text-rose-600"
                        title="Dengar audio contoh"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600">{comp.itemA.focus}</p>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <div className="text-sm font-semibold text-stone-900 font-serif">
                        {comp.itemA.exampleJp}
                      </div>
                      <div className="text-xs text-stone-700">{comp.itemA.exampleId}</div>
                      <div className="text-[11px] text-rose-600 font-medium pt-1">
                        Nuansa: {comp.itemA.nuance}
                      </div>
                    </div>
                  </div>

                  {/* Item B */}
                  <div className="space-y-3 pt-6 md:pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-9 h-9 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
                          {comp.itemB.symbol.split(' ')[0]}
                        </span>
                        <div>
                          <h4 className="font-bold text-stone-900 text-sm">{comp.itemB.symbol}</h4>
                          <span className="text-xs text-blue-700 font-semibold">{comp.itemB.role}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleSpeak(comp.itemB.exampleJp)}
                        className="p-2 rounded-lg bg-stone-100 hover:bg-blue-50 text-stone-600 hover:text-blue-600"
                        title="Dengar audio contoh"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600">{comp.itemB.focus}</p>

                    <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 space-y-1">
                      <div className="text-sm font-semibold text-stone-900 font-serif">
                        {comp.itemB.exampleJp}
                      </div>
                      <div className="text-xs text-stone-700">{comp.itemB.exampleId}</div>
                      <div className="text-[11px] text-blue-600 font-medium pt-1">
                        Nuansa: {comp.itemB.nuance}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mnemonic footer */}
                <div className="bg-amber-50/70 border-t border-amber-200/60 p-4 px-5 flex items-center gap-2.5 text-xs sm:text-sm text-amber-950">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    <strong>Trik Ingat Kilat:</strong> {comp.mnemonic}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE PRACTICE QUIZ */}
      {activeTab === 'practice' && (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
          {!isQuizFinished ? (
            <>
              {/* Progress & Header */}
              <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Soal {currentQuizIdx + 1} dari {practiceQuestions.length}
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-100 text-stone-700">
                  Skor: {quizScore}
                </span>
              </div>

              {/* Question card */}
              <div className="space-y-3 text-center py-4">
                <div className="text-xl sm:text-2xl font-bold text-stone-900 font-serif">
                  {currentQ.sentence}
                </div>
                <div className="text-xs text-stone-500 italic">
                  {currentQ.reading}
                </div>
                <div className="text-sm sm:text-base text-stone-700 font-medium">
                  "{currentQ.translation}"
                </div>

                <button
                  onClick={() => handleSpeak(currentQ.sentence.replace('___', ''))}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-xs font-medium text-stone-700 mx-auto mt-2"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Dengarkan Kalimat</span>
                </button>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-2 gap-3">
                {currentQ.options.map((opt) => {
                  const isSelected = selectedOption === opt;
                  let btnStyle = 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800';

                  if (isAnswerSubmitted) {
                    if (opt === currentQ.correct) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'border-red-500 bg-red-50 text-red-900 line-through';
                    } else {
                      btnStyle = 'opacity-50 border-stone-200';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-rose-600 bg-rose-50 text-rose-900 font-bold ring-2 ring-rose-500';
                  }

                  return (
                    <button
                      key={opt}
                      id={`quiz-opt-${opt}`}
                      onClick={() => handleSelectQuizOption(opt)}
                      disabled={isAnswerSubmitted}
                      className={`p-4 rounded-xl border-2 text-lg font-bold transition-all flex items-center justify-center gap-2 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {isAnswerSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl border ${
                    selectedOption === currentQ.correct
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                      : 'bg-rose-50 border-rose-300 text-rose-950'
                  } space-y-1.5`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm">
                    {selectedOption === currentQ.correct ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        <span>Jawaban Anda Benar!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 text-rose-600" />
                        <span>Jawaban Kurang Tepat (Yang benar: {currentQ.correct})</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed">{currentQ.explanation}</p>
                </motion.div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                {!isAnswerSubmitted ? (
                  <button
                    id="btn-check-quiz-answer"
                    onClick={handleCheckQuizAnswer}
                    disabled={!selectedOption}
                    className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>Periksa Jawaban</span>
                  </button>
                ) : (
                  <button
                    id="btn-next-quiz-question"
                    onClick={handleNextQuizQuestion}
                    className="w-full py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <span>
                      {currentQuizIdx < practiceQuestions.length - 1
                        ? 'Soal Selanjutnya'
                        : 'Lihat Hasil Akhir'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          ) : (
            /* Finished screen */
            <div className="text-center py-8 space-y-5">
              <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-stone-900">Latihan Partikel Selesai!</h3>
                <p className="text-stone-600 text-sm">
                  Skor Anda: <strong className="text-rose-600 text-lg">{quizScore}</strong> dari{' '}
                  {practiceQuestions.length} ({Math.round((quizScore / practiceQuestions.length) * 100)}%)
                </p>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl text-xs sm:text-sm text-stone-700 max-w-md mx-auto">
                {quizScore >= 7
                  ? 'Luar biasa! Pemahaman partikel Anda sangat mantap dan siap diterapkan dalam percakapan nyata.'
                  : 'Bagus! Coba tinjau kembali tab "Bagan Partikel" dan "Perbandingan" untuk mempertajam ingatan.'}
              </div>

              <button
                id="btn-restart-quiz"
                onClick={handleResetQuiz}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-semibold text-sm shadow-md transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Latihan</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
