## Project: IntervalFlow — Tabata/HIIT/Interval Training Builder + Timer

IntervalFlow is a Tabata/HIIT/interval training app that combines exercise selection with a Tabata timer. It allows users to choose exercises and automatically populate a classic Tabata timer to run interval workouts.

---

## Current Implementation (This Submission)

**This submission contains the MVP backend API focused on exercise management.**

### Implemented Features:

#### ✅ Exercise Management API
- **Public endpoints** (no authentication required):
  - `GET /api/exercises` - Browse all exercises with filtering (difficulty, muscle group, equipment)
  - `GET /api/exercises/:id` - Get a single exercise
  
- **Protected endpoints** (require JWT authentication):
  - `POST /api/exercises` - Create custom exercises
  - `PUT /api/exercises/:id` - Update exercises
  - `DELETE /api/exercises/:id` - Delete exercises

#### ✅ User Authentication
- `POST /api/auth/register` - User registration with bcrypt password hashing
- `POST /api/auth/login` - User login with JWT token generation

#### ✅ Security Features
- Password hashing with bcrypt (10 rounds)
- JWT-based authentication with 7-day token expiration
- Rate limiting:
  - Login attempts: 5 per 15 minutes per IP
  - General API: 100 requests per 15 minutes per IP
- Input validation with Mongoose schemas
- Protection against NoSQL injection

#### ✅ Database
- ~60 pre-populated exercises with metadata (difficulty, muscle group, equipment, etc.)
- MongoDB with Mongoose ODM
- Seed scripts for easy database setup

#### ✅ Documentation
- Interactive API documentation (Scalar) at `/api-docs`
- Comprehensive README.md and API_DOCUMENTATION.md
- OpenAPI 3.0 specification

---

## Exercise Visibility and Access Control

### For Unauthenticated Users:
- ✅ Can **view** all public exercises (seed exercises)
- ✅ Can **create** custom exercises via API
- ❌ Custom exercises are **NOT saved** to the database (would be stored locally in future frontend implementation)
- ❌ Cannot access exercises from other devices

### For Authenticated Users:
- ✅ Can **view** all public exercises (seed exercises)
- ✅ Can **create** custom exercises that are saved to the database
- ✅ Custom exercises are **private** (linked to user via `createdBy` field)
- ✅ Can **access** their custom exercises from any device after login
- ❌ Custom exercises are **NOT added** to the public exercise library
- ❌ Cannot modify or delete public seed exercises

### Future: Admin/Trainer Role (Planned)
- Will be able to add exercises to the **public library**
- Exercises will undergo content moderation/validation before being added
- Prevents inappropriate, harmful, or low-quality content from entering the public database

**Note:** User-created exercises do not affect the main public exercise database. This separation ensures content quality and prevents abuse while allowing users to customize their experience.

---

## Future Development (Planned Features)

The following features are **planned for future iterations** and are not included in this submission:

### 🔄 Workout Management API
- Create, read, update, delete workout programs
- Structure workouts as collections of rounds with exercises
- Save and retrieve personalized Tabata/HIIT workouts

### 🔄 Tabata Timer Integration
- Frontend timer component
- Support for customizable work/rest intervals
- Visual and audio cues for interval transitions

### 🔄 Enhanced Exercise Management
- **TODO:** Add unique name validation for exercises (prevent duplicate names)
- **TODO:** ? Exercise image uploads
- **TODO:** ? Exercise video demonstrations
- **TODO:** ? Advanced filtering (by calories burned, intensity, etc.)

### 🔄 User Flows

#### Flow 1: Local-Only (No Login Required)
Users can:
1. Browse and filter exercises
2. Create workouts using the Tabata timer
3. Save workouts locally (browser localStorage)
4. Edit workouts: add/remove/reorder exercises
5. Create custom exercises (stored locally only)

**Storage:** All data stored on the device (localStorage/IndexedDB)

