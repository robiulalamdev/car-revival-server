/* eslint-disable consistent-type-definitions */
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../users/user.zodHanadler';
import { authController } from './auth.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.createUserZodValidate),
  authController.create
);

router.post('/forgot-password', validateRequest(AuthValidation.email), authController.forgetPassword);
router.post('/email-verify', validateRequest(AuthValidation.email), authController.emailVerification);
router.post('/login', validateRequest(AuthValidation.loginAuthValidation), authController.loginUser);
router.get('/info', auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.SUPER_ADMIN, ENUM_USER_ROLE.CUSTOMER), authController.getAuthInfo);

router.post(
  '/refresh-token',
  authController.refreshToken
);

export const authRoutes = router;
