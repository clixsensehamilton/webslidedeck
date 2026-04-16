import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChapterPosts } from '@/lib/content'
import PostCard from '@/components/series/PostCard'

const CHAPTER_TITLES = [
  'The World Has Changed',
  'What We Built',
  'How Machines Learn',
  'When Machines Fail',
  'AI in the Wild',
  'The Reckoning',
]

export async function generateStaticParams() {
  return Array.from({ length: 6 }, (_, i) => ({ chapter: `chapter-${i + 1}` }))
}

export default async function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params
  const match = chapter.match(/^(?:chapter-)?(\d+)$/)
  const chapterNumber = match ? parseInt(match[1]) : NaN

  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 6) notFound()

  const posts = await getChapterPosts(chapterNumber)
  const available = posts.filter(p => p.available)

  if (available.length === 0) notFound()

  const title = CHAPTER_TITLES[chapterNumber - 1]

  return (
    <div className="terminal-root min-h-screen px-8 md:px-16 py-12 font-mono">
      <div className="scanline-sweep" />
      <div className="max-w-2xl w-full mx-auto" style={{ fontSize: '14px', lineHeight: '1.9' }}>

        {/* breadcrumb */}
        <div className="term-dim mb-6">
          <Link href="/series" className="hover:text-[var(--term-cyan)] transition-colors">← module-1</Link>
          <span className="term-dim mx-2">/</span>
          <span className="term-green">chapter-{chapterNumber}</span>
        </div>

        {/* header */}
        <div className="mb-8">
          <div className="term-dim text-xs mb-1">{'>'} ls ./chapter-{chapterNumber}/</div>
          <div className="term-cyan font-bold text-lg">CH{chapterNumber} — {title.toUpperCase()}</div>
          <div className="term-dim text-xs mt-1">{available.length} of {posts.length} posts available</div>
        </div>

        <div className="term-dim mb-2">{'─'.repeat(48)}</div>

        {/* post list */}
        <div>
          {posts.map(post => (
            <PostCard
              key={post.slug}
              post={post}
              chapterNumber={chapterNumber}
            />
          ))}
        </div>

        <div className="term-dim mt-2">{'─'.repeat(48)}</div>
      </div>
    </div>
  )
}
