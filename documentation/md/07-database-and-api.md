# Database And API

## Database Overview

The project uses SQLite as a relational database. The active database file is:

```text
backend/database/library.db
```

The database is initialized automatically when the server starts.

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
