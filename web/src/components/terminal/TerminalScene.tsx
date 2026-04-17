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
    return () => {
      cancelled = true
      hasRun.current = false // reset so Strict Mode remount can re-run
    }
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

  // Comparison: unambiguous two-sided contrast signals only
  // Removed "rather than" / "instead of" — both appear in explanatory prose
  if (/\bblind\b|deliberately|question isn|\bvs\b|versus/.test(t)) return 'comparison'
  // Paired product comparisons: Gmail/Netflix ("operates the same way"), Alexa/Tesla ("both require")
  if (/operates the same way|both require/.test(t)) return 'comparison'

  // Checklist: enumeration/ordering/module objectives — check BEFORE network
  // \blearn\b: word-boundary prevents substring match on "machine learning" / "deep learning"
  if (/cover|objective|module|curriculum|what (?:this|we)|\bwill learn\b|\bto learn\b|skill/.test(t)) return 'checklist'
  if (/the (?:first|second|third) is/.test(t)) return 'checklist'
  if (/three (?:discipline|domain|pillar|ingredient)|intersection of three/.test(t)) return 'checklist'
  if (/territory|home ground|already sit|it owns the pillar/.test(t)) return 'checklist'
  if (/sets up|what (?:this|next) week|next week.*moves/.test(t)) return 'checklist'
  if (/it'?s data engineer|it'?s about developing/.test(t)) return 'checklist'
  if (/it enables|enables the|\bgpu\b|compute resources|training jobs/i.test(t)) return 'checklist'
  if (/produces traditional (?:software|research)/.test(t)) return 'checklist'
  // Nesting/containment: AI ⊃ ML ⊃ DL structure (Day 6 S1/S2)
  if (/is a subset of|nesting dolls?|outermost.*is ai/i.test(t)) return 'checklist'
  // Vocabulary precision: "when someone says X, you know Y" (Day 6 S3)
  if (/when someone says?|when they say/.test(t)) return 'checklist'
  // Diagnostic layer mapping: "each layer has its own failure modes" (Day 9 S4)
  if (/each layer has its own/.test(t)) return 'checklist'
  // Inline object enumeration: "this is a stop sign, this is a pedestrian" (Day 8 S4)
  if (/this is (?:a|an|the) \w.+,.*this is (?:a|an|the) \w/i.test(t)) return 'checklist'

  // Data-quality-degrades-model cascade (Day 5 S2 pattern)
  if (/model'?s ceiling|ceiling is set|before training begins|siloed.*access|data quality/i.test(t)) return 'cascade'

  // Layer-progression cascade: neural network depth trace (Day 8 S2)
  if (/early layers?|deeper layers?|each layer.*recogni|progressively more abstract/i.test(t)) return 'cascade'
  // Sequential product pipeline (Day 8 S3 Alexa)
  if (/audio signal|breaks.*into.*segments?|passes.*through.*layers?/i.test(t)) return 'cascade'
  // Soft-failure ticket cascade: mis-classifying, degraded after migration (Day 10 S1)
  if (/mis-classif|degrad.*after|stopped handling|ticket queue/i.test(t)) return 'cascade'

  // Cascade: unambiguous failure-chain words
  if (/choke|crash|\bbroke\b|incident/.test(t)) return 'cascade'
  // fail/downstream only when paired with cascade-context (prevent "failure" in analytical prose)
  if (/\bfail(?:ed|s|ure)?\b.{0,80}(?:downstream|choke|pipeline|queue)/i.test(t)) return 'cascade'
  if (/\bdownstream\b/.test(t)) return 'cascade'
  if (/resource limit/.test(t)) return 'cascade'

  // Network: actual system/infrastructure diagram
  if (/infrastructure|pipeline|server|queue|monitor|endpoint|node/.test(t)) return 'network'
  if (/already running|filter.*email|route.*ticket|email.*filter|ticket.*route/.test(t)) return 'network'

  return 'text'
}

// ── Scene line builder (dispatches to mode) ────────────────────

const W = 52

