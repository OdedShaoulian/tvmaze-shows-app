import mockShowsData from '../data/mockShows.json'
import { ShowCard } from '../components/ShowCard'
import type { Show } from '../types/show'

const mockShows: Show[] = mockShowsData

export function ShowsPage() {
  return (
    <section className="page-container">
      <h1>Shows Catalog</h1>
      <p>Explore popular TV series from TVMaze.</p>
      <div className="shows-grid">
        {mockShows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </section>
  )
}
