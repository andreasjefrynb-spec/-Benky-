/**
 * Mesin Konjugasi & Perubahan Bentuk Kata Bahasa Jepang Otomatis (活用生成エンジン / Katsuyou Engine)
 * Mampu menghasilkan seluruh bentuk perubahan gramatikal (16 bentuk untuk Verba,
 * seluruh bentuk untuk Adjektiva -i, Adjektiva -na, dan Nomina/Kata Benda)
 * untuk SETIAP kosakata (kotoba) dalam aplikasi secara akurat.
 *
 * Mendukung:
 * - Bentuk Kamus (Jisho / 辞書形)
 * - Bentuk Sopan Masu (~ます / ~ません / ~ました / ~ませんでした)
 * - Bentuk Sambung Te (~て / ~で)
 * - Bentuk Negatif Kasual Nai (~ない / ~なかった)
 * - Bentuk Lampau Kasual Ta (~た / ~だ)
 * - Bentuk Syarat Ba (~ば) & Bentuk Pengandaian Tara (~たら / ~だら)
 * - Bentuk Ajakan Volisional (~よう / ~おう)
 * - Bentuk Potensial (~られる / ~える)
 * - Bentuk Pasif (~られる / ~れる)
 * - Bentuk Kausatif (~させる / ~せる)
 * - Bentuk Perintah Imperatif (~ろ / ~え / ~しろ / ~こい)
 */

import { CardItem } from '../types';
import { getWordClassification, WordClassification } from './wordClassifier';

export interface DetailedConjugationForm {
  formKey: string;
  formName: string;
  categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan';
  categoryGroupName: string;
  japanese: string;
  reading: string;
  romaji: string;
  meaningId: string;
  rule: string;
  exampleJp?: string;
  exampleId?: string;
}

export interface WordConjugationProfile {
  id: string;
  originalCard: CardItem;
  japanese: string;
  kanji?: string;
  reading: string;
  furigana?: string;
  meaningId: string;
  classification: WordClassification;
  groupLabel: string;
  isException?: boolean;
  exceptionNote?: string;
  quickForms: {
    masu: string;
    te: string;
    nai: string;
    ta: string;
  };
  forms: DetailedConjugationForm[];
}

// Pengecualian kata kerja jebakan (terlihat seperti Gol. 2 berakhiran -iru/-eru tapi sebenarnya Gol. 1 Godan)
const TRAP_GODAN_VERB_SET = new Set([
  '帰る', 'かえる', 'kaeru',
  '入る', 'はいる', 'hairu',
  '走る', 'はしる', 'hashiru',
  '知る', 'しる', 'shiru',
  '切る', 'きる', 'kiru',
  '要る', 'いる', 'iru',
  '喋る', 'しゃべる', 'shaberu',
  '減る', 'へる', 'heru',
  '滑る', 'すべる', 'suberu',
  '蹴る', 'ける', 'keru',
  '焦る', 'あせる', 'aseru',
  '限る', 'かぎる', 'kagiru',
  '照る', 'てる', 'teru',
  '握る', 'にぎる', 'nigiru',
  '散る', 'ちる', 'chiru',
]);

// Helper pembersih arti kata bahasa Indonesia
function cleanBaseMeaning(meaning: string): string {
  if (!meaning) return '';
  return meaning
    .replace(/\s*\[[^\]]*\]/g, '')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/^(adalah|menjadi|sebuah|seorang)\s+/i, '')
    .trim();
}

/**
 * Konversi Hiragana & Katakana ke Romaji standar Hepburn
 */
export function kanaToRomaji(kana: string): string {
  if (!kana) return '';

  const KANA_MAP: Record<string, string> = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'ka', 'き': 'ki', 'く': 'ku', 'け': 'ke', 'こ': 'ko',
    'さ': 'sa', 'し': 'shi', 'す': 'su', 'せ': 'se', 'そ': 'so',
    'た': 'ta', 'ち': 'chi', 'つ': 'tsu', 'て': 'te', 'と': 'to',
    'な': 'na', 'に': 'ni', 'ぬ': 'nu', 'ね': 'ne', 'の': 'no',
    'は': 'ha', 'ひ': 'hi', 'ふ': 'fu', 'へ': 'he', 'ほ': 'ho',
    'ま': 'ma', 'み': 'mi', 'む': 'mu', 'め': 'me', 'も': 'mo',
    'や': 'ya', 'ゆ': 'yu', 'よ': 'yo',
    'ら': 'ra', 'り': 'ri', 'る': 'ru', 'れ': 're', 'ろ': 'ro',
    'わ': 'wa', 'を': 'wo', 'ん': 'n',
    'が': 'ga', 'ぎ': 'gi', 'ぐ': 'gu', 'げ': 'ge', 'ご': 'go',
    'ざ': 'za', 'じ': 'ji', 'ず': 'zu', 'ぜ': 'ze', 'ぞ': 'zo',
    'だ': 'da', 'ぢ': 'ji', 'づ': 'zu', 'で': 'de', 'ど': 'do',
    'ば': 'ba', 'び': 'bi', 'ぶ': 'bu', 'べ': 'be', 'ぼ': 'bo',
    'ぱ': 'pa', 'ぴ': 'pi', 'ぷ': 'pu', 'ぺ': 'pe', 'ぽ': 'po',
    'きゃ': 'kya', 'きゅ': 'kyu', 'きょ': 'kyo',
    'しゃ': 'sha', 'しゅ': 'shu', 'しょ': 'sho',
    'ちゃ': 'cha', 'ちゅ': 'chu', 'ちょ': 'cho',
    'にゃ': 'nya', 'にゅ': 'nyu', 'にょ': 'nyo',
    'ひゃ': 'hya', 'ひゅ': 'hyu', 'ひょ': 'hyo',
    'みゃ': 'mya', 'みゅ': 'myu', 'みょ': 'myo',
    'りゃ': 'rya', 'りゅ': 'ryu', 'りょ': 'ryo',
    'ぎゃ': 'gya', 'ぎゅ': 'gyu', 'ぎょ': 'gyo',
    'じゃ': 'ja', 'じゅ': 'ju', 'じょ': 'jo',
    'びゃ': 'bya', 'びゅ': 'byu', 'びょ': 'byo',
    'ぴゃ': 'pya', 'ぴゅ': 'pyu', 'ぴょ': 'pyo',
    // Katakana
    'ア': 'a', 'イ': 'i', 'ウ': 'u', 'エ': 'e', 'オ': 'o',
    'カ': 'ka', 'キ': 'ki', 'ク': 'ku', 'ケ': 'ke', 'コ': 'ko',
    'サ': 'sa', 'シ': 'shi', 'ス': 'su', 'セ': 'se', 'ソ': 'so',
    'タ': 'ta', 'チ': 'chi', 'ツ': 'tsu', 'テ': 'te', 'ト': 'to',
    'ナ': 'na', 'ニ': 'ni', 'ヌ': 'nu', 'ネ': 'ne', 'ノ': 'no',
    'ハ': 'ha', 'ヒ': 'hi', 'フ': 'fu', 'ヘ': 'he', 'ホ': 'ho',
    'マ': 'ma', 'ミ': 'mi', 'ム': 'mu', 'メ': 'me', 'モ': 'mo',
    'ヤ': 'ya', 'ユ': 'yu', 'ヨ': 'yo',
    'ラ': 'ra', 'リ': 'ri', 'ル': 'ru', 'レ': 're', 'ロ': 'ro',
    'ワ': 'wa', 'ヲ': 'wo', 'ン': 'n',
    'ガ': 'ga', 'ギ': 'gi', 'グ': 'gu', 'ゲ': 'ge', 'ゴ': 'go',
    'ザ': 'za', 'ジ': 'ji', 'ズ': 'zu', 'ゼ': 'ze', 'ゾ': 'zo',
    'ダ': 'da', 'ヂ': 'ji', 'ヅ': 'zu', 'デ': 'de', 'ド': 'do',
    'バ': 'ba', 'ビ': 'bi', 'ブ': 'bu', 'ベ': 'be', 'ボ': 'bo',
    'パ': 'pa', 'ピ': 'pi', 'プ': 'pu', 'ペ': 'pe', 'ポ': 'po',
    'キャ': 'kya', 'キュ': 'kyu', 'キョ': 'kyo',
    'シャ': 'sha', 'シュ': 'shu', 'ショ': 'sho',
    'チャ': 'cha', 'チュ': 'chu', 'チョ': 'cho',
    'ニャ': 'nya', 'ニュ': 'nyu', 'ニョ': 'nyo',
    'ヒャ': 'hya', 'ヒュ': 'hyu', 'ヒョ': 'hyo',
    'ミャ': 'mya', 'ミュ': 'myu', 'ミョ': 'myo',
    'リャ': 'rya', 'リュ': 'ryu', 'リョ': 'ryo',
    'ギャ': 'gya', 'ギュ': 'gyu', 'ギョ': 'gyo',
    'ジャ': 'ja', 'ジュ': 'ju', 'ジョ': 'jo',
    'ビャ': 'bya', 'ビュ': 'byu', 'ビョ': 'byo',
    'ピャ': 'pya', 'ピュ': 'pyu', 'ピョ': 'pyo',
    'ー': '-',
  };

  let res = '';
  let i = 0;
  while (i < kana.length) {
    if (kana[i] === 'っ' || kana[i] === 'ッ') {
      const nextPair = kana.slice(i + 1, i + 3);
      const nextSingle = kana.slice(i + 1, i + 2);
      const nextRomaji = KANA_MAP[nextPair] || KANA_MAP[nextSingle] || '';
      if (nextRomaji) {
        res += nextRomaji[0] === 'c' ? 't' : nextRomaji[0];
      }
      i++;
      continue;
    }

    const two = kana.slice(i, i + 2);
    if (KANA_MAP[two]) {
      res += KANA_MAP[two];
      i += 2;
      continue;
    }

    const one = kana[i];
    if (KANA_MAP[one]) {
      res += KANA_MAP[one];
    } else {
      res += one;
    }
    i++;
  }

  return res.replace(/\s+/g, ' ').trim();
}

