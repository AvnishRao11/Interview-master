import jwt from "jsonwebtoken";
import config from "../config/config.js";
import blackListTokenModel from "../models/tokenBlacklisting.model.js";


export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized"
            })
        }

        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = {
            id: decoded.id,
            username: decoded.username
        }
        next();
    }

    catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                message: "Access token expired"
            });
        }
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}