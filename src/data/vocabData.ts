import { CardItem } from '../types';
import vocab1000List from './vocab/vocab1000.json';
import { vocabN3Data } from './vocabN3Data';
export { phrasesData } from './phrasesData';
export { vocabN3Data } from './vocabN3Data';

// Kosakata Bahasa Jepang Komprehensif (JLPT N5 hingga N3)
export const vocabData: CardItem[] = [
  ...(vocab1000List as CardItem[]),
  ...vocabN3Data,
];


