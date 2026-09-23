/**
 * Modul Klarifikasi Makna Kosakata Bahasa Jepang (語彙の意味の明確化 / Anti-Bingung)
 * 
 * Modul ini memastikan seluruh arti kata (kotoba) tidak ambigu, tidak membingungkan,
 * dan langsung dipahami dalam konteks nyata.
 * 
 * Menyelesaikan masalah umum kebingungan pembelajar bahasa Jepang:
 * 1. Pasangan Transitif vs Intransitif (misal: aku vs akeru, shimaru vs shimeru, deru vs dasu)
 * 2. Homofon / Kata Berbunyi Mirip (misal: atsui [cuaca] vs atsui [benda] vs atsui [tebal])
 * 3. Ragam kata 'Memakai' (kiru [atas] vs haku [bawah] vs kaburu [kepala] vs kakeru [kacamata])
 * 4. Memberi & Menerima (ageru vs kureru vs morau)
 * 5. Tahu vs Mengerti vs Bisa (shiru vs wakaru vs dekiru)
 * 6. Kata Pinjam & Ajar (kariru vs kasu, oshieru vs narau)
 * 7. Kata Homograf Bahasa Indonesia (tahu makanan vs tahu info, jam arloji vs durasi jam)
 */

import { CardItem } from '../types';

export interface MeaningClarification {
  /** Arti utama yang sudah diperjelas & dibersihkan dari ambiguitas */
  primaryMeaning: string;
  /** Sub-arti atau variasi makna lain jika ada */
  secondaryMeanings?: string[];
  /** Badge konteks ringkas (misal: "Hawa Cuaca", "Suhu Benda", "Intransitif (Terbuka Sendiri)", dsb.) */
  contextBadge?: {
    text: string;
    variant: 'transitive' | 'intransitive' | 'context' | 'nuance' | 'particle';
  };
  /** Petunjuk partikel gramatikal yang wajib/sering digunakan */
  particleHint?: string;
  /** Penjelasan ringkas mengapa kata ini tidak boleh tertukar / kaidah penggunaannya */
  clarificationNote?: string;
  /** Pasangan kata pembanding yang sering membingungkan */
  contrastPair?: {
    word: string;
    reading: string;
    difference: string;
  };
  /** Contoh konkret penggunaan */
  usageHint?: string;
}

