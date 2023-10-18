import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { CategoryController } from './category.controller';
import { CategoryValidation } from './category.validation';
const router = express.Router();

router.post(
    '/',
    validateRequest(CategoryValidation.create),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN
    ),
    CategoryController.createCategory
);


router.get('/all', CategoryController.getAllCategories);

// get cows by pagination 
router.get('/', CategoryController.getCategoriesByDynamic);

router.get('/:id', CategoryController.getSingleCategory);

router.patch(
    '/:id',
    validateRequest(CategoryValidation.update),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN
    ),
    CategoryController.updateCategoryInfo
);


router.delete('/:id',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN
    ),
    CategoryController.deleteCategory);

export const serviceRoutes = router;