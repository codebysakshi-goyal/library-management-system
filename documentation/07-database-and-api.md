# Database And API

## What Is a Database?

A database is an organized place to store data.

In this project, the database stores:

- users
- books
- issue records

This project uses **SQLite** database.

## Why Database Is Needed

Without database:

- student data would be lost
- book records would be lost
- issue and return history would not exist

Database makes the project permanent and structured.

## Database Files

Inside `backend/database/`:

- `library.db` -> actual database file
- `schema.sql` -> creates tables
- `seed.sql` -> inserts default admin

## Table 1: `users`

This table stores login and profile data.

### Important Columns

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

### Meaning

- `id` -> unique number for each user
- `email` -> must be unique
- `password` -> stored in hashed form
- `role` -> either `admin` or `student`

## Table 2: `books`

This table stores all books.

### Important Columns

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

### Meaning

- `isbn` -> unique book number
- `total_copies` -> total number of copies in library
- `available_copies` -> currently available copies

## Table 3: `issue_records`

This table stores issue and return history.

### Important Columns

- `id`
- `student_id`
- `book_id`
- `issue_date`
- `due_date`
- `return_date`
- `status`
- `created_at`
- `updated_at`

### Meaning

- `student_id` -> links to `users.id`
- `book_id` -> links to `books.id`
- `status` -> `issued` or `returned`

## Relationships Between Tables

This project uses relational database design.

### Relationship 1

One student can have many issue records.

### Relationship 2

One book can appear in many issue records over time.

### Foreign Keys

In `issue_records`:

- `student_id` references `users(id)`
- `book_id` references `books(id)`

## Simple Database Diagram

```text
users
  id (PK)
  full_name
  email
  password
  role
  roll_number
  course
  phone_number

books
  id (PK)
  title
  author
  category
  isbn
  total_copies
  available_copies

issue_records
  id (PK)
  student_id (FK -> users.id)
  book_id (FK -> books.id)
  issue_date
  due_date
  return_date
  status
```

## Seeding Data

When server starts, the project creates initial data.

### Default Admin

- email: `admin@library.com`
- password: `admin123`

### Sample Students

The project also adds sample student records.

### Sample Books

The project adds sample books.

### Sample Issue Records

The project also inserts some sample issue entries.

This is useful for testing and viva demo.

## Important for Viva

You can say:

> The database is initialized automatically. Tables are created if they do not exist, and sample data is inserted for testing and demonstration.

## API Basics

API means a way for frontend and backend to communicate.

Frontend sends request.
Backend sends response.

## Main API Groups

This project has 4 API groups:

- auth APIs
- books APIs
- users APIs
- issues APIs

## 1. Auth APIs

### `POST /api/auth/register`

Purpose:

- register new student

### `POST /api/auth/login`

Purpose:

- login user

### `GET /api/auth/me`

Purpose:

- get current logged-in user details

## 2. Books APIs

### `GET /api/books`

Purpose:

- get all books

Supports:

- search
- category filter

### `GET /api/books/:id`

Purpose:

- get one book

### `POST /api/books`

Purpose:

- add new book

Role:

- admin only

### `PUT /api/books/:id`

Purpose:

- update book

Role:

- admin only

### `DELETE /api/books/:id`

Purpose:

- delete book

Role:

- admin only

## 3. Users APIs

### `GET /api/users/students`

Purpose:

- get all students

Role:

- admin only

### `GET /api/users/students/:id`

Purpose:

- get one student details and issue history

Role:

- admin only

### `PUT /api/users/profile`

Purpose:

- update student profile

Role:

- student only

### `DELETE /api/users/students/:id`

Purpose:

- delete student

Role:

- admin only

## 4. Issues APIs

### `POST /api/issues`

Purpose:

- issue book

Role:

- admin only

### `GET /api/issues`

Purpose:

- get all issue records

Role:

- admin only

### `GET /api/issues/my`

Purpose:

- get current student issue records

Role:

- student only

### `PUT /api/issues/:id/return`

Purpose:

- return book

Role:

- admin only

## Example API Flow

### Example: Add Book

1. Admin fills add-book form
2. Frontend sends `POST /api/books`
3. Backend validates data
4. Backend inserts book into `books` table
5. Backend sends success message

### Example: Return Book

1. Admin clicks Return button
2. Frontend sends `PUT /api/issues/:id/return`
3. Backend updates issue record
4. Backend increases available copies
5. Frontend reloads issue records

## Response Format

Most backend responses are in JSON format.

Common fields:

- `success`
- `message`
- data fields like `user`, `books`, `students`, `issues`

## Important for Viva

If asked, “What is the difference between frontend page and API route?”, answer:

> Frontend page is what user opens in browser, while API route is the backend path used by JavaScript to send or receive data.

## Summary

The database stores structured data in three main tables, and the API provides a clean way for frontend to perform operations like login, add book, issue book, and return book.
