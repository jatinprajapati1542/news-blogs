import jwt from "jsonwebtoken"

const isLogin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) return res.redirect('/');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.id = decoded.id
        req.fullname = decoded.fullname;
        req.role = decoded.role
        next();
    } catch (error) {
        res.status(401).send("Unauthorizrd : invalid token");
    }
}

export default isLogin;