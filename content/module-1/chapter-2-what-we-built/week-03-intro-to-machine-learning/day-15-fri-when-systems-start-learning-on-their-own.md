---
week: 3
day: 15
weekday: Friday
chapter: Chapter 2 — What We Built
source_video: Video 4: Introduction to Machine Learning
post_title: "What This Means for IT: When Systems Start Learning on Their Own"
series_tag: "#AIMLSeries #Module1"
---

## Hook
Traditional software does what you told it to do last time you deployed it. ML-powered software does what the data told it to do most recently. Those are very different change management problems.

## Scene 1 — The Change Management Gap
In a rule-based system, the system's behaviour is a function of the last configuration commit. You can audit it, version it, roll it back. You know exactly why it behaves the way it does because someone wrote that logic and you can read it. In an ML system, behaviour is a function of the training data and the model parameters — neither of which maps neatly onto a config file or a change record.

## Scene 2 — What This Creates Operationally
When a model retrains — intentionally or as part of an automated pipeline — it can produce different outputs for the same inputs than it did before. That's not a bug: it's the system working as designed. But it raises questions that traditional IT change management wasn't built to answer. Who approved this update? What changed and why? If this model's output now flags a different set of transactions as fraudulent, how do you audit that decision?

## Scene 3 — The Questions IT Needs to Ask
The operational posture shifts. Instead of asking "what does the config say?" you start asking: When was this model last trained? On what data? How is its performance being monitored in production? What triggers a retrain? Who owns the pipeline? These are the questions that turn an IT professional from a bystander in an ML deployment into an accountable participant in it.

## Takeaway
When systems learn on their own, change management doesn't disappear — it moves from version control into data governance and model monitoring.

## Visual Direction
Simple three-panel layout. Panel one: a traditional config file with a clear audit trail. Panel two: an ML model pipeline with a "last trained" timestamp and performance metrics — some fields that would exist in a config file are now absent or replaced by data lineage references. Panel three: a checklist of the operational questions IT should be asking (training cadence, data source, performance threshold, retrain trigger, ownership). The visual contrast between the familiar config and the unfamiliar model card is the message.
