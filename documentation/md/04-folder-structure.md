# Folder Structure

## How to use this file (beginner-friendly)

When you open a project folder for the first time, it feels like “too many files”.

So think like this:

- You are looking for **start points** (entry files)
- You are looking for **main areas** (frontend, backend, database)
- You are looking for **connections** (which file calls which file)

This file is your “map”.

## Repository Layout

The current repository has been simplified so the running application is represented directly by the folder structure.

```text
library-managment-system/
|-- backend/
|   |-- config/
|   |   `-- db.js
|   |-- controllers/
|   |   |-- authController.js
|   |   |-- bookController.js
|   |   |-- issueController.js
|   |   `-- userController.js
|   |-- database/
|   |   |-- library.db
|   |   |-- schema.sql
|   |   `-- seed.sql
|   |-- middleware/
|   |   |-- authMiddleware.js
|   |   `-- roleMiddleware.js
|   |-- routes/
|   |   |-- authRoutes.js
|   |   |-- bookRoutes.js
|   |   |-- issueRoutes.js
|   |   `-- userRoutes.js
|   |-- utils/
|   |   `-- generateToken.js
|   `-- server.js
|-- documentation/
|   |-- md/
|   `-- pdf/
|-- public/
|   |-- assets/
|   |-- css/
|   |-- js/
|   `-- *.html
|-- report/
|   |-- code-explanation.md
|   |-- report.md
|   `-- screenshots/
|-- node_modules/
|-- package-lock.json
|-- package.json
`-- server.js
```

## Root Files

### `server.js`

The root server file is a very small entrypoint:

- it exists so the project can be started from the repository root
- it simply loads `backend/server.js`

If someone asks in viva: **“Where does your project start?”**  
Answer: **`server.js` starts the backend by loading `backend/server.js`.**

### `package.json`

The root package manifest is the active project package file. It defines:

- dependencies
- development dependencies
- `npm start`
- `npm run dev`

### `package-lock.json`

This file locks dependency versions for consistent installs.

### `.env` and `.env.example`

These files store environment variables (configuration), like:

- `PORT` (server port)
- `JWT_SECRET` (secret for login tokens)
- `DB_PATH` (where the SQLite `.db` file is stored/created)

If you run the project and `DB_PATH` points to `./database/library.db`, you may see a new folder appear:

- `database/` (created automatically to store the SQLite file)

## `backend/`

`backend/` contains all server-side logic.

### `backend/server.js`

This is the main Express application file. It:

- loads environment variables
- creates the Express app
- enables middleware
- serves `public/`
- registers API routes
- exposes `/api/health`
- initializes the database before listening

### `backend/config/`

This folder contains configuration modules.

- `db.js` creates the SQLite connection and exports promise-based helpers such as `run`, `get`, `all`, and `exec`

### `backend/controllers/`

Controllers implement request handling and business rules.

- `authController.js` handles registration, login, and current-user lookup
- `bookController.js` handles catalog listing, creation, update, and deletion
- `userController.js` handles student listing, student details, profile updates, and student deletion
- `issueController.js` handles issue creation, issue listing, student issue history, returns, and overdue calculation

### `backend/routes/`

Routes connect URLs to controller functions.

- `authRoutes.js`
- `bookRoutes.js`
- `userRoutes.js`
- `issueRoutes.js`

### `backend/middleware/`

Middleware applies cross-cutting checks before controllers run.

- `authMiddleware.js` verifies JWTs and loads `request.user`
- `roleMiddleware.js` restricts actions to the required role

### `backend/utils/`

Utility code lives here.

- `generateToken.js` signs JWTs for authenticated users

### `backend/database/`

This folder contains the data layer files used by the app.

- `library.db`: a database file present in the repo (the actual runtime DB location is controlled by `DB_PATH` in `.env`)
- `schema.sql`: table definitions
- `seed.sql`: initial admin seed statement

## `public/`

`public/` contains the frontend that Express serves directly.

### `public/*.html`

These are the page entrypoints:

- `index.html`
- `login.html`
- `register.html`
- `admin-dashboard.html`
- `admin-books.html`
- `add-book.html`
- `edit-book.html`
- `students.html`
- `student-details.html`
- `issue-book.html`
- `issued-records.html`
- `student-dashboard.html`
- `student-books.html`
- `book-details.html`
- `my-issued-books.html`
- `profile.html`
- `unauthorized.html`
- `not-found.html`

### `public/js/`

This folder contains browser-side logic, including:

- shared helpers (`api.js`, `common.js`, `auth.js`)
- admin page scripts
- student page scripts

### `public/css/`

This folder contains page and component styling for the app.

### `public/assets/`

This folder stores static assets such as the project logo.

## `documentation/`

This folder exists for project-learning material.

- `documentation/md/` stores the source markdown
- `documentation/pdf/` stores PDF exports generated from the markdown

## `report/`

This folder holds submission-oriented project material.

- `report.md` is the main project report
- `code-explanation.md` documents code structure and implementation details
- `screenshots/` stores screenshots referenced by the report

## `node_modules/`

This folder is created by `npm install`. It contains downloaded libraries (dependencies).  
For learning and viva, you normally **do not read or edit** anything inside `node_modules/`.

## Folder-Structure Rationale

The structure is intentionally simple:

- root files start the app
- backend files process requests and enforce rules
- public files render the interface
- documentation teaches the project
- report files support submission material

Because duplicate source trees were removed, the repository now maps much more directly to the actual runtime behavior of the application.

---

## What to read next

Next file: **Backend explanation** → [`05-backend-explanation.md`](05-backend-explanation.md)
