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
  // === KATA PEWATAS / PENUNJUK: 別の (betsuno) ===
  '別の': {
    primaryMeaning: 'Yang lain / Berbeda / Terpisah (misal: 別の場所 = tempat lain)',
    secondaryMeanings: ['Yang lain', 'Berbeda', 'Terpisah'],
    contextBadge: { text: 'Nomina Pewatas (連体詞)', variant: 'context' },
    particleHint: '別の + [Kata Benda] (misal: 別の部屋, 別の本)',
    clarificationNote: 'Kata "betsuno" (別の / べつの) dalam bahasa Jepang artinya adalah "yang lain", "berbeda", atau "terpisah". Berfungsi sebagai nomina pewatas yang langsung diletakkan di depan kata benda tanpa partikel tambahan untuk menunjukkan entitas selain yang sedang dibicarakan.',
    contrastPair: {
      word: '別に',
      reading: 'betsuni',
      difference: 'Kata Keterangan (Adverbia): "Tidak ada yang khusus..." (digunakan bersama bentuk kalimat negatif: 別に問題はありません).',
    },
    usageHint: '別の機会にお話ししましょう (Mari kita bicarakan di kesempatan lain / lain kali).',
  },
  'べつの': {
    primaryMeaning: 'Yang lain / Berbeda / Terpisah (misal: 別の場所, 別の方法)',
    secondaryMeanings: ['Yang lain', 'Berbeda', 'Terpisah'],
    contextBadge: { text: 'Nomina Pewatas (連体詞)', variant: 'context' },
    particleHint: '別の + [Kata Benda] (misal: 別の部屋, 別の本)',
    clarificationNote: 'Kata "betsuno" (別の / べつの) dalam bahasa Jepang artinya adalah "yang lain", "berbeda", atau "terpisah". Digunakan untuk merujuk pada benda, orang, waktu, atau hal lain selain yang sedang dibahas.',
    contrastPair: {
      word: '別に',
      reading: 'betsuni',
      difference: 'Kata Keterangan (Adverbia): "Tidak ada yang khusus..." (digunakan dengan bentuk negatif).',
    },
    usageHint: '別の日にしましょう (Mari kita ganti ke hari lain).',
  },

  // === PERBEDAAN KELAS KATA: KATA KERJA vs KATA SIFAT (太る vs 太い, 痩せる vs 細い) ===
  '太る': {
    primaryMeaning: 'Bertambah gemuk / Menjadi gemuk (perubahan berat badan)',
    contextBadge: { text: 'Kata Kerja (動詞)', variant: 'nuance' },
    particleHint: '〜が 太る / 太っています (sedang dalam kondisi gemuk)',
    clarificationNote: 'Merupakan kata kerja (verb) yang menyatakan proses atau tindakan perubahan kondisi tubuh bertambah gemuk / berat badan naik. Jangan tertukar dengan 太い (futoi) yang merupakan kata sifat -i!',
    contrastPair: {
      word: '太い',
      reading: 'futoi',
      difference: 'Kata Sifat -i (Adjective): Gemuk, tebal, atau lebar untuk mendeskripsikan sifat fisik benda, bagian tubuh, atau garis (misal: 太い腕 = lengan tebal/kekar)',
    },
    usageHint: '最近甘いものを食べすぎて少し太りました (Akhir-akhir ini saya terlalu banyak makan manis jadi sedikit bertambah gemuk).',
  },
  '太い': {
    primaryMeaning: 'Tebal / Gemuk / Lebar (ukuran fisik/garis/tali)',
    contextBadge: { text: 'Kata Sifat -i (形容詞)', variant: 'nuance' },
    clarificationNote: 'Merupakan kata sifat -i untuk mendeskripsikan sifat fisik benda atau bagian tubuh yang berdiameter besar, tebal, atau lebar. Jangan tertukar dengan 太る (futoru) yang merupakan kata kerja proses menjadi gemuk!',
    contrastPair: {
      word: '太る',
      reading: 'futoru',
      difference: 'Kata Kerja (Verb): Menjadi gemuk / proses bertambah berat badan pada manusia atau hewan',
    },
    usageHint: 'このペンは線が太いです (Pulpen ini garis tulisannya tebal).',
  },
  '痩せる': {
    primaryMeaning: 'Menjadi kurus / Turun berat badan / Langsing',
    contextBadge: { text: 'Kata Kerja (動詞)', variant: 'nuance' },
    particleHint: '〜が 痩せる / 痩せています (sedang dalam kondisi kurus)',
    clarificationNote: 'Merupakan kata kerja (verb) yang menyatakan proses perubahan kondisi tubuh berkurang berat badannya menjadi kurus/langsing. Jangan tertukar dengan 細い (hosoi) yang merupakan kata sifat -i!',
    contrastPair: {
      word: '細い',
      reading: 'hosoi',
      difference: 'Kata Sifat -i (Adjective): Ramping, tipis panjang, atau kecil untuk mendeskripsikan ukuran fisik garis atau benda',
    },
    usageHint: '毎朝ジョギングをして3キロ痩せました (Setiap pagi joging dan berhasil turun 3 kg / menjadi kurus).',
  },
  '細い': {
    primaryMeaning: 'Ramping / Tipis / Halus (ukuran garis/benda)',
    contextBadge: { text: 'Kata Sifat -i (形容詞)', variant: 'nuance' },
    clarificationNote: 'Merupakan kata sifat -i untuk mendeskripsikan sifat ramping atau tipisnya suatu benda fisik (misal pensil tipis, jari ramping, tali halus). Jangan tertukar dengan 痩せる (yaseru) yang merupakan kata kerja proses tubuh menjadi kurus!',
    contrastPair: {
      word: '痩せる',
      reading: 'yaseru',
      difference: 'Kata Kerja (Verb): Menjadi kurus / proses tubuh kehilangan berat badan',
    },
    usageHint: '彼女は指が細くてきれいです (Jari tangannya ramping dan indah).',
  },

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
  // === GELAR KEHORMATAN & AKHIRAN NAMA ORANG (KEISHO / SETSUBIJI) ===
  '〜さん': {
    primaryMeaning: 'Tuan / Nyonya / Nona / Saudara (Gelar Kehormatan Nama)',
    contextBadge: { text: 'Gelar Kehormatan Nama', variant: 'context' },
    clarificationNote: 'Gelar kehormatan sopan universal yang dibubuhkan di akhir nama orang (misal: Tanaka-san = Tuan/Sdr. Tanaka). TIDAK digunakan untuk menyebut diri sendiri.',
    usageHint: '田中さん、おはようございます (Selamat pagi, Tuan Tanaka).',
  },
  '～さん': {
    primaryMeaning: 'Tuan / Nyonya / Nona / Saudara (Gelar Kehormatan Nama)',
    contextBadge: { text: 'Gelar Kehormatan Nama', variant: 'context' },
    clarificationNote: 'Gelar kehormatan sopan universal yang dibubuhkan di akhir nama orang (misal: Tanaka-san = Tuan/Sdr. Tanaka). TIDAK digunakan untuk menyebut diri sendiri.',
    usageHint: '田中さん、おはようございます (Selamat pagi, Tuan Tanaka).',
  },
  'さん': {
    primaryMeaning: 'Tuan / Nyonya / Nona / Saudara (Gelar Kehormatan)',
    contextBadge: { text: 'Gelar Kehormatan Nama', variant: 'context' },
    clarificationNote: 'Gelar kehormatan sopan universal yang dibubuhkan di akhir nama orang (misal: Tanaka-san = Tuan/Sdr. Tanaka). TIDAK digunakan untuk menyebut diri sendiri.',
    usageHint: '田中さん、おはようございます (Selamat pagi, Tuan Tanaka).',
  },
  '〜ちゃん': {
    primaryMeaning: 'Panggilan Sayang / Akrab (Anak / Sahabat)',
    contextBadge: { text: 'Panggilan Sayang / Akrab', variant: 'context' },
    clarificationNote: 'Akhiran bernada ramah dan kasih sayang untuk anak kecil, bayi, atau sahabat dekat wanita.',
    usageHint: '花子ちゃん、一緒に遊ぼう (Hanako-chan, ayo main bersama).',
  },
  'ちゃん': {
    primaryMeaning: 'Panggilan Sayang / Akrab (Anak / Sahabat)',
    contextBadge: { text: 'Panggilan Sayang / Akrab', variant: 'context' },
    clarificationNote: 'Akhiran bernada ramah dan kasih sayang untuk anak kecil, bayi, atau sahabat dekat wanita.',
  },
  '〜くん': {
    primaryMeaning: 'Panggilan Akrab Laki-laki / Rekan Sebaya',
    contextBadge: { text: 'Panggilan Sebaya / Junior', variant: 'context' },
    clarificationNote: 'Akhiran panggilan untuk anak laki-laki, rekan pria sebaya, atau junior di tempat kerja/sekolah.',
    usageHint: '健太くん、手伝ってくれてありがとう (Kenta-kun, terima kasih sudah membantu).',
  },
  'くん': {
    primaryMeaning: 'Panggilan Akrab Laki-laki / Rekan Sebaya',
    contextBadge: { text: 'Panggilan Sebaya / Junior', variant: 'context' },
    clarificationNote: 'Akhiran panggilan untuk anak laki-laki, rekan pria sebaya, atau junior di tempat kerja/sekolah.',
  },
  '〜様': {
    primaryMeaning: 'Yang Terhormat (Sangat Sopan / Tamu / Pelanggan)',
    contextBadge: { text: 'Sangat Hormat (Keigo)', variant: 'context' },
    clarificationNote: 'Bentuk penghormatan tertinggi dari -san, ditujukan kepada pelanggan (お客様), tamu, atau surat resmi.',
    usageHint: 'お客様、お待たせいたしました (Bapak/Ibu pelanggan yang terhormat, maaf telah menunggu).',
  },
  '〜さま': {
    primaryMeaning: 'Yang Terhormat (Sangat Sopan / Tamu / Pelanggan)',
    contextBadge: { text: 'Sangat Hormat (Keigo)', variant: 'context' },
    clarificationNote: 'Bentuk penghormatan tertinggi dari -san, ditujukan kepada pelanggan (お客様), tamu, atau surat resmi.',
  },
  // === SATUAN BILANGAN & PENGHITUNG (JOSHUUSHI) ===
  '〜かい': {
    primaryMeaning: 'Lantai ... (Gedung) / ... Kali (Frekuensi)',
    contextBadge: { text: 'Satuan Lantai / Frekuensi', variant: 'context' },
    clarificationNote: 'Bila kanji 階 berarti lantai gedung (misal: 3階 = lantai 3). Bila kanji 回 berarti frekuensi pengulangan (misal: 1回 = 1 kali).',
  },
  '〜さい': {
    primaryMeaning: '... Tahun (Satuan Umur / Usia)',
    contextBadge: { text: 'Satuan Umur (歳 / 才)', variant: 'context' },
    clarificationNote: 'Penghitung umur seseorang, misal: 20歳 (20 tahun / hatachi).',
  },
  '〜にん': {
    primaryMeaning: '... Orang (Satuan Jumlah Manusia)',
    contextBadge: { text: 'Satuan Hitung Orang (人)', variant: 'context' },
    clarificationNote: 'Penghitung jumlah orang. Catatan pengecualian: 1 orang = ひとり (一人), 2 orang = ふたり (二人), 3 orang ke atas = 〜にん (三人 = さんにん).',
  },
  '〜まい': {
    primaryMeaning: '... Lembar (Benda Tipis & Datar)',
    contextBadge: { text: 'Satuan Benda Datar (枚)', variant: 'context' },
    clarificationNote: 'Digunakan untuk kertas, tiket, foto, kemeja/kaos, piring, prangko, dsb.',
  },
  '〜だい': {
    primaryMeaning: '... Unit (Mesin / Kendaraan / Elektronik)',
    contextBadge: { text: 'Satuan Mesin & Kendaraan (台)', variant: 'context' },
    clarificationNote: 'Digunakan untuk mobil, sepeda, komputer, televisi, mesin fotokopi, dsb.',
  },
  '〜ほん': {
    primaryMeaning: '... Batang / Botol (Benda Panjang Silindris)',
    contextBadge: { text: 'Satuan Benda Panjang (本)', variant: 'context' },
    clarificationNote: 'Digunakan untuk pensil, botol, payung, pohon, sungai, jari tangan, dsb.',
  },
  '〜さつ': {
    primaryMeaning: '... Jilid / Eksemplar (Buku / Majalah / Kamus)',
    contextBadge: { text: 'Satuan Buku (冊)', variant: 'context' },
    clarificationNote: 'Khusus untuk bahan bacaan berjilid seperti buku, novel, majalah, dan kamus.',
  },
  '〜こ': {
    primaryMeaning: '... Butir / Buah (Benda Kecil / Bulat / Tiga Dimensi)',
    contextBadge: { text: 'Satuan Benda Kecil (個)', variant: 'context' },
    clarificationNote: 'Digunakan untuk apel, telur, bola, kotak kecil, penghapus, batu kecil, dsb.',
  },
  '〜はい': {
    primaryMeaning: '... Cangkir / Gelas / Mangkok (Takaran Minuman & Sup)',
    contextBadge: { text: 'Satuan Cangkir / Porsi (杯)', variant: 'context' },
    clarificationNote: 'Digunakan untuk secangkir kopi, teh, gelas air, atau semangkuk ramen/sup.',
  },
  '〜えん': {
    primaryMeaning: '... Yen (Mata Uang Jepang)',
    contextBadge: { text: 'Mata Uang Yen (円)', variant: 'context' },
    clarificationNote: 'Satuan nominal mata uang resmi negara Jepang (¥).',
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

  const text = rawMeaning.trim();
  let extractedContext: string | undefined;

  // Ekstrak tag kurung konteks penting
  const contextMatch = text.match(/[（(]([^()（）]{2,40})[）)]/);
  if (contextMatch) {
    const rawTag = contextMatch[1].trim();
    if (
      !rawTag.includes('tulisan') &&
      !rawTag.includes('varian') &&
      !rawTag.includes('dasar') &&
      !rawTag.includes('gabungan')
    ) {
      extractedContext = rawTag;
    }
  }

  // Pecah berdasarkan slash / atau titik koma ; (kecuali slash di dalam kurung)
  const parts = text
    .split(/\s*[\/;]\s*(?![^()（）]*[)）])/)
    .map((p) => p.trim())
    .filter(Boolean);

  let primary = parts[0] || text;

  // Hapus tanda kurung hanya jika kurung tersebut berisi info tulisan/varian redundan
  primary = primary
    .replace(/[.]{2,}/g, '')
    .replace(/[…～~]/g, '')
    .replace(/[（(]\s*(?:tulisan\s+)?hiragana[^\)）]*[）)]/gi, '')
    .replace(/[（(]\s*kanji\s*(?:dasar)?[^\)）]*[）)]/gi, '')
    .replace(/[（(]\s*varian\s*\d+[^\)）]*[）)]/gi, '')
    .replace(/[（(]\s*gabungan\s*(?:variasi)?[^\)）]*[）)]/gi, '')
    .trim();

  const alternatives = parts.slice(1).map((p) =>
    p
      .replace(/[.]{2,}/g, '')
      .replace(/[…～~]/g, '')
      .replace(/[（(]\s*(?:tulisan\s+)?hiragana[^\)）]*[）)]/gi, '')
      .replace(/[（(]\s*kanji\s*(?:dasar)?[^\)）]*[）)]/gi, '')
      .replace(/[（(]\s*varian\s*\d+[^\)）]*[）)]/gi, '')
      .replace(/[（(]\s*gabungan\s*(?:variasi)?[^\)）]*[）)]/gi, '')
      .trim()
  ).filter(Boolean);

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

  // Cek jika diawali tilde / wave dash (〜 atau ～)
  const strippedTilde = baseJp.replace(/^[〜～~]/, '').trim();
  if (strippedTilde && DETAILED_CLARIFICATIONS[strippedTilde]) {
    return DETAILED_CLARIFICATIONS[strippedTilde];
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
  } else if (
    (meaningLower.includes('cuaca') || /\b(suhu udara|hawa cuaca)\b/.test(meaningLower)) &&
    !meaningLower.includes('saudara') &&
    !meaningLower.includes('saudari')
  ) {
    contextBadge = { text: 'Konteks: Cuaca / Hawa', variant: 'context' };
  } else if (/\b(suhu benda|benda padat|makanan panas)\b/.test(meaningLower)) {
    contextBadge = { text: 'Konteks: Benda / Makanan', variant: 'context' };
  } else if (/\b(pakaian|busana|baju|sepatu)\b/.test(meaningLower) && item.subCategory === 'kata_kerja') {
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

export interface FullDictionaryDetail {
  /** Kalimat pembuka ala kamus resmi, misal: Kata "betsuno" (別の / べつの) dalam bahasa Jepang artinya adalah "yang lain", "berbeda", atau "terpisah". */
  fullExplanationSentence: string;
  wordRomaji: string;
  wordKanjiKana: string;
  meaningsList: string[];
  primaryMeaning: string;
  grammaticalRole: string;
  particlePattern?: string;
  disambiguationNote?: string;
  contrastPair?: {
    word: string;
    reading: string;
    difference: string;
  };
  sampleSentenceJp?: string;
  sampleSentenceId?: string;
}

import { hiraganaToRomaji, romajiToHiragana } from './hiraganaConverter';
import { getWordClassification } from './wordClassifier';

/**
 * Kamus kaya banyak arti (multi-meanings & kontekstual) untuk kosakata bahasa Jepang
 */
export const RICH_MULTI_MEANINGS: Record<string, string> = {
  // Kata Kerja (Verba)
  '上がります': 'naik, mendaki, atau masuk ke dalam rumah/ruangan',
  'あがります': 'naik, mendaki, atau masuk ke dalam rumah/ruangan',
  '上がる': 'naik, mendaki, atau masuk ke dalam rumah/ruangan',
  'あがる': 'naik, mendaki, atau masuk ke dalam rumah/ruangan',
  'agarimasu': 'naik, mendaki, atau masuk ke dalam rumah/ruangan',
  'agaru': 'naik, mendaki, atau masuk ke dalam rumah/ruangan',
  '渡します': 'menyerahkan, memberikan, atau menyampaikan sesuatu kepada orang lain',
  'わたします': 'menyerahkan, memberikan, atau menyampaikan sesuatu kepada orang lain',
  '渡す': 'menyerahkan, memberikan, mengantarkan, atau menyampaikan sesuatu ke tangan orang lain',
  'わたす': 'menyerahkan, memberikan, mengantarkan, atau menyampaikan sesuatu ke tangan orang lain',
  '食べます': 'makan, menikmati makanan, atau menyantap hidangan',
  'たべます': 'makan, menikmati makanan, atau menyantap hidangan',
  '食べる': 'makan, menikmati hidangan, menyantap santapan, atau mengonsumsi makanan',
  '飲みます': 'minum, meneguk cairan, menenggak, atau meminum obat',
  'のみます': 'minum, meneguk cairan, menenggak, atau meminum obat',
  '飲む': 'minum, meneguk air/minuman, menelan, atau meminum obat',
  '行きます': 'pergi, berangkat, menuju suatu tempat, atau berjalan ke sana',
  'いきます': 'pergi, berangkat, menuju suatu tempat, atau berjalan ke sana',
  '行く': 'pergi, berangkat, berkunjung, atau melangkah menuju destinasi',
  '来ます': 'datang, tiba, sampai, hadir, atau berkunjung ke sini',
  'きます': 'datang, tiba, sampai, hadir, atau berkunjung ke sini',
  '来る': 'datang, berkunjung, tiba di lokasi, atau menampakkan diri',
  '帰ります': 'pulang ke rumah, kembali ke asal, atau berbalik arah',
  'かえります': 'pulang ke rumah, kembali ke asal, atau berbalik arah',
  '帰る': 'pulang, kembali ke tempat tinggal, atau berpulang ke kampung halaman',
  '見ます': 'melihat, menyaksikan, menonton tayangan, atau memeriksa sesuatu',
  'みます': 'melihat, menyaksikan, menonton tayangan, atau memeriksa sesuatu',
  '見る': 'melihat, memandang, mengamati, menyaksikan pertunjukan, atau menonton',
  '聞きます': 'mendengar suara, mendengarkan musik/cerita, atau menanyakan kabar/petunjuk',
  'ききます': 'mendengar suara, mendengarkan musik/cerita, atau menanyakan kabar/petunjuk',
  '聞く': 'mendengar, menyimak audio, mencari informasi, atau menanyakan sesuatu',
  '読みます': 'membaca buku/tulisan, menelaah isi teks, atau melafalkan bacaan',
  'よみます': 'membaca buku/tulisan, menelaah isi teks, atau melafalkan bacaan',
  '読む': 'membaca, menelaah bahan bacaan, atau melafalkan teks secara lisan',
  '書きます': 'menulis huruf, mencatat informasi, mengarang cerita, atau melukis/menggambar',
  'かきます': 'menulis huruf, mencatat informasi, mengarang cerita, atau melukis/menggambar',
  '書く': 'menulis, mencatatkan peristiwa, membukukan, atau mengarang',
  '買います': 'membeli barang, berbelanja, memperoleh lewat pembayaran, atau menebus',
  'かいます': 'membeli barang, berbelanja, memperoleh lewat pembayaran, atau menebus',
  '買う': 'membeli, berbelanja di toko, atau memperoleh hak milik dengan uang',
  '売ります': 'menjual barang, memperdagangkan, atau memasarkan produk kepada pembeli',
  'うります': 'menjual barang, memperdagangkan, atau memasarkan produk kepada pembeli',
  '会います': 'bertemu, berjumpa tatap muka, atau bersua dengan seseorang',
  'あいます': 'bertemu, berjumpa tatap muka, atau bersua dengan seseorang',
  '話します': 'berbicara, bercakap-cakap, mengobrol, mendongengkan cerita, atau berdiskusi',
  'はなします': 'berbicara, bercakap-cakap, mengobrol, mendongengkan cerita, atau berdiskusi',
  '待ちます': 'menunggu, menanti kedatangan seseorang, atau bersiap menyambut',
  'まちます': 'menunggu, menanti kedatangan seseorang, atau bersiap menyambut',
  '持ちます': 'membawa barang, memegang, memiliki aset, atau menanggung sesuatu',
  'もちます': 'membawa barang, memegang, memiliki aset, atau menanggung sesuatu',
  '取ります': 'mengambil barang, meraih prestasi/skor, memetik, atau mencabut sesuatu',
  'とります': 'mengambil barang, meraih prestasi/skor, memetik, atau mencabut sesuatu',
  '置きます': 'meletakkan, menaruh barang di suatu tempat, atau menempatkan posisi',
  'おきます': 'meletakkan, menaruh barang di suatu tempat, atau menempatkan posisi',
  '作ります': 'membuat karya, memproduksi kerajinan, memasak masakan, atau membangun',
  'つくります': 'membuat karya, memproduksi kerajinan, memasak masakan, atau membangun',
  '教えます': 'mengajar ilmu, mendidik siswa, memberitahukan rahasia/alamat, atau menunjukkan jalan',
  'おしえます': 'mengajar ilmu, mendidik siswa, memberitahukan rahasia/alamat, atau menunjukkan jalan',
  '習います': 'belajar keterampilan khusus, berguru, menimba ilmu, atau berlatih bersama ahli',
  'ならいます': 'belajar keterampilan khusus, berguru, menimba ilmu, atau berlatih bersama ahli',
  '貸します': 'meminjamkan barang, menyewakan fasilitas, atau memberi pinjaman kepada orang lain',
  'かします': 'meminjamkan barang, menyewakan fasilitas, atau memberi pinjaman kepada orang lain',
  '借ります': 'meminjam barang, menyewa tempat, atau berutang fasilitas dari orang lain',
  'かります': 'meminjam barang, menyewa tempat, atau berutang fasilitas dari orang lain',
  '送ります': 'mengirimkan barang/pesan, melayangkan paket pos, atau mengantar orang ke tempat tujuan',
  'おくります': 'mengirimkan barang/pesan, melayangkan paket pos, atau mengantar orang ke tempat tujuan',
  '手伝います': 'membantu pekerjaan, menolong meringankan beban, atau turut berpartisipasi',
  'てつだいます': 'membantu pekerjaan, menolong meringankan beban, atau turut berpartisipasi',
  '開けます': 'membuka pintu/jendela/kotak, mengawali kegiatan, atau merintis usaha baru',
  'あけます': 'membuka pintu/jendela/kotak, mengawali kegiatan, atau merintis usaha baru',
  '開きます': 'terbuka dengan sendirinya, mekar (bunga), atau mulai jam operasional bisnis',
  'あきます': 'terbuka dengan sendirinya, mekar (bunga), atau mulai jam operasional bisnis',
  '閉めます': 'menutup pintu/jendela, mengakhiri rapat, atau menyudahi aktivitas harian',
  'しめます': 'menutup pintu/jendela, mengakhiri rapat, atau menyudahi aktivitas harian',
  '閉まります': 'tertutup dengan sendirinya atau berakhir jam buka operasional toko',
  'しまります': 'tertutup dengan sendirinya atau berakhir jam buka operasional toko',
  'つけます': 'menyalakan lampu/listrik, menghidupkan AC, menempelkan stiker, atau membubuhkan bumbu',
  '消します': 'mematikan lampu/alat listrik, memadamkan api, menghapus tulisan, atau menghilangkan jejak',
  'けします': 'mematikan lampu/alat listrik, memadamkan api, menghapus tulisan, atau menghilangkan jejak',
  '始めます': 'memulai kegiatan, mengawali upacara, atau membuka agenda pertemuan',
  'はじめます': 'memulai kegiatan, mengawali upacara, atau membuka agenda pertemuan',
  '終わります': 'selesai, berakhir, tuntas kegiatannya, atau rampung semua urusan',
  'おわります': 'selesai, berakhir, tuntas kegiatannya, atau rampung semua urusan',
  '起きます': 'bangun dari tidur, bangkit berdiri, atau terjadi suatu peristiwa penting',
  'おきます_bangun': 'bangun tidur, terjaga dari lelap, atau bangkit berdiri',
  '寝ます': 'tidur, berbaring terlelap di tempat tidur, atau beristirahat malam',
  'ねます': 'tidur, berbaring terlelap di tempat tidur, atau beristirahat malam',
  '働きます': 'bekerja mencari nafkah, bertugas di kantor, berkarier, atau menjalankan fungsi mesin',
  'はたらきます': 'bekerja mencari nafkah, bertugas di kantor, berkarier, atau menjalankan fungsi mesin',
  '休みます': 'beristirahat, mengambil cuti libur, absen tidak masuk, atau tidur sejenak',
  'やすみます': 'beristirahat, mengambil cuti libur, absen tidak masuk, atau tidur sejenak',
  '勉強します': 'belajar materi pelajaran, menelaah buku, atau mendalami suatu bidang studi',
  'べんきょうします': 'belajar materi pelajaran, menelaah buku, atau mendalami suatu bidang studi',
  '歩きます': 'berjalan kaki, melangkahkan kaki perlahan, atau berpawai',
  'あるきます': 'berjalan kaki, melangkahkan kaki perlahan, atau berpawai',
  '走ります': 'berlari kencang, melesat laju, atau meluncur melintasi jalan',
  'はしります': 'berlari kencang, melesat laju, atau meluncur melintasi jalan',
  '泳ぎます': 'berenang di air, menyelam, atau mengarungi perairan',
  'およぎます': 'berenang di air, menyelam, atau mengarungi perairan',
  '遊びます': 'bermain santai, bersenang-senang, berlibur, atau berkunjung untuk rekreasi',
  'あそびます': 'bermain santai, bersenang-senang, berlibur, atau berkunjung untuk rekreasi',
  '洗います': 'mencuci pakaian/piring, membilas kotoran dengan air, atau membasuh tangan',
  'あらいます': 'mencuci pakaian/piring, membilas kotoran dengan air, atau membasuh tangan',
  '忘れます': 'lupa ingatan, melupakan memori, atau tertinggal barang bawaannya',
  'わすれます': 'lupa ingatan, melupakan memori, atau tertinggal barang bawaannya',
  '覚えます': 'mengingat kuat, menghafal teks pelajaran, atau menguasai tata cara',
  'おぼえます': 'mengingat kuat, menghafal teks pelajaran, atau menguasai tata cara',
  '払います': 'membayar tagihan belanja, menyetorkan uang ongkos, atau melunasi kewajiban finansial',
  'はらいます': 'membayar tagihan belanja, menyetorkan uang ongkos, atau melunasi kewajiban finansial',
  '脱ぎます': 'melepas pakaian/sepatu, mencopot jaket, atau menanggalkan busana',
  'ぬぎます': 'melepas pakaian/sepatu, mencopot jaket, atau menanggalkan busana',
  '着ます': 'mengenakan pakaian atas, memakai baju, atau mengenakan busana formal',

  // Kata Sifat (Adjektiva)
  '明るい': 'terang (cahaya/ruangan), cerah (cuaca/masa depan), riang, ramah, atau ceria (kepribadian)',
  'あかるい': 'terang (cahaya/ruangan), cerah (cuaca/masa depan), riang, ramah, atau ceria (kepribadian)',
  '暗い': 'gelap (ruangan/malam), suram (masa depan), redup pencahayaan, atau murung/pendiam (sikap)',
  'くらい': 'gelap (ruangan/malam), suram (masa depan), redup pencahayaan, atau murung/pendiam (sikap)',
  '高い': 'tinggi (ukuran vertikal/posisi), mahal (biaya/harga barang), atau unggul tingkatannya',
  'たかい': 'tinggi (ukuran vertikal/posisi), mahal (biaya/harga barang), atau unggul tingkatannya',
  '安い': 'murah (harga terjangkau), hemat biaya, ekonomis, atau bersahabat di kantong',
  'やすい': 'murah (harga terjangkau), hemat biaya, ekonomis, atau bersahabat di kantong',
  '新しい': 'baru (barang/model), segar (makanan/ide), modern rancangannya, atau mutakhir',
  'あたらしい': 'baru (barang/model), segar (makanan/ide), modern rancangannya, atau mutakhir',
  '古い': 'lama (waktu berlalu), kuno (gaya/zaman), tua usianya, antik, atau bekas pakai',
  'ふるい': 'lama (waktu berlalu), kuno (gaya/zaman), tua usianya, antik, atau bekas pakai',
  '大きい': 'besar (ukuran/skala), luas daya tampung, berbobot, atau megah bangunannya',
  'おおきい': 'besar (ukuran/skala), luas daya tampung, berbobot, atau megah bangunannya',
  '小さい': 'kecil (dimensi/volume), sedikit jumlahnya, mungil bentuknya, atau bersuara lirih',
  'ちいさい': 'kecil (dimensi/volume), sedikit jumlahnya, mungil bentuknya, atau bersuara lirih',
  'いい': 'baik budi, bagus kualitasnya, prima performanya, pantas, atau menguntungkan',
  'よい': 'baik, bagus, tepat guna, berkualitas prima, pantas, atau menguntungkan',
  '悪い': 'buruk sifatnya, jelek mutunya, tidak sehat kondisinya, atau bersalah/merasa tidak enak',
  'わるい': 'buruk sifatnya, jelek mutunya, tidak sehat kondisinya, atau bersalah/merasa tidak enak',
  '美味しい': 'enak rasanya, lezat hidangannya, sedap dinikmati, atau memanjakan lidah',
  'おいしい': 'enak rasanya, lezat hidangannya, sedap dinikmati, atau memanjakan lidah',
  '甘い': 'manis rasanya, terlalu memanjakan anak, bersikap lunak/gampang menyerah, atau naif',
  'あまい': 'manis rasanya, terlalu memanjakan anak, bersikap lunak/gampang menyerah, atau naif',
  '辛い': 'pedas menyengat di lidah, asin pekat, berat ujian hidupnya, atau menyiksa perasaan',
  'からい': 'pedas menyengat di lidah, asin pekat, berat ujian hidupnya, atau menyiksa perasaan',
  '面白い': 'menarik untuk disimak, seru permainannya, menghibur, menyenangkan, atau lucu menggelitik',
  'おもしろい': 'menarik untuk disimak, seru permainannya, menghibur, menyenangkan, atau lucu menggelitik',
  '難しい': 'sulit dipecahkan, sukar dipelajari, rumit penjelasannya, atau penuh tantangan',
  'むずかしい': 'sulit dipecahkan, sukar dipelajari, rumit penjelasannya, atau penuh tantangan',
  '易しい': 'mudah dipelajari, gampang dipahami, sederhana konsepnya, atau ramah untuk pemula',
  'やさしい': 'ramah bersahabat, lemah lembut hatinya, penyayang, atau mudah dipahami',
  '忙しい': 'sibuk luar biasa, padat jadwal kegiatan, tergesa-gesa mengurus banyak hal, atau tiada waktu santai',
  'いそがしい': 'sibuk luar biasa, padat jadwal kegiatan, tergesa-gesa mengurus banyak hal, atau tiada waktu santai',
  '暇': 'luang waktunya, senggang tanpa kesibukan, santai, atau sepi pengunjung toko',
  'ひま': 'luang waktunya, senggang tanpa kesibukan, santai, atau sepi pengunjung toko',
  '静か': 'tenang suasananya, hening tanpa kebisingan, sunyi, atau damai tenteram lingkungannya',
  'しずか': 'tenang suasananya, hening tanpa kebisingan, sunyi, atau damai tenteram lingkungannya',
  '賑やか': 'ramai suasananya, meriah kegiatannya, riuh penuh tawa, atau padat pengunjung',
  'にぎやか': 'ramai suasananya, meriah kegiatannya, riuh penuh tawa, atau padat pengunjung',
  '便利': 'praktis digunakan, memudahkan pekerjaan, efisien fungsinya, atau strategis lokasinya',
  'べんり': 'praktis digunakan, memudahkan pekerjaan, efisien fungsinya, atau strategis lokasinya',
  '親切': 'ramah melayani, baik hati perilakunya, suka menolong, atau peduli sesama',
  'しんせつ': 'ramah melayani, baik hati perilakunya, suka menolong, atau peduli sesama',
  '元気': 'sehat jasmani raga, bugar bertenaga, ceria penuh semangat, atau berenergi positif',
  'げんき': 'sehat jasmani raga, bugar bertenaga, ceria penuh semangat, atau berenergi positif',
  '好き': 'suka, gemar menekuni hobi, menyukai seseorang, atau favorit di hati',
  'すき': 'suka, gemar menekuni hobi, menyukai seseorang, atau favorit di hati',
  '嫌い': 'benci tidak menyukai, enggan berdekatan, antipati, atau pantangan',
  'きらい': 'benci tidak menyukai, enggan berdekatan, antipati, atau pantangan',
  '上手': 'pandai berkarya, mahir keterampilannya, ahli di bidangnya, atau jago melakukan sesuatu',
  'じょうず': 'pandai berkarya, mahir keterampilannya, ahli di bidangnya, atau jago melakukan sesuatu',
  '下手': 'kurang pandai, belum mahir, kaku mempraktikkan, atau belum berpengalaman',
  'へた': 'kurang pandai, belum mahir, kaku mempraktikkan, atau belum berpengalaman',

  // Kata Benda (Nomina)
  '兄': 'kakak laki-laki, abang kandung sendiri, atau saudara laki-laki yang lebih tua',
  'あに': 'kakak laki-laki, abang kandung sendiri, atau saudara laki-laki yang lebih tua',
  'お兄さん': 'kakak laki-laki orang lain, sebutan abang/mas yang sopan, atau panggilan pemuda',
  'おにいさん': 'kakak laki-laki orang lain, sebutan abang/mas yang sopan, atau panggilan pemuda',
  '姉': 'kakak perempuan, mbak kandung sendiri, atau saudara perempuan yang lebih tua',
  'あね': 'kakak perempuan, mbak kandung sendiri, atau saudara perempuan yang lebih tua',
  'お姉さん': 'kakak perempuan orang lain, sapaan mbak/kakak wanita yang sopan, atau panggilan wanita muda',
  'おねえさん': 'kakak perempuan orang lain, sapaan mbak/kakak wanita yang sopan, atau panggilan wanita muda',
  '弟': 'adik laki-laki kandung sendiri atau saudara laki-laki yang lebih muda',
  'おとうと': 'adik laki-laki kandung sendiri atau saudara laki-laki yang lebih muda',
  '妹': 'adik perempuan kandung sendiri atau saudara perempuan yang lebih muda',
  'いもうと': 'adik perempuan kandung sendiri atau saudara perempuan yang lebih muda',
  '父': 'ayah/bapak kandung sendiri, orang tua laki-laki, atau kepala keluarga',
  'ちち': 'ayah/bapak kandung sendiri, orang tua laki-laki, atau kepala keluarga',
  'お父さん': 'ayah/bapak orang lain atau panggilan sopan kepada ayah tersayang',
  'おとうさん': 'ayah/bapak orang lain atau panggilan sopan kepada ayah tersayang',
  '母': 'ibu/mama kandung sendiri, orang tua perempuan, atau bunda tersayang',
  'はは': 'ibu/mama kandung sendiri, orang tua perempuan, atau bunda tersayang',
  'お母さん': 'ibu/mama orang lain atau sapaan hormat penuh kasih kepada ibu',
  'おかあさん': 'ibu/mama orang lain atau sapaan hormat penuh kasih kepada ibu',
  '友達': 'teman akrab, kawan seperjuangan, sahabat karib, atau rekan bergaul',
  'ともだち': 'teman akrab, kawan seperjuangan, sahabat karib, atau rekan bergaul',
  '青': 'warna biru, warna hijau (lampu lalu lintas/daun segar), atau belum matang/muda usianya',
  'あお': 'warna biru, warna hijau (lampu lalu lintas/daun segar), atau belum matang/muda usianya',
  '青い': 'berwarna biru, hijau segar dedaunan, pucat pasi wajahnya, atau belum berpengalaman',
  'あおい': 'berwarna biru, hijau segar dedaunan, pucat pasi wajahnya, atau belum berpengalaman',
  '赤': 'warna merah, tanda bahaya/peringatan, atau kondisi keuangan merugi (defisit)',
  'あか': 'warna merah, tanda bahaya/peringatan, atau kondisi keuangan merugi (defisit)',
  '赤い': 'berwarna merah menyala, merona pipinya, atau membara warnanya',
  'あかい': 'berwarna merah menyala, merona pipinya, atau membara warnanya',
  '白': 'warna putih, bersih tanpa noda, atau tanda tidak bersalah (bebas tuduhan)',
  'しろ': 'warna putih, bersih tanpa noda, atau tanda tidak bersalah (bebas tuduhan)',
  '黒': 'warna hitam pekat, tanda kedukaan, gelap, atau terbukti bersalah dalam penyelidikan',
  'くろ': 'warna hitam pekat, tanda kedukaan, gelap, atau terbukti bersalah dalam penyelidikan',
  '本': 'buku bacaan, pustaka jilidan, bahan studi literatur, atau jilid referensi',
  'ほん': 'buku bacaan, pustaka jilidan, bahan studi literatur, atau jilid referensi',
  '水': 'air bersih alami, air tawar dingin, cairan hidrasi, atau pelepas dahaga',
  'みず': 'air bersih alami, air tawar dingin, cairan hidrasi, atau pelepas dahaga',
  'お金': 'uang tunai, dana finansial, alat pembayaran sah, atau harta kekayaan',
  'おかね': 'uang tunai, dana finansial, alat pembayaran sah, atau harta kekayaan',
  '時間': 'waktu bergulir, jam durasi tertentu, saat kesempatan, atau tempo perjalanan',
  'じかん': 'waktu bergulir, jam durasi tertentu, saat kesempatan, atau tempo perjalanan',
};

/**
 * Memperkaya arti kata tunggal dengan sinonim kontekstual bahasa Indonesia
 */
function expandSingleMeaningWithSynonyms(base: string): string {
  const b = base.toLowerCase().trim();

  // Pola verba umum
  if (b.includes('menyerah') || b.includes('serah')) {
    return 'menyerahkan, memberikan, atau menyampaikan sesuatu kepada orang lain';
  }
  if (b.includes('makan') || b.includes('santap')) {
    return 'makan, menikmati hidangan, menyantap makanan, atau mengonsumsi santapan';
  }
  if (b.includes('minum')) {
    return 'minum, meneguk cairan, menenggak minuman, atau meminum obat';
  }
  if (b.includes('lihat') || b.includes('tonton') || b.includes('pandang')) {
    return 'melihat, memandang, menyaksikan, mengamati, atau menonton';
  }
  if (b.includes('dengar') || b.includes('simak')) {
    return 'mendengar, menyimak audio/cerita, atau menanyakan kabar/informasi';
  }
  if (b.includes('tulis') || b.includes('catat')) {
    return 'menulis huruf, mencatat informasi penting, mengarang, atau melukis';
  }
  if (b.includes('baca')) {
    return 'membaca buku/tulisan, menelaah isi teks, atau melafalkan bacaan';
  }
  if (b.includes('beli') || b.includes('belanja')) {
    return 'membeli barang, berbelanja di toko, atau memperoleh lewat pembayaran';
  }
  if (b.includes('jual')) {
    return 'menjual barang dagangan, memperdagangkan, atau memasarkan produk';
  }
  if (b.includes('temu') || b.includes('jumpa')) {
    return 'bertemu, berjumpa tatap muka, atau bersua dengan seseorang';
  }
  if (b.includes('bicara') || b.includes('obrol') || b.includes('cakap')) {
    return 'berbicara, bercakap-cakap, mengobrol santai, atau berdiskusi';
  }
  if (b.includes('tunggu') || b.includes('nanti')) {
    return 'menunggu, menanti kedatangan seseorang, atau bersiap menyambut';
  }
  if (b.includes('bawa') || b.includes('pegang')) {
    return 'membawa barang, memegang, memiliki aset, atau menyimpan barang';
  }
  if (b.includes('ambil') || b.includes('petik')) {
    return 'mengambil, memungut, meraih hasil, atau memetik sesuatu';
  }
  if (b.includes('taruh') || b.includes('letak')) {
    return 'meletakkan, menaruh barang di suatu tempat, atau menempatkan posisi';
  }
  if (b.includes('buat') || b.includes('bikin') || b.includes('produksi')) {
    return 'membuat karya, memproduksi kerajinan, memasak hidangan, atau membangun';
  }
  if (b.includes('ajar') || b.includes('didik')) {
    return 'mengajar ilmu, mendidik, memberitahukan petunjuk, atau menunjukkan jalan';
  }
  if (b.includes('belajar') || b.includes('studi')) {
    return 'belajar materi, mendalami ilmu pengetahuan, atau berlatih keterampilan';
  }
  if (b.includes('pinjamkan') || b.includes('sewakan')) {
    return 'meminjamkan barang, menyewakan fasilitas, atau memberi pinjaman kepada orang lain';
  }
  if (b.includes('pinjam') || b.includes('sewa')) {
    return 'meminjam barang, menyewa tempat, atau berutang fasilitas dari orang lain';
  }
  if (b.includes('kirim') || b.includes('layang')) {
    return 'mengirimkan barang/pesan, melayangkan paket pos, atau mengantar ke tujuan';
  }
  if (b.includes('bantu') || b.includes('tolong')) {
    return 'membantu pekerjaan, menolong meringankan beban, atau turut berpartisipasi';
  }
  if (b.includes('buka')) {
    return 'membuka (pintu/kotak/buku), mengawali kegiatan, atau merintis usaha baru';
  }
  if (b.includes('tutup')) {
    return 'menutup (pintu/jendela/buku), mengakhiri pertemuan, atau menyudahi aktivitas';
  }
  if (b.includes('nyala') || b.includes('hidupkan')) {
    return 'menyalakan lampu/alat listrik, menghidupkan mesin, atau mengaktifkan perangkat';
  }
  if (b.includes('padam') || b.includes('mati') || b.includes('hapus')) {
    return 'mematikan lampu/listrik, memadamkan api, atau menghapus catatan tulisan';
  }
  if (b.includes('mulai') || b.includes('awal')) {
    return 'memulai kegiatan, mengawali agenda, atau membuka rangkaian acara';
  }
  if (b.includes('selesai') || b.includes('tuntas') || b.includes('akhir')) {
    return 'selesai, berakhir, tuntas kegiatannya, atau rampung semua urusan';
  }

  // Pola adjektiva umum
  if (b.includes('terang') || b.includes('cerah')) {
    return 'terang (cahaya/ruangan), cerah (cuaca/masa depan), riang, atau ceria';
  }
  if (b.includes('gelap') || b.includes('suram') || b.includes('redup')) {
    return 'gelap (ruangan/malam), suram (masa depan), redup, atau murung';
  }
  if (b.includes('tinggi')) {
    return 'tinggi (ukuran vertikal/posisi), mahal (harga/biaya), atau bernilai tinggi';
  }
  if (b.includes('rendah') || b.includes('murah')) {
    return 'murah (harga terjangkau), hemat biaya, ekonomis, atau bersahabat di kantong';
  }
  if (b.includes('besar') || b.includes('luas')) {
    return 'besar (ukuran/skala), luas daya tampung, berbobot, atau megah';
  }
  if (b.includes('kecil') || b.includes('sedikit')) {
    return 'kecil (dimensi/volume), sedikit jumlahnya, mungil, atau bersuara lirih';
  }
  if (b.includes('enak') || b.includes('lezat') || b.includes('sedap')) {
    return 'enak rasanya, lezat hidangannya, sedap dinikmati, atau memuaskan selera';
  }
  if (b.includes('bagus') || b.includes('baik')) {
    return 'baik budi, bagus kualitasnya, prima performanya, pantas, atau menguntungkan';
  }
  if (b.includes('buruk') || b.includes('jelek')) {
    return 'buruk sifatnya, jelek mutunya, tidak sehat kondisinya, atau merugikan';
  }
  if (b.includes('sulit') || b.includes('sukar') || b.includes('susah')) {
    return 'sulit dipecahkan, sukar dipelajari, rumit penjelasannya, atau penuh tantangan';
  }
  if (b.includes('mudah') || b.includes('gampang')) {
    return 'mudah dipelajari, gampang dipahami, sederhana konsepnya, atau praktis';
  }
  if (b.includes('ramai') || b.includes('meriah')) {
    return 'ramai suasananya, meriah kegiatannya, riuh penuh tawa, atau padat pengunjung';
  }
  if (b.includes('sepi') || b.includes('tenang') || b.includes('sunyi')) {
    return 'tenang suasananya, hening tanpa kebisingan, sunyi, atau damai tenteram';
  }
  if (b.includes('sibuk')) {
    return 'sibuk luar biasa, padat jadwal kegiatan, atau tergesa-gesa mengurus banyak hal';
  }
  if (b.includes('luang') || b.includes('senggang')) {
    return 'luang waktunya, senggang tanpa kesibukan, santai, atau rileks';
  }

  // Pola nomina umum
  if (b.includes('kakak laki') || b.includes('abang')) {
    return 'kakak laki-laki, abang kandung sendiri, atau saudara laki-laki yang lebih tua';
  }
  if (b.includes('kakak peremp') || b.includes('mbak')) {
    return 'kakak perempuan, mbak kandung sendiri, atau saudara perempuan yang lebih tua';
  }
  if (b.includes('adik laki')) {
    return 'adik laki-laki kandung sendiri atau saudara laki-laki yang lebih muda';
  }
  if (b.includes('adik peremp')) {
    return 'adik perempuan kandung sendiri atau saudara perempuan yang lebih muda';
  }
  if (b.includes('ayah') || b.includes('bapak')) {
    return 'ayah/bapak kandung sendiri, orang tua laki-laki, atau kepala keluarga';
  }
  if (b.includes('ibu') || b.includes('mama')) {
    return 'ibu/mama kandung sendiri, orang tua perempuan, atau bunda tersayang';
  }
  if (b.includes('teman') || b.includes('kawan') || b.includes('sahabat')) {
    return 'teman akrab, kawan seperjuangan, sahabat karib, atau rekan bergaul';
  }
  if (b.includes('biru')) {
    return 'warna biru, hijau pada lampu lalu lintas/daun segar, atau belum matang';
  }
  if (b.includes('merah')) {
    return 'warna merah menyala, tanda bahaya/peringatan, atau kondisi merugi';
  }
  if (b.includes('putih')) {
    return 'warna putih, bersih tanpa noda, atau tanda tidak bersalah (bebas tuduhan)';
  }
  if (b.includes('hitam')) {
    return 'warna hitam pekat, tanda kedukaan, gelap, atau terbukti bersalah';
  }
  if (b.includes('buku')) {
    return 'buku bacaan, pustaka jilidan, bahan studi literatur, atau jilid referensi';
  }
  if (b.includes('air')) {
    return 'air bersih alami, air tawar dingin, cairan hidrasi, atau pelepas dahaga';
  }
  if (b.includes('uang')) {
    return 'uang tunai, dana finansial, alat pembayaran sah, atau harta kekayaan';
  }
  if (b.includes('waktu') || b.includes('jam')) {
    return 'waktu bergulir, jam durasi tertentu, saat kesempatan, atau tempo perjalanan';
  }

  return base;
}

/**
 * Menghasilkan sintesis arti kosakata lengkap dan kaya banyak arti sesuai standar user:
 * Contoh: "Watashimasu (渡します) : menyerahkan, memberikan, atau menyampaikan sesuatu kepada orang lain"
 */
export function formatSimpleMeaningSentence(item: CardItem): string {
  // 1. Reading & Kanji/Jp header
  let romaji = (item.reading || '')
    .replace(/\s*[\(（][a-zA-Z\u3040-\u309F\u30A0-\u30FF\s]+[\)）]\s*/g, '')
    .trim();
  const kanji = item.kanji?.trim() || '';
  const jp = item.japanese?.trim() || '';

  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(romaji)) {
    const converted = hiraganaToRomaji(romaji);
    if (converted) romaji = converted;
  }
  if (!romaji && !/[\u4E00-\u9FAF]/.test(jp)) {
    romaji = jp;
  }

  const capRomaji = romaji ? romaji.charAt(0).toUpperCase() + romaji.slice(1) : '';
  const kanjiOrJp = kanji || jp;
  let wordHeader = '';
  if (capRomaji && kanjiOrJp && kanjiOrJp.toLowerCase() !== romaji.toLowerCase()) {
    wordHeader = `${capRomaji} (${kanjiOrJp})`;
  } else if (capRomaji) {
    wordHeader = capRomaji;
  } else {
    wordHeader = kanjiOrJp;
  }

  // 2. Cek apakah ada di kamus kurasi banyak arti (RICH_MULTI_MEANINGS)
  const jpKey = (kanji || jp || '').trim();
  const rdKey = (item.reading || '').trim().toLowerCase();
  const cleanRdKey = romaji.toLowerCase();
  if (RICH_MULTI_MEANINGS[jpKey]) {
    return `${wordHeader} : ${RICH_MULTI_MEANINGS[jpKey]}`;
  }
  if (RICH_MULTI_MEANINGS[jp]) {
    return `${wordHeader} : ${RICH_MULTI_MEANINGS[jp]}`;
  }
  if (RICH_MULTI_MEANINGS[cleanRdKey]) {
    return `${wordHeader} : ${RICH_MULTI_MEANINGS[cleanRdKey]}`;
  }
  if (RICH_MULTI_MEANINGS[rdKey]) {
    return `${wordHeader} : ${RICH_MULTI_MEANINGS[rdKey]}`;
  }

  // 3. Fallback dinamis: kumpulkan dan perluas banyak arti dari makna-makna yang tersedia
  const clarification = getClarifiedMeaning(item);
  const rawSources: string[] = [
    clarification.primaryMeaning || '',
    item.meaningId || '',
    ...(clarification.secondaryMeanings || []),
  ];

  const parts: string[] = [];
  rawSources.forEach((raw) => {
    if (!raw) return;
    const clean = raw
      .replace(/[.]{2,}/g, '')
      .replace(/[…～~]/g, '')
      .replace(/\(.*?\)/g, '')
      .replace(/\[.*?\]/g, '')
      .replace(/^asal:.*$/i, '')
      .trim();

    clean
      .split(/[/;,]/)
      .map((s) => s.trim().toLowerCase())
      .filter((s) => s.length > 0 && !s.startsWith('asal:') && !s.includes('minnashokyu'))
      .forEach((s) => {
        if (!parts.includes(s)) parts.push(s);
      });
  });

  let formattedMeanings = '';
  if (parts.length >= 3) {
    formattedMeanings = `${parts.slice(0, -1).join(', ')}, atau ${parts[parts.length - 1]}`;
  } else if (parts.length === 2) {
    formattedMeanings = `${parts[0]} atau ${parts[1]}`;
  } else if (parts.length === 1) {
    formattedMeanings = expandSingleMeaningWithSynonyms(parts[0]);
  } else {
    formattedMeanings = (clarification.primaryMeaning || item.meaningId || 'makna kosakata').toLowerCase().trim();
  }

  return `${wordHeader} : ${formattedMeanings}`;
}

