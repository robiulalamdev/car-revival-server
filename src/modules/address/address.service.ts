import { Address } from './address.model';
import { IAddress, IAddressFilters } from './address.interface';
import { addressSearchableFields } from './address.constant';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IGenericResponse } from '../../interfaces/common';
import { IPaginationOptions } from '../../interfaces/pagination';
import { SortOrder } from 'mongoose';

const createAddress = async (data: IAddress): Promise<IAddress | null> => {
    const newCate = new Address(data);
    const createdCate = await newCate.save();
    return createdCate;
};


// get all cows 
const getAddresses = async (): Promise<IAddress[]> => {
    const result = await Address.find({}).sort({ _id: -1 });
    return result;
};


// get all cows by pagination 
const getAllAddressByPagination = async (
    filters: IAddressFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAddress[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: addressSearchableFields.map(field => {
                const condition: Record<string, unknown> = {};
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

    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }

    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Address.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Address.countDocuments();

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};


// get single Cow 
const getSingleAddressById = async (id: string): Promise<IAddress | null> => {
    const result = await Address.findOne({ _id: id })
    return result;
};

// get single Cow 
const getAddressByUserId = async (id: string): Promise<IAddress[]> => {
    const result = await Address.find({ userId: id })
    return result;
};

// update cow info 
const updateAddressById = async (
    id: string,
    updateData: object
): Promise<IAddress | null> => {
    const result = await Address.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return result;
};

// delete result 
const deleteAddressById = async (id: string): Promise<IAddress | null> => {
    const result = await Address.findByIdAndDelete({ _id: id });
    return result;
};

export const AddressService = {
    createAddress,
    getAddresses,
    getSingleAddressById,
    getAllAddressByPagination,
    getAddressByUserId,
    updateAddressById,
    deleteAddressById,
};