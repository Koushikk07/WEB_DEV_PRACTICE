const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let posts = [
  {
    id: "1a", //its auto. creates in db
    username: "Ram_Charan",
    content: "I love coding",
  },
  {
    id: "2a",
    username: "Prabhas_Raju",
    content: "I love food, thanks to thanks a lot",
  },
  {
    id: "3a",
    username: "Allu_arjun",
    content: "naku Dulla ekuva, bhai bolthe",
  },
  {
    id: "4a",
    username: "Vijay_Devarakonda",
    content: "Fashion Designer | actor",
  },
  {
    id: "5a",
    username: "Mahesh_Babu",
    content: "Babu lake babu",
  },
  {
    id: "6a",
    username: "Akhil",
    content: "ayyagare no.1",
  },
  {
    id: "7a",
    username: "Surya",
    content: "ROLEX | Most wanted Criminal",
  },
  {
    id: "8a",

    username: "Nani",
    content: "currently working on paradise.",
  },
  {
    id: "8a",
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
  console.log(post);
});

app.listen(port, () => {
  console.log("listening to port:8000");
});
