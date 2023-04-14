import mongoose from "mongoose";

// Defining a Schema for the documents inside of our User's Collection.
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 200,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    transactions: Array,
    occupation: String,
    phoneNumber: String,
    role: {
      type: String,
      // The elements in the array are all the possible values this role field can have.
      enum: ["user", "admin", "superadmin"],
      default: ["admin"],
    },
  },
  // Will automatically add createdAt and UpdatedAt properties fields to each document.
  { timestamps: true }
);
// Creating a User's Collection with the UserSchema so basically each document in the User's collection
// should the same structure as the one defined within the UserSchema.
const User = mongoose.model("User", UserSchema);
export default User;
