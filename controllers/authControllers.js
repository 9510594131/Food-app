const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

//registration
const registercontroller = async (req, res) => {
    try {
        const {userName, email, password, phone, address, answer} = req.body;
        if (!userName || !email || !password || !phone) {
            return res.status(500).json({
                message: "All fields are required",
                success: false
            });
        }
        const existingUser = await usermodel.findOne({ email });
        if (existingUser) {
            return res.status(500).json({
                message: "Email already exists",
                success: false
            });
        }

        // Hash the password before saving
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        
        const newUser = await usermodel.create({userName, email, password:hashedPassword , phone, address, answer});
        res.status(201).json({ 
            message: "User registered successfully",
            success: true,
        });
    } catch (err) {     
        console.error("Error during user registration:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};


//login
const logincontroller = async (req,res) => {
    try{
        const {email,password } = req.body;
        if (!email || !password) {
            return res.status(500).json({
                message: "Email and password are required",
                success: false
            });
        }
        const user = await usermodel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "Invalid email",
                success: false
            });
        }

        const ismatch = await bcrypt.compare(password, user.password);
        if (!ismatch) {
            return res.status(404).json({
                message: "Invalid email or password",
                success: false
            });
        }

        const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });

        res.status(200).json({
            message: "User logged in successfully",
            success: true,
            token,
            user
        });
    } catch(err){
        console.error("Error during user login:", err);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            err
        });
    }
} 

module.exports = { registercontroller , logincontroller };