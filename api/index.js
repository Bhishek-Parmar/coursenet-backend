const express = require("express");
const app = express();
const connectToDb = require("./connectToDb");

connectToDb();

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(5000, () => console.log("Server ready on port 5000."));

module.exports = app;
