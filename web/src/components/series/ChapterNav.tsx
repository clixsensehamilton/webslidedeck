'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { Post } from '@/lib/content'

interface Props {
  posts: Post[]
  chapterNumber: number
}

export default function ChapterNav({ posts, chapterNumber }: Props) {
  const router = useRouter()
  const available = posts.filter(p => p.available)
  const [cursor, setCursor] = useState(0)
  const [input, setInput] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => { containerRef.current?.focus() }, [])

  function onKey(e: React.KeyboardEvent) {
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
        const day = parseInt(input)
        const match = available.find(p => p.frontmatter.day === day)
        if (match) router.push(`/series/chapter-${chapterNumber}/${match.slug}`)
        setInput('')
      } else if (available[cursor]) {
        router.push(`/series/chapter-${chapterNumber}/${available[cursor].slug}`)
      }
    } else if (e.key === 'Backspace') {
      setInput(i => i.slice(0, -1))
    } else if (/^\d$/.test(e.key)) {
      setInput(i => (i + e.key).slice(-3))
    } else if (e.key === 'Escape') {
      setInput('')
    }
  }

  return (
    <div ref={containerRef} tabIndex={-1} className="font-mono outline-none" onKeyDown={onKey}>
      {posts.map((post) => {
        const availIdx = available.indexOf(post)
        const isSelected = post.available && availIdx === cursor

        if (!post.available) {
          return (
            <div key={post.slug} className="flex items-center justify-between py-2 border-b border-[var(--term-muted)] opacity-40">
              <span className="term-dim">
                <span className="w-4 inline-block" />
                <span className="term-dim mr-3">[{String(post.frontmatter.day).padStart(2, '0')}]</span>
                {post.frontmatter.post_title}
              </span>
              <span className="term-dim text-xs shrink-0 ml-4">{post.releaseDate}</span>
            </div>
          )
        }

        return (
          <div
            key={post.slug}
            className={`flex items-center justify-between py-2 border-b cursor-pointer transition-colors ${
              isSelected
                ? 'border-[var(--term-cyan)] bg-[#0a1a0a]'
                : 'border-[var(--term-muted)] hover:border-[var(--term-cyan)]'
            }`}
            onClick={() => router.push(`/series/chapter-${chapterNumber}/${post.slug}`)}
            onMouseEnter={() => setCursor(availIdx)}
          >
            <span className="term-dim flex items-center">
              <span className={`w-4 inline-block term-cyan ${isSelected ? 'opacity-100' : 'opacity-0'}`}>▶</span>
              <span className={`mr-3 ${isSelected ? 'term-cyan' : 'term-amber'}`}>
                [{String(post.frontmatter.day).padStart(2, '0')}]
              </span>
              <span className={isSelected ? 'term-green' : 'term-dim'}>
                {post.frontmatter.post_title}
              </span>
            </span>
            <span className={`text-xs shrink-0 ml-4 ${isSelected ? 'term-cyan' : 'term-dim'}`}>→</span>
          </div>
        )
      })}

      {/* Input hint */}
      <div className="mt-4 term-dim text-xs flex items-center gap-4">
        <span>↑↓ navigate</span>
        <span>enter select</span>
        {available.length > 0 && <span>or type day number</span>}
        {input && (
          <span className="term-cyan ml-2">
            jump to day: <span className="term-amber">{input}</span>
            <span className="cursor term-amber">▋</span>
          </span>
        )}
      </div>
    </div>
  )
}
