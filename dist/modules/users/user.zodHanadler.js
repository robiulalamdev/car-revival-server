"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
/* eslint-disable consistent-type-definitions */
const zod_1 = require("zod");
const createUserZodValidate = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is Required',
        }),
        email: zod_1.z.string({
            required_error: 'Email is Required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
        image: zod_1.z.string({
            required_error: 'Password is Required',
        }),
    }),
});
const loginAuthValidation = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is Required',
        }),
        password: zod_1.z.string({
            required_error: 'Password is Required',
        }),
    }),
});
const refreshTokenZodSchema = zod_1.z.object({
    cookies: zod_1.z.object({
        refreshToken: zod_1.z.string({
            required_error: 'Refresh Token is required',
        }),
    }),
});
const email = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z.string({
            required_error: 'Email is required',
        }),
    }),
});
exports.AuthValidation = {
    createUserZodValidate,
    loginAuthValidation,
    email,
    refreshTokenZodSchema
};
