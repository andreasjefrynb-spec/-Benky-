import React from 'react';
import { CardItem } from '../types';
import { getWordExplanationViewData } from '../utils/wordCharacteristics';

interface WordCharacteristicTableProps {
  card: CardItem;
}

export const WordCharacteristicTable: React.FC<WordCharacteristicTableProps> = ({ card }) => {
  const data = getWordExplanationViewData(card);

  return (
    <div
      id={`word-explanation-card-${card.id}`}
      className="w-full max-w-md text-left flex flex-col my-1"
    >
      {/* Kotak Header Lengkap Banyak Arti */}
      <div className="w-full bg-slate-100/90 dark:bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-700/80 shadow-2xs">
        <p className="text-sm sm:text-base md:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
          {data.headerMeaning}
        </p>
      </div>
    </div>
  );
};
