'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface Scene {
  title: string
  content: string
}

interface ScenePanelProps {
  scenes: Scene[]
  hook: string
  takeaway: string
}

export default function ScenePanel({ scenes, hook, takeaway }: ScenePanelProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const elements = containerRef.current.querySelectorAll('.scene-reveal')

    const ctx = gsap.context(() => {
      gsap.from(elements, {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [scenes])

  return (
    <div ref={containerRef} className="space-y-8">
      {/* Hook */}
      <div className="scene-reveal">
        <p className="text-[var(--text-muted)] text-sm italic leading-relaxed border-l-2 border-[var(--accent-cyan)] pl-4">
          {hook}
        </p>
      </div>

      {/* Scenes */}
      {scenes.map((scene, idx) => (
        <div key={idx} className="scene-reveal">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-mono text-[var(--accent-cyan)] opacity-60">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <h4 className="text-xs text-[var(--accent-purple)] uppercase tracking-widest font-semibold">
              {scene.title}
            </h4>
          </div>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap pl-6">
            {scene.content}
          </p>
        </div>
      ))}

      {/* Takeaway */}
      <div className="scene-reveal pt-4 border-t border-[var(--locked-bg)]">
        <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">
          The Takeaway
        </p>
        <p className="text-base font-bold text-[var(--text-primary)] leading-snug">
          {takeaway}
        </p>
      </div>
    </div>
  )
}
