# Project Plan: Library Management System

# * IMPLEMENT IT AS BCA THIRD YEAR STUDENT LEVEL KNOWLEDGE
- Basic coding method
- Do not overcomplicate
- Avoid fancy architecture and advanced patterns

## 1. Project Name

**Project Name:** Campus Library Management System

This is a simple full stack web application for managing a small college library.  
It is designed for a **BCA third-year student project**.  
The code should be clean, understandable, and not overcomplicated.

---

## 2. Project Goal

Build a complete full stack web application where:

- an **Admin** can manage books, students, and issue/return records
- a **Student/User** can log in, view available books, search books, and see their own issued books
- the system stores all data in **SQLite**
- the application has a simple but neat UI using **basic CSS only**
- the frontend and backend are **separate**
- the frontend calls backend APIs using **fetch**
- the code remains easy to understand and explain in viva

This project should look like a practical college-level mini product, not like a highly advanced corporate application.

---

## 3. Tech Stack

## Frontend
- HTML
- CSS
- JavaScript
- Fetch API for calling backend APIs
- No frontend framework
- Plain CSS only (no Tailwind, no Bootstrap, no Material UI, no CSS frameworks)

## Backend
- Node.js
- Express.js

## Database
- SQLite

## Development Tools
- VS Code
- Codex for implementation
- npm

---

## 4. Important Development Rules

These rules are mandatory.

### Code Style Rules
- Keep code simple and beginner-friendly
- Avoid advanced patterns unless absolutely necessary
- Avoid very fancy optimizations
- Use clear file and function names
- Use readable variable names
- Use simple HTML pages and plain JavaScript files
- Use simple Express controllers/routes
- Use simple SQL queries for database operations
- Keep logic easy to explain to a teacher

### UI Rules
- Use only plain CSS
- No external CSS libraries
- UI should be clean, responsive enough for laptop/mobile basics, and neat
- Use cards, tables, forms, buttons, navbar, and simple dashboard layout
- Prefer light background, clear spacing, readable fonts
- Use normal hover effects and borders
- Do not create flashy animations

### Project Complexity Rules
- Do not add unnecessary features like:
  - payment gateway
  - chat
  - notifications by email/SMS
  - barcode scanner
  - real-time sockets
  - advanced analytics
  - cloud file upload
  - Docker
  - microservices
- Keep it simple and complete

### Authentication Rules
- Use JWT-based authentication
- Store token in localStorage for simplicity
- Use role-based access with two roles:
  - admin
  - student

### Data Rules
- Use SQLite tables
- Keep table columns practical and limited
- Add created_at and updated_at where useful

---

## 5. Main User Roles

## 5.1 Admin
Admin can:
- log in
- access admin dashboard
- add new books
- edit book details
- delete books
- view all books
- search/filter books
- manage students
- view all issued books
- issue a book to a student
- return a book
- view summary counts on dashboard

## 5.2 Student
Student can:
- register
- log in
- view student dashboard
- view all books
- search books
- see whether a book is available or unavailable
- view their own issued books
- see issue date and due date
- update own profile (basic details only)

---

## 6. Final Feature List

This section defines the exact scope. Implement only these features.

## 6.1 Authentication Features

### Admin Login
- Admin can log in using email and password
- Admin account may be created by seed script or first-time setup script
- Admin should not register from public UI

### Student Registration
- Student can register from frontend
- Registration fields:
  - full name
  - email
  - password
  - roll number
  - course
  - phone number

### Student Login
- Student can log in using email and password

### Auth Behavior
- On successful login:
  - backend verifies email and password
  - backend returns JWT token
  - frontend saves token in localStorage
  - frontend saves user info and role
  - user is redirected to correct dashboard
- On logout:
  - remove token and user info from localStorage
  - redirect to login page

### Route Protection
- Admin-only pages must be protected
- Student-only pages must be protected
- Unauthenticated users must not access private pages

---

## 6.2 Admin Dashboard Features

Admin dashboard should show summary cards:
- total books
- total students
- total issued books
- total available books

Also show:
- recently added books (optional simple list, max 5)
- recently issued records (optional simple list, max 5)

Keep this dashboard simple.

---

## 6.3 Book Management Features

