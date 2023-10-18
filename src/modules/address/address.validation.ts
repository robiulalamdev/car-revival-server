import { z } from "zod";

// Create validation
const create = z.object({
    body: z.object({
        street: z.string({
            required_error: 'Street is required',
        }),
        city: z.string({
            required_error: 'City is required',
        }),
        state: z.string({
            required_error: 'State is required',
        }),
        postalCode: z.string({
            required_error: 'Postal Code is required',
        }),
        country: z.string({
            required_error: 'Country is required',
        }),
        contactNo: z.string({
            required_error: 'Contact Number is required',
        }),
        details: z.string({
            required_error: 'Details are required',
        }),
        type: z.string().default('primary'),
        userId: z.string({
            required_error: 'User ID is required',
        }),
    }),
});

// Update validation
const update = z.object({
    body: z.object({
        street: z.string({
            required_error: 'Street is required',
        }).optional(),
        city: z.string({
            required_error: 'City is required',
        }).optional(),
        state: z.string({
            required_error: 'State is required',
        }).optional(),
        postalCode: z.string({
            required_error: 'Postal Code is required',
        }).optional(),
        country: z.string({
            required_error: 'Country is required',
        }).optional(),
        contactNo: z.string({
            required_error: 'Contact Number is required',
        }).optional(),
        details: z.string({
            required_error: 'Details are required',
        }).optional(),
        type: z.string().optional(),
        userId: z.string({
            required_error: 'User ID is required',
        }).optional(),
    }),
});


export const AddressValidation = {
    create,
    update
};