import json
import re

with open('src/data/vocab/vocabComprehensive.json', 'r', encoding='utf-8') as f:
    vocab_list = json.load(f)

with open('scripts/aligned_pdf_reference.json', 'r', encoding='utf-8') as f:
    pdf_ref = json.load(f)

print(f'Initial vocabComprehensive cards: {len(vocab_list)}')

card_by_jp = {}
for c in vocab_list:
    jp = c.get('japanese', '').strip()
    kanji = c.get('kanji', '').strip()
    reading = c.get('reading', '').strip().lower()
    if jp: card_by_jp[jp] = c
    if kanji: card_by_jp[kanji] = c

# 1. Enrich & update Kata Sifat NA from PDF
for adj in pdf_ref['kata_sifat_na']:
    kana = adj['kana']
    kanji = adj['kanji']
    meaning = adj['meaning']
    reading = adj['reading']
    
    # Target in vocab_list
    target = card_by_jp.get(kanji) or card_by_jp.get(kana)
    if target:
        target['meaningId'] = meaning
        if kanji and not target.get('kanji'):
            target['kanji'] = kanji
        if not target.get('japanese'):
            target['japanese'] = kanji or kana
    else:
        # Add new card if not present
        new_id = f"adj-na-{adj['no']:03d}"
        new_card = {
            "id": new_id,
            "category": "vocab",
            "subCategory": "kata_sifat",
            "japanese": kanji or kana,
            "kanji": kanji or kana,
            "reading": reading,
            "meaningId": meaning,
            "level": "N5" if adj['no'] <= 25 else "N4" if adj['no'] <= 45 else "N3",
            "notes": "Kata Sifat -NA (Prihatin Sensei)"
        }
        vocab_list.append(new_card)
        card_by_jp[new_card['japanese']] = new_card

# 2. Enrich & update Kata Sifat I from PDF
for adj in pdf_ref['kata_sifat_i']:
    kana = adj['kana']
    kanji = adj['kanji']
    meaning = adj['meaning']
    reading = adj['reading']
    
    target = card_by_jp.get(kanji) or card_by_jp.get(kana)
    if target:
        target['meaningId'] = meaning
        if kanji and not target.get('kanji'):
            target['kanji'] = kanji
    else:
        new_id = f"adj-i-{adj['no']:03d}"
        new_card = {
            "id": new_id,
            "category": "vocab",
            "subCategory": "kata_sifat",
            "japanese": kanji or kana,
            "kanji": kanji or kana,
            "reading": reading,
            "meaningId": meaning,
            "level": "N5" if adj['no'] <= 35 else "N4" if adj['no'] <= 70 else "N3",
            "notes": "Kata Sifat -I (Prihatin Sensei)"
        }
        vocab_list.append(new_card)
        card_by_jp[new_card['japanese']] = new_card

# 3. Enrich & update Verbs Group 1, 2, 3
for g_name, v_list in [('g1', pdf_ref['verbs_group_1']), ('g2', pdf_ref['verbs_group_2']), ('g3', pdf_ref['verbs_group_3'])]:
    for idx, v in enumerate(v_list, 1):
        kana = v['kana']
        kanji = v['kanji']
        meaning = v['meaning']
        reading = v['reading']

        target = card_by_jp.get(kanji) or card_by_jp.get(kana)
        if target:
            # Capitalize first letter of meaning
            clean_m = meaning[0].upper() + meaning[1:] if meaning else ''
            target['meaningId'] = clean_m
            if kanji: target['kanji'] = kanji
        else:
            clean_m = meaning[0].upper() + meaning[1:] if meaning else ''
            new_id = f"verb-{g_name}-{idx:03d}"
            new_card = {
                "id": new_id,
                "category": "vocab",
                "subCategory": "kata_kerja",
                "japanese": kanji or kana,
                "kanji": kanji or kana,
                "reading": reading,
                "meaningId": clean_m,
                "level": "N5" if g_name == 'g3' or idx <= 35 else "N4",
                "notes": f"Kata Kerja Kelompok {g_name.upper()}"
            }
            vocab_list.append(new_card)
            card_by_jp[new_card['japanese']] = new_card

print(f'Total vocabComprehensive cards after PDF sync: {len(vocab_list)}')

# Re-run deduplication to guarantee 0 duplicates
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from deduplicate_all_vocab import deduplicate_vocab_file
from deep_deduplicate import run_deep_dedup

with open('src/data/vocab/vocabComprehensive.json', 'w', encoding='utf-8') as f:
    json.dump(vocab_list, f, ensure_ascii=False, indent=2)

deduplicate_vocab_file('src/data/vocab/vocabComprehensive.json')
run_deep_dedup('src/data/vocab/vocabComprehensive.json')

print('Sync & tidy completed successfully!')
