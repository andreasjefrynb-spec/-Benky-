import { TryJlptLesson } from '../types';

export const tryJlptLessons: TryJlptLesson[] = [
  // --- N3 LESSON ---
  {
    id: 'try-n3-ch1',
    level: 'N3',
    chapter: 1,
    chapterTitleJp: '第1章：友人を旅行に誘う・計画を立てる',
    chapterTitleId: 'Bab 1: Mengajak Teman Berlibur & Menyusun Rencana Perjalanan',
    canDoGoal: 'Mampu mendiskusikan rencana bepergian, merekomendasikan destinasi wisata, dan memesan penginapan.',
    storyScenario: {
      setting: 'Dua orang sahabat merencanakan liburan akhir pekan ke Kyoto',
      passageJp: '来月の連休に京都へ行こうと思っているんだ。紅葉の季節だから、混雑するかもしれないけれど、有名な寺院を巡ってみたい。早めに新幹線と宿を予約しておくことにしよう。',
      passageReading: 'Raiketsu no renkyuu ni Kyouto e ikou to omotte iru n da. Kouyou no kisetsu dakara, konzatsu suru kamo shirenai keredo, yuumei na jiin o megutte mitai. Hayame ni shinkansen to yado o yoyaku shite oku koto ni shiyou.',
      passageId: 'Aku berniat pergi ke Kyoto saat libur panjang bulan depan. Karena sedang musim daun merah Momiji, mungkin akan sangat ramai, tapi aku ingin berkeliling mengunjungi kuil-kuil terkenal. Mari kita putuskan untuk memesan tiket Shinkansen dan penginapan lebih awal.'
    },
    grammarPoints: [
      {
        number: 1,
        pattern: '〜ようと思っている (~ you to omotte iru)',
        formula: 'Kata Kerja Bentuk Maksud (Ikoukei) + と思っている',
        meaningId: 'Bermaksud / berencana melakukan sesuatu (sudah dipikirkan sejak sebelum bicara)',
        explanation: 'Menyatakan niat atau rencana yang sudah ada di pikiran pembicara dan masih berlanjut hingga saat ini.',
        examples: [
          {
            jp: '来年、日本へ留学しようと思っています。',
            reading: 'Rainen, Nihon e ryuugaku shiyou to omotte imasu.',
            id: 'Tahun depan saya berencana ingin melanjutkan studi ke Jepang.'
          }
        ]
      },
      {
        number: 2,
        pattern: '〜ことにする (~ koto ni suru)',
        formula: 'Kata Kerja Bentuk Kamus / Nai + ことにする',
        meaningId: 'Memutuskan untuk melakukan sesuatu (keputusan kehendak sendiri)',
        explanation: 'Menyatakan bahwa pembicara sendiri yang mengambil keputusan sadar untuk melakukan atau tidak melakukan suatu hal.',
        examples: [
          {
            jp: '毎朝6時に起きて散歩することにしました。',
            reading: 'Maiasa rokuji ni okite sanpo suru koto ni shimashita.',
            id: 'Saya memutuskan untuk bangun jam 6 setiap pagi dan jalan-jalan santai.'
          }
        ]
      }
    ],
    tryExamDrill: [
      {
        questionJp: '今年の夏休みは、故郷の両親に会いに行（　　）と思っています。',
        options: ['こう', 'く', 'った', 'かない'],
        correctIndex: 0,
        explanation: 'Pola maksud ~you to omotte iru: verba 行く (iku) -> 行こう (ikou).'
      }
    ]
  },
  {
    id: 'try-n3-ch2',
    level: 'N3',
    chapter: 2,
    chapterTitleJp: '第2章：街を案内する・ルールを説明する',
    chapterTitleId: 'Bab 2: Memandu Kota & Menerangkan Aturan Fasilitas',
    canDoGoal: 'Mampu memandu arah, menerangkan regulasi umum di museum/stasiun, dan memberi petunjuk tertib.',
    storyScenario: {
      setting: 'Memandu teman asing mengunjungi museum seni modern di Ueno, Tokyo',
      passageJp: 'この美術館では、フラッシュを使って写真を撮ってはいけないことになっています。展示室に入る前に、案内図のとおりに進んでください。手荷物はロッカーに預けるべきですね。',
      passageReading: 'Kono bijutsukan de wa, furasshu o tsukatte shashin o totte wa ikenai koto ni natte imasu. Tenjishitsu ni hairu mae ni, annaizu no toori ni susunde kudasai. Tenimotsu wa rokkaa ni azukeru beki desu ne.',
      passageId: 'Di museum seni ini, sudah menjadi aturan bahwa dilarang mengambil foto menggunakan lampu kilat (flash). Sebelum masuk ke ruang pameran, silakan berjalan sesuai denah panduan. Barang bawaan sebaiknya dititipkan di loker.'
    },
    grammarPoints: [
      {
        number: 1,
        pattern: '〜ことになっている (~ koto ni natte iru)',
        formula: 'Kata Kerja Kamus / Nai + ことになっている',
        meaningId: 'Sudah ditetapkan sebagai aturan, jadwal, atau kebiasaan umum',
        explanation: 'Menjelaskan suatu ketetapan atau peraturan yang bukan diputuskan oleh si pembicara sendiri melainkan oleh pihak institusi/masyarakat.',
        examples: [
          {
            jp: '授業中はスマートフォンを使用してはいけないことになっている。',
            reading: 'Jugyouchuu wa sumaatofon o shiyou shite wa ikenai koto ni natte iru.',
            id: 'Sudah menjadi aturan bahwa dilarang menggunakan ponsel selama kelas berlangsung.'
          }
        ]
      },
      {
        number: 2,
        pattern: '〜とおりに / 〜どおりに (~ toori ni / ~ doori ni)',
        formula: 'Kata Kerja Kamus / Ta + とおりに / Kata Benda + どおりに',
        meaningId: 'Sesuai dengan / persis seperti petunjuk atau arahan yang ada',
        explanation: 'Melakukan tindakan tepat seperti contoh, peta rute, atau petunjuk yang diberikan.',
        examples: [
          {
            jp: 'レシピの指示どおりに作ったら、上手にケーキが焼けた。',
            reading: 'Reshipi no shiji doori ni tsukuttara, jouzu ni keeki ga yaketa.',
            id: 'Saat saya buat persis sesuai petunjuk resep, kue terpanggang dengan sangat baik.'
          }
        ]
      },
      {
        number: 3,
        pattern: '〜べきだ / 〜べきではない (~ beki da / ~ beki dewa nai)',
        formula: 'Kata Kerja Kamus + べきだ / する -> すべきだ',
        meaningId: 'Sudah sewajarnya / seharusnya dilakukan (kewajiban moral atau nalar sehat)',
        explanation: 'Mengutarakan apa yang secara moral atau etika umum dipandang sebagai hal yang benar dilakukan.',
        examples: [
          {
            jp: '困っている人を見かけたら、声をかけるべきだ。',
            reading: 'Komatte iru hito o mikaketara, koe o kakeru beki da.',
            id: 'Jika melihat orang yang sedang kesulitan, sewajarnya kita menyapa dan menawarkan bantuan.'
          }
        ]
      }
    ],
    tryExamDrill: [
      {
        questionJp: '説明書に書いてある（　　）組み立ててください。',
        options: ['とおりに', 'うちに', '最中に', 'わけに'],
        correctIndex: 0,
        explanation: 'Bentuk "sesuai dengan yang tertulis": 書いてある + とおりに.'
      }
    ]
  },
  {
    id: 'try-n3-ch3',
    level: 'N3',
    chapter: 3,
    chapterTitleJp: '第3章：頼み事をする・相談に乗る',
    chapterTitleId: 'Bab 3: Meminta Bantuan Sopan & Konsultasi Nasihat',
    canDoGoal: 'Mampu memohon bantuan dengan santun dan bertukar saran solutif saat menghadapi masalah.',
    storyScenario: {
      setting: 'Konsultasi dengan senior kampus untuk memeriksa draf beasiswa',
      passageJp: '奨学金の申請書を書いたのですが、文法を直していただけないでしょうか。先輩のアドバイスのおかげで、提出書類の内容がとても分かりやすくなりました。早く準備しておけばよかったと思います。',
      passageReading: 'Shougakukin no shinseisho o kaita no desu ga, bunpou o naoshite itadakenai deshou ka. Senpai no adobaisu no okage de, teishutsu shiryou no naiyou ga totemo wakariyasuku narimashita. Hayaku junbi shite okeba yokatta to omoimasu.',
      passageId: 'Saya telah menulis formulir pengajuan beasiswa, sudikah kiranya Senior berkenan mengoreksi tata bahasanya? Berkat saran dari Senior, isi dokumen pendaftaran menjadi sangat mudah dipahami. Seandainya saya siapkan lebih awal, tentu lebih baik.'
    },
    grammarPoints: [
      {
        number: 1,
        pattern: '〜ていただけないでしょうか (~ te itadakenai deshou ka)',
        formula: 'Kata Kerja Bentuk [Te] + いただけないでしょうか',
        meaningId: 'Sudikah kiranya Anda berkenan... (Permohonan santun beretika tinggi)',
        explanation: 'Pola permohonan tingkat tinggi yang sangat sopan kepada senior, guru, atau atasan.',
        examples: [
          {
            jp: 'この漢字の読み方を教えていただけないでしょうか。',
            reading: 'Kono kanji no yomikata o oshiete itadakenai deshou ka.',
            id: 'Sudikah Bapak/Ibu berkenan mengajari saya cara baca kanji ini?'
          }
        ]
      },
      {
        number: 2,
        pattern: '〜おかげで / 〜せいで (~ okage de / ~ sei de)',
        formula: 'Bentuk Biasa + おかげで（Positif） / せいで（Negatif）',
        meaningId: 'Berkat (akibat positif) / Gara-gara (akibat negatif/merugikan)',
        explanation: 'Menyatakan faktor penyebab yang membawa dampak menguntungkan (okage de) atau bencana/kesalahan (sei de).',
        examples: [
          {
            jp: '先生が熱心に教えてくださったおかげで、JLPTに合格できた。',
            reading: 'Sensei ga nesshin ni oshiete kudasatta okage de, JLPT ni goukaku dekita.',
            id: 'Berkat bimbingan guru yang penuh dedikasi, saya berhasil lulus JLPT.'
          },
          {
            jp: '台風のせいで、電車が半日運休してしまった。',
            reading: 'Taifuu no sei de, densha ga hannichi unkyuu shite shimatta.',
            id: 'Gara-gara topan, kereta api berhenti beroperasi selama setengah hari.'
          }
        ]
      }
    ],
    tryExamDrill: [
      {
        questionJp: '急な雨に降られた（　　）、服がびしょ濡れになってしまった。',
        options: ['せいで', 'おかげで', 'とおりに', 'はずで'],
        correctIndex: 0,
        explanation: 'Buntut kejadian negatif (baju basah kuyup karena kehujanan) menggunakan せいで (gara-gara).'
      }
    ]
  },
  {
    id: 'try-n3-ch4',
    level: 'N3',
    chapter: 4,
    chapterTitleJp: '第4章：体調不良・病院での診察',
    chapterTitleId: 'Bab 4: Keluhan Sakit & Menyimak Instruksi Dokter di Klinik',
    canDoGoal: 'Mampu menjelaskan gejala sakit ke dokter dan memahami instruksi cara minum obat.',
    storyScenario: {
      setting: 'Periksa ke klinik dokter spesialis penyakit dalam saat terserang flu berat',
      passageJp: '昨晩から高熱が出て、喉も痛いんです。医師から安静にして温かいものを飲むように言われました。薬を飲んだばかりなので、少し横になって休みます。悪化するおそれがあるので無理は禁物です。',
      passageReading: 'Sakuban kara kounetsu ga dete, nodo mo itai n desu. Ishi kara ansei ni shite atatakai mono o nomu you ni iwaremashita. Kusuri o nonda bakari na node, sukoshi yoko ni natte yasumimasu. Akka suru osore ga aru node muri wa kinmotsu desu.',
      passageId: 'Sejak kemarin malam demam tinggi dan tenggorokan juga sakit. Oleh dokter saya diinstruksikan untuk istirahat tenang dan banyak minum yang hangat. Karena baru saja minum obat, saya akan berbaring sejenak untuk beristirahat. Karena dikhawatirkan memburuk, pantang memaksakan diri.'
    },
    grammarPoints: [
      {
        number: 1,
        pattern: '〜ように言われる (~ you ni iwareru)',
        formula: 'Kata Kerja Kamus / Nai + ように言われる / ように頼まれる',
        meaningId: 'Diinstruksikan / diminta untuk melakukan (atau tidak melakukan) sesuatu',
        explanation: 'Menyampaikan kembali instruksi, perintah, atau larangan orang lain secara tidak langsung.',
        examples: [
          {
            jp: '医者にタバコを吸わないように言われました。',
            reading: 'Isha ni tabako o suwanai you ni iwaremashita.',
            id: 'Saya diinstruksikan oleh dokter agar tidak merokok.'
          }
        ]
      },
      {
        number: 2,
        pattern: '〜たばかり (~ ta bakari)',
        formula: 'Kata Kerja Bentuk [Ta] + ばかり',
        meaningId: 'Baru saja selesai dilakukan (secara psikologis masih terasa baru)',
        explanation: 'Menyatakan bahwa suatu aktivitas baru saja tuntas, baik dalam hitungan menit maupun periode yang dirasa baru kemarin.',
        examples: [
          {
            jp: '日本に来たばかりのころは、電車の乗り換えに苦労した。',
            reading: 'Nihon ni kita bakari no koro wa, densha no norikae ni kurou shita.',
            id: 'Saat baru saja tiba di Jepang, saya sempat kesulitan pindah jalur kereta.'
          }
        ]
      },
      {
        number: 3,
        pattern: '〜おそれがある (~ osore ga aru)',
        formula: 'Kata Kerja Kamus / Nai / KB + の + おそれがある',
        meaningId: 'Dikhawatirkan / ada potensi buruk terjadi',
        explanation: 'Digunakan dalam berita atau peringatan formal ketika ada bahaya atau risiko hal negatif yang mengintai.',
        examples: [
          {
            jp: '大雨で川が氾濫するおそれがあります。',
            reading: 'Ooame de kawa ga hanran suru osore ga arimasu.',
            id: 'Dikhawatirkan sungai akan meluap akibat hujan lebat.'
          }
        ]
      }
    ],
    tryExamDrill: [
      {
        questionJp: '課長から、明日の会議の資料を今日中にまとめる（　　）言われました。',
        options: ['ように', 'とおりに', 'せいで', 'わりに'],
        correctIndex: 0,
        explanation: 'Penyampaian perintah tidak langsung: verb dict + ように言われる.'
      }
    ]
  },
  {
    id: 'try-n3-ch5',
    level: 'N3',
    chapter: 5,
    chapterTitleJp: '第5章：仕事の依頼・職場での連絡相談',
    chapterTitleId: 'Bab 5: Komunikasi Tempat Kerja & Etika Berkoordinasi',
    canDoGoal: 'Mampu meminta izin, melaporkan kemajuan tugas, dan berkoordinasi santun di tempat kerja.',
    storyScenario: {
      setting: 'Rapat koordinasi tim kerja di perusahaan Jepang',
      passageJp: '本日の進捗状況についてご報告させていただきます。ただいま作業の最中ですが、仕様の確認のため先方にお時間をいただくことになりました。勝手な判断で進めるわけにはいかないためです。',
      passageReading: 'Honjitsu no shinchoku joukyou ni tsuite go-houkoku sasete itadakimasu. Tadaima sagyou no saichuu desu ga, shiyou no kakunin no tame senpou ni ojikan o itadaku koto ni narimashita. Katte na handan de susumeru wake ni wa ikanai tame desu.',
      passageId: 'Perkenankan saya melaporkan status kemajuan pekerjaan hari ini. Saat ini kami sedang di tengah-tengah pengerjaan, namun demi konfirmasi spesifikasi kami meminta waktu dari pihak klien. Hal ini karena kami tidak mungkin mengambil keputusan sepihak sembarangan.'
    },
    grammarPoints: [
      {
        number: 1,
        pattern: '〜させていただきます (~ sasete itadakimasu)',
        formula: 'Kata Kerja Kausatif Bentuk [Te] + いただきます',
        meaningId: 'Perkenankan saya untuk... (Meminta izin dengan sopan sembari merendah)',
        explanation: 'Etiket bisnis Jepang standar untuk mengutarakan tindakan yang pembicara lakukan atas izin atau pengertian pihak lain.',
        examples: [
          {
            jp: '自己紹介をさせていただきます。',
            reading: 'Jiko shoukai o sasete itadakimasu.',
            id: 'Perkenankan saya untuk memperkenalkan diri.'
          }
        ]
      },
      {
        number: 2,
        pattern: '〜わけにはいかない (~ wake ni wa ikanai)',
        formula: 'Kata Kerja Kamus / Nai + わけにはいかない',
        meaningId: 'Tidak mungkin / pantang dilakukan (karena etika moral atau tanggung jawab sosial)',
        explanation: 'Meskipun ingin atau situasinya mendesak, pembicara tidak dapat melakukannya karena bertentangan dengan norma atau konsekuensi buruk.',
        examples: [
          {
            jp: '明日は大事な試験があるので、夜更かしして遊ぶわけにはいかない。',
            reading: 'Ashita wa daiji na shiken ga aru node, yofukashi shite asobu wake ni wa ikanai.',
            id: 'Karena besok ada ujian krusial, saya tidak mungkin begadang untuk bermain.'
          }
        ]
      }
    ],
    tryExamDrill: [
      {
        questionJp: '約束した以上、途中で投げ出す（　　）いかない。',
        options: ['わけには', 'とおりには', 'ように', 'せいで'],
        correctIndex: 0,
        explanation: 'Pola tanggung jawab sosial "pantang ditinggalkan di tengah jalan": わけにはいかない.'
      }
    ]
  },
  {
    id: 'try-n3-ch6',
    level: 'N3',
    chapter: 6,
    chapterTitleJp: '第6章：感想を述べる・意見を交わす',
    chapterTitleId: 'Bab 6: Mengutarakan Ulasan, Opini & Evaluasi Kritis',
    canDoGoal: 'Mampu menyampaikan resensi buku/film, membandingkan sudut pandang, dan mengkritik dengan santun.',
    storyScenario: {
      setting: 'Diskusi bedah karya film dokumenter lingkungan hidup',
      passageJp: '前作が若者向けだったのに対して、今回の映画は大人向けの内容でした。低予算で作られたわりには、映像の美しさが際立っていました。最後までテーマを描き切った監督の手腕を高く評価したいです。',
      passageReading: 'Zensaku ga wakamono-muke datta no ni taishite, konkai no eiga wa otona-muke no naiyou deshita. Teiyosan de tsukurareta wari ni wa, eizou no utsukushisa ga kiwadatte imashita. Saigo made teema o egakikitta kantoku no shuwan o takaku hyouka shitai desu.',
      passageId: 'Berbeda dengan karya sebelumnya yang ditujukan bagi pemuda, film kali ini bermuatan isi untuk kalangan dewasa. Untuk ukuran film beranggaran rendah, keindahan visualnya sangat menonjol. Saya ingin memberikan apresiasi tinggi pada kecakapan sutradara yang menuntaskan temanya hingga akhir.'
    },
    grammarPoints: [
      {
        number: 1,
        pattern: '〜に対して (~ ni taishite)',
        formula: 'Kata Benda / Bentuk Biasa + のに対して',
        meaningId: 'Berbeda dengan / Berlawanan dengan perbandingan kontras A dan B',
        explanation: 'Menyoroti perbedaan mencolok antara dua subjek atau situasi yang dibandingkan secara objektif.',
        examples: [
          {
            jp: '兄は活発な性格であるのに対して、弟は物静かで読書が好きだ。',
            reading: 'Ani wa kappatsu na seikaku de aru no ni taishite, otouto wa monogizuka de dokusho ga suki da.',
            id: 'Berbeda dengan sang kakak yang berwatak enerjik, sang adik pendiam dan gemar membaca.'
          }
        ]
      },
      {
        number: 2,
        pattern: '〜わりに（は） (~ wari ni wa)',
        formula: 'Bentuk Biasa / KB + の + わりに（は）',
        meaningId: 'Padahal / Untuk ukuran standar tersebut (hasil di luar dugaan wajar)',
        explanation: 'Menyatakan bahwa kondisi yang terjadi tidak sebanding atau melenceng dari standar umum yang biasanya diperkirakan.',
        examples: [
          {
            jp: 'このレストランは値段のわりに量が多くておいしい。',
            reading: 'Kono resutoran wa nedan no wari ni ryou ga ookute oishii.',
            id: 'Restoran ini untuk ukuran harganya porsinya banyak dan lezat.'
          }
        ]
      },
      {
        number: 3,
        pattern: '〜切る / 〜切れない (~ kiru / ~ kirenai)',
        formula: 'Kata Kerja Bentuk Masu (tanpa masu) + 切る / 切れない',
        meaningId: 'Menuntaskan hingga tuntas sempurna / Tak sanggup dihabiskan sepenuhnya',
        explanation: 'Menunjukkan penyelesaian aksi secara tuntas habis sampai ke batas akhir, atau ketidakmampuan menuntaskan karena terlalu banyak.',
        examples: [
          {
            jp: '長編小説を一晩で読み切った。',
            reading: 'Chouhen shousetsu o hitoban de yomikitta.',
            id: 'Saya membaca tuntas novel tebal itu dalam semalam suntuk.'
          }
        ]
      }
    ],
    tryExamDrill: [
      {
        questionJp: 'あんなにたくさんのごちそうは、一人ではとても食べ（　　）。',
        options: ['切れない', '切る', 'とおりだ', 'わけがない'],
        correctIndex: 0,
        explanation: 'Menyatakan tidak sanggup menghabiskan hidangan sebanyak itu: 食べ切れない.'
      }
    ]
  }
];
