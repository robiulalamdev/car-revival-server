"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const categorySchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Category = (0, mongoose_1.model)('Category', categorySchema);
