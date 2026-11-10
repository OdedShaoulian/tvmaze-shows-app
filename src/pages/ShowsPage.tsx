import { useState, useEffect, useCallback, useMemo } from 'react'
import { ShowCard } from '../components/ShowCard'
import { FilterBar } from '../components/FilterBar'
import { fetchShows } from '../services/tvmazeApi'
import { extractGenres, extractStatuses, filterShows } from '../utils/filters'
import type { FilterState, Show } from '../types/show'

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  selectedGenre: 'All',
  selectedStatus: 'All',
}

export function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)

  const loadShows = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchShows()
      setShows(data)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while loading shows.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadShows()
  }, [loadShows])

  const genres = useMemo(() => extractGenres(shows), [shows])
  const statuses = useMemo(() => extractStatuses(shows), [shows])
  const filteredShows = useMemo(
    () => filterShows(shows, filters),
    [shows, filters]
  )

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS)
  }, [])

  return (
    <section className="page-container">
      <h1>Shows Catalog</h1>
      <p>Explore popular TV series from TVMaze.</p>

      {isLoading && (
        <div
          className="status-banner loading-banner"
          role="status"
          aria-live="polite"
        >
          <div className="loading-spinner" aria-hidden="true" />
          <span>Loading TV shows from TVMaze...</span>
        </div>
      )}

      {!isLoading && error && (
        <div className="status-banner error-banner" role="alert">
          <p className="error-message">{error}</p>
          <button
            type="button"
            className="retry-button"
            onClick={() => void loadShows()}
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <>
          <FilterBar
            filters={filters}
            genres={genres}
            statuses={statuses}
            onFilterChange={setFilters}
            onReset={handleResetFilters}
          />

          <p className="results-summary" aria-live="polite">
            Showing {filteredShows.length} of {shows.length} shows
          </p>

          {filteredShows.length === 0 ? (
            <div className="status-banner empty-results">
              <p>No shows found matching your criteria</p>
              <button
                type="button"
                className="retry-button"
                onClick={handleResetFilters}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="shows-grid">
              {filteredShows.map((show) => (
                <ShowCard key={show.id} show={show} />
              ))}
            </div>
          )}
        </>
      )}
    </section>
  )
}
