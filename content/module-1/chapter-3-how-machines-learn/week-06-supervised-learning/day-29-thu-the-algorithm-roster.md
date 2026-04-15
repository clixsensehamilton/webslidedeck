---
week: 6
day: 29
weekday: Thursday
chapter: Chapter 3 — How Machines Learn
source_video: "Video 6: Supervised Learning"
post_title: "The Algorithm Roster: Linear Models, Decision Trees, and Gradient Boosting"
series_tag: "#AIMLSeries #Module1"
---

## Hook
When someone mentions the ML model powering a system you support, they'll likely name one of these. Knowing what each one actually does — not just what it's called — changes the conversation.

## Scene 1 — The Linear Models
Linear Regression is the foundational predictive tool: it models the straight-line relationship between input features and a continuous output. Logistic Regression shifts this to classification — it calculates the probability that an input belongs to a given category and maps it to a decision. Ridge and Lasso Regression are extensions that add regularisation: Ridge stabilises predictions when input features are correlated; Lasso goes further by zeroing out less relevant features entirely, effectively performing feature selection as part of training. These are the workhorses of interpretable ML — when you need to explain why a model made a decision, linear models are where you start.

## Scene 2 — Decision Trees and Random Forests
A Decision Tree structures predictions as a branching set of yes/no questions. At each branch point, the model tests a feature against a threshold; the path you follow determines the outcome. They're transparent — you can read the logic from root to leaf. The weakness: a single tree overfits easily. Random Forests fix this by training many trees on different subsets of the data and taking the majority vote. The ensemble is more stable, more accurate, and harder to fool with noise. Random Forests are a common first choice for classification problems with complex feature interactions.

## Scene 3 — Gradient Boosting: XGBoost and LightGBM
Gradient Boosting Machines take a different ensemble approach: instead of training trees in parallel and averaging them, they train trees sequentially — each one learning from the errors of the last. XGBoost and LightGBM are the two dominant implementations. Both are consistently top performers on structured tabular data. XGBoost brought the technique to prominence through competition wins and production deployments in fraud detection and risk modelling. LightGBM trades some accuracy for speed on very large datasets. When you see "gradient boosting" in a system's model card, it almost certainly means one of these two.

## Takeaway
**Linear models for interpretability, Random Forests for stable classification, XGBoost and LightGBM when you need maximum predictive power on structured data — knowing the roster tells you what trade-offs were made before the model was deployed.**

## Visual Direction
Present as an organised roster — three groups with subtle visual separation: "Linear Models" (Linear Regression, Logistic Regression, Ridge, Lasso), "Tree-Based" (Decision Trees, Random Forests), "Gradient Boosting" (XGBoost, LightGBM). Use a clean card layout, one card per algorithm name with a one-line description. Scene 3 should animate the sequential tree-building concept — a chain of small trees where each points to the next with "corrects errors of" as the connector.
