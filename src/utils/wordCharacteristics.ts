import { CardItem } from '../types';
import { getWordClassification, WordClassification } from './wordClassifier';
import { getClarifiedMeaning, MeaningClarification, formatSimpleMeaningSentence } from './meaningClarifier';
import { getWordNuanceInfo } from './wordNuances';

export interface CharacteristicRow {
  label: 'Jenis Kata' | 'Arti' | 'Sifat' | 'Penggunaan';
  val1: string;
  val2?: string;
}

export interface WordCharacteristicTableData {
  headerCol1: string;
  headerCol2: string;
  headerCol3?: string;
  rows: CharacteristicRow[];
}

interface CuratedWordDetail {
  header: string;
  type: string;
  meaning: string;
  nature: string;
  usage: string;
}

// Koleksi Kosakata dengan Analisis Konteks Lengkap (Persis Standar Benchmark User)
const CURATED_SINGLE_WORDS: Record<string, CuratedWordDetail> = {
  '上がります': {
    header: 'Agarimasu (上がります)',
    type: 'Kata Kerja Intransitif (Jidoushi / 自動詞)',
    meaning: 'Agarimasu (上がります) : naik, mendaki, atau masuk ke dalam rumah/ruangan',
    nature: 'Intransitif (menggunakan partikel 〜が atau 〜に)',
    usage:
      '• Fisik & Arah Ketinggian: Bergerak ke posisi yang lebih tinggi, menaiki tangga, atau mendaki tanjakan (contoh: 階段を上がります - menaiki tangga).\n• Statistik & Derajat: Kenaikan harga barang, suhu udara, atau nilai mata uang (contoh: 物価が上がります - harga kebutuhan naik).\n• Kultural / Rumah Jepang: Melangkah masuk dari batas pintu depan (genkan) ke dalam ruangan atau rumah tuan rumah (contoh ungkapan sopan bertamu: どうぞお上がりください - silakan masuk ke dalam rumah).',
  },
  'あがります': {
    header: 'Agarimasu (上がります)',
    type: 'Kata Kerja Intransitif (Jidoushi / 自動詞)',
    meaning: 'Agarimasu (上がります) : naik, mendaki, atau masuk ke dalam rumah/ruangan',
    nature: 'Intransitif (menggunakan partikel 〜が atau 〜に)',
    usage:
      '• Fisik & Arah Ketinggian: Bergerak ke posisi yang lebih tinggi, menaiki tangga, atau mendaki tanjakan (contoh: 階段を上がります - menaiki tangga).\n• Statistik & Derajat: Kenaikan harga barang, suhu udara, atau nilai mata uang (contoh: 物価が上がります - harga kebutuhan naik).\n• Kultural / Rumah Jepang: Melangkah masuk dari batas pintu depan (genkan) ke dalam ruangan atau rumah tuan rumah (contoh ungkapan sopan bertamu: どうぞお上がりください - silakan masuk ke dalam rumah).',
  },
  '明るい': {
    header: 'Akarui (明るい)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Akarui (明るい) adalah kata sifat I dalam bahasa Jepang yang berarti terang, cerah, atau ceria.',
    nature: 'Deskriptif & Kualitatif (dapat berkonjugasi: 明るくない, 明るかった)',
    usage:
      '• Keadaan fisik/tempat: Berarti terang atau cerah (contoh: ruangan yang terang karena lampu atau matahari).\n• Sifat/kepribadian seseorang: Berarti ceria, ramah, periang, atau optimis.\n• Situasi/masa depan: Berarti penuh harapan atau menjanjikan (contoh: masa depan yang cerah).',
  },
  'あかるい': {
    header: 'Akarui (明るい)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Akarui (明るい) adalah kata sifat I dalam bahasa Jepang yang berarti terang, cerah, atau ceria.',
    nature: 'Deskriptif & Kualitatif (dapat berkonjugasi: 明るくない, 明るかった)',
    usage:
      '• Keadaan fisik/tempat: Berarti terang atau cerah (contoh: ruangan yang terang karena lampu atau matahari).\n• Sifat/kepribadian seseorang: Berarti ceria, ramah, periang, atau optimis.\n• Situasi/masa depan: Berarti penuh harapan atau menjanjikan (contoh: masa depan yang cerah).',
  },
  '暗い': {
    header: 'Kurai (暗い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Kurai (暗い) adalah kata sifat I dalam bahasa Jepang yang berarti gelap, suram, temaram, atau murung.',
    nature: 'Deskriptif & Kualitatif (lawan kata dari 明るい)',
    usage:
      '• Keadaan fisik/tempat: Berarti gelap atau temaram (contoh: jalan malam atau ruangan yang kurang cahaya lampu).\n• Sifat/ekspresi seseorang: Berarti pendiam, murung, tertutup, atau tidak ceria.\n• Situasi/prospek: Berarti suram atau mencemaskan (contoh: prospek masa depan yang suram).',
  },
  'くらい': {
    header: 'Kurai (暗い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Kurai (暗い) adalah kata sifat I dalam bahasa Jepang yang berarti gelap, suram, temaram, atau murung.',
    nature: 'Deskriptif & Kualitatif (lawan kata dari 明るい)',
    usage:
      '• Keadaan fisik/tempat: Berarti gelap atau temaram (contoh: jalan malam atau ruangan yang kurang cahaya lampu).\n• Sifat/ekspresi seseorang: Berarti pendiam, murung, tertutup, atau tidak ceria.\n• Situasi/prospek: Berarti suram atau mencemaskan (contoh: prospek masa depan yang suram).',
  },
  '高い': {
    header: 'Takai (高い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Takai (高い) adalah kata sifat I dalam bahasa Jepang yang berarti tinggi, mahal, atau bernilai tinggi.',
    nature: 'Kuantitatif & Relatif (merujuk dimensi fisik atau nilai moneter)',
    usage:
      '• Dimensi fisik/ketinggian: Berarti tinggi secara ukuran vertikal (contoh: gunung Fuji yang tinggi, gedung bertingkat).\n• Finansial/harga: Berarti mahal harganya (contoh: barang mewah, harga tiket, biaya hidup).\n• Derajat/kualitas: Berarti tinggi tingkat atau levelnya (contoh: suhu badan tinggi, kemampuan bahasa tinggi).',
  },
  '安い': {
    header: 'Yasui (安い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Yasui (安い) adalah kata sifat I dalam bahasa Jepang yang berarti murah, terjangkau, atau mudah.',
    nature: 'Kuantitatif & Relatif (lawan kata dari 高い)',
    usage:
      '• Finansial/harga: Berarti murah harganya (contoh: barang diskon, makanan terjangkau, tiket murah).\n• Ketenangan batin: Berarti damai atau tenteram dalam ragam formal (contoh: 安らか).\n• Pola afiks kata kerja: Bila melekat pada kata kerja (~やすい), bermakna mudah dilakukan (contoh: わかりやすい = mudah dipahami).',
  },
  '甘い': {
    header: 'Amai (甘い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Amai (甘い) adalah kata sifat I dalam bahasa Jepang yang berarti manis, lunak, terlalu memanjakan, atau naif.',
    nature: 'Sensorik & Metaforis (merujuk rasa makanan hingga sikap seseorang)',
    usage:
      '• Cita rasa makanan/minuman: Berarti manis rasanya (contoh: gula, buah matang, kue manis).\n• Sikap/perlakuan: Berarti lunak, terlalu memanjakan, atau kurang tegas (contoh: orang tua yang terlalu memanjakan anak).\n• Penilaian/pola pikir: Berarti naif, meremehkan masalah, atau terlalu optimistis tanpa perhitungan.',
  },
  '辛い': {
    header: 'Karai / Tsurai (辛い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Karai / Tsurai (辛い) adalah kata sifat I dalam bahasa Jepang yang berarti pedas, asin menyengat, ketat, atau berat dijalani.',
    nature: 'Sensorik & Emosional (dapat dibaca karai = pedas, atau tsurai = pahit/berat hati)',
    usage:
      '• Cita rasa makanan (karai): Berarti pedas atau asin menyengat (contoh: cabai, kari pedas Jepang).\n• Penilaian/sikap (karai): Berarti pelit nilai, keras, atau sangat ketat dalam memberi skor/evaluasi.\n• Kondisi batin (tsurai): Berarti berat, menyedihkan, atau menyiksa perasaan (contoh: perpisahan yang berat).',
  },
  '重い': {
    header: 'Omoi (重い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Omoi (重い) adalah kata sifat I dalam bahasa Jepang yang berarti berat, parah, serius, atau kelam.',
    nature: 'Fisik & Psikologis (merujuk massa benda atau bobot masalah)',
    usage:
      '• Beban fisik/massa: Berarti berbobot berat saat diangkat (contoh: koper berat, batu besar).\n• Kondisi medis/penyakit: Berarti sakit parah atau cedera berat (contoh: 重い病気 = sakit parah).\n• Suasana/perasaan: Berarti muram, kaku, atau menegangkan (contoh: suasana rapat yang berat).',
  },
  '軽い': {
    header: 'Karui (軽い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Karui (軽い) adalah kata sifat I dalam bahasa Jepang yang berarti ringan, enteng, sepele, atau santai.',
    nature: 'Fisik & Sosial (lawan kata dari 重い)',
    usage:
      '• Beban fisik: Berarti enteng bobotnya dan mudah dibawa (contoh: tas ringan, laptop tipis).\n• Kondisi penyakit/luka: Berarti sakit ringan atau luka sepele yang cepat sembuh.\n• Sikap/percakapan: Berarti santai, tidak formal, atau omongan yang tidak berbobot.',
  },
  '冷たい': {
    header: 'Tsumetai (冷たい)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Tsumetai (冷たい) adalah kata sifat I dalam bahasa Jepang yang berarti dingin saat disentuh, sejuk, atau berhati dingin.',
    nature: 'Sentuhan Fisik Kulit & Karakter (khusus benda, bukan cuaca)',
    usage:
      '• Sentuhan benda fisik: Berarti dingin saat disentuh tangan/kulit (contoh: air es, logam, jus dingin).\n• Sifat/sikap seseorang: Berarti bersikap dingin, tidak ramah, ketus, atau acuh tak acuh.\n• Perbedaan dengan 寒い (samui): 寒い untuk hawa udara/cuaca, sedangkan 冷たい untuk suhu benda yang disentuh.',
  },
  '寒い': {
    header: 'Samui (寒い)',
    type: 'Kata Sifat-i (i-Adjective)',
    meaning: 'Samui (寒い) adalah kata sifat I dalam bahasa Jepang yang berarti dingin hawa udara, menggigil, atau garing.',
    nature: 'Lingkungan Atmosfer & Sensasi Tubuh (merujuk cuaca/hawa sekitar)',
    usage:
      '• Cuaca/iklim: Berarti dingin suhu lingkungan atau cuaca musim dingin (contoh: hari ini sangat dingin).\n• Sensasi tubuh: Berarti tubuh merasa kedinginan atau menggigil karena angin dingin.\n• Bahasa gaul/lelucon: Berarti lelucon yang garing, tidak lucu, atau membikin suasana canggung (寒いギャグ).',
  },
  '食べる': {
    header: 'Taberu (食べる)',
    type: 'Kata Kerja Transitif (Tadoushi / 他動詞)',
    meaning: 'Taberu (食べる) adalah kata kerja transitif dalam bahasa Jepang yang berarti makan, mengonsumsi, atau mencari nafkah.',
    nature: 'Aksi Disengaja (memerlukan objek dengan partikel 〜を)',
    usage:
      '• Konsumsi makanan harian: Memakan hidangan makanan (contoh: 朝ご飯を食べる = makan sarapan pagi).\n• Pola kiasan mata pencaharian: Berarti hidup mandiri atau makan dari hasil profesi (contoh: 音楽で食べていく = hidup dari musik).\n• Bentuk hormat: Menggunakan 召し上がる (Sonkeigo) dan いただく (Kenjougo).',
  },
  '飲む': {
    header: 'Nomu (飲む)',
    type: 'Kata Kerja Transitif (Tadoushi / 他動詞)',
    meaning: 'Nomu (飲む) adalah kata kerja transitif dalam bahasa Jepang yang berarti minum, meminum obat, menelan, atau berpesta miras.',
    nature: 'Aksi Disengaja (memerlukan objek dengan partikel 〜を)',
    usage:
      '• Minuman cair: Meminum air, teh, jus, atau kopi (contoh: お茶を飲む = minum teh hijau).\n• Medis/kesehatan: Berarti meminum obat dalam bahasa Jepang memakai kata 飲む (contoh: 薬を飲む).\n• Budaya sosial: Berarti minum sake/alkohol bersama rekan kerja di izakaya (contoh: 今夜飲みに行きましょう).',
  },
  '行く': {
    header: 'Iku (行く)',
    type: 'Kata Kerja Intransitif (Jidoushi / 自動詞)',
    meaning: 'Iku (行く) adalah kata kerja intransitif dalam bahasa Jepang yang berarti pergi, berangkat, melangkah, atau berjalan lancar.',
    nature: 'Perpindahan Menjauhi Pembicara (menggunakan partikel 〜へ / 〜に)',
    usage:
      '• Perpindahan fisik: Pergi menuju suatu destinasi atau tempat (contoh: 学校へ行く = pergi ke sekolah).\n• Progres/perkembangan: Menyatakan lancarnya sebuah rencana (contoh: 上手く行く = berjalan lancar).\n• Pola kalimat lanjutan: Melekat pada bentuk て (~ていく) menandakan proses yang berlanjut ke masa depan.',
  },
  '来る': {
    header: 'Kuru (来る)',
    type: 'Kata Kerja Intransitif (Jidoushi / 自動詞)',
    meaning: 'Kuru (来る) adalah kata kerja intransitif dalam bahasa Jepang yang berarti datang, tiba, mendekat, atau bermula.',
    nature: 'Perpindahan Mendekati Pembicara (kata kerja tak beraturan / 不規則)',
    usage:
      '• Perpindahan fisik: Datang atau tiba ke arah pembicara (contoh: 友達が家に遊びに来る = teman datang bermain ke rumah).\n• Waktu/musim: Menandakan tibanya waktu atau musim tertentu (contoh: 春が来た = musim semi telah tiba).\n• Pola kalimat lanjutan: Melekat pada bentuk て (~てくる) menandakan perubahan yang mulai terasa atau berlangsung hingga saat ini.',
  },
  '手': {
    header: 'Te (手)',
    type: 'Kata Benda (Noun)',
    meaning: 'Te (手) adalah kata benda dalam bahasa Jepang yang berarti tangan, keahlian, bantuan tenaga, atau metode.',
    nature: 'Anatomi Fisik & Metafora Fungsional',
    usage:
      '• Bagian tubuh: Berarti tangan fisik dari pergelangan hingga ujung jari (contoh: 手を洗う = mencuci tangan).\n• Bantuan tenaga kerja: Berarti bantuan orang atau tenaga tambahan (contoh: 手が足りない = kekurangan tenaga kerja).\n• Langkah/metode: Berarti trik, taktik, atau jalan keluar dalam mengatasi persoalan (contoh: いい手がある = ada cara jitu).',
  },
  '気': {
    header: 'Ki (気)',
    type: 'Kata Benda (Noun)',
    meaning: 'Ki (気) adalah kata benda dalam bahasa Jepang yang berarti pikiran, perasaan, suasana hati, atau energi perhatian.',
    nature: 'Konseptual Kultural Jepang (inti dari ratusan idiom bahasa Jepang)',
    usage:
      '• Perhatian/fokus batin: Berarti menaruh perhatian atau kepedulian (contoh: 気をつける = berhati-hati, 気にする = mencemaskan).\n• Suasana hati/hasrat: Berarti minat atau niat hati (contoh: 気がある = berminat, 気が合わない = tidak cocok watak).\n• Energi lingkungan: Menggambarkan hawa atau suasana sekitar (contoh: 活気 = gairah hidup, 雰囲気 = atmosfer ruangan).',
  },
};

