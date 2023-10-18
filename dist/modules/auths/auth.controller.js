"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const user_model_1 = require("../users/user.model");
const catchAsync_1 = __importDefault(require("../../shared/catchAsync"));
const auth_service_1 = require("./auth.service");
const randomstring_1 = __importDefault(require("randomstring"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const jwtHelpers_1 = require("../../helpers/jwtHelpers");
const bcrypt_1 = __importDefault(require("bcrypt"));
const create = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: req.body.email });
    if (isExist) {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.OK,
            message: 'Email Already in use!'
        });
    }
    else {
        req.body["otp"] = randomstring_1.default.generate({ length: 5, charset: "numeric" });
        const result = yield auth_service_1.authService.createUser(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'We have sent you verification code. Please check your email!',
            data: result,
        });
    }
}));
const emailVerification = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { otp, email } = req.body;
    const user = yield user_model_1.User.findOne({ email: email });
    if (!user) {
        (0, sendResponse_1.default)(res, {
            success: false,
            statusCode: http_status_1.default.NOT_FOUND,
            message: 'User not found!',
        });
    }
    else {
        if ((user === null || user === void 0 ? void 0 : user.otp) !== otp) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid OTP');
        }
        user.verified = true;
        const result = yield user_model_1.User.findOneAndUpdate({ _id: user._id }, user, { new: true });
        const token = jwtHelpers_1.jwtHelpers.createToken({ email: result === null || result === void 0 ? void 0 : result.email, role: result === null || result === void 0 ? void 0 : result.role, userId: result === null || result === void 0 ? void 0 : result._id, name: result === null || result === void 0 ? void 0 : result.name, image: result === null || result === void 0 ? void 0 : result.image }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
        res.send({
            message: "User Verified successfully",
            accessToken: token,
            status: 200,
        });
    }
}));
const loginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loginData = __rest(req.body, []);
        const result = yield auth_service_1.authService.authLogin(loginData);
        const { refreshToken } = result, others = __rest(result, ["refreshToken"]);
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'User logged in successfully',
            data: others,
        });
    }
    catch (error) {
        next(error);
    }
});
const refreshToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const result = yield auth_service_1.authService.refreshToken(refreshToken);
        // set refresh token into cookie
        const cookieOptions = {
            secure: config_1.default.env === 'production',
            httpOnly: true,
        };
        res.cookie('refreshToken', refreshToken, cookieOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'New access token generated successfully !',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAuthInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const user = yield user_model_1.User.findOne({ _id: userId });
        (0, sendResponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'User info get successfully !',
            data: user,
        });
    }
    catch (error) {
        next(error);
    }
});
const forgetPassword = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ email: req.body.email });
    if (req.body.email && !req.body.otp) {
        if (isExist && isExist.verified === true) {
            const otp = randomstring_1.default.generate({ length: 5, charset: "numeric" });
            const result = yield user_model_1.User.findOneAndUpdate({ _id: isExist._id }, { otp: otp });
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'We have sent you verification code. Please check your email!',
                data: result,
            });
        }
        else {
            (0, sendResponse_1.default)(res, {
                success: false,
                statusCode: http_status_1.default.NOT_FOUND,
                message: 'Account Not Verified Please Verify!'
            });
        }
    }
    else if (req.body.email && req.body.otp && !req.body.password) {
        if (isExist) {
            if (isExist.otp === req.body.otp) {
                (0, sendResponse_1.default)(res, {
                    success: true,
                    statusCode: http_status_1.default.OK,
                    message: 'Change Your Password'
                });
            }
            else {
                (0, sendResponse_1.default)(res, {
                    success: true,
                    statusCode: 201,
                    message: 'OTP is incorrect'
                });
            }
        }
    }
    else if (req.body.password) {
        if (isExist) {
            const password = yield bcrypt_1.default.hash(req.body.password, Number(config_1.default.bycrypt_salt_rounds));
            yield user_model_1.User.findOneAndUpdate({ _id: isExist._id }, { password: password });
            (0, sendResponse_1.default)(res, {
                success: true,
                statusCode: http_status_1.default.OK,
                message: 'Password Changed successfully'
            });
        }
    }
}));
exports.authController = {
    create,
    loginUser,
    emailVerification,
    getAuthInfo,
    refreshToken,
    forgetPassword
};
