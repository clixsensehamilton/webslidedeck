---
week: 2
day: 7
weekday: Tuesday
chapter: Chapter 1 — The World Has Changed
source_video: Video 2: Fundamentals of Data Science
post_title: Same Stack, Different Jobs: What AI, ML, and DL Are Actually Doing
series_tag: "#AIMLSeries #Module1"
---

## Hook
Now that you know how AI, ML, and deep learning are related, the more useful question is: what is each one actually doing when it's running? The nesting structure describes the relationship. Function describes the job.

## Scene 1 — What AI Does: Interprets and Decides
At the broadest level, an AI system takes input — data, a query, a sensor reading, a user action — and produces a decision or recommendation that resembles what an informed person might arrive at. It navigates complexity, filters noise, and returns something actionable. Think of it as the autopilot layer: it interprets a situation and responds without waiting for a human to process the same inputs first. The key word is decision — AI is producing an output that something or someone acts on.

## Scene 2 — What ML Does: Learns From Data Patterns
Machine learning's job is different from rule execution. Rather than following instructions written by a developer, an ML system ingests historical data, identifies patterns in that data, and builds a model that can apply those patterns to new inputs it has never seen. This is the core shift from traditional software: the logic isn't written, it's learned. Your team of analysts who've studied past behaviour to forecast future trends without being told explicitly what to look for — that's the ML function. The output is a model: a mathematical representation of the patterns in the data.

## Scene 3 — What Deep Learning Does: Processes Perception-Level Input
Deep learning's job is perception and representation. Where standard ML works well on structured, tabular data, deep learning handles the kinds of inputs that are hard to reduce to rows and columns — audio signals, images, natural language, video streams, sensor arrays. It does this through layered networks that progressively extract more abstract features from raw input: edges become shapes, shapes become objects, phonemes become words, words become meaning. Each layer transforms the representation, passing increasingly refined signal to the next layer. The output is an interpretation of something the world threw at it.

## Scene 4 — Three Functions, One Deployed System
In a real production system, all three can be in play simultaneously. A deep learning model handles speech recognition. An ML model interprets the recognised intent against past user behaviour. An AI layer routes the decision to the right response. The nesting isn't just architectural — it's functional. Knowing which layer is doing what helps you diagnose where a failure originated and what kind of fix it requires.

## Takeaway
AI decides. ML learns. Deep learning perceives. Three distinct jobs, even when they run inside the same system.

## Visual Direction
Three horizontal panels, each representing one layer. Top panel: "AI" — show a decision branching icon (input → decision output). Middle panel: "ML" — show a data-to-model training flow (historical data → pattern → model). Bottom panel: "Deep Learning" — show a layered network processing a raw signal (waveform or image → layers → interpreted output). Panels are visually distinct but connected with subtle flow arrows at their edges, suggesting they can compose into a single pipeline. Final frame shows all three panels together as one integrated system.
