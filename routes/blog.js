const Router = require("express");
const router = Router();
const multer = require("multer");
const Blog = require("../models/blog");
const { upload, handleBlogUploading } = require("../controller/blog");

router.post("/add-new", upload.single("coverImage"), handleBlogUploading);
router.get("/addBlogs", (req, res) => {
  res.render("editor", {});
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.render("blog", {
    user: req.user,
    blog,
  });
});

module.exports = router;
