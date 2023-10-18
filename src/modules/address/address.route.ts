import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { CategoryController } from './address.controller';
import { AddressValidation } from './address.validation';
const router = express.Router();

router.post(
    '/',
    validateRequest(AddressValidation.create),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.CUSTOMER,
    ),
    CategoryController.createCategory
);


router.get('/all', CategoryController.getAllCategories);

// get cows by pagination 
router.get('/', CategoryController.getCategoriesByDynamic);

router.get('/:id', CategoryController.getSingleCategory);

router.patch(
    '/:id',
    validateRequest(AddressValidation.update),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.CUSTOMER,
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