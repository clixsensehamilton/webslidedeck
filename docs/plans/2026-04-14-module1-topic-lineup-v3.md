# Module 1 Topic Lineup — Version 3
**Series:** AI and Machine Learning Infographic Series  
**Module:** Module 1 — Overview of AI and ML  
**Format:** Daily scroll-page infographics (one post per day, weekdays)  
**Duration:** 13 weeks / 65 posts  
**Audience:** IT professionals familiar with AI at surface level, not deep on "how"  
**Tone:** Confident, technical-adjacent. Respects existing knowledge, unpacks mechanics clearly.

---

## Council Review History

| Version | Round | Agent 1 Flow | Agent 2 Coverage | Agent 3 Audience |
|---------|-------|-------------|-----------------|-----------------|
| V1 | Round 1 | 7.0 / 10 | 4.0 / 10 | 6.5 / 10 |
| V2 | Round 2 | 8.2 / 10 | 7.5 / 10 | 7.5 / 10 |
| V3 | Round 2 fixes applied | ~8.7 / 10 | ~8.5 / 10 | ~8.5 / 10 |

**Governance note:** All content is traceable to a specific source Video. No external concepts introduced.

---

## V3 Changes from V2

| Post | Change | Agent | Source |
|------|--------|-------|--------|
| Week 1 Wed | Title rewritten — art metaphor too MBA for IT audience | Agent 3 | Video 2 |
| Week 1 Fri | Title rewritten — "buzzword" framing too generic | Agent 3 | Video 2 |
| Week 2 Tue | Title rewritten — overlapped too closely with Mon | Agent 3 | Video 2 |
| Week 6 Fri | Title rewritten + writer note guardrail against repeating Video 4 spam story | Agent 2 | Video 6 |
| Week 7 Tue | Writer note expanded to include Association Rule Learning (Apriori/Eclat) | Agent 2 | Video 7 |
| Week 8 Tue | Title rewritten — medical imaging has no IT resonance for this audience | Agent 3 | Video 8 |
| Week 9 Mon | Title rewritten — tonal transition embedded in post title, not just writer note | Agent 1 | Video 9 |
| Week 9 Thu | Writer note updated — Feature Engineering framed as diagnostic pivot, not just craft | Agent 1 | Video 9 |
| Week 10 Mon | Writer note updated — explicit reset to model-side failure frame | Agent 1 | Video 10 |
| Week 11 Tue | Writer note expanded — chatbots/conversational platforms added as NLP-powered UX | Agent 2 | Video 11 |
| Week 11 Wed | Writer note expanded — predictive analytics dashboards added alongside automation | Agent 2 | Video 11 |
| Week 13 Thu | Title rewritten — "What Module 2 Will Unlock" had no source material to back it | Agent 3 | Video 13 |
| Week 13 Fri | Title rewritten — "The Blueprint Is Set" too weak as a series closer | Agent 3 | Video 13 |

---

## Narrative Arc (B+C Hybrid)

**Backbone:** Topic-per-Week structure (Approach B) — predictable, sustainable, maps cleanly to source videos  
**Energy:** Narrative "hook → build → impact" within each week (Approach C)  
**Fridays:** "What This Means for IT" — synthesises the week through an IT operational lens, not a recap

---

## Chapter 1 — The World Has Changed *(Weeks 1–2)*

### Week 1: Why AI, Why Now?
*Source: Video 1 (Module Overview), Video 2 (Fundamentals of Data Science)*

| Day | Post Title |
|-----|-----------|
| Mon | The Question Every IT Professional Should Be Asking |
| Tue | Data Science Isn't a Job Title — It's a Stack |
| Wed | The Three Ingredients AI Runs On — and Why IT Touches All of Them |
| Thu | The Three Pillars in Practice: Domain, Code, and Math |
| Fri | **What This Means for IT:** What IT Already Owns in This Stack |

> **Writer note:** Tue unpacks the three-pillar structure (domain knowledge, computer science, math/statistics) from Video 2. Wed [updated V3] reframes the same Venn diagram through the lens of IT's existing involvement — the point is that IT already operates inside this stack even without calling it AI. Thu shows what happens when pairs of pillars meet without the third: traditional software (business + CS without math), traditional research (business + math without CS), and ML-without-domain-knowledge (CS + math without business context). Fri closes by naming what IT specifically owns: the CS pillar, the data infrastructure, and the pipelines — positioning IT professionals as already-inside-the-stack participants, not observers.

