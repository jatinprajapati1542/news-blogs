import express from "express"
import articleController from "../controllers/articleController.js"
import commentController from "../controllers/commentController.js"
import categoryController from "../controllers/categoryController.js"
import userController from "../controllers/userController.js"
import isLogin from "../middleware/isLogin.js"
import isAdmin from "../middleware/isAdmin.js"
import upload from "../middleware/multer.js"

import isValid from "../middleware/validation.js"
const router = express.Router();


//login routes
router.get('/', userController.loginPage);
router.post('/index', isValid.loginValidation, userController.adminLogin);
router.get('/logout', userController.logout);

//dashboard
router.get('/dashboard', isLogin, userController.dashboard);
router.get('/setting', isLogin, isAdmin, userController.setting);
router.post('/setting', isLogin, isAdmin, upload.single('website_logo'), userController.saveSetting);

//user CRUD route
router.get('/users', isLogin, isAdmin, userController.allUser);
router.get('/add-user', isLogin, isAdmin, userController.addUserPage);
router.post('/add-user', isLogin, isAdmin, isValid.userValidation, userController.addUser);
router.get('/update-user/:id', isLogin, isAdmin, userController.updateUserPage);
router.post('/update-user/:id', isLogin, isAdmin, isValid.userUpdateValidation, userController.updateUser);
router.delete('/delete-user/:id', isLogin, isAdmin, userController.deleteUser);


//category CRUD route
router.get('/category', isLogin, isAdmin, categoryController.allCategory);
router.get('/add-category', isLogin, isAdmin, categoryController.addCategoryPage);
router.post('/add-category', isLogin, isAdmin, isValid.categoryValidation, categoryController.addCategory);
router.get('/update-category/:id', isLogin, isAdmin, categoryController.updateCategoryPage);
router.post('/update-category/:id', isLogin, isAdmin, isValid.categoryValidation, categoryController.updateCategory);
router.delete('/delete-category/:id', isLogin, isAdmin, categoryController.deleteCategory);



//article CRUD route
router.get('/article', isLogin, articleController.allArticle);
router.get('/add-article', isLogin, articleController.addArticlePage);
router.post('/add-article', isLogin, upload.single('image'), isValid.articleValidation, articleController.addArticle);
router.get('/update-article/:id', isLogin, articleController.updateArticlePage);
router.post('/update-article/:id', isLogin, upload.single('image'), isValid.articleValidation, articleController.updateArticle);
router.delete('/delete-article/:id', isLogin, articleController.deleteArticle);


//comment route
router.get('/comments', isLogin, commentController.allComments)
router.put('/update-comment-status/:id', isLogin, commentController.updateCommentStatus)
router.delete('/delete-comment/:id', isLogin, commentController.deleteComment)



router.use((req, res, next) => {
    res.status(404).render('admin/404', { role: req.role, message: "Page Not Found" })
})

router.use(isLogin, (err, req, res, next) => {
    console.log(err.stack);
    const status = err.status || 500;

    res.status(status).render('admin/adminerror', {
        role : req.role,
        message: err.message || "Something went wrong",
        status
    })
})


export default router;