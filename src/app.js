const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handlebars engine, views and partial locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
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
  if (!req.query.address) {
    return res.send({
      error: "You must provide a location."
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          address: req.query.address,
          forecast: forecastData,
          location
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "Alan McClenaghan",
    message: "Help article not found."
  });
});

app.get("/*", (req, res) => {
  res.render("404", {
    title: "404 error",
    name: "Alan McClenaghan",
    message: "Page not found."
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
