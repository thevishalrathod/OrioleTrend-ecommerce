import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    description: String,
    category: String,
    brand: String,
    price: Number,
    salePrice: Number,
    totalStock: Number,
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductsSchema);
