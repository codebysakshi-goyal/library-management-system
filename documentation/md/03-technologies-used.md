# Technologies Used

## Why Technologies Matter

Every project needs tools and technologies.

Some technologies are used to:

- build pages
- style pages
- add logic
- create backend
- store data
- secure login

This project uses technologies that are simple, practical, and suitable for a BCA-level project.

## Full Technology List

- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- SQLite
- JWT
- bcryptjs
- CORS
- dotenv
- nodemon
- npm

## 1. HTML

### Full Form

HyperText Markup Language

### Purpose

HTML is used to create the **structure** of web pages.

### In This Project

HTML is used for pages like:

- home page
- login page
- register page
- admin dashboard
- student dashboard
- books pages
- profile page

### Example of HTML Elements

- headings
- forms
- input fields
- buttons
- tables
- sections
- links

### Why We Chose HTML

- simple to learn
- basic requirement for web pages
- works directly in browser
- good for college-level projects

### Important for Viva

You can say:

> HTML gives the basic structure of the page, like forms, buttons, headings, tables, and containers.

## 2. CSS

### Full Form

Cascading Style Sheets

### Purpose

CSS is used for the **design and look** of the website.

### In This Project

CSS is used for:

- colors
- layout
- spacing
- buttons
- forms
- tables
- dashboard cards
- page styling

### CSS Files in This Project

- `style.css`
- `auth.css`
- `form.css`
- `dashboard.css`
- `books.css`
- `table.css`
- `issue.css`
- `profile.css`

### Why We Chose CSS

- simple and standard for styling websites
- separates design from HTML structure
- makes pages look neat and professional

### Important for Viva

You can say:

> CSS is used to make the user interface clean, readable, and user-friendly.

## 3. JavaScript

### Purpose

JavaScript is used to add **logic and interactivity**.

### In This Project

JavaScript does things like:

- handle form submission
- send API requests
- receive backend response
- show messages
- update page content
- redirect users
- save token in local storage

### Frontend JavaScript Files

- `api.js`
- `common.js`
- `auth.js`
- `admin-dashboard.js`
- `student-dashboard.js`
- `admin-books.js`
- `student-books.js`
- `add-book.js`
- `edit-book.js`
- `students.js`
- `student-details.js`
- `issue-book.js`
- `issued-records.js`
- `my-issued-books.js`
- `profile.js`

### Why We Chose JavaScript

- works directly in browser
- same language is also used in backend through Node.js
- good for simple dynamic web projects

### Important for Viva

You can say:

> JavaScript connects frontend with backend. It sends requests, gets responses, and updates the page without writing all data manually in HTML.

## 4. Node.js

### Purpose

Node.js lets us run JavaScript on the server side.

Normally JavaScript works in browser, but Node.js allows JavaScript to run in backend also.

### In This Project

Node.js is used to:

- run the server
- handle backend files
- use npm packages
- connect logic with database

### Why We Chose Node.js

- easy because frontend and backend both use JavaScript
- lightweight and popular
- good for beginner full stack projects

### Important for Viva

You can say:

> Node.js is the runtime environment that runs backend JavaScript code outside the browser.

## 5. Express.js

### Purpose

Express.js is a backend framework built on Node.js.

It makes backend development easier.

### In This Project

Express is used to:

- create routes
- receive requests
- send responses
- use middleware
- connect controllers

### Example

- `/api/auth/login`
- `/api/books`
- `/api/users/students`
- `/api/issues`

### Why We Chose Express.js

- simple syntax
- widely used with Node.js
- easy to create APIs
- perfect for small to medium academic projects

### Important for Viva

You can say:

> Express.js is used to build API routes and backend request handling in a simple way.

## 6. SQLite

### Purpose

SQLite is the database used in this project.

### In This Project

It stores:

- users
- books
- issue records

### Why We Chose SQLite

- lightweight
- file-based
- no separate server required
- easy for college projects
- supports SQL queries and table relationships

### Where Database Is Stored

Database is used in two related places:

- active runtime database file: `database/library.db`
- schema and seed files: `backend/database/schema.sql` and `backend/database/seed.sql`

### Important for Viva

You can say:

> We used SQLite because it is simple, lightweight, and easy to use for an academic project. It stores data in a local file, so setup is easy.

## 7. JWT

### Full Form

JSON Web Token

### Purpose

JWT is used for login authentication.

### How It Works Here

1. User logs in
2. Backend checks email and password
3. Backend creates a token
4. Frontend saves token in local storage
5. Token is sent in later requests
6. Backend checks token before giving protected data

### Why We Chose JWT

- simple token-based authentication
- commonly used in web apps
- works well with frontend-backend projects

### Important for Viva

You can say:

> JWT is used to identify logged-in users and protect private routes.

## 8. bcryptjs

### Purpose

This package is used to **hash passwords**.

That means password is not stored in plain text.

### Why It Is Important

If database is leaked, hashed passwords are safer than normal passwords.

### Important for Viva

You can say:

> bcryptjs is used for password security. It converts normal passwords into hashed form before storing them in the database.

## 9. CORS

### Full Form

Cross-Origin Resource Sharing

### Purpose

CORS allows communication between frontend and backend when needed.

### In This Project

`app.use(cors())` is added in the server.

### Simple Viva Explanation

> CORS helps the server accept requests properly, especially when frontend and backend are communicating.

## 10. dotenv

### Purpose

dotenv loads environment variables from a `.env` file.

### In This Project

It is mainly used for:

- `PORT`
- `JWT_SECRET`

### Important for Viva

> dotenv is used to keep configuration values like secret key and port outside the main code.

## 11. nodemon

### Purpose

nodemon automatically restarts the server when code changes.

### Why Useful

Without nodemon, developer has to restart server manually again and again.

## 12. npm

### Full Form

Node Package Manager

### Purpose

npm is used to install packages like:

- express
- sqlite3
- bcryptjs
- jsonwebtoken

## Why This Stack Was a Good Choice

This project uses a stack that is:

- beginner friendly
- easy to explain in viva
- practical for full stack learning
- fast to build
- simple to run on one computer

## Important for Viva

If asked, “Why did you choose these technologies?”, answer:

> I chose HTML, CSS, and JavaScript for frontend because they are standard web technologies. I chose Node.js and Express.js for backend because they are simple and use JavaScript. I chose SQLite because it is lightweight and easy for a college-level project. I used JWT for authentication and bcryptjs for password security.

## Summary

Each technology in this project has a clear role. HTML creates structure, CSS styles the pages, JavaScript adds logic, Node.js and Express handle backend, SQLite stores data, and JWT secures login.
