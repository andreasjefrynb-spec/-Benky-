import json
import re

comp_path = 'src/data/vocab/vocabComprehensive.json'
v1000_path = 'src/data/vocab/vocab1000.json'

with open(comp_path, 'r', encoding='utf-8') as f:
    cards = json.load(f)

# 1. PEMBERSIHAN SUFIKS ROBOTIK
patterns_to_remove = [
    r'\s*\(tulisan hiragana\)',
    r'\s*\(kanji dasar\)',
    r'\s*\(gabungan variasi\)',
    r'\s*\(varian \d+\)',
    r'\s*\(hiragana [^\)]+\)',
    r'\s*\(kanji [^\)]+\)',
    r'\s*\(kanji:\s*[^\)]+\)',
    r'\s*\(hiragana:\s*[^\)]+\)',
    r'\s*\(gabungan [^\)]+\)',
    r'\s*\(hiragana umum\)',
    r'\s*\(hiragana\)',
    r'\s*\(kanji\)',
    r'\s*\(katakana-kanji\)',
    r'\s*\(gabungan\)',
    r'\s*\(kata sifat - kanji [^\)]+\)',
    r'\s*\(kata sifat -i - hiragana [^\)]+\)',
    r'\s*\(situasi fisik / langsung mengancam - hiragana\)',
    r'\s*\(situasi fisik langsung - kanji [^\)]+\)',
    r'\s*\(buku / kain - hiragana\)',
    r'\s*\(buku / kain / lapisan - kanji [^\)]+\)',
    r'\s*\(cuaca / benda - gabungan\)',
    r'\s*\(makanan / sayur / udara - kanji [^\)]+\)',
    r'\s*\(bagian bawah / tungkai - hiragana\)'
]

def clean_meaning(text):
    if not text:
        return text
    res = text
    for p in patterns_to_remove:
        res = re.sub(p, '', res).strip()
    # Normalize multiple slashes or spaces
    res = re.sub(r'\s+/\s+', ' / ', res)
    res = re.sub(r'\s{2,}', ' ', res)
    return res.strip()

