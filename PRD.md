# Product Requirements Document (PRD) · TVMaze Series Explorer

## 1. Overview & Target Audience
TVMaze Series Explorer היא אפליקציית Front-End מבוססת React + TypeScript המאפשרת לחובבי טלוויזיה לגלות, לחקור ולהשוות סדרות טלוויזיה פופולריות.
האפליקציה מושכת נתונים ישירות מה-API הציבורי של TVMaze (`https://api.tvmaze.com/shows`), ללא שרת חיצוני וללא צורך במפתח גישה.

## 2. Core Pages & Routing
האפליקציה כוללת ניתוב מלא באמצעות React Router:
- `/` – **Shows Catalog (Master):** רשימת סדרות מלאה עם פוסטרים, דירוג, שורת חיפוש חופשי וסינון לפי ז'אנרים ומצבי שידור.
- `/shows/:id` – **Show Details (Detail):** עמוד פרטים מורחב על סדרה ספציפית (תקציר, שפת מקור, ימי שידור, זמן פרק, ודירוג מלא).
- `/compare` – **Show Comparison (Additional Page 1):** השוואה אינטראקטיבית בין שתי סדרות נבחרות זה לצד זה (דירוג, ז'אנרים, שנת בכורה וזמן פרק).
- `/stats` – **Analytics & Insights (Additional Page 2):** דשבורד סטטיסטיקות המציג מדדים מחושבים: דירוג ממוצע, התפלגות סטטוס (משודר/הסתיים), ו-Top 5 הסדרות המדורגות ביותר.
- `*` – **404 Page Not Found:** עמוד שגיאה נקי לניתובים לא קיימים.

## 3. User Stories (When I..., I see...)
- **When I** open the home page, **I see** a grid of popular TV shows with their posters, ratings, and genre tags, with loading indicators while fetching.
- **When I** type a title in the search bar or select a genre from the filter dropdown, **I see** the shows list update in real time to display only matching series.
- **When I** click on a show card, **I am navigated** to `/shows/:id` and **I see** the complete show summary, network, status, and premier year.
- **When I** visit the Compare page and pick two shows, **I see** a side-by-side breakdown highlighting differences in rating, runtime, and genres.
- **When I** visit the Stats page, **I see** calculated metrics and aggregated data summarizing the current catalog.

## 4. Technical Constraints
- Pure Front-End with React 19, Vite, and TypeScript.
- Zero usage of `any` types. Full type safety with dedicated interfaces.
- Testing: Pure utility logic tested with Vitest (at least 5 passing tests).
- Responsive layout with custom CSS (mobile-friendly).