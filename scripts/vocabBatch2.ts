import { RawVocab } from './buildVocab';

export const batch2List: RawVocab[] = [];

function add(kanji: string, reading: string, furigana: string, meaningId: string, exampleJp: string, exampleId: string, level: 'N5' | 'N4', subCategory: string) {
  batch2List.push({ kanji, reading, furigana, meaningId, exampleJp, exampleId, level, subCategory });
}

// 1. TAMBAHAN ANGKA & SATUAN HITUNG (COUNTERS)
const counterData: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["一つ", "hitotsu", "ひとつ", "Satu buah (umum)", "りんごを一つください。", "Minta apel satu buah.", "N5"],
  ["二つ", "futatsu", "ふたつ", "Dua buah (umum)", "みかんを二つ買いました。", "Beli dua buah jeruk.", "N5"],
  ["三つ", "mittsu", "みっつ", "Tiga buah (umum)", "三つ選んでください。", "Silakan pilih tiga buah.", "N5"],
  ["四つ", "yottsu", "よっつ", "Empat buah (umum)", "四つ並べてあります。", "Berjejer empat buah.", "N5"],
  ["五つ", "itsutsu", "いつつ", "Lima buah (umum)", "五つ数えます。", "Menghitung sampai lima.", "N5"],
  ["六つ", "muttsu", "むっつ", "Enam buah (umum)", "六つあります。", "Ada enam buah.", "N5"],
  ["七つ", "nanatsu", "ななつ", "Tujuh buah (umum)", "七つの海です。", "Tujuh samudra.", "N5"],
  ["八つ", "yattsu", "やっつ", "Delapan buah (umum)", "八つに切ります。", "Memotong jadi delapan.", "N5"],
  ["九つ", "kokonotsu", "ここのつ", "Sembilan buah (umum)", "九つ集めました。", "Mengumpulkan sembilan buah.", "N5"],
  ["十", "too", "とお", "Sepuluh buah (umum)", "十まで数えましょう。", "Mari berhitung sampai sepuluh.", "N5"],
  ["一人", "hitori", "ひとり", "Satu orang / Sendirian", "一人で旅行します。", "Berwisata seorang diri.", "N5"],
  ["二人", "futari", "ふたり", "Dua orang / Berdua", "二人で暮らします。", "Tinggal berdua.", "N5"],
  ["三人", "sannin", "さんにん", "Tiga orang", "三人の子供がいます。", "Punya tiga anak.", "N5"],
  ["四人", "yonin", "よにん", "Empat orang", "四人家族です。", "Keluarga empat orang.", "N5"],
  ["一枚", "ichimai", "いちまい", "Satu lembar (kertas/baju)", "紙を一枚ください。", "Minta selembar kertas.", "N5"],
  ["二枚", "nimai", "にまい", "Dua lembar", "シャツを二枚買いました。", "Beli dua lembar kemeja.", "N5"],
  ["一本", "ippon", "いっぽん", "Satu batang (panjang/silinder)", "ペンを一本貸してください。", "Tolong pinjamkan satu batang pulpen.", "N5"],
  ["二本", "nihon", "にほん", "Dua batang / Dua botol", "水を二本買いました。", "Beli dua botol air.", "N5"],
  ["三本", "sanbon", "さんぼん", "Tiga batang", "木が三本あります。", "Ada tiga batang pohon.", "N5"],
  ["一杯", "ippai", "いっぱい", "Satu cangkir / mangkok / Penuh", "コーヒーを一杯飲みます。", "Minum secangkir kopi.", "N5"],
  ["二杯", "nihai", "にはい", "Dua cangkir / gelas", "お茶を二杯飲みました。", "Minum dua cangkir teh.", "N5"],
  ["一回", "ikkai", "いっかい", "Satu kali frekuensi", "一回試してみます。", "Mencoba satu kali.", "N5"],
  ["二回", "nikai", "にかい", "Dua kali frekuensi", "二回読みました。", "Membaca dua kali.", "N5"],
  ["一日", "tsuitachi", "ついたち", "Tanggal 1 kalender", "四月一日はエイプリルフールです。", "1 April adalah April Mop.", "N5"],
  ["二日", "futsuka", "ふつか", "Tanggal 2 / Selama 2 hari", "二日に着きます。", "Tiba tanggal dua.", "N5"],
  ["三日", "mikka", "みっか", "Tanggal 3 / Selama 3 hari", "三日かかりました。", "Butuh waktu tiga hari.", "N5"],
  ["四日", "yokka", "よっか", "Tanggal 4 / Selama 4 hari", "五月四日は祝日です。", "4 Mei adalah hari libur.", "N5"],
  ["五日", "itsuka", "いつか", "Tanggal 5 / Selama 5 hari", "五日間休みます。", "Libur selama lima hari.", "N5"],
  ["六日", "muika", "むいか", "Tanggal 6 / Selama 6 hari", "六日後に戻ります。", "Kembali enam hari lagi.", "N5"],
  ["七日", "nanoka", "なのか", "Tanggal 7 / Selama 7 hari", "七日間の旅です。", "Perjalanan selama tujuh hari.", "N5"],
  ["八日", "youka", "ようか", "Tanggal 8 / Selama 8 hari", "八日に行きます。", "Pergi tanggal delapan.", "N5"],
  ["九日", "kokonoka", "ここのか", "Tanggal 9 / Selama 9 hari", "九日に会議があります。", "Ada rapat tanggal sembilan.", "N5"],
  ["十日", "tooka", "とおか", "Tanggal 10 / Selama 10 hari", "十日間の休暇です。", "Libur sepuluh hari.", "N5"],
  ["十四日", "juuyokka", "じゅうよっか", "Tanggal 14", "二月十四日はバレンタインです。", "14 Februari adalah Valentine.", "N5"],
  ["二十日", "hatsuka", "はつか", "Tanggal 20", "二十日に試験があります。", "Ujian tanggal 20.", "N5"],
  ["二十四日", "nijyuyokka", "にじゅうよっか", "Tanggal 24", "クリスマスイブは二十四日です。", "Malam Natal adalah tanggal 24.", "N5"],
  ["百", "hyaku", "ひゃく", "Seratus (100)", "百円ショップです。", "Toko serba 100 yen.", "N5"],
  ["千", "sen", "せん", "Seribu (1.000)", "千円札を払います。", "Membayar uang seribu yen.", "N5"],
  ["万", "man", "まん", "Sepuluh ribu (10.000)", "一万円です。", "Sepuluh ribu yen.", "N5"],
  ["億", "oku", "おく", "Seratus juta (100.000.000)", "人口が一億人を超えました。", "Populasi melebihi 100 juta orang.", "N4"],
  ["半分", "hanbun", "はんぶん", "Setengah bagian / Separuh", "ケーキを半分に分けます。", "Membagi kue menjadi separuh.", "N5"],
  ["全部", "zenbu", "ぜんぶ", "Semuanya seluruhnya", "全部食べました。", "Sudah makan semuanya.", "N5"]
];

