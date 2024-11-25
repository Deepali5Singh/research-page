const express = require("express");
const Router = express.Router();
const handerAIchat = require("../controller/ai");

Router.post("/", handerAIchat);
Router.get("/", (req, res) => res.render("susai"));

module.exports = Router;
