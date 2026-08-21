import mongoose from "mongoose";
import CommentModel from "../models/Comment.js"
import createError from "../utils/createError.js"
import NewsModel from "../models/News.js"

const allComments = async (req, res , next) => {
    try {
        let comments
        if (req.role === 'admin') {
            comments = await CommentModel.find()
                .populate('article', 'title')
                .sort({ createdAt: -1 })
        } else {
            const news = await NewsModel.find({ author: req.id });
            const newsIds = news.map(news => news._id)
            comments = await CommentModel.find({ article: { $in: newsIds } })
                .populate('article', 'title')
                .sort({ createdAt: -1 })
        }

        
        res.render('admin/comments', { role: req.role, comments })
    } catch (error) {
        console.log(error)
        next(createError("Internal Server Error" , 500))
    }
}

const updateCommentStatus = async (req, res , next) => {
    const { status } = req.body
    try {
        const comment = await CommentModel.findByIdAndUpdate(req.params.id, { status: status })
        if (!comment) {
            return next(createError("Comment Not Found" , 404))
        }
        res.status(200).json({ success: true })
    } catch (error) {
        next(createError("Internal Server Error" , 500))
    }
}

const deleteComment = async (req, res , next) => {
    try {
        const comment = await CommentModel.findByIdAndDelete(req.params.id)
        if (!comment) {
            return next(createError("Comment Not Found" , 404))
        }
        res.status(200).json({ success: true })
    } catch (error) {
        next(createError("Internal Server Error" , 500))
    }
}

export default {
    allComments,
    updateCommentStatus,
    deleteComment,
}