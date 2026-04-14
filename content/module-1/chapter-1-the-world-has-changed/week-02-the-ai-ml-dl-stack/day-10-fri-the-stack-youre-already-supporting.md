---
week: 2
day: 10
weekday: Friday
chapter: Chapter 1 — The World Has Changed
source_video: Video 2: Fundamentals of Data Science
post_title: What This Means for IT: The Stack You're Already Supporting
series_tag: "#AIMLSeries #Module1"
---

## Hook
This week's content wasn't theoretical. The AI/ML/DL stack is running in your environment right now. The question is whether IT is managing it deliberately or discovering it after something breaks.

## Scene 1 — The Stack Shows Up in Your Ticket Queue
The email filtering system that's mis-classifying legitimate messages. The recommendation engine that degraded after a product catalogue migration. The voice interface that stopped handling regional accents correctly after an infrastructure move. These aren't abstract ML problems — they're the kind of tickets that show up when AI-layer systems interact with IT-layer changes. The root cause is often at the ML or DL level, but the symptom presents in systems IT manages: storage, access, network, pipeline.

## Scene 2 — Each Layer Has Different Infrastructure Needs
Understanding the layer tells you what to provision. An AI-layer routing system needs low-latency access to real-time data feeds. An ML model in production needs reliable inference infrastructure, monitoring for output drift, and a path to retrain when performance degrades. A deep learning system at inference time can be compute-hungry — GPU availability, memory allocation, and throughput all matter at a level that standard application hosting may not account for. Treating all three as "the AI system" and provisioning generically is how you get performance problems that are hard to diagnose.

## Scene 3 — What IT Needs to Know Going Forward
Two weeks in, the frame is set: data science runs on three pillars, and IT owns the CS pillar. AI, ML, and DL are distinct layers with distinct functions and distinct failure modes. Next week the series moves into machine learning specifically — how systems learn, what types of learning exist, and what it means for a model to be in production. The infrastructure picture starts coming into focus.

## Takeaway
The AI/ML/DL stack isn't someone else's system that IT hosts — it's a set of live dependencies that require informed management at every layer.

## Visual Direction
Single vertical layout showing the three-layer nesting diagram on one side and an IT infrastructure stack on the other. Animated connections link each AI/ML/DL layer to the specific IT concerns it generates: AI layer → data feeds, latency; ML layer → inference infra, monitoring, retraining pipelines; DL layer → GPU compute, memory, throughput. The connections should feel operational, not decorative — this is a dependency map, not a concept illustration. Close on the combined view with the takeaway below it.
