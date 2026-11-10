# TVMaze Series Explorer

**TVMaze Series Explorer** is a responsive front-end Single Page Application (SPA) built with **React 19**, **TypeScript**, and **Vite** that enables TV enthusiasts to browse, filter, inspect, compare, and analyze popular television series using live data from the public [TVMaze API](https://www.tvmaze.com/api).

---

## Core Features

- **Live TVMaze API Integration:** Fetches the TV series catalog (`GET https://api.tvmaze.com/shows`) and individual show details (`GET https://api.tvmaze.com/shows/:id`) with accessible loading spinners and retryable error states.
- **Real-Time Search & Multi-Faceted Filtering:** Instant client-side filtering by show title (case-insensitive), genre dropdown, and broadcast status (`Running`, `Ended`, `To Be Determined`, etc.).
- **Dynamic Show Detail View (`/shows/:id`):** Displays full show metadata including high-resolution poster with graceful fallback, average rating, genre badges, broadcast status, premiere date/year, episode runtime, sanitized summary text, and direct link to TVMaze.
- **Side-by-Side Show Comparator (`/compare`):** Interactive comparison between any two series, highlighting the higher-rated show, longer episode runtime, status badges, and overlapping/shared genres.
- **Catalog Analytics & Insights (`/stats`):** Computes and visualizes catalog-wide KPIs including total shows, average rating, most common broadcast status, Top 5 highest-rated series leaderboard, status percentage breakdown, and top genre counts.
- **Strict Type Safety:** 100% TypeScript coverage with dedicated interfaces and zero usage of `any`.

---

## Tech Stack

- **UI Framework:** React 19
- **Language:** TypeScript (~6.0)
- **Build Tool & Dev Server:** Vite 8
- **Routing:** React Router (`react-router-dom` v7, compatible with v6+ patterns)
- **Unit Testing:** Vitest 5
- **Styling:** Custom responsive CSS with CSS variables and dark/light mode support

---

## Architecture & Directory Structure

```text
src/
├── components/          # Reusable UI components
│   ├── FilterBar.tsx    # Search input, genre/status selects, and reset action
│   ├── FilterBar.css
│   ├── Navbar.tsx       # Responsive sticky navigation bar with NavLink
│   ├── ShowCard.tsx     # Catalog card with poster fallback, rating, and badges
│   └── ShowCard.css
├── data/
│   └── mockShows.json   # Sample TVMaze dataset for reference/fallback
├── pages/               # Route-level page views
│   ├── ShowsPage.tsx    # Master catalog view ("/")
│   ├── ShowDetailPage.tsx & ShowDetailPage.css # Detail view ("/shows/:id")
│   ├── ComparePage.tsx & ComparePage.css       # Side-by-side comparison ("/compare")
│   ├── StatsPage.tsx & StatsPage.css           # Analytics dashboard ("/stats")
│   └── NotFoundPage.tsx # 404 fallback route ("*")
├── services/
│   └── tvmazeApi.ts     # API client functions (fetchShows, fetchShowById)
├── types/
│   └── show.ts          # TypeScript interfaces (Show, ShowRating, ShowImage, FilterState, ShowComparison)
├── utils/               # Pure, deterministic business logic functions
│   ├── filters.ts       # filterShows, extractGenres, extractStatuses
│   ├── compare.ts       # compareRatings, compareRuntime, getSharedGenres
│   ├── stats.ts         # calculateAverageRating, getStatusDistribution, getTopRatedShows, getGenreDistribution
│   ├── text.ts          # stripHtml sanitizer
│   └── __tests__/       # Vitest unit test suites
│       ├── filters.test.ts
│       ├── compare.test.ts
│       └── stats.test.ts
├── App.tsx              # BrowserRouter and route definitions
├── App.css              # Layout and shared banner/navigation styles
└── main.tsx             # Application entry point
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd tvmaze-shows-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

Open the local URL displayed in the terminal (typically `http://localhost:5173`) in your browser.

### 4. Run unit tests

```bash
npm test
```

### 5. Build for production

```bash
npm run build
```

---

## Testing Overview

Unit tests are powered by **Vitest** and located in `src/utils/__tests__/`. All business logic is extracted into pure, side-effect-free utility functions:

- **`filters.test.ts`**: Verifies case-insensitive title search, combined genre and status filtering, reset behavior, empty match handling, and unique genre/status extraction.
- **`stats.test.ts`**: Verifies average rating calculation (including ignoring `null` ratings and handling empty arrays), Top-N sorting, and status/genre distributions.
- **`compare.test.ts`**: Verifies higher-rating winner detection, rating ties, runtime difference calculations, and shared genre extraction.
