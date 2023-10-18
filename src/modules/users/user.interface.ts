/* eslint-disable consistent-type-definitions */
import { Model } from 'mongoose';


export type IUser = {
  name: string;
  email: string;
  password: string;
  role: string;
  verified?: boolean;
  image: string;
  otp?: string;
  dateOfBirth?: Date;
  gender?: string;
  about?: string;
  profession?: string;
}

export type UserModel = Model<IUser, Record<string, unknown>>;
