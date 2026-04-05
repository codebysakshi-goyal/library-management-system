# Campus Library Management System

This is a simple full stack Library Management System made for a BCA third-year level project.

## Live Demo

- Deployment Platform: Render
- Live URL: `https://library-management-system-n79m.onrender.com`

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express.js
- Database: SQLite
- Authentication: JWT

## Project Structure

```text
server.js
package.json
backend/
public/
database/
documentation/
frontend/
README.md
report.md
```

## Current Architecture

- Root `server.js` is the deployment entrypoint.
- Root `package.json` contains the active scripts for local run and Render deployment.
- `backend/server.js` contains the main Express application.
- `public/` contains the frontend files actually served by Express.
- `frontend/` is kept as the original source/reference copy of the UI files.
- `database/library.db` is the active runtime database path when `DB_PATH=./database/library.db`.
- `backend/database/schema.sql` and `backend/database/seed.sql` are used for initialization.

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
2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
PORT=5051 npm run dev
```

Or:

```bash
PORT=5051 npm start
```

4. Open this URL in browser:

```text
http://localhost:5051
```

## Deployment

- Platform used: Render
- Build command: `npm install`
- Start command: `npm start`
- Live URL: `https://library-management-system-n79m.onrender.com`
- Health URL: `https://library-management-system-n79m.onrender.com/api/health`
- Required environment variable: `JWT_SECRET=your-secret-value`

## Database

- Active database file: `database/library.db`
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
