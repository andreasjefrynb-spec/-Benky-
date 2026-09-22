import re

# 1. Read N5/N4 kanji set
with open('src/data/kanjiData.ts', 'r', encoding='utf-8') as f:
    text_all = f.read()

n5n4_block = text_all[:text_all.find('export const kanjiData')]
existing_n5n4 = set(re.findall(r'\"japanese\":\s*\"(.*?)\"', n5n4_block))
print(f"N5/N4 unique Kanji count: {len(existing_n5n4)}")

# 2. Read N3 kanji set
with open('src/data/kanjiN3Data.ts', 'r', encoding='utf-8') as f:
    text_n3 = f.read()

existing_n3 = set(re.findall(r'japanese:\s*\'(.*?)\'', text_n3))
print(f"N3 unique Kanji count in file: {len(existing_n3)}")

all_unique = existing_n5n4.union(existing_n3)
print(f"Total current unique Kanji across N5/N4/N3: {len(all_unique)}")
print(f"Remaining needed to hit exactly 650: {650 - len(all_unique)}")

