// Script to build 1,000+ authentic Japanese vocabulary items for JLPT N5 and N4
const fs = require('fs');
const path = require('path');

// We define structured word groups
const rawWords = [];

function add(kanji, reading, furigana, meaningId, exampleJp, exampleId, level, subCategory) {
  rawWords.push({
    id: `voc-${rawWords.length + 1}`,
    category: 'vocab',
    subCategory,
    japanese: kanji,
    kanji: kanji.match(/[\u4e00-\u9faf]/) ? kanji : undefined,
    reading,
    furigana: furigana || kanji,
    meaningId,
    exampleJp,
    exampleId,
    level
  });
}

// 1. KATA KERJA (VERBS) - ~230 items
add("行く", "iku", "いく", "Pergi", "明日東京へ行きます。", "Besok saya pergi ke Tokyo.", "N5", "kata_kerja");
add("来る", "kuru", "くる", "Datang", "友達がうちへ来ます。", "Teman datang ke rumah saya.", "N5", "kata_kerja");
add("帰る", "kaeru", "かえる", "Pulang", "午後6時に家へ帰ります。", "Saya pulang ke rumah jam 6 sore.", "N5", "kata_kerja");
add("食べる", "taberu", "たべる", "Makan", "朝ご飯を食べました。", "Saya sudah sarapan pagi.", "N5", "kata_kerja");
add("飲む", "nomu", "のむ", "Minum", "冷たい水を飲みます。", "Saya minum air dingin.", "N5", "kata_kerja");
add("見る", "miru", "みる", "Melihat / Menonton", "テレビで映画を見ます。", "Saya menonton film di televisi.", "N5", "kata_kerja");
add("聞く", "kiku", "きく", "Mendengar / Bertanya", "日本の音楽を聞きます。", "Saya mendengarkan musik Jepang.", "N5", "kata_kerja");
add("読む", "yomu", "よむ", "Membaca", "毎晩本を読みます。", "Saya membaca buku setiap malam.", "N5", "kata_kerja");
add("書く", "kaku", "かく", "Menulis", "手紙を書いています。", "Saya sedang menulis surat.", "N5", "kata_kerja");
add("話す", "hanasu", "はなす", "Berbicara", "日本語で話しましょう。", "Mari berbicara dalam bahasa Jepang.", "N5", "kata_kerja");
add("買う", "kau", "かう", "Membeli", "新しい靴を買いました。", "Saya membeli sepatu baru.", "N5", "kata_kerja");
add("売る", "uru", "うる", "Menjual", "車を売りました。", "Saya telah menjual mobil.", "N5", "kata_kerja");
add("待つ", "matsu", "まつ", "Menunggu", "駅の前で待ってください。", "Tolong tunggu di depan stasiun.", "N5", "kata_kerja");
add("会う", "au", "あう", "Bertemu", "友達に会います。", "Saya bertemu teman.", "N5", "kata_kerja");
add("遊ぶ", "asobu", "あそぶ", "Bermain", "公園で子供と遊びます。", "Bermain dengan anak di taman.", "N5", "kata_kerja");
add("急ぐ", "isogu", "いそぐ", "Buru-buru / Bergegas", "時間がないので急ぎます。", "Karena tidak ada waktu, saya buru-buru.", "N5", "kata_kerja");
add("泳ぐ", "oyogu", "およぐ", "Berenang", "海で泳ぐのが好きです。", "Saya suka berenang di laut.", "N5", "kata_kerja");
add("取る", "toru", "とる", "Mengambil", "塩を取ってください。", "Tolong ambilkan garam.", "N5", "kata_kerja");
add("撮る", "toru", "とる", "Memotret / Mengambil foto", "写真を撮りましょう。", "Ayo berfoto bersama.", "N5", "kata_kerja");
add("知る", "shiru", "しる", "Mengetahui / Kenal", "その人を知っていますか？", "Apakah kamu kenal orang itu?", "N5", "kata_kerja");
add("分かる", "wakaru", "わかる", "Mengerti / Paham", "意味がよく分かります。", "Saya sangat mengerti artinya.", "N5", "kata_kerja");
add("歩く", "aruku", "あるく", "Berjalan kaki", "毎日30分歩きます。", "Saya berjalan kaki 30 menit setiap hari.", "N5", "kata_kerja");
add("走る", "hashiru", "はしる", "Berlari", "公園を走っています。", "Saya sedang berlari di taman.", "N5", "kata_kerja");
add("立つ", "tatsu", "たつ", "Berdiri", "ドアの前に立ちます。", "Berdiri di depan pintu.", "N5", "kata_kerja");
add("座る", "suwaru", "すわる", "Duduk", "椅子に座ってください。", "Silakan duduk di kursi.", "N5", "kata_kerja");
add("持つ", "motsu", "もつ", "Membawa / Memegang", "荷物を持ちましょうか？", "Bolehkah saya bantu bawakan barangnya?", "N5", "kata_kerja");
add("作る", "tsukuru", "つくる", "Membuat", "晩ご飯を作ります。", "Saya membuat makan malam.", "N5", "kata_kerja");
add("使う", "tsukau", "つかう", "Menggunakan / Memakai", "パソコンを使います。", "Saya menggunakan komputer.", "N5", "kata_kerja");
add("置く", "oku", "おく", "Meletakkan / Menaruh", "机の上に置きました。", "Saya meletakkannya di atas meja.", "N5", "kata_kerja");
add("住む", "sumu", "すむ", "Tinggal / Berdiam di", "東京に住んでいます。", "Saya tinggal di Tokyo.", "N5", "kata_kerja");
add("働く", "hataraku", "はたらく", "Bekerja", "病院で働いています。", "Saya bekerja di rumah sakit.", "N5", "kata_kerja");
add("休む", "yasumu", "やすむ", "Istirahat / Libur", "今日は仕事を休みます。", "Hari ini saya libur bekerja.", "N5", "kata_kerja");
add("教える", "oshieru", "おしえる", "Mengajar / Memberitahu", "日本語を教えてください。", "Tolong ajarkan bahasa Jepang kepada saya.", "N5", "kata_kerja");
add("習う", "narau", "ならう", "Belajar (dari orang lain)", "ピアノを習っています。", "Saya belajar les piano.", "N5", "kata_kerja");
add("貸す", "kasu", "かす", "Meminjamkan", "傘を貸してください。", "Tolong pinjamkan saya payung.", "N5", "kata_kerja");
add("借りる", "kariru", "かりる", "Meminjam", "図書館で本を借りました。", "Saya meminjam buku di perpustakaan.", "N5", "kata_kerja");
add("返す", "kaesu", "かえす", "Mengembalikan", "本を返します。", "Saya mengembalikan buku.", "N5", "kata_kerja");
add("起きる", "okiru", "おきる", "Bangun tidur", "朝6時に起きます。", "Saya bangun jam 6 pagi.", "N5", "kata_kerja");
add("寝る", "neru", "ねる", "Tidur", "夜11時に寝ます。", "Saya tidur jam 11 malam.", "N5", "kata_kerja");
add("開ける", "akeru", "あける", "Membuka (pintu/jendela)", "窓を開けてください。", "Tolong buka jendelanya.", "N5", "kata_kerja");
add("閉める", "shimeru", "しめる", "Menutup (pintu/jendela)", "ドアを閉めました。", "Saya telah menutup pintu.", "N5", "kata_kerja");
add("開く", "aku", "あく", "Terbuka (sendirinya)", "ドアが開きました。", "Pintunya terbuka.", "N5", "kata_kerja");
add("閉まる", "shimaru", "しまる", "Tertutup (sendirinya)", "店が閉まりました。", "Tokonya sudah tutup.", "N5", "kata_kerja");
add("つける", "tsukeru", "つける", "Menyalakan (lampu/alat)", "エアコンをつけます。", "Saya menyalakan AC.", "N5", "kata_kerja");
add("消す", "kesu", "けす", "Mematikan / Menghapus", "電気を消してください。", "Tolong matikan lampu.", "N5", "kata_kerja");
add("入る", "hairu", "はいる", "Masuk", "部屋に入ります。", "Saya masuk ke kamar.", "N5", "kata_kerja");
add("出る", "deru", "でる", "Keluar", "家を出ます。", "Saya keluar dari rumah.", "N5", "kata_kerja");
add("入れる", "ireru", "いれる", "Memasukkan", "鞄に財布を入れます。", "Saya memasukkan dompet ke dalam tas.", "N5", "kata_kerja");
add("出す", "dasu", "だす", "Mengeluarkan / Menyerahkan", "宿題を出します。", "Saya mengumpulkan tugas PR.", "N5", "kata_kerja");
add("乗る", "noru", "のる", "Naik (kendaraan)", "電車に乗ります。", "Saya naik kereta.", "N5", "kata_kerja");
add("降りる", "oriru", "おりる", "Turun (dari kendaraan)", "バスを降ります。", "Saya turun dari bus.", "N5", "kata_kerja");
add("乗り換える", "norikaeru", "のりかえる", "Pindah kendaraan / Transit", "次の駅で乗り換えます。", "Transit di stasiun berikutnya.", "N4", "kata_kerja");
add("浴びる", "abiru", "あびる", "Mandi shower", "毎朝シャワーを浴びます。", "Saya mandi shower setiap pagi.", "N5", "kata_kerja");
add("洗う", "arau", "あらう", "Mencuci", "手をよく洗ってください。", "Cucilah tanganmu dengan bersih.", "N5", "kata_kerja");
add("磨く", "migaku", "みがく", "Menggosok / Menyikat (gigi)", "食後に歯を磨きます。", "Saya menggosok gigi setelah makan.", "N5", "kata_kerja");
add("着る", "kiru", "きる", "Memakai (pakaian atas)", "上着を着ます。", "Saya memakai jaket luar.", "N5", "kata_kerja");
add("履く", "haku", "はく", "Memakai (celana/sepatu)", "新しい靴を履きます。", "Saya memakai sepatu baru.", "N5", "kata_kerja");
add("かぶる", "kaburu", "かぶる", "Memakai (topi)", "帽子をかぶっています。", "Saya sedang memakai topi.", "N5", "kata_kerja");
add("脱ぐ", "nugu", "ぬぐ", "Melepas pakaian / sepatu", "玄関で靴を脱ぎます。", "Lepas sepatu di pintu masuk.", "N5", "kata_kerja");
add("送る", "okuru", "おくる", "Mengirim", "メールを送りました。", "Saya telah mengirim surel.", "N5", "kata_kerja");
add("届く", "todoku", "とどく", "Sampai / Tiba (paket/surat)", "荷物が届きました。", "Paketnya telah sampai.", "N4", "kata_kerja");
add("渡す", "watasu", "わたす", "Menyerahkan", "プレゼントを渡します。", "Menyerahkan kado.", "N5", "kata_kerja");
add("渡る", "wataru", "わたる", "Menyeberang", "信号を渡ります。", "Menyeberang di lampu merah.", "N5", "kata_kerja");
add("曲がる", "magaru", "まがる", "Belok", "交差点を右へ曲がります。", "Belok kanan di perempatan.", "N5", "kata_kerja");
add("止まる", "tomaru", "とまる", "Berhenti (kendaraan)", "車が止まりました。", "Mobilnya berhenti.", "N5", "kata_kerja");
add("止める", "tomeru", "とめる", "Menghentikan / Memarkir", "車を駐車場に止めます。", "Memarkir mobil di area parkir.", "N5", "kata_kerja");
add("泊まる", "tomaru", "とまる", "Menginap", "温泉旅館に泊まります。", "Menginap di penginapan onsen.", "N4", "kata_kerja");
add("始まる", "hajimaru", "はじまる", "Dimulai", "授業が始まります。", "Pelajaran dimulai.", "N5", "kata_kerja");
add("始める", "hajimeru", "はじめる", "Memulai", "日本語の勉強を始めました。", "Saya mulai belajar bahasa Jepang.", "N5", "kata_kerja");
add("終わる", "owaru", "おわる", "Selesai / Berakhir", "仕事が終わりました。", "Pekerjaan sudah selesai.", "N5", "kata_kerja");
add("覚える", "oboeru", "おぼえる", "Mengingat / Menghapal", "漢字をたくさん覚えます。", "Saya menghapal banyak kanji.", "N5", "kata_kerja");
add("忘れる", "wasureru", "わすれる", "Lupa", "宿題を忘れました。", "Saya lupa mengerjakan PR.", "N5", "kata_kerja");
add("思い出す", "omoidasu", "おもいだす", "Mengingat kembali / Teringat", "子供の頃を思い出します。", "Saya teringat masa kecil.", "N4", "kata_kerja");
add("考える", "kangaeru", "かんがえる", "Memikirkan", "将来のことを考えます。", "Saya memikirkan masa depan.", "N4", "kata_kerja");
add("思う", "omou", "おもう", "Mengira / Berpikir", "そう思います。", "Saya berpikir begitu.", "N5", "kata_kerja");
add("言う", "iu", "いう", "Berkata / Mengatakan", "「おはよう」と言いました。", "Dia mengucapkan selamat pagi.", "N5", "kata_kerja");
add("呼ぶ", "yobu", "よぶ", "Memanggil", "タクシーを呼びます。", "Saya memanggil taksi.", "N5", "kata_kerja");
add("歌う", "utau", "うたう", "Bernyanyi", "カラオケで歌います。", "Bernyanyi di karaoke.", "N5", "kata_kerja");
add("踊る", "odoru", "おどる", "Menari", "日本の伝統的な踊りです。", "Tarian tradisional Jepang.", "N5", "kata_kerja");
add("笑う", "warau", "わらう", "Tertawa / Tersenyum", "みんなで楽しく笑いました。", "Semua orang tertawa bahagia.", "N5", "kata_kerja");
add("泣く", "naku", "なく", "Menangis", "悲しくて泣きました。", "Saya menangis karena sedih.", "N5", "kata_kerja");
add("怒る", "okoru", "おこる", "Marah", "先生が怒りました。", "Guru marah.", "N4", "kata_kerja");
add("頼む", "tanomu", "たのむ", "Meminta tolong / Memesan", "手伝いを頼みます。", "Saya meminta bantuan.", "N5", "kata_kerja");
add("手伝う", "tetsudau", "てつだう", "Membantu", "母の料理を手伝います。", "Saya membantu masakan ibu.", "N5", "kata_kerja");
add("直す", "naosu", "なおす", "Memperbaiki / Membetulkan", "パソコンを直します。", "Saya memperbaiki komputer.", "N4", "kata_kerja");
add("壊す", "kowasu", "こわす", "Merusak", "おもちゃを壊しました。", "Merusak mainan.", "N4", "kata_kerja");
add("壊れる", "kowareru", "こわれる", "Rusak", "椅子が壊れました。", "Kursinya patah / rusak.", "N4", "kata_kerja");
add("落とす", "otosu", "おとす", "Menjatuhkan", "財布を落としました。", "Saya menjatuhkan dompet.", "N4", "kata_kerja");
add("落ちる", "ochiru", "おちる", "Jatuh (sendirinya)", "木の葉が落ちます。", "Daun-daun pohon berguguran.", "N4", "kata_kerja");
add("拾う", "hirou", "ひろう", "Memungut / Memetik", "ゴミを拾います。", "Saya memungut sampah.", "N4", "kata_kerja");
add("捨てる", "suteru", "すてる", "Membuang", "ゴミを捨てないでください。", "Jangan buang sampah di sini.", "N4", "kata_kerja");
add("探す", "sagasu", "さがす", "Mencari", "鍵を探しています。", "Saya sedang mencari kunci.", "N4", "kata_kerja");
add("見つける", "mitsukeru", "みつける", "Menemukan", "いい方法を見つけました。", "Saya menemukan cara yang bagus.", "N4", "kata_kerja");
add("選ぶ", "erabu", "えらぶ", "Memilih", "好きな色を選んでください。", "Silakan pilih warna favorit.", "N4", "kata_kerja");
add("決める", "kimeru", "きめる", "Memutuskan", "日程を決めます。", "Saya memutuskan tanggalnya.", "N4", "kata_kerja");
add("勝つ", "katsu", "かつ", "Menang", "試合に勝ちました。", "Menang dalam pertandingan.", "N4", "kata_kerja");
add("負ける", "makeru", "まける", "Kalah", "試合に負けました。", "Kalah dalam pertandingan.", "N4", "kata_kerja");
add("生きる", "ikiru", "いきる", "Hidup", "元気に生きています。", "Hidup dengan sehat.", "N4", "kata_kerja");
add("死ぬ", "shinu", "しぬ", "Mati / Meninggal", "魚が死にました。", "Ikannya mati.", "N5", "kata_kerja");
add("咲く", "saku", "さく", "Mekar (bunga)", "桜の花が咲きました。", "Bunga sakura telah mekar.", "N5", "kata_kerja");
add("降る", "furu", "ふる", "Turun (hujan/salju)", "雪が降っています。", "Salju sedang turun.", "N5", "kata_kerja");
add("晴れる", "hareru", "はれる", "Cerah (cuaca)", "明日晴れます。", "Besok akan cerah.", "N5", "kata_kerja");
add("曇る", "kumoru", "くもる", "Mendung (cuaca)", "空が曇っています。", "Langit sedang mendung.", "N5", "kata_kerja");
add("吹く", "fuku", "ふく", "Bertiup (angin)", "風が強く吹いています。", "Angin bertiup kencang.", "N5", "kata_kerja");
add("喜ぶ", "yorokobu", "よろこぶ", "Senang / Bergembira", "子供たちが喜んでいます。", "Anak-anak sangat bergembira.", "N4", "kata_kerja");
add("驚く", "odoroku", "おどろく", "Kaget / Terkejut", "ニュースに驚きました。", "Saya terkejut mendengar berita.", "N4", "kata_kerja");
add("信じる", "shinjiru", "しんじる", "Percaya", "あなたを信じています。", "Saya percaya kepadamu.", "N4", "kata_kerja");
add("祈る", "inoru", "いのる", "Berdoa", "健康を祈ります。", "Saya mendoakan kesehatanmu.", "N4", "kata_kerja");
add("楽しむ", "tanoshimu", "たのしむ", "Menikmati", "旅行を楽しみます。", "Menikmati liburan.", "N4", "kata_kerja");
add("結婚する", "kekkon suru", "けっこんする", "Menikah", "来年結婚します。", "Menikah tahun depan.", "N5", "kata_kerja");
add("勉強する", "benkyou suru", "べんきょうする", "Belajar", "毎晩勉強します。", "Belajar setiap malam.", "N5", "kata_kerja");
add("旅行する", "ryokou suru", "りょこうする", "Berwisata / Bepergian", "日本へ旅行します。", "Berwisata ke Jepang.", "N5", "kata_kerja");
add("買い物する", "kaimono suru", "かいものする", "Berbelanja", "スーパーで買い物します。", "Belanja di supermarket.", "N5", "kata_kerja");
add("散歩する", "sanpo suru", "さんぽする", "Jalan-jalan santai", "公園を散歩します。", "Jalan santai di taman.", "N5", "kata_kerja");
add("運動する", "undou suru", "うんどうする", "Berolahraga", "週末に運動します。", "Olahraga di akhir pekan.", "N5", "kata_kerja");
add("練習する", "renshuu suru", "れんしゅうする", "Berlatih", "会話を練習します。", "Melatih percakapan.", "N5", "kata_kerja");
add("電話する", "denwa suru", "でんわする", "Menelepon", "友達に電話します。", "Menelepon teman.", "N5", "kata_kerja");
add("約束する", "yakusoku suru", "やくそくする", "Berjanji", "時間を約束します。", "Menepati waktu janji.", "N5", "kata_kerja");
add("案内する", "annai suru", "あんないする", "Memandu jalan", "町を案内します。", "Memandu keliling kota.", "N4", "kata_kerja");
add("説明する", "setsumei suru", "せつめいする", "Menjelaskan", "ルールを説明します。", "Menjelaskan aturan.", "N4", "kata_kerja");
add("予約する", "yoyaku suru", "よやくする", "Memesan / Reservasi", "ホテルを予約しました。", "Memesan kamar hotel.", "N4", "kata_kerja");
add("注文する", "chuumon suru", "ちゅうもんする", "Memesan makanan / barang", "ピザを注文します。", "Memesan pizza.", "N4", "kata_kerja");
add("注意する", "chuui suru", "ちゅういする", "Berhati-hati / Memperhatikan", "車に注意してください。", "Hati-hati dengan mobil.", "N5", "kata_kerja");
add("準備する", "junbi suru", "じゅんびする", "Mempersiapkan", "試験の準備をします。", "Mempersiapkan ujian.", "N5", "kata_kerja");
add("片付ける", "katazukeru", "かたづける", "Membereskan / Merapikan", "机を片付けます。", "Merapikan meja.", "N4", "kata_kerja");
add("掃除する", "souji suru", "そうじする", "Membersihkan ruangan", "部屋を掃除します。", "Membersihkan kamar.", "N5", "kata_kerja");
add("洗濯する", "sentaku suru", "せんたくする", "Mencuci pakaian", "服を洗濯します。", "Mencuci pakaian.", "N5", "kata_kerja");
add("連絡する", "renraku suru", "れんらくする", "Menghubungi", "後で連絡します。", "Nanti saya hubungi.", "N5", "kata_kerja");
add("相談する", "soudan suru", "そうだんする", "Berkonsultasi", "先生に相談します。", "Konsultasi ke guru.", "N4", "kata_kerja");
add("出席する", "shusseki suru", "しゅっせきする", "Menghadiri", "会議に出席します。", "Menghadiri rapat.", "N4", "kata_kerja");
add("欠席する", "kesseki suru", "けっせきする", "Absen / Tidak hadir", "授業を欠席します。", "Absen dari kelas.", "N4", "kata_kerja");
add("合格する", "goukaku suru", "ごうかくする", "Lulus ujian", "試験に合格しました。", "Lulus ujian.", "N4", "kata_kerja");
add("失敗する", "shippai suru", "しっぱいする", "Gagal", "料理に失敗しました。", "Gagal dalam memasak.", "N4", "kata_kerja");
add("成功する", "seikou suru", "せいこうする", "Berhasil / Sukses", "計画が成功しました。", "Rencananya berhasil.", "N4", "kata_kerja");
add("入院する", "nyuuin suru", "にゅういんする", "Rawat inap", "病院に入院します。", "Masuk rawat inap rumah sakit.", "N4", "kata_kerja");
add("退院する", "taiin suru", "たいいんする", "Keluar dari rumah sakit", "明日退院します。", "Besok pulang dari rumah sakit.", "N4", "kata_kerja");
add("修理する", "shuuri suru", "しゅうりする", "Memperbaiki", "車を修理します。", "Memperbaiki mobil.", "N4", "kata_kerja");
add("故障する", "koshou suru", "こしょうする", "Mogok / Rusak", "時計が故障しました。", "Jamnya rusak.", "N4", "kata_kerja");
add("引っ越す", "hikkosu", "ひっこす", "Pindah rumah", "来月引っ越します。", "Bulan depan pindah rumah.", "N4", "kata_kerja");
add("謝る", "ayamaru", "あやまる", "Minta maaf", "素直に謝ります。", "Minta maaf dengan jujur.", "N4", "kata_kerja");
add("許す", "yurusu", "ゆるす", "Memaafkan", "友達を許します。", "Memaafkan teman.", "N4", "kata_kerja");
add("褒める", "homeru", "ほめる", "Memuji", "子供を褒めます。", "Memuji anak.", "N4", "kata_kerja");
add("叱る", "shikaru", "しかる", "Memarahi", "母に叱られました。", "Dimarahi oleh ibu.", "N4", "kata_kerja");
add("断る", "kotowaru", "ことわる", "Menolak", "誘いを断ります。", "Menolak ajakan.", "N4", "kata_kerja");
add("届ける", "todokeru", "とどける", "Mengantarkan paket", "荷物を届けます。", "Mengantarkan barang.", "N4", "kata_kerja");
add("運ぶ", "hakobu", "はこぶ", "Mengangkut / Membawa", "荷物を運びます。", "Mengangkut barang.", "N4", "kata_kerja");
add("変わる", "kawaru", "かわる", "Berubah", "天気が変わりました。", "Cuacanya berubah.", "N4", "kata_kerja");
add("変える", "kaeru", "かえる", "Mengubah", "予定を変えます。", "Mengubah jadwal.", "N4", "kata_kerja");
add("続く", "tsuzuku", "つづく", "Berlanjut", "雨が続いています。", "Hujannya terus berlanjut.", "N4", "kata_kerja");
add("続ける", "tsuzukeru", "つづける", "Melanjutkan", "勉強を続けます。", "Melanjutkan belajar.", "N4", "kata_kerja");
add("止む", "yamu", "やむ", "Reda (hujan/angin)", "雨が止みました。", "Hujannya sudah reda.", "N4", "kata_kerja");
add("増える", "fueru", "ふえる", "Bertambah", "人数が増えました。", "Jumlah orang bertambah.", "N4", "kata_kerja");
add("減る", "heru", "へる", "Berkurang", "体重が減りました。", "Berat badan berkurang.", "N4", "kata_kerja");
add("上がる", "agaru", "あがる", "Naik (suhu/harga)", "物価が上がります。", "Harga-harga naik.", "N4", "kata_kerja");
add("下がる", "sagaru", "さがる", "Turun (suhu/harga)", "熱が下がりました。", "Demamnya sudah turun.", "N4", "kata_kerja");
add("冷える", "hieru", "ひえる", "Menjadi dingin", "夜は冷えます。", "Malam hari terasa dingin.", "N4", "kata_kerja");
add("温まる", "atatamaru", "あたたまる", "Menjadi hangat", "体が温まりました。", "Badan menjadi hangat.", "N4", "kata_kerja");
add("汚す", "yogosu", "よごす", "Mengotori", "服を汚しました。", "Mengotori pakaian.", "N4", "kata_kerja");
add("汚れる", "yogoreru", "よごれる", "Kotor", "手が汚れました。", "Tangan menjadi kotor.", "N4", "kata_kerja");
add("無くす", "nakusu", "なくす", "Menghilangkan", "鍵を無くしました。", "Menghilangkan kunci.", "N5", "kata_kerja");
add("無くなる", "nakunaru", "なくなる", "Hilang / Habis", "お金が無くなりました。", "Uangnya habis.", "N4", "kata_kerja");
add("受ける", "ukeru", "うける", "Mengikuti ujian / Menerima", "テストを受けます。", "Mengikuti ujian tes.", "N4", "kata_kerja");
add("見送る", "miokuru", "みおくる", "Mengantar kepergian", "空港で見送ります。", "Mengantar di bandara.", "N4", "kata_kerja");
add("迎える", "mukaeru", "むかえる", "Menjemput / Menyambut", "客を迎えます。", "Menyambut tamu.", "N4", "kata_kerja");
add("焼く", "yaku", "やく", "Memanggang", "肉を焼きます。", "Memanggang daging.", "N4", "kata_kerja");
add("煮る", "niru", "にる", "Merebus bumbu", "魚を煮ます。", "Merebus ikan dengan bumbu.", "N4", "kata_kerja");
add("揚げる", "ageru", "あげる", "Menggoreng", "エビを揚げます。", "Menggoreng udang.", "N4", "kata_kerja");
add("炒める", "itameru", "いため", "Menumis", "野菜を炒めます。", "Menumis sayur.", "N4", "kata_kerja");
add("沸かす", "wakasu", "わかす", "Merebus air", "お湯を沸かします。", "Merebus air.", "N4", "kata_kerja");
add("冷やす", "hiyasu", "ひやす", "Mendinginkan", "スイカを冷やします。", "Mendinginkan semangka.", "N4", "kata_kerja");
add("混ぜる", "mazeru", "まぜる", "Mencampur / Mengaduk", "卵を混ぜます。", "Mengaduk telur.", "N4", "kata_kerja");
add("踏む", "fumu", "ふむ", "Menginjak", "足を踏まれました。", "Kaki saya terinjak.", "N4", "kata_kerja");
add("盗む", "nusumu", "ぬすむ", "Mencuri", "自転車を盗まれました。", "Sepeda saya dicuri.", "N4", "kata_kerja");
add("刺す", "sasu", "さす", "Menyengat / Menusuk", "虫に刺されました。", "Disengat serangga.", "N4", "kata_kerja");
add("噛む", "kamu", "かむ", "Menggigit / Mengunyah", "よく噛んで食べます。", "Mengunyah makanan dengan baik.", "N4", "kata_kerja");
add("誘う", "sasou", "さそう", "Mengajak", "ランチに誘います。", "Mengajak makan siang.", "N4", "kata_kerja");
add("連れて行く", "tsurete iku", "つれていく", "Mengajak pergi orang", "弟を連れて行きます。", "Mengajak adik laki-laki pergi.", "N4", "kata_kerja");
add("連れて来る", "tsurete kuru", "つれてくる", "Membawa orang kemari", "犬を連れて来ました。", "Membawa anjing ke sini.", "N4", "kata_kerja");
add("持って行く", "motte iku", "もっていく", "Membawa barang pergi", "お弁当を持って行きます。", "Membawa bekal makan bento.", "N5", "kata_kerja");
add("持って来る", "motte kuru", "もってくる", "Membawa barang kemari", "カメラを持って来ました。", "Membawa kamera ke sini.", "N5", "kata_kerja");
add("もらう", "morau", "もらう", "Menerima dari orang lain", "花をもらいました。", "Menerima bunga.", "N5", "kata_kerja");
add("あげる", "ageru", "あげる", "Memberikan ke orang lain", "プレゼントをあげます。", "Memberikan kado.", "N5", "kata_kerja");
add("くれる", "kureru", "くれる", "Memberi ke saya", "本をくれました。", "Dia memberi saya buku.", "N5", "kata_kerja");
add("吸う", "suu", "すう", "Menghisap / Menghirup", "たばこを吸いません。", "Saya tidak merokok.", "N5", "kata_kerja");
add("吹く", "fuku", "ふく", "Meniup", "口笛を吹きます。", "Meniup siulan.", "N5", "kata_kerja");
add("鳴る", "naru", "なる", "Berbunyi (bel/telepon)", "ベルが鳴りました。", "Belnya berbunyi.", "N4", "kata_kerja");
add("晴れ渡る", "harewataru", "はれわたる", "Cerah benderang", "青空が晴れ渡っています。", "Langit biru cerah benderang.", "N4", "kata_kerja");
add("太る", "futoru", "ふとる", "Bertambah gemuk", "少し太りました。", "Sedikit bertambah gemuk.", "N4", "kata_kerja");
add("痩せる", "yaseru", "やせる", "Menjadi kurus / Langsing", "運動で痩せました。", "Menjadi langsing karena olahraga.", "N4", "kata_kerja");

console.log(`Current items: ${rawWords.length}`);

// We will write the remainder systematically using comprehensive dictionary categories
fs.writeFileSync(path.join(__dirname, 'dump.json'), JSON.stringify(rawWords, null, 2));
