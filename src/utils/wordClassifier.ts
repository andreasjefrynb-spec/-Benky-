/**
 * Modul Klasifikasi Golongan Kata Bahasa Jepang (品詞分類 / Hinshi Bunrui)
 * Mendeteksi secara spesifik & teliti:
 * - Kata Benda (名詞 / Meishi) - termasuk sayur/makanan (白菜/はくさい/hakusai, 野菜/やさい), perabotan (机/tsukue), alat, dll.
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
  '大嫌い', 'だいきらい', 'daikirai',
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
  '大好き', 'だいすき', 'daisuki',
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
  '快適な',
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

// Daftar kata sifat-i populer & terverifikasi (Kanji, Kana, Romaji)
const KNOWN_I_ADJECTIVES = new Set([
  '大きい', 'おおきい', 'ookii',
  '小さい', 'ちいさい', 'chiisai',
  '新しい', 'あたらしい', 'atarashii',
  '古い', 'ふるい', 'furui',
  '良い', 'いい', 'よい', 'ii', 'yoi',
  '悪い', 'わるい', 'warui',
  '暑い', 'あつい', 'atsui',
  '熱い',
  '厚い',
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
  '嬉しい', 'うれしい', 'ureshii',
  '悲しい', 'かなしい', 'kanashii',
  '白い', 'しろい', 'shiroi',
  '黒い', 'くろい', 'kuroi',
  '赤い', 'あかい', 'akai',
  '青い', 'あおい', 'aoi',
  '黄色い', 'きいろい', 'kiiroi',
  '茶色い', 'ちゃいろい', 'chairoi',
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
  '塩辛い', 'しおからい', 'shiokarai',
  '苦い', 'にがい', 'nigai',
  '酸っぱい', 'すっぱい', 'suppai',
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
  '汚い', 'きたない', 'kitanai',
  '浅い', 'あさい', 'asai',
  '深い', 'ふかい', 'fukai',
  '涼しい', 'すずしい', 'suzushii',
  '激しい', 'はげしい', 'hageshii',
  '濃い', 'こい', 'koi',
  '薄い', 'うすい', 'usui',
  '細い', 'ほそい', 'hosoi',
  '太い', 'ふとい', 'futoi',
  '珍しい', 'めずらしい', 'mezurashii',
  '痒い', 'かゆい', 'kayui',
  '眩しい', 'まぶしい', 'mabushii',
  '短い', 'みじかい', 'mijikai',
  '硬い', 'かたい', 'katai',
  '固い',
  '柔らかい', 'やわらかい', 'yawarakai',
  '粗い', 'あらい', 'arai',
  '素晴らしい', 'すばらしい', 'subarashii',
  '細かい', 'こまかい', 'komakai',
  '美しい', 'うつくしい', 'utsukushii',
  '臭い', 'くさい', 'kusai',
  '若い', 'わかい', 'wakai',
  '詳しい', 'くわしい', 'kuwashii',
  '正しい', 'ただしい', 'tadashii',
  '賢い', 'かしこい', 'kashikoi',
  '酷い', 'ひどい', 'hidoi',
  '長い', 'ながい', 'nagai',
  '欲しい', 'ほしい', 'hoshii',
  '大人しい', 'おとなしい', 'otonashii',
  '恐ろしい', 'おそろしい', 'osoroshii',
  '惜しい', 'おしい', 'oshii',
  '格好いい', 'かっこいい', 'kakkoii',
  'つまらない', 'tsumaranai',
  'くだらない', 'kudaranai',
  'もったいない', 'mottainai',
  '香ばしい', 'こうばしい', 'koubashii',
  '親しい', 'したしい', 'shitashii',
  'ぬるい', 'nurui',
  'まずい', '不味い', 'mazui',
  '偉い', 'えらい', 'erai',
  '厳しい', 'きびしい', 'kibishii',
  '可愛い', 'かわいい', 'kawaii',
  '可笑しい', 'おかしい', 'okashii',
  '弱い', 'よわい', 'yowai',
  '強い', 'つよい', 'tsuyoi',
  '怖い', 'こわい', 'kowai',
  '丸い', 'まるい', 'marui',
  '幼い', 'おさない', 'osanai',
  '鋭い', 'するどい', 'surudoi',
  '鈍い', 'にぶい', 'nibui',
  '頼もしい', 'たのもしい', 'tanomoshii',
  '図々しい', 'ずうずうしい', 'zuuzuushii',
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
  '煮ます',
  '過ぎます', 'すぎます', 'sugimasu',
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
  'あ、いけない',
  '拝啓', 'はいけい', 'haikei',
  '敬具', 'けいぐ', 'keigu',
]);

// KATA BENDA (Nomina / Meishi) yang sangat umum & penting agar tidak pernah salah diklasifikasi
// Terutama kata yang berakhiran huruf -i / -ai / -ei / -ui / -oi (seperti はくさい / sawi)
const KNOWN_NOUN_WORDS = new Set([
  // Sayuran, Makanan & Minuman
  'はくさい', '白菜', 'hakusai', // Sawi putih (KATA BENDA!)
  'やさい', '野菜', 'yasai',     // Sayuran (KATA BENDA!)
  '米', 'こめ', 'kome',
  'ご飯', 'ごはん', 'gohan',
  'パン', 'pan',
  '肉', 'にく', 'niku',
  '魚', 'さかな', 'sakana',
  '卵', 'たまご', 'tamago',
  '果物', 'くだもの', 'kudamono',
  'きゅうり', 'kyuuri',
  '胡椒', 'こしょう', 'koshou',
  'バター', 'bataa',
  'チョコレート', 'chokoreeto',
  'コーヒー', 'koohii',
  'お茶', 'おちゃ', 'ocha',
  '水', 'みず', 'mizu',
  '牛乳', 'ぎゅうにゅう', 'gyuunyuu',
  '西瓜', 'すいか', 'suika',
  '水筒', 'すいとう', 'suitou',
  '水泳', 'すいえい', 'suiei',

  // Perabot, Fasilitas & Perlengkapan Rumah/Kantor
  '机', 'つくえ', 'tsukue', // Meja (KATA BENDA!)
  '椅子', 'いす', 'isu',     // Kursi (KATA BENDA!)
  'テーブル', 'teeburu',
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
  '洗濯機', 'せんたくき', 'sentakuki',
  '掃除機', 'そうじき', 'soujiki',
  '受付', 'うけつけ', 'uketsuke',
  'エンジン', 'enjin',
  'メロディー', 'merodii',
  'ガス台', 'ガスだい', 'gasudai', // Kompor gas
  'バス停', 'バスてい', 'basutei', // Halte bis
  'トイレ', 'お手洗い', 'おてあらい', 'tearai', // Toilet / Cuci tangan
  '手洗い', 'てあらい',

  // Benda Sehari-hari, Pakaian, Aksesori & Dokumen
  '時計', 'とけい', 'tokei',
  '携帯', 'けいたい', 'keitai',
  '財布', 'さいふ', 'saifu',
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
  '傘', 'かさ', 'kasa',
  '鞄', 'かばん', 'kaban',
  '靴', 'くつ', 'kutsu',
  '靴下', 'くつした', 'kutsushita',
  'シャツ', 'shatsu',
  'ワイシャツ', 'waishatsu',
  'ネクタイ', 'nekutai',
  '服', 'ふく', 'fuku',
  '眼鏡', 'めがね', 'megane',
  '種類', 'しゅるい', 'shurui',
  '書類', 'しょるい', 'shorui',
  '切符', 'きっぷ', 'kippu',
  'チケット', 'chiketto',
  '救命胴衣', 'きゅうめいどうい',

  // Konsep, Hubungan Sosial, Acara & Komunikasi (Berakhiran -i)
  '姉妹', 'しまい', 'shimai',       // Saudara perempuan (KATA BENDA!)
  '兄弟', 'きょうだい', 'kyoudai',   // Saudara (KATA BENDA!)
  '海外', 'かいがい', 'kaigai',     // Luar negeri (KATA BENDA!)
  '大会', 'たいかい', 'taikai',     // Turnamen / pertemuan besar (KATA BENDA!)
  '二次会', 'にじかい', 'nijikai',   // Pesta ronde kedua (KATA BENDA!)
  '試合', 'しあい', 'shiai',         // Pertandingan (KATA BENDA!)
  'お見合い', 'おみあい', 'omiai',   // Pertemuan perjodohan (KATA BENDA!)
  'お見舞い', 'おみまい', 'omimai',   // Besuk orang sakit (KATA BENDA!)
  '間違い', 'まちがい', 'machigai', // Kesalahan (KATA BENDA!)
  '関係', 'かんけい', 'kankei',     // Hubungan (KATA BENDA!)
  '年齢', 'ねんれい', 'nenrei',     // Umur (KATA BENDA!)
  '具合', 'ぐあい', 'guai',         // Kondisi/keadaan (KATA BENDA!)
  'におい', '匂い', '臭い', 'nioi',  // Bau / aroma (KATA BENDA!)
  '大勢', 'おおぜい', 'oozei',       // Banyak orang (KATA BENDA!)
  '芸', 'げい', 'gei',               // Seni / keahlian (KATA BENDA!)
  '愛', 'あい', 'ai',               // Cinta (KATA BENDA!)
  '会', 'かい', 'kai',
  '世界', 'せかい', 'sekai',
  '時代', 'じだい', 'jidai',
  '機械', 'きかい', 'kikai',
  '機会', 'kikai',
  '未来', 'みらい', 'mirai',
  '案内', 'あんない', 'annai',
  '問題', 'もんだい', 'mondai',
  '宿題', 'しゅくだい', 'shukudai',
  '話題', 'わだい', 'wadai',
  '後悔', 'こうかい', 'koukai',
  '反省', 'はんせい', 'hansei',
  '賛成', 'さんせい', 'sansei',
  '反対', 'はんたい', 'hantai',
  '丁寧体', 'ていねいたい', 'teineitai',
  '共生', 'きょうせい', 'kyousei',
  '朝礼', 'ちょうれい', 'chourei',
  '注意', 'ちゅうい', 'chuui',
  '足元注意', 'あしもとちゅうい',
  '販売', 'はんばい', 'hanbai',
  '向かい', 'むかい', 'mukai',
  'お礼', 'おれい', 'orei',
  '違い', 'ちがい', 'chigai',
  '手伝い', 'てつだい', 'tetsudai',
  'お祝い', 'おいわい', 'oiwai',
  '熊', 'くま', 'kuma',

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
  const cleanJp = jp.replace(/[（\(].*?[）\)]/g, '').replace(/\[.*?\]/g, '').trim();
  const cleanFuri = furi.replace(/[（\(].*?[）\)]/g, '').replace(/\[.*?\]/g, '').trim();
  const cleanReading = reading.replace(/[（\(].*?[）\)]/g, '').replace(/\[.*?\]/g, '').trim();

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

  // 2. Satuan Bilangan / Penghitung (助数詞) & Kata Tanya Bilangan
  const isGrammarPattern =
    cleanJp.endsWith('ます') ||
    cleanJp.endsWith('ない') ||
    cleanJp.endsWith('です') ||
    cleanJp.endsWith('こと') ||
    cleanJp.includes('て') ||
    cleanJp.includes('た') ||
    cleanJp.includes('申') ||
    cleanJp.length > 7;

  if (
    !isGrammarPattern &&
    (cleanJp.startsWith('～') ||
      cleanJp.startsWith('〜') ||
      cleanReading.startsWith('~') ||
      (cleanJp.startsWith('何') && (cleanJp.length <= 4 || cleanFuri.startsWith('なん') || cleanReading.startsWith('nan'))))
  ) {
    return createCounterNounInfo();
  }

  // 3. Ungkapan & Salam (挨拶・表現 / Aisatsu・Hyougen)
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

  // 4. KATA KERJA BENTUK ~ます (動詞 ます形)
  // Aturan utama: Kata berakhiran ~ます adalah Kata Kerja (kecuali salam tetap di atas).
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

  // 5. Cek Petunjuk Eksplisit dari Notes / Mnemonic
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

  // 6. Kata Sambung (接続詞 / Setsuzokushi)
  if (
    KNOWN_CONJUNCTIONS.has(cleanJp) ||
    KNOWN_CONJUNCTIONS.has(cleanFuri) ||
    subCat.includes('sambung') ||
    notes.includes('setsuzoku')
  ) {
    return createConjunctionInfo();
  }

  // 7. Kata Keterangan (副詞 / Fukushi)
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

  // 8. Kata Kerja Bentuk Kamus (辞書形 / Jishokei)
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

  // 9. Kata Sifat -na (形容動詞 / Keiyoudoushi)
  const isExplicitNaAdj =
    jp.includes('[な]') ||
    jp.includes('（な）') ||
    jp.includes('(な)') ||
    reading.includes('(na)') ||
    reading.includes('[na]') ||
    reading.endsWith(' na');

  if (
    isExplicitNaAdj ||
    NA_ADJECTIVES_ENDING_IN_I.has(cleanJp) ||
    NA_ADJECTIVES_ENDING_IN_I.has(cleanFuri) ||
    KNOWN_NA_ADJECTIVES.has(cleanJp) ||
    KNOWN_NA_ADJECTIVES.has(cleanFuri)
  ) {
    return createAdjNaInfo();
  }

  // 10. KATA BENDA SPESIFIK & NOMINA TERVERIFIKASI
  // Pastikan nomina seperti 白菜/はくさい/sawi, 野菜/やさい, 姉妹, 海外, 関係, 大会, ガス台, 間違い, におい
  // SELALU diklasifikasikan sebagai KATA BENDA dan tidak pernah salah menjadi kata sifat!
  if (
    KNOWN_NOUN_WORDS.has(cleanJp) ||
    KNOWN_NOUN_WORDS.has(jp) ||
    KNOWN_NOUN_WORDS.has(cleanReading) ||
    KNOWN_NOUN_WORDS.has(reading)
  ) {
    return createNounInfo();
  }

  // Jika kata majemuk dengan tanda pemisah (misal: トイレ / お手洗い)
  if (cleanJp.includes('/') || cleanJp.includes('・') || cleanJp.includes('、')) {
    const tokens = cleanJp.split(/[\/・、]/).map((t) => t.trim());
    if (tokens.some((t) => KNOWN_NOUN_WORDS.has(t))) {
      return createNounInfo();
    }
  }

  // Kata serapan Katakana murni (seperti クラス, グラス, バス, ホテル, ジュース)
  const isPureKatakana = /^[\u30A0-\u30FF\u30FC\s・]+$/.test(cleanJp);
  if (isPureKatakana && !cleanJp.endsWith('する') && !cleanReading.endsWith('suru')) {
    return createNounInfo();
  }

  // Subkategori KATA BENDA eksplisit
  if (NOUN_SUBCATEGORIES.has(subCat)) {
    return createNounInfo();
  }

  // 11. Kata Sifat -i (い形容詞 / Keiyoushi)
  // Syarat mutlak:
  // 1) TIDAK BOLEH berakhiran huruf Kanji (seperti 白菜, 海外, 姉妹, 関係, 拝啓, 具合, 賛成, 大会) karena kata sifat-i wajib memiliki okurigana hiragana い di akhir.
  // 2) Terdaftar di KNOWN_I_ADJECTIVES atau subCategory kata_sifat/adjective.
  const endsInKanji = /[\u4E00-\u9FAF]$/.test(cleanJp);
  if (!endsInKanji) {
    if (
      KNOWN_I_ADJECTIVES.has(cleanJp) ||
      KNOWN_I_ADJECTIVES.has(cleanFuri) ||
      KNOWN_I_ADJECTIVES.has(cleanReading)
    ) {
      return createAdjIInfo();
    }

    if (ADJ_SUBCATEGORIES.has(subCat) && (cleanJp.endsWith('い') || cleanReading.endsWith('i'))) {
      if (!NA_ADJECTIVES_ENDING_IN_I.has(cleanJp) && !KNOWN_NA_ADJECTIVES.has(cleanJp)) {
        return createAdjIInfo();
      }
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
    shortLabel: 'Ungkapan & Salam',
    kanjiLabel: '表現',
    badgeClass: 'bg-pink-50 text-pink-700 border-pink-200/80',
    icon: '💬',
    grammarHint: 'Salam, etika percakapan sehari-hari, atau ungkapan tetap.',
  };
}

function createAdverbInfo(): WordClassification {
  return {
    type: 'adverb',
    label: 'Kata Keterangan (副詞 / Fukushi)',
    shortLabel: 'Kata Keterangan',
    kanjiLabel: '副詞',
    badgeClass: 'bg-cyan-50 text-cyan-700 border-cyan-200/80',
    icon: '✨',
    grammarHint: 'Menjelaskan intensitas, frekuensi, atau cara suatu tindakan.',
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
    grammarHint: 'Menghubungkan dua klausa, kalimat, atau alur penalaran.',
  };
}

function createAdjIInfo(): WordClassification {
  return {
    type: 'adj_i',
    label: 'Kata Sifat -i (い形容詞)',
    shortLabel: 'Kata Sifat -i',
    kanjiLabel: 'い形容詞',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
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
    badgeClass: 'bg-lime-50 text-lime-800 border-lime-300',
    icon: '🏷️',
    grammarHint: 'Membutuhkan ~na saat menerangkan benda (静かな部屋). Negatif: ~dewa arimasen / ja nai.',
  };
}

function createVerb1Info(): WordClassification {
  return {
    type: 'verb_1',
    label: 'Kata Kerja Gol. 1 (五段 / Godan)',
    shortLabel: 'Kata Kerja (Gol. 1)',
    kanjiLabel: '五段動詞',
    badgeClass: 'bg-blue-50 text-blue-700 border-blue-200/80 font-bold',
    icon: '⚡',
    grammarHint: 'Berakhiran vokal i sebelum ~masu (ikimasu, nomimasu). Perubahan te/ta memakai pola i, chi, ri -> tte.',
  };
}

function createVerb2Info(): WordClassification {
  return {
    type: 'verb_2',
    label: 'Kata Kerja Gol. 2 (一段 / Ichidan)',
    shortLabel: 'Kata Kerja (Gol. 2)',
    kanjiLabel: '一段動詞',
    badgeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200/80 font-bold',
    icon: '⚡',
    grammarHint: 'Berakhiran vokal e sebelum ~masu (tabemasu, nemasu) atau verba spesial i-dan (mimasu, okimasu). Cukup buang masu + te/ta.',
  };
}

function createVerb3Info(): WordClassification {
  return {
    type: 'verb_3',
    label: 'Kata Kerja Gol. 3 (不規則 / Fukisoku)',
    shortLabel: 'Kata Kerja (Gol. 3)',
    kanjiLabel: '不規則動詞',
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200/80 font-bold',
    icon: '⚡',
    grammarHint: 'Kata kerja tidak beraturan: Shimasu (suru) dan Kimasu (kuru).',
  };
}
