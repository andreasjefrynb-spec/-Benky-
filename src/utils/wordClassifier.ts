/**
 * Modul Klasifikasi Golongan Kata Bahasa Jepang (品詞分類 / Hinshi Bunrui)
 * Mendeteksi secara spesifik & teliti:
 * - Kata Benda (名詞 / Meishi) - termasuk perabotan seperti 机/tsukue, makanan, alat, dll.
 * - Satuan Bilangan / Penghitung (助数詞 / Joshuushi) & Kata Tanya Bilangan
 * - Kata Sifat -i (い形容詞) vs Kata Sifat -na (な形容詞)
 * - Kata Kerja Golongan 1 (五段), Golongan 2 (一段), Golongan 3 (不規則: する/くる)
 * - Kata Keterangan (副詞), Kata Sambung (接続詞), Partikel (助詞), Ungkapan & Salam (挨拶・表現)
 */

import { CardItem } from '../types';
import vocab1000 from '../data/vocab/vocab1000.json';

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

// Subkategori yang pasti merupakan KATA BENDA (Nomina / 名詞)
const NOUN_SUBCATEGORIES = new Set([
  'benda_rumah',
  'makanan',
  'makanan_minuman',
  'keluarga',
  'tubuh_kesehatan',
  'anggota_tubuh',
  'orang_profesi',
  'angka_waktu',
  'waktu_kalender',
  'tempat',
  'masyarakat_tempat',
  'arah_posisi',
  'transportasi',
  'transportasi_fasilitas',
  'alam_hewan',
  'alam_cuaca',
  'profesi_sekolah',
  'sekolah_kantor',
  'kata_benda',
  'kanji_angka',
  'kanji_waktu',
  'kanji_alam',
  'kanji_manusia',
  'kanji_arah',
  'kanji_sekolah',
  'kanji_benda',
  'kanji_kata_benda',
  'kanji_hewan',
  'kanji_warna',
]);

const VERB_SUBCATEGORIES = new Set([
  'kata_kerja',
  'kanji_kata_kerja',
  'verb',
  'verbs',
]);

const ADJ_SUBCATEGORIES = new Set([
  'kata_sifat',
  'kanji_sifat',
  'adjective',
  'adjectives',
]);

// Pengecualian terkenal: Kata sifat-na yang berakhiran bunyi "-i" atau huruf い
const NA_ADJECTIVES_ENDING_IN_I = new Set([
  '綺麗', 'きれい', 'キレイ', 'kirei',
  '有名', 'ゆうめい', 'yuumei',
  '嫌い', 'きらい', 'kirai',
  '幸い', 'さいわい', 'saiwai',
  '得意', 'とくい', 'tokui',
  '曖昧', 'あいまい', 'aimai',
]);

