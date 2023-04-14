import express from "express";
import { getAdmins, getUserPerformance } from "../controllers/management.js";

// For creating routes using express
const router = express.Router();

router.get("/admins", getAdmins);

// Making a call to this route requires a param which is the
// id of the user whose performance needs to be shown on the
// frontend

router.get("/performance/:id", getUserPerformance);

export default router;
