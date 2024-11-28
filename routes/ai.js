const express = require("express");
const Router = express.Router();
const cookieParser = require("cookie-parser");
const handerAIchat = require("../controller/ai");
const app = express();
app.use(cookieParser());
Router.post("/", handerAIchat);
Router.get("/", (req, res) => {
  console.log(req.cookies);
  res.render("susai", {
    cookies: req.query.auth,
  });
});

module.exports = Router;
