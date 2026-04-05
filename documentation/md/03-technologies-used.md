# Technologies Used

## Overview

The project uses a deliberately simple stack: server-rendered static assets from Express, vanilla JavaScript in the browser, and SQLite for persistent storage. That combination keeps the codebase easy to understand while still covering authentication, CRUD operations, and role-based access.

## How to read this file (beginner tip)

For each technology below, focus on four questions:

1. **What is it?** (simple meaning)
2. **Why do we use it here?**
3. **Where is it in this codebase?** (file/folder names)
4. **Where to read more?** (links)

## General technical words (very simple meanings)

These words often confuse beginners. Here is what they mean in this project context:

- **Component**: a reusable UI part (this project does not use React components; here we use HTML pages + JS files)
- **Service**: code that “does a job” for other code (example: `apiRequest()` in `public/js/api.js` behaves like a small service for API calls)
- **Module**: a file that exports functions so other files can use them (example: route/controller files in `backend/`)
- **Extension / plugin**: something added to an editor or tool (not required by this project; optional for your own comfort, like VS Code extensions)
- **State**: data remembered by the app (here: token + user stored in browser localStorage)
- **Event**: something that happens in the browser (example: clicking a button, submitting a form)
- **Build**: converting source code into a final bundle (this project has **no build step**; it runs directly)
- **Configuration**: settings like `.env` variables or script commands in `package.json`
- **Package / dependency**: a library installed via `npm` (stored in `node_modules/`)
- **Editor**: where you read code (VS Code, etc.)
- **Workflow**: the step-by-step process (example: login → dashboard → issue book)

## Frontend

### HTML

HTML defines the structure of the application’s pages, including:

- landing page
- login and registration pages
- dashboards
- book-management pages
- student-management pages
- profile pages

Each page is a standalone document in `public/` and loads shared plus page-specific JavaScript.

Where it appears in this codebase:

- `public/*.html` (example: `public/index.html`, `public/login.html`)

Read more:

- `https://developer.mozilla.org/en-US/docs/Web/HTML`

### CSS

CSS is split by concern so the interface stays maintainable:

- `style.css` for shared visual foundations
- `auth.css` for login and registration
- `form.css` for form layout
- `dashboard.css` for summary views
- `books.css` for catalog pages
- `table.css` for tabular admin views
- `issue.css` for issue and records pages
- `profile.css` for profile presentation

Where it appears in this codebase:

- `public/css/*.css`

Read more:

- `https://developer.mozilla.org/en-US/docs/Web/CSS`

### JavaScript

Vanilla JavaScript powers all client-side interactivity. It handles:

- form submission
- API requests
- local storage
- protected page checks
- DOM rendering
- search and filter interactions
- status badges and message components

The frontend avoids a framework and instead relies on small modular files under `public/js/`.

Where it appears in this codebase:

- Shared helpers: `public/js/api.js`, `public/js/common.js`, `public/js/auth.js`
- Page scripts: `public/js/admin-dashboard.js`, `public/js/student-dashboard.js`, etc.

Read more:

- `https://developer.mozilla.org/en-US/docs/Web/JavaScript`

## Backend

### Node.js

Node.js runs the server-side JavaScript and provides the runtime for:

- Express server setup
- file-path handling
- environment configuration
- database initialization
- token generation

Where it appears in this codebase:

- App entrypoints: `server.js`, `backend/server.js`

Read more:

- `https://nodejs.org/en/docs`

### Express.js

Express structures the backend into:

- route modules
- middleware
- controllers
- static-file serving

It also handles request parsing with:

- `express.json()`
- `express.urlencoded({ extended: true })`

Where it appears in this codebase:

- Main server: `backend/server.js`
- Routes: `backend/routes/*.js`

Read more:

- `https://expressjs.com/`

### CORS

`cors` is enabled in `backend/server.js`. In the current deployment model the frontend is served from the same app, but keeping CORS enabled makes local and hosted access less brittle.

Where it appears in this codebase:

- `backend/server.js` (`app.use(cors())`)

## Data And Security

### SQLite

SQLite is the only database dependency. It works well here because:

- setup is lightweight
- data is stored in a single file
- relational constraints are still available
- it supports enough SQL for the project’s queries and joins

The default (fallback) runtime database file is `backend/database/library.db`.

Note: the actual runtime database path is controlled by `DB_PATH` (from `.env`). If `DB_PATH` is set (for example `./database/library.db`), the server will use that path instead (see `backend/config/db.js`).

Where it appears in this codebase:

- DB setup + queries: `backend/config/db.js`
- Table schema: `backend/database/schema.sql`
- Seed admin insert: `backend/database/seed.sql`

Read more:

- `https://www.sqlite.org/docs.html`

### bcryptjs

`bcryptjs` hashes passwords before they are saved. The app uses it for:

- hashing the seeded admin password
- hashing new student passwords
- comparing login attempts to stored hashes

Where it appears in this codebase:

- `backend/controllers/authController.js`
- `backend/config/db.js` (admin seed hashing)

Read more:

- `https://en.wikipedia.org/wiki/Bcrypt`

### jsonwebtoken

`jsonwebtoken` creates signed JWT tokens after successful login. Those tokens carry:

- user id
- user email
- user role

The backend then verifies the token on protected routes.

Where it appears in this codebase:

- Token generation: `backend/utils/generateToken.js`
- Token verification: `backend/middleware/authMiddleware.js`

Read more:

- `https://jwt.io/introduction`

### dotenv

`dotenv` loads environment variables such as:

- `PORT`
- `JWT_SECRET`
- `DB_PATH`

Where it appears in this codebase:

- `backend/server.js` (`dotenv.config()`)
- `.env` and `.env.example` (root)

Read more:

- `https://github.com/motdotla/dotenv`

## Development Tooling

### npm

`npm` is used for dependency management and scripts.

Where it appears in this codebase:

- `package.json` (scripts + dependencies)
- `package-lock.json` (exact versions)

### nodemon

`nodemon` is used in development through:

```bash
npm run dev
```

It restarts the server automatically when backend files change.

## Why This Stack Fits The Project

The stack is appropriate because it supports:

- a clear frontend-backend split
- easy local setup
- a small deployment footprint
- enough complexity to demonstrate authentication, authorization, CRUD, and relational data handling
- maintainable code without heavy framework overhead

---

## What to read next

Next file: **Folder structure** → [`04-folder-structure.md`](04-folder-structure.md)
