# Web App Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a Next.js 15 scrollytelling web app that renders 65 AI/ML infographic scripts with GSAP scroll-driven animations, a React Three Fiber 3D hero, soft-gated daily scheduling, and Docker deployment.

**Architecture:** Chapter-per-route (`/series/chapter-[n]`), content parsed from markdown files at build time, posts soft-gated by date client-side, GSAP ScrollTrigger drives per-scene inline expand animations, React Three Fiber powers the particle-to-neural-network landing hero.

**Tech Stack:** Next.js 15 App Router, React Three Fiber + Three.js, GSAP + ScrollTrigger, Tailwind CSS v4, gray-matter + remark, Docker (standalone mode)

**Read before starting:**
- `docs/ARCHITECTURE.md` — full design spec
- `docs/CONTENT-GUIDELINES.md` — content rules
- `content/module-1/SCRIPT-TEMPLATE.md` — script format
- `docs/plans/2026-04-14-module1-topic-lineup-v3.md` — approved lineup

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`, `.gitignore` (update), `postcss.config.mjs`

**Step 1: Scaffold Next.js app inside existing repo**

```bash
cd /home/dev/repo/aim_repo
npx create-next-app@latest . \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --import-alias "@/*" \
  --yes
```

When prompted about existing files, choose to merge/keep existing.

**Step 2: Install core dependencies**

```bash
npm install gsap @gsap/react
npm install @react-three/fiber @react-three/drei three
npm install gray-matter remark remark-html
npm install @types/three
```

**Step 3: Update `next.config.ts` for standalone Docker output**

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
}

export default nextConfig
```

**Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: No errors.

**Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: `http://localhost:3000` loads default Next.js page. No errors in terminal.

**Step 6: Commit**

```bash
git add .
git commit -m "feat: scaffold Next.js 15 app with GSAP, R3F, Tailwind"
```

---

## Task 2: Series Config + Scheduling Logic

**Files:**
- Create: `config/series.ts`
- Create: `lib/scheduling.ts`

**Step 1: Create series config**

```typescript
// config/series.ts
export const SERIES_START_DATE = new Date('2026-04-14T00:00:00') // Day 1 = Monday
export const TOTAL_POSTS_MODULE_1 = 65
export const WEEKDAYS_PER_WEEK = 5
```

**Step 2: Create scheduling library**

```typescript
// lib/scheduling.ts
import { SERIES_START_DATE } from '@/config/series'

/**
 * Given a 1-based day number, returns the calendar date for that post.
 * Skips weekends (Sat/Sun). Day 1 = SERIES_START_DATE (must be a Monday).
 */
export function getPostDate(dayNumber: number): Date {
  const date = new Date(SERIES_START_DATE)
  let weekdaysAdded = 0
  let daysOffset = 0

  while (weekdaysAdded < dayNumber - 1) {
    daysOffset++
    const d = new Date(SERIES_START_DATE)
    d.setDate(d.getDate() + daysOffset)
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) weekdaysAdded++ // skip Sat(6), Sun(0)
  }

  date.setDate(date.getDate() + daysOffset)
  return date
}

/**
 * Returns true if the post for this day number is available today.
 */
export function isPostAvailable(dayNumber: number): boolean {
  const postDate = getPostDate(dayNumber)
  const today = new Date()
  today.setHours(23, 59, 59, 999) // available all day on release date
  return postDate <= today
}

/**
 * Formats a post date as "Monday, Apr 14"
 */
export function formatPostDate(dayNumber: number): string {
  const date = getPostDate(dayNumber)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}
```

**Step 3: Manually verify in Node REPL**

```bash
node -e "
const { getPostDate, isPostAvailable, formatPostDate } = require('./lib/scheduling.ts')
console.log(formatPostDate(1))   // Monday, Apr 14
console.log(formatPostDate(5))   // Friday, Apr 18
console.log(formatPostDate(6))   // Monday, Apr 21 (skips weekend)
console.log(isPostAvailable(1))  // true (past date)
"
```

> Note: Use ts-node if needed: `npx ts-node -e "..."`

**Step 4: Commit**

```bash
git add config/series.ts lib/scheduling.ts
git commit -m "feat: add series config and scheduling logic"
```

---

## Task 3: Content Parser

**Files:**
- Create: `lib/content.ts`

**Step 1: Write the content parser**

