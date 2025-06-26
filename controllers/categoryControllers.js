const categoryModel = require('../models/categorymodel');

const createCatController = async (req, res) => {
    try{
        const { title, imageUrl } = req.body;

        // Validate input
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Category name is required"
            });
        }

        // Create new category
        const newCategory = new categoryModel({title, imageUrl});
        await newCategory.save();
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            category: newCategory
        });
    }catch(error) {
        console.error("Error in createCatController:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        })
    }
}

const getAllCategoriesController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if (!categories) {
            return res.status(404).send({
                success: false,
                message: "No categories found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Categories fetched successfully",
            total: categories.length,
            categories
        });
    } catch (error) {
        console.error("Error in getAllCategoriesController:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
}

const getCategoryByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category fetched successfully",
            category
        });
    } catch (error) {
        console.error("Error in getCategoryByIdController:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, imageUrl } = req.body;

        // Validate input
        if (!title) {
            return res.status(400).send({
                success: false,
                message: "Category name is required"
            });
        }

        // Update category
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, { title, imageUrl }, { new: true });
        if (!updatedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updatedCategory
        });
    }
    catch (error) {
        console.error("Error in updateCategoryController:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({
                success: false,
                message: "Category ID is required"
            });
        }
        const deletedCategory = await categoryModel.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            deletedCategory
        });
    } catch (error) {
        console.error("Error in deleteCategoryController:", error);
        res.status(500).send({
            success: false,
            message: "Internal server error",
            error
        });
    }
}

module.exports = {createCatController, getAllCategoriesController, getCategoryByIdController, updateCategoryController, deleteCategoryController}; 