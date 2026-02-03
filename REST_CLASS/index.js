const express = require("express");
const app = express();
const port = 8000;
const path = require("path");
const methodOverride = require("method-override");
const { v4: uuidv4 } = require("uuid");
uuidv4();

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.set(express.json);

let posts = [
  {
    id: uuidv4(),
    username: "koushik",
    content: "inspiring",
  },
  {
    id: uuidv4(),
    username: "aditya",
    content: "software",
  },
  {
    id: uuidv4(),
    username: "narender",
    content: "police",
  },
  {
    id: uuidv4(),
    username: "sampath",
    content: "influencer",
  },
  {
    id: uuidv4(),
    username: "ram",
    content: "freefire",
  },
];

app.get("/posts", (req, res) => {
  //res.send("server is runing fine!");
  res.render("index.ejs", { posts });
});

app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});

app.post("/posts", (req, res) => {
  let { username, content } = req.body;
  let id = uuidv4();
  posts.push({ id, username, content });
  // res.send("add in the database!");
  // res.send("POST request is working buddy !");
  res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  //console.log(id);
  let post = posts.find((p) => id == p.id);

  res.render("show.ejs", { post });

  //res.send("request working");
});

app.patch("/posts/:id", (req, res) => {
  let { id } = req.params;
  let newContent = req.body.content;

  let post = posts.find((p) => id == p.id);
  post.content = newContent;
  console.log(post);
  //res.send("patch is working fine!");
  // here we notcreated any edit open to change the new content we use
  //hopscotch to patch the req then it will taek it further we have to create edit option
res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post = posts.find((p) => id==p.id);
    res.render("edit.ejs",{post});

});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
   posts = posts.filter((p) => id!=p.id);
    res.redirect("/posts");
    //edi database kadhu bayya so delete em cheyalem kabathi
    //FILTER ani array lo oka method use chesi a particular id rakunda migathavi osthai
    //avi malla andarulo ne store chestem no end of the delete la work avthadi!


});
app.listen(port, () => {
  console.log("Listening at port:5000");
});
