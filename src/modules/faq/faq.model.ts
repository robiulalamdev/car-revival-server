/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { IService, ServiceModel } from './faq.interface';


const serviceSchema = new Schema<IService>(
    {
        question: {
            type: String,
            required: true,
        },
        answer: {
            type: String,
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
