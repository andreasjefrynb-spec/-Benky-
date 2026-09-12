import React, { useState, useMemo, useRef } from 'react';
import { SSWSectorItem } from '../types';
import { sswSectors } from '../data';
import { Volume2, Layers, Search, ShieldCheck, Wrench, Briefcase, AlertTriangle, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { speakJapanese } from '../utils/audio';

interface SSWViewProps {
  speechRate: number;
  onPracticeSector?: (sectorId: string) => void;
  onStartQuiz?: (sectorId: string) => void;
}

export const SSWView: React.FC<SSWViewProps> = ({ speechRate, onPracticeSector, onStartQuiz }) => {
  const [selectedSectorId, setSelectedSectorId] = useState<string>(sswSectors[0]?.sectorId || 'kaigo');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileListExpanded, setIsMobileListExpanded] = useState<boolean>(false);
  const workspaceRef = useRef<HTMLDivElement | null>(null);

  const filteredSectors = useMemo(() => {
    return sswSectors.filter((sec) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = sec.name.toLowerCase().includes(q);
        const matchKanji = sec.kanji.includes(q);
        const matchEng = sec.english.toLowerCase().includes(q);
        const matchSummary = sec.summary.toLowerCase().includes(q);
        const matchVocab = sec.vocab.some(
          (v) => v.jp.toLowerCase().includes(q) || v.reading.toLowerCase().includes(q) || v.id.toLowerCase().includes(q)
        );
        return matchName || matchKanji || matchEng || matchSummary || matchVocab;
      }
      return true;
    });
  }, [searchQuery]);

  const currentSector: SSWSectorItem = useMemo(() => {
    return sswSectors.find((s) => s.sectorId === selectedSectorId) || sswSectors[0];
  }, [selectedSectorId]);

  const handleSelectSector = (sectorId: string) => {
    setSelectedSectorId(sectorId);
    if (window.innerWidth < 1024 && workspaceRef.current) {
      workspaceRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSpeak = (text: string, readingOrEvent?: string | React.MouseEvent, e?: React.MouseEvent) => {
    let reading: string | undefined;
    let evt: React.MouseEvent | undefined;
    if (typeof readingOrEvent === 'string') {
      reading = readingOrEvent;
      evt = e;
    } else if (readingOrEvent && typeof readingOrEvent === 'object' && 'stopPropagation' in readingOrEvent) {
      evt = readingOrEvent as React.MouseEvent;
    }
    evt?.stopPropagation();
    speakJapanese(text, speechRate, undefined, reading);
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-600 rounded-3xl p-5 sm:p-7 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full text-xs font-semibold mb-2">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Materi Ujian &amp; Kerja Lapangan SSW Jepang (特定技能 Tokutei Ginou)</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-extrabold tracking-tight">
            12 Sektor Lengkap Tokutei Ginou
          </h1>
          <p className="text-blue-100 text-xs sm:text-sm mt-1 leading-relaxed">
            Materi persiapan ujian keterampilan &amp; bahasa kerja untuk Kaigo (Caregiver), Restoran, Pengolahan Makanan, Pertanian, Konstruksi, Otomotif, Perhotelan, Building Cleaning, Manufaktur, Galangan Kapal, Aviasi, dan Perikanan.
          </p>
        </div>
        <div className="absolute right-[-20px] bottom-[-20px] text-white/10 select-none pointer-events-none text-9xl font-black font-serif">
          技
        </div>
      </div>

      {/* Quick Sector Switcher Bar */}
      <div className="bg-white p-2.5 sm:p-3 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between gap-2">
        <span className="text-xs font-extrabold text-slate-500 whitespace-nowrap hidden sm:inline">
          Pilih Sektor SSW:
        </span>
        <select
          value={currentSector.sectorId}
          onChange={(e) => handleSelectSector(e.target.value)}
          className="w-full bg-blue-50/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-bold rounded-xl px-3 py-2 focus:outline-hidden focus:ring-2 focus:ring-blue-400 cursor-pointer"
        >
          {sswSectors.map((s) => (
            <option key={s.id} value={s.sectorId}>
              {s.name} ({s.kanji}) — {s.english}
            </option>
          ))}
        </select>
      </div>

      {/* Common Core Protocols Pill (5S & KYT & Hou-Ren-So) */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-3.5 sm:p-4 shadow-2xs grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
        <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl">
          <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center shrink-0">
            5S
          </span>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Budaya 5S Pabrik</span>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              整理 Seiri, 整頓 Seiton, 清掃 Seisou, 清潔 Seiketsu, 躾 Shitsuke
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl">
          <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 font-extrabold text-xs flex items-center justify-center shrink-0">
            KYT
          </span>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Kiken Yochi Kunren (危険予知)</span>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              Pelatihan prediksi bahaya &amp; Yubisashi Koshou (tunjuk-sebut "Yoshi!")
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2.5 p-2 bg-slate-50 rounded-xl">
          <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 font-extrabold text-xs flex items-center justify-center shrink-0">
            報連相
          </span>
          <div>
            <span className="text-xs font-bold text-slate-800 block">Hou-Ren-So Kerja</span>
            <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
              報告 Houkoku (Lapor), 連絡 Renraku (Kabar), 相談 Soudan (Konsultasi)
            </p>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
          Pilih Sektor SSW ({filteredSectors.length} Sektor)
        </span>
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari sektor atau istilah teknis..."
            className="w-full bg-white pl-9 pr-4 py-2 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-400 focus:border-blue-400 shadow-2xs transition-all"
          />
        </div>
      </div>

      {/* Grid: Directory Sidebar + Selected Sector Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
        {/* Sector Navigation List */}
        <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-2xs p-3.5 flex flex-col">
          <div className="px-2 py-1.5 flex items-center justify-between border-b border-slate-100 mb-2">
            <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider">
              Daftar Sektor ({filteredSectors.length})
            </span>
            <button
              onClick={() => setIsMobileListExpanded(!isMobileListExpanded)}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-700 cursor-pointer"
              title="Buka/Tutup Daftar Sektor"
            >
              {isMobileListExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>

          <div className={`space-y-1.5 pr-1 overflow-y-auto custom-scrollbar transition-all duration-200 ${
            isMobileListExpanded ? 'max-h-[480px]' : 'max-h-[190px] sm:max-h-[250px] lg:max-h-[720px]'
          }`}>
            {filteredSectors.map((sec) => {
              const isSelected = sec.sectorId === currentSector.sectorId;
              return (
                <button
                  key={sec.id}
                  onClick={() => handleSelectSector(sec.sectorId)}
                  className={`w-full text-left p-3 rounded-2xl transition-all cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-300 text-slate-900 shadow-xs'
                      : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-extrabold text-slate-900">
                      {sec.name}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-100 text-blue-800 shrink-0">
                      {sec.kanji}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-medium truncate">
                    {sec.english}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sector Workspace */}
        <div ref={workspaceRef} className="lg:col-span-8 flex flex-col gap-5 scroll-mt-20">
          {/* Header Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <span className="bg-blue-600 text-white text-xs font-extrabold px-3 py-1 rounded-xl shadow-xs">
                  Sektor Tokutei Ginou 1
                </span>
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2.5 py-1 rounded-xl font-japanese">
                  {currentSector.kanji}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onPracticeSector && (
                  <button
                    onClick={() => onPracticeSector(currentSector.sectorId)}
                    className="inline-flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200/80 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Hafal Kosakata</span>
                  </button>
                )}
                {onStartQuiz && (
                  <button
                    onClick={() => onStartQuiz(currentSector.sectorId)}
                    className="inline-flex items-center gap-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>Kuis Sektor Ini</span>
                  </button>
                )}
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
              {currentSector.name}
            </h2>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {currentSector.english}
            </p>

            <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
              {currentSector.summary}
            </p>
          </div>

          {/* Core Skills required for Tokutei Ginou Exam */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-3">
            <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-blue-600" />
              <span>Keahlian Pokok &amp; Silabus Ujian Keterampilan (実技試験・業務範囲)</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentSector.coreSkills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="p-3 bg-slate-50/80 rounded-2xl border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700 font-medium"
                >
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Safety & K3 Protocols */}
          <div className="bg-amber-50/80 rounded-3xl border border-amber-200/80 p-5 sm:p-6 shadow-2xs flex flex-col gap-2">
            <div className="flex items-center gap-2 text-amber-900 font-extrabold text-sm sm:text-base">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>Protokol Keselamatan Kerja K3 Jepang (安全衛生管理)</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950/90 leading-relaxed mt-1">
              {currentSector.safetyProtocol}
            </p>
          </div>

          {/* Technical Vocabulary */}
          <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-600" />
                <span>Istilah &amp; Kosakata Teknis Kerja (専門用語)</span>
              </h3>
              <span className="text-xs font-semibold text-slate-400">
                {currentSector.vocab.length} Istilah
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentSector.vocab.map((item, vIdx) => (
                <div
                  key={vIdx}
                  className="p-3 bg-slate-50/70 hover:bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-3 transition-all"
                >
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm sm:text-base font-bold text-slate-900 font-japanese">
                      {item.jp}
                    </p>
                    <p className="text-xs text-blue-700 font-semibold truncate">
                      {item.reading}
                    </p>
                    <p className="text-xs text-slate-600 line-clamp-1" title={item.id}>
                      {item.id}
                    </p>
                  </div>
                  <button
                    onClick={(e) => handleSpeak(item.jp, item.reading, e)}
                    className="p-2 rounded-xl bg-white hover:bg-blue-100 text-slate-600 hover:text-blue-700 border border-slate-200/60 shadow-2xs transition-colors shrink-0 cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Workplace Situational Scenarios */}
          {currentSector.scenarios && currentSector.scenarios.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs flex flex-col gap-4">
              <h3 className="text-base font-extrabold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Skenario Percakapan &amp; Tanggap Bahaya di Lapangan (現場対応)</span>
              </h3>

              <div className="space-y-3">
                {currentSector.scenarios.map((scen, scIdx) => (
                  <div
                    key={scIdx}
                    className="bg-slate-50/80 p-4 rounded-2xl border border-slate-200/80 flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-bold text-slate-800">
                        {scen.title}
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-medium">
                        {scen.situation}
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-slate-200/70 flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900 font-japanese">
                          {scen.japanese}
                        </p>
                        <p className="text-xs text-slate-600">
                          {scen.indonesian}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleSpeak(scen.japanese, undefined, e)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-blue-100 text-slate-600 hover:text-blue-700 border border-slate-200/60 transition-colors shrink-0 cursor-pointer"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>
                    </div>
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
