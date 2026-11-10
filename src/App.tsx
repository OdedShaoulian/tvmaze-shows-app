import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { ShowsPage } from './pages/ShowsPage'
import { ShowDetailPage } from './pages/ShowDetailPage'
import { ComparePage } from './pages/ComparePage'
import { StatsPage } from './pages/StatsPage'
import { NotFoundPage } from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ShowsPage />} />
            <Route path="/shows/:id" element={<ShowDetailPage />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
