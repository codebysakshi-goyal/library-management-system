# Deployment Guide

## Deployment Target

The project is deployed on Render as a Node.js web service.

Current public URLs:

- App: `https://library-management-system-n79m.onrender.com`
- Health check: `https://library-management-system-n79m.onrender.com/api/health`

## Deployment-Ready Characteristics

The repository is prepared for root-level deployment:

- root `package.json` contains the active scripts
- root `server.js` is the entrypoint
- the backend reads `process.env.PORT || 5000`
- the frontend is served directly by Express
- the backend exposes a health-check endpoint

## Required Environment Variables

### `JWT_SECRET`

This value is required for JWT signing and verification.

Example:

```text
JWT_SECRET=replace-with-a-secure-random-value
```

## Optional Environment Variables

### `PORT`

Render provides this automatically.

### `DB_PATH`

If omitted, the project uses:

```text
backend/database/library.db
```

If you want a custom database path, set `DB_PATH` explicitly.

## Render Configuration

Use these settings:

- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`
- Root Directory: leave empty

## Deployment Process

1. Push the latest repository state to GitHub.
2. Create or open the Render web service.
3. Point Render to this repository.
4. Set the build command to `npm install`.
5. Set the start command to `npm start`.
6. Add `JWT_SECRET` as an environment variable.
7. Deploy the service.

## Post-Deployment Verification

After deployment, verify both URLs:

### Main App

```text
https://library-management-system-n79m.onrender.com
```

### Health Check

```text
https://library-management-system-n79m.onrender.com/api/health
```

The health endpoint should return:

```json
{
  "success": true,
  "message": "Server is running"
}
```

## Common Deployment Issues

### Missing `JWT_SECRET`

Without it, login and token verification will fail.

### Wrong Start Command

If the service does not use `npm start`, Render may not launch the correct root entrypoint.

### Incorrect Database Assumptions

The current default database path is `backend/database/library.db`, not a root-level `database/` folder.

### Health Check Misconfiguration

Use `/api/health`, not `/health`.
