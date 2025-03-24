import pandas as pd

df = pd.read_csv("myscvPath")

TARGET_ROWS = 1000000

category_counts = df['categoryName'].value_counts()


sample_sizes = (category_counts / category_counts.sum() * TARGET_ROWS).astype(int)

sampled_df = pd.concat([
    group.sample(n=sample_sizes[cat], random_state=42)
    for cat, group in df.groupby('categoryName')
    if cat in sample_sizes
])


sampled_df = sampled_df.sample(frac=1, random_state=42).reset_index(drop=True)


sampled_df.to_csv("million.csv", index=False)
