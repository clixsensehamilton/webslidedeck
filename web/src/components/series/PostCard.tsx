'use client'
import { useRef } from 'react'

interface Scene {
  title: string
  content: string
}

interface PostCardProps {
  post: {
    slug: string
    frontmatter: {
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
  isExpanded: boolean
  onExpand: (slug: string | null) => void
}

export default function PostCard({ post, isExpanded, onExpand }: PostCardProps) {
  const bodyRef = useRef<HTMLDivElement>(null)

  const handleToggle = () => {
    if (!post.available) return
    onExpand(isExpanded ? null : post.slug)
  }

  if (!post.available) {
    return (
      <div className="border border-[var(--locked-bg)] p-4 opacity-40 cursor-not-allowed">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-0.5">
              Day {post.frontmatter.day} · {post.frontmatter.weekday}
            </p>
            <p className="text-sm font-medium text-[var(--text-muted)]">
              {post.frontmatter.post_title}
            </p>
          </div>
          <span className="text-xs text-[var(--text-muted)] ml-4 shrink-0">
            🔒 {post.releaseDate}
          </span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`border transition-all duration-200 cursor-pointer ${
        isExpanded
          ? 'border-[var(--accent-cyan)] bg-[#0a1015]'
          : 'border-[var(--locked-bg)] hover:border-[var(--accent-cyan)]/40'
      }`}
    >
      {/* Collapsed header — always visible */}
      <div
        onClick={handleToggle}
        className="p-4 flex items-center justify-between select-none"
      >
        <div>
          <p className="text-xs text-[var(--accent-cyan)] mb-0.5 uppercase tracking-wider">
            Day {post.frontmatter.day} · {post.frontmatter.weekday}
          </p>
          <p className="text-sm font-semibold text-[var(--text-primary)]">
            {post.frontmatter.post_title}
          </p>
        </div>
        <span className={`text-[var(--text-muted)] ml-4 shrink-0 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </div>

      {/* Expanded body */}
      {isExpanded && (
        <div ref={bodyRef} className="px-4 pb-6 border-t border-[var(--locked-bg)]">
          {/* Hook */}
          <p className="text-[var(--text-muted)] text-sm italic mt-4 mb-6 leading-relaxed">
            {post.hook}
          </p>

          {/* Scenes */}
          <div className="space-y-6">
            {post.scenes.map((scene, idx) => (
              <div key={idx} className="scene-block">
                <h4 className="text-xs text-[var(--accent-cyan)] uppercase tracking-widest mb-2">
                  {scene.title}
                </h4>
                <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap">
                  {scene.content}
                </p>
              </div>
            ))}
          </div>

          {/* Takeaway */}
          <div className="mt-8 pt-4 border-t border-[var(--locked-bg)]">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">Takeaway</p>
            <p className="text-sm font-bold text-[var(--text-primary)]">{post.takeaway}</p>
          </div>
        </div>
      )}
    </div>
  )
}