#### Flow 2: Cloud-Sync (With Account)
Same functionality as Flow 1, plus:
- Registration and login
- Access workouts from any device
- Custom exercises synced across devices
- Workout history and statistics

**Storage:** All data stored in MongoDB database

### 🔄 Deployment
- **TODO:** Deploy database to MongoDB Atlas (cloud)
- **TODO:** Deploy API to cloud hosting (Heroku, Railway, or similar)
- **TODO:** Deploy frontend with React.js

---

## Timer Specification (Future Frontend)

* One round contains **8 exercises** (30 seconds each) and **8 rest intervals** (10 seconds each).
* Between rounds there is a **1-minute break**.
* An average workout has **5–6 rounds**.
* Each round contains different exercises. Rounds are usually different, but sometimes a round can repeat.

---

## Tech Stack

### Current Implementation:
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (jsonwebtoken), bcrypt
- **Security:** express-rate-limit, express-validator
- **Documentation:** Scalar (OpenAPI 3.0)
- **Tools:** MongoDB Compass, Postman/Yaak

### Planned Additions:
- **Frontend:** React.js, JSX
- **State Management:** React Context API or Redux (TBD)
- **Timer UI:** Custom React component
- **Deployment:** MongoDB Atlas, Heroku/Railway, Netlify/Vercel

---

## Data Model (Current)

### Exercise Schema
```javascript
{
  name: String,              // Exercise name
  description: String,       // How to perform
  difficulty: String,        // beginner | intermediate | advanced
  muscleGroup: String,       // cardio | legs | core | upper-body | etc.
  duration: Number,          // Default duration in seconds (30)
  equipment: String,         // none | dumbbells | mat | kettlebell | chair
  createdBy: ObjectId,       // User who created (null for public exercises)
  createdAt: Date,
  updatedAt: Date
}
```

### User Schema
```javascript
{
  username: String,          // Unique username
  email: String,             // Unique email
  password: String,          // Bcrypt hashed password
  createdAt: Date,
  updatedAt: Date
}
```

### Future: Workout Schema (Planned)
```javascript
{
  name: String,
  userId: ObjectId,
  rounds: [{
    exercises: [ObjectId],   // Array of exercise IDs
    workInterval: Number,    // 30 seconds
    restInterval: Number     // 10 seconds
  }],
  breakBetweenRounds: Number, // 60 seconds
  createdAt: Date,
  updatedAt: Date
}
```

---

## Security Implementation

### ✅ Threat 1: Credential Attacks and Password Leakage (AUTH)

**Implemented Mitigation:**
1. **Bcrypt password hashing** with salt (10 rounds) - passwords never stored in plain text
2. **Rate limiting** on auth endpoints:
   - Login: 5 attempts per 15 minutes per IP
   - Registration: 5 attempts per 15 minutes per IP
3. **JWT security:**
   - Tokens expire after 7 days
   - Secret stored in environment variables
   - Protected routes validate token before access
   - Generic "invalid credentials" response (prevents user enumeration)

### ✅ Threat 2: NoSQL Injection

**Implemented Mitigation:**
1. **Mongoose schema validation** - enforces expected field types and formats
2. **Allowlisted query parameters** - only `difficulty`, `muscleGroup`, `equipment` accepted
3. **Safe query construction** - user input sanitized before database queries
4. **No raw object passing** - all inputs mapped to safe query objects

### 🔄 Threat 3: Data Loss and Availability (Backups)

**Planned for Production:**
1. **Automated scheduled backups** using `mongodump`
2. **Backup storage** in separate location (cloud storage bucket)
3. **Rotating backups** (daily for 7 days, weekly for 4 weeks)
4. **Tested restore procedures** using `mongorestore`

**Current Development Setup:**
- Seed scripts (`npm run seed`) for quick database recreation
- Local MongoDB instance with manual backups as needed

---

## Installation & Setup

### Dependencies:
```bash
npm install express mongoose bcryptjs jsonwebtoken dotenv express-validator express-rate-limit cors @scalar/express-api-reference
```

