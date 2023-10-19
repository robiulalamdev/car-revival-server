"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressValidation = void 0;
const zod_1 = require("zod");
// Create validation
const create = zod_1.z.object({
    body: zod_1.z.object({
        street: zod_1.z.string({
            required_error: 'Street is required',
        }),
        city: zod_1.z.string({
            required_error: 'City is required',
        }),
        state: zod_1.z.string({
            required_error: 'State is required',
        }),
        postalCode: zod_1.z.string({
            required_error: 'Postal Code is required',
        }),
        country: zod_1.z.string({
            required_error: 'Country is required',
        }),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }),
        details: zod_1.z.string({
            required_error: 'Details are required',
        }),
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }),
    }),
});
// Update validation
const update = zod_1.z.object({
    body: zod_1.z.object({
        street: zod_1.z.string({
            required_error: 'Street is required',
        }).optional(),
        city: zod_1.z.string({
            required_error: 'City is required',
        }).optional(),
        state: zod_1.z.string({
            required_error: 'State is required',
        }).optional(),
        postalCode: zod_1.z.string({
            required_error: 'Postal Code is required',
        }).optional(),
        country: zod_1.z.string({
            required_error: 'Country is required',
        }).optional(),
        contactNo: zod_1.z.string({
            required_error: 'Contact Number is required',
        }).optional(),
        details: zod_1.z.string({
            required_error: 'Details are required',
        }).optional(),
        type: zod_1.z.string().optional(),
        userId: zod_1.z.string({
            required_error: 'User ID is required',
        }).optional(),
    }),
});
exports.AddressValidation = {
    create,
    update
};
