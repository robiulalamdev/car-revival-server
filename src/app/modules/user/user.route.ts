import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from '../auth/auth.validation';
import { UserController } from './user.controller';
const router = express.Router();

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAll);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingle);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(AuthValidation.update),
  UserController.update
);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteSingle);

export const UserRoutes = router;
