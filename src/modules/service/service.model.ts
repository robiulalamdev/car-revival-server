/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './service.interface';


const serviceSchema = new Schema<IService>(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        images: {
            type: [String],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        features: {
            type: [String],
            required: true,
        },
        categoryId: {
            type: String,
            ref: "Category",
            required: true,
        },
        status: {
            type: String,
            enum: ["show", "hide"],
            default: "show",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);


export const Service = model<IService, ServiceModel>('Service', serviceSchema);
