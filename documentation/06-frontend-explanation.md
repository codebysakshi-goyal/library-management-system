# Frontend Explanation

## What Is Frontend?

Frontend is the visible part of the project.

It is what the user sees and uses in the browser.

In this project, frontend is made using:

- HTML
- CSS
- JavaScript

## What Frontend Does Here

Frontend:

- shows pages
- takes input from user
- sends data to backend
- receives backend response
- shows output on page
- controls navigation

## Main Frontend Files

Frontend has:

- HTML pages
- CSS files
- JavaScript files

## Where Frontend Is Served From

The current application serves frontend files from the `public/` folder.

The `frontend/` folder is kept as the original source/reference copy.

So for architecture understanding:

- `public/` = active served frontend
- `frontend/` = source/reference copy

## Important Shared JavaScript Files

## 1. `api.js`

This is one of the most important frontend files.

It handles:

- token reading
- current user reading
- saving login data
- clearing login data
- sending API requests

### Important Functions

#### `getToken()`

Reads token from browser local storage.

#### `getCurrentUser()`

Reads current user object from local storage.

#### `saveAuthData(token, user)`

Stores token and user after login.

#### `clearAuthData()`

Removes token and user when logging out.

#### `apiRequest(endpoint, options)`

This function is very important.

It:

- adds content type
- adds Authorization header if token exists
- calls backend using `fetch()`
- converts response to JSON
- throws error if request fails

### Important for Viva

You can say:

> I created a common API helper so that all frontend files can call backend in one standard way.

## 2. `common.js`

This file contains common frontend helper functions.

### Important Functions

#### `showMessage()`

Shows success or error message on page.

#### `createBadge()`

Creates small status labels like:

- Available
- Not Available
- Issued
- Returned
- Overdue

#### `formatDate()`

Formats date for display.

#### `getQueryParam()`

Reads values from URL.

Example:

- `edit-book.html?id=5`

Here id can be read using this function.

#### `redirectToDashboardByRole()`

Redirects:

- admin -> admin dashboard
- student -> student dashboard

#### `requireAuth(requiredRole)`

Checks:

- user is logged in or not
- role is correct or not

If not allowed:

- sends to `login.html` or `unauthorized.html`

#### `renderNavbar()` and `renderFooter()`

These functions create common navbar and footer on every page.

Navbar changes based on role:

- guest
- student
- admin

## Authentication Frontend

## `auth.js`

This file handles:

- login page
- registration page

### Login Flow

1. User submits login form
2. JavaScript prevents normal page reload
3. Form data is collected
4. `/auth/login` API is called
5. Token and user are saved
6. User is redirected by role

### Register Flow

1. User fills register form
2. Password length is checked
3. `/auth/register` API is called
4. Success message is shown
5. User is redirected to login page

## Admin Frontend Files

## `admin-dashboard.js`

This file:

- checks admin login
- calls books, students, and issues APIs
- builds summary cards
- shows recent books
- shows recent issue records

## `admin-books.js`

This file:

- loads all books
- supports search and category filter
- shows books in table
- allows delete

## `add-book.js`

This file:

- checks admin
- handles add-book form submission
- sends `POST /books`

## `edit-book.js`

This file:

- reads book id from URL
- loads one book
- fills form with old data
- sends updated data to backend

## `students.js`

This file:

- loads all students
- shows them in table

## `student-details.js`

This file:

- reads student id from URL
- gets student details
- shows issue history of that student

## `issue-book.js`

This file:

- loads student list
- loads books list
- sets default due date to 14 days ahead
- disables books with no available copies
- sends issue request

## `issued-records.js`

This file:

- loads all issue records
- shows overdue badge
- gives return button for active issued books

## Student Frontend Files

## `student-dashboard.js`

This file:

- checks student login
- gets current student issue data
- shows summary cards
- shows current active issues

## `student-books.js`

This file:

- loads all books
- supports search and filter
- shows books in card format

## `book-details.js`

This file:

- reads book id from URL
- gets one book
- shows full book information

## `my-issued-books.js`

This file:

- loads only current student’s issue records
- shows status and overdue state

## `profile.js`

This file works for both admin and student.

### If current user is student

Student can update:

- full name
- course
- phone number

### If current user is admin

Admin can only view profile.

In code:

- course and phone are disabled
- update button is hidden

## HTML Page Pattern

Most HTML pages follow this pattern:

1. navbar container
2. main page content
3. footer container
4. shared JS files
5. page-specific JS file

## Example

`login.html` includes:

- `js/api.js`
- `js/common.js`
- `js/auth.js`

This means:

- `api.js` handles request helper
- `common.js` handles shared UI helpers
- `auth.js` handles login/register logic

## How Frontend Talks To Backend

Example: login

1. User fills login form
2. `auth.js` collects form data
3. `api.js` sends request to `/api/auth/login`
4. Backend sends token and user
5. Frontend stores them in local storage
6. User is redirected

## Important for Viva

If asked, “How does frontend know whether the user is logged in?”, answer:

> Frontend stores token and user data in local storage after login. Then helper functions check local storage to protect pages and send token with API requests.

## Summary

Frontend is responsible for page display, form handling, API calling, role-based page access, and showing data in a user-friendly way.
