# LIBRARY MANAGEMENT SYSTEM

**Submitted By:** Sakshi Goyal  
**Roll No.:** 1076/23  
**Course:** Bachelor of Computer Applications  
**College:** Post Graduate Government College for Girls, Sector-11, Chandigarh  
**University:** Panjab University, Chandigarh  
**Session:** 2024-2025  
**Project Guide:** Lt. Harpreet Kaur  
**Deployment Platform:** Render  
**Live Website URL:** `https://library-management-system-n79m.onrender.com`  
**Health Check URL:** `https://library-management-system-n79m.onrender.com/api/health`

---

# SYNOPSIS

The Library Management System is a full-stack web application designed to digitize routine library operations such as student registration, book management, book issue, return processing, and profile maintenance. The application separates admin and student responsibilities through role-based access and stores records in a SQLite database.

The system is implemented with a static frontend served by Express and a backend organized into routes, controllers, middleware, utilities, and a database layer. The current repository layout has been cleaned so that the folder structure directly reflects the real runtime architecture used by the application.

---

# INTRODUCTION

Libraries depend on accurate record keeping for books, users, and borrowing history. Manual workflows make it difficult to search records, verify availability, and track due dates consistently. This project replaces those manual steps with a browser-based system backed by persistent relational storage.

The application supports two roles:

- admin: manages books, students, and issue-return operations
- student: registers, logs in, browses books, reviews borrowed items, and updates profile information

---

# OBJECTIVES

- digitize core library operations
- reduce duplicate or inconsistent record keeping
- maintain accurate book availability
- enforce controlled access for admin and student users
- provide searchable catalog and borrowing history views
- support straightforward deployment and health monitoring

---

# TECHNOLOGY STACK

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: SQLite
- Authentication: JWT
- Password Security: bcryptjs
- Configuration: dotenv
- Development Utility: nodemon

---

# SYSTEM REQUIREMENTS

## Hardware

- 4 GB RAM or higher
- standard processor and storage suitable for Node.js development

## Software

- Node.js
- npm
- modern browser
- operating system such as Windows, Linux, or macOS

---

# CURRENT ARCHITECTURE

## Runtime Flow

1. Root `server.js` starts the application.
2. `backend/server.js` creates and configures the Express app.
3. The backend initializes the SQLite database.
4. Express serves the frontend files from `public/`.
5. Frontend JavaScript sends requests to `/api/...`.
6. Routes, middleware, and controllers process those requests.
7. Data is stored and retrieved through `backend/database/library.db`.

## Health Check API

- Local path: `GET /api/health`
- Live URL: `https://library-management-system-n79m.onrender.com/api/health`

Expected response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

---

# MAIN MODULES

## Authentication Module

- student registration
- login for admin and student
- JWT-based protected access
- current user lookup

## Book Management Module

- create book records
- search and category filtering
- update book details
- delete books when no active issue exists

## Student Management Module

- list all students
- inspect an individual student
- review student issue history
- delete student records when safe

## Issue Management Module

- issue books to students
- track due dates
- return books
- flag overdue active issues

## Profile Module

- student profile updates
- admin profile view

---

# FOLDER STRUCTURE

## Updated Repository Structure

```text
library-managment-system/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── database/
│   ├── middleware/
│   ├── routes/
│   ├── utils/
│   └── server.js
├── documentation/
│   ├── md/
│   └── pdf/
├── public/
│   ├── assets/
│   ├── css/
│   ├── js/
│   └── *.html
├── report/
│   ├── report.md
│   ├── code-explanation.md
│   └── screenshots/
├── codex-plan/
├── package.json
├── package-lock.json
└── server.js
```

## Folder Explanation

### `backend/`

Contains the entire server-side implementation:

- `config/` for database initialization and helpers
- `controllers/` for business logic
- `database/` for the SQLite file, schema, and seed SQL
- `middleware/` for authentication and role validation
- `routes/` for API endpoint mapping
- `utils/` for token generation
- `server.js` for the main Express app

### `public/`

Contains the active frontend served by the Express application:

- HTML pages
- CSS stylesheets
- JavaScript modules
- image assets

### `documentation/`

Contains learning-oriented project documentation:

- `md/` for source markdown
- `pdf/` for generated PDF versions

### `report/`

Contains submission-oriented material:

- the main project report
- a code explanation document
- screenshots used as evidence

### Root Files

- `server.js` is the project entrypoint
- `package.json` defines the active scripts and dependencies
- `package-lock.json` locks package versions

### `codex-plan/`

This folder is ignored in public-facing explanations because it is only used for AI development context and planning support.

## Cleanup Note

The repository previously contained duplicate copies of frontend and backend files under older paths. Those duplicates were removed so the report now matches the actual running structure.

---

# DATABASE DESIGN

## Tables

### `users`

Stores:

- admin and student accounts
- identity fields
- profile details
- hashed passwords

### `books`

Stores:

- title
- author
- category
- ISBN
- total copies
- available copies
- shelf location
- description

### `issue_records`

Stores:

- student reference
- book reference
- issue date
- due date
- return date
- current status

## Relationships

- one student can have many issue records
- one book can be issued many times over time
- each issue record links one student and one book

---

# API SUMMARY

## Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

## Books

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

## Users

- `GET /api/users/students`
- `GET /api/users/students/:id`
- `PUT /api/users/profile`
- `DELETE /api/users/students/:id`

## Issues

- `POST /api/issues`
- `GET /api/issues`
- `GET /api/issues/my`
- `PUT /api/issues/:id/return`

## Health

- `GET /api/health`

---

# HOW TO RUN THE PROJECT

1. Open the project in a terminal.
2. Install dependencies with `npm install`.
3. Set `JWT_SECRET`.
4. Start the app using `npm start` or `npm run dev`.
5. Open `http://localhost:5000`.

Optional environment variables:

- `PORT`
- `DB_PATH`

Default database path:

- `backend/database/library.db`

---

# DEPLOYMENT

## Render Configuration

- Build Command: `npm install`
- Start Command: `npm start`
- Required Environment Variable: `JWT_SECRET`

## Live URLs

- Website: `https://library-management-system-n79m.onrender.com`
- Health Check: `https://library-management-system-n79m.onrender.com/api/health`

---

# ADVANTAGES

- clean separation between frontend and backend
- role-based access control
- straightforward deployment from the repository root
- relational data design with simple setup
- searchable catalog and trackable issue history
- maintainable folder structure after duplicate cleanup

---

# LIMITATIONS

- uses a local SQLite database rather than a managed multi-user database service
- frontend is multi-page and framework-free, so larger UI changes require more manual DOM work
- no automated test suite is currently included in the repository

---

# FUTURE SCOPE

- add fine-grained reports and analytics
- add pagination for large datasets
- add email notifications for overdue books
- add stronger audit history for administrative changes
- add automated testing and CI checks

---

# CONCLUSION

The Library Management System provides a practical and complete implementation of core library operations in a full-stack web application. The cleaned repository structure now accurately represents how the application runs, which improves maintainability, documentation quality, and submission clarity. The project is deployable, role-based, database-backed, and suitable for academic demonstration as well as small-scale operational use.
