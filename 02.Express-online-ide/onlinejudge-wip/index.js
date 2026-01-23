import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import judgeRoutes from "./routes/judge.js";

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection (optional - only needed for database tasks)

// Routes
app.use("/api/judge", judgeRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Express.js Online Judge API",
    status: "running",
    endpoints: {
      submit: "POST /api/judge/submit",
      health: "GET /api/judge/health",
    },
  });
});

mongoose
  .connect("mongodb://localhost:27017/express-judge")
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `🚀 Express Judge Server running on http://localhost:${PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("⚠️  MongoDB not connected - database tasks will use mocks");
  });
