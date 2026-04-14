# Web App Architecture

**Status:** Design approved. Implementation not yet started.
**Next step:** Run `writing-plans` skill to generate implementation plan.

---

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Framework | Next.js App Router | 15.x |
| 3D / Hero | React Three Fiber + Three.js | Latest |
| Animation | GSAP + ScrollTrigger | 3.x |
| Styling | Tailwind CSS | v4 |
| Markdown | gray-matter + remark | Latest |
| Deployment A | Vercel | — |
| Deployment B | Docker + docker-compose | — |

---

## Routing Structure

```
/                          → Landing page (3D hero + series intro)
/series                    → Chapter overview feed
/series/chapter-[n]        → Chapter detail with hybrid-expand posts
```

**404 behavior:**
- Direct URL to locked chapter → `notFound()` → 404 page with "Back to Home" button
- Direct URL to available chapter with no unlocked posts → redirect to `/series`

---

## Landing Page Design

### Hero Section (Full Viewport)
**Style:** Seedance-inspired 3D immersive animation — dark background, electric blue/teal accents

**3D Animation — 4 Phases:**

1. **Chaos** — Thousands of particles float in slow turbulence. No pattern. Raw data.
2. **Emergence** (auto-triggered ~3s in) — Particles drift toward fixed 3D positions, connections appear between them. Particles *become* neural network nodes. Network breathes — nodes pulse, edge weights flow as light traces along connections.
3. **Interaction** — Mouse movement creates gravity well. Nearby particles are pulled toward cursor, distorting the network locally, snapping back on release.
4. **Scroll-down** — 3D network recedes and shrinks into background texture as page content scrolls over it.

**Tech:** React Three Fiber for 3D scene, custom shaders for particle-to-node transition, GSAP for scroll phase.

**Hero text (layered over 3D):**
- Series tag — small caps, top left
- "AI & ML" — massive display type
- "A Series for IT Professionals" — subtitle
- Animated typewriter: `"65 posts. 13 weeks. 1 module."` (GSAP TextPlugin)
- CTA: `[ Enter the Series → ]` — subtle pulse animation
- Scroll hint indicator ↓

### Below Hero
**3-panel strip** (scrolls in from sides):
- Panel 1: "One concept a day"
- Panel 2: "Built for how IT thinks"
- Panel 3: "Scroll to learn"

**Chapter map teaser** (stagger-in cards):
- 6 chapter cards showing: chapter name, week range, locked/unlocked state
- CTA: "Start Module 1 →" → navigates to `/series`

---

## Series Feed (`/series`)

Chapter overview page. Shows all 6 chapters as cards.

**Chapter card (unlocked):**
```
┌─────────────────────────────────────────┐
│ Chapter 1 — The World Has Changed       │
│ Weeks 1–2 · 10 posts · 8 unlocked       │
│ ████████░░  [Continue →]                │
└─────────────────────────────────────────┘
```

**Chapter card (locked):**
```
┌─────────────────────────────────────────┐
│ 🔒 Chapter 3 — How Machines Learn       │
│ Unlocks Week 6                          │
└─────────────────────────────────────────┘
```

Progress bar = unlocked posts / total posts in chapter.

---

## Side Drawer

Slides in from left. Triggered by hamburger `[≡]` icon (visible on all `/series` routes).

```
┌────────────────────┐
│ ✕  Module 1        │
│ ─────────────────  │
│ ● Ch 1 — Changed   │  ← fully unlocked
│ ● Ch 2 — Built     │  ← partially unlocked
│ ◐ Ch 3 — Learns    │  ← few posts unlocked
│ 🔒 Ch 4 — Fails    │  ← locked
│ 🔒 Ch 5 — Wild     │
│ 🔒 Ch 6 — Reckoning│
│ ─────────────────  │
│ Overall progress   │
│ ████░░░░░░  4/13wk │
└────────────────────┘
```

- Clicking a chapter navigates to `/series/chapter-[n]`
- Locked chapters are not clickable
- Drawer closes on navigation or overlay click

---

## Chapter Detail Page (`/series/chapter-[n]`)

### Post Cards — Collapsed State
```
┌─ DAY 01 · MON ──────────────────────────┐
│  The Question Every IT Professional...  │
│  [Hook preview — first line only]       │
│                              [Read ↓]   │
└─────────────────────────────────────────┘
```

### Post Cards — Locked State
```
┌─ DAY 03 · WED 🔒 ───────────────────────┐
│  ████████████████ [blurred title]       │
│  Coming Wednesday, Apr 16               │
└─────────────────────────────────────────┘
```

