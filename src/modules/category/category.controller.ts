import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { paginationFields } from '../../constants/pagination';
import { CategoryService } from './category.service';
import { categoryFilterableFields } from './category.constant';
import { ICategory } from './category.interface';

const createCategory: RequestHandler = async (req, res, next) => {
    try {
        const result = await CategoryService.createCategory(req.body);
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
const getCategoriesByDynamic: RequestHandler = async (req, res, next) => {
    try {
        const filters = pick(req.query, categoryFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await CategoryService.getAllCategoriesByPagination(
            filters,
            paginationOptions
        );

        sendResponse<ICategory[]>(res, {
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
        const result = await CategoryService.getCategories();
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
const getSingleCategory: RequestHandler = async (req, res, next) => {
    try {
        const result = await CategoryService.getSingleCategoryById(req.params.id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Category retrieved successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// update user info 
const updateCategoryInfo: RequestHandler = async (req, res, next) => {
    try {
        const result = await CategoryService.updateCategoryById(req.params.id, req.body);
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
        const result = await CategoryService.deleteCategoryById(req.params.id);
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
    createCategory,
    getCategoriesByDynamic,
    getAllCategories,
    getSingleCategory,
    updateCategoryInfo,
    deleteCategory,
};