/**
 * Format daftar makna menjadi kalimat bahasa Indonesia alami (dengan tanda petik & kata "atau")
 */
export function formatMeaningListAsSentence(raw: string, secondary?: string[]): { formatted: string; items: string[] } {
  const allParts: string[] = [];
  const clean = raw
    .replace(/[.]{2,}/g, '')
    .replace(/[…～~]/g, '')
    .replace(/\(.*?\)/g, '')
    .replace(/\[.*?\]/g, '')
    .trim();

  clean
    .split(/[/;,]/)
    .map((s) => s.replace(/[.]{2,}/g, '').trim().toLowerCase())
    .filter(Boolean)
    .forEach((s) => {
      if (!allParts.includes(s)) allParts.push(s);
    });

  if (secondary) {
    secondary.forEach((s) => {
      const sClean = s.replace(/[.]{2,}/g, '').replace(/[…～~]/g, '').trim().toLowerCase();
      if (sClean && !allParts.includes(sClean)) allParts.push(sClean);
    });
  }

  const safeRaw = raw.replace(/[.]{2,}/g, '').replace(/[…～~]/g, '').trim();
  if (allParts.length === 0) return { formatted: `"${safeRaw}"`, items: [safeRaw] };
  if (allParts.length === 1) return { formatted: `"${allParts[0]}"`, items: allParts };
  if (allParts.length === 2) return { formatted: `"${allParts[0]}" atau "${allParts[1]}"`, items: allParts };
  return {
    formatted: allParts.slice(0, -1).map((p) => `"${p}"`).join(', ') + `, atau "${allParts[allParts.length - 1]}"`,
    items: allParts,
  };
}

