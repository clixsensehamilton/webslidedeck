---
week: 12
day: 57
weekday: Tuesday
chapter: Chapter 6 — The Reckoning
source_video: "Video 12: Ethical Challenges of AI"
post_title: "Gender Bias in Algorithms: Not a Bug, a Mirror"
series_tag: "#AIMLSeries #Module1"
---

## Hook
The algorithm didn't malfunction. It learned exactly what it was taught. That's the problem.

## Scene 1 — What the Training Data Carried In
When an AI model trains on historical data, it absorbs more than patterns — it absorbs the prejudices embedded in how that data was generated. Decades of hiring decisions, search queries, content rankings, and user behaviour all carry the fingerprints of existing societal bias. Feed that history into a model and the model learns it as signal, not as noise to be filtered out.

## Scene 2 — The Mechanism: Correct Learning, Flawed Input
Gender bias in AI outputs doesn't typically result from a misconfigured model. It results from a model that performed its job accurately — on training data that reflected skewed human behaviour. A search engine that surfaces gendered results for professional queries isn't broken. It found the statistical pattern in how humans have historically searched, clicked, and ranked. The model learned correctly from flawed data. Those are different failure modes with different fixes.

## Scene 3 — What Discriminatory Outputs Look Like
The outcome is that AI systems can actively reinforce existing inequalities at scale. Search results that associate certain roles or characteristics with a particular gender. Recommendation algorithms that route different content to different demographic groups in ways that compound rather than counteract historical disadvantage. The system doesn't know it's doing this — it's optimising for the patterns it was given, and those patterns reflect a world where the bias was already present.

## Scene 4 — Why "Fix the Model" Isn't Enough
The standard engineering reflex — adjust the algorithm — treats this as a model problem. But if the training data is the source, retraining on the same data produces the same result. Addressing bias requires interrogating what the training data represents, who is and isn't in it, and what the model is being asked to optimise for. That's a data governance and system design problem, not a parameter tuning problem.

## Takeaway
When a model produces biased outputs, the question isn't what the algorithm got wrong — it's what the training data got right that it shouldn't have.

## Visual Direction
Use a mirror metaphor: on one side, a representation of historical data (documents, records, search logs); on the other, a model output that reflects the same skew back. The mirror frame makes the point visually — the model isn't distorting, it's reflecting. Each scene can add a layer to this image: Scene 1 shows what goes into the mirror, Scene 2 shows the reflection mechanism, Scene 3 shows discriminatory outputs as concrete labels on the reflected side, Scene 4 cracks the frame slightly to signal that the problem is in the glass, not just the image.
