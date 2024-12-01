# Full Stack Authentication Application

This is a full-stack application implementing user authentication using React, NestJS, and MongoDB.

## Prerequisites

- Node.js 18.18.2
- MongoDB (see below if you would like to use Docker for that)
- pnpm (recommended) or npm
- Docker and Docker Compose (optional, for devcontainer)
- VS Code (recommended)

## Environment Setup

The application requires two sets of environment variables:

### 1. Docker Environment (Root Directory)

These variables are used by Docker Compose for the MongoDB container:

1. Copy the example environment file in the root directory:

```bash
cp .env.example .env
```

2. Update the values in `.env`:

```env
MONGO_INITDB_ROOT_USERNAME=your_username
MONGO_INITDB_ROOT_PASSWORD=your_password
```

### 2. Backend Environment (backend directory)

These variables are used by the NestJS application:

1. Copy the example environment file in the backend directory:

```bash
cd backend
cp .env.example .env
```

2. Required variables:

| Variable      | Description                                        | Example                                     |
| ------------- | -------------------------------------------------- | ------------------------------------------- |
| `JWT_SECRET`  | Secret key for JWT token generation and validation | `your-super-secret-key`                     |
| `MONGODB_URI` | MongoDB connection string                          | `mongodb://username:password@mongodb:27017` |

> ⚠️ **Important**: Never commit any `.env` files to version control. They are already git-ignored.

## Running the Application

You can run this application in two ways:

### Option 1: Using Devcontainer (Recommended)

This method provides a consistent development environment across different machines.

Prerequisites:

- Docker
- VS Code
- VS Code Remote - Containers extension

Steps:

1. Set up environment variables as described above
2. Open the project in VS Code
3. Press `F1` and select "Remote-Containers: Reopen in Container"
4. Wait for the container to build and initialize

### Option 2: Direct Installation

This method runs the application directly on your machine.

1. Install pnpm if you haven't already:

```bash
npm install -g pnpm
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development servers:

```bash
# Start both frontend and backend
pnpm dev

# Or start them separately:
pnpm --filter @easygenerator/frontend dev
pnpm --filter @easygenerator/backend dev
```

## Project Structure

```
.
├── frontend/                # React frontend application
├── backend/                # NestJS backend application
├── .devcontainer/         # Devcontainer configuration
├── .env.example          # Example Docker environment variables
├── .env                  # Docker environment variables (do not commit)
└── pnpm-workspace.yaml    # pnpm workspace configuration
```

## Available Scripts

In the project root:

- `pnpm dev` - Start both frontend and backend in development mode
- `pnpm build` - Build both frontend and backend
- `pnpm format` - Format all files using Prettier
- `pnpm lint` - Lint and fix files using ESLint

In the frontend directory:

- `pnpm dev` - Start the frontend development server (http://localhost:5173)
- `pnpm build` - Build the frontend for production
- `pnpm preview` - Preview the production build

In the backend directory:

- `pnpm dev` - Start the backend in development mode (http://localhost:3001)
- `pnpm build` - Build the backend
- `pnpm start` - Start the production server
- `pnpm start:debug` - Start the server in debug mode

## Features

- User registration with email validation
- Secure password requirements
- JWT-based authentication
- Protected routes
- MongoDB integration

## Password Requirements

- Minimum length of 8 characters
- Contains at least 1 letter
- Contains at least 1 number
- Contains at least 1 special character

## API Endpoints

### Authentication

- `POST /auth/signup` - Register a new user
- `POST /auth/signin` - Login with existing credentials

## Security Best Practices

- JWT secret is required and must be provided via environment variables
- Passwords are hashed using bcrypt
- JWT tokens expire after 1 hour
- CORS is configured for security
- Input validation using class-validator
- MongoDB injection protection via Mongoose