function buildSceneLines(content: string, title: string, sceneNum: number): AnimLine[] {
  const mode = detectMode(title, content)
  const header = makeHeader(sceneNum, title)
  const body = parseBody(content)

  switch (mode) {
    case 'network':    return [...header, ...buildNetwork(body, content)]
    case 'cascade':    return [...header, ...buildCascade(body, content)]
    case 'checklist':  return [...header, ...buildChecklist(body, content)]
    case 'comparison': return [...header, ...buildComparison(body, content)]
    default:           return [...header, ...buildText(body)]
  }
}

// ── Header box ─────────────────────────────────────────────────

function makeHeader(sceneNum: number, title: string): AnimLine[] {
  const prefix = `  SCENE ${sceneNum} — `
  const maxTitleW = W - prefix.length
  const fullTitle = title.toUpperCase()

  const lines: AnimLine[] = [
    { text: '┌' + '─'.repeat(W) + '┐', type: 'box', delay: 30 },
  ]

  if (fullTitle.length <= maxTitleW) {
    lines.push({ text: ('│' + prefix + fullTitle).padEnd(W + 1) + '│', type: 'label', delay: 30 })
  } else {
    // Wrap at word boundary
    const words = fullTitle.split(' ')
    let line1 = ''
    let splitAt = words.length
    for (let i = 0; i < words.length; i++) {
      const candidate = line1 ? line1 + ' ' + words[i] : words[i]
      if (candidate.length > maxTitleW) { splitAt = i; break }
      line1 = candidate
    }
    const line2 = '  ' + words.slice(splitAt).join(' ')
    lines.push({ text: ('│' + prefix + line1).padEnd(W + 1) + '│', type: 'label', delay: 30 })
    lines.push({ text: ('│' + line2).padEnd(W + 1) + '│', type: 'label', delay: 20 })
  }

  lines.push({ text: '└' + '─'.repeat(W) + '┘', type: 'box', delay: 30 })
  lines.push({ text: '', type: 'blank', delay: 20 })
  return lines
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

function buildNetwork(sentences: string[], content: string): AnimLine[] {
  const systems = extractSystems(content)
  const out: AnimLine[] = [
    { text: '  scanning infrastructure...', type: 'dim', delay: 300 },
    { text: '', type: 'blank', delay: 30 },
  ]

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

  out.push({ text: '', type: 'blank', delay: 200 })
  const hasAIModels = /already running|email.*filter|ticket.*route|spam|anomal/i.test(content)
  out.push({
    text: hasAIModels
      ? '  AI models detected on existing infrastructure'
      : '  CS PILLAR: IT-owned systems mapped',
    type: 'amber',
    delay: 500,
  })
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
  const matches: Array<{ label: string; role: string; pct: number }> = []
  const patterns: [RegExp, string, string, number][] = [
    // Business/app layer
    [/email|spam|filter/i,                         'EMAIL_FILTER',   'email server',       94],
    [/ticket|support|route/i,                      'TICKET_ROUTER',  'support queue',       81],
    [/anomal|flag/i,                               'ANOMALY_DETECT', 'anomaly monitor',     63],
    [/forecast|predict/i,                          'USAGE_FORECAST', 'forecaster',          52],
    [/recommend|personalise|personalize|user experience/i, 'RECO_ENGINE', 'recommendations', 78],
    [/voice|speech|accent|voice interface/i,             'VOICE_IFACE', 'voice interface',   77],
    // Data / IT infrastructure layer
    [/pipeline/i,                                  'DATA_PIPELINE',  'data pipeline',       87],
    [/storage|storage arch/i,                      'STORAGE_ARCH',   'storage layer',       91],
    [/access control|access govern|govern/i,       'ACCESS_CTRL',    'access control',      74],
    [/gpu|compute|training|inference/i,            'COMPUTE_LAYER',  'model compute',       83],
    [/monitor.*drift|drift|model output/i,         'DRIFT_MONITOR',  'output monitor',      68],
    [/wrangl/i,                                    'DATA_WRANGLER',  'data wrangling',      79],
  ]
  patterns.forEach(([re, label, role, pct]) => {
    if (re.test(content) && !matches.find(m => m.label === label))
      matches.push({ label, role, pct })
  })
  // Fallback only to Day-1 defaults if content is truly unrecognised
  if (matches.length < 2) {
    return [
      { label: 'EMAIL_FILTER',   role: 'email server',    pct: 94 },
      { label: 'TICKET_ROUTER',  role: 'support queue',   pct: 81 },
      { label: 'ANOMALY_DETECT', role: 'anomaly monitor', pct: 63 },
      { label: 'USAGE_FORECAST', role: 'forecaster',      pct: 52 },
    ]
  }
  return matches
}

function buildNodeRow(systems: Array<{ label: string }>, close = false): string {
  const node = close ? '└─────────────┘' : '┌─────────────┐'
  return '  ' + systems.map(() => node).join('     ')
}

function buildLabelRow(systems: Array<{ label: string }>): string {
  return '  ' + systems.map(s => `│ ${s.label.slice(0, 11).padEnd(11)} │`).join('─────')
}

// ── CASCADE graphic ────────────────────────────────────────────

function buildCascade(sentences: string[], content: string): AnimLine[] {
  const steps = extractCascadeSteps(content)
  // Context-aware headers: learning/pipeline progressions are not incident logs
  const isProgression = /early layers?|deeper layers?|each layer|audio signal|speech.*segment/i.test(content)
  const header = isProgression ? '  PROCESSING PIPELINE TRACE' : '  INCIDENT LOG — AI SYSTEM FAILURE'
  const footer = isProgression ? '  STATUS: ✓ RUNNING   LAYER: SEQUENTIAL' : '  STATUS: ⚠ UNCONTAINED   OWNER: IT INFRASTRUCTURE'

  const out: AnimLine[] = [
    { text: header, type: 'amber', delay: 300 },
    { text: '  ' + '─'.repeat(W - 2), type: 'box', delay: 60 },
    { text: '', type: 'blank', delay: 20 },
  ]

  steps.forEach((step, i) => {
    const ts = `T+${String(i * 17).padStart(4, '0')}`
    const isFirst = i === 0
    const isLast = i === steps.length - 1
    const type = isLast ? 'warn' : isFirst ? 'amber' : 'green'
    out.push({ text: `  [${ts}]  ${step}`, type, delay: 280 })
  })

  out.push({ text: '', type: 'blank', delay: 200 })
  out.push({ text: '  ' + '─'.repeat(W - 2), type: 'box', delay: 60 })
  out.push({ text: footer, type: 'dim', delay: 80 })
  out.push({ text: '', type: 'blank', delay: 30 })
  if (sentences[0]) out.push({ text: `  ${sentences[0]}`, type: 'green', delay: 300 })
  if (sentences[1]) out.push({ text: `  ${sentences[1]}`, type: 'green', delay: 80 })
  out.push({ text: '', type: 'blank', delay: 20 })

  return out
}

function extractCascadeSteps(content: string): string[] {
  const steps: string[] = []

  // Data-quality-degrades-model pattern (Day 5 S2)
  if (/siloed/i.test(content))                         steps.push('data siloed — model cannot reach required sources')
  if (/incomplete|duplicat/i.test(content))            steps.push('incomplete/duplicate records enter pipeline')
  if (/ceiling is set|before training/i.test(content)) steps.push('model ceiling fixed before training begins')
  if (/model design decision/i.test(content))          steps.push('IT pipeline choices = model design choices')
  if (steps.length >= 2) return steps.slice(0, 6)

  // Layer-progression pattern: neural network depth trace (Day 8 S2)
  if (/early layers?.*edge|detect.*edge/i.test(content))       steps.push('early layers detect edges and contrasts')
  if (/edges?.*shapes?|combine.*shapes?/i.test(content))       steps.push('middle layers combine edges into shapes')
  if (/shapes?.*objects?|assemble.*objects?/i.test(content))   steps.push('deeper layers assemble shapes into objects')
  if (/phonemes?/i.test(content))                              steps.push('early layers: raw audio → phonemes extracted')
  if (/semantic meaning/i.test(content))                       steps.push('deep layers: words → semantic meaning resolved')
  if (steps.length >= 2) return steps.slice(0, 6)

  // Alexa sequential pipeline (Day 8 S3)
  if (/audio signal.*real time/i.test(content))                steps.push('audio signal received in real time')
  if (/breaks.*segments?|speech.*segments?/i.test(content))    steps.push('speech broken into segments')
  if (/passes.*trained layers?/i.test(content))                steps.push('segments passed through trained layers')
  if (/text interpretation/i.test(content))                    steps.push('text interpretation produced')
  if (/routes.*interpretation|appropriate response/i.test(content)) steps.push('interpretation routed to response')
  if (steps.length >= 2) return steps.slice(0, 6)

  // IT ticket cascade: AI/ML-layer change surfaces as IT ticket (Day 10 S1)
  if (/email.*filter|mis-classif/i.test(content))              steps.push('EMAIL_FILTER mis-classifying legitimate messages')
  if (/recommend.*degrad|catalogue migration/i.test(content))  steps.push('RECO_ENGINE degraded after catalogue migration')
  if (/voice.*accent|regional accent/i.test(content))          steps.push('VOICE_IFACE fails on regional accents after infra move')
  if (/root cause.*ml|ml.*level/i.test(content))               steps.push('Root cause: ML/DL layer — symptom lands in IT queue')
  if (steps.length >= 2) return steps.slice(0, 6)

  // Infrastructure failure pattern (Day 1 S2)
  if (/pipeline|choke/i.test(content))    steps.push('ML_PIPELINE hits resource ceiling')
  if (/resource limit/i.test(content))    steps.push('processing queue begins to back up')
  if (/ticket|support/i.test(content))    steps.push('TICKET_ROUTER receives malformed output')
  if (/email|filter|spam/i.test(content)) steps.push('EMAIL_FILTER starts misclassifying')
  if (/anomal|flag/i.test(content))       steps.push('ANOMALY_DETECT goes silent — data starved')
  if (/downstream/i.test(content))        steps.push('downstream systems enter degraded state')
  if (/uptime|responsible|optional/i.test(content)) steps.push('on-call paged — no runbook for ML failure')

  return steps.length >= 3 ? steps.slice(0, 6) : [
    'ML_PIPELINE hits resource ceiling',
    'processing queue begins to back up',
    'TICKET_ROUTER receives malformed output',
    'EMAIL_FILTER starts misclassifying',
    'on-call paged — no runbook for ML failure',
  ]
}

// ── CHECKLIST graphic ──────────────────────────────────────────

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

  return out
}

