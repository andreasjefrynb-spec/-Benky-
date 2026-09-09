/**
 * Modul Klasifikasi Golongan Kata Bahasa Jepang (品詞分類 / Hinshi Bunrui)
 * Mendeteksi secara spesifik:
 * - Kata Sifat -i (い形容詞) vs Kata Sifat -na (な形容詞)
 * - Kata Kerja Golongan 1 (五段), Golongan 2 (一段), Golongan 3 (不規則: する/くる)
 * - Kata Benda (名詞), Kata Keterangan (副詞), Kata Sambung (接続詞), Partikel (助詞), Ungkapan (表現)
 */

import { CardItem } from '../types';

export type WordClassType =
  | 'adj_i'
  | 'adj_na'
  | 'verb_1'
  | 'verb_2'
  | 'verb_3'
  | 'noun'
  | 'adverb'
  | 'conjunction'
  | 'particle'
  | 'phrase'
  | 'kanji'
  | 'kana';

export interface WordClassification {
  type: WordClassType;
  /** Label lengkap, misal "Kata Sifat -i (い形容詞)" */
  label: string;
  /** Label pendek, misal "Kata Sifat -i" */
  shortLabel: string;
  /** Label kanji / gramatikal Jepang, misal "い形容詞" */
  kanjiLabel: string;
  /** Styling badge Tailwind */
  badgeClass: string;
  /** Ikon simbolis */
  icon: string;
  /** Penjelasan kaidah gramatikal singkat */
  grammarHint: string;
}

// Pengecualian terkenal: Kata sifat-na yang berakhiran bunyi "-i" atau huruf い
const NA_ADJECTIVES_ENDING_IN_I = new Set([
  '綺麗', 'きれい', 'キレイ',
  '有名', 'ゆうめい',
  '嫌い', 'きらい',
  '幸い', 'さいわい',
  '得意', 'とくい',
  '曖昧', 'あいまい',
]);

// Daftar kata sifat-na populer
const KNOWN_NA_ADJECTIVES = new Set([
  '静か', 'しずか',
  '賑やか', 'にぎやか',
  '便利', 'べんり',
  '不便', 'ふべん',
  '親切', 'しんせつ',
  '元気', 'げんき',
  '暇', 'ひま',
  '好き', 'すき',
  '簡単', 'かんたん',
  '大変', 'たいへん',
  '上手', 'じょうず',
  '下手', 'へた',
  '苦手', 'にがて',
  '大切', 'たいせつ',
  '大事', 'だいじ',
  '安全', 'あんぜん',
  '危険', 'きけん',
  '自由', 'じゆう',
  '素敵', 'すてき',
  '真面目', 'まじめ',
  '丁寧', 'ていねい',
  '複雑', 'ふくざつ',
  '特別', 'とくべつ',
  '必要', 'ひつよう',
  '不思議', 'ふしぎ',
  '豊か', 'ゆたか',
  '穏やか', 'おだやか',
  '爽やか', 'さわやか',
  '新鮮', 'しんせん',
  '適切', 'てきせつ',
  '適当', 'てきとう',
  '明確', 'めいかく',
  '正確', 'せいかく',
  '重要', 'じゅうよう',
  '熱心', 'ねっしん',
  '素直', 'すなお',
  '正直', 'しょうじき',
  '無駄', 'むだ',
  '無理', 'むり',
  '安心', 'あんしん',
  '心配', 'しんぱい',
  '平気', 'へいき',
  '盛ん', 'さかん',
  '様々', 'さまざま',
  '立派', 'りっぱ',
  '豪華', 'ごうか',
  '派手', 'はで',
  '地味', 'じみ',
  '愉快', 'ゆかい',
  '快適', 'かいてき',
  '迷惑', 'めいわく',
  '邪魔', 'じゃま',
  '残念', 'ざんねん',
  '真剣', 'しんけん',
  '不満', 'ふまん',
  '満足', 'まんぞく',
  '器用', 'きよう',
  '不器用', 'ぶきよう',
  '贅沢', 'ぜいたく',
  '失礼', 'しつれい',
  '勝手', 'かって',
  '楽', 'らく',
]);

// Kata kerja jebakan: Terlihat seperti Golongan 2 (-iru / -eru) tetapi sebenarnya GOLONGAN 1 (五段 / Godan)
const TRAP_GODAN_VERBS = new Set([
  '帰る', 'かえる', // pulang
  '入る', 'はいる', // masuk
  '走る', 'はしる', // lari
  '知る', 'しる',   // tahu/kenal
  '切る', 'きる',   // potong (beda dengan kiru memakai baju)
  '要る', 'いる',   // butuh
  '喋る', 'しゃべる', // mengobrol
  '減る', 'へる',   // berkurang
  '滑る', 'すべる', // terpeleset
  '蹴る', 'ける',   // menendang
  '焦る', 'あせる', // tergesa-gesa
  '限る', 'かぎる', // terbatas
  '照る', 'てる',   // bersinar
  '握る', 'にぎる', // menggenggam
  '散る', 'ちる',   // berguguran
]);

