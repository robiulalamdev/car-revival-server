/* eslint-disable consistent-type-definitions */
import { Model } from 'mongoose';


export type ICategory = {
    name: string;
    image: string;
    details: string;
    status: string;
}

export type CategoryModel = Model<ICategory, Record<string, unknown>>;



export type ICategoryFilters = {
    searchTerm?: string;
};