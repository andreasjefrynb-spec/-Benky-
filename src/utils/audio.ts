// Japanese Speech Synthesis and Audio feedback utility
// Features: Dual-Engine Audio (Studio-grade Native Japanese Google TTS + High-Quality Web Speech API fallback)
// and Intelligent Japanese Text Sanitization for accurate pronunciation.

/**
 * Sanitizes text before sending to Japanese speech synthesis.
 * Strips romaji, parentheses, slashes, middle dots, wave dashes, and brackets
 * so that only pure, accurately pronounceable Japanese characters remain.
 */
export function cleanJapaneseText(raw: string): string {
  if (!raw) return '';
  let t = raw.trim();

  // Pattern 1: Kanji with reading/romaji in parentheses, e.g. "一人 (ひとり / hitori)" or "二月 (にがつ / nigatsu)"
  // Extract the kana part directly for guaranteed 100% correct pronunciation
  const kanaWithRomajiMatch = t.match(/^([^\(（]+)[\(（]([\u3040-\u309F\u30A0-\u30FF\u30FC\s]+)\s*[\/|、]\s*[a-zA-Z\s\-']+[）\)]/);
  if (kanaWithRomajiMatch) {
    return kanaWithRomajiMatch[2].trim();
  }

  // Pattern 2: Kanji with pure kana in parentheses, e.g. "食べる (たべる)"
  const kanjiWithKanaMatch = t.match(/^([^\(（]+)[\(（]([\u3040-\u309F\u30A0-\u30FF\u30FC]+)[）\)]/);
  if (kanjiWithKanaMatch) {
    return kanjiWithKanaMatch[2].trim();
  }

  // Pattern 3: Kana/Word with romaji in parentheses, e.g. "あさ (asa)", "アイス (aisu)", "いぬ (inu)"
  // Remove the parentheses containing romaji
  t = t.replace(/[\(（][^）\)]*[a-zA-Z/][^）\)]*[\)）]/g, ' ');

  // Remove any remaining parentheses and bracket contents
  t = t.replace(/[\(（][^）\)]*[\)）]/g, ' ');
  t = t.replace(/\[.*?\]/g, ' ');

  // Remove wave dashes / tildes e.g. "〜と 呼んでください" -> "と 呼んでください"
  t = t.replace(/[〜~]/g, '');

  // Remove middle dots used in readings e.g. "ひと・つ" -> "ひとつ", "ふた・つ" -> "ふたつ"
  t = t.replace(/・/g, '');

  // Remove quotation marks and special Japanese brackets
  t = t.replace(/[「」『』【】〔〕〈〉《》\"']/g, ' ');

  // Remove stray latin letters, numbers, punctuation that would cause garbled pronunciation
  t = t.replace(/[a-zA-Z0-9_\-\/\\:;*#@+=]/g, ' ');

  // Collapse multiple whitespaces
  t = t.replace(/\s+/g, ' ').trim();

  // If cleaning resulted in empty string (e.g. input was only romaji), fallback to original trimmed
  if (!t && raw.trim()) {
    return raw.trim().replace(/[〜~\[\]()]/g, '');
  }

  return t;
}

class SoundManager {
  private speechSynth: SpeechSynthesis | null = null;
  private jaVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private isCurrentlyPlaying = false;
  private activeSpeakingText = '';
  private listeners: Set<(isPlaying: boolean, text: string) => void> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        this.speechSynth = window.speechSynthesis;
        this.initVoices();
        if (speechSynthesis.onvoiceschanged !== undefined) {
          speechSynthesis.onvoiceschanged = () => this.initVoices();
        }
      }
    }
  }

  private initVoices() {
    if (!this.speechSynth) return;
    const voices = this.speechSynth.getVoices();
    if (!voices || voices.length === 0) return;

    // Filter Japanese voices
    const jaVoices = voices.filter((v) => {
      const lang = v.lang.replace('_', '-').toLowerCase();
      return lang === 'ja-jp' || lang.startsWith('ja');
    });

    if (jaVoices.length === 0) {
      this.jaVoice = null;
      return;
    }

    // Rank Japanese voices by quality:
    // 1. Google 日本語 (Google Chrome native Japanese)
    // 2. Natural / Online voices (Edge & Windows 11)
    // 3. Apple premium voices (Kyoko, Otoya, Siri)
    // 4. Microsoft voices (Nanami, Keita, Ayumi, Haruka)
    // 5. Standard ja-JP voice
    const bestVoice =
      jaVoices.find((v) => v.name.includes('Google') || v.name.includes('日本語')) ||
      jaVoices.find((v) => v.name.includes('Natural') || v.name.includes('Online')) ||
      jaVoices.find((v) => v.name.includes('Kyoko') || v.name.includes('Otoya') || v.name.includes('Siri')) ||
      jaVoices.find((v) => v.name.includes('Nanami') || v.name.includes('Keita') || v.name.includes('Ayumi') || v.name.includes('Haruka')) ||
      jaVoices[0];

    this.jaVoice = bestVoice || null;
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

  public getActiveText(): string {
    return this.activeSpeakingText;
  }

  /**
   * Stop any active speech or audio immediately
   */
  public stop() {
    if (this.currentAudio) {
      this.currentAudio.pause();
      this.currentAudio.currentTime = 0;
      this.currentAudio.onended = null;
      this.currentAudio.onerror = null;
      this.currentAudio = null;
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
   * Primary: Studio-grade Native Japanese Google Audio (Tokyo Accent).
   * Fallback: System Web Speech API with verified Japanese voice.
   */
  public speak(text: string, rate: number = 0.9, onEnd?: () => void) {
    if (typeof window === 'undefined') return;

    this.stop();

    const cleanText = cleanJapaneseText(text);
    if (!cleanText) return;

    this.notifyPlaybackChange(true, cleanText);

    // Primary Engine: Studio-grade Google Japanese Neural TTS (Native Speaker Intonation)
    const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja&client=tw-ob&q=${encodeURIComponent(cleanText)}`;
    
    let isFallbackTriggered = false;
    const triggerFallback = () => {
      if (isFallbackTriggered) return;
      isFallbackTriggered = true;
      this.speakWithSpeechSynth(cleanText, rate, onEnd);
    };

    try {
      const audio = new Audio();
      this.currentAudio = audio;
      
      // Clamp playback rate safely between 0.6x and 1.5x
      audio.playbackRate = Math.min(Math.max(rate, 0.6), 1.5);

      audio.onended = () => {
        this.currentAudio = null;
        this.notifyPlaybackChange(false, '');
        onEnd?.();
      };

      audio.onerror = () => {
        triggerFallback();
      };

      // Set timeout in case network hangs
      const loadTimeout = setTimeout(() => {
        if (audio.readyState === 0 && !isFallbackTriggered) {
          triggerFallback();
        }
      }, 2500);

      audio.oncanplay = () => {
        clearTimeout(loadTimeout);
      };

      audio.src = audioUrl;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          clearTimeout(loadTimeout);
          triggerFallback();
        });
      }
    } catch {
      triggerFallback();
    }
  }

  /**
   * Secondary Engine: Browser SpeechSynthesis
   */
  private speakWithSpeechSynth(cleanText: string, rate: number, onEnd?: () => void) {
    if (!this.speechSynth) {
      this.notifyPlaybackChange(false, '');
      onEnd?.();
      return;
    }

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ja-JP';
      utterance.rate = rate;
      utterance.pitch = 1.0;

      if (!this.jaVoice) {
        this.initVoices();
      }

      if (this.jaVoice) {
        utterance.voice = this.jaVoice;
      }

      utterance.onend = () => {
        this.notifyPlaybackChange(false, '');
        onEnd?.();
      };

      utterance.onerror = () => {
        this.notifyPlaybackChange(false, '');
        onEnd?.();
      };

      this.speechSynth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
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
      this.audioCtx.resume();
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
}

export const soundManager = new SoundManager();
