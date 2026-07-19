const express = require("express");
const app = express();
const post = 8080;
app.get("/register", (req, res) => {
  res.send("standard get response");
});
