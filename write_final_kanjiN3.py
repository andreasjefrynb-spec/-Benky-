import re

# 1. Load N5/N4 kanji set
with open('src/data/kanjiData.ts', 'r', encoding='utf-8') as f:
    text_all = f.read()

n5n4_block = text_all[:text_all.find('export const kanjiData')]
existing_n5n4 = set(re.findall(r'\"japanese\":\s*\"(.*?)\"', n5n4_block))
print(f"N5/N4 kanji set count: {len(existing_n5n4)}")

# 2. Read existing kanjiN3Data.ts and parse existing array elements
with open('src/data/kanjiN3Data.ts', 'r', encoding='utf-8') as f:
    text_n3 = f.read()

# Find array body between `export const kanjiN3Data: KanjiCard[] = [` and ending `];`
start_idx = text_n3.find('export const kanjiN3Data: KanjiCard[] = [')
end_idx = text_n3.rfind('];')

header = text_n3[:start_idx] + 'export const kanjiN3Data: KanjiCard[] = [\n'

# Get existing raw entries from text_n3
# We can import `unique_added` list from build_full_kanji_file.py
import build_full_kanji_file as bfk

seen_kanji = set(existing_n5n4)
existing_n3_entries = []

# Parse existing items in text_n3
pattern = r'\{\s*id:\s*\'(.*?)\',\s*japanese:\s*\'(.*?)\',\s*subCategory:\s*\'(.*?)\',\s*reading:\s*\'(.*?)\',\s*onyomi:\s*\'(.*?)\',\s*kunyomi:\s*\'(.*?)\',\s*meaning:\s*\'(.*?)\',\s*mnemonic:\s*\'(.*?)\',\s*exampleJp:\s*\'(.*?)\',\s*exampleId:\s*\'(.*?)\',\s*strokeCount:\s*(\d+),\s*jlpt:\s*\'N3\'\s*\}'

matches = re.findall(pattern, text_n3)
print(f"Parsed {len(matches)} existing entries from kanjiN3Data.ts")

unique_n3_entries = []
for m in matches:
    kid, jp, subcat, read, ony, kun, mean, mnem, exJp, exId, strk = m
    if jp not in seen_kanji:
        seen_kanji.add(jp)
        unique_n3_entries.append((kid, jp, subcat, read, ony, kun, mean, mnem, exJp, exId, int(strk)))

print(f"Unique existing N3 entries: {len(unique_n3_entries)}")

needed_new_count = 650 - len(existing_n5n4) - len(unique_n3_entries)
print(f"Needed new entries to reach 650 total: {needed_new_count}")

# Add new unique entries from bfk.unique_added
added_count = 0
cur_id_num = 300
for (jp, subcat, read, ony, kun, mean, mnem, exJp, exId, strk) in bfk.unique_added:
    if added_count >= needed_new_count:
        break
    if jp not in seen_kanji:
        seen_kanji.add(jp)
        kid = f"n3_k_{cur_id_num}"
        cur_id_num += 1
        unique_n3_entries.append((kid, jp, subcat, read, ony, kun, mean, mnem, exJp, exId, strk))
        added_count += 1

print(f"Total N3 entries now: {len(unique_n3_entries)}")
print(f"Total overall unique kanji count: {len(seen_kanji)}")

# Now generate file content
out_lines = []
out_lines.append(header)

for entry in unique_n3_entries:
    kid, jp, subcat, read, ony, kun, mean, mnem, exJp, exId, strk = entry
    # Escape quotes if needed
    mnem_esc = mnem.replace("'", "\\'")
    exJp_esc = exJp.replace("'", "\\'")
    exId_esc = exId.replace("'", "\\'")
    mean_esc = mean.replace("'", "\\'")
    read_esc = read.replace("'", "\\'")
    ony_esc = ony.replace("'", "\\'")
    kun_esc = kun.replace("'", "\\'")
    
    line = f"  {{ id: '{kid}', japanese: '{jp}', subCategory: '{subcat}', reading: '{read_esc}', onyomi: '{ony_esc}', kunyomi: '{kun_esc}', meaning: '{mean_esc}', mnemonic: '{mnem_esc}', exampleJp: '{exJp_esc}', exampleId: '{exId_esc}', strokeCount: {strk}, jlpt: 'N3' }},"
    out_lines.append(line)

out_lines.append("];\n")

full_content = "\n".join(out_lines)

with open('src/data/kanjiN3Data.ts', 'w', encoding='utf-8') as f:
    f.write(full_content)

print("Successfully wrote src/data/kanjiN3Data.ts!")

