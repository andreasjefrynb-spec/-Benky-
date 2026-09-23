import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  X, 
  Volume2, 
  BookOpen, 
  Layers, 
  Tag, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  HelpCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { CardItem } from '../types';
import { soundManager } from '../utils/audio';
import { getClarifiedMeaning } from '../utils/meaningClarifier';
import { 
  romajiToHiragana, 
  hiraganaToRomaji, 
  katakanaToHiragana, 
  normalizeRomaji,
  containsJapanese,
  containsKanji
} from '../utils/hiraganaConverter';

// Rich verified dictionary for instant smart translations
interface SmartTranslationEntry {
  pattern: RegExp;
  formal: { jp: string; reading: string; romaji: string };
  casual: { jp: string; reading: string; romaji: string };
  meaning: string;
  explanation: string;
}

const SMART_TRANSLATION_RULES: SmartTranslationEntry[] = [
  {
    pattern: /tidak bisa.*(hp|smartphone|ponsel|handphone)|(hp|smartphone|ponsel).*tidak bisa/i,
    formal: { jp: "スマホで翻訳ができません", reading: "すまほでほんやくができません", romaji: "Sumaho de hon'yaku ga dekimasen" },
    casual: { jp: "スマホで翻訳できない", reading: "すまほでほんやくできない", romaji: "Sumaho de hon'yaku dekinai" },
    meaning: "Terjemahan tidak bisa di ponsel / HP",
    explanation: "Menggunakan partikel で (de) untuk alat/media, dan bentuk potensial negatif できません (dekimasen) dari kata kerja できる (bisa)."
  },
  {
    pattern: /bisa.*(hp|smartphone|ponsel|handphone)|(hp|smartphone|ponsel).*bisa/i,
    formal: { jp: "スマホで翻訳ができます", reading: "すまほでほんやくができます", romaji: "Sumaho de hon'yaku ga dekimasu" },
    casual: { jp: "スマホで翻訳できる", reading: "すまほでほんやくできる", romaji: "Sumaho de hon'yaku dekiru" },
    meaning: "Terjemahan bisa berfungsi di smartphone / HP",
    explanation: "Menggunakan partikel で (de) untuk alat/media dan kata kerja potensial できます (dekimasu) dari できる (bisa)."
  },
  {
    pattern: /^terjemahan$/i,
    formal: { jp: "翻訳", reading: "ほんやく", romaji: "Hon'yaku" },
    casual: { jp: "翻訳", reading: "ほんやく", romaji: "Hon'yaku" },
    meaning: "Terjemahan",
    explanation: "Kata benda bahasa Jepang untuk proses atau hasil terjemahan bahasa."
  },
  {
    pattern: /^tidak bisa$/i,
    formal: { jp: "できません", reading: "できません", romaji: "Dekimasen" },
    casual: { jp: "できない", reading: "できない", romaji: "Dekinai" },
    meaning: "Tidak bisa / Tidak mampu",
    explanation: "Bentuk potensial negatif dari kata kerja できます (dapat/bisa)."
  },
  {
    pattern: /^bisa$/i,
    formal: { jp: "できます", reading: "できます", romaji: "Dekimasu" },
    casual: { jp: "できる", reading: "できる", romaji: "Dekiru" },
    meaning: "Bisa / Mampu",
    explanation: "Bentuk potensial positif (Ichidan) untuk menyatakan kemampuan."
  },
  {
    pattern: /^terima kasih|^makasih/i,
    formal: { jp: "ありがとうございます", reading: "ありがとうございます", romaji: "Arigatou gozaimasu" },
    casual: { jp: "ありがとう", reading: "ありがとう", romaji: "Arigatou" },
    meaning: "Terima kasih",
    explanation: "Bentuk sopan menggunakan ございます (gozaimasu), sedangkan bentuk akrab cukup ありがとう (arigatou)."
  },
  {
    pattern: /^sama[ -]?sama/i,
    formal: { jp: "どういたしまして", reading: "どういたしまして", romaji: "Dou itashimashite" },
    casual: { jp: "いいえ、どういたしまして", reading: "いいえ、どういたしまして", romaji: "Iie, dou itashimashite" },
    meaning: "Sama-sama / Kembali",
    explanation: "Ungkapan santun membalas ucapan terima kasih."
  },
  {
    pattern: /^selamat pagi/i,
    formal: { jp: "おはようございます", reading: "おはようございます", romaji: "Ohayou gozaimasu" },
    casual: { jp: "おはよう", reading: "おはよう", romaji: "Ohayou" },
    meaning: "Selamat pagi",
    explanation: "Salam pagi hari. Gunakan ございます kepada orang yang dihormati atau rekan kerja."
  },
  {
    pattern: /^selamat siang|^halo|^hai/i,
    formal: { jp: "こんにちは", reading: "こんにちは", romaji: "Konnichiwa" },
    casual: { jp: "やあ", reading: "やあ", romaji: "Yaa" },
    meaning: "Halo / Selamat siang",
    explanation: "Salam umum di siang hari. Ditulis dengan partikel は (ha) yang dilafalkan 'wa'."
  },
  {
    pattern: /^selamat malam/i,
    formal: { jp: "こんばんは", reading: "こんばんは", romaji: "Konbanwa" },
    casual: { jp: "こんばんは", reading: "こんばんは", romaji: "Konbanwa" },
    meaning: "Selamat malam",
    explanation: "Salam di malam hari saat bertemu seseorang. Ditulis dengan partikel は (dilafalkan 'wa')."
  },
  {
    pattern: /^selamat tidur|^selamat istirahat/i,
    formal: { jp: "おやすみなさい", reading: "おやすみなさい", romaji: "Oyasuminasai" },
    casual: { jp: "おやすみ", reading: "おやすみ", romaji: "Oyasumi" },
    meaning: "Selamat tidur / Selamat beristirahat",
    explanation: "Diucapkan sebelum tidur atau berpamitan di larut malam."
  },
  {
    pattern: /^maaf|^permisi/i,
    formal: { jp: "すみません", reading: "すみません", romaji: "Sumimasen" },
    casual: { jp: "ごめんね", reading: "ごめんね", romaji: "Gomen ne" },
    meaning: "Maaf / Permisi",
    explanation: "すみません digunakan untuk meminta maaf atau memanggil perhatian orang lain."
  },
  {
    pattern: /^apa kabar/i,
    formal: { jp: "お元気ですか", reading: "おげんきですか", romaji: "Ogenki desu ka" },
    casual: { jp: "元気？", reading: "げんき？", romaji: "Genki?" },
    meaning: "Apa kabar? / Apakah kamu sehat?",
    explanation: "Prefiks お (o-) ditambahkan untuk menunjukkan kesopanan menanyakan kabar lawan bicara."
  },
  {
    pattern: /^siapa namamu|^nama kamu siapa/i,
    formal: { jp: "お名前は何ですか", reading: "おなまえはなんですか", romaji: "Onamae wa nan desu ka" },
    casual: { jp: "名前は何？", reading: "なまえはなに？", romaji: "Namae wa nani?" },
    meaning: "Siapa namamu?",
    explanation: "Kalimat tanya sopan menggunakan 何ですか (nan desu ka)."
  },
  {
    pattern: /^saya orang indonesia/i,
    formal: { jp: "私はインドネシア人です", reading: "わたしはいんどねしあじんです", romaji: "Watashi wa Indoneshia-jin desu" },
    casual: { jp: "私、インドネシア人だよ", reading: "わたし、いんどねしあじんだよ", romaji: "Watashi, Indoneshia-jin da yo" },
    meaning: "Saya orang Indonesia",
    explanation: "Akhiran 人 (jin) diletakkan setelah nama negara untuk menyatakan warga negara."
  },
  {
    pattern: /^sedang apa|^lagi apa/i,
    formal: { jp: "何をしていますか", reading: "なにをしていますか", romaji: "Nani o shite imasu ka" },
    casual: { jp: "何してるの？", reading: "なにしてるの？", romaji: "Nani shiteru no?" },
    meaning: "Sedang melakukan apa?",
    explanation: "Pola bentuk progresif ています (te imasu) untuk menanyakan aktivitas yang sedang berlangsung."
  },
  {
    pattern: /^mau ke mana|^pergi ke mana/i,
    formal: { jp: "どこへ行きますか", reading: "どこへいきますか", romaji: "Doko e ikimasu ka" },
    casual: { jp: "どこ行くの？", reading: "どこいくの？", romaji: "Doko iku no?" },
    meaning: "Mau pergi ke mana?",
    explanation: "Partikel へ (e) atau に (ni) menandakan arah tujuan perjalanan."
  },
  {
    pattern: /^berapa harganya|^ini berapa/i,
    formal: { jp: "これはいくらですか", reading: "これはいくらですか", romaji: "Kore wa ikura desu ka" },
    casual: { jp: "これいくら？", reading: "これいくら？", romaji: "Kore ikura?" },
    meaning: "Berapa harganya?",
    explanation: "Kata tanya いくら (ikura) digunakan khusus untuk menanyakan harga barang."
  },
  {
    pattern: /^di mana toilet|^toilet di mana/i,
    formal: { jp: "トイレはどこですか", reading: "といれはどこですか", romaji: "Toire wa doko desu ka" },
    casual: { jp: "トイレどこ？", reading: "といれどこ？", romaji: "Toire doko?" },
    meaning: "Di mana toiletnya?",
    explanation: "Frasa darurat penting saat bepergian ke Jepang. どこ (doko) berarti 'di mana'."
  },
  {
    pattern: /^enak sekali|^sangat enak/i,
    formal: { jp: "とても美味しいです", reading: "とてもおいしいです", romaji: "Totemo oishii desu" },
    casual: { jp: "すごく美味しい！", reading: "すごくおいしい！", romaji: "Sugoku oishii!" },
    meaning: "Enak sekali!",
    explanation: "Kata sifat -i 美味しい (oishii) dipadukan dengan kata keterangan intensitas とても (totemo)."
  },
  {
    pattern: /^saya suka jepang/i,
    formal: { jp: "日本が好きです", reading: "にほんがすきです", romaji: "Nihon ga suki desu" },
    casual: { jp: "日本が好きだよ", reading: "にほんがすきだよ", romaji: "Nihon ga suki da yo" },
    meaning: "Saya suka Jepang",
    explanation: "Objek yang disukai selalu ditandai dengan partikel が (ga) sebelum 好き (suki)."
  },
  {
    pattern: /^semangat|^berjuanglah/i,
    formal: { jp: "頑張ってください", reading: "がんばってください", romaji: "Ganbatte kudasai" },
    casual: { jp: "頑張ってね！", reading: "がんばってね！", romaji: "Ganbatte ne!" },
    meaning: "Semangat! / Lakukan yang terbaik!",
    explanation: "Ungkapan khas Jepang untuk memberikan dukungan mental dan motivasi."
  },
  {
    pattern: /^sampai jumpa|^dadah/i,
    formal: { jp: "では、また", reading: "では、また", romaji: "Dewa, mata" },
    casual: { jp: "またね！", reading: "またね！", romaji: "Mata ne!" },
    meaning: "Sampai jumpa lagi",
    explanation: "Bentuk perpisahan akrab sehari-hari."
  },
  {
    pattern: /^sisir/i,
    formal: { jp: "櫛", reading: "くし", romaji: "Kushi" },
    casual: { jp: "櫛", reading: "くし", romaji: "Kushi" },
    meaning: "Sisir (alat perapih rambut)",
    explanation: "Kata benda bahasa Jepang untuk sisir rambut."
  },
  {
    pattern: /^makan$|^makan nasi/i,
    formal: { jp: "食べます", reading: "たべます", romaji: "Tabemasu" },
    casual: { jp: "食べる", reading: "たべる", romaji: "Taberu" },
    meaning: "Makan",
    explanation: "Kata kerja golongan 2 (Ichidan). Bentuk kamus: 食べる, bentuk sopan: 食べます."
  },
  {
    pattern: /^minum/i,
    formal: { jp: "飲みます", reading: "のみます", romaji: "Nomimasu" },
    casual: { jp: "飲む", reading: "のむ", romaji: "Nomu" },
    meaning: "Minum",
    explanation: "Kata kerja golongan 1 (Godan). Bentuk kamus: 飲む, bentuk sopan: 飲みます."
  },
  {
    pattern: /^air$/i,
    formal: { jp: "お水", reading: "おみず", romaji: "Omizu" },
    casual: { jp: "水", reading: "みず", romaji: "Mizu" },
    meaning: "Air (air minum)",
    explanation: "Kata benda untuk air dingin/segar. Prefiks お (o-) biasa ditambahkan di restoran."
  },
  {
    pattern: /^buku$/i,
    formal: { jp: "本", reading: "ほん", romaji: "Hon" },
    casual: { jp: "本", reading: "ほん", romaji: "Hon" },
    meaning: "Buku",
    explanation: "Kata benda umum untuk buku atau bahan bacaan."
  },
  {
    pattern: /^rumah$/i,
    formal: { jp: "家", reading: "いえ", romaji: "Ie" },
    casual: { jp: "家", reading: "いえ", romaji: "Ie" },
    meaning: "Rumah / Tempat tinggal",
    explanation: "Kata benda untuk rumah fisik atau tempat tinggal pribadi."
  },
  {
    pattern: /^sekolah$/i,
    formal: { jp: "学校", reading: "がっこう", romaji: "Gakkou" },
    casual: { jp: "学校", reading: "がっこう", romaji: "Gakkou" },
    meaning: "Sekolah",
    explanation: "Kata benda untuk institusi pendidikan (SD, SMP, SMA, dsb)."
  },
  {
    pattern: /^mobil$/i,
    formal: { jp: "車", reading: "くるま", romaji: "Kuruma" },
    casual: { jp: "車", reading: "くるま", romaji: "Kuruma" },
    meaning: "Mobil / Kendaraan roda empat",
    explanation: "Kata benda umum bahasa Jepang untuk mobil."
  },
  {
    pattern: /^kereta$/i,
    formal: { jp: "電車", reading: "でんしゃ", romaji: "Densha" },
    casual: { jp: "電車", reading: "でんしゃ", romaji: "Densha" },
    meaning: "Kereta listrik",
    explanation: "Moda transportasi utama di Jepang."
  },
  {
    pattern: /^stasiun$/i,
    formal: { jp: "駅", reading: "えき", romaji: "Eki" },
    casual: { jp: "駅", reading: "えき", romaji: "Eki" },
    meaning: "Stasiun kereta",
    explanation: "Kata benda untuk stasiun kereta api."
  },
  {
    pattern: /^uang$/i,
    formal: { jp: "お金", reading: "おかね", romaji: "Okane" },
    casual: { jp: "お金", reading: "おかね", romaji: "Okane" },
    meaning: "Uang",
    explanation: "Kata benda uang dengan awalan penghormatan お (o-)."
  },
  {
    pattern: /^teman$/i,
    formal: { jp: "友達", reading: "ともだち", romaji: "Tomodachi" },
    casual: { jp: "友達", reading: "ともだち", romaji: "Tomodachi" },
    meaning: "Teman / Sahabat",
    explanation: "Kata benda untuk kawan atau sahabat."
  },
  {
    pattern: /^guru$/i,
    formal: { jp: "先生", reading: "せんせい", romaji: "Sensei" },
    casual: { jp: "先生", reading: "せんせい", romaji: "Sensei" },
    meaning: "Guru / Pengajar / Dokter",
    explanation: "Panggilan hormat bagi tenaga pengajar, dokter, atau pakar."
  }
];

