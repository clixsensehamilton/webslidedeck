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
          className="text-[var(--accent-cyan)] text-sm uppercase tracking-widest hover:underline"
        >
          View All Chapters →
        </Link>
      </div>
    </section>
  )
}
