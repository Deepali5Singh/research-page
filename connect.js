const mongoose = require("mongoose");

function connectDB(URL) {
  mongoose
    .connect(URL)
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));
}

module.exports = connectDB;
