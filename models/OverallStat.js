import mongoose from "mongoose";

const OverallStatSchema = new mongoose.Schema(
  {
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    // monthlyData field is going to be an Array storing each
    // months stats where each month would be an object
    // in which we will have a reference ot the month, the sales
    // we had at that month and the total units we sold.
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    // Going to store data here by each day so each object in this
    // array would represent a day in the particular year which this
    // document represents and we will store the sales in mony and
    // number of units we sold on that day.
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    // A hashmap for salesBy Category where the value to each key is
    // going to be the category itself and value would be a number
    // indicating how many units were sold in relation to that category.
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  // Will automatically add createdAt and UpdatedAt properties fields to each document.
  { timestamps: true }
);
// Creating a OverallStat's Collection with the OverallStatSchema so basically each document in the OverallStat's collection
// should the same structure as the one defined within the OverallStatSchema.
const OverallStat = mongoose.model("OverallStat", OverallStatSchema);
export default OverallStat;
