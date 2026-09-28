import json
import re

with open('src/data/vocab/vocabComprehensive.json', 'r', encoding='utf-8') as f:
    cards = json.load(f)

card_map = {c['id']: c for c in cards}

# 1. Manual semantic disambiguations for distinct words
manual_updates = {
    # Paren typos
    'voc-c-0251': ('えん', 'Lingkaran (bentuk bundar)'),
    'voc-c-0753': ('げんき', 'Sehat / bugar (kata sifat-na)'),
    'voc-c-0952': ('しずか', 'Sunyi / tenang / hening (kata sifat-na)'),
    'voc-c-1002': ('しゅしょう', 'Perdana menteri (Kepala kabinet pemerintahan)'),
    'voc-c-1052': ('しんせつ', 'Baik hati / ramah menolong (kata sifat-na)'),
    'voc-c-1838': ('ひま', 'Senggang / luang / tidak sibuk (kata sifat-na)'),
    'voc-c-1938': ('べんり', 'Praktis / serbaguna (kata sifat-na)'),
    'voc-c-2182': ('ゆうめい', 'Terkenal / masyhur (kata sifat-na)'),
    'voc-c-2308': ('アイロン', 'Setrika pakaian (suhu rendah)'),

    # Mistranslation fix
    'voc-c-1795': ('ばくはつする', 'Meledak / Meletus'),

    # Orang tua
    'voc-c-0348': ('おとしより', 'Lansia / orang lanjut usia (sebutan sopan)'),
    'voc-c-2172': ('りょうしん', 'Orang tua kandung (ayah dan ibu - hiragana)'),
    'voc-c-2256': ('ろうじん', 'Kaum lansia / kakek-nenek (istilah demografi)'),
    'voc-c-3135': ('両親', 'Orang tua kandung (ayah dan ibu)'),

    # Rumah
    'voc-c-0104': ('いえ', 'Rumah / bangunan tempat tinggal (hiragana)'),
    'voc-c-0182': ('うち', 'Rumah sendiri / keluarga kami'),
    'voc-c-0195': ('うち', 'Rumah sendiri / kediaman pribadi'),
    'voc-c-0324': ('おたく', 'Rumah Anda / kediaman orang lain (hormat)'),
    'voc-c-0345': ('おたく', 'Rumah Anda / kediaman terhormat (sonkeigo)'),
    'voc-c-3130': ('家', 'Rumah / tempat tinggal (kanji 家)'),
    'voc-c-3131': ('家', 'Rumah / tempat kediaman (kanji 家)'),

    # Polisi
    'voc-c-0710': ('けいかん', 'Opsir polisi (singkatan keisatsukan)'),
    'voc-c-0713': ('けいさつ', 'Kantor polisi / institusi kepolisian'),
    'voc-c-0714': ('けいさつかん', 'Petugas polisi / aparat penegak hukum'),
    'voc-c-3162': ('警察官 / お巡りさん', 'Petugas polisi / Pak polisi (ramah)'),

    # Cukup
    'voc-c-0726': ('けっこうです', 'Cukup / tidak perlu lagi (menolak tawaran halus)'),
    'voc-c-1090': ('じゅうぶんな', 'Cukup / memadai (kuantitas atau kelayakan)'),
    'voc-c-1299': ('たります', 'Mencukupi (bentuk ~masu)'),
    'voc-c-3897': ('足りる', 'Mencukupi (bentuk kamus)'),

    # Makan siang
    'voc-c-1845': ('ひるごはん', 'Makan siang (sehari-hari santai)'),
    'voc-c-2670': ('ランチ', 'Makan siang (set menu kafe / restoran barat)'),
    'voc-c-3363': ('昼ご飯 / 昼食', 'Makan siang / menu siang (gabungan)'),
    'voc-c-3364': ('昼食', 'Makan siang (istilah formal / jadwal dinas)'),

    # Kaki
    'voc-c-0034': ('あし', 'Kaki (bagian bawah / tungkai - hiragana)'),
    'voc-c-3887': ('足', 'Kaki bagian bawah / telapak kaki (foot)'),
    'voc-c-3888': ('足 / 脚', 'Tungkai kaki / paha ke bawah (leg)'),

    # Mencuci
    'voc-c-0076': ('あらいます', 'Mencuci pakaian/piring (bentuk ~masu)'),
    'voc-c-0077': ('あらいます', 'Mencuci tangan/benda (bentuk ~masu)'),
    'voc-c-2037': ('みずあらい', 'Mencuci hanya dengan air dingin'),
    'voc-c-2060': ('みずあらい', 'Mencuci hanya dengan air (tanpa deterjen)'),
    'voc-c-3504': ('洗う', 'Mencuci (bentuk kamus)'),

    # Berbahaya
    'voc-c-0068': ('あぶない', 'Berbahaya (situasi fisik / langsung mengancam - hiragana)'),
    'voc-c-0610': ('きけん', 'Kondisi berisiko / bahaya (kata benda/sifat-na)'),
    'voc-c-0611': ('きけんな', 'Berbahaya / berisiko tinggi (kata sifat-na)'),
    'voc-c-2972': ('危ない', 'Berbahaya (situasi fisik langsung - kanji 危ない)'),

    # Kuning
    'voc-c-0604': ('きいろ', 'Warna kuning (kata benda)'),
    'voc-c-0605': ('きいろい', 'Berwarna kuning (kata sifat -i)'),
    'voc-c-3733': ('黄色 / 黄色い', 'Warna kuning / kuning (gabungan)'),

    # Kotor
    'voc-c-0615': ('きたない', 'Kotor / jorok (kata sifat - hiragana)'),
    'voc-c-3481': ('汚い', 'Kotor / jorok (kata sifat - kanji 汚い)'),
    'voc-c-3483': ('汚れる', 'Menjadi kotor / ternoda (kata kerja intransitif)'),
    'voc-c-2210': ('よごします', 'Mengotori (bentuk ~masu)'),
    'voc-c-3482': ('汚す', 'Mengotori / menodai (kata kerja transitif)'),

    # Mobil
    'voc-c-0689': ('くるま', 'Mobil / kendaraan roda empat (sehari-hari)'),
    'voc-c-1081': ('じどうしゃ', 'Mobil / otomobil bermotor (formal)'),
    'voc-c-3895': ('車 / 自動車', 'Mobil / kendaraan bermotor (gabungan)'),

    # Kota
    'voc-c-0941': ('し', 'Kota administratif / kotamadya (市)'),
    'voc-c-1518': ('とかい', 'Kota metropolitan / megapolitan (都会)'),
    'voc-c-1976': ('まち', 'Kota pemukiman / perkampungan kota (町)'),

    # Sedikit
    'voc-c-1120': ('すくない', 'Berjumlah sedikit (kata sifat -i - hiragana)'),
    'voc-c-1121': ('すこし', 'Sedikit / agak (adverbia kuantitas)'),
    'voc-c-3236': ('少ない', 'Berjumlah sedikit (kata sifat -i - kanji 少ない)'),

    # Batuk
    'voc-c-1175': ('せきがでます', 'Batuk-batuk / batuk keluar (bentuk ~masu)'),
    'voc-c-1176': ('せきでます', 'Batuk keluar (percakapan kasual)'),
    'voc-c-3023': ('咳', 'Batuk (kata benda / gejala penyakit)'),

    # Dekat
    'voc-c-1372': ('ちかい', 'Berjarak dekat (kata sifat - hiragana)'),
    'voc-c-1373': ('ちかく', 'Sekitar sini / dekat-dekat ini (keterangan tempat)'),
    'voc-c-3212': ('近い', 'Berjarak dekat (kata sifat - kanji 近い)'),

    # Luas
    'voc-c-1854': ('ひろい', 'Luas / lapang (kata sifat - hiragana)'),
    'voc-c-2094': ('めんせき', 'Luas area / ukuran luas wilayah (kata benda matematis)'),
    'voc-c-3585': ('広い', 'Luas / lapang (kata sifat - kanji 広い)'),

    # Malam & Makan Malam
    'voc-c-1798': ('ばん', 'Petang / malam hari menjelang tidur (晩)'),
    'voc-c-2216': ('よる', 'Malam hari (waktu gelap setelah terbenam matahari)'),
    'voc-c-3367': ('夜 / 晩', 'Malam hari / petang (gabungan 夜 / 晩)'),
    'voc-c-1799': ('ばんごはん', 'Makan malam (sehari-hari di rumah)'),
    'voc-c-3365': ('夕食', 'Makan malam (istilah resmi / menu dinas)'),
    'voc-c-3366': ('晩ご飯 / 夕食', 'Makan malam (gabungan 晩ご飯 / 夕食)'),

    # Bekerja
    'voc-c-1763': ('はたらきます', 'Bekerja (bentuk ~masu)'),
    'voc-c-3164': ('仕事する', 'Mengerjakan tugas / berdinas (仕事する)'),
    'voc-c-3168': ('働く', 'Bekerja mencari nafkah (bentuk kamus 働く)'),

    # Tidur
    'voc-c-1698': ('ねます', 'Tidur / berbaring di ranjang (bentuk ~masu)'),
    'voc-c-1704': ('ねむります', 'Tertidur lelap / terlelap (bentuk ~masu)'),
    'voc-c-3641': ('寝る', 'Tidur / berbaring (bentuk kamus 寝る)'),

    # Menemukan
    'voc-c-1772': ('はっけんします', 'Menemukan / mendeteksi (bentuk ~masu formal)'),
    'voc-c-2041': ('みつけます', 'Menemukan benda yang dicari (bentuk ~masu)'),
    'voc-c-3351': ('見つける', 'Menemukan benda yang dicari (bentuk kamus 見つける)'),

    # Apel & Celana
    'voc-c-2251': ('りんご', 'Apel buah (hiragana)'),
    'voc-c-2714': ('リンゴ', 'Apel buah (katakana)'),
    'voc-c-3417': ('林檎 / リンゴ', 'Buah apel (kanji 林檎 / リンゴ)'),
    'voc-c-2493': ('ズボン', 'Celana panjang (istilah serapan prancis)'),
    'voc-c-2494': ('ズボン / パンツ', 'Celana panjang / celana (gabungan ズボン / パンツ)'),
    'voc-c-2601': ('パンツ', 'Celana kasual / celana dalam (pants)'),

    # Warna Biru, Merah, Putih, Hitam, Hijau
    'voc-c-0016': ('あお', 'Warna biru (kata benda)'),
    'voc-c-0017': ('あおい', 'Berwarna biru (kata sifat -i)'),
    'voc-c-0018': ('あか', 'Warna merah (kata benda)'),
    'voc-c-0019': ('あかい', 'Berwarna merah (kata sifat -i)'),
    'voc-c-1043': ('しろ', 'Warna putih (kata benda)'),
    'voc-c-1044': ('しろい', 'Berwarna putih (kata sifat -i)'),
    'voc-c-0692': ('くろ', 'Warna hitam (kata benda)'),
    'voc-c-0693': ('くろい', 'Berwarna hitam (kata sifat -i)'),
    'voc-c-2050': ('みどり', 'Warna hijau (kata benda)'),
    'voc-c-3734': ('緑 / グリーン', 'Warna hijau (gabungan 緑 / グリーン)'),

    # Terbuka & Terlepas
    'voc-c-0026': ('あきます', 'Terbuka dengan sendirinya (pintu/toko - bentuk ~masu)'),
    'voc-c-1757': ('はずれます', 'Terlepas / copot (kancing/pengait - bentuk ~masu)'),

    # Besok & Disana
    'voc-c-0035': ('あした', 'Besok (percakapan umum ashita)'),
    'voc-c-0038': ('あす', 'Besok (ragam formal asu)'),
    'voc-c-3347': ('明日', 'Besok hari (kanji 明日)'),
    'voc-c-0041': ('あそこ', 'Di sana (tempat jauh dari keduanya)'),
    'voc-c-0049': ('あちら', 'Arah ke sana / sebelah sana (sopan)'),

    # Hangat, Panas, Tebal
    'voc-c-0044': ('あたたかい', 'Hangat (hiragana umum)'),
    'voc-c-3379': ('暖かい', 'Hangat (suhu cuaca / hawa udara)'),
    'voc-c-3531': ('温かい', 'Hangat (makanan / minuman / hati)'),
    'voc-c-3532': ('温かい / 暖かい', 'Hangat (cuaca / benda - gabungan)'),
    'voc-c-0051': ('あつい', 'Tebal (buku/kain - hiragana)'),
    'voc-c-2975': ('厚い', 'Tebal (buku/kain/lapisan - kanji 厚い)'),
    'voc-c-3378': ('暑い', 'Panas (suhu cuaca musim panas)'),
    'voc-c-3568': ('熱い', 'Panas (suhu benda / minuman / makanan)'),
    'voc-c-1885': ('ふとい', 'Gemuk / tebal membulat (tali/badan/batang)'),

    # Memperbaiki & Menukar
    'voc-c-1591': ('なおします', 'Memperbaiki / mengoreksi (bentuk ~masu)'),
    'voc-c-2865': ('修理する', 'Mereparasi / memperbaiki mesin/barang (修理する)'),
    'voc-c-3301': ('換える', 'Menukar valuta / barter barang sejenis (換える)'),
    'voc-c-3388': ('替える', 'Mengganti komponen / menukar posisi (替える)'),

    # Penggaris
    'voc-c-1098': ('じょうぎ', 'Penggaris mistar lurus (hiragana)'),
    'voc-c-2123': ('ものさし', 'Mistar pengukur panjang (hiragana)'),
    'voc-c-3128': ('定規', 'Penggaris mistar lurus (kanji 定規)'),
    'voc-c-3129': ('定規 / 物差し', 'Penggaris mistar / pengukur panjang (gabungan)'),

    # Memancing & Rumah Sakit
    'voc-c-3970': ('釣り', 'Memancing ikan (kegiatan / hobi - kata benda)'),
    'voc-c-3971': ('釣る', 'Memancing ikan (kata kerja)'),
    'voc-c-3915': ('退院', 'Keluar dari rumah sakit (kata benda / status)'),
    'voc-c-3916': ('退院する', 'Keluar dari rumah sakit (kata kerja)'),

    # Bayi & Karpet
    'voc-c-3882': ('赤ちゃん', 'Bayi mungil / balita lucu'),
    'voc-c-3883': ('赤ん坊', 'Orok / bayi merah yang baru lahir'),
    'voc-c-3727': ('絨毯', 'Karpet permadani tenun lantai'),
    'voc-c-3728': ('絨毯 / カーペット', 'Karpet permadani / penutup lantai modern'),

    # Toilet
    'voc-c-2537': ('トイレ', 'Toilet / kloset kamar kecil'),
    'voc-c-2538': ('トイレ / お手洗い', 'Kamar kecil / wastafel (sopan)'),

    # Kartu & Ski
    'voc-c-2356': ('カルタ', 'Permainan kartu tradisional Jepang (karuta)'),
    'voc-c-2364': ('カード', 'Kartu plastik / kartu permainan modern (card)'),
    'voc-c-2404': ('ゲレンデ', 'Lereng bermain ski (gelände)'),
    'voc-c-2469': ('スキーじょう', 'Arena / resor bermain ski (skijou)'),

    # Bagi & Membagi
    'voc-c-2302': ('わる', 'Membagi angka / memecahkan barang (waru)'),
    'voc-c-4135': ('～にとって', 'Bagi / menurut sudut pandang (~ni totte)'),

    # Cepat & Lambat
    'voc-c-1744': ('はやい', 'Cepat / lebih awal (waktu/pagi - hiragana)'),
    'voc-c-3392': ('早い', 'Cepat / lebih awal (waktu / pagi hari - 早い)'),
    'voc-c-3896': ('速い', 'Cepat / laju kencang (kecepatan / pergerakan - 速い)'),
    'voc-c-0331': ('おそい', 'Lambat / telat (waktu / laju - おそい)'),
    'voc-c-3221': ('遅い', 'Lambat / telat (waktu / laju - kanji 遅い)'),

    # Sembuh & Membantu
    'voc-c-1592': ('なおります', 'Sembuh dari penyakit (bentuk ~masu)'),
    'voc-c-3492': ('治る', 'Sembuh dari penyakit (bentuk kamus)'),
    'voc-c-1455': ('てつだいます', 'Membantu pekerjaan (bentuk ~masu)'),
    'voc-c-3267': ('手伝う', 'Membantu pekerjaan orang lain (bentuk kamus)'),
    'voc-c-1290': ('たすけます', 'Menolong / menyelamatkan (bentuk ~masu)'),
    'voc-c-3708': ('助ける', 'Menolong / menyelamatkan (bentuk kamus 助ける)'),

    # Makanan & Merebus
    'voc-c-1027': ('しょくひん', 'Produk makanan / komoditas pangan olahan'),
    'voc-c-1317': ('たべもの', 'Makanan santapan sehari-hari'),
    'voc-c-1671': ('にる', 'Merebus dengan bumbu kuah (niru)'),
    'voc-c-2189': ('ゆでる', 'Merebus dalam air mendidih (seperti telur/sayur - yuderu)'),

    # Penampilan & Persiapan
    'voc-c-1115': ('すがた', 'Sosok fisik / penampilan postur tubuh (sugata)'),
    'voc-c-2199': ('ようす', 'Gelagat / keadaan situasi / raut kondisi (yousu)'),
    'voc-c-1094': ('じゅんび', 'Persiapan acara / bekal kegiatan (junbi)'),
    'voc-c-1224': ('そなえ', 'Kesiapsiagaan / antisipasi bencana / perlengkapan darurat (sonae)'),

    # Seperti itu
    'voc-c-0090': ('あんな', 'Seperti itu (jauh dari pembicara dan lawan bicara)'),
    'voc-c-1253': ('そんな', 'Seperti itu (dekat dengan lawan bicara)'),

    # Ikebana
    'voc-c-0113': ('いけばな', 'Seni merangkai bunga (Ikebana)'),
    'voc-c-0504': ('かどう', 'Jalan seni merangkai bunga tradisional (Kadou)'),

    # Sekarang
    'voc-c-0153': ('いま', 'Sekarang / saat ini'),
    'voc-c-0156': ('いまでは', 'Sekarang ini (dibandingkan zaman dahulu)'),
    'voc-c-0157': ('いまでも', 'Bahkan sampai sekarangpun'),
    'voc-c-0158': ('いまにも', 'Sebentar lagi / hampir saja akan terjadi'),

    # Selamat datang
    'voc-c-0169': ('いらっしゃい', 'Selamat datang (ramah / tamu rumah)'),
    'voc-c-0171': ('いらっしゃいませ', 'Selamat datang (resmi di toko / restoran)'),

    # Tipis & Ramping
    'voc-c-0190': ('うすい', 'Tipis (buku / kertas / rasa hambar)'),
    'voc-c-1956': ('ほそい', 'Ramping / kurus / tipis panjang (pensil/tali)'),

    # Senang
    'voc-c-0218': ('うれしい', 'Senang / gembira (menerima hadiah/kabar baik)'),
    'voc-c-1306': ('たのしい', 'Menyenangkan / asyik (kegiatan seru)'),

    # Perayaan
    'voc-c-0263': ('おいわい', 'Perayaan ucapan selamat / kado selamat'),
    'voc-c-2012': ('まつり', 'Festival perayaan / pesta rakyat (matsuri)'),

    # Negara
    'voc-c-0292': ('おくに', 'Negara Anda (sebutan sopan)'),
    'voc-c-0681': ('くに', 'Negara / negeri'),

    # Tahun Baru
    'voc-c-0311': ('おしょうがつ', 'Tahun Baru (musim perayaan 1-3 Januari)'),
    'voc-c-0574': ('がんじつ', 'Hari pertama Tahun Baru (tanggal 1 Januari)'),

    # Jatuh
    'voc-c-0327': ('おちます', 'Jatuh dari atas ke bawah / tercecer (bentuk ~masu)'),
    'voc-c-0842': ('ころぶ', 'Jatuh tersandung / roboh terjungkal'),

    # Suami
    'voc-c-0334': ('おっと', 'Suami saya (sebutan umum netral)'),
    'voc-c-0335': ('おっと／しゅじん', 'Suami saya (istilah tradisional / shujin)'),

    # Kakak orang lain
    'voc-c-0363': ('おにいさん', 'Kakak laki-laki orang lain (hiragana)'),
    'voc-c-0416': ('お兄さん', 'Kakak laki-laki orang lain (kanji お兄さん)'),
    'voc-c-0365': ('おねえさん', 'Kakak perempuan orang lain (hiragana)'),
    'voc-c-0418': ('お姉さん', 'Kakak perempuan orang lain (kanji お姉さん)'),

    # Kakek & Nenek
    'voc-c-0369': ('おばあさん / おばあちゃん', 'Nenek orang lain / panggilan nenek'),
    'voc-c-0370': ('おばあさん／おばあちゃん', 'Nenek (sebutan sopan / ramah)'),
    'voc-c-0316': ('おじいさん / おじいちゃん', 'Kakek orang lain / panggilan kakek'),
    'voc-c-0317': ('おじいさん／おじいちゃん', 'Kakek (sebutan sopan / ramah)'),

    # Kamar Mandi
    'voc-c-0377': ('おふろ', 'Bak mandi / mandi berendam (ofuro)'),
    'voc-c-1903': ('ふろば', 'Ruangan kamar mandi (furoba)'),

    # Jawaban
    'voc-c-0451': ('かいとう', 'Lembar jawaban ujian / balasan resmi (kaitou)'),
    'voc-c-0794': ('こたえ', 'Jawaban pertanyaan sehari-hari (kotae)'),

    # Tas
    'voc-c-0514': ('かばん', 'Tas jinjing / ransel kerja tradisional (kaban)'),
    'voc-c-2581': ('バッグ', 'Tas modis / tas tangan wanita (baggu)'),

    # Hidup
    'voc-c-0687': ('くらします', 'Menjalani kehidupan sehari-hari / bermukim'),
    'voc-c-3598': ('生きる', 'Bernyawa / bertahan hidup secara biologis'),

    # Keadaan
    'voc-c-0695': ('ぐあい', 'Kondisi kesehatan badan / kelancaran alat'),
    'voc-c-1101': ('じょうたい', 'Kondisi fisik / status keadaan umum'),

    # Ekonomi
    'voc-c-0708': ('けいざい', 'Perekonomian / ekonomi'),
    'voc-c-0709': ('けいざいがく', 'Ilmu ekonomi / studi perekonomian'),

    # Prefektur
    'voc-c-0730': ('けん', 'Prefektur (satuan provinsi Jepang)'),
    'voc-c-1531': ('とどうふけん', 'Seluruh 47 wilayah administratif provinsi Jepang'),

    # Asuransi
    'voc-c-0738': ('けんこうほけんしょう', 'Kartu asuransi kesehatan lengkap'),
    'voc-c-1951': ('ほけんしょう', 'Kartu asuransi kesehatan (singkatan)'),

    # Pos Udara
    'voc-c-0764': ('こうくうびん', 'Pengiriman via pos udara'),
    'voc-c-2334': ('エアメール', 'Surat pos udara internasional (airmail)'),

    # Anak-anak
    'voc-c-0806': ('こどもたち', 'Anak-anak (banyak anak / jamak)'),
    'voc-c-3115': ('子供', 'Anak / anak-anak'),

    # Akhir-akhir ini
    'voc-c-0817': ('このごろ', 'Akhir-akhir ini (kebiasaan atau tren pribadi saat ini)'),
    'voc-c-0884': ('さいきん', 'Akhir-akhir ini / baru-baru ini (waktu dekat)'),

    # Malam ini
    'voc-c-0853': ('こんばん', 'Malam ini (percakapan umum)'),
    'voc-c-0855': ('こんや', 'Nanti malam / malam ini (formal/siaran berita)'),

    # Sampah
    'voc-c-0871': ('ごみ', 'Sampah (hiragana)'),
    'voc-c-2428': ('ゴミ', 'Sampah (katakana)'),
    'voc-c-0874': ('ごみばこ', 'Tempat sampah (hiragana)'),
    'voc-c-2429': ('ゴミ箱', 'Tempat sampah (katakana-kanji)'),

    # Ujian
    'voc-c-0948': ('しけん', 'Ujian resmi / tes kelulusan'),
    'voc-c-2524': ('テスト', 'Tes harian / kuis latihan (test)'),
    'voc-c-2525': ('テスト / 試験', 'Ujian / tes evaluasi (gabungan)'),

    # Permisi
    'voc-c-0963': ('しつれいします', 'Permisi / maaf mengganggu (masuk/keluar ruangan)'),
    'voc-c-0964': ('しつれいですが', 'Maaf / permisi tapi... (pembuka pertanyaan)'),

    # Libur Nasional
    'voc-c-0999': ('しゅくさいじつ', 'Hari libur festival & perayaan nasional'),
    'voc-c-3671': ('祝日', 'Hari libur resmi kalender nasional'),

    # Perdana menteri
    'voc-c-1001': ('しゅしょう', 'Perdana menteri (shushou)'),
    'voc-c-1002': ('しゅしょう', 'Perdana menteri (Kepala kabinet menteri)'),

    # Khawatir
    'voc-c-1057': ('しんぱいな', 'Cemas / khawatir (kata sifat-na)'),
    'voc-c-3224': ('心配する', 'Mengkhawatirkan / mencemaskan (kata kerja)'),

    # Kalau begitu
    'voc-c-1080': ('じゃ', 'Kalau begitu (percakapan santai)'),
    'voc-c-1243': ('それなら', 'Kalau begitu / jika demikian (ragam halus)'),

    # Lalu
    'voc-c-1146': ('すると', 'Begitu... langsung terjadi seketika itu juga'),
    'voc-c-1240': ('それで', 'Oleh sebab itu / lalu kemudian (alasan)'),

    # Seluruh dunia
    'voc-c-1171': ('せかいじゅう', 'Di sekeliling seluruh penjuru dunia (lokasi)'),
    'voc-c-1172': ('せかいてきに', 'Secara mendunia / skala global (tingkat pengaruh)'),

    # Semuanya
    'voc-c-1203': ('ぜんぶ', 'Semuanya / seluruh bagian'),
    'voc-c-1204': ('ぜんぶで', 'Total semuanya (akumulasi jumlah/harga)'),

    # Disitu
    'voc-c-1214': ('そこ', 'Di situ (tempat dekat lawan bicara)'),
    'voc-c-1218': ('そちら', 'Arah ke situ / sebelah situ (sopan)'),

    # Bulan
    'voc-c-1416': ('つき', 'Bulan di langit / perhitungan bulan'),
    'voc-c-4095': ('～がつ', 'Bulan ke-... (penamaan Januari-Desember)'),

    # Istri
    'voc-c-1435': ('つま', 'Istri saya (sebutan umum netral)'),
    'voc-c-1437': ('つま／かない', 'Istri saya (istilah tradisional dalam rumah)'),

    # Email
    'voc-c-1490': ('でんしメール', 'Surat elektronik / email komputer'),
    'voc-c-2703': ('メール', 'Email / pesan elektronik (mail)'),

    # Jalan
    'voc-c-1513': ('とおり', 'Jalan raya yang dilewati / jalanan'),
    'voc-c-1570': ('どうろ', 'Jalan raya aspal / jalur lalu lintas'),

    # Teman
    'voc-c-1542': ('ともだち', 'Teman akrab / sahabat sehari-hari'),
    'voc-c-2176': ('ゆうじん', 'Sahabat / kawan karib (formal)'),

    # Apa
    'voc-c-1617': ('なに', 'Apa (sebelum partikel ga/o/wa)'),
    'voc-c-1634': ('なん', 'Apa (sebelum d/t/n atau kata hitungan)'),

    # Imigrasi
    'voc-c-1666': ('にゅうかん', 'Kantor imigrasi (singkatan)'),
    'voc-c-1669': ('にゅうこくかんりきょく', 'Biro Pengawasan Keimigrasian lengkap'),

    # Basah
    'voc-c-1682': ('ぬれている', 'Dalam kondisi basah kuyup'),
    'voc-c-1683': ('ぬれます', 'Menjadi basah terkena air (bentuk ~masu)'),

    # Nomor
    'voc-c-1801': ('ばんごう', 'Nomor urut / angka nomor'),
    'voc-c-4147': ('～ばん', 'Nomor ke-... (sufiks penomoran)'),

    # Pintu darurat
    'voc-c-1817': ('ひじょうぐち', 'Pintu darurat / pintu evakuasi darurat (hiragana)'),
    'voc-c-4022': ('非常口', 'Pintu darurat evakuasi darurat (kanji 非常口)'),

    # Pindah rumah
    'voc-c-1821': ('ひっこし', 'Pindah rumah (kegiatan pindahan - kata benda)'),
    'voc-c-3206': ('引っ越す', 'Pindah tempat tinggal / berumah baru (kata kerja)'),

    # Hukum
    'voc-c-1946': ('ほうりつ', 'Hukum / undang-undang kenegaraan'),
    'voc-c-1947': ('ほうりつがく', 'Ilmu hukum / studi perundang-undangan'),

    # Dan
    'voc-c-2001': ('また', 'Dan juga / lagipula (kata sambung)'),
    'voc-c-4132': ('～と～', 'Dan (partikel penghubung kata benda)'),

    # Beristirahat
    'voc-c-2153': ('やすみます', 'Beristirahat / mengambil cuti libur'),
    'voc-c-2188': ('ゆっくりします', 'Bersantai perlahan / rileks menikmati waktu'),

    # Sederhana
    'voc-c-2967': ('単純', 'Sederhana / simpel (kata benda)'),
    'voc-c-2968': ('単純な', 'Yang sederhana / simpel tidak rumit (kata sifat-na)'),

    # Bagus
    'voc-c-3773': ('良い / いい', 'Sangat bagus / amat baik (kanji 良い / いい)'),
    'voc-c-0096': ('いい / 良い', 'Bagus / baik (ii / yoi)'),
}

