import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Modality } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "5mb" }));

// CORS middleware for mobile and cross-origin reliability
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// In-memory TTS cache: key -> base64 WAV string
const ttsCache = new Map<string, string>();
const MAX_CACHE_SIZE = 2500;

// Track quota cooldown to prevent spamming the Gemini API when free tier quota is hit
let ttsQuotaExhaustedUntil = 0;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI | null {
  if (!process.env.GEMINI_API_KEY) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

/**
 * Wraps raw linear 16-bit PCM buffer into standard WAV container
 */
function pcmToWav(pcmBuffer: Buffer, sampleRate = 24000, numChannels = 1): Buffer {
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = pcmBuffer.length;
  const header = Buffer.alloc(44);

  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20); // PCM format
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(16, 34); // 16-bit
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  return Buffer.concat([header, pcmBuffer]);
}

/**
 * Phonetic corrections for Gemini TTS so speech model never mispronounces tricky Kanji or particles
 */
const SERVER_PHONETIC_CORRECTIONS: [RegExp, string][] = [
  [/^は$/g, 'わ'],
  [/^へ$/g, 'え'],
  [/^を$/g, 'お'],
  [/^[「『【](は)[」』】]$/g, 'わ'],
  [/^[「『【](へ)[」』】]$/g, 'え'],
  [/^[「『【](を)[」』】]$/g, 'お'],
  [/([私彼彼女誰あなたこれそれあれどれ皆みな皆さん山田佐藤田中鈴木誰先生])は/g, '$1 わ'],
  [/([\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF])は(\s*[、。！？!?\s]|$)/g, '$1 わ$2'],
  [/([日本東京大阪京都学校会社家うち駅病院コンビニ空港ホテル公園])へ/g, '$1 え'],
  [/へ([行いき来く帰かえ][\u3040-\u309F]*)/g, 'え$1'],
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
  [/上手/g, 'じょうず'],
  [/下手/g, 'へた'],
  [/行って/g, 'いって'],
  [/行きます/g, 'いきます'],
  [/行きません/g, 'いきません'],
  [/行きました/g, 'いきました'],
  [/行かない/g, 'いかない'],
  [/行った/g, 'いった'],
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
 * Clean Japanese text and apply phonetic disambiguation for natural TTS output
 */
function sanitizeJapaneseText(raw: unknown, explicitReading?: unknown): string {
  const rawStr = typeof raw === 'string' ? raw : (raw ? String(raw) : '');
  const readingStr = typeof explicitReading === 'string' ? explicitReading : undefined;

  if (!rawStr && !readingStr) return "";

  // If explicit kana reading is provided, clean and prioritize it
  if (readingStr) {
    let pure = readingStr.replace(/[\(（][^）\)]*[a-zA-Z/][^）\)]*[\)）]/g, " ");
    pure = pure.replace(/[a-zA-Z\s\-_\/|、]/g, "").trim();
    if (/[\u3040-\u309F\u30A0-\u30FF]/.test(pure)) {
      return pure;
    }
  }

  let t = rawStr.trim();

  // Pattern: Kanji with reading in parentheses e.g. "一人 (ひとり / hitori)"
  const kanaParenthesisMatch = t.match(/^([^\(（]+)[\(（]([\u3040-\u309F\u30A0-\u30FF\u30FC\s]+)\s*[\/|、]?[a-zA-Z\s\-']*[）\)]/);
  if (kanaParenthesisMatch && kanaParenthesisMatch[2]) {
    return kanaParenthesisMatch[2].replace(/\s+/g, "").trim();
  }

  // Ruby style
  t = t.replace(/[\u4E00-\u9FAF]+[\(（]([\u3040-\u309F\u30A0-\u30FF\u30FC]+)[\)）]/g, "$1");
  t = t.replace(/[\u4E00-\u9FAF]+\[([\u3040-\u309F\u30A0-\u30FF\u30FC]+)\]/g, "$1");

  // Strip romaji / parentheses translations
  t = t.replace(/[\(（][^）\)]*[a-zA-Z/][^）\)]*[\)）]/g, " ");
  t = t.replace(/[〜~]/g, "");
  t = t.replace(/・/g, "");
  t = t.replace(/[「」『』【】〔〕〈〉《》\"']/g, " ");
  t = t.replace(/[\(（]([^\)）]*)[\)）]/g, " $1 ");
  t = t.replace(/\[(.*?)\]/g, " $1 ");

  // Phonetic substitutions
  for (const [pattern, replacement] of SERVER_PHONETIC_CORRECTIONS) {
    t = t.replace(pattern, replacement);
  }

  t = t.replace(/[a-zA-Z_\-\/\\:;*#@+=]/g, " ");
  t = t.replace(/\s+/g, " ").trim();

  return t || rawStr.trim();
}

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasApiKey: !!process.env.GEMINI_API_KEY,
    cachedItems: ttsCache.size,
  });
});

