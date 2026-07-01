const express = require("express");

const app = express();

let port = 8080;

app.use((req, res) => {
  console.log("request Received!");
});

app.listen(port, () => {
  console.log(`App is Listening on port ${port}`);
});
