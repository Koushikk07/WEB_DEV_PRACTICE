const mongoose = require("mongoose");
//let url = "https://localhost:8000/users";

//mongoose.connect("mongodb://127.0.0.1:27017/test");

main()
  .then((res) => {
    console.log("Connection Successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
});

const Book = mongoose.model("book", bookSchema);

let book1 = new Book({
  title: "Atomic Habits",
  author: "James",
  price: 120,
});

book1.save();
