import { useState, useEffect, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { fetchShows } from '../services/tvmazeApi'
import {
  calculateAverageRating,
  getStatusDistribution,
  getTopRatedShows,
  getGenreDistribution,
} from '../utils/stats'
import type { Show } from '../types/show'
import './StatsPage.css'

export function StatsPage() {
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
      const message =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while loading catalog statistics.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadShows()
  }, [loadShows])

  const averageRating = useMemo(() => calculateAverageRating(shows), [shows])
  const statusDistribution = useMemo(
    () => getStatusDistribution(shows),
    [shows]
  )
  const topRatedShows = useMemo(() => getTopRatedShows(shows, 5), [shows])
  const genreDistribution = useMemo(() => getGenreDistribution(shows), [shows])

  const mostCommonStatus = useMemo(() => {
    const entries = Object.entries(statusDistribution)
    if (entries.length === 0) return 'N/A'
    entries.sort((a, b) => b[1] - a[1])
    return entries[0][0]
  }, [statusDistribution])

  const topGenres = useMemo(() => {
    return Object.entries(genreDistribution)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
  }, [genreDistribution])

  return (
    <section className="page-container stats-page">
      <h1>Catalog Analytics &amp; Stats</h1>
      <p>Summary insights and aggregated metrics from the TVMaze catalog.</p>

      {isLoading && (
        <div
          className="status-banner loading-banner"
          role="status"
          aria-live="polite"
        >
          <div className="loading-spinner" aria-hidden="true" />
          <span>Calculating catalog statistics...</span>
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
        <div className="stats-dashboard">
          <div className="kpi-cards-grid">
            <div className="kpi-card">
              <span className="kpi-label">Total Shows</span>
              <span className="kpi-value">{shows.length}</span>
              <span className="kpi-sub">Active catalog size</span>
            </div>

            <div className="kpi-card">
              <span className="kpi-label">Average Rating</span>
              <span className="kpi-value kpi-rating">★ {averageRating.toFixed(2)}</span>
              <span className="kpi-sub">Across rated series</span>
            </div>

            <div className="kpi-card">
              <span className="kpi-label">Most Common Status</span>
              <span className="kpi-value">{mostCommonStatus}</span>
              <span className="kpi-sub">
                {statusDistribution[mostCommonStatus] ?? 0} shows
              </span>
            </div>
          </div>

          <div className="stats-panels-grid">
            <div className="stats-panel">
              <h2>Top 5 Highest Rated Shows</h2>
              <div className="leaderboard-list">
                {topRatedShows.map((show, index) => (
                  <div key={show.id} className="leaderboard-item">
                    <span className="leaderboard-rank">#{index + 1}</span>
                    <div className="leaderboard-info">
                      <Link
                        to={`/shows/${show.id}`}
                        className="leaderboard-title"
                      >
                        {show.name}
                      </Link>
                      <div className="leaderboard-genres">
                        {show.genres.map((genre) => (
                          <span key={genre} className="genre-tag">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    <span className="leaderboard-rating">
                      ★ {show.rating.average?.toFixed(1) ?? 'N/A'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-side-column">
              <div className="stats-panel">
                <h2>Status Breakdown</h2>
                <div className="breakdown-list">
                  {Object.entries(statusDistribution)
                    .sort((a, b) => b[1] - a[1])
                    .map(([status, count]) => {
                      const percentage =
                        shows.length > 0
                          ? Math.round((count / shows.length) * 100)
                          : 0
                      return (
                        <div key={status} className="breakdown-row">
                          <div className="breakdown-header">
                            <span className="breakdown-name">{status}</span>
                            <span className="breakdown-count">
                              {count} ({percentage}%)
                            </span>
                          </div>
                          <div
                            className="progress-track"
                            role="progressbar"
                            aria-valuenow={percentage}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-label={`${status} percentage`}
                          >
                            <div
                              className="progress-fill"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>

              <div className="stats-panel">
                <h2>Top Genres</h2>
                <div className="top-genres-grid">
                  {topGenres.map(([genre, count]) => (
                    <div key={genre} className="genre-stat-chip">
                      <span className="genre-stat-name">{genre}</span>
                      <span className="genre-stat-count">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
