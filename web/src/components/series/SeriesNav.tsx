'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'

interface Chapter {
  number: number
  title: string
  availablePosts: number
  totalPosts: number
}

interface Props {
  chapters: Chapter[]
}

export default function SeriesNav({ chapters }: Props) {
  const router = useRouter()
  const containerRef = useRef<HTMLDivElement>(null)
  const available = chapters.filter(c => c.availablePosts > 0)
  const [cursor, setCursor] = useState(0)
  const [input, setInput] = useState('')

  const navigate = useCallback((chapter: Chapter) => {
    router.push(`/series/chapter-${chapter.number}`)
  }, [router])

  // Grab focus on mount so keyboard works immediately
  useEffect(() => {
    containerRef.current?.focus()
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

      if (e.key === 'ArrowDown' || e.key === 'j') {
        e.preventDefault()
        setCursor(c => Math.min(c + 1, available.length - 1))
        setInput('')
      } else if (e.key === 'ArrowUp' || e.key === 'k') {
        e.preventDefault()
        setCursor(c => Math.max(c - 1, 0))
        setInput('')
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (input) {
          const num = parseInt(input)
          const match = available.find(c => c.number === num)
          if (match) navigate(match)
          setInput('')
        } else {
          if (available[cursor]) navigate(available[cursor])
        }
      } else if (e.key === 'Backspace') {
        setInput(i => i.slice(0, -1))
      } else if (/^\d$/.test(e.key)) {
        setInput(i => (i + e.key).slice(-1)) // single digit for chapters 1-6
      } else if (e.key === 'Escape') {
        setInput('')
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [available, cursor, input, navigate])

  return (
    <div ref={containerRef} tabIndex={-1} className="font-mono outline-none">
      {chapters.map((chapter) => {
        const availIdx = available.indexOf(chapter)
        const isLocked = chapter.availablePosts === 0
        const isSelected = !isLocked && availIdx === cursor
        const pct = chapter.totalPosts > 0
          ? Math.round((chapter.availablePosts / chapter.totalPosts) * 100)
          : 0
        const barW = 20
        const filled = Math.round((pct / 100) * barW)
        const bar = '█'.repeat(filled) + '░'.repeat(barW - filled)

        if (isLocked) {
          return (
            <div key={chapter.number} className="flex items-start gap-4 py-2 opacity-40">
              <span className="w-4 inline-block shrink-0" />
              <span className="term-dim w-6 shrink-0">{String(chapter.number).padStart(2, '0')}</span>
              <div className="flex-1">
                <div className="term-dim">{chapter.title}</div>
                <div className="term-dim text-xs">[{bar}] locked</div>
              </div>
              <span className="term-dim text-xs shrink-0">{chapter.totalPosts}p</span>
            </div>
          )
        }

        return (
          <div
            key={chapter.number}
            className={`flex items-start gap-4 py-2 cursor-pointer transition-colors px-2 -mx-2 ${
              isSelected ? 'bg-[#0a1a0a]' : 'hover:bg-[#0f1f0f]'
            }`}
            onClick={() => navigate(chapter)}
            onMouseEnter={() => setCursor(availIdx)}
          >
            <span className={`w-4 inline-block term-cyan shrink-0 ${isSelected ? 'opacity-100' : 'opacity-0'}`}>▶</span>
            <span className={`w-6 shrink-0 ${isSelected ? 'term-cyan' : 'term-amber'}`}>
              {String(chapter.number).padStart(2, '0')}
            </span>
            <div className="flex-1">
              <div className={isSelected ? 'term-bright' : 'term-green'}>{chapter.title}</div>
              <div className="term-dim text-xs">
                <span className={isSelected ? 'term-cyan' : 'term-green'}>[{bar}]</span>
                {' '}{chapter.availablePosts}/{chapter.totalPosts} posts
              </div>
            </div>
            <span className={`text-xs shrink-0 ${isSelected ? 'term-cyan' : 'term-dim'}`}>→</span>
          </div>
        )
      })}

      {/* Input hint */}
      <div className="mt-4 term-dim text-xs flex items-center gap-4">
        <span>↑↓ navigate</span>
        <span>enter select</span>
        <span>or type chapter number</span>
        {input && (
          <span className="term-cyan ml-2">
            jump to chapter: <span className="term-amber">{input}</span>
            <span className="cursor term-amber">▋</span>
          </span>
        )}
      </div>
    </div>
  )
}
