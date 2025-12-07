# TaskVault

A full-stack task management application with real-time synchronization across multiple tabs and devices. Built with modern TypeScript, React, and Node.js.

## Project Overview

TaskVault is a task management system that allows users to create, update, and delete tasks with real-time sync capabilities. The main focus is on clean architecture, type safety, and user experience. Changes made on one device or tab are instantly reflected everywhere else using WebSocket connections.

The app is fully functional and deployed. Users can sign up, log in, create tasks, filter them by status and priority, and see changes happen in real-time across all their open sessions.

## Features

- User authentication with JWT tokens and bcrypt password hashing
- Create, read, update, and delete tasks
- Filter tasks by status (todo, in progress, done) and priority (low, medium, high)
- Real-time synchronization across browser tabs and devices using Socket.IO
- Optimistic UI updates that don't block the user
- Search tasks by title
- Responsive design with Tailwind CSS
- Type-safe codebase with full TypeScript implementation
- Backend tests with Jest
- Graceful error handling and user feedback

## Tech Stack

**Backend:**
- Node.js with Express for HTTP server
- TypeScript for type safety
- PostgreSQL via Supabase for database
- TypeORM for database interactions
- JWT for authentication
- bcrypt for password hashing
- Socket.IO for real-time communication
- Jest for unit and integration tests
- Helmet for HTTP security headers
- Rate limiting for brute force protection

**Frontend:**
- React 19 with functional components
- Vite for fast builds and HMR
- TypeScript for type safety
- Redux Toolkit for state management
- Axios for HTTP requests with interceptors
- React Router for client-side routing with code splitting
- Tailwind CSS for styling
- React Hook Form for form management
- Socket.IO client for real-time updates

**Deployment:**
- Backend: Compatible with Railway, Heroku, AWS EC2
- Frontend: Deployed on Amplify with SPA routing configured

## System Architecture

The application follows a three-layer architecture:

**Backend Structure:**
- Controllers handle business logic
- Middleware manages authentication, validation, and error handling
- Entities define database schemas with TypeORM
- Routes define API endpoints
- Utilities provide shared functions (password hashing, token generation)

**Frontend Structure:**
- Feature-based organization (auth, tasks)
- Redux for centralized state management
- Custom hooks for data fetching and socket sync
- Shared component library for UI consistency
- Axios with request/response interceptors for API calls
- Socket service for real-time event handling

**Real-Time Layer:**
- Socket.IO server broadcasts events to authenticated user rooms
- JWT authentication on socket connection
- Per-user rooms prevent cross-user data leakage
- Redux dispatch handles state updates from socket events

## Real-Time Functionality Explanation

Real-time sync works by having the server emit socket events whenever a task changes. Here's how it works:

When you create a task:
1. The UI updates immediately (optimistic update)
2. The request is sent to the server
3. The server saves to database and emits a socket event
4. All connected clients in your user room receive the event
5. Redux dispatch updates the state with the confirmed data
6. Other tabs/devices see the task appear instantly

If you have the app open on two devices:
1. Create a task on Device A
2. Device B receives the socket event within milliseconds
3. The task appears on Device B without any manual refresh

The deduplication logic in Redux prevents duplicate tasks when both optimistic updates and socket events add the same task.

## Setup Instructions

### Backend Setup

```bash
cd taskvault_server
npm install
```

Create a `.env` file with the required variables (see Environment Variables section).

```bash
npm run migration:run
npm run dev
```

The server runs on port 5000 by default.

### Frontend Setup

```bash
cd taskvault_client
npm install
```

Create a `.env` file with the required variables.

```bash
npm run dev
```

The frontend runs on port 5173 by default.

### Connecting Both

Make sure `REACT_URL` in the backend `.env` matches your frontend origin, and `VITE_API_URL` in the frontend `.env` points to your backend server.

## Environment Variables

### Backend (.env)

```
NODE_ENV=development
PORT=5000

# Supabase PostgreSQL
DB_HOST=your_supabase_host
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_DATABASE=postgres
DB_SSL=false

# JWT
JWT_ACCESS_SECRET=your_secret_key_here

# CORS
REACT_URL=http://localhost:5173
```

### Frontend (.env)

```
VITE_API_URL=http://localhost:5000
```

## API Overview

