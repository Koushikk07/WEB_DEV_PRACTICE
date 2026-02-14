const { faker } = require("@faker-js/faker");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "1234",
});

let q = "INSERT INTO user (id, username, email, password) VALUES ?"; // in one que(?,?,?,?);
//let user = ["123","123_newuser","abc@gmail.com","abc"];
//for multiple basic insertion // users = [[],[],[],[]...];
let RandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
  };

let data = [];
for(let i=0;i<100;i++){
  data.push(RandomUser());

}
try {
  connection.query(q,[data], (err, result) => {    // q,[users]
    if (err) throw err;
    console.log(result); // result is an array (we can also perform array functionst)
    console.log(`NO OF TABLES: ${result.length}`); // result is an array (we can also perform array functionst)
  });
} catch (err) {
  console.log(err);
}




connection.end();

  /* id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    //avatar: faker.image.avatar(),
    password: faker.internet.password(),
    //birthdate: faker.date.birthdate(),
    //registeredAt: faker.date.past(), */


//console.log(RandomUser());