```typescript
// lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'
import { isPostAvailable, getPostDate, formatPostDate } from './scheduling'

const CONTENT_ROOT = path.join(process.cwd(), 'content/module-1')

export interface PostFrontmatter {
  week: number
  day: number
  weekday: string
  chapter: string
  source_video: string
  post_title: string
  series_tag: string
}

export interface Scene {
  title: string
  content: string
}

export interface Post {
  frontmatter: PostFrontmatter
  hook: string
  scenes: Scene[]
  takeaway: string
  visualDirection: string
  available: boolean
  releaseDate: string
  slug: string
}

export interface ChapterMeta {
  number: number
  title: string
  slug: string
  posts: Post[]
  totalPosts: number
  availablePosts: number
}

/**
 * Parse a single .md script file into a Post object
 */
export async function parsePostFile(filePath: string): Promise<Post> {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter

  // Split content into named sections
  const sections = parseSections(content)

  const hook = sections['Hook'] ?? ''
  const takeaway = sections['Takeaway'] ?? ''
  const visualDirection = sections['Visual Direction'] ?? ''

  // Extract scenes (## Scene N — Title)
  const scenes: Scene[] = Object.entries(sections)
    .filter(([key]) => key.startsWith('Scene'))
    .map(([key, value]) => ({
      title: key.replace(/^Scene \d+ — /, '').trim(),
      content: value.trim(),
    }))

  const slug = path.basename(filePath, '.md')

  return {
    frontmatter: fm,
    hook: hook.trim(),
    scenes,
    takeaway: takeaway.trim(),
    visualDirection: visualDirection.trim(),
    available: isPostAvailable(fm.day),
    releaseDate: formatPostDate(fm.day),
    slug,
  }
}

/**
 * Parse markdown body into named sections keyed by ## heading
 */
function parseSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const lines = content.split('\n')
  let currentKey = ''
  let buffer: string[] = []

  for (const line of lines) {
    const match = line.match(/^## (.+)$/)
    if (match) {
      if (currentKey) sections[currentKey] = buffer.join('\n').trim()
      // Strip "Scene N — " prefix handling in key
      currentKey = match[1].trim()
      buffer = []
    } else {
      buffer.push(line)
    }
  }
  if (currentKey) sections[currentKey] = buffer.join('\n').trim()
  return sections
}

/**
 * Get all posts for a given chapter number (1-6)
 */
export async function getChapterPosts(chapterNumber: number): Promise<Post[]> {
  const chapterDir = findChapterDir(chapterNumber)
  if (!chapterDir) return []

  const posts: Post[] = []
  const weekDirs = fs.readdirSync(chapterDir).sort()

  for (const weekDir of weekDirs) {
    const weekPath = path.join(chapterDir, weekDir)
    if (!fs.statSync(weekPath).isDirectory()) continue
    const files = fs.readdirSync(weekPath).filter(f => f.endsWith('.md')).sort()
    for (const file of files) {
      const post = await parsePostFile(path.join(weekPath, file))
      posts.push(post)
    }
  }

  return posts
}

/**
 * Get metadata for all 6 chapters
 */
export async function getAllChapters(): Promise<ChapterMeta[]> {
  const CHAPTER_TITLES = [
    'The World Has Changed',
    'What We Built',
    'How Machines Learn',
    'When Machines Fail',
    'AI in the Wild',
    'The Reckoning',
  ]

  const chapters: ChapterMeta[] = []

  for (let i = 1; i <= 6; i++) {
    const posts = await getChapterPosts(i)
    chapters.push({
      number: i,
      title: CHAPTER_TITLES[i - 1],
      slug: `chapter-${i}`,
      posts,
      totalPosts: posts.length,
      availablePosts: posts.filter(p => p.available).length,
    })
  }

  return chapters
}

/**
 * Find the chapter directory by number (matches chapter-N prefix)
 */
function findChapterDir(chapterNumber: number): string | null {
  const dirs = fs.readdirSync(CONTENT_ROOT)
  const match = dirs.find(d => d.startsWith(`chapter-${chapterNumber}-`))
  return match ? path.join(CONTENT_ROOT, match) : null
}
```

**Step 2: Verify parser compiles**

```bash
npx tsc --noEmit
```
Expected: No errors.

**Step 3: Quick smoke test**

```bash
npx ts-node -e "
const { getChapterPosts } = require('./lib/content.ts')
getChapterPosts(1).then(posts => {
  console.log('Posts found:', posts.length)
  console.log('First post:', posts[0]?.frontmatter?.post_title)
  console.log('Available:', posts[0]?.available)
})
"
```
Expected: `Posts found: 10`, first post title, available: true/false.

**Step 4: Commit**

```bash
git add lib/content.ts
git commit -m "feat: add markdown content parser with section extraction"
```

---

## Task 4: Global Layout + Color Tokens

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Step 1: Set global color tokens in `globals.css`**

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --bg: #080c10;
  --accent-cyan: #00d4ff;
  --accent-purple: #7c3aed;
  --text-primary: #f0f4f8;
  --text-muted: #64748b;
  --locked-bg: #1e2530;
}

body {
  background-color: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-geist-sans);
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--bg); }
::-webkit-scrollbar-thumb { background: var(--accent-cyan); border-radius: 2px; }
```

**Step 2: Update root layout**

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI & ML — A Series for IT Professionals',
  description: 'Daily scrollytelling infographics on AI and Machine Learning. 65 posts. 13 weeks. Built for how IT thinks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
```

**Step 3: Verify dev server renders dark background**

```bash
npm run dev
```
Open `http://localhost:3000` — should be near-black background, white text.

**Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: global layout, color tokens, dark theme"
```

---

## Task 5: Landing Page — Structure + Text

**Files:**
- Modify: `app/page.tsx`
- Create: `components/hero/HeroText.tsx`
- Create: `components/landing/ChapterTeaser.tsx`

**Step 1: Create HeroText component (typewriter + title)**

```tsx
// components/hero/HeroText.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Link from 'next/link'

gsap.registerPlugin(TextPlugin)

export default function HeroText() {
  const tagRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.from(tagRef.current, { opacity: 0, y: -10, duration: 0.5 })
      .from(titleRef.current, { opacity: 0, y: 30, duration: 0.8 }, '-=0.2')
      .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .to(typedRef.current, {
        duration: 1.5,
        text: '65 posts. 13 weeks. 1 module.',
        ease: 'none',
      }, '+=0.3')
      .from(ctaRef.current, { opacity: 0, y: 10, duration: 0.5 }, '+=0.2')
  }, [])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6 pointer-events-none">
      <span
        ref={tagRef}
        className="text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)] mb-6 opacity-0"
      >
        #AIMLSeries · Module 1
      </span>

      <h1
        ref={titleRef}
        className="text-[clamp(4rem,12vw,9rem)] font-black leading-none tracking-tight text-[var(--text-primary)] opacity-0"
      >
        AI & ML
      </h1>

      <p
        ref={subtitleRef}
        className="text-lg text-[var(--text-muted)] mt-4 mb-3 opacity-0"
      >
        A Series for IT Professionals
      </p>

      <span
        ref={typedRef}
        className="text-sm text-[var(--accent-cyan)] font-mono h-5 block"
      />

      <div ref={ctaRef} className="mt-10 opacity-0 pointer-events-auto">
        <Link
          href="/series"
          className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] text-sm uppercase tracking-widest hover:bg-[var(--accent-cyan)] hover:text-[var(--bg)] transition-all duration-300"
        >
          Enter the Series →
        </Link>
      </div>
    </div>
  )
}
```

**Step 2: Create chapter teaser strip**

```tsx
// components/landing/ChapterTeaser.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

