# Viva Preparation

## How To Use This File

This file is intentionally kept for oral-exam preparation and project presentation. Unlike the README and report, this section is allowed to be more presentation-oriented because it lives in the private learning documentation.

## 2-minute demo plan (what to show on screen)

If you need to demonstrate quickly:

1. Open `http://localhost:5000`
2. Show `login.html` (admin login)
3. After login, show `admin-dashboard.html`
4. Open `admin-books.html` and show book list + search
5. Open `issue-book.html` and show issuing a book
6. Open `issued-records.html` and show return button
7. Logout and login as a student
8. Show `student-dashboard.html` and `my-issued-books.html`

## Short Project Summary

Campus Library Management System is a full-stack web application for a college library. It supports admin and student roles, manages books and borrowing records, uses Express for the backend, serves a static frontend from `public/`, and stores persistent data in SQLite.

## Key Points To Remember

- The root entrypoint is `server.js`.
- The main Express app is `backend/server.js`.
- The active frontend is `public/`.
- The runtime database file is controlled by `DB_PATH` (from `.env`). If `DB_PATH` is not set, the code falls back to `backend/database/library.db`.
- Authentication uses JWT.
- Passwords are hashed with bcryptjs.
- Admin users manage books, students, and issue-return operations.
- Student users register, browse books, review issued books, and update profile details.
- The health endpoint is `GET /api/health`.

## Common Questions And Direct Answers

### What problem does the project solve?

It replaces manual tracking of books, students, and issue-return records with a browser-based system backed by a relational database.

### Why are there two roles?

Because library staff and students need different permissions. Admins manage records; students only access their own account and borrowing information.

### How does login work?

The frontend sends credentials to `POST /api/auth/login`, the backend verifies them, signs a JWT, returns the token and user, and the browser stores them in local storage.

### How are protected routes secured?

The backend uses `authMiddleware` to verify the JWT and `roleMiddleware` to enforce role restrictions.

### What is the “route → controller” idea?

- A **route** is the URL mapping (example: `/api/books`).
- A **controller** is the function that runs for that URL (example: `getBooks` in `backend/controllers/bookController.js`).

This separation is visible in:

- `backend/routes/*.js`
- `backend/controllers/*.js`

### Why are passwords not stored directly?

The code hashes passwords using `bcryptjs`, so the database stores a hash, not the real password.  
Files:

- `backend/controllers/authController.js`
- `backend/config/db.js` (admin seed hashing)

### How does book issue work?

Admin submits a student, a book, and a due date. The backend validates the request, inserts a row into `issue_records`, and decrements `available_copies` for that book.

### How does return work?

Admin triggers `PUT /api/issues/:id/return`. The backend marks the issue as returned, stores `return_date`, and increments the book’s available copies.

### Where is the database stored?

It depends on `DB_PATH` (from `.env`). If `DB_PATH` is not set, the backend uses `backend/database/library.db` (see `backend/config/db.js`).

### What is the health-check endpoint?

`GET /api/health`

## Architecture Line

If you need one compact technical line, use this:

> The application follows a route -> middleware -> controller -> database -> response pattern, with Express serving the static frontend from `public/`.

## Revision Checklist

Before presenting the project, make sure you can explain:

- the cleaned folder structure
- the role of `server.js` and `backend/server.js`
- the `users`, `books`, and `issue_records` tables
- login flow
- issue and return flow
- role-based access control
- database location (`DB_PATH`)
- health-check URL

## Common mistakes (avoid these in viva)

- Saying “React” or “TypeScript”: this project uses **plain HTML/CSS/JavaScript** (vanilla JS).
- Forgetting role logic: admin and student permissions are enforced by backend middleware.
- Confusing the two `server.js` files:
  - `server.js` (root) is the entrypoint that loads `backend/server.js`
  - `backend/server.js` is the real Express server

---

## What to read next

Next file: **Deployment guide** → [`10-deployment-guide.md`](10-deployment-guide.md)
