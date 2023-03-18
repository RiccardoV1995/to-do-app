const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/UserModel')

const generateToken = (id) => jwt.sign({id}, process.env.SECRET)

// GET /api/users
// Get user login
// Private
const getUser = (req, res) => res.json(req.user)

// POST /api/users
// Create user
// Pubblic
const createUser = async (req, res) => {
    try {
        const {username, email, password} = req.body

        if (!username || !email || !password) {
            return res.status(400).json({msg: 'Tutti i campi devono essere compilati'})
        }

        // Controllo se utente è già esistente
        const checkUser = await User.findOne({email})

        if (checkUser) {
            return res.status(400).json({msg: 'Email già esistente'})
        }

        // Cript password
        const genSalt = await bcrypt.genSalt(10)
        const passwordCrypt = await bcrypt.hash(password, genSalt)

        // Creazione utente
        const userFields = {
            username,
            email,
            password: passwordCrypt
        }

        const newUser = await User.create(userFields)

        res.json({
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Server error'})
    }
}

// POST /api/users/login
// Create user
// Pubblic
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        if (!email || !password) {
            return res.status(400).json({msg: 'Tutti i campi devono essere compilati'})
        }

        const user = await User.findOne({email})

        if (!user) {
            return res.status(400).json({msg: 'Utente non trovato, ricontrollare la email'})
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(400).json({msg: 'Password non corretta'})
        }

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Server error'})
    }
}

// PUT /api/users
// Edit user
// Private
const editUser = async (req, res) => {
    try {
        const {username, email} = req.body

        const userFields = {username, email}

        const userUpdated = await User.findByIdAndUpdate(req.user, userFields, {new: true})

        res.json({
            id: userUpdated._id,
            username: userUpdated.username,
            email:userUpdated.email,
            token: generateToken(userUpdated._id)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Server error'})
    }
}

// PUT /api/users/password-update
// Edit user
// Private
const updatePassword = async (req, res) => {
    try {
        const {oldPassword, newPassword} = req.body

        const user = await User.findById(req.user)

        const checkPassword = await bcrypt.compare(oldPassword, user.password)

        if(!checkPassword) {
            return res.status(422).json({msg: 'Vecchia password non corretta'})
        }

        const genSalt = await bcrypt.genSalt(10)
        const passwordCrypted = await bcrypt.hash(newPassword, genSalt)

        const userUpdated = await User.findByIdAndUpdate(req.user, {password: passwordCrypted}, {new: true})

        res.json({
            id: userUpdated._id,
            username: userUpdated.username,
            email:userUpdated.email,
            token: generateToken(userUpdated._id)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Server error'})
    }
}

// DELETE /api/users
// Delete user
// Private
const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user)

        res.json({msg: 'Utente rimosso'})
    } catch (err) {
        console.log(err)
        res.status(500).json({msg: 'Server error'})
    }
}

module.exports = {
    getUser,
    createUser,
    editUser,
    deleteUser,
    loginUser,
    updatePassword,
}