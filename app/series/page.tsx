import Link from 'next/link'
import { getAllChapters } from '@/lib/content'

export const revalidate = 3600 // Revalidate every hour

export default async function SeriesPage() {
  const chapters = await getAllChapters()

  return (
    <main className="min-h-screen bg-[var(--bg)] px-6 py-16 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-16">
        <Link
          href="/"
          className="text-xs text-[var(--text-muted)] uppercase tracking-widest hover:text-[var(--accent-cyan)] transition-colors"
        >
          ← Home
        </Link>

        <h1 className="text-4xl font-black text-[var(--text-primary)] mt-6 mb-2">
          Module 1
        </h1>
        <p className="text-[var(--text-muted)]">
          Overview of AI and Machine Learning · 13 weeks · 65 posts
        </p>
      </div>

      {/* Chapter grid */}
      <div className="space-y-4">
        {chapters.map((chapter) => {
          const progress = chapter.totalPosts > 0
            ? chapter.availablePosts / chapter.totalPosts
            : 0
          const isLocked = chapter.availablePosts === 0

          return (
            <div
              key={chapter.number}
              className={`border p-6 transition-all duration-200 ${
                isLocked
                  ? 'border-[var(--locked-bg)] opacity-50 cursor-not-allowed'
                  : 'border-[var(--locked-bg)] hover:border-[var(--accent-cyan)] cursor-pointer'
              }`}
            >
              {isLocked ? (
                <div>
                  <ChapterCardContent chapter={chapter} progress={progress} />
                </div>
              ) : (
                <Link href={`/series/chapter-${chapter.number}`} className="block">
                  <ChapterCardContent chapter={chapter} progress={progress} />
                </Link>
              )}
            </div>
          )
        })}
      </div>
    </main>
  )
}

function ChapterCardContent({
  chapter,
  progress,
}: {
  chapter: { number: number; title: string; availablePosts: number; totalPosts: number }
  progress: number
}) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-[var(--accent-cyan)] uppercase tracking-widest mb-1">
            Chapter {chapter.number}
          </p>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {chapter.title}
          </h2>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {chapter.availablePosts}/{chapter.totalPosts} posts
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-[var(--locked-bg)] rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--accent-cyan)] rounded-full transition-all duration-500"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </>
  )
}
