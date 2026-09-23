/**
 * Romaji to Hiragana & Furigana Extraction Utilities
 * Memberikan bacaan Hiragana yang akurat untuk setiap kartu dan opsi kuis.
 */

const ROMAJI_TO_HIRAGANA: Record<string, string> = {
  // 3-huruf gabungan / dakuon
  kya: 'きゃ', kyu: 'きゅ', kyo: 'きょ',
  sha: 'しゃ', shu: 'しゅ', sho: 'しょ',
  cha: 'ちゃ', chu: 'ちゅ', cho: 'ちょ',
  nya: 'にゃ', nyu: 'にゅ', nyo: 'にょ',
  hya: 'ひゃ', hyu: 'ひゅ', hyo: 'ひょ',
  mya: 'みゃ', myu: 'みゅ', myo: 'みょ',
  rya: 'りゃ', ryu: 'りゅ', ryo: 'りょ',
  gya: 'ぎゃ', gyu: 'ぎゅ', gyo: 'ぎょ',
  ja: 'じゃ', ju: 'じゅ', jo: 'じょ',
  jya: 'じゃ', jyu: 'じゅ', jyo: 'じょ',
  bya: 'びゃ', byu: 'びゅ', byo: 'びょ',
  pya: 'ぴゃ', pyu: 'ぴゅ', pyo: 'ぴょ',
  shi: 'し', chi: 'ち', tsu: 'つ',

  // 2-huruf
  ka: 'か', ki: 'き', ku: 'く', ke: 'け', ko: 'こ',
  sa: 'さ', su: 'す', se: 'せ', so: 'そ',
  ta: 'た', te: 'て', to: 'と',
  na: 'な', ni: 'に', nu: 'ぬ', ne: 'ね', no: 'の',
  ha: 'は', hi: 'ひ', fu: 'ふ', hu: 'ふ', he: 'へ', ho: 'ほ',
  ma: 'ま', mi: 'み', mu: 'む', me: 'め', mo: 'も',
  ya: 'や', yu: 'ゆ', yo: 'よ',
  ra: 'ら', ri: 'り', ru: 'る', re: 'れ', ro: 'ろ',
  wa: 'わ', wo: 'を',
  ga: 'が', gi: 'ぎ', gu: 'ぐ', ge: 'げ', go: 'ご',
  za: 'ざ', ji: 'じ', zu: 'ず', ze: 'ぜ', zo: 'ぞ',
  da: 'だ', di: 'ぢ', du: 'づ', de: 'で', do: 'ど',
  ba: 'ば', bi: 'び', bu: 'ぶ', be: 'べ', bo: 'ぼ',
  pa: 'ぱ', pi: 'ぴ', pu: 'ぷ', pe: 'ぺ', po: 'ぽ',
  si: 'し', ti: 'ち', tu: 'つ', zi: 'じ',

  // 1-huruf vokal & n
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  n: 'ん',
};

const HIRAGANA_TO_ROMAJI: Record<string, string> = {
  きゃ: 'kya', きゅ: 'kyu', きょ: 'kyo',
  しゃ: 'sha', しゅ: 'shu', しょ: 'sho',
  ちゃ: 'cha', ちゅ: 'chu', ちょ: 'cho',
  にゃ: 'nya', にゅ: 'nyu', にょ: 'nyo',
  ひゃ: 'hya', ひゅ: 'hyu', ひょ: 'hyo',
  みゃ: 'mya', みゅ: 'myu', みょ: 'myo',
  りゃ: 'rya', りゅ: 'ryu', りょ: 'ryo',
  ぎゃ: 'gya', ぎゅ: 'gyu', ぎょ: 'gyo',
  じゃ: 'ja', じゅ: 'ju', じょ: 'jo',
  びゃ: 'bya', びゅ: 'byu', びょ: 'byo',
  ぴゃ: 'pya', ぴゅ: 'pyu', ぴょ: 'pyo',
  
  あ: 'a', い: 'i', う: 'u', え: 'e', お: 'o',
  か: 'ka', き: 'ki', く: 'ku', け: 'ke', こ: 'ko',
  さ: 'sa', し: 'shi', す: 'su', せ: 'se', そ: 'so',
  た: 'ta', ち: 'chi', つ: 'tsu', て: 'te', と: 'to',
  な: 'na', に: 'ni', ぬ: 'nu', ね: 'ne', の: 'no',
  は: 'ha', ひ: 'hi', ふ: 'fu', へ: 'he', ほ: 'ho',
  ま: 'ma', み: 'mi', む: 'mu', め: 'me', も: 'mo',
  や: 'ya', ゆ: 'yu', よ: 'yo',
  ら: 'ra', り: 'ri', る: 'ru', れ: 're', ろ: 'ro',
  わ: 'wa', を: 'wo', ん: 'n',
  が: 'ga', ぎ: 'gi', ぐ: 'gu', げ: 'ge', ご: 'go',
  ざ: 'za', じ: 'ji', ず: 'zu', ぜ: 'ze', ぞ: 'zo',
  だ: 'da', ぢ: 'ji', づ: 'zu', で: 'de', ど: 'do',
  ば: 'ba', び: 'bi', ぶ: 'bu', べ: 'be', ぼ: 'bo',
  ぱ: 'pa', ぴ: 'pi', ぷ: 'pu', ぺ: 'pe', ぽ: 'po',
  ー: '-',
};

/**
 * Mengubah Katakana menjadi Hiragana.
 * Contoh: "アパート" -> "あぱーと", "コーヒー" -> "こーひー"
 */
export function katakanaToHiragana(str: string): string {
  if (!str) return '';
  return str.replace(/[\u30a1-\u30f6]/g, (match) => {
    const code = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(code);
  });
}