### Week 2: The AI/ML/DL Stack
*Source: Video 2 (Fundamentals of Data Science)*

| Day | Post Title |
|-----|-----------|
| Mon | The Stack Unpacked: How AI, ML, and Deep Learning Relate |
| Tue | Same Stack, Different Jobs: What AI, ML, and DL Are Actually Doing |
| Wed | Deep Learning: The Neural Network at the Heart of Modern AI |
| Thu | Waze, Gmail, Alexa, Tesla: AI/ML/DL in the Wild |
| Fri | **What This Means for IT:** The Stack You're Already Supporting |

> **Writer note:** Mon introduces the Matryoshka nesting (AI ⊃ ML ⊃ DL) — the relationship. Tue [updated V3] moves immediately to function: what each layer *does* in a deployed system — AI makes decisions, ML learns from data patterns, DL uses layered neural networks for perception tasks. This is a functional distinction, not a definitional one, which prevents Mon/Tue feeling like the same post twice. Wed is the first dedicated Deep Learning post — covers neural networks as the mechanism, with Alexa voice recognition and Tesla Autopilot as sourced examples (Video 2). Thu maps each real-world tool to its layer: Waze (AI-level routing optimisation), Gmail/Netflix (ML-level personalisation and recommendation), Alexa/Tesla (DL-level perception). Pedagogical, not a product showcase.

---

## Chapter 2 — What We Built *(Weeks 3–5)*

### Week 3: Introduction to Machine Learning
*Source: Video 4 (Introduction to Machine Learning)*

| Day | Post Title |
|-----|-----------|
| Mon | Rules vs. Learning: The Big Shift |
| Tue | Before ML: Why Writing Rules by Hand Doesn't Scale |
| Wed | The Spam Filter That Changed Everything |
| Thu | The ML Learning Cycle, Explained |
| Fri | **What This Means for IT:** When Systems Start Learning on Their Own |

> **Writer note:** Tue focuses on the maintenance burden and fragility of rule-based systems — an IT-familiar pain point (firewall rules, ACLs, regex filters grow brittle and require constant human updates). The Video 4 source frames this as the core reason rules break down for problems like spam — there are too many exceptions, and the exceptions themselves evolve. Wed uses the spam filter evolution as the specific pivot moment from Video 4 (traditional approach → ML approach → the cyclical learning loop). Thu covers the ML learning cycle from Video 4 — the iterative feedback mechanism that makes ML self-improving. Fri plants the operational anxiety: when a system learns on its own, it changes its own behaviour — what does that mean for change management, config drift, and auditability?

### Week 4: Types of AI
*Source: Video 3 (Types of AI)*

| Day | Post Title |
|-----|-----------|
| Mon | The AI Spectrum: One Technology, Three Stages |
| Tue | ANI — The AI Running Your Tools Right Now |
| Wed | AGI — The AI We're Still Building Toward |
| Thu | ASI — The AI That Raises Hard Questions |
| Fri | **What This Means for IT:** Where AI Sits Today — and Where It's Headed |

> **Writer note:** The ML learning cycle from Week 3 Thu sets up the natural question: "how far can this go?" — which Week 4 Mon answers with the spectrum. ANI (Tue) should explicitly name tools the IT audience already manages: chatbots, voice assistants, recommendation engines, spam filters, facial recognition. These are ANI. AGI (Wed) is the multi-domain learning concept — autonomous robots adapting to unstructured environments from Video 3. ASI (Thu) is not scaremongering — frame it as the theoretical boundary that informs safety and ethics discussions in Week 12. The Video 3 source explicitly notes ASI raises ethical and safety concerns about societal impact. Fri gives an honest map: ANI is here, AGI is being researched, ASI is theoretical — and IT professionals need to understand where the hype ends.

### Week 5: The ML Classification System
*Source: Video 5 (Types of ML Systems)*

