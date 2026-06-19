# Limited Edition Sneaker Drop - Frontend

## Live Demo

Frontend:
https://limited-edition-sneaker-drop-fronte.vercel.app/

Backend API:
https://limited-edition-sneaker-drop-backend.onrender.com/

## Source Code

Frontend Repository:
https://github.com/NasifNoor/limited-edition-sneaker-drop-frontend.git

Backend Repository:
https://github.com/NasifNoor/limited-edition-sneaker-drop-backend.git

## Overview

A real-time limited-edition sneaker drop application built with React, Vite, Tailwind CSS, and Socket.io.

Users can:

- Select a user profile
- View available drops
- Reserve stock
- Complete purchases
- See reservation countdowns
- View live stock updates
- View latest purchasers

## Tech Stack

- React 19
- Vite
- Tailwind CSS
- Axios
- Socket.io Client

## Features

### User Selection

Select a user before interacting with drops.

### Scheduled Drops

Drops become available only after their configured start time.

### Live Countdown

Displays:

- Time remaining until a drop goes live
- Time remaining before a reservation expires

### Real-Time Updates

Stock updates are synchronized instantly across all connected clients using Socket.io.

### Purchase Tracking

Displays the latest three purchasers for each drop.

## Project Structure

```text
src/
├── api/
│   └── axios.js
├── services/
│   ├── drop.service.js
│   ├── user.service.js
│   ├── reservation.service.js
│   └── purchase.service.js
├── components/
│   └── DropCard.jsx
├── socket/
│   └── socket.js
├── pages/
│   └── Dashboard.jsx
├── App.jsx
└── main.jsx
```

## Clone Project

```bash
git clone https://github.com/NasifNoor/limited-edition-sneaker-drop-frontend.git

cd limited-edition-sneaker-drop-frontend
```

## Environment Variables

Create a `.env` file:

```env
VITE_BACKEND_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## Installation

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

Application will run on:

```text
http://localhost:5173
```

## Real-Time Testing

To verify real-time synchronization:

1. Open the application in multiple browser windows.
2. Select different users.
3. Reserve a product in one window.
4. Observe stock updates reflected instantly in all windows.
5. Allow a reservation to expire and observe automatic stock recovery.

## Key Design Decisions

### API Layer

All API communication is centralized through Axios service files.

### Socket.io

Used for:

- Stock updates
- Reservation expiration updates
- Purchase completion updates

### Countdown Timers

Implemented on the client using reservation expiration timestamps and drop start times.

### Concurrency Handling

Overselling prevention is handled by the backend through PostgreSQL transactions. The frontend consumes real-time updates emitted by the server.

## Author

M. Nasif Hasan Noor
Portfolio: https://nasifh.vercel.app/
