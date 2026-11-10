import { describe, it, expect } from 'vitest'
import { filterShows, extractGenres, extractStatuses } from '../filters'
import type { Show, FilterState } from '../../types/show'

const sampleShows: Show[] = [
  {
    id: 1,
    name: 'Breaking Bad',
    summary: '<p>Chemistry teacher turns to crime.</p>',
    premiered: '2008-01-20',
    status: 'Ended',
    runtime: 60,
    rating: { average: 9.2 },
    image: null,
    genres: ['Drama', 'Crime', 'Thriller'],
    url: 'https://www.tvmaze.com/shows/169/breaking-bad',
  },
  {
    id: 2,
    name: 'Stranger Things',
    summary: '<p>Supernatural mystery in Hawkins.</p>',
    premiered: '2016-07-15',
    status: 'Running',
    runtime: 50,
    rating: { average: 8.5 },
    image: null,
    genres: ['Drama', 'Fantasy', 'Science-Fiction'],
    url: 'https://www.tvmaze.com/shows/2993/stranger-things',
  },
  {
    id: 3,
    name: 'The Office',
    summary: '<p>Workplace mockumentary.</p>',
    premiered: '2005-03-24',
    status: 'Ended',
    runtime: 30,
    rating: { average: 8.6 },
    image: null,
    genres: ['Comedy'],
    url: 'https://www.tvmaze.com/shows/526/the-office',
  },
]

describe('filters utility', () => {
  it('filters shows case-insensitively by searchQuery', () => {
    const filters: FilterState = {
      searchQuery: 'stranger',
      selectedGenre: 'All',
      selectedStatus: 'All',
    }
    const result = filterShows(sampleShows, filters)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Stranger Things')
  })

  it('filters shows by selectedGenre and selectedStatus simultaneously', () => {
    const filters: FilterState = {
      searchQuery: '',
      selectedGenre: 'Drama',
      selectedStatus: 'Ended',
    }
    const result = filterShows(sampleShows, filters)
    expect(result).toHaveLength(1)
    expect(result[0].name).toBe('Breaking Bad')
  })

  it('returns all shows when filters are in default reset state', () => {
    const defaultFilters: FilterState = {
      searchQuery: '',
      selectedGenre: 'All',
      selectedStatus: 'All',
    }
    const result = filterShows(sampleShows, defaultFilters)
    expect(result).toHaveLength(3)
  })

  it('returns an empty array when no shows match the search criteria', () => {
    const filters: FilterState = {
      searchQuery: 'NonExistentShowXYZ',
      selectedGenre: 'All',
      selectedStatus: 'All',
    }
    const result = filterShows(sampleShows, filters)
    expect(result).toEqual([])
  })

  it('extracts sorted unique genres and unique statuses from shows', () => {
    const genres = extractGenres(sampleShows)
    expect(genres).toEqual([
      'Comedy',
      'Crime',
      'Drama',
      'Fantasy',
      'Science-Fiction',
      'Thriller',
    ])

    const statuses = extractStatuses(sampleShows)
    expect(statuses).toEqual(['Ended', 'Running'])
  })
})

