import express from "express";

// We are importing our handler function for our route from the general.js in
// our controllers folder.
import { getDashboardStats, getUser } from "../controllers/general.js";

// For creating routes using express
const router = express.Router();

// Defining a wildcard route from our router function with the name /user/:id
// upon a request onto this route our getUser handler function is going to get called
router.get("/user/:id", getUser);
router.get("/dashboard", getDashboardStats);

export default router;
