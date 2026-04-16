'use client'

import { useEffect, useRef, useState } from 'react'

// ── Types ──────────────────────────────────────────────────────

export type LineType =
  | 'blank'      // empty spacer
  | 'dim'        // muted grey
  | 'green'      // primary terminal green
  | 'cyan'       // highlight / commands
  | 'amber'      // warnings / stats
  | 'bright'     // white, bold
  | 'box'        // dim box-drawing chars
  | 'label'      // cyan label inside box
  | 'warn'       // amber with ▶ prefix
  | 'bar'        // animated progress bar (needs barValue 0-100)

export interface AnimLine {
  text: string
  type?: LineType
  delay?: number      // ms after previous line appears (default 80)
  barValue?: number   // 0–100, only for type='bar'
  barLabel?: string   // label beside bar
}

interface Props {
  lines: AnimLine[]
  isActive: boolean
  onDone?: () => void
}

// ── Animated bar sub-component ────────────────────────────────

function AnimBar({ value, label }: { value: number; label?: string }) {
  const [current, setCurrent] = useState(0)
  const W = 24

  useEffect(() => {
    let v = 0
    const id = setInterval(() => {
      v = Math.min(v + 2, value)
      setCurrent(v)
      if (v >= value) clearInterval(id)
    }, 18)
    return () => clearInterval(id)
  }, [value])

  const filled = Math.round((current / 100) * W)
  const bar = '█'.repeat(filled) + '░'.repeat(W - filled)

  return (
    <span>
      <span className="term-dim">[</span>
      <span className="term-green">{bar}</span>
      <span className="term-dim">]</span>
      <span className="term-amber ml-2">{current}%</span>
      {label && <span className="term-dim ml-3">{label}</span>}
    </span>
  )
}

// ── Line renderer ─────────────────────────────────────────────

function RenderLine({ line }: { line: AnimLine }) {
  const { text, type = 'green', barValue, barLabel } = line

  if (type === 'blank') return <div style={{ height: '0.55em' }} />

  if (type === 'bar') {
    return (
      <div className="pl-2">
        <AnimBar value={barValue ?? 100} label={barLabel} />
      </div>
    )
  }

  const cls =
    type === 'dim'    ? 'term-dim' :
    type === 'cyan'   ? 'term-cyan' :
    type === 'amber'  ? 'term-amber' :
    type === 'bright' ? 'term-bright font-bold' :
    type === 'box'    ? 'term-dim' :
    type === 'label'  ? 'term-cyan font-bold' :
    type === 'warn'   ? 'term-amber' :
    'term-green'

  const prefix = type === 'warn' ? '  ▶  ' : ''

  return <div className={cls}>{prefix}{text}</div>
}

// ── Main animator ─────────────────────────────────────────────

export default function TerminalAnimator({ lines, isActive, onDone }: Props) {
  const [visible, setVisible] = useState(0)
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isActive || hasRun.current) return
    hasRun.current = true
    let cancelled = false

    async function run() {
      for (let i = 0; i < lines.length; i++) {
        const ms = lines[i].delay ?? 80
        await tick(ms)
        if (cancelled) return
        setVisible(i + 1)
      }
      onDone?.()
    }

    run()
    return () => {
      cancelled = true
      hasRun.current = false // reset so Strict Mode remount can re-run
    }
  }, [isActive, lines, onDone])

  return (
    <div className="space-y-0">
      {lines.slice(0, visible).map((line, i) => (
        <RenderLine key={i} line={line} />
      ))}
    </div>
  )
}

function tick(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