// Daftar kata sifat-na populer
const KNOWN_NA_ADJECTIVES = new Set([
  '静か', 'しずか', 'shizuka',
  '賑やか', 'にぎやか', 'nigiyaka',
  '便利', 'べんり', 'benri',
  '不便', 'ふべん', 'fuben',
  '親切', 'しんせつ', 'shinsetsu',
  '元気', 'げんき', 'genki',
  '暇', 'ひま', 'hima',
  '好き', 'すき', 'suki',
  '簡単', 'かんたん', 'kantan',
  '大変', 'たいへん', 'taihen',
  '上手', 'じょうず', 'jouzu',
  '下手', 'へた', 'heta',
  '苦手', 'にがて', 'nigate',
  '大切', 'たいせつ', 'taisetsu',
  '大事', 'だいじ', 'daiji',
  '安全', 'あんぜん', 'anzen',
  '危険', 'きけん', 'kiken',
  '自由', 'じゆう', 'jiyuu',
  '素敵', 'すてき', 'suteki',
  '真面目', 'まじめ', 'majime',
  '丁寧', 'ていねい', 'teinei',
  '複雑', 'ふくざつ', 'fukuzatsu',
  '特別', 'とくべつ', 'tokubetsu',
  '必要', 'ひつよう', 'hitsuyou',
  '不思議', 'ふしぎ', 'fushigi',
  '豊か', 'ゆたか', 'yutaka',
  '穏やか', 'おだやか', 'odayaka',
  '爽やか', 'さわやか', 'sawayaka',
  '新鮮', 'しんせん', 'shinsen',
  '適切', 'てきせつ', 'tekisetsu',
  '適当', 'てきとう', 'tekitou',
  '明確', 'めいかく', 'meikaku',
  '正確', 'せいかく', 'seikaku',
  '重要', 'じゅうよう', 'juuyou',
  '熱心', 'ねっしん', 'nesshin',
  '素直', 'すなお', 'sunao',
  '正直', 'しょうじき', 'shoujiki',
  '無駄', 'むだ', 'muda',
  '無理', 'むり', 'muri',
  '安心', 'あんしん', 'anshin',
  '心配', 'しんぱい', 'shinpai',
  '平気', 'へいき', 'heiki',
  '盛ん', 'さかん', 'sakan',
  '様々', 'さまざま', 'samazama',
  '立派', 'りっぱ', 'rippa',
  '豪華', 'ごうか', 'gouka',
  '派手', 'はで', 'hade',
  '地味', 'じみ', 'jimi',
  '愉快', 'ゆかい', 'yukai',
  '快適', 'かいてき', 'kaiteki',
  '迷惑', 'めいわく', 'meiwaku',
  '邪魔', 'じゃま', 'jama',
  '残念', 'ざんねん', 'zannen',
  '真剣', 'しんけん', 'shinken',
  '不満', 'ふまん', 'fuman',
  '満足', 'まんぞく', 'manzoku',
  '器用', 'きよう', 'kiyou',
  '不器用', 'ぶきよう', 'bukiyou',
  '贅沢', 'ぜいたく', 'zeitaku',
  '失礼', 'しつれい', 'shitsurei',
  '勝手', 'かって', 'katte',
  '楽', 'らく', 'raku',
  'ハンサム', 'hansamu',
]);

// Daftar kata sifat-i populer
const KNOWN_I_ADJECTIVES = new Set([
  '大きい', 'おおきい', 'ookii',
  '小さい', 'ちいさい', 'chiisai',
  '新しい', 'あたらしい', 'atarashii',
  '古い', 'ふるい', 'furui',
  '良い', 'いい', 'よい', 'ii', 'yoi',
  '悪い', 'わるい', 'warui',
  '暑い', 'あつい', 'atsui',
  '熱い',
  '寒い', 'さむい', 'samui',
  '冷たい', 'つめたい', 'tsumetai',
  '難しい', 'むずかしい', 'muzukashii',
  '易しい', 'やさしい', 'yasashii',
  '優しい',
  '高い', 'たかい', 'takai',
  '安い', 'やすい', 'yasui',
  '低い', 'ひくい', 'hikui',
  '面白い', 'おもしろい', 'omoshiroi',
  '美味しい', 'おいしい', 'oishii',
  '忙しい', 'いそがしい', 'isogashii',
  '楽しい', 'たのしい', 'tanoshii',
  '白い', 'しろい', 'shiroi',
  '黒い', 'くろい', 'kuroi',
  '赤い', 'あかい', 'akai',
  '青い', 'あおい', 'aoi',
  '近い', 'ちかい', 'chikai',
  '遠い', 'とおい', 'tooi',
  '速い', 'はやい', 'hayai',
  '早い',
  '遅い', 'おそい', 'osoi',
  '多い', 'おおい', 'ooi',
  '少ない', 'すくない', 'sukunai',
  '温かい', 'あたたかい', 'atatakai',
  '暖かい',
  '甘い', 'あまい', 'amai',
  '辛い', 'からい', 'karai',
  '重い', 'おもい', 'omoi',
  '軽い', 'かるい', 'karui',
  '広い', 'ひろい', 'hiroi',
  '狭い', 'せまい', 'semai',
  '明るい', 'あかるい', 'akarui',
  '暗い', 'くらい', 'kurai',
  'うるさい', 'urusai',
  '怪しい', 'あやしい', 'ayashii',
  '煙い', 'けむい', 'kemui',
  '痛い', 'いたい', 'itai',
  '眠い', 'ねむい', 'nemui',
  '危ない', 'あぶない', 'abunai',
  '寂しい', 'さびしい', 'sabishii',
  '悔しい', 'くやしい', 'kuyashii',
  '恥ずかしい', 'はずかしい', 'hazukashii',
  '羨ましい', 'うらやましい', 'urayamashii',
  '懐かしい', 'なつかしい', 'natsukashii',
]);

