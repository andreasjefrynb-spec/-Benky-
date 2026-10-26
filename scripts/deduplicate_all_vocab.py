import json
import re

def clean_str(s):
    if not s:
        return ''
    return str(s).strip()

def has_kanji(text):
    return any('\u4e00' <= char <= '\u9fff' for char in text)

def normalize_jp_core(card):
    jp = clean_str(card.get('japanese', ''))
    kanji = clean_str(card.get('kanji', ''))
    
    # Preferred base: Kanji if available, else Japanese
    base = kanji if (kanji and has_kanji(kanji)) else jp
    
    # Strip brackets, parentheses, tildes, slashes
    base = re.sub(r'[（\(\[\{＜\<].*?[）\)\]\}＞\>]', '', base)
    base = re.sub(r'[/／〜~～・]', '', base)
    base = re.sub(r'\s+', '', base)
    
    # Strip na-adjective suffix
    base = re.sub(r'な$', '', base)
    # Strip polite verb endings if standard verb
    base = re.sub(r'ます$', '', base)
    base = re.sub(r'ました$', '', base)
    base = re.sub(r'ません$', '', base)
    base = re.sub(r'する$', '', base)
    
    return base

def normalize_reading_core(card):
    r = clean_str(card.get('reading', ''))
    # Strip parentheses and content like (na), (o), (ni)
    r = re.sub(r'[（\(\[\{＜\<].*?[）\)\]\}＞\>]', '', r)
    r = re.sub(r'[/／〜~～・]', '', r)
    r = re.sub(r'\s+', '', r).lower()
    
    # Strip suffixes
    r = re.sub(r'na$', '', r)
    r = re.sub(r'masu$', '', r)
    r = re.sub(r'mashita$', '', r)
    r = re.sub(r'masen$', '', r)
    r = re.sub(r'suru$', '', r)
    
    return r

def clean_meaning(m):
    if not m:
        return ''
    # Strip artificial disambiguation markers
    m = re.sub(r'\(tulisan hiragana.*?\)', '', m, flags=re.IGNORECASE)
    m = re.sub(r'\(kanji dasar.*?\)', '', m, flags=re.IGNORECASE)
    m = re.sub(r'\(gabungan variasi.*?\)', '', m, flags=re.IGNORECASE)
    m = re.sub(r'\(varian \d+\)', '', m, flags=re.IGNORECASE)
    m = re.sub(r'\(bentuk ~masu.*?\)', '', m, flags=re.IGNORECASE)
    m = re.sub(r'\(bentuk kamus.*?\)', '', m, flags=re.IGNORECASE)
    m = re.sub(r'\s+', ' ', m).strip()
    return m

def deduplicate_vocab_file(file_path):
    print(f'Processing {file_path}...')
    with open(file_path, 'r', encoding='utf-8') as f:
        cards = json.load(f)

    total_orig = len(cards)
    print(f'Original count: {total_orig}')

    # Group cards by normalized identity
    # Identity key: (core_jp, core_reading)
    groups = {}
    for c in cards:
        core_jp = normalize_jp_core(c)
        core_read = normalize_reading_core(c)
        
        # If no kanji, core_jp might be kana; if so, core_read is the phonetic anchor
        if core_jp and has_kanji(core_jp):
            key = (core_jp, core_read)
        elif core_read:
            key = (core_read,)
        else:
            key = (core_jp,)

        groups.setdefault(key, []).append(c)

    deduped_cards = []
    removed_count = 0

    for key, clist in groups.items():
        if len(clist) == 1:
            c = clist[0]
            c['meaningId'] = clean_meaning(c.get('meaningId', ''))
            deduped_cards.append(c)
            continue

        # Multiple cards for the same word! Merge into one canonical best card
        removed_count += (len(clist) - 1)

        # 1. Choose primary card: prefer the one with kanji and rich example sentences
        def card_score(card):
            score = 0
            jp = card.get('japanese', '')
            kanji = card.get('kanji', '')
            if has_kanji(jp) or has_kanji(kanji):
                score += 100
            if card.get('exampleJp') and card.get('exampleId'):
                score += 50
            if card.get('mnemonic'):
                score += 20
            if card.get('level') in ['N5', 'N4', 'N3']:
                score += 10
            # Prefer dictionary form over ~masu if both exist
            if not jp.endswith('ます') and not jp.endswith('ました'):
                score += 15
            # Prefer clean formatted adjective like 複雑（な） or 複雑な
            if '（な）' in jp or 'な' in jp:
                score += 5
            return score

        clist.sort(key=card_score, reverse=True)
        best = clist[0]

        # Merge fields from other cards in the group if missing in best
        all_meanings = []
        for c in clist:
            m = clean_meaning(c.get('meaningId', ''))
            if m and m not in all_meanings:
                all_meanings.append(m)

        # Best meaning: longest and most comprehensive
        if all_meanings:
            all_meanings.sort(key=lambda x: len(x), reverse=True)
            best['meaningId'] = all_meanings[0]

        # Merge kanji if best didn't have it
        for c in clist:
            if not best.get('kanji') and c.get('kanji'):
                best['kanji'] = c['kanji']
            if not best.get('exampleJp') and c.get('exampleJp'):
                best['exampleJp'] = c['exampleJp']
                best['exampleId'] = c.get('exampleId', '')
            if not best.get('mnemonic') and c.get('mnemonic'):
                best['mnemonic'] = c['mnemonic']
            if not best.get('furigana') and c.get('furigana'):
                best['furigana'] = c['furigana']

        # Ensure na-adjectives have clear Japanese & Kanji representation
        # If any card had 'na' or '（な）', format cleanly
        is_na_adj = any(
            'な' in c.get('japanese', '') or
            'na' in c.get('reading', '').lower() or
            (c.get('kanji') and 'な' in c.get('kanji', ''))
            for c in clist
        ) and not best.get('japanese', '').endswith('い')

        if is_na_adj:
            base_k = normalize_jp_core(best)
            if has_kanji(base_k):
                best['kanji'] = base_k
                if not best.get('japanese', '').endswith('な') and not '（な）' in best.get('japanese', ''):
                    best['japanese'] = f'{base_k}（な）'
            if not 'na' in best.get('reading', '').lower():
                r_val = best.get('reading', '')
                best['reading'] = f'{r_val} (na)'.strip()

        deduped_cards.append(best)

    print(f'Deduped count: {len(deduped_cards)} (Removed {removed_count} duplicates)')

    # Save to file
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(deduped_cards, f, ensure_ascii=False, indent=2)

    print(f'Saved {file_path} successfully!')
    return deduped_cards

if __name__ == '__main__':
    deduplicate_vocab_file('src/data/vocab/vocabComprehensive.json')
