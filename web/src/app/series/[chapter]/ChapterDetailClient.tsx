'use client'

import PostCard from '@/components/series/PostCard'
import type { Post } from '@/lib/content'

interface Props {
  posts: Post[]
  chapterNumber: number
}

export default function ChapterDetailClient({ posts, chapterNumber }: Props) {
  return (
    <div>
      {posts.map(post => (
        <PostCard
          key={post.slug}
          post={post}
          chapterNumber={chapterNumber}
        />
      ))}
    </div>
  )
}
