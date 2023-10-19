"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Faq = void 0;
/* eslint-disable @typescript-eslint/no-this-alias */
const mongoose_1 = require("mongoose");
const faqSchema = new mongoose_1.Schema({
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
}, {
    timestamps: true,
});
exports.Faq = (0, mongoose_1.model)('Faq', faqSchema);
