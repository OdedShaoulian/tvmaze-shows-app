# יומן פרומפטים

## 2026-11-10

**14:03 · antigravity**

> test hook connection

**14:34 · antigravity**

> > We are developing the TVMaze Series Explorer React + TypeScript app based on PRD.md and tasks.md.
> 
> Please execute Task 1: TypeScript Interfaces.
> 
> Requirements:
> 1. Create a dedicated types file: src/types/show.ts
> 2. Define complete and clean TypeScript interfaces matching the TVMaze API data structure:
>    - Show: id (number), name (string), summary (string), premiered (string | null), status (string), runtime (number | null), rating (ShowRating), image (ShowImage | null), genres (string[]), url (string)
>    - ShowRating: average (number | null)
>    - ShowImage: medium (string), original (string)
>    - FilterState: searchQuery (string), selectedGenre (string), selectedStatus (string)
>    - ShowComparison: showA (Show | null), showB (Show | null)
> 3. Strictly NO use of 'any' across all definitions. Export all interfaces and types.
> 4. Update tasks.md to mark Task 1 as completed ([x]).

**14:40 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 2: App Layout & React Router Setup.
> 
> Requirements:
> 1. Setup React Router in src/App.tsx using BrowserRouter, Routes, and Route.
> 2. Define the application routes:
>    - "/" -> ShowsPage (Master catalog view)
>    - "/shows/:id" -> ShowDetailPage (Show details view)
>    - "/compare" -> ComparePage (Show comparison view)
>    - "/stats" -> StatsPage (Analytics & stats view)
>    - "*" -> NotFoundPage (404 view with link back to home)
> 3. Create lightweight placeholder page components in src/pages/:
>    - ShowsPage.tsx
>    - ShowDetailPage.tsx
>    - ComparePage.tsx
>    - StatsPage.tsx
>    - NotFoundPage.tsx
> 4. Create a responsive Navbar component in src/components/Navbar.tsx using NavLink from react-router-dom, providing active link styling and links to Home ("/"), Compare ("/compare"), and Stats ("/stats").
> 5. Create an AppLayout component or wrap routes cleanly with the Navbar and a responsive main container.
> 6. Zero 'any' types used.
> 7. Update tasks.md to mark Task 2 as completed ([x]).

**14:56 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 3: Mock Data & Master List Component.
> 
> Requirements:
> 1. Create a mock dataset in src/data/mockShows.json containing at least 4 realistic TV shows adhering to the Show interface (including fields: id, name, summary, premiered, status, runtime, rating with average, image with medium and original, genres, url).
> 2. Create a reusable ShowCard component in src/components/ShowCard.tsx:
>    - Accept a show: Show as prop.
>    - Render the show poster image (with an accessible alt attribute and a fallback placeholder if null), show name, rating badge, status, and premier year.
>    - Include a React Router Link pointing to `/shows/${show.id}`.
> 3. Update src/pages/ShowsPage.tsx:
>    - Import the mock shows from mockShows.json.
>    - Render a responsive grid of ShowCard components.
>    - Ensure every card in the list uses a unique key prop (show.id).
> 4. Add clear, modern CSS styling for the show card and responsive grid in src/components/ShowCard.css or modular CSS.
> 5. Zero use of 'any'. Ensure TypeScript compiles cleanly.
> 6. Update tasks.md to mark Task 3 as completed ([x]).

