const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

// User Signup Handler
const handerUserSignUp = async (req, res) => {
  const { fullName, email, password } = req.body;
  //console.log(req.body);
  try {
    // Validate input fields
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // Check for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already in use" });
    }

    // Hashing password before saving to DB
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await User.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });

    res.redirect("/user/login?auth=1");
  } catch (error) {
    console.error(error);
    res.redirect("/user/login?auth=0");
  }
};

// User Login Handler
const handerUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input fields
    if (!email || !password) {
      res.redirect("/user/login?err=1");
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error("Email not found");
    req.user = user;
    console.log(user);
    // Comparing entered password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res.cookie("cookieName", randomNumber, { maxAge: 900000, httpOnly: true });
    res.redirect("/blogs?auth=1");
    return req.user;
    console.log("cookie created successfully");
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { handerUserSignUp, handerUserLogin };
