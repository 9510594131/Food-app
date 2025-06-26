const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Restaurant name is required"],
    },
    imageUrl: {
        type: String,
        default: ''
    },
    foods: {
        type: Array,
    },
    time: {
        type: String,
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isopen: {
        type: Boolean,
        default: true
    },
    logoUrl: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingCount: {
        type: Number,
    },
    code: {
        type: String,
    },
    coords: {
        id: {
            type: String,
        },
        latitude: {
            type: Number,
        },
        latitudeDelta: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        longitudeDelta: {
            type: Number,
        },
        address: {
            type: String,
        },
        title: {
            type: String,
        },

    },

},{timestamps: true});

module.exports = mongoose.model('Restaurent', restaurantSchema);