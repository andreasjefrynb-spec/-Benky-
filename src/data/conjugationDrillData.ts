// Data Pendukung Konjugasi: Lagu / Jingle Bentuk ~Te, Bagan 5 Vokal (五段活用), dan Latihan Drill Kilat

export interface TeFormSongRule {
  id: string;
  endings: string[]; // e.g. ['う', 'つ', 'る']
  romajiEndings: string; // 'u, tsu, ru'
  targetEnding: string; // 'って'
  targetRomaji: string; // 'tte'
  soundRhythm: string; // 'U - Tsu - Ru → Tte!'
  jingleLyric: string; // Lirik irama hafalan
  bgGradient: string;
  badgeColor: string;
  sampleVerbs: {
    dictionary: string;
    reading: string;
    meaning: string;
    result: string;
    resultReading: string;
  }[];
  exception?: {
    word: string;
    reading: string;
    meaning: string;
    result: string;
    resultReading: string;
    note: string;
  };
}

export const TE_FORM_SONG_RULES: TeFormSongRule[] = [
  {
    id: 'u-tsu-ru',
    endings: ['う', 'つ', 'る'],
    romajiEndings: 'u, tsu, ru',
    targetEnding: '〜って',
    targetRomaji: '~tte (tsu kecil)',
    soundRhythm: 'U - Tsu - Ru  ➜  TTE !',
    jingleLyric: 'Akhiran U, TSU, RU dipotong lalu diganti TTE (bunyi dobel t)',
    bgGradient: 'from-amber-500/10 to-orange-500/10 border-amber-200',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    sampleVerbs: [
      { dictionary: '買う', reading: 'kau', meaning: 'Membeli', result: '買って', resultReading: 'katte' },
      { dictionary: '待つ', reading: 'matsu', meaning: 'Menunggu', result: '待って', resultReading: 'matte' },
      { dictionary: '取る', reading: 'toru', meaning: 'Mengambil', result: '取って', resultReading: 'totte' },
      { dictionary: '会う', reading: 'au', meaning: 'Bertemu', result: '会って', resultReading: 'atte' },
    ],
  },
  {
    id: 'mu-bu-nu',
    endings: ['む', 'ぶ', 'ぬ'],
    romajiEndings: 'mu, bu, nu',
    targetEnding: '〜んで',
    targetRomaji: '~nde (sengau n + de)',
    soundRhythm: 'Mu - Bu - Nu  ➜  NDE !',
    jingleLyric: 'Akhiran MU, BU, NU dipotong lalu diganti NDE (pakai tenten)',
    bgGradient: 'from-blue-500/10 to-cyan-500/10 border-blue-200',
    badgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
    sampleVerbs: [
      { dictionary: '飲む', reading: 'nomu', meaning: 'Minum', result: '飲んで', resultReading: 'nonde' },
      { dictionary: '遊ぶ', reading: 'asobu', meaning: 'Bermain', result: '遊んで', resultReading: 'asonde' },
      { dictionary: '死ぬ', reading: 'shinu', meaning: 'Mati', result: '死んで', resultReading: 'shinde' },
      { dictionary: '読む', reading: 'yomu', meaning: 'Membaca', result: '読んで', resultReading: 'yonde' },
    ],
  },
  {
    id: 'ku-gu',
    endings: ['く', 'ぐ'],
    romajiEndings: 'ku, gu',
    targetEnding: '〜いて / 〜いで',
    targetRomaji: '~ite / ~ide',
    soundRhythm: 'KU ➜ ITE  |  GU ➜ IDE !',
    jingleLyric: 'KU berubah jadi ITE, GU berubah jadi IDE (ber-tenten)',
    bgGradient: 'from-emerald-500/10 to-teal-500/10 border-emerald-200',
    badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
    sampleVerbs: [
      { dictionary: '書く', reading: 'kaku', meaning: 'Menulis', result: '書いて', resultReading: 'kaite' },
      { dictionary: '聞く', reading: 'kiku', meaning: 'Mendengar', result: '聞いて', resultReading: 'kiite' },
      { dictionary: '泳ぐ', reading: 'oyogu', meaning: 'Berenang', result: '泳いで', resultReading: 'oyoide' },
      { dictionary: '急ぐ', reading: 'isogu', meaning: 'Buru-buru', result: '急いで', resultReading: 'isoide' },
    ],
    exception: {
      word: '行く',
      reading: 'iku',
      meaning: 'Pergi',
      result: '行って',
      resultReading: 'itte (Bukan iite!)',
      note: 'Hati-hati! Kata 行く (iku) adalah satu-satunya pengecualian berakhiran ku yang berubah jadi 行って (itte)!',
    },
  },
  {
    id: 'su',
    endings: ['す'],
    romajiEndings: 'su',
    targetEnding: '〜して',
    targetRomaji: '~shite',
    soundRhythm: 'SU  ➜  SHITE !',
    jingleLyric: 'SU selalu berubah menjadi SHITE',
    bgGradient: 'from-purple-500/10 to-indigo-500/10 border-purple-200',
    badgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
    sampleVerbs: [
      { dictionary: '話す', reading: 'hanasu', meaning: 'Berbicara', result: '話して', resultReading: 'hanashite' },
      { dictionary: '出す', reading: 'dasu', meaning: 'Mengeluarkan', result: '出して', resultReading: 'dashite' },
      { dictionary: '消す', reading: 'kesu', meaning: 'Memadamkan', result: '消して', resultReading: 'keshite' },
      { dictionary: '貸す', reading: 'kasu', meaning: 'Meminjamkan', result: '貸して', resultReading: 'kashite' },
    ],
  },
  {
    id: 'ichidan-te',
    endings: ['〜る (iru/eru)'],
    romajiEndings: 'iru / eru',
    targetEnding: '〜て',
    targetRomaji: 'Buang る + て',
    soundRhythm: 'Ichidan: Buang RU  ➜  Tempel TE !',
    jingleLyric: 'Golongan 2 paling ramah: Cukup buang RU lalu pasang TE langsung!',
    bgGradient: 'from-rose-500/10 to-pink-500/10 border-rose-200',
    badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
    sampleVerbs: [
      { dictionary: '食べる', reading: 'taberu', meaning: 'Makan', result: '食べて', resultReading: 'tabete' },
      { dictionary: '見る', reading: 'miru', meaning: 'Melihat', result: '見て', resultReading: 'mite' },
      { dictionary: '起きる', reading: 'okiru', meaning: 'Bangun tidur', result: '起きて', resultReading: 'okite' },
      { dictionary: '教える', reading: 'oshieru', meaning: 'Mengajar', result: '教えて', resultReading: 'oshiete' },
    ],
  },
  {
    id: 'fukisoku-te',
    endings: ['する', 'くる'],
    romajiEndings: 'suru, kuru',
    targetEnding: 'して / きて',
    targetRomaji: 'shite / kite',
    soundRhythm: 'SURU ➜ SHITE  |  KURU ➜ KITE !',
    jingleLyric: 'Golongan 3 dua kata legendaris: Suru jadi Shite, Kuru jadi Kite!',
    bgGradient: 'from-violet-500/10 to-purple-500/10 border-violet-200',
    badgeColor: 'bg-violet-100 text-violet-900 border-violet-300',
    sampleVerbs: [
      { dictionary: 'する', reading: 'suru', meaning: 'Melakukan', result: 'して', resultReading: 'shite' },
      { dictionary: 'くる (来る)', reading: 'kuru', meaning: 'Datang', result: 'きて (来て)', resultReading: 'kite' },
      { dictionary: '勉強する', reading: 'benkyou suru', meaning: 'Belajar', result: '勉強して', resultReading: 'benkyou shite' },
      { dictionary: '持ってくる', reading: 'motte kuru', meaning: 'Membawa datang', result: '持ってきて', resultReading: 'motte kite' },
    ],
  },
];

