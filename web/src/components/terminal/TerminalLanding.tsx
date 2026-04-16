'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

// ── ASCII logo ─────────────────────────────────────────────────
const LOGO = [
  '   ██████╗ ██╗    ███╗   ███╗██╗     ',
  '  ██╔══██╗██║    ████╗ ████║██║     ',
  '  ███████║██║    ██╔████╔██║██║     ',
  '  ██╔══██║██║    ██║╚██╔╝██║██║     ',
  '  ██║  ██║██║    ██║ ╚═╝ ██║███████╗',
  '  ╚═╝  ╚═╝╚═╝    ╚═╝     ╚═╝╚══════╝',
]

// ── Boot sequence ──────────────────────────────────────────────
const BOOT_LINES = [
  { text: 'AIML-OS v1.0.0 (build 2026.04.14)', ms: 0 },
  { text: '', ms: 80 },
  { text: 'Mounting content filesystem...            [ OK ]', ms: 200 },
  { text: 'Loading module registry (module-1)...     [ OK ]', ms: 180 },
  { text: 'Indexing 65 posts across 6 chapters...    [ OK ]', ms: 180 },
  { text: 'Verifying schedule integrity...           [ OK ]', ms: 160 },
  { text: 'Ready.', ms: 160 },
  { text: '', ms: 100 },
]

// ── Command responses ──────────────────────────────────────────
type Line = { text: string; cls?: string }

const CHAPTERS_DATA = [
  { n: 1, title: 'The World Has Changed', weeks: 'Wk 1–2',   posts: 10 },
  { n: 2, title: 'What We Built',         weeks: 'Wk 3–5',   posts: 15 },
  { n: 3, title: 'How Machines Learn',    weeks: 'Wk 6–8',   posts: 15 },
  { n: 4, title: 'When Machines Fail',    weeks: 'Wk 9–10',  posts: 10 },
  { n: 5, title: 'AI in the Wild',        weeks: 'Wk 11',    posts: 5  },
  { n: 6, title: 'The Reckoning',         weeks: 'Wk 12–13', posts: 10 },
]