const CHAPTERS = [
  { n: 1, title: 'The World Has Changed', weeks: '1–2' },
  { n: 2, title: 'What We Built', weeks: '3–5' },
  { n: 3, title: 'How Machines Learn', weeks: '6–8' },
  { n: 4, title: 'When Machines Fail', weeks: '9–10' },
  { n: 5, title: 'AI in the Wild', weeks: '11' },
  { n: 6, title: 'The Reckoning', weeks: '12–13' },
]

export default function ChapterTeaser() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll('.chapter-card')
    if (!cards) return

    gsap.from(cards, {
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      },
    })
  }, [])

  return (
    <section className="py-24 px-6 max-w-6xl mx-auto">
      <p className="text-center text-[var(--text-muted)] text-xs uppercase tracking-widest mb-12">
        Module 1 — 6 Chapters
      </p>

      <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {CHAPTERS.map((ch) => (
          <div
            key={ch.n}
            className="chapter-card border border-[var(--locked-bg)] p-6 opacity-0"
          >
            <p className="text-xs text-[var(--accent-cyan)] mb-2">Ch {ch.n} · Weeks {ch.weeks}</p>
            <p className="text-sm text-[var(--text-primary)] font-medium">{ch.title}</p>
          </div>
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/series"
          className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--accent-cyan)] text-[var(--bg)] text-sm font-bold uppercase tracking-widest hover:bg-white transition-all duration-300"
        >
          Start Module 1 →
        </Link>
      </div>
    </section>
  )
}
```

**Step 3: Wire up landing page (placeholder for 3D hero)**

```tsx
// app/page.tsx
import HeroText from '@/components/hero/HeroText'
import ChapterTeaser from '@/components/landing/ChapterTeaser'

export default function LandingPage() {
  return (
    <main>
      {/* Hero: 3D canvas added in Task 6, text overlay now */}
      <section className="relative w-full h-screen bg-[var(--bg)] overflow-hidden">
        {/* 3D canvas will be inserted here in Task 6 */}
        <HeroText />
      </section>

      {/* 3-panel strip */}
      <section className="py-16 px-6 border-t border-[var(--locked-bg)]">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {['One concept a day', 'Built for how IT thinks', 'Scroll to learn'].map((text) => (
            <p key={text} className="text-[var(--text-muted)] text-sm uppercase tracking-widest">
              {text}
            </p>
          ))}
        </div>
      </section>

      {/* Chapter teaser */}
      <ChapterTeaser />
    </main>
  )
}
```

**Step 4: Verify in browser**

```bash
npm run dev
```
Open `http://localhost:3000`. Verify:
- Dark background with "AI & ML" title
- Typewriter animation runs
- "Enter the Series" button visible
- Scrolling down reveals chapter cards with stagger animation

**Step 5: Commit**

```bash
git add app/page.tsx components/hero/HeroText.tsx components/landing/ChapterTeaser.tsx
git commit -m "feat: landing page structure, hero text, chapter teaser"
```

---

## Task 6: 3D Particle → Neural Network Hero

**Files:**
- Create: `components/hero/ParticleNetwork.tsx`
- Modify: `app/page.tsx`

**Step 1: Create the ParticleNetwork component**

