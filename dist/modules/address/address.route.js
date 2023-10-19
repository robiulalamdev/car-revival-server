"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const address_controller_1 = require("./address.controller");
const address_validation_1 = require("./address.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(address_validation_1.AddressValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), address_controller_1.AddressController.createAddress);
router.get('/all', address_controller_1.AddressController.getAllAddresses);
// get cows by pagination 
router.get('/', address_controller_1.AddressController.getAddressByDynamic);
router.get('/:id', address_controller_1.AddressController.getSingleAddress);
router.patch('/:id', (0, validateRequest_1.default)(address_validation_1.AddressValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), address_controller_1.AddressController.updateAddressInfo);
router.get('/user-address', (0, validateRequest_1.default)(address_validation_1.AddressValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), address_controller_1.AddressController.getUserAddress);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), address_controller_1.AddressController.deleteAddress);
exports.serviceRoutes = router;
