const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    screen: {
      type: String,
    },
    cpu: {
      type: String,
    },
    ram: {
      type: String,
    },
    hardDrive: {
      type: String,
    },
    rom: {
      type: String,
    },
    rearCamera: {
      type: String,
    },
    selfieCamera: {
      type: String,
    },
    batteryCapacity: {
      type: String,
    },
    sim: {
      type: String,
    },
    graphics: {
      type: String,
    },
    operaSystem: {
      type: String,
    },
    weight: {
      type: Number,
    },
    size: {
      type: String,
    },
    debutYear: {
      type: String,
    },
    origin: {
      type: String,
    },
    discount: {
      type: Number,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    color: [],
    tags: String,
    ratings: [
      {
        star: Number,
        comment: String,
        updatedAt: { type: Date },
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
    tags: [],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
