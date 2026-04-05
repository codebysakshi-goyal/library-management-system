# Campus Library Management System

This is a simple full stack Library Management System made for a BCA third-year level project.

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: SQLite
- Authentication: JWT

## Project Structure

```text
backend/
frontend/
plan.md
README.md
```

## Main Features

- Admin login
- Student registration and login
- Role-based access for admin and student
- Book add, list, edit, delete, search, and filter
- Student list and student details
- Book issue and return system
- Student issued books view
- Overdue status display

## Default Admin Login

- Email: `admin@library.com`
- Password: `admin123`

## Sample Student Login

- Password for sample students: `student123`

Sample student emails:

- `aman.sharma@example.com`
- `priya.verma@example.com`
- `rohit.singh@example.com`
- `neha.gupta@example.com`

## Setup Steps

1. Open terminal in the project root.
2. Go to the backend folder:

```bash
cd backend
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm run dev
```

Or:

```bash
npm start
```

5. Open this URL in browser:

```text
http://localhost:5000
```

## Database

- Database file: `backend/database/library.db`
- Schema file: `backend/database/schema.sql`
- Seed file: `backend/database/seed.sql`

When the server starts for the first time:

- tables are created automatically
- admin account is seeded automatically
- sample students, books, and a few issue records are also added

## Important Notes

- Students can register from the register page.
- Admin cannot register from public UI.
- Only admin can manage books, students, and issue records.
- Students can view books, their profile, and their own issued books.

## API Routes

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`

### Books

- `GET /api/books`
- `GET /api/books/:id`
- `POST /api/books`
- `PUT /api/books/:id`
- `DELETE /api/books/:id`

### Users

- `GET /api/users/students`
- `GET /api/users/students/:id`
- `PUT /api/users/profile`
- `DELETE /api/users/students/:id`

### Issues

- `POST /api/issues`
- `GET /api/issues`
- `GET /api/issues/my`
- `PUT /api/issues/:id/return`

## Viva-Friendly Explanation

- HTML is used to create page structure.
- CSS is used to style the pages.
- JavaScript is used for frontend logic and fetch API calls.
- Node.js and Express.js are used to create backend routes and logic.
- SQLite is used to store users, books, and issue records.
- JWT is used for login authentication and protected routes.

