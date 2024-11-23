const express = require("express");
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const userRoute = require("./routes/user");
const aiRoute = require("./routes/ai");
const blogRoute = require("./routes/blog");
const connectDB = require("./connect");
const port = process.env.port || 4000;

connectDB(process.env.MONGO_URL);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use("/chatwithai", aiRoute);
app.use("/blogs", blogRoute);
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("index");
  console.log(req);
});
app.get("/login", (req, res) => res.render("profile"));

//app.get("/blogs", (req, res) => res.render("home"));
//app.get("/chatwithai", (req, res) => res.render("myai"));

app.listen(port, () => console.log(`App is listening on port ${port}!`));
module.exports = app;
