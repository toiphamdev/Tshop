const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const fs = require("fs");
const validateMongoDbId = require("../utils/validateMongodbId");
const paginate = require("express-paginate");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const {
  cloudinaryDeleteImg,
  cloudinaryUploadImg,
} = require("../utils/cloudinary");
const { deleteImages } = require("./uploadCtrl");
//create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//update product
const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//delete product
const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deleteProduct = await Product.findById(id);
    if (deleteProduct.images.length > 0) {
      for (let image of deleteProduct.images) {
        deleteImages(image.public_id);
      }
    }
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//get product by id
const getaProduct = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  try {
    const findProduct = await Product.findOne({ slug: slug });
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});
//get all product
const getAllProduct = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const tagsToSearch = q ? q.split(" ") : [];
  try {
    // Filtering
    const queryObj = { ...req.query };
    // console.log(queryObj.price)
    const excludeFields = ["page", "sort", "limit", "fields", "q"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/(gte|gt|lte|lt)/gi, (match) => `$${match}`);
    let query = q
      ? Product.find({
          ...JSON.parse(queryStr),
          tags: { $in: tagsToSearch },
        })
      : Product.find({ ...JSON.parse(queryStr) });

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    // res.json({ condition });
    query.exec(async (err, products) => {
      if (err) {
        // Xử lý lỗi
        throw new Error(err);
      } else {
        const findCountQuery = q
          ? {
              ...JSON.parse(queryStr),
              tags: { $in: tagsToSearch },
            }
          : { ...JSON.parse(queryStr) };
        const itemCount = await Product.countDocuments(findCountQuery);
        const pageCount = Math.ceil(itemCount / req.query.limit);

        res.json({
          products,
          pageCount,
          itemCount,
          activePage: req.query.page,
        });
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
//add product to user wishlist
const addToWhistList = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find(
      (id) => id.toString() === prodId.toString()
    );
    if (alreadyAdded) {
      const prodAdded = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(prodAdded);
    } else {
      const prodAdded = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        { new: true }
      );
      res.json(prodAdded);
    }
  } catch (error) {
    throw new Error(error);
  }
});
//rating product
const ratingProduct = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: {
            "ratings.$.star": star,
            "ratings.$.comment": comment,
            "ratings.$.updatedAt": Date.now(),
          },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              updatedAt: Date.now(),
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});

const uploadProductImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
      const { path } = files[i];
      const newPath = await uploader(path);
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const images = urls.map((file) => {
      return file;
    });

    const product = await Product.findById(id);
    if (product.images.length > 0) {
      for (let image of product.images) {
        await cloudinaryDeleteImg(image.public_id);
      }
    }
    product.images = [...images];
    product.save();
    res.json(images);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteProductImage = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = cloudinaryDeleteImg(id, "images");
    res.json({ errMessage: "Deleted" });
  } catch (error) {
    throw new Error(error);
  }
});

const getRatingComment = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const page = +req.query.page;
    const limit = +req.query.limit;
    if ((!page, !limit)) throw new Error("Missing required parameter...");
    const skip = (page - 1) * limit;
    Product.aggregate([
      // Lấy tài liệu có _id bằng ObjectId("6140d4a4a4eb1db98f962e47")
      { $match: { _id: ObjectId(id) } },
      // Tách mảng 'ratings' thành các tài liệu riêng biệt
      { $unwind: "$ratings" },
      // Lookup để populate thông tin người dùng và chỉ lấy các trường cần thiết
      {
        $lookup: {
          from: "users",
          localField: "ratings.postedby",
          foreignField: "_id",
          as: "user",
          pipeline: [
            { $project: { _id: 1, firstname: 1, lastname: 1, email: 1 } },
          ],
        },
      },
      // Chọn trường 'ratings' và trường 'user' sau khi được populate
      {
        $project: {
          _id: 0,
          comment: "$ratings.comment",
          star: "$ratings.star",
          updatedAt: "$ratings.updatedAt",
          user: { $arrayElemAt: ["$user", 0] },
        },
      },
      // Đếm số lượng phần tử trong mảng 'ratings'
      {
        $group: {
          _id: null,
          count: { $sum: 1 },
          ratings: { $push: "$$ROOT" },
        },
      },
      // Chọn các trường cần thiết và tính toán pageCount
      {
        $project: {
          _id: 0,
          count: 1,
          ratings: {
            $slice: ["$ratings", skip, limit],
          },
          pageCount: { $ceil: { $divide: ["$count", limit] } },
        },
      },
    ]).exec((err, ratings) => {
      if (err) {
        // Xử lý lỗi
        throw new Error(err);
      } else {
        res.json(ratings[0]);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWhistList,
  ratingProduct,
  deleteProductImage,
  uploadProductImages,
  getRatingComment,
};
