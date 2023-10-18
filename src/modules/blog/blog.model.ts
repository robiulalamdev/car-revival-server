/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { BlogModel, IBlog } from './blog.interface';


const blogSchema = new Schema<IBlog>(
    {
        title: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        description: {
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


export const Blog = model<IBlog, BlogModel>('Blog', blogSchema);
