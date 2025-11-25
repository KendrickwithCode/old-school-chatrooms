import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = "./server/data.json";

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, "utf8"));
}

function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET all messages
app.get("/messages", (req, res) => {
  const db = readDB();
  res.json(db.messages);
});

// POST new message
app.post("/messages", (req, res) => {
  const db = readDB();

  const newMessage = {
    id: Date.now(),
    user: req.body.user,
    message: req.body.message,
    online: req.body.online ?? true
  };

  db.messages.push(newMessage);
  writeDB(db);

  res.json(newMessage);
});

app.listen(3000, () => {
  console.log("API running at http://localhost:3000");
});
