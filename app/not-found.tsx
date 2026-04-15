import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-xs uppercase tracking-[0.4em] text-[var(--accent-cyan)] mb-6">
          404
        </p>

        <h1 className="text-4xl font-black text-[var(--text-primary)] mb-4">
          Not Yet
        </h1>

        <p className="text-[var(--text-muted)] mb-10 leading-relaxed">
          This post hasn&apos;t unlocked yet. Come back on the release date — or start from the beginning.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/series"
            className="px-6 py-3 border border-[var(--accent-cyan)] text-[var(--accent-cyan)] text-sm uppercase tracking-widest hover:bg-[var(--accent-cyan)] hover:text-[var(--bg)] transition-all duration-300"
          >
            View Series
          </Link>
          <Link
            href="/"
            className="px-6 py-3 border border-[var(--locked-bg)] text-[var(--text-muted)] text-sm uppercase tracking-widest hover:border-[var(--text-muted)] transition-all duration-300"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  )
}
