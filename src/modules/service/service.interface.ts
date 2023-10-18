/* eslint-disable consistent-type-definitions */
import { Model } from 'mongoose';


export type IService = {
    name: string;
    price: number;
    images: string[];
    features: string[];
    duration: number;
    description: string;
    categoryId: string;
    status: string;
}

export type ServiceModel = Model<IService, Record<string, unknown>>;


export type IServiceFilters = {
    searchTerm?: string;
};