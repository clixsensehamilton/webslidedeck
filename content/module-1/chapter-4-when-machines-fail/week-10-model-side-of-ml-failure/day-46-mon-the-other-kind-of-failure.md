---
week: 10
day: 46
weekday: Monday
chapter: Chapter 4 — When Machines Fail
source_video: Video 10: Challenges of ML — Part II
post_title: The Other Kind of Failure: When the Data Is Fine but the Model Isn't
series_tag: "#AIMLSeries #Module1"
---

## Hook
Last week was about the data. Clean it, fix the sampling, engineer the features — and you've addressed the data side of ML failure. But what if the data is sound and the model still fails? That's a different problem entirely, and it requires a different diagnosis.

## Scene 1 — The Reset: Model-Side Failure
Week 9 closed with feature engineering — the constructive response when data is the root cause. This week opens with a harder question: what happens when the data pipeline is healthy, the features are relevant, and the model still makes bad predictions on data it hasn't seen before? The answer is that the failure is in the model itself — in the design choices that determine how it learns, how much it learns, and how well what it learned transfers to new situations.

## Scene 2 — A Financial Firm's Clean Data, Broken Model
Consider a financial firm assessing credit risk. The data team has done its job: income data, spending history, credit records — all relevant, all clean. The model trains. Accuracy on the training set looks excellent. Then it goes live, and the predictions drift. New applicants whose profiles look like clean, straightforward cases are getting miscategorised. The data was fine. The model overcommitted to the training data's specific patterns and failed to generalise beyond them. Clean data does not guarantee a model that works. Model design matters independently.

## Scene 3 — Two Ways a Model Gets the Balance Wrong
There are two failure modes on the model side, and they are opposites. A model that is too complex memorises the training data so thoroughly that it mistakes noise for signal — it performs brilliantly on examples it has seen, and poorly on everything else. A model that is too simple doesn't capture enough of the underlying pattern at all — it draws a straight line through data that requires a curve. This week covers both, their causes, and how to fix them.

## Takeaway
Clean data is a prerequisite — it is not sufficient. Model design failure is a separate problem that requires a separate toolkit.

## Visual Direction
Open with a visual handoff from Week 9 — a healthy, validated data pipeline delivering clean data into a model. The model receives it, trains confidently, and then produces bad predictions on new data. Cut to a diagnostic view: the data stream is marked green (healthy), but the model output is marked red. Split into two paths — overfitting (model too complex, memorising noise) and underfitting (model too simple, missing the pattern). Set the visual stage for the week ahead without resolving either path yet.
