import React, { useState, useEffect } from "react";
import {
  Play,
  CheckCircle,
  XCircle,
  Book,
  Code,
  ChevronRight,
  Loader,
  AlertCircle,
  History,
} from "lucide-react";

const API_URL = "http://localhost:3001/api/judge";

const PROJECTS = {
  basics: {
    name: "Express.js Basics",
    description:
      "Learn fundamental Express.js concepts - setup, routing, and middleware",
    tasks: [
      {
        id: 1,
        title: "Create Basic Express Server",
        description: "Set up a basic Express.js server with a root route",
        instructions: `Create a basic Express server with:
- Import express using require
- Create an Express app instance
- Create a GET route at '/' that returns { message: 'Hello Express!' }
- Create a GET route at '/health' that returns { status: 'OK' }
- Export the app (don't call listen here)`,
        starter: `const express = require('express');

// TODO: Create Express app and routes

`,
      },
      {
        id: 2,
        title: "Route Parameters",
        description: "Create routes that handle dynamic URL parameters",
        instructions: `Add route parameters:
- GET /api/users/:id - returns { userId: id }
- GET /api/products/:category/:productId - returns { category, productId }
- All responses should be JSON objects`,
        starter: `const express = require('express');
const app = express();

// TODO: Add parameterized routes

module.exports = app;
`,
      },
      {
        id: 3,
        title: "Request Body Parsing",
        description: "Handle JSON request bodies with middleware",
        instructions: `Create routes that handle POST requests:
- Use express.json() middleware
- POST /api/users - expects { name, email } in body, returns { id: 1, name, email }
- POST /api/data - expects any JSON, returns { received: true, data: <the body> }`,
        starter: `const express = require('express');
const app = express();

// TODO: Add middleware and POST routes

module.exports = app;
`,
      },
      {
        id: 4,
        title: "Custom Middleware",
        description: "Create and use custom middleware functions",
        instructions: `Create custom middleware:
- Logger middleware that adds a timestamp property to req object
- Auth middleware that checks for 'x-api-key' header (value should be 'secret123')
- Apply logger to all routes
- Apply auth middleware only to /api/protected route
- Protected route returns { message: 'Access granted', timestamp: req.timestamp }`,
        starter: `const express = require('express');
const app = express();

app.use(express.json());

// TODO: Create middleware functions

module.exports = app;
`,
      },
      {
        id: 5,
        title: "Error Handling",
        description: "Implement proper error handling middleware",
        instructions: `Add error handling:
- Create a route GET /api/error that throws new Error('Test error')
- Create error handling middleware with 4 parameters (err, req, res, next)
- Error middleware should return { error: err.message, status: 500 }
- Add it as the last middleware`,
        starter: `const express = require('express');
const app = express();

app.use(express.json());

// TODO: Add error route and error handling middleware

module.exports = app;
`,
      },
    ],
  },
  database: {
    name: "Database Integration",
    description: "Work with in-memory storage, then MongoDB with Mongoose",
    tasks: [
      {
        id: 1,
        title: "In-Memory Database",
        description: "Create CRUD operations with in-memory array storage",
        instructions: `Implement in-memory CRUD:
- Use an array to store items: let items = []
- POST /api/items - { name } - adds item with id, returns created item
- GET /api/items - returns all items
- GET /api/items/:id - returns single item or 404
- PUT /api/items/:id - { name } - updates item
- DELETE /api/items/:id - deletes item
- Each item should have { id, name } structure`,
        starter: `const express = require('express');
const app = express();

app.use(express.json());

let items = [];
let nextId = 1;

// TODO: Implement CRUD routes

module.exports = app;
`,
      },
      {
        id: 2,
        title: "Mongoose Schema Definition",
        description: "Define a Mongoose schema and model",
        instructions: `Create a Mongoose model:
- Define a User schema with: username (String, required, unique), email (String, required), createdAt (Date, default: Date.now)
- Create and export the User model
- Note: Don't connect to MongoDB here, just define the schema`,
        starter: `const mongoose = require('mongoose');

// TODO: Define User schema and create model

`,
      },
      {
        id: 3,
        title: "MongoDB CRUD Operations",
        description: "Implement CRUD operations using Mongoose",
        instructions: `Create routes using Mongoose User model:
- POST /api/users - create user with { username, email }
- GET /api/users - get all users
- GET /api/users/:id - get user by id
- PUT /api/users/:id - update user
- DELETE /api/users/:id - delete user
- Use async/await and proper error handling
- Assume mongoose is connected elsewhere`,
        starter: `const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// User model (already defined)
const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

// TODO: Implement CRUD routes with Mongoose

module.exports = app;
`,
      },
      {
        id: 4,
        title: "Advanced Queries",
        description: "Use Mongoose query methods and population",
        instructions: `Implement advanced queries:
- GET /api/users/search?username=value - find users by username (case-insensitive)
- GET /api/users/filter?createdAfter=2024-01-01 - filter by creation date
- Use .find() with query objects and regex for search`,
        starter: `const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
}));

// TODO: Implement search and filter routes

module.exports = app;
`,
      },
    ],
  },
  urlShortener: {
    name: "URL Shortener App",
    description:
      "Build a complete URL shortener with authentication and analytics",
    tasks: [
      {
        id: 1,
        title: "URL Model & Schema",
        description: "Create the URL shortening data model",
        instructions: `Create URL schema with:
- originalUrl (String, required)
- shortCode (String, required, unique, index)
- clicks (Number, default 0)
- createdBy (ObjectId, ref to User)
- createdAt (Date, default Date.now)
- expiresAt (Date, optional)
Create and export the model`,
        starter: `const mongoose = require('mongoose');

// TODO: Create URL schema and model

`,
      },
      {
        id: 2,
        title: "Short Code Generation",
        description: "Implement URL shortening logic",
        instructions: `Create URL shortening routes:
- POST /api/shorten - accepts { url, customCode? }
- Generate random 6-char code if no customCode provided
- Check if customCode already exists
- Save to database and return { shortCode, originalUrl, shortUrl: '/s/' + shortCode }
- Use nanoid or random string generation`,
        starter: `const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const URL = mongoose.model('URL', new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, required: true, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}));

// Helper function to generate random code
function generateShortCode() {
  return Math.random().toString(36).substring(2, 8);
}

// TODO: Implement POST /api/shorten route

module.exports = app;
`,
      },
      {
        id: 3,
        title: "URL Redirection",
        description: "Implement redirect logic and click tracking",
        instructions: `Create redirect functionality:
- GET /s/:shortCode - finds URL by shortCode
- Increments clicks counter
- Returns redirect URL as { redirect: originalUrl } (in real app would use res.redirect)
- Returns 404 if not found`,
        starter: `const express = require('express');
const mongoose = require('mongoose');
const app = express();

const URL = mongoose.model('URL', new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  clicks: { type: Number, default: 0 }
}));

// TODO: Implement redirect route with click tracking

module.exports = app;
`,
      },
      {
        id: 4,
        title: "JWT Authentication",
        description: "Add JWT-based authentication",
        instructions: `Implement JWT auth:
- Create POST /api/auth/register - { username, password }
- Create POST /api/auth/login - returns { token, user }
- Hash passwords with bcrypt
- Generate JWT token with jsonwebtoken
- Token payload should include { userId, username }
- Assume User model exists with username and password fields`,
        starter: `const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const JWT_SECRET = 'your-secret-key';

const User = mongoose.model('User', new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}));

// TODO: Implement register and login routes

module.exports = app;
`,
      },
      {
        id: 5,
        title: "Auth Middleware",
        description: "Create middleware to protect routes",
        instructions: `Create authentication middleware:
- Extract token from 'Authorization' header (format: 'Bearer TOKEN')
- Verify token using jwt.verify
- Attach user info to req.user
- Return 401 if no token or invalid token
- Export middleware function named 'authenticate'`,
        starter: `const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key';

// TODO: Create authenticate middleware function

`,
      },
      {
        id: 6,
        title: "Protected URL Management",
        description: "Add user-specific URL management with auth",
        instructions: `Create protected routes:
- GET /api/my-urls - returns URLs created by authenticated user
- DELETE /api/urls/:shortCode - delete only if created by user
- Use authenticate middleware
- Both routes require authentication
- Filter by createdBy field matching req.user.userId`,
        starter: `const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

const JWT_SECRET = 'your-secret-key';

// Authenticate middleware
const authenticate = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

const URL = mongoose.model('URL', new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  createdBy: mongoose.Schema.Types.ObjectId,
  clicks: Number
}));

// TODO: Implement protected routes

module.exports = app;
`,
      },
      {
        id: 7,
        title: "Analytics & Stats",
        description: "Add analytics endpoints for URL statistics",
        instructions: `Create analytics routes:
- GET /api/stats/:shortCode - returns { shortCode, originalUrl, clicks, createdAt }
- GET /api/analytics - returns aggregate stats { totalUrls, totalClicks, topUrls: [array of top 5 by clicks] }
- Use Mongoose aggregation for analytics route
- Both routes should be public (no auth required)`,
        starter: `const express = require('express');
const mongoose = require('mongoose');
const app = express();

const URL = mongoose.model('URL', new mongoose.Schema({
  originalUrl: String,
  shortCode: { type: String, unique: true },
  clicks: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
}));

// TODO: Implement analytics routes

module.exports = app;
`,
      },
    ],
  },
};

