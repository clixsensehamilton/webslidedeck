# Module 1 Topic Lineup — Version 2
**Series:** AI and Machine Learning Infographic Series  
**Module:** Module 1 — Overview of AI and ML  
**Format:** Daily scroll-page infographics (one post per day, weekdays)  
**Duration:** 13 weeks / 65 posts  
**Audience:** IT professionals familiar with AI at surface level, not deep on "how"  
**Tone:** Confident, technical-adjacent. Respects existing knowledge, unpacks mechanics clearly.

---

## Council Review Summary

Version 2 incorporates feedback from a 3-agent council:
- **Agent 1 (Narrative Flow):** Reordered Weeks 3–4, added a bridge post in AI-in-Industries week, flagged tonal transitions for writers
- **Agent 2 (Content Coverage):** Identified missing Deep Learning, 2 of 3 Video 5 axes, Feature Engineering, Validation techniques, Anomaly Detection; resolved by restructuring + expanding Challenges to 2 weeks
- **Agent 3 (Audience Fit):** Rewrote ~12 post titles to remove condescension and add IT-specific framing; reshaped all Recap days to "What This Means for IT"

**Governance note:** All content changes are traceable to a specific source Video. No external concepts introduced.

---

## Structural Changes from V1

| Change | Reason | Agent |
|--------|---------|-------|
| Weeks 3 and 4 swapped | ML mechanics must precede Types of AI for context to land | Agent 1 |
| Week 2: Wednesday replaced with Deep Learning post | Video 2 covers DL substantively; was entirely missing | Agent 2 |
| Week 5: Wed/Thu replaced with Online/Batch + Instance/Model-Based | Video 5 has 3 classification axes; V1 covered only 1 | Agent 2 |
| Week 6: Thursday replaced with Algorithm Roster | Spam detection was already in Week 3; named tools are missing | Agent 2 |
| Week 7: Thursday replaced with Anomaly Detection | Video 7 covers it; IT angle (network intrusion) is strong | Agents 2+3 |
| Challenges expanded to 2 weeks (Weeks 9–10) | Videos 9–10 cover 11 distinct topics; V1 gave them 4 days | Agent 2 |
| AI in Industries condensed from 2 weeks → 1 week (Week 11) | Freed a week for Challenges; Video 11 combines apps + case studies | Agent 2 |
| Bridge post added to Week 11 Monday | Prevents cold drop from Challenges into Applications | Agent 1 |
| All Recap days reshaped to "What This Means for IT" | Generic summary titles waste Friday on IT-literate audience | Agent 3 |

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
| Wed | Data Science: Where Art Meets Algorithm |
| Thu | The Three Pillars in Practice: Domain, Code, and Math |
| Fri | **What This Means for IT:** The Discipline Behind the Buzzword |

> **Writer note:** Tue unpacks the three-pillar structure (domain knowledge, computer science, math/statistics) from Video 2 — not a career definition. Thu shows what happens when pairs of pillars meet without the third (traditional software, traditional research, ML without domain knowledge).

### Week 2: The AI/ML/DL Stack
*Source: Video 2 (Fundamentals of Data Science)*

| Day | Post Title |
|-----|-----------|
| Mon | The Stack Unpacked: How AI, ML, and Deep Learning Relate |
| Tue | Why AI, ML, and Deep Learning Aren't Interchangeable Terms |
| Wed | Deep Learning: The Neural Network at the Heart of Modern AI |
| Thu | Waze, Gmail, Alexa, Tesla: AI/ML/DL in the Wild |
| Fri | **What This Means for IT:** The Stack You're Already Supporting |

> **Writer note:** Mon introduces the Matryoshka nesting (AI ⊃ ML ⊃ DL). Wed is the first dedicated Deep Learning post — covers neural networks as the mechanism, with Alexa and Tesla as examples. Thu maps each example to its layer: Waze (AI), Gmail/Netflix (ML), Alexa/Tesla (DL) — pedagogical, not a product showcase.

---

## Chapter 2 — What We Built *(Weeks 3–5)*

### Week 3: Introduction to Machine Learning *(was Week 4)*
*Source: Video 4 (Introduction to Machine Learning)*

| Day | Post Title |
|-----|-----------|
| Mon | Rules vs. Learning: The Big Shift |
| Tue | Before ML: Why Writing Rules by Hand Doesn't Scale |
| Wed | The Spam Filter That Changed Everything |
| Thu | The ML Learning Cycle, Explained |
| Fri | **What This Means for IT:** When Systems Start Learning on Their Own |

> **Writer note:** Agent 1 — this week must precede Types of AI (Week 4) so the audience understands *how* AI learns before encountering the question of *how far* it can go. Tue focuses on the maintenance burden and fragility of rule-based systems — an IT-familiar pain point (think firewall rules, ACLs, regex filters). Wed uses the spam filter evolution as the specific pivot moment.

### Week 4: Types of AI *(was Week 3)*
*Source: Video 3 (Types of AI)*

