import express from "express";

// Importing the getProducts handler function which is going to
// run when a request is made to /client/products route.

// Importing the getCustomers handler function which is going to
// run when a request is made to /client/customers route.

import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
} from "../controllers/client.js";

// For creating routes using express
const router = express.Router();

router.get("/products", getProducts);

router.get("/customers", getCustomers);

router.get("/transactions", getTransactions);

router.get("/geography", getGeography);

export default router;
