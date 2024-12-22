import jwt from "jsonwebtoken"
import User from "../models/user.model"

export const protectRoute = async (req, res, next) => {
    const token = req.cookies.token; 
    if (!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal server error"});
    }
}