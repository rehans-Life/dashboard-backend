import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: String,
    cost: String,
    // The products field is going to be an array of Product ID's
    // which are related to this transaction.
    products: {
      // An array of document Id's
      type: [mongoose.Types.ObjectId],

      // Those Doucent ID's are going to be stored as Number
      // dataTypes
      of: Number,
    },
  },
  // Will automatically add createdAt and UpdatedAt properties fields to each document.
  { timestamps: true }
);
// Creating a Transaction's Collection with the TransactionSchema so basically each document in the Transaction's collection
// should the same structure as the one defined within the TransactionSchema.
const Transaction = mongoose.model("Transaction", TransactionSchema);
export default Transaction;
