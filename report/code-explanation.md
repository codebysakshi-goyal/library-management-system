# CODE EXPLANATION

## System Overview

The application uses a full-stack structure with a static multi-page frontend and an Express backend. The runtime path is intentionally simple:

```text
server.js
  -> backend/server.js
     -> serves public/
     -> exposes /api routes
     -> initializes backend/database/library.db
```

## Entrypoint Files

### `server.js`

This file exists so the app can start from the repository root:

```javascript
require("./backend/server");
```

### `backend/server.js`

This file creates the main Express application. It:

- loads environment variables
- enables JSON and URL-encoded body parsing
- enables CORS
- serves static files from `public/`
- registers auth, books, users, and issues routes
- exposes `GET /api/health`
- starts listening after database initialization succeeds

## Backend Layers

## Routes

Routes define the external API structure.

### `backend/routes/authRoutes.js`

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### `backend/routes/bookRoutes.js`

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

### `backend/routes/userRoutes.js`

- `GET /api/users/students`
- `GET /api/users/students/:id`
- `PUT /api/users/profile`
- `DELETE /api/users/students/:id`

### `backend/routes/issueRoutes.js`

- `POST /api/issues`
- `GET /api/issues`
- `GET /api/issues/my`
- `PUT /api/issues/:id/return`

## Middleware

### `backend/middleware/authMiddleware.js`

This middleware:

- reads the bearer token
- verifies the JWT
- loads the current user from the database
- stores the user object on `request.user`

### `backend/middleware/roleMiddleware.js`

This middleware limits route access by role. It is used to protect admin-only and student-only operations.

## Controllers

### `backend/controllers/authController.js`

Main responsibilities:

- register new students
- authenticate users
- return the current logged-in user

Important logic:

- validates required fields
- enforces minimum password length
- prevents duplicate email or roll number registration
- hashes passwords with bcryptjs
- returns a JWT token on successful login

### `backend/controllers/bookController.js`

Main responsibilities:

- list books
- search and filter books
- return one book
- create books
- update books
- delete books

Important logic:

- computes a `status` field from `available_copies`
- ensures ISBN uniqueness
- keeps `available_copies` aligned with `total_copies`
- prevents deletion while a book is actively issued

### `backend/controllers/userController.js`

Main responsibilities:

- list student accounts
- return one student with issue history
- update a student profile
- delete a student when safe

Important logic:

- only student accounts are returned by student-list queries
- student deletion is blocked when active issues exist

### `backend/controllers/issueController.js`

Main responsibilities:

- issue books
- list all issue records for admins
- list current student issues
- return issued books
- add overdue state to responses

Important logic:

- prevents issue creation with invalid student, invalid book, no copies, or past due date
- prevents duplicate active issue of the same book for the same student
- decrements available copies on issue
- increments available copies on return
- computes overdue when an active issue has passed its due date

## Data Layer

### `backend/config/db.js`

This module manages SQLite startup and helper functions.

It is responsible for:

- selecting the database path from `DB_PATH` or defaulting to `backend/database/library.db`
- creating the database directory
- opening the SQLite connection
- exposing promise-based query helpers
- running schema setup
- seeding the admin user
- inserting sample students, books, and issue records when needed

### `backend/database/schema.sql`

Defines three tables:

- `users`
- `books`
- `issue_records`

### `backend/database/seed.sql`

Seeds the default admin account:

- email: `admin@library.com`
- password: generated hash of `admin123`

## Frontend Structure

The active frontend lives in `public/`.

### Shared Files

- `public/js/api.js`: token storage and fetch wrapper
- `public/js/common.js`: UI helpers, auth guards, navbar/footer rendering
- `public/js/auth.js`: login and registration flows

### Admin Pages

- dashboard
- books management
- add/edit book
- students list
- student details
- issue book
- issued records

### Student Pages

- student dashboard
- books catalog
- book details
- my issued books
- profile

Each page loads its own JavaScript file and communicates with the backend through `/api/...`.

## Health Check

The health endpoint is:

```text
GET /api/health
```

Live URL:

```text
https://library-management-system-n79m.onrender.com/api/health
```

This route returns a small JSON response confirming that the server is running.

## Folder-Structure Notes

The repository previously contained duplicate frontend and backend trees from an older layout. Those copies were removed so the remaining structure now matches the actual deployed application:

- `backend/` contains the active server code
- `public/` contains the active frontend
- `backend/database/` contains the active SQLite files
- `documentation/` contains learning material
- `report/` contains submission material

`codex-plan/` is intentionally ignored in report-level architecture because it is only used for AI development context.
