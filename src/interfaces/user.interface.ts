import { Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    createdAt: Number;
    tokens:string;
    generateAuthToken: () => string;
}

export interface TokenPayload {
    userId: string;
    username: string;
  }