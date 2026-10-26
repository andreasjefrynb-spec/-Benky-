import json
import re

def clean_str(s):
    if not s:
        return ''
    return str(s).strip()

def has_kanji(text):
    return any('\u4e00' <= char <= '\u9fff' for char in text)

def norm_reading(r):
    r = re.sub(r'[\(\[\{＜\<（].*?[\)\]\}＞\>）]', '', r or '').strip().lower()
    r = re.sub(r'[/／〜~～・\s+]', '', r)
    r = re.sub(r'na$', '', r)
    r = re.sub(r'suru$', '', r)
    r = re.sub(r'masu$', '', r)
    r = re.sub(r'mashita$', '', r)
    r = re.sub(r'masen$', '', r)
    return r

def norm_meaning(m):
    m = re.sub(r'[\(\[\{＜\<（].*?[\)\]\}＞\>）]', '', m or '').strip().lower()
    m = re.sub(r'[/／〜~～・,\s+]', '', m)
    return m

def run_deep_dedup(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        cards = json.load(f)

    print(f'Starting deep dedup on {file_path}, initial cards: {len(cards)}')

    # Specific manual corrections for mistranslations / misplaced kanji
    for c in cards:
        if c.get('japanese') == '切る' and 'memakai' in c.get('meaningId', '').lower():
            c['meaningId'] = 'Memotong / Menggunting (benda/kertas/tali)'
        if c.get('japanese') == 'きけん' and c.get('kanji') == '安全':
            c['kanji'] = '危険'
        if c.get('japanese') == 'しんせつ' and c.get('kanji') == '有名（な）':
            c['kanji'] = '親切'
        if c.get('japanese') == 'べんり' and c.get('kanji') == '暇（な）':
            c['kanji'] = '便利'
        if c.get('japanese') == 'だいじょうぶ' and c.get('kanji') == '大切':
            c['kanji'] = '大丈夫'

    # Pass 1: Merge cards with same reading AND same core meaning
    reading_groups = {}
    for c in cards:
        nr = norm_reading(c.get('reading', ''))
        if nr:
            reading_groups.setdefault(nr, []).append(c)
        else:
            reading_groups.setdefault(f"_id_{c['id']}", []).append(c)

    merged_cards = []
    removed = 0

    for nr, clist in reading_groups.items():
        if len(clist) == 1:
            merged_cards.append(clist[0])
            continue

        # Sub-cluster by meaning similarity
        sub_groups = {}
        for c in clist:
            nm = norm_meaning(c.get('meaningId', ''))
            matched_key = None
            for k in sub_groups.keys():
                # Check if same or strong substring overlap
                if k == nm:
                    matched_key = k
                    break
                if len(k) >= 3 and len(nm) >= 3:
                    if k in nm or nm in k or (len(k) >= 4 and len(nm) >= 4 and k[:4] == nm[:4]):
                        matched_key = k
                        break
            if matched_key:
                sub_groups[matched_key].append(c)
            else:
                sub_groups[nm] = [c]

        for k, s_list in sub_groups.items():
            if len(s_list) == 1:
                merged_cards.append(s_list[0])
                continue

            # Merge cluster
            removed += (len(s_list) - 1)
            
            def score(card):
                sc = 0
                jp = card.get('japanese', '')
                kanji = card.get('kanji', '')
                if has_kanji(jp): sc += 100
                if has_kanji(kanji): sc += 50
                if card.get('exampleJp'): sc += 30
                if card.get('mnemonic'): sc += 20
                if card.get('level') in ['N5', 'N4', 'N3']: sc += 10
                return sc

            s_list.sort(key=score, reverse=True)
            best = s_list[0]

            # Collect best meanings
            all_m = [c.get('meaningId', '').strip() for c in s_list if c.get('meaningId', '').strip()]
            all_m.sort(key=lambda x: len(x), reverse=True)
            if all_m:
                best['meaningId'] = all_m[0]

            for c in s_list:
                if not best.get('kanji') and c.get('kanji'):
                    best['kanji'] = c['kanji']
                if not best.get('exampleJp') and c.get('exampleJp'):
                    best['exampleJp'] = c['exampleJp']
                    best['exampleId'] = c.get('exampleId', '')
                if not best.get('mnemonic') and c.get('mnemonic'):
                    best['mnemonic'] = c['mnemonic']
                if not best.get('furigana') and c.get('furigana'):
                    best['furigana'] = c['furigana']

            # If best is pure kana but another card had kanji in Japanese/kanji, upgrade best
            for c in s_list:
                if not has_kanji(best.get('japanese', '')) and has_kanji(c.get('japanese', '')):
                    best['japanese'] = c['japanese']
                if not best.get('kanji') and has_kanji(c.get('kanji', '')):
                    best['kanji'] = c['kanji']

            merged_cards.append(best)

    print(f'After pass 1, total cards: {len(merged_cards)} (removed {removed})')

    # Pass 2: Clean remaining artificial tags
    for c in merged_cards:
        m = c.get('meaningId', '')
        m = re.sub(r'\(tulisan hiragana.*?\)', '', m, flags=re.IGNORECASE)
        m = re.sub(r'\(kanji dasar.*?\)', '', m, flags=re.IGNORECASE)
        m = re.sub(r'\(gabungan variasi.*?\)', '', m, flags=re.IGNORECASE)
        m = re.sub(r'\(varian \d+\)', '', m, flags=re.IGNORECASE)
        m = re.sub(r'\s+', ' ', m).strip()
        c['meaningId'] = m

    # Save
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(merged_cards, f, ensure_ascii=False, indent=2)
    print(f'Successfully wrote {file_path}!')

if __name__ == '__main__':
    run_deep_dedup('src/data/vocab/vocabComprehensive.json')