# 2. PERBAIKAN MAKNA SPESIFIK & DISAMBIGUASI ALAMI (ANTI-BINGUNG)
SPECIFIC_CORRECTIONS = {
    # Siapa
    'だれ': 'Siapa (ragam biasa / akrab)',
    'どなた': 'Siapa (ragam sopan / hormat)',

    # Hujan / Salju
    'ふります': 'Turun hujan / salju (bentuk ~masu)',
    '降る': 'Turun hujan / salju (bentuk kamus)',

    # Rumah
    'いえ': 'Rumah / tempat tinggal',
    '家': 'Rumah / tempat tinggal (kanji)',
    'うち': 'Rumah sendiri / keluarga kami',
    'おたく': 'Rumah Anda / kediaman orang lain (sopan)',

    # Panas / Dingin / Suhu
    'あつい': 'Panas (cuaca atau suhu benda)',
    '暑い': 'Panas (suhu cuaca / udara)',
    '熱い': 'Panas (suhu benda / makanan / minuman)',
    '厚い': 'Tebal (buku, pakaian, atau lapisan)',
    'さむい': 'Dingin (suhu cuaca / udara)',
    '寒い': 'Dingin (suhu cuaca / udara)',
    'つめたい': 'Dingin (suhu benda / minuman / sikap)',
    '冷たい': 'Dingin (suhu benda / minuman / sikap)',

    # Manis / Pedas
    'あまい': 'Manis (rasa masakan / minuman)',
    '甘い': 'Manis (rasa) / Lunak atau manja (sikap)',
    'からい': 'Pedas / asin tajam',
    '辛い': 'Pedas / Berat atau tersiksa (kondisi batin)',

    # Membuka / Menutup (Transitif vs Intransitif)
    'あく': 'Terbuka (intransitif: pintu/toko terbuka sendirinya)',
    '開く': 'Terbuka / Membuka (pintu, bunga mekrok)',
    'あけます': 'Membuka (transitif: ~masu)',
    '開ける': 'Membuka (transitif: seseorang membuka pintu/jendela)',
    'しまる': 'Tertutup (intransitif: pintu tertutup sendirinya)',
    '閉まる': 'Tertutup (intransitif: pintu tertutup)',
    'しめます': 'Menutup (transitif: ~masu)',
    '閉める': 'Menutup (transitif: seseorang menutup pintu)',

    # Menyalakan / Memadamkan
    'つく': 'Menyala (intransitif: lampu menyala sendirinya)',
    '点く': 'Menyala (intransitif: lampu/listrik)',
    'つけます': 'Menyalakan (transitif: ~masu)',
    '点ける': 'Menyalakan (transitif: menyalakan lampu/AC)',
    'きえます': 'Padam / mati (intransitif: ~masu)',
    '消える': 'Padam / hilang / mati (intransitif)',
    'けします': 'Memadamkan / mematikan (transitif: ~masu)',
    '消す': 'Memadamkan / mematikan / menghapus (transitif)',

    # Keluar / Masuk
    'でる': 'Keluar / muncul / menghadiri (intransitif)',
    '出る': 'Keluar / muncul / menghadiri (intransitif)',
    'だす': 'Mengeluarkan / menyerahkan / mengirim (transitif)',
    '出す': 'Mengeluarkan / menyerahkan / mengirim (transitif)',
    'はいる': 'Masuk (intransitif)',
    '入る': 'Masuk (intransitif)',
    'いれる': 'Memasukkan (transitif)',
    '入れる': 'Memasukkan (transitif)',

    # Berhenti
    'とまる': 'Berhenti (intransitif: kendaraan/gerakan berhenti)',
    '止まる': 'Berhenti (intransitif: kendaraan/gerakan berhenti)',
    '泊まる': 'Menginap (di hotel/rumah teman)',
    'とめる': 'Menghentikan / memarkir (transitif: mobil/mesin)',
    '止める': 'Menghentikan / memarkir (transitif)',

    # Jatuh / Menjatuhkan
    'おちる': 'Jatuh / gugur / gagal ujian (intransitif)',
    '落ちる': 'Jatuh / gugur / gagal ujian (intransitif)',
    'おとす': 'Menjatuhkan / menghilangkan barang (transitif)',
    '落とす': 'Menjatuhkan / menghilangkan barang (transitif)',

    # Rusak / Memperbaiki
    'こわれる': 'Rusak / hancur (intransitif: barang rusak sendirinya)',
    '壊れる': 'Rusak / hancur (intransitif)',
    'こわす': 'Merusakkan / memecahkan (transitif)',
    '壊す': 'Merusakkan / memecahkan (transitif)',
    'なおる': 'Sembuh (penyakit) / Menjadi baik (barang rusak)',
    '治る': 'Sembuh pulih (dari penyakit/luka)',
    '直る': 'Menjadi baik / selesai diperbaiki (mesin/kesalahan)',
    'なおす': 'Menyembuhkan / memperbaiki',
    '治す': 'Menyembuhkan penyakit / merawat luka',
    '直す': 'Memperbaiki kerusakan / mengoreksi kesalahan',

    # Memakai Pakaian
    'きる': 'Memakai pakaian badan atas (kemeja, kaus, jaket)',
    '着る': 'Memakai pakaian badan atas (kemeja, kaus, jaket)',
    'はく': 'Memakai pakaian badan bawah (celana, rok, sepatu, kaus kaki)',
    '履く': 'Memakai pakaian badan bawah / alas kaki (celana, sepatu)',
    'かぶる': 'Memakai penutup kepala (topi, helm)',
    '被る': 'Memakai penutup kepala (topi, helm)',
    'かける': 'Memakai kacamata (めがねをかける) / menggantung',
    '掛ける': 'Memakai kacamata / menggantungkan / mengunci',

    # Memberi & Menerima
    'あげる': 'Memberi (kepada orang lain / pihak luar)',
    'くれる': 'Memberi (orang lain memberikan kepada saya / keluarga saya)',
    'もらう': 'Menerima (dari orang lain)',
    'かす': 'Meminjamkan (uang / barang kepada orang lain)',
    '貸す': 'Meminjamkan (kepada orang lain)',
    'かりる': 'Meminjam (dari orang lain)',
    '借りる': 'Meminjam (dari orang lain)',

    # Belajar & Mengajar
    'おしえる': 'Mengajar / memberi tahu (informasi / jalan)',
    '教える': 'Mengajar / memberi tahu (informasi / jalan)',
    'ならう': 'Belajar (menerima bimbingan dari guru / pakar)',
    '習う': 'Belajar (menerima bimbingan praktikal dari guru)',
    'べんきょうする': 'Belajar (belajar akademis mandiri)',
    '勉強する': 'Belajar (belajar materi / sains / bahasa)',

    # Tahu & Mengerti
    'しる': 'Tahu / mengenal (mendapatkan informasi baru)',
    '知る': 'Tahu / mengenal (mendapatkan informasi baru)',
    'わかる': 'Mengerti / paham (memahami konsep / alasan)',
    '分かる': 'Mengerti / paham (memahami konsep / alasan)',
    'できる': 'Bisa / mampu / rampung siap',

    # Gemuk & Kurus
    '太る': 'Bertambah gemuk / berat badan naik (kata kerja)',
    'ふとる': 'Bertambah gemuk / berat badan naik (kata kerja)',
    '太い': 'Tebal / gemuk / berdiameter besar (kata sifat -i)',
    'ふとい': 'Tebal / gemuk / berdiameter besar (kata sifat -i)',
    '痩せる': 'Menjadi kurus / turun berat badan (kata kerja)',
    'やせる': 'Menjadi kurus / turun berat badan (kata kerja)',
    '細い': 'Tipis / ramping / kecil halus (kata sifat -i)',
    'ほそい': 'Tipis / ramping / kecil halus (kata sifat -i)',

    # Lain & Terpisah
    '別の': 'Yang lain / berbeda / terpisah (nomina pewatas)',
    'べつの': 'Yang lain / berbeda / terpisah (nomina pewatas)',
    '別に': 'Tidak ada yang khusus (diikuti bentuk negatif)',
    'べつに': 'Tidak ada yang khusus (diikuti bentuk negatif)',

    # Anggota Tubuh
    'あし': 'Kaki (bagian bawah / telapak hingga tungkai)',
    '足': 'Kaki bagian bawah / telapak kaki (foot)',
    '脚': 'Tungkai kaki / paha ke bawah (leg)',
    'はし': 'Sumpit makan (箸) / Jembatan (橋) / Ujung (端)',
    '箸': 'Sumpit makan',
    '橋': 'Jembatan penyeberangan',
    '端': 'Ujung / tepi / sudut batas',

    # Kalimat Minna IMC
    'IMCで 働いています。': 'Bekerja di perusahaan IMC.',
    'あそこで 新聞を 読んでいる 人は 誰ですか。': 'Siapakah orang yang sedang membaca koran di sana?',
    'あれは 車です。': 'Yang di sana itu adalah mobil.',
    'いっしょに 京都へ 行きませんか。': 'Maukah pergi ke Kyoto bersama-sama?'
}

