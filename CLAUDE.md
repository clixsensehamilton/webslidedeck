# CLAUDE.md — AI/ML Series Project

Primary context for Claude Code sessions. Read this first.

---

## What This Project Is

A **daily terminal-style scrollytelling web app** for an AI and Machine Learning educational series. Content is posted one weekday at a time. The UI is a full interactive terminal experience — not a traditional website.

- **65 posts** across **Module 1** (13 weeks, 6 chapters)
- Posts unlock daily — future posts are soft-gated by date
- Landing page: interactive terminal (`TerminalLanding`) — user types commands to navigate
- Post view: terminal boot sequence + scroll-driven scene panels (`TerminalPost`)
- Built for IT professionals — the terminal aesthetic is intentional

---

## Repository Structure

```
aim_repo/
├── CLAUDE.md                        ← You are here
├── docker-compose.yml               ← Builds from web/, mounts content/
│
├── web/                             ← Next.js app (all app code lives here)
│   ├── src/
│   │   ├── app/                     ← Next.js App Router pages
│   │   │   ├── layout.tsx           ← Root layout (no providers needed)
│   │   │   ├── page.tsx             ← Landing → TerminalLanding
│   │   │   ├── globals.css          ← Terminal CSS tokens + scanlines
│   │   │   ├── not-found.tsx        ← 404 page
│   │   │   └── series/
│   │   │       ├── page.tsx         ← Chapter listing
│   │   │       └── [chapter]/
│   │   │           ├── page.tsx     ← Chapter detail (server component)
│   │   │           └── [slug]/
│   │   │               └── page.tsx ← Individual post (TerminalPost)
│   │   ├── components/
│   │   │   ├── terminal/            ← All terminal UI components
│   │   │   │   ├── TerminalLanding.tsx   ← Interactive terminal landing
│   │   │   │   ├── TerminalPost.tsx      ← Full post experience wrapper
│   │   │   │   ├── TerminalBoot.tsx      ← Boot sequence animation
│   │   │   │   ├── TerminalScene.tsx     ← Individual scene panel
│   │   │   │   └── TerminalTakeaway.tsx  ← Session summary / closing
│   │   │   └── series/
│   │   │       └── PostCard.tsx          ← Post list item (chapter view)
│   │   ├── lib/
│   │   │   ├── content.ts           ← Markdown parser (reads from content/)
│   │   │   └── scheduling.ts        ← Post availability by date
│   │   └── config/
│   │       └── series.ts            ← Series start date, total posts
│   ├── public/
│   ├── Dockerfile
│   ├── package.json
│   ├── next.config.ts               ← standalone output for Docker
│   └── tsconfig.json                ← @/* → src/*
│
├── content/                         ← Markdown source files (never in web/)
│   └── module-1/
│       ├── SCRIPT-TEMPLATE.md
│       ├── chapter-1-the-world-has-changed/
│       │   ├── week-01-why-ai-why-now/      (5 posts)
│       │   └── week-02-the-ai-ml-dl-stack/  (5 posts)
│       └── chapter-[2-6]-*/
│
├── docs/                            ← Project documentation
│   ├── ARCHITECTURE.md              ← Current tech design
│   ├── PROJECT-OVERVIEW.md          ← Audience, goals, tone
│   ├── CONTENT-GUIDELINES.md        ← Writing rules
│   └── plans/
│       ├── 2026-04-14-module1-topic-lineup-v3.md   ← APPROVED lineup
│       └── module1-content-inventory.md             ← Full content index
│
└── resources/                       ← Source PDFs (reference only)
    └── Module 1/
```

---

## Current State (as of 2026-04-17)

| Area | Status |
|------|--------|
| Content (65 posts) | ✅ Complete |
| Terminal landing page | ✅ Working — interactive CLI with commands |
| Terminal post view | ✅ Working — boot + scenes + takeaway |
| Chapter/series pages | ✅ Done — terminal style, keyboard nav, real post routes |
| Scene graphics | ✅ Content-driven — network/cascade/checklist/comparison modes |
| Progress/save system | ❌ Not started — Bomber Man code idea |
| Deployment | ❌ Not started |

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 App Router |
| Styling | Tailwind CSS v4 + terminal CSS tokens |
| Animation | GSAP + IntersectionObserver |
| Markdown | gray-matter + remark |
| Fonts | Geist + Geist Mono |
| Deployment | Docker (standalone) + Vercel |

---

## Terminal Design System

All terminal styles are in `web/src/app/globals.css`:

| Token | Value | Use |
|-------|-------|-----|
| `--term-bg` | `#0a0a0a` | Background |
| `--term-green` | `#00ff41` | Primary text, output |
| `--term-cyan` | `#00f5ff` | Commands, highlights |
| `--term-amber` | `#ff6b35` | Warnings, stats, day numbers |
| `--term-muted` | `#4a4a4a` | Dim/secondary text |

