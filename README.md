# Node.js Authentication App boilerplate with MongoDB & PostgreSQL

This is a simple authentication application built using **Node.js** with support for both **MongoDB** (via Mongoose) and **PostgreSQL** (via Prisma). The app features user signup, login, JWT-based authentication, and secure API routes.

## Features

- User signup and login with MongoDB (Mongoose) and PostgreSQL (Prisma).
- JWT-based authentication for protected routes.
- Input validation (email, password) using `express-validator`.
- Rate limiting to prevent abuse (100 requests per 15 minutes).
- Secure headers using `helmet` and XSS protection using `xss-clean`.

## Technologies

- **Node.js**
- **Express.js**
- **Mongoose** (for MongoDB)
- **Prisma** (for PostgreSQL)
- **JWT** (for authentication)
- **bcrypt** (for password hashing)
- **express-validator** (for input validation)
- **dotenv** (for environment variables)

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [PostgreSQL](https://www.postgresql.org/)

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/AchrefHASNI/Expressjs-mongodb-prisma-postgresql-auth-boilerplate.git
cd your-repo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables
Create a ``` .env  ```file in the root of your project with the following contents:
```bash
# Server
PORT=3000

# JWT secret key
JWT_SECRET=your-jwt-secret

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/yourdbname

# PostgreSQL Connection
DATABASE_URL=postgresql://user:password@localhost:5432/yourdatabase

```

### 4. Setup Prisma (PostgreSQL)
Initialize Prisma and run migrations for PostgreSQL:
```bash
npx prisma migrate dev --name init
npx prisma generate

```

### 5. Start the Server
To start the server in development mode:
```bash
npm run dev

```

This will start the server on ``` http://localhost:3000 ```.

## API Endpoints
### Authentication Routes (MongoDB or PostgreSQL)
All requests must specify the db field to choose between MongoDB (```db: 'mongo'```) and PostgreSQL (```db: 'postgres'```).

POST  ```/auth/signup```

 **Description: Registers a new user.** 

 **Request Body**
 ```json
 {
  "username": "exampleUser",
  "email": "example@example.com",
  "password": "yourPassword",
  "db": "mongo" // or "postgres"
}
```

POST  ```/auth/login```

 **Description: Logs in a user and returns a JWT token.** 

 **Request Body**
 ```json
 {
  "email": "example@example.com",
  "password": "yourPassword",
  "db": "mongo" // or "postgres"
}

```

GET ```/protected``` 

**Description:** Access to a protected route that requires a valid JWT token.

**Headers:**

```Authorization: Bearer <JWT token>```

## Error Handling
Errors are centrally handled using a middleware. If an error occurs during processing (e.g., invalid input, authentication failure), the server responds with the appropriate error message.

## Project Structure

```bash
/your-app
│
├── /config
│   └── dbConnect.js          # MongoDB connection logic
│
├── /controllers
│   ├── authController.js     # Handles signup, login logic
│   └── protectedController.js # Handles protected route access
│
├── /middlewares
│   ├── authMiddleware.js     # JWT authentication middleware
│   ├── errorHandler.js       # Global error handler middleware
│   ├── inputValidator.js     # Validates input (email, password)
│   └── rateLimiter.js        # Rate limiting logic
│
├── /models
│   ├── mongooseUser.js       # Mongoose (MongoDB) user model
│   └── prismaUser.js         # Prisma (PostgreSQL) user model
│
├── /routes
│   ├── authRoutes.js         # Authentication routes
│   └── protectedRoutes.js    # Protected routes
│
├── prisma/
│   └── schema.prisma         # Prisma schema for PostgreSQL
│
├── .env                      # Environment variables
├── app.js                    # Main application entry point
├── package.json              # Project metadata and dependencies
└── README.md                 # Project documentation

```



## Authors

- [@AchrefHASNI](https://www.github.com/AchrefHASNI)
