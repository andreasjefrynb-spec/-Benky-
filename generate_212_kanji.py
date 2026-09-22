import re

# Load existing
with open('src/data/kanjiData.ts', 'r', encoding='utf-8') as f:
    text_all = f.read()

n5n4_block = text_all[:text_all.find('export const kanjiData')]
existing_n5n4 = set(re.findall(r'\"japanese\":\s*\"(.*?)\"', n5n4_block))

with open('generate_650_kanji_clean.py', 'r', encoding='utf-8') as f:
    gen_text = f.read()

already_defined = set(re.findall(r'\(\"(.*?)\"', gen_text)).union(existing_n5n4)
print(f"Current seen set size: {len(already_defined)}")

needed = 650 - len(already_defined)
print(f"Needed more kanji: {needed}")

# Additional N3 Kanji
extra_kanji_pool = [
    ("航", "kanji_transportasi", "kou", "コウ (KOU)", "-", "Penerbangan", "Kapal/pesawat terbang 舟 亢", "航空 (こうくう / koukuu)", "Penerbangan", 10),
    ("陸", "kanji_alam", "riku", "リク (RIKU)", "おか", "Daratan", "Bukit 阝 tinggi", "着陸 (ちゃくりく / chakuriku)", "Pendaratan", 11),
    ("軍", "kanji_sosial", "gun", "グン (GUN)", "-", "Militer", "Kendaraan 車 perang", "軍隊 (ぐんたい / guntai)", "Tentara", 9),
    ("兵", "kanji_sosial", "hei", "ヘイ (HEI)", "つわもの", "Prajurit", "Prajurit memegang senjata", "兵士 (へいし / heishi)", "Prajurit", 7),
    ("隊", "kanji_sosial", "tai", "タイ (TAI)", "-", "Pasukan", "Bukit 阝 dan tim", "隊長 (たいちょう / taichou)", "Komandan", 12),
    ("統", "kanji_pemerintahan", "tou", "トウ (TOU)", "す・べる", "Penyatuan", "Benang 糸 menyatu", "大統領 (だいとうりょう / daitouryou)", "Presiden", 12),
    ("領", "kanji_pemerintahan", "ryou", "リョウ (RYOU)", "-", "Wilayah", "Kepala 頁 dan wilayah", "領土 (りょうど / ryoudou)", "Wilayah teritorial", 14),
    ("省", "kanji_pemerintahan", "shou / sei", "ショウ (SHOU)", "省・みる (habu-ku)", "Kementerian / Hemat", "Mata 目 memeriksa", "外務省 (がいむしょう / gaimushou)", "Kementerian Luar Negeri", 9),
    ("庁", "kanji_pemerintahan", "chou", "チョウ (CHOU)", "-", "Badan Instansi", "Gedung instansi", "気象庁 (きしょうちょう / kishouchou)", "Badan Meteorologi", 5),
    ("局", "kanji_pemerintahan", "kyoku", "キョク (KYOKU)", "-", "Biro / Bagian", "Rumah 尸 membagi kantor", "郵便局 (ゆうびんきょく / yuubinkyoku)", "Kantor Pos", 7),
    ("署", "kanji_pemerintahan", "sho", "ショ (SHO)", "-", "Stasiun Pos", "Jaring 网 menahan kantor", "警察署 (けいさつしょ / keisatsusho)", "Kantor Polisi", 13),
    ("官", "kanji_pemerintahan", "kan", "カン (KAN)", "-", "Pejabat", "Rumah 宀 tempat pejabat", "警官 (けいかん / keikan)", "Petugas Polisi", 8),
    ("党", "kanji_pemerintahan", "tou", "トウ (TOU)", "-", "Partai Politik", "Rumah 尚 anggota partai", "政党 (せいとう / seitou)", "Partai Politik", 10),
    ("民", "kanji_sosial", "min", "ミン (MIN)", "たみ (tami)", "Rakyat", "Mata 目 rakyat", "国民 (こくみん / kokumin)", "Warga Negara", 5),
    ("君", "kanji_sosial", "kimi / kun", "クン (KUN)", "きみ (kimi)", "Kamu / Tuan", "Mulut 口 memerintah", "君 (きみ / kimi)", "Kamu", 7),
    ("臣", "kanji_pemerintahan", "shin", "シン (SHIN)", "-", "Menteri", "Mata 目 tunduk ke raja", "総理大臣 (そうりだいじん / souridaijin)", "Perdana Menteri", 6),
    ("王", "kanji_pemerintahan", "ou", "オウ (OU)", "-", "Raja", "Penghubung langit dan bumi", "王国 (おうこく / oukoku)", "Kerajaan", 4),
    ("皇", "kanji_pemerintahan", "kou", "コウ (KOU)", "-", "Kaisar", "Putih 白 di atas raja 王", "天皇 (てんのう / tennou)", "Kaisar Jepang", 9),
    ("帝", "kanji_pemerintahan", "tei", "テイ (TEI)", "-", "Kaisar Agung", "Pakaian 巾 mahkota", "帝国 (ていこく / teikoku)", "Kekaisaran", 9),
    ("権", "kanji_hukum", "ken", "ケン (KEN)", "-", "Hak / Kekuasaan", "Pohon 木 dan burung", "人権 (じんけん / jinken)", "Hak Asasi Manusia", 15),
    ("利", "kanji_hukum", "ri", "リ (RI)", "き・く", "Hak / Keuntungan", "Gandum 禾 dan pisau 刀", "権利 (けんり / kenri)", "Hak Resmi", 7),
    ("条", "kanji_hukum", "jou", "ジョウ (JOU)", "-", "Pasal / Syarat", "Pohon 木 bercabang", "条件 (じょうけん / jouken)", "Syarat / Kondisi", 7),
    ("件", "kanji_hukum", "ken", "ケン (KEN)", "-", "Kasus / Kasus", "Orang イ dan sapi 牛", "事件 (じけん / jiken)", "Insiden", 6),
    ("規", "kanji_hukum", "ki", "キ (KI)", "-", "Aturan Standard", "Suami 夫 dan mata 見", "規則 (きそく / kisoku)", "Peraturan", 11),
    ("則", "kanji_hukum", "soku", "ソク (SOKU)", "-", "Hukum / Aturan", "Bejana 貝 dan pisau 刀", "原則 (げんそく / gensoku)", "Prinsip dasar", 9),
    ("制", "kanji_hukum", "sei", "セイ (SEI)", "-", "Sistem", "Pisau 刀 memotong", "制度 (せいど / seido)", "Sistem", 8),
    ("限", "kanji_abstrak", "gen", "ゲン (GEN)", "かぎ・る", "Batas", "Bukit 阝 menahan", "期限 (きげん / kigen)", "Tenggat waktu", 9),
    ("設", "kanji_bangunan", "setsu", "セツ (SETSU)", "もう・ける", "Membangun", "Bicara 言 dan alat", "建設 (けんせつ / kensetsu)", "Konstruksi", 11),
    ("置", "kanji_aktivitas", "chi", "チ (CHI)", "お・く (o-ku)", "Meletakkan", "Jaring 网 dan lurus 直", "設置 (せっち / secchi)", "Pemasangan", 13),
    ("総", "kanji_abstrak", "sou", "ソウ (SOU)", "-", "Total / Keseluruhan", "Benang 糸 mengikat total", "総合 (そうごう / sougou)", "Komprehensif", 14),
    ("領", "kanji_pemerintahan", "ryou", "リョウ", "-", "Domain", "Domain", "領収書 (りょうしゅうしょ / ryoushuusho)", "Kwitansi", 14),
    ("収", "kanji_ekonomi", "shuu", "シュウ (SHUU)", "おさ・める", "Menerima", "Tangan 収 mengambil", "収入 (しゅうにゅう / shuunyuu)", "Pendapatan", 4),
    ("支", "kanji_ekonomi", "shi", "シ (SHI)", "ささ・える", "Cabang / Membayar", "Tangan menyokong", "支出 (ししゅつ / shishutsu)", "Pengeluaran", 4),
    ("支", "kanji_ekonomi", "shi", "シ", "-", "Bayar", "Bayar", "支払い (しはらい / shiharai)", "Pembayaran", 4),
    ("税", "kanji_ekonomi", "zei", "ゼイ (ZEI)", "-", "Pajak", "Gandum 禾 bayar pajak", "消費税 (しょうひぜい / shouhizei)", "PPN", 12),
    ("費", "kanji_ekonomi", "hi", "ヒ (HI)", "つい・やす", "Biaya", "Kerang 貝 dikeluarkan", "学費 (がくひ / gakuhi)", "Biaya sekolah", 12),
    ("価", "kanji_ekonomi", "ka", "カ (KA)", "あたい", "Harga", "Orang イ mengukur harga", "物価 (ぶっか / bukka)", "Harga barang", 8),
    ("評", "kanji_abstrak", "hyou", "ヒョウ (HYOU)", "-", "Evaluasi", "Bicara 言 menilai", "評価 (ひょうか / hyouka)", "Penilaian", 12),
    ("判", "kanji_abstrak", "han", "ハン (HAN)", "-", "Vonis", "Pisau 刀 membagi", "裁判 (さいばん / saiban)", "Persidangan", 7),
    ("証", "kanji_abstrak", "shou", "ショウ (SHOU)", "-", "Bukti", "Bicara 言 yang benar 正", "証拠 (しょうこ / shouko)", "Bukti fisik", 12),
    ("拠", "kanji_abstrak", "kyo", "キョ (KYO)", "-", "Pijakan", "Tangan 扌 memegang", "根拠 (こんきょ / konkyo)", "Dasar / Alasan", 8),
    ("断", "kanji_abstrak", "dan", "ダン (DAN)", "た・つ", "Memutus", "Kapak 斤 memotong", "断定 (だんてい / dantei)", "Kesimpulan pasti", 11),
    ("定", "kanji_abstrak", "tei", "テイ (TEI)", "さだ・める", "Menentukan", "Rumah 宀 dan benar 疋", "決定 (けってい / kettei)", "Keputusan", 8),
    ("測", "kanji_abstrak", "soku", "ソク (SOKU)", "はか・る", "Mengukur", "Air 氵 dan aturan 則", "予測 (よそく / yosoku)", "Prediksi", 12),
    ("算", "kanji_abstrak", "san", "サン (SAN)", "-", "Hitung", "Bambu 竹 dan sempoa", "予算 (よさん / yosan)", "Anggaran", 14),
    ("精", "kanji_abstrak", "sei", "セイ (SEI)", "-", "Semangat / Detail", "Beras 米 murni 骨", "精神 (せいしん / seishin)", "Jiwa / Mental", 14),
    ("神", "kanji_sosial", "shin / jin", "シン (SHIN)", "かみ (kami)", "Dewa / Tuhan", "Altar 示 dan kilat 申", "神社 (じんじゃ / jinja)", "Kuil Shinto", 10),
    ("社", "kanji_sosial", "sha", "シャ (SHA)", "やしろ", "Perusahaan / Kuil", "Altar 示 tanah 土", "社会 (しゃかい / shakai)", "Masyarakat", 7),
    ("会", "kanji_sosial", "kai", "カイ (KAI)", "あ・う", "Pertemuan", "Atap 人 bertemu", "会議 (かいぎ / kaigi)", "Rapat", 6),
    ("議", "kanji_sosial", "gi", "ギ (GI)", "-", "Diskusi", "Bicara 言 adil 義", "議員 (ぎいん / giin)", "Anggota DPR", 20),
    ("員", "kanji_sosial", "in", "イン (IN)", "-", "Anggota", "Mulut 口 dan uang 貝", "店員 (てんいん / tenin)", "Pegawai toko", 10),
    ("商", "kanji_pekerjaan", "shou", "ショウ (SHOU)", "あきな・う", "Dagang", "Gedung dagang", "商品 (しょうひん / shouhin)", "Produk dagang", 11),
    ("業", "kanji_pekerjaan", "gyou", "ギョウ (Gyou)", "わざ", "Industri / Usaha", "Papan musik kayu 業", "授業 (じゅぎょう / jugyou)", "Pelajaran kelas", 13),
    ("企", "kanji_pekerjaan", "ki", "キ (KI)", "-", "Perencana", "Orang 𠆢 berdiri merancang", "企画 (きかく / kikaku)", "Perencanaan", 6),
    ("画", "kanji_abstrak", "kaku / ga", "カク (KAKU)", "えが・く", "Gambar / Rencana", "Kuas 聿 membingkai 囗", "計画 (けいかく / keikaku)", "Rencana", 8),
    ("策", "kanji_abstrak", "saku", "サク (SAKU)", "-", "Strategi", "Bambu 竹 dan cambuk 束", "対策 (たいさく / taisaku)", "Penanggulangan", 12),
    ("略", "kanji_abstrak", "ryaku", "リャク (RYAKU)", "-", "Singkatan / Ringkasan", "Sawah 田 dan masing 各", "省略 (しょうりゃく / shouryaku)", "Penyingkatan", 11),
    ("領", "kanji_pemerintahan", "ryou", "リョウ", "-", "Wilayah", "Kepala 頁 dan wilayah", "領事館 (りょうじかん / ryousjikan)", "Konsulat", 14),
    ("館", "kanji_bangunan", "kan", "カン (KAN)", "やかた", "Gedung", "Makanan 食 dan panggung 官", "図書館 (としょかん / toshokan)", "Perpustakaan", 16),
    ("堂", "kanji_bangunan", "dou", "ドウ (DOU)", "-", "Aula Besar", "Atap 尚 dan tanah 土", "食堂 (しょくどう / shokudou)", "Kantin", 11),
    ("室", "kanji_bangunan", "shitsu", "シツ (SHITSU)", "むろ", "Ruangan", "Atap 宀 dan sampai 至", "教室 (きょうしつ / kyoushitsu)", "Ruang kelas", 9),
    ("庁", "kanji_bangunan", "chou", "チョウ", "-", "Gedung Dinas", "Gedung", "官公庁 (かんこうちょう / kankouchou)", "Kantor Pemerintah", 5),
    ("院", "kanji_bangunan", "in", "イン (IN)", "-", "Institusi / RS", "Bukit 阝 dan gedung 完", "病院 (びょういん / byouin)", "Rumah Sakit", 10),
    ("病", "kanji_kesehatan", "byou", "ビョウ (BYOU)", "やまい", "Penyakit", "Atap sakit 疒 dan 丙", "病人 (びょうにん / byounin)", "Orang sakit", 10),
    ("院", "kanji_bangunan", "in", "イン", "-", "Institusi", "Institusi", "大学院 (だいがくいん / daigakuin)", "Pascasarjana", 10),
    ("科", "kanji_pendidikan", "ka", "カ (KA)", "-", "Departemen / Sains", "Gandum 禾 dan timbangan 斗", "科学 (かがく / kagaku)", "Sains", 9),
    ("術", "kanji_pendidikan", "jutsu", "ジュツ (JUTSU)", "-", "Seni / Teknik", "Jalan 行 dan padi 朮", "美術 (びじゅつ / bijutsu)", "Seni rupa", 11),
    ("術", "kanji_pendidikan", "jutsu", "ジュツ", "-", "Teknik", "Teknik", "手術 (しゅじゅつ / shujutsu)", "Operasi medis", 11),
    ("医", "kanji_kesehatan", "i", "イ (I)", "-", "Medis / Dokter", "Kotak 匚 dan panah 矢", "医学 (いがく / igaku)", "Ilmu kedokteran", 7),
    ("薬", "kanji_kesehatan", "kusuri / yaku", "ヤク (YAKU)", "くすり (kusuri)", "Obat", "Tanaman 草 dan musik 楽", "薬局 (やっきょく / yakkyoku)", "Apotek", 16),
    ("針", "kanji_kesehatan", "hari / shin", "シン (SHIN)", "はり (hari)", "Jarum", "Logam 金 dan sepuluh 十", "注射 (ちゅうしゃ / chuusha)", "Suntikan", 10),
    ("射", "kanji_kesehatan", "sha", "シャ (SHA)", "い・つ", "Melesat / Suntik", "Tubuh 身 dan panah 寸", "注射 (ちゅうしゃ / chuusha)", "Penyuntikan", 10),
    ("液", "kanji_kesehatan", "eki", "エキ (EKI)", "-", "Cairan", "Air 氵 dan malam 夜", "血液 (けつえき / ketsueki)", "Darah", 11),
    ("血", "kanji_kesehatan", "chi / ketsu", "ケツ (KETSU)", "ち (chi)", "Darah", "Wadah 皿 berisi tetesan darah", "出血 (しゅっけつ / shukketsu)", "Pendarahan", 6),
    ("脈", "kanji_kesehatan", "myaku", "ミャク (MYAKU)", "-", "Urat Nadi", "Daging 月 dan air 脈", "脈拍 (みゃくはく / myakuhaku)", "Denyut nadi", 10),
    ("骨", "kanji_kesehatan", "hone / kotsu", "コツ (KOTSU)", "ほね (hone)", "Tulang", "Tubuh dan kerangka tulang", "骨折 (こっせつ / kossetsu)", "Patah tulang", 10),
    ("筋", "kanji_kesehatan", "suji / kin", "キン (KIN)", "すじ (suji)", "Otot / Alur", "Bambu 竹 dan kekuatan 力", "筋肉 (きんにく / kinniku)", "Otot tubuh", 12),
    ("肉", "kanji_kesehatan", "niku", "ニク (NIKU)", "-", "Daging", "Potongan daging segar", "牛肉 (ぎゅうにく / gyuuniku)", "Daging sapi", 6),
    ("脂", "kanji_kesehatan", "abura / shi", "シ", "あぶら", "Lemak", "Daging dan lemak", "脂肪 (しぼう / shibou)", "Lemak", 10),
    ("脳", "kanji_kesehatan", "nou", "ノウ (NOU)", "-", "Otak", "Daging 月 dan pusing 𡯁", "脳波 (のうは / nouha)", "Gelombang otak", 11),
    ("臓", "kanji_kesehatan", "zou", "ゾウ (ZOU)", "-", "Organ Dalam", "Daging 月 dan simpan 蔵", "心臓 (しんぞう / shinzou)", "Jantung", 19),
    ("胃", "kanji_kesehatan", "i", "イ (I)", "-", "Lambung", "Sawah 田 dan daging 月", "胃薬 (いぐすり / igusuri)", "Obat lambung", 9),
    ("腸", "kanji_kesehatan", "chou", "チョウ (CHOU)", "-", "Usus", "Daging 月 dan panjang 昜", "腸炎 (ちょうえん / chouen)", "Radang usus", 12),
    ("肝", "kanji_kesehatan", "kan", "カン (KAN)", "きも", "Hati Organ", "Daging 月 dan pelindung 干", "肝臓 (かんぞう / kanzou)", "Organ hati", 7),
    ("腎", "kanji_kesehatan", "jin", "ジン (JIN)", "-", "Ginjal", "Tiga 臣 dan daging 月", "腎臓 (じんぞう / jinzou)", "Ginjal", 13),
    ("肺", "kanji_kesehatan", "hai", "ハイ (HAI)", "-", "Paru-paru", "Daging 月 dan pasar 市", "肺炎 (はいえん / haien)", "Radang paru", 9),
    ("膚", "kanji_kesehatan", "fu", "フ (FU)", "-", "Kulit", "Harimau 虎 dan daging 胃", "皮膚 (ひふ / hifu)", "Kulit luar", 15),
    ("眼", "kanji_kesehatan", "gan", "ガン (GAN)", "まなこ", "Mata Indera", "Mata 目 dan pelindung 艮", "眼科 (がんか / ganka)", "Klinik mata", 11),
    ("歯", "kanji_kesehatan", "ha / shi", "シ (SHI)", "は (ha)", "Gigi", "Mulut 止 dan barisan gigi", "歯医者 (はいしゃ / haisha)", "Dokter gigi", 12),
    ("耳", "kanji_kesehatan", "mimi / ji", "ジ (JI)", "みみ (mimi)", "Telinga", "Bentuk daun telinga", "耳鼻科 (じびか / jibika)", "Klinik THT", 6),
    ("鼻", "kanji_kesehatan", "hana / bi", "ビ (BI)", "はな (hana)", "Hidung", "Hidung 自 dan saluran", "耳鼻科 (じびか / jibika)", "Hidung", 14),
    ("喉", "kanji_kesehatan", "nodo / kou", "コウ (KOU)", "のど (nodo)", "Tenggorokan", "Mulut 口 dan pangeran 侯", "喉 (のど / nodo)", "Tenggorokan", 12),
    ("唇", "kanji_kesehatan", "kuchibiru / shin", "シン (SHIN)", "くちびる (kuchibiru)", "Bibir", "Batu 辰 dan mulut 口", "唇 (くちびる / kuchibiru)", "Bibir mulut", 10),
    ("舌", "kanji_kesehatan", "shita / zetsu", "ゼツ (ZETSU)", "した (shita)", "Lidah", "Tiga 千 dan mulut 口", "舌 (した / shita)", "Lidah indera", 6),
    ("胸", "kanji_kesehatan", "mune / kyou", "キョウ (KYOU)", "むね (mune)", "Dada", "Daging 月 dan pelukan 凶", "胸 (むね / mune)", "Dada manusia", 10),
    ("腹", "kanji_kesehatan", "hara / fuku", "フク (FUKU)", "はら (hara)", "Perut", "Daging 月 dan kembali 复", "お腹 (おなか / onaka)", "Perut manusia", 13),
    ("腰", "kanji_kesehatan", "koshi / you", "ヨウ (YOU)", "こし (koshi)", "Pinggang", "Daging 月 dan barat 要", "腰痛 (ようつう / youtsuu)", "Sakit pinggang", 13),
    ("肩", "kanji_kesehatan", "kata / ken", "ケン (KEN)", "かた (kata)", "Bahu", "Pintu 戸 dan daging 月", "肩こり (かたこり / katakori)", "Bahu pegal", 8),
    ("腕", "kanji_kesehatan", "ude / wan", "ワン (WAN)", "うで (ude)", "Lengan", "Daging 月 dan belokan 宛", "腕時計 (うでどけい / udedokei)", "Jam tangan", 12),
    ("指", "kanji_kesehatan", "yubi / shi", "シ (SHI)", "ゆび (yubi)", "Jari", "Tangan 扌 dan menunjuk 旨", "指輪 (ゆびわ / yubiwa)", "Cincin jari", 9),
    ("爪", "kanji_kesehatan", "tsume / sou", "ソウ (SOU)", "つめ (tsume)", "Kuku", "Bentuk kuku jari", "爪切り (つめきり / tsumekiri)", "Pemotong kuku", 4),
    ("掌", "kanji_kesehatan", "tanagokoro / shou", "ショウ (SHOU)", "てのひら", "Telapak Tangan", "Atap 尚 dan tangan 手", "手掌 (しゅしょう / shushou)", "Telapak tangan", 12),
    ("膝", "kanji_kesehatan", "hiza / shitsu", "シツ (SHITSU)", "ひざ (hiza)", "Lutut", "Daging 月 dan cairan 漆", "膝 (ひざ / hiza)", "Lutut kaki", 15),
    ("踵", "kanji_kesehatan", "kakato / shou", "ショウ (SHOU)", "かかと", "Tumit", "Kaki 足 dan berat 重", "踵 (かかと / kakato)", "Tumit kaki", 16),
    ("足", "kanji_kesehatan", "ashi / soku", "ソク (SOKU)", "あし (ashi)", "Kaki / Cukup", "Sendi kaki dan telapak", "満足 (まんぞく / manzoku)", "Kepuasan", 7),
    ("頭", "kanji_kesehatan", "atama / tou", "トウ (TOU)", "あたま (atama)", "Kepala", "Kacang 豆 dan kepala 頁", "頭痛 (ずつう / zutsuu)", "Sakit kepala", 16),
    ("顔", "kanji_kesehatan", "kao / gan", "ガン (GAN)", "かお (kao)", "Wajah", "Tebing 彦 dan kepala 頁", "顔 (かお / kao)", "Wajah muka", 18),
    ("首", "kanji_kesehatan", "kubi / shu", "シュ (SHU)", "くび (kubi)", "Leher / Pemimpin", "Rambut dan mata", "首都 (しゅと / shuto)", "Ibu kota", 9),
    ("額", "kanji_kesehatan", "hitai / gaku", "ガク", "ひたい", "Dahi", "Dahi", "ひたい (ひたい / hitai)", "Dahi muka", 18),
    ("髭", "kanji_kesehatan", "hige", "-", "ひげ (hige)", "Kumis / Janggut", "Rambut 髟 dan bibir", "髭 (ひげ / hige)", "Kumis janggut", 16),
    ("髪", "kanji_kesehatan", "kami / hatsu", "ハツ (HATSU)", "かみ (kami)", "Rambut", "Rambut 髟 dan teman 友", "金髪 (きんぱつ / kimpatsu)", "Rambut pirang", 14),
    ("毛", "kanji_kesehatan", "ke / mou", "モウ", "け", "Bulu", "Helai bulu", "髪の毛 (かみのけ / kaminoke)", "Rambut kepala", 4)
]

added_kanji = []
for item in extra_kanji_pool:
    c = item[0]
    if c not in already_defined:
        already_defined.add(c)
        added_kanji.append(item)

print(f"New added unique items from pool: {len(added_kanji)}")