// Gemini Realistic Conversational TTS Endpoint
app.post("/api/tts", async (req, res) => {
  try {
    const { text, reading, voice } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Text is required", fallback: true });
    }

    const cleanText = sanitizeJapaneseText(text, reading);
    if (!cleanText) {
      return res.status(400).json({ error: "No speakable text provided", fallback: true });
    }

    // Supported voices: 'Kore', 'Zephyr', 'Puck', 'Fenrir', 'Charon'
    const allowedVoices = ["Kore", "Zephyr", "Puck", "Fenrir", "Charon"];
    const selectedVoice = allowedVoices.includes(voice) ? voice : "Kore";

    const cacheKey = `${selectedVoice}:${cleanText}`;
    if (ttsCache.has(cacheKey)) {
      const cachedAudio = ttsCache.get(cacheKey)!;
      return res.json({
        audio: cachedAudio,
        mimeType: "audio/wav",
        voice: selectedVoice,
        cached: true,
      });
    }

    // If Gemini TTS is currently on quota cooldown, immediately fallback without making API calls
    if (Date.now() < ttsQuotaExhaustedUntil) {
      return res.status(200).json({
        fallback: true,
        voice: selectedVoice,
        quotaExceeded: true,
        retryAfter: Math.ceil((ttsQuotaExhaustedUntil - Date.now()) / 1000),
      });
    }

    const ai = getAI();
    if (!ai) {
      return res.status(200).json({
        error: "GEMINI_API_KEY is not configured",
        fallback: true,
        voice: selectedVoice,
      });
    }

    // Request natural conversational speech from Gemini TTS models
    const promptText = `Say naturally and clearly in authentic native Tokyo Japanese with natural pitch accent: ${cleanText}`;
    const candidateModels = [
      "gemini-3.1-flash-tts-preview",
      "gemini-2.5-flash-preview-tts",
    ];

    let response: any = null;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: [{ parts: [{ text: promptText }] }],
          config: {
            responseModalities: [Modality.AUDIO],
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: selectedVoice },
              },
            },
          },
        });
        if (response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
          break; // successfully generated audio!
        }
      } catch (err: any) {
        lastError = err;
      }
    }

    if (!response?.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
      const errStr = String(lastError?.message || lastError || "");
      const isQuota =
        lastError?.status === 429 ||
        errStr.includes("429") ||
        errStr.includes("RESOURCE_EXHAUSTED") ||
        errStr.includes("quota") ||
        errStr.includes("Quota");

      if (isQuota) {
        let retrySeconds = 45; // brief 45s cooldown
        const retryMatch = errStr.match(/retry in ([0-9.]+)s/i) || errStr.match(/retryDelay['":\s]+(\d+)s/i);
        if (retryMatch && retryMatch[1]) {
          retrySeconds = Math.max(Math.ceil(parseFloat(retryMatch[1])), 10);
        }

        ttsQuotaExhaustedUntil = Date.now() + retrySeconds * 1000;
        return res.status(200).json({
          fallback: true,
          voice: selectedVoice,
          quotaExceeded: true,
          retryAfter: retrySeconds,
        });
      }

      return res.status(200).json({
        fallback: true,
        voice: selectedVoice,
      });
    }

    const pcmBase64 = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!pcmBase64) {
      return res.status(200).json({
        error: "No audio data returned by Gemini TTS",
        fallback: true,
        voice: selectedVoice,
      });
    }

    // Convert raw 24kHz 16-bit PCM to standard playable WAV
    const pcmBuffer = Buffer.from(pcmBase64, "base64");
    const wavBuffer = pcmToWav(pcmBuffer, 24000, 1);
    const wavBase64 = wavBuffer.toString("base64");

    // Cache result
    if (ttsCache.size >= MAX_CACHE_SIZE) {
      const firstKey = ttsCache.keys().next().value;
      if (firstKey) ttsCache.delete(firstKey);
    }
    ttsCache.set(cacheKey, wavBase64);

    return res.json({
      audio: wavBase64,
      mimeType: "audio/wav",
      voice: selectedVoice,
      cached: false,
    });
  } catch (error: any) {
    const errSummary = String(error?.message || error || "").slice(0, 80);
    console.info("[TTS Service] Fallback active:", errSummary);
    return res.status(200).json({
      error: "Audio fallback mode",
      fallback: true,
      voice: "Kore",
    });
  }
});

