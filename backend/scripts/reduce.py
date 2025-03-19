import pandas as pd


df = pd.read_csv("C:\\react_course\\react-project\\database_management\\dataset\\originalDataset.csv")

# Target row count
TARGET_ROWS = 120_000

# Get current category distribution
category_counts = df['categoryName'].value_counts()

# Calculate sample size for each category (preserve distribution)
sample_sizes = (category_counts / category_counts.sum() * TARGET_ROWS).astype(int)

# Sample per category
sampled_df = pd.concat([
    group.sample(n=sample_sizes[cat], random_state=42)
    for cat, group in df.groupby('categoryName')
    if cat in sample_sizes
])

# Final shuffle
sampled_df = sampled_df.sample(frac=1, random_state=42).reset_index(drop=True)

# Save to new CSV
sampled_df.to_csv("120k.csv", index=False)
