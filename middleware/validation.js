import { body } from "express-validator"

const loginValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .matches(/^\S+$/).withMessage('Username must not containes space')
        .isLength({ min: 5, max: 12 }).withMessage('Username must be 5 to 12 charecter long'),


    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        // .matches(/^\s+$/).withMessage('Username must not containes space')
        .isLength({ min: 5, max: 12 }).withMessage('password must be 5 to 12 charecter long')
]



const userValidation = [
    body('fullname')
        .trim()
        .notEmpty().withMessage('Fullname is required')
        .isLength({ min: 5, max: 25 }).withMessage('Fullname must be 5 to 25 charecter long'),

    body('username')
        .trim()
        .notEmpty().withMessage('Username is required')
        .matches(/^\S+$/).withMessage('Username must not containes space')
        .isLength({ min: 5, max: 12 }).withMessage('Username must be 5 to 12 charecter long'),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 5, max: 12 }).withMessage('password must be 5 to 12 charecter long'),

    body('role')
        .trim()
        .notEmpty().withMessage('role is required')
        .isIn(['author', 'admin']).withMessage('Role must be author or admin')
]

const userUpdateValidation = [
    body('fullname')
        .trim()
        .notEmpty().withMessage('Fullname is required')
        .isLength({ min: 5, max: 25 }).withMessage('Fullname must be 5 to 25 charecter long'),

    body('password')
        .optional({ checkFalsy: true })
        .isLength({ min: 5, max: 12 }).withMessage('password must be 5 to 12 charecter long'),

    body('role')
        .trim()
        .notEmpty().withMessage('role is required')
        .isIn(['author', 'admin']).withMessage('Role must be author or admin')
]

const categoryValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('Category name is required')
        .isLength({ min: 3, max: 15 }).withMessage('category name must be 5 to 12 charecter long'),

    body('description')
        .isLength({ max: 150 }).withMessage('description must be at most 100 charecter long')
]

const articleValidation = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is required')
        .isLength({ min: 7, max: 100 }).withMessage('category name must be 7 to 50 charecter long'),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is required')
        .isLength({ min: 50 }).withMessage('category name must be 50 to 1500 charecter long'),

    body('category')
        .trim()
        .notEmpty().withMessage('Category is required'),
]




export default {
    loginValidation, userUpdateValidation, userValidation, categoryValidation, articleValidation
}