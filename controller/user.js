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

    res.status(201).json({
      msg: "Signed up successfully",
      user: { id: result._id, fullName: result.fullName },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Signup failed" });
  }
};

// User Login Handler
const handerUserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) throw new Error("Email not found");

    // Comparing entered password with hashed password in DB
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new Error("Invalid password");
    var randomNumber = Math.random().toString();
    randomNumber = randomNumber.substring(2, randomNumber.length);
    res
      .cookie("cookieName", randomNumber, { maxAge: 900000, httpOnly: true })
      .status(200)
      .json({
        msg: "Login successful",
        user: { id: user._id, fullName: user.fullName },
      });
    console.log("cookie created successfully");
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error.message });
  }
};

module.exports = { handerUserSignUp, handerUserLogin };