**15:21 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 4: API Integration with Loading & Error States.
> 
> Requirements:
> 1. Create an API service file in src/services/tvmazeApi.ts:
>    - Export a function `fetchShows(): Promise<Show[]>` that fetches data from `https://api.tvmaze.com/shows`.
>    - Add proper HTTP error handling (check response.ok, throw informative error on failures).
> 2. Update src/pages/ShowsPage.tsx:
>    - Replace the static mock data import with stateful data management using `useState<Show[]>([])`.
>    - Add loading state (`isLoading: boolean`, initialized to true) and error state (`error: string | null`, initialized to null).
>    - Fetch the live shows inside a `useEffect` hook on mount.
>    - Render an accessible, clean loading spinner/message when `isLoading` is true.
>    - Render an error banner with a "Retry" button when `error` is present.
>    - When loaded successfully, render the shows in the existing responsive ShowCard grid.
> 3. Strictly maintain type safety (no 'any'). Ensure `npm run build` succeeds cleanly.
> 4. Update tasks.md to mark Task 4 as completed ([x]).

**15:46 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 5: Search & Genre Filtering.
> 
> Requirements:
> 1. Create a pure utility file in src/utils/filters.ts:
>    - Export `filterShows(shows: Show[], filters: FilterState): Show[]`:
>      * Filter case-insensitively by show name.
>      * Filter by genre if selectedGenre !== 'All'.
>      * Filter by status if selectedStatus !== 'All'.
>    - Export `extractGenres(shows: Show[]): string[]` returning an alphabetically sorted list of unique genres present across all shows.
>    - Export `extractStatuses(shows: Show[]): string[]` returning unique statuses.
>    - Keep all functions pure, deterministic, and without side effects (suitable for unit testing).
> 2. Create a FilterBar component in src/components/FilterBar.tsx:
>    - Text input for title search with clear label and placeholder.
>    - Select dropdown for genres (with "All Genres" default).
>    - Select dropdown for statuses (with "All Statuses" default).
>    - "Reset Filters" button to restore default state.
>    - Responsive styling in FilterBar.css or modular CSS.
> 3. Integrate into src/pages/ShowsPage.tsx:
>    - Hold filter state using `useState<FilterState>({ searchQuery: '', selectedGenre: 'All', selectedStatus: 'All' })`.
>    - Apply `filterShows` using `useMemo` for optimal performance.
>    - Display a friendly "No shows found matching your criteria" message with a reset button when filtered results are empty.
>    - Display the count of currently matched shows (e.g. "Showing X of Y shows").
> 4. Strict TypeScript typing (zero 'any'). Ensure `npm run build` succeeds.
> 5. Update tasks.md to mark Task 5 as completed ([x]).

**16:15 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 6: Dynamic Show Detail Page.
> 
> Requirements:
> 1. Update src/services/tvmazeApi.ts:
>    - Export `fetchShowById(id: string | number): Promise<Show>` that queries `https://api.tvmaze.com/shows/${id}` with proper error handling.
> 2. Create a helper in src/utils/text.ts:
>    - Export a pure helper `stripHtml(html: string): string` to safely strip HTML tags from the TVMaze summary string without using dangerous innerHTML injection, or safely clean it up for rendering.
> 3. Build the full ShowDetailPage component in src/pages/ShowDetailPage.tsx:
>    - Extract the show id from URL using `useParams<{ id: string }>()`.
>    - Manage `show: Show | null`, `isLoading: boolean`, and `error: string | null` states.
>    - Fetch the single show details on component mount or id change inside `useEffect`.
>    - Render a loading spinner during fetch and an informative error state with a "Back to Catalog" button if fetch fails or show is not found.
>    - Render detailed show data: large poster image (with fallback placeholder), title, rating, genres badge list, status, premiered year, runtime, and sanitized summary description.
>    - Include a "Back to Catalog" navigation button linking back to "/".
>    - Include an external link to the official TVMaze page (`show.url`) opening in a new tab with `rel="noreferrer noopener"`.
> 4. Add clean, responsive layout styles in src/pages/ShowDetailPage.css or modular CSS.
> 5. Strict TypeScript compliance (zero 'any'). Ensure `npm run build` passes cleanly.
> 6. Update tasks.md to mark Task 6 as completed ([x]).

