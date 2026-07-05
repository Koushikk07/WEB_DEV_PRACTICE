/* 
TEmplating

EJS - embedded javascript templates

-- it is a simple templating language that lets you generate html markup with plain js.

/:username  ex/users -- routes

(blueprint)

*/

const express = require("express"); //we dont need to require ejs , express my default inherit internally
const app = express();
const path = require("path");

const port = 8080;

app.set("view engine", "ejs"); //view -- template engine
app.set("views", path.join(__dirname, "/views")); //joins the path --> c/user/admin../webdev/ejs + /views
app.get("/", (req, res) => {
  // res.send("salam vale kum !"); // render - send files,send -- normal data
  res.render("home.ejs"); //by default check in views  // it only works when you start server from this folder , not any other parent folder ex nodeman ejs/index.js sol: use path
});

app.get("/dice", (req, res) => {
  let diceVal = Math.floor(Math.random() * 6) + 1;
  res.render("dices.ejs", { num: diceVal });
});

app.get("/ig/:username", (req, res) => {
  const instaData = require("./data.json");
  let { username } = req.params;
  const data = instaData[username];

  if (data) {
    res.render("instagram.ejs", { data });
  } else {
    res.render("error.ejs");
  }
  /* const followers = [
    "aditya",
    "ram",
    "sampath",
    "narender",
    "abhishek",
    "venu",
    "goutham",
  ]; */
  /*  let { username } = req.params;
  console.log(username); */
  //console.log(username);
  // { username, followers });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

/* 

Interpolation Syntax:  -- refers to embedding expressions into marked up text.

ex. ${name} - basic

ejs - make html dynamic , change in runtime (html)

EJS _ TAGs

<% 'Scriptlet' tag, for control-flow, no output
<%_ ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
<%= Outputs the value into the template (HTML escaped)
<%- Outputs the unescaped value into the template
<%# Comment tag, no execution, no output
<%% Outputs a literal '<%'
%> Plain ending tag
-%> Trim-mode ('newline slurp') tag, trims following newline
_%> ‘Whitespace Slurping’ ending tag, removes all whitespace after it


<ul>
    <h3>Accounts that follows you:</h3>
     <% for(user of followers) {%>
        <li><%= user %></li>
        <% }%>
        </ul>



        .. Includes -- subtemplates some part in html
        <%- include("includes/head.ejs")%>
*/
