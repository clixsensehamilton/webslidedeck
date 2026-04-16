'use client'

import { useEffect, useRef, useState } from 'react'

interface BootProps {
  postTitle: string
  chapter: string
  releaseDate: string
  dayNumber: number
  hook: string
  onComplete: () => void
}

const BOOT_LINES = [
  { text: 'AIML Series v1.0 — Module 1 Boot Sequence', type: 'bright', delay: 0 },
  { text: '═'.repeat(50), type: 'dim', delay: 0.3 },
  { text: '', type: 'dim', delay: 0.4 },
  { text: '[  OK  ] Initialising content engine...', type: 'green', delay: 0.6 },
  { text: '[  OK  ] Loading chapter metadata...', type: 'green', delay: 1.0 },
  { text: '[  OK  ] Verifying IT context...', type: 'green', delay: 1.4 },
  { text: '[  OK  ] Mounting scene data...', type: 'green', delay: 1.8 },
  { text: '', type: 'dim', delay: 2.1 },
]

export default function TerminalBoot({ postTitle, chapter, releaseDate, dayNumber, hook, onComplete }: BootProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleLines, setVisibleLines] = useState<number>(0)
  const [showMeta, setShowMeta] = useState(false)
  const [showProgress, setShowProgress] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showHook, setShowHook] = useState(false)
  const [hookText, setHookText] = useState('')
  const [showPrompt, setShowPrompt] = useState(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function runBoot() {
      // Stream boot lines
      for (let i = 0; i < BOOT_LINES.length; i++) {
        await delay(i === 0 ? 200 : 400)
        if (cancelled) return
        setVisibleLines(i + 1)
      }

      // Show metadata block
      await delay(300)
      if (cancelled) return
      setShowMeta(true)

      // Show progress bar and animate it
      await delay(400)
      if (cancelled) return
      setShowProgress(true)

      for (let p = 0; p <= 100; p += 2) {
        await delay(18)
        if (cancelled) return
        setProgress(p)
      }

      await delay(400)
      if (cancelled) return

      // Type the hook
      setShowHook(true)
      const fullHook = hook
      for (let i = 0; i <= fullHook.length; i++) {
        await delay(18)
        if (cancelled) return
        setHookText(fullHook.slice(0, i))
      }

      await delay(600)
      if (cancelled) return
      setShowPrompt(true)

      await delay(1200)
      if (cancelled) return
      setDone(true)
      onComplete()
    }

    runBoot()
    return () => { cancelled = true }
  }, [hook, onComplete])

  const progressBar = buildBar(progress, 36)

  return (
    <div
      ref={containerRef}
      className="terminal-root min-h-screen flex flex-col justify-center px-8 md:px-16 py-12"
    >
      <div className="scanline-sweep" />
      <div className="max-w-3xl w-full mx-auto font-mono text-sm md:text-base leading-7 space-y-0">

        {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
          <div key={i} className={lineClass(line.type)}>
            {line.text || '\u00A0'}
          </div>
        ))}

        {showMeta && (
          <div className="mt-2 space-y-1">
            <div><span className="term-dim">{'>'} POST_TITLE: </span><span className="term-cyan">{postTitle}</span></div>
            <div><span className="term-dim">{'>'} CHAPTER:    </span><span className="term-green">{chapter}</span></div>
            <div><span className="term-dim">{'>'} RELEASE:    </span><span className="term-green">{releaseDate}</span></div>
            <div><span className="term-dim">{'>'} DAY:        </span><span className="term-amber">{dayNumber} of 65</span></div>
          </div>
        )}

        {showProgress && (
          <div className="mt-4">
            <div className="term-dim mb-1">Loading scenes...</div>
            <div className="term-green font-mono">
              [{progressBar}] <span className="term-amber">{progress}%</span>
              {progress === 100 && <span className="term-cyan ml-2 term-glow-cyan">— Ready.</span>}
            </div>
          </div>
        )}

        {showHook && (
          <div className="mt-6 border border-[var(--term-muted)] p-4 rounded-sm">
            <div className="term-dim text-xs mb-2 uppercase tracking-widest">{'// hook'}</div>
            <div className="term-cyan leading-7">
              {hookText}
              <span className="cursor term-cyan">▋</span>
            </div>
          </div>
        )}

        {showPrompt && (
          <div className="mt-6 term-green">
            <span className="term-dim">user@aiml:~/module-1 </span>
            <span className="term-cyan">$</span>
            <span className="term-green ml-2">scroll to begin</span>
            {!done && <span className="cursor ml-1">▋</span>}
          </div>
        )}
      </div>
    </div>
  )
}

function lineClass(type: string) {
  switch (type) {
    case 'green':  return 'term-green'
    case 'cyan':   return 'term-cyan'
    case 'amber':  return 'term-amber'
    case 'bright': return 'term-bright text-lg font-bold'
    default:       return 'term-dim'
  }
}

function buildBar(pct: number, width: number) {
  const filled = Math.round((pct / 100) * width)
  const empty  = width - filled
  return '█'.repeat(filled) + '░'.repeat(empty)
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