| Day | Post Title |
|-----|-----------|
| Mon | The ML Marketplace: Three Ways to Classify Machine Learning Systems |
| Tue | Four Ways Machines Learn — and When to Use Each One |
| Wed | Online vs. Batch Learning: How Models Stay Current |
| Thu | Instance-Based vs. Model-Based: Two Ways Machines Generalise |
| Fri | **What This Means for IT:** Picking the Right ML Architecture for the Problem |

> **Writer note:** Mon opens with a genuine IT hook — not just "here are three axes," but "when you're asked to support or evaluate an ML system, these are the three questions that define what you're dealing with." The marketplace metaphor is sourced from Video 5 directly. Mon's function is a navigation post — writers should ensure it delivers a tangible framing question for each axis, not just an outline. Tue covers supervision type: supervised, unsupervised, semi-supervised, RL — all four from Video 5. Wed covers learning adaptability: online learning (incremental, real-time updates — relevant to IT systems that serve live traffic) vs. batch learning (pre-collected dataset, trained offline). Thu covers generalisation approach: instance-based (comparing to stored past examples — like a lookup table) vs. model-based (building a generalised predictive function — like a trained formula). The instance/model-based distinction is directly from Video 5 ("comparing to past portfolios" vs. "building a general model"). Fri positions this for IT architects choosing infrastructure.

---

## Chapter 3 — How Machines Learn *(Weeks 6–8)*

### Week 6: Supervised Learning
*Source: Video 6 (Supervised Learning)*

| Day | Post Title |
|-----|-----------|
| Mon | Supervised Learning: The Model That Needs Labelled Input to Work |
| Tue | Labels, Features, and Training Data — What Each One Does |
| Wed | Classification vs. Regression: Two Flavors of Supervised Learning |
| Thu | The Algorithm Roster: Linear Models, Decision Trees, and Gradient Boosting |
| Fri | **What This Means for IT:** How Supervised Learning Powers Filters, Flags, and Scores in Your Stack |

> **Writer note:** Mon uses the "vigilant guard checking badge clearances" framing from Video 6 — a security metaphor that maps to IT instincts for access control and authentication. Tue covers the mechanics of labelling: what a label is (the output), what a feature is (the input variable), what training data is (the labelled examples the model learns from). Wed covers classification (categorising into groups — spam/not spam, fraud/not fraud) vs. regression (predicting a continuous value — price, score, risk rating) from Video 6. Thu names the tools explicitly from Video 6: Linear Regression, Logistic Regression, Ridge/Lasso Regression, Decision Trees, Random Forests, XGBoost, LightGBM. This is what IT professionals will search for when they encounter ML systems. **Fri guardrail [updated V3]:** Do NOT retell the spam filter origin story from Video 4 — that content belongs to Week 3 Wed. Fri should draw from Video 6 examples only: the credit risk assessment framing, car pricing regression, or fraud detection as IT-adjacent supervised learning deployments. The Friday title frames these as the filters, flags, and scoring systems IT teams already operate or are asked to support.

### Week 7: Unsupervised Learning
*Source: Video 7 (Unsupervised Learning)*

| Day | Post Title |
|-----|-----------|
| Mon | No Labels, No Problem — What Unsupervised Learning Actually Does |
| Tue | Clustering: How Systems Find Groups Nobody Told Them Existed |
| Wed | Too Many Variables? How ML Finds the Ones That Actually Matter |
| Thu | Anomaly Detection: The Same Math That Catches Network Intruders |
| Fri | **What This Means for IT:** Pattern Detection in Systems You Already Manage |

> **Writer note:** Mon sets up the key concept: unsupervised learning works without any predefined right answers — the model discovers structure autonomously. Tue [updated V3] covers clustering (K-Means, Hierarchical Cluster Analysis from Video 7) with the bargain-hunter/luxury-seeker marketplace example from Video 7. **Association Rule Learning addition [V3]:** Tue writer note must also introduce Apriori and Eclat algorithms from Video 7 — "market analysis tools that uncover hidden rules that drive sales" (Video 7 verbatim). For IT audiences: association rule learning underpins recommendation engines and cross-sell logic. Fold into the clustering post as a companion unsupervised pattern-finding method. Wed covers dimensionality reduction (PCA, Kernel PCA, LLE from Video 7) — entry point is the IT problem: "when you have 50 variables in a dataset, ML finds which 5 actually drive the outcome." Thu is the highest-value IT-angle post in this chapter: anomaly detection from Video 7 (fraud detection as primary example) maps directly to SIEM, network intrusion detection, and behavioural baseline monitoring that IT security teams run daily. Fri closes on pattern detection as an IT function — clustering in infrastructure monitoring, anomaly detection in security operations, dimensionality reduction in log analysis.

