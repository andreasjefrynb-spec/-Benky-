// Japanese Speech Synthesis and Audio feedback utility
// Features: Dual-layer engine (Conversational Gemini AI Voice "Kore" + High-Fidelity Tokyo Female Voice)
// with Auto-Resume, iOS gesture unlocking, and Flawless Japanese Phonetic Correction Engine.

/**
 * Common Japanese phonetic correction map.
 * Ensures tricky Kanji, special calendar counters, number counters, and ambiguous particles
 * are vocalized with 100% accurate native Tokyo pronunciation.
 */
const PHONETIC_CORRECTIONS: [RegExp, string][] = [
  // 1. Standalone Particles
  [/^は$/g, 'わ'],
  [/^へ$/g, 'え'],
  [/^を$/g, 'お'],
  [/^[「『【](は)[」』】]$/g, 'わ'],
  [/^[「『【](へ)[」』】]$/g, 'え'],
  [/^[「『【](を)[」』】]$/g, 'お'],

  // 2. Sentential Topic Particle 'は' (wa)
  [/([私彼彼女誰あなたこれそれあれどれ皆みな皆さん山田佐藤田中鈴木誰先生])は/g, '$1 わ'],
  [/([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF])は(\s*[、。！？!?\s]|$)/g, '$1 わ$2'],

  // 3. Direction Particle 'へ' (e)
  [/([日本東京大阪京都学校会社家うち駅病院コンビニ空港ホテル公園])へ/g, '$1 え'],
  [/へ([行いき来く帰かえ][\u3040-\u309F]*)/g, 'え$1'],

  // 4. Special Calendar Dates (Jukujikun & Irregular Readings)
  [/(^|[^\d])1日([^\d]|$)/g, '$1ついたち$2'],
  [/(^|[^\d])一日([^\d]|$)/g, '$1ついたち$2'],
  [/(^|[^\d])2日([^\d]|$)/g, '$1ふつか$2'],
  [/(^|[^\d])二日([^\d]|$)/g, '$1ふつか$2'],
  [/(^|[^\d])3日([^\d]|$)/g, '$1みっか$2'],
  [/(^|[^\d])三日([^\d]|$)/g, '$1みっか$2'],
  [/(^|[^\d])4日([^\d]|$)/g, '$1よっか$2'],
  [/(^|[^\d])四日([^\d]|$)/g, '$1よっか$2'],
  [/(^|[^\d])5日([^\d]|$)/g, '$1いつか$2'],
  [/(^|[^\d])五日([^\d]|$)/g, '$1いつか$2'],
  [/(^|[^\d])6日([^\d]|$)/g, '$1むいか$2'],
  [/(^|[^\d])六日([^\d]|$)/g, '$1むいか$2'],
  [/(^|[^\d])7日([^\d]|$)/g, '$1なのか$2'],
  [/(^|[^\d])七日([^\d]|$)/g, '$1なのか$2'],
  [/(^|[^\d])8日([^\d]|$)/g, '$1ようか$2'],
  [/(^|[^\d])八日([^\d]|$)/g, '$1ようか$2'],
  [/(^|[^\d])9日([^\d]|$)/g, '$1ここのか$2'],
  [/(^|[^\d])九日([^\d]|$)/g, '$1ここのか$2'],
  [/(^|[^\d])10日([^\d]|$)/g, '$1とおか$2'],
  [/(^|[^\d])十日([^\d]|$)/g, '$1とおか$2'],
  [/(^|[^\d])14日([^\d]|$)/g, '$1じゅうよっか$2'],
  [/(^|[^\d])十四日([^\d]|$)/g, '$1じゅうよっか$2'],
  [/(^|[^\d])20日([^\d]|$)/g, '$1はつか$2'],
  [/(^|[^\d])二十日([^\d]|$)/g, '$1はつか$2'],
  [/(^|[^\d])24日([^\d]|$)/g, '$1にじゅうよっか$2'],
  [/(^|[^\d])二十四日([^\d]|$)/g, '$1にじゅうよっか$2'],

  // 5. Special Counters (People, Time, Duration)
  [/(^|[^\d])1人([^\d]|$)/g, '$1ひとり$2'],
  [/(^|[^\d])一人([^\d]|$)/g, '$1ひとり$2'],
  [/(^|[^\d])2人([^\d]|$)/g, '$1ふたり$2'],
  [/(^|[^\d])二人([^\d]|$)/g, '$1ふたり$2'],
  [/(^|[^\d])4人([^\d]|$)/g, '$1よにん$2'],
  [/(^|[^\d])四人([^\d]|$)/g, '$1よにん$2'],
  [/(^|[^\d])4時([^\d]|$)/g, '$1よじ$2'],
  [/(^|[^\d])四時([^\d]|$)/g, '$1よじ$2'],
  [/(^|[^\d])7時([^\d]|$)/g, '$1しちじ$2'],
  [/(^|[^\d])七時([^\d]|$)/g, '$1しちじ$2'],
  [/(^|[^\d])9時([^\d]|$)/g, '$1くじ$2'],
  [/(^|[^\d])九時([^\d]|$)/g, '$1くじ$2'],
  [/(^|[^\d])4分([^\d]|$)/g, '$1よんぷん$2'],
  [/(^|[^\d])四分([^\d]|$)/g, '$1よんぷん$2'],

  // 6. Interrogatives
  [/何人/g, 'なんにん'],
  [/何時/g, 'なんじ'],
  [/何分/g, 'なんぷん'],
  [/何歳/g, 'なんさい'],
  [/何日/g, 'なんにち'],
  [/何月/g, 'なんがつ'],
  [/何曜日/g, 'なんようび'],
  [/何年/g, 'なんねん'],
  [/何ですか/g, 'なんですか'],
  [/何で/g, 'なんで'],

  // 7. Time Expressions
  [/一昨日/g, 'おととい'],
  [/昨日/g, 'きのう'],
  [/今日/g, 'きょう'],
  [/明日/g, 'あした'],
  [/明後日/g, 'あさって'],
  [/今朝/g, 'けさ'],
  [/今晩/g, 'こんばん'],
  [/今年/g, 'ことし'],
  [/去年/g, 'きょねん'],
  [/来年/g, 'らいねん'],
  [/今週/g, 'こんしゅう'],
  [/来週/g, 'らいしゅう'],
  [/先週/g, 'せんしゅう'],

  // 8. Tricky Verbs & Words Often Misread by TTS
  [/上手/g, 'じょうず'],
  [/下手/g, 'へた'],
  [/行って/g, 'いって'],
  [/行きます/g, 'いきます'],
  [/行きません/g, 'いきません'],
  [/行きました/g, 'いきました'],
  [/行かない/g, 'いかない'],
  [/行った/g, 'いった'],
  [/行こう/g, 'いこう'],
  [/辛い/g, 'からい'],
  [/大人/g, 'おとな'],
  [/時計/g, 'とけい'],
  [/眼鏡/g, 'めがね'],
  [/煙草/g, 'たばこ'],
  [/部屋/g, 'へや'],
  [/友達/g, 'ともだち'],
  [/家族/g, 'かぞく'],
  [/誰/g, 'だれ'],
  [/一日中/g, 'いちにちじゅう'],
  [/一言/g, 'ひとこと'],
  [/二人組/g, 'ふたりぐみ'],
  [/見方/g, 'みかた'],
  [/読み方/g, 'よみかた'],
  [/使い方/g, 'つかいかた'],
  [/食べ方/g, 'たべかた'],
  [/話し方/g, 'はなしかた'],
  [/行事/g, 'ぎょうじ'],
  [/流行/g, 'りゅうこう'],
  [/行動/g, 'こうどう'],
  [/一生懸命/g, 'いっしょうけんめい'],
  [/今度/g, 'こんど'],
  [/今回/g, 'こんかい'],
  [/今学期/g, 'こんがっき'],
  [/大雨/g, 'おおあめ'],
  [/大雪/g, 'おおゆき'],
  [/地震/g, 'じしん'],
  [/気をつける/g, 'きをつける'],
  [/気に入る/g, 'きにいる'],
  [/気にしないで/g, 'きにしないで'],
  [/間に合う/g, 'まにあう'],
  [/役に立つ/g, 'やくにたつ'],
  [/思い出す/g, 'おもいだす'],
  [/片付ける/g, 'かたづける'],
  [/申し込む/g, 'もうしこむ'],
  [/問い合わせ/g, 'といあわせ'],
  [/受付/g, 'うけつけ'],
  [/案内所/g, 'あんないじょ'],
  [/手続き/g, 'てつづき'],
  [/両替/g, 'りょうがえ'],
  [/遠慮/g, 'えんりょ'],
  [/無理/g, 'むり'],
  [/複雑/g, 'ふくざつ'],
  [/単純/g, 'たんじゅん'],
  [/正直/g, 'しょうじき'],
  [/熱心/g, 'ねっしん'],
  [/適当/g, 'てきとう'],
  [/邪魔/g, 'じゃま'],
  [/我慢/g, 'がまん'],
  [/お礼/g, 'おれい'],
  [/お祝い/g, 'おいわい'],
  [/お見舞い/g, 'おみまい'],
];

