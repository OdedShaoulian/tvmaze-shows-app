import type { Show } from '../types/show'

const TVMAZE_API_BASE_URL = 'https://api.tvmaze.com'

export async function fetchShows(): Promise<Show[]> {
  const response = await fetch(`${TVMAZE_API_BASE_URL}/shows`)

  if (!response.ok) {
    throw new Error(`Failed to fetch shows: HTTP ${response.status} ${response.statusText}`)
  }

  const data: Show[] = (await response.json()) as Show[]
  return data
}

