# Deployment Guide

## Why Deployment Is Needed

Deployment means putting the project on the internet so that other people can open and use it through a public URL.

When the project runs only on your laptop:

- only you can access it
- it works only while your computer is on
- your teacher or friends cannot open it directly

When the project is deployed:

- it gets a live website link
- it can be opened from any browser
- it looks more professional during project submission

## Platform Used

For this project, we are using **Render**.

Render is a cloud platform that helps us host web applications easily.

It is a good choice for beginners because:

- it is simple to use
- it connects directly with GitHub
- it supports Node.js projects
- it can deploy without writing Docker files

## What Is Already Prepared In This Project

This project has already been made deployment-ready.

Important setup already done:

- `package.json` is available in the project root
- root `server.js` is available in the project root
- start command is `npm start`
- build command can be `npm install`
- server uses dynamic port with `process.env.PORT`
- `.gitignore` includes `.env`
- SQLite database setup is included
- a health route is available at `/api/health`

## Important Words You Should Know

### Build Command

Build command tells Render what to run before starting the app.

In this project:

```text
npm install
```

This command installs all required packages.

### Start Command

Start command tells Render how to start the application.

In this project:

```text
npm start
```

This command starts the Node.js server.

### Environment Variable

Environment variable is a value stored outside the code.

We use it for important settings like:

- secret keys
- port
- database path

In this project, the most important one is:

```text
JWT_SECRET
```

## What Is JWT_SECRET

`JWT_SECRET` is a secret key used for login token security.

When a user logs in:

- the server creates a token
- the token is signed using `JWT_SECRET`
- later the server verifies that token using the same secret

Without this secret:

- login token generation will fail
- token verification will fail
- protected routes will not work properly

## Example JWT Secret

You can use a strong random value like this:

```text
88754062b7c842dd50a8a309dfcdd7a4abedd90db7a322bbf5e1685d064c6f89
```

On Render, add it like this:

```text
JWT_SECRET=88754062b7c842dd50a8a309dfcdd7a4abedd90db7a322bbf5e1685d064c6f89
```

## Step-By-Step Deployment Process On Render

Follow these steps carefully.

### Step 1: Push Project To GitHub

First, make sure your latest code is pushed to GitHub.

This project is already pushed, so Render can read it from the repository.

### Step 2: Login To Render

1. Open `https://render.com`
2. Sign up or log in
3. Use GitHub login if possible

### Step 3: Create New Web Service

After login:

1. Click `New +`
2. Select `Web Service`
3. Connect your GitHub account if asked
4. Choose this repository

### Step 4: Fill Basic Service Details

Render will ask for some details.

Use these values:

- **Name:** `library-management-system`
- **Environment:** `Node`
- **Branch:** `main`
- **Root Directory:** leave empty

### Step 5: Add Build And Start Commands

Set these values:

- **Build Command:** `npm install`
- **Start Command:** `npm start`

These are the exact commands needed for this project.

### Step 6: Add Environment Variable

Go to the environment variable section and add:

- **Key:** `JWT_SECRET`
- **Value:** `88754062b7c842dd50a8a309dfcdd7a4abedd90db7a322bbf5e1685d064c6f89`

Optional variables:

- `DB_PATH=./database/library.db`

Do not upload `.env` file to GitHub.

### Step 7: Create Web Service

After filling the details:

1. Click `Create Web Service`
2. Render will start deployment
3. It will install packages and start the server

### Step 8: Wait For Deployment To Finish

Render will show logs while deploying.

If everything is correct, the app will become live and Render will generate a public URL like:

```text
https://library-management-system-n79m.onrender.com
```

## Which URL To Open

This project has two useful URLs:

- Main website URL: `https://library-management-system-n79m.onrender.com`
- Health URL: `https://library-management-system-n79m.onrender.com/api/health`

The root URL opens the actual website.

The `/api/health` URL is useful for checking whether the server is running.

## What To Write In Report And README

After deployment, replace the placeholder URL with your actual Render URL in:

- `report.md`
- `README.md`
- any project submission document

Example:

```text
https://library-management-system-n79m.onrender.com
```

## Common Beginner Mistakes

These are very common issues during deployment:

### 1. Wrong Build Command

If build command is wrong, packages will not install.

Correct value:

```text
npm install
```

### 2. Wrong Start Command

If start command is wrong, server will not start.

Correct value:

```text
npm start
```

### 3. Missing JWT_SECRET

If `JWT_SECRET` is not added:

- login may fail
- token verification may fail
- protected pages may not work

### 4. Using Hardcoded Port

Render gives its own port.

That is why the server must use:

```javascript
const PORT = process.env.PORT || 5000;
```

### 5. Forgetting The Health Route

In this project:

- `/` opens the actual website
- `/api/health` is the health-check route

## How To Explain Deployment In Viva

You can say:

> We deployed the project on Render. The GitHub repository was connected to Render, build command was set to `npm install`, start command was set to `npm start`, and `JWT_SECRET` was added as an environment variable. After successful deployment, Render generated a public URL for the project.

## Final Summary

Deployment in this project is simple because:

- the app uses Node.js and Express.js
- Render supports Node projects directly
- the project root is prepared for deployment
- commands are simple
- no Docker is required

If you remember only the most important things, remember these:

- platform is **Render**
- build command is `npm install`
- start command is `npm start`
- important environment variable is `JWT_SECRET`
- public frontend opens on `/`
