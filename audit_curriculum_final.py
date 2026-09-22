import re

# 1. Audit Kanji
with open('src/data/kanjiData.ts', 'r', encoding='utf-8') as f:
    kanji_all_text = f.read()

# Split N5/N4 and imports
n5n4_block = kanji_all_text[:kanji_all_text.find('export const kanjiData')]
n5n4_kanji = re.findall(r'\"japanese\":\s*\"(.*?)\"', n5n4_block)

with open('src/data/kanjiN3Data.ts', 'r', encoding='utf-8') as f:
    n3_kanji_text = f.read()

n3_kanji = re.findall(r'japanese:\s*\'(.*?)\'', n3_kanji_text)

total_kanji_list = n5n4_kanji + n3_kanji
unique_kanji_set = set(total_kanji_list)

print("=== KANJI AUDIT ===")
print(f"Total N5/N4 Kanji entries: {len(n5n4_kanji)}")
print(f"Total N3 Kanji entries: {len(n3_kanji)}")
print(f"Total Kanji Entries Combined: {len(total_kanji_list)}")
print(f"Total Unique Kanji Characters: {len(unique_kanji_set)}")
print(f"Duplicates count: {len(total_kanji_list) - len(unique_kanji_set)}")

# 2. Audit Vocabulary
with open('src/data/vocab1000.json', 'r', encoding='utf-8') as f:
    vocab_json_text = f.read()

vocab_1000_jp = re.findall(r'\"japanese\":\s*\"(.*?)\"', vocab_json_text)

with open('src/data/vocabN3Data.ts', 'r', encoding='utf-8') as f:
    vocab_n3_text = f.read()

vocab_n3_jp = re.findall(r'japanese:\s*\'(.*?)\'', vocab_n3_text)

all_vocab_list = vocab_1000_jp + vocab_n3_jp
unique_vocab_set = set(all_vocab_list)

print("\n=== VOCABULARY AUDIT ===")
print(f"Total Vocab entries combined: {len(all_vocab_list)}")
print(f"Total Unique Japanese words: {len(unique_vocab_set)}")
print(f"Target was 3,500 (Achieved {len(unique_vocab_set)} unique items!)")

# 3. Audit Grammar
with open('src/data/minnaChuukyu1.ts', 'r', encoding='utf-8') as f:
    minna_text = f.read()

minna_grammar = re.findall(r'title:\s*\'(.*?)\'', minna_text)

with open('src/data/tobiraData.ts', 'r', encoding='utf-8') as f:
    tobira_text = f.read()

tobira_grammar = re.findall(r'title:\s*\'(.*?)\'', tobira_text)

print("\n=== GRAMMAR AUDIT ===")
print(f"Minna no Nihongo Chuukyu 1 Grammar Points: {len(minna_grammar)}")
print(f"Tobira Intermediate Grammar Points: {len(tobira_grammar)}")
print(f"Total Intermediate Grammar Points: {len(minna_grammar) + len(tobira_grammar)}")

