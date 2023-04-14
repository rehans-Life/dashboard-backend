import express from "express";
import { getSales } from "../controllers/sales.js";

// For creating routes using express
const router = express.Router();

// Why /sales and not /overallStats cause we are going to have
// four different pages using the same route so to make it general
// we keep it /sales.
router.get("/sales", getSales);

export default router;
