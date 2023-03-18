const express = require('express')
const Router = express.Router()

const auth = require('../../middleware/auth')

const {
    getUser,
    createUser,
    editUser,
    deleteUser,
    loginUser,
    updatePassword,
} = require('../controllers/UserController')

Router.route('/')
    .get(auth, getUser)
    .post(createUser)
    .put(auth, editUser)
    .delete(auth, deleteUser)

Router.post('/login', loginUser)

Router.put('/password-update', auth, updatePassword)

module.exports = Router