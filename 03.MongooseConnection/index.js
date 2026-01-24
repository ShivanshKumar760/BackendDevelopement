import express from "express";
import mongoose from "mongoose";

const app = express();
const PORT = 8080;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const uri = "mongodb://localhost:27017/todoPDB";

const todoSchema = new mongoose.Schema({
  title: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
    return 1;
  })
  .then((num) => {
    if (num === 1) {
      app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
    }
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

//via async and await

const startServer = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

//No need to call the above we will use promised version
const w = app;

w.get("/", (req, res) => {
  res.send("Welcome to the Todo API");
});

w.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  const newTodo = new Todo({ title, completed });
  Todo.create(newTodo)
    .then((todo) => {
      res.status(201).json(todo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to create todo" });
    });
});

w.get("/todos", (req, res) => {
  Todo.find()
    .then((todos) => {
      res.status(200).json(todos);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch todos" });
    });
});

w.get("/todos/:id", (req, res) => {
  const { id } = req.params;
  Todo.findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.status(200).json(todo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to fetch todo" });
    });
});

w.put("/todos/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndUpdate(id, req.body, { new: true })
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.status(200).json(todo);
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to update todo" });
    });
});

w.delete("/todos/:id", (req, res) => {
  const { id } = req.params;
  Todo.findByIdAndDelete(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ error: "Todo not found" });
      }
      res.status(200).json({ message: "Todo deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: "Failed to delete todo" });
    });
});
