---
week: 13
day: 62
weekday: Tuesday
chapter: Chapter 6 — The Reckoning
source_video: Videos 14.1/15: Demo — Real Estate Delinquency Prediction
post_title: The Full ML Pipeline: EDA, Preprocessing, Training, and Evaluation
series_tag: "#AIMLSeries #Module1"
---

## Hook
Theory explains how machine learning works. The pipeline is where it actually happens — and every stage has decisions with consequences.

## Scene 1 — Exploratory Data Analysis: Know What You Have Before You Touch It
Before any model is trained, EDA establishes what the data actually contains. In the demo project, this meant inspecting 22 columns of real estate customer data — checking distributions, identifying correlations between features, and validating that the dataset is complete before preprocessing begins. No null values meant the data was clean at load. But EDA also surfaced structural facts: list prices ranging from 2 million to 15 million PHP, with a median around 8.45 million, and a strong positive correlation between sales contract value and list price. These facts shape every decision that follows. EDA isn't exploration for its own sake — it's the diagnostic layer that makes preprocessing purposeful.

## Scene 2 — Preprocessing: Preparing Data the Model Can Actually Use
Raw data doesn't go into a model — preprocessed data does. The demo pipeline applied three preprocessing operations to the real estate dataset. First, one-hot encoding for categorical variables (household model type, payment scheme, city, location tag, lot type), converting them into a numeric form the model can work with. Second, min-max scaling for numerical features — chosen specifically because real estate data doesn't follow a normal distribution, and min-max preserves interpretability while aligning with that distribution shape. Third, SMOTE — Synthetic Minority Oversampling Technique — to address the class imbalance between delinquent (329) and non-delinquent (679) records, generating synthetic examples of the minority class until both classes were balanced at 679. Only then was the dataset split: 80% training, 20% test.

## Scene 3 — Model Training and Evaluation: Comparison, Then Selection
The demo didn't train one model — it trained several: Logistic Regression, Decision Tree, Random Forest, Support Vector Machine, Gradient Boosting, XGBoost, and LightGBM. Each was evaluated against training accuracy and test accuracy to identify candidates worth tuning. Random Forest and SVM performed strongest in initial comparison. GridSearchCV then ran hyperparameter tuning across the candidate models, systematically testing parameter combinations to find the configuration that optimised performance without overfitting. The result: 81.25% accuracy — comfortably above the 70% baseline established during preprocessing, with precision and recall scores that far exceeded what random chance would produce for the delinquent class.

## Takeaway
The ML pipeline is a sequence of decisions — what to measure, how to clean it, which model to evaluate, how to tune it — and each decision either compounds the quality of the output or compounds the error.

## Visual Direction
Show the pipeline as a horizontal flow: EDA → Preprocessing → Training → Evaluation → Output. Each stage should expand when it is the focus of the scene, revealing its internal steps as a vertical list that drops in during scroll. Use a consistent data-flow arrow between stages to reinforce the sequential dependency. The final stage (Output) should show the 81.25% result against the 70% baseline as two bars — the model bar clearly above the baseline. Keep the visual language schematic and technical, not decorative.
