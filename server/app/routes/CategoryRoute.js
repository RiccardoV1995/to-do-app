const express = require('express')
const Router = express.Router()

const auth = require('../../middleware/auth')

const {
    getCategories,
    getCategory,
    createCategory,
    editCategory,
    deleteCategory,
} = require('../controllers/CategoryController')

Router.route('/')
    .get(auth, getCategories)
    .post(auth, createCategory)

Router.route('/:id')
    .get(auth, getCategory)
    .put(auth, editCategory)
    .delete(auth, deleteCategory)

module.exports = Router