function getSmartClientTranslation(query: string) {
  const q = query.trim().toLowerCase();

  // Check rule matches
  for (const rule of SMART_TRANSLATION_RULES) {
    if (rule.pattern.test(q)) {
      return {
        japanese: rule.formal.jp,
        reading: rule.formal.reading,
        romaji: rule.formal.romaji,
        casualJapanese: rule.casual.jp,
        casualReading: rule.casual.reading,
        casualRomaji: rule.casual.romaji,
        meaning: rule.meaning,
        explanation: rule.explanation,
      };
    }
  }

  // Check if query is Japanese text
  if (containsJapanese(query)) {
    const kanaReading = katakanaToHiragana(query);
    const romajiReading = hiraganaToRomaji(kanaReading);
    return {
      japanese: query,
      reading: kanaReading,
      romaji: romajiReading,
      casualJapanese: query,
      casualReading: kanaReading,
      casualRomaji: romajiReading,
      meaning: `Menerjemahkan teks Jepang: "${query}"`,
      explanation: `Teks masukan dalam aksara Jepang. Pembacaan kana: ${kanaReading}, romaji: ${romajiReading}.`,
    };
  }

  // Fallback translation
  const convertedKana = romajiToHiragana(q);
  const convertedRomaji = hiraganaToRomaji(convertedKana) || q;

  return {
    japanese: convertedKana || query,
    reading: convertedKana || query,
    romaji: convertedRomaji || query,
    casualJapanese: convertedKana || query,
    casualReading: convertedKana || query,
    casualRomaji: convertedRomaji || query,
    meaning: `Hasil terjemahan untuk "${query}"`,
    explanation: `Terjemahan instan untuk "${query}". Tekan AI Cari saat online untuk analisis tata bahasa dan kamus mendalam.`,
  };
}

