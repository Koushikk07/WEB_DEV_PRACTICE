const { faker } = require("@faker-js/faker");
const mysql = require("mysql2");
const express = require("express");
const path = require("path");
const app = express();
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "test",
  password: "Koushik@123",
});

let getUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),

    faker.internet.password(),
  ];
};

/* let data = [];
for (let i = 1; i <= 100; i++) {
  data.push(getUser()); //100 fake users
}

let q = "INSERT INTO user (id, username, email,password) VALUES ?"; */ //if single(?,?,?,?,)
/* let users = [
  ["2", "koushik", "efg@gmail.com", "abc"],
  ["3", "narender", "hij@gmail.com", "abc"],
  ["4", "aditya", "klm@gmail.com", "abc"],
  ["5", "surya", "mno@gmail.com", "abc"],
  ["6", "shiva", "nop@gmail.com", "abc"],
  ["7", "tarun", "pqw@gmail.com", "abc"],
  ["8", "charan", "dfgc@gmail.com", "abc"],
  ["9", "sampath", "eew@gmail.com", "abc"],
  ["10", "manoj", "avv@gmail.com", "abc"],
]; */

/* try {
  connection.query("SHOW TABLES", (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log(result.length);
  });
} catch (err) {
  console.log(err);
} */

/* try {
  connection.query(q, [data], (err, result) => {
    if (err) throw err;
    console.log(result);
    console.log(result.length);
  });
} catch (err) {
  console.log(err);
}
 */

let createRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
};

//console.log(createRandomUser());

app.get("/", (req, res) => {
  let q = "select count(*) from user";

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let count = result[0]["count(*)"]; // or result[0].key
      console.log(`Number of users: ${count}`);
      res.render("home.ejs", { count });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});
//connection.end();

//show route
app.get("/users", (req, res) => {
  //res.send("namaste betey");

  let q = "select * from user";

  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      //res.send(result);
      let users = result;

      res.render("showusers.ejs", { users });
    });
  } catch (err) {
    console.log(err);
    res.send("some error in DB");
  }
});

//Edit route

app.get("/users/:id/edit", (req, res) => {
  let { id } = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      res.render("edit.ejs", { user });
    });
  } catch (err) {
    console.log(err);
    res.send("Error: check the code! ");
  }
});

//Update route
app.patch("/users/:id", (req, res) => {
  // res.send("updated");
  let { id } = req.params;
  let { password: formPass, username: newUsername } = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try {
    connection.query(q, (err, result) => {
      if (err) throw err;
      let user = result[0];
      if (formPass != user.password) {
        res.send("Entered wrong password");
      } else {
        let q2 = `UPDATE user SET username='${newUsername}' WHERE id='${id}'`;
        connection.query(q2, (err, result) => {
          if (err) throw err;
          res.send(result);
        });
      }
      res.send(user);
    });
  } catch (err) {
    console.log(err);
    res.send("Error: check the code! ");
  }
});
app.listen("8000", () => {
  console.log("server is running bro !, localhost:8080");
});
