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
        "pattern": "KB1 は KB2 です (KB1 wa KB2 desu)",
        "formula": "Kata Benda 1 [wa] Kata Benda 2 [desu]",
        "explanation": "Menyatakan bahwa Subjek (KB1) adalah Predikat (KB2). Partikel 'wa' ditulis dengan hiragana は dan berfungsi sebagai penanda topik pembicaraan.",
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
        "pattern": "KB1 は KB2 じゃありません / ではありません (KB1 wa KB2 ja arimasen)",
        "formula": "KB1 [wa] KB2 [ja arimasen / dewa arimasen]",
        "explanation": "Bentuk negatif formal dari 'desu' (bukan / tidak). 'Ja arimasen' adalah ragam lisan percakapan, sedangkan 'dewa arimasen' lebih formal dalam tulisan atau pidato resmi.",
        "examples": [
          {
            "jp": "サントスさんは 学生じゃありません。",
            "reading": "Santosu-san wa gakusei ja arimasen.",
            "id": "Tuan Santos bukan seorang mahasiswa."
          },
          {
            "jp": "ミラーさんは 先生ではありません。",
            "reading": "Miraa-san wa sensei dewa arimasen.",
            "id": "Tuan Miller bukan seorang guru."
          }
        ]
      },
      {
        "id": "m1-3",
        "pattern": "KB1 は KB2 ですか (KB1 wa KB2 desu ka)",
        "formula": "Kalimat + [ka]?",
        "explanation": "Partikel penanya 'ka' diletakkan di akhir kalimat untuk mengubahnya menjadi kalimat tanya tanpa mengubah susunan kata.",
        "examples": [
          {
            "jp": "ミラーさんは 会社員ですか。",
            "reading": "Miraa-san wa kaishain desu ka.",
            "id": "Apakah Tuan Miller seorang karyawan perusahaan?"
          },
          {
            "jp": "あの方は どなたですか。",
            "reading": "Ano kata wa donata desu ka.",
            "id": "Siapakah beliau itu?"
          }
        ]
      },
      {
        "id": "m1-4",
        "pattern": "KB も (KB mo - juga)",
        "formula": "KB [mo]",
        "explanation": "Partikel 'mo' berarti 'juga', digunakan menggantikan partikel 'wa' apabila predikat yang dikenakan sama dengan topik sebelumnya.",
        "examples": [
          {
            "jp": "グプタさんも 会社員です。",
            "reading": "Guputa-san mo kaishain desu.",
            "id": "Tuan Gupta juga seorang karyawan perusahaan."
          }
        ]
      },
      {
        "id": "m1-5",
        "pattern": "KB1 の KB2 (KB1 no KB2)",
        "formula": "KB1 [no] KB2",
        "explanation": "Partikel 'no' menghubungkan dua kata benda. KB1 menerangkan atau memiliki KB2 (afiliasi, kepemilikan, atau organisasi).",
        "examples": [
          {
            "jp": "わたしは IMCの 社員です。",
            "reading": "Watashi wa IMC no shain desu.",
            "id": "Saya karyawan perusahaan IMC."
          },
          {
            "jp": "カリナさんは 富士大学の 学生です。",
            "reading": "Karina-san wa Fuji Daigaku no gakusei desu.",
            "id": "Karina adalah mahasiswi Universitas Fuji."
          }
        ]
      },
      {
        "id": "m1-6",
        "pattern": "Akhiran Kesopanan: 〜さん, 〜ちゃん, 〜人, 〜歳 / おいくつ",
        "formula": "[Nama] + san/chan; [Negara] + jin; [Angka] + sai",
        "explanation": "〜さん adalah gelar sapaan sopan (Bapak/Ibu/Sdr). 〜ちゃん untuk anak-anak. 〜人 menunjukkan warga negara. 〜歳 menunjukkan umur (tanya: nansai / oikutsu).",
        "examples": [
          {
            "jp": "テレサちゃんは 9歳です。",
            "reading": "Teresa-chan wa kyuu-sai desu.",
            "id": "Teresa berumur 9 tahun."
          },
          {
            "jp": "おいくつですか。25歳です。",
            "reading": "Oikutsu desu ka. Nijuugo-sai desu.",
            "id": "Berapa umur Anda? 25 tahun."
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
        "id": "Kamu"
      },
      {
        "jp": "あのひと (あの人)",
        "reading": "anohito",
        "id": "Orang itu (biasa)",
        "kanji": "あの人"
      },
      {
        "jp": "あのかた (あの方)",
        "reading": "anokata",
        "id": "Orang itu (sopan)",
        "kanji": "あの方"
      },
      {
        "jp": "～さん",
        "reading": "~san",
        "id": "Saudara……."
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
        "jp": "せんせい (先生)",
        "reading": "sensei",
        "id": "Guru,dosen",
        "kanji": "先生"
      },
      {
        "jp": "きょうし (教師)",
        "reading": "kyoushi",
        "id": "Guru,dosen (dipakai untuk kalangan sendiri)",
        "kanji": "教師"
      },
      {
        "jp": "がくせい (学生)",
        "reading": "gakusei",
        "id": "Siswa,murid",
        "kanji": "学生"
      },
      {
        "jp": "かいしゃいん (会社員)",
        "reading": "kaishain",
        "id": "Pegawai perusahaan",
        "kanji": "会社員"
      },
      {
        "jp": "しゃいん (社員)",
        "reading": "shain",
        "id": "Pegawai perusahaan",
        "kanji": "社員"
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
        "jp": "だれ",
        "reading": "dare",
        "id": "Siapa (biasa)"
      },
      {
        "jp": "どなた",
        "reading": "donata",
        "id": "Siapa (sopan)"
      },
      {
        "jp": "～さい (～歳)",
        "reading": "~sai",
        "id": "Umur…..",
        "kanji": "～歳"
      },
      {
        "jp": "なんさい (何歳)",
        "reading": "nansai",
        "id": "Umur berapa?(biasa)",
        "kanji": "何歳"
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
        "jp": "はじめまして",
        "reading": "hajimemashite",
        "id": "Perkenalkan"
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
      "title": "初めまして (Salam Kenal!)",
      "lines": [
        {
          "speaker": "Sato",
          "jp": "おはようございます。",
          "reading": "Ohayou gozaimasu.",
          "id": "Selamat pagi."
        },
        {
          "speaker": "Yamada",
          "jp": "おはようございます。佐藤さん、こちらはマイク・ミラーさんです。",
          "reading": "Ohayou gozaimasu. Satou-san, kochira wa Maiku Miraa-san desu.",
          "id": "Selamat pagi. Sdri. Sato, ini adalah Sdr. Mike Miller."
        },
        {
          "speaker": "Miller",
          "jp": "初めまして。マイク・ミラーです。アメリカから来ました。どうぞよろしく。",
          "reading": "Hajimemashite. Maiku Miraa desu. Amerika kara kimashita. Douzo yoroshiku.",
          "id": "Salam kenal. Saya Mike Miller. Datang dari Amerika Serikat. Senang berkenalan dengan Anda."
        },
        {
          "speaker": "Sato",
          "jp": "佐藤けい子です。どうぞよろしくお願いします。",
          "reading": "Satou Keiko desu. Douzo yoroshiku onegai shimasu.",
          "id": "Saya Keiko Sato. Senang berkenalan dengan Anda."
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
        "pattern": "これ / それ / あれ (Kore / Sore / Are)",
        "formula": "Kore / Sore / Are + wa + KB + desu",
        "explanation": "Kata tunjuk benda mandiri sebagai kata ganti. Kore (dekat pembicara), Sore (dekat lawan bicara), Are (jauh dari pembicara dan lawan bicara).",
        "examples": [
          {
            "jp": "これは 辞書です。",
            "reading": "Kore wa jisho desu.",
            "id": "Ini adalah kamus."
          },
          {
            "jp": "それは 傘です。",
            "reading": "Sore wa kasa desu.",
            "id": "Itu adalah payung."
          },
          {
            "jp": "あれは 銀行です。",
            "reading": "Are wa ginkou desu.",
            "id": "Yang di sana itu adalah bank."
          }
        ]
      },
      {
        "id": "m2-2",
        "pattern": "この KB / その KB / あの KB (Kono / Sono / Ano)",
        "formula": "Kono / Sono / Ano + Kata Benda + wa ...",
        "explanation": "Kata tunjuk yang langsung melekat dan menerangkan kata benda di belakangnya (tidak bisa berdiri sendiri).",
        "examples": [
          {
            "jp": "この 本は わたしのです。",
            "reading": "Kono hon wa watashi no desu.",
            "id": "Buku ini adalah milik saya."
          },
          {
            "jp": "あの方は どなたですか。",
            "reading": "Ano kata wa donata desu ka.",
            "id": "Siapakah orang yang di sana itu?"
          }
        ]
      },
      {
        "id": "m2-3",
        "pattern": "そうです / そうじゃありません (Sou desu / Sou ja arimasen)",
        "formula": "Hai, sou desu / Iie, sou ja arimasen (chigaimasu)",
        "explanation": "Digunakan untuk mengiyakan atau menyangkal pertanyaan tentang kata benda. 'Chigaimasu' sering dipakai untuk menyangkal dengan arti 'bukan / salah'.",
        "examples": [
          {
            "jp": "それは テレホンカードですか。はい、そうです。",
            "reading": "Sore wa terehon kaado desu ka. Hai, sou desu.",
            "id": "Apakah itu kartu telepon? Ya, betul."
          },
          {
            "jp": "それは シャープペンシルですか。いいえ、違います。",
            "reading": "Sore wa shaapu penshiru desu ka. Iie, chigaimasu.",
            "id": "Apakah itu pensil mekanik? Bukan, berbeda."
          }
        ]
      },
      {
        "id": "m2-4",
        "pattern": "Kalimat1 ですか、Kalimat2 ですか (Pertanyaan Alternatif)",
        "formula": "[K1] desu ka, [K2] desu ka",
        "explanation": "Menanyakan pilihan alternatif antara dua hal. Dalam menjawab, langsung sebutkan pilihan tanpa diawali 'hai' atau 'iie'.",
        "examples": [
          {
            "jp": "これは 「9」ですか、「7」ですか。「9」です。",
            "reading": "Kore wa 'kyuu' desu ka, 'nana' desu ka. 'Kyuu' desu.",
            "id": "Apakah ini angka '9' atau '7'? Ini angka '9'."
          }
        ]
      },
      {
        "id": "m2-5",
        "pattern": "KB1 の KB2 & Pengganti Pronomina (の)",
        "formula": "KB1 no [KB2] -> KB1 no",
        "explanation": "KB1 menerangkan topik isi KB2 (misal: jidousha no hon = buku tentang mobil) atau kepemilikan. Kata benda kedua dapat dihilangkan jika sudah jelas dari konteks.",
        "examples": [
          {
            "jp": "これは コンピューターの本です。",
            "reading": "Kore wa konpyuutaa no hon desu.",
            "id": "Ini adalah buku komputer."
          },
          {
            "jp": "あれは だれのかばんですか。佐藤さんのです。",
            "reading": "Are wa dare no kaban desu ka. Satou-san no desu.",
            "id": "Itu tas siapa? Milik Saudari Sato."
          }
        ]
      },
      {
        "id": "m2-6",
        "pattern": "そうですか (Sou desu ka)",
        "formula": "Sou desu ka (intonasi turun)",
        "explanation": "Diucapkan dengan intonasi menurun saat pembicara menerima informasi baru dari lawan bicara ('O, begitu ya...').",
        "examples": [
          {
            "jp": "この傘は あなたのですか。いいえ、違います。そうですか。",
            "reading": "Kono kasa wa anata no desu ka. Iie, chigaimasu. Sou desu ka.",
            "id": "Apakah payung ini milik Anda? Bukan. O, begitu ya."
          }
        ]
      }
    ],
    "keyVocab": [
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
        "reading": "kono～",
        "id": "～ini"
      },
      {
        "jp": "その～",
        "reading": "sono～",
        "id": "～itu (dekat)"
      },
      {
        "jp": "あの～",
        "reading": "ano～",
        "id": "～itu (jauh)"
      },
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
        "reading": "no-to",
        "id": "Buku catatan"
      },
      {
        "jp": "てちょう (手帳)",
        "reading": "techou",
        "id": "Buku agenda",
        "kanji": "手帳"
      },
      {
        "jp": "めいし (名刺)",
        "reading": "meishi",
        "id": "Kartu nama",
        "kanji": "名刺"
      },
      {
        "jp": "カード",
        "reading": "ka-do",
        "id": "Kartu"
      },
      {
        "jp": "えんぴつ (鉛筆)",
        "reading": "enpitsu",
        "id": "Pensil",
        "kanji": "鉛筆"
      },
      {
        "jp": "ボールペン",
        "reading": "bo-rupen",
        "id": "Bolpoin"
      },
      {
        "jp": "シャープペンシル",
        "reading": "sha-pupenshiru",
        "id": "Pensil mekanik"
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
        "id": "Jam , arloji",
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
        "reading": "konpyu-ta-",
        "id": "Komputer"
      },
      {
        "jp": "くるま (車)",
        "reading": "kuruma",
        "id": "Mobil",
        "kanji": "車"
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
        "reading": "chokore-to",
        "id": "Coklat"
      },
      {
        "jp": "コーヒー",
        "reading": "ko-hi-",
        "id": "Kopi"
      },
      {
        "jp": "おみやげ (お土産)",
        "reading": "omiyage",
        "id": "Oleh-oleh",
        "kanji": "お土産"
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
        "id": "Bahasa jepang",
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
    ],
    "dialogue": {
      "title": "これからお世話になります (Mohon Bantuan Anda)",
      "lines": [
        {
          "speaker": "Santos",
          "jp": "はい、どなたですか。",
          "reading": "Hai, donata desu ka.",
          "id": "Ya, siapa ya?"
        },
        {
          "speaker": "Yamada",
          "jp": "408号室の山田です。こんにちは。",
          "reading": "Yon-maru-hachi-goushitsu no Yamada desu. Konnichiwa.",
          "id": "Saya Yamada dari kamar 408. Selamat siang."
        },
        {
          "speaker": "Yamada",
          "jp": "これ、コーヒーです。どうぞ。",
          "reading": "Kore, koohii desu. Douzo.",
          "id": "Ini kopi oleh-oleh. Silakan diterima."
        },
        {
          "speaker": "Santos",
          "jp": "どうもありがとうございます。",
          "reading": "Doumo arigatou gozaimasu.",
          "id": "Terima kasih banyak."
        },
        {
          "speaker": "Yamada",
          "jp": "これからお世話になります。どうぞよろしく。",
          "reading": "Korekara osewa ni narimasu. Douzo yoroshiku.",
          "id": "Mulai sekarang saya akan meminta bantuan Anda. Mohon bantuannya."
        },
        {
          "speaker": "Santos",
          "jp": "こちらこそ、よろしくお願いします。",
          "reading": "Kochira koso, yoroshiku onegai shimasu.",
          "id": "Sama-sama, saya juga mohon bantuannya."
        }
      ]
    }
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
        "pattern": "ここ / そこ / あそこ / どこ (Koko / Soko / Asoko / Doko)",
        "formula": "Koko / Soko / Asoko / Doko + wa + [Tempat] + desu",
        "explanation": "Kata tunjuk tempat. Koko (di sini, dekat pembicara), Soko (di situ, dekat lawan bicara), Asoko (di sana, jauh dari keduanya), Doko (di mana?).",
        "examples": [
          {
            "jp": "ここは 教室です。",
            "reading": "Koko wa kyoushitsu desu.",
            "id": "Di sini adalah ruang kelas."
          },
          {
            "jp": "トイレは どこですか。あそこです。",
            "reading": "Toire wa doko desu ka. Asoko desu.",
            "id": "Toilet di mana? Di sebelah sana."
          }
        ]
      },
      {
        "id": "m3-2",
        "pattern": "こちら / そちら / あちら / どちら (Kochira / Sochira / Achira / Dochira)",
        "formula": "Kochira / Sochira / Achira / Dochira",
        "explanation": "Ragam sopan dari koko/soko/asoko/doko, sekaligus berfungsi sebagai penunjuk arah (sebelah sini/situ/sana/mana).",
        "examples": [
          {
            "jp": "事務所は どちらですか。あちらです。",
            "reading": "Jimusho wa dochira desu ka. Achira desu.",
            "id": "Kantor di sebelah mana? Di sebelah sana (sopan)."
          }
        ]
      },
      {
        "id": "m3-3",
        "pattern": "KB は [Tempat] です (KB wa [Tempat] desu)",
        "formula": "Kata Benda [wa] Tempat [desu]",
        "explanation": "Pola untuk menyatakan lokasi keberadaan suatu ruangan, benda, fasilitas, atau orang.",
        "examples": [
          {
            "jp": "電話は 2階です。",
            "reading": "Denwa wa ni-kai desu.",
            "id": "Telepon ada di lantai 2."
          },
          {
            "jp": "山田さんは 会議室です。",
            "reading": "Yamada-san wa kaigishitsu desu.",
            "id": "Tuan Yamada ada di ruang rapat."
          }
        ]
      },
      {
        "id": "m3-4",
        "pattern": "どこ / どちら (Menanyakan Asal Negara & Perusahaan Produk)",
        "formula": "[Perusahaan / Negara] no [Benda]",
        "explanation": "Bila menanyakan negara asal atau produsen suatu barang, gunakan 'doko' atau 'dochira'.",
        "examples": [
          {
            "jp": "これは どこの コンピューターですか。日本の コンピューターです。",
            "reading": "Kore wa doko no konpyuutaa desu ka. Nihon no konpyuutaa desu.",
            "id": "Ini komputer buatan mana? Komputer buatan Jepang."
          }
        ]
      },
      {
        "id": "m3-5",
        "pattern": "Harga: 〜円 / いくら (Ikura desu ka)",
        "formula": "KB + wa + ikura desu ka",
        "explanation": "Menanyakan harga barang dengan kata tanya 'ikura' (berapa harganya) dan dijawab dengan nominal mata uang 'en'.",
        "examples": [
          {
            "jp": "このネクタイは いくらですか。2,800円です。",
            "reading": "Kono nekutai wa ikura desu ka. Ni-sen happyaku-en desu.",
            "id": "Dasi ini harganya berapa? 2.800 yen."
          }
        ]
      }
    ],
    "keyVocab": [
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
        "jp": "きょうしつ (教室)",
        "reading": "kyoushitsu",
        "id": "Ruang kelas",
        "kanji": "教室"
      },
      {
        "jp": "しょくどう (食堂)",
        "reading": "shokudou",
        "id": "Ruang makan, Kantin",
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
        "id": "Meja informasi",
        "kanji": "受付"
      },
      {
        "jp": "ロビー",
        "reading": "robi-",
        "id": "Ruang tunggu, lobi"
      },
      {
        "jp": "へや (部屋)",
        "reading": "heya",
        "id": "Kamar",
        "kanji": "部屋"
      },
      {
        "jp": "おてあらい (お手洗い)",
        "reading": "otearai",
        "id": "Kamar kecil, WC",
        "kanji": "お手洗い"
      },
      {
        "jp": "トイレ",
        "reading": "toire",
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
        "reading": "erebe-ta-",
        "id": "Lift"
      },
      {
        "jp": "エスカレーター",
        "reading": "esukare-ta-",
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
        "jp": "かいしゃ (会社)",
        "reading": "kaisha",
        "id": "Perusahaan",
        "kanji": "会社"
      },
      {
        "jp": "うち (家)",
        "reading": "uchi",
        "id": "Rumah",
        "kanji": "家"
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
        "jp": "うりば (売り場)",
        "reading": "uriba",
        "id": "Tempat penjualan",
        "kanji": "売り場"
      },
      {
        "jp": "ちか (地下)",
        "reading": "chika",
        "id": "Bawah tanah , basement",
        "kanji": "地下"
      },
      {
        "jp": "～かい (～階)",
        "reading": "~kai",
        "id": "lantai～/ tingkat～",
        "kanji": "～階"
      },
      {
        "jp": "なんがい (何階)",
        "reading": "nangai",
        "id": "Lantai berapa?",
        "kanji": "何階"
      },
      {
        "jp": "～えん (～円)",
        "reading": "~en",
        "id": "～yen",
        "kanji": "～円"
      },
      {
        "jp": "いくら",
        "reading": "ikura",
        "id": "Berapa?"
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
        "reading": "~wokudasai",
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
        "reading": "supo-tsuyouhin",
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
        "reading": "akusesari-",
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
    ],
    "dialogue": {
      "title": "これをください (Minta Ini!)",
      "lines": [
        {
          "speaker": "Maria",
          "jp": "すみません。ワイン売り場はどこですか。",
          "reading": "Sumimasen. Wain uriba wa doko desu ka.",
          "id": "Permisi. Di mana tempat penjualan anggur?"
        },
        {
          "speaker": "Pelayan",
          "jp": "地下1階でございます。",
          "reading": "Chika ikkai de gozaimasu.",
          "id": "Ada di lantai basement 1."
        },
        {
          "speaker": "Maria",
          "jp": "すみません、そのワインを見せてください。",
          "reading": "Sumimasen, sono wain o misete kudasai.",
          "id": "Permisi, tolong perlihatkan anggur itu."
        },
        {
          "speaker": "Pelayan",
          "jp": "はい、どうぞ。イタリアのワインです。2,500円です。",
          "reading": "Hai, douzo. Itaria no wain desu. Nisen gohyaku-en desu.",
          "id": "Ya, silakan. Ini anggur Italia. Harganya 2.500 yen."
        },
        {
          "speaker": "Maria",
          "jp": "じゃ、これをください。",
          "reading": "Ja, kore o kudasai.",
          "id": "Kalau begitu, tolong berikan yang ini."
        }
      ]
    }
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
        "pattern": "今 〜時 〜分です (Ima ~ji ~fun desu)",
        "formula": "Ima + [Jam] + ji + [Menit] + fun/pun + desu",
        "explanation": "Menyatakan waktu sekarang. Jam menggunakan ~ji (perhatikan: 4-ji yo-ji, 9-ji ku-ji). Menit menggunakan ~fun atau ~pun. Setengah jam menggunakan 'han'.",
        "examples": [
          {
            "jp": "今 何時ですか。7時半です。",
            "reading": "Ima nan-ji desu ka. Shichi-ji han desu.",
            "id": "Sekarang jam berapa? Jam 7 lewat 30 menit (setengah delapan)."
          }
        ]
      },
      {
        "id": "m4-2",
        "pattern": "Kata Kerja: 〜ます / 〜ません / 〜ました / 〜ませんでした",
        "formula": "KK-masu (non-lampau +), KK-masen (non-lampau -), KK-mashita (lampau +), KK-masen deshita (lampau -)",
        "explanation": "Perubahan bentuk waktu kalimat verbal formal (keadaan masa sekarang/rutinitas vs masa lampau).",
        "examples": [
          {
            "jp": "毎朝 6時に 起きます。",
            "reading": "Maiasa roku-ji ni okimasu.",
            "id": "Setiap pagi saya bangun jam 6."
          },
          {
            "jp": "きのう 勉強しましたか。いいえ、勉強しませんでした。",
            "reading": "Kinou benkyou shimashita ka. Iie, benkyou shimasen deshita.",
            "id": "Apakah kemarin Anda belajar? Tidak, kemarin saya tidak belajar."
          }
        ]
      },
      {
        "id": "m4-3",
        "pattern": "KB (Waktu) に Kata Kerja (Partikel ni waktu)",
        "formula": "Waktu Spesifik [ni] + Kata Kerja",
        "explanation": "Partikel 'ni' dibubuhkan setelah keterangan waktu yang memuat angka konkret (jam, tanggal, hari). Tidak digunakan pada keterangan waktu relatif (seperti kinou, kyou, ashita, maiasa).",
        "examples": [
          {
            "jp": "7月2日に 日本へ 来ました。",
            "reading": "Shichi-gatsu futsuka ni Nihon e kimashita.",
            "id": "Saya datang ke Jepang pada tanggal 2 Juli."
          }
        ]
      },
      {
        "id": "m4-4",
        "pattern": "KB1 から KB2 まで (Kara ... Made)",
        "formula": "[Titik Awal] kara [Titik Akhir] made",
        "explanation": "'Kara' menyatakan titik awal waktu atau tempat (dari), 'made' menyatakan titik batas akhir (sampai). Keduanya bisa dipakai berpasangan atau sendiri-sendiri.",
        "examples": [
          {
            "jp": "銀行は 9時から 3時までです。",
            "reading": "Ginkou wa kuji kara sanji made desu.",
            "id": "Bank buka dari jam 9 sampai jam 3."
          },
          {
            "jp": "昼休みは 12時からです。",
            "reading": "Hiruyasumi wa juuni-ji kara desu.",
            "id": "Istirahat siang mulai dari jam 12."
          }
        ]
      },
      {
        "id": "m4-5",
        "pattern": "KB1 と KB2 (Partikel To)",
        "formula": "KB1 [to] KB2",
        "explanation": "Partikel 'to' berfungsi menghubungkan dua kata benda secara setara ('dan').",
        "examples": [
          {
            "jp": "銀行の休みは 土曜日と 日曜日です。",
            "reading": "Ginkou no yasumi wa doyoubi to nichiyoubi desu.",
            "id": "Hari libur bank adalah hari Sabtu dan Minggu."
          }
        ]
      },
      {
        "id": "m4-6",
        "pattern": "〜ね (Partikel Ne penutur)",
        "formula": "Kalimat + ne",
        "explanation": "Diletakkan di akhir kalimat untuk mencari kesepakatan, simpati, atau memastikan hal yang sama ('ya / bukan?').",
        "examples": [
          {
            "jp": "毎日 10時まで 勉強します。大変ですね。",
            "reading": "Mainichi juuji made benkyou shimasu. Taihen desu ne.",
            "id": "Setiap hari belajar sampai jam 10. Berat sekali ya."
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
        "id": "Beristirahat , libur",
        "kanji": "休みます"
      },
      {
        "jp": "べんきょうします (勉強します)",
        "reading": "benkyoushimasu",
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
        "jp": "デパート",
        "reading": "depa-to",
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
        "jp": "いま (今)",
        "reading": "ima",
        "id": "Sekarang",
        "kanji": "今"
      },
      {
        "jp": "～じ (～時)",
        "reading": "~ji",
        "id": "Jam , pukul",
        "kanji": "～時"
      },
      {
        "jp": "～ふん／ぶん (～分)",
        "reading": "~fun／bun",
        "id": "Menit",
        "kanji": "～分"
      },
      {
        "jp": "はん (半)",
        "reading": "han",
        "id": "Setengah",
        "kanji": "半"
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
        "jp": "ばん (晩)",
        "reading": "ban",
        "id": "Malam",
        "kanji": "晩"
      },
      {
        "jp": "よる (夜)",
        "reading": "yoru",
        "id": "Malam",
        "kanji": "夜"
      },
      {
        "jp": "おととい (一昨日)",
        "reading": "ototoi",
        "id": "2 hari yang lalu , kemarin lusa",
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
        "reading": "~to～",
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
        "reading": "nyu-yo-ku",
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
    ],
    "dialogue": {
      "title": "そちらは何時から何時までですか (Di Situ Buka Sampai Pukul Berapa?)",
      "lines": [
        {
          "speaker": "Pelayan",
          "jp": "はい、あすか図書館です。",
          "reading": "Hai, Asuka toshokan desu.",
          "id": "Halo, dengan Perpustakaan Asuka di sini."
        },
        {
          "speaker": "Miller",
          "jp": "すみません、そちらは何時から何時までですか。",
          "reading": "Sumimasen, sochira wa nan-ji kara nan-ji made desu ka.",
          "id": "Permisi, di situ buka dari jam berapa sampai jam berapa?"
        },
        {
          "speaker": "Pelayan",
          "jp": "午前9時から午後5時までです。",
          "reading": "Gozen kuji kara gogo goji made desu.",
          "id": "Dari jam 9 pagi sampai jam 5 sore."
        },
        {
          "speaker": "Miller",
          "jp": "休みの日は何曜日ですか。",
          "reading": "Yasumi no hi wa nan-youbi desu ka.",
          "id": "Hari liburnya hari apa?"
        },
        {
          "speaker": "Pelayan",
          "jp": "月曜日です。",
          "reading": "Getsuyoubi desu.",
          "id": "Hari Senin."
        },
        {
          "speaker": "Miller",
          "jp": "そうですか。どうもありがとう。",
          "reading": "Sou desu ka. Doumo arigatou.",
          "id": "O, begitu. Terima kasih banyak."
        }
      ]
    }
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
        "pattern": "[Tempat] へ 行きます / 来ます / 帰ります (Partikel E)",
        "formula": "Tempat [e] ikimasu / kimasu / kaerimasu",
        "explanation": "Partikel 'e' (ditulis へ) menunjukkan arah tujuan pergerakan dari kata kerja mobilitas (pergi, datang, pulang).",
        "examples": [
          {
            "jp": "京都へ 行きます。",
            "reading": "Kyouto e ikimasu.",
            "id": "Pergi ke Kyoto."
          },
          {
            "jp": "日本へ 来ました。",
            "reading": "Nihon e kimashita.",
            "id": "Datang ke Jepang."
          },
          {
            "jp": "うちへ 帰ります。",
            "reading": "Uchi e kaerimasu.",
            "id": "Pulang ke rumah."
          }
        ]
      },
      {
        "id": "m5-2",
        "pattern": "どこ [へ] も 行きません / 行きませんでした (Penyangkalan Total)",
        "formula": "Kata Tanya + [Partikel] + mo + Bentuk Negatif",
        "explanation": "Menggabungkan kata tanya dengan partikel 'mo' dan predikat negatif untuk menyatakan penyangkalan mutlak ('ke mana pun tidak pergi', 'apa pun tidak makan').",
        "examples": [
          {
            "jp": "日曜日 どこへも 行きませんでした。",
            "reading": "Nichiyoubi doko e mo ikimasen deshita.",
            "id": "Hari Minggu saya tidak pergi ke mana-mana."
          }
        ]
      },
      {
        "id": "m5-3",
        "pattern": "[Kendaraan / Sarana] で 行きます (Partikel De Transportasi)",
        "formula": "Kendaraan [de] ikimasu / kimasu / kaerimasu",
        "explanation": "Partikel 'de' menunjukkan sarana alat transportasi yang digunakan untuk berpindah. Pengecualian: 'aruite' (berjalan kaki) tidak memakai partikel de.",
        "examples": [
          {
            "jp": "電車で 行きます。",
            "reading": "Densha de ikimasu.",
            "id": "Pergi naik kereta rel listrik."
          },
          {
            "jp": "駅から 歩いて 帰りました。",
            "reading": "Eki kara aruite kaerimashita.",
            "id": "Dari stasiun saya pulang dengan berjalan kaki."
          }
        ]
      },
      {
        "id": "m5-4",
        "pattern": "[Orang / Hewan] と 行きます (Partikel To Kebersamaan)",
        "formula": "Orang [to] Kata Kerja",
        "explanation": "Partikel 'to' menandai mitra yang menemani melakukan suatu tindakan ('bersama'). Jika sendirian gunakan 'hitori de' (tanpa partikel to).",
        "examples": [
          {
            "jp": "家族と 日本へ 来ました。",
            "reading": "Kazoku to Nihon e kimashita.",
            "id": "Datang ke Jepang bersama keluarga."
          },
          {
            "jp": "一人で 東京へ 行きます。",
            "reading": "Hitori de Toukyou e ikimasu.",
            "id": "Pergi ke Tokyo sendirian."
          }
        ]
      },
      {
        "id": "m5-5",
        "pattern": "いつ (Itsu - Kapan)",
        "formula": "Itsu + Kalimat Tanya",
        "explanation": "Kata tanya untuk menanyakan waktu kapan suatu perbuatan dilakukan. Tidak memerlukan partikel 'ni'.",
        "examples": [
          {
            "jp": "いつ 日本へ 来ましたか。3月25日に 来ました。",
            "reading": "Itsu Nihon e kimashita ka. Sangatsu nijuugo-nichi ni kimashita.",
            "id": "Kapan Anda datang ke Jepang? Datang pada tanggal 25 Maret."
          }
        ]
      },
      {
        "id": "m5-6",
        "pattern": "〜よ (Partikel Yo Penegas)",
        "formula": "Kalimat + yo",
        "explanation": "Partikel 'yo' diletakkan di akhir kalimat untuk menyampaikan informasi, penegasan, atau peringatan yang belum diketahui oleh lawan bicara.",
        "examples": [
          {
            "jp": "この電車は 甲子園へ 行きますか。いいえ、行きません。次の「普通」ですよ。",
            "reading": "Kono densha wa Koushien e ikimasu ka. Iie, ikimasen. Tsugi no 'futsuu' desu yo.",
            "id": "Apakah kereta ini ke Koshien? Tidak. Yang berikutnya, kereta lokal biasa lho."
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
        "id": "Sekolahan",
        "kanji": "学校"
      },
      {
        "jp": "スーパー",
        "reading": "su-pa-",
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
        "id": "Shinkansen",
        "kanji": "新幹線"
      },
      {
        "jp": "バス",
        "reading": "basu",
        "id": "Bus"
      },
      {
        "jp": "タクシー",
        "reading": "takushi-",
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
        "jp": "ひと (人)",
        "reading": "hito",
        "id": "Orang",
        "kanji": "人"
      },
      {
        "jp": "ともだち (友達)",
        "reading": "tomodachi",
        "id": "Teman",
        "kanji": "友達"
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
        "jp": "ひとりで (一人で)",
        "reading": "hitoride",
        "id": "Sendirian",
        "kanji": "一人で"
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
    ],
    "dialogue": {
      "title": "甲子園へ行きますか (Apakah Kereta Ini Menuju Koshien?)",
      "lines": [
        {
          "speaker": "Santos",
          "jp": "すみません、甲子園までいくらですか。",
          "reading": "Sumimasen, Koushien made ikura desu ka.",
          "id": "Permisi, sampai Koshien berapa ongkosnya?"
        },
        {
          "speaker": "Petugas",
          "jp": "350円です。5番線ですよ。",
          "reading": "Sanbyaku gojuu-en desu. Gobansen desu yo.",
          "id": "350 yen. Jalur peron nomor 5 ya."
        },
        {
          "speaker": "Santos",
          "jp": "あのう、この電車は甲子園へ行きますか。",
          "reading": "Anou, kono densha wa Koushien e ikimasu ka.",
          "id": "Permisi, apakah kereta listrik ini pergi ke Koshien?"
        },
        {
          "speaker": "Penumpang",
          "jp": "いいえ、行きません。次の「普通」ですよ。",
          "reading": "Iie, ikimasen. Tsugi no 'Futsuu' desu yo.",
          "id": "Tidak, tidak pergi ke sana. Naik kereta 'Biasa' berikutnya ya."
        },
        {
          "speaker": "Santos",
          "jp": "そうですか。どうも。",
          "reading": "Sou desu ka. Doumo.",
          "id": "O, begitu. Terima kasih."
        }
      ]
    }
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
        "pattern": "KB を Kata Kerja Transitif (Partikel O)",
        "formula": "Kata Benda [o] + Kata Kerja Transitif",
        "explanation": "Partikel 'o' (ditulis を) menandai objek penderita atau sasaran langsung dari kata kerja transitif.",
        "examples": [
          {
            "jp": "ジュースを 飲みます。",
            "reading": "Juusu o nomimasu.",
            "id": "Minum jus."
          },
          {
            "jp": "本を 読みます。",
            "reading": "Hon o yomimasu.",
            "id": "Membaca buku."
          }
        ]
      },
      {
        "id": "m6-2",
        "pattern": "KB を します (Melakukan Olahraga, Acara & Pekerjaan)",
        "formula": "KB [o] shimasu",
        "explanation": "Digunakan bersama 'shimasu' untuk melakukan olahraga (sakkaa), permainan (toranpu), pertemuan (paatii), pekerjaan (shigoto), atau PR (shukudai).",
        "examples": [
          {
            "jp": "サッカーを します。",
            "reading": "Sakkaa o shimasu.",
            "id": "Bermain sepak bola."
          },
          {
            "jp": "宿題を します。",
            "reading": "Shukudai o shimasu.",
            "id": "Mengerjakan PR."
          }
        ]
      },
      {
        "id": "m6-3",
        "pattern": "何 を しますか (Nani o shimasu ka - Bertanya Aktivitas)",
        "formula": "Nani o shimasu ka",
        "explanation": "Menanyakan perbuatan apa yang dilakukan seseorang pada waktu tertentu.",
        "examples": [
          {
            "jp": "月曜日 何を しますか。京都へ 行きます。",
            "reading": "Getsuyoubi nani o shimasu ka. Kyouto e ikimasu.",
            "id": "Hari Senin melakukan apa? Pergi ke Kyoto."
          }
        ]
      },
      {
        "id": "m6-4",
        "pattern": "なん (Nan) vs なに (Nani)",
        "formula": "Nan (sebelum baris d, t, n / satuan) vs Nani (sebelum partikel o, ga, dll)",
        "explanation": "Kata tanya 'apa' dibaca 'nan' jika huruf berikutnya d, t, n atau kata bantu bilangan (nan-desu ka, nan-hon). Dibaca 'nani' pada kondisi umum lainnya (nani o).",
        "examples": [
          {
            "jp": "それは 何ですか。何を買いますか。",
            "reading": "Sore wa nan desu ka. Nani o kaimasu ka.",
            "id": "Itu apa? Mau beli apa?"
          }
        ]
      },
      {
        "id": "m6-5",
        "pattern": "[Tempat] で Kata Kerja (Partikel De Lokasi Aksi)",
        "formula": "Tempat [de] + Kata Kerja",
        "explanation": "Partikel 'de' menunjukkan tempat dilakukannya suatu kegiatan atau tindakan dinamis.",
        "examples": [
          {
            "jp": "駅で 新聞を 買います。",
            "reading": "Eki de shinbun o kaimasu.",
            "id": "Membeli koran di stasiun."
          }
        ]
      },
      {
        "id": "m6-6",
        "pattern": "〜ませんか (KK-masen ka - Ajakan Santun)",
        "formula": "KK Stem + masen ka?",
        "explanation": "Bentuk negatif tanya untuk mengajak lawan bicara melakukan sesuatu bersama dengan hormat ('Maukah Anda...?').",
        "examples": [
          {
            "jp": "いっしょに 京都へ 行きませんか。ええ、いいですね。",
            "reading": "Issho ni Kyouto e ikimasen ka. Ee, ii desu ne.",
            "id": "Maukah pergi ke Kyoto bersama-sama? Ya, bagus ya."
          }
        ]
      },
      {
        "id": "m6-7",
        "pattern": "〜ましょう (KK-mashou - Ajakan Aktif)",
        "formula": "KK Stem + mashou",
        "explanation": "Ajakan aktif kepada lawan bicara untuk melakukan sesuatu bersama ('Ayo kita lakukan...') atau menyetujui ajakan masen ka.",
        "examples": [
          {
            "jp": "ちょっと 休みましょう。",
            "reading": "Chotto yasumimashou.",
            "id": "Mari kita istirahat sebentar."
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
        "id": "Menghisap / merokok",
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
        "id": "Mengambi (foto) / memotret",
        "kanji": "撮ります"
      },
      {
        "jp": "します",
        "reading": "shimasu",
        "id": "Melakukan / mengerjakan / berbuat"
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
        "id": "Nasi",
        "kanji": "ご飯"
      },
      {
        "jp": "あさごはん (朝ご飯)",
        "reading": "asagohan",
        "id": "Makan pagi / sarapan",
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
        "id": "Teh jepang / teh hijau",
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
        "reading": "ju-su",
        "id": "Jus"
      },
      {
        "jp": "ビール",
        "reading": "bi-ru",
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
        "reading": "repo-to",
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
        "reading": "sakka-",
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
        "reading": "ja、mata",
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
        "reading": "so-se-ji",
        "id": "Sosis"
      },
      {
        "jp": "ハム",
        "reading": "hamu",
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
    ],
    "dialogue": {
      "title": "いっしょに行きませんか (Bagaimana Kalau Kita Pergi Bersama?)",
      "lines": [
        {
          "speaker": "Sato",
          "jp": "ミラーさん、あした友達とお花見をします。いっしょに行きませんか。",
          "reading": "Miraa-san, ashita tomodachi to ohanami o shimasu. Issho ni ikimasen ka.",
          "id": "Sdr. Miller, besok saya dan teman-teman mau melihat bunga Sakura. Mau pergi bersama-sama?"
        },
        {
          "speaker": "Miller",
          "jp": "いいですね。どこへ行きますか。",
          "reading": "Ii desu ne. Doko e ikimasu ka.",
          "id": "Bagus ya. Mau pergi ke mana?"
        },
        {
          "speaker": "Sato",
          "jp": "大阪城公園です。10時に駅で会いましょう。",
          "reading": "Oosakajou kouen desu. Juuji ni eki de aimashou.",
          "id": "Taman Benteng Osaka. Ayo kita bertemu jam 10 di stasiun."
        },
        {
          "speaker": "Miller",
          "jp": "わかりました。じゃ、またあした。",
          "reading": "Wakarimashita. Ja, mata ashita.",
          "id": "Baiklah. Kalau begitu sampai jumpa besok."
        }
      ]
    }
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
        "pattern": "[Alat / Sarana / Bahasa] で Kata Kerja",
        "formula": "Alat/Sarana/Bahasa [de] + Kata Kerja",
        "explanation": "Partikel 'de' menunjukkan perkakas, sarana, atau bahasa yang dipakai dalam melakukan tindakan.",
        "examples": [
          {
            "jp": "はしで 食べます。",
            "reading": "Hashi de tabemasu.",
            "id": "Makan dengan sumpit."
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
        "pattern": "「Kata/Kalimat」は 〜語で 何ですか",
        "formula": "Kata [wa] Bahasa [de] nan desu ka",
        "explanation": "Pola untuk menanyakan terjemahan atau padanan istilah dalam bahasa lain.",
        "examples": [
          {
            "jp": "「ありがとう」は 英語で 何ですか。「Thank you」です。",
            "reading": "'Arigatou' wa Eigo de nan desu ka. 'Thank you' desu.",
            "id": "Apa bahasa Inggris dari 'arigatou'? 'Thank you'."
          }
        ]
      },
      {
        "id": "m7-3",
        "pattern": "Orang に Benda を あげます / 貸します / 教えます",
        "formula": "Penerima [ni] Benda [o] agemasu / kashimasu / oshiemasu",
        "explanation": "Menyatakan tindakan memberikan, meminjamkan, atau mengajarkan sesuatu kepada orang lain. Penerima ditandai dengan partikel 'ni'.",
        "examples": [
          {
            "jp": "木村さんに 花を あげました。",
            "reading": "Kimura-san ni hana o agemashita.",
            "id": "Saya memberikan bunga kepada Nn. Kimura."
          },
          {
            "jp": "山田さんに 英語を 教えます。",
            "reading": "Yamada-san ni Eigo o oshiemasu.",
            "id": "Saya mengajarkan bahasa Inggris kepada Tuan Yamada."
          }
        ]
      },
      {
        "id": "m7-4",
        "pattern": "Orang に Benda を もらいます / 借ります / 習います",
        "formula": "Pemberi [ni / kara] Benda [o] moraimasu / karimasu / naraimasu",
        "explanation": "Menyatakan tindakan menerima, meminjam, atau mempelajari sesuatu dari orang lain. Pemberi ditandai dengan partikel 'ni' (atau 'kara' jika organisasi/sekolah).",
        "examples": [
          {
            "jp": "山田さんに 花を もらいました。",
            "reading": "Yamada-san ni hana o moraimashita.",
            "id": "Saya menerima bunga dari Tuan Yamada."
          },
          {
            "jp": "銀行から お金を 借りました。",
            "reading": "Ginkou kara okane o karimashita.",
            "id": "Saya meminjam uang dari bank."
          }
        ]
      },
      {
        "id": "m7-5",
        "pattern": "もう Kata Kerja ました (Mou ~mashita)",
        "formula": "Mou + KK-mashita",
        "explanation": "'Mou' berarti 'sudah', menyatakan bahwa perbuatan telah selesai dilakukan. Jika belum, dijawab dengan: 'Iie, mada desu'.",
        "examples": [
          {
            "jp": "もう 荷物を 送りましたか。はい、もう 送りました。",
            "reading": "Mou nimotsu o okurimashita ka. Hai, mou okurimashita.",
            "id": "Apakah sudah mengirim barang? Ya, sudah saya kirim."
          },
          {
            "jp": "いいえ、まだです。",
            "reading": "Iie, mada desu.",
            "id": "Belum, masih belum."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "きります (切ります)",
        "reading": "kirimasu",
        "id": "Memotong / menggunting",
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
        "id": "Menerima / mendapatkan"
      },
      {
        "jp": "かします (貸します)",
        "reading": "kashimasu",
        "id": "Meminjamkan / menyewakan",
        "kanji": "貸します"
      },
      {
        "jp": "かります (借ります)",
        "reading": "karimasu",
        "id": "Meminjam / menyewa",
        "kanji": "借ります"
      },
      {
        "jp": "おしえます (教えます)",
        "reading": "oshiemasu",
        "id": "Mengajar",
        "kanji": "教えます"
      },
      {
        "jp": "ならいます (習います)",
        "reading": "naraimasu",
        "id": "Belajar (kepada)",
        "kanji": "習います"
      },
      {
        "jp": "かけます（を）",
        "reading": "kakemasu",
        "id": "Menelpon"
      },
      {
        "jp": "て (手)",
        "reading": "te",
        "id": "Tangan",
        "kanji": "手"
      },
      {
        "jp": "はし",
        "reading": "hashi",
        "id": "Sumpit"
      },
      {
        "jp": "スプーン",
        "reading": "supu-n",
        "id": "Sendok"
      },
      {
        "jp": "ナイフ",
        "reading": "naifu",
        "id": "Pisau"
      },
      {
        "jp": "フォーク",
        "reading": "fuぉ-ku",
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
        "id": "Laptop"
      },
      {
        "jp": "ケータイ",
        "reading": "ke-tai",
        "id": "HP"
      },
      {
        "jp": "メール",
        "reading": "me-ru",
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
        "reading": "hocchikisu",
        "id": "Stapler"
      },
      {
        "jp": "セロテープ",
        "reading": "serote-pu",
        "id": "Selotip"
      },
      {
        "jp": "けしゴム (消しゴム)",
        "reading": "keshigomu",
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
        "jp": "プレゼント",
        "reading": "purezento",
        "id": "Hadiah / kado"
      },
      {
        "jp": "にもつ (荷物)",
        "reading": "nimotsu",
        "id": "Barang",
        "kanji": "荷物"
      },
      {
        "jp": "おかね (お金)",
        "reading": "okane",
        "id": "Uang",
        "kanji": "お金"
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
    ],
    "dialogue": {
      "title": "いらっしゃい (Selamat Datang!)",
      "lines": [
        {
          "speaker": "Santos",
          "jp": "ごめんください。",
          "reading": "Gomen kudasai.",
          "id": "Permisi."
        },
        {
          "speaker": "Yamada",
          "jp": "いらっしゃい！どうぞお上がりください。",
          "reading": "Irasshai! Douzo oagari kudasai.",
          "id": "Selamat datang! Silakan masuk."
        },
        {
          "speaker": "Santos",
          "jp": "失礼します。これ、お土産のチョコレートです。",
          "reading": "Shitsurei shimasu. Kore, omiyage no chokoreeto desu.",
          "id": "Permisi. Ini cokelat oleh-oleh untuk Anda."
        },
        {
          "speaker": "Yamada",
          "jp": "どうもありがとうございます。コーヒーはいかがですか。",
          "reading": "Doumo arigatou gozaimasu. Koohii wa ikaga desu ka.",
          "id": "Terima kasih banyak. Bagaimana kalau minum kopi?"
        },
        {
          "speaker": "Santos",
          "jp": "いただきます。",
          "reading": "Itadakimasu.",
          "id": "Terima kasih, saya terima."
        }
      ]
    }
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
        "pattern": "Kata Sifat-I vs Kata Sifat-Na sebagai Predikat",
        "formula": "I-Kei: [samui desu / samukunai desu]; Na-Kei: [shizuka desu / shizuka ja arimasen]",
        "explanation": "Kata sifat I berakhir dengan vokal 'i' (negatif: buang i ganti kunai desu). Kata sifat Na tidak berakhiran i (negatif: tambah ja arimasen). Pengecualian: ii desu -> yokunai desu.",
        "examples": [
          {
            "jp": "富士山は 高いです。",
            "reading": "Fujisan wa takai desu.",
            "id": "Gunung Fuji tinggi."
          },
          {
            "jp": "あそこは 静かじゃありません。",
            "reading": "Asoko wa shizuka ja arimasen.",
            "id": "Di sana tidak sunyi/tenang."
          }
        ]
      },
      {
        "id": "m8-2",
        "pattern": "Kata Sifat Menerangkan Kata Benda",
        "formula": "[I-Kei] + KB; [Na-Kei] + な + KB",
        "explanation": "Saat menerangkan kata benda di belakangnya, Kata Sifat-I langsung menempel (shiroi hana), sedangkan Kata Sifat-Na wajib membubuhkan 'na' (shinsetsu na hito).",
        "examples": [
          {
            "jp": "ワット先生は 親切な 先生です。",
            "reading": "Watto-sensei wa shinsetsu na sensei desu.",
            "id": "Pak Watt adalah guru yang baik hati dan ramah."
          },
          {
            "jp": "これは 青い 車です。",
            "reading": "Kore wa aoi kuruma desu.",
            "id": "Ini adalah mobil biru."
          }
        ]
      },
      {
        "id": "m8-3",
        "pattern": "とても (Sangat) vs あまり (Tidak Begitu)",
        "formula": "Totemo + Kalimat Positif; Amari + Kalimat Negatif",
        "explanation": "'Totemo' memperkuat arti kata sifat pada kalimat positif. 'Amari' digunakan khusus pada kalimat negatif untuk arti 'tidak begitu / kurang'.",
        "examples": [
          {
            "jp": "北京は とても 寒いです。",
            "reading": "Pekin wa totemo samui desu.",
            "id": "Beijing sangat dingin."
          },
          {
            "jp": "上海は あまり 寒くないです。",
            "reading": "Shanhai wa amari samukunai desu.",
            "id": "Shanghai tidak begitu dingin."
          }
        ]
      },
      {
        "id": "m8-4",
        "pattern": "KB は どうですか (KB wa dou desu ka - Bagaimana?)",
        "formula": "KB + wa + dou desu ka",
        "explanation": "Digunakan untuk menanyakan kesan, opini, atau pengalaman mengenai suatu tempat, benda, atau hal yang dialami lawan bicara.",
        "examples": [
          {
            "jp": "日本の生活は どうですか。楽しいです。",
            "reading": "Nihon no seikatsu wa dou desu ka. Tanoshii desu.",
            "id": "Bagaimana kehidupan di Jepang? Menyenangkan."
          }
        ]
      },
      {
        "id": "m8-5",
        "pattern": "KB1 は どんな KB2 ですか (Karakteristik Apa?)",
        "formula": "KB1 + wa + donna + KB2 + desu ka",
        "explanation": "'Donna' menanyakan keadaan atau sifat seperti apa dari kata benda yang dimaksud (jawaban berupa kata sifat yang menerangkan KB).",
        "examples": [
          {
            "jp": "奈良は どんな 町ですか。古い 町です。",
            "reading": "Nara wa donna machi desu ka. Furui machi desu.",
            "id": "Nara itu kota yang seperti apa? Kota yang kuno/tua."
          }
        ]
      },
      {
        "id": "m8-6",
        "pattern": "そして (Dan) vs 〜が、〜 (Tetapi)",
        "formula": "Kalimat 1. Soshite, Kalimat 2; Kalimat 1 ga, Kalimat 2",
        "explanation": "'Soshite' menyambung dua kalimat setara (positif + positif). Partikel 'ga' menyambung dua klausa yang berlawanan makna (positif + negatif).",
        "examples": [
          {
            "jp": "日本の食べ物は おいしいですが、高いです。",
            "reading": "Nihon no tabemono wa oishii desu ga, takai desu.",
            "id": "Makanan Jepang enak, tetapi mahal."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "ハンサム（な）",
        "reading": "hansamu",
        "id": "Tampan / gagah / ganteng"
      },
      {
        "jp": "きれい（な）",
        "reading": "kirei",
        "id": "Cantik / bersih"
      },
      {
        "jp": "しずか（な） (静香（な）)",
        "reading": "shizuka",
        "id": "Sunyi / tenang",
        "kanji": "静香（な）"
      },
      {
        "jp": "にぎやか（な）",
        "reading": "nigiyaka",
        "id": "Ramai"
      },
      {
        "jp": "ゆうめい（な） (有名（な）)",
        "reading": "yuumei",
        "id": "Terkenal",
        "kanji": "有名（な）"
      },
      {
        "jp": "しんせつ（な） (新設（な）)",
        "reading": "shinsetsu",
        "id": "Baik hati",
        "kanji": "新設（な）"
      },
      {
        "jp": "げんき（な） (元気（な）)",
        "reading": "genki",
        "id": "Sehat",
        "kanji": "元気（な）"
      },
      {
        "jp": "ひま（な） (暇（な）)",
        "reading": "hima",
        "id": "Senggang",
        "kanji": "暇（な）"
      },
      {
        "jp": "べんり（な） (便利（な）)",
        "reading": "benri",
        "id": "Praktis",
        "kanji": "便利（な）"
      },
      {
        "jp": "すてき（な）",
        "reading": "suteki",
        "id": "Bagus"
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
        "jp": "いい（よい）",
        "reading": "ii",
        "id": "Baik / bagus"
      },
      {
        "jp": "わるい (悪い)",
        "reading": "warui",
        "id": "Jelek",
        "kanji": "悪い"
      },
      {
        "jp": "あつい (暑い、熱い)",
        "reading": "atsui",
        "id": "Panas",
        "kanji": "暑い、熱い"
      },
      {
        "jp": "さむい (寒い)",
        "reading": "samui",
        "id": "Dingin suhu",
        "kanji": "寒い"
      },
      {
        "jp": "つめたい (冷たい)",
        "reading": "tsumetai",
        "id": "Dingin benda",
        "kanji": "冷たい"
      },
      {
        "jp": "むずかしい (難しい)",
        "reading": "muzukashii",
        "id": "Sulit / susah",
        "kanji": "難しい"
      },
      {
        "jp": "やさしい (易しい)",
        "reading": "yasashii",
        "id": "Mudah / gampang",
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
        "jp": "おいしい",
        "reading": "oishii",
        "id": "Enak"
      },
      {
        "jp": "いそがしい (忙しい)",
        "reading": "isogashii",
        "id": "Sibuk",
        "kanji": "忙しい"
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
        "reading": "donna～",
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
        "reading": "~ga～",
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
        "reading": "kekkoudesu",
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
        "reading": "gure-",
        "id": "Abu-abu"
      },
      {
        "jp": "ベージュ",
        "reading": "be-ju",
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
    ],
    "dialogue": {
      "title": "そろそろ失礼します (Saya Mau Pamit)",
      "lines": [
        {
          "speaker": "Maria",
          "jp": "日本の生活はどうですか。",
          "reading": "Nihon no seikatsu wa dou desu ka.",
          "id": "Bagaimana kehidupan di Jepang?"
        },
        {
          "speaker": "Santos",
          "jp": "とても楽しいです。毎日忙しいですが、おもしろいです。",
          "reading": "Totemo tanoshii desu. Mainichi isogashii desu ga, omoshiroi desu.",
          "id": "Sangat menyenangkan. Setiap hari sibuk, tapi menarik."
        },
        {
          "speaker": "Maria",
          "jp": "コーヒー、もう一杯いかがですか。",
          "reading": "Koohii, mou ippai ikaga desu ka.",
          "id": "Mau nambah secangkir kopi lagi?"
        },
        {
          "speaker": "Santos",
          "jp": "いいえ、けっこうです。もう6時ですから、そろそろ失礼します。",
          "reading": "Iie, kekkou desu. Mou rokuji desu kara, sorosoro shitsurei shimasu.",
          "id": "Tidak, sudah cukup. Karena sudah jam 6, saya mau pamit dulu."
        },
        {
          "speaker": "Maria",
          "jp": "そうですか。またいらっしゃってください。",
          "reading": "Sou desu ka. Mata irasshatte kudasai.",
          "id": "O, begitu. Silakan datang lagi ya."
        }
      ]
    }
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
        "pattern": "〜が 好きです / 嫌いです (Suki / Kirai)",
        "formula": "KB [ga] suki / kirai [desu]",
        "explanation": "Objek dari perasaan suka (suki) atau benci/tidak suka (kirai) ditandai dengan partikel が bukan を.",
        "examples": [
          {
            "jp": "わたしは 日本料理が 好きです。",
            "reading": "Watashi wa Nihon ryouri ga suki desu.",
            "id": "Saya suka masakan Jepang."
          }
        ]
      },
      {
        "id": "m9-2",
        "pattern": "〜が 上手です / 下手です (Jouzu / Heta)",
        "formula": "KB [ga] jouzu / heta [desu]",
        "explanation": "Objek kemahiran (jouzu = pandai) atau ketidakterampilan (heta = kurang pandai) menggunakan partikel が. Catatan: jouzu tidak sopan jika dipakai memuji diri sendiri.",
        "examples": [
          {
            "jp": "マリアさんは カラオケが 上手です。",
            "reading": "Maria-san wa karaoke ga jouzu desu.",
            "id": "Maria pandai bernyanyi karaoke."
          }
        ]
      },
      {
        "id": "m9-3",
        "pattern": "〜が わかります / あります (Wakarimasu / Arimasu)",
        "formula": "KB [ga] wakarimasu / arimasu",
        "explanation": "Menyatakan kepahaman materi/bahasa (wakarimasu) atau kepemilikan benda/waktu (arimasu). Objeknya ditandai partikel が.",
        "examples": [
          {
            "jp": "わたしは 英語が わかります。",
            "reading": "Watashi wa Eigo ga wakarimasu.",
            "id": "Saya paham bahasa Inggris."
          },
          {
            "jp": "車が あります。",
            "reading": "Kuruma ga arimasu.",
            "id": "Mempunyai mobil."
          }
        ]
      },
      {
        "id": "m9-4",
        "pattern": "Adverbia Tingkat / Kuantitas (よく, だいたい, すこし, あまり, ぜんぜん)",
        "formula": "Adverbia (yoku / daitai / sukoshi / amari / zenzen) + KK / KS",
        "explanation": "Menunjukkan tingkat kepahaman atau kuantitas. Yoku (sangat paham/sering), daitai (sebagian besar), sukoshi (sedikit). Amari (kurang/tidak begitu) dan zenzen (sama sekali tidak) wajib diikuti bentuk negatif.",
        "examples": [
          {
            "jp": "日本語が よく 分かります。",
            "reading": "Nihongo ga yoku wakarimasu.",
            "id": "Sangat paham bahasa Jepang dengan baik."
          },
          {
            "jp": "日本語が あまり 分かりません。",
            "reading": "Nihongo ga amari wakarimasen.",
            "id": "Tidak begitu paham bahasa Jepang."
          },
          {
            "jp": "お金が ぜんぜん ありません。",
            "reading": "Okane ga zenzen arimasen.",
            "id": "Sama sekali tidak punya uang."
          }
        ]
      },
      {
        "id": "m9-5",
        "pattern": "どんな KB が 好きですか",
        "formula": "Donna + KB + ga suki desu ka",
        "explanation": "Digunakan untuk menanyakan kategori atau jenis spesifik apa yang disukai dari suatu kelompok kata benda.",
        "examples": [
          {
            "jp": "どんな スポーツが 好きですか。サッカーが 好きです。",
            "reading": "Donna supootsu ga suki desu ka. Sakkaa ga suki desu.",
            "id": "Suka olahraga jenis apa? Saya suka sepak bola."
          }
        ]
      },
      {
        "id": "m9-6",
        "pattern": "Kalimat Sebab から、Kalimat Akibat (Kara - Karena)",
        "formula": "Kalimat Sebab [kara], Kalimat Akibat",
        "explanation": "Partikel 'kara' di akhir kalimat pertama menyatakan alasan logis bagi kalimat sesudahnya ('karena...').",
        "examples": [
          {
            "jp": "時間が ありませんから、新聞を 読みません。",
            "reading": "Jikan ga arimasen kara, shinbun o yomimasen.",
            "id": "Karena tidak ada waktu, saya tidak membaca koran."
          }
        ]
      },
      {
        "id": "m9-7",
        "pattern": "どうして (Doushite - Kenapa / Mengapa)",
        "formula": "Doushite + Kalimat Tanya?",
        "explanation": "Menanyakan alasan. Jawaban pertanyaan doushite selalu diakhiri dengan partikel 〜から (kara).",
        "examples": [
          {
            "jp": "どうして 昨日 休みましたか。病気でしたから。",
            "reading": "Doushite kinou yasumimashita ka. Byouki deshita kara.",
            "id": "Kenapa kemarin tidak masuk/libur? Karena kemarin saya sakit."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "わかります (分かります)",
        "reading": "wakarimasu",
        "id": "Mengerti",
        "kanji": "分かります"
      },
      {
        "jp": "あります",
        "reading": "arimasu",
        "id": "Ada / mempunyai"
      },
      {
        "jp": "すき（な） (好きな)",
        "reading": "suki",
        "id": "Suka , gemar",
        "kanji": "好きな"
      },
      {
        "jp": "きらい（な） (嫌いな)",
        "reading": "kirai",
        "id": "Benci",
        "kanji": "嫌いな"
      },
      {
        "jp": "じょうず（な） (上手な)",
        "reading": "jouzu",
        "id": "Pandai , pintar",
        "kanji": "上手な"
      },
      {
        "jp": "へた（な） (下手な)",
        "reading": "heta",
        "id": "Tidak pandai , tidak pintar , bodoh",
        "kanji": "下手な"
      },
      {
        "jp": "のみもの (飲み物)",
        "reading": "nomimono",
        "id": "Minuman",
        "kanji": "飲み物"
      },
      {
        "jp": "りょうり (料理)",
        "reading": "ryouri",
        "id": "Masakan",
        "kanji": "料理"
      },
      {
        "jp": "スポーツ",
        "reading": "supo-tsu",
        "id": "Olahraga"
      },
      {
        "jp": "やきゅう (野球)",
        "reading": "yakyuu",
        "id": "Baseball",
        "kanji": "野球"
      },
      {
        "jp": "ダンス",
        "reading": "dansu",
        "id": "Dansa"
      },
      {
        "jp": "りょこう (旅行)",
        "reading": "ryokou",
        "id": "Tamasya",
        "kanji": "旅行"
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
        "reading": "konsa-to",
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
        "id": "Kabuki (drama tradisional jepang)",
        "kanji": "歌舞伎"
      },
      {
        "jp": "え (絵)",
        "reading": "e",
        "id": "Gambar",
        "kanji": "絵"
      },
      {
        "jp": "じ (字)",
        "reading": "ji",
        "id": "Huruf",
        "kanji": "字"
      },
      {
        "jp": "かんじ (漢字)",
        "reading": "kanji",
        "id": "Kanji",
        "kanji": "漢字"
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
        "reading": "ro-maji",
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
        "reading": "otto／shujin",
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
        "reading": "tsuma／kanai",
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
        "jp": "よく",
        "reading": "yoku",
        "id": "Dengan baik"
      },
      {
        "jp": "だいたい",
        "reading": "daitai",
        "id": "Kira-kira"
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
        "id": "Sama sekali",
        "kanji": "全然"
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
        "id": "Lagu tradisional jepang populer",
        "kanji": "演歌"
      },
      {
        "jp": "ミュージカル",
        "reading": "myu-jikaru",
        "id": "Drama musikal"
      },
      {
        "jp": "オペラ",
        "reading": "opera",
        "id": "Opera"
      },
      {
        "jp": "ホラー",
        "reading": "hora-",
        "id": "Film horor"
      },
      {
        "jp": "アニメ",
        "reading": "anime",
        "id": "Film kartun , animasi"
      },
      {
        "jp": "ドキュメンタリー",
        "reading": "dokyumentari-",
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
        "reading": "misuteri-",
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
        "reading": "sofutobo-ru",
        "id": "Softball"
      },
      {
        "jp": "サッカー",
        "reading": "sakka-",
        "id": "Sepak bola"
      },
      {
        "jp": "ラグビー",
        "reading": "ragubi-",
        "id": "Rugby"
      },
      {
        "jp": "バレーボール",
        "reading": "bare-bo-ru",
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
        "reading": "suki-",
        "id": "Sky"
      },
      {
        "jp": "スケート",
        "reading": "suke-to",
        "id": "Skate"
      },
      {
        "jp": "たっきゅう／ピンポン (卓球)",
        "reading": "takkyuu／pinpon",
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
    ],
    "dialogue": {
      "title": "残念ですが (Sayang Sekali...)",
      "lines": [
        {
          "speaker": "Kimura",
          "jp": "ミラーさん、金曜日の晩、いっしょにコンサートへ行きませんか。",
          "reading": "Miraa-san, kinyoubi no ban, issho ni konsaato e ikimasen ka.",
          "id": "Sdr. Miller, Jumat malam nanti bagaimana kalau kita pergi ke konser bersama-sama?"
        },
        {
          "speaker": "Miller",
          "jp": "いいですね。何のコンサートですか。",
          "reading": "Ii desu ne. Nan no konsaato desu ka.",
          "id": "Ide bagus ya. Konser musik apa?"
        },
        {
          "speaker": "Kimura",
          "jp": "クラシック音楽です。",
          "reading": "Kurashikku ongaku desu.",
          "id": "Musik klasik."
        },
        {
          "speaker": "Miller",
          "jp": "金曜日の晩はちょっと用事がありますから...。",
          "reading": "Kinyoubi no ban wa chotto youji ga arimasu kara....",
          "id": "Kalau hari Jumat malam, saya ada sedikit urusan jadi...."
        },
        {
          "speaker": "Kimura",
          "jp": "そうですか。だめですか。",
          "reading": "Sou desu ka. Dame desu ka.",
          "id": "O, begitu. Tidak bisa ya?"
        },
        {
          "speaker": "Miller",
          "jp": "ええ、残念ですが。また今度お願いします。",
          "reading": "Ee, zannen desu ga. Mata kondo onegai shimasu.",
          "id": "Iya, sayang sekali. Lain kali saja ya."
        }
      ]
    }
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
        "pattern": "[Tempat] に KB が あります / います",
        "formula": "Tempat [ni] KB [ga] arimasu / imasu",
        "explanation": "Menyatakan keberadaan benda atau makhluk hidup di suatu lokasi. 'あります' (arimasu) untuk benda mati dan tanaman. 'います' (imasu) untuk manusia dan hewan.",
        "examples": [
          {
            "jp": "机の 上に 写真が あります。",
            "reading": "Tsukue no ue ni shashin ga arimasu.",
            "id": "Di atas meja ada foto."
          },
          {
            "jp": "庭に 犬が います。",
            "reading": "Niwa ni inu ga imasu.",
            "id": "Di halaman ada anjing."
          }
        ]
      },
      {
        "id": "m10-2",
        "pattern": "KB は [Tempat] に あります / います",
        "formula": "KB [wa] Tempat [ni] arimasu / imasu",
        "explanation": "Menjadikan benda atau orang sebagai topik utama (wa), lalu menunjukkan lokasi tempat berada.",
        "examples": [
          {
            "jp": "東京ディズニーランドは 千葉県に あります。",
            "reading": "Toukyou Dizuniirando wa Chiba-ken ni arimasu.",
            "id": "Tokyo Disneyland terletak di Prefektur Chiba."
          },
          {
            "jp": "ミラーさんは 事務所に います。",
            "reading": "Miraa-san wa jimusho ni imasu.",
            "id": "Tuan Miller ada di kantor."
          }
        ]
      },
      {
        "id": "m10-3",
        "pattern": "KB1 の [Posisi Relatif] に KB2 が あります / います",
        "formula": "KB1 no [ue / shita / mae / ushiro / migi / hidari / naka / soto / tonari / chikaku / aida] ni",
        "explanation": "Menyatakan koordinat spasial: ue (atas), shita (bawah), mae (depan), ushiro (belakang), migi (kanan), hidari (kiri), naka (dalam), soto (luar), tonari (sebelah sejenis), aida (antara).",
        "examples": [
          {
            "jp": "郵便局は 銀行の 隣に あります。",
            "reading": "Yuubinkyoku wa ginkou no tonari ni arimasu.",
            "id": "Kantor pos ada di sebelah bank."
          },
          {
            "jp": "本屋は 花屋と スーパーの 間に あります。",
            "reading": "Hon'ya wa hanaya to suupaa no aida ni arimasu.",
            "id": "Toko buku ada di antara toko bunga dan supermarket."
          }
        ]
      },
      {
        "id": "m10-4",
        "pattern": "KB1 や KB2 [など] (Partikel Ya - Contoh Non-Eksklusif)",
        "formula": "KB1 [ya] KB2 [nado]",
        "explanation": "Partikel 'ya' menggabungkan beberapa kata benda sebagai perwakilan contoh (masih ada benda lain). 'Nado' berarti 'dan lain-lain'.",
        "examples": [
          {
            "jp": "箱の 中に 手紙や 写真などが あります。",
            "reading": "Hako no naka ni tegami ya shashin nado ga arimasu.",
            "id": "Di dalam kotak ada surat, foto, dan lain sebagainya."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "あります",
        "reading": "arimasu",
        "id": "Ada (benda mati)"
      },
      {
        "jp": "います",
        "reading": "imasu",
        "id": "Ada (benda hidup)"
      },
      {
        "jp": "いろいろ（な）",
        "reading": "iroiro",
        "id": "Berbagai / macam-macam"
      },
      {
        "jp": "おとこのひと (男の人)",
        "reading": "otokonohito",
        "id": "Orang laki-laki",
        "kanji": "男の人"
      },
      {
        "jp": "おんなのひと (女の人)",
        "reading": "onnanohito",
        "id": "Orang perempuan",
        "kanji": "女の人"
      },
      {
        "jp": "おとこのこ (男の子)",
        "reading": "otokonoko",
        "id": "Anak laki-laki",
        "kanji": "男の子"
      },
      {
        "jp": "おんなのこ (女の子)",
        "reading": "onnanoko",
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
        "reading": "suicchi",
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
        "reading": "te-buru",
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
        "id": "Samping / sebelah",
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
        "jp": "どうもすみません",
        "reading": "doumosumimasen",
        "id": "Maaf / terima kasih banyak"
      },
      {
        "jp": "ナンプラー",
        "reading": "nanpura-",
        "id": "Kecap ikan"
      },
      {
        "jp": "コーナー",
        "reading": "ko-na-",
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
    ],
    "dialogue": {
      "title": "ナンプラーはありますか (Ada Kecap Ikan?)",
      "lines": [
        {
          "speaker": "Miller",
          "jp": "すみません、アジアストアはどこですか。",
          "reading": "Sumimasen, Ajia Sutoa wa doko desu ka.",
          "id": "Permisi, di mana toko Asia Store?"
        },
        {
          "speaker": "Wanita",
          "jp": "あそこの白いビルの中にありますよ。",
          "reading": "Asoko no shiroi biru no naka ni arimasu yo.",
          "id": "Ada di dalam gedung putih di sebelah sana lho."
        },
        {
          "speaker": "Miller",
          "jp": "ナンプラーはありますか。",
          "reading": "Nanpuraa wa arimasu ka.",
          "id": "Apakah ada kecap ikan (nam pla)?"
        },
        {
          "speaker": "Pelayan",
          "jp": "はい。あちらの棚の、いちばん下にあります。",
          "reading": "Hai. Achira no tana no, ichiban shita ni arimasu.",
          "id": "Ya, ada di rak sebelah sana, paling bawah."
        },
        {
          "speaker": "Miller",
          "jp": "あ、ありました。どうもありがとう。",
          "reading": "A, arimashita. Doumo arigatou.",
          "id": "Ah, ini dia. Terima kasih banyak."
        }
      ]
    }
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
        "pattern": "Kata Bantu Bilangan / Penggolong (Josuushi)",
        "formula": "Objek [o] + [Angka + Satuan Hitung] + Kata Kerja",
        "explanation": "Kata bantu bilangan diletakkan langsung setelah objek/partikel, tepat di depan kata kerja: hitotsu-too (benda umum), ~nin (orang), ~dai (mesin/kendaraan), ~mai (lembar tipis).",
        "examples": [
          {
            "jp": "りんごを 4つ 買いました。",
            "reading": "Ringo o yottsu kaimashita.",
            "id": "Saya membeli 4 buah apel."
          },
          {
            "jp": "外国人の学生が 2人 います。",
            "reading": "Gaikokujin no gakusei ga futari imasu.",
            "id": "Ada 2 orang mahasiswa asing."
          }
        ]
      },
      {
        "id": "m11-2",
        "pattern": "[Periode Waktu] に 〜回 (Frekuensi Kegiatan)",
        "formula": "Periode [ni] + Frekuensi [kai] + Kata Kerja",
        "explanation": "Menyatakan seberapa sering suatu perbuatan dilakukan dalam kurun waktu tertentu (hari, minggu, bulan, tahun).",
        "examples": [
          {
            "jp": "1か月に 2回 映画を 見ます。",
            "reading": "Ik-kagetsu ni ni-kai eiga o mimasu.",
            "id": "Saya menonton film 2 kali dalam sebulan."
          }
        ]
      },
      {
        "id": "m11-3",
        "pattern": "Durasi Waktu + かかります (Kakarimasu - Memakan Waktu/Biaya)",
        "formula": "[Durasi / Biaya] + kakarimasu",
        "explanation": "'Kakarimasu' digunakan untuk menyatakan lamanya waktu tempuh atau besarnya biaya yang diperlukan. Bertanya menggunakan 'dono kurai'.",
        "examples": [
          {
            "jp": "大阪から 東京まで 新幹線で 2時間半 かかります。",
            "reading": "Oosaka kara Toukyou made shinkansen de ni-jikan han kakarimasu.",
            "id": "Dari Osaka ke Tokyo naik Shinkansen memakan waktu 2 setengah jam."
          }
        ]
      },
      {
        "id": "m11-4",
        "pattern": "〜だけ (Dake - Hanya)",
        "formula": "Kata Benda / Angka + dake",
        "explanation": "'Dake' dibubuhkan setelah kata benda atau bilangan untuk arti 'hanya / cuma', menyatakan tidak ada hal lain selain itu.",
        "examples": [
          {
            "jp": "休みは 日曜日だけです。",
            "reading": "Yasumi wa nichiyoubi dake desu.",
            "id": "Hari libur hanya hari Minggu saja."
          }
        ]
      }
    ],
    "keyVocab": [
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
        "reading": "yasumimasu",
        "id": "Tidak masuk kerja / libur",
        "kanji": "休みます"
      },
      {
        "jp": "ひとつ",
        "reading": "hitotsu",
        "id": "1 buah"
      },
      {
        "jp": "ふたつ",
        "reading": "futatsu",
        "id": "2 buah"
      },
      {
        "jp": "みっつ",
        "reading": "mittsu",
        "id": "3 buah"
      },
      {
        "jp": "よっつ",
        "reading": "yottsu",
        "id": "4 buah"
      },
      {
        "jp": "いつつ",
        "reading": "itsutsu",
        "id": "5 buah"
      },
      {
        "jp": "むっつ",
        "reading": "muttsu",
        "id": "6 buah"
      },
      {
        "jp": "ななつ",
        "reading": "nanatsu",
        "id": "7 buah"
      },
      {
        "jp": "やっつ",
        "reading": "yattsu",
        "id": "8 buah"
      },
      {
        "jp": "ここのつ",
        "reading": "kokonotsu",
        "id": "9 buah"
      },
      {
        "jp": "とお",
        "reading": "too",
        "id": "10 buah"
      },
      {
        "jp": "いくつ",
        "reading": "ikutsu",
        "id": "Berapa buah ?"
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
        "jp": "サンドイッチ",
        "reading": "sandoicchi",
        "id": "Sandwich"
      },
      {
        "jp": "カレー",
        "reading": "kare-",
        "id": "Kare"
      },
      {
        "jp": "アイスクリーム",
        "reading": "aisukuri-mu",
        "id": "Es krim"
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
        "jp": "どのくらい",
        "reading": "donokurai",
        "id": "Berapa lama ?"
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
        "reading": "eame-ru",
        "id": "Pos udara"
      },
      {
        "jp": "オーストラリア",
        "reading": "o-sutoraria",
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
        "id": "Mie jepang ukuran besar"
      },
      {
        "jp": "そば",
        "reading": "soba",
        "id": "Mie jepang warna abu-abu"
      },
      {
        "jp": "ラーメン",
        "reading": "ra-men",
        "id": "Mie jepang ukuran biasa"
      },
      {
        "jp": "やきそば (焼きそば)",
        "reading": "yakisoba",
        "id": "Mie goreng jepang",
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
        "reading": "kare-raisu",
        "id": "Nasi kare"
      },
      {
        "jp": "ハンバーグ",
        "reading": "hanba-gu",
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
        "reading": "su-pu",
        "id": "Sup"
      },
      {
        "jp": "スパゲッティ",
        "reading": "supagetteぃ",
        "id": "Spageti"
      },
      {
        "jp": "ピザ",
        "reading": "piza",
        "id": "Pizza"
      },
      {
        "jp": "トースト",
        "reading": "to-suto",
        "id": "Roti panggang"
      },
      {
        "jp": "コーヒー",
        "reading": "ko-hi-",
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
        "reading": "ju-su",
        "id": "Jus"
      },
      {
        "jp": "コーラ",
        "reading": "ko-ra",
        "id": "Coca cola"
      }
    ],
    "dialogue": {
      "title": "これ、お願いします (Tolong Kirimkan Ini)",
      "lines": [
        {
          "speaker": "Wang",
          "jp": "これ、オーストラリアまでお願いします。",
          "reading": "Kore, Oosutoraria made onegai shimasu.",
          "id": "Tolong kirimkan ini ke Australia."
        },
        {
          "speaker": "Petugas",
          "jp": "はい。航空便ですか、船便ですか。",
          "reading": "Hai. Koukuubin desu ka, funabin desu ka.",
          "id": "Baik. Mau pos udara atau pos laut?"
        },
        {
          "speaker": "Wang",
          "jp": "航空便はいくらですか。",
          "reading": "Koukuubin wa ikura desu ka.",
          "id": "Berapa ongkosnya kalau pos udara?"
        },
        {
          "speaker": "Petugas",
          "jp": "7,600円です。船便は3,450円です。",
          "reading": "Nanasen roppyaku-en desu. Funabin wa sanzen yonhyaku gojuu-en desu.",
          "id": "7.600 yen. Kalau pos laut 3.450 yen."
        },
        {
          "speaker": "Wang",
          "jp": "どのくらいかかりますか。",
          "reading": "Dono kurai kakarimasu ka.",
          "id": "Kira-kira memakan waktu berapa lama?"
        },
        {
          "speaker": "Petugas",
          "jp": "船便は2か月ぐらいかかります。",
          "reading": "Funabin wa nikagetsu gurai kakarimasu.",
          "id": "Pos laut memakan waktu sekitar dua bulan."
        },
        {
          "speaker": "Wang",
          "jp": "じゃ、船便でお願いします。",
          "reading": "Ja, funabin de onegai shimasu.",
          "id": "Kalau begitu, tolong dengan pos laut saja."
        }
      ]
    }
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
        "formula": "I-Kei: ~katta desu / ~kunakatta desu; Na-Kei/KB: ~deshita / ~ja arimasen deshita",
        "explanation": "Bentuk lampau afirmatif dan negatif untuk predikat adjektiva dan nomina.",
        "examples": [
          {
            "jp": "きのうは 雨でした。",
            "reading": "Kinou wa ame deshita.",
            "id": "Kemarin hujan."
          },
          {
            "jp": "旅行は とても 楽しかったです。",
            "reading": "Ryokou wa totemo tanoshikatta desu.",
            "id": "Perjalanannya sangat menyenangkan."
          },
          {
            "jp": "きのうの 試験は 簡単じゃありませんでした。",
            "reading": "Kinou no shiken wa kantan ja arimasen deshita.",
            "id": "Ujian kemarin tidak mudah."
          }
        ]
      },
      {
        "id": "m12-2",
        "pattern": "KB1 は KB2 より [Kata Sifat] です (Komparatif)",
        "formula": "KB1 [wa] KB2 [yori] + Kata Sifat + desu",
        "explanation": "Menyatakan perbandingan antara dua benda. 'KB1 lebih [sifat] daripada KB2'.",
        "examples": [
          {
            "jp": "この車は あの車より 大きいです。",
            "reading": "Kono kuruma wa ano kuruma yori ookii desu.",
            "id": "Mobil ini lebih besar daripada mobil itu."
          }
        ]
      },
      {
        "id": "m12-3",
        "pattern": "KB1 と KB2 と どちらが [Kata Sifat] ですか",
        "formula": "KB1 to KB2 to dochira ga [Sifat] desu ka -> [KB] no hou ga [Sifat] desu",
        "explanation": "Menanyakan pilihan komparasi antara dua hal. Dijawab dengan '... no hou ga [sifat] desu' (yang ... lebih ...).",
        "examples": [
          {
            "jp": "サッカーと 野球と どちらが おもしろいですか。サッカーのほうが おもしろいです。",
            "reading": "Sakkaa to yakyuu to dochira ga omoshiroi desu ka. Sakkaa no hou ga omoshiroi desu.",
            "id": "Sepak bola dan baseball, mana yang lebih menarik? Sepak bola lebih menarik."
          }
        ]
      },
      {
        "id": "m12-4",
        "pattern": "[Kelompok] の中で [Kata Tanya] が 一番 [Kata Sifat] ですか (Superlatif)",
        "formula": "Kategori no naka de [nani/doko/dare/itsu] ga ichiban [Sifat] desu ka",
        "explanation": "Menyatakan tingkatan paling / superlatif di antara seluruh anggota kelompok yang ada.",
        "examples": [
          {
            "jp": "日本料理の 中で 何が いちばん おいしいですか。天ぷらが いちばん おいしいです。",
            "reading": "Nihon ryouri no naka de nani ga ichiban oishii desu ka. Tenpura ga ichiban oishii desu.",
            "id": "Di antara masakan Jepang, apa yang paling enak? Tempura yang paling enak."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "かんたん（な） (簡単な)",
        "reading": "kantan",
        "id": "Mudah, gampang",
        "kanji": "簡単な"
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
        "jp": "はやい (早い，速い)",
        "reading": "hayai",
        "id": "Cepat",
        "kanji": "早い，速い"
      },
      {
        "jp": "おそい (遅い)",
        "reading": "osoi",
        "id": "Lambat",
        "kanji": "遅い"
      },
      {
        "jp": "おおい (多い)",
        "reading": "ooi",
        "id": "Banyak",
        "kanji": "多い"
      },
      {
        "jp": "すくない (少ない)",
        "reading": "sukunai",
        "id": "Sedikit",
        "kanji": "少ない"
      },
      {
        "jp": "あたたかい (暖かい、温かい)",
        "reading": "atatakai",
        "id": "Hangat",
        "kanji": "暖かい、温かい"
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
        "jp": "いい",
        "reading": "ii",
        "id": "Lebih baik"
      },
      {
        "jp": "きせつ (季節)",
        "reading": "kisetsu",
        "id": "Musim",
        "kanji": "季節"
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
        "reading": "pa-teぃ-",
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
        "reading": "waa、sugoihitodesune",
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
        "reading": "shingapo-ru",
        "id": "Singapura"
      },
      {
        "jp": "めいしょ (名所)",
        "reading": "meisho",
        "id": "Tempat terkenal",
        "kanji": "名所"
      }
    ],
    "dialogue": {
      "title": "祇園祭はどうでしたか (Bagaimana Perayaan Gion?)",
      "lines": [
        {
          "speaker": "Miller",
          "jp": "ただいま戻りました。",
          "reading": "Tadaima modorimashita.",
          "id": "Saya sudah kembali."
        },
        {
          "speaker": "Petugas",
          "jp": "お帰りなさい。祇園祭はどうでしたか。",
          "reading": "Okaerinasai. Gion-matsuri wa dou deshita ka.",
          "id": "Selamat datang kembali. Bagaimana festival Gion?"
        },
        {
          "speaker": "Miller",
          "jp": "とても面白かったです。でも、人が多かったです。",
          "reading": "Totemo omoshirokatta desu. Demo, hito ga ookatta desu.",
          "id": "Sangat menyenangkan. Tapi, orangnya sangat banyak."
        },
        {
          "speaker": "Petugas",
          "jp": "京都と大阪と、どちらが好きですか。",
          "reading": "Kyouto to Oosaka to, dochira ga suki desu ka.",
          "id": "Antara Kyoto dan Osaka, mana yang lebih Anda suka?"
        },
        {
          "speaker": "Miller",
          "jp": "どちらも好きですが、京都のほうが静かですね。",
          "reading": "Dochira mo suki desu ga, Kyouto no hou ga shizuka desu ne.",
          "id": "Dua-duanya suka, tapi Kyoto lebih tenang ya."
        }
      ]
    }
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
        "pattern": "KB が 欲しいです (~ ga hoshii desu - Ingin Benda)",
        "formula": "Kata Benda [ga] hoshii desu",
        "explanation": "Menyatakan keinginan memiliki barang/benda. Objek keinginan ditandai partikel が. Bentuk negatif: hoshikunai desu.",
        "examples": [
          {
            "jp": "わたしは 友達が 欲しいです。",
            "reading": "Watashi wa tomodachi ga hoshii desu.",
            "id": "Saya ingin punya teman."
          },
          {
            "jp": "今 何が いちばん 欲しいですか。車が 欲しいです。",
            "reading": "Ima nani ga ichiban hoshii desu ka. Kuruma ga hoshii desu.",
            "id": "Sekarang apa yang paling Anda inginkan? Saya ingin punya mobil."
          }
        ]
      },
      {
        "id": "m13-2",
        "pattern": "KK Bentuk Masu (Stem) + たいです (~ tai desu - Ingin Melakukan)",
        "formula": "KK Stem + tai desu",
        "explanation": "Menyatakan keinginan subjek untuk melakukan suatu tindakan. Objek perbuatan dapat ditandai partikel を atau が.",
        "examples": [
          {
            "jp": "わたしは 沖縄へ 行きたいです。",
            "reading": "Watashi wa Okinawa e ikitai desu.",
            "id": "Saya ingin pergi ke Okinawa."
          },
          {
            "jp": "てんぷらを 食べたいです。",
            "reading": "Tenpura o tabetai desu.",
            "id": "Saya ingin makan tempura."
          }
        ]
      },
      {
        "id": "m13-3",
        "pattern": "[Tempat] へ [KK Stem / KB] に 行きます / 来ます / 帰ります (Tujuan Gerak)",
        "formula": "Tempat [e] + [KK Stem / KB] + [ni] + ikimasu/kimasu/kaerimasu",
        "explanation": "Menyatakan tujuan pergi/datang ke suatu tempat untuk melakukan suatu perbuatan (diikuti partikel ni).",
        "examples": [
          {
            "jp": "神戸へ インド料理を 食べに 行きます。",
            "reading": "Koube e Indo ryouri o tabe ni ikimasu.",
            "id": "Pergi ke Kobe untuk makan masakan India."
          },
          {
            "jp": "日本へ 美術の 勉強に 来ました。",
            "reading": "Nihon e bijutsu no benkyou ni kimashita.",
            "id": "Datang ke Jepang untuk studi seni."
          }
        ]
      },
      {
        "id": "m13-4",
        "pattern": "どこか / 何か (Suatu Tempat / Sesuatu)",
        "formula": "Dokoka (e) / Nanika (o)",
        "explanation": "Menyatakan 'suatu tempat' atau 'sesuatu' tanpa menspesifikasikan nama benda/tempatnya. Partikel e dan o boleh dilesapkan.",
        "examples": [
          {
            "jp": "のどが かわきましたから、何か 飲みたいです。",
            "reading": "Nodo ga kawakimashita kara, nanika nomitai desu.",
            "id": "Karena haus, saya ingin minum sesuatu."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "あそびます (遊びます)",
        "reading": "asobimasu",
        "id": "Bermain",
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
        "id": "Lelah",
        "kanji": "疲れます"
      },
      {
        "jp": "けっこんします (結婚します)",
        "reading": "kekkonshimasu",
        "id": "Menikah",
        "kanji": "結婚します"
      },
      {
        "jp": "かいものします (買い物します)",
        "reading": "kaimonoshimasu",
        "id": "Berbelanja",
        "kanji": "買い物します"
      },
      {
        "jp": "しょくじします (食事します)",
        "reading": "shokujishimasu",
        "id": "Makan bersama",
        "kanji": "食事します"
      },
      {
        "jp": "さんぽします（を） (散歩します)",
        "reading": "sanposhimasu",
        "id": "Jalan-jalan",
        "kanji": "散歩します"
      },
      {
        "jp": "たいへん（な） (大変な)",
        "reading": "taihen",
        "id": "Susah, berat",
        "kanji": "大変な"
      },
      {
        "jp": "ほしい (欲しい)",
        "reading": "hoshii",
        "id": "Ingin",
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
        "reading": "pu-ru",
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
        "id": "Seni",
        "kanji": "美術"
      },
      {
        "jp": "つり (釣り)",
        "reading": "tsuri",
        "id": "Pancing , memancing",
        "kanji": "釣り"
      },
      {
        "jp": "スキー",
        "reading": "suki-",
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
    ],
    "dialogue": {
      "title": "別々にお願いします (Tolong Bayar Sendiri-sendiri)",
      "lines": [
        {
          "speaker": "Pelayan",
          "jp": "いらっしゃいませ。ご注文は？",
          "reading": "Irasshaimase. Gochuumon wa?",
          "id": "Selamat datang. Mau pesan apa?"
        },
        {
          "speaker": "Miller",
          "jp": "わたしは天ぷら定食をお願いします。",
          "reading": "Watashi wa tempura teishoku o onegai shimasu.",
          "id": "Saya pesan menu paket tempura."
        },
        {
          "speaker": "Santos",
          "jp": "わたしは牛丼にします。",
          "reading": "Watashi wa gyuudon ni shimasu.",
          "id": "Saya pilih mangkuk nasi daging sapi (gyudon)."
        },
        {
          "speaker": "Miller",
          "jp": "ごちそうさまでした。すみません、別々にお願いできますか。",
          "reading": "Gochisousama deshita. Sumimasen, betsu-betsu ni onegai dekimasu ka.",
          "id": "Terima kasih atas hidangannya. Maaf, boleh tolong hitung terpisah?"
        },
        {
          "speaker": "Pelayan",
          "jp": "はい。天ぷら定食は980円、牛丼は700円です。",
          "reading": "Hai. Tempura teishoku wa kyuuhyaku hachijuu-en, gyuudon wa nanahyaku-en desu.",
          "id": "Baik. Paket tempura 980 yen, gyudon 700 yen."
        }
      ]
    }
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
        "pattern": "Pengelompokan Kata Kerja & Bentuk-Te (Te-Kei)",
        "formula": "Grup 1: i-chuu-ri -> tte; mi-bi-ni -> nde; ki -> ite; gi -> ide; shi -> shite. Grup 2: buang masu + te. Grup 3: shimasu -> shite; kimasu -> kite.",
        "explanation": "Kaidah perubahan kata kerja ke bentuk konjugasi -Te (te-kei) yang mendasari berbagai fungsi tata bahasa.",
        "examples": [
          {
            "jp": "買います -> 買って、飲みます -> 飲んで、食べます -> 食べて",
            "reading": "Kaimasu -> katte, nomimasu -> nonde, tabemasu -> tabete",
            "id": "Membeli -> katte, minum -> nonde, makan -> tabete"
          }
        ]
      },
      {
        "id": "m14-2",
        "pattern": "KK bentuk-Te + ください (Te kudasai - Tolong)",
        "formula": "KK bentuk-Te + kudasai",
        "explanation": "Digunakan untuk memohon, meminta tolong, atau memerintahkan lawan bicara melakukan sesuatu secara sopan.",
        "examples": [
          {
            "jp": "すみませんが、この 漢字の 読み方を 教えて ください。",
            "reading": "Sumimasen ga, kono kanji no yomikata o oshiete kudasai.",
            "id": "Maaf, tolong ajarkan cara membaca kanji ini kepada saya."
          }
        ]
      },
      {
        "id": "m14-3",
        "pattern": "KK bentuk-Te + います (Te imasu - Sedang Berlangsung)",
        "formula": "KK bentuk-Te + imasu",
        "explanation": "Menyatakan bahwa suatu aktivitas atau tindakan sedang berlangsung saat ini (continuous aspect).",
        "examples": [
          {
            "jp": "ミラーさんは 今 電話を かけて います。",
            "reading": "Miraa-san wa ima denwa o kakete imasu.",
            "id": "Sdr. Miller sekarang sedang menelepon."
          },
          {
            "jp": "今 雨が 降って いますか。",
            "reading": "Ima ame ga futte imasu ka.",
            "id": "Apakah sekarang hujan sedang turun?"
          }
        ]
      },
      {
        "id": "m14-4",
        "pattern": "KK Bentuk Masu (Stem) + ましょうか (Mashou ka - Menawarkan Bantuan)",
        "formula": "KK Stem + mashou ka?",
        "explanation": "Digunakan ketika pembicara menawarkan diri untuk melakukan sesuatu demi membantu lawan bicara ('Bagaimana kalau saya bantu...?').",
        "examples": [
          {
            "jp": "荷物を 持ちましょうか。ありがとうございます。",
            "reading": "Nimotsu o mochimashou ka. Arigatou gozaimasu.",
            "id": "Bagaimana kalau saya bawakan barangnya? Terima kasih banyak."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "つけます",
        "reading": "tsukemasu",
        "id": "Menyalakan, memasang, menghidupkan"
      },
      {
        "jp": "けします (消します)",
        "reading": "keshimasu",
        "id": "Mematikan, memadamkan",
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
        "id": "Buru-buru",
        "kanji": "急ぎます"
      },
      {
        "jp": "まちます (待ちます)",
        "reading": "machimasu",
        "id": "Menunggu",
        "kanji": "待ちます"
      },
      {
        "jp": "もちます (持ちます)",
        "reading": "mochimasu",
        "id": "Membawa",
        "kanji": "持ちます"
      },
      {
        "jp": "とります (取ります)",
        "reading": "torimasu",
        "id": "Mengambil",
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
        "jp": "つかいます (使います)",
        "reading": "tsukaimasu",
        "id": "Memakai",
        "kanji": "使います"
      },
      {
        "jp": "とめます (止めます)",
        "reading": "tomemasu",
        "id": "Menghentikan",
        "kanji": "止めます"
      },
      {
        "jp": "みせます (見せます)",
        "reading": "misemasu",
        "id": "Memperlihatkan",
        "kanji": "見せます"
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
        "jp": "ふります (降ります)",
        "reading": "furimasu",
        "id": "Turun hujan",
        "kanji": "降ります"
      },
      {
        "jp": "コピーします",
        "reading": "kopi-shimasu",
        "id": "Memfotocopy"
      },
      {
        "jp": "でんき (電気)",
        "reading": "denki",
        "id": "Listrik, lampu",
        "kanji": "電気"
      },
      {
        "jp": "エアコン",
        "reading": "eakon",
        "id": "AC"
      },
      {
        "jp": "パスポート",
        "reading": "pasupo-to",
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
        "reading": "mou～",
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
        "reading": "purattoho-mu",
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
        "reading": "koinrokka-",
        "id": "Loker"
      },
      {
        "jp": "タクシーのりば",
        "reading": "takushi-noriba",
        "id": "Tempat naik taksi"
      },
      {
        "jp": "バスターミナル",
        "reading": "basuta-minaru",
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
    ],
    "dialogue": {
      "title": "みどり町までお願いします (Tolong Sampai ke Midoricho)",
      "lines": [
        {
          "speaker": "Karina",
          "jp": "みどり町までお願いします。",
          "reading": "Midorichou made onegai shimasu.",
          "id": "Tolong antar sampai ke Midoricho."
        },
        {
          "speaker": "Sopir",
          "jp": "はい、かしこまりました。",
          "reading": "Hai, kashikomarimashita.",
          "id": "Baik, dimengerti."
        },
        {
          "speaker": "Karina",
          "jp": "すみません、あの信号を右へ曲がってください。",
          "reading": "Sumimasen, ano shingou o migi e magatte kudasai.",
          "id": "Permisi, tolong belok ke kanan di lampu lalu lintas itu."
        },
        {
          "speaker": "Karina",
          "jp": "花屋の前で止めてください。いくらですか。",
          "reading": "Hanaya no mae de tomete kudasai. Ikura desu ka.",
          "id": "Tolong berhenti di depan toko bunga itu. Berapa ongkosnya?"
        },
        {
          "speaker": "Sopir",
          "jp": "1,800円です。",
          "reading": "Sen happyaku-en desu.",
          "id": "1.800 yen."
        },
        {
          "speaker": "Karina",
          "jp": "これでおねがいします。お釣りはいいです。",
          "reading": "Kore de onegai shimasu. Otsuri wa ii desu.",
          "id": "Ini uangnya. Kembaliannya ambil saja."
        }
      ]
    }
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
        "pattern": "KK bentuk-Te + も いいですか (Te mo ii desu ka - Izin)",
        "formula": "KK bentuk-Te + mo ii desu ka",
        "explanation": "Pola sopan untuk meminta izin melakukan suatu perbuatan ('Bolehkah saya...?').",
        "examples": [
          {
            "jp": "写真を 撮っても いいですか。ええ、いいですよ。",
            "reading": "Shashin o totte mo ii desu ka. Ee, ii desu yo.",
            "id": "Bolehkah saya mengambil foto? Ya, silakan."
          }
        ]
      },
      {
        "id": "m15-2",
        "pattern": "KK bentuk-Te + は いけません (Te wa ikemasen - Larangan)",
        "formula": "KK bentuk-Te + wa ikemasen",
        "explanation": "Menyatakan larangan keras untuk tidak melakukan sesuatu ('Tidak boleh / dilarang...').",
        "examples": [
          {
            "jp": "ここで たばこを 吸っては いけません。禁煙ですから。",
            "reading": "Koko de tabako o sutte wa ikemasen. Kin'en desu kara.",
            "id": "Di sini dilarang merokok. Karena area bebas rokok."
          }
        ]
      },
      {
        "id": "m15-3",
        "pattern": "KK bentuk-Te + います (Te imasu - Status / Keadaan Berlanjut)",
        "formula": "KK bentuk-Te + imasu (status)",
        "explanation": "Menunjukkan keadaan atau status yang tercipta akibat suatu tindakan di masa lalu dan masih berlanjut hingga kini (menikah, bertempat tinggal, bekerja, memiliki, mengetahui).",
        "examples": [
          {
            "jp": "わたしは 大阪に 住んで います。",
            "reading": "Watashi wa Oosaka ni sunde imasu.",
            "id": "Saya tinggal bermukim di Osaka."
          },
          {
            "jp": "田中さんを 知って いますか。いいえ、知りません。",
            "reading": "Tanaka-san o shitte imasu ka. Iie, shirimasen.",
            "id": "Apakah Anda kenal Sdr. Tanaka? Tidak, saya tidak tahu."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "おきます (置きます)",
        "reading": "okimasu",
        "id": "Meletakkan",
        "kanji": "置きます"
      },
      {
        "jp": "つくります (作ります)",
        "reading": "tsukurimasu",
        "id": "Membuat",
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
        "id": "Mengenal, mengetahui",
        "kanji": "知ります"
      },
      {
        "jp": "すみます (住みます)",
        "reading": "sumimasu",
        "id": "Tinggal",
        "kanji": "住みます"
      },
      {
        "jp": "けんきゅうします (研究します)",
        "reading": "kenkyuushimasu",
        "id": "Meneliti",
        "kanji": "研究します"
      },
      {
        "jp": "しりょう (資料)",
        "reading": "shiryou",
        "id": "Data, bahan",
        "kanji": "資料"
      },
      {
        "jp": "カタログ",
        "reading": "katarogu",
        "id": "Katalog"
      },
      {
        "jp": "ふく (服)",
        "reading": "fuku",
        "id": "Pakaian",
        "kanji": "服"
      },
      {
        "jp": "せいひん (製品)",
        "reading": "seihin",
        "id": "Produk",
        "kanji": "製品"
      },
      {
        "jp": "ソフト",
        "reading": "sofuto",
        "id": "Perangkat lunak"
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
        "jp": "はいしゃ (歯医者)",
        "reading": "haisha",
        "id": "Dokter gigi",
        "kanji": "歯医者"
      },
      {
        "jp": "どくしん (独身)",
        "reading": "dokushin",
        "id": "Bujangan, jomblo",
        "kanji": "独身"
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
        "reading": "dezaina-",
        "id": "Perancang busana"
      },
      {
        "jp": "ジャーナリスト",
        "reading": "ja-narisuto",
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
        "reading": "supo-tsusenshu",
        "id": "Olahragawan / atlit",
        "kanji": "スポーツ選手"
      }
    ],
    "dialogue": {
      "title": "ご家族は？ (Bagaimana dengan Keluarga Anda?)",
      "lines": [
        {
          "speaker": "Kimura",
          "jp": "ミラーさん、ご家族はどこにいらっしゃいますか。",
          "reading": "Miraa-san, gokazoku wa doko ni irasshaimasu ka.",
          "id": "Sdr. Miller, keluarga Anda tinggal di mana?"
        },
        {
          "speaker": "Miller",
          "jp": "両親はニューヨークの近くに住んでいます。",
          "reading": "Ryoushin wa Nyuu Yooku no chikaku ni sunde imasu.",
          "id": "Orang tua saya tinggal di dekat New York."
        },
        {
          "speaker": "Kimura",
          "jp": "ご兄弟はいらっしゃいますか。",
          "reading": "Gokyoudai wa irasshaimasu ka.",
          "id": "Apakah punya saudara kandung?"
        },
        {
          "speaker": "Miller",
          "jp": "姉が1人います。ロンドンの大学で英語を教えています。",
          "reading": "Ane ga hitori imasu. Rondon no daigaku de eigo o oshiete imasu.",
          "id": "Punya seorang kakak perempuan. Dia mengajar bahasa Inggris di universitas London."
        }
      ]
    }
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
        "pattern": "KK1-て、KK2-て、... KK-masu (Urutan Kronologis)",
        "formula": "KK1-te, KK2-te, KK3-masu",
        "explanation": "Menyambung dua atau lebih kata kerja secara kronologis berurutan waktu. Waktu kalimat (lampau atau bukan) ditentukan oleh kata kerja paling akhir.",
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
        "pattern": "KK1 bentuk-Te + から、KK2 (Te kara - Setelah)",
        "formula": "KK1-te kara, KK2",
        "explanation": "Menyatakan bahwa perbuatan KK2 baru dilakukan setelah perbuatan KK1 selesai seutuhnya.",
        "examples": [
          {
            "jp": "コンサートが 終わってから、レストランで 食事しました。",
            "reading": "Konsaato ga owatte kara, resutoran de shokuji shimashita.",
            "id": "Setelah konser selesai, kami makan di restoran."
          }
        ]
      },
      {
        "id": "m16-3",
        "pattern": "Kata Sifat Sambung (I-Kei: 〜くて; Na-Kei/KB: 〜で)",
        "formula": "I-Kei buang i ganti [kute]; Na-Kei/KB + [de]",
        "explanation": "Menggabungkan dua sifat atau kata benda yang sepadan. Ookii + kirei -> ookikute kirei desu. Shizuka + benri -> shizuka de benri desu.",
        "examples": [
          {
            "jp": "大阪は 食べ物が おいしくて、にぎやかです。",
            "reading": "Oosaka wa tabemono ga oishikute, nigiyaka desu.",
            "id": "Osaka makanannya enak dan suasananya ramai."
          },
          {
            "jp": "奈良は 静かで、きれいな 町です。",
            "reading": "Nara wa shizuka de, kirei na machi desu.",
            "id": "Nara adalah kota yang tenang dan indah."
          }
        ]
      },
      {
        "id": "m16-4",
        "pattern": "KB1 は KB2 が [Kata Sifat] です (Ciri Khas Atribut)",
        "formula": "KB1 [wa] KB2 [ga] + Kata Sifat",
        "explanation": "Digunakan untuk mendeskripsikan bagian tubuh atau atribut khusus dari subjek KB1.",
        "examples": [
          {
            "jp": "マリアさんは 髪が 長いです。",
            "reading": "Maria-san wa kami ga nagai desu.",
            "id": "Maria rambutnya panjang."
          }
        ]
      },
      {
        "id": "m16-5",
        "pattern": "どうやって (Dou yatte - Bagaimana Caranya?)",
        "formula": "Dou yatte + Kalimat Tanya",
        "explanation": "Menanyakan rute perjalanan, urutan langkah, atau bagaimana cara menuju suatu tempat.",
        "examples": [
          {
            "jp": "大学まで どうやって 行きますか。京都駅から 16番の バスに 乗ります。",
            "reading": "Daigaku made dou yatte ikimasu ka. Kyouto-eki kara juuroku-ban no basu ni norimasu.",
            "id": "Bagaimana caranya pergi ke universitas? Dari stasiun Kyoto naik bus nomor 16."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "のります（に） (乗ります)",
        "reading": "norimasu",
        "id": "Naik",
        "kanji": "乗ります"
      },
      {
        "jp": "おります（を） (降ります)",
        "reading": "orimasu",
        "id": "Turun",
        "kanji": "降ります"
      },
      {
        "jp": "のりかえます (乗り換えます)",
        "reading": "norikaemasu",
        "id": "Ganti, pindah kendaraan",
        "kanji": "乗り換えます"
      },
      {
        "jp": "あびます（を） (浴びます)",
        "reading": "abimasu",
        "id": "Mandi",
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
        "id": "Mengeluarkan",
        "kanji": "出します"
      },
      {
        "jp": "おろします（を） (下ろします)",
        "reading": "oroshimasu",
        "id": "Mengeluarkan/mengambil uang",
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
        "id": "Menekan",
        "kanji": "押します"
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
        "id": "Terang",
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
        "id": "Badan",
        "kanji": "体"
      },
      {
        "jp": "あたま (頭)",
        "reading": "atama",
        "id": "Kepala",
        "kanji": "頭"
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
        "reading": "sa-bisu",
        "id": "Pelayanan"
      },
      {
        "jp": "ジョギング",
        "reading": "jogingu",
        "id": "Joging"
      },
      {
        "jp": "シャワー",
        "reading": "shawa-",
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
        "reading": "dono～",
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
        "reading": "iie、madamadadesu",
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
        "reading": "kyasshuka-do",
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
    ],
    "dialogue": {
      "title": "使い方を教えてください (Tolong Ajarkan Cara Pakainya)",
      "lines": [
        {
          "speaker": "Maria",
          "jp": "すみません、ATMの使い方を教えていただけませんか。",
          "reading": "Sumimasen, ATM no tsukaikata o oshiete itadakemasen ka.",
          "id": "Permisi, bisakah tolong ajarkan cara memakai ATM?"
        },
        {
          "speaker": "Petugas",
          "jp": "はい。まず、ここにキャッシュカードを入れてください。",
          "reading": "Hai. Mazu, koko ni kyasshu kaado o irete kudasai.",
          "id": "Baik. Pertama-tama, masukkan kartu ATM di sini."
        },
        {
          "speaker": "Maria",
          "jp": "はい、入れました。",
          "reading": "Hai, iremashita.",
          "id": "Ya, sudah saya masukkan."
        },
        {
          "speaker": "Petugas",
          "jp": "次に暗証番号を押して、お引き出しボタンを押してください。",
          "reading": "Tsugi ni anshou bangou o oshite, ohikidashi botan o oshite kudasai.",
          "id": "Berikutnya tekan nomor PIN, lalu tekan tombol 'Penarikan Uang'."
        },
        {
          "speaker": "Maria",
          "jp": "なるほど、よくわかりました。ありがとうございます。",
          "reading": "Naruhodo, yoku wakarimashita. Arigatou gozaimasu.",
          "id": "O begitu, saya sangat mengerti sekarang. Terima kasih banyak."
        }
      ]
    }
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
        "pattern": "Aturan Pembentukan Bentuk-Nai (Nai-Kei)",
        "formula": "Grup 1: vokal 'i' -> 'a' + nai (kikimasu -> kikanai; aimasu -> awanai). Grup 2: buang masu + nai. Grup 3: shimasu -> shinai; kimasu -> konai.",
        "explanation": "Kaidah konjugasi bentuk negatif kasual/dasar pada kata kerja bahasa Jepang.",
        "examples": [
          {
            "jp": "書きます -> 書かない、食べます -> 食べない、来ます -> こない",
            "reading": "Kakimasu -> kakanai, tabemasu -> tabenai, kimasu -> konai",
            "id": "Menulis -> kakanai, makan -> tabenai, datang -> konai"
          }
        ]
      },
      {
        "id": "m17-2",
        "pattern": "KK bentuk-Nai + で ください (Nai de kudasai - Tolong Jangan)",
        "formula": "KK bentuk-Nai + de kudasai",
        "explanation": "Permohonan sopan kepada lawan bicara agar tidak melakukan suatu tindakan.",
        "examples": [
          {
            "jp": "ここで 写真を 撮らないで ください。",
            "reading": "Koko de shashin o toranaide kudasai.",
            "id": "Tolong jangan mengambil foto di sini."
          }
        ]
      },
      {
        "id": "m17-3",
        "pattern": "KK bentuk-Nai (buang -i) + ければ なりません (Harus / Wajib)",
        "formula": "KK-nakereba narimasen",
        "explanation": "Menyatakan kewajiban atau keharusan mutlak melakukan sesuatu tanpa memandang kemauan subjek.",
        "examples": [
          {
            "jp": "薬を 飲まなければ なりません。",
            "reading": "Kusuri o nomanakereba narimasen.",
            "id": "Saya harus minum obat."
          }
        ]
      },
      {
        "id": "m17-4",
        "pattern": "KK bentuk-Nai (buang -i) + くても いいです (Boleh Tidak / Tidak Perlu)",
        "formula": "KK-nakute mo ii desu",
        "explanation": "Menyatakan bahwa tidak ada kewajiban melakukan suatu hal ('tidak perlu / boleh tidak dilakukan').",
        "examples": [
          {
            "jp": "明日 来なくても いいです。",
            "reading": "Ashita konakute mo ii desu.",
            "id": "Besok tidak perlu datang juga tidak apa-apa."
          }
        ]
      },
      {
        "id": "m17-5",
        "pattern": "KB (Waktu/Hari) までに Kata Kerja (Batas Waktu Akhir)",
        "formula": "Waktu [made ni] + Kata Kerja",
        "explanation": "'Made ni' menunjukkan batas waktu paling lambat selesainya perbuatan (deadline). Berbeda dengan 'made' yang berarti terus berlangsung sampai saat itu.",
        "examples": [
          {
            "jp": "レポートは 金曜日までに 出して ください。",
            "reading": "Repooto wa kinyoubi made ni dashite kudasai.",
            "id": "Tolong kumpulkan laporannya paling lambat hari Jumat."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "おぼえます (覚えます)",
        "reading": "oboemasu",
        "id": "Mengingat",
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
        "id": "Kehilangan, hilang"
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
        "id": "Keluar rumah",
        "kanji": "出かけます"
      },
      {
        "jp": "ぬぎます (脱ぎます)",
        "reading": "nugimasu",
        "id": "Melepas pakaian",
        "kanji": "脱ぎます"
      },
      {
        "jp": "もっていきます (持って行きます)",
        "reading": "motteikimasu",
        "id": "Membawa pergi",
        "kanji": "持って行きます"
      },
      {
        "jp": "もってきます (持って来ます)",
        "reading": "mottekimasu",
        "id": "Membawa datang",
        "kanji": "持って来ます"
      },
      {
        "jp": "しんぱいします (心配します)",
        "reading": "shinpaishimasu",
        "id": "Khawatir",
        "kanji": "心配します"
      },
      {
        "jp": "ざんぎょうします (残業します)",
        "reading": "zangyoushimasu",
        "id": "Lembur",
        "kanji": "残業します"
      },
      {
        "jp": "しゅっちょうします (出張します)",
        "reading": "shucchoushimasu",
        "id": "Dinas",
        "kanji": "出張します"
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
        "jp": "ねつ (熱)",
        "reading": "netsu",
        "id": "Demam",
        "kanji": "熱"
      },
      {
        "jp": "びょうき (病気)",
        "reading": "byouki",
        "id": "Sakit",
        "kanji": "病気"
      },
      {
        "jp": "くすり (薬)",
        "reading": "kusuri",
        "id": "Obat",
        "kanji": "薬"
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
        "reading": "geriwoshimasu",
        "id": "Mencret, diare",
        "kanji": "下痢をします"
      },
      {
        "jp": "べんぴをします (便秘をします)",
        "reading": "benpiwoshimasu",
        "id": "Sembelit",
        "kanji": "便秘をします"
      },
      {
        "jp": "けがをします",
        "reading": "kegawoshimasu",
        "id": "Terluka"
      },
      {
        "jp": "やけどをします",
        "reading": "yakedowoshimasu",
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
    ],
    "dialogue": {
      "title": "どうしましたか (Ada Masalah Apa?)",
      "lines": [
        {
          "speaker": "Dokter",
          "jp": "どうしましたか。",
          "reading": "Dou shimashita ka.",
          "id": "Ada keluhan apa?"
        },
        {
          "speaker": "Matsumoto",
          "jp": "昨日から喉が痛くて、熱も38度あります。",
          "reading": "Kinou kara nodo ga itakute, netsu mo sanjuuhachi-do arimasu.",
          "id": "Sejak kemarin tenggorokan sakit, dan demam saya mencapai 38 derajat."
        },
        {
          "speaker": "Dokter",
          "jp": "ちょっと口を開けてください。風邪ですね。",
          "reading": "Chotto kuchi o akete kudasai. Kaze desu ne.",
          "id": "Tolong buka mulut sebentar. Anda kena flu/masuk angin ya."
        },
        {
          "speaker": "Matsumoto",
          "jp": "あした会社を休まなければなりませんか。",
          "reading": "Ashita kaisha o yasumanakereba narimasen ka.",
          "id": "Apakah besok saya harus izin tidak masuk kantor?"
        },
        {
          "speaker": "Dokter",
          "jp": "ええ、薬を飲んで、暖かくして寝てください。お大事に。",
          "reading": "Ee, kusuri o nonde, atatakaku shite nete kudasai. Odaiji ni.",
          "id": "Ya, minumlah obat dan beristirahatlah dengan hangat. Semoga lekas sembuh."
        }
      ]
    }
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
        "pattern": "Pembentukan Bentuk Kamus (Jishokei)",
        "formula": "Grup 1: vokal 'i' -> 'u' (kakimasu -> kaku). Grup 2: buang masu + ru (taberu). Grup 3: suru, kuru.",
        "explanation": "Bentuk dasar kata kerja yang tercantum di kamus dan digunakan dalam percakapan kasual serta pembentukan tata bahasa majemuk.",
        "examples": [
          {
            "jp": "書きます -> 書く、食べます -> 食べる、します -> する",
            "reading": "Kakimasu -> kaku, tabemasu -> taberu, shimasu -> suru",
            "id": "Bentuk kamus dari menulis, makan, dan melakukan"
          }
        ]
      },
      {
        "id": "m18-2",
        "pattern": "KK bentuk Kamus + ことが できます (Bisa / Mampu)",
        "formula": "KK Jishokei [koto ga dekimasu]",
        "explanation": "Menyatakan kemampuan kompetensi subjek atau kemungkinan diizinkannya suatu tindakan.",
        "examples": [
          {
            "jp": "ミラーさんは 漢字を 読むことが できます。",
            "reading": "Miraa-san wa kanji o yomu koto ga dekimasu.",
            "id": "Sdr. Miller bisa membaca huruf Kanji."
          },
          {
            "jp": "カードで 払うことが できます。",
            "reading": "Kaado de harau koto ga dekimasu.",
            "id": "Bisa membayar menggunakan kartu."
          }
        ]
      },
      {
        "id": "m18-3",
        "pattern": "わたしの 趣味は [KK Kamus + こと] です (Nominalisasi Hobi)",
        "formula": "Shumi wa [KK Jishokei + koto] desu",
        "explanation": "Membendakan kata kerja dengan membubuhkan 'koto' untuk menyatakan hobi atau kegemaran.",
        "examples": [
          {
            "jp": "わたしの 趣味は 音楽を 聞くことです。",
            "reading": "Watashi no shumi wa ongaku o kiku koto desu.",
            "id": "Hobi saya adalah mendengarkan musik."
          }
        ]
      },
      {
        "id": "m18-4",
        "pattern": "KK Kamus / KB の / Durasi + 前に (Mae ni - Sebelum)",
        "formula": "[KK Jishokei / KB no] + mae ni",
        "explanation": "Menyatakan urutan waktu sebelum suatu tindakan lain terjadi.",
        "examples": [
          {
            "jp": "寝る まえに、本を 読みます。",
            "reading": "Neru mae ni, hon o yomimasu.",
            "id": "Sebelum tidur, saya membaca buku."
          },
          {
            "jp": "食事の まえに、手を 洗います。",
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
        "id": "Dapat, bisa, mampu"
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
        "id": "Bermain (alat musik , piano)",
        "kanji": "弾きます"
      },
      {
        "jp": "うたいます (歌います)",
        "reading": "utaimasu",
        "id": "Menyanyi",
        "kanji": "歌います"
      },
      {
        "jp": "あつめます (集めます)",
        "reading": "atsumemasu",
        "id": "Mengumpulkan",
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
        "id": "Menukar, mengganti",
        "kanji": "換えます"
      },
      {
        "jp": "うんてんします (運転します)",
        "reading": "untenshimasu",
        "id": "Menyetir, mengendarai",
        "kanji": "運転します"
      },
      {
        "jp": "よやくします (予約します)",
        "reading": "yoyakushimasu",
        "id": "Memesan",
        "kanji": "予約します"
      },
      {
        "jp": "ピアノ",
        "reading": "piano",
        "id": "Piano"
      },
      {
        "jp": "～メートル",
        "reading": "~me-toru",
        "id": "Meter"
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
        "id": "Hobi , kegemaran",
        "kanji": "趣味"
      },
      {
        "jp": "にっき (日記)",
        "reading": "nikki",
        "id": "Catatan harian",
        "kanji": "日記"
      },
      {
        "jp": "おいのり (お祈り)",
        "reading": "oinori",
        "id": "Doa",
        "kanji": "お祈り"
      },
      {
        "jp": "かちょう (課長)",
        "reading": "kachou",
        "id": "Kepala seksi",
        "kanji": "課長"
      },
      {
        "jp": "ぶちょう (部長)",
        "reading": "buchou",
        "id": "Kepala bagian",
        "kanji": "部長"
      },
      {
        "jp": "しゃちょう (社長)",
        "reading": "shachou",
        "id": "Direktur utama",
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
        "reading": "inta-netto",
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
        "reading": "tobu",
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
    ],
    "dialogue": {
      "title": "趣味は何ですか (Apa Hobi Anda?)",
      "lines": [
        {
          "speaker": "Yamada",
          "jp": "サントスさんの趣味は何ですか。",
          "reading": "Santosu-san no shumi wa nan desu ka.",
          "id": "Apa hobi Sdr. Santos?"
        },
        {
          "speaker": "Santos",
          "jp": "写真を撮ることです。特に動物の写真を撮ることが好きです。",
          "reading": "Shashin o toru koto desu. Toku ni doubutsu no shashin o toru koto ga suki desu.",
          "id": "Memotret foto. Khususnya saya suka mengambil foto binatang."
        },
        {
          "speaker": "Yamada",
          "jp": "へえ、日本でもう撮りましたか。",
          "reading": "Hee, Nihon de mou torimashita ka.",
          "id": "Wah, apakah sudah memotret di Jepang?"
        },
        {
          "speaker": "Santos",
          "jp": "はい、北海道で馬の写真をたくさん撮ることができました。",
          "reading": "Hai, Hokkaidou de uma no shashin o takusan toru koto ga dekimashita.",
          "id": "Ya, saya sempat mengambil banyak foto kuda di Hokkaido."
        },
        {
          "speaker": "Yamada",
          "jp": "それは素晴らしいですね！ぜひ見せてください。",
          "reading": "Sore wa subarashii desu ne! Zehi misete kudasai.",
          "id": "Itu hebat sekali ya! Pastikan memperlihatkannya pada saya ya."
        }
      ]
    }
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
        "pattern": "KK bentuk-Ta + ことが あります (Pernah - Pengalaman)",
        "formula": "KK bentuk-Ta + koto ga arimasu",
        "explanation": "Bentuk lampau biasa (ta-kei) + koto ga arimasu menyatakan bahwa subjek pernah memiliki pengalaman melakukan hal tersebut.",
        "examples": [
          {
            "jp": "富士山に 登ったことが あります。",
            "reading": "Fujisan ni nobotta koto ga arimasu.",
            "id": "Saya pernah mendaki Gunung Fuji."
          },
          {
            "jp": "馬に 乗ったことが ありません。",
            "reading": "Uma ni notta koto ga arimasen.",
            "id": "Saya belum pernah naik kuda."
          }
        ]
      },
      {
        "id": "m19-2",
        "pattern": "KK1-たり、KK2-たり します (Tari ... Tari shimasu)",
        "formula": "KK1-tari, KK2-tari shimasu/shimashita",
        "explanation": "Menyebutkan perwakilan contoh tindakan dari banyak perbuatan tanpa urutan kronologis yang kaku.",
        "examples": [
          {
            "jp": "日曜日は テニスを したり、映画を 見たり しました。",
            "reading": "Nichiyoubi wa tenisu o shitari, eiga o mitari shimashita.",
            "id": "Hari Minggu saya bermain tenis, menonton film, dan lain-lain."
          }
        ]
      },
      {
        "id": "m19-3",
        "pattern": "Kata Sifat / KB + なります (Narimasu - Menjadi)",
        "formula": "I-Kei (-i jadi -ku); Na-Kei (-na jadi -ni); KB + ni narimasu",
        "explanation": "Menyatakan perubahan status, suhu, atau sifat kondisi dari waktu ke waktu.",
        "examples": [
          {
            "jp": "寒く なります。",
            "reading": "Samuku narimasu.",
            "id": "Menjadi dingin."
          },
          {
            "jp": "元気に なりました。",
            "reading": "Genki ni narimashita.",
            "id": "Sudah menjadi sehat kembali."
          },
          {
            "jp": "25歳に なります。",
            "reading": "Nijuugo-sai ni narimasu.",
            "id": "Akan genap berusia 25 tahun."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "のぼります (登ります、上ります)",
        "reading": "noborimasu",
        "id": "Naik , mendaki",
        "kanji": "登ります、上ります"
      },
      {
        "jp": "とまります（に） (泊まります)",
        "reading": "tomarimasu",
        "id": "Menginap",
        "kanji": "泊まります"
      },
      {
        "jp": "そうじします (掃除します)",
        "reading": "soujishimasu",
        "id": "Membersihkan",
        "kanji": "掃除します"
      },
      {
        "jp": "せんたくします (洗濯します)",
        "reading": "sentakushimasu",
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
        "jp": "れんしゅう (練習)",
        "reading": "renshuu",
        "id": "Latihan",
        "kanji": "練習"
      },
      {
        "jp": "ゴルフ",
        "reading": "gorufu",
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
        "jp": "ちょうし (調子)",
        "reading": "choushi",
        "id": "Kondisi",
        "kanji": "調子"
      },
      {
        "jp": "いちど (一度)",
        "reading": "ichido",
        "id": "Sekali",
        "kanji": "一度"
      },
      {
        "jp": "いちども (一度も)",
        "reading": "ichidomo",
        "id": "Sekalipun",
        "kanji": "一度も"
      },
      {
        "jp": "だんだん",
        "reading": "dandan",
        "id": "Sedikit demi sedikit, berangsur-angsur"
      },
      {
        "jp": "もうすぐ",
        "reading": "mousugu",
        "id": "Tidak lama lagi , sebentar lagi"
      },
      {
        "jp": "おかげさまで",
        "reading": "okagesamade",
        "id": "Atas berkat ( doa ) anda"
      },
      {
        "jp": "でも",
        "reading": "demo",
        "id": "Tetapi"
      },
      {
        "jp": "かんぱい (乾杯)",
        "reading": "kanpai",
        "id": "Toast",
        "kanji": "乾杯"
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
        "reading": "toukyousukaitsuri-",
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
        "id": "Seni menulis huruf jepang",
        "kanji": "書道"
      },
      {
        "jp": "かぶき (歌舞伎)",
        "reading": "kabuki",
        "id": "Kabuki (Drama tradisional jepang)",
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
        "id": "Bunraku (Wayang golek tradisional jepang)",
        "kanji": "文楽"
      },
      {
        "jp": "じゅうどう (柔道)",
        "reading": "juudou",
        "id": "Judo (Olahraga tradisional jepang)",
        "kanji": "柔道"
      },
      {
        "jp": "けんどう (剣道)",
        "reading": "kendou",
        "id": "Kendo (Olahraga tradisional jepang)",
        "kanji": "剣道"
      },
      {
        "jp": "からて (空手)",
        "reading": "karate",
        "id": "Karate (olahraga beladiri jepang)",
        "kanji": "空手"
      },
      {
        "jp": "まんざい・らくご (漫才・落語)",
        "reading": "manzai・rakugo",
        "id": "Lelucon, komedi",
        "kanji": "漫才・落語"
      },
      {
        "jp": "いご・しょうぎ (囲碁・将棋)",
        "reading": "igo・shougi",
        "id": "Catur jepang",
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
    ],
    "dialogue": {
      "title": "ダイエットは明日からします (Dietnya Mulai Besok)",
      "lines": [
        {
          "speaker": "Ny. Yamada",
          "jp": "マリアさん、全然食べませんね。おいしくないですか。",
          "reading": "Maria-san, zenzen tabemasen ne. Oishiku nai desu ka.",
          "id": "Maria, kok tidak makan sama sekali? Tidak enak ya?"
        },
        {
          "speaker": "Maria",
          "jp": "いいえ、とてもおいしいです。でも、昨日からダイエットをしているんです。",
          "reading": "Iie, totemo oishii desu. Demo, kinou kara daietto o shite iru n desu.",
          "id": "Bukan begitu, ini sangat lezat. Tapi sejak kemarin saya sedang diet."
        },
        {
          "speaker": "Ny. Yamada",
          "jp": "そうですか。でも、この自家製ケーキは体にいいですよ。",
          "reading": "Sou desu ka. Demo, kono jikasei keeki wa karada ni ii desu yo.",
          "id": "O begitu. Tapi kue buatan rumah ini sehat untuk tubuh lho."
        },
        {
          "speaker": "Maria",
          "jp": "わあ、一口だけいただきます！...ダイエットは明日からにします。",
          "reading": "Waa, hitokuchi dake itadakimasu! ...Daietto wa ashita kara ni shimasu.",
          "id": "Wah, saya coba sesuap saja ya!... Kalau begitu dietnya mulai besok saja."
        }
      ]
    }
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
        "pattern": "Bentuk Biasa (普通形 Futsuukei) vs Bentuk Sopan (丁寧形 Teineikei)",
        "formula": "Kamus/Nai/Ta/Nakatta vs Masu/Masen/Mashita/Masen deshita",
        "explanation": "Perubahan sistematis seluruh predikat kata kerja, kata sifat, dan kata benda ke dalam gaya biasa/kasual.",
        "examples": [
          {
            "jp": "食べる (taberu) = 食べます、飲まない (nomanai) = 飲みません",
            "reading": "Taberu = tabemasu, nomanai = nomimasen",
            "id": "Padanan bentuk kasual biasa vs sopan formal"
          }
        ]
      },
      {
        "id": "m20-2",
        "pattern": "Percakapan Kasual (Gaya Akrab)",
        "formula": "Pertanyaan: hilangkan 'ka' & 'da', gunakan intonasi naik (↑)",
        "explanation": "Dalam percakapan santai dengan teman akrab atau keluarga, partikel tanya 'ka' dan kopula 'da' pada pertanyaan dihilangkan, cukup intonasi naik.",
        "examples": [
          {
            "jp": "コーヒーを 飲む？うん、飲む。",
            "reading": "Koohii o nomu? Un, nomu.",
            "id": "Mau minum kopi? Ya, mau."
          },
          {
            "jp": "今晩 暇？ううん、暇じゃない。",
            "reading": "Konban hima? Uun, hima ja nai.",
            "id": "Nanti malam senggang? Nggak, nggak senggang."
          }
        ]
      },
      {
        "id": "m20-3",
        "pattern": "〜けど (~ Kedo - Tetapi dalam Ragam Lisan)",
        "formula": "Kalimat + kedo",
        "explanation": "'Kedo' berfungsi sama dengan 'ga' (tetapi) namun bernuansa santai dan akrab dalam percakapan sehari-hari.",
        "examples": [
          {
            "jp": "そのカレー、おいしい？うん、辛いけど、おいしい。",
            "reading": "Sono karee, oishii? Un, karai kedo, oishii.",
            "id": "Kare itu enak? Ya, pedas sih tapi enak."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "いります（が） (要ります)",
        "reading": "irimasu",
        "id": "Memerlukan",
        "kanji": "要ります"
      },
      {
        "jp": "しらべます (調べます)",
        "reading": "shirabemasu",
        "id": "Memeriksa,meneliti,mengecek",
        "kanji": "調べます"
      },
      {
        "jp": "しゅうりします (修理します)",
        "reading": "shuurishimasu",
        "id": "Memperbaiki",
        "kanji": "修理します"
      },
      {
        "jp": "ぼく (僕)",
        "reading": "boku",
        "id": "Aku",
        "kanji": "僕"
      },
      {
        "jp": "きみ (君)",
        "reading": "kimi",
        "id": "Kamu",
        "kanji": "君"
      },
      {
        "jp": "～くん (～君)",
        "reading": "~kun",
        "id": "Saudara~",
        "kanji": "～君"
      },
      {
        "jp": "うん",
        "reading": "un",
        "id": "Ya"
      },
      {
        "jp": "ううん",
        "reading": "uun",
        "id": "Tidak"
      },
      {
        "jp": "ことば",
        "reading": "kotoba",
        "id": "Kata, kosakata ,bahasa"
      },
      {
        "jp": "きもの (着物)",
        "reading": "kimono",
        "id": "Kimono",
        "kanji": "着物"
      },
      {
        "jp": "ビザ",
        "reading": "biza",
        "id": "Visa"
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
        "reading": "kocchi",
        "id": "Sini"
      },
      {
        "jp": "そっち",
        "reading": "socchi",
        "id": "Situ"
      },
      {
        "jp": "あっち",
        "reading": "acchi",
        "id": "Sana"
      },
      {
        "jp": "どっち",
        "reading": "docchi",
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
    ],
    "dialogue": {
      "title": "いっしょに行かない？ (Mau Pergi Bareng?)",
      "lines": [
        {
          "speaker": "Kobayashi",
          "jp": "タワポン君、夏休みに富士山へ行かない？",
          "reading": "Tawapon-kun, natsuyasumi ni Fujisan e ikanai?",
          "id": "Thawaphon, mau pergi ke Gunung Fuji pas liburan musim panas?"
        },
        {
          "speaker": "Thawaphon",
          "jp": "うん、いいね！いつ行く？",
          "reading": "Un, ii ne! Itsu iku?",
          "id": "Wah, asik tuh! Kapan perginya?"
        },
        {
          "speaker": "Kobayashi",
          "jp": "8月の初めはどう？車で行こうよ。",
          "reading": "Hachigatsu no hajime wa dou? Kuruma de ikou yo.",
          "id": "Awal Agustus gimana? Ayo kita naik mobil."
        },
        {
          "speaker": "Thawaphon",
          "jp": "うん、わかった。富士山に登ったことがある？",
          "reading": "Un, wakatta. Fujisan ni nobotta koto ga aru?",
          "id": "Oke, siap. Kamu pernah mendaki Gunung Fuji sebelumnya?"
        },
        {
          "speaker": "Kobayashi",
          "jp": "ううん、一度もない。だから楽しみなんだ。",
          "reading": "Uun, ichido mo nai. Dakara tanoshimi nan da.",
          "id": "Belum, belum pernah sekali pun. Karena itu aku sangat menantikannya."
        }
      ]
    }
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
        "pattern": "[Bentuk Biasa] と 思います (~ to omoimasu - Pendapat / Dugaan)",
        "formula": "Kalimat Bentuk Biasa (Futsuukei) + to omoimasu",
        "explanation": "Menyatakan opini, perkiraan, atau dugaan pribadi dari pembicara ('Saya kira / pikir bahwa...').",
        "examples": [
          {
            "jp": "あした 雨が 降ると 思います。",
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
        "pattern": "「Kutipan Langsung」 / [Futsuukei] と 言いました (Berkata Bahwa...)",
        "formula": "Kutipan + to iimashita",
        "explanation": "Melaporkan perkataan seseorang, baik secara kutipan langsung dalam tanda kurung siku 「」 maupun kutipan tidak langsung bentuk biasa.",
        "examples": [
          {
            "jp": "寝るまえに 「お休みなさい」と 言います。",
            "reading": "Neru mae ni 'Oyasuminasai' to iimasu.",
            "id": "Sebelum tidur mengucapkan 'Selamat tidur'."
          },
          {
            "jp": "ミラーさんは 来週 東京へ 出張すると 言いました。",
            "reading": "Miraa-san wa raishuu Toukyou e shucchou suru to iimashita.",
            "id": "Sdr. Miller mengatakan bahwa minggu depan dia akan dinas ke Tokyo."
          }
        ]
      },
      {
        "id": "m21-3",
        "pattern": "[Bentuk Biasa] でしょう (~ deshou - Bukan / Kan?)",
        "formula": "Kalimat Futsuukei (tanpa da) + deshou?",
        "explanation": "Diucapkan dengan intonasi naik untuk memastikan kesepakatan atau konfirmasi dari lawan bicara ('... kan?').",
        "examples": [
          {
            "jp": "あした パーティーに 行くでしょう。ええ、行きます。",
            "reading": "Ashita paatii ni iku deshou. Ee, ikimasu.",
            "id": "Besok kamu pergi ke pesta kan? Ya, saya pergi."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "おもいます (思います)",
        "reading": "omoimasu",
        "id": "Mengira, berfikir",
        "kanji": "思います"
      },
      {
        "jp": "いいます (言います)",
        "reading": "iimasu",
        "id": "Berkata, mengatakan",
        "kanji": "言います"
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
        "jp": "やくにたちます (役に立ちます)",
        "reading": "yakunitachimasu",
        "id": "Bermanfaat, berguna",
        "kanji": "役に立ちます"
      },
      {
        "jp": "うごきます (動きます)",
        "reading": "ugokimasu",
        "id": "Pindah, bergerak",
        "kanji": "動きます"
      },
      {
        "jp": "やめます（を）",
        "reading": "yamemasu",
        "id": "Berhenti"
      },
      {
        "jp": "きをつけます (気を付けます)",
        "reading": "kiwotsukemasu",
        "id": "Berhati-hati, berwaspada",
        "kanji": "気を付けます"
      },
      {
        "jp": "りゅうがくします (留学します)",
        "reading": "ryuugakushimasu",
        "id": "Studi di luar negeri",
        "kanji": "留学します"
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
        "jp": "すごい",
        "reading": "sugoi",
        "id": "Hebat"
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
        "jp": "ニュース",
        "reading": "nyu-su",
        "id": "Siaran, pengumuman"
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
        "reading": "shushou",
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
    ],
    "dialogue": {
      "title": "わたしもそう思います (Saya Kira Juga Begitu)",
      "lines": [
        {
          "speaker": "Santos",
          "jp": "久しぶりですね。日本のサッカーは本当に強くなりましたね。",
          "reading": "Hisashiburi desu ne. Nihon no sakkaa wa hontou ni tsuyoku narimashita ne.",
          "id": "Sudah lama tidak jumpa ya. Sepak bola Jepang benar-benar semakin kuat ya."
        },
        {
          "speaker": "Matsumoto",
          "jp": "ええ、わたしもそう思います。練習をたくさんしていますから。",
          "reading": "Ee, watashi mo sou omoimasu. Renshuu o takusan shite imasu kara.",
          "id": "Ya, saya kira juga begitu. Karena mereka banyak berlatih."
        },
        {
          "speaker": "Santos",
          "jp": "あしたのブラジルとの試合についてどう思いますか。",
          "reading": "Ashita no Burajiru to no shiai ni tsuite dou omoimasu ka.",
          "id": "Bagaimana pendapat Anda tentang pertandingan besok melawan Brasil?"
        },
        {
          "speaker": "Matsumoto",
          "jp": "もちろんブラジルが勝つと思いますが、いい試合になるでしょう。",
          "reading": "Mochiron Burajiru ga katsu to omoimasu ga, ii shiai ni naru deshou.",
          "id": "Tentu saja saya kira Brasil akan menang, tetapi akan menjadi pertandingan yang seru."
        }
      ]
    }
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
        "pattern": "Anak Kalimat Menerangkan Kata Benda (Klausa Relatif)",
        "formula": "[Kalimat Bentuk Biasa Futsuukei] + Kata Benda",
        "explanation": "Menyusun klausa penjelas nomina dengan meletakkan kata kerja/sifat bentuk biasa langsung di depan kata benda tanpa kata sambung 'yang'.",
        "examples": [
          {
            "jp": "これは ミラーさんが 作った ケーキです。",
            "reading": "Kore wa Miraa-san ga tsukutta keeki desu.",
            "id": "Ini adalah kue yang dibuat oleh Tuan Miller."
          },
          {
            "jp": "あそこで 本を 読んで いる 人は だれですか。",
            "reading": "Asoko de hon o yonde iru hito wa dare desu ka.",
            "id": "Siapakah orang yang sedang membaca buku di sana itu?"
          }
        ]
      },
      {
        "id": "m22-2",
        "pattern": "Subjek dalam Anak Kalimat Ditandai Partikel が (Ga)",
        "formula": "Dalam klausa penjelas: Subjek [ga] + KK + KB",
        "explanation": "Partikel penanda subjek di dalam anak kalimat wajib menggunakan が (bukan は).",
        "examples": [
          {
            "jp": "カリナさんが かいた 絵は どれですか。",
            "reading": "Karina-san ga kaita e wa dore desu ka.",
            "id": "Lukisan yang digambar oleh Karina yang mana?"
          }
        ]
      },
      {
        "id": "m22-3",
        "pattern": "[KK Kamus] 時間 / 約束 / 用事 が あります",
        "formula": "KK Kamus + [jikan / yakusoku / youji] ga arimasu",
        "explanation": "Menyatakan ada waktu, janji, atau urusan untuk melakukan sesuatu.",
        "examples": [
          {
            "jp": "朝ごはんを 食べる 時間が ありません。",
            "reading": "Asagohan o taberu jikan ga arimasen.",
            "id": "Saya tidak ada waktu untuk makan sarapan."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "きます (着ます)",
        "reading": "kimasu",
        "id": "Memakai (pakaian)",
        "kanji": "着ます"
      },
      {
        "jp": "はきます",
        "reading": "hakimasu",
        "id": "Memakai (sepatu,celana)"
      },
      {
        "jp": "かぶります",
        "reading": "kaburimasu",
        "id": "Memakai (topi)"
      },
      {
        "jp": "かけます（を）",
        "reading": "kakemasu",
        "id": "Memakai (kacamata)"
      },
      {
        "jp": "します（を）",
        "reading": "shimasu",
        "id": "Memakai (dasi)"
      },
      {
        "jp": "うまれます (生まれます)",
        "reading": "umaremasu",
        "id": "Lahir",
        "kanji": "生まれます"
      },
      {
        "jp": "わたしたち",
        "reading": "watashitachi",
        "id": "Kami,kita"
      },
      {
        "jp": "コート",
        "reading": "ko-to",
        "id": "Mantel"
      },
      {
        "jp": "セーター",
        "reading": "se-ta-",
        "id": "Sweter / baju hangat"
      },
      {
        "jp": "スーツ",
        "reading": "su-tsu",
        "id": "Pakaian setelan"
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
        "jp": "ケーキ",
        "reading": "ke-ki",
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
        "reading": "yu-moa",
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
        "jp": "おめでとうございます",
        "reading": "omedetougozaimasu",
        "id": "Selamat"
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
        "reading": "dainingukicchin",
        "id": "Ruang makan dengan dapur"
      },
      {
        "jp": "わしつ (和室)",
        "reading": "washitsu",
        "id": "Kamar ala jepang",
        "kanji": "和室"
      },
      {
        "jp": "おしいれ (押し入れ)",
        "reading": "oshiire",
        "id": "Lemari dinding ala jepang",
        "kanji": "押し入れ"
      },
      {
        "jp": "ふとん (布団)",
        "reading": "futon",
        "id": "Selimut dan kasur berisi kapas ala jepang",
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
        "reading": "wanpi-su",
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
        "reading": "ji-nzu",
        "id": "Celana jeans"
      },
      {
        "jp": "スカート",
        "reading": "suka-to",
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
        "reading": "mafura-",
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
        "reading": "reinko-to",
        "id": "Jas hujan"
      },
      {
        "jp": "ベルト",
        "reading": "beruto",
        "id": "Sabuk, ikat pinggang"
      },
      {
        "jp": "ハイヒール",
        "reading": "haihi-ru",
        "id": "Sepatu berhak tinggi"
      },
      {
        "jp": "ブーツ",
        "reading": "bu-tsu",
        "id": "Sepatu bot"
      },
      {
        "jp": "ぞうり",
        "reading": "zouri",
        "id": "Sandal tradisional jepang"
      },
      {
        "jp": "たび",
        "reading": "tabi",
        "id": "Kaos kaki tradisional jepang"
      },
      {
        "jp": "おび (帯)",
        "reading": "obi",
        "id": "Ikat pinggang tradisional jepang",
        "kanji": "帯"
      }
    ],
    "dialogue": {
      "title": "どんなアパートがいいですか (Ingin Apartemen yang Bagaimana?)",
      "lines": [
        {
          "speaker": "Agen",
          "jp": "どんなアパートをお探しですか。",
          "reading": "Donna apaato o osagashi desu ka.",
          "id": "Apartemen seperti apa yang sedang Anda cari?"
        },
        {
          "speaker": "Wang",
          "jp": "家賃が8万円以下で、駅から歩いて10分以内の所がいいです。",
          "reading": "Yachin ga hachiman-en ika de, eki kara aruite jippun inai no tokoro ga ii desu.",
          "id": "Saya ingin yang uang sewanya di bawah 80.000 yen, dan jalan kaki di bawah 10 menit dari stasiun."
        },
        {
          "speaker": "Agen",
          "jp": "では、公園の近くにあるこの部屋はどうですか。新しくて静かですよ。",
          "reading": "Dewa, kouen no chikaku ni aru kono heya wa dou desu ka. Atarashikute shizuka desu yo.",
          "id": "Kalau begitu, bagaimana dengan kamar dekat taman ini? Masih baru dan tenang lho."
        },
        {
          "speaker": "Wang",
          "jp": "いいですね。今日見に行くことができますか。",
          "reading": "Ii desu ne. Kyou mi ni iku koto ga dekimasu ka.",
          "id": "Bagus ya. Bisakah saya pergi melihatnya hari ini?"
        }
      ]
    }
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
        "pattern": "[KK Kamus / KK-Ta / Sifat / KB の] とき、〜 (~ Toki - Ketika)",
        "formula": "[Kamus (belum selesai) / Ta (sudah selesai)] + toki",
        "explanation": "Menyatakan waktu terjadinya peristiwa. KK kamus + toki berarti perbuatan belum selesai. KK-ta + toki berarti perbuatan telah selesai dilakukan.",
        "examples": [
          {
            "jp": "図書館で 本を 借りる とき、カードが 要ります。",
            "reading": "Toshokan de hon o kariru toki, kaado ga irimasu.",
            "id": "Ketika meminjam buku di perpustakaan, memerlukan kartu."
          },
          {
            "jp": "うちへ 帰った とき、「ただいま」と 言います。",
            "reading": "Uchi e kaetta toki, 'Tadaima' to iimasu.",
            "id": "Ketika sudah sampai di rumah, mengucapkan 'Tadaima'."
          }
        ]
      },
      {
        "id": "m23-2",
        "pattern": "[KK Kamus] と、〜 (~ To - Kalau / Begitu... Maka)",
        "formula": "KK Kamus [to], Kalimat Akibat",
        "explanation": "Pengandaian pasti yang menghasilkan peristiwa tak terhindarkan, hukum alam, atau pengoperasian mesin otomatis.",
        "examples": [
          {
            "jp": "このボタンを 押すと、お釣りが 出ます。",
            "reading": "Kono botan o osu to, otsuri ga demasu.",
            "id": "Kalau menekan tombol ini, uang kembalian akan keluar."
          },
          {
            "jp": "右へ 曲がると、郵便局が あります。",
            "reading": "Migi e magaru to, yuubinkyoku ga arimasu.",
            "id": "Kalau belok ke kanan, ada kantor pos."
          }
        ]
      },
      {
        "id": "m23-3",
        "pattern": "[Tempat] を [KK Gerak: Watarimasu, Arukimasu]",
        "formula": "Tempat/Jalan [o] watarimasu / arukimasu / magarimasu",
        "explanation": "Partikel 'o' digunakan bersama kata kerja pergerakan untuk menandai area jalan atau jembatan yang dilintasi.",
        "examples": [
          {
            "jp": "橋を 渡ります。交差点を 右へ 曲がります。",
            "reading": "Hashi o watarimasu. Kousaten o migi e magarimasu.",
            "id": "Menyeberangi jembatan. Belok kanan di perempatan."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "ききます（に） (聞きます)",
        "reading": "kikimasu",
        "id": "Bertanya",
        "kanji": "聞きます"
      },
      {
        "jp": "まわします (回します)",
        "reading": "mawashimasu",
        "id": "Memutar",
        "kanji": "回します"
      },
      {
        "jp": "ひきます (引きます)",
        "reading": "hikimasu",
        "id": "Menarik, tarik",
        "kanji": "引きます"
      },
      {
        "jp": "かえます (変えます)",
        "reading": "kaemasu",
        "id": "Mengubah",
        "kanji": "変えます"
      },
      {
        "jp": "さわります（に） (触ります)",
        "reading": "sawarimasu",
        "id": "Menyentuh",
        "kanji": "触ります"
      },
      {
        "jp": "でます（が） (出ます)",
        "reading": "demasu",
        "id": "Keluar",
        "kanji": "出ます"
      },
      {
        "jp": "あるきます (歩きます)",
        "reading": "arukimasu",
        "id": "Berjalan kaki",
        "kanji": "歩きます"
      },
      {
        "jp": "わたります（を） (渡ります)",
        "reading": "watarimasu",
        "id": "Menyeberang",
        "kanji": "渡ります"
      },
      {
        "jp": "まがります（へ） (曲がります)",
        "reading": "magarimasu",
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
        "jp": "おゆ (お湯)",
        "reading": "oyu",
        "id": "Air panas",
        "kanji": "お湯"
      },
      {
        "jp": "おと (音)",
        "reading": "oto",
        "id": "Suara, bunyi",
        "kanji": "音"
      },
      {
        "jp": "サイズ",
        "reading": "saizu",
        "id": "Ukuran"
      },
      {
        "jp": "こしょう (故障)",
        "reading": "koshou",
        "id": "Kerusakan",
        "kanji": "故障"
      },
      {
        "jp": "みち (道)",
        "reading": "michi",
        "id": "Jalan",
        "kanji": "道"
      },
      {
        "jp": "こうさてん (交差点)",
        "reading": "kousaten",
        "id": "Perempatan",
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
        "id": "Sudut",
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
    ],
    "dialogue": {
      "title": "どうやって行きますか (Bagaimana Caranya ke Sana?)",
      "lines": [
        {
          "speaker": "Karina",
          "jp": "すみません、国立美術館へ行きたいんですが、どうやって行きますか。",
          "reading": "Sumimasen, kokuritsu bijutsukan e ikitai n desu ga, dou yatte ikimasu ka.",
          "id": "Permisi, saya ingin pergi ke Museum Seni Nasional, bagaimana caranya ke sana?"
        },
        {
          "speaker": "Petugas",
          "jp": "駅を出て、まっすぐ歩くと、大きな交差点があります。",
          "reading": "Eki o dete, massugu aruku to, ookina kousaten ga arimasu.",
          "id": "Keluar dari stasiun, kalau Anda jalan lurus, akan ada perempatan besar."
        },
        {
          "speaker": "Karina",
          "jp": "交差点ですね。",
          "reading": "Kousaten desu ne.",
          "id": "Perempatan ya."
        },
        {
          "speaker": "Petugas",
          "jp": "そこを右へ曲がると、左側に高い白い建物が見えます。それですよ。",
          "reading": "Soko o migi e magaru to, hidari-gawa ni takai shiroi tatemono ga miemasu. Sore desu yo.",
          "id": "Kalau belok ke kanan di situ, di sebelah kiri akan kelihatan gedung putih tinggi. Itu gedungnya."
        },
        {
          "speaker": "Karina",
          "jp": "わかりました。親切にありがとうございます。",
          "reading": "Wakarimashita. Shinsetsu ni arigatou gozaimasu.",
          "id": "Saya mengerti. Terima kasih banyak atas keramahan Anda."
        }
      ]
    }
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
        "pattern": "[Orang Lain] が [Saya] に KB を くれます (Kuremasu)",
        "formula": "Pemberi [ga] watashi [ni] KB [o] kuremasu",
        "explanation": "Menyatakan orang lain memberikan sesuatu kepada saya atau pihak keluarga saya (kebaikan masuk ke arah pembicara).",
        "examples": [
          {
            "jp": "佐藤さんは わたしに クリスマスカードを くれました。",
            "reading": "Satou-san wa watashi ni Kurisumasu kaado o kuremashita.",
            "id": "Saudari Sato memberikan kartu Natal kepada saya."
          }
        ]
      },
      {
        "id": "m24-2",
        "pattern": "KK bentuk-Te + あげます / もらいます / くれます (Pemberian Jasa)",
        "formula": "KK-te agemasu (membantu orang); KK-te moraimasu (menerima jasa); KK-te kuremasu (orang membantu saya)",
        "explanation": "Mengungkapkan pemberian atau penerimaan bantuan perbuatan yang mendatangkan keuntungan atau rasa terima kasih.",
        "examples": [
          {
            "jp": "わたしは 木村さんに 本を 貸して あげました。",
            "reading": "Watashi wa Kimura-san ni hon o kashite agemashita.",
            "id": "Saya meminjamkan buku untuk menolong Nn. Kimura."
          },
          {
            "jp": "山田さんは わたしに 傘を 貸して くれました。",
            "reading": "Yamada-san wa watashi ni kasa o kashite kuremashita.",
            "id": "Tuan Yamada berbaik hati meminjamkan payung kepada saya."
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "くれます",
        "reading": "kuremasu",
        "id": "Diberikan"
      },
      {
        "jp": "なおします (直します)",
        "reading": "naoshimasu",
        "id": "Mengoreksi , memperbaiki",
        "kanji": "直します"
      },
      {
        "jp": "つれていきます (連れて行きます)",
        "reading": "tsureteikimasu",
        "id": "Mengajak pergi, membawa, mengantarkan",
        "kanji": "連れて行きます"
      },
      {
        "jp": "つれてきます (連れて来ます)",
        "reading": "tsuretekimasu",
        "id": "Membawa datang",
        "kanji": "連れて来ます"
      },
      {
        "jp": "おくります（を） (送ります)",
        "reading": "okurimasu",
        "id": "Mengantar (orang)",
        "kanji": "送ります"
      },
      {
        "jp": "しょうかいします (紹介します)",
        "reading": "shoukaishimasu",
        "id": "Memperkenalkan",
        "kanji": "紹介します"
      },
      {
        "jp": "あんないします (案内します)",
        "reading": "annaishimasu",
        "id": "Memandu , mengantarkan",
        "kanji": "案内します"
      },
      {
        "jp": "せつめいします (説明します)",
        "reading": "setsumeishimasu",
        "id": "Menjelaskan, menerangkan",
        "kanji": "説明します"
      },
      {
        "jp": "おじいさん／おじいちゃん",
        "reading": "ojiisan／ojiichan",
        "id": "Kakek"
      },
      {
        "jp": "おばあさん／おばあちゃん",
        "reading": "obaasan／obaachan",
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
        "jp": "おかし (お菓子)",
        "reading": "okashi",
        "id": "Kue, snack, makanan ringan",
        "kanji": "お菓子"
      },
      {
        "jp": "ホームステイ",
        "reading": "ho-musutei",
        "id": "Homestay"
      },
      {
        "jp": "ぜんぶ (全部)",
        "reading": "zenbu",
        "id": "Semua",
        "kanji": "全部"
      },
      {
        "jp": "じぶんで (自分で)",
        "reading": "jibunde",
        "id": "Dengan sendiri",
        "kanji": "自分で"
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
        "reading": "ochuugen／oseibo",
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
    ],
    "dialogue": {
      "title": "手伝いに行きましょうか (Mau Saya Bantu?)",
      "lines": [
        {
          "speaker": "Karina",
          "jp": "ワンさん、日曜日に引っ越しですね。手伝いに行きましょうか。",
          "reading": "Wan-san, nichiyoubi ni hikkoshi desu ne. Tetsudai ni ikimashou ka.",
          "id": "Sdr. Wang, hari Minggu pindahan rumah ya? Bagaimana kalau saya datang membantu?"
        },
        {
          "speaker": "Wang",
          "jp": "ありがとうございます。車を出してくれませんか。",
          "reading": "Arigatou gozaimasu. Kuruma o dashite kuremasen ka.",
          "id": "Terima kasih banyak. Maukah Anda membantu membawakan mobil?"
        },
        {
          "speaker": "Karina",
          "jp": "ええ、いいですよ。荷物をたくさん運んであげます。",
          "reading": "Ee, ii desu yo. Nimotsu o takusan hakonde agemasu.",
          "id": "Tentu, boleh sekali. Saya akan bantu angkut banyak barang."
        },
        {
          "speaker": "Wang",
          "jp": "本当に助かります。お昼ごはんをごちそうしますね。",
          "reading": "Hontou ni tasukarimasu. Ohiru-gohan o gochisou shimasu ne.",
          "id": "Benar-benar tertolong. Nanti saya traktir makan siang ya."
        }
      ]
    }
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
        "pattern": "[KK-Ta / Sifat / KB] ら、〜 (~ Tara - Kalau / Jika / Setelah)",
        "formula": "Bentuk Lampau Biasa + ra, Kalimat Pokok",
        "explanation": "Pola pengandaian kondisional umum ('jika/kalau') serta menyatakan 'setelah syarat selesai dilakukan maka langsung...'.",
        "examples": [
          {
            "jp": "雨が 降ったら、出かけません。",
            "reading": "Ame ga futtara, dekakemasen.",
            "id": "Kalau hujan turun, saya tidak akan pergi keluar."
          },
          {
            "jp": "10時に なったら、出かけましょう。",
            "reading": "Juuji ni nattara, dekakemashou.",
            "id": "Setelah jam 10 tiba, mari kita berangkat."
          }
        ]
      },
      {
        "id": "m25-2",
        "pattern": "[KK-Te / Sifat-Kute / Sifat-De / KB-De] も、〜 (~ Te mo - Walaupun / Meskipun)",
        "formula": "Bentuk-Te + mo, Kalimat Pokok",
        "explanation": "Pola pengandaian berlawanan/paradoks ('walaupun / meskipun begitu, hasil tak terduga tetap terjadi').",
        "examples": [
          {
            "jp": "雨が 降っても、洗濯します。",
            "reading": "Ame ga futte mo, sentaku shimasu.",
            "id": "Meskipun hujan turun, saya tetap mencuci baju."
          },
          {
            "jp": "安くても、わたしは グループ旅行が 嫌いです。",
            "reading": "Yasukute mo, watashi wa guruupu ryokou ga kirai desu.",
            "id": "Walaupun murah, saya tidak suka wisata rombongan."
          }
        ]
      },
      {
        "id": "m25-3",
        "pattern": "もし 〜たら / いくら 〜ても (Penegas Pengandaian)",
        "formula": "Moshi ... tara (seandainya); Ikura ... temo (betapapun)",
        "explanation": "'Moshi' ditaruh di awal kalimat untuk menegaskan syarat asumsi, sedangkan 'ikura' untuk menekankan tingkat pengorbanan yang tak mengubah hasil.",
        "examples": [
          {
            "jp": "もし 1億円 あったら、何を したいですか。",
            "reading": "Moshi ichioku-en attara, nani o shitai desu ka.",
            "id": "Seandainya punya uang 100 juta yen, apa yang ingin Anda lakukan?"
          }
        ]
      }
    ],
    "keyVocab": [
      {
        "jp": "かんがえます (考えます)",
        "reading": "kangaemasu",
        "id": "Berfikir, memikirkan",
        "kanji": "考えます"
      },
      {
        "jp": "つきます (着きます)",
        "reading": "tsukimasu",
        "id": "Tiba, sampai",
        "kanji": "着きます"
      },
      {
        "jp": "とります（としを～） (取ります)",
        "reading": "torimasu",
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
        "jp": "いなか (田舎)",
        "reading": "inaka",
        "id": "Desa, kampung halaman",
        "kanji": "田舎"
      },
      {
        "jp": "チャンス",
        "reading": "chansu",
        "id": "Kesempatan"
      },
      {
        "jp": "おく (億)",
        "reading": "oku",
        "id": "Ratus juta",
        "kanji": "億"
      },
      {
        "jp": "もし",
        "reading": "moshi",
        "id": "Kalau"
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
        "jp": "がんばります (頑張ります)",
        "reading": "ganbarimasu",
        "id": "Berusaha, bekerja keras",
        "kanji": "頑張ります"
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
      "title": "いろいろお世話になりました (Terima Kasih atas Semua Bantuannya)",
      "lines": [
        {
          "speaker": "Miller",
          "jp": "来週、東京本社へ転勤することになりました。",
          "reading": "Raishuu, Toukyou honsha e tenkin suru koto ni narimashita.",
          "id": "Mulai minggu depan, saya diputuskan pindah dinas ke kantor pusat Tokyo."
        },
        {
          "speaker": "Sato",
          "jp": "えっ、本当ですか。寂しくなりますね。",
          "reading": "E', hontou desu ka. Sabishiku narimasu ne.",
          "id": "Eh, benarkah? Kami akan merasa kesepian ya."
        },
        {
          "speaker": "Miller",
          "jp": "大阪では皆さんにお世話になって、本当に感謝しています。",
          "reading": "Oosaka de wa minasan ni osewa ni natte, hontou ni kansha shite imasu.",
          "id": "Selama di Osaka saya banyak dibantu oleh semuanya, sungguh berterima kasih."
        },
        {
          "speaker": "Sato",
          "jp": "東京へ行っても、お体に気をつけて頑張ってください。",
          "reading": "Toukyou e itte mo, okarada ni ki o tsukete ganbatte kudasai.",
          "id": "Walaupun sudah pindah ke Tokyo, tolong jaga kesehatan dan tetap semangat ya."
        },
        {
          "speaker": "Miller",
          "jp": "はい。大阪に来たら、ぜひ連絡してくださいね。",
          "reading": "Hai. Oosaka ni kitara, zehi renraku shite kudasai ne.",
          "id": "Baik. Kalau datang ke Osaka, pastikan menghubungi saya ya."
        }
      ]
    }
  }
];