| Day | Post Title |
|-----|-----------|
| Mon | The AI Spectrum: One Technology, Three Stages |
| Tue | ANI — The AI Running Your Tools Right Now |
| Wed | AGI — The AI We're Still Building Toward |
| Thu | ASI — The AI That Raises Hard Questions |
| Fri | **What This Means for IT:** Where AI Sits Today — and Where It's Headed |

> **Writer note:** Agent 1 — the ML learning cycle from Week 3 Thu sets up the question "how far can this go?" which Week 4 Mon answers with the spectrum. ANI (Tue) should explicitly name tools the audience uses: chatbots, voice assistants, recommendation engines. ASI (Thu) is not scaremongering — frame it as a theoretical boundary that informs safety and ethics discussions later.

### Week 5: The ML Classification System
*Source: Video 5 (Types of ML Systems)*

| Day | Post Title |
|-----|-----------|
| Mon | The ML Marketplace: Three Ways to Classify Machine Learning Systems |
| Tue | Four Ways Machines Learn — and When to Use Each One |
| Wed | Online vs. Batch Learning: How Models Stay Current |
| Thu | Instance-Based vs. Model-Based: Two Ways Machines Generalise |
| Fri | **What This Means for IT:** Picking the Right ML Architecture for the Problem |

> **Writer note:** V1 only covered 1 of 3 classification axes from Video 5 — supervision type. This week now covers all three: (Mon) overview of all three axes via marketplace metaphor; (Tue) supervision type (supervised/unsupervised/semi/RL); (Wed) learning adaptability (online = real-time updates, batch = pre-collected training); (Thu) generalisation approach (instance-based = lookup against stored examples, model-based = trained predictive function). These distinctions matter to IT architects choosing ML infrastructure.

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
| Fri | **What This Means for IT:** Your Email Filter Is a Supervised Learner |

> **Writer note:** Mon uses the "vigilant guard checking badge clearances" framing from Video 6 — security metaphor that maps directly to IT instincts. Thu explicitly names tools from Video 6 (Linear Regression, Logistic Regression, Decision Trees, Random Forests, XGBoost, LightGBM) — this is what IT professionals will search for when they encounter ML systems. Spam detection moved from this week (it appeared in Week 3) to the Recap as the IT-relevant example.

### Week 7: Unsupervised Learning
*Source: Video 7 (Unsupervised Learning)*

| Day | Post Title |
|-----|-----------|
| Mon | No Labels, No Problem — What Unsupervised Learning Actually Does |
| Tue | Clustering: How Retailers Find Groups Nobody Told Them Existed |
| Wed | Too Many Variables? How ML Finds the Ones That Actually Matter |
| Thu | Anomaly Detection: The Same Math That Catches Network Intruders |
| Fri | **What This Means for IT:** Pattern Detection in Systems You Already Manage |

> **Writer note:** Wed covers dimensionality reduction (PCA, Kernel PCA, LLE from Video 7) — entry point is the IT problem ("too many variables in your logs?"), not the academic term. Thu is a high-value IT-angle post: anomaly detection from Video 7 maps directly to SIEM, network intrusion detection, and behavioural baselines that IT teams operate daily. Customer segmentation (originally Thu) is folded into Tue's clustering post as a concrete example.

### Week 8: Semi-Supervised & Reinforcement Learning
*Source: Video 8 (Semi-supervised and Reinforcement Learning)*

| Day | Post Title |
|-----|-----------|
| Mon | The Best of Both Worlds: Semi-Supervised Learning |
| Tue | Medical Imaging: Where Labels Are Expensive |
| Wed | Reinforcement Learning — The Trial and Error Machine |
| Thu | AlphaGo: How a Machine Mastered an Ancient Game |
| Fri | **What This Means for IT:** Systems That Improve Without Being Reprogrammed |

> **Writer note (tonal flag from Agent 1):** Thu ends on a triumphant high — AlphaGo as a pinnacle of RL. Week 9 Mon opens with "When ML Fails." This tonal contrast is intentional — hubris before humility — but writers must lean into it explicitly on Week 9 Mon rather than paper over it. Video 9's own opening frames challenges as "a path lined with pitfalls that can trip even the most carefully designed models," which is the direct counter to AlphaGo's narrative.

---

## Chapter 4 — When Machines Fail *(Weeks 9–10)*

*Previously a single week. Expanded to two because Videos 9–10 together cover 11 distinct concepts. V1 allocated 4 content days to this material.*

### Week 9: The Data Side of ML Failure
*Source: Video 9 (Challenges of ML — Part I)*

| Day | Post Title |
|-----|-----------|
| Mon | When ML Fails: It Usually Starts with the Data |
| Tue | Garbage In, Garbage Out — Data Quality and Sampling Bias |
| Wed | Bias and Representation: Who Gets Left Out of the Training Set? |
| Thu | Feature Engineering: Turning Raw Data into Signal |
| Fri | **What This Means for IT:** Your Data Pipeline Shapes What the Model Knows |