export default function ExpressOnlineIDE() {
  const [selectedProject, setSelectedProject] = useState("basics");
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [submissionId, setSubmissionId] = useState(null);
  const [testResults, setTestResults] = useState([]);
  const [allPassed, setAllPassed] = useState(false);

  const project = PROJECTS[selectedProject];
  const currentTask = project.tasks[currentTaskIndex];

  useEffect(() => {
    setCode(currentTask.starter);
    setOutput("");
    setTestResults([]);
    setAllPassed(false);
    setSubmissionId(null);
  }, [currentTaskIndex, selectedProject]);

  const runTests = async () => {
    setIsRunning(true);
    setOutput("Submitting code to judge server...\n");
    setTestResults([]);

    try {
      const response = await fetch(`${API_URL}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          projectType: selectedProject,
          taskId: currentTask.id,
          code: code,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setSubmissionId(result.submissionId);
      setOutput(result.output);
      setAllPassed(result.allPassed);

      const lines = result.output.split("\n").filter((line) => line.trim());
      const parsedResults = lines.slice(2).map((line) => ({
        message: line,
        passed: line.includes("✓"),
      }));
      setTestResults(parsedResults);
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput(
        `⚠️ Error connecting to judge server: ${error.message}\n\nMake sure the Express backend is running on http://localhost:3001`
      );
    } finally {
      setIsRunning(false);
    }
  };

  const nextTask = () => {
    if (currentTaskIndex < project.tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  const prevTask = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <div className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-green-400">
            Express.js Online Judge
          </h1>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-gray-400">Backend: localhost:3001</span>
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-3">
          Master Express.js & Node.js by building real applications with
          automated testing
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedProject("basics");
              setCurrentTaskIndex(0);
            }}
            className={`px-4 py-2 rounded transition-colors ${
              selectedProject === "basics"
                ? "bg-green-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            📚 Express Basics
          </button>
          <button
            onClick={() => {
              setSelectedProject("database");
              setCurrentTaskIndex(0);
            }}
            className={`px-4 py-2 rounded transition-colors ${
              selectedProject === "database"
                ? "bg-green-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            🗄️ Database & Mongoose
          </button>
          <button
            onClick={() => {
              setSelectedProject("urlShortener");
              setCurrentTaskIndex(0);
            }}
            className={`px-4 py-2 rounded transition-colors ${
              selectedProject === "urlShortener"
                ? "bg-green-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            🔗 URL Shortener App
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-1/2 border-r border-gray-700 overflow-auto">
          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-green-400 mb-2">
                {project.name}
              </h2>
              <p className="text-gray-400">{project.description}</p>
            </div>

            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Book className="w-5 h-5 text-green-400" />
                <span className="font-semibold">
                  Task {currentTaskIndex + 1} of {project.tasks.length}
                </span>
              </div>
              <div className="flex gap-1">
                {project.tasks.map((task, idx) => (
                  <div
                    key={task.id}
                    className={`h-2 flex-1 rounded transition-colors ${
                      idx < currentTaskIndex
                        ? "bg-green-500"
                        : idx === currentTaskIndex
                        ? "bg-blue-500"
                        : "bg-gray-700"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-4">{currentTask.title}</h3>
              <p className="text-gray-300 mb-4">{currentTask.description}</p>

              <div className="bg-gray-900 rounded p-4 mb-4">
                <h4 className="font-semibold text-green-400 mb-2">
                  📋 Instructions:
                </h4>
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans">
                  {currentTask.instructions}
                </pre>
              </div>

              <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded p-4">
                <h4 className="font-semibold text-green-400 mb-2">
                  💡 How it works:
                </h4>
                <p className="text-sm text-gray-300">
                  Write your Express.js code in the editor and click "Run
                  Tests". Your code will be validated against test criteria
                  including route handlers, middleware, proper exports, and code
                  structure.
                </p>
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={prevTask}
                disabled={currentTaskIndex === 0}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed rounded transition-colors"
              >
                ← Previous
              </button>
              <button
                onClick={nextTask}
                disabled={
                  currentTaskIndex === project.tasks.length - 1 || !allPassed
                }
                className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-800 disabled:text-gray-600 disabled:cursor-not-allowed rounded flex items-center justify-center gap-2 transition-colors"
              >
                {!allPassed && currentTaskIndex < project.tasks.length - 1 ? (
                  <>
                    Complete this task to unlock{" "}
                    <ChevronRight className="w-4 h-4" />
                  </>
                ) : (
                  <>
                    Next Task <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 flex flex-col">
          <div className="flex-1 flex flex-col">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-400" />
                <span className="font-semibold">Code Editor</span>
                <span className="text-xs text-gray-500">
                  JavaScript / Express.js
                </span>
              </div>
              <div className="flex gap-2">
                {submissionId && (
                  <div className="flex items-center gap-2 text-xs text-gray-400 bg-gray-700 px-3 py-1 rounded">
                    <History className="w-3 h-3" />
                    Submission #{submissionId}
                  </div>
                )}
                <button
                  onClick={runTests}
                  disabled={isRunning}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-700 disabled:cursor-not-allowed rounded flex items-center gap-2 transition-colors font-semibold"
                >
                  {isRunning ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Running Tests...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Run Tests
                    </>
                  )}
                </button>
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none"
              style={{ tabSize: 2 }}
              spellCheck="false"
              placeholder="Write your Express.js code here..."
            />
          </div>

          <div className="h-1/3 border-t border-gray-700 flex flex-col">
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              Test Results
              {testResults.length > 0 && (
                <span className="ml-auto text-sm text-gray-400">
                  {testResults.filter((r) => r.passed).length} /{" "}
                  {testResults.length} passed
                </span>
              )}
            </div>
            <div className="flex-1 bg-gray-900 p-4 overflow-auto">
              {output ? (
                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                  {output}
                </pre>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <Code className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p className="italic">
                      Click "Run Tests" to validate your code...
                    </p>
                    <p className="text-xs mt-2">
                      Your code will be tested by the Express.js backend
                    </p>
                  </div>
                </div>
              )}
            </div>

            {allPassed && (
              <div className="bg-green-900 border-t border-green-700 p-4 flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-400">
                    🎉 Task Complete!
                  </p>
                  <p className="text-sm text-green-300">
                    All tests passed.{" "}
                    {currentTaskIndex < project.tasks.length - 1
                      ? "Ready for the next challenge!"
                      : "Project completed! 🚀"}
                  </p>
                </div>
              </div>
            )}

            {output && !allPassed && testResults.length > 0 && (
              <div className="bg-red-900 bg-opacity-30 border-t border-red-700 p-4 flex items-center gap-3">
                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-red-400">
                    Some tests failed
                  </p>
                  <p className="text-sm text-red-300">
                    Review the feedback above and try again
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
