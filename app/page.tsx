import HeroText from '@/components/hero/HeroText'
import ChapterTeaser from '@/components/landing/ChapterTeaser'

export default function Home() {
  return (
    <main>
      {/* Hero section — 3D canvas renders behind this */}
      <section className="relative h-screen overflow-hidden bg-[var(--bg)]">
        <HeroText />
      </section>

      {/* Scroll-down content */}
      <ChapterTeaser />
    </main>
  )
}
