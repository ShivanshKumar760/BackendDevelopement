# Todo API - Complete Testing Guide

## JSON Request/Response Examples

### 1. GET / (Welcome Message)
**Request:**
```bash
curl http://localhost:8080/
```

**Response:**
```json
"Welcome to the Todo API"
```

---

### 2. POST /todos (Create Todo)

**Request:**
```bash
curl -X POST http://localhost:8080/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries",
    "completed": false
  }'
```

**Request Body (JSON):**
```json
{
  "title": "Buy groceries",
  "completed": false
}
```

**Response (201 Created):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Buy groceries",
  "completed": false,
  "__v": 0
}
```

**More Examples:**
```json
{
  "title": "Learn Node.js",
  "completed": false
}
```

```json
{
  "title": "Complete project",
  "completed": true
}
```

---

### 3. GET /todos (Get All Todos)

**Request:**
```bash
curl http://localhost:8080/todos
```

**Response (200 OK):**
```json
[
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "title": "Buy groceries",
    "completed": false,
    "__v": 0
  },
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
    "title": "Learn Node.js",
    "completed": false,
    "__v": 0
  },
  {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "title": "Complete project",
    "completed": true,
    "__v": 0
  }
]
```

**Empty Response:**
```json
[]
```

---

### 4. GET /todos/:id (Get Single Todo)

**Request:**
```bash
curl http://localhost:8080/todos/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Buy groceries",
  "completed": false,
  "__v": 0
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Todo not found"
}
```

---

### 5. PUT /todos/:id (Update Todo)

**Request:**
```bash
curl -X PUT http://localhost:8080/todos/65a1b2c3d4e5f6g7h8i9j0k1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Buy groceries and cook dinner",
    "completed": true
  }'
```

**Request Body (JSON):**
```json
{
  "title": "Buy groceries and cook dinner",
  "completed": true
}
```

**Partial Update (Only completed):**
```json
{
  "completed": true
}
```

**Response (200 OK):**
```json
{
  "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
  "title": "Buy groceries and cook dinner",
  "completed": true,
  "__v": 0
}
```

---

### 6. DELETE /todos/:id (Delete Todo)

**Request:**
```bash
curl -X DELETE http://localhost:8080/todos/65a1b2c3d4e5f6g7h8i9j0k1
```

**Response (200 OK):**
```json
{
  "message": "Todo deleted successfully"
}
```

**Error Response (404 Not Found):**
```json
{
  "error": "Todo not found"
}
```

---

## Using Ngrok to Expose Your API

### What is Ngrok?
Ngrok creates a secure tunnel from a public URL to your local server. This lets you:
- Test webhooks
- Share your API with others
- Access your local API from anywhere
- Test on mobile devices

---

### Step 1: Install Ngrok

**Option 1: Download**
1. Go to [https://ngrok.com/download](https://ngrok.com/download)
2. Download for your OS
3. Extract and move to a folder in your PATH

**Option 2: Using npm**
```bash
npm install -g ngrok
```

**Option 3: Using Homebrew (Mac)**
```bash
brew install ngrok/ngrok/ngrok
```

---

### Step 2: Sign Up (Optional but Recommended)

1. Create account at [https://dashboard.ngrok.com/signup](https://dashboard.ngrok.com/signup)
2. Get your authtoken from dashboard
3. Connect your account:

```bash
ngrok authtoken YOUR_AUTH_TOKEN_HERE
```

---

### Step 3: Start Your Express Server

```bash
node server.js
```

Server should be running on `http://localhost:8080`

---

### Step 4: Start Ngrok

Open a **new terminal** and run:

```bash
ngrok http 8080
```

You'll see output like this:
```
ngrok                                                                   

Session Status                online
Account                       your-email@example.com
Version                       3.x.x
Region                        United States (us)
Latency                       -
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://1a2b-3c4d-5e6f.ngrok-free.app -> http://localhost:8080

Connections                   ttl     opn     rt1     rt5     p50     p90
                              0       0       0.00    0.00    0.00    0.00
```

---

### Step 5: Use Your Public URL

Your API is now accessible at: `https://1a2b-3c4d-5e6f.ngrok-free.app`

