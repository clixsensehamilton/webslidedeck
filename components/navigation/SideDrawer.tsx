'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { useDrawer } from './DrawerProvider'

interface Chapter {
  number: number
  title: string
  availablePosts: number
  totalPosts: number
}

interface SideDrawerProps {
  chapters: Chapter[]
  currentChapter?: number
}

export default function SideDrawer({ chapters, currentChapter }: SideDrawerProps) {
  const { isOpen, close } = useDrawer()
  const drawerRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen) {
      gsap.to(drawerRef.current, { x: 0, duration: 0.3, ease: 'power2.out' })
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.3, pointerEvents: 'auto' })
    } else {
      gsap.to(drawerRef.current, { x: '-100%', duration: 0.3, ease: 'power2.in' })
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, pointerEvents: 'none' })
    }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        ref={overlayRef}
        onClick={close}
        className="fixed inset-0 bg-black/50 z-40 opacity-0 pointer-events-none"
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className="fixed top-0 left-0 h-full w-72 bg-[#0d1117] border-r border-[var(--locked-bg)] z-50 flex flex-col -translate-x-full"
        style={{ transform: 'translateX(-100%)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--locked-bg)]">
          <span className="text-xs uppercase tracking-widest text-[var(--accent-cyan)]">
            Module 1
          </span>
          <button
            onClick={close}
            className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            aria-label="Close navigation"
          >
            ✕
          </button>
        </div>

        {/* Chapter list */}
        <nav className="flex-1 overflow-y-auto p-4">
          {chapters.map((ch) => {
            const progress = ch.totalPosts > 0 ? ch.availablePosts / ch.totalPosts : 0
            const isCurrent = ch.number === currentChapter
            const hasContent = ch.availablePosts > 0

            return (
              <div key={ch.number} className="mb-4">
                {hasContent ? (
                  <Link
                    href={`/series/chapter-${ch.number}`}
                    onClick={close}
                    className={`block p-3 rounded transition-colors ${
                      isCurrent
                        ? 'bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)]'
                        : 'text-[var(--text-primary)] hover:bg-[var(--locked-bg)]'
                    }`}
                  >
                    <p className="text-xs text-[var(--text-muted)] mb-1">Chapter {ch.number}</p>
                    <p className="text-sm font-medium">{ch.title}</p>
                  </Link>
                ) : (
                  <div className="p-3 rounded opacity-40 cursor-not-allowed">
                    <p className="text-xs text-[var(--text-muted)] mb-1">Chapter {ch.number}</p>
                    <p className="text-sm font-medium text-[var(--text-muted)]">{ch.title}</p>
                  </div>
                )}

                {/* Progress bar */}
                <div className="mt-2 mx-3 h-0.5 bg-[var(--locked-bg)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--accent-cyan)] rounded-full transition-all duration-500"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
                <p className="text-xs text-[var(--text-muted)] mx-3 mt-1">
                  {ch.availablePosts}/{ch.totalPosts} posts
                </p>
              </div>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-[var(--locked-bg)]">
          <Link
            href="/series"
            onClick={close}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-cyan)] transition-colors uppercase tracking-widest"
          >
            ← All Chapters
          </Link>
        </div>
      </div>
    </>
  )
}