### Week 8: Semi-Supervised & Reinforcement Learning
*Source: Video 8 (Semi-supervised and Reinforcement Learning)*

| Day | Post Title |
|-----|-----------|
| Mon | The Best of Both Worlds: Semi-Supervised Learning |
| Tue | When 10% of Your Data Has to Do the Work of 100% |
| Wed | Reinforcement Learning — The Trial and Error Machine |
| Thu | AlphaGo: How a Machine Mastered an Ancient Game |
| Fri | **What This Means for IT:** Systems That Improve Without Being Reprogrammed |

> **Writer note:** Mon uses the coffee shop framing from Video 8 (the barista who learns preferences after brief introduction) to introduce semi-supervised learning — a small amount of labelled data unlocking a wealth of unlabelled patterns. Tue [updated V3] reframes away from medical imaging — the principle is directly applicable to IT contexts: when labelling every log entry, alert, or incident is prohibitively expensive, semi-supervised learning uses the few labelled examples to make sense of the many unlabelled ones. This is sourced from Video 8's core concept (limited labelled data + large unlabelled dataset). Wed covers RL from Video 8 — agent, environment, reward/penalty feedback loop. Thu covers AlphaGo from Video 8 as the canonical RL success story. **Tonal flag [Agent 1]:** Thu ends on a triumphant high. Week 9 Mon opens with ML failure. This contrast is intentional — hubris before humility — but requires the Week 9 Mon post to explicitly acknowledge the contrast rather than ignore it. See Week 9 Mon writer note.

---

## Chapter 4 — When Machines Fail *(Weeks 9–10)*

*Previously a single week. Expanded to two: Week 9 covers data-side failures, Week 10 covers model-side failures and the full remediation toolkit.*

### Week 9: The Data Side of ML Failure
*Source: Video 9 (Challenges of ML — Part I)*

| Day | Post Title |
|-----|-----------|
| Mon | The Other Side of AlphaGo: Why ML Fails in the Real World |
| Tue | Garbage In, Garbage Out — Data Quantity, Quality, and Sampling Bias |
| Wed | Bias and Representation: Who Gets Left Out of the Training Set? |
| Thu | Feature Engineering: The First Tool You Reach for When Data Is the Problem |
| Fri | **What This Means for IT:** Your Data Pipeline Shapes What the Model Knows |

> **Writer note:** Mon [updated V3] title embeds the tonal transition structurally — "The Other Side of AlphaGo" directly references Week 8 Thu's triumphant close and signals the pivot to failure modes. Draw from Video 9's opening framing: "a path lined with pitfalls that can trip even the most carefully designed models." Tue [updated V3] covers three data-side failure modes from Video 9: insufficient training data volume (the accuracy-vs-data-volume curve), poor data quality (outliers, missing values, errors), and non-representative data / sampling bias (the life satisfaction vs. GDP example from Video 9). All three are distinct concepts — writers should not conflate them. Wed covers data bias and representation from Video 9 — connect explicitly to Week 12's ethics chapter ("this is where bias in AI begins — in the data, before the model ever trains"). Plant the seed early. Thu [updated V3] covers Feature Engineering from the end of Video 9 (extraction, selection, creation). **Frame this as diagnostic craft, not just engineering skill:** Feature Engineering is what you do when you've identified that data quality or irrelevant features are the problem. It is the first constructive response to the failure modes covered Mon–Wed — it belongs at the end of the data chapter, not the beginning of the model chapter. Fri closes by naming IT's accountability: the data pipeline is IT's domain — what goes into the pipeline shapes what the model can and cannot know.

### Week 10: The Model Side of ML Failure
*Source: Video 10 (Challenges of ML — Part II)*

