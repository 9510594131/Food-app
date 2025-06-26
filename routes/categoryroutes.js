const express = require('express');
const authmiddleware = require('../middlewares/authmiddleware');
const { createCatController, getAllCategoriesController, getCategoryByIdController, updateCategoryController, deleteCategoryController } = require('../controllers/categoryControllers');
const router = express.Router();

router.post('/create', authmiddleware, createCatController) 
router.get('/getall', getAllCategoriesController)
router.get('/get/:id', getCategoryByIdController)
router.put('/update/:id', authmiddleware, updateCategoryController)
router.delete('/delete/:id', authmiddleware, deleteCategoryController)

module.exports = router;