### Add Book
Admin can add a book with these fields:
- title
- author
- category
- ISBN
- total copies
- available copies
- shelf/location
- description

Validation rules:
- title required
- author required
- category required
- ISBN required and unique
- total copies required and must be >= 1
- available copies should initially equal total copies on create
- shelf/location optional
- description optional

### View Books
Admin can view all books in table/card format with:
- title
- author
- category
- ISBN
- total copies
- available copies
- status

Status logic:
- if available_copies > 0 -> Available
- else -> Not Available

### Edit Book
Admin can edit:
- title
- author
- category
- shelf/location
- description
- total copies

Rules:
- available copies should not become negative
- if total copies is reduced, do not allow invalid values smaller than currently issued count

### Delete Book
Admin can delete a book only when no active issue record exists for that book.
If active issued copies exist, show an error message.

### Search / Filter Books
Admin can:
- search by title
- search by author
- filter by category

Keep search simple.

---

## 6.4 Student Management Features

### View Students
Admin can view all registered students in a table with:
- name
- email
- roll number
- course
- phone number
- status (active)

### Student Details
Admin can open one student profile and see:
- basic profile data
- current issued books
- issue dates
- due dates

### Delete Student
Optional but simple:
- Admin can delete a student only if that student has no active issued books
- If active issue exists, prevent deletion

Do not add complicated student status workflows.

---

## 6.5 Book Issue Features

### Issue Book
Admin can issue a book to a student.

Input fields:
- student
- book
- due date

System behavior:
- admin selects a student
- admin selects a book
- due date is chosen manually or set automatically to 14 days from issue date
- issue date is current date

Validation rules:
- selected book must have available_copies > 0
- same student should not get the same book again if that same book is already actively issued to them and not returned
- student must exist
- book must exist

On successful issue:
- create issue record
- reduce available_copies of book by 1

### View Issued Books
Admin can view all issue records with:
- student name
- book title
- issue date
- due date
- return status
- returned date (if returned)

### Return Book
Admin can mark a book as returned.

On return:
- issue record status becomes returned
- returned date is saved
- book available_copies increases by 1

### Overdue Indicator
If today is after due_date and book is not returned, show status as Overdue in UI.
No automatic fine calculation is required.

---

## 6.6 Student Dashboard Features

Student dashboard should show:
- welcome message
- total books currently issued to this student
- list of issued books
- due dates
- overdue indication if applicable

Keep it simple and clean.

---

## 6.7 Student Book Browsing Features

Student can:
- see all books
- search by title
- search by author
- filter by category
- view book details

Book details page should show:
- title
- author
- category
- ISBN
- description
- shelf/location
- availability

Student should **not** issue books directly.  
Only admin issues books.

---

## 6.8 Profile Features

### Student Profile
Student can:
- view own profile
- update:
  - full name
  - phone number
  - course
- email can remain non-editable for simplicity
- roll number can remain non-editable for simplicity

### Admin Profile
Optional simple page:
- admin can view own profile basic details
No need for edit functionality unless simple.

---

## 6.9 Common UI Features

### Navbar
Navbar should show different links depending on role.

For guest:
- Home
- Login
- Register

For student:
- Dashboard
- Books
- My Issued Books
- Profile
- Logout

For admin:
- Dashboard
- Books
- Students
- Issue Book
- Issued Records
- Logout

### Footer
Simple footer with project name and year.

### Home Page
Simple landing page that explains:
- what the system does
- option to login
- option for student registration

### Error / Empty States
Show clear messages like:
- No books found
- No students found
- No issued books found
- Invalid login credentials
- Unauthorized access

---

## 7. SQLite Tables / Database Design

Use these tables:

1. users
2. books
3. issue_records

Keep database simple. No extra tables unless needed.

---

## 8. Detailed Table Structure

## 8.1 users Table

This table stores both admin and student users.

### Columns
- id INTEGER PRIMARY KEY AUTOINCREMENT
- full_name TEXT NOT NULL
- email TEXT NOT NULL UNIQUE
- password TEXT NOT NULL
- role TEXT NOT NULL CHECK(role IN ('admin','student'))
- roll_number TEXT NULL for admin, required for student
- course TEXT NULL for admin, required for student
- phone_number TEXT NULL
- created_at DATETIME DEFAULT CURRENT_TIMESTAMP
- updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

