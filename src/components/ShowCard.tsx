import { useState } from 'react'
import { Link } from 'react-router-dom'
import type { Show } from '../types/show'
import './ShowCard.css'

export interface ShowCardProps {
  show: Show
}

export function ShowCard({ show }: ShowCardProps) {
  const [imageError, setImageError] = useState(false)
  const premierYear = show.premiered ? show.premiered.slice(0, 4) : 'N/A'
  const ratingValue = show.rating.average !== null ? show.rating.average.toFixed(1) : 'N/A'
  const hasValidPoster = Boolean(show.image?.medium) && !imageError

  return (
    <article className="show-card">
      <Link to={`/shows/${show.id}`} className="show-card-link">
        <div className="show-card-poster">
          {hasValidPoster && show.image ? (
            <img
              src={show.image.medium}
              alt={`${show.name} official poster`}
              loading="lazy"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="show-card-placeholder" role="img" aria-label={`${show.name} no poster available`}>
              <span>No Poster Available</span>
            </div>
          )}
          <span className="show-card-rating" title="Average rating">
            ★ {ratingValue}
          </span>
        </div>

        <div className="show-card-body">
          <h2 className="show-card-title">{show.name}</h2>
          <div className="show-card-meta">
            <span className="show-card-year">{premierYear}</span>
            <span className={`show-card-status status-${show.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {show.status}
            </span>
          </div>
          {show.genres.length > 0 && (
            <div className="show-card-genres">
              {show.genres.map((genre) => (
                <span key={genre} className="genre-tag">
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}
