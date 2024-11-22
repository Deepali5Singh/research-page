const Blog = require("../models/blog");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});
const upload = multer({ storage: storage });

//function for uploading blogs to server
const handleBlogUploading =
  (upload.single("coverImage"),
  async (req, res) => {
    if (!req.user) {
      return res.status(401).send("User not authenticated");
    }
    console.log(req.body);
    console.log(req.coverImage);
    const { title, body, coverImage } = req.body;
    const blog = await Blog.create({
      body,
      title,
      createdBy: req.user._id,
      coverImageURL: `/uploads/${req.file.filename}`,
    });
    return res.redirect(`/blog/${blog._id}`);
  });

module.exports = { handleBlogUploading };
