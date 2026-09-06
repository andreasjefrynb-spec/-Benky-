import { MinnaLesson } from '../types';

export const minnaShokyu2Lessons: MinnaLesson[] = [
  {
    chapter: 26,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 26: Penjelasan & Alasan Menekan (〜んです・〜んですが)',
    theme: 'Membuka Pembicaraan, Penjelasan Alasan Mendalam (~n desu), Permohonan Saran (~n desu ga)',
    summary: 'Awal Shokyu II (Level N4). Pola ~n desu (bentuk biasa + n desu) untuk menegaskan penjelasan, bertanya mencari alasan mendalam, dan formula permohonan bantuan pembuka kalimat (~n desu ga).',
    grammarPatterns: [
      {
        id: 'm26-1',
        pattern: 'Bentuk Biasa + んです (~ n desu)',
        formula: 'Kalimat [Futsuukei: KK/I-Kei/Na-Kei+na/KB+na] + n desu',
        explanation: 'Dipakai saat menjelaskan latar belakang keadaan, mencari konfirmasi alasan, atau mengekspresikan rasa penasaran.',
        examples: [
          { jp: 'どうして 遅れたんですか。バスが 来なかったんです。', reading: 'Doushite okureta n desu ka. Basu ga konakatta n desu.', id: 'Kenapa Anda terlambat? Karena busnya tadi tidak datang.' },
          { jp: '日本語が 上手ですね。たくさん 練習したんです。', reading: 'Nihongo ga jouzu desu ne. Takusan renshuu shita n desu.', id: 'Bahasa Jepangmu bagus sekali ya. Karena saya sudah banyak berlatih.' }
        ]
      },
      {
        id: 'm26-2',
        pattern: '〜んですが、[Permohonan / Pertanyaan] (Pembuka Kalimat)',
        formula: 'Kalimat [~n desu ga], permohonan / tolong ajari',
        explanation: 'Melembutkan awal pembicaraan sebelum meminta bantuan atau menanyakan arah.',
        examples: [
          { jp: '生け花を 習いたいんですが、いい 先生を 紹介して くださいませんか。', reading: 'Ikebana o naraitai n desu ga, ii sensei o shoukai shite kudasaimasen ka.', id: 'Saya ingin belajar merangkai bunga ikebana, maukah memperkenalkan guru yang bagus kepada saya?' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'みます (見ます / 診ます)', reading: 'mimasu', id: 'Memeriksa [medis/kesehatan]' },
      { jp: 'さがします (探します)', reading: 'sagashimasu', id: 'Mencari' },
      { jp: 'おくれます [時間に〜]', reading: 'okuremasu', id: 'Terlambat [dari waktu]' },
      { jp: 'まにあいます [時間に〜]', reading: 'maniaimasu', id: 'Tepat waktu / sempat' },
      { jp: 'やります', reading: 'yarimasu', id: 'Melakukan / berbuat' },
      { jp: 'ひろいます (拾います)', reading: 'hiroimasu', id: 'Memungut / menemukan barang jatuh' },
      { jp: 'れんらくします (連絡します)', reading: 'renraku shimasu', id: 'Menghubungi / mengabari' },
      { jp: 'きぶん (気分)', reading: 'kibun', id: 'Perasaan / kondisi tubuh' },
      { jp: 'ゴミ', reading: 'gomi', id: 'Sampah' },
      { jp: 'ばしょ (場所)', reading: 'basho', id: 'Tempat / lokasi' },
      { jp: 'ボランティア', reading: 'borantia', id: 'Relawan / volunteer' },
      { jp: 'べん (弁)', reading: 'ben', id: 'Dialek daerah (Osaka-ben, dll.)' }
    ]
  },
  {
    chapter: 27,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 27: Bentuk Potensial (可能形 Kanoukei: 〜ができる・〜られる)',
    theme: 'Perubahan Bentuk Sanggup/Dapat Melakukan Sesuatu & Perbedaan Mieru vs Mirareru',
    summary: 'Konjugasi kata kerja bentuk potensial (G1: baris u ke e + ru; G2: ~rareru; G3: korareru / dekiru). Partikel objek berubah dari を menjadi が.',
    grammarPatterns: [
      {
        id: 'm27-1',
        pattern: 'Objek が Kata Kerja Bentuk Potensial (Bisa/Mampu)',
        formula: 'KB [ga] KK [kanou-kei]',
        explanation: 'Menyatakan kemampuan personal atau kemungkinan situasional.',
        examples: [
          { jp: 'わたしは 漢字が 読めます。', reading: 'Watashi wa kanji ga yomemasu.', id: 'Saya bisa membaca kanji.' },
          { jp: '一人で 病院へ 行けますか。', reading: 'Hitori de byouin e ikemasu ka.', id: 'Apakah Anda bisa pergi ke rumah sakit sendirian?' }
        ]
      },
      {
        id: 'm27-2',
        pattern: '見えます (Mieru) vs 見られます (Mirareru) & 聞こえます (Kikoeru)',
        formula: 'Mieru / Kikoeru = spontan tertangkap indera | Mirareru = memiliki kesempatan menonton',
        explanation: 'Mieru dan Kikoeru terjadi alami tanpa usaha sengaja.',
        examples: [
          { jp: 'ここから 富士山が 見えます。', reading: 'Koko kara Fujisan ga miemasu.', id: 'Dari sini Gunung Fuji terlihat (spontan tampak di mata).' },
          { jp: '隣の 部屋から 声が 聞こえます。', reading: 'Tonari no heya kara koe ga kikoemasu.', id: 'Terdengar suara dari kamar sebelah.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'かいます (飼います)', reading: 'kaimasu', id: 'Memelihara (hewan)' },
      { jp: 'たてます (建てます)', reading: 'tatemasu', id: 'Mendirikan / membangun' },
      { jp: 'はしります (走ります)', reading: 'hashirimasu', id: 'Berlari' },
      { jp: 'とります [休みを〜]', reading: 'torimasu', id: 'Mengambil [cuti/libur]' },
      { jp: 'みえます (見えます)', reading: 'miemasu', id: 'Terlihat' },
      { jp: 'きこえます (聞こえます)', reading: 'kikoemasu', id: 'Terdengar' },
      { jp: 'できます [空港が〜]', reading: 'dekimasu', id: 'Selesai dibangun / jadi [bandara]' },
      { jp: 'ひらきます [教室を〜]', reading: 'hirakimasu', id: 'Membuka / menyelenggarakan [kursus]' },
      { jp: 'ペット', reading: 'petto', id: 'Hewan peliharaan' },
      { jp: 'とり (鳥)', reading: 'tori', id: 'Burung' },
      { jp: 'こえ (声)', reading: 'koe', id: 'Suara manusia/hewan' },
      { jp: 'なみ (波)', reading: 'nami', id: 'Ombak laut' },
      { jp: 'けしき (景色)', reading: 'keshiki', id: 'Pemandangan' }
    ]
  },
  {
    chapter: 28,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 28: Tindakan Simultan & Alasan Bertumpuk (〜ながら・〜し、〜し)',
    theme: 'Dua Aktivitas Bersamaan (Nagara) dan Menyebutkan Banyak Alasan Sejalan (~shi, ~shi)',
    summary: 'Pola KK Stem + nagara (sambil melakukan A, mengerjakan B: fokus utama pada perbuatan kedua), serta pola merangkai alasan majemuk (~shi, ~shi).',
    grammarPatterns: [
      {
        id: 'm28-1',
        pattern: 'KK1 Stem + ながら、KK2 (Sambil...)',
        formula: 'KK1 (Stem masu) + nagara, KK2',
        explanation: 'Melakukan dua perbuatan pada saat yang sama oleh pelaku yang sama. Fokus perbuatan utama berada di KK2.',
        examples: [
          { jp: '音楽を 聞きながら、勉強します。', reading: 'Ongaku o kikinagara, benkyou shimasu.', id: 'Belajar sambil mendengarkan musik.' },
          { jp: '働きながら、大学に 通っています。', reading: 'Hatarakinagara, daigaku ni kayotte imasu.', id: 'Kuliah di universitas sambil bekerja.' }
        ]
      },
      {
        id: 'm28-2',
        pattern: 'Kalimat 1 し、Kalimat 2 し、Kalimat 3 (Alasan Majemuk)',
        formula: 'Futsuukei [shi], Futsuukei [shi], Kesimpulan',
        explanation: 'Menyebutkan lebih dari satu faktor/alasan yang mendukung satu kesimpulan.',
        examples: [
          { jp: 'この 店は 美味しいし、安いし、いつも 来ています。', reading: 'Kono mise wa oishii shi, yasui shi, itsumo kite imasu.', id: 'Warung ini enak, murah pula, makanya saya selalu datang ke mari.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'うれます [パンが〜]', reading: 'uremasu', id: 'Terjual laris [roti]' },
      { jp: 'おどります (踊ります)', reading: 'odorimasu', id: 'Menari' },
      { jp: 'かみます', reading: 'kamimasu', id: 'Mengunyah / menggigit' },
      { jp: 'えらびます (選びます)', reading: 'erabimasu', id: 'Memilih' },
      { jp: 'かよいます [大学に〜]', reading: 'kayoimasu', id: 'Pergi pulang / bolak-balik [kuliah]' },
      { jp: 'メモします', reading: 'memoshimasu', id: 'Mencatat memo' },
      { jp: 'まじめ [な]', reading: 'majime [na]', id: 'Rajin / sungguh-sungguh' },
      { jp: 'ねっしん [な] (熱心)', reading: 'nesshin [na]', id: 'Antusias / tekun' },
      { jp: 'えらい (偉い)', reading: 'erai', id: 'Hebat / patut dikagumi' },
      { jp: 'ちょうどいい', reading: 'choudo ii', id: 'Pas sekali' },
      { jp: 'けいけん (経験)', reading: 'keiken', id: 'Pengalaman' },
      { jp: 'ちから (力)', reading: 'chikara', id: 'Tenaga / kekuatan' },
      { jp: 'にんき (人気)', reading: 'ninki', id: 'Popularitas / disukai banyak orang' }
    ]
  },
  {
    chapter: 29,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 29: Kondisi Hasil Spontan / Intransitif (自動詞 + ています)',
    theme: 'Kata Kerja Intransitif (Jidoushi) Menunjukkan Status Keadaan Nyata',
    summary: 'Pasangan kata kerja transitif (tadouishi) vs intransitif (jidoushi). Pola Jidoushi + te imasu untuk menggambarkan kondisi fisik yang tampak di depan mata (pintu terbuka, lampu menyala, piring pecah).',
    grammarPatterns: [
      {
        id: 'm29-1',
        pattern: 'KB が Jidoushi bentuk-Te + います (Kondisi Sedang Berlangsung/Terbuka/Pecah)',
        formula: 'KB [ga] KK Intransitif [te-kei] + imasu',
        explanation: 'Menyatakan keadaan yang tersisa setelah suatu kejadian berlangsung secara spontan.',
        examples: [
          { jp: '窓が 開いています。', reading: 'Mado ga aite imasu.', id: 'Jendela dalam keadaan terbuka.' },
          { jp: '電気が ついています。', reading: 'Denki ga tsuite imasu.', id: 'Lampu dalam keadaan menyala.' },
          { jp: 'お皿が 割れています。', reading: 'Osara ga warete imasu.', id: 'Piringnya dalam keadaan pecah.' }
        ]
      },
      {
        id: 'm29-2',
        pattern: 'KK bentuk-Te + しまいました (Kelar Tuntas / Penyesalan Tak Sengaja)',
        formula: 'KK [te-kei] + shimaimashita / shimaimasu',
        explanation: 'Menyatakan tindakan selesai sampai tuntas atau penyesalan atas ketidaksengajaan yang terjadi.',
        examples: [
          { jp: '宿題を 全部 やって しまいました。', reading: 'Shukudai o zenbu yatte shimaimashita.', id: 'Pekerjaan rumah sudah selesai dikerjakan semuanya sampai tuntas.' },
          { jp: 'パスポートを なくして しまいました。', reading: 'Pasupooto o nakushite shimaimashita.', id: 'Gawat, paspor saya sampai hilang (rasa sesal).' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'あきます [ドアが〜]', reading: 'akimasu', id: 'Terbuka [pintu]' },
      { jp: 'しまります [ドアが〜]', reading: 'shimarimasu', id: 'Tertutup [pintu]' },
      { jp: 'つきます [電気が〜]', reading: 'tsukimasu', id: 'Menyala [lampu]' },
      { jp: 'きえます [電気が〜]', reading: 'kiemasu', id: 'Padam / mati [lampu]' },
      { jp: 'こわれます [いすが〜]', reading: 'kowaremasu', id: 'Rusak [kursi]' },
      { jp: 'われます [コップが〜]', reading: 'waremasu', id: 'Pecah [gelas]' },
      { jp: 'おれます [木が〜]', reading: 'oremasu', id: 'Patah [pohon/dahan]' },
      { jp: 'やぶれます [紙が〜]', reading: 'yaburemasu', id: 'Robek [kertas]' },
      { jp: 'よごれます [服が〜]', reading: 'yogoremasu', id: 'Kotor [baju]' },
      { jp: 'はずれます [ボタンが〜]', reading: 'hazuremasu', id: 'Lepas / copot [kancing]' },
      { jp: 'とまります [エレベーターが〜]', reading: 'tomarimasu', id: 'Mogok / berhenti [lift]' },
      { jp: 'まちがえます', reading: 'machigaemasu', id: 'Melakukan kesalahan / keliru' },
      { jp: 'おとします (落とします)', reading: 'otoshimasu', id: 'Menjatuhkan barang' }
    ]
  },
  {
    chapter: 30,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 30: Kondisi Sengaja Ditata & Persiapan (〜てあります・〜ておきます)',
    theme: 'Status Tertata Oleh Manusia (~te arimasu) dan Persiapan Menjelang Waktu (~te okimasu)',
    summary: 'Pola kata kerja transitif + te arimasu untuk menunjukkan hasil perbuatan yang sengaja dipersiapkan seseorang, serta pola KK + te okimasu untuk persiapan dini atau membiarkan kondisi seperti semula.',
    grammarPatterns: [
      {
        id: 'm30-1',
        pattern: 'KB が KK Transitif bentuk-Te + あります (Kondisi Sengaja Dipasang/Ditulis)',
        formula: 'KB [ga] KK Transitif [te-kei] + arimasu',
        explanation: 'Menyatakan keadaan di mana seseorang sengaja meletakkan/memasang sesuatu demi tujuan tertentu.',
        examples: [
          { jp: 'カレンダーに 今月の 予定が 書いて あります。', reading: 'Karendaa ni kongetsu no yotei ga kaite arimasu.', id: 'Pada kalender sudah tertulis rencana jadwal bulan ini.' },
          { jp: '壁に カレンダーが 掛けて あります。', reading: 'Kabe ni karendaa ga kakete arimasu.', id: 'Di dinding sengaja dipasangi kalender.' }
        ]
      },
      {
        id: 'm30-2',
        pattern: 'KK bentuk-Te + おきます (Melakukan Persiapan Terlebih Dahulu)',
        formula: 'KK [te-kei] + okimasu',
        explanation: 'Melakukan persiapan sebelum waktu tiba, atau mengembalikan barang ke tempat semula.',
        examples: [
          { jp: '旅行の 前に、ホテルを 予約して おきます。', reading: 'Ryokou no mae ni, hoteru o yoyaku shite okimasu.', id: 'Sebelum perjalanan, saya memesan hotel terlebih dahulu.' },
          { jp: '使ったら、元の 所に 戻して おいて ください。', reading: 'Tsukattara, moto no tokoro ni modoshite oite kudasai.', id: 'Setelah dipakai, tolong kembalikan ke tempat semula ya.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'はります (貼ります)', reading: 'harimasu', id: 'Menempelkan' },
      { jp: 'かけます [カレンダーを〜]', reading: 'kakemasu', id: 'Menggantungkan [kalender]' },
      { jp: 'かざります (飾ります)', reading: 'kazarimasu', id: 'Menghias / memajang' },
      { jp: 'ならべます (並べます)', reading: 'narabemasu', id: 'Menjajarkan / menata berbaris' },
      { jp: 'うえます (植えます)', reading: 'uemasu', id: 'Menanam' },
      { jp: 'もどします (戻します)', reading: 'modoshimasu', id: 'Mengembalikan ke posisi awal' },
      { jp: 'まとめます', reading: 'matomemasu', id: 'Merangkum / menyusun rapi' },
      { jp: 'かたづけます (片づけます)', reading: 'katazukemasu', id: 'Membereskan / merapikan' },
      { jp: 'しまいます', reading: 'shimaimasu', id: 'Menyimpan ke dalam lemari' },
      { jp: 'きめます (決めます)', reading: 'kimemasu', id: 'Menentukan / memutuskan' },
      { jp: 'よしゅうします (予習します)', reading: 'yoshuu shimasu', id: 'Mempelajari materi pelajaran terlebih dahulu' },
      { jp: 'ふくしゅうします (復習します)', reading: 'fukushuu shimasu', id: 'Mengulang pelajaran (review)' }
    ]
  },
  {
    chapter: 31,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 31: Bentuk Maksud & Rencana (意向形 Ikoukei: 〜ようと思う・〜予定です)',
    theme: 'Bentuk Kehendak/Volisional (Ikoukei), Niat Pribadi (~to omotte imasu), dan Jadwal Resmi (~yotei desu)',
    summary: 'Konjugasi bentuk volisional/ajakan kasual (Ikoukei). Pola menyatakan tekad dan niat pribadi (~you to omotte imasu) dan jadwal resmi terencana (~yotei desu).',
    grammarPatterns: [
      {
        id: 'm31-1',
        pattern: 'KK bentuk-Ikoukei (Ajakan Kasual)',
        formula: 'G1: u -> ou (ikou) | G2: tabeyou | G3: koyou / shiyou',
        explanation: 'Bentuk kasual dari ~mashou ("Ayo!").',
        examples: [
          { jp: 'ちょっと 休もう。', reading: 'Chotto yasumou.', id: 'Ayo kita istirahat sebentar (kasual).' }
        ]
      },
      {
        id: 'm31-2',
        pattern: 'KK bentuk-Ikoukei + と 思っています (Bermaksud / Berencana...)',
        formula: 'KK [ikou-kei] + to omotte imasu',
        explanation: 'Menyatakan maksud atau niat yang sudah lama direncanakan dan masih terus dipegang.',
        examples: [
          { jp: '週末は 海へ 行こうと 思っています。', reading: 'Shuumatsu wa umi e ikou to omotte imasu.', id: 'Akhir pekan saya bermaksud pergi ke pantai.' },
          { jp: '国へ 帰ったら、会社を 作ろうと 思っています。', reading: 'Kuni e kaettara, kaisha o tsukurou to omotte imasu.', id: 'Setelah kembali ke tanah air, saya berencana mendirikan perusahaan.' }
        ]
      },
      {
        id: 'm31-3',
        pattern: 'KK Kamus / KB の + 予定です (Terjadwal...)',
        formula: 'KK [jisho-kei] / KB [no] + yotei desu',
        explanation: 'Menyatakan jadwal atau agenda pasti yang sudah diputuskan secara resmi.',
        examples: [
          { jp: '出張は １週間の 予定です。', reading: 'Shucchou wa isshuukan no yotei desu.', id: 'Dinas luar kota dijadwalkan selama 1 minggu.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'はじまります [式が〜]', reading: 'hajimarimasu', id: 'Dimulai [upacara]' },
      { jp: 'つづけます (続けます)', reading: 'tsuzukemasu', id: 'Melanjutkan' },
      { jp: 'みつけます (見つけます)', reading: 'mitsukemasu', id: 'Menemukan' },
      { jp: 'うけます [試験を〜]', reading: 'ukemasu', id: 'Mengikuti [ujian]' },
      { jp: 'にゅうがくします [大学に〜]', reading: 'nyuugaku shimasu', id: 'Masuk [universitas]' },
      { jp: 'そつぎょうします [大学を〜]', reading: 'sotsugyou shimasu', id: 'Lulus [dari universitas]' },
      { jp: 'しゅっせきします [会議に〜]', reading: 'shusseki shimasu', id: 'Menghadiri [rapat]' },
      { jp: 'きゅうけいします (休憩します)', reading: 'kyuukei shimasu', id: 'Beristirahat rehat sejenak' },
      { jp: 'よてい (予定)', reading: 'yotei', id: 'Jadwal rencana' }
    ]
  },
  {
    chapter: 32,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 32: Saran & Perkiraan Cuaca/Kondisi (〜たほうがいい・〜でしょう・〜かもしれません)',
    theme: 'Memberi Saran Terbaik (~ta hou ga ii), Prediksi Pasti (~deshou), dan Kemungkinan (~kamoshiremasen)',
    summary: 'Memberi nasehat medis/praktis (~ta hou ga ii desu / ~nai hou ga ii desu), memprediksi dengan keyakinan tinggi (~deshou), dan menyatakan kemungkinan 50-50 (~kamoshiremasen).',
    grammarPatterns: [
      {
        id: 'm32-1',
        pattern: 'KK bentuk-Ta / Nai + ほうがいいです (Sebaiknya... / Lebih Baik Jangan...)',
        formula: 'KK [ta-kei] hou ga ii desu / KK [nai-kei] hou ga ii desu',
        explanation: 'Memberikan saran atau anjuran kuat mana pilihan yang lebih baik bagi lawan bicara.',
        examples: [
          { jp: '毎朝 運動した ほうがいいです。', reading: 'Maiasa undou shita hou ga ii desu.', id: 'Sebaiknya setiap pagi berolahraga.' },
          { jp: '熱が ありますから、お風呂に 入らない ほうがいいです。', reading: 'Netsu ga arimasu kara, ofuro ni hairanai hou ga ii desu.', id: 'Karena demam, sebaiknya jangan berendam di bak mandi.' }
        ]
      },
      {
        id: 'm32-2',
        pattern: '〜でしょう (Pasti / Kemungkinan Besar...)',
        formula: 'Futsuukei [tanpa da pada KB/Na-kei] + deshou',
        explanation: 'Menyatakan perkiraan berdasarkan data objektif (seperti ramalan cuaca).',
        examples: [
          { jp: '明日は 雨が 降るでしょう。', reading: 'Ashita wa ame ga furu deshou.', id: 'Besok kemungkinan besar akan turun hujan.' }
        ]
      },
      {
        id: 'm32-3',
        pattern: '〜かもしれません (Mungkin saja...)',
        formula: 'Futsuukei [tanpa da pada KB/Na-kei] + kamoshiremasen',
        explanation: 'Menyatakan kemungkinan yang belum pasti (kira-kira 50% atau kurang).',
        examples: [
          { jp: '約束の 時間に 間に合わないかも しれません。', reading: 'Yakusoku no jikan ni maniawanai kamo shiremasen.', id: 'Mungkin saja saya tidak sempat tepat waktu pada janji temu.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'うんどうします (運動します)', reading: 'undou shimasu', id: 'Berolahraga' },
      { jp: 'せいこうします (成功します)', reading: 'seikou shimasu', id: 'Berhasil / sukses' },
      { jp: 'しっぱいします [試験に〜]', reading: 'shippai shimasu', id: 'Gagal [dalam ujian]' },
      { jp: 'ごうかくします [試験に〜]', reading: 'goukaku shimasu', id: 'Lulus [ujian]' },
      { jp: 'やみます [雨が〜]', reading: 'yamimasu', id: 'Reda [hujan]' },
      { jp: 'はれます (晴れます)', reading: 'haremasu', id: 'Cerah' },
      { jp: 'くもります (曇ります)', reading: 'kumorimasu', id: 'Mendung' },
      { jp: 'ひえます (冷えます)', reading: 'hiemasu', id: 'Menjadi dingin sejuk' },
      { jp: 'かぜ (風)', reading: 'kaze', id: 'Angin' },
      { jp: 'たいふう (台風)', reading: 'taifuu', id: 'Angin topan taifun' },
      { jp: 'じしん (地震)', reading: 'jishin', id: 'Gempa bumi' }
    ]
  },
  {
    chapter: 33,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 33: Perintah & Larangan Keras (命令形 & 禁止形: 〜な・〜という意味です)',
    theme: 'Bentuk Perintah Tegas (Meireikei), Larangan Keras (Kinshikei), dan Menjelaskan Arti Rambu Tanda',
    summary: 'Konjugasi bentuk perintah darurat/militer/olahraga (Meireikei) dan larangan keras (~na). Serta pola menanyakan atau menjelaskan arti rambu tanda lalu lintas / lambang (~to iu imi desu).',
    grammarPatterns: [
      {
        id: 'm33-1',
        pattern: 'Bentuk Perintah (命令形 Meireikei) & Larangan (禁止形 Kinshikei)',
        formula: 'G1: u -> e (ike/mate) | Larangan: KK Kamus + na (iku na / taberu na)',
        explanation: 'Dipakai pada kondisi darurat (kebakaran/gempa), instruksi atasan pabrik dalam bahaya, atau teriakan suporter olahraga.',
        examples: [
          { jp: '逃げろ！ (Nigero!)', reading: 'Nigero!', id: 'Lari cepat! (perintah evakuasi)' },
          { jp: '触るな！ (Sawaru na!)', reading: 'Sawaru na!', id: 'Jangan sentuh! (larangan bahaya)' }
        ]
      },
      {
        id: 'm33-2',
        pattern: '〜という 意味です (~ to iu imi desu: Artinya adalah...)',
        formula: 'Kata / Rambu [wa] Kalimat [to iu imi desu]',
        explanation: 'Menjelaskan definisi atau makna dari suatu lambang, huruf Kanji, atau istilah.',
        examples: [
          { jp: '「立入禁止」は 入るな という 意味です。', reading: '"Tachiiri Kinshi" wa hairu na to iu imi desu.', id: '"Tachiiri Kinshi" artinya adalah jangan masuk (Dilarang Masuk).' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'にげます (逃げます)', reading: 'nigemasu', id: 'Melarikan diri / kabur' },
      { jp: 'さわぎます (騒ぎます)', reading: 'sawagimasu', id: 'Membuat keributan / berisik' },
      { jp: 'あきらめます', reading: 'akiramemasu', id: 'Menyerah / putus asa' },
      { jp: 'なげます (投げます)', reading: 'nagemasu', id: 'Melempar' },
      { jp: 'まもります (守ります)', reading: 'mamorimasu', id: 'Mematuhi / menjaga aturan' },
      { jp: 'たちいりきんし (立入禁止)', reading: 'tachiiri kinshi', id: 'Dilarang Masuk' },
      { jp: 'きんえん (禁煙)', reading: 'kin\'en', id: 'Dilarang Merokok' },
      { jp: 'ひじょうぐち (非常口)', reading: 'hijouguchi', id: 'Pintu darurat evakuasi' },
      { jp: 'しようちゅう (使用中)', reading: 'shiyouchuu', id: 'Sedang digunakan' }
    ]
  },
  {
    chapter: 34,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 34: Mengikuti Petunjuk & Setelah Melakukan (〜とおりに・〜あとで)',
    theme: 'Melakukan Sesuai Petunjuk Model (~toori ni) dan Setelah Menyelesaikan (~ato de)',
    summary: 'Pola KK Kamus/Ta atau KB no + toori ni (sesuai persis dengan arahan/resep/instruksi), serta pola KK-Ta / KB no + ato de (setelah...).',
    grammarPatterns: [
      {
        id: 'm34-1',
        pattern: 'KK Kamus / Ta / KB の + とおりに (Sesuai Petunjuk/Arahan...)',
        formula: 'KK [jisho/ta] / KB [no] + toori ni, KK2',
        explanation: 'Melakukan suatu perbuatan persis sesuai dengan instruksi, gambar, resep, atau contoh.',
        examples: [
          { jp: 'わたしが 言う とおりに、書いて ください。', reading: 'Watashi ga iu toori ni, kaite kudasai.', id: 'Tolong tulis persis sesuai apa yang saya katakan.' },
          { jp: '説明書の とおりに、組み立てました。', reading: 'Setsumeisho no toori ni, kumitatemashita.', id: 'Sudah saya rakit sesuai buku petunjuk manual.' }
        ]
      },
      {
        id: 'm34-2',
        pattern: 'KK bentuk-Ta / KB の + あとで (Setelah...)',
        formula: 'KK [ta-kei] / KB [no] + ato de, KK2',
        explanation: 'Menyatakan urutan waktu di mana perbuatan kedua berlangsung sesudah perbuatan pertama.',
        examples: [
          { jp: '仕事が 終わった あとで、飲みに行きます。', reading: 'Shigoto ga owatta ato de, nomi ni ikimasu.', id: 'Setelah pekerjaan selesai, saya pergi minum-minum.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'みがきます [歯を〜]', reading: 'migakimasu', id: 'Menggosok [gigi]' },
      { jp: 'くみたてます (組み立てます)', reading: 'kumitatemasu', id: 'Merakit (mesin/furnitur)' },
      { jp: 'おります (折ります)', reading: 'orimasu', id: 'Melipat (kertas/origami)' },
      { jp: 'きがつきます [忘れ物に〜]', reading: 'ki ga tsukimasu', id: 'Menyadari [ada barang ketinggalan]' },
      { jp: 'つけます [しょうゆを〜]', reading: 'tsukemasu', id: 'Mencelupkan / membubuhkan [kecap asin]' },
      { jp: 'せつめいしょ (説明書)', reading: 'setsumeisho', id: 'Buku panduan petunjuk' },
      { jp: 'ず (図)', reading: 'zu', id: 'Diagram / gambar bagan' },
      { jp: 'せん (線)', reading: 'sen', id: 'Garis' }
    ]
  },
  {
    chapter: 35,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 35: Bentuk Pengandaian Syarat (条件形 Joukenkei: 〜ば・〜なら)',
    theme: 'Konjugasi Bentuk Syarat (~ba), Menanggapi Topik Usulan (~nara), dan Semakin... Semakin...',
    summary: 'Konjugasi Joukenkei (G1: u jadi e + ba; G2: ~reba; G3: kureba / sureba; I-kei: kereba). Penggunaan nara untuk saran topik, serta pola ~ba ~hodo (makin... makin...).',
    grammarPatterns: [
      {
        id: 'm35-1',
        pattern: 'KK / Sifat bentuk-Ba (Syarat Pengandaian: Kalau...)',
        formula: 'KK [jouken-kei ~ba] / I-Kei [~kereba]',
        explanation: 'Menyatakan kondisi syarat mutlak agar suatu hal dapat terwujud.',
        examples: [
          { jp: '春に なれば、桜が 咲きます。', reading: 'Haru ni nareba, sakura ga sakimasu.', id: 'Kalau sudah tiba musim semi, bunga sakura akan mekar.' },
          { jp: '安ければ、買います。', reading: 'Yasukereba, kaimasu.', id: 'Kalau murah, saya beli.' }
        ]
      },
      {
        id: 'm35-2',
        pattern: 'KB + なら (Kalau Soal Hal Itu, Maka...)',
        formula: 'KB + nara',
        explanation: 'Mengambil topik yang baru saja diutarakan lawan bicara lalu memberikan saran spesifik.',
        examples: [
          { jp: '温泉なら、草津が いいですよ。', reading: 'Onsen nara, Kusatsu ga ii desu yo.', id: 'Kalau pemandian air panas onsen, Kusatsu sangat bagus lho.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'さきます [花が〜]', reading: 'sakimasu', id: 'Mekar [bunga]' },
      { jp: 'かわります [色が〜]', reading: 'kawarimasu', id: 'Berubah [warna]' },
      { jp: 'こまります (困ります)', reading: 'komarimasu', id: 'Kesulitan / bingung repot' },
      { jp: 'つけます [丸を〜]', reading: 'tsukemasu', id: 'Membubuhkan [tanda lingkaran]' },
      { jp: 'ひろいます (拾います)', reading: 'hiroimasu', id: 'Memungut' },
      { jp: 'ただしい (正しい)', reading: 'tadashii', id: 'Benar / tepat' },
      { jp: 'むこう (向こう)', reading: 'mukou', id: 'Arah seberang sana' },
      { jp: 'しま (島)', reading: 'shima', id: 'Pulau' },
      { jp: 'みなと (港)', reading: 'minato', id: 'Pelabuhan' }
    ]
  },
  {
    chapter: 36,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 36: Demi Terwujudnya Suatu Target (〜ように・〜なくなりました)',
    theme: 'Pola Tujuan Supaya (~you ni), Menjadi Terbiasa Bisa, dan Menjaga Kebiasaan Rutin',
    summary: 'Pola KK Potensial/Nai + you ni (supaya bisa / agar tidak), perubahan kemampuan baru (~you ni narimashita), dan usaha menjaga disiplin rutinitas (~you ni shite imasu).',
    grammarPatterns: [
      {
        id: 'm36-1',
        pattern: 'KK Potensial/Nai + ように、〜 (Supaya / Agar...)',
        formula: 'KK [kanou-kei / nai-kei] + you ni, KK Pokok',
        explanation: 'Menyatakan tindakan sadar yang dilakukan agar kondisi yang tidak bisa dikontrol sendiri dapat tercapai.',
        examples: [
          { jp: '日本語が 話せるように、毎日 練習しています。', reading: 'Nihongo ga hanaseru you ni, mainichi renshuu shite imasu.', id: 'Supaya bisa berbicara bahasa Jepang, setiap hari berlatih.' },
          { jp: '忘れないように、メモして おきます。', reading: 'Wasurenai you ni, memo shite okimasu.', id: 'Supaya tidak lupa, saya catat memo terlebih dahulu.' }
        ]
      },
      {
        id: 'm36-2',
        pattern: 'KK Kamus + ように なりました (Sudah Menjadi Bisa)',
        formula: 'KK [jisho-kei / kanou-kei] + you ni narimashita',
        explanation: 'Menyatakan perubahan dari kondisi sebelumnya belum bisa menjadi sekarang sudah mampu.',
        examples: [
          { jp: '刺身が 食べられるように なりました。', reading: 'Sashimi ga taberareru you ni narimashita.', id: 'Sekarang saya sudah bisa makan sashimi.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'とどきます [荷物が〜]', reading: 'todokimasu', id: 'Sampai / terkirim [paket]' },
      { jp: 'でます [試合に〜]', reading: 'demasu', id: 'Ikut serta bertanding [pertandingan]' },
      { jp: 'うちます [ワープロを〜]', reading: 'uchimasu', id: 'Mengetik' },
      { jp: 'ちょきんします (貯金します)', reading: 'chokin shimasu', id: 'Menabung uang' },
      { jp: 'ふとります (太ります)', reading: 'futorimasu', id: 'Bertambah gemuk' },
      { jp: 'やせます', reading: 'yasemasu', id: 'Menjadi kurus / langsing' },
      { jp: 'すぎます [７時を〜]', reading: 'sugimasu', id: 'Lewat [jam 7]' },
      { jp: 'なれます [習慣に〜]', reading: 'naremasu', id: 'Terbiasa [dengan kebiasaan]' },
      { jp: 'かたい (硬い / 固い)', reading: 'katai', id: 'Keras' },
      { jp: 'やわらかい (軟らかい)', reading: 'yawarakai', id: 'Lunak / empuk' }
    ]
  },
  {
    chapter: 37,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 37: Bentuk Pasif (受身形 Ukemikei: 〜れる・〜られる)',
    theme: 'Konjugasi Bentuk Pasif (Ukemikei), Pasif Langsung, Pasif Yang Merugikan (Meiwaku no Ukemi)',
    summary: 'Konjugasi bentuk pasif (G1: a + reru; G2: ~rareru; G3: korareru / sareru). Kalimat pasif dipuji/dimarahi atasan, serta pasif penderitaan ketiban sial (meiwaku no ukemi).',
    grammarPatterns: [
      {
        id: 'm37-1',
        pattern: 'Orang 1 は Orang 2 に Kata Kerja Pasif (Diberi Perlakuan Oleh...)',
        formula: 'Korban/Penerima [wa] Pelaku [ni] KK [ukemi-kei]',
        explanation: 'Menyatakan bahwa subjek dikenai tindakan perbuatan oleh orang lain.',
        examples: [
          { jp: 'わたしは 先生に 褒められました。', reading: 'Watashi wa sensei ni homeraremashita.', id: 'Saya dipuji oleh guru.' },
          { jp: '部長に 叱られました。', reading: 'Buchou ni shikararemashita.', id: 'Saya dimarahi oleh manajer bagian.' }
        ]
      },
      {
        id: 'm37-2',
        pattern: 'Pasif Pemilikan / Ketiban Sial (迷惑の受身 Meiwaku no Ukemi)',
        formula: 'Subjek [wa] Pelaku [ni] Benda Milik [o] KK Pasif',
        explanation: 'Subjek merasa dirugikan karena barang miliknya diinjak, dicuri, atau dirusak orang lain.',
        examples: [
          { jp: '電車で 足を 踏まれました。', reading: 'Densha de ashi o fumaremashita.', id: 'Kaki saya terinjak oleh seseorang di dalam kereta (merasa sial).' },
          { jp: '泥棒に 財布を 盗まれました。', reading: 'Dorobou ni saifu o nusumaremashita.', id: 'Dompet saya dicuri oleh pencuri.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'ほめます (褒めます)', reading: 'homemasu', id: 'Memuji' },
      { jp: 'しかります (叱ります)', reading: 'shikarimasu', id: 'Memarahi' },
      { jp: 'さそいます (誘います)', reading: 'sasoimasu', id: 'Mengajak' },
      { jp: 'しょうたいします (招待します)', reading: 'shoutai shimasu', id: 'Mengundang' },
      { jp: 'たのみます (頼みます)', reading: 'tanomimasu', id: 'Meminta tolong' },
      { jp: 'ちゅういします (注意します)', reading: 'chuui shimasu', id: 'Mengingatkan / menegur' },
      { jp: 'とります (盗ります)', reading: 'torimasu', id: 'Mengambil / mencuri' },
      { jp: 'ふみます (踏みます)', reading: 'fumimasu', id: 'Menginjak' },
      { jp: 'こわします (壊します)', reading: 'kowashimasu', id: 'Merusakkan' },
      { jp: 'ぬすみます (盗みます)', reading: 'nusumimasu', id: 'Mencuri' }
    ]
  },
  {
    chapter: 38,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 38: Pembendaan Kalimat dengan "No" (名詞化の「の」)',
    theme: 'Mengubah Kalimat Menjadi Kata Benda: KK Futsuukei + no wa / no ga / no o',
    summary: 'Fungsi partikel pembenda "no". Pola "...no wa taihen desu" (melakukan hal itu berat), "...no ga suki desu", dan "...no o wasuremashita" (lupa melakukan hal tersebut).',
    grammarPatterns: [
      {
        id: 'm38-1',
        pattern: 'KK bentuk Biasa + のは 〜です (Hal Melakukan Itu Adalah...)',
        formula: 'KK [futsuukei] + no wa + Sifat / KB desu',
        explanation: 'Menjadikan keseluruhan klausa perbuatan sebagai subjek kalimat.',
        examples: [
          { jp: '一人で 暮らすのは 大変です。', reading: 'Hitori de kurasu no wa taihen desu.', id: 'Tinggal hidup sendirian itu ternyata berat.' },
          { jp: 'テニスを 見るのは 面白いです。', reading: 'Tenisu o miru no wa omoshiroi desu.', id: 'Menonton tenis itu menarik.' }
        ]
      },
      {
        id: 'm38-2',
        pattern: 'KK bentuk Biasa + のを 忘れました (Lupa Melakukan Suatu Hal)',
        formula: 'KK [futsuukei] + no o wasuremashita',
        explanation: 'Menyatakan bahwa diri sendiri lupa mengerjakan suatu rutinitas atau kewajiban.',
        examples: [
          { jp: '鍵を 掛けるのを 忘れました。', reading: 'Kagi o kakeru no o wasuremashita.', id: 'Saya lupa mengunci pintu.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'そだてます (育てます)', reading: 'sodatemasu', id: 'Merawat / membesarkan (anak/tanaman)' },
      { jp: 'はこびます (運びます)', reading: 'hakobimasu', id: 'Mengangkut / memindahkan barang' },
      { jp: 'にゅういんします (入院します)', reading: 'nyuuin shimasu', id: 'Masuk rawat inap di rumah sakit' },
      { jp: 'たいいんします (退院します)', reading: 'taiin shimasu', id: 'Keluar sembuh dari rumah sakit' },
      { jp: 'いれます [電源を〜]', reading: 'iremasu', id: 'Menyalakan [saklar daya listrik]' },
      { jp: 'きります [電源を〜]', reading: 'kirimasu', id: 'Mematikan [daya listrik]' },
      { jp: 'かけます [鍵を〜]', reading: 'kakemasu', id: 'Mengunci [gembok/kunci]' },
      { jp: 'うそ (嘘)', reading: 'uso', id: 'Bohong' }
    ]
  },
  {
    chapter: 39,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 39: Sebab Akibat Spontan Emosi (〜て / 〜ので)',
    theme: 'Alasan Tak Sengaja / Emosi Batin (~te / ~kute) dan Alasan Sebab Halus Sopan (~node)',
    summary: 'Pola bentuk-Te untuk alasan perasaan psikologis (senang, kaget, sedih) yang tidak mengandung kehendak sengaja, serta penggunaan "node" sebagai sebab alasan objektif nan santun.',
    grammarPatterns: [
      {
        id: 'm39-1',
        pattern: 'KK-te / Sifat-kute / Sifat-de + Perasaan Batin / Akibat Spontan',
        formula: 'Sebab [bentuk te] + Akibat Emosional / Spontan',
        explanation: 'Bagian akibat tidak boleh berupa kalimat perintah, ajakan, atau kemauan pribadi.',
        examples: [
          { jp: '家族に 会えなくて、寂しいです。', reading: 'Kazoku ni aenakute, sabishii desu.', id: 'Karena tidak bisa bertemu keluarga, merasa kesepian.' },
          { jp: 'ニュースを 聞いて、びっくりしました。', reading: 'Nyuusu o kiite, bikkuri shimashita.', id: 'Mendengar berita itu, saya sangat terkejut.' }
        ]
      },
      {
        id: 'm39-2',
        pattern: 'Kalimat Biasa + ので、〜 (~ node: Berhubung / Karena...)',
        formula: 'Futsuukei [Na-kei/KB + na] + node, Akibat',
        explanation: 'Menyatakan alasan yang terdengar wajar dan sopan kepada lawan bicara saat meminta izin atau permisi.',
        examples: [
          { jp: '気分が 悪いので、早退しても いいですか。', reading: 'Kibun ga warui node, soutai shite mo ii desu ka.', id: 'Berhubung badan saya kurang sehat, bolehkah saya pulang lebih awal?' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'こたえます [質問に〜]', reading: 'kotaemasu', id: 'Menjawab [pertanyaan]' },
      { jp: 'たおれます [ビルが〜]', reading: 'taoremasu', id: 'Roboh / tumbang [gedung/pohon]' },
      { jp: 'やけます [家が〜]', reading: 'yakemasu', id: 'Terbakar hangus [rumah]' },
      { jp: 'しにます (死にます)', reading: 'shinimasu', id: 'Meninggal dunia' },
      { jp: 'びっくりします', reading: 'bikkuri shimasu', id: 'Terkejut kaget' },
      { jp: 'がっかりします', reading: 'gakkari shimasu', id: 'Kecewa' },
      { jp: 'あんしんします (安心します)', reading: 'anshin shimasu', id: 'Lega / merasa tenang' },
      { jp: 'ちこくします (遅刻します)', reading: 'chikoku shimasu', id: 'Terlambat datang' }
    ]
  },
  {
    chapter: 40,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 40: Pertanyaan Bersarang & Mencoba Sesuatu (〜か / 〜かどうか・〜てみる)',
    theme: 'Klausa Tanya di Dalam Kalimat (~ka / ~ka dou ka) dan Mencoba Berbuat (~te miru)',
    summary: 'Menyisipkan kalimat tanya ke dalam induk kalimat menggunakan kata tanya + ka atau ka dou ka (apakah ya atau tidak). Serta pola KK-te + miru (mencoba melakukan sesuatu).',
    grammarPatterns: [
      {
        id: 'm40-1',
        pattern: 'Kata Tanya + Kalimat Biasa + か、わかりません',
        formula: 'Doko/Dare/Itsu [futsuukei] + ka, shirimasen/kikimasu',
        explanation: 'Menyisipkan kalimat tanya ke dalam pembicaraan.',
        examples: [
          { jp: '会議が 何時に 始まるか、知っていますか。', reading: 'Kaigi ga nan-ji ni hajimaru ka, shitte imasu ka.', id: 'Apakah Anda tahu jam berapa rapat akan dimulai?' }
        ]
      },
      {
        id: 'm40-2',
        pattern: 'Kalimat Biasa + かどうか、〜 (~ ka dou ka: Apakah iya atau tidak)',
        formula: 'Futsuukei [tanpa da] + ka dou ka',
        explanation: 'Digunakan saat anak kalimat tanya tidak memiliki kata tanya khusus.',
        examples: [
          { jp: '間違いが ないかどうか、確かめて ください。', reading: 'Machigai ga nai ka dou ka, tashikamete kudasai.', id: 'Tolong pastikan apakah ada kesalahan atau tidak.' }
        ]
      },
      {
        id: 'm40-3',
        pattern: 'KK bentuk-Te + みます (Mencoba Melakukan...)',
        formula: 'KK [te-kei] + mimasu',
        explanation: 'Mencoba melakukan suatu perbuatan untuk mengetahui rasanya, pas tidaknya, atau hasilnya.',
        examples: [
          { jp: 'この ズボンを はいて みても いいですか。', reading: 'Kono zubon o haite mite mo ii desu ka.', id: 'Bolehkah saya mencoba mencocokkan celana ini?' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'かぞえます (数えます)', reading: 'kazoemasu', id: 'Menghitung angka' },
      { jp: 'はかります (測ります / 量ります)', reading: 'hakarimasu', id: 'Mengukur panjang / menimbang berat' },
      { jp: 'たしかめます (確かめます)', reading: 'tashikamemasu', id: 'Memastikan / mengecek kembali' },
      { jp: 'あいます [サイズが〜]', reading: 'aimasu', id: 'Cocok pas [ukuran baju]' },
      { jp: 'しゅっぱつします (出発します)', reading: 'shuppatsu shimasu', id: 'Berangkat' },
      { jp: 'とうちゃくします (到着します)', reading: 'touchaku shimasu', id: 'Tiba di tempat tujuan' },
      { jp: 'よいます (酔います)', reading: 'yoimasu', id: 'Mabuk (minuman/kendaraan)' },
      { jp: 'ぼうねんかい (忘年会)', reading: 'bounenkai', id: 'Pesta tutup tahun' }
    ]
  },
  {
    chapter: 41,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 41: Tingkat Kesopanan Memberi & Menerima (やる・いただく・くださる)',
    theme: 'Tingkatan Sosialisasi Keberian: Yaru (bawah), Kureru/Morau (setara), Itadaku/Kudasaru (atasan)',
    summary: 'Ekspresi kesopanan tinggi memberi dan menerima (Yaru kepada tanaman/hewan, Itadaku menerima dari atasan, Kudasaru atasan berbuat kebaikan kepada saya).',
    grammarPatterns: [
      {
        id: 'm41-1',
        pattern: 'KK-te いただきます (Menerima Kebaikan Dari Atasan)',
        formula: 'Watashi wa Atasan [ni] KK [te-kei] + itadakimashita',
        explanation: 'Bentuk merendah hormat dari ~te moraimashita.',
        examples: [
          { jp: 'わたしは 社長に ご馳走して いただきました。', reading: 'Watashi wa shachou ni gochisou shite itadakimashita.', id: 'Saya ditraktir makan oleh Bapak Direktur.' }
        ]
      },
      {
        id: 'm41-2',
        pattern: 'KK-te くださいます (Atasan Berkenan Membantu Saya)',
        formula: 'Atasan [ga/wa] watashi ni KK [te-kei] + kudasaimashita',
        explanation: 'Bentuk penghormatan tinggi dari ~te kuremashita.',
        examples: [
          { jp: '部長の 奥さんが お茶を 教えて くださいました。', reading: 'Buchou no okusan ga ocha o oshiete kudasaimashita.', id: 'Istri kepala bagian berkenan mengajari saya upacara minum teh.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'いただきます', reading: 'itadakimasu', id: 'Menerima (merendah dari moraimasu)' },
      { jp: 'くださいます', reading: 'kudasaimasu', id: 'Memberi kepada saya (hormat dari kuremasu)' },
      { jp: 'やります', reading: 'yarimasu', id: 'Memberi (kepada hewan/tanaman/bawahan)' },
      { jp: 'あげます [温度を〜]', reading: 'agemasu', id: 'Menaikkan [suhu]' },
      { jp: 'さげます [温度を〜]', reading: 'sagemasu', id: 'Menurunkan [suhu]' },
      { jp: 'しんせつにします (親切にします)', reading: 'shinsetsu ni shimasu', id: 'Memperlakukan dengan ramah baik' },
      { jp: 'えさ', reading: 'esa', id: 'Pakan hewan' }
    ]
  },
  {
    chapter: 42,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 42: Tujuan Mutlak & Kegunaan (〜ために・〜のに使います)',
    theme: 'Demi Suatu Cita-Cita / Manfaat (~tame ni) dan Digunakan Untuk (~no ni tsukaimasu)',
    summary: 'Pola KK Kamus / KB no + tame ni (demi/untuk tujuan kehendak sadar), serta penggunaan KK Kamus + no ni tsukaimasu / benri desu (kegunaan praktis suatu alat).',
    grammarPatterns: [
      {
        id: 'm42-1',
        pattern: 'KK Kamus / KB の + ために (Demi / Untuk Mencapai...)',
        formula: 'KK [jisho-kei] / KB [no] + tame ni, Tindakan Sadar',
        explanation: 'Menyatakan tekad kuat melakukan sesuatu demi terwujudnya cita-cita atau demi kepentingan seseorang.',
        examples: [
          { jp: '将来 自分の 店を 持つ ために、貯金しています。', reading: 'Shourai jibun no mise o motsu tame ni, chokin shite imasu.', id: 'Demi memiliki toko sendiri di masa depan, saya giat menabung.' },
          { jp: '家族の ために、一生懸命 働きます。', reading: 'Kazoku no tame ni, isshoukenmei hatarakimasu.', id: 'Demi keluarga, saya bekerja sekuat tenaga.' }
        ]
      },
      {
        id: 'm42-2',
        pattern: 'KK Kamus + のに 使います / 便利です (Digunakan Untuk...)',
        formula: 'KK [jisho-kei] + no ni tsukaimasu / benri desu / jikan ga kakarimasu',
        explanation: 'Menyatakan fungsi pemanfaatan suatu perkakas, atau estimasi waktu penyelesaian.',
        examples: [
          { jp: 'この はさみは 花を 切るのに 使います。', reading: 'Kono hasami wa hana o kiru no ni tsukaimasu.', id: 'Gunting ini dipakai untuk memotong bunga.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'つつみます (包みます)', reading: 'tsutsumimasu', id: 'Membungkus' },
      { jp: 'わかします (沸かします)', reading: 'wakashimasu', id: 'Mendidihkan (air)' },
      { jp: 'まぜます (混ぜます)', reading: 'mazemasu', id: 'Mencampur / mengaduk' },
      { jp: 'けいさんします (計算します)', reading: 'keisan shimasu', id: 'Menghitung matematika' },
      { jp: 'べんごし (弁護士)', reading: 'bengoshi', id: 'Pengacara / advokat' },
      { jp: 'アパート', reading: 'apaato', id: 'Apartemen' },
      { jp: 'ボーナス', reading: 'boonasu', id: 'Bonus kerja' }
    ]
  },
  {
    chapter: 43,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 43: Kelihatannya / Mau Terjadi (〜そうです: 様態)',
    theme: 'Kesan Visual Sepintas (Kelihatannya...) dan Tanda-Tanda Nyaris Terjadi',
    summary: 'Pola KK Stem / Kata Sifat tanpa i/na + sou desu (kelihatannya enak, sepertinya akan hujan, kancingnya mau copot). Menilai penampilan luar berdasarkan pengamatan visual.',
    grammarPatterns: [
      {
        id: 'm43-1',
        pattern: 'KK Stem / Sifat (buang i/na) + そうです (Kelihatannya...)',
        formula: 'KK (Stem) / I-Kei (-i) / Na-Kei + sou desu',
        explanation: 'Menyatakan dugaan spontan berdasarkan penampakan fisik luar saat itu.',
        examples: [
          { jp: '今にも 雨が 降りそうです。', reading: 'Ima ni mo ame ga furisou desu.', id: 'Kelihatannya sebentar lagi akan turun hujan.' },
          { jp: 'この ケーキは 美味しそうです。', reading: 'Kono keeki wa oishisou desu.', id: 'Kue ini kelihatannya enak sekali.' },
          { jp: 'ボタンが 外れそうです。', reading: 'Botan ga hazuresou desu.', id: 'Kancingnya kelihatannya mau lepas.' }
        ]
      },
      {
        id: 'm43-2',
        pattern: 'KK-te 来ます (Pergi Melakukan Lalu Kembali Lagi)',
        formula: 'KK [te-kei] + kimasu',
        explanation: 'Pergi sebentar untuk membeli/mengambil sesuatu lalu segera kembali ke tempat awal.',
        examples: [
          { jp: 'ちょっと たばこを 買って 来ます。', reading: 'Chotto tabako o katte kimasu.', id: 'Saya pergi sebentar beli rokok lalu balik lagi.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'ふえます [輸出が〜]', reading: 'fuemasu', id: 'Bertambah banyak [ekspor]' },
      { jp: 'へります [輸出が〜]', reading: 'herimasu', id: 'Berkurang [ekspor]' },
      { jp: 'あがります [値段が〜]', reading: 'agarimasu', id: 'Naik [harga]' },
      { jp: 'さがります [値段が〜]', reading: 'sagarimasu', id: 'Turun [harga]' },
      { jp: 'きれます [ひもが〜]', reading: 'kiremasu', id: 'Putus [tali]' },
      { jp: 'とれます [ボタンが〜]', reading: 'toremasu', id: 'Copot [kancing]' },
      { jp: 'おちます [荷物が〜]', reading: 'ochimasu', id: 'Jatuh [barang]' },
      { jp: 'なくなります [ガソリンが〜]', reading: 'nakunarimasu', id: 'Habis [bensin]' }
    ]
  },
  {
    chapter: 44,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 44: Berlebihan & Kemudahan Tindakan (〜すぎます・〜やすい・〜にくい)',
    theme: 'Melampaui Batas Normal (~sugimasu), Mudah Dilakukan (~yasui), dan Sulit/Rentan (~nikui)',
    summary: 'Pola KK Stem / Kata Sifat + sugimasu (terlalu banyak/berlebihan sehingga berdampak buruk), serta akhiran ~yasui (mudah digunakan/diminum) dan ~nikui (sukar dipahami/licin).',
    grammarPatterns: [
      {
        id: 'm44-1',
        pattern: 'KK Stem / Sifat + すぎます (Terlalu Berlebihan...)',
        formula: 'KK (Stem) / I-Kei (-i) / Na-Kei + sugimasu',
        explanation: 'Menyatakan bahwa suatu perbuatan atau kondisi melampaui batas kewajaran.',
        examples: [
          { jp: 'ゆうべ お酒を 飲みすぎました。', reading: 'Yuube osake o nomisugimashita.', id: 'Tadi malam saya terlalu banyak minum sake.' },
          { jp: 'この 問題は 難しすぎます。', reading: 'Kono mondai wa muzukashisugimasu.', id: 'Soal ini terlalu sulit.' }
        ]
      },
      {
        id: 'm44-2',
        pattern: 'KK Stem + やすいです / にくいです (Mudah / Sulit Dilakukan)',
        formula: 'KK (Stem masu) + yasui desu / nikui desu',
        explanation: 'Menyatakan kemudahan atau kesulitan karakteristik dari suatu benda/tindakan.',
        examples: [
          { jp: 'この 薬は 苦くなくて、飲みやすいです。', reading: 'Kono kusuri wa nigakunakute, nomiyasui desu.', id: 'Obat ini tidak pahit sehingga mudah diminum.' },
          { jp: '雨の 日は 事故が 起きやすいです。', reading: 'Ame no hi wa jiko ga okiyasui desu.', id: 'Pada hari hujan, kecelakaan mudah/rentan terjadi.' },
          { jp: '東京は 道が 狭くて、歩きにくいです。', reading: 'Toukyou wa michi ga semakute, arukinikui desu.', id: 'Di Tokyo jalannya sempit sehingga susah dilalui pejalan kaki.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'なきます (泣きます)', reading: 'nakimasu', id: 'Menangis' },
      { jp: 'わらいます (笑います)', reading: 'waraimasu', id: 'Tertawa / tersenyum' },
      { jp: 'かわきます (乾きます)', reading: 'kawakimasu', id: 'Kering' },
      { jp: 'ぬれます', reading: 'nuremasu', id: 'Basah' },
      { jp: 'すべります (滑ります)', reading: 'suberimasu', id: 'Tergelincir / licin' },
      { jp: 'おきます [事故が〜]', reading: 'okimasu', id: 'Terjadi [kecelakaan]' },
      { jp: 'ちょうせつします (調節します)', reading: 'chousetsu shimasu', id: 'Menyetel / menyesuaikan pengaturan' },
      { jp: 'あんぜん [な] (安全)', reading: 'anzen [na]', id: 'Aman' },
      { jp: 'きけん [な] (危険)', reading: 'kiken [na]', id: 'Berbahaya' }
    ]
  },
  {
    chapter: 45,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 45: Kasus Jikalau Terjadi Masalah (〜ばあいは・〜のに)',
    theme: 'Bila Mana Terjadi Kondisi Luar Biasa (~baai wa) dan Ironi Kontras (~noni: Padahal...)',
    summary: 'Pola Futsuukei + baai wa (dalam hal/kasus terjadi kecelakaan/bencana), serta pola kekecewaan emosi batin ~noni (padahal sudah belajar tapi gagal).',
    grammarPatterns: [
      {
        id: 'm45-1',
        pattern: 'Kalimat Biasa + 場合は、〜 (~ baai wa: Dalam Hal / Kasus Terjadi...)',
        formula: 'Futsuukei [Na-kei+na / KB+no] + baai wa',
        explanation: 'Petunjuk langkah antisipasi jika suatu kejadian darurat atau situasi tak terduga muncul.',
        examples: [
          { jp: '火事の 場合は、エレベーターを 使わないで ください。', reading: 'Kaji no baai wa, erebeetaa o tsukawanaide kudasai.', id: 'Dalam hal terjadi kebakaran, tolong jangan gunakan lift!' },
          { jp: '時間に 遅れる 場合は、連絡して ください。', reading: 'Jikan ni okureru baai wa, renraku shite kudasai.', id: 'Jika seandainya terlambat dari waktu yang ditentukan, tolong kabari ya.' }
        ]
      },
      {
        id: 'm45-2',
        pattern: 'Kalimat 1 (Biasa) + のに、Kalimat 2 (~ noni: Padahal...)',
        formula: 'Futsuukei [Na-kei+na / KB+na] + noni',
        explanation: 'Menyatakan kekecewaan, kejutan, atau rasa jengkel karena hasil yang terjadi bertolak belakang dengan harapan sewajarnya.',
        examples: [
          { jp: '一生懸命 勉強したのに、試験に 落ちました。', reading: 'Isshoukenmei benkyou shita noni, shiken ni ochimashita.', id: 'Padahal sudah belajar mati-matian, tetapi gagal dalam ujian.' },
          { jp: '約束したのに、彼は 来ませんでした。', reading: 'Yakusoku shita noni, kare wa kimasen deshita.', id: 'Padahal sudah berjanji, tetapi dia tidak datang.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'あやまります (謝ります)', reading: 'ayamarimasu', id: 'Meminta maaf' },
      { jp: 'あいます [事故に〜]', reading: 'aimasu', id: 'Mengalami [musibah kecelakaan]' },
      { jp: 'しんじます (信じます)', reading: 'shinjimasu', id: 'Mempercayai' },
      { jp: 'よういします (用意します)', reading: 'youi shimasu', id: 'Mempersiapkan perlengkapan' },
      { jp: 'キャンセルします', reading: 'kyanseru shimasu', id: 'Membatalkan' },
      { jp: 'うまく いきます', reading: 'umaku ikimasu', id: 'Berjalan dengan lancar' },
      { jp: 'かじ (火事)', reading: 'kaji', id: 'Kebakaran' },
      { jp: 'じょうきょう (状況)', reading: 'joukyou', id: 'Situasi keadaan' }
    ]
  },
  {
    chapter: 46,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 46: Tahapan Fase Waktu Terjadinya Peristiwa (〜ところ・〜ばかり・〜はず)',
    theme: 'Persis Mau Mulai, Tepat Sedang Berlangsung, Baru Saja Selesai, dan Keyakinan Logis (~hazu desu)',
    summary: 'Tiga fase waktu "tokoro": KK Kamus + tokoro (baru mau mulai), KK-te iru tokoro (tepat sedang di tengah-tengah jalan), KK-Ta tokoro (baru saja kelar semenit lalu). Serta KK-Ta bakari (baru saja) dan ~hazu desu (seharusnya pasti).',
    grammarPatterns: [
      {
        id: 'm46-1',
        pattern: 'Tiga Fase Tokoro (今から〜ところ / 今〜ているところ / たった今〜たところ)',
        formula: 'Jisho + tokoro (mau) | Te iru + tokoro (sedang) | Ta + tokoro (baru beres)',
        explanation: 'Menyatakan titik momen waktu yang sangat presisi.',
        examples: [
          { jp: '今から 会議が 始まる ところです。', reading: 'Ima kara kaigi ga hajimaru tokoro desu.', id: 'Rapat baru mau dimulai sekarang.' },
          { jp: '今 レポートを 書いている ところです。', reading: 'Ima repooto o kaite iru tokoro desu.', id: 'Sekarang saya tepat sedang di tengah-tengah menulis laporan.' },
          { jp: 'たった今 昼ご飯を 食べた ところです。', reading: 'Tatta ima hirugohan o tabeta tokoro desu.', id: 'Saya baru saja semenit lalu selesai makan siang.' }
        ]
      },
      {
        id: 'm46-2',
        pattern: 'KK bentuk-Ta + ばかりです (Baru Saja Terjadi)',
        formula: 'KK [ta-kei] + bakari desu',
        explanation: 'Secara psikologis pembicara merasa perbuatan tersebut masih sangat baru terjadi (meskipun hitungan hari/bulan lalu).',
        examples: [
          { jp: '先月 この 会社に 入った ばかりです。', reading: 'Sengetsu kono kaisha ni haitta bakari desu.', id: 'Saya baru saja masuk ke perusahaan ini bulan lalu.' }
        ]
      },
      {
        id: 'm46-3',
        pattern: 'Kalimat Biasa + はずです (Seharusnya Pasti...)',
        formula: 'Futsuukei [Na-kei+na / KB+no] + hazu desu',
        explanation: 'Menyatakan keyakinan kuat bahwa suatu hal pasti terjadi berdasarkan alasan atau bukti logis.',
        examples: [
          { jp: '田中さんは 今日 来る はずです。', reading: 'Tanaka-san wa kyou kuru hazu desu.', id: 'Tuan Tanaka seharusnya pasti datang hari ini.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'わたします (渡します)', reading: 'watashimasu', id: 'Menyerahkan langsung ke tangan' },
      { jp: 'かえってきます (帰って来ます)', reading: 'kaette kimasu', id: 'Kembali pulang ke sini' },
      { jp: 'でます [バスが〜]', reading: 'demasu', id: 'Berangkat [bus]' },
      { jp: 'とどきます [荷物が〜]', reading: 'todokimasu', id: 'Sampai [barang]' },
      { jp: 'たくはいびん (宅配便)', reading: 'takuhaibin', id: 'Jasa kurir pengiriman cepat ke rumah' },
      { jp: 'げんいん (原因)', reading: 'gen\'in', id: 'Penyebab / asal muasal' },
      { jp: 'たったいま (たった今)', reading: 'tatta ima', id: 'Baru saja saat ini juga' }
    ]
  },
  {
    chapter: 47,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 47: Kabar Angin Menurut Berita (〜そうです: 伝聞 & 〜ようです: Dugaan)',
    theme: 'Kabar Angin Desas-desus (~sou desu) dan Dugaan Berdasarkan Bukti Nyata (~you desu)',
    summary: 'Menyampaikan informasi yang didengar dari berita atau orang lain (Bentuk Biasa + sou desu: kabarnya/katanya). Serta menduga berdasarkan fakta visual/suara di lokasi (~you desu: tampaknya).',
    grammarPatterns: [
      {
        id: 'm47-1',
        pattern: 'Bentuk Biasa (Futsuukei) + そうです (Kabarnya / Katanya Menurut Berita)',
        formula: 'Kalimat [Futsuukei Utuh] + sou desu',
        explanation: 'Mengutip kabar angin atau informasi dari sumber berita tanpa perubahan bentuk kata benda/sifat.',
        examples: [
          { jp: '天気予報に よると、明日は 寒くなる そうです。', reading: 'Tenki yohou ni yoru to, ashita wa samuku naru sou desu.', id: 'Berdasarkan ramalan cuaca, kabarnya besok akan bertambah dingin.' },
          { jp: 'ミラーさんは 来月 国へ 帰る そうです。', reading: 'Miraa-san wa raigetsu kuni e kaeru sou desu.', id: 'Katanya Tuan Miller bulan depan akan kembali ke negaranya.' }
        ]
      },
      {
        id: 'm47-2',
        pattern: '〜ようです (Tampaknya / Kelihatannya seperti...)',
        formula: 'Futsuukei [Na-kei+na / KB+no] + you desu',
        explanation: 'Menyatakan kesimpulan dugaan logis setelah melihat, mendengar, atau mencium bukti nyata.',
        examples: [
          { jp: '外に 人が たくさん 集まっています。事故が あった ようです。', reading: 'Soto ni hito ga takusan atsumatte imasu. Jiko ga atta you desu.', id: 'Di luar banyak orang berkerumun. Tampaknya telah terjadi kecelakaan.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'あつまります (集まります)', reading: 'atsumarimasu', id: 'Berkumpul' },
      { jp: 'わかれます (別れます)', reading: 'wakaremasu', id: 'Berpisah' },
      { jp: 'します [音が〜 / 味が〜 / においが〜]', reading: 'shimasu', id: 'Berbau / berasa / berbunyi' },
      { jp: 'きびしい (厳しい)', reading: 'kibishii', id: 'Tegas / keras disiplin' },
      { jp: 'じっけん (実験)', reading: 'jikken', id: 'Eksperimen percobaan' },
      { jp: 'データ', reading: 'deeta', id: 'Data' },
      { jp: 'じのう (人口)', reading: 'jinkou', id: 'Populasi penduduk' },
      { jp: 'ぶっか (物価)', reading: 'bukka', id: 'Harga kebutuhan pokok' }
    ]
  },
  {
    chapter: 48,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 48: Bentuk Kausatif / Menyuruh & Mengizinkan (使役形 Shiekikei: 〜せる・〜させる)',
    theme: 'Konjugasi Bentuk Kausatif (Shiekikei): Memerintahkan Bawahan / Memberikan Izin',
    summary: 'Konjugasi kata kerja kausatif (G1: a + seru; G2: ~saseru; G3: kosaseru / saseru). Digunakan oleh atasan/orang tua menyuruh bawahan/anak, serta pola sopan meminta izin untuk diri sendiri (~sasete kudasai).',
    grammarPatterns: [
      {
        id: 'm48-1',
        pattern: 'Bentuk Kausatif (使役形 Shiekikei: Menyuruh Melakukan)',
        formula: 'Atasan/Orang tua [wa] Bawahan/Anak [ni/o] KK [shieki-kei]',
        explanation: 'Menyuruh orang lain melakukan sesuatu atau mengizinkan anak berbuat sesuatu.',
        examples: [
          { jp: '部長は 山田さんを 大阪へ 出張させました。', reading: 'Buchou wa Yamada-san o Oosaka e shucchou sasemashita.', id: 'Kepala bagian menugaskan Sdr. Yamada dinas ke Osaka.' },
          { jp: '母は 子供に 部屋を 掃除させました。', reading: 'Haha wa kodomo ni heya o souji sasemashita.', id: 'Ibu menyuruh anak membersihkan kamar.' }
        ]
      },
      {
        id: 'm48-2',
        pattern: 'KK bentuk Kausatif-Te + いただけませんか (Izinkanlah Saya Melakukan...)',
        formula: 'KK [shieki-kei] + te itadakemasen ka',
        explanation: 'Permohonan izin diri sendiri yang sangat santun di tempat kerja.',
        examples: [
          { jp: '気分が 悪いので、早く 帰らせて いただけませんか。', reading: 'Kibun ga warui node, hayaku kaerasete itadakemasen ka.', id: 'Berhubung badan saya kurang fit, sudikah Anda mengizinkan saya pulang lebih awal?' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'おろします (下ろします)', reading: 'oroshimasu', id: 'Menurunkan barang' },
      { jp: 'とどけます (届けます)', reading: 'todokemasu', id: 'Mengantarkan paket sampai tujuan' },
      { jp: 'せわをします (世話をします)', reading: 'sewa o shimasu', id: 'Merawat / mengurus' },
      { jp: 'いや [な]', reading: 'iya [na]', id: 'Enggan / tidak mau' },
      { jp: 'じゅく (塾)', reading: 'juku', id: 'Bimbel / les privat luar sekolah' },
      { jp: 'スケジュール', reading: 'sukejuuru', id: 'Jadwal kerja' }
    ]
  },
  {
    chapter: 49,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 49: Bahasa Hormat Menghargai Lawan Bicara (尊敬語 Sonkeigo)',
    theme: 'Tata Bahasa Keigo Bagian 1: Sonkeigo (Meninggikan Derajat Orang Lain / Atasan / Tamu)',
    summary: 'Mempelajari bentuk penghormatan tinggi Sonkeigo: kata kerja khusus (irassharu, ossharu, nasaru, meshiagaru, goran ni naru), pola reguler o + KK Stem + ni narimasu, serta permohonan santun o + KK Stem + kudasai.',
    grammarPatterns: [
      {
        id: 'm49-1',
        pattern: 'Kata Kerja Khusus Sonkeigo (尊敬語)',
        formula: 'Irassharu (iku/kuru/iru) | Ossharu (iu) | Nasaru (suru) | Meshiagaru (taberu/nomu) | Goran ni naru (miru)',
        explanation: 'Kata kerja pengganti khusus untuk menghormati perbuatan yang dilakukan oleh atasan atau tamu.',
        examples: [
          { jp: '社長は もう お帰りに なりました。', reading: 'Shachou wa mou okaeri ni narimashita.', id: 'Bapak Direktur sudah pulang.' },
          { jp: '何を 召し上がりますか。', reading: 'Nani o meshiagarimasu ka.', id: 'Bapak/Ibu berkenan makan apa?' }
        ]
      },
      {
        id: 'm49-2',
        pattern: 'お + KK Stem + ください (Permohonan Santun Resmi)',
        formula: 'o + KK (Stem masu) + kudasai',
        explanation: 'Cara sopan resmi meminta tamu melakukan sesuatu (misalnya di hotel, bank, toko).',
        examples: [
          { jp: 'こちらに お名前を お書き ください。', reading: 'Kochira ni onamae o okaki kudasai.', id: 'Silakan berkenan menulis nama di sebelah sini.' },
          { jp: '少々 お待ち ください。', reading: 'Shoushou omachi kudasai.', id: 'Mohon berkenan menunggu sebentar.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'いらっしゃいます', reading: 'irasshaimasu', id: 'Pergi / datang / ada (Sonkeigo)' },
      { jp: 'おっしゃいます', reading: 'osshaimasu', id: 'Berkata (Sonkeigo dari iimasu)' },
      { jp: 'なさいます', reading: 'nasaimasu', id: 'Melakukan (Sonkeigo dari shimasu)' },
      { jp: 'めしあがります (召し上がります)', reading: 'meshiagarimasu', id: 'Makan / minum (Sonkeigo)' },
      { jp: 'ごらんになります (ご覧になります)', reading: 'goran ni narimasu', id: 'Melihat (Sonkeigo dari mimasu)' },
      { jp: 'ごぞんじです (ご存じです)', reading: 'gozonji desu', id: 'Mengetahui (Sonkeigo dari shitte imasu)' },
      { jp: 'あいさつ (挨拶)', reading: 'aisatsu', id: 'Salam tegur sapa' }
    ]
  },
  {
    chapter: 50,
    level: 'N4',
    part: 'Shokyu II (N4)',
    title: 'Bab 50: Bahasa Merendah Diri (謙譲語 Kenjougo) [Tamat Shokyu II Bab 50!]',
    theme: 'Tata Bahasa Keigo Bagian 2: Kenjougo (Merendahkan Tindakan Diri Sendiri di Depan Tamu/Atasan)',
    summary: 'Puncak Minna no Nihongo (Bab 50). Mempelajari Kenjougo: kata kerja khusus merendah (mairimasu, orimasu, moushimasu, itashimasu, itadakimasu, haikenshimasu) dan rumus o + KK Stem + shimasu. Lengkap menguasai percakapan bisnis dan standar JLPT N4!',
    grammarPatterns: [
      {
        id: 'm50-1',
        pattern: 'Kata Kerja Khusus Kenjougo (謙譲語)',
        formula: 'Mairimasu (iku/kuru) | Orimasu (iru) | Itashimasu (suru) | Moushimasu (iu) | Haikenshimasu (miru)',
        explanation: 'Merendahkan tindakan diri sendiri atau keluarga saat berbicara di hadapan klien, tamu, atau orang luar.',
        examples: [
          { jp: 'マイク・ミラーと 申します。アメリカから 参りました。', reading: 'Maiku Miraa to moushimasu. Amerika kara mairimashita.', id: 'Nama saya Mike Miller. Saya datang dari Amerika (sopan merendah).' },
          { jp: '明日 １０時に そちらへ 伺います。', reading: 'Ashita juu-ji ni sochira e伺います(ukagaimasu).', id: 'Besok jam 10 saya akan berkunjung ke tempat Anda.' }
        ]
      },
      {
        id: 'm50-2',
        pattern: 'お + KK Stem + します / ご + Kata Benda Kango + します (Merendah Membantu Orang)',
        formula: 'o + KK Stem + shimasu / go + Kango + shimasu',
        explanation: 'Melakukan tindakan yang melibatkan atau membantu orang lain dengan sikap rendah hati.',
        examples: [
          { jp: '荷物を お持ち しましょうか。', reading: 'Nimotsu o omochi shimashou ka.', id: 'Bolehkah saya bawakan barang bawaan Anda? (santun bisnis)' },
          { jp: '今日の スケジュールを ご案内 いたします。', reading: 'Kyou no sukejuuru o goannai itashimasu.', id: 'Saya akan memandu jadwal hari ini.' }
        ]
      }
    ],
    keyVocab: [
      { jp: 'まいります (参ります)', reading: 'mairimasu', id: 'Pergi / datang (Kenjougo)' },
      { jp: 'おります', reading: 'orimasu', id: 'Ada (Kenjougo dari imasu)' },
      { jp: 'いただきます', reading: 'itadakimasu', id: 'Makan / minum / menerima (Kenjougo)' },
      { jp: 'もうします (申します)', reading: 'moushimasu', id: 'Bernama / berkata (Kenjougo)' },
      { jp: 'いたします', reading: 'itashimasu', id: 'Melakukan (Kenjougo dari shimasu)' },
      { jp: 'はいけんします (拝見します)', reading: 'haikenshimasu', id: 'Melihat (Kenjougo dari mimasu)' },
      { jp: 'ぞんじます (存じます)', reading: 'zonjimasu', id: 'Mengetahui (Kenjougo)' },
      { jp: 'うかがいます (伺います)', reading: 'ukagaimasu', id: 'Bertanya / berkunjung ke rumah (Kenjougo)' },
      { jp: 'おめにかかります (お目にかかります)', reading: 'ome ni kakarimasu', id: 'Bertemu langsung dengan orang terhormat' },
      { jp: 'ごちそうします', reading: 'gochisou shimasu', id: 'Mentraktir jamuan makan' }
    ],
    dialogue: {
      title: '心から 感謝いたします (Terima Kasih Dari Lubuk Hati)',
      lines: [
        { speaker: 'Miller', jp: '社長、今まで 本当に お世話に なりました。心から 感謝いたします。', reading: 'Shachou, ima made hontou ni osewa ni narimashita. Kokoro kara kansha itashimasu.', id: 'Bapak Direktur, hingga saat ini saya sangat berterima kasih atas semua bimbingan dan bantuan Bapak. Saya menghaturkan terima kasih yang sedalam-dalamnya.' },
        { speaker: 'Shachou', jp: 'ミラー君、よく 頑張って くれたね。新しい 職場でも 活躍を 祈って いるよ。', reading: 'Miraa-kun, yoku ganbatte kureta ne. Atarashii shokuba demo katsuyaku o inotte iru yo.', id: 'Saudara Miller, kamu telah berjuang dengan sangat baik. Di tempat kerja yang baru pun, saya mendoakan kesuksesanmu selalu.' },
        { speaker: 'Miller', jp: 'はい、精一杯 努めて まいります。本当に ありがとうございました。', reading: 'Hai, seiippai tsutomete mairimasu. Hontou ni arigatou gozaimashita.', id: 'Baik, saya akan berusaha sekuat tenaga saya. Terima kasih banyak atas segalanya.' }
      ]
    }
  }
];