CSS classes: `.term-green`, `.term-cyan`, `.term-amber`, `.term-dim`, `.term-bright`
Glow classes (use sparingly): `.term-glow-green`, `.term-glow-cyan`, `.term-glow-amber`
CRT overlay: `.terminal-root::before` (scanlines), `.terminal-root::after` (vignette)
Cursor: `.cursor` (CSS blink animation on `▋`)

---

## Content-Driven Scene Generation — Non-Negotiable Rules

Every terminal scene graphic must be derived from the **actual post content**, not invented from generic keywords or templates. Before touching any scene-rendering code, read the source markdown.

### Before writing or modifying scene graphics

1. **Read the post markdown first** — the file in `content/module-1/chapter-*/week-*/day-*.md`
2. **Trace the story arc** — Hook → Scene 1 → Scene 2 → ... → Takeaway form a single coherent argument. Each scene builds on the last.
3. **Identify what each scene is actually doing** — is it introducing a problem? showing a failure? listing outcomes? making a comparison? That determines the graphic mode.
4. **Extract real entities from the text** — system names, people, concepts, stats. Never invent labels that don't appear in or logically follow from the content.
5. **Check narrative continuity** — Scene 2's graphic should reference entities introduced in Scene 1. Scenes should feel like chapters of one story, not independent slides.

### Graphic mode selection (`detectMode`)

Choose mode based on what the scene is **arguing**, not just which keywords appear:

| Mode | Use when the scene is... |
|------|--------------------------|
| `network` | Showing a landscape of systems/components and their relationships |
| `cascade` | Describing a failure chain, incident, or cause-and-effect breakdown |
| `checklist` | Listing objectives, outcomes, curriculum items, or "what you will learn" |
| `comparison` | Contrasting two states, approaches, or perspectives |
| `text` | Explaining a concept without a clear structural form |

If a scene contains both infrastructure language AND failure language, `cascade` wins — failure is the story, infrastructure is the setting.

### What bad looks like (never do this)

- Showing `[ML PIPELINE] ─────▶ [CHOKE]` on a scene about IT professionals not understanding their stack — the label "CHOKE" is not the point, the *consequence* is
- Displaying `ANOMALY_DET │ ML_PIPELINE` as the network when the content lists email filters, ticket routers, and anomaly monitors — use the actual systems from the text
- Splitting a prose sentence into checklist items when the content is explaining a concept, not listing objectives
- Right-padding cascade steps with `.padStart(50)` making them unreadable — always left-align incident logs

### What good looks like

- Scene 1 introduces EMAIL_FILTER, TICKET_ROUTER, ANOMALY_DETECT from the text → network shows those exact systems
- Scene 2 says "chokes on a pipeline, hits a resource limit, broke downstream" → cascade log shows `ML_PIPELINE hits resource ceiling` → `processing queue backs up` → `on-call paged — no runbook for ML failure`
- Scene 3 says "it's about developing X, ask Y, evaluate Z" → checklist shows those three clauses as objectives
- Scene 4 contrasts "flying blind" vs "managing deliberately" → comparison table with those exact headers

---

## Key Decisions

| Decision | Choice | Reason |
|----------|--------|--------|
| UI style | Interactive terminal (not infographic) | IT audience, unique, memorable |
| Landing | CLI with real commands (start/help/chapters/about) | Users type to navigate, not scroll |
| Post view | Boot sequence → scenes stream in on scroll | Cinematic, feels like running a real tool |
| Content path | `../content/` relative to `web/` | Clean separation, env var override for Docker |
| Routing | `/series/chapter-[1-6]` | Standard Next.js dynamic segment |
| Scheduling | `isPostAvailable()` — DEV MODE = always true | Restore for production |
| Progress | Bomber Man-style session codes | No auth, no DB — simple and clever |

---

## Running Locally

```bash
cd web
npm install
npm run dev       # starts on :3000
```

Routes:
- `/`                                   → Interactive terminal landing
- `/series`                             → Chapter listing (keyboard nav)
- `/series/chapter-1`                   → Chapter 1 post listing (keyboard nav)
- `/series/chapter-1/day-01-mon-...`    → Individual post (TerminalPost)

---

## What To Do Next

1. **Build progress/save system** — Bomber Man session code generator (no auth, no DB)
2. **Restore date-gating** — flip `isPostAvailable` back to real date check for production
3. **Deploy** — Docker build from `web/`, mount `content/`

---

## GitHub

**Remote:** https://github.com/clixsensehamilton/webslidedeck.git
**Branch:** `main`
