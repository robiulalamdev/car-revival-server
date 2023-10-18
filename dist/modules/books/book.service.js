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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const book_model_1 = __importDefault(require("./book.model"));
const book_constant_1 = require("./book.constant");
const paginationHelper_1 = require("../../helpers/paginationHelper");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = new book_model_1.default(book);
    const createdBook = yield newBook.save();
    return createdBook;
});
// get all cows
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.default.find({}).populate('publisher', "email").sort({ _id: -1 });
    return books;
});
// get all cows by pagination
const getAllBooksByPagination = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: book_constant_1.bookSearchableFields.map(field => {
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
                if (field === "publicationDate") {
                    return {
                        [field]: value,
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
    const result = yield book_model_1.default.find(whereConditions)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield book_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// get single book
const getBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findOne({ _id: id }).populate('publisher', "email name ");
    return book;
});
// update book info
const updateBookById = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
    });
    return book;
});
// delete book
const deleteBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.default.findByIdAndDelete({ _id: id });
    return book;
});
exports.BookService = {
    createBook,
    getBooks,
    getAllBooksByPagination,
    getBook,
    updateBookById,
    deleteBookById,
};
