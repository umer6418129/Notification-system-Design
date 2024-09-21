import { Document } from "mongoose";

export interface IUser extends Document {
    username?: string;
    email?: string;
    password?: string;
    otp?: number;
    isVerified?: boolean;
    IsActive?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }