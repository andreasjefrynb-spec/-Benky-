import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, X, CheckCircle2 } from 'lucide-react';
import { MainCategory } from '../types';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCategory: (cat: MainCategory) => void;
}

export const RoadmapModal: React.FC<RoadmapModalProps> = ({
  isOpen,
  onClose,
  onSelectCategory,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black leading-tight">
                    Roadmap Sukses Lulus JFT &amp; JLPT
                  </h3>
                  <p className="text-xs text-rose-100 mt-0.5">
                    Panduan kurikulum terstruktur untuk ujian kerja SSW &amp; JLPT N5–N1
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 overflow-y-auto flex flex-col gap-5 text-slate-700 text-xs sm:text-sm">
              {/* 1. JFT-Basic & SSW */}
              <div className="bg-amber-50/70 border-2 border-amber-200/90 rounded-2xl p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🌐</span>
                    <h4 className="font-extrabold text-amber-900 text-sm sm:text-base">
                      1. Target Lulus JFT-Basic (A2) &amp; SSW Tokutei Ginou
                    </h4>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">
                    Kerja di Jepang
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Ujian JFT-Basic A2 menguji kemampuan komunikasi praktis di kehidupan sehari-hari dan lingkungan kerja di Jepang (skor kelulusan &ge;200 dari 250 poin / 80%).
                </p>
                <div className="bg-white rounded-xl p-3 border border-amber-200 flex flex-col gap-2">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Urutan Belajar yang Wajib Dituntaskan:</span>
                  </div>
                  <ol className="list-decimal list-inside space-y-1 text-xs text-slate-600 ml-1">
                    <li>
                      <strong className="text-slate-800">Huruf Dasar:</strong> Kuasai Hiragana &amp; Katakana 100% tanpa mengeja.
                    </li>
                    <li>
                      <strong className="text-slate-800">Minna no Nihongo Bab 1–25 (N5) &amp; Bab 26–50 (N4):</strong> Kuasai fondasi kalimat, pola tanya-jawab, dan bentuk konjugasi verba/adjektiva.
                    </li>
                    <li>
                      <strong className="text-slate-800">Praktis Can-Do (Irodori A1 &amp; A2):</strong> Latih situasi nyata (membeli tiket, belanja di supermarket, izin terlambat/sakit ke atasan, apartemen, periksa ke klinik dokter).
                    </li>
                    <li>
                      <strong className="text-slate-800">Materi Kerja SSW:</strong> Pelajari istilah teknis, SOP keselamatan kerja (Kiken Yochi KY), dan percakapan di 12 sektor (Kaigo/Perawat Lansia, Restoran, Pengolahan Makanan, Pertanian, Konstruksi, dll.).
                    </li>
                  </ol>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('irodori');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Buka Irodori Can-Do &rarr;
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('ssw');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Buka Materi SSW &rarr;
                  </button>
                </div>
              </div>

              {/* 2. JLPT N5 & N4 */}
              <div className="bg-emerald-50/70 border-2 border-emerald-200/90 rounded-2xl p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🔰</span>
                    <h4 className="font-extrabold text-emerald-900 text-sm sm:text-base">
                      2. Target Lulus JLPT N5 &amp; N4 (Fondasi Dasar)
                    </h4>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                    N5 / N4
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Menguji penguasaan aksara kana, kanji dasar (N5 ~100 kanji, N4 ~300 kanji), kosakata harian (~1.500 kata), serta pola kalimat dasar.
                </p>
                <div className="bg-white rounded-xl p-3 border border-emerald-200 flex flex-col gap-2">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Materi Kunci:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-1">
                    <li><strong>Minna no Nihongo Bab 1–50:</strong> Selesaikan silabus Bunkei, Reibun, dan latihan soal bab.</li>
                    <li><strong>Kanji N5 &amp; N4:</strong> Pelajari urutan coretan (stroke order) dan on'yomi / kun'yomi.</li>
                    <li><strong>Partikel 助詞 (20 Partikel):</strong> Pahami perbedaan は vs が, に vs で, へ vs に.</li>
                    <li><strong>14 Konjugasi Kata Kerja:</strong> Kuasai bentuk ~Te, ~Nai, Potensial, Pasif, Kausatif, dan Syarat (~Tara, ~Ba).</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('minna');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Buka Minna Bab 1–50 &rarr;
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('conjugation');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 border border-emerald-300 hover:bg-emerald-50 font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Drill 14 Konjugasi &rarr;
                  </button>
                </div>
              </div>

              {/* 3. JLPT N3 */}
              <div className="bg-blue-50/70 border-2 border-blue-200/90 rounded-2xl p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🎯</span>
                    <h4 className="font-extrabold text-blue-900 text-sm sm:text-base">
                      3. Target Lulus JLPT N3 (Jembatan Menengah)
                    </h4>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-blue-200 text-blue-900">
                    Level Kerja N3
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Tingkat N3 adalah batas minimal kemampuan bahasa Jepang untuk bekerja di perusahaan Jepang non-teknis atau studi perguruan tinggi di Jepang.
                </p>
                <div className="bg-white rounded-xl p-3 border border-blue-200 flex flex-col gap-2">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>3 Senjata Lulus Ujian N3 yang Tersedia di Aplikasi:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-1">
                    <li><strong>TRY! JLPT N3:</strong> Memahami tata bahasa lewat percakapan dan alur cerita nyata + simulasi soal ujian.</li>
                    <li><strong>Nihongo Sou-matome N3:</strong> Rencana belajar 6 minggu terstruktur (Kanji, Kosakata, Tata Bahasa).</li>
                    <li><strong>Shin Kanzen Master N3:</strong> Membedah soal-soal jebakan resmi JLPT dan nuansa presisi antar pola grammar.</li>
                    <li><strong>Tobira &amp; Quartet:</strong> Transisi membaca wacana otentik dan integrasi 4 keterampilan bahasa.</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('tryjlpt');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Buka TRY! JLPT N3 &rarr;
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('shinkanzen');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Buka Shin Kanzen N3 &rarr;
                  </button>
                </div>
              </div>

              {/* 4. JLPT N2 & N1 */}
              <div className="bg-purple-50/70 border-2 border-purple-200/90 rounded-2xl p-4 flex flex-col gap-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🚀</span>
                    <h4 className="font-extrabold text-purple-900 text-sm sm:text-base">
                      4. Target Lulus JLPT N2 &amp; N1 (Tingkat Mahir &amp; Profesional)
                    </h4>
                  </div>
                  <span className="text-[11px] font-black px-2 py-0.5 rounded-full bg-purple-200 text-purple-900">
                    Mahir N2 / N1
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed text-xs">
                  Mencakup pemahaman wacana berbobot tinggi (Dokkai editorial surat kabar, tesis, analisis data) dan menyimak cepat (Choukai dialog kecepatan alami dengan perubahan keputusan di akhir dialog).
                </p>
                <div className="bg-white rounded-xl p-3 border border-purple-200 flex flex-col gap-2">
                  <div className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Modul Lanjutan:</span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 ml-1">
                    <li><strong>Dokkai N1–N3:</strong> Editorial opini Asahi Shimbun, teks perbandingan 2 penulis, dan strategi menjawab cepat.</li>
                    <li><strong>Choukai N1–N3:</strong> Dialog rapat eksekutif, keigo bisnis tinggi, dan soal respon cepat (sokkai outou).</li>
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('dokkai');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Buka Dokkai N1–N3 &rarr;
                  </button>
                  <button
                    onClick={() => {
                      onClose();
                      onSelectCategory('choukai');
                    }}
                    className="px-3 py-1.5 rounded-xl bg-purple-900 hover:bg-black text-white font-bold text-xs cursor-pointer shadow-xs"
                  >
                    Buka Choukai N1–N3 &rarr;
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-xs cursor-pointer transition-colors"
              >
                Tutup Panduan
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