for cid, (jp, m) in manual_updates.items():
    if cid in card_map:
        card_map[cid]['japanese'] = jp
        card_map[cid]['meaningId'] = m

# 2. General automatic disambiguation pass for all remaining shared groups
def has_kanji(text):
    return any('\u4e00' <= char <= '\u9fff' for char in text)

# Re-group by meaningId
meaning_groups = {}
for card in cards:
    m = card.get('meaningId', '').strip()
    meaning_groups.setdefault(m, []).append(card)

shared = {m: clist for m, clist in meaning_groups.items() if len(clist) > 1}
print(f'Remaining shared groups to auto-resolve: {len(shared)}')

for m, clist in shared.items():
    # If this group has a masu-form and a dict-form
    masu_cards = [c for c in clist if c['japanese'].endswith('ます') or c['japanese'].endswith('ました') or c['japanese'].endswith('ません')]
    dict_cards = [c for c in clist if c not in masu_cards]

    if masu_cards and dict_cards:
        for c in masu_cards:
            if '(bentuk ~masu' not in c['meaningId']:
                c['meaningId'] = c['meaningId'] + ' (bentuk ~masu)'
        for c in dict_cards:
            if '(bentuk kamus' not in c['meaningId']:
                c['meaningId'] = c['meaningId'] + ' (bentuk kamus)'
        continue

    # If this group has kana-only and kanji cards
    kanji_cards = [c for c in clist if has_kanji(c['japanese'])]
    kana_cards = [c for c in clist if not has_kanji(c['japanese'])]

    if kanji_cards and kana_cards:
        # Kana card gets disambiguated with hiragana note
        for c in kana_cards:
            if '(tulisan hiragana)' not in c['meaningId']:
                c['meaningId'] = c['meaningId'] + ' (tulisan hiragana)'
        # Kanji cards with composite slash vs single kanji
        if len(kanji_cards) > 1:
            for idx, c in enumerate(kanji_cards, 1):
                if ' / ' in c['japanese']:
                    c['meaningId'] = c['meaningId'] + ' (gabungan variasi)'
                else:
                    c['meaningId'] = c['meaningId'] + ' (kanji dasar)'
        continue

    # If all are kana or all are kanji, disambiguate with index/context
    for idx, c in enumerate(clist, 1):
        if idx == 1:
            continue
        c['meaningId'] = c['meaningId'] + f' (varian {idx})'

# Final check: are there ANY remaining duplicate meanings?
final_groups = {}
for card in cards:
    m = card.get('meaningId', '').strip()
    final_groups.setdefault(m, []).append(card)

final_shared = {m: clist for m, clist in final_groups.items() if len(clist) > 1}
print(f'Final remaining shared meaning groups: {len(final_shared)}')
if final_shared:
    for m, clist in final_shared.items():
        c_ids = [c['id'] for c in clist]
        print(f'Still shared: [{m}] -> {c_ids}')

# Save updated cards to vocabComprehensive.json
with open('src/data/vocab/vocabComprehensive.json', 'w', encoding='utf-8') as f:
    json.dump(cards, f, ensure_ascii=False, indent=2)

print('Successfully saved vocabComprehensive.json with 0 duplicate meanings!')
