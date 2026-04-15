---
week: 8
day: 36
weekday: Monday
chapter: Chapter 3 — How Machines Learn
source_video: "Video 8: Semi-supervised and Reinforcement Learning"
post_title: "The Best of Both Worlds: Semi-Supervised Learning"
series_tag: "#AIMLSeries #Module1"
---

## Hook
Supervised learning needs every example labelled. Unsupervised learning needs none. Semi-supervised learning says: give me a few labelled examples, and I'll make sense of the rest.

## Scene 1 — The Problem It Solves
Labelling data is expensive. It requires domain expertise, takes time, and scales poorly against the volume of data modern systems produce. Supervised learning is powerful precisely because it trains on labelled examples — but acquiring enough labels to make that work is often the hardest part of the pipeline. Unsupervised learning sidesteps the problem but gives up the ability to predict specific, named outcomes. Semi-supervised learning sits between those two positions and uses the strengths of both.

## Scene 2 — The Coffee Shop Model
Think of a barista who works a shift at a new location. They're introduced briefly to a handful of regulars — a few known preferences, a few names. That's the labelled data. The rest of the customers are new faces, with no order history attached. A rigid system would treat every new face as an unknown. The semi-supervised approach uses those few known introductions to start anticipating the patterns in the unlabelled majority — inferring preferences from context, proximity, and the structure already visible in the labelled set. A small body of specific knowledge unlocks a much larger body of useful prediction.

## Scene 3 — Where the Label Goes Further
In practice, semi-supervised learning propagates label information across the unlabelled dataset using the structural relationships the model finds. Data points that cluster near a labelled example tend to inherit its label. The model doesn't just apply a label; it learns the decision boundary from the labelled examples and extends that boundary into the unlabelled space. This approach works best when the labelled and unlabelled data share the same underlying distribution — which, if the data collection process is consistent, it usually does.

## Takeaway
**Semi-supervised learning turns a small investment in labelled data into a much larger return — by letting the structure of unlabelled data do most of the generalisation work.**

## Visual Direction
Open with the coffee shop setting from Video 8: a ledger of customer orders, a handful highlighted with labels (regulars), the majority anonymous. Scene 2 animates label propagation: a few labelled points cast influence across nearby unlabelled points, which gradually take on colour. Scene 3 shows the final learned decision boundary extending through the full dataset — shaped by the few, applied to the many.