**Package purposes:**
- `express` - Web server framework
- `mongoose` - MongoDB ODM
- `bcryptjs` - Password hashing
- `jsonwebtoken` - JWT token generation/verification
- `dotenv` - Environment variable management
- `express-validator` - Input validation
- `express-rate-limit` - Rate limiting middleware
- `cors` - Cross-origin resource sharing
- `@scalar/express-api-reference` - Interactive API documentation

### Quick Start:
1. Install dependencies: `npm install`
2. Create `.env` file with configuration
3. Start MongoDB: `mongod --dbpath ~/data/db`
4. Seed database: `npm run seed`
5. Start server: `npm run dev`
6. Access API docs: `http://localhost:3000/api-docs`

For detailed setup instructions, see [README.md](./README.md)

---

## API Documentation

### Interactive Documentation (Scalar)
- **URL:** `http://localhost:3000/api-docs`
- Test endpoints directly in browser
- Built-in authentication support
- Request/response examples
- Beautiful, searchable interface

### Written Documentation
- **README.md** - Setup, installation, quick start
- **API_DOCUMENTATION.md** - Complete endpoint reference, examples, testing guide

---

## Status Codes (RFC 2616 Compliant)

| Code | Usage |
|------|-------|
| 200 | OK - Successful GET, PUT, DELETE |
| 201 | Created - Successful POST |
| 400 | Bad Request - Invalid input, validation error |
| 401 | Unauthorized - Missing/invalid token, wrong credentials |
| 404 | Not Found - Resource doesn't exist |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Unexpected server error |

---

## HTTP Methods

| Method | Usage | Authentication |
|--------|-------|----------------|
| GET | Retrieve exercises | Not required |
| POST | Create exercise, register/login | Required (except auth) |
| PUT | Update exercise | Required |
| DELETE | Delete exercise | Required |

---

## Project Structure
```
intervalflow/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js      # MongoDB connection
│   │   │   └── openapi.js       # API specification
│   │   ├── models/
│   │   │   ├── Exercise.js      # Exercise schema
│   │   │   └── User.js          # User schema
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── exerciseController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── exerciseRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js          # JWT verification
│   │   │   └── rateLimiter.js   # Rate limiting
│   │   ├── utils/
│   │   │   └── generateToken.js
│   │   ├── seeders/
│   │   │   ├── exercisesSeed.js # Seed data
│   │   │   └── seed.js          # Seed script
│   │   └── server.js            # Entry point
│   ├── .env
│   ├── .gitignore
│   └── package.json
├── frontend/                    # (Future development)
├── README.md
├── API_DOCUMENTATION.md
└── description.txt              # This file
```

---

## Future Improvements & TODO

### High Priority:
- [ ] Implement Workout model and CRUD endpoints
- [ ] Add unique name validation for exercises
- [ ] Deploy to production (MongoDB Atlas + cloud hosting)
- [ ] Build React frontend with Tabata timer

### Medium Priority:
- [ ] Admin/Trainer role management
- [ ] Exercise content moderation system
- [ ] Exercise images and video demonstrations
- [ ] Workout history and statistics
- [ ] Social features (share workouts)

### Low Priority:
- [ ] Advanced filtering (calories, intensity)
- [ ] Workout recommendations based on user level
- [ ] Progress tracking and analytics
- [ ] Mobile app (React Native)

---

## Summary

This submission delivers a **production-ready MVP backend API** for exercise management with:
- ✅ Secure authentication (bcrypt + JWT)
- ✅ Rate limiting and input validation
- ✅ RESTful design following RFC 2616
- ✅ Comprehensive documentation (Scalar + written docs)
- ✅ Clean, maintainable code structure
- ✅ Easy local setup with seed data

The foundation is built for future expansion into a complete Tabata/HIIT training platform with workout management, timer functionality, and frontend integration.

---

**Author:** Anna Baidikova  
**Course:** Web Development, Hyper Island  
**Date:** February 2026