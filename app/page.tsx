import HeroText from '@/components/hero/HeroText'
import ChapterTeaser from '@/components/landing/ChapterTeaser'
import ParticleNetworkLoader from '@/components/hero/ParticleNetworkLoader'

export default function Home() {
  return (
    <main>
      <section className="relative h-screen overflow-hidden bg-[var(--bg)]">
        <ParticleNetworkLoader />
        <HeroText />
      </section>
      <ChapterTeaser />
    </main>
  )
}
