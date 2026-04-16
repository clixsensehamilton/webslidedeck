'use client'
import { useState } from 'react'
import PostCard from '@/components/series/PostCard'

interface Scene {
  title: string
  content: string
}

interface Post {
  slug: string
  frontmatter: {
    week: number
    day: number
    weekday: string
    post_title: string
  }
  hook: string
  scenes: Scene[]
  takeaway: string
  available: boolean
  releaseDate: string
}

interface ChapterDetailClientProps {
  posts: Post[]
  chapterTitle: string
  chapterNumber: number
}

export default function ChapterDetailClient({ posts }: ChapterDetailClientProps) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null)

  // Group posts by week
  const weeks = posts.reduce((acc, post) => {
    const week = post.frontmatter.week
    if (!acc[week]) acc[week] = []
    acc[week].push(post)
    return acc
  }, {} as Record<number, Post[]>)

  return (
    <div className="space-y-12">
      {Object.entries(weeks).map(([weekNum, weekPosts]) => (
        <div key={weekNum}>
          <h3 className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4">
            Week {weekNum}
          </h3>
          <div className="space-y-2">
            {weekPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                isExpanded={expandedSlug === post.slug}
                onExpand={setExpandedSlug}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
