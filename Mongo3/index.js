const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let Chat1 = new Chat({
  from: "Gudapur Koushik",
  to: "Tupakula Narender",
  msg: "Namaste Bhai! Etla Unav", //message wont save , must use msg
  created_at: new Date(),
});

Chat1.save().then((res) => {
  console.log(res);
});

app.set("views", path.join(__dirname, "views"));
app.set("view Engine", "ejs");

app.get("/", (req, res) => {
  res.send("Working root!");
});

app.listen(8000, () => {
  console.log("app is listening...!");
});
