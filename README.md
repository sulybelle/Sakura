# Sakura Music App

Spotify-inspired music streaming web app with sakura accent design.

## Stack

- Frontend: React 18 + Vite + React Router + Axios + Lucide Icons
- Backend: Node.js + Express + Sequelize
- Database: PostgreSQL
- Auth: JWT + bcrypt password hashing

## Main Features

- User authentication (`register`, `login`, `me`)
- Profile page (username/email/avatar update + password change)
- Tracks list and search
- Player with queue, play/pause, next/prev, seek and volume
- Like tracks locally
- Playlists: create, list, open, add/remove tracks, delete
- Right panel with current track and artist details
- Responsive Spotify-like layout (sidebar, main area, right panel, bottom player)
- 404 pages (frontend and API)

## Project Structure

```text
Sakura/
  frontend/
    src/
      components/
      pages/
      routes/
      context/
      api/
      styles/
  backend/
    controllers/
    models/
    routes/
    middleware/
    config/
```

## Local Setup

### 1) Backend

Install and run:

```bash
cd backend
npm install
npm start
```

### 2) Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5001/api
VITE_MEDIA_URL=http://localhost:5001
```

Install and run:

```bash
cd frontend
npm install
npm run dev
```

Build production frontend:

```bash
npm run build
```

## API (Core Endpoints)

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

### Users

- `GET /api/users/:id` (protected)
- `PUT /api/users/:id` (protected)

### Tracks

- `GET /api/tracks`
- `GET /api/tracks/search?q=...`
- `GET /api/tracks/:id`

### Playlists

- `GET /api/playlists` (protected)
- `POST /api/playlists` (protected)
- `GET /api/playlists/:id` (protected)
- `DELETE /api/playlists/:id` (protected)
- `POST /api/playlists/:id/tracks` (protected)
- `DELETE /api/playlists/:id/tracks/:trackId` (protected)

## Manual Test Checklist

- Register/Login with valid and invalid inputs
- Create playlist and verify it appears on Home
- Delete playlist from Home and Library
- Add track to playlist with `+` menu
- Play track and check right panel + bottom player sync
- Verify player is closed on initial load and opens when track starts
- Test unknown frontend URL -> 404 page
- Test unknown backend API URL -> JSON 404 response

## Deployment (Render)

- Backend service: Node web service from `backend`
- Frontend service: Static site from `frontend`
- Add environment variables from sections above
- Keep `VITE_API_URL` pointing to your Render backend `/api`
- Keep `VITE_MEDIA_URL` pointing to backend root for `/uploads`

Render deployment is ready; domain binding can be configured manually.
