# Backend Explanation

## What “backend” means (in very simple words)

The backend is the part of the project that runs on the server (your laptop or a cloud server).

Its main jobs are:

1. Serve the frontend files (`public/`) to the browser
2. Provide APIs like `/api/books` so the frontend can read/save data
3. Enforce rules like “only admin can add books”
4. Talk to the SQLite database

If the frontend is the “face” of the application, the backend is the “brain”.

## Backend Responsibilities

The backend is responsible for:

- starting the HTTP server
- serving the static frontend
- authenticating users
- authorizing role-based actions
- validating incoming data
- querying and updating SQLite
- returning JSON responses

## Startup Flow

The backend starts through two files:

### Root `server.js`

The root file contains:

```javascript
require("./backend/server");
```

Its only job is to make the repository root the application entrypoint.

### `backend/server.js`

`backend/server.js` is the real server file. It:

- imports `path`, `express`, `cors`, and `dotenv`
- imports `initializeDatabase` from `backend/config/db.js`
- registers route groups
- serves `public/`
- exposes the health endpoint at `GET /api/health`
- starts listening only after the database initializes

### Request flow diagram (route → middleware → controller)

When the frontend calls an API, the backend typically follows this path:

```text
Frontend (fetch /api/...)
  -> Route file (backend/routes/*.js)
     -> Middleware (backend/middleware/*.js)
        -> Controller (backend/controllers/*.js)
           -> DB helpers (backend/config/db.js)
              -> SQLite file
  <- JSON response back to frontend
```

## Middleware Layer

The Express app applies:

- `cors()`
- `express.json()`
- `express.urlencoded({ extended: true })`
- `express.static(staticPath)`

This combination covers:

- cross-origin tolerance
- JSON request parsing
- form-style body parsing
- static HTML/CSS/JS delivery

## Route Groups

The app exposes four route groups.

### `/api/auth`

Defined in `backend/routes/authRoutes.js`:

- `POST /register`
- `POST /login`
- `GET /me`

### `/api/books`

Defined in `backend/routes/bookRoutes.js`:

- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

All book routes require authentication. Mutating routes additionally require the `admin` role.

### `/api/users`

Defined in `backend/routes/userRoutes.js`:

- `GET /students`
- `GET /students/:id`
- `PUT /profile`
- `DELETE /students/:id`

Admin users can inspect and delete students. Student users can update their own profile.

### `/api/issues`

Defined in `backend/routes/issueRoutes.js`:

- `POST /`
- `GET /`
- `GET /my`
- `PUT /:id/return`

Admin users manage issue creation and returns. Student users can read only their own issue history through `/my`.

## Authentication Flow

Authentication is split across three backend parts:

### `authController.js`

This controller handles:

- student registration
- login
- current-user response

Important behavior:

- registration requires all student fields
- passwords must be at least six characters
- email and roll number uniqueness are enforced
- login compares the provided password with the bcrypt hash
- successful login returns a signed JWT and a trimmed user object

### `generateToken.js`

This utility signs a JWT containing:

- user id
- email
- role

### `authMiddleware.js`

This middleware:

- reads the `Authorization` header
- extracts the bearer token
- verifies the token
- loads the current user record
- attaches the user to `request.user`

## Authorization Flow

`roleMiddleware.js` enforces role restrictions after authentication succeeds.

Examples:

- only admins can add, update, or delete books
- only admins can create and return issues
- only students can update the profile endpoint

## Controller Responsibilities

### `bookController.js`

Main responsibilities:

- list books
- filter by search and category
- return a single book
- create books
- update books
- delete books

Important rules:

- status is derived from `available_copies`
- ISBN must be unique
- total copies must remain at least `1`
- total copies cannot be reduced below the number already issued
- active issued books block deletion

### `userController.js`

Main responsibilities:

- list students
- return student details with issue history
- update the logged-in student profile
- delete student accounts

Important rules:

- only student accounts are returned by the student list
- deleting a student is blocked if active issued books exist

### `issueController.js`

Main responsibilities:

- create issue records
- list all issue records for admins
- list current student issue history
- return issued books
- calculate overdue state

Important rules:

- due date cannot be earlier than the current date
- selected student and book must exist
- the book must have available copies
- the same student cannot hold the same book twice as an active issue
- issuing a book decrements `available_copies`
- returning a book increments `available_copies`
- overdue is true when `status === "issued"` and `due_date` is in the past

Note from the codebase:

- `backend/controllers/issueController.js` also contains `getDashboardSummary`, but it is **not currently connected to any route** in `backend/routes/issueRoutes.js`. The admin dashboard builds its summary by calling `/api/books`, `/api/users/students`, and `/api/issues` and calculating totals in the browser (`public/js/admin-dashboard.js`).

## Database Layer

`backend/config/db.js` wraps SQLite with promise-friendly helpers:

- `run(query, params)`
- `get(query, params)`
- `all(query, params)`
- `exec(sql)`

It also performs startup work:

- chooses the database file from `DB_PATH` or defaults to `backend/database/library.db` (so your `.env` matters)
- creates the database directory if needed
- opens the SQLite connection
- initializes tables from `schema.sql`
- seeds the admin record from `seed.sql`
- inserts sample students, books, and issue records if missing

Beginner note:

- In this repository, `.env` sets `DB_PATH=./database/library.db`, so the app will create/use a root `database/` folder when you run locally.

## Response Style

Most backend responses follow a consistent JSON shape:

- `success`
- `message` when needed
- domain-specific payload fields such as `user`, `books`, `students`, or `issues`

This keeps the frontend helpers straightforward and predictable.

## Health Endpoint

The backend exposes:

```text
GET /api/health
```

The response is:

```json
{
  "success": true,
  "message": "Server is running"
}
```

This endpoint is useful for deployment health checks and quick operational verification.

---

## What to read next

Next file: **Frontend explanation** → [`06-frontend-explanation.md`](06-frontend-explanation.md)
