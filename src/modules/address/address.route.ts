import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';
import { AddressController } from './address.controller';
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
    AddressController.createAddress
);


router.get('/all', AddressController.getAllAddresses);

// get cows by pagination 
router.get('/', AddressController.getAddressByDynamic);

router.get('/:id', AddressController.getSingleAddress);

router.patch(
    '/:id',
    validateRequest(AddressValidation.update),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.CUSTOMER,
    ),
    AddressController.updateAddressInfo
);
router.get(
    '/user-address',
    validateRequest(AddressValidation.update),
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN,
        ENUM_USER_ROLE.CUSTOMER,
    ),
    AddressController.getUserAddress
);


router.delete('/:id',
    auth(
        ENUM_USER_ROLE.ADMIN,
        ENUM_USER_ROLE.SUPER_ADMIN
    ),
    AddressController.deleteAddress);

export const serviceRoutes = router;