```tsx
// components/hero/ParticleNetwork.tsx
'use client'
import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const PARTICLE_COUNT = 2000
const NODE_COUNT = 40
const CONNECTION_DISTANCE = 3.5

// Fixed node positions forming a neural network structure
function generateNodePositions(): THREE.Vector3[] {
  const positions: THREE.Vector3[] = []
  // Layer 1: input (8 nodes)
  for (let i = 0; i < 8; i++) positions.push(new THREE.Vector3(-8, (i - 3.5) * 1.5, 0))
  // Layer 2: hidden 1 (12 nodes)
  for (let i = 0; i < 12; i++) positions.push(new THREE.Vector3(-3, (i - 5.5) * 1.2, 0))
  // Layer 3: hidden 2 (12 nodes)
  for (let i = 0; i < 12; i++) positions.push(new THREE.Vector3(3, (i - 5.5) * 1.2, 0))
  // Layer 4: output (8 nodes)
  for (let i = 0; i < 8; i++) positions.push(new THREE.Vector3(8, (i - 3.5) * 1.5, 0))
  return positions
}

const NODE_TARGETS = generateNodePositions()

function Particles({ phase }: { phase: number }) {
  const meshRef = useRef<THREE.Points>(null)
  const mouse = useRef({ x: 0, y: 0 })

  // Initial random positions
  const { positions, targets } = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3)
    const tgt = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Random start positions (chaos)
      pos[i * 3] = (Math.random() - 0.5) * 30
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10

      // Target: first NODE_COUNT particles snap to nodes, rest drift nearby
      if (i < NODE_COUNT) {
        const node = NODE_TARGETS[i]
        tgt[i * 3] = node.x
        tgt[i * 3 + 1] = node.y
        tgt[i * 3 + 2] = node.z
      } else {
        // Extra particles drift around node positions
        const nearNode = NODE_TARGETS[i % NODE_COUNT]
        tgt[i * 3] = nearNode.x + (Math.random() - 0.5) * 2
        tgt[i * 3 + 1] = nearNode.y + (Math.random() - 0.5) * 2
        tgt[i * 3 + 2] = nearNode.z + (Math.random() - 0.5) * 2
      }
    }
    return { positions: pos, targets: tgt }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions.slice(), 3))
    return geo
  }, [positions])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 20
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 15
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useFrame((state) => {
    if (!meshRef.current) return
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array
    const t = state.clock.elapsedTime

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2

      if (phase < 1) {
        // Phase 1: chaos — float with noise
        pos[ix] += Math.sin(t * 0.3 + i) * 0.005
        pos[iy] += Math.cos(t * 0.2 + i) * 0.005
      } else {
        // Phase 2+: lerp toward target with mouse gravity
        const dx = mouse.current.x - targets[ix]
        const dy = mouse.current.y - targets[iy]
        const dist = Math.sqrt(dx * dx + dy * dy)
        const gravity = Math.max(0, 1 - dist / 8) * 0.3 * phase

        const tx = targets[ix] + dx * gravity
        const ty = targets[iy] + dy * gravity

        pos[ix] += (tx - pos[ix]) * 0.05
        pos[iy] += (ty - pos[iy]) * 0.05
        pos[iz] += (targets[iz] - pos[iz]) * 0.05

        // Pulse breathing on nodes
        if (i < NODE_COUNT) {
          pos[iz] += Math.sin(t * 2 + i) * 0.01
        }
      }
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.08}
        color="#00d4ff"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

function Connections({ phase }: { phase: number }) {
  const linesRef = useRef<THREE.LineSegments>(null)

  const { positions, indices } = useMemo(() => {
    const pos: number[] = []
    const idx: number[] = []

    // Connect nodes in adjacent layers
    const layers = [
      NODE_TARGETS.slice(0, 8),
      NODE_TARGETS.slice(8, 20),
      NODE_TARGETS.slice(20, 32),
      NODE_TARGETS.slice(32, 40),
    ]

    for (let l = 0; l < layers.length - 1; l++) {
      for (const a of layers[l]) {
        for (const b of layers[l + 1]) {
          // Only connect some pairs for visual clarity
          if (Math.random() > 0.6) continue
          const ai = pos.length / 3
          pos.push(a.x, a.y, a.z)
          pos.push(b.x, b.y, b.z)
          idx.push(ai, ai + 1)
        }
      }
    }

    return {
      positions: new Float32Array(pos),
      indices: new Uint16Array(idx),
    }
  }, [])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setIndex(new THREE.BufferAttribute(indices, 1))
    return geo
  }, [positions, indices])

  return (
    <lineSegments ref={linesRef} geometry={geometry}>
      <lineBasicMaterial
        color="#7c3aed"
        transparent
        opacity={Math.min(phase * 1.5, 0.4)}
      />
    </lineSegments>
  )
}

function Scene() {
  const phaseRef = useRef(0)

  useEffect(() => {
    // Phase 1 → 2: emerge after 3 seconds
    setTimeout(() => {
      gsap.to(phaseRef, { current: 1, duration: 3, ease: 'power2.inOut' })
    }, 3000)
  }, [])

  return (
    <>
      <Particles phase={phaseRef.current} />
      <Connections phase={phaseRef.current} />
    </>
  )
}

export default function ParticleNetwork() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 18], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene />
    </Canvas>
  )
}
```

**Step 2: Add ParticleNetwork to landing page hero**

```tsx
// app/page.tsx — update hero section only
import dynamic from 'next/dynamic'

const ParticleNetwork = dynamic(() => import('@/components/hero/ParticleNetwork'), {
  ssr: false, // Three.js requires browser APIs
})

// In the hero section:
<section className="relative w-full h-screen bg-[var(--bg)] overflow-hidden">
  <ParticleNetwork />
  <HeroText />
</section>
```

**Step 3: Verify in browser**

```bash
npm run dev
```
Open `http://localhost:3000`. Verify:
- Particles float chaotically on load
- After ~3 seconds, particles begin drifting toward neural network structure
- Moving mouse distorts the network slightly
- Title text renders on top of the 3D canvas
- No console errors

**Step 4: Commit**

```bash
git add components/hero/ParticleNetwork.tsx app/page.tsx
git commit -m "feat: React Three Fiber particle-to-neural-network 3D hero"
```

---

## Task 7: Side Drawer

**Files:**
- Create: `components/navigation/SideDrawer.tsx`
- Create: `components/navigation/DrawerProvider.tsx`
- Modify: `app/layout.tsx`

**Step 1: Create drawer context**

```tsx
// components/navigation/DrawerProvider.tsx
'use client'
import { createContext, useContext, useState, ReactNode } from 'react'

interface DrawerContextType {
  isOpen: boolean
  open: () => void
  close: () => void
}

const DrawerContext = createContext<DrawerContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
})

export function DrawerProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <DrawerContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </DrawerContext.Provider>
  )
}

export const useDrawer = () => useContext(DrawerContext)
```

**Step 2: Create SideDrawer component**

