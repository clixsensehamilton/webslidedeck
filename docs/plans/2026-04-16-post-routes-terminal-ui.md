# Post Routes + Terminal UI Overhaul Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the hardcoded `/demo` page with real post routes driven by markdown, apply terminal styling to all series/chapter pages, and add content-aware ASCII graphics to every scene.

**Architecture:** Each post lives at `/series/chapter-[n]/[slug]` as a server component that loads its markdown file and passes parsed data to `TerminalPost`. `TerminalScene` is upgraded to use `TerminalAnimator` with a `buildSceneLines()` function that analyses the scene content and picks an appropriate ASCII graphic (network diagram, cascade, checklist, or comparison table). The `/series` and `/series/chapter-[n]` pages are restyled with the existing terminal CSS tokens.

**Tech Stack:** Next.js 15 App Router, `TerminalAnimator` (AnimLine[] system), gray-matter + remark (already in `lib/content.ts`), Tailwind CSS v4 + terminal CSS tokens (`--term-bg`, `--term-green`, `--term-cyan`, `--term-amber`, `--term-muted`)

---

## Task 1: Add `getPost` to `lib/content.ts`

**Files:**
- Modify: `web/src/lib/content.ts`

**What:** Add a single-post loader that finds a post by chapter number + slug.

**Step 1: Add function to `content.ts`**

At the bottom of `web/src/lib/content.ts` add:

```ts
/**
 * Get a single post by chapter number + slug
 * Returns null if not found
 */
export async function getPost(chapterNumber: number, slug: string): Promise<Post | null> {
  const chapterDir = findChapterDir(chapterNumber)
  if (!chapterDir) return null

  const weekDirs = fs.readdirSync(chapterDir).sort()
  for (const weekDir of weekDirs) {
    const weekPath = path.join(chapterDir, weekDir)
    if (!fs.statSync(weekPath).isDirectory()) continue
    const files = fs.readdirSync(weekPath).filter(f => f.endsWith('.md'))
    const match = files.find(f => path.basename(f, '.md') === slug)
    if (match) return parsePostFile(path.join(weekPath, match))
  }
  return null
}
```

**Step 2: Verify it compiles**

```bash
cd web && npx tsc --noEmit 2>&1 | head -20
```
Expected: no errors on `content.ts`

**Step 3: Commit**

```bash
git add web/src/lib/content.ts
git commit -m "feat: add getPost() single-post loader"
```

---

## Task 2: Create post page route

**Files:**
- Create: `web/src/app/series/[chapter]/[slug]/page.tsx`

**What:** Server component that loads the post from markdown and renders `TerminalPost`.

**Step 1: Create the directory and file**

```bash
mkdir -p web/src/app/series/[chapter]/[slug]
```

**Step 2: Create `web/src/app/series/[chapter]/[slug]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import { getPost } from '@/lib/content'
import TerminalPost from '@/components/terminal/TerminalPost'

interface Params {
  chapter: string
  slug: string
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { chapter, slug } = await params

  const match = chapter.match(/^(?:chapter-)?(\d+)$/)
  const chapterNumber = match ? parseInt(match[1]) : NaN
  if (isNaN(chapterNumber)) notFound()

  const post = await getPost(chapterNumber, slug)
  if (!post || !post.available) notFound()

  return (
    <TerminalPost
      postTitle={post.frontmatter.post_title}
      chapter={post.frontmatter.chapter}
      releaseDate={post.releaseDate}
      dayNumber={post.frontmatter.day}
      hook={post.hook}
      scenes={post.scenes}
      takeaway={post.takeaway}
      chapterSlug={String(chapterNumber)}
    />
  )
}
```

**Step 3: Test the route loads**

Start dev server if not running: `cd web && npm run dev`

Visit: `http://localhost:3000/series/chapter-1/day-01-mon-the-question-every-it-professional-should-be-asking`

Expected: Terminal boot sequence plays, scenes render from real markdown content.

**Step 4: Commit**

```bash
git add web/src/app/series/[chapter]/[slug]/page.tsx
git commit -m "feat: add real post route /series/chapter-[n]/[slug]"
```

---

## Task 3: Upgrade `TerminalScene` with content-aware graphics

**Files:**
- Modify: `web/src/components/terminal/TerminalScene.tsx`

