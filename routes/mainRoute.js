const express = require("express");
const Router = express.Router();

// Home route
Router.get("/", (req, res) => res.render("home"))
  .get("/about", (req, res) => res.render("about"))
  .get("/contact", (req, res) => res.render("contact"));

module.exports = Router;
