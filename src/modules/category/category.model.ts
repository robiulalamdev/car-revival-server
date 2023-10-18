/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { CategoryModel, ICategory } from './category.interface';


const categorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        details: {
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


export const Category = model<ICategory, CategoryModel>('Category', categorySchema);
