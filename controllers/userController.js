import userModal from "../models/User.js"
import newsModel from "../models/News.js"
import categoryModel from "../models/Category.js"
import settingModel from "../models/Setting.js"
import createError from "../utils/createError.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { validationResult } from "express-validator"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

const loginPage = (req, res) => {
    res.render('admin/login', {
        layout: false,
        errors: 0
    })
}

const adminLogin = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('admin/login', {
            layout: false,
            errors: errors.array()
        })
    }
    const { username, password } = req.body
    try {
        const user = await userModal.findOne({ username })
        if (!user) {
            return next(createError("Invalid Username", 404))
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return next(createError("Invalid password", 401))
        }

        const tokenData = { id: user._id, fullname: user.fullname, role: user.role }
        const token = jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie('token', token, { httpOnly: true, maxAge: 1000 * 60 * 60 })
        res.redirect('/admin/dashboard')
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const logout = (req, res) => {
    res.clearCookie('token')
    res.redirect('/admin')
}

const dashboard = async (req, res, next) => {
    try {
        let articleCount
        if (req.role === 'admin') {
            articleCount = await newsModel.countDocuments()
        } else {
            articleCount = await newsModel.countDocuments({ author: req.id })
        }

        const categoryCount = await categoryModel.countDocuments()
        const userCount = await userModal.countDocuments()

        res.render('admin/dashboard', { role: req.role, fullname: req.fullname, articleCount, userCount, categoryCount })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const setting = async (req, res, next) => {
    try {
        const setting = await settingModel.findOne()
        res.render('admin/setting', { role: req.role, setting })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const saveSetting = async (req, res, next) => {
    const { website_title, footer_description } = req.body;
    const website_logo = req.file?.filename

    try {
        const setting = await settingModel.findOne();
        if (!setting) {
            setting = new settingModel();
        }

        setting.website_title = website_title
        setting.footer_description = footer_description

        if (website_logo) {
            if (setting.website_logo) {
                const logoPath = `./public/uploads/${setting.website_logo}`
                fs.unlinkSync(logoPath)
            }
            setting.website_logo = website_logo
        }


        await setting.save()

        res.redirect('/admin/setting')
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const allUser = async (req, res, next) => {
    try {
        const users = await userModal.find()
        res.render('admin/users', { users, role: req.role })

    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const addUserPage = (req, res) => {
    res.render('admin/users/create', { role: req.role, errors: 0 })
}

const addUser = async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('admin/users/create', {
            role: req.role,
            errors: errors.array()
        })
    }
    try {
        await userModal.create(req.body)
        res.redirect("/admin/users")
    } catch (error) {
        console.log(error)
        next(createError("Internal Server Error", 500))
    }
}

const updateUserPage = async (req, res, next) => {
    try {
        const user = await userModal.findById(req.params.id)
        if (!user) {
            return next(createError("User Not Found" , 404))
        }
        res.render('admin/users/update', { user, role: req.role, errors: 0 })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

const updateUser = async (req, res, next) => {
    const { id } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.render('admin/users/update', {
            id : id,
            user: req.body,
            role: req.role,
            errors: errors.array()
        })
    }
    const { fullname, password, role } = req.body
    try {
        const user = await userModal.findById(id)
        if (!user) {
            return next(createError("User Not Found", 404))
        }
        user.fullname = fullname || user.fullname;
        if (password) {
            user.password = password
        }
        user.role = role || user.role;
        await user.save()
        res.redirect('/admin/users')
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }

}

const deleteUser = async (req, res, next) => {
    const { id } = req.params
    try {
        const user = await userModal.findById(id)
        if (!user) {
            res.status(404).send('User not found')
        }

        const article = await newsModel.find({ author: id })
        if (article) {
            return res.status(400).json({ success: false, message: "User is assosiated with an article" })
        }

        await user.deleteOne()
        res.status(200).json({ success: true })
    } catch (error) {
        next(createError("Internal Server Error", 500))
    }
}

export default {
    loginPage,
    adminLogin,
    logout,
    dashboard,
    setting,
    saveSetting,
    allUser,
    addUserPage,
    addUser,
    updateUserPage,
    updateUser,
    deleteUser,
}

