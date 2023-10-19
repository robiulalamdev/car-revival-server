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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const paginationHelper_1 = require("../../helpers/paginationHelper");
const category_model_1 = require("./category.model");
const category_constant_1 = require("./category.constant");
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCate = new category_model_1.Category(data);
    const createdCate = yield newCate.save();
    return createdCate;
});
// get all cows by pagination 
const getAllCategoriesByPagination = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: category_constant_1.categorySearchableFields.map(field => {
                const condition = {};
                condition[field] = {
                    $regex: searchTerm,
                    $options: 'i',
                };
                return condition;
            }),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                return {
                    [field]: { $regex: value, $options: 'i' },
                };
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield category_model_1.Category.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield category_model_1.Category.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get all cows 
const getCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    const cows = yield category_model_1.Category.find({}).sort({ _id: -1 });
    return cows;
});
// get single Cow 
const getSingleCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOne({ _id: id });
    return result;
});
// update cow info 
const updateCategoryById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return result;
});
// delete result 
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_model_1.Category.findByIdAndDelete({ _id: id });
    return result;
});
exports.CategoryService = {
    createCategory,
    getAllCategoriesByPagination,
    getCategories,
    getSingleCategoryById,
    updateCategoryById,
    deleteCategoryById,
};
