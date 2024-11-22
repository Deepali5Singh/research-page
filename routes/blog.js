const { Router } = require("express");
const router = Router();
const { handleBlogUploading } = require("../models/blog");

router.post("/add-new", handleBlogUploading);
router.get("/addBlogs", (req, res) => {
  res.render("addBlogs");
});

router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.render("blog", {
    user: req.user,
    blog,
  });
});

module.exports = handleBlogUploading;
