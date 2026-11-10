import type { FilterState, Show } from '../types/show'

export function filterShows(shows: Show[], filters: FilterState): Show[] {
  const normalizedQuery = filters.searchQuery.trim().toLowerCase()

  return shows.filter((show) => {
    const matchesSearch =
      normalizedQuery === '' || show.name.toLowerCase().includes(normalizedQuery)

    const matchesGenre =
      filters.selectedGenre === 'All' ||
      filters.selectedGenre === '' ||
      show.genres.includes(filters.selectedGenre)

    const matchesStatus =
      filters.selectedStatus === 'All' ||
      filters.selectedStatus === '' ||
      show.status === filters.selectedStatus

    return matchesSearch && matchesGenre && matchesStatus
  })
}

export function extractGenres(shows: Show[]): string[] {
  const genreSet = new Set<string>()
  for (const show of shows) {
    for (const genre of show.genres) {
      if (genre.trim() !== '') {
        genreSet.add(genre)
      }
    }
  }
  return Array.from(genreSet).sort((a, b) => a.localeCompare(b))
}

export function extractStatuses(shows: Show[]): string[] {
  const statusSet = new Set<string>()
  for (const show of shows) {
    if (show.status.trim() !== '') {
      statusSet.add(show.status)
    }
  }
  return Array.from(statusSet).sort((a, b) => a.localeCompare(b))
}

