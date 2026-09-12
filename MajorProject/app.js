const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ejs = require("ejs");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const path = require("path");
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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Working brata");
});

app.get("/listing", async (req, res) => {
  /* await Listing.find({}).then((res) => {
    console.log(res);
  }); */

  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});
//Show rooute

app.get("/", async (req, res) => {
  let { id } = req.params;
  const listing = Listing.findById(id);
});
/* app.get("/testListing", async (req, res) => {
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
 */
app.listen(8000, () => {
  console.log("Server is listening to port 8000");
});
