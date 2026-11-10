import { useParams } from 'react-router-dom'

export function ShowDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <section className="page-container">
      <h1>Show Details</h1>
      <p>Viewing details for show ID: {id}</p>
    </section>
  )
}