**Test it:**
```bash
# Get all todos
curl https://1a2b-3c4d-5e6f.ngrok-free.app/todos

# Create a todo
curl -X POST https://1a2b-3c4d-5e6f.ngrok-free.app/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test from ngrok","completed":false}'
```

---

## Complete Testing Workflow

### Using cURL

```bash
# 1. Create a todo
curl -X POST http://localhost:8080/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","completed":false}'

# 2. Get all todos
curl http://localhost:8080/todos

# 3. Get specific todo (replace ID)
curl http://localhost:8080/todos/YOUR_TODO_ID

# 4. Update todo
curl -X PUT http://localhost:8080/todos/YOUR_TODO_ID \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 5. Delete todo
curl -X DELETE http://localhost:8080/todos/YOUR_TODO_ID
```

---

### Using Postman

1. **Download Postman**: [https://www.postman.com/downloads/](https://www.postman.com/downloads/)

2. **Create New Request**:
   - Click "New" → "HTTP Request"

3. **Test Each Endpoint**:

**POST /todos**
- Method: POST
- URL: `http://localhost:8080/todos`
- Body → raw → JSON:
```json
{
  "title": "My todo",
  "completed": false
}
```

**GET /todos**
- Method: GET
- URL: `http://localhost:8080/todos`

**PUT /todos/:id**
- Method: PUT
- URL: `http://localhost:8080/todos/YOUR_ID`
- Body → raw → JSON:
```json
{
  "completed": true
}
```

**DELETE /todos/:id**
- Method: DELETE
- URL: `http://localhost:8080/todos/YOUR_ID`

---

### Using Thunder Client (VS Code Extension)

1. Install "Thunder Client" extension in VS Code
2. Click Thunder Client icon in sidebar
3. Create new request
4. Same process as Postman

---

## Ngrok Advanced Features

### Custom Subdomain (Paid Feature)
```bash
ngrok http --subdomain=myapp 8080
```
URL: `https://myapp.ngrok-free.app`

### Inspect Requests
Visit `http://localhost:4040` in your browser to see:
- All HTTP requests
- Request/Response details
- Replay requests
- Request/Response bodies

### Multiple Tunnels
Create `ngrok.yml` config:
```yaml
tunnels:
  api:
    addr: 8080
    proto: http
  frontend:
    addr: 3000
    proto: http
```

Start both:
```bash
ngrok start --all
```

### Static Domain (Paid)
```bash
ngrok http --domain=your-static-domain.ngrok-free.app 8080
```

---

## Sample Test Data

Create multiple todos for testing:

```bash
# Todo 1
curl -X POST http://localhost:8080/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","completed":false}'

# Todo 2
curl -X POST http://localhost:8080/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn Node.js","completed":false}'

# Todo 3
curl -X POST http://localhost:8080/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Build a project","completed":true}'

# Todo 4
curl -X POST http://localhost:8080/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Read documentation","completed":false}'
```

---

## Troubleshooting

### MongoDB Not Running
```bash
# Start MongoDB
sudo systemctl start mongod  # Linux
brew services start mongodb-community  # Mac
```

### Port Already in Use
```bash
# Find process using port 8080
lsof -i :8080  # Mac/Linux
netstat -ano | findstr :8080  # Windows

# Kill the process
kill -9 PID  # Replace PID with actual process ID
```

### Ngrok Connection Failed
- Check if server is running on port 8080
- Make sure no firewall is blocking
- Restart ngrok

### CORS Issues
Add CORS middleware to your Express app:
```javascript
npm install cors

// In your server.js
import cors from 'cors';
app.use(cors());
```

---

## Quick Reference

### Start Everything
```bash
# Terminal 1: Start MongoDB (if not running as service)
mongod

# Terminal 2: Start Express server
node server.js

# Terminal 3: Start ngrok
ngrok http 8080
```

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Welcome message |
| POST | /todos | Create todo |
| GET | /todos | Get all todos |
| GET | /todos/:id | Get single todo |
| PUT | /todos/:id | Update todo |
| DELETE | /todos/:id | Delete todo |

---

**Your API is now accessible from anywhere in the world via Ngrok! Share the ngrok URL with anyone to let them test your API.** 🚀