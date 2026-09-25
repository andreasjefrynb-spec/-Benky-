/**
 * Utility untuk menjamin SETIAP kotoba / flashcard di aplikasi
 * memiliki contoh kalimat bahasa Jepang (例文 / Reibun) + terjemahan bahasa Indonesia
 * serta fungsi pemutar suara pelafalan audio.
 */

import { CardItem } from '../types';
import { getWordClassification } from './wordClassifier';

export interface GeneratedExampleSentence {
  jp: string;
  id: string;
  reading?: string;
  isCustomGenerated?: boolean;
}

// Dictionary khusus contoh kalimat presisi untuk kata-kata umum N5-N3 & Minna no Nihongo
const PREBUILT_EXEMPLARS: Record<string, { jp: string; id: string }> = {
  // Salam & Frasa
  'おはようございます': { jp: '先生、おはようございます！', id: 'Selamat pagi, Dokter/Guru!' },
  'こんにちは': { jp: 'みなさん、こんにちは。元気ですか。', id: 'Halo semuanya, selamat siang. Apakah sehat?' },
  'こんばんは': { jp: 'こんばんは！今夜の月はきれいですね。', id: 'Selamat malam! Bulan malam ini indah ya.' },
  'おやすみなさい': { jp: 'もう遅いので、おやすみなさい。', id: 'Sudah larut malam, selamat tidur.' },
  'ありがとう': { jp: '手伝ってくれてありがとう。', id: 'Terima kasih sudah membantuku.' },
  'ありがとうございます': { jp: '親切にしていただき、ありがとうございます。', id: 'Terima kasih banyak atas kebaikan Anda.' },
  'すみません': { jp: 'すみません、駅はどこですか。', id: 'Permisi, stasiun ada di mana?' },
  'ごめんなさい': { jp: '遅れてごめんなさい。', id: 'Maafkan saya karena terlambat.' },
  'さようなら': { jp: 'また明日！さようなら。', id: 'Sampai jumpa besok! Selamat tinggal.' },
  'はじめまして': { jp: 'はじめまして。アディと申します。', id: 'Perkenalkan, nama saya Adi.' },
  'どうぞよろしく': { jp: 'これからもどうぞよろしくお願いします。', id: 'Mohon bimbingan dan kerja samanya ke depan.' },
  'いただきます': { jp: '美味しそうな料理ですね。いただきます！', id: 'Masakannya kelihatan enak ya. Selamat makan!' },
  'ごちそうさまでした': { jp: 'とても美味しかったです。ごちそうさまでした！', id: 'Sangat lezat. Terima kasih atas hidangannya!' },

  // Kata Kerja Umum
  '食べる': { jp: '毎朝、ご飯と卵を食べます。', id: 'Makan nasi dan telur setiap pagi.' },
  'たべる': { jp: 'レストランでラーメンを食べました。', id: 'Saya makan ramen di restoran.' },
  '飲む': { jp: '喉が渇いたので、水を飲みます。', id: 'Saya minum air karena haus.' },
  'のむ': { jp: 'コーヒーをもう一杯飲みましょう。', id: 'Mari minum kopi satu cangkir lagi.' },
  '行く': { jp: '来週、東京へ行きます。', id: 'Minggu depan saya pergi ke Tokyo.' },
  'いく': { jp: 'バスで学校へ行きます。', id: 'Saya pergi ke sekolah naik bus.' },
  '来る': { jp: '友達が家へ来ました。', id: 'Teman saya datang ke rumah.' },
  'くる': { jp: '明日、荷物が来ます。', id: 'Besok paketnya akan datang.' },
  '見る': { jp: '映画館で新しい映画を見ました。', id: 'Saya menonton film baru di bioskop.' },
  'みる': { jp: 'テレビのニュースを見ています。', id: 'Saya sedang menonton berita di TV.' },
  '聞く': { jp: '毎朝、日本の音楽を聞きます。', id: 'Saya mendengarkan musik Jepang setiap pagi.' },
  'きく': { jp: '先生に質問を聞きました。', id: 'Saya bertanya/mendengar pertanyaan kepada guru.' },
  '書く': { jp: 'ノートに漢字を書きます。', id: 'Saya menulis kanji di buku catatan.' },
  'かく': { jp: '手紙を書いて、母に送りました。', id: 'Saya menulis surat dan mengirimkannya ke ibu.' },
  '読む': { jp: '図書館で本を読みました。', id: 'Saya membaca buku di perpustakaan.' },
  'よむ': { jp: '毎朝、新聞を読みます。', id: 'Saya membaca koran setiap pagi.' },
  '話す': { jp: '日本語でゆっくり話してください。', id: 'Tolong bicara dalam bahasa Jepang dengan pelan.' },
  'はなす': { jp: '友達と楽しく話しました。', id: 'Saya mengobrol seru dengan teman.' },
  '買います': { jp: 'スーパーで野菜と果物を買いました。', id: 'Saya membeli sayur dan buah di supermarket.' },
  '買う': { jp: '新しい靴を買いたいです。', id: 'Saya ingin membeli sepatu baru.' },
  '勉強する': { jp: '毎日、日本語を2時間勉強します。', id: 'Saya belajar bahasa Jepang 2 jam setiap hari.' },
  'べんきょうする': { jp: '図書館で試験の勉強をしています。', id: 'Saya sedang belajar untuk ujian di perpustakaan.' },
  '寝る': { jp: '夜10時に寝ます。', id: 'Saya tidur pada jam 10 malam.' },
  'ねる': { jp: '疲れたので、早く寝たいです。', id: 'Saya lelah jadi ingin cepat tidur.' },
  '起きる': { jp: '毎朝6時に起きます。', id: 'Saya bangun jam 6 setiap pagi.' },
  'おきる': { jp: '今朝は早く起きました。', id: 'Pagi ini saya bangun lebih awal.' },
  '会う': { jp: '駅の前で友達に会いました。', id: 'Saya bertemu teman di depan stasiun.' },
  'あう': { jp: 'また明日会いましょう。', id: 'Mari bertemu lagi besok.' },
  '待つ': { jp: 'ここでバスを待っています。', id: 'Saya sedang menunggu bus di sini.' },
  'まつ': { jp: '少々お待ちください。', id: 'Mohon tunggu sebentar.' },
  '落ちます': { jp: '木からリンゴが落ちました。', id: 'Apel terjatuh dari pohon.' },
  'おちます': { jp: 'テーブルからコップが落ちました。', id: 'Gelas terjatuh dari atas meja.' },
  '落とします': { jp: '道で財布を落としてしまいました。', id: 'Saya tidak sengaja menjatuhkan dompet di jalan.' },
  'おとします': { jp: '鍵を落とさないように気をつけます。', id: 'Saya berhati-hati agar tidak menjatuhkan kunci.' },

  // Kata Sifat Umum
  '大きい': { jp: 'この部屋は大きくて明るいです。', id: 'Kamar ini besar dan terang.' },
  'おおきい': { jp: '大きな夢を持っています。', id: 'Saya memiliki impian yang besar.' },
  '小さい': { jp: '小さい犬が走っています。', id: 'Anjing kecil sedang berlari.' },
  'ちいさい': { jp: '字が小さくて読めません。', id: 'Tulisannya kecil jadi tidak terbaca.' },
  '美味しい': { jp: '母が作った料理はとても美味しいです。', id: 'Masakan yang dibuat ibu sangat enak.' },
  'おいしい': { jp: 'このラーメンは本当においしいですね！', id: 'Ramen ini beneran enak ya!' },
  '高い': { jp: 'このカメラはとても高いです。', id: 'Kamera ini sangat mahal.' },
  'たかい': { jp: '富士山は高い山です。', id: 'Gunung Fuji adalah gunung yang tinggi.' },
  '安い': { jp: 'あのスーパーの商品は安いです。', id: 'Barang di supermarket itu murah.' },
  'やすい': { jp: '安くて美味しい服を買いました。', id: 'Saya membeli baju yang murah dan bagus.' },
  '新しい': { jp: '新しいパソコンを買いました。', id: 'Saya membeli laptop baru.' },
  'あたらしい': { jp: '新車でドライブに行きます。', id: 'Saya pergi berkendara dengan mobil baru.' },
  '古い': { jp: 'これは古い本ですが、大切です。', id: 'Ini adalah buku lama, tapi sangat berharga.' },
  'ふるい': { jp: '古い建物を見に行きました。', id: 'Saya pergi melihat bangunan tua.' },
  '難しい': { jp: '日本語の漢字は難しいですが、面白いです。', id: 'Kanji bahasa Jepang sulit, tapi menarik.' },
  'むずかしい': { jp: 'この問題は少し難しいです。', id: 'Soal ini sedikit sulit.' },
  '易しい': { jp: '今日のテストは易しかったです。', id: 'Tes hari ini mudah.' },
  'やさしい': { jp: '親切でやさしい友達です。', id: 'Dia teman yang ramah dan baik hati.' },
  '親切': { jp: '日本の人はとても親切です。', id: 'Orang Jepang sangat ramah/baik hati.' },
  'しんせつ': { jp: '道に迷ったとき、親切に教えてもらいました。', id: 'Saat tersesat, saya diberitahu dengan ramah.' },
  '綺麗': { jp: 'この公園は桜が咲いて綺麗です。', id: 'Taman ini indah karena bunga sakura bermekaran.' },
  'きれい': { jp: '部屋をきれいに掃除しました。', id: 'Saya membersihkan kamar sampai bersih.' },
  '静か': { jp: '夜の図書館はとても静かです。', id: 'Perpustakaan di malam hari sangat tenang/sepi.' },
  'しずか': { jp: '静かな場所で本を読みたいです。', id: 'Saya ingin membaca buku di tempat yang tenang.' },
  '便利': { jp: '駅の近くに住むととても便利です。', id: 'Sangat praktis jika tinggal di dekat stasiun.' },
  'べんり': { jp: 'スマホは毎日の生活に便利です。', id: 'Smartphone sangat praktis untuk kehidupan sehari-hari.' },

  // Kata Benda Umum
  '水': { jp: '喉が渇いたら、冷たい水を飲みます。', id: 'Jika haus, minumlah air dingin.' },
  'みず': { jp: '毎日コップ8杯の水を飲みましょう。', id: 'Mari minum 8 gelas air setiap hari.' },
  '本': { jp: 'ベッドで本を読むのが好きです。', id: 'Saya suka membaca buku di tempat tidur.' },
  'ほん': { jp: '本棚にたくさんの本があります。', id: 'Ada banyak buku di rak buku.' },
  '車': { jp: '父は白い車を運転しています。', id: 'Ayah mengendarai mobil putih.' },
  'くるま': { jp: '車に気をつけて道を渡りましょう。', id: 'Mari menyeberang jalan dengan hati-hati pada mobil.' },
  '電車の': { jp: '電車で会社へ通っています。', id: 'Saya bepergian ke kantor naik kereta.' },
  '電車': { jp: '朝の電車はとても混んでいます。', id: 'Kereta pagi sangat padat/penuh.' },
  '学校': { jp: '毎朝8時に学校へ着きます。', id: 'Saya tiba di sekolah jam 8 setiap pagi.' },
  'がっこう': { jp: '学校で新しい友達ができました。', id: 'Saya mendapat teman baru di sekolah.' },
  '友達': { jp: '週末に友達と映画を見に行きます。', id: 'Akhir pekan saya pergi nonton film bersama teman.' },
  'ともだち': { jp: '友達と一緒に写真を撮りました。', id: 'Saya berfoto bersama teman.' },
  '家族': { jp: '私の家族はみんな元気です。', id: 'Keluarga saya semuanya sehat.' },
  'かぞく': { jp: 'お正月に家族で旅行をしました。', id: 'Saat Tahun Baru kami sekeluarga berlibur.' },
  '日本': { jp: 'いつか日本へ行ってみたいです。', id: 'Suatu saat saya ingin mencoba pergi ke Jepang.' },
  'にほん': { jp: '日本の文化やアニメが大好きです。', id: 'Saya sangat suka budaya dan anime Jepang.' },
  'ごみ': { jp: 'これはごみです。', id: 'Ini adalah sampah.' },
  'ゴミ': { jp: 'これはゴミです。', id: 'Ini adalah sampah.' },
  'ごみ箱': { jp: 'ごみ箱はあそこにあります。', id: 'Tempat sampah ada di sebelah sana.' },
  'ゴミ箱': { jp: 'ゴミ箱に捨ててください。', id: 'Tolong buang di tempat sampah.' },
};

