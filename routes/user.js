const express = require("express");
const Router = express.Router();
const { handerUserLogin, handerUserSignUp } = require("../controller/user");

Router.post("/signup", handerUserSignUp);
Router.post("/login", handerUserLogin);

module.exports = Router;
