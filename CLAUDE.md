# CLAUDE.md — AI/ML Infographic Series Project

This file is the primary context document for Claude Code sessions on this project. Read this first, then read the linked docs as needed.

---

## What This Project Is

A **daily scrollytelling infographic web app** for an AI and Machine Learning educational series. Content is posted one day at a time to a custom-built website for an IT professional audience at a company.

- **65 posts** across **Module 1** (13 weeks, 6 chapters)
- Posts unlock daily — future posts are soft-gated (visually locked, "Coming [date]")
- Built as a scrollytelling experience: each post expands inline with GSAP scroll-driven animations
- Content is original — based on source lecture materials but never copied/paraphrased

**See:** [`docs/PROJECT-OVERVIEW.md`](docs/PROJECT-OVERVIEW.md)

---

## Current State (as of 2026-04-15)

| Phase | Status |
|-------|--------|
| Content planning (topic lineup) | ✅ Complete — V3 approved |
| Script generation (65 posts) | ✅ Complete — all scripts written |
| Web app design | 🔄 In progress — brainstorming complete, awaiting writing-plans |
| Web app implementation | ❌ Not started |
| Deployment | ❌ Not started |

**Scripts location:** `content/module-1/` — 65 `.md` files organized by chapter and week
**Design docs:** `docs/plans/` — lineup V1/V2/V3, content inventory
**Web app design:** `docs/ARCHITECTURE.md` — full web app spec (approved by user)

---

## Tech Stack (Decided)

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 15 App Router | SSR + static, best for soft-gating |
| Animation | GSAP + ScrollTrigger | Industry standard for scroll-driven reveal |
| 3D Hero | React Three Fiber (Three.js) | Seedance-style particle + neural network hero |
| Styling | Tailwind CSS v4 | Utility-first, fast |
| Markdown | gray-matter + remark | Frontmatter parsing + body rendering |
| Deployment | Vercel (cloud) + Docker (local network) | Dual deployment target |

---

## Repository Structure

```
webslidedeck/
├── CLAUDE.md                          ← You are here
├── Resources/
│   └── Module 1/                      ← Source PDFs (transcripts, deck, study material)
├── content/
│   └── module-1/
│       ├── SCRIPT-TEMPLATE.md         ← Template for all post scripts
│       ├── chapter-1-the-world-has-changed/
│       │   ├── week-01-why-ai-why-now/
│       │   │   ├── day-01-mon-*.md
│       │   │   └── ... (5 files)
│       │   └── week-02-the-ai-ml-dl-stack/
│       ├── chapter-2-what-we-built/
│       ├── chapter-3-how-machines-learn/
│       ├── chapter-4-when-machines-fail/
│       ├── chapter-5-ai-in-the-wild/
│       └── chapter-6-the-reckoning/
├── docs/
│   ├── PROJECT-OVERVIEW.md            ← Audience, goals, tone
│   ├── ARCHITECTURE.md                ← Full web app design spec
│   ├── CONTENT-GUIDELINES.md          ← Writing rules, governance
│   └── plans/
│       ├── 2026-04-14-module1-topic-lineup-v1.md
│       ├── 2026-04-14-module1-topic-lineup-v2.md
│       ├── 2026-04-14-module1-topic-lineup-v3.md  ← APPROVED lineup
│       └── module1-content-inventory.md           ← Full transcript + deck text
└── [web app files — not yet created]
```

---

## Key Decisions Log

| Decision | Choice | Reason |
|----------|--------|--------|
| Content chunking | Topic-per-week (B) + narrative energy (C) hybrid | Sustainable + engaging |
| Series arc | 6 chapters, 13 weeks, 65 posts | Maps to Module 1 source videos exactly |
| Audience tone | Confident, technical-adjacent, IT-specific framing | IT pros know buzzwords, not mechanics |
| Recap days | "What This Means for IT" Fridays | Generic summaries waste Friday on IT audience |
| Week 3/4 order | ML Intro (Wk3) before Types of AI (Wk4) | Must understand learning before the AI spectrum |
| Challenges coverage | 2 weeks (Wk9 data, Wk10 model) | Videos 9–10 cover 11 distinct concepts |
| Web app routing | Chapter-per-route (`/series/chapter-[n]`) | GSAP performance, clean URLs |
| Scheduling | Soft-gate client-side, 404 on direct URL to locked content | No server needed, simple deployment |
| 3D hero style | Particle field → neural network emergence (A+B combo) | Seedance-style, topic-relevant |
| Deployment | Vercel + Docker (local network) | Cloud + internal network dual target |

---

## What To Do Next

The brainstorming session is complete. The next step is:

1. **Run the `writing-plans` skill** to create a detailed implementation plan for the web app
2. Then implement: Next.js app → content parser → routing → GSAP animations → 3D hero → Docker

**When resuming, read:**
- This file (CLAUDE.md) — current state
- `docs/ARCHITECTURE.md` — full web app design
- `docs/CONTENT-GUIDELINES.md` — content rules
- `docs/plans/2026-04-14-module1-topic-lineup-v3.md` — approved post lineup
- `content/module-1/SCRIPT-TEMPLATE.md` — script format

---

## GitHub

**Remote:** https://github.com/clixsensehamilton/webslidedeck.git
**Branch:** `main`
