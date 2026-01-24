const express = require("express");
const app = express();
const port = 8000;
const path = require("path");

app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.set(express.json);

let posts = [
    {
        id: "1",
        username:"koushik",
        content: "inspiring"
    },
     {
        id: "2",
        username:"aditya",
        content: "software"
    },
     {
        id: "3",
        username:"narender",
        content: "police"
    },
     {
        id: "4",
        username:"sampath",
        content: "influencer"
    },
     {
        id: "5",
        username:"ram",
        content: "freefire"
    },
];

app.get("/posts", (req, res) => {
  //res.send("server is runing fine!");
  res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let {username, content }=req.body;
    posts.push({username,content});
   // res.send("add in the database!");
   // res.send("POST request is working buddy !");
   res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id} = req.params;
    //console.log(id);
    let post = posts.find((p)=> id==p.id);
    
    
res.render("show.ejs",{post});
   
    //res.send("request working");


});
app.listen(port, () => {
  console.log("Listening at port:5000");
});
