import { RawVocab } from './buildVocab';

export const batch3List: RawVocab[] = [];

function add(kanji: string, reading: string, furigana: string, meaningId: string, exampleJp: string, exampleId: string, level: 'N5' | 'N4', subCategory: string) {
  batch3List.push({ kanji, reading, furigana, meaningId, exampleJp, exampleId, level, subCategory });
}

// Hobi, Olahraga & Hiburan
const hobbySports: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["アニメ", "anime", "anime", "Animasi Jepang (Anime)", "日本のアニメが大好きです。", "Sangat menyukai anime Jepang.", "N5"],
  ["漫画", "manga", "まんが", "Komik Jepang (Manga)", "漫画を読んで日本語を学びます。", "Membaca manga untuk belajar bahasa Jepang.", "N5"],
  ["ゲーム", "geemu", "geemu", "Permainan / Game", "友達とビデオゲームをします。", "Bermain video game bersama teman.", "N5"],
  ["音楽", "ongaku", "おんがく", "Musik melodi nada", "好きな音楽を聴きます。", "Mendengarkan musik favorit.", "N5"],
  ["ギター", "gitaa", "gitaa", "Gitar alat musik petik", "ギターを弾くのが得意です。", "Jago memainkan alat musik gitar.", "N4"],
  ["ピアノ", "piano", "piano", "Piano alat musik tuts", "ピアノを毎日練習します。", "Berlatih piano setiap hari.", "N5"],
  ["サッカー", "sakkaa", "sakkaa", "Sepak bola", "放課後にサッカーをします。", "Bermain sepak bola sepulang sekolah.", "N5"],
  ["野球", "yakyuu", "やきゅう", "Bisbol (Baseball)", "日本で野球は大人気です。", "Bisbol sangat populer di Jepang.", "N5"],
  ["テニス", "tenisu", "tenisu", "Tenis lapangan", "週末にテニスをします。", "Bermain tenis di akhir pekan.", "N5"],
  ["水泳", "suiei", "すいえい", "Olahraga renang", "水泳で体を鍛えます。", "Melatih tubuh dengan renang.", "N5"],
  ["写真", "shashin", "しゃしん", "Foto potret gambar", "綺麗な風景写真を撮ります。", "Memotret pemandangan alam yang indah.", "N5"],
  ["旅行", "ryokou", "りょこう", "Piknik liburan wisata", "国内旅行を計画しています。", "Merencanakan liburan dalam negeri.", "N5"],
  ["釣り", "tsuri", "つり", "Memancing ikan", "川へ釣りに行きます。", "Pergi memancing ikan ke sungai.", "N4"],
  ["登山", "tozan", "とざん", "Mendaki gunung", "秋に登山を楽しみます。", "Menikmati pendakian gunung di musim gugur.", "N4"],
  ["キャンプ", "kyanpu", "kyanpu", "Berkemah / Camping", "森でキャンプをします。", "Berkemah di dalam hutan rimbun.", "N4"],
  ["絵画", "kaiga", "かいが", "Lukisan karya seni", "美術館で絵画を鑑賞します。", "Menikmati karya seni lukisan di galeri.", "N4"],
  ["読書", "dokusho", "どくしょ", "Membaca buku", "秋は読書の季節です。", "Musim gugur adalah musim membaca buku.", "N5"],
  ["映画", "eiga", "えいが", "Film layar lebar", "新作の映画を見ました。", "Menonton film layar lebar rilisan terbaru.", "N5"]
];

for (const hs of hobbySports) {
  add(hs[0], hs[1], hs[2], hs[3], hs[4], hs[5], hs[6], 'profesi_sekolah');
}

