import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelper';
import { IPaginationOptions } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { ICategory, ICategoryFilters } from './category.interface';
import { Category } from './category.model';
import { categorySearchableFields } from './category.constant';

const createCategory = async (data: ICategory): Promise<ICategory | null> => {
    const newCate = new Category(data);
    const createdCate = await newCate.save();
    return createdCate;
};

// get all cows by pagination 
const getAllCategoriesByPagination = async (
    filters: ICategoryFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICategory[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: categorySearchableFields.map(field => {
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

    const result = await Category.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Category.countDocuments();

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
const getCategories = async (): Promise<ICategory[]> => {
    const cows = await Category.find({}).populate('seller').sort({ _id: -1 });
    return cows;
};

// get single Cow 
const getSingleCategoryById = async (id: string): Promise<ICategory | null> => {
    const result = await Category.findOne({ _id: id }).populate('seller');
    return result;
};

// update cow info 
const updateCategoryById = async (
    id: string,
    updateData: object
): Promise<ICategory | null> => {
    const result = await Category.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return result;
};

// delete result 
const deleteCategoryById = async (id: string): Promise<ICategory | null> => {
    const result = await Category.findByIdAndDelete({ _id: id });
    return result;
};

export const CategoryService = {
    createCategory,
    getAllCategoriesByPagination,
    getCategories,
    getSingleCategoryById,
    updateCategoryById,
    deleteCategoryById,
};