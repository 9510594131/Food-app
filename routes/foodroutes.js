const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { createFoodController, getAllFoodsController, getFoodByIdController, getFoodsByRestaurentController, updateFoodController, deleteFoodController, placeorderController, orderStatusController } = require('../controllers/foodControlers');
const adminmiddleware = require('../middlewares/adminmiddleware');
const router = express.Router();

router.post('/create', authmiddleware, createFoodController)
router.get('/getall', getAllFoodsController)
router.get('/get/:id', getFoodByIdController)
router.get('/getByRestaurent/:id', getFoodsByRestaurentController)
router.put('/update/:id', authmiddleware, updateFoodController) 
router.delete('/delete/:id', authmiddleware, deleteFoodController) 
router.post('/placeorder', authmiddleware, placeorderController)
router.post('/orderststus/:id', authmiddleware, adminmiddleware, orderStatusController)

module.exports = router;