import Link from 'next/link'
import { getAllChapters } from '@/lib/content'

export const revalidate = 3600

export default async function SeriesPage() {
  const chapters = await getAllChapters()

  return (
    <div className="terminal-root min-h-screen px-8 md:px-16 py-12 font-mono">
      <div className="scanline-sweep" />
      <div className="max-w-2xl w-full mx-auto" style={{ fontSize: '14px', lineHeight: '1.9' }}>

        {/* breadcrumb */}
        <div className="term-dim mb-6">
          <Link href="/" className="hover:text-[var(--term-cyan)] transition-colors">← home</Link>
        </div>

        {/* header */}
        <div className="mb-8">
          <div className="term-dim text-xs mb-1">{'>'} ls ./module-1</div>
          <div className="term-cyan font-bold text-lg">MODULE 1 — AI &amp; Machine Learning</div>
          <div className="term-dim text-xs mt-1">13 weeks · 65 posts · 6 chapters</div>
        </div>

        <div className="term-dim mb-4">{'─'.repeat(48)}</div>

        {/* chapter list */}
        {chapters.map((chapter) => {
          const isLocked = chapter.availablePosts === 0
          const pct = chapter.totalPosts > 0
            ? Math.round((chapter.availablePosts / chapter.totalPosts) * 100)
            : 0
          const barW = 20
          const filled = Math.round((pct / 100) * barW)
          const bar = '█'.repeat(filled) + '░'.repeat(barW - filled)

          if (isLocked) {
            return (
              <div key={chapter.number} className="flex items-start gap-4 py-2 opacity-40">
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
            <Link
              key={chapter.number}
              href={`/series/chapter-${chapter.number}`}
              className="flex items-start gap-4 py-2 group hover:bg-[#0f1f0f] transition-colors px-2 -mx-2"
            >
              <span className="term-amber w-6 shrink-0">
                {String(chapter.number).padStart(2, '0')}
              </span>
              <div className="flex-1">
                <div className="term-green">{chapter.title}</div>
                <div className="term-dim text-xs">
                  <span className="term-green">[{bar}]</span>
                  {' '}{chapter.availablePosts}/{chapter.totalPosts} posts
                </div>
              </div>
              <span className="term-dim text-xs shrink-0 transition-colors">→</span>
            </Link>
          )
        })}

        <div className="term-dim mt-4">{'─'.repeat(48)}</div>
        <div className="term-dim text-xs mt-3">
          Type <span className="term-green">chapter [1-6]</span> in the terminal to jump directly.
        </div>
      </div>
    </div>
  )
}
