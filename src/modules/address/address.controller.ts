import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { paginationFields } from '../../constants/pagination';
import { AddressService } from './address.service';
import { IAddress } from './address.interface';

const createAddress: RequestHandler = async (req, res, next) => {
    try {
        const result = await AddressService.createAddress(req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Category created successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

// get cows by pagination 
const getAddressByDynamic: RequestHandler = async (req, res, next) => {
    try {
        const filters = pick(req.query, categoryFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AddressService.getAllCategoriesByPagination(
            filters,
            paginationOptions
        );

        sendResponse<IAddress[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'categories retrieved successfully !',
            meta: result.meta,
            data: result.data,
        });
    } catch (error) {
        next(error);
    }
};

// get all cows 
const getAllCategories: RequestHandler = async (req, res, next) => {
    try {
        const result = await AddressService.getCategories();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Categories retrieved successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// get single cow 
const getSingleAddress: RequestHandler = async (req, res, next) => {
    try {
        const result = await AddressService.getSingleAddressById(req.params.id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Address retrieved successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// update user info 
const updateAddressInfo: RequestHandler = async (req, res, next) => {
    try {
        const result = await AddressService.updateAddressById(req.params.id, req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Category updated successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// delete user 
const deleteCategory: RequestHandler = async (req, res, next) => {
    try {
        const result = await AddressService.deleteCategoryById(req.params.id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Category deleted successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const CategoryController = {
    createAddress,
    getAddressByDynamic,
    getAllCategories,
    getSingleAddress,
    updateAddressInfo,
    deleteCategory,
};