const { faker } = require("@faker-js/faker");

const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "delta_app",
  password: "1234",
});

try {
  connection.query("show tables", (err, result) => {
    if(err) throw err;
    console.log(result);// result is an array (we can also perform array functionst)
    console.log(`NO OF TABLES: ${result.length}`);// result is an array (we can also perform array functionst)
  });
} catch (err) {
  console.log(err);
}

connection.end();
let RandomUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    //avatar: faker.image.avatar(),
    password: faker.internet.password(),
    //birthdate: faker.date.birthdate(),
    //registeredAt: faker.date.past(),
  };
};

//console.log(RandomUser());