// Kata kerja Golongan 2 (一段 / Ichidan) yang sangat umum
const KNOWN_ICHIDAN_VERBS = new Set([
  '食べる', 'たべる',
  '見る', 'みる',
  '起きる', 'おきる',
  '寝る', 'ねる',
  '教える', 'おしえる',
  '覚える', 'おぼえる',
  '忘れる', 'わすれる',
  '開ける', 'あける',
  '閉める', 'しめる',
  'つける',
  '消える', 'きえる',
  '出る', 'でる',
  '出かける', 'でかける',
  '入れる', 'いれる',
  '着る', 'きる', // memakai pakaian atas
  '落ちる', 'おちる',
  '降りる', 'おりる', // turun kendaraan
  '借りる', 'かりる', // meminjam
  '疲れる', 'つかれる',
  '見せる', 'みせる',
  '始める', 'はじめる',
  '辞める', 'やめる',
  '止める', 'とめる',
  '調べる', 'しらべる',
  '届ける', 'とどける',
  '考える', 'かんがえる',
  '続ける', 'つづける',
  '受ける', 'うける',
  '決める', 'きめる',
  '集める', 'あつめる',
  '変える', 'かえる', // mengubah
  '答える', 'こたえる',
  '育てる', 'そだてる',
  '助ける', 'たすける',
  '逃げる', 'にげる',
  '負ける', 'まける',
  '晴れる', 'はれる',
  '投げる', 'なげる',
  '褒める', 'ほめる',
  '並べる', 'ならべる',
  '建てる', 'たてる',
  '生まれる', 'うまれる',
  '生きる', 'いきる',
  '信じる', 'しんじる',
  '感じる', 'かんじる',
  '似る', 'にる',
  '煮る', 'にる',
  '居る', 'いる', // ada makhluk hidup
]);

// Kata sambung umum
const KNOWN_CONJUNCTIONS = new Set([
  'そして', 'それから', 'でも', 'しかし', 'だから', 'それで', 'また', 'あるいは',
  'ところで', 'それに', 'ですから', 'だが', 'けれども', 'しかしながら',
]);

/**
 * Klasifikasikan jenis/golongan kata dari suatu CardItem secara otomatis dan akurat.
 */
