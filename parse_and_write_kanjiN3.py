import re

# Read existing kanjiN3Data.ts
with open('src/data/kanjiN3Data.ts', 'r', encoding='utf-8') as f:
    text_n3 = f.read()

# Load N5/N4 kanji set
with open('src/data/kanjiData.ts', 'r', encoding='utf-8') as f:
    text_all = f.read()

n5n4_block = text_all[:text_all.find('export const kanjiData')]
existing_n5n4 = set(re.findall(r'\"japanese\":\s*\"(.*?)\"', n5n4_block))
print(f"N5/N4 kanji set count: {len(existing_n5n4)}")

import build_full_kanji_file as bfk

seen_kanji = set(existing_n5n4)

# Create 428 unique N3 kanji entries
# Target total N3 kanji = 650 - 222 = 428
unique_n3_list = []
cur_id = 1

for (jp, subcat, read, ony, kun, mean, mnem, exJp, exId, strk) in bfk.unique_added:
    if jp not in seen_kanji:
        seen_kanji.add(jp)
        kid = f"n3_k_{cur_id}"
        cur_id += 1
        unique_n3_list.append((kid, jp, subcat, read, ony, kun, mean, mnem, exJp, exId, strk))

print(f"Total unique N3 items gathered: {len(unique_n3_list)}")
print(f"Total unique Kanji overall: {len(seen_kanji)}")

# Write to file
file_header = """import { KanjiCard } from '../types';

export const kanjiN3Data: KanjiCard[] = [
"""

lines = [file_header]
for entry in unique_n3_list:
    kid, jp, subcat, read, ony, kun, mean, mnem, exJp, exId, strk = entry
    mnem_esc = mnem.replace("'", "\\'")
    exJp_esc = exJp.replace("'", "\\'")
    exId_esc = exId.replace("'", "\\'")
    mean_esc = mean.replace("'", "\\'")
    read_esc = read.replace("'", "\\'")
    ony_esc = ony.replace("'", "\\'")
    kun_esc = kun.replace("'", "\\'")
    
    line = f"  {{ id: '{kid}', japanese: '{jp}', subCategory: '{subcat}', reading: '{read_esc}', onyomi: '{ony_esc}', kunyomi: '{kun_esc}', meaning: '{mean_esc}', mnemonic: '{mnem_esc}', exampleJp: '{exJp_esc}', exampleId: '{exId_esc}', strokeCount: {strk}, jlpt: 'N3' }},"
    lines.append(line)

lines.append("];\n")

with open('src/data/kanjiN3Data.ts', 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))

print("Successfully wrote kanjiN3Data.ts!")
