const PCategory = require("../models/prodCategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { default: slugify } = require("slugify");
const convertSlug = require("../utils/convertSlug");

const createCategory = asyncHandler(async (req, res) => {
  const { title } = req.body;
  try {
    const newCat = await PCategory.create({
      ...req.body,
      slug: slugify(convertSlug(title)),
    });
    res.json(newCat);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  validateMongoDbId(id);
  try {
    const updatedCat = await PCategory.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(convertSlug(title)) },
      {
        new: true,
      }
    );
    res.json(updatedCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const cat = await PCategory.findById(id);
    res.json(cat);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCat = await PCategory.findByIdAndDelete(id);
    res.json(deleteCat);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const cat = await PCategory.find();
    let result = {};
    for (let item of cat) {
      result[item._id] = item;
    }
    res.json({ category: result });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
};