// lib/content.ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { isPostAvailable, formatPostDate } from './scheduling'

// Content lives at repo root — one level above web/
const CONTENT_ROOT = process.env.CONTENT_ROOT
  ? path.join(process.env.CONTENT_ROOT, 'module-1')
  : path.join(process.cwd(), '../content/module-1')

export interface PostFrontmatter {
  week: number
  day: number
  weekday: string
  chapter: string
  source_video: string
  post_title: string
  series_tag: string
}

export interface Scene {
  title: string
  content: string
}

export interface Post {
  frontmatter: PostFrontmatter
  hook: string
  scenes: Scene[]
  takeaway: string
  visualDirection: string
  available: boolean
  releaseDate: string
  slug: string
}

export interface ChapterMeta {
  number: number
  title: string
  slug: string
  posts: Post[]
  totalPosts: number
  availablePosts: number
}

/**
 * Parse a single .md script file into a Post object
 */
export async function parsePostFile(filePath: string): Promise<Post> {
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const fm = data as PostFrontmatter

  // Split content into named sections
  const sections = parseSections(content)

  const hook = sections['Hook'] ?? ''
  const takeaway = sections['Takeaway'] ?? ''
  const visualDirection = sections['Visual Direction'] ?? ''

  // Extract scenes (## Scene N — Title)
  const scenes: Scene[] = Object.entries(sections)
    .filter(([key]) => key.startsWith('Scene'))
    .map(([key, value]) => ({
      title: key.replace(/^Scene \d+ — /, '').trim(),
      content: value.trim(),
    }))

  const slug = path.basename(filePath, '.md')

  return {
    frontmatter: fm,
    hook: hook.trim(),
    scenes,
    takeaway: takeaway.trim(),
    visualDirection: visualDirection.trim(),
    available: isPostAvailable(fm.day),
    releaseDate: formatPostDate(fm.day),
    slug,
  }
}

/**
 * Parse markdown body into named sections keyed by ## heading
 */
function parseSections(content: string): Record<string, string> {
  const sections: Record<string, string> = {}
  const lines = content.split('\n')
  let currentKey = ''
  let buffer: string[] = []

  for (const line of lines) {
    const match = line.match(/^## (.+)$/)
    if (match) {
      if (currentKey) sections[currentKey] = buffer.join('\n').trim()
      // Strip "Scene N — " prefix handling in key
      currentKey = match[1].trim()
      buffer = []
    } else {
      buffer.push(line)
    }
  }
  if (currentKey) sections[currentKey] = buffer.join('\n').trim()
  return sections
}

/**
 * Get all posts for a given chapter number (1-6)
 */
export async function getChapterPosts(chapterNumber: number): Promise<Post[]> {
  const chapterDir = findChapterDir(chapterNumber)
  if (!chapterDir) return []

  const posts: Post[] = []
  const weekDirs = fs.readdirSync(chapterDir).sort()

  for (const weekDir of weekDirs) {
    const weekPath = path.join(chapterDir, weekDir)
    if (!fs.statSync(weekPath).isDirectory()) continue
    const files = fs.readdirSync(weekPath).filter(f => f.endsWith('.md')).sort()
    for (const file of files) {
      const post = await parsePostFile(path.join(weekPath, file))
      posts.push(post)
    }
  }

  return posts
}

/**
 * Get metadata for all 6 chapters
 */
export async function getAllChapters(): Promise<ChapterMeta[]> {
  const CHAPTER_TITLES = [
    'The World Has Changed',
    'What We Built',
    'How Machines Learn',
    'When Machines Fail',
    'AI in the Wild',
    'The Reckoning',
  ]

  const chapters: ChapterMeta[] = []

  for (let i = 1; i <= 6; i++) {
    const posts = await getChapterPosts(i)
    chapters.push({
      number: i,
      title: CHAPTER_TITLES[i - 1],
      slug: `chapter-${i}`,
      posts,
      totalPosts: posts.length,
      availablePosts: posts.filter(p => p.available).length,
    })
  }

  return chapters
}

/**
 * Find the chapter directory by number (matches chapter-N prefix)
 */
function findChapterDir(chapterNumber: number): string | null {
  const dirs = fs.readdirSync(CONTENT_ROOT)
  const match = dirs.find(d => d.startsWith(`chapter-${chapterNumber}-`))
  return match ? path.join(CONTENT_ROOT, match) : null
}