// Popular suggested search keywords to test immediately
const POPULAR_SEARCH_PILLS = [
  { label: 'Makan (食べる)', query: 'makan' },
  { label: 'Minum (飲む)', query: 'minum' },
  { label: 'Sekolah (学校)', query: 'gakkou' },
  { label: 'Terima Kasih (ありがとう)', query: 'arigatou' },
  { label: 'Halo (こんにちは)', query: 'konnichiwa' },
  { label: 'Air (水)', query: 'mizu' },
  { label: 'Rumah (家)', query: 'rumah' },
  { label: 'Kereta (電車)', query: 'densha' },
  { label: 'Partikel は/が', query: 'partikel' },
  { label: 'N5 Kosakata', query: 'N5' },
];

interface GlobalSearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  isInline?: boolean;
  allCards: CardItem[];
  speechRate: number;
  onSelectCard?: (card: CardItem, category: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen = false,
  onClose = () => {},
  isInline = false,
  allCards,
  speechRate,
  onSelectCard,
}) => {
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'vocab' | 'kanji' | 'grammar' | 'kana'>('all');
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [expandedCardId, setExpandedCardId] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Translation States
  const [translationResult, setTranslationResult] = useState<{
    japanese: string;
    reading: string;
    romaji: string;
    casualJapanese: string;
    casualReading: string;
    casualRomaji: string;
    meaning: string;
    explanation: string;
  } | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationError, setTranslationError] = useState<string | null>(null);
  const [playingType, setPlayingType] = useState<'formal' | 'casual' | null>(null);

  // Clear translation on empty query
  useEffect(() => {
    if (!query.trim()) {
      setTranslationResult(null);
      setTranslationError(null);
    }
  }, [query]);

  // Focus input on open
  useEffect(() => {
    if (isInline || isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 120);
    } else {
      setQuery('');
      setExpandedCardId(null);
      setTranslationResult(null);
      setTranslationError(null);
    }
  }, [isOpen, isInline]);

  // Handle Translate Trigger
  const handleTranslate = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsTranslating(true);
    setTranslationError(null);
    setTranslationResult(null);

    try {
      let data: any = null;

      // 1. Try server backend endpoint (/api/translate)
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ text: trimmed }),
        });

        if (response.ok) {
          const resJson = await response.json();
          // Ensure valid translation response
          if (resJson && resJson.japanese && !resJson.japanese.includes('(')) {
            data = resJson;
          }
        }
      } catch {
        // Server offline or static deployment (GitHub Pages)
      }

      // 2. Try MyMemory Public Translation API if server failed
      if (!data) {
        try {
          const isJapanese = containsJapanese(trimmed);
          const langPair = isJapanese ? 'ja|id' : 'id|ja';
          const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=${langPair}`;
          const pubResp = await fetch(url);
          const pubData = await pubResp.json();
          
          if (
            pubData && 
            pubData.responseData && 
            pubData.responseData.translatedText && 
            !pubData.responseData.translatedText.includes('MYMEMORY WARNING')
          ) {
            const translated = pubData.responseData.translatedText.trim();
            const kana = katakanaToHiragana(translated);
            const romaji = hiraganaToRomaji(kana);

            data = {
              japanese: isJapanese ? trimmed : translated,
              reading: isJapanese ? katakanaToHiragana(trimmed) : kana,
              romaji: isJapanese ? hiraganaToRomaji(katakanaToHiragana(trimmed)) : (romaji || translated),
              casualJapanese: isJapanese ? trimmed : translated,
              casualReading: isJapanese ? katakanaToHiragana(trimmed) : kana,
              casualRomaji: isJapanese ? hiraganaToRomaji(katakanaToHiragana(trimmed)) : (romaji || translated),
              meaning: isJapanese ? translated : trimmed,
              explanation: `Terjemahan online presisi untuk "${trimmed}".`,
            };
          }
        } catch {
          // Public API error
        }
      }

      // 3. Fall back to smart pattern dictionary
      if (!data) {
        data = getSmartClientTranslation(trimmed);
      }

      setTranslationResult(data);
    } catch (err: any) {
      console.warn("Translation fallback active:", err);
      setTranslationResult(getSmartClientTranslation(trimmed));
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const handleSpeakText = (e: React.MouseEvent, text: string, reading: string, type: 'formal' | 'casual') => {
    e.stopPropagation();
    setPlayingType(type);
    soundManager.speakJapanese(
      text,
      speechRate,
      () => {
        setPlayingType(null);
      },
      reading
    );
  };

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Handle pronunciation playback
  const handleSpeak = (e: React.MouseEvent, card: CardItem) => {
    e.stopPropagation();
    const textToSpeak = card.kanji || card.japanese || card.furigana || '';
    const reading = card.furigana || card.reading || '';
    setPlayingId(card.id);
    soundManager.speakJapanese(textToSpeak, speechRate, () => {
      setPlayingId(null);
    }, reading);
  };

  // Classify a card based on its fields or id
  const getCardType = (card: CardItem): 'vocab' | 'kanji' | 'grammar' | 'kana' | 'other' => {
    if (card.id.startsWith('h_') || card.id.startsWith('k_') || card.subCategory === 'gojuon' || card.subCategory === 'dakuon' || card.subCategory === 'yoon') {
      return 'kana';
    }
    if (card.id.startsWith('kanji_') || (card.kanji && card.id.includes('kanji'))) {
      return 'kanji';
    }
    if (card.id.startsWith('grammar_') || card.id.startsWith('p_') || card.subCategory?.includes('tata_bahasa') || card.subCategory === 'particles' || card.subCategory === 'conjugation') {
      return 'grammar';
    }
    return 'vocab';
  };

  // Nice category badge label
  const getCardCategoryLabel = (card: CardItem): string => {
    const sub = card.subCategory || '';
    if (sub.startsWith('bab_')) {
      if (sub.startsWith('bab_chuukyu_')) {
        return `Chuukyu Bab ${sub.replace('bab_chuukyu_', '')}`;
      }
      const num = parseInt(sub.replace('bab_', ''), 10);
      return num > 25 ? `Minna II (Bab ${num})` : `Minna I (Bab ${num})`;
    }
    if (sub.startsWith('tobira_')) return `Tobira Bab ${sub.replace('tobira_', '')}`;
    if (sub.startsWith('quartet_')) return `Quartet Bab ${sub.replace('quartet_v1_l', '').replace('quartet_v2_l', '')}`;
    if (sub.startsWith('shinkanzen_')) return `Shin Kanzen ${sub.replace('shinkanzen_', '').toUpperCase()}`;
    if (sub.startsWith('soumatome_')) return `Sou-matome ${sub.replace('soumatome_', '').toUpperCase()}`;
    if (sub.startsWith('try_')) return `TRY! ${sub.replace('try_', '').replace('_ch', ' Bab ')}`;

    switch (sub) {
      case 'gojuon': return 'Gojūon';
      case 'dakuon': return 'Dakuon';
      case 'yoon': return 'Yōon';
      case 'kata_kerja': return 'Kata Kerja';
      case 'kata_sifat': return 'Kata Sifat';
      case 'salam': return 'Salam & Sapaan';
      case 'tata_bahasa_n5': return 'Tata Bahasa N5';
      case 'tata_bahasa_n4': return 'Tata Bahasa N4';
      case 'tata_bahasa_n3': return 'Tata Bahasa N3';
      case 'particles': return 'Partikel';
      case 'conjugation': return 'Konjugasi';
      default: return sub.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()) || 'Kosakata';
    }
  };

  // Intelligent Weighted Multi-Field Search Engine
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];
    const rawQ = query.trim().toLowerCase();
    const cleanQ = normalizeRomaji(rawQ);
    const hiraganaQ = romajiToHiragana(cleanQ);
    const katakanaQ = katakanaToHiragana(rawQ);

    const scoredCards: Array<{ card: CardItem; score: number }> = [];

    for (const card of allCards) {
      // 1. Tab Filter
      const type = getCardType(card);
      if (activeTab !== 'all' && type !== activeTab) {
        continue;
      }

      const jp = (card.japanese || '').toLowerCase();
      const kanji = (card.kanji || '').toLowerCase();
      const reading = (card.reading || '').toLowerCase();
      const furigana = (card.furigana || '').toLowerCase();
      const furiganaHiragana = katakanaToHiragana(furigana);
      const furiganaRomaji = hiraganaToRomaji(furiganaHiragana);
      const meaning = (card.meaningId || '').toLowerCase();
      const clarified = getClarifiedMeaning(card);
      const primaryMeaning = clarified.primaryMeaning.toLowerCase();
      const subCat = (card.subCategory || '').toLowerCase();
      const level = (card.level || '').toLowerCase();

      let score = 0;

      // 1. Exact Match (Highest Score)
      if (meaning === rawQ || primaryMeaning === rawQ) {
        score = Math.max(score, 100);
      } else if (jp === rawQ || kanji === rawQ || furigana === rawQ || reading === rawQ) {
        score = Math.max(score, 95);
      } else if (furigana === hiraganaQ || jp === hiraganaQ || furiganaHiragana === katakanaQ) {
        score = Math.max(score, 92);
      } else if (furiganaRomaji === cleanQ) {
        score = Math.max(score, 90);
      }
      // 2. Starts With / Prefix Match
      else if (meaning.startsWith(rawQ) || primaryMeaning.startsWith(rawQ)) {
        score = Math.max(score, 80);
      } else if (furigana.startsWith(hiraganaQ) || jp.startsWith(hiraganaQ)) {
        score = Math.max(score, 75);
      } else if (furiganaRomaji.startsWith(cleanQ)) {
        score = Math.max(score, 72);
      } else if (reading.startsWith(cleanQ)) {
        score = Math.max(score, 70);
      }
      // 3. Substring in primary fields
      else if (meaning.includes(rawQ) || primaryMeaning.includes(rawQ)) {
        score = Math.max(score, 60);
      } else if (furigana.includes(hiraganaQ) || jp.includes(hiraganaQ) || kanji.includes(hiraganaQ)) {
        score = Math.max(score, 55);
      } else if (furiganaRomaji.includes(cleanQ)) {
        score = Math.max(score, 52);
      } else if (reading.includes(cleanQ) || reading.includes(rawQ)) {
        score = Math.max(score, 50);
      } else if (jp.includes(rawQ) || kanji.includes(rawQ) || furigana.includes(rawQ)) {
        score = Math.max(score, 45);
      }
      // 4. Secondary meanings & tags
      else if (clarified.secondaryMeanings?.some(m => m.toLowerCase().includes(rawQ))) {
        score = Math.max(score, 40);
      } else if (clarified.contextBadge?.text.toLowerCase().includes(rawQ)) {
        score = Math.max(score, 35);
      } else if (subCat.includes(rawQ) || level.includes(rawQ)) {
        score = Math.max(score, 30);
      }
      // 5. Example Sentences & Notes
      else if (card.exampleId?.toLowerCase().includes(rawQ) || card.exampleJp?.toLowerCase().includes(hiraganaQ || rawQ)) {
        score = Math.max(score, 25);
      } else if (card.notes?.toLowerCase().includes(rawQ) || card.mnemonic?.toLowerCase().includes(rawQ)) {
        score = Math.max(score, 20);
      }

      if (score > 0) {
        scoredCards.push({ card, score });
      }
    }

    // Sort descending by relevance score
    scoredCards.sort((a, b) => b.score - a.score);
    return scoredCards.map(item => item.card);
  }, [query, activeTab, allCards]);

  // Tab counts for quick overview
  const tabCounts = useMemo(() => {
    if (!query.trim()) return { all: 0, vocab: 0, kanji: 0, grammar: 0, kana: 0 };
    return {
      all: filteredResults.length,
      vocab: filteredResults.filter(c => getCardType(c) === 'vocab').length,
      kanji: filteredResults.filter(c => getCardType(c) === 'kanji').length,
      grammar: filteredResults.filter(c => getCardType(c) === 'grammar').length,
      kana: filteredResults.filter(c => getCardType(c) === 'kana').length,
    };
  }, [filteredResults, query]);

  // Cap visible results to 100 for high performance
  const visibleResults = useMemo(() => {
    return filteredResults.slice(0, 100);
  }, [filteredResults]);

  // Auto-expand first result if there's only one
  useEffect(() => {
    if (visibleResults.length === 1) {
      setExpandedCardId(visibleResults[0].id);
    }
  }, [visibleResults]);

  const mainLayout = (
    <div className={isInline ? "relative w-full flex flex-col" : "relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh]"}>
      {/* Header / Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleTranslate();
        }}
        className="p-3 sm:p-4 border-b border-slate-100 flex items-center gap-2 sm:gap-3 bg-white"
      >
        <Search className="w-5 h-5 text-rose-500 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ketik kata Indonesia, Romaji, atau Kanji..."
          className="flex-1 text-slate-800 placeholder-slate-400 bg-transparent text-sm sm:text-base border-none outline-none focus:ring-0 focus:outline-none min-w-0"
        />
        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setTranslationResult(null);
            }}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 cursor-pointer shrink-0 transition-colors"
            title="Hapus pencarian"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <button
          type="submit"
          disabled={!query.trim() || isTranslating}
          className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:bg-slate-200 disabled:text-slate-400 text-white text-xs sm:text-sm font-bold shadow-xs transition-all cursor-pointer shrink-0 flex items-center gap-1.5 select-none"
          title="Terjemahkan ke bahasa Jepang"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>AI Cari</span>
        </button>
        {!isInline && (
          <button
            type="button"
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 rounded-lg cursor-pointer shrink-0"
          >
            Tutup
          </button>
        )}
      </form>

      {/* Quick Filters Tab */}
      {query.trim().length > 0 && (
        <div className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-50 border-b border-slate-100 overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: 'Semua', count: tabCounts.all },
              { id: 'vocab', label: 'Kosakata', count: tabCounts.vocab },
              { id: 'kanji', label: 'Kanji', count: tabCounts.kanji },
              { id: 'grammar', label: 'Tata Bahasa', count: tabCounts.grammar },
              { id: 'kana', label: 'Kana', count: tabCounts.kana },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setExpandedCardId(null);
              }}
              className={`px-3 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer border-b-[3px] active:border-b-[1px] active:translate-y-[2px] flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-rose-600 text-white border-rose-800 shadow-2xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                  activeTab === tab.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Search Results Area */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-[220px] bg-white no-scrollbar">
        {!query.trim() ? (
          <div className="flex flex-col gap-4 py-2">
            {/* Guide Card */}
            <div className="flex flex-col items-center justify-center py-6 text-center border border-slate-100 rounded-2xl bg-gradient-to-b from-rose-50/20 to-slate-50/40 p-4">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-2.5 shadow-2xs">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-slate-800">Cari Kata Instan & Lengkap</h3>
              <p className="text-xs text-slate-500 max-w-sm mt-1 px-4 leading-relaxed">
                Ketik kata dalam <strong className="text-slate-700">Bahasa Indonesia</strong>, <strong className="text-slate-700">Romaji</strong> (contoh: <em>taberu, gakkou</em>), atau <strong className="text-slate-700">Kanji</strong>. Database {allCards.length.toLocaleString()}+ materi siap dicari instan.
              </p>
            </div>

            {/* Quick Keyword Pills */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 block mb-2 px-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Kata Kunci Populer:</span>
              </span>
              <div className="flex flex-wrap gap-1.5">
                {POPULAR_SEARCH_PILLS.map((pill) => (
                  <button
                    key={pill.query}
                    onClick={() => {
                      setQuery(pill.query);
                      inputRef.current?.focus();
                    }}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-50 hover:bg-rose-50 hover:text-rose-600 hover:border-rose-200 border border-slate-200/80 text-xs font-semibold text-slate-600 transition-all cursor-pointer active:scale-95 flex items-center gap-1"
                  >
                    <span>{pill.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5">
            {/* AI Translation Widget Section */}
            {isTranslating ? (
              <div className="bg-rose-50/20 border border-rose-200/60 rounded-2xl p-4 text-left shadow-2xs relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="px-2 py-0.5 text-[9px] font-extrabold bg-rose-600 text-white rounded uppercase tracking-wider">
                    AI Terjemahan
                  </span>
                  <div className="w-4 h-4 border-2 border-rose-600/30 border-t-rose-600 rounded-full animate-spin" />
                </div>
                <p className="text-xs font-bold text-slate-800 animate-pulse">
                  Menerjemahkan "{query}" ke Bahasa Jepang...
                </p>
              </div>
            ) : translationResult ? (
              <div className="bg-gradient-to-br from-rose-50/30 via-white to-amber-50/20 border border-rose-200/70 rounded-2xl p-3 sm:p-4 text-left relative shadow-2xs overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-rose-200/40">
                  <div className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 text-[8px] font-extrabold bg-rose-600 text-white rounded uppercase tracking-wider">
                      AI Terjemahan
                    </span>
                    <span className="text-[11px] font-bold text-slate-700">
                      "{query}"
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(translationResult.japanese)}
                    className="flex items-center gap-1 text-[10px] font-bold text-slate-500 hover:text-rose-600 bg-white border border-slate-200 px-2 py-0.5 rounded-lg cursor-pointer transition-colors"
                    title="Salin teks Jepang"
                  >
                    {copiedText === translationResult.japanese ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Indonesian Meaning */}
                <div className="mb-2.5">
                  <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                    Arti Indonesia
                  </span>
                  <p className="text-sm font-black text-slate-900 leading-snug">
                    {translationResult.meaning}
                  </p>
                </div>

                {/* 2 Compact Sections: Formal (です/ます) & Casual (Akrab) */}
                <div className="grid grid-cols-1 gap-2">
                  {/* Formal */}
                  <div className="bg-white/90 border border-slate-150 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-3xs">
                    <div className="min-w-0 flex-1">
                      <span className="text-[8px] font-extrabold text-rose-600 bg-rose-50 border border-rose-100 px-1 py-0.2 rounded uppercase tracking-wider inline-block mb-1">
                        Bentuk Sopan (Formal)
                      </span>
                      <div className="flex items-baseline flex-wrap gap-1">
                        <span className="font-jp text-base font-black text-slate-900 leading-tight">
                          {translationResult.japanese}
                        </span>
                        {translationResult.reading !== translationResult.japanese && (
                          <span className="text-xs text-slate-400 font-jp font-medium">
                            （{translationResult.reading}）
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] text-rose-500 font-bold mt-0.5">
                        {translationResult.romaji}
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => handleSpeakText(e, translationResult.japanese, translationResult.reading, 'formal')}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 border-b-[3px] active:border-b-[1px] active:translate-y-[2px] ${
                        playingType === 'formal'
                          ? 'bg-rose-600 text-white border-rose-800'
                          : 'bg-slate-50 text-slate-500 hover:bg-rose-50 hover:text-rose-600 border-slate-200'
                      }`}
                      title="Dengarkan pelafalan bentuk sopan"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingType === 'formal' ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>

                  {/* Casual */}
                  <div className="bg-white/90 border border-slate-150 rounded-xl p-2.5 flex items-center justify-between gap-3 shadow-3xs">
                    <div className="min-w-0 flex-1">
                      <span className="text-[8px] font-extrabold text-blue-600 bg-blue-50 border border-blue-100 px-1 py-0.2 rounded uppercase tracking-wider inline-block mb-1">
                        Bentuk Kasual (Akrab)
                      </span>
                      <div className="flex items-baseline flex-wrap gap-1">
                        <span className="font-jp text-base font-black text-slate-900 leading-tight">
                          {translationResult.casualJapanese}
                        </span>
                        {translationResult.casualReading !== translationResult.casualJapanese && (
                          <span className="text-xs text-slate-400 font-jp font-medium">
                            （{translationResult.casualReading}）
                          </span>
                        )}
                      </div>
                      <p className="font-mono text-[10px] text-slate-500 font-bold mt-0.5">
                        {translationResult.casualRomaji}
                      </p>
                    </div>
                    
                    <button
                      onClick={(e) => handleSpeakText(e, translationResult.casualJapanese, translationResult.casualReading, 'casual')}
                      className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all cursor-pointer shrink-0 border-b-[3px] active:border-b-[1px] active:translate-y-[2px] ${
                        playingType === 'casual'
                          ? 'bg-blue-600 text-white border-blue-800'
                          : 'bg-slate-50 text-slate-500 hover:bg-blue-50 hover:text-blue-600 border-slate-200'
                      }`}
                      title="Dengarkan pelafalan bentuk kasual"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${playingType === 'casual' ? 'animate-bounce' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Explanation */}
                {translationResult.explanation && (
                  <div className="mt-2 p-2 bg-white/70 rounded-xl border border-rose-100/50 text-[10px] sm:text-[11px] text-slate-600 leading-relaxed font-medium">
                    <strong className="text-slate-800 text-[9px] uppercase tracking-wider block mb-0.5">
                      Analisis Tata Bahasa:
                    </strong>
                    {translationResult.explanation}
                  </div>
                )}
              </div>
            ) : (
              /* Quick Translate Bar */
              <div className="bg-gradient-to-r from-slate-50 to-rose-50/30 border border-slate-200/80 rounded-2xl p-3 flex items-center justify-between gap-2.5 text-left">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center text-[10px] font-black shrink-0">
                    AI
                  </span>
                  <p className="text-xs font-semibold text-slate-700 truncate">
                    Mau terjemahan lengkap "{query}"?
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleTranslate}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl cursor-pointer transition-all border-b-[3px] border-rose-800 active:border-b-[1px] active:translate-y-[2px] shrink-0 flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Terjemahkan</span>
                </button>
              </div>
            )}

            {/* Database Search Results Header */}
            <div className="flex items-center justify-between px-1 pt-1">
              <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider">
                Kosakata Terkait ({filteredResults.length})
              </span>
              {filteredResults.length > 100 && (
                <span className="text-[10px] text-slate-400">
                  Menampilkan 100 teratas
                </span>
              )}
            </div>

            {/* Database Result Cards List */}
            {filteredResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-center border border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
                <HelpCircle className="w-8 h-8 text-slate-300 mb-1.5" />
                <h4 className="text-xs font-bold text-slate-700">Tidak ada materi database yang cocok</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 max-w-xs">
                  Gunakan tombol <strong>AI Cari</strong> di atas untuk mendapatkan terjemahan bahasa Jepang instan!
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                {visibleResults.map((card) => {
                  const isExpanded = expandedCardId === card.id;
                  const type = getCardType(card);
                  const label = getCardCategoryLabel(card);
                  const clarified = getClarifiedMeaning(card);

                  return (
                    <div
                      key={`${card.id}-${card.japanese}`}
                      onClick={() => setExpandedCardId(isExpanded ? null : card.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                        isExpanded
                          ? 'bg-slate-50/90 border-slate-300 shadow-sm ring-1 ring-slate-200'
                          : 'bg-white border-slate-200/80 hover:bg-slate-50/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        {/* Word Details */}
                        <div className="min-w-0 flex-1 text-left">
                          <div className="flex items-baseline flex-wrap gap-1.5">
                            <span className="font-jp text-base sm:text-lg font-black text-slate-900 leading-tight">
                              {card.kanji || card.japanese}
                            </span>
                            {(card.furigana || card.reading) && (
                              <span className="text-xs text-slate-500 font-medium font-jp">
                                （{card.furigana || card.reading}）
                              </span>
                            )}
                            {card.level && (
                              <span className="text-[9px] font-black px-1.5 py-0.2 bg-rose-50 text-rose-600 rounded border border-rose-100">
                                {card.level}
                              </span>
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-slate-600 font-semibold truncate max-w-[280px] sm:max-w-[420px] mt-0.5">
                            {clarified.primaryMeaning}
                          </p>
                        </div>

                        {/* Badges & Actions */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {/* Category Tag */}
                          <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-slate-500 bg-slate-100 rounded-md">
                            {type === 'kanji' ? (
                              <Tag className="w-3 h-3 text-emerald-600" />
                            ) : type === 'grammar' ? (
                              <Layers className="w-3 h-3 text-blue-600" />
                            ) : (
                              <BookOpen className="w-3 h-3 text-rose-600" />
                            )}
                            <span>{label}</span>
                          </span>

                          {/* Speak Button */}
                          <button
                            type="button"
                            onClick={(e) => handleSpeak(e, card)}
                            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
                              playingId === card.id
                                ? 'bg-rose-100 text-rose-600 ring-2 ring-rose-200'
                                : 'bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-slate-500'
                            }`}
                            title="Dengarkan pengucapan"
                          >
                            <Volume2 className={`w-4 h-4 ${playingId === card.id ? 'animate-bounce' : ''}`} />
                          </button>

                          {/* Expand chevron */}
                          <div className="text-slate-400 p-1">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.18 }}
                            className="overflow-hidden mt-3 pt-3 border-t border-slate-200/70 text-left"
                          >
                            <div className="flex flex-col gap-2.5 text-xs text-slate-700">
                              {/* Extra Writing Info */}
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white p-2 rounded-xl border border-slate-200/50">
                                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                                    Tulisan Utama
                                  </span>
                                  <span className="font-jp text-sm font-black text-slate-900">
                                    {card.japanese}
                                  </span>
                                </div>
                                <div className="bg-white p-2 rounded-xl border border-slate-200/50">
                                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-0.5">
                                    Romaji / Cara Baca
                                  </span>
                                  <span className="font-mono text-xs font-bold text-rose-600">
                                    {hiraganaToRomaji(card.furigana || card.reading || '') || card.reading || '-'}
                                  </span>
                                </div>
                              </div>

                              {/* Kanji Readings (if applicable) */}
                              {(card.onyomi || card.kunyomi || card.strokes) && (
                                <div className="bg-emerald-50/40 p-2 rounded-xl border border-emerald-100 flex items-center justify-between text-[11px]">
                                  {card.onyomi && <span><strong>Onyomi:</strong> {card.onyomi}</span>}
                                  {card.kunyomi && <span><strong>Kunyomi:</strong> {card.kunyomi}</span>}
                                  {card.strokes && <span><strong>Goresan:</strong> {card.strokes} goresan</span>}
                                </div>
                              )}

                              {/* Example Sentences */}
                              {card.exampleJp && (
                                <div className="bg-white p-2.5 rounded-xl border border-slate-200/50">
                                  <span className="text-[10px] font-bold text-slate-400 block uppercase tracking-wider mb-1">
                                    Contoh Kalimat
                                  </span>
                                  <p className="font-jp text-sm font-bold text-slate-900 leading-snug">
                                    {card.exampleJp}
                                  </p>
                                  {card.exampleId && (
                                    <p className="text-xs text-slate-600 mt-1 italic">
                                      {card.exampleId}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Mnemonic / Notes */}
                              {(card.mnemonic || card.notes) && (
                                <div className="bg-amber-50/50 p-2.5 rounded-xl border border-amber-100 text-[11px] text-amber-900">
                                  <strong className="block text-[10px] uppercase tracking-wider mb-0.5 text-amber-700">
                                    Tips & Catatan:
                                  </strong>
                                  {card.mnemonic || card.notes}
                                </div>
                              )}

                              {/* Open Category / Card button */}
                              {onSelectCard && (
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onSelectCard(card, card.category);
                                    onClose();
                                  }}
                                  className="w-full py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-98"
                                >
                                  <span>Buka Materi di Pelajaran</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Status */}
      <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
        <span>Total {allCards.length.toLocaleString()} materi pembelajaran</span>
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-rose-500" />
          <span>Pencarian Cerdas Romaji, Kanji & AI</span>
        </span>
      </div>
    </div>
  );

  if (isInline) {
    return mainLayout;
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="fixed inset-0" onClick={onClose} />
      {mainLayout}
    </div>
  );
};
