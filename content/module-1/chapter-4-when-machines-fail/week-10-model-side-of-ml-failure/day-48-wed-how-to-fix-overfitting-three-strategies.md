---
week: 10
day: 48
weekday: Wednesday
chapter: Chapter 4 — When Machines Fail
source_video: "Video 10: Challenges of ML — Part II"
post_title: "How to Fix Overfitting: Three Strategies That Actually Work"
series_tag: "#AIMLSeries #Module1"
---

## Hook
You've diagnosed overfitting. Your model performs beautifully on training data and falls apart on anything new. There are exactly three things you can do about it — and only one of them involves the model itself.

## Scene 1 — Strategy 1: Simplify the Model
The most direct response to overfitting is reducing model complexity. If the model has too many parameters chasing too many variables, strip it back. Focus on the features with the strongest genuine relationship to the outcome and remove the ones that are contributing noise rather than signal. Regularisation techniques apply a mathematical penalty to complexity — they make the model "pay" for each additional parameter it uses, which encourages it to achieve accuracy with fewer, more meaningful variables. The result is a model that doesn't chase every historical quirk and is therefore more stable when the future doesn't look exactly like the past.

## Scene 2 — Strategy 2: Enrich the Dataset
A model overfits partly because it has seen too few examples relative to its complexity — there isn't enough data variety to force it to generalise. More data, specifically more varied data, gives the model a broader set of experiences to learn from. When the training set includes a wider range of scenarios, edge cases, and conditions, the model is less likely to over-index on any single pattern. This is not the same as the data volume failure from Week 9 — enrichment here means diversity of examples, not just more rows of the same thing.

## Scene 3 — Strategy 3: Clean the Noise
Not all data problems are about missing values or sampling bias. Some data is present, correctly collected, and still wrong — outliers from data entry errors, anomalous events that distort the pattern, or records that don't belong to the population being modelled. When a model is trained on noisy data, it learns to predict the noise. Cleaning those records before training — removing or correcting the misleading data points — gives the model a cleaner signal to work from. The model ends up more accurate on real-world inputs because it was trained on data that actually represented the real world.

## Takeaway
Overfitting has three remedies: cut the model's complexity, give it more varied data to learn from, and remove the noise it was learning from instead of signal.

## Visual Direction
Three sequential reveals, each with a distinct visual metaphor from the source material's kitchen analogy. First: a chef reducing an overcrowded dish to its essential ingredients — model simplification. Second: more taste-testers providing diverse feedback — dataset enrichment. Third: a quality check discarding spoiled ingredients before they go into the pot — data cleaning. Each reveal should feel like a distinct intervention, not a variation. Close with all three levers visible together, each contributing to a well-fitted model on the right side of the frame.