for (const c of counterData) {
  add(c[0], c[1], c[2], c[3], c[4], c[5], c[6], 'angka_waktu');
}

// 2. RUMAH, PERABOT, DAPUR & ALAT MASAK
const houseUtensils: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["箸", "hashi", "はし", "Sumpit makan", "箸でご飯を食べます。", "Makan nasi dengan sumpit.", "N5"],
  ["皿", "sara", "さら", "Piring saji", "お皿を洗います。", "Mencuci piring makan.", "N5"],
  ["コップ", "koppu", "koppu", "Gelas minum kaca/plastik", "コップに水を注ぎます。", "Menuang air ke gelas.", "N5"],
  ["茶碗", "chawan", "ちゃわん", "Mangkuk nasi keramik", "茶碗にご飯を盛ります。", "Menyendok nasi ke mangkuk.", "N5"],
  ["スプーン", "supuun", "supuun", "Sendok makan", "スプーンでスープを飲みます。", "Minum sup dengan sendok.", "N5"],
  ["フォーク", "fooku", "fooku", "Garpu makan", "フォークでパスタを食べます。", "Makan pasta dengan garpu.", "N5"],
  ["ナイフ", "naifu", "naifu", "Pisau makan", "ナイフで肉を切ります。", "Memotong daging dengan pisau.", "N5"],
  ["包丁", "houchou", "ほうちょう", "Pisau dapur iris", "包丁で野菜を切ります。", "Memotong sayur dengan pisau dapur.", "N4"],
  ["まな板", "manaita", "まないた", "Talenan alas potong", "まな板の上で刻みます。", "Mencincang di atas talenan.", "N4"],
  ["鍋", "nabe", "なべ", "Panci masak rebusan", "鍋でスープを作ります。", "Membuat sup dalam panci.", "N4"],
  ["フライパン", "furaipan", "furaipan", "Wajan penggorengan", "フライパンで卵を焼きます。", "Menggoreng telur di wajan.", "N4"],
  ["やかん", "yakan", "やかん", "Ceret teko perebus air", "やかんでお湯を沸かします。", "Merebus air dengan ceret teko.", "N4"],
  ["階段", "kaidan", "かいだん", "Tangga rumah/gedung", "階段を上がります。", "Naik melalui anak tangga.", "N5"],
  ["廊下", "rouka", "ろうか", "Lorong koridor rumah", "廊下を静かに歩きます。", "Berjalan tenang di lorong.", "N4"],
  ["天井", "tenjou", "てんじょう", "Langit-langit atap plafon", "天井に照明がつきます。", "Lampu terpasang di plafon.", "N4"],
  ["床", "yuka", "ゆか", "Lantai ruangan", "床を拭き掃除します。", "Mengepel lantai.", "N4"],
  ["壁", "kabe", "かべ", "Dinding tembok", "壁にポスターを貼ります。", "Menempel poster di dinding.", "N4"],
  ["押し入れ", "oshiire", "おしいれ", "Lemari geser dinding (futon)", "押し入れに布団をしまいます。", "Menyimpan kasur di lemari dinding.", "N4"],
  ["畳", "tatami", "たたみ", "Tikar anyaman jerami Jepang", "畳のいい香りがします。", "Aroma harum tikar tatami.", "N4"],
  ["カーテン", "kaaten", "kaaten", "Gorden tirai jendela", "カーテンを開けます。", "Membuka tirai gorden.", "N5"],
  ["絨毯 / カーペット", "juutan", "じゅうたん", "Karpet permadani lantai", "暖かい絨毯を敷きます。", "Menggelar karpet hangat.", "N4"],
  ["クッション", "kusshon", "kusshon", "Bantal sofa empuk", "クッションを抱えます。", "Memeluk bantal sofa.", "N4"],
  ["扇風機", "senpuuki", "せんぷうき", "Kipas angin listrik", "扇風機を回します。", "Menyalakan kipas angin.", "N4"],
  ["掃除機", "soujiki", "そうじき", "Mesin penyedot debu (vacuum)", "掃除機をかけます。", "Menyedot debu ruangan.", "N4"],
  ["アイロン", "airon", "airon", "Setrika pakaian", "シャツにアイロンをかけます。", "Menyetrika kemeja.", "N4"],
  ["ドライヤー", "doraiyaa", "doraiyaa", "Pengering rambut (hairdryer)", "ドライヤーで髪を乾かします。", "Mengeringkan rambut dengan pengering.", "N4"],
  ["鏡台 / 洗面所", "senmenjo", "せんめんじょ", "Wastafel cuci muka", "洗面所で歯を磨きます。", "Menggosok gigi di wastafel.", "N4"]
];