// Kamus Disambiguasi Mendalam untuk Kata-kata yang Sering Membingungkan
const DETAILED_CLARIFICATIONS: Record<string, MeaningClarification> = {
  // === PASANGAN TRANSITIF vs INTRANSITIF (他動詞 vs 自動詞) ===
  '開く': {
    primaryMeaning: 'Terbuka (dengan sendirinya / tanpa pelaku)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 開く (pintu terbuka sendiri)',
    clarificationNote: 'Menyatakan keadaan pintu atau jendela yang terbuka dengan sendirinya, bukan dibuka oleh seseorang.',
    contrastPair: {
      word: '開ける',
      reading: 'akeru',
      difference: 'Membuka (transitif: ada orang yang sengaja membuka pintu)',
    },
    usageHint: 'ドアが開きます (Pintu terbuka).',
  },
  '開ける': {
    primaryMeaning: 'Membuka (dilakukan oleh seseorang secara sengaja)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 開ける (membuka pintu)',
    clarificationNote: 'Menyatakan tindakan seseorang yang membuka pintu, jendela, buku, atau kotak.',
    contrastPair: {
      word: '開く',
      reading: 'aku',
      difference: 'Terbuka (intransitif: terbuka sendirinya)',
    },
    usageHint: '窓を開けてください (Tolong buka jendela).',
  },
  '閉まる': {
    primaryMeaning: 'Tertutup (dengan sendirinya / rapat)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 閉まる (toko tutup / pintu tertutup)',
    clarificationNote: 'Menyatakan keadaan pintu tertutup sendiri atau toko yang sudah tutup.',
    contrastPair: {
      word: '閉める',
      reading: 'shimeru',
      difference: 'Menutup (transitif: ada orang yang menutupnya)',
    },
    usageHint: 'エレベーターのドアが閉まります (Pintu lift menutup).',
  },
  '閉める': {
    primaryMeaning: 'Menutup (dilakukan oleh seseorang secara sengaja)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 閉める (menutup pintu/jendela)',
    clarificationNote: 'Menyatakan aksi aktif seseorang menutup jendela, pintu, atau penutup kotak.',
    contrastPair: {
      word: '閉まる',
      reading: 'shimaru',
      difference: 'Tertutup (intransitif: tertutup sendiri)',
    },
    usageHint: '寒いのでドアを閉めてください (Tolong tutup pintunya karena dingin).',
  },
  'つく': {
    primaryMeaning: 'Menyala (lampu / listrik hidup sendiri)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が つく (lampu menyala)',
    clarificationNote: 'Menyatakan lampu atau listrik dalam keadaan menyala / hidup.',
    contrastPair: {
      word: 'つける',
      reading: 'tsukeru',
      difference: 'Menyalakan (transitif: menekan saklar untuk menghidupkan)',
    },
  },
  'つける': {
    primaryMeaning: 'Menyalakan (lampu, AC, televisi, atau saklar)',
    secondaryMeanings: ['Memakai (aksesori jam tangan / masker)'],
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を つける (menyalakan AC/lampu)',
    clarificationNote: 'Aksi sengaja seseorang menyalakan peralatan elektronik atau mengenakan aksesori.',
    contrastPair: {
      word: 'つく',
      reading: 'tsuku',
      difference: 'Menyala (intransitif: lampu menyala)',
    },
  },
  '消える': {
    primaryMeaning: 'Padam / Mati / Lenyap (lampu mati / hilang sendiri)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 消える (lampu padam / api padam)',
    clarificationNote: 'Menyatakan keadaan api atau lampu yang padam dengan sendirinya.',
    contrastPair: {
      word: '消す',
      reading: 'kesu',
      difference: 'Mematikan / Memadamkan / Menghapus (transitif)',
    },
  },
  '消す': {
    primaryMeaning: 'Mematikan / Memadamkan / Menghapus tulisan',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 消す (mematikan TV/lampu, menghapus papan)',
    clarificationNote: 'Aksi seseorang memadamkan api, mematikan tombol alat listrik, atau menghapus papan tulis.',
    contrastPair: {
      word: '消える',
      reading: 'kieru',
      difference: 'Padam / Mati sendiri (intransitif)',
    },
  },
  '入る': {
    primaryMeaning: 'Masuk (ke dalam ruangan / wadah / masuk universitas)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜に 入る (masuk ke dalam kamar / bak mandi)',
    clarificationNote: 'Menyatakan subjek bergerak masuk ke dalam suatu tempat atau wadah.',
    contrastPair: {
      word: '入れる',
      reading: 'ireru',
      difference: 'Memasukkan (transitif: memasukkan benda ke saku/tas)',
    },
    usageHint: 'お風呂に入ります (Masuk berendam di ofuro / bak mandi).',
  },
  '入れる': {
    primaryMeaning: 'Memasukkan (menaruh benda ke dalam wadah / membuat teh)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜に 〜を 入れる (memasukkan dompet ke tas)',
    clarificationNote: 'Aksi memasukkan benda atau menuangkan minuman ke cangkir (ocha o ireru).',
    contrastPair: {
      word: '入る',
      reading: 'hairu',
      difference: 'Masuk (intransitif)',
    },
  },
  '出る': {
    primaryMeaning: 'Keluar (dari ruangan / meninggalkan rumah / tamat)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜を/から 出る (keluar dari kamar / lulus universitas)',
    clarificationNote: 'Menyatakan subjek beranjak keluar dari tempat tertutup menuju tempat luar.',
    contrastPair: {
      word: '出す',
      reading: 'dasu',
      difference: 'Mengeluarkan / Menyerahkan tugas (transitif)',
    },
  },
  '出す': {
    primaryMeaning: 'Mengeluarkan (benda dari tas) / Menyerahkan (tugas/laporan)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 出す (mengeluarkan buku / mengumpulkan PR)',
    clarificationNote: 'Aksi mengeluarkan benda dari dalam atau menyerahkan dokumen/surat/tugas ke orang lain.',
    contrastPair: {
      word: '出る',
      reading: 'deru',
      difference: 'Keluar (intransitif)',
    },
  },
  '止まる': {
    primaryMeaning: 'Berhenti (mobil / kereta / mesin berhenti bergerak)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 止まる (mobil berhenti)',
    clarificationNote: 'Menyatakan kendaraan atau benda bergerak yang berhenti.',
    contrastPair: {
      word: '止める',
      reading: 'tomeru',
      difference: 'Menghentikan / Memarkir (transitif)',
    },
  },
  '止める': {
    primaryMeaning: 'Menghentikan / Memarkir kendaraan / Mematikan keran air',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 止める (memarkir mobil / mematikan air keran)',
    clarificationNote: 'Tindakan seseorang menginjak rem, menghentikan sesuatu, atau memarkir kendaraan.',
    contrastPair: {
      word: '止まる',
      reading: 'tomaru',
      difference: 'Berhenti sendiri (intransitif)',
    },
  },
  '泊まる': {
    primaryMeaning: 'Menginap sementara (di hotel / ryokan / rumah teman)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜に 泊まる (menginap di hotel)',
    clarificationNote: 'Beda kanji dengan 止まる (berhenti); 泊まる khusus untuk menginap tidur di suatu tempat.',
    contrastPair: {
      word: '住む',
      reading: 'sumu',
      difference: 'Tinggal menetap permanen (bukan menginap sementara)',
    },
    usageHint: 'ホテルに一晩泊まりました (Menginap semalam di hotel).',
  },
  '落ちる': {
    primaryMeaning: 'Jatuh (sendirinya / tergelincir / tidak lulus ujian)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 落ちる (daun jatuh / ujian tidak lolos)',
    clarificationNote: 'Benda yang jatuh karena gravitasi tanpa sengaja atau gagal dalam ujian.',
    contrastPair: {
      word: '落とす',
      reading: 'otosu',
      difference: 'Menjatuhkan (menjatuhkan barang / menghilangkan dompet)',
    },
  },
  '落とす': {
    primaryMeaning: 'Menjatuhkan (benda) / Menghilangkan (dompet / kunci)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 落とす (menjatuhkan gelas / dompet hilang terjatuh)',
    clarificationNote: 'Tindakan menjatuhkan suatu benda atau menghilangkan barang di jalan.',
    contrastPair: {
      word: '落ちる',
      reading: 'ochiru',
      difference: 'Jatuh sendirinya (intransitif)',
    },
  },
  '始まる': {
    primaryMeaning: 'Dimulai (acara / pelajaran / film mulai)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 始まる (kuliah dimulai)',
    clarificationNote: 'Menyatakan suatu kegiatan atau waktu telah tiba saatnya mulai.',
    contrastPair: {
      word: '始める',
      reading: 'hajimeru',
      difference: 'Memulai (transitif: seseorang mulai mengerjakan sesuatu)',
    },
  },
  '始める': {
    primaryMeaning: 'Memulai (mengerjakan tugas / memulai bisnis / makan)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 始める (memulai belajar / memulai makan)',
    clarificationNote: 'Aksi aktif seseorang mengawali suatu pekerjaan atau hobi baru.',
    contrastPair: {
      word: '始まる',
      reading: 'hajimaru',
      difference: 'Dimulai (intransitif)',
    },
  },
  '終わる': {
    primaryMeaning: 'Berakhir / Selesai (jam kerja selesai / liburan berakhir)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 終わる (rapat selesai)',
    clarificationNote: 'Menyatakan suatu rentang waktu atau kegiatan telah rampung.',
    contrastPair: {
      word: '終える',
      reading: 'oeru',
      difference: 'Menyelesaikan pekerjaan (transitif)',
    },
  },
  '壊れる': {
    primaryMeaning: 'Rusak / Hancur (mesin / jam / hubungan rusak sendiri)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 壊れる (komputer rusak)',
    clarificationNote: 'Keadaan barang yang mengalami kerusakan bukan karena sengaja dirusak.',
    contrastPair: {
      word: '壊す',
      reading: 'kowasu',
      difference: 'Merusakkan / Menghancurkan (transitif)',
    },
  },
  '壊す': {
    primaryMeaning: 'Merusakkan / Menghancurkan / Merusak kesehatan badan',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 壊す (merusak mainan / merusak kondisi badan)',
    clarificationNote: 'Aksi seseorang merusak barang atau mengganggu kesehatannya (karada o kowasu).',
    contrastPair: {
      word: '壊れる',
      reading: 'kowareru',
      difference: 'Rusak sendiri (intransitif)',
    },
  },
  '直る': {
    primaryMeaning: 'Membaik / Normal kembali (mesin rusak kembali berfungsi normal)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 直る (komputer sudah beres / normal lagi)',
    clarificationNote: 'Khusus untuk barang mesin, suasana, atau kebiasaan buruk yang sudah kembali normal.',
    contrastPair: {
      word: '直す',
      reading: 'naosu',
      difference: 'Memperbaiki / Membetulkan barang (transitif)',
    },
  },
  '直す': {
    primaryMeaning: 'Memperbaiki (barang rusak) / Mengoreksi (kesalahan tulisan)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 直す (memperbaiki jam / membetulkan kesalahan)',
    clarificationNote: 'Aksi seseorang mereparasi alat atau mengoreksi tulisan salah.',
    contrastPair: {
      word: '直る',
      reading: 'naoru',
      difference: 'Membaik sendiri (intransitif)',
    },
  },
  '治る': {
    primaryMeaning: 'Sembuh (dari penyakit / luka fisik)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 治る (batuk/demam sudah sembuh)',
    clarificationNote: 'Khusus untuk kesembuhan penyakit tubuh manusia atau luka luar.',
    contrastPair: {
      word: '治す',
      reading: 'naosu',
      difference: 'Mengobati / Menyembuhkan (transitif)',
    },
  },
  '治す': {
    primaryMeaning: 'Mengobati / Menyembuhkan (penyakit / luka tubuh)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 治す (mengobati flu / merawat luka)',
    clarificationNote: 'Aksi dokter atau pasien dalam mengobati dan menyembuhkan penyakit.',
    contrastPair: {
      word: '治る',
      reading: 'naoru',
      difference: 'Sembuh (intransitif)',
    },
  },
  '集まる': {
    primaryMeaning: 'Berkumpul (orang-orang berkumpul di satu tempat)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 集まる (siswa berkumpul di depan kelas)',
    clarificationNote: 'Orang-orang atau hewan yang datang berkerumun.',
    contrastPair: {
      word: '集める',
      reading: 'atsumeru',
      difference: 'Mengumpulkan (koleksi perangko/uang) (transitif)',
    },
  },
  '集める': {
    primaryMeaning: 'Mengumpulkan (mengoleksi barang / menghimpun orang)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 集める (mengumpulkan koin / mengoleksi buku)',
    clarificationNote: 'Aksi seseorang menghimpun atau mengoleksi barang/data.',
    contrastPair: {
      word: '集まる',
      reading: 'atsumaru',
      difference: 'Berkumpul sendiri (intransitif)',
    },
  },
  '見つかる': {
    primaryMeaning: 'Ditemukan / Ketemu (kunci yang hilang sudah ketemu)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 見つかる (pekerjaan ditemukan / kunci ketemu)',
    clarificationNote: 'Sesuatu yang tadinya dicari akhirnya muncul atau ditemukan.',
    contrastPair: {
      word: '見つける',
      reading: 'mitsukeru',
      difference: 'Menemukan (mencari aktif sampai dapat) (transitif)',
    },
  },
  '見つける': {
    primaryMeaning: 'Menemukan (mencari secara aktif hingga mendapatkan)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 見つける (menemukan solusi / menemukan dompet)',
    clarificationNote: 'Aksi aktif mata dan pikiran seseorang dalam mendeteksi dan menemukan sesuatu.',
    contrastPair: {
      word: '見つかる',
      reading: 'mitsukaru',
      difference: 'Ditemukan / Ketemu (intransitif)',
    },
  },
  '決まる': {
    primaryMeaning: 'Ditetapkan / Sudah diputuskan (jadwal / aturan sudah fiks)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 決まる (tanggal ujian sudah ditetapkan)',
    clarificationNote: 'Menyatakan bahwa keputusan telah tercapai.',
    contrastPair: {
      word: '決める',
      reading: 'kimeru',
      difference: 'Menentukan / Memutuskan (transitif)',
    },
  },
  '決める': {
    primaryMeaning: 'Menentukan / Memutuskan (pilihan / menu makanan / rencana)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 決める (menentukan masa depan / memilih menu)',
    clarificationNote: 'Aksi seseorang mengambil keputusan secara sadar.',
    contrastPair: {
      word: '決まる',
      reading: 'kimaru',
      difference: 'Terputuskan (intransitif)',
    },
  },
  '変わる': {
    primaryMeaning: 'Berubah (situasi / cuaca / warna berubah sendiri)',
    contextBadge: { text: 'Intransitif (自動詞)', variant: 'intransitive' },
    particleHint: '〜が 変わる (musim berganti / sinyal lampu berubah)',
    clarificationNote: 'Perubahan keadaan yang terjadi secara alami.',
    contrastPair: {
      word: '変える',
      reading: 'kaeru',
      difference: 'Mengubah / Mengganti (transitif)',
    },
  },
  '変える': {
    primaryMeaning: 'Mengubah / Mengganti (jadwal / nomor sandi / pola hidup)',
    contextBadge: { text: 'Transitif (他動詞)', variant: 'transitive' },
    particleHint: '〜を 変える (mengubah gaya rambut / mengganti rencana)',
    clarificationNote: 'Aksi seseorang melakukan modifikasi pada suatu hal.',
    contrastPair: {
      word: '変わる',
      reading: 'kawaru',
      difference: 'Berubah sendiri (intransitif)',
    },
  },

  // === HOMOFON KATA SIFAT (ATSUI, SAMUI, TSUMETAI, HAYAI, DSB.) ===
  '暑い': {
    primaryMeaning: 'Panas (khusus hawa cuaca & suhu udara di sekitar)',
    contextBadge: { text: 'Cuaca / Udara', variant: 'context' },
    clarificationNote: 'Digunakan hanya untuk suhu lingkungan atau hari yang terik. TIDAK untuk kopi panas atau demam.',
    contrastPair: {
      word: '熱い',
      reading: 'atsui',
      difference: 'Panas suhu benda, air, makanan, atau sentuhan fisik',
    },
    usageHint: '今日はとても暑いですね (Hari ini panas sekali ya).',
  },
  '熱い': {
    primaryMeaning: 'Panas (khusus suhu benda, makanan, air mendidih, atau demam)',
    contextBadge: { text: 'Suhu Benda / Makanan', variant: 'context' },
    clarificationNote: 'Digunakan saat menyentuh kopi panas, sup, wajan, atau dahi yang demam. TIDAK untuk cuaca musim panas.',
    contrastPair: {
      word: '暑い',
      reading: 'atsui',
      difference: 'Panas untuk cuaca/iklim udara',
    },
    usageHint: '熱いお茶を飲みます (Minum teh panas).',
  },
  '厚い': {
    primaryMeaning: 'Tebal (ketebalan buku, lapisan kain, jaket tebal, lempengan)',
    contextBadge: { text: 'Ketebalan Fisik', variant: 'context' },
    clarificationNote: 'Ukuran ketebalan suatu benda padat. Lawan katanya adalah 薄い (usui - tipis).',
    contrastPair: {
      word: '太い',
      reading: 'futoi',
      difference: 'Gemuk / silinder berdiameter besar (batang pohon, kaki, tali)',
    },
    usageHint: 'この辞書はとても厚いです (Kamus ini sangat tebal).',
  },
  '寒い': {
    primaryMeaning: 'Dingin (khusus hawa cuaca & suhu udara luar)',
    contextBadge: { text: 'Cuaca / Udara', variant: 'context' },
    clarificationNote: 'Digunakan saat merasa kedinginan karena angin musim dingin atau suhu ruangan.',
    contrastPair: {
      word: '冷たい',
      reading: 'tsumetai',
      difference: 'Dingin untuk minuman, es, benda yang disentuh, atau sifat orang yang cuek',
    },
    usageHint: '冬はとても寒いです (Musim dingin sangatlah dingin).',
  },
  '冷たい': {
    primaryMeaning: 'Dingin (khusus suhu benda, minuman es, sentuhan, atau sifat dingin/cuek)',
    contextBadge: { text: 'Suhu Benda / Sikap', variant: 'context' },
    clarificationNote: 'Digunakan untuk es batu, air dingin kulkas, telapak tangan dingin, atau orang yang bersikap dingin.',
    contrastPair: {
      word: '寒い',
      reading: 'samui',
      difference: 'Dingin untuk suhu cuaca/udara luar',
    },
    usageHint: '冷たいジュースをください (Minta jus yang dingin).',
  },
  '早い': {
    primaryMeaning: 'Cepat / Lebih awal (terkait jam, waktu, atau bangun pagi)',
    contextBadge: { text: 'Waktu / Jam / Pagi', variant: 'context' },
    clarificationNote: 'Menunjukkan waktu yang lebih dini daripada jadwal biasa (misal bangun pagi-pagi sekali).',
    contrastPair: {
      word: '速い',
      reading: 'hayai',
      difference: 'Cepat dalam hal laju pergerakan, lari, atau kendaraan',
    },
    usageHint: '今朝は早く起きました (Pagi ini saya bangun lebih awal).',
  },
  '速い': {
    primaryMeaning: 'Cepat (terkait laju kecepatan gerak, mobil, lari, atau pengerjaan)',
    contextBadge: { text: 'Laju Kecepatan', variant: 'context' },
    clarificationNote: 'Menunjukkan kecepatan tempuh per kilometer/jam atau gerakan yang gesit.',
    contrastPair: {
      word: '早い',
      reading: 'hayai',
      difference: 'Cepat/awal terkait waktu jam di pagi hari',
    },
    usageHint: '新幹線はとても速いです (Shinkansen melaju sangat cepat).',
  },
  '暖かい': {
    primaryMeaning: 'Hangat (khusus hawa cuaca musim semi / iklim yang nyaman)',
    contextBadge: { text: 'Cuaca / Udara', variant: 'context' },
    clarificationNote: 'Digunakan saat cuaca mulai menghangat di musim semi.',
    contrastPair: {
      word: '温かい',
      reading: 'atatakai',
      difference: 'Hangat untuk sup, makanan, benda, atau kehangatan hati/keluarga',
    },
  },
  '温かい': {
    primaryMeaning: 'Hangat (khusus suhu sup, makanan, air mandi, atau kehangatan hati)',
    contextBadge: { text: 'Suhu Benda / Hati', variant: 'context' },
    clarificationNote: 'Digunakan untuk makanan hangat (sup, nasi), selimut hangat, atau senyuman ramah.',
    contrastPair: {
      word: '暖かい',
      reading: 'atatakai',
      difference: 'Hangat untuk hawa cuaca',
    },
  },

  // === RAGAM KATA KERJA "MEMAKAI" (KIRU, HAKU, KABURU, KAKERU, DSB.) ===
  '着る': {
    primaryMeaning: 'Memakai (khusus pakaian bagian tubuh atas: kemeja, kaos, jas, jaket, gaun)',
    contextBadge: { text: 'Pakaian Tubuh Atas', variant: 'context' },
    particleHint: '〜を 着る (memakai baju/jaket)',
    clarificationNote: 'HANYA untuk baju dari pundak ke bawah tubuh atas. TIDAK untuk celana atau sepatu.',
    contrastPair: {
      word: '履く',
      reading: 'haku',
      difference: 'Memakai untuk bawahan (celana, rok) dan alas kaki (sepatu, sandal)',
    },
    usageHint: 'シャツを着ます (Memakai kemeja).',
  },
  '履く': {
    primaryMeaning: 'Memakai (khusus pakaian bawahan & alas kaki: celana, rok, kaos kaki, sepatu, sandal)',
    contextBadge: { text: 'Bawahan & Alas Kaki', variant: 'context' },
    particleHint: '〜を 履く (memakai celana/sepatu)',
    clarificationNote: 'Digunakan untuk apa pun yang dimasukkan dari kaki ke atas (celana, sepatu, kaos kaki).',
    contrastPair: {
      word: '着る',
      reading: 'kiru',
      difference: 'Memakai untuk baju atasan',
    },
    usageHint: 'ズボンと靴を履きます (Memakai celana dan sepatu).',
  },
  '被る': {
    primaryMeaning: 'Memakai (khusus penutup kepala: topi, helm, atau kerudung)',
    contextBadge: { text: 'Penutup Kepala', variant: 'context' },
    particleHint: '〜を 被る (memakai topi/helm)',
    clarificationNote: 'Digunakan untuk benda yang disarungkan menutupi kepala.',
    contrastPair: {
      word: '掛ける',
      reading: 'kakeru',
      difference: 'Memakai kacamata (disangkutkan ke telinga)',
    },
    usageHint: '帽子を被ります (Mengenakan topi).',
  },
  '脱ぐ': {
    primaryMeaning: 'Melepas (segala jenis pakaian, baju atasan, celana, maupun sepatu)',
    contextBadge: { text: 'Melepas Pakaian', variant: 'context' },
    particleHint: '〜を 脱ぐ (melepas sepatu/baju)',
    clarificationNote: 'Berlaku universal untuk melepas semua jenis pakaian dan alas kaki.',
    usageHint: '玄関で靴を脱いでください (Tolong lepas sepatu di pintu masuk).',
  },
  'かける': {
    primaryMeaning: 'Mengenakan / Memakai (khusus kacamata: disangkutkan ke telinga/hidung)',
    contextBadge: { text: 'Kacamata (Transitif)', variant: 'transitive' },
    particleHint: '眼鏡（めがね）を かける / かけます',
    clarificationNote: 'Kata kerja Golongan 2 (Ichidan). Khusus untuk kacamata (megane). Tanda [を] menandai objek kacamata.',
    contrastPair: {
      word: '被る (かぶる)',
      reading: 'kaburu',
      difference: 'Memakai penutup kepala (topi, helm). Kakeru khusus kacamata.',
    },
    usageHint: '眼鏡をかけます (Memakai kacamata) / 電話をかけます (Menelepon).',
  },
  'かけます': {
    primaryMeaning: 'Mengenakan / Memakai (khusus kacamata: 眼鏡をかけます)',
    contextBadge: { text: 'Kacamata (Transitif)', variant: 'transitive' },
    particleHint: '眼鏡（めがね）を かけます',
    clarificationNote: 'Kata kerja Golongan 2 (Ichidan, bentuk ~masu dari かける). Selalu dipasangkan dengan partikel を untuk objek kacamata (めがねをかけます).',
    contrastPair: {
      word: '着ます / かぶります',
      reading: 'kimasu / kaburimasu',
      difference: 'Baju atasan (kimasu), topi (kaburimasu), celana (hakimasu), kacamata (kakemasu).',
    },
    usageHint: '眼鏡をかけます (Memakai kacamata).',
  },

  // === MEMBERI & MENERIMA (AGERU, KURERU, MORAU) ===
  'あげる': {
    primaryMeaning: 'Memberikan (dari SAYA kepada orang lain, atau pihak ketiga ke pihak lain)',
    contextBadge: { text: 'Memberi (ke luar)', variant: 'nuance' },
    particleHint: '[Pemberi] は [Penerima] に 〜を あげる',
    clarificationNote: 'Arah pemberian menjauh dari pembicara (saya memberi ke teman, atau Budi memberi ke Siti). JANGAN gunakan jika orang lain memberi ke Anda.',
    contrastPair: {
      word: 'くれる',
      reading: 'kureru',
      difference: 'Memberikan KEPADA SAYA (arah masuk ke pembicara)',
    },
    usageHint: '私は友達にプレゼントをあげました (Saya memberi kado ke teman).',
  },
  'くれる': {
    primaryMeaning: 'Memberikan (dari orang lain KEPADA SAYA atau keluarga/pihak saya)',
    contextBadge: { text: 'Memberi (ke saya)', variant: 'nuance' },
    particleHint: '[Orang Lain] が [Saya/Pihak Saya] に 〜を くれる',
    clarificationNote: 'Arah pemberian masuk menuju diri pembicara. Selalu berarti orang lain yang berbaik hati memberi ke saya/kami.',
    contrastPair: {
      word: 'あげる',
      reading: 'ageru',
      difference: 'Memberi ke orang lain (arah menjauh dari saya)',
    },
    usageHint: '田中さんが私にお菓子をくれました (Tanaka-san memberi kue ke saya).',
  },
  'もらう': {
    primaryMeaning: 'Menerima (mendapatkan sesuatu dari orang lain)',
    contextBadge: { text: 'Menerima (dari orang)', variant: 'nuance' },
    particleHint: '[Penerima] は [Pemberi] に/から 〜を もらう',
    clarificationNote: 'Fokus pada sudut pandang penerima yang mendapatkan barang/bantuan dari pihak lain.',
    contrastPair: {
      word: 'あげる',
      reading: 'ageru',
      difference: 'Memberikan (bukan menerima)',
    },
    usageHint: '先生から本をもらいました (Saya menerima buku dari guru).',
  },

  // === TAHU vs MENGERTI vs BISA (SHIRU, WAKARU, DEKIRU) ===
  '知る': {
    primaryMeaning: 'Tahu / Mengetahui (informasi dari luar / mengenal seseorang)',
    contextBadge: { text: 'Informasi Luar', variant: 'context' },
    particleHint: '〜を 知る / 〜を 知っています (tahu nomor telpon/kenal orang)',
    clarificationNote: 'Mengetahui fakta bahwa sesuatu itu ada karena pernah mendengar atau melihat informasinya dari luar.',
    contrastPair: {
      word: '分かる',
      reading: 'wakaru',
      difference: 'Mengerti / memahami makna isi atau logika di dalam pikiran',
    },
    usageHint: 'あの人の名前を知っていますか (Apakah tahu nama orang itu?).',
  },
  '分かる': {
    primaryMeaning: 'Mengerti / Paham (mencerna isi, logika, atau makna di dalam pikiran)',
    contextBadge: { text: 'Pemahaman Pikiran', variant: 'context' },
    particleHint: '〜が 分かる (paham bahasa Jepang / mengerti alasan)',
    clarificationNote: 'Menggunakan partikel GA (bukan O). Menunjukkan proses pemahaman logika di kepala.',
    contrastPair: {
      word: '知る',
      reading: 'shiru',
      difference: 'Mengetahui sekadar info bahwa sesuatu itu ada',
    },
    usageHint: '日本語がよく分かります (Saya sangat mengerti bahasa Jepang).',
  },
  'できる': {
    primaryMeaning: 'Bisa / Mampu melakukan keahlian / Selesai dibuat / Terbentuk',
    contextBadge: { text: 'Kemampuan / Selesai', variant: 'context' },
    particleHint: '〜が できる (bisa berenang / makanan sudah siap)',
    clarificationNote: 'Menunjukkan kapabilitas diri atau selesainya suatu proyek/makanan (gohan ga dekita).',
    usageHint: 'ピアノを弾くことができます (Saya bisa bermain piano).',
  },

  // === PINJAM & MENGAJAR (KARIRU, KASU, OSHIERU, NARAU) ===
  '借りる': {
    primaryMeaning: 'Meminjam (DARI orang lain untuk saya pakai sementara)',
    contextBadge: { text: 'Meminjam (dari orang)', variant: 'nuance' },
    particleHint: '[Orang Lain] に/から 〜を 借りる (pinjam uang dari bank/teman)',
    clarificationNote: 'Subjek adalah orang yang meminta izin memakai barang milik pihak lain.',
    contrastPair: {
      word: '貸す',
      reading: 'kasu',
      difference: 'Meminjamkan (menyerahkan barang ke orang lain)',
    },
    usageHint: '図書館で本を借ります (Meminjam buku di perpustakaan).',
  },
  '貸す': {
    primaryMeaning: 'Meminjamkan (KEPADA orang lain agar dia bisa memakainya)',
    contextBadge: { text: 'Meminjamkan (ke orang)', variant: 'nuance' },
    particleHint: '[Orang Lain] に 〜を 貸す (meminjamkan payung ke teman)',
    clarificationNote: 'Subjek adalah pemilik barang yang mengizinkan orang lain menggunakannya.',
    contrastPair: {
      word: '借りる',
      reading: 'kariru',
      difference: 'Meminjam dari orang',
    },
    usageHint: '友達に傘を貸しました (Saya meminjamkan payung ke teman).',
  },
  '教える': {
    primaryMeaning: 'Mengajar (ilmu) / Memberitahukan (informasi nomor telpon, alamat, atau cara jalan)',
    contextBadge: { text: 'Mengajar / Beritahu', variant: 'context' },
    particleHint: '〜に 〜を 教える (mengajari siswa / beritahu nomor HP)',
    clarificationNote: 'Dapat bermakna mengajarkan pelajaran, ATAU memberitahu informasi yang ditanyakan orang.',
    contrastPair: {
      word: '習う',
      reading: 'narau',
      difference: 'Belajar dari seorang guru atau instruktur',
    },
    usageHint: '電話番号を教えてください (Tolong beritahu nomor telepon Anda).',
  },
  '習う': {
    primaryMeaning: 'Belajar (DARI seorang guru, mentor, atau tempat kursus)',
    contextBadge: { text: 'Belajar dari Guru', variant: 'context' },
    particleHint: '〜に 〜を 習う (belajar piano dari guru)',
    clarificationNote: 'Khusus untuk proses belajar yang menerima bimbingan langsung dari seseorang.',
    contrastPair: {
      word: '勉強する',
      reading: 'benkyou suru',
      difference: 'Belajar secara umum atau belajar mandiri membaca buku',
    },
    usageHint: '先生にピアノを習っています (Saya sedang belajar piano dari guru).',
  },

  // === KENDARAAN & ARAH (NORU, ORIRU, DSB.) ===
  '乗る': {
    primaryMeaning: 'Naik / Menumpang kendaraan (kereta, bus, taksi, sepeda, pesawat)',
    contextBadge: { text: 'Naik Kendaraan', variant: 'context' },
    particleHint: '〜に 乗る (selalu partikel NI, misal densha ni noru)',
    clarificationNote: 'Wajib menggunakan partikel NI untuk kendaraannya (bukan partikel O).',
    contrastPair: {
      word: '降りる',
      reading: 'oriru',
      difference: 'Turun dari kendaraan (menggunakan partikel O)',
    },
    usageHint: '電車に乗ります (Naik kereta listrik).',
  },
  '降りる': {
    primaryMeaning: 'Turun (dari dalam kendaraan bus, kereta, atau kapal)',
    contextBadge: { text: 'Turun Kendaraan', variant: 'context' },
    particleHint: '〜を 降りる (menggunakan partikel O, misal basu o oriru)',
    clarificationNote: 'Menggunakan partikel O untuk kendaraan yang ditinggalkan.',
    contrastPair: {
      word: '乗る',
      reading: 'noru',
      difference: 'Naik kendaraan (partikel NI)',
    },
    usageHint: '次の駅で降ります (Turun di stasiun berikutnya).',
  },

  // === HOMOGRAF BAHASA INDONESIA & AMBIGUITAS LAINNYA ===
  '豆腐': {
    primaryMeaning: 'Tahu (makanan padat olahan kedelai putih)',
    contextBadge: { text: 'Makanan Kedelai', variant: 'context' },
    clarificationNote: 'Jangan tertukar dengan kata "tahu / mengetahui" (知る / shiru). Ini adalah bahan makanan.',
    contrastPair: {
      word: '知る',
      reading: 'shiru',
      difference: 'Tahu / Mengetahui fakta informasi',
    },
  },
  '時計': {
    primaryMeaning: 'Jam fisik (arloji tangan atau jam dinding penunjuk waktu)',
    contextBadge: { text: 'Alat Fisik Jam', variant: 'context' },
    clarificationNote: 'Khusus untuk benda alatnya (arloji/jam dinding). Bukan lamanya durasi waktu.',
    contrastPair: {
      word: '時間',
      reading: 'jikan',
      difference: 'Waktu luang atau durasi lamanya jam (misal 3 jam)',
    },
    usageHint: 'この時計は正確です (Jam tangan ini akurat).',
  },
  '時間': {
    primaryMeaning: 'Waktu luang / Durasi lamanya jam (misal 2 jam perjalanan)',
    contextBadge: { text: 'Waktu / Durasi', variant: 'context' },
    clarificationNote: 'Bukan benda fisik jam tangan (tokei), melainkan waktu itu sendiri.',
    contrastPair: {
      word: '時計',
      reading: 'tokei',
      difference: 'Alat penunjuk waktu fisik (arloji / jam dinding)',
    },
    usageHint: '今は時間がありません (Sekarang saya tidak punya waktu luang).',
  },
  '住む': {
    primaryMeaning: 'Tinggal / Menetap berdomisili (dalam jangka panjang / bertempat tinggal)',
    contextBadge: { text: 'Domisili Panjang', variant: 'context' },
    particleHint: '〜に 住む (bertempat tinggal di Jakarta/Tokyo)',
    clarificationNote: 'Bukan menginap sementara waktu (泊まる / tomaru), melainkan alamat tinggal resmi.',
    contrastPair: {
      word: '泊まる',
      reading: 'tomaru',
      difference: 'Menginap sementara (di hotel / ryokan / rumah teman)',
    },
    usageHint: '東京に住んでいます (Saya tinggal berdomisili di Tokyo).',
  },
  '会う': {
    primaryMeaning: 'Bertemu / Menjumpai seseorang (teman, klien, guru)',
    contextBadge: { text: 'Pertemuan Orang', variant: 'context' },
    particleHint: '〜に 会う (partikel NI untuk orang yang ditemui)',
    clarificationNote: 'Wajib menggunakan partikel NI untuk orang yang Anda temui: 友達に会う (tomodachi ni au).',
    usageHint: '明日駅で友達に会います (Besok saya akan bertemu teman di stasiun).',
  },
  '見る': {
    primaryMeaning: 'Melihat / Menonton secara sadar & sengaja (film, televisi, pemandangan)',
    contextBadge: { text: 'Melihat Aktif', variant: 'context' },
    particleHint: '〜を 見る (menonton TV, melihat foto)',
    clarificationNote: 'Aksi mata yang diarahkan dengan sengaja. Lawan dari sekadar terlihat tanpa sengaja (見える / mieru).',
    contrastPair: {
      word: '見える',
      reading: 'mieru',
      difference: 'Terlihat / nampak di mata tanpa perlu sengaja dicari (partikel GA)',
    },
  },
  '見える': {
    primaryMeaning: 'Terlihat / Nampak di pandangan mata secara alami tanpa sengaja',
    contextBadge: { text: 'Nampak di Mata', variant: 'context' },
    particleHint: '〜が 見える (pemandangan gunung Fuji terlihat dari jendela)',
    clarificationNote: 'Subjek menggunakan partikel GA. Menyatakan kemampuan indra penglihatan menangkap bayangan objek.',
    contrastPair: {
      word: '見る',
      reading: 'miru',
      difference: 'Melihat / menonton dengan sengaja (partikel O)',
    },
    usageHint: '窓から富士山が見えます (Gunung Fuji terlihat dari jendela).',
  },
  '聞く': {
    primaryMeaning: 'Mendengar / Menyimak musik ATAU Bertanya kepada seseorang',
    secondaryMeanings: ['Mendengarkan (musik/radio)', 'Bertanya (kepada guru/orang)'],
    contextBadge: { text: 'Dua Makna: Dengar / Tanya', variant: 'nuance' },
    particleHint: '〜を 聞く (mendengar musik) / 〜に 聞く (bertanya ke orang)',
    clarificationNote: 'Jika partikelnya O artinya mendengar musik; jika partikelnya NI artinya bertanya/mencari tahu ke seseorang (misal: 先生に聞く).',
    contrastPair: {
      word: '聞こえる',
      reading: 'kikoeru',
      difference: 'Terdengar secara alami di telinga tanpa sengaja (partikel GA)',
    },
  },
  '聞こえる': {
    primaryMeaning: 'Terdengar (suara masuk ke telinga secara alami tanpa sengaja)',
    contextBadge: { text: 'Terdengar di Telinga', variant: 'context' },
    particleHint: '〜が 聞こえる (terdengar suara burung / suara ombak)',
    clarificationNote: 'Menggunakan partikel GA. Menyatakan indra pendengaran menangkap gelombang suara.',
    contrastPair: {
      word: '聞く',
      reading: 'kiku',
      difference: 'Mendengarkan secara sengaja atau bertanya (partikel O/NI)',
    },
    usageHint: '隣の部屋から声が聞こえます (Terdengar suara dari kamar sebelah).',
  },
  '言う': {
    primaryMeaning: 'Berkata / Mengucapkan satu kalimat atau nama tertentu',
    contextBadge: { text: 'Mengucap Kalimat', variant: 'context' },
    particleHint: '〜と 言う (mengucapkan kata "...")',
    clarificationNote: 'Fokus pada konten kata atau kalimat yang diucapkan secara spesifik.',
    contrastPair: {
      word: '話す',
      reading: 'hanasu',
      difference: 'Berbicara dua arah, mengobrol, bercerita, atau menguasai bahasa',
    },
  },
  '話す': {
    primaryMeaning: 'Berbicara / Mengobrol / Menceritakan kisah / Berbahasa',
    contextBadge: { text: 'Mengobrol / Berbahasa', variant: 'context' },
    particleHint: '〜と 話す (mengobrol dengan teman) / 〜語を 話す (berbahasa)',
    clarificationNote: 'Komunikasi dua arah yang berkelanjutan atau kemampuan berbicara suatu bahasa.',
    contrastPair: {
      word: '言う',
      reading: 'iu',
      difference: 'Sekadar melontarkan ucapan atau kata tertentu',
    },
    usageHint: '日本語で話しましょう (Mari kita berbicara dalam bahasa Jepang).',
  },
  '大切': {
    primaryMeaning: 'Penting & Berharga (disayangi secara emosional / pribadi)',
    contextBadge: { text: 'Penting Emosional', variant: 'context' },
    clarificationNote: 'Untuk orang, keluarga, sahabat, hewan peliharaan, atau kenangan yang disayangi dengan tulus.',
    contrastPair: {
      word: '重要',
      reading: 'juuyou',
      difference: 'Penting secara objektif, formal, bisnis, atau hukum negara',
    },
    usageHint: '家族は私にとって一番大切です (Keluarga adalah yang paling berharga bagi saya).',
  },
  '大事': {
    primaryMeaning: 'Penting & Kritis (bila hilang atau rusak akan berakibat fatal)',
    contextBadge: { text: 'Penting Kritis', variant: 'context' },
    clarificationNote: 'Untuk hal krusial seperti dokumen paspor, kesehatan diri, atau rahasia penting.',
    contrastPair: {
      word: '大切',
      reading: 'taisetsu',
      difference: 'Penting karena disayangi secara hati/perasaan',
    },
    usageHint: 'お体を大事にしてください (Jagalah kesehatan tubuh Anda baik-baik).',
  },
  '重要': {
    primaryMeaning: 'Penting (secara objektif, formal, bisnis, proyek, atau hukum)',
    contextBadge: { text: 'Penting Formal/Objektif', variant: 'context' },
    clarificationNote: 'Kata yang sangat sering dipakai di dunia kantor, rapat, dan dokumen resmi negara.',
    contrastPair: {
      word: '大切',
      reading: 'taisetsu',
      difference: 'Penting personal dan emosional',
    },
  },
};

