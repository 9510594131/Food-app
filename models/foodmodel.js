const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title:{
        type: String,
        required: [true,'Please enter a title'],
    },
    description: {
        type: String,
        required: [true, 'Please enter a description'],
    },
    price: {
        type: Number,
        required: [true, 'Please enter a price'],
    },
    image: {
        type: String,
        default: 'https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png'
    },
    foodtages: {
        type: String,
    },
    category: {
        type: String,
    },
    code:{
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    restaurent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurents',
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ratingCount: {
        type: String,
    }   

},{timestamps: true});

module.exports = mongoose.model('food', foodSchema);