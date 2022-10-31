import express from "express";

import { createTour, deleteTour, getAllTours, getTour, getTourBySearch, getToursByUser, updateTour } from "../controllers/tour.js";

const router = express.Router();

router.post("/", createTour);
router.get("/", getAllTours);
router.get("/:id", getTour);
router.get("/userTours/:id", getToursByUser);
router.delete("/:id", deleteTour);
router.patch("/:id", updateTour);
router.get("/search", getTourBySearch)

export default router;
