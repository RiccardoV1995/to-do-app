const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    categoryName: {
        type: String,
        lowercase: true
    }
}, {
    timestamps: true
})

module.exports = Category = mongoose.model('category', CategorySchema)