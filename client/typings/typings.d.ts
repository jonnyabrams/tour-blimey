import { ObjectId } from "mongoose";

export type UserType = {
  name?: string;
  email: string;
  password: string;
  id?: ObjectId;
};

export type TourType = {
  title: string;
  description: string;
  name?: string;
  creator?: string;
  tags: string[];
  imageFile: string;
  likeCount?: {
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

export interface ICreateTourData {
  title: string;
  description: string;
  tags: string[];
  imageFile: string;
  name?: string;
  creator?: string;
  likeCount?: {
    type: number;
    default: number;
  };
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
