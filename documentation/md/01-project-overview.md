# Project Overview

## Who this is for

This document is written for a **BCA student** who has **zero programming knowledge** and wants to understand this project confidently for a viva.

If you ever feel “this looks too technical”, don’t worry. Read slowly and keep going — the same words repeat again and again in this codebase.

## The story in one minute

Imagine a real college library:

- Students ask: “Is this book available?”
- The librarian/admin asks: “Who has this book? When is it due? Is it overdue?”
- If everything is written in registers, it becomes slow and error‑prone.

So we built a small website where:

- **Admin** manages books, students, and issue/return records.
- **Student** registers, logs in, browses books, and sees their own issued books.

This project is called **Campus Library Management System**.

## Tiny glossary (very important words)

- **Frontend**: what you see in the browser (`public/` folder)
- **Backend**: server code that provides data and rules (`backend/` folder)
- **Database**: where data is stored permanently (SQLite `.db` file)
- **API**: URLs starting with `/api/...` used by the frontend to get/save data
- **JWT token**: a “digital ID card” given after login; the browser sends it in requests

## Purpose

Campus Library Management System is a web application for handling routine college-library operations in a structured digital workflow. The application replaces manual register-based processes with authenticated pages and API-backed records for books, students, issue activity, and returns.

## Problem It Solves

Traditional library operations are often handled through paper registers, spreadsheets, or informal logs. That approach creates predictable problems:

- slow search and verification of records
- inconsistent tracking of available books
- duplicated or missing entries
- delayed issue and return updates
- difficulty monitoring overdue books
- limited visibility for students into their own records

This project solves those issues by centralizing records in a SQLite database and exposing role-based functionality through a browser interface.

## User Roles

The application supports two roles:

### Admin

Admin users manage the library itself. They can:

- log in with the seeded admin account
- view the admin dashboard
- add, update, and delete books
- list students and inspect student history
- issue books to students
- mark books as returned
- review issued-record history

### Student

Student users manage only their own account and borrowing activity. They can:

- register through the public registration page
- log in with their own credentials
- access the student dashboard
- browse and search books
- open detailed book pages
- review their own issue history
- update profile information

## Architecture Summary

The application uses a straightforward multi-page full-stack architecture:

1. The root `server.js` file starts the application by loading `backend/server.js`.
2. `backend/server.js` creates the Express app, enables middleware, initializes the database, and serves `public/`.
3. The frontend pages in `public/` use vanilla JavaScript to call `/api/...` endpoints.
4. The backend routes map requests to controllers.
5. Controllers validate data, apply business rules, run SQLite queries, and return JSON.

### A simple block diagram (how it works)

```text
Browser (HTML/CSS/JS in public/)
   |
   | fetch() calls like /api/books
   v
Express Server (backend/server.js)
   |
   | SQL queries
   v
SQLite Database (DB_PATH / a .db file)
```

## Current Runtime Paths

- Entrypoint: `server.js`
- Main Express app: `backend/server.js`
- Active frontend: `public/`
- Runtime database file: controlled by `DB_PATH` (from `.env`). If `DB_PATH` is not set, the code falls back to `backend/database/library.db` (see `backend/config/db.js`).
- Schema file: `backend/database/schema.sql`
- Seed file: `backend/database/seed.sql`

## Core Domain Areas

The project is organized around four main domains:

- authentication
- books
- users
- issue records

Those domains appear consistently across routes, controllers, UI pages, and data tables.

## Main Outcomes

By design, the system provides:

- central storage of student and book records
- predictable role-based access
- searchable book availability
- issue and return tracking
- visibility into overdue books
- a deployable web interface for demonstration and practical use

## Short Technical Summary

This is a Node.js and Express application with a static multi-page frontend and a SQLite database. Authentication uses JWT, passwords are hashed with bcryptjs, and the backend enforces role-based access for admin and student users.

---

## What to read next

Next file: **Features and user flow** → [`02-features-and-user-flow.md`](02-features-and-user-flow.md)
