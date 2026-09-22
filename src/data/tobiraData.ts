import { TobiraChapter } from '../types';

export const tobiraChapters: TobiraChapter[] = [
  {
    chapter: 1,
    level: 'N3',
    titleJp: '日本の地理と気候',
    titleRomaji: 'Nihon no Chiri to Kikou',
    titleId: 'Bab 1: Geografi & Iklim Empat Musim di Jepang',
    theme: 'Keanekaragaman Bentang Alam, Prefektur, dan Keindahan Musim',
    culturalNote: {
      title: 'Karakteristik Kepulauan & Empat Musim (四季)',
      content: 'Jepang adalah negara kepulauan memanjang dari Hokkaido di utara hingga Okinawa di selatan. Perbedaan iklim yang kontras melahirkan kebiasaan menikmati perubahan empat musim (Shiki: Haru, Natsu, Aki, Fuyu) seperti tradisi Hanami (sakura) dan Momijigari (daun musim gugur).',
      icon: '🗾'
    },
    readingPassage: {
      titleJp: '日本列島の多様な自然と風土',
      reading: 'Nihon Rettou no Tayou na Shizen to Fuudo',
      titleId: 'Keanekaragaman Alam dan Bentang Iklim Kepulauan Jepang',
      contentJp: '日本列島は南北に細長く伸びており、地域によって気候が大きく異なります。北の北海道では冬に豪雪が見られる一方、南の沖縄では年中温暖な亜熱帯気候が広がっています。この地理的特徴が、日本各地の豊かな食文化や伝統行事を育んできました。',
      contentReading: 'Nihon rettou wa nanboku ni hosonagaku nobite ori, chiiki ni yotte kikou ga ookiku kotonarimasu. Kita no Hokkaidou de wa fuyu ni gousetsu ga mirareru ippou, minami no Okinawa de wa nenjuu ondan na anettai kikou ga hirogatte imasu. Kono chiriteki tokuchou ga, Nihon kakuchi no yutaka na shokubunka ya dentou gyouji o hagukunde kimashita.',
      contentId: 'Kepulauan Jepang membentang ramping dari utara ke selatan, dan iklimnya sangat bervariasi tergantung wilayahnya. Di Hokkaido utara terlihat salju lebat saat musim dingin, sementara di Okinawa selatan terbentang iklim subtropis yang hangat sepanjang tahun. Ciri khas geografis ini membina kekayaan budaya kuliner dan festival tradisional di setiap penjuru Jepang.'
    },
    grammarPatterns: [
      {
        id: 'tb1-1',
        pattern: '〜をはじめ（として） (~ o hajime toshite)',
        formula: 'Kata Benda + をはじめ（として）',
        explanation: 'Menyebutkan satu contoh representatif utama di awal, lalu mencakup contoh-contoh lainnya dalam kategori yang sama ("mulai dari... hingga...").',
        nuanceNote: 'Sering dipakai dalam presentasi atau tulisan formal.',
        examples: [
          {
            jp: '富士山をはじめ、日本には美しい山がたくさんあります。',
            reading: 'Fujisan o hajime, Nihon ni wa utsukushii yama ga takusan arimasu.',
            id: 'Mulai dari Gunung Fuji, di Jepang terdapat banyak gunung yang indah.'
          }
        ]
      },
      {
        id: 'tb1-2',
        pattern: '〜にとって (~ ni totte)',
        formula: 'Kata Benda (Orang/Organisasi) + にとって',
        explanation: 'Dilihat dari sudut pandang atau posisi seseorang saat memberikan evaluasi nilai ("bagi / untuk").',
        examples: [
          {
            jp: '水は人間にとって欠かせないものです。',
            reading: 'Mizu wa ningen ni totte kakasenai mono desu.',
            id: 'Air adalah hal yang sangat esensial bagi manusia.'
          }
        ]
      },
      {
        id: 'tb1-3',
        pattern: '〜わりに（は） (~ wari ni wa)',
        formula: 'Bentuk Biasa / KB + の + わりに（は）',
        explanation: 'Menunjukkan hasil yang berbeda dari ekspektasi wajar yang biasanya melekat pada standar tersebut ("padahal... / untuk ukuran...").',
        examples: [
          {
            jp: 'このレストランは値段のわりにおいしい。',
            reading: 'Kono resutoran wa nedan no wari ni oishii.',
            id: 'Restoran ini makanannya enak untuk ukuran harganya yang terjangkau.'
          }
        ]
      }
    ],
    keyVocab: [
      { kanji: '日本列島', reading: 'nihon rettou', id: 'kepulauan Jepang', type: 'Kata Benda' },
      { kanji: '南北', reading: 'nanboku', id: 'selatan dan utara', type: 'Kata Benda' },
      { kanji: '気候', reading: 'kikou', id: 'iklim cuaca', type: 'Kata Benda' },
      { kanji: '豪雪', reading: 'gousetsu', id: 'salju sangat lebat', type: 'Kata Benda' },
      { kanji: '温暖な', reading: 'ondan na', id: 'hangat dan sejuk bersahabat', type: 'Kata Sifat-na' },
      { kanji: '風土', reading: 'fuudo', id: 'kondisi alam dan budaya lokal', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 2,
    level: 'N3',
    titleJp: '日本語のスピーチスタイル',
    titleRomaji: 'Nihon no Supiichi Sutairu',
    titleId: 'Bab 2: Gaya Tutur Bahasa Jepang (Keigo vs Tameguchi)',
    theme: 'Penyesuaian Bahasa Berdasarkan Jarak Hubungan (Uchi/Soto) & Konteks',
    culturalNote: {
      title: 'Konsep Uchi (Dalam) dan Soto (Luar)',
      content: 'Di masyarakat Jepang, pemilihan antara Keigo (bahasa sopan/hormat) dan Tameguchi (bahasa akrab santai) ditentukan oleh hubungan keakraban, hierarki usia, dan apakah lawan bicara masuk kelompok sendiri (Uchi) atau orang luar (Soto).',
      icon: '🗣️'
    },
    readingPassage: {
      titleJp: '人間関係を映し出す言葉の使い分け',
      reading: 'Ningen Kankei o Utsushidasu Kotoba no Tsukaiwake',
      titleId: 'Pemilihan Kata yang Mencerminkan Relasi Antar Manusia',
      contentJp: '日本語では、話す相手との親しさや立場によって、使う文末表現や語彙が大きく変化します。初対面の人には丁寧体や敬語を用い、親しい友人同士ではくだけた普通体で話します。状況に応じた適切な使い分けが、良好な関係構築の鍵となります。',
      contentReading: 'Nihongo de wa, hanasu aite to no shitashisa ya tachiba ni yotte, tsukau bunmatsu hyougen ya goi ga ookiku henka shimasu. Shotaimen no hito ni wa teineitai ya keigo o mochii, shitashii yuujin doushi de wa kudaketa futsuutai de hanashimasu. Joukyou ni oujita tekisetsu na tsukaiwake ga, ryoukou na kankei kouchiku no kagi to narimasu.',
      contentId: 'Dalam bahasa Jepang, akhiran kalimat dan kosakata berubah drastis tergantung kedekatan dan posisi dengan lawan bicara. Kepada orang yang baru pertama jumpa dipakai bahasa sopan atau Keigo, sedangkan sesama kawan karib memakai gaya biasa yang santai. Pemilihan yang tepat sesuai situasi adalah kunci membina hubungan yang baik.'
    },
    grammarPatterns: [
      {
        id: 'tb2-1',
        pattern: '〜によって (~ ni yotte) [Perbedaan Kasus]',
        formula: 'Kata Benda + によって（異なる/違う）',
        explanation: 'Menyatakan bahwa sesuatu berbeda-beda bergantung pada faktor tertentu ("tergantung pada...").',
        examples: [
          {
            jp: '人によって考え方が違うのは自然なことだ。',
            reading: 'Hito ni yotte kangaekata ga chigau no wa shizen na koto da.',
            id: 'Berbedanya cara berpikir bergantung masing-masing orang adalah hal yang wajar.'
          }
        ]
      },
      {
        id: 'tb2-2',
        pattern: '〜を中心に（して） (~ o chuushin ni shite)',
        formula: 'Kata Benda + を中心に',
        explanation: 'Menempatkan seseorang atau suatu lokasi/topik sebagai titik fokus poros utama.',
        examples: [
          {
            jp: '若者を中心にして、SNSの利用が広がっている。',
            reading: 'Wakamono o chuushin ni shite, SNS no riyou ga hirogatte iru.',
            id: 'Dengan berpusat pada kaum muda, penggunaan medsos kian menyebar luas.'
          }
        ]
      }
    ],
    keyVocab: [
      { kanji: '丁寧体', reading: 'teineitai', id: 'ragam bahasa sopan (Desu/Masu)', type: 'Kata Benda' },
      { kanji: '初対面', reading: 'shotaimen', id: 'pertemuan pertama kali', type: 'Kata Benda' },
      { kanji: '使い分け', reading: 'tsukaiwake', id: 'pemilahan penggunaan secara tepat', type: 'Kata Benda' },
      { kanji: '親しい', reading: 'shitashii', id: 'akrab / karib', type: 'Kata Sifat-i' }
    ]
  },
  {
    chapter: 3,
    level: 'N3',
    titleJp: '日本のテクノロジーとロボット',
    titleRomaji: 'Nihon no Tekunorojii to Robotto',
    titleId: 'Bab 3: Teknologi Canggih & Robotika Jepang',
    theme: 'Otomasi, Robot Pelayanan, Keramahan AI, dan Masa Depan',
    culturalNote: {
      title: 'Budaya Penerimaan Robot (Astro Boy & Doraemon)',
      content: 'Berbeda dengan sebagian negara Barat yang terkadang memandang robot sebagai ancaman buatan, masyarakat Jepang tumbuh bersama anime sahabat robot seperti Astro Boy dan Doraemon, sehingga melihat robot sebagai kawan yang mendampingi hidup.',
      icon: '🤖'
    },
    readingPassage: {
      titleJp: '人と共生する日本のロボット技術',
      reading: 'Hito to Kyousei suru Nihon no Robotto Gijutsu',
      titleId: 'Teknologi Robot Jepang yang Hidup Berdampingan Bersama Manusia',
      contentJp: '日本のロボット工学は、単なる工場の自動化にとどまらず、介護現場や接客業での「人との共生」を目指して発展してきました。高齢者の話し相手となる癒やし系ロボットや、案内業務をこなすアンドロイドが実用化されています。',
      contentReading: 'Nihon no robotto kougaku wa, tan naru koujou no jidouka ni todomarazu, kaigo genba ya sekkyakugyou de no "hito to no kyousei" o mezashite hatten shite kimashita. Koureicha no hanashiaite to naru iyashikei robotto ya, annai gyoumu o konasu andoroido ga jitsuyouka sarete imasu.',
      contentId: 'Teknik robotika Jepang tidak hanya berhenti pada otomatisasi pabrik, melainkan berkembang dengan tujuan "hidup berdampingan dengan manusia" di panti jompo dan industri layanan. Robot pendamping untuk lansia serta android pemandu informasi telah diaplikasikan secara nyata.'
    },
    grammarPatterns: [
      {
        id: 'tb3-1',
        pattern: '〜にとどまらず (~ ni todomarazu)',
        formula: 'Kata Benda / Bentuk Biasa + にとどまらず',
        explanation: 'Tidak hanya terbatas pada cakupan sempit tersebut, melainkan meluas hingga aspek yang lebih besar.',
        examples: [
          {
            jp: 'アニメの人気は日本国内にとどまらず、世界中に広がっている。',
            reading: 'Anime no ninki wa Nihon kokunai ni todomarazu, sekaijuu ni hirogatte iru.',
            id: 'Kepopuleran anime tidak hanya terbatas di dalam negeri Jepang, melainkan merambah ke seluruh penjuru dunia.'
          }
        ]
      }
    ],
    keyVocab: [
      { kanji: '共生', reading: 'kyousei', id: 'simbiosis / hidup berdampingan', type: 'Kata Benda' },
      { kanji: '自動化', reading: 'jidouka', id: 'otomatisasi mesin', type: 'Kata Benda' },
      { kanji: '介護', reading: 'kaigo', id: 'perawatan lansia / keperawatan', type: 'Kata Benda' },
      { kanji: '実用化', reading: 'jitsuyouka', id: 'implementasi praktis ke dunia nyata', type: 'Kata Benda' }
    ]
  },
  {
    chapter: 4,
    level: 'N3',
    titleJp: '日本のスポーツと武道',
    titleRomaji: 'Nihon no Supootsu to Budou',
    titleId: 'Bab 4: Olahraga Tradisional & Seni Bela Diri (Budō)',
    theme: 'Etika Kesopanan (Reigi), Sumo, Kendo, Judo, dan Semangat Olahraga',
    culturalNote: {
      title: 'Falsafah "Dimulai dengan Hormat, Diakhiri dengan Hormat" (礼に始まり礼に終わる)',
      content: 'Dalam seni bela diri Jepang (Judo, Kendo, Karate), kemenangan bukanlah satu-satunya tujuan. Nilai utama terletak pada pembinaan budi pekerti, pengendalian diri, dan rasa hormat yang mendalam kepada lawan tanding.',
      icon: '🥋'
    },
    readingPassage: {
      titleJp: '武道の精神と礼節の文化',
      reading: 'Budou no Seishin to Reisetsu no Bunka',
      titleId: 'Spirit Seni Bela Diri dan Budaya Kesantunan',
      contentJp: '相撲や柔道、剣道などの武道では、「礼に始まり礼に終わる」という言葉が大切にされています。技の向上だけでなく、相手を敬い自己を律する心の鍛錬が求められます。',
      contentReading: 'Sumou ya juudou, kendou nado no budou de wa, "rei ni hajimari rei ni owaru" to iu kotoba ga taisetsu ni sarete imasu. Waza no koujou dake de naku, aite o uyamai jiko o rissuru kokoro no tanren ga motomeraremasu.',
      contentId: 'Dalam seni bela diri seperti Sumo, Judo, dan Kendo, prinsip "dimulai dengan hormat dan diakhiri dengan hormat" sangat dijunjung tinggi. Bukan hanya peningkatan teknik jurus, melainkan pembinaan batin untuk menghormati lawan dan mendisiplinkan diri sendiri.'
    },
    grammarPatterns: [
      {
        id: 'tb4-1',
        pattern: '〜だけでなく〜も (~ dake de naku ~ mo)',
        formula: 'Bentuk Biasa / KB + だけでなく ... も',
        explanation: 'Bukan hanya A saja, melainkan B juga.',
        examples: [
          {
            jp: '日本語の勉強は文法だけでなく、文化を理解することも重要だ。',
            reading: 'Nihongo no benkyou wa bunpou dake de naku, bunka o rikai suru koto mo juuyou da.',
            id: 'Belajar bahasa Jepang bukan hanya tata bahasa saja, melainkan memahami budayanya juga penting.'
          }
        ]
      }
    ],
    keyVocab: [
      { kanji: '武道', reading: 'budou', id: 'seni bela diri tradisional', type: 'Kata Benda' },
      { kanji: '礼節', reading: 'reisetsu', id: 'etiket tata krama / kesopanan', type: 'Kata Benda' },
      { kanji: '鍛錬', reading: 'tanren', id: 'penempaan mental dan fisik', type: 'Kata Benda' },
      { kanji: '敬う', reading: 'uyamau', id: 'menaruh rasa hormat mendalam', type: 'Kata Kerja I' }
    ]
  }
];