for (const h of houseUtensils) {
  add(h[0], h[1], h[2], h[3], h[4], h[5], h[6], 'benda_rumah');
}

// 3. BAHAN MAKANAN, BUMBU & SAYURAN
const groceries: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["玉ねぎ", "tamanegi", "たまねぎ", "Bawang bombay", "玉ねぎを炒めます。", "Menumis bawang bombay.", "N4"],
  ["人参", "ninjin", "にんじん", "Wortel oranye", "人参を角切りにします。", "Memotong wortel bentuk dadu.", "N4"],
  ["じゃがいも", "jagaimo", "じゃがいも", "Kentang umbi", "じゃがいもを茹でます。", "Merebus kentang.", "N4"],
  ["キャベツ", "kyabetsu", "kyabetsu", "Kubis kol sayur", "キャベツを刻みます。", "Mengiris kubis kol halus.", "N4"],
  ["トマト", "tomato", "tomato", "Tomat merah segar", "新鮮なトマトです。", "Tomat segar merah.", "N5"],
  ["きゅうり", "kyuuri", "きゅうり", "Mentimun renyah", "きゅうりの浅漬けです。", "Acar mentimun jepang.", "N4"],
  ["大根", "daikon", "だいこん", "Lobak putih panjang", "大根おろしを添えます。", "Menambahkan parutan lobak.", "N4"],
  ["きのこ", "kinoko", "きのこ", "Jamur pangan", "きのこスープを作ります。", "Membuat sup jamur.", "N4"],
  ["豆腐", "toufu", "とうふ", "Tahu kedelai putih", "豆腐の味噌汁です。", "Sup miso isi tahu.", "N4"],
  ["納豆", "nattou", "なっとう", "Natto (fermentasi kedelai)", "納豆をご飯にのせます。", "Menaruh natto di atas nasi.", "N4"],
  ["海苔", "nori", "のり", "Rumput laut lembaran kering", "海苔でおにぎりを巻きます。", "Membungkus onigiri dengan nori.", "N4"],
  ["胡椒", "koshou", "こしょう", "Merica / Lada", "塩と胡椒で味付けします。", "Membumbui garam dan merica.", "N4"],
  ["唐辛子", "tougarashi", "とうがらし", "Cabai pedas", "唐辛子を少し加えます。", "Menambahkan sedikit cabai.", "N4"],
  ["にんにく", "ninniku", "にんにく", "Bawang putih harum", "にんにくの香りがします。", "Harum aroma bawang putih.", "N4"],
  ["生姜", "shouga", "しょうが", "Jahe rempah", "生姜湯を飲みます。", "Minum air jahe hangat.", "N4"],
  ["ネギ", "negi", "ねぎ", "Daun bawang hijau", "ネギを薬味に入れます。", "Memasukkan daun bawang sebagai bumbu.", "N4"],
  ["チーズ", "chiizu", "chiizu", "Keju gurih", "とろけるチーズです。", "Keju yang meleleh lumer.", "N5"],
  ["バター", "bataa", "bataa", "Mentega gurih", "パンにバターを塗ります。", "Mengoles mentega pada roti.", "N5"],
  ["ジャム", "jamu", "jamu", "Selai buah manis", "イチゴジャムをつけます。", "Mengoleskan selai stroberi.", "N5"],
  ["蜂蜜", "hachimitsu", "はちみつ", "Madu lebah alami", "蜂蜜入りの紅茶です。", "Teh dengan madu lebah.", "N4"],
  ["小麦粉", "komugiko", "こむぎこ", "Tepung terigu", "小麦粉でケーキを焼きます。", "Memanggang kue dari terigu.", "N4"],
  ["米", "kome", "こめ", "Beras butiran", "お米をとぎます。", "Mencuci beras sebelum ditanak.", "N4"]
];

