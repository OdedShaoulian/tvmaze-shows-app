import { describe, it, expect } from 'vitest'
import {
  compareRatings,
  compareRuntime,
  getSharedGenres,
} from '../compare'
import type { Show } from '../../types/show'

const showA: Show = {
  id: 10,
  name: 'Breaking Bad',
  summary: '',
  premiered: '2008-01-20',
  status: 'Ended',
  runtime: 60,
  rating: { average: 9.2 },
  image: null,
  genres: ['Drama', 'Crime', 'Thriller'],
  url: 'https://example.com/10',
}

const showB: Show = {
  id: 20,
  name: 'True Detective',
  summary: '',
  premiered: '2014-01-12',
  status: 'Running',
  runtime: 55,
  rating: { average: 8.3 },
  image: null,
  genres: ['Drama', 'Crime', 'Mystery'],
  url: 'https://example.com/20',
}

describe('compare utility', () => {
  it('identifies the higher rated show and calculates rating difference', () => {
    const resultAB = compareRatings(showA, showB)
    expect(resultAB).toEqual({ winner: 'A', diff: 0.9 })

    const resultBA = compareRatings(showB, showA)
    expect(resultBA).toEqual({ winner: 'B', diff: 0.9 })
  })

  it('handles rating ties cleanly', () => {
    const resultTie = compareRatings(showA, { ...showB, rating: { average: 9.2 } })
    expect(resultTie).toEqual({ winner: 'tie', diff: 0 })
  })

  it('compares runtime duration and handles equal runtimes', () => {
    expect(compareRuntime(showA, showB)).toEqual({ longer: 'A', diff: 5 })
    expect(compareRuntime(showA, { ...showB, runtime: 60 })).toEqual({
      longer: 'tie',
      diff: 0,
    })
  })

  it('extracts overlapping shared genres between two shows', () => {
    expect(getSharedGenres(showA, showB)).toEqual(['Drama', 'Crime'])
    expect(
      getSharedGenres(showA, { ...showB, genres: ['Comedy', 'Romance'] })
    ).toEqual([])
  })
})

