const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log("Connection Successful Brata!");
  })
  .catch(() => {
    console.log("Error: Connection Failed! Brata");
  });

app.get("/", (req, res) => {
  res.send("Working brata");
});

app.get("/testListing", async (req, res) => {
  let sampleListing = new Listing({
    title: "My New Villa",
    description: "By the Beach",
    price: 15000,
    location: "Calangute, Goa",
    country: "India",
  });
  await sampleListing.save();
  console.log("sample was saved!");
  res.send("Successful");
});

app.listen(8000, () => {
  console.log("Server is listening to port 8000");
});