// Curated dictionary of pairs with high-precision characteristics matching image benchmark
const CURATED_CHARACTERISTIC_PAIRS: Record<
  string,
  {
    col1Header: string;
    col2Header: string;
    col1Type: string;
    col2Type: string;
    col1Meaning: string;
    col2Meaning: string;
    col1Nature: string;
    col2Nature: string;
    col1Usage: string;
    col2Usage: string;
  }
> = {
  'うるさい': {
    col1Header: 'Urusai (うるさい / 煩い)',
    col2Header: 'Souon (騒音)',
    col1Type: 'Kata Sifat-i (i-Adjective)',
    col2Type: 'Kata Benda (Noun)',
    col1Meaning: 'Urusai (うるさい / 煩い) adalah kata sifat I dalam bahasa Jepang yang berarti berisik, bising, cerewet, atau menyebalkan.',
    col2Meaning: 'Souon (騒音) adalah kata benda dalam bahasa Jepang yang berarti kebisingan, polusi suara, atau suara ribut.',
    col1Nature: 'Subjektif & Kasual (merujuk pada perasaan terganggu seseorang)',
    col2Nature: 'Objektif & Formal (merujuk pada fenomena suara fisik)',
    col1Usage:
      '• Percakapan sehari-hari: Menegur orang yang berisik atau cerewet (contoh: うるさい！静かにして = berisik! tolong diam).\n• Suara lingkungan sekitar: Merasa terganggu oleh kebisingan mesin atau suara tv yang keras.\n• Aturan/repot: Menggambarkan orang tua atau bos yang cerewet banyak aturan (contoh: マナーにうるさい).',
    col2Usage:
      '• Berita & laporan lingkungan: Mengacu pada pencemaran polusi suara mesin pabrik, pesawat, atau knalpot kendaraan.\n• Konteks hukum & formal: Regulasi standar tingkat kebisingan pemukiman (contoh: 騒音規制法 = UU pengendalian kebisingan).\n• Pengamatan ilmiah: Data objektif mengenai desibel suara di jalan raya.',
  },
  '騒音': {
    col1Header: 'Souon (騒音)',
    col2Header: 'Urusai (うるさい / 煩い)',
    col1Type: 'Kata Benda (Noun)',
    col2Type: 'Kata Sifat-i (i-Adjective)',
    col1Meaning: 'Souon (騒音) adalah kata benda dalam bahasa Jepang yang berarti kebisingan, polusi suara, atau suara ribut.',
    col2Meaning: 'Urusai (うるさい / 煩い) adalah kata sifat I dalam bahasa Jepang yang berarti berisik, bising, cerewet, atau menyebalkan.',
    col1Nature: 'Objektif & Formal (merujuk pada fenomena suara fisik)',
    col2Nature: 'Subjektif & Kasual (merujuk pada perasaan terganggu seseorang)',
    col1Usage:
      '• Berita & laporan lingkungan: Mengacu pada pencemaran polusi suara mesin pabrik, pesawat, atau knalpot kendaraan.\n• Konteks hukum & formal: Regulasi standar tingkat kebisingan pemukiman (contoh: 騒音規制法 = UU pengendalian kebisingan).\n• Pengamatan ilmiah: Data objektif mengenai desibel suara di jalan raya.',
    col2Usage:
      '• Percakapan sehari-hari: Menegur orang yang berisik atau cerewet (contoh: うるさい！静かにして = berisik! tolong diam).\n• Suara lingkungan sekitar: Merasa terganggu oleh kebisingan mesin atau suara tv yang keras.\n• Aturan/repot: Menggambarkan orang tua atau bos yang cerewet banyak aturan (contoh: マナーにうるさい).',
  },
  '単純': {
    col1Header: 'Tanjun (単純)',
    col2Header: 'Jimi (地味)',
    col1Type: 'Kata Sifat-na (na-Adjective)',
    col2Type: 'Kata Sifat-na (na-Adjective)',
    col1Meaning: 'Tanjun (単純) adalah kata sifat NA dalam bahasa Jepang yang berarti sederhana, simpel, tidak berbelit-belit, atau polos.',
    col2Meaning: 'Jimi (地味) adalah kata sifat NA dalam bahasa Jepang yang berarti sederhana, tidak mencolok, kalem, atau bersahaja.',
    col1Nature: 'Struktural & Logis (merujuk cara kerja, struktur mesin, atau pola pikir)',
    col2Nature: 'Visual & Estetika (merujuk penampilan busana, warna, gaya)',
    col1Usage:
      '• Struktur mesin/sistem: Menggambarkan alat atau susunan yang mudah dipahami (contoh: 単純な構造 = struktur sederhana).\n• Pola pikir/kepribadian: Menggambarkan kepribadian yang lurus, tidak licik, atau polos.\n• Instruksi kerja: Panduan pekerjaan yang mudah dan tidak berlapis-lapis.',
    col2Usage:
      '• Pakaian & warna: Busana berwarna gelap, kalem, dan tidak heboh (contoh: 地味な服 = pakaian sederhana).\n• Gaya hidup: Hidup bersahaja tanpa kemewahan yang mencolok.\n• Riasan wajah: Dandanan natural yang tenang dan sopan untuk suasana kerja.',
  },
  '地味': {
    col1Header: 'Jimi (地味)',
    col2Header: 'Tanjun (単純)',
    col1Type: 'Kata Sifat-na (na-Adjective)',
    col2Type: 'Kata Sifat-na (na-Adjective)',
    col1Meaning: 'Jimi (地味) adalah kata sifat NA dalam bahasa Jepang yang berarti sederhana, tidak mencolok, kalem, atau bersahaja.',
    col2Meaning: 'Tanjun (単純) adalah kata sifat NA dalam bahasa Jepang yang berarti sederhana, simpel, tidak berbelit-belit, atau polos.',
    col1Nature: 'Visual & Estetika (merujuk penampilan busana, warna, gaya)',
    col2Nature: 'Struktural & Logis (merujuk cara kerja, struktur mesin, pola pikir)',
    col1Usage:
      '• Pakaian & warna: Busana berwarna gelap, kalem, dan tidak heboh (contoh: 地味な服 = pakaian sederhana).\n• Gaya hidup: Hidup bersahaja tanpa kemewahan yang mencolok.\n• Riasan wajah: Dandanan natural yang tenang dan sopan untuk suasana kerja.',
    col2Usage:
      '• Struktur mesin/sistem: Menggambarkan alat atau susunan yang mudah dipahami (contoh: 単純な構造 = struktur sederhana).\n• Pola pikir/kepribadian: Menggambarkan kepribadian yang lurus, tidak licik, atau polos.\n• Instruksi kerja: Panduan pekerjaan yang mudah dan tidak berlapis-lapis.',
  },
  '開ける': {
    col1Header: 'Akeru (開ける)',
    col2Header: 'Aku (開く)',
    col1Type: 'Kata Kerja Transitif (Tadoushi / 他動詞)',
    col2Type: 'Kata Kerja Intransitif (Jidoushi / 自動詞)',
    col1Meaning: 'Akeru (開ける) adalah kata kerja transitif dalam bahasa Jepang yang berarti membuka (dilakukan seseorang secara sengaja).',
    col2Meaning: 'Aku (開く) adalah kata kerja intransitif dalam bahasa Jepang yang berarti terbuka (terbuka dengan sendirinya).',
    col1Nature: 'Aksi Disengaja (membutuhkan objek dengan partikel 〜を)',
    col2Nature: 'Kejadian Spontan / Otomatis (menggunakan partikel 〜が)',
    col1Usage:
      '• Tindakan fisik subjek: Seseorang sengaja membuka pintu, jendela, atau kotak (contoh: ドアを開けます = saya membuka pintu).\n• Konteks permohonan: Meminta orang lain membukakan pintu (contoh: ドアを開けてください).\n• Memulai toko/bisnis: Membuka toko untuk mulai melayani pelanggan.',
    col2Usage:
      '• Keadaan otomatis: Pintu lift atau pintu otomatis terbuka dengan sensor (contoh: ドアが開きます = pintunya terbuka).\n• Waktu operasional: Toko atau bank buka mulai jam tertentu (contoh: 銀行は９時に開く).\n• Pengamatan kondisi: Menyatakan keadaan yang tampak di mata (contoh: ドアが開いている = pintu sedang terbuka).',
  },
  '開く': {
    col1Header: 'Aku (開く)',
    col2Header: 'Akeru (開ける)',
    col1Type: 'Kata Kerja Intransitif (Jidoushi / 自動詞)',
    col2Type: 'Kata Kerja Transitif (Tadoushi / 他動詞)',
    col1Meaning: 'Aku (開く) adalah kata kerja intransitif dalam bahasa Jepang yang berarti terbuka (terbuka dengan sendirinya).',
    col2Meaning: 'Akeru (開ける) adalah kata kerja transitif dalam bahasa Jepang yang berarti membuka (dilakukan seseorang secara sengaja).',
    col1Nature: 'Kejadian Spontan / Otomatis (menggunakan partikel 〜が)',
    col2Nature: 'Aksi Disengaja (membutuhkan objek dengan partikel 〜を)',
    col1Usage:
      '• Keadaan otomatis: Pintu lift atau pintu otomatis terbuka dengan sensor (contoh: ドアが開きます = pintunya terbuka).\n• Waktu operasional: Toko atau bank buka mulai jam tertentu (contoh: 銀行は９時に開く).\n• Pengamatan kondisi: Menyatakan keadaan yang tampak di mata (contoh: ドアが開いている = pintu sedang terbuka).',
    col2Usage:
      '• Tindakan fisik subjek: Seseorang sengaja membuka pintu, jendela, atau kotak (contoh: ドアを開けます = saya membuka pintu).\n• Konteks permohonan: Meminta orang lain membukakan pintu (contoh: ドアを開けてください).\n• Memulai toko/bisnis: Membuka toko untuk mulai melayani pelanggan.',
  },
};

