---
week: 5
day: 24
weekday: Thursday
chapter: Chapter 2 — What We Built
source_video: "Video 5: Types of ML Systems"
post_title: "Instance-Based vs. Model-Based: Two Ways Machines Generalise"
series_tag: "#AIMLSeries #Module1"
---

## Hook
When an ML system encounters something it's never seen before, it has two fundamentally different strategies for producing an answer. Which strategy it uses determines how it performs under pressure.

## Scene 1 — Instance-Based Learning: The Lookup Approach
Instance-based learning works by comparison. When a new input arrives, the system searches its stored training examples for the closest matches and bases its prediction on those. No abstract generalisation happens during training — the model stores the examples themselves and computes similarity at prediction time. Think of it as bespoke investment advice: each client's situation is evaluated by comparing it to the most similar portfolios the analyst has worked with before. The quality of the prediction depends on the quality and coverage of the stored examples.

## Scene 2 — Model-Based Learning: The Generalisation Approach
Model-based learning takes a different path. During training, the algorithm processes the data and builds an internal representation — a function, a set of parameters, a structure — that captures the underlying patterns. When a new input arrives, the model applies that function rather than searching past examples. It's not looking anything up; it's generating a prediction from a generalised rule it constructed during training. The financial analogy: instead of comparing each client to past portfolios, the forecaster has built a general model of how markets move and applies it to new conditions.

## Scene 3 — The Practical Difference
Instance-based systems are flexible and interpretable — you can always point to the specific past examples that drove a given prediction. But they're computationally expensive at scale, because every prediction requires searching the stored dataset, and they struggle with inputs that fall far outside the training distribution. Model-based systems are faster at prediction time and generalise more smoothly across novel inputs, but the internal function can be difficult to inspect or explain. The right choice depends on dataset size, prediction frequency, explainability requirements, and how far your real-world inputs are likely to stray from your training data.

## Takeaway
Instance-based learning answers "what's the most similar thing I've seen?" — model-based learning answers "what does my generalised understanding of the world predict?" — both are valid, and the right choice depends on the operational context.

## Visual Direction
Show the same prediction task from two angles. Left panel (instance-based): a new data point arriving, a search arc sweeping across stored examples, the closest matches highlighted, a prediction derived from them — like a lookup with visible references. Right panel (model-based): a new data point arriving, passing through a trained function represented as a curve or grid, an output emerging directly — clean, no lookup required. Animate both predictions arriving at the same answer from different routes. The mechanism contrast is the message.
