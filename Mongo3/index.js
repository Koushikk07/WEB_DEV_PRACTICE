const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat");
app.set("views", path.join(__dirname, "views"));
app.set("view Engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
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

/* let Chat1 = new Chat({
  from: "Gudapur Koushik",
  to: "Tupakula Narender",
  msg: "Namaste Bhai! Etla Unav", //message wont save , must use msg
  created_at: new Date(),
});

Chat1.save().then((res) => {
  console.log(res);
}); */

app.get("/chats", async (req, res) => {
  let chats = await Chat.find();
  //console.log(chats);
  // res.send("working");
  res.render("index.ejs", { chats });
});

app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

//create route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((res) => {
      console.log("Chat was saved!");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
  res.redirect("/chats");
});
app.get("/", (req, res) => {
  res.send("Working root!");
});

app.listen(8000, () => {
  console.log("app is listening...!");
});