export function getWordClassification(item: CardItem): WordClassification {
  const jp = (item.japanese || item.kanji || '').trim();
  const furi = (item.furigana || '').trim();
  const reading = (item.reading || '').trim().toLowerCase();
  const subCat = (item.subCategory || '').toLowerCase();
  const notes = (item.notes || item.mnemonic || '').toLowerCase();
  const meaning = (item.meaningId || '').toLowerCase();

  // 1. Cek Kategori Khusus Terlebih Dahulu
  if (item.category === 'hiragana' || item.category === 'katakana') {
    return {
      type: 'kana',
      label: 'Huruf Kana (仮名)',
      shortLabel: 'Huruf Kana',
      kanjiLabel: '仮名',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200/80',
      icon: '🔤',
      grammarHint: 'Aksara fonetik dasar bahasa Jepang.',
    };
  }

  if (item.category === 'kanji') {
    return {
      type: 'kanji',
      label: 'Karakter Kanji (漢字)',
      shortLabel: 'Kanji',
      kanjiLabel: '漢字',
      badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
      icon: '🈴',
      grammarHint: 'Ideogram bahasa Jepang yang memiliki Onyomi & Kunyomi.',
    };
  }

  if (item.category === 'particles' || subCat.startsWith('partikel')) {
    return {
      type: 'particle',
      label: 'Partikel (助詞 / Joshi)',
      shortLabel: 'Partikel',
      kanjiLabel: '助詞',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200/80',
      icon: '🏷️',
      grammarHint: 'Kata bantu gramatikal penanda subjek, objek, tempat, dsb.',
    };
  }

  // 2. Cek Petunjuk Eksplisit dari Notes / Meaning
  if (notes.includes('gol. 1') || notes.includes('golongan 1') || notes.includes('godan')) {
    return createVerb1Info();
  }
  if (notes.includes('gol. 2') || notes.includes('golongan 2') || notes.includes('ichidan')) {
    return createVerb2Info();
  }
  if (notes.includes('gol. 3') || notes.includes('golongan 3') || notes.includes('fukisoku') || notes.includes('suru') || notes.includes('kuru')) {
    return createVerb3Info();
  }
  if (notes.includes('sifat-i') || notes.includes('i-adj') || notes.includes('kata sifat i')) {
    return createAdjIInfo();
  }
  if (notes.includes('sifat-na') || notes.includes('na-adj') || notes.includes('kata sifat na')) {
    return createAdjNaInfo();
  }

  // 3. Klasifikasi KATA SIFAT (形容詞)
  const isAdjectiveCategory =
    subCat === 'kata_sifat' ||
    subCat === 'kanji_sifat' ||
    notes.includes('keiyoushi') ||
    meaning.includes('(kata sifat)') ||
    meaning.includes('kata sifat');

  if (isAdjectiveCategory) {
    // Cek pengecualian na-adjectives berakhiran -i
    if (NA_ADJECTIVES_ENDING_IN_I.has(jp) || NA_ADJECTIVES_ENDING_IN_I.has(furi)) {
      return createAdjNaInfo();
    }
    // Cek daftar na-adjectives umum
    if (KNOWN_NA_ADJECTIVES.has(jp) || KNOWN_NA_ADJECTIVES.has(furi)) {
      return createAdjNaInfo();
    }
    // Kata sifat-i umumnya berakhiran huruf Hiragana "い"
    if (jp.endsWith('い') || furi.endsWith('い') || reading.endsWith('i')) {
      return createAdjIInfo();
    }
    // Jika tidak berakhiran い, maka Kata Sifat-na
    return createAdjNaInfo();
  }

  // Cek kata sifat di luar subkategori eksplisit (misal di tema perasaan atau bab minna)
  if (NA_ADJECTIVES_ENDING_IN_I.has(jp) || NA_ADJECTIVES_ENDING_IN_I.has(furi)) {
    return createAdjNaInfo();
  }
  if (KNOWN_NA_ADJECTIVES.has(jp) || KNOWN_NA_ADJECTIVES.has(furi)) {
    return createAdjNaInfo();
  }

  // 4. Klasifikasi KATA KERJA (動詞)
  const isVerbCategory =
    subCat === 'kata_kerja' ||
    subCat === 'kanji_kata_kerja' ||
    notes.includes('doushi') ||
    meaning.startsWith('me') ||
    meaning.startsWith('ber') ||
    meaning.includes('(kata kerja)');

  if (isVerbCategory) {
    // Golongan 3: 不規則 (suru, kuru, dan kata majemuk ~suru)
    if (
      jp.endsWith('する') ||
      jp.endsWith('為る') ||
      jp === '来る' ||
      jp === 'くる' ||
      furi.endsWith('する') ||
      furi === 'くる' ||
      reading.endsWith('suru') ||
      reading === 'kuru'
    ) {
      return createVerb3Info();
    }

    // Jebakan: Kata kerja berakhiran -iru/-eru tapi termasuk Golongan 1 (Godan)
    if (TRAP_GODAN_VERBS.has(jp) || TRAP_GODAN_VERBS.has(furi)) {
      return createVerb1Info();
    }

    // Golongan 2 (一段 / Ichidan): Kata kerja berakhiran ~る dengan vokal -i / -e sebelumnya
    if (KNOWN_ICHIDAN_VERBS.has(jp) || KNOWN_ICHIDAN_VERBS.has(furi)) {
      return createVerb2Info();
    }

    // Cek akhiran ~る
    if (jp.endsWith('る') || furi.endsWith('る') || reading.endsWith('ru')) {
      // Jika vokal sebelum ru adalah i atau e (misal taberu, miru, neru, oshieru)
      const isIruEru =
        /[ie]ru$/.test(reading) ||
        /[いきしちにひみりえけせてねへめれ]る$/.test(furi || jp);

      if (isIruEru && !TRAP_GODAN_VERBS.has(jp) && !TRAP_GODAN_VERBS.has(furi)) {
        return createVerb2Info();
      }
      return createVerb1Info();
    }

    // Semua kata kerja yang berakhiran u, ku, gu, su, tsu, nu, bu, mu pasti Golongan 1 (五段)
    return createVerb1Info();
  }

  // Cek jika ada kata berakhiran する yang berada di luar subkategori kata_kerja
  if (jp.endsWith('する') || reading.endsWith('suru')) {
    return createVerb3Info();
  }

  // 5. Klasifikasi KATA KETERANGAN (副詞 / Fukushi)
  if (subCat === 'keterangan_fukushi' || notes.includes('fukushi') || notes.includes('adverb')) {
    return {
      type: 'adverb',
      label: 'Kata Keterangan (副詞 / Fukushi)',
      shortLabel: 'Kata Keterangan',
      kanjiLabel: '副詞',
      badgeClass: 'bg-pink-50 text-pink-700 border-pink-200/80',
      icon: '🧭',
      grammarHint: 'Menjelaskan kata kerja, kata sifat, atau tingkat intensitas.',
    };
  }

  // 6. Klasifikasi KATA SAMBUNG (接続詞 / Setsuzokushi)
  if (KNOWN_CONJUNCTIONS.has(jp) || subCat.includes('sambung') || notes.includes('setsuzoku')) {
    return {
      type: 'conjunction',
      label: 'Kata Sambung (接続詞 / Setsuzokushi)',
      shortLabel: 'Kata Sambung',
      kanjiLabel: '接続詞',
      badgeClass: 'bg-teal-50 text-teal-700 border-teal-200/80',
      icon: '🔗',
      grammarHint: 'Menghubungkan dua klausa, kalimat, atau frasa.',
    };
  }

  // 7. Klasifikasi UNGKAPAN & SALAM (挨拶・表現 / Aisatsu・Hyougen)
  if (
    subCat === 'salam' ||
    subCat === 'perkenalan' ||
    item.category === 'phrases' ||
    item.category === 'irodori' ||
    meaning.includes('selamat') ||
    meaning.includes('halo') ||
    meaning.includes('terima kasih')
  ) {
    return {
      type: 'phrase',
      label: 'Ungkapan & Salam (挨拶・表現)',
      shortLabel: 'Ungkapan / Salam',
      kanjiLabel: '表現',
      badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
      icon: '💬',
      grammarHint: 'Frasa sapaan atau percakapan praktis sehari-hari.',
    };
  }

  // 8. Default: KATA BENDA (名詞 / Meishi)
  return {
    type: 'noun',
    label: 'Kata Benda (名詞 / Meishi)',
    shortLabel: 'Kata Benda',
    kanjiLabel: '名詞',
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    icon: '📦',
    grammarHint: 'Kata dasar yang menunjukkan orang, benda, tempat, konsep, dsb.',
  };
}

