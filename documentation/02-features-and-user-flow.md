# Features And User Flow

## Main Features of the Project

This project has two main sides:

- admin side
- student side

## Admin Features

Admin is the main controller of the system.

Admin can do the following:

### 1. Admin Login

Admin can log in using the default account:

- Email: `admin@library.com`
- Password: `admin123`

### 2. Dashboard

Admin dashboard shows:

- total books
- total students
- total issued books
- total available books
- recently added books
- recent issue records

### 3. Manage Books

Admin can:

- add a new book
- view all books
- search books
- filter books by category
- edit book details
- delete a book

### 4. Manage Students

Admin can:

- see student list
- view student details
- see issue history of a student

### 5. Issue Book

Admin can issue a book to a student by selecting:

- student
- book
- due date

### 6. Return Book

Admin can mark an issued book as returned.

When book is returned:

- issue record status becomes `returned`
- return date is stored
- available copies increase by 1

### 7. Issued Records Page

Admin can view all issue records with:

- student name
- book title
- issue date
- due date
- return date
- status
- overdue status

## Student Features

Student has fewer rights than admin.

Student can do the following:

### 1. Student Registration

New student can create an account from the register page.

Required fields:

- full name
- email
- password
- roll number
- course
- phone number

### 2. Student Login

Student can log in with registered credentials.

### 3. Student Dashboard

Student dashboard shows:

- total issued books
- overdue books
- returned books
- role

### 4. View Books

Student can:

- see all books
- search by title or author
- filter by category
- view availability

### 5. View Book Details

Student can open a single book page and see:

- title
- author
- category
- ISBN
- shelf location
- description
- availability

### 6. My Issued Books

Student can see only their own issue records:

- book title
- author
- category
- issue date
- due date
- return date
- status
- overdue status

### 7. Update Profile

Student can update:

- full name
- course
- phone number

Student cannot change:

- email
- roll number
- role

## Role-Based Access

This project uses **role-based access control**.

That means:

- admin pages are only for admin
- student pages are only for student

If a user tries to open the wrong page, the system sends them to `unauthorized.html`.

## Feature List in Simple Viva Language

You can say:

> The project has two roles: admin and student. Admin can manage books, students, issue records, and returns. Student can register, login, view books, view issued books, and update profile. The project also supports search, filter, authentication, authorization, and overdue status.

## Step-by-Step User Flow

## Public Flow

1. User opens `index.html`
2. User chooses login or registration

## Student Flow

1. Student registers from `register.html`
2. Student logs in from `login.html`
3. Token and user data are saved in browser local storage
4. Student is redirected to `student-dashboard.html`
5. Student can open books page, book details page, my issued books page, and profile page

## Admin Flow

1. Admin logs in from `login.html`
2. Token and user data are saved in local storage
3. Admin is redirected to `admin-dashboard.html`
4. Admin can open books, students, issue book, issued records, and profile pages

## Important Business Rules in This Project

These are very important for viva because they show project logic.

### Book Rules

- book ISBN must be unique
- total copies must be at least 1
- available copies cannot go below 0
- a book cannot be deleted if it is currently issued

### Student Rules

- email must be unique
- roll number must be unique
- student cannot be deleted if there is an active issued book

### Issue Rules

- only admin can issue books
- only admin can return books
- due date cannot be before today
- a book cannot be issued if available copies are 0
- same student cannot have the same book issued twice at the same time

## Important for Viva

If examiner asks, “What are the major modules of your project?”, answer:

> The main modules are authentication module, book management module, student management module, issue and return module, dashboard module, profile module, and role-based access module.

## Summary

The project supports all basic library activities needed in a college environment. Admin handles management work, and students can access only their own useful information.
