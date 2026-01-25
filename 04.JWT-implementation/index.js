import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

mongoose
  .connect("mongodb://localhost:27017/JWTDB")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Could not connect to MongoDB", err);
    process.exit(1);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  });

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const salt = bcrypt.genSaltSync(10);
  const hashedPasswordSync = bcrypt.hashSync(password, salt);
  const user = new User({ username, password: hashedPasswordSync });
  await user.save();
  res.status(201).send("User registered");
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid || !user) {
    return res.status(400).send("Invalid credentials");
  }
  //generate JWT token
  const secret = "gjnrsogbrwohgouwbrjgbwrjbgiubrw";
  const token = jwt.sign({ id: user._id, username: user.username }, secret, {
    expiresIn: "1h",
  });
  res.json({ token: token });
});

//middleware to verify token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }
  jwt.verify(token, "gjnrsogbrwohgouwbrjgbwrjbgiubrw", (err, user) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    req.user = user;
    next();
  });
};

app.get("/protected", verifyToken, (req, res) => {
  res.send(`Hello ${req.user.username}, you have accessed a protected route!`);
});