function formatHeader(reading: string, kanjiOrJp: string): string {
  const cap = reading.charAt(0).toUpperCase() + reading.slice(1);
  return `${cap} (${kanjiOrJp})`;
}

/**
 * Format makna utama + sekunder menjadi kalimat bahasa Indonesia yang sederhana & alami sesuai kaidah:
 * Contoh: "Akarui (明るい) adalah kata sifat I dalam bahasa Jepang yang berarti terang, cerah, atau ceria."
 */
function buildDetailedMeaningString(
  card: CardItem
): string {
  return formatSimpleMeaningSentence(card);
}

/**
 * Otomatis menghasilkan rincian penggunaan berbasis poin-poin konteks terstruktur (bulleted)
 * untuk setiap kosakata di kamus.
 */
function generateStructuredContextualUsage(
  card: CardItem,
  wordClass: WordClassification,
  clarified: MeaningClarification
): string {
  const jp = card.kanji || card.japanese;
  const exJp = card.exampleJp || '';
  const exId = card.exampleId || '';

  // 1. Verba Transitif
  if (wordClass.type.startsWith('verb') && clarified.contextBadge?.variant === 'transitive') {
    const bullets = [
      `• Tindakan aktif/objek sasaran: Dilakukan secara sadar oleh subjek terhadap objek tertentu menggunakan partikel 〜を (contoh: ${jp}を〜).`,
      `• Ragam percakapan & instruksi: Digunakan dalam ragam sopan (~ます) untuk aktivitas kerja, belajar, atau permohonan (~てください).`,
    ];
    if (exJp && exId) {
      bullets.push(`• Contoh pemakaian nyata: ${exJp} (artinya: ${exId}).`);
    } else {
      bullets.push(`• Situasi pemakaian: Percakapan harian, operasional kerja, dan penyusunan kalimat JLPT.`);
    }
    return bullets.join('\n');
  }

  // 2. Verba Intransitif
  if (wordClass.type.startsWith('verb') && clarified.contextBadge?.variant === 'intransitive') {
    const bullets = [
      `• Keadaan alami/spontan: Menggambarkan proses atau peristiwa yang terjadi dengan sendirinya, menggunakan partikel 〜が.`,
      `• Kondisi yang sedang berlangsung: Kerap dipadukan dengan pola 〜ている untuk menyatakan status atau kondisi di depan mata.`,
    ];
    if (exJp && exId) {
      bullets.push(`• Contoh pemakaian nyata: ${exJp} (artinya: ${exId}).`);
    } else {
      bullets.push(`• Situasi pemakaian: Mengamati fenomena lingkungan, perubahan cuaca, atau kondisi benda.`);
    }
    return bullets.join('\n');
  }

  // 3. Verba Umum
  if (wordClass.type.startsWith('verb')) {
    const bullets = [
      `• Aktivitas predikat: Berfungsi sebagai inti tindakan dalam kalimat, dapat berkonjugasi bentuk lampau, negatif, dan te-kei.`,
      `• Pola komunikasi: Dipakai dalam interaksi percakapan sehari-hari maupun situasi kerja/bisnis.`,
    ];
    if (exJp && exId) {
      bullets.push(`• Contoh pemakaian nyata: ${exJp} (artinya: ${exId}).`);
    } else {
      bullets.push(`• Situasi pemakaian: Komunikasi lisan, korespondensi email, dan latihan tata bahasa.`);
    }
    return bullets.join('\n');
  }

  // 4. Kata Sifat -i (i-Keiyoushi)
  if (wordClass.type === 'adj_i') {
    const bullets = [
      `• Menerangkan kata benda langsung: Melekat tepat di depan kata benda tanpa partikel tambahan (contoh: ${jp} + kata benda).`,
      `• Predikat penjelas di akhir kalimat: Berfungsi sebagai predikat deskriptif, berakhiran です dalam ragam sopan.`,
    ];
    if (exJp && exId) {
      bullets.push(`• Contoh pemakaian nyata: ${exJp} (artinya: ${exId}).`);
    } else {
      bullets.push(`• Ekspresi kesan/penilaian: Menyampaikan kesan subjektif, kondisi fisik, atau evaluasi pembicara.`);
    }
    return bullets.join('\n');
  }

  // 5. Kata Sifat -na (na-Keiyoushi)
  if (wordClass.type === 'adj_na') {
    const bullets = [
      `• Menerangkan kata benda: Memerlukan partikel penhubung 〜な saat diletakkan sebelum kata benda (contoh: ${jp}な人 / ${jp}な所).`,
      `• Predikat kalimat: Berfungsi sebagai predikat di akhir kalimat dengan imbuhan です / だ.`,
    ];
    if (exJp && exId) {
      bullets.push(`• Contoh pemakaian nyata: ${exJp} (artinya: ${exId}).`);
    } else {
      bullets.push(`• Situasi pemakaian: Menggambarkan sifat mantap, kepribadian, situasi lingkungan, atau kualitas.`);
    }
    return bullets.join('\n');
  }

  // 6. Kata Keterangan (Fukushi / Adverb)
  if (wordClass.type === 'adverb') {
    const bullets = [
      `• Penjelas kata kerja/sifat: Diletakkan sebelum predikat untuk mempertegas derajat, frekuensi, atau tata cara.`,
      `• Nuansa komunikasi: Mengatur ketegasan nada bicara dan kehalusan ekspresi dalam bertutur.`,
    ];
    if (exJp && exId) {
      bullets.push(`• Contoh pemakaian nyata: ${exJp} (artinya: ${exId}).`);
    } else {
      bullets.push(`• Situasi pemakaian: Percakapan santai, dialog formal, dan penulisan teks deskriptif.`);
    }
    return bullets.join('\n');
  }

  // 7. Kata Benda (Nomina: Makanan, Tempat, Waktu, Profesi, dll.)
  const bullets = [
    `• Peran gramatikal: Berfungsi sebagai topik utama (〜は), subjek peristiwa (〜が), atau objek sasaran (〜を).`,
    `• Konteks situasi: Digunakan saat membahas ${card.subCategory?.replace(/_/g, ' ') || 'kategori benda'} dalam kehidupan sehari-hari.`,
  ];
  if (exJp && exId) {
    bullets.push(`• Contoh pemakaian nyata: ${exJp} (artinya: ${exId}).`);
  } else if (clarified.particleHint) {
    bullets.push(`• Partikel pendamping lazim: Menggunakan pola partikel ${clarified.particleHint}.`);
  } else {
    bullets.push(`• Situasi pemakaian: Komunikasi lisan praktis, membaca bacaan Jepang, dan ujian JLPT.`);
  }
  return bullets.join('\n');
}