The backend exposes REST APIs for authentication and task management. All task endpoints require a valid JWT token.

**Authentication:**
- POST `/api/auth/signup` - Create account
- POST `/api/auth/login` - Login and get token
- GET `/api/auth/me` - Get current user
- POST `/api/auth/logout` - Logout

**Tasks:**
- GET `/api/tasks` - Get all tasks for user
- POST `/api/tasks` - Create new task
- PUT `/api/tasks/:id` - Update task
- DELETE `/api/tasks/:id` - Delete task
- GET `/api/tasks/:id` - Get specific task

Query parameters for GET `/api/tasks`:
- `status` - Filter by status (todo, inprogress, done)
- `priority` - Filter by priority (low, medium, high)
- `search` - Search in task titles
- `page` - Pagination page number
- `limit` - Results per page

## Authentication Flow

1. User signs up with email and password
2. Password is hashed with bcrypt and stored
3. JWT token is generated and returned
4. Token is stored in localStorage on the client
5. For protected routes, token is sent in Authorization header
6. Server verifies token before processing requests
7. Socket connections also validate the token during handshake
8. On logout, token is removed from localStorage

The token expires after 7 days. Expired tokens on protected API calls trigger a logout.

## Assumptions

- Users have a modern browser with localStorage support
- Network connectivity is generally available (app handles disconnects gracefully)
- One user account per email (no multi-account support)
- Tasks are not shared between users (personal task list only)
- Supabase PostgreSQL is used for the database (configuration in TypeORM)
- JWT secret is kept secure and not exposed in frontend code
- Passwords must be at least 6 characters

## Security Practices

- Passwords are hashed with bcrypt (10 salt rounds) before storage
- JWT tokens are signed and verified on each request
- HTTP security headers added with Helmet
- CORS configured to only allow requests from frontend origin
- Rate limiting prevents brute force attacks (100 requests per 15 minutes)
- localStorage is wrapped in try-catch to handle restricted contexts
- Socket connections validated with JWT before accepting messages
- No sensitive data logged to console in production
- HTTPS enforced in production (WSS for WebSocket)

## Performance Optimizations

**Frontend:**
- Code splitting with React lazy loading for pages
- 30-second cache on task list to reduce API calls
- Optimistic UI updates provide instant feedback
- Redux memoization prevents unnecessary re-renders
- Only load components that are needed

**Backend:**
- Database indexes on frequently queried columns (email, userId)
- Connection pooling for database efficiency
- Rate limiting prevents resource exhaustion
- Efficient queries with TypeORM QueryBuilder

**Real-Time:**
- Per-user rooms reduce message broadcasting
- WebSocket fallback to polling if needed
- Automatic reconnection with exponential backoff

## Testing

Backend tests are implemented with Jest and Supertest:

```bash
cd taskvault_server
npm run test
```

Tests cover:
- Authentication endpoints (signup, login)
- Task CRUD operations
- Authorization (user can only access own tasks)
- Input validation
- Error handling

Frontend is manually tested for:
- Multi-tab synchronization
- Multi-device real-time updates
- Optimistic updates working correctly
- Form validation and error display

## Deployment

### Backend Deployment (Example: Railway)

1. Create a Railway project
2. Connect your GitHub repository
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

### Frontend Deployment (Example: Amplify)

1. Connect GitHub repository to Amplify
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
3. Set environment variable `VITE_API_URL` to your backend URL
4. Deploy automatically on push
5. Configure SPA routing for client-side routes

The app handles different deployment environments through environment variables and gracefully falls back if services are unavailable.

## AI Usage Disclosure

This project was developed with AI assistance for:
- Initial project scaffolding and structure
- Code generation for boilerplate components
- Real-time synchronization architecture design
- Documentation and README creation

All code has been reviewed and tested by me. The real-time functionality, error handling, and security practices were implemented with careful consideration of production requirements.

## Final Notes

This is a working production application. The core features are solid, but there are areas that could be enhanced:

- Collaborative task editing (multiple users on same task)
- Task categories and nested organization
- Recurring tasks and due date notifications
- Mobile app with offline support
- More granular permission controls
- Audit logging for compliance

The codebase prioritizes clarity over cleverness. Every component has a clear purpose, and the architecture is straightforward to understand and modify.
