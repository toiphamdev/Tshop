const express = require("express");
const {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadBlogImages,
} = require("../controllers/blogCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { blogImgResize, uploadPhoto } = require("../middlewares/uploadImage");

const router = express.Router();
router.post("/create-blog", authMiddleware, isAdmin, createBlog);

router.put("/update-blog/:id", authMiddleware, isAdmin, updateBlog);
router.put("/like", authMiddleware, likeBlog);
router.put("/dislike", authMiddleware, dislikeBlog);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 2),
  blogImgResize,
  uploadBlogImages
);

router.get("/get-a-blog/:id", getBlog);
router.get("/get-all-blogs", getAllBlogs);

router.delete("/delete-blog/:id", authMiddleware, isAdmin, deleteBlog);

module.exports = router;
