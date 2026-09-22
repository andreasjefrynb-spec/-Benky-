import { ShinKanzenItem } from '../types';

export const shinKanzenData: ShinKanzenItem[] = [
  // ==================== 1. BUNPOU: HUBUNGAN WAKTU ====================
  {
    id: 'sk-n3-1',
    level: 'N3',
    section: 'bunpou',
    unitTitleJp: '第1章：時の関係を表す表現（〜うちに・〜最中に・〜たとたん）',
    unitTitleId: 'Bab 1: Ekspresi Hubungan Waktu (Uchi ni, Saichuu ni, To tan)',
    focusCore: 'Membedakan batas waktu kesempatan, interupsi di tengah aksi, dan kejadian tak terduga seketika.',
    explanation: 'Pada level N3, soal ujian Shin Kanzen Master sering menguji ketelitian nuansa: apakah suatu aksi terjadi selagi kondisi masih berlangsung (うちに), diinterupsi tepat di puncak aktivitas (最中に), atau disusul hal mengejutkan begitu selesai (たとたん).',
    patternsOrPoints: [
      {
        title: '〜うちに (~ uchi ni) [Sebelum Situasi Berubah]',
        formula: 'Kata Kerja Kamus/Nai/Te iru + うちに / KS-i + うちに / KS-na + なうちに / KB + のうちに',
        nuance: 'Melakukan sesuatu selagi kondisi belum berganti (ada batasan waktu alami atau batas psikologis).',
        trapWarning: 'Jangan gunakan pada hal yang memiliki batas waktu jam pasti (seperti "sebelum jam 5" gunakan made ni).',
        examples: [
          {
            jp: '忘れないうちに、メモを取っておこう。',
            reading: 'Wasurenai uchi ni, memo o totte okou.',
            id: 'Selagi belum lupa, mari kita catat memo.'
          },
          {
            jp: 'スープが温かいうちに召し上がってください。',
            reading: 'Suupu ga atatakai uchi ni meshiagatte kudasai.',
            id: 'Silakan nikmati selagi supnya masih hangat.'
          }
        ]
      },
      {
        title: '〜最中に (~ saichuu ni) [Tepat di Puncak Tindakan]',
        formula: 'Kata Kerja [Te iru] + 最中に / KB + の最中に',
        nuance: 'Tepat di tengah-tengah puncak konsentrasi suatu perbuatan, tiba-tiba terjadi interupsi tak terduga yang mengganggu.',
        trapWarning: 'Kalimat belakang biasanya berupa peristiwa mengejutkan dari luar yang tidak direncanakan pembicara.',
        examples: [
          {
            jp: '大事な会議の最中に、携帯電話が鳴り響いた。',
            reading: 'Daiji na kaigi no saichuu ni, keitaidenwa ga narihibiita.',
            id: 'Tepat di tengah-tengah rapat penting, ponsel berdering keras.'
          }
        ]
      },
      {
        title: '〜たとたん（に） (~ ta totan ni) [Seketika Terjadi Kejutan]',
        formula: 'Kata Kerja Bentuk [Ta] + とたん（に）',
        nuance: 'Begitu selesai aksi A, seketika terjadi peristiwa B yang tidak disengaja oleh pembicara.',
        trapWarning: 'Kalimat belakang TIDAK BOLEH memuat ajakan, perintah, atau niat kehendak pembicara (tidak boleh ~mashou / ~te kudasai).',
        examples: [
          {
            jp: '窓を開けたとたん、冷たい風が吹き込んできた。',
            reading: 'Mado o aketa totan, tsumetai kaze ga fukikonde kita.',
            id: 'Begitu jendela dibuka, seketika angin dingin berhembus masuk ke dalam.'
          }
        ]
      }
    ],
    confusingPairsComparison: {
      patternA: '〜うちに (Uchi ni)',
      patternB: '〜あいだに (Aida ni)',
      difference: 'Aida ni menunjukkan rentang waktu objektif dari awal hingga akhir batas waktu (misal: "selama ibu tidur, saya membaca"). Sedangkan Uchi ni menekankan unsur psikologis: mumpung situasi belum berganti (misal: "selagi sup masih hangat").',
      exampleA: '温かいうちにどうぞ。(Silakan nikmati selagi hangat).',
      exampleB: '夏休みの間に旅行した。(Bepergian selama liburan musim panas).'
    },
    masteryDrill: [
      {
        questionJp: '赤ちゃんが寝ている（　　）、急いで夕食の準備をしてしまおう。',
        options: ['うちに', 'とたんに', '最中に', 'ばかりに'],
        correctIndex: 0,
        analysisId: '赤ちゃんが寝ている (selagi bayi masih tertidur) menggambarkan jendela waktu sebelum bayi terbangun, sehingga pasangan yang paling alami adalah うちに.'
      },
      {
        questionJp: 'スピーチの（　　）、急にマイクの電源が切れてしまった。',
        options: ['うちに', '最中に', '最寄り', '次第'],
        correctIndex: 1,
        analysisId: 'Spidol waktu yang menunjukkan gangguan tak terduga tepat di tengah peristiwa formal adalah 最中に.'
      }
    ]
  },

  // ==================== 2. BUNPOU: SEBAB AKIBAT & KONTRAS ====================
  {
    id: 'sk-n3-2',
    level: 'N3',
    section: 'bunpou',
    unitTitleJp: '第2章：原因・理由と予想外の結末（〜せいで・〜おかげで・〜ばかりに・〜わりに）',
    unitTitleId: 'Bab 2: Sebab-Akibat & Hasil di Luar Perkiraan (Sei de, Okage de, Bakari ni, Wari ni)',
    focusCore: 'Mengidentifikasi polaritas positif vs negatif dari alasan, serta kontras perbandingan ekspektasi.',
    explanation: 'Shin Kanzen Master menekankan bahwa pemilihan konjungsi sebab-akibat bergantung erat pada penilaian emosional penutur: apakah penutur bersyukur (おかげで), menyalahkan/merasa sial (せいで), menyesali satu keteledoran kecil (ばかりに), atau merasa hasilnya tidak sepadan dengan ekspektasi umum (わりに).',
    patternsOrPoints: [
      {
        title: '〜おかげで / 〜せいで (~ okage de / ~ sei de) [Positif vs Negatif]',
        formula: 'Bentuk Biasa / KB + のおかげで（Positif） / せいで（Negatif）',
        nuance: 'Okage de mengekspresikan rasa syukur atas keberhasilan. Sei de mengekspresikan keluhan atau menyalahkan pihak lain atas kegagalan.',
        trapWarning: 'Jangan gunakan okage de untuk peristiwa celaka kecuali bernada sarkasme.',
        examples: [
          {
            jp: '良い先生に巡り会えたおかげで、勉強が楽しくなった。',
            reading: 'Yoi sensei ni meguriaeta okage de, benkyou ga tanoshiku natta.',
            id: 'Berkat berkesempatan bertemu guru yang baik, belajar jadi menyenangkan.'
          },
          {
            jp: '大雨のせいで、イベントが中止になってしまった。',
            reading: 'Ooame no sei de, ibento ga chuushi ni natte shimatta.',
            id: 'Gara-gara hujan lebat, acara terpaksa dibatalkan.'
          }
        ]
      },
      {
        title: '〜ばかりに (~ bakari ni) [Hanya Karena Satu Hal Sepele Berakibat Fatal]',
        formula: 'Bentuk Biasa / [Ta] + ばかりに',
        nuance: 'Mengekspresikan penyesalan mendalam karena satu penyebab tunggal yang tampak remeh berujung pada bencana besar.',
        examples: [
          {
            jp: 'お金を持っていなかったばかりに、恥ずかしい思いをした。',
            reading: 'Okane o motte inakatta bakari ni, hazukashii omoi o shita.',
            id: 'Hanya gara-gara saat itu tidak membawa uang, saya menanggung rasa malu.'
          }
        ]
      },
      {
        title: '〜わりに（は） (~ wari ni wa) [Untuk Ukuran Standar Tersebut]',
        formula: 'Bentuk Biasa / KB + の + わりに（は）',
        nuance: 'Hasil yang diperoleh tidak selaras dengan standar atau harga yang dibayangkan secara logis.',
        examples: [
          {
            jp: 'この店は値段が高いわりに、接客態度があまり良くない。',
            reading: 'Kono mise wa nedan ga takai wari ni, sekkyaku taido ga amari yoku nai.',
            id: 'Toko ini untuk ukuran harganya yang mahal, keramahan pelayanannya kurang memuaskan.'
          }
        ]
      }
    ],
    confusingPairsComparison: {
      patternA: '〜わりに（は） (Wari ni wa)',
      patternB: '〜にしては (Ni shite wa)',
      difference: 'Wari ni wa membandingkan standar umum yang luas (misal: "untuk ukuran harganya", "untuk ukuran usianya"). Sedangkan Ni shite wa digunakan pada fakta atau data angka konkret yang spesifik (misal: "untuk ukuran anak 5 tahun", "untuk ukuran baru belajar 2 bulan").',
      exampleA: '年のわりには若く見える。(Untuk ukuran usianya, ia tampak awet muda).',
      exampleB: '2月にしては暖かい。(Untuk ukuran bulan Februari yang biasanya puncak dingin, hari ini hangat).'
    },
    masteryDrill: [
      {
        questionJp: '電車の事故の（　　）、試験の開始時間に間に合わなかった。',
        options: ['せいで', 'おかげで', 'わりに', '反面'],
        correctIndex: 0,
        analysisId: 'Akibat buruk yang merugikan (terlambat ikut ujian karena kecelakaan kereta) -> せいで.'
      },
      {
        questionJp: '彼はプロのサッカー選手（　　）、足がそれほど速くない。',
        options: ['にしては', 'せいで', 'おかげで', 'ばかりに'],
        correctIndex: 0,
        analysisId: 'Diperbandingkan dengan figur status spesifik "seorang pemain sepak bola profesional" -> にしては.'
      }
    ]
  },

  // ==================== 3. BUNPOU: KONDISI, BATASAN & KEWAJIBAN ====================
  {
    id: 'sk-n3-3',
    level: 'N3',
    section: 'bunpou',
    unitTitleJp: '第3章：条件・限定と義務（〜限り・〜に限り・〜さえ〜ば・〜わけにはいかない）',
    unitTitleId: 'Bab 3: Kondisi, Pembatasan & Tanggung Jawab Moral (Kagiri, Sae...ba, Wake ni wa ikanai)',
    focusCore: 'Memahami batas syarat mutlak dan norma sosial yang melarang tindakan sembrono.',
    explanation: 'Bagian ini menguji kemampuan memahami prasyarat mutlak: pembatasan periode selama kondisi dipenuhi (限り), pengecualian khusus untuk pihak tertentu (に限り), satu-satunya syarat minimal yang dibutuhkan (さえ〜ば), dan beban moral yang membatasi tindakan seseorang (わけにはいかない).',
    patternsOrPoints: [
      {
        title: '〜限り（は） (~ kagiri wa) [Selama Kondisi Terpenuhi]',
        formula: 'KK Kamus/Nai + 限り / KS-i + 限り / KB + である限り',
        nuance: 'Selama keadaan A terus bertahan, maka status B akan senantiasa berlanjut.',
        examples: [
          {
            jp: '生きている限り、学び続けたい。',
            reading: 'Ikite iru kagiri, manabitsuzuketai.',
            id: 'Selama masih diberi nafas kehidupan, saya ingin terus belajar.'
          }
        ]
      },
      {
        title: '〜さえ〜ば (~ sae ~ ba) [Asalkan Hanya Satu Hal Ini Saja Terpenuhi]',
        formula: 'Kata Benda + さえ + KK Bentuk [Ba] / KS-i [kereba] / KS-na [nara]',
        nuance: 'Jika prasyarat minimal yang satu ini sudah tercukupi, hal-hal lain tidak menjadi masalah.',
        examples: [
          {
            jp: '体さえ健康なら、どんな困難も乗り越えられる。',
            reading: 'Karada sae kenkou nara, donna konnan mo norikoerareru.',
            id: 'Asalkan tubuh sehat, kesulitan macam apa pun pasti dapat diatasi.'
          }
        ]
      },
      {
        title: '〜わけにはいかない (~ wake ni wa ikanai) [Pantang Dilakukan Karena Etika]',
        formula: 'Kata Kerja Kamus / Nai + わけにはいかない',
        nuance: 'Secara perasaan pribadi mungkin ingin, namun dari segi norma masyarakat atau etika profesional tidak boleh dilakukan.',
        examples: [
          {
            jp: '大事な顧客との約束だから、サボるわけにはいかない。',
            reading: 'Daiji na kokyaku to no yakusoku dakara, saboru wake ni wa ikanai.',
            id: 'Karena ini adalah janji temu dengan klien penting, pantang bagi saya untuk membolos.'
          }
        ]
      }
    ],
    confusingPairsComparison: {
      patternA: '〜わけにはいかない (Wake ni wa ikanai)',
      patternB: '〜てはいけない (Te wa ikenai)',
      difference: 'Te wa ikenai adalah larangan objektif dari luar (aturan hukum atau rambu). Sedangkan Wake ni wa ikanai mencerminkan pertimbangan etika internal pembicara sendiri yang menolak bertindak tidak bertanggung jawab.',
      exampleA: '仕事を途中で放り出すわけにはいかない。(Saya tidak mungkin menelantarkan pekerjaan di tengah jalan begitu saja).',
      exampleB: 'ここでタバコを吸ってはいけない。(Dilarang merokok di sini).'
    },
    masteryDrill: [
      {
        questionJp: 'お金（　　）あれば、何でも手に入ると考えるのは間違いだ。',
        options: ['さえ', 'こそ', 'ばかり', 'のみ'],
        correctIndex: 0,
        analysisId: 'Bentuk syarat minimal: Kata Benda + さえ + あれ（ば） -> お金さえあれば.'
      },
      {
        questionJp: '熱があって辛いが、今日は重要な試験なので休む（　　）いかない。',
        options: ['わけには', 'とおりには', 'ように', 'せいで'],
        correctIndex: 0,
        analysisId: 'Beban tanggung jawab internal yang menahan seseorang agar tidak mangkir: わけにはいかない.'
      }
    ]
  },

  // ==================== 4. GOI: KATA KERJA MAJEMUK JEBAKAN ====================
  {
    id: 'sk-n3-4',
    level: 'N3',
    section: 'goi',
    unitTitleJp: '第4章：紛らわしい複合動詞マスター（〜出す・〜込む・〜直す・〜切る）',
    unitTitleId: 'Bab 4: Penguasaan Kata Kerja Majemuk Jebakan N3 (Fukugoudoushi)',
    focusCore: 'Memahami perubahan makna sistematis pada verba kedua dalam kata kerja majemuk.',
    explanation: 'Soal kosakata N3 dalam Shin Kanzen Master sangat sering memunculkan kata kerja majemuk (複合動詞). Penguasaan makna verba bantu seperti 〜出す (spontan muncul ke luar), 〜込む (masuk mendalam), 〜直す (mengulang demi memperbaiki), dan 〜切る (menuntaskan sampai habis) adalah kunci nilai tinggi.',
    patternsOrPoints: [
      {
        title: '〜出す (~ dasu) [Spontan Meledak / Muncul ke Permukaan]',
        formula: 'KK Masu stem + 出す',
        nuance: 'Perubahan mendadak yang tidak terduga, atau mengeluarkan sesuatu dari dalam ke luar.',
        examples: [
          {
            jp: '赤ちゃんが突然泣き出した。',
            reading: 'Akachan ga totsuzen nakidashita.',
            id: 'Bayi itu tiba-tiba meledak menangis.'
          },
          {
            jp: '新しいアイデアを生み出す。',
            reading: 'Atarashii aidea o umidasu.',
            id: 'Melahirkan dan memunculkan ide-ide baru.'
          }
        ]
      },
      {
        title: '〜込む (~ komu) [Masuk ke Dalam / Terkonsentrasi Penuh]',
        formula: 'KK Masu stem + 込む',
        nuance: 'Gerakan menembus ke dalam fisik atau tenggelam dalam konsentrasi pikiran.',
        examples: [
          {
            jp: '難しい問題について深く考え込む。',
            reading: 'Muzukashii mondai ni tsuite fukaku kangaekomu.',
            id: 'Tenggelam dalam perenungan mendalam mengenai persoalan pelik.'
          },
          {
            jp: '荷物を車に積み込む。',
            reading: 'Nimotsu o kuruma ni tsumikomu.',
            id: 'Memuat barang-barang masuk ke dalam mobil.'
          }
        ]
      },
      {
        title: '〜直す (~ naosu) [Mengulang Demi Koreksi & Perbaikan]',
        formula: 'KK Masu stem + 直す',
        nuance: 'Melakukan kembali perbuatan yang sama sekali lagi agar hasilnya menjadi lebih sempurna.',
        examples: [
          {
            jp: '誤字が多いので、レポートを最初から書き直した。',
            reading: 'Goji ga ooi node, repooto o saisho kara kakinaoshita.',
            id: 'Karena banyak salah ketik, saya menulis ulang laporan dari awal.'
          }
        ]
      }
    ],
    confusingPairsComparison: {
      patternA: '〜出す (Dasu) vs 〜始める (Hajimeru)',
      patternB: '〜切る (Kiru) vs 〜終える (Oeru)',
      difference: 'Dasu menekankan permulaan yang spontan dan mengejutkan (misal: tiba-tiba turun hujan 降り出す). Hajimeru adalah permulaan biasa yang terencana (mulai belajar 勉強し始める). Kiru menekankan tuntas habis sampai ke batas (habis terjual 売り切れる), sedangkan Oeru adalah tahap penyelesaian biasa.',
      exampleA: '雨が突然降り出した。(Hujan tiba-tiba turun deras).',
      exampleB: '100キロを走り切った。(Berlari tuntas 100 km hingga titik batas akhir).'
    },
    masteryDrill: [
      {
        questionJp: '先生に指摘された箇所をもう一度（　　）てください。',
        options: ['見直して', '見出して', '見切って', '見込んで'],
        correctIndex: 0,
        analysisId: 'Memeriksa kembali untuk mengoreksi kesalahan: 見直す (minaosu).'
      },
      {
        questionJp: '映画の悲しい結末を見て、観客が思わず（　　）しまった。',
        options: ['泣き出して', '泣き直して', '泣き切って', '泣き込んで'],
        correctIndex: 0,
        analysisId: 'Spontan tak tertahankan mulai menangis: 泣き出す (nakidasu).'
      }
    ]
  },

  // ==================== 5. KANJI: HOMOFON & PEMILAHAN KONTEKS ====================
  {
    id: 'sk-n3-5',
    level: 'N3',
    section: 'kanji',
    unitTitleJp: '第5章：同音異義語と漢字の使い分け（測る・計る・量る / 治す・直す）',
    unitTitleId: 'Bab 5: Kanji Homofon & Pemilahan Konteks (Hakaru, Naosu, Toru)',
    focusCore: 'Membedakan penulisan huruf kanji yang memiliki pelafalan baca sama namun maknanya berlainan.',
    explanation: 'Di JLPT N3, soal kanji paling banyak menjebak peserta pada kelompok homofon (同音異義語). Membedakan kanji "Hakaru" (mengukur panjang/waktu/berat), "Naosu" (menyembuhkan sakit vs mereparasi barang rusak), dan "Toru" (mengambil foto, memetik buah, menangkap ikan) adalah penguji pemahaman mendalam.',
    patternsOrPoints: [
      {
        title: '「はかる」の使い分け (Hakaru: Mengukur)',
        nuance: '測る (panjang, luas, kedalaman), 計る (waktu, suhu, denyut nadi), 量る (berat, timbangan beban), 図る (merencanakan strategi).',
        examples: [
          {
            jp: '長さを測る / 時間を計る / 体重を量る',
            reading: 'Nagasa o hakaru / Jikan o hakaru / Taijuu o hakaru',
            id: 'Mengukur panjang (測) / Mengukur waktu (計) / Menimbang bobot badan (量)'
          }
        ]
      },
      {
        title: '「なおす」の使い分け (Naosu: Memperbaiki / Menyembuhkan)',
        nuance: '直す (memperbaiki benda mati, mengoreksi teks), 治す (menyembuhkan penyakit tubuh dan luka hayati).',
        examples: [
          {
            jp: '時計を直す / 病気を治す',
            reading: 'Tokei o naosu / Byouki o naosu',
            id: 'Mereparasi jam tangan (直) / Menyembuhkan sakit penyakit (治)'
          }
        ]
      }
    ],
    masteryDrill: [
      {
        questionJp: '荷物の重さを［はかる］。適切な漢字は？',
        options: ['量る', '測る', '計る', '図る'],
        correctIndex: 0,
        analysisId: 'Mengukur berat/bobot massa menggunakan timbangan: 量る (hakaru).'
      },
      {
        questionJp: '風邪を早く［なおす］ために薬を飲んだ。適切な漢字は？',
        options: ['治す', '直す', '修す', '改す'],
        correctIndex: 0,
        analysisId: 'Menyembuhkan penyakit tubuh biologis: 治す (naosu).'
      }
    ]
  },

  // ==================== 6. DOKKAI: TEKNIK MEMBEDAH WACANA ====================
  {
    id: 'sk-n3-6',
    level: 'N3',
    section: 'dokkai',
    unitTitleJp: '第6章：読解攻略法：筆者の主張・対比・理由付けを見抜く',
    unitTitleId: 'Bab 6: Strategi Membaca Teks N3 (Opini Penulis, Kontras & Eliminasi Distraktor)',
    focusCore: 'Menangkap pesan inti penulis pada paragraf kesimpulan dan mengeliminasi opsi jawaban jebakan.',
    explanation: 'Dalam ujian Dokkai N3, teks panjang acapkali menyajikan pendapat umum (一般論) di bagian awal, lalu mematahkannya dengan kata hubung kontras (しかし、だが、ところが) untuk menyajikan argumen asli penulis. Memperhatikan letak kata kunci dan kalimat penutup berpola 〜ではないだろうか atau 〜べきである adalah teknik esensial.',
    patternsOrPoints: [
      {
        title: '対比構造（一般論 vs 筆者の主張）の見極め',
        nuance: 'Ketika teks diawali dengan "Sering dikatakan orang bahwa...", waspadai kata sambung kontras「しかし」(namun). Pendapat yang datang setelah itulah yang menjadi opini sejati penulis.',
        examples: [
          {
            jp: '多くの人は便利さを求める。しかし、時には不便さを楽しむ余裕も必要ではないだろうか。',
            reading: 'Ooku no hito wa benrisa o motomeru. Shikashi, toki ni wa fubensa o tanoshimu yoyuu mo hitsuyou dewa nai darou ka.',
            id: 'Banyak orang mengejar kepraktisan. Namun, bukankah terkadang kelonggaran hati menikmati ketidakpraktisan pun sesungguhnya diperlukan?'
          }
        ]
      },
      {
        title: '選択肢の罠（言い過ぎ・無関係・逆）の消去法',
        nuance: 'Opsi jawaban yang memuat kata absolut seperti「すべて」「絶対に」「誰でも」hampir selalu salah (言い過ぎ). Cari opsi yang merefraksi (paraphrase) kata-kata penulis secara proporsional.',
        examples: [
          {
            jp: '本文の「大切だ」を「欠かせない」「不可欠だ」と言い換える選択肢に注目する。',
            reading: 'Honbun no "taisetsu da" o "kakasenai" "fukaketsu da" to iikaeru sentakushi ni chuumoku suru.',
            id: 'Perhatikan opsi jawaban yang memparafrasa kata kunci teks asli secara cerdas.'
          }
        ]
      }
    ],
    masteryDrill: [
      {
        questionJp: '文章中で筆者が最も伝えたい主張（結論）が置かれやすい場所はどこか？',
        options: [
          '「しかし」「つまり」に続く段落や文章の最終末尾',
          '文章の一番最初の1行目',
          '具体的なエピソードの例示の途中',
          '注釈（言葉の説明）の部分'
        ],
        correctIndex: 0,
        analysisId: 'Opini inti penulis di teks argumentatif N3 selalu terpusat setelah sinyal kontras/penyimpulan (しかし、つまり) dan di paragraf penutup.'
      }
    ]
  },

  // ==================== 7. CHOUKAI: MENYIMAK RESPON CEPAT ====================
  {
    id: 'sk-n3-7',
    level: 'N3',
    section: 'choukai',
    unitTitleJp: '第7章：聴解攻略法：即時応答と省略表現・あいづちの聞き分け',
    unitTitleId: 'Bab 7: Strategi Menyimak N3 (Respon Cepat, Kalimat Terpotong & Nuansa Tersembunyi)',
    focusCore: 'Merespon percakapan instan tanpa ragu dan menangkap arti kalimat yang sengaja digantung di akhir.',
    explanation: 'Bagian Sokkai Outou (即時応答) di JLPT Choukai N3 menguji kepekaan spontan. Penutur asli bahasa Jepang sering kali tidak menyelesaikan kalimatnya secara tuntas, melainkan menggantungnya dengan 〜んですが… (yang berarti menolak halus atau meminta tolong terselubung).',
    patternsOrPoints: [
      {
        title: '語尾の省略表現（〜んですが…）の意図理解',
        nuance: 'Kalimat yang diakhiri dengan「ちょっと都合が悪いんですが…」adalah kode budaya menolak secara halus tanpa mempermalukan penawar.',
        examples: [
          {
            jp: '「明日、映画に行きませんか。」「明日はレポートの締め切りなんですが…（＝行けません）」',
            reading: '"Ashita, eiga ni ikimasen ka." "Ashita wa repooto no shimekiri na n desu ga... (= Ikemasen)"',
            id: '"Besok mau nonton film bersama?" "Besok tenggat laporan saya sih sebenarnya... (= Halus menyatakan tidak bisa)".'
          }
        ]
      },
      {
        title: '敬語・へりくだり表現の即時判別',
        nuance: 'Bedakan seketika apakah lawan bicara sedang menawarkan bantuan kepada kita atau meminta kita melakukan sesuatu.',
        examples: [
          {
            jp: '「ご案内いたしましょうか。」→「ありがとうございます、お願いします。」',
            reading: '"Go-annai itashimashou ka." -> "Arigatou gozaimasu, onegai shimasu."',
            id: '"Bolehkah saya memandu Anda?" -> Jawaban tepat: "Terima kasih banyak, mohon bantuannya."'
          }
        ]
      }
    ],
    masteryDrill: [
      {
        questionJp: '先輩：「この資料、手伝ってくれない？」に対する最も適切な返答は？',
        options: [
          'はい、喜んでお手伝いします！',
          'どういたしまして。',
          'いいえ、手伝います。',
          '手伝ってください。'
        ],
        correctIndex: 0,
        analysisId: 'Merespon permohonan bantuan dari senior secara santun dan sigap: はい、喜んでお手伝いします！'
      }
    ]
  }
];