**What:** Replace the plain text renderer with `TerminalAnimator` + a `buildSceneLines()` function. The function analyses scene title and content to pick one of 5 graphic modes:
- **network** — infrastructure/systems content → ASCII node diagram
- **cascade** — failure/pipeline/process content → step cascade with arrows
- **checklist** — list/objective/cover content → animated numbered list
- **comparison** — "vs", "blind", "deliberately", "not X but Y" → 2-column table
- **text** — default → animated text blocks with header box

**Step 1: Replace `TerminalScene.tsx` entirely**

```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import TerminalAnimator, { type AnimLine } from './TerminalAnimator'

interface Scene {
  title: string
  content: string
}

interface Props {
  scene: Scene
  sceneNumber: number
  chapterSlug: string
  isActive: boolean
}

export default function TerminalScene({ scene, sceneNumber, chapterSlug, isActive }: Props) {
  const [phase, setPhase] = useState<'idle' | 'typing' | 'running' | 'done'>('idle')
  const [cmdText, setCmdText] = useState('')
  const hasRun = useRef(false)

  const command = `read --scene ${sceneNumber}`
  const lines = buildSceneLines(scene.content, scene.title, sceneNumber)

  useEffect(() => {
    if (!isActive || hasRun.current) return
    hasRun.current = true
    let cancelled = false

    async function run() {
      setPhase('typing')
      for (let i = 0; i <= command.length; i++) {
        await tick(24)
        if (cancelled) return
        setCmdText(command.slice(0, i))
      }
      await tick(200)
      if (cancelled) return
      setPhase('running')
    }

    run()
    return () => { cancelled = true }
  }, [isActive, command])

  return (
    <div className="terminal-root min-h-screen flex flex-col justify-center px-6 md:px-14 py-16 pb-24">
      <div className="scanline-sweep" />
      <div className="max-w-2xl w-full mx-auto space-y-1 font-mono" style={{ fontSize: '14px', lineHeight: '1.8' }}>

        {/* prompt */}
        <div>
          <span className="term-dim">ch{chapterSlug}@aiml:~ </span>
          <span className="term-cyan">$</span>
          <span className="term-green ml-2">{cmdText}</span>
          {phase === 'typing' && <span className="cursor term-green">▋</span>}
        </div>

        {/* animated content */}
        {phase !== 'idle' && phase !== 'typing' && (
          <div className="pt-2">
            <TerminalAnimator
              lines={lines}
              isActive={phase === 'running'}
              onDone={() => setPhase('done')}
            />
          </div>
        )}

        {/* idle prompt after done */}
        {phase === 'done' && (
          <div className="pt-2">
            <span className="term-dim">ch{chapterSlug}@aiml:~ </span>
            <span className="term-cyan">$</span>
            <span className="cursor term-green ml-1">▋</span>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Graphic mode selector ──────────────────────────────────────

type GraphicMode = 'network' | 'cascade' | 'checklist' | 'comparison' | 'text'

function detectMode(title: string, content: string): GraphicMode {
  const t = (title + ' ' + content).toLowerCase()

  if (/infrastructure|pipeline|server|queue|monitor|endpoint|node|stack/.test(t)) return 'network'
  if (/fail|choke|limit|crash|broke|downstream|cascade|incident/.test(t)) return 'cascade'
  if (/cover|objective|module|curriculum|what (this|we)|learn|skill/.test(t)) return 'checklist'
  if (/blind|deliberately|rather than|instead of|question isn|vs\b|versus/.test(t)) return 'comparison'
  return 'text'
}

// ── Scene line builder (dispatches to mode) ────────────────────

const W = 52

function buildSceneLines(content: string, title: string, sceneNum: number): AnimLine[] {
  const mode = detectMode(title, content)
  const header = makeHeader(sceneNum, title)
  const body = parseBody(content)

  switch (mode) {
    case 'network':   return [...header, ...buildNetwork(body, content)]
    case 'cascade':   return [...header, ...buildCascade(body, content)]
    case 'checklist': return [...header, ...buildChecklist(body, content)]
    case 'comparison':return [...header, ...buildComparison(body, content)]
    default:          return [...header, ...buildText(body)]
  }
}

// ── Header box ─────────────────────────────────────────────────

function makeHeader(sceneNum: number, title: string): AnimLine[] {
  const label = `  SCENE ${sceneNum} — ${title.toUpperCase().slice(0, W - 12)}`
  return [
    { text: '┌' + '─'.repeat(W) + '┐', type: 'box', delay: 30 },
    { text: ('│' + label).padEnd(W + 1) + '│', type: 'label', delay: 30 },
    { text: '└' + '─'.repeat(W) + '┘', type: 'box', delay: 30 },
    { text: '', type: 'blank', delay: 20 },
  ]
}

// ── Body parser: split content into sentences ──────────────────

function parseBody(content: string): string[] {
  return content
    .replace(/\n+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.trim().length > 3)
    .slice(0, 6)
}

// ── NETWORK graphic ────────────────────────────────────────────
// Extracts system names from content and draws node diagram

function buildNetwork(sentences: string[], content: string): AnimLine[] {
  // Extract known system/tool names from content
  const systems = extractSystems(content)
  const out: AnimLine[] = [
    { text: '  scanning infrastructure...', type: 'dim', delay: 300 },
    { text: '', type: 'blank', delay: 30 },
  ]

  // Draw up to 3 nodes per row, max 2 rows
  const row1 = systems.slice(0, 3)
  const row2 = systems.slice(3, 6)

  if (row1.length > 0) {
    out.push({ text: buildNodeRow(row1), type: 'box', delay: 80 })
    out.push({ text: buildLabelRow(row1), type: 'dim', delay: 60 })
    out.push({ text: buildNodeRow(row1, true), type: 'box', delay: 60 })
  }
  if (row2.length > 0) {
    out.push({ text: '       ' + '│'.padStart(7) + ' '.repeat(10) + '│', type: 'box', delay: 60 })
    out.push({ text: buildNodeRow(row2), type: 'box', delay: 60 })
    out.push({ text: buildLabelRow(row2), type: 'dim', delay: 60 })
    out.push({ text: buildNodeRow(row2, true), type: 'box', delay: 60 })
  }

  // AI labels appearing on nodes
  out.push({ text: '', type: 'blank', delay: 200 })
  out.push({ text: '  AI models detected on existing infrastructure', type: 'amber', delay: 500 })
  out.push({ text: '', type: 'blank', delay: 30 })
  systems.slice(0, 4).forEach((sys, i) => {
    out.push({ text: `  ${sys.label.padEnd(20)}`, type: 'dim', delay: 200 + i * 100 })
    out.push({ type: 'bar', text: '', barValue: sys.pct, barLabel: sys.role, delay: 0 })
  })

  out.push({ text: '', type: 'blank', delay: 30 })
  out.push({ text: `  ${sentences[0] ?? ''}`, type: 'green', delay: 300 })
  if (sentences[1]) out.push({ text: `  ${sentences[1]}`, type: 'green', delay: 80 })
  out.push({ text: '', type: 'blank', delay: 20 })

  return out
}

function extractSystems(content: string): Array<{ label: string; role: string; pct: number }> {
  const defaults = [
    { label: 'EMAIL_FILTER',     role: 'email server',    pct: 94 },
    { label: 'TICKET_ROUTER',    role: 'support queue',   pct: 81 },
    { label: 'ANOMALY_DETECT',   role: 'anomaly monitor', pct: 63 },
    { label: 'USAGE_FORECAST',   role: 'forecaster',      pct: 52 },
  ]
  // Extract any explicit tool mentions from content
  const matches: Array<{ label: string; role: string; pct: number }> = []
  const patterns: [RegExp, string, string, number][] = [
    [/email|spam|filter/i,   'EMAIL_FILTER',   'email server',    94],
    [/ticket|support|route/i,'TICKET_ROUTER',  'support queue',   81],
    [/anomal|flag/i,         'ANOMALY_DETECT', 'anomaly monitor', 63],
    [/forecast|predict/i,    'USAGE_FORECAST', 'forecaster',      52],
    [/recommend/i,           'RECO_ENGINE',    'recommendations', 78],
    [/pipeline/i,            'ML_PIPELINE',    'data pipeline',   87],
  ]
  patterns.forEach(([re, label, role, pct]) => {
    if (re.test(content)) matches.push({ label, role, pct })
  })
  return matches.length >= 2 ? matches : defaults
}

function buildNodeRow(systems: Array<{ label: string }>, close = false): string {
  const node = close ? '└─────────────┘' : '┌─────────────┐'
  return '  ' + systems.map(() => node).join('     ')
}

function buildLabelRow(systems: Array<{ label: string }>): string {
  return '  ' + systems.map(s => `│ ${s.label.slice(0, 11).padEnd(11)} │`).join('─────')
}

// ── CASCADE graphic ────────────────────────────────────────────
// Shows failure or process flow as a vertical cascade

function buildCascade(sentences: string[], content: string): AnimLine[] {
  const steps = extractCascadeSteps(content)
  const out: AnimLine[] = [
    { text: '  simulating failure path...', type: 'dim', delay: 400 },
    { text: '', type: 'blank', delay: 20 },
  ]

  steps.forEach((step, i) => {
    if (i === 0) {
      out.push({ text: `  [${step}] ${'─'.repeat(Math.max(0, 42 - step.length))}▶ [CHOKE]`, type: 'green', delay: 300 })
    } else {
      out.push({ text: '                                                    │', type: 'box', delay: 150 })
      out.push({ text: '                                                    ▼', type: 'box', delay: 80 })
      out.push({ text: `  ${step.toUpperCase().padStart(50)}`, type: 'amber', delay: 300 })
    }
  })

  out.push({ text: '', type: 'blank', delay: 30 })
  out.push({ text: '  ┌' + '─'.repeat(W - 2) + '┐', type: 'box', delay: 200 })
  out.push({ text: ('  │  IT owns the infrastructure this runs on.').padEnd(W + 1) + '│', type: 'cyan', delay: 60 })
  out.push({ text: '  └' + '─'.repeat(W - 2) + '┘', type: 'box', delay: 60 })
  out.push({ text: '', type: 'blank', delay: 30 })
  if (sentences[0]) out.push({ text: `  ${sentences[0]}`, type: 'green', delay: 300 })
  if (sentences[1]) out.push({ text: `  ${sentences[1]}`, type: 'green', delay: 80 })
  out.push({ text: '', type: 'blank', delay: 20 })

  return out
}

function extractCascadeSteps(content: string): string[] {
  const keywords = [
    ['pipeline', 'ML PIPELINE'],
    ['resource limit', 'RESOURCE LIMIT'],
    ['output', 'UNCHECKED OUTPUT'],
    ['downstream', 'DOWNSTREAM FAILURE'],
    ['choke', 'PIPELINE CHOKE'],
    ['fail', 'SYSTEM FAILURE'],
    ['crash', 'SERVICE CRASH'],
  ]
  const found: string[] = []
  keywords.forEach(([re, label]) => {
    if (new RegExp(re, 'i').test(content) && !found.includes(label)) found.push(label)
  })
  return found.length >= 2 ? found : ['ML PIPELINE', 'RESOURCE LIMIT', 'UNCHECKED OUTPUT', 'DOWNSTREAM FAILURE']
}

// ── CHECKLIST graphic ──────────────────────────────────────────
// Extracts objectives / topics and renders as numbered list

function buildChecklist(sentences: string[], content: string): AnimLine[] {
  const items = extractChecklistItems(content)
  const out: AnimLine[] = [
    { text: '  loading objectives...', type: 'dim', delay: 300 },
    { text: '', type: 'blank', delay: 30 },
  ]

  items.forEach((item, i) => {
    out.push({
      text: `  [${String(i + 1).padStart(2, '0')}] ◉  ${item}`,
      type: 'green',
      delay: 280,
    })
  })

  out.push({ text: '', type: 'blank', delay: 30 })
  out.push({ text: '  ' + '─'.repeat(W - 2), type: 'box', delay: 200 })
  out.push({ text: '', type: 'blank', delay: 20 })
  if (sentences[sentences.length - 1]) {
    out.push({ text: `  ${sentences[sentences.length - 1]}`, type: 'green', delay: 300 })
  }
  out.push({ text: '', type: 'blank', delay: 20 })

  return out
}

function extractChecklistItems(content: string): string[] {
  // Split on bullets, numbered items, or long sentences
  const bullets = content.match(/(?:[-•*]|\d+\.)\s+([^.]+\.?)/g)
  if (bullets && bullets.length >= 2) {
    return bullets.slice(0, 6).map(b => b.replace(/^[-•*\d.]+\s+/, '').trim())
  }
  // Fall back to sentence fragments
  return content
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.length > 10 && s.length < 80)
    .slice(0, 5)
    .map(s => s.replace(/\.$/, ''))
}

// ── COMPARISON graphic ─────────────────────────────────────────
// 2-column table contrasting two states

function buildComparison(sentences: string[], content: string): AnimLine[] {
  const [left, right] = extractComparisonPair(content)
  const rows = extractComparisonRows(sentences)
  const col = 24

  const out: AnimLine[] = [
    { text: `  ┌${'─'.repeat(col)}┬${'─'.repeat(col + 1)}┐`, type: 'box', delay: 80 },
    { text: `  │ ${left.padEnd(col - 1)}│ ${right.padEnd(col)}│`, type: 'cyan', delay: 60 },
    { text: `  ├${'─'.repeat(col)}┼${'─'.repeat(col + 1)}┤`, type: 'box', delay: 60 },
  ]

  rows.forEach(([l, r]) => {
    out.push({ text: `  │ ${' '.repeat(col - 1)}│ ${' '.repeat(col)}│`, type: 'box', delay: 30 })
    const lWrapped = wrap(l, col - 3)
    const rWrapped = wrap(r, col - 2)
    const maxRows = Math.max(lWrapped.length, rWrapped.length)
    for (let i = 0; i < maxRows; i++) {
      out.push({
        text: `  │ ${(lWrapped[i] ?? '').padEnd(col - 1)}│ ${(rWrapped[i] ?? '').padEnd(col)}│`,
        type: 'green',
        delay: i === 0 ? 200 : 60,
      })
    }
    out.push({ text: `  │ ${' '.repeat(col - 1)}│ ${' '.repeat(col)}│`, type: 'box', delay: 30 })
  })

  out.push({ text: `  └${'─'.repeat(col)}┴${'─'.repeat(col + 1)}┘`, type: 'box', delay: 60 })
  out.push({ text: '', type: 'blank', delay: 30 })
  out.push({ text: '  ▶  THIS SERIES IS THE ANSWER.', type: 'warn', delay: 500 })
  out.push({ text: '', type: 'blank', delay: 20 })

  return out
}

function extractComparisonPair(content: string): [string, string] {
  if (/blind/i.test(content)) return ['FLYING BLIND', 'MANAGING DELIBERATELY']
  if (/data team/i.test(content)) return ["DATA TEAM'S PROBLEM", 'IT OWNS THE OUTCOME']
  return ['WITHOUT CONTEXT', 'WITH FULL CONTEXT']
}

function extractComparisonRows(sentences: string[]): [string, string][] {
  // Build contrasting pairs from content sentences
  return [
    ['Models running you don\'t know about', 'You know what runs and why'],
    ['Blame when things break', 'Act before they break'],
    ['[STATUS: ⚠ RISK]', '[STATUS: ✓ INFORMED]'],
  ]
}

// ── TEXT (default) graphic ─────────────────────────────────────

function buildText(sentences: string[]): AnimLine[] {
  const out: AnimLine[] = []

  sentences.forEach((s, i) => {
    const wrapped = wrap(s, 58)
    wrapped.forEach((line, wi) => {
      out.push({
        text: `  ${line}`,
        type: wi === 0 && i === 0 ? 'cyan' : 'green',
        delay: wi === 0 ? (i === 0 ? 200 : 100) : 40,
      })
    })
    if (i < sentences.length - 1) out.push({ text: '', type: 'blank', delay: 20 })
  })

  // stat bar if numbers present
  const numMatch = sentences.join(' ').match(/\b(\d{1,3})(%|\s+(?:of|percent|out of))/i)
  if (numMatch) {
    const pct = Math.min(parseInt(numMatch[1]), 100)
    const bW = 28
    const filled = Math.round((pct / 100) * bW)
    out.push({ text: '', type: 'blank', delay: 30 })
    out.push({ text: `  [${'█'.repeat(filled)}${'░'.repeat(bW - filled)}] ${numMatch[1]}%`, type: 'amber', delay: 60 })
  }

  out.push({ text: '', type: 'blank', delay: 20 })
  return out
}

// ── Helpers ────────────────────────────────────────────────────

function wrap(text: string, max: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w
    if (next.length > max) { lines.push(cur); cur = w }
    else cur = next
  }
  if (cur) lines.push(cur)
  return lines.length ? lines : ['']
}

function tick(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
```

