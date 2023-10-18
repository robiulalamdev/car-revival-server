import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { paginationFields } from '../../constants/pagination';
import { AddressService } from './address.service';
import { IAddress } from './address.interface';
import { addressFilterableFields } from './address.constant';

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
        const filters = pick(req.query, addressFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await AddressService.getAllAddressByPagination(
            filters,
            paginationOptions
        );

        sendResponse<IAddress[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Address retrieved successfully !',
            meta: result.meta,
            data: result.data,
        });
    } catch (error) {
        next(error);
    }
};

// get all cows 
const getAllAddresses: RequestHandler = async (req, res, next) => {
    try {
        const result = await AddressService.getAddresses();
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


const getUserAddress: RequestHandler = async (req, res, next) => {
    try {
        const { userId } = (req as any).user
        const result = await AddressService.getAddressByUserId(userId);
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
const deleteAddress: RequestHandler = async (req, res, next) => {
    try {
        const result = await AddressService.deleteAddressById(req.params.id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Address deleted successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const AddressController = {
    createAddress,
    getAddressByDynamic,
    getAllAddresses,
    getSingleAddress,
    updateAddressInfo,
    getUserAddress,
    deleteAddress,
};