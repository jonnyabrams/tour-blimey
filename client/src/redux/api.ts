import axios from "axios";

import { IRegister, ILogin, TourType } from "../../typings/typings"

const API = axios.create({ baseURL: "http://localhost:8000/api" });

export const signUp = (formData: IRegister) => API.post("/user/register", formData);
export const signIn = (formData: ILogin) => API.post("/user/login", formData);

export const createTour = (tourData: TourType) => API.post("/tour", tourData)