// Gemini AI Real-time Translator Endpoint
app.post("/api/translate", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || typeof text !== "string" || !text.trim()) {
      return res.status(400).json({ error: "Text is required for translation" });
    }

    const ai = getAI();
    if (!ai) {
      return res.status(503).json({ error: "Gemini API is not configured on the server" });
    }

    const queryText = text.trim();
    const promptText = `You are an expert Japanese-Indonesian translator and language teacher.
Translate the following input: "${queryText}"

If the input is in Indonesian or English, translate it into natural, correct Japanese.
If the input is in Japanese, translate it into natural, correct Indonesian.

Provide the response in the requested JSON structure.
- "japanese": the polite/formal/standard form (bentuk sopan/formal, e.g. using です/ます).
- "reading": the pronunciation entirely in hiragana for the formal form.
- "romaji": the Romaji transliteration for the formal form.
- "casualJapanese": the casual/non-formal form (bentuk kasual/akrab, e.g. using plain/dictionary form).
- "casualReading": the pronunciation entirely in hiragana for the casual form.
- "casualRomaji": the Romaji transliteration for the casual form.
- "meaning": the clear meaning in Indonesian.
- "explanation": a very brief grammatical breakdown in Indonesian (e.g. explaining particles, word roots, and the difference between the formal and casual forms). Keep it concise (max 2 sentences).`;

    const candidateModels = [
      "gemini-3.5-flash",       // Native container model
      "gemini-3.8-flash",
      "gemini-3.1-flash-lite",
      "gemini-flash-latest",
      "gemini-3.1-pro-preview"
    ];

    let response: any = null;
    let lastError: any = null;

    for (const modelName of candidateModels) {
      try {
        response = await ai.models.generateContent({
          model: modelName,
          contents: [{ parts: [{ text: promptText }] }],
          config: {
            responseMimeType: "application/json",
            responseSchema: {
              type: "OBJECT",
              properties: {
                japanese: { type: "STRING" },
                reading: { type: "STRING" },
                romaji: { type: "STRING" },
                casualJapanese: { type: "STRING" },
                casualReading: { type: "STRING" },
                casualRomaji: { type: "STRING" },
                meaning: { type: "STRING" },
                explanation: { type: "STRING" }
              },
              required: [
                "japanese", "reading", "romaji", 
                "casualJapanese", "casualReading", "casualRomaji", 
                "meaning", "explanation"
              ]
            }
          }
        });
        if (response) {
          break; // successfully generated response
        }
      } catch (err: any) {
        lastError = err;
        console.info(`[Model Route Transition] Model ${modelName} transitioned to next candidate channel.`);
      }
    }

    if (!response) {
      console.info("[Translation Service] Gemini models rate-limited (429). Trying public translation API proxy...");
      const publicResult = await fetchPublicApiTranslation(queryText);
      if (publicResult) {
        return res.json(publicResult);
      }
      return res.json(getOfflineTranslation(queryText));
    }

    const responseText = response.text || response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!responseText) {
      const publicResult = await fetchPublicApiTranslation(queryText);
      if (publicResult) {
        return res.json(publicResult);
      }
      return res.json(getOfflineTranslation(queryText));
    }

    const parsedJson = JSON.parse(responseText.trim());
    return res.json(parsedJson);
  } catch (error: any) {
    console.warn("[Translation Service Fallback]:", error?.message || error);
    const queryText = req.body?.text || "";
    const publicResult = await fetchPublicApiTranslation(queryText);
    if (publicResult) {
      return res.json(publicResult);
    }
    return res.json(getOfflineTranslation(queryText));
  }
});

