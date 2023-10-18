/* eslint-disable consistent-type-definitions */
import { z } from 'zod';

const createUserZodValidate = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is Required',
    }),
    email: z.string({
      required_error: 'Email is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
    image: z.string({
      required_error: 'Password is Required',
    }),
  }),
});



const loginAuthValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});



const refreshTokenZodSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh Token is required',
    }),
  }),
});
const email = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
  }),
});


export const AuthValidation = {
  createUserZodValidate,
  loginAuthValidation,
  email,
  refreshTokenZodSchema
};