const Category = require('../models/CategoryModel')

// GET /api/categories
// Get all user's categories
// Private
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({user: req.user}).sort({categoryName: 'asc'})

        res.json(categories)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// GET /api/categories/:id
// Get user's category
// Private
const getCategory = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)

        res.json(category)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// POST /api/categories
// Create category
// Private
const createCategory = async (req, res) => {
    try {
        const {categoryName} = req.body

        const categoryFields = {
            user: req.user,
            categoryName
        }

        const newCategory = await Category.create(categoryFields)

        res.json(newCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// PUT /api/categories/:id
// Edit category
// Private
const editCategory = async (req, res) => {
    try {
        const chackCategory = await Category.findById(req.params.id)

        if (JSON.stringify(chackCategory.user) !== JSON.stringify(req.user._id)) {
            return res.status(402).json('Utente non autorizzato')
        }

        const {categoryName} = req.body

        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, {categoryName}, {new: true})

        res.json(updatedCategory)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// DELETE /api/categories/:id
// Delete category
// Private
const deleteCategory = async (req, res) => {
    try {
        const checkCategory = await Category.findById(req.params.id)

        if (JSON.stringify(checkCategory.user) !== JSON.stringify(req.user._id)) {
            return res.status(402).json('Utente non autorizzato')
        }

        await Category.findByIdAndDelete(req.params.id)

        res.json({ id: req.params.id })
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

module.exports = {
    getCategories,
    getCategory,
    createCategory,
    editCategory,
    deleteCategory,
}