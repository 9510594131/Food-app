const foodModel = require('../models/foodmodel');
const orderModel = require('../models/ordermodel');

const createFoodController = async (req,res) => {
    try {
        const { title, description, price, image, foodtages, category, code, isAvailable, restaurent, rating} = req.body;
        if (!title || !description || !price || !restaurent) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required fields'
            });
        }
        const food = new foodModel({
            title,
            description,
            price,
            image,
            foodtages,
            category,
            code,
            isAvailable,
            restaurent,
            rating
        });

        await food.save();
        res.status(201).send({
            success: true,
            message: 'Food created successfully',
            food
        });
    } catch (error) {
        console.error('Error creating food:', error);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const getAllFoodsController = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: 'No foods found'
            });
        }
        res.status(200).send({
            success: true,
            total: foods.length,
            message: 'Foods fetched successfully',
            foods
        });
    } catch (error) {
        console.error('Error fetching foods:', error);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const getFoodByIdController = async (req, res) => {
    try {
        const food = await foodModel.findById(req.params.id);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Food fetched successfully',
            food
        });
    } catch (error) {
        console.error('Error fetching food:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const getFoodsByRestaurentController = async (req, res) => {
    try {
        const foods = await foodModel.find({ restaurent: req.params.id });
        if (!foods) {
            return res.status(404).send({
                success: false,
                message: 'No foods found for this restaurant'
            });
        }
        res.status(200).send({
            success: true,
            total: foods.length,
            message: 'Foods fetched successfully',
            foods
        });
    } catch (error) {
        console.error('Error fetching foods by restaurant:', error);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const updateFoodController = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Food updated successfully',
            food
        });
    }catch (error) {
        console.error('Error updating food:', error);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const deleteFoodController = async (req, res) => {
    try {
        const food = await foodModel.findByIdAndDelete(req.params.id);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: 'Food not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Food deleted successfully',
            food
        });
    } catch (error) {
        console.error('Error deleting food:', error);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const placeorderController = async (req, res) => {
    try {
        const {cart} = req.body;
        if (!cart) {
            return res.status(400).send({
                success: false,
                message: 'Please provide cart details'
            });
        }
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });

        const neworder = new orderModel({
            food: cart,
            payment: total,
            bayer: req.userId,
        });
        const order = await neworder.save();
        res.status(201).send({
            success: true,
            message: 'Order placed successfully',
            order
        });
    } catch (error) {
        console.error('Error placing order:', error);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

const orderStatusController = async (req, res) => {
    try {
        const orderId = req.params.id;
        if (!orderId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide order ID'
            });
        }
        const { status } = req.body;
        if (!status) {
            return res.status(400).send({
                success: false,
                message: 'Please provide order ID and status'
            });
        } 
        const order = await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
        if (!order) {
            return res.status(404).send({
                success: false,
                message: 'Order not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).send({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

module.exports = {createFoodController, getAllFoodsController, getFoodByIdController, getFoodsByRestaurentController, updateFoodController, deleteFoodController, placeorderController, orderStatusController}; 