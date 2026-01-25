import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;

//todo: middleware-authentication using jwt and verify token
//todo: create a secret key for jwt
//todo: create a middleware function to verify token
//todo: use the middleware function in the routes
//todo: create a route to generate token for testing
//todo: protect the shorten and redirect routes with the middleware
//todo: test the routes with and without token
//todo: handle token expiration and refresh
//todo: log the user activity with token info
//todo: store the token in a secure way (httpOnly cookie or local storage)
//todo: implement logout functionality to invalidate the token
//todo: add user registration and login routes to generate token
//todo: store user info in the database and associate with shortened urls

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const urlShortenerSchema = new mongoose.Schema({
  originalUrl: String,
  shortCode: String,
});

const UrlShortener = mongoose.model("UrlShortener", urlShortenerSchema);

app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const randomMathCode = Math.random();
  console.log(randomMathCode);
  console.log(randomMathCode.toString(36));
  const shortCode = Math.random().toString(36).substring(2, 8);
  const newUrl = new UrlShortener({ originalUrl, shortCode });
  UrlShortener.create(newUrl)
    .then((data) => {
      res.json({ shortUrl: `http://localhost:3000/${data.shortCode}` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

app.get("/:code", (req, res) => {
  const { code } = req.params;
  const shortCode = code;
  let originalUrl;
  UrlShortener.findOne({ shortCode: shortCode })
    .then((data) => {
      originalUrl = data.originalUrl;
      res.status(301).redirect(originalUrl);
    })
    .catch((err) => {
      res.status(500).json({ error: "Internal Server Error" });
    });
});

mongoose
  .connect("mongodb://localhost:27017/urlShortenerDB")
  .then(() => {
    console.log("Connected to MongoDB");
    //return a process id which means db is connected successfully
    //and start the server
    return process.pid;
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  })
  .then((pid) => {
    if (pid) {
      console.log(`Process ID: ${pid}`);
      console.log("MongoDB connection established successfully on PID:" + pid);
      app.listen(port, () => {
        console.log(
          `URL Shortener service running at http://localhost:${port} with PID: ${pid}`
        );
      });
    }
  });
