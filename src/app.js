const path = require("path");
const express = require("express");

console.log(__dirname);
console.log(path.join(__dirname, "../public/about"));

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  res.send({
    forecast: "Rainy",
    location: ["51.5074", "-0.1278"]
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