function getResponse(cmd: string): { lines: Line[]; action?: string } {
  const c = cmd.trim().toLowerCase()

  if (!c) return { lines: [] }

  if (['start', 'enter', 'go', 'y', 'yes', 'begin', 'launch'].includes(c)) {
    return {
      lines: [
        { text: '' },
        { text: '  Initialising Module 1...', cls: 'term-dim' },
        { text: '  Authenticating session...', cls: 'term-dim' },
        { text: '' },
        { text: '  Access granted.', cls: 'term-cyan' },
        { text: '' },
        { text: '  Launching /series...', cls: 'term-green' },
        { text: '' },
      ],
      action: 'navigate:/series',
    }
  }

  if (['chapters', 'list', 'ls', 'modules'].includes(c)) {
    return {
      lines: [
        { text: '' },
        { text: '  MODULE 1 — Chapter Index', cls: 'term-cyan' },
        { text: '  ' + '─'.repeat(46), cls: 'term-dim' },
        ...CHAPTERS_DATA.map(ch => ({
          text: `  [${ch.n}]  ${ch.title.padEnd(28)} ${ch.weeks.padEnd(9)} ${ch.posts} posts`,
          cls: 'term-green',
        })),
        { text: '  ' + '─'.repeat(46), cls: 'term-dim' },
        { text: '' },
        { text: "  Run 'start' to begin or 'chapter 1' to jump in.", cls: 'term-dim' },
        { text: '' },
      ],
    }
  }

  if (c.startsWith('chapter ') || c.startsWith('ch ')) {
    const num = parseInt(c.split(' ')[1])
    if (num >= 1 && num <= 6) {
      const ch = CHAPTERS_DATA[num - 1]
      return {
        lines: [
          { text: '' },
          { text: `  Loading Chapter ${num}: ${ch.title}`, cls: 'term-cyan' },
          { text: `  ${ch.posts} posts · ${ch.weeks}`, cls: 'term-dim' },
          { text: '' },
          { text: '  Navigating...', cls: 'term-green' },
          { text: '' },
        ],
        action: `navigate:/series/chapter-${num}`,
      }
    }
    return {
      lines: [
        { text: `  chapter: invalid number '${c.split(' ')[1]}' — valid range 1–6`, cls: 'term-amber' },
        { text: '' },
      ],
    }
  }

  if (['about', 'info', 'what', 'wtf'].includes(c)) {
    return {
      lines: [
        { text: '' },
        { text: '  ABOUT THIS SERIES', cls: 'term-cyan' },
        { text: '  ' + '─'.repeat(40), cls: 'term-dim' },
        { text: '' },
        { text: '  65 posts on AI and machine learning.', cls: 'term-green' },
        { text: '  One per weekday. Three to five minutes each.', cls: 'term-green' },
        { text: '  Built for people who keep systems running —', cls: 'term-green' },
        { text: '  not for people who build the models.', cls: 'term-green' },
        { text: '' },
        { text: '  No fluff. No hype. Operational literacy.', cls: 'term-amber' },
        { text: '' },
      ],
    }
  }

  if (['help', '?', 'man', 'commands'].includes(c)) {
    return {
      lines: [
        { text: '' },
        { text: '  AVAILABLE COMMANDS', cls: 'term-cyan' },
        { text: '  ' + '─'.repeat(40), cls: 'term-dim' },
        { text: '' },
        { text: '  start              Enter the series', cls: 'term-green' },
        { text: '  chapters           List all 6 chapters', cls: 'term-green' },
        { text: '  chapter [1-6]      Jump to a chapter', cls: 'term-green' },
        { text: '  about              What this series is', cls: 'term-green' },
        { text: '  clear              Clear the screen', cls: 'term-green' },
        { text: '  exit               Leave (seriously?)', cls: 'term-green' },
        { text: '' },
      ],
    }
  }

  if (['clear', 'cls', 'reset'].includes(c)) {
    return { lines: [], action: 'clear' }
  }

  if (['exit', 'quit', 'q', 'n', 'no', 'bye', ':q', ':q!'].includes(c)) {
    return {
      lines: [
        { text: '' },
        { text: '  logout', cls: 'term-dim' },
        { text: '' },
      ],
    }
  }

  if (['sudo', 'sudo start', 'sudo su'].includes(c)) {
    return {
      lines: [
        { text: '' },
        { text: '  sudo: you are not in the sudoers file.', cls: 'term-amber' },
        { text: '  This incident will not be reported.', cls: 'term-dim' },
        { text: '' },
      ],
    }
  }

  if (c === 'vim' || c === 'nano' || c === 'emacs') {
    return {
      lines: [
        { text: '' },
        { text: `  ${c}: no file specified. This isn't that kind of terminal.`, cls: 'term-amber' },
        { text: '' },
      ],
    }
  }

  return {
    lines: [
      { text: '' },
      { text: `  bash: command not found: ${cmd}`, cls: 'term-amber' },
      { text: "  Run 'help' for available commands.", cls: 'term-dim' },
      { text: '' },
    ],
  }
}

// ── History line types ─────────────────────────────────────────
interface HistoryEntry {
  type: 'cmd' | 'output'
  lines?: Line[]
  cmd?: string
}

