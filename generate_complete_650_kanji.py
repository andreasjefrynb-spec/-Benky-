import re

# 1. Read existing kanjiData.ts (N5/N4)
with open('src/data/kanjiData.ts', 'r', encoding='utf-8') as f:
    text_all = f.read()

n5n4_block = text_all[:text_all.find('export const kanjiData')]
existing_n5n4 = set(re.findall(r'\"japanese\":\s*\"(.*?)\"', n5n4_block))

print(f"Existing N5/N4 kanji count: {len(existing_n5n4)}")

# 2. Read existing kanjiN3Data.ts
with open('src/data/kanjiN3Data.ts', 'r', encoding='utf-8') as f:
    text_n3 = f.read()

# Extract existing objects in kanjiN3Data.ts
# Let's see all Japanese chars in kanjiN3Data.ts currently
existing_n3_chars = set(re.findall(r'japanese:\s*\'(.*?)\'', text_n3))
print(f"Existing N3 kanji count: {len(existing_n3_chars)}")

seen = set(existing_n5n4).union(existing_n3_chars)
print(f"Total current unique kanji: {len(seen)}")

# Target unique count: 650. Target N3 count: 650 - 222 = 428 N3 kanji.
needed_n3 = 650 - len(existing_n5n4)
needed_new = needed_n3 - len(existing_n3_chars)
print(f"Need {needed_new} NEW unique N3 kanji entries!")