/**
 * Menghasilkan sintesis detail kamus bahasa Jepang terlengkap untuk setiap kosakata:
 * Contoh: Akarui (明るい) adalah kata sifat I dalam bahasa Jepang yang berarti terang, cerah, atau ceria.
 */
export function getFullDictionaryDetail(item: CardItem): FullDictionaryDetail {
  const clarification = getClarifiedMeaning(item);
  let romaji = item.reading?.trim() || '';
  const kanji = item.kanji?.trim() || '';
  const jp = item.japanese?.trim() || '';
  let furi = item.furigana?.trim() || '';

  // Jika reading berupa Hiragana / Katakana, konversikan ke Romaji
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(romaji)) {
    const converted = hiraganaToRomaji(romaji);
    if (converted) romaji = converted;
  }

  // Jika furigana kosong namun japanese adalah kanji & reading adalah romaji
  if (!furi && /[\u4E00-\u9FAF]/.test(jp) && romaji) {
    const kanaFromRomaji = romajiToHiragana(romaji);
    if (kanaFromRomaji) furi = kanaFromRomaji;
  }

  let kanjiKanaDisplay = '';
  if (kanji && (kanji !== jp || furi)) {
    const kanaForm = furi || jp;
    kanjiKanaDisplay = `${kanji} / ${kanaForm}`;
  } else if (kanji && furi) {
    kanjiKanaDisplay = `${kanji} / ${furi}`;
  } else if (/[\u4E00-\u9FAF]/.test(jp) && furi && jp !== furi) {
    kanjiKanaDisplay = `${jp} / ${furi}`;
  } else {
    kanjiKanaDisplay = jp;
  }

  const { items: meaningsList } = formatMeaningListAsSentence(
    clarification.primaryMeaning,
    clarification.secondaryMeanings
  );

  const fullSentence = formatSimpleMeaningSentence(item);

  // Deteksi kelas kata / peran gramatikal
  let grammaticalRole = '';
  if (/^[〜～~]?(さん|ちゃん|くん|君|様|さま|たち|方|がた)$/.test(jp)) {
    grammaticalRole = 'Gelar Kehormatan / Sufiks Nama (接尾辞・敬称)';
  } else if (item.subCategory === 'angka_waktu' && (jp.startsWith('〜') || jp.startsWith('～'))) {
    grammaticalRole = 'Satuan Bilangan (助数詞 / Joshuushi)';
  } else if (item.subCategory === 'kata_kerja') {
    grammaticalRole = 'Kata Kerja (動詞 / Doushi)';
  } else if (item.subCategory === 'kata_sifat') {
    grammaticalRole = 'Kata Sifat (形容詞 / Keiyoushi)';
  } else if (item.subCategory === 'keterangan_fukushi') {
    grammaticalRole = 'Kata Keterangan (副詞 / Fukushi)';
  } else if (item.subCategory === 'salam') {
    grammaticalRole = 'Ungkapan / Salam Percakapan (挨拶・日常表現)';
  } else if (item.subCategory === 'onomatope') {
    grammaticalRole = 'Onomatope / Kata Tiruan Bunyi & Rasa (オノマトペ)';
  } else if (item.subCategory === 'angka_waktu') {
    grammaticalRole = 'Waktu, Angka & Satuan Hitung (時間・助数詞)';
  } else if (clarification.contextBadge?.text) {
    grammaticalRole = clarification.contextBadge.text;
  } else {
    grammaticalRole = 'Kata Benda (名詞 / Meishi)';
  }

  return {
    fullExplanationSentence: fullSentence,
    wordRomaji: romaji,
    wordKanjiKana: kanjiKanaDisplay,
    meaningsList,
    primaryMeaning: clarification.primaryMeaning,
    grammaticalRole,
    particlePattern: clarification.particleHint,
    disambiguationNote: clarification.clarificationNote,
    contrastPair: clarification.contrastPair,
    sampleSentenceJp: item.exampleJp || clarification.usageHint,
    sampleSentenceId: item.exampleId,
  };
}


