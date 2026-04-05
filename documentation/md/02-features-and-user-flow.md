# Features And User Flow

## Functional Scope

The project supports the day-to-day workflows required in a small academic library:

- user authentication
- student onboarding
- book catalog management
- issue and return management
- profile updates
- status monitoring for overdue books

## Admin Features

Admin users have the highest operational access in the system.

### Authentication

- log in through `login.html`
- access protected admin pages after successful JWT-based login

### Dashboard

The admin dashboard builds a summary from books, students, and issues data. It shows:

- total books
- total students
- currently issued books
- available copies
- recent books
- recent issue activity

### Book Management

Admin users can:

- create new book records
- search books by title or author
- filter books by category
- update title, author, category, copies, shelf location, and description
- delete books that have no active issue record

### Student Management

Admin users can:

- view all student accounts
- open detailed student pages
- inspect a student’s issue history
- delete a student only when no active issue exists

### Issue And Return

Admin users can:

- issue a book to a selected student
- choose a due date
- return an issued book from the issued-records screen
- review overdue status on active issues

## Student Features

Student users interact with the library catalog and their own account.

### Registration And Login

- register through `register.html`
- log in through `login.html`
- store token and user state in local storage after login

### Student Dashboard

The student dashboard summarizes the current user’s borrowing data, including:

- total issued records
- active issued books
- returned books
- overdue records

### Catalog Browsing

Students can:

- list all books
- search by title or author
- filter by category
- check availability status
- open a full details page for a single book

### My Issued Books

Students can review their own issue history with:

- title
- author
- category
- issue date
- due date
- return date
- status
- overdue flag

### Profile

Students can update:

- full name
- course
- phone number

Students cannot change email, roll number, or role through the profile form.

## Business Rules

The controllers enforce a set of domain rules that protect data consistency.

### User Rules

- email must be unique
- roll number must be unique for students
- a student account cannot be deleted if active issued books exist

### Book Rules

- ISBN must be unique
- total copies must be at least `1`
- available copies are recalculated when total copies change
- a book cannot be deleted while actively issued

### Issue Rules

- only admin users can create or return issues
- due date cannot be earlier than the current date
- a student cannot hold two active issues for the same book
- issuing a book decreases `available_copies`
- returning a book increases `available_copies`
- overdue is true only when status is `issued` and the due date has passed

## Navigation Flow

### Public Flow

1. A user opens `/`, which serves `public/index.html`.
2. The public landing page links to login and registration pages.

### Student Flow

1. Student registers or logs in.
2. `public/js/auth.js` sends the request to `/api/auth/...`.
3. Successful login stores token and user data in local storage.
4. The student is redirected to `student-dashboard.html`.
5. From there the student can navigate to books, issue history, and profile pages.

### Admin Flow

1. Admin logs in.
2. The same auth flow stores token and user details in local storage.
3. The admin is redirected to `admin-dashboard.html`.
4. From there the admin can move to books, students, issue-book, issued-records, and profile pages.

## Access Control Flow

The frontend and backend both participate in access control:

- frontend guards pages with helper functions such as `requireAuth`
- backend validates JWTs with `authMiddleware`
- backend restricts privileged actions with `roleMiddleware("admin")` or `roleMiddleware("student")`

If a user reaches a page without the required role, the UI redirects them to `unauthorized.html`.
