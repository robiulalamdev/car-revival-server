"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Address = void 0;
const mongoose_1 = require("mongoose");
const addressSchema = new mongoose_1.Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    contactNo: { type: String, required: true },
    details: { type: String, required: true },
    userId: { type: String, ref: "User", required: true },
}, {
    timestamps: true,
});
exports.Address = (0, mongoose_1.model)('Address', addressSchema);
