---
week: 10
day: 47
weekday: Tuesday
chapter: Chapter 4 — When Machines Fail
source_video: Video 10: Challenges of ML — Part II
post_title: When Your Model Memorises Instead of Learns — and When It's Too Dumb to Try
series_tag: "#AIMLSeries #Module1"
---

## Hook
There's a version of ML failure where the model is too good at its training data. And there's a version where it was never good enough. Both ship to production. Both look fine on paper until they don't.

## Scene 1 — Overfitting: The Model That Memorised the Answer Sheet
A stock prediction algorithm trained on historical market data can be tuned to replay the past with stunning accuracy — accounting for every spike, every dip, every anomaly that happened to occur during the training window. The problem is that those anomalies were noise. They didn't represent durable patterns; they were one-off events. When that model encounters new market conditions, it's searching for patterns it memorised but that no longer exist. It fails not despite its precision on training data, but because of it. This is overfitting: the model learned the training set instead of learning the underlying pattern.

## Scene 2 — Underfitting: The Model That Gave Up Too Early
The opposite failure is a model too simple to capture what's actually going on. A sales forecasting tool built on a linear model tries to draw a straight line through data that rises and falls with seasonal cycles, promotional events, and market shifts. The line is technically a valid fit for the average — but it misses every pattern that actually matters for operational decisions. Understaffed warehouses before peak season, overstocked inventory in a slow quarter. The model isn't wrong about the trend — it just never had the complexity to see one. Polynomial regression, or a more capable model architecture, would have caught what the linear model flattened.

## Scene 3 — The Goldilocks Problem in Model Design
Overfitting and underfitting are the same design problem approached from opposite directions: finding the right level of model complexity for the data and the task. Too complex, and the model becomes a mirror of its training set — brilliant in the past, unreliable in the future. Too simple, and it cannot distinguish between the patterns that matter and the patterns that don't. The goal is a model that generalises — one that learns the signal, not the noise, and applies that learning reliably to data it has never seen before.

## Takeaway
A model that memorises isn't learning — and a model too simple to try isn't much more useful than a spreadsheet average.

## Visual Direction
Use a three-state graph visual. Left state: an overfit curve — wildly complex, hugging every data point including outliers. Right state: an underfit line — flat and dismissive, missing every seasonal peak and valley. Centre state: a well-fitted curve — smooth, capturing the actual trend without chasing noise. The animation should build left to right, landing on the centre as the target. Below the graph, show the real-world consequence of each state: overfit leads to bad live predictions, underfit leads to operational blind spots, the right fit leads to reliable forecasting.
