import express, { urlencoded } from "express"
const app = express()
import mongoose from "mongoose"
import path from "path"
import expressLayouts from "express-ejs-layouts"
import cookieParser from "cookie-parser"
import flash from "connect-flash"
import dotenv from "dotenv"
import minifyHTML from "express-minify-html-terser"
import compression from "compression"
import { fileURLToPath } from "url";
import adminRoute from "./routes/admin.js"
import frontendRoute from "./routes/frontend.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename)

dotenv.config()


//middleware
app.use(express.json({ limit: '10mb' }));
app.use(urlencoded({ extended: false, limit: '10mb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: '2h' }));
app.use(expressLayouts);
app.use(cookieParser())
app.set('layout', 'layout');
app.use(compression({
    level: 9,
    threshold: 10 * 1024,
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            // don't compress responses with this request header
            return false
        }

        // fallback to standard filter function
        return compression.filter(req, res)
    }
}))

app.use(minifyHTML({
    override: true,
    exception_url: false,
    htmlMinifier: {
        removeComments: true,
        collapseWhitespace: true,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeEmptyAttributes: true,
        minifyJS: true
    }
}));

//view engine
app.set('view engine', 'ejs');

//database connect
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("databse connected ! "))
    .catch(err => console.log(err))



// routes
app.use('/admin', (req, res, next) => {
    res.locals.layout = 'admin/layout';
    next()
})

app.use('/admin', adminRoute)

app.use('/', frontendRoute)


// app listen
app.listen(5000, () => {
    console.log("server listen on port 5000")
})