import { notFound } from 'next/navigation'
import { getPost, getNextPost } from '@/lib/content'
import TerminalPost from '@/components/terminal/TerminalPost'

interface Params {
  chapter: string
  slug: string
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { chapter, slug } = await params

  const match = chapter.match(/^(?:chapter-)?(\d+)$/)
  const chapterNumber = match ? parseInt(match[1]) : NaN
  if (isNaN(chapterNumber)) notFound()

  const [post, nextPost] = await Promise.all([
    getPost(chapterNumber, slug),
    getNextPost(chapterNumber, slug),
  ])
  if (!post || !post.available) notFound()

  return (
    <TerminalPost
      postTitle={post.frontmatter.post_title}
      chapter={post.frontmatter.chapter}
      releaseDate={post.releaseDate}
      dayNumber={post.frontmatter.day}
      hook={post.hook}
      scenes={post.scenes}
      takeaway={post.takeaway}
      chapterSlug={String(chapterNumber)}
      nextPost={nextPost ?? undefined}
    />
  )
}