for (const gr of groceries) {
  add(gr[0], gr[1], gr[2], gr[3], gr[4], gr[5], gr[6], 'makanan');
}

// 4. PAKAIAN, AKSESORIS & FASHION
const fashion: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["上着", "uwagi", "うわぎ", "Jaket luar / Jas atas", "寒いので上着を着ます。", "Karena dingin saya memakai jaket.", "N5"],
  ["下着", "shitagi", "したぎ", "Pakaian dalam singlet/celana", "清潔な下着を着ます。", "Mengenakan pakaian dalam bersih.", "N5"],
  ["手袋", "tebukuro", "てぶくろ", "Sarung tangan hangat", "手袋をはめます。", "Memakai sarung tangan.", "N4"],
  ["マフラー", "mafuraa", "mafuraa", "Syal leher rajut", "暖かいマフラーを巻きます。", "Melilitkan syal hangat di leher.", "N4"],
  ["指輪", "yubiwa", "ゆびわ", "Cincin jari", "婚約指輪を贈ります。", "Memberikan cincin pertunangan.", "N4"],
  ["腕時計", "udedokei", "うでどけい", "Jam tangan arloji", "新しい腕時計です。", "Jam tangan baru.", "N5"],
  ["ネックレス", "nekkuresu", "nekkuresu", "Kalung leher perhiasan", "真珠のネックレスです。", "Kalung mutiara indah.", "N4"],
  ["イヤリング / ピアス", "iyaringu", "iyaringu", "Anting telinga", "可愛いイヤリングですね。", "Anting yang lucu ya.", "N4"],
  ["ベルト", "beruto", "beruto", "Ikat pinggang sabuk", "革のベルトを締めます。", "Mengencangkan ikat pinggang kulit.", "N5"],
  ["サンダル", "sandaru", "sandaru", "Sandal santai selop", "夏はサンダルを履きます。", "Musim panas memakai sandal.", "N5"],
  ["スリッパ", "surippa", "surippa", "Sandal rumah dalam ruangan", "スリッパに履き替えます。", "Ganti memakai sandal rumah.", "N5"],
  ["スーツ", "suutsu", "suutsu", "Setelan jas formal", "面接でスーツを着ます。", "Mengenakan setelan jas saat wawancara.", "N4"],
  ["ワンピース", "wanpiisu", "wanpiisu", "Baju terusan wanita (dress)", "清楚なワンピースです。", "Gaun terusan yang anggun.", "N4"],
  ["水着", "mizugi", "みずぎ", "Pakaian renang kostum", "海で水着を着ます。", "Mengenakan baju renang di pantai.", "N4"],
  ["着物", "kimono", "きもの", "Kimono pakaian adat Jepang", "お正月に着物を着ます。", "Mengenakan kimono saat tahun baru.", "N5"],
  ["浴衣", "yukata", "ゆかた", "Yukata jubah katun musim panas", "花火大会で浴衣を着ます。", "Mengenakan yukata di pesta kembang api.", "N4"]
];

for (const fa of fashion) {
  add(fa[0], fa[1], fa[2], fa[3], fa[4], fa[5], fa[6], 'benda_rumah');
}

