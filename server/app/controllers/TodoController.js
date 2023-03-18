const Todo = require('../models/TodoModel')

// GET /api/todos
// Get all user's todos
// Private
const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({user: req.user}).sort({date: 'asc'})

        res.json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// GET /api/todos/:id
// Get user's todo
// Private
const getTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (JSON.stringify(todo.user) !== JSON.stringify(req.user._id)) {
            return res.status(402).json('Utente non autorizzato')
        }

        res.json(todo)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// GET /api/todos/:category
// Get user's todo by category
// Private
const getTodoByCategory = async (req, res) => {
    try {
        const todos = await Todo.find({category: req.params.category, user: req.user}).sort({date: 'asc'})

        res.json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// POST /api/todos
// Create todo
// Private
const createTodo = async (req, res) => {
    try {
        const {task, category, date, time} = req.body

        if (!task || !date) {
            return res.status(402).json('Compilare tutti i campi obbligatori')
        }

        const todoFields = {
            user: req.user,
            task,
            category: category || 'generale',
            date,
            time: time || ''
        }

        const newTodo = await Todo.create(todoFields)

        res.json(newTodo)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// PUT /api/todos/:id
// Edit user's todo
// Private
const editTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)

        if (JSON.stringify(todo.user) !== JSON.stringify(req.user._id)) {
            return res.status(402).json('Utente non autorizzato')
        }

        const {task, category, date, time} = req.body

        const todoFields = {task, category, date, time}

        const newTodo = await Todo.findByIdAndUpdate(req.params.id, todoFields, {new: true})

        res.json(newTodo)
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

// DELETE /api/todos/:id
// Remove user's todo
// Private
const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id)
        
        if (JSON.stringify(todo.user) !== JSON.stringify(req.user._id)) {
            return res.status(402).json('Utente non autorizzato')
        }

        await Todo.findByIdAndRemove(req.params.id)

        res.json({id: req.params.id})
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error')
    }
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    editTodo,
    deleteTodo,
    getTodoByCategory,
}