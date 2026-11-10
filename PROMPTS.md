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