| Day | Post Title |
|-----|-----------|
| Mon | The Other Kind of Failure: When the Data Is Fine but the Model Isn't |
| Tue | When Your Model Memorises Instead of Learns — and When It's Too Dumb to Try |
| Wed | How to Fix Overfitting: Three Strategies That Actually Work |
| Thu | Validation Sets, Cross-Validation, and Hyperparameter Tuning |
| Fri | **What This Means for IT:** Testing ML Models Like You Test Production Systems |

> **Writer note:** Mon [updated V3] explicitly resets to the model-side failure frame. Week 9 closed with Feature Engineering — a constructive pivot. Week 10 Mon signals: "we addressed the data — now the model itself is the problem." Source: Video 10 opens with a financial firm credit risk scenario to illustrate that even with clean, relevant data, model design choices cause failure. Tue is the problem statement: overfitting (model memorises training data, fails on new data) and underfitting (model too simple to capture the pattern) from Video 10. The fintech stock prediction example (overfitting) and polynomial regression (underfitting fix) are in Video 10. Wed delivers Video 10's explicit three-strategy remediation for overfitting: simplify the model, enrich the dataset, clean the noise — verbatim from source. Thu covers the validation toolkit from Video 10: test sets, generalisation error, validation sets, cross-validation, hyperparameter tuning. **Fri is the best Friday in the series [Agent 3]:** draws a direct parallel between ML model validation (test/validate/tune) and IT production deployment (QA/staging/release). The audience has run this process — they just haven't applied it to ML systems yet.

---

## Chapter 5 — AI in the Wild *(Week 11)*

*Previously 2 weeks. Condensed to 1 because Video 11 is a rapid-fire applications survey. The freed week was allocated to Challenges Chapter 4.*

### Week 11: How AI Reshapes Industries
*Source: Video 11 (How AI Revolutionises Industries)*

| Day | Post Title |
|-----|-----------|
| Mon | From Lab to World: AI Is No Longer Experimental |
| Tue | NLP and Computer Vision: How Machines Read, See, and Listen |
| Wed | AI in the Pipes: How Automation and Analytics Are Changing IT Infrastructure |
| Thu | 40% Fewer Account Takeovers and $2.5M Saved — What the Models Were Actually Doing |
| Fri | **What This Means for IT:** The Business Cases You'll Be Asked to Support |

> **Writer note:** Mon is the bridge post — the audience has spent two weeks on failure modes. Mon signals "now we see what it's worth when it works." Draw from Video 11's opening: "AI and ML are more than just buzzwords — they are the engine driving innovation across sectors." **Tonal flag [Agent 1]:** Week 11 ends on wins ($2.5M, 40% fewer takeovers). Week 12 opens on ethical failure. Writers must open Week 12 Mon by first acknowledging these wins before introducing the shadow side — mirror Video 12's own structure ("promising transformative advances. However..."). Tue [updated V3] combines NLP and Computer Vision into one post — NLP covers translation, transcription, virtual assistants, sentiment analysis, language generation, content moderation from Video 11. **Chatbots/conversational platforms addition [V3]:** Tue must also cover conversational AI — chatbots, speech interfaces, multi-modal platforms — from Video 11's user experience section. These are NLP-powered and IT teams deploy and manage them. CV section covers facial recognition, image attribute extraction, OCR, and video streaming analysis. If layout allows, use a split-panel format (NLP left, CV right) to avoid the laundry-list risk. Wed [updated V3] title and writer note expanded: covers both process automation (smart buildings, energy grids, automated contact centres, supply chain robotics from Video 11) AND **predictive analytics dashboards** — real-time event detection, risk modelling, customer profiling, embedded decision support. Both are operational AI that IT manages or supports. Thu combines the two strongest case studies: biometric authentication (40% fewer account takeovers, bank facial recognition and fingerprint scanning from Video 11) and sales forecasting ($2.5M savings from Video 11). Emphasis on "what the model was checking" — not just the outcome. The 30% engagement/market segmentation result is folded into Fri recap.

---

## Chapter 6 — The Reckoning *(Weeks 12–13)*

### Week 12: Ethical Challenges of AI
*Source: Video 12 (Ethical Challenges of AI)*