> **Writer note:** Tue covers two concepts from Video 9 — poor data quality (outliers, errors, missing values) and non-representative data (sampling bias, life satisfaction vs. GDP example from Video 9). Wed connects directly to the broader AI ethics conversation in Week 12 — plant this seed early. Thu introduces feature engineering (extraction, selection, creation) from the end of Video 9 — this is the craft of deciding what the model sees.

### Week 10: The Model Side of ML Failure
*Source: Video 10 (Challenges of ML — Part II)*

| Day | Post Title |
|-----|-----------|
| Mon | When ML Fails: The Model Itself Is the Problem |
| Tue | When Your Model Memorises Instead of Learns — and When It's Too Dumb to Try |
| Wed | How to Fix Overfitting: Three Strategies That Actually Work |
| Thu | Validation Sets, Cross-Validation, and Hyperparameter Tuning |
| Fri | **What This Means for IT:** Testing ML Models Like You Test Production Systems |

> **Writer note:** Tue is the problem statement (overfitting/underfitting). Wed delivers Video 10's explicit three-strategy remediation: simplify the model, enrich the dataset, clean the noise. Thu introduces the validation toolkit from Video 10 — test sets, generalisation error, validation sets, cross-validation, hyperparameter tuning. This is what separates a deployed ML system from a prototype. Fri draws the parallel between model validation and system testing — an IT-native concept.

---

## Chapter 5 — AI in the Wild *(Week 11)*

*Previously 2 weeks (Applications + Case Studies). Condensed to 1 week because Video 11 covers both topics organically. The freed week was allocated to Challenges (Chapter 4).*

### Week 11: How AI Reshapes Industries
*Source: Video 11 (How AI Revolutionises Industries)*

| Day | Post Title |
|-----|-----------|
| Mon | From Lab to World: AI Is No Longer Experimental |
| Tue | NLP and Computer Vision: How Machines Read, See, and Listen |
| Wed | AI in the Pipes: How Automation Is Changing What IT Infrastructure Does |
| Thu | 40% Fewer Account Takeovers and $2.5M Saved — What the Models Were Actually Doing |
| Fri | **What This Means for IT:** The Business Cases You'll Be Asked to Support |

> **Writer note (bridge post — Agent 1):** Mon is a deliberate pivot post. The audience has just spent two weeks on failure modes. Mon signals "now we see what it's worth when it works." It draws from Video 11's opening framing ("AI and ML are more than just buzzwords — they are the engine driving innovation"). Tue combines NLP and Computer Vision into one post (translation, transcription, facial recognition, OCR, video analysis). Wed focuses on process automation through an IT lens — smart buildings, energy grids, supply chains, automated contact centres, warehouse robotics from Video 11. Thu combines the two strongest case studies: biometric authentication (40% fewer account takeovers) and sales forecasting ($2.5M saved) — emphasis on *what the model was checking*, not just the outcome. The 30% engagement / market segmentation result is folded into Fri recap.

> **Writer note (tonal flag from Agent 1):** Week 11 ends on wins. Week 12 opens with "AI Inherits Our Biases." Writers should use Week 12 Mon to first acknowledge those wins before introducing the shadow side — mirror Video 12's own structure ("AI has become integral... promising transformative advances. However...").

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

> **Writer note:** Mon is the pivot from Week 11's success stories — do not open Week 12 cold on bias. Acknowledge the wins, then introduce the shadow. Tue focuses on the source's specific gender bias content (search engine results reinforcing stereotypes). Wed reframes transparency/explainability as a governance and accountability problem — directly relevant to IT professionals in regulated environments who must audit or certify AI-assisted decisions (Video 12). Thu covers privacy and security from Video 12 — data handling, sensitive data misuse.

### Week 13: Module Wrap-Up + Demo
*Source: Video 13 (Module Summary), Videos 14.1/15 (Demo — Real Estate Delinquency Prediction)*

| Day | Post Title |
|-----|-----------|
| Mon | From Buzzword to Blueprint: The Full Picture After Module 1 |
| Tue | The Full ML Pipeline: EDA, Preprocessing, Training, and Evaluation |
| Wed | Real Estate Delinquency Prediction: Walking Through a Real ML Project |
| Thu | What Module 2 Will Unlock |
| Fri | **Module 1 Final:** The Blueprint Is Set |

> **Writer note:** Mon draws from Video 13's summary — not a list, but a narrative close that ties the five-chapter arc together. Tue/Wed cover the demo content (Videos 14.1/15) which runs EDA, data processing, model training, evaluation, and a Dash application — these are richer takeaways than a generic "theory to practice" post. The demo's actual subject is real estate customer delinquency prediction (classification). Thu is a forward-looking post that seeds Module 2 curiosity without revealing its content — Video 13's closing sets this up.

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

## Council Confidence Scores (After V2 Changes Applied)
| Agent | V1 Score | Projected V2 Score |
|-------|----------|-------------------|
| Agent 1 — Narrative Flow | 7.0 / 10 | ~8.5 / 10 |
| Agent 2 — Content Coverage | 4.0 / 10 | ~7.5 / 10 |
| Agent 3 — Audience Fit | 6.5 / 10 | ~8.0 / 10 |
