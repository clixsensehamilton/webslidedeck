import { SERIES_START_DATE } from '@/config/series'

/**
 * Given a 1-based day number, returns the calendar date for that post.
 * Skips weekends (Sat/Sun). Day 1 = SERIES_START_DATE (must be a Monday).
 */
export function getPostDate(dayNumber: number): Date {
  const date = new Date(SERIES_START_DATE)
  let weekdaysAdded = 0
  let daysOffset = 0

  while (weekdaysAdded < dayNumber - 1) {
    daysOffset++
    const d = new Date(SERIES_START_DATE)
    d.setDate(d.getDate() + daysOffset)
    const dow = d.getDay()
    if (dow !== 0 && dow !== 6) weekdaysAdded++ // skip Sat(6), Sun(0)
  }

  date.setDate(date.getDate() + daysOffset)
  return date
}

/**
 * Returns true if the post for this day number is available today.
 * DEV MODE: all posts unlocked for review.
 */
export function isPostAvailable(_dayNumber: number): boolean {
  return true
}

/**
 * Formats a post date as "Monday, Apr 14"
 */
export function formatPostDate(dayNumber: number): string {
  const date = getPostDate(dayNumber)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
}
