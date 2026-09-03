const mongoose = require("mongoose");
//let url = "https://localhost:8000/users";

//mongoose.connect("mongodb://127.0.0.1:27017/test");

main()
  .then((res) => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

/* const user1 = new User({
  name: "Gudapur Koushik",
  email: "gudapurkoushik52@gmail.com",
  age: 21,
});
const user2 = new User({
  name: "Butharaju Aditya",
  email: "butharajuAditya58@gmail.com",
  age: 20,
});
user2.save(); */

/* User.insertMany([
  { name: "Tupakula Narender", email: "abc123@gmail.com", age: 21 },
  { name: "Vattikoti Venu", email: "xy4523@gmail.com", age: 22 },
  { name: "Sattu Ram", email: "dfgdfg32@gmail.com", age: 41 },
  { name: "Pendem Sampath", email: "abhte223@gmail.com", age: 53 },
  { name: "kota Abhishek", email: "xyz343@gmail.com", age: 28 },
]).then((data) => {
  console.log(data);
});
 */
/* User.find({ age: { $gte: 25 } }).then((data) => {
  //findOne
  console.log(data[0].name);
});
 */
/* User.updateOne({ name: "Gudapur Koushik" }, { age: 22 }).then((res) => {
  console.log(res);
}); */

User.deleteOne({ name: "Gudapur Koushik" }).then((res) => {
  console.log(res);
});
//User.deleteMany