### Example Student
```sql
INSERT INTO users (full_name, email, password, role, roll_number, course, phone_number)
VALUES ('Aman Sharma', 'aman@example.com', 'hashedpassword', 'student', 'BCA2023001', 'BCA', '9876543210');
```

### Example Admin
```sql
INSERT INTO users (full_name, email, password, role)
VALUES ('Library Admin', 'admin@library.com', 'hashedpassword', 'admin');
```

---

## 8.2 books Table

### Columns
- id INTEGER PRIMARY KEY AUTOINCREMENT
- title TEXT NOT NULL
- author TEXT NOT NULL
- category TEXT NOT NULL
- isbn TEXT NOT NULL UNIQUE
- total_copies INTEGER NOT NULL
- available_copies INTEGER NOT NULL
- shelf_location TEXT NULL
- description TEXT NULL
- created_at DATETIME DEFAULT CURRENT_TIMESTAMP
- updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

### Example
```sql
INSERT INTO books (title, author, category, isbn, total_copies, available_copies, shelf_location, description)
VALUES ('Introduction to C Programming', 'E. Balagurusamy', 'Programming', '9781234567890', 5, 3, 'Rack A-2', 'Basic programming concepts for beginners');
```

---

## 8.3 issue_records Table

### Columns
- id INTEGER PRIMARY KEY AUTOINCREMENT
- student_id INTEGER NOT NULL
- book_id INTEGER NOT NULL
- issue_date TEXT NOT NULL
- due_date TEXT NOT NULL
- return_date TEXT NULL
- status TEXT NOT NULL CHECK(status IN ('issued','returned'))
- created_at DATETIME DEFAULT CURRENT_TIMESTAMP
- updated_at DATETIME DEFAULT CURRENT_TIMESTAMP

### Foreign Keys
- student_id references users(id)
- book_id references books(id)

### Rules
- One row means one issue transaction
- When returned, update status and return_date
- Do not delete old records; keep them for history

### Example
```sql
INSERT INTO issue_records (student_id, book_id, issue_date, due_date, status)
VALUES (2, 3, '2026-04-05', '2026-04-19', 'issued');
```

---

## 9. Backend API Plan

Base URL example:  
`/api`

## 9.1 Auth Routes
- POST `/api/auth/register`
- POST `/api/auth/login`
- GET `/api/auth/me`

### Register
Used only for student registration.

### Login
Used by both admin and student.

### Me
Returns current logged-in user from token.

---

## 9.2 Book Routes
- GET `/api/books`
- GET `/api/books/:id`
- POST `/api/books`
- PUT `/api/books/:id`
- DELETE `/api/books/:id`

### Access Rules
- GET routes: accessible to logged-in users
- POST/PUT/DELETE: admin only

### Query Support
GET `/api/books` can support simple query params:
- `search=`
- `category=`

Search can match title and author.

---

## 9.3 User Routes
- GET `/api/users/students`
- GET `/api/users/students/:id`
- PUT `/api/users/profile`
- DELETE `/api/users/students/:id` (admin only, optional if implemented)

### Access Rules
- admin can view all students
- student can update own profile
- student cannot view other students

---

## 9.4 Issue Routes
- POST `/api/issues`
- GET `/api/issues`
- GET `/api/issues/my`
- PUT `/api/issues/:id/return`

### Access Rules
- POST `/api/issues` -> admin only
- GET `/api/issues` -> admin only
- GET `/api/issues/my` -> logged-in student only
- PUT `/api/issues/:id/return` -> admin only

---

## 10. Backend Folder Structure

Use this backend structure:

```text
backend/
  package.json
  server.js
  .env
  database/
    library.db
    schema.sql
    seed.sql
  config/
    db.js
  controllers/
    authController.js
    bookController.js
    userController.js
    issueController.js
  routes/
    authRoutes.js
    bookRoutes.js
    userRoutes.js
    issueRoutes.js
  middleware/
    authMiddleware.js
    roleMiddleware.js
  utils/
    generateToken.js
```

