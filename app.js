const express = require("express");
const app = express();
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();
const userRoute = require("./routes/user");
const mainRoute = require("./routes/mainRoute"); // Link the new main route
const cookieParser = require("cookie-parser");
const aiRoute = require("./routes/ai");
const blogRoute = require("./routes/blog");
const connectDB = require("./connect");
const port = process.env.port || 4000;

connectDB(process.env.MONGO_URL);
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.use("/", mainRoute);
app.use("/chatwithai", aiRoute);
app.use("/blogs", blogRoute);

app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/login", (req, res) => res.render("profile"));

app.listen(port, () => console.log(`App is listening on port ${port}!`));
module.exports = app;
