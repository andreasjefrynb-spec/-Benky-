import { QuartetLesson } from '../types';

export const quartetLessons: QuartetLesson[] = [
  // VOLUME 1 (Lessons 1-3, N3)
  {
    volume: 1,
    lesson: 1,
    level: 'N3',
    titleJp: '人と人とのつながり',
    titleRomaji: 'Hito to Hito to no Tsunagari',
    titleId: 'Pelajaran 1: Ikatan & Jaringan Relasi Antar Manusia',
    theme: 'Menjalin Relasi, Lingkungan Baru, dan Kesan Pertama',
    readingSkill: {
      title: '新しい環境でのコミュニケーション (Komunikasi di Lingkungan Baru)',
      passageJp: '新学期や入社など、新しい環境に飛び込むとき、誰もが緊張を覚えます。しかし、相手の目を見て明るく挨拶を交わすだけで、心の壁は驚くほど簡単に崩れます。相手に関心を持ち、小さな共通点を見つけることが良い関係作りの第一歩です。',
      passageReading: 'Shingakki ya nyuusha nado, atarashii kankyou ni tobikomu toki, daremo ga kinchou o oboemasu. Shikashi, aite no me o mite akaruku aisatsu o kawasu dake de, kokoro no kabe wa odoroku hodo kantan ni kuzu remasu. Aite ni kanshin o mochi, chiisana kyoutsuuten o mitsukeru koto ga yoi kankei-zukuri no daiippo desu.',
      passageId: 'Saat memasuki lingkungan baru seperti semester baru atau masuk kantor baru, siapa pun akan merasa tegang. Namun, hanya dengan menatap mata lawan bicara dan bertukar salam ceria, dinding pemisah batin dapat runtuh dengan sangat mudah. Menaruh perhatian pada orang lain dan menemukan titik temu kecil adalah langkah perdana membina hubungan baik.',
      strategyTip: 'Temukan ide pokok (トピック文) di awal paragraf dan kata kunci transisi seperti「しかし」(namun).'
    },
    writingSkill: {
      taskName: '自己紹介と抱負の作文 (Menulis Profil Diri & Harapan)',
      prompt: 'Tulis esai perkenalan diri formal (200-300 karakter) yang memuat latar belakang, alasan belajar bahasa Jepang, dan target masa depan.',
      modelEssayJp: '私はインドネシア出身のアンドレアスと申します。大学でITを専攻しており、日本の先進技術に興味を持ったことをきっかけに日本語の勉強を始めました。将来は日系企業でエンジニアとして活躍したいと考えております。どうぞよろしくお願いいたします。',
      modelEssayReading: 'Watashi wa Indoneshia shusshin no Andoreasu to moushimasu. Daigaku de IT o senkou shite ori, Nihon no senshin gijutsu ni kyoumi o motta koto o kikkake ni nihongo no benkyou o hajimemashita. Shourai wa nikkei kigyou de enjinia to shite katsuyaku shitai to kangaete orimasu. Douzo yoroshiku onegai itashimasu.',
      modelEssayId: 'Nama saya Andreas, berasal dari Indonesia. Saya mengambil jurusan IT di universitas, dan mulai belajar bahasa Jepang bermula dari ketertarikan pada teknologi mutakhir Jepang. Di masa depan saya berencana berkiprah sebagai insinyur di perusahaan Jepang. Mohon bimbingan dan kerja samanya.',
      usefulConnectors: ['〜をきっかけに (bermula dari)', '〜専攻しており (mengambil jurusan)', '〜と考えております (berencana)']
    },
    speakingSkill: {
      situation: 'Mengajak rekan baru mengobrol saat jam istirahat makan siang',
      goal: 'Menanyakan hobi dan mencari topik pembicaraan bersama secara santun',
      dialogue: [
        { speaker: 'A', jp: 'あのう、お隣よろしいですか。', reading: 'Anou, otonari yoroshii desu ka.', id: 'Permisi, apakah boleh saya duduk di sebelah sini?' },
        { speaker: 'B', jp: 'あ、どうぞどうぞ！ここ空いてますよ。', reading: 'A, douzo douzo! Koko aitemasu yo.', id: 'Ah, silakan silakan! Di sini kosong kok.' },
        { speaker: 'A', jp: 'ありがとうございます。美味しそうなお弁当ですね。ご自分で作られたんですか。', reading: 'Arigatou gozaimasu. Oishisou na obentou desu ne. Gojibun de tsukurareta n desu ka.', id: 'Terima kasih. Bekal bento yang kelihatannya sangat lezat ya. Apakah Anda masak sendiri?' }
      ],
      keyExpressions: ['お隣よろしいですか (Boleh duduk di sebelah?)', '〜美味しそうですね (Kelihatannya enak ya)']
    },
    listeningSkill: {
      situation: 'Dua orang mahasiswa membicarakan kegiatan klub kampus',
      scriptJp: '男：ねえ、放課後のサークル、どこに入るかもう決めた？ 女：まだ迷ってるの。写真部も楽しそうだし、ボランティアサークルにも興味があって。 男：へえ、写真部なら活動は週1回だから両立できるんじゃない？',
      scriptReading: 'Otoko: Nee, houkago no saakuru, doko ni hairu ka mou kimeta? Onna: Mada mayotteru no. Shashinbu mo tanoshisou dashi, borantia saakuru ni mo kyoumi ga atte. Otoko: Hee, shashinbu nara katsudou wa shuu ikkai dakara ryouritsu dekiru n janai?',
      scriptId: 'Pria: Hei, klub sepulang kuliah, kamu sudah memutuskan mau masuk mana? Wanita: Masih bimbang nih. Klub fotografi kelihatannya seru, tapi aku juga tertarik klub relawan. Pria: Ooh, kalau klub fotografi kegiatannya seminggu sekali, jadi bisa dijalani bersamaan kan?',
      comprehensionCheck: 'Wanita merasa bimbang karena apa?',
      correctAnswer: 'Tertarik pada dua klub (fotografi dan relawan) sekaligus.'
    },
    grammarPatterns: [
      {
        id: 'qt1-1',
        pattern: '〜をきっかけに（して） (~ o kikkake ni shite)',
        formula: 'Kata Benda / Kata Kerja Bentuk Ta + のをきっかけに',
        explanation: 'Menyatakan peristiwa pemicu awal yang mendorong dimulainya suatu aksi atau perubahan penting.',
        examples: [
          {
            jp: '日本のアニメを見たことをきっかけに、日本語を学び始めた。',
            reading: 'Nihon no anime o mita koto o kikkake ni, nihongo o manabihajimeta.',
            id: 'Bermula dari menonton anime Jepang, saya mulai belajar bahasa Jepang.'
          }
        ]
      }
    ]
  },
  {
    volume: 1,
    lesson: 2,
    level: 'N3',
    titleJp: '言葉とコミュニケーション',
    titleRomaji: 'Kotoba to Komyunikeeshon',
    titleId: 'Pelajaran 2: Bahasa & Dinamika Komunikasi',
    theme: 'Bahasa Tubuh, Nuansa Bicara, dan Kesalahpahaman Bahasa',
    readingSkill: {
      title: '言葉の裏にある「本音」と「建前」 (Makna Tersembunyi: Honne dan Tatemae)',
      passageJp: '日本のコミュニケーションでは、相手を傷つけないための配慮として「建前」が使われることがよくあります。「前向きに検討します」という言葉は、文字通りの承諾ではなく、やんわりとした断りを意味する場合もあるため注意が必要です。',
      passageReading: 'Nihon no komyunikeeshon de wa, aite o kizutsukenai tame no hairyo to shite "tatemae" ga tsukawareru koto ga yoku arimasu. "Maemuki ni kentou shimasu" to iu kotoba wa, mojidoori no shoudaku de wa naku, yanwari to shita kotowari o imi suru baai mo aru tame chuui ga hitsuyou desu.',
      passageId: 'Dalam komunikasi di Jepang, "tatemae" (tutur kata formal diplomatis) kerap dipakai demi menjaga perasaan lawan bicara. Ungkapan "kami akan mempertimbangkan secara positif" sering kali bukan persetujuan harfiah, melainkan penolakan halus yang patut dicermati.',
      strategyTip: 'Pahami konteks budaya di balik ungkapan eufemisme bisnis.'
    },
    writingSkill: {
      taskName: '異文化での失敗談 (Menulis Pengalaman Kesalahpahaman Budaya)',
      prompt: 'Tuliskan pengalaman ketika Anda salah memahami bahasa tubuh atau ungkapan tersirat dalam bahasa Jepang.',
      modelEssayJp: '初めて日本人の友人の家を訪れたとき、「お茶でもいかがですか」と勧められ、遠慮せずに何杯も飲んでしまいました。後でそれが「そろそろ帰る時間」という合図だったと知り、赤面しました。',
      modelEssayReading: 'Hajimete Nihonjin no yuujin no ie o otozureta toki, "ocha demo ikaga desu ka" to susumerare, enryo sezu ni nanhai mo nonde shimaimashita. Ato de sore ga "sorosoro kaeru jikan" to iu aizu datta to shiri, sekimen shimashita.',
      modelEssayId: 'Saat pertama kali bertamu ke rumah teman orang Jepang, saya ditawari teh dan tanpa sungkan meminumnya berulang kali. Belakangan saya baru tahu bahwa itu adalah isyarat halus penanda waktu pulang, dan saya merasa sangat malu.',
      usefulConnectors: ['〜と知り (mengetahui bahwa)', '遠慮せずに (tanpa sungkan)']
    },
    speakingSkill: {
      situation: 'Menolak ajakan rekan secara halus tanpa merusak suasana',
      goal: 'Menyampaikan alasan dan menawarkan kesempatan lain',
      dialogue: [
        { speaker: 'A', jp: '今夜、みんなで飲みに行くんだけど、一緒に行かない？', reading: 'Konya, minna de nomi ni iku n dakedo, issho ni ikanai?', id: 'Malam ini kami mau pergi minum bareng, mau ikut tidak?' },
        { speaker: 'B', jp: '誘ってくれてありがとう！すごく行きたいんだけど、あいにくレポートの締め切りが今日中で…次回はぜひ誘って！', reading: 'Sasotte kurete arigatou! Sugoku ikitai n dakedo, ainiku repooto no shimekiri ga kyoujuu de... Jikai wa zehi sasotte!', id: 'Terima kasih sudah mengajak! Ingin sekali ikut, tapi sayangnya ada batas pengumpulan laporan hari ini... Lain kali tolong ajak aku lagi ya!' }
      ],
      keyExpressions: ['あいにく〜で (sayang sekali karena...)', '次回はぜひ (lain kali pasti ikut)']
    },
    listeningSkill: {
      situation: 'Percakapan di kantor mengenai jadwal rapat',
      scriptJp: '課長：佐藤さん、明日の企画会議だけど、開始を1時間遅らせることは可能かな？ 佐藤：はい、他部署との調整がつきますので、11時開始に変更いたします。',
      scriptReading: 'Kachou: Satou-san, ashita no kikaku kaigi dakedo, kaishi o ichijikan okuraseru koto wa kanou kana? Satou: Hai, tabusho to no chousei ga tsukimasu node, juuichiji kaishi ni henkou itashimasu.',
      scriptId: 'Kepala Seksi: Sato, mengenai rapat perencanaan besok, apakah memungkinkan jika dimundurkan satu jam? Sato: Baik, karena koordinasi dengan divisi lain memungkinkan, saya ubah mulai pukul 11.',
      comprehensionCheck: 'Kapan rapat perencanaan besok akan dimulai?',
      correctAnswer: 'Pukul 11:00 (mundur 1 jam).'
    },
    grammarPatterns: [
      {
        id: 'qt2-1',
        pattern: '〜わりに（は） (~ wari ni wa)',
        formula: 'Bentuk Biasa / KB + の + わりに',
        explanation: 'Kontras antara fakta dan ekspektasi wajar yang seharusnya melekat.',
        examples: [
          {
            jp: '彼は日本に来てまだ半年なのに、そのわりには発音がとてもきれいだ。',
            reading: 'Kare wa Nihon ni kite mada hantoshi na noni, sono wari ni wa hatsuon ga totemo kirei da.',
            id: 'Padahal dia baru setengah tahun di Jepang, tapi untuk ukuran itu pelafalannya sangat bagus.'
          }
        ]
      }
    ]
  },
  {
    volume: 1,
    lesson: 3,
    level: 'N3',
    titleJp: '暮らしと環境',
    titleRomaji: 'Kurashi to Kankyou',
    titleId: 'Pelajaran 3: Kehidupan Harian & Kelestarian Lingkungan',
    theme: 'Pilah Sampah, Energi Terbarukan, dan Gaya Hidup Ramah Bumi',
    readingSkill: {
      title: '日本のゴミ分別システム (Sistem Pemilahan Sampah Jepang)',
      passageJp: '日本の自治体では、燃えるゴミ、燃えないゴミ、資源ゴミなど、細かな分別ルールが定められています。最初は複雑に感じられますが、資源の再利用と環境保全への意識を高める重要な習慣です。',
      passageReading: 'Nihon no jichitai de wa, moeru gomi, moenai gomi, shigen gomi nado, komakana bunbetsu ruuru ga sadamerarete imasu. Saisho wa fukuzatsu ni kanjiraremasu ga, shigen no sai-riyou to kankyou hozen e no ishiki o takameru juuyou na shuukan desu.',
      passageId: 'Di pemerintah daerah Jepang, ditetapkan aturan pemilahan sampah yang sangat terperinci seperti sampah mudah terbakar, sampah anorganik, dan sampah daur ulang. Awalnya terasa rumit, namun ini adalah kebiasaan krusial demi daur ulang dan kesadaran lingkungan.',
      strategyTip: 'Perhatikan klasifikasi kategori dan contoh rincian.'
    },
    writingSkill: {
      taskName: '環境のためにできること (Esai Upaya Nyata untuk Bumi)',
      prompt: 'Tulis esai tentang apa yang Anda lakukan dalam kehidupan sehari-hari untuk mengurangi sampah plastik.',
      modelEssayJp: '私はプラスチックゴミを減らすため、常にマイバッグと水筒を持ち歩くようにしています。また、過剰な包装を断ることも心がけています。一人ひとりの小さな行動が地球を守る大きな力になると信じています。',
      modelEssayReading: 'Watashi wa purasuchikku gomi o herasu tame, tsuneni maibaggu to suitou o mochiaruku you ni shite imasu. Mata, kajou na housou o kotowaru koto mo kokorogakete imasu. Hitorihitori no chiisana koudou ga chikyuu o mamoru ookina chikara ni naru to shinjite imasu.',
      modelEssayId: 'Demi mengurangi sampah plastik, saya selalu membiasakan membawa tas belanja pribadi dan botol minum. Saya juga selalu mengusahakan menolak kemasan berlebihan. Saya percaya tindakan kecil tiap orang akan jadi kekuatan besar melindungi bumi.',
      usefulConnectors: ['〜を減らすため (demi mengurangi)', '〜を心がけています (senantiasa mengusahakan)']
    },
    speakingSkill: {
      situation: 'Bertanya kepada tetangga tentang jadwal buang sampah',
      goal: 'Mengetahui hari pengumpulan sampah botol kaca dan kaleng',
      dialogue: [
        { speaker: 'A', jp: 'すみません、缶やビンのゴミの日は何曜日でしょうか。', reading: 'Sumimasen, kan ya bin no gomi no hi wa nanyoubi deshou ka.', id: 'Permisi, hari pengumpulan sampah kaleng dan botol kaca hari apa ya?' },
        { speaker: 'B', jp: 'ビンと缶は毎週水曜日の朝8時までに出すことになってますよ。', reading: 'Bin to kan wa maishuu suiyoubi no asa hachiji made ni dasu koto ni nattemasu yo.', id: 'Botol dan kaleng aturannya ditaruh sebelum jam 8 pagi setiap hari Rabu lho.' }
      ],
      keyExpressions: ['〜は何曜日でしょうか (Hari apa ya?)', '〜までに出すことになってます (Aturannya dikeluarkan sebelum...)']
    },
    listeningSkill: {
      situation: 'Pengumuman suara di lingkungan perumahan',
      scriptJp: 'アナウンス：地域の皆様にお知らせします。明日は資源ゴミの回収日です。ペットボトルはキャップとラベルを外して潰してからお出しください。',
      scriptReading: 'Anaunsu: Chiiki no minasama ni oshirase shimasu. Ashita wa shigen gomi no kaishuubi desu. Pettobotoru wa kyappu to raberu o hazushite tsubushite kara odashi kudasai.',
      scriptId: 'Pengumuman: Pemberitahuan bagi seluruh warga. Besok adalah hari pengumpulan sampah daur ulang. Untuk botol plastik, lepaskan tutup dan labelnya lalu pipihkan sebelum ditaruh.',
      comprehensionCheck: 'Apa yang harus dilakukan pada botol plastik sebelum dibuang?',
      correctAnswer: 'Melepas tutup & label serta memipihkannya.'
    },
    grammarPatterns: [
      {
        id: 'qt3-1',
        pattern: '〜ことになっている (~ koto ni natte iru)',
        formula: 'Kata Kerja Kamus / Nai + ことになっている',
        explanation: 'Menyatakan regulasi, jadwal, atau aturan sosial yang sudah baku ditetapkan.',
        examples: [
          {
            jp: 'このアパートではペットを飼ってはいけないことになっている。',
            reading: 'Kono apaato de wa petto o katte wa ikenai koto ni natte iru.',
            id: 'Di apartemen ini sudah menjadi aturan bahwa dilarang memelihara hewan peliharaan.'
          }
        ]
      }
    ]
  },
  {
    volume: 1,
    lesson: 4,
    level: 'N3',
    titleJp: '言葉とコミュニケーション',
    titleRomaji: 'Kotoba to Komyunikeeshon',
    titleId: 'Pelajaran 4: Bahasa & Seni Komunikasi Antar Budaya',
    theme: 'Nuansa Kata, Bahasa Tubuh (Aizuchi), dan Menghindari Miskomunikasi',
    readingSkill: {
      title: 'あいづちと相手への思いやり (Aizuchi dan Empati pada Lawan Bicara)',
      passageJp: '日本語の会話では、「はい」「ええ」「なるほど」「そうですか」といった「あいづち」が頻繁に使われます。これは単に相手の話を聞いているという合図だけでなく、「あなたの話に共感していますよ」という温かい関心を伝える重要な役割を果たしています。',
      passageReading: 'Nihongo no kaiwa de wa, "hai", "ee", "naruhodo", "sou desu ka" to itta "aizuchi" ga hinpan ni tsukawaremasu. Kore wa tan ni aite no hanashi o kiite iru to iu aizu dake de naku, "anata no hanashi ni kyoukan shite imasu yo" to iu atatakai kanshin o tsutaeru juuyou na yakuwari o hatashite imasu.',
      passageId: 'Dalam percakapan bahasa Jepang, respon pendek (aizuchi) seperti "hai", "ee", "naruhodo", dan "sou desu ka" sangat sering digunakan. Hal ini bukan sekadar tanda bahwa pendengar menyimak, melainkan memainkan peran penting dalam menyampaikan rasa empati dan kepedulian yang hangat.',
      strategyTip: 'Pahami fungsi pragmatis dari aizuchi dalam membangun suasana saling percaya saat berdialog.'
    },
    writingSkill: {
      taskName: '丁寧な相談メール (Menulis Email Permintaan Saran & Konsultasi)',
      prompt: 'Tulis email santun kepada dosen atau atasan untuk meminta waktu konsultasi mengenai rencana skripsi atau proyek pekerjaan.',
      modelEssayJp: '山田先生、お疲れ様です。留学生のアンドレアスです。卒業論文のテーマについてアドバイスをいただきたく、メールいたしました。来週のご都合のよろしい日時に研究室へ伺ってもよろしいでしょうか。お忙しいところ恐れ入りますが、ご検討のほどよろしくお願いいたします。',
      modelEssayReading: 'Yamada sensei, otsukaresama desu. Ryuugakusei no Andoreasu desu. Sotsugyou ronbun no teema ni tsuite adobaisu o itadakitaku, meeru itashimashita. Raishuu no gotsugou no yoroshii nichiji ni kenkyuushitsu e ukagattemo yoroshii deshou ka. Oisogashii tokoro osoreirimasu ga, gokentou no hodo yoroshiku onegai itashimasu.',
      modelEssayId: 'Sensei Yamada, selamat bertugas. Saya mahasiswa asing, Andreas. Saya mengirim email ini untuk memohon arahan terkait topik skripsi. Apakah diperkenankan bila saya berkunjung ke laboratorium pada waktu yang Bapak/Ibu luangkan minggu depan? Di tengah kesibukan Bapak/Ibu, mohon perkenan pertimbangannya.',
      usefulConnectors: ['〜についてアドバイスをいただきたく (ingin memohon masukan perihal...)', '〜恐れ入りますが (mohon maaf atas kerepotannya, namun...)']
    },
    speakingSkill: {
      situation: 'Meminta konfirmasi dan izin secara halus kepada rekan senior di kantor',
      goal: 'Menyampaikan alasan dan meminta pengertian tanpa terkesan menuntut',
      dialogue: [
        { speaker: 'A', jp: '先輩、ちょっとよろしいでしょうか。来週の月曜日、市役所の手続きのため1時間ほど遅れて出社したいのですが。', reading: 'Senpai, chotto yoroshii deshou ka. Raishuu no getsuyoubi, shiyakusho no tetsuzuki no tame ichijikan hodo okurete shussha shitai no desu ga.', id: 'Senior, apakah ada waktu sebentar? Hari Senin depan, saya ingin izin datang terlambat sekitar satu jam karena ada urusan administrasi balai kota.' },
        { speaker: 'B', jp: '市役所の手続きなら仕方ないね。課長にはもう伝えた？', reading: 'Shiyakusho no tetsuzuki nara shikatanai ne. Kachou ni wa mou tsutaeta?', id: 'Kalau urusan administrasi balai kota ya memang tak bisa dihindari ya. Apa sudah sampaikan ke manajer seksi (kachou)?' },
        { speaker: 'A', jp: 'はい、これから報告するようにいたします。', reading: 'Hai, kore kara houkoku suru you ni itashimasu.', id: 'Baik, setelah ini saya akan langsung melaporkannya.' }
      ],
      keyExpressions: ['ちょっとよろしいでしょうか (Apakah ada waktu sebentar?)', '〜したいのですが (Saya bermaksud untuk... bagaimana ya?)']
    },
    listeningSkill: {
      situation: 'Percakapan di kantor mengenai etika membalas pesan klien',
      scriptJp: '課長：佐藤さん、さっきのA社からの問い合わせメール、もう返信した？ 佐藤：はい、明日中に資料を添えて送るよう手配しました。 課長：助かるよ。迅速な連絡が信頼につながるからね。',
      scriptReading: 'Kachou: Satou-san, sakki no A-sha kara no toiawase meeru, mou henshin shita? Satou: Hai, ashita-chuu ni shiryou o soete okuru you tehai shimashita. Kachou: Tasukaru yo. Jinsoku na renraku ga shinrai ni tsunagaru kara ne.',
      scriptId: 'Manajer: Satou-san, email pertanyaan dari Perusahaan A tadi sudah kamu balas? Satou: Sudah, saya atur untuk mengirimkan lampiran dokumen sebelum besok sore berakhir. Manajer: Sangat membantu. Komunikasi yang tanggap akan membangun kepercayaan klien.',
      comprehensionCheck: 'Mengapa respon cepat sangat ditekankan oleh manajer?',
      correctAnswer: 'Karena komunikasi cepat membangun kepercayaan bisnis yang kokoh.'
    },
    grammarPatterns: [
      {
        id: 'qt4-1',
        pattern: '〜ようにする (~ you ni suru)',
        formula: 'Kata Kerja Kamus / Nai + ようにする',
        explanation: 'Menunjukkan komitmen atau usaha sadar yang dilakukan berulang kali demi mewujudkan suatu kebiasaan baik.',
        examples: [
          {
            jp: '健康のために、毎晩11時前には寝るようにしています。',
            reading: 'Kenkou no tame ni, maiban juuichiji mae ni wa neru you ni shite imasu.',
            id: 'Demi kesehatan, saya senantiasa membiasakan tidur sebelum pukul 11 malam.'
          }
        ]
      },
      {
        id: 'qt4-2',
        pattern: '〜はずだ / 〜はずがない (~ hazu da / ~ hazu ga nai)',
        formula: 'Bentuk Biasa (Futsuukei) + はずだ / はずがない (KB + の)',
        explanation: 'Keyakinan kuat pembicara berdasarkan logika atau bukti ("seharusnya pasti..." / "mustahil...")',
        examples: [
          {
            jp: '彼は長年日本に住んでいたから、漢字が読めるはずだ。',
            reading: 'Kare wa naganen Nihon ni sunde ita kara, kanji ga yomeru hazu da.',
            id: 'Karena dia sudah bertahun-tahun tinggal di Jepang, seharusnya pasti bisa membaca kanji.'
          }
        ]
      }
    ]
  },
  {
    volume: 1,
    lesson: 5,
    level: 'N3',
    titleJp: '科学技術と生活',
    titleRomaji: 'Kagaku Gijutsu to Seikatsu',
    titleId: 'Pelajaran 5: Sains, Teknologi & Transformasi Gaya Hidup',
    theme: 'Kecerdasan Buatan, Layanan Otomatis, dan Hubungan Manusia-Mesin',
    readingSkill: {
      title: 'AIと私たちの未来社会 (Kecerdasan Buatan dan Masa Depan Kita)',
      passageJp: '自動翻訳や自動運転技術の進歩により、人々の生活は格段に便利になりました。一方で、情報セキュリティや雇用への影響など、新たな課題も生まれています。技術の利便性を享受するだけでなく、人間らしさや倫理的な視点を忘れないことが大切です。',
      passageReading: 'Jidou honyaku ya jidou unten gijutsu no shinpo ni yori, hitobito no seikatsu wa kakudan ni benri ni narimashita. Ippou de, jouhou sekyuriti ya koyou e no eikyou nado, arata na kadai mo umarete imasu. Gijutsu no ribensei o kyouju suru dake de naku, ningenrashisa ya rinriteki na shiten o wasurenai koto ga taisetsu desu.',
      passageId: 'Berkat kemajuan teknologi terjemahan otomatis dan kemudi swakemudi, kehidupan masyarakat menjadi jauh lebih praktis. Di sisi lain, muncul pula tantangan baru seperti keamanan data pribadi dan pengaruh pada lapangan kerja. Tidak hanya menikmati kepraktisan teknologi, sangat penting bagi kita untuk tidak melupakan sudut pandang etika dan kemanusiaan.',
      strategyTip: 'Cermati struktur "satu sisi praktis (便利)" berlawanan dengan "sisi lain tantangan (課題)" yang ditandai oleh「一方で」(di sisi lain).'
    },
    writingSkill: {
      taskName: '技術の進歩についての意見文 (Esai Opini: Pro dan Kontra Teknologi)',
      prompt: 'Tulis esai singkat tentang kelebihan dan kekurangan berbelanja online atau dompet digital tanpa uang tunai (cashless).',
      modelEssayJp: 'キャッシュレス決済の普及によって、財布を持たずに買い物ができる利便性が高まりました。だけでなく、ポイント還元などの経済的メリットもあります。しかし、スマホのバッテリー切れや不正利用のリスクがあるため、適切な管理が必要です。',
      modelEssayReading: 'Kyasshuresu kessai no fukyuu ni yotte, saifu o motazu ni kaimono ga dekiru ribensei ga takamarimashita. Dake de naku, pointo kangen nado no keizaiteki meritto mo arimasu. Shikashi, sumaho no batterii-gire ya fusei riyou no risuku ga aru tame, tekisetsu na kanri ga hitsuyou desu.',
      modelEssayId: 'Melalui penyebaran pembayaran nontunai, kepraktisan berbelanja tanpa membawa dompet meningkat tinggi. Bukan hanya itu, terdapat juga keuntungan finansial seperti reward poin. Namun, karena ada risiko baterai ponsel habis atau penyalahgunaan akun, pengelolaan yang bijak sangatlah dibutuhkan.',
      usefulConnectors: ['〜によって (melalui / disebabkan oleh)', '〜だけでなく (bukan hanya..., melainkan juga...)']
    },
    speakingSkill: {
      situation: 'Mendiskusikan aplikasi baru bersama teman sekelas',
      goal: 'Menjelaskan fungsi baru aplikasi dan bertukar opini tentang kemudahannya',
      dialogue: [
        { speaker: 'A', jp: 'この音声入力アプリ、使ってみた？話すだけで漢字混じりの文章にしてくれるんだよ。', reading: 'Kono onsei nyuuryoku apuri, tsukattemita? Hanasu dake de kanji majiri no bunshou ni shite kureru n da yo.', id: 'Pernah coba aplikasi input suara ini? Cukup berbicara saja, teks langsung diketik rapi lengkap dengan kanji lho.' },
        { speaker: 'B', jp: 'へえ、すごいね！雑音が多い場所でもちゃんと認識してくれるの？', reading: 'Hee, sugoi ne! Zatsuon ga ooi basho de mo chanto ninshiki shite kureru no?', id: 'Wah, hebat ya! Apakah di tempat yang banyak suara bising juga bisa mengenali dengan tepat?' },
        { speaker: 'A', jp: 'うん、最新のAIを中心とした技術のおかげで、かなり正確だよ。', reading: 'Un, saishin no AI o chuushin to shita gijutsu no okage de, kanari seikaku da yo.', id: 'Iya, berkat teknologi yang berpusat pada AI mutakhir, hasilnya sangat akurat.' }
      ],
      keyExpressions: ['〜話すだけで (cukup dengan berbicara saja)', '〜を中心とした (berpusat pada / berfokus pada)']
    },
    listeningSkill: {
      situation: 'Pemaparan presentasi mengenai sistem robot layanan hotel',
      scriptJp: '発表者：本ホテルでは、荷物の運搬や客室へのアメニティ配送を中心として、自律走行ロボットを導入いたしました。これにより、スタッフはお客様へのきめ細やかなおもてなし業務に専念できるようになります。',
      scriptReading: 'Happyousha: Hon hoteru de wa, nimotsu no unpan ya kyakushitsu e no ameniti haisou o chuushin to shite, jiritsu soukou robotto o dounyuu itashimashita. Kore ni yori, sutaffu wa okyakusama e no kimekomayaka na omotenashi gyoumu ni sennen dekiru you ni narimasu.',
      scriptId: 'Presenter: Di hotel kami, kami telah mengadopsi robot swakemudi dengan fokus utama pada pengangkutan barang bawaan dan pengantaran amenities ke kamar tamu. Berkat hal ini, staf hotel dapat mencurahkan perhatian penuh pada layanan keramahtamahan langsung kepada tamu.',
      comprehensionCheck: 'Apa tujuan utama pengenalan robot di hotel tersebut?',
      correctAnswer: 'Mengambil alih tugas antar barang agar staf dapat fokus melayani tamu secara personal.'
    },
    grammarPatterns: [
      {
        id: 'qt5-1',
        pattern: '〜だけでなく〜も (~ dake de naku ~ mo)',
        formula: 'Bentuk Biasa / KB + だけでなく … も',
        explanation: 'Menyatakan bahwa suatu kondisi tidak berhenti pada satu hal saja, melainkan mencakup hal lain juga ("bukan hanya... melainkan juga...").',
        examples: [
          {
            jp: 'この最新家電は省エネだけでなく、デザインも優れている。',
            reading: 'Kono saishin kaden wa shouene dake de naku, dezain mo sugurete iru.',
            id: 'Alat elektronik mutakhir ini bukan hanya hemat energi, melainkan desainnya pun unggul.'
          }
        ]
      },
      {
        id: 'qt5-2',
        pattern: '〜によって / 〜による (~ ni yotte / ~ ni yoru)',
        formula: 'Kata Benda + によって (akhir kalimat/predikat) / による + KB',
        explanation: 'Menunjukkan sarana/metode, penyebab perubahan, atau keberagaman kondisi sesuai kasusnya.',
        examples: [
          {
            jp: 'インターネットの普及によって、世界中の情報が瞬時に手に入る。',
            reading: 'Intaanetto no fukyuu ni yotte, sekaijuu no jouhou ga shunji ni te ni hairu.',
            id: 'Melalui penyebaran internet, informasi dari seluruh dunia dapat diperoleh dalam sekejap.'
          }
        ]
      }
    ]
  },
  {
    volume: 1,
    lesson: 6,
    level: 'N3',
    titleJp: '伝統と現代社会',
    titleRomaji: 'Dentou to Gendai Shakai',
    titleId: 'Pelajaran 6: Harmoni Warisan Tradisi & Arus Modernisasi',
    theme: 'Kerajinan Tradisional, Festival Budaya (Matsuri), dan Inovasi Masa Depan',
    readingSkill: {
      title: '職人の技と新しいデザイン (Keahlian Pengrajin Tradisional & Desain Baru)',
      passageJp: '京都の伝統工芸や各地の和紙づくりは、何百年もの歴史を通じて大切に受け継がれてきました。近年では、若手クリエイターが伝統の技法に基づいて現代的なインテリアや文房具を開発するなど、時代に合わせた新たな魅力が生み出されています。',
      passageReading: 'Kyouto no dentou kougei ya kakuchi no washi-zukuri wa, nanbyakunen mono rekishi o tsuujite taisetsu ni uketsugarete kimashita. Kinnen de wa, wakate kurieitaa ga dentou no gihou ni motozuite gendaiteki na interia ya bunbougu o kaihatsu suru nado, jidai ni awaseta arata na miryoku ga umidasarete imasu.',
      passageId: 'Kerajinan tradisional Kyoto dan pembuatan kertas Washi di berbagai daerah telah diwariskan dengan penuh kehati-hatian melewati sejarah ratusan tahun. Belakangan ini, para kreator muda merancang perabot interior dan alat tulis modern berdasarkan teknik tradisional, menciptakan daya pikat baru yang selaras dengan zaman.',
      strategyTip: 'Temukan keterkaitan antara teknik masa lalu (伝統の技法) dan kreasi masa kini (現代的な商品).'
    },
    writingSkill: {
      taskName: '文化紹介のレポート (Menulis Laporan Pengenalan Budaya Sendiri)',
      prompt: 'Tulis esai memperkenalkan satu warisan budaya atau festival khas Indonesia (seperti Batik, Wayang, atau Upacara Adat) kepada orang Jepang.',
      modelEssayJp: 'インドネシアのバティックは、独自の染色技法に基づいて作られる伝統的な布です。幾何学模様や自然をモチーフにした柄には、それぞれ深い祈りや意味が込められています。現在では正装としてだけでなく、普段着としても広く愛用されています。',
      modelEssayReading: 'Indoneshia no batikkku wa, dokuji no senshoku gihou ni motozuite tsukurareru dentouteki na nuno desu. Kikagaku moyou ya shizen o mochiifu ni shita gara ni wa, sorezore fukai inori ya imi ga komerarete imasu. Genzai de wa seisou to shite dake de naku, fudangi to shite mo hiroku aiyou sarete imasu.',
      modelEssayId: 'Batik Indonesia adalah kain tradisional yang dibuat berdasarkan teknik pewarnaan yang unik. Pola bermotif geometris maupun alam masing-masing mengandung doa dan makna filosofis yang mendalam. Kini batik tidak hanya dikenakan sebagai busana resmi, tetapi juga digemari luas sebagai pakaian sehari-hari.',
      usefulConnectors: ['〜に基づいて作られる (dibuat berdasarkan...)', '〜としてだけでなく (tidak hanya sebagai...)']
    },
    speakingSkill: {
      situation: 'Menjelaskan makna di balik cinderamata tradisional kepada teman Jepang',
      goal: 'Menyampaikan nilai filosofis suatu kerajinan dengan bahasa yang santun',
      dialogue: [
        { speaker: 'A', jp: 'これ、私の国の伝統的な工芸品なんです。手作業で作られているんですよ。', reading: 'Kore, watashi no kuni no dentouteki na kougeihin na n desu. Te-sagyou de tsukurarete iru n desu yo.', id: 'Ini adalah kerajinan tangan tradisional dari negara saya. Dibuat murni dengan keterampilan tangan lho.' },
        { speaker: 'B', jp: 'わあ、とても細かくて綺麗ですね！この模様には何か特別な意味があるんですか。', reading: 'Waa, totemo komakakute kirei desu ne! Kono moyou ni wa nanika tokubetsu na imi ga aru n desu ka.', id: 'Wah, sangat detail dan indah sekali ya! Apakah pola ini memiliki makna khusus?' },
        { speaker: 'A', jp: 'はい、家族の健康と繁栄を祈る意味が込められています。', reading: 'Hai, kazoku no kenkou to han\'ei o inoru imi ga komerarete imasu.', id: 'Benar, di dalamnya terkandung harapan untuk kesehatan dan kemakmuran keluarga.' }
      ],
      keyExpressions: ['〜手作業で作られている (dibuat dengan tangan)', '〜意味が込められている (terkandung makna...)']
    },
    listeningSkill: {
      situation: 'Wawancara dengan maestro pengrajin keramik tradisional',
      scriptJp: '司会：伝統を守り続ける上で、最も大切にされていることは何でしょうか。 職人：伝統を守るということは、昔の形をそのまま真似るだけではありません。基本を重んじつつも、現代の食卓に寄り添う新しい器を作り続ける姿勢が欠かせないのです。',
      scriptReading: 'Shikai: Dentou o mamoritsuzukeru ue de, mottomo taisetsu ni sarete iru koto wa nan deshou ka. Shokunin: Dentou o mamoru to iu koto wa, mukashi no katachi o sonomama maneru dake de wa arimasen. Kihon o omonjitsutsu mo, gendai no shokutaku ni yorisou atarashii utsuwa o tsukuritsuzukeru shisei ga kakasenai no desu.',
      scriptId: 'Pemandu: Dalam menjaga kelestarian tradisi, hal apa yang Bapak pandang paling penting? Pengrajin: Melestarikan tradisi bukan sekadar meniru bentuk masa lampau apa adanya. Sembari menjunjung tinggi dasar-dasar teknik, sikap untuk terus berinovasi menciptakan piring yang selaras dengan meja makan masa kini adalah hal yang tak boleh ditinggalkan.',
      comprehensionCheck: 'Menurut pengrajin, apa esensi sejati dari melestarikan tradisi?',
      correctAnswer: 'Menjunjung teknik dasar sembari terus berinovasi agar sesuai dengan kebutuhan zaman kini.'
    },
    grammarPatterns: [
      {
        id: 'qt6-1',
        pattern: '〜を通して / 〜を通じて (~ o tooshite / ~ o tsuujite)',
        formula: 'Kata Benda + を通して / を通じて',
        explanation: 'Menunjukkan perantara, medium, atau rentang periode waktu di mana suatu pemahaman atau peristiwa tercapai.',
        examples: [
          {
            jp: 'ボランティア活動を通じて、多くの友人に出会えた。',
            reading: 'Borantia katsudou o tsuujite, ooku no yuujin ni deaeta.',
            id: 'Melalui perantara kegiatan relawan, saya dapat bertemu dengan banyak sahabat.'
          }
        ]
      },
      {
        id: 'qt6-2',
        pattern: '〜に基づいて (~ ni motozuite)',
        formula: 'Kata Benda + に基づいて / に基づく + KB',
        explanation: 'Menyatakan bahwa suatu tindakan, karya, atau keputusan berlandaskan pada data, fakta, prinsip, atau tradisi tertentu.',
        examples: [
          {
            jp: '調査データに基づいて、今後の計画を立てる。',
            reading: 'Chousa deeta ni motozuite, kongo no keikaku o tateru.',
            id: 'Menyusun rencana masa depan berlandaskan pada data hasil riset.'
          }
        ]
      }
    ]
  }
];