### Post Cards — Expanded State (Hybrid Expand)
Only one post can be expanded at a time.

```
┌─ DAY 01 · MON — EXPANDED ───────────────┐
│                                         │
│  ◎ HOOK                                 │
│  [Fades up immediately on expand]       │
│                                         │
│  ━━ SCENE 1 ━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [Scroll to reveal — text animates in]  │
│                                         │
│  ━━ SCENE 2 ━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [Next scroll reveal]                   │
│                                         │
│  ━━ SCENE 3 ━━━━━━━━━━━━━━━━━━━━━━━━━  │
│  [Next scroll reveal]                   │
│                                         │
│  ◎ TAKEAWAY                             │
│  [Larger type, slower reveal, glow]     │
│                                         │
│                              [Done ↑]   │
└─────────────────────────────────────────┘
```

### GSAP ScrollTrigger Behavior (inside expanded post)
1. Post card clicked → height animates open (GSAP `to` height)
2. Hook fades up immediately on open
3. Each `## Scene` section: pinned briefly as user scrolls — text animates in line by line
4. `## Takeaway`: larger type, slower reveal, subtle glow pulse
5. `[Done ↑]` button: collapses card, scroll position returns to card location
6. Opening a new card collapses the currently open one first

---

## Content Parsing

Scripts are `.md` files with frontmatter + section headers.

**Frontmatter fields used by the app:**
```yaml
week: 1
day: 1
weekday: Monday
chapter: "Chapter 1 — The World Has Changed"
source_video: "Video 1: Module Overview"
post_title: "The Question Every IT Professional Should Be Asking"
series_tag: "#AIMLSeries #Module1"
```

**Body parsing:**
- `## Hook` → hook component
- `## Scene N — Title` → scene array (drives scroll panels)
- `## Takeaway` → takeaway component
- `## Visual Direction` → metadata only (not rendered to users)

**Scheduling logic:**
```typescript
// Post is available if:
const postDate = getPostDate(day) // day 1 = series start date
const isAvailable = postDate <= new Date()
```

Series start date is a config constant. Day number maps to calendar date (weekdays only, skip weekends).

---

## Scheduling Config

```typescript
// config/series.ts
export const SERIES_START_DATE = new Date('2026-04-14') // Day 1 = Monday
export const MODULE_1_TOTAL_POSTS = 65
```

---

## Deployment

### Vercel
Standard Next.js deployment. Connect GitHub repo → auto-deploy on push to `main`.

### Docker (Local Network)
Next.js runs in **standalone output mode** for minimal image size.

**Files needed:**
- `Dockerfile`
- `docker-compose.yml`
- `.dockerignore`

**Access:** Any machine on local network via `http://[host-ip]:3000`

**`next.config.js` addition:**
```js
output: 'standalone'
```

---

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| Background | `#080c10` | Near-black base |
| Primary accent | `#00d4ff` | Electric cyan — nodes, highlights |
| Secondary accent | `#7c3aed` | Purple — connections, scene dividers |
| Text primary | `#f0f4f8` | Near-white |
| Text muted | `#64748b` | Locked content, labels |
| Locked overlay | `#1e2530` | Locked post background |

---

## File Structure (Web App — To Be Created)

```
/
├── app/
│   ├── page.tsx                  → Landing page
│   ├── series/
│   │   ├── page.tsx              → Chapter feed
│   │   └── chapter-[n]/
│   │       └── page.tsx          → Chapter detail
│   ├── not-found.tsx             → 404 page
│   └── layout.tsx                → Root layout + drawer
├── components/
│   ├── hero/
│   │   ├── ParticleNetwork.tsx   → R3F 3D scene
│   │   └── HeroText.tsx          → Typed text overlay
│   ├── series/
│   │   ├── ChapterCard.tsx       → Chapter overview card
│   │   ├── PostCard.tsx          → Collapsed/expanded post
│   │   ├── ScenePanel.tsx        → GSAP scroll panel
│   │   └── ProgressBar.tsx       → Chapter progress
│   ├── navigation/
│   │   └── SideDrawer.tsx        → Chapter navigation drawer
│   └── ui/
│       └── LockBadge.tsx         → Coming [date] badge
├── lib/
│   ├── content.ts                → Script parser (gray-matter + remark)
│   ├── scheduling.ts             → Date gating logic
│   └── series-config.ts          → Start date, total posts
├── config/
│   └── series.ts                 → SERIES_START_DATE constant
├── content/                      → All 65 .md scripts (already written)
├── Dockerfile
├── docker-compose.yml
├── .dockerignore
└── next.config.js
```
