# Complete Working Flow

## Why This File Is Important

This file explains how the project works from start to finish.

This is very useful for viva because many examiners ask:

- how does login work?
- how does one page connect to backend?
- what happens when a book is issued?
- what happens when a book is returned?

## Full Project Flow in One Line

> Browser page takes user input, JavaScript sends API request, backend checks token and role, controller runs logic, database is updated or read, and result is sent back to frontend.

## 1. Login Flow

### Step-by-Step

1. User opens `login.html`
2. User enters email and password
3. `auth.js` handles form submit
4. It sends request to `/api/auth/login`
5. Backend `authRoutes.js` sends request to `loginUser()` in `authController.js`
6. Controller finds user in database
7. Password is checked using `bcrypt.compare()`
8. If correct, JWT token is created
9. Backend sends token and user object
10. Frontend saves token and user in local storage
11. Frontend redirects:
   admin -> `admin-dashboard.html`
   student -> `student-dashboard.html`

## 2. Protected Route Flow

Example: opening books list after login

1. Frontend sends request to `/api/books`
2. `api.js` automatically adds `Authorization: Bearer <token>`
3. Backend route uses `authMiddleware`
4. Middleware verifies token
5. Middleware loads user from database
6. Request moves to controller
7. Controller sends books data

## 3. Student Registration Flow

1. Student opens `register.html`
2. Student fills form
3. `auth.js` collects form data
4. Frontend sends `POST /api/auth/register`
5. Backend checks required fields
6. Backend checks duplicate email or roll number
7. Password is hashed
8. Student record is inserted into `users` table
9. Success message is shown
10. Student is redirected to login page

## 4. Add Book Flow

1. Admin opens `add-book.html`
2. Admin enters book details
3. Frontend sends `POST /api/books`
4. Backend checks admin role
5. `addBook()` validates data
6. Database inserts new book
7. `available_copies` is set equal to `total_copies`
8. Success message is shown

## 5. Search Book Flow

1. User enters search text
2. Frontend sends query like `/api/books?search=web&category=Programming`
3. Backend reads query parameters
4. SQL query is built based on search and category
5. Matching books are returned
6. Frontend renders filtered list

## 6. Issue Book Flow

This is one of the most important flows in viva.

### Step-by-Step

1. Admin opens `issue-book.html`
2. Page loads students and books from backend
3. Admin selects student
4. Admin selects available book
5. Admin selects due date
6. Frontend sends `POST /api/issues`
7. Backend checks:
   student exists or not
   book exists or not
   book availability
   due date validity
   duplicate issue
8. Backend inserts issue record in `issue_records`
9. Backend reduces `available_copies` by 1 in `books` table
10. Success message is shown

## 7. Return Book Flow

1. Admin opens issued records page
2. Admin clicks Return button
3. Frontend sends `PUT /api/issues/:id/return`
4. Backend finds the issue record
5. Backend checks it is not already returned
6. Backend updates:
   status = `returned`
   return_date = today
7. Backend increases book `available_copies` by 1
8. Frontend reloads issue records table

## 8. Student My Issued Books Flow

1. Student opens `my-issued-books.html`
2. Frontend sends `GET /api/issues/my`
3. Backend gets only current student’s records using `request.user.id`
4. Backend sends issue records
5. Frontend shows table

## 9. Profile Update Flow

1. User opens `profile.html`
2. Frontend loads current user with `GET /api/auth/me`
3. Form fields are filled
4. If user is student, submit is allowed
5. Student edits allowed fields
6. Frontend sends `PUT /api/users/profile`
7. Backend updates database
8. New user data is returned
9. Frontend updates local storage

## 10. Overdue Calculation Flow

The system marks issue records as overdue when:

- status is still `issued`
- today’s date is after due date

This is calculated in backend inside `issueController.js`.

## How Local Storage Is Used

Browser local storage stores:

- token
- user object

This helps:

- keep user logged in
- protect pages
- show correct navbar links
- send token to backend

## Important for Viva

You should remember these two exact lines:

> After login, token and user data are stored in local storage.

> For protected requests, the frontend sends the token in Authorization header, and backend verifies it using JWT.

## Short Explanation of MVC-Like Idea

This project is not a full strict MVC framework, but it uses a similar clean separation:

- routes decide URL
- controllers handle logic
- database stores data
- frontend shows output

## Most Important Flows to Revise for Viva

- login flow
- registration flow
- add book flow
- issue book flow
- return book flow
- profile update flow
- role-based access flow

## Summary

Every major action in the project follows the same simple pattern: input -> API request -> backend validation -> database operation -> response -> frontend update.
