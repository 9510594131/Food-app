const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true,"User name is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
    },
    usertype: {
        type: String,
        required: [true, "User type is required"],
        default: 'client',
        enum:['client', 'admin', 'vendor', 'driver'],
    }, 
    profile: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
    },
    answer: {
        type: String,
        required: [true, "answer is required"],
    },

},{timestamps: true});

module.exports = mongoose.model('User', userSchema);