import { z } from 'zod';
import { AuthRole } from './auth.constant';

const signup = z.object({
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
    role: z.enum([...AuthRole] as [string, ...string[]], {
      required_error: 'Role is Required',
    }),
    contactNo: z.string({
      required_error: 'Contact No is Required',
    }),
    image: z.string({
      required_error: 'Profile Img is Required',
    }),
  }),
});

const signing = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is Required',
    }),
    password: z.string({
      required_error: 'Password is Required',
    }),
  }),
});

const emailVerify = z.object({
  body: z.object({
    email: z.string({
      required_error: 'Email is Required',
    }),
    otp: z.string({
      required_error: 'Otp is Required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    password: z.string().optional(),
    role: z.enum([...AuthRole] as [string, ...string[]]).optional(),
    contactNo: z.string().optional(),
    address: z.string().optional(),
    profileImg: z.string().optional(),
  }),
});

export const AuthValidation = {
  signup,
  emailVerify,
  update,
  signing,
};
