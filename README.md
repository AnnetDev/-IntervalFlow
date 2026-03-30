# IntervalFlow

IntervalFlow is a Tabata/HIIT/interval training app that combines an exercise library with a configurable interval timer. Users can browse exercises, build a personal collection, and run timed interval workouts — no account required.

## 🌐 Live Demo

- 🔗 **Frontend:** https://interval-flow.vercel.app
- 💚 **API Health Check:** https://intervalflow-api.onrender.com/api/health
- 📚 **Interactive API Docs:** https://intervalflow-api.onrender.com/api-docs

**⚠️ Note:** Free tier API spins down after 15 minutes of inactivity. First request after sleep may take 30–60 seconds to wake up.

---

## ✨ Key Features

### Frontend
- **Exercise Library**: Browse and filter ~60 exercises by difficulty, muscle group, equipment
- **My Exercises**: Create, edit, and delete personal exercises — stored in `localStorage`, no login needed
- **Interval Timer**: Configurable work/rest durations, rounds, exercises per round with audio cues and visual countdown
- **No account required**: All personal data stored locally on device

### Backend API
- **Exercise Management**: Full CRUD for exercises with filtering
- **User Authentication**: Registration and login with JWT tokens
- **Security**: bcrypt password hashing, rate limiting, NoSQL injection prevention
- REST principles, OpenAPI 3.0 documentation

---

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
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/      # UI components (common, exercises, layout)
│   │   ├── hooks/           # Custom hooks (useTimer, useLocalExercises, etc.)
│   │   ├── pages/           # Page components
│   │   └── utils/           # Helpers (audio, constants)
│   ├── vercel.json
│   └── package.json
├── API_DOCUMENTATION.md
├── PROJECT_DESCRIPTION.md
└── README.md
```

---

## 🚀 Quick Start

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`

### Backend

#### 1. Install dependencies

```bash
cd backend
npm install
```

#### 2. Configure environment

Create a `.env` file in the `backend` directory:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/intervalflow
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
```

⚠️ Never commit your `.env` file to Git (already in `.gitignore`).

#### 3. Start MongoDB

```bash
# macOS with Homebrew
brew services start mongodb-community

# or manually
mongod --dbpath ~/data/db
```

#### 4. Seed the database

```bash
npm run seed
```

#### 5. Start the server

```bash
npm run dev      # development (auto-reload)
npm start        # production
```

API runs at `http://localhost:3000`

---

## 🔒 Security Features

- **Password Hashing**: bcrypt with salt (10 rounds)
- **JWT Authentication**: Token-based auth with 7-day expiration
- **Rate Limiting**:
  - Login: 5 attempts per 15 minutes
  - General API: 100 requests per 15 minutes
- **Input Validation**: Mongoose schemas + express-validator
- **NoSQL Injection Prevention**: Sanitized inputs, allowlisted query params
- **Protected Routes**: JWT verification middleware

---

## 📚 Documentation

- **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)** — Complete endpoint reference
- **[PROJECT_DESCRIPTION.md](./PROJECT_DESCRIPTION.md)** — Full project overview and architecture
- **Interactive Docs (Scalar):** `http://localhost:3000/api-docs` or the live URL above

---

## 📝 Available Scripts

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Production build
```

### Backend
```bash
npm start        # Start production server
npm run dev      # Start development server (auto-reload)
npm run seed     # Populate database with exercises
```

---

## 🐛 Troubleshooting

**MongoDB Connection Error**
1. Ensure MongoDB is running: `mongod --dbpath ~/data/db`
2. Check `.env` has correct `MONGO_URI`
3. Verify port 27017 is not in use

**Port Already in Use**
1. Change `PORT` in `.env`
2. Or kill process: `lsof -ti:3000 | xargs kill -9`

**Rate Limit Error (429)**
1. Wait 15 minutes for reset
2. Restart server (development only)

---

## 👤 Author

Anna Baidikova
