/* eslint-disable consistent-type-definitions */
import { Model } from 'mongoose';


export type IBlog = {
    title: string;
    description: string;
    image: string;
    status: string;
}

export type BlogModel = Model<IBlog, Record<string, unknown>>;