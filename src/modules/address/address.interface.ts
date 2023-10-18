/* eslint-disable consistent-type-definitions */
import { Model } from 'mongoose';


export type IAddress = {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    contactNo: string;
    details: string;
    type: string;
    userId: string;
}

export type AddressModel = Model<IAddress, Record<string, unknown>>;