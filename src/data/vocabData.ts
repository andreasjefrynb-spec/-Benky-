import { CardItem } from '../types';
import vocabCompList from './vocab/vocabComprehensive.json';
import { vocabNativeData } from './vocabNativeData';
export { phrasesData } from './phrasesData';
export { vocabN3Data } from './vocabN3Data';
export { vocabNativeData } from './vocabNativeData';

// Kosakata Bahasa Jepang Komprehensif (JLPT N5 hingga N3) + Kotowaza & Onomatope Native
export const vocabData: CardItem[] = [
  ...(vocabCompList as CardItem[]),
  ...vocabNativeData,
];