// Kata kerja jebakan: Terlihat seperti Golongan 2 (-iru / -eru) tetapi sebenarnya GOLONGAN 1 (五段 / Godan)
const TRAP_GODAN_VERBS = new Set([
  '帰る', 'かえる', 'kaeru', // pulang
  '入る', 'はいる', 'hairu', // masuk
  '走る', 'はしる', 'hashiru', // lari
  '知る', 'しる', 'shiru',   // tahu/kenal
  '切る', 'きる', 'kiru',   // potong (beda dengan kiru memakai baju)
  '要る', 'いる', 'iru',   // butuh
  '喋る', 'しゃべる', 'shaberu', // mengobrol
  '減る', 'へる', 'heru',   // berkurang
  '滑る', 'すべる', 'suberu', // terpeleset
  '蹴る', 'ける', 'keru',   // menendang
  '焦る', 'あせる', 'aseru', // tergesa-gesa
  '限る', 'かぎる', 'kagiru', // terbatas
  '照る', 'てる', 'teru',   // bersinar
  '握る', 'にぎる', 'nigiru', // menggenggam
  '散る', 'ちる', 'chiru',   // berguguran
]);

// Kata kerja Golongan 2 (一段 / Ichidan) kamus yang sangat umum
const KNOWN_ICHIDAN_VERBS = new Set([
  '食べる', 'たべる', 'taberu',
  '見る', 'みる', 'miru',
  '起きる', 'おきる', 'okiru',
  '寝る', 'ねる', 'neru',
  '教える', 'おしえる', 'oshieru',
  '覚える', 'おぼえる', 'oboeru',
  '忘れる', 'わすれる', 'wasureru',
  '開ける', 'あける', 'akeru',
  '閉める', 'しめる', 'shimeru',
  'つける', 'tsukeru',
  '消える', 'きえる', 'kieru',
  '出る', 'でる', 'deru',
  '出かける', 'でかける', 'dekakeru',
  '入れる', 'いれる', 'ireru',
  '着る', 'きる', 'kiru', // memakai pakaian atas
  '落ちる', 'おちる', 'ochiru',
  '降りる', 'おりる', 'oriru', // turun kendaraan
  '借りる', 'かりる', 'kariru', // meminjam
  '疲れる', 'つかれる', 'tsukareru',
  '見せる', 'みせる', 'miseru',
  '始める', 'はじめる', 'hajimeru',
  '辞める', 'やめる', 'yameru',
  '止める', 'とめる', 'tomeru',
  '調べる', 'しらべる', 'shiraberu',
  '届ける', 'とどける', 'todokeru',
  '考える', 'かんがえる', 'kangaeru',
  '続ける', 'つづける', 'tsuzukeru',
  '受ける', 'うける', 'ukeru',
  '決める', 'きめる', 'kimeru',
  '集める', 'あつめる', 'atsumeru',
  '変える', 'かえる', 'kaeru', // mengubah (beda dengan kaeru pulang)
  '答える', 'こたえる', 'kotaeru',
  '育てる', 'そだてる', 'sodateru',
  '助ける', 'たすける', 'tasukeru',
  '逃げる', 'にげる', 'nigeru',
  '負ける', 'まける', 'makeru',
  '晴れる', 'はれる', 'hareru',
  '投げる', 'なげる', 'nageru',
  '褒める', 'ほめる', 'homeru',
  '並べる', 'ならべる', 'naraberu',
  '建てる', 'たてる', 'tateru',
  '生まれる', 'うまれる', 'umareru',
  '生きる', 'いきる', 'ikiru',
  '信じる', 'しんじる', 'shinjiru',
  '感じる', 'かんじる', 'kanjiru',
  '似る', 'にる', 'niru',
  '煮る', 'にる', 'niru',
  '居る', 'いる', 'iru', // ada makhluk hidup
]);

// Stem bentuk ~masu khusus yang termasuk Golongan 2 (一段 / Ichidan) meskipun vokal sebelum masu adalah 'i'
const SPECIAL_ICHIDAN_MASU_STEMS = new Set([
  '見ます', 'みます', 'mimasu',
  '起きます', 'おきます', 'okimasu',
  '着ます', // kimasu memakai pakaian
  '借ります', 'かります', 'karimasu',
  '降ります', 'おります', 'orimasu',
  '居ます', 'います', 'imasu',
  '落ちます', 'おちます', 'ochimasu',
  '信じます', 'しんじます', 'shinjimasu',
  '足ります', 'たります', 'tarimasu',
  '浴びます', 'あびます', 'abimasu',
  '出来ます', 'できます', 'dekimasu',
  '生きます', // ikimasu hidup (bukan ikimasu pergi)
  '感じます', 'かんじます', 'kanjimasu',
  '閉じます', 'とじます', 'tojimasu',
  '似ます', 'にます', 'nimasu',
]);

