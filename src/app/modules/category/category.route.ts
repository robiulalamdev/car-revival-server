import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router.post(
  '/create-category',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.create),
  CategoryController.create
);

router.get('/', CategoryController.getAll);
router.get('/:id', CategoryController.getSingle);

router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.update),
  CategoryController.update
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryController.deleteSingle
);

export const CategoryRoutes = router;
