'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'
import Link from 'next/link'

gsap.registerPlugin(TextPlugin)

export default function HeroText() {
  const tagRef = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.from(tagRef.current, { opacity: 0, y: -10, duration: 0.5 })
      .from(titleRef.current, { opacity: 0, y: 30, duration: 0.8 }, '-=0.2')
      .from(subtitleRef.current, { opacity: 0, y: 20, duration: 0.6 }, '-=0.3')
      .to(typedRef.current, {
        duration: 1.5,
        text: '65 posts. 13 weeks. 1 module.',
        ease: 'none',
      }, '+=0.3')
      .from(ctaRef.current, { opacity: 0, y: 10, duration: 0.5 }, '+=0.2')
  }, [])

  return (
    <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-6 pointer-events-none">
      <span
        ref={tagRef}
        className="text-xs uppercase tracking-[0.3em] text-[var(--accent-cyan)] mb-6 opacity-0"
      >
        #AIMLSeries · Module 1
      </span>

      <h1
        ref={titleRef}
        className="text-[clamp(4rem,12vw,9rem)] font-black leading-none tracking-tight text-[var(--text-primary)] opacity-0"
      >
        AI & ML
      </h1>

      <p
        ref={subtitleRef}
        className="text-lg text-[var(--text-muted)] mt-4 mb-3 opacity-0"
      >
        A Series for IT Professionals
      </p>

      <span
        ref={typedRef}
        className="text-sm text-[var(--accent-cyan)] font-mono h-5 block"
      />

      <div ref={ctaRef} className="mt-10 opacity-0 pointer-events-auto">
        <Link
          href="/series"
          className="inline-flex items-center gap-2 px-8 py-3 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] text-sm uppercase tracking-widest hover:bg-[var(--accent-cyan)] hover:text-[var(--bg)] transition-all duration-300"
        >
          Enter the Series →
        </Link>
      </div>
    </div>
  )
}