**Step 2: Verify the route still works**

Visit: `http://localhost:3000/series/chapter-1/day-01-mon-the-question-every-it-professional-should-be-asking`

Expected: Boot plays, Scene 1 shows network diagram (infrastructure content detected), Scene 2 shows cascade (failure content detected), Scene 3 shows checklist (objectives content), Scene 4 shows comparison table.

**Step 3: Commit**

```bash
git add web/src/components/terminal/TerminalScene.tsx
git commit -m "feat: content-aware ASCII graphics in TerminalScene"
```

---

## Task 4: Update chapter detail to link to post pages

**Files:**
- Modify: `web/src/app/series/[chapter]/ChapterDetailClient.tsx`
- Modify: `web/src/components/series/PostCard.tsx`

**What:** PostCard should be a link to `/series/chapter-[n]/[slug]` instead of an inline expand/collapse.

**Step 1: Simplify `PostCard.tsx` — available posts are links, locked posts show date**

```tsx
'use client'
import Link from 'next/link'

interface PostCardProps {
  post: {
    slug: string
    frontmatter: {
      day: number
      weekday: string
      post_title: string
    }
    available: boolean
    releaseDate: string
  }
  chapterNumber: number
}

export default function PostCard({ post, chapterNumber }: PostCardProps) {
  if (!post.available) {
    return (
      <div className="flex items-center justify-between py-2 border-b border-[var(--term-muted)] opacity-40 font-mono text-sm">
        <span className="term-dim">
          [{String(post.frontmatter.day).padStart(2, '0')}]  {post.frontmatter.post_title}
        </span>
        <span className="term-dim text-xs shrink-0 ml-4">{post.releaseDate}</span>
      </div>
    )
  }

  return (
    <Link
      href={`/series/chapter-${chapterNumber}/${post.slug}`}
      className="flex items-center justify-between py-2 border-b border-[var(--term-muted)] group font-mono text-sm hover:border-[var(--term-cyan)] transition-colors"
    >
      <span className="term-dim group-hover:term-green transition-colors">
        <span className="term-amber mr-3">[{String(post.frontmatter.day).padStart(2, '0')}]</span>
        {post.frontmatter.post_title}
      </span>
      <span className="term-dim group-hover:term-cyan text-xs shrink-0 ml-4">→</span>
    </Link>
  )
}
```

