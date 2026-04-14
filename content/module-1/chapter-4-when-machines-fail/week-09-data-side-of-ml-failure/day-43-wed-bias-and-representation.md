---
week: 9
day: 43
weekday: Wednesday
chapter: Chapter 4 — When Machines Fail
source_video: Video 9: Challenges of ML — Part I
post_title: Bias and Representation: Who Gets Left Out of the Training Set?
series_tag: "#AIMLSeries #Module1"
---

## Hook
Sampling bias from Tuesday's post looks like a data quality problem. But when the missing voices belong to specific groups of people, it stops being a technical problem and becomes an ethical one. And it starts long before the model ever runs — it starts in how the data was collected.

## Scene 1 — Representation Is Not Neutral
Every dataset reflects decisions: what to measure, who to include, how to label outcomes. When those decisions systematically exclude certain groups — or include them in distorted proportions — the model learns a skewed version of reality and applies it at scale. A model trained predominantly on data from one demographic, one geography, or one time period will perform well on inputs that look like its training set. For everyone else, it will be wrong in ways that are consistent and repeatable.

## Scene 2 — The Training Set as a Mirror
ML models don't invent biases. They amplify the biases that already exist in the data they are fed. If historical hiring decisions were discriminatory, a model trained to replicate those decisions will be discriminatory — and it will be faster and more consistent about it than any human reviewer. The model isn't malfunctioning. It's doing exactly what it was trained to do. The problem was encoded before training began.

## Scene 3 — Where This Leads (A Seed for Week 12)
The conversation about bias and representation doesn't end with data engineering. It extends into questions of accountability, transparency, and governance — who is responsible when a model that was built on biased data makes consequential decisions about people? Week 12 of this series goes there directly. For now, the critical point is this: bias in AI systems has a source, and that source is almost always the training data. Address it there, before the model trains, or you are managing consequences rather than causes.

## Takeaway
Biased training data doesn't produce broken models — it produces models that work exactly as designed, on a flawed design.

## Visual Direction
Open with a clean dataset visualised as a mosaic of tiles. As the camera zooms in, large sections of the mosaic are visibly absent — greyed out or missing entirely. Show a model trained on the incomplete mosaic making confident predictions. Then overlay the missing sections and show how different those predictions would have been. Close with a forward-looking graphic — a thin thread connecting this post to Week 12's ethics chapter — a "seed planted here" visual cue that signals this story is not finished.