// Kata keterangan umum (副詞 / Fukushi)
const KNOWN_ADVERBS = new Set([
  'だんだん', 'dandan',
  'ゆっくり', 'yukkuri',
  'とても', 'totemo',
  'たくさん', 'takusan',
  'すこし', '少し', 'sukoshi',
  'ぜんぜん', '全然', 'zenzen',
  'いつも', 'itsumo',
  'ときどき', '時々', 'tokidoki',
  'たまに', 'tamani',
  'あまり', 'amari',
  'ちょうど', 'choudo',
  'まっすぐ', 'massugu',
  'だいたい', 'daitai',
  'たぶん', 'tabun',
  'きっと', 'kitto',
  'ぜひ', 'zehi',
  'はじめに', 'hajimeni',
  'さいごに', 'saigoni',
  'まず', 'mazu',
  'そろそろ', 'sorosoro',
  'いっしょに', '一緒に', 'isshoni',
  'べつべつに', '別々に', 'betsubetsuni',
  'ひとりで', '一人で', 'hitoride',
  'みんなで', 'minnade',
  'とくに', '特に', 'tokuni',
  'もう', 'mou',
  'まだ', 'mada',
  'すぐ', 'sugu',
  'あとで', '後で', 'atode',
  '次第に', 'shidaini',
  'いきなり', 'ikinari',
  'ばったり', 'battari',
  'ぼんやり', 'bonyari',
  'すっかり', 'sukkari',
  'はっきり', 'hakkiri',
  '何回も', 'なんかいも', 'nankaimo',
  'あわてて', '慌てて', 'awatete',
  'めったに', 'mettani',
]);

// Kata sambung umum (接続詞 / Setsuzokushi)
const KNOWN_CONJUNCTIONS = new Set([
  'そして', 'それから', 'でも', 'しかし', 'だから', 'それで', 'また', 'あるいは',
  'ところで', 'それに', 'ですから', 'だが', 'けれども', 'しかしながら', 'それとも',
  'それでも',
]);

// Ungkapan & salam umum (挨拶・表現)
const KNOWN_EXPRESSIONS = new Set([
  '乾杯', 'かんぱい', 'kanpai',
  'おかげさまで', 'okagesamade',
  'おつかれさま', 'otsukaresama',
  'よろしく', 'yoroshiku',
  'おねがいします', 'onegaishimasu',
  'ありがとうございます', 'arigatougozaimasu',
  'すみません', 'sumimasen',
  'ごめんなさい', 'gomennasai',
  'いただきます', 'itadakimasu',
  'ごちそうさま', 'gochisousama',
  'いってきます', 'ittekimasu',
  'いってらっしゃい', 'itterasshai',
  'ただいま', 'tadaima',
  'おかえり', 'okaeri',
  'はじめまして', 'hajimemashite',
  'ファイト', 'faito',
  'いらっしゃいませ', 'irasshaimase',
  'お世話になります', 'おせわになります',
  'お大事に', 'おだいじに',
  '気をつけて', 'きをつけて',
  '大丈夫', 'だいじょうぶ',
  '失礼します', 'しつれいします',
  '失礼しました', 'しつれいしました',
]);