// Belanja, Uang & Transaksi
const shopMoney: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["お金", "okane", "おかね", "Uang tunai kas", "お金を大切に使います。", "Menggunakan uang dengan hemat dan bijak.", "N5"],
  ["お釣り", "otsuri", "おつり", "Uang kembalian belanja", "お釣りを忘れずに取ってください。", "Jangan lupa mengambil uang kembalian Anda.", "N5"],
  ["値段", "nedan", "ねだん", "Harga tarif barang", "値段を確認してから買います。", "Memastikan harga sebelum membeli.", "N5"],
  ["割引", "waribiki", "わりびき", "Diskon potongan harga", "30パーセント割引です。", "Diskon potongan harga sebesar 30%.", "N4"],
  ["半額", "hangaku", "はんがく", "Setengah harga (Diskon 50%)", "夜になるとお弁当が半額になります。", "Saat malam hari bento menjadi setengah harga.", "N4"],
  ["レシート", "reshiito", "reshiito", "Struk belanja bukti bayar", "レシートを財布にしまいます。", "Menyimpan struk belanja di dalam dompet.", "N5"],
  ["クレジットカード", "kurejitto kaado", "kurejitto kaado", "Kartu kredit perbankan", "カードで支払いをします。", "Melakukan pembayaran dengan kartu kredit.", "N5"],
  ["税金", "zeikin", "ぜいきん", "Pajak negara", "消費税が含まれています。", "Sudah termasuk pajak pertambahan nilai.", "N4"],
  ["贈り物", "okurimono", "おくりもの", "Hadiah bingkisan kado", "母に贈り物を届けます。", "Mengirimkan bingkisan hadiah untuk ibu.", "N4"],
  ["包装", "housou", "ほうそう", "Bungkus kemasan kado", "綺麗に包装してください。", "Tolong dibungkus kado dengan rapi dan manis.", "N4"],
  ["領収書", "ryoushuusho", "りょうしゅうしょ", "Kwitansi tanda terima resmi", "領収書を発行してもらいます。", "Meminta diterbitkan kwitansi resmi.", "N4"]
];

for (const sm of shopMoney) {
  add(sm[0], sm[1], sm[2], sm[3], sm[4], sm[5], sm[6], 'benda_rumah');
}

// Masyarakat, Media, Dunia & Budaya
const societyWorld: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["世界", "sekai", "せかい", "Dunia jagat raya", "世界中を旅したいです。", "Ingin mengelilingi seluruh penjuru dunia.", "N5"],
  ["社会", "shakai", "しゃかい", "Masyarakat sosial", "社会のルールを守ります。", "Mematuhi norma aturan sosial masyarakat.", "N4"],
  ["地球", "chikyuu", "ちきゅう", "Planet Bumi", "美しい地球を守りましょう。", "Mari kita bersama menjaga planet bumi.", "N4"],
  ["平和", "heiwa", "へいわ", "Perdamaian damai", "世界の平和を心から祈ります。", "Berdoa dengan tulus demi perdamaian dunia.", "N4"],
  ["文化", "bunka", "ぶんか", "Kebudayaan adat budaya", "日本の伝統文化を学びます。", "Mempelajari adat kebudayaan luhur Jepang.", "N5"],
  ["歴史", "rekishi", "れきし", "Sejarah masa lampau", "京都の長い歴史を感じます。", "Merasakan jejak sejarah panjang kota Kyoto.", "N4"],
  ["環境", "kankyou", "かんきょう", "Lingkungan hidup sekitar", "自然環境を守る取り組みです。", "Upaya melestarikan lingkungan alam sekitar.", "N4"],
  ["ニュース", "nyuusu", "nyuusu", "Berita warta harian", "朝のニュースをチェックします。", "Mengecek siaran warta berita pagi hari.", "N5"],
  ["番組", "bangumi", "ばんぐみ", "Acara siaran program TV", "好きなテレビ番組を見ます。", "Menonton program acara TV kesayangan.", "N5"],
  ["人口", "jinkou", "じんこう", "Jumlah penduduk populasi", "東京は人口が多い都市です。", "Tokyo adalah kota dengan jumlah penduduk banyak.", "N4"],
  ["規則", "kisoku", "きそく", "Peraturan ketetapan regulasi", "寮の規則をしっかり守ります。", "Mematuhi ketetapan tata tertib asrama.", "N4"],
  ["法律", "houritsu", "ほうりつ", "Hukum undang-undang negara", "法律に従って行動します。", "Bertindak sesuai hukum perundang-undangan.", "N4"],
  ["政治", "seiji", "せいじ", "Politik ketatanegaraan", "国の政治に関心があります。", "Tertarik dengan dinamika politik negara.", "N4"],
  ["経済", "keizai", "けいざい", "Ekonomika perekonomian", "世界経済の動向を追います。", "Mengikuti perkembangan perekonomian global.", "N4"],
  ["貿易", "boueki", "ぼうえき", "Perdagangan antarnegara ekspor-impor", "外国と貿易を行います。", "Melakukan hubungan perdagangan antarnegara.", "N4"]
];

