---
week: 9
day: 45
weekday: Friday
chapter: Chapter 4 — When Machines Fail
source_video: "Video 9: Challenges of ML — Part I"
post_title: "What This Means for IT: Your Data Pipeline Shapes What the Model Knows"
series_tag: "#AIMLSeries #Module1"
---

## Hook
Data scientists build models. IT teams build the pipelines that feed them. That division of labour sounds clean — until you realise that every decision made in the pipeline determines the boundaries of what the model can ever know.

## Scene 1 — The Pipeline Is Not Neutral Infrastructure
The data pipeline is not a passive conduit. Every schema decision, every ingestion rule, every transformation applied before data reaches a model training job is a decision about what reality the model gets to see. If your pipeline drops null values silently, the model learns from a world where those values never existed. If your collection process over-represents certain users or time windows, the model learns a skewed version of normal. These aren't ML problems — they are data engineering decisions with ML consequences.

## Scene 2 — IT's Accountability in the ML Stack
Volume, quality, and representation — the three failure modes from this week — all have roots in systems IT owns. Storage and ingestion determine volume. Data validation and schema enforcement determine quality. Source selection and collection scope determine representation. If an ML initiative fails because the training data was thin, dirty, or skewed, the remediation path runs directly through the data infrastructure team. That accountability isn't a burden — it's a seat at the table that IT should be occupying from the start of any ML project.

## Scene 3 — What Good Pipeline Ownership Looks Like
ML-aware data pipeline ownership means asking different questions at design time: Are we collecting enough data diversity, or just enough data volume? Are there validation gates that reject malformed records before they reach the training set? Do our data sources represent the full population the model will eventually serve, or just the subset that's easiest to instrument? These are the same rigour questions IT applies to any production system. Apply them upstream of the model, not after it ships.

## Takeaway
The model learns from what the pipeline delivers — and the pipeline is yours to design, govern, and own.

## Visual Direction
Three-scene scroll. Scene 1 shows a pipeline as a physical conduit — data flowing in from multiple sources, with visible chokepoints where volume is thin, quality degrades, and representation narrows. Scene 2 maps each failure mode to a specific pipeline layer with IT ownership labels. Scene 3 shows the same pipeline redesigned with validation gates, diverse source inputs, and clean throughput — the same architecture, governed with ML consequences in mind. Keep the visual language operational and infrastructure-flavoured, not data-science-flavoured.
