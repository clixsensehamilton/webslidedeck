---
week: 5
day: 25
weekday: Friday
chapter: Chapter 2 — What We Built
source_video: Video 5: Types of ML Systems
post_title: "What This Means for IT: Picking the Right ML Architecture for the Problem"
series_tag: "#AIMLSeries #Module1"
---

## Hook
Three axes. Three questions. One framework for evaluating any ML system you're asked to support, procure, or design around. Here's how to use it.

## Scene 1 — The Three-Question Diagnostic
When an ML system lands on your desk — in a vendor proposal, a project brief, or a post-incident review — ask these in order. First: what supervision approach does it use, and what does that mean for the labelling burden and ongoing data requirements? Second: does it update continuously or in training cycles, and is that cadence appropriate for how fast the underlying data changes? Third: does it generalise from a trained function or by comparing to stored examples, and what does that mean for performance on edge cases and for explainability under audit?

## Scene 2 — The Architecture Should Match the Problem's Tempo
A fraud detection model for a high-volume payment platform has a different architecture profile than a credit risk scoring model run monthly. The fraud system likely needs online learning to catch emerging attack patterns before the next batch retrain cycle. The credit model can afford batch training — the underlying risk drivers don't shift by the hour. Choosing batch for the fraud system is an architectural mismatch; choosing online for the credit model adds operational risk without adding value. The right architecture is determined by the problem's tempo, not by what's easiest to implement.

## Scene 3 — IT's Role Is Architecture Accountability
IT professionals increasingly sit in the room when ML infrastructure decisions are made — either as decision-makers or as the team that has to run whatever gets chosen. The classification framework this week isn't just taxonomy; it's a briefing tool. It lets you ask precise questions, spot mismatches between the problem and the proposed architecture, and translate requirements into infrastructure constraints that the ML team may not have considered: data ingestion latency, storage for instance-based models at scale, monitoring pipelines for online learning systems, retrain scheduling for batch deployments.

## Takeaway
The best ML architecture isn't the most sophisticated one — it's the one that matches the problem's data tempo, update requirements, and operational constraints.

## Visual Direction
A decision-flow diagram — clean, IT-familiar aesthetic. Three branch points, one per axis: supervision type → learning adaptability → generalisation approach. At each branch, show the key operational question and the two or three architectural options. Final node: an architecture recommendation block that populates based on the path taken. Animate the flow path for one example system (fraud detection) and then clear and reroute for a second (monthly credit scoring) to show how different problem profiles map to different architectures.
