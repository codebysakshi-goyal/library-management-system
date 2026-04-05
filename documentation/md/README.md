# Documentation Index

This folder contains project-learning documentation for the current codebase. The files are written to explain the real repository structure, runtime flow, APIs, database design, and deployment setup used by the application.

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
- `backend/database/library.db` is the default runtime database file.
- `documentation/pdf/` stores PDF exports generated from these markdown files.

`codex-plan/` is intentionally outside the documentation scope because it is only used for AI development context.
