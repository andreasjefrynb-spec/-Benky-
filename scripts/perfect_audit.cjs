const fs = require('fs');
const path = require('path');

const compPath = path.resolve(__dirname, '../src/data/vocab/vocabComprehensive.json');
const v1000Path = path.resolve(__dirname, '../src/data/vocab/vocab1000.json');

const comp = JSON.parse(fs.readFileSync(compPath, 'utf8'));
const v1000 = JSON.parse(fs.readFileSync(v1000Path, 'utf8'));

// --------------------------------------------------------------------------
// 1. PEMETAAN EKSPLISIT PRESISI TINGGI UNTUK SEMUA ITEM VOCAB1000
// --------------------------------------------------------------------------
const V1000_SPECIFIC_OVERRIDES = {
  // Verba yang sempat terlewat
  'voc-0046': 'kata_kerja', // 入る (hairu) = Masuk
  'voc-0099': 'kata_kerja', // 死ぬ (shinu) = Mati
  'voc-0106': 'kata_kerja', // 驚く (odoroku) = Kaget
  'voc-0139': 'kata_kerja', // 謝る (ayamaru) = Minta maaf
  'voc-0150': 'kata_kerja', // 止む (yamu) = Reda (hujan)
  'voc-0183': 'kata_kerja', // 晴れ渡る (harewataru) = Cerah benderang
  'voc-0184': 'kata_kerja', // 乗り遅れる (noriokureru) = Ketinggalan kereta
  'voc-0190': 'kata_kerja', // 着替える (kigaeru) = Ganti pakaian
  'voc-0191': 'kata_kerja', // 乾く (kawaku) = Kering
  'voc-0192': 'kata_kerja', // 濡れる (nureru) = Basah
  'voc-0196': 'kata_kerja', // 折れる (oreru) = Patah
  'voc-0197': 'kata_kerja', // 破れる (yabureru) = Robek
  'voc-0198': 'kata_kerja', // 切れる (kireru) = Putus / Habis baterai
  'voc-0200': 'kata_kerja', // 空く (suku) = Kosong
  'voc-0201': 'kata_kerja', // 渇く (kawaku) = Haus
  'voc-0886': 'kata_kerja', // 片寄る (katayoru) = Condong berat sebelah
  'voc-0887': 'kata_kerja', // 思いつく (omoitsuku) = Terlintas ide
  'voc-0891': 'kata_kerja', // 似合う (niau) = Cocok serasi
  'voc-1266': 'salam',      // ご存知 (gozonji) = Mengetahui (Sonkeigo)

  // Adjektiva yang sempat terlewat
  'voc-0236': 'kata_sifat', // まずい (mazui) = Tidak enak
  'voc-0277': 'kata_sifat', // 大好き (daisuki) = Sangat suka
  'voc-0278': 'kata_sifat', // 大嫌い (daikirai) = Sangat benci
  'voc-0280': 'kata_sifat', // 下手 (heta) = Tidak pandai
  'voc-0281': 'kata_sifat', // 得意 (tokui) = Jagoan
  'voc-0282': 'kata_sifat', // 苦手 (nigate) = Lemah di
  'voc-0287': 'kata_sifat', // 不便 (fuben) = Tidak praktis
  'voc-0300': 'kata_sifat', // 不真面目 (fumajime) = Tidak sungguh-sungguh
  'voc-0307': 'kata_sifat', // 普通 (futsuu) = Biasa
  'voc-0310': 'kata_sifat', // 素晴らしい (subarashii) = Luar biasa hebat
  'voc-0986': 'kata_sifat', // 緑 / 緑色 (midori) = Hijau
  'voc-0988': 'kata_sifat', // 紫 / 紫色 (murasaki) = Ungu
  'voc-0990': 'kata_sifat', // ピンク / 桃色 = Merah muda
  'voc-1099': 'kata_sifat', // 無駄 (muda) = Sia-sia

  // Perabot Rumah & Daily Goods
  'voc-0327': 'benda_rumah', // 机 (tsukue)
  'voc-0328': 'benda_rumah', // 椅子 (isu)
  'voc-0329': 'benda_rumah', // 本棚 (hondana)
  'voc-0330': 'benda_rumah', // ベッド (beddo)
  'voc-0331': 'benda_rumah', // 布団 (futon)
  'voc-0332': 'benda_rumah', // 枕 (makura)
  'voc-0333': 'benda_rumah', // 毛布 (moufu)
  'voc-0334': 'benda_rumah', // ドア (doa)
  'voc-0335': 'benda_rumah', // 窓 (mado)
  'voc-0336': 'benda_rumah', // 鍵 (kagi)
  'voc-0337': 'benda_rumah', // テレビ (terebi)
  'voc-0338': 'benda_rumah', // ラジオ (rajio)
  'voc-0340': 'benda_rumah', // 電話 (denwa)
  'voc-0343': 'benda_rumah', // エアコン (eakon)
  'voc-0344': 'benda_rumah', // 冷蔵庫 (reizouko)
  'voc-0345': 'benda_rumah', // 洗濯機 (sentakuki)
  'voc-0346': 'benda_rumah', // 電子レンジ (denshirenji)
  'voc-0347': 'benda_rumah', // 炊飯器 (suihanki)
  'voc-0348': 'benda_rumah', // 時計 (tokei)
  'voc-0349': 'benda_rumah', // 鏡 (kagami)
  'voc-0350': 'benda_rumah', // 傘 (kasa)
  'voc-0381': 'benda_rumah', // タオル (taoru)
  'voc-0382': 'benda_rumah', // 石鹸 (sekken)
  'voc-0383': 'benda_rumah', // 歯ブラシ (haburashi)
  'voc-0384': 'benda_rumah', // シャンプー (shanpuu)
  'voc-0385': 'benda_rumah', // ゴミ箱 (gomibako)
  'voc-0535': 'benda_rumah', // お風呂 (ofuro)
  'voc-0741': 'makanan',     // 包丁 (houchou) - Pisau dapur iris
  'voc-0742': 'makanan',     // まな板 (manaita) - Talenan
  'voc-0744': 'makanan',     // フライパン (furaipan) - Wajan
  'voc-0747': 'benda_rumah', // 廊下 (rouka)
  'voc-0749': 'benda_rumah', // 床 (yuka)
  'voc-0752': 'benda_rumah', // 畳 (tatami)
  'voc-0754': 'benda_rumah', // 絨毯 (juutan)
  'voc-0755': 'benda_rumah', // クッション (kusshon)
  'voc-0758': 'benda_rumah', // アイロン (airon)
  'voc-0759': 'benda_rumah', // ドライヤー (doraiyaa)
  'voc-0760': 'benda_rumah', // 洗面所 (senmenjo)
  'voc-1164': 'benda_rumah', // 箒 (houki)
  'voc-1165': 'benda_rumah', // 洗剤 (senzai)
  'voc-1166': 'benda_rumah', // 小包 (kodutsumi)
  'voc-1231': 'benda_rumah', // 針 (hari)
  'voc-1232': 'benda_rumah', // 糸 (ito)
  'voc-1237': 'benda_rumah', // 箱 (bako)
  'voc-1305': 'benda_rumah', // プラスチック (purasuchikku)
  'voc-1310': 'benda_rumah', // ロッカー (rokkaa)

  // Makanan & Minuman
  'voc-0400': 'makanan',     // お茶 (ocha) - Teh hijau
  'voc-0423': 'makanan',     // スープ (suupu)
  'voc-0427': 'makanan',     // チョコレート (chokoreeto)
  'voc-0429': 'makanan',     // 朝食 (choushoku)
  'voc-0430': 'makanan',     // 昼食 (chuushoku)
  'voc-0767': 'makanan',     // 大根 (daikon)
  'voc-1167': 'makanan',     // 調味料 (choumiryou)
  'voc-1168': 'makanan',     // 献立 (kondate)
  'voc-1169': 'makanan',     // おかず (okazu)
  'voc-1238': 'makanan',     // 丼 (donburi)
  'voc-1239': 'makanan',     // 麺 (men)
  'voc-1241': 'makanan',     // 食器 (shokki)
  'voc-1242': 'makanan',     // 湯飲み (yunomi)

  // Pakaian & Aksesoris
  'voc-0351': 'pakaian',     // 財布 (saifu) - Dompet
  'voc-0352': 'pakaian',     // 鞄 (kaban) - Tas
  'voc-0373': 'pakaian',     // 靴下 (kutsushita) - Kaus kaki
  'voc-0374': 'pakaian',     // 帽子 (boushi) - Topi
  'voc-0375': 'pakaian',     // 眼鏡 (megane) - Kacamata
  'voc-0376': 'pakaian',     // ネクタイ (nekutai) - Dasi
  'voc-0787': 'pakaian',     // 指輪 (yubiwa) - Cincin
  'voc-0789': 'pakaian',     // ネックレス (nekkuresu)
  'voc-0790': 'pakaian',     // イヤリング (iyaringu)
  'voc-0798': 'pakaian',     // 浴衣 (yukata)

  // Alat Tulis & Belajar (benda_sekolah)
  'voc-0353': 'benda_sekolah', // 手帳 (techou) - Buku agenda
  'voc-0354': 'benda_sekolah', // 辞書 (jisho) - Kamus
  'voc-0355': 'benda_sekolah', // 本 (hon)
  'voc-0356': 'benda_sekolah', // 雑誌 (zasshi) - Majalah
  'voc-0357': 'teknologi_media', // 新聞 (shinbun) - Koran
  'voc-0358': 'benda_sekolah', // ノート (nooto)
  'voc-0359': 'benda_sekolah', // 鉛筆 (enpitsu)
  'voc-0360': 'benda_sekolah', // ボールペン (boorupen)
  'voc-0361': 'benda_sekolah', // 消しゴム (keshigomu)
  'voc-0362': 'benda_sekolah', // 定規 (jougi)
  'voc-0363': 'benda_sekolah', // ハサミ (hasami)
  'voc-0364': 'benda_sekolah', // 紙 (kami)
  'voc-0365': 'benda_sekolah', // 封筒 (fuutou)
  'voc-0366': 'benda_sekolah', // 切手 (kitte)
  'voc-0367': 'benda_sekolah', // 手紙 (tegami) - Surat
  'voc-0639': 'benda_sekolah', // 作文 (sakubun)
  'voc-1228': 'benda_sekolah', // 印鑑 (inkan)
  'voc-1229': 'benda_sekolah', // 判子 (hanko)
  'voc-1230': 'benda_sekolah', // 便箋 (binsen)
  'voc-1235': 'benda_sekolah', // 糊 (nori)

  // Tempat & Fasilitas
  'voc-0534': 'tempat', // 台所 (daidokoro) - Dapur
  'voc-0558': 'tempat', // 美術館 (bijutsukan) - Museum seni
  'voc-0560': 'tempat', // 神社 (jinja)
  'voc-0561': 'tempat', // お寺 (otera)
  'voc-0563': 'tempat', // 町 (machi)
  'voc-0586': 'tempat', // 向かい (mukai)
  'voc-0627': 'tempat', // 事務所 (jimusho)
  'voc-0811': 'tempat', // 温泉 (onsen)
  'voc-0812': 'tempat', // 旅館 (ryokan)
  'voc-0834': 'tempat', // 案内所 (annaijo)
  'voc-1145': 'tempat', // 工場 (koujou)
  'voc-1153': 'tempat', // 警察署 (keisatsusho)
  'voc-1154': 'tempat', // 大使館 (taishikan)
  'voc-1155': 'tempat', // 港 (minato)
  'voc-1156': 'tempat', // 寺 (otera)
  'voc-1157': 'tempat', // 教会 (kyoukai)
  'voc-1160': 'tempat', // 田舎 (inaka)
  'voc-1161': 'tempat', // 都会 (tokai)
  'voc-1170': 'tempat', // 居酒屋 (izakaya)
  'voc-1246': 'transportasi', // 歩道橋 (hodoukyou)
  'voc-1247': 'tempat', // 郊外 (kougai)
  'voc-1248': 'tempat', // 動物園 (doubutsuen)
  'voc-1249': 'tempat', // 植物園 (shokubutsuen)
  'voc-1295': 'tempat', // ガソリンスタンド (gasorin sutando)

  // Transportasi
  'voc-0800': 'transportasi', // 定期券 (teikiken)
  'voc-0804': 'transportasi', // 行き先 (ikisaki)
  'voc-0807': 'transportasi', // 荷物 (nimotsu)
  'voc-0808': 'transportasi', // スーツケース (suutsukeesu)
  'voc-0813': 'transportasi', // 信号 (shingou)
  'voc-0814': 'transportasi', // 交差点 (kousaten)
  'voc-0815': 'transportasi', // 横断歩道 (oudanhodou)
  'voc-0816': 'transportasi', // 歩道 (hodou)
  'voc-0817': 'transportasi', // 橋 (hashi)
  'voc-0818': 'transportasi', // 坂 (saka)
  'voc-0819': 'transportasi', // 角 (kado)
  'voc-1127': 'transportasi', // 踏切 (fumikiri)
  'voc-1129': 'transportasi', // 線路 (senro)
  'voc-1130': 'transportasi', // 高速道路 (kousokudouro)
  'voc-1135': 'transportasi', // 片道 (katamichi)
  'voc-1137': 'transportasi', // 運賃 (unchin)
  'voc-1138': 'transportasi', // 満員 (manin)
  'voc-1244': 'transportasi', // 回数券 (kaisuuken)
  'voc-1303': 'transportasi', // パンク (panku)
  'voc-1340': 'transportasi', // 荷物棚 (nimotsudana)
  'voc-1341': 'transportasi', // 吊革 (tsurikawa)

  // Waktu, Angka & Satuan Hitung
  'voc-0529': 'angka_waktu', // 時間 (jikan)
  'voc-0692': 'angka_waktu', // 一つ (hitotsu)
  'voc-0693': 'angka_waktu', // 二つ (futatsu)
  'voc-0694': 'angka_waktu', // 三つ (mittsu)
  'voc-0695': 'angka_waktu', // 四つ (yottsu)
  'voc-0696': 'angka_waktu', // 五つ (itsutsu)
  'voc-0697': 'angka_waktu', // 六つ (muttsu)
  'voc-0698': 'angka_waktu', // 七つ (nanatsu)
  'voc-0699': 'angka_waktu', // 八つ (yattsu)
  'voc-0700': 'angka_waktu', // 九つ (kokonotsu)
  'voc-0702': 'angka_waktu', // 一人 (hitori)
  'voc-0703': 'angka_waktu', // 二人 (futari)
  'voc-0704': 'angka_waktu', // 三人 (sannin)
  'voc-0705': 'angka_waktu', // 四人 (yonin)
  'voc-0732': 'angka_waktu', // 半分 (hanbun)
  'voc-0838': 'angka_waktu', // 将来 (shourai)
  'voc-1176': 'angka_waktu', // 時代 (jidai)
  'voc-1177': 'angka_waktu', // 過去 (kako)
  'voc-1178': 'angka_waktu', // 現在 (genzai)
  'voc-1179': 'angka_waktu', // 日常 (nichijou)
  'voc-1180': 'angka_waktu', // 締め切り (shimekiri)
  'voc-1254': 'angka_waktu', // 世紀 (seiki)
  'voc-1255': 'angka_waktu', // 未来 (mirai)
  'voc-1256': 'angka_waktu', // 徹夜 (tetsuya)
  'voc-1257': 'angka_waktu', // 期間 (kikan)
  'voc-1258': 'angka_waktu', // 延期 (enki)
  'voc-1298': 'angka_waktu', // スケジュール (sukejuuru)

  // Tubuh & Medis
  'voc-0473': 'tubuh_kesehatan', // 喉 (nodo)
  'voc-0947': 'tubuh_kesehatan', // 皮膚 (hifu)
  'voc-0950': 'tubuh_kesehatan', // 心臓 (shinzou)
  'voc-0951': 'tubuh_kesehatan', // 胃 (i)
  'voc-0953': 'tubuh_kesehatan', // 手術 (shujutsu)
  'voc-0954': 'tubuh_kesehatan', // 治療 (chiryou)
  'voc-0955': 'tubuh_kesehatan', // 包帯 (houtai)
  'voc-0956': 'tubuh_kesehatan', // 体温計 (taionkei)
  'voc-1146': 'tubuh_kesehatan', // 火傷 (yakedo)
  'voc-1147': 'tubuh_kesehatan', // 処方箋 (shohousen)
  'voc-1150': 'tubuh_kesehatan', // 救急車 (kyuukyuusha)
  'voc-1151': 'tubuh_kesehatan', // 患者 (kanja)

  // Alam, Hewan & Cuaca
  'voc-0599': 'alam_hewan', // 島 (shima)
  'voc-0600': 'alam_hewan', // 森 (mori)
  'voc-0603': 'alam_hewan', // 草 (kusa)
  'voc-0604': 'alam_hewan', // 石 (ishi)
  'voc-0613': 'alam_hewan', // 猿 (saru)
  'voc-0615': 'alam_hewan', // 象 (zou)
  'voc-0616': 'alam_hewan', // 虫 (mushi)
  'voc-0861': 'alam_hewan', // 津波 (tsunami)
  'voc-0862': 'alam_hewan', // 雷 (kaminari)
  'voc-0863': 'alam_hewan', // 虹 (niji)
  'voc-0864': 'alam_hewan', // 霧 (kiri)
  'voc-0865': 'alam_hewan', // 嵐 (arashi)
  'voc-0866': 'alam_hewan', // 光 (hikari)
  'voc-0867': 'alam_hewan', // 影 (kage)
  'voc-0870': 'alam_hewan', // 湖 (mizuumi)
  'voc-0872': 'alam_hewan', // 谷 (tani)
  'voc-0873': 'alam_hewan', // 砂浜 (sunahama)
  'voc-0933': 'alam_hewan', // 地球 (chikyuu)
  'voc-0937': 'alam_hewan', // 環境 (kankyou)
  'voc-1172': 'alam_hewan', // 森林 (shinrin)
  'voc-1173': 'alam_hewan', // 枝 (eda)
  'voc-1250': 'alam_hewan', // 葉 (ha)
  'voc-1251': 'alam_hewan', // 蚊 (ka)
  'voc-1252': 'alam_hewan', // 蜂 (hachi)
  'voc-1253': 'alam_hewan', // 鹿 (shika)
  'voc-1344': 'alam_hewan', // 防災 (bousai)
  'voc-1345': 'alam_hewan', // 避難 (hinan)
  'voc-1346': 'alam_hewan', // 警報 (keihou)
  'voc-1347': 'alam_hewan', // 注意報 (chuuihou)
  'voc-1349': 'alam_hewan', // 気候 (kikou)
  'voc-1350': 'alam_hewan', // 湿度 (shitsudo)
  'voc-1351': 'alam_hewan', // 気温 (kion)
  'voc-1352': 'alam_hewan', // 零下 (reika)

  // Keluarga & Hubungan Orang
  'voc-0458': 'keluarga', // 男性 (dansei)
  'voc-0459': 'keluarga', // 女性 (josei)
  'voc-0820': 'keluarga', // 先輩 (senpai)
  'voc-0821': 'keluarga', // 後輩 (kouhai)
  'voc-0995': 'keluarga', // 恋人 (koibito)
  'voc-0998': 'keluarga', // 親友 (shinyuu)
  'voc-0999': 'keluarga', // 隣人 (rinjin)
  'voc-1174': 'keluarga', // 赤ん坊 (akanbou)
  'voc-1175': 'keluarga', // 仲間 (nakama)
  'voc-1262': 'keluarga', // 従兄弟 (itoko)
  'voc-1263': 'keluarga', // 孫 (mago)

  // Sekolah & Profesi
  'voc-0621': 'profesi_sekolah', // 公務員 (koumuin)
  'voc-0634': 'profesi_sekolah', // 試験 / テスト (shiken)
  'voc-1140': 'profesi_sekolah', // 合格 (goukaku)
  'voc-1141': 'profesi_sekolah', // 奨学金 (shougakukin)
  'voc-1142': 'profesi_sekolah', // 講義 (kougi)

  // Hiburan, Seni & Olahraga
  'voc-0342': 'hiburan_olahraga', // カメラ (kamera)
  'voc-0809': 'hiburan_olahraga', // 観光 (kankou)
  'voc-0810': 'hiburan_olahraga', // 土産 (miyage)
  'voc-0837': 'hiburan_olahraga', // 趣味 (shumi)
  'voc-0902': 'hiburan_olahraga', // アニメ (anime)
  'voc-0903': 'hiburan_olahraga', // 漫画 (manga)
  'voc-0905': 'hiburan_olahraga', // 音楽 (ongaku)
  'voc-0906': 'hiburan_olahraga', // ギター (gitaa)
  'voc-0907': 'hiburan_olahraga', // ピアノ (piano)
  'voc-0908': 'hiburan_olahraga', // サッカー (sakkaa)
  'voc-0909': 'hiburan_olahraga', // 野球 (yakyuu)
  'voc-0910': 'hiburan_olahraga', // テニス (tenisu)
  'voc-0911': 'hiburan_olahraga', // 水泳 (suiei)
  'voc-0912': 'hiburan_olahraga', // 写真 (shashin)
  'voc-0913': 'hiburan_olahraga', // 旅行 (ryokou)
  'voc-0914': 'hiburan_olahraga', // 釣り (tsuri)
  'voc-0915': 'hiburan_olahraga', // 登山 (tozan)
  'voc-0917': 'hiburan_olahraga', // 絵画 (kaiga)
  'voc-0919': 'hiburan_olahraga', // 映画 (eiga)
  'voc-1296': 'hiburan_olahraga', // クラシック (kurashikku)
  'voc-1333': 'hiburan_olahraga', // 展覧会 (tenrankai)

  // Teknologi, IT & Media
  'voc-0339': 'teknologi_media', // パソコン (pasokon)
  'voc-0341': 'teknologi_media', // スマホ (sumaho)
  'voc-0829': 'teknologi_media', // 連絡先 (renrakusaki)
  'voc-0938': 'teknologi_media', // ニュース (nyuusu)
  'voc-0939': 'teknologi_media', // 番組 (bangumi)
  'voc-1000': 'teknologi_media', // 住所 (juusho)
  'voc-1001': 'teknologi_media', // 電話番号 (denwa bangou)
  'voc-1002': 'teknologi_media', // パスワード (pasuwaado)
  'voc-1003': 'teknologi_media', // メールアドレス (meeru adoresu)
  'voc-1004': 'teknologi_media', // ウェブサイト (webusaito)
  'voc-1005': 'teknologi_media', // 検索 (kensaku)
  'voc-1006': 'teknologi_media', // 登録 (touroku)
  'voc-1007': 'teknologi_media', // 保存 (hozon)
  'voc-1008': 'teknologi_media', // 削除 (sakujo)
  'voc-1009': 'teknologi_media', // コピー (kopii)
  'voc-1010': 'teknologi_media', // クリック (kurikku)
  'voc-1011': 'teknologi_media', // ダウンロード (daunroodo)
  'voc-1012': 'teknologi_media', // アプリ (apuri)
  'voc-1013': 'teknologi_media', // 画面 (gamen)
  'voc-1014': 'teknologi_media', // 音量 (onryou)
  'voc-1015': 'teknologi_media', // 充電器 (juudenki)
  'voc-1292': 'teknologi_media', // アナウンス (anaunsu)
  'voc-1299': 'teknologi_media', // スクリーン (sukuriin)
  'voc-1306': 'teknologi_media', // ポスター (posutaa)
  'voc-1330': 'teknologi_media', // 看板 (kamban)
  'voc-1331': 'teknologi_media', // 広告 (koukoku)

  // Bisnis & Formal
  'voc-0629': 'bisnis_formal', // 資料 (shiryou)
  'voc-0630': 'bisnis_formal', // 名刺 (meishi)
  'voc-0631': 'bisnis_formal', // 書類 (shorui)
  'voc-0805': 'bisnis_formal', // パスポート (pasupooto)
  'voc-0806': 'bisnis_formal', // ビザ (biza)
  'voc-0822': 'bisnis_formal', // 上司 (joushi)
  'voc-0827': 'bisnis_formal', // 履歴書 (rirekisho)
  'voc-0828': 'bisnis_formal', // 契約 (keiyaku)
  'voc-0920': 'bisnis_formal', // お金 (okane)
  'voc-0921': 'bisnis_formal', // お釣り (otsuri)
  'voc-0922': 'bisnis_formal', // 値段 (nedan)
  'voc-0923': 'bisnis_formal', // 割引 (waribiki)
  'voc-0924': 'bisnis_formal', // 半額 (hangaku)
  'voc-0925': 'bisnis_formal', // レシート (reshiito)
  'voc-0926': 'bisnis_formal', // クレジットカード (kurejitto kaado)
  'voc-0927': 'bisnis_formal', // 税金 (zeikin)
  'voc-0928': 'bisnis_formal', // 贈り物 (okurimono)
  'voc-0929': 'bisnis_formal', // 包装 (housou)
  'voc-0930': 'bisnis_formal', // 領収書 (ryoushuusho)
  'voc-0941': 'bisnis_formal', // 規則 (kisoku)
  'voc-0945': 'bisnis_formal', // 貿易 (boueki)
  'voc-1259': 'bisnis_formal', // 中止 (chuushi)
  'voc-1293': 'bisnis_formal', // インタビュー (intabyuu)
  'voc-1300': 'bisnis_formal', // チャンス (chansu)
  'voc-1307': 'bisnis_formal', // マナー (manaa)
  'voc-1308': 'bisnis_formal', // ミーティング (miitingu)
  'voc-1309': 'bisnis_formal', // リポート (ripooto)
  'voc-1314': 'bisnis_formal', // 給与 (kyuuyo)
  'voc-1315': 'bisnis_formal', // 国際 (kokusai)
  'voc-1332': 'bisnis_formal', // 案内 (annai)
  'voc-1334': 'bisnis_formal', // 入場料 (nyuujouryou)
  'voc-1336': 'bisnis_formal', // 整理券 (seiriken)

  // Abstrak & Akademik
  'voc-0638': 'abstrak_akademik', // 意味 (imi)
  'voc-0830': 'abstrak_akademik', // 約束 (yakusoku)
  'voc-0832': 'abstrak_akademik', // 都合 (tsugou)
  'voc-0833': 'abstrak_akademik', // 遠慮 (enryo)
  'voc-0836': 'abstrak_akademik', // 経験 (keiken)
  'voc-0841': 'abstrak_akademik', // 安心 (anshin)
  'voc-0931': 'abstrak_akademik', // 世界 (sekai)
  'voc-0940': 'abstrak_akademik', // 人口 (jinkou)
  'voc-1311': 'abstrak_akademik', // 原因 (genin)
  'voc-1312': 'abstrak_akademik', // 意見 (iken)
  'voc-1313': 'abstrak_akademik', // 習慣 (shuukan)

  // Keterangan / Fukushi & Sambung
  'voc-0642': 'keterangan_fukushi', // とても
  'voc-0643': 'keterangan_fukushi', // 少し
  'voc-0647': 'keterangan_fukushi', // 時々
  'voc-0648': 'keterangan_fukushi', // あまり
  'voc-0649': 'keterangan_fukushi', // 全然
  'voc-0650': 'keterangan_fukushi', // もう
  'voc-0651': 'keterangan_fukushi', // まだ
  'voc-0653': 'keterangan_fukushi', // 一人で
  'voc-0657': 'keterangan_fukushi', // 初めて
  'voc-0659': 'keterangan_fukushi', // きっと
  'voc-0661': 'keterangan_fukushi', // もし
  'voc-0662': 'keterangan_fukushi', // すぐに
  'voc-0663': 'keterangan_fukushi', // もうすぐ
  'voc-0664': 'keterangan_fukushi', // 大体
  'voc-0666': 'keterangan_fukushi', // 実は
  'voc-0667': 'keterangan_fukushi', // 急に
  'voc-0669': 'keterangan_fukushi', // とうとう
  'voc-0670': 'keterangan_fukushi', // しかし
  'voc-0671': 'keterangan_fukushi', // だから
  'voc-0733': 'keterangan_fukushi', // 全部 (zenbu)
  'voc-0847': 'keterangan_fukushi', // はっきり
  'voc-0849': 'keterangan_fukushi', // しっかり
  'voc-0850': 'keterangan_fukushi', // のんびり
  'voc-1105': 'keterangan_fukushi', // かならず
  'voc-1106': 'keterangan_fukushi', // ぜひ
  'voc-1107': 'keterangan_fukushi', // もしかしたら
  'voc-1108': 'keterangan_fukushi', // ずいぶん
  'voc-1109': 'keterangan_fukushi', // けっこう
  'voc-1110': 'keterangan_fukushi', // なかなか
  'voc-1115': 'keterangan_fukushi', // ぼんやり
  'voc-1116': 'keterangan_fukushi', // たまたま
  'voc-1117': 'keterangan_fukushi', // わざわざ
  'voc-1118': 'keterangan_fukushi', // まさか
  'voc-1119': 'keterangan_fukushi', // なるべく
  'voc-1120': 'keterangan_fukushi', // 別に
  'voc-1121': 'keterangan_fukushi', // 決して
  'voc-1122': 'keterangan_fukushi', // めったに
  'voc-1124': 'keterangan_fukushi', // ほとんど
  'voc-1218': 'keterangan_fukushi', // とうぜん
  'voc-1219': 'keterangan_fukushi', // ちっとも
  'voc-1220': 'keterangan_fukushi', // とっくに
  'voc-1221': 'keterangan_fukushi', // ちゃんと
  'voc-1222': 'keterangan_fukushi', // いよいよ
  'voc-1223': 'keterangan_fukushi', // わざと
  'voc-1224': 'keterangan_fukushi', // できれば
  'voc-1226': 'keterangan_fukushi', // いちどに
  'voc-1227': 'keterangan_fukushi', // およそ

  // Onomatope
  'voc-0843': 'onomatope', // びっくり
  'voc-0844': 'onomatope', // がっかり
  'voc-0845': 'onomatope', // うっかり
  'voc-0846': 'onomatope', // すっきり
  'voc-0851': 'onomatope', // そっくり
  'voc-0852': 'onomatope', // ぺこぺこ
  'voc-0853': 'onomatope', // からから
  'voc-0854': 'onomatope', // ぎゅうぎゅう
  'voc-0856': 'onomatope', // どきどき
  'voc-0857': 'onomatope', // いらいら

  // Salam & Frasa Percakapan
  'voc-0688': 'salam', // 初めまして
  'voc-1183': 'salam', // おかげさまで
  'voc-1187': 'salam', // 恐れ入りますが
  'voc-1225': 'salam', // なるほど
};

