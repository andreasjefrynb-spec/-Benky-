import { MinnaLesson } from '../types';

export const minnaChuukyu1Lessons: MinnaLesson[] = [
  {
    chapter: 1,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 1: Menghubungi Orang & Minta Bantuan (~んですけれど)',
    theme: 'Permintaan Sopan, Penjelasan Situasi, dan Menjalin Relasi',
    summary: 'Mempelajari pola penjelasan nuansa dengan 〜んですけれど, memohon bantuan secara halus 〜ていただけないでしょうか, serta cara memperkenalkan diri di lingkungan baru.',
    grammarPatterns: [
      {
        id: 'mc1-1',
        pattern: '〜んですけれど / 〜んですが (~ n desu keredo / ~ n desu ga)',
        formula: 'Bentuk Biasa (Futsuukei) + んですけれど / んですが (KB/Kata Sifat-na + な + んです)',
        explanation: 'Digunakan sebagai pengantar yang sopan untuk menjelaskan situasi atau latar belakang sebelum mengajukan permohonan, pertanyaan, atau penolakan halus.',
        examples: [
          {
            jp: '日本語の履歴書の書き方を教えていただきたいんですが。',
            reading: 'Nihongo no rirekisho no kakikata o oshiete itadakitai n desu ga.',
            id: 'Saya ingin meminta bantuan untuk diajarkan cara menulis resume bahasa Jepang...'
          },
          {
            jp: 'ちょっと市役所へ行きたいんですけれど、どのバスに乗ればいいですか。',
            reading: 'Chotto shiyakusho e ikitai n desu keredo, dono basu ni noreba ii desu ka.',
            id: 'Saya ingin pergi ke balai kota, sebaiknya naik bus yang mana ya?'
          }
        ]
      },
      {
        id: 'mc1-2',
        pattern: '〜ていただけないでしょうか (~te itadakenai deshou ka)',
        formula: 'Kata Kerja bentuk [Te] + いただけないでしょうか',
        explanation: 'Bentuk permohonan yang sangat sopan dan beretika tinggi kepada orang yang lebih senior, atasan, atau orang yang baru dikenal.',
        examples: [
          {
            jp: 'この書類の内容を一度確認していただけないでしょうか。',
            reading: 'Kono shorui no naiyou o ichido kakunin shite itadakenai deshou ka.',
            id: 'Bisakah Anda berkenan memeriksa isi dokumen ini sekali?'
          },
          {
            jp: '推薦状を書いていただけないでしょうか。',
            reading: 'Suisenjou o kaite itadakenai deshou ka.',
            id: 'Sudikah Bapak/Ibu menuliskan surat rekomendasi untuk saya?'
          }
        ]
      },
      {
        id: 'mc1-3',
        pattern: '〜ていただけると助かります (~te itadakeru to tasakarimasu)',
        formula: 'Kata Kerja [Te] + いただけると助かります',
        explanation: 'Ungkapan praktis dan santun untuk mengutarakan bahwa bantuan lawan bicara akan sangat meringankan beban/menolong.',
        examples: [
          {
            jp: '明日の午前中までに資料を送っていただけると助かります。',
            reading: 'Ashita no gozenchuu made ni shiryou o okutte itadakeru to tasakarimasu.',
            id: 'Akan sangat membantu jika Anda berkenan mengirimkan materinya sebelum besok siang.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '申し込む', reading: 'moushikomu', id: 'mendaftar / mengajukan permohonan', type: 'Kata Kerja I' },
      { jp: '履歴書', reading: 'rirekisho', id: 'daftar riwayat hidup / CV', type: 'Kata Benda' },
      { jp: '面接', reading: 'mensetsu', id: 'wawancara kerja', type: 'Kata Benda' },
      { jp: '推薦状', reading: 'suisenjou', id: 'surat rekomendasi', type: 'Kata Benda' },
      { jp: '手続き', reading: 'tetsuzuki', id: 'prosedur formal / birokrasi', type: 'Kata Benda' },
      { jp: '問い合わせる', reading: 'toiawaseru', id: 'menanyakan informasi resmi', type: 'Kata Kerja II' },
      { jp: '担当者', reading: 'tantousha', id: 'orang yang bertanggung jawab / PIC', type: 'Kata Benda' },
      { jp: '助かる', reading: 'tasukaru', id: 'sangat tertolong / terbantu', type: 'Kata Kerja I' }
    ],
    dialogue: {
      title: 'Konsultasi Penulisan CV ke Dosen Pembimbing',
      lines: [
        { speaker: 'Siswa', jp: '先生、今お時間よろしいでしょうか。就職の履歴書を見ていただきたいんですが。', reading: 'Sensei, ima ojikan yoroshii deshou ka. Shuushoku no rirekisho o mite itadakitai n desu ga.', id: 'Sensei, apakah ada waktu luang sekarang? Saya ingin meminta bantuan untuk memeriksa CV kerja saya...' },
        { speaker: 'Dosen', jp: 'ええ、いいですよ。志望動機の欄はもう書けましたか。', reading: 'Ee, ii desu yo. Shiboudouki no ran wa mou kakemashita ka.', id: 'Tentu, boleh. Kolom motivasi melamarnya sudah kamu tulis?' },
        { speaker: 'Siswa', jp: 'はい、一通り書きましたので、表現が不自然でないかご確認いただけないでしょうか。', reading: 'Hai, hitotoori kakimashita node, hyougen ga fushizen de nai ka gokakunin itadakenai deshou ka.', id: 'Ya, sudah saya tulis semua, bisakah Sensei memeriksa apakah ada ungkapan yang kurang alami?' }
      ]
    },
    readingPassage: {
      titleJp: '日本での依頼と断りのコミュニケーション',
      titleId: 'Etika Meminta Bantuan dan Menolak Halus di Jepang',
      textJp: '日本では、相手に何かを頼む際、いきなり本題に入るのではなく、「〜んですが」のように前置きを置くことで相手への心理的負担を和らげる配慮が重んじられます。',
      textId: 'Di Jepang, saat meminta tolong kepada lawan bicara, seseorang tidak langsung ke pokok masalah, melainkan mendahuluinya dengan kata pengantar seperti "~ n desu ga" demi mengurangi beban psikologis lawan bicara.'
    }
  },
  {
    chapter: 2,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 2: Memberi Petunjuk & Langkah Kerja (~ようにする / ~ことになる)',
    theme: 'Kebiasaan, Usaha Bertahap, dan Keputusan Kolektif',
    summary: 'Mempelajari cara menyatakan usaha membentuk kebiasaan rutin dengan 〜ようにする dan menyatakan peraturan/keputusan pihak lain dengan 〜ことになる.',
    grammarPatterns: [
      {
        id: 'mc2-1',
        pattern: '〜ようにする / 〜ようにしている (~ you ni suru / ~ you ni shite iru)',
        formula: 'Kata Kerja Bentuk Kamus / Bentuk Nai + ようにする',
        explanation: 'Menyatakan tekad untuk berusaha melakukan atau menghindari suatu tindakan agar menjadi kebiasaan.',
        examples: [
          {
            jp: '健康のために、毎朝野菜ジュースを飲むようにしています。',
            reading: 'Kenkou no tame ni, maiasa yasai juusu o nomu you ni shite imasu.',
            id: 'Demi kesehatan, saya membiasakan diri minum jus sayur setiap pagi.'
          },
          {
            jp: '夜遅くには甘いものを食べないようにしています。',
            reading: 'Yoru osoku ni wa amai mono o tabenai you ni shite imasu.',
            id: 'Saya berusaha untuk tidak makan makanan manis larut malam.'
          }
        ]
      },
      {
        id: 'mc2-2',
        pattern: '〜ことになる / 〜ことになっている (~ koto ni naru / ~ koto ni natte iru)',
        formula: 'Kata Kerja Bentuk Kamus / Bentuk Nai + ことになる',
        explanation: 'Menyatakan keputusan yang dibuat oleh pihak luar/organisasi, atau aturan yang sudah ditetapkan tanpa kendali pribadi.',
        examples: [
          {
            jp: '来月から大阪支社へ転勤することになりました。',
            reading: 'Raigetsu kara Oosaka shisha e tenkin suru koto ni narimashita.',
            id: 'Sudah diputuskan bahwa mulai bulan depan saya dimutasi ke kantor cabang Osaka.'
          },
          {
            jp: 'この寮では、夜11時以降は静かにすることになっています。',
            reading: 'Kono ryou de wa, yoru juuichiji ikou wa shizuka ni suru koto ni natte imasu.',
            id: 'Di asrama ini, sudah menjadi aturan untuk tenang setelah jam 11 malam.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '転勤', reading: 'tenkin', id: 'mutasi tugas kerja', type: 'Kata Benda' },
      { jp: '習慣', reading: 'shuukan', id: 'kebiasaan / adat', type: 'Kata Benda' },
      { jp: '努力', reading: 'doryoku', id: 'usaha keras / jerih payah', type: 'Kata Benda' },
      { jp: '決まり', reading: 'kimari', id: 'aturan / ketetapan', type: 'Kata Benda' },
      { jp: '心がける', reading: 'kokorogakeru', id: 'selalu mengingat dan mengusahakan', type: 'Kata Kerja II' },
      { jp: '規則', reading: 'kisoku', id: 'regulasi / peraturan tertulis', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 3,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 3: Menyampaikan Kabar Angin & Alasan Logis (~そうだ / ~らしい / ~はずだ)',
    theme: 'Informasi Tidak Langsung, Dugaan Berdasarkan Bukti, dan Keyakinan Logis',
    summary: 'Membedakan cara mengutip kabar dari sumber lain (Densbun 〜そうだ), dugaan berdasarkan desas-desus/ciri khas (〜らしい), dan kepastian logis (〜はずだ).',
    grammarPatterns: [
      {
        id: 'mc3-1',
        pattern: '〜らしい (~ rashii)',
        formula: 'Bentuk Biasa + らしい (KB/KS-na tanpa だ)',
        explanation: 'Menyatakan dugaan kuat yang didasarkan pada kabar angin, informasi yang didengar, atau ciri khas yang tampak nyata.',
        examples: [
          {
            jp: '天気予報によると、明日は大雨になるらしいです。',
            reading: 'Tenki yohou ni yoru to, ashita wa ooame ni naru rashii desu.',
            id: 'Menurut ramalan cuaca, kabarnya besok akan turun hujan lebat.'
          },
          {
            jp: 'あの二人は来年結婚するらしいですよ。',
            reading: 'Ano futari wa rainen kekkon suru rashii desu yo.',
            id: 'Kudengar kabar bahwa mereka berdua akan menikah tahun depan lho.'
          }
        ]
      },
      {
        id: 'mc3-2',
        pattern: '〜はずだ (~ hazu da)',
        formula: 'Bentuk Biasa + はずだ (KS-na + な / KB + の)',
        explanation: 'Menyatakan kepastian atau ekspektasi yang sangat beralasan menurut logika pembicara ("seharusnya / mestinya").',
        examples: [
          {
            jp: '田中さんは昨日薬を飲んで寝たから、今日は熱が下がったはずです。',
            reading: 'Tanaka-san wa kinou kusuri o nonde neta kara, kyou wa netsu ga sagatta hazu desu.',
            id: 'Karena Pak Tanaka kemarin sudah minum obat dan tidur, seharusnya hari ini demamnya sudah turun.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: 'うわさ', reading: 'uwasa', id: 'rumor / desas-desus', type: 'Kata Benda' },
      { jp: '確信', reading: 'kakushin', id: 'keyakinan yang mantap', type: 'Kata Benda' },
      { jp: '報道', reading: 'houdou', id: 'pemberitaan media', type: 'Kata Benda' },
      { jp: '根拠', reading: 'konkyo', id: 'dasar bukti / landasan fakta', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 4,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 4: Ungkapan Penyesalan & Pengandaian Lampau (~ばよかった / ~のに)',
    theme: 'Evaluasi Diri, Penyesalan, dan Harapan Kontrafaktual',
    summary: 'Mempelajari cara mengungkapkan penyesalan atas hal yang tidak dilakukan di masa lalu dengan 〜ばよかった dan ketidakpuasan dengan 〜のに.',
    grammarPatterns: [
      {
        id: 'mc4-1',
        pattern: '〜ばよかった (~ba yokatta)',
        formula: 'Kata Kerja bentuk Pengandaian [Ba] + よかった',
        explanation: 'Menyatakan rasa penyesalan atas keputusan masa lalu ("Seandainya saja saya melakukan...").',
        examples: [
          {
            jp: 'もっと早く家を出ればよかった。電車に乗り遅れてしまった。',
            reading: 'Motto hayaku ie o dereba yokatta. Densha ni noriokurete shimatta.',
            id: 'Seandainya saja saya keluar rumah lebih awal. Saya malah ketinggalan kereta.'
          },
          {
            jp: '傘を持ってくればよかった。急に雨が降ってきた。',
            reading: 'Kasa o motte kureba yokatta. Kyuu ni ame ga futte kita.',
            id: 'Seandainya saya membawa payung. Tiba-tiba hujan turun.'
          }
        ]
      },
      {
        id: 'mc4-2',
        pattern: '〜のに (~ noni) [Di Akhir Kalimat Penyesalan]',
        formula: 'Bentuk Biasa + のに (KS-na/KB + なのに)',
        explanation: 'Mengungkapkan keluh kesah, kekecewaan, atau rasa heran karena kenyataan tidak sesuai harapan pembicara.',
        examples: [
          {
            jp: '一生懸命勉強したのに、試験に合格できなかった。',
            reading: 'Isshoukenmei benkyou shita noni, shiken ni goukaku dekinakatta.',
            id: 'Padahal sudah belajar mati-matian, tetapi tidak lulus ujian.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '後悔', reading: 'koukai', id: 'penyesalan', type: 'Kata Benda' },
      { jp: '反省', reading: 'hansei', id: 'introspeksi diri', type: 'Kata Benda' },
      { jp: '間に合う', reading: 'maniau', id: 'tepat waktu', type: 'Kata Kerja I' },
      { jp: '遅刻', reading: 'chikoku', id: 'keterlambatan', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 5,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 5: Resep, Metode & Urutan Prosedur (~たて / ~とおりに / ~まま)',
    theme: 'Tata Cara Memasak, Manual Pekerjaan, dan Kondisi Berkelanjutan',
    summary: 'Mempelajari cara menjelaskan tindakan persis sesuai petunjuk (〜とおりに), kondisi segar baru saja selesai (〜たて), dan kondisi yang dibiarkan tanpa berubah (〜まま).',
    grammarPatterns: [
      {
        id: 'mc5-1',
        pattern: '〜とおりに (~ toori ni)',
        formula: 'Kata Kerja Bentuk Kamus/Ta + とおりに / KB + のとおりに (atau どおりに)',
        explanation: 'Melakukan sesuatu tepat persis mengikuti petunjuk, instruksi, atau contoh yang diberikan.',
        examples: [
          {
            jp: '説明書に書いてあるとおりに組み立ててください。',
            reading: 'Setsumeisho ni kaite aru toori ni kumitatete kudasai.',
            id: 'Tolong rakit persis seperti yang tertulis pada buku petunjuk.'
          }
        ]
      },
      {
        id: 'mc5-2',
        pattern: '〜たて (~tate)',
        formula: 'Kata Kerja Bentuk Masu (tanpa masu) + たて',
        explanation: 'Menyatakan keadaan yang baru saja selesai dibuat/dimasak sehingga masih sangat segar atau hangat.',
        examples: [
          {
            jp: '焼き立てのパンは香ばしくてとてもおいしい。',
            reading: 'Yakitate no pan wa koubashikute totemo oishii.',
            id: 'Roti yang baru saja dipanggang aromanya harum dan sangat lezat.'
          }
        ]
      },
      {
        id: 'mc5-3',
        pattern: '〜まま (~ mama)',
        formula: 'Kata Kerja [Ta]/[Nai] + まま / KB + のまま / KS-na + なまま',
        explanation: 'Melakukan tindakan lain dalam kondisi sebelumnya yang dibiarkan tetap tidak berubah.',
        examples: [
          {
            jp: '靴を履いたまま部屋に入ってはいけません。',
            reading: 'Kutsu o haita mama heya ni haitte wa ikemasen.',
            id: 'Dilarang masuk ke dalam kamar dalam keadaan tetap memakai sepatu.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '組み立てる', reading: 'kumitateru', id: 'merakit / menyusun komponen', type: 'Kata Kerja II' },
      { jp: '説明書', reading: 'setsumeisho', id: 'buku manual petunjuk', type: 'Kata Benda' },
      { jp: '香ばしい', reading: 'koubashii', id: 'harum gurih khas panggangan', type: 'Kata Sifat-i' },
      { jp: '手順', reading: 'tejun', id: 'urutan langkah kerja / proses', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 6,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 6: Hubungan Sebab-Akibat Formal (~ために / ~によって / ~おかげで)',
    theme: 'Laporan Sebab Akibat, Kontribusi Positif, dan Faktor Pemicu',
    summary: 'Mempelajari ragam ekspresi kausalitas: alasan obyektif (〜ために), berkah/bantuan pihak lain (〜おかげで), dan sarana/penyebab (〜によって).',
    grammarPatterns: [
      {
        id: 'mc6-1',
        pattern: '〜によって (~ ni yotte)',
        formula: 'Kata Benda + によって',
        explanation: 'Menunjukkan sarana metode, penyebab terjadinya suatu fenomena, atau pencipta suatu karya.',
        examples: [
          {
            jp: 'インターネットの普及によって、情報収集が格段に便利になった。',
            reading: 'Intaanetto no fukyuu ni yotte, jouhou shuushuu ga kakudan ni benri ni natta.',
            id: 'Dengan meratanya internet, pengumpulan informasi menjadi jauh lebih praktis.'
          },
          {
            jp: '台風によって多くの木が倒れた。',
            reading: 'Taifuu ni yotte tooku no ki ga taoreta.',
            id: 'Disebabkan oleh angin topan, banyak pohon yang tumbang.'
          }
        ]
      },
      {
        id: 'mc6-2',
        pattern: '〜おかげで (~ okage de) & 〜せいで (~ sei de)',
        formula: 'Bentuk Biasa + おかげで (Hasil Baik) / せいで (Hasil Buruk)',
        explanation: 'おかげで menyatakan rasa syukur atas faktor pendukung yang membawa keberhasilan; せいで menyalahkan faktor pemicu kegagalan.',
        examples: [
          {
            jp: '先生のご指導のおかげで、無事に合格できました。',
            reading: 'Sensei no goshidou no okage de, buji ni goukaku dekimashita.',
            id: 'Berkat bimbingan Sensei, saya dapat lulus dengan selamat.'
          },
          {
            jp: '大雨のせいで、サッカーの試合が中止になった。',
            reading: 'Ooame no sei de, sakkaa no shiai ga chuushi ni natta.',
            id: 'Gara-gara hujan lebat, pertandingan sepak bola jadi dibatalkan.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '普及', reading: 'fukyuu', id: 'penyebaran meluas / difusi', type: 'Kata Benda' },
      { jp: '指導', reading: 'shidou', id: 'bimbingan / pengarahan', type: 'Kata Benda' },
      { jp: '格段に', reading: 'kakudan ni', id: 'secara signifikan / luar biasa', type: 'Kata Keterangan' },
      { jp: '中止', reading: 'chuushi', id: 'pembatalan / penghentian', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 7,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 7: Perubahan Berangsur & Rentang Waktu (~ていく / ~てくる / ~うちに)',
    theme: 'Perubahan Alamiah, Kondisi Menjelang Masa Depan, dan Dinamika Waktu',
    summary: 'Mempelajari cara menggambarkan perubahan keadaan dari masa lampau hingga kini (〜てきた), menuju masa depan (〜ていく), dan memanfaatkan jendela kesempatan (〜うちに).',
    grammarPatterns: [
      {
        id: 'mc7-1',
        pattern: '〜ていく / 〜てくる (~te iku / ~te kuru)',
        formula: 'Kata Kerja bentuk [Te] + いく / くる',
        explanation: '〜てくる menunjukkan proses perubahan yang mendekat ke saat ini; 〜ていく menunjukkan proses perubahan yang berlanjut menjauh ke masa depan.',
        examples: [
          {
            jp: '日本に住む外国人の数は年々増えてきている。',
            reading: 'Nihon ni sumu gaikokujin no kazu wa nennen fuete kite iru.',
            id: 'Jumlah orang asing yang tinggal di Jepang terus bertambah dari tahun ke tahun hingga kini.'
          },
          {
            jp: 'これからも高齢化が進んでいくだろう。',
            reading: 'Kore kara mo koureika ga susunde iku darou.',
            id: 'Ke depannya pun penuaan populasi tampaknya akan terus berlanjut.'
          }
        ]
      },
      {
        id: 'mc7-2',
        pattern: '〜うちに (~ uchi ni)',
        formula: 'KK Bentuk Kamus/Nai/Te iru + うちに / KS-i + うちに / KS-na + なうちに / KB + のうちに',
        explanation: 'Melakukan sesuatu selagi kondisi tertentu masih berlangsung sebelum situasi berubah.',
        examples: [
          {
            jp: '若いうちに、色々な国を旅行しておきたい。',
            reading: 'Wakai uchi ni, iroiro na kuni o ryokou shite okitai.',
            id: 'Selagi masih muda, saya ingin pergi bepergian ke berbagai negara.'
          },
          {
            jp: '冷めないうちに召し上がってください。',
            reading: 'Samenai uchi ni meshiagatte kudasai.',
            id: 'Silakan santap selagi hidangannya belum mendingin.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '高齢化', reading: 'koureika', id: 'penuaan struktur populasi', type: 'Kata Benda' },
      { jp: '年々', reading: 'nennen', id: 'dari tahun ke tahun', type: 'Kata Keterangan' },
      { jp: '冷める', reading: 'sameru', id: 'menjadi dingin (suhu makanan)', type: 'Kata Kerja II' },
      { jp: '機会', reading: 'kikai', id: 'kesempatan / peluang', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 8,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 8: Opini & Saran Halus (~たほうがいい / ~べきだ / ~のではないか)',
    theme: 'Penyampaian Pandangan Kritis, Kewajiban Moral, dan Saran Beretika',
    summary: 'Mempelajari cara mengemukakan pendapat pribadi secara elegan menggunakan 〜のではないか dan kewajiban moral dengan 〜べきだ.',
    grammarPatterns: [
      {
        id: 'mc8-1',
        pattern: '〜のではないだろうか / 〜のではないか (~ no dewa nai darou ka)',
        formula: 'Bentuk Biasa + のではないか (KB/KS-na + なのではないか)',
        explanation: 'Gaya menyampaikan pendapat atau kritik secara tidak memaksakan, mengundang pertimbangan lawan bicara ("Tidakkah menurut Anda demikian...").',
        examples: [
          {
            jp: 'この問題は、もっと慎重に議論すべきなのではないでしょうか。',
            reading: 'Kono mondai wa, motto shinchou ni giron subeki na no dewa nai deshou ka.',
            id: 'Tidakkah masalah ini semestinya kita diskusikan dengan lebih hati-hati?'
          }
        ]
      },
      {
        id: 'mc8-2',
        pattern: '〜べきだ / 〜べきではない (~ beki da / ~ beki dewa nai)',
        formula: 'Kata Kerja Bentuk Kamus + べきだ (Suru -> すべきだ / するべきだ)',
        explanation: 'Menyatakan kewajiban etika, norma sosial, atau hal yang sudah semestinya dilakukan menurut akal sehat.',
        examples: [
          {
            jp: '約束の時間は厳守すべきです。',
            reading: 'Yakusoku no jikan wa genshu subeki desu.',
            id: 'Waktu janji sudah semestinya dipatuhi dengan ketat.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '慎重に', reading: 'shinchou ni', id: 'dengan penuh kehati-hatian', type: 'Kata Keterangan' },
      { jp: '議論', reading: 'giron', id: 'diskusi mendalam / perdebatan', type: 'Kata Benda' },
      { jp: '厳守', reading: 'genshu', id: 'kepatuhan ketat', type: 'Kata Benda' },
      { jp: '常識', reading: 'joushiki', id: 'akal sehat / norma umum', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 9,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 9: Pasif & Kausatif dalam Relasi Sosial (~させられる / ~受身使役)',
    theme: 'Perasaan Tertekan, Tindakan Terpaksa, dan Ungkapan Empati',
    summary: 'Mempelajari bentuk Pasif-Kausatif (Shieki Ukemi 〜させられる) untuk mengungkapkan bahwa seseorang terpaksa melakukan sesuatu atas kehendak pihak lain.',
    grammarPatterns: [
      {
        id: 'mc9-1',
        pattern: '〜させられる (Kausatif-Pasif 使役受身)',
        formula: 'Kata Kerja Golongan I: -aserareru / -asareru, Golongan II: -saserareru, Golongan III: こさせられる / させられる',
        explanation: 'Menyatakan bahwa subjek terpaksa melakukan suatu tindakan yang sebenarnya tidak disukai atau melelahkan karena disuruh orang lain.',
        examples: [
          {
            jp: '子どもの頃、母に毎日ピアノを練習させられました。',
            reading: 'Kodomo no koro, haha ni mainichi piano o renshuu saseraremashita.',
            id: 'Sewaktu kecil, saya terpaksa disuruh berlatih piano setiap hari oleh ibu.'
          },
          {
            jp: '上司に無理な残業をさせられて、とても疲れました。',
            reading: 'Joushi ni muri na zangyou o saserarete, totemo tsukaremashita.',
            id: 'Karena disuruh lembur berlebihan oleh atasan, saya menjadi sangat lelah.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '残業', reading: 'zangyou', id: 'kerja lembur', type: 'Kata Benda' },
      { jp: '上司', reading: 'joushi', id: 'atasan kerja', type: 'Kata Benda' },
      { jp: '無理な', reading: 'muri na', id: 'tidak masuk akal / memaksakan', type: 'Kata Sifat-na' },
      { jp: '我慢', reading: 'gaman', id: 'kesabaran / menahan diri', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 10,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 10: Kondisi yang Tampak & Metafora (~ようだ / ~みたいだ / ~かのようだ)',
    theme: 'Penggambaran Sensorik, Perumpamaan, dan Analogi Indah',
    summary: 'Mempelajari cara membuat perumpamaan figuratif dengan 〜ようだ dan 〜みたいだ, serta perumpamaan seolah-olah nyata dengan 〜かのようだ.',
    grammarPatterns: [
      {
        id: 'mc10-1',
        pattern: '〜まるで〜ようだ / 〜みたいだ (~ marude ~ you da)',
        formula: 'まるで + (KB + の / Bentuk Biasa) + ようだ / みたいだ',
        explanation: 'Memberikan perumpamaan figuratif ("seperti / laksana") untuk memperjelas suasana atau kesan sensorik.',
        examples: [
          {
            jp: '富士山からの景色は、まるで雲の上にいるようだった。',
            reading: 'Fujisan kara no keshiki wa, marude kumo no ue ni iru you datta.',
            id: 'Pemandangan dari Gunung Fuji laksana sedang berada di atas hamparan awan.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '景色', reading: 'keshiki', id: 'pemandangan alam', type: 'Kata Benda' },
      { jp: 'まるで', reading: 'marude', id: 'benar-benar laksana', type: 'Kata Keterangan' },
      { jp: '印象', reading: 'inshou', id: 'kesan pertama', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 11,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 11: Batasan & Kondisi Khusus (~限り / ~さえ〜ば)',
    theme: 'Syarat Mutlak, Komitmen Waktu, dan Kondisi Minimum',
    summary: 'Mempelajari syarat satu-satunya yang menjamin hasil (〜さえ〜ば) dan batas durasi selama kondisi bertahan (〜限り).',
    grammarPatterns: [
      {
        id: 'mc11-1',
        pattern: '〜さえ〜ば (~ sae ~ ba)',
        formula: 'Kata Benda + さえ + KK [Ba] / KS-i [kereba]',
        explanation: 'Menyatakan bahwa asalkan satu syarat minimum ini terpenuhi, maka hal lainnya pasti akan berjalan lancar.',
        examples: [
          {
            jp: '健康でさえあれば、どんな困難も乗り越えられる。',
            reading: 'Kenkou de sae areba, donna konnan mo norikoerareru.',
            id: 'Asalkan kita sehat, kesulitan apa pun pasti bisa kita lampaui.'
          }
        ]
      },
      {
        id: 'mc11-2',
        pattern: '〜かぎり (~ kagiri)',
        formula: 'Kata Kerja Kamus/Nai/Te iru + 限り',
        explanation: 'Selama kondisi tersebut terus berlanjut tanpa berubah.',
        examples: [
          {
            jp: '日本にいる限り、日本語を積極的に使うようにしたい。',
            reading: 'Nihon ni iru kagiri, nihongo o sekkyokuteki ni tsukau you ni shitai.',
            id: 'Selama saya berada di Jepang, saya ingin aktif mengasah dan menggunakan bahasa Jepang.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '困難', reading: 'konnan', id: 'kesulitan / rintangan berat', type: 'Kata Benda' },
      { jp: '乗り越える', reading: 'norikoeru', id: 'melampaui / mengatasi rintangan', type: 'Kata Kerja II' },
      { jp: '積極的に', reading: 'sekkyokuteki ni', id: 'secara proaktif / bersemangat', type: 'Kata Keterangan' }
    ]
  },
  {
    chapter: 12,
    level: 'N3',
    part: 'Chuukyuu I (N3)',
    title: 'Bab 12: Evaluasi Akhir Tingkat Menengah (~わけだ / ~わけではない)',
    theme: 'Alasan Wajar yang Masuk Akal dan Penyangkalan Sebagian',
    summary: 'Memahami kesimpulan logis yang wajar (〜わけだ) dan penegasan bahwa tidak semua hal sama rata (〜わけではない).',
    grammarPatterns: [
      {
        id: 'mc12-1',
        pattern: '〜わけだ (~ wake da)',
        formula: 'Bentuk Biasa + わけだ (KS-na + な / KB + な)',
        explanation: 'Menyimpulkan bahwa wajar saja suatu hasil terjadi karena sudah mengetahui alasannya ("Pantas saja... / Tentu saja...").',
        examples: [
          {
            jp: '彼は日本に10年も住んでいるのか。どうりで日本語が流暢なわけだ。',
            reading: 'Kare wa Nihon ni juunen mo sunde iru no ka. Douride nihongo ga ryuuchou na wake da.',
            id: 'Dia sudah tinggal di Jepang selama 10 tahun toh. Pantas saja bahasa Jepangnya begitu fasih.'
          }
        ]
      },
      {
        id: 'mc12-2',
        pattern: '〜わけではない (~ wake dewa nai)',
        formula: 'Bentuk Biasa + わけではない',
        explanation: 'Menyangkal secara parsial ("Bukan berarti bahwa...").',
        examples: [
          {
            jp: '日本料理が嫌いなわけではありませんが、辛いもののほうが好きです。',
            reading: 'Nihon ryouri ga kirai na wake dewa arimasen ga, karai mono no hou ga suki desu.',
            id: 'Bukan berarti saya tidak suka masakan Jepang, hanya saja saya lebih menyukai makanan pedas.'
          }
        ]
      }
    ],
    keyVocab: [
      { jp: '流暢な', reading: 'ryuuchou na', id: 'fasih / lancar bertutur', type: 'Kata Sifat-na' },
      { jp: 'どうりで', reading: 'douride', id: 'pantas saja / patutlah', type: 'Kata Keterangan' },
      { jp: '納得', reading: 'nattoku', id: 'pemahaman / bisa menerima alasan', type: 'Kata Benda' }
    ]
  }
];
