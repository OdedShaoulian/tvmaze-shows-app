import type { FilterState } from '../types/show'
import './FilterBar.css'

export interface FilterBarProps {
  filters: FilterState
  genres: string[]
  statuses: string[]
  onFilterChange: (updatedFilters: FilterState) => void
  onReset: () => void
}

export function FilterBar({
  filters,
  genres,
  statuses,
  onFilterChange,
  onReset,
}: FilterBarProps) {
  const hasActiveFilters =
    filters.searchQuery.trim() !== '' ||
    filters.selectedGenre !== 'All' ||
    filters.selectedStatus !== 'All'

  return (
    <div className="filter-bar" role="search" aria-label="Filter TV shows">
      <div className="filter-group filter-search">
        <label htmlFor="show-search-input" className="filter-label">
          Search Title
        </label>
        <input
          id="show-search-input"
          type="search"
          className="filter-input"
          placeholder="Search by show title..."
          value={filters.searchQuery}
          onChange={(e) =>
            onFilterChange({ ...filters, searchQuery: e.target.value })
          }
        />
      </div>

      <div className="filter-group">
        <label htmlFor="show-genre-select" className="filter-label">
          Genre
        </label>
        <select
          id="show-genre-select"
          className="filter-select"
          value={filters.selectedGenre}
          onChange={(e) =>
            onFilterChange({ ...filters, selectedGenre: e.target.value })
          }
        >
          <option value="All">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="show-status-select" className="filter-label">
          Status
        </label>
        <select
          id="show-status-select"
          className="filter-select"
          value={filters.selectedStatus}
          onChange={(e) =>
            onFilterChange({ ...filters, selectedStatus: e.target.value })
          }
        >
          <option value="All">All Statuses</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-actions">
        <button
          type="button"
          className="reset-filters-button"
          onClick={onReset}
          disabled={!hasActiveFilters}
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}

