import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { IService, IServiceFilters } from './service.interface';
import { Service } from './service.model';
import { serviceSearchableFields } from './service.constant';

const createService = async (data: IService): Promise<IService | null> => {
    const newCow = new Service(data);
    const createdCow = await newCow.save();
    return createdCow;
};

// get all cows by pagination 
const getAllServicesByPagination = async (
    filters: IServiceFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IService[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: serviceSearchableFields.map(field => {
                const condition: Record<string, unknown> = {};

                if (field === 'price') {
                    const numericValue = parseInt(searchTerm);
                    if (!isNaN(numericValue)) {
                        condition[field] = numericValue;
                    }
                } else {
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
                } else if (field === 'maxPrice') {
                    return {
                        price: { $lte: parseInt(String(value), 10) },
                    };
                } else {
                    return {
                        [field]: { $regex: value, $options: 'i' },
                    };
                }
            }),
        });
    }

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Service.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Service.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

// get all cows 
const getServices = async (): Promise<IService[]> => {
    const cows = await Service.find({}).populate('seller').sort({ _id: -1 });
    return cows;
};

// get single Cow 
const getSingleServiceById = async (id: string): Promise<IService | null> => {
    const cow = await Service.findOne({ _id: id }).populate('seller');
    return cow;
};

// update cow info 
const updateServiceById = async (
    id: string,
    updateData: object
): Promise<IService | null> => {
    const cow = await Service.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return cow;
};

// delete cow 
const deleteServiceById = async (id: string): Promise<IService | null> => {
    const cow = await Service.findByIdAndDelete({ _id: id });
    return cow;
};

export const CarService = {
    createService,
    getAllServicesByPagination,
    getServices,
    getSingleServiceById,
    updateServiceById,
    deleteServiceById,
};