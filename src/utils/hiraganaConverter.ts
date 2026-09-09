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

  // 1-huruf vokal & n
  a: 'あ', i: 'い', u: 'う', e: 'え', o: 'お',
  n: 'ん',
};

/**
 * Mengubah teks Romaji menjadi Hiragana.
 * Contoh: "komakai" -> "こまかい", "taberu" -> "たべる", "gakusei" -> "がくせい"
 */
export function romajiToHiragana(romaji: string): string {
  if (!romaji) return '';
  
  // Jika sudah mengandung karakter Hiragana/Katakana atau Kanji, bersihkan format kurung
  const clean = romaji.toLowerCase().trim();
  
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

    // Tangani sokuon (konsonan ganda seperti kk, tt, pp, ss, dd, gg)
    if (
      i + 1 < clean.length &&
      clean[i] === clean[i + 1] &&
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
