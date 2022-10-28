import { ObjectId } from "mongoose";

export type UserType = {
  name: string;
  email: string;
  password: string;
  id: ObjectId;
};

export type TourType = {
  title: string;
  description: string;
  name: string;
  creator: string;
  tags: string[];
  imageFile: string;
  likeCount: {
    type: number;
    default: number;
  };
};

export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
