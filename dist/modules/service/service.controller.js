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
exports.ServiceController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const service_service_1 = require("./service.service");
const service_constant_1 = require("./service.constant");
const createService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_service_1.CarService.createService(req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Cow created successfully',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
// get cows by pagination 
const getServicesByDynamic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, service_constant_1.serviceFilterableFields);
        const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = yield service_service_1.CarService.getAllServicesByPagination(filters, paginationOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Services retrieved successfully !',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
// get all cows 
const getAllServices = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_service_1.CarService.getServices();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Services retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get single cow 
const getSingleService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_service_1.CarService.getSingleServiceById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Service retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// update user info 
const updateServiceInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_service_1.CarService.updateServiceById(req.params.id, req.body);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Service updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// delete user 
const deleteService = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_service_1.CarService.deleteServiceById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Service deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.ServiceController = {
    createService,
    getServicesByDynamic,
    getAllServices,
    getSingleService,
    updateServiceInfo,
    deleteService,
};
