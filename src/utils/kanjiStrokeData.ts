// Utility untuk Mengambil dan Mengelola Data Urutan Goresan Kanji (筆順 / Hitsujun)
// Berdasarkan Standar Terbuka KanjiVG (Creative Commons Attribution-Share Alike 3.0)

export interface StrokePath {
  id: string;
  d: string;
  type?: string;
  desc: string;
}

export interface StrokeNumber {
  num: number;
  x: number;
  y: number;
}

export interface KanjiStrokeData {
  char: string;
  hex: string;
  totalStrokes: number;
  paths: StrokePath[];
  numbers: StrokeNumber[];
  detectedRule?: string;
}

// Kamus Penjelasan Jenis Goresan Kuas (Indonesian)
export const STROKE_TYPE_DESCRIPTIONS: Record<string, string> = {
  '㇐': 'Garis mendatar (horizontal) dari kiri ke kanan',
  '㇑': 'Garis lurus tegak (vertikal) dari atas ke bawah',
  '㇚': 'Garis tegak ke bawah, lalu diakhiri kait (hane) ke atas',
  '㇇': 'Tarik mendatar ke kanan, lalu patah miring ke kiri bawah',
  '㇒': 'Goresan melengkung condong ke kiri bawah (hidari-harai)',
  '㇏': 'Goresan miring ke kanan bawah melebar lalu lepas (migi-harai)',
  '㇕': 'Tarik mendatar ke kanan lalu patah tegak ke bawah',
  '㇄': 'Tarik tegak ke bawah lalu belok mendatar ke kanan',
  '㇟': 'Tarik tegak, melengkung ke kanan bawah, lalu kait ke atas',
  '㇔': 'Titik kecil miring dari kiri atas ke kanan bawah (ten)',
  '丶': 'Titik kecil miring dari kiri atas ke kanan bawah (ten)',
  '㇀': 'Goresan menyapu miring ke kanan atas (haneage)',
  '㇓': 'Goresan melengkung panjang menyapu ke kiri bawah',
  '㇜': 'Tarik miring ke kiri bawah lalu patah belok ke kanan bawah',
  '㇙': 'Tarik tegak ke bawah lalu belok patah ke kanan atas',
  '㇈': 'Tarik mendatar, belok tegak ke bawah, lalu kait melengkung',
};

// 9 Aturan Utama Urutan Coretan Kanji (筆順の原則)
export interface StrokeOrderRule {
  id: string;
  title: string;
  japanese: string;
  description: string;
  examples: string[];
}

export const KANJI_STROKE_RULES: StrokeOrderRule[] = [
  {
    id: 'top_to_bottom',
    title: 'Atas ke Bawah',
    japanese: '上から下へ',
    description: 'Bagian atas kanji selalu digores lebih dahulu sebelum bagian bawah.',
    examples: ['三', '言', '京', '高'],
  },
  {
    id: 'left_to_right',
    title: 'Kiri ke Kanan',
    japanese: '左から右へ',
    description: 'Bagian atau radikal sisi kiri ditulis lebih dahulu daripada sisi kanan.',
    examples: ['川', '行', '語', '体'],
  },
  {
    id: 'horizontal_first',
    title: 'Mendatar Dulu, Baru Tegak',
    japanese: '横が先、縦が後',
    description: 'Garis horizontal dibuat lebih dahulu sebelum garis vertikal yang memotongnya.',
    examples: ['十', '木', '井', '土'],
  },
  {
    id: 'center_first',
    title: 'Tengah Dulu, Baru Sayap Kiri-Kanan',
    japanese: '中が先、左右が後',
    description: 'Jika ada poros tegak simetris di tengah, buat garis tengah dulu, baru bagian kiri dan kanannya.',
    examples: ['水', '小', '木', '山'],
  },
  {
    id: 'outside_box_first',
    title: 'Bingkai Luar Sebelum Isi Dalam',
    japanese: '外側が先、中身が後',
    description: 'Buat garis bingkai tepi kiri dan atas-kanan terlebih dahulu sebelum mengisi komponen dalamnya.',
    examples: ['四', '国', '日', '月', '風'],
  },
  {
    id: 'inside_before_closing',
    title: 'Isi Dalam Dulu, Baru Tutup Bawah',
    japanese: '中身が先、下を閉じるのは後',
    description: 'Selesaikan semua isi di dalam kotak terlebih dahulu, baru garis penutup bawah ditarik paling akhir.',
    examples: ['四', '回', '目', '田', '白'],
  },
  {
    id: 'left_slash_first',
    title: 'Miring Kiri Dulu, Baru Miring Kanan',
    japanese: '左払いが先、右払いが後',
    description: 'Goresan diagonal condong ke kiri (撇) selalu mendahului diagonal ke kanan (捺).',
    examples: ['人', '八', '父', '文', '大'],
  },
  {
    id: 'piercing_line_last',
    title: 'Garis Penembus Terakhir',
    japanese: '貫く線は最後',
    description: 'Garis vertikal atau horizontal panjang yang menembus kanji ditarik paling akhir.',
    examples: ['中', '事', '車', '半'],
  },
  {
    id: 'dot_last',
    title: 'Titik / Noktah Terakhir',
    japanese: '点は最後',
    description: 'Titik kecil di bagian atas atau sudut kanji dibubuhkan paling akhir.',
    examples: ['犬', '太', '玉', '代', '求'],
  },
];