```tsx
// components/navigation/SideDrawer.tsx
'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useDrawer } from './DrawerProvider'

const CHAPTERS = [
  { n: 1, title: 'The World Has Changed', totalPosts: 10 },
  { n: 2, title: 'What We Built', totalPosts: 15 },
  { n: 3, title: 'How Machines Learn', totalPosts: 15 },
  { n: 4, title: 'When Machines Fail', totalPosts: 10 },
  { n: 5, title: 'AI in the Wild', totalPosts: 5 },
  { n: 6, title: 'The Reckoning', totalPosts: 10 },
]

interface SideDrawerProps {
  availablePostsByChapter: Record<number, number>
  currentChapter?: number
}

export default function SideDrawer({ availablePostsByChapter, currentChapter }: SideDrawerProps) {
  const { isOpen, close } = useDrawer()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(drawerRef.current, { x: 0, duration: 0.3, ease: 'power2.out' })
    } else {
      gsap.to(drawerRef.current, { x: '-100%', duration: 0.25, ease: 'power2.in' })
    }
  }, [isOpen])

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={close}
        />
      )}

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 h-full w-72 bg-[#0d1117] border-r border-[var(--locked-bg)] z-50 flex flex-col p-6"
        style={{ transform: 'translateX(-100%)' }}
      >
        <div className="flex items-center justify-between mb-8">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-cyan)]">Module 1</span>
          <button onClick={close} className="text-[var(--text-muted)] hover:text-white text-xl">✕</button>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          {CHAPTERS.map((ch) => {
            const available = availablePostsByChapter[ch.n] ?? 0
            const isLocked = available === 0
            const isCurrent = currentChapter === ch.n
            const pct = Math.round((available / ch.totalPosts) * 100)

            if (isLocked) {
              return (
                <div key={ch.n} className="px-3 py-3 rounded text-[var(--text-muted)] opacity-50 cursor-not-allowed">
                  <span className="text-xs mr-2">🔒</span>
                  <span className="text-sm">Ch {ch.n} — {ch.title}</span>
                </div>
              )
            }

            return (
              <Link
                key={ch.n}
                href={`/series/chapter-${ch.n}`}
                onClick={close}
                className={`px-3 py-3 rounded text-sm transition-colors ${
                  isCurrent
                    ? 'bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30'
                    : 'text-[var(--text-primary)] hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span>Ch {ch.n} — {ch.title}</span>
                  <span className="text-xs text-[var(--text-muted)]">{available}/{ch.totalPosts}</span>
                </div>
                <div className="w-full h-0.5 bg-[var(--locked-bg)] rounded">
                  <div
                    className="h-full bg-[var(--accent-cyan)] rounded transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-[var(--locked-bg)] pt-4 mt-4">
          <p className="text-xs text-[var(--text-muted)] mb-1">Overall Progress</p>
          <p className="text-sm text-[var(--text-primary)]">
            {Object.values(availablePostsByChapter).reduce((a, b) => a + b, 0)} / 65 posts
          </p>
        </div>
      </div>
    </>
  )
}
```

**Step 3: Add hamburger button component**

```tsx
// components/navigation/HamburgerButton.tsx
'use client'
import { useDrawer } from './DrawerProvider'

export default function HamburgerButton() {
  const { open } = useDrawer()
  return (
    <button
      onClick={open}
      className="fixed top-5 left-5 z-30 flex flex-col gap-1.5 p-2 group"
      aria-label="Open navigation"
    >
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="block w-6 h-px bg-[var(--text-muted)] group-hover:bg-[var(--accent-cyan)] transition-colors"
        />
      ))}
    </button>
  )
}
```

**Step 4: Wrap layout with DrawerProvider**

```tsx
// app/layout.tsx — add DrawerProvider wrapper
import { DrawerProvider } from '@/components/navigation/DrawerProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <DrawerProvider>
          {children}
        </DrawerProvider>
      </body>
    </html>
  )
}
```

**Step 5: Verify drawer opens/closes**

```bash
npm run dev
```
Click hamburger → drawer slides in from left. Click overlay → closes. Smooth animation.

**Step 6: Commit**

```bash
git add components/navigation/ app/layout.tsx
git commit -m "feat: side drawer with chapter navigation and progress"
```

---

## Task 8: Series Feed Page (`/series`)

**Files:**
- Create: `app/series/page.tsx`
- Create: `components/series/ChapterCard.tsx`
- Create: `components/series/ProgressBar.tsx`

**Step 1: Create ProgressBar**

```tsx
// components/series/ProgressBar.tsx
export default function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.round((value / max) * 100)
  return (
    <div className="w-full h-1 bg-[var(--locked-bg)] rounded overflow-hidden">
      <div
        className="h-full bg-[var(--accent-cyan)] rounded transition-all duration-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
```

**Step 2: Create ChapterCard**

```tsx
// components/series/ChapterCard.tsx
import Link from 'next/link'
import ProgressBar from './ProgressBar'
import type { ChapterMeta } from '@/lib/content'

export default function ChapterCard({ chapter }: { chapter: ChapterMeta }) {
  const isLocked = chapter.availablePosts === 0
  const isComplete = chapter.availablePosts === chapter.totalPosts
  const hasStarted = chapter.availablePosts > 0 && !isComplete

  if (isLocked) {
    return (
      <div className="border border-[var(--locked-bg)] p-6 bg-[var(--locked-bg)]/30 opacity-60">
        <p className="text-xs text-[var(--text-muted)] mb-1">🔒 Chapter {chapter.number}</p>
        <h3 className="text-base font-semibold text-[var(--text-muted)]">{chapter.title}</h3>
        <p className="text-xs text-[var(--text-muted)] mt-2">Unlocks with Week {chapter.number * 2 - 1}</p>
      </div>
    )
  }

  return (
    <Link
      href={`/series/chapter-${chapter.number}`}
      className="block border border-[var(--accent-cyan)]/20 p-6 hover:border-[var(--accent-cyan)]/60 transition-all duration-300 group"
    >
      <p className="text-xs text-[var(--accent-cyan)] mb-1 uppercase tracking-widest">
        Chapter {chapter.number}
      </p>
      <h3 className="text-lg font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--accent-cyan)] transition-colors">
        {chapter.title}
      </h3>
      <p className="text-xs text-[var(--text-muted)] mb-4">
        {chapter.availablePosts} of {chapter.totalPosts} posts unlocked
      </p>
      <ProgressBar value={chapter.availablePosts} max={chapter.totalPosts} />
      <p className="text-xs text-[var(--accent-cyan)] mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {isComplete ? 'Review chapter →' : hasStarted ? 'Continue →' : 'Start →'}
      </p>
    </Link>
  )
}
```

**Step 3: Create series feed page**

```tsx
// app/series/page.tsx
import { getAllChapters } from '@/lib/content'
import ChapterCard from '@/components/series/ChapterCard'
import HamburgerButton from '@/components/navigation/HamburgerButton'
import SideDrawer from '@/components/navigation/SideDrawer'

export default async function SeriesPage() {
  const chapters = await getAllChapters()
  const availableByChapter = Object.fromEntries(
    chapters.map(ch => [ch.number, ch.availablePosts])
  )

  return (
    <>
      <HamburgerButton />
      <SideDrawer availablePostsByChapter={availableByChapter} />

      <main className="min-h-screen px-6 py-20 max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-widest text-[var(--accent-cyan)] mb-3">Module 1</p>
          <h1 className="text-4xl font-black text-[var(--text-primary)]">Overview of AI and ML</h1>
          <p className="text-[var(--text-muted)] mt-3 text-sm">
            {chapters.reduce((acc, ch) => acc + ch.availablePosts, 0)} posts available ·{' '}
            {chapters.reduce((acc, ch) => acc + ch.totalPosts, 0)} total
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chapters.map(ch => (
            <ChapterCard key={ch.number} chapter={ch} />
          ))}
        </div>
      </main>
    </>
  )
}
```

**Step 4: Verify in browser**

```bash
npm run dev
```
Navigate to `http://localhost:3000/series`. Verify:
- Chapter cards render with correct unlocked counts
- Locked chapters appear dimmed with lock icon
- Clicking unlocked chapter navigates to `/series/chapter-N`
- Hamburger opens drawer

