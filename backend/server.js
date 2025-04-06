const express = require("express");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bookworm Unite API is running...");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
