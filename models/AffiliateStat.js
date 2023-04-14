import mongoose from "mongoose";

// Each document in this collection refers to a user and how
// affiliate purchases they have made. So each document in this
// collection is going to have a reference to a user and its
// going to store the ids of transactions that they made
// due to affiliate programmes.
const AffiliateStatSchema = new mongoose.Schema(
  {
    // This field is going to store a document id that references
    // to one of the documents in the Users Collection.

    // Each doucment here represents a user that has made
    // purchases due to affiliate strategy

    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      // This is going to be an array which stores the document
      // ids referencing to the transactions collection

      // And its going to be an array of transaction documents
      // ids denoted by the square brackets.
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  // Will automatically add createdAt and UpdatedAt properties fields to each document.
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;