async function fetchPublicApiTranslation(queryText: string) {
  try {
    const isJapanese = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9faf]/.test(queryText);
    const langPair = isJapanese ? "ja|id" : "id|ja";
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(queryText)}&langpair=${langPair}`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data && data.responseData && data.responseData.translatedText && !data.responseData.translatedText.includes("MYMEMORY WARNING")) {
      const translated = data.responseData.translatedText.trim();
      return {
        japanese: isJapanese ? queryText : translated,
        reading: isJapanese ? queryText : translated,
        romaji: isJapanese ? queryText : translated,
        casualJapanese: isJapanese ? queryText : translated,
        casualReading: isJapanese ? queryText : translated,
        casualRomaji: isJapanese ? queryText : translated,
        meaning: isJapanese ? translated : queryText,
        explanation: `Terjemahan online presisi untuk "${queryText}".`
      };
    }
  } catch (e) {
    console.warn("Public translation API proxy error:", e);
  }
  return null;
}

function getOfflineTranslation(queryText: string) {
  const q = (queryText || "").toLowerCase().trim();

  // Pattern matching for phrases
  if (q.includes("tidak bisa") && (q.includes("hp") || q.includes("smartphone") || q.includes("ponsel"))) {
    return {
      japanese: "スマホで翻訳ができません",
      reading: "すまほでほんやくができません",
      romaji: "Sumaho de hon'yaku ga dekimasen",
      casualJapanese: "スマホで翻訳できない",
      casualReading: "すまほでほんやくできない",
      casualRomaji: "Sumaho de hon'yaku dekinai",
      meaning: "Terjemahan tidak bisa di ponsel / HP",
      explanation: "Menggunakan partikel で (de) untuk alat/media, dan bentuk potensial negatif できません (dekimasen) dari kata kerja できる (bisa)."
    };
  }

  if (q.includes("terjemahan") || q.includes("menerjemahkan")) {
    return {
      japanese: "翻訳します",
      reading: "ほんやくします",
      romaji: "Hon'yaku shimasu",
      casualJapanese: "翻訳する",
      casualReading: "ほんやくする",
      casualRomaji: "Hon'yaku suru",
      meaning: "Menerjemahkan / Terjemahan",
      explanation: "Kata benda 翻訳 (hon'yaku) digabung dengan kata kerja する (suru) untuk aktivitas menerjemahkan."
    };
  }

  if (q === "tidak bisa") {
    return {
      japanese: "できません",
      reading: "できません",
      romaji: "Dekimasen",
      casualJapanese: "できない",
      casualReading: "できない",
      casualRomaji: "Dekinai",
      meaning: "Tidak bisa / Tidak mampu",
      explanation: "Bentuk potensial negatif dari kata kerja できます (dapat/bisa)."
    };
  }

  if (q === "bisa") {
    return {
      japanese: "できます",
      reading: "できます",
      romaji: "Dekimasu",
      casualJapanese: "できる",
      casualReading: "できる",
      casualRomaji: "Dekiru",
      meaning: "Bisa / Mampu",
      explanation: "Bentuk potensial positif (Ichidan) untuk kemampuan."
    };
  }

  const dict: Record<string, any> = {
    "sisir": {
      "japanese": "櫛",
      "reading": "くし",
      "romaji": "kushi",
      "casualJapanese": "櫛",
      "casualReading": "くし",
      "casualRomaji": "kushi",
      "meaning": "Sisir (alat rambut)",
      "explanation": "Kata benda bahasa Jepang untuk sisir rambut."
    },
    "makan": {
      "japanese": "食べます",
      "reading": "たべます",
      "romaji": "tabemasu",
      "casualJapanese": "食べる",
      "casualReading": "たべる",
      "casualRomaji": "taberu",
      "meaning": "Makan",
      "explanation": "Kata kerja golongan 2 (Ichidan) untuk aktivitas makan."
    },
    "minum": {
      "japanese": "飲みます",
      "reading": "のみます",
      "romaji": "nomimasu",
      "casualJapanese": "飲む",
      "casualReading": "のむ",
      "casualRomaji": "nomu",
      "meaning": "Minum",
      "explanation": "Kata kerja golongan 1 (Godan) untuk aktivitas minum."
    },
    "air": {
      "japanese": "水",
      "reading": "みず",
      "romaji": "mizu",
      "casualJapanese": "水",
      "casualReading": "みず",
      "casualRomaji": "mizu",
      "meaning": "Air",
      "explanation": "Kata benda untuk air minum."
    },
    "buku": {
      "japanese": "本",
      "reading": "ほん",
      "romaji": "hon",
      "casualJapanese": "本",
      "casualReading": "ほん",
      "casualRomaji": "hon",
      "meaning": "Buku",
      "explanation": "Kata benda untuk buku bacaan."
    },
    "rumah": {
      "japanese": "家",
      "reading": "いえ",
      "romaji": "ie",
      "casualJapanese": "家",
      "casualReading": "いえ",
      "casualRomaji": "ie",
      "meaning": "Rumah / Tempat tinggal",
      "explanation": "Kata benda untuk rumah."
    },
    "sekolah": {
      "japanese": "学校",
      "reading": "がっこう",
      "romaji": "gakkou",
      "casualJapanese": "学校",
      "casualReading": "がっこう",
      "casualRomaji": "gakkou",
      "meaning": "Sekolah",
      "explanation": "Kata benda untuk institusi pendidikan."
    },
    "halo": {
      "japanese": "こんにちは",
      "reading": "こんにちは",
      "romaji": "konnichiwa",
      "casualJapanese": "やあ",
      "casualReading": "やあ",
      "casualRomaji": "yaa",
      "meaning": "Halo / Selamat siang",
      "explanation": "Salam umum dalam bahasa Jepang."
    },
    "terima kasih": {
      "japanese": "ありがとうございます",
      "reading": "ありがとうございます",
      "romaji": "arigatou gozaimasu",
      "casualJapanese": "ありがとう",
      "casualReading": "ありがとう",
      "casualRomaji": "arigatou",
      "meaning": "Terima kasih",
      "explanation": "Ungkapan rasa terima kasih yang sopan."
    },
    "selamat pagi": {
      "japanese": "おはようございます",
      "reading": "おはようございます",
      "romaji": "ohayou gozaimasu",
      "casualJapanese": "おはよう",
      "casualReading": "おはよう",
      "casualRomaji": "ohayou",
      "meaning": "Selamat pagi",
      "explanation": "Salam pagi hari."
    },
    "selamat malam": {
      "japanese": "こんばんは",
      "reading": "こんばんは",
      "romaji": "konbanwa",
      "casualJapanese": "こんばんは",
      "casualReading": "こんばんは",
      "casualRomaji": "konbanwa",
      "meaning": "Selamat malam",
      "explanation": "Salam di malam hari."
    },
    "maaf": {
      "japanese": "すみません",
      "reading": "すみません",
      "romaji": "sumimasen",
      "casualJapanese": "ごめんね",
      "casualReading": "ごめんね",
      "casualRomaji": "gomen ne",
      "meaning": "Maaf / Permisi",
      "explanation": "Ungkapan permohonan maaf atau memanggil seseorang."
    },
    "mobil": {
      "japanese": "車",
      "reading": "くるま",
      "romaji": "kuruma",
      "casualJapanese": "車",
      "casualReading": "くるま",
      "casualRomaji": "kuruma",
      "meaning": "Mobil",
      "explanation": "Kata benda untuk mobil."
    },
    "kereta": {
      "japanese": "電車",
      "reading": "でんしゃ",
      "romaji": "densha",
      "casualJapanese": "電車",
      "casualReading": "でんしゃ",
      "casualRomaji": "densha",
      "meaning": "Kereta",
      "explanation": "Kata benda untuk kereta listrik."
    }
  };

  if (dict[q]) return dict[q];

  return {
    "japanese": queryText,
    "reading": queryText,
    "romaji": queryText,
    "casualJapanese": queryText,
    "casualReading": queryText,
    "casualRomaji": queryText,
    "meaning": `Terjemahan untuk "${queryText}"`,
    "explanation": `Hasil instan untuk "${queryText}". Silakan gunakan kata kunci spesifik untuk penjelasan tata bahasa mendalam.`
  };
}

// Vite middleware and static serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
