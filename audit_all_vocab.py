import re

vocab_files = [
    'src/data/minnaShokyu1.ts',
    'src/data/minnaShokyu2.ts',
    'src/data/vocabN3Data.ts',
    'src/data/vocabNativeData.ts',
    'src/data/irodoriData.ts',
    'src/data/sswData.ts'
]

total_vocab = []
for vf in vocab_files:
    with open(vf, 'r', encoding='utf-8') as f:
        content = f.read()
    # match japanese: "..." or japanese: '...' or "japanese": "..."
    jps = re.findall(r'[\"\']?japanese[\"\']?:\s*[\"\'](.*?)[\"\']', content)
    total_vocab.extend(jps)

unique_vocab = set(total_vocab)

print("=== VOCABULARY AUDIT (PROPER REGEX) ===")
print(f"Total Raw Vocab Items: {len(total_vocab)}")
print(f"Unique Vocabulary Words: {len(unique_vocab)}")

