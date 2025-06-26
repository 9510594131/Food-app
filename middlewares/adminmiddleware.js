const userModel = require("../models/usermodel");

module.exports = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.userId); 
        if(user.usertype !== 'admin') {
            return res.status(403).json({
                message: "Access denied, admin only",
                success: false
            });
        }
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({
            message: "Anauthorized access",
            success: false,
            error
        });
    }
}    