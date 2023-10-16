import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(AuthValidation.signup),
  AuthController.create
);
router.post(
  '/signin',
  validateRequest(AuthValidation.signing),
  AuthController.sginin
);
router.post(
  '/verify-email',
  validateRequest(AuthValidation.emailVerify),
  AuthController.emailVerification
);
router.post(
  '/forget-password',
  AuthController.forgetPassword
);

export const AuthRoutes = router;
