import express from "express";
import { createTour, getAllTours } from "../controllers/tour.js";

const router = express.Router();

router.post("/", createTour);
router.get("/", getAllTours);

export default router;
