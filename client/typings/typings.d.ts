import { ObjectId } from "mongoose";

export type UserType = {
  name: string;
  email: string;
  password: string;
  id: ObjectId;
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
