import express from "express";
import { createTour, getAllTours, getTour } from "../controllers/tour.js";

const router = express.Router();

router.post("/", createTour);
router.get("/", getAllTours);
router.get("/:id", getTour);

export default router;
