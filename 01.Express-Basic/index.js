import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const inMemoryDB = [];

app.post("/data", (req, res) => {
  console.log(req);
  const { name, age, dob } = req.body;
  if (!name || !age || !dob) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const newData = { id: inMemoryDB.length + 1, name, age, dob };
  inMemoryDB.push(newData);
});

app.get("/data", (req, res) => {
  res.json(inMemoryDB);
});

app.get("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const data = inMemoryDB.find((item) => item.id === id);
  if (!data) {
    return res.status(404).json({ error: "Data not found" });
  }
  res.json(data);
});

app.put("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dataIndex = inMemoryDB.findIndex((item) => item.id === id);
  if (dataIndex === -1) {
    return res.status(404).json({ error: "Data not found" });
  }
  const { name, age, dob } = req.body;
  if (!name || !age || !dob) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  inMemoryDB[dataIndex] = { id, name, age, dob };
  res.json(inMemoryDB[dataIndex]);
});

app.delete("/data/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const dataIndex = inMemoryDB.findIndex((item) => item.id === id);
  if (dataIndex === -1) {
    return res.status(404).json({ error: "Data not found" });
  }
  inMemoryDB.splice(dataIndex, 1);
  res.json({ message: "Data deleted successfully" });
});
