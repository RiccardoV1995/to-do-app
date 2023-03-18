const jwt = require('jsonwebtoken')
const User = require('../app/models/UserModel')

const auth = async (req, res, next) => {
    let token = req.headers.authorization

    if(!token) {
        return res.status(422).json('Effettua il login o crea un account')
    }

    try {
        const decoded = await jwt.verify(token.split(' ')[1], process.env.SECRET)
        
        req.user = await User.findById(decoded.id).select('-password')

        next()
    } catch (err) {
        console.log(err)
        res.status(500).json('Server error')
    }
}

module.exports = auth