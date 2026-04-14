---
week: 2
day: 9
weekday: Thursday
chapter: Chapter 1 — The World Has Changed
source_video: Video 2: Fundamentals of Data Science
post_title: Waze, Gmail, Alexa, Tesla: AI/ML/DL in the Wild
series_tag: "#AIMLSeries #Module1"
---

## Hook
Abstract definitions only take you so far. This post maps four tools your users interact with daily to their exact position in the AI/ML/DL stack — and explains why each one lives where it does.

## Scene 1 — Waze: AI-Level Routing Optimisation
Waze operates at the AI layer. It collects real-time data from users — speed, position, incident reports — applies algorithms to analyse current conditions, and produces a routing recommendation that adapts as conditions change. The output is a decision: take this turn, avoid this road, reroute now. The intelligence is in interpreting complex, fast-moving data and returning an actionable response. Waze doesn't need to learn new behaviour from scratch each session — it applies pattern-matching against current data to optimise a known problem. That's the AI function at work.

## Scene 2 — Gmail and Netflix: ML-Level Personalisation
Gmail's Smart Compose and Smart Reply features sit at the ML layer. The system was trained on patterns in how people write and respond to email — what phrases typically follow a given opening, what responses fit a given message type. It learned those patterns from data, not from rules someone wrote about email conventions. Netflix operates the same way: it doesn't follow a content curation rulebook — it models your viewing history against patterns across millions of users and recommends content that aligns with behaviour it has seen before. Both systems produce outputs that improve with more data, and neither required a developer to specify the logic. That's machine learning: pattern learned, pattern applied.

## Scene 3 — Alexa and Tesla: Deep Learning for Perception
Alexa and Tesla Autopilot sit at the deep learning layer because their inputs are perceptual — audio and visual data that can't be efficiently reduced to a spreadsheet. Alexa must interpret human speech: variable, accented, noisy, and contextual. Tesla must interpret the physical world through a camera: lighting changes, partial occlusion, moving objects, ambiguous markings. Both require layered neural networks that have been trained on massive datasets to extract meaning from raw sensory input. The perception problem is exactly what deep learning was built to solve, and these two are live examples of it running at production scale.

## Scene 4 — The Pedagogical Point
The reason this mapping matters is diagnostic. When a system like Waze returns a bad route, the failure is in the AI-layer logic or the quality of real-time data feeding it — not in a neural network. When Netflix recommendations go stale, the ML model may need retraining on updated behaviour data. When Alexa mishears a command in a noisy environment, the deep learning model's training data may not have included enough acoustic variation. Each layer has its own failure modes, its own data dependencies, and its own remediation path. Knowing the layer tells you where to look.

## Takeaway
Every AI-powered tool you can name sits at a specific layer — knowing which layer tells you what it needs, how it can fail, and what fixing it actually involves.

## Visual Direction
Four product cards laid out in a 2x2 grid. Each card shows the product name and a brief descriptor, with a layer badge: "AI," "ML," or "DL." Waze and a second card (optional filler) carry the "AI" badge. Gmail and Netflix carry "ML." Alexa and Tesla carry "DL." A vertical axis on the side of the grid shows the nesting: DL inside ML inside AI. Animated connection lines show each card mapping to its layer on the axis. Clean, structured, reference-quality — this is a card the reader should want to save.
