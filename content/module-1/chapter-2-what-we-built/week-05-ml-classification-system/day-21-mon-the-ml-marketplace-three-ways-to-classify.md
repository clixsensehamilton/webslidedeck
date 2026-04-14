---
week: 5
day: 21
weekday: Monday
chapter: Chapter 2 — What We Built
source_video: Video 5: Types of ML Systems
post_title: "The ML Marketplace: Three Ways to Classify Machine Learning Systems"
series_tag: "#AIMLSeries #Module1"
---

## Hook
When you're asked to evaluate or support an ML system, three questions define what you're actually dealing with. Answer them, and you understand the system's architecture, its maintenance model, and its failure modes before you've seen a single line of code.

## Scene 1 — The Marketplace Frame
Think of ML systems as a marketplace — different vendors, different specialisations, different trade-offs. The marketplace has three organising dimensions, and every ML system you encounter can be located on each one. These aren't competing approaches; they're independent axes. A single system has a position on all three simultaneously.

## Scene 2 — The Three Questions
Question one: How was this system trained? Did it learn from labelled examples, discover patterns on its own, operate somewhere in between, or learn through trial and error? That's the supervision axis — and it shapes what data you need, who does the labelling, and what the system is capable of predicting. Question two: How does this system stay current? Does it update incrementally as new data arrives, or does it retrain offline on accumulated data in periodic batches? That's the learning adaptability axis — and it determines how the system handles data drift and live traffic. Question three: How does this system make predictions? Does it look up the closest match in stored historical examples, or does it apply a generalised model built from training? That's the generalisation axis — and it affects compute requirements, explainability, and performance on rare inputs.

## Scene 3 — Why This Framework Is Operationally Useful
These three questions aren't taxonomy for its own sake. They're diagnostic. If a model is producing degraded outputs after a shift in production data, the learning adaptability axis tells you whether it can self-correct or needs a manual retrain cycle. If a system performs well in testing but poorly on unusual edge cases, the generalisation axis points to whether the problem is stored examples or model architecture. The framework gives you a vocabulary for conversations that would otherwise stall in vague generalities.

## Takeaway
Three questions — how was it trained, how does it stay current, how does it generalise — are all you need to understand the architecture of any ML system you're handed.

## Visual Direction
Open with the marketplace metaphor: a stylised grid of storefronts, each labelled with an ML system type. Animate three overlays appearing in sequence — one for each axis — each one grouping the storefronts into different clusters. The same storefronts reclustered three times illustrates that the three dimensions are independent. Final frame: a clean 3-axis taxonomy diagram with placeholder labels for each axis. This is the navigation map for the rest of the week.
