import { ObjectId } from "mongoose";

export type UserType = {
  name: string;
  email: string;
  password: string;
  id: ObjectId;
};
