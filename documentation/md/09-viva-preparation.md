# Viva Preparation

## How To Use This File

This file is intentionally kept for oral-exam preparation and project presentation. Unlike the README and report, this section is allowed to be more presentation-oriented because it lives in the private learning documentation.

## Short Project Summary

Campus Library Management System is a full-stack web application for a college library. It supports admin and student roles, manages books and borrowing records, uses Express for the backend, serves a static frontend from `public/`, and stores persistent data in SQLite.

## Key Points To Remember

- The root entrypoint is `server.js`.
- The main Express app is `backend/server.js`.
- The active frontend is `public/`.
- The default runtime database file is `backend/database/library.db`.
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

### How does book issue work?

Admin submits a student, a book, and a due date. The backend validates the request, inserts a row into `issue_records`, and decrements `available_copies` for that book.

### How does return work?

Admin triggers `PUT /api/issues/:id/return`. The backend marks the issue as returned, stores `return_date`, and increments the book’s available copies.

### Where is the database stored?

By default in `backend/database/library.db`.

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
- default database location
- health-check URL
