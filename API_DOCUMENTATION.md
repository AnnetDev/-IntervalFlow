# IntervalFlow API (MVP) Documentation

Complete API reference for IntervalFlow - Tabata/HIIT workout management API.

## 🌐 Base URL
```
http://localhost:3000/api
```

All endpoints are prefixed with `/api`.

## 🌐 Interactive Documentation

**The easiest way to explore and test this API is through the interactive Scalar documentation.**

Once the server is running, visit:
```
http://localhost:3000/api-docs
```

## 📊 Status Codes

This API uses standard HTTP status codes as defined in RFC 2616:

| Code | Description | When Used |
|------|-------------|-----------|
| **200** | OK | Successful GET, PUT, or DELETE request |
| **201** | Created | Successful POST request (resource created) |
| **400** | Bad Request | Invalid data, validation error, or malformed request |
| **401** | Unauthorized | Missing, invalid, or expired authentication token |
| **404** | Not Found | Resource doesn't exist or invalid ID |
| **429** | Too Many Requests | Rate limit exceeded |
| **500** | Internal Server Error | Unexpected server error |

## 📦 Response Format

All API responses follow this consistent JSON format:

**Success Response:**
```json
{
  "success": true,
  "data": { ... }
}
```

or
```json
{
  "success": true,
  "count": 10,
  "data": [ ... ]
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error description"
}
```

or (with validation errors):
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Username is required",
    "Email must be valid"
  ]
}
```

---

## 🔐 Authentication

### Overview

This API uses **JWT (JSON Web Tokens)** for authentication. Protected endpoints require a valid token in the `Authorization` header.

**Token Format:**
```
Authorization: Bearer <your-jwt-token>
```

**Token Expiration:** 7 days (configurable)

---

### Register New User

Create a new user account.
```http
POST /api/auth/register
Content-Type: application/json
```

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Validation Rules:**
- `username`: 3-30 characters, required
- `email`: Valid email format, unique, required
- `password`: Minimum 6 characters, required

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "679a1b2c3d4e5f6g7h8i9j0k",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OWExYjJj..."
  }
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "User with this email already exists"
}
```

or
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Password must be at least 6 characters"
  ]
}
```

**Rate Limit:** 5 requests per 15 minutes per IP

---

### Login

Authenticate and receive a JWT token.
```http
POST /api/auth/login
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "679a1b2c3d4e5f6g7h8i9j0k",
    "username": "johndoe",
    "email": "john@example.com",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

**Note:** The API returns a generic "Invalid credentials" message for both incorrect email and password to prevent user enumeration attacks.

**Rate Limit:** 5 failed attempts per 15 minutes per IP

---

### Using the Token

After receiving a token from registration or login, include it in the `Authorization` header for protected endpoints:

**Example (curl):**
```bash
curl -X POST http://localhost:3000/api/exercises \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json" \
  -d '{"name":"Push-ups","description":"...","difficulty":"intermediate","muscleGroup":"upper-body"}'
```

**Example (Postman/Yaak):**
1. Go to Headers tab
2. Add header:
   - Key: `Authorization`
   - Value: `Bearer YOUR_TOKEN_HERE`

---

## 💚 Health Check

### Check API Status

Verify that the API is running.
```http
GET /api/health
```