**Step 5: Commit**

```bash
git add app/series/page.tsx components/series/
git commit -m "feat: series feed page with chapter cards and progress"
```

---

## Task 9: Chapter Detail Page + Post Cards

**Files:**
- Create: `app/series/chapter-[n]/page.tsx`
- Create: `components/series/PostCard.tsx`
- Create: `components/ui/LockBadge.tsx`

**Step 1: Create LockBadge**

```tsx
// components/ui/LockBadge.tsx
export default function LockBadge({ releaseDate }: { releaseDate: string }) {
  return (
    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
      <span>🔒</span>
      <span>Coming {releaseDate}</span>
    </div>
  )
}
```

**Step 2: Create PostCard**

```tsx
// components/series/PostCard.tsx
'use client'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LockBadge from '@/components/ui/LockBadge'
import ScenePanel from './ScenePanel'
import type { Post } from '@/lib/content'

gsap.registerPlugin(ScrollTrigger)

interface PostCardProps {
  post: Post
  onExpand: (day: number | null) => void
  isExpanded: boolean
}

export default function PostCard({ post, onExpand, isExpanded }: PostCardProps) {
  const bodyRef = useRef<HTMLDivElement>(null)
  const { frontmatter: fm, hook, scenes, takeaway, available, releaseDate } = post

  const handleToggle = () => {
    if (!available) return
    onExpand(isExpanded ? null : fm.day)
  }

  const dayLabel = `Day ${String(fm.day).padStart(2, '0')} · ${fm.weekday.slice(0, 3).toUpperCase()}`

  // Locked state
  if (!available) {
    return (
      <div className="border border-[var(--locked-bg)] p-5 bg-[var(--locked-bg)]/20">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[var(--text-muted)] font-mono">{dayLabel}</span>
          <LockBadge releaseDate={releaseDate} />
        </div>
        <p className="text-sm text-[var(--text-muted)] mt-2 blur-sm select-none">
          {fm.post_title}
        </p>
      </div>
    )
  }

  return (
    <div className={`border transition-all duration-300 ${
      isExpanded
        ? 'border-[var(--accent-cyan)]/40 bg-white/2'
        : 'border-[var(--locked-bg)] hover:border-[var(--accent-cyan)]/30'
    }`}>
      {/* Collapsed header — always visible */}
      <button
        onClick={handleToggle}
        className="w-full text-left p-5 flex items-start justify-between gap-4"
      >
        <div>
          <span className="text-xs text-[var(--accent-cyan)] font-mono block mb-1">{dayLabel}</span>
          <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
            {fm.post_title}
          </h3>
          {!isExpanded && (
            <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">{hook}</p>
          )}
        </div>
        <span className="text-[var(--text-muted)] text-xs shrink-0 mt-1">
          {isExpanded ? 'Done ↑' : 'Read ↓'}
        </span>
      </button>

      {/* Expanded body */}
      {isExpanded && (
        <div ref={bodyRef} className="px-5 pb-8 border-t border-[var(--locked-bg)]">
          {/* Hook */}
          <div className="py-6">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-cyan)] mb-3 block">◎ Hook</span>
            <p className="text-base text-[var(--text-primary)] leading-relaxed">{hook}</p>
          </div>

          {/* Scenes */}
          {scenes.map((scene, i) => (
            <ScenePanel key={i} scene={scene} index={i} />
          ))}

          {/* Takeaway */}
          <div className="mt-8 pt-6 border-t border-[var(--accent-purple)]/30">
            <span className="text-xs uppercase tracking-widest text-[var(--accent-cyan)] mb-3 block">◎ Takeaway</span>
            <p className="text-lg font-bold text-[var(--text-primary)] leading-snug">{takeaway}</p>
          </div>

          <button
            onClick={handleToggle}
            className="mt-8 text-xs text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors"
          >
            Done ↑
          </button>
        </div>
      )}
    </div>
  )
}
```

