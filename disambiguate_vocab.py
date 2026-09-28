import json
import re

# Load vocabComprehensive.json
with open('src/data/vocab/vocabComprehensive.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

card_map = {c['id']: c for c in cards}

# 1. Fix paren typos
paren_fixes = {
    'voc-c-0251': ('えん', 'Lingkaran (bentuk bundar)'),
    'voc-c-0753': ('げんき', 'Sehat / bugar (kata sifat-na)'),
    'voc-c-0952': ('しずか', 'Sunyi / tenang / hening (kata sifat-na)'),
    'voc-c-1002': ('しゅしょう', 'Perdana menteri (Kepala kabinet pemerintahan)'),
    'voc-c-1052': ('しんせつ', 'Baik hati / ramah menolong (kata sifat-na)'),
    'voc-c-1838': ('ひま', 'Senggang / luang / tidak sibuk (kata sifat-na)'),
    'voc-c-1938': ('べんり', 'Praktis / serbaguna / mudah digunakan (kata sifat-na)'),
    'voc-c-2182': ('ゆうめい', 'Terkenal / masyhur (kata sifat-na)'),
    'voc-c-2308': ('アイロン', 'Setrika pakaian (suhu rendah)')
}

for cid, (fixed_jp, fixed_meaning) in paren_fixes.items():
    if cid in card_map:
        card_map[cid]['japanese'] = fixed_jp
        card_map[cid]['meaningId'] = fixed_meaning

# 2. Fix bakuhatsu mistranslation
if 'voc-c-1795' in card_map:
    card_map['voc-c-1795']['meaningId'] = 'Meledak / Meletus'

# 3. Disambiguate specific known words
specific_updates = {
    # Orang tua
    'voc-c-0348': 'Lansia / orang lanjut usia (sebutan sopan)', # おとしより
    'voc-c-2172': 'Orang tua kandung (ayah dan ibu - hiragana)', # りょうしん
    'voc-c-2256': 'Kaum lansia / kakek-nenek (istilah demografi)', # ろうじん
    'voc-c-3135': 'Orang tua kandung (ayah dan ibu)', # 両親

    # Rumah
    'voc-c-0104': 'Rumah / bangunan tempat tinggal (hiragana)', # いえ
    'voc-c-0182': 'Rumah sendiri / keluarga kami', # うち
    'voc-c-0345': 'Rumah Anda / kediaman orang lain (hormat / sonkeigo)', # おたく
    'voc-c-3130': 'Rumah / tempat tinggal (kanji 家)', # 家

    # Polisi
    'voc-c-0710': 'Opsir polisi (singkatan keisatsukan)', # けいかん
    'voc-c-0713': 'Kantor polisi / institusi kepolisian', # けいさつ
    'voc-c-0714': 'Petugas polisi / aparat penegak hukum', # けいさつかん
    'voc-c-3162': 'Petugas polisi / Pak polisi (ramah)', # 警察官 / お巡りさん

    # Cukup
    'voc-c-0726': 'Cukup / tidak perlu lagi (menolak tawaran halus)', # けっこうです
    'voc-c-1090': 'Cukup / memadai (kuantitas atau kelayakan)', # じゅうぶんな
    'voc-c-1299': 'Mencukupi (bentuk ~masu)', # たります
    'voc-c-3897': 'Mencukupi (bentuk kamus)', # 足りる

    # Makan siang
    'voc-c-1845': 'Makan siang (sehari-hari santai)', # ひるごはん
    'voc-c-2670': 'Makan siang (set menu kafe / restoran barat)', # ランチ
    'voc-c-3363': 'Makan siang / menu siang (gabungan)', # 昼ご飯 / 昼食
    'voc-c-3364': 'Makan siang (istilah formal / jadwal)', # 昼食

    # Kaki
    'voc-c-0034': 'Kaki (bagian bawah / tungkai - hiragana)', # あし
    'voc-c-3887': 'Kaki bagian bawah / telapak kaki (foot)', # 足
    'voc-c-3888': 'Tungkai kaki / paha ke bawah (leg)', # 足 / 脚

    # Mencuci
    'voc-c-0077': 'Mencuci (bentuk ~masu)', # あらいます
    'voc-c-2060': 'Mencuci hanya dengan air (tanpa deterjen)', # みずあらい
    'voc-c-3504': 'Mencuci (bentuk kamus)', # 洗う

    # Berbahaya
    'voc-c-0068': 'Berbahaya (situasi fisik / langsung mengancam - hiragana)', # あぶない
    'voc-c-0610': 'Kondisi berisiko / bahaya (kata benda/sifat-na)', # きけん
    'voc-c-0611': 'Berbahaya / berisiko tinggi (kata sifat-na)', # きけんな
    'voc-c-2972': 'Berbahaya (situasi fisik langsung - kanji 危ない)', # 危ない

    # Kuning
    'voc-c-0604': 'Warna kuning (kata benda)', # きいろ
    'voc-c-0605': 'Berwarna kuning (kata sifat -i)', # きいろい
    'voc-c-3733': 'Warna kuning / kuning (gabungan)', # 黄色 / 黄色い

    # Kotor
    'voc-c-0615': 'Kotor / jorok (kata sifat - hiragana)', # きたない
    'voc-c-3481': 'Kotor / jorok (kata sifat - kanji 汚い)', # 汚い
    'voc-c-3483': 'Menjadi kotor / ternoda (kata kerja intransitif)', # 汚れる
    'voc-c-2210': 'Mengotori (bentuk ~masu)', # よごします
    'voc-c-3482': 'Mengotori / menodai (kata kerja transitif)', # 汚す

    # Mobil
    'voc-c-0689': 'Mobil / kendaraan roda empat (sehari-hari)', # くるま
    'voc-c-1081': 'Mobil / otomobil bermotor (formal)', # じどうしゃ
    'voc-c-3895': 'Mobil / kendaraan bermotor (gabungan)', # 車 / 自動車

    # Kota
    'voc-c-0941': 'Kota administratif / kotamadya (市)', # し
    'voc-c-1518': 'Kota metropolitan / megapolitan (都会)', # とかい
    'voc-c-1976': 'Kota pemukiman / perkampungan kota (町)', # まち

    # Sedikit
    'voc-c-1120': 'Berjumlah sedikit (kata sifat -i - hiragana)', # すくない
    'voc-c-1121': 'Sedikit / agak (adverbia kuantitas)', # すこし
    'voc-c-3236': 'Berjumlah sedikit (kata sifat -i - kanji 少ない)', # 少ない

    # Batuk
    'voc-c-1175': 'Batuk-batuk / batuk keluar (bentuk ~masu)', # せきがでます
    'voc-c-1176': 'Batuk keluar (percakapan kasual)', # せきでます
    'voc-c-3023': 'Batuk (kata benda / gejala penyakit)', # 咳

    # Dekat
    'voc-c-1372': 'Berjarak dekat (kata sifat - hiragana)', # ちかい
    'voc-c-1373': 'Sekitar sini / dekat-dekat ini (keterangan tempat)', # ちかく
    'voc-c-3212': 'Berjarak dekat (kata sifat - kanji 近い)', # 近い

    # Luas
    'voc-c-1854': 'Luas / lapang (kata sifat - hiragana)', # ひろい
    'voc-c-2094': 'Luas area / ukuran luas wilayah (kata benda matematis)', # めんせき
    'voc-c-3585': 'Luas / lapang (kata sifat - kanji 広い)', # 広い

    # Malam & Makan Malam
    'voc-c-1798': 'Petang / malam hari menjelang tidur (晩)', # ばん
    'voc-c-2216': 'Malam hari (waktu gelap setelah terbenam matahari)', # よる
    'voc-c-3367': 'Malam hari / petang (gabungan 夜 / 晩)', # 夜 / 晩
    'voc-c-1799': 'Makan malam (sehari-hari di rumah)', # ばんごはん
    'voc-c-3365': 'Makan malam (istilah resmi / menu dinas)', # 夕食
    'voc-c-3366': 'Makan malam (gabungan 晩ご飯 / 夕食)', # 晩ご飯 / 夕食

    # Bekerja
    'voc-c-1763': 'Bekerja (bentuk ~masu)', # はたらきます
    'voc-c-3164': 'Mengerjakan tugas / berdinas (仕事する)', # 仕事する
    'voc-c-3168': 'Bekerja mencari nafkah (bentuk kamus 働く)', # 働く

    # Tidur
    'voc-c-1698': 'Tidur / berbaring di ranjang (bentuk ~masu)', # ねます
    'voc-c-1704': 'Tertidur lelap / terlelap (bentuk ~masu)', # ねむります
    'voc-c-3641': 'Tidur / berbaring (bentuk kamus 寝る)', # 寝る

    # Menemukan
    'voc-c-1772': 'Menemukan / mendeteksi (bentuk ~masu formal)', # はっけんします
    'voc-c-2041': 'Menemukan benda yang dicari (bentuk ~masu)', # みつけます
    'voc-c-3351': 'Menemukan benda yang dicari (bentuk kamus 見つける)', # 見つける

    # Apel & Celana
    'voc-c-2251': 'Apel buah (hiragana)', # りんご
    'voc-c-2714': 'Apel buah (katakana)', # リンゴ
    'voc-c-3417': 'Buah apel (kanji 林檎 / リンゴ)', # 林檎 / リンゴ
    'voc-c-2493': 'Celana panjang (istilah serapan prancis)', # ズボン
    'voc-c-2494': 'Celana panjang / celana (gabungan ズボン / パンツ)', # ズボン / パンツ
    'voc-c-2601': 'Celana kasual / celana dalam (pants)', # パンツ

    # Warna Biru & Merah
    'voc-c-0016': 'Warna biru (kata benda)', # あお
    'voc-c-0017': 'Berwarna biru (kata sifat -i)', # あおい
    'voc-c-0018': 'Warna merah (kata benda)', # あか
    'voc-c-0019': 'Berwarna merah (kata sifat -i)', # あかい
    'voc-c-1043': 'Warna putih (kata benda)', # しろ
    'voc-c-1044': 'Berwarna putih (kata sifat -i)', # しろい
    'voc-c-0692': 'Warna hitam (kata benda)', # くろ
    'voc-c-0693': 'Berwarna hitam (kata sifat -i)', # くろい
    'voc-c-2050': 'Warna hijau (kata benda)', # みどり
    'voc-c-3734': 'Warna hijau (gabungan 緑 / グリーン)', # 緑 / グリーン

    # Terbuka & Terlepas
    'voc-c-0026': 'Terbuka dengan sendirinya (pintu/toko - bentuk ~masu)', # あきます
    'voc-c-1757': 'Terlepas / copot (kancing/pengait - bentuk ~masu)', # はずれます

    # Besok & Disana
    'voc-c-0035': 'Besok (percakapan umum ashita)', # あした
    'voc-c-0038': 'Besok (ragam formal asu)', # あす
    'voc-c-3347': 'Besok hari (kanji 明日)', # 明日
    'voc-c-0041': 'Di sana (tempat jauh dari keduanya)', # あそこ
    'voc-c-0049': 'Arah ke sana / sebelah sana (sopan)', # あちら

    # Hangat, Panas, Tebal
    'voc-c-0044': 'Hangat (hiragana umum)', # あたたかい
    'voc-c-3379': 'Hangat (suhu cuaca / hawa udara)', # 暖かい
    'voc-c-3531': 'Hangat (makanan / minuman / hati)', # 温かい
    'voc-c-3532': 'Hangat (cuaca / benda - gabungan)', # 温かい / 暖かい
    'voc-c-0051': 'Tebal (buku/kain - hiragana)', # あつい
    'voc-c-2975': 'Tebal (buku/kain/lapisan - kanji 厚い)', # 厚い
    'voc-c-3378': 'Panas (suhu cuaca musim panas)', # 暑い
    'voc-c-3568': 'Panas (suhu benda / minuman / makanan)', # 熱い
    'voc-c-1885': 'Gemuk / tebal membulat (tali/badan/batang)', # ふとい

    # Memperbaiki & Menukar
    'voc-c-1591': 'Memperbaiki / mengoreksi (bentuk ~masu)', # なおします
    'voc-c-2865': 'Mereparasi / memperbaiki mesin/barang (修理する)', # 修理する
    'voc-c-3301': 'Menukar valuta / barter barang sejenis (換える)', # 換える
    'voc-c-3388': 'Mengganti komponen / menukar posisi (替える)', # 替える

    # Penggaris
    'voc-c-1098': 'Penggaris mistar lurus (hiragana)', # じょうぎ
    'voc-c-2123': 'Mistar pengukur panjang (hiragana)', # ものさし
    'voc-c-3128': 'Penggaris mistar lurus (kanji 定規)', # 定規
    'voc-c-3129': 'Penggaris mistar / pengukur panjang (gabungan)', # 定規 / 物差し

    # Memancing & Rumah Sakit
    'voc-c-3970': 'Memancing ikan (kegiatan / hobi - kata benda)', # 釣り
    'voc-c-3971': 'Memancing ikan (kata kerja)', # 釣る
    'voc-c-3915': 'Keluar dari rumah sakit (kata benda / status)', # 退院
    'voc-c-3916': 'Keluar dari rumah sakit (kata kerja)', # 退院する

    # Bayi & Karpet
    'voc-c-3882': 'Bayi mungil / balita lucu', # 赤ちゃん
    'voc-c-3883': 'Orok / bayi merah yang baru lahir', # 赤ん坊
    'voc-c-3727': 'Karpet permadani tenun lantai', # 絨毯
    'voc-c-3728': 'Karpet permadani / penutup lantai modern', # 絨毯 / カーペット

    # Toilet
    'voc-c-2537': 'Toilet / kloset kamar kecil', # トイレ
    'voc-c-2538': 'Kamar kecil / wastafel (sopan)', # トイレ / お手洗い

    # Kartu & Ski
    'voc-c-2356': 'Permainan kartu tradisional Jepang (karuta)', # カルタ
    'voc-c-2364': 'Kartu plastik / kartu permainan modern (card)', # カード
    'voc-c-2404': 'Lereng bermain ski (gelände)', # ゲレンデ
    'voc-c-2469': 'Arena / resor bermain ski (skijou)', # スキーじょう

    # Bagi & Membagi
    'voc-c-2302': 'Membagi angka / memecahkan barang (waru)', # わる
    'voc-c-4135': 'Bagi / menurut sudut pandang (~ni totte)', # ～にとって

    # Cepat & Lambat
    'voc-c-1744': 'Cepat / lebih awal (waktu/pagi - hiragana)', # はやい
    'voc-c-3392': 'Cepat / lebih awal (waktu / pagi hari - 早い)', # 早い
    'voc-c-3896': 'Cepat / laju kencang (kecepatan / pergerakan - 速い)', # 速い
    'voc-c-0331': 'Lambat / telat (waktu / laju - おそい)', # おそい
    'voc-c-3221': 'Lambat / telat (waktu / laju - kanji 遅い)', # 遅い

    # Sembuh & Membantu
    'voc-c-1592': 'Sembuh dari penyakit (bentuk ~masu)', # なおります
    'voc-c-3492': 'Sembuh dari penyakit (bentuk kamus)', # 治る
    'voc-c-1455': 'Membantu pekerjaan (bentuk ~masu)', # てつだいます
    'voc-c-3267': 'Membantu pekerjaan orang lain (bentuk kamus)', # 手伝う
    'voc-c-1290': 'Menolong / menyelamatkan (bentuk ~masu)', # たすけます
    'voc-c-3708': 'Menolong / menyelamatkan (bentuk kamus 助ける)', # 助ける

    # Makanan & Merebus
    'voc-c-1027': 'Produk makanan / komoditas pangan olahan', # しょくひん
    'voc-c-1317': 'Makanan santapan sehari-hari', # たべもの
    'voc-c-1671': 'Merebus dengan bumbu kuah (niru)', # にる
    'voc-c-2189': 'Merebus dalam air mendidih (seperti telur/sayur - yuderu)', # ゆでる

    # Penampilan & Persiapan
    'voc-c-1115': 'Sosok fisik / penampilan postur tubuh (sugata)', # すがた
    'voc-c-2199': 'Gelagat / keadaan situasi / raut kondisi (yousu)', # ようす
    'voc-c-1094': 'Persiapan acara / bekal kegiatan (junbi)', # じゅんび
    'voc-c-1224': 'Kesiapsiagaan / antisipasi bencana / perlengkapan darurat (sonae)', # そなえ

    # Menjual & Membeli
    'voc-c-0216': 'Menjual (bentuk ~masu)', # うります
    'voc-c-3061': 'Menjual barang (bentuk kamus 売る)', # 売る
    'voc-c-0450': 'Membeli (bentuk ~masu)', # かいます
    'voc-c-3868': 'Membeli barang (bentuk kamus 買う)', # 買う

    # Masuk & Keluar
    'voc-c-1729': 'Masuk ke dalam (bentuk ~masu)', # はいります
    'voc-c-2890': 'Masuk ke dalam (bentuk kamus 入る)', # 入る
    'voc-c-1670': 'Memasukkan data / mengetik (nyuuryoku shimasu)', # にゅうりょくします
    'voc-c-2891': 'Memasukkan benda ke dalam wadah (ireru)', # 入れる
    'voc-c-1481': 'Keluar dari ruangan (bentuk ~masu)', # でます
    'voc-c-3037': 'Keluar dari ruangan (bentuk kamus 出る)', # 出る
    'voc-c-1353': 'Mengeluarkan / menyerahkan tugas (bentuk ~masu)', # だします
    'voc-c-3038': 'Mengeluarkan / menyerahkan (bentuk kamus 出す)', # 出す

    # Dapur & Lemari
    'voc-c-1338': 'Dapur memasak (hiragana)', # だいどころ
    'voc-c-3001': 'Dapur / ruang memasak (gabungan 台所 / キッチン)', # 台所 / キッチン
    'voc-c-1304': 'Rak susun / lemari rak (tana)', # たな
    'voc-c-1326': 'Lemari laci pakaian (tansu)', # たんす

    # Terdengar suara & Suara
    'voc-c-0346': 'Terdengar suara bunyi benda/mesin/alam (oto ga shimasu)', # おとがします
    'voc-c-0778': 'Terdengar suara vokal manusia/bicara (koe ga shimasu)', # こえがします
    'voc-c-0349': 'Suara bunyi benda / mesin / alam (oto)', # おと
    'voc-c-0777': 'Suara manusia / vokal suara (koe)', # こえ

    # Berjalan, Berlari, Berenang
    'voc-c-0080': 'Berjalan kaki (bentuk ~masu)', # あるきます
    'voc-c-3447': 'Berjalan kaki (bentuk kamus 歩く)', # 歩く
    'voc-c-1761': 'Berlari (bentuk ~masu)', # はしります
    'voc-c-1762': 'Berlari (bentuk kamus 走る)', # 走る
    'voc-c-3720': 'Berlari kencang (kanji 走る)', # 走る
    'voc-c-0371': 'Berenang (bentuk ~masu)', # およぎます
    'voc-c-0372': 'Berenang (bentuk kamus hiragana)', # およぐ
    'voc-c-3505': 'Berenang (bentuk kamus kanji 泳ぐ)', # 泳ぐ

    # Menikah & Berbelanja
    'voc-c-0727': 'Menikah (bentuk ~masu)', # けっこんします
    'voc-c-3724': 'Menikah (bentuk kamus 結婚する)', # 結婚する
    'voc-c-0453': 'Berbelanja (bentuk ~masu)', # かいものします
    'voc-c-3867': 'Berbelanja keperluan (bentuk kamus 買い物する)', # 買い物する

    # Belajar & Mengajar
    'voc-c-1934': 'Belajar (bentuk ~masu)', # べんきょうします
    'voc-c-2945': 'Belajar mendalami ilmu (bentuk kamus 勉強する)', # 勉強する
    'voc-c-0283': 'Mengajar / memberitahu info (bentuk ~masu)', # おしえます
    'voc-c-3310': 'Mengajar / memberitahu (bentuk kamus 教える)', # 教える
    'voc-c-1644': 'Belajar dari bimbingan guru / les (bentuk ~masu)', # ならいます
    'voc-c-3311': 'Belajar dari bimbingan guru / les (bentuk kamus 習う)', # 習う

    # Meminjam & Meminjamkan
    'voc-c-0537': 'Meminjam dari orang lain (bentuk ~masu)', # かります
    'voc-c-2868': 'Meminjam dari orang lain (bentuk kamus 借りる)', # 借りる
    'voc-c-0483': 'Meminjamkan ke orang lain (bentuk ~masu)', # かします
    'voc-c-3869': 'Meminjamkan ke orang lain (bentuk kamus 貸す)', # 貸す

    # Pulang & Mengembalikan
    'voc-c-0460': 'Pulang ke rumah/negeri (bentuk ~masu)', # かえります
    'voc-c-3186': 'Pulang ke rumah/negeri (bentuk kamus 帰る)', # 帰る
    'voc-c-0456': 'Mengembalikan barang pinjaman (bentuk ~masu)', # かえします
    'voc-c-3908': 'Mengembalikan barang pinjaman (bentuk kamus 返す)', # 返す

    # Menang & Kalah
    'voc-c-0498': 'Menang dalam lomba/pertandingan (bentuk ~masu)', # かちます
    'voc-c-2948': 'Menang dalam lomba/pertandingan (bentuk kamus 勝つ)', # 勝つ
    'voc-c-1990': 'Kalah dalam lomba/pertandingan (bentuk ~masu)', # まけます
    'voc-c-3864': 'Kalah dalam lomba/pertandingan (bentuk kamus 負ける)', # 負ける

    # Berdiri & Duduk
    'voc-c-1296': 'Berdiri (bentuk ~masu)', # たちます
    'voc-c-3689': 'Berdiri tegak (bentuk kamus 立つ)', # 立つ
    'voc-c-1147': 'Duduk di kursi/lantai (bentuk ~masu)', # すわります
    'voc-c-3195': 'Duduk di kursi/lantai (bentuk kamus 座る)', # 座る

    # Membuang & Melempar
    'voc-c-1134': 'Membuang ke tempat sampah (bentuk ~masu)', # すてます
    'voc-c-3293': 'Membuang ke tempat sampah (bentuk kamus 捨てる)', # 捨てる
    'voc-c-1587': 'Melempar bola/benda (bentuk ~masu)', # なげます
    'voc-c-1588': 'Melempar bola/benda (bentuk kamus hiragana)', # なげる
    'voc-c-3269': 'Melempar bola/benda (bentuk kamus kanji 投げる)', # 投げる

    # Mencuri
    'voc-c-1680': 'Mencuri barang orang (bentuk ~masu)', # ぬすみます
    'voc-c-1681': 'Mencuri barang orang (bentuk kamus hiragana)', # ぬすむ
    'voc-c-3435': 'Mencuri barang orang (bentuk kamus kanji 盗む)', # 盗む

    # Menunggu & Memanggil
    'voc-c-2009': 'Menunggu seseorang/waktu (bentuk ~masu)', # まちます
    'voc-c-3215': 'Menunggu seseorang/waktu (bentuk kamus 待つ)', # 待つ
    'voc-c-2217': 'Memanggil nama/taksi (bentuk ~masu)', # よびます
    'voc-c-3017': 'Memanggil nama/taksi (bentuk kamus 呼ぶ)', # 呼ぶ

    # Membaca & Menulis
    'voc-c-2220': 'Membaca buku/teks (bentuk ~masu)', # よみます
    'voc-c-3846': 'Membaca buku/teks (bentuk kamus 読む)', # 読む
    'voc-c-0466': 'Menulis catatan/huruf (bentuk ~masu)', # かきます
    'voc-c-3404': 'Menulis catatan/huruf (bentuk kamus 書く)', # 書く

    # Mendengar & Bertanya
    'voc-c-0613': 'Mendengar / mendengarkan / bertanya (bentuk ~masu)', # ききます
    'voc-c-3995': 'Mendengar / bertanya (bentuk kamus 聞く)', # 聞く

    # Melihat
    'voc-c-2035': 'Melihat / menonton (bentuk ~masu)', # みます
    'voc-c-3350': 'Melihat / menonton (bentuk kamus 見る)', # 見る

    # Makan & Minum
    'voc-c-1316': 'Makan (bentuk ~masu)', # たべます
    'voc-c-4044': 'Makan (bentuk kamus 食べる)', # 食べる
    'voc-c-1714': 'Minum (bentuk ~masu)', # のみます
    'voc-c-4048': 'Minum (bentuk kamus 飲む)', # 飲む

    # Berbicara & Menjelaskan
    'voc-c-1769': 'Berbicara / bercakap-cakap (bentuk ~masu)', # はなします
    'voc-c-3840': 'Berbicara / mengobrol (bentuk kamus 話す)', # 話す
    'voc-c-1182': 'Menjelaskan persoalan (bentuk ~masu)', # せつめいします
    'voc-c-3844': 'Menjelaskan rincian persoalan (bentuk kamus 説明する)', # 説明する

    # Lupa & Ingat
    'voc-c-2281': 'Lupa / terlupa (bentuk ~masu)', # わすれます
    'voc-c-3228': 'Lupa / terlupa (bentuk kamus 忘れる)', # 忘れる
    'voc-c-0383': 'Mengingat / menghafal (bentuk ~masu)', # おぼえます
    'voc-c-3327': 'Mengingat / menghafal (bentuk kamus 覚える)', # 覚える

    # Naik & Turun Kendaraan
    'voc-c-1719': 'Naik ke dalam kendaraan (bentuk ~masu)', # のります
    'voc-c-2791': 'Naik ke dalam kendaraan (bentuk kamus 乗る)', # 乗る
    'voc-c-0373': 'Turun dari kendaraan (bentuk ~masu)', # おります
    'voc-c-2848': 'Turun dari kendaraan (bentuk kamus 降りる)', # 降りる

    # Memperkenalkan
    'voc-c-1010': 'Memperkenalkan orang/diri (bentuk ~masu)', # しょうかいします
    'voc-c-3716': 'Memperkenalkan orang/diri (bentuk kamus 紹介する)', # 紹介する

    # Menabung
    'voc-c-1396': 'Menabung uang di bank (bentuk ~masu)', # ちょきんします
    'voc-c-3866': 'Menabung uang simpanan (bentuk kamus 貯金する)', # 貯金する

    # Melanjutkan
    'voc-c-1433': 'Melanjutkan aktivitas (bentuk ~masu)', # つづけます
    'voc-c-3731': 'Melanjutkan aktivitas terus-menerus (bentuk kamus 続ける)', # 続ける

    # Berolahraga
    'voc-c-0177': 'Berolahraga raga fisik (bentuk ~masu)', # うんどうします
    'voc-c-0178': 'Berolahraga raga fisik (bentuk kamus hiragana)', # うんどうする
    'voc-c-3432': 'Berolahraga raga fisik (bentuk kamus 運動する)', # 運動する

    # Mengekspor & Mengimpor
    'voc-c-2186': 'Mengekspor komoditas ke luar negeri (bentuk ~masu)', # ゆしゅつします
    'voc-c-3900': 'Mengekspor komoditas (bentuk kamus 輸出する)', # 輸出する
    'voc-c-2190': 'Mengimpor komoditas dari luar negeri (bentuk ~masu)', # ゆにゅうします
    'voc-c-3899': 'Mengimpor komoditas (bentuk kamus 輸入する)', # 輸入する

    # Menelepon
    'voc-c-1497': 'Menelepon seseorang (bentuk ~masu)', # でんわします
    'voc-c-4014': 'Menelepon seseorang (bentuk kamus 電話する)', # 電話する
}

for cid, new_meaning in specific_updates.items():
    if cid in card_map:
        card_map[cid]['meaningId'] = new_meaning

# Save back to vocabComprehensive.json
with open('src/data/vocab/vocabComprehensive.json', 'w', encoding='utf-8') as f:
    json.dump(cards, f, ensure_ascii=False, indent=2)

print(f'Successfully updated {len(paren_fixes)} paren typos and {len(specific_updates)} specific disambiguations!')