// 5. PERJALANAN, STASIUN & KOTA
const travelTown: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["切符", "kippu", "きっぷ", "Tiket karcis perjalanan", "切符売り場で買います。", "Membeli di loket penjualan tiket.", "N5"],
  ["定期券", "teikiken", "ていきけん", "Tiket komuter langganan bulanan", "定期券を更新します。", "Memperpanjang tiket komuter langganan.", "N4"],
  ["改札口", "kaisatsuguchi", "かいさつぐち", "Pintu gerbang tiket stasiun", "改札口でタッチします。", "Menempelkan kartu di pintu gerbang tiket.", "N4"],
  ["ホーム", "hoomu", "hoomu", "Peron tunggu stasiun", "2番線ホームで待ちます。", "Menunggu di peron jalur dua.", "N5"],
  ["乗り場", "noriba", "のりば", "Tempat naik halte/pemberhentian", "タクシー乗り場はこちらです。", "Tempat naik taksi sebelah sini.", "N5"],
  ["行き先", "ikisaki", "いきさき", "Tujuan perjalanan / Destinasi", "行き先を確認します。", "Memastikan tujuan perjalanan.", "N4"],
  ["パスポート", "pasupooto", "pasupooto", "Paspor identitas lintas negara", "パスポートを提示します。", "Menunjukkan paspor.", "N5"],
  ["ビザ", "biza", "biza", "Visa izin tinggal", "就学ビザを取得します。", "Memperoleh visa pelajar.", "N4"],
  ["荷物", "nimotsu", "にもつ", "Barang bawaan bagasi", "荷物を預けます。", "Menitipkan barang bawaan bagasi.", "N5"],
  ["スーツケース", "suutsukeesu", "suutsukeesu", "Koper perjalanan beroda", "大きなスーツケースです。", "Koper besar beroda.", "N4"],
  ["観光", "kankou", "かんこう", "Pariwisata wisata keliling", "京都を観光します。", "Berwisata menikmati kota Kyoto.", "N4"],
  ["土産", "miyage", "みやげ", "Oleh-oleh cinderamata", "お土産を買いました。", "Membeli oleh-oleh khas.", "N5"],
  ["温泉", "onsen", "おんせん", "Pemandian air panas belerang", "露天風呂の温泉です。", "Pemandian air panas terbuka.", "N4"],
  ["旅館", "ryokan", "りょかん", "Penginapan tradisional Jepang", "和風の旅館に泊まります。", "Menginap di penginapan ryokan khas Jepang.", "N4"],
  ["信号", "shingou", "しんごう", "Lampu rambu lalu lintas", "赤信号で止まります。", "Berhenti saat lampu lalu lintas merah.", "N5"],
  ["交差点", "kousaten", "こうさてん", "Persimpangan perempatan jalan", "交差点を渡ります。", "Menyeberangi persimpangan perempatan.", "N5"],
  ["横断歩道", "oudanhodou", "おうだんほどう", "Zebra cross penyeberangan kaki", "横断歩道を渡りましょう。", "Ayo menyeberang di zebra cross.", "N4"],
  ["歩道", "hodou", "ほどう", "Trotoar pejalan kaki", "歩道を歩いてください。", "Silakan berjalan di trotoar.", "N4"],
  ["橋", "hashi", "はし", "Jembatan penyeberangan sungai", "長い橋を渡ります。", "Menyeberangi jembatan yang panjang.", "N5"],
  ["坂", "saka", "さか", "Tanjakan lereng jalan bukit", "急な坂を登ります。", "Mendaki tanjakan curam.", "N4"],
  ["角", "kado", "かど", "Pojokan sudut belokan jalan", "次の角を曲がります。", "Belok di pojokan sudut berikutnya.", "N5"]
];

for (const tt of travelTown) {
  add(tt[0], tt[1], tt[2], tt[3], tt[4], tt[5], tt[6], tt[1].includes('kippu') || tt[1].includes('noriba') || tt[1].includes('hoomu') ? 'transportasi' : 'tempat');
}

