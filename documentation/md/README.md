# Documentation Index (Start Here)

This folder contains **beginner-friendly learning documentation** for the **current running codebase** of the “Campus Library Management System”.

If you have **zero programming knowledge**, read these files in order. The writing is meant to feel like a senior is explaining the project step by step.

## Before You Start (very small glossary)

- **Frontend**: the pages you see in the browser (HTML/CSS + browser JavaScript in `public/`)
- **Backend**: the server that runs on the computer and provides APIs (Node.js + Express in `backend/`)
- **Database**: where data is stored permanently (SQLite `.db` file)
- **API**: a URL like `/api/books` that returns data to the frontend
- **Login token (JWT)**: a “digital ID card” the server gives after login; the browser sends it on future requests

## Recommended Reading Order

1. `01-project-overview.md`
2. `02-features-and-user-flow.md`
3. `03-technologies-used.md`
4. `04-folder-structure.md`
5. `05-backend-explanation.md`
6. `06-frontend-explanation.md`
7. `07-database-and-api.md`
8. `08-complete-working-flow.md`
9. `09-viva-preparation.md`
10. `10-deployment-guide.md`

## Beginner learning path (what to do while reading)

If you are starting from zero:

1. Read `01-project-overview.md` once (just to get the story).
2. Read `02-features-and-user-flow.md` and try to “visualize the screens”.
3. Open the `public/` folder and match page names (`*.html`) with the docs.
4. Then read `04-folder-structure.md` and locate each folder physically.
5. Only after that, read backend/database details (`05`, `07`, `08`).

## What You Will Learn

After reading the full set, a reader should understand:

- what problem the project solves
- how admin and student flows work
- how the frontend and backend are organized
- how authentication and authorization are enforced
- how books, students, and issue records are stored
- how the API surface maps to the UI
- how the app starts, serves files, and initializes the database
- how the project is deployed and monitored

## Current Architecture Reference

- Root `server.js` is the repository entrypoint.
- `backend/server.js` hosts the Express application.
- `public/` contains the active frontend assets and pages.
- The runtime database path is controlled by `DB_PATH` (from `.env`). If `DB_PATH` is not set, the code falls back to `backend/database/library.db` (see `backend/config/db.js`).
- `documentation/pdf/` stores PDF exports generated from these markdown files.