function extractChecklistItems(content: string): string[] {
  // 1. Explicit bullet points
  const bullets = content.match(/(?:[-•*]|\d+\.)\s+([^.]+\.?)/g)
  if (bullets && bullets.length >= 2) {
    return bullets.slice(0, 6).map(b => b.replace(/^[-•*\d.]+\s+/, '').trim())
  }

  // 2. "produces X" — pillar-removal outcomes ("without the math, produces traditional software")
  const producesMatches = [...content.matchAll(/produces ([^:—.]+)/gi)]
  if (producesMatches.length >= 2) {
    return producesMatches.slice(0, 5).map(m => m[1].trim())
  }

  // 3. Ordinal "The first is X — Y. The second is A — B." pattern
  const ordinals = [...content.matchAll(/The (?:first|second|third|fourth|fifth) is ([^.]+)/gi)]
  if (ordinals.length >= 2) {
    return ordinals.slice(0, 5).map(m =>
      m[1].replace(/\s*—\s*.+/, '').trim()
    )
  }

  // 4. Nesting/containment: AI ⊃ ML ⊃ DL (Day 6 S1/S2 — "is a subset of", "nesting dolls")
  if (/is a subset of|nesting doll|outermost doll/i.test(content)) {
    return [
      'AI — outermost: systems that exhibit intelligent behaviour',
      'Machine Learning — subset of AI: learns from data, not rules',
      'Deep Learning — subset of ML: neural networks, perception tasks',
    ]
  }

  // 5. "When someone says X, you know Y" — vocabulary precision (Day 6 S3)
  const whenSaysItems = [...content.matchAll(/When (?:someone says?|they say) [^.]+\./gi)]
  if (whenSaysItems.length >= 2) {
    return whenSaysItems.slice(0, 4).map(m => m[0].replace(/\.$/, '').trim())
  }

  // 6. "This week we'll go through X, see Y, and map Z" — curriculum (Day 6 S4)
  const weekPlan = content.match(/[Tt]his week (?:we'?ll|we will) ([^.]+)\./i)
  if (weekPlan) {
    const clauses = weekPlan[1]
      .split(/,\s*(?:and\s+)?/)
      .map(s => s.replace(/^(?:go through|see it in|map it to|cover)\s+/i, '').trim())
      .filter(s => s.length > 6)
    if (clauses.length >= 2) return clauses.slice(0, 5)
  }

  // 7. "Next week ... — clause1, clause2, and clause3" — forward preview (Day 10 S3)
  const nextWeekMatch = content.match(/[Nn]ext week[^—]*—\s*([^.]+)\./i)
  if (nextWeekMatch) {
    const clauses = nextWeekMatch[1]
      .split(/,\s*(?:and\s+)?/)
      .map(s => s.trim())
      .filter(s => s.length > 4)
    if (clauses.length >= 2) return clauses.slice(0, 5)
  }

  // 8. "this is a X, this is a pedestrian" — inline object enumeration (Day 8 S4 Tesla)
  const thisIsMatches = [...content.matchAll(/this is (?:a |an |the )([\w][\w\s]{2,20})(?=[,—.])/gi)]
  if (thisIsMatches.length >= 2) {
    return thisIsMatches.slice(0, 6).map(m => m[1].trim()).filter(s => s.length > 3)
  }

  // 9. "When X, Y" diagnostic layer mapping — "When Waze fails, look at AI layer" (Day 9 S4)
  const diagnosticWhen = [...content.matchAll(/When ([^,]+), ([^.]+)\./gi)]
  if (diagnosticWhen.length >= 2) {
    return diagnosticWhen.slice(0, 4).map(m => {
      const system = m[1].replace(/^a system like /i, '').trim()
      const diag = m[2].trim().replace(/^the (?:failure is in |ml model |deep learning model'?s )/i, '').slice(0, 60)
      return `${system}: ${diag}`
    })
  }

  // 10. "An X-layer ... needs Y" — three-layer provisioning (Day 10 S2)
  const layerNeeds = [...content.matchAll(/(?:An?\s+)?([\w][\w\s-]*?layer[^.]*?needs [^.]+)\./gi)]
  if (layerNeeds.length >= 2) {
    const items = layerNeeds.slice(0, 3).map(m => m[1].replace(/^An?\s+/i, '').trim().slice(0, 72))
    if (items.length < 3) {
      const gpuLine = content.match(/GPU availability[^,.]+/i)
      if (gpuLine) items.push('DL layer: ' + gpuLine[0].trim())
    }
    return items
  }

  // 11. "it's X, Y, Z" capability list — skip if "it's about ..."
  const itsMatch = content.match(/it'?s (?!about\b)([a-z][^.]+(?:,\s*[a-z][^,]+){2,})\./i)
  if (itsMatch) {
    const items = itsMatch[1]
      .replace(/\band yes,?\s*/i, '')
      .split(/,\s*(?:and\s+)?/)
      .map(s => s.trim())
      .filter(s => s.length > 4)
    if (items.length >= 2) return items.slice(0, 6)
  }

  // 12. "it's about X, Y, and Z" clauses
  const aboutMatch = content.match(/it'?s about ([^.]+)\./i)
  if (aboutMatch) {
    const clauses = aboutMatch[1]
      .split(/,\s*(?:and\s+)?|;\s*/)
      .map(s => s.replace(/^(to\s+)?/, '').trim())
      .filter(s => s.length > 8)
    if (clauses.length >= 2) return clauses.slice(0, 5)
  }

  // 13. Fallback: split on sentence boundaries only (not em-dash — avoids headless fragments)
  const flat = content.replace(/\n+/g, ' ').trim()
  const parts = flat
    .split(/(?<=[.!?])\s+/)
    .map(s => s.trim().replace(/\.$/, ''))
    .filter(s => s.length > 12 && s.length < 90)
    .slice(0, 5)
  return parts.length >= 2 ? parts : [flat.slice(0, 80)]
}

// ── COMPARISON graphic ─────────────────────────────────────────

function buildComparison(sentences: string[], content: string): AnimLine[] {
  const [left, right] = extractComparisonPair(content)
  const rows = extractComparisonRows(content)
  // col = total chars inside each cell (between │ borders)
  // cell layout: │ + space(1) + content.padEnd(col-1) + │
  const col = 24

  const div  = '─'.repeat(col)
  const cell = (t: string) => ` ${t.padEnd(col - 1)}`
  const blank = ' '.repeat(col)

  const out: AnimLine[] = [
    { text: `  ┌${div}┬${div}┐`, type: 'box', delay: 80 },
    { text: `  │${cell(left)}│${cell(right)}│`, type: 'cyan', delay: 60 },
    { text: `  ├${div}┼${div}┤`, type: 'box', delay: 60 },
  ]

  rows.forEach(([l, r]) => {
    out.push({ text: `  │${blank}│${blank}│`, type: 'box', delay: 30 })
    const lWrapped = wrap(l, col - 2)
    const rWrapped = wrap(r, col - 2)
    const maxRows = Math.max(lWrapped.length, rWrapped.length)
    for (let i = 0; i < maxRows; i++) {
      out.push({
        text: `  │${cell(lWrapped[i] ?? '')}│${cell(rWrapped[i] ?? '')}│`,
        type: 'green',
        delay: i === 0 ? 200 : 60,
      })
    }
    out.push({ text: `  │${blank}│${blank}│`, type: 'box', delay: 30 })
  })

  out.push({ text: `  └${div}┴${div}┘`, type: 'box', delay: 60 })
  out.push({ text: '', type: 'blank', delay: 30 })
  const ctaLine = /gmail.*netflix|netflix.*gmail/i.test(content)
    ? '  ▶  PATTERN LEARNED — PATTERN APPLIED.'
    : /alexa.*tesla|tesla.*alexa/i.test(content)
    ? '  ▶  SAME ARCHITECTURE. DIFFERENT INPUT.'
    : '  ▶  THIS SERIES IS THE ANSWER.'
  out.push({ text: ctaLine, type: 'warn', delay: 500 })
  out.push({ text: '', type: 'blank', delay: 20 })

  return out
}

function extractComparisonPair(content: string): [string, string] {
  if (/blind/i.test(content))  return ['FLYING BLIND', 'MANAGING DELIBERATELY']
  if (/data team/i.test(content)) return ["DATA TEAM'S PROBLEM", 'IT OWNS THE OUTCOME']
  if (/gmail/i.test(content) && /netflix/i.test(content)) return ['GMAIL', 'NETFLIX']
  if (/alexa/i.test(content) && /tesla/i.test(content))   return ['ALEXA', 'TESLA AUTOPILOT']
  return ['WITHOUT CONTEXT', 'WITH FULL CONTEXT']
}

function extractComparisonRows(content: string): [string, string][] {
  if (/gmail/i.test(content) && /netflix/i.test(content)) {
    return [
      ['Trained on email writing patterns', 'Models viewing history across users'],
      ['Smart Compose: phrases follow openings', 'Recommends content matching behaviour'],
      ['Pattern learned — pattern applied', 'Pattern learned — pattern applied'],
    ]
  }
  if (/alexa/i.test(content) && /tesla/i.test(content)) {
    return [
      ['Speech: variable, accented, noisy', 'Vision: lighting, occlusion, movement'],
      ['Interprets human speech', 'Interprets physical world via camera'],
      ['Deep learning layer', 'Deep learning layer'],
    ]
  }
  // Default: Day 1 "flying blind" awareness comparison
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