// Kebangsaan / Orang negara asing (voc-person-*)
const PERSON_NATIONALITY_SET = new Set([
  'voc-person-chinese', 'voc-person-korean', 'voc-person-french', 'voc-person-german',
  'voc-person-italian', 'voc-person-spanish', 'voc-person-brazilian', 'voc-person-russian',
  'voc-person-thai', 'voc-person-vietnamese', 'voc-person-filipino', 'voc-person-australian'
]);

// Terapkan override pada vocab1000
const updatedV1000 = v1000.map(item => {
  let sub = item.subCategory;
  if (V1000_SPECIFIC_OVERRIDES[item.id]) {
    sub = V1000_SPECIFIC_OVERRIDES[item.id];
  } else if (PERSON_NATIONALITY_SET.has(item.id)) {
    sub = 'negara_bahasa';
  } else if (/^voc-lang-/.test(item.id)) {
    sub = 'negara_bahasa';
  } else if (/^voc-country-/.test(item.id)) {
    sub = 'negara_bahasa';
  }
  return { ...item, subCategory: sub };
});

// Simpan vocab1000 yang sudah 100% presisi
fs.writeFileSync(v1000Path, JSON.stringify(updatedV1000, null, 2), 'utf8');

// --------------------------------------------------------------------------
// 2. BANGUN KAMUS KANJI / JEPANG DARI VOCAB1000 YANG TERVERIFIKASI
// --------------------------------------------------------------------------
const AUTHORITATIVE_MAP = new Map();
updatedV1000.forEach(item => {
  if (item.japanese) AUTHORITATIVE_MAP.set(item.japanese.trim(), item.subCategory);
  if (item.kanji && item.kanji.trim()) AUTHORITATIVE_MAP.set(item.kanji.trim(), item.subCategory);
});

