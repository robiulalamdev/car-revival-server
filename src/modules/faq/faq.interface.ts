/* eslint-disable consistent-type-definitions */
import { Model } from 'mongoose';


export type IFaq = {
    question: string;
    answer: string;
    status: string;
}

export type FaqModel = Model<IFaq, Record<string, unknown>>;