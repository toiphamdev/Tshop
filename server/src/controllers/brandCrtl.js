const Brand = require("../models/brandModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const { default: slugify } = require("slugify");
const convertSlug = require("../utils/convertSlug");

const createBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const slug = title.toLowerCase();
  try {
    const newBrand = await Brand.create({
      ...req.body,
      slug: slugify(convertSlug(slug)),
    });
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const slug = title.toLowerCase();
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(
      id,
      { ...req.body, slug: slugify(convertSlug(slug)) },
      {
        new: true,
      }
    );
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

const getBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const brand = await Brand.findById(id);
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});
const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteBrand = await Brand.findByIdAndDelete(id);
    res.json(deleteBrand);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllBrand = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.find();
    res.json(brand);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBrand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
};
