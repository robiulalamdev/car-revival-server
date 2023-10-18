"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    book: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    reveiwer: {
        type: String,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
