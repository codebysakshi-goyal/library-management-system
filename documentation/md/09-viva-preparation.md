# Viva Preparation

## How To Study This Project

Since you said you are starting from zero knowledge, study in this order:

1. Read `01-project-overview.md`
2. Read `02-features-and-user-flow.md`
3. Read `03-technologies-used.md`
4. Read `04-folder-structure.md`
5. Read `05-backend-explanation.md`
6. Read `06-frontend-explanation.md`
7. Read `07-database-and-api.md`
8. Read `08-complete-working-flow.md`
9. Revise this file last

## Very Short Project Introduction for Viva

You can say:

> My project is a Campus Library Management System. It is a full stack web application made for managing books, students, issue records, and return records in a college library. It has two roles, admin and student. Admin can manage books and issue-return operations, while students can view books, their profile, and their own issued books.

## Short Technology Introduction for Viva

You can say:

> I used HTML, CSS, and JavaScript for frontend. I used Node.js and Express.js for backend. I used SQLite for database, JWT for authentication, and bcryptjs for password hashing.

## Common Viva Questions With Answers

## 1. What is your project about?

Answer:

> It is a Library Management System for a college. It helps manage books, students, issue records, returns, login, and role-based access digitally.

## 2. Why did you make this project?

Answer:

> I made this project to reduce manual work in library management and make book and student record handling easier, faster, and more accurate.

## 3. What are the main modules of your project?

Answer:

> The main modules are authentication, book management, student management, issue and return management, dashboard, profile management, and role-based access.

## 4. Which technologies did you use?

Answer:

> I used HTML, CSS, JavaScript, Node.js, Express.js, SQLite, JWT, bcryptjs, CORS, dotenv, and npm.

## 5. Why did you choose SQLite?

Answer:

> I chose SQLite because it is lightweight, easy to set up, file-based, and very suitable for a college-level project.

## 6. Why did you use JWT?

Answer:

> I used JWT for authentication. It helps identify logged-in users and protect private routes.

## 7. Why did you use bcryptjs?

Answer:

> I used bcryptjs to hash passwords before storing them in the database, which improves security.

## 8. What is the difference between authentication and authorization?

Answer:

> Authentication means checking who the user is. Authorization means checking what the user is allowed to do.

## 9. What is the difference between frontend and backend?

Answer:

> Frontend is the visible part of the website that users interact with. Backend is the hidden part that handles logic, database operations, and API responses.

## 10. What is an API?

Answer:

> API is a way for frontend and backend to communicate with each other using requests and responses.

## 11. What is middleware?

Answer:

> Middleware is code that runs before the main controller logic. In my project, middleware is used for authentication and role checking.

## 12. What is a controller?

Answer:

> Controller contains the main logic of a feature. It receives request data, performs validation, runs database queries, and sends response.

## 13. What is a route?

Answer:

> Route is the backend path that connects a URL to a controller function.

## 14. How does login work in your project?

Answer:

> User enters email and password. Backend checks the credentials. If correct, backend generates a JWT token and sends it to frontend. Frontend stores token in local storage and uses it for future protected requests.

## 15. How does book issue work?

Answer:

> Admin selects a student, a book, and a due date. Backend validates the request, creates a new issue record, and reduces available copies of that book by one.

## 16. How does return work?

Answer:

> Admin clicks return. Backend updates the issue record status to returned, stores return date, and increases available copies of the book by one.

## 17. What tables are present in your database?

Answer:

> There are three main tables: users, books, and issue_records.

## 18. What is role-based access in your project?

Answer:

> Role-based access means admin and student have different permissions. Admin can manage library data, while student can only access student features.

## 19. What is local storage used for?

Answer:

> Local storage is used to save token and logged-in user data in the browser.

## 20. What are the strong points of your project?

Answer:

> The strong points are clean folder structure, role-based access, secure login, proper database design, issue-return logic, and easy-to-use interface.

## Important for Viva: Must-Remember Points

- This is a full stack web project.
- It has two roles: admin and student.
- Passwords are hashed using bcryptjs.
- Login is protected using JWT.
- SQLite database stores all records.
- The backend flow is route -> middleware -> controller -> database -> response.
- Issueing a book decreases available copies.
- Returning a book increases available copies.
- Search and category filter are supported in books module.

## Small Honest Notes You Can Say If Asked Deep Questions

If you forget something technical, use honest simple answers like:

> This part is handled in the backend controller where validation and database update are done.

> I used helper functions to keep repeated frontend logic common.

> I separated routes and controllers to keep the code clean and easier to maintain.

These answers are safe and correct.

## Final Revision Checklist

Before viva, make sure you can explain:

- what the project does
- who are the users
- features of admin
- features of student
- why these technologies were used
- folder structure
- database tables
- login flow
- issue flow
- return flow
- role-based access

## Summary

If you revise all files in this `documentation/` folder, you should be able to answer most project viva questions in simple and confident language.
