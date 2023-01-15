import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = async (req, res, next) => {
    try {
        let token = req.header("Authorization");
        if (!token) return res.status(403).json({ success: false, error: "Access Denied" });
        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        };
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(505).json({
            success: false,
            error:error.message
        })
    }
}