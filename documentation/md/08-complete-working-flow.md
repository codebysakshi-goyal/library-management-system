# Complete Working Flow

## Why this file is important for viva

In viva, teachers often ask: **“Explain the complete flow from start to end.”**

So think of this file as your “script”:

- how the server starts
- how login works
- how data moves from UI → backend → database → back to UI

## End-To-End Runtime Flow

From startup to user interaction, the application works in a consistent sequence:

1. `server.js` loads `backend/server.js`.
2. The backend loads environment variables and configures Express.
3. `initializeDatabase()` creates tables and seed data if needed.
4. Express serves the static assets in `public/`.
5. The browser loads HTML pages and their corresponding JavaScript files.
6. Frontend scripts call `/api/...` endpoints for protected or dynamic data.
7. Routes, middleware, controllers, and SQLite queries process the request.
8. JSON responses are returned to the browser.
9. The page updates the DOM based on the response.

### One-line flow diagram

```text
HTML page -> JS fetch (/api) -> Express route -> middleware -> controller -> SQLite -> JSON -> UI update
```

## Authentication Flow

### Login

1. The user opens `login.html`.
2. `public/js/auth.js` intercepts the form submit.
3. The script sends `POST /api/auth/login`.
4. `authController.loginUser()` verifies the credentials.
5. The backend returns a JWT token and user object.
6. `api.js` stores them in local storage.
7. The frontend redirects to the admin or student dashboard based on `user.role`.

### Current User Lookup

1. A protected page needs user context.
2. The page sends `GET /api/auth/me`.
3. `authMiddleware` verifies the token.
4. The backend returns `request.user`.

## Registration Flow

1. A student opens `register.html`.
2. `auth.js` gathers form data.
3. The script sends `POST /api/auth/register`.
4. `authController.registerStudent()` validates fields and uniqueness.
5. The password is hashed with bcryptjs.
6. The student is inserted into `users`.
7. The frontend shows a success message and redirects to login.

## Catalog Flow

### Book Listing

1. A page such as `admin-books.html` or `student-books.html` loads.
2. The page script sends `GET /api/books`, optionally with `search` and `category`.
3. `bookController.getBooks()` builds the SQL query dynamically.
4. The backend returns matching books with a computed `status` field.
5. The frontend renders the list or table.

### Book Details

1. The user opens `book-details.html?id=<bookId>` or `edit-book.html?id=<bookId>`.
2. The page script reads `id` from the query string.
3. The script sends `GET /api/books/:id`.
4. The backend returns the selected book.
5. The frontend renders details or pre-fills the edit form.

## Admin Book Management Flow

### Add Book

1. Admin opens `add-book.html`.
2. `add-book.js` sends `POST /api/books`.
3. `bookController.addBook()` validates required fields, ISBN uniqueness, and total copies.
4. The backend inserts the book with `available_copies = total_copies`.
5. The frontend shows confirmation and redirects or refreshes the list.

### Edit Book

1. Admin loads the existing book.
2. `edit-book.js` sends `PUT /api/books/:id`.
3. `bookController.updateBook()` recalculates available copies using the number already issued.
4. The backend updates the record.
5. The frontend confirms success.

### Delete Book

1. Admin triggers delete from the books page.
2. `admin-books.js` sends `DELETE /api/books/:id`.
3. `bookController.deleteBook()` checks for active issued copies.
4. If no active issue exists, the book is deleted.
5. The UI refreshes the listing.

## Student Management Flow

### Student List

1. Admin opens `students.html`.
2. `students.js` sends `GET /api/users/students`.
3. The backend returns all student records ordered by creation time.
4. The page renders the table.

### Student Details

1. Admin opens `student-details.html?id=<studentId>`.
2. `student-details.js` sends `GET /api/users/students/:id`.
3. The backend returns the student plus issue history.
4. The page renders both sections.

## Issue And Return Flow

### Issue Book

1. Admin opens `issue-book.html`.
2. `issue-book.js` loads students and books for selection.
3. Admin submits student, book, and due date.
4. The script sends `POST /api/issues`.
5. `issueController.createIssue()` validates:
   - student exists
   - book exists
   - available copies remain
   - due date is not in the past
   - duplicate active issue does not already exist
6. The backend inserts an `issue_records` row.
7. The backend decrements `books.available_copies`.
8. The frontend confirms success.

### Return Book

1. Admin opens `issued-records.html`.
2. `issued-records.js` displays issue rows and return buttons for active issues.
3. Admin clicks return.
4. The script sends `PUT /api/issues/:id/return`.
5. `issueController.returnIssue()` verifies the record and checks that it is not already returned.
6. The backend sets `status = returned` and stores `return_date`.
7. The backend increments the related book’s `available_copies`.
8. The UI reloads the records.

## Student Borrowing Flow

1. Student opens `my-issued-books.html`.
2. `my-issued-books.js` sends `GET /api/issues/my`.
3. `issueController.getMyIssues()` queries only the current student’s rows.
4. The backend adds the `overdue` field before returning the response.
5. The page renders the student’s issue history.

## Profile Flow

1. The user opens `profile.html`.
2. The page loads current user data.
3. If the user is a student, the update form stays editable.
4. `profile.js` sends `PUT /api/users/profile`.
5. `userController.updateProfile()` updates the allowed fields.
6. The backend returns the refreshed user object.
7. The frontend updates local storage so the UI stays in sync.

## Access-Control Flow

Every protected operation uses the same pattern:

1. The frontend attaches `Authorization: Bearer <token>`.
2. `authMiddleware` verifies the token and loads the user.
3. `roleMiddleware` checks whether the route is allowed for that role.
4. The controller runs only if both checks pass.

## Overdue Logic

The overdue flag is derived, not stored as a separate database column. A record is overdue when:

- `status` is still `issued`
- the current date is greater than `due_date`

This calculation happens in `issueController.js` before issue data is returned to the frontend.

---

## What to read next

Next file: **Viva preparation** → [`09-viva-preparation.md`](09-viva-preparation.md)
