const express = require("express");
const Router = express.Router();
const { handerUserLogin, handerUserSignUp } = require("../controller/user");

Router.post("/signup", handerUserSignUp);
Router.post("/login", handerUserLogin);
Router.get("/login", (req, res) =>
  res.render("profile", {
    auth: req.query.auth, // pass the auth parameter to the view
  })
);

module.exports = Router;
