import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../shared/sendResponse';
import pick from '../../shared/pick';
import { paginationFields } from '../../constants/pagination';
import { CarService } from './service.service';
import { serviceFilterableFields } from './service.constant';
import { IService } from './service.interface';

const createService: RequestHandler = async (req, res, next) => {
    try {
        const result = await CarService.createService(req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Cow created successfully',
            data: result,
        });
    } catch (err) {
        next(err);
    }
};

// get cows by pagination 
const getServicesByDynamic: RequestHandler = async (req, res, next) => {
    try {
        const filters = pick(req.query, serviceFilterableFields);
        const paginationOptions = pick(req.query, paginationFields);

        const result = await CarService.getAllServicesByPagination(
            filters,
            paginationOptions
        );

        sendResponse<IService[]>(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'Services retrieved successfully !',
            meta: result.meta,
            data: result.data,
        });
    } catch (error) {
        next(error);
    }
};

// get all cows 
const getAllServices: RequestHandler = async (req, res, next) => {
    try {
        const result = await CarService.getServices();
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Services retrieved successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// get single cow 
const getSingleService: RequestHandler = async (req, res, next) => {
    try {
        const result = await CarService.getSingleServiceById(req.params.id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Service retrieved successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// update user info 
const updateServiceInfo: RequestHandler = async (req, res, next) => {
    try {
        const result = await CarService.updateServiceById(req.params.id, req.body);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Service updated successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

// delete user 
const deleteService: RequestHandler = async (req, res, next) => {
    try {
        const result = await CarService.deleteServiceById(req.params.id);
        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: 'Service deleted successfully',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const ServiceController = {
    createService,
    getServicesByDynamic,
    getAllServices,
    getSingleService,
    updateServiceInfo,
    deleteService,
};