// --------------------------------------------------------------------------
// 3. AUDIT DAN REKLASIFIKASI KATA DI VOCABCOMPREHENSIVE.JSON
// --------------------------------------------------------------------------
const updatedComp = comp.map(item => {
  const jp = (item.japanese || '').trim();
  const kj = (item.kanji || '').trim();
  const rd = (item.reading || '').trim().toLowerCase();
  const id = (item.meaningId || '').trim();
  const idLower = id.toLowerCase();
  let sub = item.subCategory;

  // Cek apakah ada di kamus otoritatif vocab1000
  if (AUTHORITATIVE_MAP.has(jp)) {
    return { ...item, subCategory: AUTHORITATIVE_MAP.get(jp) };
  }
  if (kj && AUTHORITATIVE_MAP.has(kj)) {
    return { ...item, subCategory: AUTHORITATIVE_MAP.get(kj) };
  }

  // Cek Kotowaza & Onomatope & Yojijukugo native
  if (sub === 'kotowaza' || sub === 'yojijukugo' || sub === 'kanyouku') {
    return item;
  }

  // Salam, etiket & kalimat utuh percakapan
  if (
    /[。！？!?]$/.test(jp) ||
    /^(halo|selamat|sampai jumpa|terima kasih|maaf|permisi|silakan|tolong|apa kabar|ya|tidak)\b/i.test(idLower) ||
    /^(arigatou|sumimasen|gomennasai|konnichiwa|ohayou|oyasumi|sayounara|shitsurei)/i.test(rd) ||
    /^(あ、|あのう|ええと|どうぞ|どうも|はい、|いいえ、|そうです|違います|なるほど|いらっしゃい|いただきます|ごちそうさま|おめでとう|乾杯|お大事に)/.test(jp)
  ) {
    if (!/^(buku|surat|kamus|koran|baju|makanan)$/i.test(idLower)) {
      return { ...item, subCategory: 'salam' };
    }
  }

  // Satuan hitung / Counter & Kalender
  if (
    /^〜[0-9一二三四五六七八九十百千万億]+/.test(jp) ||
    /^〜(本|枚|台|冊|杯|匹|頭|羽|個|階|番|回|度|歳|才|軒|足|着|機|分|時|日|月|年|人|つ|便|発|倍|割)/.test(jp) ||
    /^〜(かい|だい|にん|ふん|ぷん|まい|さつ|はい|ひき|こ|ばん|さい|がつ|ねん|じかん|メートル|キロ|グラム)/.test(jp) ||
    /(detik|menit|jam|hari|minggu|bulan|tahun|abad|kalender|jadwal|kemarin|besok|lusa|satuan hitung|\.\.\. buah|\.\.\. lembar|\.\.\. orang|\.\.\. unit|\.\.\. kali|\.\.\. lantai)/i.test(idLower)
  ) {
    return { ...item, subCategory: 'angka_waktu' };
  }

  // Arah & Tempat Demonstratif
  if (/^(ここ|そこ|あそこ|どこ|こちら|そちら|あちら|どちら|あっち|そっち|こっち|どっち)$/.test(jp)) {
    return { ...item, subCategory: 'tempat' };
  }

  // Benda demonstratif pokok (kore, sore, are, dore)
  if (/^(これ|それ|あれ|どれ|この|その|あの|どの)$/.test(jp)) {
    return { ...item, subCategory: 'kata_benda' };
  }

  // Orang demonstratif
  if (/^(このひと|そのひと|あのひと|どなた|だれ)$/.test(jp)) {
    return { ...item, subCategory: 'keluarga' };
  }

  // Organ tubuh khusus seperti 'い' (lambung)
  if (jp === 'い' && (kj === '胃' || idLower.includes('lambung'))) {
    return { ...item, subCategory: 'tubuh_kesehatan' };
  }
  if (jp === 'あせ' && (kj === '汗' || idLower.includes('keringat'))) {
    return { ...item, subCategory: 'tubuh_kesehatan' };
  }

  // Makanan & Masakan khusus
  if (jp === 'いか' || idLower.includes('cumi-cumi')) {
    return { ...item, subCategory: 'makanan' };
  }
  if (jp === 'なす' || idLower.includes('terong')) {
    return { ...item, subCategory: 'makanan' };
  }
  if (jp === 'おあずけいれ' || idLower.includes('setor tunai') || idLower.includes('saldo')) {
    return { ...item, subCategory: 'bisnis_formal' };
  }

  // Hobi & Permainan
  if (jp.includes('いご') || jp.includes('しょうぎ') || idLower.includes('catur jepang')) {
    return { ...item, subCategory: 'hiburan_olahraga' };
  }
  if (idLower.includes('memandang bulan') || jp === 'おつきみ') {
    return { ...item, subCategory: 'hiburan_olahraga' };
  }

  // Fukushi khusus
  if (
    /^(あわてて|いちど|いちども|いっしょうけんめい|いっしょに|あまり|ぜんぜん|もっと|ずっと|ゆっくり|そろそろ|なかなか|とうとう|やっと|ついに|たぶん|きっと|もし|いくら|ぜひ)$/.test(jp) ||
    /^(dengan sekuat tenaga|bersama-sama|tergesa-gesa|belum pernah sama sekali|satu kali|sekalipun|betapapun)/i.test(idLower)
  ) {
    return { ...item, subCategory: 'keterangan_fukushi' };
  }

  // Alam khusus
  if (jp === 'いけ' || idLower.includes('kolam')) {
    return { ...item, subCategory: 'alam_hewan' };
  }

  return { ...item, subCategory: sub };
});

fs.writeFileSync(compPath, JSON.stringify(updatedComp, null, 2), 'utf8');

console.log('=== AUDIT PRESISI TINGGI SELESAI ===');
const finalV1000Counts = {};
updatedV1000.forEach(c => finalV1000Counts[c.subCategory] = (finalV1000Counts[c.subCategory] || 0) + 1);
console.log('Distribusi Akhir vocab1000.json:');
console.log(Object.entries(finalV1000Counts).sort((a,b) => b[1] - a[1]));

const finalCompCounts = {};
updatedComp.forEach(c => finalCompCounts[c.subCategory] = (finalCompCounts[c.subCategory] || 0) + 1);
console.log('\nDistribusi Akhir vocabComprehensive.json:');
console.log(Object.entries(finalCompCounts).sort((a,b) => b[1] - a[1]));
