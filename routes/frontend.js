import express from "express"
import siteController from "../controllers/siteController.js"
import loadCommonData from "../middleware/loadCommonDate.js"
const router = express.Router();

router.use(loadCommonData)
router.get('/', siteController.index);
router.get('/category/:slug', siteController.articleByCategory);
router.get('/single/:id', siteController.singleArticle);
router.get('/search', siteController.search);
router.get('/author/:name', siteController.author);
router.post('/single/:id/comment', siteController.addComment);
router.get('/testing', siteController.testing);


//404 middleware
router.use((req, res, next) => {
    res.status(404).render('404', {
        message: "Page Not Found"
    })
})

router.use((err, req, res, next) => {
    console.log(err.stack);
    const status = err.status || 500;

    res.status(status).render('errors', {
        message: err.message || "Something went wrong",
        status
    })
})


export default router;