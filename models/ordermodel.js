const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    food: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'foods'}
    ],
    payment:{},
    bayer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    status: {
        type: String,
        default: 'placed',
        enum: ['preparing', 'on the way', 'delivered'],
        default: 'preparing'
    },


},{timestamps: true});

module.exports = mongoose.model('orders', ordersSchema);