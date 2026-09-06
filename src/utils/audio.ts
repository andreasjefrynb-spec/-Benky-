// Japanese Speech Synthesis and Audio feedback utility
// Features: Mobile-First Synchronous Web Speech API Engine (Native Siri on iOS, Google TTS on Android)
// with Auto-Resume, iOS gesture unlocking, and Intelligent Japanese Text Sanitization.

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

  // Remove wave dashes / tildes e.g. "〜と 呼んでください" -> "と 呼んでください", "〜て" -> "て"
  t = t.replace(/[〜~]/g, '');

  // Remove middle dots used in readings e.g. "ひと・つ" -> "ひとつ", "ふた・つ" -> "ふたつ"
  t = t.replace(/・/g, '');

  // Remove quotation marks and special Japanese brackets
  t = t.replace(/[「」『』【】〔〕〈〉《》\"']/g, ' ');

  // Remove remaining parentheses but preserve any Japanese characters inside them
  t = t.replace(/[\(（]([^\)）]*)[\)）]/g, ' $1 ');
  t = t.replace(/\[(.*?)\]/g, ' $1 ');

  // Remove stray latin letters, symbols, punctuation that would cause garbled pronunciation
  // KEEP numbers 0-9 so expressions like 5時 (goji) or 1000円 (sen'en) are pronounced naturally!
  t = t.replace(/[a-zA-Z_\-\/\\:;*#@+=]/g, ' ');

  // Collapse multiple whitespaces
  t = t.replace(/\s+/g, ' ').trim();

  // If cleaning resulted in empty string (e.g. input was only latin title with Japanese brackets),
  // extract any Japanese characters present in the original raw string
  if (!t && raw.trim()) {
    const jpChars = raw.match(/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g);
    if (jpChars && jpChars.length > 0) {
      return jpChars.join(' ');
    }
    return raw.trim().replace(/[〜~\[\]()]/g, '');
  }

  return t;
}

class SoundManager {
  private speechSynth: SpeechSynthesis | null = null;
  private jaVoice: SpeechSynthesisVoice | null = null;
  private audioCtx: AudioContext | null = null;
  private currentAudio: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isCurrentlyPlaying = false;
  private activeSpeakingText = '';
  private listeners: Set<(isPlaying: boolean, text: string) => void> = new Set();
  private isUnlocked = false;

  constructor() {
    if (typeof window !== 'undefined') {
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

      // Rank Japanese voices by naturalness & quality:
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

  public getActiveText(): string {
    return this.activeSpeakingText;
  }

  /**
   * Stop any active speech or audio immediately
   */
  public stop() {
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
   * Mobile-first synchronous execution using native Web Speech API (Siri / Google TTS).
   */
  public speak(text: string, rate: number = 0.9, onEnd?: () => void) {
    if (typeof window === 'undefined') return;

    this.stop();

    const cleanText = cleanJapaneseText(text);
    if (!cleanText) return;

    this.notifyPlaybackChange(true, cleanText);

    // Synchronous native Web Speech execution (100% compliant with iOS Safari & Android Chrome autoplay policies)
    if (this.speechSynth) {
      this.speakWithSpeechSynth(cleanText, rate, onEnd);
      return;
    }

    // Secondary fallback for legacy browsers without speechSynthesis
    this.speakWithAudioFallback(cleanText, rate, onEnd);
  }

  /**
   * Primary Engine: Synchronous Native SpeechSynthesis
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
      // Clamp rate safely between 0.7x and 1.2x
      utterance.rate = Math.min(Math.max(rate, 0.7), 1.2);
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      if (!this.jaVoice) {
        this.initVoices();
      }

      if (this.jaVoice) {
        utterance.voice = this.jaVoice;
      }

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
      utterance.onerror = () => {
        // If speechSynthesis threw an error, attempt secondary audio tag
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
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      this.notifyPlaybackChange(false, '');
      onEnd?.();
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
  public speakJapanese(text: string, rate: number = 0.9, onEnd?: () => void) {
    this.speak(text, rate, onEnd);
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
}

export const soundManager = new SoundManager();

export function speakJapanese(text: string, rate: number = 0.9, onEnd?: () => void) {
  soundManager.speakJapanese(text, rate, onEnd);
}