for (const sw of societyWorld) {
  add(sw[0], sw[1], sw[2], sw[3], sw[4], sw[5], sw[6], 'tempat');
}

// Anggota Tubuh & Medis Tambahan
const moreBodyMed: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["爪", "tsume", "つめ", "Kuku jemari", "爪を切って整えます。", "Memotong dan merapikan kuku jemari.", "N4"],
  ["皮膚", "hifu", "ひふ", "Kulit tubuh", "乾燥肌で皮膚がかゆいです。", "Kulit kering sehingga terasa gatal.", "N4"],
  ["骨", "hone", "ほね", "Tulang rangka", "カルシウムで骨を強くします。", "Memperkuat tulang dengan kalsium.", "N4"],
  ["血", "chi", "ち", "Darah merah", "指から血が出ました。", "Keluar darah dari jari tangan saya.", "N4"],
  ["心臓", "shinzou", "しんぞう", "Jantung raga", "心臓がどきどき高鳴ります。", "Jantung berdetak kencang berdebar.", "N4"],
  ["胃", "i", "い", "Lambung organ pencernaan", "胃の調子が悪いです。", "Kondisi lambung terasa kurang nyaman.", "N4"],
  ["注射", "chuusha", "ちゅうしゃ", "Suntikan vaksin/obat", "病院でインフルエンザの注射を打ちました。", "Disuntik vaksin influenza di rumah sakit.", "N4"],
  ["手術", "shujutsu", "しゅじゅつ", "Operasi tindakan bedah", "無事に手術が終わりました。", "Operasi bedah telah selesai dengan selamat.", "N4"],
  ["治療", "chiryou", "ちりょう", "Pengobatan terapi penyembuhan", "歯医者で虫歯の治療を受けます。", "Mendapat terapi pengobatan gigi di dokter gigi.", "N4"],
  ["包帯", "houtai", "ほうたい", "Perban kasa pembalut luka", "怪我した腕に包帯を巻きます。", "Membalut lengan yang luka dengan kain perban.", "N4"],
  ["体温計", "taionkei", "たいおんけい", "Termometer pengukur suhu badan", "体温計で熱を測ります。", "Mengukur suhu badan dengan termometer.", "N4"]
];

for (const mbm of moreBodyMed) {
  add(mbm[0], mbm[1], mbm[2], mbm[3], mbm[4], mbm[5], mbm[6], 'tubuh_kesehatan');
}

