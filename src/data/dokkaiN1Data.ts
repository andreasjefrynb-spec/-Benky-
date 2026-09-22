import { DokkaiItem } from '../types';

/**
 * Modul Latihan Dokkai (読解) Tingkat Mahir JLPT N1
 * Mencakup 3 format utama ujian:
 * 1. Editorial & Artikel Opini (論説文 - Analisis pola pikir penulis, filsafat, & kritik sosial)
 * 2. Teks Perbandingan Dua Penulis (比較読解 - Perbandingan sudut pandang kontroversial)
 * 3. Pencarian Informasi Bisnis Cepat (情報検索 - Regulasi kantor & pamflet kompleks)
 */
export const dokkaiN1Data: DokkaiItem[] = [
  {
    id: 'dokkai-n1-001',
    type: 'editorial',
    titleJp: 'AI時代における「教養」の再定義',
    titleId: 'Mendefinisikan Ulang Makna "Intelektualitas & Pengetahuan Humaniora" di Era AI',
    theme: 'Filsafat Teknologi & Eksistensi Manusia (Filosofis / Asahi Shimbun style)',
    recommendedTimeMinutes: 7,
    readingStrategy: 'Fokus pada kalimat setelah kata hubung pembalik (しかし、だが、むしろ) dan kalimat berakhiran penegasan penulis (〜のではないだろうか、〜にほかならない).',
    passageJp: `現代社会において、人工知能（AI）の急速な進化は、あらゆる知的生産の現場を劇的に塗り替えつつある。かつて専門家にしか持ち得なかった膨大な知識の蓄積と検索、そして論理的な文章の構成すらも、機械が瞬時にこなす時代が到来したのである。

このような技術的変革の只中にあって、「人間にしかできない知的営為とは何か」という問いが、これまでになく切迫した響きを帯びて私たちに突きつけられている。単なる知識の記憶や計算速度を競うのであれば、人間が機械に太刀打ちできないことはもはや明白である。

しかしながら、知識を容易に入手できるようになったからこそ、断片的な情報をつなぎ合わせ、その背後にある文脈や価値観を深く洞察する「真の教養」の価値が問われているのではないだろうか。AIが出力した合理的な回答に対して、「それは人間的な倫理や美意識に照らして本当に望ましいのか」と根源的な疑念を投げかける力こそ、これからの人間に求められる資質である。

教養とは、既知の正解を誇示することではなく、未知の混沌に対して怯むことなく独自の問いを立て続ける精神の態度にほかならない。効率性と最適化ばかりを偏重する現代だからこそ、一見無駄に見える思索の深まりこそが、私たちの人間性を担保する最後の砦となるのである。`,
    passageId: `Di masyarakat modern, evolusi pesat kecerdasan buatan (AI) secara dramatis mengubah lanskap seluruh produksi intelektual. Era di mana akumulasi pengetahuan masif, pencarian informasi, bahkan penyusunan teks logis yang dulunya hanya dikuasai pakar kini dapat dituntaskan mesin dalam sekejap telah tiba.

Di tengah transformasi teknologi ini, pertanyaan "apa sesungguhnya aktivitas intelektual yang hanya dapat dilakukan oleh manusia?" mengemuka dengan gaung urgensi yang belum pernah ada sebelumnya. Bila sekadar membandingkan daya ingat informasi atau kecepatan kalkulasi, sudah sangat jelas manusia takkan mampu menandingi mesin.

Namun demikian, justru karena informasi kini dapat diperoleh dengan begitu mudah, nilai dari "intelektualitas humaniora sejati" yang merajut kepingan-kepingan informasi dan menembus konteks serta nilai-nilai di baliknya semakin diuji. Kemampuan untuk melontarkan keraguan mendasar terhadap jawaban rasional yang dihasilkan AI—"apakah hal ini sungguh-sungguh layak jika ditinjau dari etika dan estetika kemanusiaan?"—adalah kualitas hakiki yang dituntut dari manusia masa depan.

Intelektualitas sejati bukanlah memamerkan jawaban benar yang sudah diketahui umum, melainkan tiada lain adalah sikap mental yang tak gentar merumuskan pertanyaan orisinal di hadapan ketidakpastian yang belum terjelajah. Justru di tengah era modern yang mengagung-agungkan efisiensi dan optimasi semata, kedalaman perenungan yang sepintas tampak sia-sia inilah yang menjadi benteng pertahanan terakhir bagi kemanusiaan kita.`,
    paragraphs: [
      {
        jp: '現代社会において、人工知能（AI）の急速な進化は、あらゆる知的生産の現場を劇的に塗り替えつつある。かつて専門家にしか持ち得なかった膨大な知識の蓄積と検索、そして論理的な文章の構成すらも、機械が瞬時にこなす時代が到来したのである。',
        id: 'Paragraf 1: Pengantar latar belakang dominasi AI dalam produksi teks dan pemrosesan data intelektual.'
      },
      {
        jp: 'このような技術的変革の只中にあって、「人間にしかできない知的営為とは何か」という問いが、これまでになく切迫した響きを帯びて私たちに突きつけられている。単なる知識の記憶や計算速度を競うのであれば、人間が機械に太刀打ちできないことはもはや明白である。',
        id: 'Paragraf 2: Munculnya pertanyaan genting mengenai peran pemikiran manusia yang tidak tergantikan.'
      },
      {
        jp: 'しかしながら、知識を容易に入手できるようになったからこそ、断片的な情報をつなぎ合わせ、その背後にある文脈や価値観を深く洞察する「真の教養」の価値が問われているのではないだろうか。AIが出力した合理的な回答に対して、「それは人間的な倫理や美意識に照らして本当に望ましいのか」と根源的な疑念を投げかける力こそ、これからの人間に求められる資質である。',
        id: 'Paragraf 3: Argumen inti penulis: Perlunya kemampuan mengajukan keraguan kritis dan evaluasi etika humaniora terhadap output AI.'
      },
      {
        jp: '教養とは、既知の正解を誇示することではなく、未知の混沌に対して怯むことなく独自の問いを立て続ける精神の態度にほかならない。効率性と最適化ばかりを偏重する現代だからこそ、一見無駄に見える思索の深まりこそが、私たちの人間性を担保する最後の砦となるのである。',
        id: 'Paragraf 4: Kesimpulan konseptual: Hakikat intelektualitas sejati adalah sikap mental merumuskan pertanyaan orisinal dan perenungan mendalam.'
      }
    ],
    keyVocab: [
      { kanji: '知的営為', reading: 'ちてきえいい (chiteki eii)', meaningId: 'Aktivitas / daya upaya intelektual manusia' },
      { kanji: '太刀打ちできない', reading: 'たちうちできない (tachiuchi dekinai)', meaningId: 'Sama sekali tidak sanggup menandingi' },
      { kanji: '偏重する', reading: 'へんちょうする (henchou suru)', meaningId: 'Mengagung-agungkan / terlalu berat sebelah memprioritaskan' },
      { kanji: '担保する', reading: 'たんぽする (tanpo suru)', meaningId: 'Menjamin / menjadi jaminan kepastian' },
      { kanji: '最後の砦', reading: 'さいごのとりで (saigo no toride)', meaningId: 'Benteng pertahanan terakhir' }
    ],
    questions: [
      {
        id: 'dq-n1-001-q1',
        questionJp: '筆者が考える、AI時代において人間に最も求められる資質はどれか。',
        questionId: 'Menurut pandangan penulis, kualitas manakah yang paling dituntut dari manusia di era AI?',
        options: [
          { label: 'A', textJp: 'AIよりも高速に膨大な知識を検索し、論理的な文章を構築する情報処理能力', textId: 'Kemampuan memproses data mencari pengetahuan lebih cepat daripada AI dan menyusun teks logis' },
          { label: 'B', textJp: 'AIが提示した回答の倫理的妥当性を疑い、独自の根源的な問いを立てる力', textId: 'Kemampuan meragukan kelayakan etis dari jawaban AI serta merumuskan pertanyaan mendasar yang orisinal' },
          { label: 'C', textJp: '過去の学術的な正解を完璧に記憶し、他者に分かりやすく解説する伝達力', textId: 'Kemampuan menghafal jawaban benar akademis masa lalu secara sempurna dan menerangkannya ke orang lain' },
          { label: 'D', textJp: '効率性と最適化を極限まで追求して、社会全体の生産性を向上させる技術', textId: 'Keterampilan mengejar efisiensi dan optimasi secara ekstrem guna mendongkrak produktivitas masyarakat' }
        ],
        correctOption: 'B',
        explanationJp: '第3段落および第4段落で、筆者はAIの合理的回答に対し「倫理や美意識に照らして本当に望ましいのか」と疑念を投げかけ、未知の混沌に対して独自の問いを立て続ける態度を強調している。',
        explanationId: 'Pada paragraf 3 dan 4, penulis menegaskan bahwa kualitas utama manusia bukanlah kecepatan data melainkan keberanian meragukan output AI secara etis dan merumuskan pertanyaan baru.',
        authorMindsetAnalysis: 'Penulis menolak pandangan reduksionis utilitarian (yang hanya mengukur efisiensi). Penulis memandang "intelektualitas" sebagai sikap filosofis yang berakar pada etika dan estetika kemanusiaan.'
      }
    ]
  },
  {
    id: 'dokkai-n1-002',
    type: 'hikaku',
    titleJp: 'テレワーク（リモートワーク）の恒久化を巡る議論',
    titleId: 'Perdebatan Mengenai Permanensi Kebijakan Bekerja Jarak Jauh (Telework / Remote Work)',
    theme: 'Sosiologi Kerja & Manajemen Perusahaan (Teks Perbandingan 比較読解)',
    recommendedTimeMinutes: 8,
    readingStrategy: 'Bandingkan premis Penulis A (fokus pada fleksibilitas & otonomi individu) vs Penulis B (fokus pada kohesi sosial & inovasi spontan tatap muka). Identifikasi titik temu dan pertentangan mutlak.',
    passageJp: `【Aの文章】
パンデミックを契機に普及したテレワークは、単なる一時的な緊急避難措置にとどまらず、働き方のパラダイムシフトをもたらした。満員電車の通勤ストレスから解放され、個人の裁量で時間を配分できる環境は、労働者の生活の質（QOL）を劇的に向上させた。また、場所にとらわれない働き方は、地方移住の促進や育児・介護との両立を可能にし、優秀な人材の獲得にも寄与している。成果主義に基づいた透明性のある評価制度さえ整えれば、対面での監視を前提とした旧態依然とした出社文化に固執する理由はどこにもない。

【Bの文章】
テレワークの利便性を全否定するつもりはないが、それを無批判に恒久化することには慎重であるべきだ。組織におけるイノベーションやクリエイティブな発想は、整然と設定されたオンライン会議ではなく、給湯室での雑談や廊下での偶然のすれ違いといった「偶発的な対話」から生まれることが多い。また、新入社員の育成や組織文化の共有は、画面越しのやり取りだけでは限界があり、長期的には組織の求心力や連帯感が希薄化するリスクを孕んでいる。完全な出社回帰ではなくとも、対面コミュニケーションが持つ固有の価値を再評価すべきである。`,
    passageId: `【Teks Penulis A】
Telework yang meluas dipicu oleh pandemi bukan sekadar tindakan darurat sementara, melainkan membawa pergeseran paradigma cara bekerja. Terbebas dari stres kereta komuter yang padat serta lingkungan di mana waktu dapat diatur secara otonom telah mendongkrak kualitas hidup pekerja secara dramatis. Bekerja tanpa terikat lokasi juga memfasilitasi relokasi ke daerah pedesaan, keseimbangan antara karir dan merawat anak/orang tua, serta menarik talenta terbaik. Asalkan sistem penilaian transparan berbasis kinerja diterapkan, tidak ada alasan kuat untuk tetap bersikukuh pada budaya wajib ke kantor yang usang dan mengandalkan pengawasan langsung.

【Teks Penulis B】
Saya tidak bermaksud menyangkal sepenuhnya kepraktisan telework, namun menjadikannya permanen secara tanpa kritik harus disikapi dengan penuh kehati-hatian. Inovasi dan ide kreatif dalam organisasi kerap kali lahir bukan dari rapat daring yang terjadwal rapi, melainkan dari obrolan santai di pantry atau perjumpaan tak sengaja di koridor kantor. Selain itu, pembinaan staf baru dan penanaman budaya organisasi memiliki batasan bila hanya melalui layar monitor, serta menyimpan risiko memudarnya daya rekat dan solidaritas organisasi dalam jangka panjang. Meskipun tidak harus kembali 100% ke kantor, nilai inheren komunikasi tatap muka harus dievaluasi kembali.`,
    authorA: {
      name: 'Penulis A (Pakar Manajemen Fleksibilitas)',
      role: 'Mendukung penuh telework permanen berbasis evaluasi hasil',
      textJp: '成果主義に基づいた透明性のある評価制度さえ整えれば、対面での監視を前提とした旧態依然とした出社文化に固執する理由はどこにもない。',
      textId: 'Asalkan sistem evaluasi kinerja transparan diterapkan, tidak ada alasan mempertahankan budaya kantor tatap muka yang usang.'
    },
    authorB: {
      name: 'Penulis B (Peneliti Dinamika Organisasi)',
      role: 'Menyoroti hilangnya inovasi spontan dan memudarnya ikatan organisasi',
      textJp: '組織におけるイノベーションは「偶発的な対話」から生まれることが多い。対面コミュニケーションが持つ固有の価値を再評価すべきである。',
      textId: 'Inovasi organisasi kerap lahir dari obrolan santai spontan. Nilai komunikasi langsung harus dinilai ulang.'
    },
    keyVocab: [
      { kanji: 'パラダイムシフト', reading: 'paradaimu shifuto', meaningId: 'Pergeseran paradigma mendasar' },
      { kanji: '旧態依然', reading: 'きゅうたいいぜん (kyuutai izen)', meaningId: 'Tetap dalam cara lama yang kolot/usang' },
      { kanji: '偶発的', reading: 'ぐうはつてき (guuhatsuteki)', meaningId: 'Bersifat spontan / terjadi secara kebetulan' },
      { kanji: '求心力', reading: 'きゅうしんりょく (kyuushinryoku)', meaningId: 'Daya tarik pemersatu ke pusat / solidaritas kelompok' },
      { kanji: '孕んでいる', reading: 'はらんでいる (harande iru)', meaningId: 'Menyimpan potensi risiko tersembunyi di dalamnya' }
    ],
    questions: [
      {
        id: 'dq-n1-002-q1',
        questionJp: 'AとBの二人が共通して認めている点、および意見が対立している点の組み合わせとして最も適切なものはどれか。',
        questionId: 'Kombinasi manakah yang paling tepat mewakili poin kesepakatan bersama dan poin pertentangan antara Penulis A dan Penulis B?',
        options: [
          {
            label: 'A',
            textJp: '【共通点】テレワークがもたらす利便性や個人のメリット ／ 【対立点】オフィスでの対面対話が組織や創造性に与える重要性の評価',
            textId: '【Kesepakatan】Manfaat dan kepraktisan personal yang dibawa oleh telework ／ 【Pertentangan】Penilaian terhadap signifikansi interaksi tatap muka di kantor bagi kreativitas dan kohesi organisasi'
          },
          {
            label: 'B',
            textJp: '【共通点】満員電車の通勤が完全に無意味であること ／ 【対立点】新入社員に対する給与体系のあり方',
            textId: '【Kesepakatan】Kereta komuter padat sama sekali tak berguna ／ 【Pertentangan】Sistem struktur gaji staf baru'
          },
          {
            label: 'C',
            textJp: '【共通点】全社員が毎日必ず出社すべきであること ／ 【対立点】地方移住が社会に与える経済効果',
            textId: '【Kesepakatan】Semua staf wajib masuk kantor tiap hari ／ 【Pertentangan】Dampak ekonomi migrasi daerah'
          },
          {
            label: 'D',
            textJp: '【共通点】オンライン会議の技術が未熟であること ／ 【対立点】育児と仕事の両立の可否',
            textId: '【Kesepakatan】Teknologi meeting daring belum matang ／ 【Pertentangan】Bisa tidaknya menyeimbangkan karir dan anak'
          }
        ],
        correctOption: 'A',
        explanationJp: 'Bも冒頭で「利便性を全否定するつもりはない」と述べ、Aの主張する個人の利便性を認めている。しかし、Aが対面出社を「旧態依然」と切り捨てるのに対し、Bは「偶発的対話によるイノベーションや組織の連帯感」という対面の価値を重く見ている点で対立している。',
        explanationId: 'Penulis B mengakui kepraktisan telework, namun tidak setuju bila kantor tatap muka ditinggalkan total karena interaksi langsung krusial bagi inovasi spontan dan budaya organisasi.',
        authorMindsetAnalysis: 'Penulis A memandang organisasi dari kacamata efisiensi individu dan hasil objektif, sedangkan Penulis B memandang organisasi sebagai ekosistem sosial yang membutuhkan kohesi emosional dan interaksi organik.'
      }
    ]
  },
  {
    id: 'dokkai-n1-003',
    type: 'jouhou',
    titleJp: 'グローバル人材育成海外研修助成金 申請要領',
    titleId: 'Petunjuk Teknis Permohonan Subsidi Hibah Pelatihan Luar Negeri untuk Pengembangan SDM Global',
    theme: 'Pencarian Informasi Bisnis Cepat (情報検索 - Regulasi Dokumen Kompleks)',
    recommendedTimeMinutes: 4,
    readingStrategy: 'Jangan membaca seluruh teks secara mendatar! Langsung pindai pertanyaan, cari kata kunci batas waktu, persentase subsidi, dan syarat mutlak kelayakan permohonan.',
    passageJp: `【公益財団法人 国際ビジネス振興機構 助成金申請のご案内】

1. 助成対象者：
・日本国内に本社を置く中小企業（資本金3億円以下または従業員数300人以下）。
・設立から3年以上が経過しており、直近1年間の決算において債務超過でないこと。

2. 助成対象事業：
・海外市場開拓を目的とした社員の現地派遣研修（期間：14日以上90日以内）。
・語学学校の受講料、渡航航空券代（エコノミークラスに限る）、および現地宿泊費。
※役員のみの派遣、または現地展示会の視察のみを目的とする渡航は対象外。

3. 助成金額および助成率：
・助成対象経費の3分の2以内（上限：1社あたり200万円、1人あたり最大100万円）。
・ただし、事前申請のない追加経費やビザ取得手数料、日当・飲食費は一切支給されない。

4. 申請受付期間および提出書類：
・第1期申請締切：2026年5月29日（金）必着（郵送または専用ポータルサイトからの電子申請）。
・提出書類：助成金交付申請書、事業計画書、直近3期分の財務諸表、派遣対象者の職務経歴書。
※審査結果は締切後40日以内に書面にて通知。事業開始は交付決定通知書の発行後でなければならない（事前着工は助成金取り消し）。`,
    passageId: `【Petunjuk Permohonan Subsidi Yayasan Promosi Bisnis Internasional】

1. Target Penerima Hibah:
- Perusahaan skala kecil-menengah (SME) berkantor pusat di Jepang (modal <= 300 juta yen ATAU karyawan <= 300 orang).
- Telah berdiri minimal 3 tahun dan tidak mengalami insolvensi/defisit utang pada laporan keuangan tahun terakhir.

2. Program yang Berhak Menerima Subsidi:
- Pelatihan magang staf langsung di luar negeri guna ekspansi pasar (durasi: 14 s.d. 90 hari).
- Biaya kursus bahasa, tiket pesawat (hanya kelas ekonomi), dan akomodasi lokal.
* Pengecualian: Keberangkatan yang hanya terdiri dari jajaran direksi/eksekutif, atau semata-mata kunjungan pameran tidak berhak menerima subsidi.

3. Nominal & Rasio Subsidi:
- Maksimal 2/3 dari total pengeluaran yang diakui (batas atas: 2 juta yen per perusahaan, maksimal 1 juta yen per orang).
- Biaya tambahan tanpa pra-pemberitahuan, biaya visa, uang saku harian, dan biaya makan minum TIDAK DISUBSIKAN.

4. Periode Pendaftaran & Dokumen:
- Batas akhir gelombang 1: Jumat, 29 Mei 2026 (paling lambat tiba di kantor / submit online).
- Pengumuman hasil verifikasi dalam tempo 40 hari. Kegiatan pelatihan HANYA BOLEH DIMULAI SETELAH terbit surat keputusan resmi penerimaan hibah.`,
    keyVocab: [
      { kanji: '債務超過', reading: 'さいむちょうか (saimu chouka)', meaningId: 'Insolvensi / Defisit liabilitas melebihi total aset' },
      { kanji: '助成率', reading: 'じょせいりつ (joseiritsu)', meaningId: 'Persentase rasio subsidi bantuan finansial' },
      { kanji: '必着', reading: 'ひっちゃく (hicchaku)', meaningId: 'Wajib sudah tiba di tujuan pada tanggal tersebut' },
      { kanji: '交付決定', reading: 'こうふけってい (koufu kettei)', meaningId: 'Keputusan resmi pencairan/persetujuan hibah dana' }
    ],
    questions: [
      {
        id: 'dq-n1-003-q1',
        questionJp: '次のうち、この助成金の申請条件および支給ルールとして正しいものはどれか。',
        questionId: 'Manakah dari pernyataan berikut yang benar mengenai syarat dan aturan pencairan subsidi ini?',
        options: [
          { label: 'A', textJp: '設立2年目のベンチャー企業でも、資本金が1億円以下であれば申請可能である。', textId: 'Perusahaan rintisan berusia 2 tahun tetap boleh mendaftar asalkan modal di bawah 100 juta yen.' },
          { label: 'B', textJp: '専務取締役が自ら海外展示会の視察のみを行う場合でも、航空券代は全額支給される。', textId: 'Direktur pelaksana yang berangkat meninjau pameran luar negeri berhak mendapat penggantian tiket pesawat penuh.' },
          { label: 'C', textJp: '社員2名を40日間派遣し対象経費が300万円の場合、最大で200万円の助成金が受給できる。', textId: 'Jika 2 staf diberangkatkan 40 hari dengan biaya yang diakui 3 juta yen, perusahaan berhak menerima subsidi maksimal 2 juta yen.' },
          { label: 'D', textJp: '申請書類を郵送した翌日から研修を開始しても、後から助成金が承認されれば清算される。', textId: 'Pelatihan boleh langsung dimulai sehari setelah pos dikirim dan akan diganti bila nanti disetujui.' }
        ],
        correctOption: 'C',
        explanationJp: '対象経費300万円の2/3はちょうど200万円であり、1社あたりの上限（200万円）および1人あたり上限（100万円×2名＝200万円）の双方の条件を満たしている。Aは設立3年以上が必要なため不可、Bは役員のみ・視察のみは対象外、Dは交付決定通知前の事前着工は取り消しとなるため誤り。',
        explanationId: 'Biaya 3 juta yen dikali 2/3 = 2 juta yen. Ini pas memenuhi batas atas 2 juta yen per perusahaan dan 1 juta yen per orang (2 orang x 1 juta = 2 juta). Opsi lain melanggar syarat batas berdiri 3 tahun, larangan hanya direksi, dan larangan memulai sebelum surat persetujuan keluar.',
        authorMindsetAnalysis: 'Soal Jouhou Kensaku menguji ketelitian memeriksa klausul hukum (prasyarat kelayakan, limit plafon, dan larangan khusus).'
      }
    ]
  }
];
