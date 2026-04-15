---
week: 9
day: 42
weekday: Tuesday
chapter: Chapter 4 — When Machines Fail
source_video: "Video 9: Challenges of ML — Part I"
post_title: Garbage In, Garbage Out — Data Quantity, Quality, and Sampling Bias
series_tag: "#AIMLSeries #Module1"
---

## Hook
"Garbage in, garbage out" is the oldest cliché in IT. Turns out it's also the most precise description of why ML models fail in production. There are three distinct ways your data can be garbage — and conflating them is its own kind of failure.

## Scene 1 — Failure Mode 1: Not Enough Data
Accuracy in ML isn't free — it tracks directly with data volume, up to a point. Algorithms that learn from patterns need enough examples to distinguish signal from noise. A business trying to predict customer churn on six months of transaction history is like training a spam filter on 40 emails: the model will technically run, but it hasn't seen enough variation to generalise. The accuracy-versus-data-volume curve is real, and most enterprise ML projects start on the wrong end of it.

## Scene 2 — Failure Mode 2: Poor Data Quality
Volume alone doesn't save you. A dataset full of erroneous records, miscoded fields, and missing values trains the model to reproduce those errors at scale. Consider a financial institution whose customer records have inconsistent income entries and blank credit history fields — the model learns from those gaps and inconsistencies as if they were facts. Cleaning data is unglamorous, painstaking work. It's also the work that determines whether any of the algorithmic sophistication downstream means anything at all.

## Scene 3 — Failure Mode 3: Sampling Bias
The third failure mode is the most insidious because the data looks complete. It isn't — it's just consistently skewed. Take the life satisfaction versus GDP per capita example from the source material. Analyse a subset of countries and the model confidently concludes: more wealth, more happiness. Add in the countries that were excluded and the relationship becomes far more complicated. The model wasn't wrong about its training data. It was wrong about the world, because its training data didn't represent the world. That's sampling bias — and it's especially common when data is collected from one system, one region, or one customer segment.

## Scene 4 — Three Distinct Problems, Three Distinct Fixes
These three failure modes are not the same problem wearing different clothes. Insufficient volume calls for more data collection or synthetic augmentation. Quality failures call for rigorous data validation, outlier detection, and imputation strategies. Sampling bias calls for deliberate diversification of the data sources. Treating a sampling bias problem as a volume problem — just collecting more of the same skewed data — makes things worse, not better.

## Takeaway
Your ML model can only be as good as the data it trains on — and that data can fail you in three completely different ways.

## Visual Direction
Use a three-panel layout that builds sequentially. First panel: a fuel gauge near empty (insufficient volume). Second panel: a rocket filled with murky water instead of clean fuel (poor quality). Third panel: a world map with half the countries greyed out — the GDP/life satisfaction example — with two regression lines overlaid showing how the conclusion changes when the missing countries are added. Each panel should feel like a distinct diagnostic category, not variations on the same theme.
