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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const address_service_1 = require("./address.service");
const address_constant_1 = require("./address.constant");
const createAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield address_service_1.AddressService.createAddress(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Category created successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// get cows by pagination 
const getAddressByDynamic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, address_constant_1.addressFilterableFields);
        const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = yield address_service_1.AddressService.getAllAddressByPagination(filters, paginationOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Address retrieved successfully !',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
// get all cows 
const getAllAddresses = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield address_service_1.AddressService.getAddresses();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Address retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get single cow 
const getSingleAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield address_service_1.AddressService.getSingleAddressById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Address retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getUserAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.user;
        const result = yield address_service_1.AddressService.getAddressByUserId(userId);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Address retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// update user info 
const updateAddressInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield address_service_1.AddressService.updateAddressById(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Category updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// delete user 
const deleteAddress = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield address_service_1.AddressService.deleteAddressById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Address deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.AddressController = {
    createAddress,
    getAddressByDynamic,
    getAllAddresses,
    getSingleAddress,
    updateAddressInfo,
    getUserAddress,
    deleteAddress,
};
