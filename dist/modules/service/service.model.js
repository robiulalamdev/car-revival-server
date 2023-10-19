"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const serviceSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Service = (0, mongoose_1.model)('Service', serviceSchema);
