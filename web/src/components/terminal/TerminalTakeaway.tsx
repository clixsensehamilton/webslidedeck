'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { NextPostRef } from '@/lib/content'

interface Props {
  takeaway: string
  dayNumber: number
  releaseDate: string
  totalDays: number
  nextPost?: NextPostRef
  chapterSlug?: string
}

export default function TerminalTakeaway({ takeaway, dayNumber, releaseDate, totalDays, nextPost, chapterSlug }: Props) {
  const [phase, setPhase] = useState<'idle'|'typing'|'done'>('idle')
  const [text, setText] = useState('')
  const ref = useRef<HTMLDivElement>(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasRun.current) {
          hasRun.current = true
          runSequence()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  async function runSequence() {
    setPhase('typing')
    for (let i = 0; i <= takeaway.length; i++) {
      await delay(22)
      setText(takeaway.slice(0, i))
    }
    setPhase('done')
  }

  const border = '═'.repeat(44)

  return (
    <div
      ref={ref}
      className="terminal-root min-h-screen flex flex-col justify-center px-8 md:px-16 py-16"
    >
      <div className="scanline-sweep" />
      <div className="max-w-3xl w-full mx-auto font-mono text-sm md:text-base">

        <div className="term-dim">{border}</div>
        <div className="term-bright text-center font-bold py-2 text-lg tracking-widest">
          SESSION SUMMARY
        </div>
        <div className="term-dim">{border}</div>

        <div className="mt-6 mb-6 term-cyan text-lg leading-8">
          <span className="term-dim">{'>'} </span>
          {text}
          {phase !== 'done' && <span className="cursor term-cyan">▋</span>}
        </div>

        <div className="term-dim">{border}</div>

        <div className="mt-4 space-y-1 text-sm">
          <div>
            <span className="term-dim">[LOGGED] </span>
            <span className="term-green">{releaseDate} · Day {dayNumber} of {totalDays}</span>
          </div>
          {nextPost && (
            <div>
              <span className="term-dim">[NEXT]   </span>
              <Link
                href={`/series/chapter-${nextPost.chapterNumber}/${nextPost.slug}`}
                className="term-cyan hover:term-bright transition-colors underline-offset-2 hover:underline"
              >
                Day {nextPost.dayNumber} — {nextPost.title}
              </Link>
              <span className="term-cyan ml-2">→</span>
            </div>
          )}
          {!nextPost && dayNumber < totalDays && (
            <div>
              <span className="term-dim">[NEXT]   </span>
              <span className="term-amber">Day {dayNumber + 1} — not yet available</span>
            </div>
          )}
          {dayNumber >= totalDays && (
            <div>
              <span className="term-dim">[STATUS] </span>
              <span className="term-green">Module 1 complete.</span>
            </div>
          )}
        </div>

        <div className="mt-4 term-dim">{border}</div>
      </div>
    </div>
  )
}

function delay(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}
