"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }),
        details: zod_1.z.string({
            required_error: 'Details are required',
        }),
        status: zod_1.z.enum(['show', 'hide']).default('show'),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }).optional(),
        image: zod_1.z.string({
            required_error: 'Image is required',
        }).optional(),
        details: zod_1.z.string({
            required_error: 'Details are required',
        }).optional(),
        status: zod_1.z.enum(['show', 'hide']).optional(),
    }),
});
exports.CategoryValidation = {
    create,
    update
};
