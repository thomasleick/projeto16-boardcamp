require("dotenv").config();
const express = require("express");
const cors = require("cors");
const corsOptions = require("./configs/corsOptions");
//const cookieParser = require('cookie-parser')
const credentials = require("./middlewares/credentials");

// import Routes
const gamesRouter = require("./routes/games");
const customersRouter = require("./routes/customers");
const rentsRouter = require("./routes/rents");

const app = express();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
//app.use(cookieParser())

const { Client } = require("pg");
const DATABASE_URL = process.env.DATABASE_URL;
const PORT = process.env.PORT || 5000;
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

app.get("/", (req, res) => {
  res.send("Hello, world!");
});
// Routes
app.use("/games", gamesRouter);
app.use("/customers", customersRouter);
app.use("/rentals", rentsRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