### Notes
- `server.js` should initialize express, middleware, routes, and DB connection
- `db.js` handles SQLite connection
- auth middleware checks JWT
- role middleware checks admin/student permissions
- keep controllers simple and separated by resource
- SQL schema should be written in `schema.sql`

---

## 11. Frontend Folder Structure

Use this frontend structure:

```text
frontend/
  index.html
  login.html
  register.html
  admin-dashboard.html
  admin-books.html
  add-book.html
  edit-book.html
  students.html
  student-details.html
  issue-book.html
  issued-records.html
  student-dashboard.html
  student-books.html
  book-details.html
  my-issued-books.html
  profile.html
  unauthorized.html
  not-found.html

  css/
    style.css
    auth.css
    dashboard.css
    table.css
    form.css
    books.css
    profile.css
    issue.css

  js/
    api.js
    auth.js
    common.js
    admin-dashboard.js
    admin-books.js
    add-book.js
    edit-book.js
    students.js
    student-details.js
    issue-book.js
    issued-records.js
    student-dashboard.js
    student-books.js
    book-details.js
    my-issued-books.js
    profile.js
```

### Notes
- Frontend is separate from backend
- Pages are plain HTML files
- JavaScript files call backend APIs using fetch
- CSS stays simple and organized
- No React, no EJS, no frontend framework

---

## 12. Detailed Page Plan

## 12.1 Home Page
Purpose:
- first landing page
- explain project in simple words

Sections:
- header/navbar
- hero section with title and short description
- buttons for login and register
- simple section listing key features
- footer

---

## 12.2 Login Page
Fields:
- email
- password

Behavior:
- submit credentials using fetch
- show errors if invalid
- redirect according to role

---

## 12.3 Register Page
Only for students.

Fields:
- full name
- email
- password
- roll number
- course
- phone number

Behavior:
- validate required fields
- create student account through API
- redirect to login

---

## 12.4 Admin Books Page
Features:
- list all books
- search/filter UI
- add button
- edit button
- delete button
- status badge for availability

---

## 12.5 Add Book Page
Fields:
- title
- author
- category
- isbn
- total copies
- shelf location
- description

---

## 12.6 Edit Book Page
Same form as add book, prefilled.

---

## 12.7 Students Page
Features:
- list all students
- search by name or roll number optional
- view details button

---

## 12.8 Student Details Page (Admin View)
Show:
- student details
- issued books table
- current active books
- old returned records optional in same list

---

## 12.9 Issue Book Page
Form:
- select student dropdown
- select book dropdown
- due date input

Behavior:
- only books with available copies should be selectable, or show disabled if unavailable

---

## 12.10 Issued Records Page
Admin sees all issue records.

Columns:
- student name
- book title
- issue date
- due date
- status
- overdue
- action return button if still issued

---

## 12.11 Student Dashboard
Show:
- total issued books count
- current books list
- due dates
- overdue badge

---

## 12.12 Student Books Page
Show all books with search and filter.

---

## 12.13 Book Details Page
Show full details of a selected book.

---

## 12.14 My Issued Books Page
Student sees only their own issue records.

Columns:
- book title
- issue date
- due date
- status
- overdue message

---

## 12.15 Student Profile Page
Show and edit basic student information.

---

## 13. Validation Rules

## Frontend Validation
- required fields should not be empty
- email format should look valid
- password minimum 6 characters
- total copies must be positive number
- due date should not be before today

## Backend Validation
Always validate again on backend:
- do not trust frontend only
- protect duplicate email
- protect duplicate ISBN
- protect invalid ids
- protect unauthorized actions
- protect issuing unavailable book
- protect duplicate active issue for same student and same book

---

## 14. Suggested Business Logic Details

## 14.1 Available Copies Logic
When new book is added:
- available_copies = total_copies

When book issued:
- available_copies = available_copies - 1

When book returned:
- available_copies = available_copies + 1

When total_copies edited:
- ensure total_copies is never less than issued copies count

Formula:  
`issued_copies = total_copies - available_copies`

---

## 14.2 Overdue Logic
A record is overdue when:
- status = "issued"
- current date > due_date

This can be calculated in backend response or frontend display.

---

## 14.3 Book Delete Logic
A book can be deleted only when there is no active issue record with:
- that book_id
- status = "issued"

