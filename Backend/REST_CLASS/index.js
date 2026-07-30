const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
var methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
uuidv4();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
let posts = [
  {
    id: uuidv4(), //its auto. creates in db
    username: "Ram_Charan",
    content: "I love coding",
  },
  {
    id: uuidv4(),
    username: "Prabhas_Raju",
    content: "I love food, thanks to thanks a lot",
  },
  {
    id: uuidv4(),
    username: "Allu_arjun",
    content: "naku Dulla ekuva, bhai bolthe",
  },
  {
    id: uuidv4(),
    username: "Vijay_Devarakonda",
    content: "Fashion Designer | actor",
  },
  {
    id: uuidv4(),
    username: "Mahesh_Babu",
    content: "Babu lake babu",
  },
  {
    id: uuidv4(),
    username: "Akhil",
    content: "ayyagare no.1",
  },
  {
    id: uuidv4(),
    username: "Surya",
    content: "ROLEX | Most wanted Criminal",
  },
  {
    id: uuidv4(),

    username: "Nani",
    content: "currently working on paradise.",
  },
  {
    id: uuidv4(),
    username: "Karthik",
    content: "Evaru ra miru antha ",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  posts.push({ username, content });
  res.redirect("/posts");
});
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  /* console.log(id);
  res.send("request is working"); */
  let post = posts.find((p) => id === p.id);
  res.render("show.ejs", { post });
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;
  let post = posts.find((p) => id === p.id);
  post.content = newContent;
  console.log(newContent);
  // res.send("PATCH request working");
  res.redirect("/posts");
});

app.delete("/posts/:id", (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  //res.send("delete successfully");
  res.redirect("/posts");
});
app.get("/posts/:id/edit", (req, res) => {
  let { id } = req.params;
  let post = posts.find((p) => id === p.id);
  res.render("edit.ejs", { post });
});
app.listen(port, () => {
  console.log("listening to port:8000");
});
