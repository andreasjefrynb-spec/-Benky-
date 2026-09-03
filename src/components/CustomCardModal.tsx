import React, { useState } from 'react';
import { X, Plus, Trash2, BookPlus } from 'lucide-react';
import { CardItem } from '../types';

interface CustomCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  customCards: CardItem[];
  onAddCard: (card: CardItem) => void;
  onDeleteCard: (id: string) => void;
}

export const CustomCardModal: React.FC<CustomCardModalProps> = ({
  isOpen,
  onClose,
  customCards,
  onAddCard,
  onDeleteCard,
}) => {
  const [japanese, setJapanese] = useState('');
  const [reading, setReading] = useState('');
  const [meaningId, setMeaningId] = useState('');
  const [exampleJp, setExampleJp] = useState('');
  const [exampleId, setExampleId] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!japanese.trim() || !reading.trim() || !meaningId.trim()) {
      setError('Mohon isi Karakter Jepang, Cara Baca (Romaji), dan Arti Bahasa Indonesia.');
      return;
    }

    const newCard: CardItem = {
      id: `custom-${Date.now()}`,
      category: 'custom',
      japanese: japanese.trim(),
      reading: reading.trim(),
      meaningId: meaningId.trim(),
      exampleJp: exampleJp.trim() || undefined,
      exampleId: exampleId.trim() || undefined,
      mnemonic: mnemonic.trim() || undefined,
      isCustom: true,
      level: 'Dasar',
    };

    onAddCard(newCard);

    // Reset form
    setJapanese('');
    setReading('');
    setMeaningId('');
    setExampleJp('');
    setExampleId('');
    setMnemonic('');
    setError('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-50 text-rose-600 rounded-xl">
              <BookPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Tambah Kartu Hapalan Kustom
              </h3>
              <p className="text-xs text-slate-500">
                Buat kartu kosakata atau kanji pilihanmu sendiri
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {error && (
              <div className="p-3 bg-rose-50 text-rose-700 text-xs font-semibold rounded-xl border border-rose-200">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Karakter Jepang *
                </label>
                <input
                  type="text"
                  value={japanese}
                  onChange={(e) => setJapanese(e.target.value)}
                  placeholder="Contoh: 友達 atau ともだち"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-jp"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Cara Baca / Romaji *
                </label>
                <input
                  type="text"
                  value={reading}
                  onChange={(e) => setReading(e.target.value)}
                  placeholder="Contoh: tomodachi"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Arti Bahasa Indonesia *
              </label>
              <input
                type="text"
                value={meaningId}
                onChange={(e) => setMeaningId(e.target.value)}
                placeholder="Contoh: Teman / Sahabat"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Contoh Kalimat Jepang (Opsional)
                </label>
                <input
                  type="text"
                  value={exampleJp}
                  onChange={(e) => setExampleJp(e.target.value)}
                  placeholder="Contoh: 友達と遊びます"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 font-jp"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Arti Kalimat Indonesia (Opsional)
                </label>
                <input
                  type="text"
                  value={exampleId}
                  onChange={(e) => setExampleId(e.target.value)}
                  placeholder="Contoh: Bermain bersama teman"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tips Mengingat / Mnemonic (Opsional)
              </label>
              <input
                type="text"
                value={mnemonic}
                onChange={(e) => setMnemonic(e.target.value)}
                placeholder="Tips asosiasi kata agar mudah diingat..."
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan ke Kartu Saya</span>
            </button>
          </form>

          {/* List of existing custom cards */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2.5">
              Daftar Kartu Kustom ({customCards.length})
            </h4>

            {customCards.length === 0 ? (
              <p className="text-xs text-slate-400 italic bg-slate-50 p-4 rounded-xl text-center">
                Belum ada kartu kustom. Tambahkan kosakata favoritmu di atas!
              </p>
            ) : (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {customCards.map((card) => (
                  <div
                    key={card.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="font-bold flex items-center gap-1.5">
                        <span className="font-jp text-base text-slate-900">{card.japanese}</span>
                        <span className="text-slate-500">({card.reading})</span>
                      </div>
                      <p className="text-slate-600">{card.meaningId}</p>
                    </div>

                    <button
                      onClick={() => onDeleteCard(card.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="Hapus kartu ini"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
