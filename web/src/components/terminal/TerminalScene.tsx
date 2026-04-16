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
    case 'network':    return [...header, ...buildNetwork(body, content)]
    case 'cascade':    return [...header, ...buildCascade(body, content)]
    case 'checklist':  return [...header, ...buildChecklist(body, content)]
    case 'comparison': return [...header, ...buildComparison(body, content)]
    default:           return [...header, ...buildText(body)]
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
    { label: 'EMAIL_FILTER',   role: 'email server',    pct: 94 },
    { label: 'TICKET_ROUTER',  role: 'support queue',   pct: 81 },
    { label: 'ANOMALY_DETECT', role: 'anomaly monitor', pct: 63 },
    { label: 'USAGE_FORECAST', role: 'forecaster',      pct: 52 },
  ]
  const matches: Array<{ label: string; role: string; pct: number }> = []
  const patterns: [RegExp, string, string, number][] = [
    [/email|spam|filter/i,    'EMAIL_FILTER',   'email server',    94],
    [/ticket|support|route/i, 'TICKET_ROUTER',  'support queue',   81],
    [/anomal|flag/i,          'ANOMALY_DETECT', 'anomaly monitor', 63],
    [/forecast|predict/i,     'USAGE_FORECAST', 'forecaster',      52],
    [/recommend/i,            'RECO_ENGINE',    'recommendations', 78],
    [/pipeline/i,             'ML_PIPELINE',    'data pipeline',   87],
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
  const keywords: [RegExp, string][] = [
    [/pipeline/i,        'ML PIPELINE'],
    [/resource limit/i,  'RESOURCE LIMIT'],
    [/output/i,          'UNCHECKED OUTPUT'],
    [/downstream/i,      'DOWNSTREAM FAILURE'],
    [/choke/i,           'PIPELINE CHOKE'],
    [/fail/i,            'SYSTEM FAILURE'],
    [/crash/i,           'SERVICE CRASH'],
  ]
  const found: string[] = []
  keywords.forEach(([re, label]) => {
    if (re.test(content) && !found.includes(label)) found.push(label)
  })
  return found.length >= 2 ? found : ['ML PIPELINE', 'RESOURCE LIMIT', 'UNCHECKED OUTPUT', 'DOWNSTREAM FAILURE']
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
  const last = sentences[sentences.length - 1]
  if (last) out.push({ text: `  ${last}`, type: 'green', delay: 300 })
  out.push({ text: '', type: 'blank', delay: 20 })

  return out
}

function extractChecklistItems(content: string): string[] {
  const bullets = content.match(/(?:[-•*]|\d+\.)\s+([^.]+\.?)/g)
  if (bullets && bullets.length >= 2) {
    return bullets.slice(0, 6).map(b => b.replace(/^[-•*\d.]+\s+/, '').trim())
  }
  return content
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .filter(s => s.length > 10 && s.length < 80)
    .slice(0, 5)
    .map(s => s.replace(/\.$/, ''))
}

// ── COMPARISON graphic ─────────────────────────────────────────

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

function extractComparisonRows(_sentences: string[]): [string, string][] {
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