// 6. KERJA, BISNIS, TEKNOLOGI & PROFESI
const workBiz: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["先輩", "senpai", "せんぱい", "Senior panutan", "頼もしい先輩です。", "Senior yang sangat bisa diandalkan.", "N4"],
  ["後輩", "kouhai", "こうはい", "Junior rekan muda", "後輩に仕事を教えます。", "Mengajari junior pekerjaan kantor.", "N4"],
  ["上司", "joushi", "じょうし", "Atasan pimpinan kantor", "上司に報告します。", "Melapor kepada atasan.", "N4"],
  ["給料", "kyuuryou", "きゅうりょう", "Gaji bulanan upah kerja", "給料日を待ち遠しく思います。", "Menanti-nanti hari gajian.", "N4"],
  ["残業", "zangyou", "ざんぎょう", "Kerja lembur ekstra waktu", "今夜は残業します。", "Malam ini harus lembur kerja.", "N4"],
  ["出張", "shucchou", "しゅっちょう", "Dinas luar kota perjalanan bisnis", "大阪へ出張します。", "Perjalanan dinas ke Osaka.", "N4"],
  ["面接", "mensetsu", "めんせつ", "Wawancara interview kerja", "面接で自己紹介をします。", "Perkenalan diri saat wawancara kerja.", "N4"],
  ["履歴書", "rirekisho", "りれきしょ", "Surat riwayat hidup (CV)", "履歴書を送付します。", "Mengirimkan dokumen CV riwayat hidup.", "N4"],
  ["契約", "keiyaku", "けいやく", "Kontrak perjanjian resmi", "契約書にサインします。", "Menandatangani lembar kontrak resmi.", "N4"],
  ["連絡先", "renrakusaki", "れんらくさき", "Kontak yang bisa dihubungi", "連絡先を交換します。", "Bertukar kontak nomor ponsel.", "N4"],
  ["約束", "yakusoku", "やくそく", "Janji janji temu", "約束を守ります。", "Menepati janji yang dibuat.", "N5"],
  ["予定", "yotei", "よてい", "Rencana agenda jadwal", "来週の予定を立てます。", "Menyusun jadwal minggu depan.", "N5"],
  ["都合", "tsugou", "つごう", "Kondisi waktu kecocokan", "都合が合いますか？", "Apakah waktunya cocok untukmu?", "N4"],
  ["遠慮", "enryo", "えんりょ", "Sungkan / Ragu segan", "遠慮しないで召し上がれ。", "Jangan sungkan, silakan dinikmati.", "N4"],
  ["案内所", "annaijo", "あんないじょ", "Pusat informasi pelayanan", "観光案内所に行きます。", "Pergi ke pusat informasi turis.", "N4"],
  ["計画", "keikaku", "けいかく", "Rencana strategis planning", "旅行の計画を立てます。", "Membuat perencanaan liburan.", "N5"],
  ["経験", "keiken", "けいけん", "Pengalaman hidup/kerja", "いい経験になりました。", "Menjadi pengalaman yang sangat berharga.", "N4"],
  ["趣味", "shumi", "しゅみ", "Hobi kegemaran", "趣味は読書と写真です。", "Hobi saya membaca dan fotografi.", "N5"],
  ["将来", "shourai", "しょうらい", "Masa depan nanti", "将来の夢は通訳です。", "Impian masa depan menjadi penerjemah.", "N4"],
  ["目的", "mokuteki", "もくてき", "Tujuan maksud sasaran", "留学の目的を話します。", "Menjelaskan tujuan studi ke luar negeri.", "N4"],
  ["理由", "riyuu", "りゆう", "Alasan penyebab mengapa", "遅刻の理由を説明します。", "Menjelaskan alasan keterlambatan.", "N4"]
];

for (const wb of workBiz) {
  add(wb[0], wb[1], wb[2], wb[3], wb[4], wb[5], wb[6], 'profesi_sekolah');
}

// 7. PERASAAN, SIFAT & KONDISI TAMBAHAN
const feelingsStates: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["安心", "anshin", "あんしん", "Lega / Rasa tenang aman", "知らせを聞いて安心しました。", "Lega mendengar kabar baik tersebut.", "N4"],
  ["心配", "shinpai", "しんぱい", "Khawatir cemas", "親がとても心配しています。", "Orang tua sangat merasa khawatir.", "N5"],
  ["びっくり", "bikkuri", "びっくり", "Kaget tercengang heran", "大きな音にびっくりしました。", "Kaget mendengar suara yang keras.", "N5"],
  ["がっかり", "gakkari", "がっかり", "Kecewa patah semangat", "試合に負けてがっかりしました。", "Kecewa karena kalah dalam pertandingan.", "N4"],
  ["うっかり", "ukkari", "うっかり", "Ceroboh tidak sengaja lupa", "うっかり傘を忘れました。", "Tidak sengaja lupa membawa payung.", "N4"],
  ["すっきり", "sukkiri", "すっきり", "Segar bugar / Plong lega", "シャワーを浴びてすっきりしました。", "Merasa segar bugar setelah mandi shower.", "N4"],
  ["はっきり", "hakkiri", "はっきり", "Jelas tegas terang-terangan", "はっきりと聞こえます。", "Terdengar dengan sangat jelas.", "N4"],
  ["ぴったり", "pittari", "ぴったり", "Pas cocok persis ukuran", "この服はサイズがぴったりです。", "Baju ini ukurannya pas di badan.", "N4"],
  ["しっかり", "shikkari", "しっかり", "Kokoh / Kuat / Mantap teliti", "しっかり勉強してください。", "Belajarlah dengan sungguh-sungguh tekun.", "N4"],
  ["のんびり", "nonbiri", "のんびり", "Santai rileks tanpa beban", "温泉でのんびり過ごします。", "Menikmati waktu santai di onsen.", "N4"],
  ["そっくり", "sokkuri", "そっくり", "Mirip persis seperti kembar", "父親にそっくりです。", "Mirip persis dengan sang ayah.", "N4"],
  ["ぺこぺこ", "pekopeko", "ぺこぺこ", "Keroncongan perut lapar", "お腹がぺこぺこです。", "Perut saya sudah keroncongan lapar.", "N5"],
  ["からから", "karakara", "からから", "Kering kerontang dahaga haus", "喉がからからに渇きました。", "Tenggorokan kering kerontang haus.", "N5"],
  ["ぎゅうぎゅう", "gyuugyuu", "ぎゅうぎゅう", "Sesak berdesakan padat", "満員電車でぎゅうぎゅうです。", "Berdesakan padat di kereta jam sibuk.", "N4"],
  ["わくわく", "wakuwaku", "わくわく", "Berdebar antusias girang", "旅行の前でわくわくします。", "Antusias berdebar jelang liburan.", "N4"],
  ["どきどき", "dokidoki", "どきどき", "Deg-degan berdebar gugup", "発表の前でどきどきします。", "Deg-degan sebelum presentasi di panggung.", "N4"],
  ["いらいら", "iraira", "いらいら", "Kesal jengkel gemas", "渋滞でいらいらします。", "Jengkel karena macet panjang di jalan.", "N4"],
  ["うとうと", "utouto", "うとうと", "Terkantuk-kantuk mengangguk", "授業中にうとうとしました。", "Terkantuk-kantuk saat jam pelajaran.", "N4"]
];

