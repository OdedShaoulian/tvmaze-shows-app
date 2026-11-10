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