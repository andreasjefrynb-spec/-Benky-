/**
 * Penjelasan Nuansa Makna Kosakata Bahasa Jepang (語彙のニュアンスの違い)
 * 
 * Modul ini memberikan pembeda makna yang presisi untuk kata-kata bahasa Jepang
 * yang sering diterjemahkan dengan kata yang mirip/sama dalam bahasa Indonesia,
 * agar pembelajar tidak bingung saat menghafal dan menggunakannya dalam konteks nyata.
 */

export interface NuanceDetail {
  japanese: string;
  kanji: string;
  reading: string;
  furigana: string;
  simplifiedMeaning: string;
  nuanceExplanation: string;
  contextUsage: string; // Misal: 'Urusan otak, cara kerja, struktur, sifat polos'
  contrastedWith: {
    word: string;
    kanji: string;
    reading: string;
    nuance: string;
  }[];
  exampleJp: string;
  exampleId: string;
}

export const WORD_NUANCE_REGISTRY: Record<string, NuanceDetail> = {
  // 1. TANJUN (単純) VS JIMI (地味) VS KANTAN (簡単)
  '単純': {
    japanese: '単純',
    kanji: '単純',
    reading: 'tanjun',
    furigana: 'たんじゅん',
    simplifiedMeaning: 'Sederhana (tidak rumit / simpel)',
    nuanceExplanation: 'Sederhana karena tidak rumit / simpel (urusan otak, cara kerja, struktur mesin, pola pikir, atau sifat polos).',
    contextUsage: 'Struktur, sistem, mekanisme, pola pikir, cara kerja, kepribadian polos',
    contrastedWith: [
      {
        word: '地味',
        kanji: '地味',
        reading: 'jimi',
        nuance: 'Sederhana karena tidak mencolok / kalem (pakaian, riasan, warna, gaya hidup).',
      },
      {
        word: '簡単',
        kanji: '簡単',
        reading: 'kantan',
        nuance: 'Mudah / gampang (tidak membutuhkan keahlian rumit untuk dikerjakan).',
      },
    ],
    exampleJp: 'この機械の構造は単純で分かりやすいです。',
    exampleId: 'Struktur mesin ini sederhana (tidak rumit) dan mudah dipahami.',
  },
  '単純な': {
    japanese: '単純な',
    kanji: '単純',
    reading: 'tanjun na',
    furigana: 'たんじゅん',
    simplifiedMeaning: 'Sederhana (tidak rumit / simpel)',
    nuanceExplanation: 'Sederhana karena tidak rumit / simpel (urusan otak, cara kerja, struktur mesin, pola pikir, atau sifat polos).',
    contextUsage: 'Struktur, sistem, mekanisme, pola pikir, cara kerja, kepribadian polos',
    contrastedWith: [
      {
        word: '地味な',
        kanji: '地味',
        reading: 'jimi na',
        nuance: 'Sederhana karena tidak mencolok / kalem (pakaian, riasan, warna, gaya hidup).',
      },
      {
        word: '簡単な',
        kanji: '簡単',
        reading: 'kantan na',
        nuance: 'Mudah / gampang (tidak butuh banyak upaya untuk menyelesaikan).',
      },
    ],
    exampleJp: '単純なミスをしてしまいました。',
    exampleId: 'Saya melakukan kesalahan sepele / sederhana.',
  },
  'たんじゅん': {
    japanese: '単純',
    kanji: '単純',
    reading: 'tanjun',
    furigana: 'たんじゅん',
    simplifiedMeaning: 'Sederhana (tidak rumit / simpel)',
    nuanceExplanation: 'Sederhana karena tidak rumit / simpel (urusan otak, cara kerja, struktur mesin, pola pikir, atau sifat polos).',
    contextUsage: 'Struktur, sistem, mekanisme, pola pikir, sifat polos',
    contrastedWith: [
      {
        word: '地味',
        kanji: '地味',
        reading: 'jimi',
        nuance: 'Sederhana penampilan/pakaian.',
      },
    ],
    exampleJp: '単純な考え方。',
    exampleId: 'Cara berpikir yang sederhana / polos.',
  },

  '地味': {
    japanese: '地味',
    kanji: '地味',
    reading: 'jimi',
    furigana: 'じみ',
    simplifiedMeaning: 'Sederhana (tidak mencolok / kalem)',
    nuanceExplanation: 'Sederhana karena tidak mencolok / kalem (urusan penampilan, pakaian, warna, riasan wajah, atau gaya hidup).',
    contextUsage: 'Pakaian, warna, penampilan fisik, riasan, gaya hidup tidak bermewah-mewahan',
    contrastedWith: [
      {
        word: '単純',
        kanji: '単純',
        reading: 'tanjun',
        nuance: 'Sederhana karena tidak rumit / simpel (urusan otak, cara kerja, struktur).',
      },
      {
        word: '派手',
        kanji: '派手',
        reading: 'hade',
        nuance: 'Lawan kata: Mencolok / glamor / warna terang benderang.',
      },
    ],
    exampleJp: '面接には地味な色のスーツを着て行きます。',
    exampleId: 'Untuk wawancara, saya memakai setelan jas berwarna sederhana / kalem (tidak mencolok).',
  },
  '地味な': {
    japanese: '地味な',
    kanji: '地味',
    reading: 'jimi na',
    furigana: 'じみ',
    simplifiedMeaning: 'Sederhana (tidak mencolok / kalem)',
    nuanceExplanation: 'Sederhana karena tidak mencolok / kalem (urusan penampilan, pakaian, warna, riasan wajah, atau gaya hidup).',
    contextUsage: 'Pakaian, warna, riasan, gaya hidup kalem',
    contrastedWith: [
      {
        word: '単純な',
        kanji: '単純',
        reading: 'tanjun na',
        nuance: 'Sederhana karena tidak rumit / simpel (struktur, cara kerja, pola pikir).',
      },
      {
        word: '派手な',
        kanji: '派手',
        reading: 'hade na',
        nuance: 'Lawan kata: Mencolok, norak, atau glamor.',
      },
    ],
    exampleJp: '彼は普段、地味な服を好んで着ます。',
    exampleId: 'Dia sehari-hari lebih suka memakai pakaian yang sederhana dan kalem.',
  },
  'じみ': {
    japanese: '地味',
    kanji: '地味',
    reading: 'jimi',
    furigana: 'じみ',
    simplifiedMeaning: 'Sederhana (tidak mencolok / kalem)',
    nuanceExplanation: 'Sederhana karena tidak mencolok / kalem (urusan penampilan, pakaian, warna, atau gaya hidup).',
    contextUsage: 'Penampilan, pakaian, warna kalem',
    contrastedWith: [
      {
        word: '単純',
        kanji: '単純',
        reading: 'tanjun',
        nuance: 'Sederhana tidak rumit.',
      },
    ],
    exampleJp: '地味な生活を送っています。',
    exampleId: 'Menjalani kehidupan yang sederhana dan bersahaja.',
  },

  '簡単': {
    japanese: '簡単',
    kanji: '簡単',
    reading: 'kantan',
    furigana: 'かんたん',
    simplifiedMeaning: 'Mudah / Simpel (gampang diselesaikan)',
    nuanceExplanation: 'Mudah / simpel karena tidak membutuhkan proses berbelit atau pemikiran berat untuk diselesaikan.',
    contextUsage: 'Soal ujian, pekerjaan, instruksi, resep masakan, prosedur',
    contrastedWith: [
      {
        word: '単純',
        kanji: '単純',
        reading: 'tanjun',
        nuance: 'Sederhana susunan / struktur mekanismenya.',
      },
      {
        word: '難しい',
        kanji: '難しい',
        reading: 'muzukashii',
        nuance: 'Lawan kata: Sulit / sukar dikerjakan.',
      },
    ],
    exampleJp: 'このテストの問題はとても簡単でした。',
    exampleId: 'Soal ujian ini sangat mudah / gampang.',
  },
  '簡単（な）': {
    japanese: '簡単（な）',
    kanji: '簡単',
    reading: 'kantan (na)',
    furigana: 'かんたん',
    simplifiedMeaning: 'Mudah / Simpel (gampang diselesaikan)',
    nuanceExplanation: 'Mudah / simpel karena tidak membutuhkan proses berbelit untuk diselesaikan.',
    contextUsage: 'Soal ujian, prosedur, resep, pekerjaan',
    contrastedWith: [
      {
        word: '単純',
        kanji: '単純',
        reading: 'tanjun',
        nuance: 'Sederhana struktur/pola kerja.',
      },
    ],
    exampleJp: '簡単な質問に答えてください。',
    exampleId: 'Tolong jawab pertanyaan yang mudah ini.',
  },
  'かんたん': {
    japanese: '簡単',
    kanji: '簡単',
    reading: 'kantan',
    furigana: 'かんたん',
    simplifiedMeaning: 'Mudah / Simpel',
    nuanceExplanation: 'Mudah / simpel untuk dikerjakan atau dipahami.',
    contextUsage: 'Ujian, tugas, petunjuk',
    contrastedWith: [
      { word: '単純', kanji: '単純', reading: 'tanjun', nuance: 'Sederhana strukturnya.' },
    ],
    exampleJp: '作り方はとても簡単です。',
    exampleId: 'Cara pembuatannya sangat mudah.',
  },

  '派手': {
    japanese: '派手',
    kanji: '派手',
    reading: 'hade',
    furigana: 'はで',
    simplifiedMeaning: 'Mencolok / Glamor (penampilan/warna)',
    nuanceExplanation: 'Mencolok / menarik perhatian berlebih / glamor (urusan gaya pakaian, warna menyala, perhiasan, atau pesta).',
    contextUsage: 'Warna terang menyala, pakaian mencolok, dandanan pesta, pesta mewah',
    contrastedWith: [
      {
        word: '地味',
        kanji: '地味',
        reading: 'jimi',
        nuance: 'Lawan kata: Sederhana, kalem, tidak mencolok.',
      },
    ],
    exampleJp: '彼女は派手なドレスを着ています。',
    exampleId: 'Dia mengenakan gaun yang mencolok dan glamor.',
  },
  '派手な': {
    japanese: '派手な',
    kanji: '派手',
    reading: 'hade na',
    furigana: 'はで',
    simplifiedMeaning: 'Mencolok / Glamor (penampilan/warna)',
    nuanceExplanation: 'Mencolok / glamor / warna terang menyala (pakaian, riasan, gaya hidup mewah).',
    contextUsage: 'Pakaian, warna, riasan, pesta',
    contrastedWith: [
      { word: '地味な', kanji: '地味', reading: 'jimi na', nuance: 'Kalem dan tidak mencolok.' },
    ],
    exampleJp: '派手なメイク。',
    exampleId: 'Riasan wajah yang mencolok.',
  },

  // 2. TEBAL: FUTOI (太い) VS ATSUI (厚い)
  '太い': {
    japanese: '太い',
    kanji: '太い',
    reading: 'futoi',
    furigana: 'ふとい',
    simplifiedMeaning: 'Tebal / Gemuk (silinder / keliling)',
    nuanceExplanation: 'Tebal atau gemuk untuk benda berpenampang lingkaran/silinder (batang pohon, jari, tali, garis spidol, badan orang/hewan).',
    contextUsage: 'Tali, pohon, jari tangan, kaki, garis tebal, tiang silinder',
    contrastedWith: [
      {
        word: '厚い',
        kanji: '厚い',
        reading: 'atsui',
        nuance: 'Tebal untuk lapisan benda datar berdimensi tebal-tipis (buku, papan, selimut).',
      },
    ],
    exampleJp: '太いペンで大きく名前を書いてください。',
    exampleId: 'Tolong tulis nama besar-besar dengan spidol tebal.',
  },
  '厚い': {
    japanese: '厚い',
    kanji: '厚い',
    reading: 'atsui',
    furigana: 'あつい',
    simplifiedMeaning: 'Tebal (lapisan lembaran datar)',
    nuanceExplanation: 'Tebal untuk lapisan benda datar (buku, jaket tebal, papan kayu, selimut, dinding tebal, bibir tebal).',
    contextUsage: 'Buku tebal, mantel musim dingin, lempeng kaca tebal, selimut',
    contrastedWith: [
      {
        word: '太い',
        kanji: '太い',
        reading: 'futoi',
        nuance: 'Tebal keliling / silinder (tali, pohon, garis).',
      },
      {
        word: '薄い',
        kanji: '薄い',
        reading: 'usui',
        nuance: 'Lawan kata: Tipis untuk benda datar.',
      },
    ],
    exampleJp: '冬は厚いコートを着ます。',
    exampleId: 'Di musim dingin saya mengenakan mantel yang tebal.',
  },

  // 3. TIPIS: HOSOI (細い) VS USUI (薄い)
  '細い': {
    japanese: '細い',
    kanji: '細い',
    reading: 'hosoi',
    furigana: 'ほそい',
    simplifiedMeaning: 'Tipis / Ramping (silinder / garis / jari)',
    nuanceExplanation: 'Tipis atau kurus-ramping untuk benda silinder, tali, benang, jalan kecil, garis pena, pinggang, atau jari tangan.',
    contextUsage: 'Garis tipis, jalan sempit, benang, jarum, pinggang ramping, jari',
    contrastedWith: [
      {
        word: '薄い',
        kanji: '薄い',
        reading: 'usui',
        nuance: 'Tipis untuk lembaran datar (kertas), warna pudar, atau rasa masakan hambar.',
      },
    ],
    exampleJp: '細い路地を入ったところに店があります。',
    exampleId: 'Tokonya ada di dalam jalan/gang sempit (ramping).',
  },
  '薄い': {
    japanese: '薄い',
    kanji: '薄い',
    reading: 'usui',
    furigana: 'うすい',
    simplifiedMeaning: 'Tipis (lembaran) / Pudar / Hambar',
    nuanceExplanation: 'Tipis untuk lembaran datar (kertas, kain), warna yang muda/pudar, atau cita rasa sup yang encer/hambar.',
    contextUsage: 'Kertas tipis, baju tipis, warna pudar, kopi encer, rasa sup hambar',
    contrastedWith: [
      {
        word: '細い',
        kanji: '細い',
        reading: 'hosoi',
        nuance: 'Ramping/tipis bentuk silinder (benang, jari).',
      },
      {
        word: '厚い',
        kanji: '厚い',
        reading: 'atsui',
        nuance: 'Lawan kata: Tebal lembaran datar.',
      },
      {
        word: '濃い',
        kanji: '濃い',
        reading: 'koi',
        nuance: 'Lawan kata: Pekat / kental / warna tua.',
      },
    ],
    exampleJp: 'この紙は薄いので破れやすいです。',
    exampleId: 'Kertas ini tipis sehingga mudah sobek.',
  },

  // 4. CEPAT: HAYAI (早い) VS HAYAI (速い)
  '早い': {
    japanese: '早い',
    kanji: '早い',
    reading: 'hayai',
    furigana: 'はやい',
    simplifiedMeaning: 'Cepat / Awal (waktu / pagi / jadwal)',
    nuanceExplanation: 'Cepat dalam artian waktu (bangun pagi lebih awal, tiba mendahului jadwal, tahun yang terasa cepat berlalu).',
    contextUsage: 'Bangun pagi, jam lebih awal, sebelum waktu yang ditentukan',
    contrastedWith: [
      {
        word: '速い',
        kanji: '速い',
        reading: 'hayai',
        nuance: 'Cepat dalam artian laju kecepatan gerak fisik (shinkansen, lari, bicara).',
      },
      {
        word: '遅い',
        kanji: '遅い',
        reading: 'osoi',
        nuance: 'Lawan kata: Lambat / terlambat.',
      },
    ],
    exampleJp: '明日は朝早く起きなければなりません。',
    exampleId: 'Besok saya harus bangun pagi-pagi sekali (lebih awal).',
  },
  '速い': {
    japanese: '速い',
    kanji: '速い',
    reading: 'hayai',
    furigana: 'はやい',
    simplifiedMeaning: 'Cepat (laju kecepatan fisik / gerak)',
    nuanceExplanation: 'Cepat dalam artian kelajuan gerak atau kecepatan fisik (shinkansen melesat cepat, pelari cepat, mengetik cepat).',
    contextUsage: 'Kecepatan kendaraan, lari cepat, tempo lagu cepat, bicara terburu-buru',
    contrastedWith: [
      {
        word: '早い',
        kanji: '早い',
        reading: 'hayai',
        nuance: 'Cepat dalam artian waktu/jam (pagi hari / lebih awal dari jadwal).',
      },
    ],
    exampleJp: '新幹線はとても速いです。',
    exampleId: 'Kereta peluru Shinkansen sangat cepat lajunya.',
  },

  // 5. HANGAT: ATATAKAI (温かい) VS ATATAKAI (暖かい)
  '温かい': {
    japanese: '温かい',
    kanji: '温かい',
    reading: 'atatakai',
    furigana: 'あたたかい',
    simplifiedMeaning: 'Hangat (benda / makanan / hati)',
    nuanceExplanation: 'Hangat pada objek yang disentuh langsung: makanan panas-hangat, sup hangat, air mandi, atau kehangatan hati/keluarga.',
    contextUsage: 'Kopi hangat, sup hangat, air mandi onsen, hati yang hangat ramah',
    contrastedWith: [
      {
        word: '暖かい',
        kanji: '暖かい',
        reading: 'atatakai',
        nuance: 'Hangat untuk suhu udara sekitar, cuaca musim semi, atau iklim ruangan.',
      },
    ],
    exampleJp: '温かいスープを飲んで温まりましょう。',
    exampleId: 'Mari minum sup hangat untuk menghangatkan badan.',
  },
  '暖かい': {
    japanese: '暖かい',
    kanji: '暖かい',
    reading: 'atatakai',
    furigana: 'あたたかい',
    simplifiedMeaning: 'Hangat (cuaca / iklim udara)',
    nuanceExplanation: 'Hangat untuk kondisi atmosfer udara sekitar, iklim lingkungan, atau cuaca di musim semi.',
    contextUsage: 'Cuaca hari ini, musim semi yang hangat, suhu ruangan dengan penghangat',
    contrastedWith: [
      {
        word: '温かい',
        kanji: '温かい',
        reading: 'atatakai',
        nuance: 'Hangat makanan/minuman/sentuhan fisik/kehangatan batin.',
      },
    ],
    exampleJp: '今日は暖かくていい天気ですね。',
    exampleId: 'Hari ini cuacanya hangat dan cerah ya.',
  },

  // 6. TAHU & PAHAM: SHIRU (知る) VS WAKARU (分かる)
  '知る': {
    japanese: '知る',
    kanji: '知る',
    reading: 'shiru',
    furigana: 'しる',
    simplifiedMeaning: 'Tahu / Mengenal (informasi dari luar)',
    nuanceExplanation: 'Mengetahui fakta bahwa sesuatu itu ada karena pernah mendengar atau melihat informasinya dari luar (biasanya bentuk "shitte iru").',
    contextUsage: 'Tahu nama orang, tahu lokasi alamat, kenal seseorang, tahu berita',
    contrastedWith: [
      {
        word: '分かる',
        kanji: '分かる',
        reading: 'wakaru',
        nuance: 'Mengerti / memahami makna isi atau solusi masalah setelah dipikirkan di dalam kepala.',
      },
    ],
    exampleJp: '田中さんの電話番号を知っていますか。',
    exampleId: 'Apakah Anda tahu nomor telepon Tanaka-san? (memiliki informasinya).',
  },
  '分かる': {
    japanese: '分かる',
    kanji: '分かる',
    reading: 'wakaru',
    furigana: 'わかる',
    simplifiedMeaning: 'Mengerti / Paham (memahami isi pemikiran)',
    nuanceExplanation: 'Mengerti, paham, atau mencerna arti suatu hal di dalam pikiran (menggunakan partikel GA: ~ ga wakarimasu).',
    contextUsage: 'Paham pelajaran, mengerti bahasa Jepang, tahu alasan mengapa terjadi',
    contrastedWith: [
      {
        word: '知る',
        kanji: '知る',
        reading: 'shiru',
        nuance: 'Sekadar mengetahui info eksistensi dari luar.',
      },
    ],
    exampleJp: '先生の説明を聞いて、意味がよく分かりました。',
    exampleId: 'Setelah mendengarkan penjelasan guru, saya sangat mengerti artinya.',
  },
};

/**
 * Mencari rincian pembeda nuansa kata bila ada
 */
export function getWordNuanceInfo(word: {
  japanese?: string;
  kanji?: string;
  reading?: string;
}): NuanceDetail | null {
  const jp = (word.japanese || '').trim();
  const kj = (word.kanji || '').trim();
  const rd = (word.reading || '').trim().toLowerCase();

  // Cek langsung pada registry
  if (WORD_NUANCE_REGISTRY[jp]) return WORD_NUANCE_REGISTRY[jp];
  if (WORD_NUANCE_REGISTRY[kj]) return WORD_NUANCE_REGISTRY[kj];
  if (WORD_NUANCE_REGISTRY[rd]) return WORD_NUANCE_REGISTRY[rd];

  // Cek bentuk dasar jika berakhiran "な"
  const strippedJp = jp.replace(/[（(]な[）)]|な$/, '').trim();
  if (WORD_NUANCE_REGISTRY[strippedJp]) return WORD_NUANCE_REGISTRY[strippedJp];

  return null;
}
