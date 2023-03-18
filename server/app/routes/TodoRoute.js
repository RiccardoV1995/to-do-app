const express = require('express')
const Router = express.Router()

const auth = require('../../middleware/auth')

const {
    getTodos,
    getTodo,
    createTodo,
    editTodo,
    deleteTodo,
    getTodoByCategory,
} = require('../controllers/TodoController')

Router.route('/')
    .get(auth, getTodos)
    .post(auth, createTodo)

Router.route('/:id')
    .get(auth, getTodo)
    .put(auth, editTodo)
    .delete(auth, deleteTodo)

Router.route('/category/:category')
    .get(auth, getTodoByCategory)

module.exports = Router