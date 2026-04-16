import Link from 'next/link'
import { getAllChapters } from '@/lib/content'
import SeriesNav from '@/components/series/SeriesNav'

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

        <SeriesNav chapters={chapters} />

        <div className="term-dim mt-4">{'─'.repeat(48)}</div>
      </div>
    </div>
  )
}