/**
 * Mendapatkan contoh kalimat (例文) presisi untuk setiap kartubijak / kotoba.
 * Jika kartu sudah memiliki `exampleJp`, gunakan kalimat bawaan.
 * Jika tidak, buatlah contoh kalimat kontekstual yang alami sesuai golongan katanya.
 */
export function getOrGenerateExampleSentence(card: CardItem): GeneratedExampleSentence {
  // 1. Jika sudah ada contoh kalimat pre-baked di data
  if (card.exampleJp && card.exampleJp.trim()) {
    return {
      jp: card.exampleJp.trim(),
      id: card.exampleId?.trim() || `Contoh penggunaan kata ${card.japanese}`,
      reading: card.furigana || card.reading,
      isCustomGenerated: false,
    };
  }

  // 2. Cari dari Prebuilt Exemplars Dictionary
  const lookupKey = card.kanji || card.japanese || card.reading;
  if (PREBUILT_EXEMPLARS[lookupKey]) {
    const matched = PREBUILT_EXEMPLARS[lookupKey];
    return {
      jp: matched.jp,
      id: matched.id,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // Cari juga berdasar reading
  if (card.reading && PREBUILT_EXEMPLARS[card.reading]) {
    const matched = PREBUILT_EXEMPLARS[card.reading];
    return {
      jp: matched.jp,
      id: matched.id,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // 3. Generasi kalimat alami berbasis Klasifikasi Kata & Subkategori
  const wordClass = getWordClassification(card);
  const targetWord = card.kanji || card.japanese;
  const cleanMeaning = (card.meaningId || 'ini')
    .replace(/\(.*?\)/g, '')
    .split(',')[0]
    .split('/')[0]
    .trim()
    .toLowerCase();

  // A. KANA (Hiragana / Katakana)
  if (card.category === 'hiragana' || card.category === 'katakana') {
    return {
      jp: `「${targetWord}」の付く言葉を覚えましょう。`,
      id: `Mari mengingat kata yang mengandung huruf 「${targetWord}」.`,
      reading: card.reading,
      isCustomGenerated: true,
    };
  }

  // B. KATA KERJA (Verba)
  if (wordClass.type.startsWith('verb')) {
    let masuForm = targetWord;
    if (targetWord.endsWith('る')) {
      masuForm = targetWord.replace(/る$/, 'ます');
    } else if (targetWord.endsWith('む')) {
      masuForm = targetWord.replace(/む$/, 'みます');
    } else if (targetWord.endsWith('く')) {
      masuForm = targetWord.replace(/く$/, 'きます');
    } else if (targetWord.endsWith('ぐ')) {
      masuForm = targetWord.replace(/ぐ$/, 'ぎます');
    } else if (targetWord.endsWith('す')) {
      masuForm = targetWord.replace(/す$/, 'します');
    } else if (targetWord.endsWith('つ')) {
      masuForm = targetWord.replace(/つ$/, 'ちます');
    } else if (targetWord.endsWith('う')) {
      masuForm = targetWord.replace(/う$/, 'います');
    } else if (targetWord.endsWith('ぶ')) {
      masuForm = targetWord.replace(/ぶ$/, 'びます');
    } else if (targetWord === 'する') {
      masuForm = 'します';
    } else if (targetWord === 'くる' || targetWord === '来る') {
      masuForm = targetWord.includes('来') ? '来ます' : 'きます';
    }

    if (card.meaningId.toLowerCase().includes('terjatuh') || card.meaningId.toLowerCase().includes('jatuh')) {
      return {
        jp: `机の上から物が${masuForm}。`,
        id: `Barang ${cleanMeaning} dari atas meja.`,
        reading: card.furigana || card.reading,
        isCustomGenerated: true,
      };
    }

    return {
      jp: `毎日、友達と一緒に${masuForm}。`,
      id: `Setiap hari saya ${cleanMeaning} bersama teman.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // C. KATA SIFAT -I (い形容詞)
  if (wordClass.type === 'adj_i') {
    return {
      jp: `この料理はとても${targetWord}です。`,
      id: `Masakan ini sangat ${cleanMeaning}.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // D. KATA SIFAT -NA (な形容詞)
  if (wordClass.type === 'adj_na') {
    const baseNa = targetWord.replace(/（な）|\(な\)$/, '');
    return {
      jp: `ここはとても${baseNa}な場所です。`,
      id: `Tempat ini adalah tempat yang sangat ${cleanMeaning}.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // E. MAKANAN / MINUMAN
  if (card.subCategory === 'makanan' || card.subCategory === 'makanan_minuman') {
    return {
      jp: `レストランで${targetWord}を食べました。`,
      id: `Saya makan ${cleanMeaning} di restoran.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // F. TEMPAT / LOKASI
  if (card.subCategory === 'tempat' || card.subCategory === 'tempat_kerja' || card.subCategory === 'masyarakat_tempat') {
    return {
      jp: `明日、友達と${targetWord}へ行きます。`,
      id: `Besok saya pergi ke ${cleanMeaning} bersama teman.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // G. WAKTU / KALENDER
  if (card.subCategory === 'angka_waktu' || card.subCategory === 'waktu_kalender') {
    return {
      jp: `${targetWord}に試験があります。`,
      id: `Ada ujian pada ${cleanMeaning}.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // H. BENDA RUMAH / ALAT
  if (card.subCategory === 'benda_rumah' || card.subCategory === 'perabotan') {
    return {
      jp: `部屋に${targetWord}があります。`,
      id: `Ada ${cleanMeaning} di dalam kamar.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // I. TRANSPORTASI
  if (card.subCategory === 'transportasi' || card.subCategory === 'transportasi_fasilitas') {
    return {
      jp: `${targetWord}で会社へ通っています。`,
      id: `Saya bepergian ke kantor naik ${cleanMeaning}.`,
      reading: card.furigana || card.reading,
      isCustomGenerated: true,
    };
  }

  // J. KANJI
  if (card.category === 'kanji') {
    const readingStr = card.reading || card.furigana || '';
    return {
      jp: `「${targetWord}」の漢字の読み方は「${readingStr}」です。`,
      id: `Cara baca kanji 「${targetWord}」 (${cleanMeaning}) adalah 「${readingStr}」.`,
      reading: readingStr,
      isCustomGenerated: true,
    };
  }

  // K. DEFAULT PATTERN UNTUK KATA BENDA / KOTOBA UMUM
  return {
    jp: `これは${targetWord}です。`,
    id: `Ini adalah ${cleanMeaning}.`,
    reading: card.furigana || card.reading,
    isCustomGenerated: true,
  };
}
