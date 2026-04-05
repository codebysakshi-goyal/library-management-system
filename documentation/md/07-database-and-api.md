# Database And API

## What “database” means here (in very simple words)

A database is where the app stores information permanently, like:

- student accounts
- books
- issue/return history

This project uses **SQLite**, which stores everything in a **single `.db` file**.

## Tiny glossary (simple meanings)

- **Table**: like an Excel sheet (rows + columns)
- **Row**: one record (example: one student)
- **Column**: one field (example: email)
- **SQL**: the language used to ask questions from the database
- **Join**: combining data from two tables (example: issue record + student name + book title)

## Database Overview

The project uses SQLite as a relational database.

### Where the database file actually lives (important)

The backend decides the runtime database file like this (see `backend/config/db.js`):

1. If `DB_PATH` is set in the environment, use that file path.
2. Otherwise, fall back to `backend/database/library.db`.

So the “active database file” depends on your `.env` / hosting environment.

In this repository, the root `.env.example` (and the current `.env`) uses `DB_PATH=./database/library.db`. That means when you run the app locally, it will create/use a `database/` folder at the project root for the SQLite file.

```text
DB_PATH (from .env) OR backend/database/library.db
```

The database is initialized automatically when the server starts.

## Simple ER diagram (tables relationship)

```text
users (id) 1  ----<  issue_records  >----  1 books (id)
              (student_id)         (book_id)
```

Meaning:

- One student can have many issue records over time.
- One book can be issued many times over time.
- Each issue record connects **one student** to **one book**.

## Database Files

### `backend/database/schema.sql`

Defines the table structure for:

- `users`
- `books`
- `issue_records`

### `backend/database/seed.sql`

Contains the admin insert statement used during startup seeding.

### `backend/config/db.js`

Coordinates:

- opening the database
- running the schema
- seeding the admin account
- inserting sample students, books, and issue data

## Table Design

## `users`

Stores authentication and profile information.

Important columns:

- `id`
- `full_name`
- `email`
- `password`
- `role`
- `roll_number`
- `course`
- `phone_number`
- `created_at`
- `updated_at`

Important rules:

- `email` is unique
- `role` must be `admin` or `student`
- student records use `roll_number`, `course`, and `phone_number`

## `books`

Stores catalog information.

Important columns:

- `id`
- `title`
- `author`
- `category`
- `isbn`
- `total_copies`
- `available_copies`
- `shelf_location`
- `description`
- `created_at`
- `updated_at`

Important rules:

- `isbn` is unique
- `total_copies` must be at least `1`
- `available_copies` cannot be negative

## `issue_records`

Stores borrowing history.

Important columns:

- `id`
- `student_id`
- `book_id`
- `issue_date`
- `due_date`
- `return_date`
- `status`
- `created_at`
- `updated_at`

Important rules:

- `student_id` references `users(id)`
- `book_id` references `books(id)`
- `status` must be `issued` or `returned`

## Relationships

The relational model is simple and intentional:

- one student can have many issue records
- one book can appear in many issue records across time
- each issue record joins one student and one book

## Seed Data

On startup the app ensures the presence of:

- the default admin account
- sample student accounts
- sample books
- sample issue records

This improves the out-of-the-box experience and makes the UI immediately testable.

## API Overview

The frontend talks to the backend through four route groups.

## Auth APIs

### `POST /api/auth/register`

Registers a new student.

Expected body:

- `full_name`
- `email`
- `password`
- `roll_number`
- `course`
- `phone_number`

### `POST /api/auth/login`

Authenticates an existing user.

Expected body:

- `email`
- `password`

Success response includes:

- `token`
- `user`

### `GET /api/auth/me`

Returns the authenticated user. Requires a bearer token.

## Book APIs

### `GET /api/books`

Returns the catalog for logged-in users.

Supported query params:

- `search`
- `category`

### `GET /api/books/:id`

Returns one book record for a logged-in user.

### `POST /api/books`

Creates a new book. Admin only.

### `PUT /api/books/:id`

Updates a book. Admin only.

### `DELETE /api/books/:id`

Deletes a book when no active issue exists. Admin only.

## User APIs

### `GET /api/users/students`

Returns all student records. Admin only.

### `GET /api/users/students/:id`

Returns one student and that student’s issue history. Admin only.

### `PUT /api/users/profile`

Updates the logged-in student’s profile fields. Student only.

### `DELETE /api/users/students/:id`

Deletes a student when no active issue exists. Admin only.

## Issue APIs

### `POST /api/issues`

Creates a new issue record and decrements the selected book’s available copies. Admin only.

### `GET /api/issues`

Returns all issue records with joined student and book data. Admin only.

### `GET /api/issues/my`

Returns the current student’s issue history. Student only.

### `PUT /api/issues/:id/return`

Marks an issue as returned and increments the corresponding book’s available copies. Admin only.

## Health API

### `GET /api/health`

Returns:

```json
{
  "success": true,
  "message": "Server is running"
}
```

Use cases:

- Render health checks
- uptime verification
- quick manual diagnostics

## Response Conventions

Most responses follow a consistent pattern:

- `success`: boolean
- `message`: human-readable summary when needed
- payload fields such as `user`, `books`, `students`, or `issues`

That consistency keeps the frontend request helper simple and predictable.

---

## What to read next

Next file: **Complete working flow** → [`08-complete-working-flow.md`](08-complete-working-flow.md)