**Step 3: Create chapter detail page**

```tsx
// app/series/chapter-[n]/page.tsx
import { notFound } from 'next/navigation'
import { getChapterPosts, getAllChapters } from '@/lib/content'
import ChapterDetailClient from './ChapterDetailClient'
import HamburgerButton from '@/components/navigation/HamburgerButton'
import SideDrawer from '@/components/navigation/SideDrawer'

const CHAPTER_TITLES = [
  '', // 0-indexed placeholder
  'The World Has Changed',
  'What We Built',
  'How Machines Learn',
  'When Machines Fail',
  'AI in the Wild',
  'The Reckoning',
]

interface Props {
  params: Promise<{ n: string }>
}

export default async function ChapterPage({ params }: Props) {
  const { n } = await params
  const chapterNumber = parseInt(n)

  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 6) {
    notFound()
  }

  const posts = await getChapterPosts(chapterNumber)

  // If chapter exists but no posts are available yet, redirect to series
  const availablePosts = posts.filter(p => p.available)
  if (availablePosts.length === 0) {
    notFound()
  }

  const chapters = await getAllChapters()
  const availableByChapter = Object.fromEntries(
    chapters.map(ch => [ch.number, ch.availablePosts])
  )

  return (
    <>
      <HamburgerButton />
      <SideDrawer availablePostsByChapter={availableByChapter} currentChapter={chapterNumber} />
      <ChapterDetailClient
        posts={posts}
        chapterNumber={chapterNumber}
        chapterTitle={CHAPTER_TITLES[chapterNumber]}
      />
    </>
  )
}

export async function generateStaticParams() {
  return [1, 2, 3, 4, 5, 6].map(n => ({ n: String(n) }))
}
```

**Step 4: Create client component for expand state**

```tsx
// app/series/chapter-[n]/ChapterDetailClient.tsx
'use client'
import { useState } from 'react'
import Link from 'next/link'
import PostCard from '@/components/series/PostCard'
import type { Post } from '@/lib/content'

interface Props {
  posts: Post[]
  chapterNumber: number
  chapterTitle: string
}

export default function ChapterDetailClient({ posts, chapterNumber, chapterTitle }: Props) {
  const [expandedDay, setExpandedDay] = useState<number | null>(null)

  // Group posts by week
  const byWeek = posts.reduce<Record<number, Post[]>>((acc, post) => {
    const week = post.frontmatter.week
    if (!acc[week]) acc[week] = []
    acc[week].push(post)
    return acc
  }, {})

  return (
    <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto">
      <Link href="/series" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors mb-8 block">
        ← All Chapters
      </Link>

      <p className="text-xs uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Chapter {chapterNumber}</p>
      <h1 className="text-3xl font-black text-[var(--text-primary)] mb-10">{chapterTitle}</h1>

      <div className="flex flex-col gap-10">
        {Object.entries(byWeek).map(([week, weekPosts]) => (
          <div key={week}>
            <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mb-4">Week {week}</p>
            <div className="flex flex-col gap-3">
              {weekPosts.map(post => (
                <PostCard
                  key={post.frontmatter.day}
                  post={post}
                  isExpanded={expandedDay === post.frontmatter.day}
                  onExpand={(day) => setExpandedDay(day)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
```

**Step 5: Verify in browser**

```bash
npm run dev
```
Navigate to `http://localhost:3000/series/chapter-1`. Verify:
- Posts grouped by week
- Clicking a post expands it (shows hook, scenes, takeaway)
- Only one post expanded at a time
- Locked posts show blurred title and "Coming [date]"
- Navigating to `/series/chapter-4` (if no posts available) returns 404

**Step 6: Commit**

```bash
git add app/series/chapter-\[n\]/ components/series/PostCard.tsx components/ui/
git commit -m "feat: chapter detail page with hybrid-expand post cards"
```

---

## Task 10: GSAP Scroll Animations Inside Posts

**Files:**
- Create: `components/series/ScenePanel.tsx`

**Step 1: Create ScenePanel with scroll-triggered reveal**

```tsx
// components/series/ScenePanel.tsx
'use client'
import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Scene {
  title: string
  content: string
}

interface ScenePanelProps {
  scene: Scene
  index: number
}

export default function ScenePanel({ scene, index }: ScenePanelProps) {
  const panelRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return

    // Stagger lines within content
    const lines = contentRef.current?.querySelectorAll('p')

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      },
    })

    tl.from(titleRef.current, {
      opacity: 0,
      x: -10,
      duration: 0.4,
      ease: 'power2.out',
    })

    if (lines?.length) {
      tl.from(lines, {
        opacity: 0,
        y: 15,
        stagger: 0.08,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2')
    } else {
      tl.from(contentRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.5,
        ease: 'power2.out',
      }, '-=0.2')
    }

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [])

  // Split content into paragraphs for line-by-line animation
  const paragraphs = scene.content.split('\n').filter(Boolean)

  return (
    <div
      ref={panelRef}
      className="py-6 border-t border-[var(--locked-bg)]"
    >
      <p
        ref={titleRef}
        className="text-xs uppercase tracking-widest text-[var(--accent-purple)] mb-4"
      >
        ━━ Scene {index + 1} — {scene.title}
      </p>
      <div ref={contentRef} className="space-y-2">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-sm text-[var(--text-primary)] leading-relaxed">
            {para}
          </p>
        ))}
      </div>
    </div>
  )
}
```

