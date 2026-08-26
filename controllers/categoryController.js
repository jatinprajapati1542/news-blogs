import mongoose from "mongoose"
import categoryModel from "../models/Category.js"
import createError from "../utils/createError.js"
import newsModel from "../models/News.js"
import { validationResult } from "express-validator"


const allCategory = async (req, res, next) => {
    const categories = await categoryModel.find()
    res.render('admin/categories', { categories, role: req.role })
}

const addCategoryPage = async (req, res) => {
    try {
        res.render('admin/categories/create', { role: req.role, errors: 0 })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const addCategory = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('admin/categories/create', {
            role: req.role,
            errors: errors.array()
        })
    }
    try {
        await categoryModel.create(req.body)
        res.redirect('/admin/category')
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const updateCategoryPage = async (req, res, next) => {
    const { id } = req.params
    try {
        const category = await categoryModel.findById(id)
        if (!category) {
            // return res.status(404).send('Category Not Found')
            return next(createError("Category Not Found", 404))
        }
        res.render('admin/categories/update', { category, role: req.role, errors: 0 })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const updateCategory = async (req, res, next) => {
    const { id } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const category = await categoryModel.findById(id);
        return res.render('admin/categories/update', {
            category,
            role: req.role,
            errors: errors.array()
        })
    }
    try {
        const category = await categoryModel.findById(id, req.body)
        if (!category) {
            return next(createError("Category Not Found", 404))
        }

        category.name = req.body.name
        category.description = req.body.description

        await category.save()
        res.redirect('/admin/category')
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const deleteCategory = async (req, res, next) => {
    const { id } = req.params
    try {
        const category = await categoryModel.findById(id)
        if (!category) {
            return next(createError("Category Not Found", 404))
        }

        const article = await newsModel.findOne({ category: id })
        if (article) {
            return res.status(400).json({ success: false, message: 'Category is assosiated with an article ' })
        }

        await category.deleteOne()
        res.json({ success: true })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}



export default {
    allCategory,
    addCategoryPage,
    addCategory,
    updateCategoryPage,
    updateCategory,
    deleteCategory,
}