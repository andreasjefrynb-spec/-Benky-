import { RuigigoItem } from '../types';

/**
 * Matriks Analisis Nuansa Tipis Tata Bahasa (類義語 Ruigigo Comparison) JLPT N1
 * Membedakan pola kalimat yang maknanya sekilas mirip tetapi memiliki
 * perbedaan psikologis, derajat formalitas, dan aturan gramatikal ketat.
 */
export const ruigigoN1Data: RuigigoItem[] = [
  {
    id: 'rui-001',
    coreMeaning: 'Menyatakan Kausalitas / "Karena / Oleh Karena" (理由・原因)',
    distinctionSummary: '「ゆえに」bersifat tulisan resmi/logis,「こととて」menekankan permohonan maklum atas situasi darurat, sedangkan「ばこそ」menegaskan justru karena alasan positif itulah hal tersebut dilakukan.',
    patterns: [
      {
        pattern: '〜ゆえ(に) / 〜ゆえの',
        nuance: 'Menyatakan alasan logis mutlak dalam bahasa formal tulisan/resmi.',
        formality: 'Sangat Formal / Tertulis',
        constraints: 'Kerap muncul di pidato kenegaraan, artikel ilmiah, atau dokumen hukum.',
        exampleJp: '若さゆえの過ちであったとはいえ、責任を免れることはできない。',
        exampleId: 'Meskipun itu adalah kekhilafan karena faktor kemudaan usia, tanggung jawab tetap tidak bisa dihindari.'
      },
      {
        pattern: '〜こととて',
        nuance: 'Menyatakan alasan situasi darurat atau ketidaktahuan untuk meminta permakluman / maaf secara santun.',
        formality: 'Formal Bisnis',
        constraints: 'Diikuti kalimat permohonan maaf, pengertian, atau pemakluman.',
        exampleJp: '不慣れなこととて、皆様には多大なるご迷惑をおかけいたしました。',
        exampleId: 'Karena situasi saya yang belum terbiasa, saya telah merepotkan Bapak/Ibu sekalian.'
      },
      {
        pattern: '〜ばこそ',
        nuance: 'Menegaskan bahwa justru tepat karena alasan itulah suatu tindakan tegas atau pengorbanan dilakukan (bukan karena alasan lain).',
        formality: 'Lisan Emosional',
        constraints: 'Menggunakan bentuk pengandaian 〜ば / 〜であれば. Biasanya menegaskan niat baik yang kerap disalahpahami.',
        exampleJp: '健康であればこそ、毎日のハードな業務にも耐えられる。',
        exampleId: 'Justru tepat karena memiliki raga yang sehatlah, saya sanggup bertahan menjalani padatnya beban kerja setiap hari.'
      }
    ]
  },
  {
    id: 'rui-002',
    coreMeaning: 'Menyatakan Urutan Waktu Cepat / "Begitu Langsung" (即時性・前後の連続)',
    distinctionSummary: '「〜が早いか」menekankan tindakan refleks instan,「〜や否や」menekankan fakta kejadian mengejutkan yang beruntun, sedangkan「〜そばから」menekankan siklus berulang yang melelahkan.',
    patterns: [
      {
        pattern: '〜が早いか',
        nuance: 'Seketika itu juga pembicara/subjek langsung melakukan tindakan berikutnya secara tergesa-gesa tanpa jeda sedetik pun.',
        formality: 'Sangat Formal / Tertulis',
        constraints: 'Subjek biasanya orang ketiga, dan kalimat belakang berupa tindakan sadar yang cepat.',
        exampleJp: 'ベルが鳴るが早いか、彼は席を立って教室を飛び出した。',
        exampleId: 'Begitu bel berbunyi, seketika itu juga dia beranjak dari tempat duduk dan melesat keluar kelas.'
      },
      {
        pattern: '〜や否や',
        nuance: 'Kejadian berikutnya terjadi seketika secara bersamaan di luar kendali yang mengejutkan.',
        formality: 'Sangat Formal / Tertulis',
        constraints: 'Dapat diikuti kejadian tak terduga (di luar kehendak).',
        exampleJp: '飛行機が着陸するや否や、乗客たちは一斉にスマートフォンの電源を入れた。',
        exampleId: 'Begitu pesawat mendarat, para penumpang serentak menyalakan ponsel mereka.'
      },
      {
        pattern: '〜そばから',
        nuance: 'Baru saja selesai dilakukan atau diberitahu, langsung seketika terlupakan atau terulang lagi secara sia-sia.',
        formality: 'Lisan Emosional',
        constraints: 'Mengandung nuansa keluhan, rasa lelah, atau kekesalan karena hasil kerja cepat buyar.',
        exampleJp: '注意するそばから、また同じミスを繰り返してしまう。',
        exampleId: 'Baru saja diperingatkan, langsung mengulangi kesalahan yang persis sama lagi.'
      }
    ]
  },
  {
    id: 'rui-003',
    coreMeaning: 'Menyatakan Tujuan Luhur / "Demi Untuk" (目的・志向)',
    distinctionSummary: '「〜んがため(に)」adalah tekad besar bertaruh komitmen,「〜べく」adalah tindakan logis terarah menuju tujuan, sedangkan「〜を期して」adalah mematok batas waktu atau momentum kejayaan.',
    patterns: [
      {
        pattern: '〜んがため(に)',
        nuance: 'Menyatakan tekad besar seumur hidup atau cita-cita luhur yang ditempuh meski harus bertaruh jerih payah luar biasa.',
        formality: 'Sastra Klasik',
        constraints: 'Berasal dari bahasa klasik (archaic). Verba Nai tanpa nai + んがため (する -> せんがため).',
        exampleJp: '祖国の平和を取り戻さんがため、生涯をかけて活動を続けた。',
        exampleId: 'Demi untuk memulihkan perdamaian tanah air, ia mendedikasikan seluruh sisa hidupnya untuk berjuang.'
      },
      {
        pattern: '〜べく',
        nuance: 'Mengambil langkah konkret yang sudah dipikirkan matang-matang demi mencapai target terencana.',
        formality: 'Sangat Formal / Tertulis',
        constraints: 'Verba kamus + べく (する -> すべく / するべく). Kalimat belakang tidak boleh berupa kalimat perintah atau ajakan.',
        exampleJp: '新技術を開発すべく、世界各国の優秀な研究者を集結させた。',
        exampleId: 'Demi untuk mengembangkan teknologi mutakhir, peneliti-peneliti terbaik dari berbagai belahan dunia dikumpulkan.'
      }
    ]
  }
];