/**
 * Returns structured characteristic table data for ANY vocabulary card,
 * exactly matching the benchmark layout and contextual bullet points requested by the user.
 */
export function getWordCharacteristicTable(card: CardItem): WordCharacteristicTableData {
  const jpKey = (card.kanji || card.japanese || '').trim();
  const rdKey = (card.reading || '').trim().toLowerCase();

  // 1. Check curated registry for pairs (e.g. うるさい vs 騒音, 単純 vs 地味, 開ける vs 開く)
  const curatedPair = CURATED_CHARACTERISTIC_PAIRS[jpKey] || CURATED_CHARACTERISTIC_PAIRS[rdKey];
  if (curatedPair) {
    return {
      headerCol1: 'Karakteristik',
      headerCol2: curatedPair.col1Header,
      headerCol3: curatedPair.col2Header,
      rows: [
        {
          label: 'Jenis Kata',
          val1: curatedPair.col1Type,
          val2: curatedPair.col2Type,
        },
        {
          label: 'Arti',
          val1: formatSimpleMeaningSentence(card),
          val2: curatedPair.col2Meaning.includes(' : ')
            ? curatedPair.col2Meaning
            : `${curatedPair.col2Header} : ${curatedPair.col2Meaning.replace(/^.*?berarti\s*/, '')}`,
        },
      ],
    };
  }

  // 2. Check curated single words (e.g. 明るい / Akarui, 暗い, 高い, 安い, 食べる, dll.)
  const curatedSingle = CURATED_SINGLE_WORDS[jpKey] || CURATED_SINGLE_WORDS[rdKey];
  if (curatedSingle) {
    return {
      headerCol1: 'Karakteristik',
      headerCol2: curatedSingle.header,
      rows: [
        {
          label: 'Jenis Kata',
          val1: curatedSingle.type,
        },
        {
          label: 'Arti',
          val1: formatSimpleMeaningSentence(card),
        },
      ],
    };
  }

  // 3. Check nuance info with contrastedWith
  const nuance = getWordNuanceInfo(card);
  const clarified = getClarifiedMeaning(card);
  const wordClass = getWordClassification(card);

  const displayHeader = formatHeader(
    card.reading || card.japanese,
    card.kanji || card.japanese
  );

  // If contrast exists in nuance registry
  if (nuance && nuance.contrastedWith && nuance.contrastedWith.length > 0) {
    const contrast = nuance.contrastedWith[0];
    const contrastHeader = formatHeader(contrast.reading || contrast.word, contrast.kanji || contrast.word);

    return {
      headerCol1: 'Karakteristik',
      headerCol2: displayHeader,
      headerCol3: contrastHeader,
      rows: [
        {
          label: 'Jenis Kata',
          val1: wordClass.label,
          val2: 'Kosakata Pembanding Terkait',
        },
        {
          label: 'Arti',
          val1: buildDetailedMeaningString(card),
          val2: `${contrastHeader} ${contrast.nuance}`,
        },
      ],
    };
  }

  // If contrast pair exists in clarified meaning
  if (clarified.contrastPair) {
    const pair = clarified.contrastPair;
    const pairHeader = formatHeader(pair.reading || pair.word, pair.word);

    return {
      headerCol1: 'Karakteristik',
      headerCol2: displayHeader,
      headerCol3: pairHeader,
      rows: [
        {
          label: 'Jenis Kata',
          val1: wordClass.label,
          val2: 'Kosakata Pembanding',
        },
        {
          label: 'Arti',
          val1: buildDetailedMeaningString(card),
          val2: pair.difference.split(':')[0] || 'Makna pembanding',
        },
      ],
    };
  }

  // 4. Default for ANY vocabulary card: Clean 2-row table (Jenis Kata & Arti)
  const detailedMeaning = buildDetailedMeaningString(card);

  return {
    headerCol1: 'Karakteristik',
    headerCol2: displayHeader,
    rows: [
      {
        label: 'Jenis Kata',
        val1: wordClass.label,
      },
      {
        label: 'Arti',
        val1: detailedMeaning,
      },
    ],
  };
}

