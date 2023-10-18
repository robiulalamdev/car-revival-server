"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const book_validation_1 = require("./book.validation");
const book_controller_1 = require("./book.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(book_validation_1.BookValidation.createBookZodValidate), book_controller_1.BookController.createBook);
router.get('/all', book_controller_1.BookController.getAllBooks);
// // get cows by pagination
router.get('/', book_controller_1.BookController.getBooksByDynamic);
router.get('/:id', book_controller_1.BookController.getSingleBook);
router.patch('/:id', (0, validateRequest_1.default)(book_validation_1.BookValidation.updateBookZodValidate), book_controller_1.BookController.updateBookInfo);
router.delete('/:id', book_controller_1.BookController.deleteBook);
// router.get('/:id', auth(
//     ENUM_USER_ROLE.SELLER,
//     ENUM_USER_ROLE.BUYER,
//     ENUM_USER_ROLE.ADMIN
// ), CowController.getSingleCow);
// router.patch(
//     '/:id',
//     validateRequest(CowValidation.updateCowZodValidate),
//     auth(
//         ENUM_USER_ROLE.SELLER
//     ),
//     CowController.updateCowInfo
// );
// router.delete('/:id',
//     auth(
//         ENUM_USER_ROLE.SELLER
//     ),
//     CowController.deleteCow);
exports.bookRoutes = router;
