import Tour from "../models/Tour.js";
import mongoose from "mongoose";

export const createTour = async (req, res) => {
  const tour = req.body;
  const newTour = new Tour(tour);

  try {
    await newTour.save();
    res.status(201).json(newTour);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.status(200).json(tours);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getTour = async (req, res) => {
  const { id } = req.params;
  try {
    const tour = await Tour.findById(id);
    res.status(200).json(tour);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getToursByUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "User not found" });
  }

  const userTours = await Tour.find({ creator: id });
  res.status(200).json(userTours);
};

export const deleteTour = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `Tour not found with id ${id}` });
    }

    await Tour.findByIdAndRemove(id);
    res.json({ message: "Tour successfully deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const updateTour = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: `Tour not found with id ${id}` });
    }

    const updatedTour = {
      creator,
      title,
      description,
      tags,
      imageFile,
      _id: id,
    };
    await Tour.findByIdAndUpdate(id, updatedTour, { new: true });
    res.json(updatedTour);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};

export const getTourBySearch = async (req, res) => {
  const { searchQuery } = req.query;
  try {
    const title = new RegExp(searchQuery, "i");
    const tours = await Tour.find({ title });
    res.json(tours);
  } catch (error) {
    res.status(404).json({ message: error.message });
    console.log(error);
  }
};
