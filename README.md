# AI & ML Series — IT Professional Edition

A daily terminal-style scrollytelling series on AI and machine learning.
65 posts · 13 weeks · 6 chapters. Built for people who keep systems running.

---

## Quick Start

```bash
cd web
npm install
npm run dev
```

Open http://localhost:3000

---

## Routes

| URL | Page |
|-----|------|
| `/` | Terminal landing — type `start`, `help`, `chapters` |
| `/series` | Chapter overview |
| `/series/chapter-1` | Chapter 1 posts |
| `/demo` | Dev preview of day-1 post (dev only) |

---

## Terminal Commands (Landing Page)

| Command | Action |
|---------|--------|
| `start` | Enter the series |
| `chapters` | List all 6 chapters |
| `chapter 3` | Jump to chapter 3 |
| `about` | What this series is |
| `help` | Show all commands |
| `clear` | Clear the screen |
| `exit` | Leave |

Arrow keys `↑ ↓` cycle through command history. `Tab` autocompletes.

---

## Post Navigation (Demo / Post Pages)

| Key | Action |
|-----|--------|
| `→` or `↓` | Next scene |
| `←` or `↑` | Previous scene |
| `j` / `k` | Next / previous (vim-style) |

---

## Progress System — Session Codes

No login. No database. Instead, at the end of each reading session the app
generates a **session code** — a short alphanumeric string that encodes your
progress (last post read, chapter, day number).

```
Session ended. Your progress code:

  AIM1-CH1-D05-K7X2

Save this. Enter it next time to resume from Day 5.
```

Enter the code on the landing page:

```
user@aiml:~ $ resume AIM1-CH1-D05-K7X2
> Restoring session... Day 5, Chapter 1
> Resuming from: "Three Ingredients AI Runs On"
```

Codes are deterministic — no server required. The format encodes:
`AIM[module]-CH[chapter]-D[day]-[checksum]`

---

## Project Structure

```
aim_repo/
├── web/          ← Next.js app (run from here)
├── content/      ← 65 markdown posts
├── docs/         ← Architecture, guidelines, content plans
└── resources/    ← Source PDFs (reference only)
```

---

## Docker

```bash
# From repo root
docker-compose up --build
```

Runs on port 3000. Content is baked into the image at build time.

---

## Content

Posts live in `content/module-1/` organized by chapter and week:

```
chapter-1-the-world-has-changed/
  week-01-why-ai-why-now/
    day-01-mon-*.md
    day-02-tue-*.md
    ...
```

Each `.md` file has frontmatter (`week`, `day`, `post_title`, etc.) and sections:
`## Hook`, `## Scene 1–4`, `## Takeaway`, `## Visual Direction`

---

## Dev Notes

- **All posts unlocked** in dev mode — `isPostAvailable()` returns `true`.
  Restore real date-gating before production: edit `web/src/lib/scheduling.ts`.
- **Content path**: `web/` reads `../content/` by default.
  Override with `CONTENT_ROOT` env var for Docker.
- **Gemini API key**: stored in `web/.env.local` (not committed).
