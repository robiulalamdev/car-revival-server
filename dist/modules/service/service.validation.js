"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        images: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Images are required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        duration: zod_1.z.number({
            required_error: 'Duration is required',
        }),
        features: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Features are required',
        }),
        categoryId: zod_1.z.string({
            required_error: 'Category ID is required',
        }),
        status: zod_1.z.enum(['show', 'hide']).default('show'),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }).optional(),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }).optional(),
        images: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Images are required',
        }).optional(),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }).optional(),
        duration: zod_1.z.number({
            required_error: 'Duration is required',
        }).optional(),
        features: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Features are required',
        }).optional(),
        categoryId: zod_1.z.string({
            required_error: 'Category ID is required',
        }).optional(),
        status: zod_1.z.enum(['show', 'hide']).optional(),
    }),
});
exports.ServiceValidation = {
    create,
    update
};