// KATA BENDA (Nomina / Meishi) yang sangat umum & penting agar tidak pernah salah diklasifikasi
const KNOWN_NOUN_WORDS = new Set([
  // Perabot & Perlengkapan Rumah/Kantor
  '机', 'つくえ', 'tsukue', // Meja (KATA BENDA!)
  '椅子', 'いす', 'isu',     // Kursi (KATA BENDA!)
  'テーブル', 'teeburu',      // Meja makan
  'ベッド', 'beddo',
  'ドア', 'doa',
  '窓', 'まど', 'mado',
  '本棚', 'ほんだな', 'hondana',
  '電気', 'でんき', 'denki',
  'テレビ', 'terebi',
  'ラジオ', 'rajio',
  'カメラ', 'kamera',
  'コンピューター', 'konpyuutaa',
  'パソコン', 'pasokon',
  'エアコン', 'eakon',
  '冷蔵庫', 'れいぞうこ', 'reizouko',
  '洗濯機', 'せんたくき', 'sentakuki', // Mesin cuci
  '掃除機', 'そうじき', 'soujiki',     // Mesin penyedot debu
  '受付', 'うけつけ', 'uketsuke',     // Meja resepsionis
  'エンジン', 'enjin',                // Mesin kendaraan
  'メロディー', 'merodii',            // Melodi

  // Benda Sehari-hari, Pakaian & Makanan
  '本', 'ほん', 'hon',
  '辞書', 'じしょ', 'jisho',
  '雑誌', 'ざっし', 'zasshi',
  '新聞', 'しんぶん', 'shinbun',
  'ノート', 'nooto',
  '手帳', 'てちょう', 'techou',
  '名刺', 'めいし', 'meishi',
  'カード', 'kaado',
  '鉛筆', 'えんぴつ', 'enpitsu',
  'ボールペン', 'boorupen',
  'シャープペンシル', 'shaapopenshiru',
  '鍵', 'かぎ', 'kagi',
  '時計', 'とけい', 'tokei',
  '傘', 'かさ', 'kasa',
  '鞄', 'かばん', 'kaban',
  '財布', 'さいふ', 'saifu',
  '靴', 'くつ', 'kutsu',
  '靴下', 'くつした', 'kutsushita',
  'シャツ', 'shatsu',
  'ワイシャツ', 'waishatsu',
  'ネクタイ', 'nekutai',
  '服', 'ふく', 'fuku',
  '眼鏡', 'めがね', 'megane',
  'チョコレート', 'chokoreeto',
  'コーヒー', 'koohii',
  'お茶', 'おちゃ', 'ocha',
  '水', 'みず', 'mizu',
  '牛乳', 'ぎゅうにゅう', 'gyuunyuu',
  'ご飯', 'ごはん', 'gohan',
  'パン', 'pan',
  '肉', 'にく', 'niku',
  '魚', 'さかな', 'sakana',
  '卵', 'たまご', 'tamago',
  '野菜', 'やさい', 'yasai',
  '果物', 'くだもの', 'kudamono',
  '米', 'こめ', 'kome',       // Beras
  '熊', 'くま', 'kuma',       // Beruang
  '胡椒', 'こしょう', 'koshou', // Merica
  'きゅうり', 'kyuuri',       // Mentimun
  'バター', 'bataa',          // Mentega

  // Warna sebagai kata benda
  '赤', 'あか', 'aka',
  '青', 'あお', 'ao',
  '白', 'しろ', 'shiro',
  '黒', 'くろ', 'kuro',
  '緑', 'みどり', 'midori',
  '黄色', 'きいろ', 'kiiro',
  '茶色', 'ちゃいろ', 'chairo',
  'ピンク', 'pinku',
  'オレンジ', 'orenji',
  '紫', 'むらさき', 'murasaki',

  // Penominalan & Besaran (~sa)
  '重さ', 'おもさ', 'omosa',
  '高さ', 'たかさ', 'takasa',
  '長さ', 'ながさ', 'nagasa',
  '広さ', 'ひろさ', 'hirosa',
  '深さ', 'ふかさ', 'fukasa',
  '今度', 'こんど', 'kondo',
]);

// Populasikan nomina dari vocab1000 secara otomatis
vocab1000
  .filter(
    (v) =>
      v.subCategory !== 'kata_kerja' &&
      v.subCategory !== 'kata_sifat' &&
      v.subCategory !== 'keterangan_fukushi' &&
      v.subCategory !== 'salam'
  )
  .forEach((v) => {
    if (v.japanese) KNOWN_NOUN_WORDS.add(v.japanese.replace(/[\s\(\)（）]/g, ''));
    if (v.kanji) KNOWN_NOUN_WORDS.add(v.kanji.replace(/[\s\(\)（）]/g, ''));
    if (v.reading) KNOWN_NOUN_WORDS.add(v.reading.toLowerCase().replace(/[\s\(\)（）]/g, ''));
    if (v.furigana) KNOWN_NOUN_WORDS.add(v.furigana.replace(/[\s\(\)（）]/g, ''));
  });