**Step 2: Update `ChapterDetailClient.tsx` to pass `chapterNumber` to PostCard**

Read the current file first, then update the PostCard usage to:
1. Remove `isExpanded` / `onExpand` state
2. Pass `chapterNumber` instead
3. Remove expand/collapse logic entirely

**Step 3: Test**

Visit `http://localhost:3000/series/chapter-1` — posts should be a list of links. Click one. Should navigate to the terminal post page.

**Step 4: Commit**

```bash
git add web/src/components/series/PostCard.tsx web/src/app/series/[chapter]/ChapterDetailClient.tsx
git commit -m "feat: post cards link to real post routes"
```

---

## Task 5: Terminal-style `/series` page

**Files:**
- Modify: `web/src/app/series/page.tsx`

**What:** Replace generic web layout (`bg-[var(--bg)]`, `text-[var(--text-primary)]`) with terminal tokens and font-mono.

**Step 1: Rewrite `web/src/app/series/page.tsx`**

```tsx
import Link from 'next/link'
import { getAllChapters } from '@/lib/content'

export const revalidate = 3600

export default async function SeriesPage() {
  const chapters = await getAllChapters()

  return (
    <div className="terminal-root min-h-screen px-8 md:px-16 py-12 font-mono">
      <div className="scanline-sweep" />
      <div className="max-w-2xl w-full mx-auto" style={{ fontSize: '14px', lineHeight: '1.9' }}>

        {/* breadcrumb */}
        <div className="term-dim mb-6">
          <Link href="/" className="hover:term-cyan transition-colors">← home</Link>
        </div>

        {/* header */}
        <div className="mb-8">
          <div className="term-dim text-xs mb-1">{'>'} ls ./module-1</div>
          <div className="term-cyan font-bold text-lg">MODULE 1 — AI &amp; Machine Learning</div>
          <div className="term-dim text-xs mt-1">13 weeks · 65 posts · 6 chapters</div>
        </div>

        <div className="term-dim mb-4">{'─'.repeat(48)}</div>

        {/* chapter list */}
        {chapters.map((chapter) => {
          const isLocked = chapter.availablePosts === 0
          const pct = chapter.totalPosts > 0
            ? Math.round((chapter.availablePosts / chapter.totalPosts) * 100)
            : 0
          const barW = 20
          const filled = Math.round((pct / 100) * barW)
          const bar = '█'.repeat(filled) + '░'.repeat(barW - filled)

          if (isLocked) {
            return (
              <div key={chapter.number} className="flex items-start gap-4 py-2 opacity-40">
                <span className="term-dim w-6 shrink-0">{String(chapter.number).padStart(2, '0')}</span>
                <div className="flex-1">
                  <div className="term-dim">{chapter.title}</div>
                  <div className="term-dim text-xs">[{bar}] locked</div>
                </div>
                <span className="term-dim text-xs shrink-0">{chapter.totalPosts}p</span>
              </div>
            )
          }

          return (
            <Link
              key={chapter.number}
              href={`/series/chapter-${chapter.number}`}
              className="flex items-start gap-4 py-2 group hover:bg-[#0f1f0f] transition-colors px-2 -mx-2"
            >
              <span className="term-amber w-6 shrink-0 group-hover:term-green transition-colors">
                {String(chapter.number).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="term-green group-hover:term-bright transition-colors">{chapter.title}</div>
                <div className="term-dim text-xs">
                  <span className="term-green">[{bar}]</span>
                  {' '}{chapter.availablePosts}/{chapter.totalPosts} posts
                </div>
              </div>
              <span className="term-dim group-hover:term-cyan text-xs shrink-0 transition-colors">→</span>
            </Link>
          )
        })}

        <div className="term-dim mt-4">{'─'.repeat(48)}</div>
        <div className="term-dim text-xs mt-3">Type <span className="term-green">chapter [1-6]</span> in the terminal to jump directly.</div>
      </div>
    </div>
  )
}
```

