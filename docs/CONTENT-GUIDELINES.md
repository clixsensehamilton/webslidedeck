# Content Guidelines

Rules for writing and maintaining post scripts in this series. Follow these when editing existing scripts or creating new ones.

---

## Governance Rule (Non-Negotiable)

Every factual claim in every post must be traceable to a source video in:
`docs/plans/module1-content-inventory.md`

This file contains the full Module 1 transcript and summary deck text.

**You may NOT:**
- Introduce concepts not present in the source material
- Copy or closely paraphrase source text
- Add external examples not from the module

**You MAY:**
- Reframe, reorder, and rewrite concepts in original language
- Choose which examples from the source to highlight
- Add IT-specific framing if the concept maps to an IT context

---

## Audience

**IT professionals.** They:
- Manage systems, networks, infrastructure
- Know buzzwords (ML, neural networks, AI) but not mechanics
- Have debugged production issues, written scripts, maintained rules-based systems
- Do NOT need explaining what a server is, what an API is, what a firewall is

**Write for them specifically, not for a general audience.**

---

## Tone Rules

| Do | Don't |
|----|-------|
| Lead with the consequence or the problem | Lead with the academic term |
| Use IT-native analogies (ACLs, SIEM, pipelines) | Use MBA-speak ("transform your business") |
| Name specific tools (XGBoost, K-Means, PCA) | Stay vague ("advanced algorithms") |
| Be direct and confident | Hedge everything ("this might be...") |
| Say something specific every sentence | Write filler ("AI is changing everything") |

---

## Script Format

See `content/module-1/SCRIPT-TEMPLATE.md` for the full template.

### Required Sections
```
---frontmatter---
## Hook
## Scene 1 — [Title]
## Scene 2 — [Title]
## Scene 3 — [Title]
## Takeaway
## Visual Direction
```

### Optional
```
## Scene 4 — [Title]   (only if topic genuinely needs it)
```

### Scene Count by Post Type
| Post type | Scenes |
|-----------|--------|
| Monday (intro/hook post) | 3–4 |
| Tuesday–Thursday (deep dive) | 3–4 |
| Friday ("What This Means for IT") | 3 max |
| Case study posts | 3 |

---

## Scene Writing Rules

- **Hook:** 1–2 sentences. Creates immediate curiosity or tension. No setup — straight to the point.
- **Scenes:** 2–4 sentences each. One idea per scene. Think: problem → mechanism → example → implication.
- **Takeaway:** One sentence. Bold and punchy. What the reader walks away knowing.
- **Visual Direction:** 2–4 sentences for the developer. Describe what the scroll animation should show.

---

## Frontmatter Fields

```yaml
---
week: 1                                          # Week number (1–13)
day: 1                                           # Day number (1–65)
weekday: Monday                                  # Day of week
chapter: "Chapter 1 — The World Has Changed"    # Chapter name
source_video: "Video 1: Module Overview"         # Source video
post_title: "The Full Post Title Here"           # Exact post title from V3 lineup
series_tag: "#AIMLSeries #Module1"              # Tags
---
```

---

## Chapter-Specific Notes

### Chapter 1 (Weeks 1–2): The World Has Changed
- Source: Videos 1, 2
- Key angle: IT already operates inside this stack — they're not outsiders looking in

### Chapter 2 (Weeks 3–5): What We Built
- Source: Videos 3, 4, 5
- Week 3 is Intro to ML (Video 4), Week 4 is Types of AI (Video 3) — this order is intentional
- Week 5 covers ALL THREE axes of Video 5 (supervision type, online/batch, instance/model-based)

### Chapter 3 (Weeks 6–8): How Machines Learn
- Source: Videos 6, 7, 8
- Week 6 Fri: Do NOT retell the spam filter story (that's Week 3) — use Video 6 examples only
- Week 7 Tue: Must include Association Rule Learning (Apriori, Eclat) alongside clustering
- Week 7 Thu: Anomaly detection → connect to SIEM, network intrusion, behavioural baselines

### Chapter 4 (Weeks 9–10): When Machines Fail
- Source: Videos 9, 10
- Week 9 Mon: Must reference Week 8's AlphaGo triumph explicitly before pivoting to failure
- Week 9 Tue: Cover THREE failure modes — data volume, data quality, sampling bias (distinct)
- Week 9 Thu: Feature Engineering is diagnostic craft, not just a setup step
- Week 10 Fri: Draw explicit parallel between ML validation and IT production deployment

### Chapter 5 (Week 11): AI in the Wild
- Source: Video 11
- Condensed from 2 weeks to 1 — covers applications AND case studies
- Day 51 Mon is a bridge post — audience just finished 2 weeks of failure modes
- Day 55 Fri: NOT triumphalist — Week 12 opens on ethics/bias

### Chapter 6 (Weeks 12–13): The Reckoning
- Source: Videos 12, 13, 14.1, 15
- Week 12 Mon: Acknowledge Week 11 wins BEFORE introducing bias/ethics shadow side
- Week 13 Thu: Open questions Module 1 leaves unanswered — intellectually honest, not a Module 2 teaser
- Week 13 Fri: Capability statement — what IT professionals can now ask/answer about any AI system

---

## Scheduling Logic

Posts unlock weekdays only (Mon–Fri). Day 1 = series start date.

| Day number | Maps to |
|-----------|---------|
| 1–5 | Week 1 (Mon–Fri) |
| 6–10 | Week 2 (Mon–Fri) |
| ... | ... |
| 61–65 | Week 13 (Mon–Fri) |

Weekends are skipped. The app calculates the calendar date for each day number automatically.

**Series start date:** Configured in `config/series.ts` as `SERIES_START_DATE`.

---

## Adding New Modules

When Module 2 content is ready:
1. Add source PDFs to `Resources/Module 2/`
2. Extract content to `docs/plans/module2-content-inventory.md`
3. Run the lineup planning process (use council review pattern from Module 1)
4. Create scripts in `content/module-2/` using the same structure
5. Update `config/series.ts` with Module 2 start date
