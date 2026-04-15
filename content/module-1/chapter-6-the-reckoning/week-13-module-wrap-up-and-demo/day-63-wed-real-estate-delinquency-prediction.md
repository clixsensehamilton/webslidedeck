---
week: 13
day: 63
weekday: Wednesday
chapter: Chapter 6 — The Reckoning
source_video: "Videos 14.1/15: Demo — Real Estate Delinquency Prediction"
post_title: "Real Estate Delinquency Prediction: Walking Through a Real ML Project"
series_tag: "#AIMLSeries #Module1"
---

## Hook
This isn't a textbook problem. It's a real dataset, a real business question, and a working model — walkthrough included.

## Scene 1 — The Business Problem and the Dataset
The project's objective is concrete: predict whether a real estate customer will become delinquent on their payments. In real estate, delinquency directly affects financial stability and cash flow management — knowing which customers are at risk allows the business to manage exposure, prioritise support, and optimise resources before a default occurs. The dataset contains 22 features per customer: demographic attributes (age, gender, nationality, marital status, city), financial attributes (contract value in Philippine peso, list price, down payment percentage, payment scheme, amount paid on principal), and property attributes (project phase, household model type — studio through penthouse — lot type, location category). The target variable is binary: delinquent or not delinquent.

## Scene 2 — What Preprocessing Had to Address
The raw dataset had two structural issues that preprocessing resolved before training could begin. The first was mixed data types: categorical fields like payment scheme, city, and household model type needed to be converted to numeric form via one-hot encoding before any ML model could use them. Numerical fields like list price and down payment percentage were min-max scaled to bring them onto a common range without assuming a normal distribution — appropriate for real estate data, which doesn't distribute normally. The second issue was class imbalance: 679 records were labelled non-delinquent versus 329 delinquent — a roughly 2:1 skew. Without correction, a model could achieve ~67% accuracy simply by predicting non-delinquent every time. SMOTE was applied to generate synthetic delinquent examples, balancing the classes before the 80/20 train-test split.

## Scene 3 — The Model Output and the Dashboard
After training and hyperparameter tuning with GridSearchCV, the selected model achieved 81.25% accuracy on the test set — substantially above the 70% proportional-chance baseline established during preprocessing. Precision and recall for the delinquent class moved from a baseline of 13% to over 77%, meaning the model is identifying the minority class — the high-risk customers — with meaningful reliability. The trained model and preprocessor are saved in serialised format for deployment. The operational interface is a Dash application: users load new customer data, click Predict, and receive a per-record delinquency prediction. The output is dynamic — the dashboard updates as new data comes in, translating model inference into a usable business tool.

## Takeaway
A working ML project is a pipeline with a business question at one end and an operational decision-support tool at the other — everything in between is structured, repeatable, and auditable.

## Visual Direction
Use a project walkthrough format: show three frames corresponding to the three scenes. Frame 1 is the data dictionary — a simplified table showing selected columns and their descriptions, with the target variable highlighted. Frame 2 is the preprocessing transformation — a before/after showing raw categorical data on the left, encoded and scaled output on the right, with a SMOTE balance bar chart below. Frame 3 is the Dash dashboard — a stylised mockup showing a data table with a "Predict" button, and a results column showing delinquent/not-delinquent labels per row. Keep all three frames in the same visual system to reinforce the pipeline continuity.
