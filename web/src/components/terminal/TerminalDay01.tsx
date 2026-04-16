'use client'

import { useState, useRef, useEffect } from 'react'
import TerminalBoot from './TerminalBoot'
import TerminalAnimator, { type AnimLine } from './TerminalAnimator'
import TerminalTakeaway from './TerminalTakeaway'
import { day01Boot, scene1, scene2, scene3, scene4, day01Takeaway } from './scenes/Day01'

// ── Scene definitions ─────────────────────────────────────────

const SCENES: { title: string; lines: AnimLine[] }[] = [
  { title: 'The Shift That\'s Already Happened', lines: scene1 },
  { title: 'Why It Can\'t Be Ignored',           lines: scene2 },
  { title: 'What This Module Covers',            lines: scene3 },
  { title: 'The Right Question',                 lines: scene4 },
]

// ── Main component ────────────────────────────────────────────

export default function TerminalDay01() {
  const [activeIndex, setActiveIndex] = useState(-1) // -1 = boot running
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const totalSections = SCENES.length + 1 // 4 scenes + takeaway

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'l' || e.key === 'j') {
        scrollToSection(Math.min(activeIndex + 1, totalSections - 1))
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'h' || e.key === 'k') {
        scrollToSection(Math.max(activeIndex - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, totalSections])

  function scrollToSection(index: number) {
    const el = sectionRefs.current[index]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveIndex(index)
    }
  }

  return (
    <div className="terminal-root">
      {/* Boot sequence */}
      <TerminalBoot
        postTitle={day01Boot.postTitle}
        chapter={day01Boot.chapter}
        releaseDate={day01Boot.releaseDate}
        dayNumber={day01Boot.dayNumber}
        hook={day01Boot.hook}
        onComplete={() => setActiveIndex(0)}
      />

      {/* Animated scenes */}
      {SCENES.map((scene, i) => (
        <AnimSceneObserver
          key={i}
          index={i}
          refs={sectionRefs}
          onVisible={() => { if (activeIndex < i) setActiveIndex(i) }}
        >
          <AnimScenePanel
            title={scene.title}
            lines={scene.lines}
            sceneNumber={i + 1}
            isActive={activeIndex >= i}
          />
        </AnimSceneObserver>
      ))}

      {/* Takeaway */}
      <div ref={el => { sectionRefs.current[SCENES.length] = el }}>
        <TerminalTakeaway
          takeaway={day01Takeaway}
          dayNumber={day01Boot.dayNumber}
          releaseDate={day01Boot.releaseDate}
          totalDays={65}
        />
      </div>

      {/* Keyboard nav HUD */}
      {activeIndex >= 0 && (
        <KeyboardHUD
          current={activeIndex}
          total={totalSections}
          onPrev={() => scrollToSection(Math.max(activeIndex - 1, 0))}
          onNext={() => scrollToSection(Math.min(activeIndex + 1, totalSections - 1))}
        />
      )}
    </div>
  )
}

// ── Scene panel: header + TerminalAnimator ────────────────────

function AnimScenePanel({
  title, lines, sceneNumber, isActive,
}: {
  title: string
  lines: AnimLine[]
  sceneNumber: number
  isActive: boolean
}) {
  return (
    <div className="terminal-root min-h-screen flex flex-col justify-center px-8 md:px-16 py-12">
      <div className="scanline-sweep" />
      <div className="max-w-3xl w-full mx-auto font-mono text-sm md:text-base leading-7">

        {/* Scene header */}
        <div className="mb-6 flex items-baseline gap-3">
          <span className="term-amber text-lg font-bold">[{String(sceneNumber).padStart(2, '0')}]</span>
          <span className="term-cyan font-bold">{title}</span>
          <span className="term-dim text-xs ml-auto">Day {day01Boot.dayNumber} · Scene {sceneNumber}</span>
        </div>

        {/* Animated content */}
        <TerminalAnimator lines={lines} isActive={isActive} />

      </div>
    </div>
  )
}

// ── Intersection observer wrapper ─────────────────────────────

function AnimSceneObserver({
  index, refs, onVisible, children,
}: {
  index: number
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
  onVisible: () => void
  children: React.ReactNode
}) {
  const divRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = divRef.current
    if (!el) return

    refs.current[index] = el

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible() },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index, refs, onVisible])

  return <div ref={divRef}>{children}</div>
}

// ── Keyboard nav HUD ──────────────────────────────────────────

const LABELS = ['Scene 1', 'Scene 2', 'Scene 3', 'Scene 4', 'Summary']

function KeyboardHUD({
  current, total, onPrev, onNext,
}: {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 font-mono text-xs border-t border-[var(--term-muted)] bg-[#0a0a0a]/95 backdrop-blur-sm">
      <div className="max-w-3xl mx-auto px-8 py-3 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={current <= 0}
          className="term-dim hover:term-cyan disabled:opacity-20 transition-colors"
        >
          ← prev
        </button>

        <div className="flex items-center gap-2">
          {Array.from({ length: total }).map((_, i) => (
            <span key={i} className={i === current ? 'term-cyan' : 'term-dim'}>
              {i === current ? '●' : '○'}
            </span>
          ))}
          <span className="term-dim ml-3">
            {LABELS[current] ?? `Scene ${current + 1}`} · ← →
          </span>
        </div>

        <button
          onClick={onNext}
          disabled={current >= total - 1}
          className="term-dim hover:term-cyan disabled:opacity-20 transition-colors"
        >
          next →
        </button>
      </div>
    </div>
  )
}
