import { notFound } from 'next/navigation'
import { getPost } from '@/lib/content'
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

  const post = await getPost(chapterNumber, slug)
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
    />
  )
}