// ── Main component ─────────────────────────────────────────────
export default function TerminalLanding() {
  const router = useRouter()

  const [booting,       setBooting]       = useState(true)
  const [bootVisible,   setBootVisible]   = useState(0)
  const [showLogo,      setShowLogo]      = useState(false)
  const [logoLines,     setLogoLines]     = useState(0)
  const [showWelcome,   setShowWelcome]   = useState(false)
  const [history,       setHistory]       = useState<HistoryEntry[]>([])
  const [input,         setInput]         = useState('')
  const [cmdHistory,    setCmdHistory]    = useState<string[]>([])
  const [cmdIndex,      setCmdIndex]      = useState(-1)
  const [isNavigating,  setIsNavigating]  = useState(false)

  const inputRef   = useRef<HTMLInputElement>(null)
  const bottomRef  = useRef<HTMLDivElement>(null)

  // ── Auto-scroll ──────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history, showWelcome, bootVisible, logoLines])

  // ── Boot sequence ────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false
    async function boot() {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        await tick(BOOT_LINES[i].ms)
        if (cancelled) return
        setBootVisible(i + 1)
      }

      // Logo
      setShowLogo(true)
      for (let i = 0; i < LOGO.length; i++) {
        await tick(60)
        if (cancelled) return
        setLogoLines(i + 1)
      }

      await tick(200)
      if (cancelled) return
      setShowWelcome(true)

      await tick(600)
      if (cancelled) return
      setBooting(false)
      inputRef.current?.focus()
    }
    boot()
    return () => { cancelled = true }
  }, [])

  // ── Command submit ───────────────────────────────────────────
  const submit = useCallback(() => {
    if (!input.trim() && input !== '') { setInput(''); return }
    const cmd = input.trim()

    const { lines, action } = getResponse(cmd)

    // Save to cmd history
    if (cmd) {
      setCmdHistory(prev => [cmd, ...prev].slice(0, 50))
    }
    setCmdIndex(-1)

    if (action === 'clear') {
      setHistory([])
      setInput('')
      return
    }

    setHistory(prev => [
      ...prev,
      { type: 'cmd', cmd },
      { type: 'output', lines },
    ])
    setInput('')

    if (action?.startsWith('navigate:')) {
      const dest = action.replace('navigate:', '')
      setIsNavigating(true)
      setTimeout(() => router.push(dest), 1200)
    }
  }, [input, router])

  // ── Keyboard handling ────────────────────────────────────────
  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submit()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const next = Math.min(cmdIndex + 1, cmdHistory.length - 1)
      setCmdIndex(next)
      setInput(cmdHistory[next] ?? '')
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      const next = Math.max(cmdIndex - 1, -1)
      setCmdIndex(next)
      setInput(next === -1 ? '' : cmdHistory[next])
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple tab completion
      const completions = ['start', 'chapters', 'about', 'help', 'clear', 'exit', 'chapter ']
      const match = completions.find(c => c.startsWith(input.toLowerCase()))
      if (match) setInput(match)
    }
  }

  return (
    <div
      className="terminal-root min-h-screen flex flex-col px-8 md:px-16 py-8 cursor-text overflow-y-auto"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="scanline-sweep" />

      <div className="max-w-2xl w-full mx-auto font-mono" style={{ fontSize: '14px', lineHeight: '1.75' }}>

        {/* ── Boot lines ── */}
        {BOOT_LINES.slice(0, bootVisible).map((line, i) => (
          <div key={i} className={line.text === '' ? 'h-3' : 'term-dim'}>
            {line.text || '\u00A0'}
          </div>
        ))}

        {/* ── ASCII Logo ── */}
        {showLogo && (
          <div className="my-2">
            {LOGO.slice(0, logoLines).map((line, i) => (
              <div key={i} className="term-green term-glow-green font-bold" style={{ letterSpacing: '0' }}>
                {line}
              </div>
            ))}
            {logoLines >= LOGO.length && (
              <div className="term-dim mt-1 ml-2" style={{ letterSpacing: '0.15em' }}>
                A SERIES FOR IT PROFESSIONALS
              </div>
            )}
          </div>
        )}

        {/* ── Welcome message ── */}
        {showWelcome && (
          <div className="mt-3 mb-4 space-y-0">
            <div className="term-dim">{'─'.repeat(52)}</div>
            <div className="mt-2 mb-1">
              <span className="term-dim"> Session started {new Date().toLocaleString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}.</span>
            </div>
            <div className="term-dim">
              {'  '}Type <span className="term-green">start</span> to enter the series.
              {'  '}Type <span className="term-green">help</span> for commands.
            </div>
            <div className="term-dim mt-1">{'─'.repeat(52)}</div>
          </div>
        )}

        {/* ── Command history ── */}
        {history.map((entry, i) => {
          if (entry.type === 'cmd') {
            return (
              <div key={i} className="flex items-center">
                <span className="term-dim">user@aiml:~ </span>
                <span className="term-cyan">$</span>
                <span className="term-green ml-2">{entry.cmd}</span>
              </div>
            )
          }
          return (
            <div key={i}>
              {entry.lines?.map((line, j) => (
                <div key={j} className={line.cls ?? 'term-green'}>
                  {line.text || '\u00A0'}
                </div>
              ))}
            </div>
          )
        })}

        {/* ── Active prompt ── */}
        {!booting && !isNavigating && (
          <div className="flex items-center mt-1">
            <span className="term-dim">user@aiml:~ </span>
            <span className="term-cyan">$</span>
            <span className="term-green ml-2">{input}</span>
            <span className="cursor term-green">▋</span>
            <input
              ref={inputRef}
              value={input}
              onChange={e => { setInput(e.target.value); setCmdIndex(-1) }}
              onKeyDown={onKeyDown}
              className="absolute opacity-0 pointer-events-none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={false}
            />
          </div>
        )}

        {isNavigating && (
          <div className="flex items-center mt-1">
            <span className="term-dim">user@aiml:~ </span>
            <span className="term-cyan">$</span>
            <span className="cursor term-cyan ml-1">▋</span>
          </div>
        )}

        <div ref={bottomRef} className="h-16" />
      </div>
    </div>
  )
}

function tick(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