**Step 2: Verify scroll animations**

```bash
npm run dev
```
Open a chapter, expand a post, scroll slowly through the expanded content. Verify:
- Scene titles fade in from left
- Content paragraphs reveal sequentially as you scroll
- Animation replays if you scroll back up and down
- No jank or layout shift

**Step 3: Commit**

```bash
git add components/series/ScenePanel.tsx
git commit -m "feat: GSAP ScrollTrigger scene-by-scene reveal animations"
```

---

## Task 11: 404 Page + Navigation Polish

**Files:**
- Create: `app/not-found.tsx`
- Modify: `app/series/chapter-[n]/page.tsx` (already has notFound() calls)

**Step 1: Create 404 page**

```tsx
// app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <p className="text-xs uppercase tracking-widest text-[var(--accent-cyan)] mb-4">404</p>
      <h1 className="text-4xl font-black text-[var(--text-primary)] mb-4">
        This post isn't available yet
      </h1>
      <p className="text-[var(--text-muted)] text-sm mb-10 max-w-sm">
        Content in this series unlocks daily. Check back when it's scheduled, or browse what's already available.
      </p>
      <Link
        href="/"
        className="px-8 py-3 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] text-sm uppercase tracking-widest hover:bg-[var(--accent-cyan)] hover:text-[var(--bg)] transition-all"
      >
        Back to Home
      </Link>
    </main>
  )
}
```

**Step 2: Verify 404 behavior**

```bash
npm run dev
```
Navigate to `http://localhost:3000/series/chapter-99`. Verify:
- 404 page renders with dark theme
- "Back to Home" button works
- Page does not show default Next.js 404

**Step 3: Commit**

```bash
git add app/not-found.tsx
git commit -m "feat: custom 404 page with back-to-home button"
```

---

## Task 12: Docker Deployment

**Files:**
- Create: `Dockerfile`
- Create: `docker-compose.yml`
- Create: `.dockerignore`

**Step 1: Create `.dockerignore`**

```
node_modules
.next
.git
*.md
!CLAUDE.md
.env*
Dockerfile
docker-compose.yml
```

**Step 2: Create `Dockerfile`**

```dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Builder
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Runner
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder /app/content ./content

USER nextjs
EXPOSE 3000

CMD ["node", "server.js"]
```

**Step 3: Create `docker-compose.yml`**

```yaml
# docker-compose.yml
version: '3.8'

services:
  webslidedeck:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    container_name: aiml-series
```

**Step 4: Build and run locally**

```bash
docker compose build
docker compose up -d
```

**Step 5: Verify Docker deployment**

```bash
docker compose logs -f
```
Expected: `Server listening on port 3000`

Open `http://localhost:3000` — full app should load identically to `npm run dev`.

**Step 6: Verify from another machine on the network**

On another machine on the same network:
```
http://[your-machine-ip]:3000
```
Replace `[your-machine-ip]` with your machine's local IP (run `ip addr` or `ifconfig` to find it).

**Step 7: Commit**

```bash
git add Dockerfile docker-compose.yml .dockerignore
git commit -m "feat: Docker deployment with Next.js standalone output"
```

---

## Task 13: Final Wiring + Vercel Deploy

**Files:**
- Modify: `app/page.tsx` (scroll-down network phase 4)
- Verify all routes work end-to-end

**Step 1: Add scroll-driven network recession to hero**

In `components/hero/ParticleNetwork.tsx`, add scroll tracking for phase 4 (network recedes as user scrolls):

```tsx
// Inside Scene component, add after the setTimeout:
useEffect(() => {
  ScrollTrigger.create({
    trigger: document.body,
    start: 'top top',
    end: '30% top',
    onUpdate: (self) => {
      // Phase recedes as user scrolls down
      gsap.to(phaseRef, { current: 1 - self.progress * 0.5, duration: 0.1 })
    },
  })
}, [])
```

**Step 2: End-to-end smoke check**

```bash
npm run dev
```

Walk through:
1. `http://localhost:3000` — 3D hero loads, typewriter runs, scroll shows chapter teaser
2. Click "Enter the Series" → `/series` — chapter cards render
3. Click an available chapter → chapter page loads with posts
4. Expand a post — hook, scenes animate in on scroll, takeaway lands
5. Open drawer → chapters listed with progress
6. Navigate to locked chapter → 404 page
7. "Back to Home" → `/`

**Step 3: Production build check**

```bash
npm run build
```
Expected: Build completes with no errors. Note any warnings for follow-up.

**Step 4: Push to GitHub (triggers Vercel auto-deploy if connected)**

```bash
git add .
git commit -m "feat: final wiring, scroll-driven hero recession"
git push origin main
```

**Step 5: Connect Vercel (first time only)**

1. Go to vercel.com → New Project
2. Import `clixsensehamilton/webslidedeck` from GitHub
3. Framework: Next.js (auto-detected)
4. Deploy

**Step 6: Final commit**

```bash
git tag v1.0.0-module1
git push origin v1.0.0-module1
```

---

## Summary

| Task | What it builds |
|------|---------------|
| 1 | Next.js 15 scaffold with all dependencies |
| 2 | Scheduling logic (date gating) |
| 3 | Markdown content parser |
| 4 | Global layout + dark theme |
| 5 | Landing page structure + hero text |
| 6 | 3D particle → neural network hero (R3F) |
| 7 | Side drawer with chapter navigation |
| 8 | Series feed (`/series`) |
| 9 | Chapter detail + hybrid-expand post cards |
| 10 | GSAP scroll-triggered scene animations |
| 11 | 404 page |
| 12 | Docker deployment |
| 13 | Final wiring + Vercel deploy |
