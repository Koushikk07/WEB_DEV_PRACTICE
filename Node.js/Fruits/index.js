const apple = require("./apple");
const banana = require("./banana");
const carrot = require("./carrot");
const orange = require("./orange");
const express = require("express");
const app = express();
let port = 8080;

let fruits = [apple, banana, carrot, orange];

app.get("/apple", (req, res) => {
  res.send({
    name: "apple",
    color: "red",
    cost: 40,
  });
});

app.listen(port, () => {
  console.log(`app Listening on port : ${"localhost:" + port}`);
});

module.exports = fruits;
