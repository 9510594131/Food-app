const restaurantModel = require('../models/restaurantModel');
const createRestaurentController = async (req,res) => {
    try{
        const {title,imageUrl,foods,time,pickup,delivery,isopen,logoUrl,rating,ratingCount,code,coords } = req.body;
        if(!title || !coords){
            return res.status(400).send({
                success: false,
                message: 'Title and coordinates are required'
            });
        }
        const newRestaurant = new restaurantModel({
            title,
            imageUrl,
            foods,
            time,
            pickup,
            delivery,
            isopen,
            logoUrl,
            rating,
            ratingCount,
            code,
            coords
        })
        await newRestaurant.save();
        res.status(201).send({
            success: true,
            message: 'Restaurant created successfully',
            data: newRestaurant
        });
    }catch(error){
        console.error( error);
        res.status(500).send({
            success: false,
            message: 'Error in creating restaurant',
            error
        })

    }
}

const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await restaurantModel.find({});
        if (!restaurants) {
            return res.status(404).send({
                success: false,
                message: 'No restaurants found'
            });
        }
        res.status(200).send({
            success: true,
            total: restaurants.length,
            message: 'Restaurants fetched successfully',
            restaurants
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching restaurants',
            error
        });
    }
}

const getRestaurantByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await restaurantModel.findById(id);
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Restaurant ID is required'
            });
        }
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'Restaurant not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Restaurant fetched successfully',
            restaurant
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching restaurant',
            error
        });
    }
}

const deleteRestaurantController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: 'Restaurant ID is required'
            });
        }
        const restaurant = await restaurantModel.findByIdAndDelete(id);
        if (!restaurant) {
            return res.status(404).send({
                success: false,
                message: 'Restaurant not found'
            });
        }
        res.status(200).send({
            success: true,
            message: 'Restaurant deleted successfully',
            restaurant
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting restaurant',
            error
        });
    }
}

module.exports = {createRestaurentController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantController}; 