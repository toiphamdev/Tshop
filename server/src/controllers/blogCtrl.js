const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { cloudinaryUploadImg } = require("../utils/cloudinary");

//Create a new blog
const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json({
      status: "success",
      newBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Update blog by id
const updateBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  id;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, req.body);

    res.json({
      status: "success",
      updatedBlog,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//get a blog by id
const getBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const blog = await Blog.findById(id).populate("likes").populate("dislikes");
    await Blog.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );

    res.json(blog);
  } catch (error) {
    throw new Error(error);
  }
});
//get all blogs
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find();

    res.json(blogs);
  } catch (error) {
    throw new Error(error);
  }
});
//delete blog by id
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    res.json(deletedBlog);
  } catch (error) {
    throw new Error(error);
  }
});
const likeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  try {
    //find the blog which you want to like
    const blog = await Blog.findById(blogId);
    //find the login user
    const loginUserId = req?.user?._id;
    //find if the user has like the blog
    const isLiked = blog?.isLiked;
    //find if the user hase dislike th blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const dislikeBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.body;
  validateMongoDbId(blogId);
  try {
    //find the blog which you want to like
    const blog = await Blog.findById(blogId);
    //find the login user
    const loginUserId = req?.user?._id;
    //find if the user has like the blog
    const isDisLiked = blog?.isDisliked;
    //find if the user hase dislike th blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { dislikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
  } catch (error) {
    throw new Error(error);
  }
});
//upload blog image
const uploadBlogImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (let file of files) {
      const { path } = file;
      const newPath = await uploader(path);
      urls.push(newPath);
    }
    const findProduct = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => file),
      },
      { new: true }
    );
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBlog,
  updateBlog,
  getBlog,
  getAllBlogs,
  deleteBlog,
  likeBlog,
  dislikeBlog,
  uploadBlogImages,
};
