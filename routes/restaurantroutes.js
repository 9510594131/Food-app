const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { createRestaurentController, getAllRestaurantsController, getRestaurantByIdController, deleteRestaurantController } = require('../controllers/restaurantControllers');
const router = express.Router();

router.post('/create', authmiddleware, createRestaurentController)
router.get('/getall', getAllRestaurantsController)
router.get('/get/:id', getRestaurantByIdController)
router.delete('/delete/:id', authmiddleware , deleteRestaurantController)

module.exports = router;