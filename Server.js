// server.js
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const app = require("./App");
const DBConnectionHandler = require("./Utils/DBconnect");

// Connect to DB
DBConnectionHandler();

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" });
});

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next("There was a problem");
  } else {
    res.status(err.status || 500).send(err.message || "Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
