"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewValidation = void 0;
const zod_1 = require("zod");
const createReviewZodValidate = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({
            required_error: 'Book id is required',
        }),
        comment: zod_1.z.string({
            required_error: 'Comment is required',
        }),
        reveiwer: zod_1.z.string({
            required_error: 'Reveiwer is required',
        })
    }),
});
exports.ReviewValidation = {
    createReviewZodValidate,
};
