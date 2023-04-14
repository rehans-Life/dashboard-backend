import mongoose from "mongoose";

const ProductStatSchema = new mongoose.Schema(
  {
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    // An array of objects where each object represents the monthly data related
    // of that object
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    // Going to store the daily data of the object
    dailyData: [
      {
        data: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
  },
  // Will automatically add createdAt and UpdatedAt properties fields to each document.
  { timestamps: true }
);

// Creating a ProductStat's Collection with the ProductStatSchema so basically each document in the ProductStat's collection
// should the same structure as the one defined within the ProductStatSchema.
const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;
