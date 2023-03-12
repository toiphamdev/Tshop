const BCategory = require("../models/blogCatModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCat = await BCategory.create(req.body);
    res.json(newCat);
  } catch (error) {
    throw new Error(error);
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCat = await BCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCat);
  } catch (error) {
    throw new Error(error);
  }
});

const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const cat = await BCategory.findById(id);
    res.json(cat);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCat = await BCategory.findByIdAndDelete(id);
    res.json(deleteCat);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllCategory = asyncHandler(async (req, res) => {
  try {
    const cat = await BCategory.find();
    res.json(cat);
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
