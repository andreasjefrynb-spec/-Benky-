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
  'いろいろ', '色々', 'iroiro',
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
  '変', 'へん', 'hen',
  '清潔', 'せいけつ', 'seiketsu',
  '不潔', 'ふけつ', 'fuketsu',
  '公平', 'こうへい', 'kouhei',
  '不公平', 'ふこうへい', 'fukouhei',
  '有利', 'ゆうり', 'yuuri',
  '不利', 'ふり', 'furi',
  '深刻', 'しんこく', 'shinkoku',
  '身近', 'みぢか', 'みじか', 'midjika', 'mijika',
  '健全', 'けんぜん', 'kenzen',
  '貴重', 'きちょう', 'kichou',
  '有望', 'ゆうぼう', 'yuubou',
  '気軽', 'きがる', 'kigaru',
  '神経質', 'しんけいしつ', 'shinkeishitsu', 'しんけいしつな', 'shinkeishitsuna',
  '鮮やか', 'あざやか', 'azayaka',
  '見事', 'みごと', 'migoto',
  '粗末', 'そまつ', 'somatsu',
  '駄目', 'だめ', 'dame',
  '結構', 'けっこう', 'kekkou',
  '微妙', 'びみょう', 'bimyou',
  '平ら', 'たいら', 'taira',
  '幸せ', 'しあわせ', 'shiawase',
  '不自然', 'ふしぜん', 'fushizen',
  '自然', 'しぜん', 'shizen',
  'のんき', '呑気', 'nonki',
  '滑らか', 'なめらか', 'nameraka',
  '淑やか', 'しとやか', 'shitoyaka',
  '密か', 'ひそか', 'hisoka',
  '長閑', 'のどか', 'nodoka',
  '優雅', 'ゆうが', 'yuuga',
  '魅力的', 'みりょくてき', 'miryokuteki',
  '基本的', 'きほんてき', 'kihonteki',
  '具体的', 'ぐたいてき', 'gutaiteki',
  '抽象的', 'ちゅうしょうてき', 'chuushouteki',
  '積極的', 'せっきょくてき', 'sekkyokuteki',
  '消極的', 'しょうきょくてき', 'shoukyokuteki',
  '一般的', 'いっぱんてき', 'ippanteki',
  '個人的', 'こじんてき', 'kojinteki',
  '経済的', 'けいざいてき', 'keizaiteki',
  '効果的', 'こうかてき', 'koukateki',
  '対照的', 'たいしょうてき', 'taishouteki',
  '伝統的', 'でんとうてき', 'dentouteki',
  '大丈夫', 'だいじょうぶ', 'daijoubu',
  '大丈夫な', 'daijoubuna',
  '不真面目', 'ふまじめ', 'fumajime',
  '不親切', 'ふしんせつ', 'fushinsetsu',
  '可哀想', 'かわいそう', 'kawaisou',
  '豊富', 'ほうふ', 'houfu',
  '退屈', 'たいくつ', 'taikutsu',
  '丈夫', 'じょうぶ', 'joubu',
  '丈夫な', 'じょうぶな', 'joubuna',
  '変な', 'へんな', 'henna',
  '暇な', 'ひまな', 'himana',
  '真面目な', 'まじめな', 'majimena',
  'いじわる', 'いじわるな', '意地悪', '意地悪な', 'ijiwaru', 'ijiwaruna',
  'いや', 'いやな', '嫌', '嫌な', 'iya', 'iyana',
  'かちき', 'かちきな', '勝ち気', '勝ち気な', 'kachiki', 'kachikina',
  'かっぱつ', 'かっぱつな', '活発', '活発な', 'kappatsu', 'kappatsuna',
  'がんこ', 'がんこな', '頑固', '頑固な', 'ganko', 'gankona',
  'じゅうぶん', 'じゅうぶんな', '十分', '十分な', 'juubun', 'juubunna',
  'せいじつ', 'せいじつな', '誠実', '誠実な', 'seijitsu', 'seijitsuna',
  'てきとう', 'てきとうな', '適当', '適当な', 'tekitou', 'tekitouna',
  'あんな', 'anna', 'こんな', 'konna', 'そんな', 'sonna', 'どんな', 'donna',
]);

// Daftar kata sifat-i populer & terverifikasi (Kanji, Kana, Romaji)
const KNOWN_I_ADJECTIVES = new Set([
  'うまい', '美味い', '旨い', 'umai',
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
  'すごい', '凄い', 'sugoi',
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
  '存じる', 'ぞんじる', 'zonjiru',
  '信じる', 'しんじる', 'shinjiru',
  '感じる', 'かんじる', 'kanjiru',
  '生じる', 'しょうじる', 'shoujiru',
  '通じる', 'つうじる', 'tsuujiru',
  '応じる', 'おうじる', 'oujiru',
  '命じる', 'めいじる', 'meijiru',
  '閉じる', 'とじる', 'tojiru',
  '足りる', 'たりる', 'tariru',
  '降りる', 'おりる', 'oriru',
  '借りる', 'かりる', 'kariru',
  '起きる', 'おきる', 'okiru',
  '落ちる', 'おちる', 'ochiru',
  '浴びる', 'あびる', 'abiru',
  '出来る', 'できる', 'dekiru',
  '試みる', 'こころみる', 'kokoromiru',
  '用いる', 'もちいる', 'mochiiru',
  '伸びる', 'のびる', 'nobiru',
  '錆びる', 'さびる', 'sabiru',
  '満ちる', 'みちる', 'michiru',
]);