/**
 * Extracts clean phonetic Kana from a reading string if present
 */
function cleanReading(r?: unknown): string {
  if (!r || typeof r !== 'string') return '';
  let s = r.trim();
  // Strip romaji / slash patterns like "わたし / watashi" or "たべる (taberu)"
  s = s.replace(/[\(（][^）\)]*[a-zA-Z/][^）\)]*[\)）]/g, ' ');
  s = s.replace(/[a-zA-Z\s\-_\/|、]/g, '').trim();
  // Only return if it actually contains Japanese Kana
  if (/[\u3040-\u309F\u30A0-\u30FF]/.test(s)) {
    return s;
  }
  return '';
}

/**
 * Normalizes Japanese text for natural and 100% accurate pronunciation.
 * Strips formatting, handles furigana brackets, resolves ambiguous kanji,
 * and fixes particle readings.
 */
export function normalizeJapanesePronunciation(raw: unknown, explicitReading?: unknown): string {
  const rawStr = typeof raw === 'string' ? raw : (raw ? String(raw) : '');
  const readingStr = typeof explicitReading === 'string' ? explicitReading : undefined;

  if (!rawStr && !readingStr) return '';

  // 1. If an explicit reading is provided (e.g. from flashcard or vocab data), prioritize it
  const pureReading = cleanReading(readingStr);
  if (pureReading) {
    return pureReading;
  }

  let t = rawStr.trim();

  // 2. Pattern: Kanji with reading in parentheses e.g. "一人 (ひとり / hitori)" or "食べる (たべる)"
  const kanaParenthesisMatch = t.match(/^([^\(（]+)[\(（]([\u3040-\u309F\u30A0-\u30FF\u30FC\s]+)\s*[\/|、]?[a-zA-Z\s\-']*[）\)]/);
  if (kanaParenthesisMatch && kanaParenthesisMatch[2]) {
    return kanaParenthesisMatch[2].replace(/\s+/g, '').trim();
  }

  // 3. Pattern: Ruby style "漢字（かんじ）" inside text -> extract kana
  t = t.replace(/[\u4E00-\u9FAF]+[\(（]([\u3040-\u309F\u30A0-\u30FF\u30FC]+)[\)）]/g, '$1');
  t = t.replace(/[\u4E00-\u9FAF]+\[([\u3040-\u309F\u30A0-\u30FF\u30FC]+)\]/g, '$1');

  // 4. Strip romaji in parentheses e.g. "あさ (asa)"
  t = t.replace(/[\(（][^）\)]*[a-zA-Z/][^）\)]*[\)）]/g, ' ');

  // 5. Remove wave dashes, middle dots, brackets
  t = t.replace(/[〜~]/g, '');
  t = t.replace(/・/g, '');
  t = t.replace(/[「」『』【】〔〕〈〉《》\"']/g, ' ');
  t = t.replace(/[\(（]([^\)）]*)[\)）]/g, ' $1 ');
  t = t.replace(/\[(.*?)\]/g, ' $1 ');

  // 6. Apply phonetic disambiguation dictionary
  for (const [pattern, replacement] of PHONETIC_CORRECTIONS) {
    t = t.replace(pattern, replacement);
  }

  // 7. Remove stray latin letters, symbols, punctuation
  t = t.replace(/[a-zA-Z_\-\/\\:;*#@+=]/g, ' ');

  // 8. Collapse whitespace
  t = t.replace(/\s+/g, ' ').trim();

  // If cleaning resulted in empty string, fallback to original Japanese characters
  if (!t && rawStr.trim()) {
    const jpChars = rawStr.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g);
    if (jpChars && jpChars.length > 0) {
      return jpChars.join(' ');
    }
    return rawStr.trim().replace(/[〜~\[\]()]/g, '');
  }

  return t;
}

const BUILTIN_READING_CACHE = new Map<string, string>();

/**
 * Register vocabulary and card readings to guarantee zero mispronunciations across the entire app
 */
export function registerReadings(items: { japanese?: string; jp?: string; reading?: string; furigana?: string }[]) {
  if (!items || !Array.isArray(items)) return;
  for (const item of items) {
    const text = (item.japanese || item.jp || '').trim();
    const reading = (item.furigana || item.reading || '').trim();
    if (text && reading) {
      const pureReading = cleanReading(reading);
      if (pureReading) {
        BUILTIN_READING_CACHE.set(text, pureReading);
        const stripped = text.replace(/[、。！？\s]/g, '');
        if (stripped && stripped !== text) {
          BUILTIN_READING_CACHE.set(stripped, pureReading);
        }
      }
    }
  }
}

/**
 * Sanitizes text before sending to Japanese speech synthesis.
 * Strips romaji, parentheses, slashes, middle dots, wave dashes, and brackets
 * so that only pure, accurately pronounceable Japanese characters remain.
 */
export function cleanJapaneseText(raw: unknown, reading?: unknown): string {
  const rawStr = typeof raw === 'string' ? raw : (raw ? String(raw) : '');
  let readingStr = typeof reading === 'string' ? reading : undefined;

  // Auto-resolve known vocabulary readings if omitted
  if (!readingStr && rawStr) {
    const cleanKey = rawStr.trim().replace(/[、。！？\s]/g, '');
    const found = BUILTIN_READING_CACHE.get(rawStr.trim()) || BUILTIN_READING_CACHE.get(cleanKey);
    if (found) {
      readingStr = found;
    }
  }

  return normalizeJapanesePronunciation(rawStr, readingStr);
}

export type AudioEngine = 'ai' | 'device';

export interface DeviceVoiceInfo {
  voiceURI: string;
  name: string;
  displayName: string;
  lang: string;
  gender: 'female' | 'male' | 'unknown';
  quality: 'natural' | 'enhanced' | 'standard';
}

export interface AiVoiceInfo {
  id: string;
  name: string;
  jpName: string;
  gender: 'Wanita' | 'Pria' | 'Netral';
  tone: string;
  description: string;
  recommended?: boolean;
}

export const AI_VOICES: AiVoiceInfo[] = [
  {
    id: 'Kore',
    name: 'Kore',
    jpName: 'コレ',
    gender: 'Wanita',
    tone: 'Ramah, Alami & Hangat',
    description: 'Suara wanita yang ramah dengan intonasi Tokyo sangat natural dan ekspresif.',
    recommended: true,
  },
  {
    id: 'Zephyr',
    name: 'Zephyr',
    jpName: 'ゼファー',
    gender: 'Wanita',
    tone: 'Tenang, Elegan & Jelas',
    description: 'Suara wanita yang tenang dan sopan, cocok untuk menyimak percakapan formal.',
  },
  {
    id: 'Puck',
    name: 'Puck',
    jpName: 'パック',
    gender: 'Netral',
    tone: 'Ceria, Lincah & Semangat',
    description: 'Karakter suara berenergi dan ceria, menyenangkan untuk latihan repetisi.',
  },
  {
    id: 'Fenrir',
    name: 'Fenrir',
    jpName: 'フェンリル',
    gender: 'Pria',
    tone: 'Tegas, Maskulin & Berwibawa',
    description: 'Suara pria yang jernih dan tegas, pelafalan konsonan dan vokal sangat mantap.',
  },
  {
    id: 'Charon',
    name: 'Charon',
    jpName: 'カロン',
    gender: 'Pria',
    tone: 'Dewasa, Tenang & Elegan',
    description: 'Suara pria dewasa dengan timbre dalam dan intonasi stabil.',
  },
];

class SoundManager {
  private speechSynth: SpeechSynthesis | null = null;
  private jaVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlyPlaying = false;
  private activeSpeakingText = '';
  private listeners: Set<(isPlaying: boolean, text: string) => void> = new Set();
  private engineListeners: Set<() => void> = new Set();
  private isUnlocked = false;

  // AI Speech Engine & Caching
  private engine: AudioEngine = 'ai';
  private aiVoice = 'Kore';
  private selectedDeviceVoiceURI: string | null = null;
  private clientAudioCache = new Map<string, string>();
  private activeFetchController: AbortController | null = null;
  private aiCooldownUntil = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      try {
        const savedEngine = localStorage.getItem('nihongo_audio_engine') as AudioEngine | null;
        if (savedEngine === 'ai' || savedEngine === 'device') {
          this.engine = savedEngine;
        }
        const savedVoice = localStorage.getItem('nihongo_ai_voice');
        if (savedVoice && AI_VOICES.some((v) => v.id === savedVoice)) {
          this.aiVoice = savedVoice;
        }
        const savedDeviceVoice = localStorage.getItem('nihongo_device_voice');
        if (savedDeviceVoice) {
          this.selectedDeviceVoiceURI = savedDeviceVoice;
        }
      } catch {
        // ignore localStorage access error
      }

      if ('speechSynthesis' in window) {
        this.speechSynth = window.speechSynthesis;
        this.initVoices();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.initVoices();
        }
      }
      this.initMobileUnlock();
    }
  }

  /**
   * Unlocks iOS Safari and Android Chrome audio restrictions on the very first touch/click
   */
  private initMobileUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (this.isUnlocked) return;
      this.isUnlocked = true;

      // Unlock speech synthesis queue
      if (this.speechSynth) {
        try {
          if (this.speechSynth.paused) {
            this.speechSynth.resume();
          }
          // Silent micro-utterance to initialize audio hardware
          const silent = new SpeechSynthesisUtterance('');
          silent.volume = 0;
          this.speechSynth.speak(silent);
        } catch {
          // ignore
        }
      }

      // Unlock AudioContext for sound effects
      if (this.audioCtx && this.audioCtx.state === 'suspended') {
        try {
          this.audioCtx.resume();
        } catch {
          // ignore
        }
      }

      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('touchend', unlock);
      window.removeEventListener('click', unlock);
    };

    window.addEventListener('touchstart', unlock, { passive: true, once: true });
    window.addEventListener('touchend', unlock, { passive: true, once: true });
    window.addEventListener('click', unlock, { passive: true, once: true });
  }

  public getAvailableDeviceVoices(): DeviceVoiceInfo[] {
    if (!this.speechSynth) return [];
    try {
      const voices = this.speechSynth.getVoices() || [];
      const jaVoices = voices.filter((v) => {
        const lang = (v.lang || '').replace('_', '-').toLowerCase();
        return lang === 'ja-jp' || lang.startsWith('ja');
      });

      return jaVoices.map((v) => {
        const nameLower = v.name.toLowerCase();
        const isMale = /male|man\b|otoya|keita|ichiro|daichi|kenji/i.test(nameLower);
        const isFemale = /female|woman|girl|nanami|kyoko|siri|ayumi|haruka|mayu|aoi|shiori/i.test(nameLower);
        const gender: 'female' | 'male' | 'unknown' = isMale ? 'male' : isFemale ? 'female' : 'unknown';

        let quality: 'natural' | 'enhanced' | 'standard' = 'standard';
        if (/natural|neural|online/i.test(nameLower)) {
          quality = 'natural';
        } else if (/enhanced|siri/i.test(nameLower)) {
          quality = 'enhanced';
        }

        let displayName = v.name;
        displayName = displayName
          .replace(/^Microsoft\s+/i, 'Microsoft ')
          .replace(/\s+-\s+Japanese\s*\(Japan\)/i, '')
          .replace(/\s*\(Japan\)/i, '');

        return {
          voiceURI: v.voiceURI,
          name: v.name,
          displayName,
          lang: v.lang,
          gender,
          quality,
        };
      });
    } catch {
      return [];
    }
  }

  public getSelectedDeviceVoice(): string | null {
    return this.selectedDeviceVoiceURI;
  }

  public setSelectedDeviceVoice(voiceURI: string | null) {
    this.selectedDeviceVoiceURI = voiceURI;
    try {
      if (voiceURI) {
        localStorage.setItem('nihongo_device_voice', voiceURI);
      } else {
        localStorage.removeItem('nihongo_device_voice');
      }
    } catch {
      // ignore
    }
    this.initVoices();
    this.notifyEngineChange();
  }

  private initVoices() {
    if (!this.speechSynth) return;
    try {
      const voices = this.speechSynth.getVoices();
      if (!voices || voices.length === 0) return;

      // Filter Japanese voices
      const jaVoices = voices.filter((v) => {
        const lang = (v.lang || '').replace('_', '-').toLowerCase();
        return lang === 'ja-jp' || lang.startsWith('ja');
      });

      if (jaVoices.length === 0) {
        this.jaVoice = null;
        return;
      }

      // 1. Explicit user selection from Audio Settings
      if (this.selectedDeviceVoiceURI) {
        const customVoice = jaVoices.find((v) => v.voiceURI === this.selectedDeviceVoiceURI);
        if (customVoice) {
          this.jaVoice = customVoice;
          return;
        }
      }

      // 2. Persona gender matching
      const isMalePersona = this.aiVoice === 'Fenrir' || this.aiVoice === 'Charon';

      if (isMalePersona) {
        const maleVoice =
          jaVoices.find((v) => /keita.*natural|natural.*keita/i.test(v.name)) ||
          jaVoices.find((v) => /otoya.*enhanced|enhanced.*otoya/i.test(v.name)) ||
          jaVoices.find((v) => /natural.*male|male.*natural/i.test(v.name)) ||
          jaVoices.find((v) => /keita|otoya|daichi|ichiro/i.test(v.name)) ||
          jaVoices.find((v) => /male|man\b/i.test(v.name));
        if (maleVoice) {
          this.jaVoice = maleVoice;
          return;
        }
      }

      // 3. Natural / Neural Female Voice Ranking (Studio Human Quality)
      const bestVoice =
        jaVoices.find((v) => /nanami.*natural|natural.*nanami/i.test(v.name)) ||
        jaVoices.find((v) => /kyoko.*enhanced|enhanced.*kyoko/i.test(v.name)) ||
        jaVoices.find((v) => /aoi.*natural|mayu.*natural|shiori.*natural/i.test(v.name)) ||
        jaVoices.find((v) => /siri.*japanese/i.test(v.name)) ||
        jaVoices.find((v) => /natural|neural|online/i.test(v.name)) ||
        jaVoices.find((v) => /nanami/i.test(v.name)) ||
        jaVoices.find((v) => /kyoko/i.test(v.name)) ||
        jaVoices.find((v) => /ayumi|haruka|mayu|sayaka/i.test(v.name)) ||
        jaVoices.find((v) => /google|日本語/i.test(v.name)) ||
        jaVoices.find((v) => !/otoya|keita|ichiro|daichi|male|man\b/i.test(v.name)) ||
        jaVoices[0];

      this.jaVoice = bestVoice || null;
    } catch {
      this.jaVoice = null;
    }
  }

  /**
   * Subscribe to playback status changes (useful for animated audio icons)
   */
  public onPlaybackChange(listener: (isPlaying: boolean, text: string) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyPlaybackChange(isPlaying: boolean, text: string) {
    this.isCurrentlyPlaying = isPlaying;
    this.activeSpeakingText = isPlaying ? text : '';
    this.listeners.forEach((fn) => {
      try {
        fn(isPlaying, text);
      } catch {
        // ignore callback error
      }
    });
  }

  public isSpeaking(): boolean {
    return this.isCurrentlyPlaying;
  }

  public isAiQuotaCooldown(): boolean {
    return Date.now() < this.aiCooldownUntil;
  }

  public getAiCooldownSeconds(): number {
    return Math.max(0, Math.ceil((this.aiCooldownUntil - Date.now()) / 1000));
  }

  public getActiveText(): string {
    return this.activeSpeakingText;
  }

  /**
   * Stop any active speech or audio immediately
   */
  public stop() {
    if (this.activeFetchController) {
      try {
        this.activeFetchController.abort();
      } catch {
        // ignore
      }
      this.activeFetchController = null;
    }

    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
        this.currentAudio.onended = null;
        this.currentAudio.onerror = null;
        this.currentAudio = null;
      } catch {
        // ignore
      }
    }

    if (this.speechSynth) {
      try {
        this.speechSynth.cancel();
      } catch {
        // ignore
      }
    }

    this.notifyPlaybackChange(false, '');
  }

  /**
   * Play high-quality Japanese speech pronunciation.
   * Default voice is strictly Kore with natural, zero-mispronunciation phonetics.
   */
  public speak(text: string, rate: number = 0.9, onEnd?: () => void, reading?: string) {
    if (typeof window === 'undefined') return;

    this.stop();

    if (!this.aiVoice) {
      this.aiVoice = 'Kore';
    }

    const cleanText = cleanJapaneseText(text, reading);
    if (!cleanText) return;

    this.notifyPlaybackChange(true, cleanText);

    // If AI voice engine is chosen, use conversational speech
    if (this.engine === 'ai') {
      this.speakWithAi(cleanText, rate, onEnd, reading);
      return;
    }

    // Synchronous native Web Speech execution
    if (this.speechSynth) {
      this.speakWithSpeechSynth(cleanText, rate, onEnd);
      return;
    }

    // Secondary fallback for legacy browsers without speechSynthesis
    this.speakWithAudioFallback(cleanText, rate, onEnd);
  }

  /**
   * Conversational Gemini AI Speech Engine (strictly using Kore voice)
   */
  private async speakWithAi(cleanText: string, rate: number, onEnd?: () => void, reading?: string) {
    const voice = this.aiVoice || 'Kore';
    const cacheKey = `${voice}:${cleanText}`;

    // 1. Instant Cache Hit
    if (this.clientAudioCache.has(cacheKey)) {
      const cachedUrl = this.clientAudioCache.get(cacheKey)!;
      this.playAudioUrl(cachedUrl, rate, onEnd);
      return;
    }

    // If Gemini TTS is currently on quota cooldown, immediately fallback to Tokyo female voice with zero delay
    if (Date.now() < this.aiCooldownUntil) {
      if (this.isCurrentlyPlaying && this.activeSpeakingText === cleanText) {
        this.speakWithSpeechSynth(cleanText, rate, onEnd);
      }
      return;
    }

    // 2. Fetch from Gemini TTS Server Endpoint
    const controller = new AbortController();
    this.activeFetchController = controller;

    // Timeout safety fallback: if network is slow, seamlessly fall back to Kore-tuned SpeechSynth
    const timeoutId = setTimeout(() => {
      if (this.activeFetchController === controller) {
        controller.abort();
        this.activeFetchController = null;
        if (this.isCurrentlyPlaying && this.activeSpeakingText === cleanText) {
          this.speakWithSpeechSynth(cleanText, rate, onEnd);
        }
      }
    }, 4500);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, reading, voice }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (this.activeFetchController === controller) {
        this.activeFetchController = null;
      }

      if (!response.ok) {
        if (response.status === 429) {
          this.aiCooldownUntil = Date.now() + 45_000; // 45s cooldown
        }
        throw new Error(`TTS server error ${response.status}`);
      }

      const data = await response.json();
      if (data.audio) {
        const audioUrl = `data:audio/wav;base64,${data.audio}`;
        this.clientAudioCache.set(cacheKey, audioUrl);

        // Only play if the user is still waiting for this speech item
        if (this.isCurrentlyPlaying && this.activeSpeakingText === cleanText) {
          this.playAudioUrl(audioUrl, rate, onEnd);
        }
        return;
      }

      // If server instructed fallback due to quota or rate limit
      if (data.fallback) {
        if (data.quotaExceeded) {
          const retrySec = typeof data.retryAfter === 'number' ? Math.min(data.retryAfter, 60) : 45;
          this.aiCooldownUntil = Date.now() + retrySec * 1000;
        }
        if (this.isCurrentlyPlaying && this.activeSpeakingText === cleanText) {
          this.speakWithSpeechSynth(cleanText, rate, onEnd);
        }
        return;
      }

      throw new Error('No audio returned');
    } catch (err: any) {
      clearTimeout(timeoutId);
      if (this.activeFetchController === controller) {
        this.activeFetchController = null;
      }

      // If aborted because user clicked another word, do not trigger fallback
      if (err?.name === 'AbortError') {
        return;
      }

      // Fall back seamlessly to Kore-tuned high-fidelity Tokyo female voice
      if (this.isCurrentlyPlaying && this.activeSpeakingText === cleanText) {
        this.speakWithSpeechSynth(cleanText, rate, onEnd);
      }
    }
  }

  private playAudioUrl(url: string, rate: number, onEnd?: () => void) {
    try {
      const audio = new Audio(url);
      this.currentAudio = audio;
      audio.playbackRate = Math.min(Math.max(rate, 0.6), 1.3);

      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        if (this.currentAudio === audio) {
          this.currentAudio = null;
        }
        this.notifyPlaybackChange(false, '');
        onEnd?.();
      };

      audio.onended = finish;
      audio.onerror = () => {
        finish();
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          finish();
        });
      }
    } catch {
      this.notifyPlaybackChange(false, '');
      onEnd?.();
    }
  }

  /**
   * Primary Engine: High-fidelity natural Tokyo female voice tuned to Kore's pitch & cadence
   */
  private speakWithSpeechSynth(cleanText: string, rate: number, onEnd?: () => void) {
    if (!this.speechSynth) {
      this.notifyPlaybackChange(false, '');
      onEnd?.();
      return;
    }

    try {
      // Resume if paused (critical for iOS Safari after lock or idle)
      if (this.speechSynth.paused) {
        this.speechSynth.resume();
      }
      this.speechSynth.cancel();

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';

      if (!this.jaVoice) {
        this.initVoices();
      }

      if (this.jaVoice) {
        utterance.voice = this.jaVoice;
      }

      const voiceName = (this.jaVoice?.name || '').toLowerCase();
      const isMale =
        /male|man\b|otoya|keita|ichiro|daichi|kenji/i.test(voiceName) ||
        this.aiVoice === 'Fenrir' ||
        this.aiVoice === 'Charon';
      const isPuck = this.aiVoice === 'Puck';

      // Natural conversational pitch & cadence tuning (eliminates robotic tone)
      if (isMale) {
        utterance.pitch = 0.93; // Deep, calm natural masculine pitch
        utterance.rate = Math.min(Math.max(rate * 0.94, 0.65), 1.15);
      } else if (isPuck) {
        utterance.pitch = 1.05; // Bright and energetic
        utterance.rate = Math.min(Math.max(rate * 0.98, 0.7), 1.2);
      } else {
        utterance.pitch = 1.0; // Reference 1.0 native Tokyo female pitch (no artificial squeak)
        utterance.rate = Math.min(Math.max(rate * 0.94, 0.65), 1.15);
      }

      utterance.volume = 1.0;

      this.currentUtterance = utterance;

      let hasFinished = false;
      const finish = () => {
        if (hasFinished) return;
        hasFinished = true;
        this.currentUtterance = null;
        this.notifyPlaybackChange(false, '');
        onEnd?.();
      };

      utterance.onend = finish;
      utterance.onerror = (e) => {
        // If speechSynthesis threw an error or is canceled, try fallback audio if text wasn't spoken
        if (e.error !== 'canceled' && e.error !== 'interrupted') {
          try {
            this.speakWithAudioFallback(cleanText, rate, onEnd);
            return;
          } catch {
            // ignore
          }
        }
        finish();
      };

      // Safeguard for mobile browsers where onend occasionally fails to fire
      const estimatedDuration = Math.max(1500, cleanText.length * 450);
      setTimeout(() => {
        if (!hasFinished && this.isCurrentlyPlaying) {
          finish();
        }
      }, estimatedDuration);

      this.speechSynth.speak(utterance);
    } catch {
      this.speakWithAudioFallback(cleanText, rate, onEnd);
    }
  }

  /**
   * Fallback for browsers lacking window.speechSynthesis
   */
  private speakWithAudioFallback(cleanText: string, rate: number, onEnd?: () => void) {
    try {
      const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
      const audio = new Audio();
      this.currentAudio = audio;
      audio.playbackRate = Math.min(Math.max(rate, 0.6), 1.4);

      audio.onended = () => {
        this.currentAudio = null;
        this.notifyPlaybackChange(false, '');
        onEnd?.();
      };

      audio.onerror = () => {
        this.currentAudio = null;
        this.notifyPlaybackChange(false, '');
        onEnd?.();
      };

      audio.src = audioUrl;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          this.currentAudio = null;
          this.notifyPlaybackChange(false, '');
          onEnd?.();
        });
      }
    } catch {
      this.notifyPlaybackChange(false, '');
      onEnd?.();
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.audioCtx = new AudioCtx();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      try {
        this.audioCtx.resume();
      } catch {
        // ignore
      }
    }
    return this.audioCtx;
  }

  /**
   * Play pleasant chime for correct answer
   */
  public playCorrectSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5
      gain1.gain.setValueAtTime(0.15, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1046.5, now + 0.08); // C6
      gain2.gain.setValueAtTime(0.12, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.4);
    } catch {
      // ignore
    }
  }

  /**
   * Play soft low thump for incorrect answer
   */
  public playWrongSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now); // A3
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.25);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  }

  /**
   * Play crisp card flip sound
   */
  public playFlipSound() {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(600, now + 0.06);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // ignore
    }
  }

  /**
   * Aliases for intuitive API access across components
   */
  public speakJapanese(text: string, rate: number = 0.9, onEnd?: () => void, reading?: string) {
    this.speak(text, rate, onEnd, reading);
  }

  /**
   * Play extra clear, slower Japanese pronunciation (0.7x) for deep auditory analysis and learners
   */
  public speakSlow(text: string, onEnd?: () => void, reading?: string) {
    this.speak(text, 0.7, onEnd, reading);
  }

  public playCorrect() {
    this.playCorrectSound();
  }

  public playWrong() {
    this.playWrongSound();
  }

  /**
   * Plays a musical tone with marimba/bell envelope for song melodies
   */
  public playTone(freq: number, duration: number = 0.35, type: OscillatorType = 'triangle', volume: number = 0.18) {
    const ctx = this.getAudioContext();
    if (!ctx) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(volume, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + duration);
    } catch {
      // ignore
    }
  }

  /**
   * Stop both speech synthesis and any audio clips
   */
  public stopAll() {
    this.stop();
  }

  public getEngine(): AudioEngine {
    return this.engine;
  }

  public setEngine(engine: AudioEngine) {
    this.engine = engine;
    try {
      localStorage.setItem('nihongo_audio_engine', engine);
    } catch {
      // ignore
    }
    this.notifyEngineChange();
  }

  public getAiVoice(): string {
    return this.aiVoice;
  }

  public setAiVoice(voice: string) {
    if (AI_VOICES.some((v) => v.id === voice)) {
      this.aiVoice = voice;
      try {
        localStorage.setItem('nihongo_ai_voice', voice);
      } catch {
        // ignore
      }
      this.notifyEngineChange();
    }
  }

  public onEngineChange(listener: () => void): () => void {
    this.engineListeners.add(listener);
    return () => this.engineListeners.delete(listener);
  }

  private notifyEngineChange() {
    this.engineListeners.forEach((fn) => {
      try {
        fn();
      } catch {
        // ignore
      }
    });
  }

  /**
   * Pre-fetches AI voice audio for smoother subsequent interactions
   */
  public async prefetchText(text: string) {
    if (this.engine !== 'ai') return;
    const cleanText = cleanJapaneseText(text);
    if (!cleanText) return;
    const cacheKey = `${this.aiVoice}:${cleanText}`;
    if (this.clientAudioCache.has(cacheKey)) return;

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: cleanText, voice: this.aiVoice }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.audio) {
          this.clientAudioCache.set(cacheKey, `data:audio/wav;base64,${data.audio}`);
        }
      }
    } catch {
      // ignore prefetch errors
    }
  }
}

export const soundManager = new SoundManager();

export function speakJapanese(text: string, rate: number = 0.9, onEnd?: () => void, reading?: string) {
  soundManager.speakJapanese(text, rate, onEnd, reading);
}

export function speakJapaneseSlow(text: string, onEnd?: () => void, reading?: string) {
  soundManager.speakSlow(text, onEnd, reading);
}