**No authentication required.**

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "IntervalFlow API is running! 🏃‍♂️",
  "timestamp": "2026-02-04T21:30:00.000Z"
}
```

---

## 🏋️ Exercises

### Get All Exercises

Retrieve all exercises with optional filtering.
```http
GET /api/exercises
```

**No authentication required.**

**Query Parameters (optional):**

| Parameter | Type | Values | Example |
|-----------|------|--------|---------|
| `difficulty` | string | `beginner`, `intermediate`, `advanced` | `?difficulty=beginner` |
| `muscleGroup` | string | `cardio`, `legs`, `glutes`, `core`, `upper-body`, `back`, `full-body`, `mobility`, `balance` | `?muscleGroup=cardio` |
| `equipment` | string | `none`, `dumbbells`, `mat`, `kettlebell`, `chair`, `resistance-band` | `?equipment=none` |

**Examples:**
```http
GET /api/exercises
GET /api/exercises?difficulty=beginner
GET /api/exercises?muscleGroup=cardio
GET /api/exercises?difficulty=intermediate&equipment=none
GET /api/exercises?muscleGroup=legs&difficulty=advanced
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "count": 60,
  "data": [
    {
      "_id": "679a1b2c3d4e5f6g7h8i9j0k",
      "name": "Jumping Jacks",
      "description": "Stand with feet together, jump while spreading legs and raising arms overhead, then return to starting position",
      "difficulty": "beginner",
      "muscleGroup": "cardio",
      "duration": 30,
      "equipment": "none",
      "createdBy": null,
      "createdAt": "2026-02-04T12:00:00.000Z",
      "updatedAt": "2026-02-04T12:00:00.000Z"
    },
    {
      "_id": "679a2b3c4d5e6f7g8h9i0j1k",
      "name": "Push-ups",
      "description": "In plank position, lower body until chest nearly touches floor, push back up",
      "difficulty": "intermediate",
      "muscleGroup": "upper-body",
      "duration": 30,
      "equipment": "none",
      "createdBy": null,
      "createdAt": "2026-02-04T12:00:00.000Z",
      "updatedAt": "2026-02-04T12:00:00.000Z"
    }
  ]
}
```

---

### Get Single Exercise

Retrieve a specific exercise by ID.
```http
GET /api/exercises/:id
```

**No authentication required.**

**Path Parameters:**
- `id` - MongoDB ObjectId of the exercise

**Example:**
```http
GET /api/exercises/679a1b2c3d4e5f6g7h8i9j0k
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "679a1b2c3d4e5f6g7h8i9j0k",
    "name": "Jumping Jacks",
    "description": "Stand with feet together, jump while spreading legs and raising arms overhead, then return to starting position",
    "difficulty": "beginner",
    "muscleGroup": "cardio",
    "duration": 30,
    "equipment": "none",
    "createdBy": null,
    "createdAt": "2026-02-04T12:00:00.000Z",
    "updatedAt": "2026-02-04T12:00:00.000Z"
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Exercise not found"
}
```

---

### Create Exercise

Create a new custom exercise.
```http
POST /api/exercises
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**🔒 Authentication required.**

**Request Body:**
```json
{
  "name": "Mountain Climbers",
  "description": "In plank position, alternate bringing knees toward chest in a running motion",
  "difficulty": "intermediate",
  "muscleGroup": "full-body",
  "duration": 30,
  "equipment": "none"
}
```

**Required Fields:**
- `name` (string, max 100 characters)
- `description` (string, max 500 characters)
- `difficulty` (enum: `beginner`, `intermediate`, `advanced`)
- `muscleGroup` (enum: `cardio`, `legs`, `glutes`, `core`, `upper-body`, `back`, `full-body`, `mobility`, `balance`)

**Optional Fields:**
- `duration` (number, 10-300 seconds, default: 30)
- `equipment` (enum: `none`, `dumbbells`, `mat`, `kettlebell`, `chair`, `resistance-band`, default: `none`)

**Success Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "_id": "679b1c2d3e4f5g6h7i8j9k0l",
    "name": "Mountain Climbers",
    "description": "In plank position, alternate bringing knees toward chest in a running motion",
    "difficulty": "intermediate",
    "muscleGroup": "full-body",
    "duration": 30,
    "equipment": "none",
    "createdBy": "679a1b2c3d4e5f6g7h8i9j0k",
    "createdAt": "2026-02-04T22:00:00.000Z",
    "updatedAt": "2026-02-04T22:00:00.000Z"
  }
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Exercise name is required",
    "Description is required"
  ]
}
```

---

### Update Exercise

Update an existing exercise.
```http
PUT /api/exercises/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json
```

**🔒 Authentication required.**

**Path Parameters:**
- `id` - MongoDB ObjectId of the exercise

**Request Body** (partial update allowed):
```json
{
  "duration": 45,
  "difficulty": "advanced"
}
```

**Success Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "_id": "679b1c2d3e4f5g6h7i8j9k0l",
    "name": "Mountain Climbers",
    "duration": 45,
    "difficulty": "advanced",
    ...
  }
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Exercise not found"
}
```

**Error Response (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Not authorized, token failed"
}
```

---

### Delete Exercise

Delete an exercise.
```http
DELETE /api/exercises/:id
Authorization: Bearer <your-jwt-token>
```

**🔒 Authentication required.**

**Path Parameters:**
- `id` - MongoDB ObjectId of the exercise

**Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Exercise deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "success": false,
  "message": "Exercise not found"
}
```

---

## ❌ Error Handling

### Common Error Responses