// Stem bentuk ~masu khusus yang termasuk Golongan 2 (一段 / Ichidan) meskipun vokal sebelum masu adalah 'i'
const SPECIAL_ICHIDAN_MASU_STEMS = new Set([
  '見ます', 'みます', 'mimasu',
  '起きます', 'おきます', 'okimasu',
  '着ます', // kimasu memakai pakaian (bukan kimasu datang)
  '借ります', 'かります', 'karimasu',
  '降ります', 'おりる', 'orimasu', // orimasu turun kendaraan (bukan furimasu hujan)
  '居ます', 'います', 'imasu',
  '落ちます', 'おちます', 'ochimasu',
  '信じます', 'しんじます', 'shinjimasu',
  '足ります', 'たります', 'tarimasu',
  '浴びます', 'あびます', 'abimasu',
  '出来ます', 'できます', 'dekimasu',
  '生きます', 'いきます', // ikimasu hidup (bukan ikimasu pergi)
  '感じます', 'かんじます', 'kanjimasu',
  '閉じます', 'とじます', 'tojimasu',
  '似ます', 'にます', 'nimasu',
  '煮ます',
  '過ぎます', 'すぎます', 'sugimasu',
  '通じます', 'つうじます', 'tsuujimasu',
  '応じます', 'おうじます', 'oujimasu',
  '命じます', 'めいじます', 'meijimasu',
  '存じます', 'ぞんじます', 'zonjimasu',
  '試みます', 'こころみます', 'kokoromimasu',
  '用います', 'もちいます', 'mochiimasu',
  '伸びます', 'のびます', 'nobimasu',
  '錆びます', 'さびます', 'sabimasu',
  '満ちます', 'みちます', 'michimasu',
  '生じます', 'しょうじます', 'shoujimasu',
  '報じます', 'ほうじます', 'houjimasu',
  '演じます', 'えんじます', 'enjimasu',
  '禁じます', 'きんじます', 'kinjimasu',
  '帯びます', 'おびます', 'obimasu',
  '滅びます', 'ほろびます', 'horobimasu',
  '詫びます', 'わびます', 'wabimasu',
  '恥じます', 'はじます', 'hajimasu',
  '悔います', 'くいます', 'kuimasu',
  '染みます', 'しみます', 'shimimasu',
  '老います', 'おいます', 'oimasu',
  '朽ちます', 'くちます', 'kuchimasu',
]);

// Verba Golongan 1 (五段 / Godan) yang berakhiran -su (〜す / 〜します)
// PENTING: Kata-kata ini berakhiran ~shimasu dalam bentuk sopan, tetapi BUKAN Golongan 3 (Suru)!
// Mereka adalah GOLONGAN 1 murni (五段動詞)!
const KNOWN_GODAN_SU_MASU_STEMS = new Set([
  '話します', 'はなします', 'hanashimasu', '話す', 'はなす', 'hanasu',
  '貸します', 'かします', 'kashimasu', '貸す', 'かす', 'kasu',
  '消します', 'けします', 'keshimasu', '消す', 'けす', 'kesu',
  '出します', 'だします', 'dashimasu', '出す', 'だす', 'dasu',
  '直します', 'なおします', 'naoshimasu', '直す', 'なおす', 'naosu',
  '押します', 'おします', 'oshimasu', '押す', 'おす', 'osu',
  '落とします', 'おとします', 'otoshimasu', '落とす', 'おとす', 'otosu',
  '返します', 'かえします', 'kaeshimasu', '返す', 'かえす', 'kaesu',
  '渡します', 'わたします', 'watashimasu', '渡す', 'わたす', 'watasu',
  '動かします', 'うごかします', 'ugokashimasu', '動かす', 'うごかす', 'ugokasu',
  '暮らします', 'くらします', 'kurashimasu', '暮らす', 'くらす', 'kurasu',
  '沸かします', 'わかします', 'wakashimasu', '沸かす', 'わかす', 'wakasu',
  '下ろします', 'おろします', 'oroshimasu', '下ろす', 'おろす', 'orosu',
  '過ごします', 'すごします', 'sugoshimasu', '過ごす', 'すごす', 'sugosu',
  '生かします', 'いかします', 'ikashimasu', '生かす', 'いかす', 'ikasu',
  '申します', 'もうします', 'moushimasu', '申す', 'もうす', 'mousu',
  '起こします', 'おこします', 'okoshimasu', '起こす', 'おこす', 'okosu',
  '汚します', 'よごします', 'yogoshimasu', '汚す', 'よごす', 'yogosu',
  '探します', 'さがします', 'sagashimasu', '探す', 'さがす', 'sagasu',
  '捜します', '捜す',
  '指します', 'さします', 'sashimasu', '指す', 'さす', 'sasu',
  '刺します', '刺す',
  '思い出します', 'おもいだします', 'omoidashimasu', '思い出す', 'おもいだす', 'omoidasu',
  '燃やします', 'もやします', 'moyashimasu', '燃やす', 'もやす', 'moyasu',
  '冷やします', 'ひやします', 'hiyashimasu', '冷やす', 'ひやす', 'hiyasu',
  '治します', '治す',
  '鳴らします', 'ならします', 'narashimasu', '鳴らす', 'ならす', 'narasu',
  '回します', 'まわします', 'mawashimasu', '回す', 'まわす', 'mawasu',
  '流します', 'ながします', 'nagashimasu', '流す', 'ながす', 'nagasu',
  '残します', 'のこします', 'nokoshimasu', '残す', 'のこす', 'nokosu',
  '外します', 'はずします', 'hazushimasu', '外す', 'はずす', 'hazusu',
  '壊します', 'こわします', 'kowashimasu', '壊す', 'こわす', 'kowasu',
  '倒します', 'たおします', 'taoshimasu', '倒す', 'たおす', 'taosu',
  '晴らします', 'はらします', 'harashimasu', '晴らす', 'はらす', 'harasu',
  '脱がします', 'ぬがします', 'nugashimasu', '脱がす', 'ぬがす', 'nugasu',
  '散らします', 'ちらします', 'chirashimasu', '散らす', 'ちらす', 'chirasu',
  '散らかします', 'ちらかします', 'chirakashimasu', '散らかす', 'ちらかす', 'chirakasu',
  '飛ばします', 'とばします', 'tobashimasu', '飛ばす', 'とばす', 'tobasu',
  '励まします', 'はげまします', 'hagemashimasu', '励ます', 'はげます', 'hagemasu',
  '試します', 'ためします', 'tameshimasu', '試す', 'ためす', 'tamesu',
  '隠します', 'かくします', 'kakushimasu', '隠す', 'かくす', 'kakusu',
  '写します', 'うつします', 'utsushimasu', '写す', 'うつす', 'utsusu',
  '映します', '映す',
  '移します', '移す',
  '許します', 'ゆるします', 'yurushimasu', '許す', 'ゆるす', 'yurusu',
  '足します', 'たします', 'tashimasu', '足す', 'たす', 'tasu',
  '無くします', 'なくします', 'nakushimasu', '無くす', 'なくす', 'nakusu',
  '冷まします', 'さまします', 'samashimasu', '冷ます', 'さます', 'samasu',
  '覚まします', '覚ます',
  '照らします', 'てらします', 'terashimasu', '照らす', 'てらす', 'terasu',
  '濡らします', 'ぬらします', 'nurashimasu', '濡らす', 'ぬらす', 'nurasu',
  '乾かします', 'かわかします', 'kawakashimasu', '乾かす', 'かわかす', 'kawakasu',
  '増やします', 'ふやします', 'fuyashimasu', '増やす', 'ふやす', 'fuyasu',
  '減らします', 'へらします', 'herashimasu', '減らす', 'へらす', 'herasu',
  '表します', 'あらわします', 'arawashimasu', '表す', 'あらわす', 'arawasu',
  '現します', '現す',
  '崩します', 'くずします', 'kuzushimasu', '崩す', 'くずす', 'kuzusu',
  '脅かします', 'おどかします', 'odokashimasu', '脅かす', 'おどかす', 'odokasu',
  '耕します', 'たがやします', 'tagayashimasu', '耕す', 'たがやす', 'tagayasu',
  '尽くします', 'つくします', 'tsukushimasu', '尽くす', 'つくす', 'tsukusu',
  '騙します', 'だまします', 'damashimasu', '騙す', 'だます', 'damasu',
  '果たします', 'はたします', 'hatashimasu', '果たす', 'はたす', 'hatasu',
  '満たします', 'みたします', 'mitashimasu', '満たす', 'みたす', 'mitasu',
  '殺します', 'ころします', 'koroshimasu', '殺す', 'ころす', 'korosu',
  '揺らします', 'ゆらします', 'yurashimasu', '揺らす', 'ゆらす', 'yurasu',
  '下します', 'くだします', 'kudashimasu', '下す', 'くだす', 'kudasu',
  '蒸します', 'むします', 'mushimasu', '蒸す', 'むす', 'musu',
  '干します', 'ほします', 'hoshimasu', '干す', 'ほす', 'hosu',
  'いたします', 'いたす', 'itashimasu', 'itasu',
]);

