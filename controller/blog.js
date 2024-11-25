const Blog = require("../models/blog");
const path = require("path");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const multer = require("multer");

// Multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads/")); // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

// Multer middleware
const upload = multer({ storage: storage });

// Function to handle blog uploading
const handleBlogUploading = async (req, res) => {
  //   if (!req.user) {
  //     return res.status(401).send("User not authenticated");
  //   }

  console.log(req.body);
  console.log(req.file); // Multer attaches the uploaded file here

  const { title, body } = req.body;

  try {
    const blog = await Blog.create({
      title,
      body,
      createdBy: new ObjectId("64a67d2f8c9b3a0012345678"),
      //coverImageURL: `/uploads/${req.file.filename}`, // Multer file info
    });

    // Redirect to the new blog page
    return res.redirect(`/blogs/${blog._id}`);
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = { upload, handleBlogUploading };
