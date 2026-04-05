# Backend Explanation

## What Is Backend?

Backend is the hidden part of the project that works behind the scenes.

It does things like:

- receive requests
- check data
- process logic
- connect to database
- send response

In this project, backend is built using:

- Node.js
- Express.js
- SQLite

## Backend Entry File: `server.js`

This is the main backend file.

### What It Does

- imports required modules
- loads environment variables
- creates Express app
- enables middleware
- serves frontend static files
- connects API routes
- adds health route
- adds 404 handler
- starts server after database initialization

## Main Lines of Work in `server.js`

### 1. Create App

`const app = express();`

This creates the Express application.

### 2. Add Middleware

The following middleware is used:

- `cors()`
- `express.json()`
- `express.urlencoded({ extended: true })`
- `express.static(frontendPath)`

### 3. Register Routes

These route groups are added:

- `/api/auth`
- `/api/books`
- `/api/users`
- `/api/issues`

### 4. Start Server

Server starts only after database is initialized successfully.

## What Are Routes?

Routes are URL paths used by frontend to talk to backend.

Example:

- `POST /api/auth/login`
- `GET /api/books`
- `POST /api/issues`

Routes answer the question:

**Which URL should call which function?**

## Route Files

## 1. `authRoutes.js`

Handles authentication-related routes:

- `POST /register`
- `POST /login`
- `GET /me`

## 2. `bookRoutes.js`

Handles book routes:

- `GET /`
- `GET /:id`
- `POST /`
- `PUT /:id`
- `DELETE /:id`

All book routes first use `authMiddleware`, so logged-in user is required.

Admin-only actions:

- add book
- update book
- delete book

## 3. `userRoutes.js`

Handles student and profile routes:

- `GET /students`
- `GET /students/:id`
- `PUT /profile`
- `DELETE /students/:id`

## 4. `issueRoutes.js`

Handles issue and return routes:

- `POST /`
- `GET /`
- `GET /my`
- `PUT /:id/return`

## What Are Controllers?

Controllers contain the real logic.

If route is the road, then controller is the actual work done at the destination.

## Controller Files

## 1. `authController.js`

This file handles:

- student registration
- login
- current logged-in user data

### `registerStudent()`

This function:

- reads form data from request body
- checks required fields
- checks password length
- checks if email or roll number already exists
- hashes password using bcrypt
- inserts student into `users` table

### `loginUser()`

This function:

- gets email and password
- finds user from database
- compares password using bcrypt
- creates JWT token
- sends token and user data back

### `getCurrentUser()`

This function returns logged-in user data from `request.user`.

## 2. `bookController.js`

This file handles:

- get all books
- get one book
- add book
- update book
- delete book

### `getBooks()`

This function:

- reads search query
- reads category filter
- builds SQL query
- returns all matching books

It also adds a custom `status` field:

- `Available`
- `Not Available`

### `getBookById()`

Returns a single book by id.

### `addBook()`

This function:

- checks required fields
- checks total copies
- checks unique ISBN
- inserts book into database
- sets `available_copies = total_copies`

### `updateBook()`

This function is important.

It:

- checks book exists
- calculates issued copies
- prevents total copies from becoming less than issued copies
- recalculates available copies
- updates the record

### Important for Viva

This is a very good logic point. You can say:

> While updating a book, I made sure total copies cannot become less than the number of already issued copies. This prevents wrong data.

### `deleteBook()`

This function:

- checks book exists
- checks if any active issue exists
- deletes only if book is not currently issued

## 3. `userController.js`

This file handles:

- get students list
- get one student details
- update student profile
- delete student

### `getStudents()`

Returns all users whose role is `student`.

### `getStudentById()`

Returns:

- student basic details
- that student’s issue history

### `updateProfile()`

Allows student to update:

- full name
- course
- phone number

### `deleteStudent()`

Deletes student only if they do not have any active issued book.

## 4. `issueController.js`

This file handles:

- issue book
- show all issue records
- show current student’s issue records
- return book

### `createIssue()`

This function:

- gets `student_id`, `book_id`, `due_date`
- checks data
- checks due date
- checks student exists
- checks book exists
- checks available copies
- checks duplicate issue
- inserts issue record
- reduces available copies by 1

### `getIssues()`

Returns all issue records for admin.

It joins tables to show:

- student name
- roll number
- book title
- dates
- status

### `getMyIssues()`

Returns only current student’s issue records.

### `returnIssue()`

This function:

- checks issue id
- checks record exists
- checks if already returned
- sets status to `returned`
- stores return date
- increases available copies by 1

### Overdue Logic

There is a helper function:

- `isOverdue(issueDate, status)`

Actually it checks whether current date is greater than due date and whether status is still `issued`.

This is used to add `overdue: true/false` in issue records.

## Middleware

## What Is Middleware?

Middleware is code that runs before final controller logic.

It is used for checking and filtering requests.

## 1. `authMiddleware.js`

This middleware:

- reads `Authorization` header
- checks Bearer token
- verifies JWT
- finds user from database
- stores user in `request.user`

If token is missing or invalid, access is denied.

## 2. `roleMiddleware.js`

This middleware checks user role.

Example:

- only admin can add book
- only student can update student profile

## Utility File

## `generateToken.js`

This file creates JWT token using:

- user id
- user email
- user role

Token expiry is:

- `1d` meaning 1 day

## Backend Pattern Used in This Project

This project follows a very common backend pattern:

1. route receives request
2. middleware checks user
3. controller runs logic
4. database query runs
5. response is returned

## Important for Viva

You should definitely remember this line:

> The backend follows the pattern route -> middleware -> controller -> database -> response.

## One Extra Technical Note

In `issueController.js`, there is also a `getDashboardSummary()` function, but the current frontend dashboard is not using this API. Instead, the admin dashboard separately calls books, students, and issues APIs and calculates summary on the frontend side.

This is not a problem, but it is a useful observation if someone asks whether all functions are currently used.

## Summary

The backend is responsible for all main logic of the project. It handles authentication, authorization, validation, business rules, database operations, and API responses.
