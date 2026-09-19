const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const { data } = require("./data.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
}

main()
  .then(async () => {
    await Listing.deleteMany({});
    console.log("Old listings deleted");

    await Listing.insertMany(data);
    console.log("Sample listings inserted");

    await mongoose.connection.close();
  })
  .catch((err) => {
    console.log(err);
  });
