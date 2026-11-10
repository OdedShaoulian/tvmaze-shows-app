import type { Show } from '../types/show'

export function calculateAverageRating(shows: Show[]): number {
  const ratedShows = shows.filter(
    (show): show is Show & { rating: { average: number } } =>
      show.rating.average !== null && !Number.isNaN(show.rating.average)
  )

  if (ratedShows.length === 0) {
    return 0
  }

  const total = ratedShows.reduce((sum, show) => sum + show.rating.average, 0)
  return Number((total / ratedShows.length).toFixed(2))
}

export function getStatusDistribution(shows: Show[]): Record<string, number> {
  const distribution: Record<string, number> = {}

  for (const show of shows) {
    const status = show.status.trim() || 'Unknown'
    distribution[status] = (distribution[status] ?? 0) + 1
  }

  return distribution
}

export function getTopRatedShows(shows: Show[], limit = 5): Show[] {
  if (limit <= 0 || shows.length === 0) {
    return []
  }

  return [...shows]
    .filter((show) => show.rating.average !== null)
    .sort((a, b) => (b.rating.average ?? 0) - (a.rating.average ?? 0))
    .slice(0, limit)
}

export function getGenreDistribution(shows: Show[]): Record<string, number> {
  const distribution: Record<string, number> = {}

  for (const show of shows) {
    for (const genre of show.genres) {
      const normalized = genre.trim()
      if (normalized !== '') {
        distribution[normalized] = (distribution[normalized] ?? 0) + 1
      }
    }
  }

  return distribution
}

