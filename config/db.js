const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log(`MongoDB connected successfully ${mongoose.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error);
    }
};

module.exports = { connectDB };