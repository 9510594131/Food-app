const mongoose = require('mongoose');

const cateorySchema = new mongoose.Schema({
    title: {
        type: String, 
        required: [true, "Category name is required"],
    },
    imageUrl: {
        type: String,
        default: 'https://png.pngtree.com/png-vector/20220623/ourmid/pngtree-food-logo-png-image_5297921.png'
    },

},{timestamps: true});

module.exports = mongoose.model('Categories', cateorySchema);