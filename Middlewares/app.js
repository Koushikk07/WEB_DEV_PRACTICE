const express = require("express");
const app = express();

//middleware --> response send

/* app.use((req, res, next) => {
  console.log("Hi!, I am middleware");
  res.send("Middleware Finished");
  next(); //it moved to next middleware if not routes,, better to use is at last, we can also return next(); after next line wont execute(not proper way of writing code)
}); // below wont work ,, it execute for every req ,even for not path exit
 */

// Creating Utility Middleware
/* 
Logger --> log(useful info console print) req->method(GET,POST,PUT,DELETE);  git log kinda

*/

/* //LOGGER-MORGAN
app.use((req, res, next) => {
  req.time = new Date(Date.now()).toString();
  console.log(req.method, req.hostname, req.path, req.time);
  next(); // middlewares should be before routes
});
 */
app.use("/api", (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  }
  //res.send("ACESS DENIED");//
  throw new Error("ACCESS DENIED!");
});
//Error Handling

//multiple middlewares
const checkTokens = (req, res, next) => {
  let { token } = req.query;
  if (token === "giveaccess") {
    next();
  }
  //res.send("ACESS DENIED");//
  throw new Error("ACCESS DENIED!");
};

app.use("/api", checkTokens, (req, res) => {
  res.send("DATA");
});

app.get("/", (req, res) => {
  res.send("Hi,I am root.");
});

app.get("/random", (req, res) => {
  res.send("This is a random page");
});

app.listen(8000, () => {
  console.log("Server Listening to port: 8000");
});
