const path = require("path");
const express = require("express");

console.log(__dirname);
console.log(path.join(__dirname, "../public/about"));

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.set("view engine", "hbs");
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Alan McClenaghan"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Alan McClenaghan"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Alan McClenaghan",
    body: "I get by with a little help from my friends."
  });
});

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Rainy",
    location: ["51.5074", "-0.1278"]
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
