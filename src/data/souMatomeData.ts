import { SouMatomeWeek } from '../types';

export const souMatomeWeeks: SouMatomeWeek[] = [
  // ===================== MINGGU 1 =====================
  {
    id: 'sm-n3-w1',
    level: 'N3',
    subject: 'bunpou',
    weekNumber: 1,
    weekTitleJp: '第1週：時間の流れと場面を表す文法',
    weekTitleId: 'Minggu 1: Tata Bahasa Alur Waktu & Pengaturan Situasi',
    days: [
      {
        dayNumber: 1,
        dayTitle: '1日目：〜最中に・〜うちに',
        themeJp: '時間とタイミングの捉え方',
        themeId: 'Poin Penentu Waktu & Kesempatan Emas',
        targetItems: [
          {
            japanese: '〜最中に (~ saichuu ni)',
            reading: 'saichuu ni',
            meaningId: 'Tepat di tengah-tengah puncak aktivitas terganggu hal lain',
            collocationOrUsage: 'Kata Kerja [Te iru] + 最中に / KB + の最中に',
            sampleSentenceJp: '料理の最中に、突然停電になった。',
            sampleSentenceId: 'Tepat di tengah memasak, tiba-tiba mati lampu.'
          },
          {
            japanese: '〜うちに (~ uchi ni)',
            reading: 'uchi ni',
            meaningId: 'Selagi kondisi masih berlangsung / sebelum keadaan berubah',
            collocationOrUsage: 'KK Kamus/Nai + うちに / I-Adj/Na-Adj + うちに',
            sampleSentenceJp: '若いうちに、たくさん挑戦したい。',
            sampleSentenceId: 'Selagi masih muda, saya ingin mencoba banyak tantangan.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'スープが熱い（　　）飲んでください。',
            options: ['うちに', '最中に', 'ばかりに', 'きり'],
            correctIndex: 0,
            explanation: 'Selagi sup masih dalam kondisi panas nikmat -> うちに.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: '2日目：〜たとたん・〜次第',
        themeJp: '直後の動作と順序',
        themeId: 'Aksi yang Menyusul Seketika',
        targetItems: [
          {
            japanese: '〜たとたん（に） (~ ta totan ni)',
            reading: 'ta totan ni',
            meaningId: 'Seketika begitu selesai (disusul kejadian mengejutkan)',
            collocationOrUsage: 'KK [Ta] + とたん',
            sampleSentenceJp: '薬を飲んだとたん、眠気が襲ってきた。',
            sampleSentenceId: 'Begitu meminum obat, seketika rasa kantuk menyerang.'
          },
          {
            japanese: '〜次第 (~ shidai)',
            reading: 'shidai',
            meaningId: 'Segera setelah selesai (langsung berlanjut ke tahap berikutnya)',
            collocationOrUsage: 'KK Masu stem + 次第',
            sampleSentenceJp: '準備ができ次第、出発します。',
            sampleSentenceId: 'Segera setelah persiapan selesai, kami akan langsung berangkat.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '窓を開けた（　　）、強い風が吹き込んできた。',
            options: ['とたん', '次第', 'うちに', '最中'],
            correctIndex: 0,
            explanation: 'Seketika begitu membuka jendela langsung terjadi hal spontan: とたん.'
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: '3日目：〜あいだ・〜あいだに',
        themeJp: '継続する時間と瞬間的な動作',
        themeId: 'Rentang Waktu Kontinu vs Aksi Sesaat di Tengah Durasi',
        targetItems: [
          {
            japanese: '〜あいだ (~ aida)',
            reading: 'aida',
            meaningId: 'Selama seluruh rentang waktu A berlangsung, B terus berjalan secara simultan',
            collocationOrUsage: 'KK [Te iru] + 間 / KB + の間',
            sampleSentenceJp: '夏休みの間、ずっと祖父母の家に泊まっていた。',
            sampleSentenceId: 'Selama seluruh liburan musim panas, saya terus menginap di rumah kakek-nenek.'
          },
          {
            japanese: '〜あいだに (~ aida ni)',
            reading: 'aida ni',
            meaningId: 'Di salah satu momen sesaat ketika rentang waktu A sedang berlangsung',
            collocationOrUsage: 'KK [Te iru] + 間に / KB + の間に',
            sampleSentenceJp: '留守の間に、泥棒が入ったらしい。',
            sampleSentenceId: 'Saat rumah sedang kosong, tampaknya ada pencuri masuk.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '赤ちゃんが寝ている（　　）洗濯を済ませた。',
            options: ['間に', '間', '最中', '次第'],
            correctIndex: 0,
            explanation: 'Tindakan tuntas sesaat (mencuci baju) di sela waktu bayi tidur: 間に.'
          }
        ]
      },
      {
        dayNumber: 4,
        dayTitle: '4日目：〜たところ・〜たばかり',
        themeJp: '直前・直後の結果と心理的近さ',
        themeId: 'Titik Temu Saat Menguji & Baru Saja Selesai',
        targetItems: [
          {
            japanese: '〜たところ (~ ta tokoro)',
            reading: 'ta tokoro',
            meaningId: 'Ketika mencoba melakukan A, ternyata menemukan fakta atau respon B',
            collocationOrUsage: 'KK [Ta] + ところ',
            sampleSentenceJp: '先生に相談したところ、有益なアドバイスをもらえた。',
            sampleSentenceId: 'Ketika saya berkonsultasi kepada guru, ternyata memperoleh saran yang sangat berharga.'
          },
          {
            japanese: '〜たばかり (~ ta bakari)',
            reading: 'ta bakari',
            meaningId: 'Baru saja dilakukan (secara perasaan pembicara masih sangat hangat)',
            collocationOrUsage: 'KK [Ta] + ばかり',
            sampleSentenceJp: '買ったばかりのスマートフォンを落としてしまった。',
            sampleSentenceId: 'Ponsel yang baru saja saya beli malah terjatuh.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '駅に問い合わせてみた（　　）、忘れ物が見つかったそうだ。',
            options: ['ところ', 'ばかり', 'うちに', 'あいだ'],
            correctIndex: 0,
            explanation: 'Menunjukkan hasil setelah menghubungi stasiun: ところ.'
          }
        ]
      },
      {
        dayNumber: 5,
        dayTitle: '5日目：〜かける・〜切る',
        themeJp: '動作の開始と完全な達成',
        themeId: 'Belum Selesai vs Tuntas Sempurna',
        targetItems: [
          {
            japanese: '〜かける / 〜かけの (~ kakeru / ~ kake no)',
            reading: 'kakeru / kake no',
            meaningId: 'Sedang di tengah pengerjaan belum usai / nyaris terjadi',
            collocationOrUsage: 'KK Masu stem + かける / かけの + KB',
            sampleSentenceJp: '読みかけの本を机の上に置いて出かけた。',
            sampleSentenceId: 'Saya meletakkan buku yang belum selesai dibaca di atas meja lalu pergi.'
          },
          {
            japanese: '〜切る / 〜切れる (~ kiru / ~ kireru)',
            reading: 'kiru / kireru',
            meaningId: 'Menghabiskan atau menuntaskan sesuatu secara total hingga akhir',
            collocationOrUsage: 'KK Masu stem + 切る',
            sampleSentenceJp: 'フルマラソンを最後まで走り切った。',
            sampleSentenceId: 'Saya berlari menuntaskan seluruh rute full marathon hingga garis akhir.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'テーブルの上に食べ（　　）のリンゴがある。',
            options: ['かけ', 'きり', '次第', '最中'],
            correctIndex: 0,
            explanation: 'Apel yang baru dimakan separuh belum habis: 食べかけ.'
          }
        ]
      },
      {
        dayNumber: 6,
        dayTitle: '6日目：〜てからでないと・〜てはじめて',
        themeJp: '先行条件と意識の目覚め',
        themeId: 'Syarat Mutlak Tahap Pertama Sebelum Langkah Berikutnya',
        targetItems: [
          {
            japanese: '〜てからでないと (~ te kara de nai to)',
            reading: 'te kara de nai to',
            meaningId: 'Bila belum menuntaskan A terlebih dahulu, maka B mustahil dapat dilakukan',
            collocationOrUsage: 'KK [Te] + からでないと / からでなければ',
            sampleSentenceJp: '契約書をよく読んでからでないと、サインはできません。',
            sampleSentenceId: 'Bila belum membaca surat kontrak dengan saksama, mustahil dapat membubuhkan tanda tangan.'
          },
          {
            japanese: '〜てはじめて (~ te hajimete)',
            reading: 'te hajimete',
            meaningId: 'Baru setelah mengalami A secara nyata, seseorang sungguh-sungguh menyadarinya',
            collocationOrUsage: 'KK [Te] + はじめて',
            sampleSentenceJp: '一人暮らしをしてはじめて、親のありがたさが分かった。',
            sampleSentenceId: 'Baru setelah tinggal sendirian secara mandiri, saya memahami betapa besarnya jasa orang tua.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '上司の許可をもらっ（　　）、このプロジェクトは開始できない。',
            options: ['てからでないと', 'てはじめて', 'たばかりで', 'たところで'],
            correctIndex: 0,
            explanation: 'Syarat mutlak izin atasan sebelum proyek bisa jalan: てからでないと.'
          }
        ]
      },
      {
        dayNumber: 7,
        dayTitle: '7日目：第1週 実践総復習テスト',
        themeJp: '1週間の総まとめ総合ドリル',
        themeId: 'Tes Komprehensif Evaluasi Akhir Minggu 1',
        targetItems: [
          {
            japanese: '実践ドリル総まとめ（第1週）',
            reading: 'jissen doriru soumatome',
            meaningId: 'Latihan soal integratif seluruh materi waktu minggu ke-1'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '詳細が決まり（　　）、メールでご連絡いたします。',
            options: ['次第', 'とたんに', '最中に', 'うちに'],
            correctIndex: 0,
            explanation: 'Bentuk bisnis formal "segera setelah...": Masu stem + 次第.'
          },
          {
            questionJp: '電車に乗っ（　　）財布を家に忘れたことに気がついた。',
            options: ['たとたん', 'てからでないと', 'るうちに', 'る最中に'],
            correctIndex: 0,
            explanation: 'Seketika begitu naik kereta baru tersadar barang tertinggal: たとたん.'
          }
        ]
      }
    ]
  },

  // ===================== MINGGU 2 =====================
  {
    id: 'sm-n3-w2',
    level: 'N3',
    subject: 'bunpou',
    weekNumber: 2,
    weekTitleJp: '第2週：原因・理由と逆接を表す文法',
    weekTitleId: 'Minggu 2: Tata Bahasa Sebab Akibat & Pertentangan/Kontras',
    days: [
      {
        dayNumber: 1,
        dayTitle: '1日目：〜おかげで・〜せいで',
        themeJp: 'プラスとマイナスの原因',
        themeId: 'Penyebab Berdampak Positif vs Merugikan',
        targetItems: [
          {
            japanese: '〜おかげで (~ okage de)',
            reading: 'okage de',
            meaningId: 'Berkat (membawa hasil yang menguntungkan dan patut disyukuri)',
            collocationOrUsage: 'Bentuk Biasa / KB + のおかげで',
            sampleSentenceJp: '毎日の勉強のおかげで、合格点に届いた。',
            sampleSentenceId: 'Berkat belajar setiap hari, nilai saya mencapai standar kelulusan.'
          },
          {
            japanese: '〜せいで (~ sei de)',
            reading: 'sei de',
            meaningId: 'Gara-gara / akibat kesalahan (membawa musibah atau rasa kecewa)',
            collocationOrUsage: 'Bentuk Biasa / KB + のせいで',
            sampleSentenceJp: '寝坊したせいで、大事な面接に遅刻した。',
            sampleSentenceId: 'Gara-gara bangun kesiangan, saya terlambat pada wawancara penting.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '目覚まし時計が鳴らなかった（　　）、遅刻してしまった。',
            options: ['せいで', 'おかげで', '反面', 'わりに'],
            correctIndex: 0,
            explanation: 'Penyebab yang merugikan (terlambat): せいで.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: '2日目：〜からには・〜以上は',
        themeJp: '強い決意と義務',
        themeId: 'Tekad Bulat Karena Sudah Terlanjur Melangkah',
        targetItems: [
          {
            japanese: '〜からには (~ kara ni wa)',
            reading: 'kara ni wa',
            meaningId: 'Karena sudah memutuskan/terlanjur A, maka wajar harus bertanggung jawab sampai akhir',
            collocationOrUsage: 'Bentuk Biasa + からには',
            sampleSentenceJp: '試合に出るからには、絶対に勝ちたい。',
            sampleSentenceId: 'Karena sudah memutuskan bertanding, saya bertekad bulat ingin menang.'
          },
          {
            japanese: '〜以上（は） (~ ijou wa)',
            reading: 'ijou wa',
            meaningId: 'Mengingat fakta bahwa A sudah pasti, maka ada konsekuensi atau kewajiban mutlak',
            collocationOrUsage: 'Bentuk Biasa + 以上は',
            sampleSentenceJp: '約束した以上は、守らなければならない。',
            sampleSentenceId: 'Mengingat sudah berjanji, maka wajib ditepati.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '留学する（　　）、しっかり専門知識を身につけたい。',
            options: ['からには', 'せいで', 'おかげで', 'くせに'],
            correctIndex: 0,
            explanation: 'Tekad kuat karena sudah memutuskan kuliah di luar negeri: からには.'
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: '3日目：〜わりに（は）・〜にしては',
        themeJp: '予想との不一致',
        themeId: 'Hasil yang Di Luar Standar Wajar Umum',
        targetItems: [
          {
            japanese: '〜わりに（は） (~ wari ni wa)',
            reading: 'wari ni wa',
            meaningId: 'Padahal / untuk ukuran standar tersebut (hasil melenceng dari perkiraan wajar)',
            collocationOrUsage: 'Bentuk Biasa / KB + のわりに',
            sampleSentenceJp: 'このコートは安かったわりに、とても温かい。',
            sampleSentenceId: 'Mantel ini untuk ukuran murah harganya ternyata sangat hangat.'
          },
          {
            japanese: '〜にしては (~ ni shite wa)',
            reading: 'ni shite wa',
            meaningId: 'Untuk ukuran fakta konkret tertentu (sering ditujukan pada figur/fakta spesifik)',
            collocationOrUsage: 'Kata Benda / Bentuk Biasa + にしては',
            sampleSentenceJp: '彼は日本語を勉強して3ヶ月にしては、ずいぶん流暢だ。',
            sampleSentenceId: 'Untuk ukuran baru 3 bulan belajar bahasa Jepang, dia terhitung sangat lancar.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '初めて作った料理（　　）、とても上手にできた。',
            options: ['にしては', 'せいで', 'からには', '反面'],
            correctIndex: 0,
            explanation: 'Untuk ukuran masakan perdana, hasilnya di luar dugaan sangat enak: にしては.'
          }
        ]
      },
      {
        dayNumber: 4,
        dayTitle: '4日目：〜くせに・〜にもかかわらず',
        themeJp: '非難と意外な事実',
        themeId: 'Kritik Ketidakpantasan vs Fakta Nyata Terlepas dari Rintangan',
        targetItems: [
          {
            japanese: '〜くせに (~ kuse ni)',
            reading: 'kuse ni',
            meaningId: 'Padahal dia... (Mengandung nada mencela, menyindir, atau jengkel)',
            collocationOrUsage: 'Bentuk Biasa / Na-Adj + な / KB + の + くせに',
            sampleSentenceJp: '知っているくせに、教えてくれない。',
            sampleSentenceId: 'Padahal dia tahu, tapi tak mau memberi tahu.'
          },
          {
            japanese: '〜にもかかわらず (~ ni mo kakawarazu)',
            reading: 'ni mo kakawarazu',
            meaningId: 'Terlepas dari / kendatipun ada rintangan kondisi tersebut',
            collocationOrUsage: 'Bentuk Biasa / KB + にもかかわらず',
            sampleSentenceJp: '悪天候にもかかわらず、多くの参加者が集まった。',
            sampleSentenceId: 'Terlepas dari cuaca buruk, banyak peserta tetap berkumpul hadir.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '自分で何も手伝わなかった（　　）、文句ばかり言っている。',
            options: ['くせに', 'おかげで', '以上は', '次第で'],
            correctIndex: 0,
            explanation: 'Nada jengkel mencela orang yang tak bantu tapi banyak mengeluh: くせに.'
          }
        ]
      },
      {
        dayNumber: 5,
        dayTitle: '5日目：〜反面・〜一方（で）',
        themeJp: '二面性の対比',
        themeId: 'Dua Sisi Mata Uang yang Berlawanan Bersamaan',
        targetItems: [
          {
            japanese: '〜反面 (~ hanmen)',
            reading: 'hanmen',
            meaningId: 'Di sisi lain / sebaliknya (menyorot dua sifat berlawanan dari satu hal)',
            collocationOrUsage: 'Bentuk Biasa / Na-Adj + な/である + 反面',
            sampleSentenceJp: '都会の暮らしは便利な反面、生活費が高くつく。',
            sampleSentenceId: 'Kehidupan kota besar di satu sisi praktis, namun di sisi lain biaya hidup menjadi mahal.'
          },
          {
            japanese: '〜一方（で） (~ ippou de)',
            reading: 'ippou de',
            meaningId: 'Di satu pihak... di pihak lain (perbandingan seimbang atau tren paralel)',
            collocationOrUsage: 'Bentuk Biasa + 一方（で）',
            sampleSentenceJp: '仕事を頑張る一方で、健康管理も怠らないようにしている。',
            sampleSentenceId: 'Di satu sisi bekerja keras, di sisi lain saya mengusahakan tidak mengabaikan kesehatan.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'この薬はよく効く（　　）、眠気などの副作用もある。',
            options: ['反面', 'せいで', 'くせに', 'からには'],
            correctIndex: 0,
            explanation: 'Menyoroti dua sisi berlawanan (manjur vs efek samping): 反面.'
          }
        ]
      },
      {
        dayNumber: 6,
        dayTitle: '6日目：〜だけに・〜ばかりに',
        themeJp: '強調された理由と悔恨',
        themeId: 'Justru Karena Alasan Itu vs Penyesalan Karena Satu Hal Sepele',
        targetItems: [
          {
            japanese: '〜だけに (~ dake ni)',
            reading: 'dake ni',
            meaningId: 'Justru karena alasan istimewa itulah, akibatnya menjadi semakin terasa berlipat',
            collocationOrUsage: 'Bentuk Biasa / KB + だけに',
            sampleSentenceJp: '一生懸命準備しただけに、中止になって本当に悔しい。',
            sampleSentenceId: 'Justru karena persiapannya begitu matang dan sungguh-sungguh, pembatalan ini sangat mengecewakan.'
          },
          {
            japanese: '〜ばかりに (~ bakari ni)',
            reading: 'bakari ni',
            meaningId: 'Hanya gara-gara satu hal sepele tersebut, berujung pada petaka penyesalan',
            collocationOrUsage: 'Bentuk Biasa / [Ta] + ばかりに',
            sampleSentenceJp: '嘘をついたばかりに、親友の信頼を失ってしまった。',
            sampleSentenceId: 'Hanya gara-gara berbohong sekali, saya kehilangan kepercayaan dari sahabat sejati.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '鍵をかけ忘れた（　　）、泥棒に入られてしまった。',
            options: ['ばかりに', 'おかげで', '反面', 'わりには'],
            correctIndex: 0,
            explanation: 'Penyesalan akibat satu keteledoran berakibat fatal: ばかりに.'
          }
        ]
      },
      {
        dayNumber: 7,
        dayTitle: '7日目：第2週 実践総復習テスト',
        themeJp: '原因・理由・逆接の総仕上げ',
        themeId: 'Tes Komprehensif Evaluasi Akhir Minggu 2',
        targetItems: [
          {
            japanese: '実践ドリル総まとめ（第2週）',
            reading: 'jissen doriru soumatome',
            meaningId: 'Latihan soal integratif sebab akibat & kontras minggu ke-2'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'やる（　　）最後まで責任を持ってやり遂げてください。',
            options: ['からには', 'せいで', 'わりには', '反面'],
            correctIndex: 0,
            explanation: 'Karena sudah memutuskan menjalankan, lakukan dengan tanggung jawab: からには.'
          },
          {
            questionJp: '値段が高い（　　）、味はあまり美味しくなかった。',
            options: ['わりには', 'おかげで', 'からには', 'ばかりに'],
            correctIndex: 0,
            explanation: 'Untuk ukuran harganya yang mahal, rasanya ternyata biasa saja: わりには.'
          }
        ]
      }
    ]
  },

  // ===================== MINGGU 3 =====================
  {
    id: 'sm-n3-w3',
    level: 'N3',
    subject: 'bunpou',
    weekNumber: 3,
    weekTitleJp: '第3週：推量・状態・基準を表す文法',
    weekTitleId: 'Minggu 3: Tata Bahasa Dugaan, Karakteristik & Standar Evaluasi',
    days: [
      {
        dayNumber: 1,
        dayTitle: '1日目：〜に違いない・〜はずだ',
        themeJp: '確信度の高い推量',
        themeId: 'Kepastian Berdasarkan Bukti & Deduksi Logis',
        targetItems: [
          {
            japanese: '〜に違いない (~ ni chigai nai)',
            reading: 'ni chigai nai',
            meaningId: 'Pasti / tak diragukan lagi (keyakinan intuitif yang sangat kuat dari pembicara)',
            collocationOrUsage: 'Bentuk Biasa (tanpa da) + に違いない',
            sampleSentenceJp: 'あれだけ練習したのだから、合格するに違いない。',
            sampleSentenceId: 'Karena sudah berlatih sekeras itu, dia pasti akan lulus tanpa ragu.'
          },
          {
            japanese: '〜はずだ (~ hazu da)',
            reading: 'hazu da',
            meaningId: 'Seharusnya pasti demikian (berdasarkan perhitungan nalar, jadwal, atau fakta)',
            collocationOrUsage: 'Bentuk Biasa / KB + の + はずだ',
            sampleSentenceJp: '昨日発送したから、今日届くはずだ。',
            sampleSentenceId: 'Karena kemarin sudah dikirimkan, seharusnya paketnya tiba hari ini.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '明日は日曜日だから、銀行は休みの（　　）。',
            options: ['はずだ', 'せいで', 'わりに', '反面'],
            correctIndex: 0,
            explanation: 'Berdasarkan fakta kalender hari Minggu, seharusnya bank tutup: はずだ.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: '2日目：〜みたいだ・〜らしい',
        themeJp: '見聞きした推量と典型性',
        themeId: 'Kesan Visual Mirip vs Ciri Khas Khas Sejati',
        targetItems: [
          {
            japanese: '〜みたいだ (~ mitai da)',
            reading: 'mitai da',
            meaningId: 'Tampaknya / seperti (kesan visual langsung atau perumpamaan figuratif)',
            collocationOrUsage: 'Bentuk Biasa / KB + みたいだ',
            sampleSentenceJp: '空が暗くなってきた。雨が降るみたいだ。',
            sampleSentenceId: 'Langit mulai menggelap. Tampaknya akan turun hujan.'
          },
          {
            japanese: '〜らしい (~ rashii)',
            reading: 'rashii',
            meaningId: 'Kabarnya / benar-benar menunjukkan sifat khas sejati dari hakikatnya',
            collocationOrUsage: 'KB + らしい (Sifat khas) / Bentuk Biasa + らしい (Kabar angin)',
            sampleSentenceJp: '今日は春らしい暖かい一日ですね。',
            sampleSentenceId: 'Hari ini cuacanya hangat menyenangkan, benar-benar khas musim semi ya.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '男なら、男（　　）堂々としていなさい。',
            options: ['らしく', 'みたいに', 'っぽく', '向けに'],
            correctIndex: 0,
            explanation: 'Menunjukkan sifat khas sejati seorang pria: 男らしく.'
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: '3日目：〜っぽい・〜気味',
        themeJp: '傾向とわずかな兆候',
        themeId: 'Kecenderungan Berlebih vs Sedikit Gejala yang Dirasakan',
        targetItems: [
          {
            japanese: '〜っぽい (~ ppoi)',
            reading: 'ppoi',
            meaningId: 'Tampak seperti / bernuansa cenderung... (agak negatif atau informal)',
            collocationOrUsage: 'KB / Masu stem / I-Adj (tanpa i) + っぽい',
            sampleSentenceJp: 'この服は大人用なのに、少し子どもっぽいデザインだ。',
            sampleSentenceId: 'Pakaian ini untuk orang dewasa tapi desainnya agak kekanak-kanakan.'
          },
          {
            japanese: '〜気味（ぎみ） (~ gimi)',
            reading: 'gimi',
            meaningId: 'Agak sedikit terasa tanda-tanda tidak enak / gejala ringan',
            collocationOrUsage: 'KB / Masu stem + 気味',
            sampleSentenceJp: '最近風邪気味で、少し喉が痛い。',
            sampleSentenceId: 'Belakangan saya agak sedikit flu, tenggorokan agak sakit.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '最近残業が続いて、少し疲れ（　　）です。',
            options: ['気味', 'っぽい', '向け', 'らしい'],
            correctIndex: 0,
            explanation: 'Sedikit merasakan gejala kelelahan akibat lembur: 疲れ気味.'
          }
        ]
      },
      {
        dayNumber: 4,
        dayTitle: '4日目：〜向き・〜向け',
        themeJp: '適合性と対象ターゲット',
        themeId: 'Secara Alami Cocok vs Sengaja Dibuat Khusus Untuk Target Tertentu',
        targetItems: [
          {
            japanese: '〜向き (~ muki)',
            reading: 'muki',
            meaningId: 'Sifat dasarnya cocok dan pas untuk kondisi/orang tersebut',
            collocationOrUsage: 'KB + 向き',
            sampleSentenceJp: 'この部屋は日当たりがよく、高齢者向きの間取りです。',
            sampleSentenceId: 'Kamar ini pencahayaan mataharinya bagus, tata ruangnya sangat cocok untuk lansia.'
          },
          {
            japanese: '〜向け (~ muke)',
            reading: 'muke',
            meaningId: 'Sengaja dirancang dan ditargetkan khusus untuk kalangan target tertentu',
            collocationOrUsage: 'KB + 向け / 向けの + KB',
            sampleSentenceJp: 'これは外国人観光客向けに作られたガイドブックです。',
            sampleSentenceId: 'Ini adalah buku panduan yang dirancang khusus untuk wisatawan mancanegara.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '初心者（　　）に分かりやすく解説されたプログラミング入門書。',
            options: ['向け', '向き', '気味', 'っぽい'],
            correctIndex: 0,
            explanation: 'Buku yang sengaja dirancang untuk target pemula: 初心者向け.'
          }
        ]
      },
      {
        dayNumber: 5,
        dayTitle: '5日目：〜に関して・〜について',
        themeJp: '主題の提示と関連性',
        themeId: 'Topik Bahasan Formal Mendalam vs Fokus Pembicaraan Umum',
        targetItems: [
          {
            japanese: '〜に関して (~ ni kanshite)',
            reading: 'ni kanshite',
            meaningId: 'Berkenaan dengan / mengenai hal terkait (ragam formal dalam laporan/rapat)',
            collocationOrUsage: 'KB + に関して / に関する + KB',
            sampleSentenceJp: '環境問題に関する調査結果を発表します。',
            sampleSentenceId: 'Mempresentasikan hasil survei berkenaan dengan isu kelestarian lingkungan.'
          },
          {
            japanese: '〜について (~ ni tsuite)',
            reading: 'ni tsuite',
            meaningId: 'Tentang / mengenai isi topik pembicaraan langsung',
            collocationOrUsage: 'KB + について / についての + KB',
            sampleSentenceJp: '日本のアニメ文化についてレポートを書いた。',
            sampleSentenceId: 'Saya menulis laporan tentang budaya anime Jepang.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '新しい方針（　　）何かご質問はございますか。',
            options: ['に関して', '向けに', '気味に', 'っぽく'],
            correctIndex: 0,
            explanation: 'Pertanyaan formal perihal kebijakan baru: に関して.'
          }
        ]
      },
      {
        dayNumber: 6,
        dayTitle: '6日目：〜に比べて・〜に対して',
        themeJp: '比較と対象',
        themeId: 'Perbandingan Komparatif Skala vs Kontras Sikap/Objek',
        targetItems: [
          {
            japanese: '〜に比べて (~ ni kurabete)',
            reading: 'ni kurabete',
            meaningId: 'Dibandingkan dengan taraf/standar A, maka B lebih...',
            collocationOrUsage: 'KB + に比べて',
            sampleSentenceJp: '今年の夏は昨年に比べて雨が多い。',
            sampleSentenceId: 'Musim panas tahun ini dibandingkan tahun lalu curah hujannya lebih tinggi.'
          },
          {
            japanese: '〜に対して (~ ni taishite)',
            reading: 'ni taishite',
            meaningId: 'Berbanding terbalik dengan / berhadapan terhadap sasaran sikap',
            collocationOrUsage: 'KB + に対して / に対する + KB',
            sampleSentenceJp: 'お客様に対して、失礼な言葉遣いをしてはならない。',
            sampleSentenceId: 'Terhadap pelanggan, pantang menggunakan tutur kata yang tidak sopan.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '兄が外交的であるの（　　）、弟は内向的だ。',
            options: ['に対して', 'に比べて', 'に関して', '向けに'],
            correctIndex: 0,
            explanation: 'Perbedaan kontras dua kutub sifat kepribadian: に対して.'
          }
        ]
      },
      {
        dayNumber: 7,
        dayTitle: '7日目：第3週 実践総復習テスト',
        themeJp: '推量・状態・基準の総仕上げ',
        themeId: 'Tes Komprehensif Evaluasi Akhir Minggu 3',
        targetItems: [
          {
            japanese: '実践ドリル総まとめ（第3週）',
            reading: 'jissen doriru soumatome',
            meaningId: 'Latihan soal integratif dugaan & standar minggu ke-3'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '彼が犯人である（　　）決定的な証拠が見つかった。',
            options: ['に違いない', 'はずだ', '向けだ', '気味だ'],
            correctIndex: 0,
            explanation: 'Keyakinan tanpa ragu "pasti dialah pelakunya": に違いない.'
          },
          {
            questionJp: 'このスマートウォッチは若者（　　）のスタイリッシュなデザインだ。',
            options: ['向け', '気味', 'に関して', 'に比べて'],
            correctIndex: 0,
            explanation: 'Ditujukan khusus bagi kalangan muda: 若者向け.'
          }
        ]
      }
    ]
  },

  // ===================== MINGGU 4 =====================
  {
    id: 'sm-n3-w4',
    level: 'N3',
    subject: 'bunpou',
    weekNumber: 4,
    weekTitleJp: '第4週：限定・強調・受動使役の文法',
    weekTitleId: 'Minggu 4: Tata Bahasa Pembatasan, Penekanan & Pasif Kausatif',
    days: [
      {
        dayNumber: 1,
        dayTitle: '1日目：〜だけ・〜のみ・〜ばかり',
        themeJp: '限定と独占の表現',
        themeId: 'Hanya / Melulu Berisi Hal Tersebut',
        targetItems: [
          {
            japanese: '〜のみ (~ nomi)',
            reading: 'nomi',
            meaningId: 'Hanya (ragam tertulis sangat resmi, setara dake)',
            collocationOrUsage: 'KB + のみ',
            sampleSentenceJp: '会員の方のみ入場可能です。',
            sampleSentenceId: 'Hanya anggota yang diperkenankan memasuki ruangan.'
          },
          {
            japanese: '〜ばかり (~ bakari)',
            reading: 'bakari',
            meaningId: 'Melulu / melulu melakukan hal itu saja terus-menerus',
            collocationOrUsage: 'KB / KK [Te] + ばかり',
            sampleSentenceJp: '弟は勉強もしないで、ゲームばかりしている。',
            sampleSentenceId: 'Adik saya tidak mau belajar, melulu bermain game terus.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '油っこいもの（　　）食べていると体を壊すよ。',
            options: ['ばかり', 'のみ', 'さえ', 'こそ'],
            correctIndex: 0,
            explanation: 'Melulu makan makanan berminyak: ばかり.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: '2日目：〜さえ・〜こそ',
        themeJp: '極端な例と強い強調',
        themeId: 'Bahkan Hal Paling Dasar Pun vs Justru Inilah yang Terpenting',
        targetItems: [
          {
            japanese: '〜さえ (~ sae)',
            reading: 'sae',
            meaningId: 'Bahkan... pun (memberikan contoh paling ekstrem untuk menegaskan)',
            collocationOrUsage: 'KB + さえ / KB + さえ〜ば',
            sampleSentenceJp: '忙しすぎて、昼ご飯を食べる時間さえなかった。',
            sampleSentenceId: 'Terlalu sibuk hingga bahkan waktu untuk makan siang pun tidak ada.'
          },
          {
            japanese: '〜こそ (~ koso)',
            reading: 'koso',
            meaningId: 'Justru inilah / benar-benar yang paling utama',
            collocationOrUsage: 'KB + こそ',
            sampleSentenceJp: '今年こそ、JLPT N3に絶対に合格してみせる。',
            sampleSentenceId: 'Tahun inilah saatnya, saya pasti akan buktikan lulus JLPT N3.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'ひらがな（　　）読めないのに、漢字はもっと無理だ。',
            options: ['さえ', 'こそ', 'ばかり', 'のみ'],
            correctIndex: 0,
            explanation: 'Bahkan huruf hiragana yang paling dasar pun tak bisa: さえ.'
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: '3日目：〜を中心に・〜をはじめ',
        themeJp: '代表例と中核の提示',
        themeId: 'Berpusat Pada Poros Inti vs Dimulai dari Contoh Terdepan',
        targetItems: [
          {
            japanese: '〜を中心として / 〜を中心に (~ o chuushin to shite / ~ o chuushin ni)',
            reading: 'o chuushin to shite',
            meaningId: 'Berpusat pada / fokus utamanya berporos pada hal tersebut',
            collocationOrUsage: 'KB + を中心に / を中心とした + KB',
            sampleSentenceJp: '駅前を中心として、大規模な再開発が進められている。',
            sampleSentenceId: 'Berpusat di area depan stasiun, pembangunan kembali berskala besar sedang berjalan.'
          },
          {
            japanese: '〜をはじめ（として） (~ o hajime to shite)',
            reading: 'o hajime to shite',
            meaningId: 'Mulai dari contoh paling representatif, disusul contoh-contoh lainnya',
            collocationOrUsage: 'KB + をはじめ',
            sampleSentenceJp: '富士山をはじめ、日本には美しい名所がたくさんある。',
            sampleSentenceId: 'Mulai dari Gunung Fuji, di Jepang terdapat banyak sekali tempat wisata nan elok.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '校長先生（　　）、諸先生方のご指導に感謝いたします。',
            options: ['をはじめ', 'を中心に', 'さえ', 'ばかり'],
            correctIndex: 0,
            explanation: 'Mulai dari Kepala Sekolah sebagai contoh utama: をはじめ.'
          }
        ]
      },
      {
        dayNumber: 4,
        dayTitle: '4日目：〜において・〜における',
        themeJp: '場所・時代・分野の限定',
        themeId: 'Ragam Formal Pengganti Partikel "De" untuk Lokasi / Era / Ranah',
        targetItems: [
          {
            japanese: '〜において / 〜における (~ ni oite / ~ ni okeru)',
            reading: 'ni oite / ni okeru',
            meaningId: 'Pada / di / dalam konteks (ragam resmi tulisan pengganti partikel で)',
            collocationOrUsage: 'KB + において (predikat) / における + KB',
            sampleSentenceJp: '東京ドームにおいて、国際平和サミットが開催された。',
            sampleSentenceId: 'Di Tokyo Dome, telah diselenggarakan konferensi tingkat tinggi perdamaian internasional.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '現代社会（　　）情報の重要性はますます高まっている。',
            options: ['における', 'において', 'を中心に', 'をはじめ'],
            correctIndex: 0,
            explanation: 'Menjelaskan kata benda "pentingnya informasi" di era masyarakat modern: における.'
          }
        ]
      },
      {
        dayNumber: 5,
        dayTitle: '5日目：使役受動態（〜させられる）',
        themeJp: '強制と不本意な動作',
        themeId: 'Dipaksa / Dibuat Terpaksa Melakukan Sesuatu oleh Pihak Lain',
        targetItems: [
          {
            japanese: '使役受動態 (Shieki Judoutai)',
            reading: 'saserareru / sareru',
            meaningId: 'Terpaksa / dibuat harus melakukan hal yang tidak disukai',
            collocationOrUsage: 'G1: 書かされる / G2: 食べさせられる / G3: させられる / こさせられる',
            sampleSentenceJp: '子どものころ、母に無理やり野菜を食べさせられた。',
            sampleSentenceId: 'Sewaktu masih kecil, saya dipaksa makan sayur oleh ibu.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '嫌いなピアノを毎日2時間も練習（　　）。',
            options: ['させられた', 'させた', 'された', 'してくれた'],
            correctIndex: 0,
            explanation: 'Dibuat terpaksa berlatih piano selama 2 jam: 練習させられた.'
          }
        ]
      },
      {
        dayNumber: 6,
        dayTitle: '6日目：〜っこない・〜かねない',
        themeJp: '強い否定と危険な可能性',
        themeId: 'Mustahil Terjadi vs Sangat Berisiko Berakibat Buruk',
        targetItems: [
          {
            japanese: '〜っこない (~ kko nai)',
            reading: 'kko nai',
            meaningId: 'Mustahil bisa terjadi! (Penolakan tegas dalam percakapan akrab)',
            collocationOrUsage: 'KK Masu stem + っこない',
            sampleSentenceJp: 'こんな難しい問題、誰にも解けっこないよ。',
            sampleSentenceId: 'Soal sesulit ini, mustahil ada orang yang sanggup menyelesaikannya!'
          },
          {
            japanese: '〜かねない (~ kanenai)',
            reading: 'kanenai',
            meaningId: 'Bisa-bisa berujung buruk / ada bahaya besar terjadi musibah',
            collocationOrUsage: 'KK Masu stem + かねない',
            sampleSentenceJp: 'スピードを出しすぎると、大事故を起こしかねない。',
            sampleSentenceId: 'Kalau mengebut terlalu kencang, bisa-bisa memicu kecelakaan parah.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '徹夜を続けると、過労で倒れ（　　）よ。',
            options: ['かねない', 'っこない', 'させられる', 'ばかりだ'],
            correctIndex: 0,
            explanation: 'Kekhawatiran akan kemungkinan berakibat buruk (tumbang pingsan): 倒れかねない.'
          }
        ]
      },
      {
        dayNumber: 7,
        dayTitle: '7日目：第4週 実践総復習テスト',
        themeJp: '限定・強調・受動使役の総仕上げ',
        themeId: 'Tes Komprehensif Evaluasi Akhir Minggu 4',
        targetItems: [
          {
            japanese: '実践ドリル総まとめ（第4週）',
            reading: 'jissen doriru soumatome',
            meaningId: 'Latihan soal integratif penekanan & pasif kausatif minggu ke-4'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '一日でこの分量を全部暗記なんて、でき（　　）。',
            options: ['っこない', 'かねない', 'において', 'さえ'],
            correctIndex: 0,
            explanation: 'Mustahil sanggup menghafal sebanyak itu dalam sehari: できっこない.'
          },
          {
            questionJp: '今年（　　）夢を実現してみせるぞ。',
            options: ['こそ', 'さえ', 'ばかり', 'のみ'],
            correctIndex: 0,
            explanation: 'Justru tahun inilah saat yang ditekankan: 今年こそ.'
          }
        ]
      }
    ]
  },

  // ===================== MINGGU 5 =====================
  {
    id: 'sm-n3-w5',
    level: 'N3',
    subject: 'bunpou',
    weekNumber: 5,
    weekTitleJp: '第5週：人間関係と丁寧な依頼・敬語',
    weekTitleId: 'Minggu 5: Hubungan Sosial, Permohonan Santun & Keigo Praktis',
    days: [
      {
        dayNumber: 1,
        dayTitle: '1日目：お／ご〜になる（尊敬語）',
        themeJp: '目上の人の動作を高める',
        themeId: 'Sonkeigo: Menghormati Aksi Subjek Orang yang Dihormati',
        targetItems: [
          {
            japanese: 'お／ご〜になる (Sonkeigo)',
            reading: 'o/go ~ ni naru',
            meaningId: 'Bapak/Ibu berkenan melakukan... (Meninggikan martabat lawan bicara)',
            collocationOrUsage: 'お + KK Masu stem + になる / ご + Kata Kango + になる',
            sampleSentenceJp: '社長はもうお帰りになりました。',
            sampleSentenceId: 'Bapak Direktur sudah berkenan pulang.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '先生、こちらの資料はもう（　　）になりましたか。',
            options: ['ご覧', 'お見せ', '拝見', '拝読'],
            correctIndex: 0,
            explanation: 'Sonkeigo untuk melihat (sensei ga miru): ご覧になる.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: '2日目：お／ご〜する・いたす（謙譲語）',
        themeJp: '自分の動作を低めて敬意を表す',
        themeId: 'Kenjougo: Merendahkan Diri Sendiri Demi Menghormati Lawan Bicara',
        targetItems: [
          {
            japanese: 'お／ご〜する・いたす (Kenjougo)',
            reading: 'o/go ~ suru / itasu',
            meaningId: 'Perkenankan saya melakukan... untuk Bapak/Ibu',
            collocationOrUsage: 'お + KK Masu stem + いたします / ご + Kango + いたします',
            sampleSentenceJp: '重い荷物を出口までお持ちいたします。',
            sampleSentenceId: 'Perkenankan saya membawakan barang bawaan berat ini hingga ke pintu keluar.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'メールに添付された書類を（　　）いたしました。',
            options: ['拝見', 'ご覧', 'お見せ', '見え'],
            correctIndex: 0,
            explanation: 'Kenjougo untuk saya melihat/membaca dokumen: 拝見いたしました.'
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: '3日目：〜ていただけないでしょうか',
        themeJp: '丁寧な依頼の最高峰',
        themeId: 'Memohon Bantuan Tanpa Terkesan Memaksa',
        targetItems: [
          {
            japanese: '〜ていただけないでしょうか (~ te itadakenai deshou ka)',
            reading: 'te itadakenai deshou ka',
            meaningId: 'Sudikah kiranya Bapak/Ibu berkenan...',
            collocationOrUsage: 'KK [Te] + いただけないでしょうか',
            sampleSentenceJp: 'この企画書に目を通していただけないでしょうか。',
            sampleSentenceId: 'Sudikah kiranya Bapak berkenan meluangkan pandangan memeriksa proposal ini?'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'もう一度ゆっくり説明して（　　）でしょうか。',
            options: ['いただけない', 'くださらない', 'もらえない', 'あげない'],
            correctIndex: 0,
            explanation: 'Permohonan santun beretika: いただけないでしょうか.'
          }
        ]
      },
      {
        dayNumber: 4,
        dayTitle: '4日目：〜させてもらえますか',
        themeJp: '許可を求める丁寧な表現',
        themeId: 'Memohon Izin Melakukan Sesuatu untuk Diri Sendiri',
        targetItems: [
          {
            japanese: '〜させていただけませんか (~ sasete itadakemasen ka)',
            reading: 'sasete itadakemasen ka',
            meaningId: 'Bolehkah saya diperkenankan untuk melakukan hal ini?',
            collocationOrUsage: 'KK Kausatif [Te] + いただけませんか',
            sampleSentenceJp: '体調が優れないため、本日は早退させていただけませんか。',
            sampleSentenceId: 'Karena kondisi badan kurang fit, bolehkah saya diperkenankan izin pulang lebih awal hari ini?'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '質問を一つ（　　）いただけませんか。',
            options: ['させて', 'して', 'されて', 'させられて'],
            correctIndex: 0,
            explanation: 'Memohon izin untuk bertanya: 質問を一つさせていただけませんか.'
          }
        ]
      },
      {
        dayNumber: 5,
        dayTitle: '5日目：〜ように言われる・頼まれる',
        themeJp: '第三者からの伝言と指示',
        themeId: 'Penyampaian Instruksi Tidak Langsung',
        targetItems: [
          {
            japanese: '〜ように言われる / 頼まれる (~ you ni iwareru / tanomareru)',
            reading: 'you ni iwareru',
            meaningId: 'Diinstruksikan atau dipesankan untuk...',
            collocationOrUsage: 'KK Kamus / Nai + ように言われる',
            sampleSentenceJp: '部長から会議室の鍵を閉めるように言われました。',
            sampleSentenceId: 'Saya dipesankan oleh Kepala Bagian agar mengunci pintu ruang rapat.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '先生に、明日までに宿題を出す（　　）言われました。',
            options: ['ように', 'とおりに', 'ために', 'わけに'],
            correctIndex: 0,
            explanation: 'Instruksi tidak langsung dari guru: 出すように言われました.'
          }
        ]
      },
      {
        dayNumber: 6,
        dayTitle: '6日目：〜とのことだ・〜そうだ（伝聞）',
        themeJp: '客観的な伝聞と報告',
        themeId: 'Melaporkan Informasi Resmi Pihak Ketiga',
        targetItems: [
          {
            japanese: '〜とのことだ (~ to no koto da)',
            reading: 'to no koto da',
            meaningId: 'Dinyatakan bahwa / menurut kabar resmi dari pihak terkait...',
            collocationOrUsage: 'Bentuk Biasa + とのことだ',
            sampleSentenceJp: '先方から、予定通り進めてほしいとのことです。',
            sampleSentenceId: 'Dari pihak klien, ada pesan bahwa mereka ingin proses dilanjutkan sesuai jadwal.'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'ニュースによると、明日は全国的に晴れる（　　）。',
            options: ['とのことだ', 'はずだ', 'べきだ', 'みたいだ'],
            correctIndex: 0,
            explanation: 'Mengutip kabar berita resmi secara formal: とのことだ.'
          }
        ]
      },
      {
        dayNumber: 7,
        dayTitle: '7日目：第5週 実践総復習テスト',
        themeJp: '敬語と人間関係の総仕上げ',
        themeId: 'Tes Komprehensif Evaluasi Akhir Minggu 5',
        targetItems: [
          {
            japanese: '実践ドリル総まとめ（第5週）',
            reading: 'jissen doriru soumatome',
            meaningId: 'Latihan soal integratif Keigo & relasi santun minggu ke-5'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '明日10時に、弊社オフィスへ（　　）いただけますか。',
            options: ['お越し', '参り', '拝見', '伺い'],
            correctIndex: 0,
            explanation: 'Sonkeigo meminta lawan bicara datang ke kantor kita: お越しいただけますか.'
          },
          {
            questionJp: 'こちらの席で少々（　　）になってお待ちください。',
            options: ['お掛け', 'お座り', '参り', 'いたし'],
            correctIndex: 0,
            explanation: 'Bentuk santun mempersilakan duduk: お掛けになってお待ちください.'
          }
        ]
      }
    ]
  },

  // ===================== MINGGU 6 =====================
  {
    id: 'sm-n3-w6',
    level: 'N3',
    subject: 'bunpou',
    weekNumber: 6,
    weekTitleJp: '第6週：実戦形式 総合模擬試験 総仕上げ',
    weekTitleId: 'Minggu 6: Simulasi Ujian Komprehensif JLPT N3 & Trik Jebakan',
    days: [
      {
        dayNumber: 1,
        dayTitle: '1日目：文法形式の判断 (Drill Pemilihan Pola Gramatikal)',
        themeJp: '類似表現の識別力',
        themeId: 'Membedah Pilihan Ganda & Membedakan Pola Serupa',
        targetItems: [
          {
            japanese: '文法形式の判断ドリル',
            reading: 'bunpou keishiki no handan',
            meaningId: 'Kecakapan memilih pola gramatikal yang tepat secara cepat dan akurat'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'あんなに一生懸命練習したのだから、明日の本番では実力を発揮できる（　　）。',
            options: ['はずだ', 'せいで', 'わりに', '反面'],
            correctIndex: 0,
            explanation: 'Dugaan kuat berdasar fakta deduktif: はずだ.'
          }
        ]
      },
      {
        dayNumber: 2,
        dayTitle: '2日目：文の組み立て・並べ替え (Soal Bintang ★ Susunan Kalimat)',
        themeJp: '語順の論理と係り結び',
        themeId: 'Teknik Menghubungkan Modifikator & Partikel Soal Bintang',
        targetItems: [
          {
            japanese: '文の組み立てドリル',
            reading: 'bun no kumitate doriru',
            meaningId: 'Menata 4 fragmen kata menjadi kalimat utuh dan menentukan isi bintang (★)'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'どんなに [ 1. 努力した ] [ 2. からといって ] [ ★ 3. 必ずしも ] [ 4. 成功するとは限らない ]。3番目に入るものは？',
            options: ['必ずしも', '努力した', 'からといって', '成功するとは限らない'],
            correctIndex: 0,
            explanation: 'Susunan kalimat logis: 努力した(1) からといって(2) ★必ずしも(3) 成功するとは限らない(4).'
          }
        ]
      },
      {
        dayNumber: 3,
        dayTitle: '3日目：文章の文法 (Tata Bahasa dalam Konteks Wacana)',
        themeJp: '文脈と指示語・接続詞',
        themeId: 'Menjaga Kohesi Antar Paragraf dan Aliran Argumen',
        targetItems: [
          {
            japanese: '文章の文法ドリル',
            reading: 'bunshou no bunpou',
            meaningId: 'Mengisi bagian rumpang di dalam wacana bacaan utuh'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '技術の進歩は生活を豊かにした。［　　］、新たな環境問題を引き起こしたことも事実である。',
            options: ['しかしながら', 'したがって', 'つまり', 'たとえば'],
            correctIndex: 0,
            explanation: 'Kata hubung pertentangan formal di awal kalimat: しかしながら.'
          }
        ]
      },
      {
        dayNumber: 4,
        dayTitle: '4日目：語彙・類義表現 (Kosakata & Padanan Kata Mirip)',
        themeJp: 'ニュアンスの微差を突く',
        themeId: 'Memilih Kata yang Tepat Sesuai Konteks Kolokasi',
        targetItems: [
          {
            japanese: '語彙類義語ドリル',
            reading: 'goi ruigigo doriru',
            meaningId: 'Penguasaan padanan sinonim dan penggunaan kata yang wajar'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '父の容態が［急に変わった］。下線部と意味が最も近いものは？',
            options: ['急変した', '変化した', '悪化した', '回復した'],
            correctIndex: 0,
            explanation: 'Istilah medis untuk kondisi darurat berubah mendadak: 急変した.'
          }
        ]
      },
      {
        dayNumber: 5,
        dayTitle: '5日目：読解・重要接続詞 (Membaca Cepat & Kata Sambung)',
        themeJp: '論理展開のシグナルワード',
        themeId: 'Mendeteksi Kesimpulan dan Pandangan Pribadi Penulis',
        targetItems: [
          {
            japanese: '論理シグナル読解ドリル',
            reading: 'ronri shigunaru dokkai',
            meaningId: 'Membaca cepat opini penulis lewat penanda kata sambung'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '「要するに」「つまり」「結局」の後に続く文章の性質は？',
            options: ['筆者の結論・要約', '反対の具体例', '原因の言い訳', '過去の回想'],
            correctIndex: 0,
            explanation: 'Kata sambung penutup berfungsi mengarahkan pembaca pada ringkasan atau kesimpulan inti penulis.'
          }
        ]
      },
      {
        dayNumber: 6,
        dayTitle: '6日目：聴解・即時応答 (Menyimak & Respon Seketika)',
        themeJp: '口頭表現と瞬発力',
        themeId: 'Merespon Cepat Ucapan Lawan Bicara Tanpa Berpikir Panjang',
        targetItems: [
          {
            japanese: '聴解即時応答ドリル',
            reading: 'choukai sokuji outou',
            meaningId: 'Melatih refleks merespon sapaan, tawaran, dan penolakan santun'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: '「この書類、コピーしておきましょうか。」に対する最も自然な返答は？',
            options: ['すみません、お願いします。', 'いいえ、コピーしません。', 'はい、コピーしました。', 'どういたしまして。'],
            correctIndex: 0,
            explanation: 'Respon menerima tawaran bantuan dengan santun: すみません、お願いします.'
          }
        ]
      },
      {
        dayNumber: 7,
        dayTitle: '7日目：6週間総決算 最終模擬試験 (Final Mock Exam JLPT N3)',
        themeJp: '完全マスターの実力判定',
        themeId: 'Ujian Final Lengkap Penentu Kelulusan JLPT N3',
        targetItems: [
          {
            japanese: '6週間総決算ファイナル模擬試験',
            reading: 'soukessan fainaru mogi shiken',
            meaningId: 'Simulasi final komprehensif menguji seluruh kompetensi tata bahasa N3'
          }
        ],
        dailyMiniTest: [
          {
            questionJp: 'この薬は、用法・用量を守って正しく服用（　　）効果が期待できます。',
            options: ['してはじめて', 'してからでないと', 'するばかりに', 'するわりに'],
            correctIndex: 0,
            explanation: 'Baru setelah diminum dengan patuh aturan, khasiatnya akan dirasakan: してはじめて.'
          },
          {
            questionJp: '先輩の助言の（　　）、無事にプレゼンを成功させることができた。',
            options: ['おかげで', 'せいで', 'わりに', '反面'],
            correctIndex: 0,
            explanation: 'Hasil positif berkat bantuan senior: おかげで.'
          }
        ]
      }
    ]
  }
];
