# Complete Mongoose & MongoDB Guide with Express.js

## Table of Contents
1. [What is Mongoose?](#what-is-mongoose)
2. [Setting Up MongoDB & Mongoose](#setting-up-mongodb--mongoose)
3. [Connecting to MongoDB](#connecting-to-mongodb)
4. [Schemas](#schemas)
5. [Models](#models)
6. [CRUD Operations](#crud-operations)
7. [Mongoose Methods](#mongoose-methods)
8. [Query Methods](#query-methods)
9. [Validation](#validation)
10. [MongoDB Aggregation](#mongodb-aggregation)
11. [Advanced Topics](#advanced-topics)
12. [Best Practices](#best-practices)

---

## What is Mongoose?

**Mongoose** is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides:
- **Schema-based modeling** - Structure your data
- **Validation** - Ensure data integrity
- **Type casting** - Automatic type conversion
- **Query building** - Easy database queries
- **Middleware** - Pre/post hooks for operations

**Think of it as:**
- MongoDB = Database (stores data)
- Mongoose = Translator (makes MongoDB easier to use with Node.js)

---

## Setting Up MongoDB & Mongoose

### Step 1: Install MongoDB

**Windows:**
1. Download from [MongoDB Download Center](https://www.mongodb.com/try/download/community)
2. Run installer
3. MongoDB runs as a service automatically

**Mac (Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux (Ubuntu):**
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

### Step 2: Verify MongoDB is Running

```bash
# Check if MongoDB is running
mongosh

# Or
mongo
```

You should see: `MongoDB shell version...`

### Step 3: Install Mongoose in Your Project

```bash
npm init -y
npm install express mongoose
```

---

## Connecting to MongoDB

### Understanding Connection URI

```
mongodb://[username:password@]host[:port]/database[?options]
```

**Examples:**
```javascript
// Local MongoDB (default)
"mongodb://localhost:27017/myDatabase"

// With authentication
"mongodb://user:password@localhost:27017/myDatabase"

// MongoDB Atlas (Cloud)
"mongodb+srv://user:password@cluster.mongodb.net/myDatabase"
```

### Method 1: Promise-based Connection

```javascript
import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/todoDB";

mongoose
  .connect(uri)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err) => {
    console.error("❌ Error connecting to MongoDB:", err);
  });
```

### Method 2: Async/Await Connection

```javascript
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoDB");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ Connection failed:", err);
    process.exit(1); // Exit if connection fails
  }
};

connectDB();
```

### Method 3: With Options (Recommended for Production)

```javascript
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/todoDB", {
      useNewUrlParser: true,      // Use new URL parser
      useUnifiedTopology: true,   // Use new connection management
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Error:", err.message);
    process.exit(1);
  }
};
```

### Connection Events

```javascript
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected");
});

// Close connection on app termination
process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
```

---

## Schemas

### What is a Schema?

A **Schema** defines the structure of documents in a MongoDB collection. It's like a blueprint that specifies:
- Field names
- Data types
- Validation rules
- Default values
- Required fields

### Creating a Schema

```javascript
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});
```

### Schema with Options

```javascript
const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,        // Field is mandatory
      trim: true,            // Remove whitespace
      minlength: 3,          // Minimum length
      maxlength: 100,        // Maximum length
    },
    description: {
      type: String,
      default: "",           // Default value
    },
    completed: {
      type: Boolean,
      default: false,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"], // Only these values allowed
      default: "medium",
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
    tags: [String],          // Array of strings
  },
  {
    timestamps: true,        // Adds createdAt and updatedAt automatically
  }
);
```

### Schema Data Types

```javascript
const exampleSchema = new mongoose.Schema({
  // Basic types
  name: String,
  age: Number,
  isActive: Boolean,
  birthDate: Date,
  buffer: Buffer,
  mixedData: mongoose.Schema.Types.Mixed,
  objectId: mongoose.Schema.Types.ObjectId,
  
  // Arrays
  tags: [String],
  numbers: [Number],
  
  // Nested objects
  address: {
    street: String,
    city: String,
    zipCode: Number,
  },
  
  // Array of objects
  comments: [{
    text: String,
    author: String,
    date: Date,
  }],
  
  // Reference to another collection
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
```

---

## Models

### What is a Model?

A **Model** is a class created from a Schema. It provides an interface to:
- Create documents
- Query the database
- Update documents
- Delete documents

**Schema → Model → Document**

### Creating a Model

```javascript
// Define schema
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

// Create model
const Todo = mongoose.model("Todo", todoSchema);

// Mongoose automatically:
// 1. Creates collection name "todos" (lowercase, plural)
// 2. Uses schema structure for validation
```

### Custom Collection Name

```javascript
// Third parameter specifies collection name
const Todo = mongoose.model("Todo", todoSchema, "myTodoCollection");
```

---

## CRUD Operations

### Create (C)

**Method 1: Using `new` and `save()`**
```javascript
const newTodo = new Todo({
  title: "Buy groceries",
  completed: false,
});

newTodo.save()
  .then((todo) => {
    console.log("Todo created:", todo);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
```

**Method 2: Using `create()`**
```javascript
Todo.create({
  title: "Learn Mongoose",
  completed: false,
})
  .then((todo) => {
    console.log("Todo created:", todo);
  })
  .catch((err) => {
    console.error("Error:", err);
  });
```

**Method 3: Create Multiple**
```javascript
Todo.insertMany([
  { title: "Task 1", completed: false },
  { title: "Task 2", completed: true },
  { title: "Task 3", completed: false },
])
  .then((todos) => {
    console.log("Todos created:", todos);
  });
```

### Read (R)

**Find All Documents**
```javascript
Todo.find()
  .then((todos) => {
    console.log("All todos:", todos);
  });
```

**Find with Conditions**
```javascript
// Find completed todos
Todo.find({ completed: true })
  .then((todos) => {
    console.log("Completed todos:", todos);
  });

// Find by multiple conditions
Todo.find({ 
  completed: false, 
  priority: "high" 
})
  .then((todos) => {
    console.log("High priority incomplete todos:", todos);
  });
```

**Find One Document**
```javascript
// Find first matching document
Todo.findOne({ title: "Buy groceries" })
  .then((todo) => {
    console.log("Found todo:", todo);
  });
```

**Find by ID**
```javascript
Todo.findById("65a1b2c3d4e5f6g7h8i9j0k1")
  .then((todo) => {
    console.log("Todo:", todo);
  });
```

**Find with Specific Fields**
```javascript
// Only return title and completed fields
Todo.find().select("title completed")
  .then((todos) => {
    console.log(todos);
  });

// Exclude _id
Todo.find().select("title completed -_id")
  .then((todos) => {
    console.log(todos);
  });
```

### Update (U)

**Update One Document**
```javascript
Todo.updateOne(
  { _id: "65a1b2c3d4e5f6g7h8i9j0k1" },  // Filter
  { completed: true }                    // Update
)
  .then((result) => {
    console.log("Modified count:", result.modifiedCount);
  });
```

**Update Many Documents**
```javascript
Todo.updateMany(
  { completed: false },           // Filter: all incomplete
  { priority: "high" }            // Update: set priority to high
)
  .then((result) => {
    console.log("Modified:", result.modifiedCount);
  });
```

**Find and Update (Returns Updated Document)**
```javascript
Todo.findByIdAndUpdate(
  "65a1b2c3d4e5f6g7h8i9j0k1",
  { completed: true },
  { new: true }  // Return updated document (not old one)
)
  .then((todo) => {
    console.log("Updated todo:", todo);
  });
```

**Find One and Update**
```javascript
Todo.findOneAndUpdate(
  { title: "Buy groceries" },
  { completed: true },
  { new: true }
)
  .then((todo) => {
    console.log("Updated:", todo);
  });
```

### Delete (D)

**Delete One Document**
```javascript
Todo.deleteOne({ _id: "65a1b2c3d4e5f6g7h8i9j0k1" })
  .then((result) => {
    console.log("Deleted count:", result.deletedCount);
  });
```

**Delete Many Documents**
```javascript
Todo.deleteMany({ completed: true })
  .then((result) => {
    console.log("Deleted:", result.deletedCount);
  });
```

**Find and Delete (Returns Deleted Document)**
```javascript
Todo.findByIdAndDelete("65a1b2c3d4e5f6g7h8i9j0k1")
  .then((todo) => {
    console.log("Deleted todo:", todo);
  });
```

**Find One and Delete**
```javascript
Todo.findOneAndDelete({ title: "Old task" })
  .then((todo) => {
    console.log("Deleted:", todo);
  });
```

---

## Mongoose Methods

### Instance Methods (Document Methods)

These methods work on individual documents.

```javascript
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

// Add custom instance method
todoSchema.methods.markComplete = function() {
  this.completed = true;
  return this.save();
};

todoSchema.methods.toggleComplete = function() {
  this.completed = !this.completed;
  return this.save();
};

const Todo = mongoose.model("Todo", todoSchema);

// Usage
const todo = await Todo.findById(id);
await todo.markComplete();
```

### Static Methods (Model Methods)

These methods work on the entire model/collection.

```javascript
// Add custom static method
todoSchema.statics.findCompleted = function() {
  return this.find({ completed: true });
};

todoSchema.statics.findByPriority = function(priority) {
  return this.find({ priority });
};

// Usage
const completedTodos = await Todo.findCompleted();
const highPriorityTodos = await Todo.findByPriority("high");
```

### Virtual Properties

Virtual properties are not stored in MongoDB but computed on-the-fly.

```javascript
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
});

// Create virtual property
userSchema.virtual("fullName").get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Set virtual property
userSchema.virtual("fullName").set(function(name) {
  const parts = name.split(" ");
  this.firstName = parts[0];
  this.lastName = parts[1];
});

const User = mongoose.model("User", userSchema);

const user = new User({
  firstName: "John",
  lastName: "Doe",
});

console.log(user.fullName); // "John Doe"
```

---

## Query Methods

### Comparison Operators

```javascript
// Greater than
Todo.find({ priority: { $gt: 5 } });

// Greater than or equal
Todo.find({ priority: { $gte: 5 } });

// Less than
Todo.find({ priority: { $lt: 5 } });

// Less than or equal
Todo.find({ priority: { $lte: 5 } });

// Not equal
Todo.find({ completed: { $ne: true } });

// In array
Todo.find({ priority: { $in: ["high", "medium"] } });

// Not in array
Todo.find({ priority: { $nin: ["low"] } });
```

### Logical Operators

```javascript
// AND (implicit)
Todo.find({ completed: false, priority: "high" });

// OR
Todo.find({
  $or: [
    { completed: true },
    { priority: "high" }
  ]
});

// AND (explicit)
Todo.find({
  $and: [
    { completed: false },
    { priority: "high" }
  ]
});

// NOT
Todo.find({ completed: { $not: { $eq: true } } });

// NOR (not any)
Todo.find({
  $nor: [
    { completed: true },
    { priority: "low" }
  ]
});
```

### String Operators

```javascript
// Regex search
Todo.find({ title: /grocery/i }); // Case-insensitive

// Starts with
Todo.find({ title: /^Buy/ });

// Ends with
Todo.find({ title: /today$/ });

// Contains
Todo.find({ title: { $regex: "important", $options: "i" } });
```

### Array Operators

```javascript
// All elements match
Todo.find({ tags: { $all: ["urgent", "work"] } });

// Array size
Todo.find({ tags: { $size: 3 } });

// Element matches
Todo.find({ "comments.author": "John" });
```

### Sorting

```javascript
// Sort ascending
Todo.find().sort({ title: 1 });

// Sort descending
Todo.find().sort({ createdAt: -1 });

// Multiple sort fields
Todo.find().sort({ priority: -1, createdAt: 1 });
```

### Limiting and Skipping

```javascript
// Limit results
Todo.find().limit(10);

// Skip results (pagination)
Todo.find().skip(20).limit(10);

// Page 1: skip(0).limit(10)
// Page 2: skip(10).limit(10)
// Page 3: skip(20).limit(10)
```

### Counting

```javascript
// Count documents
const count = await Todo.countDocuments({ completed: false });
console.log("Incomplete todos:", count);

// Count all
const total = await Todo.countDocuments();
```

### Distinct Values

```javascript
// Get unique priorities
const priorities = await Todo.distinct("priority");
console.log(priorities); // ["low", "medium", "high"]
```

---

## Validation

### Built-in Validators

```javascript
const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    minlength: [3, "Title must be at least 3 characters"],
    maxlength: [100, "Title cannot exceed 100 characters"],
    trim: true,
    lowercase: true,  // Convert to lowercase
    uppercase: true,  // Convert to uppercase
  },
  email: {
    type: String,
    required: true,
    unique: true,  // Create unique index
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
  },
  age: {
    type: Number,
    min: [0, "Age cannot be negative"],
    max: [120, "Age seems invalid"],
  },
  priority: {
    type: String,
    enum: {
      values: ["low", "medium", "high"],
      message: "{VALUE} is not a valid priority",
    },
  },
});
```

### Custom Validators

```javascript
const userSchema = new mongoose.Schema({
  password: {
    type: String,
    validate: {
      validator: function(value) {
        return value.length >= 8;
      },
      message: "Password must be at least 8 characters",
    },
  },
  age: {
    type: Number,
    validate: {
      validator: function(value) {
        return value >= 18;
      },
      message: "Must be 18 or older",
    },
  },
});
```

### Async Validators

```javascript
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    validate: {
      validator: async function(value) {
        const user = await this.constructor.findOne({ username: value });
        return !user; // Return false if user exists
      },
      message: "Username already taken",
    },
  },
});
```

---

## MongoDB Aggregation

### What is Aggregation?

Aggregation is a powerful way to process and analyze data. Think of it as a **pipeline** where data flows through multiple stages, each transforming the data.

**Use cases:**
- Calculate statistics (sum, average, count)
- Group data
- Filter complex queries
- Transform data structure
- Join collections

### Basic Aggregation Pipeline

```javascript
Todo.aggregate([
  // Stage 1: Match (filter)
  { $match: { completed: false } },
  
  // Stage 2: Group
  { $group: {
      _id: "$priority",
      count: { $sum: 1 }
    }
  },
  
  // Stage 3: Sort
  { $sort: { count: -1 } }
])
.then((result) => {
  console.log(result);
  // [
  //   { _id: "high", count: 15 },
  //   { _id: "medium", count: 10 },
  //   { _id: "low", count: 5 }
  // ]
});
```

### Aggregation Stages

**$match - Filter Documents**
```javascript
Todo.aggregate([
  { $match: { completed: true } }
]);
```

**$group - Group Documents**
```javascript
// Count todos by priority
Todo.aggregate([
  { $group: {
      _id: "$priority",
      total: { $sum: 1 },
      titles: { $push: "$title" }
    }
  }
]);
```

**$project - Select/Transform Fields**
```javascript
Todo.aggregate([
  { $project: {
      title: 1,
      completed: 1,
      titleLength: { $strLenCP: "$title" }
    }
  }
]);
```

**$sort - Sort Documents**
```javascript
Todo.aggregate([
  { $sort: { createdAt: -1 } }  // Newest first
]);
```

**$limit and $skip - Pagination**
```javascript
Todo.aggregate([
  { $sort: { createdAt: -1 } },
  { $skip: 10 },
  { $limit: 5 }
]);
```

**$lookup - Join Collections**
```javascript
// Join todos with users
Todo.aggregate([
  { $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  }
]);
```

**$unwind - Deconstruct Array**
```javascript
Todo.aggregate([
  { $unwind: "$tags" }  // Create separate document for each tag
]);
```

### Complex Aggregation Example

```javascript
// Get statistics about todos
Todo.aggregate([
  // Stage 1: Match incomplete todos
  { $match: { completed: false } },
  
  // Stage 2: Group by priority
  { $group: {
      _id: "$priority",
      count: { $sum: 1 },
      avgTitleLength: { $avg: { $strLenCP: "$title" } },
      todos: { $push: {
        title: "$title",
        createdAt: "$createdAt"
      }}
    }
  },
  
  // Stage 3: Add calculated field
  { $addFields: {
      priority: "$_id"
    }
  },
  
  // Stage 4: Remove _id
  { $project: {
      _id: 0,
      priority: 1,
      count: 1,
      avgTitleLength: { $round: ["$avgTitleLength", 2] },
      todos: 1
    }
  },
  
  // Stage 5: Sort by count
  { $sort: { count: -1 } }
])
.then((stats) => {
  console.log(JSON.stringify(stats, null, 2));
});
```

### Aggregation Operators

**Arithmetic**
```javascript
{ $add: ["$price", "$tax"] }
{ $subtract: ["$total", "$discount"] }
{ $multiply: ["$quantity", "$price"] }
{ $divide: ["$total", "$count"] }
```

**String**
```javascript
{ $concat: ["$firstName", " ", "$lastName"] }
{ $toUpper: "$title" }
{ $toLower: "$email" }
{ $substr: ["$title", 0, 10] }
```

**Date**
```javascript
{ $year: "$createdAt" }
{ $month: "$createdAt" }
{ $dayOfWeek: "$createdAt" }
{ $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
```

**Conditional**
```javascript
{ $cond: {
    if: { $gte: ["$score", 90] },
    then: "A",
    else: "B"
  }
}
```

---

## Advanced Topics

### Middleware (Hooks)

**Pre Hooks** - Run before operation
```javascript
todoSchema.pre("save", function(next) {
  console.log("About to save:", this.title);
  next();
});

todoSchema.pre("find", function(next) {
  this.start = Date.now();
  next();
});
```

**Post Hooks** - Run after operation
```javascript
todoSchema.post("save", function(doc, next) {
  console.log("Saved:", doc.title);
  next();
});

todoSchema.post("find", function(docs, next) {
  console.log(`Query took ${Date.now() - this.start}ms`);
  next();
});
```

### Population (Referencing)

```javascript
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const todoSchema = new mongoose.Schema({
  title: String,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"  // Reference to User model
  }
});

const User = mongoose.model("User", userSchema);
const Todo = mongoose.model("Todo", todoSchema);

// Create todo with user reference
const user = await User.create({ name: "John", email: "john@example.com" });
const todo = await Todo.create({ 
  title: "My task", 
  userId: user._id 
});

// Populate user data
const todoWithUser = await Todo.findById(todo._id).populate("userId");
console.log(todoWithUser.userId.name); // "John"
```

### Indexes

```javascript
// Single field index
todoSchema.index({ title: 1 });

// Compound index
todoSchema.index({ priority: 1, completed: 1 });

// Unique index
todoSchema.index({ email: 1 }, { unique: true });

// Text index for search
todoSchema.index({ title: "text", description: "text" });

// Use text search
Todo.find({ $text: { $search: "important grocery" } });
```

### Transactions (MongoDB 4.0+)

```javascript
const session = await mongoose.startSession();
session.startTransaction();

try {
  const user = await User.create([{ name: "John" }], { session });
  const todo = await Todo.create([{ 
    title: "Task", 
    userId: user[0]._id 
  }], { session });
  
  await session.commitTransaction();
  console.log("Transaction successful");
} catch (error) {
  await session.abortTransaction();
  console.error("Transaction failed:", error);
} finally {
  session.endSession();
}
```

---

## Best Practices

### 1. Connection Management

```javascript
// db.js
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
```

### 2. Schema Organization

```javascript
// models/Todo.js
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Todo", todoSchema);
```

### 3. Error Handling

```javascript
// Use try-catch with async/await
app.post("/todos", async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({ 
        error: error.message 
      });
    }
    res.status(500).json({ 
      error: "Server error" 
    });
  }
});
```

### 4. Environment Variables

```javascript
// .env
MONGO_URI=mongodb://localhost:27017/todoDB
PORT=8080

// server.js
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI);
```

### 5. Lean Queries (Performance)

```javascript
// Regular query returns Mongoose document (heavy)
const todos = await Todo.find();

// Lean query returns plain JavaScript object (faster)
const todos = await Todo.find().lean();
```

### 6. Select Only Needed Fields

```javascript
// Don't fetch all fields if you only need some
const todos = await Todo.find().select("title completed");
```

### 7. Use Indexes

```javascript
// For frequently queried fields
todoSchema.index({ userId: 1, createdAt: -1 });
```

---

## Complete Mini Project Structure

```
todo-api/
├── server.js
├── config/
│   └── db.js
├── models/
│   └── Todo.js
├── routes/
│   └── todoRoutes.js
├── controllers/
│   └── todoController.js
├── middleware/
│   └── errorHandler.js
├── .env
└── package.json
```

**config/db.js**
```javascript
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
```

**models/Todo.js**
```javascript
import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
```

**controllers/todoController.js**
```javascript
import Todo from "../models/Todo.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**routes/todoRoutes.js**
```javascript
import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController.js";

const router = express.Router();

router.get("/", getTodos);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
```

**server.js**
```javascript
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.use("/api/todos", todoRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

**.env**
```
MONGO_URI=mongodb://localhost:27017/todoDB
PORT=8080
NODE_ENV=development
```

---

## Practical Examples & Use Cases

### Example 1: User Authentication Schema

```javascript
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Don't return password in JSON
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export default mongoose.model("User", userSchema);
```

**Usage:**
```javascript
// Register user
const user = await User.create({
  username: "john_doe",
  email: "john@example.com",
  password: "securepassword123",
});

// Login user
const user = await User.findOne({ email: "john@example.com" });
const isMatch = await user.comparePassword("securepassword123");
if (isMatch) {
  console.log("Login successful");
}
```

### Example 2: Blog Post with Comments

```javascript
const commentSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  text: {
    type: String,
    required: true,
    maxlength: 500,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [String],
    comments: [commentSchema],
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
    views: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Virtual for comment count
postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

// Instance method to add comment
postSchema.methods.addComment = function (userId, text) {
  this.comments.push({ author: userId, text });
  return this.save();
};

// Static method to find popular posts
postSchema.statics.findPopular = function (limit = 10) {
  return this.find({ published: true })
    .sort({ views: -1 })
    .limit(limit)
    .populate("author", "username");
};

export default mongoose.model("Post", postSchema);
```

**Usage:**
```javascript
// Create post
const post = await Post.create({
  title: "My First Post",
  content: "This is the content...",
  author: userId,
  tags: ["javascript", "node"],
});

// Add comment
await post.addComment(commenterId, "Great post!");

// Get popular posts
const popularPosts = await Post.findPopular(5);

// Get post with author and comments populated
const post = await Post.findById(postId)
  .populate("author", "username email")
  .populate("comments.author", "username");
```

### Example 3: E-commerce Product Schema

```javascript
const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: ["Electronics", "Clothing", "Books", "Home", "Sports"],
    },
    brand: String,
    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    images: [String],
    reviews: [reviewSchema],
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Virtual for average rating
productSchema.virtual("averageRating").get(function () {
  if (this.reviews.length === 0) return 0;
  const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / this.reviews.length).toFixed(1);
});

// Virtual for in stock status
productSchema.virtual("inStock").get(function () {
  return this.stock > 0;
});

// Method to check if product can be purchased
productSchema.methods.canPurchase = function (quantity) {
  return this.stock >= quantity;
};

// Static method to find products by category
productSchema.statics.findByCategory = function (category) {
  return this.find({ category, stock: { $gt: 0 } });
};

// Middleware to update sold count
productSchema.methods.purchase = async function (quantity) {
  if (!this.canPurchase(quantity)) {
    throw new Error("Insufficient stock");
  }
  this.stock -= quantity;
  this.sold += quantity;
  return this.save();
};

export default mongoose.model("Product", productSchema);
```

### Example 4: Advanced Aggregation Queries

**Sales Analytics**
```javascript
// Get total sales by category
const salesByCategory = await Order.aggregate([
  // Match completed orders
  { $match: { status: "completed" } },
  
  // Unwind products array
  { $unwind: "$products" },
  
  // Lookup product details
  {
    $lookup: {
      from: "products",
      localField: "products.productId",
      foreignField: "_id",
      as: "productDetails",
    },
  },
  
  // Unwind product details
  { $unwind: "$productDetails" },
  
  // Group by category
  {
    $group: {
      _id: "$productDetails.category",
      totalRevenue: {
        $sum: {
          $multiply: ["$products.quantity", "$products.price"],
        },
      },
      totalQuantity: { $sum: "$products.quantity" },
      orderCount: { $sum: 1 },
    },
  },
  
  // Sort by revenue
  { $sort: { totalRevenue: -1 } },
  
  // Format output
  {
    $project: {
      _id: 0,
      category: "$_id",
      revenue: { $round: ["$totalRevenue", 2] },
      quantity: "$totalQuantity",
      orders: "$orderCount",
    },
  },
]);

console.log(salesByCategory);
```

**User Activity Report**
```javascript
// Get user activity statistics
const userStats = await User.aggregate([
  // Match active users
  { $match: { isActive: true } },
  
  // Lookup user's todos
  {
    $lookup: {
      from: "todos",
      localField: "_id",
      foreignField: "userId",
      as: "todos",
    },
  },
  
  // Add calculated fields
  {
    $addFields: {
      totalTodos: { $size: "$todos" },
      completedTodos: {
        $size: {
          $filter: {
            input: "$todos",
            cond: { $eq: ["$this.completed", true] },
          },
        },
      },
    },
  },
  
  // Calculate completion rate
  {
    $addFields: {
      completionRate: {
        $cond: {
          if: { $eq: ["$totalTodos", 0] },
          then: 0,
          else: {
            $multiply: [
              { $divide: ["$completedTodos", "$totalTodos"] },
              100,
            ],
          },
        },
      },
    },
  },
  
  // Project final fields
  {
    $project: {
      username: 1,
      email: 1,
      totalTodos: 1,
      completedTodos: 1,
      completionRate: { $round: ["$completionRate", 2] },
    },
  },
  
  // Sort by completion rate
  { $sort: { completionRate: -1 } },
]);
```

**Monthly Trends**
```javascript
// Get todo creation trends by month
const monthlyTrends = await Todo.aggregate([
  // Group by month
  {
    $group: {
      _id: {
        year: { $year: "$createdAt" },
        month: { $month: "$createdAt" },
      },
      total: { $sum: 1 },
      completed: {
        $sum: { $cond: ["$completed", 1, 0] },
      },
      incomplete: {
        $sum: { $cond: ["$completed", 0, 1] },
      },
    },
  },
  
  // Sort by date
  { $sort: { "_id.year": -1, "_id.month": -1 } },
  
  // Format output
  {
    $project: {
      _id: 0,
      month: {
        $concat: [
          { $toString: "$_id.year" },
          "-",
          { $toString: "$_id.month" },
        ],
      },
      total: 1,
      completed: 1,
      incomplete: 1,
      completionRate: {
        $multiply: [{ $divide: ["$completed", "$total"] }, 100],
      },
    },
  },
]);
```

---

## Performance Optimization

### 1. Use Indexes

```javascript
// Create indexes for frequently queried fields
todoSchema.index({ userId: 1, createdAt: -1 });
todoSchema.index({ completed: 1, priority: 1 });

// Text index for search
todoSchema.index({ title: "text", description: "text" });

// Check existing indexes
Todo.collection.getIndexes().then(console.log);
```

### 2. Use Lean Queries

```javascript
// Regular query (returns Mongoose documents)
const todos = await Todo.find(); // Slower, more memory

// Lean query (returns plain objects)
const todos = await Todo.find().lean(); // Faster, less memory
```

### 3. Select Only Required Fields

```javascript
// Don't do this (fetches all fields)
const users = await User.find();

// Do this (fetch only needed fields)
const users = await User.find().select("username email");
```

### 4. Limit Results

```javascript
// Always limit results for lists
const todos = await Todo.find().limit(50);

// Pagination
const page = 1;
const limit = 20;
const todos = await Todo.find()
  .skip((page - 1) * limit)
  .limit(limit);
```

### 5. Use Aggregation for Complex Queries

```javascript
// Instead of multiple queries
const users = await User.find();
for (let user of users) {
  user.todoCount = await Todo.countDocuments({ userId: user._id });
}

// Use aggregation (single query)
const usersWithCount = await User.aggregate([
  {
    $lookup: {
      from: "todos",
      localField: "_id",
      foreignField: "userId",
      as: "todos",
    },
  },
  {
    $addFields: {
      todoCount: { $size: "$todos" },
    },
  },
]);
```

---

## Common Patterns & Solutions

### Pattern 1: Soft Delete

```javascript
const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
  deleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: Date,
});

// Middleware to exclude deleted items
todoSchema.pre(/^find/, function (next) {
  this.find({ deleted: { $ne: true } });
  next();
});

// Soft delete method
todoSchema.methods.softDelete = function () {
  this.deleted = true;
  this.deletedAt = new Date();
  return this.save();
};

// Find deleted items
todoSchema.statics.findDeleted = function () {
  return this.find({ deleted: true });
};
```

### Pattern 2: Slugs for URLs

```javascript
import slugify from "slugify";

const postSchema = new mongoose.Schema({
  title: String,
  slug: {
    type: String,
    unique: true,
  },
});

// Auto-generate slug
postSchema.pre("save", function (next) {
  if (this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});
```

### Pattern 3: Pagination Helper

```javascript
const paginationPlugin = function (schema) {
  schema.statics.paginate = async function (query, options) {
    const page = parseInt(options.page) || 1;
    const limit = parseInt(options.limit) || 10;
    const skip = (page - 1) * limit;

    const [docs, total] = await Promise.all([
      this.find(query).skip(skip).limit(limit),
      this.countDocuments(query),
    ]);

    return {
      docs,
      total,
      page,
      pages: Math.ceil(total / limit),
      hasNext: page * limit < total,
      hasPrev: page > 1,
    };
  };
};

// Apply plugin
todoSchema.plugin(paginationPlugin);

// Usage
const result = await Todo.paginate(
  { completed: false },
  { page: 2, limit: 20 }
);
```

### Pattern 4: Audit Trail

```javascript
const auditSchema = new mongoose.Schema({
  action: {
    type: String,
    enum: ["create", "update", "delete"],
  },
  modelName: String,
  documentId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  changes: mongoose.Schema.Types.Mixed,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to log changes
todoSchema.post("save", async function (doc) {
  await Audit.create({
    action: doc.isNew ? "create" : "update",
    modelName: "Todo",
    documentId: doc._id,
    changes: doc.toObject(),
  });
});
```

---

## Testing with Mongoose

### Setup Test Database

```javascript
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

// Connect to in-memory database
export const connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
};

// Disconnect and close
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
};

// Clear database
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();
  }
};
```

### Example Test

```javascript
import { connect, closeDatabase, clearDatabase } from "./testDb.js";
import Todo from "./models/Todo.js";

describe("Todo Model", () => {
  beforeAll(async () => await connect());
  afterEach(async () => await clearDatabase());
  afterAll(async () => await closeDatabase());

  it("should create a todo", async () => {
    const todo = await Todo.create({
      title: "Test todo",
      completed: false,
    });

    expect(todo.title).toBe("Test todo");
    expect(todo.completed).toBe(false);
  });

  it("should validate required fields", async () => {
    const todo = new Todo({});
    
    await expect(todo.save()).rejects.toThrow();
  });
});
```

---

## Troubleshooting Common Issues

### Issue 1: Connection Timeout

```javascript
// Add timeout options
await mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});
```

### Issue 2: Duplicate Key Error

```javascript
// Handle duplicate key errors
try {
  await User.create({ email: "existing@example.com" });
} catch (error) {
  if (error.code === 11000) {
    console.log("Email already exists");
  }
}
```

### Issue 3: Cast Error (Invalid ObjectId)

```javascript
// Validate ObjectId before query
import mongoose from "mongoose";

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ error: "Invalid ID" });
}
```

### Issue 4: Memory Leak with Event Listeners

```javascript
// Remove event listeners when done
const connection = mongoose.connection;

const handleError = (err) => console.error(err);
connection.on("error", handleError);

// Later, remove listener
connection.off("error", handleError);
```

---

## Resources & Further Learning

### Official Documentation
- **Mongoose Docs**: [https://mongoosejs.com/docs/](https://mongoosejs.com/docs/)
- **MongoDB Manual**: [https://docs.mongodb.com/manual/](https://docs.mongodb.com/manual/)
- **MongoDB University**: [https://university.mongodb.com/](https://university.mongodb.com/)

### Useful Tools
- **MongoDB Compass**: GUI for MongoDB
- **Studio 3T**: Advanced MongoDB GUI
- **MongoDB Atlas**: Cloud-hosted MongoDB
- **Robo 3T**: Lightweight MongoDB client

### Best Practice Guides
- Schema design patterns
- Indexing strategies
- Query optimization
- Security best practices

---

## Quick Reference Cheat Sheet

### Connection
```javascript
mongoose.connect("mongodb://localhost:27017/dbname");
```

### Schema & Model
```javascript
const schema = new mongoose.Schema({ name: String });
const Model = mongoose.model("ModelName", schema);
```

### CRUD
```javascript
// Create
await Model.create({ name: "John" });

// Read
await Model.find({ name: "John" });
await Model.findById(id);

// Update
await Model.updateOne({ _id: id }, { name: "Jane" });
await Model.findByIdAndUpdate(id, { name: "Jane" }, { new: true });

// Delete
await Model.deleteOne({ _id: id });
await Model.findByIdAndDelete(id);
```

### Queries
```javascript
Model.find({ age: { $gte: 18 } })
  .sort({ createdAt: -1 })
  .limit(10)
  .select("name email")
  .populate("author")
  .lean();
```

### Aggregation
```javascript
Model.aggregate([
  { $match: { status: "active" } },
  { $group: { _id: "$category", count: { $sum: 1 } } },
  { $sort: { count: -1 } },
]);
```

---

**You now have a complete understanding of Mongoose and MongoDB! Start with basic CRUD operations, then gradually explore schemas, validation, aggregation, and advanced patterns. Happy coding!** 🚀