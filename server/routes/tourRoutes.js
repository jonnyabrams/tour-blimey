import express from "express";
import { createTour, getAllTours, getTour, getToursByUser } from "../controllers/tour.js";

const router = express.Router();

router.post("/", createTour);
router.get("/", getAllTours);
router.get("/:id", getTour);
router.get("/userTours/:id", getToursByUser);

export default router;
