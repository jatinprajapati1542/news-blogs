import mongoose from "mongoose"
import userModel from "../models/User.js"
import newsModel from "../models/News.js"
import categoryModel from "../models/Category.js"
import createError from "../utils/createError.js"
import fs from "fs"
import cloudinary from "../config/cloudinary.js"
// import path from "path"
// import { fileURLToPath } from "url";
// import { validationResult } from "express-validator"

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const allArticle = async (req, res, next) => {
    try {
        let articles
        if (req.role === 'admin') {
            articles = await newsModel.find()
                .populate('category', 'name')
                .populate('author', 'fullname')
        } else {
            articles = await newsModel.find({ author: req.id })
                .populate('category', 'name')
                .populate('author', 'fullname')
        }
        // if(!articles){
        //     next(createError("Artocles not founds" , 404))
        // }
        res.render('admin/articles', { role: req.role, articles })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const addArticlePage = async (req, res) => {
    const categories = await categoryModel.find();
    res.render('admin/articles/create', { role: req.role, categories, errors: 0 })
}

const addArticle = async (req, res, next) => {

    // console.log(req.body , req.files)
    // const categories = await categoryModel.find
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const categories = await categoryModel.find();
        return res.render('admin/articles/create', {
            categories,
            role: req.role,
            errors: errors.array()
        })
    }
    const { title, content, category } = req.body;
    try {
        const article = new newsModel({
            title,
            content,
            category,
            author: req.id,
            image: req.file.path
        });
        await article.save()
        res.redirect('/admin/article')
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const updateArticlePage = async (req, res, next) => {
    const { id } = req.params;
    try {

        const article = await newsModel.findById(id)
            .populate('category', 'name')
            .populate('author', 'fullname')

        if (!article) {
            return next(createError("Article Not Found", 404))
        }

        if (req.role === 'author') {
            if (req.id != article.author._id) {
                return next(createError("UnAuthorized", 401))
            }
        }
        // res.json(article)
        const categories = await categoryModel.find();
        res.render('admin/articles/update', { role: req.role, article, categories, errors: 0 })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const updateArticle = async (req, res, next) => {
    const { id } = req.params;
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const categories = await categoryModel.find();
        return res.render('admin/articles/update', {
            categories,
            id: id,
            article: req.body,
            role: req.role,
            errors: errors.array()
        })
    }
    try {
        const { title, content, category } = req.body;
        const article = await newsModel.findById(id)
        if (!article) {
            // return res.status(404).send("Article Not Found")
            return next(createError("Article Not Found", 404))
        }

        if (req.role === 'author') {
            if (req.id != article.author._id) {
                // return res.status(401).send('ubauthorized')
                return next(createError("Internal Server Error", 500))
            }
        }


        article.title = title || article.title;
        article.content = content || article.content;
        article.category = category || article.category;
        if (req.file) {
            await cloudinary.uploader.destroy(article.image)
            article.image = req.file.path;
        }
        await article.save()
        res.redirect('/admin/article')
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const deleteArticle = async (req, res, next) => {
    const { id } = req.params;
    try {
        const article = await newsModel.findById(id)
        if (!article) {
            // return res.status(404).send("Article Not Found")
            return next(createError("Article Not Found", 404))
        }

        if (req.role === 'author') {
            if (req.id != article.author._id) {
                // return res.status(401).send('ubauthorized')
                return next(createError("UnAuthorized", 401))
            }
        }

        if(article.image){
            await cloudinary.uploader.destroy(article.image)
        }

        await article.deleteOne()
        res.status(200).json({ success: true })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}


export default {
    allArticle,
    addArticlePage,
    addArticle,
    updateArticlePage,
    updateArticle,
    deleteArticle,
}