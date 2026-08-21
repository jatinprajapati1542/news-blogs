import mongoose from "mongoose"
import CategoryModel from "../models/Category.js"
import CommentModel from "../models/Comment.js"
import UserModel from "../models/User.js"
import newsModel from "../models/News.js"
import settingModel from "../models/Setting.js"
import createError from "../utils/createError.js"
import paginate from "../utils/pagination.js"


const index = async (req, res, next) => {
    try {
        const paginatedNews = await paginate(newsModel, {},
            req.query,
            {
                populate: [
                    { path: 'category', select: 'name slug' },
                    { path: 'author', select: 'fullname' },
                ],
                sort: '-createdAt'
            })

        // res.json(paginatedNews)
        res.render('index', { paginatedNews, query: req.query })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}




const articleByCategory = async (req, res, next) => {
    const { slug } = req.params
    try {


        const category = await CategoryModel.findOne({ slug: slug })
        if (!category) {
            return next(createError("Category not found", 404))
        }


        const paginatedNews = await paginate(newsModel, { category: category._id },
            req.query,
            {
                populate: [
                    { path: 'category', select: 'name slug' },
                    { path: 'author', select: 'fullname' },
                ],
                sort: '-createdAt'
            })


        res.render('category', { paginatedNews, category, query: req.query })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const singleArticle = async (req, res, next) => {
    const { id } = req.params
    try {

        const singleNews = await newsModel.findById(id)
            .populate('category', { 'name': 1, 'slug': 1 })
            .populate('author', 'fullname')
            .sort({ createdAt: -1 })

        if (!singleNews) {
            return next(createError('Article not found', 404))
        }

        const comments = await CommentModel.find({ article: id, status: 'approved' })
            .sort('-createdAt')
        // res.json({ singleNews, comments }   )
        res.render('single', { singleNews, comments })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }

}

const search = async (req, res, next) => {
    const searchQuery = req.query.search

    try {

        const paginatedNews = await paginate(newsModel, {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { content: { $regex: searchQuery, $options: 'i' } }
            ]
        },
            req.query,
            {
                populate: [
                    { path: 'category', select: 'name slug' },
                    { path: 'author', select: 'fullname' },
                ],
                sort: '-createdAt'
            })

        res.render('search', { paginatedNews, searchQuery, query: req.query })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }

}

const author = async (req, res, next) => {

    try {
        const author = await UserModel.findOne({ _id: req.params.name })
        if (!author) {
            return next(createError("Author not found", 404))
        }

        const paginatedNews = await paginate(newsModel, { author: req.params.name },
            req.query,
            {
                populate: [
                    { path: 'category', select: 'name slug' },
                    { path: 'author', select: 'fullname' },
                ],
                sort: '-createdAt'
            })

        res.render('author', { paginatedNews, author, query: req.query })

    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const addComment = async (req, res) => {
    const { id } = req.params
    const { name, email, content } = req.body
    try {
        const comment = await new CommentModel({ name, email, content, article: id });
        await comment.save();
        res.redirect(`/single/${id}`)
    } catch (error) {
        next("Error in adding comment", 500)
    }
}

const testing = async (req, res) => {
    // res.send('this is long string '.repeat(50000))
    const news = await newsModel.find()
    res.json(news)
}
export default {
    index,
    articleByCategory,
    singleArticle,
    search,
    author,
    addComment,
    testing,
}