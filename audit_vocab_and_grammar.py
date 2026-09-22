import re

# Read minnaShokyu1, minnaShokyu2, vocabN3Data, vocabNativeData, irodoriData
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
    jps = re.findall(r'japanese:\s*\'(.*?)\'', content)
    total_vocab.extend(jps)

unique_vocab = set(total_vocab)

print("=== VOCABULARY AUDIT ===")
print(f"Total Vocab Items across N5-N3 files: {len(total_vocab)}")
print(f"Unique Vocabulary Words: {len(unique_vocab)}")

# Read Grammar files
grammar_files = [
    'src/data/minnaChuukyu1.ts',
    'src/data/tobiraData.ts',
    'src/data/shinKanzenData.ts',
    'src/data/souMatomeData.ts',
    'src/data/tryJlptData.ts',
    'src/data/quartetData.ts'
]

total_grammar = []
for gf in grammar_files:
    with open(gf, 'r', encoding='utf-8') as f:
        content = f.read()
    titles = re.findall(r'title:\s*\'(.*?)\'', content)
    total_grammar.extend(titles)

unique_grammar = set(total_grammar)

print("\n=== INTERMEDIATE GRAMMAR AUDIT ===")
print(f"Total Intermediate Grammar Points across N3 modules: {len(total_grammar)}")
print(f"Unique Intermediate Grammar Points: {len(unique_grammar)}")

