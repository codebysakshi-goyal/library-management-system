# Frontend Explanation

## Frontend Role

The frontend is a static multi-page interface served from `public/`. Each page is written in HTML, styled with CSS, and enhanced with vanilla JavaScript. Instead of a frontend framework, the project uses small page-specific scripts plus a few shared utility files.

## Active Frontend Location

The active frontend lives entirely in:

```text
public/
```

That folder is what Express serves through `express.static(...)`, so every HTML, CSS, JavaScript, and asset file used by the running application comes from there.

## Shared Frontend Modules

### `public/js/api.js`

This file centralizes client-side authentication state and API communication. It handles:

- reading the stored token
- reading the stored user object
- saving auth data after login
- clearing auth data on logout
- sending requests to `/api/...`
- adding the `Authorization` header when a token exists

Because of this file, page scripts do not need to repeat fetch boilerplate.

### `public/js/common.js`

This file contains reusable UI helpers such as:

- flash-message rendering
- badge rendering
- date formatting
- query-string parsing
- auth checks
- role-based redirects
- common navbar and footer rendering

These helpers keep page-specific scripts focused on their own screen logic.

### `public/js/auth.js`

This file powers:

- login form submission
- student registration form submission
- login success handling
- redirecting users to the correct dashboard

## Page Groups

## Public Pages

- `index.html`
- `login.html`
- `register.html`

These pages are accessible without logging in.

## Admin Pages

- `admin-dashboard.html`
- `admin-books.html`
- `add-book.html`
- `edit-book.html`
- `students.html`
- `student-details.html`
- `issue-book.html`
- `issued-records.html`

Each admin page checks authentication and role before loading protected data.

## Student Pages

- `student-dashboard.html`
- `student-books.html`
- `book-details.html`
- `my-issued-books.html`
- `profile.html`

Student pages either require a logged-in student or adapt to the current role, as in the shared profile page.

## Utility Pages

- `unauthorized.html`
- `not-found.html`

These provide a simple fallback experience for invalid access or routes.

## Admin Page Logic

### `admin-dashboard.js`

This file loads books, students, and issue records separately, then derives the summary cards in the browser. It does not rely on a dedicated dashboard endpoint.

### `admin-books.js`

This file:

- loads all books
- applies search and category filters
- renders the results table
- handles deletion actions

### `add-book.js`

This file:

- validates admin access
- reads form values
- sends `POST /api/books`

### `edit-book.js`

This file:

- reads the book id from the URL
- loads the existing book details
- pre-fills the form
- sends `PUT /api/books/:id`

### `students.js`

This file loads and renders the student list for admins.

### `student-details.js`

This file loads a selected student and that student’s issue history.

### `issue-book.js`

This file:

- loads available students and books
- sets a default due date
- disables unavailable book options
- submits `POST /api/issues`

### `issued-records.js`

This file:

- loads all issue records
- shows overdue indicators
- allows admins to return active issues

## Student Page Logic

### `student-dashboard.js`

This file loads the current student’s issue data and builds the dashboard summary.

### `student-books.js`

This file:

- loads the book catalog
- supports searching and category filtering
- renders book cards

### `book-details.js`

This file loads and renders a single book using the id from the query string.

### `my-issued-books.js`

This file loads `GET /api/issues/my` and renders the student’s own issue table.

### `profile.js`

This file supports both roles:

- students can update profile fields
- admins can view profile information in read-only mode

## Rendering Pattern

Most pages follow the same structure:

1. HTML defines the layout and containers.
2. Shared JS files are loaded first.
3. The page-specific script checks auth and role.
4. The script fetches data from the backend.
5. The DOM is updated with the results.

## Browser Storage

The app uses local storage for:

- the JWT token
- the current user object

That stored state enables:

- page protection
- role-aware navigation
- authenticated API requests across page loads

## Frontend And Backend Contract

The frontend expects JSON responses with predictable shapes and uses the shared helpers to surface:

- success messages
- error messages
- badges for status, availability, and overdue state

Because the frontend is modular but simple, it is easy to trace a page from HTML to its JS file to the API endpoint it calls.