// Bagan Tangga 5 Vokal (五段活用 / Godan 5-Vowel Ladder)
export interface GodanVowelRow {
  vowel: 'a' | 'i' | 'u' | 'e' | 'o';
  vowelKana: string;
  name: string;
  functionTitle: string;
  formula: string;
  description: string;
  color: string;
  examples: {
    verb: string;
    reading: string;
    transformed: string;
    transformedReading: string;
    meaning: string;
  }[];
}

export const GODAN_VOWEL_ROWS: GodanVowelRow[] = [
  {
    vowel: 'a',
    vowelKana: 'あ段 (Baris A)',
    name: 'Mizenkei (未然形) - Negatif Kasual',
    functionTitle: 'Bentuk Negatif Kasual (〜ない) & Pasif/Kausatif',
    formula: 'Ubah vokal akhiran ke baris A + ない (nai)',
    description: 'Huruf vokal terakhir digeser ke vokal A. Khusus akhiran "u" berpasangan dengan "wa" (bukan a)!',
    color: 'border-rose-300 bg-rose-50/70 text-rose-900',
    examples: [
      { verb: '書く', reading: 'kaku', transformed: '書かない', transformedReading: 'kaka-nai', meaning: 'Tidak menulis' },
      { verb: '飲む', reading: 'nomu', transformed: '飲まない', transformedReading: 'noma-nai', meaning: 'Tidak minum' },
      { verb: '買う', reading: 'kau', transformed: '買わない', transformedReading: 'kawa-nai', meaning: 'Tidak membeli (pakai WA!)' },
      { verb: '待つ', reading: 'matsu', transformed: '待たない', transformedReading: 'mata-nai', meaning: 'Tidak menunggu' },
    ],
  },
  {
    vowel: 'i',
    vowelKana: 'い段 (Baris I)',
    name: 'Ren\'youkei (連用形) - Sopan & Penggabung',
    functionTitle: 'Bentuk Sopan Formal (〜ます / 〜たい)',
    formula: 'Ubah vokal akhiran ke baris I + ます (masu) / たい (tai - ingin)',
    description: 'Vokal digeser ke I untuk menempelkan pola sopan dasar dan akhiran pengekspresi keinginan.',
    color: 'border-indigo-300 bg-indigo-50/70 text-indigo-900',
    examples: [
      { verb: '書く', reading: 'kaku', transformed: '書きます', transformedReading: 'kaki-masu', meaning: 'Menulis (sopan)' },
      { verb: '飲む', reading: 'nomu', transformed: '飲みたい', transformedReading: 'nomi-tai', meaning: 'Ingin minum' },
      { verb: '話す', reading: 'hanasu', transformed: '話します', transformedReading: 'hanashi-masu', meaning: 'Berbicara (sopan)' },
      { verb: '行く', reading: 'iku', transformed: '行きます', transformedReading: 'iki-masu', meaning: 'Pergi (sopan)' },
    ],
  },
  {
    vowel: 'u',
    vowelKana: 'う段 (Baris U)',
    name: 'Shuushikei (終止形) - Bentuk Kamus Dasar',
    functionTitle: 'Bentuk Kamus (辞書形) - Kasual Sekarang / Masa Depan',
    formula: 'Bentuk asli kata kerja yang berakhiran vokal U',
    description: 'Bentuk dasar yang tercatat di kamus bahasa Jepang. Dipakai sebelum partikel seperti koto, mae ni, tsumori.',
    color: 'border-emerald-300 bg-emerald-50/70 text-emerald-900',
    examples: [
      { verb: '書く', reading: 'kaku', transformed: '書く', transformedReading: 'kaku', meaning: 'Menulis (bentuk kamus)' },
      { verb: '飲む', reading: 'nomu', transformed: '飲む', transformedReading: 'nomu', meaning: 'Minum (bentuk kamus)' },
      { verb: '走る', reading: 'hashiru', transformed: '走る', transformedReading: 'hashiru', meaning: 'Berlari' },
      { verb: '待つ', reading: 'matsu', transformed: '待つ', transformedReading: 'matsu', meaning: 'Menunggu' },
    ],
  },
  {
    vowel: 'e',
    vowelKana: 'え段 (Baris E)',
    name: 'Kateikei (仮定形) / Kanoukei - Potensial & Syarat',
    functionTitle: 'Bentuk Bisa / Sanggup (〜る) & Syarat (〜ば)',
    formula: 'Ubah akhiran ke baris E + る (bisa) atau + ば (jika)',
    description: 'Geser ke vokal E untuk membuat bentuk kemampuan potensial atau pengandaian logika.',
    color: 'border-amber-300 bg-amber-50/70 text-amber-900',
    examples: [
      { verb: '書く', reading: 'kaku', transformed: '書ける', transformedReading: 'kake-ru', meaning: 'Bisa menulis' },
      { verb: '飲む', reading: 'nomu', transformed: '飲めば', transformedReading: 'nome-ba', meaning: 'Jika minum' },
      { verb: '話す', reading: 'hanasu', transformed: '話せる', transformedReading: 'hanase-ru', meaning: 'Bisa berbicara' },
      { verb: '行く', reading: 'iku', transformed: '行けば', transformedReading: 'ike-ba', meaning: 'Jika pergi' },
    ],
  },
  {
    vowel: 'o',
    vowelKana: 'お段 (Baris O)',
    name: 'Ikoukei (意向形) - Ajakan Kasual & Niat',
    functionTitle: 'Bentuk Ajakan Kasual / Niat (〜う)',
    formula: 'Ubah akhiran ke baris O + う (u)',
    description: 'Vokal digeser ke O lalu ditambahkan bunyi panjang U untuk mengajak teman (Ayo kita...).',
    color: 'border-purple-300 bg-purple-50/70 text-purple-900',
    examples: [
      { verb: '書く', reading: 'kaku', transformed: '書こう', transformedReading: 'kako-u', meaning: 'Ayo menulis!' },
      { verb: '飲む', reading: 'nomu', transformed: '飲もう', transformedReading: 'nomo-u', meaning: 'Ayo minum!' },
      { verb: '話す', reading: 'hanasu', transformed: '話そう', transformedReading: 'hanaso-u', meaning: 'Ayo mengobrol!' },
      { verb: '行く', reading: 'iku', transformed: '行こう', transformedReading: 'iko-u', meaning: 'Ayo berangkat!' },
    ],
  },
];