// Verba majemuk yang berintikan kuru (来る / 来ます) -> Golongan 3 (不規則)
const KNOWN_KURU_COMPOUNDS = new Set([
  '持って来る', '持って来ます', 'もってきます', 'mottekimasu', 'もってくる', 'mottekuru',
  '連れて来る', '連れて来ます', 'つれてきます', 'tsuretekimasu', 'つれてくる', 'tsuretekuru',
  '帰って来る', '帰って来ます', 'かえってきます', 'kaettekimasu', 'かえってくる', 'kaettekuru',
  'やって来る', 'やって来ます', 'やってきます', 'yattekimasu', 'やってくる', 'yattekuru',
  '出て来る', '出て来ます', 'でてきます', 'detekimasu', 'でてくる', 'detekuru',
  '入って来る', '入って来ます', 'はいってきます', 'haittekimasu', 'はいってくる', 'haittekuru',
  '戻って来る', '戻って来ます', 'もどってきます', 'modortekimasu', 'もどってくる',
  '寄って来る', '寄って来ます', 'よってきます', 'yottekimasu', 'よってくる',
  '買って来る', '買って来ます', 'かってきます', 'kattekimasu', 'かってくる',
  '生きて来る', '生きて来ます',
]);

// Akar kata verba Suru (Golongan 3)
const KNOWN_SURU_VERB_ROOTS = new Set([
  '勉強', 'べんきょう', 'benkyou',
  '散歩', 'さんぽ', 'sanpo',
  '掃除', 'そうじ', 'souji',
  '洗濯', 'せんたく', 'sentaku',
  '運転', 'うんてん', 'unten',
  '買い物', 'かいもの', 'kaimono',
  '結婚', 'けっこん', 'kekkon',
  '案内', 'あんない', 'annai',
  '旅行', 'りょこう', 'ryokou',
  '電話', 'でんわ', 'denwa',
  '出張', 'しゅっちょう', 'shucchou',
  '残業', 'ざんぎょう', 'zangyou',
  '修理', 'しゅうり', 'shuuri',
  '食事', 'しょくじ', 'shokuji',
  '予約', 'よやく', 'yoyaku',
  '説明', 'せつめい', 'setsumei',
  '紹介', 'しょうかい', 'shoukai',
  '質問', 'しつもん', 'shitsumon',
  '連絡', 'れんらく', 'renraku',
  '相談', 'そうだん', 'soudan',
  '約束', 'やくそく', 'yakusoku',
  '注意', 'ちゅうい', 'chuui',
  '集合', 'しゅうごう', 'shuugou',
  '出発', 'しゅっぱつ', 'shuppatsu',
  '到着', 'とうちゃく', 'touchaku',
  '輸入', 'ゆにゅう', 'yunyuu',
  '輸出', 'ゆしゅつ', 'yushutsu',
  '翻訳', 'ほんやく', 'honyaku',
  '通訳', 'つうやく', 'tsuuyaku',
  '発見', 'はっけん', 'hakken',
  '発明', 'はつめい', 'hatsumei',
  '設計', 'せっけい', 'sekkei',
  '入院', 'にゅういん', 'nyuuin',
  '退院', 'たいいん', 'taiin',
  '整理', 'せいり', 'seiri',
  '計算', 'けいさん', 'keisan',
  '参加', 'さんか', 'sanka',
  '出席', 'しゅっせき', 'shusseki',
  '欠席', 'けっせき', 'kesseki',
  '成功', 'せいこう', 'seikou',
  '失敗', 'しっぱい', 'shippai',
  '合格', 'ごうかく', 'goukaku',
  '遠慮', 'えんりょ', 'enryo',
  '我慢', 'がまん', 'gaman',
  '運動', 'うんどう', 'undou',
  '生活', 'せいかつ', 'seikatsu',
  '調査', 'ちょうさ', 'chousa',
  '研究', 'けんきゅう', 'kenkyuu',
  '実験', 'じっけん', 'jikken',
  '見学', 'けんがく', 'kengaku',
  '練習', 'れんしゅう', 'renshuu',
  '復習', 'ふくしゅう', 'fukushuu',
  '予習', 'よしゅう', 'yoshuu',
  '安心', 'あんしん', 'anshin',
  '心配', 'しんぱい', 'shinpai',
  '婚約', 'こんやく', 'konyaku',
  '離婚', 'りこん', 'rikon',
  '調整', 'ちょうせい', 'chousei',
  '調節', 'ちょうせつ', 'chousetsu',
  '確認', 'かくにん', 'kakunin',
  '準備', 'じゅんび', 'junbi',
  '用意', 'ようい', 'youi',
  '優勝', 'ゆうしょう', 'yuushou',
  '化粧', 'けしょう', 'keshou',
  '拝見', 'はいけん', 'haiken',
  '緊張', 'きんちょう', 'kinchou',
  '放送', 'ほうそう', 'housou',
  '協力', 'きょうりょく', 'kyouryoku',
  '感謝', 'かんしゃ', 'kansha',
  '利用', 'りよう', 'riyou',
  '長生き', 'ながいき', 'nagaiki',
  '苦労', 'くろう', 'kurou',
  '無理', 'むり', 'muri',
  '世話', 'せわ', 'sewa',
  '代わり', 'かわり', 'kawari',
  '競走', 'きょうそう', 'kyousou',
  'お祝い', 'おいわい', 'oiwai',
  '贈り物', 'おくりもの', 'okurimono',
  'びっくり', 'bikkuri',
  'がっかり', 'gakkari',
  'けんか', 'kenka',
  'うわさ', 'uwasa',
  'ほっと', 'hotto',
  'すっきり', 'sukkiri',
  'うっかり', 'ukkari',
  'わくわく', 'wakuwaku',
  'ドキドキ', 'dokidoki',
  'いらいら', 'iraira',
  'うっとり', 'uttori',
  'さかだち', 'sakadachi',
  'ごちそう', 'gochisou',
  'コピー', 'kopii',
  'キャンセル', 'kyanseru',
  'セット', 'setto',
  'マーク', 'maaku',
  'チェック', 'chekku',
  'テスト', 'tesuto',
  'スタート', 'sutaato',
  'クリック', 'kurikku',
  'ダウンロード', 'daunroodo',
  'メール', 'meeru',
  'チャット', 'chatto',
  'ダンス', 'dansu',
  'ゴルフ', 'gorufu',
  'サイン', 'sain',
  'デザイン', 'dezain',
  'リサイクル', 'risaikuru',
  '交換', 'こうかん', 'koukan',
  '交代', 'こうたい', 'koutai',
  '変更', 'へんこう', 'henkou',
  '移動', 'いどう', 'idou',
  '中止', 'ちゅうし', 'chuushi',
  '開発', 'かいはつ', 'kaihatsu',
  '契約', 'けいやく', 'keiyaku',
  '通学', 'つうがく', 'tsuugaku',
  '通勤', 'つうきん', 'tsuukin',
  '訪問', 'ほうもん', 'houmon',
  '留学', 'りゅうがく', 'ryuugaku',
  '就職', 'しゅうしょく', 'shuushoku',
  '卒業', 'そつぎょう', 'sotsugyou',
  '進学', 'しんがく', 'shingaku',
  '引越し', 'ひっこし', 'hikkoshi',
  '乾杯', 'かんぱい', 'kanpai',
]);

