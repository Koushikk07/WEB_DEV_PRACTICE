const express = require("express");
const app = express();
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("Working brata");
});

app.get("/listings", async (req, res) => {
  /* await Listing.find({}).then((res) => {
    console.log(res);
  }); */

  const allListings = await Listing.find();
  res.render("listings/index.ejs", { allListings });
});

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});
//Show rooute

app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
});
//Create Route
app.post("/listings", async (req, res) => {
  //let { title, description, image, price, country, location } = req.body;
  /* let listing = req.body.listing;
  console.log(listing); */
  const listing = new Listing(req.body.listing);
  await listing.save();
  //console.log(listing);
  res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});
//update route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect("/listings");
});
//Delete route

app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
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