---

## 14.4 Student Delete Logic
A student can be deleted only when there is no active issue record with:
- that student_id
- status = "issued"

---

## 15. Security and Simplicity Balance

Keep security basic but good enough for a student project:
- passwords hashed using bcrypt
- JWT auth
- protected routes
- role checks
- simple error handling
- no advanced refresh token logic required
- no OAuth required

---

## 16. Suggested Environment Variables

Backend `.env` example:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_key
```

SQLite database file can be:
`backend/database/library.db`

---

## 17. Seed Data Requirement

Create a small seed script or seed SQL file.

Admin seed example:
- name: Library Admin
- email: admin@library.com
- password: admin123

Also optional sample books can be added manually or through SQL insert queries.

---

## 18. Implementation Order

This order must be followed for smooth implementation.

### Phase 1: Project Setup
- create frontend and backend folders
- initialize backend Express app
- setup static frontend pages
- install dependencies
- create SQLite connection
- setup routing basic structure

### Phase 2: Backend Base Setup
- create database schema
- create auth routes
- create auth middleware
- create role middleware
- create simple error handling

### Phase 3: Authentication
- student registration
- login for admin/student
- JWT handling
- auth/me route

### Phase 4: Book Management
- add book
- list books
- view book details
- edit book
- delete book
- search/filter

### Phase 5: Student Management
- list students
- student details
- update own profile

### Phase 6: Issue Management
- issue book
- issued records list
- my issued books
- return book
- overdue display

### Phase 7: Frontend UI
- navbar
- page structure
- JavaScript fetch integration
- admin and student dashboard pages
- forms
- tables
- clean CSS styling

### Phase 8: Final Improvements
- validation polish
- empty states
- better error messages
- seed admin
- README instructions

---

## 19. Expected Dependencies

## Backend
- express
- sqlite3
- dotenv
- bcryptjs
- jsonwebtoken
- cors

Dev dependencies:
- nodemon

## Frontend / Client Side
- No frontend framework required
- Use plain HTML, CSS, JavaScript

No CSS libraries.

---

## 20. API Response Style

Keep responses simple JSON.

### Success Example
```json
{
  "success": true,
  "message": "Book added successfully"
}
```

### Error Example
```json
{
  "success": false,
  "message": "Book not found"
}
```

---

## 21. UI Design Guidance

The UI should feel like a college project that is neat and usable.

### Design Suggestions
- use a clean header with project title
- white cards on light background
- blue or dark theme accents for buttons
- clear table borders
- moderate spacing
- readable font like Arial, sans-serif
- mobile responsiveness can be basic using simple media queries

### Components to Reuse
- button styles
- input styles
- table styles
- card styles
- page container class
- section heading class
- badge classes:
  - available
  - not available
  - issued
  - returned
  - overdue

---

## 22. What Not To Implement

Do not implement:
- online book request system
- payment/fine payment
- book reservation
- PDF export
- charts library
- multiple admin roles
- image upload for books
- forgot password email flow
- OTP
- dark mode
- advanced pagination unless very easy
- advanced search engine
- unit tests unless very easy and time remains

---

## 23. Viva-Friendly Explanations the Code Should Support

The implementation should make it easy to explain:
- What is HTML/CSS/JavaScript used for?
- What is Node/Express used for?
- Why SQLite?
- What is JWT?
- What is role-based access?
- What is CRUD?
- How does issue/return work?
- How is book availability maintained?
- Why separate tables are used?
- What happens when a book is returned?

So code structure should remain clear and direct.

---

## 24. Final Deliverables Expected From Codex

Codex should generate:

1. full frontend code using HTML, CSS, JavaScript
2. full backend code using Node.js and Express
3. SQLite schema and seed file
4. route protection
5. admin and student flows
6. plain CSS styling
7. admin seed data
8. README with setup steps
9. clean folder structure
10. working basic validations

---

## 25. Final Instruction To Codex

Build exactly this project.  
Do not add unnecessary complexity.  
Do not use CSS frameworks.  
Do not use TypeScript.  
Do not use React.  
Do not use EJS.  
Do not add features outside this plan unless required for basic working.  
Write code in a beginner-friendly, readable, college-project style.
