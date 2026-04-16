import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getChapterPosts } from '@/lib/content'
import ChapterDetailClient from './ChapterDetailClient'

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
  // Accept both "chapter-1" (linked from /series) and bare "1" for flexibility
  const match = chapter.match(/^(?:chapter-)?(\d+)$/)
  const chapterNumber = match ? parseInt(match[1]) : NaN

  if (isNaN(chapterNumber) || chapterNumber < 1 || chapterNumber > 6) {
    notFound()
  }

  const posts = await getChapterPosts(chapterNumber)
  const availablePosts = posts.filter(p => p.available)

  // If no posts are available yet, 404
  if (availablePosts.length === 0) {
    notFound()
  }

  const chapterTitle = CHAPTER_TITLES[chapterNumber - 1]

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16 max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="mb-12">
        <Link
          href="/series"
          className="text-xs text-[var(--text-muted)] uppercase tracking-widest hover:text-[var(--accent-cyan)] transition-colors"
        >
          ← All Chapters
        </Link>
        <h1 className="text-3xl font-black text-[var(--text-primary)] mt-6 mb-2">
          Chapter {chapterNumber}
        </h1>
        <p className="text-[var(--text-muted)]">{chapterTitle}</p>
        <p className="text-xs text-[var(--text-muted)] mt-2">
          {availablePosts.length} of {posts.length} posts available
        </p>
      </div>

      <ChapterDetailClient
        posts={posts}
        chapterNumber={chapterNumber}
      />
    </main>
  )
}