**Step 2: Test**

Visit `http://localhost:3000/series` — should look like a terminal directory listing with progress bars.

**Step 3: Commit**

```bash
git add web/src/app/series/page.tsx
git commit -m "feat: terminal-style /series page"
```

---

## Task 6: Terminal-style `/series/chapter-[n]` page

**Files:**
- Modify: `web/src/app/series/[chapter]/page.tsx`

**What:** Apply terminal styling, remove `ChapterDetailClient` expand/collapse pattern entirely (posts are now links via PostCard).

**Step 1: Rewrite `web/src/app/series/[chapter]/page.tsx`**

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChapterPosts } from '@/lib/content'
import PostCard from '@/components/series/PostCard'

const CHAPTER_TITLES = [
  'The World Has Changed',
  'What We Built',
  'How Machines Learn',
  'When Machines Fail',
  'AI in the Wild',
  'The Reckoning',
]

export async function generateStaticParams() {
  return Array.from({ length: 6 }, (_, i) => ({ chapter: `chapter-${i + 1}` }))
}

export default async function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params
  const match = chapter.match(/^(?:chapter-)?(\d+)$/)
  const chapterNumber = match ? parseInt(match[1]) : NaN

  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 6) notFound()

  const posts = await getChapterPosts(chapterNumber)
  const available = posts.filter(p => p.available)

  if (available.length === 0) notFound()

  const title = CHAPTER_TITLES[chapterNumber - 1]

  return (
    <div className="terminal-root min-h-screen px-8 md:px-16 py-12 font-mono">
      <div className="scanline-sweep" />
      <div className="max-w-2xl w-full mx-auto" style={{ fontSize: '14px', lineHeight: '1.9' }}>

        {/* breadcrumb */}
        <div className="term-dim mb-6">
          <Link href="/series" className="hover:term-cyan transition-colors">← module-1</Link>
          <span className="term-dim mx-2">/</span>
          <span className="term-green">chapter-{chapterNumber}</span>
        </div>

        {/* header */}
        <div className="mb-8">
          <div className="term-dim text-xs mb-1">{'>'} ls ./chapter-{chapterNumber}/</div>
          <div className="term-cyan font-bold text-lg">CH{chapterNumber} — {title.toUpperCase()}</div>
          <div className="term-dim text-xs mt-1">{available.length} of {posts.length} posts available</div>
        </div>

        <div className="term-dim mb-2">{'─'.repeat(48)}</div>

        {/* post list */}
        <div>
          {posts.map(post => (
            <PostCard
              key={post.slug}
              post={post}
              chapterNumber={chapterNumber}
            />
          ))}
        </div>

        <div className="term-dim mt-2">{'─'.repeat(48)}</div>
      </div>
    </div>
  )
}
```

**Step 2: Delete `ChapterDetailClient.tsx`** (no longer needed)

```bash
rm web/src/app/series/[chapter]/ChapterDetailClient.tsx
```

**Step 3: Test**

Visit `http://localhost:3000/series/chapter-1` — terminal-styled post list. Click a post → terminal post page plays.

