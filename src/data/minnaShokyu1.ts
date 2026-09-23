import { MinnaLesson } from '../types';

export const minnaShokyu1Lessons: MinnaLesson[] = [
  {
    "chapter": 1,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 1: Perkenalan Diri (〜は〜です)",
    "theme": "Perkenalan, Nama, Kewarganegaraan, Profesi, dan Umur",
    "summary": "Mempelajari kalimat dasar predikat kata benda: menyatakan identitas diri, menyangkal, bertanya, serta partikel \"mo\" (juga) dan \"no\" (kepemilikan).",
    "grammarPatterns": [
      {
        "id": "m1-1",
        "pattern": "〜は〜です (~ wa ~ desu)",
        "formula": "Kata Benda 1 [wa] Kata Benda 2 [desu]",
        "explanation": "Menyatakan bahwa Subjek (KB1) adalah Predikat (KB2). Partikel \"wa\" ditulis dengan hiragana は.",
        "examples": [
          {
            "jp": "わたしは マイク・ミラーです。",
            "reading": "Watashi wa Maiku Miraa desu.",
            "id": "Saya adalah Mike Miller."
          },
          {
            "jp": "サントスさんは ブラジル人です。",
            "reading": "Santosu-san wa Burajiru-jin desu.",
            "id": "Tuan Santos adalah orang Brasil."
          }
        ]
      },
      {
        "id": "m1-2",
        "pattern": "〜じゃありません (~ ja arimasen)",
        "formula": "KB1 [wa] KB2 [ja arimasen / dewa arimasen]",
        "explanation": "Bentuk negatif formal dari \"desu\" (bukan / tidak).",
        "examples": [
          {
            "jp": "サントスさんは 学生じゃありません。",
            "reading": "Santosu-san wa gakusei ja arimasen.",
            "id": "Tuan Santos bukan seorang mahasiswa."
          }
        ]
      },
      {
        "id": "m1-3",
        "pattern": "〜ですか (~ desu ka)",
        "formula": "Kalimat + [ka]?",
        "explanation": "Partikel penanya \"ka\" diletakkan di akhir kalimat untuk mengubahnya menjadi kalimat tanya.",
        "examples": [
          {
            "jp": "ミラーさんは 会社員ですか。",
            "reading": "Miraa-san wa kaishain desu ka.",
            "id": "Apakah Tuan Miller seorang karyawan perusahaan?"
          }
        ]
      },
      {
        "id": "m1-4",
        "pattern": "〜も (~ mo) & 〜の (~ no)",
        "formula": "KB [mo] / KB1 [no] KB2",
        "explanation": "\"mo\" berarti \"juga\". \"no\" menghubungkan dua kata benda (kepemilikan/afiliasi).",
        "examples": [
          {
            "jp": "グプタさんも 会社員です。",
            "reading": "Guputa-san mo kaishain desu.",
            "id": "Tuan Gupta juga seorang karyawan."
          },
          {
            "jp": "わたしは IMCの 社員です。",
            "reading": "Watashi wa IMC no shain desu.",
            "id": "Saya karyawan perusahaan IMC."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "わたし (私)",
        "reading": "watashi",
        "id": "Saya",
        "kanji": "私"
      },
      {
        "jp": "あなた",
        "reading": "anata",
        "id": "Anda / Kamu"
      },
      {
        "jp": "あのひと (あの人)",
        "reading": "ano hito",
        "id": "Orang itu",
        "kanji": "あの人"
      },
      {
        "jp": "〜さん",
        "reading": "~san",
        "id": "Sdr. / Tuan / Nyonya / Saudara……."
      },
      {
        "jp": "せんせい (先生)",
        "reading": "sensei",
        "id": "Guru / Pengajar / Guru,dosen",
        "kanji": "先生"
      },
      {
        "jp": "がくせい (学生)",
        "reading": "gakusei",
        "id": "Mahasiswa / Murid / Siswa,murid",
        "kanji": "学生"
      },
      {
        "jp": "かいしゃいん (会社員)",
        "reading": "kaishain",
        "id": "Karyawan perusahaan / Pegawai perusahaan",
        "kanji": "会社員"
      },
      {
        "jp": "ぎんこういん (銀行員)",
        "reading": "ginkouin",
        "id": "Pegawai bank",
        "kanji": "銀行員"
      },
      {
        "jp": "いしゃ (医者)",
        "reading": "isha",
        "id": "Dokter",
        "kanji": "医者"
      },
      {
        "jp": "けんきゅうしゃ (研究者)",
        "reading": "kenkyuusha",
        "id": "Peneliti",
        "kanji": "研究者"
      },
      {
        "jp": "だいがく (大学)",
        "reading": "daigaku",
        "id": "Universitas",
        "kanji": "大学"
      },
      {
        "jp": "びょういん (病院)",
        "reading": "byouin",
        "id": "Rumah sakit",
        "kanji": "病院"
      },
      {
        "jp": "だれ (どなた)",
        "reading": "dare (donata)",
        "id": "Siapa (sopan) / Siapa (biasa)"
      },
      {
        "jp": "～さい (～歳)",
        "reading": "~sai",
        "id": "... tahun (usia) / Umur…..",
        "kanji": "～歳"
      },
      {
        "jp": "なんさい (何歳)",
        "reading": "nansai",
        "id": "Berapa umur / Umur berapa?(biasa)",
        "kanji": "何歳"
      },
      {
        "jp": "はじめまして",
        "reading": "hajimemashite",
        "id": "Senang berkenalan (salam awal) / Perkenalkan"
      },
      {
        "jp": "どうぞよろしく",
        "reading": "douzo yoroshiku",
        "id": "Mohon bantuannya"
      },
      {
        "jp": "あのかた (あの方)",
        "reading": "anokata",
        "id": "Orang itu (sopan)",
        "kanji": "あの方"
      },
      {
        "jp": "～ちゃん",
        "reading": "~chan",
        "id": "Panggilan untuk anak laki/perempuan"
      },
      {
        "jp": "～じん (～人)",
        "reading": "~jin",
        "id": "Orang…….",
        "kanji": "～人"
      },
      {
        "jp": "きょうし (教師)",
        "reading": "kyoushi",
        "id": "Guru,dosen (dipakai untuk kalangan sendiri)",
        "kanji": "教師"
      },
      {
        "jp": "しゃいん (社員)",
        "reading": "shain",
        "id": "Pegawai perusahaan",
        "kanji": "社員"
      },
      {
        "jp": "どなた",
        "reading": "donata",
        "id": "Siapa (sopan)"
      },
      {
        "jp": "おいくつ",
        "reading": "oikutsu",
        "id": "Umur berapa?(sopan)"
      },
      {
        "jp": "はい",
        "reading": "hai",
        "id": "Iya"
      },
      {
        "jp": "いいえ",
        "reading": "iie",
        "id": "Tidak"
      },
      {
        "jp": "～からきました (～から来ました)",
        "reading": "~karakimashita",
        "id": "Datang dari…..",
        "kanji": "～から来ました"
      },
      {
        "jp": "どうぞよろしくおねがいします (どうぞよろしくお願します)",
        "reading": "douzoyoroshikuonegaishimasu",
        "id": "Terimalah perkenalan saya",
        "kanji": "どうぞよろしくお願します"
      },
      {
        "jp": "しつれいですが (失礼ですが)",
        "reading": "shitsureidesuga",
        "id": "Permisi",
        "kanji": "失礼ですが"
      },
      {
        "jp": "おなまえは (お名前は)",
        "reading": "onamaeha",
        "id": "Nama anda siapa?",
        "kanji": "お名前は"
      },
      {
        "jp": "アメリカ",
        "reading": "amerika",
        "id": "Amerika"
      },
      {
        "jp": "イギリス",
        "reading": "igirisu",
        "id": "Inggris"
      },
      {
        "jp": "インド",
        "reading": "indo",
        "id": "India"
      },
      {
        "jp": "インドネシア",
        "reading": "indoneshia",
        "id": "Indonesia"
      },
      {
        "jp": "かんこく (韓国)",
        "reading": "kankoku",
        "id": "Korea",
        "kanji": "韓国"
      },
      {
        "jp": "ちゅうごく (中国)",
        "reading": "chuugoku",
        "id": "China",
        "kanji": "中国"
      },
      {
        "jp": "ドイツ",
        "reading": "doitsu",
        "id": "Jerman"
      },
      {
        "jp": "にほん (日本)",
        "reading": "nihon",
        "id": "Jepang",
        "kanji": "日本"
      },
      {
        "jp": "フランス",
        "reading": "furansu",
        "id": "Perancis"
      }
    ],
    "dialogue": {
      "title": "初めまして (Senang Berkenalan)",
      "lines": [
        {
          "speaker": "Satou",
          "jp": "おはようございます。",
          "reading": "Ohayou gozaimasu.",
          "id": "Selamat pagi."
        },
        {
          "speaker": "Miller",
          "jp": "おはようございます。初めまして、マイク・ミラーです。アメリカから来ました。どうぞよろしく。",
          "reading": "Ohayou gozaimasu. Hajimemashite, Maiku Miraa desu. Amerika kara kimashita. Douzo yoroshiku.",
          "id": "Selamat pagi. Senang berkenalan, saya Mike Miller. Datang dari Amerika. Mohon bimbingannya."
        },
        {
          "speaker": "Satou",
          "jp": "佐藤けい子です。どうぞよろしくお願いします。",
          "reading": "Satou Keiko desu. Douzo yoroshiku onegai shimasu.",
          "id": "Saya Keiko Satou. Mohon kerja samanya."
        }
      ]
    }
  },
  {
    "chapter": 2,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 2: Menunjuk Benda (これ・それ・あれ)",
    "theme": "Kata Tunjuk Benda, Kepemilikan Barang, dan Konfirmasi",
    "summary": "Menunjuk benda dekat pembicara (kore), dekat lawan bicara (sore), dan jauh dari keduanya (are), serta penggunaan kono/sono/ano.",
    "grammarPatterns": [
      {
        "id": "m2-1",
        "pattern": "これ / それ / あれ は 〜です",
        "formula": "kore / sore / are [wa] KB [desu]",
        "explanation": "Kata ganti penunjuk benda independen tanpa diikuti kata benda langsung.",
        "examples": [
          {
            "jp": "これは 辞書です。",
            "reading": "Kore wa jisho desu.",
            "id": "Ini adalah kamus."
          },
          {
            "jp": "それは わたしの 傘です。",
            "reading": "Sore wa watashi no kasa desu.",
            "id": "Itu adalah payung saya."
          },
          {
            "jp": "あれは 車です。",
            "reading": "Are wa kuruma desu.",
            "id": "Yang di sana itu adalah mobil."
          }
        ]
      },
      {
        "id": "m2-2",
        "pattern": "この / その / あの + KB",
        "formula": "kono / sono / ano + KB [wa] ...",
        "explanation": "Kata tunjuk yang harus melekat langsung sebelum kata benda yang diterangkan.",
        "examples": [
          {
            "jp": "この本は わたしのです。",
            "reading": "Kono hon wa watashi no desu.",
            "id": "Buku ini adalah kepunyaan saya."
          },
          {
            "jp": "あの方（かた）は どなたですか。",
            "reading": "Ano kata wa donata desu ka.",
            "id": "Orang di sana itu siapa?"
          }
        ]
      },
      {
        "id": "m2-3",
        "pattern": "〜ですか、〜ですか (Pertanyaan Pilihan)",
        "formula": "KB1 [desu ka], KB2 [desu ka]",
        "explanation": "Memilih antara dua opsi. Tidak dijawab dengan \"Hai\" atau \"Iie\", melainkan langsung menyebutkan pilihannya.",
        "examples": [
          {
            "jp": "これは 「９」ですか、「７」ですか。",
            "reading": "Kore wa \"kyuu\" desu ka, \"nana\" desu ka.",
            "id": "Apakah ini angka \"9\" atau \"7\"?"
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "ほん (本)",
        "reading": "hon",
        "id": "Buku",
        "kanji": "本"
      },
      {
        "jp": "じしょ (辞書)",
        "reading": "jisho",
        "id": "Kamus",
        "kanji": "辞書"
      },
      {
        "jp": "ざっし (雑誌)",
        "reading": "zasshi",
        "id": "Majalah",
        "kanji": "雑誌"
      },
      {
        "jp": "しんぶん (新聞)",
        "reading": "shinbun",
        "id": "Koran",
        "kanji": "新聞"
      },
      {
        "jp": "ノート",
        "reading": "nooto",
        "id": "Buku catatan"
      },
      {
        "jp": "てちょう (手帳)",
        "reading": "techou",
        "id": "Buku agenda / memo",
        "kanji": "手帳"
      },
      {
        "jp": "めいし (名刺)",
        "reading": "meishi",
        "id": "Kartu nama",
        "kanji": "名刺"
      },
      {
        "jp": "えんぴつ (鉛筆)",
        "reading": "enpitsu",
        "id": "Pensil",
        "kanji": "鉛筆"
      },
      {
        "jp": "ボールペン",
        "reading": "boorupen",
        "id": "Pulpen / Bolpoin"
      },
      {
        "jp": "かぎ (鍵)",
        "reading": "kagi",
        "id": "Kunci",
        "kanji": "鍵"
      },
      {
        "jp": "とけい (時計)",
        "reading": "tokei",
        "id": "Jam",
        "kanji": "時計"
      },
      {
        "jp": "かさ (傘)",
        "reading": "kasa",
        "id": "Payung",
        "kanji": "傘"
      },
      {
        "jp": "かばん (鞄)",
        "reading": "kaban",
        "id": "Tas",
        "kanji": "鞄"
      },
      {
        "jp": "テレビ",
        "reading": "terebi",
        "id": "Televisi"
      },
      {
        "jp": "くるま (車)",
        "reading": "kuruma",
        "id": "Mobil",
        "kanji": "車"
      },
      {
        "jp": "机 (つくえ)",
        "reading": "tsukue",
        "id": "Meja"
      },
      {
        "jp": "椅子 (いす)",
        "reading": "isu",
        "id": "Kursi"
      },
      {
        "jp": "おみやげ (お土産)",
        "reading": "omiyage",
        "id": "Oleh-oleh",
        "kanji": "お土産"
      },
      {
        "jp": "これ",
        "reading": "kore",
        "id": "Ini"
      },
      {
        "jp": "それ",
        "reading": "sore",
        "id": "Itu (dekat)"
      },
      {
        "jp": "あれ",
        "reading": "are",
        "id": "Itu (jauh)"
      },
      {
        "jp": "この～",
        "reading": "kono~",
        "id": "～ini"
      },
      {
        "jp": "その～",
        "reading": "sono~",
        "id": "～itu (dekat)"
      },
      {
        "jp": "あの～",
        "reading": "ano~",
        "id": "～itu (jauh)"
      },
      {
        "jp": "カード",
        "reading": "kaado",
        "id": "Kartu"
      },
      {
        "jp": "シャープペンシル",
        "reading": "shaapupenshiru",
        "id": "Pensil mekanik"
      },
      {
        "jp": "ラジオ",
        "reading": "rajio",
        "id": "Radio"
      },
      {
        "jp": "カメラ",
        "reading": "kamera",
        "id": "Kamera"
      },
      {
        "jp": "コンピューター",
        "reading": "konpyuutaa",
        "id": "Komputer"
      },
      {
        "jp": "つくえ (机)",
        "reading": "tsukue",
        "id": "Meja",
        "kanji": "机"
      },
      {
        "jp": "いす (椅子)",
        "reading": "isu",
        "id": "Kursi",
        "kanji": "椅子"
      },
      {
        "jp": "チョコレート",
        "reading": "chokoreeto",
        "id": "Coklat"
      },
      {
        "jp": "コーヒー",
        "reading": "koohii",
        "id": "Kopi"
      },
      {
        "jp": "えいご (英語)",
        "reading": "eigo",
        "id": "Bahasa inggris",
        "kanji": "英語"
      },
      {
        "jp": "にほんご (日本語)",
        "reading": "nihongo",
        "id": "Bahasa Jepang",
        "kanji": "日本語"
      },
      {
        "jp": "～ご (～語)",
        "reading": "~go",
        "id": "Bahasa ～",
        "kanji": "～語"
      },
      {
        "jp": "なん (何)",
        "reading": "nan",
        "id": "Apa",
        "kanji": "何"
      },
      {
        "jp": "そう",
        "reading": "sou",
        "id": "Begitu"
      },
      {
        "jp": "あのう",
        "reading": "anou",
        "id": "Eee ...(ungkapan ketika ragu)"
      },
      {
        "jp": "えっ",
        "reading": "e",
        "id": "Eh (diucapkan ketika mendengar sesuatu diluar dugaan)"
      },
      {
        "jp": "どうぞ",
        "reading": "douzo",
        "id": "Silakan"
      },
      {
        "jp": "どうもありがとうございます",
        "reading": "doumoarigatougozaimasu",
        "id": "Terima kasih"
      },
      {
        "jp": "そうですか",
        "reading": "soudesuka",
        "id": "O,begitu, benarkah?"
      },
      {
        "jp": "ちがいます (違います)",
        "reading": "chigaimasu",
        "id": "Bukan , Tidak , Salah",
        "kanji": "違います"
      },
      {
        "jp": "あ",
        "reading": "a",
        "id": "O,eh (dipakai ketika sadar)"
      },
      {
        "jp": "これからおせわになります (これからお世話になります)",
        "reading": "korekaraosewaninarimasu",
        "id": "Mulai sekarang saya akan meminta bantuannya",
        "kanji": "これからお世話になります"
      },
      {
        "jp": "こちらこそよろしくおねがいします",
        "reading": "kochirakosoyoroshikuonegaishimasu",
        "id": "Ya sama-sama"
      }
    ]
  },
  {
    "chapter": 3,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 3: Menunjuk Tempat & Arah (ここ・そこ・あそこ)",
    "theme": "Lokasi Fasilitas, Lantai Bangunan, Asal Negara Produk, dan Harga",
    "summary": "Mempelajari kata tunjuk lokasi (koko, soko, asoko) dan arah sopan (kochira, sochira, achira), serta menanyakan harga (ikura).",
    "grammarPatterns": [
      {
        "id": "m3-1",
        "pattern": "ここ / そこ / あそこ は 〜です",
        "formula": "koko / soko / asoko [wa] Tempat [desu]",
        "explanation": "Menyatakan tempat keberadaan (di sini, di situ, di sana).",
        "examples": [
          {
            "jp": "ここは 食堂です。",
            "reading": "Koko wa shokudou desu.",
            "id": "Di sini adalah kantin."
          },
          {
            "jp": "トイレは あそこです。",
            "reading": "Toire wa asoko desu.",
            "id": "Toilet ada di sebelah sana."
          }
        ]
      },
      {
        "id": "m3-2",
        "pattern": "どこ (どちら) ですか",
        "formula": "Tempat / Orang [wa] doko / dochira [desu ka]",
        "explanation": "Menanyakan keberadaan lokasi suatu tempat, kantor, negara asal, atau lantai.",
        "examples": [
          {
            "jp": "事務所は どちらですか。",
            "reading": "Jimusho wa dochira desu ka.",
            "id": "Kantor ada di sebelah mana? (sopan)"
          },
          {
            "jp": "お国は どちらですか。",
            "reading": "Okuni wa dochira desu ka.",
            "id": "Anda berasal dari negara mana?"
          }
        ]
      },
      {
        "id": "m3-3",
        "pattern": "〜いくらですか (~ ikura desu ka)",
        "formula": "Barang [wa] ikura [desu ka]",
        "explanation": "Menanyakan harga suatu barang.",
        "examples": [
          {
            "jp": "この靴は いくらですか。",
            "reading": "Kono kutsu wa ikura desu ka.",
            "id": "Sepatu ini berapa harganya?"
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "きょうしつ (教室)",
        "reading": "kyoushitsu",
        "id": "Ruang kelas",
        "kanji": "教室"
      },
      {
        "jp": "しょくどう (食堂)",
        "reading": "shokudou",
        "id": "Kantin / ruang makan / Ruang makan, Kantin",
        "kanji": "食堂"
      },
      {
        "jp": "じむしょ (事務所)",
        "reading": "jimusho",
        "id": "Kantor",
        "kanji": "事務所"
      },
      {
        "jp": "かいぎしつ (会議室)",
        "reading": "kaigishitsu",
        "id": "Ruang rapat",
        "kanji": "会議室"
      },
      {
        "jp": "うけつけ (受付)",
        "reading": "uketsuke",
        "id": "Resepsionis / Meja informasi",
        "kanji": "受付"
      },
      {
        "jp": "ロビー",
        "reading": "robii",
        "id": "Lobi"
      },
      {
        "jp": "へや (部屋)",
        "reading": "heya",
        "id": "Kamar",
        "kanji": "部屋"
      },
      {
        "jp": "トイレ (おてあらい)",
        "reading": "toire (otearai)",
        "id": "Toilet"
      },
      {
        "jp": "かいだん (階段)",
        "reading": "kaidan",
        "id": "Tangga",
        "kanji": "階段"
      },
      {
        "jp": "エレベーター",
        "reading": "erebeetaa",
        "id": "Lift / Elevator"
      },
      {
        "jp": "くに",
        "reading": "kuni",
        "id": "Negara"
      },
      {
        "jp": "かいしゃ (会社)",
        "reading": "kaisha",
        "id": "Perusahaan",
        "kanji": "会社"
      },
      {
        "jp": "うち (いえ)",
        "reading": "uchi (ie)",
        "id": "Rumah",
        "kanji": "家"
      },
      {
        "jp": "うりば (売り場)",
        "reading": "uriba",
        "id": "Tempat penjualan / counter",
        "kanji": "売り場"
      },
      {
        "jp": "ちか (地下)",
        "reading": "chika",
        "id": "Bawah tanah (basement) / Bawah tanah , basement",
        "kanji": "地下"
      },
      {
        "jp": "〜かい (がい)",
        "reading": "~kai (~gai)",
        "id": "Lantai ... / lantai～/ tingkat～",
        "kanji": "～階"
      },
      {
        "jp": "～えん (～円)",
        "reading": "~en",
        "id": "Yen (mata uang) / ～yen",
        "kanji": "～円"
      },
      {
        "jp": "いくら",
        "reading": "ikura",
        "id": "Berapa harga / Berapa?"
      },
      {
        "jp": "ここ",
        "reading": "koko",
        "id": "Disini"
      },
      {
        "jp": "そこ",
        "reading": "soko",
        "id": "Disitu"
      },
      {
        "jp": "あそこ",
        "reading": "asoko",
        "id": "Disana"
      },
      {
        "jp": "どこ",
        "reading": "doko",
        "id": "Dimana?"
      },
      {
        "jp": "こちら",
        "reading": "kochira",
        "id": "Disini"
      },
      {
        "jp": "そちら",
        "reading": "sochira",
        "id": "Disitu"
      },
      {
        "jp": "あちら",
        "reading": "achira",
        "id": "Disana"
      },
      {
        "jp": "どちら",
        "reading": "dochira",
        "id": "Dimana ?"
      },
      {
        "jp": "おてあらい (お手洗い)",
        "reading": "otearai",
        "id": "Kamar kecil, WC",
        "kanji": "お手洗い"
      },
      {
        "jp": "エスカレーター",
        "reading": "esukareetaa",
        "id": "Eskalator, tangga berjalan"
      },
      {
        "jp": "じどうはんばいき (自動販売機)",
        "reading": "jidouhanbaiki",
        "id": "Mesin jual otomatis",
        "kanji": "自動販売機"
      },
      {
        "jp": "でんわ (電話)",
        "reading": "denwa",
        "id": "Telepon",
        "kanji": "電話"
      },
      {
        "jp": "おくに (お国)",
        "reading": "okuni",
        "id": "Negara",
        "kanji": "お国"
      },
      {
        "jp": "くつ (靴)",
        "reading": "kutsu",
        "id": "Sepatu",
        "kanji": "靴"
      },
      {
        "jp": "ネクタイ",
        "reading": "nekutai",
        "id": "Dasi"
      },
      {
        "jp": "ワイン",
        "reading": "wain",
        "id": "Anggur putih"
      },
      {
        "jp": "なんがい (何階)",
        "reading": "nangai",
        "id": "Lantai berapa?",
        "kanji": "何階"
      },
      {
        "jp": "ひゃく (百)",
        "reading": "hyaku",
        "id": "Seratus",
        "kanji": "百"
      },
      {
        "jp": "せん (千)",
        "reading": "sen",
        "id": "Seribu",
        "kanji": "千"
      },
      {
        "jp": "まん (万)",
        "reading": "man",
        "id": "Puluh ribu",
        "kanji": "万"
      },
      {
        "jp": "すみません",
        "reading": "sumimasen",
        "id": "Maaf"
      },
      {
        "jp": "どうも",
        "reading": "doumo",
        "id": "Terima kasih"
      },
      {
        "jp": "いらっしゃいませ",
        "reading": "irasshaimase",
        "id": "Selamat datang"
      },
      {
        "jp": "みせてください (見せてください)",
        "reading": "misetekudasai",
        "id": "Tolong perlihatkan",
        "kanji": "見せてください"
      },
      {
        "jp": "じゃ",
        "reading": "ja",
        "id": "Kalau begitu"
      },
      {
        "jp": "～をください",
        "reading": "~okudasai",
        "id": "Tolong ～"
      },
      {
        "jp": "イタリア",
        "reading": "itaria",
        "id": "Italia"
      },
      {
        "jp": "スイス",
        "reading": "suisu",
        "id": "Swis"
      },
      {
        "jp": "フランス",
        "reading": "furansu",
        "id": "Perancis"
      },
      {
        "jp": "ジャカルタ",
        "reading": "jakaruta",
        "id": "Jakarta"
      },
      {
        "jp": "バンコク",
        "reading": "bankoku",
        "id": "Bangkok"
      },
      {
        "jp": "ベルリン",
        "reading": "berurin",
        "id": "Berlin"
      },
      {
        "jp": "おくじょう (屋上)",
        "reading": "okujou",
        "id": "Lantai atas",
        "kanji": "屋上"
      },
      {
        "jp": "レストラン",
        "reading": "resutoran",
        "id": "Restoran"
      },
      {
        "jp": "ゆうえんち (遊園地)",
        "reading": "yuuenchi",
        "id": "Tempat hiburan",
        "kanji": "遊園地"
      },
      {
        "jp": "もよおしものかいじょう (催し物会場)",
        "reading": "moyooshimonokaijou",
        "id": "Tempat pertunjukan",
        "kanji": "催し物会場"
      },
      {
        "jp": "めがね (眼鏡)",
        "reading": "megane",
        "id": "Kacamata",
        "kanji": "眼鏡"
      },
      {
        "jp": "スポーツようひん (スポーツ用品)",
        "reading": "supootsuyouhin",
        "id": "Peralatan olahraga",
        "kanji": "スポーツ用品"
      },
      {
        "jp": "りょこうようひん (旅行用品)",
        "reading": "ryokouyouhin",
        "id": "Peralatan wisata",
        "kanji": "旅行用品"
      },
      {
        "jp": "こどものふく (子供の服)",
        "reading": "kodomonofuku",
        "id": "Pakaian anak",
        "kanji": "子供の服"
      },
      {
        "jp": "おもちゃ",
        "reading": "omocha",
        "id": "Mainan"
      },
      {
        "jp": "ぶんぼうぐ (文房具)",
        "reading": "bunbougu",
        "id": "Alat tulis",
        "kanji": "文房具"
      },
      {
        "jp": "かぐ (家具)",
        "reading": "kagu",
        "id": "Perlengkapan rumah",
        "kanji": "家具"
      },
      {
        "jp": "しょっき (食器)",
        "reading": "shokki",
        "id": "Peralatan makan",
        "kanji": "食器"
      },
      {
        "jp": "でんかせいひん (電化製品)",
        "reading": "denkaseihin",
        "id": "Barang elektronik",
        "kanji": "電化製品"
      },
      {
        "jp": "しんしふく (紳士服)",
        "reading": "shinshifuku",
        "id": "Pakaian pria",
        "kanji": "紳士服"
      },
      {
        "jp": "ふじんふく (婦人服)",
        "reading": "fujinfuku",
        "id": "Pakaian wanita",
        "kanji": "婦人服"
      },
      {
        "jp": "アクセサリー",
        "reading": "akusesarii",
        "id": "Perhiasan, aksesoris"
      },
      {
        "jp": "けしょうひん (化粧品)",
        "reading": "keshouhin",
        "id": "Kosmetik",
        "kanji": "化粧品"
      },
      {
        "jp": "しょくひん (食品)",
        "reading": "shokuhin",
        "id": "Makanan",
        "kanji": "食品"
      }
    ]
  },
  {
    "chapter": 4,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 4: Waktu, Jam & Hari (〜ます・〜ました)",
    "theme": "Menyatakan Jam, Menit, Hari, Rutinitas Kerja & Waktu Operasional",
    "summary": "Mengenal bentuk kata kerja non-lampau (~masu), negatif (~masen), lampau (~mashita), partikel kara (dari), made (sampai), dan ni (pada waktu).",
    "grammarPatterns": [
      {
        "id": "m4-1",
        "pattern": "今 〜時〜分です (Ima ~ji ~fun desu)",
        "formula": "Ima [Waktu] desu",
        "explanation": "Menyatakan waktu sekarang. Jam menggunakan ~ji, menit menggunakan ~fun/~pun.",
        "examples": [
          {
            "jp": "今 ４時５分です。",
            "reading": "Ima yo-ji go-fun desu.",
            "id": "Sekarang jam 4 lewat 5 menit."
          }
        ]
      },
      {
        "id": "m4-2",
        "pattern": "Kata Kerja: 〜ます / 〜ません / 〜ました / 〜ませんでした",
        "formula": "Bentuk Masu dan konjugasi waktu lampau/negatif",
        "explanation": "Bentuk sopan kata kerja untuk rutinitas saat ini atau peristiwa lampau.",
        "examples": [
          {
            "jp": "毎朝 ６時に 起きます。",
            "reading": "Maiasa roku-ji ni okimasu.",
            "id": "Setiap pagi bangun pada jam 6."
          },
          {
            "jp": "きのう 勉強しました。",
            "reading": "Kinou benkyou shimashita.",
            "id": "Kemarin sudah belajar."
          }
        ]
      },
      {
        "id": "m4-3",
        "pattern": "〜から 〜まで (~ kara ~ made)",
        "formula": "Waktu/Tempat 1 [kara] Waktu/Tempat 2 [made]",
        "explanation": "Menyatakan titik awal \"dari\" dan titik akhir \"sampai/hingga\".",
        "examples": [
          {
            "jp": "銀行は ９時から ３時までです。",
            "reading": "Ginkou wa ku-ji kara san-ji made desu.",
            "id": "Bank buka dari jam 9 sampai jam 3."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "おきます (起きます)",
        "reading": "okimasu",
        "id": "Bangun tidur",
        "kanji": "起きます"
      },
      {
        "jp": "ねます (寝ます)",
        "reading": "nemasu",
        "id": "Tidur",
        "kanji": "寝ます"
      },
      {
        "jp": "はたらきます (働きます)",
        "reading": "hatarakimasu",
        "id": "Bekerja",
        "kanji": "働きます"
      },
      {
        "jp": "やすみます (休みます)",
        "reading": "yasumimasu",
        "id": "Istirahat / libur / Beristirahat , libur",
        "kanji": "休みます"
      },
      {
        "jp": "べんきょうします (勉強します)",
        "reading": "benkyou shimasu",
        "id": "Belajar",
        "kanji": "勉強します"
      },
      {
        "jp": "おわります (終わります)",
        "reading": "owarimasu",
        "id": "Selesai",
        "kanji": "終わります"
      },
      {
        "jp": "いま (今)",
        "reading": "ima",
        "id": "Sekarang",
        "kanji": "今"
      },
      {
        "jp": "〜じ (時)",
        "reading": "~ji",
        "id": "Pukul / jam ...",
        "kanji": "時"
      },
      {
        "jp": "〜ふん (分)",
        "reading": "~fun / ~pun",
        "id": "... menit",
        "kanji": "分"
      },
      {
        "jp": "はん (半)",
        "reading": "han",
        "id": "Setengah (30 menit)",
        "kanji": "半"
      },
      {
        "jp": "あさ (朝)",
        "reading": "asa",
        "id": "Pagi",
        "kanji": "朝"
      },
      {
        "jp": "ひる (昼)",
        "reading": "hiru",
        "id": "Siang",
        "kanji": "昼"
      },
      {
        "jp": "ばん (よる)",
        "reading": "ban (yoru)",
        "id": "Malam",
        "kanji": "晩"
      },
      {
        "jp": "おととい (一昨日)",
        "reading": "ototoi",
        "id": "Kemarin lusa",
        "kanji": "一昨日"
      },
      {
        "jp": "きのう (昨日)",
        "reading": "kinou",
        "id": "Kemarin",
        "kanji": "昨日"
      },
      {
        "jp": "きょう (今日)",
        "reading": "kyou",
        "id": "Hari ini",
        "kanji": "今日"
      },
      {
        "jp": "あした (明日)",
        "reading": "ashita",
        "id": "Besok",
        "kanji": "明日"
      },
      {
        "jp": "あさって (明後日)",
        "reading": "asatte",
        "id": "Besok lusa",
        "kanji": "明後日"
      },
      {
        "jp": "まいあさ (毎朝)",
        "reading": "maiasa",
        "id": "Setiap pagi",
        "kanji": "毎朝"
      },
      {
        "jp": "まいばん (毎晩)",
        "reading": "maiban",
        "id": "Setiap malam",
        "kanji": "毎晩"
      },
      {
        "jp": "まいにち (毎日)",
        "reading": "mainichi",
        "id": "Setiap hari",
        "kanji": "毎日"
      },
      {
        "jp": "デパート",
        "reading": "depaato",
        "id": "Departemen store"
      },
      {
        "jp": "ぎんこう (銀行)",
        "reading": "ginkou",
        "id": "Bank",
        "kanji": "銀行"
      },
      {
        "jp": "ゆうびんきょく (郵便局)",
        "reading": "yuubinkyoku",
        "id": "Kantor pos",
        "kanji": "郵便局"
      },
      {
        "jp": "としょかん (図書館)",
        "reading": "toshokan",
        "id": "Perpustakaan",
        "kanji": "図書館"
      },
      {
        "jp": "びじゅつかん (美術館)",
        "reading": "bijutsukan",
        "id": "Gedung kesenian",
        "kanji": "美術館"
      },
      {
        "jp": "～じ (～時)",
        "reading": "~ji",
        "id": "Jam , pukul",
        "kanji": "～時"
      },
      {
        "jp": "～ふん／ぶん (～分)",
        "reading": "~fun/bun",
        "id": "Menit",
        "kanji": "～分"
      },
      {
        "jp": "なんんじ (何時)",
        "reading": "nannji",
        "id": "Jam berapa?",
        "kanji": "何時"
      },
      {
        "jp": "なんぷん (何分)",
        "reading": "nanpun",
        "id": "Berapa menit ?",
        "kanji": "何分"
      },
      {
        "jp": "ごぜん (午前)",
        "reading": "gozen",
        "id": "AM (waktu sebelum jam 12 siang)",
        "kanji": "午前"
      },
      {
        "jp": "ごご (午後)",
        "reading": "gogo",
        "id": "PM (waktu setelah jam 12 siang)",
        "kanji": "午後"
      },
      {
        "jp": "よる (夜)",
        "reading": "yoru",
        "id": "Malam",
        "kanji": "夜"
      },
      {
        "jp": "けさ (今朝)",
        "reading": "kesa",
        "id": "Tadi pagi",
        "kanji": "今朝"
      },
      {
        "jp": "こんばん (今晩)",
        "reading": "konban",
        "id": "Malam ini",
        "kanji": "今晩"
      },
      {
        "jp": "やすみ (休み)",
        "reading": "yasumi",
        "id": "Istirahat, cuti, libur",
        "kanji": "休み"
      },
      {
        "jp": "ひるやすみ (昼休み)",
        "reading": "hiruyasumi",
        "id": "Istirahat siang",
        "kanji": "昼休み"
      },
      {
        "jp": "しけん (試験)",
        "reading": "shiken",
        "id": "Ujian",
        "kanji": "試験"
      },
      {
        "jp": "かいぎ (会議)",
        "reading": "kaigi",
        "id": "Rapat",
        "kanji": "会議"
      },
      {
        "jp": "えいが (映画)",
        "reading": "eiga",
        "id": "Film",
        "kanji": "映画"
      },
      {
        "jp": "げつようび (月曜日)",
        "reading": "getsuyoubi",
        "id": "Hari senin",
        "kanji": "月曜日"
      },
      {
        "jp": "かようび (火曜日)",
        "reading": "kayoubi",
        "id": "Hari selasa",
        "kanji": "火曜日"
      },
      {
        "jp": "すいようび (水曜日)",
        "reading": "suiyoubi",
        "id": "Hari rabo",
        "kanji": "水曜日"
      },
      {
        "jp": "もくようび (木曜日)",
        "reading": "mokuyoubi",
        "id": "Hari kamis",
        "kanji": "木曜日"
      },
      {
        "jp": "きんようび (金曜日)",
        "reading": "kinyoubi",
        "id": "Hari jumat",
        "kanji": "金曜日"
      },
      {
        "jp": "どようび (土曜日)",
        "reading": "doyoubi",
        "id": "Hari sabtu",
        "kanji": "土曜日"
      },
      {
        "jp": "にちようび (日曜日)",
        "reading": "nichiyoubi",
        "id": "Hari minggu",
        "kanji": "日曜日"
      },
      {
        "jp": "なんようび (何曜日)",
        "reading": "nanyoubi",
        "id": "Hari apa?",
        "kanji": "何曜日"
      },
      {
        "jp": "～から",
        "reading": "~kara",
        "id": "Dari"
      },
      {
        "jp": "～まで",
        "reading": "~made",
        "id": "Sampai"
      },
      {
        "jp": "～と～",
        "reading": "~to~",
        "id": "Dan"
      },
      {
        "jp": "たいへんですね (大変ですね)",
        "reading": "taihendesune",
        "id": "Berat ya,",
        "kanji": "大変ですね"
      },
      {
        "jp": "ばんごう (番号)",
        "reading": "bangou",
        "id": "Nomer",
        "kanji": "番号"
      },
      {
        "jp": "なんばん (何番)",
        "reading": "nanban",
        "id": "Nomer berapa?",
        "kanji": "何番"
      },
      {
        "jp": "ニューヨーク",
        "reading": "nyuuyooku",
        "id": "New york"
      },
      {
        "jp": "ペキン",
        "reading": "pekin",
        "id": "Beijing"
      },
      {
        "jp": "ロサンゼルス",
        "reading": "rosanzerusu",
        "id": "Los angels"
      },
      {
        "jp": "ロンドン",
        "reading": "rondon",
        "id": "London"
      },
      {
        "jp": "けいさつしょ (警察署)",
        "reading": "keisatsusho",
        "id": "Kantor polisi",
        "kanji": "警察署"
      },
      {
        "jp": "しょうぼうしょ (消防署)",
        "reading": "shoubousho",
        "id": "Pemadam kebakaran",
        "kanji": "消防署"
      },
      {
        "jp": "じほう (時報)",
        "reading": "jihou",
        "id": "Pemberitahuan waktu",
        "kanji": "時報"
      },
      {
        "jp": "てんきよほう (天気予報)",
        "reading": "tenkiyohou",
        "id": "Ramalan cuaca",
        "kanji": "天気予報"
      },
      {
        "jp": "でんわばんごうあんない (電話番号案内)",
        "reading": "denwabangouannai",
        "id": "Petunjuk nomor telepon",
        "kanji": "電話番号案内"
      }
    ]
  },
  {
    "chapter": 5,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 5: Perpindahan & Transportasi (へ・で・と)",
    "theme": "Pergi, Datang, Pulang, Alat Transportasi, dan Teman Pergi",
    "summary": "Mempelajari partikel tujuan \"e\" (へ), partikel sarana/alat \"de\" (で), dan partikel penyerta \"to\" (と: bersama siapa).",
    "grammarPatterns": [
      {
        "id": "m5-1",
        "pattern": "Tempat へ 行きます / 来ます / 帰ります",
        "formula": "Tempat [e] ikimasu / kimasu / kaerimasu",
        "explanation": "Partikel へ (dibaca \"e\") menandai arah atau tujuan gerak perpindahan tempat.",
        "examples": [
          {
            "jp": "わたしは 京都へ 行きます。",
            "reading": "Watashi wa Kyouto e ikimasu.",
            "id": "Saya pergi ke Kyoto."
          },
          {
            "jp": "日本へ 来ました。",
            "reading": "Nihon e kimashita.",
            "id": "Sudah datang ke Jepang."
          }
        ]
      },
      {
        "id": "m5-2",
        "pattern": "Kendaraan で 行きます",
        "formula": "Kendaraan / Sarana [de] ikimasu",
        "explanation": "Partikel で menunjukkan alat atau moda transportasi yang dipakai.",
        "examples": [
          {
            "jp": "電車で 行きます。",
            "reading": "Densha de ikimasu.",
            "id": "Pergi dengan naik kereta."
          },
          {
            "jp": "歩いて 帰ります。",
            "reading": "Aruite kaerimasu.",
            "id": "Pulang dengan jalan kaki (tanpa partikel de)."
          }
        ]
      },
      {
        "id": "m5-3",
        "pattern": "Orang と 行きます",
        "formula": "Orang [to] ikimasu",
        "explanation": "Partikel と menunjukkan mitra atau kawan yang menyertai tindakan (\"bersama\").",
        "examples": [
          {
            "jp": "家族と 日本へ 来ました。",
            "reading": "Kazoku to Nihon e kimashita.",
            "id": "Datang ke Jepang bersama keluarga."
          },
          {
            "jp": "一人で 行きます。",
            "reading": "Hitori de ikimasu.",
            "id": "Pergi sendirian."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "いきます (行きます)",
        "reading": "ikimasu",
        "id": "Pergi",
        "kanji": "行きます"
      },
      {
        "jp": "きます (来ます)",
        "reading": "kimasu",
        "id": "Datang",
        "kanji": "来ます"
      },
      {
        "jp": "かえります (帰ります)",
        "reading": "kaerimasu",
        "id": "Pulang",
        "kanji": "帰ります"
      },
      {
        "jp": "がっこう (学校)",
        "reading": "gakkou",
        "id": "Sekolah",
        "kanji": "学校"
      },
      {
        "jp": "スーパー",
        "reading": "suupaa",
        "id": "Supermarket"
      },
      {
        "jp": "えき (駅)",
        "reading": "eki",
        "id": "Stasiun",
        "kanji": "駅"
      },
      {
        "jp": "ひこうき (飛行機)",
        "reading": "hikouki",
        "id": "Pesawat terbang",
        "kanji": "飛行機"
      },
      {
        "jp": "ふね (船)",
        "reading": "fune",
        "id": "Kapal laut",
        "kanji": "船"
      },
      {
        "jp": "でんしゃ (電車)",
        "reading": "densha",
        "id": "Kereta listrik",
        "kanji": "電車"
      },
      {
        "jp": "ちかてつ (地下鉄)",
        "reading": "chikatetsu",
        "id": "Kereta bawah tanah",
        "kanji": "地下鉄"
      },
      {
        "jp": "しんかんせん (新幹線)",
        "reading": "shinkansen",
        "id": "Shinkansen (kereta cepat)",
        "kanji": "新幹線"
      },
      {
        "jp": "バス",
        "reading": "basu",
        "id": "Bus"
      },
      {
        "jp": "タクシー",
        "reading": "takushii",
        "id": "Taksi"
      },
      {
        "jp": "じてんしゃ (自転車)",
        "reading": "jitensha",
        "id": "Sepeda",
        "kanji": "自転車"
      },
      {
        "jp": "あるいて (歩いて)",
        "reading": "aruite",
        "id": "Jalan kaki",
        "kanji": "歩いて"
      },
      {
        "jp": "ともだち (友達)",
        "reading": "tomodachi",
        "id": "Teman",
        "kanji": "友達"
      },
      {
        "jp": "ひとりで (一人で)",
        "reading": "hitori de",
        "id": "Sendirian",
        "kanji": "一人で"
      },
      {
        "jp": "いつ",
        "reading": "itsu",
        "id": "Kapan"
      },
      {
        "jp": "たんじょうび (誕生日)",
        "reading": "tanjoubi",
        "id": "Hari ulang tahun",
        "kanji": "誕生日"
      },
      {
        "jp": "ひと (人)",
        "reading": "hito",
        "id": "Orang",
        "kanji": "人"
      },
      {
        "jp": "かれ (彼)",
        "reading": "kare",
        "id": "Dia (laki-laki)",
        "kanji": "彼"
      },
      {
        "jp": "かのじょ (彼女)",
        "reading": "kanojo",
        "id": "Dia (perempuan)",
        "kanji": "彼女"
      },
      {
        "jp": "かぞく (家族)",
        "reading": "kazoku",
        "id": "Keluarga",
        "kanji": "家族"
      },
      {
        "jp": "せんしゅう (先週)",
        "reading": "senshuu",
        "id": "Minggu lalu",
        "kanji": "先週"
      },
      {
        "jp": "こんしゅう (今週)",
        "reading": "konshuu",
        "id": "Minggu ini",
        "kanji": "今週"
      },
      {
        "jp": "らいしゅう (来週)",
        "reading": "raishuu",
        "id": "Minggu depan",
        "kanji": "来週"
      },
      {
        "jp": "せんげつ (先月)",
        "reading": "sengetsu",
        "id": "Bulan lalu",
        "kanji": "先月"
      },
      {
        "jp": "こんげつ (今月)",
        "reading": "kongetsu",
        "id": "Bulan ini",
        "kanji": "今月"
      },
      {
        "jp": "らいげつ (来月)",
        "reading": "raigetsu",
        "id": "Bulan depan",
        "kanji": "来月"
      },
      {
        "jp": "きょねん (去年)",
        "reading": "kyonen",
        "id": "Tahun lalu",
        "kanji": "去年"
      },
      {
        "jp": "ことし (今年)",
        "reading": "kotoshi",
        "id": "Tahun ini",
        "kanji": "今年"
      },
      {
        "jp": "らいねん (来年)",
        "reading": "rainen",
        "id": "Tahun depan",
        "kanji": "来年"
      },
      {
        "jp": "～ねん (～年)",
        "reading": "~nen",
        "id": "Tahun",
        "kanji": "～年"
      },
      {
        "jp": "なんねん (何年)",
        "reading": "nannen",
        "id": "Tahun berapa?",
        "kanji": "何年"
      },
      {
        "jp": "～がつ (～月)",
        "reading": "~gatsu",
        "id": "Bulan",
        "kanji": "～月"
      },
      {
        "jp": "なんがつ (何月)",
        "reading": "nangatsu",
        "id": "Bulan apa?",
        "kanji": "何月"
      },
      {
        "jp": "ついたち (一日)",
        "reading": "tsuitachi",
        "id": "Tanggal 1",
        "kanji": "一日"
      },
      {
        "jp": "ふつか (二日)",
        "reading": "futsuka",
        "id": "Tanggal 2 , 2 hari",
        "kanji": "二日"
      },
      {
        "jp": "みっか (三日)",
        "reading": "mikka",
        "id": "Tanggal 3 , 3 hari",
        "kanji": "三日"
      },
      {
        "jp": "よっか (四日)",
        "reading": "yokka",
        "id": "Tanggal 4 , 4 hari",
        "kanji": "四日"
      },
      {
        "jp": "いつか (五日)",
        "reading": "itsuka",
        "id": "Tanggal 5 , 5 hari",
        "kanji": "五日"
      },
      {
        "jp": "むいか (六日)",
        "reading": "muika",
        "id": "Tanggal 6 , 6 hari",
        "kanji": "六日"
      },
      {
        "jp": "なのか (七日)",
        "reading": "nanoka",
        "id": "Tanggal 7 , 7 hari",
        "kanji": "七日"
      },
      {
        "jp": "ようか (八日)",
        "reading": "youka",
        "id": "Tanggal 8, 8 hari",
        "kanji": "八日"
      },
      {
        "jp": "ここのか (九日)",
        "reading": "kokonoka",
        "id": "Tanggal 9 , 9 hari",
        "kanji": "九日"
      },
      {
        "jp": "とおか (十日)",
        "reading": "tooka",
        "id": "Tanggal 10, 10 hari",
        "kanji": "十日"
      },
      {
        "jp": "じゅうよっか (十四日)",
        "reading": "juuyokka",
        "id": "Tanggal 14 , 14 hari",
        "kanji": "十四日"
      },
      {
        "jp": "はつか (二十日)",
        "reading": "hatsuka",
        "id": "Tanggal 20 , 20 hari",
        "kanji": "二十日"
      },
      {
        "jp": "にじゅうよっか (二十四日)",
        "reading": "nijuuyokka",
        "id": "Tanggal 24 , 24 hari",
        "kanji": "二十四日"
      },
      {
        "jp": "～にち (～日)",
        "reading": "~nichi",
        "id": "Tanggal , hari",
        "kanji": "～日"
      },
      {
        "jp": "なんにち (何日)",
        "reading": "nannichi",
        "id": "Tanggal berapa, berapa hari",
        "kanji": "何日"
      },
      {
        "jp": "そうですね",
        "reading": "soudesune",
        "id": "Ya begitulah"
      },
      {
        "jp": "どういたしまして",
        "reading": "douitashimashite",
        "id": "Sama-sama"
      },
      {
        "jp": "～ばんせん (～番線)",
        "reading": "~bansen",
        "id": "Peron nomor , jalur nomor",
        "kanji": "～番線"
      },
      {
        "jp": "つぎの (次の)",
        "reading": "tsugino",
        "id": "Yang berikutnya",
        "kanji": "次の"
      },
      {
        "jp": "ふつう (普通)",
        "reading": "futsuu",
        "id": "Biasa",
        "kanji": "普通"
      },
      {
        "jp": "きゅうこう (急行)",
        "reading": "kyuukou",
        "id": "Ekspres",
        "kanji": "急行"
      },
      {
        "jp": "とっきゅう (特急)",
        "reading": "tokkyuu",
        "id": "Super ekspres",
        "kanji": "特急"
      },
      {
        "jp": "しゅくさいじつ (祝祭日)",
        "reading": "shukusaijitsu",
        "id": "Hari libur nasional",
        "kanji": "祝祭日"
      },
      {
        "jp": "がんじつ (元日)",
        "reading": "ganjitsu",
        "id": "Tahun baru",
        "kanji": "元日"
      },
      {
        "jp": "せいじんのひ (成人の日)",
        "reading": "seijinnohi",
        "id": "Hari perayaan menjadi dewasa",
        "kanji": "成人の日"
      },
      {
        "jp": "けんこくきねんのひ (建国記念の日)",
        "reading": "kenkokukinennohi",
        "id": "Hari pembangunan nasional",
        "kanji": "建国記念の日"
      },
      {
        "jp": "しゅんぶんのひ (春分の日)",
        "reading": "shunbunnohi",
        "id": "Hari equinox pada musim semi",
        "kanji": "春分の日"
      },
      {
        "jp": "しょうわのひ (昭和の日)",
        "reading": "shouwanohi",
        "id": "Hari showa",
        "kanji": "昭和の日"
      },
      {
        "jp": "けんぽうきねんび (憲法記念日)",
        "reading": "kenpoukinenbi",
        "id": "Hari peringatan konstitusi",
        "kanji": "憲法記念日"
      },
      {
        "jp": "みどりのひ",
        "reading": "midorinohi",
        "id": "Hari penghijauan"
      },
      {
        "jp": "こどものひ",
        "reading": "kodomonohi",
        "id": "Hari anak"
      },
      {
        "jp": "うみのひ (海の日)",
        "reading": "uminohi",
        "id": "Hari bahari",
        "kanji": "海の日"
      },
      {
        "jp": "やまのひ (山の日)",
        "reading": "yamanohi",
        "id": "Hari gunung",
        "kanji": "山の日"
      },
      {
        "jp": "けいろうのひ (敬老の日)",
        "reading": "keirounohi",
        "id": "Hari hormat kepada orang tua",
        "kanji": "敬老の日"
      },
      {
        "jp": "しゅうぶんのひ (秋分の日)",
        "reading": "shuubunnohi",
        "id": "Hari equinox pada musim gugur",
        "kanji": "秋分の日"
      },
      {
        "jp": "たいいくのひ (体育の日)",
        "reading": "taiikunohi",
        "id": "Hari kesehatan olahraga",
        "kanji": "体育の日"
      },
      {
        "jp": "ぶんかのひ (文化の日)",
        "reading": "bunkanohi",
        "id": "Hari kebudayaan",
        "kanji": "文化の日"
      },
      {
        "jp": "きんろうかんしゃのひ (勤労感謝の日)",
        "reading": "kinroukanshanohi",
        "id": "Hari bersyukur untuk pekerjaan",
        "kanji": "勤労感謝の日"
      },
      {
        "jp": "てんのうたんじょうび (天皇誕生日)",
        "reading": "tennoutanjoubi",
        "id": "Hari ulang tahun kaisar",
        "kanji": "天皇誕生日"
      }
    ]
  },
  {
    "chapter": 6,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 6: Objek Tindakan & Ajakan (〜を〜ます・〜ませんか)",
    "theme": "Objek Kerja, Tempat Beraktivitas, Ajakan Bersama, dan Menawarkan Bantuan",
    "summary": "Partikel を (wo/o) untuk objek langsung, partikel で untuk tempat beraktivitas, pola ajakan sopan ~masen ka, dan ajakan mari ~mashou.",
    "grammarPatterns": [
      {
        "id": "m6-1",
        "pattern": "Objek を Kata Kerja",
        "formula": "KB (Objek) [o] Kata Kerja Transitif",
        "explanation": "Partikel を menandai objek langsung dari perbuatan.",
        "examples": [
          {
            "jp": "ご飯を 食べます。",
            "reading": "Gohan o tabemasu.",
            "id": "Makan nasi."
          },
          {
            "jp": "水を 飲みます。",
            "reading": "Mizu o nomimasu.",
            "id": "Minum air."
          }
        ]
      },
      {
        "id": "m6-2",
        "pattern": "Tempat で Kata Kerja",
        "formula": "Tempat [de] Kata Kerja",
        "explanation": "Partikel で menunjukkan tempat terjadinya suatu kegiatan aktif.",
        "examples": [
          {
            "jp": "レストランで 昼ご飯を 食べます。",
            "reading": "Resutoran de hirugohan o tabemasu.",
            "id": "Makan siang di restoran."
          }
        ]
      },
      {
        "id": "m6-3",
        "pattern": "〜ませんか / 〜ましょう",
        "formula": "KK bentuk stem + [masen ka] / [mashou]",
        "explanation": "\"~masen ka\" mengajak dengan sopan (\"Maukah Anda...?\"), sedangkan \"~mashou\" mengajak dengan tegas (\"Ayo kita...\").",
        "examples": [
          {
            "jp": "いっしょに 京都へ 行きませんか。",
            "reading": "Issho ni Kyouto e ikimasen ka.",
            "id": "Maukah pergi ke Kyoto bersama-sama?"
          },
          {
            "jp": "ちょっと 休みましょう。",
            "reading": "Chotto yasumimashou.",
            "id": "Ayo kita istirahat sebentar."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "たべます (食べます)",
        "reading": "tabemasu",
        "id": "Makan",
        "kanji": "食べます"
      },
      {
        "jp": "のみます (飲みます)",
        "reading": "nomimasu",
        "id": "Minum",
        "kanji": "飲みます"
      },
      {
        "jp": "すいます (吸います)",
        "reading": "suimasu",
        "id": "Menghisap (rokok) / Menghisap / merokok",
        "kanji": "吸います"
      },
      {
        "jp": "みます (見ます)",
        "reading": "mimasu",
        "id": "Melihat / menonton",
        "kanji": "見ます"
      },
      {
        "jp": "ききます (聞きます)",
        "reading": "kikimasu",
        "id": "Mendengar",
        "kanji": "聞きます"
      },
      {
        "jp": "よみます (読みます)",
        "reading": "yomimasu",
        "id": "Membaca",
        "kanji": "読みます"
      },
      {
        "jp": "かきます (書きます)",
        "reading": "kakimasu",
        "id": "Menulis / menggambar",
        "kanji": "書きます"
      },
      {
        "jp": "かいます (買います)",
        "reading": "kaimasu",
        "id": "Membeli",
        "kanji": "買います"
      },
      {
        "jp": "とります (撮ります)",
        "reading": "torimasu",
        "id": "Mengambil (foto) / Mengambi (foto) / memotret",
        "kanji": "撮ります"
      },
      {
        "jp": "します",
        "reading": "shimasu",
        "id": "Melakukan / bermain / Melakukan / mengerjakan / berbuat"
      },
      {
        "jp": "あいます (会います)",
        "reading": "aimasu",
        "id": "Bertemu",
        "kanji": "会います"
      },
      {
        "jp": "ごはん (ご飯)",
        "reading": "gohan",
        "id": "Nasi / makanan",
        "kanji": "ご飯"
      },
      {
        "jp": "あさごはん (朝ご飯)",
        "reading": "asagohan",
        "id": "Sarapan",
        "kanji": "朝ご飯"
      },
      {
        "jp": "ひるごはん (昼ご飯)",
        "reading": "hirugohan",
        "id": "Makan siang",
        "kanji": "昼ご飯"
      },
      {
        "jp": "ばんごはん (晩ご飯)",
        "reading": "bangohan",
        "id": "Makan malam",
        "kanji": "晩ご飯"
      },
      {
        "jp": "パン",
        "reading": "pan",
        "id": "Roti"
      },
      {
        "jp": "たまご (卵)",
        "reading": "tamago",
        "id": "Telur",
        "kanji": "卵"
      },
      {
        "jp": "にく (肉)",
        "reading": "niku",
        "id": "Daging",
        "kanji": "肉"
      },
      {
        "jp": "さかな (魚)",
        "reading": "sakana",
        "id": "Ikan",
        "kanji": "魚"
      },
      {
        "jp": "やさい (野菜)",
        "reading": "yasai",
        "id": "Sayuran",
        "kanji": "野菜"
      },
      {
        "jp": "くだもの (果物)",
        "reading": "kudamono",
        "id": "Buah-buahan",
        "kanji": "果物"
      },
      {
        "jp": "みず (水)",
        "reading": "mizu",
        "id": "Air",
        "kanji": "水"
      },
      {
        "jp": "おちゃ (お茶)",
        "reading": "ocha",
        "id": "Teh Jepang / teh hijau",
        "kanji": "お茶"
      },
      {
        "jp": "こうちゃ (紅茶)",
        "reading": "koucha",
        "id": "Teh",
        "kanji": "紅茶"
      },
      {
        "jp": "ぎゅうにゅう (牛乳)",
        "reading": "gyuunyuu",
        "id": "Susu",
        "kanji": "牛乳"
      },
      {
        "jp": "ジュース",
        "reading": "juusu",
        "id": "Jus"
      },
      {
        "jp": "ビール",
        "reading": "biiru",
        "id": "Bir"
      },
      {
        "jp": "おさけ (お酒)",
        "reading": "osake",
        "id": "Minuman keras",
        "kanji": "お酒"
      },
      {
        "jp": "たばこ",
        "reading": "tabako",
        "id": "Rokok"
      },
      {
        "jp": "てがみ (手紙)",
        "reading": "tegami",
        "id": "Surat",
        "kanji": "手紙"
      },
      {
        "jp": "レポート",
        "reading": "repooto",
        "id": "Laporan"
      },
      {
        "jp": "しゃしん (写真)",
        "reading": "shashin",
        "id": "Foto",
        "kanji": "写真"
      },
      {
        "jp": "ビデオ",
        "reading": "bideo",
        "id": "Kaset video"
      },
      {
        "jp": "みせ (店)",
        "reading": "mise",
        "id": "Toko",
        "kanji": "店"
      },
      {
        "jp": "にわ (庭)",
        "reading": "niwa",
        "id": "Halaman",
        "kanji": "庭"
      },
      {
        "jp": "しゅくだい (宿題)",
        "reading": "shukudai",
        "id": "Pekerjaan rumah / PR",
        "kanji": "宿題"
      },
      {
        "jp": "テニス",
        "reading": "tenisu",
        "id": "Tenis"
      },
      {
        "jp": "サッカー",
        "reading": "sakkaa",
        "id": "Sepak bola"
      },
      {
        "jp": "はなみ (花見)",
        "reading": "hanami",
        "id": "Hanami (menikmati bunga sakura)",
        "kanji": "花見"
      },
      {
        "jp": "なに (何)",
        "reading": "nani",
        "id": "Apa",
        "kanji": "何"
      },
      {
        "jp": "いっしょに",
        "reading": "isshoni",
        "id": "Bersama-sama"
      },
      {
        "jp": "ちょっと",
        "reading": "chotto",
        "id": "Sebentar / sedikit"
      },
      {
        "jp": "いつも",
        "reading": "itsumo",
        "id": "Selalu"
      },
      {
        "jp": "ときどき (時々)",
        "reading": "tokidoki",
        "id": "Kadang-kadang",
        "kanji": "時々"
      },
      {
        "jp": "それから",
        "reading": "sorekara",
        "id": "Setelah itu / kemudian"
      },
      {
        "jp": "ええ",
        "reading": "ee",
        "id": "Ya"
      },
      {
        "jp": "いいですね",
        "reading": "iidesune",
        "id": "Bagus ya / baik ya"
      },
      {
        "jp": "わかりました (分かりました)",
        "reading": "wakarimashita",
        "id": "Mengerti / baik",
        "kanji": "分かりました"
      },
      {
        "jp": "じゃ、また",
        "reading": "ja, mata",
        "id": "Ok, sampai jumpa besok"
      },
      {
        "jp": "メキシコ",
        "reading": "mekishiko",
        "id": "Meksiko"
      },
      {
        "jp": "きゅうり",
        "reading": "kyuuri",
        "id": "Timun"
      },
      {
        "jp": "トマト",
        "reading": "tomato",
        "id": "Tomat"
      },
      {
        "jp": "なす",
        "reading": "nasu",
        "id": "Terong"
      },
      {
        "jp": "まめ",
        "reading": "mame",
        "id": "Kacang-kacangan"
      },
      {
        "jp": "キャベツ",
        "reading": "kyabetsu",
        "id": "Kol"
      },
      {
        "jp": "ねぎ",
        "reading": "negi",
        "id": "Daun bawang"
      },
      {
        "jp": "はくさい",
        "reading": "hakusai",
        "id": "Sawi"
      },
      {
        "jp": "ほうれんそう",
        "reading": "hourensou",
        "id": "Bayam"
      },
      {
        "jp": "レタス",
        "reading": "retasu",
        "id": "Letas"
      },
      {
        "jp": "じゃがいも",
        "reading": "jagaimo",
        "id": "Kentang"
      },
      {
        "jp": "だいこん",
        "reading": "daikon",
        "id": "Lobak"
      },
      {
        "jp": "たまねぎ",
        "reading": "tamanegi",
        "id": "Bawang"
      },
      {
        "jp": "にんじん",
        "reading": "ninjin",
        "id": "Wortel"
      },
      {
        "jp": "いちご",
        "reading": "ichigo",
        "id": "Stroberi"
      },
      {
        "jp": "もも",
        "reading": "momo",
        "id": "Buah peach"
      },
      {
        "jp": "すいか",
        "reading": "suika",
        "id": "Semangka"
      },
      {
        "jp": "ぶどう",
        "reading": "budou",
        "id": "Anggur"
      },
      {
        "jp": "なし",
        "reading": "nashi",
        "id": "Pir"
      },
      {
        "jp": "かき",
        "reading": "kaki",
        "id": "Kesemek"
      },
      {
        "jp": "みかん",
        "reading": "mikan",
        "id": "Jeruk"
      },
      {
        "jp": "りんご",
        "reading": "ringo",
        "id": "Apel"
      },
      {
        "jp": "バナナ",
        "reading": "banana",
        "id": "Pisang"
      },
      {
        "jp": "ぎゅうにく",
        "reading": "gyuuniku",
        "id": "Daging sapi"
      },
      {
        "jp": "とりにく",
        "reading": "toriniku",
        "id": "Daging ayam"
      },
      {
        "jp": "ぶたにく",
        "reading": "butaniku",
        "id": "Daging babi"
      },
      {
        "jp": "ソーセージ",
        "reading": "sooseeji",
        "id": "Sosis"
      },
      {
        "jp": "ハム",
        "reading": "haム",
        "id": "Ham"
      },
      {
        "jp": "あじ",
        "reading": "aji",
        "id": "Ikan mackerel"
      },
      {
        "jp": "いわし",
        "reading": "iwashi",
        "id": "Ikan sarden"
      },
      {
        "jp": "さば",
        "reading": "saba",
        "id": "Ikan kembung"
      },
      {
        "jp": "さんま",
        "reading": "sanma",
        "id": "Ikan sauri pasifik"
      },
      {
        "jp": "さけ",
        "reading": "sake",
        "id": "Ikan salmon"
      },
      {
        "jp": "まぐろ",
        "reading": "maguro",
        "id": "Ikan tuna"
      },
      {
        "jp": "たい",
        "reading": "tai",
        "id": "Ikan kakap"
      },
      {
        "jp": "たら",
        "reading": "tara",
        "id": "Ikan gabus"
      },
      {
        "jp": "えび",
        "reading": "ebi",
        "id": "Udang"
      },
      {
        "jp": "かに",
        "reading": "kani",
        "id": "Kepiting"
      },
      {
        "jp": "いか",
        "reading": "ika",
        "id": "Cumi-cumi"
      },
      {
        "jp": "たこ",
        "reading": "tako",
        "id": "Gurita"
      },
      {
        "jp": "こめ",
        "reading": "kome",
        "id": "Beras"
      }
    ]
  },
  {
    "chapter": 7,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 7: Alat, Bahasa & Memberi (〜で〜ます・あげます・もらいます)",
    "theme": "Alat/Perantara, Terjemahan Bahasa, Memberi dan Menerima Barang",
    "summary": "Partikel で untuk alat/sarana/bahasa, rumus memberi (agemasu) dan menerima (moraimasu), serta konfirmasi penyelesaian (mou ~mashita).",
    "grammarPatterns": [
      {
        "id": "m7-1",
        "pattern": "Alat / Bahasa で Kata Kerja",
        "formula": "Alat / Bahasa [de] Kata Kerja",
        "explanation": "Menunjukkan media, instrumen, atau bahasa yang dipakai.",
        "examples": [
          {
            "jp": "はしで 食べます。",
            "reading": "Hashi de tabemasu.",
            "id": "Makan menggunakan sumpit."
          },
          {
            "jp": "日本語で レポートを 書きます。",
            "reading": "Nihongo de repooto o kakimasu.",
            "id": "Menulis laporan dalam bahasa Jepang."
          }
        ]
      },
      {
        "id": "m7-2",
        "pattern": "Orang に Benda を あげます / もらいます",
        "formula": "Pemberi [wa] Penerima [ni] Benda [o agemasu] / Penerima [wa] Pemberi [ni/kara] Benda [o moraimasu]",
        "explanation": "Agemasu berarti \"memberikan kepada\", moraimasu berarti \"menerima dari\".",
        "examples": [
          {
            "jp": "わたしは 木村さんに 花を あげました。",
            "reading": "Watashi wa Kimura-san ni hana o agemashita.",
            "id": "Saya memberikan bunga kepada Nn. Kimura."
          },
          {
            "jp": "山田さんに プレゼントを もらいました。",
            "reading": "Yamada-san ni purezento o moraimashita.",
            "id": "Menerima hadiah dari Tuan Yamada."
          }
        ]
      },
      {
        "id": "m7-3",
        "pattern": "もう 〜ました (Mou ~mashita)",
        "formula": "mou + KK bentuk -mashita",
        "explanation": "Menyatakan bahwa tindakan sudah selesai dilakukan (\"sudah...\").",
        "examples": [
          {
            "jp": "もう 荷物を 送りましたか。はい、もう 送りました。",
            "reading": "Mou nimotsu o okurimashita ka. Hai, mou okurimashita.",
            "id": "Apakah sudah mengirim barang paketnya? Ya, sudah kirim."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "きります (切ります)",
        "reading": "kirimasu",
        "id": "Memotong",
        "kanji": "切ります"
      },
      {
        "jp": "おくります (送ります)",
        "reading": "okurimasu",
        "id": "Mengirim",
        "kanji": "送ります"
      },
      {
        "jp": "あげます",
        "reading": "agemasu",
        "id": "Memberikan"
      },
      {
        "jp": "もらいます",
        "reading": "moraimasu",
        "id": "Menerima"
      },
      {
        "jp": "かします (貸します)",
        "reading": "kashimasu",
        "id": "Meminjamkan",
        "kanji": "貸します"
      },
      {
        "jp": "かります (借ります)",
        "reading": "karimasu",
        "id": "Meminjam",
        "kanji": "借ります"
      },
      {
        "jp": "おしえます (教えます)",
        "reading": "oshiemasu",
        "id": "Mengajar / memberi tahu",
        "kanji": "教えます"
      },
      {
        "jp": "ならいます (習います)",
        "reading": "naraimasu",
        "id": "Belajar (dari orang) / Belajar (kepada)",
        "kanji": "習います"
      },
      {
        "jp": "はし",
        "reading": "hashi",
        "id": "Sumpit"
      },
      {
        "jp": "スプーン",
        "reading": "supuun",
        "id": "Sendok"
      },
      {
        "jp": "ナイフ",
        "reading": "naifu",
        "id": "Pisau"
      },
      {
        "jp": "フォーク",
        "reading": "fooku",
        "id": "Garpu"
      },
      {
        "jp": "はさみ",
        "reading": "hasami",
        "id": "Gunting"
      },
      {
        "jp": "パソコン",
        "reading": "pasokon",
        "id": "Laptop / PC"
      },
      {
        "jp": "ケータイ",
        "reading": "keetai",
        "id": "HP / Ponsel"
      },
      {
        "jp": "プレゼント",
        "reading": "purezento",
        "id": "Hadiah"
      },
      {
        "jp": "にもつ (荷物)",
        "reading": "nimotsu",
        "id": "Barang bawaan / paket",
        "kanji": "荷物"
      },
      {
        "jp": "おかね (お金)",
        "reading": "okane",
        "id": "Uang",
        "kanji": "お金"
      },
      {
        "jp": "もう",
        "reading": "mou",
        "id": "Sudah"
      },
      {
        "jp": "まだ",
        "reading": "mada",
        "id": "Belum"
      },
      {
        "jp": "かけます（を）",
        "reading": "kakemasu (o)",
        "id": "Menelpon"
      },
      {
        "jp": "て (手)",
        "reading": "te",
        "id": "Tangan",
        "kanji": "手"
      },
      {
        "jp": "メール",
        "reading": "meeru",
        "id": "Email"
      },
      {
        "jp": "ねんがじょう (年賀状)",
        "reading": "nengajou",
        "id": "Kartu tahun baru",
        "kanji": "年賀状"
      },
      {
        "jp": "パンチ",
        "reading": "panchi",
        "id": "Pelubang kertas"
      },
      {
        "jp": "ホッチキス",
        "reading": "hotchikisu",
        "id": "Stapler"
      },
      {
        "jp": "セロテープ",
        "reading": "seroteepu",
        "id": "Selotip"
      },
      {
        "jp": "けしゴム (消しゴム)",
        "reading": "keshiゴム",
        "id": "Penghapus karet",
        "kanji": "消しゴム"
      },
      {
        "jp": "かみ (紙)",
        "reading": "kami",
        "id": "Kertas",
        "kanji": "紙"
      },
      {
        "jp": "はな (花)",
        "reading": "hana",
        "id": "Bunga",
        "kanji": "花"
      },
      {
        "jp": "シャツ",
        "reading": "shatsu",
        "id": "Kemeja"
      },
      {
        "jp": "きっぷ (切符)",
        "reading": "kippu",
        "id": "Karcis",
        "kanji": "切符"
      },
      {
        "jp": "クリスマス",
        "reading": "kurisumasu",
        "id": "Natal"
      },
      {
        "jp": "ちち (父)",
        "reading": "chichi",
        "id": "Ayah",
        "kanji": "父"
      },
      {
        "jp": "はは (母)",
        "reading": "haha",
        "id": "Ibu",
        "kanji": "母"
      },
      {
        "jp": "おとうさん (お父さん)",
        "reading": "otousan",
        "id": "Ayah orang lain",
        "kanji": "お父さん"
      },
      {
        "jp": "おかあさん (お母さん)",
        "reading": "okaasan",
        "id": "Ibu orang lain",
        "kanji": "お母さん"
      },
      {
        "jp": "これから",
        "reading": "korekara",
        "id": "Mulai dari sekarang"
      },
      {
        "jp": "すてきですね",
        "reading": "sutekidesune",
        "id": "Bagus ya / indah ya"
      },
      {
        "jp": "いらっしゃい",
        "reading": "irasshai",
        "id": "Selamat datang"
      },
      {
        "jp": "どうぞおあがりください",
        "reading": "douzooagarikudasai",
        "id": "Silakan masuk"
      },
      {
        "jp": "しつれいします (失礼します)",
        "reading": "shitsureishimasu",
        "id": "Permisi",
        "kanji": "失礼します"
      },
      {
        "jp": "～いかがですか",
        "reading": "~ikagadesuka",
        "id": "Bagaimana ? (menawarkan sesuatu kepada orang)"
      },
      {
        "jp": "いただきます",
        "reading": "itadakimasu",
        "id": "Selamat makan"
      },
      {
        "jp": "ごちそうさまでした",
        "reading": "gochisousamadeshita",
        "id": "Terima kasih atas hidangannya"
      },
      {
        "jp": "スペイン",
        "reading": "supein",
        "id": "Spanyol"
      },
      {
        "jp": "かぞく (家族)",
        "reading": "kazoku",
        "id": "Keluarga",
        "kanji": "家族"
      },
      {
        "jp": "そぼ (祖母)",
        "reading": "sobo",
        "id": "Nenek",
        "kanji": "祖母"
      },
      {
        "jp": "そふ (祖父)",
        "reading": "sofu",
        "id": "Kakek",
        "kanji": "祖父"
      },
      {
        "jp": "そふぼ (祖父母)",
        "reading": "sofubo",
        "id": "Kakek nenek",
        "kanji": "祖父母"
      },
      {
        "jp": "りょうしん (両親)",
        "reading": "ryoushin",
        "id": "Orang tua",
        "kanji": "両親"
      },
      {
        "jp": "いもうと (妹)",
        "reading": "imouto",
        "id": "Adik perempuan",
        "kanji": "妹"
      },
      {
        "jp": "おとうと (弟)",
        "reading": "otouto",
        "id": "Adik laki-laki",
        "kanji": "弟"
      },
      {
        "jp": "あね (姉)",
        "reading": "ane",
        "id": "Kakak perempuan",
        "kanji": "姉"
      },
      {
        "jp": "あに (兄)",
        "reading": "ani",
        "id": "Kakak laki-laki",
        "kanji": "兄"
      },
      {
        "jp": "きょうだい (兄弟)",
        "reading": "kyoudai",
        "id": "Saudara kandung",
        "kanji": "兄弟"
      },
      {
        "jp": "つま (妻)",
        "reading": "tsuma",
        "id": "Istri",
        "kanji": "妻"
      },
      {
        "jp": "おっと (夫)",
        "reading": "otto",
        "id": "Suami",
        "kanji": "夫"
      },
      {
        "jp": "ふうふ (夫婦)",
        "reading": "fuufu",
        "id": "Pasangan suami istri",
        "kanji": "夫婦"
      },
      {
        "jp": "むすめ (娘)",
        "reading": "musume",
        "id": "Anak perempuan",
        "kanji": "娘"
      },
      {
        "jp": "むすこ (息子)",
        "reading": "musuko",
        "id": "Anak laki-laki",
        "kanji": "息子"
      },
      {
        "jp": "こども (子供)",
        "reading": "kodomo",
        "id": "Anak",
        "kanji": "子供"
      },
      {
        "jp": "おばあさん",
        "reading": "obaasan",
        "id": "Nenek (orang lain)"
      },
      {
        "jp": "おじいさん",
        "reading": "ojiisan",
        "id": "Kakek (orang lain)"
      },
      {
        "jp": "ごりょうしん",
        "reading": "goryoushin",
        "id": "Orang tua (orang lain)"
      },
      {
        "jp": "いもうとさん",
        "reading": "imoutosan",
        "id": "Adik perempuan (orang lain)"
      },
      {
        "jp": "おとうとさん",
        "reading": "otoutosan",
        "id": "Adik laki-laki (orang lain)"
      },
      {
        "jp": "おねえさん",
        "reading": "oneesan",
        "id": "Kakak perempuan (orang lain)"
      },
      {
        "jp": "おにいさん",
        "reading": "oniisan",
        "id": "Kakak laki-laki (orang lain)"
      },
      {
        "jp": "ごきょうだい",
        "reading": "gokyoudai",
        "id": "Saudara kandung (orang lain)"
      },
      {
        "jp": "おくさん",
        "reading": "okusan",
        "id": "Istri (orang lain)"
      },
      {
        "jp": "ごふうふ",
        "reading": "gofuufu",
        "id": "Pasangan suami istri (orang lain)"
      },
      {
        "jp": "むすめさん",
        "reading": "musumesan",
        "id": "Anak perempuan (orang lain)"
      },
      {
        "jp": "むすこさん",
        "reading": "musukosan",
        "id": "Anak laki-laki (orang lain)"
      },
      {
        "jp": "おこさん",
        "reading": "okosan",
        "id": "Anak (orang lain)"
      }
    ]
  },
  {
    "chapter": 8,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 8: Kata Sifat (い形容詞 & な形容詞)",
    "theme": "Sifat Benda, Kondisi Cuaca, Karakter Tempat, dan Rasa Makanan",
    "summary": "Mempelajari 2 golongan kata sifat: Kata Sifat-i (i-keiyoushi) dan Kata Sifat-na (na-keiyoushi), baik saat berdiri sebagai predikat maupun menerangkan kata benda.",
    "grammarPatterns": [
      {
        "id": "m8-1",
        "pattern": "Kata Sifat sebagai Predikat Kalimat",
        "formula": "KB wa [I-Keiyoushi desu] / [Na-Keiyoushi desu]",
        "explanation": "I-Keiyoushi langsung + desu. Negatifnya akhiran \"i\" diubah jadi \"kunai desu\". Na-Keiyoushi memakai \"desu\", negatifnya \"ja arimasen\".",
        "examples": [
          {
            "jp": "富士山は 高いです。",
            "reading": "Fujisan wa takai desu.",
            "id": "Gunung Fuji tinggi."
          },
          {
            "jp": "この町は 静かじゃありません。",
            "reading": "Kono machi wa shizuka ja arimasen.",
            "id": "Kota ini tidak tenang/sepi."
          }
        ]
      },
      {
        "id": "m8-2",
        "pattern": "Kata Sifat Menerangkan Kata Benda",
        "formula": "[I-Keiyoushi] + KB / [Na-Keiyoushi + na] + KB",
        "explanation": "Kata sifat-na harus menambahkan akhiran \"na\" saat berada tepat sebelum kata benda.",
        "examples": [
          {
            "jp": "奈良は 静かな 町です。",
            "reading": "Nara wa shizuka na machi desu.",
            "id": "Nara adalah kota yang tenang."
          },
          {
            "jp": "冷たい 水を 飲みました。",
            "reading": "Tsumetai mizu o nomimashita.",
            "id": "Minum air dingin."
          }
        ]
      },
      {
        "id": "m8-3",
        "pattern": "〜そして〜 / 〜が〜 (Penghubung dan vs tetapi)",
        "formula": "Kalimat 1 [soshite] Kalimat 2 / Kalimat 1 [ga], Kalimat 2",
        "explanation": "\"Soshite\" menghubungkan dua sifat yang sejalan. \"Ga\" menghubungkan dua sifat yang kontras.",
        "examples": [
          {
            "jp": "日本の食べ物は 美味しいですが、高いです。",
            "reading": "Nihon no tabemono wa oishii desu ga, takai desu.",
            "id": "Makanan Jepang enak, tetapi mahal."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "ハンサム [な]",
        "reading": "hansamu [na]",
        "id": "Tampan / rupawan"
      },
      {
        "jp": "きれい [な]",
        "reading": "kirei [na]",
        "id": "Cantik / bersih / indah"
      },
      {
        "jp": "しずか [な]",
        "reading": "shizuka [na]",
        "id": "Tenang / sunyi"
      },
      {
        "jp": "にぎやか [な]",
        "reading": "nigiyaka [na]",
        "id": "Ramai"
      },
      {
        "jp": "ゆうめい [な]",
        "reading": "yuumei [na]",
        "id": "Terkenal"
      },
      {
        "jp": "しんせつ [な]",
        "reading": "shinsetsu [na]",
        "id": "Ramah / baik hati"
      },
      {
        "jp": "げんき [な]",
        "reading": "genki [na]",
        "id": "Sehat / bersemangat"
      },
      {
        "jp": "ひま [な]",
        "reading": "hima [na]",
        "id": "Senggang / luang"
      },
      {
        "jp": "べんり [な]",
        "reading": "benri [na]",
        "id": "Praktis"
      },
      {
        "jp": "おおきい (大きい)",
        "reading": "ookii",
        "id": "Besar",
        "kanji": "大きい"
      },
      {
        "jp": "ちいさい (小さい)",
        "reading": "chiisai",
        "id": "Kecil",
        "kanji": "小さい"
      },
      {
        "jp": "あたらしい (新しい)",
        "reading": "atarashii",
        "id": "Baru",
        "kanji": "新しい"
      },
      {
        "jp": "ふるい (古い)",
        "reading": "furui",
        "id": "Lama / tua",
        "kanji": "古い"
      },
      {
        "jp": "いい (よい)",
        "reading": "ii (yoi)",
        "id": "Bagus / baik / Baik / bagus"
      },
      {
        "jp": "わるい (悪い)",
        "reading": "warui",
        "id": "Buruk / jelek",
        "kanji": "悪い"
      },
      {
        "jp": "あつい (暑い / 熱い)",
        "reading": "atsui",
        "id": "Panas (cuaca / benda)",
        "kanji": "暑い / 熱い"
      },
      {
        "jp": "さむい (寒い)",
        "reading": "samui",
        "id": "Dingin (suhu udara) / Dingin suhu",
        "kanji": "寒い"
      },
      {
        "jp": "つめたい (冷たい)",
        "reading": "tsumetai",
        "id": "Dingin (benda disentuh) / Dingin benda",
        "kanji": "冷たい"
      },
      {
        "jp": "むずかしい (難しい)",
        "reading": "muzukashii",
        "id": "Sulit",
        "kanji": "難しい"
      },
      {
        "jp": "やさしい (易しい)",
        "reading": "yasashii",
        "id": "Mudah",
        "kanji": "易しい"
      },
      {
        "jp": "たかい (高い)",
        "reading": "takai",
        "id": "Mahal / tinggi",
        "kanji": "高い"
      },
      {
        "jp": "やすい (安い)",
        "reading": "yasui",
        "id": "Murah",
        "kanji": "安い"
      },
      {
        "jp": "おいしい",
        "reading": "oishii",
        "id": "Enak / lezat"
      },
      {
        "jp": "いそがしい (忙しい)",
        "reading": "isogashii",
        "id": "Sibuk",
        "kanji": "忙しい"
      },
      {
        "jp": "ハンサム（な）",
        "reading": "hansaム (na)",
        "id": "Tampan / gagah / ganteng"
      },
      {
        "jp": "きれい（な）",
        "reading": "kirei (na)",
        "id": "Cantik / bersih"
      },
      {
        "jp": "しずか（な） (静香（な）)",
        "reading": "shizuka (na)",
        "id": "Sunyi / tenang",
        "kanji": "静香（な）"
      },
      {
        "jp": "にぎやか（な）",
        "reading": "nigiyaka (na)",
        "id": "Ramai"
      },
      {
        "jp": "ゆうめい（な） (有名（な）)",
        "reading": "yuumei (na)",
        "id": "Terkenal",
        "kanji": "有名（な）"
      },
      {
        "jp": "しんせつ（な） (新設（な）)",
        "reading": "shinsetsu (na)",
        "id": "Baik hati",
        "kanji": "新設（な）"
      },
      {
        "jp": "げんき（な） (元気（な）)",
        "reading": "genki (na)",
        "id": "Sehat",
        "kanji": "元気（な）"
      },
      {
        "jp": "ひま（な） (暇（な）)",
        "reading": "hima (na)",
        "id": "Senggang",
        "kanji": "暇（な）"
      },
      {
        "jp": "べんり（な） (便利（な）)",
        "reading": "benri (na)",
        "id": "Praktis",
        "kanji": "便利（な）"
      },
      {
        "jp": "すてき（な）",
        "reading": "suteki (na)",
        "id": "Bagus"
      },
      {
        "jp": "あつい (暑い、熱い)",
        "reading": "atsui",
        "id": "Panas",
        "kanji": "暑い、熱い"
      },
      {
        "jp": "ひくい (低い)",
        "reading": "hikui",
        "id": "Rendah",
        "kanji": "低い"
      },
      {
        "jp": "おもしろい",
        "reading": "omoshiroi",
        "id": "Menarik"
      },
      {
        "jp": "たのしい (楽しい)",
        "reading": "tanoshii",
        "id": "Senang",
        "kanji": "楽しい"
      },
      {
        "jp": "しろい (白い)",
        "reading": "shiroi",
        "id": "Putih",
        "kanji": "白い"
      },
      {
        "jp": "くろい (黒い)",
        "reading": "kuroi",
        "id": "Hitam",
        "kanji": "黒い"
      },
      {
        "jp": "あかい (赤い)",
        "reading": "akai",
        "id": "Merah",
        "kanji": "赤い"
      },
      {
        "jp": "あおい (青い)",
        "reading": "aoi",
        "id": "Biru",
        "kanji": "青い"
      },
      {
        "jp": "さくら (桜)",
        "reading": "sakura",
        "id": "Sakura",
        "kanji": "桜"
      },
      {
        "jp": "やま (山)",
        "reading": "yama",
        "id": "Gunung",
        "kanji": "山"
      },
      {
        "jp": "まち (町)",
        "reading": "machi",
        "id": "Kota",
        "kanji": "町"
      },
      {
        "jp": "たべもの (食べ物)",
        "reading": "tabemono",
        "id": "Makanan",
        "kanji": "食べ物"
      },
      {
        "jp": "ところ (所)",
        "reading": "tokoro",
        "id": "Tempat",
        "kanji": "所"
      },
      {
        "jp": "りょう (寮)",
        "reading": "ryou",
        "id": "Asrama",
        "kanji": "寮"
      },
      {
        "jp": "レストラン",
        "reading": "resutoran",
        "id": "Restoran"
      },
      {
        "jp": "せいかつ (生活)",
        "reading": "seikatsu",
        "id": "Kehidupan",
        "kanji": "生活"
      },
      {
        "jp": "しごと (仕事)",
        "reading": "shigoto",
        "id": "Pekerjaan",
        "kanji": "仕事"
      },
      {
        "jp": "どう",
        "reading": "dou",
        "id": "Bagaimana?"
      },
      {
        "jp": "どんな～",
        "reading": "donna~",
        "id": "Yang bagaimana ?"
      },
      {
        "jp": "とても",
        "reading": "totemo",
        "id": "Sangat / ~sekali"
      },
      {
        "jp": "あまり",
        "reading": "amari",
        "id": "Tidak begitu ~ / kurang begitu ~"
      },
      {
        "jp": "そして",
        "reading": "soshite",
        "id": "Kemudian"
      },
      {
        "jp": "～が～",
        "reading": "~ga~",
        "id": "Tetapi"
      },
      {
        "jp": "おげんきですか (お元気ですか)",
        "reading": "ogenkidesuka",
        "id": "Apa kabar ?",
        "kanji": "お元気ですか"
      },
      {
        "jp": "そうですね",
        "reading": "soudesune",
        "id": "Bagaimana ya?"
      },
      {
        "jp": "～もういっぱいいかがですか",
        "reading": "~mouippaiikagadesuka",
        "id": "Mau nambah secangkir lagi ?"
      },
      {
        "jp": "（いいえ）けっこうです",
        "reading": "(iie) kekkoudesu",
        "id": "Cukup"
      },
      {
        "jp": "そろそろしつれいします (そろそろ失礼します)",
        "reading": "sorosoroshitsureishimasu",
        "id": "Maaf saya mau pamit dulu",
        "kanji": "そろそろ失礼します"
      },
      {
        "jp": "いいえ",
        "reading": "iie",
        "id": "Sama-sama"
      },
      {
        "jp": "またいらっしゃってください",
        "reading": "matairasshattekudasai",
        "id": "Silakan datang lagi"
      },
      {
        "jp": "シャンハイ",
        "reading": "shanhai",
        "id": "Shanghai"
      },
      {
        "jp": "みどり",
        "reading": "midori",
        "id": "Hijau"
      },
      {
        "jp": "むらさき",
        "reading": "murasaki",
        "id": "Ungu"
      },
      {
        "jp": "きいろい",
        "reading": "kiiroi",
        "id": "Kuning"
      },
      {
        "jp": "ちゃいろい",
        "reading": "chairoi",
        "id": "coklat"
      },
      {
        "jp": "ピンク",
        "reading": "pinku",
        "id": "Merah muda"
      },
      {
        "jp": "オレンジ",
        "reading": "orenji",
        "id": "Oranye"
      },
      {
        "jp": "グレー",
        "reading": "guree",
        "id": "Abu-abu"
      },
      {
        "jp": "ベージュ",
        "reading": "beeju",
        "id": "krem"
      },
      {
        "jp": "はる (春)",
        "reading": "haru",
        "id": "Musim semi",
        "kanji": "春"
      },
      {
        "jp": "なつ (夏)",
        "reading": "natsu",
        "id": "Musim panas",
        "kanji": "夏"
      },
      {
        "jp": "あき (秋)",
        "reading": "aki",
        "id": "Musim gugur",
        "kanji": "秋"
      },
      {
        "jp": "ふゆ (冬)",
        "reading": "fuyu",
        "id": "Musim dingin",
        "kanji": "冬"
      }
    ]
  },
  {
    "chapter": 9,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 9: Kesukaan, Kemampuan & Alasan (〜が好き・上手・から)",
    "theme": "Suka/Tidak Suka, Pandai/Kurang, Kepemilikan & Alasan Sebab",
    "summary": "Partikel が (ga) untuk menyatakan kesukaan (suki), kebencian (kirai), keahlian (jouzu/heta), pemahaman (wakarimasu), dan alasan (kara).",
    "grammarPatterns": [
      {
        "id": "m9-1",
        "pattern": "〜が 好きです / 嫌いです / 上手です / 下手です",
        "formula": "KB [ga] suki / kirai / jouzu / heta [desu]",
        "explanation": "Objek rasa suka, benci, atau kemahiran ditandai dengan partikel が bukan を.",
        "examples": [
          {
            "jp": "わたしは 日本料理が 好きです。",
            "reading": "Watashi wa Nihon ryouri ga suki desu.",
            "id": "Saya suka masakan Jepang."
          },
          {
            "jp": "マリアさんは カラオケが 上手です。",
            "reading": "Maria-san wa karaoke ga jouzu desu.",
            "id": "Maria pandai bernyanyi karaoke."
          }
        ]
      },
      {
        "id": "m9-2",
        "pattern": "〜が わかります / あります",
        "formula": "KB [ga] wakarimasu / arimasu",
        "explanation": "Memahami bahasa/materi dan memiliki benda tak bernyawa/waktu luang menggunakan partikel が.",
        "examples": [
          {
            "jp": "日本語が 少し わかります。",
            "reading": "Nihongo ga sukoshi wakarimasu.",
            "id": "Paham bahasa Jepang sedikit."
          },
          {
            "jp": "車が あります。",
            "reading": "Kuruma ga arimasu.",
            "id": "Mempunyai mobil."
          }
        ]
      },
      {
        "id": "m9-3",
        "pattern": "Alasan 〜から、〜 (Karena...)",
        "formula": "Kalimat Sebab [kara], Kalimat Akibat",
        "explanation": "\"Kara\" di akhir kalimat pertama menyatakan alasan logis bagi kalimat berikutnya.",
        "examples": [
          {
            "jp": "時間が ありませんから、タクシーで 行きます。",
            "reading": "Jikan ga arimasen kara, takushii de ikimasu.",
            "id": "Karena tidak ada waktu, saya pergi naik taksi."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "わかります (分かります)",
        "reading": "wakarimasu",
        "id": "Mengerti / paham",
        "kanji": "分かります"
      },
      {
        "jp": "あります",
        "reading": "arimasu",
        "id": "Ada / memiliki (benda mati) / Ada / mempunyai"
      },
      {
        "jp": "すき [な] (好き)",
        "reading": "suki [na]",
        "id": "Suka",
        "kanji": "好き"
      },
      {
        "jp": "きらい [な] (嫌い)",
        "reading": "kirai [na]",
        "id": "Tidak suka / benci",
        "kanji": "嫌い"
      },
      {
        "jp": "じょうず [な] (上手)",
        "reading": "jouzu [na]",
        "id": "Pandai / mahir",
        "kanji": "上手"
      },
      {
        "jp": "へた [な] (下手)",
        "reading": "heta [na]",
        "id": "Kurang pandai / payah",
        "kanji": "下手"
      },
      {
        "jp": "りょうり (料理)",
        "reading": "ryouri",
        "id": "Masakan",
        "kanji": "料理"
      },
      {
        "jp": "のみもの (飲み物)",
        "reading": "nomimono",
        "id": "Minuman",
        "kanji": "飲み物"
      },
      {
        "jp": "スポーツ",
        "reading": "supootsu",
        "id": "Olahraga"
      },
      {
        "jp": "おんがく (音楽)",
        "reading": "ongaku",
        "id": "Musik",
        "kanji": "音楽"
      },
      {
        "jp": "うた (歌)",
        "reading": "uta",
        "id": "Lagu",
        "kanji": "歌"
      },
      {
        "jp": "ダンス",
        "reading": "dansu",
        "id": "Tarian / Dansa"
      },
      {
        "jp": "じ (字)",
        "reading": "ji",
        "id": "Huruf / aksara",
        "kanji": "字"
      },
      {
        "jp": "かんじ (漢字)",
        "reading": "kanji",
        "id": "Huruf Kanji",
        "kanji": "漢字"
      },
      {
        "jp": "じかん (時間)",
        "reading": "jikan",
        "id": "Waktu",
        "kanji": "時間"
      },
      {
        "jp": "ようじ (用事)",
        "reading": "youji",
        "id": "Urusan",
        "kanji": "用事"
      },
      {
        "jp": "やくそく (約束)",
        "reading": "yakusoku",
        "id": "Janji",
        "kanji": "約束"
      },
      {
        "jp": "よく",
        "reading": "yoku",
        "id": "Sering / dengan baik"
      },
      {
        "jp": "だいたい",
        "reading": "daitai",
        "id": "Sebagian besar / garis besar / Kira-kira"
      },
      {
        "jp": "たくさん",
        "reading": "takusan",
        "id": "Banyak"
      },
      {
        "jp": "すこし (少し)",
        "reading": "sukoshi",
        "id": "Sedikit",
        "kanji": "少し"
      },
      {
        "jp": "ぜんぜん (全然)",
        "reading": "zenzen",
        "id": "Sama sekali tidak (diikuti negatif)",
        "kanji": "全然"
      },
      {
        "jp": "すき（な） (好きな)",
        "reading": "suki (na)",
        "id": "Suka , gemar",
        "kanji": "好きな"
      },
      {
        "jp": "きらい（な） (嫌いな)",
        "reading": "kirai (na)",
        "id": "Benci",
        "kanji": "嫌いな"
      },
      {
        "jp": "じょうず（な） (上手な)",
        "reading": "jouzu (na)",
        "id": "Pandai , pintar",
        "kanji": "上手な"
      },
      {
        "jp": "へた（な） (下手な)",
        "reading": "heta (na)",
        "id": "Tidak pandai , tidak pintar , bodoh",
        "kanji": "下手な"
      },
      {
        "jp": "やきゅう (野球)",
        "reading": "yakyuu",
        "id": "Baseball",
        "kanji": "野球"
      },
      {
        "jp": "りょこう (旅行)",
        "reading": "ryokou",
        "id": "Tamasya",
        "kanji": "旅行"
      },
      {
        "jp": "クラシック",
        "reading": "kurashikku",
        "id": "Klasik"
      },
      {
        "jp": "ジャズ",
        "reading": "jazu",
        "id": "Jaz"
      },
      {
        "jp": "コンサート",
        "reading": "konsaato",
        "id": "Konser"
      },
      {
        "jp": "カラオケ",
        "reading": "karaoke",
        "id": "Karaoke"
      },
      {
        "jp": "かぶき (歌舞伎)",
        "reading": "kabuki",
        "id": "Kabuki (drama tradisional Jepang)",
        "kanji": "歌舞伎"
      },
      {
        "jp": "え (絵)",
        "reading": "e",
        "id": "Gambar",
        "kanji": "絵"
      },
      {
        "jp": "ひらがな",
        "reading": "hiragana",
        "id": "Hiragana"
      },
      {
        "jp": "かたかな",
        "reading": "katakana",
        "id": "Katakana"
      },
      {
        "jp": "ローマじ",
        "reading": "roomaji",
        "id": "Huruf latin"
      },
      {
        "jp": "こまかいおかね (細かいお金)",
        "reading": "komakaiokane",
        "id": "Uang kecil, receh",
        "kanji": "細かいお金"
      },
      {
        "jp": "チケット",
        "reading": "chiketto",
        "id": "Tiket"
      },
      {
        "jp": "アルバイト",
        "reading": "arubaito",
        "id": "Kerja paruh waktu"
      },
      {
        "jp": "ごしゅじん (ご主人)",
        "reading": "goshujin",
        "id": "Suami orang lain",
        "kanji": "ご主人"
      },
      {
        "jp": "おっと／しゅじん (夫／主人)",
        "reading": "otto/shujin",
        "id": "Suami",
        "kanji": "夫／主人"
      },
      {
        "jp": "おくさん (奥さん)",
        "reading": "okusan",
        "id": "Istri orang lain",
        "kanji": "奥さん"
      },
      {
        "jp": "つま／かない (妻／家内)",
        "reading": "tsuma/kanai",
        "id": "Istri",
        "kanji": "妻／家内"
      },
      {
        "jp": "こども (子供)",
        "reading": "kodomo",
        "id": "Anak",
        "kanji": "子供"
      },
      {
        "jp": "はやく (早く／速く)",
        "reading": "hayaku",
        "id": "Dengan Cepat",
        "kanji": "早く／速く"
      },
      {
        "jp": "～から",
        "reading": "~kara",
        "id": "Karena"
      },
      {
        "jp": "どうして",
        "reading": "doushite",
        "id": "Kenapa"
      },
      {
        "jp": "かしてください (貸してください)",
        "reading": "kashitekudasai",
        "id": "Tolong pinjamkan",
        "kanji": "貸してください"
      },
      {
        "jp": "いいですよ",
        "reading": "iidesuyo",
        "id": "Boleh"
      },
      {
        "jp": "ざんねんです (残念です)",
        "reading": "zannendesu",
        "id": "Sayang sekali",
        "kanji": "残念です"
      },
      {
        "jp": "いっしょにいかがですか",
        "reading": "isshoniikagadesuka",
        "id": "Bagaimana kalau bersama-sama"
      },
      {
        "jp": "～ちょっと。。。。",
        "reading": "~chotto。。。。",
        "id": "Maaf, saya tidak bisa"
      },
      {
        "jp": "だめですか",
        "reading": "damedesuka",
        "id": "Tidak bisa ya / tidak boleh ya"
      },
      {
        "jp": "またこんどおねがいします (また今度お願いします)",
        "reading": "matakondoonegaishimasu",
        "id": "Maaf lain kali saja",
        "kanji": "また今度お願いします"
      },
      {
        "jp": "ポップス",
        "reading": "poppusu",
        "id": "Pop"
      },
      {
        "jp": "ロック",
        "reading": "rokku",
        "id": "Rock"
      },
      {
        "jp": "ラテン",
        "reading": "raten",
        "id": "Musik latin"
      },
      {
        "jp": "みんよう (民謡)",
        "reading": "minyou",
        "id": "Musik rakyat / nyanyian daerah",
        "kanji": "民謡"
      },
      {
        "jp": "えんか (演歌)",
        "reading": "enka",
        "id": "Lagu tradisional Jepang populer",
        "kanji": "演歌"
      },
      {
        "jp": "ミュージカル",
        "reading": "myuujikaru",
        "id": "Drama musikal"
      },
      {
        "jp": "オペラ",
        "reading": "opera",
        "id": "Opera"
      },
      {
        "jp": "ホラー",
        "reading": "horaa",
        "id": "Film horor"
      },
      {
        "jp": "アニメ",
        "reading": "anime",
        "id": "Film kartun , animasi"
      },
      {
        "jp": "ドキュメンタリー",
        "reading": "dokyumentarii",
        "id": "Film dokumentasi"
      },
      {
        "jp": "れんあい (恋愛)",
        "reading": "renai",
        "id": "Film percintaan",
        "kanji": "恋愛"
      },
      {
        "jp": "ミステリー",
        "reading": "misuterii",
        "id": "Film misteri"
      },
      {
        "jp": "ぶんげい (文芸)",
        "reading": "bungei",
        "id": "Film kesusastraan",
        "kanji": "文芸"
      },
      {
        "jp": "せんそう (戦争)",
        "reading": "sensou",
        "id": "Film peperangan",
        "kanji": "戦争"
      },
      {
        "jp": "アクション",
        "reading": "akushon",
        "id": "Film action"
      },
      {
        "jp": "きげき (喜劇)",
        "reading": "kigeki",
        "id": "Film komedi",
        "kanji": "喜劇"
      },
      {
        "jp": "ソフトボール",
        "reading": "sofutobooru",
        "id": "Softball"
      },
      {
        "jp": "サッカー",
        "reading": "sakkaa",
        "id": "Sepak bola"
      },
      {
        "jp": "ラグビー",
        "reading": "ragubii",
        "id": "Rugby"
      },
      {
        "jp": "バレーボール",
        "reading": "bareebooru",
        "id": "Voli"
      },
      {
        "jp": "テニス",
        "reading": "tenisu",
        "id": "Tenis"
      },
      {
        "jp": "ボウリング",
        "reading": "bouringu",
        "id": "Bowling"
      },
      {
        "jp": "スキー",
        "reading": "sukii",
        "id": "Sky"
      },
      {
        "jp": "スケート",
        "reading": "sukeeto",
        "id": "Skate"
      },
      {
        "jp": "たっきゅう／ピンポン (卓球)",
        "reading": "takkyuu/pinpon",
        "id": "Pingpong",
        "kanji": "卓球"
      },
      {
        "jp": "すもう (相撲)",
        "reading": "sumou",
        "id": "Sumo",
        "kanji": "相撲"
      },
      {
        "jp": "じゅうどう (柔道)",
        "reading": "juudou",
        "id": "Judo",
        "kanji": "柔道"
      },
      {
        "jp": "けんどう (剣道)",
        "reading": "kendou",
        "id": "Kendo",
        "kanji": "剣道"
      },
      {
        "jp": "すいえい (水泳)",
        "reading": "suiei",
        "id": "Renang",
        "kanji": "水泳"
      }
    ]
  },
  {
    "chapter": 10,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 10: Keberadaan Benda & Makhluk Hidup (あります・います)",
    "theme": "Keberadaan Benda Mati (Arimasu), Makhluk Hidup (Imasu), dan Posisi Ruang",
    "summary": "Membedakan kata kerja keberadaan: arimasu untuk tanaman/benda mati, dan imasu untuk manusia/hewan, serta kata penunjuk posisi (ue, shita, mae, ushiro, tonari, naka).",
    "grammarPatterns": [
      {
        "id": "m10-1",
        "pattern": "Tempat に KB が あります / います",
        "formula": "Tempat [ni] Benda [ga arimasu] / Orang/Hewan [ga imasu]",
        "explanation": "Menyatakan keberadaan benda atau makhluk hidup di lokasi tertentu.",
        "examples": [
          {
            "jp": "部屋に 机が あります。",
            "reading": "Heya ni tsukue ga arimasu.",
            "id": "Di dalam kamar ada meja."
          },
          {
            "jp": "公園に 犬が います。",
            "reading": "Kouen ni inu ga imasu.",
            "id": "Di taman ada anjing."
          }
        ]
      },
      {
        "id": "m10-2",
        "pattern": "KB1 の [Posisi] に KB2 が あります / います",
        "formula": "KB1 [no] ue / shita / mae / ushiro / naka / tonari [ni] KB2 [ga arimasu]",
        "explanation": "Menyatakan letak spesifik suatu benda relatif terhadap benda lain.",
        "examples": [
          {
            "jp": "机の 上に 本が あります。",
            "reading": "Tsukue no ue ni hon ga arimasu.",
            "id": "Di atas meja ada buku."
          },
          {
            "jp": "駅の 前に ポストが あります。",
            "reading": "Eki no mae ni posuto ga arimasu.",
            "id": "Di depan stasiun ada kotak pos."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "あります",
        "reading": "arimasu",
        "id": "Ada (benda mati/tumbuhan) / Ada (benda mati)"
      },
      {
        "jp": "います",
        "reading": "imasu",
        "id": "Ada (makhluk hidup: orang/hewan) / Ada (benda hidup)"
      },
      {
        "jp": "いろいろ [な]",
        "reading": "iroiro [na]",
        "id": "Bermacam-macam"
      },
      {
        "jp": "おとこのひと (男の人)",
        "reading": "otoko no hito",
        "id": "Laki-laki dewasa / Orang laki-laki",
        "kanji": "男の人"
      },
      {
        "jp": "おんなのひと (女の人)",
        "reading": "onna no hito",
        "id": "Perempuan dewasa / Orang perempuan",
        "kanji": "女の人"
      },
      {
        "jp": "おとこのこ (男の子)",
        "reading": "otoko no ko",
        "id": "Anak laki-laki",
        "kanji": "男の子"
      },
      {
        "jp": "おんなのこ (女の子)",
        "reading": "onna no ko",
        "id": "Anak perempuan",
        "kanji": "女の子"
      },
      {
        "jp": "いぬ (犬)",
        "reading": "inu",
        "id": "Anjing",
        "kanji": "犬"
      },
      {
        "jp": "ねこ (猫)",
        "reading": "neko",
        "id": "Kucing",
        "kanji": "猫"
      },
      {
        "jp": "き (木)",
        "reading": "ki",
        "id": "Pohon",
        "kanji": "木"
      },
      {
        "jp": "もの (物)",
        "reading": "mono",
        "id": "Barang",
        "kanji": "物"
      },
      {
        "jp": "うえ (上)",
        "reading": "ue",
        "id": "Atas",
        "kanji": "上"
      },
      {
        "jp": "した (下)",
        "reading": "shita",
        "id": "Bawah",
        "kanji": "下"
      },
      {
        "jp": "まえ (前)",
        "reading": "mae",
        "id": "Depan",
        "kanji": "前"
      },
      {
        "jp": "うしろ (後ろ)",
        "reading": "ushiro",
        "id": "Belakang",
        "kanji": "後ろ"
      },
      {
        "jp": "みぎ (右)",
        "reading": "migi",
        "id": "Kanan",
        "kanji": "右"
      },
      {
        "jp": "ひだり (左)",
        "reading": "hidari",
        "id": "Kiri",
        "kanji": "左"
      },
      {
        "jp": "なか (中)",
        "reading": "naka",
        "id": "Dalam",
        "kanji": "中"
      },
      {
        "jp": "そと (外)",
        "reading": "soto",
        "id": "Luar",
        "kanji": "外"
      },
      {
        "jp": "となり (隣)",
        "reading": "tonari",
        "id": "Sebelah / tetangga / Samping / sebelah",
        "kanji": "隣"
      },
      {
        "jp": "ちかく (近く)",
        "reading": "chikaku",
        "id": "Dekat",
        "kanji": "近く"
      },
      {
        "jp": "あいだ (間)",
        "reading": "aida",
        "id": "Antara",
        "kanji": "間"
      },
      {
        "jp": "いろいろ（な）",
        "reading": "iroiro (na)",
        "id": "Berbagai / macam-macam"
      },
      {
        "jp": "パンダ",
        "reading": "panda",
        "id": "Panda"
      },
      {
        "jp": "ぞう (像)",
        "reading": "zou",
        "id": "Gajah",
        "kanji": "像"
      },
      {
        "jp": "でんち (電池)",
        "reading": "denchi",
        "id": "Baterai",
        "kanji": "電池"
      },
      {
        "jp": "はこ (箱)",
        "reading": "hako",
        "id": "Kotak",
        "kanji": "箱"
      },
      {
        "jp": "スイッチ",
        "reading": "suitchi",
        "id": "Saklar"
      },
      {
        "jp": "れいぞうこ (冷蔵庫)",
        "reading": "reizouko",
        "id": "Kulkas",
        "kanji": "冷蔵庫"
      },
      {
        "jp": "テーブル",
        "reading": "teeburu",
        "id": "Meja makan"
      },
      {
        "jp": "ベッド",
        "reading": "beddo",
        "id": "Tempat tidur"
      },
      {
        "jp": "たな (棚)",
        "reading": "tana",
        "id": "Lemari",
        "kanji": "棚"
      },
      {
        "jp": "ドア",
        "reading": "doa",
        "id": "Pintu"
      },
      {
        "jp": "まど (窓)",
        "reading": "mado",
        "id": "Jendela",
        "kanji": "窓"
      },
      {
        "jp": "ポスト",
        "reading": "posuto",
        "id": "Kotak surat"
      },
      {
        "jp": "ビル",
        "reading": "biru",
        "id": "Gedung"
      },
      {
        "jp": "ＡＴＭ",
        "reading": "ＡＴＭ",
        "id": "Atm"
      },
      {
        "jp": "コンビニ",
        "reading": "konbini",
        "id": "Toko 24 jam"
      },
      {
        "jp": "こうえん (公園)",
        "reading": "kouen",
        "id": "Taman",
        "kanji": "公園"
      },
      {
        "jp": "きっさてん (喫茶店)",
        "reading": "kissaten",
        "id": "Coffe shop / cafe",
        "kanji": "喫茶店"
      },
      {
        "jp": "～や (～屋)",
        "reading": "~ya",
        "id": "Toko ~",
        "kanji": "～屋"
      },
      {
        "jp": "のりば (乗り場)",
        "reading": "noriba",
        "id": "Tempat naik",
        "kanji": "乗り場"
      },
      {
        "jp": "けん (県)",
        "reading": "ken",
        "id": "Prefektur",
        "kanji": "県"
      },
      {
        "jp": "どうもすみません",
        "reading": "doumosumimasen",
        "id": "Maaf / terima kasih banyak"
      },
      {
        "jp": "ナンプラー",
        "reading": "nanpuraa",
        "id": "Kecap ikan"
      },
      {
        "jp": "コーナー",
        "reading": "koonaa",
        "id": "Tempat / bagian penjualan"
      },
      {
        "jp": "いちばんした (一番下)",
        "reading": "ichibanshita",
        "id": "Paling bawah",
        "kanji": "一番下"
      },
      {
        "jp": "げんかん (玄関)",
        "reading": "genkan",
        "id": "Pintu masuk",
        "kanji": "玄関"
      },
      {
        "jp": "ふろば (風呂場)",
        "reading": "furoba",
        "id": "Kamar mandi",
        "kanji": "風呂場"
      },
      {
        "jp": "せんめんじょ (洗面所)",
        "reading": "senmenjo",
        "id": "Tempat cuci tangan",
        "kanji": "洗面所"
      },
      {
        "jp": "だいどころ (台所)",
        "reading": "daidokoro",
        "id": "Dapur",
        "kanji": "台所"
      },
      {
        "jp": "しょくどう (食堂)",
        "reading": "shokudou",
        "id": "Kantin / ruang makan",
        "kanji": "食堂"
      },
      {
        "jp": "いま (居間)",
        "reading": "ima",
        "id": "Ruang tamu",
        "kanji": "居間"
      },
      {
        "jp": "しんしつ (寝室)",
        "reading": "shinshitsu",
        "id": "Kamar tidur",
        "kanji": "寝室"
      },
      {
        "jp": "ろうか (廊下)",
        "reading": "rouka",
        "id": "Koridor",
        "kanji": "廊下"
      },
      {
        "jp": "ベランダ",
        "reading": "beranda",
        "id": "teras"
      }
    ]
  },
  {
    "chapter": 11,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 11: Satuan Hitungan & Durasi (〜枚・〜台・〜時間)",
    "theme": "Kata Bantu Bilangan, Menghitung Jumlah Benda, Jangka Waktu, dan Frekuensi",
    "summary": "Penggunaan hitungan dasar (hitotsu, futatsu), kata bantu bilangan khusus (~mai, ~dai, ~nin), durasi jam/minggu/bulan/tahun, dan partikel ni untuk frekuensi.",
    "grammarPatterns": [
      {
        "id": "m11-1",
        "pattern": "KB を [Satuan Hitung] Kata Kerja",
        "formula": "KB [o] [Jumlah / Satuan] KK",
        "explanation": "Kata bantu bilangan umumnya diletakkan langsung sebelum kata kerja tanpa partikel tambahan.",
        "examples": [
          {
            "jp": "りんごを ３つ 買いました。",
            "reading": "Ringo o mittsu kaimashita.",
            "id": "Membeli 3 buah apel."
          },
          {
            "jp": "切手を ２枚 貼りました。",
            "reading": "Kitte o ni-mai harimashita.",
            "id": "Menempelkan 2 lembar perangko."
          }
        ]
      },
      {
        "id": "m11-2",
        "pattern": "Periode に [Frekuensi] 回 (Frekuensi Kegiatan)",
        "formula": "Periode [ni] Frekuensi [kai]",
        "explanation": "Menyatakan berapa kali suatu kegiatan dilakukan dalam jangka waktu tertentu.",
        "examples": [
          {
            "jp": "１か月に ２回 映画を 見ます。",
            "reading": "Ikkagetsu ni ni-kai eiga o mimasu.",
            "id": "Menonton film 2 kali dalam 1 bulan."
          }
        ]
      },
      {
        "id": "m11-3",
        "pattern": "Durasi Waktu + かかります (Kakarimasu)",
        "formula": "Tempat 1 kara Tempat 2 made [Durasi] kakarimasu",
        "explanation": "Menyatakan lamanya waktu atau besarnya biaya yang dihabiskan.",
        "examples": [
          {
            "jp": "東京から 大阪まで 新幹線で ２時間半 かかります。",
            "reading": "Toukyou kara Oosaka made shinkansen de ni-jikan han kakarimasu.",
            "id": "Dari Tokyo sampai Osaka memakan waktu 2,5 jam dengan Shinkansen."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "ひとつ (１つ)",
        "reading": "hitotsu",
        "id": "1 buah (umum)"
      },
      {
        "jp": "ふたつ (２つ)",
        "reading": "futatsu",
        "id": "2 buah"
      },
      {
        "jp": "みっつ (３つ)",
        "reading": "mittsu",
        "id": "3 buah"
      },
      {
        "jp": "よっつ (４つ)",
        "reading": "yottsu",
        "id": "4 buah"
      },
      {
        "jp": "いつつ (５つ)",
        "reading": "itsutsu",
        "id": "5 buah"
      },
      {
        "jp": "むっつ (６つ)",
        "reading": "muttsu",
        "id": "6 buah"
      },
      {
        "jp": "ななつ (７つ)",
        "reading": "nanatsu",
        "id": "7 buah"
      },
      {
        "jp": "やっつ (８つ)",
        "reading": "yattsu",
        "id": "8 buah"
      },
      {
        "jp": "ここのつ (９つ)",
        "reading": "kokonotsu",
        "id": "9 buah"
      },
      {
        "jp": "とお (１０)",
        "reading": "too",
        "id": "10 buah"
      },
      {
        "jp": "いくつ",
        "reading": "ikutsu",
        "id": "Berapa buah"
      },
      {
        "jp": "〜にん (人)",
        "reading": "~nin",
        "id": "... orang",
        "kanji": "人"
      },
      {
        "jp": "〜だい (台)",
        "reading": "~dai",
        "id": "... unit (mesin/kendaraan)",
        "kanji": "台"
      },
      {
        "jp": "〜まい (枚)",
        "reading": "~mai",
        "id": "... lembar (benda tipis/datar)",
        "kanji": "枚"
      },
      {
        "jp": "〜かい (回)",
        "reading": "~kai",
        "id": "... kali (frekuensi)",
        "kanji": "回"
      },
      {
        "jp": "りんご",
        "reading": "ringo",
        "id": "Apel"
      },
      {
        "jp": "みかん",
        "reading": "mikan",
        "id": "Jeruk"
      },
      {
        "jp": "きって (切手)",
        "reading": "kitte",
        "id": "Perangko",
        "kanji": "切手"
      },
      {
        "jp": "はがき",
        "reading": "hagaki",
        "id": "Kartu pos"
      },
      {
        "jp": "ふうとう (封筒)",
        "reading": "fuutou",
        "id": "Amplop",
        "kanji": "封筒"
      },
      {
        "jp": "どのくらい",
        "reading": "dono kurai",
        "id": "Berapa lama / kira-kira seberapa / Berapa lama ?"
      },
      {
        "jp": "います",
        "reading": "imasu",
        "id": "Ada / mempunyai"
      },
      {
        "jp": "かかります",
        "reading": "kakarimasu",
        "id": "Memerlukan waktu"
      },
      {
        "jp": "やすみます（を） (休みます)",
        "reading": "yasumimasu (o)",
        "id": "Tidak masuk kerja / libur",
        "kanji": "休みます"
      },
      {
        "jp": "ひとり",
        "reading": "hitori",
        "id": "1 orang"
      },
      {
        "jp": "ふたり",
        "reading": "futari",
        "id": "2 orang"
      },
      {
        "jp": "～にん (～人)",
        "reading": "~nin",
        "id": "~ orang",
        "kanji": "～人"
      },
      {
        "jp": "～だい (～台)",
        "reading": "~dai",
        "id": "~ unit",
        "kanji": "～台"
      },
      {
        "jp": "～まい (～枚)",
        "reading": "~mai",
        "id": "~ lembar",
        "kanji": "～枚"
      },
      {
        "jp": "～かい (～回)",
        "reading": "~kai",
        "id": "~ kali",
        "kanji": "～回"
      },
      {
        "jp": "サンドイッチ",
        "reading": "sandoitchi",
        "id": "Sandwich"
      },
      {
        "jp": "カレー",
        "reading": "karee",
        "id": "Kare"
      },
      {
        "jp": "アイスクリーム",
        "reading": "aisukuriiム",
        "id": "Es krim"
      },
      {
        "jp": "がいこく (外国)",
        "reading": "gaikoku",
        "id": "Luar negeri",
        "kanji": "外国"
      },
      {
        "jp": "りゅうがくせい (留学生)",
        "reading": "ryuugakusei",
        "id": "Pelajar asing",
        "kanji": "留学生"
      },
      {
        "jp": "クラス",
        "reading": "kurasu",
        "id": "Kelas"
      },
      {
        "jp": "～じかん (～時間)",
        "reading": "~jikan",
        "id": "~ jam",
        "kanji": "～時間"
      },
      {
        "jp": "～しゅうかん (～週間)",
        "reading": "~shuukan",
        "id": "~ minggu",
        "kanji": "～週間"
      },
      {
        "jp": "～かげつ (～か月)",
        "reading": "~kagetsu",
        "id": "~ bulan",
        "kanji": "～か月"
      },
      {
        "jp": "～ねん (～年)",
        "reading": "~nen",
        "id": "~ tahun",
        "kanji": "～年"
      },
      {
        "jp": "～ぐらい",
        "reading": "~gurai",
        "id": "Kira-kira ~"
      },
      {
        "jp": "ぜんぶで (全部で)",
        "reading": "zenbude",
        "id": "Semuanya",
        "kanji": "全部で"
      },
      {
        "jp": "みんな",
        "reading": "minna",
        "id": "Semua"
      },
      {
        "jp": "～だけ",
        "reading": "~dake",
        "id": "Hanya ~"
      },
      {
        "jp": "かしこまりました",
        "reading": "kashikomarimashita",
        "id": "Baik / mengerti"
      },
      {
        "jp": "いいてんきですね (いい天気ですね)",
        "reading": "iitenkidesune",
        "id": "Cuacanya bagus ya...",
        "kanji": "いい天気ですね"
      },
      {
        "jp": "おでかけですか (お出かけですか)",
        "reading": "odekakedesuka",
        "id": "Mau keluar ?",
        "kanji": "お出かけですか"
      },
      {
        "jp": "いってらっしゃい (行ってらっしゃい)",
        "reading": "itterasshai",
        "id": "Hati-hati (berangkatnya)",
        "kanji": "行ってらっしゃい"
      },
      {
        "jp": "いってきます (行ってきます)",
        "reading": "ittekimasu",
        "id": "Saya berangkat",
        "kanji": "行ってきます"
      },
      {
        "jp": "ふなびん (船便)",
        "reading": "funabin",
        "id": "Pos laut",
        "kanji": "船便"
      },
      {
        "jp": "こうくうびん (航空便)",
        "reading": "koukuubin",
        "id": "Pos udara",
        "kanji": "航空便"
      },
      {
        "jp": "エアメール",
        "reading": "eameeru",
        "id": "Pos udara"
      },
      {
        "jp": "オーストラリア",
        "reading": "oosutoraria",
        "id": "Australia"
      },
      {
        "jp": "ていしょく (定食)",
        "reading": "teishoku",
        "id": "Makanan paket",
        "kanji": "定食"
      },
      {
        "jp": "ランチ",
        "reading": "ranchi",
        "id": "Makan siang"
      },
      {
        "jp": "てんどん (天どん)",
        "reading": "tendon",
        "id": "Semangkuk Nasi dan tempura",
        "kanji": "天どん"
      },
      {
        "jp": "おやこどん",
        "reading": "oyakodon",
        "id": "Semangkuk Nasi, daging ayam dan telur"
      },
      {
        "jp": "ぎゅうどん (牛どん)",
        "reading": "gyuudon",
        "id": "Semangkuk nasi dan daging sapi",
        "kanji": "牛どん"
      },
      {
        "jp": "やきにく (焼肉)",
        "reading": "yakiniku",
        "id": "Daging panggang",
        "kanji": "焼肉"
      },
      {
        "jp": "やさいため (野菜ため)",
        "reading": "yasaitame",
        "id": "Sayur goreng",
        "kanji": "野菜ため"
      },
      {
        "jp": "つけもの (漬物)",
        "reading": "tsukemono",
        "id": "Asinan",
        "kanji": "漬物"
      },
      {
        "jp": "みそしる (みそ汁)",
        "reading": "misoshiru",
        "id": "Sup miso",
        "kanji": "みそ汁"
      },
      {
        "jp": "おにぎり",
        "reading": "onigiri",
        "id": "Nasi kepal"
      },
      {
        "jp": "てんぷら",
        "reading": "tenpura",
        "id": "Tempura"
      },
      {
        "jp": "すし",
        "reading": "sushi",
        "id": "Nasi dicampur cuka dan diberi ikan mentah"
      },
      {
        "jp": "うどん",
        "reading": "udon",
        "id": "Mie Jepang ukuran besar"
      },
      {
        "jp": "そば",
        "reading": "soba",
        "id": "Mie Jepang warna abu-abu"
      },
      {
        "jp": "ラーメン",
        "reading": "raamen",
        "id": "Mie Jepang ukuran biasa"
      },
      {
        "jp": "やきそば (焼きそば)",
        "reading": "yakisoba",
        "id": "Mie goreng Jepang",
        "kanji": "焼きそば"
      },
      {
        "jp": "おこのみやき (お好み焼き)",
        "reading": "okonomiyaki",
        "id": "Gorengan dicampur daging di loyang",
        "kanji": "お好み焼き"
      },
      {
        "jp": "カレーライス",
        "reading": "kareeraisu",
        "id": "Nasi kare"
      },
      {
        "jp": "ハンバーグ",
        "reading": "hanbaagu",
        "id": "hamburger"
      },
      {
        "jp": "コロッケ",
        "reading": "korokke",
        "id": "Kroket"
      },
      {
        "jp": "えびフライ",
        "reading": "ebifurai",
        "id": "Udang goreng tepung"
      },
      {
        "jp": "フライドチキン",
        "reading": "furaidochikin",
        "id": "Ayam goreng"
      },
      {
        "jp": "サラダ",
        "reading": "sarada",
        "id": "Salad"
      },
      {
        "jp": "スープ",
        "reading": "suupu",
        "id": "Sup"
      },
      {
        "jp": "スパゲッティ",
        "reading": "supagetti",
        "id": "Spageti"
      },
      {
        "jp": "ピザ",
        "reading": "piza",
        "id": "Pizza"
      },
      {
        "jp": "トースト",
        "reading": "toosuto",
        "id": "Roti panggang"
      },
      {
        "jp": "コーヒー",
        "reading": "koohii",
        "id": "Kopi"
      },
      {
        "jp": "こうちゃ (紅茶)",
        "reading": "koucha",
        "id": "Teh",
        "kanji": "紅茶"
      },
      {
        "jp": "ココア",
        "reading": "kokoa",
        "id": "Minuman coklat"
      },
      {
        "jp": "ジュース",
        "reading": "juusu",
        "id": "Jus"
      },
      {
        "jp": "コーラ",
        "reading": "koora",
        "id": "Coca cola"
      }
    ]
  },
  {
    "chapter": 12,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 12: Kalimat Lampau Kata Sifat & Perbandingan (より・一番)",
    "theme": "Kondisi Lampau Kata Sifat/Benda, Komparasi 2 Hal, dan Superlatif (Paling)",
    "summary": "Bentuk lampau kata sifat (katta / deshita), membandingkan dua benda dengan yori (daripada), dan menyatakan hal yang paling unggul dengan ichiban.",
    "grammarPatterns": [
      {
        "id": "m12-1",
        "pattern": "Bentuk Lampau Kata Sifat & Kata Benda",
        "formula": "I-Keiyoushi: ~katta desu / Na-Keiyoushi: ~deshita",
        "explanation": "Menyatakan kondisi atau sifat pada masa lampau.",
        "examples": [
          {
            "jp": "昨日は 寒かったです。",
            "reading": "Kinou wa samukatta desu.",
            "id": "Kemarin dingin."
          },
          {
            "jp": "旅行は 楽しかったです。",
            "reading": "Ryokou wa tanoshikatta desu.",
            "id": "Perjalanan wisatanya menyenangkan."
          },
          {
            "jp": "昨日は 雨でした。",
            "reading": "Kinou wa ame deshita.",
            "id": "Kemarin hujan."
          }
        ]
      },
      {
        "id": "m12-2",
        "pattern": "KB1 は KB2 より [Kata Sifat] です (Komparatif)",
        "formula": "KB1 [wa] KB2 [yori] Sifat [desu]",
        "explanation": "KB1 lebih bersifat daripada KB2.",
        "examples": [
          {
            "jp": "新幹線は 飛行機より 安いです。",
            "reading": "Shinkansen wa hikouki yori yasui desu.",
            "id": "Shinkansen lebih murah daripada pesawat."
          }
        ]
      },
      {
        "id": "m12-3",
        "pattern": "Kategori の中で [Kata Tanya] が 一番 [Sifat] ですか (Superlatif)",
        "formula": "Kategori [no naka de] nani/doko/dare [ga ichiban] Sifat [desu ka]",
        "explanation": "Menanyakan atau menyatakan hal yang paling nomor satu dalam suatu kelompok.",
        "examples": [
          {
            "jp": "１年で いつが 一番 寒いですか。２月が 一番 寒いです。",
            "reading": "Ichi-nen de itsu ga ichiban samui desu ka. Ni-gatsu ga ichiban samui desu.",
            "id": "Dalam setahun kapan yang paling dingin? Bulan Februari yang paling dingin."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "かんたん [な] (簡単)",
        "reading": "kantan [na]",
        "id": "Mudah / sederhana",
        "kanji": "簡単"
      },
      {
        "jp": "ちかい (近い)",
        "reading": "chikai",
        "id": "Dekat",
        "kanji": "近い"
      },
      {
        "jp": "とおい (遠い)",
        "reading": "tooi",
        "id": "Jauh",
        "kanji": "遠い"
      },
      {
        "jp": "はやい (早い / 速い)",
        "reading": "hayai",
        "id": "Cepat / pagi",
        "kanji": "早い / 速い"
      },
      {
        "jp": "おそい (遅い)",
        "reading": "osoi",
        "id": "Lambat / larut",
        "kanji": "遅い"
      },
      {
        "jp": "おおい (多い)",
        "reading": "ooi",
        "id": "Banyak (orang/benda)",
        "kanji": "多い"
      },
      {
        "jp": "すくない (少ない)",
        "reading": "sukunai",
        "id": "Sedikit",
        "kanji": "少ない"
      },
      {
        "jp": "あたたかい (暖かい / 温かい)",
        "reading": "atatakai",
        "id": "Hangat",
        "kanji": "暖かい / 温かい"
      },
      {
        "jp": "すずしい (涼しい)",
        "reading": "suzushii",
        "id": "Sejuk",
        "kanji": "涼しい"
      },
      {
        "jp": "あまい (甘い)",
        "reading": "amai",
        "id": "Manis",
        "kanji": "甘い"
      },
      {
        "jp": "からい (辛い)",
        "reading": "karai",
        "id": "Pedas",
        "kanji": "辛い"
      },
      {
        "jp": "おもい (重い)",
        "reading": "omoi",
        "id": "Berat",
        "kanji": "重い"
      },
      {
        "jp": "かるい (軽い)",
        "reading": "karui",
        "id": "Ringan",
        "kanji": "軽い"
      },
      {
        "jp": "きせつ (季節)",
        "reading": "kisetsu",
        "id": "Musim",
        "kanji": "季節"
      },
      {
        "jp": "はる (春)",
        "reading": "haru",
        "id": "Musim semi",
        "kanji": "春"
      },
      {
        "jp": "なつ (夏)",
        "reading": "natsu",
        "id": "Musim panas",
        "kanji": "夏"
      },
      {
        "jp": "あき (秋)",
        "reading": "aki",
        "id": "Musim gugur",
        "kanji": "秋"
      },
      {
        "jp": "ふゆ (冬)",
        "reading": "fuyu",
        "id": "Musim dingin",
        "kanji": "冬"
      },
      {
        "jp": "てんき (天気)",
        "reading": "tenki",
        "id": "Cuaca",
        "kanji": "天気"
      },
      {
        "jp": "あめ (雨)",
        "reading": "ame",
        "id": "Hujan",
        "kanji": "雨"
      },
      {
        "jp": "ゆき (雪)",
        "reading": "yuki",
        "id": "Salju",
        "kanji": "雪"
      },
      {
        "jp": "かんたん（な） (簡単な)",
        "reading": "kantan (na)",
        "id": "Mudah, gampang",
        "kanji": "簡単な"
      },
      {
        "jp": "はやい (早い，速い)",
        "reading": "hayai",
        "id": "Cepat",
        "kanji": "早い，速い"
      },
      {
        "jp": "あたたかい (暖かい、温かい)",
        "reading": "atatakai",
        "id": "Hangat",
        "kanji": "暖かい、温かい"
      },
      {
        "jp": "いい",
        "reading": "ii",
        "id": "Lebih baik"
      },
      {
        "jp": "くもり (曇り)",
        "reading": "kumori",
        "id": "Mendung",
        "kanji": "曇り"
      },
      {
        "jp": "ホテル",
        "reading": "hoteru",
        "id": "Hotel"
      },
      {
        "jp": "くうこう (空港)",
        "reading": "kuukou",
        "id": "Bandara",
        "kanji": "空港"
      },
      {
        "jp": "うみ (海)",
        "reading": "umi",
        "id": "Laut",
        "kanji": "海"
      },
      {
        "jp": "せかい (世界)",
        "reading": "sekai",
        "id": "Dunia",
        "kanji": "世界"
      },
      {
        "jp": "パーティー",
        "reading": "paatii",
        "id": "Pesta"
      },
      {
        "jp": "まつり (祭り)",
        "reading": "matsuri",
        "id": "Perayaan",
        "kanji": "祭り"
      },
      {
        "jp": "レモン",
        "reading": "remon",
        "id": "Lemon"
      },
      {
        "jp": "いけばな (生け花)",
        "reading": "ikebana",
        "id": "Seni merangkai bunga",
        "kanji": "生け花"
      },
      {
        "jp": "もみじ (紅葉)",
        "reading": "momiji",
        "id": "Maple",
        "kanji": "紅葉"
      },
      {
        "jp": "どちら",
        "reading": "dochira",
        "id": "Yang mana"
      },
      {
        "jp": "どちらも",
        "reading": "dochiramo",
        "id": "Dua-duanya / yang mana saja"
      },
      {
        "jp": "いちばん",
        "reading": "ichiban",
        "id": "Yang paling"
      },
      {
        "jp": "ずっと",
        "reading": "zutto",
        "id": "Selamanya"
      },
      {
        "jp": "はじめて (初めて)",
        "reading": "hajimete",
        "id": "Pertama kali",
        "kanji": "初めて"
      },
      {
        "jp": "ただいま",
        "reading": "tadaima",
        "id": "Saya pulang / saya kembali"
      },
      {
        "jp": "おかえりなさい (お帰りなさい)",
        "reading": "okaerinasai",
        "id": "Sudah pulang ya...",
        "kanji": "お帰りなさい"
      },
      {
        "jp": "わあ、すごいひとですね",
        "reading": "waa, sugoihitodesune",
        "id": "Wah...banyak orang"
      },
      {
        "jp": "つかれました (疲れました)",
        "reading": "tsukaremashita",
        "id": "Capek / lelah",
        "kanji": "疲れました"
      },
      {
        "jp": "ホンコン",
        "reading": "honkon",
        "id": "Hongkong"
      },
      {
        "jp": "シンガポール",
        "reading": "shingapooru",
        "id": "Singapura"
      },
      {
        "jp": "めいしょ (名所)",
        "reading": "meisho",
        "id": "Tempat terkenal",
        "kanji": "名所"
      }
    ]
  },
  {
    "chapter": 13,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 13: Keinginan & Tujuan Gerak (〜が欲しい・〜たい・〜に行く)",
    "theme": "Menginginkan Benda (Hoshii), Ingin Berbuat (KK-tai), dan Pergi demi Suatu Tujuan",
    "summary": "Pola menyatakan keinginan memiliki benda (~ga hoshii), keinginan beraktivitas (kata kerja bentuk stem + tai), dan pola pergi/datang untuk melakukan sesuatu (~ni ikimasu).",
    "grammarPatterns": [
      {
        "id": "m13-1",
        "pattern": "KB が 欲しいです (~ ga hoshii desu)",
        "formula": "KB [ga] hoshii desu",
        "explanation": "Menyatakan keinginan pembicara untuk memiliki suatu benda.",
        "examples": [
          {
            "jp": "わたしは 新しい 車が 欲しいです。",
            "reading": "Watashi wa atarashii kuruma ga hoshii desu.",
            "id": "Saya ingin mobil baru."
          }
        ]
      },
      {
        "id": "m13-2",
        "pattern": "KK Stem + たいです (~ tai desu)",
        "formula": "KK (Stem bentuk masu) + [tai desu]",
        "explanation": "Menyatakan keinginan diri sendiri untuk melakukan suatu tindakan.",
        "examples": [
          {
            "jp": "日本へ 行きたいです。",
            "reading": "Nihon e ikitai desu.",
            "id": "Saya ingin pergi ke Jepang."
          },
          {
            "jp": "寿司を（が）食べたいです。",
            "reading": "Sushi o (ga) tabetai desu.",
            "id": "Saya ingin makan sushi."
          }
        ]
      },
      {
        "id": "m13-3",
        "pattern": "Tempat へ [KK Stem / KB] に 行きます / 来ます (Tujuan Gerak)",
        "formula": "Tempat [e] KK Stem / KB [ni] ikimasu/kimasu",
        "explanation": "Menyatakan tujuan dari kegiatan perpindahan tempat (\"pergi untuk...\").",
        "examples": [
          {
            "jp": "デパートへ 買い物に 行きます。",
            "reading": "Depaato e kaimono ni ikimasu.",
            "id": "Pergi ke department store untuk berbelanja."
          },
          {
            "jp": "図書館へ 本を 借りに 行きます。",
            "reading": "Toshokan e hon o kari ni ikimasu.",
            "id": "Pergi ke perpustakaan untuk meminjam buku."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "あそびます (遊びます)",
        "reading": "asobimasu",
        "id": "Bermain / bersenang-senang",
        "kanji": "遊びます"
      },
      {
        "jp": "およぎます (泳ぎます)",
        "reading": "oyogimasu",
        "id": "Berenang",
        "kanji": "泳ぎます"
      },
      {
        "jp": "むかえます (迎えます)",
        "reading": "mukaemasu",
        "id": "Menjemput",
        "kanji": "迎えます"
      },
      {
        "jp": "つかれます (疲れます)",
        "reading": "tsukaremasu",
        "id": "Lelah / capek",
        "kanji": "疲れます"
      },
      {
        "jp": "けっこんします (結婚します)",
        "reading": "kekkon shimasu",
        "id": "Menikah",
        "kanji": "結婚します"
      },
      {
        "jp": "かいものします (買い物します)",
        "reading": "kaimono shimasu",
        "id": "Berbelanja",
        "kanji": "買い物します"
      },
      {
        "jp": "しょくじします (食事します)",
        "reading": "shokuji shimasu",
        "id": "Makan (bersantap) / Makan bersama",
        "kanji": "食事します"
      },
      {
        "jp": "さんぽします (散歩します)",
        "reading": "sanpo shimasu",
        "id": "Jalan-jalan santai",
        "kanji": "散歩します"
      },
      {
        "jp": "たいへん [な] (大変)",
        "reading": "taihen [na]",
        "id": "Berat / gawat / susah",
        "kanji": "大変"
      },
      {
        "jp": "ほしい (欲しい)",
        "reading": "hoshii",
        "id": "Ingin (benda)",
        "kanji": "欲しい"
      },
      {
        "jp": "ひろい (広い)",
        "reading": "hiroi",
        "id": "Luas",
        "kanji": "広い"
      },
      {
        "jp": "せまい (狭い)",
        "reading": "semai",
        "id": "Sempit",
        "kanji": "狭い"
      },
      {
        "jp": "プール",
        "reading": "puuru",
        "id": "Kolam renang"
      },
      {
        "jp": "かわ (川)",
        "reading": "kawa",
        "id": "Sungai",
        "kanji": "川"
      },
      {
        "jp": "びじゅつ (美術)",
        "reading": "bijutsu",
        "id": "Seni rupa",
        "kanji": "美術"
      },
      {
        "jp": "つり (釣り)",
        "reading": "tsuri",
        "id": "Memancing",
        "kanji": "釣り"
      },
      {
        "jp": "たいへん（な） (大変な)",
        "reading": "taihen (na)",
        "id": "Susah, berat",
        "kanji": "大変な"
      },
      {
        "jp": "スキー",
        "reading": "sukii",
        "id": "Ski"
      },
      {
        "jp": "しゅうまつ (週末)",
        "reading": "shuumatsu",
        "id": "Akhir pekan",
        "kanji": "週末"
      },
      {
        "jp": "おしょうがつ (お諸王月)",
        "reading": "oshougatsu",
        "id": "Tahun baru",
        "kanji": "お諸王月"
      },
      {
        "jp": "～ごろ",
        "reading": "~goro",
        "id": "Kira-kira , sekitar"
      },
      {
        "jp": "なにか (何か)",
        "reading": "nanika",
        "id": "Sesuatu",
        "kanji": "何か"
      },
      {
        "jp": "どこか",
        "reading": "dokoka",
        "id": "Suatu tempat"
      },
      {
        "jp": "のどがかわきます",
        "reading": "nodogakawakimasu",
        "id": "Haus"
      },
      {
        "jp": "おなかがすきます",
        "reading": "onakagasukimasu",
        "id": "Lapar"
      },
      {
        "jp": "そうしましょう",
        "reading": "soushimashou",
        "id": "Ya ayo"
      },
      {
        "jp": "ごちゅうもんは (ご注文は)",
        "reading": "gochuumonha",
        "id": "Mau pesan apa?",
        "kanji": "ご注文は"
      },
      {
        "jp": "おまちください (お待ちください)",
        "reading": "omachikudasai",
        "id": "Tunggu sebentar",
        "kanji": "お待ちください"
      },
      {
        "jp": "べつべつに (別々に)",
        "reading": "betsubetsuni",
        "id": "Sendiri-sendiri / masing-masing",
        "kanji": "別々に"
      },
      {
        "jp": "はくぶつかん (博物館)",
        "reading": "hakubutsukan",
        "id": "Museum",
        "kanji": "博物館"
      },
      {
        "jp": "びじゅつかん (美術館)",
        "reading": "bijutsukan",
        "id": "Gedung kesenian",
        "kanji": "美術館"
      },
      {
        "jp": "としょかん (図書館)",
        "reading": "toshokan",
        "id": "Perpustakaan",
        "kanji": "図書館"
      },
      {
        "jp": "えいがかん (映画館)",
        "reading": "eigakan",
        "id": "Bioskop",
        "kanji": "映画館"
      },
      {
        "jp": "どうぶつえん (動物園)",
        "reading": "doubutsuen",
        "id": "Kebun binatang",
        "kanji": "動物園"
      },
      {
        "jp": "しょくぶつえん (植物園)",
        "reading": "shokubutsuen",
        "id": "Kebun raya",
        "kanji": "植物園"
      },
      {
        "jp": "おてら (お寺)",
        "reading": "otera",
        "id": "Kuil budha",
        "kanji": "お寺"
      },
      {
        "jp": "じんじゃ (神社)",
        "reading": "jinja",
        "id": "Kuil sinto",
        "kanji": "神社"
      },
      {
        "jp": "きょうかい (協会)",
        "reading": "kyoukai",
        "id": "Gereja",
        "kanji": "協会"
      },
      {
        "jp": "たいしかん (体育館)",
        "reading": "taishikan",
        "id": "Kedutaan besar",
        "kanji": "体育館"
      },
      {
        "jp": "にゅうこくかんりきょく (入国管理局)",
        "reading": "nyuukokukanrikyoku",
        "id": "Kantor imigrasi",
        "kanji": "入国管理局"
      },
      {
        "jp": "しやくしょ (市役所)",
        "reading": "shiyakusho",
        "id": "Kantor balaikota",
        "kanji": "市役所"
      },
      {
        "jp": "こうばん (交番)",
        "reading": "kouban",
        "id": "Pos polisi",
        "kanji": "交番"
      },
      {
        "jp": "ちゅうしゃじょう (駐車場)",
        "reading": "chuushajou",
        "id": "Tempat parkir",
        "kanji": "駐車場"
      },
      {
        "jp": "だいがく (大学)",
        "reading": "daigaku",
        "id": "Universitas",
        "kanji": "大学"
      },
      {
        "jp": "こうこう (高校)",
        "reading": "koukou",
        "id": "Sma",
        "kanji": "高校"
      },
      {
        "jp": "ちゅうがっこう (中学校)",
        "reading": "chuugakkou",
        "id": "Smp",
        "kanji": "中学校"
      },
      {
        "jp": "しょうがっこう (小学校)",
        "reading": "shougakkou",
        "id": "Sd",
        "kanji": "小学校"
      },
      {
        "jp": "ようちえん (幼稚園)",
        "reading": "youchien",
        "id": "Tk",
        "kanji": "幼稚園"
      },
      {
        "jp": "にくや (肉屋)",
        "reading": "nikuya",
        "id": "Toko daging",
        "kanji": "肉屋"
      },
      {
        "jp": "パンや",
        "reading": "panya",
        "id": "Toko roti"
      },
      {
        "jp": "さかなや (魚屋)",
        "reading": "sakanaya",
        "id": "Toko ikan",
        "kanji": "魚屋"
      },
      {
        "jp": "やおや (八百屋)",
        "reading": "yaoya",
        "id": "Toko sayuran",
        "kanji": "八百屋"
      }
    ]
  },
  {
    "chapter": 14,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 14: Bentuk-Te & Permohonan (〜てください・〜ています)",
    "theme": "Konjugasi Bentuk-Te, Memohon Sopan, Sedang Berlangsung, dan Menawarkan Bantuan",
    "summary": "Perubahan bentuk Te (Te-kei) pada Golongan 1, 2, dan 3. Pola permohonan sopan (~te kudasai), aktivitas yang sedang berlangsung (~te imasu), dan menawarkan bantuan (~mashou ka).",
    "grammarPatterns": [
      {
        "id": "m14-1",
        "pattern": "KK bentuk-Te + ください (Permohonan Tolong)",
        "formula": "KK [te-kei] + kudasai",
        "explanation": "Meminta atau memohon tolong kepada lawan bicara secara sopan.",
        "examples": [
          {
            "jp": "ちょっと 待ってください。",
            "reading": "Chotto matte kudasai.",
            "id": "Tolong tunggu sebentar."
          },
          {
            "jp": "ここに 名前を 書いてください。",
            "reading": "Koko ni namae o kaite kudasai.",
            "id": "Tolong tulis nama di sini."
          }
        ]
      },
      {
        "id": "m14-2",
        "pattern": "KK bentuk-Te + います (Sedang Melakukan)",
        "formula": "KK [te-kei] + imasu",
        "explanation": "Menyatakan tindakan yang sedang berlangsung tepat pada saat ini.",
        "examples": [
          {
            "jp": "今 雨が 降っています。",
            "reading": "Ima ame ga futte imasu.",
            "id": "Sekarang sedang turun hujan."
          },
          {
            "jp": "ミラーさんは 今 電話を かけています。",
            "reading": "Miraa-san wa ima denwa o kakete imasu.",
            "id": "Tuan Miller sedang menelepon."
          }
        ]
      },
      {
        "id": "m14-3",
        "pattern": "KK Stem + ましょうか (Menawarkan Bantuan)",
        "formula": "KK (Stem masu) + mashou ka",
        "explanation": "Menawarkan bantuan kepada lawan bicara (\"Bolehkah saya bantu... / Bagaimana kalau saya...\").",
        "examples": [
          {
            "jp": "傘を 貸しましょうか。",
            "reading": "Kasa o kashimashou ka.",
            "id": "Bagaimana kalau saya pinjamkan payung?"
          },
          {
            "jp": "荷物を 持ちましょうか。",
            "reading": "Nimotsu o mochimashou ka.",
            "id": "Bolehkah saya bawakan barang bawaan Anda?"
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "つけます",
        "reading": "tsukemasu",
        "id": "Menyalakan (lampu/AC) / Menyalakan, memasang, menghidupkan"
      },
      {
        "jp": "けします (消します)",
        "reading": "keshimasu",
        "id": "Mematikan (lampu/api) / Mematikan, memadamkan",
        "kanji": "消します"
      },
      {
        "jp": "あけます (開けます)",
        "reading": "akemasu",
        "id": "Membuka",
        "kanji": "開けます"
      },
      {
        "jp": "しめます (閉めます)",
        "reading": "shimemasu",
        "id": "Menutup",
        "kanji": "閉めます"
      },
      {
        "jp": "いそぎます (急ぎます)",
        "reading": "isogimasu",
        "id": "Buru-buru / cepat-cepat",
        "kanji": "急ぎます"
      },
      {
        "jp": "まちます (待ちます)",
        "reading": "machimasu",
        "id": "Menunggu",
        "kanji": "待ちます"
      },
      {
        "jp": "とめます (止めます)",
        "reading": "tomemasu",
        "id": "Menghentikan / memarkir",
        "kanji": "止めます"
      },
      {
        "jp": "まがります (曲がります)",
        "reading": "magarimasu",
        "id": "Berbelok",
        "kanji": "曲がります"
      },
      {
        "jp": "もちます (持ちます)",
        "reading": "mochimasu",
        "id": "Membawa / memegang",
        "kanji": "持ちます"
      },
      {
        "jp": "とります (取ります)",
        "reading": "torimasu",
        "id": "Mengambilkan",
        "kanji": "取ります"
      },
      {
        "jp": "てつだいます (手伝います)",
        "reading": "tetsudaimasu",
        "id": "Membantu",
        "kanji": "手伝います"
      },
      {
        "jp": "よびます (呼びます)",
        "reading": "yobimasu",
        "id": "Memanggil",
        "kanji": "呼びます"
      },
      {
        "jp": "はなします (話します)",
        "reading": "hanashimasu",
        "id": "Berbicara",
        "kanji": "話します"
      },
      {
        "jp": "みせます (見せます)",
        "reading": "misemasu",
        "id": "Memperlihatkan",
        "kanji": "見せます"
      },
      {
        "jp": "ふります (降ります)",
        "reading": "furimasu",
        "id": "Turun (hujan/salju) / Turun hujan",
        "kanji": "降ります"
      },
      {
        "jp": "コピーします",
        "reading": "kopiishimasu",
        "id": "Memfotokopi / Memfotocopy"
      },
      {
        "jp": "エアコン",
        "reading": "eakon",
        "id": "AC / pendingin ruangan"
      },
      {
        "jp": "パスポート",
        "reading": "pasupooto",
        "id": "Paspor"
      },
      {
        "jp": "なまえ (名前)",
        "reading": "namae",
        "id": "Nama",
        "kanji": "名前"
      },
      {
        "jp": "じゅうしょ (住所)",
        "reading": "juusho",
        "id": "Alamat",
        "kanji": "住所"
      },
      {
        "jp": "つかいます (使います)",
        "reading": "tsukaimasu",
        "id": "Memakai",
        "kanji": "使います"
      },
      {
        "jp": "おしえます (教えます)",
        "reading": "oshiemasu",
        "id": "Memberitahu",
        "kanji": "教えます"
      },
      {
        "jp": "すわります (座ります)",
        "reading": "suwarimasu",
        "id": "Duduk",
        "kanji": "座ります"
      },
      {
        "jp": "たちます (立ちます)",
        "reading": "tachimasu",
        "id": "Berdiri",
        "kanji": "立ちます"
      },
      {
        "jp": "はいります (入ります)",
        "reading": "hairimasu",
        "id": "Masuk",
        "kanji": "入ります"
      },
      {
        "jp": "でます (出ます)",
        "reading": "demasu",
        "id": "Keluar",
        "kanji": "出ます"
      },
      {
        "jp": "でんき (電気)",
        "reading": "denki",
        "id": "Listrik, lampu",
        "kanji": "電気"
      },
      {
        "jp": "ちず (地図)",
        "reading": "chizu",
        "id": "Peta",
        "kanji": "地図"
      },
      {
        "jp": "しお (塩)",
        "reading": "shio",
        "id": "Garam",
        "kanji": "塩"
      },
      {
        "jp": "さとう (佐藤)",
        "reading": "satou",
        "id": "Gula",
        "kanji": "佐藤"
      },
      {
        "jp": "もんだい (問題)",
        "reading": "mondai",
        "id": "Masalah, soal",
        "kanji": "問題"
      },
      {
        "jp": "こたえ (答え)",
        "reading": "kotae",
        "id": "Jawaban",
        "kanji": "答え"
      },
      {
        "jp": "よみかた (読み方)",
        "reading": "yomikata",
        "id": "Cara membaca",
        "kanji": "読み方"
      },
      {
        "jp": "～かた (～方)",
        "reading": "~kata",
        "id": "Cara~",
        "kanji": "～方"
      },
      {
        "jp": "まっすぐ",
        "reading": "massugu",
        "id": "Lurus"
      },
      {
        "jp": "ゆっくり",
        "reading": "yukkuri",
        "id": "Pelan-pelan, istirahat dengan baik"
      },
      {
        "jp": "すぐ",
        "reading": "sugu",
        "id": "Segera, langsung"
      },
      {
        "jp": "また",
        "reading": "mata",
        "id": "Lagi"
      },
      {
        "jp": "あとで",
        "reading": "atode",
        "id": "Nanti"
      },
      {
        "jp": "もうすこし (もう少し)",
        "reading": "mousukoshi",
        "id": "Sedikit lagi",
        "kanji": "もう少し"
      },
      {
        "jp": "もう～",
        "reading": "mou~",
        "id": "~lagi"
      },
      {
        "jp": "さあ",
        "reading": "saa",
        "id": "Mari"
      },
      {
        "jp": "あれ？",
        "reading": "are？",
        "id": "Ah (saat heran atau kaget)"
      },
      {
        "jp": "これでおねがいします (これでお願いします)",
        "reading": "koredeonegaishimasu",
        "id": "Minta dengan ini",
        "kanji": "これでお願いします"
      },
      {
        "jp": "おつり (お釣り)",
        "reading": "otsuri",
        "id": "Kembalian",
        "kanji": "お釣り"
      },
      {
        "jp": "きっぷうりば (切符売り場)",
        "reading": "kippuuriba",
        "id": "Loket penjualan karcis",
        "kanji": "切符売り場"
      },
      {
        "jp": "じどうけんばいき (自動券売機)",
        "reading": "jidoukenbaiki",
        "id": "Mesin karcis otomatis",
        "kanji": "自動券売機"
      },
      {
        "jp": "せいさんき (精算機)",
        "reading": "seisanki",
        "id": "Alat penghitung otomatis",
        "kanji": "精算機"
      },
      {
        "jp": "かいさつぐち (改札口)",
        "reading": "kaisatsuguchi",
        "id": "Pintu pemeriksaan karcis",
        "kanji": "改札口"
      },
      {
        "jp": "でぐち (出口)",
        "reading": "deguchi",
        "id": "Pintu keluar",
        "kanji": "出口"
      },
      {
        "jp": "いりぐち (入口)",
        "reading": "iriguchi",
        "id": "Pintu masuk",
        "kanji": "入口"
      },
      {
        "jp": "ひがしぐち (東口)",
        "reading": "higashiguchi",
        "id": "Pintu timur",
        "kanji": "東口"
      },
      {
        "jp": "にしぐち (西口)",
        "reading": "nishiguchi",
        "id": "Pintu barat",
        "kanji": "西口"
      },
      {
        "jp": "みなみぐち (南口)",
        "reading": "minamiguchi",
        "id": "Pintu selatan",
        "kanji": "南口"
      },
      {
        "jp": "きたぐち (北口)",
        "reading": "kitaguchi",
        "id": "Pintu utara",
        "kanji": "北口"
      },
      {
        "jp": "ちゅうおうぐち (中央口)",
        "reading": "chuuouguchi",
        "id": "Pintu tengah",
        "kanji": "中央口"
      },
      {
        "jp": "プラットホーム",
        "reading": "purattohooム",
        "id": "Peron"
      },
      {
        "jp": "ばいてん (売店)",
        "reading": "baiten",
        "id": "Kios, kedai",
        "kanji": "売店"
      },
      {
        "jp": "コインロッカー",
        "reading": "koinrokkaa",
        "id": "Loker"
      },
      {
        "jp": "タクシーのりば",
        "reading": "takushiinoriba",
        "id": "Tempat naik taksi"
      },
      {
        "jp": "バスターミナル",
        "reading": "basutaaminaru",
        "id": "Terminal bis"
      },
      {
        "jp": "バスてい (バス停)",
        "reading": "basutei",
        "id": "Halte bis",
        "kanji": "バス停"
      },
      {
        "jp": "かいそく (快速)",
        "reading": "kaisoku",
        "id": "Kereta cepat yang lewat pinggir kota",
        "kanji": "快速"
      },
      {
        "jp": "じゅんきゅう (準急)",
        "reading": "junkyuu",
        "id": "Kereta semi cepat",
        "kanji": "準急"
      },
      {
        "jp": "じこくひょう (時刻表)",
        "reading": "jikokuhyou",
        "id": "Jadwal keberangkatan bis,kereta dll",
        "kanji": "時刻表"
      },
      {
        "jp": "～はつ (～発)",
        "reading": "~hatsu",
        "id": "Berangkat dari / berangkat pukul",
        "kanji": "～発"
      },
      {
        "jp": "～ちゃく (～着)",
        "reading": "~chaku",
        "id": "Berangkat ke / tiba pukul",
        "kanji": "～着"
      },
      {
        "jp": "とうきょういき (東京行き)",
        "reading": "toukyouiki",
        "id": "Tujuan tokyo",
        "kanji": "東京行き"
      },
      {
        "jp": "ていきけん (定期券)",
        "reading": "teikiken",
        "id": "Kartu langganan berjangka",
        "kanji": "定期券"
      },
      {
        "jp": "かいすうけん (回数券)",
        "reading": "kaisuuken",
        "id": "Karcis kupon",
        "kanji": "回数券"
      },
      {
        "jp": "かたみち (片道)",
        "reading": "katamichi",
        "id": "Sekali jalan",
        "kanji": "片道"
      },
      {
        "jp": "おうふく (往復)",
        "reading": "oufuku",
        "id": "Pulang pergi",
        "kanji": "往復"
      }
    ]
  },
  {
    "chapter": 15,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 15: Izin & Larangan (〜てもいいですか・〜てはいけません)",
    "theme": "Meminta Izin, Memberi Izin, Larangan Keras, dan Status Pekerjaan/Domisili",
    "summary": "Pola meminta izin (~te mo ii desu ka), larangan (~te wa ikemasen), serta penggunaan ~te imasu untuk menyatakan kondisi berkelanjutan (menikah, tinggal, bekerja di).",
    "grammarPatterns": [
      {
        "id": "m15-1",
        "pattern": "KK bentuk-Te + もいいですか (Bolehkah...?)",
        "formula": "KK [te-kei] + mo ii desu ka",
        "explanation": "Meminta izin secara sopan untuk melakukan sesuatu.",
        "examples": [
          {
            "jp": "写真を 撮っても いいですか。",
            "reading": "Shashin o totte mo ii desu ka.",
            "id": "Bolehkah saya mengambil foto?"
          },
          {
            "jp": "ここに 座っても いいですか。",
            "reading": "Koko ni suwatte mo ii desu ka.",
            "id": "Bolehkah saya duduk di sini?"
          }
        ]
      },
      {
        "id": "m15-2",
        "pattern": "KK bentuk-Te + はいけません (Tidak Boleh / Larangan)",
        "formula": "KK [te-kei] + wa ikemasen",
        "explanation": "Menyatakan larangan tegas berdasarkan aturan atau etika.",
        "examples": [
          {
            "jp": "ここで たばこを 吸っては いけません。",
            "reading": "Koko de tabako o sutte wa ikemasen.",
            "id": "Tidak boleh merokok di sini."
          }
        ]
      },
      {
        "id": "m15-3",
        "pattern": "〜知っています / 〜住んでいます / 〜働いています (Status Berkelanjutan)",
        "formula": "KK [te-kei] + imasu",
        "explanation": "Menyatakan status yang dihasilkan dari tindakan masa lalu yang masih berlanjut saat ini.",
        "examples": [
          {
            "jp": "東京に 住んでいます。",
            "reading": "Toukyou ni sunde imasu.",
            "id": "Tinggal di Tokyo."
          },
          {
            "jp": "IMCで 働いています。",
            "reading": "IMC de hataraite imasu.",
            "id": "Bekerja di perusahaan IMC."
          },
          {
            "jp": "市役所の 電話番号を 知っていますか。いいえ、知りません。",
            "reading": "Shiyakusho no denwa bangou o shitte imasu ka. Iie, shirimasen.",
            "id": "Tahukah nomor telepon kantor balai kota? Tidak, saya tidak tahu."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "すわります (座ります)",
        "reading": "suwarimasu",
        "id": "Duduk",
        "kanji": "座ります"
      },
      {
        "jp": "たちます (立ちます)",
        "reading": "tachimasu",
        "id": "Berdiri",
        "kanji": "立ちます"
      },
      {
        "jp": "つかいます (使います)",
        "reading": "tsukaimasu",
        "id": "Menggunakan / memakai",
        "kanji": "使います"
      },
      {
        "jp": "おきます (置きます)",
        "reading": "okimasu",
        "id": "Meletakkan / menaruh",
        "kanji": "置きます"
      },
      {
        "jp": "つくります (作ります)",
        "reading": "tsukurimasu",
        "id": "Membuat / memproduksi",
        "kanji": "作ります"
      },
      {
        "jp": "うります (売ります)",
        "reading": "urimasu",
        "id": "Menjual",
        "kanji": "売ります"
      },
      {
        "jp": "しります (知ります)",
        "reading": "shirimasu",
        "id": "Mengetahui / kenal / Mengenal, mengetahui",
        "kanji": "知ります"
      },
      {
        "jp": "すみます (住みます)",
        "reading": "sumimasu",
        "id": "Tinggal / bermukim",
        "kanji": "住みます"
      },
      {
        "jp": "けんきゅうします (研究します)",
        "reading": "kenkyuu shimasu",
        "id": "Meneliti",
        "kanji": "研究します"
      },
      {
        "jp": "しりょう (資料)",
        "reading": "shiryou",
        "id": "Data / dokumen bahan / Data, bahan",
        "kanji": "資料"
      },
      {
        "jp": "カタログ",
        "reading": "katarogu",
        "id": "Katalog"
      },
      {
        "jp": "じこくひょう (時刻表)",
        "reading": "jikokuhyou",
        "id": "Jadwal keberangkatan kereta",
        "kanji": "時刻表"
      },
      {
        "jp": "ふく (服)",
        "reading": "fuku",
        "id": "Pakaian / baju",
        "kanji": "服"
      },
      {
        "jp": "せいひん (製品)",
        "reading": "seihin",
        "id": "Produk barang jadi",
        "kanji": "製品"
      },
      {
        "jp": "ソフト",
        "reading": "sofuto",
        "id": "Perangkat lunak (software)"
      },
      {
        "jp": "せんもん (専門)",
        "reading": "senmon",
        "id": "Keahlian khusus / jurusan",
        "kanji": "専門"
      },
      {
        "jp": "はいしゃ (歯医者)",
        "reading": "haisha",
        "id": "Dokter gigi",
        "kanji": "歯医者"
      },
      {
        "jp": "どくしん (独身)",
        "reading": "dokushin",
        "id": "Lajang / belum menikah / Bujangan, jomblo",
        "kanji": "独身"
      },
      {
        "jp": "でんしじしょ (電子辞書)",
        "reading": "denshijisho",
        "id": "Kamus elektronik",
        "kanji": "電子辞書"
      },
      {
        "jp": "けいざい (経済)",
        "reading": "keizai",
        "id": "Ekonomi",
        "kanji": "経済"
      },
      {
        "jp": "おもいだします (思い出します)",
        "reading": "omoidashimasu",
        "id": "Teringat",
        "kanji": "思い出します"
      },
      {
        "jp": "いらっしゃいます",
        "reading": "irasshaimasu",
        "id": "Ada (hidup)"
      },
      {
        "jp": "しょくぎょう (職業)",
        "reading": "shokugyou",
        "id": "Pekerjaan , profesi",
        "kanji": "職業"
      },
      {
        "jp": "かいしゃいん (会社員)",
        "reading": "kaishain",
        "id": "Pegawai perusahaan",
        "kanji": "会社員"
      },
      {
        "jp": "こうむいん (公務員)",
        "reading": "koumuin",
        "id": "Pegawai negeri",
        "kanji": "公務員"
      },
      {
        "jp": "えきいん (駅員)",
        "reading": "ekiin",
        "id": "Pegawai stasiun",
        "kanji": "駅員"
      },
      {
        "jp": "ぎんこういん (銀行員)",
        "reading": "ginkouin",
        "id": "Pegawai bank",
        "kanji": "銀行員"
      },
      {
        "jp": "ゆうびんきょくいん (郵便局員)",
        "reading": "yuubinkyokuin",
        "id": "Pegawai kantor pos",
        "kanji": "郵便局員"
      },
      {
        "jp": "てんいん (店員)",
        "reading": "tenin",
        "id": "Pegawai toko",
        "kanji": "店員"
      },
      {
        "jp": "ちょうりし (調理師)",
        "reading": "chourishi",
        "id": "Tukang masak",
        "kanji": "調理師"
      },
      {
        "jp": "りようし (理容師)",
        "reading": "riyoushi",
        "id": "Tukang potong rambut",
        "kanji": "理容師"
      },
      {
        "jp": "びようし (美容師)",
        "reading": "biyoushi",
        "id": "Ahli kecantikan",
        "kanji": "美容師"
      },
      {
        "jp": "きょうし (教師)",
        "reading": "kyoushi",
        "id": "Guru",
        "kanji": "教師"
      },
      {
        "jp": "べんごし (弁護士)",
        "reading": "bengoshi",
        "id": "Pengacara",
        "kanji": "弁護士"
      },
      {
        "jp": "けんきゅうしゃ (研究者)",
        "reading": "kenkyuusha",
        "id": "Peneliti",
        "kanji": "研究者"
      },
      {
        "jp": "いしゃ (医者)",
        "reading": "isha",
        "id": "Dokter",
        "kanji": "医者"
      },
      {
        "jp": "かんごし (看護師)",
        "reading": "kangoshi",
        "id": "Perawat",
        "kanji": "看護師"
      },
      {
        "jp": "うんてんしゅ (運転手)",
        "reading": "untenshu",
        "id": "Sopir",
        "kanji": "運転手"
      },
      {
        "jp": "けいさつかん (警察官)",
        "reading": "keisatsukan",
        "id": "Polisi",
        "kanji": "警察官"
      },
      {
        "jp": "がいこうかん (外交官)",
        "reading": "gaikoukan",
        "id": "Diplomat",
        "kanji": "外交官"
      },
      {
        "jp": "せいじか (政治家)",
        "reading": "seijika",
        "id": "Politikus",
        "kanji": "政治家"
      },
      {
        "jp": "がか (画家)",
        "reading": "gaka",
        "id": "Pelukis",
        "kanji": "画家"
      },
      {
        "jp": "さっか (作家)",
        "reading": "sakka",
        "id": "Pengarang",
        "kanji": "作家"
      },
      {
        "jp": "おんがくか (音楽家)",
        "reading": "ongakuka",
        "id": "Musisi",
        "kanji": "音楽家"
      },
      {
        "jp": "けんちくか (建築家)",
        "reading": "kenchikuka",
        "id": "Arsitek",
        "kanji": "建築家"
      },
      {
        "jp": "エンジニア",
        "reading": "enjinia",
        "id": "Insinyur"
      },
      {
        "jp": "デザイナー",
        "reading": "dezainaa",
        "id": "Perancang busana"
      },
      {
        "jp": "ジャーナリスト",
        "reading": "jaanarisuto",
        "id": "Wartawan"
      },
      {
        "jp": "かしゅ (歌手)",
        "reading": "kashu",
        "id": "Penyanyi",
        "kanji": "歌手"
      },
      {
        "jp": "はいゆう (俳優)",
        "reading": "haiyuu",
        "id": "Aktor / artis",
        "kanji": "俳優"
      },
      {
        "jp": "スポーツせんしゅ (スポーツ選手)",
        "reading": "supootsusenshu",
        "id": "Olahragawan / atlit",
        "kanji": "スポーツ選手"
      }
    ]
  },
  {
    "chapter": 16,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 16: Urutan Tindakan (〜てから) & Menggabungkan Sifat (〜くて・〜で)",
    "theme": "Rangkaian Perbuatan Berurutan, Setelah Melakukan, dan Karakteristik Ganda",
    "summary": "Menyambung kata kerja secara berurutan dengan bentuk-Te, pola ~te kara (setelah...), dan menggabungkan kata sifat (~kute untuk i-keiyoushi, ~de untuk na-keiyoushi).",
    "grammarPatterns": [
      {
        "id": "m16-1",
        "pattern": "KK1-て、KK2-て、KK3-ます (Rangkaian Tindakan)",
        "formula": "KK1 [te], KK2 [te], KK3 [masu]",
        "explanation": "Menghubungkan dua atau lebih tindakan yang dilakukan secara berurutan secara kronologis.",
        "examples": [
          {
            "jp": "朝 ジョギングを して、シャワーを 浴びて、会社へ 行きます。",
            "reading": "Asa jogingu o shite, shawaa o abite, kaisha e ikimasu.",
            "id": "Pagi hari joging, mandi shower, lalu pergi ke kantor."
          }
        ]
      },
      {
        "id": "m16-2",
        "pattern": "KK1 bentuk-Te + から、KK2 (Setelah Melakukan KK1)",
        "formula": "KK1 [te-kei] + kara, KK2",
        "explanation": "Menegaskan bahwa tindakan kedua baru dilakukan setelah tindakan pertama benar-benar selesai.",
        "examples": [
          {
            "jp": "国へ 帰ってから、父の 会社で 働きます。",
            "reading": "Kuni e kaette kara, chichi no kaisha de hatarakimasu.",
            "id": "Setelah pulang ke tanah air, saya akan bekerja di perusahaan ayah."
          }
        ]
      },
      {
        "id": "m16-3",
        "pattern": "Kata Sifat Bentuk Sambung (〜くて / 〜で)",
        "formula": "I-Keiyoushi (~kute) / Na-Keiyoushi (~de)",
        "explanation": "Menyambung dua kata sifat atau predikat.",
        "examples": [
          {
            "jp": "ミラーさんは 若くて、親切です。",
            "reading": "Miraa-san wa wakakute, shinsetsu desu.",
            "id": "Tuan Miller muda dan ramah."
          },
          {
            "jp": "奈良は 静かで、きれいな 町です。",
            "reading": "Nara wa shizuka de, kirei na machi desu.",
            "id": "Nara tenang dan kota yang indah."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "のります (乗ります)",
        "reading": "norimasu",
        "id": "Naik (kendaraan)",
        "kanji": "乗ります"
      },
      {
        "jp": "おります (降ります)",
        "reading": "orimasu",
        "id": "Turun (dari kendaraan)",
        "kanji": "降ります"
      },
      {
        "jp": "のりかえます (乗り換えます)",
        "reading": "norikaemasu",
        "id": "Pindah jalur / transit kendaraan / Ganti, pindah kendaraan",
        "kanji": "乗り換えます"
      },
      {
        "jp": "あびます (浴びます)",
        "reading": "abimasu",
        "id": "Mandi (shower)",
        "kanji": "浴びます"
      },
      {
        "jp": "いれます (入れます)",
        "reading": "iremasu",
        "id": "Memasukkan",
        "kanji": "入れます"
      },
      {
        "jp": "だします (出します)",
        "reading": "dashimasu",
        "id": "Mengeluarkan / menyerahkan",
        "kanji": "出します"
      },
      {
        "jp": "おろします (下ろします)",
        "reading": "oroshimasu",
        "id": "Menarik (uang di ATM) / Mengeluarkan/mengambil uang",
        "kanji": "下ろします"
      },
      {
        "jp": "はいります (入ります)",
        "reading": "hairimasu",
        "id": "Masuk",
        "kanji": "入ります"
      },
      {
        "jp": "でます (出ます)",
        "reading": "demasu",
        "id": "Keluar",
        "kanji": "出ます"
      },
      {
        "jp": "おします (押します)",
        "reading": "oshimasu",
        "id": "Menekan (tombol)",
        "kanji": "押します"
      },
      {
        "jp": "わかい (若い)",
        "reading": "wakai",
        "id": "Muda",
        "kanji": "若い"
      },
      {
        "jp": "ながい (長い)",
        "reading": "nagai",
        "id": "Panjang",
        "kanji": "長い"
      },
      {
        "jp": "みじかい (短い)",
        "reading": "mijikai",
        "id": "Pendek",
        "kanji": "短い"
      },
      {
        "jp": "あかるい (明るい)",
        "reading": "akarui",
        "id": "Terang / ceria",
        "kanji": "明るい"
      },
      {
        "jp": "くらい (暗い)",
        "reading": "kurai",
        "id": "Gelap",
        "kanji": "暗い"
      },
      {
        "jp": "からだ (体)",
        "reading": "karada",
        "id": "Tubuh / badan",
        "kanji": "体"
      },
      {
        "jp": "あたま (頭)",
        "reading": "atama",
        "id": "Kepala",
        "kanji": "頭"
      },
      {
        "jp": "め (目)",
        "reading": "me",
        "id": "Mata",
        "kanji": "目"
      },
      {
        "jp": "みみ (耳)",
        "reading": "mimi",
        "id": "Telinga",
        "kanji": "耳"
      },
      {
        "jp": "はな (鼻)",
        "reading": "hana",
        "id": "Hidung",
        "kanji": "鼻"
      },
      {
        "jp": "くち (口)",
        "reading": "kuchi",
        "id": "Mulut",
        "kanji": "口"
      },
      {
        "jp": "は (歯)",
        "reading": "ha",
        "id": "Gigi",
        "kanji": "歯"
      },
      {
        "jp": "のみます (飲みます)",
        "reading": "nomimasu",
        "id": "Minum",
        "kanji": "飲みます"
      },
      {
        "jp": "はじめます (始めます)",
        "reading": "hajimemasu",
        "id": "Mulai",
        "kanji": "始めます"
      },
      {
        "jp": "けんがくします (見学します)",
        "reading": "kengakushimasu",
        "id": "Mengunjungi",
        "kanji": "見学します"
      },
      {
        "jp": "でんわします (電話します)",
        "reading": "denwashimasu",
        "id": "Menelepon",
        "kanji": "電話します"
      },
      {
        "jp": "かみ (髪)",
        "reading": "kami",
        "id": "Rambut",
        "kanji": "髪"
      },
      {
        "jp": "かお (顔)",
        "reading": "kao",
        "id": "Wajah",
        "kanji": "顔"
      },
      {
        "jp": "おなか",
        "reading": "onaka",
        "id": "Perut"
      },
      {
        "jp": "あし (足)",
        "reading": "ashi",
        "id": "Kaki",
        "kanji": "足"
      },
      {
        "jp": "せ (背)",
        "reading": "se",
        "id": "Punggung",
        "kanji": "背"
      },
      {
        "jp": "サービス",
        "reading": "saabisu",
        "id": "Pelayanan"
      },
      {
        "jp": "ジョギング",
        "reading": "jogingu",
        "id": "Joging"
      },
      {
        "jp": "シャワー",
        "reading": "shawaa",
        "id": "Shower"
      },
      {
        "jp": "みどり (緑)",
        "reading": "midori",
        "id": "Hijau",
        "kanji": "緑"
      },
      {
        "jp": "おてら (お寺)",
        "reading": "otera",
        "id": "Kuil",
        "kanji": "お寺"
      },
      {
        "jp": "じんじゃ (神社)",
        "reading": "jinja",
        "id": "Wihara",
        "kanji": "神社"
      },
      {
        "jp": "～ばん (～番)",
        "reading": "~ban",
        "id": "Nomer",
        "kanji": "～番"
      },
      {
        "jp": "どうやって",
        "reading": "douyatte",
        "id": "Dengan cara bagaimana, bagaimana caranya ?"
      },
      {
        "jp": "どの～",
        "reading": "dono~",
        "id": "Yang mana?"
      },
      {
        "jp": "どれ",
        "reading": "dore",
        "id": "Mana ?"
      },
      {
        "jp": "すごいですね",
        "reading": "sugoidesune",
        "id": "Hebat"
      },
      {
        "jp": "いいえ、まだまだです",
        "reading": "iie, madamadadesu",
        "id": "Tidak, belum memuaskan"
      },
      {
        "jp": "おひきだし (お引き出し)",
        "reading": "ohikidashi",
        "id": "Penarikan uang",
        "kanji": "お引き出し"
      },
      {
        "jp": "まず",
        "reading": "mazu",
        "id": "Pertama-tama, terlebih dahulu"
      },
      {
        "jp": "つぎに (次に)",
        "reading": "tsugini",
        "id": "Kemudian, berikutnya",
        "kanji": "次に"
      },
      {
        "jp": "キャッシュカード",
        "reading": "kyasshukaado",
        "id": "Kartu ATM"
      },
      {
        "jp": "あんしょうばんごう (暗証番号)",
        "reading": "anshoubangou",
        "id": "PIN",
        "kanji": "暗証番号"
      },
      {
        "jp": "きんがく (金額)",
        "reading": "kingaku",
        "id": "Jumlah uang",
        "kanji": "金額"
      },
      {
        "jp": "かくにん (確認)",
        "reading": "kakunin",
        "id": "Memastikan",
        "kanji": "確認"
      },
      {
        "jp": "ボタン",
        "reading": "botan",
        "id": "Tombol"
      },
      {
        "jp": "ゆきまつり (雪祭り)",
        "reading": "yukimatsuri",
        "id": "Pesta salju",
        "kanji": "雪祭り"
      },
      {
        "jp": "おあずけいれ (お預入れ)",
        "reading": "oazukeire",
        "id": "Menambahkan saldo",
        "kanji": "お預入れ"
      },
      {
        "jp": "おふりこみ (お振込み)",
        "reading": "ofurikomi",
        "id": "Pembayaran",
        "kanji": "お振込み"
      },
      {
        "jp": "おふりかえ (お振り替え)",
        "reading": "ofurikae",
        "id": "Pengiriman",
        "kanji": "お振り替え"
      },
      {
        "jp": "つうちょうきにゅう (通帳記入)",
        "reading": "tsuuchoukinyuu",
        "id": "Pembaharuan buku catatan bank",
        "kanji": "通帳記入"
      },
      {
        "jp": "ざんだかしょうかい (残高照会)",
        "reading": "zandakashoukai",
        "id": "Cek saldo",
        "kanji": "残高照会"
      }
    ]
  },
  {
    "chapter": 17,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 17: Bentuk Negatif (〜ないでください・〜なければなりません)",
    "theme": "Konjugasi Bentuk-Nai, Larangan Sopan, Keharusan, dan Ketidakhadiran Kewajiban",
    "summary": "Perubahan bentuk negatif kasual (Nai-kei). Pola tolong jangan (~naide kudasai), keharusan wajib (~nakereba narimasen), dan tidak wajib (~nakute mo ii desu).",
    "grammarPatterns": [
      {
        "id": "m17-1",
        "pattern": "KK bentuk-Nai + でください (Tolong Jangan...)",
        "formula": "KK [nai-kei] + de kudasai",
        "explanation": "Meminta lawan bicara agar tidak melakukan suatu hal secara sopan.",
        "examples": [
          {
            "jp": "ここで 写真を 撮らないで ください。",
            "reading": "Koko de shashin o toranaide kudasai.",
            "id": "Tolong jangan memotret di sini."
          }
        ]
      },
      {
        "id": "m17-2",
        "pattern": "KK bentuk-Nai (-i diganti) + ければなりません (Harus / Wajib)",
        "formula": "KK [nakereba narimasen]",
        "explanation": "Menyatakan kewajiban atau keharusan mutlak tanpa memandang kemauan pribadi.",
        "examples": [
          {
            "jp": "薬を 飲まなければ なりません。",
            "reading": "Kusuri o nomanakereba narimasen.",
            "id": "Harus minum obat."
          },
          {
            "jp": "パスポートを 見せなければ なりません。",
            "reading": "Pasupooto o misenakereba narimasen.",
            "id": "Harus memperlihatkan paspor."
          }
        ]
      },
      {
        "id": "m17-3",
        "pattern": "KK bentuk-Nai (-i diganti) + くてもいいです (Tidak Perlu / Boleh Tidak)",
        "formula": "KK [nakute mo ii desu]",
        "explanation": "Menyatakan tidak adanya keharusan atau kewajiban.",
        "examples": [
          {
            "jp": "明日 来なくても いいです。",
            "reading": "Ashita konakute mo ii desu.",
            "id": "Besok tidak perlu datang juga tidak apa-apa."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "おぼえます (覚えます)",
        "reading": "oboemasu",
        "id": "Mengingat / menghafal",
        "kanji": "覚えます"
      },
      {
        "jp": "わすれます (忘れます)",
        "reading": "wasuremasu",
        "id": "Lupa",
        "kanji": "忘れます"
      },
      {
        "jp": "なくします",
        "reading": "nakushimasu",
        "id": "Menghilangkan / hilang / Kehilangan, hilang"
      },
      {
        "jp": "はらいます (払います)",
        "reading": "haraimasu",
        "id": "Membayar",
        "kanji": "払います"
      },
      {
        "jp": "かえします (返します)",
        "reading": "kaeshimasu",
        "id": "Mengembalikan",
        "kanji": "返します"
      },
      {
        "jp": "でかけます (出かけます)",
        "reading": "dekakemasu",
        "id": "Bepergian keluar / Keluar rumah",
        "kanji": "出かけます"
      },
      {
        "jp": "ぬぎます (脱ぎます)",
        "reading": "nugimasu",
        "id": "Melepas (pakaian/sepatu) / Melepas pakaian",
        "kanji": "脱ぎます"
      },
      {
        "jp": "もっていきます (持って行きます)",
        "reading": "motte ikimasu",
        "id": "Membawa pergi",
        "kanji": "持って行きます"
      },
      {
        "jp": "もってきます (持って来ます)",
        "reading": "motte kimasu",
        "id": "Membawa datang ke mari",
        "kanji": "持って来ます"
      },
      {
        "jp": "しんぱいします (心配します)",
        "reading": "shinpai shimasu",
        "id": "Khawatir / cemas",
        "kanji": "心配します"
      },
      {
        "jp": "ざんぎょうします (残業します)",
        "reading": "zangyou shimasu",
        "id": "Lembur kerja",
        "kanji": "残業します"
      },
      {
        "jp": "しゅっちょうします (出張します)",
        "reading": "shucchou shimasu",
        "id": "Dinas luar kota",
        "kanji": "出張します"
      },
      {
        "jp": "くすり (薬)",
        "reading": "kusuri",
        "id": "Obat",
        "kanji": "薬"
      },
      {
        "jp": "ほけんしょう (保険証)",
        "reading": "hokenshou",
        "id": "Kartu asuransi kesehatan",
        "kanji": "保険証"
      },
      {
        "jp": "ねつ (熱)",
        "reading": "netsu",
        "id": "Demam / panas tubuh",
        "kanji": "熱"
      },
      {
        "jp": "びょうき (病気)",
        "reading": "byouki",
        "id": "Sakit / penyakit",
        "kanji": "病気"
      },
      {
        "jp": "たいせつ [な] (大切)",
        "reading": "taisetsu [na]",
        "id": "Penting / berharga",
        "kanji": "大切"
      },
      {
        "jp": "だいじょうぶ [な] (大丈夫)",
        "reading": "daijoubu [na]",
        "id": "Tidak apa-apa / aman",
        "kanji": "大丈夫"
      },
      {
        "jp": "たいせつな (大切な)",
        "reading": "taisetsuna",
        "id": "Penting",
        "kanji": "大切な"
      },
      {
        "jp": "だいじょうぶな (大丈夫な)",
        "reading": "daijoubuna",
        "id": "Tidak apa-apa",
        "kanji": "大丈夫な"
      },
      {
        "jp": "あぶない (危ない)",
        "reading": "abunai",
        "id": "Berbahaya",
        "kanji": "危ない"
      },
      {
        "jp": "きんえん (禁煙)",
        "reading": "kinen",
        "id": "Dilarang merokok",
        "kanji": "禁煙"
      },
      {
        "jp": "けんこうほけんしょう (健康保険証)",
        "reading": "kenkouhokenshou",
        "id": "Kartu asuransi kesehatan",
        "kanji": "健康保険証"
      },
      {
        "jp": "おふろ",
        "reading": "ofuro",
        "id": "Kamar mandi"
      },
      {
        "jp": "うわぎ (上着)",
        "reading": "uwagi",
        "id": "Baju,jaket",
        "kanji": "上着"
      },
      {
        "jp": "したぎ (下着)",
        "reading": "shitagi",
        "id": "Pakaian dalam",
        "kanji": "下着"
      },
      {
        "jp": "までに",
        "reading": "madeni",
        "id": "Sampai dengan ( menyatakan batas waktu )"
      },
      {
        "jp": "ですから",
        "reading": "desukara",
        "id": "Oleh karena itu"
      },
      {
        "jp": "どうしましたか",
        "reading": "doushimashitaka",
        "id": "Apa yang terjadi , ada masalah apa?"
      },
      {
        "jp": "のど",
        "reading": "nodo",
        "id": "Tenggorokan"
      },
      {
        "jp": "いたい (痛い)",
        "reading": "itai",
        "id": "Sakit (nyeri)",
        "kanji": "痛い"
      },
      {
        "jp": "かぜ",
        "reading": "kaze",
        "id": "Masuk angin"
      },
      {
        "jp": "それから",
        "reading": "sorekara",
        "id": "Setelah itu, kemudian , dan"
      },
      {
        "jp": "おだいじに (お大事に)",
        "reading": "odaijini",
        "id": "Semoga lekas sembuh",
        "kanji": "お大事に"
      },
      {
        "jp": "あたまがいたい (頭が痛い)",
        "reading": "atamagaitai",
        "id": "Sakit kepala",
        "kanji": "頭が痛い"
      },
      {
        "jp": "おなかがいたい",
        "reading": "onakagaitai",
        "id": "Sakit perut"
      },
      {
        "jp": "はがいたい (歯が痛い)",
        "reading": "hagaitai",
        "id": "Sakit gigi",
        "kanji": "歯が痛い"
      },
      {
        "jp": "ねつがあります (熱があります)",
        "reading": "netsugaarimasu",
        "id": "Demam",
        "kanji": "熱があります"
      },
      {
        "jp": "せきがでます (せきが出ます)",
        "reading": "sekigademasu",
        "id": "Batuk",
        "kanji": "せきが出ます"
      },
      {
        "jp": "はなみずがでます (鼻水が出ます)",
        "reading": "hanamizugademasu",
        "id": "Pilek",
        "kanji": "鼻水が出ます"
      },
      {
        "jp": "ちがでます (血が出ます)",
        "reading": "chigademasu",
        "id": "Berdarah",
        "kanji": "血が出ます"
      },
      {
        "jp": "はきけがします (吐き気がします)",
        "reading": "hakikegashimasu",
        "id": "Mual",
        "kanji": "吐き気がします"
      },
      {
        "jp": "さむけがします (寒気がします)",
        "reading": "samukegashimasu",
        "id": "Kedinginan",
        "kanji": "寒気がします"
      },
      {
        "jp": "めまいがします",
        "reading": "memaigashimasu",
        "id": "Pusing"
      },
      {
        "jp": "げりをします (下痢をします)",
        "reading": "gerioshimasu",
        "id": "Mencret, diare",
        "kanji": "下痢をします"
      },
      {
        "jp": "べんぴをします (便秘をします)",
        "reading": "benpioshimasu",
        "id": "Sembelit",
        "kanji": "便秘をします"
      },
      {
        "jp": "けがをします",
        "reading": "kegaoshimasu",
        "id": "Terluka"
      },
      {
        "jp": "やけどをします",
        "reading": "yakedooshimasu",
        "id": "Terbakar"
      },
      {
        "jp": "しょくよくがありません (食欲がありません)",
        "reading": "shokuyokugaarimasen",
        "id": "Tidak nafsu makan",
        "kanji": "食欲がありません"
      },
      {
        "jp": "かたがこります (肩が凝ります)",
        "reading": "katagakorimasu",
        "id": "Bahu pegal",
        "kanji": "肩が凝ります"
      },
      {
        "jp": "からだがだるい (体がだるい)",
        "reading": "karadagadarui",
        "id": "Badan lemas",
        "kanji": "体がだるい"
      },
      {
        "jp": "かゆい",
        "reading": "kayui",
        "id": "Gatal"
      },
      {
        "jp": "インフルエンザ",
        "reading": "infuruenza",
        "id": "Flu, influenza"
      },
      {
        "jp": "もうちょう (盲腸)",
        "reading": "mouchou",
        "id": "Usus buntu",
        "kanji": "盲腸"
      },
      {
        "jp": "ぎっくりごし (ぎっくり腰)",
        "reading": "gikkurigoshi",
        "id": "Sakit pinggang",
        "kanji": "ぎっくり腰"
      },
      {
        "jp": "ねんざ",
        "reading": "nenza",
        "id": "Keseleo"
      },
      {
        "jp": "こっせつ (骨折)",
        "reading": "kossetsu",
        "id": "Patah tulang",
        "kanji": "骨折"
      },
      {
        "jp": "ふつかよい (二日酔い)",
        "reading": "futsukayoi",
        "id": "Efek sesudah minum",
        "kanji": "二日酔い"
      }
    ]
  },
  {
    "chapter": 18,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 18: Kemampuan & Hobi (〜ことができる・趣味は〜ことです)",
    "theme": "Bentuk Kamus (Jisho-kei), Menyatakan Kemampuan (Dekiru), Hobi, dan Sebelum Melakukan",
    "summary": "Konjugasi bentuk kamus kata kerja. Pola sanggup berbuat (~koto ga dekimasu), menjelaskan hobi (~koto desu), dan urutan waktu sebelum (~mae ni).",
    "grammarPatterns": [
      {
        "id": "m18-1",
        "pattern": "KK bentuk Kamus + ことが できます (Bisa / Mampu Melakukan)",
        "formula": "KK [jisho-kei] + koto ga dekimasu",
        "explanation": "Menyatakan kesanggupan, keterampilan, atau izin situasional.",
        "examples": [
          {
            "jp": "ミラーさんは 漢字を 読むことが できます。",
            "reading": "Miraa-san wa kanji o yomu koto ga dekimasu.",
            "id": "Tuan Miller bisa membaca huruf Kanji."
          },
          {
            "jp": "カードで 払うことが できます。",
            "reading": "Kaado de harau koto ga dekimasu.",
            "id": "Bisa membayar menggunakan kartu."
          }
        ]
      },
      {
        "id": "m18-2",
        "pattern": "わたしの 趣味は [KK Kamus + こと] です (Hobi Saya Adalah...)",
        "formula": "Watashi no shumi wa KK [jisho-kei] + koto desu",
        "explanation": "Mengubah kata kerja menjadi kata benda dengan menambahkan \"koto\" untuk menjelaskan hobi.",
        "examples": [
          {
            "jp": "わたしの 趣味は 写真を 撮ることです。",
            "reading": "Watashi no shumi wa shashin o toru koto desu.",
            "id": "Hobi saya adalah memotret foto."
          }
        ]
      },
      {
        "id": "m18-3",
        "pattern": "KK Kamus / Waktu + 前に (Sebelum...)",
        "formula": "KK [jisho-kei] / KB [no] + mae ni",
        "explanation": "Menyatakan bahwa suatu perbuatan dilakukan sebelum perbuatan lainnya.",
        "examples": [
          {
            "jp": "寝る 前に、日記を 書きます。",
            "reading": "Neru mae ni, nikki o kakimasu.",
            "id": "Sebelum tidur, saya menulis buku harian."
          },
          {
            "jp": "食事の 前に、手を 洗います。",
            "reading": "Shokuji no mae ni, te o araimasu.",
            "id": "Sebelum makan, mencuci tangan."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "できます",
        "reading": "dekimasu",
        "id": "Bisa / sanggup / Dapat, bisa, mampu"
      },
      {
        "jp": "あらいます (洗います)",
        "reading": "araimasu",
        "id": "Mencuci",
        "kanji": "洗います"
      },
      {
        "jp": "ひきます (弾きます)",
        "reading": "hikimasu",
        "id": "Memainkan (alat musik petik/tuts: piano/gitar) / Bermain (alat musik , piano)",
        "kanji": "弾きます"
      },
      {
        "jp": "うたいます (歌います)",
        "reading": "utaimasu",
        "id": "Bernyanyi / Menyanyi",
        "kanji": "歌います"
      },
      {
        "jp": "あつめます (集めます)",
        "reading": "atsumemasu",
        "id": "Mengumpulkan / mengoleksi",
        "kanji": "集めます"
      },
      {
        "jp": "すてます (捨てます)",
        "reading": "sutemasu",
        "id": "Membuang",
        "kanji": "捨てます"
      },
      {
        "jp": "かえます (換えます)",
        "reading": "kaemasu",
        "id": "Menukar / mengganti / Menukar, mengganti",
        "kanji": "換えます"
      },
      {
        "jp": "うんてんします (運転します)",
        "reading": "unten shimasu",
        "id": "Mengemudi / menyetir / Menyetir, mengendarai",
        "kanji": "運転します"
      },
      {
        "jp": "よやくします (予約します)",
        "reading": "yoyaku shimasu",
        "id": "Memesan / reservasi",
        "kanji": "予約します"
      },
      {
        "jp": "ピアノ",
        "reading": "piano",
        "id": "Piano"
      },
      {
        "jp": "〜メートル",
        "reading": "~meetoru",
        "id": "... meter"
      },
      {
        "jp": "げんきん (現金)",
        "reading": "genkin",
        "id": "Uang tunai",
        "kanji": "現金"
      },
      {
        "jp": "しゅみ (趣味)",
        "reading": "shumi",
        "id": "Hobi",
        "kanji": "趣味"
      },
      {
        "jp": "にっき (日記)",
        "reading": "nikki",
        "id": "Buku harian / Catatan harian",
        "kanji": "日記"
      },
      {
        "jp": "おいのり (お祈り)",
        "reading": "oinori",
        "id": "Doa / ibadah",
        "kanji": "お祈り"
      },
      {
        "jp": "かちょう (課長)",
        "reading": "kachou",
        "id": "Kepala seksi / manajer bagian",
        "kanji": "課長"
      },
      {
        "jp": "ぶちょう (部長)",
        "reading": "buchou",
        "id": "Kepala departemen / Kepala bagian",
        "kanji": "部長"
      },
      {
        "jp": "しゃちょう (社長)",
        "reading": "shachou",
        "id": "Direktur utama perusahaan",
        "kanji": "社長"
      },
      {
        "jp": "どうぶつ (動物)",
        "reading": "doubutsu",
        "id": "Hewan",
        "kanji": "動物"
      },
      {
        "jp": "うま (馬)",
        "reading": "uma",
        "id": "Kuda",
        "kanji": "馬"
      },
      {
        "jp": "インターネット",
        "reading": "intaanetto",
        "id": "Internet"
      },
      {
        "jp": "とくに (特に)",
        "reading": "tokuni",
        "id": "Terutama, khususnya",
        "kanji": "特に"
      },
      {
        "jp": "それはおもしろいですね",
        "reading": "sorehaomoshiroidesune",
        "id": "Itu menarik ya..."
      },
      {
        "jp": "ほんとうですか",
        "reading": "hontoudesuka",
        "id": "Betulkah , benarkah"
      },
      {
        "jp": "ぜひ",
        "reading": "zehi",
        "id": "Pasti, benar-benar"
      },
      {
        "jp": "なかなか",
        "reading": "nakanaka",
        "id": "Jarang, tidak mudah (diikuti bentuk negatif)"
      },
      {
        "jp": "とぶ (飛ぶ)",
        "reading": "tobu",
        "id": "Terbang",
        "kanji": "飛ぶ"
      },
      {
        "jp": "とぶ（はねる） (跳ぶ)",
        "reading": "tobu (haneru)",
        "id": "Meloncat",
        "kanji": "跳ぶ"
      },
      {
        "jp": "のぼる (登る)",
        "reading": "noboru",
        "id": "Memanjat",
        "kanji": "登る"
      },
      {
        "jp": "はしる (走る)",
        "reading": "hashiru",
        "id": "Berlari",
        "kanji": "走る"
      },
      {
        "jp": "およぐ (泳ぐ)",
        "reading": "oyogu",
        "id": "Berenang",
        "kanji": "泳ぐ"
      },
      {
        "jp": "もぐる",
        "reading": "moguru",
        "id": "Menyelam"
      },
      {
        "jp": "とびこむ (飛び込む)",
        "reading": "tobikomu",
        "id": "Terjun",
        "kanji": "飛び込む"
      },
      {
        "jp": "さかだちする (逆立ちする)",
        "reading": "sakadachisuru",
        "id": "Berjungkir balik",
        "kanji": "逆立ちする"
      },
      {
        "jp": "はう",
        "reading": "hau",
        "id": "Merayap"
      },
      {
        "jp": "ける",
        "reading": "keru",
        "id": "Menendang"
      },
      {
        "jp": "ふる (振る)",
        "reading": "furu",
        "id": "Melambaikan",
        "kanji": "振る"
      },
      {
        "jp": "もちあげる (持ち上げる)",
        "reading": "mochiageru",
        "id": "Mengangkat",
        "kanji": "持ち上げる"
      },
      {
        "jp": "なげる (投げる)",
        "reading": "nageru",
        "id": "Melempar",
        "kanji": "投げる"
      },
      {
        "jp": "たたく",
        "reading": "tataku",
        "id": "Memukul"
      },
      {
        "jp": "ひく (引く)",
        "reading": "hiku",
        "id": "Menarik",
        "kanji": "引く"
      },
      {
        "jp": "おす (押す)",
        "reading": "osu",
        "id": "Menekan, mendorong",
        "kanji": "押す"
      },
      {
        "jp": "まげる (曲げる)",
        "reading": "mageru",
        "id": "Membengkokkan",
        "kanji": "曲げる"
      },
      {
        "jp": "のばす (伸ばす)",
        "reading": "nobasu",
        "id": "Meluruskan",
        "kanji": "伸ばす"
      },
      {
        "jp": "ころぶ (転ぶ)",
        "reading": "korobu",
        "id": "Jatuh",
        "kanji": "転ぶ"
      },
      {
        "jp": "ふりむく (振り向く)",
        "reading": "furimuku",
        "id": "Menengok ke belakang",
        "kanji": "振り向く"
      }
    ]
  },
  {
    "chapter": 19,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 19: Pengalaman & Variasi Tindakan (〜たことがある・〜たり〜たり)",
    "theme": "Bentuk Lampau Kasual (Ta-kei), Riwayat Pernah Melakukan, Daftar Contoh Kegiatan, dan Perubahan Keadaan",
    "summary": "Konjugasi bentuk-Ta. Pola pernah berpengalaman (~ta koto ga arimasu), menyebutkan contoh perbuatan bolak-balik (~tari ~tari shimasu), dan perubahan keadaan (~ku narimasu / ~ni narimasu).",
    "grammarPatterns": [
      {
        "id": "m19-1",
        "pattern": "KK bentuk-Ta + ことが あります (Pernah...)",
        "formula": "KK [ta-kei] + koto ga arimasu",
        "explanation": "Menyatakan pengalaman hidup masa lalu (\"pernah melakukan...\").",
        "examples": [
          {
            "jp": "馬に 乗った ことが あります。",
            "reading": "Uma ni notta koto ga arimasu.",
            "id": "Pernah naik kuda."
          },
          {
            "jp": "富士山に 登った ことが ありますか。",
            "reading": "Fujisan ni nobotta koto ga arimasu ka.",
            "id": "Apakah pernah mendaki Gunung Fuji?"
          }
        ]
      },
      {
        "id": "m19-2",
        "pattern": "KK1-たり、KK2-たり します (Melakukan Kegiatan A, B, dll.)",
        "formula": "KK1 [tari], KK2 [tari] shimasu",
        "explanation": "Menyebutkan perwakilan beberapa tindakan tanpa terikat urutan kronologis kaku.",
        "examples": [
          {
            "jp": "休みの 日は 掃除したり、洗濯したり します。",
            "reading": "Yasumi no hi wa souji shitari, sentaku shitari shimasu.",
            "id": "Di hari libur, saya bersih-bersih, mencuci baju, dan sebagainya."
          }
        ]
      },
      {
        "id": "m19-3",
        "pattern": "Kata Sifat + なります (Menjadi / Berubah Keadaan)",
        "formula": "I-Keiyoushi (~ku narimasu) / Na-Keiyoushi & KB (~ni narimasu)",
        "explanation": "Menyatakan perubahan suatu sifat, kondisi, umur, atau profesi.",
        "examples": [
          {
            "jp": "寒く なりました。",
            "reading": "Samuku narimashita.",
            "id": "Cuaca sudah menjadi dingin."
          },
          {
            "jp": "元気になりました。",
            "reading": "Genki ni narimashita.",
            "id": "Sudah menjadi sembuh/sehat."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "のぼります (登ります)",
        "reading": "noborimasu",
        "id": "Mendaki",
        "kanji": "登ります"
      },
      {
        "jp": "とまります (泊まります)",
        "reading": "tomarimasu",
        "id": "Menginap (hotel/ryokan)",
        "kanji": "泊まります"
      },
      {
        "jp": "そうじします (掃除します)",
        "reading": "souji shimasu",
        "id": "Membersihkan rumah",
        "kanji": "掃除します"
      },
      {
        "jp": "せんたくします (洗濯します)",
        "reading": "sentaku shimasu",
        "id": "Mencuci pakaian",
        "kanji": "洗濯します"
      },
      {
        "jp": "なります",
        "reading": "narimasu",
        "id": "Menjadi"
      },
      {
        "jp": "ねむい (眠い)",
        "reading": "nemui",
        "id": "Mengantuk",
        "kanji": "眠い"
      },
      {
        "jp": "つよい (強い)",
        "reading": "tsuyoi",
        "id": "Kuat",
        "kanji": "強い"
      },
      {
        "jp": "よわい (弱い)",
        "reading": "yowai",
        "id": "Lemah",
        "kanji": "弱い"
      },
      {
        "jp": "ちょうし (調子)",
        "reading": "choushi",
        "id": "Kondisi tubuh / mesin",
        "kanji": "調子"
      },
      {
        "jp": "いちど (一度)",
        "reading": "ichido",
        "id": "Satu kali / Sekali",
        "kanji": "一度"
      },
      {
        "jp": "いちども (一度も)",
        "reading": "ichido mo",
        "id": "Belum pernah sama sekali (diikuti negatif) / Sekalipun",
        "kanji": "一度も"
      },
      {
        "jp": "だんだん",
        "reading": "dandan",
        "id": "Berangsur-angsur / makin lama makin / Sedikit demi sedikit, berangsur-angsur"
      },
      {
        "jp": "もうすぐ",
        "reading": "mousugu",
        "id": "Sebentar lagi"
      },
      {
        "jp": "おかげさまで",
        "reading": "okagesama de",
        "id": "Berkat doa Anda (puji syukur) / Atas berkat ( doa ) anda"
      },
      {
        "jp": "かんぱい (乾杯)",
        "reading": "kanpai",
        "id": "Bersulang! / Toast",
        "kanji": "乾杯"
      },
      {
        "jp": "のぼります (登ります、上ります)",
        "reading": "noborimasu",
        "id": "Naik , mendaki",
        "kanji": "登ります、上ります"
      },
      {
        "jp": "れんしゅう (練習)",
        "reading": "renshuu",
        "id": "Latihan",
        "kanji": "練習"
      },
      {
        "jp": "ゴルフ",
        "reading": "ゴrufu",
        "id": "Golf"
      },
      {
        "jp": "すもう (相撲)",
        "reading": "sumou",
        "id": "Sumo",
        "kanji": "相撲"
      },
      {
        "jp": "おちゃ (お茶)",
        "reading": "ocha",
        "id": "Teh",
        "kanji": "お茶"
      },
      {
        "jp": "ひ (日)",
        "reading": "hi",
        "id": "Hari",
        "kanji": "日"
      },
      {
        "jp": "でも",
        "reading": "demo",
        "id": "Tetapi"
      },
      {
        "jp": "ダイエット",
        "reading": "daietto",
        "id": "Diet"
      },
      {
        "jp": "むりな (無理な)",
        "reading": "murina",
        "id": "Paksa, berlebihan, tidak mungkin",
        "kanji": "無理な"
      },
      {
        "jp": "からだにいい (体にいい)",
        "reading": "karadaniii",
        "id": "Baik untuk tubuh",
        "kanji": "体にいい"
      },
      {
        "jp": "とうきょうスカイツリー",
        "reading": "toukyousukaitsurii",
        "id": "Tokyo sky tree"
      },
      {
        "jp": "さどう (茶道)",
        "reading": "sadou",
        "id": "Upacara minum teh",
        "kanji": "茶道"
      },
      {
        "jp": "かどう (華道)",
        "reading": "kadou",
        "id": "Seni merangkai bunga",
        "kanji": "華道"
      },
      {
        "jp": "しょどう (書道)",
        "reading": "shodou",
        "id": "Seni menulis huruf Jepang",
        "kanji": "書道"
      },
      {
        "jp": "かぶき (歌舞伎)",
        "reading": "kabuki",
        "id": "Kabuki (Drama tradisional Jepang)",
        "kanji": "歌舞伎"
      },
      {
        "jp": "のう (能)",
        "reading": "nou",
        "id": "Noh (Drama topeng tradisional)",
        "kanji": "能"
      },
      {
        "jp": "ぶんらく (文楽)",
        "reading": "bunraku",
        "id": "Bunraku (Wayang golek tradisional Jepang)",
        "kanji": "文楽"
      },
      {
        "jp": "じゅうどう (柔道)",
        "reading": "juudou",
        "id": "Judo (Olahraga tradisional Jepang)",
        "kanji": "柔道"
      },
      {
        "jp": "けんどう (剣道)",
        "reading": "kendou",
        "id": "Kendo (Olahraga tradisional Jepang)",
        "kanji": "剣道"
      },
      {
        "jp": "からて (空手)",
        "reading": "karate",
        "id": "Karate (olahraga beladiri Jepang)",
        "kanji": "空手"
      },
      {
        "jp": "まんざい・らくご (漫才・落語)",
        "reading": "manzai/rakugo",
        "id": "Lelucon, komedi",
        "kanji": "漫才・落語"
      },
      {
        "jp": "いご・しょうぎ (囲碁・将棋)",
        "reading": "igo/shougi",
        "id": "Catur Jepang",
        "kanji": "囲碁・将棋"
      },
      {
        "jp": "パチンコ",
        "reading": "pachinko",
        "id": "Pacinko"
      },
      {
        "jp": "カラオケ",
        "reading": "karaoke",
        "id": "Karaoke"
      },
      {
        "jp": "ぼんおどり (盆踊り)",
        "reading": "bonodori",
        "id": "Tarian bon",
        "kanji": "盆踊り"
      }
    ]
  },
  {
    "chapter": 20,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 20: Bahasa Kasual / Percakapan Akrab (普通形 Futsuukei)",
    "theme": "Gaya Bahasa Biasa (Bentuk Biasa) Antar Teman Dekat & Keluarga",
    "summary": "Konversi bentuk sopan (Teineigo) ke bentuk biasa/kasual (Futsuukei). Intonasi pertanyaan tanpa ka, penghilangan da pada percakapan kata sifat-na/benda, dan partikel akhir kasual.",
    "grammarPatterns": [
      {
        "id": "m20-1",
        "pattern": "Tabel Perubahan Bentuk Biasa (Futsuukei)",
        "formula": "Iku (ikimasu) | Ikanai (ikimasen) | Itta (ikimashita) | Ikanakatta (ikimasen deshita)",
        "explanation": "Dipakai berbicara akrab dengan teman sebaya, keluarga, atau bawahan.",
        "examples": [
          {
            "jp": "明日 東京へ 行く？ うん、行く。",
            "reading": "Ashita Toukyou e iku? Un, iku.",
            "id": "Besok kamu pergi ke Tokyo? Ya, pergi."
          },
          {
            "jp": "コーヒーを 飲む？ ううん、飲まない。",
            "reading": "Koohii o nomu? Uun, nomanai.",
            "id": "Mau minum kopi? Nggak, nggak minum."
          }
        ]
      },
      {
        "id": "m20-2",
        "pattern": "Pertanyaan dalam Bentuk Kasual",
        "formula": "Kalimat bentuk biasa + intonasi naik ↗ (tanpa partikel ka)",
        "explanation": "Pada kata benda dan kata sifat-na, \"da\" dihilangkan saat bertanya, diganti intonasi naik.",
        "examples": [
          {
            "jp": "今 暇？ うん、暇だよ。",
            "reading": "Ima hima? Un, hima da yo.",
            "id": "Sekarang kamu senggang? Ya, senggang kok."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "いります (要ります)",
        "reading": "irimasu",
        "id": "Perlu / membutuhkan / Memerlukan",
        "kanji": "要ります"
      },
      {
        "jp": "しらべます (調べます)",
        "reading": "shirabemasu",
        "id": "Memeriksa / mencari tahu / Memeriksa,meneliti,mengecek",
        "kanji": "調べます"
      },
      {
        "jp": "なおします (直します)",
        "reading": "naoshimasu",
        "id": "Memperbaiki",
        "kanji": "直します"
      },
      {
        "jp": "しゅうりします (修理します)",
        "reading": "shuuri shimasu",
        "id": "Mereparasi / Memperbaiki",
        "kanji": "修理します"
      },
      {
        "jp": "でんわします (電話します)",
        "reading": "denwa shimasu",
        "id": "Menelepon",
        "kanji": "電話します"
      },
      {
        "jp": "ぼく (僕)",
        "reading": "boku",
        "id": "Aku (laki-laki akrab)",
        "kanji": "僕"
      },
      {
        "jp": "きみ (君)",
        "reading": "kimi",
        "id": "Kamu (akrab)",
        "kanji": "君"
      },
      {
        "jp": "うん",
        "reading": "un",
        "id": "Iya / ya (kasual dari hai)"
      },
      {
        "jp": "ううん",
        "reading": "uun",
        "id": "Nggak / tidak (kasual dari iie)"
      },
      {
        "jp": "サラリーマン",
        "reading": "sarariiman",
        "id": "Karyawan kantoran bergaji"
      },
      {
        "jp": "ことば (言葉)",
        "reading": "kotoba",
        "id": "Kata / bahasa",
        "kanji": "言葉"
      },
      {
        "jp": "ぶっか (物価)",
        "reading": "bukka",
        "id": "Harga barang komoditas",
        "kanji": "物価"
      },
      {
        "jp": "きもの (着物)",
        "reading": "kimono",
        "id": "Kimono (pakaian adat Jepang)",
        "kanji": "着物"
      },
      {
        "jp": "ビザ",
        "reading": "biza",
        "id": "Visa"
      },
      {
        "jp": "はじめ (初め)",
        "reading": "hajime",
        "id": "Awal mula",
        "kanji": "初め"
      },
      {
        "jp": "おわり (終わり)",
        "reading": "owari",
        "id": "Akhir / tamat",
        "kanji": "終わり"
      },
      {
        "jp": "～くん (～君)",
        "reading": "~kun",
        "id": "Saudara~",
        "kanji": "～君"
      },
      {
        "jp": "ことば",
        "reading": "kotoba",
        "id": "Kata, kosakata ,bahasa"
      },
      {
        "jp": "はじめ",
        "reading": "hajime",
        "id": "Awal, mula-mula"
      },
      {
        "jp": "おわり",
        "reading": "owari",
        "id": "Akhir"
      },
      {
        "jp": "こっち",
        "reading": "kotchi",
        "id": "Sini"
      },
      {
        "jp": "そっち",
        "reading": "sotchi",
        "id": "Situ"
      },
      {
        "jp": "あっち",
        "reading": "atchi",
        "id": "Sana"
      },
      {
        "jp": "どっち",
        "reading": "dotchi",
        "id": "mana"
      },
      {
        "jp": "みんなで",
        "reading": "minnade",
        "id": "Kita semua"
      },
      {
        "jp": "～けど",
        "reading": "~kedo",
        "id": "Tetapi"
      },
      {
        "jp": "おなかがいっぱいです",
        "reading": "onakagaippaidesu",
        "id": "Kenyang"
      },
      {
        "jp": "よかったら",
        "reading": "yokattara",
        "id": "Kalau mau, kalau suka"
      },
      {
        "jp": "いろいろ",
        "reading": "iroiro",
        "id": "Macam-macam"
      }
    ]
  },
  {
    "chapter": 21,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 21: Pendapat & Kutipan Kalimat (〜と思う・〜と言いました)",
    "theme": "Opini Pribadi (To omoimasu), Kutipan Ucapan Orang (To iimashita), dan Konfirmasi (~deshou)",
    "summary": "Menyampaikan pendapat \"Saya kira/berpikir...\" (~to omoimasu), mengutip perkataan orang lain secara langsung atau tak langsung (~to iimashita), dan meminta persetujuan (~deshou).",
    "grammarPatterns": [
      {
        "id": "m21-1",
        "pattern": "Bentuk Biasa (Futsuukei) + と 思います (Saya Pikir/Kira...)",
        "formula": "Kalimat [Futsuukei] + to omoimasu",
        "explanation": "Menyampaikan perkiraan atau opini subjektif si pembicara.",
        "examples": [
          {
            "jp": "明日 雨が 降ると 思います。",
            "reading": "Ashita ame ga furu to omoimasu.",
            "id": "Saya kira besok akan turun hujan."
          },
          {
            "jp": "日本は 物価が 高いと 思います。",
            "reading": "Nihon wa bukka ga takai to omoimasu.",
            "id": "Menurut saya harga barang di Jepang mahal."
          }
        ]
      },
      {
        "id": "m21-2",
        "pattern": "Kalimat + と 言いました (Berkata Bahwa...)",
        "formula": "Kalimat [Kutipan Futsuukei] + to iimashita",
        "explanation": "Mengutip ujaran atau pernyataan yang pernah diucapkan orang lain.",
        "examples": [
          {
            "jp": "田中さんは 「明日 休みます」と 言いました。",
            "reading": "Tanaka-san wa \"ashita yasumimasu\" to iimashita.",
            "id": "Tuan Tanaka berkata, \"Besok saya libur\"."
          },
          {
            "jp": "来週 会議が あると 言いました。",
            "reading": "Raishuu kaigi ga aru to iimashita.",
            "id": "Beliau berkata bahwa minggu depan ada rapat."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "おもいます (思います)",
        "reading": "omoimasu",
        "id": "Berpikir / berpendapat / Mengira, berfikir",
        "kanji": "思います"
      },
      {
        "jp": "いいます (言います)",
        "reading": "iimasu",
        "id": "Berkata / berucap / Berkata, mengatakan",
        "kanji": "言います"
      },
      {
        "jp": "たります (足ります)",
        "reading": "tarimasu",
        "id": "Cukup",
        "kanji": "足ります"
      },
      {
        "jp": "かちます (勝ちます)",
        "reading": "kachimasu",
        "id": "Menang",
        "kanji": "勝ちます"
      },
      {
        "jp": "まけます (負けます)",
        "reading": "makemasu",
        "id": "Kalah",
        "kanji": "負けます"
      },
      {
        "jp": "あります [お祭りが〜]",
        "reading": "arimasu",
        "id": "Diadakan / berlangsung [festival]"
      },
      {
        "jp": "やくにたちます (役に立ちます)",
        "reading": "yaku ni tachimasu",
        "id": "Berguna / bermanfaat / Bermanfaat, berguna",
        "kanji": "役に立ちます"
      },
      {
        "jp": "うごきます (動きます)",
        "reading": "ugokimasu",
        "id": "Bergerak / beroperasi / Pindah, bergerak",
        "kanji": "動きます"
      },
      {
        "jp": "やめます [会社を〜]",
        "reading": "yamemasu",
        "id": "Berhenti [dari perusahaan]"
      },
      {
        "jp": "きをつけます (気をつけます)",
        "reading": "ki o tsukemasu",
        "id": "Berhati-hati",
        "kanji": "気をつけます"
      },
      {
        "jp": "りゅうがくします (留学します)",
        "reading": "ryuugaku shimasu",
        "id": "Belajar di luar negeri / Studi di luar negeri",
        "kanji": "留学します"
      },
      {
        "jp": "むだ [な]",
        "reading": "muda [na]",
        "id": "Sia-sia / mubazir"
      },
      {
        "jp": "ふべん [な] (不便)",
        "reading": "fuben [na]",
        "id": "Tidak praktis / repot",
        "kanji": "不便"
      },
      {
        "jp": "おなじ (同じ)",
        "reading": "onaji",
        "id": "Sama",
        "kanji": "同じ"
      },
      {
        "jp": "すごい",
        "reading": "sugoi",
        "id": "Hebat / luar biasa"
      },
      {
        "jp": "しゅしょう (首相)",
        "reading": "shushou",
        "id": "Perdana menteri",
        "kanji": "首相"
      },
      {
        "jp": "だいとうりょう (大統領)",
        "reading": "daitouryou",
        "id": "Presiden",
        "kanji": "大統領"
      },
      {
        "jp": "せいじ (政治)",
        "reading": "seiji",
        "id": "Politik",
        "kanji": "政治"
      },
      {
        "jp": "ニュース",
        "reading": "nyuusu",
        "id": "Berita / Siaran, pengumuman"
      },
      {
        "jp": "やめます（を）",
        "reading": "yamemasu (o)",
        "id": "Berhenti"
      },
      {
        "jp": "きをつけます (気を付けます)",
        "reading": "kiotsukemasu",
        "id": "Berhati-hati, berwaspada",
        "kanji": "気を付けます"
      },
      {
        "jp": "むだな",
        "reading": "mudana",
        "id": "Sia-sia, tidak berguna"
      },
      {
        "jp": "ふべんな (不便な)",
        "reading": "fubenna",
        "id": "Tidak praktis",
        "kanji": "不便な"
      },
      {
        "jp": "ほんとう",
        "reading": "hontou",
        "id": "Betul ,benar"
      },
      {
        "jp": "うそ",
        "reading": "uso",
        "id": "Bohong"
      },
      {
        "jp": "じどうしゃ (自動車)",
        "reading": "jidousha",
        "id": "Mobil",
        "kanji": "自動車"
      },
      {
        "jp": "こうつう (交通)",
        "reading": "koutsuu",
        "id": "Lalu lintas",
        "kanji": "交通"
      },
      {
        "jp": "ぶっか (物価)",
        "reading": "bukka",
        "id": "Harga barang",
        "kanji": "物価"
      },
      {
        "jp": "アニメ",
        "reading": "anime",
        "id": "Animasi"
      },
      {
        "jp": "マンガ",
        "reading": "manga",
        "id": "Komik"
      },
      {
        "jp": "デザイン",
        "reading": "dezain",
        "id": "Desain, model"
      },
      {
        "jp": "ゆめ (夢)",
        "reading": "yume",
        "id": "Mimpi",
        "kanji": "夢"
      },
      {
        "jp": "てんさい (天才)",
        "reading": "tensai",
        "id": "Genius",
        "kanji": "天才"
      },
      {
        "jp": "しあい (試合)",
        "reading": "shiai",
        "id": "Pertandingan",
        "kanji": "試合"
      },
      {
        "jp": "いけん (意見)",
        "reading": "iken",
        "id": "Pendapat",
        "kanji": "意見"
      },
      {
        "jp": "はなし (話)",
        "reading": "hanashi",
        "id": "Cerita",
        "kanji": "話"
      },
      {
        "jp": "ちきゅう (地球)",
        "reading": "chikyuu",
        "id": "Bumi",
        "kanji": "地球"
      },
      {
        "jp": "つき (月)",
        "reading": "tsuki",
        "id": "Bulan",
        "kanji": "月"
      },
      {
        "jp": "さいきん (最近)",
        "reading": "saikin",
        "id": "Akhir-akhir ini",
        "kanji": "最近"
      },
      {
        "jp": "たぶん",
        "reading": "tabun",
        "id": "Mungkin, barangkali"
      },
      {
        "jp": "きっと",
        "reading": "kitto",
        "id": "Pasti"
      },
      {
        "jp": "ほんとうに",
        "reading": "hontouni",
        "id": "Betul-betul"
      },
      {
        "jp": "そんなに",
        "reading": "sonnani",
        "id": "Tidak begitu (diikuti kata negatif)"
      },
      {
        "jp": "～について",
        "reading": "~nitsuite",
        "id": "Tentang ~"
      },
      {
        "jp": "ひさしぶりですね (久しぶりですね)",
        "reading": "hisashiburidesune",
        "id": "Sudah lama tidak bertemu ya",
        "kanji": "久しぶりですね"
      },
      {
        "jp": "もちろん",
        "reading": "mochiron",
        "id": "Tentu saja"
      },
      {
        "jp": "やくしょくめい (役職名)",
        "reading": "yakushokumei",
        "id": "Nama-nama jabatan",
        "kanji": "役職名"
      },
      {
        "jp": "とどうふけん (都道府県)",
        "reading": "todoufuken",
        "id": "Prefektur",
        "kanji": "都道府県"
      },
      {
        "jp": "し (市)",
        "reading": "shi",
        "id": "Kota",
        "kanji": "市"
      },
      {
        "jp": "まち (町)",
        "reading": "machi",
        "id": "Distrik,daerah",
        "kanji": "町"
      },
      {
        "jp": "むら (村)",
        "reading": "mura",
        "id": "Desa",
        "kanji": "村"
      },
      {
        "jp": "しゅしょう（ないかくそうりだいじん） (首相（内閣総理大臣）)",
        "reading": "shushou (naikakusouridaijin)",
        "id": "Perdana menteri",
        "kanji": "首相（内閣総理大臣）"
      },
      {
        "jp": "ちじ (知事)",
        "reading": "chiji",
        "id": "Gubernur",
        "kanji": "知事"
      },
      {
        "jp": "しちょう (市長)",
        "reading": "shichou",
        "id": "Wali kota",
        "kanji": "市長"
      },
      {
        "jp": "ちょうちょう (町長)",
        "reading": "chouchou",
        "id": "Kepala daerah",
        "kanji": "町長"
      },
      {
        "jp": "そんちょう (村長)",
        "reading": "sonchou",
        "id": "Kepala desa",
        "kanji": "村長"
      },
      {
        "jp": "がくちょう (学長)",
        "reading": "gakuchou",
        "id": "Rektor",
        "kanji": "学長"
      },
      {
        "jp": "こうちょう (校長)",
        "reading": "kouchou",
        "id": "Kepala sekolah",
        "kanji": "校長"
      },
      {
        "jp": "えんちょう (園長)",
        "reading": "enchou",
        "id": "Kepala TK",
        "kanji": "園長"
      },
      {
        "jp": "かいちょう (会長)",
        "reading": "kaichou",
        "id": "Ketua",
        "kanji": "会長"
      },
      {
        "jp": "じゅうやく (重役)",
        "reading": "juuyaku",
        "id": "Direktur",
        "kanji": "重役"
      },
      {
        "jp": "ぶちょう (部長)",
        "reading": "buchou",
        "id": "Kepala bagian",
        "kanji": "部長"
      },
      {
        "jp": "かちょう (課長)",
        "reading": "kachou",
        "id": "Kepala seksi",
        "kanji": "課長"
      },
      {
        "jp": "とうどり (頭取)",
        "reading": "toudori",
        "id": "Direktur bank",
        "kanji": "頭取"
      },
      {
        "jp": "してんちょう (支店長)",
        "reading": "shitenchou",
        "id": "Kepala kantor cabang",
        "kanji": "支店長"
      },
      {
        "jp": "えきちょう (駅長)",
        "reading": "ekichou",
        "id": "Kepala stasiun",
        "kanji": "駅長"
      },
      {
        "jp": "いんちょう (院長)",
        "reading": "inchou",
        "id": "Direktur rumah sakit",
        "kanji": "院長"
      },
      {
        "jp": "かんごしちょう (看護師長)",
        "reading": "kangoshichou",
        "id": "Kepala perawat",
        "kanji": "看護師長"
      },
      {
        "jp": "けいさつ (警察)",
        "reading": "keisatsu",
        "id": "Kantor polisi",
        "kanji": "警察"
      },
      {
        "jp": "しょちょう (署長)",
        "reading": "shochou",
        "id": "Kepala kantor polisi",
        "kanji": "署長"
      }
    ]
  },
  {
    "chapter": 22,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 22: Menerangkan Kata Benda / Anak Kalimat (名詞修飾)",
    "theme": "Klausa Relatif: Menjelaskan Kata Benda Menggunakan Kalimat Bentuk Biasa",
    "summary": "Dalam bahasa Jepang, seluruh kalimat penjelas diletakkan langsung di depan kata benda yang diterangkan (tanpa kata \"yang\"). Subjek anak kalimat wajib memakai partikel が (ga).",
    "grammarPatterns": [
      {
        "id": "m22-1",
        "pattern": "Kalimat Bentuk Biasa (Futsuukei) + Kata Benda",
        "formula": "[Kalimat Penjelas Futsuukei] + KB",
        "explanation": "Menyusun anak kalimat yang berfungsi sebagai atribut penerang kata benda.",
        "examples": [
          {
            "jp": "これは ミラーさんが 住んでいる 家です。",
            "reading": "Kore wa Miraa-san ga sunde iru ie desu.",
            "id": "Ini adalah rumah tempat Tuan Miller tinggal."
          },
          {
            "jp": "昨日 買った 本は 面白かったです。",
            "reading": "Kinou katta hon wa omoshirokatta desu.",
            "id": "Buku yang dibeli kemarin sangat menarik."
          },
          {
            "jp": "あそこで 新聞を 読んでいる 人は 誰ですか。",
            "reading": "Asoko de shinbun o yonde iru hito wa dare desu ka.",
            "id": "Orang yang sedang membaca koran di sana itu siapa?"
          }
        ]
      },
      {
        "id": "m22-2",
        "pattern": "[KK Kamus + Waktu / Janji / Urusan] が あります",
        "formula": "KK [jisho-kei] + jikan / yakusoku / youji [ga arimasu]",
        "explanation": "Menyatakan memiliki waktu, janji, atau kesibukan untuk melakukan suatu kegiatan.",
        "examples": [
          {
            "jp": "朝ご飯を 食べる 時間が ありません。",
            "reading": "Asagohan o taberu jikan ga arimasen.",
            "id": "Tidak ada waktu untuk sarapan."
          },
          {
            "jp": "友達と 映画を 見る 約束が あります。",
            "reading": "Tomodachi to eiga o miru yakusoku ga arimasu.",
            "id": "Ada janji menonton film bersama teman."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "きます (着ます)",
        "reading": "kimasu",
        "id": "Mengenakan (baju/kemeja bagian atas) / Memakai (pakaian)",
        "kanji": "着ます"
      },
      {
        "jp": "はきます",
        "reading": "hakimasu",
        "id": "Mengenakan (celana/sepatu bagian bawah) / Memakai (sepatu,celana)"
      },
      {
        "jp": "かぶります",
        "reading": "kaburimasu",
        "id": "Mengenakan (topi/helm) / Memakai (topi)"
      },
      {
        "jp": "かけます [めがねを〜]",
        "reading": "kakemasu",
        "id": "Mengenakan [kacamata]"
      },
      {
        "jp": "うまれます (生まれます)",
        "reading": "umaremasu",
        "id": "Lahir",
        "kanji": "生まれます"
      },
      {
        "jp": "コート",
        "reading": "kooto",
        "id": "Mantel / jas tebal"
      },
      {
        "jp": "スーツ",
        "reading": "suutsu",
        "id": "Setelan jas kantor / Pakaian setelan"
      },
      {
        "jp": "セーター",
        "reading": "seetaa",
        "id": "Baju hangat sweater / Sweter / baju hangat"
      },
      {
        "jp": "ぼうし (帽子)",
        "reading": "boushi",
        "id": "Topi",
        "kanji": "帽子"
      },
      {
        "jp": "めがね (眼鏡)",
        "reading": "megane",
        "id": "Kacamata",
        "kanji": "眼鏡"
      },
      {
        "jp": "よく [お祝い〜]",
        "reading": "yoku",
        "id": "Sering"
      },
      {
        "jp": "おめでとうございます",
        "reading": "omedetou gozaimasu",
        "id": "Selamat! (ucapan selamat)"
      },
      {
        "jp": "かけます（を）",
        "reading": "kakemasu (o)",
        "id": "Memakai (kacamata)"
      },
      {
        "jp": "します（を）",
        "reading": "shimasu (o)",
        "id": "Memakai (dasi)"
      },
      {
        "jp": "わたしたち",
        "reading": "watashitachi",
        "id": "Kami,kita"
      },
      {
        "jp": "ケーキ",
        "reading": "keeki",
        "id": "Kue"
      },
      {
        "jp": "おべんとう (お弁当)",
        "reading": "obentou",
        "id": "Bekal",
        "kanji": "お弁当"
      },
      {
        "jp": "ロボット",
        "reading": "robotto",
        "id": "Robot"
      },
      {
        "jp": "ユーモア",
        "reading": "yuumoa",
        "id": "Humor"
      },
      {
        "jp": "つごう (都合)",
        "reading": "tsugou",
        "id": "Kondisi, keadaan",
        "kanji": "都合"
      },
      {
        "jp": "よく",
        "reading": "yoku",
        "id": "Sering , dengan baik"
      },
      {
        "jp": "では",
        "reading": "deha",
        "id": "Kalau begitu"
      },
      {
        "jp": "やちん (家賃)",
        "reading": "yachin",
        "id": "Biaya sewa rumah",
        "kanji": "家賃"
      },
      {
        "jp": "ダイニングキッチン",
        "reading": "dainingukitchin",
        "id": "Ruang makan dengan dapur"
      },
      {
        "jp": "わしつ (和室)",
        "reading": "washitsu",
        "id": "Kamar ala Jepang",
        "kanji": "和室"
      },
      {
        "jp": "おしいれ (押し入れ)",
        "reading": "oshiire",
        "id": "Lemari dinding ala Jepang",
        "kanji": "押し入れ"
      },
      {
        "jp": "ふとん (布団)",
        "reading": "futon",
        "id": "Selimut dan kasur berisi kapas ala Jepang",
        "kanji": "布団"
      },
      {
        "jp": "パリ",
        "reading": "pari",
        "id": "Paris"
      },
      {
        "jp": "ばんりのちょうじょう (万里の長城)",
        "reading": "banrinochoujou",
        "id": "Tembok besar cina",
        "kanji": "万里の長城"
      },
      {
        "jp": "ワンピース",
        "reading": "wanpiisu",
        "id": "Pakaian terusan"
      },
      {
        "jp": "うわぎ (上着)",
        "reading": "uwagi",
        "id": "Jas",
        "kanji": "上着"
      },
      {
        "jp": "パンツ",
        "reading": "pantsu",
        "id": "Celana panjang"
      },
      {
        "jp": "ジーンズ",
        "reading": "jiinzu",
        "id": "Celana jeans"
      },
      {
        "jp": "スカート",
        "reading": "sukaato",
        "id": "Rok"
      },
      {
        "jp": "ブラウス",
        "reading": "burausu",
        "id": "Blus"
      },
      {
        "jp": "ワイシャツ",
        "reading": "waishatsu",
        "id": "Kemeja"
      },
      {
        "jp": "マフラー",
        "reading": "mafuraa",
        "id": "Shal, selendang"
      },
      {
        "jp": "くつした (靴下)",
        "reading": "kutsushita",
        "id": "Kaos kaki",
        "kanji": "靴下"
      },
      {
        "jp": "ストッキング",
        "reading": "sutokkingu",
        "id": "Stoking"
      },
      {
        "jp": "レインコート",
        "reading": "reinkooto",
        "id": "Jas hujan"
      },
      {
        "jp": "ベルト",
        "reading": "beruto",
        "id": "Sabuk, ikat pinggang"
      },
      {
        "jp": "ハイヒール",
        "reading": "haihiiru",
        "id": "Sepatu berhak tinggi"
      },
      {
        "jp": "ブーツ",
        "reading": "buutsu",
        "id": "Sepatu bot"
      },
      {
        "jp": "ぞうり",
        "reading": "zouri",
        "id": "Sandal tradisional Jepang"
      },
      {
        "jp": "たび",
        "reading": "tabi",
        "id": "Kaos kaki tradisional Jepang"
      },
      {
        "jp": "おび (帯)",
        "reading": "obi",
        "id": "Ikat pinggang tradisional Jepang",
        "kanji": "帯"
      }
    ]
  },
  {
    "chapter": 23,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 23: Waktu / Kondisi & Hubungan Sebab-Akibat Otomatis (〜とき・〜と)",
    "theme": "Ketika Berbuat/Kondisi (~toki) dan Syarat Pasti/Otomatis (~to: Kalau... maka pasti...)",
    "summary": "Menggunakan \"toki\" untuk menyatakan waktu saat melakukan sesuatu atau saat masih kecil/muda, dan partikel \"to\" untuk hubungan alamiah atau petunjuk jalan mekanis.",
    "grammarPatterns": [
      {
        "id": "m23-1",
        "pattern": "KK / Kata Sifat / KB の + とき (~ toki: Ketika...)",
        "formula": "KK [jisho/ta/nai] / I-Kei / Na-Kei [+na] / KB [+no] + toki",
        "explanation": "Menyatakan waktu ketika suatu peristiwa atau kondisi sedang/telah terjadi.",
        "examples": [
          {
            "jp": "図書館で 本を 借りる とき、カードが 要ります。",
            "reading": "Toshokan de hon o kariru toki, kaado ga irimasu.",
            "id": "Ketika meminjam buku di perpustakaan, memerlukan kartu."
          },
          {
            "jp": "時間が ない とき、朝ご飯を 食べません。",
            "reading": "Jikan ga nai toki, asagohan o tabemasen.",
            "id": "Ketika tidak punya waktu, saya tidak sarapan."
          },
          {
            "jp": "子供の とき、よく 川で 泳ぎました。",
            "reading": "Kodomo no toki, yoku kawa de oyogimashita.",
            "id": "Ketika masih anak-anak, saya sering berenang di sungai."
          }
        ]
      },
      {
        "id": "m23-2",
        "pattern": "KK Kamus + と、〜 (Kalau/Begitu..., maka otomatis...)",
        "formula": "KK [jisho-kei] + to, Akibat Alamiah/Mekanis",
        "explanation": "Menyatakan akibat tak terelakkan yang pasti terjadi, petunjuk arah jalan, atau pengoperasian mesin.",
        "examples": [
          {
            "jp": "この ボタンを 押すと、お釣りが出ます。",
            "reading": "Kono botan o osu to, otsuri ga demasu.",
            "id": "Kalau menekan tombol ini, uang kembalian akan keluar."
          },
          {
            "jp": "右へ 曲がると、郵便局が あります。",
            "reading": "Migi e magaru to, yuubinkyoku ga arimasu.",
            "id": "Kalau berbelok ke kanan, ada kantor pos."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "ききます [先生に〜]",
        "reading": "kikimasu",
        "id": "Bertanya [kepada guru]"
      },
      {
        "jp": "まわします (回します)",
        "reading": "mawashimasu",
        "id": "Memutar (keran/kenop)",
        "kanji": "回します"
      },
      {
        "jp": "ひきます (引きます)",
        "reading": "hikimasu",
        "id": "Menarik",
        "kanji": "引きます"
      },
      {
        "jp": "かえます (変えます)",
        "reading": "kaemasu",
        "id": "Mengubah",
        "kanji": "変えます"
      },
      {
        "jp": "さわります (触ります)",
        "reading": "sawarimasu",
        "id": "Menyentuh",
        "kanji": "触ります"
      },
      {
        "jp": "でます [おつりが〜]",
        "reading": "demasu",
        "id": "Keluar [uang kembalian]"
      },
      {
        "jp": "あるきます (歩きます)",
        "reading": "arukimasu",
        "id": "Berjalan kaki",
        "kanji": "歩きます"
      },
      {
        "jp": "わたります (渡ります)",
        "reading": "watarimasu",
        "id": "Menyeberang (jalan/jembatan)",
        "kanji": "渡ります"
      },
      {
        "jp": "こしょう (故障)",
        "reading": "koshou",
        "id": "Kerusakan mesin",
        "kanji": "故障"
      },
      {
        "jp": "みち (道)",
        "reading": "michi",
        "id": "Jalanan",
        "kanji": "道"
      },
      {
        "jp": "こうさてん (交差点)",
        "reading": "kousaten",
        "id": "Persimpangan jalan / perempatan",
        "kanji": "交差点"
      },
      {
        "jp": "しんごう (信号)",
        "reading": "shingou",
        "id": "Lampu lalu lintas",
        "kanji": "信号"
      },
      {
        "jp": "かど (角)",
        "reading": "kado",
        "id": "Sudut / pojokan jalan",
        "kanji": "角"
      },
      {
        "jp": "はし (橋)",
        "reading": "hashi",
        "id": "Jembatan",
        "kanji": "橋"
      },
      {
        "jp": "ちゅうしゃじょう (駐車場)",
        "reading": "chuushajou",
        "id": "Tempat parkir",
        "kanji": "駐車場"
      },
      {
        "jp": "おゆ (お湯)",
        "reading": "oyu",
        "id": "Air panas",
        "kanji": "お湯"
      },
      {
        "jp": "サイズ",
        "reading": "saizu",
        "id": "Ukuran size"
      },
      {
        "jp": "ききます（に） (聞きます)",
        "reading": "kikimasu (ni)",
        "id": "Bertanya",
        "kanji": "聞きます"
      },
      {
        "jp": "でます（が） (出ます)",
        "reading": "demasu (ga)",
        "id": "Keluar",
        "kanji": "出ます"
      },
      {
        "jp": "まがります（へ） (曲がります)",
        "reading": "magarimasu (he)",
        "id": "Belok",
        "kanji": "曲がります"
      },
      {
        "jp": "さびしい (寂しい)",
        "reading": "sabishii",
        "id": "Sepi",
        "kanji": "寂しい"
      },
      {
        "jp": "おと (音)",
        "reading": "oto",
        "id": "Suara, bunyi",
        "kanji": "音"
      },
      {
        "jp": "たてもの (建物)",
        "reading": "tatemono",
        "id": "Bangunan, gedung",
        "kanji": "建物"
      },
      {
        "jp": "なんかいも (何回も)",
        "reading": "nankaimo",
        "id": "Berkali-kali",
        "kanji": "何回も"
      },
      {
        "jp": "～め (～目)",
        "reading": "~me",
        "id": "Yang ke -",
        "kanji": "～目"
      },
      {
        "jp": "どうろ (道路)",
        "reading": "douro",
        "id": "Jalan",
        "kanji": "道路"
      },
      {
        "jp": "ほどう (歩道)",
        "reading": "hodou",
        "id": "Trotoar",
        "kanji": "歩道"
      },
      {
        "jp": "しゃどう (車道)",
        "reading": "shadou",
        "id": "Jalan mobil",
        "kanji": "車道"
      },
      {
        "jp": "こうそくどうろ (高速道路)",
        "reading": "kousokudouro",
        "id": "Jalan tol",
        "kanji": "高速道路"
      },
      {
        "jp": "とおり (通り)",
        "reading": "toori",
        "id": "Jalan",
        "kanji": "通り"
      },
      {
        "jp": "おうだんほどう (横断歩道)",
        "reading": "oudanhodou",
        "id": "Tempat menyeberang, zebra cros",
        "kanji": "横断歩道"
      },
      {
        "jp": "ほどうきょう (歩道橋)",
        "reading": "hodoukyou",
        "id": "Jembatan penyeberangan",
        "kanji": "歩道橋"
      },
      {
        "jp": "さか (坂)",
        "reading": "saka",
        "id": "Lereng",
        "kanji": "坂"
      },
      {
        "jp": "ふみきり (踏切)",
        "reading": "fumikiri",
        "id": "Lintasan kereta api",
        "kanji": "踏切"
      },
      {
        "jp": "ガソリンスタンド",
        "reading": "gasorinsutando",
        "id": "Pompa bensin , pom bensin"
      },
      {
        "jp": "とまれ (止まれ)",
        "reading": "tomare",
        "id": "Berhenti",
        "kanji": "止まれ"
      },
      {
        "jp": "しんにゅうきんし (進入禁止)",
        "reading": "shinnyuukinshi",
        "id": "Dilarang masuk",
        "kanji": "進入禁止"
      },
      {
        "jp": "いっぽうつうこう (一方通行)",
        "reading": "ippoutsuukou",
        "id": "Satu arah",
        "kanji": "一方通行"
      },
      {
        "jp": "ちゅうしゃきんし (駐車禁止)",
        "reading": "chuushakinshi",
        "id": "Dilarang parkir",
        "kanji": "駐車禁止"
      },
      {
        "jp": "うせつきんし (右折禁止)",
        "reading": "usetsukinshi",
        "id": "Dilarang belok kanan",
        "kanji": "右折禁止"
      }
    ]
  },
  {
    "chapter": 24,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 24: Kebaikan Tindakan (〜てくれます・〜てもらいます・〜てあげます)",
    "theme": "Pemberian dan Penerimaan Bantuan / Tindakan Kebaikan",
    "summary": "Penggunaan agemasu, kuremasu, dan moraimasu dalam bentuk Te untuk menyatakan melakukan kebaikan bagi orang lain, menerima jasa baik, atau orang lain berbuat baik kepada saya.",
    "grammarPatterns": [
      {
        "id": "m24-1",
        "pattern": "KK bentuk-Te + くれます (Orang Lain Membantu Saya)",
        "formula": "Orang Lain [wa/ga] [watashi ni] KK [te-kei] + kuremasu",
        "explanation": "Digunakan saat orang lain melakukan suatu kebaikan bagi pembicara atau keluarga pembicara.",
        "examples": [
          {
            "jp": "佐藤さんは わたしに 傘を 貸して くれました。",
            "reading": "Satou-san wa watashi ni kasa o kashite kuremashita.",
            "id": "Sdr. Satou berbaik hati meminjamkan payung kepada saya."
          }
        ]
      },
      {
        "id": "m24-2",
        "pattern": "KK bentuk-Te + もらいます (Saya Meminta Bantuan Orang)",
        "formula": "Watashi [wa] Orang [ni] KK [te-kei] + moraimasu",
        "explanation": "Menyatakan bahwa pembicara memperoleh jasa perbuatan baik dari orang lain.",
        "examples": [
          {
            "jp": "わたしは 鈴木さんに 日本語を 教えて もらいました。",
            "reading": "Watashi wa Suzuki-san ni Nihongo o oshiete moraimashita.",
            "id": "Saya diajari bahasa Jepang oleh Sdr. Suzuki (memperoleh kebaikan Suzuki)."
          }
        ]
      },
      {
        "id": "m24-3",
        "pattern": "KK bentuk-Te + あげます (Saya Membantu Orang)",
        "formula": "Watashi [wa] Orang [ni] KK [te-kei] + agemasu",
        "explanation": "Melakukan perbuatan demi membantu orang lain (hindari jika berbicara langsung kepada atasan).",
        "examples": [
          {
            "jp": "わたしは 山田さんの 荷物を 持って あげました。",
            "reading": "Watashi wa Yamada-san no nimotsu o motte agemashita.",
            "id": "Saya membawakan barang milik Tuan Yamada."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "くれます",
        "reading": "kuremasu",
        "id": "Memberikan (kepada saya) / Diberikan"
      },
      {
        "jp": "つれていきます (連れて行きます)",
        "reading": "tsurete ikimasu",
        "id": "Mengajak pergi (orang/hewan) / Mengajak pergi, membawa, mengantarkan",
        "kanji": "連れて行きます"
      },
      {
        "jp": "つれてきます (連れて来ます)",
        "reading": "tsurete kimasu",
        "id": "Mengajak datang ke mari / Membawa datang",
        "kanji": "連れて来ます"
      },
      {
        "jp": "おくります [人を〜] (送ります)",
        "reading": "okurimasu",
        "id": "Mengantar [orang]",
        "kanji": "送ります"
      },
      {
        "jp": "しょうかいします (紹介します)",
        "reading": "shoukai shimasu",
        "id": "Memperkenalkan",
        "kanji": "紹介します"
      },
      {
        "jp": "あんないします (案内します)",
        "reading": "annai shimasu",
        "id": "Memandu / mengantar keliling / Memandu , mengantarkan",
        "kanji": "案内します"
      },
      {
        "jp": "せつめいします (説明します)",
        "reading": "setsumei shimasu",
        "id": "Menjelaskan",
        "kanji": "説明します"
      },
      {
        "jp": "おじいさん / おじいちゃん",
        "reading": "ojiisan",
        "id": "Kakek"
      },
      {
        "jp": "おばあさん / おばあちゃん",
        "reading": "obaasan",
        "id": "Nenek"
      },
      {
        "jp": "じゅんび (準備)",
        "reading": "junbi",
        "id": "Persiapan",
        "kanji": "準備"
      },
      {
        "jp": "ひっこし (引っ越し)",
        "reading": "hikkoshi",
        "id": "Pindah rumah",
        "kanji": "引っ越し"
      },
      {
        "jp": "ぜんぶ (全部)",
        "reading": "zenbu",
        "id": "Semuanya",
        "kanji": "全部"
      },
      {
        "jp": "じぶんで (自分で)",
        "reading": "jibun de",
        "id": "Sendiri / secara mandiri / Dengan sendiri",
        "kanji": "自分で"
      },
      {
        "jp": "なおします (直します)",
        "reading": "naoshimasu",
        "id": "Mengoreksi , memperbaiki",
        "kanji": "直します"
      },
      {
        "jp": "おくります（を） (送ります)",
        "reading": "okurimasu (o)",
        "id": "Mengantar (orang)",
        "kanji": "送ります"
      },
      {
        "jp": "おじいさん／おじいちゃん",
        "reading": "ojiisan/ojiichan",
        "id": "Kakek"
      },
      {
        "jp": "おばあさん／おばあちゃん",
        "reading": "obaasan/obaachan",
        "id": "Nenek"
      },
      {
        "jp": "おかし (お菓子)",
        "reading": "okashi",
        "id": "Kue, snack, makanan ringan",
        "kanji": "お菓子"
      },
      {
        "jp": "ホームステイ",
        "reading": "hooムsutei",
        "id": "Homestay"
      },
      {
        "jp": "ほかに",
        "reading": "hokani",
        "id": "Selain, yang lain"
      },
      {
        "jp": "ははのひ (母の日)",
        "reading": "hahanohi",
        "id": "Hari ibu",
        "kanji": "母の日"
      },
      {
        "jp": "ぞうとうのしゅうかん (贈答の習慣)",
        "reading": "zoutounoshuukan",
        "id": "Tukar menukar hadiah",
        "kanji": "贈答の習慣"
      },
      {
        "jp": "おとしだま (お年玉)",
        "reading": "otoshidama",
        "id": "Hadiah kecil yang diberikan orang tua dan keluarga kepada anak-anak pada tahun baru",
        "kanji": "お年玉"
      },
      {
        "jp": "にゅうがくいわい (入学祝い)",
        "reading": "nyuugakuiwai",
        "id": "Hadiah yang diberikan kepada anak yang masuk sekolah",
        "kanji": "入学祝い"
      },
      {
        "jp": "そつぎょういわい (卒業祝い)",
        "reading": "sotsugyouiwai",
        "id": "Hadiah yang diberikan kepada anak yang tamat sekolah",
        "kanji": "卒業祝い"
      },
      {
        "jp": "けっこんいわい (結婚祝い)",
        "reading": "kekkoniwai",
        "id": "Hadiah perkawinan",
        "kanji": "結婚祝い"
      },
      {
        "jp": "しゅっさんいわい (出産祝い)",
        "reading": "shussaniwai",
        "id": "Hadiah yang diberikan kepada orang yang melahirkan",
        "kanji": "出産祝い"
      },
      {
        "jp": "おちゅうげん／おせいぼ (お中元／お歳暮)",
        "reading": "ochuugen/oseibo",
        "id": "Hadiah yang diberikan kepada orang yang telah memberi bantuan",
        "kanji": "お中元／お歳暮"
      },
      {
        "jp": "おこうでん (お香典)",
        "reading": "okouden",
        "id": "Uang yang diberikan kepada keluarga yang berduka/ uang duka",
        "kanji": "お香典"
      },
      {
        "jp": "おみまい (お見舞い)",
        "reading": "omimai",
        "id": "Hadiah yang diberikan kepada orang yang sedang sakit",
        "kanji": "お見舞い"
      },
      {
        "jp": "のしぶくろ (熨斗袋)",
        "reading": "noshibukuro",
        "id": "Amplop khusus untuk hadiah uang",
        "kanji": "熨斗袋"
      }
    ]
  },
  {
    "chapter": 25,
    "level": "N5",
    "part": "Shokyu I (N5)",
    "title": "Bab 25: Pengandaian & Konsesi (〜たら・〜ても) [Puncak Shokyu I N5]",
    "theme": "Bentuk Pengandaian Syarat (~tara: Jika/Kalau sudah...) dan Pertentangan (~temo: Walaupun...)",
    "summary": "Penutup materi Minna no Nihongo Shokyu I (Level N5). Pola syarat pengandaian masa depan / kepastian urutan (~tara) dan pengandaian bertentangan (~te mo / de mo).",
    "grammarPatterns": [
      {
        "id": "m25-1",
        "pattern": "KK bentuk-Ta + ら、〜 (~ tara: Kalau/Jika/Setelah...)",
        "formula": "KK [ta-kei] + ra, Kalimat Pokok",
        "explanation": "Bentuk pengandaian yang paling luwes: bisa berarti hipotesis (\"seandainya...\"), atau kepastian waktu (\"kalau sudah sampai di sana...\").",
        "examples": [
          {
            "jp": "雨が 降ったら、出かけません。",
            "reading": "Ame ga futtara, dekakemasen.",
            "id": "Kalau hujan turun, saya tidak akan bepergian."
          },
          {
            "jp": "お金が あったら、旅行したいです。",
            "reading": "Okane ga attara, ryokou shitai desu.",
            "id": "Seandainya punya uang, saya ingin jalan-jalan berwisata."
          },
          {
            "jp": "駅に 着いたら、電話して ください。",
            "reading": "Eki ni tsuitara, denwa shite kudasai.",
            "id": "Kalau sudah tiba di stasiun, tolong telepon ya."
          }
        ]
      },
      {
        "id": "m25-2",
        "pattern": "KK bentuk-Te + も、〜 (~ te mo: Walaupun/Meskipun...)",
        "formula": "KK [te-kei] + mo / Sifat-i [-kute mo] / Sifat-na & KB [de mo]",
        "explanation": "Menyatakan bahwa akibat yang diharapkan tidak berubah meskipun kondisi syarat terpenuhi.",
        "examples": [
          {
            "jp": "雨が 降っても、サッカーを します。",
            "reading": "Ame ga futte mo, sakkaa o shimasu.",
            "id": "Walaupun hujan turun, tetap akan bermain sepak bola."
          },
          {
            "jp": "高くても、この パソコンを 買いたいです。",
            "reading": "Takakute mo, kono pasokon o kaitai desu.",
            "id": "Meskipun mahal, saya ingin membeli laptop ini."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "かんがえます (考えます)",
        "reading": "kangaemasu",
        "id": "Memikirkan",
        "kanji": "考えます"
      },
      {
        "jp": "つきます (着きます)",
        "reading": "tsukimasu",
        "id": "Tiba / sampai di tujuan / Tiba, sampai",
        "kanji": "着きます"
      },
      {
        "jp": "とります [年を〜]",
        "reading": "torimasu",
        "id": "Bertambah [usia / menua]"
      },
      {
        "jp": "いなか (田舎)",
        "reading": "inaka",
        "id": "Kampung halaman / desa / Desa, kampung halaman",
        "kanji": "田舎"
      },
      {
        "jp": "たいしかん (大使館)",
        "reading": "taishikan",
        "id": "Kedutaan besar",
        "kanji": "大使館"
      },
      {
        "jp": "グループ",
        "reading": "guruupu",
        "id": "Grup / kelompok"
      },
      {
        "jp": "チャンス",
        "reading": "chansu",
        "id": "Peluang / kesempatan"
      },
      {
        "jp": "おく (億)",
        "reading": "oku",
        "id": "100 juta / Ratus juta",
        "kanji": "億"
      },
      {
        "jp": "もし",
        "reading": "moshi",
        "id": "Jika / seandainya / Kalau"
      },
      {
        "jp": "いくら〜ても",
        "reading": "ikura ~te mo",
        "id": "Betapapun / sebanyak apapun ... tetap saja"
      },
      {
        "jp": "がんばります (頑張ります)",
        "reading": "ganbarimasu",
        "id": "Bersemangat / berjuang sekuat tenaga / Berusaha, bekerja keras",
        "kanji": "頑張ります"
      },
      {
        "jp": "とります（としを～） (取ります)",
        "reading": "torimasu (toshio~)",
        "id": "Berumur, usia lanjut",
        "kanji": "取ります"
      },
      {
        "jp": "たります (足ります)",
        "reading": "tarimasu",
        "id": "Cukup",
        "kanji": "足ります"
      },
      {
        "jp": "いみ (意味)",
        "reading": "imi",
        "id": "Arti",
        "kanji": "意味"
      },
      {
        "jp": "てんきん (転勤)",
        "reading": "tenkin",
        "id": "Pindah kerja, pindah ke kantor cabang lain",
        "kanji": "転勤"
      },
      {
        "jp": "こと",
        "reading": "koto",
        "id": "Hal"
      },
      {
        "jp": "ひまな (暇な)",
        "reading": "himana",
        "id": "Senggang, waktu luang",
        "kanji": "暇な"
      },
      {
        "jp": "いろいろおせわになりました (いろいろお世話になりました)",
        "reading": "iroiroosewaninarimashita",
        "id": "Terima kasih banyak bantuan anda yang telah diberikan",
        "kanji": "いろいろお世話になりました"
      },
      {
        "jp": "どうぞおげんきで (どうぞお元気で)",
        "reading": "douzoogenkide",
        "id": "Semoga sehat-sehat selalu",
        "kanji": "どうぞお元気で"
      },
      {
        "jp": "ひとのいっしょう (人の一生)",
        "reading": "hitonoisshou",
        "id": "Seumur hidup manusia",
        "kanji": "人の一生"
      },
      {
        "jp": "せいねん (青年)",
        "reading": "seinen",
        "id": "Remaja",
        "kanji": "青年"
      },
      {
        "jp": "ちゅうねん (中年)",
        "reading": "chuunen",
        "id": "Setengah baya",
        "kanji": "中年"
      },
      {
        "jp": "ろうじん (老人)",
        "reading": "roujin",
        "id": "Orang tua",
        "kanji": "老人"
      },
      {
        "jp": "ほいくえん (保育園)",
        "reading": "hoikuen",
        "id": "Play group",
        "kanji": "保育園"
      },
      {
        "jp": "ようちえん (幼稚園)",
        "reading": "youchien",
        "id": "TK",
        "kanji": "幼稚園"
      },
      {
        "jp": "たんだい (短大)",
        "reading": "tandai",
        "id": "Akademi",
        "kanji": "短大"
      },
      {
        "jp": "せんもんがっこう (専門学校)",
        "reading": "senmongakkou",
        "id": "Sekolah tinggi keahlian, sekolah kejuruan",
        "kanji": "専門学校"
      },
      {
        "jp": "しゅうしょくします (就職します)",
        "reading": "shuushokushimasu",
        "id": "Mendapat pekerjaan",
        "kanji": "就職します"
      },
      {
        "jp": "りこんします (離婚します)",
        "reading": "rikonshimasu",
        "id": "Bercerai",
        "kanji": "離婚します"
      },
      {
        "jp": "さいこんします (再婚します)",
        "reading": "saikonshimasu",
        "id": "Menikah lagi",
        "kanji": "再婚します"
      }
    ],
    "dialogue": {
      "title": "お世話になりました (Terima Kasih Atas Semua Bantuannya)",
      "lines": [
        {
          "speaker": "Miller",
          "jp": "佐藤さん、長い間 大変 お世話に なりました。",
          "reading": "Satou-san, nagai aida taihen osewa ni narimashita.",
          "id": "Sdr. Satou, terima kasih banyak atas semua bantuan dan bimbingannya selama ini."
        },
        {
          "speaker": "Satou",
          "jp": "いいえ、こちらこそ。国へ 帰っても、日本語の 勉強を 続けて くださいね。",
          "reading": "Iie, kochira koso. Kuni e kaette mo, Nihongo no benkyou o tsuzukete kudasai ne.",
          "id": "Sama-sama. Meskipun sudah kembali ke negara asal, tolong tetap lanjutkan belajar bahasa Jepangnya ya."
        },
        {
          "speaker": "Miller",
          "jp": "はい、頑張ります。どうぞ お元気で。",
          "reading": "Hai, ganbarimasu. Douzo ogenki de.",
          "id": "Baik, saya akan berjuang. Semoga senantiasa sehat selalu."
        }
      ]
    }
  }
];
