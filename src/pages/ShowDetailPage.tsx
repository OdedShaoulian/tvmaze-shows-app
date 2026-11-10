import { useState, useEffect, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import { fetchShowById } from '../services/tvmazeApi'
import { stripHtml } from '../utils/text'
import type { Show } from '../types/show'
import './ShowDetailPage.css'

export function ShowDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [show, setShow] = useState<Show | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [posterError, setPosterError] = useState<boolean>(false)

  const loadShow = useCallback(async () => {
    if (!id) {
      setError('Invalid show ID.')
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setError(null)
    setPosterError(false)
    try {
      const data = await fetchShowById(id)
      setShow(data)
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while loading show details.'
      setError(message)
      setShow(null)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    void loadShow()
  }, [loadShow])

  if (isLoading) {
    return (
      <section className="page-container">
        <div
          className="status-banner loading-banner"
          role="status"
          aria-live="polite"
        >
          <div className="loading-spinner" aria-hidden="true" />
          <span>Loading show details...</span>
        </div>
      </section>
    )
  }

  if (error || !show) {
    return (
      <section className="page-container">
        <div className="status-banner error-banner" role="alert">
          <p className="error-message">{error ?? 'Show not found.'}</p>
          <div className="detail-error-actions">
            <button
              type="button"
              className="retry-button"
              onClick={() => void loadShow()}
            >
              Retry
            </button>
            <Link to="/" className="back-catalog-btn">
              ← Back to Catalog
            </Link>
          </div>
        </div>
      </section>
    )
  }

  const premierYear = show.premiered ? show.premiered.slice(0, 4) : 'Unknown'
  const ratingValue =
    show.rating.average !== null ? show.rating.average.toFixed(1) : 'N/A'
  const runtimeValue =
    show.runtime !== null ? `${show.runtime} min` : 'Not specified'
  const cleanSummary = stripHtml(show.summary)

  return (
    <section className="page-container show-detail-page">
      <div className="detail-top-bar">
        <Link to="/" className="back-catalog-btn">
          ← Back to Catalog
        </Link>
      </div>

      <div className="show-detail-card">
        <div className="show-detail-poster">
          {show.image && !posterError ? (
            <img
              src={show.image.original || show.image.medium}
              alt={`${show.name} official poster`}
              onError={() => setPosterError(true)}
            />
          ) : (
            <div
              className="show-detail-placeholder"
              role="img"
              aria-label={`${show.name} no poster available`}
            >
              <span>No Image Available</span>
            </div>
          )}
        </div>

        <div className="show-detail-content">
          <div className="show-detail-header">
            <h1 className="show-detail-title">{show.name}</h1>
            <span className="show-detail-rating" title="Average rating">
              ★ {ratingValue}
            </span>
          </div>

          {show.genres.length > 0 && (
            <div className="show-detail-genres">
              {show.genres.map((genre) => (
                <span key={genre} className="detail-genre-badge">
                  {genre}
                </span>
              ))}
            </div>
          )}

          <dl className="show-detail-meta">
            <div className="meta-item">
              <dt>Status</dt>
              <dd>
                <span
                  className={`show-card-status status-${show.status.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {show.status}
                </span>
              </dd>
            </div>
            <div className="meta-item">
              <dt>Premiered</dt>
              <dd>{show.premiered ?? premierYear}</dd>
            </div>
            <div className="meta-item">
              <dt>Premier Year</dt>
              <dd>{premierYear}</dd>
            </div>
            <div className="meta-item">
              <dt>Runtime</dt>
              <dd>{runtimeValue}</dd>
            </div>
          </dl>

          <div className="show-detail-summary">
            <h2>Summary</h2>
            <p>{cleanSummary || 'No summary available for this show.'}</p>
          </div>

          <div className="show-detail-actions">
            <a
              href={show.url}
              target="_blank"
              rel="noreferrer noopener"
              className="tvmaze-external-link"
            >
              View on TVMaze ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
