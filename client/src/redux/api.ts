import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000/api" });

export const signIn = (formData: any) => API.post("/user/login", formData);
