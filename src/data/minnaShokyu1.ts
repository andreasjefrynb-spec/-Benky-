import { MinnaLesson } from '../types';

export const minnaShokyu1Lessons: MinnaLesson[] = [
  {
    chapter: 1,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 1: Perkenalan Diri (〜は〜です)',
    theme: 'Perkenalan, Nama, Kewarganegaraan, Profesi, dan Umur',
    summary: 'Mempelajari kalimat dasar predikat kata benda: menyatakan identitas diri, menyangkal, bertanya, serta partikel "mo" (juga) dan "no" (kepemilikan).',
    grammarPatterns: [
      {
        id: 'm1-1',
        pattern: '〜は〜です (~ wa ~ desu)',
        formula: 'Kata Benda 1 [wa] Kata Benda 2 [desu]',
        explanation: 'Menyatakan bahwa Subjek (KB1) adalah Predikat (KB2). Partikel "wa" ditulis dengan hiragana は.',
        examples: [
          { jp: 'わたしは マイク・ミラーです。', reading: 'Watashi wa Maiku Miraa desu.', id: 'Saya adalah Mike Miller.' },
          { jp: 'サントスさんは ブラジル人です。', reading: 'Santosu-san wa Burajiru-jin desu.', id: 'Tuan Santos adalah orang Brasil.' }
        ]
      },
      {
        id: 'm1-2',
        pattern: '〜じゃありません (~ ja arimasen)',
        formula: 'KB1 [wa] KB2 [ja arimasen / dewa arimasen]',
        explanation: 'Bentuk negatif formal dari "desu" (bukan / tidak).',
        examples: [
          { jp: 'サントスさんは 学生じゃありません。', reading: 'Santosu-san wa gakusei ja arimasen.', id: 'Tuan Santos bukan seorang mahasiswa.' }
        ]
      },
      {
        id: 'm1-3',
        pattern: '〜ですか (~ desu ka)',
        formula: 'Kalimat + [ka]?',
        explanation: 'Partikel penanya "ka" diletakkan di akhir kalimat untuk mengubahnya menjadi kalimat tanya.',
        examples: [
          { jp: 'ミラーさんは 会社員ですか。', reading: 'Miraa-san wa kaishain desu ka.', id: 'Apakah Tuan Miller seorang karyawan perusahaan?' }
        ]
      },
      {
        id: 'm1-4',
        pattern: '〜も (~ mo) & 〜の (~ no)',
        formula: 'KB [mo] / KB1 [no] KB2',
        explanation: '"mo" berarti "juga". "no" menghubungkan dua kata benda (kepemilikan/afiliasi).',
        examples: [
          { jp: 'グプタさんも 会社員です。', reading: 'Guputa-san mo kaishain desu.', id: 'Tuan Gupta juga seorang karyawan.' },
          { jp: 'わたしは IMCの 社員です。', reading: 'Watashi wa IMC no shain desu.', id: 'Saya karyawan perusahaan IMC.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'わたし', reading: 'watashi', id: 'Saya' },
      { jp: 'あなた', reading: 'anata', id: 'Anda / Kamu' },
      { jp: 'あのひと', reading: 'ano hito', id: 'Orang itu' },
      { jp: '〜さん', reading: '~san', id: 'Sdr. / Tuan / Nyonya' },
      { jp: 'せんせい', reading: 'sensei', id: 'Guru / Pengajar' },
      { jp: 'がくせい', reading: 'gakusei', id: 'Mahasiswa / Murid' },
      { jp: 'かいしゃいん', reading: 'kaishain', id: 'Karyawan perusahaan' },
      { jp: 'ぎんこういん', reading: 'ginkouin', id: 'Pegawai bank' },
      { jp: 'いしゃ', reading: 'isha', id: 'Dokter' },
      { jp: 'けんきゅうしゃ', reading: 'kenkyuusha', id: 'Peneliti' },
      { jp: 'だいがく', reading: 'daigaku', id: 'Universitas' },
      { jp: 'びょういん', reading: 'byouin', id: 'Rumah sakit' },
      { jp: 'だれ (どなた)', reading: 'dare (donata)', id: 'Siapa (sopan)' },
      { jp: '〜さい', reading: '~sai', id: '... tahun (usia)' },
      { jp: 'なんさい', reading: 'nansai', id: 'Berapa umur' },
      { jp: 'はじめまして', reading: 'hajimemashite', id: 'Senang berkenalan (salam awal)' },
      { jp: 'どうぞよろしく', reading: 'douzo yoroshiku', id: 'Mohon bantuannya' }
    ],
    dialogue: {
      title: '初めまして (Senang Berkenalan)',
      lines: [
        { speaker: 'Satou', jp: 'おはようございます。', reading: 'Ohayou gozaimasu.', id: 'Selamat pagi.' },
        { speaker: 'Miller', jp: 'おはようございます。初めまして、マイク・ミラーです。アメリカから来ました。どうぞよろしく。', reading: 'Ohayou gozaimasu. Hajimemashite, Maiku Miraa desu. Amerika kara kimashita. Douzo yoroshiku.', id: 'Selamat pagi. Senang berkenalan, saya Mike Miller. Datang dari Amerika. Mohon bimbingannya.' },
        { speaker: 'Satou', jp: '佐藤けい子です。どうぞよろしくお願いします。', reading: 'Satou Keiko desu. Douzo yoroshiku onegai shimasu.', id: 'Saya Keiko Satou. Mohon kerja samanya.' }
      ]
    }
  },
  {
    chapter: 2,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 2: Menunjuk Benda (これ・それ・あれ)',
    theme: 'Kata Tunjuk Benda, Kepemilikan Barang, dan Konfirmasi',
    summary: 'Menunjuk benda dekat pembicara (kore), dekat lawan bicara (sore), dan jauh dari keduanya (are), serta penggunaan kono/sono/ano.',
    grammarPatterns: [
      {
        id: 'm2-1',
        pattern: 'これ / それ / あれ は 〜です',
        formula: 'kore / sore / are [wa] KB [desu]',
        explanation: 'Kata ganti penunjuk benda independen tanpa diikuti kata benda langsung.',
        examples: [
          { jp: 'これは 辞書です。', reading: 'Kore wa jisho desu.', id: 'Ini adalah kamus.' },
          { jp: 'それは わたしの 傘です。', reading: 'Sore wa watashi no kasa desu.', id: 'Itu adalah payung saya.' },
          { jp: 'あれは 車です。', reading: 'Are wa kuruma desu.', id: 'Yang di sana itu adalah mobil.' }
        ]
      },
      {
        id: 'm2-2',
        pattern: 'この / その / あの + KB',
        formula: 'kono / sono / ano + KB [wa] ...',
        explanation: 'Kata tunjuk yang harus melekat langsung sebelum kata benda yang diterangkan.',
        examples: [
          { jp: 'この本は わたしのです。', reading: 'Kono hon wa watashi no desu.', id: 'Buku ini adalah kepunyaan saya.' },
          { jp: 'あの方（かた）は どなたですか。', reading: 'Ano kata wa donata desu ka.', id: 'Orang di sana itu siapa?' }
        ]
      },
      {
        id: 'm2-3',
        pattern: '〜ですか、〜ですか (Pertanyaan Pilihan)',
        formula: 'KB1 [desu ka], KB2 [desu ka]',
        explanation: 'Memilih antara dua opsi. Tidak dijawab dengan "Hai" atau "Iie", melainkan langsung menyebutkan pilihannya.',
        examples: [
          { jp: 'これは 「９」ですか、「７」ですか。', reading: 'Kore wa "kyuu" desu ka, "nana" desu ka.', id: 'Apakah ini angka "9" atau "7"?' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'ほん', reading: 'hon', id: 'Buku' },
      { jp: 'じしょ', reading: 'jisho', id: 'Kamus' },
      { jp: 'ざっし', reading: 'zasshi', id: 'Majalah' },
      { jp: 'しんぶん', reading: 'shinbun', id: 'Koran' },
      { jp: 'ノート', reading: 'nooto', id: 'Buku catatan' },
      { jp: 'てちょう', reading: 'techou', id: 'Buku agenda / memo' },
      { jp: 'めいし', reading: 'meishi', id: 'Kartu nama' },
      { jp: 'えんぴつ', reading: 'enpitsu', id: 'Pensil' },
      { jp: 'ボールペン', reading: 'boorupen', id: 'Pulpen' },
      { jp: 'かぎ', reading: 'kagi', id: 'Kunci' },
      { jp: 'とけい', reading: 'tokei', id: 'Jam' },
      { jp: 'かさ', reading: 'kasa', id: 'Payung' },
      { jp: 'かばん', reading: 'kaban', id: 'Tas' },
      { jp: 'テレビ', reading: 'terebi', id: 'Televisi' },
      { jp: 'くるま', reading: 'kuruma', id: 'Mobil' },
      { jp: '机 (つくえ)', reading: 'tsukue', id: 'Meja' },
      { jp: '椅子 (いす)', reading: 'isu', id: 'Kursi' },
      { jp: 'おみやげ', reading: 'omiyage', id: 'Oleh-oleh' }
    ]
  },
  {
    chapter: 3,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 3: Menunjuk Tempat & Arah (ここ・そこ・あそこ)',
    theme: 'Lokasi Fasilitas, Lantai Bangunan, Asal Negara Produk, dan Harga',
    summary: 'Mempelajari kata tunjuk lokasi (koko, soko, asoko) dan arah sopan (kochira, sochira, achira), serta menanyakan harga (ikura).',
    grammarPatterns: [
      {
        id: 'm3-1',
        pattern: 'ここ / そこ / あそこ は 〜です',
        formula: 'koko / soko / asoko [wa] Tempat [desu]',
        explanation: 'Menyatakan tempat keberadaan (di sini, di situ, di sana).',
        examples: [
          { jp: 'ここは 食堂です。', reading: 'Koko wa shokudou desu.', id: 'Di sini adalah kantin.' },
          { jp: 'トイレは あそこです。', reading: 'Toire wa asoko desu.', id: 'Toilet ada di sebelah sana.' }
        ]
      },
      {
        id: 'm3-2',
        pattern: 'どこ (どちら) ですか',
        formula: 'Tempat / Orang [wa] doko / dochira [desu ka]',
        explanation: 'Menanyakan keberadaan lokasi suatu tempat, kantor, negara asal, atau lantai.',
        examples: [
          { jp: '事務所は どちらですか。', reading: 'Jimusho wa dochira desu ka.', id: 'Kantor ada di sebelah mana? (sopan)' },
          { jp: 'お国は どちらですか。', reading: 'Okuni wa dochira desu ka.', id: 'Anda berasal dari negara mana?' }
        ]
      },
      {
        id: 'm3-3',
        pattern: '〜いくらですか (~ ikura desu ka)',
        formula: 'Barang [wa] ikura [desu ka]',
        explanation: 'Menanyakan harga suatu barang.',
        examples: [
          { jp: 'この靴は いくらですか。', reading: 'Kono kutsu wa ikura desu ka.', id: 'Sepatu ini berapa harganya?' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'きょうしつ', reading: 'kyoushitsu', id: 'Ruang kelas' },
      { jp: 'しょくどう', reading: 'shokudou', id: 'Kantin / ruang makan' },
      { jp: 'じむしょ', reading: 'jimusho', id: 'Kantor' },
      { jp: 'かいぎしつ', reading: 'kaigishitsu', id: 'Ruang rapat' },
      { jp: 'うけつけ', reading: 'uketsuke', id: 'Resepsionis' },
      { jp: 'ロビー', reading: 'robii', id: 'Lobi' },
      { jp: 'へや', reading: 'heya', id: 'Kamar' },
      { jp: 'トイレ (おてあらい)', reading: 'toire (otearai)', id: 'Toilet' },
      { jp: 'かいだん', reading: 'kaidan', id: 'Tangga' },
      { jp: 'エレベーター', reading: 'erebeetaa', id: 'Lift / Elevator' },
      { jp: 'くに', reading: 'kuni', id: 'Negara' },
      { jp: 'かいしゃ', reading: 'kaisha', id: 'Perusahaan' },
      { jp: 'うち (いえ)', reading: 'uchi (ie)', id: 'Rumah' },
      { jp: 'うりば', reading: 'uriba', id: 'Tempat penjualan / counter' },
      { jp: 'ちか', reading: 'chika', id: 'Bawah tanah (basement)' },
      { jp: '〜かい (がい)', reading: '~kai (~gai)', id: 'Lantai ...' },
      { jp: '〜えん', reading: '~en', id: 'Yen (mata uang)' },
      { jp: 'いくら', reading: 'ikura', id: 'Berapa harga' }
    ]
  },
  {
    chapter: 4,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 4: Waktu, Jam & Hari (〜ます・〜ました)',
    theme: 'Menyatakan Jam, Menit, Hari, Rutinitas Kerja & Waktu Operasional',
    summary: 'Mengenal bentuk kata kerja non-lampau (~masu), negatif (~masen), lampau (~mashita), partikel kara (dari), made (sampai), dan ni (pada waktu).',
    grammarPatterns: [
      {
        id: 'm4-1',
        pattern: '今 〜時〜分です (Ima ~ji ~fun desu)',
        formula: 'Ima [Waktu] desu',
        explanation: 'Menyatakan waktu sekarang. Jam menggunakan ~ji, menit menggunakan ~fun/~pun.',
        examples: [
          { jp: '今 ４時５分です。', reading: 'Ima yo-ji go-fun desu.', id: 'Sekarang jam 4 lewat 5 menit.' }
        ]
      },
      {
        id: 'm4-2',
        pattern: 'Kata Kerja: 〜ます / 〜ません / 〜ました / 〜ませんでした',
        formula: 'Bentuk Masu dan konjugasi waktu lampau/negatif',
        explanation: 'Bentuk sopan kata kerja untuk rutinitas saat ini atau peristiwa lampau.',
        examples: [
          { jp: '毎朝 ６時に 起きます。', reading: 'Maiasa roku-ji ni okimasu.', id: 'Setiap pagi bangun pada jam 6.' },
          { jp: 'きのう 勉強しました。', reading: 'Kinou benkyou shimashita.', id: 'Kemarin sudah belajar.' }
        ]
      },
      {
        id: 'm4-3',
        pattern: '〜から 〜まで (~ kara ~ made)',
        formula: 'Waktu/Tempat 1 [kara] Waktu/Tempat 2 [made]',
        explanation: 'Menyatakan titik awal "dari" dan titik akhir "sampai/hingga".',
        examples: [
          { jp: '銀行は ９時から ３時までです。', reading: 'Ginkou wa ku-ji kara san-ji made desu.', id: 'Bank buka dari jam 9 sampai jam 3.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'おきます (起きます)', reading: 'okimasu', id: 'Bangun tidur' },
      { jp: 'ねます (寝ます)', reading: 'nemasu', id: 'Tidur' },
      { jp: 'はたらきます (働きます)', reading: 'hatarakimasu', id: 'Bekerja' },
      { jp: 'やすみます (休みます)', reading: 'yasumimasu', id: 'Istirahat / libur' },
      { jp: 'べんきょうします (勉強します)', reading: 'benkyou shimasu', id: 'Belajar' },
      { jp: 'おわります (終わります)', reading: 'owarimasu', id: 'Selesai' },
      { jp: 'いま (今)', reading: 'ima', id: 'Sekarang' },
      { jp: '〜じ (時)', reading: '~ji', id: 'Pukul / jam ...' },
      { jp: '〜ふん (分)', reading: '~fun / ~pun', id: '... menit' },
      { jp: 'はん (半)', reading: 'han', id: 'Setengah (30 menit)' },
      { jp: 'あさ (朝)', reading: 'asa', id: 'Pagi' },
      { jp: 'ひる (昼)', reading: 'hiru', id: 'Siang' },
      { jp: 'ばん (よる)', reading: 'ban (yoru)', id: 'Malam' },
      { jp: 'おととい', reading: 'ototoi', id: 'Kemarin lusa' },
      { jp: 'きのう', reading: 'kinou', id: 'Kemarin' },
      { jp: 'きょう', reading: 'kyou', id: 'Hari ini' },
      { jp: 'あした', reading: 'ashita', id: 'Besok' },
      { jp: 'あさって', reading: 'asatte', id: 'Besok lusa' },
      { jp: 'まいあさ', reading: 'maiasa', id: 'Setiap pagi' },
      { jp: 'まいばん', reading: 'maiban', id: 'Setiap malam' },
      { jp: 'まいにち', reading: 'mainichi', id: 'Setiap hari' }
    ]
  },
  {
    chapter: 5,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 5: Perpindahan & Transportasi (へ・で・と)',
    theme: 'Pergi, Datang, Pulang, Alat Transportasi, dan Teman Pergi',
    summary: 'Mempelajari partikel tujuan "e" (へ), partikel sarana/alat "de" (で), dan partikel penyerta "to" (と: bersama siapa).',
    grammarPatterns: [
      {
        id: 'm5-1',
        pattern: 'Tempat へ 行きます / 来ます / 帰ります',
        formula: 'Tempat [e] ikimasu / kimasu / kaerimasu',
        explanation: 'Partikel へ (dibaca "e") menandai arah atau tujuan gerak perpindahan tempat.',
        examples: [
          { jp: 'わたしは 京都へ 行きます。', reading: 'Watashi wa Kyouto e ikimasu.', id: 'Saya pergi ke Kyoto.' },
          { jp: '日本へ 来ました。', reading: 'Nihon e kimashita.', id: 'Sudah datang ke Jepang.' }
        ]
      },
      {
        id: 'm5-2',
        pattern: 'Kendaraan で 行きます',
        formula: 'Kendaraan / Sarana [de] ikimasu',
        explanation: 'Partikel で menunjukkan alat atau moda transportasi yang dipakai.',
        examples: [
          { jp: '電車で 行きます。', reading: 'Densha de ikimasu.', id: 'Pergi dengan naik kereta.' },
          { jp: '歩いて 帰ります。', reading: 'Aruite kaerimasu.', id: 'Pulang dengan jalan kaki (tanpa partikel de).' }
        ]
      },
      {
        id: 'm5-3',
        pattern: 'Orang と 行きます',
        formula: 'Orang [to] ikimasu',
        explanation: 'Partikel と menunjukkan mitra atau kawan yang menyertai tindakan ("bersama").',
        examples: [
          { jp: '家族と 日本へ 来ました。', reading: 'Kazoku to Nihon e kimashita.', id: 'Datang ke Jepang bersama keluarga.' },
          { jp: '一人で 行きます。', reading: 'Hitori de ikimasu.', id: 'Pergi sendirian.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'いきます (行きます)', reading: 'ikimasu', id: 'Pergi' },
      { jp: 'きます (来ます)', reading: 'kimasu', id: 'Datang' },
      { jp: 'かえります (帰ります)', reading: 'kaerimasu', id: 'Pulang' },
      { jp: 'がっこう (学校)', reading: 'gakkou', id: 'Sekolah' },
      { jp: 'スーパー', reading: 'suupaa', id: 'Supermarket' },
      { jp: 'えき (駅)', reading: 'eki', id: 'Stasiun' },
      { jp: 'ひこうき (飛行機)', reading: 'hikouki', id: 'Pesawat terbang' },
      { jp: 'ふね (船)', reading: 'fune', id: 'Kapal laut' },
      { jp: 'でんしゃ (電車)', reading: 'densha', id: 'Kereta listrik' },
      { jp: 'ちかてつ (地下鉄)', reading: 'chikatetsu', id: 'Kereta bawah tanah' },
      { jp: 'しんかんせん (新幹線)', reading: 'shinkansen', id: 'Shinkansen (kereta cepat)' },
      { jp: 'バス', reading: 'basu', id: 'Bus' },
      { jp: 'タクシー', reading: 'takushii', id: 'Taksi' },
      { jp: 'じてんしゃ (自転車)', reading: 'jitensha', id: 'Sepeda' },
      { jp: 'あるいて (歩いて)', reading: 'aruite', id: 'Jalan kaki' },
      { jp: 'ともだち (友達)', reading: 'tomodachi', id: 'Teman' },
      { jp: 'ひとりで (一人で)', reading: 'hitori de', id: 'Sendirian' },
      { jp: 'いつ', reading: 'itsu', id: 'Kapan' },
      { jp: 'たんじょうび', reading: 'tanjoubi', id: 'Hari ulang tahun' }
    ]
  },
  {
    chapter: 6,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 6: Objek Tindakan & Ajakan (〜を〜ます・〜ませんか)',
    theme: 'Objek Kerja, Tempat Beraktivitas, Ajakan Bersama, dan Menawarkan Bantuan',
    summary: 'Partikel を (wo/o) untuk objek langsung, partikel で untuk tempat beraktivitas, pola ajakan sopan ~masen ka, dan ajakan mari ~mashou.',
    grammarPatterns: [
      {
        id: 'm6-1',
        pattern: 'Objek を Kata Kerja',
        formula: 'KB (Objek) [o] Kata Kerja Transitif',
        explanation: 'Partikel を menandai objek langsung dari perbuatan.',
        examples: [
          { jp: 'ご飯を 食べます。', reading: 'Gohan o tabemasu.', id: 'Makan nasi.' },
          { jp: '水を 飲みます。', reading: 'Mizu o nomimasu.', id: 'Minum air.' }
        ]
      },
      {
        id: 'm6-2',
        pattern: 'Tempat で Kata Kerja',
        formula: 'Tempat [de] Kata Kerja',
        explanation: 'Partikel で menunjukkan tempat terjadinya suatu kegiatan aktif.',
        examples: [
          { jp: 'レストランで 昼ご飯を 食べます。', reading: 'Resutoran de hirugohan o tabemasu.', id: 'Makan siang di restoran.' }
        ]
      },
      {
        id: 'm6-3',
        pattern: '〜ませんか / 〜ましょう',
        formula: 'KK bentuk stem + [masen ka] / [mashou]',
        explanation: '"~masen ka" mengajak dengan sopan ("Maukah Anda...?"), sedangkan "~mashou" mengajak dengan tegas ("Ayo kita...").',
        examples: [
          { jp: 'いっしょに 京都へ 行きませんか。', reading: 'Issho ni Kyouto e ikimasen ka.', id: 'Maukah pergi ke Kyoto bersama-sama?' },
          { jp: 'ちょっと 休みましょう。', reading: 'Chotto yasumimashou.', id: 'Ayo kita istirahat sebentar.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'たべます (食べます)', reading: 'tabemasu', id: 'Makan' },
      { jp: 'のみます (飲みます)', reading: 'nomimasu', id: 'Minum' },
      { jp: 'すいます (吸います)', reading: 'suimasu', id: 'Menghisap (rokok)' },
      { jp: 'みます (見ます)', reading: 'mimasu', id: 'Melihat / menonton' },
      { jp: 'ききます (聞きます)', reading: 'kikimasu', id: 'Mendengar' },
      { jp: 'よみます (読みます)', reading: 'yomimasu', id: 'Membaca' },
      { jp: 'かきます (書きます)', reading: 'kakimasu', id: 'Menulis / menggambar' },
      { jp: 'かいます (買います)', reading: 'kaimasu', id: 'Membeli' },
      { jp: 'とります (撮ります)', reading: 'torimasu', id: 'Mengambil (foto)' },
      { jp: 'します', reading: 'shimasu', id: 'Melakukan / bermain' },
      { jp: 'あいます (会います)', reading: 'aimasu', id: 'Bertemu' },
      { jp: 'ごはん', reading: 'gohan', id: 'Nasi / makanan' },
      { jp: 'あさごはん', reading: 'asagohan', id: 'Sarapan' },
      { jp: 'ひるごはん', reading: 'hirugohan', id: 'Makan siang' },
      { jp: 'ばんごはん', reading: 'bangohan', id: 'Makan malam' },
      { jp: 'パン', reading: 'pan', id: 'Roti' },
      { jp: 'たまご (卵)', reading: 'tamago', id: 'Telur' },
      { jp: 'にく (肉)', reading: 'niku', id: 'Daging' },
      { jp: 'さかな (魚)', reading: 'sakana', id: 'Ikan' },
      { jp: 'やさい (野菜)', reading: 'yasai', id: 'Sayuran' },
      { jp: 'くだもの (果物)', reading: 'kudamono', id: 'Buah-buahan' }
    ]
  },
  {
    chapter: 7,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 7: Alat, Bahasa & Memberi (〜で〜ます・あげます・もらいます)',
    theme: 'Alat/Perantara, Terjemahan Bahasa, Memberi dan Menerima Barang',
    summary: 'Partikel で untuk alat/sarana/bahasa, rumus memberi (agemasu) dan menerima (moraimasu), serta konfirmasi penyelesaian (mou ~mashita).',
    grammarPatterns: [
      {
        id: 'm7-1',
        pattern: 'Alat / Bahasa で Kata Kerja',
        formula: 'Alat / Bahasa [de] Kata Kerja',
        explanation: 'Menunjukkan media, instrumen, atau bahasa yang dipakai.',
        examples: [
          { jp: 'はしで 食べます。', reading: 'Hashi de tabemasu.', id: 'Makan menggunakan sumpit.' },
          { jp: '日本語で レポートを 書きます。', reading: 'Nihongo de repooto o kakimasu.', id: 'Menulis laporan dalam bahasa Jepang.' }
        ]
      },
      {
        id: 'm7-2',
        pattern: 'Orang に Benda を あげます / もらいます',
        formula: 'Pemberi [wa] Penerima [ni] Benda [o agemasu] / Penerima [wa] Pemberi [ni/kara] Benda [o moraimasu]',
        explanation: 'Agemasu berarti "memberikan kepada", moraimasu berarti "menerima dari".',
        examples: [
          { jp: 'わたしは 木村さんに 花を あげました。', reading: 'Watashi wa Kimura-san ni hana o agemashita.', id: 'Saya memberikan bunga kepada Nn. Kimura.' },
          { jp: '山田さんに プレゼントを もらいました。', reading: 'Yamada-san ni purezento o moraimashita.', id: 'Menerima hadiah dari Tuan Yamada.' }
        ]
      },
      {
        id: 'm7-3',
        pattern: 'もう 〜ました (Mou ~mashita)',
        formula: 'mou + KK bentuk -mashita',
        explanation: 'Menyatakan bahwa tindakan sudah selesai dilakukan ("sudah...").',
        examples: [
          { jp: 'もう 荷物を 送りましたか。はい、もう 送りました。', reading: 'Mou nimotsu o okurimashita ka. Hai, mou okurimashita.', id: 'Apakah sudah mengirim barang paketnya? Ya, sudah kirim.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'きります (切ります)', reading: 'kirimasu', id: 'Memotong' },
      { jp: 'おくります (送ります)', reading: 'okurimasu', id: 'Mengirim' },
      { jp: 'あげます', reading: 'agemasu', id: 'Memberikan' },
      { jp: 'もらいます', reading: 'moraimasu', id: 'Menerima' },
      { jp: 'かします (貸します)', reading: 'kashimasu', id: 'Meminjamkan' },
      { jp: 'かります (借ります)', reading: 'karimasu', id: 'Meminjam' },
      { jp: 'おしえます (教えます)', reading: 'oshiemasu', id: 'Mengajar / memberi tahu' },
      { jp: 'ならいます (習います)', reading: 'naraimasu', id: 'Belajar (dari orang)' },
      { jp: 'はし', reading: 'hashi', id: 'Sumpit' },
      { jp: 'スプーン', reading: 'supuun', id: 'Sendok' },
      { jp: 'ナイフ', reading: 'naifu', id: 'Pisau' },
      { jp: 'フォーク', reading: 'fooku', id: 'Garpu' },
      { jp: 'はさみ', reading: 'hasami', id: 'Gunting' },
      { jp: 'パソコン', reading: 'pasokon', id: 'Laptop / PC' },
      { jp: 'ケータイ', reading: 'keetai', id: 'HP / Ponsel' },
      { jp: 'プレゼント', reading: 'purezento', id: 'Hadiah' },
      { jp: 'にもつ (荷物)', reading: 'nimotsu', id: 'Barang bawaan / paket' },
      { jp: 'おかね (お金)', reading: 'okane', id: 'Uang' },
      { jp: 'もう', reading: 'mou', id: 'Sudah' },
      { jp: 'まだ', reading: 'mada', id: 'Belum' }
    ]
  },
  {
    chapter: 8,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 8: Kata Sifat (い形容詞 & な形容詞)',
    theme: 'Sifat Benda, Kondisi Cuaca, Karakter Tempat, dan Rasa Makanan',
    summary: 'Mempelajari 2 golongan kata sifat: Kata Sifat-i (i-keiyoushi) dan Kata Sifat-na (na-keiyoushi), baik saat berdiri sebagai predikat maupun menerangkan kata benda.',
    grammarPatterns: [
      {
        id: 'm8-1',
        pattern: 'Kata Sifat sebagai Predikat Kalimat',
        formula: 'KB wa [I-Keiyoushi desu] / [Na-Keiyoushi desu]',
        explanation: 'I-Keiyoushi langsung + desu. Negatifnya akhiran "i" diubah jadi "kunai desu". Na-Keiyoushi memakai "desu", negatifnya "ja arimasen".',
        examples: [
          { jp: '富士山は 高いです。', reading: 'Fujisan wa takai desu.', id: 'Gunung Fuji tinggi.' },
          { jp: 'この町は 静かじゃありません。', reading: 'Kono machi wa shizuka ja arimasen.', id: 'Kota ini tidak tenang/sepi.' }
        ]
      },
      {
        id: 'm8-2',
        pattern: 'Kata Sifat Menerangkan Kata Benda',
        formula: '[I-Keiyoushi] + KB / [Na-Keiyoushi + na] + KB',
        explanation: 'Kata sifat-na harus menambahkan akhiran "na" saat berada tepat sebelum kata benda.',
        examples: [
          { jp: '奈良は 静かな 町です。', reading: 'Nara wa shizuka na machi desu.', id: 'Nara adalah kota yang tenang.' },
          { jp: '冷たい 水を 飲みました。', reading: 'Tsumetai mizu o nomimashita.', id: 'Minum air dingin.' }
        ]
      },
      {
        id: 'm8-3',
        pattern: '〜そして〜 / 〜が〜 (Penghubung dan vs tetapi)',
        formula: 'Kalimat 1 [soshite] Kalimat 2 / Kalimat 1 [ga], Kalimat 2',
        explanation: '"Soshite" menghubungkan dua sifat yang sejalan. "Ga" menghubungkan dua sifat yang kontras.',
        examples: [
          { jp: '日本の食べ物は 美味しいですが、高いです。', reading: 'Nihon no tabemono wa oishii desu ga, takai desu.', id: 'Makanan Jepang enak, tetapi mahal.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'ハンサム [な]', reading: 'hansamu [na]', id: 'Tampan / rupawan' },
      { jp: 'きれい [な]', reading: 'kirei [na]', id: 'Cantik / bersih / indah' },
      { jp: 'しずか [な]', reading: 'shizuka [na]', id: 'Tenang / sunyi' },
      { jp: 'にぎやか [な]', reading: 'nigiyaka [na]', id: 'Ramai' },
      { jp: 'ゆうめい [な]', reading: 'yuumei [na]', id: 'Terkenal' },
      { jp: 'しんせつ [な]', reading: 'shinsetsu [na]', id: 'Ramah / baik hati' },
      { jp: 'げんき [な]', reading: 'genki [na]', id: 'Sehat / bersemangat' },
      { jp: 'ひま [な]', reading: 'hima [na]', id: 'Senggang / luang' },
      { jp: 'べんり [な]', reading: 'benri [na]', id: 'Praktis' },
      { jp: 'おおきい (大きい)', reading: 'ookii', id: 'Besar' },
      { jp: 'ちいさい (小さい)', reading: 'chiisai', id: 'Kecil' },
      { jp: 'あたらしい (新しい)', reading: 'atarashii', id: 'Baru' },
      { jp: 'ふるい (古い)', reading: 'furui', id: 'Lama / tua' },
      { jp: 'いい (よい)', reading: 'ii (yoi)', id: 'Bagus / baik' },
      { jp: 'わるい (悪い)', reading: 'warui', id: 'Buruk / jelek' },
      { jp: 'あつい (暑い / 熱い)', reading: 'atsui', id: 'Panas (cuaca / benda)' },
      { jp: 'さむい (寒い)', reading: 'samui', id: 'Dingin (suhu udara)' },
      { jp: 'つめたい (冷たい)', reading: 'tsumetai', id: 'Dingin (benda disentuh)' },
      { jp: 'むずかしい (難しい)', reading: 'muzukashii', id: 'Sulit' },
      { jp: 'やさしい (易しい)', reading: 'yasashii', id: 'Mudah' },
      { jp: 'たかい (高い)', reading: 'takai', id: 'Mahal / tinggi' },
      { jp: 'やすい (安い)', reading: 'yasui', id: 'Murah' },
      { jp: 'おいしい', reading: 'oishii', id: 'Enak / lezat' },
      { jp: 'いそがしい (忙しい)', reading: 'isogashii', id: 'Sibuk' }
    ]
  },
  {
    chapter: 9,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 9: Kesukaan, Kemampuan & Alasan (〜が好き・上手・から)',
    theme: 'Suka/Tidak Suka, Pandai/Kurang, Kepemilikan & Alasan Sebab',
    summary: 'Partikel が (ga) untuk menyatakan kesukaan (suki), kebencian (kirai), keahlian (jouzu/heta), pemahaman (wakarimasu), dan alasan (kara).',
    grammarPatterns: [
      {
        id: 'm9-1',
        pattern: '〜が 好きです / 嫌いです / 上手です / 下手です',
        formula: 'KB [ga] suki / kirai / jouzu / heta [desu]',
        explanation: 'Objek rasa suka, benci, atau kemahiran ditandai dengan partikel が bukan を.',
        examples: [
          { jp: 'わたしは 日本料理が 好きです。', reading: 'Watashi wa Nihon ryouri ga suki desu.', id: 'Saya suka masakan Jepang.' },
          { jp: 'マリアさんは カラオケが 上手です。', reading: 'Maria-san wa karaoke ga jouzu desu.', id: 'Maria pandai bernyanyi karaoke.' }
        ]
      },
      {
        id: 'm9-2',
        pattern: '〜が わかります / あります',
        formula: 'KB [ga] wakarimasu / arimasu',
        explanation: 'Memahami bahasa/materi dan memiliki benda tak bernyawa/waktu luang menggunakan partikel が.',
        examples: [
          { jp: '日本語が 少し わかります。', reading: 'Nihongo ga sukoshi wakarimasu.', id: 'Paham bahasa Jepang sedikit.' },
          { jp: '車が あります。', reading: 'Kuruma ga arimasu.', id: 'Mempunyai mobil.' }
        ]
      },
      {
        id: 'm9-3',
        pattern: 'Alasan 〜から、〜 (Karena...)',
        formula: 'Kalimat Sebab [kara], Kalimat Akibat',
        explanation: '"Kara" di akhir kalimat pertama menyatakan alasan logis bagi kalimat berikutnya.',
        examples: [
          { jp: '時間が ありませんから、タクシーで 行きます。', reading: 'Jikan ga arimasen kara, takushii de ikimasu.', id: 'Karena tidak ada waktu, saya pergi naik taksi.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'わかります', reading: 'wakarimasu', id: 'Mengerti / paham' },
      { jp: 'あります', reading: 'arimasu', id: 'Ada / memiliki (benda mati)' },
      { jp: 'すき [な] (好き)', reading: 'suki [na]', id: 'Suka' },
      { jp: 'きらい [な] (嫌い)', reading: 'kirai [na]', id: 'Tidak suka / benci' },
      { jp: 'じょうず [な] (上手)', reading: 'jouzu [na]', id: 'Pandai / mahir' },
      { jp: 'へた [な] (下手)', reading: 'heta [na]', id: 'Kurang pandai / payah' },
      { jp: 'りょうり (料理)', reading: 'ryouri', id: 'Masakan' },
      { jp: 'のみもの (飲み物)', reading: 'nomimono', id: 'Minuman' },
      { jp: 'スポーツ', reading: 'supootsu', id: 'Olahraga' },
      { jp: 'おんがく (音楽)', reading: 'ongaku', id: 'Musik' },
      { jp: 'うた (歌)', reading: 'uta', id: 'Lagu' },
      { jp: 'ダンス', reading: 'dansu', id: 'Tarian' },
      { jp: 'じ (字)', reading: 'ji', id: 'Huruf / aksara' },
      { jp: 'かんじ (漢字)', reading: 'kanji', id: 'Huruf Kanji' },
      { jp: 'じかん (時間)', reading: 'jikan', id: 'Waktu' },
      { jp: 'ようじ (用事)', reading: 'youji', id: 'Urusan' },
      { jp: 'やくそく (約束)', reading: 'yakusoku', id: 'Janji' },
      { jp: 'よく', reading: 'yoku', id: 'Sering / dengan baik' },
      { jp: 'だいたい', reading: 'daitai', id: 'Sebagian besar / garis besar' },
      { jp: 'たくさん', reading: 'takusan', id: 'Banyak' },
      { jp: 'すこし (少し)', reading: 'sukoshi', id: 'Sedikit' },
      { jp: 'ぜんぜん (全然)', reading: 'zenzen', id: 'Sama sekali tidak (diikuti negatif)' }
    ]
  },
  {
    chapter: 10,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 10: Keberadaan Benda & Makhluk Hidup (あります・います)',
    theme: 'Keberadaan Benda Mati (Arimasu), Makhluk Hidup (Imasu), dan Posisi Ruang',
    summary: 'Membedakan kata kerja keberadaan: arimasu untuk tanaman/benda mati, dan imasu untuk manusia/hewan, serta kata penunjuk posisi (ue, shita, mae, ushiro, tonari, naka).',
    grammarPatterns: [
      {
        id: 'm10-1',
        pattern: 'Tempat に KB が あります / います',
        formula: 'Tempat [ni] Benda [ga arimasu] / Orang/Hewan [ga imasu]',
        explanation: 'Menyatakan keberadaan benda atau makhluk hidup di lokasi tertentu.',
        examples: [
          { jp: '部屋に 机が あります。', reading: 'Heya ni tsukue ga arimasu.', id: 'Di dalam kamar ada meja.' },
          { jp: '公園に 犬が います。', reading: 'Kouen ni inu ga imasu.', id: 'Di taman ada anjing.' }
        ]
      },
      {
        id: 'm10-2',
        pattern: 'KB1 の [Posisi] に KB2 が あります / います',
        formula: 'KB1 [no] ue / shita / mae / ushiro / naka / tonari [ni] KB2 [ga arimasu]',
        explanation: 'Menyatakan letak spesifik suatu benda relatif terhadap benda lain.',
        examples: [
          { jp: '机の 上に 本が あります。', reading: 'Tsukue no ue ni hon ga arimasu.', id: 'Di atas meja ada buku.' },
          { jp: '駅の 前に ポストが あります。', reading: 'Eki no mae ni posuto ga arimasu.', id: 'Di depan stasiun ada kotak pos.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'あります', reading: 'arimasu', id: 'Ada (benda mati/tumbuhan)' },
      { jp: 'います', reading: 'imasu', id: 'Ada (makhluk hidup: orang/hewan)' },
      { jp: 'いろいろ [な]', reading: 'iroiro [na]', id: 'Bermacam-macam' },
      { jp: 'おとこのひと (男の人)', reading: 'otoko no hito', id: 'Laki-laki dewasa' },
      { jp: 'おんなのひと (女の人)', reading: 'onna no hito', id: 'Perempuan dewasa' },
      { jp: 'おとこのこ (男の子)', reading: 'otoko no ko', id: 'Anak laki-laki' },
      { jp: 'おんなのこ (女の子)', reading: 'onna no ko', id: 'Anak perempuan' },
      { jp: 'いぬ (犬)', reading: 'inu', id: 'Anjing' },
      { jp: 'ねこ (猫)', reading: 'neko', id: 'Kucing' },
      { jp: 'き (木)', reading: 'ki', id: 'Pohon' },
      { jp: 'もの (物)', reading: 'mono', id: 'Barang' },
      { jp: 'うえ (上)', reading: 'ue', id: 'Atas' },
      { jp: 'した (下)', reading: 'shita', id: 'Bawah' },
      { jp: 'まえ (前)', reading: 'mae', id: 'Depan' },
      { jp: 'うしろ (後ろ)', reading: 'ushiro', id: 'Belakang' },
      { jp: 'みぎ (右)', reading: 'migi', id: 'Kanan' },
      { jp: 'ひだり (左)', reading: 'hidari', id: 'Kiri' },
      { jp: 'なか (中)', reading: 'naka', id: 'Dalam' },
      { jp: 'そと (外)', reading: 'soto', id: 'Luar' },
      { jp: 'となり (隣)', reading: 'tonari', id: 'Sebelah / tetangga' },
      { jp: 'ちかく (近く)', reading: 'chikaku', id: 'Dekat' },
      { jp: 'あいだ (間)', reading: 'aida', id: 'Antara' }
    ]
  },
  {
    chapter: 11,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 11: Satuan Hitungan & Durasi (〜枚・〜台・〜時間)',
    theme: 'Kata Bantu Bilangan, Menghitung Jumlah Benda, Jangka Waktu, dan Frekuensi',
    summary: 'Penggunaan hitungan dasar (hitotsu, futatsu), kata bantu bilangan khusus (~mai, ~dai, ~nin), durasi jam/minggu/bulan/tahun, dan partikel ni untuk frekuensi.',
    grammarPatterns: [
      {
        id: 'm11-1',
        pattern: 'KB を [Satuan Hitung] Kata Kerja',
        formula: 'KB [o] [Jumlah / Satuan] KK',
        explanation: 'Kata bantu bilangan umumnya diletakkan langsung sebelum kata kerja tanpa partikel tambahan.',
        examples: [
          { jp: 'りんごを ３つ 買いました。', reading: 'Ringo o mittsu kaimashita.', id: 'Membeli 3 buah apel.' },
          { jp: '切手を ２枚 貼りました。', reading: 'Kitte o ni-mai harimashita.', id: 'Menempelkan 2 lembar perangko.' }
        ]
      },
      {
        id: 'm11-2',
        pattern: 'Periode に [Frekuensi] 回 (Frekuensi Kegiatan)',
        formula: 'Periode [ni] Frekuensi [kai]',
        explanation: 'Menyatakan berapa kali suatu kegiatan dilakukan dalam jangka waktu tertentu.',
        examples: [
          { jp: '１か月に ２回 映画を 見ます。', reading: 'Ikkagetsu ni ni-kai eiga o mimasu.', id: 'Menonton film 2 kali dalam 1 bulan.' }
        ]
      },
      {
        id: 'm11-3',
        pattern: 'Durasi Waktu + かかります (Kakarimasu)',
        formula: 'Tempat 1 kara Tempat 2 made [Durasi] kakarimasu',
        explanation: 'Menyatakan lamanya waktu atau besarnya biaya yang dihabiskan.',
        examples: [
          { jp: '東京から 大阪まで 新幹線で ２時間半 かかります。', reading: 'Toukyou kara Oosaka made shinkansen de ni-jikan han kakarimasu.', id: 'Dari Tokyo sampai Osaka memakan waktu 2,5 jam dengan Shinkansen.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'ひとつ (１つ)', reading: 'hitotsu', id: '1 buah (umum)' },
      { jp: 'ふたつ (２つ)', reading: 'futatsu', id: '2 buah' },
      { jp: 'みっつ (３つ)', reading: 'mittsu', id: '3 buah' },
      { jp: 'よっつ (４つ)', reading: 'yottsu', id: '4 buah' },
      { jp: 'いつつ (５つ)', reading: 'itsutsu', id: '5 buah' },
      { jp: 'むっつ (６つ)', reading: 'muttsu', id: '6 buah' },
      { jp: 'ななつ (７つ)', reading: 'nanatsu', id: '7 buah' },
      { jp: 'やっつ (８つ)', reading: 'yattsu', id: '8 buah' },
      { jp: 'ここのつ (９つ)', reading: 'kokonotsu', id: '9 buah' },
      { jp: 'とお (１０)', reading: 'too', id: '10 buah' },
      { jp: 'いくつ', reading: 'ikutsu', id: 'Berapa buah' },
      { jp: '〜にん (人)', reading: '~nin', id: '... orang' },
      { jp: '〜だい (台)', reading: '~dai', id: '... unit (mesin/kendaraan)' },
      { jp: '〜まい (枚)', reading: '~mai', id: '... lembar (benda tipis/datar)' },
      { jp: '〜かい (回)', reading: '~kai', id: '... kali (frekuensi)' },
      { jp: 'りんご', reading: 'ringo', id: 'Apel' },
      { jp: 'みかん', reading: 'mikan', id: 'Jeruk' },
      { jp: 'きって (切手)', reading: 'kitte', id: 'Perangko' },
      { jp: 'はがき', reading: 'hagaki', id: 'Kartu pos' },
      { jp: 'ふうとう (封筒)', reading: 'fuutou', id: 'Amplop' },
      { jp: 'どのくらい', reading: 'dono kurai', id: 'Berapa lama / kira-kira seberapa' }
    ]
  },
  {
    chapter: 12,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 12: Kalimat Lampau Kata Sifat & Perbandingan (より・一番)',
    theme: 'Kondisi Lampau Kata Sifat/Benda, Komparasi 2 Hal, dan Superlatif (Paling)',
    summary: 'Bentuk lampau kata sifat (katta / deshita), membandingkan dua benda dengan yori (daripada), dan menyatakan hal yang paling unggul dengan ichiban.',
    grammarPatterns: [
      {
        id: 'm12-1',
        pattern: 'Bentuk Lampau Kata Sifat & Kata Benda',
        formula: 'I-Keiyoushi: ~katta desu / Na-Keiyoushi: ~deshita',
        explanation: 'Menyatakan kondisi atau sifat pada masa lampau.',
        examples: [
          { jp: '昨日は 寒かったです。', reading: 'Kinou wa samukatta desu.', id: 'Kemarin dingin.' },
          { jp: '旅行は 楽しかったです。', reading: 'Ryokou wa tanoshikatta desu.', id: 'Perjalanan wisatanya menyenangkan.' },
          { jp: '昨日は 雨でした。', reading: 'Kinou wa ame deshita.', id: 'Kemarin hujan.' }
        ]
      },
      {
        id: 'm12-2',
        pattern: 'KB1 は KB2 より [Kata Sifat] です (Komparatif)',
        formula: 'KB1 [wa] KB2 [yori] Sifat [desu]',
        explanation: 'KB1 lebih bersifat daripada KB2.',
        examples: [
          { jp: '新幹線は 飛行機より 安いです。', reading: 'Shinkansen wa hikouki yori yasui desu.', id: 'Shinkansen lebih murah daripada pesawat.' }
        ]
      },
      {
        id: 'm12-3',
        pattern: 'Kategori の中で [Kata Tanya] が 一番 [Sifat] ですか (Superlatif)',
        formula: 'Kategori [no naka de] nani/doko/dare [ga ichiban] Sifat [desu ka]',
        explanation: 'Menanyakan atau menyatakan hal yang paling nomor satu dalam suatu kelompok.',
        examples: [
          { jp: '１年で いつが 一番 寒いですか。２月が 一番 寒いです。', reading: 'Ichi-nen de itsu ga ichiban samui desu ka. Ni-gatsu ga ichiban samui desu.', id: 'Dalam setahun kapan yang paling dingin? Bulan Februari yang paling dingin.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'かんたん [な] (簡単)', reading: 'kantan [na]', id: 'Mudah / sederhana' },
      { jp: 'ちかい (近い)', reading: 'chikai', id: 'Dekat' },
      { jp: 'とおい (遠い)', reading: 'tooi', id: 'Jauh' },
      { jp: 'はやい (早い / 速い)', reading: 'hayai', id: 'Cepat / pagi' },
      { jp: 'おそい (遅い)', reading: 'osoi', id: 'Lambat / larut' },
      { jp: 'おおい (多い)', reading: 'ooi', id: 'Banyak (orang/benda)' },
      { jp: 'すくない (少ない)', reading: 'sukunai', id: 'Sedikit' },
      { jp: 'あたたかい (暖かい / 温かい)', reading: 'atatakai', id: 'Hangat' },
      { jp: 'すずしい (涼しい)', reading: 'suzushii', id: 'Sejuk' },
      { jp: 'あまい (甘い)', reading: 'amai', id: 'Manis' },
      { jp: 'からい (辛い)', reading: 'karai', id: 'Pedas' },
      { jp: 'おもい (重い)', reading: 'omoi', id: 'Berat' },
      { jp: 'かるい (軽い)', reading: 'karui', id: 'Ringan' },
      { jp: 'きせつ (季節)', reading: 'kisetsu', id: 'Musim' },
      { jp: 'はる (春)', reading: 'haru', id: 'Musim semi' },
      { jp: 'なつ (夏)', reading: 'natsu', id: 'Musim panas' },
      { jp: 'あき (秋)', reading: 'aki', id: 'Musim gugur' },
      { jp: 'ふゆ (冬)', reading: 'fuyu', id: 'Musim dingin' },
      { jp: 'てんき (天気)', reading: 'tenki', id: 'Cuaca' },
      { jp: 'あめ (雨)', reading: 'ame', id: 'Hujan' },
      { jp: 'ゆき (雪)', reading: 'yuki', id: 'Salju' }
    ]
  },
  {
    chapter: 13,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 13: Keinginan & Tujuan Gerak (〜が欲しい・〜たい・〜に行く)',
    theme: 'Menginginkan Benda (Hoshii), Ingin Berbuat (KK-tai), dan Pergi demi Suatu Tujuan',
    summary: 'Pola menyatakan keinginan memiliki benda (~ga hoshii), keinginan beraktivitas (kata kerja bentuk stem + tai), dan pola pergi/datang untuk melakukan sesuatu (~ni ikimasu).',
    grammarPatterns: [
      {
        id: 'm13-1',
        pattern: 'KB が 欲しいです (~ ga hoshii desu)',
        formula: 'KB [ga] hoshii desu',
        explanation: 'Menyatakan keinginan pembicara untuk memiliki suatu benda.',
        examples: [
          { jp: 'わたしは 新しい 車が 欲しいです。', reading: 'Watashi wa atarashii kuruma ga hoshii desu.', id: 'Saya ingin mobil baru.' }
        ]
      },
      {
        id: 'm13-2',
        pattern: 'KK Stem + たいです (~ tai desu)',
        formula: 'KK (Stem bentuk masu) + [tai desu]',
        explanation: 'Menyatakan keinginan diri sendiri untuk melakukan suatu tindakan.',
        examples: [
          { jp: '日本へ 行きたいです。', reading: 'Nihon e ikitai desu.', id: 'Saya ingin pergi ke Jepang.' },
          { jp: '寿司を（が）食べたいです。', reading: 'Sushi o (ga) tabetai desu.', id: 'Saya ingin makan sushi.' }
        ]
      },
      {
        id: 'm13-3',
        pattern: 'Tempat へ [KK Stem / KB] に 行きます / 来ます (Tujuan Gerak)',
        formula: 'Tempat [e] KK Stem / KB [ni] ikimasu/kimasu',
        explanation: 'Menyatakan tujuan dari kegiatan perpindahan tempat ("pergi untuk...").',
        examples: [
          { jp: 'デパートへ 買い物に 行きます。', reading: 'Depaato e kaimono ni ikimasu.', id: 'Pergi ke department store untuk berbelanja.' },
          { jp: '図書館へ 本を 借りに 行きます。', reading: 'Toshokan e hon o kari ni ikimasu.', id: 'Pergi ke perpustakaan untuk meminjam buku.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'あそびます (遊びます)', reading: 'asobimasu', id: 'Bermain / bersenang-senang' },
      { jp: 'およぎます (泳ぎます)', reading: 'oyogimasu', id: 'Berenang' },
      { jp: 'むかえます (迎えます)', reading: 'mukaemasu', id: 'Menjemput' },
      { jp: 'つかれます (疲れます)', reading: 'tsukaremasu', id: 'Lelah / capek' },
      { jp: 'けっこんします (結婚します)', reading: 'kekkon shimasu', id: 'Menikah' },
      { jp: 'かいものします (買い物します)', reading: 'kaimono shimasu', id: 'Berbelanja' },
      { jp: 'しょくじします (食事します)', reading: 'shokuji shimasu', id: 'Makan (bersantap)' },
      { jp: 'さんぽします (散歩します)', reading: 'sanpo shimasu', id: 'Jalan-jalan santai' },
      { jp: 'たいへん [な] (大変)', reading: 'taihen [na]', id: 'Berat / gawat / susah' },
      { jp: 'ほしい (欲しい)', reading: 'hoshii', id: 'Ingin (benda)' },
      { jp: 'ひろい (広い)', reading: 'hiroi', id: 'Luas' },
      { jp: 'せまい (狭い)', reading: 'semai', id: 'Sempit' },
      { jp: 'プール', reading: 'puuru', id: 'Kolam renang' },
      { jp: 'かわ (川)', reading: 'kawa', id: 'Sungai' },
      { jp: 'びじゅつ (美術)', reading: 'bijutsu', id: 'Seni rupa' },
      { jp: 'つり (釣り)', reading: 'tsuri', id: 'Memancing' }
    ]
  },
  {
    chapter: 14,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 14: Bentuk-Te & Permohonan (〜てください・〜ています)',
    theme: 'Konjugasi Bentuk-Te, Memohon Sopan, Sedang Berlangsung, dan Menawarkan Bantuan',
    summary: 'Perubahan bentuk Te (Te-kei) pada Golongan 1, 2, dan 3. Pola permohonan sopan (~te kudasai), aktivitas yang sedang berlangsung (~te imasu), dan menawarkan bantuan (~mashou ka).',
    grammarPatterns: [
      {
        id: 'm14-1',
        pattern: 'KK bentuk-Te + ください (Permohonan Tolong)',
        formula: 'KK [te-kei] + kudasai',
        explanation: 'Meminta atau memohon tolong kepada lawan bicara secara sopan.',
        examples: [
          { jp: 'ちょっと 待ってください。', reading: 'Chotto matte kudasai.', id: 'Tolong tunggu sebentar.' },
          { jp: 'ここに 名前を 書いてください。', reading: 'Koko ni namae o kaite kudasai.', id: 'Tolong tulis nama di sini.' }
        ]
      },
      {
        id: 'm14-2',
        pattern: 'KK bentuk-Te + います (Sedang Melakukan)',
        formula: 'KK [te-kei] + imasu',
        explanation: 'Menyatakan tindakan yang sedang berlangsung tepat pada saat ini.',
        examples: [
          { jp: '今 雨が 降っています。', reading: 'Ima ame ga futte imasu.', id: 'Sekarang sedang turun hujan.' },
          { jp: 'ミラーさんは 今 電話を かけています。', reading: 'Miraa-san wa ima denwa o kakete imasu.', id: 'Tuan Miller sedang menelepon.' }
        ]
      },
      {
        id: 'm14-3',
        pattern: 'KK Stem + ましょうか (Menawarkan Bantuan)',
        formula: 'KK (Stem masu) + mashou ka',
        explanation: 'Menawarkan bantuan kepada lawan bicara ("Bolehkah saya bantu... / Bagaimana kalau saya...").',
        examples: [
          { jp: '傘を 貸しましょうか。', reading: 'Kasa o kashimashou ka.', id: 'Bagaimana kalau saya pinjamkan payung?' },
          { jp: '荷物を 持ちましょうか。', reading: 'Nimotsu o mochimashou ka.', id: 'Bolehkah saya bawakan barang bawaan Anda?' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'つけます', reading: 'tsukemasu', id: 'Menyalakan (lampu/AC)' },
      { jp: 'けします (消します)', reading: 'keshimasu', id: 'Mematikan (lampu/api)' },
      { jp: 'あけます (開けます)', reading: 'akemasu', id: 'Membuka' },
      { jp: 'しめます (閉めます)', reading: 'shimemasu', id: 'Menutup' },
      { jp: 'いそぎます (急ぎます)', reading: 'isogimasu', id: 'Buru-buru / cepat-cepat' },
      { jp: 'まちます (待ちます)', reading: 'machimasu', id: 'Menunggu' },
      { jp: 'とめます (止めます)', reading: 'tomemasu', id: 'Menghentikan / memarkir' },
      { jp: 'まがります (曲がります)', reading: 'magarimasu', id: 'Berbelok' },
      { jp: 'もちます (持ちます)', reading: 'mochimasu', id: 'Membawa / memegang' },
      { jp: 'とります (取ります)', reading: 'torimasu', id: 'Mengambilkan' },
      { jp: 'てつだいます (手伝います)', reading: 'tetsudaimasu', id: 'Membantu' },
      { jp: 'よびます (呼びます)', reading: 'yobimasu', id: 'Memanggil' },
      { jp: 'はなします (話します)', reading: 'hanashimasu', id: 'Berbicara' },
      { jp: 'みせます (見せます)', reading: 'misemasu', id: 'Memperlihatkan' },
      { jp: 'ふります (降ります)', reading: 'furimasu', id: 'Turun (hujan/salju)' },
      { jp: 'コピーします', reading: 'kopiishimasu', id: 'Memfotokopi' },
      { jp: 'エアコン', reading: 'eakon', id: 'AC / pendingin ruangan' },
      { jp: 'パスポート', reading: 'pasupooto', id: 'Paspor' },
      { jp: 'なまえ (名前)', reading: 'namae', id: 'Nama' },
      { jp: 'じゅうしょ (住所)', reading: 'juusho', id: 'Alamat' }
    ]
  },
  {
    chapter: 15,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 15: Izin & Larangan (〜てもいいですか・〜てはいけません)',
    theme: 'Meminta Izin, Memberi Izin, Larangan Keras, dan Status Pekerjaan/Domisili',
    summary: 'Pola meminta izin (~te mo ii desu ka), larangan (~te wa ikemasen), serta penggunaan ~te imasu untuk menyatakan kondisi berkelanjutan (menikah, tinggal, bekerja di).',
    grammarPatterns: [
      {
        id: 'm15-1',
        pattern: 'KK bentuk-Te + もいいですか (Bolehkah...?)',
        formula: 'KK [te-kei] + mo ii desu ka',
        explanation: 'Meminta izin secara sopan untuk melakukan sesuatu.',
        examples: [
          { jp: '写真を 撮っても いいですか。', reading: 'Shashin o totte mo ii desu ka.', id: 'Bolehkah saya mengambil foto?' },
          { jp: 'ここに 座っても いいですか。', reading: 'Koko ni suwatte mo ii desu ka.', id: 'Bolehkah saya duduk di sini?' }
        ]
      },
      {
        id: 'm15-2',
        pattern: 'KK bentuk-Te + はいけません (Tidak Boleh / Larangan)',
        formula: 'KK [te-kei] + wa ikemasen',
        explanation: 'Menyatakan larangan tegas berdasarkan aturan atau etika.',
        examples: [
          { jp: 'ここで たばこを 吸っては いけません。', reading: 'Koko de tabako o sutte wa ikemasen.', id: 'Tidak boleh merokok di sini.' }
        ]
      },
      {
        id: 'm15-3',
        pattern: '〜知っています / 〜住んでいます / 〜働いています (Status Berkelanjutan)',
        formula: 'KK [te-kei] + imasu',
        explanation: 'Menyatakan status yang dihasilkan dari tindakan masa lalu yang masih berlanjut saat ini.',
        examples: [
          { jp: '東京に 住んでいます。', reading: 'Toukyou ni sunde imasu.', id: 'Tinggal di Tokyo.' },
          { jp: 'IMCで 働いています。', reading: 'IMC de hataraite imasu.', id: 'Bekerja di perusahaan IMC.' },
          { jp: '市役所の 電話番号を 知っていますか。いいえ、知りません。', reading: 'Shiyakusho no denwa bangou o shitte imasu ka. Iie, shirimasen.', id: 'Tahukah nomor telepon kantor balai kota? Tidak, saya tidak tahu.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'すわります (座ります)', reading: 'suwarimasu', id: 'Duduk' },
      { jp: 'たちます (立ちます)', reading: 'tachimasu', id: 'Berdiri' },
      { jp: 'つかいます (使います)', reading: 'tsukaimasu', id: 'Menggunakan / memakai' },
      { jp: 'おきます (置きます)', reading: 'okimasu', id: 'Meletakkan / menaruh' },
      { jp: 'つくります (作ります)', reading: 'tsukurimasu', id: 'Membuat / memproduksi' },
      { jp: 'うります (売ります)', reading: 'urimasu', id: 'Menjual' },
      { jp: 'しります (知ります)', reading: 'shirimasu', id: 'Mengetahui / kenal' },
      { jp: 'すみます (住みます)', reading: 'sumimasu', id: 'Tinggal / bermukim' },
      { jp: 'けんきゅうします (研究します)', reading: 'kenkyuu shimasu', id: 'Meneliti' },
      { jp: 'しりょう (資料)', reading: 'shiryou', id: 'Data / dokumen bahan' },
      { jp: 'カタログ', reading: 'katarogu', id: 'Katalog' },
      { jp: 'じこくひょう (時刻表)', reading: 'jikokuhyou', id: 'Jadwal keberangkatan kereta' },
      { jp: 'ふく (服)', reading: 'fuku', id: 'Pakaian / baju' },
      { jp: 'せいひん (製品)', reading: 'seihin', id: 'Produk barang jadi' },
      { jp: 'ソフト', reading: 'sofuto', id: 'Perangkat lunak (software)' },
      { jp: 'せんもん (専門)', reading: 'senmon', id: 'Keahlian khusus / jurusan' },
      { jp: 'はいしゃ (歯医者)', reading: 'haisha', id: 'Dokter gigi' },
      { jp: 'どくしん (独身)', reading: 'dokushin', id: 'Lajang / belum menikah' }
    ]
  },
  {
    chapter: 16,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 16: Urutan Tindakan (〜てから) & Menggabungkan Sifat (〜くて・〜で)',
    theme: 'Rangkaian Perbuatan Berurutan, Setelah Melakukan, dan Karakteristik Ganda',
    summary: 'Menyambung kata kerja secara berurutan dengan bentuk-Te, pola ~te kara (setelah...), dan menggabungkan kata sifat (~kute untuk i-keiyoushi, ~de untuk na-keiyoushi).',
    grammarPatterns: [
      {
        id: 'm16-1',
        pattern: 'KK1-て、KK2-て、KK3-ます (Rangkaian Tindakan)',
        formula: 'KK1 [te], KK2 [te], KK3 [masu]',
        explanation: 'Menghubungkan dua atau lebih tindakan yang dilakukan secara berurutan secara kronologis.',
        examples: [
          { jp: '朝 ジョギングを して、シャワーを 浴びて、会社へ 行きます。', reading: 'Asa jogingu o shite, shawaa o abite, kaisha e ikimasu.', id: 'Pagi hari joging, mandi shower, lalu pergi ke kantor.' }
        ]
      },
      {
        id: 'm16-2',
        pattern: 'KK1 bentuk-Te + から、KK2 (Setelah Melakukan KK1)',
        formula: 'KK1 [te-kei] + kara, KK2',
        explanation: 'Menegaskan bahwa tindakan kedua baru dilakukan setelah tindakan pertama benar-benar selesai.',
        examples: [
          { jp: '国へ 帰ってから、父の 会社で 働きます。', reading: 'Kuni e kaette kara, chichi no kaisha de hatarakimasu.', id: 'Setelah pulang ke tanah air, saya akan bekerja di perusahaan ayah.' }
        ]
      },
      {
        id: 'm16-3',
        pattern: 'Kata Sifat Bentuk Sambung (〜くて / 〜で)',
        formula: 'I-Keiyoushi (~kute) / Na-Keiyoushi (~de)',
        explanation: 'Menyambung dua kata sifat atau predikat.',
        examples: [
          { jp: 'ミラーさんは 若くて、親切です。', reading: 'Miraa-san wa wakakute, shinsetsu desu.', id: 'Tuan Miller muda dan ramah.' },
          { jp: '奈良は 静かで、きれいな 町です。', reading: 'Nara wa shizuka de, kirei na machi desu.', id: 'Nara tenang dan kota yang indah.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'のります (乗ります)', reading: 'norimasu', id: 'Naik (kendaraan)' },
      { jp: 'おります (降ります)', reading: 'orimasu', id: 'Turun (dari kendaraan)' },
      { jp: 'のりかえます (乗り換えます)', reading: 'norikaemasu', id: 'Pindah jalur / transit kendaraan' },
      { jp: 'あびます (浴びます)', reading: 'abimasu', id: 'Mandi (shower)' },
      { jp: 'いれます (入れます)', reading: 'iremasu', id: 'Memasukkan' },
      { jp: 'だします (出します)', reading: 'dashimasu', id: 'Mengeluarkan / menyerahkan' },
      { jp: 'おろします (下ろします)', reading: 'oroshimasu', id: 'Menarik (uang di ATM)' },
      { jp: 'はいります (入ります)', reading: 'hairimasu', id: 'Masuk' },
      { jp: 'でます (出ます)', reading: 'demasu', id: 'Keluar' },
      { jp: 'おします (押します)', reading: 'oshimasu', id: 'Menekan (tombol)' },
      { jp: 'わかい (若い)', reading: 'wakai', id: 'Muda' },
      { jp: 'ながい (長い)', reading: 'nagai', id: 'Panjang' },
      { jp: 'みじかい (短い)', reading: 'mijikai', id: 'Pendek' },
      { jp: 'あかるい (明るい)', reading: 'akarui', id: 'Terang / ceria' },
      { jp: 'くらい (暗い)', reading: 'kurai', id: 'Gelap' },
      { jp: 'からだ (体)', reading: 'karada', id: 'Tubuh / badan' },
      { jp: 'あたま (頭)', reading: 'atama', id: 'Kepala' },
      { jp: 'め (目)', reading: 'me', id: 'Mata' },
      { jp: 'みみ (耳)', reading: 'mimi', id: 'Telinga' },
      { jp: 'はな (鼻)', reading: 'hana', id: 'Hidung' },
      { jp: 'くち (口)', reading: 'kuchi', id: 'Mulut' },
      { jp: 'は (歯)', reading: 'ha', id: 'Gigi' }
    ]
  },
  {
    chapter: 17,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 17: Bentuk Negatif (〜ないでください・〜なければなりません)',
    theme: 'Konjugasi Bentuk-Nai, Larangan Sopan, Keharusan, dan Ketidakhadiran Kewajiban',
    summary: 'Perubahan bentuk negatif kasual (Nai-kei). Pola tolong jangan (~naide kudasai), keharusan wajib (~nakereba narimasen), dan tidak wajib (~nakute mo ii desu).',
    grammarPatterns: [
      {
        id: 'm17-1',
        pattern: 'KK bentuk-Nai + でください (Tolong Jangan...)',
        formula: 'KK [nai-kei] + de kudasai',
        explanation: 'Meminta lawan bicara agar tidak melakukan suatu hal secara sopan.',
        examples: [
          { jp: 'ここで 写真を 撮らないで ください。', reading: 'Koko de shashin o toranaide kudasai.', id: 'Tolong jangan memotret di sini.' }
        ]
      },
      {
        id: 'm17-2',
        pattern: 'KK bentuk-Nai (-i diganti) + ければなりません (Harus / Wajib)',
        formula: 'KK [nakereba narimasen]',
        explanation: 'Menyatakan kewajiban atau keharusan mutlak tanpa memandang kemauan pribadi.',
        examples: [
          { jp: '薬を 飲まなければ なりません。', reading: 'Kusuri o nomanakereba narimasen.', id: 'Harus minum obat.' },
          { jp: 'パスポートを 見せなければ なりません。', reading: 'Pasupooto o misenakereba narimasen.', id: 'Harus memperlihatkan paspor.' }
        ]
      },
      {
        id: 'm17-3',
        pattern: 'KK bentuk-Nai (-i diganti) + くてもいいです (Tidak Perlu / Boleh Tidak)',
        formula: 'KK [nakute mo ii desu]',
        explanation: 'Menyatakan tidak adanya keharusan atau kewajiban.',
        examples: [
          { jp: '明日 来なくても いいです。', reading: 'Ashita konakute mo ii desu.', id: 'Besok tidak perlu datang juga tidak apa-apa.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'おぼえます (覚えます)', reading: 'oboemasu', id: 'Mengingat / menghafal' },
      { jp: 'わすれます (忘れます)', reading: 'wasuremasu', id: 'Lupa' },
      { jp: 'なくします', reading: 'nakushimasu', id: 'Menghilangkan / hilang' },
      { jp: 'はらいます (払います)', reading: 'haraimasu', id: 'Membayar' },
      { jp: 'かえします (返します)', reading: 'kaeshimasu', id: 'Mengembalikan' },
      { jp: 'でかけます (出かけます)', reading: 'dekakemasu', id: 'Bepergian keluar' },
      { jp: 'ぬぎます (脱ぎます)', reading: 'nugimasu', id: 'Melepas (pakaian/sepatu)' },
      { jp: 'もっていきます (持って行きます)', reading: 'motte ikimasu', id: 'Membawa pergi' },
      { jp: 'もってきます (持って来ます)', reading: 'motte kimasu', id: 'Membawa datang ke mari' },
      { jp: 'しんぱいします (心配します)', reading: 'shinpai shimasu', id: 'Khawatir / cemas' },
      { jp: 'ざんぎょうします (残業します)', reading: 'zangyou shimasu', id: 'Lembur kerja' },
      { jp: 'しゅっちょうします (出張します)', reading: 'shucchou shimasu', id: 'Dinas luar kota' },
      { jp: 'くすり (薬)', reading: 'kusuri', id: 'Obat' },
      { jp: 'ほけんしょう (保険証)', reading: 'hokenshou', id: 'Kartu asuransi kesehatan' },
      { jp: 'ねつ (熱)', reading: 'netsu', id: 'Demam / panas tubuh' },
      { jp: 'びょうき (病気)', reading: 'byouki', id: 'Sakit / penyakit' },
      { jp: 'たいせつ [な] (大切)', reading: 'taisetsu [na]', id: 'Penting / berharga' },
      { jp: 'だいじょうぶ [な] (大丈夫)', reading: 'daijoubu [na]', id: 'Tidak apa-apa / aman' }
    ]
  },
  {
    chapter: 18,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 18: Kemampuan & Hobi (〜ことができる・趣味は〜ことです)',
    theme: 'Bentuk Kamus (Jisho-kei), Menyatakan Kemampuan (Dekiru), Hobi, dan Sebelum Melakukan',
    summary: 'Konjugasi bentuk kamus kata kerja. Pola sanggup berbuat (~koto ga dekimasu), menjelaskan hobi (~koto desu), dan urutan waktu sebelum (~mae ni).',
    grammarPatterns: [
      {
        id: 'm18-1',
        pattern: 'KK bentuk Kamus + ことが できます (Bisa / Mampu Melakukan)',
        formula: 'KK [jisho-kei] + koto ga dekimasu',
        explanation: 'Menyatakan kesanggupan, keterampilan, atau izin situasional.',
        examples: [
          { jp: 'ミラーさんは 漢字を 読むことが できます。', reading: 'Miraa-san wa kanji o yomu koto ga dekimasu.', id: 'Tuan Miller bisa membaca huruf Kanji.' },
          { jp: 'カードで 払うことが できます。', reading: 'Kaado de harau koto ga dekimasu.', id: 'Bisa membayar menggunakan kartu.' }
        ]
      },
      {
        id: 'm18-2',
        pattern: 'わたしの 趣味は [KK Kamus + こと] です (Hobi Saya Adalah...)',
        formula: 'Watashi no shumi wa KK [jisho-kei] + koto desu',
        explanation: 'Mengubah kata kerja menjadi kata benda dengan menambahkan "koto" untuk menjelaskan hobi.',
        examples: [
          { jp: 'わたしの 趣味は 写真を 撮ることです。', reading: 'Watashi no shumi wa shashin o toru koto desu.', id: 'Hobi saya adalah memotret foto.' }
        ]
      },
      {
        id: 'm18-3',
        pattern: 'KK Kamus / Waktu + 前に (Sebelum...)',
        formula: 'KK [jisho-kei] / KB [no] + mae ni',
        explanation: 'Menyatakan bahwa suatu perbuatan dilakukan sebelum perbuatan lainnya.',
        examples: [
          { jp: '寝る 前に、日記を 書きます。', reading: 'Neru mae ni, nikki o kakimasu.', id: 'Sebelum tidur, saya menulis buku harian.' },
          { jp: '食事の 前に、手を 洗います。', reading: 'Shokuji no mae ni, te o araimasu.', id: 'Sebelum makan, mencuci tangan.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'できます', reading: 'dekimasu', id: 'Bisa / sanggup' },
      { jp: 'あらいます (洗います)', reading: 'araimasu', id: 'Mencuci' },
      { jp: 'ひきます (弾きます)', reading: 'hikimasu', id: 'Memainkan (alat musik petik/tuts: piano/gitar)' },
      { jp: 'うたいます (歌います)', reading: 'utaimasu', id: 'Bernyanyi' },
      { jp: 'あつめます (集めます)', reading: 'atsumemasu', id: 'Mengumpulkan / mengoleksi' },
      { jp: 'すてます (捨てます)', reading: 'sutemasu', id: 'Membuang' },
      { jp: 'かえます (換えます)', reading: 'kaemasu', id: 'Menukar / mengganti' },
      { jp: 'うんてんします (運転します)', reading: 'unten shimasu', id: 'Mengemudi / menyetir' },
      { jp: 'よやくします (予約します)', reading: 'yoyaku shimasu', id: 'Memesan / reservasi' },
      { jp: 'ピアノ', reading: 'piano', id: 'Piano' },
      { jp: '〜メートル', reading: '~meetoru', id: '... meter' },
      { jp: 'げんきん (現金)', reading: 'genkin', id: 'Uang tunai' },
      { jp: 'しゅみ (趣味)', reading: 'shumi', id: 'Hobi' },
      { jp: 'にっき (日記)', reading: 'nikki', id: 'Buku harian' },
      { jp: 'おいのり (お祈り)', reading: 'oinori', id: 'Doa / ibadah' },
      { jp: 'かちょう (課長)', reading: 'kachou', id: 'Kepala seksi / manajer bagian' },
      { jp: 'ぶちょう (部長)', reading: 'buchou', id: 'Kepala departemen' },
      { jp: 'しゃちょう (社長)', reading: 'shachou', id: 'Direktur utama perusahaan' }
    ]
  },
  {
    chapter: 19,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 19: Pengalaman & Variasi Tindakan (〜たことがある・〜たり〜たり)',
    theme: 'Bentuk Lampau Kasual (Ta-kei), Riwayat Pernah Melakukan, Daftar Contoh Kegiatan, dan Perubahan Keadaan',
    summary: 'Konjugasi bentuk-Ta. Pola pernah berpengalaman (~ta koto ga arimasu), menyebutkan contoh perbuatan bolak-balik (~tari ~tari shimasu), dan perubahan keadaan (~ku narimasu / ~ni narimasu).',
    grammarPatterns: [
      {
        id: 'm19-1',
        pattern: 'KK bentuk-Ta + ことが あります (Pernah...)',
        formula: 'KK [ta-kei] + koto ga arimasu',
        explanation: 'Menyatakan pengalaman hidup masa lalu ("pernah melakukan...").',
        examples: [
          { jp: '馬に 乗った ことが あります。', reading: 'Uma ni notta koto ga arimasu.', id: 'Pernah naik kuda.' },
          { jp: '富士山に 登った ことが ありますか。', reading: 'Fujisan ni nobotta koto ga arimasu ka.', id: 'Apakah pernah mendaki Gunung Fuji?' }
        ]
      },
      {
        id: 'm19-2',
        pattern: 'KK1-たり、KK2-たり します (Melakukan Kegiatan A, B, dll.)',
        formula: 'KK1 [tari], KK2 [tari] shimasu',
        explanation: 'Menyebutkan perwakilan beberapa tindakan tanpa terikat urutan kronologis kaku.',
        examples: [
          { jp: '休みの 日は 掃除したり、洗濯したり します。', reading: 'Yasumi no hi wa souji shitari, sentaku shitari shimasu.', id: 'Di hari libur, saya bersih-bersih, mencuci baju, dan sebagainya.' }
        ]
      },
      {
        id: 'm19-3',
        pattern: 'Kata Sifat + なります (Menjadi / Berubah Keadaan)',
        formula: 'I-Keiyoushi (~ku narimasu) / Na-Keiyoushi & KB (~ni narimasu)',
        explanation: 'Menyatakan perubahan suatu sifat, kondisi, umur, atau profesi.',
        examples: [
          { jp: '寒く なりました。', reading: 'Samuku narimashita.', id: 'Cuaca sudah menjadi dingin.' },
          { jp: '元気になりました。', reading: 'Genki ni narimashita.', id: 'Sudah menjadi sembuh/sehat.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'のぼります (登ります)', reading: 'noborimasu', id: 'Mendaki' },
      { jp: 'とまります (泊まります)', reading: 'tomarimasu', id: 'Menginap (hotel/ryokan)' },
      { jp: 'そうじします (掃除します)', reading: 'souji shimasu', id: 'Membersihkan rumah' },
      { jp: 'せんたくします (洗濯します)', reading: 'sentaku shimasu', id: 'Mencuci pakaian' },
      { jp: 'なります', reading: 'narimasu', id: 'Menjadi' },
      { jp: 'ねむい (眠い)', reading: 'nemui', id: 'Mengantuk' },
      { jp: 'つよい (強い)', reading: 'tsuyoi', id: 'Kuat' },
      { jp: 'よわい (弱い)', reading: 'yowai', id: 'Lemah' },
      { jp: 'ちょうし (調子)', reading: 'choushi', id: 'Kondisi tubuh / mesin' },
      { jp: 'いちど (一度)', reading: 'ichido', id: 'Satu kali' },
      { jp: 'いちども (一度も)', reading: 'ichido mo', id: 'Belum pernah sama sekali (diikuti negatif)' },
      { jp: 'だんだん', reading: 'dandan', id: 'Berangsur-angsur / makin lama makin' },
      { jp: 'もうすぐ', reading: 'mousugu', id: 'Sebentar lagi' },
      { jp: 'おかげさまで', reading: 'okagesama de', id: 'Berkat doa Anda (puji syukur)' },
      { jp: 'かんぱい (乾杯)', reading: 'kanpai', id: 'Bersulang!' }
    ]
  },
  {
    chapter: 20,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 20: Bahasa Kasual / Percakapan Akrab (普通形 Futsuukei)',
    theme: 'Gaya Bahasa Biasa (Bentuk Biasa) Antar Teman Dekat & Keluarga',
    summary: 'Konversi bentuk sopan (Teineigo) ke bentuk biasa/kasual (Futsuukei). Intonasi pertanyaan tanpa ka, penghilangan da pada percakapan kata sifat-na/benda, dan partikel akhir kasual.',
    grammarPatterns: [
      {
        id: 'm20-1',
        pattern: 'Tabel Perubahan Bentuk Biasa (Futsuukei)',
        formula: 'Iku (ikimasu) | Ikanai (ikimasen) | Itta (ikimashita) | Ikanakatta (ikimasen deshita)',
        explanation: 'Dipakai berbicara akrab dengan teman sebaya, keluarga, atau bawahan.',
        examples: [
          { jp: '明日 東京へ 行く？ うん、行く。', reading: 'Ashita Toukyou e iku? Un, iku.', id: 'Besok kamu pergi ke Tokyo? Ya, pergi.' },
          { jp: 'コーヒーを 飲む？ ううん、飲まない。', reading: 'Koohii o nomu? Uun, nomanai.', id: 'Mau minum kopi? Nggak, nggak minum.' }
        ]
      },
      {
        id: 'm20-2',
        pattern: 'Pertanyaan dalam Bentuk Kasual',
        formula: 'Kalimat bentuk biasa + intonasi naik ↗ (tanpa partikel ka)',
        explanation: 'Pada kata benda dan kata sifat-na, "da" dihilangkan saat bertanya, diganti intonasi naik.',
        examples: [
          { jp: '今 暇？ うん、暇だよ。', reading: 'Ima hima? Un, hima da yo.', id: 'Sekarang kamu senggang? Ya, senggang kok.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'いります (要ります)', reading: 'irimasu', id: 'Perlu / membutuhkan' },
      { jp: 'しらべます (調べます)', reading: 'shirabemasu', id: 'Memeriksa / mencari tahu' },
      { jp: 'なおします (直します)', reading: 'naoshimasu', id: 'Memperbaiki' },
      { jp: 'しゅうりします (修理します)', reading: 'shuuri shimasu', id: 'Mereparasi' },
      { jp: 'でんわします (電話します)', reading: 'denwa shimasu', id: 'Menelepon' },
      { jp: 'ぼく (僕)', reading: 'boku', id: 'Aku (laki-laki akrab)' },
      { jp: 'きみ (君)', reading: 'kimi', id: 'Kamu (akrab)' },
      { jp: 'うん', reading: 'un', id: 'Iya / ya (kasual dari hai)' },
      { jp: 'ううん', reading: 'uun', id: 'Nggak / tidak (kasual dari iie)' },
      { jp: 'サラリーマン', reading: 'sarariiman', id: 'Karyawan kantoran bergaji' },
      { jp: 'ことば (言葉)', reading: 'kotoba', id: 'Kata / bahasa' },
      { jp: 'ぶっか (物価)', reading: 'bukka', id: 'Harga barang komoditas' },
      { jp: 'きもの (着物)', reading: 'kimono', id: 'Kimono (pakaian adat Jepang)' },
      { jp: 'ビザ', reading: 'biza', id: 'Visa' },
      { jp: 'はじめ (初め)', reading: 'hajime', id: 'Awal mula' },
      { jp: 'おわり (終わり)', reading: 'owari', id: 'Akhir / tamat' }
    ]
  },
  {
    chapter: 21,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 21: Pendapat & Kutipan Kalimat (〜と思う・〜と言いました)',
    theme: 'Opini Pribadi (To omoimasu), Kutipan Ucapan Orang (To iimashita), dan Konfirmasi (~deshou)',
    summary: 'Menyampaikan pendapat "Saya kira/berpikir..." (~to omoimasu), mengutip perkataan orang lain secara langsung atau tak langsung (~to iimashita), dan meminta persetujuan (~deshou).',
    grammarPatterns: [
      {
        id: 'm21-1',
        pattern: 'Bentuk Biasa (Futsuukei) + と 思います (Saya Pikir/Kira...)',
        formula: 'Kalimat [Futsuukei] + to omoimasu',
        explanation: 'Menyampaikan perkiraan atau opini subjektif si pembicara.',
        examples: [
          { jp: '明日 雨が 降ると 思います。', reading: 'Ashita ame ga furu to omoimasu.', id: 'Saya kira besok akan turun hujan.' },
          { jp: '日本は 物価が 高いと 思います。', reading: 'Nihon wa bukka ga takai to omoimasu.', id: 'Menurut saya harga barang di Jepang mahal.' }
        ]
      },
      {
        id: 'm21-2',
        pattern: 'Kalimat + と 言いました (Berkata Bahwa...)',
        formula: 'Kalimat [Kutipan Futsuukei] + to iimashita',
        explanation: 'Mengutip ujaran atau pernyataan yang pernah diucapkan orang lain.',
        examples: [
          { jp: '田中さんは 「明日 休みます」と 言いました。', reading: 'Tanaka-san wa "ashita yasumimasu" to iimashita.', id: 'Tuan Tanaka berkata, "Besok saya libur".' },
          { jp: '来週 会議が あると 言いました。', reading: 'Raishuu kaigi ga aru to iimashita.', id: 'Beliau berkata bahwa minggu depan ada rapat.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'おもいます (思います)', reading: 'omoimasu', id: 'Berpikir / berpendapat' },
      { jp: 'いいます (言います)', reading: 'iimasu', id: 'Berkata / berucap' },
      { jp: 'たります (足ります)', reading: 'tarimasu', id: 'Cukup' },
      { jp: 'かちます (勝ちます)', reading: 'kachimasu', id: 'Menang' },
      { jp: 'まけます (負けます)', reading: 'makemasu', id: 'Kalah' },
      { jp: 'あります [お祭りが〜]', reading: 'arimasu', id: 'Diadakan / berlangsung [festival]' },
      { jp: 'やくにたちます (役に立ちます)', reading: 'yaku ni tachimasu', id: 'Berguna / bermanfaat' },
      { jp: 'うごきます (動きます)', reading: 'ugokimasu', id: 'Bergerak / beroperasi' },
      { jp: 'やめます [会社を〜]', reading: 'yamemasu', id: 'Berhenti [dari perusahaan]' },
      { jp: 'きをつけます (気をつけます)', reading: 'ki o tsukemasu', id: 'Berhati-hati' },
      { jp: 'りゅうがくします (留学します)', reading: 'ryuugaku shimasu', id: 'Belajar di luar negeri' },
      { jp: 'むだ [な]', reading: 'muda [na]', id: 'Sia-sia / mubazir' },
      { jp: 'ふべん [な] (不便)', reading: 'fuben [na]', id: 'Tidak praktis / repot' },
      { jp: 'おなじ (同じ)', reading: 'onaji', id: 'Sama' },
      { jp: 'すごい', reading: 'sugoi', id: 'Hebat / luar biasa' },
      { jp: 'しゅしょう (首相)', reading: 'shushou', id: 'Perdana menteri' },
      { jp: 'だいとうりょう (大統領)', reading: 'daitouryou', id: 'Presiden' },
      { jp: 'せいじ (政治)', reading: 'seiji', id: 'Politik' },
      { jp: 'ニュース', reading: 'nyuusu', id: 'Berita' }
    ]
  },
  {
    chapter: 22,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 22: Menerangkan Kata Benda / Anak Kalimat (名詞修飾)',
    theme: 'Klausa Relatif: Menjelaskan Kata Benda Menggunakan Kalimat Bentuk Biasa',
    summary: 'Dalam bahasa Jepang, seluruh kalimat penjelas diletakkan langsung di depan kata benda yang diterangkan (tanpa kata "yang"). Subjek anak kalimat wajib memakai partikel が (ga).',
    grammarPatterns: [
      {
        id: 'm22-1',
        pattern: 'Kalimat Bentuk Biasa (Futsuukei) + Kata Benda',
        formula: '[Kalimat Penjelas Futsuukei] + KB',
        explanation: 'Menyusun anak kalimat yang berfungsi sebagai atribut penerang kata benda.',
        examples: [
          { jp: 'これは ミラーさんが 住んでいる 家です。', reading: 'Kore wa Miraa-san ga sunde iru ie desu.', id: 'Ini adalah rumah tempat Tuan Miller tinggal.' },
          { jp: '昨日 買った 本は 面白かったです。', reading: 'Kinou katta hon wa omoshirokatta desu.', id: 'Buku yang dibeli kemarin sangat menarik.' },
          { jp: 'あそこで 新聞を 読んでいる 人は 誰ですか。', reading: 'Asoko de shinbun o yonde iru hito wa dare desu ka.', id: 'Orang yang sedang membaca koran di sana itu siapa?' }
        ]
      },
      {
        id: 'm22-2',
        pattern: '[KK Kamus + Waktu / Janji / Urusan] が あります',
        formula: 'KK [jisho-kei] + jikan / yakusoku / youji [ga arimasu]',
        explanation: 'Menyatakan memiliki waktu, janji, atau kesibukan untuk melakukan suatu kegiatan.',
        examples: [
          { jp: '朝ご飯を 食べる 時間が ありません。', reading: 'Asagohan o taberu jikan ga arimasen.', id: 'Tidak ada waktu untuk sarapan.' },
          { jp: '友達と 映画を 見る 約束が あります。', reading: 'Tomodachi to eiga o miru yakusoku ga arimasu.', id: 'Ada janji menonton film bersama teman.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'きます (着ます)', reading: 'kimasu', id: 'Mengenakan (baju/kemeja bagian atas)' },
      { jp: 'はきます', reading: 'hakimasu', id: 'Mengenakan (celana/sepatu bagian bawah)' },
      { jp: 'かぶります', reading: 'kaburimasu', id: 'Mengenakan (topi/helm)' },
      { jp: 'かけます [めがねを〜]', reading: 'kakemasu', id: 'Mengenakan [kacamata]' },
      { jp: 'うまれます (生まれます)', reading: 'umaremasu', id: 'Lahir' },
      { jp: 'コート', reading: 'kooto', id: 'Mantel / jas tebal' },
      { jp: 'スーツ', reading: 'suutsu', id: 'Setelan jas kantor' },
      { jp: 'セーター', reading: 'seetaa', id: 'Baju hangat sweater' },
      { jp: 'ぼうし (帽子)', reading: 'boushi', id: 'Topi' },
      { jp: 'めがね (眼鏡)', reading: 'megane', id: 'Kacamata' },
      { jp: 'よく [お祝い〜]', reading: 'yoku', id: 'Sering' },
      { jp: 'おめでとうございます', reading: 'omedetou gozaimasu', id: 'Selamat! (ucapan selamat)' }
    ]
  },
  {
    chapter: 23,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 23: Waktu / Kondisi & Hubungan Sebab-Akibat Otomatis (〜とき・〜と)',
    theme: 'Ketika Berbuat/Kondisi (~toki) dan Syarat Pasti/Otomatis (~to: Kalau... maka pasti...)',
    summary: 'Menggunakan "toki" untuk menyatakan waktu saat melakukan sesuatu atau saat masih kecil/muda, dan partikel "to" untuk hubungan alamiah atau petunjuk jalan mekanis.',
    grammarPatterns: [
      {
        id: 'm23-1',
        pattern: 'KK / Kata Sifat / KB の + とき (~ toki: Ketika...)',
        formula: 'KK [jisho/ta/nai] / I-Kei / Na-Kei [+na] / KB [+no] + toki',
        explanation: 'Menyatakan waktu ketika suatu peristiwa atau kondisi sedang/telah terjadi.',
        examples: [
          { jp: '図書館で 本を 借りる とき、カードが 要ります。', reading: 'Toshokan de hon o kariru toki, kaado ga irimasu.', id: 'Ketika meminjam buku di perpustakaan, memerlukan kartu.' },
          { jp: '時間が ない とき、朝ご飯を 食べません。', reading: 'Jikan ga nai toki, asagohan o tabemasen.', id: 'Ketika tidak punya waktu, saya tidak sarapan.' },
          { jp: '子供の とき、よく 川で 泳ぎました。', reading: 'Kodomo no toki, yoku kawa de oyogimashita.', id: 'Ketika masih anak-anak, saya sering berenang di sungai.' }
        ]
      },
      {
        id: 'm23-2',
        pattern: 'KK Kamus + と、〜 (Kalau/Begitu..., maka otomatis...)',
        formula: 'KK [jisho-kei] + to, Akibat Alamiah/Mekanis',
        explanation: 'Menyatakan akibat tak terelakkan yang pasti terjadi, petunjuk arah jalan, atau pengoperasian mesin.',
        examples: [
          { jp: 'この ボタンを 押すと、お釣りが出ます。', reading: 'Kono botan o osu to, otsuri ga demasu.', id: 'Kalau menekan tombol ini, uang kembalian akan keluar.' },
          { jp: '右へ 曲がると、郵便局が あります。', reading: 'Migi e magaru to, yuubinkyoku ga arimasu.', id: 'Kalau berbelok ke kanan, ada kantor pos.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'ききます [先生に〜]', reading: 'kikimasu', id: 'Bertanya [kepada guru]' },
      { jp: 'まわします (回します)', reading: 'mawashimasu', id: 'Memutar (keran/kenop)' },
      { jp: 'ひきます (引きます)', reading: 'hikimasu', id: 'Menarik' },
      { jp: 'かえます (変えます)', reading: 'kaemasu', id: 'Mengubah' },
      { jp: 'さわります (触ります)', reading: 'sawarimasu', id: 'Menyentuh' },
      { jp: 'でます [おつりが〜]', reading: 'demasu', id: 'Keluar [uang kembalian]' },
      { jp: 'あるきます (歩きます)', reading: 'arukimasu', id: 'Berjalan kaki' },
      { jp: 'わたります (渡ります)', reading: 'watarimasu', id: 'Menyeberang (jalan/jembatan)' },
      { jp: 'こしょう (故障)', reading: 'koshou', id: 'Kerusakan mesin' },
      { jp: 'みち (道)', reading: 'michi', id: 'Jalanan' },
      { jp: 'こうさてん (交差点)', reading: 'kousaten', id: 'Persimpangan jalan / perempatan' },
      { jp: 'しんごう (信号)', reading: 'shingou', id: 'Lampu lalu lintas' },
      { jp: 'かど (角)', reading: 'kado', id: 'Sudut / pojokan jalan' },
      { jp: 'はし (橋)', reading: 'hashi', id: 'Jembatan' },
      { jp: 'ちゅうしゃじょう (駐車場)', reading: 'chuushajou', id: 'Tempat parkir' },
      { jp: 'おゆ (お湯)', reading: 'oyu', id: 'Air panas' },
      { jp: 'サイズ', reading: 'saizu', id: 'Ukuran size' }
    ]
  },
  {
    chapter: 24,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 24: Kebaikan Tindakan (〜てくれます・〜てもらいます・〜てあげます)',
    theme: 'Pemberian dan Penerimaan Bantuan / Tindakan Kebaikan',
    summary: 'Penggunaan agemasu, kuremasu, dan moraimasu dalam bentuk Te untuk menyatakan melakukan kebaikan bagi orang lain, menerima jasa baik, atau orang lain berbuat baik kepada saya.',
    grammarPatterns: [
      {
        id: 'm24-1',
        pattern: 'KK bentuk-Te + くれます (Orang Lain Membantu Saya)',
        formula: 'Orang Lain [wa/ga] [watashi ni] KK [te-kei] + kuremasu',
        explanation: 'Digunakan saat orang lain melakukan suatu kebaikan bagi pembicara atau keluarga pembicara.',
        examples: [
          { jp: '佐藤さんは わたしに 傘を 貸して くれました。', reading: 'Satou-san wa watashi ni kasa o kashite kuremashita.', id: 'Sdr. Satou berbaik hati meminjamkan payung kepada saya.' }
        ]
      },
      {
        id: 'm24-2',
        pattern: 'KK bentuk-Te + もらいます (Saya Meminta Bantuan Orang)',
        formula: 'Watashi [wa] Orang [ni] KK [te-kei] + moraimasu',
        explanation: 'Menyatakan bahwa pembicara memperoleh jasa perbuatan baik dari orang lain.',
        examples: [
          { jp: 'わたしは 鈴木さんに 日本語を 教えて もらいました。', reading: 'Watashi wa Suzuki-san ni Nihongo o oshiete moraimashita.', id: 'Saya diajari bahasa Jepang oleh Sdr. Suzuki (memperoleh kebaikan Suzuki).' }
        ]
      },
      {
        id: 'm24-3',
        pattern: 'KK bentuk-Te + あげます (Saya Membantu Orang)',
        formula: 'Watashi [wa] Orang [ni] KK [te-kei] + agemasu',
        explanation: 'Melakukan perbuatan demi membantu orang lain (hindari jika berbicara langsung kepada atasan).',
        examples: [
          { jp: 'わたしは 山田さんの 荷物を 持って あげました。', reading: 'Watashi wa Yamada-san no nimotsu o motte agemashita.', id: 'Saya membawakan barang milik Tuan Yamada.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'くれます', reading: 'kuremasu', id: 'Memberikan (kepada saya)' },
      { jp: 'つれていきます (連れて行きます)', reading: 'tsurete ikimasu', id: 'Mengajak pergi (orang/hewan)' },
      { jp: 'つれてきます (連れて来ます)', reading: 'tsurete kimasu', id: 'Mengajak datang ke mari' },
      { jp: 'おくります [人を〜] (送ります)', reading: 'okurimasu', id: 'Mengantar [orang]' },
      { jp: 'しょうかいします (紹介します)', reading: 'shoukai shimasu', id: 'Memperkenalkan' },
      { jp: 'あんないします (案内します)', reading: 'annai shimasu', id: 'Memandu / mengantar keliling' },
      { jp: 'せつめいします (説明します)', reading: 'setsumei shimasu', id: 'Menjelaskan' },
      { jp: 'おじいさん / おじいちゃん', reading: 'ojiisan', id: 'Kakek' },
      { jp: 'おばあさん / おばあちゃん', reading: 'obaasan', id: 'Nenek' },
      { jp: 'じゅんび (準備)', reading: 'junbi', id: 'Persiapan' },
      { jp: 'ひっこし (引っ越し)', reading: 'hikkoshi', id: 'Pindah rumah' },
      { jp: 'ぜんぶ (全部)', reading: 'zenbu', id: 'Semuanya' },
      { jp: 'じぶんで (自分で)', reading: 'jibun de', id: 'Sendiri / secara mandiri' }
    ]
  },
  {
    chapter: 25,
    level: 'N5',
    part: 'Shokyu I (N5)',
    title: 'Bab 25: Pengandaian & Konsesi (〜たら・〜ても) [Puncak Shokyu I N5]',
    theme: 'Bentuk Pengandaian Syarat (~tara: Jika/Kalau sudah...) dan Pertentangan (~temo: Walaupun...)',
    summary: 'Penutup materi Minna no Nihongo Shokyu I (Level N5). Pola syarat pengandaian masa depan / kepastian urutan (~tara) dan pengandaian bertentangan (~te mo / de mo).',
    grammarPatterns: [
      {
        id: 'm25-1',
        pattern: 'KK bentuk-Ta + ら、〜 (~ tara: Kalau/Jika/Setelah...)',
        formula: 'KK [ta-kei] + ra, Kalimat Pokok',
        explanation: 'Bentuk pengandaian yang paling luwes: bisa berarti hipotesis ("seandainya..."), atau kepastian waktu ("kalau sudah sampai di sana...").',
        examples: [
          { jp: '雨が 降ったら、出かけません。', reading: 'Ame ga futtara, dekakemasen.', id: 'Kalau hujan turun, saya tidak akan bepergian.' },
          { jp: 'お金が あったら、旅行したいです。', reading: 'Okane ga attara, ryokou shitai desu.', id: 'Seandainya punya uang, saya ingin jalan-jalan berwisata.' },
          { jp: '駅に 着いたら、電話して ください。', reading: 'Eki ni tsuitara, denwa shite kudasai.', id: 'Kalau sudah tiba di stasiun, tolong telepon ya.' }
        ]
      },
      {
        id: 'm25-2',
        pattern: 'KK bentuk-Te + も、〜 (~ te mo: Walaupun/Meskipun...)',
        formula: 'KK [te-kei] + mo / Sifat-i [-kute mo] / Sifat-na & KB [de mo]',
        explanation: 'Menyatakan bahwa akibat yang diharapkan tidak berubah meskipun kondisi syarat terpenuhi.',
        examples: [
          { jp: '雨が 降っても、サッカーを します。', reading: 'Ame ga futte mo, sakkaa o shimasu.', id: 'Walaupun hujan turun, tetap akan bermain sepak bola.' },
          { jp: '高くても、この パソコンを 買いたいです。', reading: 'Takakute mo, kono pasokon o kaitai desu.', id: 'Meskipun mahal, saya ingin membeli laptop ini.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'かんがえます (考えます)', reading: 'kangaemasu', id: 'Memikirkan' },
      { jp: 'つきます (着きます)', reading: 'tsukimasu', id: 'Tiba / sampai di tujuan' },
      { jp: 'とります [年を〜]', reading: 'torimasu', id: 'Bertambah [usia / menua]' },
      { jp: 'いなか (田舎)', reading: 'inaka', id: 'Kampung halaman / desa' },
      { jp: 'たいしかん (大使館)', reading: 'taishikan', id: 'Kedutaan besar' },
      { jp: 'グループ', reading: 'guruupu', id: 'Grup / kelompok' },
      { jp: 'チャンス', reading: 'chansu', id: 'Peluang / kesempatan' },
      { jp: 'おく (億)', reading: 'oku', id: '100 juta' },
      { jp: 'もし', reading: 'moshi', id: 'Jika / seandainya' },
      { jp: 'いくら〜ても', reading: 'ikura ~te mo', id: 'Betapapun / sebanyak apapun ... tetap saja' },
      { jp: 'がんばります (頑張ります)', reading: 'ganbarimasu', id: 'Bersemangat / berjuang sekuat tenaga' }
    ],
    dialogue: {
      title: 'お世話になりました (Terima Kasih Atas Semua Bantuannya)',
      lines: [
        { speaker: 'Miller', jp: '佐藤さん、長い間 大変 お世話に なりました。', reading: 'Satou-san, nagai aida taihen osewa ni narimashita.', id: 'Sdr. Satou, terima kasih banyak atas semua bantuan dan bimbingannya selama ini.' },
        { speaker: 'Satou', jp: 'いいえ、こちらこそ。国へ 帰っても、日本語の 勉強を 続けて くださいね。', reading: 'Iie, kochira koso. Kuni e kaette mo, Nihongo no benkyou o tsuzukete kudasai ne.', id: 'Sama-sama. Meskipun sudah kembali ke negara asal, tolong tetap lanjutkan belajar bahasa Jepangnya ya.' },
        { speaker: 'Miller', jp: 'はい、頑張ります。どうぞ お元気で。', reading: 'Hai, ganbarimasu. Douzo ogenki de.', id: 'Baik, saya akan berjuang. Semoga senantiasa sehat selalu.' }
      ]
    }
  }
];