// Himpunan kata kerja terverifikasi dari kamus dasar
const KNOWN_CURATED_VERBS = new Set<string>();
vocab1000
  .filter((v) => v.subCategory === 'kata_kerja')
  .forEach((v) => {
    if (v.japanese) KNOWN_CURATED_VERBS.add(v.japanese.replace(/[\s\(\)（）]/g, ''));
    if (v.kanji) KNOWN_CURATED_VERBS.add(v.kanji.replace(/[\s\(\)（）]/g, ''));
    if (v.reading) KNOWN_CURATED_VERBS.add(v.reading.toLowerCase().replace(/[\s\(\)（）]/g, ''));
  });

/**
 * Klasifikasikan jenis/golongan kata dari suatu CardItem secara teliti & akurat.
 */
export function getWordClassification(item: CardItem): WordClassification {
  const jp = (item.japanese || item.kanji || '').trim();
  const furi = (item.furigana || '').trim();
  const reading = (item.reading || '').trim().toLowerCase();
  const subCat = (item.subCategory || '').toLowerCase();
  const notes = (item.notes || item.mnemonic || '').toLowerCase();
  const meaning = (item.meaningId || '').toLowerCase();

  // Bersihkan teks bahasa Jepang dari tanda kurung kanji/partikel seperti (机), （を）, (〜分)
  const cleanJp = jp.replace(/[（\(].*?[）\)]/g, '').trim();
  const cleanFuri = furi.replace(/[（\(].*?[）\)]/g, '').trim();
  const cleanReading = reading.replace(/[（\(].*?[）\)]/g, '').trim();

  // 1. Kategori Aksara Dasar & Simbol
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

  // 2. Subkategori KATA BENDA Eksplisit -> Pasti Kata Benda (名詞)!
  // Mencegah semua nomina rumah tangga, tempat, makanan, dsb tertukar dengan verba
  if (NOUN_SUBCATEGORIES.has(subCat)) {
    return createNounInfo();
  }

  // Kata serapan Katakana murni (seperti クラス/kelas, グラス/gelas, バス/bus, ホテル/hotel, ジュース/jus)
  // yang tidak berakhiran する/suru adalah KATA BENDA (Nomina / Meishi)
  const isPureKatakana = /^[\u30A0-\u30FF\u30FC\s・]+$/.test(cleanJp);
  if (isPureKatakana && !cleanJp.endsWith('する') && !cleanReading.endsWith('suru')) {
    return createNounInfo();
  }

  // 3. Cek Kata Benda Spesifik dari Kamus Terverifikasi (seperti 机/meja, 椅子/kursi, 米/beras, dll.)
  if (
    KNOWN_NOUN_WORDS.has(cleanJp) ||
    KNOWN_NOUN_WORDS.has(jp) ||
    KNOWN_NOUN_WORDS.has(cleanReading) ||
    KNOWN_NOUN_WORDS.has(reading)
  ) {
    return createNounInfo();
  }

  // 4. Satuan Bilangan / Penghitung (助数詞) & Kata Tanya Bilangan
  if (
    cleanJp.startsWith('～') ||
    cleanJp.startsWith('〜') ||
    cleanJp.startsWith('何') ||
    cleanFuri.startsWith('なん') ||
    cleanReading.startsWith('nan') ||
    cleanReading.startsWith('~')
  ) {
    return createCounterNounInfo();
  }

  // 5. Cek Petunjuk Eksplisit dari Notes
  if (notes.includes('gol. 1') || notes.includes('golongan 1') || notes.includes('godan')) {
    return createVerb1Info();
  }
  if (notes.includes('gol. 2') || notes.includes('golongan 2') || notes.includes('ichidan')) {
    return createVerb2Info();
  }
  if (
    notes.includes('gol. 3') ||
    notes.includes('golongan 3') ||
    notes.includes('fukisoku') ||
    notes.includes('suru') ||
    notes.includes('kuru')
  ) {
    return createVerb3Info();
  }
  if (notes.includes('sifat-i') || notes.includes('i-adj') || notes.includes('kata sifat i')) {
    return createAdjIInfo();
  }
  if (notes.includes('sifat-na') || notes.includes('na-adj') || notes.includes('kata sifat na') || notes.includes('[na]')) {
    return createAdjNaInfo();
  }

  // 6. Ungkapan & Salam (挨拶・表現 / Aisatsu・Hyougen)
  if (
    item.category === 'phrases' ||
    item.category === 'irodori' ||
    subCat === 'salam' ||
    subCat === 'perkenalan' ||
    subCat.includes('ungkapan') ||
    KNOWN_EXPRESSIONS.has(cleanJp) ||
    KNOWN_EXPRESSIONS.has(cleanReading) ||
    meaning.includes('selamat pagi') ||
    meaning.includes('selamat malam') ||
    meaning.includes('selamat jalan') ||
    meaning.includes('terima kasih') ||
    meaning.includes('sama-sama') ||
    meaning.includes('bersulang')
  ) {
    return createPhraseInfo();
  }

  // 7. Kata Sambung (接続詞 / Setsuzokushi)
  if (
    KNOWN_CONJUNCTIONS.has(cleanJp) ||
    KNOWN_CONJUNCTIONS.has(cleanFuri) ||
    subCat.includes('sambung') ||
    notes.includes('setsuzoku')
  ) {
    return createConjunctionInfo();
  }

  // 8. Kata Keterangan (副詞 / Fukushi)
  if (
    subCat === 'keterangan_fukushi' ||
    subCat.includes('fukushi') ||
    notes.includes('fukushi') ||
    KNOWN_ADVERBS.has(cleanJp) ||
    KNOWN_ADVERBS.has(cleanFuri) ||
    KNOWN_ADVERBS.has(cleanReading)
  ) {
    return createAdverbInfo();
  }

  // 9. Kata Sifat (形容詞 / Keiyoushi)
  const isExplicitAdj =
    ADJ_SUBCATEGORIES.has(subCat) ||
    notes.includes('keiyoushi') ||
    meaning.includes('(kata sifat)') ||
    meaning.includes('kata sifat') ||
    jp.includes('[な]') ||
    jp.includes('（な）') ||
    jp.includes('(な)');

  if (isExplicitAdj) {
    if (NA_ADJECTIVES_ENDING_IN_I.has(cleanJp) || NA_ADJECTIVES_ENDING_IN_I.has(cleanFuri)) {
      return createAdjNaInfo();
    }
    if (KNOWN_NA_ADJECTIVES.has(cleanJp) || KNOWN_NA_ADJECTIVES.has(cleanFuri)) {
      return createAdjNaInfo();
    }
    if (cleanJp.endsWith('い') || cleanFuri.endsWith('い') || cleanReading.endsWith('i')) {
      return createAdjIInfo();
    }
    return createAdjNaInfo();
  }

  if (
    NA_ADJECTIVES_ENDING_IN_I.has(cleanJp) ||
    NA_ADJECTIVES_ENDING_IN_I.has(cleanFuri) ||
    KNOWN_NA_ADJECTIVES.has(cleanJp) ||
    KNOWN_NA_ADJECTIVES.has(cleanFuri)
  ) {
    return createAdjNaInfo();
  }

  if (
    KNOWN_I_ADJECTIVES.has(cleanJp) ||
    KNOWN_I_ADJECTIVES.has(cleanFuri) ||
    KNOWN_I_ADJECTIVES.has(cleanReading)
  ) {
    return createAdjIInfo();
  }

  // 10. Klasifikasi KATA KERJA (動詞 / Doushi)
  // Aturan teliti: Kata kerja HANYA diklasifikasikan jika berakhiran ~ます atau memiliki akhiran verba Jepang yang sah!
  // Kata benda seperti "meja", "merah", "beras", "mentega" TIDAK AKAN PERNAH salah masuk ke sini.
  const isMasuVerb = cleanJp.endsWith('ます') || cleanReading.endsWith('masu');

  if (isMasuVerb) {
    // Golongan 3: 不規則 (shimasu / kimasu)
    if (
      cleanJp.endsWith('します') ||
      cleanReading.endsWith('shimasu') ||
      cleanJp === '来ます' ||
      (cleanJp === 'きます' && (meaning.includes('datang') || (!meaning.includes('baju') && !meaning.includes('pakaian'))))
    ) {
      return createVerb3Info();
    }

    // Ikimasu (pergi / 行きます) SELALU Golongan 1 (五段 / Godan)
    if (cleanJp.includes('行き') || (cleanJp === 'いきます' && meaning.includes('pergi'))) {
      return createVerb1Info();
    }

    // Golongan 2 (一段 / Ichidan):
    // 1) Bunyi vokal 'e' sebelum masu (misal: tabemasu, nemasu, oshiemasu, yamemasu, kakemasu)
    const isESoundBeforeMasu =
      /[えけせてねへめれげぜでべぺ]ます$/.test(cleanJp || cleanFuri) ||
      /[ekstnhmrgzdbp]emasu$/.test(cleanReading);

    if (isESoundBeforeMasu) {
      return createVerb2Info();
    }

    // 2) Kata kerja i-dan khusus yang termasuk Golongan 2 (misal: mimasu, okimasu, karimasu, orimasu, imasu, kimasu [pakai])
    if (
      SPECIAL_ICHIDAN_MASU_STEMS.has(cleanJp) ||
      SPECIAL_ICHIDAN_MASU_STEMS.has(cleanFuri) ||
      (cleanJp === '着ます' || (cleanJp === 'きます' && (meaning.includes('baju') || meaning.includes('pakaian'))))
    ) {
      return createVerb2Info();
    }

    // Sisanya yang berakhiran -i + masu (misal: nomimasu, kakimasu, yomimasu, aimasu, hatarakimasu) -> Golongan 1
    return createVerb1Info();
  }

  // Verba bentuk kamus (辞書形 / Jishokei)
  const isVerbSub = VERB_SUBCATEGORIES.has(subCat);
  const isKnownCuratedVerb = KNOWN_CURATED_VERBS.has(cleanJp) || KNOWN_CURATED_VERBS.has(cleanReading);
  const endsWithSuru = cleanJp.endsWith('する') || cleanReading.endsWith('suru') || cleanJp.endsWith('為る');
  const isKuru = cleanJp === 'くる' || cleanJp === '来る' || cleanReading === 'kuru';

  if (isVerbSub || isKnownCuratedVerb || endsWithSuru || isKuru) {
    // Golongan 3: 不規則 (suru, kuru)
    if (endsWithSuru || isKuru) {
      return createVerb3Info();
    }

    // Jebakan Godan (-iru/-eru yang sebenarnya Golongan 1)
    if (TRAP_GODAN_VERBS.has(cleanJp) || TRAP_GODAN_VERBS.has(cleanFuri)) {
      return createVerb1Info();
    }

    // Golongan 2 (一段 / Ichidan) bentuk kamus
    if (KNOWN_ICHIDAN_VERBS.has(cleanJp) || KNOWN_ICHIDAN_VERBS.has(cleanFuri)) {
      return createVerb2Info();
    }

    if (cleanJp.endsWith('る') || cleanReading.endsWith('ru')) {
      const isIruEru =
        /[ie]ru$/.test(cleanReading) ||
        /[いきしちにひみりえけせてねへめれ]る$/.test(cleanFuri || cleanJp);
      if (isIruEru) {
        return createVerb2Info();
      }
    }

    // Semua kata kerja kamus berakhiran u, ku, gu, su, tsu, nu, bu, mu -> Golongan 1
    return createVerb1Info();
  }

  // 11. Cek kata sifat-i umum yang belum terdeteksi (berakhiran huruf い dan bukan kata benda)
  if (
    (cleanJp.endsWith('い') || cleanReading.endsWith('i')) &&
    !KNOWN_NOUN_WORDS.has(cleanJp) &&
    cleanJp.length >= 2 &&
    (/[あ-ん]い$/.test(cleanJp) || /[aiueo]i$/.test(cleanReading)) &&
    (meaning.includes('sifat') || meaning.includes('yang ') || cleanJp.length <= 4)
  ) {
    // Pengecualian kata benda berakhiran i (misal tokei, keitai, mirai)
    if (!['時計', 'とけい', '携帯', 'けいたい', '未来', 'みらい', '機械', 'きかい'].includes(cleanJp)) {
      return createAdjIInfo();
    }
  }

  // 12. Default Final yang Aman: KATA BENDA (名詞 / Meishi)
  return createNounInfo();
}

// Helper factory functions
function createNounInfo(): WordClassification {
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

function createCounterNounInfo(): WordClassification {
  return {
    type: 'noun',
    label: 'Satuan Bilangan (助数詞 / Joshuushi)',
    shortLabel: 'Satuan / Bilangan',
    kanjiLabel: '助数詞',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-200/80 font-bold',
    icon: '🔢',
    grammarHint: 'Penghitung satuan waktu (jam/menit), orang, barang, urutan, dsb.',
  };
}

function createPhraseInfo(): WordClassification {
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

function createConjunctionInfo(): WordClassification {
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

function createAdverbInfo(): WordClassification {
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
