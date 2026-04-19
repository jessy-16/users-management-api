import jwt from "jsonwebtoken";
import { token } from "morgan";

export const generateToken = (userId) => {
    return jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"
    });
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};