/**
 * Format teks tampilan Jepang: Kanji + (Furigana) atau cukup Kanji/Kana saja
 */
function formatJp(kanjiForm: string, kanaForm: string): string {
  if (!kanjiForm || kanjiForm === kanaForm || !/[\u4E00-\u9FAF]/.test(kanjiForm)) {
    return kanaForm || kanjiForm;
  }
  return `${kanjiForm} (${kanaForm})`;
}

/**
 * Membedah CardItem menjadi komponen Kanji dan Kana bersih
 * Menangani format Minna no Nihongo seperti "ねます (寝ます)" atau "つくえ (机)"
 */
interface DecomposedWord {
  raw: string;
  kanji: string;
  kana: string;
  romaji: string;
  isMasuForm: boolean;
  baseMeaning: string;
}

function decomposeWord(item: CardItem): DecomposedWord {
  let text = (item.japanese || item.kanji || '').trim();
  // Hilangkan penanda [な], （な）, (な) terlebih dahulu
  text = text.replace(/[\[\(（]な[\]\)）]/g, '').trim();
  // Hilangkan catatan kurung siku seperti [式が〜], [雨が〜], [〜分]
  text = text.replace(/\[.*?\]/g, '').trim();
  // Hilangkan partikel pendamping seperti （が）, (が), （を）, (を), （に）, (に)
  text = text.replace(/[（\(][がをにへとで][）\)]/g, '').trim();
  // Hilangkan tilde awal seperti 〜 atau ～ jika ada
  text = text.replace(/^[〜～~]/, '').trim();

  let kanjiText = text;
  let kanaText = (item.furigana || '').trim();

  // Ekstrak pasangan kurung: "ねます (寝ます)" atau "机 (つくえ)"
  const parenMatch = text.match(/^(.*?)\s*[（\(](.*?)[）\)]$/);
  if (parenMatch) {
    const p1 = parenMatch[1].trim();
    const p2 = parenMatch[2].trim();
    const p1HasKanji = /[\u4E00-\u9FAF]/.test(p1);
    const p2HasKanji = /[\u4E00-\u9FAF]/.test(p2);

    if (p1HasKanji && !p2HasKanji) {
      kanjiText = p1;
      kanaText = p2;
    } else if (p2HasKanji && !p1HasKanji) {
      kanjiText = p2;
      kanaText = p1;
    } else {
      kanjiText = p1;
      kanaText = p2;
    }
  }

  // Jika belum ada kanaText, gunakan kanjiText jika tidak beraksara kanji
  if (!kanaText) {
    if (!/[\u4E00-\u9FAF]/.test(kanjiText)) {
      kanaText = kanjiText;
    } else if (item.furigana) {
      kanaText = item.furigana.trim();
    } else {
      kanaText = kanjiText;
    }
  }

  let cleanRomaji = (item.reading || '').trim().toLowerCase();
  cleanRomaji = cleanRomaji.replace(/\[.*?\]/g, '').trim();
  cleanRomaji = cleanRomaji.replace(/[（\(].*?[）\)]/g, '').trim();

  const isMasu =
    kanaText.endsWith('ます') ||
    kanjiText.endsWith('ます') ||
    cleanRomaji.endsWith('masu');

  return {
    raw: text,
    kanji: kanjiText,
    kana: kanaText,
    romaji: cleanRomaji,
    isMasuForm: isMasu,
    baseMeaning: cleanBaseMeaning(item.meaningId),
  };
}

// Pemetaan baris vokal Godan (五段動詞)
interface GodanFamilyRules {
  a: string; i: string; u: string; e: string; o: string;
  te: string; ta: string;
  teRule: string;
}

const GODAN_TABLE: Record<string, GodanFamilyRules> = {
  'う': {
    a: 'わ', i: 'い', u: 'う', e: 'え', o: 'お',
    te: 'って', ta: 'った',
    teRule: 'Akhiran ~u berubah menjadi ~tte (konsonan ganda / tsu kecil).'
  },
  'く': {
    a: 'か', i: 'き', u: 'く', e: 'け', o: 'こ',
    te: 'いて', ta: 'いた',
    teRule: 'Akhiran ~ku berubah menjadi ~ite.'
  },
  'ぐ': {
    a: 'が', i: 'ぎ', u: 'ぐ', e: 'げ', o: 'ご',
    te: 'いで', ta: 'いだ',
    teRule: 'Akhiran ~gu berubah menjadi ~ide (bersuara).'
  },
  'す': {
    a: 'さ', i: 'し', u: 'す', e: 'せ', o: 'そ',
    te: 'して', ta: 'した',
    teRule: 'Akhiran ~su berubah menjadi ~shite.'
  },
  'つ': {
    a: 'た', i: 'ち', u: 'つ', e: 'て', o: 'と',
    te: 'って', ta: 'った',
    teRule: 'Akhiran ~tsu berubah menjadi ~tte.'
  },
  'ぬ': {
    a: 'な', i: 'に', u: 'ぬ', e: 'ね', o: 'の',
    te: 'んで', ta: 'んだ',
    teRule: 'Akhiran ~nu berubah menjadi ~nde.'
  },
  'ぶ': {
    a: 'ば', i: 'び', u: 'ぶ', e: 'べ', o: 'ぼ',
    te: 'んで', ta: 'んだ',
    teRule: 'Akhiran ~bu berubah menjadi ~nde.'
  },
  'む': {
    a: 'ま', i: 'み', u: 'む', e: 'め', o: 'も',
    te: 'んで', ta: 'んだ',
    teRule: 'Akhiran ~mu berubah menjadi ~nde.'
  },
  'る': {
    a: 'ら', i: 'り', u: 'る', e: 'れ', o: 'ろ',
    te: 'って', ta: 'った',
    teRule: 'Akhiran ~ru (Gol. 1) berubah menjadi ~tte.'
  },
};

const I_COLUMN_TO_GODAN_FAMILY: Record<string, string> = {
  'い': 'う',
  'き': 'く',
  'ぎ': 'ぐ',
  'し': 'す',
  'ち': 'つ',
  'に': 'ぬ',
  'び': 'ぶ',
  'み': 'む',
  'り': 'る',
};

/**
 * Konjugasi Kata Kerja (Verba: Golongan 1 / 2 / 3)
 */
