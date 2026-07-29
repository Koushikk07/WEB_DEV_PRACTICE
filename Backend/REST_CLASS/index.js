const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

let posts = [
  {
    username: "Ram Charan",
    content: "I love coding",
  },
  {
    username: "Prabhas Raju",
    content: "I love food, thanks to thanks a lot",
  },
  {
    username: "Allu arjun",
    content: "naku Dulla ekuva, bhai bolthe",
  },
  {
    username: "Vijay Devarakonda",
    content: "Fashion Designer | actor",
  },
  {
    username: "Mahesh Babu",
    content: "Babu lake babu",
  },
  {
    username: "Akhil",
    content: "ayyagare no.1",
  },
  {
    username: "Surya",
    content: "ROLEX | Most wanted Criminal",
  },
  {
    username: "Nani",
    content: "currently working on paradise.",
  },
  {
    username: "Karthik",
    content: "Evaru ra miru antha ",
  },
];

app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});

app.listen(port, () => {
  console.log("listening to port:8000");
});
