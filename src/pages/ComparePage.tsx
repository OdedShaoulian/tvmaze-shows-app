import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fetchShows } from '../services/tvmazeApi'
import {
  compareRatings,
  compareRuntime,
  getSharedGenres,
} from '../utils/compare'
import type { Show } from '../types/show'
import './ComparePage.css'

export function ComparePage() {
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedIdA, setSelectedIdA] = useState<string>('')
  const [selectedIdB, setSelectedIdB] = useState<string>('')

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

  const sortedShows = useMemo(
    () => [...shows].sort((a, b) => a.name.localeCompare(b.name)),
    [shows]
  )

  const showA = useMemo(
    () => shows.find((s) => String(s.id) === selectedIdA) ?? null,
    [shows, selectedIdA]
  )

  const showB = useMemo(
    () => shows.find((s) => String(s.id) === selectedIdB) ?? null,
    [shows, selectedIdB]
  )

  const ratingResult = useMemo(
    () => (showA && showB ? compareRatings(showA, showB) : null),
    [showA, showB]
  )

  const runtimeResult = useMemo(
    () => (showA && showB ? compareRuntime(showA, showB) : null),
    [showA, showB]
  )

  const sharedGenres = useMemo(
    () => (showA && showB ? getSharedGenres(showA, showB) : []),
    [showA, showB]
  )

  return (
    <section className="page-container compare-page">
      <h1>Show Comparison</h1>
      <p>Select two shows to compare their ratings, runtime, and genres side by side.</p>

      {isLoading && (
        <div
          className="status-banner loading-banner"
          role="status"
          aria-live="polite"
        >
          <div className="loading-spinner" aria-hidden="true" />
          <span>Loading TV shows for comparison...</span>
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
          <div className="compare-selectors">
            <div className="selector-card">
              <label htmlFor="select-show-a" className="selector-label">
                Show A
              </label>
              <select
                id="select-show-a"
                className="compare-select"
                value={selectedIdA}
                onChange={(e) => setSelectedIdA(e.target.value)}
              >
                <option value="">-- Choose Show A --</option>
                {sortedShows.map((show) => (
                  <option key={show.id} value={String(show.id)}>
                    {show.name} ({show.premiered ? show.premiered.slice(0, 4) : 'N/A'})
                  </option>
                ))}
              </select>
            </div>

            <div className="compare-vs-badge" aria-hidden="true">
              VS
            </div>

            <div className="selector-card">
              <label htmlFor="select-show-b" className="selector-label">
                Show B
              </label>
              <select
                id="select-show-b"
                className="compare-select"
                value={selectedIdB}
                onChange={(e) => setSelectedIdB(e.target.value)}
              >
                <option value="">-- Choose Show B --</option>
                {sortedShows.map((show) => (
                  <option key={show.id} value={String(show.id)}>
                    {show.name} ({show.premiered ? show.premiered.slice(0, 4) : 'N/A'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {(!showA || !showB) && (
            <div className="status-banner compare-prompt">
              <p>
                Please select both <strong>Show A</strong> and{' '}
                <strong>Show B</strong> above to view a side-by-side comparison.
              </p>
            </div>
          )}

          {showA && showB && ratingResult && runtimeResult && (
            <div className="comparison-results">
              <div className="shared-genres-banner">
                <h2>Shared Genres</h2>
                {sharedGenres.length > 0 ? (
                  <div className="shared-genres-list">
                    {sharedGenres.map((genre) => (
                      <span key={genre} className="detail-genre-badge">
                        {genre}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="no-shared-genres">No overlapping genres between these two shows.</p>
                )}
              </div>

              <div className="comparison-table-wrapper">
                <table className="comparison-table">
                  <thead>
                    <tr>
                      <th scope="col">Attribute</th>
                      <th scope="col">{showA.name}</th>
                      <th scope="col">{showB.name}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">Poster</th>
                      <td>
                        <div className="compare-poster-cell">
                          {showA.image ? (
                            <img
                              src={showA.image.medium}
                              alt={`${showA.name} poster`}
                              className="compare-poster-img"
                            />
                          ) : (
                            <div className="compare-poster-placeholder">No Image</div>
                          )}
                          <Link to={`/shows/${showA.id}`} className="compare-detail-link">
                            View Details →
                          </Link>
                        </div>
                      </td>
                      <td>
                        <div className="compare-poster-cell">
                          {showB.image ? (
                            <img
                              src={showB.image.medium}
                              alt={`${showB.name} poster`}
                              className="compare-poster-img"
                            />
                          ) : (
                            <div className="compare-poster-placeholder">No Image</div>
                          )}
                          <Link to={`/shows/${showB.id}`} className="compare-detail-link">
                            View Details →
                          </Link>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Premiered</th>
                      <td>{showA.premiered ?? 'Unknown'}</td>
                      <td>{showB.premiered ?? 'Unknown'}</td>
                    </tr>

                    <tr>
                      <th scope="row">Rating</th>
                      <td className={ratingResult.winner === 'A' ? 'winner-cell' : ''}>
                        <span className="compare-metric-value">
                          ★ {showA.rating.average !== null ? showA.rating.average.toFixed(1) : 'N/A'}
                        </span>
                        {ratingResult.winner === 'A' && (
                          <span className="winner-badge">
                            Higher (+{ratingResult.diff})
                          </span>
                        )}
                        {ratingResult.winner === 'tie' && (
                          <span className="tie-badge">Tie</span>
                        )}
                      </td>
                      <td className={ratingResult.winner === 'B' ? 'winner-cell' : ''}>
                        <span className="compare-metric-value">
                          ★ {showB.rating.average !== null ? showB.rating.average.toFixed(1) : 'N/A'}
                        </span>
                        {ratingResult.winner === 'B' && (
                          <span className="winner-badge">
                            Higher (+{ratingResult.diff})
                          </span>
                        )}
                        {ratingResult.winner === 'tie' && (
                          <span className="tie-badge">Tie</span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Runtime</th>
                      <td className={runtimeResult.longer === 'A' ? 'winner-cell' : ''}>
                        <span className="compare-metric-value">
                          {showA.runtime !== null ? `${showA.runtime} min` : 'N/A'}
                        </span>
                        {runtimeResult.longer === 'A' && (
                          <span className="longer-badge">
                            Longer (+{runtimeResult.diff} min)
                          </span>
                        )}
                        {runtimeResult.longer === 'tie' && (
                          <span className="tie-badge">Same Runtime</span>
                        )}
                      </td>
                      <td className={runtimeResult.longer === 'B' ? 'winner-cell' : ''}>
                        <span className="compare-metric-value">
                          {showB.runtime !== null ? `${showB.runtime} min` : 'N/A'}
                        </span>
                        {runtimeResult.longer === 'B' && (
                          <span className="longer-badge">
                            Longer (+{runtimeResult.diff} min)
                          </span>
                        )}
                        {runtimeResult.longer === 'tie' && (
                          <span className="tie-badge">Same Runtime</span>
                        )}
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Status</th>
                      <td>
                        <span
                          className={`show-card-status status-${showA.status.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {showA.status}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`show-card-status status-${showB.status.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          {showB.status}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <th scope="row">Genres</th>
                      <td>
                        <div className="compare-genres-cell">
                          {showA.genres.map((genre) => (
                            <span
                              key={genre}
                              className={
                                sharedGenres.includes(genre)
                                  ? 'detail-genre-badge'
                                  : 'genre-tag'
                              }
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="compare-genres-cell">
                          {showB.genres.map((genre) => (
                            <span
                              key={genre}
                              className={
                                sharedGenres.includes(genre)
                                  ? 'detail-genre-badge'
                                  : 'genre-tag'
                              }
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  )
}
