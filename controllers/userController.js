const usermodel = require("../models/usermodel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");

const getusercontroller = async (req,res) => {
    try{
        const user = await usermodel.findById({_id:req.userId})
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        //hide password
        user.password = undefined; 

        res.status(200).json({
            message: "User fetched successfully",
            success: true,
            user
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error: error.message
        });
    }
}

const updateusercontroller = async (req,res) => {
    try{
        const user = await usermodel.findById({_id:req.userId})
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const { userName, address, phone} = req.body;
        if(userName) user.userName = userName;
        if(address) user.address = address;
        if(phone) user.phone = phone;
        await user.save();
        res.status(200).json({
            message: "User updated successfully",
            success: true,
        });
        
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        });
    }
}

const resetpasswordcontroller = async (req,res) => {
    try{
        const { email, answer, newpassword } = req.body;
        if(!email || !answer || !newpassword){
            return res.status(400).json({
                message: "Answer and new password are required",
                success: false
            });
        }
        const user = await usermodel.findOne({answer, email });
        if(!user){
            return res.status(404).json({
                message: "User not found or answer is incorrect",
                success: false
            });
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(newpassword, salt);
        user.password = hash;
        await user.save();
        res.status(200).json({
            message: "Password reset successfully",
            success: true
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        });
    }
}

const updatepasswordcontroller = async (req,res) => {
    try{
        const { oldpassword, newpassword } = req.body;
        if(!oldpassword || !newpassword){
            return res.status(400).json({
                message: "Old password and new password are required",
                success: false
            });
        }
        const user = await usermodel.findById({_id:req.userId});
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: "Old password is incorrect",
                success: false
            });
        }
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(newpassword, salt);
        user.password = hash;
        await user.save();
        res.status(200).json({
            message: "Password updated successfully",
            success: true
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        });
    }
}

const deleteusercontroller = async (req,res) => {
    try{
        const user = await usermodel.findByIdAndDelete({_id:req.userId});
        if(!user){
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }
        res.status(200).json({
            message: "User deleted successfully",
            success: true
        });
    }catch(error){
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            success: false,
            error
        });
    }
}

module.exports = {getusercontroller , updateusercontroller, resetpasswordcontroller, updatepasswordcontroller, deleteusercontroller}; 