// Kata Kerja Sehari-hari Tambahan N5/N4
const dailyVerbs: [string, string, string, string, string, string, 'N5' | 'N4'][] = [
  ["抱く", "daku", "だく", "Memeluk / Menggendong", "母親が赤ちゃんを優しく抱きます。", "Ibu memeluk bayinya dengan penuh kelembutan.", "N4"],
  ["握る", "nigiru", "にぎる", "Menggenggam / Mengepal (onigiri)", "手と手をしっかり握り合います。", "Saling menggenggam tangan erat-erat.", "N4"],
  ["叩く", "tataku", "たたく", "Mengetuk pintu / Memukul gendang", "部屋のドアをコンコンと叩きます。", "Mengetuk pintu kamar berulang kali.", "N4"],
  ["ささやく", "sasayaku", "ささやく", "Berbisik lirih", "耳元でそっと秘密をささやきます。", "Berbisik pelan menceritakan rahasia.", "N4"],
  ["暮らす", "kurasu", "くらす", "Menjalani hidup / Berdiam", "静かな田舎の町で暮らしています。", "Menjalani hidup tenang di pedesaan.", "N4"],
  ["凍る", "kouru", "こおる", "Membeku menjadi es", "冬になると湖の水が凍ります。", "Air danau membeku saat musim dingin tiba.", "N4"],
  ["溶ける", "tokeru", "とける", "Mencair meleleh", "暖かい日差しで雪が溶けました。", "Salju mencair oleh hangatnya mentari.", "N4"],
  ["包む", "tsutsumu", "つつむ", "Membungkus rapi", "プレゼントを綺麗な紙で包みます。", "Membungkus kado dengan kertas yang indah.", "N4"],
  ["沸く", "waku", "わく", "Mendidih (air)", "お湯がぐつぐつと沸きました。", "Air panasnya sudah mendidih bergolak.", "N4"],
  ["流れる", "nagareru", "ながれる", "Mengalir tenang", "澄んだ川の水が流れています。", "Air sungai yang jernih mengalir jernih.", "N4"],
  ["流す", "nagasu", "ながす", "Mengalirkan / Menghanyutkan", "涙をそっと流しました。", "Meneteskan air mata dengan haru.", "N4"],
  ["深呼吸する", "shinkokyuu suru", "しんこきゅうする", "Tarik napas dalam-dalam", "新鮮な空気を吸って深呼吸します。", "Menghirup udara segar dan tarik napas dalam.", "N4"],
  ["我慢する", "gaman suru", "がまんする", "Bersabar menahan diri", "痛みをじっと我慢しました。", "Menahan rasa sakit dengan tabah sabar.", "N4"],
  ["応援する", "ouen suru", "おうえんする", "Memberi semangat / Mendukung", "大声で選手を応援します。", "Mendukung pemain dengan suara lantang penuh semangat.", "N4"],
  ["協力する", "kyouryoku suru", "きょうりょくする", "Bekerja sama / Gotong royong", "皆で力を合わせて協力しましょう。", "Mari saling bahu-membahu bekerja sama.", "N4"],
  ["挨拶する", "aisatsu suru", "あいさつする", "Menyapa memberi salam", "すれ違った人に笑顔で挨拶します。", "Menyapa orang berpapasan dengan senyuman.", "N5"],
  ["工夫する", "kufuu suru", "くふうする", "Mencari akal kreasi cara pintar", "作業が早く終わるよう工夫します。", "Mencari cara cerdas agar pekerjaan cepat tuntas.", "N4"],
  ["確認する", "kakunin suru", "かくにんする", "Mengonfirmasi / Memastikan kembali", "飛行機の搭乗時間を確認します。", "Memastikan kembali jam keberangkatan pesawat.", "N4"],
  ["歓迎する", "kangei suru", "かんげいする", "Menyambut kedatangan dengan hangat", "新しい仲間を心から歓迎します。", "Menyambut rekan baru dengan penuh kehangatan.", "N4"],
  ["尊敬する", "sonkei suru", "そんけいする", "Menaruh rasa hormat / Mengagumi", "偉大な先人を心から尊敬します。", "Sangat menaruh rasa hormat kepada para pendahulu.", "N4"],
  ["乾杯する", "kanpai suru", "かんぱいする", "Bersulang minuman merayakan", "みんなで笑顔で乾杯しました。", "Bersulang minuman bersama dengan penuh senyuman.", "N5"],
  ["感動する", "kandou suru", "かんどうする", "Terharu / Tersentuh hati mendalam", "美しい物語に深く感動しました。", "Sangat tersentuh oleh kisah cerita yang indah.", "N4"],
  ["合格する", "goukaku suru", "ごうかくする", "Lulus lolos seleksi ujian", "日本語能力試験に合格しました！", "Alhamdulillah saya lulus Ujian JLPT!", "N4"],
  ["頑張る", "ganbaru", "がんばる", "Berjuang sekuat tenaga pantang menyerah", "明日も全力で頑張りましょう！", "Mari besok kita tetap semangat dan pantang menyerah!", "N5"]
];