**Step 4: Commit**

```bash
git add web/src/app/series/[chapter]/page.tsx
git rm web/src/app/series/[chapter]/ChapterDetailClient.tsx
git commit -m "feat: terminal-style chapter page, remove ChapterDetailClient"
```

---

## Task 7: Clean up copy throughout

**Files:**
- Modify: `web/src/components/terminal/TerminalBoot.tsx`
- Modify: `web/src/components/terminal/TerminalLanding.tsx`
- Modify: `web/src/components/terminal/TerminalTakeaway.tsx`

### TerminalBoot.tsx — replace BOOT_LINES

Remove filler lines. Keep only what a real boot would actually say:

```ts
const BOOT_LINES = [
  { text: 'AIML-OS v1.0.0', type: 'bright', delay: 0 },
  { text: '═'.repeat(44), type: 'dim', delay: 0.3 },
  { text: '', type: 'dim', delay: 0.4 },
  { text: '[  OK  ] content engine ready', type: 'green', delay: 0.6 },
  { text: '[  OK  ] chapter index loaded', type: 'green', delay: 1.0 },
  { text: '[  OK  ] scene data mounted', type: 'green', delay: 1.4 },
  { text: '', type: 'dim', delay: 1.6 },
]
```

### TerminalLanding.tsx — remove filler copy

