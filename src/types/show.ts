export interface ShowRating {
  average: number | null
}

export interface ShowImage {
  medium: string
  original: string
}

export interface Show {
  id: number
  name: string
  summary: string
  premiered: string | null
  status: string
  runtime: number | null
  rating: ShowRating
  image: ShowImage | null
  genres: string[]
  url: string
}

export interface FilterState {
  searchQuery: string
  selectedGenre: string
  selectedStatus: string
}

export interface ShowComparison {
  showA: Show | null
  showB: Show | null
}

