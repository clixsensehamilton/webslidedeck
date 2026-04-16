'use client'
import Link from 'next/link'

interface PostCardProps {
  post: {
    slug: string
    frontmatter: {
      day: number
      weekday: string
      post_title: string
    }
    available: boolean
    releaseDate: string
  }
  chapterNumber: number
}

export default function PostCard({ post, chapterNumber }: PostCardProps) {
  if (!post.available) {
    return (
      <div className="flex items-center justify-between py-2 border-b border-[var(--term-muted)] opacity-40 font-mono text-sm">
        <span className="term-dim">
          [{String(post.frontmatter.day).padStart(2, '0')}]  {post.frontmatter.post_title}
        </span>
        <span className="term-dim text-xs shrink-0 ml-4">{post.releaseDate}</span>
      </div>
    )
  }

  return (
    <Link
      href={`/series/chapter-${chapterNumber}/${post.slug}`}
      className="flex items-center justify-between py-2 border-b border-[var(--term-muted)] group font-mono text-sm hover:border-[var(--term-cyan)] transition-colors"
    >
      <span className="term-dim group-hover:term-green transition-colors">
        <span className="term-amber mr-3">[{String(post.frontmatter.day).padStart(2, '0')}]</span>
        {post.frontmatter.post_title}
      </span>
      <span className="term-dim group-hover:term-cyan text-xs shrink-0 ml-4">→</span>
    </Link>
  )
}
