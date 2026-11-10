import { NavLink } from 'react-router-dom'

export function Navbar() {
  const getLinkClassName = ({ isActive }: { isActive: boolean }): string =>
    isActive ? 'nav-link active' : 'nav-link'

  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="navbar-brand">
          📺 TVMaze Explorer
        </NavLink>
        <nav className="navbar-links" aria-label="Main navigation">
          <NavLink to="/" end className={getLinkClassName}>
            Home
          </NavLink>
          <NavLink to="/compare" className={getLinkClassName}>
            Compare
          </NavLink>
          <NavLink to="/stats" className={getLinkClassName}>
            Stats
          </NavLink>
        </nav>
      </div>
    </header>
  )
}

