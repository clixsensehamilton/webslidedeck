---
week: 8
day: 37
weekday: Tuesday
chapter: Chapter 3 — How Machines Learn
source_video: "Video 8: Semi-supervised and Reinforcement Learning"
post_title: "When 10% of Your Data Has to Do the Work of 100%"
series_tag: "#AIMLSeries #Module1"
---

## Hook
You don't always get to choose how much of your data is labelled. Sometimes labelling everything is simply not feasible — and the model still has to run.

## Scene 1 — The Labelling Problem in IT Environments
In IT operations, data arrives continuously and at volume: security event logs, network telemetry, incident tickets, user activity streams. Labelling every one of those records — confirming whether an event is a true positive or a false alarm, whether an incident represents a known failure pattern — requires analyst time that rarely exists at the scale the data demands. Full supervision isn't a realistic option. The question becomes: what can you do with the labelled fraction you actually have?

## Scene 2 — What Semi-Supervised Learning Does With the Unlabelled Majority
With even a small percentage of labelled examples, a semi-supervised model can use the structure of the unlabelled data to extend what it knows. The labelled incidents teach the model what certain failure signatures look like. The unlabelled events — the thousands of log entries no analyst has reviewed — contribute their distributional structure. The model uses both: the labelled examples set the classification boundaries, the unlabelled examples refine them. You get a model trained on the effective richness of the full dataset, not just the annotated slice.

## Scene 3 — The Trade-Off Is Real, But the Math Holds
Semi-supervised learning does not perform as well as a fully supervised model trained on a large, perfectly labelled dataset. That comparison isn't the relevant one. The relevant comparison is: semi-supervised learning vs. a supervised model trained only on the labelled fraction. On that comparison, semi-supervised consistently outperforms — because it uses more information. When labelling every log entry is prohibitively expensive, a model that extracts signal from 90% unlabelled data is not a compromise. It's the right tool for the constraint.

## Takeaway
**When full labelling isn't feasible, semi-supervised learning extracts more signal from what you have than any fully supervised model trained only on the labelled portion ever could.**

## Visual Direction
Open with a large dataset grid — 90% grey (unlabelled), 10% coloured (labelled). Scene 2 shows the labelled examples casting influence outward across the grey — gradual, propagating. Scene 3 introduces a side-by-side comparison: supervised-only model (trained on the 10%) vs. semi-supervised model (trained on 10% + structure of the 90%) with a simple accuracy delta. Keep it operational — this is an engineering trade-off post, not a theory post.
