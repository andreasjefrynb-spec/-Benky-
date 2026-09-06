import { SSWSectorItem } from '../types';

export const sswSectors: SSWSectorItem[] = [
  {
    id: 'ssw-kaigo',
    sectorId: 'kaigo',
    name: '介護 (Kaigo - Perawat Lansia / Caregiver)',
    kanji: '介護業',
    english: 'Nursing Care / Caregiver',
    summary: 'Bidang perawatan lansia di panti jompo (Tokuyou, Rouken) dan kunjungan rumah di Jepang. Meliputi pendampingan mobilitas, makan, kebersihan diri, observasi tanda vital, dan komunikasi empati.',
    coreSkills: [
      'Bantuan Mobilitas (移動介助 Idou Kaijo: kursi roda, transfer tempat tidur)',
      'Bantuan Makan (食事介助 Shokuji Kaijo: pencegahan tersedak / go-en)',
      'Bantuan Ekskresi (排泄介助 Haisetsu Kaijo: pampers, toilet)',
      'Bantuan Mandi (入浴介助 Nyuuyoku Kaijo: cek suhu air 38-40°C)',
      'Pencatatan Rekam Medis Harian (介護記録 Kaigo Kiroku)'
    ],
    safetyProtocol: 'Selalu terapkan prinsip "Jiritsu Shien" (mendukung kemandirian lansia tanpa memaksakan bantuan berlebih). Waspadai risiko jatuh (tentou/tenraku) dengan selalu mengunci rem kursi roda (boki lock).',
    vocab: [
      { jp: 'りようしゃ (利用者)', reading: 'riyousha', id: 'Pengguna jasa / lansia yang dirawat' },
      { jp: 'くるまいす (車椅子)', reading: 'kurumaisu', id: 'Kursi roda' },
      { jp: 'ブレーキをかける', reading: 'bureeki o kakeru', id: 'Mengunci rem roda' },
      { jp: 'いどう (移動) / いじょう (移乗)', reading: 'idou / ijou', id: 'Pindah tempat / transfer dari ranjang ke kursi' },
      { jp: 'ごえん (誤嚥)', reading: 'goen', id: 'Tersedak makanan masuk ke saluran napas' },
      { jp: 'とろみ', reading: 'toromi', id: 'Pengental makanan/minuman agar tidak tersedak' },
      { jp: 'たいへんかん (体位変換)', reading: 'tai henkan', id: 'Ubah posisi baring miring untuk cegah luka dekubitus' },
      { jp: 'じょくそう (褥瘡)', reading: 'jokusou', id: 'Luka lecet baring (dekubitus / bedsore)' },
      { jp: 'バイタルサイン', reading: 'baitaru sain', id: 'Tanda vital (tensi, nadi, suhu, saturasi O2)' },
      { jp: 'おむつこうかん (オムツ交換)', reading: 'omutsu koukan', id: 'Penggantian pampers/popok dewasa' },
      { jp: 'みまもり (見守り)', reading: 'mimamori', id: 'Pengawasan santun dari dekat' }
    ],
    scenarios: [
      {
        title: 'Komunikasi Santun Membantu Bangun dari Tempat Tidur',
        situation: 'Menyiapkan lansia untuk sarapan pagi di ruang makan panti.',
        japanese: '田中さん、おはようございます。よく眠れましたか。朝ご飯の時間ですので、起き上がりましょうか。気分はいかがですか。',
        indonesian: 'Kakek Tanaka, selamat pagi. Apakah tidurnya nyenyak? Karena sudah waktunya sarapan, bagaimana kalau kita bangun? Bagaimana kondisi perasaan kakek?'
      },
      {
        title: 'Pencegahan Tersedak Saat Makan',
        situation: 'Mengobservasi lansia yang memiliki kesulitan menelan (dysphagia).',
        japanese: 'お茶にとろみをつけてあります。一口ずつ、ゆっくりよく噛んで召し上がってくださいね。喉に詰まっていないか確認します。',
        indonesian: 'Tehnya sudah diberi cairan pengental. Silakan dinikmati sedikit demi sedikit dan dikunyah perlahan ya. Saya cek apakah ada yang tersangkut di tenggorokan.'
      }
    ]
  },
  {
    id: 'ssw-gaishoku',
    sectorId: 'gaishoku',
    name: '外食業 (Gaishoku - Restoran & Jasa Makanan)',
    kanji: '外食業',
    english: 'Food Service Industry',
    summary: 'Industri restoran keluarga, izakaya, kedai ramen, dan kafe di Jepang. Meliputi pelayanan pelanggan (Sekkyaku), manajemen kebersihan higienis (HACCP), persiapan dapur (Chikou/Chouri), dan penanganan alergi makanan.',
    coreSkills: [
      'Pelayanan Meja & Kasir (接客 Sekkyaku: pemesanan, penyajian)',
      'Penanganan Alergi Pangan (アレルギー対応: 8 alergen utama di Jepang)',
      'Standar HACCP & Pencucian Tangan Higienis (衛生管理)',
      'Persiapan Masak Cepat (仕込み Shikomi & 調理 Chouri)',
      'Penutupan Kasir & Sanitasi Toko (閉店作業 Heiten sagyou)'
    ],
    safetyProtocol: 'Waspadai kontaminasi silang (kousa osen) antara daging mentah dan sayur siap saji. Gunakan talenan berbeda warna. Jangan pernah bekerja jika sedang menderita diare atau muntah (risiko Norovirus).',
    vocab: [
      { jp: 'いらっしゃいませ', reading: 'irasshaimase', id: 'Selamat datang' },
      { jp: 'なんめいさまですか (何名様ですか)', reading: 'nan-mei-sama desu ka', id: 'Berapa orang tamu?' },
      { jp: 'ごちゅうもんをどうぞ (ご注文をどうぞ)', reading: 'go-chuumon o douzo', id: 'Silakan pesanannya' },
      { jp: 'かしこまりました', reading: 'kashikomarimashita', id: 'Dimengerti dengan hormat' },
      { jp: 'おまたせいたしました (お待たせいたしました)', reading: 'omatase itashimashita', id: 'Mohon maaf telah membuat menunggu' },
      { jp: 'しょうみきげん (賞味期限)', reading: 'shoumi kigen', id: 'Batas tanggal kelezatan terbaik makanan' },
      { jp: 'しょうひきげん (消費期限)', reading: 'shouhi kigen', id: 'Batas tanggal aman konsumsi (kedaluwarsa mutlak)' },
      { jp: 'しょくちゅうどく (食中毒)', reading: 'shokuchuudoku', id: 'Keracunan makanan' },
      { jp: 'アレルゲン (特定原材料)', reading: 'arerugen', id: 'Zat alergen (telur, susu, gandum, udang, kepiting, kacang, soba)' },
      { jp: 'てあらい (手洗いマニュアル)', reading: 'tearai manyuaru', id: 'Prosedur cuci tangan higienis 2x berulang' }
    ],
    scenarios: [
      {
        title: 'Menerima Tamu Datang & Mengonfirmasi Alergi',
        situation: 'Tamu baru tiba di depan pintu restoran.',
        japanese: 'いらっしゃいませ！２名様でいらっしゃいますね。禁煙席へご案内いたします。食物アレルギーなどお持ちの食材はございますでしょうか。',
        indonesian: 'Selamat datang! Dua orang tamu ya. Mari saya antarkan ke meja area bebas rokok. Apakah ada bahan makanan tertentu yang alergi?'
      }
    ]
  },
  {
    id: 'ssw-seizou',
    sectorId: 'seizou',
    name: '飲食料品製造業 (Inshokuryouhin Seizou - Pengolahan Makanan & Minuman)',
    kanji: '飲食料品製造業',
    english: 'Food and Beverage Manufacturing',
    summary: 'Pabrik industri bento, roti, olahan daging, makanan laut kemasan, dan minuman. Bekerja di lini konveyor produksi dengan kepatuhan sterilisasi udara (air shower), pakaian bersih (sanitary suit), dan pencegahan benda asing.',
    coreSkills: [
      'Prosedur Masuk Ruang Bersih (エアシャワー Air Shower & Sticky Roller)',
      'Operasi Mesin Pengemas Otomatis (充填機・包装機 Housouki)',
      'Inspeksi Detektor Logam & X-Ray (異物混入検査 Ibutsu Konnyuu)',
      'Pengecekan Berat Bersih & Label Tanggal (計量・日付印字)',
      'Sanitasi Lini Produksi Akhir Hari (洗浄・殺菌 Sakkin)'
    ],
    safetyProtocol: 'Aturan 5S wajib: Seiri (Ringkas), Seiton (Rapi), Seisou (Resik), Seiketsu (Rawat), Shitsuke (Rajin). Rambut dan perhiasan dilarang keras terlihat dari tudung kepala pabrik.',
    vocab: [
      { jp: 'いぶつこんにゅう (異物混入)', reading: 'ibutsu konnyuu', id: 'Tercampurnya benda asing (rambut, serangga, logam)' },
      { jp: 'きんぞくけんしゅつき (金属検出機)', reading: 'kinzoku kenshutsuki', id: 'Mesin pendeteksi serpihan logam' },
      { jp: 'ねんちゃくローラー (コロコロ)', reading: 'nenchaku rooraa', id: 'Rol perekat debu/rambut baju kerja' },
      { jp: 'さっきん (殺菌) / しょうどく (消毒)', reading: 'sakkin / shoudoku', id: 'Sterilisasi bakteri / disinfeksi alkohol' },
      { jp: 'ベルトコンベア', reading: 'beruto konbea', id: 'Ban berjalan (conveyor belt)' },
      { jp: 'はいき (廃棄)', reading: 'haiki', id: 'Pembuangan produk cacat / reject' }
    ],
    scenarios: [
      {
        title: 'Pemeriksaan Pencegahan Benda Asing Sebelum Masuk Lini',
        situation: 'Pemeriksaan saling berpasangan (buddies check) di depan ruang produksi.',
        japanese: 'お互いに粘着ローラーをかけましょう。帽子の隙間から髪の毛が出ていないか、指輪や時計を外しているか、相互確認をお願いします。',
        indonesian: 'Mari kita saling membersihkan baju dengan roller perekat. Tolong saling periksa apakah ada rambut keluar dari topi dan apakah cincin/jam sudah dilepas.'
      }
    ]
  },
  {
    id: 'ssw-nogyo',
    sectorId: 'nogyo',
    name: '農業 (Nougyou - Pertanian & Peternakan)',
    kanji: '農業',
    english: 'Agriculture & Livestock',
    summary: 'Terbagi dalam dua spesialisasi: Pertanian Tanaman (Kousaku / Engei: sayuran, buah, padi di greenhouse dan ladang) dan Peternakan (Chikusan: sapi perah, babi, unggas telur/daging).',
    coreSkills: [
      'Penanaman & Pembibitan (定植 Teishoku & 育苗 Ikubyou)',
      'Pemangkasan & Penyerbukan (摘芽 Tekiga & 受粉 Jufun)',
      'Panen & Sortir Kualitas (収穫 Shuukaku & 選別 Senbetsu)',
      'Manajemen Suhu Rumah Kaca (ビニールハウス温度管理)',
      'Pemberian Pakan & Sanitasi Kandang (給餌 Kyuuji & 畜舎清掃)'
    ],
    safetyProtocol: 'Pencegahan stroke panas (Netchuushou) pada musim panas di dalam rumah kaca dengan minum air garam/elektrolit rutin. Waspada saat mengoperasikan traktor atau pisau panen.',
    vocab: [
      { jp: 'しゅうかく (収穫)', reading: 'shuukaku', id: 'Panen hasil tani' },
      { jp: 'せんべつ (選別)', reading: 'senbetsu', id: 'Penyortiran kelas ukuran dan mutu (A/B/C)' },
      { jp: 'ビニールハウス', reading: 'biniiru hausu', id: 'Greenhouse plastik pelindung tanaman' },
      { jp: 'ひりょう (肥料)', reading: 'hiryou', id: 'Pupuk penyubur tanah' },
      { jp: 'のうやく (農薬)', reading: 'nouyaku', id: 'Pestisida pembasmi hama' },
      { jp: 'ねっちゅうしょう (熱中症)', reading: 'netchuushou', id: 'Penyakit serangan sengatan panas (heatstroke)' },
      { jp: 'すいぶんほきゅう (水分補給)', reading: 'suibun hokyuu', id: 'Rehidrasi cairan tubuh secara berkala' }
    ],
    scenarios: [
      {
        title: 'Instruksi Standar Pemetikan Buah Tomat',
        situation: 'Pemanenan di ladang tomat hidroponik.',
        japanese: 'ヘタのすぐ上をハサミで切ってください。皮に傷をつけないように、丁寧にカゴへ入れましょう。赤みが９割以上のものを収穫してください。',
        indonesian: 'Potonglah memakai gunting tepat di atas tangkainya. Agar kulitnya tidak lecet, masukkan ke dalam keranjang dengan hati-hati. Petiklah yang kemerahannya sudah 90% ke atas.'
      }
    ]
  },
  {
    id: 'ssw-kensetsu',
    sectorId: 'kensetsu',
    name: '建設業 (Kensetsu - Konstruksi & Bangunan)',
    kanji: '建設業',
    english: 'Construction Industry',
    summary: 'Pembangunan infrastruktur, gedung, perumahan, pengerjaan beton, bekisting (Katawaku), pemasangan besi beton (Tekkin), dan perancah (Ashiba). Sangat menjunjung tinggi budaya keselamatan nol kecelakaan (Zero-Accident).',
    coreSkills: [
      'Pelatihan Prediksi Bahaya Pagi (KYT: 危険予知訓練 Kiken Yochi Kunren)',
      'Tunjuk & Sebut Pengaman (指差呼称 Yubisashi Koshou: "Yoshi!")',
      'Pemasangan Sabuk Pengaman Gantung (フルハーネス型安全帯)',
      'Pembacaan Gambar Proyek (設計図・施工図 Sekkeizu)',
      'Pembersihan Material Berserakan (足元の整理整頓)'
    ],
    safetyProtocol: 'Wajib menggunakan Full-Harness Safety Belt saat bekerja pada ketinggian 2 meter atau lebih. Helm keselamatan (Anzenbou) dengan tali dagu terikat kencang.',
    vocab: [
      { jp: 'あんぜんぼう / ヘルメット (安全帽)', reading: 'anzenbou', id: 'Helm pengaman proyek' },
      { jp: 'あんぜんぐつ (安全靴)', reading: 'anzengutsu', id: 'Sepatu safety berujung pelat baja' },
      { jp: 'フルハーネス (安全帯)', reading: 'furu haanesu', id: 'Harness tali pengaman tubuh anti-jatuh' },
      { jp: 'あしば (足場)', reading: 'ashiba', id: 'Perancah scaffolding bangunan' },
      { jp: 'ゆびさしこしょう (指差呼称)', reading: 'yubisashi koshou', id: 'Metode menunjuk dan menyebut suara lantang ("...Yoshi!")' },
      { jp: 'ちょうれい (朝礼)', reading: 'chourei', id: 'Apel pagi proyek sebelum bekerja' },
      { jp: 'ごあんぜんに！(ご安全に)', reading: 'go-anzen ni!', id: 'Salam keselamatan kerja antar pekerja konstruksi' }
    ],
    scenarios: [
      {
        title: 'Yubisashi Koshou Sebelum Naik ke Perancah',
        situation: 'Pekerja memeriksa pengait tali harness sebelum menaiki tangga perancah.',
        japanese: '「フック掛けよし！あご紐よし！足場の手すりよし！ご安全に！」',
        indonesian: '"Kaitan hook aman! Tali dagu helm kencang aman! Pegangan perancah aman! Bekerjalah dengan aman!"'
      }
    ]
  },
  {
    id: 'ssw-jidousha',
    sectorId: 'jidousha',
    name: '自動車整備業 (Jidousha Seibi - Perawatan & Bengkel Otomotif)',
    kanji: '自動車整備業',
    english: 'Automobile Maintenance',
    summary: 'Bengkel servis resmi dan inspeksi berkala kendaraan bermotor di Jepang (Shaken). Meliputi servis mesin, sistem rem, suspensi, ganti oli, ban, dan kelistrikan kendaraan.',
    coreSkills: [
      'Inspeksi Kelaikan Kendaraan (法定点検 Houtei Tenken 12/24 Bulan)',
      'Penggantian Oli Mesin & Filter (エンジンオイル交換)',
      'Pengecekan Ketebalan Kampas Rem (ブレーキパッド残量確認)',
      'Pengencangan Baut dengan Kunci Torsi (トルクレンチ締付)',
      'Diagnosis Komputer OBD-II (電子故障診断機スキャン)'
    ],
    safetyProtocol: 'Saat mobil dinaikkan dengan hidrolik lift (Rigid Lift), pastikan Safety Lock sudah mengunci dengan bunyi "klik" sebelum masuk ke bawah kolong kendaraan.',
    vocab: [
      { jp: 'しゃけん (車検)', reading: 'shaken', id: 'Uji berkala kelaikan mobil resmi pemerintah' },
      { jp: 'ブレーキパッド', reading: 'bureeki paddo', id: 'Kampas rem' },
      { jp: 'トルクレンチ', reading: 'toruku renchi', id: 'Kunci momen torsi dengan standar Nm pasti' },
      { jp: 'タイヤこうかん (タイヤ交換)', reading: 'taiya koukan', id: 'Ganti ban mobil' },
      { jp: 'リフトアップ', reading: 'rifuto appu', id: 'Menaikkan mobil dengan mesin hidrolik' },
      { jp: 'はいきガス (排気ガス)', reading: 'haiki gasu', id: 'Gas buang knalpot mesin' }
    ],
    scenarios: [
      {
        title: 'Pemeriksaan Torsi Baut Roda Mobil',
        situation: 'Setelah penggantian ban mobil pelanggan.',
        japanese: 'トルクレンチを103ニュートンにセットしました。対角線の順番で４本のホイールナットを本締めします。「カチッ、締め付けよし！」',
        indonesian: 'Kunci torsi sudah diatur pada 103 Nm. Kencangkan 4 baut velg secara menyilang menyudut. "Klik, kekencangan baut aman!"'
      }
    ]
  },
  {
    id: 'ssw-shukuhaku',
    sectorId: 'shukuhaku',
    name: '宿泊業 (Shukuhaku - Perhotelan & Penginapan Ryokan)',
    kanji: '宿泊業',
    english: 'Hospitality & Hotel Industry',
    summary: 'Hotel bisnis, resort, dan penginapan tradisional Ryokan. Meliputi front desk, reservasi tamu asing, keramahan khas Jepang (Omotenashi), penataan kamar (Housekeeping), dan pemanduan fasilitas pemandian onsen.',
    coreSkills: [
      'Prosedur Check-in & Check-out Tamu (チェックイン手続き)',
      'Standar Bahasa Keigo Tingkat Tinggi (おもてなし接客)',
      'Housekeeping Merapikan Ranjang & Bed Making (客室清掃・ベッドメイク)',
      'Penjelasan Fasilitas Hotel & Jam Sarapan (館内案内)',
      'Penanganan Permintaan Khusus Tamu (客室リクエスト対応)'
    ],
    safetyProtocol: 'Penjagaan ketat privasi informasi pribadi tamu (Personal Data Protection) dan kesiagaan evakuasi bencana malam hari.',
    vocab: [
      { jp: 'おもてなし', reading: 'omotenashi', id: 'Keramahan dan ketulusan pelayanan khas Jepang' },
      { jp: 'チェックイン / チェックアウト', reading: 'chekkuin / chekkuauto', id: 'Proses kedatangan registrasi / proses kepulangan' },
      { jp: 'よやく (ご予約)', reading: 'yoyaku', id: 'Reservasi pemesanan kamar' },
      { jp: 'あずかりもの (お預かり物)', reading: 'azukarimono', id: 'Barang koper titipan tamu' },
      { jp: 'きんえんるーむ (禁煙ルーム)', reading: 'kin\'en ruumu', id: 'Kamar bebas rokok' },
      { jp: 'ちょうしょくけん (朝食券)', reading: 'choushoku-ken', id: 'Voucher kupon makan pagi hotel' }
    ],
    scenarios: [
      {
        title: 'Menyambut Tamu Check-in di Front Desk',
        situation: 'Tamu tiba di lobi hotel pada jam check-in siang.',
        japanese: 'いらっしゃいませ。ホテルグランドへようこそお越しくださいました。ご宿泊のご予約のお名前を伺ってもよろしいでしょうか。',
        indonesian: 'Selamat datang. Terima kasih atas kedatangan Anda di Hotel Grand. Bolehkah kami mengetahui nama untuk reservasi menginap Anda?'
      }
    ]
  },
  {
    id: 'ssw-cleaning',
    sectorId: 'cleaning',
    name: 'ビルクリーニング (Biru Kuriiningu - Pembersihan Gedung & Fasilitas)',
    kanji: 'ビルクリーニング',
    english: 'Building Cleaning Management',
    summary: 'Pembersihan profesional gedung perkantoran, pusat perbelanjaan, rumah sakit, dan stasiun bandara di Jepang. Menggunakan mesin polisher lantai, deterjen khusus pH terukur, dan pembersihan kaca bertingkat.',
    coreSkills: [
      'Penyedotan Debu Karpet Komersial (バキューム清掃)',
      'Pengupasan & Pelapisan Lilin Lantai (剥離作業・ワックス塗布)',
      'Sanitasi Higienis Toilet Umum (サニタリー衛生清掃)',
      'Penanganan Bahan Kimia Asam/Basa (洗剤の希釈倍率管理)',
      'Penggunaan Tanda Peringatan Lantai Basah (足元注意看板)'
    ],
    safetyProtocol: 'Jangan pernah mencampur deterjen pemutih klorin dengan deterjen asam karena akan memicu gas klorin beracun mematikan (Mazuru na Kiken!). Pasang selalu rambu "Lantai Basah Licin" (Ashimoto Chuui).',
    vocab: [
      { jp: 'ポリッシャー', reading: 'porisshaa', id: 'Mesin putar penggosok lantai' },
      { jp: 'ワックスがけ', reading: 'wakkusu-gake', id: 'Pelapisan lilin pelindung kilap lantai' },
      { jp: 'まぜるなきけん (混ぜるな危険)', reading: 'mazeru na kiken', id: 'Bahaya jangan dicampur (asam + klorin)' },
      { jp: 'じゅうたん / カーペット', reading: 'juutan / kaapetto', id: 'Karpet karpet permadani' },
      { jp: 'あしもとちゅうい (足元注意)', reading: 'ashimoto chuui', id: 'Peringatan hati-hati lantai licin' }
    ],
    scenarios: [
      {
        title: 'Memasang Rambu Peringatan Sebelum Mengepel Lantai Lobi',
        situation: 'Pembersihan lantai di lobi perkantoran saat jam kerja.',
        japanese: 'お客様が滑って転倒されないように、作業エリアの前後５メートルに「作業中・足元注意」の黄色いコーン看板を設置してからモップ掛けを開始します。',
        indonesian: 'Agar tamu tidak tergelincir jatuh, pasang kerucut pembatas kuning "Sedang Dikerjakan / Awas Licin" 5 meter di depan dan belakang area sebelum mulai mengepel.'
      }
    ]
  },
  {
    id: 'ssw-kikai',
    sectorId: 'kikai',
    name: '素形材・産業機械・電気電子 (Kikai Kinzoku - Manufaktur Mesin & Logam)',
    kanji: '素形材・産業機械製造業',
    english: 'Machinery, Metal Casting & Electronics',
    summary: 'Pabrik permesinan industri, pengecoran logam (Chuzou), pemesinan bubut CNC (Senban/Mashingu), pengelasan presisi (Yousetsu), dan perakitan komponen elektronika terpadu.',
    coreSkills: [
      'Pembacaan Gambar Teknik Mesin (機械図面 JIS規格)',
      'Pengukuran Akurat Mikrometer & Jangka Sorong (ノギス・マイクロメーター 0.01mm)',
      'Penggantian Mata Pahat Mesin Bubut (バイト・エンドミル交換)',
      'Pencegahan Terjepit Mesin Putar (巻き込まれ事故防止)',
      'Manajemen Listrik Statis Komponen IC (静電気防止リストバンド)'
    ],
    safetyProtocol: 'Dilarang keras memakai sarung tangan kain berserat (Gunte) saat mengoperasikan mesin berputar (bor meja, bubut), karena kain dapat tersangkut dan menggulung jari tangan.',
    vocab: [
      { jp: 'ノギス', reading: 'nogisu', id: 'Jangka sorong kaliper presisi' },
      { jp: 'マイクロメーター', reading: 'maikuro meetaa', id: 'Mikrometer sekrup (akurasi 0.001-0.01 mm)' },
      { jp: 'せんばん (旋盤)', reading: 'senban', id: 'Mesin bubut pemotong silinder' },
      { jp: 'まきこまれ (巻き込まれ)', reading: 'makikomare', id: 'Kecelakaan tersangkut/tergulung mesin putar' },
      { jp: 'ぐんてきんし (軍手禁止)', reading: 'gunte kinshi', id: 'Larangan memakai sarung tangan rajut' },
      { jp: 'ひやりはっと (ヒヤリ・ハット)', reading: 'hiyari hatto', id: 'Laporan insiden nyaris celaka untuk evaluasi' }
    ],
    scenarios: [
      {
        title: 'Pemeriksaan Kalibrasi Nol Jangka Sorong',
        situation: 'Sebelum mengukur diameter as poros produk bubut.',
        japanese: '測定前にノギスのジョーを合わせてゼロ点確認をします。目盛りにズレがないことを確認してからワークの外径を計測します。',
        indonesian: 'Sebelum pengukuran rapatkan rahang jangka sorong untuk memastikan titik nol. Setelah memastikan tidak ada pergeseran skala, baru ukur diameter luar benda kerja.'
      }
    ]
  },
  {
    id: 'ssw-zousen',
    sectorId: 'zousen',
    name: '造船・舶用工業 (Zousen - Galangan Kapal Laut & Mesin Kapal)',
    kanji: '造船・舶用工業',
    english: 'Shipbuilding & Marine Machinery',
    summary: 'Pembangunan kapal tanker, kapal kontainer, dan mesin kapal laut besar. Meliputi fabrikasi pelat baja tebal, pengelasan busur listrik (Arc Welding), pengecatan lambung kapal anti-karat, dan uji instalasi perpipaan kapal.',
    coreSkills: [
      'Teknik Pengelasan CO2 / MAG / TIG (炭酸ガスアーク溶接)',
      'Penyetelan Pelat Baja Raksasa (厚板ぎょう鉄・組立)',
      'Pekerjaan Ruang Tertutup Lambung Kapal (密閉空間・酸欠対策)',
      'Pengecatan Khusus Lapisan Lambung Kapal (ブラスト・重防食塗装)',
      'Pemberian Isyarat Crane Sling (玉掛け合図・玉掛け作業)'
    ],
    safetyProtocol: 'Bahaya kekurangan oksigen (Sanketsu) dan gas beracun di tangki tertutup ganda lambung kapal. Wajib ventilasi blower dan tes gas multi-meter sebelum ada yang masuk.',
    vocab: [
      { jp: 'ようせつ (溶接)', reading: 'yousetsu', id: 'Pengelasan logam' },
      { jp: 'さんけつ (酸欠・酸素欠乏症)', reading: 'sanketsu', id: 'Kekurangan oksigen pada ruang kedap' },
      { jp: 'たまかけ (玉掛け)', reading: 'tamakake', id: 'Pemasangan tali kawat sling kargo derek crane' },
      { jp: 'こうばん (甲板)', reading: 'kouban', id: 'Geladak kapal laut' },
      { jp: 'ぼうどくマスク (防毒マスク)', reading: 'boudoku masuku', id: 'Masker respirator gas beracun' }
    ],
    scenarios: [
      {
        title: 'Pengecekan Kadar Oksigen Sebelum Memasuki Tangki Kapal',
        situation: 'Pengelasan di dalam tangki ballast kapal.',
        japanese: '酸素濃度計で計測しました。酸素濃度21%で基準クリアです。換気ファンを作動させたまま作業に入ります。',
        indonesian: 'Sudah diukur memakai gas meter oksigen. Kadar oksigen 21% memenuhi batas standar aman. Blower ventilasi tetap dinyalakan saat kita masuk bekerja.'
      }
    ]
  },
  {
    id: 'ssw-koku',
    sectorId: 'koku',
    name: '航空業 (Koukuu - Penanganan Darat Bandara & Aviasi)',
    kanji: '航空業',
    english: 'Aviation Ground Handling',
    summary: 'Pelayanan penanganan pesawat di apron landasan pacu bandara internasional/domestik Jepang (Ground Handling). Meliputi pengangkutan bagasi kontainer, marshalling pemanduan pesawat, pushback pesawat, dan pembersihan kabin kabin pesawat.',
    coreSkills: [
      'Pemanduan Pesawat Masuk Gate (マーシャリング Marshalling)',
      'Operasi Kendaraan Dorong Pesawat (プッシュバック牽引車)',
      'Bongkar Muat Kontainer Bagasi Pesawat (ULDローディング)',
      'Pengisian Air Minum & Sanitasi Lavatory Pesawat (給排水作業)',
      'Pemeriksaan FOD Serpihan di Apron (外国物質破片除去 FOD)'
    ],
    safetyProtocol: 'Zona semburan mesin jet (Jet Blast Hazard) dan hisapan mesin jet sangat mematikan. Dilarang melintasi garis merah saat lampu anti-collision beacon merah pesawat menyala berputar.',
    vocab: [
      { jp: 'エプロン / 駐機場', reading: 'epuron / chuukijou', id: 'Apron tempat parkir pesawat' },
      { jp: 'プッシュバック', reading: 'pusshubakku', id: 'Mendorong pesawat mundur meninggalkan gerbang' },
      { jp: 'マーシャラー', reading: 'maasharaa', id: 'Petugas juru parkir pemandu pesawat dengan paddle' },
      { jp: 'てにもつ (手荷物仕分け)', reading: 'tenimotsu shiwake', id: 'Pemilahan bagasi penumpang bandara' },
      { jp: 'イヤーマフ (防音保護具)', reading: 'iyaamafu', id: 'Pelindung telinga dari kebisingan mesin pesawat' }
    ],
    scenarios: [
      {
        title: 'Komunikasi Keselamatan Ramp Sebelum Pesawat Mendekat',
        situation: 'Pesawat sedang berbelok masuk ke garis henti apron.',
        japanese: 'ビーコンライト点滅中、エンジン停止確認まで絶対に機体に近づかないでください。車止めチョークの準備よし！',
        indonesian: 'Lampu suar merah masih berkedip, jangan pernah mendekati badan pesawat sampai mesin benar-benar mati. Balok ganjal roda siap!'
      }
    ]
  },
  {
    id: 'ssw-gyogyo',
    sectorId: 'gyogyo',
    name: '漁業 (Gyogyou - Perikanan & Budidaya Akuakultur Laut)',
    kanji: '漁業・養殖業',
    english: 'Fishery & Aquaculture',
    summary: 'Operasi di kapal penangkap ikan laut (jala jaring, rawai, pancing cumi) dan tambak budidaya laut (kerang mutiara, tiram, rumput laut nori, ikan salmon). Mengolah, mendinginkan es, dan menjaga kualitas kesegaran laut.',
    coreSkills: [
      'Pengoperasian Alat Tangkap Jala & Winch (網さばき・揚網機)',
      'Penanganan Kesegaran Ikan (活け締め Ikejime & Chilled Ice)',
      'Manajemen Keramba Apung (生簀管理 Ikesu Kanri)',
      'Perbaikan Jaring yang Robek (網修理・ロープワーク Knot)',
      'Prosedur Darurat Jatuh ke Laut (落水者救命訓練 Man-Overboard)'
    ],
    safetyProtocol: 'Selalu kenakan rompi pelampung penyelamat (Life Jacket) otomatis saat berada di dek kapal laut. Jangan pernah menginjak di dalam gulungan tali kapal yang sedang ditarik.',
    vocab: [
      { jp: 'きゅうめいどうい (救命胴衣)', reading: 'kyuumeidoui', id: 'Rompi pelampung penyelamat hidup (life jacket)' },
      { jp: 'ぎょせん (漁船)', reading: 'gyosen', id: 'Kapal perahu nelayan' },
      { jp: 'あみ (漁網)', reading: 'ami / gyoumou', id: 'Jala penangkap ikan' },
      { jp: 'いけす (生簀)', reading: 'ikesu', id: 'Bak keramba penampungan ikan hidup' },
      { jp: 'ロープワーク', reading: 'roopu waaku', id: 'Keahlian membuat simpul tali temali kapal' }
    ],
    scenarios: [
      {
        title: 'Prosedur Mengangkat Jala ke Dek Kapal',
        situation: 'Winch mesin sedang menarik jala penuh tangkapan ikan.',
        japanese: 'ウィンチ始動します！足元をロープの輪に入れないように注意してください！全員ライフジャケット装着よし！',
        indonesian: 'Mesin derek winch dinyalakan! Awas jangan sampai kaki menginjak di dalam lingkar gulungan tali! Semua rompi pelampung terpasang aman!'
      }
    ]
  }
];
