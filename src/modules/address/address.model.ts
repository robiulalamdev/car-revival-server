import { AddressModel, IAddress } from './address.interface';
import { Schema, model } from "mongoose";

const addressSchema = new Schema<IAddress>(
    {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        contactNo: { type: String, required: true },
        details: { type: String, required: true },
        userId: { type: String, ref: "User", required: true },
    },
    {
        timestamps: true,
    }
)

export const Address = model<IAddress, AddressModel>('Address', addressSchema)