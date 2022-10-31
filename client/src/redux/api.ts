import axios from "axios";
import { ObjectId } from "mongoose";

import {
  IRegister,
  ILogin,
  ICreateTourData,
  IUpdateTourData,
} from "../../typings/typings";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

export const signUp = (formData: IRegister) =>
  API.post("/user/register", formData);
export const signIn = (formData: ILogin) => API.post("/user/login", formData);

export const createTour = (tourData: ICreateTourData) =>
  API.post("/tour", tourData);
export const getAllTours = () => API.get("/tour");
export const getTour = (id: ObjectId) => API.get(`/tour/${id}`);
export const deleteTour = (id: ObjectId) => API.delete(`/tour/${id}`);
export const updateTour = (updatedTourData: IUpdateTourData, id: ObjectId) =>
  API.patch(`/tour/${id}`, updatedTourData);
export const getToursByUser = (id: ObjectId) =>
  API.get(`/tour/userTours/${id}`);
export const getToursBySearch = (searchQuery: string) =>
  API.get(`/tour/search?searchQuery=${searchQuery}`);
  export const getToursByTag = (tag: string) => API.get(`/tour/tag/${tag}`);
  export const getRelatedTours = (tags: string[]) => API.post(`/tour/related`, tags);
