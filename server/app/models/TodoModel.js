const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    task: String,
    category:String,
    date: Date,
    time: String,
}, {
    timestamps: true
})

module.exports = Todo = mongoose.model('todo', TodoSchema)