const validationRules = {
  basics: {
    1: [
      // Basic Express Server
      {
        type: "CONTAINS",
        pattern: "import express from 'express'",
        description: "Imports Express (ES6)",
        error: "Must import express using ES6 import syntax",
      },
      {
        type: "CONTAINS",
        pattern: "express()",
        description: "Creates Express app",
        error: "Must create Express app instance",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/['"`]/,
        description: "Has GET route at /",
        error: "Must create GET route at /",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/health['"`]/,
        description: "Has GET route at /health",
        error: "Must create GET route at /health",
      },
      {
        type: "CONTAINS",
        pattern: "export default",
        description: "Exports the app",
        error: "Must export the app using export default",
      },
    ],
    2: [
      // Route Parameters
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/users\/:id['"`]/,
        description: "Has route with :id parameter",
        error: "Must create GET /api/users/:id route",
      },
      {
        type: "REGEX",
        pattern:
          /\.get\s*\(\s*['"`]\/api\/products\/:category\/:productId['"`]/,
        description: "Has route with multiple parameters",
        error: "Must create GET /api/products/:category/:productId route",
      },
      {
        type: "CONTAINS",
        pattern: "req.params",
        description: "Uses req.params",
        error: "Must access route parameters using req.params",
      },
    ],
    3: [
      // Request Body Parsing
      {
        type: "CONTAINS",
        pattern: "express.json()",
        description: "Uses express.json() middleware",
        error: "Must use express.json() middleware",
      },
      {
        type: "REGEX",
        pattern: /\.post\s*\(\s*['"`]\/api\/users['"`]/,
        description: "Has POST /api/users route",
        error: "Must create POST /api/users route",
      },
      {
        type: "REGEX",
        pattern: /\.post\s*\(\s*['"`]\/api\/data['"`]/,
        description: "Has POST /api/data route",
        error: "Must create POST /api/data route",
      },
      {
        type: "CONTAINS",
        pattern: "req.body",
        description: "Accesses request body",
        error: "Must access req.body to get POST data",
      },
    ],
    4: [
      // Custom Middleware
      {
        type: "REGEX",
        pattern:
          /const\s+\w+\s*=\s*\(req,\s*res,\s*next\)|export\s+const\s+\w+\s*=\s*\(req,\s*res,\s*next\)/,
        description: "Defines middleware function",
        error: "Must define middleware with (req, res, next) signature",
      },
      {
        type: "CONTAINS",
        pattern: "next()",
        description: "Calls next() in middleware",
        error: "Middleware must call next()",
      },
      {
        type: "CONTAINS",
        pattern: "req.timestamp",
        description: "Adds timestamp to request",
        error: "Logger middleware should add timestamp to req",
      },
      {
        type: "CONTAINS",
        pattern: "x-api-key",
        description: "Checks for API key header",
        error: "Auth middleware should check x-api-key header",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/protected['"`]/,
        description: "Has protected route",
        error: "Must create /api/protected route",
      },
    ],
    5: [
      // Error Handling
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/error['"`]/,
        description: "Has error route",
        error: "Must create GET /api/error route",
      },
      {
        type: "CONTAINS",
        pattern: "throw new Error",
        description: "Throws error in route",
        error: "Error route should throw an error",
      },
      {
        type: "REGEX",
        pattern: /\(err,\s*req,\s*res,\s*next\)\s*=>/,
        description: "Has error handling middleware",
        error:
          "Must define error middleware with 4 parameters (err, req, res, next)",
      },
      {
        type: "CONTAINS",
        pattern: "err.message",
        description: "Uses error message",
        error: "Error handler should use err.message",
      },
    ],
  },
  database: {
    1: [
      // In-Memory CRUD
      {
        type: "CONTAINS",
        pattern: "let items",
        description: "Declares items array",
        error: "Must declare items array for storage",
      },
      {
        type: "REGEX",
        pattern: /\.post\s*\(\s*['"`]\/api\/items['"`]/,
        description: "Has POST /api/items",
        error: "Must create POST /api/items route",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/items['"`]/,
        description: "Has GET /api/items",
        error: "Must create GET /api/items route",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/items\/:id['"`]/,
        description: "Has GET /api/items/:id",
        error: "Must create GET /api/items/:id route",
      },
      {
        type: "REGEX",
        pattern: /\.put\s*\(\s*['"`]\/api\/items\/:id['"`]/,
        description: "Has PUT /api/items/:id",
        error: "Must create PUT /api/items/:id route",
      },
      {
        type: "REGEX",
        pattern: /\.delete\s*\(\s*['"`]\/api\/items\/:id['"`]/,
        description: "Has DELETE /api/items/:id",
        error: "Must create DELETE /api/items/:id route",
      },
    ],
    2: [
      // Mongoose Schema
      {
        type: "CONTAINS",
        pattern: "import mongoose from 'mongoose'",
        description: "Imports Mongoose",
        error: "Must import mongoose using ES6 import",
      },
      {
        type: "CONTAINS",
        pattern: "new mongoose.Schema",
        description: "Creates schema",
        error: "Must create schema using new mongoose.Schema()",
      },
      {
        type: "CONTAINS",
        pattern: "username",
        description: "Has username field",
        error: "Schema must have username field",
      },
      {
        type: "CONTAINS",
        pattern: "email",
        description: "Has email field",
        error: "Schema must have email field",
      },
      {
        type: "CONTAINS",
        pattern: "required: true",
        description: "Has required fields",
        error: "Fields should be marked as required",
      },
      {
        type: "CONTAINS",
        pattern: "unique: true",
        description: "Has unique constraint",
        error: "Username should be unique",
      },
      {
        type: "REGEX",
        pattern: /mongoose\.model\s*\(\s*['"`]User['"`]/,
        description: "Creates User model",
        error: "Must create and export User model",
      },
    ],
    3: [
      // MongoDB CRUD
      {
        type: "CONTAINS",
        pattern: "async",
        description: "Uses async functions",
        error: "Should use async/await for database operations",
      },
      {
        type: "CONTAINS",
        pattern: "await",
        description: "Uses await",
        error: "Must use await for Mongoose operations",
      },
      {
        type: "REGEX",
        pattern: /\.post\s*\(\s*['"`]\/api\/users['"`]/,
        description: "Has POST /api/users",
        error: "Must create POST /api/users route",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/users['"`]/,
        description: "Has GET /api/users",
        error: "Must create GET /api/users route",
      },
      {
        type: "CONTAINS",
        pattern: "User.find",
        description: "Uses Model.find()",
        error: "Should use User.find() to get all users",
      },
      {
        type: "CONTAINS",
        pattern: "User.findById",
        description: "Uses Model.findById()",
        error: "Should use User.findById() to get single user",
      },
    ],
    4: [
      // Advanced Queries
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/users\/search['"`]/,
        description: "Has search route",
        error: "Must create GET /api/users/search route",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/users\/filter['"`]/,
        description: "Has filter route",
        error: "Must create GET /api/users/filter route",
      },
      {
        type: "CONTAINS",
        pattern: "req.query",
        description: "Uses query parameters",
        error: "Must access query parameters using req.query",
      },
      {
        type: "REGEX",
        pattern: /new\s+RegExp|\/.*\//,
        description: "Uses regex for search",
        error: "Should use regex for case-insensitive search",
      },
    ],
  },
  urlShortener: {
    1: [
      // URL Model
      {
        type: "CONTAINS",
        pattern: "originalUrl",
        description: "Has originalUrl field",
        error: "Schema must have originalUrl field",
      },
      {
        type: "CONTAINS",
        pattern: "shortCode",
        description: "Has shortCode field",
        error: "Schema must have shortCode field",
      },
      {
        type: "CONTAINS",
        pattern: "clicks",
        description: "Has clicks field",
        error: "Schema must have clicks field for analytics",
      },
      {
        type: "CONTAINS",
        pattern: "createdBy",
        description: "Has createdBy field",
        error: "Schema must have createdBy field for user association",
      },
      {
        type: "CONTAINS",
        pattern: "unique: true",
        description: "ShortCode is unique",
        error: "shortCode should be unique",
      },
    ],
    2: [
      // Short Code Generation
      {
        type: "REGEX",
        pattern: /\.post\s*\(\s*['"`]\/api\/shorten['"`]/,
        description: "Has POST /api/shorten route",
        error: "Must create POST /api/shorten route",
      },
      {
        type: "REGEX",
        pattern:
          /const\s+generateShortCode\s*=|export\s+const\s+generateShortCode\s*=/,
        description: "Has code generation function",
        error: "Must have function to generate short codes",
      },
      {
        type: "CONTAINS",
        pattern: "customCode",
        description: "Handles custom codes",
        error: "Should support custom short codes",
      },
      {
        type: "CONTAINS",
        pattern: "shortUrl",
        description: "Returns shortUrl",
        error: "Response should include shortUrl property",
      },
    ],
    3: [
      // Redirection
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/s\/:shortCode['"`]/,
        description: "Has redirect route",
        error: "Must create GET /s/:shortCode route",
      },
      {
        type: "CONTAINS",
        pattern: "clicks",
        description: "Tracks clicks",
        error: "Should increment clicks counter",
      },
      {
        type: "CONTAINS",
        pattern: "findOne",
        description: "Finds URL by shortCode",
        error: "Should use findOne to find URL by shortCode",
      },
      {
        type: "CONTAINS",
        pattern: "404",
        description: "Handles not found",
        error: "Should return 404 if URL not found",
      },
    ],
    4: [
      // JWT Auth
      {
        type: "CONTAINS",
        pattern: "import bcrypt from 'bcryptjs'",
        description: "Imports bcrypt",
        error: "Must import bcryptjs for password hashing",
      },
      {
        type: "CONTAINS",
        pattern: "import jwt from 'jsonwebtoken'",
        description: "Imports JWT",
        error: "Must import jsonwebtoken",
      },
      {
        type: "REGEX",
        pattern: /\.post\s*\(\s*['"`]\/api\/auth\/register['"`]/,
        description: "Has register route",
        error: "Must create POST /api/auth/register route",
      },
      {
        type: "REGEX",
        pattern: /\.post\s*\(\s*['"`]\/api\/auth\/login['"`]/,
        description: "Has login route",
        error: "Must create POST /api/auth/login route",
      },
      {
        type: "CONTAINS",
        pattern: "bcrypt.hash",
        description: "Hashes passwords",
        error: "Must hash passwords with bcrypt",
      },
      {
        type: "CONTAINS",
        pattern: "jwt.sign",
        description: "Signs JWT token",
        error: "Must generate JWT token with jwt.sign()",
      },
    ],
    5: [
      // Auth Middleware
      {
        type: "CONTAINS",
        pattern: "Authorization",
        description: "Checks Authorization header",
        error: "Must check Authorization header",
      },
      {
        type: "CONTAINS",
        pattern: "Bearer",
        description: "Handles Bearer token",
        error: "Should extract Bearer token from header",
      },
      {
        type: "CONTAINS",
        pattern: "jwt.verify",
        description: "Verifies JWT token",
        error: "Must verify token using jwt.verify()",
      },
      {
        type: "CONTAINS",
        pattern: "req.user",
        description: "Attaches user to request",
        error: "Should attach decoded user to req.user",
      },
      {
        type: "CONTAINS",
        pattern: "401",
        description: "Returns 401 for unauthorized",
        error: "Should return 401 status for invalid/missing token",
      },
    ],
    6: [
      // Protected Routes
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/my-urls['"`]/,
        description: "Has my-urls route",
        error: "Must create GET /api/my-urls route",
      },
      {
        type: "REGEX",
        pattern: /\.delete\s*\(\s*['"`]\/api\/urls\/:shortCode['"`]/,
        description: "Has delete route",
        error: "Must create DELETE /api/urls/:shortCode route",
      },
      {
        type: "CONTAINS",
        pattern: "authenticate",
        description: "Uses auth middleware",
        error: "Routes should use authenticate middleware",
      },
      {
        type: "CONTAINS",
        pattern: "createdBy",
        description: "Filters by createdBy",
        error: "Should filter URLs by createdBy field",
      },
    ],
    7: [
      // Analytics
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/stats\/:shortCode['"`]/,
        description: "Has stats route",
        error: "Must create GET /api/stats/:shortCode route",
      },
      {
        type: "REGEX",
        pattern: /\.get\s*\(\s*['"`]\/api\/analytics['"`]/,
        description: "Has analytics route",
        error: "Must create GET /api/analytics route",
      },
      {
        type: "CONTAINS",
        pattern: "aggregate",
        description: "Uses aggregation",
        error: "Should use Mongoose aggregation for analytics",
      },
      {
        type: "CONTAINS",
        pattern: "totalUrls",
        description: "Returns total URLs count",
        error: "Analytics should include totalUrls",
      },
      {
        type: "CONTAINS",
        pattern: "totalClicks",
        description: "Returns total clicks",
        error: "Analytics should include totalClicks",
      },
    ],
  },
};

export default validationRules;
