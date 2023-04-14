import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    description: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  // Will automatically add createdAt and UpdatedAt properties fields to each document.
  { timestamps: true }
);
// Creating a Product's Collection with the ProductSchema so basically each document in the Product's collection
// should the same structure as the one defined within the ProductSchema.
const Product = mongoose.model("Product", ProductSchema);
export default Product;
