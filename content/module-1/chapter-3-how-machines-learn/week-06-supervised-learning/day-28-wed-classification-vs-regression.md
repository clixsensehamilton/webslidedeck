---
week: 6
day: 28
weekday: Wednesday
chapter: Chapter 3 — How Machines Learn
source_video: Video 6: Supervised Learning
post_title: "Classification vs. Regression: Two Flavors of Supervised Learning"
series_tag: "#AIMLSeries #Module1"
---

## Hook
Supervised learning has two jobs: put things in the right bucket, or predict the right number. These aren't variations of the same task — they're structurally different, and they call for different algorithms.

## Scene 1 — Classification: Sorting Into Categories
Classification models answer discrete questions. Is this transaction fraudulent or legitimate? Is this applicant low, medium, or high risk? The output is a category, not a value. The model learns where the boundaries between categories lie by studying labelled examples of each class. Binary classification gives you two outcomes. Multi-class classification handles more. Either way, the model is making a call — and that call maps directly to an action: approve, reject, flag, allow.

## Scene 2 — Regression: Predicting a Number
Regression models answer continuous questions. What price should this car carry given its mileage, age, and brand? What credit score does this applicant's profile suggest? The output is a value on a spectrum — not a category. The model learns the relationship between input features and a continuous numeric outcome by fitting a function to the labelled training data. Every prediction is a position on a scale, not a slot in a bucket.

## Scene 3 — The Same Algorithm, Different Modes
Some algorithms cross the line between both. Logistic regression, despite its name, is primarily a classification tool — it predicts the probability of membership in a category. Linear regression is the foundational regression tool. What matters practically: the problem you're solving determines which type you need. If you're building a fraud flag, you want classification. If you're building a pricing engine or a risk score, you want regression. Mismatching the task type to the algorithm is one of the most common early mistakes in ML system design.

## Takeaway
**Classification draws lines between groups. Regression predicts a position on a scale. Getting that distinction right before you choose an algorithm is the starting point of any supervised learning deployment.**

## Visual Direction
Split-panel layout: left side shows a scatter plot with a decision boundary separating two clusters (classification). Right side shows a scatter plot with a regression line running through data points (regression). Labels appear beneath each: "Fraudulent / Legitimate" (left) and "Car Price: $14,200" (right). Scene 3 introduces a single algorithm name — Logistic Regression — with an arrow showing it pointing toward the classification side.
