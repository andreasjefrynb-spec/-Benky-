import React, { useState, useMemo, useRef } from 'react';
import { IrodoriCanDoItem } from '../types';
import { irodoriTopics } from '../data';
import { Volume2, Layers, Search, Compass, Lightbulb, MessageSquare, CheckCircle, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface IrodoriViewProps {
  speechRate: number;
  onPracticeTopic?: (topicId: string) => void;
}

export const IrodoriView: React.FC<IrodoriViewProps> = ({ speechRate, onPracticeTopic }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(irodoriTopics[0]?.id || '');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Starter (A1)' | 'Shokyu 1 (A2)' | 'Shokyu 2 (A2)'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileListExpanded, setIsMobileListExpanded] = useState<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const filteredTopics = useMemo(() => {
    return irodoriTopics.filter((t) => {
      if (levelFilter !== 'all' && t.level !== levelFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTopic = t.topic.toLowerCase().includes(q);
        const matchCanDo = t.canDo.toLowerCase().includes(q);
        const matchTips = t.tips.toLowerCase().includes(q);
        const matchPhrases = t.keyPhrases.some(
          (p) => p.jp.toLowerCase().includes(q) || p.reading.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
        );
        return matchTopic || matchCanDo || matchTips || matchPhrases;
      }
      return true;
    });
  }, [levelFilter, searchQuery]);

  const currentTopic: IrodoriCanDoItem = useMemo(() => {
    return irodoriTopics.find((t) => t.id === selectedTopicId) || irodoriTopics[0];
  }, [selectedTopicId]);

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speakJapanese(text, speechRate);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-700 via-emerald-600 to-amber-600 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Irodori: Bahasa Jepang untuk Kehidupan di Jepang (いろどり 生活の日本語)</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            Irodori &bull; Modul Can-Do Praktis
          </h1>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Disusun berdasarkan Japan Foundation Standard (JFS). Melatih komunikasi langsung di tempat kerja, apartemen, rumah sakit, belanja, pemilahan sampah, dan prosedur darurat di Jepang.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          彩
        </div>
      </div>

      {/* Quick Topic Switcher Bar */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2">
        <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap hidden sm:inline">
          Pilih Topik Can-Do:
        </span>
        <select
          value={currentTopic.id}
          onChange={(e) => handleSelectTopic(e.target.value)}
          className="w-full bg-emerald-50/80 border border-emerald-200 text-emerald-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 cursor-pointer"
        >
          {irodoriTopics.map((t) => (
            <option key={t.id} value={t.id}>
              {t.level}: {t.topic} — {t.canDo}
            </option>
          ))}
        </select>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Level Pills */}
        <div className="flex items-center bg-white p-1 rounded-2xl border border-slate-200/90 shadow-2xs overflow-x-auto no-scrollbar">
          <button
            onClick={() => setLevelFilter('all')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              levelFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Semua Modul
          </button>
          <button
            onClick={() => setLevelFilter('Starter (A1)')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              levelFilter === 'Starter (A1)'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Starter (A1)
          </button>
          <button
            onClick={() => setLevelFilter('Shokyu 1 (A2)')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              levelFilter === 'Shokyu 1 (A2)'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Shokyu 1 (A2)
          </button>
          <button
            onClick={() => setLevelFilter('Shokyu 2 (A2)')}
            className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-colors whitespace-nowrap cursor-pointer ${
              levelFilter === 'Shokyu 2 (A2)'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            Shokyu 2 (A2)
          </button>
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari topik (sampah, cuti, dll.)..."
            className="w-full bg-white pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 shadow-2xs transition-all"
          />
        </div>
      </div>

      {/* Grid: Directory Sidebar + Selected Topic Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Topic List */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col">
          <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              Daftar Topik Can-Do ({filteredTopics.length})
            </span>
            <button
              onClick={() => setIsMobileListExpanded(!isMobileListExpanded)}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              title="Buka/Tutup Daftar Topik"
            >
              {isMobileListExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className={`space-y-1.5 pr-1 overflow-y-auto custom-scrollbar transition-all duration-200 ${
            isMobileListExpanded ? 'max-h-[480px]' : 'max-h-[190px] sm:max-h-[250px] lg:max-h-[720px]'
          }`}>
            {filteredTopics.map((item) => {
              const isSelected = item.id === currentTopic.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTopic(item.id)}
                  className={`w-full text-left p-2.5 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-emerald-50/80 border-emerald-300 text-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-extrabold line-clamp-1">
                      {item.topic}
                    </span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800 shrink-0">
                      {item.level}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {item.canDo}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Workspace */}
        <div ref={workspaceRef} className="lg:col-span-8 flex flex-col gap-5 scroll-mt-20">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-600 text-white text-xs font-extrabold px-3 py-1 rounded-xl shadow-xs">
                  {currentTopic.level}
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-xl">
                  {currentTopic.lesson}
                </span>
              </div>

              {onPracticeTopic && (
                <button
                  onClick={() => onPracticeTopic(currentTopic.id)}
                  className="inline-flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/80 px-3.5 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Latih Flashcard Frasa Ini</span>
                </button>
              )}
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {currentTopic.topic}
            </h2>

            {/* Can-Do Target */}
            <div className="mt-3 p-3.5 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-start gap-2.5">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-emerald-900 block uppercase tracking-wider">
                  Target Kemampuan Praktis (Can-Do):
                </span>
                <p className="text-xs sm:text-sm text-emerald-800 mt-0.5 leading-relaxed font-medium">
                  {currentTopic.canDo}
                </p>
              </div>
            </div>

            {/* Target Formula / Expression */}
            <div className="mt-3 bg-slate-50 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between gap-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                  Ungkapan Utama (Target Expression):
                </span>
                <p className="text-sm font-bold text-slate-900 font-japanese mt-0.5">
                  {currentTopic.targetExpression}
                </p>
              </div>
              <button
                onClick={(e) => handleSpeak(currentTopic.targetExpression, e)}
                className="p-2 rounded-xl bg-white hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border border-slate-200/70 transition-colors shrink-0 cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Key Phrases */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Ungkapan Kunci Sehari-hari (Kotoba &amp; Iikata)</span>
            </h3>

            <div className="space-y-2.5">
              {currentTopic.keyPhrases.map((phrase, pIdx) => (
                <div
                  key={pIdx}
                  className="p-3 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 transition-all"
                >
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese">
                      {phrase.jp}
                    </p>
                    <p className="text-xs text-emerald-700 font-semibold">
                      {phrase.reading}
                    </p>
                    <p className="text-xs text-slate-600">
                      {phrase.id}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleSpeak(phrase.jp, e)}
                    className="p-2 rounded-xl bg-white hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border border-slate-200/60 shadow-2xs transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural & Life Tips in Japan (Seikatsu no Chie) */}
          <div className="bg-amber-50/80 rounded-3xl border border-amber-200/80 p-5 sm:p-6 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Tips Budaya &amp; Aturan Hidup di Jepang (日本の生活と文化)</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed mt-1">
              {currentTopic.tips}
            </p>
          </div>

          {/* Dialogue Section */}
          {currentTopic.dialogue && currentTopic.dialogue.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <Compass className="w-4 h-4 text-emerald-600" />
                <span>Simulasi Percakapan Situasional (実戦会話)</span>
              </h3>

              <div className="space-y-3">
                {currentTopic.dialogue.map((dlg, dIdx) => (
                  <div
                    key={dIdx}
                    className="bg-slate-50/80 p-3 sm:p-4 rounded-2xl border border-slate-200/80 flex items-start gap-3"
                  >
                    <div className="w-16 sm:w-20 shrink-0 font-extrabold text-xs text-slate-700 bg-white border border-slate-200/70 px-2 py-1 rounded-lg text-center shadow-2xs">
                      {dlg.speaker}
                    </div>
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese">
                        {dlg.jp}
                      </p>
                      <p className="text-xs text-emerald-700 font-medium">
                        {dlg.reading}
                      </p>
                      <p className="text-xs text-slate-600">
                        {dlg.id}
                      </p>
                    </div>
                    <button
                      onClick={(e) => handleSpeak(dlg.jp, e)}
                      className="p-2 rounded-xl bg-white hover:bg-emerald-100 text-slate-600 hover:text-emerald-700 border border-slate-200/60 transition-colors shrink-0 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
