# Folder Structure

## Why Folder Structure Is Important

Folder structure helps us keep the project organized.

When files are placed properly:

- code becomes easier to understand
- maintenance becomes easier
- debugging becomes easier
- viva explanation becomes better

## Top-Level Structure

```text
library-managment-system/
├── server.js
├── package.json
├── package-lock.json
├── .env.example
├── backend/
├── public/
├── database/
├── documentation/
├── frontend/
├── README.md
├── report.md
└── code-explanation.md
```

## Main Meaning of Each Top Folder

### `server.js`

This is the root entry file.

It starts the project by loading the main Express app from the backend folder.

### `package.json`

This is the active project package file.

It contains:

- dependencies
- start command
- dev command

### `backend/`

Contains server-side code.

This part:

- receives requests
- processes logic
- checks authentication
- talks to database
- sends response

### `public/`

Contains the frontend files that are actually served by Express.

This part:

- shows web pages
- accepts user input
- sends requests to backend
- displays output

### `frontend/`

Contains the original source/reference copy of the frontend files.

The deployed application currently serves files from `public/`.

### `documentation/`

Contains learning notes for understanding the project.

## Backend Folder Structure

```text
backend/
├── config/
├── controllers/
├── database/
├── middleware/
├── routes/
├── utils/
└── server.js
```

## Meaning of Backend Folders

### `backend/server.js`

This is the main starting file of backend.

It:

- creates Express app
- sets middleware
- connects routes
- serves frontend files
- starts server
- initializes database

### `backend/config/`

Contains configuration files.

In this project:

- `db.js` handles SQLite connection and database setup

### `backend/controllers/`

Controllers contain the main business logic.

These files decide what should happen when a request comes.

Files:

- `authController.js`
- `bookController.js`
- `userController.js`
- `issueController.js`

### `backend/routes/`

Routes define API paths.

They connect URLs to controller functions.

Files:

- `authRoutes.js`
- `bookRoutes.js`
- `userRoutes.js`
- `issueRoutes.js`

### `backend/middleware/`

Middleware is code that runs between request and final response.

Files:

- `authMiddleware.js`
- `roleMiddleware.js`

### `backend/utils/`

Contains helper code.

In this project:

- `generateToken.js` creates JWT token

### `backend/database/`

Contains database-related files.

Files:

- `schema.sql` -> creates tables
- `seed.sql` -> inserts admin seed data

## Runtime Database Folder

```text
database/
└── library.db
```

### `database/`

This folder stores the runtime SQLite database file used by the app when `DB_PATH=./database/library.db`.

## Public Folder Structure

```text
public/
├── assets/
├── css/
├── js/
├── *.html
```

## Meaning of Public Folders

### `public/assets/`

Stores static assets.

In this project:

- `logo.png`

### `public/css/`

Contains page styling files.

Files:

- `style.css`
- `auth.css`
- `form.css`
- `dashboard.css`
- `books.css`
- `table.css`
- `issue.css`
- `profile.css`

### `public/js/`

Contains frontend logic files.

These files:

- handle button click events
- manage forms
- call backend APIs
- update page content

### `public/*.html`

These are the actual pages opened in browser.

Important pages:

- `index.html`
- `login.html`
- `register.html`
- `admin-dashboard.html`
- `student-dashboard.html`
- `admin-books.html`
- `student-books.html`
- `book-details.html`
- `add-book.html`
- `edit-book.html`
- `students.html`
- `student-details.html`
- `issue-book.html`
- `issued-records.html`
- `my-issued-books.html`
- `profile.html`
- `unauthorized.html`
- `not-found.html`

## Page Purpose Table

### Public Pages

- `index.html` -> home page
- `login.html` -> login page
- `register.html` -> student registration page

### Admin Pages

- `admin-dashboard.html` -> admin summary page
- `admin-books.html` -> admin books management
- `add-book.html` -> add new book
- `edit-book.html` -> edit book
- `students.html` -> all students list
- `student-details.html` -> one student detail page
- `issue-book.html` -> issue book to student
- `issued-records.html` -> all issue and return records

### Student Pages

- `student-dashboard.html` -> student summary page
- `student-books.html` -> books listing page
- `book-details.html` -> full details of one book
- `my-issued-books.html` -> student’s own issue records
- `profile.html` -> user profile page

### Special Pages

- `unauthorized.html` -> access denied
- `not-found.html` -> page not found

## Simple Explanation of Architecture

You can explain folder structure like this:

> The project starts from the root using `server.js` and `package.json`. The main Express logic is inside `backend`, the actual served frontend is inside `public`, the runtime database file is inside `database`, and the `frontend` folder is kept as the original source copy.

## Important for Viva

If asked, “Why did you separate routes and controllers?”, answer:

> I separated routes and controllers to keep the project organized. Routes only define URL paths, while controllers contain the real logic. This makes the code clean and easier to maintain.

## Summary

The project follows a clean structure. Root files handle startup, backend handles logic, `public` handles the served interface, and the database folder stores runtime data. Controllers, routes, and middleware are separated properly, which is a strong point in viva.