export interface WordExplanationViewData {
  headerMeaning: string;
  wordType: string;
  usageItems: { title: string; desc: string }[];
}

export function parseUsageItems(rawUsage?: string): { title: string; desc: string }[] {
  if (!rawUsage) return [];

  const lines = rawUsage
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const items: { title: string; desc: string }[] = [];

  lines.forEach((line) => {
    const clean = line.replace(/^[•\s\d.-]+/, '').trim();
    const colonIdx = clean.indexOf(':');

    if (colonIdx > 0 && colonIdx < 50) {
      const title = clean.slice(0, colonIdx).trim();
      const desc = clean.slice(colonIdx + 1).trim();
      items.push({ title, desc });
    } else if (clean) {
      items.push({ title: 'Situasi', desc: clean });
    }
  });

  return items;
}

/**
 * Menyediakan data lengkap untuk kartu belakang flashcard persis sesuai standar layout benchmark user
 */
export function getWordExplanationViewData(card: CardItem): WordExplanationViewData {
  const jpKey = (card.kanji || card.japanese || '').trim();
  const rdKey = (card.reading || '')
    .replace(/\s*[\(（][a-zA-Z\u3040-\u309F\u30A0-\u30FF\s]+[\)）]\s*/g, '')
    .trim()
    .toLowerCase();

  const headerMeaning = formatSimpleMeaningSentence(card);

  // 1. Curated single word
  const curatedSingle =
    CURATED_SINGLE_WORDS[jpKey] ||
    CURATED_SINGLE_WORDS[card.japanese] ||
    CURATED_SINGLE_WORDS[rdKey];

  if (curatedSingle) {
    return {
      headerMeaning: curatedSingle.meaning || headerMeaning,
      wordType: curatedSingle.type,
      usageItems: parseUsageItems(curatedSingle.usage),
    };
  }

  // 2. Curated pair
  const curatedPair = CURATED_CHARACTERISTIC_PAIRS[jpKey] || CURATED_CHARACTERISTIC_PAIRS[rdKey];
  if (curatedPair) {
    return {
      headerMeaning,
      wordType: curatedPair.col1Type,
      usageItems: parseUsageItems(curatedPair.col1Usage),
    };
  }

  // 3. Dynamic fallback for any card
  const wordClass = getWordClassification(card);
  const clarified = getClarifiedMeaning(card);
  const rawUsage = generateStructuredContextualUsage(card, wordClass, clarified);

  let typeLabel = wordClass.label;
  if (wordClass.type.startsWith('verb')) {
    if (clarified.contextBadge?.variant === 'transitive') {
      typeLabel = 'Kata Kerja Transitif (Tadoushi / 他動詞)';
    } else if (clarified.contextBadge?.variant === 'intransitive') {
      typeLabel = 'Kata Kerja Intransitif (Jidoushi / 自動詞)';
    } else {
      typeLabel = 'Kata Kerja (Doushi / 動詞)';
    }
  } else if (wordClass.type === 'adj_i') {
    typeLabel = 'Kata Sifat-i (i-Keiyoushi / 形容詞)';
  } else if (wordClass.type === 'adj_na') {
    typeLabel = 'Kata Sifat-na (na-Keiyoushi / 形容動詞)';
  } else if (wordClass.type === 'noun') {
    typeLabel = 'Kata Benda (Meishi / 名詞)';
  } else if (wordClass.type === 'adverb') {
    typeLabel = 'Kata Keterangan (Fukushi / 副詞)';
  }

  return {
    headerMeaning,
    wordType: typeLabel,
    usageItems: parseUsageItems(rawUsage),
  };
}
