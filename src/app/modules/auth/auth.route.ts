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

export const AuthRoutes = router;
