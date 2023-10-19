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
exports.CarService = void 0;
const paginationHelper_1 = require("../../helpers/paginationHelper");
const service_model_1 = require("./service.model");
const service_constant_1 = require("./service.constant");
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const newCow = new service_model_1.Service(data);
    const createdCow = yield newCow.save();
    return createdCow;
});
// get all cows by pagination 
const getAllServicesByPagination = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: service_constant_1.serviceSearchableFields.map(field => {
                const condition = {};
                if (field === 'price') {
                    const numericValue = parseInt(searchTerm);
                    if (!isNaN(numericValue)) {
                        condition[field] = numericValue;
                    }
                }
                else {
                    condition[field] = {
                        $regex: searchTerm,
                        $options: 'i',
                    };
                }
                return condition;
            }),
        });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => {
                if (field === 'minPrice') {
                    return {
                        price: { $gte: parseInt(String(value), 10) },
                    };
                }
                else if (field === 'maxPrice') {
                    return {
                        price: { $lte: parseInt(String(value), 10) },
                    };
                }
                else {
                    return {
                        [field]: { $regex: value, $options: 'i' },
                    };
                }
            }),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield service_model_1.Service.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield service_model_1.Service.countDocuments();
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
const getServices = () => __awaiter(void 0, void 0, void 0, function* () {
    const cows = yield service_model_1.Service.find({}).sort({ _id: -1 });
    return cows;
});
// get single Cow 
const getSingleServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield service_model_1.Service.findOne({ _id: id });
    return cow;
});
// update cow info 
const updateServiceById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.Service.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return result;
});
// delete cow 
const deleteServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield service_model_1.Service.findByIdAndDelete({ _id: id });
    return cow;
});
exports.CarService = {
    createService,
    getAllServicesByPagination,
    getServices,
    getSingleServiceById,
    updateServiceById,
    deleteServiceById,
};
