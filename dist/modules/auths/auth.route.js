"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
/* eslint-disable consistent-type-definitions */
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_zodHanadler_1 = require("../users/user.zodHanadler");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const user_1 = require("../../enums/user");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.default)(user_zodHanadler_1.AuthValidation.createUserZodValidate), auth_controller_1.authController.create);
router.post('/forgot-password', (0, validateRequest_1.default)(user_zodHanadler_1.AuthValidation.email), auth_controller_1.authController.forgetPassword);
router.post('/email-verify', (0, validateRequest_1.default)(user_zodHanadler_1.AuthValidation.email), auth_controller_1.authController.emailVerification);
router.post('/login', (0, validateRequest_1.default)(user_zodHanadler_1.AuthValidation.loginAuthValidation), auth_controller_1.authController.loginUser);
router.get('/info', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN, user_1.ENUM_USER_ROLE.SUPER_ADMIN, user_1.ENUM_USER_ROLE.CUSTOMER), auth_controller_1.authController.getAuthInfo);
router.post('/refresh-token', auth_controller_1.authController.refreshToken);
exports.authRoutes = router;
