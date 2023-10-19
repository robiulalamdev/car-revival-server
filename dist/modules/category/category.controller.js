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
exports.CategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../shared/sendResponse"));
const pick_1 = __importDefault(require("../../shared/pick"));
const pagination_1 = require("../../constants/pagination");
const category_service_1 = require("./category.service");
const category_constant_1 = require("./category.constant");
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.CategoryService.createCategory(req.body);
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
const getCategoriesByDynamic = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, category_constant_1.categoryFilterableFields);
        const paginationOptions = (0, pick_1.default)(req.query, pagination_1.paginationFields);
        const result = yield category_service_1.CategoryService.getAllCategoriesByPagination(filters, paginationOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'categories retrieved successfully !',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
// get all cows 
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.CategoryService.getCategories();
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Categories retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// get single cow 
const getSingleCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.CategoryService.getSingleCategoryById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Category retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// update user info 
const updateCategoryInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.CategoryService.updateCategoryById(req.params.id, req.body);
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
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield category_service_1.CategoryService.deleteCategoryById(req.params.id);
        (0, sendResponse_1.default)(res, {
            success: true,
            statusCode: http_status_1.default.OK,
            message: 'Category deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CategoryController = {
    createCategory,
    getCategoriesByDynamic,
    getAllCategories,
    getSingleCategory,
    updateCategoryInfo,
    deleteCategory,
};