/**
 * Mengubah Hiragana menjadi Romaji.
 * Contoh: "がっこう" -> "gakkou", "たべる" -> "taberu"
 */
export function hiraganaToRomaji(hiraganaText: string): string {
  if (!hiraganaText) return '';
  const text = katakanaToHiragana(hiraganaText);
  let result = '';
  let i = 0;

  while (i < text.length) {
    // Tangani sokuon (っ)
    if (text[i] === 'っ') {
      const nextChar = text[i + 1];
      if (nextChar) {
        const nextTwo = text.slice(i + 1, i + 3);
        const nextRomaji = HIRAGANA_TO_ROMAJI[nextTwo] || HIRAGANA_TO_ROMAJI[nextChar] || '';
        if (nextRomaji && nextRomaji[0]) {
          result += nextRomaji[0];
          i++;
          continue;
        }
      }
      i++;
      continue;
    }

    // 2-karakter gabungan (きゃ, しゃ, dll.)
    const two = text.slice(i, i + 2);
    if (HIRAGANA_TO_ROMAJI[two]) {
      result += HIRAGANA_TO_ROMAJI[two];
      i += 2;
      continue;
    }

    // 1-karakter
    const one = text[i];
    if (HIRAGANA_TO_ROMAJI[one]) {
      result += HIRAGANA_TO_ROMAJI[one];
      i++;
      continue;
    }

    result += text[i];
    i++;
  }

  return result;
}

/**
 * Normalisasi teks pencarian untuk pencarian toleran:
 * Mengubah huruf besar ke kecil, mengubah macron (ō -> ou, ū -> uu), trim spasi.
 */
export function normalizeRomaji(text: string): string {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/ō/g, 'ou')
    .replace(/ū/g, 'uu')
    .replace(/ā/g, 'aa')
    .replace(/ē/g, 'ee')
    .replace(/ī/g, 'ii')
    .trim();
}

/**
 * Mengubah teks Romaji menjadi Hiragana.
 * Contoh: "komakai" -> "こまかい", "taberu" -> "たべる", "gakusei" -> "がくせい"
 */
export function romajiToHiragana(romaji: string): string {
  if (!romaji) return '';
  
  // Normalisasi macron
  const clean = romaji
    .toLowerCase()
    .replace(/ō/g, 'ou')
    .replace(/ū/g, 'uu')
    .replace(/ā/g, 'aa')
    .replace(/ē/g, 'ee')
    .replace(/ī/g, 'ii')
    .trim();
  
  let result = '';
  let i = 0;
  
  while (i < clean.length) {
    // Abaikan spasi, tanda baca
    const char = clean[i];
    if (char === ' ' || char === '-' || char === '~' || char === '/' || char === '(' || char === ')') {
      result += char === ' ' ? ' ' : '';
      i++;
      continue;
    }

    // Tangani sokuon (konsonan ganda seperti kk, tt, pp, ss, dd, gg, tc -> cch)
    if (
      i + 1 < clean.length &&
      (clean[i] === clean[i + 1] || (clean[i] === 't' && clean[i + 1] === 'c')) &&
      !['a', 'i', 'u', 'e', 'o', 'n'].includes(clean[i])
    ) {
      result += 'っ';
      i++;
      continue;
    }

    // Cek kecocokan 3 huruf (kya, sha, chu, dll.)
    const three = clean.slice(i, i + 3);
    if (ROMAJI_TO_HIRAGANA[three]) {
      result += ROMAJI_TO_HIRAGANA[three];
      i += 3;
      continue;
    }

    // Cek kecocokan 2 huruf (ka, ki, sa, dll.)
    const two = clean.slice(i, i + 2);
    if (ROMAJI_TO_HIRAGANA[two]) {
      result += ROMAJI_TO_HIRAGANA[two];
      i += 2;
      continue;
    }

    // Khusus 'n' sebelum konsonan atau di akhir
    if (clean[i] === 'n') {
      const nextChar = clean[i + 1];
      if (!nextChar || !['a', 'i', 'u', 'e', 'o', 'y'].includes(nextChar)) {
        result += 'ん';
        i++;
        continue;
      }
    }

    // Cek kecocokan 1 huruf (a, i, u, e, o)
    const one = clean.slice(i, i + 1);
    if (ROMAJI_TO_HIRAGANA[one]) {
      result += ROMAJI_TO_HIRAGANA[one];
      i++;
      continue;
    }

    // Jika karakter tak dikenal, salin apa adanya
    result += clean[i];
    i++;
  }

  return result;
}

/**
 * Cek apakah string mengandung karakter Jepang (Kanji, Hiragana, Katakana)
 */
export function containsJapanese(str: string): boolean {
  return /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(str);
}

/**
 * Cek apakah string mengandung karakter Kanji
 */
export function containsKanji(str: string): boolean {
  return /[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/.test(str);
}

/**
 * Mendapatkan bacaan Hiragana terbaik untuk suatu kartu/kata.
 */
export function getHiraganaReading(item: {
  japanese?: string;
  furigana?: string;
  reading?: string;
}): string {
  if (item.furigana && item.furigana.trim()) {
    return item.furigana.trim();
  }

  // Jika item.reading sudah dalam Hiragana
  if (item.reading && /[\u3040-\u309f]/.test(item.reading)) {
    return item.reading.trim();
  }

  // Jika item.reading dalam Romaji, konversikan
  if (item.reading && item.reading.trim()) {
    const converted = romajiToHiragana(item.reading);
    if (converted) return converted;
  }

  // Jika item.japanese adalah pure kana (tanpa kanji)
  if (item.japanese && !containsKanji(item.japanese)) {
    return item.japanese.trim();
  }

  return item.furigana || item.reading || item.japanese || '';
}