// Kata keterangan umum (副詞 / Fukushi)
const KNOWN_ADVERBS = new Set([
  'だんだん', 'dandan',
  'どんどん', 'dondon',
  'ますます', 'masumasu',
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
  'はじめに', '初めに', 'hajimeni',
  'さいごに', '最後に', 'saigoni',
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
  '急に', 'きゅうに', 'kyuuni', 'kyuu ni',
  '一度も', 'いちども', 'ichidomo', 'ichido mo',
  'とうとう', 'toutou',
  'やっと', 'yatto',
  'ついに', 'tsuini',
  'かなり', 'kanari',
  'ずっと', 'zutto',
  'もっと', 'motto',
  '必ず', 'かならず', 'kanarazu',
  '絶対に', 'ぜったいに', 'zettai ni', 'zettaini',
  'ぴったり', 'pittari',
  'しっかり', 'shikkari',
  'すっきり', 'sukkiri',
  'うっかり', 'ukkari',
  'がっかり', 'gakkari',
  'びっくり', 'bikkuri',
  'いよいよ', 'iyoiyo',
  'しばしば', 'shibashiba',
  'たびたび', 'tabitabi',
  'たまたま', 'tamatama',
  'ほとんど', 'hotondo',
  '全く', 'まったく', 'mattaku',
  'やはり', 'やっぱり', 'yahari', 'yappari',
  '早速', 'さっそく', 'sassoku',
  '突然', 'とつぜん', 'totsuzen',
  'さっき', 'sakki',
  '今にも', 'いまにも', 'imanimo',
  '間もなく', 'まもなく', 'mamonaku',
  'もうすぐ', 'mousugu',
  '普段', 'ふだん', 'fudan',
  '普通', 'ふつう', 'futsuu',
  '決して', 'けっして', 'kesshite',
  'どうぞ', 'douzo',
  'どうか', 'douka',
  'どうも', 'doumo',
  'なぜ', 'naze',
  'どうして', 'doushite',
  'なんで', 'nande',
  'いかが', 'ikaga',
  'どう', 'dou',
  'いくら', 'ikura',
  'いくつ', 'ikutsu',
  'どのくらい', 'どれくらい', 'donokurai', 'dorekurai',
  'いっしょうけんめい', '一生懸命', 'isshoukenmei',
  'きちんと', 'kichinto',
  'たいてい', '大抵', 'taitei',
  'もちろん', '勿論', 'mochiron',
  'このくらい', 'konokurai',
  'じゆうに', '自由に', 'jiyuuni',
  'じょうずに', '上手に', 'jouzuni',
  'へたに', '下手に', 'hetani',
  'たのしく', '楽しく', 'tanoshiku',
  'みじかく', '短く', 'mijikaku',
  'ちょっとも', 'chottomo',
  'ちっとも', 'chittomo',
  'どうやって', 'douyatte',
  'ぐっすり', 'gussuri',
  'ぎりぎり', 'girigiri',
  'ぺこぺこ', 'pekopeko',
  'ぐうぐう', 'guuguu',
  'やがて', 'yagate',
  'もし', 'moshi',
  'たとえば', '例えば', 'tatoeba',
  '恐らく', 'おそらく', 'osoraku',
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
  'そうですね', 'soudesune',
  'そうですか', 'soudesuka',
  'しつれいですが', '失礼ですが', 'shitsureidesuga',
  'おでかけですか', 'お出かけですか', 'odekakedesuka',
  'ごくろうさまです', 'ご苦労様です', 'gokurousamadesu',
  'ひさしぶりですね', '久しぶりですね', 'hisashiburidesune',
  'いいえ、まだまだです', 'iie, madamadadesu',
  'いじょうです', '以上です', 'ijoudesu',
  'おなかがいっぱいです', 'onakagaippaidesu',
  'おめでとうございます', 'omedetougozaimasu',
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
  'ごみ', 'ゴミ', 'gomi', '塵', // Sampah (KATA BENDA!)
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

  // Kata Serapan Katakana / Nomina Populer yang Berakhiran ~masu / ~su
  'クリスマス', 'くりすます', 'kurisumasu', 'Natal', 'natal',
  'クリスマスイブ', 'kurisumasuibu',
  'パジャマ', 'pajama',
  'トーマス', 'toomasu',
  'ガスマスク', 'gasumasuku',
  'ビジネスマナー', 'bijinesumanaa',
  'マス', 'masu',
  'テニス', 'tenisu',
  'バス', 'basu',
  'ガラス', 'garasu',
  'クラス', 'kurasu',
  'ストレス', 'sutoresu',
  'ボーナス', 'boonasu',

  // Nomina / Kanji Waktu & Alam yang Sering Menjadi Homofon Verba (Fuku, Yoru, Oku, Haru, Aki, dll)
  '夜', 'よる', 'yoru',
  '昼', 'ひる', 'hiru',
  '朝', 'あさ', 'asa',
  '億', 'おく', 'oku',
  '春', 'はる', 'haru',
  '夏', 'なつ', 'natsu',
  '秋', 'あき', 'aki',
  '冬', 'ふゆ', 'fuyu',
  '絵', 'え', 'e',
  '花', 'はな', 'hana',
  '川', 'かわ', 'kawa',
  '草', 'くさ', 'kusa',
  '海', 'うみ', 'umi',
  '山', 'やま', 'yama',
  '雨', 'あめ', 'ame',
  '雪', 'ゆき', 'yuki',
]);

