---
week: 3
day: 14
weekday: Thursday
chapter: Chapter 2 — What We Built
source_video: "Video 4: Introduction to Machine Learning"
post_title: The ML Learning Cycle, Explained
series_tag: "#AIMLSeries #Module1"
---

## Hook
Machine learning isn't a one-time deployment — it's a cycle. Understanding the loop is what separates people who use ML from people who can reason about it.

## Scene 1 — Step One: Study the Problem
The cycle starts before any code runs. Before training a model, you have to understand what you're asking it to learn. What is the outcome you want to predict? What data captures the patterns that lead to that outcome? This is the problem definition phase — and getting it wrong here means no amount of subsequent training will produce a useful model.

## Scene 2 — Step Two: Train on Data
Once the problem is defined, the algorithm is given labelled examples and tasked with finding the underlying pattern. This is training. The algorithm iterates across the dataset, adjusting its internal parameters each time it makes an error, until its predictions get reliably close to the correct answers. Tom Mitchell's 1997 definition captures this precisely: performance on a given task improves with experience — and training is where that experience is accumulated.

## Scene 3 — Step Three: Launch, Observe, and Refine
Training doesn't end at deployment — it restarts. Once a model runs against real data, its outputs can be checked against actual outcomes. Where the model was wrong, those errors become new training examples. The algorithm adjusts. Performance improves. This iterative feedback loop is what makes ML systems self-improving over time rather than static after release. It's less like shipping software and more like running a continuously updated service.

## Takeaway
The ML learning cycle — study, train, deploy, observe, refine — is not a pipeline you run once; it's the ongoing operating model for any system built on machine learning.

## Visual Direction
Show the four-step cycle as a circular diagram with clockwise rotation: Study → Train → Launch & Observe → Refine. Animate each step appearing in sequence, then show the full loop completing. On the second rotation, show the model's accuracy metric improving as the cycle repeats. Keep it clean — four nodes, directional arrows, a simple performance bar that rises with each pass. This post is about the mechanism, so the visual should reinforce the looping structure, not distract from it.
