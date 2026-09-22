import { ChoukaiItem } from '../types';

/**
 * Modul Latihan Choukai (聴解) Tingkat Mahir JLPT N1 & Keigo Bisnis Penutur Asli
 * Mencakup fitur khas ujian N1:
 * 1. Kecepatan Bicara Natural (Natural Native Speed)
 * 2. Kyokumen Tenkan (Distraksi & Pembicara berbalik arah keputusan di kalimat terakhir)
 * 3. Keigo Bisnis Tingkat Tinggi (Sonkeigo, Kenjougo, & Bikago dalam rapat eksekutif)
 * 4. Sokkai Outou (Tanya Jawab Kilat Spontan)
 */
export const choukaiN1Data: ChoukaiItem[] = [
  {
    id: 'choukai-n1-001',
    type: 'kyokumen_tenkan',
    titleJp: '新製品の発売時期とプロモーション戦略の見直し',
    titleId: 'Peninjauan Ulang Jadwal Peluncuran Produk Baru dan Strategi Promosi (Distraksi U-Turn)',
    situation: 'Rapat darurat divisi pemasaran dan manajemen operasi perihal kemunduran sertifikasi uji coba chip.',
    speakerRole: 'Direktur Pemasaran (Tanaka) & Kepala Divisi Operasi (Sato)',
    listeningStrategy: 'Dengarkan baik-baik kata pembalik arah seperti「とはいえ (meski demikian)」「やはり (bagaimanapun juga)」「土壇場になって申し訳ないが (maaf mendadak di saat-saat terakhir)」. Jangan terburu-buru menyimpulkan di awal dialog.',
    audioDialogue: [
      {
        speaker: 'Tanaka (Pemasaran)',
        jp: '佐藤部長、来月15日に予定している新型スマートウォッチの発表会ですが、プロモーションの準備はほぼ完了しております。予定通り15日で確定でよろしいでしょうか。',
        reading: 'Satou-buchou, raigetsu juugonichi ni yotei shite iru shingata sumaato wotchi no happyoukai desu ga, puromoushon no junbi wa hobo kanryou shite orimasu. Yotei doori juugonichi de kakutei de yoroshii deshou ka.',
        id: 'Pak Manajer Sato, mengenai peluncuran jam pintar baru tanggal 15 bulan depan, materi promosi hampir 100% tuntas. Apakah kita bisa pastikan tetap tanggal 15?'
      },
      {
        speaker: 'Sato (Operasi)',
        jp: 'ええ、営業側からも強い要望がありましたし、競合他社に先駆けて15日に出したいところですね。量産ラインも順調に立ち上がっていますから。',
        reading: 'Ee, eigyougawa kara mo tsuyoi youbou ga arimashita shi, kyougou tasha ni sakigakete juugonichi ni dashitai tokoro desu ne. Ryousan rain mo junchou ni tachiagatte imasu kara.',
        id: 'Ya, tim sales juga sangat mendesak, dan kita ingin rilis tanggal 15 mendahului kompetitor. Jalur produksi massal juga sudah berjalan lancar.'
      },
      {
        speaker: 'Tanaka (Pemasaran)',
        jp: '承知いたしました。では、メディア各社へのプレスリリースを本日中に配信手配いたします。',
        reading: 'Shouchi itashimashita. Dewa, media kakusha e no puresu ririisu o honjitsuchuu ni haishin tehai itashimasu.',
        id: 'Baik dimengerti. Kalau begitu siaran pers ke media akan saya jadwalkan kirim hari ini juga.'
      },
      {
        speaker: 'Sato (Operasi)',
        jp: 'あ、田中さん、ちょっと待ってください！先ほど品質管理部から緊急連絡が入りましてね。海外向けの通信認証の取得が一部遅延しており、万が一の不具合リスクをゼロにできないとのことです。',
        reading: "A, Tanaka-san, chotto matte kudasai! Sakihodo hinshitsu kanribu kara kinkyuu renraku ga hairimashite ne. Kaigaimuke no tsuushin ninshou no shutoku ga ichibu chien shite ori, mangaichi no fuguai risuku o zero ni dekinai to no koto desu.",
        id: 'Ah, Pak Tanaka, tunggu sebentar! Barusan ada kabar darurat dari bagian QC. Sertifikasi frekuensi luar negeri sedikit tertunda, dan risiko kendala belum bisa 100% dieliminasi.',
        isKeyDecisionTurn: true
      },
      {
        speaker: 'Tanaka (Pemasaran)',
        jp: 'なんと……。では、1週間だけ延期して22日にずらしますか？それともいっそ来々月の初頭まで見送るべきでしょうか。',
        reading: 'Nanto... Dewa, isshuukan dake enki shite nijuuninichi ni zurashimasu ka? Soretomo isso rairaigetsu no shotou made miokuru beki deshou ka.',
        id: 'Aduh... Kalau begitu, apakah kita tunda seminggu ke tanggal 22? Atau sekalian kita tunda ke awal bulan depannya lagi?'
      },
      {
        speaker: 'Sato (Operasi)',
        jp: '来々月まで延ばすと商機を完全に逸してしまいます。品管によると、認証自体は来週半ばには確実に下りる見通しです。ですから、当初の予定より1週間だけ後ろ倒しにして、22日開催でメディアに再調整をかけてもらえますか。',
        reading: 'Rairaigetsu made nobasu to shouki o kanzen ni isshite shimaimasu. Hinkan ni yoru to, ninshou jitai wa raishuu nakaba ni wa kakujitsu ni oriru mitooshi desu. Desu kara, tousho no yotei yori isshuukan dake ushirodaoshi ni shite, nijuuninichi kaisai de media ni saichousei o kakete moraemasu ka.',
        id: 'Kalau ditunda sampai bulan depannya lagi, kita kehilangan momentum pasar. QC menyatakan sertifikasi pasti keluar pertengahan pekan depan. Jadi, tolong mundurkan 1 minggu saja dari jadwal awal, dan koordinasikan kembali dengan media untuk tanggal 22.',
        isKeyDecisionTurn: true
      },
      {
        speaker: 'Tanaka (Pemasaran)',
        jp: 'かしこまりました。22日発表の線で至急プレスリリースを修正し、手配いたします。',
        reading: 'Kashikomarimashita. Nijuuninichi happyou no sen de shikyuu puresu ririisu o shuusei shi, tehai itashimasu.',
        id: 'Dimengerti dengan baik. Saya segera merevisi siaran pers untuk tanggal 22 dan mengurusnya.'
      }
    ],
    keigoBreakdown: [
      {
        term: '完了しております',
        type: 'Kenjougo',
        plainEquivalent: '完了しています',
        usageNote: 'Bentuk merendah dari している (menggunakan おります) saat melaporkan progress kepada atasan.'
      },
      {
        term: '承知いたしました / かしこまりました',
        type: 'Kenjougo',
        plainEquivalent: 'わかりました',
        usageNote: 'Standar etika mutlak bisnis Jepang untuk menyatakan kesanggupan dan pengertian perintah tugas.'
      },
      {
        term: '先駆けて',
        type: 'Bikago',
        plainEquivalent: '先に / 先頭に立って',
        usageNote: 'Frasa resmi bernuansa mendahului kompetitor dalam percaturan bisnis pasar.'
      }
    ],
    questions: [
      {
        id: 'cq-n1-001-q1',
        questionJp: '新型スマートウォッチの発表会は、最終的にいつ開催されることになったか。',
        questionId: 'Pada akhirnya, kapankah acara peluncuran jam pintar baru diputuskan untuk diadakan?',
        options: [
          { label: 'A', textJp: '当初の計画通り来月15日', textId: 'Sesuai rencana awal tanggal 15 bulan depan' },
          { label: 'B', textJp: '1週間延期された来月22日', textId: 'Ditunda 1 minggu menjadi tanggal 22 bulan depan' },
          { label: 'C', textJp: '品質認証が完全に完了する来々月の初頭', textId: 'Awal bulan depannya lagi saat sertifikasi selesai total' },
          { label: 'D', textJp: '認証が出る来週半ば', textId: 'Pertengahan pekan depan saat sertifikasi keluar' }
        ],
        correctOption: 'B',
        explanationId: 'Meskipun di awal Sato setuju tanggal 15 dan Tanaka sempat menawarkan penundaan ke awal bulan depannya lagi, pada akhirnya Sato memutuskan opsi kompromi: mundur 1 minggu saja (ushirodaoshi) yaitu tanggal 22 bulan depan.',
        kyokumenDistractionAnalysis: 'Distraksi terjadi dua kali: 1. Sato awalnya mengiyakan tgl 15, lalu membatalkannya. 2. Tanaka mengajukan 2 opsi (tgl 22 vs bulan depannya lagi). Jawaban yang benar adalah tgl 22.'
      }
    ]
  },
  {
    id: 'choukai-n1-002',
    type: 'keigo_bisnis',
    titleJp: '重要取引先からの緊急仕様変更依頼に対する応対',
    titleId: 'Respon Negosiasi Formal Menghadapi Permintaan Perubahan Spesifikasi Mendadak dari Klien Utama',
    situation: 'Telepon resmi antara Direktur Proyek (Kobayashi) dari vendor TI dan Manajer Pengadaan Klien (Matsuda).',
    speakerRole: 'Vendor TI (Kobayashi) & Manajer Klien (Matsuda)',
    listeningStrategy: 'Perhatikan penggunaan Keigo penolakan halus seperti「ご期待に沿えず誠に恐縮ですが (sangat tidak enak hati belum bisa memenuhi harapan Anda)」「〜致しかねます (sulit/tidak dapat kami penuhi)」dan tawaran solusi alternatif.',
    audioDialogue: [
      {
        speaker: 'Matsuda (Klien)',
        jp: '小林様、いつも大変お世話になっております。先日納品いただいた基幹システムの仕様書ですが、来期の組織改編に伴い、ユーザー権限の階層をさらに2段階追加していただきたいのです。納期は据え置きの月末でお願いできますでしょうか。',
        reading: 'Kobayashi-sama, itsumo taihen osewa ni natte orimasu. Senjitsu nouhin itadaita kikan shisutemu no shiyousho desu ga, raiki no soshiki kaihen ni tomonai, yuuzaa kengen no kaisou o sarani nidankai tsuika shite itadakitai no desu. Nouki wa sueoki no getsumatsu de onegai dekimasu deshou ka.',
        id: 'Pak Kobayashi, terima kasih atas kerjasamanya. Terkait spesifikasi sistem inti, kami ingin menambah 2 tingkat hirarki hak akses pengguna karena restrukturisasi. Bisakah tenggat waktu tetap di akhir bulan ini?'
      },
      {
        speaker: 'Kobayashi (Vendor)',
        jp: '松田部長、平素より格別のお引き立てを賜り厚く御礼申し上げます。組織改編のご事情、深く拝察いたします。ただ、権限階層の改修はデータベースの根幹に関わるため、現行の納期のまま追加開発を完遂することは、品質担保の観点から致しかねます。',
        reading: 'Matsuda-buchou, heiso yori kakubetsu no ohikitate o tamawari atsuku onrei moushiagemasu. Soshiki kaihen no gojijou, fukaku haisatsu itashimasu. Tada, kengen kaisou no kaishuu wa deetabeesu no konkan ni kakawaru tame, genkou no nouki no mama tsuika kaihatsu o kansui suru koto wa, hinshitsu tanpo no kanten kara itashikanemasu.',
        id: 'Pak Matsuda, terima kasih banyak atas kepercayaan Anda. Kami sangat memahami situasi restrukturisasi tersebut. Namun, karena perubahan hak akses ini menyentuh struktur inti database, untuk menyelesaikannya dengan tenggat waktu saat ini sangat sulit kami sanggupi demi menjamin kualitas sistem.',
        isKeyDecisionTurn: true
      },
      {
        speaker: 'Matsuda (Klien)',
        jp: 'うーん、やはり月末リリースは厳しいですか……。では、どのような代替案が考えられますか。',
        reading: 'Uun, yahari getsumatsu ririisu wa kibishii desu ka... Dewa, dono you na daitaian ga kangaeraremasu ka.',
        id: 'Hmm, jadi tetap berat ya rilis akhir bulan... Kalau begitu, alternatif apa yang bisa diajukan?'
      },
      {
        speaker: 'Kobayashi (Vendor)',
        jp: 'さようでございます。つきましては、月末には既存仕様の基本機能を先行してカットオーバーさせ、追加の権限管理機能につきましては、2週間後の翌月15日に第2フェーズとして実装させていただく形であれば、万全の体制でお応えできます。',
        reading: 'Sayou de gozaimasu. Tsukimashite wa, getsumatsu ni wa kizon shiyou no kihon kinou o senkou shite katto oobaa sase, tsuika no kengen kanri kinou ni tsukimashite wa, nishuukan go no yokugetsu juugonichi ni dai-ni feezu to shite jissou sasete itadaku katachi de areba, banzen no taisei de okoe dekimasu.',
        id: 'Tepat sekali. Oleh karena itu, jika diperkenankan, kami akan meluncurkan fungsi utama saat akhir bulan, lalu fungsi penambahan hak akses akan kami implementasikan sebagai Fase 2 pada tanggal 15 bulan berikutnya (selang 2 pekan). Dengan demikian kami dapat melayani secara optimal.',
        isKeyDecisionTurn: true
      },
      {
        speaker: 'Matsuda (Klien)',
        jp: 'なるほど。基幹業務自体が滞らないのであれば、その2段階分割リリース案で社内を説得してみましょう。',
        reading: 'Naruhodo. Kikan gyoumu jitai ga todokooranai no de areba, sono nidankai bunkatsu ririisu an de shanai o settoku shite mimashou.',
        id: 'Baiklah. Asalkan operasional inti tidak terganggu, saya akan coba meyakinkan internal perusahaan dengan usulan rilis 2 tahap tersebut.'
      }
    ],
    keigoBreakdown: [
      {
        term: 'お引き立てを賜り (ohikitate o tamawari)',
        type: 'Sonkeigo',
        plainEquivalent: '贔屓にしてもらい / 世話になり',
        usageNote: 'Frasa kehormatan tertinggi kepada klien atas loyalitas bisnis mereka.'
      },
      {
        term: '拝察いたします (haisatsu itashimasu)',
        type: 'Kenjougo',
        plainEquivalent: 'お察しします / 推測します',
        usageNote: 'Merendah saat memahami beban atau situasi sulit yang dihadapi lawan bicara.'
      },
      {
        term: '致しかねます (itashikanemasu)',
        type: 'Kenjougo',
        plainEquivalent: 'できません / 断ります',
        usageNote: 'Bentuk penolakan sopan etis dalam bahasa bisnis Jepang tanpa kata kasar "dame / dekinai".'
      }
    ],
    questions: [
      {
        id: 'cq-n1-002-q1',
        questionJp: 'ベンダー側の小林が提案した最終的な解決策はどのようなものか。',
        questionId: 'Solusi akhir apa yang diajukan oleh Kobayashi dari pihak vendor?',
        options: [
          { label: 'A', textJp: '月末の納期に間に合わせるため、エンジニアを増員して全機能を一括納品する', textId: 'Menambah staf insinyur demi menuntaskan seluruh fitur sekaligus tepat waktu akhir bulan' },
          { label: 'B', textJp: '月末に基本機能のみを先行稼働させ、追加権限機能は翌月15日に分割リリースする', textId: 'Meluncurkan fungsi dasar di akhir bulan, lalu merilis penambahan hak akses pada tanggal 15 bulan berikutnya secara bertahap' },
          { label: 'C', textJp: '追加機能の開発を全面的に拒否し、現行仕様のみで契約を終了する', textId: 'Menolak mentah-mentah pengembangan fitur baru dan mengakhiri kontrak' },
          { label: 'D', textJp: 'プロジェクト全体の納品を2ヶ月間完全に延期する', textId: 'Menunda seluruh peluncuran proyek secara total selama 2 bulan' }
        ],
        correctOption: 'B',
        explanationId: 'Kobayashi menolak mengerjakan semua di akhir bulan karena risiko kualitas (itashikanemasu), tetapi menawarkan solusi rilis dua fase (2段階分割リリース): fungsi dasar di akhir bulan, dan fitur tambahan di tgl 15 bulan depannya.',
        kyokumenDistractionAnalysis: 'Klien menuntut semua selesai di akhir bulan, vendor menolak opsi terburu-buru, lalu menawarkan kompromi pembagian fase (staged rollout).'
      }
    ]
  },
  {
    id: 'choukai-n1-003',
    type: 'sokkai_outou',
    titleJp: '即時応答ドリル：高度な慣用句と反語表現',
    titleId: 'Drill Respon Kilat (即時応答 Sokkai Outou) & Retorika Bahasa Sastra N1',
    situation: 'Ujian reaksi cepat 1-2 detik: Menanggapi pernyataan formal atasan dengan ekspresi yang tepat dan nuansa psikologis yang cocok.',
    speakerRole: 'Eksekutif Perusahaan & Karyawan',
    listeningStrategy: 'Waspadai pertanyaan retorik (反語 hango) di mana kalimat tampak seperti pertanyaan namun sebenarnya adalah penegasan atau teguran halus.',
    audioDialogue: [
      {
        speaker: 'Direktur Utama',
        jp: '君、今回の大型買収案件、いくらリスクが高いからといって、ここで手をこまねいて見ているわけにはいかないだろう？',
        reading: 'Kimi, konkai no oogata baishuu anken, ikura risuku ga takai kara to itte, koko de te o komaneite mite iru wake ni wa ikanai darou?',
        id: 'Kamu, proyek akuisisi raksasa kali ini, betapapun tingginya risiko, masa iya kita cuma berpangku tangan menonton saja tanpa bertindak?'
      }
    ],
    questions: [
      {
        id: 'cq-n1-003-q1',
        questionJp: '役員の言葉に対する最も適切な返答はどれか。',
        questionId: 'Respon manakah yang paling tepat untuk menanggapi pernyataan direktur tersebut?',
        options: [
          { label: 'A', textJp: 'おっしゃる通りです。リスクを恐れず、直ちに具体的な対抗策を講じます。', textId: 'Tepat sekali seperti yang Bapak sampaikan. Tanpa gentar pada risiko, kami segera menyiapkan langkah antisipasi konkret.' },
          { label: 'B', textJp: 'はい、リスクが大きすぎるので、何もしないで様子を見るのが賢明ですね。', textId: 'Ya, karena risikonya terlalu besar, memang lebih bijak berdiam diri dan melihat situasi saja.' },
          { label: 'C', textJp: 'いいえ、手をこまねいて見ることに大賛成です。', textId: 'Tidak, saya sangat setuju kita berpangku tangan saja.' }
        ],
        correctOption: 'A',
        explanationId: 'Kalimat「〜わけにはいかないだろう？」adalah retorika yang bermakna "kita TIDAK BOLEH hanya diam saja!". Idiom「手をこまねく (te o komaneku)」berarti berpangku tangan pasif. Maka respon yang tepat adalah A: menyetujui tekad direktur untuk segera bertindak.',
        kyokumenDistractionAnalysis: 'Banyak peserta terkecoh mengira partikel 〜だろう di akhir berarti bos ingin diam saja, padahal pola 〜わけにはいかない adalah keharusan mutlak untuk bertindak.'
      }
    ]
  }
];