// Soal Latihan Drill Kilat Konjugasi
export interface ConjugationDrillItem {
  id: string;
  promptWord: string;
  promptReading: string;
  promptMeaning: string;
  groupType: string;
  targetFormName: string;
  targetFormKey: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  ruleTip: string;
}

export const CONJUGATION_DRILL_ITEMS: ConjugationDrillItem[] = [
  {
    id: 'drill-1',
    promptWord: '飲む',
    promptReading: 'nomu',
    promptMeaning: 'Minum',
    groupType: 'Golongan 1 (Godan)',
    targetFormName: 'Bentuk 〜て (Te-form)',
    targetFormKey: 'te',
    questionText: 'Ubah kata kerja 飲む (nomu) ke bentuk 〜て (Te)!',
    options: ['飲んで (nonde)', '飲いて (noite)', '飲って (notte)', '飲して (noshite)'],
    correctAnswer: '飲んで (nonde)',
    explanation: 'Kata berakhiran "mu, bu, nu" berubah menjadi "nde". Maka nomu ➜ nonde!',
    ruleTip: 'Ingat lirik lagu: Mu - Bu - Nu ➜ NDE!',
  },
  {
    id: 'drill-2',
    promptWord: '行く',
    promptReading: 'iku',
    promptMeaning: 'Pergi',
    groupType: 'Golongan 1 (Godan Pengecualian)',
    targetFormName: 'Bentuk 〜て (Te-form)',
    targetFormKey: 'te',
    questionText: 'Ubah kata kerja 行く (iku) ke bentuk 〜て (Te)! Waspada jebakan!',
    options: ['行って (itte)', '行いて (iite)', '行いで (iide)', '行して (ishite)'],
    correctAnswer: '行って (itte)',
    explanation: 'Meskipun berakhiran "ku", kata 行く (iku) adalah SATU-SATUNYA pengecualian yang berubah jadi 行って (itte), BUKAN iite!',
    ruleTip: 'Pengecualian khusus nomor satu di JLPT N5: iku ➜ itte!',
  },
  {
    id: 'drill-3',
    promptWord: '帰る',
    promptReading: 'kaeru',
    promptMeaning: 'Pulang',
    groupType: 'Kata Kerja Jebakan (Godan)',
    targetFormName: 'Bentuk 〜ます (Masu)',
    targetFormKey: 'masu',
    questionText: 'Ubah kata kerja 帰る (kaeru) ke bentuk Sopan 〜ます (Masu)!',
    options: ['帰ります (kaerimasu)', '帰ます (kaemasu)', '帰ちます (kaechimasu)', '帰きます (kaekimasu)'],
    correctAnswer: '帰ります (kaerimasu)',
    explanation: 'Meskipun berakhiran -eru, 帰る (kaeru) adalah Golongan 1 (Godan). Vokal ru digeser ke baris I jadi "ri" + masu = kaerimasu (Bukan kaemasu)!',
    ruleTip: 'Trap Verb: kaeru, hairu, hashiru, shiru, kiru semuanya berakhiran -rimasu!',
  },
  {
    id: 'drill-4',
    promptWord: '買う',
    promptReading: 'kau',
    promptMeaning: 'Membeli',
    groupType: 'Golongan 1 (Godan)',
    targetFormName: 'Bentuk Negatif Kasual (〜ない)',
    targetFormKey: 'nai',
    questionText: 'Ubah kata kerja 買う (kau) ke bentuk Negatif Kasual (〜ない)!',
    options: ['買わない (kawanai)', '買あない (kaanai)', '買えない (kaenai)', '買しない (kashinai)'],
    correctAnswer: '買わない (kawanai)',
    explanation: 'Khusus kata kerja berakhiran "u" murni, vokal geserannya pada baris A adalah "wa", bukan "a". Maka kau ➜ kawanai!',
    ruleTip: 'Akhiran U murni jika dijadikan bentuk nai berubah jadi WA + nai.',
  },
  {
    id: 'drill-5',
    promptWord: '食べる',
    promptReading: 'taberu',
    promptMeaning: 'Makan',
    groupType: 'Golongan 2 (Ichidan)',
    targetFormName: 'Bentuk Potensial (Bisa / Sanggup)',
    targetFormKey: 'kanou',
    questionText: 'Ubah kata kerja 食べる (taberu) ke bentuk Potensial (Bisa Makan)!',
    options: ['食べられる (taberareru)', '食べれる (tabereru)', '食べさせる (tabesaseru)', '食べば (tabereba)'],
    correctAnswer: '食べられる (taberareru)',
    explanation: 'Golongan 2 (Ichidan) membuat bentuk potensial resmi dengan membuang "ru" lalu menambahkan "rareru" ➜ taberareru.',
    ruleTip: 'Ichidan potensial: buang ru + rareru. (Dalam percakapan santai sering disingkat tabereru/ra-nuki).',
  },
  {
    id: 'drill-6',
    promptWord: '書く',
    promptReading: 'kaku',
    promptMeaning: 'Menulis',
    groupType: 'Golongan 1 (Godan)',
    targetFormName: 'Bentuk Potensial (Bisa / Sanggup)',
    targetFormKey: 'kanou',
    questionText: 'Ubah kata kerja 書く (kaku) ke bentuk Potensial (Bisa Menulis)!',
    options: ['書ける (kakeru)', '書かられる (kakarareru)', '書かせる (kakaseru)', '書くできる (kakudekiru)'],
    correctAnswer: '書ける (kakeru)',
    explanation: 'Golongan 1 (Godan) membuat bentuk potensial dengan menggeser vokal U ke baris E + ru. kaku ➜ kakeru!',
    ruleTip: 'Tangga 5 Vokal: Baris E (Ke) + ru = Kakeru (Bisa menulis).',
  },
  {
    id: 'drill-7',
    promptWord: '待つ',
    promptReading: 'matsu',
    promptMeaning: 'Menunggu',
    groupType: 'Golongan 1 (Godan)',
    targetFormName: 'Bentuk 〜て (Te-form)',
    targetFormKey: 'te',
    questionText: 'Ubah kata kerja 待つ (matsu) ke bentuk 〜て (Mohon menunggu)!',
    options: ['待って (matte)', '待ちて (machite)', '待いで (maide)', '待して (mashite)'],
    correctAnswer: '待って (matte)',
    explanation: 'Akhiran "tsu" termasuk dalam kelompok U, TSU, RU yang diganti dengan TTE (tsu kecil). matsu ➜ matte kudasai!',
    ruleTip: 'U - Tsu - Ru ➜ TTE!',
  },
  {
    id: 'drill-8',
    promptWord: 'する',
    promptReading: 'suru',
    promptMeaning: 'Melakukan',
    groupType: 'Golongan 3 (Fukisoku)',
    targetFormName: 'Bentuk 〜て (Te-form)',
    targetFormKey: 'te',
    questionText: 'Ubah kata kerja する (suru) ke bentuk 〜て!',
    options: ['して (shite)', 'すって (sutte)', 'すいて (suite)', 'さして (sashite)'],
    correctAnswer: 'して (shite)',
    explanation: 'Kata kerja Golongan 3 する (suru) berubah secara unik menjadi して (shite). Contoh: 勉強して (belajar).',
    ruleTip: 'Suru ➜ Shite, Shimasu, Shinai, Dekiru.',
  },
  {
    id: 'drill-9',
    promptWord: 'くる (来る)',
    promptReading: 'kuru',
    promptMeaning: 'Datang',
    groupType: 'Golongan 3 (Fukisoku)',
    targetFormName: 'Bentuk Negatif Kasual (〜ない)',
    targetFormKey: 'nai',
    questionText: 'Ubah kata kerja くる (kuru) ke bentuk Negatif Kasual (Tidak datang)!',
    options: ['こない (konai)', 'きない (kinai)', 'くらない (kuranai)', 'こられない (korarenai)'],
    correctAnswer: 'こない (konai)',
    explanation: 'Perhatikan kanji 来る dibaca "kuru", tetapi bentuk negatifnya dibaca "konai" (vokal ko)! Bentuk sopannya dibaca "kimasu" (vokal ki)!',
    ruleTip: 'Kuru punya 3 bunyi kanji: kuru (kamus), kimasu (sopan), konai (negatif).',
  },
  {
    id: 'drill-10',
    promptWord: 'いい',
    promptReading: 'ii',
    promptMeaning: 'Bagus / Baik',
    groupType: 'Kata Sifat -i Pengecualian',
    targetFormName: 'Bentuk Lampau Positif (Dulu bagus)',
    targetFormKey: 'ta',
    questionText: 'Ubah kata sifat いい (ii - bagus) ke bentuk Lampau Positif!',
    options: ['よかった (yokatta)', 'いかった (ikatta)', 'いいでした (ii deshita)', 'よかったです (yokatta desu)'],
    correctAnswer: 'よかった (yokatta)',
    explanation: 'Kata "ii" (bagus) jika diubah ke bentuk negatif, lampau, atau sambung HARUS kembali ke akar aslinya yaitu 良い (yoi). Maka lampaunya adalah よかった (yokatta)!',
    ruleTip: 'Ingat kata "Yokatta!" (Syukurlah/Baguslah dulu).',
  },
  {
    id: 'drill-11',
    promptWord: '綺麗 (な)',
    promptReading: 'kirei (na)',
    promptMeaning: 'Cantik / Indah / Bersih',
    groupType: 'Kata Sifat -na (Waspada Bunyi -i)',
    targetFormName: 'Bentuk Penghubung (Dan / Sambung)',
    targetFormKey: 'te',
    questionText: 'Ubah 綺麗 (kirei) ke bentuk Sambung (Misal: Bersih dan luas)!',
    options: ['綺麗で (kirei de)', '綺麗くて (kireikute)', '綺麗に (kirei ni)', '綺麗くてから (kireikutekara)'],
    correctAnswer: '綺麗で (kirei de)',
    explanation: 'Meskipun berakhiran bunyi "i", 綺麗 (kirei) adalah KATA SIFAT -NA! Bentuk sambung kata sifat-na cukup ditempel "de" (Bukan kireikute!).',
    ruleTip: 'Kirei dan Kirai adalah kata sifat -NA, bukan kata sifat -i.',
  },
  {
    id: 'drill-12',
    promptWord: '話す',
    promptReading: 'hanasu',
    promptMeaning: 'Berbicara',
    groupType: 'Golongan 1 (Godan)',
    targetFormName: 'Bentuk Ajakan Kasual (意向形 / Ikoukei)',
    targetFormKey: 'ikou',
    questionText: 'Ubah kata kerja 話す (hanasu) ke bentuk Ajakan Kasual (Ayo kita bicara)!',
    options: ['話そう (hanasou)', '話しましょう (hanashimashou)', '話せよう (hanaseyou)', '話すよう (hanasuyou)'],
    correctAnswer: '話そう (hanasou)',
    explanation: 'Golongan 1 menggeser akhiran ke baris O + u. su ➜ so + u = hanasou (Ayo kita mengobrol)!',
    ruleTip: 'Tangga 5 Vokal: Baris O + u = Ajakan kasual.',
  },
];
