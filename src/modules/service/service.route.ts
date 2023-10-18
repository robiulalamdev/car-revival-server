import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { ServiceController } from './service.controller';
import { ServiceValidation } from './service.validation';
const router = express.Router();

router.post(
    '/',
    validateRequest(ServiceValidation.create),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN
    ),
    ServiceController.createService
);


router.get('/all', ServiceController.getAllServices);

// get cows by pagination 
router.get('/', ServiceController.getServicesByDynamic);

router.get('/:id', ServiceController.getSingleService);

router.patch(
    '/:id',
    validateRequest(ServiceValidation.update),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN
    ),
    ServiceController.updateServiceInfo
);


router.delete('/:id',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN
    ),
    ServiceController.deleteService);

export const serviceRoutes = router;