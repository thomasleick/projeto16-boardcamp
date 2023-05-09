require("dotenv").config();
const express = require("express");
const { Client } = require("pg");
const DATABASE_URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000
const client = new Client({
  connectionString: DATABASE_URL,
});

client.connect();

client.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Connected to PostgreSQL database at ${res.rows[0].now}`);
  client.end();
});

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});