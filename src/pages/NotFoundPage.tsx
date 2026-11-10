import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <section className="page-container not-found">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="back-home-link">
        Return to Home
      </Link>
    </section>
  )
}