for (const dv of dailyVerbs) {
  add(dv[0], dv[1], dv[2], dv[3], dv[4], dv[5], dv[6], 'kata_kerja');
}

// Warna, Arah Mata Angin, Relasi & Teknologi Modern (35 items)
const extraFinal: [string, string, string, string, string, string, 'N5' | 'N4', string][] = [
  ["赤 / 赤い", "aka / akai", "あか", "Merah warna", "赤いりんごが美味しそうです。", "Apel merah tampak sangat lezat.", "N5", "kata_sifat"],
  ["青 / 青い", "ao / aoi", "あお", "Biru warna", "青い海がどこまでも広がっています。", "Laut biru terbentang luas tak berujung.", "N5", "kata_sifat"],
  ["黄 / 黄色い", "kiiro / kiiroi", "きいろ", "Kuning warna cerah", "黄色いヒマワリが咲きました。", "Bunga matahari kuning mekar cerah.", "N5", "kata_sifat"],
  ["白 / 白い", "shiro / shiroi", "しろ", "Putih warna suci", "白い雲が浮かんでいます。", "Awan putih melayang di langit.", "N5", "kata_sifat"],
  ["黒 / 黒い", "kuro / kuroi", "くろ", "Hitam warna kelam", "黒いスーツを着て出勤します。", "Berangkat kerja mengenakan setelan jas hitam.", "N5", "kata_sifat"],
  ["緑 / 緑色", "midori / midoriiro", "みどり", "Hijau warna segar", "新緑の木々が美しいです。", "Pepohonan hijau muda tampak begitu indah.", "N5", "kata_sifat"],
  ["茶色 / 茶色い", "chairo / chairoi", "ちゃいろ", "Cokelat warna tanah", "茶色い革靴を履きます。", "Mengenakan sepatu kulit berwarna cokelat.", "N5", "kata_sifat"],
  ["紫 / 紫色", "murasaki / murasakiiro", "むらさき", "Ungu warna anggun", "紫のラベンダーが香ります。", "Bunga lavender ungu beraroma semerbak.", "N4", "kata_sifat"],
  ["灰色 / グレー", "haiiro / guree", "はいいろ", "Abu-abu warna kelabu", "灰色のコートを着ています。", "Mengenakan mantel tebal warna abu-abu.", "N4", "kata_sifat"],
  ["ピンク / 桃色", "pinku / momoiro", "ぴんく", "Merah muda (Pink)", "ピンクの桜が満開です。", "Bunga sakura merah muda mekar sempurna.", "N5", "kata_sifat"],
  ["東", "higashi", "ひがし", "Timur arah mata angin", "太陽は東から昇ります。", "Matahari terbit dari arah timur.", "N5", "tempat"],
  ["西", "nishi", "にし", "Barat arah mata angin", "太陽が西の山に沈みます。", "Matahari terbenam di balik gunung barat.", "N5", "tempat"],
  ["南", "minami", "みなみ", "Selatan arah mata angin", "南の暖かい島へ旅します。", "Berwisata ke pulau selatan yang hangat.", "N5", "tempat"],
  ["北", "kita", "きた", "Utara arah mata angin", "北海道は北に位置しています。", "Hokkaido terletak di sebelah utara.", "N5", "tempat"],
  ["恋人", "koibito", "こいびと", "Kekasih tercinta", "恋人とデートを楽しみます。", "Menikmati kencan bersama kekasih hati.", "N4", "keluarga"],
  ["彼氏", "kareshi", "かれし", "Pacar laki-laki", "彼氏にプレゼントを渡します。", "Memberikan hadiah kado untuk sang pacar.", "N4", "keluarga"],
  ["彼女", "kanojo", "かのじょ", "Pacar wanita / Dia wanita", "彼女は笑顔がとても素敵です。", "Dia (wanita) memiliki senyuman yang sangat manis.", "N5", "keluarga"],
  ["親友", "shinyuu", "しんゆう", "Sahabat karib sejati", "彼とは10年来の親友です。", "Dia adalah sahabat karib saya sejak 10 tahun lalu.", "N4", "keluarga"],
  ["隣人", "rinjin", "りんじん", "Tetangga dekat rumah", "隣人と仲良く挨拶します。", "Saling menyapa ramah dengan tetangga sekitar.", "N4", "keluarga"],
  ["住所", "juusho", "じゅうしょ", "Alamat domisili tempat tinggal", "ここに住所を記入してください。", "Tolong tuliskan alamat domisili Anda di sini.", "N5", "tempat"],
  ["電話番号", "denwa bangou", "でんわばんごう", "Nomor telepon kontak", "電話番号を教えていただけますか？", "Bolehkah saya meminta nomor telepon Anda?", "N5", "benda_rumah"],
  ["暗証番号 / パスワード", "pasuwaado", "ぱすわーど", "Kata sandi / Password", "パスワードを入力してください。", "Silakan masukkan kata sandi Anda.", "N4", "benda_rumah"],
  ["メールアドレス", "meeru adoresu", "めーるあどれす", "Alamat surat elektronik (Email)", "メールアドレスに返信します。", "Membalas pesan ke alamat email.", "N5", "benda_rumah"],
  ["ウェブサイト", "webusaito", "うぇぶさいと", "Situs website portal", "公式サイトで情報を確認します。", "Mengecek informasi di situs website resmi.", "N4", "benda_rumah"],
  ["検索", "kensaku", "けんさく", "Pencarian search kata kunci", "インターネットで検索します。", "Mencari kata kunci informasi di internet.", "N4", "profesi_sekolah"],
  ["登録", "touroku", "とうろく", "Pendaftaran registrasi akun", "会員登録を済ませました。", "Telah menyelesaikan pendaftaran anggota akun.", "N4", "profesi_sekolah"],
  ["保存", "hozon", "ほぞん", "Menyimpan berkas save data", "データをこまめに保存します。", "Rutin menyimpan cadangan berkas data kerja.", "N4", "profesi_sekolah"],
  ["削除", "sakujo", "さくじょ", "Menghapus delete berkas", "不要なファイルを削除します。", "Menghapus berkas dokumen yang tidak diperlukan.", "N4", "profesi_sekolah"],
  ["コピー", "kopii", "こぴー", "Salin salinan berkas fotokopi", "資料を10部コピーします。", "Membuat fotokopi materi sebanyak 10 rangkap.", "N5", "profesi_sekolah"],
  ["クリック", "kurikku", "くりっく", "Klik tombol mouse kursor", "ボタンをクリックしてください。", "Silakan klik tombol di layar monitor.", "N4", "benda_rumah"],
  ["ダウンロード", "daunroodo", "だうんろーど", "Unduh file download berkas", "音楽アプリをダウンロードします。", "Mengunduh aplikasi pemutar musik.", "N4", "benda_rumah"],
  ["アプリ", "apuri", "あぷり", "Aplikasi software ponsel", "便利な学習アプリを使います。", "Menggunakan aplikasi belajar yang sangat praktis.", "N4", "benda_rumah"],
  ["画面", "gamen", "がめん", "Layar monitor display", "スマホの画面をタップします。", "Mengetuk layar sentuh smartphone.", "N4", "benda_rumah"],
  ["音量", "onryou", "おんりょう", "Volume suara audio", "音量を少し上げてください。", "Tolong besarkan sedikit volume suara audio.", "N4", "benda_rumah"],
  ["充電器", "juudenki", "じゅうでんき", "Kabel charger pengisi daya", "スマホの充電器を借ります。", "Meminjam charger baterai smartphone.", "N4", "benda_rumah"]
];

for (const ef of extraFinal) {
  add(ef[0], ef[1], ef[2], ef[3], ef[4], ef[5], ef[6], ef[7]);
}

