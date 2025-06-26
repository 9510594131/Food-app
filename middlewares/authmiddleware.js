const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1]; 
        JWT.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    message: "Invalid token",
                    success: false,
                    error: err
                });
            }else{
                req.userId = decoded.id; 
                next(); 
            }
        });
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({
            message: "Pleaseprovide token",
            success: false,
            error
        });
    }
}