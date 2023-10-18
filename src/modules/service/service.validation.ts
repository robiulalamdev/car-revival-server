import { z } from "zod";

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        price: z.number({
            required_error: 'Price is required',
        }),
        images: z.array(z.string(), {
            required_error: 'Images are required',
        }),
        description: z.string({
            required_error: 'Description is required',
        }),
        duration: z.number({
            required_error: 'Duration is required',
        }),
        features: z.array(z.string(), {
            required_error: 'Features are required',
        }),
        categoryId: z.string({
            required_error: 'Category ID is required',
        }),
        status: z.enum(['show', 'hide']).default('show'),
    }),
});


const update = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }).optional(),
        price: z.number({
            required_error: 'Price is required',
        }).optional(),
        images: z.array(z.string(), {
            required_error: 'Images are required',
        }).optional(),
        description: z.string({
            required_error: 'Description is required',
        }).optional(),
        duration: z.number({
            required_error: 'Duration is required',
        }).optional(),
        features: z.array(z.string(), {
            required_error: 'Features are required',
        }).optional(),
        categoryId: z.string({
            required_error: 'Category ID is required',
        }).optional(),
        status: z.enum(['show', 'hide']).optional(),
    }),
});


export const ServiceValidation = {
    create,
    update
};