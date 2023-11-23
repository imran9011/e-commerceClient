const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    images: { type: [String] },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    properties: {
      type: Object,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.models?.Product || mongoose.model("Product", ProductSchema);