**16:46 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 7: Show Comparison Page.
> 
> Requirements:
> 1. Create a pure comparison utility in src/utils/compare.ts:
>    - Export helper functions to compare attributes between two shows:
>      * `compareRatings(a: Show, b: Show): { winner: 'A' | 'B' | 'tie'; diff: number }`
>      * `compareRuntime(a: Show, b: Show): { longer: 'A' | 'B' | 'tie'; diff: number }`
>      * `getSharedGenres(a: Show, b: Show): string[]`
>    - Keep all functions pure, deterministic, and typed (suitable for Vitest unit testing).
> 2. Update src/pages/ComparePage.tsx:
>    - Load the list of available shows (via fetchShows from tvmazeApi if not loaded, with loading/error handling).
>    - Render two select dropdowns allowing the user to select "Show A" and "Show B".
>    - When both shows are chosen, render a side-by-side comparison table/card view showing:
>      * Posters, Titles, and Premier dates.
>      * Rating with visual highlight for the higher-rated show.
>      * Runtime with indicator for the longer show.
>      * Overlapping / shared genres badges.
>      * Status badges.
>    - Display an instructional prompt when fewer than two shows are selected.
> 3. Add responsive styling in src/pages/ComparePage.css or modular CSS.
> 4. Strict TypeScript typing (zero 'any'). Ensure `npm run build` passes with 0 errors.
> 5. Update tasks.md to mark Task 7 as completed ([x]).

**17:06 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 8: Catalog Analytics & Stats Page.
> 
> Requirements:
> 1. Create a pure analytics utility in src/utils/stats.ts:
>    - Export pure functions to compute metrics from a Show[] catalog:
>      * `calculateAverageRating(shows: Show[]): number` (rounded to 2 decimal places, ignoring shows with null rating).
>      * `getStatusDistribution(shows: Show[]): Record<string, number>` (counts of shows per status e.g. "Running", "Ended").
>      * `getTopRatedShows(shows: Show[], limit?: number): Show[]` (returns sorted top N shows by rating descending).
>      * `getGenreDistribution(shows: Show[]): Record<string, number>` (frequency of each genre across the catalog).
>    - Ensure all functions handle edge cases (empty array, null ratings) gracefully and purely without side effects.
> 2. Build src/pages/StatsPage.tsx:
>    - Fetch shows catalog using `fetchShows` from tvmazeApi if not already in state/context, with proper loading spinner and error handling.
>    - Display key metric summary cards: Total Shows, Average Rating, and Most Common Status.
>    - Display a "Top 5 Highest Rated Shows" leaderboard table/list with rank, title, genres, and rating badges.
>    - Display a breakdown of shows by status with progress/percentage indicators.
> 3. Add responsive styling in src/pages/StatsPage.css or modular CSS.
> 4. Strict TypeScript typing (zero 'any'). Ensure `npm run build` succeeds cleanly.
> 5. Update tasks.md to mark Task 8 as completed ([x]).

**17:28 · antigravity**

> We are continuing the TVMaze Series Explorer implementation based on PRD.md and tasks.md.
> 
> Please execute Task 9: Unit Testing with Vitest.
> 
> Requirements:
> 1. Ensure Vitest test environment is configured properly (e.g. vitest.config.ts or vite.config.ts).
> 2. Create unit test suites inside src/utils/__tests__/:
>    - `filters.test.ts`: Test pure filtering functions (title search case-insensitivity, genre filtering, status filtering, reset state, and empty result handling).
>    - `stats.test.ts`: Test analytics utilities (average rating calculation, handling null ratings, empty array edge case, top rated sorting, and status distribution).
>    - `compare.test.ts`: Test comparison utilities (winner detection for higher rating, tie handling, runtime difference calculation, shared genres extraction).
> 3. Ensure at least 6-8 independent, descriptive, and passing unit tests across these suites.
> 4. Run tests and verify that `npm test` passes cleanly with 100% green tests.
> 5. Update tasks.md to mark Task 9 as completed ([x]).