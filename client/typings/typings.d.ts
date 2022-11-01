import { ObjectId } from "mongoose";
import { Subscription } from "react-redux";

export type UserType = {
  name?: string;
  email: string;
  password: string;
  _id?: ObjectId;
};

export type TourType = {
  title: string;
  description: string;
  name?: string;
  creator?: ObjectId;
  tags: string[];
  imageFile: string;
  likes?: ObjectId[];
  _id: ObjectId;
  createdAt: Date;
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

export interface ICreateTourData {
  title: string;
  description: string;
  tags: string[];
  imageFile: string;
  name?: string;
  creator?: ObjectId;
  likes?: ObjectId[];
  _id?: ObjectId;
}

export interface IUpdateTourData {
  creator?: ObjectId;
  title?: string;
  description?: string;
  tags?: string[];
  imageFile?: string;
  _id?: ObjectId;
}

export interface IUser {
  user: UserType;
  token: string;
}

export interface IUserState {
  user: IUser | null;
  error: string;
  loading: boolean;
}

export interface IToursState {
  tour: TourType | null;
  tours: Subscription<TourType[]>;
  userTours: Subscription<TourType[]>;
  tagTours: Subscription<TourType[]>;
  relatedTours: Subscription<TourType[]>;
  currentPage: number;
  numberOfPages: null;
  error: string;
  loading: boolean;
}