for (const fs of feelingsStates) {
  add(fs[0], fs[1], fs[2], fs[3], fs[4], fs[5], fs[6], 'keterangan_fukushi');
}

// 8. BENCANA, FENOMENA ALAM & CUACA
const disastersNature: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["台風", "taifuu", "たいふう", "Badai topan taifun", "大型の台風が接近しています。", "Badai topan besar sedang mendekat.", "N4"],
  ["地震", "jishin", "じしん", "Gempa bumi getaran", "突然地震が起きました。", "Tiba-tiba gempa bumi terjadi.", "N4"],
  ["津波", "tsunami", "つなみ", "Gelombang tsunami laut", "津波警報が出されました。", "Peringatan gelombang tsunami dikeluarkan.", "N4"],
  ["雷", "kaminari", "かみなり", "Petir kilat halilintar", "遠くで雷が鳴っています。", "Petir bergemuruh di kejauhan.", "N4"],
  ["虹", "niji", "にじ", "Pelangi warna-warni", "雨上がりに綺麗な虹が出ました。", "Pelangi indah muncul seusai hujan.", "N4"],
  ["霧", "kiri", "きり", "Kabut tebal dingin", "朝の山に霧がかかっています。", "Kabut menyelimuti gunung di pagi hari.", "N4"],
  ["嵐", "arashi", "あらし", "Badai angin ribut petir", "昨夜は激しい嵐でした。", "Semalam badai menerpa begitu hebat.", "N4"],
  ["光", "hikari", "ひかり", "Cahaya sinar terang", "温かい光が差し込みます。", "Cahaya hangat menyinari ruangan.", "N4"],
  ["影", "kage", "かげ", "Bayangan hitam", "夕日で影が長く伸びます。", "Bayangan memanjang di kala senja.", "N4"],
  ["波", "nami", "なみ", "Ombak gelombang air laut", "静かな波の音が聞こえます。", "Terdengar desau suara deburan ombak laut.", "N4"],
  ["海岸", "kaigan", "かいがん", "Pesisir pantai tepi laut", "海岸沿いをドライブします。", "Menyusuri jalan pesisir pantai.", "N4"],
  ["湖", "mizuumi", "みずうみ", "Danau genangan air tawar", "美しい湖でボートに乗ります。", "Mendayung perahu di danau yang indah.", "N4"],
  ["池", "ike", "いけ", "Kolam ikan / Kolam taman", "庭の池に錦鯉が泳いでいます。", "Ikan koi berenang di kolam taman.", "N5"],
  ["谷", "tani", "たに", "Lembah bukit jurang", "緑の深い谷です。", "Lembah bukit hijau yang rimbun.", "N4"],
  ["砂浜", "sunahama", "すなはま", "Hamparan pasir pantai", "白い砂浜を歩きます。", "Berjalan di hamparan pasir putih.", "N4"]
];

for (const dn of disastersNature) {
  add(dn[0], dn[1], dn[2], dn[3], dn[4], dn[5], dn[6], 'alam_hewan');
}