#### 400 Bad Request
Returned when request data is invalid or missing required fields.
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [
    "Email must be valid",
    "Password must be at least 6 characters"
  ]
}
```

#### 401 Unauthorized
Returned when authentication is required but token is missing, invalid, or expired.
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

or
```json
{
  "success": false,
  "message": "Not authorized, token failed"
}
```

#### 404 Not Found
Returned when a resource doesn't exist or invalid ID is provided.
```json
{
  "success": false,
  "message": "Exercise not found"
}
```

or
```json
{
  "success": false,
  "message": "Route /api/invalid not found"
}
```

#### 429 Too Many Requests
Returned when rate limit is exceeded.
```json
{
  "success": false,
  "message": "Too many login attempts, please try again after 15 minutes"
}
```

#### 500 Internal Server Error
Returned when an unexpected server error occurs.
```json
{
  "success": false,
  "message": "Server error",
  "error": "Error details (only in development)"
}
```

---

## 🚦 Rate Limiting

The API implements rate limiting to prevent abuse and brute-force attacks.

### Authentication Endpoints

**Endpoints:** `/api/auth/register`, `/api/auth/login`

- **Limit:** 5 requests per 15 minutes per IP address
- **Applies to:** Failed and successful requests

**Rate Limit Headers:**
```http
RateLimit-Limit: 5
RateLimit-Remaining: 3
RateLimit-Reset: 1738704000
```

### General API

**All endpoints**

- **Limit:** 100 requests per 15 minutes per IP address
- **Applies to:** All API endpoints

### Handling Rate Limit Errors

When you exceed the rate limit, you'll receive:

**Response (429 Too Many Requests):**
```json
{
  "success": false,
  "message": "Too many requests from this IP, please try again after 15 minutes"
}
```

**Solutions:**
- Wait 15 minutes for the limit to reset
- Check `RateLimit-Reset` header for exact reset time
- Restart the server (development only - clears memory-based limits)

---

## 🧪 Testing Guide

### Using Postman or Yaak

#### 1. Setup Environment

Create a new environment with:
- `BASE_URL`: `http://localhost:3000/api`
- `TOKEN`: (leave empty, will be set after login)

#### 2. Test Authentication Flow

**A. Register a new user**
```http
POST {{BASE_URL}}/auth/register
Content-Type: application/json

{
  "username": "testuser",
  "email": "test@example.com",
  "password": "test123"
}
```

Save the `token` from response to environment variable.

**B. Login**
```http
POST {{BASE_URL}}/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "test123"
}
```

#### 3. Test Exercise Endpoints

**A. Get all exercises**
```http
GET {{BASE_URL}}/exercises
```

**B. Filter exercises**
```http
GET {{BASE_URL}}/exercises?difficulty=beginner&muscleGroup=cardio
```

**C. Create an exercise (requires token)**
```http
POST {{BASE_URL}}/exercises
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "name": "Custom Exercise",
  "description": "My custom exercise description",
  "difficulty": "intermediate",
  "muscleGroup": "full-body"
}
```

**D. Update exercise (requires token)**
```http
PUT {{BASE_URL}}/exercises/:id
Authorization: Bearer {{TOKEN}}
Content-Type: application/json

{
  "duration": 45
}
```

**E. Delete exercise (requires token)**
```http
DELETE {{BASE_URL}}/exercises/:id
Authorization: Bearer {{TOKEN}}
```

#### 4. Test Error Handling

**A. Invalid credentials**
```http
POST {{BASE_URL}}/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "wrongpassword"
}
```
Expected: 401 Unauthorized

**B. Missing required fields**
```http
POST {{BASE_URL}}/auth/register
Content-Type: application/json

{
  "username": "test"
}
```
Expected: 400 Bad Request with validation errors

**C. Request without token**
```http
POST {{BASE_URL}}/exercises
Content-Type: application/json

{
  "name": "Test"
}
```
Expected: 401 Unauthorized

**D. Non-existent resource**
```http
GET {{BASE_URL}}/exercises/123456789012345678901234
```
Expected: 404 Not Found

#### 5. Test Rate Limiting

Send the same login request with wrong password **6 times in a row**:

**Request 1-5:** 401 Unauthorized  
**Request 6:** 429 Too Many Requests

---

### Using cURL

#### Health Check
```bash
curl http://localhost:3000/api/health
```

#### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"test123"}'
```

#### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

#### Get Exercises
```bash
curl http://localhost:3000/api/exercises?difficulty=beginner
```

#### Create Exercise (replace TOKEN)
```bash
curl -X POST http://localhost:3000/api/exercises \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test exercise","difficulty":"beginner","muscleGroup":"cardio"}'
```

---

### Using MongoDB Compass

1. **Connect to database**
```
   mongodb://localhost:27017
```

2. **View collections**
   - Database: `intervalflow`
   - Collections:
     - `exercises` - All workout exercises
     - `users` - Registered users

3. **Verify password hashing**
   - Open `users` collection
   - Check `password` field - should be a bcrypt hash (e.g., `$2a$10$...`)

4. **Check exercise ownership**
   - Open `exercises` collection
   - Seed exercises have `createdBy: null`
   - User-created exercises have `createdBy: ObjectId("...")`