/**
 * Membersihkan string arti kasar agar tidak membingungkan:
 * - Menghilangkan kurung ambigu di tengah kalimat
 * - Memisahkan slash menjadi arti utama dan sekunder
 * - Menormalisasi kapitalisasi dan spasi
 */
export function cleanRawMeaning(rawMeaning: string): {
  primary: string;
  contextTag?: string;
  alternatives: string[];
} {
  if (!rawMeaning) return { primary: '', alternatives: [] };

  let text = rawMeaning.trim();
  let extractedContext: string | undefined;

  // Ekstrak tag kurung seperti "(kendaraan)", "(cuaca)", "(sendirinya)", "(transitif)"
  const contextMatch = text.match(/[（(]([^()（）]{2,25})[）)]/);
  if (contextMatch) {
    extractedContext = contextMatch[1].trim();
  }

  // Pecah berdasarkan slash / atau titik koma ;
  const parts = text
    .split(/[/;]/)
    .map((p) => p.trim())
    .filter(Boolean);

  let primary = parts[0] || text;
  // Bersihkan kurung dari primary agar teks arti utama bersih dan enak dibaca
  primary = primary.replace(/[（(][^()（）]+[）)]/g, '').trim();

  const alternatives = parts.slice(1).map((p) => p.replace(/[（(][^()（）]+[）)]/g, '').trim()).filter(Boolean);

  // Kapitalisasi huruf pertama
  if (primary.length > 0) {
    primary = primary.charAt(0).toUpperCase() + primary.slice(1);
  }

  return {
    primary,
    contextTag: extractedContext,
    alternatives,
  };
}

