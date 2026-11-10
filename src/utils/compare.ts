import type { Show } from '../types/show'

export interface RatingComparisonResult {
  winner: 'A' | 'B' | 'tie'
  diff: number
}

export interface RuntimeComparisonResult {
  longer: 'A' | 'B' | 'tie'
  diff: number
}

export function compareRatings(a: Show, b: Show): RatingComparisonResult {
  const ratingA = a.rating.average ?? 0
  const ratingB = b.rating.average ?? 0
  const diff = Number(Math.abs(ratingA - ratingB).toFixed(1))

  if (ratingA > ratingB) {
    return { winner: 'A', diff }
  }
  if (ratingB > ratingA) {
    return { winner: 'B', diff }
  }
  return { winner: 'tie', diff: 0 }
}

export function compareRuntime(a: Show, b: Show): RuntimeComparisonResult {
  const runtimeA = a.runtime ?? 0
  const runtimeB = b.runtime ?? 0
  const diff = Math.abs(runtimeA - runtimeB)

  if (runtimeA > runtimeB) {
    return { longer: 'A', diff }
  }
  if (runtimeB > runtimeA) {
    return { longer: 'B', diff }
  }
  return { longer: 'tie', diff: 0 }
}

export function getSharedGenres(a: Show, b: Show): string[] {
  const genresB = new Set(b.genres)
  return a.genres.filter((genre) => genresB.has(genre))
}

