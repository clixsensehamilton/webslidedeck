# Project Overview

## What We're Building

A daily scrollytelling infographic web app that teaches AI and Machine Learning to IT professionals — one post per day, one concept per post, across a full year.

The series is divided into 4 modules (one per quarter). This repository currently contains **Module 1: Overview of AI and ML**.

---

## The Series

| Module | Theme | Quarter |
|--------|-------|---------|
| Module 1 | Overview of AI and ML | Q1 (13 weeks, 65 posts) |
| Module 2 | TBD | Q2 |
| Module 3 | TBD | Q3 |
| Module 4 | TBD | Q4 |

---

## Target Audience

**IT professionals at a company.**

- Technically literate: comfortable with systems, software, networking, data pipelines
- Familiar with AI buzzwords (ChatGPT, machine learning, neural networks)
- Have NOT gone deep on how any of it actually works
- This series fills that gap: the mechanics, not just the marketing

**Writing tone:** Confident, not condescending. Technical-adjacent, not academic. Every post should feel like it was written for someone who manages systems for a living — not for a data science student.

---

## Source Materials (Module 1)

Located in `Resources/Module 1/`:

| File | Purpose |
|------|---------|
| `AIM_AIML_Module 1_Transcripts.pdf` | Full lecture transcripts — primary source |
| `AIM _AIML_M1_Summary Deck.pdf` | Summary slide deck |
| `AIM_AIML_Module 1_Study Material.pdf` | Study guide |

**Governance rule:** All post content must be traceable to a source video from the transcripts. Content is original — never copied or closely paraphrased. The source informs the concept; the writing is original.

---

## Module 1 Structure

**13 weeks / 65 posts / 6 chapters**

| Chapter | Weeks | Posts | Theme |
|---------|-------|-------|-------|
| 1 — The World Has Changed | 1–2 | 10 | Data Science foundation + AI/ML/DL stack |
| 2 — What We Built | 3–5 | 15 | ML intro → Types of AI → ML classification |
| 3 — How Machines Learn | 6–8 | 15 | Supervised → Unsupervised → Semi/RL |
| 4 — When Machines Fail | 9–10 | 10 | Data problems → Model problems |
| 5 — AI in the Wild | 11 | 5 | Applications + Case Studies |
| 6 — The Reckoning | 12–13 | 10 | Ethics + Module wrap-up + Demo |

**Approved lineup:** `docs/plans/2026-04-14-module1-topic-lineup-v3.md`

---

## Content Format

Each post script follows the template in `content/module-1/SCRIPT-TEMPLATE.md`:

```
Frontmatter (week, day, weekday, chapter, source_video, post_title)
## Hook         — 1-2 punchy opening sentences
## Scene 1      — First scroll reveal
## Scene 2      — Second scroll reveal
## Scene 3      — Third scroll reveal
## Scene 4      — Optional fourth reveal
## Takeaway     — One bold closing sentence
## Visual Direction — Notes for designer/developer
```

**Friday posts** ("What This Means for IT") use 3 scenes max — they are synthesis posts, not teaching posts.

---

## Scheduling

Posts unlock one per day, weekdays only (Mon–Fri). The series started at Week 1, Day 1. The web app reads the current date and shows only posts up to today.

- Future posts: visually locked, show "Coming [date]"
- Direct URL to locked content: 404 page with "Back to Home"
- No server required — date check happens client-side at render time

---

## Deployment

| Target | Method | Use |
|--------|--------|-----|
| Vercel | Standard Next.js deploy | Public/cloud access |
| Docker | Local network container | Internal company network |
