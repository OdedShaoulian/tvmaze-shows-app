import { useState, useEffect, useCallback } from 'react'
import { ShowCard } from '../components/ShowCard'
import { fetchShows } from '../services/tvmazeApi'
import type { Show } from '../types/show'

export function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const loadShows = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchShows()
      setShows(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An unexpected error occurred while loading shows.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadShows()
  }, [loadShows])

  return (
    <section className="page-container">
      <h1>Shows Catalog</h1>
      <p>Explore popular TV series from TVMaze.</p>

      {isLoading && (
        <div className="status-banner loading-banner" role="status" aria-live="polite">
          <div className="loading-spinner" aria-hidden="true" />
          <span>Loading TV shows from TVMaze...</span>
        </div>
      )}

      {!isLoading && error && (
        <div className="status-banner error-banner" role="alert">
          <p className="error-message">{error}</p>
          <button type="button" className="retry-button" onClick={() => void loadShows()}>
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && (
        <div className="shows-grid">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>
      )}
    </section>
  )
}