// Populasikan nomina dari vocab1000 secara otomatis (hanya yang bukan kata kerja/kata sifat)
vocab1000
  .filter(
    (v) =>
      v.subCategory !== 'kata_kerja' &&
      v.subCategory !== 'kata_sifat' &&
      v.subCategory !== 'keterangan_fukushi' &&
      v.subCategory !== 'salam' &&
      !/(直す|乗る|進める|する|ます|ました)$/.test(v.japanese || '') &&
      !/^(me[mnlrng]?[a-z]+|ber[a-z]+)\b/i.test((v.meaningId || '').toLowerCase())
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
  const isQuestionCounter =
    cleanJp.startsWith('何') &&
    /^(何時|何分|何秒|何日|何月|何年|何人|何枚|何台|何冊|何本|何個|何回|何階|何歳|何才|何匹|何杯|何度|何番|何号|何軒|何機|何件|何足|何着|何通|何曲)$/.test(cleanJp);

  const isCounterPattern =
    /[〜～~]([つ枚本台冊着足杯匹頭個人員階回度番号目軒艘機件通曲歳才時分秒日週月年月円ドルキロ点泊割%％]|人|週間|か月|年|メートル|グラム|パーセント)$/.test(cleanJp) &&
    !cleanJp.includes('さん') &&
    !cleanJp.includes('ちゃん') &&
    !cleanJp.includes('くん') &&
    !cleanJp.includes('様') &&
    !cleanJp.includes('先生') &&
    !cleanJp.includes('から') &&
    !cleanJp.includes('まで') &&
    !cleanJp.includes('語') &&
    !cleanJp.includes('ご') &&
    !cleanJp.includes('人'); // hindari 〜人 (kewarganegaraan)

  const isCounterByMeaning =
    (/satuan (penghitung|bilangan|waktu|orang|barang|lembar|buah|unit)/i.test(meaning) ||
      /\b(lembar|batang|ekor|jilid|pasang|lantai|mangkuk|gelas|butir|tiket)\b/i.test(meaning)) &&
    (cleanJp.startsWith('～') || cleanJp.startsWith('〜') || cleanReading.startsWith('~') || cleanJp.startsWith('何'));

  if (isQuestionCounter || isCounterPattern || isCounterByMeaning) {
    return createCounterNounInfo();
  }

  // 3. Ungkapan, Salam, Kalimat & Frasa Percakapan (挨拶・表現 / Aisatsu・Hyougen)
  const isAdverbWord =
    subCat === 'keterangan_fukushi' ||
    subCat.includes('fukushi') ||
    notes.includes('fukushi') ||
    KNOWN_ADVERBS.has(cleanJp) ||
    KNOWN_ADVERBS.has(cleanFuri) ||
    KNOWN_ADVERBS.has(cleanReading) ||
    cleanJp === 'はやく' ||
    cleanJp === '早く' ||
    cleanJp === '速く' ||
    cleanReading === 'hayaku';

  if (isAdverbWord) {
    return createAdverbInfo();
  }

  // 4. Kata Sambung (接続詞 / Setsuzokushi)
  if (
    KNOWN_CONJUNCTIONS.has(cleanJp) ||
    KNOWN_CONJUNCTIONS.has(cleanFuri) ||
    subCat.includes('sambung') ||
    notes.includes('setsuzoku')
  ) {
    return createConjunctionInfo();
  }

  const isSentenceOrPhrase =
    cleanJp.includes('。') ||
    cleanJp.includes('？') ||
    cleanJp.endsWith('!') ||
    cleanJp.includes('！') ||
    cleanJp.includes('／') ||
    (/\s+/.test(cleanJp) && cleanJp.length > 7 && !cleanJp.includes('/')) ||
    (/[がをにへとはで]/.test(cleanJp) && cleanJp.length > 8 && !cleanJp.endsWith('ます') && !cleanJp.endsWith('する') && !cleanJp.endsWith('です')) ||
    cleanJp.includes('ていますか') ||
    cleanJp.includes('てはいけません') ||
    cleanJp.includes('なければなりません') ||
    cleanJp.includes('なくてもいいです') ||
    cleanJp.includes('たことがあります') ||
    cleanJp.includes('ほうがいいです') ||
    cleanJp.includes('かもしれません') ||
    cleanJp.includes('でしょう') ||
    cleanJp.includes('ですね') ||
    (cleanJp.endsWith('ね') && cleanJp.length > 5) ||
    KNOWN_EXPRESSIONS.has(cleanJp) ||
    KNOWN_EXPRESSIONS.has(cleanReading) ||
    item.category === 'phrases' ||
    item.category === 'irodori' ||
    subCat === 'salam' ||
    subCat === 'perkenalan' ||
    subCat.includes('ungkapan') ||
    meaning.includes('selamat pagi') ||
    meaning.includes('selamat siang') ||
    meaning.includes('selamat malam') ||
    meaning.includes('selamat jalan') ||
    meaning.includes('terima kasih') ||
    meaning.includes('sama-sama') ||
    meaning.includes('bersulang') ||
    meaning.includes('apa kabar') ||
    meaning.includes('permisi duluan') ||
    meaning.includes('selamat datang') ||
    meaning.includes('maaf lain kali') ||
    cleanJp === 'いいですよ' ||
    cleanJp === 'かしてください' ||
    cleanJp === '貸してください' ||
    cleanJp.startsWith('～ちょっと') ||
    cleanJp === 'どうなさいますか' ||
    cleanJp === 'どういうふうになさいますか' ||
    cleanJp === 'おげんきでいらっしゃいますか';

  if (isSentenceOrPhrase) {
    return createPhraseInfo();
  }

  // 6. DETEKSI KATA KERJA (動詞 / Doushi)
  // Menangani bentuk ~masu, ~mashita, ~masen, ~te imasu, dan bentuk kamus secara presisi
  const isKatakanaPure = /^[\u30A0-\u30FF\u30FC\s・]+$/.test(cleanJp);
  const isKatakanaNoun =
    isKatakanaPure &&
    !cleanJp.endsWith('する') &&
    !cleanReading.endsWith('suru') &&
    !cleanJp.endsWith('ます') &&
    !cleanReading.endsWith('masu');

  const isMasuVerb =
    !isKatakanaNoun &&
    (cleanJp.endsWith('ます') ||
      cleanJp.endsWith('ました') ||
      cleanJp.endsWith('ません') ||
      cleanJp.endsWith('ませんでした') ||
      cleanJp.endsWith('ています') ||
      cleanJp.endsWith('てあります') ||
      cleanJp.endsWith('ておきます') ||
      cleanJp.endsWith('てしまいます') ||
      cleanJp.endsWith('てみます') ||
      cleanJp.endsWith('てくだ') ||
      (cleanReading.endsWith('masu') && !cleanJp.endsWith('マス')));

  const isVerbSub = VERB_SUBCATEGORIES.has(subCat);

  const isIndoVerbMeaning =
    (/^(me[mnlrng]?[a-z]+|ber[a-z]+|makan|minum|tidur|bangun|pulang|pergi|datang|jatuh|masuk|keluar|naik|turun|belajar|bekerja|istirahat|ingat|lupa|tahu|mengerti|paham|ikut|bantu|pakai|bawa|buat|beli|jual|ambil|taruh|simpan|buang|potong|tulis|baca|dengar|lihat|tonton|jalan|lari|renang|duduk|berdiri|kirim|terima|pukul|dorong|tarik|buka|tutup|nyala|padam|pinjam|bayar|tukar|sewa|harap|pilih|cuci|masak)\b/i.test(meaning) &&
      !/^(meja|merah|menit|makanan|minuman|beras|media|merek|mewah|medali|melon|meriam|merica|merpati|mentega|metode|mesin|member|menu|memo|mesjid|masjid|mental|berita)\b/i.test(meaning)) ||
    meaning.includes('berolahraga') ||
    meaning.includes('menumis') ||
    meaning.includes('mengaduk') ||
    meaning.includes('mencincang') ||
    meaning.includes('merawat') ||
    meaning.includes('mengurus') ||
    meaning.includes('menghitung') ||
    meaning.includes('bersabar') ||
    meaning.includes('mengalami kesulitan') ||
    meaning.includes('melakukan');

  const isDictEnding =
    /[うくぐすつぬぶむる]$/.test(cleanJp) ||
    /[ukgstnbmr]u$/.test(cleanReading) ||
    cleanJp.endsWith('する') ||
    cleanReading.endsWith('suru') ||
    cleanJp.endsWith('くる') ||
    cleanReading.endsWith('kuru');

  const isCuratedVerb =
    KNOWN_CURATED_VERBS.has(cleanJp) ||
    KNOWN_CURATED_VERBS.has(cleanReading) ||
    TRAP_GODAN_VERBS.has(cleanJp) ||
    KNOWN_ICHIDAN_VERBS.has(cleanJp) ||
    KNOWN_GODAN_SU_MASU_STEMS.has(cleanJp);

  const isHomophoneNoun =
    (cleanJp === '夕食' || cleanJp === '昼食' || cleanJp === '朝食') ||
    ((cleanJp === 'はる' || cleanReading === 'haru') && (meaning.includes('semi') || meaning.includes('musim')));

  const isVerb =
    !isKatakanaNoun &&
    !isHomophoneNoun &&
    (isMasuVerb ||
      isVerbSub ||
      isCuratedVerb ||
      cleanJp.endsWith('する') ||
      cleanReading.endsWith('suru') ||
      cleanJp === 'くる' ||
      cleanJp === '来る' ||
      cleanReading === 'kuru' ||
      (isDictEnding && isIndoVerbMeaning && (!KNOWN_NOUN_WORDS.has(cleanJp) || (cleanJp === 'はる' && (meaning.includes('nempel') || meaning.includes('tempel') || meaning.includes('lekat'))))));

  if (isVerb) {
    // ----------------------------------------------------
    // GOLONGAN 3: 不規則 (Fukisoku - Kuru / Suru)
    // ----------------------------------------------------
    // A) Verba Kuru (来る / 来ます) dan verba majemuk kuru (持って来る, 連れて来る, 帰って来る, dll.)
    const isCompoundKuru =
      KNOWN_KURU_COMPOUNDS.has(cleanJp) ||
      KNOWN_KURU_COMPOUNDS.has(cleanReading) ||
      /(もって|つれて|かえって|やって|でて|はいって|もどって|よって|かって|生きて)(きます|来る|くる)$/.test(cleanJp) ||
      cleanJp.endsWith('て来ます') ||
      cleanJp.endsWith('てきます') && (meaning.includes('datang') || meaning.includes('kembali') || meaning.includes('balik')) ||
      cleanJp.endsWith('て来る') ||
      cleanJp.endsWith('てくる');

    const isSingleKuru =
      cleanJp === '来ます' ||
      cleanJp === '来る' ||
      (cleanJp === 'きます' && (meaning.includes('datang') || (!meaning.includes('baju') && !meaning.includes('pakaian')))) ||
      (cleanJp === 'くる' && (meaning.includes('datang') || (!meaning.includes('baju') && !meaning.includes('pakaian'))));

    if (isCompoundKuru || isSingleKuru) {
      return createVerb3Info();
    }

    // B) Verba Suru (する / します) dan verba majemuk suru (勉強します, 散歩します, コピーします, dll.)
    const stemBeforeShimasu = cleanJp.replace(/(します|しました|しません|しませんでした|する)$/, '').trim();
    const stemBeforeSuruReading = cleanReading.replace(/(shimasu|shimashita|shimasen|suru)$/, '').trim();

    const isTrueSuruVerb =
      cleanJp === 'する' ||
      cleanJp === 'します' ||
      cleanJp === '為る' ||
      cleanReading === 'suru' ||
      cleanReading === 'shimasu' ||
      cleanJp.endsWith('する') ||
      cleanReading.endsWith('suru') ||
      KNOWN_SURU_VERB_ROOTS.has(stemBeforeShimasu) ||
      KNOWN_SURU_VERB_ROOTS.has(stemBeforeSuruReading) ||
      /^[ァ-ヴー]+(します|する)$/.test(cleanJp) || // Katakana + shimasu (コピーします, キャンセルします)
      (/[\u4E00-\u9FAF]{2,}(します|する)$/.test(cleanJp) && !KNOWN_GODAN_SU_MASU_STEMS.has(cleanJp)) || // 2+ Kanji + shimasu (bukan godan)
      meaning.includes('berbau') ||
      meaning.includes('berasa') ||
      meaning.includes('berbunyi');

    if (isTrueSuruVerb && !KNOWN_GODAN_SU_MASU_STEMS.has(cleanJp)) {
      return createVerb3Info();
    }

    // ----------------------------------------------------
    // GOLONGAN 1 (Godan) KHUSUS BERAKHIRAN -SU (〜す / 〜します)
    // ----------------------------------------------------
    // Verba seperti 話します, 出します, 貸します, 消します, 直します, 押します, 落とします, 返します
    // SELALU GOLONGAN 1 (五段 / Godan)!
    if (
      KNOWN_GODAN_SU_MASU_STEMS.has(cleanJp) ||
      KNOWN_GODAN_SU_MASU_STEMS.has(cleanFuri) ||
      KNOWN_GODAN_SU_MASU_STEMS.has(cleanReading) ||
      cleanJp.endsWith('します') && !isTrueSuruVerb ||
      (cleanJp.endsWith('す') && !cleanJp.endsWith('です') && !cleanJp.endsWith('ます') && !cleanJp.endsWith('する'))
    ) {
      return createVerb1Info();
    }

    // C) 行きます (ikimasu) / 行く (iku) SELALU Golongan 1 (五段 / Godan)
    if (
      cleanJp.includes('行き') ||
      cleanJp === '行く' ||
      cleanJp.endsWith('て行く') ||
      cleanJp.endsWith('て行きます') ||
      (cleanJp === 'いきます' && meaning.includes('pergi'))
    ) {
      return createVerb1Info();
    }

    // ----------------------------------------------------
    // GOLONGAN 2: ICHIDAN (一段動詞)
    // ----------------------------------------------------
    // 1) Bunyi vokal 'e' sebelum masu/mashita/masen (tabemasu, nemasu, oshiemasu, yamemasu, kakemasu, toremasu, kiremasu, dll.)
    const isESoundBeforeMasu =
      /[えけせてねへめれげぜでべぺ](ます|ました|ません|ませんでした)$/.test(cleanJp || cleanFuri) ||
      /[ekstnhmrgzdbp]e(masu|mashita|masen|masendeshita)$/.test(cleanReading);

    if (isESoundBeforeMasu) {
      return createVerb2Info();
    }

    // 2) Verba spesial i-dan yang merupakan Golongan 2 (Ichidan):
    // Misal: mimasu, okimasu (bangun), karimasu (pinjam), orimasu (turun), imasu (ada), ochimasu (jatuh), shinjimasu, tarimasu, abimasu, dekimasu, zonjimasu, dll.
    const isSpecialIchidanMasu =
      SPECIAL_ICHIDAN_MASU_STEMS.has(cleanJp) ||
      SPECIAL_ICHIDAN_MASU_STEMS.has(cleanFuri) ||
      (cleanJp.endsWith('おちます') || cleanJp.endsWith('落ちます')) ||
      (cleanJp.endsWith('かります') || cleanJp.endsWith('借ります')) ||
      (cleanJp.endsWith('おります') || cleanJp.endsWith('降ります')) && (meaning.includes('turun') || !meaning.includes('hujan')) ||
      (cleanJp.endsWith('おきます') || cleanJp.endsWith('起きます')) && (meaning.includes('bangun') || !meaning.includes('letak') && !meaning.includes('taruh')) ||
      (cleanJp === '着ます' || (cleanJp === 'きます' && (meaning.includes('baju') || meaning.includes('pakaian'))));

    if (isSpecialIchidanMasu) {
      return createVerb2Info();
    }

    // 3) Bentuk kamus Ichidan (KNOWN_ICHIDAN_VERBS atau berakhiran -iru/-eru murni)
    if (KNOWN_ICHIDAN_VERBS.has(cleanJp) || KNOWN_ICHIDAN_VERBS.has(cleanFuri)) {
      return createVerb2Info();
    }

    // Hati-hati jebakan Godan (-iru/-eru yang sebenarnya Golongan 1)
    if (TRAP_GODAN_VERBS.has(cleanJp) || TRAP_GODAN_VERBS.has(cleanFuri) || TRAP_GODAN_VERBS.has(cleanReading)) {
      return createVerb1Info();
    }

    if (cleanJp.endsWith('る') || cleanReading.endsWith('ru')) {
      const isIruEru =
        /[ie]ru$/.test(cleanReading) ||
        /[いきしちにひみりえけせてねへめれ]る$/.test(cleanFuri || cleanJp);
      if (isIruEru) {
        return createVerb2Info();
      }
    }

    // ----------------------------------------------------
    // GOLONGAN 1: GODAN (五段動詞)
    // ----------------------------------------------------
    // Semua verba berakhiran vokal i sebelum masu (nomimasu, kakimasu, yomimasu, aimasu, kaimasu, machimasu, hatarakimasu, oyogimasu, wakarimasu, dll.)
    // Serta verba kamus berakhiran u, ku, gu, su, tsu, nu, bu, mu, ru
    return createVerb1Info();
  }

  // 7. Cek Petunjuk Eksplisit dari Notes / Mnemonic
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

  // 8. Kata Sifat -na (形容動詞 / Keiyoudoushi)
  const isExplicitNaAdj =
    jp.includes('[な]') ||
    jp.includes('（な）') ||
    jp.includes('(な)') ||
    reading.includes('(na)') ||
    reading.includes('[na]') ||
    reading.endsWith(' na') ||
    notes.includes('[na]') ||
    notes.includes('kata sifat na') ||
    notes.includes('na-adj') ||
    meaning.includes('[na]') ||
    meaning.includes('(na)');

  const stemJp = cleanJp.replace(/(ですね|でした|です|だ|な|よ|ね|ですか|ですが)$/, '').trim();
  const stemFuri = cleanFuri.replace(/(ですね|でした|です|だ|な|よ|ね|ですか|ですが)$/, '').trim();
  const stemReading = cleanReading.replace(/(desune|deshita|desuka|desuga|desu|da|na|yo|ne)$/, '').trim();

  const isNaAdj =
    isExplicitNaAdj ||
    cleanJp.endsWith('的') ||
    cleanReading.endsWith('teki') ||
    NA_ADJECTIVES_ENDING_IN_I.has(cleanJp) ||
    NA_ADJECTIVES_ENDING_IN_I.has(cleanFuri) ||
    NA_ADJECTIVES_ENDING_IN_I.has(cleanReading) ||
    KNOWN_NA_ADJECTIVES.has(cleanJp) ||
    KNOWN_NA_ADJECTIVES.has(cleanFuri) ||
    KNOWN_NA_ADJECTIVES.has(cleanReading) ||
    (stemJp.length >= 2 && (KNOWN_NA_ADJECTIVES.has(stemJp) || NA_ADJECTIVES_ENDING_IN_I.has(stemJp))) ||
    (stemFuri.length >= 2 && (KNOWN_NA_ADJECTIVES.has(stemFuri) || NA_ADJECTIVES_ENDING_IN_I.has(stemFuri))) ||
    (stemReading.length >= 2 && (KNOWN_NA_ADJECTIVES.has(stemReading) || NA_ADJECTIVES_ENDING_IN_I.has(stemReading))) ||
    ((cleanJp.endsWith('な') || cleanReading.endsWith('na')) &&
      !cleanJp.endsWith('魚') && !cleanJp.endsWith('棚') && !cleanJp.endsWith('ana') &&
      (cleanJp.length >= 3 && !KNOWN_NOUN_WORDS.has(cleanJp)));

  if (isNaAdj) {
    return createAdjNaInfo();
  }

  // 9. Kata Sifat -i (い形容詞 / Keiyoushi)
  // Syarat mutlak:
  // 1) TIDAK BOLEH berakhiran huruf Kanji (seperti 白菜, 海外, 姉妹, 関係, 拝啓, 具合, 賛成, 大会) karena kata sifat-i wajib memiliki okurigana hiragana い di akhir.
  // 2) Terdaftar di KNOWN_I_ADJECTIVES atau subCategory kata_sifat/adjective atau berakhiran -i dengan makna deskriptif kata sifat.
  const endsInKanji = /[\u4E00-\u9FAF]$/.test(cleanJp);
  if (!endsInKanji) {
    if (
      KNOWN_I_ADJECTIVES.has(cleanJp) ||
      KNOWN_I_ADJECTIVES.has(cleanFuri) ||
      KNOWN_I_ADJECTIVES.has(cleanReading) ||
      (stemJp.length >= 1 && KNOWN_I_ADJECTIVES.has(stemJp)) ||
      (stemFuri.length >= 1 && KNOWN_I_ADJECTIVES.has(stemFuri)) ||
      (stemReading.length >= 1 && KNOWN_I_ADJECTIVES.has(stemReading))
    ) {
      return createAdjIInfo();
    }

    const isIndoAdjMeaning =
      /^(yang |sangat |sulit|mudah|panas|dingin|terang|gelap|manis|pahit|asin|asam|pedas|berat|ringan|luas|sempit|tebal|tipis|pendek|panjang|tinggi|rendah|jauh|dekat|cepat|lambat|bahaya|aman|kuat|lemah|ramai|sepi|enak|lezat|lucu|menarik|bosan|sedih|gembira|senang|susah|capek|lelah|tajam|tumpul|dalam|dangkal)/i.test(meaning);

    if (
      (cleanJp.endsWith('い') || cleanReading.endsWith('i')) &&
      !cleanJp.endsWith('台') && !cleanJp.endsWith('会') && !cleanJp.endsWith('菜') && !cleanJp.endsWith('線') &&
      !NA_ADJECTIVES_ENDING_IN_I.has(cleanJp) && !KNOWN_NA_ADJECTIVES.has(cleanJp) &&
      !KNOWN_NOUN_WORDS.has(cleanJp) &&
      (ADJ_SUBCATEGORIES.has(subCat) || subCat === 'kata_sifat' || isIndoAdjMeaning)
    ) {
      return createAdjIInfo();
    }
  }

  // 10. KATA BENDA SPESIFIK & NOMINA TERVERIFIKASI
  // Pastikan nomina seperti 白菜/はくさい/sawi, 野菜/やさい, 姉妹, 海外, 関係, 大会, ガス台, 間違い, におい, ごみ (sampah)
  // SELALU diklasifikasikan sebagai KATA BENDA!
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
  if (isKatakanaPure && !cleanJp.endsWith('する') && !cleanReading.endsWith('suru')) {
    return createNounInfo();
  }

  // Subkategori KATA BENDA eksplisit
  if (NOUN_SUBCATEGORIES.has(subCat)) {
    return createNounInfo();
  }

  // 11. Default Final yang Aman: KATA BENDA (名詞 / Meishi)
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