// Deteksi otomatis aturan yang paling menonjol untuk sebuah Kanji
export function detectKanjiRule(char: string): string {
  if (['水', '小', '木', '山', '糸'].includes(char)) {
    return 'Garis tengah poros ditulis terlebih dahulu, lalu sayap kiri dan kanan.';
  }
  if (['四', '国', '回', '田', '目', '日', '月', '白', '百', '西'].includes(char)) {
    return 'Buat bingkai luar, isi komponen dalam, lalu tutup garis bawah paling akhir.';
  }
  if (['人', '八', '父', '文', '大', '天', '火'].includes(char)) {
    return 'Garis miring melengkung ke kiri dibuat terlebih dahulu, lalu garis miring ke kanan.';
  }
  if (['十', '土', '士', '王', '工', '井'].includes(char)) {
    return 'Garis mendatar (horizontal) dibuat dahulu, lalu dipotong garis tegak (vertikal).';
  }
  if (['中', '事', '車', '半', '平'].includes(char)) {
    return 'Garis tegak poros penembus ditarik paling terakhir melintasi seluruh komponen.';
  }
  if (['犬', '太', '玉', '代', '求', '成'].includes(char)) {
    return 'Titik kecil di bagian atas/sudut dibubuhkan paling akhir sebagai aksen.';
  }
  if (['川', '行', '語', '休', '何', '私'].includes(char)) {
    return 'Bagian kiri kanji ditulis terlebih dahulu dari atas ke bawah, lalu lanjut ke bagian kanan.';
  }
  return 'Tarik goresan dari atas ke bawah, dan dari kiri ke kanan secara berurutan.';
}

// In-memory Cache
const kanjiCache = new Map<string, KanjiStrokeData>();

export function getKanjiUnicodeHex(char: string): string {
  const code = char.codePointAt(0) || 0;
  return code.toString(16).padStart(5, '0');
}

/**
 * Mengambil data path goresan dari KanjiVG CDN
 */
export async function fetchKanjiStrokeData(rawChar: string): Promise<KanjiStrokeData | null> {
  const char = rawChar.trim().charAt(0);
  if (!char) return null;

  if (kanjiCache.has(char)) {
    return kanjiCache.get(char)!;
  }

  const hex = getKanjiUnicodeHex(char);
  const cdnUrl = `https://cdn.jsdelivr.net/gh/KanjiVG/kanjivg/kanji/${hex}.svg`;

  try {
    const res = await fetch(cdnUrl);
    if (!res.ok) {
      throw new Error(`Failed to load SVG for ${char} (${hex})`);
    }

    const svgText = await res.text();

    // Parse path tags
    const pathRegex = /<path\s+[^>]*id="([^"]+)"[^>]*d="([^"]+)"([^>]*)>/g;
    const paths: StrokePath[] = [];
    let match: RegExpExecArray | null;

    while ((match = pathRegex.exec(svgText)) !== null) {
      const id = match[1];
      const d = match[2];
      const rest = match[3];

      // Match kvg:type if exists
      const typeMatch = rest.match(/kvg:type="([^"]+)"/);
      const strokeType = typeMatch ? typeMatch[1] : undefined;

      // Match description
      const cleanType = strokeType ? strokeType.replace(/[a-z0-9]/gi, '') : '';
      const desc =
        (strokeType && STROKE_TYPE_DESCRIPTIONS[strokeType]) ||
        (cleanType && STROKE_TYPE_DESCRIPTIONS[cleanType]) ||
        `Goresan ke-${paths.length + 1}`;

      paths.push({
        id,
        d,
        type: strokeType,
        desc,
      });
    }

    // Parse stroke numbers
    const textRegex = /<text\s+[^>]*transform="matrix\([^)]+\s+([0-9.]+)\s+([0-9.]+)\)"[^>]*>(\d+)<\/text>/g;
    const numbers: StrokeNumber[] = [];

    while ((match = textRegex.exec(svgText)) !== null) {
      numbers.push({
        x: parseFloat(match[1]),
        y: parseFloat(match[2]),
        num: parseInt(match[3], 10),
      });
    }

    const detectedRule = detectKanjiRule(char);

    const result: KanjiStrokeData = {
      char,
      hex,
      totalStrokes: paths.length,
      paths,
      numbers,
      detectedRule,
    };

    kanjiCache.set(char, result);
    return result;
  } catch {
    // Fallback: Jika gagal fetch (misal offline), kembalikan data perkiraan
    const fallbackRule = detectKanjiRule(char);
    const fallbackData: KanjiStrokeData = {
      char,
      hex,
      totalStrokes: 1,
      paths: [],
      numbers: [],
      detectedRule: fallbackRule,
    };
    return fallbackData;
  }
}
