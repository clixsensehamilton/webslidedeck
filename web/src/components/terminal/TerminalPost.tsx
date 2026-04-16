'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import TerminalBoot from './TerminalBoot'
import TerminalScene from './TerminalScene'
import TerminalTakeaway from './TerminalTakeaway'

interface Scene {
  title: string
  content: string
}

interface Props {
  postTitle: string
  chapter: string
  releaseDate: string
  dayNumber: number
  hook: string
  scenes: Scene[]
  takeaway: string
  chapterSlug: string
}

export default function TerminalPost({
  postTitle, chapter, releaseDate, dayNumber,
  hook, scenes, takeaway, chapterSlug,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(-1) // -1 = boot not done
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([])
  const totalSections = scenes.length + 1 // scenes + takeaway

  // Keyboard navigation: ← → arrows or [ ] or h l
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

  const handleBootComplete = useCallback(() => setActiveIndex(0), [])

  return (
    <div className="terminal-root">
      {/* Boot */}
      <TerminalBoot
        postTitle={postTitle}
        chapter={chapter}
        releaseDate={releaseDate}
        dayNumber={dayNumber}
        hook={hook}
        onComplete={handleBootComplete}
      />

      {/* Scenes */}
      {scenes.map((scene, i) => (
        <SceneObserver
          key={i}
          index={i}
          refs={sectionRefs}
          onVisible={() => setActiveIndex(prev => Math.max(prev, i))}
        >
          <TerminalScene
            scene={scene}
            sceneNumber={i + 1}
            chapterSlug={chapterSlug}
            isActive={activeIndex >= i}
          />
        </SceneObserver>
      ))}

      {/* Takeaway */}
      <div ref={el => { sectionRefs.current[scenes.length] = el }}>
        <TerminalTakeaway
          takeaway={takeaway}
          dayNumber={dayNumber}
          releaseDate={releaseDate}
          totalDays={65}
        />
      </div>

      {/* HUD — keyboard nav hint */}
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

// ── Scene wrapper that fires isActive on scroll ────────────────
function SceneObserver({
  index, refs, onVisible, children,
}: {
  index: number
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>
  onVisible: () => void
  children: React.ReactNode
}) {
  const divRef = useRef<HTMLDivElement>(null)
  const onVisibleRef = useRef(onVisible)
  onVisibleRef.current = onVisible

  useEffect(() => {
    const el = divRef.current
    if (!el) return

    refs.current[index] = el

    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisibleRef.current() },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [index, refs]) // onVisible intentionally excluded — accessed via ref

  return <div ref={divRef}>{children}</div>
}

// ── Fixed HUD bottom bar ───────────────────────────────────────
function KeyboardHUD({
  current, total, onPrev, onNext,
}: {
  current: number
  total: number
  onPrev: () => void
  onNext: () => void
}) {
  const labels = ['Scene 1', 'Scene 2', 'Scene 3', 'Scene 4', 'Summary']

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
            <span
              key={i}
              className={i === current ? 'term-cyan term-glow-cyan' : 'term-dim'}
            >
              {i === current ? '●' : '○'}
            </span>
          ))}
          <span className="term-dim ml-3">
            {labels[current] ?? `Scene ${current + 1}`} · use ← →
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