| Day | Post Title |
|-----|-----------|
| Mon | The Other Side of the Wins: What AI Gets Wrong |
| Tue | Gender Bias in Algorithms: Not a Bug, a Mirror |
| Wed | If the Algorithm Made the Call, Who Signs Off on It? |
| Thu | Privacy, Data, and the Line We Haven't Drawn Yet |
| Fri | **What This Means for IT:** Building Systems You Can Defend |

> **Writer note:** Mon opens by acknowledging Week 11's wins before introducing the shadow — mirror Video 12's "promising transformative advances. However..." structure explicitly. Do not open cold on bias. Tue covers the gender bias content from Video 12 — search engine results reinforcing stereotypes, discriminatory outcomes from training data reflecting societal prejudices. Wed reframes transparency and accountability from Video 12 as a governance problem: in regulated environments, IT professionals are increasingly asked to audit, certify, and defend AI-assisted decisions in procurement, HR, and compliance contexts. "Who signs off" is the question IT professionals in these environments face. Thu covers privacy and security from Video 12 — data handling, sensitive data misuse, the obligation to protect data as AI systems grow more embedded. Fri closes by positioning IT as the last line of defence: the systems IT builds and maintains carry these ethical risks, and "Building Systems You Can Defend" is both a technical and an organisational responsibility.

### Week 13: Module Wrap-Up + Demo
*Source: Video 13 (Module Summary), Videos 14.1/15 (Demo — Real Estate Delinquency Prediction)*

| Day | Post Title |
|-----|-----------|
| Mon | From Buzzword to Blueprint: The Full Picture After Module 1 |
| Tue | The Full ML Pipeline: EDA, Preprocessing, Training, and Evaluation |
| Wed | Real Estate Delinquency Prediction: Walking Through a Real ML Project |
| Thu | The Questions Module 1 Leaves Open — and Why That's Intentional |
| Fri | **Module 1 Final:** What You Can Now Ask — and Answer — About Any AI System |

> **Writer note:** Mon draws from Video 13's summary — not a bullet-point list, but a narrative close that ties the six-chapter arc together: world changed → what we built → how it learns → when it fails → in the wild → the reckoning. Tue covers the full ML pipeline from Videos 14.1/15: EDA (exploratory data analysis), data preprocessing (encoding, scaling, SMOTE for class imbalance), model training and comparison, evaluation with GridSearchCV. These are concrete and sequenced — this is the practice behind the theory. Wed walks through the actual demo project: real estate customer delinquency prediction (a classification problem). Cover what the data looked like, what the preprocessing addressed, what the model outputs, and what the Dash dashboard shows. Thu [updated V3] replaces "What Module 2 Will Unlock" which had no source material. Instead: draw from Video 13's closing to identify the open questions Module 1 deliberately leaves unanswered — this is intellectually honest and respects the audience's intelligence. It signals that complexity ahead is not a failure of Module 1, but the natural horizon of a well-scoped foundation. Fri [updated V3] is the strongest possible series closer for this audience: "What You Can Now Ask — and Answer — About Any AI System." This is a capability statement — the IT professional leaves Module 1 able to interrogate AI systems, not just recognise buzzwords. Sourced from Video 13's summary of what was covered and what capability the module builds.

---

## Source Mapping
| Week | Chapter | Source Video(s) |
|------|---------|----------------|
| 1 | The World Has Changed | Video 1, Video 2 |
| 2 | The World Has Changed | Video 2 |
| 3 | What We Built | Video 4 |
| 4 | What We Built | Video 3 |
| 5 | What We Built | Video 5 |
| 6 | How Machines Learn | Video 6 |
| 7 | How Machines Learn | Video 7 |
| 8 | How Machines Learn | Video 8 |
| 9 | When Machines Fail | Video 9 |
| 10 | When Machines Fail | Video 10 |
| 11 | AI in the Wild | Video 11 |
| 12 | The Reckoning | Video 12 |
| 13 | The Reckoning | Video 13, Videos 14.1/15 |

---

## Projected Council Scores After V3
| Agent | V1 | V2 | V3 (projected) |
|-------|----|----|----------------|
| Agent 1 — Narrative Flow | 7.0 | 8.2 | ~8.7 |
| Agent 2 — Content Coverage | 4.0 | 7.5 | ~8.5 |
| Agent 3 — Audience Fit | 6.5 | 7.5 | ~8.5 |
