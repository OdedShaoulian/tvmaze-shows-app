import { describe, it, expect } from 'vitest'
import {
  calculateAverageRating,
  getStatusDistribution,
  getTopRatedShows,
  getGenreDistribution,
} from '../stats'
import type { Show } from '../../types/show'

const sampleShows: Show[] = [
  {
    id: 1,
    name: 'Show Alpha',
    summary: '',
    premiered: '2020-01-01',
    status: 'Ended',
    runtime: 60,
    rating: { average: 9.0 },
    image: null,
    genres: ['Drama', 'Crime'],
    url: 'https://example.com/1',
  },
  {
    id: 2,
    name: 'Show Beta',
    summary: '',
    premiered: '2021-01-01',
    status: 'Running',
    runtime: 45,
    rating: { average: 8.0 },
    image: null,
    genres: ['Drama', 'Sci-Fi'],
    url: 'https://example.com/2',
  },
  {
    id: 3,
    name: 'Show Gamma (Unrated)',
    summary: '',
    premiered: '2022-01-01',
    status: 'Ended',
    runtime: 30,
    rating: { average: null },
    image: null,
    genres: ['Comedy'],
    url: 'https://example.com/3',
  },
]

describe('stats utility', () => {
  it('calculates average rating accurately while ignoring null ratings', () => {
    expect(calculateAverageRating(sampleShows)).toBe(8.5)
  })

  it('returns 0 when calculating average rating for an empty array or all-null ratings', () => {
    expect(calculateAverageRating([])).toBe(0)
    expect(calculateAverageRating([sampleShows[2]])).toBe(0)
  })

  it('sorts top rated shows descending and respects the limit', () => {
    const topOne = getTopRatedShows(sampleShows, 1)
    expect(topOne).toHaveLength(1)
    expect(topOne[0].name).toBe('Show Alpha')

    const topAll = getTopRatedShows(sampleShows, 5)
    expect(topAll).toHaveLength(2)
    expect(topAll.map((s) => s.name)).toEqual(['Show Alpha', 'Show Beta'])
  })

  it('computes status and genre distributions accurately', () => {
    expect(getStatusDistribution(sampleShows)).toEqual({
      Ended: 2,
      Running: 1,
    })

    expect(getGenreDistribution(sampleShows)).toEqual({
      Drama: 2,
      Crime: 1,
      'Sci-Fi': 1,
      Comedy: 1,
    })
  })
})

