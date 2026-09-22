import re

# Read current kanjiData.ts
with open('src/data/kanjiData.ts', 'r', encoding='utf-8') as f:
    text_all = f.read()

# Get all existing Japanese characters in kanjiData.ts (N5/N4 part)
# kanjiN5N4Data is from line 7 to line 3338
n5n4_block = text_all[:text_all.find('export const kanjiData')]
matches = re.findall(r'\"japanese\":\s*\"(.*?)\"', n5n4_block)
existing_n5n4 = set(m.strip() for m in matches if len(m.strip()) == 1)

print(f"N5/N4 Kanji count in kanjiData.ts: {len(existing_n5n4)}")

# We need 650 - 222 = 428 N3 Kanji in kanjiN3Data.ts!
# Let's read current kanjiN3Data.ts to keep its high quality items
with open('src/data/kanjiN3Data.ts', 'r', encoding='utf-8') as f:
    text_n3 = f.read()

# Extract objects from kanjiN3Data.ts
n3_kanji_chars = re.findall(r'japanese:\s*\'(.*?)\'', text_n3)
print(f"Current N3 Kanji count in kanjiN3Data.ts: {len(set(n3_kanji_chars))}")

