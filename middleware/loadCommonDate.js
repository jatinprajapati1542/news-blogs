import CategoryModel from "../models/Category.js"
import newsModel from "../models/News.js"
import settingModel from "../models/Setting.js"
import NodeCache from "node-cache"

const cache = new NodeCache();

const loadCommonData = async (req, res, next) => {
    try {
        var latestNews = cache.get('latestNewsCache')
        var categories = cache.get('categoriesCache')
        var settings = cache.get('settingsCache')


        if (!latestNews && !categories && !settings) {
            settings = await settingModel.findOne().lean()

            latestNews = await newsModel.find()
                .populate('category', { 'name': 1, 'slug': 1 })
                .populate('author', 'fullname')
                .sort({ createdAt: -1 })
                .limit(5)
                .lean()

            const categoryInUse = await newsModel.distinct('category')
            categories = await CategoryModel.find({ '_id': { $in: categoryInUse } }).lean()

            cache.set('latestNewsCache' , latestNews , 60 * 60 * 1 )
            cache.set('categoriesCache' , categories, 60 * 60 * 1 )
            cache.set('settingsCache' , settings, 60 * 60 * 1   )
        }

        res.locals.settings = settings
        res.locals.latestNews = latestNews
        res.locals.categories = categories

        next()
    } catch (error) {
        console.log(error)
        res.status(500).send("Internal Server Error")
    }
}

export default loadCommonData