const express = require("express");
const app = express();
const ExpressError = require("./ExpressError");

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
  //throw new Error("ACCESS DENIED!");
  throw new ExpressError(401, "ACCESS DENIED!");
});
//Error Handling
//activity
app.get("/admin", (req, res) => {
  throw new ExpressError(403, "Access to admin is forbidden");
});
app.use((err, req, res, next) => {
  /*  console.log(err);
  next(); */ // next non err handling middlewares
  //next(err);  next err handling middlewares

  let { status = 500, message = "Some Error Occurred" } = err;
  res.status(status).send(message);
});

// mini whatsapp error handling

function asyncWrap(fn) {
  return function (req, res, next) {
    fn(req, res, next).catch((err) => next(err));
  };
}

app.get(
  "/chats/:id",
  asyncWrap(async (req, res, next) => {
    // piece of code
  }),
);
// mongoose errors
const handleValidationErr = (err) => {
  console.log("Validation Error occurred");
  return err;
};

app.use((err, req, res, next) => {
  console.log(err.name);
  if (err.name == "ValidationError") {
    err = handleValidationErr(err);
  }
  next(err);
});
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
