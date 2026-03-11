# Task 1: CRUD API with MongoDB

A simple RESTful CRUD API for managing tasks using Node.js, Express, and MongoDB.

## Features:

- ✅ Create, Read, Update, Delete (CRUD) operations
- ✅ MongoDB integration with Mongoose ODM
- ✅ Error handling middleware
- ✅ HTTP request logging with Morgan
- ✅ CORS enabled for cross-origin requests
- ✅ Input validation
- ✅ Timestamps tracking (createdAt, updatedAt)

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Logging**: Morgan
- **Development**: Nodemon

## Project Structure

```
Task 1/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── error.middleware.js   # Error handling
│   ├── models/
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   └── task.routes.js        # Task endpoints
│   ├── utils/
│   │   └── logger.js             # Morgan logger
│   ├── app.js                    # Express app setup
│   └── server.js                 # Server entry point
├── package.json
├── .env.example
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)

### Setup

```bash
# Clone/navigate to project
cd Task\ 1

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your MongoDB URI
# MONGODB_URI=mongodb://localhost:27017/task-db
# PORT=3000
```

## Running the Server

### Development
```bash
npm run dev
```
Server runs on `http://localhost:3000` with auto-reload on file changes.

### Production
```bash
npm start
```

## API Endpoints

### Get All Tasks
```
GET /tasks
```
**Response:**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project",
    "description": "Finish the CRUD API",
    "completed": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
]
```

### Get Single Task
```
GET /tasks/:id
```
**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project",
  "description": "Finish the CRUD API",
  "completed": false,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

### Create Task
```
POST /tasks
```
**Request Body:**
```json
{
  "title": "New task",
  "description": "Task description",
  "completed": false
}
```
**Response:** (201 Created)
```json
{
  "_id": "507f1f77bcf86cd799439012",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "createdAt": "2024-01-15T10:35:00Z",
  "updatedAt": "2024-01-15T10:35:00Z"
}
```

### Update Task
```
PUT /tasks/:id
```
**Request Body:**
```json
{
  "title": "Updated task",
  "description": "Updated description",
  "completed": true
}
```
**Response:**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Updated task",
  "description": "Updated description",
  "completed": true,
  "createdAt": "2024-01-15T10:30:00Z",
  "updatedAt": "2024-01-15T10:40:00Z"
}
```

### Delete Task
```
DELETE /tasks/:id
```
**Response:** (200 OK)
```json
{
  "message": "Task deleted successfully"
}
```

## Error Handling

All errors are handled by the error middleware and return appropriate HTTP status codes:

- **400 Bad Request**: Missing required fields or invalid input
- **404 Not Found**: Task not found
- **500 Internal Server Error**: Server-side errors

**Error Response Format:**
```json
{
  "message": "Error description",
  "stack": "..." // Only in development
}
```

## Task Model

The Task schema includes:

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `title` | String | Yes | Min 3 characters |
| `description` | String | No | Max 500 characters |
| `completed` | Boolean | No | Default: false |
| `createdAt` | Timestamp | Auto | Auto-generated |
| `updatedAt` | Timestamp | Auto | Auto-updated |

## Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/task-db

# Server port
PORT=3000

# Node environment
NODE_ENV=development
```

## Usage Examples

### Using cURL

**Create a task:**
```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "description": "Milk, eggs, bread",
    "completed": false
  }'
```

**Get all tasks:**
```bash
curl http://localhost:3000/tasks
```

**Update a task:**
```bash
curl -X PUT http://localhost:3000/tasks/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "completed": true
  }'
```

**Delete a task:**
```bash
curl -X DELETE http://localhost:3000/tasks/507f1f77bcf86cd799439011
```

## Postman Collection

A Postman collection is included: `Task1.postman_collection.json`

**To use:**
1. Open Postman
2. Click `Import`
3. Select `Task1.postman_collection.json`
4. Test all endpoints

## Middleware

### CORS
- Allows requests from `http://localhost:5173` (frontend)
- Configurable in `src/app.js`

### Logger
- Uses Morgan to log HTTP requests
- Logs: timestamp, method, URL, status, response time

### Error Handler
- Centralized error handling
- Logs errors with timestamps
- Returns consistent error format

## Features Explained

### Mongoose Schema Validation
- Validates required fields
- Enforces field constraints (min/max length)
- Auto-generates timestamps

### RESTful API Design
- Standard HTTP methods (GET, POST, PUT, DELETE)
- Appropriate status codes
- JSON request/response format

### Error Handling
- Try-catch blocks in routes
- Middleware error handling
- Consistent error responses

## Troubleshooting

### MongoDB Connection Error
**Problem:** `MongooseError: Cannot connect to MongoDB`

**Solutions:**
1. Ensure MongoDB is running: `mongod`
2. Check `MONGODB_URI` in `.env`
3. Verify MongoDB is accessible at that URI

### Port Already in Use
**Problem:** `Error: listen EADDRINUSE :::3000`

**Solutions:**
1. Change `PORT` in `.env`
2. Kill process using port 3000:
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -i :3000
   kill -9 <PID>
   ```

### Task Not Found Error
**Problem:** `{"message": "Task not found"}` with 404

**Solutions:**
1. Verify task ID exists
2. Check MongoDB has data: `db.tasks.find()`
3. Ensure using correct ObjectId format
