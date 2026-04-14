---
week: 5
day: 23
weekday: Wednesday
chapter: Chapter 2 — What We Built
source_video: Video 5: Types of ML Systems
post_title: "Online vs. Batch Learning: How Models Stay Current"
series_tag: "#AIMLSeries #Module1"
---

## Hook
A model trained six months ago on last year's data is running your production system today. Whether that's a problem — and how big a problem — depends entirely on which of two learning modes it uses.

## Scene 1 — Batch Learning: Train Once, Deploy, Repeat
In batch learning, the model is trained on a full pre-collected dataset, optimised, and then deployed as a fixed artifact. It doesn't update itself after launch. It stays exactly as smart as it was on the day it was released — until someone takes it offline, retrains it on new data, and redeploys. This is the freight logistics model: plan extensively, load everything at once, ship. It's efficient and predictable, but the model's knowledge has an expiration date. If the world changes faster than your retrain cadence, performance degrades silently.

## Scene 2 — Online Learning: Update as Data Arrives
Online learning takes the opposite approach. The model ingests new data incrementally — each new example updates the model's parameters in near real-time. It's always current because it's always training. Systems that serve live traffic and need to respond to rapid shifts in input distribution are natural candidates: fraud detection adapting to new attack patterns, recommendation engines adjusting to today's trends, monitoring systems recalibrating to new baseline behaviour. The trade-off is exposure: a bad batch of training data can degrade the model quickly, because it's always accepting new input.

## Scene 3 — Choosing Between Them Is an Operational Decision
The choice between online and batch learning isn't purely technical — it's operational. How often does the underlying data distribution shift? How quickly does stale knowledge hurt performance? What's the cost of retraining and redeploying? Can the system tolerate the risk of being updated by corrupted or adversarially crafted data? Batch learning is lower risk and easier to audit. Online learning is more responsive but requires tighter monitoring. Both are valid; the architecture should match the problem's tempo.

## Takeaway
Batch learning gives you control and predictability; online learning gives you currency. The choice is about how fast the world your model lives in changes.

## Visual Direction
Split-panel animation. Left side (batch): a large container being filled, sealed, processed, and shipped — then arriving as a static deployed model. A clock beside it ticks forward while the model stays frozen. Right side (online): a continuous stream of data flowing into the model, which updates incrementally. The model's output metrics shift in real time alongside the stream. Final comparison frame: same time period, batch model shows drift from reality, online model tracks it. Clean, data-flow aesthetic — no decorative elements.
