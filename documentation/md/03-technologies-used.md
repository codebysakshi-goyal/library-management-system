# Technologies Used

## Overview

The project uses a deliberately simple stack: server-rendered static assets from Express, vanilla JavaScript in the browser, and SQLite for persistent storage. That combination keeps the codebase easy to understand while still covering authentication, CRUD operations, and role-based access.

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

## Backend

### Node.js

Node.js runs the server-side JavaScript and provides the runtime for:

- Express server setup
- file-path handling
- environment configuration
- database initialization
- token generation

### Express.js

Express structures the backend into:

- route modules
- middleware
- controllers
- static-file serving

It also handles request parsing with:

- `express.json()`
- `express.urlencoded({ extended: true })`

### CORS

`cors` is enabled in `backend/server.js`. In the current deployment model the frontend is served from the same app, but keeping CORS enabled makes local and hosted access less brittle.

## Data And Security

### SQLite

SQLite is the only database dependency. It works well here because:

- setup is lightweight
- data is stored in a single file
- relational constraints are still available
- it supports enough SQL for the project’s queries and joins

The default runtime database file is `backend/database/library.db`.

### bcryptjs

`bcryptjs` hashes passwords before they are saved. The app uses it for:

- hashing the seeded admin password
- hashing new student passwords
- comparing login attempts to stored hashes

### jsonwebtoken

`jsonwebtoken` creates signed JWT tokens after successful login. Those tokens carry:

- user id
- user email
- user role

The backend then verifies the token on protected routes.

### dotenv

`dotenv` loads environment variables such as:

- `PORT`
- `JWT_SECRET`
- `DB_PATH`

## Development Tooling

### npm

`npm` is used for dependency management and scripts.

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