function conjugateVerb(
  item: CardItem,
  classification: WordClassification
): WordConjugationProfile {
  const dec = decomposeWord(item);
  const baseMeaning = dec.baseMeaning;
  const forms: DetailedConjugationForm[] = [];

  const isTrap =
    TRAP_GODAN_VERB_SET.has(dec.kanji) ||
    TRAP_GODAN_VERB_SET.has(dec.kana) ||
    TRAP_GODAN_VERB_SET.has(dec.raw) ||
    (item.notes || '').toLowerCase().includes('jebakan');

  // ==========================================
  // 1. GOLONGAN 3: SURU (~する / ~します)
  // ==========================================
  const isSuruVerb =
    classification.type === 'verb_3' &&
    (dec.kana.endsWith('する') ||
      dec.kanji.endsWith('する') ||
      dec.kana.endsWith('します') ||
      dec.kanji.endsWith('します') ||
      dec.romaji.endsWith('suru') ||
      dec.romaji.endsWith('shimasu'));

  if (isSuruVerb) {
    let kanjiPrefix = dec.kanji.replace(/(します|する)$/, '');
    let kanaPrefix = dec.kana.replace(/(します|する)$/, '');
    const romajiPrefix = dec.romaji.replace(/(shimasu|suru)$/i, '').trim();

    // Pastikan jika kanjiPrefix kosong (murni verba "suru")
    const createSuruForm = (
      suffixKanji: string,
      suffixKana: string,
      meaningText: string,
      ruleText: string,
      formKey: string,
      formName: string,
      categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan',
      categoryGroupName: string
    ) => {
      const fullKanji = `${kanjiPrefix}${suffixKanji}`;
      const fullKana = `${kanaPrefix}${suffixKana}`;
      forms.push({
        formKey,
        formName,
        categoryGroup,
        categoryGroupName,
        japanese: formatJp(fullKanji, fullKana),
        reading: fullKana,
        romaji: kanaToRomaji(fullKana),
        meaningId: meaningText,
        rule: ruleText,
      });
    };

    createSuruForm('する', 'する', `${baseMeaning} (Kasual/Sekarang)`, 'Bentuk kamus dasar yang tercatat di kamus.', 'jisho', 'Bentuk Kamus (Jisho-kei)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createSuruForm('します', 'します', `${baseMeaning} (Sopan)`, 'Akhiran する diubah menjadi します (shimasu).', 'masu', 'Bentuk Sopan (+)', 'sopan', 'Bentuk Sopan (Masu)');
    createSuruForm('しません', 'しません', `Tidak ${baseMeaning.toLowerCase()} (Sopan)`, 'Akhiran する diubah menjadi しません (shimasen).', 'masen', 'Bentuk Sopan Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
    createSuruForm('しました', 'しました', `Sudah ${baseMeaning.toLowerCase()} (Sopan)`, 'Akhiran する diubah menjadi しました (shimashita).', 'mashita', 'Bentuk Sopan Lampau (+)', 'sopan', 'Bentuk Sopan (Masu)');
    createSuruForm('しませんでした', 'しませんでした', `Tidak / Belum ${baseMeaning.toLowerCase()} (Lampau Sopan)`, 'Akhiran する diubah menjadi しませんでした (shimasendeshita).', 'masendeshita', 'Bentuk Sopan Lampau Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
    createSuruForm('して', 'して', `${baseMeaning}lah / Silakan ${baseMeaning.toLowerCase()} / dan...`, 'Akhiran する diubah menjadi して (shite).', 'te', 'Bentuk ~Te (Sambung / Mohon)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createSuruForm('しない', 'しない', `Tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Akhiran する diubah menjadi しない (shinai).', 'nai', 'Bentuk Kasual Negatif (~Nai)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createSuruForm('した', 'した', `Sudah ${baseMeaning.toLowerCase()} (Kasual)`, 'Akhiran する diubah menjadi した (shita).', 'ta', 'Bentuk Kasual Lampau (~Ta)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createSuruForm('しなかった', 'しなかった', `Tadi tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Bentuk ~nai + かった -> しなかった (shinakatta).', 'nakatta', 'Bentuk Kasual Lampau Negatif', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createSuruForm('すれば', 'すれば', `Jika / Seandainya ${baseMeaning.toLowerCase()}`, 'Akhiran する diubah menjadi すれば (sureba).', 'ba', 'Bentuk Syarat (~Ba)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createSuruForm('したら', 'したら', `Kalau sudah ${baseMeaning.toLowerCase()} / Seandainya...`, 'Bentuk ~ta + ら -> したら (shitara).', 'tara', 'Bentuk Pengandaian (~Tara)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createSuruForm('しよう', 'しよう', `Ayo / Mari ${baseMeaning.toLowerCase()}`, 'Akhiran する diubah menjadi しよう (shiyou).', 'volitional', 'Bentuk Ajakan (~You / Mari)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createSuruForm('できる', 'できる', `Bisa / Sanggup ${baseMeaning.toLowerCase()}`, 'Bentuk potensial dari する berubah menjadi できる (dekiru).', 'potential', 'Bentuk Potensial (Bisa / Sanggup)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createSuruForm('される', 'される', `Di-${baseMeaning.toLowerCase()} / Dikenai aksi`, 'Akhiran する diubah menjadi される (sareru).', 'passive', 'Bentuk Pasif (Di- / Dikenai)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createSuruForm('させる', 'させる', `Menyuruh / Mengizinkan ${baseMeaning.toLowerCase()}`, 'Akhiran する diubah menjadi させる (saseru).', 'causative', 'Bentuk Kausatif (Menyuruh / Membiarkan)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createSuruForm('しろ', 'しろ', `${baseMeaning}lah! (Perintah tegas)`, 'Akhiran する diubah menjadi しろ (shiro).', 'imperative', 'Bentuk Perintah (Kasual / Tegas)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');

    return {
      id: item.id,
      originalCard: item,
      japanese: formatJp(`${kanjiPrefix}する`, `${kanaPrefix}する`),
      kanji: kanjiPrefix !== kanaPrefix ? `${kanjiPrefix}する` : undefined,
      reading: `${kanaPrefix}する`,
      furigana: item.furigana || `${kanaPrefix}する`,
      meaningId: item.meaningId,
      classification,
      groupLabel: 'Golongan 3 (不規則 Fukisoku: する)',
      quickForms: {
        masu: formatJp(`${kanjiPrefix}します`, `${kanaPrefix}します`),
        te: formatJp(`${kanjiPrefix}して`, `${kanaPrefix}して`),
        nai: formatJp(`${kanjiPrefix}しない`, `${kanaPrefix}しない`),
        ta: formatJp(`${kanjiPrefix}した`, `${kanaPrefix}した`),
      },
      forms,
    };
  }

  // ==========================================
  // 2. GOLONGAN 3: KURU (来る / くる)
  // ==========================================
  const isKuruVerb =
    classification.type === 'verb_3' &&
    (dec.kanji.endsWith('来る') ||
      dec.kanji.endsWith('来ます') ||
      dec.kana.endsWith('くる') ||
      dec.kana.endsWith('きます') ||
      dec.romaji.endsWith('kuru') ||
      dec.romaji.endsWith('kimasu'));

  if (isKuruVerb) {
    const kanjiPrefix = dec.kanji.replace(/(来る|来ます|くる|きます)$/, '');
    const kanaPrefix = dec.kana.replace(/(来る|来ます|くる|きます)$/, '');

    const createKuruForm = (
      suffixKanji: string,
      suffixKana: string,
      meaningText: string,
      ruleText: string,
      formKey: string,
      formName: string,
      categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan',
      categoryGroupName: string
    ) => {
      const fullKanji = `${kanjiPrefix}${suffixKanji}`;
      const fullKana = `${kanaPrefix}${suffixKana}`;
      forms.push({
        formKey,
        formName,
        categoryGroup,
        categoryGroupName,
        japanese: formatJp(fullKanji, fullKana),
        reading: fullKana,
        romaji: kanaToRomaji(fullKana),
        meaningId: meaningText,
        rule: ruleText,
      });
    };

    createKuruForm('来る', 'くる', `${baseMeaning} (Kasual/Sekarang)`, 'Bentuk dasar kamus tidak beraturan.', 'jisho', 'Bentuk Kamus (Jisho-kei)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createKuruForm('来ます', 'きます', `${baseMeaning} (Sopan)`, 'Dibaca "ki" + ます -> きます (kimasu).', 'masu', 'Bentuk Sopan (+)', 'sopan', 'Bentuk Sopan (Masu)');
    createKuruForm('来ません', 'きません', `Tidak ${baseMeaning.toLowerCase()} (Sopan)`, 'Dibaca "ki" + ません -> きません (kimasen).', 'masen', 'Bentuk Sopan Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
    createKuruForm('来ました', 'きました', `Sudah ${baseMeaning.toLowerCase()} (Sopan)`, 'Dibaca "ki" + ました -> きました (kimashita).', 'mashita', 'Bentuk Sopan Lampau (+)', 'sopan', 'Bentuk Sopan (Masu)');
    createKuruForm('来ませんでした', 'きませんでした', `Tidak / Belum ${baseMeaning.toLowerCase()} (Lampau Sopan)`, 'Dibaca "ki" + ませんでした (kimasendeshita).', 'masendeshita', 'Bentuk Sopan Lampau Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
    createKuruForm('来て', 'きて', `${baseMeaning}lah / Silakan ${baseMeaning.toLowerCase()} / dan...`, 'Kanji 来 dibaca "ki" + て -> きて (kite).', 'te', 'Bentuk ~Te (Sambung / Mohon)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createKuruForm('来ない', 'こない', `Tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Hati-hati! Bunyi kanji 来 berubah menjadi "ko" + ない -> こない (konai).', 'nai', 'Bentuk Kasual Negatif (~Nai)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createKuruForm('来た', 'きた', `Sudah ${baseMeaning.toLowerCase()} (Kasual)`, 'Dibaca "ki" + た -> きた (kita).', 'ta', 'Bentuk Kasual Lampau (~Ta)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createKuruForm('来なかった', 'こなかった', `Tadi tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Dibaca "ko" + なかった -> こなかった (konakatta).', 'nakatta', 'Bentuk Kasual Lampau Negatif', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createKuruForm('来れば', 'くれば', `Jika / Seandainya ${baseMeaning.toLowerCase()}`, 'Dibaca "ku" + れば -> くれば (kureba).', 'ba', 'Bentuk Syarat (~Ba)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createKuruForm('来たら', 'きたら', `Kalau sudah ${baseMeaning.toLowerCase()} / Seandainya...`, 'Bentuk ~ta + ら -> きたら (kitara).', 'tara', 'Bentuk Pengandaian (~Tara)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createKuruForm('来よう', 'こよう', `Ayo / Mari ${baseMeaning.toLowerCase()}`, 'Dibaca "ko" + よう -> こよう (koyou).', 'volitional', 'Bentuk Ajakan (~You / Mari)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createKuruForm('来られる', 'こられる', `Bisa / Sanggup ${baseMeaning.toLowerCase()}`, 'Dibaca "ko" + られる -> こられる (korareru).', 'potential', 'Bentuk Potensial (Bisa / Sanggup)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createKuruForm('来られる', 'こられる', `Didatangi (Pasif)`, 'Bentuk pasif sama dengan potensial: こられる (korareru).', 'passive', 'Bentuk Pasif (Di- / Dikenai)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createKuruForm('来させる', 'こさせる', `Menyuruh ${baseMeaning.toLowerCase()}`, 'Dibaca "ko" + させる -> こさせる (kosaseru).', 'causative', 'Bentuk Kausatif (Menyuruh / Membiarkan)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createKuruForm('来い', 'こい', `${baseMeaning}lah! (Perintah tegas)`, 'Dibaca "ko" + い -> こい (koi).', 'imperative', 'Bentuk Perintah (Kasual / Tegas)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');

    return {
      id: item.id,
      originalCard: item,
      japanese: formatJp(`${kanjiPrefix}来る`, `${kanaPrefix}くる`),
      kanji: kanjiPrefix !== kanaPrefix ? `${kanjiPrefix}来る` : undefined,
      reading: `${kanaPrefix}くる`,
      furigana: item.furigana || `${kanaPrefix}くる`,
      meaningId: item.meaningId,
      classification,
      groupLabel: kanjiPrefix ? 'Golongan 3 (不規則 Fukisoku: 〜くる)' : 'Golongan 3 (不規則 Fukisoku: くる)',
      quickForms: {
        masu: formatJp(`${kanjiPrefix}来ます`, `${kanaPrefix}きます`),
        te: formatJp(`${kanjiPrefix}来て`, `${kanaPrefix}きて`),
        nai: formatJp(`${kanjiPrefix}来ない`, `${kanaPrefix}こない`),
        ta: formatJp(`${kanjiPrefix}来た`, `${kanaPrefix}きた`),
      },
      forms,
    };
  }

  // ==========================================
  // 3. GOLONGAN 2: ICHIDAN (一段動詞)
  // ==========================================
  const isIchidan = classification.type === 'verb_2' && !isTrap;

  if (isIchidan) {
    let kanjiStem = dec.kanji;
    let kanaStem = dec.kana;

    if (dec.isMasuForm) {
      kanjiStem = dec.kanji.replace(/ます$/, '');
      kanaStem = dec.kana.replace(/ます$/, '');
    } else {
      kanjiStem = dec.kanji.replace(/る$/, '');
      kanaStem = dec.kana.replace(/る$/, '');
    }

    const createIchidanForm = (
      suffix: string,
      meaningText: string,
      ruleText: string,
      formKey: string,
      formName: string,
      categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan',
      categoryGroupName: string
    ) => {
      const fullKanji = `${kanjiStem}${suffix}`;
      const fullKana = `${kanaStem}${suffix}`;
      forms.push({
        formKey,
        formName,
        categoryGroup,
        categoryGroupName,
        japanese: formatJp(fullKanji, fullKana),
        reading: fullKana,
        romaji: kanaToRomaji(fullKana),
        meaningId: meaningText,
        rule: ruleText,
      });
    };

    createIchidanForm('る', `${baseMeaning} (Kasual/Sekarang)`, 'Bentuk kamus berakhiran vokal -i/-e + る.', 'jisho', 'Bentuk Kamus (Jisho-kei)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createIchidanForm('ます', `${baseMeaning} (Sopan)`, 'Buang akhiran ~る, tambahkan ~ます (masu).', 'masu', 'Bentuk Sopan (+)', 'sopan', 'Bentuk Sopan (Masu)');
    createIchidanForm('ません', `Tidak ${baseMeaning.toLowerCase()} (Sopan)`, 'Buang akhiran ~る, tambahkan ~ません (masen).', 'masen', 'Bentuk Sopan Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
    createIchidanForm('ました', `Sudah ${baseMeaning.toLowerCase()} (Sopan)`, 'Buang akhiran ~る, tambahkan ~ました (mashita).', 'mashita', 'Bentuk Sopan Lampau (+)', 'sopan', 'Bentuk Sopan (Masu)');
    createIchidanForm('ませんでした', `Tidak / Belum ${baseMeaning.toLowerCase()} (Lampau Sopan)`, 'Buang akhiran ~る, tambahkan ~ませんでした (masendeshita).', 'masendeshita', 'Bentuk Sopan Lampau Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
    createIchidanForm('て', `${baseMeaning}lah / Silakan ${baseMeaning.toLowerCase()} / dan...`, 'Buang akhiran ~る, tambahkan ~て (te).', 'te', 'Bentuk ~Te (Sambung / Mohon)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createIchidanForm('ない', `Tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Buang akhiran ~る, tambahkan ~ない (nai).', 'nai', 'Bentuk Kasual Negatif (~Nai)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createIchidanForm('た', `Sudah ${baseMeaning.toLowerCase()} (Kasual)`, 'Buang akhiran ~る, tambahkan ~た (ta).', 'ta', 'Bentuk Kasual Lampau (~Ta)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createIchidanForm('なかった', `Tadi tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Bentuk ~nai (ない) diganti ~なかった (nakatta).', 'nakatta', 'Bentuk Kasual Lampau Negatif', 'dasar_kasual', 'Bentuk Dasar & Kasual');
    createIchidanForm('れば', `Jika / Seandainya ${baseMeaning.toLowerCase()}`, 'Buang akhiran ~る, tambahkan ~れば (reba).', 'ba', 'Bentuk Syarat (~Ba)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createIchidanForm('たら', `Kalau sudah ${baseMeaning.toLowerCase()} / Seandainya...`, 'Bentuk ~ta + ら -> ~たら (tara).', 'tara', 'Bentuk Pengandaian (~Tara)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
    createIchidanForm('よう', `Ayo / Mari ${baseMeaning.toLowerCase()}`, 'Buang akhiran ~る, tambahkan ~よう (you).', 'volitional', 'Bentuk Ajakan (~You / Mari)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createIchidanForm('られる', `Bisa / Sanggup ${baseMeaning.toLowerCase()}`, 'Buang akhiran ~る, tambahkan ~られる (rareru).', 'potential', 'Bentuk Potensial (Bisa / Sanggup)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createIchidanForm('られる', `Di-${baseMeaning.toLowerCase()} / Dikenai aksi`, 'Buang akhiran ~る, tambahkan ~られる (rareru).', 'passive', 'Bentuk Pasif (Di- / Dikenai)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createIchidanForm('させる', `Menyuruh / Membiarkan ${baseMeaning.toLowerCase()}`, 'Buang akhiran ~る, tambahkan ~させる (saseru).', 'causative', 'Bentuk Kausatif (Menyuruh / Membiarkan)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
    createIchidanForm('ろ', `${baseMeaning}lah! (Perintah tegas)`, 'Buang akhiran ~る, tambahkan ~ろ (ro).', 'imperative', 'Bentuk Perintah (Kasual / Tegas)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');

    return {
      id: item.id,
      originalCard: item,
      japanese: formatJp(`${kanjiStem}る`, `${kanaStem}る`),
      kanji: kanjiStem !== kanaStem ? `${kanjiStem}る` : undefined,
      reading: `${kanaStem}る`,
      furigana: item.furigana || `${kanaStem}る`,
      meaningId: item.meaningId,
      classification,
      groupLabel: 'Golongan 2 (一段 Ichidan)',
      quickForms: {
        masu: formatJp(`${kanjiStem}ます`, `${kanaStem}ます`),
        te: formatJp(`${kanjiStem}て`, `${kanaStem}て`),
        nai: formatJp(`${kanjiStem}ない`, `${kanaStem}ない`),
        ta: formatJp(`${kanjiStem}た`, `${kanaStem}た`),
      },
      forms,
    };
  }

  // ==========================================
  // 4. GOLONGAN 1: GODAN (五段動詞)
  // Termasuk verba jebakan seperti 帰る, 入る, 走る, 知る, 切る, 要る
  // ==========================================
  let family = 'る';
  let stemKanji = dec.kanji;
  let stemKana = dec.kana;

  if (dec.isMasuForm) {
    const withoutMasuKana = dec.kana.replace(/ます$/, '');
    const withoutMasuKanji = dec.kanji.replace(/ます$/, '');
    const lastMora = withoutMasuKana.slice(-1);
    family = I_COLUMN_TO_GODAN_FAMILY[lastMora] || 'る';
    stemKana = withoutMasuKana.slice(0, -1);
    stemKanji = withoutMasuKanji.length > 1 ? withoutMasuKanji.slice(0, -1) : withoutMasuKanji;
  } else {
    family = dec.kana.slice(-1);
    stemKana = dec.kana.slice(0, -1);
    stemKanji = dec.kanji.slice(0, -1);
  }

  // Pengecualian khusus: 行く (iku)
  const isIku =
    dec.kanji === '行く' ||
    dec.kanji.startsWith('行き') ||
    dec.kana === 'いく' ||
    dec.kana.startsWith('いき') ||
    dec.romaji.startsWith('ik');

  // Pengecualian khusus: ある (aru)
  const isAru =
    dec.kanji === 'ある' ||
    dec.kanji === 'あります' ||
    dec.kana === 'ある' ||
    dec.kana === 'あります' ||
    dec.romaji === 'aru' ||
    dec.romaji === 'arimasu';

  const vMap = GODAN_TABLE[family] || GODAN_TABLE['る'];

  const teKana = isIku ? 'って' : vMap.te;
  const taKana = isIku ? 'った' : vMap.ta;
  const teRule = isIku
    ? 'Pengecualian khusus: 行く berubah menjadi 行って (itte).'
    : vMap.teRule;

  const createGodanForm = (
    kanjiSuffix: string,
    kanaSuffix: string,
    meaningText: string,
    ruleText: string,
    formKey: string,
    formName: string,
    categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan',
    categoryGroupName: string
  ) => {
    const fullKanji = `${stemKanji}${kanjiSuffix}`;
    const fullKana = `${stemKana}${kanaSuffix}`;
    forms.push({
      formKey,
      formName,
      categoryGroup,
      categoryGroupName,
      japanese: formatJp(fullKanji, fullKana),
      reading: fullKana,
      romaji: kanaToRomaji(fullKana),
      meaningId: meaningText,
      rule: ruleText,
    });
  };

  createGodanForm(vMap.u, vMap.u, `${baseMeaning} (Kasual/Sekarang)`, 'Bentuk kamus dasar yang memutar 5 vokal (a, i, u, e, o).', 'jisho', 'Bentuk Kamus (Jisho-kei)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createGodanForm(`${vMap.i}ます`, `${vMap.i}ます`, `${baseMeaning} (Sopan)`, `Ubah vokal -u akhir (${family}) ke baris -i (${vMap.i}) + ます.`, 'masu', 'Bentuk Sopan (+)', 'sopan', 'Bentuk Sopan (Masu)');
  createGodanForm(`${vMap.i}ません`, `${vMap.i}ません`, `Tidak ${baseMeaning.toLowerCase()} (Sopan)`, `Ubah vokal -u akhir (${family}) ke baris -i (${vMap.i}) + ません.`, 'masen', 'Bentuk Sopan Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
  createGodanForm(`${vMap.i}ました`, `${vMap.i}ました`, `Sudah ${baseMeaning.toLowerCase()} (Sopan)`, `Ubah vokal -u akhir (${family}) ke baris -i (${vMap.i}) + ました.`, 'mashita', 'Bentuk Sopan Lampau (+)', 'sopan', 'Bentuk Sopan (Masu)');
  createGodanForm(`${vMap.i}ませんでした`, `${vMap.i}ませんでした`, `Tidak / Belum ${baseMeaning.toLowerCase()} (Lampau Sopan)`, `Ubah vokal -u akhir (${family}) ke baris -i (${vMap.i}) + ませんでした.`, 'masendeshita', 'Bentuk Sopan Lampau Negatif (-)', 'sopan', 'Bentuk Sopan (Masu)');
  createGodanForm(teKana, teKana, `${baseMeaning}lah / Silakan ${baseMeaning.toLowerCase()} / dan...`, teRule, 'te', 'Bentuk ~Te (Sambung / Mohon)', 'sambung_syarat', 'Bentuk Sambung & Syarat');

  // Bentuk Nai (Negatif Kasual)
  if (isAru) {
    forms.push({
      formKey: 'nai',
      formName: 'Bentuk Kasual Negatif (~Nai)',
      categoryGroup: 'dasar_kasual',
      categoryGroupName: 'Bentuk Dasar & Kasual',
      japanese: 'ない',
      reading: 'ない',
      romaji: 'nai',
      meaningId: `Tidak ada (Kasual)`,
      rule: 'Pengecualian khusus kata kerja ある (aru): bentuk negatif kasualnya adalah "ない" (bukan aranai).',
    });
  } else {
    createGodanForm(`${vMap.a}ない`, `${vMap.a}ない`, `Tidak ${baseMeaning.toLowerCase()} (Kasual)`, `Ubah vokal akhir (${family}) ke baris -a (${vMap.a}) + ない.`, 'nai', 'Bentuk Kasual Negatif (~Nai)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  }

  createGodanForm(taKana, taKana, `Sudah ${baseMeaning.toLowerCase()} (Kasual)`, `Bentuk lampau kasual mengikuti aturan bentuk ~Te: ${teRule}`, 'ta', 'Bentuk Kasual Lampau (~Ta)', 'dasar_kasual', 'Bentuk Dasar & Kasual');

  // Bentuk Nakatta
  if (isAru) {
    forms.push({
      formKey: 'nakatta',
      formName: 'Bentuk Kasual Lampau Negatif',
      categoryGroup: 'dasar_kasual',
      categoryGroupName: 'Bentuk Dasar & Kasual',
      japanese: 'なかった',
      reading: 'なかった',
      romaji: 'nakatta',
      meaningId: `Tadi tidak ada (Kasual)`,
      rule: 'Bentuk ~nai (ない) + かった -> なかった.',
    });
  } else {
    createGodanForm(`${vMap.a}なかった`, `${vMap.a}なかった`, `Tadi tidak ${baseMeaning.toLowerCase()} (Kasual)`, `Bentuk ~nai (${vMap.a}ない) diganti ~${vMap.a}なかった.`, 'nakatta', 'Bentuk Kasual Lampau Negatif', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  }

  createGodanForm(`${vMap.e}ば`, `${vMap.e}ば`, `Jika / Seandainya ${baseMeaning.toLowerCase()}`, `Ubah vokal -u akhir (${family}) ke baris -e (${vMap.e}) + ば.`, 'ba', 'Bentuk Syarat (~Ba)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createGodanForm(`${taKana}ら`, `${taKana}ら`, `Kalau sudah ${baseMeaning.toLowerCase()} / Seandainya...`, `Bentuk lampau (~ta) + ら -> ${taKana}ら.`, 'tara', 'Bentuk Pengandaian (~Tara)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createGodanForm(`${vMap.o}う`, `${vMap.o}う`, `Ayo / Mari ${baseMeaning.toLowerCase()}`, `Ubah vokal akhir (${family}) ke baris -o (${vMap.o}) + う (bunyi panjang).`, 'volitional', 'Bentuk Ajakan (~You / Mari)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
  createGodanForm(`${vMap.e}る`, `${vMap.e}る`, `Bisa / Sanggup ${baseMeaning.toLowerCase()}`, `Ubah vokal -u akhir (${family}) ke baris -e (${vMap.e}) + る.`, 'potential', 'Bentuk Potensial (Bisa / Sanggup)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
  createGodanForm(`${vMap.a}れる`, `${vMap.a}れる`, `Di-${baseMeaning.toLowerCase()} / Dikenai aksi`, `Ubah vokal -u akhir (${family}) ke baris -a (${vMap.a}) + れる.`, 'passive', 'Bentuk Pasif (Di- / Dikenai)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
  createGodanForm(`${vMap.a}せる`, `${vMap.a}せる`, `Menyuruh / Membiarkan ${baseMeaning.toLowerCase()}`, `Ubah vokal -u akhir (${family}) ke baris -a (${vMap.a}) + せる.`, 'causative', 'Bentuk Kausatif (Menyuruh / Membiarkan)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
  createGodanForm(vMap.e, vMap.e, `${baseMeaning}lah! (Perintah tegas)`, `Ubah vokal -u akhir (${family}) ke baris -e (${vMap.e}).`, 'imperative', 'Bentuk Perintah (Kasual / Tegas)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');

  const jishoDisplay = formatJp(`${stemKanji}${vMap.u}`, `${stemKana}${vMap.u}`);
  const masuDisplay = formatJp(`${stemKanji}${vMap.i}ます`, `${stemKana}${vMap.i}ます`);
  const teDisplay = formatJp(`${stemKanji}${teKana}`, `${stemKana}${teKana}`);
  const naiDisplay = isAru ? 'ない' : formatJp(`${stemKanji}${vMap.a}ない`, `${stemKana}${vMap.a}ない`);
  const taDisplay = formatJp(`${stemKanji}${taKana}`, `${stemKana}${taKana}`);

  return {
    id: item.id,
    originalCard: item,
    japanese: jishoDisplay,
    kanji: stemKanji !== stemKana ? `${stemKanji}${vMap.u}` : undefined,
    reading: `${stemKana}${vMap.u}`,
    furigana: item.furigana || `${stemKana}${vMap.u}`,
    meaningId: item.meaningId,
    classification,
    groupLabel: isTrap
      ? 'Golongan 1 (五段 Godan - Verba Jebakan)'
      : 'Golongan 1 (五段 Godan)',
    isException: isTrap,
    exceptionNote: isTrap
      ? `Hati-hati! Kata "${dec.raw}" berakhiran bunyi -iru / -eru, namun BUKAN Golongan 2! Kata ini adalah verba Golongan 1 (五段) murni, sehingga bentuk ~masu menjadi ${masuDisplay} dan bentuk ~te menjadi ${teDisplay}.`
      : undefined,
    quickForms: {
      masu: masuDisplay,
      te: teDisplay,
      nai: naiDisplay,
      ta: taDisplay,
    },
    forms,
  };
}

/**
 * Konjugasi Kata Sifat -i (い形容詞)
 */
function conjugateAdjI(
  item: CardItem,
  classification: WordClassification
): WordConjugationProfile {
  const dec = decomposeWord(item);
  const baseMeaning = dec.baseMeaning;
  const forms: DetailedConjugationForm[] = [];

  // Pengecualian khusus: いい (ii / bagus) -> berubah menggunakan akar kata "よい" (yoi)
  const isIi =
    dec.kanji === 'いい' ||
    dec.kanji === '良い' ||
    dec.kana === 'いい' ||
    dec.kana === 'よい' ||
    dec.romaji === 'ii' ||
    dec.romaji === 'yoi';

  if (isIi) {
    forms.push(
      {
        formKey: 'present_pos',
        formName: 'Bentuk Positif Sekarang (Kamus)',
        categoryGroup: 'dasar_kasual',
        categoryGroupName: 'Bentuk Dasar & Kasual',
        japanese: 'いい / よい',
        reading: 'いい',
        romaji: 'ii / yoi',
        meaningId: 'Bagus / Baik (Kasual)',
        rule: 'Bentuk kamus dasar kata sifat "bagus".',
      },
      {
        formKey: 'sopan_pos',
        formName: 'Bentuk Sopan (+)',
        categoryGroup: 'sopan',
        categoryGroupName: 'Bentuk Sopan (Desu)',
        japanese: 'いいです / よいです',
        reading: 'いいです',
        romaji: 'ii desu',
        meaningId: 'Bagus / Baik (Sopan)',
        rule: 'Bentuk kamus + です (desu).',
      },
      {
        formKey: 'present_neg',
        formName: 'Bentuk Negatif Kasual (-)',
        categoryGroup: 'dasar_kasual',
        categoryGroupName: 'Bentuk Dasar & Kasual',
        japanese: 'よくない',
        reading: 'よくない',
        romaji: 'yokunai',
        meaningId: 'Tidak bagus (Kasual)',
        rule: 'Hati-hati! Kata "ii" selalu kembali ke akar "yoi" -> よくない (yokunai).',
      },
      {
        formKey: 'sopan_neg',
        formName: 'Bentuk Negatif Sopan (-)',
        categoryGroup: 'sopan',
        categoryGroupName: 'Bentuk Sopan (Desu)',
        japanese: 'よくないです / よくありません',
        reading: 'よくないです',
        romaji: 'yokunai desu',
        meaningId: 'Tidak bagus (Sopan)',
        rule: 'Akar kata よい + くないです / くありません.',
      },
      {
        formKey: 'past_pos',
        formName: 'Bentuk Lampau Kasual (+)',
        categoryGroup: 'dasar_kasual',
        categoryGroupName: 'Bentuk Dasar & Kasual',
        japanese: 'よかった',
        reading: 'よかった',
        romaji: 'yokatta',
        meaningId: 'Dulu / Kemarin bagus (Kasual)',
        rule: 'Akar kata よい -> よかった (yokatta).',
      },
      {
        formKey: 'sopan_past_pos',
        formName: 'Bentuk Lampau Sopan (+)',
        categoryGroup: 'sopan',
        categoryGroupName: 'Bentuk Sopan (Desu)',
        japanese: 'よかったです',
        reading: 'よかったです',
        romaji: 'yokatta desu',
        meaningId: 'Dulu / Kemarin bagus (Sopan)',
        rule: 'Bentuk よかった + です.',
      },
      {
        formKey: 'past_neg',
        formName: 'Bentuk Lampau Negatif Kasual (-)',
        categoryGroup: 'dasar_kasual',
        categoryGroupName: 'Bentuk Dasar & Kasual',
        japanese: 'よくなかった',
        reading: 'よくなかった',
        romaji: 'yokunakatta',
        meaningId: 'Dulu tidak bagus (Kasual)',
        rule: 'Bentuk よくない -> よくなかった (yokunakatta).',
      },
      {
        formKey: 'sopan_past_neg',
        formName: 'Bentuk Lampau Negatif Sopan (-)',
        categoryGroup: 'sopan',
        categoryGroupName: 'Bentuk Sopan (Desu)',
        japanese: 'よくなかったです / よくありませんでした',
        reading: 'よくなかったです',
        romaji: 'yokunakatta desu',
        meaningId: 'Dulu tidak bagus (Sopan)',
        rule: 'Bentuk よくなかった + です.',
      },
      {
        formKey: 'te',
        formName: 'Bentuk ~Te (Dan / Sambung)',
        categoryGroup: 'sambung_syarat',
        categoryGroupName: 'Bentuk Sambung & Syarat',
        japanese: 'よくて',
        reading: 'よくて',
        romaji: 'yokute',
        meaningId: 'Bagus dan...',
        rule: 'Akar kata よい -> よくて (yokute).',
      },
      {
        formKey: 'ba',
        formName: 'Bentuk Syarat (~Ba)',
        categoryGroup: 'sambung_syarat',
        categoryGroupName: 'Bentuk Sambung & Syarat',
        japanese: 'よければ',
        reading: 'よければ',
        romaji: 'yokereba',
        meaningId: 'Jika / Kalau bagus',
        rule: 'Akar kata よい -> よければ (yokereba).',
      },
      {
        formKey: 'tara',
        formName: 'Bentuk Pengandaian (~Tara)',
        categoryGroup: 'sambung_syarat',
        categoryGroupName: 'Bentuk Sambung & Syarat',
        japanese: 'よかったら',
        reading: 'よかったら',
        romaji: 'yokattara',
        meaningId: 'Kalau memang bagus / Jika berkenan...',
        rule: 'Bentuk lampau よかった + ら -> よかったら.',
      },
      {
        formKey: 'adverb',
        formName: 'Bentuk Keterangan (Adverbial)',
        categoryGroup: 'turunan_lanjutan',
        categoryGroupName: 'Bentuk Lanjutan & Ragam Fungsi',
        japanese: 'よく',
        reading: 'よく',
        romaji: 'yoku',
        meaningId: 'Dengan baik / sering',
        rule: 'Akar kata よい -> よく (yoku). Menjelaskan kata kerja sesudahnya (misal: よく寝る / tidur dengan nyenyak).',
      },
      {
        formKey: 'sou',
        formName: 'Bentuk Dugaan (~Sou)',
        categoryGroup: 'turunan_lanjutan',
        categoryGroupName: 'Bentuk Lanjutan & Ragam Fungsi',
        japanese: 'よさそう',
        reading: 'よさそう',
        romaji: 'yosasou',
        meaningId: 'Kelihatannya bagus',
        rule: 'Pengecualian khusus dugaan: よさ + そう -> よさそう (yosasou).',
      }
    );

    return {
      id: item.id,
      originalCard: item,
      japanese: 'いい (良い)',
      kanji: '良い',
      reading: 'いい',
      furigana: 'いい',
      meaningId: item.meaningId,
      classification,
      groupLabel: 'Kata Sifat -i (Pengecualian Khusus: ii -> yoi)',
      isException: true,
      exceptionNote: 'Kata sifat "ii" (bagus) jika dikonjugasikan (negatif, lampau, te, ba) selalu kembali ke akar kata aslinya yaitu "yoi" (yokunai, yokatta, yokute, yokereba).',
      quickForms: {
        masu: 'いいです (ii desu)',
        te: 'よくて (yokute)',
        nai: 'よくない (yokunai)',
        ta: 'よかった (yokatta)',
      },
      forms,
    };
  }

  // Regular i-adjective
  const stemKanji = dec.kanji.replace(/い$/, '');
  const stemKana = dec.kana.replace(/い$/, '');

  const createAdjIForm = (
    kanjiSuffix: string,
    kanaSuffix: string,
    meaningText: string,
    ruleText: string,
    formKey: string,
    formName: string,
    categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan',
    categoryGroupName: string
  ) => {
    const fullKanji = `${stemKanji}${kanjiSuffix}`;
    const fullKana = `${stemKana}${kanaSuffix}`;
    forms.push({
      formKey,
      formName,
      categoryGroup,
      categoryGroupName,
      japanese: formatJp(fullKanji, fullKana),
      reading: fullKana,
      romaji: kanaToRomaji(fullKana),
      meaningId: meaningText,
      rule: ruleText,
    });
  };

  createAdjIForm('い', 'い', `${baseMeaning} (Kasual)`, 'Bentuk kamus berakhiran huruf hiragana い.', 'present_pos', 'Bentuk Positif Sekarang (Kamus)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjIForm('いです', 'いです', `${baseMeaning} (Sopan)`, 'Bentuk kamus + です (desu).', 'sopan_pos', 'Bentuk Sopan (+)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjIForm('くない', 'くない', `Tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Buang akhiran ~い, tambahkan ~くない (kunai).', 'present_neg', 'Bentuk Negatif Kasual (-)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjIForm('くないです', 'くないです', `Tidak ${baseMeaning.toLowerCase()} (Sopan)`, 'Bentuk ~kunai + です atau ragam formal ~ku arimasen.', 'sopan_neg', 'Bentuk Negatif Sopan (-)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjIForm('かった', 'かった', `Dulu / Kemarin ${baseMeaning.toLowerCase()} (Kasual)`, 'Buang akhiran ~い, tambahkan ~かった (katta).', 'past_pos', 'Bentuk Lampau Kasual (+)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjIForm('かったです', 'かったです', `Dulu / Kemarin ${baseMeaning.toLowerCase()} (Sopan)`, 'Bentuk ~katta + です.', 'sopan_past_pos', 'Bentuk Lampau Sopan (+)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjIForm('くなかった', 'くなかった', `Dulu tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Bentuk negatif ~kunai diganti ~くなかった (kunakatta).', 'past_neg', 'Bentuk Lampau Negatif Kasual (-)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjIForm('くなかったです', 'くなかったです', `Dulu tidak ${baseMeaning.toLowerCase()} (Sopan)`, 'Bentuk ~kunakatta + です.', 'sopan_past_neg', 'Bentuk Lampau Negatif Sopan (-)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjIForm('くて', 'くて', `${baseMeaning} dan...`, 'Buang akhiran ~い, tambahkan ~くて (kute).', 'te', 'Bentuk ~Te (Dan / Sambung)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createAdjIForm('ければ', 'ければ', `Jika / Seandainya ${baseMeaning.toLowerCase()}`, 'Buang akhiran ~い, tambahkan ~ければ (kereba).', 'ba', 'Bentuk Syarat (~Ba)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createAdjIForm('かったら', 'かったら', `Kalau memang ${baseMeaning.toLowerCase()} / Seandainya...`, 'Bentuk lampau ~katta + ら -> ~かったら (kattara).', 'tara', 'Bentuk Pengandaian (~Tara)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createAdjIForm('く', 'く', `Secara ${baseMeaning.toLowerCase()} / dengan ${baseMeaning.toLowerCase()}`, 'Buang akhiran ~い, ganti dengan ~く (ku). Menjelaskan kata kerja sesudahnya.', 'adverb', 'Bentuk Keterangan (Adverbial)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
  createAdjIForm('そう', 'そう', `Kelihatannya ${baseMeaning.toLowerCase()}`, 'Buang akhiran ~い, tambahkan ~そう (sou).', 'sou', 'Bentuk Dugaan (~Sou)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');

  const jishoDisplay = formatJp(`${stemKanji}い`, `${stemKana}い`);
  const masuDisplay = formatJp(`${stemKanji}いです`, `${stemKana}いです`);
  const teDisplay = formatJp(`${stemKanji}くて`, `${stemKana}くて`);
  const naiDisplay = formatJp(`${stemKanji}くない`, `${stemKana}くない`);
  const taDisplay = formatJp(`${stemKanji}かった`, `${stemKana}かった`);

  return {
    id: item.id,
    originalCard: item,
    japanese: jishoDisplay,
    kanji: stemKanji !== stemKana ? `${stemKanji}い` : undefined,
    reading: `${stemKana}い`,
    furigana: item.furigana || `${stemKana}い`,
    meaningId: item.meaningId,
    classification,
    groupLabel: 'Kata Sifat -i (い形容詞)',
    quickForms: {
      masu: masuDisplay,
      te: teDisplay,
      nai: naiDisplay,
      ta: taDisplay,
    },
    forms,
  };
}

/**
 * Konjugasi Kata Sifat -na (な形容詞)
 */
function conjugateAdjNa(
  item: CardItem,
  classification: WordClassification
): WordConjugationProfile {
  const dec = decomposeWord(item);
  const baseMeaning = dec.baseMeaning;

  // Bersihkan akhiran "な" atau "[な]" jika masih ada
  const stemKanji = dec.kanji.replace(/(\[?な\]?)$/, '').trim();
  const stemKana = dec.kana.replace(/(\[?な\]?)$/, '').trim();

  const isTrapI =
    stemKanji === 'きれい' || stemKanji === '綺麗' ||
    stemKanji === '有名' || stemKanji === 'ゆうめい' ||
    stemKanji === '嫌い' || stemKanji === 'きらい';

  const forms: DetailedConjugationForm[] = [];

  const createAdjNaForm = (
    kanjiSuffix: string,
    kanaSuffix: string,
    meaningText: string,
    ruleText: string,
    formKey: string,
    formName: string,
    categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan',
    categoryGroupName: string
  ) => {
    const fullKanji = `${stemKanji}${kanjiSuffix}`;
    const fullKana = `${stemKana}${kanaSuffix}`;
    forms.push({
      formKey,
      formName,
      categoryGroup,
      categoryGroupName,
      japanese: formatJp(fullKanji, fullKana),
      reading: fullKana,
      romaji: kanaToRomaji(fullKana),
      meaningId: meaningText,
      rule: ruleText,
    });
  };

  createAdjNaForm('な', 'な', `Yang ${baseMeaning.toLowerCase()} (+ kata benda)`, 'Ciri khas kata sifat -na: saat menerangkan kata benda, wajib ditambah "な".', 'noun_modifier', 'Penyambung Kata Benda (~Na)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjNaForm('です', 'です', `${baseMeaning} (Sopan)`, 'Kata dasar + です (desu).', 'sopan_pos', 'Bentuk Sopan (+)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjNaForm('だ', 'だ', `${baseMeaning} (Kasual)`, 'Kata dasar + だ (da).', 'present_pos', 'Bentuk Kasual (+) / Kamus', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjNaForm('じゃありません', 'じゃありません', `Tidak ${baseMeaning.toLowerCase()} (Sopan)`, 'Kata dasar + じゃありません (ragam formal: ではありません).', 'sopan_neg', 'Bentuk Negatif Sopan (-)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjNaForm('じゃない', 'じゃない', `Tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Kata dasar + じゃない (ragam formal: ではない).', 'present_neg', 'Bentuk Negatif Kasual (-)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjNaForm('でした', 'でした', `Dulu / Kemarin ${baseMeaning.toLowerCase()} (Sopan)`, 'Kata dasar + でした (deshita).', 'sopan_past_pos', 'Bentuk Lampau Sopan (+)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjNaForm('だった', 'だった', `Dulu / Kemarin ${baseMeaning.toLowerCase()} (Kasual)`, 'Kata dasar + だった (datta).', 'past_pos', 'Bentuk Lampau Kasual (+)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjNaForm('じゃありませんでした', 'じゃありませんでした', `Dulu tidak ${baseMeaning.toLowerCase()} (Sopan)`, 'Kata dasar + じゃありませんでした.', 'sopan_past_neg', 'Bentuk Lampau Negatif Sopan (-)', 'sopan', 'Bentuk Sopan (Desu)');
  createAdjNaForm('じゃなかった', 'じゃなかった', `Dulu tidak ${baseMeaning.toLowerCase()} (Kasual)`, 'Kata dasar + じゃなかった (ja nakatta).', 'past_neg', 'Bentuk Lampau Negatif Kasual (-)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createAdjNaForm('で', 'で', `${baseMeaning} dan...`, 'Kata dasar + で (de). Menghubungkan dua sifat atau lebih.', 'te', 'Bentuk Sambung (~De / dan)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createAdjNaForm('なら', 'なら', `Jika / Seandainya ${baseMeaning.toLowerCase()}`, 'Kata dasar + なら (nara).', 'ba', 'Bentuk Syarat (~Nara)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createAdjNaForm('だったら', 'だったら', `Kalau memang ${baseMeaning.toLowerCase()} / Seandainya...`, 'Bentuk lampau だった + ら -> だったら (dattara).', 'tara', 'Bentuk Pengandaian (~Tara)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createAdjNaForm('に', 'に', `Dengan ${baseMeaning.toLowerCase()} / Secara ${baseMeaning.toLowerCase()}`, 'Kata dasar + に (ni). Menjelaskan kata kerja sesudahnya (misal: 静かに歩く).', 'adverb', 'Bentuk Keterangan (Adverbial ~Ni)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');
  createAdjNaForm('そう', 'そう', `Kelihatannya ${baseMeaning.toLowerCase()}`, 'Kata dasar + そう (sou).', 'sou', 'Bentuk Dugaan (~Sou)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');

  const baseDisplay = formatJp(stemKanji, stemKana);

  return {
    id: item.id,
    originalCard: item,
    japanese: baseDisplay,
    kanji: stemKanji !== stemKana ? stemKanji : undefined,
    reading: stemKana,
    furigana: item.furigana || stemKana,
    meaningId: item.meaningId,
    classification,
    groupLabel: isTrapI ? 'Kata Sifat -na (Jebakan Bunyi Akhiran -i)' : 'Kata Sifat -na (な形容詞)',
    isException: isTrapI,
    exceptionNote: isTrapI
      ? 'Hati-hati! Kata ini berakhiran suara "i" (misal kirei, yuumei, kirai), namun BUKAN kata sifat-i! Kata ini adalah kata sifat-na murni (kirei na, kirei desu, kirei ja nai).'
      : undefined,
    quickForms: {
      masu: formatJp(`${stemKanji}です`, `${stemKana}です`),
      te: formatJp(`${stemKanji}で`, `${stemKana}で`),
      nai: formatJp(`${stemKanji}じゃない`, `${stemKana}じゃない`),
      ta: formatJp(`${stemKanji}だった`, `${stemKana}だった`),
    },
    forms,
  };
}

/**
 * Konjugasi Kata Benda (Nomina / 名詞) + Kopula
 */
function conjugateNoun(
  item: CardItem,
  classification: WordClassification
): WordConjugationProfile {
  const dec = decomposeWord(item);
  const stemKanji = dec.kanji;
  const stemKana = dec.kana;
  const baseMeaning = dec.baseMeaning;
  const forms: DetailedConjugationForm[] = [];

  const createNounForm = (
    kanjiSuffix: string,
    kanaSuffix: string,
    meaningText: string,
    ruleText: string,
    formKey: string,
    formName: string,
    categoryGroup: 'sopan' | 'dasar_kasual' | 'sambung_syarat' | 'turunan_lanjutan',
    categoryGroupName: string
  ) => {
    const fullKanji = `${stemKanji}${kanjiSuffix}`;
    const fullKana = `${stemKana}${kanaSuffix}`;
    forms.push({
      formKey,
      formName,
      categoryGroup,
      categoryGroupName,
      japanese: formatJp(fullKanji, fullKana),
      reading: fullKana,
      romaji: kanaToRomaji(fullKana),
      meaningId: meaningText,
      rule: ruleText,
    });
  };

  createNounForm('です', 'です', `Adalah ${baseMeaning.toLowerCase()} (Sopan)`, 'Kata benda + です (desu).', 'sopan_pos', 'Bentuk Sopan (+)', 'sopan', 'Bentuk Sopan (Desu)');
  createNounForm('ではありません', 'ではありません', `Bukan ${baseMeaning.toLowerCase()} (Sopan)`, 'Kata benda + ではありません / じゃありません.', 'sopan_neg', 'Bentuk Negatif Sopan (-)', 'sopan', 'Bentuk Sopan (Desu)');
  createNounForm('でした', 'でした', `Dulu adalah ${baseMeaning.toLowerCase()} (Sopan)`, 'Kata benda + でした (deshita).', 'sopan_past_pos', 'Bentuk Lampau Sopan (+)', 'sopan', 'Bentuk Sopan (Desu)');
  createNounForm('ではありませんでした', 'ではありませんでした', `Dulu bukan ${baseMeaning.toLowerCase()} (Sopan)`, 'Kata benda + ではありませんでした.', 'sopan_past_neg', 'Bentuk Lampau Negatif Sopan (-)', 'sopan', 'Bentuk Sopan (Desu)');
  createNounForm('だ', 'だ', `Adalah ${baseMeaning.toLowerCase()} (Kasual)`, 'Kata benda + だ (da).', 'present_pos', 'Bentuk Kasual (+)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createNounForm('じゃない', 'じゃない', `Bukan ${baseMeaning.toLowerCase()} (Kasual)`, 'Kata benda + じゃない (ja nai).', 'present_neg', 'Bentuk Negatif Kasual (-)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createNounForm('だった', 'だった', `Dulu adalah ${baseMeaning.toLowerCase()} (Kasual)`, 'Kata benda + だった (datta).', 'past_pos', 'Bentuk Lampau Kasual (+)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createNounForm('じゃなかった', 'じゃなかった', `Dulu bukan ${baseMeaning.toLowerCase()} (Kasual)`, 'Kata benda + じゃなかった (ja nakatta).', 'past_neg', 'Bentuk Lampau Negatif Kasual (-)', 'dasar_kasual', 'Bentuk Dasar & Kasual');
  createNounForm('で', 'で', `Sebagai ${baseMeaning.toLowerCase()} dan...`, 'Kata benda + で (de). Menghubungkan nomina dengan klausa lanjutan.', 'te', 'Bentuk Sambung (~De / dan)', 'sambung_syarat', 'Bentuk Sambung & Syarat');
  createNounForm('の', 'の', `Milik / Mengenai ${baseMeaning.toLowerCase()}`, 'Kata benda + の (no) menerangkan kata benda berikutnya.', 'genitive_no', 'Partikel Kepemilikan / Modifikasi (~No)', 'turunan_lanjutan', 'Bentuk Lanjutan & Ragam Fungsi');

  const baseDisplay = formatJp(stemKanji, stemKana);

  return {
    id: item.id,
    originalCard: item,
    japanese: baseDisplay,
    kanji: stemKanji !== stemKana ? stemKanji : undefined,
    reading: stemKana,
    furigana: item.furigana || stemKana,
    meaningId: item.meaningId,
    classification,
    groupLabel: 'Kata Benda (名詞 Meishi)',
    quickForms: {
      masu: formatJp(`${stemKanji}です`, `${stemKana}です`),
      te: formatJp(`${stemKanji}で`, `${stemKana}で`),
      nai: formatJp(`${stemKanji}じゃない`, `${stemKana}じゃない`),
      ta: formatJp(`${stemKanji}だった`, `${stemKana}だった`),
    },
    forms,
  };
}

/**
 * FUNGSI UTAMA: Menghasilkan profil perubahan kata lengkap untuk APAPUN CardItem.
 */
export function getWordConjugation(card: CardItem): WordConjugationProfile {
  const classification = getWordClassification(card);

  switch (classification.type) {
    case 'verb_1':
    case 'verb_2':
    case 'verb_3':
      return conjugateVerb(card, classification);

    case 'adj_i':
      return conjugateAdjI(card, classification);

    case 'adj_na':
      return conjugateAdjNa(card, classification);

    default:
      // Kata benda, kata keterangan, partikel, dll.
      return conjugateNoun(card, classification);
  }
}

/**
 * Ringkasan Cepat 4 Bentuk Utama (Masu, Te, Nai, Ta) untuk tampilan kartu
 */
export function getQuickConjugationForms(card: CardItem): {
  masu: string;
  te: string;
  nai: string;
  ta: string;
  groupLabel: string;
} {
  const profile = getWordConjugation(card);
  return {
    ...profile.quickForms,
    groupLabel: profile.groupLabel,
  };
}
