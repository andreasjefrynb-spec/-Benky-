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
  }
];
