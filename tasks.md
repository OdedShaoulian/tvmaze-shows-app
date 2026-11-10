# Tasks & Implementation Plan

- [ ] **Task 1: TypeScript Interfaces**
  - Define complete TypeScript types and interfaces in `src/types/show.ts` (Show, Rating, Image, FilterState) with zero `any`.
  - *Done when:* `src/types/show.ts` exports all required interfaces and `npm run build` succeeds.

- [ ] **Task 2: App Layout & React Router Setup**
  - Configure `BrowserRouter`, define routes (`/`, `/shows/:id`, `/compare`, `/stats`, `*`), and implement a responsive `Navbar` component using `NavLink`.
  - *Done when:* Clicking navigation links changes the URL and renders dedicated placeholder page views.

- [ ] **Task 3: Mock Data & Master List Component**
  - Create `src/data/mockShows.json` with 4 sample shows. Build `ShowsPage` and `ShowCard` rendering the list with unique `key` props.
  - *Done when:* Mock shows display correctly on the home view as responsive cards.

- [ ] **Task 4: API Integration with Loading & Error States**
  - Replace mock data fetching in `ShowsPage` with an actual `fetch` to `https://api.tvmaze.com/shows` inside `useEffect`. Handle loading spinner and error alert.
  - *Done when:* Shows load live from TVMaze API, showing a loading indicator during fetch and an error banner on network failure.

- [ ] **Task 5: Search & Genre Filtering**
  - Implement pure filtering functions in `src/utils/filters.ts` and a `FilterBar` component. Connect inputs to state in `ShowsPage`.
  - *Done when:* Typing a show name or choosing a genre filters the cards instantly.

- [ ] **Task 6: Dynamic Show Detail Page**
  - Build `ShowDetailPage` utilizing `useParams` to extract the show ID and fetching single show data from `https://api.tvmaze.com/shows/:id`.
  - *Done when:* Clicking any card routes to `/shows/:id` and renders full metadata and summary.

- [ ] **Task 7: Show Comparison Page**
  - Implement `ComparePage` with selectors for two shows and comparison logic in `src/utils/compare.ts`.
  - *Done when:* Selecting two shows renders a comparison table of their attributes.

- [ ] **Task 8: Catalog Analytics & Stats Page**
  - Build pure aggregation functions in `src/utils/stats.ts` and build `StatsPage` to display average rating, top 5 shows, and status breakdown.
  - *Done when:* The `/stats` page accurately computes and renders summary insights from the loaded shows.

- [ ] **Task 9: Unit Testing with Vitest**
  - Implement at least 5 unit tests in `src/utils/__tests__/` covering filtering, sorting, rating calculation, and data aggregation.
  - *Done when:* Running `npm test` executes and passes all unit tests cleanly.

- [ ] **Task 10: Responsive Styling & Polish**
  - Apply custom responsive CSS styling for mobile and desktop viewports, add status badges, and refine typography.
  - *Done when:* The UI scales cleanly down to mobile width (375px) without console errors.

- [ ] **Task 11: Documentation & Final Verification**
  - Update `README.md` with project description, API reference, run instructions, and ensure `npm run build` passes with 0 errors.
  - *Done when:* `npm run build` and `npm test` both succeed and repository documents are complete.