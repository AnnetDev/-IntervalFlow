# IntervalFlow

IntervalFlow is a Tabata/HIIT/interval training app that combines exercise selection with a Tabata timer.

## Current Implementation (This Submission)

**This submission contains the MVP backend API focused on exercise management.**


## 🎯 IntervalFlow API Overview

IntervalFlow API is a backend API that enables users to:
- Browse and filter workout exercises by difficulty, muscle group, and equipment
- Create custom exercises and save them to their account
- Authenticate securely with JWT tokens
- Build personalized Tabata/HIIT training programs

This API is designed with security and scalability in mind, featuring rate limiting, password hashing, and protected routes.

## ✨ Key Features

- **Exercise Management**: Full CRUD operations for ~60 pre-loaded exercises
- **User Authentication**: Secure registration and login with JWT tokens
- **Advanced Filtering**: Filter exercises by difficulty, muscle group, equipment
- **Security**: bcrypt password hashing, rate limiting, JWT authentication
- Follows REST principles and RFC 2616 HTTP standards

## 📦 Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v6 or higher)
- npm (comes with Node.js)
- [MongoDB Compass](https://www.mongodb.com/products/compass) (optional)

## 🚀 Quick Start

### 1. Clone and Install
```bash
# Clone the repository
git clone git@github.com:AnnetDev/-IntervalFlow.git
cd IntervalFlow/backend

# Install dependencies
npm install
```

### 2. Configure Environment

**For Local Development:**

Create a `.env` file in the `backend` directory:
```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Configuration - Local
MONGO_URI=mongodb://localhost:27017/intervalflow

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-12345
JWT_EXPIRE=7d
```
⚠️ **Important:** Never commit your `.env` file to Git (already in `.gitignore`).

**Note:** The production API is already deployed at Render
check https://intervalflow-api.onrender.com/api/health 

**Security Note:**
- This is an **example configuration** for local development
- Never commit your actual `.env` file to Git (already in `.gitignore`)
- In production, use **strong random secrets** and **environment variables**

⚠️ **Important**: Change `JWT_SECRET` to strong random secrets in production!

### 3. Start MongoDB

**Option A: Background service (macOS with Homebrew)**
```bash
brew services start mongodb-community
```

**Option B: Manual start (any OS)**

Open a new terminal window:
```bash
mongod --dbpath ~/data/db
```

Keep this terminal open while running the API.

### 4. Seed the Database

Populate the database with 60+ exercises:
```bash
npm run seed
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing exercises
✅ 60+ exercises added to database
👋 Disconnected from MongoDB
```

### 5. Start the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

Expected output:
```
✅ MongoDB Connected: localhost
📊 Database: intervalflow
🚀 Server is running on port 3000
🌐 API URL: http://localhost:3000
💚 Health check: http://localhost:3000/api/health
```

✅ **The API is now running at** `http://localhost:3000`

### 6. Test the API

Open your browser or Postman/Yaak and visit:
```
http://localhost:3000/api/health
```

You should see:
```json
{
  "success": true,
  "message": "IntervalFlow API is running! 🏃‍♂️",
  "timestamp": "2026-02-04T21:30:00.000Z"
}
```

## 🌐 Live Demo

**Production API:**
- 🔗 Base URL: https://intervalflow-api.onrender.com/api
- 💚 Health Check: https://intervalflow-api.onrender.com/api/health
- 📚 Interactive API Docs: https://intervalflow-api.onrender.com/api-docs

**Database:** MongoDB Atlas (Cloud)

**⚠️ Note:** Free tier spins down after 15 minutes of inactivity. First request after sleep may take 30-60 seconds to wake up. A cron job pings the API every 10 minutes to keep it active.

**Test the API:**
```bash
# Get all exercises
curl https://intervalflow-api.onrender.com/api/exercises

# Get exercises by difficulty
curl https://intervalflow-api.onrender.com/api/exercises?difficulty=beginner

# Health check
curl https://intervalflow-api.onrender.com/api/health
```


## 📚 Documentation

### Interactive API Documentation (Scalar)

Once the server is running, you can access the **interactive API documentation** at:
```
http://localhost:3000/api-docs
```

### Written Documentation

For detailed written documentation, see:

**[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

## 📁 Project Structure
```
intervalflow/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── models/          # Mongoose schemas (Exercise, User)
│   │   ├── controllers/     # Business logic
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Auth, rate limiting
│   │   ├── utils/           # Helper functions
│   │   ├── seeders/         # Database seed scripts
│   │   └── server.js        # Entry point
│   ├── .env                 # Environment variables
│   ├── package.json
│   └── README.md
├── frontend/                # (Future development)
├── API_DOCUMENTATION.md     # Complete API docs
└── README.md                # This file
```

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt (10 rounds)
- **JWT Authentication**: Token-based auth with expiration
- **Rate Limiting**: 
  - Login: 5 attempts per 15 minutes
  - General API: 100 requests per 15 minutes
- **Input Validation**: Mongoose schemas + express-validator
- **NoSQL Injection Prevention**: Sanitized inputs
- **Protected Routes**: JWT verification middleware

## 🧪 Quick Test

1. **Register a user:**
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

2. **Get exercises:**
```bash
curl http://localhost:3000/api/exercises?difficulty=beginner
```


## 🐛 Troubleshooting

### MongoDB Connection Error

1. Ensure MongoDB is running: `mongod --dbpath ~/data/db`
2. Check `.env` file has correct `MONGO_URI`
3. Verify port 27017 is not in use

### Port Already in Use

1. Stop other processes using port 3000
2. Change `PORT` in `.env` file
3. Kill process: `lsof -ti:3000 | xargs kill -9`

### Rate Limit Error (429)

1. Wait 15 minutes for reset
2. Restart server (development only)

## 📝 Available Scripts
```bash
npm start      # Start production server
npm run dev    # Start development server (auto-reload)
npm run seed   # Populate database with exercises
```

## 👤 Author

Anna Baidikova