# 3. PEMETAAN SUBKATEGORI YANG TEPAT
def determine_subcat(card):
    jp = card.get('japanese', '').strip()
    kj = card.get('kanji', '').strip()
    rd = card.get('reading', '').strip()
    meaning = card.get('meaningId', '').strip()
    cur_sub = card.get('subCategory', 'kata_benda')

    # Frasa kalimat utuh Minna
    if jp == 'IMCで 働いています。':
        return 'profesi_sekolah'
    if jp in ('あそこで 新聞を 読んでいる 人は 誰ですか。', 'あれは 車です。'):
        return 'salam'
    if jp == 'いっしょに 京都へ 行きませんか。':
        return 'transportasi'

    # Kata Kerja
    if jp.endswith('ます') or jp.endswith('ました') or jp.endswith('ません') or jp.endswith('する'):
        if cur_sub != 'salam' or jp in ('あいさつする', '紹介する', '案内する'):
            return 'kata_kerja'

    # Kata Sifat
    if jp.endswith('い') and not jp.endswith('まい') and not jp.endswith('る') and not jp.endswith('い'):
        pass

    return cur_sub

updated_count = 0
for c in cards:
    jp = c.get('japanese', '').strip()
    kj = c.get('kanji', '').strip()
    old_m = c.get('meaningId', '')

    # Apply clean meaning
    cleaned_m = clean_meaning(old_m)

    # Check specific corrections
    if jp in SPECIFIC_CORRECTIONS:
        cleaned_m = SPECIFIC_CORRECTIONS[jp]
    elif kj in SPECIFIC_CORRECTIONS:
        cleaned_m = SPECIFIC_CORRECTIONS[kj]

    if cleaned_m != old_m:
        c['meaningId'] = cleaned_m
        c['meaning'] = cleaned_m
        updated_count += 1

    # Check subCategory
    new_sub = determine_subcat(c)
    if new_sub != c.get('subCategory'):
        c['subCategory'] = new_sub

print(f'Updated {updated_count} cards in vocabComprehensive.json')

with open(comp_path, 'w', encoding='utf-8') as f:
    json.dump(cards, f, ensure_ascii=False, indent=2)

# Update vocab1000.json too
try:
    with open(v1000_path, 'r', encoding='utf-8') as f:
        v1000 = json.load(f)

    v1000_updated = 0
    for c in v1000:
        jp = c.get('japanese', '').strip()
        kj = c.get('kanji', '').strip()
        old_m = c.get('meaningId', '')
        cleaned_m = clean_meaning(old_m)
        if jp in SPECIFIC_CORRECTIONS:
            cleaned_m = SPECIFIC_CORRECTIONS[jp]
        elif kj in SPECIFIC_CORRECTIONS:
            cleaned_m = SPECIFIC_CORRECTIONS[kj]

        if cleaned_m != old_m:
            c['meaningId'] = cleaned_m
            c['meaning'] = cleaned_m
            v1000_updated += 1

        new_sub = determine_subcat(c)
        if new_sub != c.get('subCategory'):
            c['subCategory'] = new_sub

    with open(v1000_path, 'w', encoding='utf-8') as f:
        json.dump(v1000, f, ensure_ascii=False, indent=2)
    print(f'Updated {v1000_updated} cards in vocab1000.json')
except Exception as e:
    print('v1000 update error:', e)
