# Project Overview

## What Is This Project?

This project is a **Library Management System** made for a college library.

Its main job is to help the library manage:

- students
- books
- book issue records
- book return records
- login and security

In simple words, this project changes the old **manual library work** into a **digital system**.

Instead of writing everything in registers, the librarian or admin can use this system to manage records faster and more accurately.

## Main Goal of the Project

The goal of this project is:

- to store library data in one place
- to reduce manual work
- to avoid mistakes in records
- to track which student has which book
- to show whether a book is available or not

## Real-Life Problem It Solves

In a manual system:

- book records are written by hand
- issue and return entries take time
- searching for a book is slow
- checking due dates is difficult
- mistakes can happen easily

This project solves those problems by storing everything in a database and showing it on web pages.

## Type of Project

This is a **full stack web project**.

That means it has two big parts:

1. **Frontend**
   This is what the user sees in the browser.
   Example: login page, dashboard, books page.

2. **Backend**
   This is the logic behind the scenes.
   It checks login, stores data, reads data, updates records, and talks to the database.

## Current Project Architecture

The current version of the project starts from the repository root.

- root `server.js` starts the project
- root `package.json` contains the run scripts
- `backend/server.js` contains the main Express app
- `public/` contains the frontend files served in the browser
- `database/library.db` is used as the runtime database path through environment configuration

So, the project is still full stack, but now it is also deployment-ready from the root folder.

## Who Uses This Project?

There are two users in this system:

### 1. Admin

Admin can:

- manage books
- see students
- issue books
- return books
- view issue records
- use the admin dashboard

### 2. Student

Student can:

- register
- login
- view books
- search books
- view book details
- see their own issued books
- update their profile

## Basic Working of the Project

The flow is very simple:

1. User opens the website in the browser.
2. User logs in.
3. Frontend sends a request to backend.
4. Backend checks the request.
5. Backend reads or updates the database.
6. Backend sends a response.
7. Frontend shows the result to the user.

## Example

If admin issues a book:

1. Admin opens issue page.
2. Admin selects student and book.
3. Frontend sends issue data to backend.
4. Backend saves a new issue record.
5. Backend reduces available copies of that book.
6. Frontend shows success message.

## Important for Viva

You can explain the project in one short answer like this:

> This project is a full stack Library Management System for a college. It helps admin manage books, students, book issue and return records, and helps students view books and their own issued books. It uses HTML, CSS, JavaScript in frontend, Node.js and Express.js in backend, SQLite as database, and JWT for login authentication.

## Why This Project Is Good for BCA Viva

This project is good for viva because it clearly shows:

- frontend and backend separation
- database usage
- authentication
- role-based access
- CRUD operations
- real-world problem solving

## A Few Important Technical Words

### System

A group of parts working together.

### User

A person using the software.

### Database

A place where data is stored in an organized way.

### Authentication

Checking who the user is.

### Authorization

Checking what the user is allowed to do.

### Full Stack

A project that has both frontend and backend.

## Summary

This project is a web-based college library system with admin and student roles. It helps manage books, students, issue records, and returns in a digital way.
