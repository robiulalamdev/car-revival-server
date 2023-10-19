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
const category_controller_1 = require("./category.controller");
const category_validation_1 = require("./category.validation");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.create), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), category_controller_1.CategoryController.createCategory);
router.get('/all', category_controller_1.CategoryController.getAllCategories);
// get cows by pagination 
router.get('/', category_controller_1.CategoryController.getCategoriesByDynamic);
router.get('/:id', category_controller_1.CategoryController.getSingleCategory);
router.patch('/:id', (0, validateRequest_1.default)(category_validation_1.CategoryValidation.update), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), category_controller_1.CategoryController.updateCategoryInfo);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN), category_controller_1.CategoryController.deleteCategory);
exports.serviceRoutes = router;