// 9. KATA KERJA TAMBAHAN N5/N4
const extraVerbs: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["伝える", "tsutaeru", "つたえる", "Menyampaikan pesan berita", "先生に伝言を伝えます。", "Menyampaikan titipan pesan ke guru.", "N4"],
  ["比べる", "kuraberu", "くらべる", "Membandingkan dua hal", "二つの商品を比べます。", "Membandingkan dua produk barang.", "N4"],
  ["調べる", "shiraberu", "しらべる", "Menyelidiki mencari tahu data", "ネットで電車の時刻を調べます。", "Mencari tahu jadwal kereta di internet.", "N5"],
  ["捕まえる", "tsukamaeru", "つかまえる", "Menangkap (orang/hewan)", "警察が泥棒を捕まえました。", "Polisi telah menangkap pencuri.", "N4"],
  ["逃げる", "nigeru", "にげる", "Melarikan diri kabur", "鳥が空へ逃げました。", "Burung itu melarikan diri terbang ke angkasa.", "N4"],
  ["助ける", "tasukeru", "たすける", "Menolong menyelamatkan", "困っている人を助けます。", "Menolong orang yang sedang kesulitan.", "N4"],
  ["守る", "mamoru", "まもる", "Melindungi menaati aturan", "交通ルールを守ります。", "Menaati aturan tata tertib lalu lintas.", "N4"],
  ["眠る", "nemuru", "ねむる", "Tertidur lelap", "ぐっすりと眠りました。", "Tertidur dengan sangat lelap nyenyak.", "N4"],
  ["目覚める", "mezameru", "めざめる", "Terbangun sadar dari tidur", "朝の小鳥の声で目覚めました。", "Terbangun oleh kicauan suara burung pagi.", "N4"],
  ["払う", "harau", "はらう", "Membayar tagihan uang", "レジでお金を払います。", "Membayar uang belanja di kasir.", "N5"],
  ["残る", "nokoru", "のこる", "Tersisa masih ada", "料理が少し残りました。", "Makanannya masih tersisa sedikit.", "N4"],
  ["残す", "nokosu", "のこす", "Menyisakan barang/makanan", "ご飯を残さないでください。", "Jangan menyisakan nasi di piring.", "N4"],
  ["片寄る", "katayoru", "かたよる", "Condong berat sebelah", "栄養が片寄らないようにします。", "Menjaga agar asupan gizi tidak berat sebelah.", "N4"],
  ["思いつく", "omoitsuku", "おもいつく", "Tiba-tiba terlintas ide", "いいアイデアを思いつきました。", "Terlintas ide cemerlang di pikiran.", "N4"],
  ["見つかる", "mitsukaru", "みつかる", "Ditemukan ketemu barangnya", "なくした鍵が見つかりました。", "Kunci yang sempat hilang sudah ketemu.", "N4"],
  ["片付ける", "katazukeru", "かたづける", "Merapikan membereskan", "部屋を綺麗に片付けます。", "Merapikan kamar hingga bersih rapi.", "N4"],
  ["付き合う", "tsukiau", "つきあう", "Berpacaran / Menemani jalan", "友達の買い物に付き合います。", "Menemani sahabat yang sedang belanja.", "N4"],
  ["似合う", "niau", "にあう", "Cocok serasi pantas", "その服はよく似合っています。", "Baju itu sangat serasi dan cocok untukmu.", "N4"],
  ["間に合わせる", "maniawaseru", "まにあわせる", "Mengejar tepat waktu", "締め切りに間に合わせます。", "Mengejar tugas tepat sebelum batas akhir.", "N4"],
  ["問い合わせる", "toiawaseru", "といあわせる", "Menghubungi konfirmasi tanya", "ホテルに問い合わせます。", "Menghubungi pihak hotel untuk konfirmasi.", "N4"],
  ["引き出す", "hikidasu", "ひきだす", "Menarik uang tunai ATM", "ATMでお金を引き出します。", "Menarik uang tunai di mesin ATM.", "N4"],
  ["差し上げる", "sashiageru", "さしあげる", "Memberikan persembahan (sangat sopan)", "お茶を差し上げます。", "Menyuguhkan teh (kepada tamu terhormat).", "N4"],
  ["いただく", "itadaku", "いただく", "Menerima / Menyantap (sangat sopan)", "お土産をいただきました。", "Saya telah menerima cinderamata oleh-oleh.", "N4"],
  ["参る", "mairu", "まいる", "Pergi / Datang (rendah hati kenjougo)", "明日伺い参ります。", "Besok saya akan datang berkunjung.", "N4"],
  ["申す", "mousu", "もうす", "Bernama / Berkata (rendah hati)", "田中と申します。", "Nama saya Tanaka (sopan rendah hati).", "N4"],
  ["なさる", "nasaru", "なさる", "Melakukan (sangat hormat sonkeigo)", "何をなさいますか？", "Apakah yang sedang ingin Anda lakukan?", "N4"],
  ["ご覧になる", "goran ni naru", "ごらんになる", "Melihat (sangat hormat sonkeigo)", "絵をご覧になりましたか？", "Apakah Anda sudah melihat lukisan tersebut?", "N4"],
  ["おっしゃる", "ossharu", "おっしゃる", "Berbicara (sangat hormat sonkeigo)", "先生がそうおっしゃいました。", "Bapak Guru telah bertitah bersabda begitu.", "N4"]
];

for (const ev of extraVerbs) {
  add(ev[0], ev[1], ev[2], ev[3], ev[4], ev[5], ev[6], 'kata_kerja');
}
