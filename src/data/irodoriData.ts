import { IrodoriCanDoItem } from '../types';

export const irodoriTopics: IrodoriCanDoItem[] = [
  // --- STARTER (A1) ---
  {
    id: 'iro-a1-1',
    topic: '1. 私のこと (Tentang Diri Saya)',
    lesson: 'Bab 1 & 2',
    level: 'Starter (A1)',
    canDo: 'Mampu memperkenalkan diri secara singkat (nama, asal negara, pekerjaan) dan menyapa orang di tempat kerja atau lingkungan sekitar.',
    targetExpression: 'はじめまして。〜です。どうぞ よろしく お願いします。',
    keyPhrases: [
      { jp: 'はじめまして。', reading: 'Hajimemashite.', id: 'Senang berkenalan dengan Anda.' },
      { jp: 'インドネシアから 来ました。', reading: 'Indoneshia kara kimashita.', id: 'Saya datang dari Indonesia.' },
      { jp: 'どうぞ よろしく お願いします。', reading: 'Douzo yoroshiku onegai shimasu.', id: 'Mohon bimbingan dan kerja samanya.' },
      { jp: 'お仕事は 何ですか。', reading: 'O-shigoto wa nan desu ka.', id: 'Pekerjaan Anda apa?' },
      { jp: '介護の 仕事を しています。', reading: 'Kaigo no shigoto o shite imasu.', id: 'Saya bekerja di bidang perawat lansia (caregiver).' }
    ],
    tips: 'Di Jepang, saat membungkuk (ojigi) bersamaan dengan mengucapkan "Yoroshiku onegai shimasu", bungkukkan badan sekitar 15-30 derajat dengan tatapan sopan.',
    dialogue: [
      { speaker: 'A', jp: 'はじめまして。リキです。インドネシアから 来ました。', reading: 'Hajimemashite. Riki desu. Indoneshia kara kimashita.', id: 'Perkenalkan, saya Riki. Datang dari Indonesia.' },
      { speaker: 'B', jp: 'リキさんですね。田中です。よろしくお願いします。', reading: 'Riki-san desu ne. Tanaka desu. Yoroshiku onegai shimasu.', id: 'Sdr. Riki ya. Saya Tanaka. Mohon kerja samanya.' }
    ]
  },
  {
    id: 'iro-a1-2',
    topic: '2. 好きな食べ物・食事 (Makanan Kesukaan & Makan Bersama)',
    lesson: 'Bab 3 & 4',
    level: 'Starter (A1)',
    canDo: 'Mampu memesan makanan di kedai makan/restoran dan menyampaikan makanan yang disukai serta pantangan (halal, alergi).',
    targetExpression: '〜を ください。/ 〜は 食べられません。',
    keyPhrases: [
      { jp: 'すみません、注文 お願いします。', reading: 'Sumimasen, chuumon onegai shimasu.', id: 'Permisi, tolong mau pesan makanan.' },
      { jp: 'ラーメンを 一つ ください。', reading: 'Raamen o hitotsu kudasai.', id: 'Minta ramen satu mangkuk.' },
      { jp: '豚肉は 入っていますか。', reading: 'Butaniku wa haitte imasu ka.', id: 'Apakah ini mengandung daging babi?' },
      { jp: '宗教の 理由で 豚肉は 食べられません。', reading: 'Shuukyou no riyuu de butaniku wa taberaremasen.', id: 'Karena alasan agama, saya tidak bisa makan daging babi.' },
      { jp: 'ごちそうさまでした。', reading: 'Gochisousama deshita.', id: 'Terima kasih atas hidangan makanannya.' }
    ],
    tips: 'Banyak restoran di Jepang menyediakan tombol panggil (yobidashi botan) di meja. Untuk makanan halal atau alergi, tunjukkan kartu penjelasan makanan jika kesulitan berbicara.',
    dialogue: [
      { speaker: 'Pelayan', jp: 'ご注文は お決まりですか。', reading: 'Go-chuumon wa okimari desu ka.', id: 'Apakah pesanannya sudah siap?' },
      { speaker: 'Tamu', jp: 'はい。鶏肉の うどんを お願いします。豚肉は 抜きに できますか。', reading: 'Hai. Toriniku no udon o onegai shimasu. Butaniku wa nuki ni dekimasu ka.', id: 'Ya. Minta udon ayam. Bisakah tanpa daging babi?' },
      { speaker: 'Pelayan', jp: 'かしこまりました。', reading: 'Kashikomarimashita.', id: 'Dimengerti dengan baik.' }
    ]
  },
  {
    id: 'iro-a1-3',
    topic: '3. 家と暮らし (Rumah & Kehidupan Sehari-hari)',
    lesson: 'Bab 5 & 6',
    level: 'Starter (A1)',
    canDo: 'Mampu menceritakan tipe tempat tinggal di Jepang dan fasilitas atau perabotan yang ada di kamar.',
    targetExpression: '部屋に 〜が あります。/ 近くに 〜が あります。',
    keyPhrases: [
      { jp: 'どんな アパートに 住んでいますか。', reading: 'Donna apaato ni sunde imasu ka.', id: 'Tinggal di apartemen seperti apa?' },
      { jp: '駅から 歩いて １０分です。', reading: 'Eki kara aruite juppun desu.', id: '10 menit jalan kaki dari stasiun.' },
      { jp: '近くに コンビニが あって 便利です。', reading: 'Chikaku ni konbini ga atte benri desu.', id: 'Di dekat rumah ada minimarket jadi sangat praktis.' },
      { jp: 'エアコンが 壊れました。', reading: 'Eakon ga kowaremashita.', id: 'AC kamarnya rusak.' }
    ],
    tips: 'Perhatikan tata tertib apartemen di Jepang: jangan membuat kebisingan di atas jam 9 malam dan patuhi aturan pemilahan sampah.',
    dialogue: [
      { speaker: 'A', jp: '今の 部屋は どうですか。', reading: 'Ima no heya wa dou desu ka.', id: 'Bagaimana kamar tinggalmu sekarang?' },
      { speaker: 'B', jp: '静かで いいですよ。スーパーも 近いです。', reading: 'Shizuka de ii desu yo. Suupaa mo chikai desu.', id: 'Tenang dan enak lho. Supermarket juga dekat.' }
    ]
  },
  {
    id: 'iro-a1-4',
    topic: '4. 毎日の生活と時間 (Rutinitas Sehari-hari & Waktu)',
    lesson: 'Bab 7 & 8',
    level: 'Starter (A1)',
    canDo: 'Mampu menjelaskan jadwal jam kerja dan kegiatan rutin dari bangun pagi hingga malam hari.',
    targetExpression: '毎朝 〜時に 起きます。/ 〜時から 〜時まで 働きます。',
    keyPhrases: [
      { jp: '毎朝 ６時に 起きます。', reading: 'Maiasa roku-ji ni okimasu.', id: 'Setiap pagi bangun jam 6.' },
      { jp: '仕事は ８時半から ５時までです。', reading: 'Shigoto wa hachiji-han kara go-ji made desu.', id: 'Kerja dari jam 8.30 sampai jam 5.' },
      { jp: '残業は ありますか。', reading: 'Zangyou wa arimasu ka.', id: 'Apakah ada lembur?' },
      { jp: '今日は １時間 残業を します。', reading: 'Kyou wa ichi-jikan zangyou o shimasu.', id: 'Hari ini lembur 1 jam.' }
    ],
    tips: 'Ketepatan waktu (jikan genshu) adalah prinsip mutlak di dunia kerja Jepang. Disarankan tiba di lokasi kerja 10-15 menit sebelum jam kerja resmi dimulai.',
    dialogue: [
      { speaker: 'A', jp: 'いつも 何時に 会社へ 行きますか。', reading: 'Itsumo nan-ji ni kaisha e ikimasu ka.', id: 'Biasanya jam berapa berangkat ke kantor/pabrik?' },
      { speaker: 'B', jp: '７時４０分に 寮を 出ます。自転車で １５分です。', reading: 'Shichiji yonjuppun ni ryou o demasu. Jitensha de juugo-fun desu.', id: 'Jam 7.40 keluar asrama. Naik sepeda 15 menit.' }
    ]
  },
  {
    id: 'iro-a1-5',
    topic: '5. 買い物とレジ (Belanja & Transaksi Kasir)',
    lesson: 'Bab 9 & 10',
    level: 'Starter (A1)',
    canDo: 'Mampu berbelanja di minimarket/supermarket dan menanggapi pertanyaan staf kasir.',
    targetExpression: '袋は いりません。/ ポイントカードは ありません。',
    keyPhrases: [
      { jp: 'レジ袋は ご利用ですか。', reading: 'Rejibukuro wa go-riyou desu ka.', id: 'Apakah membutuhkan kantong plastik belanja?' },
      { jp: '大丈夫です。結構です。', reading: 'Daijoubu desu. Kekkou desu.', id: 'Tidak usah, terima kasih (punya kantong sendiri).' },
      { jp: '温めますか。', reading: 'Atatamemasu ka.', id: 'Apakah mau dihangatkan? (makanan bento)' },
      { jp: 'はい、お願いします。', reading: 'Hai, onegai shimasu.', id: 'Ya, tolong dihangatkan.' },
      { jp: '支払いは 現金ですか、キャッシュレスですか。', reading: 'Shiharai wa genkin desu ka, kyasshuresu desu ka.', id: 'Pembayarannya tunai atau cashless/kartu?' }
    ],
    tips: 'Kantong plastik di kasir Jepang berbayar (3-5 yen). Bawa selalu tas belanja lipat (ekobag) untuk menghemat pengeluaran.',
    dialogue: [
      { speaker: 'Kasir', jp: 'いらっしゃいませ。お弁当 温めますか。', reading: 'Irasshaimase. O-bentou atatamemasu ka.', id: 'Selamat datang. Bentou-nya mau dihangatkan?' },
      { speaker: 'Pembeli', jp: 'お願いします。お箸も 一本 ください。', reading: 'Onegai shimasu. Ohashi mo ippon kudasai.', id: 'Tolong ya. Minta sumpitnya juga satu pasang.' }
    ]
  },

  // --- SHOKYU 1 (A2.1) ---
  {
    id: 'iro-a2-1',
    topic: '6. 道案内と交通 (Petunjuk Jalan & Naik Angkutan Umum)',
    lesson: 'Shokyu 1 Bab 1 & 2',
    level: 'Shokyu 1 (A2)',
    canDo: 'Mampu menanyakan stasiun, peron transit, dan cara menggunakan kartu IC / membeli tiket kereta.',
    targetExpression: '〜へ 行きたいんですが、どう 行けば いいですか。',
    keyPhrases: [
      { jp: 'すみません、この 電車は 新宿に 止まりますか。', reading: 'Sumimasen, kono densha wa Shinjuku ni tomarimasu ka.', id: 'Permisi, apakah kereta ini berhenti di Shinjuku?' },
      { jp: '何番線から 出ますか。', reading: 'Nan-bansen kara demasu ka.', id: 'Berangkat dari jalur/peron berapa?' },
      { jp: 'ICカードに チャージしたいんですが。', reading: 'Aishii kaado ni chaaji shitai n desu ga.', id: 'Saya ingin isi saldo kartu IC (Suica/Pasmo).' },
      { jp: '次の 角を 右に 曲がって ください。', reading: 'Tsugi no kado o migi ni magatte kudasai.', id: 'Tolong belok ke kanan di tikungan berikutnya.' }
    ],
    tips: 'Kartu IC (Suica, Pasmo, Icoca) bisa dipakai naik kereta, bus, serta belanja di minimarket dan mesin penjual otomatis.',
    dialogue: [
      { speaker: 'A', jp: 'すみません、東京駅へ 行くには どの 電車ですか。', reading: 'Sumimasen, Toukyou-eki e iku ni wa dono densha desu ka.', id: 'Permisi, untuk ke stasiun Tokyo naik kereta yang mana ya?' },
      { speaker: 'Petugas', jp: '２番線の 快速に 乗って ください。', reading: 'Ni-bansen no kaisoku ni notte kudasai.', id: 'Silakan naik kereta cepat Kaisoku di peron nomor 2.' }
    ]
  },
  {
    id: 'iro-a2-2',
    topic: '7. 職場での指示と確認 (Instruksi & Konfirmasi di Tempat Kerja)',
    lesson: 'Shokyu 1 Bab 3 & 4',
    level: 'Shokyu 1 (A2)',
    canDo: 'Mampu menerima arahan instruksi kerja dari supervisor, meminta diulang jika belum jelas, dan melapor saat pekerjaan selesai.',
    targetExpression: 'わかりました。/ もう一度 言って いただけませんか。',
    keyPhrases: [
      { jp: 'この 箱を 倉庫に 運んで ください。', reading: 'Kono hako o souko ni hakonde kudasai.', id: 'Tolong bawa kotak ini ke gudang.' },
      { jp: 'すみません、もう 一度 お願いします。', reading: 'Sumimasen, mou ichido onegai shimasu.', id: 'Maaf, tolong ulangi sekali lagi.' },
      { jp: '終わりました。次は何を すれば いいですか。', reading: 'Owarimashita. Tsugi wa nani o sureba ii desu ka.', id: 'Sudah selesai. Selanjutnya apa yang harus saya kerjakan?' },
      { jp: '確認して もらえますか。', reading: 'Kakunin shite moraemasu ka.', id: 'Bisakah tolong dicek konfirmasi?' }
    ],
    tips: 'Prinsip kerja Jepang menekankan "Hou-Ren-So" (Houkoku: lapor, Renraku: kabari, Soudan: konsultasi). Jangan menduga-duga jika belum yakin.',
    dialogue: [
      { speaker: 'Leader', jp: 'リキさん、この 部品を １０個ずつ 数えて 袋に 入れて。', reading: 'Riki-san, kono buhin o jukko zutsu kazoete fukuro ni irete.', id: 'Riki, tolong hitung sparepart ini per 10 buah lalu masukkan ke kantong.' },
      { speaker: 'Riki', jp: 'はい、１０個ずつですね。かしこまりました。', reading: 'Hai, jukko zutsu desu ne. Kashikomarimashita.', id: 'Baik, per 10 buah ya. Siap dipahami!' }
    ]
  },
  {
    id: 'iro-a2-3',
    topic: '8. 病院と体調不良 (Rumah Sakit & Menjelaskan Gejala Sakit)',
    lesson: 'Shokyu 1 Bab 7 & 8',
    level: 'Shokyu 1 (A2)',
    canDo: 'Mampu mendaftar di klinik/rumah sakit dan menjelaskan gejala sakit (demam, sakit perut, mual, alergi obat).',
    targetExpression: '昨日から 熱が あって、喉が 痛いです。',
    keyPhrases: [
      { jp: '保険証は お持ちですか。', reading: 'Hokenshou wa omochi desu ka.', id: 'Apakah membawa kartu asuransi kesehatan (Hokensho)?' },
      { jp: '頭が ズキズキ 痛みます。', reading: 'Atama ga zukizuki itamimasu.', id: 'Kepala terasa sakit berdenyut-denyut.' },
      { jp: 'お腹を 壊して 下痢を しています。', reading: 'Onaka o kowashite geri o shite imasu.', id: 'Perut bermasalah dan mengalami diare.' },
      { jp: '食後に この 薬を 飲んで ください。', reading: 'Shokugo ni kono kusuri o nonde kudasai.', id: 'Minum obat ini sesudah makan.' }
    ],
    tips: 'Di Jepang, berobat wajib menunjukkan kartu asuransi kesehatan (Kokumin Kenkou Hoken atau Shakai Hoken), biaya yang ditanggung pasien hanya 30%.',
    dialogue: [
      { speaker: 'Dokter', jp: 'どうされましたか。', reading: 'Dou saremashita ka.', id: 'Ada keluhan apa?' },
      { speaker: 'Pasien', jp: '昨日の 夜から ３８度の 熱が あって、咳が 止まりません。', reading: 'Kinou no yoru kara sanjuuhachi-do no netsu ga atte, seki ga tomarimasen.', id: 'Sejak kemarin malam demam 38 derajat, dan batuknya tidak berhenti.' }
    ]
  },
  {
    id: 'iro-a2-4',
    topic: '9. ごみの分別と地域ルール (Pemilahan Sampah & Aturan Lingkungan)',
    lesson: 'Shokyu 1 Bab 11 & 12',
    level: 'Shokyu 1 (A2)',
    canDo: 'Mampu membedakan jenis sampah rumah tangga dan membuang pada hari serta jam yang ditentukan kelurahan.',
    targetExpression: '燃えるごみは 何曜日に 出しますか。',
    keyPhrases: [
      { jp: 'もえるごみ (燃えるごみ)', reading: 'moeru gomi', id: 'Sampah yang bisa dibakar (organik/kertas)' },
      { jp: 'もえないごみ (燃えないごみ)', reading: 'moenai gomi', id: 'Sampah tidak bisa dibakar (kaca/keramik/besi)' },
      { jp: 'しげんごみ (資源ごみ)', reading: 'shigen gomi', id: 'Sampah daur ulang (botol PET, kaleng, kardus)' },
      { jp: 'ペットボトルは ラベルを はがして 洗って 出します。', reading: 'Pettobotoru wa raberu o hagashite aratte dashimasu.', id: 'Botol PET dilepas labelnya, dicuci bersih, baru dibuang.' },
      { jp: '粗大ごみは 事前に 申し込みが 必要です。', reading: 'Sodai gomi wa jizen ni moushikomi ga hitsuyou desu.', id: 'Sampah barang besar (kasur/kulkas) butuh pendaftaran kupon dulu.' }
    ],
    tips: 'Jepang sangat ketat soal sampah. Sampah harus dimasukkan ke kantong resmi daerah dan ditaruh di titik kumpul sebelum jam 8 pagi.',
    dialogue: [
      { speaker: 'A', jp: 'すみません、プラスチックは 燃えるごみですか。', reading: 'Sumimasen, purasuchikku wa moeru gomi desu ka.', id: 'Permisi, apakah plastik termasuk sampah yang bisa dibakar?' },
      { speaker: 'Tetangga', jp: 'この 地域では プラごみの 日に 出して くださいね。水曜日ですよ。', reading: 'Kono chiiki dewa pura-gomi no hi ni dashite kudasai ne. Suiyoubi desu yo.', id: 'Di daerah ini dibuang pada hari sampah plastik ya. Hari Rabu lho.' }
    ]
  },

  // --- SHOKYU 2 (A2.2) ---
  {
    id: 'iro-a2-5',
    topic: '10. 防災と緊急時の対応 (Kesiapsiagaan Bencana & Tanggap Darurat)',
    lesson: 'Shokyu 2 Bab 5 & 6',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu memahami peringatan darurat gempa/tsunami/taifun, memeriksa titik evakuasi (hinanjo), dan melaporkan keselamatan.',
    targetExpression: '地震の ときは、頭を 守って 避難してください。',
    keyPhrases: [
      { jp: '緊急地震速報 (きんきゅう じしん そくほう)', reading: 'kinkyuu jishin sokuhou', id: 'Peringatan dini gempa darurat' },
      { jp: '揺れが 収まるまで 机の 下に 入ってください。', reading: 'Yure ga osamaru made tsukue no shita ni haitte kudasai.', id: 'Masuklah ke bawah meja sampai goncangan mereda.' },
      { jp: '避難所 (ひなんじょ) は どこですか。', reading: 'Hinanjo wa doko desu ka.', id: 'Tempat posko pengungsian evakuasi di mana?' },
      { jp: '安否確認 (あんぴ かくにん)', reading: 'anpi kakunin', id: 'Konfirmasi keselamatan diri' },
      { jp: '怪我は ありません。無事です。', reading: 'Kega wa arimasen. Buji desu.', id: 'Tidak ada luka. Saya selamat aman.' }
    ],
    tips: 'Saat alarm gempa berbunyi di ponsel, utamakan melindungi kepala. Jangan langsung lari ke luar ruangan karena bahaya tertimpa genteng/kaca.',
    dialogue: [
      { speaker: 'Sirene', jp: '地震です！頭を 守ってください！', reading: 'Jishin desu! Atama o mamotte kudasai!', id: 'Gempa bumi! Lindungi kepala Anda!' },
      { speaker: 'Staf', jp: '火を 消して、非常口の ドアを 開けてください！', reading: 'Hi o keshite, hijouguchi no doa o akete kudasai!', id: 'Matikan kompor api, dan buka pintu darurat!' }
    ]
  },
  {
    id: 'iro-a2-6',
    topic: '11. 休暇・早退の連絡と相談 (Izin Cuti, Sakit & Pulang Cepat)',
    lesson: 'Shokyu 2 Bab 9 & 10',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu menghubungi supervisor kantor melalui telepon atau pesan saat sakit mendadak atau ingin mengambil cuti berbayar (Yukyu).',
    targetExpression: '熱が あるので、今日 休ませて いただけないでしょうか。',
    keyPhrases: [
      { jp: 'お忙しいところ 恐れ入ります。', reading: 'O-isogashii tokoro osoreirimasu.', id: 'Mohon maaf mengganggu waktu sibuk Bapak/Ibu.' },
      { jp: '体調を 崩してしまい、受診したいと 思います。', reading: 'Taichou o kuzushite shimai, jushin shitai to omoimasu.', id: 'Kondisi badan saya drop, saya bermaksud periksa ke dokter.' },
      { jp: '有給休暇 (ゆうきゅう きゅうか) を 取りたいんですが。', reading: 'Yuukyuu kyuuka o toritai n desu ga.', id: 'Saya ingin mengambil cuti tahunan berbayar.' },
      { jp: '引き継ぎは 田中さんに お願いして あります。', reading: 'Hikitsugi wa Tanaka-san ni onegai shite arimasu.', id: 'Serah terima tugas sudah saya titipkan kepada Tanaka-san.' }
    ],
    tips: 'Jika sakit tidak bisa masuk kerja, hubungi atasan sebelum jam kerja dimulai (misal 15-30 menit sebelum jam 8 pagi). Jangan hanya menghilang tanpa kabar.',
    dialogue: [
      { speaker: 'Karyawan', jp: 'おはようございます。リキです。今朝から 高い熱が ありまして、本日 お休みを いただいても よろしいでしょうか。', reading: 'Ohayou gozaimasu. Riki desu. Kesa kara takai netsu ga arimashite, honjitsu o-yasumi o itadaite mo yoroshii deshou ka.', id: 'Selamat pagi. Saya Riki. Sejak pagi demam tinggi, bolehkah hari ini saya izin istirahat tidak masuk?' },
      { speaker: 'Atasan', jp: '大丈夫？病院へ 行って、無理しないで ゆっくり 休んでね。', reading: 'Daijoubu? Byouin e itte, muri shinaide yukkuri yasunde ne.', id: 'Kamu tidak apa-apa? Pergilah ke dokter, jangan dipaksakan dan istirahatlah yang cukup ya.' }
    ]
  },
  {
    id: 'iro-a2-7',
    topic: '12. 役所・手続き・在留資格 (Balai Kota, Administrasi & Visa Tinggal)',
    lesson: 'Shokyu 2 Bab 15 & 16',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu mengurus administrasi di kantor balai kota (Shiyakusho/Kuyakusho): pendaftaran alamat (Juminhyo), My Number Card, dan asuransi.',
    targetExpression: '住所変更の 手続きを したいんですが、どの 窓口ですか。',
    keyPhrases: [
      { jp: '市役所 / 区役所 (しやくしょ / くやくしょ)', reading: 'shiyakusho / kuyakusho', id: 'Kantor Balai Kota / Kantor Kecamatan' },
      { jp: '在留カード (ざいりゅう カード)', reading: 'zairyuu kaado', id: 'Kartu Izin Tinggal (Residence Card)' },
      { jp: '住民票 (じゅうみんひょう) を 取りたいです。', reading: 'Juuminhyou o toritai desu.', id: 'Saya ingin mengurus surat bukti kependudukan (Juminhyo).' },
      { jp: '引っ越したので、転入届を 出します。', reading: 'Hikkoshita node, tennyuutodoke o dashimasu.', id: 'Karena pindah rumah, saya menyerahkan formulir lapor pindah datang.' },
      { jp: '申請書に 記入して 印鑑または サインを ください。', reading: 'Shinseisho ni kinyuu shite inkan matawa sain o kudasai.', id: 'Silakan isi formulir lalu bubuhkan cap stempel atau tanda tangan.' }
    ],
    tips: 'Warga asing yang pindah tempat tinggal wajib melapor ke balai kota dalam waktu 14 hari sejak tanggal kepindahan dengan membawa kartu Zairyu Card.',
    dialogue: [
      { speaker: 'Pemohon', jp: '引越しの 手続きを したいんですが、申請書は これで いいですか。', reading: 'Hikkoshi no tetsuzuki o shitai n desu ga, shinseisho wa kore de ii desu ka.', id: 'Saya mau urus prosedur pindah alamat, apakah formulirnya sudah benar ini?' },
      { speaker: 'Petugas', jp: 'はい、在留カードと 前の 市の 転出証明書を 見せて ください。', reading: 'Hai, zairyuu kaado to mae no shi no tenshutsu shoumeisho o misete kudasai.', id: 'Ya, tolong perlihatkan Zairyu Card dan surat pindah keluar dari kota sebelumnya.' }
    ]
  },
  {
    id: 'iro-a2-8',
    topic: '13. 郵便・荷物の受け取りと発送 (Layanan Pos, Pengiriman Paket & Takkyubin)',
    lesson: 'Shokyu 2 Bab 11 & 12',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu mengirim surat tercatat/paket di kantor pos, mengisi slip alamat (Denpyo), serta menjadwalkan pengantaran ulang saat menerima slip panggilan kurir (Fuzaihyo).',
    targetExpression: '不在票が 入っていたので、再配達を お願いしたいんですが。',
    keyPhrases: [
      { jp: '郵便局 (ゆうびんきょく)', reading: 'yuubinkyoku', id: 'Kantor pos' },
      { jp: '不在連絡票 (ふざい れんらくひょう)', reading: 'fuzai renrakuhyou', id: 'Slip pemberitahuan kurir saat penerima tidak ada di rumah' },
      { jp: '再配達 (さいはいたつ) を お願いします。', reading: 'Saihaitatsu o onegai shimasu.', id: 'Tolong jadwalkan pengantaran ulang paket.' },
      { jp: '送り状 / 伝票 (でんぴょう) に 住所を 書いてください。', reading: 'Okurijou / denpyou ni juusho o kaite kudasai.', id: 'Tolong tulis alamat pada slip pengiriman barang.' },
      { jp: '割れ物注意 (われもの ちゅうい)', reading: 'waremono chuui', id: 'Awas barang mudah pecah (fragile)' },
      { jp: '配達希望時間は ありますか。', reading: 'Haitatsu kibou jikan wa arimasu ka.', id: 'Apakah ada jam pengantaran yang diinginkan?' }
    ],
    tips: 'Jika ada slip Fuzaihyo di kotak surat, scan QR code di kertas tersebut atau telepon nomor otomatis untuk memilih waktu pengantaran (pagi, siang, atau malam 19:00-21:00).',
    dialogue: [
      { speaker: 'Warga', jp: 'すみません、不在連絡票が 入っていました。今日の 夜 ７時以降に 再配達できますか。', reading: 'Sumimasen, fuzai renrakuhyou ga haitte imashita. Kyou no yoru shichiji ikou ni saihaitatsu dekimasu ka.', id: 'Permisi, ada slip fuzaihyo di kotak pos saya. Apakah bisa dikirim ulang malam ini di atas jam 7?' },
      { speaker: 'Kurir', jp: 'かしこまりました。伝票番号と お名前を お願いします。', reading: 'Kashikomarimashita. Denpyou bangou to o-namae o onegai shimasu.', id: 'Baik dimengerti. Mohon sebutkan nomor resi dan nama Anda.' }
    ]
  },
  {
    id: 'iro-a2-9',
    topic: '14. 銀行・ATM・海外送金 (Perbankan, ATM & Pengiriman Uang)',
    lesson: 'Shokyu 2 Bab 13 & 14',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu menggunakan mesin ATM Jepang (tarik, setor, transfer/Furikomi), membuka rekening tabungan bank, dan melakukan pengiriman uang remitansi ke tanah air.',
    targetExpression: 'キャッシュカードで お金を 引き出したいんですが、どう 操作しますか。',
    keyPhrases: [
      { jp: '口座開設 (こうざ かいせつ)', reading: 'kouza kaisetsu', id: 'Pembukaan buku rekening bank' },
      { jp: '暗証番号 (あんしょう ばんごう)', reading: 'anshou bangou', id: 'Nomor PIN 4 angka kartu ATM' },
      { jp: 'お引き出し (おひきだし)', reading: 'o-hikidashi', id: 'Tarik tunai uang' },
      { jp: 'お預け入れ (おあずけいれ)', reading: 'o-azukeire', id: 'Setor tunai uang' },
      { jp: 'お振込み (おふりこみ)', reading: 'o-furikomi', id: 'Transfer dana antar rekening' },
      { jp: '海外送金 (かいがい そうきん)', reading: 'kaigai soukin', id: 'Remitansi kirim uang ke luar negeri / Indonesia' },
      { jp: '手数料 (てすうりょう) は いくらですか。', reading: 'Tesuuryou wa ikura desu ka.', id: 'Berapa biaya admin transaksinya?' }
    ],
    tips: 'ATM di minimarket Jepang (Seven Bank, Lawson Bank) biasanya memiliki opsi bahasa Inggris dan Indonesia. Simpan kartu dan buku tabungan (Tsuuchou) di tempat aman terpisah.',
    dialogue: [
      { speaker: 'Nasabah', jp: '給料が 入ったので、インドネシアの 家族に 送金したいんですが。', reading: 'Kyuuryou ga haitta node, Indoneshia no kazoku ni soukin shitai n desu ga.', id: 'Gaji sudah masuk, saya ingin mengirim uang ke keluarga di Indonesia.' },
      { speaker: 'Staf Bank', jp: '送金アプリまたは 送金カードを お持ちですか。窓口でも お手伝いできますよ。', reading: 'Soukin apuri matawa soukin kaado o omochi desu ka. Madoguchi demo o-tetsudai dekimasu yo.', id: 'Apakah membawa aplikasi remitansi atau kartu transfer luar negeri? Di loket juga bisa kami bantu.' }
    ]
  },
  {
    id: 'iro-a2-10',
    topic: '15. 職場での相談・ホウレンソウ (Konsultasi Kerja & Etika Hou-Ren-So)',
    lesson: 'Shokyu 2 Bab 17 & 18',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu berkonsultasi mengenai hambatan kerja, melaporkan insiden keselamatan, serta meminta izin saat menghadapi kendala teknis.',
    targetExpression: '今、少し お時間 よろしいでしょうか。ご相談したい ことが あります。',
    keyPhrases: [
      { jp: '今、お時間 よろしいでしょうか。', reading: 'Ima, o-jikan yoroshii deshou ka.', id: 'Apakah sekarang Bapak/Ibu ada waktu sebentar? (permisi sopan)' },
      { jp: '作業中に 機械が 止まってしまいました。', reading: 'Sagyou-chuu ni kikai ga tomatte shimaimashita.', id: 'Saat sedang bekerja, mesinnya mendadak berhenti beroperasi.' },
      { jp: 'やり方を 教えて いただけませんか。', reading: 'Yarikata o oshiete itadakemasen ka.', id: 'Sudikah Bapak/Ibu mengajarkan cara pengerjaannya kepada saya?' },
      { jp: '私の ミスで ご迷惑を おかけして 申し訳ありません。', reading: 'Watashi no misu de go-meiwaku o okake shite moushiwake arimasen.', id: 'Mohon maaf yang sebesar-besarnya atas kesalahan saya yang merepotkan.' },
      { jp: '再発防止に 努めます。', reading: 'Saihatsu boushi ni tsutomemasu.', id: 'Saya akan berusaha keras agar kesalahan ini tidak terulang kembali.' }
    ],
    tips: 'Di lingkungan kerja Jepang, jangan menyembunyikan kesalahan (shippai o kakusanai). Laporkan segera saat masalah masih kecil agar atasan dapat membantu jalan keluarnya.',
    dialogue: [
      { speaker: 'Karyawan', jp: '主任、今 ちょっと よろしいでしょうか。部品の 数が 合わないので、確認して いただきたいです。', reading: 'Shunin, ima chotto yoroshii deshou ka. Buhin no kazu ga awanai node, kakunin shite itadakitai desu.', id: 'Ketua seksi, apakah ada waktu sebentar? Karena jumlah komponen tidak pas, mohon berkenan memeriksanya.' },
      { speaker: 'Atasan', jp: 'うん、どれどれ？すぐ 見てみよう。早く 相談してくれて ありがとう。', reading: 'Un, doredore? Sugu mite miyou. Hayaku soudan shite kurete arigatou.', id: 'Ya, coba kita lihat. Langsung kita periksa. Terima kasih sudah lekas berkonsultasi.' }
    ]
  },
  {
    id: 'iro-a2-11',
    topic: '16. 飲み会・食事会・断り方 (Etika Pesta Makan & Cara Menolak Sopan)',
    lesson: 'Shokyu 2 Bab 19 & 20',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu berbaur dalam pesta santai pergaulan kantor (Nomikai / Shinjin Kangeikai), dan mampu menolak ajakan secara halus tanpa menyinggung perasaan lawan bicara.',
    targetExpression: 'せっかくですが、その日は 先約が ありまして...。また 誘ってください。',
    keyPhrases: [
      { jp: 'お疲れ様です！乾杯！(かんぱい！)', reading: 'Otsukaresama desu! Kanpai!', id: 'Terima kasih atas kerja kerasnya! Bersulang (Cheers)!' },
      { jp: 'ビールを もう一杯 いかがですか。', reading: 'Biiru o mou ippai ikaga desu ka.', id: 'Bagaimana kalau tambah satu gelas bir lagi?' },
      { jp: 'お酒は 飲めないので、烏龍茶を お願いします。', reading: 'O-sake wa nomenai node, uuroncha o onegai shimasu.', id: 'Karena saya tidak minum alkohol, tolong teh oolong saja.' },
      { jp: '今日は どうも ごちそうさまでした。', reading: 'Kyou wa doumo gochisousama deshita.', id: 'Terima kasih banyak atas traktiran makanannya hari ini.' },
      { jp: 'あいにく 先約が ありまして...。', reading: 'Ainiku sen\'yaku ga arimashite...', id: 'Sayang sekali saya sudah ada janji terlebih dahulu sebelumnya...' }
    ],
    tips: 'Dalam budaya Jepang, menolak dengan kata "Iie" langsung dianggap terlalu kaku. Gunakan "Chotto tsugou ga warukute..." (kebetulan waktunya kurang pas) atau "Sekkaku desu ga..." agar terdengar santun.',
    dialogue: [
      { speaker: 'Senior', jp: '今週の 金曜日の 夜、みんなで 焼肉 行かない？', reading: 'Konshuu no kin\'youbi no yoru, minna de yakiniku ikanai?', id: 'Jumat malam minggu ini, mau ikut pergi makan yakiniku bersama semuanya?' },
      { speaker: 'Junior', jp: '誘って いただき ありがとうございます。あいにく その日は 予定が ありまして...。また 次回 ぜひ お願いします！', reading: 'Sasotte itadaki arigatou gozaimasu. Ainiku sono hi wa yotei ga arimashite... Mata jikai zehi onegai shimasu!', id: 'Terima kasih banyak atas ajakannya. Sayang sekali hari itu saya sudah ada jadwal... Lain kali tolong ajak saya lagi ya!' }
    ]
  },
  {
    id: 'iro-a2-12',
    topic: '17. 不動産・アパート契約と設備 (Kontrak Sewa & Mengatasi Gangguan Kamar)',
    lesson: 'Shokyu 2 Bab 21 & 22',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu berkomunikasi dengan pemilik rumah (Ooya-san) atau agen properti mengenai kerusakan fasilitas (air panas mati, kebocoran, tetangga berisik).',
    targetExpression: 'お風呂の お湯が 出なくなってしまったんですが、見てもらえませんか。',
    keyPhrases: [
      { jp: '大家さん (おおやさん)', reading: 'ooyasan', id: 'Pemilik rumah sewa / induk semang apartemen' },
      { jp: '管理会社 (かんり がいしゃ)', reading: 'kanri gaisha', id: 'Perusahaan pengelola gedung apartemen' },
      { jp: 'お湯が 出ません / 給湯器 (きゅうとうき) が 故障しました。', reading: 'O-yu ga demasen / kyuutouki ga koushou shimashita.', id: 'Air panas tidak keluar / pemanas air water heater rusak.' },
      { jp: '水道から 水漏れ (みずもれ) しています。', reading: 'Suidou kara mizumore shite imasu.', id: 'Kran pipa air mengalami kebocoran air.' },
      { jp: '上の 部屋の 音が うるさいです。', reading: 'Ue no heya no oto ga urusai desu.', id: 'Suara hentakan dari kamar lantai atas berisik.' },
      { jp: '鍵を 失くしてしまいました。', reading: 'Kagi o nakushite shimaimashita.', id: 'Kunci pintu apartemen saya hilang terjatuh.' }
    ],
    tips: 'Jika terjadi masalah fasilitas kamar (keran bocor, water heater rusak), hubungi Kanri Gaisha (perusahaan pengelola) yang tertera di kontrak sewa. Jangan memperbaikinya sendiri jika bisa merusak properti.',
    dialogue: [
      { speaker: 'Penyewa', jp: '２０３号室の リキです。昨日から お風呂の お湯が 出ないのですが、点検して いただけますか。', reading: 'Ni-maru-san goushitsu no Riki desu. Kinou kara o-furo no o-yu ga denai no desu ga, tenken shite itadakemasu ka.', id: 'Saya Riki dari kamar 203. Sejak kemarin air panas kamar mandi tidak keluar, bisakah tolong dilakukan pemeriksaan?' },
      { speaker: 'Pengelola', jp: 'ご不便を おかけして すみません。今日の 午後 ２時に 業者を 手配しますね。', reading: 'Go-fuben o okake shite sumimasen. Kyou no gogo ni-ji ni gyousha o tehai shimasu ne.', id: 'Mohon maaf atas ketidaknyamanannya. Hari ini jam 2 siang akan kami tugaskan teknisi ke sana ya.' }
    ]
  },
  {
    id: 'iro-a2-13',
    topic: '18. 冠婚葬祭と日本の年中行事 (Etika Sosial, Perayaan & Hari Besar Jepang)',
    lesson: 'Shokyu 2 Bab 23 & 24',
    level: 'Shokyu 2 (A2)',
    canDo: 'Mampu memahami tradisi perayaan Jepang (Oshougatsu, Obon, Hanami) serta etika ucapan selamat pernikahan atau belasungkawa duka cita.',
    targetExpression: 'あけまして おめでとうございます。/ この度は ご愁傷様でございます。',
    keyPhrases: [
      { jp: 'あけましておめでとうございます。', reading: 'Akemashite omedetou gozaimasu.', id: 'Selamat Tahun Baru (diucapkan setelah 1 Januari).' },
      { jp: '良い お年を お迎えください。(よい おとしを)', reading: 'Yoi o-toshi o o-mukae kudasai.', id: 'Semoga menyambut tahun baru yang menyenangkan (diucapkan akhir Desember).' },
      { jp: 'ご結婚 おめでとうございます。(ごけっこん)', reading: 'Go-kekkon omedetou gozaimasu.', id: 'Selamat atas pernikahan berbahagia.' },
      { jp: 'この度は ご愁傷様でございます。(ごしゅうしょうさま)', reading: 'Kono tabi wa go-shuushousama de gozaimasu.', id: 'Turut berbelasungkawa duka cita yang sedalam-dalamnya.' },
      { jp: 'お中元 (おちゅうげん) / お歳暮 (おせいぼ)', reading: 'ochuugen / oseibo', id: 'Tradisi bingkisan hadiah ucapan terima kasih musim panas / akhir tahun' },
      { jp: 'お花見 (おはなみ)', reading: 'ohanami', id: 'Tradisi piknik berkumpul menikmati mekarnya bunga sakura' }
    ],
    tips: 'Pada acara pernikahan (Kekkonshiki), gunakan uang kertas baru yang licin tanpa lipatan di dalam amplop Shugi-bukuro. Sebaliknya, pada pemakaman gunakan uang kertas yang tidak licin di dalam amplop Koden-bukuro.',
    dialogue: [
      { speaker: 'A', jp: 'もうすぐ 年末ですね。今年も 一年間 大変 お世話に なりました。', reading: 'Mousugu nenmatsu desu ne. Kotoshi mo ichinenkan taihen osewa ni narimashita.', id: 'Sudah hampir akhir tahun ya. Terima kasih banyak atas semua bimbingan dan bantuannya sepanjang tahun ini.' },
      { speaker: 'B', jp: 'こちらこそ、ありがとう。良い お年を お迎えくださいね。', reading: 'Kochira koso, arigatou. Yoi o-toshi o o-mukae kudasai ne.', id: 'Sama-sama, terima kasih kembali. Selamat menyambut tahun baru dengan bahagia ya.' }
    ]
  }
];