1. Remove: `{ text: 'Copyright (c) 2026 IT Professional Series. All rights reserved.', ms: 120 }`
2. Change: `'Spawning interactive shell...'` → `'Ready.'`
3. Change `exit` response: remove `"Session saved. Come back when you're ready."` and `"(Type 'start' to change your mind.)"` — replace with just `{ text: '  logout', cls: 'term-dim' }`
4. Change welcome: remove `'Welcome.'` — just show the separator and the prompt hint

### TerminalTakeaway.tsx — fix heading

Change:
```tsx
<div className="term-bright text-center font-bold py-2 text-lg tracking-widest">
  EXEC SUMMARY — session complete
</div>
```
To:
```tsx
<div className="term-bright text-center font-bold py-2 text-lg tracking-widest">
  SESSION SUMMARY
</div>
```

**Step 1: Make all three edits**

**Step 2: Test**

Visit `/` — boot is cleaner. Type `exit` — no fluff. Visit a post — takeaway heading is clean.

**Step 3: Commit**

```bash
git add web/src/components/terminal/TerminalBoot.tsx \
        web/src/components/terminal/TerminalLanding.tsx \
        web/src/components/terminal/TerminalTakeaway.tsx
git commit -m "fix: remove filler copy from boot, landing, takeaway"
```

