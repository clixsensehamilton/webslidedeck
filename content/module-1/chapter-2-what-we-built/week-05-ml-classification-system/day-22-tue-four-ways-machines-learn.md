---
week: 5
day: 22
weekday: Tuesday
chapter: Chapter 2 — What We Built
source_video: Video 5: Types of ML Systems
post_title: Four Ways Machines Learn — and When to Use Each One
series_tag: "#AIMLSeries #Module1"
---

## Hook
The supervision axis from Monday's framework breaks into four distinct approaches. They differ not just in technique but in what data they require, what problems they can solve, and what they cost to operate.

## Scene 1 — Supervised Learning: Learning from Labelled Examples
In supervised learning, every training example comes with the correct answer attached. The algorithm learns by comparing its predictions to those labels and adjusting until it gets reliably close. The catch: labelling is expensive. Every example in a supervised training set required a human to look at it and annotate it correctly. Fraud or not fraud. Spam or not spam. High risk or low risk. The quality of the labels directly determines the quality of the model — and labelling at scale is non-trivial.

## Scene 2 — Unsupervised Learning: Finding Structure Without Labels
Unsupervised learning works without any predefined right answers. The algorithm receives unlabelled data and finds structure in it autonomously — grouping similar items into clusters, identifying patterns that weren't explicitly searched for. A retail system discovering customer segments based on purchase behaviour, without anyone defining what those segments should look like in advance, is unsupervised learning. The trade-off: you don't control what structure the model finds, and interpreting the results requires domain judgment.

## Scene 3 — Semi-Supervised Learning: Getting More from Less
Semi-supervised learning combines a small set of labelled examples with a much larger pool of unlabelled data. The labelled examples anchor the learning; the unlabelled data fills in the generalisation. This is practically relevant whenever labelling the full dataset is cost-prohibitive but some ground truth is available. The model uses what it knows precisely to make sense of what it doesn't.

## Scene 4 — Reinforcement Learning: Learning Through Consequence
Reinforcement learning doesn't learn from a dataset at all — it learns from interaction. An agent takes actions in an environment, receives rewards for outcomes that move toward a goal and penalties for those that don't, and adjusts its strategy over time. The model gets smarter by trying things, failing, and recalibrating. Game-playing systems and adaptive control problems are the canonical RL applications — domains where the right action depends heavily on context and sequence.

## Takeaway
Supervised, unsupervised, semi-supervised, and reinforcement learning each answer the data question differently — the right choice depends on what labelled data you have and what kind of problem you're solving.

## Visual Direction
Four quadrant layout, one per learning type. Each quadrant uses a simple visual metaphor: supervised = labelled boxes with ticks; unsupervised = unlabelled dots forming clusters; semi-supervised = a few labelled dots surrounded by many unlabelled ones; reinforcement = an agent in a maze collecting reward tokens. Animate each quadrant appearing in sequence, building the full four-panel view. No text-heavy explanations in the visual — the metaphors carry the meaning.