/**
 * Mendapatkan klarifikasi makna yang super jelas untuk sembarang kata (CardItem).
 * Menggunakan kamus presisi jika ada, atau menganalisis secara cerdas atribut kata.
 */
export function getClarifiedMeaning(item: CardItem): MeaningClarification {
  const jp = (item.japanese || item.kanji || '').trim();
  const kj = (item.kanji || '').trim();
  const rawMeaning = item.meaningId || '';
  const baseJp = jp.replace(/\[.*?\]/g, '').replace(/[（\(].*?[）\)]/g, '').trim();

  // 1. Cek kamus disambiguasi presisi
  if (DETAILED_CLARIFICATIONS[jp]) {
    return DETAILED_CLARIFICATIONS[jp];
  }
  if (baseJp && DETAILED_CLARIFICATIONS[baseJp]) {
    return DETAILED_CLARIFICATIONS[baseJp];
  }
  if (kj && DETAILED_CLARIFICATIONS[kj]) {
    return DETAILED_CLARIFICATIONS[kj];
  }

  // Cek jika berakhiran "な" (kata sifat-na)
  const strippedNa = baseJp.replace(/な$/, '').trim();
  if (DETAILED_CLARIFICATIONS[strippedNa]) {
    return DETAILED_CLARIFICATIONS[strippedNa];
  }

  // 2. Analisis pintar berbasis data yang ada
  const { primary, contextTag, alternatives } = cleanRawMeaning(rawMeaning);

  // Tentukan badge konteks jika terdeteksi dari notes, kurung, atau sub-kategori
  let contextBadge: MeaningClarification['contextBadge'];
  const notesLower = (item.notes || item.mnemonic || '').toLowerCase();
  const meaningLower = rawMeaning.toLowerCase();

  if (contextTag) {
    const isTrans = contextTag.toLowerCase().includes('transitif') || contextTag.toLowerCase().includes('orang');
    const isIntrans = contextTag.toLowerCase().includes('intransitif') || contextTag.toLowerCase().includes('sendiri');
    contextBadge = {
      text: contextTag,
      variant: isTrans ? 'transitive' : isIntrans ? 'intransitive' : 'context',
    };
  } else if (notesLower.includes('intransitif') || meaningLower.includes('sendirinya')) {
    contextBadge = { text: 'Intransitif (自動詞)', variant: 'intransitive' };
  } else if (notesLower.includes('transitif')) {
    contextBadge = { text: 'Transitif (他動詞)', variant: 'transitive' };
  } else if (meaningLower.includes('cuaca') || meaningLower.includes('udara')) {
    contextBadge = { text: 'Konteks: Cuaca / Udara', variant: 'context' };
  } else if (meaningLower.includes('benda') || meaningLower.includes('makanan')) {
    contextBadge = { text: 'Konteks: Benda / Makanan', variant: 'context' };
  } else if (meaningLower.includes('pakaian')) {
    contextBadge = { text: 'Konteks: Busana', variant: 'context' };
  }

  // Partikel hint otomatis untuk kata kerja umum
  let particleHint: string | undefined;
  if (item.category === 'vocab' && item.subCategory === 'kata_kerja') {
    if (contextBadge?.variant === 'intransitive') {
      particleHint = `〜が ${jp}`;
    } else if (contextBadge?.variant === 'transitive') {
      particleHint = `〜を ${jp}`;
    }
  }

  return {
    primaryMeaning: primary || rawMeaning,
    secondaryMeanings: alternatives.length > 0 ? alternatives : undefined,
    contextBadge,
    particleHint,
    clarificationNote: item.notes || undefined,
  };
}

/**
 * Cek apakah kata memiliki detail klarifikasi khusus (misal: pembeda transitif/intransitif, homofon, pasangan kontras)
 */
export function hasClarificationDetails(item: CardItem): boolean {
  const clarification = getClarifiedMeaning(item);
  return Boolean(
    clarification.contrastPair ||
    clarification.contextBadge ||
    clarification.particleHint ||
    clarification.clarificationNote ||
    (clarification.secondaryMeanings && clarification.secondaryMeanings.length > 0)
  );
}