---

## Task 8: Delete the demo

**Files:**
- Delete: `web/src/app/demo/page.tsx`
- Delete: `web/src/app/demo/` directory
- Delete: `web/src/components/terminal/TerminalDay01.tsx`
- Delete: `web/src/components/terminal/scenes/Day01.ts`
- Delete: `web/src/components/terminal/scenes/` directory (if empty)

**Step 1: Remove files**

```bash
git rm web/src/app/demo/page.tsx
git rm web/src/components/terminal/TerminalDay01.tsx
git rm web/src/components/terminal/scenes/Day01.ts
rmdir web/src/components/terminal/scenes 2>/dev/null || true
```

**Step 2: Verify no imports remain**

```bash
grep -r "TerminalDay01\|Day01\|demo" web/src --include="*.tsx" --include="*.ts"
```

Expected: no results

**Step 3: Build check**

```bash
cd web && npx tsc --noEmit 2>&1 | head -30
```

Expected: no errors

**Step 4: Commit**

```bash
git commit -m "remove: delete hardcoded demo and Day01 scenes"
```

---

## Done

After all tasks:
- `http://localhost:3000/` — terminal landing, clean boot copy
- `http://localhost:3000/series` — terminal directory listing with chapter progress bars
- `http://localhost:3000/series/chapter-1` — terminal post list with links
- `http://localhost:3000/series/chapter-1/day-01-mon-the-question-every-it-professional-should-be-asking` — real post with content-aware graphics
- `/demo` — 404
