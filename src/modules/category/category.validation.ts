import { z } from "zod";

const create = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }),
        image: z.string({
            required_error: 'Image is required',
        }),
        details: z.string({
            required_error: 'Details are required',
        }),
        status: z.enum(['show', 'hide']).default('show'),
    }),
});

const update = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Name is required',
        }).optional(),
        image: z.string({
            required_error: 'Image is required',
        }).optional(),
        details: z.string({
            required_error: 'Details are required',
        }).optional(),
        status: z.enum(['show', 'hide']).optional(),
    }),
});


export const CategoryValidation = {
    create,
    update
};