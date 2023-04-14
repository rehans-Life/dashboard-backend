import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";
export const getAdmins = async (req, res) => {
  try {
    // Getting the Admins from the User's collection whose role is equal
    // to the admin and also im not going to send the password attribute
    // of the documents to the frontend.
    const admins = await User.find({ role: "admin" }).select("-password");

    // We then return the admins in response to making the API Call
    res.status(200).json(admins);
  } catch (error) {
    // If any error occurs then we return a error 404 and also
    // a json object containing the error message
    res.status(404).json({ message: error.message });
  }
};

export const getUserPerformance = async (req, res) => {
  try {
    // Extracting the id param value from the route to which
    // the call was made.
    const { id } = req.params;

    // So Aggregate method allows you to make calls inside of two
    // collections at that same time.
    const userWithStats = await User.aggregate([
      // You are trying the match document inside of your users collection
      // which has the same id as the id given in the params.
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      // Lookup allows you to look inside of another collection by using
      // attributes inside of the document that you oringinally searched
      // within the collection.
      {
        $lookup: {
          // Im looking inside of the affliateStates collection here
          from: "affiliatestats",
          // Im searching for the document inside of my affiliateStats
          // using the id attribute of the user document that i just
          // searched inside of my user's collection.
          localField: "_id",
          // Im trying to find the document inside of my affiliateStats
          // whose userId field matches id attribute of the user.
          foreignField: "userId",
          // Im storing the document that i just searched from my
          // affiliateStates inside of a affiliateStats attribute
          // in the user document that i searched initially.
          as: "affiliateStats",
        },
      },
      { $unwind: "$affiliateStats" },
    ]);

    // Promise.all makes sures that all the iterative function calls
    // inside of it finish executing and only then it lets the
    // interpreter move on with it.

    // Cause here we making nosql queries inside of the iterative functions
    // so they are going to take time to finish executing.

    // So i only wanna move on when all the iterative function calls have
    // been finished executing.

    // So this is basically going to take all the affiliate purchases
    // of the user and get more information about them.

    const saleTransactions = await Promise.all(
      userWithStats[0].affiliateStats.affiliateSales.map((id) => {
        return Transaction.findById(id);
      })
    );

    // So basically filtering out any possible null values in the array.
    const filteredSaleTransactions = saleTransactions.filter(
      (transaction) => transaction !== null
    );

    res
      .status(200)
      .json({ user: userWithStats[0], sales: filteredSaleTransactions });
  } catch (error) {
    // If any error occurs then we return a error 404 and also
    // a json object containing the error message
    res.status(404).json({ message: error.message });
  }
};