// Helper factory functions
function createAdjIInfo(): WordClassification {
  return {
    type: 'adj_i',
    label: 'Kata Sifat -i (い形容詞)',
    shortLabel: 'Kata Sifat -i',
    kanjiLabel: 'い形容詞',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300 font-extrabold',
    icon: '✨',
    grammarHint: 'Berakhiran ~i. Negatif: buang i + kunai (暑い -> 暑くない). Lampau: ~katta.',
  };
}

function createAdjNaInfo(): WordClassification {
  return {
    type: 'adj_na',
    label: 'Kata Sifat -na (な形容詞)',
    shortLabel: 'Kata Sifat -na',
    kanjiLabel: 'な形容詞',
    badgeClass: 'bg-purple-50 text-purple-800 border-purple-300 font-extrabold',
    icon: '🌸',
    grammarHint: 'Memerlukan "na" sebelum kata benda (静かな町). Negatif: ~ja arimasen / dewa nai.',
  };
}

function createVerb1Info(): WordClassification {
  return {
    type: 'verb_1',
    label: 'Kata Kerja Gol. 1 (五段 / Godan)',
    shortLabel: 'Kata Kerja Gol. 1',
    kanjiLabel: '五段動詞',
    badgeClass: 'bg-blue-50 text-blue-800 border-blue-300 font-extrabold',
    icon: '⚡',
    grammarHint: 'Golongan 1 (5 vokal): akhiran vokal ~u berganti ~i saat ditambah -masu (行く -> 行きます).',
  };
}

function createVerb2Info(): WordClassification {
  return {
    type: 'verb_2',
    label: 'Kata Kerja Gol. 2 (一段 / Ichidan)',
    shortLabel: 'Kata Kerja Gol. 2',
    kanjiLabel: '一段動詞',
    badgeClass: 'bg-sky-50 text-sky-800 border-sky-300 font-extrabold',
    icon: '🌊',
    grammarHint: 'Golongan 2 (akhiran ~iru/~eru): cukup buang "ru" dan tambah -masu (食べる -> 食べます).',
  };
}

function createVerb3Info(): WordClassification {
  return {
    type: 'verb_3',
    label: 'Kata Kerja Gol. 3 (不規則 / Fukisoku)',
    shortLabel: 'Kata Kerja Gol. 3',
    kanjiLabel: '不規則動詞',
    badgeClass: 'bg-indigo-50 text-indigo-800 border-indigo-300 font-extrabold',
    icon: '🌀',
    grammarHint: 'Golongan 3 (Tidak Beraturan): hanya "kuru" (datang) dan "suru" (melakukan) serta bentuk gabungannya.',
  };
}
