'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [phase, setPhase] = useState<'idle' | 'cmd' | 'scanning' | 'output' | 'done'>('idle')
  const [cmdText, setCmdText]     = useState('')
  const [scanDots, setScanDots]   = useState('')
  const [visibleLines, setVisible] = useState(0)
  const hasRun = useRef(false)

  const command   = `read --scene ${sceneNumber}`
  const lines     = buildLines(scene.content, scene.title, sceneNumber)

  useEffect(() => {
    if (!isActive || hasRun.current) return
    hasRun.current = true
    let cancelled = false

    async function run() {
      // type command
      setPhase('cmd')
      for (let i = 0; i <= command.length; i++) {
        await tick(24)
        if (cancelled) return
        setCmdText(command.slice(0, i))
      }

      // scan animation
      setPhase('scanning')
      for (let rep = 0; rep < 3; rep++) {
        for (let d = 1; d <= 3; d++) {
          await tick(130)
          if (cancelled) return
          setScanDots('.'.repeat(d))
        }
      }

      // stream lines
      setPhase('output')
      for (let i = 0; i < lines.length; i++) {
        await tick(lines[i].ms ?? 70)
        if (cancelled) return
        setVisible(i + 1)
      }

      setPhase('done')
    }

    run()
    return () => { cancelled = true }
  }, [isActive, command, lines])

  return (
    <div className="terminal-root min-h-screen flex flex-col justify-center px-6 md:px-14 py-16 pb-20">
      <div className="scanline-sweep" />
      <div className="max-w-2xl w-full mx-auto space-y-1" style={{ fontSize: '15px', lineHeight: '1.8' }}>

        {/* prompt */}
        <div>
          <span className="term-dim">ch{chapterSlug}@aiml:~ </span>
          <span className="term-cyan">$</span>
          <span className="term-green ml-2">{cmdText}</span>
          {phase === 'cmd' && <span className="cursor term-green">▋</span>}
        </div>

        {/* scanning */}
        {phase !== 'idle' && phase !== 'cmd' && (
          <div className="term-dim">
            {'  '}scanning{phase === 'scanning' ? scanDots : '... done'}
          </div>
        )}

        {/* output */}
        {phase !== 'idle' && phase !== 'cmd' && (
          <div className="pt-1">
            {lines.slice(0, visibleLines).map((line, i) => (
              <Line key={i} line={line} />
            ))}
          </div>
        )}

        {/* idle cursor */}
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

// ── Line types ─────────────────────────────────────────────────
interface TermLine {
  text: string
  type: 'blank' | 'header' | 'rule' | 'body' | 'bullet' | 'stat' | 'callout' | 'dim'
  ms?: number
}

function Line({ line }: { line: TermLine }) {
  switch (line.type) {
    case 'blank':   return <div style={{ height: '0.6em' }} />
    case 'rule':    return <div className="term-dim">{line.text}</div>
    case 'header':  return (
      <div className="term-cyan font-bold mb-1 term-glow-cyan" style={{ fontSize: '16px' }}>
        {line.text}
      </div>
    )
    case 'callout': return (
      <div className="term-amber font-bold my-1 term-glow-amber">
        {'  ▶ '}{line.text}
      </div>
    )
    case 'bullet':  return (
      <div className="term-green">
        {'  • '}{line.text}
      </div>
    )
    case 'stat':    return (
      <div className="term-amber font-mono my-1 pl-4">
        {line.text}
      </div>
    )
    case 'dim':     return <div className="term-dim pl-2">{line.text}</div>
    default:        return <div className="term-green pl-2">{line.text}</div>
  }
}

// ── Content → line list ────────────────────────────────────────
function buildLines(content: string, title: string, sceneNum: number): TermLine[] {
  const W = 52
  const out: TermLine[] = []

  // header box
  out.push({ text: '┌' + '─'.repeat(W) + '┐', type: 'rule', ms: 30 })
  out.push({
    text: '│  SCENE ' + sceneNum + ' — ' + title.toUpperCase().slice(0, W - 12).padEnd(W - 10) + '│',
    type: 'header', ms: 30,
  })
  out.push({ text: '└' + '─'.repeat(W) + '┘', type: 'rule', ms: 30 })
  out.push({ text: '', type: 'blank', ms: 20 })

  // parse content into readable chunks
  const clean = content.replace(/\n+/g, ' ').trim()
  const sentences = splitSentences(clean)

  sentences.forEach((s, i) => {
    const wrapped = wordWrap(s, 58)
    wrapped.forEach((w, wi) => {
      out.push({
        text: w,
        type: wi === 0 && i === 0 ? 'callout' : 'body',
        ms: wi === 0 ? 80 : 35,
      })
    })
    if (i < sentences.length - 1) out.push({ text: '', type: 'blank', ms: 15 })
  })

  // stat line if numbers present
  const numMatch = content.match(/\b(\d{1,3})(%|\s+(?:of|percent|cases|systems|tools))/i)
  if (numMatch) {
    const pct = parseInt(numMatch[1])
    const capped = Math.min(pct, 100)
    const barW = 28
    const filled = Math.round((capped / 100) * barW)
    out.push({ text: '', type: 'blank', ms: 20 })
    out.push({
      text: '[' + '█'.repeat(filled) + '░'.repeat(barW - filled) + '] ' + numMatch[1] + (numMatch[2].startsWith('%') ? '%' : '%'),
      type: 'stat', ms: 60,
    })
  }

  out.push({ text: '', type: 'blank', ms: 20 })
  return out
}

function splitSentences(text: string): string[] {
  return text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 3).slice(0, 6)
}

function wordWrap(text: string, max: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    const next = cur ? cur + ' ' + w : w
    if (next.length > max) { lines.push(cur); cur = w }
    else cur = next
  }
  if (cur) lines.push(cur)
  return lines
}

function tick(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
