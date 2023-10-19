/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { FaqModel, IFaq } from './faq.interface';


const faqSchema = new Schema<IFaq>(
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


export const Faq = model<IFaq, FaqModel>('Faq', faqSchema);
